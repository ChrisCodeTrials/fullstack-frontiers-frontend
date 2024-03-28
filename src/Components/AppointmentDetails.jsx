import React, { useEffect, useState } from 'react'
import { useParams, useOutletContext} from 'react-router-dom'

const API = import.meta.env.VITE_BASE_URL

const AppointmentDetails = () => {
    const [appointment, setAppointment] = useState({})
    const { user } = useOutletContext()
    const { appointment_id } = useParams()
    const { id : user_id } = user

    useEffect(()=>{
        fetch(`${API}/api/appointments/${appointment_id}`)
        .then((res)=> res.json())
        .then((resJSON)=> setAppointment(resJSON))
    },[user_id])
    
   if(Object.keys(appointment).length === 0) return null
    
   
  return (
    <div>
        <h1>Appointment Details</h1>
        {console.log( appointment)}
        {console.log(user)}
        {appointment.user_id === user_id ? (
            <div>
                Hi
            </div>

        ):(
            <div>
                <h1> Sorry, but this appointment has been taken by another user!</h1>
            </div>
        )}


    </div>
  )
}

export default AppointmentDetails