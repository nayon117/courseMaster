import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/home/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import CourseDetails from "../pages/CourseDetails";
import Dashboard from "../pages/student/Dashboard";
import CourseView from "../pages/student/CourseView";


export const router = createBrowserRouter([
    {
        path: "/",
        Component:RootLayout,
        children:[
            {
                index:true,
                Component: Home
            },
            {
                path:"/login",
                Component:Login
            },
            {
                path:"/register",
                Component:Register
            },
            {
                path:"/course/:id",
                Component: CourseDetails
            },
            {
                path:"/student/dashboard",
                Component:Dashboard
            },
            {
                path:"/student/course/:id",
                Component: CourseView
            }
        ]
    }
])

