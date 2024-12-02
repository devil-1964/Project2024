import React, { useState } from 'react';
import { Edit, Save, X, Linkedin, Github, FileText, Phone, Mail, School, BookOpen, GraduationCap } from 'lucide-react';

const ProfileAvatar = ({ name, imageUrl }) => {
  return (
    <div className="w-32 h-32 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 text-4xl font-bold">
      {imageUrl ? (
        <img src={imageUrl} alt={name} className="w-full h-full object-cover rounded-full" />
      ) : (
        name.charAt(0)
      )}
    </div>
  );
};

const StatCard = ({ label, value, valueClassName = "text-gray-800" }) => (
  <div className="bg-white p-4 rounded-xl shadow-sm">
    <p className="text-sm text-gray-500 font-medium">{label}</p>
    <p className={`text-xl font-bold ${valueClassName}`}>{value}</p>
  </div>
);

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "John Doe",
    degree: "B.Tech",
    branch: "Computer Science Engineering",
    resumeLink: "https://drive.google.com/file/d/example",
    phoneNumber: "+1234567890",
    email: "john.doe@example.com",
    linkedinProfile: "https://www.linkedin.com/in/johndoe",
    githubProfile: "https://github.com/johndoe",
    batch: "2024",
    semesterGPA: [8.5, 8.3, 8.7, 8.2, 8.6, 8.4],
    overallCGPA: 8.45,
    placementStatus: "Placed",
    activeBacklogs: 0,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSemesterGPAChange = (index, value) => {
    const newSemesterGPA = [...profile.semesterGPA];
    newSemesterGPA[index] = parseFloat(value);
    setProfile(prev => ({ ...prev, semesterGPA: newSemesterGPA }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the updated profile to your backend
    console.log("Updated profile:", profile);
    setIsEditing(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-gradient-to-br from-blue-50 to-white shadow-lg rounded-2xl p-6 border border-gray-100">
        <div className="flex flex-col md:flex-row">
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
            <p className="text-sm text-blue-600 font-semibold">{`${profile.degree} in ${profile.branch}`}</p>
          </div>
          <div className="w-full md:w-3/4 md:pl-8">
            {isEditing ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    name="name"
                    value={profile.name}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    placeholder="Name"
                  />
                  <input
                    name="degree"
                    value={profile.degree}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    placeholder="Degree"
                  />
                  <input
                    name="branch"
                    value={profile.branch}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    placeholder="Branch"
                  />
                  <input
                    name="resumeLink"
                    value={profile.resumeLink}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    placeholder="Resume Link (Google Drive)"
                  />
                  <input
                    name="phoneNumber"
                    value={profile.phoneNumber}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    placeholder="Phone Number"
                  />
                  <input
                    name="email"
                    value={profile.email}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    placeholder="Email"
                  />
                  <input
                    name="linkedinProfile"
                    value={profile.linkedinProfile}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    placeholder="LinkedIn Profile"
                  />
                  <input
                    name="githubProfile"
                    value={profile.githubProfile}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    placeholder="GitHub Profile"
                  />
                  <input
                    name="batch"
                    value={profile.batch}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    placeholder="Batch"
                  />

                </div>
                <div>
                  <p className="font-semibold mb-2">Semester GPAs:</p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {profile.semesterGPA.map((gpa, index) => (
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
                  </div>
                </div>
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
                <div className="grid grid-cols-2 gap-4">
                  <StatCard label="Current Semester GPA" value={profile.semesterGPA[profile.semesterGPA.length - 1]} />
                  <StatCard label="Overall CGPA" value={profile.overallCGPA.toFixed(2)} valueClassName="text-green-600" />
                  <StatCard label="Placement Status" value={profile.placementStatus} valueClassName="text-green-600" />
                  <StatCard label="Batch" value={profile.batch} />
                  {profile.activeBacklogs > 0 && (
                    <StatCard label="Active Backlogs" value={profile.activeBacklogs} valueClassName="text-red-600" />
                  )}
                </div>
                <div className="space-y-2 flex justify-between">
                  <p className="flex items-center text-gray-600">
                    <Phone size={20} className="mr-2" />
                    {profile.phoneNumber}
                  </p>
                  <p className="flex items-center text-gray-600">
                    <Mail size={20} className="mr-2" />
                    {profile.email}
                  </p>
                  <p className="flex items-center text-gray-600">
                    <Linkedin size={20} className="mr-2" />
                    <a href={profile.linkedinProfile} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                      LinkedIn Profile
                    </a>
                  </p>
                  <p className="flex items-center text-gray-600">
                    <Github size={20} className="mr-2" />
                    <a href={profile.githubProfile} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                      GitHub Profile
                    </a>
                  </p>
                  <p className="flex items-center text-gray-600">
                    <FileText size={20} className="mr-2" />
                    <a href={profile.resumeLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                      Resume
                    </a>
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 flex items-center">
                    <BookOpen size={20} className="mr-2" />
                    Semester-wise GPA
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {profile.semesterGPA.map((gpa, index) => (
                      <div key={index} className="bg-gray-100 p-2 rounded">
                        <p className="text-sm text-gray-500">Semester {index + 1}</p>
                        <p className="font-bold">{gpa.toFixed(2)}</p>
                      </div>
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

