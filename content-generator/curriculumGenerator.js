// content-generator/curriculumGenerator.js
const { HfInference } =  require('@huggingface/inference');
const  dotenv = require("dotenv");
// const axios = require('axios');

dotenv.config();

const client = new HfInference(process.env.HUGGING_FACE_API_TOKEN)
const generateCurriculum = async () => {
    const prompt = `Generate a list of educational curricula, such as IGSC, WAEC, etc.`;
    let out = "";
    try {
        const response = client.chatCompletionStream(
            {
                model: "meta-llama/Llama-3.2-3B-Instruct",
                messages: [{role: 'user', content: prompt}], 
                max_tokens: 500
            }
        );

        for await (const chunk of stream) {
            if (chunk.choices && chunk.choices.length > 0) {
                const newContent = chunk.choices[0].delta.content;
                output += newContent;
                console.log(newContent);
            }
        }

        return {
            type: 'curriculum',
            content: response.data.generated_text || "Failed to generate curricula."
        };
    } catch (error) {
        console.error('Error generating curriculum:', error.message);
        return { type: 'curriculum', content: null };
    }
};

module.exports = generateCurriculum;
