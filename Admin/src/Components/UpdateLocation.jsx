import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { host } from '../Context/Host'

export default function UpdateLocation() {

    const [updatelocation, setUpdateLocation] = useState({
        location: '',
        status: 'active'
    })


    const handlechange = (e) => {

        console.log({
            ...updatelocation,
            [e.target.name]: e.target.value
        })

        setUpdateLocation({
            ...updatelocation,
            [e.target.name]: e.target.value
        })

    }


    const { lid } = useParams()

    console.log("location id", lid)


    useEffect(() => {

        axios.get(`${host}/Location/GetLocationById/${lid}`)

            .then((res) => {

                console.log(res.data.singlelocation)

                const data = res.data.singlelocation

                setUpdateLocation({
                    location: data.location,
                    status: data.status
                })

            })

            .catch((error) => {

                console.log(error)

            })

    }, [lid])


    const handleupdate = () => {

        console.log("update details", updatelocation)

        axios.put(
            `${host}/Location/UpdateLocation/${lid}`,
            updatelocation
        )

            .then((res) => {

                console.log(res)

                alert(res.data.message)

            })

            .catch((error) => {

                console.log(error)

            })

    }


    return (

        <div>

            <main className="dashboard-content">

                <div className="container-fluid px-3 px-lg-4 py-4">


                    {/* PAGE HEADING */}

                    <div className="page-heading">

                        <div className="page-heading-copy">

                            <span className="page-icon">

                                <i
                                    className="bi bi-geo-alt"
                                    aria-hidden="true"
                                />

                            </span>


                            <div>

                                <p className="eyebrow mb-1">
                                    Management
                                </p>

                                <h1 className="h3 mb-1">
                                    Update Location
                                </h1>

                                <p className="text-muted mb-0">
                                    Update hotel location details.
                                </p>

                            </div>

                        </div>


                        <div className="heading-actions">

                            <a
                                className="btn btn-outline-secondary btn-sm"
                                href="/ManageLocation"
                            >

                                <i
                                    className="bi bi-arrow-left"
                                    aria-hidden="true"
                                />

                                {" "}Back to Location

                            </a>

                        </div>

                    </div>


                    {/* FORM */}

                    <section className="row g-3">

                        <div className="col-12 col-xl-12">

                            <div
                                className="panel needs-validation"
                                noValidate
                            >


                                {/* PANEL HEADER */}

                                <div className="panel-header">

                                    <div>

                                        <h2 className="h5 mb-1 section-title">

                                            <i
                                                className="bi bi-geo-alt"
                                                aria-hidden="true"
                                            />

                                            <span>
                                                Location Information
                                            </span>

                                        </h2>

                                        <p className="text-muted mb-0">
                                            Update location and status.
                                        </p>

                                    </div>

                                </div>


                                {/* FORM FIELDS */}

                                <div className="row g-3">


                                    {/* LOCATION */}

                                    <div className="col-md-12">

                                        <label
                                            className="form-label"
                                            htmlFor="location"
                                        >
                                            Location
                                        </label>


                                        <input
                                            className="form-control"
                                            id="location"
                                            type="text"
                                            name="location"
                                            onChange={handlechange}
                                            value={updatelocation.location}
                                            required
                                        />


                                        <div className="invalid-feedback">
                                            Location is required.
                                        </div>

                                    </div>


                                    {/* STATUS */}

                                    <div className="col-md-12">

                                        <label
                                            className="form-label"
                                            htmlFor="status"
                                        >
                                            Status
                                        </label>


                                        <select
                                            className="form-control"
                                            id="status"
                                            name="status"
                                            value={updatelocation.status}
                                            onChange={handlechange}
                                        >

                                            <option value="active">
                                                Active
                                            </option>

                                            <option value="inactive">
                                                Inactive
                                            </option>

                                        </select>

                                    </div>


                                </div>


                                {/* BUTTONS */}

                                <div className="d-flex flex-wrap justify-content-end gap-2 mt-4">


                                    <a
                                        className="btn btn-outline-secondary"
                                        href="/ManageLocation"
                                    >
                                        Cancel
                                    </a>


                                    <button
                                        className="btn btn-primary"
                                        type="button"
                                        onClick={handleupdate}
                                    >

                                        <i
                                            className="bi bi-check-circle"
                                            aria-hidden="true"
                                        />

                                        {" "}Update Location

                                    </button>


                                </div>


                            </div>

                        </div>

                    </section>


                </div>

            </main>

        </div>

    )

}