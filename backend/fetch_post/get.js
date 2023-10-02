import cors from 'cors';
import express from 'express';
import { connectDatabase } from '../assets/db.js';
import { all_endpoints, PORT } from '../endpoints.js';

const app = express();

// Use the cors middleware
app.use(cors());
app.get('/', (req, res) => {
  const instructions = {
    message: "Welcome to the API. Use the following endpoints:",
    endpoints: all_endpoints
  };
  res.json(instructions);
});

all_endpoints.forEach(endpoint => {
  app.use(cors());
  app.get(endpoint.path, async(req, res)=>{
    try {
      const db = await connectDatabase();
      const data = await db.collection(endpoint.collection).find().toArray();
      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  })  
})

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

