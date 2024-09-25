import Home from './pages/Home'
import './App.css'
import Navbar from './components/global/Navbar';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cars from './pages/Cars';
import Sign from './pages/SignUp';
import Buy from './pages/Buy';
import Rent from './pages/Rent';
import Sell from './pages/Sell';



function App() {

  

  return (
    <>
    
          <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>  }/>
        <Route path='/buy' element={<Buy/>}></Route>
        <Route path='/rent' element={<Rent/>}></Route>
        <Route path='/sell' element={<Sell/>}></Route>
        <Route path='/signUp' element={<Sign/>}></Route>

        <Route path='/car/:id' element={<Cars/>}></Route>
      </Routes>
    </BrowserRouter>
     
   
  

     
    </>
  )
}

export default App
