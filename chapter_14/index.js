import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  baseURL: "https://api.deepseek.com",
  apiKey: process.env.DEEPSEEK_API_KEY,
});

async function main() {
  try {
    const completion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: "你好" },
      ],
      model: "deepseek-chat",   // 或 "deepseek-reasoner"
      stream: false,
    });

    console.log(completion.choices[0].message.content);
  } catch (err) {
    console.error("status:", err.status);
    console.error("message:", err.message);
    console.error("error:", err.error);
  }
}

main();
