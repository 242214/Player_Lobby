import DummyGameInstance from './DummyGameInstance';
class PlayerLobby {
    constructor(gameId, lobbyId, serverConnection) {
        this.gameId = gameId;
        this.lobbyId = lobbyId;
        this.serverConnection = serverConnection; // Make sure this is already defined and correctly implemented
        this.listOfPlayers = [];
        this.points = [];
        this.xp = [];
    }

    async addPlayer(playerId) {
        const exists = await this.serverConnection.checkUuidExists(playerId);
        if (exists) {
            this.listOfPlayers.push(playerId);
            this.points.push(0); // Initialize points to 0
            this.xp.push(0); // Initialize xp to 0
        }
    }

    kickPlayer(playerId) {
        const playerIndex = this.listOfPlayers.indexOf(playerId);
        if (playerIndex !== -1) {
            this.listOfPlayers.splice(playerIndex, 1);
            this.points.splice(playerIndex, 1);
            this.xp.splice(playerIndex, 1);
        }
    }

    startGame() {
        // Assuming DummyGameInstance is defined and correctly implemented
        const game = new DummyGameInstance(this.listOfPlayers, this, this.serverConnection.getUuidFromCreateGameResponse());
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
