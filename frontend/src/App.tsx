// src/App.tsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import IndexPage from "./index";
import SimplifyApp from "./pages/SimplifyApp";
import MappingPage from "./pages/KnowledgeGraph";


export default function App() {
  return (
    <Routes>
      <Route path="/" element={<IndexPage />} />
      <Route path="/mapping" element={<MappingPage />} />
      <Route path="/simplify" element={<SimplifyApp />} />
    </Routes>
  );
}
