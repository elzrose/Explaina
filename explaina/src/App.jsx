import { useState } from "react";
import Cubes from "./Cubes";

function App() {
  const [code, setCode] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const explainWithAI = async () => {
    if (!code.trim()) return;

    setLoading(true);

    try {
      const res = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`
          },
          body: JSON.stringify({
            model: "llama-3.3-70b-versatile",
            messages: [
              {
                role: "user",
                content: `You are a programming teacher explaining code execution.
you dont have to show the code again in the beginning.
I want you to explain the provided code EXACTLY in the format of the following example. Do not deviate from this format.

### FORMAT EXAMPLE ###

Code:
int a = 5;
int b = a + 2;
int c = b * 3;

Explanation:
🔹 Step 1: Understand what's happening overall

We are:
creating variables and changing values step-by-step

🔹 Step 2: Execute line by line

👉 Line 1:
int a = 5;
Create a variable a
Store value 5

🧠 Memory now:
a = 5

👉 Line 2:
int b = a + 2;
Look at a → value is 5
Calculate: 5 + 2 = 7
Store result in b

🧠 Memory now:
a = 5
b = 7

👉 Line 3:
int c = b * 3;
Look at b → value is 7
Calculate: 7 * 3 = 21
Store result in c

🧠 Memory now:
a = 5
b = 7
c = 21

### END OF EXAMPLE ###

Now, explain the following code using the EXACT same style and format shown above:

Code:
${code}`
              }
            ]
          })
        }
      );

      console.log("STATUS:", res.status);

      const data = await res.json();
      console.log("FULL RESPONSE:", data);

      const text =
        data?.choices?.[0]?.message?.content ||
        "No response from AI";

      setAiResponse(text);

    } catch (error) {
      console.error(error);
      setAiResponse("Error calling Gemini API");
    }

    setLoading(false);
  };

  return (
    <>
      {/* BACKGROUND */}
      <Cubes
        gridSize={14}
        maxAngle={45}
        radius={3}
        cellGap={6}
        borderStyle="2px dashed #00ffcc55"
        faceColor="#0a0a0a"
        rippleColor="#00ffcc"
        rippleSpeed={1.5}
        autoAnimate
        rippleOnClick
      />

      <div className="app">
        <h1 className="title">EXPLAINA</h1>
        <p className="subtitle">AI Code Explainer</p>

        {/* INPUT */}
        <textarea
          placeholder="Paste your code here..."
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />

        {/* BUTTONS */}
        <div style={{ marginTop: "10px" }}>
          <button onClick={explainWithAI}>
            Explain with AI
          </button>

          <button
            onClick={() => setCode("")}
            style={{ marginLeft: "10px", background: "#333", color: "#fff" }}
          >
            Clear
          </button>
        </div>

        {/* OUTPUT */}
        <div className="output">
          <h3>Explanation:</h3>

          {loading ? (
            <p>Thinking... 🤖</p>
          ) : (
            <pre>{aiResponse || "No explanation yet."}</pre>
          )}
        </div>
      </div>
    </>
  );
}

export default App;