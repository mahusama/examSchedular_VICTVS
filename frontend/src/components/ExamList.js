// ExamList.js
import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import ExamCard from "./ExamCard";
import MapView from "./Map";
import Papa from "papaparse";

const API_URL = "http://localhost:5000/api/exams";

export default function ExamList() {
  const [exams, setExams] = useState([]);
  const [filters, setFilters] = useState({ status: "", candidate: "", sortBy: "" });
  const [showMap, setShowMap] = useState(false);


  const [page, setPage] = useState(1);
  const perPage = 6;

  const fetchExams = async () => {
    try {
      const q = new URLSearchParams(filters).toString();
      const res = await axios.get(`${API_URL}?${q}`);
      setExams(res.data);
      setPage(1); // reset page
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchExams();
  
  }, [filters]);

  const handleAdvance = async (id) => {
    try {
      await axios.put(`${API_URL}/${id}/advance`);
      fetchExams();
    } catch (err) {
      console.error(err);
    }
  };

  // CSV export
  const exportCSV = () => {
    const csv = Papa.unparse(
      exams.map((e) => ({
        ID: e.ID,
        title: e.title,
        status: e.status,
        datetime: e.datetime,
        language: e.language,
        candidates: e.candidates.join("; "),
        country: e.location?.country ?? "",
      }))
    );
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `exams_export_${new Date().toISOString()}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // Derived values for pagination
  const totalPages = Math.max(1, Math.ceil(exams.length / perPage));
  const pagedExams = useMemo(() => {
    const start = (page - 1) * perPage;
    return exams.slice(start, start + perPage);
  }, [exams, page]);

  return (
    <div className="exam-list" style={{ maxWidth: 1100, margin: "0 auto", padding: 16 }}>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center", marginBottom: 12 }}>
        <select
          onChange={(e) => setFilters((f) => ({ ...f, status: e.target.value }))}
          defaultValue=""
        >
          <option value="">All statuses</option>
          <option value="Pending">Pending</option>
          <option value="Started">Started</option>
          <option value="Finished">Finished</option>
        </select>

        <input
          placeholder="Filter by candidate"
          onChange={(e) => setFilters((f) => ({ ...f, candidate: e.target.value }))}
          style={{ minWidth: 160,maxHeight :36, fontSize :"large" }}
        />

        <select onChange={(e) => setFilters((f) => ({ ...f, sortBy: e.target.value }))} defaultValue="">
          <option value="">Sort by</option>
          <option value="datetime">Date</option>
          <option value="title">Title</option>
          <option value="status">Status</option>
        </select>

        <button onClick={fetchExams}>Apply</button>

        <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
          <button onClick={() => setShowMap((s) => !s)}>
            {showMap ? "Show List" : "Show Map"}
          </button>
          <button onClick={exportCSV}>Export CSV</button>
        </div>
      </div>

      {showMap ? (
        <div style={{ height: 480 }}>
          <MapView exams={exams} height={480} />
        </div>
      ) : (
        <>
          <div
            className="exam-cards"
            style={{
              display: "grid",
              gap: 12,
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              maxWidth: 360 * 3 + 12 * 5,
            }}
          >
            {pagedExams.map((exam) => (
              <ExamCard key={exam._id} exam={exam} onAdvance={() => handleAdvance(exam._id)} />
            ))}
          </div>

       
          <div style={{ display: "flex", justifyContent: "center", marginTop: 16, gap: 8 }}>
            <button style={{ backgroundColor: "transparent" }} onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>
              Prev
            </button>
            <div style={{ padding: "6px 10px", alignSelf: "center" }}>
              Page {page} / {totalPages}
            </div>
            <button style={{ backgroundColor: "transparent" }} onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}>
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
