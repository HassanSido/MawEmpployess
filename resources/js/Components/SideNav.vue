<template>
    <div class="sidenav">
        <a id="home" href="/home">home</a>
        <hr>
        <a id="empployees" href="/empployees">worker information</a>
        <hr>
        <a id="day" href="/day">day information</a>
        <hr>
        <a id="daily" href="/daily">daily database</a>
        <hr>
        <a id="monthly" href="/monthly">monthly database and salary</a>
        <hr>
        <a id="salary" href="/salary">salary</a>
        <hr>
        <a id="daysnote" href="/daysnote" class="">Days Note</a>

    </div>
</template>
<script>
setTimeout(()=>{$('#'+location.pathname.replace('/', '')).addClass('active')},1000);
</script>
