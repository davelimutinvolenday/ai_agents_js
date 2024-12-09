const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const OpenAI = require('openai'); // Use require for Node.js or `import` for ES modules.

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY
});

async function testOpenAI() {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {"role": "user", "content": "write a haiku about ai"}
      ]
    });
    console.log("Response:", response.choices[0].message.content);
  } catch (error) {
    console.error("Error with OpenAI API:", error.message);
  }
}

testOpenAI();
