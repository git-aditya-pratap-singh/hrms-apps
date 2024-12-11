import express from 'express';
import candidatesRoutes from "./candidate/candidates.routes";
import employeeRoutes from "./employee/employee.routes";

const dashboardRoutes = express.Router();

dashboardRoutes.use('/candidates', candidatesRoutes);
dashboardRoutes.use('/employee', employeeRoutes);

export default dashboardRoutes;