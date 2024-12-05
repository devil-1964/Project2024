import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode'; // Corrected import
import JobList from './JobList'; // Job list to show available jobs for students

const JobPage = () => {
    const [userRole, setUserRole] = useState(null);
    const [isId, setIsID] = useState(null);

    const decodeToken = (token) => {
        try {
            // Decode the token
            const decoded = jwtDecode(token);
            setUserRole(decoded.role)
            setIsID(decoded.userId)
        } catch (error) {
            console.error('Error decoding token', error);
            return null;
        }
    };

    // Check user role (admin or student) from localStorage or authentication
    useEffect(() => {
        const token = localStorage.getItem('Authorization');
        if (token) {
            const decoded = decodeToken(token);
            if (decoded) {
                // Set user role based on the decoded token
                setUserRole(decoded.role);
            }
        }
    }, []);

    return (
        <div className="p-6">
            {/* Render the job list for students, pass userRole to JobList */}
            <JobList userRole={userRole} isId={isId}/>
        </div>
    );
};

export default JobPage;
