const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();


// GET all of a user's spins session from db
router.get("/", (req, res) => {
  const query = `
      SELECT * FROM "spins"
      INNER JOIN "albums" ON spins.album_id = albums.id
      WHERE user_id = $1
    ORDER BY spins.id DESC;
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
router.get("/", (req, res) => {
  const query = `
      SELECT * FROM "spins"
      WHERE id = $1
    `;
  pool
    .query(query, [req.body.id])
    //   above query param needs a check
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.error("ERROR: Get a user's spins", err);
      res.sendStatus(500);
    });
});

// POST a spin session through AddSpinForm
router.post("/", (req, res) => {
  console.log(req.body);
  const insertSpinQuery = `
INSERT INTO "spins"
("time_spent", "album_id", "details", "listened_at")
VALUES
($1, $2, $3, $4)
`;
  const insertSpinValues = [req.body];
  pool
    .query(insertSpinQuery, [insertSpinValues])
    //   above query param needs a check
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.error("ERROR: POSTing a user's spins", err);
      res.sendStatus(500);
    });
  // NEED TO FIGURE OUT HOW TO DEAL WITH MULTIPLE ALBUMS IN A SPIN SESH
});

module.exports = router;
