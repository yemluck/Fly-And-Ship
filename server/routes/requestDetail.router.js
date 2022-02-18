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

router.get('/requestDetail/:id', rejectUnauthenticated, (req, res) => {
    console.log('this is GET req.params:', req.params.id);
    //const id = Number(req.query.id)

    const queryText =  `
        SELECT 
            "id", "location", "destination_country",
            TO_CHAR("earliest_pickup", 'YYYY-MM-DD') AS earliest_pickup,
            TO_CHAR("latest_delivery", 'YYYY-MM-DD') AS latest_delivery,
            "item_weight", "item_description", "contact", "email",
            "user_id"
        FROM "request"
        WHERE
            "id" = $1
    `;

    const queryParam = [ req.params.id ];

    pool.query(queryText, queryParam)
        .then ( result => {
            res.send(result.rows[0]);
            console.log('this is results.rows', result.rows);
            
        })
        .catch ( err => {
            console.log('Error getting requestDetail', err);
            res.sendStatus(500)
            
        })
    
})

router.put('/requestDetail/:id', rejectUnauthenticated, (req, res) => {
    console.log('this is req.body in put', req.body);
    console.log('this is put req.params.id', req.params.id);
    console.log('type of put req.params.id', typeof req.params.id);
    console.log('type of put req.params.id in number', typeof Number(req.params.id));
    
    const queryText = `
        UPDATE "request"
        SET "location" = $1,
            "destination_country" = $2,
            "earliest_pickup" = $3,
            "latest_delivery" = $4,
            "item_weight" = $5,
            "item_description" = $6,
            "contact" = $7,
            "email" = $8
        WHERE
            "id" = $9
    `
    const queryParams = [
        req.body.location,
        req.body.destination_country,
        req.body.earliest_pickup,
        req.body.latest_delivery,
        Number(req.body.item_weight),
        req.body.item_description,
        req.body.contact,
        req.body.email,
        Number(req.params.id)
    ];

    pool.query(queryText, queryParams)
        .then((result) => {
            res.sendStatus(200)
        })
        .catch((error) => {
            console.log(`Error making database query`, error);
            res.sendStatus(500);
            
        })
    
    
})


module.exports = router