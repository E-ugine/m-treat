import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import SignUp from "./pages/SignUp"; 
import Login from "./pages/Login";
import Dashboard from "./dashboard/Dashboard";

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/register" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </>
  );
}
