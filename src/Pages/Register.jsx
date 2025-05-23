import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../Context/AuthContext';
import { toast } from 'react-toastify';

const Register = () => {
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const [error, setError] = useState('');
  const navigate = useNavigate();


  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photoURL = form.photoURL.value;
    const email = form.email.value;
    const password = form.password.value;

    // Password validation
    if (!/[A-Z]/.test(password)) {
      setError('Password must contain at least one uppercase letter.');
      toast.error('Password must contain at least one uppercase letter.');
      return;
    }
    if (!/[a-z]/.test(password)) {
      setError('Password must contain at least one lowercase letter.');
      toast.error('Password must contain at least one lowercase letter.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      toast.error('Password must be at least 6 characters long.');
      return;
    }



    // create user and update display name and profilePic
    createUser(email, password)
      .then(() => {
        updateUserProfile(name, photoURL)
          .then(() => {
            toast.success('Registered successfully!');
            navigate('/');
          })
          .catch((err) => {
            console.log(err);
            toast.error('Profile update failed.');
          });
      })
      .catch((err) => {
        console.log(err);
        setError(err.message);
        toast.error('Registration failed. Try a different email.');
      });
  };

  // page title 
  useEffect(() => {
    document.title = "Register | Hobby Hub"
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full  p-6 rounded shadow">
        <h2 className="text-3xl font-bold text-center mb-6">Create a HobbyHub Account</h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <input type="text" name="name" placeholder="Full Name" className="w-full border p-2 rounded" required />
          <input type="text" name="photoURL" placeholder="Photo URL" className="w-full border p-2 rounded" required />
          <input type="email" name="email" placeholder="Email" className="w-full border p-2 rounded" required />
          <input type="password" name="password" placeholder="Password" className="w-full border p-2 rounded" required />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
            Register
          </button>
        </form>

        <p className="mt-4 text-center text-sm">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
