import * as mongodb from "mongodb";
const MongoClient = mongodb.MongoClient;

let connection, db;

export default async function makeDb() {
  connection =
    connection ||
    (await MongoClient.connect(globalThis.__MONGO_URI__, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }));
  db = db || (await connection.db(globalThis.__MONGO_DB_NAME__));
  return db;
}

export async function closeDb() {
  if (connection) await connection.close();
  if (db) await db.close();
}

export async function clearDb() {
  await db.collection("comments").deleteMany({});
  return true;
}

export { connection, db };
