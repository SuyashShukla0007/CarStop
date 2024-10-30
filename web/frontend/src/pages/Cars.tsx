import { useEffect, useState } from "react";
import Car from "../components/Car/Car";
import Navbar from "../components/global/Navbar";
import axios from "axios";
import mongoose from "mongoose";
import { useParams } from "react-router-dom";
import Loading from "../components/global/Loading";
import Footer from "../components/global/Footer";
interface CarDataType {
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
  id: mongoose.Types.ObjectId;
}

const Cars = () => {
  const { id } = useParams<{ id: string }>();
  const [carData, setCarData] = useState<CarDataType | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetch = async () => {
      try {
        const ID = id?.split("=")[1];
        const res = await axios.get<{ car: CarDataType }>(
          `https://carstop.vercel.ap/car/buy/${ID}`
        );
        setCarData(res.data.car);
        console.log(res.data.car);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };

    fetch();
  }, [id]);

  if (loading) return <Loading />;

  return (
    <div className="overflow-x-hidden">
      <div className="p-4 min-h-[180vh] bg-white w-[100vw]">
        <div className="ml-5 mt-6 mb-[3vh]">
          <Navbar />
        </div>

        {carData && (
          <Car
            owner={carData.owner}
            brand={carData.brand}
            email={carData.email}
            phone={carData.phone}
            comments={carData.comments}
            seats={carData.seats}
            engineType={carData.engineType}
            location={carData.location}
            Buyprice={carData.Buyprice}
            Rentprice={carData.Rentprice}
            model={carData.model}
            year={carData.year}
            isRent={carData.isRent}
            images={carData.images}
            rating={carData.rating}
            id={carData.id}
            transmission={carData.transmission}
            color={carData.color}
            isBuy={carData.isBuy}
            engine={carData.engine}
          />
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Cars;
