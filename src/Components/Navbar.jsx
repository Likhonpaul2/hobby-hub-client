import { Link, NavLink } from 'react-router';
import { AuthContext } from '../Context/AuthContext';
import { useContext } from 'react';
import { toast } from 'react-toastify';
import { auth } from '../firebase/firebase.config';

const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);

  const handleLogout = () => {
    signOutUser(auth)
      .then(() => {
        toast.success('Logged out successfully!');
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const navItems = (
    <>
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? 'text-green-500 font-semibold' : 'text-white hover:text-green-300 transition'
        }>
        Home
      </NavLink>
      <NavLink
        to="/allGroups"
        className={({ isActive }) =>
          isActive ? 'text-green-500 font-semibold' : 'text-white hover:text-green-300 transition'
        }>
        All Groups
      </NavLink>
      {user && (
        <>
          <NavLink
            to="/createGroup"
            className={({ isActive }) =>
              isActive ? 'text-green-500 font-semibold' : 'text-white hover:text-green-300 transition'
            }>
            Create Group
          </NavLink>
          <NavLink
            to="/myGroups"
            className={({ isActive }) =>
              isActive ? 'text-green-500 font-semibold' : 'text-white hover:text-green-300 transition'
            }>
            My Groups
          </NavLink>
        </>
      )}
    </>
  );

  return (
    <nav className="backdrop-blur-md bg-white/30 dark:bg-gray-800/40 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-green-600 tracking-wide">
          HobbyHub
        </Link>
        <div className="flex items-center space-x-6">
          <div className="flex space-x-4 text-lg font-medium">
            {navItems}
          </div>
          {user ? (
            <div className="flex items-center space-x-3">
              <div className="relative group">
                <img
                  src={user.photoURL || '/user.png'}
                  alt="User"
                  className="w-8 h-8 rounded-full cursor-pointer border-2 border-white"
                />
                <div className="absolute hidden group-hover:block bg-black/80 text-white px-3 py-1 rounded text-sm mt-1 whitespace-nowrap">
                  {user.displayName}
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded shadow">
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
