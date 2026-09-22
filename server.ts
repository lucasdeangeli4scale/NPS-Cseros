import express from "express";
import path from "path";
import axios from "axios";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // API routes
  app.get("/api/noco-data", async (req, res) => {
    try {
      const apiKey = process.env.NOCODB_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ error: "Missing NocoDB API Key" });
      }

      const response = await axios.get(
        "https://nocodb.deangelitech.com.br/api/v2/tables/mg0iwqazu7lvhq3/records",
        {
          headers: {
            "xc-token": apiKey,
          },
          params: {
            pageSize: 25,
            viewId: "vwbkrku8bbtyh4ki",
          },
        }
      );
      res.json(response.data);
    } catch (error: any) {
      console.error("Error fetching NocoDB data:", error.message);
      res.status(500).json({ error: "Failed to fetch data", details: error.message });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
