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
var crypto = require("crypto");

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: config.EMAIL,
      pass: config.PASSWORD
  }
});

var connection = mysql.createConnection({
  host: '172.17.0.2',
  port: 3306,
  user: 'pricetagit',
  password: 'mysql',
  database: 'pricetagit',
})
connection.connect((err) => {

  if(!err)
      console.log('Database is connected!');
  else
      console.log('Database not connected! : '+ JSON.stringify(err, undefined,2));
  });

// Parse JSON bodies (as sent by API clients)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
//app.use(express.session({ secret: 'derpy' }));

// console.log that your server is up and running
app.listen(port);

// GET route for categories
app.get('/api/categories', authentication("categories"), (req, res) => {
  connection.query('SELECT * FROM categories;', function (err, rows, fields) {
    if (err) console.log(err)
    res.json(rows);
  })
});

// GET, POST and DELETE routes for products
app.get('/api/products', authentication("products"), (req, res) => {
  var sql=`SELECT * FROM products WHERE account_id = ?;`;
  connection.query(sql, [jwt.verify(req.headers["authorization"].slice(7), config.JWT_SECRET, (err, decoded) => {
    return decoded.id
  })], function (err, rows, fields) {
    if (err) console.log(err)
  //Prints the rows resulted from previous query
    res.json(rows.reverse());
  })
});

app.post('/api/products', authentication("products"), (req, res) => {
  var sql = `INSERT INTO products (name, regular_price, promotion_price, category, store, src, account_id) VALUES (?, ?, ?, ?, ?, ?, ?)`;
  connection.query(sql, [req.body.product.name, req.body.product.regular_price.replace(",", "."), req.body.product.promotion_price.replace(",", "."), req.body.product.category, req.body.product.store, req.body.product.src, jwt.verify(req.headers["authorization"].slice(7), config.JWT_SECRET, (err, decoded) => {
    return decoded.id
  })], function (err, rows, fields) {
    if (err) console.log(err)
    res.json(rows);
  });
});

app.delete('/api/products/:id', authentication("products"), (req, res) => {
  var sql = `DELETE FROM products WHERE (id=? AND account_id=?)`;
  connection.query(sql, [req.params.id, jwt.verify(req.headers["authorization"].slice(7), config.JWT_SECRET, (err, decoded) => {
    return decoded.id
  })], function (err, rows, fields) {
    if (err) console.log(err)
    res.json(rows);
  });
});

//Login routes
app.post('/api/auth/login', (request, response) => {
  if (request.body.loginInformation.email && request.body.loginInformation.password) {
    var sql =`SELECT * FROM accounts WHERE email = ?;`;
    connection.query(sql, [request.body.loginInformation.email], function (err, rows, fields) {
      if (err) console.log(err)
      if(rows.length > 0){
      bcrypt.compare(request.body.loginInformation.password, rows[0].password, function(err, res) { if(res) { 
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

app.post('/api/auth/register', (request, response) => {
  var sql = `INSERT INTO accounts (email, password, reset_code) VALUES (?, ?, ?);`;
  var sqlCheck = `SELECT * FROM accounts WHERE email = ?;`
  var mailOptions = {
      from: 'pricetagitapp@gmail.com',
      to: request.body.loginInformation.email,
      name: 'Price Tag It',
      subject: 'Price Tag It - Account Created',
      html:`<div style="margin: auto; border-radius: 5px; padding: 20px; padding-bottom: 50px; text-align: center; width: 50%;"><h1 style="color: #4299e1;">Welcome to Price Tag It!</h2><p><h3 style="color: #718096;">Your account has been created and is ready to be used!</h3></p><p><h3 style="color: #718096;">Get on our page and start creating your discounted products list.</h3></p></div>`
    };
    
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      response.sendStatus(404);
    } else {
      connection.query(sqlCheck, [request.body.loginInformation.email], function (err, rows, fields) {
        if(rows.length <= 0){
          bcrypt.hash(request.body.loginInformation.password, 10, function(err, hash) {
            var reset_code = "";
            var charset = "abcdefghijklmnopqrstuvwxyz0123456789";
          
            for (var i = 0; i < 12; i++){
              reset_code += charset.charAt(Math.floor(Math.random() * charset.length));
            }

            bcrypt.hash(reset_code, 10, function(err, reset_code_hash){
              connection.query(sql, [request.body.loginInformation.email, hash, reset_code_hash], function (err, rows, fields) {
                response.send(rows);
                response.end();
              });
            });
          });
        }else{
          response.sendStatus(401);
        }
      });
    }
  });
});

app.post('/api/auth/forgotpassword', (request, response) => {
  var sql =`SELECT * FROM accounts WHERE email = ?;`;
    connection.query(sql, [request.body.email], function (err, rows, fields) {
      if (err) console.log(err)
      if(rows.length > 0){
        var reset_code = "";
        var charset = "abcdefghijklmnopqrstuvwxyz0123456789";
      
        for (var i = 0; i < 12; i++){
          reset_code += charset.charAt(Math.floor(Math.random() * charset.length));
        }
          
        var mailOptions = {
          from: 'pricetagitapp@gmail.com',
          to: request.body.email,
          name: 'Price Tag It',
          subject: 'Price Tag It - Password Reset',
          html:`<div style="margin: auto; border-radius: 5px; padding: 20px; padding-bottom: 50px; text-align: center; width: 50%;"><h1 style="color: #4299e1;">Hello from Price Tag It!</h2><p><h3 style="color: #718096;">There has been a request to reset your account password by you (or someone else).</h3></p><p><h3 style="color: #718096;">If you did not request this, please ignore this email.</h3></p><p><h3 style="color: #718096;">If you did request a password reset, here's your reset code to do it!</h3></p><h2 style="color: #4a5568;padding-bottom: 2px; margin-bottom:2px;">Your Reset Code:</h2><p><h3  style="color: #4a5568;">${reset_code}</h3></p></div>`,
        };

          transporter.sendMail(mailOptions, function(error, info){
          if (error) {
              console.log(error);
          } else {
            response.send({msg:'Sent'});
            response.end();
          }
        });
      }else  { response.sendStatus(404); }
    });
});

