import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 mt-20">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Logo and About */}
        <div>
          <div className="flex items-center gap-2 text-2xl font-bold mb-2">
            <img src="/logomain.svg" alt="Logo" className="w-8 h-8" />
            Hobby<span className="text-blue-400">Hub</span>
          </div>
          <p className="text-gray-400 text-sm">
            HobbyHub is your gateway to discovering and connecting with hobby groups in your local area.
          </p>
        </div>

        {/* Useful Links */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-blue-400 transition">Home</Link></li>
            <li><Link to="/allGroups" className="hover:text-blue-400 transition">All Groups</Link></li>
            <li><Link to="/createGroup" className="hover:text-blue-400 transition">Create Group</Link></li>
            <li><Link to="#" className="hover:text-blue-400 transition">Help Center</Link></li>
            <li><Link to="#" className="hover:text-blue-400 transition">Blog</Link></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Follow Us</h3>
          <div className="flex gap-4 text-lg">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-blue-400 transition">
              <FaFacebookF />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-blue-400 transition">
              <FaTwitter />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-blue-400 transition">
              <FaLinkedinIn />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-pink-400 transition">
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>

      <div className="text-center mt-8 text-sm text-gray-400">
        &copy; {new Date().getFullYear()} HobbyHub. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
