import { ServerResponse } from "http";

export default function sendJson(
  res: ServerResponse,
  status: number,
  data: unknown,
) {
  res.writeHead(status, {
    "content-type": "application/json",
  });
  res.end(JSON.stringify(data));
}
