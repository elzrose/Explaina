async function test() {
  try {
    const res = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models?key=AIzaSyBis4bh04HAMhrTf-Ql4JR7ZHOoqlPVhKc"
    );
    const data = await res.json();
    console.log("MODELS:", JSON.stringify(data.models.map(m => m.name), null, 2));
  } catch (err) {
    console.error("ERROR:", err);
  }
}

test();
