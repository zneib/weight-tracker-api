import { MongoClient, ObjectId } from "https://deno.land/x/atlas_sdk@v1.1.1/mod.ts";
const data_api_key = Deno.env.get("DATA_API_KEY");

if (!data_api_key) throw new Error('API Key not found');

const client = new MongoClient({
  endpoint: "https://data.mongodb-api.com/app/data-zsayf/endpoint/data/v1",
  dataSource: "weight-tracker-api",
  auth: {
    apiKey: data_api_key
  }
});

const db = client.database("workouts-db");
const workouts = db.collection("workouts");

const addWorkouts = async({request, response}: {request: any; response: any}) => {
  // Stuff goes here
}

const getWorkouts = async({request, response}: {request: any; response: any}) => {
  // Stuff goes here
}

export { addWorkouts, getWorkouts}