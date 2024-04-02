import React, { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { updateAppointment, updateDoctor } from "../helpers/fetch";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";

const API = import.meta.env.VITE_BASE_URL;

const ScheduleAppointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [chosenAppointment, setChosenAppointment] = useState({});
  const [chosenDoctor, setChosenDoctor] = useState({});
  const { user } = useOutletContext();
  const [userHasAppointment, setUserHasAppointment] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API}/api/appointments`)
      .then((res) => res.json())
      .then((data) => {
        const filteredAppointments = data.filter(
          (appointment) => !appointment.user_id
        );
        const foundAppointment = data.find(
          (appointment) => appointment.user_id === user.id
        );
        if (foundAppointment) {
          setUserHasAppointment(true);
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

  const handleDoctorSelect = (doctorId) => {
    const selectedDoctor = doctors.find(
      (doctor) => doctor.id === Number(doctorId)
    );
    setChosenDoctor(selectedDoctor);
  };

  const handleAppointmentSelect = (appointmentId) => {
    const selectedAppointment = appointments.find(
      (appointment) => appointment.id === Number(appointmentId)
    );
    setChosenAppointment(selectedAppointment);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { id: appt_id } = chosenAppointment;
    const { id: user_id } = user;
    const { id: doctor_id } = chosenDoctor;

    chosenAppointment.user_id = user_id;
    chosenDoctor.appt_id = appt_id;

    updateAppointment(chosenAppointment, appt_id);
    updateDoctor(chosenDoctor, doctor_id).then(() =>
      navigate(`/appointments/appointment/${appt_id}`)
    );
  };

  if (userHasAppointment) {
    return (
      <div className="alert alert-info" role="alert">
        Sorry, but you cannot select more than one appointment!
      </div>
    );
  }

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <h1 className="mb-4 text-center section-title">
            Schedule An Appointment
          </h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Select a Doctor</Form.Label>
              <Form.Select
                aria-label="Select a Doctor"
                onChange={(e) => handleDoctorSelect(e.target.value)}
              >
                <option value="">Select a Doctor</option>
                {doctors.map((doctor) => (
                  <option key={doctor.id} value={doctor.id}>
                    {doctor.surname}, {doctor.specialty}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Select an Appointment</Form.Label>
              <Form.Select
                aria-label="Select an Appointment"
                onChange={(e) => handleAppointmentSelect(e.target.value)}
              >
                <option value="">Select an Appointment</option>
                {appointments.map((appointment) => (
                  <option key={appointment.id} value={appointment.id}>
                    {appointment.appt_reason}, {appointment.appt_date},{" "}
                    {appointment.duration} session.
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <div className="text-center">
              <Button variant="primary" type="submit">
                Schedule Appointment
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ScheduleAppointment;
