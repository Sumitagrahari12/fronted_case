import React from "react";

import { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import ProfileCard from '../components/ProfileCard';

const containerStyle = {
  width: '100%',
  height: '400px'
};

const center = {
  lat: 20.5937,
  lng: 78.9629
};

const Home = () => {
  const [profiles, setProfiles] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Replace with actual API call
    const fetchProfiles = async () => {
      try {
        // Simulated data
        const mockProfiles = [
          {
            id: 1,
            name: 'John Doe',
            description: 'Software Engineer',
            address: 'New Delhi, India',
            coordinates: { lat: 28.6139, lng: 77.2090 },
            image: 'https://randomuser.me/api/portraits/men/1.jpg'
          },
          {
            id: 2,
            name: 'Jane Smith',
            description: 'Product Designer',
            address: 'Mumbai, India',
            coordinates: { lat: 19.0760, lng: 72.8777 },
            image: 'https://randomuser.me/api/portraits/men/19.jpg'
          },
          {
            id: 3,
            name: 'Mike Johnson',
            description: 'Data Scientist',
            address: 'Bangalore, India',
            coordinates: { lat: 12.9716, lng: 77.5946 },
            image: 'https://randomuser.me/api/portraits/men/7.jpg'
          },
          {
            id: 4,
            name: 'Sarah Williams',
            description: 'UX Researcher',
            address: 'Chennai, India',
            coordinates: { lat: 13.0827, lng: 80.2707 },
            image: 'https://randomuser.me/api/portraits/men/9.jpg'
          },
          {
            id: 5,
            name: "Amit Verma",
            description: "Frontend Developer",
            address: "Pune, India",
            coordinates: { lat: 18.5204, lng: 73.8567 },
            image: "https://randomuser.me/api/portraits/men/15.jpg"
          },
          {
            id: 6,
            name: "Priya Sharma",
            description: "UI/UX Designer",
            address: "Hyderabad, India",
            coordinates: { lat: 17.3850, lng: 78.4867 },
            image: "https://randomuser.me/api/portraits/women/20.jpg"
          },
          {
            id: 7,
            name: "Rahul Mehta",
            description: "Full Stack Developer",
            address: "Kolkata, India",
            coordinates: { lat: 22.5726, lng: 88.3639 },
            image: "https://randomuser.me/api/portraits/men/25.jpg"
          },
          {
            id: 8,
            name: "Sneha Kapoor",
            description: "Data Analyst",
            address: "Ahmedabad, India",
            coordinates: { lat: 23.0225, lng: 72.5714 },
            image: "https://randomuser.me/api/portraits/women/30.jpg"
          }
        ];
        setProfiles(mockProfiles);
      } catch (error) {
        console.error('Error fetching profiles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  const filteredProfiles = profiles.filter(profile =>
    profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    profile.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    profile.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Profiles</h1>
        <input
          type="text"
          placeholder="Search profiles..."
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          {filteredProfiles.map(profile => (
            <ProfileCard
              key={profile.id}
              profile={profile}
              onSelect={() => setSelectedProfile(profile)}
            />
          ))}
        </div>

        <div className="sticky top-4">
          <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={selectedProfile ? selectedProfile.coordinates : center}
              zoom={selectedProfile ? 12 : 5}
            >
              {selectedProfile && (
                <Marker position={selectedProfile.coordinates} />
              )}
            </GoogleMap>
          </LoadScript>
        </div>
      </div>
    </div>
  );
};

export default Home; 