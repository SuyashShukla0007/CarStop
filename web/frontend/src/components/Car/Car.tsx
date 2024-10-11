import Features from "./Features";
import location from "../../assets/loc1.png";
import Comments from "./Comments";
import { ChevronRight } from "lucide-react";
import { ChevronLeft } from "lucide-react";

import mongoose from "mongoose";
import { useEffect, useState } from "react";

interface cardata {
  owner: string;
  brand: string;
  color: string;
  email: String;
  phone: number;
  images: string[];
  comments:
    | [
        {
          text: string;
          postedBy: string;
          time: string;
        }
      ]
    | null;
  rating?: number;
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

const Car = (props: cardata) => {
  const [Pop, setPop] = useState(false);
  const [imageLarge, setLarge] = useState(0);
  const openPopup = (image: number) => {
    setPop(true);
    console.log(image);
    setLarge(image);
  };
  console.log(props);
  useEffect(() => {
    console.log(props);
  }, [props, props.comments]);

  const [open, setOpen] = useState<boolean>();

  return (
    <div className="p-2 ">
      {Pop && (
        <>
          <div className="absolute min-h-[180vh] max-h-[250vh] w-[100vw] top-0 left-0 z-50 bg-white opacity-75"></div>

          <div className=" flex items-center justify-center ">
            <div
              className="z-[100] bg-black h-[70vh]  top-[15vh] rounded-lg w-[50vw] fixed flex  justify-end "
              style={{
                backgroundImage: `url(${props.images[imageLarge]})`,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              <p
                className=" mt-2 cursor-pointer text-2xl font-bold  h-9 mr-2 w-[100px] text-center rounded-lg bg-red text-white"
                onClick={() => setPop(false)}
              >
                close
              </p>
              <div className="flex absolute w-[100%] m-0 justify-between top-[45%]">
                <ChevronLeft
                  color="red"
                  className="bg-white rounded-r-lg"
                  size={50}
                  onClick={() => openPopup((imageLarge + 2) % 3)}
                />
                <ChevronRight
                  color="red"
                  className="bg-white rounded-l-lg"
                  size={50}
                  onClick={() => openPopup((imageLarge + 1) % 3)}
                />
              </div>
            </div>
          </div>
        </>
      )}

      <h3 className="ml-[9vw] font-semibold mb-4  text-xl">
        <a href="/" className="text-black">
          Car Rental{" "}
        </a>
        {">"} {props.model}
      </h3>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex justify-center">
          <img
            src={props.images[0]}
            alt="Car"
            className="w-[55vw] h-[80vh] ml-[9vw] object-cover rounded-md shadow-lg cursor-pointer"
            onClick={() => openPopup(0)}
          />
        </div>

        <div className="flex flex-row md:flex-col gap-2">
          {props.images.map((image, k) => (
            <img
              key={k}
              src={image}
              alt="Car"
              className="w-[22vw] h-[26vh] object-cover cursor-pointer rounded-md shadow-sm"
              onClick={() => openPopup(k)}
            />
          ))}
        </div>
      </div>

      <div className="mt-6 ml-[10vw]" id="left">
        <h4 className="text-4xl font-bold ">
          {props.model}: {props.year}{" "}
        </h4>
        <div className="flex items-center">
          <img
            src={location}
            alt=""
            className="mt-4"
            height={"100px"}
            width={"30px"}
          />
          <p className="text-2xl mt-2 ml-4">{props.location}</p>
        </div>
        <p className="text-gray-700"> {/* Add car info here */}</p>
      </div>

      <Features
        owner={props.owner}
        brand={props.brand}
        seats={props.seats}
        email={props.email}
        phone={props.phone}
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
      ></Features>

      <div className="w-[25vw] absolute top-[115vh]  items-center right-[10vw] h-[40vh] flex flex-col gap-4 p-4">
        {/* First Box: Price and Contact Button */}
        <div className="flex flex-col  w-[100%] items-center border-y-2 mb-6 border-x-2 rounded-lg border-gray-300 ">
          <h4 className="text-lg font-bold border-b-2 border-gray-300 w-[100%] p-4 text-center">
            Price: $
            {props.Rentprice == 0 ? `${props.Buyprice}` : `${props.Rentprice}`}{" "}
          </h4>
          <button
            className=" px-4 my-4  h-[5vh] w-[20vw] bg-red text-white font-semibold rounded-lg"
            onClick={() => setOpen(true)}
          >
            Contact
          </button>
        </div>

        {/* Second Box: Owner Name and Photo */}
        <div className="flex items-center justify-center w-[60%]  border-2 border-gray-300 rounded-lg h-[8vh]">
          {/* <img src='/path/to/photo.jpg' alt='Owner Photo' className='w-12 h-12 rounded-full' /> */}
          <span className="text-lg font-medium">Owner: {props.owner}</span>
        </div>

        <div className="mt-[8vh]  min-h-[20vh] w-[30vw]">
          <h4 className="text-xl font-bold mb-3">Description</h4>
          <p className="text-gray-700">
            {" "}
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. A iusto
            sit quo beatae temporibus, quam aliquid nam error eius, facilis et
            earum vel, suscipit eveniet doloribus. Nam repellat dignissimos
            quis!
          </p>
        </div>
      </div>

      <Comments comment={props.comments}></Comments>

      {open && (
        <div
          className={`${
            open ? "block" : "hidden"
          } fixed inset-0 flex items-center justify-center`}
        >
          <div className="relative h-[30vh] w-[20vw] p-4 text-red font-bold bg-white shadow-sm shadow-black rounded-lg">
            <button
              className="absolute text-red top-2 right-2 font-extrabold text-2xl"
              onClick={() => setOpen(false)}
            >
              &times;
            </button>
            <div className="mb-4 border-b border-red-600 pb-2 pt-[5vh]">
              Owner: {props.owner}
            </div>
            <div className="mb-4 border-b border-red-600 pb-2">
              Email: {props.email}
            </div>
            <div>Phone: {props.phone}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Car;
