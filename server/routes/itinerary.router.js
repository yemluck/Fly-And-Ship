const express = require('express');
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Handles Axios request for itineraries
router.get('/', rejectUnauthenticated, (req, res) => {
    // Send back user object from the session (previously queried from the database)
    res.send(req.user);
    console.log('reg.user');

});

// POST endpoint
router.post('/itinerary', (req, res, next) => {
    const location = req.body.location;
    const departingCity = req.body.departingCity;
    const destinationCountry = req.body.destinationCountry;
    const destinationCity = req.body.destinationCity;
    const weightLimit = req.body.weightLimit;
    const departureDate = req.body.departureDate;
    const arrivalDate = req.body.arrivalDate;
    const note = req.body.note;
    const userId = req.body.userId;

    const queryText = `
        INSERT INTO "itinerary"
            ("location", "departing_city", "destination_country",
            "destination_city", "weight_limit", "departure_date",
            "arrival_date", "note", "user_id"
            )
        VALUES
            ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    `
    const queryParams = [
        location,
        departingCity,
        destinationCountry,
        destinationCity,
        weightLimit,
        departureDate,
        arrivalDate,
        note,
        userId
    ];

    pool.query(queryText, queryParams)
        .then(() => res.sendStatus(201))
        .catch((err) => {
            console.log('Create itinerary failed:', err);
            res.sendStatus(500);
        })
})


module.exports = router