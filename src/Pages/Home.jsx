import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { FaSun, FaMoon } from 'react-icons/fa';

const Home = () => {
  const [featuredGroups, setFeaturedGroups] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    fetch('http://localhost:3000/featuredGroups')
      .then((res) => res.json())
      .then((data) => {
        // const recent = data.slice(0, 6);
        setFeaturedGroups(data);
      });
  }, []);

  return (
    <div className={darkMode ? 'dark bg-gray-900 text-white' : 'bg-white text-gray-900'}>
      <header>
        {/* <Navbar /> */}
      </header>

      {/* Dark mood apply */}
      <div className="flex justify-end p-4">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="bg-gray-200 dark:bg-gray-800 p-2 rounded-full"
          title="Toggle Theme"
        >
          {darkMode ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-white" />}
        </button>
      </div>

      {/* Banner / Swiper */}
      <section className="mb-10">
        <Swiper navigation={true} modules={[Navigation]} className="mySwiper w-10/12 h-72 md:h-[400px]">
          <SwiperSlide className="bg-cover bg-center" style={{ backgroundImage: `url(https://i.ibb.co/SKxFhHb/running-group.jpg)` }}>
            <div className="flex items-center justify-center h-full bg-black bg-opacity-50 text-white text-3xl font-bold">
              Connect Through Shared Hobbies
            </div>
          </SwiperSlide>
          <SwiperSlide className="bg-cover bg-center" style={{ backgroundImage: `url(https://i.ibb.co/NrB6mmZ/cooking-group.jpg)` }}>
            <div className="flex items-center justify-center h-full bg-black bg-opacity-50 text-white text-3xl font-bold">
              Discover Cooking Groups
            </div>
          </SwiperSlide>
          <SwiperSlide className="bg-cover bg-center" style={{ backgroundImage: `url(https://i.ibb.co/ZGfzV4K/sketch-group.jpg)` }}>
            <div className="flex items-center justify-center h-full bg-black bg-opacity-50 text-white text-3xl font-bold">
              Paint, Draw & Inspire Together
            </div>
          </SwiperSlide>
        </Swiper>
      </section>

      {/* Featured Groups */}
      <section className="max-w-6xl mx-auto px-4 mb-12">
        <h2 className="text-2xl font-bold mb-6 text-center">🎯 Featured Groups</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredGroups.map(group => (
            <div key={group._id} className="border rounded-xl shadow-md p-4 bg-white dark:bg-gray-800">
              <img src={group.imageUrl} alt={group.name} className="w-full h-48 object-cover rounded-md mb-3" />
              <h3 className="text-xl font-semibold">{group.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">{group.description.slice(0, 100)}...</p>
              <p className="mt-2 text-sm"><strong>Category:</strong> {group.category}</p>
              <p className="text-sm"><strong>Start Date:</strong> {group.startDate}</p>
              <Link to={`/group/${group._id}`} className="mt-3 inline-block bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700">
                See Details
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Static Section 1: Benefits */}
      <section className="bg-blue-100 dark:bg-gray-700 py-10">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-2xl font-bold mb-4">💡 Why Use HobbyHub?</h2>
          <p className="text-lg">
            Meet like-minded people. Build real-life friendships. Stay engaged with your passions in real life.
          </p>
        </div>
      </section>

      {/* Static Section 2: Testimonials */}
      <section className="bg-gray-100 dark:bg-gray-800 py-10">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-6">🌟 Testimonials</h2>
          <div className="space-y-4">
            <p>“I never thought I’d find a book club so close to my area. HobbyHub is a game-changer!” – <i>Meherun Nahar</i></p>
            <p>“I joined a photography group through this site and made amazing friends!” – <i>Rashed Khan</i></p>
          </div>
        </div>
      </section>

      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Home;
