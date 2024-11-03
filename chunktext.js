require('dotenv').config();
// const { GoogleGenerativeAI } = require('@g0oogle/generative-ai') // import the package for using the API

// const genAI = new GoogleGenerativeAI(process.env.API_KEY) //initialize the generative model and pass the API_KEY from .env


// async function generative() {
//     const model = genAI.getGenerativeModel({model: 'gemini-1.5-flash'})
    
//     const prompt = 'How can you prevent cholera disease, give me three main tips';

//     const result = await model.generateContent(prompt)
//     const response = await result.response
//     console.log(response.text())
// } 
// generative();

const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

async function run() {
  // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

  const prompt = "How can you prevent cholera disease, give in details"

  // Use streaming with text-only input
const result = await model.generateContentStream(prompt);

  let text = '';
    for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        console.log(chunkText);
        text += chunkText;
    }
    console.log(text)
}
run();