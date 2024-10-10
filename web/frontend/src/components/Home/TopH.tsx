import  { useState, useEffect } from 'react';
import Navbar from '../global/Navbar';
import img from '../../assets/car1.png';
import './TopH.css';

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
    <div id="tbody">
      <div id="navTop" className={renderStep >= 1 ? 'slide-in-top' : ''}>
        {renderStep >= 1 && <Navbar act="home" />}
      </div>

      <div id="contentsTop">
        <div id="leftContentTop">
        <div  className={`leftWidthTop ${renderStep >= 2 ? 'slide-in-bottom' : ''}`}>
          {renderStep >= 2 && (
            <>
              <p className='top'>Buy, sell & rent</p>
              <p className='bottom'>reputable cars</p>
              <p id='slogan'>Buy, sell & rent reputable cars. Renting is easy and fast with CarHub</p>
            </>
          )}
        </div>

        <ul id='numbersTop' className={renderStep >= 3 ? 'slide-in-top' : ''}>
          {renderStep >= 3 && (
            <>
              <div id='li-r-border'>
                <li  className='bigNum'>100+</li>
                <li>Car Brands</li>
              </div>
              <div className='widthTopNumbers'>
                <li className='bigNum'>100K+</li>
                <li>Clients</li>
              </div>
            </>
          )}
        </ul>
        </div>
        <div id="rightContentTop" className={renderStep >= 4 ? 'slide-in-right' : ''}>

          {renderStep >= 4 && <img src={img} alt="Car" id='carHome' />}
        </div>
      </div>
    </div>
  );
};

export default TopH;
