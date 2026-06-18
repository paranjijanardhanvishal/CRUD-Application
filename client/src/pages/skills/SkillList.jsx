import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchUsers } from "../../services/api";
import { FaPlus, FaTools } from "react-icons/fa";

const SkillList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const load = async () => {
            const data = await fetchUsers();
            if (data) setUsers(data);
        };
        load();
    }, []);

    return (
        <div className="bg-white p-4 rounded shadow-sm" style={{ border: "1px solid #dbeafe" }}>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="fw-bold text-primary m-0"><FaTools className="me-2"/> User Skills</h4>
                <Link to="/skills/add" className="btn text-white fw-semibold d-flex align-items-center gap-2" style={{ background: "#2563eb", borderRadius: "8px" }}>
                    <FaPlus /> Add Skill to User
                </Link>
            </div>

            <div className="table-responsive">
                <table className="table table-hover align-middle">
                    <thead style={{ background: "#eff6ff", color: "#1e40af" }}>
                        <tr>
                            <th>User Name</th>
                            <th>Email</th>
                            <th>Skills</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id}>
                                <td className="fw-semibold">{user.name}</td>
                                <td className="text-muted">{user.email}</td>
                                <td>
                                    {user.skills?.length > 0 ? (
                                        user.skills.map((skill, index) => (
                                            <span key={index} className="badge bg-primary me-1 mb-1">{skill}</span>
                                        ))
                                    ) : (
                                        <span className="text-muted small">No skills</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                        {users.length === 0 && (
                            <tr>
                                <td colSpan="3" className="text-center py-4 text-muted">No users found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SkillList;
