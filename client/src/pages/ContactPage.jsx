import React from 'react';

const ContactPage = () => {
  return (
    <div className="p-8 pt-16 max-w-7xl mx-auto space-y-8">
      {/* Top Section - TPO Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">Dr. Suresh Verma</h2>
          <h3 className="text-xl font-medium text-gray-600 mb-4">Training & Placement Officer</h3>
          <p className="text-lg mb-4">
            <strong>Email: </strong>
            <a href="mailto:tpo@dcrustm.org" className="text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out">
              tpo@dcrustm.org
            </a>
          </p>
          <p className="text-lg mb-4">
            <strong>Phone: </strong>0130-2484129 (Office)
          </p>
          <p className="text-lg mb-4">
            <strong>Fax: </strong>0130-2484004
          </p>
        </div>

        {/* TPO Contact Box */}
        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">Contact Information</h2>
          <p className="text-lg mb-4">
            For further inquiries, please reach out to the Training & Placement Cell at the provided contact details.
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li className="text-lg">
              <strong>Phone:</strong> 0130-2484129 (Office)
            </li>
            <li className="text-lg">
              <strong>Email:</strong> <a href="mailto:tpo@dcrustm.org" className="text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out">tpo@dcrustm.org</a>
            </li>
            <li className="text-lg">
              <strong>Address:</strong> Mechanical Block, Top Floor, TPO Office
            </li>
            <li className="text-lg">
              <strong>Office Timings:</strong> Monday to Friday, 9:00 AM to 5:00 PM
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Section - Training Placement Coordinators Table */}
      <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Training & Placement Coordinators</h2>
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr>
              <th className="text-left p-4 border-b text-lg">S. No.</th>
              <th className="text-left p-4 border-b text-lg">Name</th>
              <th className="text-left p-4 border-b text-lg">Branch</th>
              <th className="text-left p-4 border-b text-lg">Phone</th>
            </tr>
          </thead>
          <tbody>
            {[{ name: 'John Doe', branch: 'Computer Science', phone: '0123-4567890' },
              { name: 'Jane Smith', branch: 'Mechanical Engineering', phone: '0123-9876543' },
              { name: 'Mark Wilson', branch: 'Electrical Engineering', phone: '0123-1122334' },
              { name: 'Emily Johnson', branch: 'Civil Engineering', phone: '0123-4455667' },
            ].map((coordinator, index) => (
              <tr key={index} className="hover:bg-gray-100 transition-all duration-200 ease-in-out">
                <td className="p-4 border-b">{index + 1}</td>
                <td className="p-4 border-b">{coordinator.name}</td>
                <td className="p-4 border-b">{coordinator.branch}</td>
                <td className="p-4 border-b">{coordinator.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContactPage;
