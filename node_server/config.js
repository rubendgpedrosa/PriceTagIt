module.exports = {
  //Secret used to salt the hash!
    JWT_SECRET: "pricetagit_thekey",
    //Free email account
    EMAIL: 'pricetagitapp@gmail.com',
    PASSWORD: 'kuooyoabjdwxfoxi'
  };

/*Products table
CREATE TABLE products (
  id int NOT NULL AUTO_INCREMENT,
  name varchar(255),
  normal_price varchar(255),
  discounted_price varchar(255),
  category varchar(255),
  store varchar(255),
  src varchar(255),
  account_id int,
  PRIMARY KEY (id)
);

CREATE TABLE `accounts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `password` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `reset_code` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
);
*/
