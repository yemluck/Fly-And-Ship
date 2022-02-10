const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const itineraryRouter = require('./routes/itinerary.router');
const requestRouter = require('./routes/request.router');
const resultRouter = require('./routes/result.router');
const requestDetailRouter = require('./routes/requestDetail.router');
const itineraryDetailRouter = require('./routes/itineraryDetail.router');
// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/user', itineraryRouter);
app.use('/api/user', requestRouter);
app.use('/api/user', resultRouter);
app.use('/api/user/', requestDetailRouter);
app.use('/api/user/', itineraryDetailRouter);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
