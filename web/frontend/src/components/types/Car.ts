import mongoose from "mongoose"

export type CarDataType= {
  owner: string;
  brand: string;
  color: string;
  images: string[];
  comments: [
    {
      text: string;
      postedBy: string;
      time: string;
    }
  ];
  rating:number;
  isRent: boolean;
  isBuy: boolean;
  engine: 'V4' | 'V6' | 'V8' | 'V12';
  transmission: 'manual' | 'automatic';
  location: string;
  Rentprice?: number;
  Buyprice?: number;
  email:String;
  phone:number;
  seats: number;
  engineType: 'petrol' | 'diesel' | 'electric' | 'hybrid';
  model: string;
  year: number;
  _id: mongoose.Types.ObjectId;
}