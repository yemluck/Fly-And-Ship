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

router.get('/request', (req, res) => {
    // Add query to fetch request
    const queryText = `
        SELECT
            "id", "location", "destination_country", "earliest_pickup",
            "latest_delivery", "item_description", "contact", "email"
        FROM
            "request"
        WHERE
            "user_id" = $1
    `

    const queryParams = [
        req.user.id
    ]

    pool.query(queryText, queryParams)
        .then( result => {
            res.send(result.rows)
        })
        .catch(err => {
            console.log('Error getting request', err);
            res.sendStatus(500)
        })
})

// POST endpoint
router.post('/request', (req, res, next) => {
    const location = req.body.location;
    const destinationCountry = req.body.destinationCountry;
    const earliestPickup = req.body.earliestPickup;
    const latestDelivery = req.body.latestDelivery;
    const description = req.body.description;
    const contact = req.body.contact;
    const email = req.body.email;
    const userId = req.body.userId;

    const queryText = `
        INSERT INTO "request"
            ("location", "destination_country", "earliest_pickup", "latest_delivery",
            "item_description", "contact", "email", "user_id")
        VALUES
            ($1, $2, $3, $4, $5, $6, $7, $8)
    `

    const queryParams = [
        location,
        destinationCountry,
        earliestPickup,
        latestDelivery,
        description,
        contact,
        email,
        userId
    ];

    pool.query(queryText, queryParams)
        .then(()=> res.sendStatus(201))
        .catch((err) => {
            console.log('Create request failed:', err);
            res.sendStatus(500);
        })
})



module.exports = router