<script lang="ts">
  import { onMount } from 'svelte';
  
  // นำเข้า Interface และ Service ที่เราจัดระเบียบไว้
  import type { Product } from './models/product';
  import { ProductService } from './services/product.service';

  let products: Product[] = []; 
  let cartCount: number = 0;
  let loading: boolean = true; 

  // ฟังก์ชันดึงข้อมูลที่หน้าเว็บ สั้นและอ่านง่ายขึ้นมาก
  async function loadData() {
    try {
      // เรียกใช้ Service ตัวเก่งของเรา
      products = await ProductService.getAllProducts(); 
    } catch (error) {
      alert("ไม่สามารถโหลดข้อมูลสินค้าได้ในขณะนี้");
    } finally {
      loading = false; 
    }
  }

  onMount(() => {
    loadData();
  });

  function addToCart() {
    cartCount += 1;
  }
</script>

<!-- ส่วน HTML ด้านล่างยังคงเหมือนเดิมทุกประการครับ -->
<!-- ... -->

<!-- แถบเมนูด้านบน (Navbar) -->
<nav class="navbar">
  <div class="logo">ARIGATO KIDS<span>SHOP</span></div>
  <div class="nav-links">
    <a href="#home">หน้าแรก</a>
    <a href="#shop">สินค้าทั้งหมด</a>
    <a href="#contact">ติดต่อเรา</a>
  </div>
  <button class="cart-btn">
    🛒 ตะกร้า ({cartCount})
  </button>
</nav>

<!-- ส่วนไฮไลท์แบนเนอร์ (Hero Section) -->
<header class="hero" id="home">
  <div class="hero-content">
    <h1>เสื้อผ้าใส่สบาย สไตล์น่ารัก</h1>
    <p>คอลเลกชันใหม่ล่าสุดสำหรับเจ้าตัวเล็ก เนื้อผ้านุ่ม อ่อนโยนต่อผิว ระบายอากาศได้ดีเยี่ยม</p>
    <button class="cta-btn">ช้อปเลยตอนนี้</button>
  </div>
</header>

<!-- ส่วนแสดงรายการสินค้า (Product Grid) -->
<main class="shop-section" id="shop">
  <h2>สินค้าแนะนำ</h2>
  
  {#if loading}
    <p class="loading-text">กำลังโหลดคอลเลกชันใหม่ล่าสุด...</p>
  {:else if products.length === 0}
    <p class="loading-text">ยังไม่มีสินค้าในระบบ</p>
  {:else}
    <div class="product-grid">
      {#each products as product}
        <div class="product-card">
          <div class="image-wrapper">
            {#if product.tag}
              <span class="badge {product.tag.toLowerCase()}">{product.tag}</span>
            {/if}
            <!-- ถ้าในฐานข้อมูลไม่มีรูป ให้ใส่รูป placeholder ป้องกันเว็บพัง -->
            <img src={product.image || 'https://via.placeholder.com/400x400?text=No+Image'} alt={product.name} />
          </div>
          <div class="product-info">
            <h3>{product.name}</h3>
            <p class="price">฿{product.price}</p>
            <button class="add-btn" on:click={addToCart}>+ เพิ่มลงตะกร้า</button>
          </div>
        </div>
      {/each}
    </div>
  {/if}
</main>

<!-- ส่วนล่างสุดของเว็บ (Footer) -->
<footer>
  <p>&copy; 2026 KidsMart. All rights reserved.</p>
</footer>

<style>
  /* ตั้งค่าพื้นฐาน */
  :global(body) {
    margin: 0;
    font-family: 'Kanit', sans-serif;
    background-color: #fcfcfc;
    color: #333;
  }

  /* Navbar */
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.2rem 5%;
    background: white;
    box-shadow: 0 2px 10px rgba(0,0,0,0.05);
    position: sticky;
    top: 0;
    z-index: 100;
  }
  .logo {
    font-size: 1.5rem;
    font-weight: bold;
    color: #2c3e50;
  }
  .logo span {
    color: #ff6b6b;
  }
  .nav-links a {
    margin: 0 1rem;
    text-decoration: none;
    color: #555;
    font-weight: 500;
    transition: color 0.3s;
  }
  .nav-links a:hover {
    color: #ff6b6b;
  }
  .cart-btn {
    background: #ff6b6b;
    color: white;
    border: none;
    padding: 0.6rem 1.2rem;
    border-radius: 20px;
    cursor: pointer;
    font-weight: bold;
    transition: transform 0.2s, background 0.3s;
  }
  .cart-btn:hover {
    background: #ff5252;
    transform: scale(1.05);
  }

  /* Hero Section */
  .hero {
    background: linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%);
    padding: 6rem 5%;
    text-align: center;
    margin-bottom: 3rem;
  }
  .hero h1 {
    font-size: 3rem;
    color: #2c3e50;
    margin-bottom: 1rem;
  }
  .hero p {
    font-size: 1.2rem;
    color: #666;
    max-width: 600px;
    margin: 0 auto 2rem auto;
    line-height: 1.6;
  }
  .cta-btn {
    background: #2c3e50;
    color: white;
    font-size: 1.1rem;
    padding: 0.8rem 2rem;
    border: none;
    border-radius: 30px;
    cursor: pointer;
    transition: background 0.3s;
  }
  .cta-btn:hover {
    background: #1a252f;
  }

  /* Product Section */
  .shop-section {
    padding: 0 5%;
    max-width: 1200px;
    margin: 0 auto;
    min-height: 400px;
  }
  .shop-section h2 {
    font-size: 2rem;
    text-align: center;
    margin-bottom: 2.5rem;
    color: #2c3e50;
  }
  .loading-text {
    text-align: center;
    font-size: 1.2rem;
    color: #666;
    padding: 2rem;
  }
  .product-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    margin-bottom: 4rem;
  }
  .product-card {
    background: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 15px rgba(0,0,0,0.04);
    transition: transform 0.3s, box-shadow 0.3s;
  }
  .product-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0,0,0,0.1);
  }
  .image-wrapper {
    position: relative;
    height: 250px;
    overflow: hidden;
  }
  .image-wrapper img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s;
  }
  .product-card:hover .image-wrapper img {
    transform: scale(1.08);
  }
  .badge {
    position: absolute;
    top: 10px;
    right: 10px;
    padding: 0.3rem 0.8rem;
    border-radius: 20px;
    color: white;
    font-size: 0.8rem;
    font-weight: bold;
    z-index: 1;
  }
  .badge.new { background: #4caf50; }
  .badge.bestseller { background: #ff9800; }
  .badge.sale { background: #f44336; }

  .product-info {
    padding: 1.5rem;
    text-align: center;
  }
  .product-info h3 {
    margin: 0 0 0.5rem 0;
    font-size: 1.1rem;
    color: #333;
  }
  .price {
    font-size: 1.2rem;
    font-weight: bold;
    color: #ff6b6b;
    margin-bottom: 1rem;
  }
  .add-btn {
    width: 100%;
    padding: 0.6rem;
    background: white;
    border: 2px solid #2c3e50;
    color: #2c3e50;
    border-radius: 6px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s;
  }
  .add-btn:hover {
    background: #2c3e50;
    color: white;
  }

  /* Footer */
  footer {
    text-align: center;
    padding: 2rem;
    background: #2c3e50;
    color: white;
  }
</style>