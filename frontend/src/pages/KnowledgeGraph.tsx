// src/pages/mapping.tsx
import React, { useState, useRef, useEffect } from "react";
import ForceGraph2D from "react-force-graph-2d";

type Node = { id: string; name: string; group: string; expanded?: boolean };
type Link = { source: string; target: string };

const initialNodes: Node[] = [{ id: "情報学", name: "情報学", group: "root" }];

const relations: Record<string, string[]> = {
  情報学: [
    "情報アクセス",
    "情報アーキテクチャ",
    "情報行動",
    "情報管理",
    "情報検索",
    "情報探索",
    "情報社会",
    "知識組織化",
    "オントロジー",
    "哲学",
    "科学技術社会論",
    "分類体系",
  ],
  情報アクセス: ["IR", "検索行動", "ユーザモデリング"],
  情報アーキテクチャ: ["UXデザイン", "ナビゲーション設計", "Web情報構造"],
  情報行動: ["情報探索行動", "学習行動", "意思決定"],
  情報管理: ["レコード管理", "データガバナンス", "アーカイブ学"],
  情報検索: ["ランキング学習", "推薦システム", "インタラクティブIR"],
  情報探索: ["可視化検索", "クエリ拡張", "検索意図分析"],
  情報社会: ["プライバシー", "デジタルデバイド", "情報倫理"],
  知識組織化: ["分類法", "件名標目", "シソーラス"],
  オントロジー: ["意味論", "知識表現", "メタデータ"],
  哲学: ["知識論", "意味論", "科学哲学"],
  科学技術社会論: ["STS", "テクノロジー倫理", "社会構成主義"],
  分類体系: ["NDC", "UDC", "DDC"],
};

export default function MappingPage() {
  const [graphData, setGraphData] = useState<{ nodes: Node[]; links: Link[] }>({
    nodes: initialNodes,
    links: [],
  });

  const fgRef = useRef<any>(null);

  const handleNodeClick = (clickedNode: Node) => {
    const existingNode = graphData.nodes.find((n) => n.id === clickedNode.id);
    if (existingNode?.expanded) return;

    const children = relations[clickedNode.id];
    if (!children) return;

    const newNodes = children
      .filter((child) => !graphData.nodes.some((n) => n.id === child))
      .map((child) => ({ id: child, name: child, group: clickedNode.id }));

    const newLinks = children.map((child) => ({
      source: clickedNode.id,
      target: child,
    }));

    const updatedNodes = graphData.nodes.map((n) =>
      n.id === clickedNode.id ? { ...n, expanded: true } : n
    );

    setGraphData({
      nodes: [...updatedNodes, ...newNodes],
      links: [...graphData.links, ...newLinks],
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (fgRef.current) {
        fgRef.current.zoom(4, 400); // 拡大して中央へ
        fgRef.current.centerAt(0, 0, 400);
      }
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        background: "#fafafa",
      }}
    >
      <ForceGraph2D
        ref={fgRef}
        graphData={graphData}
        nodeAutoColorBy="group"
        backgroundColor="#fafafa"
        linkColor={() => "rgba(0,0,0,0.3)"}
        nodeLabel={(node) => (node as Node).name}
        nodeCanvasObject={(node, ctx, globalScale) => {
          const label = (node as Node).name;
          const fontSize = 14 / globalScale; // 見やすい大きさ
          ctx.font = `${fontSize}px 'Helvetica Neue', sans-serif`;
          const textWidth = ctx.measureText(label).width;
          const boxWidth = textWidth + 10;
          const boxHeight = fontSize + 6;

          ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
          ctx.fillRect(
            (node.x || 0) - boxWidth / 2,
            (node.y || 0) - boxHeight / 2,
            boxWidth,
            boxHeight
          );

          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillStyle = "#222";
          ctx.fillText(label, node.x || 0, node.y || 0);
        }}
        onNodeClick={(node) => handleNodeClick(node as Node)}
        linkDirectionalParticles={1}
        linkDirectionalParticleWidth={1}
        cooldownTicks={120}
      />
    </div>
  );
}
