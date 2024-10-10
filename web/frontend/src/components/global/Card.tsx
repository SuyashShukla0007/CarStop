import "./Card.css"
import { NavLink } from 'react-router-dom'
import mongoose from 'mongoose'


interface cardata {
  owner: string;
  brand: string;
  color: string;
  images: string[];
  comments?: string[];
  rating?: number;
  isRent: boolean;
  isBuy: boolean;
  engine: 'V4' | 'V6' | 'V8' | 'V12';
  transmission: 'manual' | 'automatic';
  location: string;
  Rentprice?: number;
  Buyprice?: number;
  seats: number;
  engineType: 'petrol' | 'diesel' | 'electric' | 'hybrid';
  model: string;
  year: number;
  id: mongoose.Types.ObjectId;
}

const Card = (props:cardata) => {

// console.log(props)

  return (
    <NavLink to={`/car/id=${props.id}`}>
    <div id='cardBody'>
      <div id="cardImg"><img src={props.images[0]} alt={props.model} /></div>
      <div id="lowerCard">
      <div id="nameCar">{props.model}</div>
      <div id="description">
        <div id="rating">
          <div>⭐ {props.rating}</div>
          {/* <div>{props.Rating.comment}</div> */}
        </div>
        <div id="carLocation">{props.location}</div>
        {/* <div id="CardSpecification">{props.description}</div> */}
        {/* {props.Buyprice === null ? ( */}
          <div id='lowestCard'>
          <div id="cardRentPrice">{`Rent: ${props.Buyprice}`}</div>
          <div id="learnMore">See more</div>
          </div>
        {/* ) : (
          <div id='lowestCard'>
          <div id="cardBuyPrice">{`Buy: $${props.Buyprice}`}</div>
          <div id="learnMore">See more</div>
          </div>
        )} */}

   
      </div>
      </div>
    </div>
    </NavLink> 
  )
}

export default Card