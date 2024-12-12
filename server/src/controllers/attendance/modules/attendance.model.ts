import { Request, Response } from 'express';
import dotenv from "dotenv";
import mongoose, { PipelineStage } from 'mongoose';
import asyncHandler from '../../../utils/asyncHandler';
import AlertService from '../../../helpers/AlertService';

import attendanceDB from '../../../models/attendance.schema';

dotenv.config();

class AttendanceControllers extends AlertService{

    public AttendanceFetchData = asyncHandler(async(req: Request, res: Response): Promise<any> =>{
        const attendanceList: PipelineStage[] = [
          {
            '$lookup': {
              'from': 'employees', 
              'localField': 'email', 
              'foreignField': 'email', 
              'as': 'result', 
              'pipeline': [
                {
                  '$project': {
                    '_id': 1, 
                    'name': 1, 
                    'department': 1
                  }
                }
              ]
            }
          }, {
            '$unwind': {
              'path': '$result'
            }
          }
        ]
        const response = await attendanceDB.aggregate(attendanceList);
        return this.sendSuccessResponse(res, true, "fetch Successfully!", response)
    })

    public AttendanceEdit = asyncHandler(async(req: Request, res: Response): Promise<any> =>{
      const updateData = await attendanceDB.updateOne(
          {email: req.body.email},
          {$set: {
              status: req.body.status
          }},
          {new: true}
      );
      return updateData
          ? this.sendSuccessResponse(res, true, `Attandance Marked !!`)
          : this.sendErrorResponse(res, false, `Failed to update status !!`);
  })



}
export default AttendanceControllers;