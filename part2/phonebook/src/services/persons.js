import axios from 'axios'
const baseURL = 'http://localhost:3001/persons'

const getAll = () => {
  console.log('Fetching names from database')
  return axios.get(baseURL)
}

const create = person => {
  console.log('Creating name ' + person.name + ' in database')
  return axios.post(baseURL, person)
}

export default {
  getAll: getAll,
  create: create
}