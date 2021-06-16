import axios from "axios";

export default axios.create({
  baseURL: "http://10.147.20.77:5000",
  headers: {
    "Content-type": "application/json"
  }
});
