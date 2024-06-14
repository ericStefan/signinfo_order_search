<template>
  <div id="app">
    <Header><span>赛恩客户采购态势智慧分析系统</span> </Header>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
    
  }
}
</script>

<style lang="scss" scoped>
  #app{
    width: 100%;
  }

  Header{
    height: 80px;
    margin: 0px;  
    font-size:max(0.5em, min(2em, calc(100vw * 4 / 75)));
    color: #fff;
    background-color: #000000;
    display: flex;
    justify-content:center;
    align-items: center;
  }

</style>
