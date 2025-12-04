import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/home/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import CourseDetails from "../pages/CourseDetails";
import Dashboard from "../pages/student/Dashboard";
import CourseView from "../pages/student/CourseView";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AllCourses from "../pages/admin/AllCourses";
import CreateCourse from "../pages/admin/CreateCourse";
import AllStudents from "../pages/admin/AllStudents";
import AssignmentReview from "../pages/admin/AssignmentReview";
import EditCourse from "../pages/admin/EditCourse";
import CourseBatches from "../pages/admin/CourseBatches";
import DashboardLayout from "../layouts/DashboardLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "/course/:id",
        Component: CourseDetails,
      },
    ],
  },
  {
    path: "/dashboard",
    Component: DashboardLayout,
    children: [
      { path: "student", Component: Dashboard },
      { path: "student/course/:id", Component: CourseView },
      {
        path: "admin",
        Component: AdminDashboard,
      },
      {
        path: "admin/all-courses",
        Component: AllCourses,
      },
      {
        path: "admin/create-course",
        Component: CreateCourse,
      },
      {
        path: "admin/all-students",
        Component: AllStudents,
      },
      {
        path: "admin/assignment-review",
        Component: AssignmentReview,
      },
      {
        path: "admin/courses/edit/:courseId",
        Component: EditCourse,
      },
      {
        path: "admin/courses/:courseId/batches",
        Component: CourseBatches,
      },
    ],
  },
]);
