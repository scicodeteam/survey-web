import axios from "axios";
import { API_BASE_URL } from "../utils/const.jsx";

const http = axios.create({
    baseURL: API_BASE_URL,
})

export default http;