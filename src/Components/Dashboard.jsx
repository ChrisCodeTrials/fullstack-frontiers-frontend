import { useOutletContext, useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const { user } = useOutletContext() // Access user data provided by the Outlet's context
  const navigate = useNavigate()

  async function handleLogout() {
    const response = await fetch('http://localhost:3003/api/auth/logout', {
      method: 'GET', // or 'POST', depending on your backend
      credentials: 'include',
    })
    if (response.ok) {
      // Here, you should also clear any authentication state in your application
      // For example, if you're using a global state or context to track authentication
      // setIsAuthenticated(false);
      // setUser(null);
      navigate('/login')
    }
  }
  return (
    <div>
      <h1>Welcome, {user && user.username.toUpperCase()}</h1>
      <h3>This is a protected Component called Dashboard</h3>
      {/* Use user data as needed, for example: */}
      <div>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  )
}

export default Dashboard
