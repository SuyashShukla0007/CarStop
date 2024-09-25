import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import Carrouter from './Routes/Car.js';

// Define your routes here
import Userrouter from './Routes/User.js';
import mongoose from 'mongoose';

const app = express();
const port = 3000;


app.use(cors({
  origin: 'http://localhost:5173', // Replace with your frontend URL
  credentials: true
}));





app.use(cookieParser());
mongoose.connect('mongodb://localhost:27017/carrs', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  
});
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

app.use(bodyParser.json());
app.use('/car', Carrouter);
app.use('/user', Userrouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});