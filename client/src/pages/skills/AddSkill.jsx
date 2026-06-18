import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { fetchUsers, fetchUserById, updateUser } from "../../services/api";

const AddSkill = () => {
    const [users, setUsers] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState("");
    const [skills, setSkills] = useState([]);
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const loadUsers = async () => {
            const data = await fetchUsers();
            if (data) setUsers(data);
        };
        loadUsers();
    }, []);

    useEffect(() => {
        if (selectedUserId) {
            const loadUser = async () => {
                const user = await fetchUserById(selectedUserId);
                if (user) {
                    setUserData(user);
                    setSkills(user.skills || []);
                }
            };
            loadUser();
        } else {
            setUserData(null);
            setSkills([]);
        }
    }, [selectedUserId]);

    const handleSkillChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setSkills([...skills, value]);
        } else {
            setSkills(skills.filter(skill => skill !== value));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedUserId) {
            alert("Please select a user");
            return;
        }

        const formData = new FormData();
        formData.append("name", userData.name);
        formData.append("email", userData.email);
        formData.append("age", userData.age);
        formData.append("gender", userData.gender);
        formData.append("education", userData.education);
        formData.append("skills", JSON.stringify(skills));
        
        // We do not append the resume file here to avoid overwriting with null, 
        // though the backend might not touch it if it's not provided.
        // The API backend for updateUser typically only overwrites if file is present.

        await updateUser(selectedUserId, formData);
        navigate("/skills");
    };

    return (
        <div className="bg-white p-4 rounded shadow-sm mx-auto" style={{ border: "1px solid #dbeafe", maxWidth: "600px" }}>
            <Link to="/skills" className="btn btn-outline-secondary mb-4 btn-sm">
                ← Back to List
            </Link>

            <h3 className="fw-bold text-primary mb-1">Add Skills to User</h3>
            <p className="text-muted mb-4">Select a user to update their skill set</p>

            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="fw-semibold mb-2">Select User</label>
                    <select 
                        className="form-select" 
                        value={selectedUserId} 
                        onChange={(e) => setSelectedUserId(e.target.value)}
                        required
                    >
                        <option value="">-- Choose a User --</option>
                        {users.map(u => (
                            <option key={u._id} value={u._id}>{u.name} ({u.email})</option>
                        ))}
                    </select>
                </div>

                {userData && (
                    <div className="mb-4 p-3 bg-light rounded border">
                        <label className="fw-semibold d-block mb-2">Manage Skills for {userData.name}</label>
                        {['Java', 'Python', 'React', 'MongoDB'].map(skill => (
                            <div className="form-check form-check-inline" key={skill}>
                                <input 
                                    className="form-check-input" 
                                    type="checkbox" 
                                    value={skill} 
                                    checked={skills.includes(skill)} 
                                    onChange={handleSkillChange} 
                                />
                                <label className="form-check-label">{skill}</label>
                            </div>
                        ))}
                    </div>
                )}

                <button type="submit" className="btn btn-primary w-100 fw-bold py-2" disabled={!selectedUserId}>
                    Save Skills
                </button>
            </form>
        </div>
    );
};

export default AddSkill;
