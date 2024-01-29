
|HTTP method | URL pattern           |Use         |
|------------| ----------------------|------------|
|GET         | /login/:id            |User login  
|GET         | /users/:id            |Display user's profile 
|POST        | /users/:id            |Edit user's profile 
|GET         | /resources            |Show all resources 
|GET         | /resources/:id        |Display a resource 
|GET         | /resources/:id/edit   |Display a resource edit form
|GET         | /resources/new        |Display a form to create a new resource
|POST        | /resources            |Create a new resource (add to the db)
|POST/PUT    | /resources/:id        |Update a resource
|POST/DELETE | /resources/:id/delete |Delete a resource (remove from the db)
|GET         | /comments             |Display comments
|GET         | /comments/:id/edit    |Display a comment edit form ???
|POST        | /comments             |Create a new comment (add to the db)
|POST/PUT    | /comments/:id         |Edit a comment
|POST/DELETE | /comments/:id/delete  |Delete a comment (remove from the db)
|POST        | /likes                |Like a resource (add to the db)
|POST/DELETE | /comments/:id/delete  |Delete like (remove like from the db)


## from lecture:
users login (from lecture):

app.get('/login/:id', (req, res) => {
  // using encrypted cookies
  req.session.user_id = req.params.id;

  // send the user somewhere
  res.redirect('/');
});

