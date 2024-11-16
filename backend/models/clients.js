import mongoose from 'mongoose';

const ClientSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.']
    },
    phoneNumber: {
        type: String,
        required: true,
        match: [/^\d{10}$/, 'Please use a valid 10-digit phone number.']
    },
    company: {
        type: String,
        required: true
    },
    jobTitle: {
        type: String,
        required: true
    }
}, { timestamps: true });

export default mongoose.model('Client', ClientSchema);
