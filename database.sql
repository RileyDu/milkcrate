CREATE TABLE "user" (
	"id" serial NOT NULL,
	"username" TEXT NOT NULL UNIQUE,
	"password" TEXT NOT NULL,
	CONSTRAINT "Users_pk" PRIMARY KEY ("id")
);



CREATE TABLE "Albums" (
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



CREATE TABLE "Moods" (
	"id" serial NOT NULL,
	"mood" TEXT NOT NULL UNIQUE,
	CONSTRAINT "Moods_pk" PRIMARY KEY ("id")
);



CREATE TABLE "Spins" (
	"id" serial NOT NULL,
	"time_spent" TIME NOT NULL,
	"album_id" integer NOT NULL,
	"details" TEXT,
	"listened_at" TIMESTAMP NOT NULL,
	CONSTRAINT "Spins_pk" PRIMARY KEY ("id")
);



CREATE TABLE "Friends" (
	"id" serial NOT NULL,
	"user_id" integer NOT NULL,
	"friend" integer NOT NULL,
	CONSTRAINT "friends_pk" PRIMARY KEY ("id")
);

ALTER TABLE "Albums" ADD CONSTRAINT "Albums_fk0" FOREIGN KEY ("user_id") REFERENCES "Users"("id");
ALTER TABLE "Albums" ADD CONSTRAINT "Albums_fk1" FOREIGN KEY ("mood") REFERENCES "Moods"("id");


ALTER TABLE "Spins" ADD CONSTRAINT "Spins_fk0" FOREIGN KEY ("album_id") REFERENCES "Albums"("id");

ALTER TABLE "Friends" ADD CONSTRAINT "Friends_fk0" FOREIGN KEY ("user_id") REFERENCES "Users"("id");
ALTER TABLE "Friends" ADD CONSTRAINT "Friends_fk1" FOREIGN KEY ("friend") REFERENCES "Users"("id");


INSERT INTO "Moods" (mood) VALUES
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





