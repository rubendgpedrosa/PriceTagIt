const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const mysql = require('mysql')
const app = express();
const port = process.env.PORT || 5000;
const authentication = require('./middleware-authentication');
const config = require('./config.js');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

//Start the nodemailer initial configurations
let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: config.EMAIL,
      pass: config.PASSWORD
  }
});

//Connect to database
var connection = mysql.createConnection({
  host: '172.17.0.2',
  port: 3306,
  user: 'pricetagit',
  password: 'pricetagit',
  database: 'pricetagit',
})

//Check if the connection was made to the database and console logs it.
connection.connect((err) => {
if(!err)
    console.log('Database is connected!');
else
    console.log('Database not connected! : '+ JSON.stringify(err, undefined,2));
});

// Parse JSON bodies (as sent by API clients)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

//Port that the server is listening too.
app.listen(port);



//** LOGIN ROUTES FOR NON LOGGED CLIENTS. **//
//** CLIENTS CAN REGISTER, LOGIN AND RESET THEIR PASSWORD. **//
//** THESE ROUTES ARE NOT PROTECTED. **//
//Login route that receives an email and password, compares the password received with thestored hashed one.
app.post('/api/auth/login', (request, response) => {
  if (request.body.loginInformation.email && request.body.loginInformation.password) {
    var sql =`SELECT * FROM accounts WHERE email = ?;`;
    //We firrst check if the account actually exists of course.
    connection.query(sql, [request.body.loginInformation.email], function (err, rows, fields) {
      if (err) console.log(err)
      if(rows.length > 0){
        //Comparison is made here!
      bcrypt.compare(request.body.loginInformation.password, rows[0].password, function(err, res) {
        if(res) { 
          //Since it was a valid password, we now generate a token and return it to the client, bearing all the
          // data he'll need for future requests regarding his account.
        const payload = {
          id: rows[0].id,
          email: request.body.loginInformation.email,
          password: request.body.loginInformation.password,
          scopes: ["products", "categories"]
        };
      
        const token = jwt.sign(payload, config.JWT_SECRET);
        response.send({token: token});
        response.end();
      } else { 
        response.send('Incorrect Username and/or Password!');
      }
      });}else{
        response.send('No account found!');
      }
    });
  };
});

//A user is registered by receiveing a password and email.
app.post('/api/auth/register', (request, response) => {
  var sql = `INSERT INTO accounts (email, password, reset_code) VALUES (?, ?, ?);`;
  var sqlCheck = `SELECT * FROM accounts WHERE email = ?;`
  var mailOptions = {
      from: 'Price Tag It',
      to: request.body.loginInformation.email,
      name: 'Price Tag It',
      subject: 'Price Tag It - Account Created',
      html:`<div style="margin: auto; border-radius: 5px; padding: 20px; padding-bottom: 50px; text-align: center; width: 50%;"><h1 style="color: #4299e1;">Welcome to Price Tag It!</h2><p><h3 style="color: #718096;">Your account has been created and is ready to be used!</h3></p><p><h3 style="color: #718096;">Get on our page and start creating your discounted products list.</h3></p></div>`
    };
    //If an email is sent (the account is legit), we then check if the account exists.
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      response.sendStatus(404);
    } else {
      //Check for duplicate account here!
      connection.query(sqlCheck, [request.body.loginInformation.email], function (err, rows, fields) {
        if(rows.length <= 0){
          //We hash the password for the new account here.
          bcrypt.hash(request.body.loginInformation.password, 10, function(err, hash) {
            var reset_code = "";
            var charset = "abcdefghijklmnopqrstuvwxyz0123456789";
            //We generate this for the reset code. It's just to prevent storing a NULL code and have people 
            //change other's passwords by sending an empty value on the reset code field.
            for (var i = 0; i < 12; i++){
              reset_code += charset.charAt(Math.floor(Math.random() * charset.length));
            }
            //We hash the random string and store it.
            bcrypt.hash(reset_code, 10, function(err, reset_code_hash){
              connection.query(sql, [request.body.loginInformation.email, hash, reset_code_hash], function (err, rows, fields) {
                const payload = {
                  id: rows.insertId,
                  email: request.body.loginInformation.email,
                  password: hash,
                  scopes: ["products", "categories"]
                };
              
                const token = jwt.sign(payload, config.JWT_SECRET);
                response.send({token: token});
                response.end();
              });
            });
          });
        }else{
          //Account exists
          response.sendStatus(401);
        }
      });
    }
  });
});

