import express from "express";
import path from "path";
import dotenv from "dotenv";

dotenv.config({
  silent: true,
});

const router = express.Router();
const isProd = process.env.NODE_ENV === "production";

const sendHtmlFile = (res, fileName) => {
  if (isProd) {
    res.sendFile(path.join(process.cwd(), "dist", fileName));
    return;
  }
  res.sendFile(path.join(process.cwd(), "src", "pages", fileName));
};

const routeHtml = (endpoint, fileName) =>
  router.route(endpoint).get((_, res) => {
    sendHtmlFile(res, `${fileName}.html`);
  });

routeHtml("/", "home");
routeHtml("/about", "about");
routeHtml("/doodles", "doodles");
routeHtml("/civildawn", "civildawn");

/*
routeHtml('/imposter', 'imposter');
routeHtml('/imposter/:gameCode', 'imposter');
routeHtml('/meyhemn', 'meyhemn');
routeHtml('/rollfighter', 'rollfighter');
routeHtml('/sandbox', 'sandbox');
routeHtml('/devtut', 'devtut');
*/

export default router;
