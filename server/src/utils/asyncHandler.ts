import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import AlertService from "../helpers/AlertService";

const asyncHandler = (func: (req: Request, res: Response, next: NextFunction, session?: mongoose.ClientSession) => Promise<any>) =>
    async (req: Request, res: Response, next: NextFunction) => {

        const session: mongoose.ClientSession = await mongoose.startSession();
        session.startTransaction();
        
        try {
            await func(req, res, next, session);
            await session.commitTransaction();
        } catch (err) {
            await session.abortTransaction();
            session.endSession();
            return new AlertService().sendServerErrorResponse(res, false, `SERVER_ERROR!! ${err}`);
        } finally {
            session.endSession();
        }
    }

export default asyncHandler;
