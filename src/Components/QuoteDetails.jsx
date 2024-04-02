import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import { Card } from "react-bootstrap";
import "../Styles/QuoteDetails.css";

const API = import.meta.env.VITE_BASE_URL;

const QuoteDetails = () => {
  const [quote, setQuote] = useState({});
  const [toggleQuoteForm, setToggleQuoteForm] = useState(false);
  const { user } = useOutletContext();
  const [quoteForm, setQuoteForm] = useState({
    user_id: user.id,
    author: "",
    quote: "",
    category: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API}/api/quotes/${id}`)
      .then((res) => res.json())
      .then((resJSON) => {
        setQuote(resJSON);
        setQuoteForm(resJSON);
      });
  }, [id]);

  const handleDelete = (id) => {
    const csrfToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("XSRF-TOKEN="))
      .split("=")[1];
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "CSRF-Token": csrfToken,
      },
      credentials: "include",
    };

    fetch(`${API}/api/quotes/${id}`, options)
      .then((res) => res.json())
      .then(() => {
        navigate("/quotes");
      })
      .catch((err) => console.error("Error deleting quote", err));
  };

  const handleChange = (e) => {
    setQuoteForm({ ...quoteForm, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const csrfToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("XSRF-TOKEN="))
      .split("=")[1];
    fetch(`${API}/api/quotes/${id}`, {
      method: "PUT",
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
      .catch((err) => console.error("Error updating quote", err));
  };

  if (Object.keys(quote).length === 0) return null;

  return (
    <div
      className="quote-detail-wrapper"
      style={{ backgroundColor: "var(--rose-quartz)" }}
    >
      <Card
        className="text-center"
        style={{ backgroundColor: "#967aa1ff", color: "white" }}
      >
        <Card.Header
          style={{
            backgroundColor: "#967aa1ff",
            borderBottom: "1px solid white",
          }}
        >
          Quote Category: {quote.category}
        </Card.Header>
        <Card.Body>
          <blockquote className="blockquote mb-0">
            <p>"{quote.quote}"</p>
            <footer className="blockquote-footer" style={{ color: "white" }}>
              - {quote.author}
            </footer>
          </blockquote>
        </Card.Body>
        {quote.user_id && (
          <Card.Footer
            style={{
              backgroundColor: "#967aa1ff",
              borderTop: "1px solid white",
            }}
          >
            <button
              onClick={() => setToggleQuoteForm(!toggleQuoteForm)}
              className="btn btn-outline-light me-2"
            >
              Edit Quote
            </button>
            <button
              onClick={() => handleDelete(quote.id)}
              className="btn btn-outline-danger"
            >
              Delete Quote
            </button>
            {toggleQuoteForm && (
              <form onSubmit={handleSubmit} className="mt-3"></form>
            )}
          </Card.Footer>
        )}
      </Card>
    </div>
  );
};

export default QuoteDetails;
