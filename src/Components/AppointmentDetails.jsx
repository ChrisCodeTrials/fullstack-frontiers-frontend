import React, { useEffect, useState } from 'react'
import { useParams, useOutletContext, useNavigate} from 'react-router-dom'

const API = import.meta.env.VITE_BASE_URL

const AppointmentDetails = () => {
    const [appointment, setAppointment] = useState({})
    const [doctor, setDoctor] = useState({})
    const { user } = useOutletContext()
    const { appointment_id } = useParams()
    const { id : user_id } = user
    const navigate = useNavigate()

    useEffect(()=>{
        fetch(`${API}/api/doctors`)
        .then((res)=> res.json())
        .then((data)=>{
            const foundDoctor = data.find((doctor)=> doctor.appt_id === Number(appointment_id))
            setDoctor(foundDoctor)
        })
    },[appointment_id])

    useEffect(()=>{
        fetch(`${API}/api/appointments/${appointment_id}`)
        .then((res)=> res.json())
        .then((resJSON)=> setAppointment(resJSON))
    },[user_id])
    
   if(Object.keys(appointment).length === 0) return null
    
   
  return (
    <div>
        <h1>Appointment Details</h1>
        {appointment.user_id === user_id ? (
            <div className='appointment-detail-wrapper'>
                <p>{appointment.appt_date}</p>
                <p>{appointment.created_at}</p>
                <p>{appointment.appt_reason}</p>
                <p>{appointment.location}</p>
                <p>{appointment.duration}</p>
                <p>To be seen by {doctor.surname}, {doctor.specialty}</p>
                <button onClick={()=>navigate(`/appointments/appointment/${appointment_id}/reschedule`)}>Reschedule Appointment</button>
            </div>

        ): appointment.user_id ? (
            <div>
                <h1> Sorry, but this appointment has been taken by another user!</h1>
            </div>
        ):(
            <div>
                <h1>Sorry, but you have not scheduled this appointment!</h1>
            </div>
        )}


    </div>
  )
}

export default AppointmentDetails