const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

router.get("/", rejectUnauthenticated, (req, res) => {
    const query = `
      SELECT * FROM "albums"
      WHERE user_id = $1
        ORDER BY RANDOM()
        LIMIT 1;
    `;
    pool
      .query(query, [req.user.id])
      .then((result) => {
        res.send(result.rows[0]);
      })
      .catch((err) => {
        console.error("ERROR: Get a user's albums", err);
        res.sendStatus(500);
      });
  });



module.exports = router;
