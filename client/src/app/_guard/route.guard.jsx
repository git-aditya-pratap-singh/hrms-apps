import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import Apiauth from "../_api/auth/Apiauth.service";


const ProctedRouteGuard = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const apiResponse = await new Apiauth().getsessionToken();
        setIsAuthenticated(!!apiResponse.data?.user); 
      } catch (error) {
        setIsAuthenticated(false); 
      }
    };

    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>; 
  }

  return isAuthenticated ? children : <Navigate to="/" />;
};

const IsloginGuard = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const apiResponse = await new Apiauth().getsessionToken();
        setIsAuthenticated(!!apiResponse.data?.user);
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? <Navigate to="/dashboard/candidates" /> : children;
};

IsloginGuard.propTypes = {
  children: PropTypes.node.isRequired,
};


ProctedRouteGuard.propTypes = {
  children: PropTypes.node.isRequired,
};

export {ProctedRouteGuard, IsloginGuard};