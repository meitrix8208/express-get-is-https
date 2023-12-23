import express from "express";
import { isHTTPS } from "../";
const app = express();
app.enable("trust proxy");
app.use(express.json());

app.get("/url", (req, res) => {
  const { trustProxy } = req.query;
  res.send(
    `is https?: ${isHTTPS(req, { trustProxy: trustProxy !== "false" })}`
  );
});

app.listen(3000, () => {
  console.log("Listening on http://localhost:3000/url"); // eslint-disable-line no-console
});
