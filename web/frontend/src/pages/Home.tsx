import {useEffect, useState } from 'react';
import TopH from '../components/Home/TopH';
import MidH from '../components/Home/MidH';
import Loading from '../components/global/Loading'
import Slider from '../components/Home/Slider';
import Footer from '../components/Home/Footer';
const Home = () => {
  const [renderStep, setRenderStep] = useState(0);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    setLoading(false);

    const timers = [
      setTimeout(() => setRenderStep(1),0), // Navbar
      setTimeout(() => setRenderStep(2), 2500), // Left Content
      setTimeout(() => setRenderStep(3), 4500), // Numbers
      setTimeout(() => setRenderStep(4), 5000),
    ];

    return () => timers.forEach(clearTimeout);
  }, []);



  if (loading) {
    return <Loading/>;
  }


  return (
    <div id='homeBody' className='w-[100vw] overflow-x-hidden'>
      {renderStep >= 1 && (
        <div id="topHome" className={renderStep >= 1 ? 'slide-in-top' : ''}><TopH/></div>
      )}
      {
        renderStep>=2 &&(
          <div className={renderStep >= 1 ? 'pop' : ''}>
      <Slider ></Slider>
      </div>
      )
}
      {renderStep >= 2 && (
        <div id="midHome" className={renderStep >= 2 ? 'slide-in-top' : ''}><MidH/></div>
      )}

      {renderStep >= 3 && (
        <div id="botHome " className={ `overflow-x-hidden ${renderStep >= 3} ? 'slide-in-top' : '' `}><Footer/></div>
      )}



     
    </div>

  );
}

export default Home;
