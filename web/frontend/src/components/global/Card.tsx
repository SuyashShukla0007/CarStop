import "./Card.css";
import { NavLink } from "react-router-dom";
import mongoose from "mongoose";
import star from "../../assets/star-svgrepo-com.svg";
import CarFeatures from "../Card/Features";

interface cardata {
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

const Card = (props: cardata) => {
  console.log(props)

  return (
    <NavLink to={`/car/id=${props.id}`}>
      <div id="cardBody">
        <div id="cardImg">
          <img src={props.images[0]} alt={props.model} />
        </div>
        <div id="lowerCard">
          <div id="nameCar" className="mb-2">{props.model}</div>
          <div id="description">
            <div id="rating">
              <div className="flex items-center gap-2 mb-2">
                <img src={star} height={18} width={18} alt="" /> {(props.rating)/props.comments?.length  | 0}
              </div>
            </div>
            <div id="carLocation" className="mb-2">{props.location}</div>

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
            ></CarFeatures>

            <div id="lowestCard">
              <div id="cardRentPrice">
                $
                {props.Rentprice == 0
                  ? `${props.Buyprice}`
                  : `${props.Rentprice}/day`}
              </div>
              <div id="learnMore">See more</div>
            </div>
          </div>
        </div>
      </div>
    </NavLink>
  );
};

export default Card;
