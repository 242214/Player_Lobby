import ServerConnection from "./ServerConnection";
class PlayerLobby {
    constructor(gameId, lobbyId, serverConnection) {
        this.gameId = gameId;
        this.lobbyId = lobbyId;
        this.serverConnection = serverConnection; // Make sure this is already defined and correctly implemented
        this.listOfPlayers = [];
        //this.listOfPlayers.push([playerUUID, playerName, points])
        this.listOfPlayers.push(this.serverConnection.getLoggedUser())
        this.points = [];
    };

    async addPlayer(playerId) {
        const response = await this.serverConnection.addPlayer('token', this.gameId, playerId);
        if (response.match('"message": "You have successfully joined the game"')) {
            this.listOfPlayers.push(this.serverConnection.getUser(playerId));
        } else {
            console("Player wasn't added");
        }
    };

    async startGame() {
        const response = await this.serverConnection.updateLobby(2, null, this.gameId);
        // send this.listOfPlayers to game component
        return response;
    };

    async endGame() {
        const response = await this.serverConnection(3, null, this.gameId);
        return response;
    };

    getGameId() {
        return this.gameId;
    };

    getLobbyId() {
        return this.lobbyId;
    };

    getListOfPlayers() {
        return [...this.listOfPlayers];
    };

    addPoints(pointsToAdd) {
        this.points = this.points.map((points, index) => points + (pointsToAdd[index] || 0));
    };

    getPoints() {
        return [...this.points];
    };
}

export default PlayerLobby;
