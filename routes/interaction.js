const express = require("express"); // Import express
const { createInteraction, getInteractionByRestaurantId, 
    setCallFrequency, requiringCallToday, updateLastCall, 
    wellPerformingAccounts, underPerformingAccounts, orderPattern } = require("../controllers/interaction"); // Import controller functions

const router = express.Router(); // Create a new router instance

// Define the routes for interaction-related actions
router.post("/interaction-tracking", createInteraction);
router.get("/get-restaurant-interactions/:restaurantId", getInteractionByRestaurantId);
router.patch("/set-call-frequency", setCallFrequency);
router.get("/calls-due-today", requiringCallToday);
router.patch("/update-last-call/:restaurantId", updateLastCall);
router.get("/well-performing-accounts", wellPerformingAccounts);
router.get("/under-performing-accounts", underPerformingAccounts);
router.get("/order-pattern", orderPattern);

module.exports = router; // Export the router
