const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const mysql = require('mysql')
const app = express();
const port = process.env.PORT || 5000;
const authentication = require('./middleware-authentication');
const config = require('./config.js');
const bcrypt = require('bcrypt');

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
  var sql = `INSERT INTO accounts (email, password) VALUES (?, ?)`;
  bcrypt.hash(request.body.loginInformation.password, 10, function(err, hash) {
    connection.query(sql, [request.body.loginInformation.email, hash], function (err, rows, fields) {
      response.send(rows);
      response.end();
  });
  });
});

