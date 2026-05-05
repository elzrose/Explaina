const code = "console.log('hello');";

async function test() {
  try {
    const res = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=AIzaSyBis4bh04HAMhrTf-Ql4JR7ZHOoqlPVhKc",
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
                  text: `Explain this code: ${code}`
                }
              ]
            }
          ]
        })
      }
    );
    console.log("STATUS:", res.status);
    const data = await res.json();
    console.log("FULL RESPONSE:", JSON.stringify(data, null, 2));
    
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response from AI";
    console.log("EXTRACTED TEXT:", text);
  } catch (err) {
    console.error("ERROR:", err);
  }
}

test();
