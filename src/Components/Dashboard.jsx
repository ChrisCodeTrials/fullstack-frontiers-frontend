import { useState, useEffect } from 'react'
import { useOutletContext, useNavigate, Link } from 'react-router-dom'
const API = import.meta.env.VITE_BASE_URL


const Dashboard = ({setLogUser}) => {
  const { user } = useOutletContext() // Access user data provided by the Outlet's context
  const navigate = useNavigate()
  const [appointment, setAppointment] = useState({})
  const [doctor, setDoctor] = useState({})


  async function handleLogout() {
    const response = await fetch('http://localhost:3003/api/auth/logout', {
      method: 'GET', // or 'POST', depending on your backend
      credentials: 'include',
    })
    if (response.ok) {
      // Here, you should also clear any authentication state in your application
      // For example, if you're using a global state or context to track authentication
      // setIsAuthenticated(false);
      // setUser(null);
      setLogUser(false)
      navigate('/login')
    }
  }

  useEffect(() => {
    fetch(`${API}/api/appointments`)
        .then((res) => res.json())
        .then((data) => {
          const foundAppointment = data.find((appointment)=> appointment.user_id === user.id)
          if(foundAppointment){
            setAppointment(foundAppointment);
          }
        });
  }, []);

  useEffect(()=>{
        fetch(`${API}/api/doctors`)
        .then((res)=> res.json())
        .then((data)=>{
            const foundDoctor = data.find((doctor)=> doctor.appt_id === Number(appointment.id))
            if(foundDoctor){
              setDoctor(foundDoctor)
            }
        })
  }, [appointment])

  return (
    <div>
      <h1>Welcome, {user && user.username.toUpperCase()}</h1>
      {/* Use user data as needed, for example: */}
      <div>
        {Object.keys(appointment).length !== 0 && Object.keys(doctor).length !== 0 ? (
            <Link to={`/appointments/appointment/${appointment.id}`}>
          <div>

            <h3>Your upcoming Appointment:</h3>
                <p>Date: {appointment.appt_date}</p>
                <p>Located at: {appointment.location}</p>
                <p>Duration: {appointment.duration}</p>
                <p>Your appointment is with {doctor.surname}</p>
                </div>
            </Link>)
                : <button>Schedule an Appointment</button>
        }
      </div>
      <div>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  )
}

export default Dashboard
