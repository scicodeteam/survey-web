import axios from "axios";
import { API_BASE_URL } from "../utils/const.js";

const http = axios.create({
    baseURL: API_BASE_URL,
})

export default http;