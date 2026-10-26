import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Pagination from '@mui/material/Pagination';
import { host } from '../Context/Host'

export default function Manageusers() {
    const [allusers, setAllusers] = useState([])
    const[totalPages,setTotalPages]=useState(1)
    const[currentPages,setCurrentPages]=useState(1)
    const[totaluser,setTotaluser]=useState()//example
    
    const limit=2
    


const fetchuser =()=>{
 axios.get(`${host}/User/ViewUser`,{params:{page:currentPages,limit:limit}})
            .then((res) => {
                console.log("Server Response : ", res)
                console.log("all users : ", res.data.allusers)
                setAllusers(res.data.allusers)
                setTotalPages(res.data.totalpages)
                setTotaluser(res.data.totaluser)
                console.log("All Users Data", allusers)
            })
            .catch((error) => {
                console.log("Server error : ", error)
            })
}

    useEffect(() => {
      fetchuser() 
    }, [currentPages])

    // console.log("All Users:", allusers)
    const HandleDelete=(userid)=>{
console.log(" delete user id",userid)
axios.delete(`${host}/User/Deleteuser/${userid}`)
.then((res)=>{
console.log(res)
alert('user delete')
fetchuser()
})
.catch((error)=>{
console.log(error)

})
    }
    return (
        <div>
            <main className="dashboard-content">
                    <div className="container-fluid px-3 px-lg-4 py-4">
                        <div className="page-heading">
                            <div className="page-heading-copy">
                                <span className="page-icon"><i className="bi bi-people" aria-hidden="true" /></span>
                                <div>
                                    <p className="eyebrow mb-1">Management</p>
                                    <h1 className="h3 mb-1">Users</h1>
                                    <p className="text-muted mb-0">Review accounts, roles, account status, and team ownership.</p>
                                </div>
                            </div>
                            {/* <div className="heading-actions"><a className="btn btn-outline-secondary btn-sm" href="tables.html"><i className="bi bi-download" aria-hidden="true" /> Export</a><a className="btn btn-primary btn-sm" href="AddCategory"><i className="bi bi-person-plus" aria-hidden="true" /> Add Category</a></div> */}
                        </div>
                        {/* <section className="row g-3 mt-1" aria-label="User summary">
                            <div className="col-12 col-sm-6 col-xl-3">
                                <article className="metric-card metric-primary">
                                    <div className="metric-top">
                                        <span className="metric-label">Total Users</span>
                                        <span className="metric-icon"><i className="bi bi-people" aria-hidden="true" /></span>
                                    </div>
                                    <div className="metric-value">8,742</div>
                                    <div className="metric-meta">
                                        <span className="text-success">+5.1%</span>
                                        <span>this month</span>
                                    </div>
                                </article>
                            </div>
                            <div className="col-12 col-sm-6 col-xl-3">
                                <article className="metric-card metric-success">
                                    <div className="metric-top">
                                        <span className="metric-label">Active</span>
                                        <span className="metric-icon"><i className="bi bi-check2-circle" aria-hidden="true" /></span>
                                    </div>
                                    <div className="metric-value">7,980</div>
                                    <div className="metric-meta">
                                        <span className="text-success">91%</span>
                                        <span>healthy accounts</span>
                                    </div>
                                </article>
                            </div>
                            <div className="col-12 col-sm-6 col-xl-3">
                                <article className="metric-card metric-warning">
                                    <div className="metric-top">
                                        <span className="metric-label">Pending</span>
                                        <span className="metric-icon"><i className="bi bi-hourglass-split" aria-hidden="true" /></span>
                                    </div>
                                    <div className="metric-value">184</div>
                                    <div className="metric-meta">
                                        <span className="text-warning">12</span>
                                        <span>need approval</span>
                                    </div>
                                </article>
                            </div>
                            <div className="col-12 col-sm-6 col-xl-3">
                                <article className="metric-card metric-danger">
                                    <div className="metric-top">
                                        <span className="metric-label">Suspended</span>
                                        <span className="metric-icon"><i className="bi bi-slash-circle" aria-hidden="true" /></span>
                                    </div>
                                    <div className="metric-value">38</div>
                                    <div className="metric-meta">
                                        <span className="text-danger">4</span>
                                        <span>flagged today</span>
                                    </div>
                                </article>
                            </div>
                        </section> */}
                        <section className="panel mt-3">
                            <div className="panel-header">
                                <div>
                                    <h2 className="h5 mb-1 section-title"><i className="bi bi-table" aria-hidden="true" /><span>User List</span></h2>
                                    <p className="text-muted mb-0">Search, review, and manage team member accounts.</p>
                                </div>
                                {/* <div className="d-flex flex-wrap gap-2">
                                    <input className="form-control form-control-sm table-search" type="search" placeholder="Search users" data-table-search="usersTable" aria-label="Search users" />
                                    <a className="btn btn-primary btn-sm" href="/AddCategory"><i className="bi bi-person-plus" aria-hidden="true" /> Add Category</a>
                                </div> */}
                            </div>
                            <div className="table-responsive">
                                <table className="table align-middle mb-0" id="usersTable" data-searchable-table>
                                    <thead>
                                        <tr>
                                            <th scope="col">SL. No</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Profile Image </th>
                                            <th scope="col">Email</th>
                                            <th scope="col">Phone</th>
                                            <th scope="col">Address</th>
                                            <th scope="col" className="text-end">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {allusers.map((udata,index)=>(
                                          <tr>
                                          
                                            <td>{index+1}</td>
                                            <td>{udata.name}</td>
                                            <td><img src={`${host}/image/${udata.profileimage}`} alt={udata.name}width={100} height={100} /></td>
                                            <td>{udata.email}</td>
                                            <td>{udata.phone}</td>
                                            <td>{udata.address}</td>
                                            {/* <td><span className="badge text-bg-success">Active</span></td> */}
                                            {/* <td>Jan 12, 2026</td> */}
                                            <td className="text-end">
                                              {/* <a className="btn btn-light btn-sm" href="user-details.html">View</a> */}
                                              {/* <button className="btn btn-light btn-sm">Edit</button> */}
                                              <button className="btn btn-light btn-sm" onClick={()=>HandleDelete(udata._id)}><i class="bi bi-trash3"></i>Delete</button>
                                              </td>
                                        </tr>  
                                        ))}
                                        
                                        
                                    </tbody>
                                </table>
                            </div>
                            
                            <div className="d-flex flex-column flex-sm-row align-items-sm-center justify-content-between gap-3 mt-3">
                                <p className="text-muted small mb-0">Showing {currentPages} to {totalPages} of {totaluser} users</p>
                                 <Pagination color='primary' count={totalPages}page={currentPages}onChange={(event,value)=>setCurrentPages(value)}/>
                                    {/* event=information about click 
                                    value=the page number click */}
                            </div>
                        </section>
                    </div>
            </main>
        </div>
    )
}