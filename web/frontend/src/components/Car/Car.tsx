import Features from "./Features";
import location from "../../assets/loc1.png";
import Comments from "./Comments";
import { ChevronRight } from "lucide-react";
import { Image } from "lucide-react";
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
    setLarge(image);
  };

  useEffect(() => {
    console.log(props);
  }, [props, props.comments]);

  const [open, setOpen] = useState<boolean>();

  return (
    <div className="p-2">
      {Pop && (
        <>
          <div className="absolute min-h-screen w-full top-0 left-0 z-50 bg-white opacity-75"></div>
          <div className="flex items-center justify-center">
            <div
              className="z-[100] bg-black h-[70vh] top-[15vh] rounded-lg w-[90vw] md:w-[70vw] lg:w-[50vw] fixed flex justify-end"
              style={{
                backgroundImage: `url(${props.images[imageLarge]})`,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}
            >
              <p
                className="mt-2 cursor-pointer text-2xl font-bold h-9 mr-2 w-[80px] text-center rounded-lg bg-red text-white"
                onClick={() => setPop(false)}
              >
                Close
              </p>
              <div className="flex absolute w-full justify-between top-[45%]">
                <ChevronLeft
                  color="red"
                  className="bg-white rounded-r-lg cursor-pointer"
                  size={50}
                  onClick={() => openPopup((imageLarge + props.images.length - 1) % props.images.length)}
                />
                <ChevronRight
                  color="red"
                  className="bg-white rounded-l-lg cursor-pointer"
                  size={50}
                  onClick={() => openPopup((imageLarge + 1) % props.images.length)}
                />
              </div>
            </div>
          </div>
        </>
      )}

      <h3 className="ml-4 md:ml-[9vw] font-semibold mb-4 text-lg md:text-xl">
        <a href="/" className="text-black">
          Car Rental
        </a>
        {">"} {props.model}
      </h3>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex justify-center">
          <img
            src={props.images[0]}
            alt="Car"
            className="w-full md:w-[55vw] h-[50vh] md:h-[80vh] ml-0 md:ml-[9vw] object-cover rounded-md shadow-lg cursor-pointer"
            onClick={() => openPopup(0)}
          />
          <button
            className="absolute flex text-gray-600 rounded-xl mt-2 md:ml-[53vw] w-[150px] bg-white p-2"
            onClick={() => openPopup(0)}
          >
            <Image/>
            <p className="ml-2">See all photos</p> 
          </button>
        </div>

        <div className="flex flex-row md:flex-col gap-2">
          {props.images.map((image, k) => (
            <img
              key={k}
              src={image}
              alt="Car"
              className="w-[48vw] md:w-[22vw] h-[20vh] md:h-[26vh] object-cover cursor-pointer rounded-md shadow-sm"
              onClick={() => openPopup(k)}
            />
          ))}
        </div>
      </div>

      <div className="mt-6 ml-4 md:ml-[10vw]">
        <h4 className="text-2xl md:text-4xl font-bold">
          {props.model}: {props.year}
        </h4>
        <div className="flex items-center mt-2">
          <img src={location} alt="" className="h-8 w-8" />
          <p className="text-xl md:text-2xl ml-4">{props.location}</p>
        </div>
        <p className="text-gray-700 mt-2">
          {/* Add car info here */}
        </p>
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
      />

      <div className="w-full md:w-[40vw] lg:w-[25vw] absolute top-[120vh] md:top-[90vh] lg:top-[115vh] items-center right-4 lg:right-[10vw] h-auto flex flex-col gap-4 p-4">
        <div className="flex flex-col w-full items-center border-2 rounded-lg border-gray-300">
          <h4 className="text-lg font-bold border-b-2 border-gray-300 w-full p-4 text-center">
            Price: ${props.Rentprice === 0 ? props.Buyprice : props.Rentprice}
          </h4>
          <button
            className="px-4 my-4 h-12 w-[90%] bg-red text-white font-semibold rounded-lg"
            onClick={() => setOpen(true)}
          >
            Contact
          </button>
        </div>

        <div className="flex items-center justify-center w-full border-2 border-gray-300 rounded-lg h-12">
          <span className="text-lg font-medium">Owner: {props.owner}</span>
        </div>

        <div className="mt-6 min-h-[20vh] w-full">
          <h4 className="text-xl font-bold mb-3">Description</h4>
          <p className="text-gray-700">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. A iusto
            sit quo beatae temporibus, quam aliquid nam error eius, facilis et
            earum vel, suscipit eveniet doloribus. Nam repellat dignissimos
            quis!
          </p>
        </div>
      </div>

      <Comments comment={props.comments} />

      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30">
          <div className="relative h-[30vh] w-[90vw] md:w-[40vw] lg:w-[20vw] p-4 text-red font-bold bg-white shadow-md rounded-lg">
            <button
              className="absolute text-red top-2 right-2 font-extrabold text-2xl"
              onClick={() => setOpen(false)}
            >
              &times;
            </button>
            <div className="mb-4 border-b border-red-600 pb-2 pt-6">
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
