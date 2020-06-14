const path = require("path");

const fs = require("fs");

const { MongoMemoryServer } = require("mongodb-memory-server");

const globalConfigPath = path.join("/tmp", "globalConfigMongo.json");

const mongod =
  globalThis.__MONGOD__ ||
  new MongoMemoryServer({
    autoStart: false,
  });

// TODO: handle forgotten edge cases
// process.on("unhandledRejection", (reason, promise) => {
//   console.error("Unhandled Rejection at:", promise, "reason:", reason);
// });

// process.on("uncaughtExceptionMonitor", (error, origin) => {
//   console.error(error, origin);
// });

module.exports = async () => {
  if (!mongod.runningInstance) {
    await mongod.start();
  }

  const mongoConfig = {
    mongoDBName: "jest",
    mongoUri: await mongod.getConnectionString(),
  };

  // Write global config to disk because all tests run in different contexts.
  fs.writeFileSync(globalConfigPath, JSON.stringify(mongoConfig));

  // Set reference to mongod in order to close the server during teardown.
  globalThis.__MONGOD__ = mongod;
};
