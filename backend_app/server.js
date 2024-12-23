require('dotenv').config(); // Load environment variables
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User, Checkin } = require('./models'); // Import Sequelize models
const { sequelize } = require('./models'); // Import Sequelize configuration

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000', // Frontend URL
  methods: ['GET', 'POST']
}));
app.use(bodyParser.json()); // Parse JSON request bodies

// Test Database Connection
sequelize.authenticate()
  .then(() => {
    console.log('Database connected');
  })
  .catch((err) => {
    console.error('Error connecting to the database:', err);
  });

// Sync Models
sequelize.sync()
  .then(() => {
    console.log('Database & tables synced');
  })
  .catch((err) => {
    console.error('Error syncing database:', err);
  });

// Routes

// Registration Route
app.post('/register', async (req, res) => {
  try {
    const { name, email, password, age } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password before saving
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Create new user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      age,
    });

    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Failed to register user' });
  }
});

// Login Route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Check if the password is correct
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create JWT token
    const token = jwt.sign({ userId: user.id }, 'secret_user_key_12345', { expiresIn: '1h' });
    res.json({ token }); // Send the token back
  } catch (err) {
    res.status(500).json({ message: 'Error logging in' });
  }
});

// Check-in Route
app.post('/checkin', async (req, res) => {
  const { mood, stressLevel, feelings } = req.body;
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token.split(' ')[1], 'secret_user_key_12345');
    const userId = decoded.userId;

    // Create check-in record
    const result = await Checkin.create({
      user_id: userId,
      mood,
      stress_level: stressLevel,
      feelings,
    });

    res.status(201).json(result); // Send back the inserted row
  } catch (err) {
    res.status(500).json({ message: 'Failed to save check-in' });
  }
});

// Start the Server
app.listen(5000, () => {
  console.log('Server running on port 5000');
});
