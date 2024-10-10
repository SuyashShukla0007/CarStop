// import express from 'express';
// import bodyParser from 'body-parser';
// import cors from 'cors';
// import { GoogleGenerativeAI } from "@google/generative-ai"; // Ensure this package is installed
// import
// const app = express();
// const PORT = 5000;

// // Initialize Google Generative AI
// const api="AIzaSyAkjOkygF8s4m4yy95UE0yc6mTfV6Flct8"
// const genAI = new GoogleGenerativeAI(api);
// const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// app.use(cors());
// app.use(bodyParser.json());

// // app.post('/api/chat', async (req, res) => {
// //   try {
// //     const { message } = req.body;
// //     const chat = model.startChat({
// //       history: [
// //         {
// //           role: "user",
// //           parts: [{ text: "About car I want to buy" }],
// //         },
// //         {
// //           role: "model",
// //           parts: [{ text: "Tell me more about your requirements, then I can suggest a car." }],
// //         },
// //       ],
// //     });

// //     // Send message and get response
// //     let result = await chat.sendMessage(message);
// //     res.json({ response: result.response.text() });
// //   } catch (error) {
// //     console.error(error);
// //     res.status(500).json({ error: 'Something went wrong!' });
// //   }
// // });

// app.post('/api/chat', async (req, res) => {
//   try {
//     const { userId, message } = req.body;

//     // Retrieve chat history from MongoDB
//     const historyEntries = await Prompt.find({ userId }).sort({ timestamp: 1 });

//     // Convert history entries to the format expected by the chat model
//     const chatHistory = historyEntries.map(entry => ({
//       role: entry.prompt ? 'user' : 'model',
//       parts: [{ text: entry.prompt || entry.response }],
//     }));

//     // Start chat with existing history
//     const chat = model.startChat({
//       history: chatHistory,
//     });

//     // Send message and get response
//     let result = await chat.sendMessage(message);

//     // Save user prompt and Gemini response to MongoDB with an expiration time (e.g., 1 hour)
//     const expirationTime = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
//     const promptHistory = new Prompt({
//       userId,
//       prompt: message,
//       response: result.response.text(),
//       expiration: expirationTime
//     });

//     await promptHistory.save();

//     // Send response to client
//     res.json({ response: result.response.text() });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Something went wrong!' });
//   }
// });


// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });


import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { GoogleGenerativeAI } from "@google/generative-ai"; // Ensure this package is installed
import mongoose from 'mongoose';
import Prompt from './models/prompt.js'; // Adjust the path to your model file
import jwt from 'jsonwebtoken';
const app = express();
const PORT = 5000;

// Initialize Google Generative AI
const apiKey = "AIzaSyAkjOkygF8s4m4yy95UE0yc6mTfV6Flct8" // Use environment variables for sensitive data
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/your-database', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
  console.log('Mongoose is connected');
});

mongoose.connection.on('error', (err) => {
  console.log('Mongoose connection error:', err);
});

app.post('/api/chat', async (req, res) => {
  try {

    const token=req.headers['authorization']

    const user=jwt.verify(token, 'ca')
    const userId=user.id

    const {  message } = req.body;

    // Retrieve chat history from MongoDB
    const historyEntries = await Prompt.find({ userId }).sort({ timestamp: 1 });

    // Convert history entries to the format expected by the chat model


    const chatHistory = historyEntries.map(entry => ({
      role: entry.prompt ? 'user' : 'model',
      parts: [{ text: entry.prompt || entry.response }],
    }));

    // Start chat with existing history
  

    const history = [

      {
        role: "user",
        parts: [{ text: "i want to buy a car" }],
      },
      {
        role: "model",
        parts: [{ text: "okay i would help you to find your dream car, by asking only single line five questions  " }],
      },
      {
        role: "user",
        parts: [{ text: "budget in any currency" }],
      },
      {
        role: "model",
        parts: [{ text: " features required" }],
      },
      
  // {
  //   role: "model",
  //   parts: [{ text: "What is your budget for the car?" }],
  // },
  // {
  //   role: "user",
  //   parts: [{ text: "Around 20,000 USD" }],
  // },
  // {
  //   role: "model",
  //   parts: [{ text: "Do you prefer an electric, hybrid, or gasoline car?" }],
  // },
  // {
  //   role: "user",
  //   parts: [{ text: "I prefer gasoline" }],
  // },
  // {
  //   role: "model",
  //   parts: [{ text: "How many people do you want the car to seat?" }],
  // },
  // {
  //   role: "user",
  //   parts: [{ text: "It should seat 5 people" }],
  // },
  // {
  //   role: "model",
  //   parts: [{ text: "Do you need a car with good fuel economy?" }],
  // },
  // {
  //   role: "user",
  //   parts: [{ text: "Yes, fuel economy is important" }],
  // },
  // {
  //   role: "model",
  //   parts: [{ text: "Do you want a sedan, SUV, or hatchback?" }],
  // },
  // {
  //   role: "user",
  //   parts: [{ text: "I want an SUV" }],
  // },
  // {
  //   role: "model",
  //   parts: [{ text: "Based on your preferences, I suggest you check out the Toyota RAV4  , fuel-efficient SUVs within your budget." }],
  // },
];

    
    // Combine both predefined and retrieved chat history
    const combinedChatHistory = [...history, ...chatHistory];

    const chat = model.startChat({
      history: combinedChatHistory,
    });

    // Send message and get response
    let result = await chat.sendMessage(message);

    // Save user prompt and Gemini response to MongoDB with an expiration time (e.g., 1 hour)
    const expirationTime = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
    const promptHistory = new Prompt({
      userId,
      prompt: message,
      response: result.response.text(),
      expiration: expirationTime
    });

    await promptHistory.save();

    const fullResponse = result.response.text();

    const formatResponse = (response) => {
      // Replace new lines with spaces
      let formattedResponse = response.replace(/\n/g, ' ');
    
      // Remove extra spaces
      formattedResponse = formattedResponse.replace(/\s+/g, ' ').trim();
    
      // Remove asterisks (*) that may represent Markdown bullet points
      formattedResponse = formattedResponse.replace(/\*+/g, '');
    
      // Ensure proper spacing around punctuation (if necessary)
      formattedResponse = formattedResponse.replace(/\s([?.!,])/g, '$1');
    
      return formattedResponse;
    };

    const paragraphResponse = formatResponse(fullResponse);



    res.json({ response: paragraphResponse });
    

    // Send only the first part of the response (index 0)

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong!' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});