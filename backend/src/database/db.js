const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");

const dbPath = path.join(__dirname, "../bookApp.db");
let db = null;

const initializeDB = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    console.log("Database connected Successfully.");

    
    // Create Books table
    await db.exec(`
      CREATE TABLE IF NOT EXISTS Books (
        BookID TEXT PRIMARY KEY,
        Title TEXT NOT NULL,
        AuthorID TEXT NOT NULL,
        GenreID TEXT NOT NULL,
        Pages INTEGER NOT NULL,
        PublishedDate TEXT NOT NULL,
        FOREIGN KEY (AuthorID) REFERENCES Authors (AuthorID) ON DELETE CASCADE,
        FOREIGN KEY (GenreID) REFERENCES Genres (GenreID) ON DELETE CASCADE
      );
    `);

    // Create Author table
    await db.exec(`
    CREATE TABLE IF NOT EXISTS Authors (
      AuthorID TEXT PRIMARY KEY,
      Name TEXT NOT NULL
    );
  `);

    // Create Genres table
    await db.exec(`
    CREATE TABLE IF NOT EXISTS Genres (
      GenreID TEXT PRIMARY KEY,
      Names TEXT NOT NULL CHECK (json_valid(Names)),
      Description TEXT
    );
  `);

  } catch (error) {
    console.log("DB Error: ", error.message);
  }
};

const getDB = () => {
  if (!db) throw new Error("Database not initialized");
  return db;
};

module.exports = { initializeDB, getDB };
