import Database from "better-sqlite3";

export const removeNewlines = input => input;

const db = new Database("nsg.db", { verbose: console.log });
db.pragma("journal_mode = WAL");

export const executeTransaction = (query, entity) => {
  const statement = db.prepare(query.replace(/[\r\n]+/g, ""));
  const transaction = db.transaction(() =>
    entity ? statement.run(entity) : statement.run()
  );
  transaction();
};

export default db;
