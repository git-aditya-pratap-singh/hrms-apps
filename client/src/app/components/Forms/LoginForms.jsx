import { NavLink } from "react-router";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

import Apiauth from "../../_api/auth/Apiauth.service";
import InputField from "../FormComponents/InputField";
import validateForm from "../../validation/validate";

import "../../../assets/css/home/registration.scss";

const LoginForms = ({forms, schema})=>{

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

    const apiResponse = await new Apiauth().login(objFormData);
      if (apiResponse.status) {
          navigate("/dashboard/candidates");
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
            <button>Login</button>
          </form>
          <span>Forgot Password?</span>

          <div className="_loginUrl">
            <label>Don't have a account? <span><NavLink to="/">Register</NavLink></span></label>
          </div>

        </section>
    )
}
export default LoginForms;