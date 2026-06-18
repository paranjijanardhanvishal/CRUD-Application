import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { fetchUserById, updateUser, removeResume } from "../../services/api";

const EditUser = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [education, setEducation] = useState("");
    const [skills, setSkills] = useState([]);
    const [file, setFile] = useState(null);

    useEffect(() => {
        const loadUser = async () => {
            const user = await fetchUserById(id);
            if (user) {
                setName(user.name || "");
                setEmail(user.email || "");
                setAge(user.age || "");
                setGender(user.gender || "");
                setEducation(user.education || "");
                setSkills(user.skills || []);
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

    const handleRemoveResume = async () => {
        try {
            await removeResume(id);
            alert("Resume Removed");
            navigate("/users");
        } catch (error) {
            console.log("Failed to remove resume");
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("age", age);
        formData.append("gender", gender);
        formData.append("education", education);
        formData.append("skills", JSON.stringify(skills));

        if (file) {
            formData.append("resume", file);
        }

        await updateUser(id, formData);
        navigate("/users");
    };

    return (
        <div className="bg-white p-4 rounded shadow-sm mx-auto" style={{ border: "1px solid #dbeafe", maxWidth: "600px" }}>
            <Link to="/users" className="btn btn-outline-secondary mb-4 btn-sm">
                ← Back to List
            </Link>

            <h3 className="fw-bold text-primary mb-1">Update User</h3>
            <p className="text-muted mb-4">Modify existing user details</p>

            <form onSubmit={handleUpdate}>
                <div className="mb-3">
                    <label className="fw-semibold mb-1">Name</label>
                    <input type="text" className="form-control" value={name} required onChange={(e) => setName(e.target.value)} />
                </div>

                <div className="mb-3">
                    <label className="fw-semibold mb-1">Email</label>
                    <input type="email" className="form-control" value={email} required onChange={(e) => setEmail(e.target.value)} />
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
                    {['Java', 'Python', 'React', 'MongoDB'].map(skill => (
                        <div className="form-check form-check-inline" key={skill}>
                            <input className="form-check-input" type="checkbox" value={skill} checked={skills.includes(skill)} onChange={handleSkillChange} />
                            <label className="form-check-label">{skill}</label>
                        </div>
                    ))}
                </div>

                <div className="mb-4">
                    <label className="fw-semibold mb-1">Resume (PDF)</label>
                    <input type="file" className="form-control" accept=".pdf" onChange={(e) => setFile(e.target.files[0])} />
                </div>

                <div className="d-flex gap-2">
                    <button type="submit" className="btn btn-primary fw-bold py-2 flex-grow-1">Update User</button>
                    <button type="button" className="btn btn-danger fw-bold py-2 px-4" onClick={handleRemoveResume}>Remove Resume</button>
                </div>
            </form>
        </div>
    );
};

export default EditUser;
