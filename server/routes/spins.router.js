const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');


// GET all of a user's spins session from db
router.get("/", rejectUnauthenticated, (req, res) => {
  const query = `
      SELECT * FROM "spins"
      WHERE user_id = $1
    ORDER BY id DESC;
    `;
  pool
    .query(query, [req.user.id])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.error("ERROR: Get a user's spins", err);
      res.sendStatus(500);
    });
});

// GET a specific spins details
router.get("/single", rejectUnauthenticated, (req, res) => {
  const query = `
      SELECT * FROM "spins"
      INNER JOIN "spin_albums" on spins.id=spin_albums.spin_id
      INNER JOIN "albums" on spin_albums.album_id=albums.id
      WHERE spins.id = $1
    `;
    console.log(req.query.id);
  pool
    .query(query, [req.query.id])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.error("ERROR: Get a user's spins", err);
      res.sendStatus(500);
    });
});

// POST a spin session through AddSpinForm
router.post("/add", rejectUnauthenticated, (req, res) => {
    console.log(req.body);
  
    const insertSpinQuery = `
      INSERT INTO "spins"
        ("time_spent", "details", "listened_at", "user_id")
      VALUES
        ($1, $2, $3, $4)
      RETURNING id
    `;
  
    const insertSpinValues = [
      req.body.timeSpent,
      req.body.details,
      req.body.listenedAt,
      req.user.id,
    ];
  
    pool
      .query(insertSpinQuery, insertSpinValues)
      .then((spinResult) => {
        const spinId = spinResult.rows[0].id;
  
        const insertSpinAlbumsQuery = `
          INSERT INTO "spin_albums" ("spin_id", "album_id")
          VALUES 
            ${req.body.albums.map((albumId) => `(${spinId}, ${albumId})`).join(',')}
        `;
  
        return pool.query(insertSpinAlbumsQuery);
      })
      .then(() => {
        res.sendStatus(201);
      })
      .catch((err) => {
        console.error("ERROR: POSTing a user's spins", err);
        res.sendStatus(500);
      });
  });
  

module.exports = router;
