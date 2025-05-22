import {  useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { AuthContext } from '../Context/AuthContext';
import { toast } from 'react-toastify';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

const UpdateGroup = () => {
  const { id } = useParams();
  
//   const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [groupData, setGroupData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3000/groups/${id}`)
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGroupData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`http://localhost:3000/groups/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(groupData),
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
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!groupData) return <p className="text-center mt-10">Group not found</p>;

  return (
    <div>
      <Navbar />
      <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Update Group</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={groupData.name}
            onChange={handleChange}
            placeholder="Group Name"
            className="w-full p-2 border rounded"
            required
          />
          <select
            name="category"
            value={groupData.category}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select Category</option>
            <option>Drawing & Painting</option>
            <option>Photography</option>
            <option>Video Gaming</option>
            <option>Fishing</option>
            <option>Running</option>
            <option>Cooking</option>
            <option>Reading</option>
            <option>Writing</option>
          </select>
          <textarea
            name="description"
            value={groupData.description}
            onChange={handleChange}
            placeholder="Group Description"
            className="w-full p-2 border rounded"
            rows={3}
            required
          />
          <input
            type="text"
            name="location"
            value={groupData.location}
            onChange={handleChange}
            placeholder="Meeting Location"
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="number"
            name="maxMembers"
            value={groupData.maxMembers}
            onChange={handleChange}
            placeholder="Max Members"
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="date"
            name="startDate"
            value={groupData.startDate}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            name="imageUrl"
            value={groupData.imageUrl}
            onChange={handleChange}
            placeholder="Image URL"
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            value={groupData.userName}
            readOnly
            className="w-full p-2 border bg-gray-100 rounded"
          />
          <input
            type="email"
            value={groupData.userEmail}
            readOnly
            className="w-full p-2 border bg-gray-100 rounded"
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
