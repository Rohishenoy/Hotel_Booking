import React, { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "@mui/material/Pagination";
import { useNavigate } from "react-router-dom";
import { host } from "../Context/Host";

export default function ManageHotel() {
    const navigate = useNavigate();
    const [hotels, setHotels] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPages, setCurrentPages] = useState(1);
    const [totalHotel, setTotalHotel] = useState(0);
    const limit = 2;


    // FETCH HOTELS

    const fetchHotels = async () => {
        try {
            const res = await axios.get(`${host}/Hotel/ViewHotel`,{params:{page:currentPages,limit:limit}
                }
            );

            if (res.data.success) {
                setHotels(res.data.hotels || []);
                setTotalPages(res.data.totalpages || 1);
                setTotalHotel(res.data.totalhotel || 0);
            }

        } catch (error) {
            console.log("Hotel error:", error);
        }
    };


    useEffect(() => {
        fetchHotels();
    }, [currentPages]);


    // DELETE HOTEL
    const handleDelete = async (hotelid) => {
        const confirmDelete =window.confirm("Are you sure you want to delete this hotel?");
        if (!confirmDelete) {
            return;
        }

        try {
            const res = await axios.delete(`${host}/Hotel/DeleteHotel/${hotelid}`);
            if (res.data.success) {
                alert("Hotel deleted successfully");
                fetchHotels();
            }
        } catch (error) {
            console.log(error);
        }
    };


    // START / END ITEM

    const startItem =
        totalHotel === 0
            ? 0
            : (currentPages - 1) * limit + 1;

    const endItem =
        totalHotel === 0
            ? 0
            : Math.min(
                currentPages * limit,
                totalHotel
            );


    return (
        <div className="container-fluid px-4 py-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h2> Manage Hotels</h2>
                    <p className="text-muted">Add, update and delete hotels</p>
                </div>
                <button className="btn btn-primary" onClick={()=>navigate("/AddHotel")} >Add Hotel</button>
            </div>
            <div className="card">
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered table-hover align-middle">
                            <thead>
                                <tr>
                                    <th>SL No</th>
                                    <th>Image</th>
                                    <th>Hotel Name</th>
                                    <th>Location</th>
                                    <th>Address</th>
                                    <th>Phone</th>
                                    <th>Email</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {hotels.map((hotel, index) => (
                                        <tr key={hotel._id}>
                                            <td> {(currentPages - 1) * limit + index + 1}
                                            </td>
                                            <td>
                                                <img src={`${host}/image/${hotel.image}`}alt={ hotel.hotelname}
                                                    width="100" height="70"style={{ objectFit:"cover"}}/>
                                            </td>
                                            <td> { hotel.hotelname}</td>
                                            <td>{ hotel.location?.location}</td>
                                            <td>{  hotel.address} </td>
                                            <td>{  hotel.phone}</td>
                                            <td> { hotel.email }</td>
                                            <td>{hotel.status ==="active" ? (
                                                    <span className="badge bg-success"> Active </span>
                                                ) : (

                                                    <span className="badge bg-danger">Inactive </span>
                                                )}
                                            </td>
                                            <td>
                                                <button className="btn btn-warning btn-sm me-2" onClick={() => navigate( `/UpdateHotel/${hotel._id}` ) }> Edit
                                                </button>
                                                <button  className="btn btn-danger btn-sm" onClick={() => handleDelete( hotel._id ) } > Delete  </button>
                                            </td>
                                        </tr>
                                    )
                                )}
                            </tbody>
                        </table>
                    </div>
                    {hotels.length === 0 && (
                        <p className="text-center">No hotels found  </p>)}
                    <div className="d-flex justify-content-between align-items-center mt-3">
                        <p className="text-muted">Showing {startItem} to{" "} {endItem} of{" "}{totalHotel} hotels</p>
                        <Pagination color="primary"count={totalPages}page={currentPages}onChange={( event,value) =>setCurrentPages(value)}/>
                    </div>
                </div>
            </div>
        </div>
    );
}