import { User } from 'lucide-react';
import React from 'react';

const TeamPage = () => {
  // Data for the VC, Registrar, and TPO
  const teamMembers = [
    { name: 'Dr. John Doe', designation: 'Vice Chancellor', photo: 'https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg' },
    { name: 'Dr. Jane Smith', designation: 'Registrar', photo: 'https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg' },
    { name: 'Dr. Suresh Verma', designation: 'Training & Placement Officer', photo: 'https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg' }
  ];

  // Data for Placement Incharges (only name and photo)
  const placementIncharges = [
    { name: 'Alice Green', photo: "https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg" },
    { name: 'Bob Brown', photo: "https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg" },
    { name: 'Bob Brown', photo: "https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg" },
    { name: 'Bob Brown', photo: "https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg" },
    { name: 'Bob Brown', photo: "https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg" },
    { name: 'Bob Brown', photo: "https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg" },
    { name: 'Bob Brown', photo: "https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg" },
    { name: 'Bob Brown', photo: "https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg" },
    { name: 'Bob Brown', photo: "https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg" },
    { name: 'Bob Brown', photo: "https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg" },
    { name: 'Bob Brown', photo: "https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg" },
    { name: 'Bob Brown', photo: "https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg" },
    { name: 'Bob Brown', photo: "https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg" },
    { name: 'Bob Brown', photo: "https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg" },
    { name: 'Bob Brown', photo: "https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg" },
    { name: 'Bob Brown', photo: "https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg" },
    { name: 'Bob Brown', photo: "https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg" },
    { name: 'Bob Brown', photo: "https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg" },
    { name: 'Bob Brown', photo: "https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg" },
    { name: 'Bob Brown', photo: "https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg" },
    { name: 'Bob Brown', photo: "https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg" },
    { name: 'Bob Brown', photo: "https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg" },
    { name: 'Bob Brown', photo: "https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg" },
    { name: 'Bob Brown', photo: "https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg" },
    { name: 'Bob Brown', photo: "https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg" },
    { name: 'Bob Brown', photo: "https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg" },
    { name: 'Bob Brown', photo: "https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg" },
    { name: 'Bob Brown', photo: "https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg" },
    { name: 'Bob Brown', photo: "https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg" },
    { name: 'Bob Brown', photo: "https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg" },
    { name: 'Bob Brown', photo: "https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg" },
    { name: 'Bob Brown', photo: "https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg" },
    { name: 'Bob Brown', photo: "https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg" },
    { name: 'Bob Brown', photo: "https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg" },
    { name: 'Bob Brown', photo: "https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg" },
    { name: 'Bob Brown', photo: "https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg" },
    { name: 'Bob Brown', photo: "https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg" },
    { name: 'Bob Brown', photo: "https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg" },
    { name: 'Bob Brown', photo: "https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg" },
    { name: 'Bob Brown', photo: "https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg" },
    { name: 'Bob Brown', photo: "https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg" },
    { name: 'Bob Brown', photo: "https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg" },
    { name: 'Bob Brown', photo: "https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg" },
    { name: 'Bob Brown', photo: "https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg" },
    { name: 'Bob Brown', photo: "https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg" },
    { name: 'Bob Brown', photo: "https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg" },
    { name: 'Bob Brown', photo: "https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg" },
    { name: 'Bob Brown', photo: "https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg" },
    { name: 'Bob Brown', photo: "https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg" },
    { name: 'Bob Brown', photo: "https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg" },
    { name: 'Bob Brown', photo: "https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg" },
    { name: 'Bob Brown', photo: "https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg" },
    { name: 'Bob Brown', photo: "https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg" },
    { name: 'Bob Brown', photo: "https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg" },
    { name: 'Bob Brown', photo: "https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg" },
    { name: 'Charlie Black', photo: 'https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg' }
    // Add more incharges if necessary
  ];

  // Data for Student Placement Coordinators
  const studentCoordinators = [
    { name: 'Emily White', photo: 'https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg' },
    { name: 'Mark Johnson', photo: 'https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg' },
    { name: 'Sarah Lee', photo: 'https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg' }
  ];

  return (
    <div className="p-8 pt-16 max-w-7xl mx-auto space-y-8">
      {/* Row 1 - VC, Registrar, and TPO Cards (Full Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {teamMembers.map((member, index) => (
          <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out text-center">
            <img
              src={member.photo}
              alt={member.name}
              className="w-40 h-40 mx-auto rounded-full object-cover mb-4"
            />
            <h3 className="text-2xl font-semibold text-gray-800">{member.name}</h3>
            <p className="text-lg text-gray-600">{member.designation}</p>
          </div>
        ))}
      </div>

      {/* Row 2 - Placement Incharges*/}
      <div className="font-bold">
        <div className="underline mb-8 text-3xl text-blue-900">Department Placement Committee Conveners</div>

        <div className="flex flex-wrap gap-8 justify-start">
          {placementIncharges.map((incharge, index) => (
            <div key={index} className="flex flex-col items-center">
              <img
                src={incharge.photo}
                alt={incharge.name}
                className="w-20 h-20 rounded-full object-cover mb-2"
              />
              <h3 className="text-lg font-semibold text-gray-800">{incharge.name}</h3>
            </div>
          ))}
        </div>
      </div>

      {/* Row 3 - Student Placement Coordinators  */}
      <div className="font-bold">
        <div className="underline mb-8 text-3xl text-blue-900">Student Placement Coordinators</div>

        <div className="flex flex-wrap gap-8 justify-start">
          {studentCoordinators.map((coordinator, index) => (
            <div key={index} className="flex flex-col items-center">
              <img
                src={coordinator.photo}
                alt={coordinator.name}
                className="w-20 h-20 rounded-full object-cover mb-2"
              />
              <h3 className="text-lg font-semibold text-gray-800">{coordinator.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamPage;
