import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Context/AuthContext';
import Footer from '../Components/Footer';
import Navbar from '../Components/Navbar';


const DashboardHome = () => {
  const { user } = useContext(AuthContext);
  const [totalItems, setTotalItems] = useState(0);
  const [myItems, setMyItems] = useState(0);
  const [groups, setGroups] = useState(0);
//   const [users, setUsers] = useState(0);

  useEffect(() => {
    // Replace with your API endpoints
    fetch('https://hobby-hub-server-five.vercel.app/groups')
      .then(res => res.json())
      .then(data => {
        setTotalItems(data.length);
        setGroups(data.length);

        const mine = data.filter(item => item.userEmail === user?.email);
        setMyItems(mine.length);
      });

    // fetch('http://localhost:3000/users') // If available
    //   .then(res => res.json())
    //   .then(data => setUsers(data.length));
  }, [user]);

  return (
    <>
    <Navbar/>
    <div className="p-6 min-h-screen container mx-auto">
      <h1 className="text-3xl font-bold mb-4">Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-5 shadow text-center">
          <h2 className="text-gray-600 dark:text-gray-300 text-sm">Total Items</h2>
          <p className="text-4xl font-bold text-green-600">{totalItems}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-5 shadow text-center">
          <h2 className="text-gray-600 dark:text-gray-300 text-sm">My Items</h2>
          <p className="text-4xl font-bold text-blue-600">{myItems}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-5 shadow text-center">
          <h2 className="text-gray-600 dark:text-gray-300 text-sm">Active Groups</h2>
          <p className="text-4xl font-bold text-purple-600">{groups}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-5 shadow text-center">
          <h2 className="text-gray-600 dark:text-gray-300 text-sm">Users</h2>
          <p className="text-4xl font-bold text-pink-600">0</p>
        </div>
      </div>

      <div className="mt-10 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">Logged-in User Info</h2>
        <div className="space-y-2">
          <p><strong>Name:</strong> {user?.displayName}</p>
          <p><strong>Email:</strong> {user?.email}</p>
          <p><strong>UID:</strong> {user?.uid}</p>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default DashboardHome;
