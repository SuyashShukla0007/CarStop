import mongoose from "mongoose";

const carSchema = new mongoose.Schema({
  owner: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  images: {
    type: [String],
    required: true
  },
  phone:{
    type:Number,
    required:true
  },
  email:{
    type:String,
    required:true,
  },
  comments: {
    type: [{
      text:String,
      postedBy:String,
      time:String
    }] || null,
    default: null,
    required: false
  },
  rating: {
    type: [Number],
    required: false
  },
  isRent: {
    type: Boolean,
    required: true
  },
  isBuy: {
    type: Boolean,
    required: true
  },
  engine: {
    type: ['V4', 'V6', 'V8', 'V12'],
    required: true
  },
  transmission: {
    type: ['manual', 'automatic'],
    required: true
  },
  location: {
    type: String,
    required: true
  },
  Rentprice: {
    type: Number,
    required: true
  },
  Buyprice: {
    type: Number,
    required: true
  },
  seats: {
    type: Number,
    required: true
  },
  engineType: {
    type: ['petrol', 'diesel', 'electric', 'hybrid'],
    required: true
  },
  model: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
});




const Car = mongoose.model('Car', carSchema);
export default Car;
// The carSchema is a blueprint for creating Car documents in the database. It defines the shape of the documents, the types of data they can store, and the validation rules for each field. The Car model is a class that represents the collection of Car documents in the database. It provides methods for interacting with the collection, such as finding, creating, updating, and deleting documents. The model is exported so that it can be imported and used in other parts of the application.

//engineType: This field is of type String and is required. It can only have one of the following values: 'petrol', 'diesel', 'electric', 'hybrid'.
//model: This field is of type String and is required.
//year: This field is of type Number and is required.
//brand: This field is of type String and is required.
//color: This field is of type String and is required.
//images: This field is of type Array of Strings and is required.
//comments: This field is of type Array of Strings and is required.
//rating: This field is of type Number and is required.
//isRent: This field is of type Boolean and is required.
//isBuy: This field is of type Boolean and is required.
//engine: This field is of type Array of Strings and is required. It can only have one of the following values: 'V4', 'V6', 'V8', 'V12'.
//transmission: This field is of type Array of Strings and is required. It can only have one of the following values: 'manual', 'automatic'.
//location: This field is of type String and is required.
//Rentprice: This field is of type Number and is not required.
//Buyprice: This field is of type Number and is not required.
//seats: This field is of type Number and is required.
//owner: This field is of type String and is required.


  
