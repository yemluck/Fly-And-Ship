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
    console.log('reg.user id is',req.user.id);

});

router.get('/itinerary', (req, res) => {
    // Add query to fetch itinerary
    const queryText = `
        SELECT 
            "id", "location", "departing_city", "destination_country",
            "destination_city", "weight_limit", 
            TO_CHAR("departure_date", 'YYYY-MM-DD') AS departure_date,
            TO_CHAR("arrival_date", 'YYYY-MM-DD') AS arrival_date,
             "note"
        FROM 
            "itinerary"
        WHERE
            "user_id" = $1
    
    `;

    const queryParams = [
        req.user.id
    ];

    pool.query(queryText, queryParams)
        .then( result => { 
            res.send(result.rows)
        })
        .catch(err => {
            console.log('Error getting itinerary', err);
            res.sendStatus(500)
            
        })
})

// POST endpoint
router.post('/itinerary', rejectUnauthenticated, (req, res, next) => {
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

// delete endpoint
router.delete('/itinerary/:id', rejectUnauthenticated, (req, res) => {
    console.log('id is', req.params.id);

    const queryText =  `
        DELETE FROM "itinerary"
        WHERE id = $1
    `
    const queryParam = [req.params.id]

    pool.query(queryText, queryParam)
        .then(() => res.sendStatus(200))
        .catch((err) => {
            console.log('Error completing DELETE', err);
            res.sendStatus(500);
        })
    
})

module.exports = router