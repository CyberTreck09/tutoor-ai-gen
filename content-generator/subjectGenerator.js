// content-generator/subjectGenerator.js
require("dotenv").config();
const axios = require("axios");

const generateSubjects = async (curriculum) => {
  const prompt = {
    inputs: `Generate a list of subjects for the ${curriculum} curriculum.`,
  };
  try {
    // const response = await axios.post(
    //   //   "https://api-inference.huggingface.co/models/gpt2",
    //   "https://api-inference.huggingface.co/models/openai-community/gpt2",
    //   { inputs: prompt },
    //   {
    //     headers: {
    //       Authorization: `Bearer ${process.env.HUGGING_FACE_API_TOKEN}`,
    //     },
    //   }
    // );
    const response = await fetch(
      "https://api-inference.huggingface.co/models/openai-community/gpt2",
      {
        headers: {
          Authorization: `Bearer ${process.env.HUGGING_FACE_API_TOKEN}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(prompt),
      }
    );
    // console.log(await response.json());
    const result = await response.json();

    return {
      type: "subjects",
      curriculum,
      content: result || "Failed to generate subjects.",
    };
  } catch (error) {
    console.log("----", error.status);
    console.error("Error generating subjects:", error.message);
    return { type: "subjects", curriculum, content: null };
  }
};

module.exports = generateSubjects;
