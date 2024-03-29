import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, useOutletContext } from 'react-router-dom'
import "../Styles/QuoteDetails.css"

const API = import.meta.env.VITE_BASE_URL

const QuoteDetails = () => {
    const [quote, setQuote] = useState({})
    const [toggleQuoteForm, setToggleQuoteForm] = useState(false)
    const {user} = useOutletContext()
    const [quoteForm, setQuoteForm] = useState(
      {
        user_id: user.id,
        author: "",
        quote: "",
        category: ""
    }
    )

    const { id } = useParams()
    const navigate = useNavigate()


    useEffect(()=>{
        fetch(`${API}/api/quotes/${id}`)
        .then((res)=> res.json())
        .then((resJSON)=> {
          setQuote(resJSON)
          setQuoteForm(resJSON)
        })
      },[id])
      
      const handleDelete = (id) => {
        const csrfToken = document.cookie
        .split("; ")
        .find((row) => row.startsWith("XSRF-TOKEN="))
        .split("=")[1];
        const options = {
          method: "Delete",
          headers: {
            "Content-Type": "application/json",
            "CSRF-Token": csrfToken,
          },
          credentials: "include",
        };
        
        fetch(`${API}/api/quotes/${id}`, options)
        .then((res) => res.json())
        .then(() => {
          navigate("/quotes")
        })
        .catch((err) => console.error("403"))
      }

      const handleChange = (e) => {
        setQuoteForm( { ...quoteForm,
        [e.target.id] : e.target.value
        })
    }

    const handleSubmit = (e) => {
      e.preventDefault()
  
      const csrfToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("XSRF-TOKEN="))
      .split("=")[1];
      fetch(`${API}/api/quotes/${id}`, {
        method:"PUT",
        headers: {
          "Content-Type": "application/json",
          "CSRF-Token": csrfToken,
        },
        credentials: "include",
        body: JSON.stringify(quoteForm)
      })
        .then((res) => res.json())
        .then((data) => {
            navigate("/quotes")
        })
  
        .catch((err) => console.error())
    }
      
      if(Object.keys(quote).length === 0) return null
      
      return (
        <div className='quote-detail-wrapper'>
        <p className='quote-category'> Quote Category: {quote.category} Quote</p>
        <div className='quote-text-wrapper'>
            <p className='opening-quote'>"</p>
            <p className='quote-text'>{quote.quote}</p>
            <p className='closing-quote'>"</p>
        </div>
        <h2 className='quote-author'>- {quote.author}</h2>
        {quote.user_id ? (
          <div>
              <button onClick={() => setToggleQuoteForm(!toggleQuoteForm)}>Edit Quote</button>
              <button onClick={() => handleDelete(quote.id)}>Delete Quote</button>
              {toggleQuoteForm && 
              <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="quote" className="form-label"></label>
          <textarea
            id="quote"
            required
            value={quoteForm.quote}
            onChange={handleChange}
            placeholder="Enter Quote..."
            rows="4"
            className="form-textarea"
          />
        </div>
        <div className="form-group">
          <label htmlFor='author' className="form-label"></label>
          <input
            type="text"
            required
            id="author"
            placeholder="Author"
            value={quoteForm.author} 
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <div>
          <label htmlFor='category' className='form-label'/>
          <input 
          type="text"
          id="category"
          placeholder='Enter Category'
          value={quoteForm.category}
          onChange={handleChange}
          className='form-input'
          />
        </div>
        <button
          type="submit"
          className="form-submit-btn"
        >
          Submit
        </button>
      </form>
      }
            </div>
        ): (
          null
          )}
    </div>
  )
}

export default QuoteDetails