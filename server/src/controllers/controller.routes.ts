import express from 'express';
import candidatesRoutes from "./candidate/candidates.routes";
import employeeRoutes from "./employee/employee.routes";
import attendanceRoutes from "./attendance/attendance.routes";

const dashboardRoutes = express.Router();

dashboardRoutes.use('/candidates', candidatesRoutes);
dashboardRoutes.use('/employee', employeeRoutes);
dashboardRoutes.use('/attendance', attendanceRoutes);

export default dashboardRoutes;