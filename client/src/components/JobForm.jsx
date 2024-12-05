import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Briefcase, MapPin, Building, Calendar, Code, Plus } from 'lucide-react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const JobForm = () => {
    const [adminId, setAdminId] = useState(null);
    const [job, setJob] = useState({
        jobTitle: '',
        jobDescription: '',
        location: '',
        company: '',
        lastDateToApply: '',
        requiredSkills: '', // Keep as a string for input
        adminId: adminId,
    });

    // Decode token and extract admin ID
    const decodeToken = (token) => {
        try {
            const decoded = jwtDecode(token);
            setAdminId(decoded.userId);
        } catch (error) {
            console.error('Error decoding token', error);
            toast.error('Failed to decode token');
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('Authorization');
        if (token) {
            decodeToken(token); // Decode token to set adminId
        }
    }, []);

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setJob((prevJob) => ({
            ...prevJob,
            [name]: value,
        }));
    };

    // Handle form submission (Post job to server)
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!adminId) {
            toast.error('Admin not authenticated!');
            return;
        }

        // Convert requiredSkills from string to an array
        const skillsArray = job.requiredSkills.trim().split(',');

        // Create the job object with the array skills
        const newJob = {
            ...job,
            requiredSkills: skillsArray,
            adminId
        };

        try {
            // Post the job to the server
            const response = await axios.post(`${import.meta.env.VITE_URL_API}/api/jobs/create`, newJob
                , {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("Authorization")}`,
                    },
                }

            );
            toast.success('Job posted successfully!');
            setJob({
                jobTitle: '',
                jobDescription: '',
                location: '',
                company: '',
                lastDateToApply: '',
                requiredSkills: '', // Reset to an empty string
                adminId: adminId,
            });
        } catch (error) {
            console.error('Error posting job:', error);
            toast.error('Failed to post job. Please try again.');
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Toaster for notifications */}
            <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="bg-gradient-to-r from-blue-900 to-blue-900 p-6">
                    <h2 className="text-3xl font-bold text-white text-center">Add New Job</h2>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    <div className="space-y-2">
                        <label htmlFor="jobTitle" className="flex items-center text-sm font-medium text-gray-700">
                            <Briefcase className="w-5 h-5 mr-2 text-blue-950" />
                            Job Title
                        </label>
                        <input
                            type="text"
                            id="jobTitle"
                            name="jobTitle"
                            value={job.jobTitle}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="jobDescription" className="flex items-center text-sm font-medium text-gray-700">
                            <Briefcase className="w-5 h-5 mr-2 text-blue-950" />
                            Job Description
                        </label>
                        <textarea
                            id="jobDescription"
                            name="jobDescription"
                            value={job.jobDescription}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
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
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
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
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="lastDateToApply" className="flex items-center text-sm font-medium text-gray-700">
                            <Calendar className="w-5 h-5 mr-2 text-blue-950" />
                            Application Deadline
                        </label>
                        <input
                            type="date"
                            id="lastDateToApply"
                            name="lastDateToApply"
                            value={job.lastDateToApply}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="requiredSkills" className="flex items-center text-sm font-medium text-gray-700">
                            <Code className="w-5 h-5 mr-2 text-blue-950" />
                            Required Skills
                        </label>
                        <input
                            type="text"
                            id="requiredSkills"
                            name="requiredSkills"
                            value={job.requiredSkills}
                            onChange={handleInputChange}
                            placeholder="Enter skills separated by spaces"
                            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                            required
                        />
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            className="w-full bg-blue-950 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-600 transition-colors duration-200 flex items-center justify-center"
                        >
                            <Plus className="w-5 h-5 mr-2" />
                            Add Job
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default JobForm;
