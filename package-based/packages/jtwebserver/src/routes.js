import express from "express";
import path from "path";
import dotenv from "dotenv";

dotenv.config({
  silent: true,
});

const router = express.Router();
const isProd = process.env.NODE_ENV === "production";

const ROUTES = [
  ["/", "home"],
  "/home",
  "/software",
  "/media",
  "/contact",
  "/meeting-minutes",
  "/poems",
  "/things-to-know",
  /*
  "/civildawn",
  "civildawn",
  "/imposter",
  "imposter",
  "/imposter/:gameCode",
  "imposter",
  "/meyhemn",
  "meyhemn",
  "/rollfighter",
  "rollfighter",
  "/sandbox",
  "sandbox",
  "/devtut",
  "devtut",
  */
];

const sendHtmlFile = (res, fileName) => {
  if (isProd) {
    res.sendFile(path.join(process.cwd(), "dist", fileName));
    return;
  }
  res.sendFile(path.join(process.cwd(), "src", "pages", fileName));
};

const routeHtml = (endpoint, fileName = undefined) =>
  router.route(endpoint).get((_, res) => {
    sendHtmlFile(
      res,
      `${fileName ? fileName : endpoint.replace("/", "")}.html`,
    );
  });

ROUTES.forEach((route) =>
  Array.isArray(route) ? routeHtml(route[0], route[1]) : routeHtml(route),
);

export default router;
