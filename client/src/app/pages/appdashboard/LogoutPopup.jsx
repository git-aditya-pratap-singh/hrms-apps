import { logout_popup } from "../../redux/slices/StateSlices";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Apiauth from "../../_api/auth/Apiauth.service";

import "../../../assets/css/appdashboard/logout.scss";

const LogoutPopup = ()=>{
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logout = async()=>{
        const apiResponse = await new Apiauth().logout();
        if (apiResponse.status) {
          dispatch(logout_popup(false))
          navigate("../../login");
        }
    }
    return(
        <div className="_bannerContainer11">
                <div className="_subA">
                    <label>Log out</label>
                </div>
                <div className="_subB">
                    <h2>Are you sure you want to logout?</h2>
                    <div className="buttons">
                        <button onClick={()=>dispatch(logout_popup(false))}>Cancel</button>
                        <button onClick={logout}>Log out</button>
                    </div>
                </div>
        </div>
    )
}
export default LogoutPopup;