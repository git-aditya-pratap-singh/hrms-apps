import { Response } from 'express';

class AlertService {
    
    public sendSuccessResponseToken(res: Response, status: boolean, message: string, data?: any): void{
        res.cookie('token', data.token, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict'
        });
        res.status(200).json({
            statusCode: 200,
            status: status,
            message: message,
            data: data
       })
    }
    public sendSuccessResponse(res: Response, status: boolean, message: string, data?: any): void{
        res.status(200).json({
            statusCode: 200,
            status: status,
            message: message,
            data: data
       })
    }
    public sendErrorResponse(res: Response, status: boolean, message: string): void{
        res.status(201).json({
            statusCode: 201,
            status: status,
            message: message,
        })
    }
    public sendServerErrorResponse(res: Response, status: boolean, message: string): void{
        res.status(500).json({
            statusCode: 500,
            status: status,
            message: message
        })
    }
}
export default AlertService;
