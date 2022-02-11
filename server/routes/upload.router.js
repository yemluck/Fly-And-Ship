const express = require('express');
const multer = require('multer');

const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '--' + file.originalname)
    }
})

const upload = multer({storage: fileStorageEngine });

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

router.post('/upload', upload.single('image'), (req, res, next) => {
    console.log('req.body is', req.body);
    console.log('req.file is', req.file);

    const queryText = `
        INSERT INTO "image"
            ("path", "user_id")
        VALUES
            ($1, $2)
    `
    const queryParams = [
        req.file.filename,
        req.user.id
    ]

    pool.query(queryText, queryParams)
        .then(() => res.sendStatus(201))
        .catch ((err) => {
            console.log('Upload photo failed', err);
            res.sendStatus(500)
        })
  
})

router.get('/upload', (req, res) => {
    const queryText = `
        SELECT *
        FROM "image"
        WHERE "user_id" = $1
        ORDER BY "upload_time" DESC
    `
    const queryParam = [ req.user.id ]

    pool.query(queryText, queryParam)
        .then (result => {
            res.send(result.rows[0])
        })
        .catch (err => {
            console.log('Error getting photos', err);
            res.sendStatus(500)
            
        })
})

module.exports = router