import express from 'express';
import AttendanceControllers from "./modules/attendance.model";

const attendanceRoutes = express.Router();
const ATTENDANCE_INSTANCE = new AttendanceControllers();

attendanceRoutes.get('/fetchData', ATTENDANCE_INSTANCE.AttendanceFetchData);
attendanceRoutes.put('/edit', ATTENDANCE_INSTANCE.AttendanceEdit);

export default attendanceRoutes; 