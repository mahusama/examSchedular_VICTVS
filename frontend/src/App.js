import React from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import ExamList from "./components/ExamList";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="system-title">
        <h1>Exam Schedule System</h1>
        </div>
      
      
      <ExamList />
      <Footer />
    </div>
  );
}

export default App;
