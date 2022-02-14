
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
-- Database name is solo-project

DROP TABLE "user";

CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "type" VARCHAR (7) NOT NULL,
    "first_name" VARCHAR (20) NOT NULL,
    "last_name" VARCHAR (20) NOT NULL,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "contact" VARCHAR (15),
    "email" VARCHAR (50)    
);

CREATE TABLE "itinerary" (
	"id" SERIAL PRIMARY KEY,
	"location" VARCHAR (50) NOT NULL,
	"departing_city" VARCHAR (50) NOT NULL,
	"destination_country" VARCHAR (50) NOT NULL,
	"destination_city" VARCHAR (50) NOT NULL,
	"weight_limit" NUMERIC(10, 2) NOT NULL,
	"departure_date" DATE NOT NULL,
	"arrival_date" DATE NOT NULL,
	"note" VARCHAR(255),
	"user_id" INT REFERENCES "user"(id));
	


CREATE TABLE "request" (
	"id" SERIAL PRIMARY KEY,
	"location" VARCHAR (50) NOT NULL,
	"destination_country" VARCHAR (50) NOT NULL,
	"earliest_pickup" DATE NOT NULL,
	"latest_delivery" DATE NOT NULL,
	"item_weight" NUMERIC(10, 2) NOT NULL,
	"item_description" VARCHAR (255),
	"contact" VARCHAR(16) NOT NULL,
	"email" VARCHAR (255),
	"user_id" INT REFERENCES "user"(id));


CREATE TABLE image (
	"id" SERIAL PRIMARY KEY,
	"path" VARCHAR(255) NOT NULL,
	"upload_time" TIMESTAMP DEFAULT CURRENT_TIMESTAMP(2),
	"user_id" INT REFERENCES "user"(id));