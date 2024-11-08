import { useEffect, useState } from "react";
import Navbar from "../components/global/Navbar";
import mongoose from "mongoose";
import axios from "axios";
import Cookies from "js-cookie";
import Card from "../components/global/Card";
import { Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

type Car = {
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
  rating: number;
  isRent: boolean;
  isBuy: boolean;
  engine: "V4" | "V6" | "V8" | "V12";
  transmission: "manual" | "automatic";
  location: string;
  Rentprice?: number;
  Buyprice?: number;
  seats: number;
  email: string;
  phone: number;
  engineType: "petrol" | "diesel" | "electric" | "hybrid";
  model: string;
  year: number;
  _id: mongoose.Types.ObjectId;
};

type CarCollection = {
  [x: string]: any;
  car: [Car];
};

export default function MyCars() {
  const [collection, setCollection] = useState<CarCollection | null>(null);
  const [Loading, setLoading] = useState(true);
  const navi = useNavigate();
  useEffect(() => {
    const fetch = async () => {
      const token = Cookies.get("token");
      const res = await axios.get("https://carstop.vercel.appcar/mycars", {
        headers: { Authorization: token },
      });
      setCollection(res.data);
      console.log(res.data);
      setLoading(false);
    };
    fetch();
  }, []);

  if (Loading) {
    return (
      <>
        <div className="bg-black absolute pt-[5vh] pl-[5vw]">
          <Home color="red" size={60} onClick={() => navi("/")} />
        </div>
        <div className="flex flex-col justify-center items-center min-h-screen bg-black">
          <h1 className="text-red font-bold mb-4 text-center ">
            No Cars Found{" "}
          </h1>
          <div className="animate-spin  absolute rounded-full h-32 w-32 border-t-4 border-blue-500"></div>
        </div>
      </>
    );
  }

  if (collection === null || collection.length === 0) {
    return (
      <>
        <div className="pt-10 px-[10vw] mb-10">
          <Navbar act="My Cars"></Navbar>
        </div>
        <div className="flex justify-center items-center h-[20vh]">
          <div className="text-red text-3xl w-[60vw] font-bold">
            Add cars to see
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="">
      <div className="pt-10 px-[10vw] mb-10">
        <Navbar act="My Cars"></Navbar>
      </div>
      <div className="gap-10 grid grid-cols-4 px-[5vw] pt-[5vh]">
        {collection.map((data: Car, index: number) => (
          <Card
            key={index}
            id={data._id}
            images={data.images}
            owner={data.owner}
            brand={data.brand}
            seats={data.seats}
            engineType={data.engineType}
            comments={data.comments}
            location={data.location}
            Buyprice={data.Buyprice}
            Rentprice={data.Rentprice}
            color={data.color}
            engine={data.engine}
            transmission={data.transmission}
            year={data.year}
            model={data.model}
            isRent={data.isRent}
            isBuy={data.isBuy}
            rating={data.rating}
          />
        ))}
      </div>
    </div>
  );
}
