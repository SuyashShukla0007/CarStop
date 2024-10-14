import axios from "axios";
import { useState } from "react";
import Cookies from "js-cookie";
import img from "../assets/sellcar.jpg";
import { House } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Loading from "../components/global/Loading";
export default function SellForm() {
  const navi = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formValues, setFormValues] = useState({
    owner: "",
    brand: "",
    color: "",
    images: [],
    email: "",
    phone: "",
    isRent: false,
    isBuy: false,
    engine: "",
    transmission: "",
    location: "",
    Rentprice: 0,
    Buyprice: 0,
    seats: 0,
    engineType: "",
    model: "",
    year: 0,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setFormValues({
      ...formValues,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files) {
      setFormValues({
        ...formValues,
        [name]: Array.from(files),
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(formValues).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((file) => formData.append(key, file));
      } else {
        formData.append(key, value as string | Blob);
      }

      setLoading(true);
    });

    try {
      const token = Cookies.get("token");

      if (!token) {
        alert("Please login to sell your car");
        navi("/login");
        return;
      }

      const response = await axios.post(
        "https://carstop.vercel.app/car/sell",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token,
          },
        }
      );

      if (!response) {
        throw new Error("Network response was not ok");
      }

      setLoading(false);
      navi("/");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (loading) return <Loading />;

  return (
    <div
      className="min-h-screen  py-12 px-4 sm:px-6 lg:px-8"
      style={{ backgroundImage: `url(${img})`, backgroundPosition: "center" }}
    >
      <div className="ml-10 fixed">
        <House color="red" size={50} onClick={() => navi("/")} />
      </div>

      <div className="max-w-3xl mx-auto bg-white opacity-85 rounded-lg shadow-md overflow-hidden">
        <div className="px-4 py-5 sm:p-6">
          <h2 className="text-2xl font-bold text-red mb-6">List Your Car</h2>
          <form
            action=""
            method="post"
            encType="multipart/form-data"
            className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8"
            onSubmit={handleSubmit}
          >
            {/* Owner */}
            <div>
              <label
                htmlFor="owner"
                className="block text-sm font-medium text-red"
              >
                Owner
              </label>
              <input
                type="text"
                id="owner"
                name="owner"
                required
                className="mt-1 block text-red  w-full border border-red rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red focus:border-red font-semibold sm:text-sm"
                onChange={handleChange}
              />
            </div>

            {/* Brand */}
            <div>
              <label
                htmlFor="brand"
                className="block text-sm font-medium text-red"
              >
                Brand
              </label>
              <input
                type="text"
                id="brand"
                name="brand"
                required
                className="mt-1 block w-full border border-red rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red focus:border-red font-semibold text-red sm:text-sm"
                onChange={handleChange}
              />
            </div>

            {/* Color */}
            <div>
              <label
                htmlFor="color"
                className="block text-sm font-medium text-red"
              >
                Color
              </label>
              <input
                type="text"
                id="color"
                name="color"
                required
                className="mt-1 block w-full border border-red rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red focus:border-red font-semibold text-red sm:text-sm"
                onChange={handleChange}
              />
            </div>

            {/* Images */}
            <div>
              <label
                htmlFor="images"
                className="block text-sm font-medium text-red"
              >
                Images
              </label>
              <input
                type="file"
                id="images"
                name="images"
                multiple
                className="mt-1 block w-full text-sm text-red file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-red file:text-white hover:file:bg-red"
                onChange={handleFileChange}
              />
            </div>

            {/* Comments */}

            {/* Rating */}

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-red"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="mt-1 block w-full border border-red rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red focus:border-red font-semibold text-red sm:text-sm"
                onChange={handleChange}
              />
            </div>

            {/* Phone */}
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-red"
              >
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                className="mt-1 block w-full border border-red rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red focus:border-red font-semibold text-red sm:text-sm"
                onChange={handleChange}
              />
            </div>

            {/* Is Rent and Is Buy */}
            <div className="sm:col-span-2">
              <fieldset className="space-y-4">
                <legend className="sr-only">Listing Type</legend>
                <div className="flex items-center space-x-6">
                  <div className="flex items-center">
                    <input
                      id="isRent"
                      name="isRent"
                      type="checkbox"
                      className="h-4 w-4 text-red focus:ring-red border-red rounded"
                      onChange={handleChange}
                    />
                    <label
                      htmlFor="isRent"
                      className="ml-3 block text-sm font-medium text-red"
                    >
                      Available for Rent
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="isBuy"
                      name="isBuy"
                      type="checkbox"
                      className="h-4 w-4 text-red focus:ring-red border-red rounded"
                      onChange={handleChange}
                    />
                    <label
                      htmlFor="isBuy"
                      className="ml-3 block text-sm font-medium text-red"
                    >
                      Available for Purchase
                    </label>
                  </div>
                </div>
              </fieldset>
            </div>

            {/* Engine */}
            <div>
              <label
                htmlFor="engine"
                className="block text-sm font-medium text-red"
              >
                Engine
              </label>
              <input
                type="text"
                id="engine"
                name="engine"
                required
                className="mt-1 block w-full border border-red rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red focus:border-red font-semibold text-red sm:text-sm"
                onChange={handleChange}
              />
            </div>

            {/* Transmission */}
            <div>
              <label
                htmlFor="transmission"
                className="block text-sm font-medium text-red"
              >
                Transmission
              </label>
              <input
                type="text"
                id="transmission"
                name="transmission"
                required
                className="mt-1 block w-full border border-red rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red focus:border-red font-semibold text-red sm:text-sm"
                onChange={handleChange}
              />
            </div>

            {/* Location */}
            <div>
              <label
                htmlFor="location"
                className="block text-sm font-medium text-red"
              >
                Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                required
                className="mt-1 block w-full border border-red rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red focus:border-red font-semibold text-red sm:text-sm"
                onChange={handleChange}
              />
            </div>

            {/* Rent Price */}
            <div>
              <label
                htmlFor="Rentprice"
                className="block text-sm font-medium text-red"
              >
                Rent Price
              </label>
              <input
                type="number"
                id="Rentprice"
                name="Rentprice"
                className="mt-1 block w-full border border-red rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red focus:border-red font-semibold text-red sm:text-sm"
                onChange={handleChange}
              />
            </div>

            {/* Buy Price */}
            <div>
              <label
                htmlFor="Buyprice"
                className="block text-sm font-medium text-red"
              >
                Buy Price
              </label>
              <input
                type="number"
                id="Buyprice"
                name="Buyprice"
                className="mt-1 block w-full border border-red rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red focus:border-red font-semibold text-red sm:text-sm"
                onChange={handleChange}
              />
            </div>

            {/* Seats */}
            <div>
              <label
                htmlFor="seats"
                className="block text-sm font-medium text-red"
              >
                Seats
              </label>
              <input
                type="number"
                id="seats"
                name="seats"
                required
                className="mt-1 block w-full border border-red rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red focus:border-red font-semibold text-red sm:text-sm"
                onChange={handleChange}
              />
            </div>

            {/* Engine Type */}
            <div>
              <label
                htmlFor="engineType"
                className="block text-sm font-medium text-red"
              >
                Engine Type
              </label>
              <input
                type="text"
                id="engineType"
                name="engineType"
                required
                className="mt-1 block w-full border border-red rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red focus:border-red font-semibold text-red sm:text-sm"
                onChange={handleChange}
              />
            </div>

            {/* Model */}
            <div>
              <label
                htmlFor="model"
                className="block text-sm font-medium text-red"
              >
                Model
              </label>
              <input
                type="text"
                id="model"
                name="model"
                required
                className="mt-1 block w-full border border-red rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red focus:border-red font-semibold text-red sm:text-sm"
                onChange={handleChange}
              />
            </div>

            {/* Year */}
            <div>
              <label
                htmlFor="year"
                className="block text-sm font-medium text-red"
              >
                Year
              </label>
              <input
                type="number"
                id="year"
                name="year"
                required
                className="mt-1 block w-full border border-red rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red focus:border-red font-semibold text-red sm:text-sm"
                onChange={handleChange}
              />
            </div>

            <div className="sm:col-span-2">
              <button
                type="submit"
                className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red hover:bg-red focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red"
              >
                Submit Listing
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
