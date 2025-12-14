import express, { type Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { Mistral } from "@mistralai/mistralai";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure multer for image uploads
const upload = multer({
  dest: path.join(__dirname, "../uploads"),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (_req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"));
    }
  }
});

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // put application routes here
  // prefix all routes with /api

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  // Image upload endpoint
  app.post("/api/upload-image", upload.single("image"), (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      // Return the file path relative to public directory
      const publicPath = `/uploads/${req.file.filename}${path.extname(req.file.originalname)}`;
      
      // Rename file to include original extension
      const oldPath = req.file.path;
      const newPath = path.join(path.dirname(oldPath), `${req.file.filename}${path.extname(req.file.originalname)}`);
      fs.renameSync(oldPath, newPath);

      res.json({
        success: true,
        url: publicPath,
        filename: req.file.originalname
      });
    } catch (error: any) {
      console.error("Upload Error:", error);
      res.status(500).json({ error: "Failed to upload image", message: error.message });
    }
  });

  // Serve uploaded images
  app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

  // AI Edit endpoint
  app.post("/api/ai/edit-section", async (req, res) => {
    try {
      const { prompt, sectionType } = req.body;

      if (!prompt || typeof prompt !== "string") {
        return res.status(400).json({ error: "Prompt is required" });
      }

      const apiKey = process.env.MISTRAL_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ 
          error: "MISTRAL_API_KEY environment variable is not set" 
        });
      }

      const client = new Mistral({ apiKey });

      // Create a prompt for the AI to generate CSS/styling and text changes
      const systemPrompt = `You are a web design assistant. Given a user's request to modify a ${sectionType || "section"} component, 
generate a JSON response with CSS class modifications and text changes. 
Respond ONLY with valid JSON in this format:
{
  "classes": "space-y-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white",
  "textOverrides": {
    "h1": "New Heading Text",
    "p": "New paragraph text",
    "button": "New Button Text"
  },
  "suggestions": ["Add gradient background", "Update heading text"]
}

Rules:
- "classes": Tailwind CSS classes to apply to the section wrapper
- "textOverrides": Object mapping HTML tag names (h1, h2, p, button, etc.) to new text content. Only include tags you want to change.
- "suggestions": Array of human-readable descriptions of changes made
- Focus on Tailwind CSS classes. Be creative but practical.
- For text changes, identify the most important text elements (headings, buttons, key paragraphs) and provide new content.`;

      const response = await client.chat.complete({
        model: "mistral-small-latest",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: prompt }
        ],
        temperature: 0.7,
      });

      const messageContent = response.choices[0]?.message?.content;
      // Handle both string and ContentChunk[] types
      let content = "";
      if (typeof messageContent === "string") {
        content = messageContent;
      } else if (Array.isArray(messageContent)) {
        content = messageContent
          .map(chunk => {
            if (typeof chunk === "string") return chunk;
            if (chunk && typeof chunk === "object" && "text" in chunk) {
              return String(chunk.text);
            }
            return "";
          })
          .join("");
      }
      
      // Try to parse JSON from the response
      let result;
      try {
        // Extract JSON from markdown code blocks if present
        const jsonMatch = content.match(/```(?:json)?\s*(\{[\s\S]*\})\s*```/) || 
                         content.match(/(\{[\s\S]*\})/);
        const jsonStr = jsonMatch ? jsonMatch[1] : content;
        result = JSON.parse(jsonStr);
      } catch (parseError) {
        // If parsing fails, return a structured response
        result = {
          classes: "",
          suggestions: [content],
          raw: content
        };
      }

      res.json({
        success: true,
        data: result
      });
    } catch (error: any) {
      console.error("AI Edit Error:", error);
      res.status(500).json({ 
        error: "Failed to process AI request",
        message: error.message 
      });
    }
  });

  return httpServer;
}
