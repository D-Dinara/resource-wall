// load .env data into process.env
require('dotenv').config();

// Web server config
const sassMiddleware = require('./lib/sass-middleware');
const express = require('express');
const morgan = require('morgan');
const cookieSession = require('cookie-session');

const PORT = process.env.PORT || 8080;
const app = express();

app.set('view engine', 'ejs');

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(
  '/styles',
  sassMiddleware({
    source: __dirname + '/styles',
    destination: __dirname + '/public/styles',
    isSass: false, // false => scss, true => sass
  })
);
app.use(express.static('public'));
app.use(cookieSession({
  name: 'session',
  keys: ["somelongsecretkey987654321"],
}));

app.use(cookieSession({
  name: 'session',
  keys: ["somelongsecretkey987654321"],
}));
// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const userApiRoutes = require('./routes/users-api');
const widgetApiRoutes = require('./routes/widgets-api');
const usersRoutes = require('./routes/users');
const resourcesApiRoutes = require('./routes/resources-api');
const commentsApiRoutes = require('./routes/comments-api');
const resourcesPutDelete = require('./routes/resources-put-delete');
const likesRoutes = require('./routes/likes-api');
const ratingsRoutes = require('./routes/ratings-api');
const { getResources } = require('./db/queries/getResources');
const { findUserById } = require('./db/queries/findUserById');
// const profileRoutes = require('./routes/profile');
// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
app.use('/api/users', userApiRoutes);
app.use('/api/widgets', widgetApiRoutes);
app.use('/users', usersRoutes);
app.use('/resources', resourcesApiRoutes);
app.use('/comments', commentsApiRoutes);
// app.use('/profile', profileRoutes);
app.use('/resources', resourcesPutDelete);
app.use('/likes', likesRoutes);
app.use('/ratings', ratingsRoutes);

// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).



app.get('/', (req, res) => {
  const userId = req.session.user_id;
  Promise.all([
    findUserById(userId),
    getResources(req.query)
  ])
    .then(([user, resources]) => {
      const templateVars = {
        resources,
        user
      };
      res.render('index', templateVars);
    })
    .catch(err => console.error('Error fetching resources', err));
});

app.get('/login/:id', (req, res) => {
  req.session.user_id = req.params.id;
  res.redirect('/');
});

app.get('/logout', (req, res) => {
  req.session = null;
  res.redirect('/');
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

