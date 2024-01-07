class DummyGameInstance {
    constructor(players, lobby, uuid) {
        this.players = players;
        this.lobby = lobby;
        this.xp = [];
        this.points = [];
        this.uuid = uuid;
    }

    finishGame() {
        this.updateGameState();
        console.log("Game finished");
        this.lobby.addXP(this.xp);
        this.lobby.addPoints(this.points);
    }

    startGame() {
        console.log("Game started");
        // Implement any additional logic needed when the game starts
    }

    updateGameState() {
        this.players.forEach(() => {
            const randomXP = Math.floor(Math.random() * 10 + 1);
            this.xp.push(randomXP);

            const randomPoints = Math.floor(Math.random() * 10 + 1);
            this.points.push(randomPoints);
        });
    }

    getPoints() {
        return this.points;
    }

    getXp() {
        return this.xp;
    }

    getPlayers() {
        return this.players;
    }

    getUuid() {
        return this.uuid;
    }
}

export default DummyGameInstance;
