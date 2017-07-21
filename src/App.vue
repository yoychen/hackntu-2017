<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
};
</script>

<style>
 body {
  background: white;
 }
 .btn:not(.btn-raised):not(.btn-link):hover, .input-group-btn .btn:not(.btn-raised):not(.btn-link):hover, .btn:not(.btn-raised):not(.btn-link):focus, .input-group-btn .btn:not(.btn-raised):not(.btn-link):focus {
   background-color: transparent;
 }
 .btn {
    outline: none !important;
 }
</style>
