// content-generator/lessonGenerator.js
require('dotenv').config();
const axios = require('axios');

const generateLessons = async (topic) => {
    const prompt = `Generate lessons and examples for the topic ${topic}. Include at least two lessons with descriptions and examples.`;
    try {
        const response = await axios.post(
            'https://api-inference.huggingface.co/models/gpt2',
            { inputs: prompt },
            {
                headers: { Authorization: `Bearer ${process.env.HUGGING_FACE_API_TOKEN}` },
            }
        );

        return {
            type: 'lessons',
            topic,
            content: response.data.generated_text || "Failed to generate lessons."
        };
    } catch (error) {
        console.error('Error generating lessons:', error.message);
        return { type: 'lessons', topic, content: null };
    }
};

module.exports = generateLessons;
