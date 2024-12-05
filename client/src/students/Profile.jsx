import React, { useState, useEffect } from "react";
import axios from "axios";
import { Edit, Save, X, Linkedin, Github, FileText, Phone, Mail } from "lucide-react";
import { jwtDecode } from 'jwt-decode'; // Corrected import


// Component for displaying the avatar
const ProfileAvatar = ({ name, imageUrl }) => (
  <div className="w-32 h-32 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 text-4xl font-bold">
    {imageUrl ? (
      <img src={imageUrl} alt={name} className="w-full h-full object-cover rounded-full" />
    ) : (
      name.charAt(0)
    )}
  </div>
);

// Component for displaying profile statistics in card style
const StatCard = ({ label, value, valueClassName = "text-gray-800" }) => (
  <div className="bg-white p-4 rounded-xl shadow-sm">
    <p className="text-sm text-gray-500 font-medium">{label}</p>
    <p className={`text-xl font-bold ${valueClassName}`}>{value}</p>
  </div>
);

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [temp, setTemp] = useState(null)
  const [profile, setProfile] = useState({
    name: "",
    branch: "",
    batchYear: "",
    phone: "",
    email: "",
    linkedinURL: "",
    githubURL: "",
    resumeURL: "",
    semCgpa: [],
    activeBacklogs: 0,
  });

  const fetchProfile = async (userId) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_URL_API}/api/student/${userId}`);

      const data = response.data;
      setProfile(data);
      setTemp(userId)

    } catch (error) {
      console.error('Failed to fetch user data:', error.response ? error.response.data : error.message);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('Authorization');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const userId = decoded.userId;
        fetchProfile(userId);
      } catch (error) {
        console.error('Failed to decode token:', error);
      }
    }
  }, []);


  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  // Handle semester GPA changes
  const handleSemesterGPAChange = (index, value) => {
    const newSemCgpa = [...profile.semCgpa];
    newSemCgpa[index] = parseFloat(value);
    setProfile((prev) => ({ ...prev, semCgpa: newSemCgpa }));
  };

  // Submit the profile updates
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${import.meta.env.VITE_URL_API}/api/student/update/${temp}`, profile);
      console.log("Profile updated successfully:", response.data);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-gradient-to-br from-blue-50 to-white shadow-lg rounded-2xl p-6 border border-gray-100">
        <div className="flex flex-col md:flex-row">
          {/* Left section - Profile Avatar and Info */}
          <div className="w-full md:w-1/4 text-center md:text-left mb-4 md:mb-0 flex flex-col items-center">
            <div className="relative">
              <ProfileAvatar name={profile.name} imageUrl={null} />
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-2 shadow-md hover:bg-blue-600 transition"
                >
                  <Edit size={20} />
                </button>
              )}
            </div>
            <h3 className="text-2xl font-black text-gray-800 mt-4 tracking-tight">{profile.name}</h3>
            <p className="text-sm text-blue-600 font-semibold">{`${profile.branch}, Batch of ${profile.batchYear}`}</p>
          </div>

          {/* Right section - Profile Details */}
          <div className="w-full md:w-3/4 md:pl-8">
            {isEditing ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Form Fields for Profile */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    name="name"
                    value={profile.name}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    placeholder="Name"
                  />
                  <input
                    name="branch"
                    value={profile.branch}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    placeholder="Branch"
                  />
                  <input
                    name="batchYear"
                    value={profile.batchYear}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    placeholder="Batch Year"
                    type="number"
                  />
                  <input
                    name="phone"
                    value={profile.phone}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    placeholder="Phone"
                  />
                  <input
                    name="email"
                    value={profile.email}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    placeholder="Email"
                  />
                  <input
                    name="linkedinURL"
                    value={profile.linkedinURL}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    placeholder="LinkedIn URL"
                  />
                  <input
                    name="githubURL"
                    value={profile.githubURL}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    placeholder="GitHub URL"
                  />
                  <input
                    name="resumeURL"
                    value={profile.resumeURL}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    placeholder="Resume URL"
                  />
                </div>

                {/* GPA Inputs for Each Semester */}
                <div>
                  <p className="font-semibold mb-2">Semester GPAs:</p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {profile.semCgpa.map((gpa, index) => (
                      <input
                        key={index}
                        value={gpa}
                        onChange={(e) => handleSemesterGPAChange(index, e.target.value)}
                        className="w-full p-2 border rounded"
                        placeholder={`Semester ${index + 1} GPA`}
                        type="number"
                        step="0.01"
                        min="0"
                        max="10"
                      />
                    ))}
                  </div>
                </div>

                {/* Active Backlogs Input */}
                <div>
                  <p className="font-semibold mb-2">Active Backlogs</p>
                  <input
                    name="activeBacklogs"
                    value={profile.activeBacklogs}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    placeholder="Active Backlogs"
                    type="number"
                    min="0"
                  />
                </div>

                {/* Save and Cancel Buttons */}
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition flex items-center"
                  >
                    <X size={20} className="mr-2" />
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition flex items-center"
                  >
                    <Save size={20} className="mr-2" />
                    Save Changes
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-4">
                {/* Displaying Profile Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <StatCard label="Last Semester GPA" value={profile.semCgpa[profile.semCgpa.length - 1]} />
                  <StatCard label="Batch Year" value={profile.batchYear} />
                  {profile.activeBacklogs > 0 && (
                    <StatCard label="Active Backlogs" value={profile.activeBacklogs} valueClassName="text-red-600" />
                  )}
                </div>

                {/* Displaying Profile Links */}
                <div className="space-y-2 flex flex-col">
                  <div className="flex flex-wrap gap-1 justify-between">
                    <p className="flex items-center text-gray-600">
                      <Phone size={20} className="mr-2" />
                      {profile.phone}
                    </p>
                    <p className="flex items-center text-gray-600">
                      <Mail size={20} className="mr-2" />
                      {profile.email}
                    </p>
                    <p className="flex items-center text-gray-600">
                      <Linkedin size={20} className="mr-2" />
                      <a href={profile.linkedinURL} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                        LinkedIn Profile
                      </a>
                    </p>
                    <p className="flex items-center text-gray-600">
                      <Github size={20} className="mr-2" />
                      <a href={profile.githubURL} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                        GitHub Profile
                      </a>
                    </p>
                    <p className="flex items-center text-gray-600">
                      <FileText size={20} className="mr-2" />
                      <a href={profile.resumeURL} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                        Resume
                      </a>
                    </p>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {profile.semCgpa.map((gpa, index) => (
                      // <input
                      //   key={index}
                      //   value={gpa}
                      //   onChange={(e) => handleSemesterGPAChange(index, e.target.value)}
                      //   className="w-full p-2 border rounded"
                      //   placeholder={`Semester ${index + 1} GPA`}
                      //   type="number"
                      //   step="0.01"
                      //   min="0"
                      //   max="10"
                      // />
                      <>
                        <div className="flex flex-col">
                          <div className="font-semibold" key={index}>{`Semester ${index + 1}`}</div>
                          <div >{gpa}</div>
                        </div>

                      </>

                    ))}
                  </div>

                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
