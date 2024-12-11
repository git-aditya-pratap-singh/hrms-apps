import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

class DatabaseConnection {
    
    public connectToMongoDB = async(): Promise<mongoose.Connection> => {
        try{
            const connectionInstance = await mongoose.connect(process.env.MONGO_URL as string);

            const msg = `📥 MongoDB connected !! DB HOST: ${connectionInstance.connection.port}`
            console.log(String('*').padEnd(msg.length + 24, '*'))
            console.log('*' + String('').padEnd(msg.length + 22, ' ') + '*')
            console.log(`*${String('').padEnd(11, ' ')}${msg}${String('').padEnd(11, ' ')}*`)
            console.log('*' + String('').padEnd(msg.length + 22, ' ') + '*')
            console.log(String('*').padEnd(msg.length + 24, '*'))

            return connectionInstance.connection;
        }catch(err){
            console.error(`Failed to connect to database! ${err}`);
            process.exit(1);
        }
    }
}

export default DatabaseConnection;
