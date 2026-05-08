// src/interfaces/product.ts

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  tag?: string; // ใส่ ? เพราะบางสินค้าอาจจะไม่มี tag
}