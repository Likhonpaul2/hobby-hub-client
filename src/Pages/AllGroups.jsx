import { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { Link } from "react-router";
import Spinner from "../Components/Spinner";

const AllGroups = () => {
  const [groups, setGroups] = useState([]);
  const [filteredGroups, setFilteredGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Page title
  useEffect(() => {
    document.title = "All Groups | Hobby Hub";
  }, []);

  // Fetch data from DB
  useEffect(() => {
    fetch("https://hobby-hub-server-five.vercel.app/featuredGroups")
      .then((res) => res.json())
      .then((data) => {
        setGroups(data);
        setFilteredGroups(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error:", err);
        setLoading(false);
      });
  }, []);

  // Handle sorting
  const handleSort = (order) => {
    setSortOrder(order);
    const sorted = [...filteredGroups].sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      return order === "asc" ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
    });
    setFilteredGroups(sorted);
  };

  // Handle filtering
  const handleFilter = (category) => {
    setSelectedCategory(category);
    if (category === "All") {
      setFilteredGroups([...groups]);
    } else {
      const filtered = groups.filter((group) => group.category === category);
      setFilteredGroups(filtered);
    }
  };

  // Extract unique categories
  const uniqueCategories = ["All", ...new Set(groups.map((g) => g.category))];

  // Show loader
  if (loading) return <Spinner />;

  return (
    <div>
      <Navbar />

      <div className="bg-gradient-to-b from-blue-50 via-white to-green-50 min-h-screen py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-blue-700 mb-10">🌟 All Hobby Groups</h2>

          {/* Filter + Sort Controls */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
            {/* Filter by Category */}
            <div className="text-black">
              <label className="mr-2 font-medium">Filter by Category:</label>
              <select
                value={selectedCategory}
                onChange={(e) => handleFilter(e.target.value)}
                className="p-2 rounded border"
              >
                {uniqueCategories.map((cat, index) => (
                  <option key={index} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div className="text-black">
              <label className="mr-2 font-medium">Sort by Name:</label>
              <select
                value={sortOrder}
                onChange={(e) => handleSort(e.target.value)}
                className="p-2 rounded border"
              >
                <option value="asc">Ascending (A-Z)</option>
                <option value="desc">Descending (Z-A)</option>
              </select>
            </div>
          </div>

          {/* Card Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGroups.map((group) => (
              <div
                key={group._id}
                className="rounded-xl shadow-md overflow-hidden transition hover:shadow-xl bg-white"
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

          {filteredGroups.length === 0 && (
            <p className="text-center text-gray-600 mt-8">No groups found.</p>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AllGroups;
