import Database from "better-sqlite3";
import { printResults } from "./listUnverified.js";

const DB_NAME = "bast.db";

const db = new Database(DB_NAME);

const records = db.prepare("SELECT * FROM verified_list").all();

printResults(records);
