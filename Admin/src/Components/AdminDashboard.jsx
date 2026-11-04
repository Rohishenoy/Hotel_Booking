import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { host } from '../Context/Host'

export default function AdminDashboard() {
  const [count, setCount] = useState({
    user:0,
    hotel:0,
    booking:0,
    payment:0,
  })
  const [monthlyRevenue, setMonthlyRevenue] = useState([])
  const [revenueLoading, setRevenueLoading] = useState(true)
  const [revenueError, setRevenueError] = useState('')

  const fetchcount=async () => {
    try {
      const res  =await axios.get(`${host}/User/Count`)
      console.log('count response',res.data)
      setCount({
        user:res.data.allusers,
        hotel:res.data.hotels,
        booking:res.data.bookings,
        payment:res.data.payments,
      })
    } catch (error) {
     console.log('server error',error) 
    }
  }
  useEffect(()=>{
fetchcount()
  },[])

  useEffect(() => {
    const fetchMonthlyRevenue = async () => {
      try {
        const response = await axios.get(`${host}/Payment/MonthlyRevenue`)
        setMonthlyRevenue(response.data.monthlyRevenue)
      } catch (error) {
        console.error('Unable to fetch monthly revenue', error)
        setRevenueError('Monthly revenue could not be loaded.')
      } finally {
        setRevenueLoading(false)
      }
    }

    fetchMonthlyRevenue()
  }, [])

  const maxRevenue = Math.max(...monthlyRevenue.map(({ revenue }) => revenue), 0)
  const formatRevenue = (amount, compact = false) => new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    notation: compact ? 'compact' : 'standard',
    maximumFractionDigits: compact ? 1 : 2,
  }).format(amount)

  return (
    <div>
       <main className="dashboard-content">
  <div className="container-fluid px-3 px-lg-4 py-4">
    <div className="page-heading">
      <div className="page-heading-copy">
        <span className="page-icon"><i className="bi bi-speedometer2" aria-hidden="true" /></span>
        <div>
          <p className="eyebrow mb-1">Overview</p>
          <h1 className="h3 mb-1">Dashboard</h1>
          <p className="text-muted mb-0">Monitor performance, sales, users, and support from one clean workspace.</p>
        </div>
      </div>
      <div className="heading-actions"><button className="btn btn-outline-secondary btn-sm" type="button"><i className="bi bi-download" aria-hidden="true" /> Export</button><button className="btn btn-primary btn-sm" type="button"><i className="bi bi-file-earmark-plus" aria-hidden="true" /> Create Report</button></div>
    </div>
    <section className="row g-3 mt-1" aria-label="Dashboard metrics">
      <div className="col-12 col-sm-6 col-xl-3">
        <article className="metric-card metric-primary">
          <div className="metric-top">
            <span className="metric-label">User</span>
            <span className="metric-icon"><i class="bi bi-people-fill" aria-hidden="true" /></span>
          </div>
          <div className="metric-value">{count.user}</div>
          <div className="metric-meta">
            {/* <span className="text-success">+12.5%</span>
            <span>from last month</span> */}
          </div>
        </article>
      </div>
      <div className="col-12 col-sm-6 col-xl-3">
        <article className="metric-card metric-success">
          <div className="metric-top">
            <span className="metric-label">Hotel</span>
            <span className="metric-icon"><i class="bi bi-shop" aria-hidden="true" /></span>
          </div>
          <div className="metric-value">{count.hotel}</div>
          <div className="metric-meta">
            {/* <span className="text-success">+8.2%</span>
            <span>new orders</span> */}
          </div>
        </article>
      </div>
      <div className="col-12 col-sm-6 col-xl-3">
        <article className="metric-card metric-warning">
          <div className="metric-top">
            <span className="metric-label">Booking</span>
            <span className="metric-icon"><i class="bi bi-bookmarks-fill" aria-hidden="true" /></span>
          </div>
          <div className="metric-value">{count.booking}</div>
          <div className="metric-meta">
            {/* <span className="text-success">+5.1%</span>
            <span>active users</span> */}
          </div>
        </article>
      </div>
      <div className="col-12 col-sm-6 col-xl-3">
        <article className="metric-card metric-danger">
          <div className="metric-top">
            <span className="metric-label">Payment</span>
            <span className="metric-icon"><i class="bi bi-credit-card-2-back" aria-hidden="true" /></span>
          </div>
          <div className="metric-value">{count.payment}</div>
          <div className="metric-meta">
            {/* <span className="text-danger">3 urgent</span>
            <span>need review</span> */}
          </div>
        </article>
      </div>
    </section>
    <section className="row g-3 mt-1">
      <div className="col-12 col-xl-15">
        <div className="panel">
          <div className="panel-header">
            <div>
              <h2 className="h5 mb-1 section-title"><i className="bi bi-graph-up-arrow" aria-hidden="true" /><span>Monthly Revenue</span></h2>
              <p className="text-muted mb-0">Paid payment revenue for the last six months.</p>
            </div>
            <a className="btn btn-light btn-sm" href="charts.html">View Details</a>
          </div>
          {revenueLoading ? (
            <p className="text-muted mb-0" role="status">Loading monthly revenue...</p>
          ) : revenueError ? (
            <p className="text-danger mb-0" role="alert">{revenueError}</p>
          ) : (
            <div className="chart-bars" aria-label="Monthly paid revenue for the last six months">
              {monthlyRevenue.map(({ month, revenue }) => {
                const barHeight = maxRevenue > 0
                  ? Math.max((revenue / maxRevenue) * 100, revenue > 0 ? 4 : 0)
                  : 0
                const label = new Date(`${month}-01T00:00:00Z`).toLocaleDateString('en', {
                  month: 'short',
                  timeZone: 'UTC',
                })

                return (
                  <div className="chart-column" key={month}>
                    <span
                      style={{ '--bar-size': `${barHeight}%` }}
                      title={`${label}: ${formatRevenue(revenue)}`}
                      aria-label={`${label}: ${formatRevenue(revenue)}`}
                    />
                    <small>{label}</small>
                    <small className="chart-value">{formatRevenue(revenue, true)}</small>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
      
    </section>
  
  </div>
</main>

    </div>
  )
}
