import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const API = import.meta.env.VITE_BASE_URL

const QuoteDetails = () => {
    const [quote, setQuote] = useState({})
    const { id } = useParams()
    useEffect(()=>{
        fetch(`${API}/api/quotes/${id}`)
        .then((res)=> res.json())
        .then((resJSON)=> setQuote(resJSON))
    },[id])
  return (
    <div>
        <h1>Quote Details</h1>
        <h2>{quote.author}</h2>

    </div>
  )
}

export default QuoteDetails