import contactModel from "../Models/contact_model.js";

export const SubmitContact = async (req, res) => {
    try {
        const { name, email, phone = "", message } = req.body || {};

        if (
            typeof name !== "string" ||
            typeof email !== "string" ||
            typeof phone !== "string" ||
            typeof message !== "string" ||
            !name.trim() ||
            !email.trim() ||
            !message.trim()
        ) {
            return res.status(400).json({
                success: false,
                message: "Name, email and message are required"
            });
        }

        if (
            name.trim().length > 100 ||
            email.trim().length > 254 ||
            phone.trim().length > 30 ||
            message.trim().length > 2000 ||
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
        ) {
            return res.status(400).json({
                success: false,
                message: "Please provide valid contact details and a message"
            });
        }

        const contact = await contactModel.create({
            name: name.trim(),
            email: email.trim().toLowerCase(),
            phone: phone.trim(),
            message: message.trim()
        });

        return res.status(201).json({
            success: true,
            message: "Contact message submitted successfully",
            contact
        });
    } catch (error) {
        console.error("Contact message submission failed:", error);
        return res.status(500).json({
            success: false,
            message: "Unable to submit your message"
        });
    }
};

export const ViewContact = async (req, res) => {
    try {
        const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
        const limit = Math.min(Math.max(parseInt(req.query.limit, 10) || 10, 1), 50);
        const skip = (page - 1) * limit;

        const [contacts, totalContacts] = await Promise.all([
            contactModel.find().sort({ createdAt: -1 }).skip(skip).limit(limit),
            contactModel.countDocuments()
        ]);

        return res.status(200).json({
            success: true,
            allcontact: contacts,
            currentpage: page,
            totalcontact: totalContacts,
            totalpages: Math.ceil(totalContacts / limit) || 1,
            limit
        });
    } catch (error) {
        console.error("Contact messages could not be loaded:", error);
        return res.status(500).json({
            success: false,
            message: "Unable to load contact messages"
        });
    }
};

export const DeleteContact = async (req, res) => {
    try {
        const deletedContact = await contactModel.findByIdAndDelete(req.params.id);

        if (!deletedContact) {
            return res.status(404).json({
                success: false,
                message: "Contact message not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Contact message deleted successfully"
        });
    } catch (error) {
        console.error("Contact message could not be deleted:", error);
        return res.status(500).json({
            success: false,
            message: "Unable to delete contact message"
        });
    }
};
