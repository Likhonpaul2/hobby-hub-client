import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";

const AboutUs = () => {
    return (

        <>
        <Navbar/>
        <section className="bg-white dark:bg-gray-900 py-16 px-6">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">

                {/* Text Content */}
                <div className="md:w-1/2">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-blue-600">About Us</h2>
                    <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                        At <span className="font-semibold text-blue-500">HobbyHub</span>, we believe that hobbies are more than just pastimes — they're ways to build meaningful connections and grow personally.
                        Our platform helps people discover, join, and create hobby groups that match their interests. Whether it's photography, painting, gaming, cooking, or crafts — there's a place for everyone here!
                    </p>
                    <p className="mt-4 text-gray-700 dark:text-gray-300 text-md">
                        We are committed to fostering a supportive, creative, and diverse community where everyone feels welcome. Join us and turn your passions into lifelong friendships.
                    </p>
                </div>

                {/* Image */}
                <div className="md:w-1/2">
                    <img
                        src="logomain.svg"
                        alt="About HobbyHub"
                        className="rounded-xl shadow-lg w-full"
                    />
                </div>
            </div>
        </section>
        <Footer/>
        </>
    );
};

export default AboutUs;
