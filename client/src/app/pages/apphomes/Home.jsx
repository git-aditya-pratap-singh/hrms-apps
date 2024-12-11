import { Outlet } from "react-router-dom";
import logo from "../../../assets/img/logo.png";
import homeimg from "../../../assets/img/home.png";
import "../../../assets/css/home/home.scss";

const Home = ()=>{
    return(
        <section className="_main">
            <div className="_sectionA">
                <div className="_subSection-AA">
                    <img src={logo} width={48}/>
                    <label>LOGO</label>
                </div>
                <div className="_subSection-AB">
                    <Outlet/>
                </div>
            </div>
            <div className="_sectionB">
                <div className="_subSection-BA">
                    <div className="_card">
                        <div className="_cardIMG">
                            <img src={homeimg}/>
                        </div>
                        <div className="_cardLabel">
                            <h2>Lorem ipsum odor amet, consectetuer adipiscing elit</h2>
                            <p>Lorem ipsum odor amet, consectetuer adipiscing elit. Enim dictum nascetur habitant faucibus primis 
                                massa ullamcorper. Placerat sodales porta pellentesque, suscipit sodales donec. Erat per lacinia 
                                gravida purus turpis tellus. Pharetra nulla ullamcorper massa lacinia iaculis nam. Dapibus eleifend 
                                vel eget laoreet.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Home;