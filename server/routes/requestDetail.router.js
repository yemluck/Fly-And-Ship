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

router.get('/requestDetail/:id', (req, res) => {
    console.log('this is req.query', req.params.id);
    //const id = Number(req.query.id)

    const queryText =  `
        SELECT 
            "id", "location", "destination_country",
            TO_CHAR("earliest_pickup", 'MM-DD-YY') AS earliest_pickup,
            TO_CHAR("latest_delivery", 'MM-DD-YY') AS latest_delivery,
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


module.exports = router