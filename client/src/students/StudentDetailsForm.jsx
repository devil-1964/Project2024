import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode'; // Corrected import

const StudentDetailsForm = () => {
    const navigate = useNavigate();
    
    // State for form data
    const [formData, setFormData] = useState({
        userId: '', // Initially empty
        name: '',
        branch: '',
        batchYear: '',
        phone: '',
        email: '',
        linkedinURL: '',
        githubURL: '',
        resumeURL: '',
        semCgpa: ['', '', '', '', '', '', '', ''], // Assuming 8 semesters max
        activeBacklogs: 0
    });

    // UseEffect to decode JWT and set userId in formData
    useEffect(() => {
        const token = localStorage.getItem('Authorization'); // Assuming the token is saved in localStorage after login
        
        if (token) {
            try {
                const decodedToken = jwtDecode(token); // Decode the token using jwt-decode
                const userId = decodedToken.userId; // Assuming the userId is stored in the token
                console.log(userId)
                setFormData((prevData) => ({
                    ...prevData,
                    userId: userId // Add userId to formData
                }));
            } catch (error) {
                console.error('Invalid or expired token');
                navigate('/login'); // Redirect to login page if token is invalid
            }
        } else {
            navigate('/login'); // Redirect to login page if no token found
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
            ...formData,
            semCgpa: validatedCgpa,
            batchYear: parseInt(formData.batchYear),
            activeBacklogs: parseInt(formData.activeBacklogs)
        };

        try {
            const response = await axios.post(`${import.meta.env.VITE_URL_API}/api/student/create`, studentData);
            console.log('Student details submitted:', response.data);
            toast.success('Your details have been submitted successfully!');
            navigate("/student/dashboard");
        } catch (error) {
            console.log(studentData);
            console.error('Error submitting student details:', error);
            toast.error('Failed to submit details. Please try again.');
        }
    };

    return (
        <div className="mx-auto p-6">
            <h2 className="text-2xl font-semibold mb-6 text-center">Student Details Form</h2>
            <div className="bg-white p-8 shadow-lg rounded-lg">
                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        {/* Hidden userId field */}
                        <input
                            type="hidden"
                            id="userId"
                            name="userId"
                            value={formData.userId}
                            onChange={handleChange}
                        />

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
                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium">Phone Number</label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={formData.phone}
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
