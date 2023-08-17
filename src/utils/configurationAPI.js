import axios from "axios";
const instance = axios.create({
    baseURL: 'https://management-schedule-server.vercel.app/',
    timeout: 1000,
    headers: {
        'Content-Type': 'application/json',
    }
});

export {instance};