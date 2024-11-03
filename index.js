require('dotenv').config();
const { GoogleGenerativeAI, GenerativeModel } = require('@google/generative-ai')

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

async function generate() {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })
    const prompt = 'describe the personality of napolean hill'

    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()
    console.log(text)
}

generate();