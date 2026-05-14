import { useState } from 'react'
import { submitFeedback } from '../services/feedbackService'
import FeedbackForm from '../components/FeedbackForm'

function SubmitFeedback() {
  const [message, setMessage] = useState('')
  const [isError, setIsError] = useState(false)
  const [formKey, setFormKey] = useState(0)

  const handleSubmit = async (formData) => {
    try {
      await submitFeedback(formData)
      setMessage('Feedback submitted successfully!')
      setIsError(false)
      setFormKey(k => k + 1)
    } catch {
      setMessage('Error submitting feedback. Please try again.')
      setIsError(true)
    }
  }

  return (
    <div className="page">
      <h2>Submit Feedback</h2>
      {message && <p className={`message ${isError ? 'error' : ''}`}>{message}</p>}
      <FeedbackForm key={formKey} onSubmit={handleSubmit} buttonLabel="Submit Feedback" />
    </div>
  )
}

export default SubmitFeedback
