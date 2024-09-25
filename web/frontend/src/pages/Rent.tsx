import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { CarDataType } from '../components/types/Car'
import Card from '../components/global/Card'
import Navbar from '../components/global/Navbar'

const Rent = () => {
  const [carOnRent, setCarOnRent] = useState<CarDataType[]>([]) // Initialize as an empty array

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await axios.get("http://localhost:3000/car/rentAll")
        setCarOnRent(res.data.cars)
        console.log(res.data.cars)
      } catch (error) {
        console.error("Error fetching cars: ", error)
      }
    }
    fetchCars()
  }, [])

  return (
    <div>

<div className='pt-10 px-[10vw]'><Navbar act="rent"></Navbar></div>


      <h1 className='text-5xl font-bold pt-10 text-red  text-center'>Cars for Rent</h1>
      <div className=' gap-10 grid grid-cols-4 px-[5vw] pt-[5vh]'>
      {carOnRent.length > 0 ? (
        carOnRent.map((data, index) => (
          <Card
            key={index}
            id={data._id}
            images={data.images}
            owner={data.owner}
            brand={data.brand}
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
        <p>No cars available for rent.</p>
      )}
      </div>
    </div>
  )
}

export default Rent
