DROP TABLE IF EXISTS ratings CASCADE;

CREATE TABLE "ratings" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "rater_id" INTEGER REFERENCES users(id) ON DELETE CASCADE,
  "resource_id" INTEGER REFERENCES resources(id) ON DELETE CASCADE,
  "rate" SMALLINT NOT NULL
);
