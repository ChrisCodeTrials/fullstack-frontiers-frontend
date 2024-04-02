import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import "../Styles/AllQuotes.css";

const AllQuotes = () => {
  const [allQuotes, setAllQuotes] = useState([]);
  const URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    fetch(`${URL}/api/quotes`)
      .then((res) => res.json())
      .then((data) => {
        setAllQuotes(data);
      });
  }, []);

  return (
    <Container fluid className="p-5 quotes-background">
      <Row className="justify-content-center">
        <Col lg={8}>
          <h2 className="text-center text-custom mb-4">Inspirational Quotes</h2>
          <Row xs={1} md={2} className="g-4">
            {allQuotes.map((quote) => (
              <Col key={quote.id}>
                <Card className="h-100 quote-card">
                  <Card.Body>
                    <Card.Text className="quote-text">
                      <Link
                        to={`/quotes/quote/${quote.id}`}
                        className="quote-link"
                      >
                        {quote.quote}
                      </Link>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          <div className="d-flex justify-content-center mt-5">
            <Button
              as={Link}
              to="/quote/create"
              className="create-quote-btn custom-inspiration-btn"
            >
              Add Your Own Inspiration
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AllQuotes;
