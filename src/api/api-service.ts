import axios from "axios";

// const baseURL = process.env.REACT_APP_API_ENDPOINT;
const baseURL = "http://localhost:3000/api/";

export default axios.create({
  baseURL
});