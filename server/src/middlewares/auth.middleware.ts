import { Request, Response, NextFunction } from 'express';
import express from '../types/express';
import jwt, { TokenExpiredError } from "jsonwebtoken";
import dotenv from 'dotenv';
import AlertService from '../helpers/AlertService';
import asyncHandler from '../utils/asyncHandler';

dotenv.config();
const ALERT_SERVICE = new AlertService();

class UserAuthentication {

    public verifyToken = asyncHandler( async(req: Request, res: Response, next: NextFunction): Promise<any>=>{
        const token: string | undefined = req.session.token;

        if(!token)
            return ALERT_SERVICE.sendErrorResponse(res, false, 'Unauthorized HTTP, Token not provided!');
        
        jwt.verify(token, process.env.TOKEN_SECRET_KEY as string,(err, decode)=>{
           if(err){
            return (err instanceof TokenExpiredError) 
             ? 
             //ALERT_SERVICE.sendErrorResponse(res, false, 'Token expired, please log in again!')
            (req.session.destroy((err) => {
                if (err) {
                    ALERT_SERVICE.sendErrorResponse(res, false, 'Token expired, please log in again!')
                }
              }))
            : ALERT_SERVICE.sendErrorResponse(res, false, 'Authentication failed!');
           }
           else{
            req.user = decode;
            next();
           }
        })
    })
}

export default UserAuthentication;