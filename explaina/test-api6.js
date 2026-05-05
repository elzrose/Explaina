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
    console.log(`STATUS for ${modelName}:`, res.status);
    const data = await res.json();
    if(res.status === 200) {
      console.log(`SUCCESS for ${modelName}`);
      return true;
    } else {
      console.log(`FAILED for ${modelName}:`, data.error.status);
      return false;
    }
  } catch (err) {
    console.error("ERROR:", err);
    return false;
  }
}

async function run() {
  const models = [
    'gemini-2.0-flash',
    'gemini-2.0-flash-lite-001',
    'gemini-flash-latest',
    'gemini-flash-lite-latest',
    'gemini-3-flash-preview'
  ];
  for (const m of models) {
    const success = await test(m);
    if (success) {
      console.log("BEST MODEL TO USE:", m);
      break;
    }
  }
}

run();
