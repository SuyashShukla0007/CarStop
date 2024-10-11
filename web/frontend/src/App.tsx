import Home from './pages/Home'
import './App.css'
import {  Routes, Route } from "react-router-dom";
import Cars from './pages/Cars';
import Sign from './pages/SignUp';
import Buy from './pages/Buy';
import Rent from './pages/Rent';
import Sell from './pages/Sell';
import BotIcon from './components/ChatBot/BotIcon';
import { Login } from './pages/Login';



function App() {

  

  return (
    <>

          <BotIcon ></BotIcon>
      <Routes>

        <Route path='/' element={<Home/>  }/>
        <Route path='/buy' element={<Buy/>}></Route>
        <Route path='/rent' element={<Rent/>}></Route>
        <Route path='/sell' element={<Sell/>}></Route>
        <Route path='/login' element={<Login/>}></Route>

        <Route path='/signUp' element={<Sign/>}></Route>

        <Route path='/car/:id' element={<Cars/>}></Route>
      </Routes>
     
   
  

     
    </>
  )
}

export default App
