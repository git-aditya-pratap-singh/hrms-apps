import LoginForms from "../../components/Forms/LoginForms";
import LoginStructure from "../../validation/FormStructure/LoginStructure";
import validateSchema from "../../validation/validateSchema";

const Login = () => <LoginForms  forms={LoginStructure} schema={validateSchema}/>
export default Login;