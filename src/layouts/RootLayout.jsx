import { Outlet } from "react-router";
import Navbar from "../components/Navbar";

const RootLayout = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-1">
               <Navbar />
               <Outlet />
               {/* <Footer /> */}
        </div>
    )
}
export default RootLayout;
