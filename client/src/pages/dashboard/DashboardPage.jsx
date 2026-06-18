import React, { useEffect, useState } from 'react';
import { FaUsers, FaMale, FaFemale, FaFileAlt } from 'react-icons/fa';
import { fetchUsers } from '../../services/api';

const DashboardPage = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const load = async () => {
            const data = await fetchUsers();
            if (data) setUsers(data);
        };
        load();
    }, []);

    const totalUsers = users.length;
    const totalMales = users.filter(user => user.gender?.toLowerCase() === "male").length;
    const totalFemales = users.filter(user => user.gender?.toLowerCase() === "female").length;
    const totalResumes = users.filter(user => user.resume).length;

    return (
        <div className="bg-white p-4 rounded shadow-sm" style={{ border: "1px solid #dbeafe" }}>
            <div className="text-center mb-5 mt-3">
                <h1 className="fw-bold" style={{ color: "#2563eb", fontSize: "2.5rem" }}>
                    Resume Management System
                </h1>
                <p style={{ color: "#64748b", fontSize: "1.1rem" }}>
                    Overview of your users, skills, and resumes
                </p>
            </div>

            <div className="row g-4 mb-3">
                <div className="col-md-3 col-sm-6">
                    <div className="card text-center p-4 border-0 h-100" style={{ background: "#eff6ff", borderRadius: "16px", boxShadow: "0 4px 15px rgba(59,130,246,0.1)" }}>
                        <FaUsers style={{ fontSize: "2.5rem", color: "#60a5fa", margin: "0 auto 15px" }} />
                        <h2 style={{ color: "#2563eb", margin: 0, fontWeight: "700" }}>{totalUsers}</h2>
                        <span style={{ color: "#64748b", fontWeight: "600" }}>Total Users</span>
                    </div>
                </div>
                <div className="col-md-3 col-sm-6">
                    <div className="card text-center p-4 border-0 h-100" style={{ background: "#eff6ff", borderRadius: "16px", boxShadow: "0 4px 15px rgba(59,130,246,0.1)" }}>
                        <FaMale style={{ fontSize: "2.5rem", color: "#60a5fa", margin: "0 auto 15px" }} />
                        <h2 style={{ color: "#2563eb", margin: 0, fontWeight: "700" }}>{totalMales}</h2>
                        <span style={{ color: "#64748b", fontWeight: "600" }}>Males</span>
                    </div>
                </div>
                <div className="col-md-3 col-sm-6">
                    <div className="card text-center p-4 border-0 h-100" style={{ background: "#eff6ff", borderRadius: "16px", boxShadow: "0 4px 15px rgba(59,130,246,0.1)" }}>
                        <FaFemale style={{ fontSize: "2.5rem", color: "#60a5fa", margin: "0 auto 15px" }} />
                        <h2 style={{ color: "#2563eb", margin: 0, fontWeight: "700" }}>{totalFemales}</h2>
                        <span style={{ color: "#64748b", fontWeight: "600" }}>Females</span>
                    </div>
                </div>
                <div className="col-md-3 col-sm-6">
                    <div className="card text-center p-4 border-0 h-100" style={{ background: "#eff6ff", borderRadius: "16px", boxShadow: "0 4px 15px rgba(59,130,246,0.1)" }}>
                        <FaFileAlt style={{ fontSize: "2.5rem", color: "#60a5fa", margin: "0 auto 15px" }} />
                        <h2 style={{ color: "#2563eb", margin: 0, fontWeight: "700" }}>{totalResumes}</h2>
                        <span style={{ color: "#64748b", fontWeight: "600" }}>Resumes</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
