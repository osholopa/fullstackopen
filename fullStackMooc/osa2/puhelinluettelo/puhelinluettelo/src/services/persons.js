import axios from "axios"
const baseUrl = "/api/persons"

const create = newPerson => {
  const request = axios.post(baseUrl, newPerson)
  return request.then(response => response.data)
}

const remove = id => {
  const url = `${baseUrl}/${id}`
  const request = axios.delete(url)
  return request.then(response => response.data)
}

const update = (id, newPerson) => {
  const url = `${baseUrl}/${id}`
  const request = axios.put(url, newPerson)
  return request.then(response => response.data)
}

export default { create, remove, update }
