import axios from 'axios';

class ApiService {

    static getCsrfToken = async () => {
        try {
            const response = await axios.get('https://se-test-server.it-core.fun/api/csrf-cookie', {
                headers: {
                    "Accept": "application/json",
                    //"Referer": "https://se-test-server.it-core.fun",
                    "Origin": "https://localhost:3000"
                },
                withCredentials: true
            });
            let csrfCookie = await response.headers['set-cookie'].find(cookie => cookie.startsWith("XSRF-TOKEN")) + ";" + response.headers['set-cookie'].find(cookie => cookie.startsWith("server_session"));
            //console.log(csrfCookie.split(";"))
            const split = csrfCookie.split(";");
            const token = `${split[0]};${split[7]}`
            console.log(token);
            return token;
        } catch (error) {
            console.error('Error retriving CSRF cookie:', error);
            throw error;
        }
    };

    static loginAsPlayerLobby = async (csrfCookie) => {
        const apiUrl = `https://se-test-server.it-core.fun/api/login`;
        const jsonBody = {
            "email": "player.lobby@gmail.com",
            "password": "frytkiBatatki1",
        };
        try {
            const response = axios.post(apiUrl, jsonBody, {
                headers: {
                    "Connection": "keep-alive",
                    "Accept": "application/json",
                    "Referer": "https://se-test-server.it-core.fun",
                    "X-XSRF-TOKEN": csrfCookie,
                },
                withCredentials: true
            });
            return response;
        } catch (error) {
            console.error('Error logging in:', error);
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

}

export default ApiService;
