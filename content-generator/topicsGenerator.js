// content-generator/topicGenerator.js
require('dotenv').config();
const axios = require('axios');

const generateTopics = async (subject) => {
    const prompt = `Generate a list of topics for the subject ${subject}.`;
    try {
        const response = await axios.post(
            'https://api-inference.huggingface.co/models/gpt2',
            { inputs: prompt },
            {
                headers: { Authorization: `Bearer ${process.env.HUGGING_FACE_API_TOKEN}` },
            }
        );

        return {
            type: 'topics',
            subject,
            content: response.data.generated_text || "Failed to generate topics."
        };
    } catch (error) {
        console.error('Error generating topics:', error.message);
        return { type: 'topics', subject, content: null };
    }
};

// module.exports = generateTopics;
// // content-generator/topicGenerator.js
// require('dotenv').config();
// const axios = require('axios');

// const generateTopics = async (subject) => {
//     const prompt = `Generate a list of topics for the subject ${subject}.`;
//     try {
//         const response = await axios.post(
//             'https://api-inference.huggingface.co/models/gpt2',
//             { inputs: prompt },
//             {
//                 headers: { Authorization: `Bearer ${process.env.HUGGING_FACE_API_TOKEN}` },
//             }
//         );

//         return {
//             type: 'topics',
//             subject,
//             content: response.data.generated_text || "Failed to generate topics."
//         };
//     } catch (error) {
//         console.error('Error generating topics:', error.message);
//         return { type: 'topics', subject, content: null };
//     }
// };

module.exports = generateTopics;
