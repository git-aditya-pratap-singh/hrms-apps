import { NextFunction, Request, Response } from 'express';
import session from '../../../types/session';
import jwt, {TokenExpiredError} from "jsonwebtoken";
import dotenv from "dotenv";
import asyncHandler from '../../../utils/asyncHandler';
import AlertService from '../../../helpers/AlertService';
import Password_Encrypt_Decrypt from "../../../helpers/PswdEncrypt";

import hrInfoDB from "../../../models/registration.schema";

dotenv.config();
const AUTH_PASSWORD = new Password_Encrypt_Decrypt();

class AuthControllers extends AlertService{

    public Registration = asyncHandler(async(req: Request, res: Response): Promise<any> =>{

        const {name, email, password, confirmPassword} = req.body;
        const userCheck = await this.GetuserByEmail(email.toLowerCase());
        if(userCheck)
            return this.sendErrorResponse(res, false, "This User is already Registered !!");

        const pswdEncrypted: any = await AUTH_PASSWORD.passwordEncrypt(password);
        const newHR = new hrInfoDB({
            name: name,
            email: email,
            password: pswdEncrypted,
        });

        await newHR.save()
        .then(saveData =>{
            return this.sendSuccessResponse(res, true, "Credentials Added Successfully!!");
        })
        .catch(err =>{
            return this.sendErrorResponse(res, false, "Credentials hasn't Added!!");
        })
    })

    public Login = asyncHandler(async(req: Request, res: Response ): Promise<any> =>{
        const {email, pswd} = req.body;

        const userValid = await this.GetuserByEmail(email.toLowerCase());
        if(!userValid)
            return this.sendErrorResponse(res, false, "User not found !!");
        if(userValid.status !== 'Enabled')
            return this.sendErrorResponse(res, false, "User account not Activated !!");

        const pswdMatch: boolean = await AUTH_PASSWORD.passwordDecrypt(pswd, userValid.password);
        if (!pswdMatch) 
            return this.sendErrorResponse(res, false, "Invalid Password !!");

        const token: string = await this.createJWTToken(userValid);
        const UserInfo = {
            name: userValid.name,
            email: userValid.email,
            designation: userValid.designation,
        }
        req.session.token = token;
        return this.sendSuccessResponse(res, true, "You have successfully logged in !!", UserInfo);
    });

    public Logout = asyncHandler(async(req: Request, res: Response): Promise<any> =>{
        req.session.destroy((err) => {
            if (err) {
                return this.sendErrorResponse(res, false, 'Failed to Logged out!!')
            }
            return this.sendSuccessResponse(res, true, "Logged Out !!");
        })
    })

    public SessionTokens = asyncHandler(async(req: Request, res: Response): Promise<any> =>{
        if (req.session.token) {
            return this.sendSuccessResponse(res, true, "GetToken", { user: req.session.token });
        } else {
            return this.sendErrorResponse(res, false, "Not authenticated!!");
        }
    })

    private GetuserByEmail = async(userEmail: string): Promise<any>=>{
        const userMatch: any | null = await hrInfoDB.findOne({email: userEmail},
            {_id: 1, name: 1, designation: 1, status: 1, email: 1, password: 1}
        );
        return userMatch;
    };

    private createJWTToken = async(userValid: any, key?: string): Promise<string> =>{
        const payload: any = {
            _id: userValid._id,
            name: userValid.name,
            email: userValid.email,
            designation: userValid.designation,
            status: userValid.status
        }
        const token: string = jwt.sign(
            payload,
            process.env.TOKEN_SECRET_KEY as string,
            {
                expiresIn: process.env.TOKEN_EXPIRY_TIME,
            }
        );
        return token;
    }

}
export default AuthControllers;