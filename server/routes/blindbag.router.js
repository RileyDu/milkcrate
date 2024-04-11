const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

router.get("/", rejectUnauthenticated, (req, res) => {
  const searchTerm = req.query.search ? `%${req.query.search}%` : null;
  let query;
  const params = [req.user.id];

  if (searchTerm) {
    // Filtered query
    query = `
      SELECT albums.*, moods.mood
      FROM albums
      JOIN moods ON albums.mood = moods.id
      WHERE
        (albums.title ILIKE $2
         OR albums.artist ILIKE $2
         OR albums.tags ILIKE $2
         OR moods.mood ILIKE $2)
        AND albums.user_id = $1
      ORDER BY RANDOM()
      LIMIT 1;
    `;
    params.push(searchTerm);
  } else {
    // Random album query
    query = `
      SELECT * FROM "albums"
      WHERE user_id = $1
      ORDER BY RANDOM()
      LIMIT 1;
    `;
  }

  pool
    .query(query, params)
    .then((result) => {
      res.send(result.rows[0]);
    })
    .catch((err) => {
      console.error("ERROR: Fetching albums", err);
      res.sendStatus(500);
    });
});



module.exports = router;
