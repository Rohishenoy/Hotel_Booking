import { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "@mui/material/Pagination";
import {
    Alert,
    Button,
    Container,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import { host } from "../Context/Host";

export default function ManageContact() {
    const [contacts, setContacts] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [error, setError] = useState("");
    const limit = 10;

    const getContacts = async () => {
        setError("");
        try {
            const response = await axios.get(`${host}/Contact/ViewContact`, {
                params: { page: currentPage, limit }
            });

            if (!response.data.success) {
                setError(response.data.message || "Unable to load contact messages.");
                return;
            }

            setContacts(response.data.allcontact || []);
            setTotalPages(response.data.totalpages || 1);
        } catch (requestError) {
            setError(
                requestError.response?.data?.message ||
                "Unable to load contact messages. Please try again."
            );
        }
    };

    useEffect(() => {
        getContacts();
    }, [currentPage]);

    const deleteContact = async (id) => {
        if (!window.confirm("Delete this contact message?")) {
            return;
        }

        try {
            const response = await axios.delete(`${host}/Contact/DeleteContact/${id}`);
            if (!response.data.success) {
                setError(response.data.message || "Unable to delete contact message.");
                return;
            }

            if (contacts.length === 1 && currentPage > 1) {
                setCurrentPage((page) => page - 1);
            } else {
                await getContacts();
            }
        } catch (requestError) {
            setError(
                requestError.response?.data?.message ||
                "Unable to delete contact message."
            );
        }
    };

    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h4" sx={{ mb: 3 }}>
                Contact Messages
            </Typography>
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Phone</TableCell>
                            <TableCell>Message</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {contacts.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} align="center">
                                    No contact messages have been submitted.
                                </TableCell>
                            </TableRow>
                        ) : contacts.map((contact) => (
                            <TableRow key={contact._id}>
                                <TableCell>
                                    {contact.createdAt
                                        ? new Date(contact.createdAt).toLocaleString()
                                        : "-"}
                                </TableCell>
                                <TableCell>{contact.name}</TableCell>
                                <TableCell>
                                    <a href={`mailto:${contact.email}`}>{contact.email}</a>
                                </TableCell>
                                <TableCell>{contact.phone || "-"}</TableCell>
                                <TableCell sx={{ whiteSpace: "pre-wrap", minWidth: 220 }}>
                                    {contact.message}
                                </TableCell>
                                <TableCell>
                                    <Button
                                        color="error"
                                        variant="contained"
                                        size="small"
                                        onClick={() => deleteContact(contact._id)}
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Pagination
                count={totalPages}
                page={currentPage}
                onChange={(event, page) => setCurrentPage(page)}
                sx={{ mt: 3 }}
            />
        </Container>
    );
}
