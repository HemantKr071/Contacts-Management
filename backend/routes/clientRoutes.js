import express from "express";
import mongoose from "mongoose";
import Client from '../models/clients.js';
const router = express.Router();

// Create a New Entry
router.post('/contacts',async (req,res) => {
    try {
        const newClient = await Client.create(req.body);
        res.status(201).json({ 
            message: "Client created successfully",
            client: newClient 
        });
    
    } catch (err) {
        console.error("Error creating client:", err);
        res.status(500).json({ error: "Failed to create client" });
    }
});


// Get all Clients from DB 
router.get('/contacts',async (req,res) => {
    try{
        const allClients = await Client.find({});
        res.status(200).json(allClients);
    }
    catch(err){
        console.error("Error getting clients:", err);
        res.status(500).json({ error: "Failed to get clients" });

    }

})

// Update client Details
router.put('/contacts/:id', async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;

    try {
        // Find the contact by ID and update it with the new data
        const updatedContact = await Client.findByIdAndUpdate(id, updatedData, { new: true });

        if (!updatedContact) {
            return res.status(404).json({ message: 'Contact not found' });
        }

        res.status(200).json(updatedContact); 
    } catch (error) {
        res.status(500).json({ message: 'Error updating contact', error });
    }
});


// Delete Client
router.delete("/contacts/:id",async (req,res) => {
    try{
        // Find the contact by ID and delete
        await Client.findByIdAndDelete(
            req.params.id
        );
        res.status(200).json({ 
            message: "Client deleted successfully",
        });
       

    }catch(err){
        console.error("Error deleting client:", err);
        res.status(500).json({ error: "Failed to delete client" });
    }
})

export default router;
