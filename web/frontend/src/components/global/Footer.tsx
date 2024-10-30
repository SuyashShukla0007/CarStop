import yt from '../../assets/youtube-svgrepo-com.svg';
import face from '../../assets/facebook-svgrepo-com.svg';
import tw from '../../assets/twitter-svgrepo-com.svg';
import insta from '../../assets/insta-svgrepo-com.svg';

function Footer() {
  return (
    <div className="bg-gray-50 h-auto  m-0 p-4 lg:p-0">
      <div className="lg:h-[25vh] w-full flex flex-col lg:flex-row justify-center">
        <div className="border-b-2 border-gray-300 w-full lg:w-[80vw] flex flex-col lg:flex-row items-center lg:items-start">
          {/* Logo and Description Section */}
          <div className="w-full lg:w-[40%] text-center lg:text-left mb-4 lg:mb-0 p-2 lg:p-0">
            <header className="text-red font-extrabold font-mono text-[25px] lg:text-[35px] mb-2 mt-4">
              CARHUB
            </header>
            <p className="text-gray-700 text-sm lg:text-base">
              CarHub is an online platform that simplifies buying, selling, and leasing vehicles, connecting users with detailed listings and community reviews.
            </p>
            <ul className="flex gap-2 mt-4 justify-center lg:justify-start">
              <li><img src={yt} alt="YouTube" width="24" height="24" /></li>
              <li><img src={insta} alt="Instagram" width="24" height="24" /></li>
              <li><img src={face} alt="Facebook" width="24" height="24" /></li>
              <li><img src={tw} alt="Twitter" width="24" height="24" /></li>
            </ul>
          </div>

          {/* Links Section */}
          <div className="grid grid-cols-1 sm:grid-cols-3 w-full lg:w-[60%] gap-4 lg:gap-0 mt-5 text-center lg:text-left">
            <div>
              <h1 className="text-black font-bold mb-2 lg:mb-4">Company</h1>
              <div className="mb-2"><a href="#">About Us</a></div>
              <div className="mb-2"><a href="#">Contact Us</a></div>
              <div className="mb-2"><a href="#">Arrange a Meeting</a></div>
            </div>
            <div>
              <h1 className="text-black font-bold mb-2 lg:mb-4">Services</h1>
              <div className="mb-2"><a href="#">Services</a></div>
              <div className="mb-2"><a href="#">Inventory</a></div>
              <div className="mb-2"><a href="#">Financing Options</a></div>
            </div>
            <div>
              <h1 className="text-black font-bold mb-2 lg:mb-4">Resources</h1>
              <div className="mb-2"><a href="#">Privacy Policy</a></div>
              <div className="mb-2"><a href="#">Terms of Service</a></div>
              <div className="mb-2"><a href="#">FAQs</a></div>
            </div>
          </div>
        </div>
      </div>
      <p className="text-gray-500 text-center lg:text-left mt-4 lg:ml-[18vh]">Carhub, 2024 all rights reserved</p>
    </div>
  );
}

export default Footer;
