const Joi = require("joi");

// Validation schema for user(Key Manager) data
const userValidation = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password : Joi.string().required()
})
// Validation schema for contact data
const contactValidation = Joi.object({
    name: Joi.string().required(), // Contact's name (required)
    role: Joi.string().valid("Owner", "Manager").default(""), // Contact's role (must be either "Owner" or "Manager", default is empty string)
    phone: Joi.string().required(), // Contact's phone number (required)
});

// Validation schema for interaction data
const interactionValidation = Joi.object({
    interactionDate: Joi.date().required(), // Date of interaction (required)
    interactionType: Joi.string().valid("Call", "Order", "Meeting").required(), // Type of interaction (must be one of the specified values, required)
    notes: Joi.string().required(), // Interaction notes (required)
    restaurant: Joi.string().optional(), // Associated restaurant ID (optional)
});

// Validation schema for restaurant data
const restaurantValidation = Joi.object({
    name: Joi.string().required(), // Restaurant's name (required)
    address: Joi.string().required(), // Restaurant's address (required)
    status: Joi.string().valid("New", "In Progress", "Closed").default("New"), // Restaurant's status (default is "New")
    contacts: Joi.array().items(Joi.string()).optional(), // List of contact IDs (optional)
    assignedKAM: Joi.string().required(), // Key Account Manager (required)
});

// Exporting all validation schemas
module.exports = {
    userValidation,
    contactValidation,
    interactionValidation,
    restaurantValidation,
};
