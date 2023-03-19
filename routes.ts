import { Router } from "https://deno.land/x/oak/mod.ts";
import { addPlayer, getPlayers, getPlayer } from "./controllers/entries.ts";

const router = new Router();

// Implement routes
router
  .post("/api/players", addPlayer) // Add a player
  .post("/api/games", addGame) // Add a new game
  .get("/api/players", getPlayers) // Get all players
  .get("/api/getPlayer/:id", getPlayer) // Get a single player
  .get("/api/getTeams", getTeams) // Get all teams
  .get("/api/games", getGames) // Get all previously saved games

export default router;