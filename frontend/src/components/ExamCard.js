// ExamCard.js
import React from "react";
import { motion } from "framer-motion";



const statusColor = (s) => {
  if (!s) return "#999";
  if (s === "Pending") return "#f59e0b"; // amber
  if (s === "Started") return "#3b82f6"; // blue
  if (s === "Finished") return "#10b981"; // green
  return "#6b7280"; // gray
};

export default function ExamCard({ exam, onAdvance }) {
  const { title, status, datetime, language, candidates, location } = exam;

  return (
    <motion.div
      className="exam-card"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.25 }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h3 style={{ margin: 0, fontSize: 16 }}>{title}</h3>
        <span
          style={{
            background: statusColor(status),
            color: "white",
            padding: "4px 8px",
            borderRadius: 999,
            fontSize: 12,
            textTransform: "uppercase",
            letterSpacing: 0.6,
          }}
        >
          {status}
        </span>
      </div>

      <p style={{ margin: "8px 0 4px", fontSize: 13 }}>
        <strong>Date:</strong> {new Date(datetime).toLocaleString()}
      </p>

      <p style={{ margin: "4px 0", fontSize: 13 }}>
        <strong>Language:</strong> {language}
      </p>

      <p style={{ margin: "4px 0", fontSize: 13 }}>
        <strong>Candidates:</strong> {candidates.join(", ")}
      </p>

      <p style={{ margin: "4px 0 8px", fontSize: 13 }}>
        <strong>Location:</strong> {location?.country || "N/A"}
      </p>

      <div style={{ display: "flex", gap: 8 }}>
        <button
          onClick={onAdvance}
          disabled={status === "Finished"}
          style={{
            background: status === "Finished" ?  "#2f2f41" :"#e5e7eb",
            color: status === "Finished" ? "white" : "black",
            border: "none",
            padding: "8px 12px",
            borderRadius: 6,
            cursor: status === "Finished" ? "default" : "pointer",
          }}
        >
          Next Status
        </button>
      </div>
    </motion.div>
  );
}
