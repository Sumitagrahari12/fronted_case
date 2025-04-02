import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px"
};

const ProfileDetails = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const mockProfiles = [
      {
        id: 1,
        name: "John Doe",
        description: "Software Engineer",
        address: "New Delhi, India",
        coordinates: { lat: 28.6139, lng: 77.2090 },
        image: "https://randomuser.me/api/portraits/men/1.jpg",
        email: "john.doe@example.com",
        phone: "+91 1234567890",
        interests: ["Technology", "Travel", "Photography"],
        bio: "Passionate software engineer with 5 years of experience in web development."
      },
      {
        id: 2,
        name: "Jane Smith",
        description: "Data Scientist",
        address: "Mumbai, India",
        coordinates: { lat: 19.0760, lng: 72.8777 },
        image: "https://via.placeholder.com/150",
        email: "jane.smith@example.com",
        phone: "+91 9876543210",
        interests: ["AI", "Machine Learning", "Reading"],
        bio: "Experienced data scientist specializing in AI and big data analysis."
      },
      {
        id: 3,
        name: "Mike Johnson",
        description: "Product Manager",
        address: "Bangalore, India",
        coordinates: { lat: 12.9716, lng: 77.5946 },
        image: "https://via.placeholder.com/150",
        email: "alice.johnson@example.com",
        phone: "+91 8765432109",
        interests: ["Business", "Innovation", "Marketing"],
        bio: "Strategic product manager with a passion for building user-centric solutions."
      },
      {
        id: 4,
        name: "Sarah Williams",
        description: "UX Researcher",
        address: "Chennai, India",
        coordinates: { lat: 13.0827, lng: 80.2707 },
        image: "https://randomuser.me/api/portraits/men/9.jpg",
        email: "sarah.williams@example.com",
        phone: "+91 7654321098",
        interests: ["User Experience", "Psychology", "Design Thinking"],
        bio: "A UX researcher passionate about creating user-friendly experiences through data-driven design."
      },
      {
        id: 5,
        name: "Amit Verma",
        description: "Frontend Developer",
        address: "Pune, India",
        coordinates: { lat: 18.5204, lng: 73.8567 },
        image: "https://randomuser.me/api/portraits/men/15.jpg",
        email: "amit.verma@example.com",
        phone: "+91 9988776655",
        interests: ["React", "JavaScript", "CSS"],
        bio: "A creative frontend developer specializing in React and modern web development."
      },
      {
        id: 6,
        name: "Priya Sharma",
        description: "UI/UX Designer",
        address: "Hyderabad, India",
        coordinates: { lat: 17.3850, lng: 78.4867 },
        image: "https://randomuser.me/api/portraits/women/20.jpg",
        email: "priya.sharma@example.com",
        phone: "+91 8877665544",
        interests: ["Design", "User Research", "Illustration"],
        bio: "Passionate about creating engaging and user-friendly interfaces through intuitive design."
      },
      {
        id: 7,
        name: "Rahul Mehta",
        description: "Full Stack Developer",
        address: "Kolkata, India",
        coordinates: { lat: 22.5726, lng: 88.3639 },
        image: "https://randomuser.me/api/portraits/men/25.jpg",
        email: "rahul.mehta@example.com",
        phone: "+91 7766554433",
        interests: ["Node.js", "MongoDB", "Express.js"],
        bio: "A dedicated full stack developer working with the latest web technologies to build scalable applications."
      },
      {
        id: 8,
        name: "Sneha Kapoor",
        description: "Data Analyst",
        address: "Ahmedabad, India",
        coordinates: { lat: 23.0225, lng: 72.5714 },
        image: "https://randomuser.me/api/portraits/women/30.jpg",
        email: "sneha.kapoor@example.com",
        phone: "+91 6655443322",
        interests: ["Data Visualization", "SQL", "Python"],
        bio: "A detail-oriented data analyst with expertise in SQL and data visualization tools."
      }
      
    ];

    const foundProfile = mockProfiles.find(profile => profile.id === parseInt(id));
    setProfile(foundProfile || null);
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="text-center py-8">
        <h2 className="text-2xl font-bold text-gray-900">Profile not found</h2>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <div className="flex items-center">
            <img
              src={profile.image}
              alt={profile.name}
              className="w-24 h-24 rounded-full object-cover"
            />
            <div className="ml-6">
              <h1 className="text-3xl font-bold text-gray-900">{profile.name}</h1>
              <p className="text-xl text-gray-600">{profile.description}</p>
              <p className="text-gray-500">{profile.address}</p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact Information</h2>
              <div className="space-y-2">
                <p className="text-gray-600">
                  <span className="font-medium">Email:</span> {profile.email}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Phone:</span> {profile.phone}
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Interests</h2>
              <div className="flex flex-wrap gap-2">
                {profile.interests.map((interest, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Bio</h2>
            <p className="text-gray-600">{profile.bio}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Location</h2>
          <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={profile.coordinates}
              zoom={12}
            >
              <Marker position={profile.coordinates} />
            </GoogleMap>
          </LoadScript>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
