import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const root = path.join(__dirname, "miniapp");
const port = Number(process.env.PORT || 5173);

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
};

function safeJoin(base, target) {
  const targetPath = path.normalize(path.join(base, target));
  if (!targetPath.startsWith(base)) return null;
  return targetPath;
}

const server = http.createServer((req, res) => {
  try {
    const url = new URL(req.url ?? "/", `http://${req.headers.host ?? "localhost"}`);
    const pathname = url.pathname === "/" ? "/index.html" : url.pathname;
    const filePath = safeJoin(root, pathname);
    if (!filePath) {
      res.writeHead(400);
      res.end("Bad request");
      return;
    }

    if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
      res.writeHead(404);
      res.end("Not found");
      return;
    }

    const ext = path.extname(filePath);
    res.writeHead(200, { "content-type": MIME[ext] ?? "application/octet-stream" });
    fs.createReadStream(filePath).pipe(res);
  } catch {
    res.writeHead(500);
    res.end("Server error");
  }
});

server.listen(port, () => {
  console.log(`MiniApp 本地预览： http://localhost:${port}/`);
  console.log("注意：Telegram MiniApp 正式使用需要 HTTPS 公网域名。");
});



