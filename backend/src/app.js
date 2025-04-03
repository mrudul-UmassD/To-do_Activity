// Load environment variables
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const todoRoutes = require('./routes/todos');

const app = express();
const port = process.env.PORT || 5050;
// this should always be in .env

// For development, you can use this connection string
// For production, set the MONGODB_URI environment variable with your actual connection string
const uri = process.env.MONGODB_URI || "mongodb+srv://mrudul1607:mYz8W57kfzIYzS6z@cluster0.8838ns2.mongodb.net/";
// Connect to MongoDB using environment variable
mongoose.set('strictQuery', false)

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Middlewares
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173'
}));
app.use(bodyParser.json());

app.use('/api/todos', todoRoutes);

app.listen(port, () => console.log(`Server listening on port ${port}`));
