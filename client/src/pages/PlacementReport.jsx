import { useEffect, useState } from 'react';
import axios from 'axios';
import { Doughnut, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Loader } from 'lucide-react';

ChartJS.register(ArcElement, Tooltip, Legend);

const PlacementReport = () => {
    const [placementReports, setPlacementReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const { yrs } = useParams();

    // Fetch data using axios
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_URL_API}/api/placement-year/${yrs}`);
                setPlacementReports(response.data.branches); // assuming response.data contains the data structure you need
                // console.log(response.data.branches); 
                // Check the structure of the response in the console
                setLoading(false);
            } catch {
                toast.error('Failed to fetch data');
                setLoading(false);
            }
        };

        fetchData();
    }, [yrs]); // Including yrs in dependency array to refetch if the year changes

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <p className="text-2xl font-bold text-gray-600 flex items-center gap-3"><Loader className='animate-spin' /> Loading...</p>
            </div>
        );
    }

    // Assuming the response data has a structure like this:
    // placementReports = [{ year: "2024", branches: [ ...branchData ] }]
    const branches = placementReports || []; // Get branches from the first report (if available)

    // If no data found for this year
    if (!branches || branches.length === 0) {
        return (
            <div className="p-8 max-w-7xl mx-auto flex flex-col items-center text-center">
                <h2 className="text-4xl font-semibold text-gray-800 mb-8">Placement Report {yrs}-{Number(yrs)+1}</h2>
                
                <div className="flex flex-col items-center justify-center py-16">
                    <div className="bg-white rounded-lg shadow-md p-12 max-w-md w-full">
                        <div className="text-gray-400 mb-4">
                            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">No Data Available</h3>
                        <p className="text-gray-500 text-sm mb-4">
                            Placement data for {yrs}-{Number(yrs)+1} is currently being compiled. Please check back soon for detailed placement statistics and reports.
                        </p>
                        <div className="text-xs text-gray-400">
                            Data updating soon...
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Calculate average package for all branches
    const overallStats = branches.reduce(
        (acc, branch) => {
            acc.sanctionedIntake += branch.sanctionedIntake;
            acc.eligibleStudents += branch.eligibleInterestedStudents;
            acc.totalPlacement += branch.totalPlacementIncludingHigherEducation;
            acc.doubleOffers += branch.doubleOffers;
            acc.averagePackage += branch.averagePackageLPA;
            return acc;
        },
        {
            sanctionedIntake: 0,
            eligibleStudents: 0,
            totalPlacement: 0,
            doubleOffers: 0,
            averagePackage: 0,
        }
    );

    // Calculate average package for all branches
    overallStats.averagePackage = (overallStats.averagePackage / branches.length).toFixed(2);

    // Calculate overall placement percentage
    const overallPlacementPercentage = (
        (overallStats.totalPlacement / overallStats.eligibleStudents) *
        100
    ).toFixed(2);

    // Pie chart for placement percentage by branch
    const pieChartData = {
        labels: branches.map((branch) => branch.branchName),
        datasets: [
            {
                label: 'Average Package',
                data: branches.map((branch) => branch.averagePackageLPA),
                backgroundColor: [
                    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#F7464A', '#8E44AD', '#2ECC71','blue',
                ],
                hoverOffset: 4,
            },
        ],
    };

    // Pie chart for total placement
    const pieChartData2 = {
        labels: ['Placed', 'Unplaced'],
        datasets: [
            {
                label: 'Placement Percentage',
                data: [
                    (overallStats.totalPlacement * 100) / overallStats.eligibleStudents,
                    ((overallStats.eligibleStudents - overallStats.totalPlacement) * 100) /
                        overallStats.eligibleStudents,
                ],
                backgroundColor: ['orange', 'blue'],
                hoverOffset: 4,
            },
        ],
    };

    return (
        <div className="p-8 max-w-7xl mx-auto flex flex-col items-center text-center">
            <h2 className="text-4xl font-semibold text-gray-800 mb-8">Placement Report {yrs}-{Number(yrs)+1}</h2>

            <div className="flex w-full mb-8 flex-row justify-center max-sm:flex-col">
                <div className="w-2/5 pr-4 max-sm:hidden">
                    <h3 className="text-2xl text-center font-semibold text-gray-800 mb-4">
                        Average Branch Package
                    </h3>
                    <Doughnut data={pieChartData} />
                </div>

                <div className="w-2/5 max-sm:w-full pl-4">
                    <h3 className="text-2xl text-center font-semibold text-gray-800 mb-4">
                        Total Placement Percentages
                    </h3>
                    <Pie data={pieChartData2} />
                </div>
            </div>

            <h2 className="text-3xl font-semibold text-gray-800 mb-8">Detailed Report</h2>
            <div className="overflow-auto w-[90vw] placementTable">
                <table className="min-w-full text-lg max-sm:text-sm table-auto border-collapse bg-white rounded-lg shadow-md">
                    <thead>
                        <tr className="border-b text-center">
                            <th className="py-4 px-6 font-semibold text-gray-700">Branch</th>
                            <th className="py-4 px-6 font-semibold text-gray-700">Sanctioned Intake</th>
                            <th className="py-4 px-6 font-semibold text-gray-700">Eligible Students</th>
                            <th className="py-4 px-6 font-semibold text-gray-700">Total Placement</th>
                            <th className="py-4 px-6 font-semibold text-gray-700">Double Offer</th>
                            <th className="py-4 px-6 font-semibold text-gray-700">Placement %</th>
                            <th className="py-4 px-6 font-semibold text-gray-700">Average Package (LPA)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {branches.map((branch, index) => (
                            <tr key={index} className="border-b hover:bg-gray-100">
                                <td className="py-4 px-6 border">{branch.branchName}</td>
                                <td className="py-4 px-6 border">{branch.sanctionedIntake}</td>
                                <td className="py-4 px-6 border">{branch.eligibleInterestedStudents}</td>
                                <td className="py-4 px-6 border">{branch.totalPlacementIncludingHigherEducation}</td>
                                <td className="py-4 px-6 border">{branch.doubleOffers}</td>
                                <td className="py-4 px-6 border">{branch.placementPercentage}%</td>
                                <td className="py-4 px-6 border">{branch.averagePackageLPA}</td>
                            </tr>
                        ))}
                        {/* Overall Row */}
                        <tr className="border-b bg-gray-100">
                            <td className="py-4 px-6 font-semibold">Overall</td>
                            <td className="py-4 px-6 ">{overallStats.sanctionedIntake}</td>
                            <td className="py-4 px-6 ">{overallStats.eligibleStudents}</td>
                            <td className="py-4 px-6 ">{overallStats.totalPlacement}</td>
                            <td className="py-4 px-6 ">{overallStats.doubleOffers}</td>
                            <td className="py-4 px-6 ">{overallPlacementPercentage}%</td>
                            <td className="py-4 px-6 ">{overallStats.averagePackage}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PlacementReport;
