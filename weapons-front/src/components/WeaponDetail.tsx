import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import type { Weapon } from "../types/Weapon";

import "./WeaponDetail.css";

// 画像マップ（List と共通）
import SilverSword from "../assets/SilverSword.png";
import StaffofInfernalFlame from "../assets/StaffofInfernalFlame.png";
import HerosBow from "../assets/Hero’sBow.png";
import IceSpear from "../assets/IceSpear.png";
import WindDagger from "../assets/WindDagger.png";

const imageMap: Record<string, string> = {
  "銀の剣": SilverSword,
  "魔炎の杖": StaffofInfernalFlame,
  "勇者の弓": HerosBow,
  "氷刃の槍": IceSpear,
  "風の短剣": WindDagger,
};

const WeaponDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [weapon, setWeapon] = useState<Weapon | null>(null);

  useEffect(() => {
    const fetchWeapon = async () => {
      const res = await fetch(`http://localhost:8000/api/weapons/${id}`);
      const data = await res.json();
      setWeapon(data);
    };
    fetchWeapon();
  }, [id]);

  if (!weapon) return <p>読み込み中...</p>;

  const img = imageMap[weapon.weapon_name] || "";

  return (
    <div className="detail-container">
      <Link to="/weapons" className="back-link">
        ← 武器一覧に戻る
      </Link>

      <div className="detail-card">
        <img src={img} alt={weapon.weapon_name} className="detail-image" />

        <div className="detail-info">
          <h1 className="weapon-title">{weapon.weapon_name}</h1>
          <p className="weapon-description">{weapon.description}</p>

          <div className="price-box">
            <span className="price-label">価格</span>
            <span className="price-value">💰 {weapon.price} G</span>
          </div>

          <button className="buy-button">🛒 この武器を購入する</button>
        </div>
      </div>
    </div>
  );
};

export default WeaponDetail;
