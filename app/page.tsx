"use client";
import { useEffect, useState } from "react";

export default function Page() {
  const [data, setData] = useState<any[]>([]);
  const [filter, setFilter] = useState("all");
  const [insights, setInsights] = useState<{ [key: number]: string }>({});

  // Fetch data
  useEffect(() => {
    const fetchData = () => {
      fetch(
        "https://opensheet.elk.sh/1tiqiFX65W_T4K6l17TcTbf_ibrvkg6o8PnH2ywoAK70/Sheet1"
      )
        .then((res) => res.json())
        .then(setData);
    };

    fetchData();

    // Auto refresh every 60 seconds
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, []);

  // Filter logic
  const filteredData =
    filter === "all"
      ? data
      : data.filter((item) => item.Category === filter);

  // AI Insight fetch
  const getInsight = async (item: any, index: number) => {
    if (insights[index]) return;

    setInsights((prev) => ({
      ...prev,
      [index]: "Generating AI insight...",
    }));

    try {
      const res = await fetch("/api/insight", {
        method: "POST",
        body: JSON.stringify({
          prompt: `Analyze this trend: ${item.Trend} in ${item.Category}. Suggest opportunity in India.`,
        }),
      });

      const data = await res.json();

      setInsights((prev) => ({
        ...prev,
        [index]: data.insight,
      }));
    } catch (err) {
      setInsights((prev) => ({
        ...prev,
        [index]: "Error generating insight",
      }));
    }
  };

  return (
    <div style={{ padding: 20, fontFamily: "Arial" }}>
      <h1>🚀 Trend Intelligence Engine</h1>

      {/* Filter */}
      <select
        onChange={(e) => setFilter(e.target.value)}
        style={{ marginBottom: 20, padding: 8 }}
      >
        <option value="all">All</option>
        <option value="Health">Health</option>
        <option value="Tech">Tech</option>
        <option value="Food">Food</option>
      </select>

      {/* Cards */}
      {filteredData.map((item, i) => (
        <div
          key={i}
          style={{
            background: "#fff",
            padding: 15,
            marginTop: 10,
            borderRadius: 10,
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
          }}
        >
          <h3>{item.Trend}</h3>
          <p>{item.Category}</p>

          <p>🌍 US Growth: {item.US_Growth}</p>
          <p>🇮🇳 India Stage: {item.India_Stage}</p>

          <p style={{ color: "green", fontWeight: "bold" }}>
            Score: {item.Score}
          </p>

          {/* Score Bar */}
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
                width: `${Number(item.Score) * 10}%`,
                height: "100%",
                background: "green",
                borderRadius: "5px",
              }}
            />
          </div>

          {/* AI Insight */}
          <p
            onMouseEnter={() => getInsight(item, i)}
            style={{
              marginTop: 10,
              cursor: "pointer",
              color: "#444",
            }}
          >
            💡 {insights[i] || "Hover to generate AI insight"}
          </p>

          <hr style={{ margin: "15px 0" }} />

          <p>
            🛒 <b>Product:</b> {item.Product_Idea}
          </p>
          <p>
            🏢 <b>Business:</b> {item.Business_Idea}
          </p>
          <p>
            ⚡ <b>Arbitrage:</b> {item.Arbitrage}
          </p>
        </div>
      ))}
    </div>
  );
}