import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import WeaponList from "./components/WeaponList";
import WeaponDetail from "./components/WeaponDetail";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* トップページ（一覧） */}
        <Route path="/weapons" element={<WeaponList />} />

        {/* 詳細ページ */}
        <Route path="/weapons/:id" element={<WeaponDetail />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
