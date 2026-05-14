import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getAllFeedback } from '../services/feedbackService'

const ratingLabel = { 1: 'Poor', 2: 'Fair', 3: 'Good', 4: 'Very Good', 5: 'Excellent' }

function Dashboard() {
  const [feedbackList, setFeedbackList] = useState([])

  useEffect(() => {
    getAllFeedback().then(res => setFeedbackList(res.data))
  }, [])

  const total = feedbackList.length
  const avgRating = total
    ? (feedbackList.reduce((sum, f) => sum + f.rating, 0) / total).toFixed(1)
    : 0
  const recent = [...feedbackList].reverse().slice(0, 5)

  return (
    <div className="page">
      <h2>Dashboard</h2>

      <div className="stats">
        <div className="stat-card">
          <h3>Total Feedback</h3>
          <p>{total}</p>
        </div>
        <div className="stat-card">
          <h3>Average Rating</h3>
          <p>{avgRating} / 5</p>
        </div>
      </div>

      <h3 style={{ marginBottom: '1rem', color: '#2c3e50' }}>Recent Feedback</h3>
      {recent.length === 0 ? (
        <p>No feedback submitted yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Participant</th>
              <th>Program</th>
              <th>Rating</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {recent.map(f => (
              <tr key={f.feedback_id}>
                <td>{f.participant_name}</td>
                <td>{f.program_name}</td>
                <td>{f.rating} – {ratingLabel[f.rating]}</td>
                <td>{new Date(f.submitted_at).toLocaleDateString()}</td>
                <td><Link to={`/feedback/${f.feedback_id}`}>View</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default Dashboard
