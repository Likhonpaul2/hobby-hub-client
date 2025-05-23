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

        fetch("https://hobby-hub-server-five.vercel.app/groups",
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

            <main className='min-h-screen'>
                <div className="max-w-3xl mx-auto p-6 shadow-md rounded mt-6">
                    <h2 className="text-2xl font-bold mb-4 text-center">Create a New Hobby Group</h2>
                    <form onSubmit={handleCreateGroup} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col">
                            <label htmlFor="groupName" className="mb-1 font-medium">Group Name</label>
                            <input id="groupName" name="groupName" type="text" placeholder="Group Name" required className="border p-2 rounded" />
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="category" className="mb-1 font-medium">Hobby Category</label>
                            <select id="category" name="category" required className="border p-2 rounded">
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
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="location" className="mb-1 font-medium">Meeting Location</label>
                            <input id="location" name="location" type="text" placeholder="Meeting Location" required className="border p-2 rounded" />
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="maxMembers" className="mb-1 font-medium">Max Members</label>
                            <input id="maxMembers" name="maxMembers" type="number" placeholder="Max Members" required className="border p-2 rounded" />
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="startDate" className="mb-1 font-medium">Start Date</label>
                            <input id="startDate" name="startDate" type="date" required className="border p-2 rounded" />
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="image" className="mb-1 font-medium">Image URL</label>
                            <input id="image" name="image" type="text" placeholder="Image URL" required className="border p-2 rounded" />
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="createdByName" className="mb-1 font-medium">Created By</label>
                            <input
                                id="createdByName"
                                type="text"
                                value={user?.displayName}
                                readOnly
                                className="border p-2 rounded bg-gray-800"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="createdByEmail" className="mb-1 font-medium">Email</label>
                            <input
                                id="createdByEmail"
                                type="email"
                                value={user?.email}
                                readOnly
                                className="border p-2 rounded bg-gray-800"
                            />
                        </div>

                        <div className="flex flex-col md:col-span-2">
                            <label htmlFor="description" className="mb-1 font-medium">Group Description</label>
                            <textarea
                                id="description"
                                name="description"
                                placeholder="Group Description"
                                required
                                className="border p-2 rounded"
                            ></textarea>
                        </div>

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
