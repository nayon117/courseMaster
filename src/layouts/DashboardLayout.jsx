import { NavLink, Outlet } from "react-router";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import Loader from "../components/Loader";

const DashboardLayout = () => {
  const [open, setOpen] = useState(false);
  const { user } = useContext(AuthContext);

  // Handle case when user is null (after logout)
  if (!user) return <Loader />;

  // Role-based links
  const links = user?.role === "admin" 
    ? [
        { to: "/dashboard/admin", label: "🏠 Dashboard Home" },
        { to: "/dashboard/admin/all-courses", label: "📚 All Courses" },
        { to: "/dashboard/admin/create-course", label: "➕ Create Course" },
        { to: "/dashboard/admin/all-students", label: "👥 Students" },
        { to: "/dashboard/admin/assignment-review", label: "📝 Assignment Review" },
      ]
    : [
        { to: "/dashboard/student", label: "🏠 Your Courses" },
        // add more student pages here later
      ];

  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* Mobile Top Navbar */}
      <div className="lg:hidden bg-white p-4 shadow">
        <button
          className="text-2xl"
          onClick={() => setOpen(true)}
        >
          ☰
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed lg:static top-0 left-0 min-h-screen w-64 bg-white shadow-xl p-5 transform 
          ${open ? "translate-x-0" : "-translate-x-full"}
          transition-transform duration-300 lg:translate-x-0 z-50`}
      >
        {/* Close button (Mobile only) */}
        <div className="flex justify-between items-center mb-6 lg:hidden">
          <h2 className="text-2xl font-bold">Menu</h2>
          <button
            className="text-3xl"
            onClick={() => setOpen(false)}
          >
            ×
          </button>
        </div>

        <ul className="space-y-3 text-lg font-medium">
          {links?.map(link => (
            <li key={link?.to}>
              <NavLink
                to={link?.to}
                className="block p-2 rounded hover:bg-gray-200"
                onClick={() => setOpen(false)}
              >
                {link?.label}
              </NavLink>
            </li>
          ))}

          {/* Back to home link always */}
          <li>
            <NavLink
              to="/"
              className="block p-2 rounded hover:bg-gray-200"
              onClick={() => setOpen(false)}
            >
              🔙 Back to Home
            </NavLink>
          </li>
        </ul>
      </aside>

      {/* Overlay (Mobile only) */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-40 lg:hidden"
        ></div>
      )}

      {/* Main content */}
      <main className="flex-1 p-6 mt-14 lg:mt-0">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
