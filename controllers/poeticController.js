module.exports = function(app,db, passport){



//reading data
app.get('/feed', function(req, res){
  console.log('Get request made');
  // console.log(req.user);
  let sql = 'SELECT * FROM poems;';
  db.query(sql, (err,results)=>{
      if(err){
        throw err;
      }
      // console.log(results);
      res.render('feed', {trendingPoems: results, user: req.user});
    });
});



// get add form page
app.get('/addPoem', function(req, res){
  res.render('addPoem', {user: req.user});
  // let sql = 'SELECT * FROM poems WHERE userID =' + req.user.id +';';
  // db.query(sql, (err,results)=>{
  //     if(err){
  //       throw err;
  //     }
  //     console.log(results);
  //     res.render('feed', {trendingPoems: results, user: req.user});
  //   });
});

// get home page
app.get('/home', function(req, res){
  res.render('home');
});

//get profile page
app.get('/profile', function(req, res){
  let sql = 'SELECT * FROM poems WHERE userID = ' + req.user.id + ';';
  db.query(sql, (err,results)=>{
      if(err){
        throw err;
      }
      console.log(results);
      res.render('profile', {myPoems: results, user: req.user});
    });
});

// //get profile page of other user
// app.get('/profile2/:id', function(req, res){
//   console.log(req.params.id)
//   let sql = 'SELECT * FROM poems WHERE userID = ' + req.params.id + ';';
//   let sql2 = 'SELECT * FROM users WHERE id = ' + req.params.id + ';';
//   db.query(sql, (err,result)=>{
//       if(err) throw err;
//       db.query(sql2, (err,results)=>{
//           if(err) throw err;
//           //console.log(results);
//           res.render('profile2', {myPoems: result, user: results} );
//         });
//       //console.log(results)
//     });
// });

//destroying sessions
app.get('/logout',function(req,res){

  req.session.destroy(function(err) {
  res.redirect('/signin');
});
});


// handle add poem form
app.post('/addPoem', function(req, res){
  console.log('posting')
  console.log(req.body)
  let poem = req.body;
  poem['userID'] = req.user.id;
  // let authorFirstName = req.user.firstname;
  // let authorLastName = req.user.lastname;
  let sql =  'INSERT INTO poems SET ?';
  db.query(sql, poem, function(err, result){
      if(err){
        throw err;
      }
      res.redirect('/feed')
    });
});


// handle add comment form
app.post('/poem/:id', function(req, res){

  let comment = req.body;
  comment['userID'] = req.user.id;
  comment['postID'] = req.params.id;
  console.log(comment);
  // let authorFirstName = req.user.firstname;
  // let authorLastName = req.user.lastname;
  let sql =  'INSERT INTO comments SET ?';
  db.query(sql, comment, function(err, result){
      if(err){
        throw err;
      }
      res.redirect('/poem/'+req.params.id)
    });
});


// //posting data
// app.post('/feed', function(req, res){
// console.log('Post request made');
// let item =req.body;
// item['userID'] = req.user.id;
// console.log(item);
// let sql = 'INSERT INTO poems SET ?';
// let query = db.query(sql, item, function(err, result){
//     if(err){
//       throw err;
//     }
//     console.log(result);
//     res.json(result);
//   });
//
// });

// //destroying data
// app.delete('/feed/:id',function(req, res){
// console.log('Delete request made');
// let sql = `DELETE FROM todoItems WHERE id= ${req.params.id};`;
// db.query(sql, (err, result) =>{
//   if(err){
//     throw err;
//
//   }
//   res.json(result);
//
// });
//
//
//
//
// });


app.get('/signup', function(req, res){
  res.render('signup');
});

//handling sign up form
app.post('/signup', passport.authenticate('local-signup',  {
     successRedirect: '/feed',
     failureRedirect: '/signup'}
    )
  );

//displaying sign in
app.get('/signin', function(req,res){

	res.render('signin', {message: req.flash('loginMessage')});

});

//handling sign in form
app.post('/signin', passport.authenticate('local-signin',  {
     successRedirect: '/feed',
     failureRedirect: '/signin'}
    )
  );

//destroying sessions
app.get('/logout',function(req,res){

  req.session.destroy(function(err) {
  res.redirect('/signin');
});
});

//get poem page
app.get('/poem/:id', function(req,res){
  console.log('hitting single poem view')
  console.log(req.params)
  let sql   = 'SELECT * FROM poems WHERE id = ' + req.params.id + ';';
  let sql2  = 'SELECT * FROM comments WHERE postID = ' + req.params.id + ';';

  db.query(sql, (err,result)=>{
      if(err) throw err;
      db.query(sql2, (err,results)=>{
          if(err) throw err;
          //console.log(results);
          res.render('poem', {poem: result, comments: results, user: req.user});
        });
      //console.log(results)
    });
});


// //handle commenting
// app.post('/poem', urlencodeParser, function(req, res){
// //  console.log('we posting');
//   let item = req.body;
//   console.log(item);
//   let sql = 'INSERT INTO comments SET ?';
//   db.query(sql, item, (err, result) => {
//     if (err) throw err;
//     console.log (result);
//     res.json(result);
//   })
// });


function isLoggedIn(req, res, next) {
      if (req.isAuthenticated())
          return next();

      res.redirect('/signin');
  };
  };
