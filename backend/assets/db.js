import { MongoClient } from 'mongodb';
console.log('checking')

const client = new MongoClient("mongodb+srv://RSA_Admin:HYO250-RSA_ADMIN@clusterrsa1.samuinz.mongodb.net/", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  ssl:false
});

export async function connectDatabase() {
  try {
    await client.connect();
    return client.db('RSA_DATASET'); // Adjust the database name here
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}

export default client;
