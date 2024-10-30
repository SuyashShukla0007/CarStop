import { Pencil, Trash2 } from "lucide-react";
import "./Comments.css";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Stars2 } from "../Car/Stars";
import { Stars } from "../global/Stars";

type CommentType = {
  text: string;
  postedBy: string;
  time: string;
  rating: number;
};

const Comments = () => {
  const [comments, setComments] = useState<CommentType[] | null>(null);
  const { id } = useParams();
  const ID = id?.split("=")[1];
  const [Pop, setPop] = useState<boolean>(false);
  const [text, setText] = useState<string>("");
  const [currentRating, setCurrentRating] = useState<number>(0);
  const nav = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(`https://carstop.vercel.ap/car/buy/${ID}`);
      setComments(res.data.car.comments);
    };
    fetch();
  }, []);

  const handleEdit = () => {
    // Logic for editing a comment
  };

  const handleSubmit = async () => {
    if (!text.trim()) {
      alert("Comment cannot be empty.");
      return;
    }

    try {
      setPop(false);
      const token = Cookies.get("token");

      if (!token) {
        alert("Please login to comment");
        nav("/login");
        return;
      }

      const user = await axios.get("https://carstop.vercel.ap/user/User", {
        headers: { Authorization: token },
      });

      const postedBy = user.data.name;
      const res = await axios.post(
        `https://carstop.vercel.ap/car/comment/${ID}`,
        {
          text: text.trim(),
          postedBy,
          time: new Intl.DateTimeFormat("en-GB", {
            day: "numeric",
            month: "long",
          }).format(new Date()),
          rating: currentRating,
        },
        { headers: { Authorization: token } }
      );

      setText("");
      console.log(res.data);
      setComments((prevComments) =>
        prevComments ? [...prevComments, res.data] : [res.data]
      );
    } catch (err) {
      console.error("Error posting comment:", err);
    }
  };

  const handleDelete = async (comm: CommentType) => {
    try {
      if (!ID) {
        console.error("Invalid ID");
        return;
      }

      const token = Cookies.get("token");
      if (!token) {
        alert("Please login to delete comments");
        nav("/login");
        return;
      }

      const response = await axios.post(
        `https://carstop.vercel.ap/car/deleteComment/${ID}`,
        comm,
        { headers: { Authorization: token } }
      );

      setComments((prevComments) =>
        (prevComments ?? []).filter(
          (com) =>
            !(
              com.postedBy === comm.postedBy &&
              com.time === comm.time &&
              com.text === comm.text
            )
        )
      );

      console.log("Comment deleted:", response.data);
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const reversedComments = comments ? [...comments].reverse() : [];

  const handleRatingChange = (newRating: number) => {
    setCurrentRating(newRating);
    console.log("Rating updated to:", newRating);
  };

  if (!comments?.length) {
    return (
      <>
        <div className="absolute top-[135vh] w-[25vw] left-[15vw] flex justify-between">
          <h1 className="text-red font-bold text-3xl">Comments</h1>
          <button
            className="px-5 py-2 text-white bg-red w-[200px] rounded-lg"
            onClick={() => setPop(true)}
          >
            Add comment
          </button>
        </div>

        <div className="text-2xl text-gray-600 font-semibold absolute mt-[10vh] ml-[15vw]">
          No comments yet
        </div>

        {Pop && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[100]">
            <div className="relative h-[40vh] w-[30vw] p-6 flex flex-col justify-center items-center text-black bg-white shadow-lg rounded-lg">
              <button
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-3xl font-bold"
                onClick={() => setPop(false)}
              >
                &times;
              </button>
              <h1 className="text-3xl mb-4 font-bold text-red">Add Comment</h1>

              <Stars2
                onRatingChange={handleRatingChange}
                initialRating={currentRating}
              />

              <textarea
                className="w-full h-[50%] p-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 resize-none text-gray-700"
                placeholder="Write your comment here..."
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              <button
                className="text-white font-bold bg-red mt-4 p-2 rounded-lg"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <>
      <div className="absolute top-[135vh] w-[25vw] left-[15vw] flex justify-between">
        <h1 className="text-red font-bold text-3xl">Comments</h1>
        <button
          className="px-5 py-2 text-white bg-red w-[200px] rounded-lg"
          onClick={() => setPop(true)}
        >
          Add comment
        </button>
      </div>

      {Pop && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[100]">
          <div className="relative h-[40vh] w-[30vw] p-6 flex flex-col justify-center items-center text-black bg-white shadow-lg rounded-lg">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-3xl font-bold"
              onClick={() => setPop(false)}
            >
              &times;
            </button>
            <h1 className="text-3xl mb-4 font-bold text-red">Add Comment</h1>

            <Stars2
              onRatingChange={handleRatingChange}
              initialRating={currentRating}
            />

            <textarea
              className="w-full h-[50%] p-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 resize-none text-gray-700"
              placeholder="Write your comment here..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <button
              className="text-white font-bold bg-red mt-4 p-2 rounded-lg"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      )}

      <div className="max-h-[40vh] scrollable mt-[10vh] overflow-y-auto w-[45vw] mb-10">
        {reversedComments.map((com, idx) => (
          <div
            key={idx}
            className="flex flex-col items-start w-[30vw] ml-[12vw] border-y-2 mb-6 border-x-2 rounded-lg border-gray-300"
          >
            <div className="text-lg font-semibold border-b-2 border-gray-300 flex justify-between w-full p-4 text-start">
              <div className="flex items-center">
                <p className="mr-2">{com.postedBy}</p>
                <Stars stars={com.rating} />
              </div>
              <div className="flex items-center">
                <p className="mr-2">{com.time}</p>
                <Pencil
                  className="mt-1 cursor-pointer"
                  size={14}
                  onClick={() => handleEdit()}
                />
                <Trash2
                  className="mt-1 ml-2 cursor-pointer"
                  size={14}
                  onClick={() => handleDelete(com)}
                />
              </div>
            </div>
            <p className="p-4 text-gray-600">{com.text}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Comments;
