"use client";
import { useEffect, useState } from "react";

export default function Page() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("all");

  // Fetch data
  useEffect(() => {
    const fetchData = () => {
      fetch("https://opensheet.elk.sh/1tiqiFX65W_T4K6l17TcTbf_ibrvkg6o8PnH2ywoAK70/Sheet1")
        .then(res => res.json())
        .then(setData);
    };

    fetchData();

    // Auto refresh every 60 seconds
    const interval = setInterval(fetchData, 60000);

    return () => clearInterval(interval);
  }, []);

  // Alert system
  useEffect(() => {
    data.forEach(item => {
      if (Number(item.Score) >= 9) {
        console.log(`🚀 High Opportunity: ${item.Trend}`);
      }
    });
  }, [data]);

  // Filter logic
  const filtered =
    filter === "all"
      ? data
      : data.filter(item => Number(item.Score) >= 8);

  // Color logic
  const getColor = (score) => {
    if (score >= 8) return "#16a34a"; // green
    if (score >= 5) return "#f59e0b"; // orange
    return "#dc2626"; // red
  };

  // AI Insight logic
  const generateInsight = (item) => {
    const score = Number(item.Score);

    if (score >= 9) {
      return "🚀 Breakout trend. Strong global traction + low India penetration. Enter immediately.";
    } else if (score >= 7) {
      return "📈 Growing trend. Good opportunity with differentiation.";
    } else if (score >= 5) {
      return "⚠️ Moderate potential. Needs niche positioning.";
    } else {
      return "❌ Weak signal. Avoid or monitor.";
    }
  };

  return (
    <div style={{ padding: "30px", background: "#f1f5f9", minHeight: "100vh", fontFamily: "Inter, sans-serif" }}>
      
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
        <h1>🚀 Trend Intelligence Engine</h1>

        <select
          onChange={(e) => setFilter(e.target.value)}
          style={{ padding: "8px", borderRadius: "8px" }}
        >
          <option value="all">All</option>
          <option value="high">High Score (8+)</option>
        </select>
      </div>

      {/* Grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "20px"
      }}>
        
        {filtered.map((item, i) => {
          const score = Number(item.Score);

          return (
            <div key={i} style={{
              background: "white",
              padding: "20px",
              borderRadius: "16px",
              boxShadow: "0 6px 16px rgba(0,0,0,0.05)"
            }}>
              
              <h2>{item.Trend}</h2>
              <p style={{ color: "#64748b" }}>{item.Category}</p>

              <div style={{ marginTop: "10px" }}>
                <p>🌍 US Growth: {item.US_Growth}</p>
                <p>🇮🇳 India Stage: {item.India_Stage}</p>
              </div>

              {/* Score */}
              <div style={{
                marginTop: "10px",
                fontWeight: "bold",
                color: getColor(score)
              }}>
                Score: {score}
              </div>

              {/* Chart bar */}
              <div style={{
                height: "8px",
                background: "#e5e7eb",
                borderRadius: "5px",
                marginTop: "10px"
              }}>
                <div style={{
                  width: `${score * 10}%`,
                  height: "100%",
                  background: getColor(score),
                  borderRadius: "5px"
                }} />
              </div>

              <hr style={{ margin: "15px 0" }} />

              {/* Insight */}
              <p style={{ fontSize: "14px", color: "#475569" }}>
                💡 <b>Insight:</b> {generateInsight(item)}
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