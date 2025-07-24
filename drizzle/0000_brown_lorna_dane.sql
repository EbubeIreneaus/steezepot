CREATE TABLE `faqs` (
	`id` int AUTO_INCREMENT NOT NULL,
	`question` varchar(225) NOT NULL,
	`answer` text NOT NULL,
	`createdAt` timestamp DEFAULT (now()),
	CONSTRAINT `faqs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `orders` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user` json NOT NULL,
	`items` json NOT NULL,
	`delivery_address` json NOT NULL,
	`status` enum('pending','confirmed','shipped','delivered','cancelled') DEFAULT 'pending',
	`delivered` boolean NOT NULL DEFAULT false,
	`total_amount` decimal(10,2) NOT NULL,
	`createdAt` timestamp DEFAULT (now()),
	CONSTRAINT `orders_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `products` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`desc` varchar(500),
	`price` decimal(8,2) DEFAULT '0.0',
	`image` varchar(255) NOT NULL,
	`category` varchar(60) NOT NULL,
	`alt` varchar(255),
	`createdAt` datetime DEFAULT NOW(),
	`recomended` boolean DEFAULT false,
	`popularity` int DEFAULT 0,
	CONSTRAINT `products_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `reviews` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(225) NOT NULL,
	`content` text NOT NULL,
	`image` varchar(225),
	`createdAt` datetime DEFAULT NOW(),
	CONSTRAINT `reviews_id` PRIMARY KEY(`id`)
);
