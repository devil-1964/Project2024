import { useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode';
import { ArrowUpRightFromSquareIcon, Loader } from 'lucide-react';
import axios from 'axios';

const AppliedJobs = () => {
    const [jobs, setJobs] = useState(null);
    const [loading, setLoading] = useState(true);
    const fetchUserData = async (userId) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_URL_API}/api/student/${userId}`);

            const data = response.data;
            // setUserData(data);



            // Set job applications if available
            if (data.jobApplied) {
                // console.log(data.jobApplied)
                setJobs(data.jobApplied );
                setLoading(false)
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

    if (loading) {
        return (
          <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <p className="text-2xl font-bold text-gray-600 flex items-center gap-3"><Loader className='animate-spin'/> Loading...</p>
          </div>
        );
      }

    return (
        <div className='container items-center bg-gray-50 p-8 mt-20 sm:p-6 font-sans mx-auto'>
            <h1 className='text-4xl font-bold pb-8'>Jobs Applied</h1>
            <table className="min-w-full table-auto border-collapse bg-white rounded-lg shadow-md">
                <thead>
                    <tr className="border-b ">
                        <th className="py-4 px-6  text-center text-lg font-bold text-gray-700">S. No.</th>
                        <th className="py-4 px-6 text-center text-lg font-bold text-gray-700">Company</th>
                        <th className="py-4 px-6 text-center text-lg font-bold text-gray-700">Job Title</th>
                        <th className="py-4 px-6 text-center text-lg font-bold text-gray-700">Details</th>
                    </tr>
                </thead>
                <tbody>
                    {jobs?.length>0 &&
                        jobs.map((job, index) => (
                            <tr key={index} className="border-b hover:bg-gray-100">
                                <td className="py-4 px-6 text-center text-lg border">{index + 1}</td>
                                <td className="py-4 px-6 text-center text-lg border">{job.company}</td>
                                <td className="py-4 px-6 text-center text-lg border">{job.jobTitle}</td>
                                <td className="py-4 px-6 text-center text-lg border">
                                    <a href={`/student/jobs/${job._id}`}  className="flex justify-center  items-center text-blue-600 hover:text-blue-800 gap-2">
                                        View Job Details<ArrowUpRightFromSquareIcon/>
                                    </a>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default AppliedJobs