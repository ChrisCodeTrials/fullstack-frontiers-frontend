import { useState, useEffect } from "react";
import { useOutletContext, useNavigate, Link } from "react-router-dom";
import { Button, Card, Container, Row, Col } from "react-bootstrap";
const API = import.meta.env.VITE_BASE_URL;

const Dashboard = ({ setLogUser }) => {
  const { user } = useOutletContext();

  const navigate = useNavigate();
  const [appointment, setAppointment] = useState({});
  const [doctor, setDoctor] = useState({});

  async function handleLogout() {
    const response = await fetch(`${API}/api/auth/logout`, {
      method: "GET",
      credentials: "include",
    });
    if (response.ok) {
      setLogUser(false);
      navigate("/login");
    }
  }

  useEffect(() => {
    fetch(`${API}/api/appointments`)
      .then((res) => res.json())
      .then((data) => {
        const foundAppointment = data.find(
          (appointment) => appointment.user_id === user.id
        );
        if (foundAppointment) {
          setAppointment(foundAppointment);
        }
      });
  }, [user.id]);

  useEffect(() => {
    if (appointment.id) {
      fetch(`${API}/api/doctors`)
        .then((res) => res.json())
        .then((data) => {
          const foundDoctor = data.find(
            (doctor) => doctor.appt_id === Number(appointment.id)
          );
          if (foundDoctor) {
            setDoctor(foundDoctor);
          }
        });
    }
  }, [appointment]);

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <h1 className="text-center mb-4">
            Welcome, {user && user.username.toUpperCase()}
          </h1>
          {Object.keys(appointment).length !== 0 &&
          Object.keys(doctor).length !== 0 ? (
            <Card>
              <Card.Body>
                <Card.Title>Your Upcoming Appointment:</Card.Title>
                <Card.Text>Date: {appointment.appt_date}</Card.Text>
                <Card.Text>Located at: {appointment.location}</Card.Text>
                <Card.Text>Duration: {appointment.duration}</Card.Text>
                <Card.Text>
                  Your appointment is with Dr. {doctor.surname}
                </Card.Text>
                <Link
                  to={`/appointments/appointment/${appointment.id}`}
                  className="btn btn-primary"
                >
                  View Appointment
                </Link>
              </Card.Body>
            </Card>
          ) : (
            <Button
              onClick={() => navigate("/appointments/create")}
              className="w-100 mt-3"
            >
              Schedule an Appointment
            </Button>
          )}
          <Button
            onClick={handleLogout}
            variant="secondary"
            className="w-100 mt-3"
          >
            Logout
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
