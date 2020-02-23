import axios from 'axios'
const baseURL = 'http://localhost:3001/api/persons/'

const getAll = () => {
  // console.log('Fetching names from database')
  return axios.get(baseURL)
}

const create = person => {
  // console.log('Creating name ' + person.name + ' in database')
  return axios.post(baseURL, person)
}

const update = ( id,  person) => {
  return axios.put(baseURL + id, person)
}

const remove = ( id ) => {
  // console.log('removing ' + id + ' from database')
  // console.log(baseURL + id)
  return axios.delete(baseURL + id)
}

export default {
  getAll,
  create,
  update,
  remove
}