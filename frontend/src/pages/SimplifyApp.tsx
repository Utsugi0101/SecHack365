// src/pages/simplify.tsx
import { useState } from "react";

export default function SimplifyApp() {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [annotations, setAnnotations] = useState<
    { word: string; simple: string; definition: string }[]
  >([]);

  const handleSimplify = async () => {
    if (!text.trim()) return;

    const res = await fetch("/api/simplify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    const data = await res.json();
    setResult(data.simplified);
    setAnnotations(data.annotations || []);
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <h1 className="text-2xl font-bold mb-4">
        専門文をやさしくするアプリ（試作）
      </h1>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={8}
        className="w-full border p-2 mb-4 rounded"
        placeholder="例：暗号化通信によりデータの秘匿性を確保する。"
      />
      <button
        onClick={handleSimplify}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        簡易化する
      </button>

      {result && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">簡易化結果</h2>
          <p className="bg-gray-100 p-3 rounded">{result}</p>
        </div>
      )}

      {annotations.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">注釈</h3>
          <ul className="list-disc pl-5">
            {annotations.map((a, i) => (
              <li key={i}>
                <b>{a.word}</b> → {a.simple} （{a.definition}）
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
