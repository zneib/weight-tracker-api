import { Request } from "https://deno.land/std@0.152.0/http/negotiation";
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

interface Response {
  status: number;
  body: {
    success: boolean,
    msg?: string
    data?: {
      workout: any | undefined
    }
    insertedId?: {
      _id: ObjectId,
      workout: any | undefined
    }
  }
}

const addWorkouts = async({request, response}: {request: Request; response: Response}) => {
  try {
    if (!request.hasBody) {
      response.status = 400;
      response.body = {
        success: false,
        msg: "No Data"
      }
    } else {
      const body = await request.body();
      const workout = await JSON.parse(body.value);
      const insertedId = await workouts.insertOne({
        _id: new ObjectId(),
        workout
      });

      response.status = 201;
      response.body = {
        success: true,
        data: workout,
        insertedId
      }
    }
  } catch (error) {
    response.body = {
      success: false,
      msg: error.toString(),
    }
  }
}

const getWorkouts = async({response}: {response: Response}) => {
  try {
    const foundWorkouts = await workouts.find();
    if (foundWorkouts) {
      response.status = 200;
      response.body = {
        success: true,
        data: foundWorkouts
      }
    }
  } catch (error) {
    response.body = {
      success: false,
      msg: error.toString(),
    }
  }
}

export { addWorkouts, getWorkouts}