import { NavLink } from "react-router";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Apiauth from "../../_api/auth/Apiauth.service";

import InputField from "../FormComponents/InputField";
import validateForm from "../../validation/validate";

import "../../../assets/css/home/registration.scss";

const RegistrationForms = ({forms, schema})=>{

  const navigate = useNavigate();

  const handleValidate = (form, schema)=>{
    const errors = validateForm(form, schema)                            
    if(errors != {}) return Object.entries(errors)[0]; 
    return;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target)
    const objFormData = Object.fromEntries(formData);
    const haveErrors = handleValidate(objFormData, schema);
    if (haveErrors) return toast.error(Object.values(haveErrors)[1]);
    //---API calling
    const apiResponse = await new Apiauth().Registration(objFormData);
    if (apiResponse.status) {
      navigate("/login");
    }
  }


    return(
        <section className="_registerSection">
            <h2>Welcome to Dashboard</h2>

            <form className="_forms" onSubmit={handleSubmit}>
            {forms.map((items, index)=>{
              return(
                <InputField
                  key={index}
                  type={items.type}
                  name={items.name}
                  placeholder={items.placeholder}
                  autoComplete={items.autoComplete}
                />
              )
            })}
            <button>Register</button>
          </form>

          <div className="_loginUrl">
            <label>Already have a account? <span><NavLink to="/login">Login</NavLink></span></label>
          </div>

        </section>
    )
}
export default RegistrationForms;