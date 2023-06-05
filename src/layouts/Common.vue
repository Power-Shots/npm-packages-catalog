<template>
  <div class="common-layout">
    
    <Header />
    <Main />
    <Footer/>
  </div>
</template>

<script setup>
import Header from "./subComponents/Header.vue";
import Main from "./subComponents/Main.vue";
import Footer from "./subComponents/Footer.vue";
</script>

<style lang="scss" scoped>
  .common-layout {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
</style>
