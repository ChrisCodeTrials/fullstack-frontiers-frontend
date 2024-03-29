import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import quotesForm from "./MotivationalQuotesForm"


const AllQuotes = () => {
    const [allQuotes, setAllQuotes] = useState([])

    const URL = import.meta.env.VITE_BASE_URL;

    useEffect(() => {
        fetch(`${URL}/api/quotes`)
          .then((res) => res.json())
          .then((data) => {
            setAllQuotes(data)
          })
    }, [])

   return (
     <div>
        <h2>View All Quotes</h2>
        <ul>
          {allQuotes.map((quote, index) => (
           <Link to={`/quotes/quote/${quote.id}`}><li key={index}>{quote.quote}</li></Link> 
          ))}
      </ul>
      <Link to="/quote/create"><h4>Create a quote</h4></Link> 
     </div>
   )
}



export default AllQuotes