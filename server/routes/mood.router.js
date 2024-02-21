const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

router.get("/", rejectUnauthenticated, (req, res) => {
  const query = `
    SELECT * FROM "moods"
    ORDER BY id ASC;
      `;
  pool
    .query(query)
    .then((result) => {
      console.log("moods result:", result.rows);
      res.send(result.rows);
    })
    .catch((err) => {
      console.error("ERROR: Get all moods", err);
      res.sendStatus(500);
    });
});

module.exports = router;
