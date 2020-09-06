const express = require('express');
const bodyParser = require('body-parser');
var session = require('express-session');
const mysql = require('mysql')
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
const port = process.env.PORT || 5000;

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
app.use(express.json());

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

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
  connection.query('SELECT * FROM products;', function (err, rows, fields) {
    if (err) throw err
  //Prints the rows resulted from previous query
    res.json(rows.reverse());
  })
});

app.post('/api/products', (req, res) => {
  var sql = `INSERT INTO products (name, regular_price, promotion_price, category, store, src) VALUES (?, ?, ?, ?, ?, ?)`;
  connection.query(sql, [req.body.product.name, req.body.product.regular_price.replace(",", "."), req.body.product.promotion_price.replace(",", "."), req.body.product.category, req.body.product.store, req.body.product.src], function (err, rows, fields) {
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
				request.session.loggedin = true;
        request.session.email = request.body.loginInformation.email;
        response.send(true);
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
        console.log(request.body.loginInformation);
        response.send(rows);
			  response.end();
    });
});

