import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { submitFeedback } from '../services/feedbackService'
import FeedbackForm from '../components/FeedbackForm'

function SubmitFeedback() {
  const [message, setMessage] = useState('')
  const [isError, setIsError] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (formData) => {
    try {
      await submitFeedback(formData)
      setSubmitted(true)
    } catch {
      setMessage('Error submitting feedback. Please try again.')
      setIsError(true)
    }
  }

  if (submitted) {
    return (
      <div className="page">
        <h2>Submit Feedback</h2>
        <p className="message">Feedback submitted successfully!</p>
        <button onClick={() => navigate('/feedback')}>View All Feedback</button>
      </div>
    )
  }

  return (
    <div className="page">
      <h2>Submit Feedback</h2>
      {message && <p className={`message ${isError ? 'error' : ''}`}>{message}</p>}
      <FeedbackForm onSubmit={handleSubmit} buttonLabel="Submit Feedback" />
    </div>
  )
}

export default SubmitFeedback
