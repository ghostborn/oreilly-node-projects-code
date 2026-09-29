// 推荐用环境变量保存密钥，不要硬编码
const ARK_API_KEY = "";
const ENDPOINT_ID = "doubao-seed-2-1-lite-260915"; // 推理接入点ID

async function chatNonStream() {
  const res = await fetch("https://ark.cn-beijing.volces.com/api/v3/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${ARK_API_KEY}`
    },
    body: JSON.stringify({
      model: ENDPOINT_ID,
      messages: [
        { role: "system", content: "你是豆包助手" },
        { role: "user", content: "今天有什么热点新闻" }
      ],
      temperature: 0.7
    })
  });
  const json = await res.json();
  console.log(json.choices[0].message.content);
}

chatNonStream();
