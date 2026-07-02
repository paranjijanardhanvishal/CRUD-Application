import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { fetchUserById, updateUser, removeResume, updateRoleAPI, getAllSkills } from "../../services/api";
import { useAuth } from "../../context/AuthContext";

const EditUser = () => {
    const { id } = useParams();
    const { user: authUser } = useAuth();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [education, setEducation] = useState("");
    const [skills, setSkills] = useState([]);
    const [resume, setResume] = useState(null);
    const [existingResume, setExistingResume] = useState("");
    const [role, setRole] = useState("User");
    const [error, setError] = useState("");

    const [availableSkills, setAvailableSkills] = useState([]);
    const [newSkill, setNewSkill] = useState("");

    useEffect(() => {
        const loadSkills = async () => {
            const fetchedSkills = await getAllSkills();
            setAvailableSkills(fetchedSkills);
        };
        loadSkills();
    }, []);

    useEffect(() => {
        const loadUser = async () => {
            const userData = await fetchUserById(id);
            if (userData) {
                setName(userData.name || "");
                setEmail(userData.email || "");
                setAge(userData.age || "");
                setGender(userData.gender || "");
                setEducation(userData.education || "");
                setSkills(userData.skills || []);
                setExistingResume(userData.resume || "");
                setRole(userData.role || "User");
            }
        };
        loadUser();
    }, [id]);

    const handleSkillChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setSkills([...skills, value]);
        } else {
            setSkills(skills.filter(skill => skill !== value));
        }
    };

    const handleAddNewSkill = () => {
        const trimmedSkill = newSkill.trim();
        if (trimmedSkill) {
            const lowerSkill = trimmedSkill.toLowerCase();
            if (!availableSkills.some(s => s.toLowerCase() === lowerSkill)) {
                setAvailableSkills([...availableSkills, trimmedSkill]);
            }
            if (!skills.some(s => s.toLowerCase() === lowerSkill)) {
                setSkills([...skills, trimmedSkill]);
            }
            setNewSkill("");
        }
    };

    const handleRemoveResume = async () => {
        try {
            await removeResume(id);
            alert("Resume Removed");
            setExistingResume("");
        } catch (error) {
            console.log("Failed to remove resume");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("age", age);
        formData.append("gender", gender);
        formData.append("education", education);
        formData.append("skills", JSON.stringify(skills));

        if (resume) {
            formData.append("resume", resume);
        }

        try {
            await updateUser(id, formData);
            if (authUser?.role === 'Admin') {
                await updateRoleAPI(id, role);
            }
            if (authUser?.role === 'User') {
                navigate('/');
            } else {
                navigate("/users");
            }
        } catch (e) {
            setError(e.response?.data?.message || "Error updating profile");
        }
    };

    return (
        <div className="bg-white p-4 rounded shadow-sm mx-auto" style={{ border: "1px solid #dbeafe", maxWidth: "600px" }}>
            <Link to="/users" className="btn btn-outline-secondary mb-4 btn-sm">
                ← Back to List
            </Link>

            <h3 className="fw-bold text-primary mb-1">Update User</h3>
            <p className="text-muted mb-4">Modify existing user details</p>

            <form onSubmit={handleSubmit}>
                {error && <div className="alert alert-danger p-2">{error}</div>}
                
                <div className="row g-3 mb-4">
                    <div className="col-md-6">
                        <label className="fw-semibold mb-2">Full Name</label>
                        <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>
                    <div className="col-md-6">
                        <label className="fw-semibold mb-2">Email Address</label>
                        <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    
                    {authUser?.role === 'Admin' && (
                        <div className="col-md-12">
                            <label className="fw-semibold mb-2 text-danger">User Role (Admin Only)</label>
                            <select className="form-select border-danger" value={role} onChange={(e) => setRole(e.target.value)}>
                                <option value="Admin">Admin</option>
                                <option value="User">User</option>
                            </select>
                        </div>
                    )}
                </div>

                <div className="mb-3">
                    <label className="fw-semibold mb-1">Age</label>
                    <input type="number" className="form-control" value={age} required onChange={(e) => setAge(e.target.value)} />
                </div>

                <div className="mb-3">
                    <label className="fw-semibold d-block mb-2">Gender</label>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="gender" value="Male" checked={gender === "Male"} required onChange={(e) => setGender(e.target.value)} />
                        <label className="form-check-label">Male</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="gender" value="Female" checked={gender === "Female"} onChange={(e) => setGender(e.target.value)} />
                        <label className="form-check-label">Female</label>
                    </div>
                </div>

                <div className="mb-3">
                    <label className="fw-semibold mb-1">Education</label>
                    <select className="form-select" required value={education} onChange={(e) => setEducation(e.target.value)}>
                        <option value="">Select Education</option>
                        <option value="Diploma">Diploma</option>
                        <option value="BA">BA</option>
                        <option value="B.Sc">B.Sc</option>
                        <option value="BCA">BCA</option>
                        <option value="B.Tech">B.Tech</option>
                        <option value="MBA">MBA</option>
                        <option value="MCA">MCA</option>
                        <option value="M.Tech">M.Tech</option>
                        <option value="Others">Others</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label className="fw-semibold d-block mb-2">Skills</label>
                    <div className="d-flex flex-wrap gap-2 mb-2">
                        {availableSkills.map(skill => (
                            <div className="form-check form-check-inline m-0" key={skill}>
                                <input className="form-check-input" type="checkbox" value={skill} checked={skills.includes(skill)} onChange={handleSkillChange} />
                                <label className="form-check-label">{skill}</label>
                            </div>
                        ))}
                    </div>
                    <div className="input-group mt-2" style={{ maxWidth: "300px" }}>
                        <input 
                            type="text" 
                            className="form-control form-control-sm" 
                            placeholder="Add custom skill..." 
                            value={newSkill} 
                            onChange={(e) => setNewSkill(e.target.value)}
                            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddNewSkill(); } }}
                        />
                        <button type="button" className="btn btn-sm btn-outline-secondary" onClick={handleAddNewSkill}>Add</button>
                    </div>
                </div>

                <div className="mb-4 p-3 rounded bg-white shadow-sm" style={{ border: "1px dashed #cbd5e1" }} id="resume">
                    <label className="fw-semibold mb-2 d-block">Resume (PDF)</label>
                    
                    {existingResume ? (
                        <div className="d-flex align-items-center justify-content-between bg-light p-2 rounded border">
                            <span className="text-muted small text-truncate me-2">Current: {existingResume}</span>
                            {authUser?.role === 'Admin' && (
                                <button type="button" className="btn btn-sm btn-outline-danger py-1 px-2" onClick={handleRemoveResume}>
                                    Remove File
                                </button>
                            )}
                        </div>
                    ) : (
                        <input type="file" className="form-control" accept=".pdf" onChange={(e) => setResume(e.target.files[0])} />
                    )}
                </div>

                <div className="d-flex gap-2">
                    <button type="submit" className="btn btn-primary fw-bold py-2 flex-grow-1">Update User</button>
                </div>
            </form>
        </div>
    );
};

export default EditUser;
