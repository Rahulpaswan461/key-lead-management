const express = require("express"); 
const { createContact } = require("../controllers/contact"); 

const router = express.Router(); 

// Define the route to create a new contact
router.post("/create-contact", createContact); // POST request to '/create-contact' will call the 'createContact' controller

module.exports = router; 
