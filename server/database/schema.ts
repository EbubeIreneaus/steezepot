import { sql } from "drizzle-orm";
import {
  MySqlTable,
  date,
  datetime,
  decimal,
  int,
  mysqlTable,
  text,
  timestamp,
  varchar,
  json,
  boolean,
  mysqlEnum
} from "drizzle-orm/mysql-core";

import type { Address, OrderStatus, User } from "~~/types/order";
import { Product } from "~~/types/products";

const timeStamp = {
  createdAt: timestamp().defaultNow(),
};

export const faqTable = mysqlTable("faqs", {
  id: int().primaryKey().autoincrement(),
  question: varchar({ length: 225 }).notNull(),
  answer: text().notNull(),
  ...timeStamp,
});

export const productTable = mysqlTable("products", {
  id: int().primaryKey().autoincrement(),
  name: varchar("name", { length: 255 }).notNull(),
  desc: varchar("desc", { length: 500 }),
  price: decimal({ precision: 8, scale: 2 }).default("0.0"),
  image: varchar("image", { length: 255 }).notNull(),
  category: varchar("category", { length: 60 }).notNull(),
  alt: varchar("alt", { length: 255 }),
  createdAt: datetime().default(sql`NOW()`),
  recomended: boolean().default(false),
  popularity: int().default(0)
});

export const reviewTable = mysqlTable('reviews', {
  id: int().primaryKey().autoincrement(),
  name: varchar('name', {length: 225}).notNull(),
  content: text('content').notNull(),
  image: varchar('image', {length:225}),
  createdAt: datetime().default(sql`NOW()`)
})

export const orderTable = mysqlTable('orders', {
  id: int('id').primaryKey().autoincrement(),
  user: json('user').$type<User>().notNull(), 
  items: json('items').$type<Product[]>().notNull(),
  deliveryAddress: json('delivery_address').$type<Address>().notNull(),
  status: mysqlEnum('status', ["pending","confirmed","shipped","delivered","cancelled"]).default('pending'),
  delivered: boolean('delivered').notNull().default(false),
  totalAmount: decimal('total_amount', { precision: 10, scale: 2 }).notNull(),
  ...timeStamp
});

export const contactTable = mysqlTable('messages',{
  id: int().primaryKey().autoincrement(),
  name: varchar('name', {length: 255}).notNull(),
  email: varchar('email', {length: 255}).notNull(),
  subject: varchar('subject', {length: 500}),
  content: text('message').notNull(),
  unread: boolean().default(true)
})

export const newLetterEmail = mysqlTable('emails', {
  id: int().primaryKey().autoincrement(),
  email: varchar('name', {length: 255}).notNull(),
})

