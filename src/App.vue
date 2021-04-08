<template>
    <div id="app">
        <crud/>
    </div>
</template>

<script>
    import Crud from "./components/Crud";

    export default {
        components: {Crud}
    }
</script>

<style lang="scss">
    @import url('https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@400;600;700&display=swap');

    #app {
        font-family: 'Chakra Petch', sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;

    }
    p{
      font-size: 16px;
      font-weight: 600;
    }
    a {
        text-decoration: none;
        color: #2c3e50;
    }

    button {
      font-family: 'Chakra Petch', sans-serif;
        font-size: 16px;
        font-weight: 700;
        color: #2c3e50;
    }
    input, select{
        font-family: 'Chakra Petch', sans-serif;
        font-size: 16px;
    }
</style>
