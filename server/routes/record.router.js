const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const LAST_FM_API_KEY = process.env.LAST_FM_API_KEY;
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const axios = require("axios");

//GET the user's milkcrate
router.get("/", rejectUnauthenticated, (req, res) => {
  const query = `
  SELECT albums.*, moods.mood AS mood
  FROM "albums"
  JOIN "moods" ON albums.mood = moods.id
  WHERE albums.user_id = $1
  ORDER BY albums.date_added DESC;
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
router.post("/add", rejectUnauthenticated, (req, res) => {
  const albumTitle = encodeURIComponent(req.body.title);
  const albumArtist = encodeURIComponent(req.body.artist);
  const albumMood = req.body.mood;
  const albumDetails = req.body.details;

  axios
  .get(
    `http://ws.audioscrobbler.com/2.0/?api_key=${LAST_FM_API_KEY}&format=json&method=album.getinfo&artist=${albumArtist}&album=${albumTitle}&autocorrect=1`
  )
  .then((response) => {
    console.log("Last.fm response:", response.data);
    const finalAlbumTitle = response.data.album.name ? response.data.album.name : req.body.title;
    const finalArtist = response.data.album.artist ? response.data.album.artist : req.body.artist;
    const finalCoverArt = response.data.album.image[4]["#text"] ? response.data.album.image[4]["#text"] : "browserIcon.png"; // Changed placeholder image name as an example
    const tagsObject = response.data.album.tags.tag;
    const finalTags = tagsObject && tagsObject.length > 0 ? tagsObject.map((tag) => tag.name) : [];
    insertAlbum(finalAlbumTitle, finalArtist, finalCoverArt, finalTags, albumMood, albumDetails, req.user.id, res);
  })
  .catch((err) => {
    console.error("ERROR: Fetching album information from Last.fm", err);
    // Insert the album with the original or placeholder values if the Last.fm call fails
    const placeholderCoverArt = "browserIcon.png"; // Specify your placeholder image
    const decodedAlbumTitle = decodeURIComponent(albumTitle);
    const decodedAlbumArtist = decodeURIComponent(albumArtist);
    insertAlbum(decodedAlbumTitle, decodedAlbumArtist, placeholderCoverArt, [], albumMood, albumDetails, req.user.id, res);
  });
});

function insertAlbum(title, artist, coverArt, tags, mood, details, userId, res) {
  const insertRecordQuery = `
    INSERT INTO "albums" 
    ("title", "artist", "coverart", "tags", "mood", "details", "user_id")
    VALUES
    ($1, $2, $3, $4, $5, $6, $7)
  `;

  const insertRecordValues = [title, artist, coverArt, JSON.stringify(tags), mood, details, userId];

  pool
    .query(insertRecordQuery, insertRecordValues)
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.error("ERROR: Adding album to DB", err);
      res.sendStatus(500);
    });
}

//   axios
//     .get(
//       `http://ws.audioscrobbler.com/2.0/?api_key=${LAST_FM_API_KEY}&format=json&method=album.getinfo&artist=${albumArtist}&album=${albumTitle}&autocorrect=1`
//     )
//     .then((response) => {
//       console.log("Last.fm response:", response.data);
//       const finalAlbumTitle = response.data.album.name ? response.data.album.name : albumTitle;
//       const finalArtist = response.data.album.artist ? response.data.album.artist : albumArtist;
//       const finalCoverArt = response.data.album.image[4]["#text"] ? response.data.album.image[4]["#text"] : "browserIcon.png";
//       const tagsObject = response.data.album.tags.tag;
//       const finalTags =
//         tagsObject && tagsObject.length > 0
//           ? tagsObject.map((tag) => tag.name)
//           : [];
//       const finalMood = albumMood;
//       const finalDetails = albumDetails;

//       // POST TO DB WITH FORM DATA (ALBUM MOOD AND DETAILS ONLY) AND LAST.FM OBJECT (COVER ART, ARTIST, ALBUM AND TAGS)
//       const insertRecordQuery = `
//           INSERT INTO "albums" 
//           ("title", "artist", "coverart", "tags", "mood", "details", "user_id")
//           VALUES
//           ($1, $2, $3, $4, $5, $6, $7)
//         `;

//       const insertRecordValues = [
//         finalAlbumTitle,
//         finalArtist,
//         finalCoverArt,
//         JSON.stringify(finalTags),
//         finalMood,
//         finalDetails,
//         req.user.id,
//       ];

//       pool
//         .query(insertRecordQuery, insertRecordValues)
//         .then(() => {
//           res.sendStatus(201);
//         })
//         .catch((err) => {
//           console.error("ERROR: Adding album to DB", err);
//           res.sendStatus(500);
//         });
//     })
//     .catch((err) => {
//       console.error("ERROR: Fetching album information from Last.fm", err);
//       res.sendStatus(500);
//     });
// });

//GET albums from milkcrate W/SEARCH params
router.get("/search", rejectUnauthenticated, (req, res) => {
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
    .query(query, [searchTerm, req.user.id])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.error("ERROR: seaching user's milkcrate", err);
      res.sendStatus(500);
    });
});

//PUT the new details of a record into the db
router.put("/edit", rejectUnauthenticated, (req, res) => {
  const updatedRecord = req.body;
  // req.body should contain the data needed for PUT
  const queryText = `
      UPDATE "albums"
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
    updatedRecord.artist,
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
