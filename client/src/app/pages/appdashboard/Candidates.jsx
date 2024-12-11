import { useState, useEffect} from 'react';
import Select from 'react-select';
import Table from "../../components/Table";
import TableStructure from "../../utils/TableStructure";
import { useLoaderData } from 'react-router-dom';

import AddNewForms from "../../components/Forms/AddNewForms";
import NewCandidatesStruc from "../../validation/FormStructure/NewCandidatesStruc";
import validateSchema from "../../validation/validateSchema";

import { useDispatch, useSelector } from "react-redux";
import {add_popup} from "../../redux/slices/StateSlices";
import "../../../assets/css/appdashboard/candidates.scss";

const Candidates = ()=>{
    const dispatch = useDispatch();
    const addPopup = useSelector((store) => store.openPopup.add_popup);
    const candidateList = useLoaderData();

    const [candidateListArray, setcandidateListArray] = useState(candidateList);  
    const [filteredCandidates, setFilteredCandidates] = useState(candidateList);   

    const searchInput = async(event) => {
        const searchValue = event.target.value.toLowerCase(); 
        const filteredList = candidateListArray.filter((candidate) =>
            candidate.name.toLowerCase().includes(searchValue) ||
            candidate.email.toLowerCase().includes(searchValue) ||
            candidate.status.toLowerCase().includes(searchValue)
        );
        setFilteredCandidates(filteredList);
    };

    useEffect(() => {
        setFilteredCandidates(candidateListArray); 
    }, [candidateListArray]);

    return(
        <>
        <section className="_candiateContainer">
            <div className="_sub_candiateContainerA">
                <div className="childConatinerA">
                    <select name="statusLevel"  onChange={searchInput} className="_select">
                                <option value="" >All</option>
                                <option value="New">New</option>
                                <option value="Rejected">Rejected</option>
                                <option value="Ongoing">Ongoing</option>
                                <option value="Selected">Selected</option>
                                <option value="Scheduled">Scheduled</option>
                    </select>
                </div>
                <div className="childContainerB">
                   <input type="search" className="search-input" placeholder="Search here..." onChange={searchInput}/>
                   <button onClick={()=>dispatch(add_popup({status: true, key:'add', role:'candidate', item: ''}))}>Add New Candidate</button>
                </div>
            </div>
            <div className="_sub_candiateContainerB">
                <Table structure={TableStructure} tableData={filteredCandidates} type="candidate"/>
            </div>
        </section>

        {
            (addPopup.type === "candidate" && (addPopup.add || addPopup.edit))
            && (
                <section className="_divForms">
                    <AddNewForms structure={NewCandidatesStruc} schema={validateSchema} header="Add New Candidates"/>
                </section>
            )
        }
        
        </>
    )
}
export default Candidates;