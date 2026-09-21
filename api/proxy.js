export default async function handler(req, res) {
  try {
    // 1. جلب مفتاح الـ API من متغيرات البيئة في Vercel
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ error: "Gemini API Key is missing in environment variables." });
    }

    // 2. استقبال اسم الميزة من الـ Frontend (أو استخدام الافتراضي "Login Lockout")
    const { feature } = req.body || { feature: "Login Lockout" };

    // 3. رابط Gemini API الرسمي مع المفتاح
const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
    // 4. إرسال الطلب لـ Gemini
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `You are a QA Engineer. Generate detailed QA test cases for the following feature: ${feature}`
              }
            ]
          }
        ]
      })
    });

    const data = await response.json();

    // 5. إرجاع النتيجة للـ Frontend
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Proxy error", details: error.message });
  }
}
