import ServerConnection from './ServerConnection'; // Assuming you have this module from earlier
import ApiService  from './ApiService'; // Assuming you have this module from earlier

// class Hub  {
//     constructor(){};
//     chooseGame: function(gameId) {
//         const service = new ApiService(); // Initialize the ApiService
//         const serverConnection = new ServerConnection(service); // Create a ServerConnection with the service
//         // serverConnection.createGameLobby(gameId);
//         return serverConnection;
//     }
// }

class Hub {
    constructor() {
    }
    async chooseGame() {
        const service = new ApiService(); // Initialize the ApiService
        const serverConnection = new ServerConnection(service); // Create a ServerConnection with the service
        //serverConnection.csrfToken = await ApiService.getCsrfToken();
        // serverConnection.createGameLobby(gameId);
        return serverConnection;
    }
}

export default Hub;
