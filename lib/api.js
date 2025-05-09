import axios from "axios";
console.log(process.env.NEXT_PUBLIC_API_BASE_URL)
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true, // this ensures the HttpOnly cookie is sent with requests
});



export default api;
