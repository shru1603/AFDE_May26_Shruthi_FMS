import API from '../api'

export const submitFeedback = (data) => API.post('/feedback', data)
export const getAllFeedback = () => API.get('/feedback')
export const getFeedbackById = (id) => API.get(`/feedback/${id}`)
export const updateFeedback = (id, data) => API.put(`/feedback/${id}`, data)
export const deleteFeedback = (id) => API.delete(`/feedback/${id}`)
export const searchFeedback = (params) => API.get('/search', { params })
