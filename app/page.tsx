"use client";
import { useEffect, useState } from "react";

export default function Page() {
  const [data, setData] = useState([]);

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

  return (
    <div style={{ padding: 20 }}>
      <h1>🚀 Trend Opportunities</h1>

      {data.map((item, i) => (
        <div key={i} style={{
          background: "#fff",
          padding: 15,
          marginTop: 10,
          borderRadius: 10
        }}>
          <h3>{item.Trend}</h3>
          <p>{item.Category}</p>
          <p>Score: {item.Score}</p>

          <p><b>Product:</b> {item.Product_Idea}</p>
          <p><b>Business:</b> {item.Business_Idea}</p>
          <p><b>Arbitrage:</b> {item.Arbitrage}</p>
        </div>
      ))}
    </div>
  );
} 