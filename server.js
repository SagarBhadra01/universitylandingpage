const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Simple API endpoints
app.get("/api/courses", (req, res) => {
  // Sample course data
  const courses = [
    {
      id: 1,
      name: "Computer Science",
      duration: "4 years",
      description: "Study of computers and computational systems",
    },
    {
      id: 2,
      name: "Business Administration",
      duration: "3 years",
      description: "Study of business operations and management",
    },
    {
      id: 3,
      name: "Mechanical Engineering",
      duration: "4 years",
      description: "Study of design, production, and operation of machinery",
    },
    {
      id: 4,
      name: "Architecture",
      duration: "5 years",
      description: "Study of planning, designing, and constructing buildings",
    },
    {
      id: 5,
      name: "Medicine",
      duration: "6 years",
      description: "Study of diagnosis, treatment, and prevention of disease",
    },
  ];

  res.json(courses);
});

app.post("/api/contact", (req, res) => {
  const { name, email, message } = req.body;

  // In a real app, you'd save this to a database or send an email
  console.log("Contact form submission:", { name, email, message });

  res.json({
    success: true,
    message: "Thank you for your message! We will get back to you soon.",
  });
});

// Fallback route for SPA (if needed in the future)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Start server
app.listen(PORT, () => {
  console.log(`╔═══════════════════════════════════════════════════════════╗`);
  console.log(`║                                                           ║`);
  console.log(`║   University Landing Page Server Running                  ║`);
  console.log(`║                                                           ║`);
  console.log(
    `║   - Local:            http://localhost:${PORT}                ║`
  );
  console.log(
    `║   - On Your Network:  http://${getLocalIpAddress()}:${PORT}      ║`
  );
  console.log(`║                                                           ║`);
  console.log(`║   Available API Routes:                                   ║`);
  console.log(`║   - GET  /api/courses                                     ║`);
  console.log(`║   - POST /api/contact                                     ║`);
  console.log(`║                                                           ║`);
  console.log(`╚═══════════════════════════════════════════════════════════╝`);
});

// Helper function to get local IP address
function getLocalIpAddress() {
  const { networkInterfaces } = require("os");
  const nets = networkInterfaces();

  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      // Skip over non-IPv4 and internal (loopback) addresses
      if (net.family === "IPv4" && !net.internal) {
        return net.address;
      }
    }
  }

  return "127.0.0.1"; // Default to localhost if no network interface found
}
