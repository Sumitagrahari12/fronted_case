import React, { useState, useEffect } from "react";

const AdminDashboard = () => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProfile, setEditingProfile] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    address: "",
    email: "",
    phone: "",
    interests: "",
    bio: "",
    image: "",
  });

  useEffect(() => {
    // Simulated API call (Replace with real API in production)
    const fetchProfiles = async () => {
      try {
        const mockProfiles = [
          {
            id: 1,
            name: "John Doe",
            description: "Software Engineer",
            address: "New Delhi, India",
            image: "https://randomuser.me/api/portraits/men/1.jpg",
            email: "john.doe@example.com",
            phone: "+91 1234567890",
            interests: "Technology, Travel, Photography",
            bio: "Passionate software engineer with 5 years of experience in web development.",
          },
        ];
        setProfiles(mockProfiles);
      } catch (error) {
        console.error("Error fetching profiles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingProfile) {
      // Update existing profile
      setProfiles((prevProfiles) =>
        prevProfiles.map((profile) =>
          profile.id === editingProfile.id ? { ...formData, id: editingProfile.id } : profile
        )
      );
    } else {
      // Create new profile
      setProfiles((prevProfiles) => [
        ...prevProfiles,
        { ...formData, id: prevProfiles.length + 1 }, // Assigning a unique ID
      ]);
    }

    // Reset form & close editor
    setFormData({
      name: "",
      description: "",
      address: "",
      email: "",
      phone: "",
      interests: "",
      bio: "",
      image: "",
    });
    setEditingProfile(null);
  };

  const handleEdit = (profile) => {
    setEditingProfile(profile);
    setFormData({ ...profile });
  };

  const handleDelete = (id) => {
    setProfiles(profiles.filter((profile) => profile.id !== id));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <button
          onClick={() => {
            setEditingProfile(null);
            setFormData({
              name: "",
              description: "",
              address: "",
              email: "",
              phone: "",
              interests: "",
              bio: "",
              image: "",
            });
          }}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300"
        >
          Add New Profile
        </button>
      </div>

      {editingProfile !== undefined && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            {editingProfile ? "Edit Profile" : "Add New Profile"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {Object.keys(formData).map((key) => (
              <div key={key}>
                <label className="block text-sm font-medium text-gray-700 capitalize">
                  {key.replace("_", " ")}
                </label>
                <input
                  type={key === "email" ? "email" : key === "phone" ? "tel" : "text"}
                  value={formData[key]}
                  onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
            ))}
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => setEditingProfile(undefined)}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300"
              >
                {editingProfile ? "Update Profile" : "Create Profile"}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Address
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {profiles.map((profile) => (
              <tr key={profile.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <img
                      className="h-10 w-10 rounded-full"
                      src={profile.image}
                      alt={profile.name}
                    />
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{profile.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{profile.description}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{profile.address}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleEdit(profile)}
                    className="text-blue-600 hover:text-blue-900 mr-4"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(profile.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
