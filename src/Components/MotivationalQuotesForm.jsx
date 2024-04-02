import { useState, useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import "../Styles/MotivationalQuotes.css";

const URL = import.meta.env.VITE_BASE_URL;

const MotivationalQuotes = () => {
  const { user } = useOutletContext();
  const navigate = useNavigate();

  const [quoteForm, setQuoteForm] = useState({
    user_id: user.id,
    author: "",
    quote: "",
    category: "",
  });

  const handleChange = (e) => {
    setQuoteForm({ ...quoteForm, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const csrfToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("XSRF-TOKEN="))
      .split("=")[1];

    fetch(`${URL}/api/quotes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "CSRF-Token": csrfToken,
      },
      credentials: "include",
      body: JSON.stringify(quoteForm),
    })
      .then((res) => res.json())
      .then((data) => {
        navigate("/quotes");
      })
      .catch((err) => console.error());
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <h1 className="text-center mb-4">Create Quote</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="quote">Quote</Form.Label>
              <Form.Control
                as="textarea"
                id="quote"
                required
                value={quoteForm.quote}
                onChange={handleChange}
                placeholder="Enter Quote..."
                rows={4}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="author">Author</Form.Label>
              <Form.Control
                type="text"
                required
                id="author"
                placeholder="Author"
                value={quoteForm.author}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="category">Category</Form.Label>
              <Form.Control
                type="text"
                id="category"
                placeholder="Enter Category"
                value={quoteForm.category}
                onChange={handleChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default MotivationalQuotes;
