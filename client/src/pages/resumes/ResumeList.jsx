import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchUsers, removeResume } from "../../services/api";
import { FaPlus, FaFileAlt, FaEye, FaTrash } from "react-icons/fa";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

const ResumeList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const load = async () => {
            const data = await fetchUsers();
            if (data) setUsers(data.filter(u => u.resume));
        };
        load();
    }, []);

    const handleRemove = async (id) => {
        if (window.confirm("Are you sure you want to remove this resume?")) {
            try {
                await removeResume(id);
                setUsers(users.filter(u => u._id !== id));
            } catch (e) {
                console.log(e);
            }
        }
    };

    return (
        <div className="bg-white p-4 rounded shadow-sm" style={{ border: "1px solid #dbeafe" }}>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="fw-bold text-primary m-0"><FaFileAlt className="me-2"/> Uploaded Resumes</h4>
                <Link to="/resumes/add" className="btn text-white fw-semibold d-flex align-items-center gap-2" style={{ background: "#2563eb", borderRadius: "8px" }}>
                    <FaPlus /> Add Resume
                </Link>
            </div>

            <div className="table-responsive">
                <table className="table table-hover align-middle">
                    <thead style={{ background: "#eff6ff", color: "#1e40af" }}>
                        <tr>
                            <th>User Name</th>
                            <th>Email</th>
                            <th>File Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id}>
                                <td className="fw-semibold">{user.name}</td>
                                <td className="text-muted">{user.email}</td>
                                <td>{user.resume}</td>
                                <td>
                                    {!user.resume.startsWith('blob:') && !user._id.startsWith('temp_') ? (
                                        <a
                                            href={`${API_URL}/uploads/${user.resume}`}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="btn btn-sm text-white d-inline-flex align-items-center gap-1 me-2"
                                            style={{ background: "#6366f1", borderRadius: "6px" }}
                                        >
                                            <FaEye /> View
                                        </a>
                                    ) : (
                                        <span className="badge bg-secondary me-2">Offline Cached</span>
                                    )}
                                    <button 
                                        className="btn btn-sm btn-danger d-inline-flex align-items-center gap-1"
                                        style={{ borderRadius: "6px" }}
                                        onClick={() => handleRemove(user._id)}
                                    >
                                        <FaTrash /> Remove
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {users.length === 0 && (
                            <tr>
                                <td colSpan="4" className="text-center py-4 text-muted">No resumes found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ResumeList;
