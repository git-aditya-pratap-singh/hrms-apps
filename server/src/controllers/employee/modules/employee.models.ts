import { Request, Response } from 'express';
import dotenv from "dotenv";
import fs from 'fs';
import uploadOnCloudinary from "../../../utils/cloudinary";
import asyncHandler from '../../../utils/asyncHandler';
import AlertService from '../../../helpers/AlertService';

import employeeDB from '../../../models/employee.schema';

dotenv.config();

class EmployeeControllers extends AlertService{

    public EmployeeFetchData = asyncHandler(async(req: Request, res: Response): Promise<any> =>{
        const response = await employeeDB.find();
        return this.sendSuccessResponse(res, true, "fetch Successfully!", response)
    })


}
export default EmployeeControllers;