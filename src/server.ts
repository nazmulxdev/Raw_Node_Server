import http, { IncomingMessage, Server, ServerResponse } from "http";
import { config } from "./config/index.ts";
const server: Server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    console.log("Server is running ...");
    if (req.url == "/" && req.method == "GET") {
      res.writeHead(200, {
        "content-type": "application/json",
      });
      res.end(
        JSON.stringify({
          message: "Hello from nodejs with typescript",
          path: req.url,
        }),
      );
    }

    // get request
    if (req.url === "/api" && req.method === "GET") {
      res.writeHead(200, { "content-type": "application/json" });
      res.end(
        JSON.stringify({
          message: "Health status ok",
          path: req.url,
        }),
      );
    }

    // post request

    if (req.url === "/api/users" && req.method === "POST") {
      let body = "";
      // listen for data chunk
      req.on("data", (chunk) => {
        body += chunk.toString();
      });

      req.on("end", () => {
        try {
          const data = JSON.parse(body);
          console.log("Received Data : ", data);

          res.writeHead(200, { "content-type": "application/json" });
          res.end(JSON.stringify({ message: "processing..", data }));
        } catch (error) {
          console.log(error);
        }
      });
    }
  },
);

server.listen(config.port, () => {
  console.log(`server is running on port ${config.port}`);
});
