const Restaurant = require("../models/restaurant");
const mongoose = require("mongoose");
const { restaurantValidation } = require("./validation");

// Create a new restaurant
async function createRestaurant(req, res) {
    try {
        // Validate restaurant input using Joi schema
        const { error, value } = restaurantValidation.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.message });
        }

        const { name, address, status, assignedKAM } = value;

        // Create a new restaurant instance
        let restaurant = new Restaurant({
            name,
            address,
            status,
            assignedKAM,
        });

        // Save the restaurant to the database
        restaurant = await restaurant.save();

        if (!restaurant) {
            return res.status(400).json({ error: "Restaurant not created!" });
        }

        return res.status(201).json({success: "Restaurant created successfully", restaurant});
    } catch (error) {
        console.error("Error during restaurant creation:", error.message);
        return res.status(500).json({ error: "Server error during restaurant creation" });
    }
}

// Get all restaurants assigned to a KAM
async function getAllRestaurants(req, res) {
    try {
        // Fetch all restaurants associated with the current KAM
        const restaurants = await Restaurant.find({ assignedKAM: req.kam._id });

        if (!restaurants || restaurants.length === 0) {
            return res.status(404).json({ error: "No restaurants found!" });
        }

        return res.status(200).json(restaurants);
    } catch (error) {
        console.error("Error fetching restaurants:", error.message);
        return res.status(500).json({ error: "Server error during fetching restaurants" });
    }
}

// Update a restaurant's details
async function updateRestaurant(req, res) {
    try {
        // Validate ObjectId
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({ error: "Please provide a valid id!" });
        }

        const { id } = req.params;
        const { name, address, status } = req.body;

        // Find and update the restaurant
        const restaurant = await Restaurant.findByIdAndUpdate(
            id,
            { name, address, status },
            { new: true } // Return the updated document
        );

        if (!restaurant) {
            return res.status(400).json({ error: "Restaurant not updated!" });
        }

        return res.status(200).json({success:"Restaurant updated successfully", restaurant});
    } catch (error) {
        console.error("Error updating restaurant:", error.message);
        return res.status(500).json({ error: "Server error during updating restaurant" });
    }
}

// Delete a restaurant
async function deleteRestaurant(req, res) {
    try {
        // Validate ObjectId
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({ error: "Please provide a valid id!" });
        }

        const { id } = req.params;

        // Find and delete the restaurant
        const restaurant = await Restaurant.findByIdAndDelete(id);

        if (!restaurant) {
            return res.status(400).json({ error: "Restaurant not deleted!" });
        }

        return res.status(200).json({ success: "Restaurant deleted successfully", restaurant });
    } catch (error) {
        console.error("Error deleting restaurant:", error.message);
        return res.status(500).json({ error: "Server error during deleting restaurant" });
    }
}

// Add a contact to a restaurant
async function addContactToRestaurant(req, res) {
    try {
        const { restaurantId, contactId } = req.body;

        // Validate ObjectIds
        if (!mongoose.isValidObjectId(restaurantId) || !mongoose.isValidObjectId(contactId)) {
            return res.status(400).json({ error: "Please provide valid ids!" });
        }

        // Find the restaurant by ID
        const restaurant = await Restaurant.findById(restaurantId);

        if (!restaurant) {
            return res.status(404).json({ error: "Restaurant not found!" });
        }

        // Add the contact ID to the restaurant's contacts array
        restaurant.contacts.push(contactId);
        await restaurant.save();

        return res.status(200).json({ success: "Contact added successfully", restaurant });
    } catch (error) {
        console.error("Error adding contact to restaurant:", error.message);
        return res.status(500).json({ error: "Server error during adding contact" });
    }
}

async function updateAssignedKAM(req,res){
    try{
        const {restaurantId, assignedNewKAM} = req.body
        if(!mongoose.isValidObjectId(restaurantId) || !mongoose.isValidObjectId(assignedNewKAM)){
            return res.status(400).json({error: "Please provide valid ids !!"})
        }
        const restaurant = await Restaurant.findByIdAndUpdate(restaurantId,{
            assignedKAM: assignedNewKAM
        },{new: true})

        if(!restaurant){
             return res.status(400).json({error:"Restaurant not updated!!"})
        }

        return res.status(200).json({success: "Assigned KAM Updated successfully !!",restaurant})
    }
    catch(error){
        console.error("Error updating assigned KAM:", error.message);
        return res.status(500).json({ error: "Server error during updating assigned KAM" });
    }
}

module.exports = {
    createRestaurant,
    getAllRestaurants,
    updateRestaurant,
    deleteRestaurant,
    addContactToRestaurant,
    updateAssignedKAM
};
