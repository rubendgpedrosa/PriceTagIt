const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const mysql = require('mysql')
const app = express();
const port = process.env.PORT || 5000;
const authentication = require('./middleware-authentication');
const config = require('./config.js');

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
app.get('/api/categories', (req, res) => {
  connection.query('SELECT * FROM categories;', function (err, rows, fields) {
    if (err) throw err
  
    res.json(rows);
  })
});

// GET, POST and DELETE routes for products
app.get('/api/products', (req, res) => {
  console.log(req.headers);

  connection.query('SELECT * FROM products;', function (err, rows, fields) {
    if (err) throw err
  //Prints the rows resulted from previous query
    res.json(rows.reverse());
  })
});

app.post('/api/products', (req, res) => {
  var sql = `INSERT INTO products (name, regular_price, promotion_price, category, store, src, account_id) VALUES (?, ?, ?, ?, ?, ?, ?)`;
  connection.query(sql, [req.body.product.name, req.body.product.regular_price.replace(",", "."), req.body.product.promotion_price.replace(",", "."), req.body.product.category, req.body.product.store, req.body.product.src, req.body.product.account_id], function (err, rows, fields) {
    if (err) throw err
    res.json(rows);
  });
});

app.delete('/api/products/:id', (req, res) => {
  var sql = `DELETE FROM products WHERE id=?`;
  connection.query(sql, [req.params.id], function (err, rows, fields) {
    if (err) throw err
    res.json(rows);
  });
});

//Login routes
app.post('/api/auth/login', (request, response) => {
  if (request.body.loginInformation.email && request.body.loginInformation.password) {
		connection.query('SELECT * FROM accounts WHERE email = ? AND password = ?', [request.body.loginInformation.email, request.body.loginInformation.password], function(error, results, fields) {
			if (results.length > 0) {
        const payload = {
          id: results[0].id,
          email: request.body.loginInformation.email,
          password: request.body.loginInformation.password,
          scopes: "products"
        };
      
        const token = jwt.sign(payload, config.JWT_SECRET);
        response.send({token: token});
			} else {
				response.send('Incorrect Username and/or Password!');
			}			
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});

app.post('/api/auth/register', (request, response) => {
  var sql = `INSERT INTO accounts (email, password) VALUES (?, ?)`;
  connection.query(sql, [request.body.loginInformation.email, request.body.loginInformation.password], function (err, rows, fields) {
        response.send(rows);
			  response.end();
    });
});

