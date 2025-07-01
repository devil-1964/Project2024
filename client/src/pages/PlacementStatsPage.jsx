import { ArrowUpRight, Loader } from 'lucide-react';
import axios from "axios"
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import  { toast } from "react-hot-toast"

const PlacementStatsPage = () => {
  const [years,setYears]=useState([]);
  const [loading, setLoading] = useState(true)
  const fetchYears=async()=>{
    try{
      const response=await axios.get(`${import.meta.env.VITE_URL_API}/api/placement-years`)
      setYears(response.data.years)
      setLoading(false)
      // console.log(response.data)
    }
    catch{
      toast.error('Failed to Placement Report.');
    }
  }

  
  useEffect(()=>{
    fetchYears();
  },[])

  // const placementReports = [
  //   { year: '2023-24', description: 'Placement Report 2023-24', pdfLink: '/path/to/placement-report-2023-24.pdf' },
  //   { year: '2022-23', description: 'Placement Report 2022-23', pdfLink: '/path/to/placement-report-2022-23.pdf' },
  //   { year: '2021-22', description: 'Placement Report 2021-22', pdfLink: '/path/to/placement-report-2021-22.pdf' },
  //   { year: '2020-21', description: 'Placement Report 2020-21', pdfLink: '/path/to/placement-report-2020-21.pdf' },
  //   { year: '2019-20', description: 'Placement Report 2019-20', pdfLink: '/path/to/placement-report-2019-20.pdf' },
  //   { year: '2018-19', description: 'Placement Report 2018-19', pdfLink: '/path/to/placement-report-2018-19.pdf' },
  //   { year: '2017-18', description: 'Placement Report 2017-18', pdfLink: '/path/to/placement-report-2017-18.pdf' },
  // ];

  if (loading) {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <p className="text-2xl font-bold text-gray-600 flex items-center gap-3"><Loader className='animate-spin' /> Loading...</p>
        </div>
    );
}


  return (
    <div className="p-8 max-w-7xl mx-auto flex flex-col items-center text-center">
      <h2 className="text-4xl font-semibold text-gray-800 mb-8">Placement Reports</h2>
      
      {years.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="bg-white rounded-lg shadow-md p-12 max-w-md w-full">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No Records Available</h3>
            <p className="text-gray-500 text-sm mb-4">
              Placement reports are currently being updated. Please check back soon for the latest placement statistics and reports.
            </p>
            <div className="text-xs text-gray-400">
              Updates coming soon...
            </div>
          </div>
        </div>
      ) : (
        <table className="min-w-full table-auto border-collapse bg-white rounded-lg shadow-md ">
          <thead>
            <tr className="border-b text-center">
              <th className="max-sm:hidden py-4 px-6  text-lg font-semibold text-gray-700 ">S. No.</th>
              <th className="py-4 px-6  text-lg font-semibold text-gray-700">Recruitment Year</th>
              <th className="py-4 px-6  text-lg font-semibold text-gray-700">View Details</th>
            </tr>
          </thead>
          <tbody>
            {years.map((year, index) => (
              <tr key={index} className="border-b hover:bg-gray-100">
                <td className="py-4 px-6 max-sm:hidden text-lg border">{index + 1}</td>
                <td className="py-4 px-6 text-lg border">{`Placement Year ${year.year}-${year.year+1}`}</td>
                <td className="py-4 px-6 text-lg border">
                  <Link to={`/placement-year/${year.year}`}   className="flex justify-center items-center text-blue-600 hover:text-blue-800 gap-2">
                    View<ArrowUpRight/>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PlacementStatsPage;
