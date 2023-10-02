import bcrypt from 'bcrypt';

const authenticate = ['register', 'login'];

authenticate.forEach(type => {
  app.use(cors());
  app.post(`/members/${type}`, async (req, res) => {
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
      console.log(`${type.charAt(0).toUpperCase() + type.slice(1)} failed`);
      res.status(500).json({ error: `${type.charAt(0).toUpperCase() + type.slice(1)} failed` });
    }
  });
});
