const Pool = require("pg").Pool;

// const pool = new Pool({
//   user: "root",
//   password: "root",
//   host: "127.0.0.1",
//   port: 5432,
//   database: "GameBase"
// });
const pool = new Pool({
  user: "omaocqlpebqvwy",
  password: "ff323d431c4c6be56619760c50b91060892468e3f5ac141e6f8a27dd064b8bd9",
  host: "ec2-54-166-192-244.compute-1.amazonaws.com",
  port: 5432,
  database: "d8er7g06k5772l",
  ssl: {
    rejectUnauthorized: false,
  }
//   //ssl: "require",
//   //connectionString:   "postgres://omaocqlpebqvwy:ff323d431c4c6be56619760c50b91060892468e3f5ac141e6f8a27dd064b8bd9@ec2-54-166-192-244.compute-1.amazonaws.com:5432/d8er7g06k5772l",
//   //ssl: true,
});

module.exports = pool;