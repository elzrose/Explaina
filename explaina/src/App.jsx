import { useState } from "react";

function App() {
  const [code, setCode] = useState("");
  const [lines, setLines] = useState([]);

  const handleExplain = () => {
    const splitLines = code.split("\n");
    setLines(splitLines);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Explaina</h1>
      <p>Understand your code step-by-step</p>

      <textarea
        rows="10"
        cols="60"
        placeholder="Paste your code here..."
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />

      <br /><br />

      <button onClick={handleExplain}>Explain</button>

      <h3>Output:</h3>

      <div>
        {lines.map((line, index) => (
          <div key={index}>{line}</div>
        ))}
      </div>
    </div>
  );
}

export default App;