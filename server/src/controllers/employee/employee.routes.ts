import express from 'express';
import EmployeeControllers from "./modules/employee.models";
import upload from '../../middlewares/multer.middleware';

const employeeRoutes = express.Router();
const EMPLOYEE_INSTANCE = new EmployeeControllers();

employeeRoutes.get('/fetchData', EMPLOYEE_INSTANCE.EmployeeFetchData);
//candidatesRoutes.put('/edit', EMPLOYEE_INSTANCE.EditCandidates);

export default employeeRoutes;