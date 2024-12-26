const KAMSchema = require("../models/KAM");
const { userValidation } = require("./validation"); // Validation schema for user input

// Handler for signing up a new user
async function signupUser(req, res) {
    try {
        // Validate user input using Joi schema
        const { error, value } = userValidation.validate(req.body);

        // If validation fails, return a 400 error with the validation message
        if (error) {
            return res.status(400).json({ error: error.message });
        }

        // Destructure validated fields from the validated input
        const { name, email, password } = value;

        // Create a new user instance
        let user = new KAMSchema({ name, email, password });

        // Save the user in the database
        user = await user.save();

        // Check if user creation was successful
        if (!user) {
            return res.status(400).json({ error: "User not created!!" });
        }

        // Return the created user
        return res.status(201).json({success:"User created successfully", user});
    } catch (error) {
        console.error("Error during signup:", error.message);
        return res.status(500).json({ error: "Server error during signup" });
    }
}

// Handler for logging in an existing user
async function loginUser(req, res) {
    try {
        const { email, password } = req.body;

        // Validate required fields
        if (!email || !password) {
            return res.status(400).json({ msg: "Incomplete information!" });
        }

        // Validate credentials and generate token
        const token = await KAMSchema.matchPasswordAndGenerateToken(email, password);

        // If no token is returned, credentials are invalid
        if (!token) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }

        // Send token as an HTTP-only cookie for secure storage
        return res
            .cookie("token", token, { httpOnly: true })
            .status(200)
            .json({ success: "User logged in successfully!" });
    } catch (error) {
        console.error("Error during login:", error.message);
        return res.status(500).json({ msg: "Server error during login" });
    }
}

module.exports = {
    signupUser,
    loginUser,
};
