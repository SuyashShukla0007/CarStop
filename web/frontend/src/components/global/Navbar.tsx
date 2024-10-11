import  { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import './Navbar.css';
import { User } from '../types/User';

const Navbar = ({act}:any) => {
  const [show, setShow] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);


  const handleLogout=()=>{
    Cookies.remove('token');
    window.location.reload();
  }

  useEffect(() => {
   
      const token = Cookies.get('token');
      
      if (!token) {
        setShow(false); // No token, show sign-in button
        return;
      }
      const fetchUser = async () => {
      try {
        const response = await axios.get("https://car-stop-ten.vercel.app/user/User", {
          headers:{'Authorization':token},
        });
        console.log("Response data:", response.data);
        setUser(response.data.name);  // Set user state
        setShow(true); // Show user info
      } catch (error) {
        console.error("Error fetching data:",error);
        setShow(false); // Hide user info and show sign-in button on error
      }
    };

    fetchUser();
  }, []); // Empty dependency array, runs only once on mount

  return (
    <div id="box">
      <ul id="head">
        <li>
          <p id="logo">CARHUB</p>
        </li>
        <NavLink to='/' className={`navi ${act=="home"?'text-red font-bold':""}`}>Home Page</NavLink>
        <NavLink to='/rent' className={`navi ${act=="rent"?'text-red font-bold':""}`}>Rent Car</NavLink>
        <NavLink to='/sell' className={`navi ${act=="sell"?'text-red font-bold':""}`}>Sell Car</NavLink>
        <NavLink to='/buy' className={`navi ${act=="buy"?'text-red font-bold':""}`}>Buy Car</NavLink>
        {!show ? (
          <li><NavLink to='/signUp'><button id='sign'>Sign In</button></NavLink></li>
        ) : (

          <h1 className='text-lg bg-red px-3 py-2 cursor-pointer w-[120px] text-center rounded font-bold' onClick={handleLogout}>Logout</h1>

        )}
      </ul>
    </div>
  );
}

export default Navbar;
