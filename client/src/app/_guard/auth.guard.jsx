import { useState, useEffect, createContext, useContext } from "react";
import PropTypes from "prop-types";

const AuthContext = createContext();

const AuthGuard = ({ children }) => {
    const [auth, setAuth] = useState({
        user: null
    })

    useEffect(() => {
        const data = localStorage.getItem('user');
        if(data){
            const parseData = JSON.parse(data)
            setAuth({
                ...auth,
                userA: parseData,
            }) 
        }
    }, [])

    return (
        <AuthContext.Provider value={[auth, setAuth]}>
            {children}
        </AuthContext.Provider>
    )
}

AuthGuard.propTypes = {
    children: PropTypes.node.isRequired
};
const useAuthGuard = () => {
    return useContext(AuthContext);
}

export default AuthGuard; 
export {useAuthGuard}
