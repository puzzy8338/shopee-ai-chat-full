
import { useState } from 'react';

export default function Home() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    const res = await fetch('/api/recommend', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: input }),
    });
    const data = await res.json();
    setResult(data.result);
    setLoading(false);
  };

  return (
    <main style={{ padding: 20 }}>
      <h1>Shopee AI 聊天推薦</h1>
      <input
        style={{ width: '100%', padding: 8 }}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="輸入你的購物需求，例如：防水小白鞋，預算800"
      />
      <button onClick={handleSubmit} disabled={loading} style={{ marginTop: 10 }}>
        {loading ? '載入中...' : 'AI 推薦'}
      </button>
      <div style={{ marginTop: 20 }}>{result}</div>
    </main>
  );
}
