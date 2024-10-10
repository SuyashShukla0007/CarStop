import { useEffect, useState } from "react";
import Car from "../components/Car/Car";
import Navbar from "../components/global/Navbar";
import axios from "axios";
import mongoose from "mongoose";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
interface CarDataType {
  owner: string;
  brand: string;
  color: string;
  images: string[];
  comments: [{
    text: string;
    postedBy: string;
    time: string;
  }];
  rating?: number;
  isRent: boolean;
  isBuy: boolean;
  engine: 'V4' | 'V6' | 'V8' | 'V12';
  transmission: 'manual' | 'automatic';
  location: string;
  Rentprice?: number;
  Buyprice?: number;
  seats: number;
  email: string;
  phone: number;
  engineType: 'petrol' | 'diesel' | 'electric' | 'hybrid';
  model: string;
  year: number;
  id: mongoose.Types.ObjectId;
}

const Cars = () => {
  const [Get, setGet] = useState<boolean>(false);
  const [Pop, setPop] = useState<boolean>(false);
  const [text, setText] = useState<string>("");

  const { id } = useParams<{ id: string }>();
  const [carData, setCarData] = useState<CarDataType | null>(null);

  const handleSubmit = async () => {
    try {
      setPop(false);
      const token = Cookies.get('token'); 
     
      const user = await axios.get("https://car-stop-ten.vercel.app/user/User",{
        headers:{'Authorization':token},
        withCredentials:true});
      console
      const postedBy = user.data.name;
      const ID = id?.split("=")[1];
      await axios.post(`https://car-stop-ten.vercel.app/car/comment/${ID}`, {
        text: text,
        postedBy: postedBy,
        time: new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long' }).format(new Date())
      });

      setGet(true);
      setText(""); // Clear the text area after submission
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const ID = id?.split("=")[1];
        const res = await axios.get<{ car: CarDataType }>(`https://car-stop-ten.vercel.app/car/buy/${ID}`);
        setCarData(res.data.car);
        console.log(res.data.car);
      } catch (err) {
        console.log(err);
      }
    };

    fetchCar();
  }, [id, Get]);

  if (!carData) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <div className="pl-[10vw] mb-[6vh]">
        <Navbar />
      </div>

      <button
        className="px-5 py-2 text-white bg-red absolute top-[145vh] left-[30vw] w-[200px] rounded-lg"
        onClick={() => setPop(true)}
      >
        Add comment
      </button>

      {Pop && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[100]">
          <div className="relative h-[40vh] w-[30vw] p-6 flex flex-col justify-center items-center text-black bg-white shadow-lg rounded-lg">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-3xl font-bold"
              onClick={() => setPop(false)}
            >
              &times;
            </button>
            <h1 className="text-3xl mb-8 font-bold text-red">Add Comment</h1>
            <textarea
              className="w-full h-[50%] p-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 resize-none text-gray-700"
              placeholder="Write your comment here..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <button
              className="text-white font-bold bg-red mt-4 p-2 rounded-lg"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      )}

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
    </div>
  );
};

export default Cars;
