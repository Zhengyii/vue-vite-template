<template>
  <div class="pageWapper" id="container">
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'loginLayout'
}
</script>
<style lang="less" scoped>
.pageWapper {
  width: 100%;
  .container {
    position: relative;
    min-width: 1440px;
    padding: 42px 60px;
    background: url('../assets/login-bg.png') center center no-repeat;
    background-size: cover;
    height: 100vh;
    min-height: 768px;
    margin: auto;
  }
}
</style>
