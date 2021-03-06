import { getLobbyById } from "../../../server/lobbies";

export default (req, res) => {
  const { lobbyId } = req.query;

  if (req.method === "POST") {
    const lobby = getLobbyById(lobbyId);
    if (lobby) {
      const playerId = req.session.id;
      if (!lobby.players.includes(playerId)) {
        lobby.addPlayer(playerId);
        return res.json(lobby);
      }
      return res.sendStatus(400);
    }
    return res.sendStatus(404);
  }
  if (req.method === "GET") {
    const lobby = getLobbyById(lobbyId);
    if (lobby) {
      return res.json(lobby);
    }
    return res.sendStatus(404);
  }
  return res.sendStatus(404);
};
