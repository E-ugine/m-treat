import { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [patient, setPatient] = useState({});
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchPatient = async () => {
            try {
                const response = await axios.get('/api/patient', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                });
                setPatient(response.data);
            } catch (err) {
                setError('Failed to fetch patient data.');
            }
        };
        fetchPatient();
    }, []);

    return (
        <div>
            <h2>Dashboard</h2>
            {error ? (
                <p style={{ color: 'red' }}>{error}</p>
            ) : (
                <div>
                    <p>Name: {patient.name}</p>
                    <p>Email: {patient.email}</p>
                    <p>Phone: {patient.phone}</p>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
