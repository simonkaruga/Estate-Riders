// server.js
import jsonServer from "json-server";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, "db.json"));
const middlewares = jsonServer.defaults({
  static: path.join(__dirname, "public"), // avoids ENOENT public error
});

const PORT = process.env.PORT || 3001;

server.use(middlewares);
server.use(jsonServer.bodyParser);
server.use("/api", router); // endpoint e.g., /api/users, /api/bookings

server.listen(PORT, () => {
  console.log(` JSON Server running on port ${PORT}`);
});
