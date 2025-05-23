import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-16">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        {/* logo */}
        
        <div className="text-xl font-semibold">
          <img src="logomain.svg" alt="" className='inline'/>
          Hobby<span className="text-blue-400">Hub</span>
        </div>

        {/*  nav  */}
        <div className="flex gap-6 text-sm">
          <a href="/" className="hover:text-blue-400 transition">Home</a>
          <a href="/allGroups" className="hover:text-blue-400 transition">All Groups</a>
          <a href="/createGroup" className="hover:text-blue-400 transition">Create Group</a>
          <a href="#" className="hover:text-blue-400 transition">Help</a>
        </div>

        {/* Social icons */}
        <div className="flex gap-4 text-lg">
          <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-blue-400 transition">
            <FaFacebookF />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-blue-400 transition">
            <FaTwitter />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-pink-400 transition">
            <FaInstagram />
          </a>
        </div>
      </div>

      <div className="text-center mt-6 text-sm text-gray-400">
        &copy; {new Date().getFullYear()} HobbyHub. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
