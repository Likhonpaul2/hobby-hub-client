import { useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { AuthContext } from '../Context/AuthContext';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

const CreateGroup = () => {

    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleCreateGroup = (e) => {
        e.preventDefault();
        setLoading(true);
        const form = e.target;

        const newGroup = {
            name: form.groupName.value,
            category: form.category.value,
            description: form.description.value,
            location: form.location.value,
            maxMembers: parseInt(form.maxMembers.value),
            startDate: form.startDate.value,
            image: form.image.value,
            createdByName: user?.displayName,
            createdByEmail: user.email,
        };

        fetch("http://localhost:3000/groups",
            {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(newGroup)
            }
        )
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    toast.success('Group created successfully!');
                    navigate('/myGroups');
                    setLoading(false);
                    form.reset();

                } else {
                    toast.error('Failed to create group.');
                }
            })

        // try {
        //   const res = await fetch(`${import.meta.env.VITE_API_URL}/groups`, {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(newGroup),
        //   });

        //   const data = await res.json();
        //   if (data.insertedId) {
        //     toast.success('Group created successfully!');
        //     navigate('/myGroups');
        //   } else {
        //     toast.error('Failed to create group.');
        //   }
        // } catch (err) {
        //   console.error(err);
        //   toast.error('Server error.');
        // } finally {
        //   setLoading(false);
        // }
    };



    return (
        <div>
            <header>
                <Navbar />
            </header>

            <main>
                <div className="max-w-3xl mx-auto p-6 shadow-md rounded mt-6">
                    <h2 className="text-2xl font-bold mb-4 text-center">Create a New Hobby Group</h2>
                    <form onSubmit={handleCreateGroup} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input name="groupName" type="text" placeholder="Group Name" required className="border p-2 rounded" />

                        <select name="category" required className="border p-2 rounded">
                            <option value="" className="bg-black text-white">Select Hobby Category</option>
                            <option value="Drawing & Painting" className="bg-black text-white">Drawing & Painting</option>
                            <option value="Photography" className="bg-black text-white">Photography</option>
                            <option value="Video Gaming" className="bg-black text-white">Video Gaming</option>
                            <option value="Fishing" className="bg-black text-white">Fishing</option>
                            <option value="Running" className="bg-black text-white">Running</option>
                            <option value="Cooking" className="bg-black text-white">Cooking</option>
                            <option value="Reading" className="bg-black text-white">Reading</option>
                            <option value="Writing" className="bg-black text-white">Writing</option>
                        </select>

                        <input name="location" type="text" placeholder="Meeting Location" required className="border p-2 rounded" />
                        <input name="maxMembers" type="number" placeholder="Max Members" required className="border p-2 rounded" />
                        <input name="startDate" type="date" required className="border p-2 rounded" />
                        <input name="image" type="text" placeholder="Image URL" required className="border p-2 rounded" />

                        <input type="text"
                            value={user?.displayName}
                            readOnly className="border p-2 rounded bg-gray-800" />
                        <input type="email"
                            value={user?.email}
                            readOnly className="border p-2 rounded bg-gray-800" />

                        <textarea
                            name="description"
                            placeholder="Group Description"
                            required
                            className="border p-2 rounded md:col-span-2"
                        ></textarea>

                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 md:col-span-2"
                        >
                            {loading ? 'Creating...' : 'Create'}
                        </button>
                    </form>
                </div>
            </main>
            <footer>
                <Footer />
            </footer>
        </div>
    );
};

export default CreateGroup;
