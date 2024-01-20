import axios from 'axios';

class ApiService {

    static getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        return null;
    };

    static fetchCsrfToken = async () => {
        try {
            await axios.get('/api/csrf-cookie', { withCredentials: true });
            const csrfToken = this.getCookie('XSRF-TOKEN');
            return csrfToken;
        } catch (error) {
            console.error('Error retrieving CSRF cookie:', error);
            throw error;
        }
    };

    static fetchLoggedUser = async () => {
        try {
            const response = await axios.get('/api/user', { withCredentials: true });
            return response.data.data;
        } catch (error) {
            console.error('Error fetching user data:', error);
            throw error;
        }
    };

    static createGame = async (csrfToken, player_limit, level) => {
        try {
            const response = await axios.post('/api/games', {
                limit: player_limit,
                level: level
            },{
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Referer": "https://se-test-server.it-core.fun",
                    "Cookie": `${csrfToken}`
                },
                withCredentials: true
            });
            return response.data.data
        } catch (error) {
            console.error('Error creating lobby:', error);
            throw error;
        }
    };

    static addUserToLobby = async (csrfToken, gameUUID, joiner_uuid) => {
        try {
            const response = await axios.put(`/api/games/${gameUUID}`, {
                joiner_uuid: joiner_uuid
            }, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Referer": "https://se-test-server.it-core.fun",
                    "Cookie": `${csrfToken}`
                },
                withCredentials: true
            });
            return response;
        } catch (error) {
            console.error('Error when adding player to lobby:', error);
            throw error;
        }
    };

    static updateLobbyStage = async (csrfToken, gameUUID, stage) => {
        try {
            const response = await  axios.put(`/api/games/${gameUUID}`, {
                stage: stage
            }, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Referer": "https://se-test-server.it-core.fun",
                    "Cookie": `${csrfToken}`
                },
                withCredentials: true
            });
            return response;
        } catch (error) {
            console.error('Error when updating lobby stage:', error);
            throw error;
        }
    };

    static updateLobbyPoints = async (csrfToken, gameUUID, points) => {
        try {
            const response = await axios.put(`/api/games/${gameUUID}`, {
                points: points
            }, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Referer": "https://se-test-server.it-core.fun",
                    "Cookie": `${csrfToken}`
                },
                withCredentials: true
            });
            return response;
        } catch (error) {
            console.error('Error when updating lobby points:', error);
            throw error;
        }
    };

    static fetchUser = async (csrfToken, userUUID) => {
        try {
            const response = await axios.get(`/api/users/${userUUID}`,  {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Referer": "https://se-test-server.it-core.fun",
                    "Cookie": `${csrfToken}`
                },
                withCredentials: true
            });
            return response;
        } catch (error) {
            console.error('Error when fetching user data:', error);
            throw error;
        }
    };

    static destroyGame = async (csrfToken, gameUUID) => {
        try {
            const response = await axios.delete(`api/games/${gameUUID}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Referer": "https://se-test-server.it-core.fun",
                    "Cookie": `${csrfToken}`
                },
                withCredentials: true
            });
            return response;
        } catch (error) {
            console.error('Error when destroying game:', error);
            throw error;
        }
    };

    // ApiRequestAllUsers(csrfCookie, serverSessionCookie) {
    //     const apiUrl = `${BASE_URL}/users`;
    //     console.log("ApiRequestAllUsers")
    //     try {
    //         const response = axios.get(apiUrl, {
    //             headers: {
    //                 "Accept": "application/json",
    //                 "Access-Control-Allow-Origin": "https://localhost:3000",
    //                 "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
    //                 "Referer": ""
    //                 //"Cookie": `XSRF-TOKEN=${csrfCookie};server_session=${serverSessionCookie}`
    //             }
    //         });
    //         console.log(response)
    //         return response.data; // Or however you want to handle the response
    //     } catch (error) {
    //         console.error('Error requesting all users:', error);
    //     }
    // }
    //
    // loginAsPlayerLobby (csrfCookie) {
    //     const apiUrl = `${BASE_URL}/login`;
    //     const jsonBody = {
    //         "name": "playerLobby",
    //         "email": "player.lobby@gmail.com",
    //         "password": "frytkiBatatki1",
    //         "password_confirmation": "frytkiBatatki1"
    //     };
    //     try {
    //         const response = axios.post(apiUrl, jsonBody, {
    //             headers: {
    //                 "Accept": "application/json",
    //                 "Referer": REFERER,
    //                 "X-XSRF-TOKEN": csrfCookie // Make sure this is correct for your server setup
    //             },
    //             withCredentials: true
    //         });
    //         return response;
    //     } catch (error) {
    //         console.error('Error logging in:', error);
    //     }
    // }
};

export default ApiService;
