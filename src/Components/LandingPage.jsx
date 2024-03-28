import React from "react";
import { Button, Carousel, Container, Row, Col, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Styles/LandingPage.css";

const LandingPage = () => {
  const testimonials = [
    {
      name: "Jordan Miles",
      review:
        "Incredibly empathetic and professional. Helped me navigate through tough times.",
      stars: 5,
    },
    {
      name: "Alex Quinn",
      review:
        "Provided excellent support and practical strategies for dealing with anxiety.",
      stars: 4,
    },
    {
      name: "Casey Lee",
      review:
        "Very patient and understanding. I felt truly supported in my journey to wellness.",
      stars: 5,
    },
    {
      name: "Morgan Kim",
      review:
        "Great at listening, but I felt the approach was somewhat generic.",
      stars: 3,
    },
  ];

  const renderStars = (rating) => {
    let stars = "";
    for (let i = 0; i < 5; i++) {
      stars += i < rating ? "★" : "☆";
    }
    return <div className="star-rating">{stars}</div>;
  };

  return (
    <div className="landing-page">
      <section className="hero-section text-center p-5">
        <Container>
          <h1>Empowering Your Mental Wellness Journey</h1>
          <p className="mb-4">
            Whether it's your first appointment or you're continuing your
            journey, MindEase is here to support you every step of the way.
          </p>
          <Button
            variant="primary"
            href="#schedule"
            className="appointment-button mb-3"
          >
            Schedule Your Appointment
          </Button>
          <div className="illustration-container">
            <img
              src="src/Components/undraw_mindfulness_8gqa.svg"
              alt="Hero Illustration"
              className="img-fluid hero-illustration"
            />
          </div>
        </Container>
      </section>

      <section className="features-section py-5">
        <Container>
          <h2 className="section-title">Features</h2>
          <Row className="g-4 mb-5 justify-content-center">
            <Col md={4}>
              <div className="feature-card">
                <h3>Scheduling</h3>
                <p>
                  Instantly book real-time appointments with our network of
                  psychologists and psychiatrists. Our platform allows for
                  immediate scheduling to ensure you find the right support when
                  you need it most.
                </p>
              </div>
            </Col>
            <Col md={4}>
              <div className="feature-card">
                <h3>Motivational Quotes</h3>
                <p>
                  Discover daily quotes to inspire your mental wellness journey.
                  Engage with our community by sharing quotes that resonate with
                  you and your experiences.
                </p>
              </div>
            </Col>
            <Col md={4}>
              <div className="feature-card">
                <h3>Resources</h3>
                <p>
                  Access a wealth of resources including articles, tips, and
                  guides on mental health. Our curated content is designed to
                  provide valuable information and support at your fingertips.
                </p>
              </div>
            </Col>
          </Row>
          <div className="illustration-container">
            <img
              src="src/Components/undraw_undraw_undraw_undraw_undraw_undraw_undraw_undraw_undraw_selectoption_y9cm_mx7w_-2-_vjsk_js62_gghb_35qw_um1m_-1-_cqnl_5lof.svg"
              alt="Features Illustration"
              className="img-fluid"
            />
          </div>
        </Container>
      </section>

      <section className="testimonials-section py-5">
        <Container>
          <h2 className="text-center mb-4">What Our Clients Say</h2>
          <Carousel>
            {testimonials.map((testimonial, index) => (
              <Carousel.Item key={index}>
                <Card className="text-center">
                  <Card.Body>
                    <Card.Title>{testimonial.name}</Card.Title>
                    <Card.Text>{testimonial.review}</Card.Text>
                    {renderStars(testimonial.stars)}
                  </Card.Body>
                </Card>
              </Carousel.Item>
            ))}
          </Carousel>
        </Container>
      </section>

      <section className="about-mindease py-5">
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <h2>About MindEase</h2>
              <p>
                MindEase is a collaborative network of psychologists and
                psychiatrists dedicated to providing personalized mental health
                support. Our team works together to guide individuals through
                their mental wellness journey, ensuring they receive the care
                they need at every step.
              </p>
            </Col>
            <Col md={6}>
              <div className="illustration-container">
                <img
                  src="src/Components/undraw_team_re_0bfe.svg"
                  alt="About MindEase"
                  className="img-fluid"
                />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <footer className="footer text-white text-center p-2 mt-5">
        <Container>
          <p>MindEase &copy; {new Date().getFullYear()}</p>
        </Container>
      </footer>
    </div>
  );
};

export default LandingPage;
