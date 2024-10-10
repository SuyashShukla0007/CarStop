// Import necessary libraries
import './Slider.css';
import logo1 from '../../assets/aston-martin-alt-svgrepo-com.svg'
import logo2 from '../../assets/audi-svgrepo-com.svg'
import logo3 from '../../assets/bmw-svgrepo-com.svg'
import logo4 from '../../assets/chevrolet-svgrepo-com.svg'
import logo5 from '../../assets/ferrari-svgrepo-com.svg'
import logo6 from '../../assets/fiat-svgrepo-com.svg'
import logo7 from '../../assets/ford-svgrepo-com.svg'
import logo8 from '../../assets/genesis-svgrepo-com.svg'
import logo9 from '../../assets/gmc-svgrepo-com.svg'
import logo10 from '../../assets/honda-svgrepo-com.svg'
import logo11 from '../../assets/hummer-svgrepo-com.svg'
import logo12 from '../../assets/isuzu-svgrepo-com.svg'
import logo13 from '../../assets/jeep-alt-svgrepo-com.svg'
import logo14 from '../../assets/kia-svgrepo-com.svg'
import logo15 from '../../assets/lamborghini-alt-svgrepo-com.svg'
import logo16 from '../../assets/volkswagen-svgrepo-com.svg'














// Define the LogoStrip component
function Slider() {
  // Array of logo URLs
  const logos = [
    logo1,logo2,logo10,logo11,logo12,logo3,logo4,logo5,logo6,logo7,logo8,logo9,logo13,logo14,logo15,logo16,
    logo1,logo2,logo10,logo11,logo12,logo3,logo4,logo5,logo6,logo7,logo8,logo9,logo13,logo14,logo15,logo16,logo1,logo2,logo10,logo11,logo12,logo3,logo4,logo5,logo6,logo7,logo8,logo9,logo13,logo14,logo15,logo16,logo1,logo2,logo10,logo11,logo12,logo3,logo4,logo5,logo6,logo7,logo8,logo9,logo13,logo14,logo15,logo16,logo1,logo2,logo10,logo11,logo12,logo3,logo4,logo5,logo6,logo7,logo8,logo9,logo13,logo14,logo15,logo16,logo1,logo2,logo10,logo11,logo12,logo3,logo4,logo5,logo6,logo7,logo8,logo9,logo13,logo14,logo15,logo16,logo1,logo2,logo10,logo11,logo12,logo3,logo4,logo5,logo6,logo7,logo8,logo9,logo13,logo14,logo15,logo16,logo1,logo2,logo10,logo11,logo12,logo3,logo4,logo5,logo6,logo7,logo8,logo9,logo13,logo14,logo15,logo16,logo1,logo2,logo10,logo11,logo12,logo3,logo4,logo5,logo6,logo7,logo8,logo9,logo13,logo14,logo15,logo16,logo1,logo2,logo10,logo11,logo12,logo3,logo4,logo5,logo6,logo7,logo8,logo9,logo13,logo14,logo15,logo16,logo1,logo2,logo10,logo11,logo12,logo3,logo4,logo5,logo6,logo7,logo8,logo9,logo13,logo14,logo15,logo16,logo1,logo2,logo10,logo11,logo12,logo3,logo4,logo5,logo6,logo7,logo8,logo9,logo13,logo14,logo15,logo16,logo1,logo2,logo10,logo11,logo12,logo3,logo4,logo5,logo6,logo7,logo8,logo9,logo13,logo14,logo15,logo16,logo1,logo2,logo10,logo11,logo12,logo3,logo4,logo5,logo6,logo7,logo8,logo9,logo13,logo14,logo15,logo16,logo1,logo2,logo10,logo11,logo12,logo3,logo4,logo5,logo6,logo7,logo8,logo9,logo13,logo14,logo15,logo16,logo1,logo2,logo10,logo11,logo12,logo3,logo4,logo5,logo6,logo7,logo8,logo9,logo13,logo14,logo15,logo16,logo1,logo2,logo10,logo11,logo12,logo3,logo4,logo5,logo6,logo7,logo8,logo9,logo13,logo14,logo15,logo16,logo1,logo2,logo10,logo11,logo12,logo3,logo4,logo5,logo6,logo7,logo8,logo9,logo13,logo14,logo15,logo16,logo1,logo2,logo10,logo11,logo12,logo3,logo4,logo5,logo6,logo7,logo8,logo9,logo13,logo14,logo15,logo16,logo1,logo2,logo10,logo11,logo12,logo3,logo4,logo5,logo6,logo7,logo8,logo9,logo13,logo14,logo15,logo16,logo1,logo2,logo10,logo11,logo12,logo3,logo4,logo5,logo6,logo7,logo8,logo9,logo13,logo14,logo15,logo16
    
    // Add more logos as needed
  ];

  return (
    <div className="logo-strip">
      <div className="logo-strip-inner">
        
      {logos.map((logo, index) => (
  <img
    key={index + logos.length}
    src={logo}
    className="logo"
    alt={`logo-${index}`}
    style={{
      height: "50px",
      paddingRight: "15px",
      paddingLeft: "15px",
     // Inverts colors
    }}
  />
))}

      </div>
    </div>
  );
}

export default Slider;
