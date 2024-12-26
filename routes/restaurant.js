const express = require("express");
const { createRestaurant, updateRestaurant, deleteRestaurant, addContactToRestaurant,updateAssignedKAM } = require("../controllers/restaurant"); // Import controller functions

const router = express.Router(); 

// Define routes for restaurant operations
router.post("/create-restaurant", createRestaurant); // Route for creating a restaurant
router.patch("/update-restaurants", updateRestaurant); // Route for updating restaurant details
router.delete("/delete-restaurant", deleteRestaurant); // Route for deleting a restaurant
router.post("/add-contact-to-restaurant", addContactToRestaurant); // Route for adding contact to a restaurant
router.patch("/update-assined-KAM", updateAssignedKAM)

module.exports = router; 
