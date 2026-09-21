export default async function handler(req, res) {
  try {
const response = await fetch("https://qa-portfolio1-rose.vercel.app/api/proxy", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ feature: "Login Lockout" })
})


    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Proxy error", details: error.message });
  }
}
