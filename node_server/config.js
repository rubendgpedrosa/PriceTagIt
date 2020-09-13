module.exports = {
  //Secret used to salt the hash!
    JWT_SECRET: "pricetagit_thekey",
    //Free email account
    EMAIL: 'pricetagitapp@gmail.com',
    PASSWORD: 'kuooyoabjdwxfoxi'
  };

/*Products table
CREATE TABLE `products` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `reference` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `src` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT 'product_default.png',
  `category` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cross_reference` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` decimal(20,2) DEFAULT NULL,
  `brand` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` longtext COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `products_reference_unique` (`reference`)
)

CREATE TABLE `accounts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `password` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `reset_code` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
)
*/