//Forgotten password only generates a new random reset code, sends it to the user email and stores
//the hashed version on the db.
app.post('/api/auth/forgotpassword', (request, response) => {
  var sql =`SELECT * FROM accounts WHERE email = ?;`;
  var sqlInject = `UPDATE accounts SET reset_code = ? WHERE email = ?;`
  //Always checking if account exists.
  connection.query(sql, [request.body.email], function (err, rows, fields) {
    if (err) console.log(err)
    if(rows.length > 0){
      //After having it exist, we generate a new reset token
      var reset_code = "";
      var charset = "abcdefghijklmnopqrstuvwxyz0123456789";
    
      for (var i = 0; i < 12; i++){
        reset_code += charset.charAt(Math.floor(Math.random() * charset.length));
      }

      //We send the email with the token in it's content.
      var mailOptions = {
        from: 'Price Tag It',
        to: request.body.email,
        name: 'Price Tag It',
        subject: 'Price Tag It - Password Reset Code',
        html:`<div style="margin: auto; border-radius: 5px; padding: 20px; padding-bottom: 50px; text-align: center; width: 50%;"><h1 style="color: #4299e1;">Hello from Price Tag It!</h2><p><h3 style="color: #718096;">There has been a request to reset your account password by you (or someone else).</h3></p><p><h3 style="color: #718096;">If you did not request this, please ignore this email.</h3></p><p><h3 style="color: #718096;">If you did request a password reset, here's your reset code to do it!</h3></p><h2 style="color: #4a5568;padding-bottom: 2px; margin-bottom:2px;">Your Reset Code:</h2><p><h3  style="color: #4a5568;">${reset_code}</h3></p></div>`,
      };

        transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
          //We hash the new reset code and store it in the database.
          bcrypt.hash(reset_code, 10, function(err, reset_code_hash) {
            connection.query(sqlInject, [reset_code_hash, request.body.email], function (err, rows, fields) {
              if(err) console.log(err)
            })
          });
          response.send({msg:'Sent'});
          response.end();
        }
      });
    }else  { response.sendStatus(404); }
    });
});

//This route is used to then receive the new password and reset code. We then compare it and store the
//new password hashed!
app.post('/api/auth/resetpassword', (request, response) => {
  var sql =`SELECT * FROM accounts WHERE email = ?;`;
  var sqlInject = `UPDATE accounts SET password = ?, reset_code = ? WHERE email = ?;`
  //Check if it exists again.
  connection.query(sql, [request.body.email], function (err, rows, fields) {
    if (err) console.log(err)
    if(rows.length > 0){
      var mailOptions = {
        from: 'Price Tag It',
        to: request.body.email,
        name: 'Price Tag It',
        subject: 'Price Tag It - Password Sucessfully Reset',
        html:`<div style="margin: auto; border-radius: 5px; padding: 20px; padding-bottom: 50px; text-align: center; width: 50%;"><h1 style="color: #4299e1;">Hello from Price Tag It!</h2><p><h3 style="color: #718096;">Your account password has been changed sucessfully by you (or someone else).</h3></p><p><h3 style="color: #718096;">You can always request a new password change by going to our page and choosing Forgot Password!</h3></p></div>`,
      };

        transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
          //We generate a new string again to replace the one being used now. This way we prevent
          //the same code being used more than once.
          var reset_code = "";
          var charset = "abcdefghijklmnopqrstuvwxyz0123456789";
        
          for (var i = 0; i < 12; i++){
            reset_code += charset.charAt(Math.floor(Math.random() * charset.length));
          }
          //Checks if reset code is the same as the stored one.
          bcrypt.compare(request.body.resetCode, rows[0].reset_code, function(err, res) { if(res) { 
            if(res) { 
              //If it is, hash the new password and the new reset code.
              bcrypt.hash(request.body.newPassword, 10, function(err, hash) {
                bcrypt.hash(reset_code, 10, function(err, hash_reset_code) {
                  //After hashing, insert into db the new hashed password and reset code.
                  connection.query(sqlInject, [hash, hash_reset_code, request.body.email], function (err, rows, fields) {
                    if(err) console.log(err)
                  })
                })
              });
              response.send({msg:'Password Changes'});
              response.end();
              //Password Doesn't match here!
            } else { 
              response.send('Incorrect Username and/or Password!');
            }
          } else { 
            //Token is not even valid!
            response.send('Invalid Reset Code');
          }
          });
        }
      });
      //No Account found for that email!
    }else  { response.sendStatus(404); }
    });
});


