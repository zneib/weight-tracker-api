import { Router } from "https://deno.land/x/oak/mod.ts";
import { addWorkouts, getWorkouts } from "./controllers/entries.ts";

const router = new Router();

// Implement routes
router
  .post("/api/workouts", addWorkouts) // Add a day of tallied workouts
  .get("/api/workouts", getWorkouts) // Get all days

export default router;