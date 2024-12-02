import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Briefcase, MapPin, Trash2, Edit2, CheckCircle, XCircle } from 'lucide-react';

let mockJobs = [
    { _id: '1', title: 'Software Engineer', description: 'Develop and maintain software applications.', location: 'Remote', company: 'Tech Co.', isOpen: true },
    { _id: '2', title: 'Data Analyst', description: 'Analyze data to provide insights and reports.', location: 'New York, USA', company: 'DataTech Inc.', isOpen: false },
    { _id: '3', title: 'UI/UX Designer', description: 'Design intuitive and user-friendly interfaces.', location: 'London, UK', company: 'DesignPro', isOpen: true },
];

const JobList = ({ isAdmin }) => {
    const [selectedJobId, setSelectedJobId] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const navigate = useNavigate();

    const openDeleteModal = (jobId) => {
        setSelectedJobId(jobId);
        setIsDeleteModalOpen(true);
    };

    const handleDelete = () => {
        mockJobs = mockJobs.filter(job => job._id !== selectedJobId);
        setIsDeleteModalOpen(false);
        toast.success('Job deleted successfully!');
    };

    const handleEdit = (jobId) => {
        navigate(`/admin/jobs/edit/${jobId}`);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">
                {isAdmin ? 'Job List (Admin)' : 'Available Jobs'}
            </h2>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {mockJobs.map((job) => (
                    <div key={job._id} className="bg-white p-6 rounded-lg shadow-lg transition duration-300 ease-in-out hover:shadow-xl">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-xl font-semibold text-gray-800">{job.title}</h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                job.isOpen ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                                {job.isOpen ? (
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
                        <p className="text-sm text-gray-600 mb-4">{job.description}</p>
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
                            </div>
                        ) : (
                            job.isOpen && (
                                <button
                                    className="w-full bg-blue-500 text-white px-4 py-2 mt-4 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out"
                                    onClick={() => navigate('/student/apply/1')}
                                >
                                    Apply Now
                                </button>
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
