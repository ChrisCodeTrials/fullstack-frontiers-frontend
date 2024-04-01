import React, { useEffect, useState } from 'react';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { updateAppointment, updateDoctor } from '../helpers/fetch';

const API = import.meta.env.VITE_BASE_URL;

const RescheduleAppointment = () => {
    const [appointments, setAppointments] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [chosenAppointment, setChosenAppointment] = useState({});
    const [chosenDoctor, setChosenDoctor] = useState({});
    const [previousDoctor, setPreviousDoctor] = useState({})
    const [previousAppointment, setPreviousAppointment] = useState({})
    const { user } = useOutletContext();
    const navigate = useNavigate()
    const {appointment_id} = useParams()

    const handleDelete = () =>{
        previousAppointment.user_id = null
        previousDoctor.appt_id = null

        updateAppointment(previousAppointment, previousAppointment.id)
        updateDoctor(previousDoctor, previousDoctor.id)

        // navigate("/dashboard")
        
    }

    const handleDoctorSelect = (event) => {
        const selectedDoctorId = event.target.value;
        const selectedDoctor = doctors.find((doctor) => doctor.id === Number(selectedDoctorId));
        
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

        previousAppointment.user_id = null
        previousDoctor.appt_id = null

        chosenAppointment.user_id = user_id
        chosenDoctor.appt_id = appt_id

        updateAppointment(previousAppointment, previousAppointment.id)
        updateDoctor(previousDoctor, previousDoctor.id)

        updateAppointment(chosenAppointment,appt_id)
        updateDoctor(chosenDoctor, doctor_id)

        .then((res)=> navigate(`/appointments/appointment/${appt_id}`))
    };

    useEffect(() => {
        fetch(`${API}/api/appointments`)
            .then((res) => res.json())
            .then((data) => {
                const filteredAppointments = data.filter((appointment) => !appointment.user_id);
                const foundAppointment = data.find((appointment)=> appointment.user_id === user.id)
                if(foundAppointment){
                    setPreviousAppointment(foundAppointment)
                }else{
                    navigate("/appointments/create")
                }
                setAppointments(filteredAppointments);
            });
    }, []);

    useEffect(() => {
        fetch(`${API}/api/doctors`)
            .then((res) => res.json())
            .then((data) => {
                const filteredDocs = data.filter((doctor) => !doctor.appt_id);
                const foundDoctor = data.find((doctor)=> doctor.appt_id === Number(appointment_id))
                if(foundDoctor){
                    setPreviousDoctor(foundDoctor)
                }
                setDoctors(filteredDocs);
            });
    }, []);


    if(Object.keys(previousAppointment).length === 0 || Object.keys(previousDoctor).length === 0){
        return null
    }

    return (
        <div>
            <h1>Schedule An Appointment</h1>
            <p>{previousAppointment.appt_reason}</p>
            <p>{previousDoctor.surname}</p>
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
            <button onClick={handleDelete}>Delete Appointment</button>
        </div>
    );
};

export default RescheduleAppointment;
