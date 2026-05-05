import { useState } from "react";

function App() {
  const [code, setCode] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const explainWithAI = async () => {
    if (!code.trim()) return;

    setLoading(true);
    setAiResponse("");

    try {
      const res = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=AIzaSyBis4bh04HAMhrTf-Ql4JR7ZHOoqlPVhKc",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `You are a programming teacher explaining code execution.

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
              }
            ]
          })
        }
      );
      console.log("STATUS:", res.status);
      const data = await res.json();
      console.log("FULL RESPONSE:", data);

      // Extract AI response safely
      const text =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "No response from AI";

      setAiResponse(text);

    } catch (error) {
      console.error(error);
      setAiResponse("Error calling Gemini API");
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>AI Code Explainer (Gemini)</h1>
      <p>Paste your code and get explanation</p>

      {/* INPUT */}
      <textarea
        rows="10"
        cols="60"
        placeholder="Paste your code here..."
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />

      <br /><br />

      {/* BUTTON */}
      <button onClick={explainWithAI}>
        Explain with AI
      </button>

      {/* LOADING */}
      {loading && <p>Thinking... 🤖</p>}

      {/* OUTPUT */}
      <div style={{ marginTop: "20px" }}>
        <h3>AI Explanation:</h3>

        <pre
          style={{
            background: "#0a0a0a",
            color: "#00ff00",
            padding: "15px",
            whiteSpace: "pre-wrap",
            textAlign: "left",
            fontFamily: "monospace",
            fontSize: "14px",
            border: "1px solid #333",
            borderRadius: "5px",
            margin: "0"
          }}
        >
          {aiResponse}
        </pre>
      </div>
    </div>
  );
}

export default App;