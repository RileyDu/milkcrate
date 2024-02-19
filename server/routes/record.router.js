const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get("/", (req, res) => {
    const query = `
      SELECT * FROM "albums"
      WHERE user_id = $1
        ORDER BY "id" DESC;
    `;
    pool
      .query(query, [req.user.id])
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

router.put("/:id", (req, res) => {
    const updatedRecord = req.body;
    console.log('updated record contenets', req.body);
    // req.body should contain the data needed for PUT
    const queryText = `
      UPDATE "album"
        SET 
          "title"=$1,
          "artist"=$2,
          "mood"=$3,
          "details"=$4
        WHERE
          "id"=$5;
    `;
    const queryValues = [updatedRecord.title, updatedRecord.artists, updatedRecord.mood, updatedRecord.details, updatedRecord.id];
    pool
      .query(queryText, queryValues)
      .then((result) => {
        res.sendStatus(200);
      })
      .catch((err) => {
        console.error("Error in PUT /api/record/:id", err);
        res.sendStatus(500);
      });
  });

router.delete("/:id", (req, res) => {
    pool
      .query('DELETE FROM "albums" WHERE id=$1', [req.params.id])
      .then((result) => {
        res.sendStatus(200);
      })
      .catch((err) => {
        console.error("Error in DELETE an album", err);
        res.sendStatus(500);
      });
  });

module.exports = router;
