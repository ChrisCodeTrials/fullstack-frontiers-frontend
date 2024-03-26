import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import "../Styles/QuoteDetails.css"

const API = import.meta.env.VITE_BASE_URL

const QuoteDetails = () => {
    const [quote, setQuote] = useState({})
    const { id } = useParams()
    useEffect(()=>{
        fetch(`${API}/api/quotes/${id}`)
        .then((res)=> res.json())
        .then((resJSON)=> setQuote(resJSON))
    },[id])

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
    </div>
  )
}

export default QuoteDetails