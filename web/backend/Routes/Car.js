import express from 'express';

const Carrouter = express.Router();
// import the functions from the controller
import {sellCar,rentCar,buy,buyAll,rentAll,addComment,all,rating} from '../controllers/Car.js'

// define the routes

// sell a car
Carrouter.post('/sell',sellCar)
// rent a car
Carrouter.post('/rent/:userid',rentCar)
// buy a car
Carrouter.get('/buy/:carid',buy)
// get all cars for sale
Carrouter.get('/buyAll',buyAll)

Carrouter.get('/all',all)

Carrouter.patch('/rating/:carid',rating)
// get all cars for rent
Carrouter.get('/rentAll',rentAll)

Carrouter.post('/comment/:carid',addComment)
export default Carrouter;

// the routes are defined in the file above. The routes are then exported to be used in the main file. The routes are defined as follows:
// sell a car: This route is a POST request that takes the user ID as a parameter and calls the sellCar function from the controller.
// rent a car: This route is a POST request that takes the user ID as a parameter and calls the rentCar function from the controller.
// buy a car: This route is a GET request that takes the car ID as a parameter and calls the buy function from the controller.
// get all cars for sale: This route is a GET request that calls the buyAll function from the controller.
// get all cars for rent: This route is a GET request that calls the rentAll function from the controller.
// The routes are defined using the express.Router() method, which creates a new router object. The routes are then defined using the router object's methods, such as get() and post(). The routes are then exported using the module.exports statement so that they can be imported and used in the main file.
