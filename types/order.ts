import type { Product } from "./products";

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "shipped"
  | "delivered"
  | "cancelled";

export type User = {
  name: string;
  email: string;
  phone: string;
};

export type Item = {
  product: Product
  quantity: number;

};

export type Address = {
  state: string;
  city: string;
  bustop: string;
  street_address: string;
};

export type Order = {
  id: string; // chage to number when working with db data
  user: User;
  items: Item[];
  status: OrderStatus;
  delivered: boolean;
  createdAt: string;
  totalAmount: number;
  deliveryAddress: Address;
};
