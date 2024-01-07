import axios from 'axios';

const BASE_URL = "https://se-test-server.it-core.fun/api";
const REFERER = "https://se-test-server.it-core.fun";

class ApiService {
    constructor(){
       // const cors = require("cors");
       //    ApiService.use(cors());
    }
    getCsrfCookie() {
        const url =`${BASE_URL}/csrf-cookie`;
        try {
            const response = axios.get(url, {
                headers: {
                    "Accept": "application/json"
                    // "Referer": REFERER
                },
                withCredentials: true // Important for cookies
            });
            const csrfCookie = response.headers['set-cookie'].find(cookie => cookie.startsWith("XSRF-TOKEN"));
            console.log(csrfCookie);
            return csrfCookie || null;
        } catch (error) {
            console.error('Error fetching CSRF cookie:', error);
        }
    }

    getServerSessionCookie (response){
        //String: serverSessionCookie
         return response.headers['set-cookie'].find(cookie => cookie.startsWith("server_session"));

    }
    ApiRequestAllUsers(csrfCookie, serverSessionCookie) {
        const apiUrl = `${BASE_URL}/users`;
        console.log("ApiRequestAllUsers")
        try {
            const response = axios.get(apiUrl, {
                headers: {
                    "Accept": "application/json",
                    "Access-Control-Allow-Origin": "https://localhost:3000",
                    "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
                    "Referer": "",
                    "Cookie": `XSRF-TOKEN=${csrfCookie};server_session=${serverSessionCookie}`
                }
            });
            console.log(response)
            return response.data; // Or however you want to handle the response
        } catch (error) {
            console.error('Error requesting all users:', error);
        }
    }

    loginAsPlayerLobby (csrfCookie) {
        const apiUrl = `${BASE_URL}/login`;
        const jsonBody = {
            "name": "playerLobby",
            "email": "player.lobby@gmail.com",
            "password": "frytkiBatatki1",
            "password_confirmation": "frytkiBatatki1"
        };
        try {
            const response = axios.post(apiUrl, jsonBody, {
                headers: {
                    "Accept": "application/json",
                    "Referer": REFERER,
                    "X-XSRF-TOKEN": csrfCookie // Make sure this is correct for your server setup
                },
                withCredentials: true
            });
            return response;
        } catch (error) {
            console.error('Error logging in:', error);
        }
    }
    createGame (csrfCookie, serverSessionCookie){
        const apiUrl = `${BASE_URL}/games`;
        const jsonBody = {
            limit: 4,
            level: 3
        };
        try {
            const response = axios.post(apiUrl, jsonBody, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Referer": REFERER,
                    "Cookie": `${csrfCookie}; ${serverSessionCookie}`
                },
                withCredentials: true
            });
            return response; // Or handle the response as needed
        } catch (error) {
            console.error('Error creating game:', error);
        }
    }

    amILoggedInPls (csrfCookie, serverSessionCookie) {
        const apiUrl = `${BASE_URL}/user`;
        try {
            const response = axios.get(apiUrl, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Referer": REFERER,
                    "Cookie": `${csrfCookie}; ${serverSessionCookie}`
                },
                withCredentials: true
            });
            return response; // Or handle the response as needed
        } catch (error) {
            console.error('Error checking login status:', error);
        }
    }
};

export default ApiService;
