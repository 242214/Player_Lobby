import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import PlayerLobby from './PlayerLobby'; // Your path may vary
import ServerConnection from './ServerConnection'; // Your path may vary
import ApiService from './ApiService'; // Your path may vary
import DummyGameInstance from './DummyGameInstance';
import Hub from './Hub';

function App() {
  const [lobby, setLobby] = useState(null);
  const [players, setPlayers] = useState([]);

  // Handles creating a new game lobby
  const handleCreateLobby = async () => {
    const hub = new Hub();
    const serverConnection = await hub.chooseGame();
    serverConnection.csrfToken = await ApiService.getCsrfToken();
    //const login = await ApiService.loginAsPlayerLobby(serverConnection.csrfToken);
    //console.log(login);
    //const lobby = await serverConnection.createLobby(1);
    //setLobby(lobby);
  };

  // Handles adding a new player to the lobby
  const handleAddPlayer = async () => {
    if (!lobby){
      console.log("Gówno");
      return;
    } // Ensure there is a lobby
    console.log("Gówno");
    const playerId = 'abb123ca-6fe7-400d-96bc-c551c9ae8df1'; // Replace with actual player ID or input
    await lobby.addPlayer(playerId);
    setPlayers([...lobby.getListOfPlayers()]); // Update local state
  };

  return (
      <div className="App">
        {/* Button to create a new game lobby */}
        <button onClick={handleCreateLobby}>Create Lobby</button>

        {/* Button to add a player to the lobby */}
        <button onClick={handleAddPlayer} disabled={!lobby}>Add Player</button>

        {/* Displaying the lobby and players */}
        {lobby && (
            <div>
              <h2>Lobby ID: {lobby.getLobbyId()}</h2>
              <h3>Players:</h3>
              <ul>
                {players.map(player => (
                    <li key={player}>{player}</li> // Assuming player is a string or has unique identifier
                ))}
              </ul>
            </div>
        )}
      </div>
  );
}
export default App;
