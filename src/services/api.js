import axios from 'axios'

const api = axios.create({
  baseURL:'https://192.168.43.185:3333',
})

export default api