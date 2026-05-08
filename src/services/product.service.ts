// src/services/product.service.ts
import { db } from '../firebase'; 
import { collection, getDocs } from 'firebase/firestore';
import type { Product } from '../models/product';

export const ProductService = {
  
  // ฟังก์ชันสำหรับดึงข้อมูลสินค้าทั้งหมด
  async getAllProducts(): Promise<Product[]> {
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      let products: Product[] = [];
      
      querySnapshot.forEach((doc) => {
        products.push({ id: doc.id, ...doc.data() } as Product);
      });
      
      return products; // ส่ง Array ของสินค้ากลับไปให้คนเรียกใช้
    } catch (error) {
      console.error("Firebase Error (getAllProducts):", error);
      throw error; // โยน Error กลับไปให้ฝั่งหน้าเว็บจัดการต่อ
    }
  }

  // อนาคตเราสามารถเพิ่มฟังก์ชันอื่นๆ ไว้ที่นี่ได้เลย เช่น:
  // async getProductById(id: string) { ... }
  // async addProduct(product: Product) { ... }

};