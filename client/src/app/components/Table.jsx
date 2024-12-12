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

const Table = ({ structure, tableData, type }) => {
  const [activePopup, setActivePopup] = useState(false);
  const dispatch = useDispatch();

  // API functions
  const deleteData = async (email) => {
    await new ApplicationApi().DeleteCandidates(email);
  };

  const handleStatusChange = async (data, status) => {
    if (status === "Selected") {
      await new ApplicationApi().AddEmployee(data, status);
    } else {
      await new ApplicationApi().EditCandidateStatus(data.email, status);
    }
  };

  // Render table rows
  const renderCandidateRow = (data, index) => (
    <tr key={index} style={{ color: statusColor(data.status) }}>
      <td>{index + 1}</td>
      <td>{toTitleCase(data.name)}</td>
      <td>{data.email}</td>
      <td>{data.phone}</td>
      <td>{data.department}</td>
      <td>
        <select
          name="statusLevel"
          value={data.status}
          onChange={(e) => handleStatusChange(data, e.target.value)}
          className="_select"
        >
          <option value="" disabled>
            Select Status
          </option>
          <option value="New">New</option>
          <option value="Rejected">Rejected</option>
          <option value="Ongoing">Ongoing</option>
          <option value="Selected">Selected</option>
          <option value="Scheduled">Scheduled</option>
        </select>
      </td>
      <td>{`${data.experience}+`}</td>
      <td>
        <a href={data.resume} download>
          <IconComponent iconType="downloadIcon" />
        </a>
      </td>
      <td onClick={() => deleteData(data.email)}>
        <IconComponent iconType="deleteIcon" />
      </td>
    </tr>
  );

  const renderEmployeeRow = (data, index) => (
    <tr key={index} style={{ color: statusColor(data.status) }}>
      <td>
        <span
          style={{
            padding: "0.6rem",
            color: "#fff",
            borderRadius: "50%",
            backgroundColor: getRandomHexColor(),
          }}
        >
          {profileName(data.name)}
        </span>
      </td>
      <td>{toTitleCase(data.name)}</td>
      <td>{data.email}</td>
      <td>{data.phone}</td>
      <td>{data.department}</td>
      <td>{data.DOJ.split("T")[0]}</td>
      <td onClick={() => setActivePopup(!activePopup)}>
        <IconComponent iconType="dotIcon" />
      </td>
    </tr>
  );

  return (
    <div className="_tableContainer">
      <table className="table">
        <thead>
          <tr>
            {structure.map((item) => (
              <th key={item.id}>{item.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {type === "candidate" && tableData.map(renderCandidateRow)}
          {type === "employee" && tableData.map(renderEmployeeRow)}
        </tbody>
      </table>
      {activePopup && (
        <div className="_notificationPopup_open">
          <label>Edit</label>
          <label>Delete</label>
        </div>
      )}
    </div>
  );
};

Table.propTypes = {
  structure: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  tableData: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
      department: PropTypes.string.isRequired,
      status: PropTypes.string,
      experience: PropTypes.number,
      resume: PropTypes.string,
      DOJ: PropTypes.string,
    })
  ).isRequired,
  type: PropTypes.oneOf(["candidate", "employee"]).isRequired,
};

export default Table;
