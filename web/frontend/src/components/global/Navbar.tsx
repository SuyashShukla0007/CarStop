import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import "./Navbar.css";
import { Home } from "lucide-react";

const Navbar = ({ act }: any) => {
  const [show, setShow] = useState<boolean>(false);

  const handleLogout = () => {
    Cookies.remove("token");
    window.location.reload();
  };

  useEffect(() => {
    const token = Cookies.get("token");

    if (!token) {
      setShow(false); // No token, show sign-in button
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
        setShow(true); // Show user info
      } catch (error) {
        console.error("Error fetching data:", error);
        setShow(true); // Hide user info and show sign-in button on error
      }
    };

    fetchUser();
  }, []); // Empty dependency array, runs only once on mount

  return (
    <>
      <NavLink
        id="logo"
        to="/"
        className={`navi md:hidden
            absolute left-1 top-10 
            overflow-hidden
            ${
              act == "home" ? "text-red font-bold hidden" : "block"
            } md:text-4xl`}
      >
        <Home color="red" />
      </NavLink>
      <div>
        <ul
          className={`ml-0 grid ${
            show ? "grid-cols-6 gap-0 " : "grid-cols-5 md:gap-36"
          } ${
            act != "home" ? "md:ml-10 ml-0" : "ml-0"
          } w-[100%]  md:w-[100%] items-center justify-center`}
        >
          <NavLink
            id="logo"
            to="/"
            className={`navi  
            ${show ? "hidden md:block" : "block"}
            ${act == "home" ? "text-red font-bold" : ""} md:text-4xl`}
          >
            CARSTOP
          </NavLink>
          <NavLink
            to="/myCars"
            className={`navi ${
              act == "My Cars" ? "text-red font-bold" : ""
            }text-sm md:text-xl  ${show ? "block" : "hidden"}`}
          >
            My Cars
          </NavLink>
          <NavLink
            to="/rent"
            className={`navi ${
              act == "rent" ? "text-red font-bold" : ""
            } text-sm md:text-xl`}
          >
            Rent Car
          </NavLink>
          <NavLink
            to="/sell"
            className={`navi ${
              act == "sell" ? "text-red font-bold" : ""
            } text-sm md:text-xl`}
          >
            Sell Car
          </NavLink>
          <NavLink
            to="/buy"
            className={`navi ${
              act == "buy" ? "text-red  font-bold" : ""
            } text-sm md:text-xl`}
          >
            Buy Car
          </NavLink>
          {!show ? (
            <li>
              <NavLink to="/signUp">
                <button id="sign" className="text-xs">
                  Sign In
                </button>
              </NavLink>
            </li>
          ) : (
            <h1
              className=" text-sm py-1 md:text-lg bg-red md:px-3 md:py-2 cursor-pointer w-[100px] md:w-[120px] text-center rounded font-bold"
              onClick={handleLogout}
            >
              Logout
            </h1>
          )}
        </ul>
      </div>
    </>
  );
};

export default Navbar;
