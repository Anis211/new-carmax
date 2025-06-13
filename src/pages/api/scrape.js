import cheerio from "cheerio";

export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: "Missing URL parameter" });
  }

  try {
    const apiKey = process.env.SCRAPERAPI_KEY;
    const apiURL = `https://api.scraperapi.com ?api_key=${apiKey}&url=${encodeURIComponent(
      url
    )}&render=true`;

    const response = await fetch(apiURL);
    if (!response.ok) {
      throw new Error(`ScraperAPI responded with status ${response.status}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    // Example: Scrape product name and price from a typical product page
    const product = {
      title: $("h1.product-title").text().trim(),
      price: $(".price-class").text().trim(), // update selector based on actual site
      description: $("#product-description").text().trim(),
    };

    res.status(200).json(product);
  } catch (error) {
    console.error("Scraping failed:", error.message);
    res.status(500).json({ error: "Failed to scrape or parse website" });
  }
}
