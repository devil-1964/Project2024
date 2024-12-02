import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Briefcase, MapPin, Building, CheckCircle, X, Save } from 'lucide-react';

let mockJobs = [
    { _id: '1', title: 'Software Engineer', description: 'Develop and maintain software applications.', location: 'Remote', company: 'Tech Co.', isOpen: true },
    { _id: '2', title: 'Data Analyst', description: 'Analyze data to provide insights and reports.', location: 'New York, USA', company: 'DataTech Inc.', isOpen: false },
    { _id: '3', title: 'UI/UX Designer', description: 'Design intuitive and user-friendly interfaces.', location: 'London, UK', company: 'DesignPro', isOpen: true },
];

const JobEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const jobToEdit = mockJobs.find((job) => job._id === id);
        if (jobToEdit) {
            setJob(jobToEdit);
        } else {
            toast.error('Job not found!');
            navigate('/admin/jobs');
        }
        setLoading(false);
    }, [id, navigate]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setJob((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const jobIndex = mockJobs.findIndex((j) => j._id === id);
        if (jobIndex !== -1) {
            mockJobs[jobIndex] = job;
            toast.success('Job updated successfully!');
            navigate('/admin/jobs');
        } else {
            toast.error('Failed to update job!');
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-950"></div>
            </div>
        );
    }

    if (!job) {
        return (
            <div className="container mx-auto px-4 py-8 text-center">
                <h2 className="text-2xl font-bold text-red-500">Job not found</h2>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="bg-gradient-to-r from-blue-900 to-blue-950 p-6">
                    <h2 className="text-3xl font-bold text-white text-center">Edit Job</h2>
                </div>
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    <div className="space-y-2">
                        <label htmlFor="title" className="flex items-center text-sm font-medium text-gray-700">
                            <Briefcase className="w-5 h-5 mr-2 text-blue-950" />
                            Job Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={job.title}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-950 transition duration-200"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="description" className="flex items-center text-sm font-medium text-gray-700">
                            <Briefcase className="w-5 h-5 mr-2 text-blue-950" />
                            Job Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={job.description}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-950 transition duration-200"
                            rows="4"
                            required
                        ></textarea>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="location" className="flex items-center text-sm font-medium text-gray-700">
                            <MapPin className="w-5 h-5 mr-2 text-blue-950" />
                            Location
                        </label>
                        <input
                            type="text"
                            id="location"
                            name="location"
                            value={job.location}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-950 transition duration-200"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="company" className="flex items-center text-sm font-medium text-gray-700">
                            <Building className="w-5 h-5 mr-2 text-blue-950" />
                            Company
                        </label>
                        <input
                            type="text"
                            id="company"
                            name="company"
                            value={job.company}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-950 transition duration-200"
                            required
                        />
                    </div>

                    <div className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            id="isOpen"
                            name="isOpen"
                            checked={job.isOpen}
                            onChange={handleChange}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-950"
                        />
                        <label htmlFor="isOpen" className="flex items-center text-sm font-medium text-gray-700">
                            <CheckCircle className="w-5 h-5 mr-2 text-blue-950" />
                            Is the job open for applications?
                        </label>
                    </div>

                    <div className="flex justify-between pt-4">
                        <button
                            type="button"
                            onClick={() => navigate('/admin/jobs')}
                            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition duration-300 flex items-center"
                        >
                            <X className="w-5 h-5 mr-2" />
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-950 text-white rounded-lg hover:bg-blue-600 transition duration-300 flex items-center"
                        >
                            <Save className="w-5 h-5 mr-2" />
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default JobEdit;

