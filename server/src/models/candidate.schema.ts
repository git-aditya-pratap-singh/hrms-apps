import mongoose, { Schema, Document, Model } from 'mongoose';

interface Icandidates extends Document {
    name: string;
    email: string;
    phone: string;
    department: string;
    experience: number;
    status: 'New'| 'Rejected'| 'Ongoing' | 'Selected' | 'Scheduled';
    resume: string;
}

const candidateSchema: Schema<Icandidates> = new Schema({
    name: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    department: {
        type: String,
        required: true,
        trim: true
    },
    experience: {
        type: Number,
        required: true,
        trim: true
    },
    status:{
        type: String,
        enum:['New','Rejected','Ongoing','Selected','Scheduled'],
        default: 'New'
    },
    resume: {
        type: String,
        trim: true
    },

});

const candidatesDB: Model<Icandidates> = mongoose.model<Icandidates>("candidate", candidateSchema);
export default candidatesDB;