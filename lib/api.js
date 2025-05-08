import axios from "axios";

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true, // this ensures the HttpOnly cookie is sent with requests
});

// ❌ REMOVE this interceptor since token is in HttpOnly cookie
// api.interceptors.request.use(...)

export default api;
