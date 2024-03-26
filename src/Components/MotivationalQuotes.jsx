import {useState} from 'react'

const MotivationalQuotes = () => {
  const [quote, setQuote] = useState("")
  const [createdAuthor, setCreatedAuthor] = useState("")
  const [inputedCategory, setInputedCategory] = useState("")
  const [createdQuote, setCreatedQuote] = useState([])

  const handleChange = (e) => {
    e.preventDefault()
    setQuote(...e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  }





  return (
    <div className='form-page'>
      <h1 className='form-header'>Create Quote</h1>
      <form onSubmit={handleSubmit} className="form-container">
            <div>
              <label htmlFor="user-quote" className="form-user-quote" />
              <textarea
                id="user-quote"
                required
                value={quote}
                onChange={handleChange}
                placeholder="Enter Quote..."
                rows="4"
                className=""
              />
            </div>
            <div className="">
              <input
                type="text"
                required
                id="user-name"
                placeholder="Author"
                
                onChange={handleChange}
                className=""
              />
              <br/>
              <button
                type="submit"
                className="form-submit-btn"
              >
                Submit
              </button>
            </div>
          </form>
    </div>
  )
}

export default MotivationalQuotes