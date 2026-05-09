import axios from "axios";

export default axios.create({
  baseURL: "https://inventory-system-backend-ifte.onrender.com/api",
});