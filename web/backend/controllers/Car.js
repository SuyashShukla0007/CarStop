import mongoose from "mongoose";

import User from "../Models/User.js";

//selling a car 
import Car from '../Models/Car.js'; // Adjust the path to where Car model is located

//sellcar function
export const sellCar = async (req, res) => {
  try {
    // const userId = req.params.id;
    const userId = "66db5db3acd34247ef5f1a77"
    // Find the seller by userId
    const seller = await User.find({_id:userId});

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

    // Create a new car document
    const carDoc = new Car({
      owner,
      brand,
      color,
      email,
      phone,
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
 // Assuming seller.email is used for collection name

    // Save the car document in the seller's collection
    carDoc.save();
   

    res.status(201).json({ message: "Car added successfully", car: carDoc });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};


export const rentCar =async(req,res)=>{
  try {
    const userId = req.params.id;

    // Find the seller by userId
    const seller = await User.find(userId);

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
   carDoc.save();

    res.status(201).json({ message: "Car added successfully", car: carDoc });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
}

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
    // Add the comment to the car's comments array
    car.comments.push(newComment);

    // Save the car with the new comment
    await car.save();

    // Respond with the updated car
    res.status(200).json(car);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
