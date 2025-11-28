import http, { IncomingMessage, Server, ServerResponse } from "http";
import { config } from "./config/index.ts";
import addRoutes, { RouteHandler } from "./healpers/RouteHandler.ts";
import { routes } from "./healpers/RouteHandler.ts";

import "./routes/index.ts";

// root route
// addRoutes("GET", "/", (req, res) => {
//   res.writeHead(200, {
//     "content-type": "application/json",
//   });
//   res.end(
//     JSON.stringify({
//       message: "Hello from nodejs with typescript",
//       path: req.url,
//     }),
//   );
// });

// api routes
// addRoutes("GET", "/api", (req, res) => {
//   res.writeHead(200, { "content-type": "application/json" });
//   res.end(
//     JSON.stringify({
//       message: "Health status ok",
//       path: req.url,
//     }),
//   );
// });

const server: Server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    console.log("Server is running ...");
    const method = req.method?.toUpperCase() || "";
    const path = req.url || "";
    const methodMap = routes.get(method);

    const handler: RouteHandler | undefined = methodMap!.get(path);

    if (handler) {
      handler(req, res);
    } else {
      res.writeHead(404, { "content-type": "application/json" });
      res.end(
        JSON.stringify({
          message: "Route not found.",
          success: false,
          path,
        }),
      );
    }

    // if (req.url == "/" && req.method == "GET") {
    //   res.writeHead(200, {
    //     "content-type": "application/json",
    //   });
    //   res.end(
    //     JSON.stringify({
    //       message: "Hello from nodejs with typescript",
    //       path: req.url,
    //     }),
    //   );
    // }

    // root rote using custom function

    // // get request
    // if (req.url === "/api" && req.method === "GET") {
    //   res.writeHead(200, { "content-type": "application/json" });
    //   res.end(
    //     JSON.stringify({
    //       message: "Health status ok",
    //       path: req.url,
    //     }),
    //   );
    // }

    // // post request

    // if (req.url === "/api/users" && req.method === "POST") {
    //   let body = "";
    //   // listen for data chunk
    //   req.on("data", (chunk) => {
    //     body += chunk.toString();
    //   });

    //   req.on("end", () => {
    //     try {
    //       const data = JSON.parse(body);
    //       console.log("Received Data : ", data);

    //       res.writeHead(200, { "content-type": "application/json" });
    //       res.end(JSON.stringify({ message: "processing..", data }));
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   });
    // }
  },
);

server.listen(config.port, () => {
  console.log(`server is running on port ${config.port}`);
});
