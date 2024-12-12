import mongoose, { Schema, Document, Model } from 'mongoose';

interface IAttendance extends Document {
    email: string;
    task: string;
    status: 'Attendance' | 'Present' | 'Absent' | 'Medical Leave' | 'Work from Home';
    date: Date;
}

const attendanceSchema: Schema<IAttendance> = new Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    task: {
        type: String,
        trim: true
    },
    status:{
        type: String,
        enum:['Attendance','Present','Absent','Medical Leave','Work from Home'],
        default: 'Attendance'
    },
    date: {
        type: Date,
        default: Date.now(),
        trim: true
    },

});

const attendanceDB: Model<IAttendance> = mongoose.model<IAttendance>("attendance", attendanceSchema);
export default attendanceDB;