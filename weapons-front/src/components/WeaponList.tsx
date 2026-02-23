import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { Weapon } from "../types/Weapon";
import "./WeaponList.css";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import SilverSword from "../assets/SilverSword.png";
import StaffofInfernalFlame from "../assets/StaffofInfernalFlame.png";
import HerosBow from "../assets/Hero’sBow.png";
import IceSpear from "../assets/IceSpear.png";
import WindDagger from "../assets/WindDagger.png";

const WeaponList: React.FC = () => {
  const [weapons, setWeapons] = useState<Weapon[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchWeapons = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/weapons", {
          headers: {
            Accept: "application/json",
          },
        });
        if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
        const data: Weapon[] = await res.json();
        setWeapons(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchWeapons();
  }, []);

  const imageMap: Record<string, string> = {
    "銀の剣": SilverSword,
    "魔炎の杖": StaffofInfernalFlame,
    "勇者の弓": HerosBow,
    "氷刃の槍": IceSpear,
    "風の短剣": WindDagger,
  };

if (loading) return <p>読み込み中...</p>;

return (
    <div
      style={{
        background: "linear-gradient(to bottom, #fdfdfd, #e7eef7)",
        minHeight: "100vh",
        padding: "2rem",
        fontFamily: "'Noto Sans JP', sans-serif",
      }}
    >
      <h2
        style={{
          color: "#1A3C65",
          textAlign: "center",
          fontSize: "2rem",
          marginBottom: "2rem",
          fontWeight: 700,
        }}
      >
        ⚔️ Armes de Paris
      </h2>

      <div className="carousel-container">

        {/* 横スクロールエリア */}
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3500 }}
          loop
          spaceBetween={24}
          slidesPerView={4}
          style={{
            paddingBottom: "3rem",
          }}
          breakpoints={{
            0: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
        >
            {weapons.map((w) => (
              <SwiperSlide key={w.id}>
                <Link to={`/weapons/${w.id}`} style={{textDecoration:"none",color:"inherit"}}>
                  <div
                    key={w.id}
                    style={{
                      background: "rgba(255, 255, 255, 0.75)",
                      borderRadius: "1rem",
                      boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                      backdropFilter: "blur(6px)",
                      overflow: "hidden",
                      transition: "transform 0.2s ease",
                    }}
                    onMouseEnter={(e) =>
                      ((e.currentTarget.style.transform = "scale(1.03)"))
                    }
                    onMouseLeave={(e) =>
                      ((e.currentTarget.style.transform = "scale(1.0)"))
                    }
                  >
                    <img
                      src={imageMap[w.weapon_name] || ""}
                      alt={w.weapon_name}
                      style={{
                        width: "100%",
                        height: "180px",
                        objectFit: "cover",
                        borderBottom: "1px solid #ddd",
                      }}
                    />
                    <div style={{ padding: "1rem" }}>
                      <h3 style={{ color: "#1A3C65", margin: "0 0 0.5rem" }}>
                        {w.weapon_name}
                      </h3>
                      <p style={{ fontSize: "0.9rem", color: "#333", margin: 0 }}>
                        {w.description}
                      </p>
                      <p style={{ fontWeight: 600, color: "#1A3C65", marginTop: "0.5rem" }}>
                        💰 {w.price} G
                      </p>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
            </Swiper>

            {/* テキストのみモダンリスト */}
            <div
              style={{
                maxWidth: "900px",
                margin: "5rem auto 0",
              }}
            >
              <h3
                style={{
                  fontSize: "1.6rem",
                  fontWeight: 700,
                  color: "#1A3C65",
                  marginBottom: "2rem",
                  letterSpacing: "0.5px",
                }}
              >
                武器一覧
              </h3>

              <div
                style={{
                  borderRadius: "16px",
                  overflow: "hidden",
                  border: "1px solid #e5e7eb",
                  background: "#ffffff",
                }}
              >
                {weapons.map((w, index) => (
                  <Link
                    key={w.id}
                    to={`/weapons/${w.id}`}
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                    }}
                  >
                    <div
                      style={{
                        padding: "1.5rem 2rem",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        borderBottom:
                          index !== weapons.length - 1
                            ? "1px solid #f0f0f0"
                            : "none",
                        transition: "all 0.2s ease",
                        cursor: "pointer",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "#f8fafc";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "#ffffff";
                      }}
                    >
                      <div>
                        <div
                          style={{
                            fontSize: "1.1rem",
                            fontWeight: 600,
                            color: "#1A3C65",
                            marginBottom: "0.3rem",
                          }}
                        >
                          {w.weapon_name}
                        </div>

                        <div
                          style={{
                            fontSize: "0.85rem",
                            color: "#6b7280",
                          }}
                        >
                          {w.description}
                        </div>
                      </div>

                      <div
                        style={{
                          fontWeight: 700,
                          fontSize: "1rem",
                          color: "#1A3C65",
                          minWidth: "120px",
                          textAlign: "right",
                        }}
                      >
                        {w.price.toLocaleString()} G
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
      </div>
    </div>
  );
};
export default WeaponList;
