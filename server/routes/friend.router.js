const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');

// GET all of a user's friends
router.get("/", rejectUnauthenticated, (req, res) => {
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

// GET a friend's collection
  router.get("/", rejectUnauthenticated, (req, res) => {
    const query = `
      SELECT * FROM "albums"
      WHERE user_id = $1
        ORDER BY "id" DESC;
    `;
    pool
      .query(query, [req.body.id])
      .then((result) => {
        res.send(result.rows);
      })
      .catch((err) => {
        console.error("ERROR: Get a user's albums", err);
        res.sendStatus(500);
      });
  });

  //GET albums from friend's milkcrate W/SEARCH params
router.get("/", rejectUnauthenticated,  (req, res) => {
    const query = `
    SELECT *
    FROM "albums"
    WHERE
        "title" % $1
        OR "artist" % $1
        OR "tags" % $1
        OR CAST("mood" AS TEXT) % $1;
    `;
    pool
      .query(query, [req.params])
      .then((result) => {
        res.send(result.rows);
      })
      .catch((err) => {
        console.error("ERROR: seaching user's milkcrate", err);
        res.sendStatus(500);
      });
  });

  // POST a new frienship
  router.post("/", rejectUnauthenticated, (req, res) => {
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


// DELETE a friendship
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
