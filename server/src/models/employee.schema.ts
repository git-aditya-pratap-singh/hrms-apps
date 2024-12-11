import mongoose, { Schema, Document, Model } from 'mongoose';

interface IEmployee extends Document {
    name: string;
    email: string;
    phone: string;
    position: string;
    department: string;
    status: 'New'| 'Rejected'| 'Ongoing' | 'Selected' | 'Scheduled';
    DOJ: Date;
}

const employeeSchema: Schema<IEmployee> = new Schema({
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
    position: {
        type: String,
        trim: true
    },
    department: {
        type: String,
        required: true,
        trim: true
    },
    status:{
        type: String,
        enum:['New','Rejected','Ongoing','Selected','Scheduled']
    },
    DOJ: {
        type: Date,
        default: Date.now()
    },

});

const employeeDB: Model<IEmployee> = mongoose.model<IEmployee>("employee", employeeSchema);
export default employeeDB;