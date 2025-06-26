import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { FaSun, FaMoon } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Home = () => {
  const [featuredGroups, setFeaturedGroups] = useState([]);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  useEffect(() => {
    fetch('https://hobby-hub-server-five.vercel.app/featuredGroups')
      .then((res) => res.json())
      .then((data) => {
        const recent = data.slice(0, 6);
        setFeaturedGroups(recent);
      });
  }, []);

  useEffect(() => {
    document.title = "Home | Hobby Hub";
  }, []);

  return (
    <div className={darkMode ? 'dark bg-gray-900 text-white' : 'bg-white text-gray-900'}>
      {/* Navbar & Dark Mode Toggle */}
      <header className="relative z-50">
        <div className="absolute right-5 top-4 z-50">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="bg-gray-200 dark:bg-gray-700 p-2 rounded-full shadow"
            title="Toggle Theme"
          >
            {darkMode ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-gray-800" />}
          </button>
        </div>
        <Navbar />
      </header>

      {/* Hero Slider */}
      <section className="mb-16 max-w-7xl mx-auto" data-aos="fade-up">
        <Swiper navigation={true} modules={[Navigation]} className="h-[400px] md:h-[600px] rounded-lg overflow-hidden">
          {[{
            img: 'https://i.ibb.co/DHd6Z8TS/1.jpg',
            text: 'Connect Through Shared Hobbies'
          }, {
            img: 'https://i.ibb.co/WpYmDYRW/3.jpg',
            text: 'Discover Cooking Groups'
          }, {
            img: 'https://i.ibb.co/VWSY34Sc/2-1.jpg',
            text: 'Paint, Draw & Inspire Together'
          }].map((slide, i) => (
            <SwiperSlide key={i} className="bg-cover bg-center relative" style={{ backgroundImage: `url(${slide.img})` }}>
              <div className="flex items-center justify-center h-full bg-black/50">
                <h2 className="text-white text-3xl md:text-5xl font-bold text-center">{slide.text}</h2>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Featured Groups */}
      <section className="max-w-7xl mx-auto px-6 mb-24" data-aos="fade-up">
        <h2 className="text-4xl font-bold text-center mb-10">🎯 Featured Groups</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredGroups.map(group => (
            <div
              key={group._id}
              className="transition hover:shadow-xl hover:-translate-y-1 duration-300 border rounded-xl overflow-hidden bg-white dark:bg-gray-800"
              data-aos="zoom-in"
            >
              <img src={group.imageUrl} alt={group.name} className="w-full h-48 object-cover" />
              <div className="p-5 space-y-2">
                <h3 className="text-xl font-bold text-green-600">{group.name}</h3>
                <p className="text-sm dark:text-gray-300">{group.description.slice(0, 90)}...</p>
                <p className="text-xs text-gray-500"><strong>Category:</strong> {group.category}</p>
                <p className="text-xs text-gray-500"><strong>Start Date:</strong> {group.startDate}</p>
                <Link
                  to={`/group/${group._id}`}
                  className="inline-block mt-3 text-white bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                  See Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Top Rated Groups */}
      <section className="py-20 px-6 bg-gray-100 dark:bg-gray-800" data-aos="fade-up">
        <h2 className="text-3xl font-bold text-center mb-10">⭐ Top Rated Groups</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md" data-aos="fade-up" data-aos-delay={i * 100}>
              <h3 className="text-xl font-semibold mb-2">Top Group {i + 1}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Highly-rated by community members.</p>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 px-6 bg-white dark:bg-gray-900" data-aos="fade-up">
        <h2 className="text-3xl font-bold text-center mb-10">📂 Popular Categories</h2>
        <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
          {["Photography", "Gaming", "Art", "Tech", "Cooking", "Crafts"].map(cat => (
            <span key={cat} className="px-4 py-2 bg-blue-100 dark:bg-blue-800 dark:text-white text-blue-700 rounded-full text-sm">
              {cat}
            </span>
          ))}
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-20 px-6 bg-gray-50 dark:bg-gray-800" data-aos="fade-up">
        <h2 className="text-3xl font-bold text-center mb-10">📝 Latest Blog Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow" data-aos="fade-up" data-aos-delay={i * 100}>
              <h3 className="text-xl font-bold mb-2">Blog Title {i + 1}</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">Short summary of an article or update.</p>
              <button className="mt-3 text-blue-600 dark:text-blue-400 hover:underline">Read More</button>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 px-6 bg-blue-600 dark:bg-blue-700 text-white text-center" data-aos="fade-up">
        <h2 className="text-3xl font-bold mb-4">📧 Subscribe to Newsletter</h2>
        <p className="mb-6">Stay updated with new groups, blogs & events.</p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-3">
          <input type="email" placeholder="Enter your email" className="p-2 rounded text-black w-64 bg-gray-200" />
          <button className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-100 transition">
            Subscribe
          </button>
        </div>
      </section>

      {/* How to Join */}
      <div className="bg-gradient-to-r from-cyan-100 to-blue-100 py-16 dark:bg-gray-700" data-aos="fade-up">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">🤝 How to Join a Group</h2>
          <p className="text-gray-950 dark:text-gray-950 text-lg leading-relaxed">
            To join a group, ensure it hasn’t reached its member limit and is still accepting new members. If it’s available, click the "Join Group" button and follow the registration process. Admins will review your request.
          </p>
        </div>
      </div>

      {/* Why Join Section */}
      <div className="bg-gradient-to-r from-yellow-100 to-pink-100 py-16 dark:bg-gray-700" data-aos="fade-up">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-pink-700 mb-4">🎯 Why Join a Hobby Group?</h2>
          <ul className="list-disc pl-6 text-gray-950 dark:text-gray-950 text-lg space-y-2">
            <li>Meet people with similar interests</li>
            <li>Learn and grow together</li>
            <li>Stay engaged with regular activities</li>
            <li>Be part of a supportive, fun community</li>
          </ul>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
