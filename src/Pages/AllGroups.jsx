import { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { Link } from "react-router";
import Spinner from "../Components/Spinner";

const AllGroups = () => {
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(true);

    // page title 
    useEffect(() => {
        document.title = "All Groups | Hobby Hub"
    }, [])

    // fetch data from DB 
    useEffect(() => {
        fetch("https://hobby-hub-server-five.vercel.app/featuredGroups")
            .then((res) => res.json())
            .then((data) => {
                setGroups(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error:", err);
                setLoading(false);
            });
    }, []);

    // spinner 
    if (loading) {
        return <Spinner />
    }

    return (
        <div>
            {/* navbar  */}
            <Navbar />

            <div className="bg-gradient-to-b from-blue-50 via-white to-green-50 min-h-screen py-12 px-4">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold text-center text-blue-700 mb-10">🌟 All Hobby Groups</h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                        
                        {groups.map((group) => (
                            <div
                                key={group._id}
                                className=" rounded-xl shadow-md overflow-hidden transition hover:shadow-xl"
                            >
                                <img
                                    src={group.imageUrl}
                                    alt={group.name}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-5 space-y-2">
                                    <h3 className="text-xl font-semibold text-purple-700">{group.name}</h3>
                                    <p className="text-gray-600 text-sm">📍 {group.location}</p>
                                    <p className="text-gray-700">🗂️ Category: {group.category}</p>
                                    <p className="text-gray-700">👥 Max Members: {group.maxMembers}</p>
                                    <p className="text-gray-700">📅 Start: {group.startDate}</p>

                                    {/* navigate to group details  */}
                                    <Link
                                        to={`/group/${group._id}`}
                                        className="inline-block mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                                    >
                                        View Details
                                    </Link>
                                    
                                </div>
                            </div>
                        ))}

                    </div>

                    {groups.length === 0 && (
                        <p className="text-center text-gray-600 mt-8">No groups found.</p>
                    )}
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default AllGroups;
