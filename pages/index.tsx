import { useState } from 'react';

const mockProducts = [
  {
    title: '防水小白鞋 | 女生百搭款',
    price: '$699',
    link: 'https://shope.ee/9z1abcDEFgh',
    image: 'https://cf.shopee.tw/file/1234567890abcdef1'
  },
  {
    title: '透氣防滑白色休閒鞋',
    price: '$790',
    link: 'https://shope.ee/abc987xyz',
    image: 'https://cf.shopee.tw/file/abcdef9876543210'
  }
];

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
    <main className="max-w-xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold text-center">Shopee AI 聊天推薦</h1>
      <input
        className="w-full p-2 border rounded"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="輸入購物需求，例如：防水耳機，預算1000元"
      />
      <button onClick={handleSubmit} disabled={loading} className="bg-orange-500 text-white px-4 py-2 rounded w-full">
        {loading ? 'AI 分析中...' : 'AI 推薦'}
      </button>
      {result && <p className="bg-gray-100 p-3 rounded">{result}</p>}
      <div className="grid gap-4">
        {mockProducts.map((item, idx) => (
          <div key={idx} className="flex gap-4 p-3 border rounded">
            <img src={item.image} alt="product" className="w-20 h-20 object-cover rounded" />
            <div>
              <h2 className="font-semibold">{item.title}</h2>
              <p className="text-sm text-gray-600">{item.price}</p>
              <a href={item.link} target="_blank" className="text-blue-600 text-sm underline">前往蝦皮查看</a>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
