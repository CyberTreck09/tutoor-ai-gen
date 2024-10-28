// server/server.js
require('dotenv').config();
const express = require('express');
const generateCurriculum = require('../content-generator/curriculumGenerator');
const generateSubjects = require('../content-generator/subjectGenerator');
const generateTopics = require('../content-generator/topicsGenerator');
const generateLessons = require('../content-generator/lessonGenerator');

const app = express();
const port = 3000;

app.use(express.json());

app.post('/generate-curriculum', async (req, res) => {
    const curriculumData = await generateCurriculum();
    res.json(curriculumData);
});

app.post('/generate-subjects', async (req, res) => {
    const { curriculum } = req.body;
    if (!curriculum) {
        return res.status(400).json({ error: 'Curriculum is required' });
    }
    const subjectsData = await generateSubjects(curriculum);
    res.json(subjectsData);
});

app.post('/generate-topics', async (req, res) => {
    const { subject } = req.body;
    if (!subject) {
        return res.status(400).json({ error: 'Subject is required' });
    }
    const topicsData = await generateTopics(subject);
    res.json(topicsData);
});

app.post('/generate-lessons', async (req, res) => {
    const { topic } = req.body;
    if (!topic) {
        return res.status(400).json({ error: 'Topic is required' });
    }
    const lessonsData = await generateLessons(topic);
    res.json(lessonsData);
});

app.get('/', async (req, res) => {
    return res.status(200).json('hello world')
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
