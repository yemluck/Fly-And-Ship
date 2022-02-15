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


router.get('/result', (req, res) => {
    console.log('this is req.query', req.query);
    
    const a = req.query.destination_country
    const b = req.query.arrival_date
    console.log('this is destination country:', a)
    console.log('this is arrival date:',b);
    console.log('this is type of destination country',typeof a);
    console.log('this is type of arrival date', typeof b);
    
    
    
    
    // Add query to fetch result
    const queryText = `
        SELECT 
            "itinerary"."id", itinerary."location", "departing_city", "destination_country",
            "destination_city", "weight_limit", "note",
            TO_CHAR("departure_date", 'YYYY-MM-DD') AS departure_date,
            TO_CHAR("arrival_date", 'YYYY-MM-DD') AS arrival_date,
            "user".first_name, "user".last_name, "user".contact, "user".email
        FROM itinerary
        JOIN "user"
            ON itinerary.user_id = "user".id
        WHERE
            arrival_date < TO_DATE($1, 'YYYY-MM-DD') AND
            departure_date > TO_DATE($2, 'YYYY-MM-DD') AND
            weight_limit > TO_NUMBER($3, '999') AND
            destination_country = $4
    `
    const queryParam =[
        req.query.arrival_date,
        req.query.departure_date,
        req.query.weight_limit,
        req.query.destination_country
    ] 


    pool.query(queryText, queryParam)
        .then( result => {
            res.send(result.rows);
            console.log('this is results.rows', result.rows);
            
        })
        .catch( err => {
            console.log('Error getting result', err);
            res.sendStatus(500)
            
        })
})

router.get('/detailResult', (req, res) => {
    console.log('this is req.query', req.query);

    const a = req.query.destination_country
    const b = req.query.arrival_date
    console.log('this is destination country:', a)
    console.log('this is arrival date:', b);
    console.log('this is type of destination country', typeof a);
    console.log('this is type of arrival date', typeof b);




    // Add query to fetch result
    const queryText = `
        SELECT 
            itinerary."id", itinerary."location", "departing_city", "destination_country",
            "destination_city", "weight_limit", "note",
            TO_CHAR("departure_date", 'YYYY-MM-DD') AS departure_date,
            TO_CHAR("arrival_date", 'YYYY-MM-DD') AS arrival_date,
            "user".first_name, "user".last_name, "user".contact, "user".email
        FROM itinerary
        JOIN "user"
            ON itinerary.user_id = "user".id
        WHERE
            arrival_date < TO_DATE($1, 'YYYY-MM-DD') AND
            departure_date > TO_DATE($2, 'YYYY-MM-DD') AND
            weight_limit > TO_NUMBER($3, '999') AND
            destination_country = $4
    `
    const queryParam = [
        req.query.arrival_date,
        req.query.departure_date,
        req.query.weight_limit,
        req.query.destination_country
    ]


    pool.query(queryText, queryParam)
        .then(result => {
            res.send(result.rows);
            console.log('this is results.rows', result.rows);

        })
        .catch(err => {
            console.log('Error getting result', err);
            res.sendStatus(500)

        })
})

module.exports = router