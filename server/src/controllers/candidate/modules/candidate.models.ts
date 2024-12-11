import { Request, Response } from 'express';
import dotenv from "dotenv";
import fs from 'fs';
import uploadOnCloudinary from "../../../utils/cloudinary";
import asyncHandler from '../../../utils/asyncHandler';
import AlertService from '../../../helpers/AlertService';

import candidatesDB from "../../../models/candidate.schema";
import employeeDB from '../../../models/employee.schema';

dotenv.config();

class CandidatesControllers extends AlertService{

    public CandidateFetchData = asyncHandler(async(req: Request, res: Response): Promise<any> =>{
        const response = await candidatesDB.find();
        return this.sendSuccessResponse(res, true, "fetch Successfully!", response)
    })

    public CandidateDelete = asyncHandler(async(req: Request, res: Response): Promise<any> =>{
        const responseA = await candidatesDB.deleteOne({ email:  req.body.Email });
        const responseB = await candidatesDB.find();
        return this.sendSuccessResponse(res, true, "Deleted Successfully!", responseB)
    })

    public EditCandidates = asyncHandler(async(req: Request, res: Response): Promise<any> =>{
        const updateData = await candidatesDB.updateOne(
            {email: req.body.email},
            {$set: {
                status: req.body.status
            }},
            {new: true}
        );
        return updateData
            ? this.sendSuccessResponse(res, true, `Status Updated !!`)
            : this.sendErrorResponse(res, false, `Failed to update status !!`);
    })

    public AddCandidates = asyncHandler(async(req: Request, res: Response): Promise<any> =>{

        const files = req.files as {
            [fieldname: string]: Express.Multer.File[];
        };

        if (!req.files || !files.pdfFile)
            return this.sendErrorResponse(res, false, "files are required !!")  
        const pdfPath = files.pdfFile ? files.pdfFile[0]?.path : null;

        try{
            const cloudinaryPaths = await Promise.all([pdfPath].map(async (path: string | null) => {
                if (!path) return null;
                const cloudinaryFile = await uploadOnCloudinary(path);
                if (!cloudinaryFile)
                    return this.sendErrorResponse(res, false, "File hasn't uploaded on Cloudinary!!");
                fs.unlinkSync(path); // Remove the file after uploading
                return cloudinaryFile?.url;
            }));


            const {name, email, phone, department, experience} = req.body;

            if(!await this.IsEmailExists(email, res))
                return this.sendErrorResponse(res, false, "Email is already Exists!!")

            const newCandidate = new candidatesDB({
                name: name,
                email: email,
                phone: phone,
                department: department,
                experience: experience,
                resume: cloudinaryPaths[0]
            });
            await newCandidate.save();
            return this.sendSuccessResponse(res, true, "Candidate Added Successfully!!");

        }catch(err){
            return this.sendErrorResponse(res, false, "Error uploading files.");
        }
    })
    
    public AddEmployee = asyncHandler(async (req: Request, res: Response): Promise<any> => {
        const { data, status } = req.body;
      
        try {
          if (!data?.name || !data?.email || !data?.phone || !data?.department) {
            return this.sendErrorResponse(res, false, "All fields are required");
          }
      
          // Check for duplicate email
          const existingEmployee = await employeeDB.findOne({ email: data.email });
          if (existingEmployee) {
            return this.sendErrorResponse(res, false, "Employee with this email already exists");
          }
          // Create new employee
          const newEmployee = new employeeDB({
            name: data.name,
            email: data.email,
            phone: data.phone,
            department: data.department,
          });
          await newEmployee.save();
          return this.sendSuccessResponse(res, true, "Employee joined our team!", newEmployee);
        } catch (error) {
          return this.sendErrorResponse(res, false, "An error occurred while adding the employee");
        }
      });



    private IsEmailExists = async(Emails: string, res: Response): Promise<any>=>{
        try{
            const IsExists = await candidatesDB.find({
                email: {$eq: Emails.toLowerCase()}
            })
            return IsExists;
        }catch(err){
            return this.sendServerErrorResponse(res, false, `SERVER_ERROR!!${err}`)
        }
    }

}
export default CandidatesControllers;