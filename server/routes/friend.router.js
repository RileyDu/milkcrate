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

//GET ALL FRIENDS RECORDS AND SORT BY DATE_ADDED [HOTP]
router.get("/hotp", rejectUnauthenticated, (req, res) => {
  const query = `
  SELECT albums.*, usr.username
  FROM albums
  JOIN (
      SELECT user_id AS friend_id
      FROM friends
      WHERE user_id = $1
      UNION
      SELECT friend_id
      FROM friends
      WHERE user_id = $1
      UNION SELECT $1 AS friend_id -- Include the user's own id to fetch their records as well
  ) AS user_friends ON albums.user_id = user_friends.friend_id
  JOIN "user" usr ON albums.user_id = usr.id
  ORDER BY albums.date_added DESC
  LIMIT 48;
    `;
  pool
    .query(query, [req.user.id])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.error("ERROR: Get HOTP", err);
      res.sendStatus(500);
    });
});

router.get("/latestListens", rejectUnauthenticated, (req, res) => {
  const query = `
  SELECT albums.*, usr.username
  FROM albums
  JOIN (
      SELECT user_id AS friend_id
      FROM friends
      WHERE user_id = $1
      UNION
      SELECT friend_id
      FROM friends
      WHERE user_id = $1
      UNION SELECT $1 AS friend_id -- Include the user's own id to fetch their records as well
  ) AS user_friends ON albums.user_id = user_friends.friend_id
  JOIN "user" usr ON albums.user_id = usr.id
  ORDER BY albums.date_added DESC
  LIMIT 48;
    `;
  pool
    .query(query, [req.user.id])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.error("ERROR: Get Latest Listens", err);
      res.sendStatus(500);
    });
});

//GET albums from friend's milkcrate W/SEARCH params
router.get("/friends/collection/search", rejectUnauthenticated, (req, res) => {
  const searchTerm = `%${req.query.search}%`;
  const query = `
  SELECT *
  FROM "albums"
  WHERE
  ("title" ILIKE $1
  OR "artist" ILIKE $1
  OR "tags" ILIKE $1)
  AND "user_id" = $2
    `;
  pool
    .query(query, [searchTerm, req.query.id])
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
  const friendName = req.body.friend_username;
  console.log("friendName", friendName);
  // Query to retrieve the friend's ID based on the username
  const findFriendQuery = `
    SELECT "id" FROM "user" WHERE "username" = $1
  `;

  pool
    .query(findFriendQuery, [friendName])
    .then(({ rows: friendRows }) => {
      console.log("friendrows:", friendRows);
      const friendId = friendRows[0].id;

      const insertFriendQuery = `
        INSERT INTO "friends" ("user_id", "friend_id", "friend_username")
        VALUES ($1, $2, $3)
      `;

      const insertFriendValues = [req.user.id, friendId, friendName];

      return pool.query(insertFriendQuery, insertFriendValues);
    })
    .then(() => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.error("ERROR: POSTing a friendship", error);
      res.sendStatus(500);
    });
});

// DELETE a friendship
router.delete("/:id", (req, res) => {
  pool
    .query('DELETE FROM "friends" WHERE user_id=$1 AND friend_id=$2', [
      req.user.id,
      req.params.id,
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
