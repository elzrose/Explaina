const code = "console.log('hello');";

async function test(modelName) {
  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=AIzaSyBis4bh04HAMhrTf-Ql4JR7ZHOoqlPVhKc`,
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
    console.log("STATUS for", modelName, ":", res.status);
    const data = await res.json();
    if(res.status !== 200) {
      console.log("ERROR RESPONSE:", JSON.stringify(data, null, 2));
    } else {
      console.log("SUCCESS for", modelName);
    }
  } catch (err) {
    console.error("ERROR:", err);
  }
}

async function run() {
  await test("gemini-1.5-flash-latest");
  await test("gemini-1.5-flash");
  await test("gemini-pro");
}

run();
