const pg = require("pg");
let pool;

// Example of what DATABASE_URL could look like (you get this from your db provider)
// DATABASE_URL=postgresql://jDoe354:secretPw123@some.db.com/db_name?sslmode=require
if (process.env.DATABASE_URL) {
  console.log(`Using cloud database config (DATABASE_URL found)`);
  pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });
} else {
  console.log(`Using local database config (no DATABASE_URL found)`);

  pool = new pg.Pool({
    host: "localhost",
    port: 5432,
    database: "milkcrate",
  });
}
pool.on("connect", () => console.log(`Connected to database`));
pool.on("error", (err) => console.error(`Error connecting to database:`, err));

module.exports = pool;
