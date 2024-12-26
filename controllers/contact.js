const Contact = require("../models/contact");
const { contactValidation } = require("./validation");

// Create a new contact
async function createContact(req, res) {
    try {
        // Validate request body
        const { error, value } = contactValidation.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.message });
        }

        // Destructure validated fields from the request
        const { name, role, phone } = value;

        // Create and save a new contact
        let contact = new Contact({ name, role, phone });
        contact = await contact.save();

        // Check if the contact was successfully saved
        if (!contact) {
            return res.status(400).json({ error: "Contact not created!" });
        }

        // Return the created contact
        return res.status(201).json({success:"Contact created successfully", contact});
    } catch (error) {
        // Log and return server error
        console.error("Error creating contact:", error.message);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = {
    createContact,
};
