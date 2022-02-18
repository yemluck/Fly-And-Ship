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
    console.log('reg.user id is', req.user.id);

});

router.get('/itineraryDetail', rejectUnauthenticated, (req, res) => {
    console.log('this is req.query', Number(req.query.id));
    const id = Number(req.query.id)

    const queryText = `
        SELECT 
            "id", "location", "departing_city",
            "destination_country", "destination_city",
            "weight_limit", 
            TO_CHAR("departure_date", 'YYYY-MM-DD') AS departure_date,
            TO_CHAR("arrival_date", 'YYYY-MM-DD') AS arrival_date,
            "note", "user_id"
        FROM "itinerary"
        WHERE
            "id" = $1
    `;

    const queryParam = [ id ];

    pool.query(queryText, queryParam)
        .then ( result => {
            res.send(result.rows[0]);
            console.log('this is result.rows', result.rows);
        })
        .catch ( err => {
            console.log('Error getting itineraryDetail', err);
            res.sendStatus(500)
            
        })
    
})

router.put('/itineraryDetail/:id', rejectUnauthenticated, (req, res) => {
    console.log('this is req.body in put', req.body);
    console.log('this is put req.params.id', req.params.id);
    console.log('type of put req.params.id', typeof req.params.id);
    console.log('type of put req.params.id in number', typeof Number(req.params.id));
    
    const queryText = `
        UPDATE "itinerary"
        SET "location" = $1,
            "departing_city" = $2,
            "destination_country" = $3,
            "destination_city" = $4,
            "weight_limit" = $5,
            "departure_date" = $6,
            "arrival_date" = $7,
            "note" = $8
        WHERE
            "id" = $9
    `
    const queryParams = [
        req.body.location,
        req.body.departing_city,
        req.body.destination_country,
        req.body.destination_city,
        Number(req.body.weight_limit),
        req.body.departure_date,
        req.body.arrival_date,
        req.body.note,
        Number(req.params.id)
    ];

    pool.query(queryText, queryParams)
        .then((result) => {
            res.sendStatus(200)
        })
        .catch((error) => {
            console.log('Error making database query', error);
            res.sendStatus(500);
            
        })
})

module.exports = router