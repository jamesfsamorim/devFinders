import axios from 'axios'
import { SERVER_URL } from "../utils/constants";

const api = axios.create({
    baseURL: SERVER_URL
})

export default api