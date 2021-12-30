const Pool = require("pg").Pool;

// const pool = new Pool({
//   user: "root",
//   password: "root",
//   host: "127.0.0.1",
//   port: 5432,
//   database: "GameBase"
// });
const pool = new Pool({
  user: process.env.USER1,
  password: process.env.PASSWORD,
  host: process.env.HOST,
  port: 5432,
  database: process.env.DATABASE,
  ssl: {
    rejectUnauthorized: false,
  }
});

module.exports = pool;