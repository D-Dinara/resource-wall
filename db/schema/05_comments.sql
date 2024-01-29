DROP TABLE IF EXISTS comments CASCADE;

CREATE TABLE "comments" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "commentor_id" INTEGER REFERENCES users(id) NOT NULL,
  "resource_id" INTEGER REFERENCES resources(id) NOT NULL,
  "text" TEXT NOT NULL,
  "date_posted" TIMESTAMP NOT NULL DEFAULT NOW()
);
