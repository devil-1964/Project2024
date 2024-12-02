import React, { useState } from 'react';
import { Briefcase, MapPin, Building, Calendar, Code, Plus } from 'lucide-react';

let mockJobs = [
    { _id: '1', title: 'Software Engineer', description: 'Develop and maintain software applications.', location: 'Remote', company: 'Tech Co.', deadline: '2024-12-31', skills: 'JavaScript, Node.js, React' },
    { _id: '2', title: 'Data Analyst', description: 'Analyze data to provide insights and reports.', location: 'New York, USA', company: 'DataTech Inc.', deadline: '2024-11-30', skills: 'Python, SQL, Data Visualization' },
    { _id: '3', title: 'UI/UX Designer', description: 'Design intuitive and user-friendly interfaces.', location: 'London, UK', company: 'DesignPro', deadline: '2024-12-15', skills: 'Figma, Adobe XD, HTML, CSS' },
];

const JobForm = () => {
    const [job, setJob] = useState({
        title: '',
        description: '',
        location: '',
        company: '',
        deadline: '',
        skills: '',
    });
    const [message, setMessage] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setJob((prevJob) => ({
            ...prevJob,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newJob = { ...job, _id: String(mockJobs.length + 1) };
        mockJobs.push(newJob);
        setMessage('Job added successfully!');
        setJob({
            title: '',
            description: '',
            location: '',
            company: '',
            deadline: '',
            skills: '',
        });
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="bg-gradient-to-r from-blue-900 to-blue-900 p-6">
                    <h2 className="text-3xl font-bold text-white text-center">Add New Job</h2>
                </div>
                {message && (
                    <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6" role="alert">
                        <p className="font-bold">Success!</p>
                        <p>{message}</p>
                    </div>
                )}
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
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
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
                        <label htmlFor="deadline" className="flex items-center text-sm font-medium text-gray-700">
                            <Calendar className="w-5 h-5 mr-2 text-blue-950" />
                            Application Deadline
                        </label>
                        <input
                            type="date"
                            id="deadline"
                            name="deadline"
                            value={job.deadline}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="skills" className="flex items-center text-sm font-medium text-gray-700">
                            <Code className="w-5 h-5 mr-2 text-blue-950" />
                            Required Skills
                        </label>
                        <input
                            type="text"
                            id="skills"
                            name="skills"
                            value={job.skills}
                            onChange={handleInputChange}
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

