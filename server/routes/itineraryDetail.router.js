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

router.get('/itineraryDetail', (req, res) => {
    console.log('this is req.query', Number(req.query.id));
    const id = Number(req.query.id)

    const queryText = `
        SELECT 
            "id", "location", "departing_city",
            "destination_country", "destination_city",
            "weight_limit", 
            TO_CHAR("departure_date", 'MM-DD-YY') AS departure_date,
            TO_CHAR("arrival_date", 'MM-DD-YY') AS arrival_date,
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

module.exports = router