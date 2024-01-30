
|HTTP method | URL pattern           |Use         |
|------------| ----------------------|------------|
|GET         | /login/:id            |User login  
|GET         | /users/:id            |Display user's profile 
|POST        | /users/:id            |Edit user's profile 
|GET         | /resources            |Show all resources 
|GET         | /resources/:id        |Display a resource 
|POST        | /resources            |Create a new resource (add to the db)
|PUT         | /resources/:id        |Update a resource
|DELETE      | /resources/:id/delete |Delete a resource (remove from the db)
|GET         | /comments             |Display comments
|POST        | /comments             |Create a new comment (add to the db)
|POST        | /likes                |Like a resource (add to the db)
|DELETE      | /likes/:id/delete     |Delete like (remove like from the db)


## from lecture:
users login (from lecture):

app.get('/login/:id', (req, res) => {
  // using encrypted cookies
  req.session.user_id = req.params.id;

  // send the user somewhere
  res.redirect('/');
});

