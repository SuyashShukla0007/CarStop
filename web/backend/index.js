import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import Carrouter from './Routes/Car.js';
import dotenv from 'dotenv'
// Define your routes here
import Userrouter from './Routes/User.js';
import mongoose from 'mongoose';

//connection to cloudinary

dotenv.config();
import cloudinaryv1 from "cloudinary"
const cloudinary = cloudinaryv1.v2

function cloudinaryConnect() {
  try {
    cloudinary.config({
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET,
      cloud_name: process.env.CLOUD_NAME,
    })

    console.log("Cloudinary connected successfully",process.env.API_KEY)
  } catch (err) {
    console.log("Some error occured while connecting with cloudinary", err)
  }
}

cloudinaryConnect()




const app = express();
const port = 3000;


app.use(cors({
  origin: 'https://car-stop-dykm.vercel.app/', // Replace with your frontend URL
  credentials: true
  
}));





app.use(cookieParser());
mongoose.connect('mongodb+srv://123103079:PwB5tnnu0MS67Jz5@cluster0.u9ece.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/carStop', {
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
