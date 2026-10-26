import React, { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "@mui/material/Pagination";
import {
    Container,
    Typography,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper
} from "@mui/material";
import { host } from "../Context/Host";

export default function ManagePayment() {

    const [payments, setPayments] = useState([]);

    const [totalPages, setTotalPages] = useState(1);

    const [currentPage, setCurrentPage] = useState(1);

    const limit = 5;

    const getPayments = async () => {

        try {

            const res = await axios.get(
                `${host}/Payment/ViewPayment`,
                {
                    params: {
                        page: currentPage,
                        limit: limit
                    }
                }
            );

            if (res.data.success) {

                setPayments(
                    res.data.allpayment || []
                );

                setTotalPages(
                    res.data.totalpages || 1
                );

            }

        } catch (error) {

            console.log(error);

        }

    };

    useEffect(() => {

        getPayments();

    }, [currentPage]);

    const deletePayment = async (id) => {

        if (!window.confirm("Delete this payment?")) {
            return;
        }

        try {

            const res = await axios.delete(
                `${host}/Payment/DeletePayment/${id}`
            );

            if (res.data.success) {

                alert("Payment deleted successfully");

                getPayments();

            }

        } catch (error) {

            console.log(error);

        }

    };

    return (

        <Container sx={{ mt: 4 }}>

            <Typography
                variant="h4"
                sx={{ mb: 3 }}
            >
                Manage Payment
            </Typography>

            <TableContainer component={Paper}>

                <Table>

                    <TableHead>

                        <TableRow>

                            <TableCell>User</TableCell>

                            <TableCell>Booking</TableCell>

                            <TableCell>Amount</TableCell>

                            <TableCell>Method</TableCell>

                            <TableCell>Status</TableCell>

                            <TableCell>Action</TableCell>

                        </TableRow>

                    </TableHead>

                    <TableBody>

                        {payments.map((payment) => (

                            <TableRow key={payment._id}>

                                <TableCell>
                                    {payment.user?.uname ||
                                        payment.user?.name ||
                                        payment.user}
                                </TableCell>

                                <TableCell>
                                    {payment.booking?._id ||
                                        payment.booking}
                                </TableCell>

                                <TableCell>
                                    ₹{payment.amount}
                                </TableCell>

                                <TableCell>
                                    {payment.method}
                                </TableCell>

                                <TableCell>
                                    {payment.status}
                                </TableCell>

                                <TableCell>

                                    <Button
                                        color="error"
                                        variant="contained"
                                        size="small"
                                        onClick={() =>
                                            deletePayment(
                                                payment._id
                                            )
                                        }
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
                onChange={(event, value) =>
                    setCurrentPage(value)
                }
                sx={{ mt: 3 }}
            />

        </Container>

    );

}