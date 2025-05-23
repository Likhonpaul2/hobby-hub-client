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
    fetch('https://hobby-hub-server-five.vercel.app/featuredGroups')
      .then((res) => res.json())
      .then((data) => {
        const recent = data.slice(0, 6);
        setFeaturedGroups(recent);
      });
  }, []);

  return (
    <div className={darkMode ? 'dark bg-gray-900 text-white' : 'bg-white text-gray-900'}>
      <header>
        <Navbar />
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



      {/* slider */}
      <section className="mb-10">
        <Swiper navigation={true} modules={[Navigation]} className="mySwiper container h-72 md:h-[400px]">
          <SwiperSlide className="bg-cover bg-center" style={{ backgroundImage: `url(https://i.ibb.co/DHd6Z8TS/1.jpg)` }}>
            <div className="flex items-center justify-center h-full bg-black/40  text-white text-3xl font-bold">
              Connect Through Shared Hobbies
            </div>
          </SwiperSlide>
          <SwiperSlide className="bg-cover bg-center" style={{ backgroundImage: `url(https://i.ibb.co/WpYmDYRW/3.jpg)` }}>
            <div className="flex items-center justify-center h-full bg-black/40  text-white text-3xl font-bold">
              Discover Cooking Groups
            </div>
          </SwiperSlide>
          <SwiperSlide className="bg-cover bg-center" style={{ backgroundImage: `url(https://i.ibb.co/VWSY34Sc/2-1.jpg)` }}>
            <div className="flex items-center justify-center h-full bg-black/40 text-white text-3xl font-bold ">
              Paint, Draw & Inspire Together
            </div>
          </SwiperSlide>
        </Swiper>
      </section>

      {/* https://i.ibb.co/DHd6Z8TS/1.jpg
https://i.ibb.co/WpYmDYRW/3.jpg
https://i.ibb.co/VWSY34Sc/2-1.jpg */}


      {/* Featured Groups */}
      <section className="max-w-6xl mx-auto px-4 mb-12">
        <h2 className="text-4xl font-bold mb-6 text-center py-10">🎯 Featured Groups</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {featuredGroups.map(group => (
            <div key={group._id} className="border rounded-xl shadow-md p-4 bg-white dark:bg-gray-800">
              <img src={group.imageUrl} alt={group.name} className="w-full h-48 object-cover rounded-md mb-3" />
              <h3 className="text-xl font-semibold text-green-600">{group.name}</h3>
              <p className="text-sm text-green-600 dark:text-gray-300">{group.description.slice(0, 100)}...</p>
              <p className="mt-2 text-sm text-gray-300"><strong>Category:</strong> {group.category}</p>
              <p className="text-sm text-gray-300"><strong>Start Date:</strong> {group.startDate}</p>
              <Link to={`/group/${group._id}`} className="mt-3 inline-block bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700">
                See Details
              </Link>
            </div>
          ))}

        </div>
      </section>

     
    

      {/* Extra Section 1: How to Join */}
      <div className="bg-gradient-to-r from-cyan-100 to-blue-100 py-10 dark:bg-gray-700">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">🤝 How to Join This Group</h2>
          <p className="text-gray-700 text-lg">
            Interested in joining? Make sure the group has not yet reached its maximum capacity and
            the start date hasn’t passed. If all is well, click the “Join Group” button on this page 
            (or register/login first) to confirm your interest. Group admins will get in touch with 
            you shortly.
          </p>
        </div>
      </div>

      {/* Extra Section 2: Why Join a Hobby Group? */}
      <div className="bg-gradient-to-r from-yellow-100 to-pink-100 py-10 dark:bg-gray-700">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-pink-700 mb-4">🎯 Why Join a Hobby Group?</h2>
          <ul className="list-disc pl-6 text-gray-700 text-lg space-y-2">
            <li>Meet new people with similar passions</li>
            <li>Learn and grow your skills in a collaborative space</li>
            <li>Stay active and engaged through regular events</li>
            <li>Be part of a positive, creative community</li>
          </ul>
        </div>
      </div>

      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Home;
