import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { AuthContext } from '../Context/AuthContext';
import Swal from 'sweetalert2';

const MyGroups = () => {
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    //   const fetchGroups = async () => {
    //     try {
    //       const res = await fetch(`${import.meta.env.VITE_API_URL}/groups?email=${user.email}`);
    //       const data = await res.json();
    //       setGroups(data);
    //     } catch (err) {
    //       console.error(err);
    //       toast.error('Failed to load groups');
    //     } finally {
    //       setLoading(false);
    //     }
    //   };

    //   useEffect(() => {
    //     if (user?.email) {
    //       fetchGroups();
    //     }
    //   }, [user?.email]);

    const fetchGroups = () => {
        fetch('http://localhost:3000/groups')
            .then(res => res.json())
            .then(data => {
                setGroups(data);
                setLoading(false);
            })
    }
    useEffect(() => {
        fetchGroups();
    }, [])

    // const handleDelete = async (id) => {
    //     const confirmDelete = confirm('Are you sure you want to delete this group?');
    //     if (!confirmDelete) return;

    //     try {
    //         const res = await fetch(`${import.meta.env.VITE_API_URL}/groups/${id}`, {
    //             method: 'DELETE',
    //         });

    //         const data = await res.json();
    //         if (data.deletedCount > 0) {
    //             toast.success('Group deleted');
    //             setGroups(groups.filter(group => group._id !== id));
    //         } else {
    //             toast.error('Failed to delete group');
    //         }
    //     } catch (err) {
    //         console.error(err);
    //         toast.error('Server error');
    //     }
    // };

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });

                // delete from db 
                fetch(`http://localhost:3000/groups/${id}`, {
                    method: "DELETE",
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            toast.success('Group deleted');

                            const remainingGroups = groups.filter(group => group._id !== id);

                            setGroups(remainingGroups);
                        } else {
                            toast.error('Failed to delete group');
                        }
                    })
                    .catch(() => {
                        toast.error('Server error');
                    });

            }
        });


    }

    const handleUpdate = (id) => {
        navigate(`/updateGroup/${id}`);
    };

    if (loading) {
        return <p className="text-center mt-10">Loading...</p>;
    }

    return (
        <div className="max-w-5xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">My Created Groups</h2>
            {groups.length === 0 ? (
                <p>You haven’t created any groups yet.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table-auto w-full border">
                        <thead>
                            <tr className="">
                                <th className="p-2 border">Group Name</th>
                                <th className="p-2 border">Category</th>
                                <th className="p-2 border">Max Members</th>
                                <th className="p-2 border">Start Date</th>
                                <th className="p-2 border">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {groups.map((group) => (
                                <tr key={group._id} className="text-center">
                                    <td className="p-2 border">{group.name}</td>
                                    <td className="p-2 border">{group.category}</td>
                                    <td className="p-2 border">{group.maxMembers}</td>
                                    <td className="p-2 border">{group.startDate}</td>
                                    <td className="p-2 border space-x-2">
                                        <button
                                            onClick={() => handleUpdate(group._id)}
                                            className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700"
                                        >
                                            Update
                                        </button>
                                        <button
                                            onClick={() => handleDelete(group._id)}
                                            className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default MyGroups;
