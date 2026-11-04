import React, { useState } from "react";
import axios from "axios";
import { host } from "../Context/Host";
export default function AddLocation() {

const [location, setLocation] = useState({
location: "",
status: "active"
});

const handlechange = (e) => {
console.log({...location,[e.target.name]: e.target.value});
setLocation({...location,[e.target.name]: e.target.value});
};

const handlesubmit = () => {
console.log("location form data", location);
axios.post(`${host}/Location/AddLocation`,location)
.then((res) => {
console.log(res);
alert("Location added successfully");
setLocation({
location: "",
status: "active"
});
})
.catch((error) => {
console.log(error);
alert("Error adding location");
});
};
return (
<div>
    <main className="dashboard-content">
        <div className="container-fluid px-3 px-lg-4 py-4">
            <div className="page-heading">
                <div className="page-heading-copy">
                    <span className="page-icon"><i className="bi bi-geo-alt" aria-hidden="true" /> </span>
                    <div>
                        <p className="eyebrow mb-1"> Management </p>
                        <h1 className="h3 mb-1">   Add Location</h1>
                        <p className="text-muted mb-0">Create a new hotel location. </p>
                    </div>
                </div>
                <div className="heading-actions">
                    <a className="btn btn-outline-secondary btn-sm" href="/ManageLocation">
                        <i className="bi bi-arrow-left" aria-hidden="true" />{" "}
                        Back to Location
                    </a>
                </div>
            </div>
            <section className="row g-3">
                <div className="col-12 col-xl-12">
                    <div className="panel needs-validation" noValidate>
                        <div className="panel-header">
                            <div>
                                <h2 className="h5 mb-1 section-title">
                                    <i className="bi bi-geo-alt" aria-hidden="true" />
                                    <span>Location Information  </span>
                                </h2>
                                <p className="text-muted mb-0"> Add a new location for hotels.</p>
                            </div>
                        </div>
                        <div className="row g-3">
                            <div className="col-md-12">
                                <label className="form-label" htmlFor="location">  Location  </label>
                                <input className="form-control" id="location" type="text" name="location"
                                    value={location.location} onChange={handlechange} placeholder="Enter location"
                                    required />
                                <div className="invalid-feedback">
                                    Location is required.
                                </div>
                            </div>
                            <div className="col-md-12">
                                <label className="form-label" htmlFor="status">
                                    Status
                                </label>
                                <select className="form-control" id="status" name="status" value={location.status}
                                    onChange={handlechange}>
                                    <option value="active">
                                        Active
                                    </option>
                                    <option value="inactive">
                                        Inactive
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div className="d-flex flex-wrap justify-content-end gap-2 mt-4">
                            <a className="btn btn-outline-secondary" href="/ManageLocation">
                                Cancel
                            </a>
                            <button className="btn btn-primary" type="button" onClick={handlesubmit}>
                                <i className="bi bi-plus-circle" aria-hidden="true" />{" "}
                                Add Location
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </main>
</div>
);
}