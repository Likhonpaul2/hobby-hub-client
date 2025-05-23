import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { AuthContext } from '../Context/AuthContext';
import Swal from 'sweetalert2';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import Spinner from '../Components/Spinner';

const MyGroups = () => {

    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();


    //  page title 
    useEffect(() => {
        document.title = "My Groups | Hobby Hub"
    }, []);

    //  fetch groups from DB 
    useEffect(() => {
        fetch(`https://hobby-hub-server-five.vercel.app/groups`)
            .then(res => res.json())
            .then(data => {
                setGroups(data);
                setLoading(false);
            })
            .catch(() => {
                toast.error('Failed to fetch groups');
                setLoading(false);
            });
    }, []);


    // group delete from DB 
    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this group!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {

                // delete group from db 
                fetch(`https://hobby-hub-server-five.vercel.app/groups/${id}`, {
                    method: 'DELETE',
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            toast.success('Group deleted successfully');
                            setGroups(groups.filter(group => group._id !== id));
                        } else {
                            toast.error('Failed to delete group');
                        }
                    })
                    .catch(() => {
                        toast.error('Server error');
                    });
            }
        });
    };

    // Group update 
    const handleUpdate = (id) => {
        navigate(`/updateGroup/${id}`);
    };

    // spinner 
    if (loading) {
        return <Spinner />
    }

    return (
        <div>
            <header>
                {/* navbar  */}
                <Navbar />
            </header>

            {/* my groups  */}
            <main className="max-w-6xl mx-auto p-6 min-h-screen">
                <h2 className="text-3xl font-bold mb-6 text-center">My Created Groups</h2>
                {groups.length === 0 ? (
                    <p className="text-center">You haven’t created any groups yet.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {groups.map((group) => (
                            <div key={group._id} className=" shadow-lg rounded-lg overflow-hidden">
                                <img
                                    src={group.image}
                                    alt={group.name}
                                    className="h-48 w-full object-cover"
                                />
                                <div className="p-4">
                                    <h3 className="text-xl font-semibold">{group.name}</h3>
                                    <p className="text-gray-600 mt-1">Category: {group.category}</p>
                                    <p className="text-gray-600">Max Members: {group.maxMembers}</p>
                                    <p className="text-gray-600">Start Date: {group.startDate}</p>
                                    <div className="mt-4 flex gap-2">
                                        <button
                                            onClick={() => handleUpdate(group._id)}
                                            className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
                                        >
                                            Update
                                        </button>
                                        <button
                                            onClick={() => handleDelete(group._id)}
                                            className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>

                {/* footer */}
            <footer className="mt-12">
                <Footer />
            </footer>
        </div>
    );
};

export default MyGroups;
