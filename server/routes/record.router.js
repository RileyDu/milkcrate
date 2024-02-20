const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const LAST_FM_API_KEY = process.env.LAST_FM_API_KEY;
const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');

//GET the user's milkcrate
router.get("/", rejectUnauthenticated, (req, res) => {
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

//POST the form data & last.fm response [API CALL HERE]
router.post("/", rejectUnauthenticated, (req, res) => {
  const albumTitle = req.query.albumTitle;
  const albumArtist = req.query.albumArtist;
  const albumMood = req.query.albumMood;
  const albumDetails = req.query.albumDetails;
  // console.log(`http://ws.audioscrobbler.com/2.0/?api_key=${LAST_FM_API_KEY}&format=json&method=album.getinfo&artist=${albumArtist}&album=${albumTitle}`);
  axios
    .get(
      `http://ws.audioscrobbler.com/2.0/?api_key=${LAST_FM_API_KEY}&format=json&method=album.getinfo&artist=${albumArtist}&album=${albumTitle}&autocorrect=1`
    )
    .then((response) => {
      // POST THIS TO THE DB VVV
      const finalAlbumTitle = response.data.album.name;
      const finalArtist = response.data.album.artists;
      const finalCoverArt = response.data.album.image[4]["#text"];
      const finalTags = response.data.album.tags;
      // .tags is an array of 5 usually...hmmm....
      const finalMood = albumMood;
      // not really needed ^^^
      const finalDetails = albumDetails;
      // not really needed ^^^
      // POST TO DB WITH FORM DATA (ALBUM MOOD AND DETAILS ONLY) AND LAST.FM OBJECT (COVER ART, ARTIST, ALBUM AND TAGS)
    });
  const insertRecordQuery = `
      INSERT INTO "albums" 
      ("title", "artist", "coverart", "tags","mood","details")
      VALUES
      ($1, $2, $3, $4, $5, $6)
      `;
  const insertRecordValues = [
    finalAlbumTitle,
    finalArtist,
    finalCoverArt,
    finalTags,
    finalMood,
    finalDetails
  ];
  pool.query(insertRecordQuery, insertRecordValues).catch((err) => {
    res.sendStatus(500);
  });
});

//GET albums from milkcrate W/SEARCH params
router.get("/", rejectUnauthenticated, (req, res) => {
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

//PUT the new details of a record into the db
router.put("/:id", rejectUnauthenticated, (req, res) => {
  const updatedRecord = req.body;
  console.log("updated record contenets", req.body);
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
  const queryValues = [
    updatedRecord.title,
    updatedRecord.artists,
    updatedRecord.mood,
    updatedRecord.details,
    updatedRecord.id,
  ];
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

// DELETE a selected record
router.delete("/:id", rejectUnauthenticated, (req, res) => {
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
