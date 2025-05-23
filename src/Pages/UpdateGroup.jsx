import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { AuthContext } from '../Context/AuthContext';
import { toast } from 'react-toastify';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import Spinner from '../Components/Spinner';

const UpdateGroup = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [groupData, setGroupData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://hobby-hub-server-five.vercel.app/groups/${id}`)
      .then(res => res.json())
      .then(data => {
        setGroupData(data);
        setLoading(false);
      })
      .catch(() => {
        toast.error('Failed to load group');
        setLoading(false);
      });
  }, [id]);


  //   const { name, value } = e.target;
  //   setGroupData(prev => ({ ...prev, [name]: value }));
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   fetch(`https://hobby-hub-server-five.vercel.app/groups/${id}`, {
  //     method: 'PUT',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(groupData),
  //   })
  //     .then(res => res.json())
  //     .then(data => {
  //       if (data.modifiedCount > 0) {
  //         toast.success('Group updated successfully!');
  //         navigate('/myGroups');
  //       } else {
  //         toast.warning('No changes made');
  //       }
  //     })
  //     .catch(() => {
  //       toast.error('Update failed');
  //     });
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const updatedGroup = Object.fromEntries(formData.entries());


    fetch(`https://hobby-hub-server-five.vercel.app/groups/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedGroup),
    })
      .then(res => res.json())
      .then(data => {
        if (data.modifiedCount > 0) {
          toast.success('Group updated successfully!');
          navigate('/myGroups');
        } else {
          toast.warning('No changes made');
        }
      })
      .catch(() => {
        toast.error('Update failed');
      });
  }

  if (loading) return <Spinner />;
  if (!groupData) return <p className="text-center mt-10">Group not found</p>;




  return (
    <div>
      <Navbar />
      <div className="max-w-2xl mx-auto mt-10 p-6  shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Update Group</h2>
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <input
            type="text"
            name="name"
            defaultValue={groupData.name}

            placeholder="Group Name"
            className="w-full p-2 border rounded"
            required
          />
          <select
            name="category"
            defaultValue={groupData.category}
            className="w-full p-2 border rounded"
            required
          >
            <option defaultValue="" className="bg-black text-white">Select Category</option>
            <option className="bg-black text-white">Drawing & Painting</option>
            <option className="bg-black text-white">Photography</option>
            <option className="bg-black text-white">Video Gaming</option>
            <option className="bg-black text-white">Fishing</option>
            <option className="bg-black text-white">Running</option>
            <option className="bg-black text-white">Cooking</option>
            <option className="bg-black text-white">Reading</option>
            <option className="bg-black text-white">Writing</option>
          </select>
          <textarea
            name="description"
            defaultValue={groupData.description}
            placeholder="Group Description"
            className="w-full p-2 border rounded"
            rows={3}
            required
          />
          <input
            type="text"
            name="location"
            defaultValue={groupData.location}
            placeholder="Meeting Location"
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="number"
            name="maxMembers"
            defaultValue={groupData.maxMembers}
            placeholder="Max Members"
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="date"
            name="startDate"
            defaultValue={groupData.startDate}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            name="image"
            defaultValue={groupData.image}
            placeholder="Image URL"
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            defaultValue={groupData.createdByName}
            readOnly
            className="w-full p-2 border  rounded"
          />
          <input
            type="email"
            defaultValue={groupData.createdByEmail}
            readOnly
            className="w-full p-2 border  rounded"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Update Group
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default UpdateGroup;
