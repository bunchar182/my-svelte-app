<script>
  // ส่วนของข้อมูล (State)
  let name = 'Svelte';

  // ฟังก์ชันเปลี่ยนชื่อ
  function changeName() {
    name = 'นักเขียนโค้ดมือใหม่55!';
  }
</script>

<div class="card">
  <h2>สวัสดี {name} 👋</h2>
  <button on:click={changeName}>
    เปลี่ยนชื่อ
  </button>
</div>

<style>
  .card {
    padding: 20px;
    border: 2px solid #ff3e00; /* สีส้มของ Svelte */
    border-radius: 8px;
    text-align: center;
    margin-bottom: 20px;
  }
  
  h2 {
    color: #ff3e00;
  }
</style>