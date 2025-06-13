export default async function handler(req, res) {
  const n8nWebhookUrl =
    "https://n8n-uq9f.onrender.com/webhook-test/9607eb31-9dd5-426e-9256-ccb7d1cd0870";

  try {
    const response = await fetch(n8nWebhookUrl, {
      method: req.method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to forward request to n8n" });
  }
}
