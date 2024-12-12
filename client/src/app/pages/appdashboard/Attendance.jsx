import { useState, useEffect} from 'react';
import Select from 'react-select';
import Table from "../../components/Table";
import AttendanceTableStructure from "../../utils/AttendanceTableStructure";
import { useLoaderData } from 'react-router-dom';

import AddNewForms from "../../components/Forms/AddNewForms";
import NewEmployeeStruc from "../../validation/FormStructure/NewEmployeeStruc";
import validateSchema from "../../validation/validateSchema";

import { useDispatch, useSelector } from "react-redux";
import {add_popup} from "../../redux/slices/StateSlices";
import "../../../assets/css/appdashboard/candidates.scss";

const Attendance = ()=>{

    // const dispatch = useDispatch();
    // const addPopup = useSelector((store) => store.openPopup.add_popup);
    const attendanceList = useLoaderData();
    console.log(attendanceList)

    const [attendanceListArray, setattendanceListArray] = useState(attendanceList);  
    const [filteredAttendance, setFilteredAttendance] = useState(attendanceList);   

    const searchInput = async(event) => {
        console.log("VVV")
        const searchValue = event.target.value.toLowerCase();
        const filteredList = attendanceListArray.filter((item) =>
            item.result.name.toLowerCase().includes(searchValue) ||
            item.status.toLowerCase().includes(searchValue)
        );
        setFilteredAttendance(filteredList);
    };

    useEffect(() => {
        setFilteredAttendance(attendanceListArray); 
    }, [attendanceListArray]);

    return(
        <>
        <section className="_candiateContainer">
            <div className="_sub_candiateContainerA">
                <div className="childConatinerA">
                    <select name="statusLevel" className="_select" onChange={searchInput}>
                                <option value="" >Select Attendance</option>
                                <option value="Present">Present</option>
                                <option value="Absent">Absent</option>
                                <option value="Medical Leave">Medical Leave</option>
                                <option value="Work from Home">Work from Home</option>
                    </select>
                </div>
                <div className="childContainerB">
                   <input type="search" className="search-input" placeholder="Search here..." onChange={searchInput}/>
                </div>
            </div>
            <div className="_sub_candiateContainerB">
                <Table structure={AttendanceTableStructure} tableData={filteredAttendance} type="attendance"/>
            </div>
        </section>

        {/* {
            (addPopup.type === "employee" && (addPopup.add || addPopup.edit))
            && (
                <section className="_divForms">
                    <AddNewForms structure={NewEmployeeStruc} schema={validateSchema} header="Edit Employee"/>
                </section>
            )
        } */}
        
        </>
    )
}
export default Attendance;