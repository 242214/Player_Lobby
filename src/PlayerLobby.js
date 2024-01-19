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
    }

    async addPlayer(playerId) {
        const exists = await this.serverConnection.checkUuidExists(playerId);
        if (exists) {
            this.listOfPlayers.push(this.serverConnection.getUser('token', playerId));
        }
    }

    startGame() {
        // Assuming DummyGameInstance is defined and correctly implemented
        //const game = new DummyGameInstance(this.listOfPlayers, this, this.serverConnection.getUuidFromCreateGameResponse());
        const game = ServerConnection().createGameLobby(123)
        return game;
    }

    getGameId() {
        return this.gameId;
    }

    getLobbyId() {
        return this.lobbyId;
    }

    getListOfPlayers() {
        return [...this.listOfPlayers];
    }

    addXP(xpToAdd) {
        this.xp = this.xp.map((xp, index) => xp + (xpToAdd[index] || 0));
    }

    addPoints(pointsToAdd) {
        this.points = this.points.map((points, index) => points + (pointsToAdd[index] || 0));
    }

    getPoints() {
        return [...this.points];
    }

    getXp() {
        return [...this.xp];
    }
}

export default PlayerLobby;
