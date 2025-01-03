import { useEffect, useState } from 'react';
import axios from 'axios';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useNavigate } from 'react-router-dom';  

const Dashboard = () => {
  const [patient, setPatient] = useState({});
  const [bmi, setBmi] = useState(null);
  const [avgHeartRate, setAvgHeartRate] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [medicalHistory, setMedicalHistory] = useState([]);
  
  // State for editable fields
  const [editableName, setEditableName] = useState('');
  const [editablePhone, setEditablePhone] = useState('');
  const [isEditing, setIsEditing] = useState(false);  

  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();  // Use useNavigate for redirection

  useEffect(() => {
    // Fetch data
    const fetchPatientData = async () => {
      try {
        const response = await axios.get('/api/patient', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        const data = response.data;
        setPatient(data);
        setBmi(data.bmi);
        setAvgHeartRate(data.avgHeartRate);
        setMedicalHistory(data.medicalHistory || []);
        setNotifications(data.notifications || []);
        setEditableName(data.name);
        setEditablePhone(data.phone);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching patient data", error);
        setLoading(false);
      }
    };
    fetchPatientData();
  }, []);

  // Handle form submission
  const handleUpdate = async (e) => {
    e.preventDefault();
    
    try {
      const updatedPatient = {
        name: editableName,
        phone: editablePhone,
      };
      
      const response = await axios.put('/api/patient', updatedPatient, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      
      setPatient(response.data);
      setEditableName(response.data.name);
      setEditablePhone(response.data.phone);
      setIsEditing(false); // Exit edit mode after saving
      alert('Patient information updated successfully');
    } catch (error) {
      console.error('Error updating patient data', error);
      alert('Failed to update information');
    }
  };

  // Handle cancel editing
  const handleCancel = () => {
    setEditableName(patient.name);
    setEditablePhone(patient.phone);
    setIsEditing(false); // Cancel edit and revert changes
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token'); 
    navigate('/');  // Redirect to login page using useNavigate
  };

  return (
    <div className="p-6 bg-gray-800 rounded-lg max-w-6xl mx-auto">
      <h2 className="text-2xl font-semibold text-center text-yellow-800 mb-6">My Information</h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {/* Editable Info Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            <div className="card bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition">
              <h3 className="text-lg font-semibold">Personal Information</h3>
              {!isEditing ? (
                <div>
                  <p><strong>Name:</strong> {patient.name}</p>
                  <p><strong>Phone:</strong> {patient.phone}</p>
                  <p><strong>Email:</strong> {patient.email}</p>
                  <button
                    className="mt-4 p-2 bg-yellow-500 text-white rounded-lg"
                    onClick={() => setIsEditing(true)}
                  >
                    Edit Information
                  </button>
                </div>
              ) : (
                <form onSubmit={handleUpdate}>
                  <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={editableName}
                      onChange={(e) => setEditableName(e.target.value)}
                      className="mt-1 p-2 w-full rounded-md border-gray-300"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                      Phone
                    </label>
                    <input
                      type="text"
                      id="phone"
                      value={editablePhone}
                      onChange={(e) => setEditablePhone(e.target.value)}
                      className="mt-1 p-2 w-full rounded-md border-gray-300"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email 
                    </label>
                    <input
                      type="text"
                      id="email"
                      value={patient.email}
                      readOnly
                      className="mt-1 p-2 w-full rounded-md bg-gray-200 border-gray-300 cursor-not-allowed"
                    />
                  </div>
                  <div className="flex space-x-4">
                    <button
                      type="submit"
                      className="mt-4 p-2 bg-blue-600 text-white rounded-lg"
                    >
                      Save Changes
                    </button>
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="mt-4 p-2 bg-gray-400 text-white rounded-lg"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Health Metrics and Notifications */}
            <div className="card bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition">
              <h3 className="text-lg font-semibold">Health Metrics</h3>
              <div className="flex justify-between mt-4">
                <div className="w-1/2">
                  <CircularProgressbar value={bmi} maxValue={30} text={`${bmi}%`} />
                </div>
                <div className="w-1/2">
                  <p>Avg Heart Rate: {avgHeartRate || 'N/A'} bpm</p>
                </div>
              </div>
            </div>
          </div>

          {/* Notifications Section */}
          <div className="card bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition">
            <h3 className="text-lg font-semibold">Notifications</h3>
            {notifications.length > 0 ? (
              notifications.map((notif, idx) => (
                <div key={idx} className="mt-2 text-gray-700">{notif}</div>
              ))
            ) : (
              <p>No new notifications</p>
            )}
          </div>

          {/* Medical History */}
          <div className="card bg-white p-6 rounded-lg shadow-md mt-6">
            <h3 className="text-lg font-semibold">Medical History</h3>
            {medicalHistory.length > 0 ? (
              <ul>
                {medicalHistory.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            ) : (
              <p>No medical history available</p>
            )}
          </div>

          {/* Logout Button */}
          <div className="mt-4 text-center">
            <button
              onClick={handleLogout}
              className="p-2 bg-yellow-500 text-white rounded-lg"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
