import React, { useState, useEffect } from "react";
import { Button, Carousel, Container, Row, Col, Card } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Styles/LandingPage.css";

const LandingPage = () => {
  const navigate = useNavigate();
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTopBtn(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const testimonials = [
    {
      name: "Jordan Miles",
      review:
        "Incredibly professional and supportive, providing clear paths toward wellness.",
      stars: Math.floor(Math.random() * (5 - 4 + 1)) + 4,
    },
    {
      name: "Alex Quinn",
      review:
        "Offered fantastic support and actionable strategies for better mental health.",
      stars: Math.floor(Math.random() * (5 - 4 + 1)) + 4,
    },
    {
      name: "Casey Lee",
      review:
        "Truly understanding and patient, making the journey to wellness feel supported.",
      stars: Math.floor(Math.random() * (5 - 4 + 1)) + 4,
    },
    {
      name: "Morgan Kim",
      review:
        "Their approach to mental health is both innovative and deeply empathetic.",
      stars: Math.floor(Math.random() * (5 - 4 + 1)) + 4,
    },
  ];

  const renderStars = (rating) => {
    let stars = "";
    for (let i = 0; i < 5; i++) {
      stars += i < Math.floor(rating) ? "★" : "☆";
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
            className="custom-appointment-button mb-3"
            onClick={() => navigate("/login")}
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
          {showTopBtn && (
            <button
              onClick={scrollToTop}
              className="back-to-top-btn"
              aria-label="Back to top"
            >
              ↑ Top
            </button>
          )}
        </Container>
      </section>
      <section className="features-section py-5">
        <Container>
          <h2 className="section-title">Features</h2>
          <Row className="g-4 mb-5 justify-content-center">
            <Col md={4}>
              <Link to='/appointments/create'>
              <div className="feature-card">
                <h3>Scheduling</h3>
                <p>
                  Instantly book real-time appointments with our network of
                  psychologists and psychiatrists. Our platform allows for
                  immediate scheduling to ensure you find the right support when
                  you need it most.
                </p>
              </div>
              </Link>
            </Col>
            <Col md={4}>
              <Link to='/quotes'>
              <div className="feature-card">
                <h3>Motivational Quotes</h3>
                <p>
                  Discover daily quotes to inspire your mental wellness journey.
                  Engage with our community by sharing quotes that resonate with
                  you and your experiences.
                </p>
              </div>
              </Link>
            </Col>
            <Col md={4}>
              <Link to="/resources" >
              <div className="feature-card">
                <h3>Resources</h3>
                <p>
                  Access a wealth of resources including articles, tips, and
                  guides on mental health. Our curated content is designed to
                  provide valuable information and support at your fingertips.
                </p>
              </div>
              </Link>
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

      <footer className="footer text-white text-center">
        <Container>
          <p>MindEase &copy; {new Date().getFullYear()}</p>
        </Container>
      </footer>
    </div>
  );
};

export default LandingPage;
