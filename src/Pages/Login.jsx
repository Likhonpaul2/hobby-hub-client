import { useContext, useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router';
import { FaGoogle } from 'react-icons/fa';
import { AuthContext } from '../Context/AuthContext';
import { toast } from 'react-toastify';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

const Login = () => {
    const { signInUser, googleSignIn } = useContext(AuthContext);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogin = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        signInUser(email, password)
            .then(() => {
                toast.success('Login successful!');
                navigate(location.state || "/");
            })
            .catch((err) => {
                setError(err.message);
                toast.error('Login failed. Check email or password.');
            });
    };

    const handleGoogle = () => {
        googleSignIn()
            .then(() => {
                toast.success('Logged in with Google!');
                navigate(location.state || "/");
            })
            .catch((err) => {
                console.log(err);
                toast.error('Google login failed');
            });
    };

    return (
        <div>
            <header>
                <Navbar />
            </header>
            <main>
                <div className="min-h-screen flex items-center justify-center px-4">
                    <div className="max-w-md w-full p-6 rounded shadow">
                        <h2 className="text-2xl font-bold text-center mb-6">Login to HobbyHub</h2>
                        <form
                            onSubmit={handleLogin}
                            className="space-y-4">
                            <input type="email" name="email" placeholder="Email" className="w-full border p-2 rounded" required />
                            <input type="password" name="password" placeholder="Password" className="w-full border p-2 rounded" required />

                            {error && <p className="text-red-500 text-sm">{error}</p>}

                            <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
                                Login
                            </button>
                        </form>

                        <button
                            onClick={handleGoogle}
                            className="mt-4 w-full flex items-center justify-center gap-2 border py-2 rounded hover:bg-green-600">
                            <FaGoogle /> Continue with Google
                        </button>

                        <p className="mt-4 text-center text-sm">
                            Don't have an account?{' '}
                            <Link to="/register" className="text-blue-600 hover:underline">Register</Link>
                        </p>
                    </div>
                </div>
            </main>
            <footer>
                <Footer />
            </footer>
        </div>
    );
};

export default Login;
