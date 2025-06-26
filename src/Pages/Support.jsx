import React from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { FaQuestionCircle, FaUserShield, FaBug, FaLifeRing } from 'react-icons/fa';

const Support = () => {
  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      <Navbar />

      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center mb-10">🛟 Support & Help Center</h2>

        <div className="grid md:grid-cols-2 gap-8">
          {/* FAQ */}
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl shadow-md">
            <div className="flex items-center mb-4 text-green-600 text-2xl">
              <FaQuestionCircle className="mr-2" />
              <h3 className="text-xl font-semibold">Frequently Asked Questions</h3>
            </div>
            <ul className="space-y-3 text-gray-700 dark:text-gray-300">
              <li><strong>How do I join a group?</strong> → Just visit a group page and click "Join Group" if it's active.</li>
              <li><strong>Can I create my own group?</strong> → Yes, after logging in, go to the "Create Group" page.</li>
              <li><strong>Can I update or delete my group?</strong> → Yes, visit "My Groups" and manage your groups easily.</li>
            </ul>
          </div>

          {/* Report an Issue */}
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl shadow-md">
            <div className="flex items-center mb-4 text-red-600 text-2xl">
              <FaBug className="mr-2" />
              <h3 className="text-xl font-semibold">Report a Bug or Issue</h3>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Found something broken? Help us improve HobbyHub!
            </p>
            <a
              href="mailto:support@hobbyhub.com"
              className="inline-block bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
            >
              📧 Email Support
            </a>
          </div>

          {/* Privacy & Account Help */}
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl shadow-md">
            <div className="flex items-center mb-4 text-blue-600 text-2xl">
              <FaUserShield className="mr-2" />
              <h3 className="text-xl font-semibold">Account & Privacy</h3>
            </div>
            <ul className="space-y-3 text-gray-700 dark:text-gray-300">
              <li><strong>Is my email visible?</strong> → No, user emails are kept private.</li>
              <li><strong>How do I log out?</strong> → Click your profile photo and select "Logout".</li>
              <li><strong>Is my data safe?</strong> → We use Firebase Auth and secure DB practices.</li>
            </ul>
          </div>

          {/* Live Help / Contact */}
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl shadow-md">
            <div className="flex items-center mb-4 text-purple-600 text-2xl">
              <FaLifeRing className="mr-2" />
              <h3 className="text-xl font-semibold">Live Help</h3>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Need urgent help? Reach out anytime.
            </p>
            <a
              href="tel:+8801234567890"
              className="inline-block bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
            >
              📞 Call Now
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Support;
