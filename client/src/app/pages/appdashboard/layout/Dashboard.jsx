import {useState, useEffect} from "react";
import { NavLink, Outlet } from "react-router";
import { useLocation } from "react-router";
import { logout_popup } from "../../../redux/slices/StateSlices";
import { useDispatch, useSelector } from "react-redux";
import Hamburger from "hamburger-react";
import toTitleCase from "../../../common/titleCase";
import LogoutPopup from "../LogoutPopup";

import IconComponent from "../../../../assets/icons/IconComponent";
import logo from "../../../../assets/img/logo.png";
import "../../../../assets/css/appdashboard/dashboard.scss";

const Dashboard = ()=>{

    const [toggle, setToggle] = useState(false);

    const dispatch = useDispatch();
    const location = useLocation();
    const logoutPopup = useSelector((store) => store.openPopup.logoutState);

    const pathnames = location.pathname.split('/').filter((x) => x);
    const locationPaths = pathnames.map((item, index) => index === pathnames.length - 1 ? toTitleCase(item) : toTitleCase(`${item} /`));
    return(
        <section className="_dashboardContainer">
            <div className={`_navBar`} style={{left: toggle ? '0' : '-300px'  }}>
                <div className="_logo">
                    <img src={logo} width={48}/>
                    <label>LOGO</label>
                </div>
                <input type="search" className="search-input" placeholder="Search here..."/>

                <div className="_navItem">
                    <div className="_items">
                        <label>Recruitment</label>
                        <div className="_subItems">
                            <NavLink to="/dashboard/candidates" onClick={() => setToggle(!toggle)}>
                                <span><IconComponent iconType='userIcon' /><label>Candidates</label></span>
                            </NavLink>
                        </div>
                    </div>
                    <div className="_items">
                        <label>Organization</label>
                        <div className="_subItems">
                            <NavLink to="/dashboard/employees" onClick={() => setToggle(!toggle)}>
                                <span><IconComponent iconType='userGrp' /><label>Employees</label></span>
                            </NavLink>

                            <NavLink to="/dashboard/attendance" onClick={() => setToggle(!toggle)}>
                                <span><IconComponent iconType='attendanceIcon' /><label>Attendance</label></span>
                            </NavLink>

                            <NavLink to="/dashboard/leaves" onClick={() => setToggle(!toggle)}>
                                <span><IconComponent iconType='holydayIcon' /><label>Leaves</label></span>
                            </NavLink>
                        </div>
                    </div>
                    <div className="_items">
                        <label>Others</label>
                        <div className="_subItems">
                            <NavLink to="" onClick={()=>dispatch(logout_popup(true))}>
                                <span><IconComponent iconType='logoutIcon' /><label>Logout</label></span>
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>

            <div className="_dashboardHeader">
                <div className="_header">
                    <div className="subHeader">
                        <div className="menu">
                        <a onClick={() => setToggle(!toggle)}>
                            <Hamburger
                                color="#828282"
                                size={25}
                                duration={0.5}
                                easing="ease-in"
                                rounded
                                toggled={toggle}
                                toggle={!toggle}
                            />
                        </a>
                        </div>
                        <div className="_breadCrums">
                           <h2>{locationPaths[locationPaths.length-1]}</h2>
                        </div>
                    </div>
                    <div className="subHeaderB">
                        <label><IconComponent iconType='mailIcon' /></label>
                        <label><IconComponent iconType='bellIcon' /></label>
                        <label><IconComponent iconType='userIcon' /></label>
                    </div>
                </div>
                <div className="_outlet">
                    <Outlet/>
                </div>
            </div>
            { logoutPopup && (
                <div className="_bannerLogout">
                    <LogoutPopup/>
                </div>
            )}
        </section>
    )
}
export default Dashboard;