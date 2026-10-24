const http = require("http");
const os = require("os");

const PORT = 3000;

const users = [
  { id: 1, name: "Ahmed", role: "admin" },
  { id: 2, name: "Sara", role: "user" },
  { id: 3, name: "Omar", role: "user" },
];


function sendJson(res, statusCode, data) {
  const body = JSON.stringify(data);
  res.writeHead(statusCode, {
    "Content-Type": "application/json",
    "Content-Length": Buffer.byteLength(body),
  });
  res.end(body);
}

const server = http.createServer((req, res) => {
  
  const path = req.url.split("?")[0];
  console.log(`${req.method} ${path}`);

  if (req.method === "GET" && path === "/") {
    return sendJson(res, 200, {
      message: "Welcome to the raw Node.js server",
      endpoints: ["/api/users", "/api/health"],
    });
  }

  if (req.method === "GET" && path === "/api/users") {
    return sendJson(res, 200, { count: users.length, users });
  }

  
  if (req.method === "GET" && path === "/api/health") {
    return sendJson(res, 200, {
      status: "ok",
      uptimeSeconds: process.uptime(),
      platform: os.platform(),
      timestamp: new Date().toISOString(),
    });
  }

  
  sendJson(res, 404, { error: "Not Found", path });
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});