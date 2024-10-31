import axios from "axios";
import { useState, useEffect } from "react";
import { CarDataType } from "../components/types/Car";
import Card from "../components/global/Card";
import Navbar from "../components/global/Navbar";
import Loading from "../components/global/Loading";
import Footer from "../components/global/Footer";

const Rent = () => {
  const [carOnRent, setCarOnRent] = useState<CarDataType[]>([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await axios.get("https://carstop.vercel.app/car/rentAll");
        setCarOnRent(res.data.cars);
        console.log(res.data.cars);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching cars: ", error);
        setLoading(false);
      }
    };
    fetchCars();
  }, []);

  if (loading) return <Loading />;

  return (
    <>
      <div className="h-[100vh] overflow-x-hidden">
        <div className="pt-10  px-[10vw] w-[100vw]">
          <Navbar act="rent"></Navbar>
        </div>

        <div className="h-[100vh]">
          <h1 className="text-5xl font-bold pt-10 text-red  text-center">
            Cars for Rent
          </h1>
          <div className=" gap-10 grid grid-cols-4 px-[5vw] pt-[5vh]">
            {carOnRent.length > 0 ? (
              carOnRent.map((data, index) => (
                <Card
                  key={index}
                  id={data._id}
                  images={data.images}
                  owner={data.owner}
                  brand={data.brand}
                  comments={data.comments}
                  seats={data.seats}
                  engineType={data.engineType}
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
              ))
            ) : (
              <p className="text-red text-3xl w-[60vw] font-bold">
                No cars available for renting, please check back later.
              </p>
            )}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Rent;
