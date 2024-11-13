import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import { Home } from "lucide-react";
import "./Navbar.css";

const Navbar = ({ act }: any) => {
  const [show, setShow] = useState<boolean>(false);

  const handleLogout = () => {
    Cookies.remove("token");
    window.location.reload();
  };

  useEffect(() => {
    const token = Cookies.get("token");

    if (!token) {
      setShow(false);
      return;
    }
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "https://carstop.vercel.app/user/User",
          {
            headers: { Authorization: token },
          }
        );
        console.log("Response data:", response.data);
        setShow(true);
      } catch (error) {
        console.error("Error fetching data:", error);
        setShow(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <div>
      <ul
        className={`grid  items-center justify-center ${
          show ? "grid-cols-6 w-[95vw]" : "grid-cols-5 w-full"
        } md:ml-10`}
      >
        <NavLink
          id="logo"
          to="/"
          className={`navi hidden md:block text-2xl md:text-4xl ${
            act === "home" ? "text-red font-bold" : ""
          }`}
        >
          CARSTOP
        </NavLink>
        <NavLink
          id="home-icon"
          to="/"
          className={`navi md:hidden  pl-6  ${
            act === "home" ? "block" : "block"
          }`}
        >
          <Home color="red" size={24} />
        </NavLink>
        <NavLink
          to="/myCars"
          className={`navi ${act === "My Cars" ? "text-red font-bold" : ""} ${
            show ? "block" : "hidden"
          } text-sm md:text-xl`}
        >
          My Cars
        </NavLink>
        <NavLink
          to="/rent"
          className={`navi ${
            act === "rent" ? "text-red font-bold" : ""
          } text-sm md:text-xl`}
        >
          Rent Car
        </NavLink>
        <NavLink
          to="/sell"
          className={`navi ${
            act === "sell" ? "text-red font-bold" : ""
          } text-sm md:text-xl`}
        >
          Sell Car
        </NavLink>
        <NavLink
          to="/buy"
          className={`navi ${
            act === "buy" ? "text-red font-bold" : ""
          } text-sm md:text-xl`}
        >
          Buy Car
        </NavLink>
        {!show ? (
          <li>
            <NavLink to="/signUp">
              <button id="sign" className="text-xs md:text-lg">
                Sign
              </button>
            </NavLink>
          </li>
        ) : (
          <h1
            className="text-sm w-[15vw] py-1 md:text-lg bg-red md:px-3 md:py-2 cursor-pointer md:w-24 md:w-30 text-center rounded font-bold"
            onClick={handleLogout}
          >
            Logout
          </h1>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
