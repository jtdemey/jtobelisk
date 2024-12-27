import express from "express";
import path from "path";

const router = express.Router();

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
  "/bast",
  ["/bel-air-strong-towns", "bast"],
  ["/belairstrongtowns", "bast"],
  ["/bast/welcome", "bast_welcome"],
  "/civildawn",
  "/imposter",
  "/imposter/:gameCode",
  "/meyhemn",
  "/rollfighter",
  "/sandbox",
  */
];

const sendHtmlFile = (res, fileName) => {
  res.sendFile(path.join(process.cwd(), "dist", fileName));
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
