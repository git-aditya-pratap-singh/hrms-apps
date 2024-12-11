import mongoose, { Schema, Document, Model } from 'mongoose';

interface HrRegistration extends Document {
    name: string;
    email: string;
    password: string;
    designation: string;
    status: "Enabled" | "Disabled";
    last_login: Date;
}


const registrationSchema: Schema<HrRegistration> = new Schema({
    name: {
        type: String,
        lowercase: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        trim: true
    },
    designation: {
        type: String,
        trim: true,
        default: "HR"
    },
    status: {
        type: String,
        enum:['Enabled','Disabled'],
        default: 'Enabled'
    },
    last_login: {
        type: Date,
        default: Date.now
    }
});

const hrInfoDB: Model<HrRegistration> = mongoose.model<HrRegistration>("hrInfo", registrationSchema);
export default hrInfoDB;