async function test() {
  try {
    const res = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models?key=AIzaSyBis4bh04HAMhrTf-Ql4JR7ZHOoqlPVhKc"
    );
    const data = await res.json();
    console.log("MODELS:", data.models.map(m => m.name).filter(n => n.includes("flash")));
  } catch (err) {
    console.error("ERROR:", err);
  }
}

test();
