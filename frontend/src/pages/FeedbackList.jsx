import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getAllFeedback, searchFeedback } from '../services/feedbackService'

const ratingLabel = { 1: 'Poor', 2: 'Fair', 3: 'Good', 4: 'Very Good', 5: 'Excellent' }

function FeedbackList() {
  const [feedbackList, setFeedbackList] = useState([])
  const [keyword, setKeyword] = useState('')
  const [rating, setRating] = useState('')
  const [programName, setProgramName] = useState('')

  useEffect(() => {
    getAllFeedback().then(res => setFeedbackList(res.data))
  }, [])

  const handleSearch = async () => {
    const params = {}
    if (keyword) params.keyword = keyword
    if (rating) params.rating = rating
    if (programName) params.program_name = programName
    const res = await searchFeedback(params)
    setFeedbackList(res.data)
  }

  const handleReset = () => {
    setKeyword('')
    setRating('')
    setProgramName('')
    getAllFeedback().then(res => setFeedbackList(res.data))
  }

  return (
    <div className="page">
      <h2>All Feedback</h2>

      <div className="filters">
        <input
          placeholder="Search by keyword..."
          value={keyword}
          onChange={e => setKeyword(e.target.value)}
        />
        <select value={rating} onChange={e => setRating(e.target.value)}>
          <option value="">All Ratings</option>
          {[1, 2, 3, 4, 5].map(r => (
            <option key={r} value={r}>{r} – {ratingLabel[r]}</option>
          ))}
        </select>
        <input
          placeholder="Filter by program..."
          value={programName}
          onChange={e => setProgramName(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
        <button onClick={handleReset}>Reset</button>
      </div>

      {feedbackList.length === 0 ? (
        <p>No feedback found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Participant</th>
              <th>Program</th>
              <th>Rating</th>
              <th>Comments</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {feedbackList.map(f => (
              <tr key={f.feedback_id}>
                <td>{f.participant_name}</td>
                <td>{f.program_name}</td>
                <td>{f.rating} – {ratingLabel[f.rating]}</td>
                <td>{f.comments || '—'}</td>
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

export default FeedbackList
