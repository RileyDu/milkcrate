const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 5001;

// Middleware Includes
const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route Includes
const userRouter = require('./routes/user.router');
const blindbagRouter = require('./routes/blindbag.router');
const friendRouter = require('./routes/friend.router');
const recordRouter = require('./routes/record.router');
const spinsRouter = require('./routes/spins.router');
const moodRouter = require('./routes/mood.router')

// Express Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('build'));

// Passport Session Configuration
app.use(sessionMiddleware);

// Start Passport Sessions
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api/user', userRouter);
app.use('/api/blindbag', blindbagRouter);
app.use('/api/social', friendRouter)
app.use('/api/record', recordRouter)
app.use('/api/spins', spinsRouter)
app.use('/api/mood', moodRouter)


// Listen Server & Port
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
