import React, { useEffect, useState } from "react";
import type { Weapon } from "../types/Weapon";

const WeaponList: React.FC = () => {
  console.log("🧩 WeaponListコンポーネントが実行されました");
  const [weapons, setWeapons] = useState<Weapon[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeapons = async () => {
      try {
        console.log("🎯 APIリクエスト開始");
        const res = await fetch("http://localhost:8000/api/weapons", {
          headers: {
            Accept: "application/json",
          },
        });
        if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
        const data: Weapon[] = await res.json();
        console.log("📦 APIレスポンス:", data);
        setWeapons(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchWeapons();
  }, []);

if (loading) return <p>読み込み中...</p>;
if (error) return <p style={{ color: "red" }}>エラー: {error}</p>;

return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h2>⚔️ 武器一覧</h2>
      <table
        border={1}
        cellPadding={8}
        style={{ borderCollapse: "collapse", width: "100%" }}
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>名前</th>
            <th>説明</th>
            <th>価格</th>
            <th>重量</th>
          </tr>
        </thead>
        <tbody>
          {weapons.map((w) => (
            <tr key={w.id}>
              <td>{w.id}</td>
              <td>{w.weapon_name}</td>
              <td>{w.description}</td>
              <td>{w.price}</td>
              <td>{w.weight}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WeaponList;
