import { FormEvent } from 'react';
import img from '../assets/Login.jpg';
import { useState } from 'react';
import Loading from '../components/global/Loading';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
export function Login() {

  const navi=useNavigate()
  const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
  const [loading,setLoading]=useState(false)
  const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true)
    const body:any={email,password}
    try
    {
    const res=await axios.post('https://car-stop-ten.vercel.app/user/login',body)
    if(res)
    {
      Cookies.set('token',res.data.token)
      console.log(res.data.message)
      setLoading(false)
      navi('/')
    }
    }
    catch(err)
    {
      console.log("error"+err)
    }

console.log('login')
  };

  if(loading)
  {
    return <Loading/>
  }

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${img})` }}
      ></div>
      <div className="flex h-full w-full items-center justify-center bg-black bg-opacity-75">
        <div className="rounded-2xl bg-gray-900 bg-opacity-80 z-10 p-8 text-white shadow-lg">
          <h2 className="mb-6 text-3xl font-bold text-center text-gray-100">Welcom back Motorhead</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                Email:
              </label>
              <input
                type="email"
                id="email"
                value={email}
                className="mt-1 w-full rounded-md bg-gray-800 px-3 py-2 focus:bg-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring focus:ring-blue-500"
                placeholder="email@example.com"
                onChange={(e)=>setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                Password:
              </label>
              <input
                type="password"
                id="password"
                value={password}
                className="mt-1 w-full rounded-md bg-gray-800 focus:bg-gray-700 px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring focus:ring-blue-500"
                placeholder="Password"
                onChange={(e)=>setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-md bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-500"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
