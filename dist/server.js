import http, { IncomingMessage, Server, ServerResponse } from "http";
import { config } from "./config/index.ts";
const server = http.createServer((req, res) => {
    console.log("Server is running ...");
    if (req.url == "/" && req.method == "GET") {
        res.writeHead(200, {
            "content-type": "application/json",
        });
        res.end(JSON.stringify({
            message: "Hello from nodejs with typescript",
            path: req.url,
        }));
    }
});
server.listen(config.port, () => {
    console.log(`server is running on port ${config.port}`);
});
