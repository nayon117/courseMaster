import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between">
      <h1 className="font-bold">CourseMaster</h1>
      {user ? (
        <div className="flex items-center gap-4">
          <span>{user.name}</span>
          <button onClick={logout} className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 transition">
            Logout
          </button>
        </div>
      ) : <Link to="/login"><button className="bg-white px-3 py-1 rounded text-black cursor-pointer">Login</button></Link>}
    </nav>
  );
};

export default Navbar;
