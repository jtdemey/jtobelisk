import Database from "better-sqlite3";
import { nanoid } from "nanoid";

const makeResponse = (response, isError) => ({ isError, response });

export let db;

export const createEmailList = (
  dbName,
  router,
  subscribeEndpoint,
  unsubscribeEndpoint,
  verifyEndpoint,
) => {
  db = new Database(`${dbName}.db`);

  db.exec(`CREATE TABLE IF NOT EXISTS unverified_list (
    email TEXT NOT NULL,
    added_at DATE DEFAULT (datetime('now')),
    verification_code TEXT NOT NULL
  )`);
  db.exec(`CREATE TABLE IF NOT EXISTS verified_list (
    email TEXT NOT NULL,
    unsubscribe_code NOT NULL,
    verified_at DATE DEFAULT (datetime('now'))
  )`);

  router.route(subscribeEndpoint).post((req, res) => {
    if (!req.body?.email) {
      res.status(400).json(makeResponse("INVALID_EMAIL", true));
      return;
    }
    const incomingEmail = req.body.email;

    const emailRegex = /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/gm;
    if (!emailRegex.test(incomingEmail)) {
      console.log("regex");
      res.status(400).json(makeResponse("INVALID_EMAIL", true));
      return;
    }
    console.log("regex pass");

    const getMatchingRecords = db.prepare(
      "SELECT email FROM unverified_list WHERE email = ?",
    );
    const matchingEmail = getMatchingRecords.get(incomingEmail);
    if (matchingEmail) {
      console.log("match");
      console.log(matchingEmail);
      res.status(400).json(makeResponse("REDUNDANT_EMAIL", true));
      return;
    }

    const insertRecord = db.prepare(
      "INSERT INTO verified_list (email, verification_code) VALUES (?, ?, ?)",
    );
    insertRecord.run(incomingEmail, nanoid(48));
    console.log("ins");
    res.status(200).json(makeResponse("SUBSCRIBE", false));
  });

/*
  router.route(verifyEndpoint).get((req, res) => {
    if (!req.query?.email || !req.query?.verification_code) {
      res.status(400).json(makeResponse("INVALID_VERIFICATION", true));
      return;
    }

    // Process verification
    const getVerificationCode = db.prepare("SELECT verification_code FROM unverified_list WHERE email = ?");
    const matchingVerificationCode = getVerificationCode.run(req.query.email);
    if (!matchingVerificationCode) {
      res.status(400).json(makeResponse("INVALID_VERIFICATION", true));
      return;
    }

    res.status(200).json(makeResponse("VERIFY", false));
  });
*/

  router.route(unsubscribeEndpoint).get((req, res) => {
    if (!req.query?.unsubscribe_code) {
      res.status(400).json(makeResponse("INVALID_UNSUBSCRIBE", true));
    }

    res.status(200).json({
      isError: false,
      response: "UNSUBSCRIBE",
    });
  });
};
