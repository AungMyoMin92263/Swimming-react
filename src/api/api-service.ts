import axios from "axios";

// const baseURL = process.env.REACT_APP_API_ENDPOINT;
const baseURL = "https://be-swimming.onrender.com/api";

export default axios.create({
  baseURL
});
