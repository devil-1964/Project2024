import React from 'react';
import { FileText, Download } from 'lucide-react';
import toast from 'react-hot-toast';

const TrainingAndPlacementPage = () => {
  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section with Background and Shadow */}
      <div className="bg-blue-950 text-white p-6 rounded-md shadow-md">
        <h1 className="text-4xl font-bold text-center mb-4">
          Welcome to the Training and Placement Cell of DCRUST, Murthal
        </h1>
      </div>

      {/* Overview Section */}
      <div className="bg-white p-6 rounded-md shadow-md">
        <p className="text-lg mb-4">
          The Training & Placement Cell is a separate unit that deals with the placement and campus interviews for our students. The cell is headed by a regular Training & Placement Officer. Acting as an interface between the University and Companies, it has fostered a symbiotic, vibrant, and purposeful relationship with industries across the country.
        </p>
        <p className="text-lg mb-4">
          As a result, the cell has achieved an impressive placement record both in terms of the percentage of students placed and the number of companies visiting the campus, offering attractive salary packages. The department hosts companies on campus and ensures that every aspirant is assured of a bright career of their choice.
        </p>
        <p className="text-lg mb-4">
          The University provides a spacious Training & Placement Cell, equipped with state-of-the-art facilities, including:
        </p>
        <ul className="list-disc pl-6 text-lg mb-4">
          <li>Seminar Hall with a 200 seating capacity for Pre-Placement Talks (PPTs).</li>
          <li>40 seating capacity Air-conditioned Lounge and Board Rooms.</li>
          <li>Smart Class Room, Internet Lab, and an Air-conditioned Committee Room for Group Discussions.</li>
          <li>Examination Halls and a Computer Lab for online tests (accommodates 130 students per shift).</li>
        </ul>
        <p className="text-lg mb-4">
          The Training & Placement Cell has built a very productive relationship with industries, generating placement opportunities for students. Several corporations have ranked the University among the top institutions for campus recruitment programs.
        </p>
      </div>

      {/* Placement Cell Functions */}
      <div className="bg-white p-6 rounded-md shadow-md">
        <h2 className="text-2xl font-semibold text-blue-950 mb-4">
          The Placement Cell Performs the Following Functions:
        </h2>
        <ul className="list-disc pl-6 text-lg">
          <li>Nurtures industry-institute interaction by organizing industrial visits, in-plant training, and projects of industrial relevance to bridge the gap between academia and industry.</li>
          <li>Organizes and coordinates campus placement programs to assist every aspirant in securing good placements.</li>
          <li>Helps students define their career interests through expert counseling.</li>
          <li>Maintains an updated database of nearly 6000 companies and their job profiles to help students analyze and choose the companies that match their interests.</li>
          <li>Receives feedback from visiting companies to improve the curriculum and ensure it aligns with the latest industrial trends.</li>
          <li>Provides facilities for companies to conduct Pre-Placement Talks (PPTs), written tests, online tests, group discussions, and interviews.</li>
          <li>Organizes expert lectures on various topics related to industry trends, career guidance, and skill development.</li>
          <li>Works closely with a team of Student Coordinators to streamline all processes and provide AC accommodation for interview panels at the University’s Guest House.</li>
        </ul>
      </div>

      {/* Placement Information */}
      <h2 className="text-2xl font-semibold text-blue-950">Placement</h2>
      <div className="bg-white p-6 rounded-md shadow-md">
        <p className="text-lg mb-4 border-b pb-4">
          The placement season runs through the year, starting from the first week of August to March.
        </p>
        <p className="text-lg mb-0 cursor-pointer" onClick={()=>{toast.error("Resource Not Available")}}>
          <a  className="text-blue-950 underline flex items-center">
            Placement Brochure <Download className="ml-2 w-5 h-5" />
          </a>
        </p>
      </div>

      {/* Institute Placement Policy */}
      <h2 className="text-2xl font-semibold text-blue-950">Institute Placement Policy</h2>
      <div className="bg-white p-6 rounded-md shadow-md">
        <p className="text-lg mb-0 cursor-pointer"onClick={()=>{toast.error("Resource Not Available")}}>
          Click the PDF icon to view the placement policy.
          <a  className="text-blue-950 underline flex items-center">
            <FileText className="mr-2 w-5 h-5" />
            View Placement Policy
          </a>
        </p>
      </div>

      {/* Placement Procedure */}
      <h2 className="text-2xl font-semibold text-blue-950">Placement Procedure for Companies</h2>
      <div className="bg-white p-6 rounded-md shadow-md space-y-4">
        <p className="text-lg mb-4 border-b pb-4">
          Companies should fill in the Job Notification Form (JNF)/Internship Notification Form (INF) and submit it to the Training and Placement Cell (TPC) portal. The JNF/INF introduces the job/internship profile to students and informs them about the company’s requirements.
        </p>
        <p className="text-lg mb-4 border-b pb-4">
          The company will be allotted slots and dates for conducting Pre-Placement Talks (PPTs), written tests, or online tests. The company must confirm the same by a specified date. Failure to do so may result in the allotted slot being given to other companies.
        </p>
        <p className="text-lg mb-0">
          The company can request resumes from interested students and may shortlist them before the placement process begins.
        </p>
      </div>


    </div>
  );
};

export default TrainingAndPlacementPage;
