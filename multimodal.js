require('dotenv').config();
const fs = require("fs");
const { GoogleGenerativeAI } = require('@google/generative-ai') // import the package for using the API

// Converts local file information to a GoogleGenerativeAI.Part object.
function fileToGenerativePart(path, mimeType) {
    return {
      inlineData: {
        data: Buffer.from(fs.readFileSync(path)).toString("base64"),
        mimeType
      },
    };
}

// Initialize the imported google-generative-ai
const genAI = new GoogleGenerativeAI(process.env.API_KEY)

async function compare() {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })
  const prompt = 'What are the these and provide their usage';

  const imageParts = [
    fileToGenerativePart('Glasses.jpg', 'image/jpg'),
    fileToGenerativePart('Black shirt.jpg', 'image/jpg')
  ]

  const result = await model.generateContent([prompt, ...imageParts]);
  const response = await result.response
  const text = response.text()
  console.log(text)
}
compare()