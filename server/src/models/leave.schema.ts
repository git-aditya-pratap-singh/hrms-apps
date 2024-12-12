import mongoose, { Schema, Document, Model } from 'mongoose';

interface ILeaves extends Document {
    name: string;
    designation: string;
    leaveDate: Date;
    reason: string;
    status: 'Approved' | 'Rejected' | 'Pending';
    docs: string;
}

const leaveSchema: Schema<ILeaves> = new Schema({
    name: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    designation: {
        type: String,
        required: true,
        trim: true
    },
    leaveDate: {
        type: Date,
        default: Date.now()
    },
    reason: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        enum:['Approved', 'Rejected', 'Pending'],
        default: 'Pending'
    },
    docs:{
        type: String,
        required: true,
    }

});

const leaveDB: Model<ILeaves> = mongoose.model<ILeaves>("leave", leaveSchema);
export default leaveDB;