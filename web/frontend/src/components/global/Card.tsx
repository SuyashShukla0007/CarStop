import { NavLink } from "react-router-dom";
import mongoose from "mongoose";
import star from "../../assets/star-svgrepo-com.svg";
import CarFeatures from "../Card/Features";

interface CardData {
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
  engineType: "petrol" | "diesel" | "electric" | "hybrid";
  model: string;
  year: number;
  id: mongoose.Types.ObjectId;
}

const Card = (props: CardData) => {
  return (
    <NavLink to={`/car/id=${props.id}`}>
      <div className="w-[230px] md:w-[330px] border border-gray-300 rounded-2xl overflow-hidden h-[250px] md:h-[440px] transition-transform duration-300 shadow-md hover:shadow-lg hover:transform hover:-translate-y-1">
        
        <div className="w-full h-[120px] md:h-[180px] overflow-hidden">
          <img src={props.images[0]} alt={props.model} className="w-full h-full object-cover" />
        </div>

        <div className="px-4">
          <div className="text-left font-bold text-lg mt-4">{props.model}</div>
          
          <div className="flex items-center md:gap-2 md:my-2 text-gray-500">
            <img src={star}  alt="Rating" className=" h-2 md:h-4" />
            <p className="md:text-sm text-xs">{Math.floor(props.rating / (props.comments?.length || 1))}</p>
          </div>

          <div className="text-gray-500  mb-0 md:mb-2">{props.location}</div>

          <CarFeatures
            owner={props.owner}
            brand={props.brand}
            seats={props.seats}
            engineType={props.engineType}
            location={props.location}
            Buyprice={props.Buyprice}
            Rentprice={props.Rentprice}
            model={props.model}
            year={props.year}
            isRent={props.isRent}
            images={props.images}
            rating={props.rating}
            id={props.id}
            transmission={props.transmission}
            color={props.color}
            isBuy={props.isBuy}
            engine={props.engine}
          />

          <div className="flex justify-between items-center mt-4">
            <div className="text-black font-extrabold text-xl">
              ${props.Rentprice ? `${props.Rentprice}/day` : `${props.Buyprice}`}
            </div>
            <div className="text-center w-24 py-2 bg-red-500 text-white rounded cursor-pointer hover:bg-blue-700 transition-colors duration-300">
              See more
            </div>
          </div>
        </div>
      </div>
    </NavLink>
  );
};

export default Card;
