import img from "../../assets/carType.png";
// import img1 from '../../assets/fuel.png'
import img1 from "../../assets/fuel.png";
import img2 from "../../assets/mileage.png";
import img3 from "../../assets/gear.png";
import img4 from "../../assets/brand.png";
import img5 from "../../assets/seats.png";
import mongoose from "mongoose";

interface cardata {
  owner: string;
  email: String;
  phone: number;
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
      name: props.brand,
      icon: img4,
    },
    {
      name: props.engine,
      icon: img2,
    },
    {
      name: props.model,
      icon: img,
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
    <div className="container mx-auto p-6">
      <div className=" md:ml-[10vw] w-[80vw] md:w-[40vw] grid grid-cols-3 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white-400 w-[25vw]  md:w-[12vw] mb-2 h-[8vh] shadow-sm shadow-gray-500 rounded-lg flex items-center justify-between p-4"
          >
            <div className="text-sm font-medium">{feature.name}</div>
            <div className="text-2xl">
              <img src={feature.icon} alt="" className="w-[50px]" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarFeatures;
