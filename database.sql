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

CREATE TABLE "spins" (
	"id" serial NOT NULL,
	"time_spent" TIME NOT NULL,
	"album_id" integer NOT NULL,
	"details" TEXT,
	"listened_at" TIMESTAMP NOT NULL,
	CONSTRAINT "Spins_pk" PRIMARY KEY ("id")
);

CREATE TABLE "friends" (
	"id" serial NOT NULL,
	"user_id" integer NOT NULL,
	"friend" integer NOT NULL,
	CONSTRAINT "friends_pk" PRIMARY KEY ("id")
);

ALTER TABLE "albums" ADD CONSTRAINT "albums_fk0" FOREIGN KEY ("user_id") REFERENCES "Users"("id");
ALTER TABLE "albums" ADD CONSTRAINT "albums_fk1" FOREIGN KEY ("mood") REFERENCES "Moods"("id");

ALTER TABLE "spins" ADD CONSTRAINT "spins_fk0" FOREIGN KEY ("album_id") REFERENCES "albums"("id");

ALTER TABLE "friends" ADD CONSTRAINT "friends_fk0" FOREIGN KEY ("user_id") REFERENCES "Users"("id");
ALTER TABLE "friends" ADD CONSTRAINT "friends_fk1" FOREIGN KEY ("friend") REFERENCES "Users"("id");

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

CREATE INDEX "idx_albums_title_trgm" ON "albums" USING gist ("title" gist_trgm_ops);
CREATE INDEX "idx_albums_artist_trgm" ON "albums" USING gist ("artist" gist_trgm_ops);
CREATE INDEX "idx_albums_tags_trgm" ON "albums" USING gist ("tags" gist_trgm_ops);
CREATE INDEX "idx_albums_mood_trgm" ON "albums" USING gist (CAST("mood" AS TEXT) gist_trgm_ops);

CREATE EXTENSION IF NOT EXISTS pg_trgm;








