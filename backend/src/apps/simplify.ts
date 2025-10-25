// backend/apps/simplify.ts
import { Hono } from "hono";

const simplifyApp = new Hono();

// 簡易的な専門語辞書
const dictionary = [
  { word: "暗号化", simple: "データを隠すこと", definition: "他の人に読めないようにすること" },
  { word: "通信", simple: "やりとり", definition: "情報を送ったり受け取ったりすること" },
  { word: "秘匿性", simple: "秘密を守る力", definition: "他人に知られないようにすること" },
  { word: "脆弱性", simple: "弱点", definition: "攻撃されやすい部分のこと" },
  { word: "認証", simple: "確認", definition: "正しい人かどうか確かめること" },
  { word: "マルウェア", simple: "悪いソフト", definition: "コンピュータを壊したり情報を盗むプログラム" },
  { word: "ファイアウォール", simple: "守る壁", definition: "不正なアクセスを防ぐ仕組み" },
  { word: "サイバー攻撃", simple: "ネットでの攻撃", definition: "インターネットを使って悪意あることをすること" },
];

simplifyApp.post("/", async (c) => {
  const { text } = await c.req.json<{ text: string }>();

  if (!text) {
    return c.json({ error: "No text provided" }, 400);
  }

  let simplified = text;
  const annotations: typeof dictionary = [];

  for (const entry of dictionary) {
    if (simplified.includes(entry.word)) {
      simplified = simplified.replaceAll(entry.word, entry.simple);
      annotations.push(entry);
    }
  }

  return c.json({
    simplified,
    annotations,
  });
});

export default simplifyApp;
