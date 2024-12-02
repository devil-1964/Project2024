import React, { useState } from 'react';
import toast from 'react-hot-toast';

const JobApplicationForm = ({  }) => {
    const job = {
        title: 'Software Engineer Intern',
        description: 'We are looking for a talented and motivated Software Engineering Intern to join our team. As an intern, you will assist in the development of high-quality software applications, contribute to solving real-world challenges, and gain valuable experience in a collaborative environment.',
        location: 'Remote',
        skills: 'JavaScript, React, Node.js, HTML, CSS',
        deadline: '31st December 2024',
    };
    const [formData, setFormData] = useState({
        resumeLink: '',
        cgpa: '',
        branch: '',
        college: '',
        passoutYear: '',
        contactNo: '',
        email: '',
        rollNo: '',
        acceptedTerms: false,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleCheckboxChange = () => {
        setFormData({
            ...formData,
            acceptedTerms: !formData.acceptedTerms,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Data Submitted:', formData);
        toast.success('Your application has been submitted!');
    };

    return (
        <div className=" mx-auto p-6">
            <h2 className="text-2xl font-semibold mb-6 text-center">Job Application</h2>
            <div className="lg:flex lg:space-x-8">
                {/* Job Description (Left) */}
                <div className="lg:w-1/2 bg-white p-6 shadow-lg rounded-lg mb-6 lg:mb-0">
                    <h3 className="text-xl font-bold mb-4">{job.title}</h3>
                    <p className="text-sm text-gray-700 mb-4">{job.description}</p>
                    <div className="space-y-2 text-sm text-gray-700">
                        <p><strong>Location:</strong> {job.location}</p>
                        <p><strong>Required Skills:</strong> {job.skills}</p>
                        <p><strong>Application Deadline:</strong> {job.deadline}</p>
                    </div>
                </div>

                {/* Job Application Form (Right) */}
                <div className="lg:w-1/2 bg-white p-6 shadow-lg rounded-lg">
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="resumeLink" className="block text-sm font-medium">Resume Link (Google Drive)</label>
                                <input
                                    type="url"
                                    id="resumeLink"
                                    name="resumeLink"
                                    value={formData.resumeLink}
                                    onChange={handleChange}
                                    className="input input-bordered w-full"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="cgpa" className="block text-sm font-medium">CGPA</label>
                                <input
                                    type="number"
                                    id="cgpa"
                                    name="cgpa"
                                    value={formData.cgpa}
                                    onChange={handleChange}
                                    className="input input-bordered w-full"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="branch" className="block text-sm font-medium">Branch</label>
                                <input
                                    type="text"
                                    id="branch"
                                    name="branch"
                                    value={formData.branch}
                                    onChange={handleChange}
                                    className="input input-bordered w-full"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="college" className="block text-sm font-medium">College Name</label>
                                <input
                                    type="text"
                                    id="college"
                                    name="college"
                                    value={formData.college}
                                    onChange={handleChange}
                                    className="input input-bordered w-full"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="passoutYear" className="block text-sm font-medium">Passout Year</label>
                                <input
                                    type="number"
                                    id="passoutYear"
                                    name="passoutYear"
                                    value={formData.passoutYear}
                                    onChange={handleChange}
                                    className="input input-bordered w-full"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="contactNo" className="block text-sm font-medium">Contact No.</label>
                                <input
                                    type="tel"
                                    id="contactNo"
                                    name="contactNo"
                                    value={formData.contactNo}
                                    onChange={handleChange}
                                    className="input input-bordered w-full"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="input input-bordered w-full"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="rollNo" className="block text-sm font-medium">Roll No.</label>
                                <input
                                    type="text"
                                    id="rollNo"
                                    name="rollNo"
                                    value={formData.rollNo}
                                    onChange={handleChange}
                                    className="input input-bordered w-full"
                                    required
                                />
                            </div>
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="acceptedTerms"
                                    name="acceptedTerms"
                                    checked={formData.acceptedTerms}
                                    onChange={handleCheckboxChange}
                                    required
                                    className="mr-2"
                                />
                                <label htmlFor="acceptedTerms" className="text-sm">
                                    I accept all terms & conditions
                                </label>
                            </div>
                            <button type="submit" className="btn bg-blue-500 text-white px-6 py-2 mt-4 w-full">
                                Apply
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default JobApplicationForm;
