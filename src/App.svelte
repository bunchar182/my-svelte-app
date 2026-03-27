<script>
  // นำเข้า Component ที่เราเพิ่งสร้าง
  import Hello from './Hello.svelte';
</script>

<main>
  <h1>ยินดีต้อนรับสู่แอปของฉัน</h1>
  
  <Hello />
  <Hello /> </main>

<style>
  main {
    max-width: 600px;
    margin: 0 auto;
    font-family: sans-serif;
  }
</style>