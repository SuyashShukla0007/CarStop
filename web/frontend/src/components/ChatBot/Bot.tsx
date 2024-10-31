import { useState,useEffect } from 'react';
import img2 from '../../assets/176348.jpg'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import Cookies from 'js-cookie';
import img from '../../assets/0389e8dfd7ef480281a03d02d9ecf484.webp'
interface BotProps {
  toggle: () => void;
}

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
}

const Bot: React.FC<BotProps> = ({ toggle }) => {
  const navigator =useNavigate()
  const [isOpen, setIsOpen] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false); // Loading state for bot response
const lastmsg = useRef<HTMLDivElement>(null);
  // Add a useEffect hook to scroll to the last message when messages change
  useEffect(() => {
    if (lastmsg.current) {
      lastmsg.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);
  const handleToggle = () => {
    setIsOpen(false);
    toggle();
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleSendMessage = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if(Cookies.get('token')==null)
    {
      handleToggle()
      navigator('/login')
    }


    if (input.trim()) {
      const newMessage: Message = {
        id: Date.now(), // Unique ID for each message
        text: input,
        sender: 'user',
      };

      // Update messages state with user message
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setLoading(true); // Set loading to true

      try {
        // Replace this URL with your actual API endpoint
        const token=Cookies.get('token');
        const response = await axios.post('https://car-bot-backend.vercel.app/api/chat', {message: input },
          {
            headers:{
              'Authorization':token
            }
          }
        );

        // Assuming the API returns an object with a 'response' property
        const botResponse: Message = {
          id: Date.now() + 1, // Ensure a unique ID
          text: response.data.response,
          sender: 'bot',
        };

        // Update messages with bot response
        setMessages((prevMessages) => [...prevMessages, botResponse]);
      } catch (error) {
        console.error('Error fetching bot response:', error);
        const errorMessage: Message = {
          id: Date.now() + 2, // Ensure a unique ID
          text: 'Sorry, there was an error getting a response.',
          sender: 'bot',
        };
        setMessages((prevMessages) => [...prevMessages, errorMessage]);
      } finally {
        setLoading(false); // Set loading to false
      }

      // Clear input field
      setInput('');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="h-[60vh] w-[90vw] sm:h-[70vh] md:w-[60vw] sm:w-[30vw] rounded-lg shadow-lg bg-white overflow-hidden" style={{backgroundImage:`url(${img2})`, backgroundSize:'cover', backgroundPosition:'center'}}>
        <div className="flex items-center bg-red justify-between rounded-t-lg bg-red-600 p-4">
          <h1 className="text-white text-3xl justify-center inset-0 items-center flex font-bold">
            <img src={img} className='h-[4vh]  rounded-full  mr-4' alt="" />
            <p>Chat Bot</p></h1>
          <button className="text-white text-4xl" onClick={handleToggle}>
            &times;
          </button>
        </div>
        <div className="overflow-y-auto h-[calc(100%-128px)] p-4" id="container"> {/* Adjusted height calculation */}
          {messages.map((message) => (
            
            <div key={message.id} className={`my-2 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}>
              <div ref={lastmsg}></div>
              <span className={`inline-block px-3 py-2 rounded-lg ${message.sender === 'user' ? 'bg-red text-white' : 'bg-gray-200 text-black'}`}>
                {message.text}
              </span>

            </div>
          ))}
          
          {loading && <div className="text-center text-white text-semibold">Bot is typing...</div>}
        </div>
        <form onSubmit={handleSendMessage} className="flex px-4 py-2 bg-white border-t border-gray-300">
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            className="flex-grow border rounded-lg p-2 mr-2"
            placeholder="Type a message..."
          />
          <button type="submit" className="bg-red text-white rounded-lg px-4">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Bot;