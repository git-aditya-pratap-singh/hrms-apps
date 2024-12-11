import { useState } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import toTitleCase from "../common/titleCase";
import profileName from "../common/profileName";
import IconComponent from "../../assets/icons/IconComponent"; 
import getRandomHexColor from "../common/randomColorGenerate";
import statusColor from "../common/statusColor";
import ApplicationApi from "../_api/application/ApplicationApi.service";

import "../../assets/css/components/_table.scss";

const Table = ({structure, tableData, type}) => {

  const [filterData, setFilterData] = useState(''); 
  const dispatch = useDispatch();

  const deleteData = async(email) => await new ApplicationApi().DeleteCandidates(email);

  const handleStatusChange = async(data, status) => {
    status === 'Selected' ? await new ApplicationApi().AddEmployee(data, status) 
    : await new ApplicationApi().EditCandidateStatus(data.email, status);
  };
  
  return (
      <div className="_tableContainer">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              {
                structure.map((items)=>{
                  return <th key={items?.id}>{items?.name}</th>
                })
              }
            </tr>
          </thead>
          <tbody>
            {
              tableData.map((data, index)=>{
                return(
                  <tr key={index} style={{color: statusColor(data.status)}}>
                    { type === 'candidate' ? <td>{index+1}</td> : <td style={{ backgroundColor: getRandomHexColor()}}> {profileName(data.name)}</td>}
                    <td>{ toTitleCase(data.name) }</td>
                    <td>{data.email}</td>
                    <td>{data.phone}</td>
                    <td>{data.department}</td>
                    {
                      type === 'candidate' && (
                        <>
                        <td>
                        <select name="statusLevel" value={data.status} 
                        onChange={(e) => handleStatusChange(data, e.target.value)}
                                className="_select">
                                <option value="" disabled >Select Status</option>
                                <option value="New">New</option>
                                <option value="Rejected">Rejected</option>
                                <option value="Ongoing">Ongoing</option>
                                <option value="Selected">Selected</option>
                                <option value="Scheduled">Scheduled</option>
                        </select>
                        </td>
                        <td>{data.experience +'+'}</td>
                        <td>
                          <a href={data.resume} download>
                           <IconComponent iconType="downloadIcon" />
                          </a>
                        </td>
                        <td onClick={()=>deleteData(data.email)}><IconComponent iconType="deleteIcon"/></td>                       
                        </>
                      )
                    } 

                    {
                      type === 'employee' && (
                        <>
                        <td>{data.department}</td>
                        <td>{data.DOJ.split('T')[0]}</td>
                        <td><IconComponent iconType="dotIcon"/></td>   
                        </>
                      )
                    }                   
                    
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
  );
};

Table.propTypes = {
  structure: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  tableData: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
      department: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      experience: PropTypes.string.isRequired,
      resume: PropTypes.string.isRequired,
    })
  ).isRequired,
};
export default Table;
