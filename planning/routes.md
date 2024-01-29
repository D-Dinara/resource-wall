
|HTTP method | URL pattern         |Use         |
| -----------| --------------------|------------|
|GET         | /login/:id          |User login  
|GET         | /users/:id          |Display user's profile 
|POST        | /users/:id          |Edit user's profile 
|GET         | /resources          |Show all resources 
|GET         | /resources/:id      |Display resource 
|GET         | /resources/:id/edit |Display resource create/edit form



## from lecture:
users login (from lecture):

app.get('/login/:id', (req, res) => {
  // using encrypted cookies
  req.session.user_id = req.params.id;

  // send the user somewhere
  res.redirect('/');
});

