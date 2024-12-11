import express from 'express';
import loginRoutes from "../controllers/authmodels/authmodels.routes";
import dashboardRoutes from "../controllers/controller.routes";
import UserAuthentication from '../middlewares/auth.middleware';

const AUTH_VERIFICATION = new UserAuthentication();
const authRouter = express.Router();

authRouter.use('/dashboard', AUTH_VERIFICATION.verifyToken, dashboardRoutes);
authRouter.use('/auth-registration', loginRoutes);
authRouter.use('/auth-login', loginRoutes);

export default authRouter;