import { useState, useContext } from "react";
import { Link } from "react-router";
import { AuthContext } from "../context/AuthContext";
import { BookOpen } from "lucide-react";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-white text-black shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/*  Logo */}
          <div className="shrink-0">
            <Link to="/" className="flex items-center gap-2">
              <BookOpen className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-foreground">
                CourseMaster
              </span>
            </Link>
          </div>

          {/* Center: Links (hidden on mobile) */}
          <div className="hidden md:flex space-x-6 items-center">
            <Link to="/" className="hover:text-green-600 transition">
              Home
            </Link>
            <Link to="/courses" className="hover:text-green-600 transition">
              Courses
            </Link>
            <Link to="/about" className="hover:text-green-600 transition">
              About
            </Link>
            {user?.role === "student" && (
              <Link
                to="/dashboard/student"
                className="hover:text-green-600 transition"
              >
                Dashboard
              </Link>
            )}
            {user?.role === "admin" && (
              <Link
                to="/dashboard/admin"
                className="hover:text-green-600 transition"
              >
                Admin Dashboard
              </Link>
            )}
            <Link to="/contact" className="hover:text-green-600 transition">
              Contact
            </Link>
          </div>

          {/* Right: Auth Button */}
          <div className="hidden md:flex items-center">
            {user ? (
              <button
                onClick={logout}
                className="bg-green-700/90 text-white px-4 py-1.5 rounded-full hover:bg-green-800 transition cursor-pointer"
              >
                Logout
              </button>
            ) : (
              <Link to="/login">
                <button className="bg-green-700/90 text-white px-4 py-1.5 rounded-full hover:bg-green-800 transition cursor-pointer">
                  Login
                </button>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setOpen(!open)}
              className="text-2xl focus:outline-none"
            >
              ☰
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-gray-200 text-black px-4 pt-2 pb-4 space-y-2">
          <Link
            to="/"
            className="block hover:text-green-600 transition"
            onClick={() => setOpen(false)}
          >
            Home
          </Link>
          {/* courses */}
          <Link
            to="/courses"
            className="block hover:text-green-600 transition"
            onClick={() => setOpen(false)}
          >
            Courses
          </Link>

          <Link
            to="/about"
            className="block hover:text-green-600 transition"
            onClick={() => setOpen(false)}
          >
            About
          </Link>
          {user?.role === "student" && (
            <Link
              to="/dashboard/student"
              className="block hover:text-green-600 transition"
              onClick={() => setOpen(false)}
            >
              Dashboard
            </Link>
          )}
          {user?.role === "admin" && (
            <Link
              to="/dashboard/admin"
              className="block hover:text-green-600 transition"
              onClick={() => setOpen(false)}
            >
              Admin Dashboard
            </Link>
          )}
          <Link
            to="/contact"
            className="block hover:text-green-600 transition"
            onClick={() => setOpen(false)}
          >
            Contact
          </Link>

          {user ? (
            <button
              onClick={() => {
                logout();
                setOpen(false);
              }}
              className="w-full bg-green-700/90 text-white px-4 py-1.5 rounded-full hover:bg-green-800 transition cursor-pointer"
            >
              Logout
            </button>
          ) : (
            <Link to="/login">
              <button
                onClick={() => setOpen(false)}
                className="w-full bg-green-700/90 text-white px-4 py-1.5 rounded-full hover:bg-green-800 transition cursor-pointer"
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
