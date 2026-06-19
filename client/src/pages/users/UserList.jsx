import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaFilter, FaPlus, FaEdit, FaTrash, FaEye } from "react-icons/fa";
import { fetchUsers, deleteUser } from "../../services/api";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [filterOption, setFilterOption] = useState("All");

    useEffect(() => {
        const loadUsers = async () => {
            const data = await fetchUsers();
            if (data) setUsers(data);
        };
        loadUsers();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            await deleteUser(id);
            setUsers(users.filter(user => user._id !== id));
        }
    };

    return (
        <div className="bg-white p-4 rounded shadow-sm" style={{ border: "1px solid #dbeafe" }}>
            <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
                <Link
                    to="/users/add"
                    className="btn text-white fw-semibold d-flex align-items-center gap-2"
                    style={{ background: "#2563eb", borderRadius: "8px" }}
                >
                    <FaPlus /> Add User
                </Link>

                <div className="d-flex gap-3 flex-wrap">
                    <div className="input-group" style={{ maxWidth: "300px" }}>
                        <span className="input-group-text bg-white" style={{ borderRight: "none", borderRadius: "8px 0 0 8px" }}>
                            <FaSearch color="#94a3b8" />
                        </span>
                        <input
                            type="text"
                            placeholder="Search Name or Age"
                            className="form-control"
                            style={{ borderLeft: "none", boxShadow: "none", borderRadius: "0 8px 8px 0" }}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    <div className="input-group" style={{ maxWidth: "220px" }}>
                        <span className="input-group-text bg-white" style={{ borderRight: "none", borderRadius: "8px 0 0 8px" }}>
                            <FaFilter color="#94a3b8" />
                        </span>
                        <select
                            className="form-select"
                            style={{ borderLeft: "none", cursor: "pointer", boxShadow: "none", borderRadius: "0 8px 8px 0" }}
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

            <div className="table-responsive">
                <table className="table table-hover align-middle">
                    <thead style={{ background: "#eff6ff", color: "#1e40af" }}>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Age</th>
                            <th>Gender</th>
                            <th>Role</th>
                            <th>Education</th>
                            <th>Resume</th>
                            <th style={{ minWidth: "200px" }}>Skills</th>
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
                                    <td className="fw-semibold">{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.age}</td>
                                    <td>
                                        <span className={`badge ${user.gender?.toLowerCase() === 'female' ? 'bg-danger' : 'bg-success'}`}>
                                            {user.gender}
                                        </span>
                                    </td>
                                    <td>
                                        <span className={`badge ${user.role === 'Admin' ? 'bg-dark' : 'bg-secondary'}`}>
                                            {user.role || 'User'}
                                        </span>
                                    </td>
                                    <td>{user.education}</td>
                                    <td>
                                        {user.resume && !user.resume.startsWith('blob:') && user._id && !user._id.startsWith('temp_') ? (
                                            <a
                                                href={`${API_URL}/api/resumes/${user.resume}?token=${localStorage.getItem('token')}`}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="btn btn-sm text-white d-inline-flex align-items-center gap-1"
                                                style={{ background: "#6366f1", borderRadius: "6px" }}
                                            >
                                                <FaEye /> View
                                            </a>
                                        ) : user.resume ? (
                                            <span className="text-muted small">Offline Cached</span>
                                        ) : (
                                            <span className="text-muted small">None</span>
                                        )}
                                    </td>
                                    <td>
                                        {user.skills?.length > 0 ? (
                                            user.skills.map((skill, index) => (
                                                <span key={index} className="badge bg-primary me-1 mb-1">{skill}</span>
                                            ))
                                        ) : "N/A"}
                                    </td>
                                    <td>
                                        <Link
                                            to={`/users/edit/${user._id}`}
                                            className="btn btn-sm text-white me-2 d-inline-flex align-items-center gap-1"
                                            style={{ background: "#10b981", borderRadius: "6px" }}
                                        >
                                            <FaEdit />
                                        </Link>
                                        <button
                                            className="btn btn-sm text-white d-inline-flex align-items-center gap-1"
                                            style={{ background: "#ef4444", borderRadius: "6px" }}
                                            onClick={() => handleDelete(user._id)}
                                        >
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        {users.length === 0 && (
                            <tr>
                                <td colSpan="8" className="text-center py-4 text-muted">No users found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserList;
