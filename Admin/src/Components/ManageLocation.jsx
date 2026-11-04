import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Pagination from '@mui/material/Pagination';
import { host } from '../Context/Host';

export default function ManageLocation() {

    const [alllocation, setAlllocation] = useState([])

    const [totalPages, setTotalPages] = useState(1)
    const [currentPages, setCurrentPages] = useState(1)
    const [totallocation, setTotalLocation] = useState(0)

    const limit = 1

    const fetchlocation = () => {

        axios.get(`${host}/Location/ViewLocation`,{params: {page: currentPages,limit: limit}})
        .then((res) => {
            console.log("Server Response : ", res)
            setAlllocation(res.data.alllocation)
            setTotalPages(res.data.totalpages)
            setTotalLocation(res.data.totallocation)

        })
        .catch((error) => {
            console.log("Server error : ", error)
        })
    }

    useEffect(() => {
        fetchlocation()
    }, [currentPages])


    const HandleDelete = (locationid) => {
        console.log("delete location id", locationid)
        axios.delete(`${host}/Location/DeleteLocation/${locationid}`)
        .then((res) => {
            console.log(res)
            alert("Location deleted")
            fetchlocation()
        })
        .catch((error) => {
            console.log(error)
        })
    }


    return (
        <div>
            <section className="panel mt-3">
                <div className="panel-header">
                    <div>
                        <h2 className="h5 mb-1 section-title">
                            <i
                                className="bi bi-table"
                                aria-hidden="true"
                            />
                            <span>Location List</span>
                        </h2>
                        <p className="text-muted mb-0">
                            Search, review, and manage hotel locations.
                        </p>
                    </div>
                    <div className="d-flex flex-wrap gap-2">
                        <input
                            className="form-control form-control-sm table-search"
                            type="search"
                            placeholder="Search location"
                            aria-label="Search location"
                        />
                        <a
                            className="btn btn-primary btn-sm"
                            href="/AddLocation"
                        >
                            <i className="bi bi-plus-circle"aria-hidden="true"/>{" "}Add Location
                        </a>
                    </div>
                </div>
                <div className="table-responsive">
                    <table className="table align-middle mb-0">
                        <thead>
                            <tr>
                                <th scope="col">SL. No</th>
                                <th scope="col">Location</th>
                                <th scope="col">Status</th>
                                <th scope="col"className="text-end">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {alllocation.map((ldata, index) => (
                                <tr key={ldata._id}>
                                    <td>{index + 1}</td>
                                    <td>{ldata.location}</td>
                                    <td>
                                        {ldata.status === "active" ? (
                                            <span className="badge bg-success">Active
                                            </span>
                                        ) : (
                                            <span className="badge bg-danger">   Inactive</span>
                                        )}
                                    </td>
                                    <td className="text-end">
                                        <a href={`/UpdateLocation/${ldata._id}`} >
                                            <button className="btn btn-light btn-sm">
                                                <i className="bi bi-pencil-fill" />
                                                {" "}Edit
                                            </button>
                                        </a>
                                        <button
                                            className="btn btn-light btn-sm ms-2"
                                            onClick={() =>
                                                HandleDelete(ldata._id)
                                            }
                                        >
                                            <i className="bi bi-trash3" /> {" "}Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="d-flex flex-column flex-sm-row align-items-sm-center justify-content-between gap-3 mt-3">
                    <p className="text-muted small mb-0"> Showing page {currentPages} of {totalPages} {" "}({totallocation} locations)</p>
                    <Pagination color="primary" count={totalPages} page={currentPages}onChange={(event, value) => setCurrentPages(value) } />
                </div>
            </section>
        </div>
    )
}