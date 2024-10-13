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
    const { text, postedBy, time } = req.body;

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
      time
    };
console.log(car)
// comments can be null initially

    if(car.comments==null){
      car.comments=[{text:text, postedBy:postedBy, time:time}]
    }

else{
    // Add the comment to the car's comments array
    car.comments.push(newComment);
}
    // Save the car with the new comment
    await car.save();

    // Respond with the updated car
    res.status(200).json(car);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const all =async(req,res)=>{

   const cars=await Car.find({})

  res.status(200).json(cars)

}

export const rating=async(req,res)=>{

    const {newRating}=req.body
    const carId = req.params.carid;

    const car=await Car.findById(carId)
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }

    if(car.rating==null)
    {
      car.rating=[newRating]
    }

    car?.rating.push(newRating)

    await car.save();

    res.status(200).json({msg:"updated saved"})

}