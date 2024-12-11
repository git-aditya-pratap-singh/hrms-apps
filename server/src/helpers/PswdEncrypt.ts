import bcrypt from "bcrypt";
import AlertService from './AlertService';

class Password_Encrypt_Decrypt extends AlertService{

    public passwordEncrypt = async(password: string): Promise<string>=>{
        const setRounds: number = 10;
        const hashedPassword: string = await bcrypt.hash(password, setRounds);
        return hashedPassword;
    }

    public passwordDecrypt = async(password: string, hashedPassword: string): Promise<boolean>=>{
        return bcrypt.compare(password, hashedPassword);  
    }
}
export default Password_Encrypt_Decrypt;