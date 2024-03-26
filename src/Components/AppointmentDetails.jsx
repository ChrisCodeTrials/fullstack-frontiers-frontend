import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const API = import.meta.env.VITE_BASE_URL

const AppointmentDetails = () => {
    const [appointment, setAppointment] = useState({})
    const { id } = useParams()
    useEffect(()=>{
        fetch(`${API}/api/appointments/${id}`)
        .then((res)=> res.json())
        .then((resJSON)=> setAppointment(resJSON))
    },[id])
  return (
    <div>
        <h1>Appointment Details</h1>
        <h2>{appointment.date}</h2>

    </div>
  )
}

export default AppointmentDetails