import { useState, useEffect } from 'react';
import Navbar from '../global/Navbar';
import img from '../../assets/car1.png';
import './TopH.css'; // Keep this for custom animations

const TopH = () => {
  const [renderStep, setRenderStep] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setRenderStep(1), 500), // Navbar
      setTimeout(() => setRenderStep(2), 1000), // Left Content
      setTimeout(() => setRenderStep(3), 1500), // Numbers
      setTimeout(() => setRenderStep(4), 2000), // Right Content
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="mt-0 flex flex-col h-[23vh] md:h-full md:ml-6 sm:ml-0">
      <div className={`mt-4 md:mt-20 ml-10 md:ml-[3vw] mb-10 md:mb-28 ${renderStep >= 1 ? 'slide-in-top' : ''}`}>
        {renderStep >= 1 && <Navbar act="home" />}
      </div>

      <div className="relative flex flex-row ml-[2.6vw] mt-0">
        <div className="flex md:flex-col overflow-hidden w-[200000vw] md:w-[100%]">
          <div className={` ${renderStep >= 2 ? 'slide-in-bottom' : ''}`}>
            {renderStep >= 2 && (
              <>
                <p className="text-lg md:text-[54px] md:py-2 font-bold md:mb-6 text-red">Buy, sell & rent</p>
                <p className="text-lg md:text-[57px] text-red-500 md:py-2 font-bold md:mb-6">reputable cars</p>
                <p className=" text-sm md:text-[20px] ">Buy, sell & rent reputable cars. Renting is easy and fast with CarHub</p>
              </>
            )}
          </div>

          <ul className={`grid grid-cols-2 md:gap-2 pl-4 md:w-[63%] pr-10 ml-10 w-[100%]   h-[10%] md:h-[10%]  text-[20px] pt-8 ${renderStep >= 3 ? 'slide-in-top' : ''}`}>
            {renderStep >= 3 && (
              <>
                <div className="border-r-2 border-gray-300">
                  <li className=" md:text-2xl font-bold">100+</li>
                  <li className='text-xs md:text-xl'>Car Brands</li>
                </div>
                <div className="ml-4">
                  <li className="md:text-2xl font-bold">100K+</li>
                  <li className='text-xs md:text-xl'>Clients</li>
                </div>
              </>
            )}
          </ul>
        </div>

        <div className={`relative w-[200vw] h-[50vh] overflow-hidden ${renderStep >= 4 ? 'slide-in-right' : ''}`}>
          {renderStep >= 4 && (
            <img src={img} alt="Car" className="absolute top-[-15vh] right-10 w-full max-w-full" />
          )}
        </div>
      </div>
    </div>
  );
};

export default TopH;
