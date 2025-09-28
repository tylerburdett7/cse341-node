// src/db.js
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
if (!uri) throw new Error('MONGODB_URI not set in .env');

const client = new MongoClient(uri, { useUnifiedTopology: true });
let db = null;

export async function connectToMongo() {
  if (!db) {
    await client.connect();
    db = client.db(process.env.MONGODB_DB || 'contactsDB');
    console.log('✅ Connected to MongoDB');
  }
  return db;
}

export function getDb() {
  if (!db) throw new Error('Database not connected. Call connectToMongo() first.');
  return db;
}
