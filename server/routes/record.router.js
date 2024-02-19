const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get("/", (req, res) => {
    const query = `
      SELECT * FROM "albums"
      WHERE user_id = 1
        ORDER BY "id" DESC;
    `;
    pool
      .query(query)
      .then((result) => {
        res.send(result.rows);
      })
      .catch((err) => {
        console.error("ERROR: Get a user's albums", err);
        res.sendStatus(500);
      });
  });

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;
