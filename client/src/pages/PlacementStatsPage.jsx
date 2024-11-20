import { Download } from 'lucide-react';
import React from 'react';

const PlacementStatsPage = () => {
  const placementReports = [
    { year: '2023-24', description: 'Placement Report 2023-24', pdfLink: '/path/to/placement-report-2023-24.pdf' },
    { year: '2022-23', description: 'Placement Report 2022-23', pdfLink: '/path/to/placement-report-2022-23.pdf' },
    { year: '2021-22', description: 'Placement Report 2021-22', pdfLink: '/path/to/placement-report-2021-22.pdf' },
    { year: '2020-21', description: 'Placement Report 2020-21', pdfLink: '/path/to/placement-report-2020-21.pdf' },
    { year: '2019-20', description: 'Placement Report 2019-20', pdfLink: '/path/to/placement-report-2019-20.pdf' },
    { year: '2018-19', description: 'Placement Report 2018-19', pdfLink: '/path/to/placement-report-2018-19.pdf' },
    { year: '2017-18', description: 'Placement Report 2017-18', pdfLink: '/path/to/placement-report-2017-18.pdf' },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h2 className="text-3xl font-semibold text-gray-800 mb-8">Placement Reports</h2>
      
      <table className="min-w-full table-auto border-collapse bg-white rounded-lg shadow-md">
        <thead>
          <tr className="border-b">
            <th className="py-4 px-6 text-left text-lg font-semibold text-gray-700">S. No.</th>
            <th className="py-4 px-6 text-left text-lg font-semibold text-gray-700">Description</th>
            <th className="py-4 px-6 text-left text-lg font-semibold text-gray-700">PDF Link</th>
          </tr>
        </thead>
        <tbody>
          {placementReports.map((report, index) => (
            <tr key={index} className="border-b hover:bg-gray-100">
              <td className="py-4 px-6 text-lg border">{index + 1}</td>
              <td className="py-4 px-6 text-lg border">{report.description}</td>
              <td className="py-4 px-6 text-lg border">
                <a href={report.pdfLink} target="_blank" rel="noopener noreferrer" className="flex  items-center text-blue-600 hover:text-blue-800 gap-2">
                  View PDF<Download/>
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PlacementStatsPage;
