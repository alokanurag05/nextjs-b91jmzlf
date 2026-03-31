"use client";
import { useEffect, useState } from "react";

/* ✅ TYPE FIX (VERY IMPORTANT) */
type Trend = {
  Trend: string;
  Category: string;
  US_Growth: string;
  India_Stage: string;
  Score: string;
  Product_Idea: string;
  Business_Idea: string;
  Arbitrage: string;
};

export default function Page() {
  const [data, setData] = useState<Trend[]>([]);
  const [filter, setFilter] = useState("all");

  // Fetch data
  useEffect(() => {
    const fetchData = () => {
      fetch("https://opensheet.elk.sh/1tiqiFX65W_T4K6l17TcTbf_ibrvkg6o8PnH2ywoAK70/Sheet1")
        .then(res => res.json())
        .then(setData);
    };

    fetchData();
    const interval = setInterval(fetchData, 60000);

    return () => clearInterval(interval);
  }, []);

  // Filter
  const filtered =
    filter === "all"
      ? data
      : data.filter(item => Number(item.Score) >= 8);

  // Score color
  const getColor = (score: number) => {
    if (score >= 8) return "#16a34a";
    if (score >= 5) return "#f59e0b";
    return "#dc2626";
  };

  return (
    <div
      style={{
        padding: "30px",
        background: "#f1f5f9",
        minHeight: "100vh",
        fontFamily: "Inter, sans-serif",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "25px",
        }}
      >
        <h1 style={{ fontSize: "26px" }}>
          🚀 Trend Intelligence Engine
        </h1>

        <select
          onChange={(e) => setFilter(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "10px",
            border: "1px solid #cbd5f5",
          }}
        >
          <option value="all">All</option>
          <option value="high">High Score (8+)</option>
        </select>
      </div>

      {/* Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "20px",
        }}
      >
        {filtered.map((item, i) => {
          const score = Number(item.Score);

          return (
            <div
              key={i}
              style={{
                background: "white",
                padding: "22px",
                borderRadius: "18px",
                boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
                border: "1px solid #e2e8f0",
                transition: "0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              {/* Title */}
              <h2>{item.Trend}</h2>
              <p style={{ color: "#64748b" }}>{item.Category}</p>

              {/* Meta */}
              <div style={{ marginTop: "10px" }}>
                <p>🌍 US Growth: {item.US_Growth}</p>
                <p>🇮🇳 India Stage: {item.India_Stage}</p>
              </div>

              {/* Score */}
              <div
                style={{
                  marginTop: "10px",
                  fontWeight: "bold",
                  color: getColor(score),
                }}
              >
                Score: {score}
              </div>

              {/* Progress Bar */}
              <div
                style={{
                  height: "8px",
                  background: "#e5e7eb",
                  borderRadius: "5px",
                  marginTop: "10px",
                }}
              >
                <div
                  style={{
                    width: `${score * 10}%`,
                    height: "100%",
                    background: getColor(score),
                    borderRadius: "5px",
                  }}
                />
              </div>

              <hr style={{ margin: "15px 0" }} />

              {/* AI Insight */}
              <p style={{ fontSize: "14px", color: "#475569" }}>
                💡 <b>Insight:</b>{" "}
                {score >= 9
                  ? "🚀 Breakout trend. Enter early for category leadership."
                  : score >= 7
                  ? "📈 Fast-growing trend. Strong potential with differentiation."
                  : score >= 5
                  ? "⚠️ Moderate opportunity. Requires niche positioning."
                  : "❌ Low signal. Monitor but avoid heavy investment."}
              </p>

              <hr style={{ margin: "15px 0" }} />

              {/* Actions */}
              <p><b>🛒 Product:</b> {item.Product_Idea}</p>
              <p><b>🏢 Business:</b> {item.Business_Idea}</p>
              <p><b>⚡ Arbitrage:</b> {item.Arbitrage}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}