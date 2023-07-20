import { executeTransaction } from "./db.js";

/*  Schema
 *
 *  Each document has:
 *    - An integer ID
 *    - A title
 *    - An endpoint derived from its file path in /docs
 *    - Body text in utf-8 markdown
 *    - Optional comma-delimited tags
 */

const createDb = () => executeTransaction(`CREATE TABLE IF NOT EXISTS gamedocs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  body TEXT NULL,
  endpoint TEXT NOT NULL,
  tags TEXT NULL,
  title TEXT NULL
)`);

export default createDb;
