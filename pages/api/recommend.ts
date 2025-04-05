import OpenAI from 'openai';

const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});

export default async function handler(req, res) {
  const { query } = req.body;
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: '你是蝦皮購物小助手，語氣自然、有說服力，請根據使用者需求推薦商品' },
        { role: 'user', content: `請推薦蝦皮商品，需求：${query}` }
      ]
    });
    const reply = completion.data.choices[0].message.content;
    res.status(200).json({ result: reply });
  } catch (error) {
    res.status(500).json({ result: 'GPT 回覆失敗，請稍後再試' });
  }
}
