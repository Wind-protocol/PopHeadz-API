/**
 * Module handles database management
 *
 * The sample data is for a chat log with one table:
 * Messages: id + message text
 */

const fs = require("fs");
const dbFile = "./.data/popheadz.db";
const exists = fs.existsSync(dbFile);
const sqlite3 = require("sqlite3").verbose();
const dbWrapper = require("sqlite");
const casual = require("casual");
let db;

//SQLite wrapper for async / await connections https://www.npmjs.com/package/sqlite
dbWrapper
  .open({
    filename: dbFile,
    driver: sqlite3.Database
  })
  .then(async dBase => {
    db = dBase;
  });

// Server script calls these methods to connect to the db
module.exports = {
  
  // Get the messages in the database
  getHeadz: async () => {
    try {
      return await db.all("SELECT * from popheadz");
    } catch (dbError) {
      console.error(dbError);
    }
  },
  getHead: async (number) => {
    try {
      console.log(`SELECT * from popheadz WHERE name = "POPHEADZ # ${number}"`)
      return await db.all(`SELECT * from popheadz WHERE name = "POPHEADZ #${number}"`);
    } catch (dbError) {
      console.error(dbError);
    }
  }

};
