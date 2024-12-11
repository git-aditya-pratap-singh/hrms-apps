
import PropTypes from 'prop-types';
import { FaUserPlus, FaUserGroup, FaBell } from "react-icons/fa6"; 
import { VscGraph } from "react-icons/vsc";
import { WiStars } from "react-icons/wi";
import { MdLogout, MdOutlineFileDownload, MdDelete } from "react-icons/md";
import { IoMdMailUnread } from "react-icons/io";
import { RxCrossCircled } from "react-icons/rx";

const IconComponent = ({ iconType, iconSize=null, iconColor=null, iconStyle=null }) => {
  const icons = {
    userIcon: <FaUserPlus size={iconSize} color={iconColor} className={iconStyle}/>,
    userGrp: <FaUserGroup size={iconSize} color={iconColor} className={iconStyle}/>,
    attendanceIcon: <VscGraph size={iconSize} color={iconColor} className={iconStyle}/>,
    holydayIcon: <WiStars size={iconSize} color={iconColor} className={iconStyle}/>,
    logoutIcon: <MdLogout size={iconSize} color={iconColor} className={iconStyle}/>,
    mailIcon: <IoMdMailUnread size={iconSize} color={iconColor} className={iconStyle}/>,
    bellIcon: <FaBell size={iconSize} color={iconColor} className={iconStyle}/>,
    crossIcon: <RxCrossCircled size={iconSize} color={iconColor} className={iconStyle}/>,
    downloadIcon: <MdOutlineFileDownload size={iconSize} color={iconColor} className={iconStyle}/>,
    deleteIcon: <MdDelete size={iconSize} color={iconColor} className={iconStyle}/>,
  };
  return icons[iconType] || null;
};

// Define PropTypes for the component
IconComponent.propTypes = {
  iconType: PropTypes.oneOf([
    'userIcon',
    'userGrp',
    'attendanceIcon',
    'holydayIcon',
    'logoutIcon',
    'mailIcon',
    'bellIcon',
    'crossIcon',
    'downloadIcon',
    'deleteIcon'
  ]).isRequired,
  iconSize: PropTypes.string,
  iconColor: PropTypes.any,
  iconStyle: PropTypes.any,
};

export default IconComponent;
