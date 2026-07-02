const mongoose = require('mongoose');
const UserModel = require('./models/Users');
require('dotenv').config();

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/CRUD');
        console.log('MongoDB Connected for seeding');

        const mockUsers = [];
        const skillsPool = [
            'React', 'Node.js', 'Python', 'Java', 'MongoDB', 'Docker', 'AWS', 'C++', 'Go', 'Kubernetes', 'Machine Learning',
            'Svelte', 'Vue.js', 'PostgreSQL', 'GraphQL' // Adding some new skills as requested
        ];
        const educationPool = ['Diploma', 'BA', 'B.Sc', 'BCA', 'B.Tech', 'MBA', 'MCA', 'M.Tech', 'Others'];

        for (let i = 0; i < 5000; i++) {
            const randomSkillsCount = Math.floor(Math.random() * 4) + 1;
            const skills = [];
            for (let j = 0; j < randomSkillsCount; j++) {
                const skill = skillsPool[Math.floor(Math.random() * skillsPool.length)];
                if (!skills.includes(skill)) skills.push(skill);
            }

            mockUsers.push({
                name: `Mock User ${i}`,
                email: `mockuser${i}@example.com`,
                age: Math.floor(Math.random() * 40) + 20,
                gender: Math.random() > 0.5 ? 'Male' : 'Female',
                education: educationPool[Math.floor(Math.random() * educationPool.length)],
                skills: skills,
                role: 'User'
            });
        }

        // Insert in batches of 1000 to avoid out of memory
        for (let i = 0; i < 5000; i += 1000) {
            await UserModel.insertMany(mockUsers.slice(i, i + 1000));
            console.log(`Inserted ${i + 1000} users`);
        }

        console.log('Successfully seeded 5000 mock users');
        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

seedDB();
