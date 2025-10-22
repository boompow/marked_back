import { MongoClient } from "mongodb";
import "dotenv/config";

const client = new MongoClient(process.env.MONGODB_URI);

await client.connect();
console.log("Connected to MongoDB for Better Auth");

// defining the database instance
const db = client.db("BetterAuthDB")

export {db};