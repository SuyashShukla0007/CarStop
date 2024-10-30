import { useEffect } from "react";
import Card from "../global/Card";
import "./topMid.css";
import axios from "axios";
import { useState } from "react";
import mongoose from "mongoose";

interface CarData {
  owner: string;
  brand: string;
  color: string;
  images: string[];
  comments?: [
    {
      text: string;
      postedBy: string;
      time: string;
    }
  ];
  rating: number;
  isRent: boolean;
  isBuy: boolean;
  engine: "V4" | "V6" | "V8" | "V12";
  transmission: "manual" | "automatic";
  location: string;
  Rentprice?: number;
  Buyprice?: number;
  seats: number;
  engineType: "petrol" | "diesel" | "electric" | "hybrid";
  model: string;
  year: number;
  _id: mongoose.Types.ObjectId;
}

const TopMid = () => {
  const [carData, setCarData] = useState<CarData[]>([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get("https://carstop.vercel.ap/car/all");
        setCarData(res.data);
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, []);

  return (
    <div className="card-list">
      {carData.map(
        (data, index) =>
          data.comments && (
            <Card
              key={index}
              id={data._id}
              images={data.images}
              owner={data.owner}
              comments={data.comments}
              brand={data.brand}
              seats={data.seats}
              engineType={data.engineType}
              // milage={data.milage}
              location={data.location}
              Buyprice={data.Buyprice}
              Rentprice={data.Rentprice}
              color={data.color}
              engine={data.engine}
              transmission={data.transmission}
              // carNo={data.carNo}
              year={data.year}
              // description={data.description}
              model={data.model}
              isRent={data.isRent}
              isBuy={data.isBuy}
              rating={data.rating}
            />
          )
      )}
    </div>
  );
};

export default TopMid;
