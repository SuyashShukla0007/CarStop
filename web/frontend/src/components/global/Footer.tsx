import img from "../../assets/neil-mark-thomas-vCX0NQeXWiY-unsplash.jpg";
import yt from '../../assets/youtube-svgrepo-com.svg'
import face from '../../assets/facebook-svgrepo-com.svg'
import tw from '../../assets/twitter-svgrepo-com.svg'
import { useNavigate } from "react-router-dom";
import Cookies from'js-cookie'
import insta from '../../assets/insta-svgrepo-com.svg'
import { useEffect, useState } from "react";
const Footer = () => {
  const navi=useNavigate()


  const [logged,setLogged]=useState(false)


  useEffect(()=>{

    const token=Cookies.get('token')
    
    token?setLogged(true):setLogged(false)


  },[])


  return (

    <div>
      <div className="bg-black opacity-50 absolute w-[100vw] h-[50vh] "></div>

      <div className="absolute ml-[5vw] mb-[5vw] mt-[18vh] flex justify-between w-[90vw]">
        <div>
          <p className="w-[30%] font-semibold text-gray-300">
            Join 3,000+ satisfied customers using Car Hub for hassle-free car
            rentals! Whether for road trips, business, or daily needs, our
            diverse fleet has you covered. Enjoy flexible plans, competitive
            rates, and 24/7 support. Sign up today and drive with confidence!
          </p>
        </div>
        <div className="flex-col justify-end text-white w-[40%] ml-5 mr-10 font-semibold  ">
          <p className="text-gray-300 mb-5">
            Enjoy flexible rental plans, competitive rates, and 24/7 customer
            support. Sign up today and hit the road with confidence!
          </p>
          {
              !logged && (
          <div className="flex  gap-5">             
            <button className="bg-white  text-black p-2 rounded-3xl w-[100px] mt-3" onClick={()=>navi('/signUp')}>
              Register
            </button>
            <button className="bg-red  p-2 rounded-3xl w-[100px] mt-3" onClick={()=>navi('/login')}>
              Login
            </button>
          </div>
           )}
        </div>
      </div>

      <div
        className="h-[50vh] w-[100vw]"
        style={{
          backgroundImage: `url(${img})`,
          backgroundPosition: "50% center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      ></div>



        <div className="bg-white h-[30vh] w-[100vw] flex justify-center">
          <div className="border-b-2 border-gray-300 w-[80vw] h-[90%] flex">
          <div className="w-[40%]">
            <header className="text-red font-extrabold font-mono text-[35px] mb-2 mt-4">CARHUB</header>
            <p className="w-[80%] text-gray-700">CarHub is an online platform that simplifies buying, selling, and leasing vehicles, connecting users with detailed listings and community reviews.</p>
            <ul className="flex gap-2 mt-4">
             <li>
             <img src={yt} alt="Icon 1" width="24" height="24" />
             </li>
             <li>
             <img src={insta} alt="Icon 1" width="24" height="24" />
             </li>
           
             <li>
             <img src={face} alt="Icon 1" width="24" height="24" />
             </li>
             <li>
             <img src={tw} alt="Icon 1" width="24" height="24" />
             </li>

            </ul>
          </div>
          <div className="grid grid-cols-3 w-[60%] h-[80%] mt-5">
  
  <div className="flex-col text-left">
    <h1 className="text-black font-bold mb-4">Company</h1> 
    <div className="mb-5"><a href="#">About Us</a></div>
    <div className="mb-5"><a href="#">Contact Us</a></div>
    <div className="mb-5"><a href="#">Arrange a Meeting</a></div>
  </div>
  
  <div className="flex-col">
    <h1 className="text-black font-bold mb-4">Services</h1>
    <div className="mb-5"><a href="#">Services</a></div>
    <div className="mb-5"><a href="#">Inventory</a></div>
    <div className="mb-5"><a href="#">Financing Options</a></div>
  </div>
  
  <div className="flex-col">
    <h1 className="text-black font-bold mb-4">Resources</h1> 
    <div className="mb-5"><a href="#">Privacy Policy</a></div>
    <div className="mb-5"><a href="#">Terms of Service</a></div>
    <div className="mb-5"><a href="#">FAQs</a></div>
  </div>
</div>


        </div>
        
        </div>
          <p className="text-gray-500 ml-[18vh] absolute bottom-1">Carhub, 2024 all right reserved</p>

    </div>
  );
};

export default Footer;
