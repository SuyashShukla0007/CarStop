import { useState, useEffect } from 'react';
import img from '../../assets/Lightning_McQueen.png';
import Bot from './Bot';

const BotIcon = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isBotOpen, setIsBotOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleBotPopUp = () => {
    setIsBotOpen(prevState => !prevState); 
  };

  if (!isVisible) {
    return null;
  }

  return (
    <>
      {!isBotOpen ? (
        <div
          className="cursor-pointer fixed bottom-5 right-5 z-50"
          onClick={handleBotPopUp}
        >
          <button
            className="flex items-center rounded-full border shadow-red shadow-md h-[8vh] w-[8vh] justify-center"
            style={{
              backgroundImage: `url(${img})`,
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: '10vh',
            }}
            aria-label="Open Chat Bot"
          />
        </div>
      ) : (
        <>   
          <div className='z-10 h-[100%] fixed inset-0 w-[100%] bg-white opacity-75'></div>
          <Bot toggle={handleBotPopUp} />
        </>
      )}
    </>
  );
};

export default BotIcon;
