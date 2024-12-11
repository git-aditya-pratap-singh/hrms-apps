import InputField from "../FormComponents/InputField";
import { toast } from "react-toastify";
import IconComponent from "../../../assets/icons/IconComponent";
import validateForm from "../../validation/validate";
import { useDispatch, useSelector } from "react-redux";
import {add_popup} from "../../redux/slices/StateSlices";
import ApplicationApi from "../../_api/application/ApplicationApi.service";

import "../../../assets/css/components/newforms.scss";

const AddNewForms = ({structure, schema, header})=>{

    const dispatch = useDispatch();
    const addPopup = useSelector((store) => store.openPopup.add_popup);

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
        // Api Calling
        const apiResponse = await new ApplicationApi().AddCandidates(objFormData);
        if (apiResponse.status) {
            if(addPopup.add === true){
                dispatch(add_popup({ status: false, key: "add", role:'' }));
            }
            if(addPopup.edit === true){
                dispatch(add_popup({ status: false, key: "edit", role:'' }));
            }
        }
    }

    return(
        <section className="_formContainer">
            <div className="_first">
                <label>{header}</label>
                <span onClick={()=>{
                    if(addPopup.add === true){
                        dispatch(add_popup({ status: false, key: "add", role:'' }));
                    }
                    if(addPopup.edit === true){
                        dispatch(add_popup({ status: false, key: "edit", role:'' }));
                    }
                }}><IconComponent iconType="crossIcon"/></span>
            </div>
            <div className="_second">
                <form className="_forms" onSubmit={handleSubmit}>
                    <div className="formsItem">
                    {structure.map((items, index)=>{
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
                    </div>
                    <span>
                        <input type="checkbox"/>
                        <label>I hereby declare are that the above information is true to the best of my knowledge and belief.</label>
                    </span>
                    <button>Save</button>
                </form>
            </div>
        </section>
    )
}
export default AddNewForms;