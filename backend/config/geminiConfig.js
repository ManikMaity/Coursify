const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();


const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
console.log(process.env.GEMINI_API_KEY)
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  generationConfig: {
    responseMimeType: "application/json",
  },
});

function makePrompt(title, description) {
const prompt = `Generate a structured course description in JSON format based on the given title and description title : "${title}", description : "${description}". Follow this exact JSON schema: {
  "CourseOverview": "A brief description of what the course covers, combining information from both title and description.",
  "LearningObjectives": [
    "Summarize key concepts, skills, or tools learners will acquire",
    "List any specific frameworks, methodologies, or industry applications mentioned",
    "Mention outcomes or knowledge gained, using clear language"
  ],
  "Requirements": "List any prerequisites or recommended knowledge based on the course level and topics covered.",
  "Language": "English"
}. Please Try to fill all the fields as much as possible from the title and description yourself by guessing and being creaative. But in extrime case If any of the fields cannot be derived from the title and description, leave it empty (e.g., "CourseOverview": "")`;

  return prompt;
}

async function generateContent(title, description) {
    const prompt = makePrompt(title, description);
    const result = await model.generateContent(prompt);
    console.log(result.response.text());
    const text = await result.response.text();
    const responseObj = JSON.parse(text);
    return responseObj;
}


module.exports = { generateContent };

