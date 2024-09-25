import img from '../../assets/redCar.jpg';
import Features from './Features';
import location from '../../assets/loc1.png';
import Comments from './Comments';
import mongoose from 'mongoose';
import { useEffect, useState } from 'react';

interface cardata {
  owner: string;
  brand: string;
  color: string;
   email:String;
  phone:number;
  images: string[];
  comments: [{
    text:string;
    postedBy:string,
    time:string
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
  engineType: 'petrol' | 'diesel' | 'electric' | 'hybrid';
  model: string;
  year: number;
  id: mongoose.Types.ObjectId;
}


const Car = (props:cardata ) => {
console.log(props)
  useEffect (()=>{
    console.log(props)
  }
  ,[props])

  const [open,setOpen]=useState<boolean>()

  return (
    <div className='p-2'>
      <h3 className='ml-[9vw] font-semibold mb-4  text-xl' >
        <a href="/" className='text-black'>Car Rental </a>
        {">"} {props.model}
      </h3>
      
      <div className='flex flex-col md:flex-row gap-4'>
        <div className='flex justify-center'>
          <img src={img} alt="Car" className='w-[55vw] h-[80vh] ml-[9vw]  rounded-md shadow-lg' />
        </div>

        <div className='flex flex-row md:flex-col gap-2'>
          <img src={img} alt="Car" className='w-[22vw] h-[26vh] object-cover rounded-md shadow-sm' />
          <img src={img} alt="Car" className='w-[22vw] h-[26vh] object-cover rounded-md shadow-sm' />
          <img src={img} alt="Car" className='w-[22vw] h-[26vh] object-cover rounded-md shadow-sm' />
        </div>
      </div>

      <div className='mt-6 ml-[10vw]' id='left'>
        <h4 className='text-4xl font-bold '>{props.model}: {props.year} </h4>
        <div className='flex items-center'>
        <img src={location} alt="" className='mt-4' height={'100px'} width={'30px'}/>
        <p className='text-2xl mt-2 ml-4'>{props.location}</p>
        </div>
        <p className='text-gray-700'> {/* Add car info here */}</p>
      </div>

    <Features owner={props.owner}
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
     

    <div  className='w-[25vw] absolute top-[115vh]  items-center right-[10vw] h-[40vh] flex flex-col gap-4 p-4'>
  {/* First Box: Price and Contact Button */}
  <div className='flex flex-col  w-[100%] items-center border-y-2 mb-6 border-x-2 rounded-lg border-gray-300 '>
    <h4 className='text-lg font-bold border-b-2 border-gray-300 w-[100%] p-4 text-center'>Price: ${props.Buyprice}</h4>
    <button className=' px-4 my-4  h-[5vh] w-[20vw] bg-red text-white font-semibold rounded-lg' onClick={()=>setOpen(true)}>
      Contact
    </button>
  </div>

  {/* Second Box: Owner Name and Photo */}
  <div className='flex items-center justify-center w-[60%]  border-2 border-gray-300 rounded-lg h-[8vh]'>
    {/* <img src='/path/to/photo.jpg' alt='Owner Photo' className='w-12 h-12 rounded-full' /> */}
    <span className='text-lg font-medium'>Owner: {props.owner}</span>
  </div>

  <div className='mt-[8vh]  min-h-[20vh] w-[30vw]'>
        <h4 className='text-xl font-bold mb-3'>Description</h4>
        <p className='text-gray-700'> Lorem ipsum dolor sit, amet consectetur adipisicing elit. A iusto sit quo beatae temporibus, quam aliquid nam error eius, facilis et earum vel, suscipit eveniet doloribus. Nam repellat dignissimos quis!</p>
      </div>

</div>


     


    
      <Comments comment={props.comments}></Comments>

    {open && (<div className={`${open ? 'block' : 'hidden'} fixed inset-0 flex items-center justify-center`}>
  <div className="relative h-[30vh] w-[20vw] p-4 text-red font-bold bg-white shadow-sm shadow-black rounded-lg">
    <button 
      className="absolute text-red top-2 right-2 font-extrabold text-2xl"
      onClick={() => setOpen(false)}
    >
      &times;
    </button>
    <div className="mb-4 border-b border-red-600 pb-2 pt-[5vh]">Owner: {props.owner}</div>
    <div className="mb-4 border-b border-red-600 pb-2">Email: {props.email}</div>
    <div>Phone: {props.phone}</div>
  </div>
</div>
)}


    </div>


  );
};

export default Car;
