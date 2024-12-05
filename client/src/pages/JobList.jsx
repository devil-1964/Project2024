import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import moment from "moment"
import { useNavigate } from 'react-router-dom';
import { Briefcase, MapPin, Trash2, Edit2, CheckCircle, XCircle, Sheet } from 'lucide-react';

const JobList = ({ userRole, isId }) => {
    const [jobs, setJobs] = useState([]);
    const [isOpen, setIsOpen] = useState(true)
    const [selectedJobId, setSelectedJobId] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const navigate = useNavigate();
    const id = isId
    const isAdmin = userRole == 'admin'; // Adjust this based on your roles.



    // Fetch job list from the server
    const fetchJobs = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_URL_API}/api/jobs`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('Authorization')}`,
                },
            });
            // console.log(response)
            setJobs(response.data);
        } catch (error) {
            console.error('Error fetching jobs:', error);
            toast.error('Failed to load jobs. Please try again later.');
        }
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    // Open delete modal
    const openDeleteModal = (jobId) => {
        setSelectedJobId(jobId);
        setIsDeleteModalOpen(true);
    };

    // Handle job deletion
    const handleDelete = async () => {
        // console.log(isId)
        try {
            await axios.delete(`${import.meta.env.VITE_URL_API}/api/jobs/${selectedJobId}/`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('Authorization')}`,
                },
                data: { adminId: id }, // Correct placement of data
            });
            toast.success('Job deleted successfully!');
            setJobs(jobs.filter((job) => job._id !== selectedJobId)); // Update state
        } catch (error) {
            console.error('Error deleting job:', error);
            toast.error('Failed to delete job. Please try again.');
        } finally {
            setIsDeleteModalOpen(false);
        }
    };

    const handleView=async(jobId)=>{
        navigate(`/student/jobs/${jobId}`)
    }

    const handleApply = async (jobId) => {
        console.log(jobId);  // Log jobId for debugging
        console.log(id);     // Log userId for debugging

        try {
            // Send POST request to apply for a job
            const response = await axios.post(`${import.meta.env.VITE_URL_API}/api/jobs/apply`, {
                userId: id,    // The ID of the user applying
                jobId: jobId   // The ID of the job being applied for
            });

            // Assuming the API sends a success message or status
            if (response.data.message === 'Job application successful') {
                toast.success('Job application submitted successfully!');

                // Update job status in the UI to reflect application
                setJobs(jobs.map((job) =>
                    job._id === jobId ? { ...job, applied: true } : job  // Mark job as applied
                ));
            } else {
                toast.error('Failed to apply for the job. Please try again.');
            }
        } catch (error) {
            console.error('Error applying for job:', error);

            // More detailed error handling based on the server response
            if (error.response) {
                console.error('Error response:', error.response.data);
            }

            toast.error(error.response.data.message);
        }
    };




    // Navigate to edit job page
    const handleEdit = (jobId) => {
        navigate(`/admin/jobs/edit/${jobId}`);
    };

    // Export job applicants
    const handleExport = async (jobId) => {
        try {
            // Trigger the export by making a GET request to the backend
            const response = await fetch(`${import.meta.env.VITE_URL_API}/api/jobs/${jobId}/export`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            // Check if the response is successful (status code 200)
            if (response.ok) {
                // Create a link element to trigger the file download
                const blob = await response.blob();  // Get the file content as a Blob
                const url = window.URL.createObjectURL(blob);  // Create an object URL for the blob
                const a = document.createElement('a');  // Create an anchor element
                a.href = url;  // Set the href to the object URL
                a.download = `job_${jobId}_applicants.xlsx`;  // Set the download filename
                a.click();  // Programmatically trigger the click to start downloading
                toast.success("Starting Download");
                window.URL.revokeObjectURL(url);  // Clean up the object URL
            } else {
                const errorData = await response.json();
                console.error("Error exporting file:", errorData.message || 'Unknown error');
                toast.error(errorData.message);
            }
        } catch (error) {
            console.error("Network error:", error);
            toast.error('Error exporting file. Please check your network connection and try again.');
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">
                {isAdmin ? 'Job List (Admin)' : 'Available Jobs'}
            </h2>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {jobs.map((job) => (
                    <div key={job._id} className="bg-white p-6 rounded-lg shadow-lg transition duration-300 ease-in-out hover:shadow-xl">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-xl font-semibold text-gray-800">{job.jobTitle}</h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${(moment().isBefore(job.lastDateToApply) || moment().isSame(job.lastDateToApply))? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                {(moment().isBefore(job.lastDateToApply) || moment().isSame(job.lastDateToApply)) ? (
                                    <span className="flex items-center">
                                        <CheckCircle className="w-4 h-4 mr-1" />
                                        Open
                                    </span>
                                ) : (
                                    <span className="flex items-center">
                                        <XCircle className="w-4 h-4 mr-1" />
                                        Closed
                                    </span>
                                )}
                            </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-4">{`${job.jobDescription.substring(0, 30)}...`}</p>
                        <div className="flex items-center text-sm text-gray-500 mb-2">
                            <Briefcase className="w-4 h-4 mr-2" />
                            <span>{job.company}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500 mb-4">
                            <MapPin className="w-4 h-4 mr-2" />
                            <span>{job.location}</span>
                        </div>

                        {isAdmin ? (
                            <div className="flex gap-4 mt-4">
                                <button
                                    onClick={() => openDeleteModal(job._id)}
                                    className="flex items-center justify-center w-full bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300 ease-in-out"
                                >
                                    <Trash2 className="w-4 h-4 mr-2" />
                                    Delete
                                </button>
                                <button
                                    onClick={() => handleEdit(job._id)}
                                    className="flex items-center justify-center w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out"
                                >
                                    <Edit2 className="w-4 h-4 mr-2" />
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleExport(job._id)}
                                    className="flex items-center justify-center w-full bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300 ease-in-out"
                                >
                                    <Sheet className="w-4 h-4 mr-2" />
                                    Export
                                </button>
                            </div>
                        ) : (
                            (moment().isBefore(job.lastDateToApply) || moment().isSame(job.lastDateToApply)) && (
                                <div className='flex gap-2'>
                                    <button
                                        className="w-full bg-gray-500 text-white px-4 py-2 mt-4 rounded-lg hover:bg-gray-600 transition duration-300 ease-in-out"
                                        onClick={() => handleView(job._id)}
                                    >
                                        View Job
                                    </button>
                                    <button
                                        className="w-full bg-blue-500 text-white px-4 py-2 mt-4 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out"
                                        onClick={() => handleApply(job._id)}
                                    >
                                        Apply Now
                                    </button>
                                </div>
                            )
                        )}
                    </div>
                ))}
            </div>

            {/* Delete Confirmation Modal */}
            {isDeleteModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
                        <h2 className="text-lg font-bold mb-4">Confirm Deletion</h2>
                        <p className="text-gray-600 mb-6">Are you sure you want to delete this job? This action cannot be undone.</p>
                        <div className="flex justify-end gap-4">
                            <button
                                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                                onClick={() => setIsDeleteModalOpen(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                                onClick={handleDelete}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default JobList;
