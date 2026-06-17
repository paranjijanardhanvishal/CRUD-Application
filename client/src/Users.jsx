import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaUsers, FaMale, FaFemale, FaFileAlt, FaSearch, FaFilter, FaPlus, FaEdit, FaTrash, FaEye } from "react-icons/fa";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

function Users() {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [filterOption, setFilterOption] = useState("All");

    const totalUsers = users.length;
    const totalMales = users.filter(user => user.gender?.toLowerCase() === "male").length;
    const totalFemales = users.filter(user => user.gender?.toLowerCase() === "female").length;
    const totalResumes = users.filter(user => user.resume).length;

    useEffect(() => {
        axios.get(API_URL)
            .then(result => setUsers(result.data))
            .catch(err => console.log(err));
    }, []);

    const handleDelete = (id) => {
        axios.delete(`${API_URL}/deleteUser/` + id)
            .then(result => {
                console.log(result);
                setUsers(users.filter(user => user._id !== id));
            })
            .catch(err => console.log(err));
    };

    return (
        <div
            className="d-flex justify-content-center align-items-center"
            style={{
                minHeight: "100vh",
                background:
                    "linear-gradient(135deg, #f8fbff 0%, #edf5ff 50%, #dbeafe 100%)"
            }}
        >
            <div
                className="p-4"
                style={{
                    width: "90%",
                    maxHeight: "85vh",
                    overflowY: "auto",
                    background: "#ffffff",
                    borderRadius: "18px",
                    border: "1px solid #dbeafe",
                    boxShadow: "0 4px 20px rgba(59,130,246,0.08)"
                }}
            >
                <div className="text-center mb-4">
                    <h1
                        style={{
                            fontSize: "2.5rem",
                            fontWeight: "700",
                            color: "#2563eb"
                        }}
                    >
                        Resume Management System
                    </h1>

                    <p
                        style={{
                            color: "#64748b",
                            fontSize: "1rem"
                        }}
                    >
                        Manage Users, Skills and Resumes
                    </p>
                </div>

                {/* Dashboard Stats */}
                <div className="d-flex justify-content-between mb-4 gap-3 flex-wrap">
                    <div className="card flex-fill text-center p-3" style={{ border: "none", background: "#eff6ff", borderRadius: "12px", boxShadow: "0 2px 10px rgba(59,130,246,0.1)" }}>
                        <FaUsers style={{ fontSize: "2rem", color: "#60a5fa", margin: "0 auto 10px" }} />
                        <h3 style={{ color: "#2563eb", margin: 0, fontWeight: "700" }}>{totalUsers}</h3>
                        <span style={{ color: "#64748b", fontSize: "0.9rem", fontWeight: "600" }}>Total Users</span>
                    </div>
                    <div className="card flex-fill text-center p-3" style={{ border: "none", background: "#eff6ff", borderRadius: "12px", boxShadow: "0 2px 10px rgba(59,130,246,0.1)" }}>
                        <FaMale style={{ fontSize: "2rem", color: "#60a5fa", margin: "0 auto 10px" }} />
                        <h3 style={{ color: "#2563eb", margin: 0, fontWeight: "700" }}>{totalMales}</h3>
                        <span style={{ color: "#64748b", fontSize: "0.9rem", fontWeight: "600" }}>Males</span>
                    </div>
                    <div className="card flex-fill text-center p-3" style={{ border: "none", background: "#eff6ff", borderRadius: "12px", boxShadow: "0 2px 10px rgba(59,130,246,0.1)" }}>
                        <FaFemale style={{ fontSize: "2rem", color: "#60a5fa", margin: "0 auto 10px" }} />
                        <h3 style={{ color: "#2563eb", margin: 0, fontWeight: "700" }}>{totalFemales}</h3>
                        <span style={{ color: "#64748b", fontSize: "0.9rem", fontWeight: "600" }}>Females</span>
                    </div>
                    <div className="card flex-fill text-center p-3" style={{ border: "none", background: "#eff6ff", borderRadius: "12px", boxShadow: "0 2px 10px rgba(59,130,246,0.1)" }}>
                        <FaFileAlt style={{ fontSize: "2rem", color: "#60a5fa", margin: "0 auto 10px" }} />
                        <h3 style={{ color: "#2563eb", margin: 0, fontWeight: "700" }}>{totalResumes}</h3>
                        <span style={{ color: "#64748b", fontSize: "0.9rem", fontWeight: "600" }}>Resumes Uploaded</span>
                    </div>
                </div>

                <div className="d-flex justify-content-between align-items-center mb-4">
                    <Link
                        to="/create"
                        className="btn text-white fw-semibold d-flex align-items-center gap-2"
                        style={{
                            background: "#2563eb",
                            border: "none",
                            borderRadius: "10px",
                            padding: "10px 20px"
                        }}
                    >
                        <FaPlus /> Add
                    </Link>

                    <div className="d-flex gap-3">
                        <div className="input-group" style={{ maxWidth: "300px" }}>
                            <span className="input-group-text bg-white border-end-0" style={{ border: "1px solid #cbd5e1", borderRadius: "10px 0 0 10px" }}>
                                <FaSearch color="#94a3b8" />
                            </span>
                            <input
                                type="text"
                                placeholder="Search by Name or Age"
                                className="form-control border-start-0"
                                style={{
                                    border: "1px solid #cbd5e1",
                                    background: "#ffffff",
                                    boxShadow: "none",
                                    borderRadius: "0 10px 10px 0"
                                }}
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>

                        <div className="input-group" style={{ maxWidth: "220px" }}>
                            <span className="input-group-text bg-white border-end-0" style={{ border: "1px solid #cbd5e1", borderRadius: "10px 0 0 10px" }}>
                                <FaFilter color="#94a3b8" />
                            </span>
                            <select
                                className="form-select border-start-0"
                                style={{
                                    border: "1px solid #cbd5e1",
                                    background: "#ffffff",
                                    cursor: "pointer",
                                    boxShadow: "none",
                                    borderRadius: "0 10px 10px 0"
                                }}
                                value={filterOption}
                                onChange={(e) => setFilterOption(e.target.value)}
                            >
                                <option value="All">All Users</option>
                                <option value="Male">Male Only</option>
                                <option value="Female">Female Only</option>
                                <option value="WithResume">Has Resume</option>
                                <option value="WithoutResume">No Resume</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div style={{ overflowX: "auto" }}>
                    <table className="table table-hover align-middle">
                        <thead
                            style={{
                                background: "#eff6ff",
                                color: "#1e40af"
                            }}
                        >
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Age</th>
                                <th>Gender</th>
                                <th>Education</th>
                                <th>Resume</th>
                                <th style={{ minWidth: "250px" }}>Skills</th>
                                <th style={{ minWidth: "180px" }}>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {users
                                .filter(user =>
                                    (user.name || "").toLowerCase().includes(search.toLowerCase()) ||
                                    String(user.age || "").toLowerCase().includes(search.toLowerCase())
                                )
                                .filter(user => {
                                    if (filterOption === "All") return true;
                                    if (filterOption === "Male") return user.gender?.toLowerCase() === "male";
                                    if (filterOption === "Female") return user.gender?.toLowerCase() === "female";
                                    if (filterOption === "WithResume") return !!user.resume;
                                    if (filterOption === "WithoutResume") return !user.resume;
                                    return true;
                                })
                                .map((user) => (
                                    <tr key={user._id}>
                                        <td className="fw-semibold">
                                            {user.name}
                                        </td>

                                        <td>{user.email}</td>

                                        <td>{user.age}</td>

                                        <td>{user.gender}</td>

                                        <td>{user.education}</td>

                                        <td>
                                            {user.resume ? (
                                                <a
                                                    href={`${API_URL}/uploads/${user.resume}`}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="btn btn-sm text-white d-inline-flex align-items-center gap-1"
                                                    style={{
                                                        background: "#6366f1",
                                                        border: "none",
                                                        borderRadius: "8px"
                                                    }}
                                                >
                                                    <FaEye /> View Resume
                                                </a>
                                            ) : (
                                                <span className="text-muted">
                                                    No Resume
                                                </span>
                                            )}
                                        </td>

                                        <td>
                                            {user.skills?.length > 0 ? (
                                                user.skills.map(
                                                    (skill, index) => (
                                                        <span
                                                            key={index}
                                                            className="badge me-1"
                                                            style={{
                                                                background:
                                                                    "#60a5fa",
                                                                fontSize:
                                                                    "0.85rem",
                                                                padding:
                                                                    "8px 10px"
                                                            }}
                                                        >
                                                            {skill}
                                                        </span>
                                                    )
                                                )
                                            ) : (
                                                "N/A"
                                            )}
                                        </td>

                                        <td>
                                            <Link
                                                to={`/update/${user._id}`}
                                                className="btn btn-sm text-white me-2 d-inline-flex align-items-center gap-1"
                                                style={{
                                                    background: "#10b981",
                                                    border: "none",
                                                    borderRadius: "8px"
                                                }}
                                            >
                                                <FaEdit /> Update
                                            </Link>

                                            <button
                                                className="btn btn-sm text-white d-inline-flex align-items-center gap-1"
                                                style={{
                                                    background: "#ef4444",
                                                    border: "none",
                                                    borderRadius: "8px"
                                                }}
                                                onClick={() => {
                                                    if (window.confirm("Are you sure you want to delete this user?")) {
                                                        handleDelete(user._id);
                                                    }
                                                }}
                                            >
                                                <FaTrash /> Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Users;