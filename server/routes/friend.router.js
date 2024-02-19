const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get("/", (req, res) => {
    const query = `
      SELECT * FROM "friends"
      WHERE user_id = $1
        ORDER BY "id" DESC;
    `;
    pool
      .query(query, [req.user.id])
      .then((result) => {
        res.send(result.rows);
      })
      .catch((err) => {
        console.error("ERROR: Get a user's friends", err);
        res.sendStatus(500);
      });
  });

  router.post("/", (req, res) => {
    console.log(req.body);
    const insertFriendQuery = `
  INSERT INTO "friends"
  ("user_id", "friend")
  VALUES
  ($1, $2)
  `;
    const insertFriendValues = [req.body];
    pool
      .query(insertFriendQuery, [insertFriendValues])
      //   above query param needs a check
      .then((result) => {
        res.send(result.rows);
      })
      .catch((err) => {
        console.error("ERROR: POSTing a friendship", err);
        res.sendStatus(500);
      });
  });

router.delete("/:id", (req, res) => {
    pool
      .query('DELETE FROM "friends" WHERE user_id=$1 AND friend=$2', [req.user.id, req.params.id])
      .then((result) => {
        res.sendStatus(200);
      })
      .catch((err) => {
        console.error("Error in DELETE a friend", err);
        res.sendStatus(500);
      });
  });

module.exports = router;
