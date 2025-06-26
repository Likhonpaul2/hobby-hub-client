import React from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';

const Contact = () => {
  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      <Navbar />

      <section className="max-w-5xl mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center mb-10">📞 Contact Us</h2>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Contact Info */}
          <div className="space-y-6">
            <p className="text-lg">
              Have a question, feedback, or just want to say hello? Fill out the form or contact us directly!
            </p>
            <div className="flex items-center space-x-4">
              <FaMapMarkerAlt className="text-green-600 text-xl" />
              <span>Dhaka, Bangladesh</span>
            </div>
            <div className="flex items-center space-x-4">
              <FaEnvelope className="text-green-600 text-xl" />
              <span>support@hobbyhub.com</span>
            </div>
            <div className="flex items-center space-x-4">
              <FaPhoneAlt className="text-green-600 text-xl" />
              <span>+880 1234 567890</span>
            </div>
          </div>

          {/* Contact Form */}
          <form className="space-y-4 bg-gray-50 dark:bg-gray-800 p-6 rounded-xl shadow-md">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-3 rounded border dark:bg-gray-700 dark:text-white"
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-3 rounded border dark:bg-gray-700 dark:text-white"
              required
            />
            <textarea
              rows="5"
              placeholder="Your Message"
              className="w-full p-3 rounded border dark:bg-gray-700 dark:text-white"
              required
            />
            <button
              type="submit"
              className="bg-green-600 text-white py-2 px-6 rounded hover:bg-green-700 transition duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
