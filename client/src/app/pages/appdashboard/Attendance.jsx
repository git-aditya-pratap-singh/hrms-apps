import { useState, useEffect} from 'react';
import Select from 'react-select';
import Table from "../../components/Table";
import EmpTableStructure from "../../utils/EmpTableStructure";
import { useLoaderData } from 'react-router-dom';

import AddNewForms from "../../components/Forms/AddNewForms";
import NewEmployeeStruc from "../../validation/FormStructure/NewEmployeeStruc";
import validateSchema from "../../validation/validateSchema";

import { useDispatch, useSelector } from "react-redux";
import {add_popup} from "../../redux/slices/StateSlices";
import "../../../assets/css/appdashboard/candidates.scss";

const Attendance = ()=>{

    const dispatch = useDispatch();
    const addPopup = useSelector((store) => store.openPopup.add_popup);
    const empList = useLoaderData();

    const [empListArray, setempListArray] = useState(empList);  
    const [filteredEmployee, setFilteredEmployee] = useState(empList);   

    const searchInput = async(event) => {
        const searchValue = event.target.value.toLowerCase();
        const filteredList = empListArray.filter((emp) =>
            emp.name.toLowerCase().includes(searchValue) ||
            emp.email.toLowerCase().includes(searchValue)
        );
        setFilteredEmployee(filteredList);
    };

    useEffect(() => {
        setFilteredEmployee(empListArray); 
    }, [empListArray]);

    return(
        <>
        <section className="_candiateContainer">
            <div className="_sub_candiateContainerA">
                <div className="childConatinerA">
                    <select name="statusLevel"   className="_select">
                                <option value="" >All</option>
                                <option value="New">New</option>
                                <option value="Rejected">Rejected</option>
                                <option value="Ongoing">Ongoing</option>
                                <option value="Selected">Selected</option>
                                <option value="Scheduled">Scheduled</option>
                    </select>
                </div>
                <div className="childContainerB">
                   <input type="search" className="search-input" placeholder="Search here..." onChange={searchInput} />
                </div>
            </div>
            <div className="_sub_candiateContainerB">
                <Table structure={EmpTableStructure} tableData={filteredEmployee} type="employee"/>
            </div>
        </section>

        {
            (addPopup.type === "employee" && (addPopup.add || addPopup.edit))
            && (
                <section className="_divForms">
                    <AddNewForms structure={NewEmployeeStruc} schema={validateSchema} header="Edit Employee"/>
                </section>
            )
        }
        
        </>
    )
}
export default Attendance;