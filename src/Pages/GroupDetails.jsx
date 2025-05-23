import { useEffect, useState} from "react";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { AuthContext } from "../Context/AuthContext";
import Spinner from "../Components/Spinner";

const GroupDetails = () => {
  const { id } = useParams();
  const [group, setGroup] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    fetch(`https://hobby-hub-server-five.vercel.app/featuredGroups/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setGroup(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading group:", err);
        setLoading(false);
        toast.error("Failed to load group");
      });
  }, [id]);

  const handleJoin = () => {
    toast.success("You have successfully joined the group!");
    
  };

  const isGroupActive = (startDate) => {
    const today = new Date();
    const groupDate = new Date(startDate);
    return groupDate >= today;
  };

  if (loading) {
    return <Spinner/>;
  }

  if (!group) {
    return <p className="text-center mt-10">Group not found</p>;
  }

  return (
    <div>
      <Navbar />

      <div className="max-w-4xl mx-auto p-6 mt-8 bg-gradient-to-br from-gray-100/10 to-blue-50/10 rounded-xl shadow">
        <img
          src={group.imageUrl}
          alt={group.name}
          className="w-full h-64 object-cover rounded-lg mb-6"
        />
        <h2 className="text-3xl font-bold text-blue-700 mb-2">{group.name}</h2>
        <p className="text-gray-300 text-lg mb-2">📂 {group.category}</p>
        <p className="text-gray-300 mb-2">📍 Location: {group.location}</p>
        <p className="text-gray-300 mb-2">👥 Max Members: {group.maxMembers}</p>
        <p className="text-gray-300 mb-2">📅 Start Date: {group.startDate}</p>
        <p className="text-gray-300 mb-4">🧑‍💼 Created by: {group.userName}</p>
        <p className=" font-medium mb-6">{group.description}</p>

        {isGroupActive(group.startDate) ? (
          <button
            onClick={handleJoin}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded transition"
          >
            Join Group
          </button>
        ) : (
          <p className="text-red-600 font-semibold text-lg">
            ⚠️ This group is no longer active (start date passed).
          </p>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default GroupDetails;
