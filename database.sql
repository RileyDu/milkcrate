CREATE TABLE "user" (
	"id" serial NOT NULL,
	"username" TEXT NOT NULL UNIQUE,
	"password" TEXT NOT NULL,
	CONSTRAINT "Users_pk" PRIMARY KEY ("id")
);

CREATE TABLE "albums" (
	"id" serial NOT NULL,
	"user_id" integer NOT NULL,
	"title" TEXT NOT NULL,
	"artist" TEXT NOT NULL,
	"coverart" TEXT NOT NULL,
	"tags" TEXT,
	"mood" integer NOT NULL,
	"details" TEXT NOT NULL,
	"date_added" TIMESTAMP NOT NULL DEFAULT current_timestamp,
	CONSTRAINT "Albums_pk" PRIMARY KEY ("id")
);

CREATE TABLE "moods" (
	"id" serial NOT NULL,
	"mood" TEXT NOT NULL UNIQUE,
	CONSTRAINT "Moods_pk" PRIMARY KEY ("id")
);

CREATE TABLE spins (
    id SERIAL PRIMARY KEY,
    time_spent TIME NOT NULL,
    listened_at TIMESTAMP NOT NULL,
    details TEXT
);

CREATE TABLE spin_albums (
    spin_id INTEGER REFERENCES spins(id),
    album_id INTEGER REFERENCES albums(id),
    PRIMARY KEY (spin_id, album_id)
);
ALTER TABLE spin_albums
DROP CONSTRAINT spin_albums_spin_id_fkey,
ADD CONSTRAINT spin_albums_spin_id_fkey
FOREIGN KEY (spin_id)
REFERENCES spins(id)
ON DELETE CASCADE;

ALTER TABLE spin_albums
DROP CONSTRAINT spin_albums_album_id_fkey,
ADD CONSTRAINT spin_albums_album_id_fkey
FOREIGN KEY (album_id)
REFERENCES albums(id)
ON DELETE CASCADE;

CREATE TABLE "friends" (
    "id" serial NOT NULL,
    "user_id" integer REFERENCES "user" ("id") NOT NULL,
    "friend_id" integer REFERENCES "user" ("id") NOT NULL,
    "friend_username" TEXT REFERENCES "user" ("username"),
    "user_username" TEXT REFERENCES "user" ("username"),
    CONSTRAINT "friends_pk" PRIMARY KEY ("id")
);

ALTER TABLE "albums" ADD CONSTRAINT "albums_fk0" FOREIGN KEY ("user_id") REFERENCES "Users"("id");
ALTER TABLE "albums" ADD CONSTRAINT "albums_fk1" FOREIGN KEY ("mood") REFERENCES "Moods"("id");

ALTER TABLE "spins" ADD CONSTRAINT "spins_fk0" FOREIGN KEY ("album_id") REFERENCES "albums"("id");


INSERT INTO "moods" (mood) VALUES
('Ambient'),
('Chill'),
('Cooking'),
('Edgy'),
('Focus'),
('Groovy'),
('Happy'),
('Hype'),
('Intense'),
('Mellow'),
('Nostalgic'),
('Raw'),
('Romantic'),
('Sad'),
('Serene'),
('Sentimental'),
('Soundtrack'),
('Smooth'),
('Soulful'),
('Upbeat');

select * from "user";
select * from "albums";
select * from "spins";
select * from "friends";
select * from "moods";









