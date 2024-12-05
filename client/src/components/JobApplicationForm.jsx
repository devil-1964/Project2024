import  { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import moment from "moment"
import { Loader } from 'lucide-react';

const JobApplicationForm = () => {

    const { id } = useParams();
    const [jobs, setJobs] = useState(null);
    const [skills, setSkills] = useState(null);
    const [loading, setLoading] = useState(true);
    // console.log(id)

    const fetchJobs = async (id) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_URL_API}/api/jobs/${id}`);
            setJobs(response.data);
            console.log(response.data)
            setSkills(response.data.requiredSkills)
            setLoading(false)
        } catch (error) {
            console.error('Error fetching jobs:', error);
            toast.error('Failed to load jobs. Please try again later.');
        }
    };

    useEffect(() => {
        fetchJobs(id);
    }, [id]);


    // const [formData, setFormData] = useState({
    //     resumeLink: '',
    //     cgpa: '',
    //     branch: '',
    //     college: '',
    //     passoutYear: '',
    //     contactNo: '',
    //     email: '',
    //     rollNo: '',
    //     acceptedTerms: false,
    //     skills: [],
    // });

    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setFormData({
    //         ...formData,
    //         [name]: value,
    //     });
    // };

    // const handleCheckboxChange = () => {
    //     setFormData({
    //         ...formData,
    //         acceptedTerms: !formData.acceptedTerms,
    //     });
    // };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     // Convert skills string to an array and update formData
    //     const skillsArray = formData.skills.split(' ').map(skill => skill.trim()).filter(skill => skill);

    //     const applicationData = {
    //         ...formData,
    //         skills: skillsArray, // Convert string to array of skills
    //     };

    //     try {
    //         // Post the application data using Axios
    //         const response = await axios.post(`${import.meta.env.VITE_URL_API}/api/jobs/apply`, applicationData);
    //         console.log('Application submitted:', response.data);
    //         toast.success('Your application has been submitted!');
    //     } catch (error) {
    //         console.error('Error submitting application:', error);
    //         toast.error('Failed to submit your application. Please try again.');
    //     }
    // };

    return (
        <div className="mx-auto p-6">
            <h2 className="lg:text-5xl text-3xl font-semibold mb-6 text-center">Job Application</h2>
            <div className="lg:flex lg:space-x-8 items-center">
                {/* Job Description (Left) */}

                {!loading ? (<div className="lg:w-2/3 h-fit mx-auto bg-white p-12 shadow-lg rounded-lg mb-6 lg:mb-0">
                    <h3 className="lg:text-3xl text-xl font-bold mb-4">{jobs.jobTitle}</h3>
                    <p className="lg:text-lg text-md text-gray-700 mb-4">{jobs.jobDescription}</p>
                    <div className="space-y-2 lg:text-lg text-md text-gray-700">
                        <p><strong>Location:</strong> {jobs.location}</p>
                        <div className='flex flex-wrap gap-2 items-center'><strong>Required Skills:</strong>
                            <span className='flex text-sm gap-1 flex-wrap'>
                                {skills && skills.map((skill, index) => (
                                    
                                    <div key={index} className="bg-gray-100 px-3 py-1 rounded-full ">
                                            <h3 className="font-semibold text-gray-800">{skill}</h3>
                                    </div>
                                    
                                ))}

                            </span>
                        </div>
                        <p><strong>Application Deadline:</strong> {moment.utc(jobs.lastDateToApply).format('MMM Do YY')
                        }</p>
                    </div>
                </div>) : (<div className="min-h-[50vh] w-full bg-gray-50 flex items-center justify-center">
                    <p className="text-2xl font-bold text-gray-600 flex items-center gap-3"><Loader className='animate-spin'/> Loading...</p>
                </div>)


                }


                {/* Job Application Form (Right) */}
                {/* <div className="lg:w-1/2 bg-white p-6 shadow-lg rounded-lg">
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
                            <div>
                                <label htmlFor="skills" className="block text-sm font-medium">Skills (separate with spaces)</label>
                                <input
                                    type="text"
                                    id="skills"
                                    name="skills"
                                    value={formData.skills}
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
                </div> */}
            </div>
        </div>
    );
};

export default JobApplicationForm;
