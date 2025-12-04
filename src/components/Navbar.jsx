import { useState, useContext } from "react";
import { Link } from "react-router";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-gray-200 text-black shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Left: Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold">
              CourseMaster
            </Link>
          </div>

          {/* Center: Links (hidden on mobile) */}
          <div className="hidden md:flex space-x-6 items-center">
            <Link to="/" className="hover:text-blue-600 transition">
              Home
            </Link>
            <Link to="/about" className="hover:text-blue-600 transition">
              About
            </Link>
            {user?.role === "student" && (
              <Link to="/dashboard/student" className="hover:text-blue-600 transition">
                Dashboard
              </Link>
            )}
            {user?.role === "admin" && (
              <Link to="/dashboard/admin" className="hover:text-blue-600 transition">
                Admin Dashboard
              </Link>
            )}
            <Link to="/contact" className="hover:text-blue-600 transition">
              Contact
            </Link>
          </div>

          {/* Right: Auth Button */}
          <div className="hidden md:flex items-center">
            {user ? (
              <button
                onClick={logout}
                className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition cursor-pointer"
              >
                Logout
              </button>
            ) : (
              <Link to="/login">
                <button className="bg-white px-4 py-2 rounded text-black border hover:bg-gray-100 transition cursor-pointer">
                  Login
                </button>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setOpen(!open)} className="text-2xl focus:outline-none">
              ☰
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-gray-200 px-4 pt-2 pb-4 space-y-2">
          <Link to="/" className="block hover:text-blue-600 transition" onClick={() => setOpen(false)}>
            Home
          </Link>
          <Link to="/about" className="block hover:text-blue-600 transition" onClick={() => setOpen(false)}>
            About
          </Link>
          {user?.role === "student" && (
            <Link to="/dashboard/student" className="block hover:text-blue-600 transition" onClick={() => setOpen(false)}>
              Dashboard
            </Link>
          )}
          {user?.role === "admin" && (
            <Link to="/dashboard/admin" className="block hover:text-blue-600 transition" onClick={() => setOpen(false)}>
              Admin Dashboard
            </Link>
          )}
          <Link to="/contact" className="block hover:text-blue-600 transition" onClick={() => setOpen(false)}>
            Contact
          </Link>

          {user ? (
            <button
              onClick={() => { logout(); setOpen(false); }}
              className="w-full bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition cursor-pointer"
            >
              Logout
            </button>
          ) : (
            <Link to="/login">
              <button
                onClick={() => setOpen(false)}
                className="w-full bg-white text-black border px-4 py-2 rounded hover:bg-gray-100 transition cursor-pointer"
              >
                Login
              </button>
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
