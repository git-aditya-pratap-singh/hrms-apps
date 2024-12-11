import { createBrowserRouter } from "react-router-dom";
import ApiRoutesCall from "./api.routes.call";

import Home from "../pages/apphomes/Home";
import Registration from "../pages/apphomes/Registration";
import Login from "../pages/apphomes/Login";

import Dashboard from "../pages/appdashboard/layout/Dashboard";
import Candidates from "../pages/appdashboard/Candidates";
import Employees from "../pages/appdashboard/Employee";
import Attendance from "../pages/appdashboard/Attendance";
import Leaves from "../pages/appdashboard/Leaves";

import {IsloginGuard, ProctedRouteGuard} from "../_guard/route.guard";

const router = createBrowserRouter([
    {
        path: "/",
        element: (
        <IsloginGuard>
            <Home/>
        </IsloginGuard>
        ),
        children: [
            {
                index: true,
                element: <Registration />,
            },
            {
                path: "/login",
                element: <Login />
            },
        ]
    },

    {
        path: "/",
        element: (
            <ProctedRouteGuard>
                <Dashboard />
            </ProctedRouteGuard>     
        ),
        children: [
            {
                index: true,
                path: "/dashboard/candidates",
                element: <Candidates />,
                loader: new ApiRoutesCall().CandidatesPageApi
            },
            {
                path: "/dashboard/employees",
                element: <Employees />,
                loader: new ApiRoutesCall().EmployeePageApi
            },
            {
                path: "/dashboard/attendance",
                element: <Attendance />,
            },
            {
                path: "/dashboard/leaves",
                element: <Leaves />,
            },
        ]
    },
    {
        // Catch-all route for 404 errors
        path: "*",
        element: <h1>Not Found</h1>
     },

]);

export default router;