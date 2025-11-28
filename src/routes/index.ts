import addRoutes from "../healpers/RouteHandler.ts";
import sendJson from "../healpers/sendJson.ts";

addRoutes("GET", "/api", (req, res) => {
  sendJson(res, 200, {
    message: "Health status ok",
    path: req.url,
  });
});

addRoutes("GET", "/", (req, res) => {
  sendJson(res, 200, {
    message: "Hello from nodejs with typescript",
    path: req.url,
  });
});

addRoutes("GET", "/logs", (req, res) => {
  sendJson(res, 200, {
    message: "This is from route logs",
    path: req.url,
  });
});
