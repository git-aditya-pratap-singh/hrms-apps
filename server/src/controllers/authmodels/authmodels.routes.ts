import express from 'express';
import AuthControllers from './modules/auth.models';

const loginRoutes = express.Router();
const LOGIN_INSTANCE = new AuthControllers();

loginRoutes.post('/registration', LOGIN_INSTANCE.Registration); 
loginRoutes.post('/login', LOGIN_INSTANCE.Login); 
loginRoutes.get('/sessionToken', LOGIN_INSTANCE.SessionTokens);
loginRoutes.post('/logout', LOGIN_INSTANCE.Logout);  


export default loginRoutes;