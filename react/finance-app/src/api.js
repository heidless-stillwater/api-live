import axios from 'axios';

const api = axios.create({
//  baseURL: " https://cloud-sql-fastapi-njepcfc3la-nw.a.run.app",
  baseURL: "http://localhost:8000",
})

export default api;



