import { Stars } from '../../components/global/Stars';
import { Pencil, Trash2 } from 'lucide-react';
import './Comments.css';
import { useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useParams } from 'react-router-dom';

type CommentType = {
  text: string;
  postedBy: string;
  time: string;
  rating: number;
};

type PropsComments = {
  comment: CommentType[];
  rating?: number[];
};

const Comments = ({ comment = [], rating }: PropsComments) => {
  const [comments, setComments] = useState<CommentType[]>(comment);
  const [commentToDelete, setCommentToDelete] = useState<CommentType | null>(null);
  const { id } = useParams();
  const ID = id?.split('=')[1];

  const handleEdit = (com: CommentType) => {
    // Logic for editing a comment can be added here
  };

  const handleDelete = async (comm: CommentType) => {
    setCommentToDelete(comm);

    try {
      console.log('Deleting comment...');
      if (!ID) {
        console.error('Invalid ID');
        return;
      }
      const token=Cookies.get('token')
      const response = await axios.post(
        `https://car-stop-ten.vercel.app/car/deleteComment/${ID}`,
        comm,{headers:{"Authorization":token}}
      );
      console.log(response.data);

      // Remove the deleted comment from state
      setComments((prevComments) =>
        prevComments.filter(
          (com) =>
            !(com.postedBy === comm.postedBy && com.time === comm.time && com.text === comm.text)
        )
      );
      console.log('Comment deleted');
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  if (!comments.length) {
    return (
      <h1 className="text-2xl text-red font-semibold mb-[2vh] mt-12 ml-[12vw]">
        No comments available.
      </h1>
    );
  }

  const reversedComments = [...comments].reverse();

  return (
    <div className="max-h-[40vh] scrollable mt-[10vh] overflow-y-auto w-[45vw] mb-10">
      {reversedComments.map((com, idx) => (
        <div
          key={idx}
          className="flex flex-col items-start w-[30vw] ml-[12vw] border-y-2 mb-6 border-x-2 rounded-lg border-gray-300"
        >
          <div className="text-lg font-semibold border-b-2 border-gray-300 flex justify-between w-full p-4 text-start">
            <div className="flex items-center">
              <p className="mr-2">{com.postedBy}</p>
              <Stars stars={com.rating || 0} />
            </div>
            <div className="flex items-center">
              <p className="mr-2">{com.time}</p>
              <Pencil className="mt-1 cursor-pointer" size={14} onClick={() => handleEdit(com)} />
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
  );
};

export default Comments;
