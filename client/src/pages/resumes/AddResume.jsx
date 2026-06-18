import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { fetchUsers, fetchUserById, updateUser } from "../../services/api";

const AddResume = () => {
    const [users, setUsers] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState("");
    const [file, setFile] = useState(null);
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const loadUsers = async () => {
            const data = await fetchUsers();
            if (data) {
                // Show users that don't have a resume yet, or all users if they want to overwrite
                setUsers(data);
            }
        };
        loadUsers();
    }, []);

    useEffect(() => {
        if (selectedUserId) {
            const loadUser = async () => {
                const user = await fetchUserById(selectedUserId);
                if (user) {
                    setUserData(user);
                }
            };
            loadUser();
        } else {
            setUserData(null);
        }
    }, [selectedUserId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedUserId) {
            alert("Please select a user");
            return;
        }
        if (!file) {
            alert("Please select a PDF file");
            return;
        }

        const formData = new FormData();
        formData.append("name", userData.name);
        formData.append("email", userData.email);
        formData.append("age", userData.age);
        formData.append("gender", userData.gender);
        formData.append("education", userData.education);
        formData.append("skills", JSON.stringify(userData.skills || []));
        formData.append("resume", file);

        await updateUser(selectedUserId, formData);
        navigate("/resumes");
    };

    return (
        <div className="bg-white p-4 rounded shadow-sm mx-auto" style={{ border: "1px solid #dbeafe", maxWidth: "600px" }}>
            <Link to="/resumes" className="btn btn-outline-secondary mb-4 btn-sm">
                ← Back to List
            </Link>

            <h3 className="fw-bold text-primary mb-1">Add Resume</h3>
            <p className="text-muted mb-4">Select a user to upload or overwrite their resume</p>

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
                            <option key={u._id} value={u._id}>
                                {u.name} ({u.email}) {u.resume ? ' - [Has Resume]' : ''}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-4">
                    <label className="fw-semibold mb-2">Resume (PDF)</label>
                    <input 
                        type="file" 
                        className="form-control" 
                        accept=".pdf" 
                        required 
                        onChange={(e) => setFile(e.target.files[0])} 
                    />
                </div>

                <button type="submit" className="btn btn-primary w-100 fw-bold py-2" disabled={!selectedUserId}>
                    Upload Resume
                </button>
            </form>
        </div>
    );
};

export default AddResume;
