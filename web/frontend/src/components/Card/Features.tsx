import img1 from "../../assets/fuel.png";
import img3 from "../../assets/gear.png";
import img5 from "../../assets/seats.png";
import mongoose from "mongoose";

interface cardata {
  owner: string;
  brand: string;
  color: string;
  images: string[];
  comments?: string[];
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
  id: mongoose.Types.ObjectId;
}

const CarFeatures = (props: cardata) => {
  const features = [
    {
      name: props.engineType,
      icon: img1,
    },
    {
      name: props.seats + " seats",
      icon: img5,
    },
    {
      name: props.transmission,
      icon: img3,
    },
  ];

  return (
    <div className="flex ">
      {features.map((feature, index) => (
        <div
          key={index}
          className="bg-white-400 text-sm md:w-[7vw] hover:bg-red hover:text-white mr-2 mb-2 h-[5vh] shadow-sm bg-gray-200 shadow-gray-500 rounded-lg flex items-center justify-between p-2"
        >
          <div className="text-sm">
            <img src={feature.icon} alt="" className="w-[20px]" />
          </div>

          <div className="text-sm font-medium">{feature.name}</div>
        </div>
      ))}
    </div>
  );
};

export default CarFeatures;
