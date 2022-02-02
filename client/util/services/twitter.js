import axios from 'axios'

const basePath = '/api/twitter'

export const getTimeline = async () => {
  const response = await axios.get(`${basePath}/timeline`)
  return response.data
}

export const getUser = async () => {
  const response = await axios.get(`${basePath}/user`)
  return response.data
}
