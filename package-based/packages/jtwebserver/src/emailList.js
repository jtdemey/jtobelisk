import Database from "better-sqlite3";
import { nanoid } from "nanoid";
import logger from "./logger.js";

const MAX_LENGTH = 254;
const MAX_RECORDS = 12000;
export const TEST_EMAIL = "grimace@mcdonaldswifi.net";

const makeResponse = (response, isError) => ({ isError, response });

const createSchema = (database) => {
  database.exec(`CREATE TABLE IF NOT EXISTS unverified_list (
    email TEXT NOT NULL,
    added_at DATE DEFAULT (datetime('now')),
    verification_code TEXT NOT NULL
  )`);
  database.exec(`CREATE TABLE IF NOT EXISTS verified_list (
    email TEXT NOT NULL,
    unsubscribe_code NOT NULL,
    verified_at DATE DEFAULT (datetime('now'))
  )`);
  database
    .prepare("DELETE FROM unverified_list WHERE email = ?")
    .run(TEST_EMAIL);
  database.prepare("DELETE FROM verified_list WHERE email = ?").run(TEST_EMAIL);
};

const validateMaxLength = (str) => str.length > MAX_LENGTH;

export const createEmailList = (
  dbName,
  router,
  subscribeEndpoint,
  unsubscribeEndpoint,
  verifyEndpoint,
) => {
  const db = new Database(`${dbName}.db`);
  createSchema(db);

  // SUBSCRIBE
  router.route(subscribeEndpoint).post((req, res) => {
    if (!req.body?.email || validateMaxLength(req.body.email)) {
      res.status(400).json(makeResponse("INVALID_EMAIL", true));
      return;
    }
    const incomingEmail = req.body.email;

    const emailRegex = /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/gm;
    if (!emailRegex.test(incomingEmail)) {
      res.status(400).json(makeResponse("INVALID_EMAIL", true));
      return;
    }

    const getMatchingRecords = db.prepare(
      "SELECT email FROM unverified_list WHERE email = ?",
    );
    const matchingEmail = getMatchingRecords.get(incomingEmail);
    if (matchingEmail) {
      res.status(400).json(makeResponse("REDUNDANT_EMAIL", true));
      return;
    }

    // Disaster safeguard
    const countRecords = db.prepare(
      "SELECT email FROM unverified_list",
    );
    const allRecords = countRecords.all();
    if (allRecords.length > MAX_RECORDS) {
      res.status(500).json(makeResponse("OVERLOADED", true));
      return;
    }

    const insertRecord = db.prepare(
      "INSERT INTO unverified_list (email, verification_code) VALUES (?, ?)",
    );
    insertRecord.run(incomingEmail, nanoid(48));
    res.status(200).json(makeResponse("SUBSCRIBE", false));
  });

  // UNSUBSCRIBE
  router.route(unsubscribeEndpoint).get((req, res) => {
    if (!req.query?.unsubscribe_code) {
      res.status(400).json(makeResponse("INVALID_UNSUBSCRIBE", true));
    }

    res.status(200).json({
      isError: false,
      response: "UNSUBSCRIBE",
    });
  });

  // VERIFY
  router.route(verifyEndpoint).get((req, res) => {
    if (!req.query?.email || !req.query?.verification_code) {
      res.status(400).json(makeResponse("INVALID_VERIFICATION", true));
      return;
    }

    // Process verification
    const getVerificationCode = db.prepare(
      "SELECT verification_code FROM unverified_list WHERE email = ?",
    );
    const matchingVerificationCode = getVerificationCode.run(req.query.email);
    if (!matchingVerificationCode) {
      res.status(400).json(makeResponse("INVALID_VERIFICATION", true));
      return;
    }

    const checkVerifiedRecords = db.prepare(
      "SELECT verification_code FROM verified_list WHERE email = ?",
    );
    const alreadyVerifiedRecord = checkVerifiedRecords.run(req.query.email);
    if (alreadyVerifiedRecord) {
      res.status(400).json(makeResponse("REDUNDANT_VERIFICATION", true));
      return;
    }

    res.status(200).json(makeResponse("VERIFY", false));
  });

  logger.info(`Email list enabled (using ${dbName}.db)`);
  return db;
};

