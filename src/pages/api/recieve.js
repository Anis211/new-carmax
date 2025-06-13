export default async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    console.log("Received from n8n:", data);

    res.status(200).json({ message: "Data received", receivedData: data });
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
