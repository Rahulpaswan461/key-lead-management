const mongoose = require("mongoose");
const Interaction = require("../models/interaction");
const Restaurant = require("../models/restaurant");
const { interactionValidation } = require("./validation");

// Create a new interaction for a restaurant
async function createInteraction(req, res) {
    try {
        // Validate the request body
        const { error, value } = interactionValidation.validate(req.body);
        if (error) return res.status(400).json({ error: error.message });

        const { restaurant, interactionType, notes } = value;

        // Save interaction to the database
        const interaction = await Interaction.create({
            restaurant,
            interactionDate: Date.now(),
            interactionType,
            notes,
        });

        return res.status(201).json({success:"Interaction created successfully", interaction});
    } catch (err) {
        console.error("Error creating interaction:", err.message);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

// Fetch all interactions for a specific restaurant by its ID
async function getInteractionByRestaurantId(req, res) {
    try {
        const { restaurantId } = req.params;

        // Validate restaurant ID
        if (!mongoose.isValidObjectId(restaurantId)) {
            return res.status(400).json({ error: "Invalid Restaurant ID" });
        }

        // Find interactions associated with the restaurant
        const interactions = await Interaction.find({ restaurant: restaurantId });

        // Return error if no interactions are found
        if (!interactions.length) {
            return res.status(404).json({ error: "No interactions found" });
        }

        return res.status(200).json({success: "Interactions fetched successfully", interactions});
    } catch (err) {
        console.error("Error fetching interactions:", err.message);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

// Update the call frequency of a specific restaurant
async function setCallFrequency(req, res) {
    try {
        const { restaurantId, callFrequency } = req.body;

        // Validate restaurant ID
        if (!mongoose.isValidObjectId(restaurantId)) {
            return res.status(400).json({ error: "Invalid Restaurant ID" });
        }

        // Update restaurant's call frequency
        const restaurant = await Restaurant.findByIdAndUpdate(
            restaurantId,
            { callFrequency },
            { new: true }
        );

        if (!restaurant) {
            return res.status(404).json({ error: "Restaurant not found" });
        }

        return res.status(200).json(restaurant);
    } catch (err) {
        console.error("Error updating call frequency:", err.message);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

// Get restaurants requiring calls today
async function requiringCallToday(req, res) {
    try {
        const today = new Date();

        // Find restaurants that need a call (based on the last call date)
        const restaurants = await Restaurant.find({
            $or: [
                { lastCalled: { $exists: false } },
                { lastCalled: { $lte: new Date(today.setDate(today.getDate() - 7)) } },
            ],
        });

        return res.status(200).json(restaurants);
    } catch (err) {
        console.error("Error fetching restaurants:", err.message);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

// Update the last call date for a restaurant
async function updateLastCall(req, res) {
    try {
        const { restaurantId } = req.params;

        // Validate restaurant ID
        if (!mongoose.isValidObjectId(restaurantId)) {
            return res.status(400).json({ error: "Invalid Restaurant ID" });
        }

        // Update the lastCalled field
        const restaurant = await Restaurant.findByIdAndUpdate(
            restaurantId,
            { lastCalled: Date.now() },
            { new: true }
        );

        if (!restaurant) {
            return res.status(404).json({ error: "Restaurant not found" });
        }

        return res.status(200).json(restaurant);
    } catch (err) {
        console.error("Error updating last call:", err.message);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

// Fetch well-performing accounts based on orders in the last month
async function wellPerformingAccounts(req, res) {
    try {
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

        // Find restaurants with "order" interactions in the last month
        const restaurants = await Restaurant.find({
            _id: {
                $in: await Interaction.distinct("restaurant", {
                    type: "order",
                    date: { $gte: oneMonthAgo },
                }),
            },
        });

        return res.status(200).json({ wellPerformingRestaurants: restaurants });
    } catch (err) {
        console.error("Error fetching well-performing accounts:", err.message);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

// Fetch underperforming accounts without recent interactions
async function underPerformingAccounts(req, res) {
    try {
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

        // Get all restaurants and those with recent interactions
        const allRestaurants = await Restaurant.distinct("_id");
        const activeRestaurantIds = await Interaction.distinct("restaurant", {
            date: { $gte: oneMonthAgo },
        });

        // Find restaurants without recent activity
        const underPerformingIds = allRestaurants.filter(
            (id) => !activeRestaurantIds.includes(id.toString())
        );

        const underPerformingRestaurants = await Restaurant.find({
            _id: { $in: underPerformingIds },
        });

        return res.status(200).json(underPerformingRestaurants);
    } catch (err) {
        console.error("Error fetching underperforming accounts:", err.message);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

// Get order patterns grouped by restaurants
async function orderPattern(req, res) {
    try {
        const pattern = await Interaction.aggregate([
            { $match: { type: "Order" } }, // Match interactions of type "Order"
            { $group: { _id: "$restaurant", orderCount: { $sum: 1 } } }, // Group by restaurant and count orders
            { $sort: { orderCount: -1 } }, // Sort by order count in descending order
        ]);

        return res.status(200).json(pattern);
    } catch (err) {
        console.error("Error fetching order patterns:", err.message);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = {
    createInteraction,
    getInteractionByRestaurantId,
    setCallFrequency,
    requiringCallToday,
    updateLastCall,
    wellPerformingAccounts,
    underPerformingAccounts,
    orderPattern,
};
