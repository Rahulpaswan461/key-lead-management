const express = require("express"); 
const { signupUser, loginUser } = require("../controllers/KAM"); 

const router = express.Router();

// Define routes for user signup and login
router.post("/signup", signupUser);
router.post("/login", loginUser);

module.exports = router; // Export the router
