import express from 'express';

const Userrouter = express.Router();
// import the functions from the controller
import {login,register,getUser} from '../controllers/User.js'
// define the routes
// login
Userrouter.get('/login',login)
// register
Userrouter.post('/register',register)
// logout
// Userrouter.get('/logout',logout)

Userrouter.get('/User',getUser)

export default Userrouter;

// The routes are defined in the file above. The routes are then exported to be used in the main file. The routes are defined as follows:
// login: This route is a GET request that calls the login function from the controller.
// register: This route is a GET request that calls the register function from the controller.
// logout: This route is a GET request that calls the logout function from the controller.
// The routes are defined using the express.Router() method, which creates a new router object. The routes are then defined using the router object's methods, such as get() and post(). The routes are then exported using the module.exports statement so that they can be imported and used in the main file.
