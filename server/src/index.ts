import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';
import dotenv from "dotenv";
import session from 'express-session';
import DatabaseConnection from './config/dbConfig';
import authRouter from './routes/auth.routes';

dotenv.config();
const app = express();

const apiUrl = process.env.HOST + ':' + process.env.PORT;

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "3mb"}))

app.use(bodyParser.json());

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    allowedHeaders: ['Content-Type', 'Authorization'],
    methods: 'HEAD,GET,POST,PUT,PATCH,DELETE',
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204, 
}))

app.use(
    session({
      secret: 'ABHSBH43473434778@#*(*(*JHUHUDU', 
      resave: false,
      saveUninitialized: true,
      cookie: {
        maxAge:  1000 * 60 * 60 * 2, // 2hr
        httpOnly: true,
      },
    })
)

// callig Database connection
new DatabaseConnection().connectToMongoDB()

app.use('/api/v1', authRouter)

const PORT: string = process.env.PORT || '5000';

app.listen(PORT, ():void => {
    const msg = '🎉 Server started at ' + apiUrl
    console.log(String('*').padEnd(msg.length + 20, '*'))
    console.log('*' + String('').padEnd(msg.length + 18, ' ') + '*')
    console.log(`*${String('').padEnd(9, ' ')}${msg}${String('').padEnd(9, ' ')}*`)
    console.log('*' + String('').padEnd(msg.length + 18, ' ') + '*')
    console.log(String('*').padEnd(msg.length + 20, '*'))
})