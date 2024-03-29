import React, { useEffect, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { updateAppointment, updateDoctor } from '../helpers/fetch';

const API = import.meta.env.VITE_BASE_URL;

const ScheduleAppointment = () => {
    const [appointments, setAppointments] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [chosenAppointment, setChosenAppointment] = useState({});
    const [chosenDoctor, setChosenDoctor] = useState({});
    const { user } = useOutletContext();
    const [userHasAppointment, setUserHasAppointment] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        fetch(`${API}/api/appointments`)
            .then((res) => res.json())
            .then((data) => {
                const filteredAppointments = data.filter((appointment) => !appointment.user_id);
                const foundAppointment = data.find((appointment)=> appointment.user_id === user.id)
                console.log(foundAppointment)
                if(foundAppointment){
                    setUserHasAppointment(true)
                }
                setAppointments(filteredAppointments);
            });
    }, []);

    useEffect(() => {
        fetch(`${API}/api/doctors`)
            .then((res) => res.json())
            .then((data) => {
                const filteredDocs = data.filter((doctor) => !doctor.appt_id);
                setDoctors(filteredDocs);
            });
    }, []);

    const handleDoctorSelect = (event) => {
        const selectedDoctorId = event.target.value;
        // console.log(event.target.value)
        const selectedDoctor = doctors.find((doctor) => doctor.id === Number(selectedDoctorId));

        // console.log(selectedDoctor)
        setChosenDoctor(selectedDoctor);
    };

    const handleAppointmentSelect = (event) => {
        const selectedAppointmentId = event.target.value;
        const selectedAppointment = appointments.find((appointment) => appointment.id === Number(selectedAppointmentId));
        setChosenAppointment(selectedAppointment);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const {id:appt_id} = chosenAppointment
        const {id:user_id} = user
        const {id:doctor_id} = chosenDoctor

        chosenAppointment.user_id = user_id
        chosenDoctor.appt_id = appt_id

        updateAppointment(chosenAppointment,appt_id)
        .then((res)=> console.log(res))
        
        updateDoctor(chosenDoctor, doctor_id)
        .then((res)=>console.log(res))
   
       

    };

    if(userHasAppointment){
        return (
            <div>
                Sorry, but you cannot select more than one appointment!
            </div>
        )
    }
    return (
        <div>
            <h1>Schedule An Appointment</h1>
            <form onSubmit={handleSubmit}>
                <select onChange={handleDoctorSelect}>
                    <option value="">Select a Doctor</option>
                    {doctors.map((doctor) => (
                        <option key={doctor.id} value={doctor.id}>
                            {doctor.surname}, {doctor.specialty}
                        </option>
                    ))}
                </select>
                <select onChange={handleAppointmentSelect}>
                    <option value="">Select an Appointment</option>
                    {appointments.map((appointment) => (
                        <option key={appointment.id} value={appointment.id}>
                            {appointment.appt_reason}, {appointment.appt_date}, {appointment.duration} session.
                        </option>
                    ))}
                </select>
                <button type="submit">Schedule Appointment</button>
            </form>
        </div>
    );
};

export default ScheduleAppointment;
