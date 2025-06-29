type OrderStatus = 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';

type User ={
  id: string;
  name: string;
  email: string;
}

export type Item ={
  productId: string;
  name: string;
  quantity: number;
  price: number;
}

export type Address = {
  street: string;
  city: string;
  country: string;
  postalCode: string;
}

export type Order = {
  id: string;
  user: User;
  items: Item[];
  status: OrderStatus;
  delivered: boolean;
  createdAt: string;
  totalAmount: number;
  deliveryAddress: Address;
}


export const simpleOrders: Order[] = [
  {
    id: 'ORD-001',
    user: {
      id: 'USR-001',
      name: 'Alice Smith',
      email: 'alice@example.com',
    },
    items: [
      { productId: 'P001', name: 'T-Shirt', quantity: 2, price: 20 },
      { productId: 'P002', name: 'Hat', quantity: 1, price: 15 },
    ],
    status: 'confirmed',
    delivered: false,
    createdAt: '2025-06-27T10:00:00Z',
    totalAmount: 55,
    deliveryAddress: {
      street: '123 Main St',
      city: 'New York',
      country: 'USA',
      postalCode: '10001',
    },
  },
  {
    id: 'ORD-002',
    user: {
      id: 'USR-002',
      name: 'Bob Johnson',
      email: 'bob@example.com',
    },
    items: [
      { productId: 'P003', name: 'Sneakers', quantity: 1, price: 60 },
    ],
    status: 'delivered',
    delivered: true,
    createdAt: '2025-06-25T08:30:00Z',
    totalAmount: 60,
    deliveryAddress: {
      street: '456 Elm St',
      city: 'Chicago',
      country: 'USA',
      postalCode: '60601',
    },
  },
  {
    id: 'ORD-003',
    user: {
      id: 'USR-003',
      name: 'Charlie Davis',
      email: 'charlie@example.com',
    },
    items: [
      { productId: 'P004', name: 'Backpack', quantity: 1, price: 40 },
      { productId: 'P005', name: 'Notebook', quantity: 3, price: 5 },
    ],
    status: 'shipped',
    delivered: false,
    createdAt: '2025-06-26T13:15:00Z',
    totalAmount: 55,
    deliveryAddress: {
      street: '789 Oak Ave',
      city: 'San Francisco',
      country: 'USA',
      postalCode: '94102',
    },
  },
];
