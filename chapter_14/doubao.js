// 推荐用环境变量保存密钥，不要硬编码
const ARK_API_KEY = "";
const ENDPOINT_ID = "doubao-seed-2-1-lite-260915"; // 推理接入点ID

async function chatStream() {
  const res = await fetch("https://ark.cn-beijing.volces.com/api/v3/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${ARK_API_KEY}`
    },
    body: JSON.stringify({
      model: ENDPOINT_ID,
      messages: [{ role: "user", content: "写一首小诗" }],
      stream: true // 开启流式
    })
  });

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop();
    for (const line of lines) {
      const data = line.replace(/^data: /, "").trim();
      if (!data || data === "[DONE]") continue;
      try {
        const obj = JSON.parse(data);
        const delta = obj.choices?.[0]?.delta?.content;
        if (delta) process.stdout.write(delta);
      } catch (e) {}
    }
  }
}
chatStream();
