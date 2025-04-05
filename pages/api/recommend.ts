
export default async function handler(req, res) {
  const { query } = req.body;
  const reply = `根據「${query}」的需求，這是 AI 為你推薦的商品...`;
  res.status(200).json({ result: reply });
}
