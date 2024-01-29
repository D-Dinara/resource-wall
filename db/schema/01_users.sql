-- Drop and recreate Users table (Example)

DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "username" varchar(255) NOT NULL,
  "first_name" varchar(255),
  "last_name" varchar(255),
  "email" varchar(255) NOT NULL
);
