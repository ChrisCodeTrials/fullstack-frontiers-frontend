import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import "../Styles/QuoteDetails.css"

const API = import.meta.env.VITE_BASE_URL

const QuoteDetails = () => {
    const [quote, setQuote] = useState({})
    const { id } = useParams()
    const navigate = useNavigate()


    useEffect(()=>{
        fetch(`${API}/api/quotes/${id}`)
        .then((res)=> res.json())
        .then((resJSON)=> setQuote(resJSON))
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
              <button>Edit Quote</button>
              <button onClick={() => handleDelete(quote.id)}>Delete Quote</button>
            </div>
        ): (
          null
        )}
    </div>
  )
}

export default QuoteDetails