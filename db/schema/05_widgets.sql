-- Drop and recreate Widgets table (Example)

DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS resources CASCADE;
DROP TABLE IF EXISTS likes CASCADE;
DROP TABLE IF EXISTS comments CASCADE;

CREATE TABLE "categories" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "topic" VARCHAR(255) NOT NULL
);

CREATE TABLE "resources" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "creator_id" INTEGER REFERENCES users(id) NOT NULL,
  "category_id" INTEGER REFERENCES categories(id),
  "url" VARCHAR(255) NOT NULL,
  "title" VARCHAR(255) NOT NULL,
  "description" TEXT NOT NULL,
  "rating" SMALLINT NOT NULL DEFAULT 0,
  "thumbnail_url" VARCHAR(255)
);

CREATE TABLE "likes" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "owner_id" INTEGER REFERENCES users(id) NOT NULL,
  "resource_id" INTEGER REFERENCES resources(id) NOT NULL
);

CREATE TABLE "comments" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "commentor_id" INTEGER REFERENCES users(id) NOT NULL,
  "resource_id" INTEGER REFERENCES resources(id) NOT NULL,
  "text" TEXT NOT NULL,
  "date_posted" TIMESTAMP NOT NULL DEFAULT NOW()
);

