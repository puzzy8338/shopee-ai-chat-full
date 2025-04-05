import { Configuration, OpenAIApi } from 'openai';

const config = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
const openai = new OpenAIApi(config);

export default async function handler(req, res) {
  const { query } = req.body;
  const completion = await openai.createChatCompletion({
    model: 'gpt-4',
    messages: [{ role: 'user', content: `請用繁體中文、自然推薦語氣，推薦蝦皮商品。需求：${query}` }]
  });
  const reply = completion.data.choices[0].message.content;
  res.status(200).json({ result: reply });
}
