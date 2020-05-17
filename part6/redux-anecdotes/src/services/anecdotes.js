import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const object = { content, votes: 0 }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const updateVotes = async (id) => {
  const anecdotes = await axios.get(baseUrl)
  const anecdoteToChange = anecdotes.data.find(n => n.id === id)
  const newVotes = anecdoteToChange.votes + 1
  const vote = { ...anecdoteToChange, votes: newVotes }
  const url = baseUrl + '/' + id
  const response = axios.put(url, vote)
  return response
}

export default {
  getAll,
  createNew,
  updateVotes
}