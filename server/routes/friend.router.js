const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

// GET all of a user's friends
router.get("/friends", rejectUnauthenticated, (req, res) => {
  const query = `
  SELECT 
  friends.id AS friendship_id, 
  friends.user_id AS user_id, 
  "user".username AS user_username,
  friends.friend_username AS friend_username,
  friends.friend_id
FROM "friends"
INNER JOIN "user" ON friends.user_id = "user".id
WHERE friends.user_id = $1
ORDER BY friends.id DESC;
    `;
  pool
    .query(query, [req.user.id])
    .then((result) => {
      console.log("Friends result:", result.rows);
      res.send(result.rows);
    })
    .catch((err) => {
      console.error("ERROR: Get a user's friends", err);
      res.sendStatus(500);
    });
});

// GET a friend's collection
router.get("/friends/collection", rejectUnauthenticated, (req, res) => {
  const query = `
      SELECT * FROM "albums"
      WHERE user_id = $1
        ORDER BY "id" DESC;
    `;
  pool
    .query(query, [req.query.id])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.error("ERROR: Get a user's albums", err);
      res.sendStatus(500);
    });
});

//GET albums from friend's milkcrate W/SEARCH params
router.get("/friends/collection/search", rejectUnauthenticated, (req, res) => {
  const query = `
    SELECT *
    FROM "albums"
    WHERE user_id = $1
    WHERE
        "title" % $1
        OR "artist" % $1
        OR "tags" % $1
        OR CAST("mood" AS TEXT) % $1;
    `;
  pool
    .query(query, [req.body.id, req.params])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.error("ERROR: seaching user's milkcrate", err);
      res.sendStatus(500);
    });
});

// POST a new frienship
router.post("/add", rejectUnauthenticated, (req, res) => {
  console.log(req.body);
  const insertFriendQuery = `
  INSERT INTO "friends"
  ("user_id", "friend_username")
  VALUES
  ($1, $2)
  `;
  const insertFriendValues = [req.user.id, req.body.friendName];
  pool
    .query(insertFriendQuery, insertFriendValues)
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
router.delete("/delete", (req, res) => {
  pool
    .query('DELETE FROM "friends" WHERE user_id=$1 AND friend_username=$2', [
      req.user.id,
      req.body.friendName,
    ])
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.error("Error in DELETE a friend", err);
      res.sendStatus(500);
    });
});

module.exports = router;
