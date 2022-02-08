
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!

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
	
INSERT INTO "itinerary" ( "location", departing_city, destination_country, "destination_city", "weight_limit",
							"departure_date", arrival_date, "user_id")
VALUES ('Minneapolis', 'Minneapolis', 'Nigeria', 'Lagos', 30, 'June 6, 2022', 'June 8, 2022', 2),
		('Minneapolis', 'Minneapolis', 'Nigeria', 'Lagos', 30, '2022-07-05', '2022-07-06', 2);
		
SELECT * FROM itinerary;


CREATE TABLE "request" (
	"id" SERIAL PRIMARY KEY,
	"location" VARCHAR (50) NOT NULL,
	"destination_country" VARCHAR (50) NOT NULL,
	"earliest_pickup" DATE NOT NULL,
	"latest_delivery" DATE NOT NULL,
	"item_description" VARCHAR (255),
	"contact" VARCHAR(16) NOT NULL,
	"email" VARCHAR (255),
	"user_id" INT REFERENCES "user"(id));
	

INSERT INTO "request" ("location", "destination_country", "earliest_pickup", "latest_delivery", "item_description",
						"contact", "email", "user_id")
VALUES ('Brooklyn Center', 'Nigeria', '2022-07-02', 'July 10, 2022', 'Item if fragile',
		'(612) 123-4567', 'user@shipper.com', 4);
		
SELECT * FROM "request";