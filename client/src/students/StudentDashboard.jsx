import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; // Make sure to install jwt-decode package
import { 
  Pin, 
  Edit, 
  Bell, 
  MessageCircle, 
  Briefcase, 
  HelpCircle, 
  List,  
  CloudSun, 
  CloudMoon, 
  ChevronRight, 
  Loader
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

// ProfileAvatar Component
const ProfileAvatar = ({ name, imageUrl }) => {
  const getInitials = (fullName) => {
    return fullName
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  if (imageUrl) {
    return (
      <img
        src={imageUrl}
        alt="Profile"
        className="rounded-2xl w-48 h-48 mx-auto md:mx-0 object-cover ring-4 ring-blue-200 shadow-xl transform transition hover:scale-105"
      />
    );
  }

  return (
    <div className="rounded-2xl w-48 h-48 mx-auto md:mx-0 flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-bold text-6xl ring-4 ring-blue-200 shadow-xl">
      {getInitials(name)}
    </div>
  );
};

// StatCard Component
const StatCard = ({ label, value, valueClassName = "text-blue-600" }) => (
  <div className="bg-white p-5 rounded-2xl shadow-md hover:shadow-lg transition group overflow-hidden">
    <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">{label}</p>
    <div className="flex justify-between items-center">
      <p className={`text-2xl font-black ${valueClassName}`}>{value}</p>
      <ChevronRight className="text-gray-400 opacity-0 group-hover:opacity-100 transition" size={20} />
    </div>
  </div>
);

// StudentDashboard Main Component
const StudentDashboard = () => {
  // State variables
  const [weather, setWeather] = useState({
    description: 'Loading...',
    temperature: '--',
    icon: null,
  });
  const [userData, setUserData] = useState(null);
  const [jobApplications, setJobApplications] = useState(0);
  const [currentTime, setCurrentTime] = useState('');
  const navigate = useNavigate();

  // Fetch User Data
  const fetchUserData = async (userId) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_URL_API}/api/student/${userId}`);
  
      const data = response.data;
      setUserData(data);


      
      // Set job applications if available
      if (data.jobApplications) {
        setJobApplications(data.jobApplications.length || 0);
      }
    } catch (error) {
      console.error('Failed to fetch user data:', error.response ? error.response.data : error.message);
    }
  };
  

  // Fetch User Data on Component Mount
  useEffect(() => {
    const token = localStorage.getItem('Authorization');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const userId = decoded.userId;
        fetchUserData(userId);
      } catch (error) {
        console.error('Failed to decode token:', error);
      }
    }
  }, []);

  // Fetch Weather Data
  useEffect(() => {
    const fetchWeather = async () => {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=29.0402&longitude=77.0927&hourly=temperature_2m`;
      try {
        const response = await axios.get(url);
        const data = response.data;
        const currentHour = new Date().getHours();
        const isDay = currentHour >= 6 && currentHour < 18;
    
        const getWeatherDescription = () => {
          if (currentHour >= 5 && currentHour < 12) return 'Good Morning';
          if (currentHour >= 12 && currentHour < 17) return 'Afternoon Breeze';
          if (currentHour >= 17 && currentHour < 20) return 'Evening Glow';
          return 'Starry Night';
        };
    
        setWeather({
          description: getWeatherDescription(),
          temperature: data.hourly.temperature_2m[currentHour],
          icon: isDay ? <CloudSun className="text-amber-500" size={48} /> : <CloudMoon className="text-indigo-500" size={48} />,
        });
      } catch (error) {
        console.error('Failed to fetch weather:', error.response ? error.response.data : error.message);
      }
    };
    

    fetchWeather();
  }, []);

  // Update Current Time
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
      setCurrentTime(timeString);
    };

    updateTime();
    const intervalId = setInterval(updateTime, 1000);

    return () => clearInterval(intervalId);
  }, []);

  // Loading State
  if (!userData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-2xl font-bold text-gray-600 flex items-center gap-3"><Loader className='animate-spin'/> Loading...</p>
      </div>
    );
  }

  // Render Dashboard
  return (
    <div className="min-h-screen bg-gray-50 p-8 mt-20 sm:p-6 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Quick Links */}
          <div className="bg-white shadow-lg rounded-2xl p-6 border border-gray-100 hover:shadow-xl transition">
            <div className="flex items-center mb-4">
              <Pin className="text-blue-500 mr-3" size={24} />
              <h3 className="text-xl font-black text-gray-800 tracking-tight">Quick Links</h3>
            </div>
            <ul className="space-y-3">
              {[
                { name: "DCRUST Official", url: "https://www.dcrustm.ac.in" },
                { name: "Examination Portal", url: "https://www.dcrustedp.in" },
                { name: "DCRUST LinkedIn", url: "https://in.linkedin.com/school/cse-dcrust/" },
                { name: "Nation Career Service", url: "https://www.ncs.gov.in/" }
              ].map((link, index) => (
                <li key={index}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 font-semibold transition-colors flex items-center"
                  >
                    {link.name}
                    <ChevronRight className="ml-2 text-gray-400" size={16} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Weather Section */}
          <div className="bg-gradient-to-br from-blue-100 to-white shadow-lg rounded-2xl p-6 border border-blue-200 hover:scale-[1.02] transition">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-black text-gray-800 tracking-tight">Weather</h3>
              {weather.icon}
            </div>
            <div className="space-y-3">
              <div className="flex items-center space-x-4">
                <div>
                  <p className="text-5xl font-extrabold text-blue-600">{weather.temperature}°<span className="text-3xl">C</span></p>
                  <p className="text-xl font-bold text-gray-700 mt-1">{weather.description}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-500 tracking-wide">
                  Current Time: <span className="font-bold text-blue-600">{currentTime}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Job Applications Section */}
          <div className="bg-white shadow-lg rounded-2xl p-6 border border-gray-100 hover:shadow-xl transition">
            <h3 className="text-lg font-black text-gray-800 flex items-center mb-5">
              <Briefcase className="mr-3 text-green-500" size={24} />
              Job Applications
            </h3>
            <div className="space-y-3">
              <div className="bg-gray-100 p-4 rounded-xl flex justify-between items-center">
                <span className="font-semibold text-gray-700">Total Applications</span>
                <span className="font-bold text-green-600">{jobApplications}</span>
              </div>
              <button 
                onClick={() => navigate('/student/jobs')}
                className="w-full mt-4 bg-gradient-to-r from-green-500 to-blue-500 text-white py-3 rounded-xl hover:opacity-90 transition flex items-center justify-center"
              >
                <List className="mr-2" size={20} />
                View Applications
              </button>
            </div>
          </div>
        </div>

        {/* Job Notification Section */}
        <div className="bg-gradient-to-r from-green-400 to-blue-500 text-white p-6 rounded-2xl shadow-lg flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black flex items-center">
              <Bell className="mr-3" size={28} />
              New Job Opportunities
            </h2>
            <p className="mt-2 font-medium">Discover and apply to the latest job postings today!</p>
          </div>
          
          <Link to="/student/jobs" className="bg-white text-green-600 px-6 py-3 rounded-xl font-bold hover:bg-gray-100 transition">
            Explore Jobs
          </Link>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Complaint and Support */}
          <div className="bg-white shadow-lg rounded-2xl p-6 border border-gray-100 hover:shadow-xl transition">
            <h3 className="text-lg font-black text-gray-800 flex items-center mb-4">
              <MessageCircle className="mr-3 text-red-500" size={24} />
              Complaint & Support
            </h3>
            <div className="space-y-4">
              <button className="w-full bg-red-500 text-white py-3 rounded-xl hover:bg-red-600 transition flex items-center justify-center">
                <MessageCircle className="mr-2" size={20} />
                Raise Complaint
              </button>
              <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition flex items-center justify-center">
                <HelpCircle className="mr-2" size={20} />
                Support Center
              </button>
              <div className="bg-gray-100 p-4 rounded-xl text-sm">
                <p className="font-semibold text-gray-700 mb-2">Contact Information</p>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <MessageCircle className="mr-2 text-gray-500" size={16} />
                    <span>tpo@dcrustm.org</span>
                  </div>
                  <div className="flex items-center">
                    <HelpCircle className="mr-2 text-gray-500" size={16} />
                    <span>10:00 AM - 5:00 PM (Mon-Fri)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Preview */}
          <div className="md:col-span-2 bg-gradient-to-br from-blue-50 to-white shadow-lg rounded-2xl p-6 flex flex-col md:flex-row border border-gray-100">
            <div className="w-full md:w-1/4 text-center md:text-left mb-4 md:mb-0 flex flex-col items-center">
              <div className="relative">
                <ProfileAvatar 
                  name={userData.name || "User"} 
                  imageUrl={userData.profilePicture}
                />
                <div className="absolute bottom-2 right-2 bg-blue-500 text-white rounded-full p-2 shadow-md hover:bg-blue-600 transition">
                  <Edit size={20} onClick={() => navigate('/student/profile')}/>
                </div>
              </div>
              <h3 className="text-2xl font-black text-gray-800 mt-4 tracking-tight">{userData.name}</h3>
              <p className="text-sm text-blue-600 font-semibold">{userData.branch || "Student"}</p>
            </div>
            <div className="w-full md:w-3/4 md:pl-8 relative">
              <div className="grid grid-cols-2 gap-4">
                <StatCard label="Current Semester GPA" value={userData?.semCgpa[userData.semCgpa.length-1] || "N/A"} />
                {/* <StatCard label="Overall CGPA" value={overCGPA || "N/A"} valueClassName="text-green-600" /> */}
                <StatCard label="Phone" value={`+91 ${userData.phone}` || "N/A"} />
                <StatCard label="Batch" value={userData.batchYear || "N/A"} />
                <StatCard 
                  label="Re-appear" 
                  value={userData.activeBacklogs || "None"} 
                  valueClassName={userData.activeBacklogs>0 ? "text-red-600" : "text-green-600"} 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
