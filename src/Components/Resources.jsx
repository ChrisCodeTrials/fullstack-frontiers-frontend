import React, { useState, useEffect } from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../Styles/Resources.css";

const Resources = () => {
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

  const mentalHealthTools = [
    {
      title: "Headspace",
      description:
        "A meditation app designed to help reduce stress and improve focus.",
    },
    {
      title: "Calm",
      description:
        "Offers meditation and sleep stories to help improve sleep and lower stress.",
    },
    {
      title: "Moodfit",
      description:
        "A tool to help track and improve your mood, helping to fight depression and anxiety.",
    },
    {
      title: "Talkspace",
      description:
        "Online therapy with licensed therapists, offering emotional support.",
    },
    {
      title: "BetterHelp",
      description:
        "Provides online counseling and therapy services from licensed therapists.",
    },
  ];

  const copingTechniques = [
    {
      title: "Deep Breathing",
      description: "Helps calm your nervous system and reduce stress.",
    },
    {
      title: "Progressive Muscle Relaxation",
      description:
        "Tense and then slowly release each muscle group to release stress.",
    },
    {
      title: "Regular Exercise",
      description:
        "Improves mood and reduces symptoms of anxiety and depression.",
    },
    {
      title: "Healthy Eating Habits",
      description:
        "A balanced diet can significantly affect your emotional well-being.",
    },
    {
      title: "Setting Boundaries",
      description:
        "Learning to say no is crucial for mental health and well-being.",
    },
  ];

  const dailyWellnessTips = [
    "Start your day with a positive affirmation.",
    "Take short breaks throughout the day to relax and reset.",
    "Write down three things you're grateful for every evening.",
    "Spend at least 30 minutes a day on a hobby or activity you enjoy.",
    "Practice mindfulness or meditation to stay present.",
  ];

  return (
    <Container className="my-5">
      <Row className="mb-5">
        <Col>
          <h2 className="text-center mb-4">Mental Health Tools</h2>
          <Row xs={1} md={2} lg={3} className="g-4">
            {mentalHealthTools.map((tool, index) => (
              <Col key={index}>
                <Card className="h-100">
                  <Card.Body>
                    <Card.Title>{tool.title}</Card.Title>
                    <Card.Text>{tool.description}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>

      <Row className="mb-5">
        <Col>
          <h2 className="text-center mb-4">Coping Techniques</h2>
          <Row xs={1} md={2} lg={3} className="g-4">
            {copingTechniques.map((technique, index) => (
              <Col key={index}>
                <Card className="h-100">
                  <Card.Body>
                    <Card.Title>{technique.title}</Card.Title>
                    <Card.Text>{technique.description}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>

      <Row className="mb-5">
        <Col>
          <h2 className="text-center mb-4">Daily Wellness Tips</h2>
          <ul className="list-unstyled">
            {dailyWellnessTips.map((tip, index) => (
              <li key={index} className="mb-2">
                {tip}
              </li>
            ))}
          </ul>
        </Col>
      </Row>

      <div className="text-center mb-5">
        <h3>Interested in Speaking with a Professional?</h3>
        <p>
          If you're looking to seek advice from a doctor, please log in or
          register to book an appointment.
        </p>
        <Link to="/login" className="btn btn-primary me-2">
          Login
        </Link>
        <Link to="/register" className="btn btn-secondary">
          Register
        </Link>
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
  );
};

export default Resources;
