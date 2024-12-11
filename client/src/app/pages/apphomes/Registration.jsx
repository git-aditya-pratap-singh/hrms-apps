import RegistrationForms from "../../components/Forms/RegistrationForms";
import RegisterStructure from "../../validation/FormStructure/RegisterStructure"; 
import validateSchema from "../../validation/validateSchema";

const Registration = () => <RegistrationForms  forms={RegisterStructure} schema={validateSchema} />
export default Registration;