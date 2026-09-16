import { Link } from 'react-router-dom'
import './Home.css'

export default function Home() {
  return (
    <div className="home">
      <header>
        <h1>Client Project Dashboard</h1>
      </header>
      <nav className="home-actions">
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </nav>
    </div>
  )
}
