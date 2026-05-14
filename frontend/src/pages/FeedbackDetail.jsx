import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getFeedbackById, updateFeedback, deleteFeedback } from '../services/feedbackService'
import FeedbackForm from '../components/FeedbackForm'

const ratingLabel = { 1: 'Poor', 2: 'Fair', 3: 'Good', 4: 'Very Good', 5: 'Excellent' }

function FeedbackDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [feedback, setFeedback] = useState(null)
  const [editing, setEditing] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    getFeedbackById(id).then(res => setFeedback(res.data))
  }, [id])

  const handleUpdate = async (formData) => {
    try {
      const res = await updateFeedback(id, formData)
      setFeedback(res.data)
      setEditing(false)
      setMessage('Feedback updated successfully!')
    } catch {
      setMessage('Error updating feedback.')
    }
  }

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this feedback?')) return
    await deleteFeedback(id)
    navigate('/feedback')
  }

  if (!feedback) return <p>Loading...</p>

  return (
    <div className="page">
      <h2>Feedback Details</h2>
      {message && <p className="message">{message}</p>}

      {!editing ? (
        <div className="detail-card">
          <p><strong>Participant:</strong> {feedback.participant_name}</p>
          <p><strong>Program:</strong> {feedback.program_name}</p>
          <p><strong>Rating:</strong> {feedback.rating} – {ratingLabel[feedback.rating]}</p>
          <p><strong>Comments:</strong> {feedback.comments || '—'}</p>
          <p><strong>Submitted:</strong> {new Date(feedback.submitted_at).toLocaleString()}</p>
          <div className="actions">
            <button onClick={() => setEditing(true)}>Edit</button>
            <button onClick={handleDelete} className="danger">Delete</button>
            <button onClick={() => navigate('/feedback')}>Back</button>
          </div>
        </div>
      ) : (
        <div>
          <FeedbackForm initialData={feedback} onSubmit={handleUpdate} buttonLabel="Save Changes" />
          <button type="button" onClick={() => setEditing(false)} style={{ marginTop: '0.75rem' }}>
            Cancel
          </button>
        </div>
      )}
    </div>
  )
}

export default FeedbackDetail
