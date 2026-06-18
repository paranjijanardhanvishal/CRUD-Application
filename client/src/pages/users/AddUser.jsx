import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createUser } from "../../services/api";

const AddUser = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [education, setEducation] = useState("");
    const [skills, setSkills] = useState([]);
    const [file, setFile] = useState(null);

    const navigate = useNavigate();

    const handleSkillChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setSkills([...skills, value]);
        } else {
            setSkills(skills.filter((skill) => skill !== value));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (skills.length === 0) {
            alert("Please select at least one skill.");
            return;
        }

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

        await createUser(formData);
        navigate("/users");
    };

    return (
        <div className="bg-white p-4 rounded shadow-sm mx-auto" style={{ border: "1px solid #dbeafe", maxWidth: "600px" }}>
            <Link to="/users" className="btn btn-outline-secondary mb-4 btn-sm">
                ← Back to List
            </Link>

            <h3 className="fw-bold text-primary mb-1">Add New User</h3>
            <p className="text-muted mb-4">Create a new user profile</p>

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="fw-semibold mb-1">Name</label>
                    <input type="text" className="form-control" placeholder="Enter Name" required onChange={(e) => setName(e.target.value)} />
                </div>

                <div className="mb-3">
                    <label className="fw-semibold mb-1">Email</label>
                    <input type="email" className="form-control" placeholder="Enter Email" required onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div className="mb-3">
                    <label className="fw-semibold mb-1">Age</label>
                    <input type="number" className="form-control" placeholder="Enter Age" required onChange={(e) => setAge(e.target.value)} />
                </div>

                <div className="mb-3">
                    <label className="fw-semibold d-block mb-2">Gender</label>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="gender" value="Male" required onChange={(e) => setGender(e.target.value)} />
                        <label className="form-check-label">Male</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="gender" value="Female" onChange={(e) => setGender(e.target.value)} />
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
                            <input className="form-check-input" type="checkbox" value={skill} onChange={handleSkillChange} />
                            <label className="form-check-label">{skill}</label>
                        </div>
                    ))}
                </div>

                <div className="mb-4">
                    <label className="fw-semibold mb-1">Resume (PDF)</label>
                    <input type="file" className="form-control" accept=".pdf" onChange={(e) => setFile(e.target.files[0])} />
                </div>

                <button type="submit" className="btn btn-primary w-100 fw-bold py-2">Submit User</button>
            </form>
        </div>
    );
};

export default AddUser;
