import ApiService from './ApiService';
import PlayerLobby from "./PlayerLobby"; // Import the ApiService you created earlier

class ServerConnection {
    constructor(service) {
        this.playerLobbies = [];
        this.objectMapper = {}; // Assuming you have a way to parse and handle JSON data as needed
        this.service = service;
    }

    async createGameLobby(gameId) {
        // Implement logic to create game lobby
        const lobby =  new PlayerLobby (gameId, Date.now(), this ); // Simulate creating a lobby with gameId and a timestamp
        this.playerLobbies.push(lobby);
        return lobby;
    }

    getPlayerLobbies() {
        return [...this.playerLobbies]; // Return a copy of playerLobbies array
    }

    async checkUuidExists(uuidToCheck) {
        try {
            // const csrfCookie = await this.service.getCsrfCookie();
            // const sessionCookie = await this.service.getServerSessionCookie(); // Assuming this method exists and works
            const response = await this.service.ApiRequestAllUsers();
            const users = response.data; // Adjust based on actual API response structure

            return users.some(user => user.uuid === uuidToCheck); // Return true if uuid is found among users
        } catch (error) {
            console.error('Error checking UUID exists:', error);
            return false;
        }
    }

    async getUuidFromCreateGameResponse() {
        try {
            const csrfCookie = await this.service.getCsrfCookie();
            const sessionCookie = await this.service.getServerSessionCookie(); // Assuming this method exists and works
            const response = await this.service.createGame(csrfCookie, sessionCookie);
            const responseBody = response.data; // Adjust based on actual API response structure

            // Assuming the response has a data structure with a uuid, adjust as necessary
            return responseBody.data ? responseBody.data.uuid : null;
        } catch (error) {
            console.error('Error getting UUID from create game response:', error);
            return null;
        }
    }

    // Add other methods as necessary, translating from Java to JavaScript
}

export default ServerConnection;
