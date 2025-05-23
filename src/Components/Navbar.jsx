import { Link, NavLink } from 'react-router';
import { AuthContext } from '../Context/AuthContext';
import { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { auth } from '../firebase/firebase.config';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

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
        <Link to="/" className="text-xl font-bold tracking-wide">
          {/* logo */}
          <div className="text-xl font-semibold">
            Hobby<span className="text-blue-400">Hub</span>
          </div>
        </Link>

        {/* large screen */}
        <div className="hidden md:flex items-center space-x-6">
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

        {/* Mobile screen  */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-gray-800 dark:text-white">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-gray-900 text-white px-4 py-4 space-y-4 text-lg">
          {navItems}
          
          {user ? (
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <img
                  src={user.photoURL || '/user.png'}
                  alt="User"
                  className="w-8 h-8 rounded-full border-2 border-white"
                />
                <span>{user.displayName}</span>
              </div>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded shadow w-full">
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="block bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow">
              Login
            </Link>
          )}
        </div>






      )}
    </nav>
  );
};

export default Navbar;
