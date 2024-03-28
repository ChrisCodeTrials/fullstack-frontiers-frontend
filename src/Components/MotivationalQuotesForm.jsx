import {useState, useEffect} from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'
import "../Styles/MotivationalQuotes.css"


const URL = import.meta.env.VITE_BASE_URL;

const MotivationalQuotes = () => {

  const {user} = useOutletContext()

  const [quoteForm, setQuoteForm] = useState({
      user_id: user.id,
      author: "",
      quote: "",
      category: ""
  })

 const handleChange = (e) => {
     setQuoteForm( { ...quoteForm,
     [e.target.id] : e.target.value
     })
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
        "CSRF-Token": csrfToken,
      },
      credentials: "include",
      body: JSON.stringify(newQuote)
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setCreatedQuote([...quote, data])
        setQuote("")
        setCreatedAuthor("")
        setInputedCategory("")
      })

      .catch((err) => console.error())
  }

  return (
    <div className='form-page'>
    <h1 className='form-header'>Create Quote</h1>
    <div className="form-container"> 
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
    </div>
    <div>
      <h3 className='saved-quotes-header'>View saved quotes here !</h3>
      <ul>
          <li key={quoteForm.user_id}>{quoteForm.quote} - {quoteForm.author}</li>
      </ul>
    </div>
  </div>
  )
}

export default MotivationalQuotes