import Database from "better-sqlite3";

const DB_NAME = "bast.db";

const db = new Database(DB_NAME);

const records = db.prepare("SELECT * FROM unverified_list").all();

export const printResults = (results) => {
  if (!results.length) {
    process.stdout.write("No records found\n");
    return;
  }

  results.forEach((record) => {
    Object.keys(record).forEach((property) => {
      process.stdout.write(`${property}: ${record[property]}\n`);
    });
    process.stdout.write("\n");
  });
};

printResults(records);
