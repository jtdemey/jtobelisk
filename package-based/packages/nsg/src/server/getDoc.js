import db from "./db.js";

const getDoc = endpoint => {
  const doc = db.prepare("SELECT * FROM docs WHERE endpoint = ?").get(endpoint);
  return doc;
};

export default getDoc;
