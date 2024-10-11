import img1 from '../assets/aston.jpeg'
import Cookies from 'js-cookie'
import img2 from '../assets/mclaren.jpg'
import { useNavigate } from 'react-router-dom'
import img4 from '../assets/gtr.jpeg'
// @ts-ignore
import Loading from '../components/global/Loading'

import { useState, useEffect } from 'react'
import axios from 'axios'

const SignUp = () => {
  const [formValues, setFormValues] = useState({
    name: '',
    phone: 0,
    email: '',
    password: '',
    
  })
const navigate=useNavigate()
  const [loading, setLoading] = useState(true)

  const images = [img1, img2, img4]
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    setLoading(false)

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 5000) // Change image every 5 seconds

    return () => clearInterval(interval) // Cleanup interval on component unmount
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }))
  }


  useEffect(()=>{
    if(Cookies.get('token'))
      navigate('/')
  },[])

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault() // Prevent the default form submission

    try {
      const res = await axios.post("https://car-stop-ten.vercel.app/user/register" ,formValues )


      console.log(res.data.token)
      
      //res ok
      navigate('/')
      Cookies.set('token', res.data.token, {
        expires: 1, // 1 day (adjust as needed)
        path: '/',  // Ensure it is accessible site-wide
        secure: true,  // Use 'true' if you're in production and using HTTPS
        sameSite: 'none',  // Adjust this for cross-site requests if needed
      });
    } catch (error) {
      console.error(error)
    }

    console.log('Form submitted:', formValues)
  }

  if (loading) {
    return <Loading />
  }

  return (
    <div className="grid grid-cols-3 h-screen">
      <div
        className="col-span-1 h-full bg-cover bg-center"
        style={{
          backgroundImage: `url(${images[currentImageIndex]})`,
        }}
      ></div>
      <div className="col-span-2 h-full  pl-[12vw] pt-[10vh]  bg-gray-900 text-gray-100 flex items-center justify-center">
        <div className="relative ml-8 h-3/4 mt-22 flex flex-col">
          <h1 className="text-gray-100 text-3xl font-mono mb-5">
            Get Your Free Account Now.
          </h1>
          <p className="text-gray-400 text-xl mb-8 font-serif w-4/5">
            Let’s get you all set up so you can verify your personal account and begin setting up your profile.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-3">
              <div className="flex gap-8">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-white">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Suyash"
                    className="p-3 bg-gray-900 border-2 border-blue-800 rounded-lg text-white w-72"
                    value={formValues.name}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="phone" className="text-white">
                    Phone number
                  </label>
                  <input
                    type="text"
                    name="phone"
                    placeholder="XXX-XX-XXXX-XXX"
                    className="p-3 bg-gray-900 border-2 border-blue-800 rounded-lg text-white w-72"
                    value={formValues.phone}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="flex gap-8">
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-white">
                    Email address
                  </label>
                  <input
                    type="text"
                    name="email"
                    placeholder="example@gmail.com"
                    className="p-3 bg-gray-900 border-2 border-blue-800 rounded-lg text-white w-72"
                    value={formValues.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="password" className="text-white">
                    Enter your password
                  </label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    className="p-3 bg-gray-900 border-2 border-blue-800 rounded-lg text-white w-72"
                    value={formValues.password}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="flex gap-8">
                <div className="flex flex-col gap-2">
                  <label htmlFor="confirmPassword" className="text-white">
                    Confirm password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm password"
                    className="p-3 bg-gray-900 border-2 border-blue-800 rounded-lg text-white w-72"
                 
                  />
                </div>

                <div className="flex mt-4">
                  <button
                    type="submit"
                    className="bg-blue-500 px-10 w-72 text-white p-3 rounded-lg mt-4 hover:bg-blue-600 transition-colors duration-300"
                  >
                    Sign Up
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignUp
