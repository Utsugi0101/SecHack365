// src/index.tsx
import { Link } from "react-router-dom";

export default function IndexPage() {
  const apps = [
    { name: "ナレッジグラフ", path: "/mapping" },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-6">アプリケーション一覧</h1>

      <div className="grid gap-4 w-full max-w-md">
        {apps.map((app) => (
          <Link
            key={app.path}
            to={app.path}
            className="block bg-white rounded-lg shadow hover:shadow-lg transition p-4 text-center border border-gray-200"
          >
            {app.name}
          </Link>
        ))}
      </div>

      <p className="mt-10 text-gray-500 text-sm">
        新しいアプリは <code>src/pages/</code> に追加して <code>App.tsx</code> にルートを登録してください。
      </p>
    </div>
  );
}
