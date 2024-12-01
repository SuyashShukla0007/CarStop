import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import User from "../Models/User.js";
import Car from '../Models/Car.js';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

// Set up Cloudinary storage for multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'car_listings',
    allowed_formats: ['jpg', 'png', 'jpeg'],
  },
});

const upload = multer({ storage: storage });

// Middleware for authenticating JWT and extracting the seller's ID


// Middleware to handle image upload
const uploadImages = upload.array('images', 5);

export const sellCar = async (req, res) => {
  try {

    const toke =req.headers['authorization']

        if (!toke) {
            return res.status(400).json("Token is required");
        }

        // Log the token and secret for debugging
        console.log("Token:", toke);
        console.log("JWT Secret:", 'ca');

        const decoded = jwt.verify(toke, 'ca');

        if (!decoded || !decoded.id) {
            return res.status(400).json("Invalid token");
        }

        const seller = await User.findById(decoded.id);

        if (!seller) {
            return res.status(404).json("User not found");
        }

   
    if (!seller) {
      return res.status(404).json({ message: "Seller not found" });
    }

    uploadImages(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ message: "Error uploading images", error: err });
      }

      const imageUrls = req.files ? req.files.map(file => file.path) : [];

      const {
        owner,
        brand,
        color,
        email,
        phone,
        isRent,
        isBuy,
        engine,
        transmission,
        location,
        Rentprice,
        Buyprice,
        seats,
        engineType,
        model,
        year
      } = req.body;

      const carDoc = new Car({
        owner,
        brand,
        color,
        email,
        phone,
        images: imageUrls,
        comments:null,
        rating: 0,
        isRent,
        isBuy,
        engine,
        transmission,
        location,
        Rentprice: parseFloat(Rentprice),
        Buyprice: parseFloat(Buyprice),
        seats: parseInt(seats),
        engineType,
        model,
        year: parseInt(year)
      });

      await carDoc.save();
      res.status(201).json({ message: "Car added successfully", car: carDoc });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const rentCar = async (req, res) => {
  try {
    const userId = req.params.id;

    // Find the seller by userId
    const seller = await User.findById(userId);

    if (!seller) {
      return res.status(404).json({ message: "Seller not found" });
    }

    // Get car data from the request body
    const {
      owner,
      brand,
      color,
      images,
      comments,
      rating,
      isRent,
      isBuy,
      engine,
      transmission,
      location,
      Rentprice,
      Buyprice,
      seats,
      engineType,
      model,
      year
    } = req.body;

    // Create a new car document
    const carDoc = new Car({
      owner,
      brand,
      color,
      images,
      comments,
      rating,
      isRent,
      isBuy,
      engine,
      transmission,
      location,
      Rentprice,
      Buyprice,
      seats,
      engineType,
      model,
      year
    });

    // Save the car document in the seller's collection
    await carDoc.save();

    res.status(201).json({ message: "Car added successfully", car: carDoc });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};

export const buy = async (req, res) => {
  try {
    const carId = req.params.carid;
    if (!mongoose.Types.ObjectId.isValid(carId)) {
      return res.status(400).json({ message: 'Invalid car ID format' });
    }
    const car = await Car.findById(carId);
    if (car) {
      res.status(200).json({ message: "Car found", car });
    } else {
      res.status(404).json({ message: 'Car not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
}

export const buyAll = async (req, res) => {
  try {
    const cars = await Car.find({ isBuy: true });
    if (cars.length > 0) {
      res.status(200).json({ message: "Cars found", cars });
    } else {
      res.status(404).json({ message: "No cars available for sale" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
}

export const rentAll=async(req,res)=>{
  try {
    const cars=await Car.find({isRent:true});
    if(!cars){
      return res.status(404).json({message:"Cars not found"});
    }
    res.status(200).json({message:"Cars found",cars:cars});
  }
  catch(error){
    console.error(error);
    res.status(500).json({message:"Server error",error});

  } 
}

export const addComment = async (req, res) => {
  try {
    const { text, postedBy, time ,rating} = req.body;

      const carId = req.params.carid;
      if (!mongoose.Types.ObjectId.isValid(carId)) {
        return res.status(400).json({ message: 'Invalid car ID format' });
      }
      const car=await Car.findById(carId)
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }

    // Create a new comment
    const newComment = {
      text,
      postedBy,
      time,
      rating
    };
console.log(car)
// comments can be null initially

    if(car.comments==null){
      car.comments=[{text:text, postedBy:postedBy, time:time,rating:rating
      }]
    }

else{
    // Add the comment to the car's comments array
    car.comments.push(newComment);
}

    car.rating=car.rating+rating

    // Save the car with the new comment
    await car.save();

    // Respond with the updated car
    res.status(200).json(newComment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




export const all =async(req,res)=>{

   const cars=await Car.find({})

  res.status(200).json(cars)

}

export const myCars = async (req, res) => {
  try {
    const token = req.headers['authorization'];
    if (!token) {
      return res.status(401).send("Token is required");
    }

    let decode;
    try {
      decode = jwt.verify(token, 'ca');
    } catch (error) {
      return res.status(401).send("Invalid token");
    }

    const id = decode.id;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).send("User not found");
    }

    const cars = await Car.find({ email: user.email });
    if (!cars || cars.length === 0) {
      return res.status(404).send("No cars found");
    }

    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({ msg: "Internal server error", error: error.message });
  }
};

export const editComment=async(req,res)=>{
  try{
    const id=req.params.carid
    const car=Car.findById(id)
    const {text,postedBy,time,rating}=req.body
    car.comment=car.comment.filter((comment)=>!(comment.postedBy===postedBy && comment.time===time  && comment.text===text))
    const newComment = {
      text,
      postedBy,
      time,
      rating
    };
    car.comment.push(newComment)
   await car.save()

   res.status(200).send(car.comment)

  }
  catch(error)
  {
    res.status(400).json({"error":error})
  }
}

export const deleteComment=async(req,res)=>{
  try{
    const id=req.params.carid

    const token=req.headers['authorization']

    const decode=jwt.verify(token,'ca')

    const userId=decode.id
    const user=await User.findById(userId)
    const userName=user.name

console.log(userName)
  const car=await Car.findById(id)
  
const {time,postedBy,text,rating}=req.body


if(postedBy!=userName)
{
res.send(400).send("lol")
}
 car.comments=car.comments.filter((comment)=> !(comment.postedBy===postedBy && comment.time===time && comment.text===text))

  car.rating=car.rating-rating


   await car.save()

   res.status(200).json({msg:"updated comments"})
  }

  catch(error)
  {
    res.status(400).json({"error":error})
  }

}