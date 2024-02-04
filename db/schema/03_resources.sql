DROP TABLE IF EXISTS resources CASCADE;

CREATE TABLE "resources" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "creator_id" INTEGER REFERENCES users(id) NOT NULL,
  "category_id" INTEGER REFERENCES categories(id),
  "url" VARCHAR(255) NOT NULL,
  "title" VARCHAR(255) NOT NULL,
  "description" TEXT NOT NULL,
  "rating" DECIMAL(3, 2) NOT NULL DEFAULT 0,
  "thumbnail_url" VARCHAR(255) NOT NULL DEFAULT '../../assets/no-image.png'
);
