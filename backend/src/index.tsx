// backend/index.ts
import { Hono } from "hono";
import { cors } from "hono/cors";
import simplifyApp from "./apps/simplify";

// Cloudflare Bindings 型宣言
export type CloudflareBindings = {
  // 例：KVやSecretsを使う場合ここに追加
  // MY_KV: KVNamespace;
};

// メインアプリ作成
const app = new Hono<{ Bindings: CloudflareBindings }>();

// --- ミドルウェア ---
app.use("*", cors());

// --- トップページ（動作確認用）---
app.get("/", (c) => c.text("✅ Hono backend running on Cloudflare Workers"));

// --- APIルート登録 ---
app.route("/api/simplify", simplifyApp);

export default app;
