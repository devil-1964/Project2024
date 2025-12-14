import { useState, useEffect } from 'react';
import api from '../api/client';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode'; // Corrected import

const StudentDetailsForm = () => {
    const navigate = useNavigate();
    
    // State for form data
    const [formData, setFormData] = useState({
        userId: '',
        name: '',
        branch: '',
        batchYear: '',
        linkedinURL: '',
        githubURL: '',
        resumeURL: '',
        semCgpa: ['', '', '', '', '', '', '', ''], // Assuming 8 semesters max
        activeBacklogs: 0
    });

    // Ensure user is logged in
    useEffect(() => {
        const token = localStorage.getItem('Authorization');
        if (!token) {
            navigate('/login');
        } else {
            try {
                const decoded = jwtDecode(token);
                setFormData(prev => ({ ...prev, userId: decoded.userId }));
            } catch { navigate('/login'); }
        }
    }, [navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleCgpaChange = (index, value) => {
        const updatedCgpa = [...formData.semCgpa];
        updatedCgpa[index] = value;
        setFormData({
            ...formData,
            semCgpa: updatedCgpa,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate CGPA entries (ensure they are numbers)
        const validatedCgpa = formData.semCgpa.map(cgpa => 
            cgpa === '' ? null : parseFloat(cgpa)
        ).filter(cgpa => cgpa !== null);

        const studentData = {
            userId: formData.userId,
            name: formData.name,
            branch: formData.branch,
            batchYear: parseInt(formData.batchYear),
            linkedinURL: formData.linkedinURL || '',
            githubURL: formData.githubURL || '',
            resumeURL: formData.resumeURL,
            semCgpa: validatedCgpa,
            activeBacklogs: parseInt(formData.activeBacklogs) || 0,
        };

        try {
            const response = await api.post(`/api/student/create`, studentData);
            console.log('Student details submitted:', response.data);
            toast.success('Your details have been submitted successfully!');
            navigate("/student/dashboard");
        } catch (error) {
            console.error('Error submitting student details:', error?.response?.data || error.message);
            toast.error(error?.response?.data?.message || 'Failed to submit details. Please try again.');
        }
    };

    return (
        <div className="mx-auto p-6">
            <h2 className="text-2xl font-semibold mb-6 text-center">Student Details Form</h2>
            <div className="bg-white p-8 shadow-lg rounded-lg">
                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        {/* userId is derived from token and sent with payload */}

                        <div>
                            <label htmlFor="name" className="block text-sm font-medium">Full Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="input input-bordered w-full"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="branch" className="block text-sm font-medium">Branch</label>
                            <select
                                id="branch"
                                name="branch"
                                value={formData.branch}
                                onChange={handleChange}
                                className="input input-bordered w-full"
                                required
                            >
                                <option value="">Select Branch</option>
                                <option value="Computer Science">Computer Science</option>
                                <option value="Electrical Engineering">Electrical Engineering</option>
                                <option value="Mechanical Engineering">Mechanical Engineering</option>
                                <option value="Civil Engineering">Civil Engineering</option>
                                <option value="Electronics">Electronics</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="batchYear" className="block text-sm font-medium">Batch Year</label>
                            <input
                                type="number"
                                id="batchYear"
                                name="batchYear"
                                value={formData.batchYear}
                                onChange={handleChange}
                                className="input input-bordered w-full"
                                required
                                min="2000"
                                max="2030"
                            />
                        </div>
                        {/* Phone and email removed from StudentDetails; they belong to User */}
                        <div>
                            <label htmlFor="linkedinURL" className="block text-sm font-medium">LinkedIn Profile (Optional)</label>
                            <input
                                type="url"
                                id="linkedinURL"
                                name="linkedinURL"
                                value={formData.linkedinURL}
                                onChange={handleChange}
                                className="input input-bordered w-full"
                            />
                        </div>
                        <div>
                            <label htmlFor="githubURL" className="block text-sm font-medium">GitHub Profile (Optional)</label>
                            <input
                                type="url"
                                id="githubURL"
                                name="githubURL"
                                value={formData.githubURL}
                                onChange={handleChange}
                                className="input input-bordered w-full"
                            />
                        </div>
                        <div>
                            <label htmlFor="resumeURL" className="block text-sm font-medium">Resume Link</label>
                            <input
                                type="url"
                                id="resumeURL"
                                name="resumeURL"
                                value={formData.resumeURL}
                                onChange={handleChange}
                                className="input input-bordered w-full"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Semester CGPAs</label>
                            <div className="grid grid-cols-4 gap-2">
                                {formData.semCgpa.map((cgpa, index) => (
                                    <input
                                        key={index}
                                        type="number"
                                        placeholder={`Sem ${index + 1} CGPA`}
                                        value={cgpa}
                                        onChange={(e) => handleCgpaChange(index, e.target.value)}
                                        step="0.01"
                                        min="0"
                                        max="10"
                                        className="input input-bordered w-full"
                                    />
                                ))}
                            </div>
                        </div>
                        <div>
                            <label htmlFor="activeBacklogs" className="block text-sm font-medium">Active Backlogs</label>
                            <input
                                type="number"
                                id="activeBacklogs"
                                name="activeBacklogs"
                                value={formData.activeBacklogs}
                                onChange={handleChange}
                                className="input input-bordered w-full"
                                min="0"
                                max="10"
                            />
                        </div>
                        <button 
                            type="submit" 
                            className="btn bg-blue-500 text-white px-6 py-2 mt-4 w-full"
                        >
                            Submit Student Details
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default StudentDetailsForm;
