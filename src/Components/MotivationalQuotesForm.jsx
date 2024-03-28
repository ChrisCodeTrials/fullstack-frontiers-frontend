import {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import "../Styles/MotivationalQuotes.css"


const URL = import.meta.env.VITE_BASE_URL;

const MotivationalQuotes = () => {
  const [quote, setQuote] = useState("")
  const [createdAuthor, setCreatedAuthor] = useState("")
  const [inputedCategory, setInputedCategory] = useState("")
  const [createdQuote, setCreatedQuote] = useState([])

  const handleQuoteChange = (e) => {
    setQuote(e.target.value)
  }

  const handleAuthorChange = (e) => {
    setCreatedAuthor(e.target.value)
  }

  const handleCategoryChange = (e) => {
    setInputedCategory(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const newQuote = {
      author: createdAuthor,
      quote: quote,
      category: inputedCategory
    }
    const csrfToken = document.cookie
    .split("; ")
    .find((row) => row.startsWith("XSRF-TOKEN="))
    .split("=")[1];
    fetch(`${URL}/api/quotes`, {
      method:"POST",
      headers: {
        "Content-Type": "application/json",
        "CSRF-Token": csrfToken, // Include CSRF token in request headers
      },
      credentials: "include",
      body: JSON.stringify(newQuote)
    })
      .then((res) => res.json())
      .then((data) => {
        setCreatedQuote([...quote, data])
        setQuote("")
        setCreatedAuthor("")
        setInputedCategory("")
      })

      .catch((err) => console.error())
  }

  const handleDelete = () => {

  }


  return (
    <div className='form-page'>
    <h1 className='form-header'>Create Quote</h1>
    <div className="form-container"> 
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="user-quote" className="form-label"></label>
          <textarea
            id="user-quote"
            required
            value={quote}
            onChange={handleQuoteChange}
            placeholder="Enter Quote..."
            rows="4"
            className="form-textarea"
          />
        </div>
        <div className="form-group">
          <label htmlFor='user-name' className="form-label"></label>
          <input
            type="text"
            required
            id="user-name"
            placeholder="Author"
            value={createdAuthor} 
            onChange={handleAuthorChange}
            className="form-input"
          />
        </div>
        <div>
          <label htmlFor='category' className='form-label'/>
          <input 
          type="text"
          id="category"
          placeholder='Enter Category'
          value={inputedCategory}
          onChange={handleCategoryChange}
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
    </div>
    <div>
      <h3 className='saved-quotes-header'>View saved quotes here !</h3>
      <ul>
        {createdQuote.map((item, index) => (
          <li key={index}>{item.quote} - {item.createdAuthor}</li>
        ))}
      </ul>
    </div>
  </div>
  )
}

export default MotivationalQuotes