//** ROUTES USED TO GET, POST AND DELETE DATA FOR THE CLIENT. **//
//** THESE ROUTES USE A TOKEN TO ACCEPT THE CLIENT CONNECTION. **//
// GET route for categories
app.get('/api/categories', authentication("categories"), (req, res) => {
  //Categories array that COULD be in a db, but for github landing page, we'll keep it here.
  const  categories = [{"name":"Alcoholic Drinks"},{"name":"Baby Products"},{"name":"Bakery"},{"name":"Beverages"},{"name":"Canned Foods"},{"name":"Car Care products"},{"name":"Clothes"},{"name":"Coffee, Tea & Hot Chocolate"},{"name":"Cosmetics"},{"name":"Dairy Products"},{"name":"Diet Foods"},{"name":"Electrical Products"},{"name":"Fish & Seafood"},{"name":"Frozen"},{"name":"Fruits & Vegetables"},{"name":"Grains & Pasta"},{"name":"Home & Kitchen"},{"name":"Home Baking"},{"name":"House-Cleaning Products"},{"name":"Meat, Poultry & Sausages"},{"name":"Newspapers"},{"name":"Office Supplies"},{"name":"Oils"},{"name":"Other"},{"name":"Personal Hygiene"},{"name":"Pet Supplies"},{"name":"Pharmacy"},{"name":"Preserves"},{"name":"Ready Meals"},{"name":"Snacks & Candy"},{"name":"Spices, Sauces & Condiments"}]
  res.send(categories);
  /*
  We could keep stuff in DB And query and return it this way.
  connection.query('SELECT * FROM categories;', function (err, rows, fields) {
    if (err) console.log(err)
    res.json(rows);
  })*/
});

// GET, POST and DELETE routes for products
app.get('/api/products', authentication("products"), (req, res) => {
  var sql=`SELECT * FROM products WHERE account_id = ?;`;
  //Connect to db and use the authorization to return the products associated to the id in the token.
  connection.query(sql, [jwt.verify(req.headers["authorization"].slice(7), config.JWT_SECRET, (err, decoded) => {
    return decoded.id
  })], function (err, rows, fields) {
    if (err) console.log(err)
  //Prints the rows resulted from previous query
  //We are careful in case we get undefined
    if(rows !== undefined){
      res.json(rows.reverse());
    }else{
      res.json(rows);
    }
  })
});

//Inserting in the database needs to have the correct token
app.post('/api/products', authentication("products"), (req, res) => {
  var sql = `INSERT INTO products (name, normal_price, discounted_price, category, store, src, account_id) VALUES (?, ?, ?, ?, ?, ?, ?)`;
   //Insert into the db. Nothing special.
  connection.query(sql, [req.body.product.name, req.body.product.normal_price.replace(",", "."), req.body.product.discounted_price.replace(",", "."), req.body.product.category, req.body.product.store, req.body.product.src, jwt.verify(req.headers["authorization"].slice(7), config.JWT_SECRET, (err, decoded) => {
    return decoded.id
  })], function (err, rows, fields) {
    if (err) console.log(err)
    res.json(rows);
  });
});

//Deleting works the same. Token sent has the id in it.
app.delete('/api/products/:id', authentication("products"), (req, res) => {
  var sql = `DELETE FROM products WHERE (id=? AND account_id=?)`;
  //Query for data and return it when it belongs to the logged user account id.
  connection.query(sql, [req.params.id, jwt.verify(req.headers["authorization"].slice(7), config.JWT_SECRET, (err, decoded) => {
    return decoded.id
  })], function (err, rows, fields) {
    if (err) console.log(err)
    res.json(rows);
  });
});