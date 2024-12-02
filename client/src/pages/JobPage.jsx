import React, { useEffect, useState } from 'react';
import JobList from './JobList'; // Job list to show available jobs for students

const JobPage = () => {
    const [isAdmin, setIsAdmin] = useState(true);

    // Check user role (admin or student) from localStorage or authentication
    useEffect(() => {
        const userRole = localStorage.getItem('userRole'); // Example role check
        if (userRole === 'admin') {
            setIsAdmin(true);
        }
    }, []);

    return (
        <div className="p-6">
            {/* Render the job list for students */}
            <JobList isAdmin={isAdmin} />
        </div>
    );
};

export default JobPage;
