import { useState } from 'react'

function FeedbackForm({ initialData = {}, onSubmit, buttonLabel = 'Submit' }) {
  const [form, setForm] = useState({
    participant_name: initialData.participant_name || '',
    program_name: initialData.program_name || '',
    rating: initialData.rating || '',
    comments: initialData.comments || ''
  })
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.participant_name || !form.program_name || !form.rating) {
      setError('Please fill in all required fields.')
      return
    }
    setError('')
    onSubmit({ ...form, rating: parseInt(form.rating) })
  }

  return (
    <form onSubmit={handleSubmit} className="form">
      {error && <p className="message error">{error}</p>}

      <label>Participant Name *</label>
      <input
        name="participant_name"
        value={form.participant_name}
        onChange={handleChange}
        placeholder="Enter your name"
      />

      <label>Training / Event / Product *</label>
      <input
        name="program_name"
        value={form.program_name}
        onChange={handleChange}
        placeholder="Enter program name"
      />

      <label>Rating *</label>
      <select name="rating" value={form.rating} onChange={handleChange}>
        <option value="">Select a rating</option>
        <option value="1">1 – Poor</option>
        <option value="2">2 – Fair</option>
        <option value="3">3 – Good</option>
        <option value="4">4 – Very Good</option>
        <option value="5">5 – Excellent</option>
      </select>

      <label>Comments</label>
      <textarea
        name="comments"
        value={form.comments}
        onChange={handleChange}
        placeholder="Enter your comments (optional)"
        rows={4}
      />

      <button type="submit">{buttonLabel}</button>
    </form>
  )
}

export default FeedbackForm
