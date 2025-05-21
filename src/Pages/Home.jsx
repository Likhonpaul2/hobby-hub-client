import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { FaArrowRight } from 'react-icons/fa';
import { Slide } from 'react-awesome-reveal';

const Home = () => {
  const [featuredGroups, setFeaturedGroups] = useState([]);

  useEffect(() => {
    fetch('/groups.json') // or fetch from your database API
      .then((res) => res.json())
      .then((data) => setFeaturedGroups(data.slice(0, 6)));
  }, []);

  return (
    <div>
      {/* Banner / Slider */}
      <div className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white py-20 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Discover Local Hobby Groups</h1>
        <p className="text-lg mb-6">Join a community. Share your passion. Start your adventure today.</p>
        <Link to="/groups" className="inline-block bg-white text-blue-700 px-6 py-2 rounded shadow font-semibold">
          Explore Groups
        </Link>
      </div>

      {/* Featured Groups */}
      <section className="py-10 px-4 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">🔥 Featured Groups</h2>
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {featuredGroups.map((group) => (
            <div key={group._id} className="border shadow rounded p-4 flex flex-col justify-between">
              <div>
                <img src={group.image} alt={group.name} className="w-full h-48 object-cover rounded mb-3" />
                <h3 className="text-xl font-semibold">{group.name}</h3>
                <p className="text-sm text-gray-600 mt-2">{group.description.slice(0, 100)}...</p>
              </div>
              <Link
                to={`/group/${group._id}`}
                className="mt-4 inline-flex items-center text-blue-600 hover:underline"
              >
                See More <FaArrowRight className="ml-1" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Static Section 1 - Benefits */}
      <section className="bg-gray-100 py-10 px-4 text-center">
        <Slide direction="up" triggerOnce>
          <h2 className="text-2xl font-bold mb-4">Why Join HobbyHub?</h2>
          <p className="max-w-xl mx-auto text-gray-700 mb-6">
            Meet new people, learn new skills, and enjoy your favorite activities together. HobbyHub helps you
            connect with local communities that share your interests.
          </p>
        </Slide>
      </section>

      {/* Static Section 2 - Call to Action */}
      <section className="bg-blue-600 text-white py-14 text-center">
        <Slide direction="up" triggerOnce>
          <h2 className="text-2xl font-bold mb-4">Ready to Create Your Own Group?</h2>
          <p className="mb-6 text-lg">Take the lead and build your dream hobby circle.</p>
          <Link to="/createGroup" className="bg-white text-blue-700 px-6 py-2 rounded shadow font-semibold">
            Create a Group
          </Link>
        </Slide>
      </section>
    </div>
  );
};

export default Home;
