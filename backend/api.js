import bcrypt from 'bcrypt';
import cors from 'cors';
import express from 'express';
import { connectDatabase } from './assets/db.js';
import { postOrUpdate } from './fetch_post/post.js';
import { all_endpoints, post_endpoints, PORT } from './endpoints.js';

const app = express();
const router = express.Router();
const authenticate = ['register', 'login'];

app.use(express.json());

//Fetching API
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
      console.log(`fetched ${endpoint.name} successfully`)
      res.json(data);
    } catch (error) {
      console.error(error);
      console.log(`error fetching ${endpoint.name}`)
      res.status(500).json({ error: 'Internal Server Error' });
    }
  })  
})

// Create POST and UPDATE endpoints for each endpoint configuration
post_endpoints.forEach(endpoint => {
    app.use(cors());
    router.post(`/${endpoint.path}/post`, async (req, res) => {
        postOrUpdate(req, res, endpoint);
        console.log(`set ${endpoint.name} post successfully`)
    });
    app.use(cors());
    router.post(`/${endpoint.path}/update`, async (req, res) => {
        postOrUpdate(req, res,endpoint, true);
        console.log(`set ${endpoint.name} update successfully`)
    });
});

authenticate.forEach(type => {
  app.use(cors());
  app.post(`/members/${type}`, async (req, res) => {
    console.log('req: ', req  )
    console.log('res: ', res  )
    const { email, password } = req.body;
    const db = await connectDatabase();
    try {
      if (type === 'register') {
        const hashedPassword = await bcrypt.hash(password, 10);
        await db.collection('Users').insertOne({
          email,
          password: hashedPassword,
        });
        console.log('User registered successfully');
        res.status(201).json({ message: 'User registered successfully' });
      } else {
        const user = await db.collection('Users').findOne({ email });
        if (user && (await bcrypt.compare(password, user.password))) {
          console.log('Login successful');
          res.status(200).json({ message: 'Login successful' });
        } else {
          console.log('Invalid credentials');
          res.status(401).json({ error: 'Invalid credentials' });
        }
      }
    } catch (error) {
      console.error(error);
      console.log(error)
      console.log(`${type.charAt(0).toUpperCase() + type.slice(1)} failed`);
      res.status(500).json({ error: `${type.charAt(0).toUpperCase() + type.slice(1)} failed` });
    }
  });
});

app.use(cors());
app.post('/members/check_email', async (req, res) => {
  const { email } = req.body;
  console.log('checking if the email exists')
  try {
    console.log('here')
    const db = await connectDatabase();
    console.log('here1')
    const user = await db.collection('Users').findOne({ email });
    console.log('here2')
    if (user) {
      res.status(200).json({ exists: true });
      console.log('The email exists')
    } else {
      res.status(200).json({ exists: false });
      console.log('The email does not exist')
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error checking email' });
  }
});


app.use('/', router);

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
