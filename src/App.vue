<template>
  <div id="app">
    <crud />
  </div>
</template>

<script>
  import Crud from "./components/Crud";
  export default {
    components: {Crud}
  }
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;

}
a{
  text-decoration: none;
  color: #2c3e50;
}
button{
  font-size: 16px;
  color: #2c3e50;
}
</style>
