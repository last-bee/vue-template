<template>
  <div class="title">
    <!-- <img :src="download"> -->
    <!-- {{ title }} -->
    <router-view />
  </div>
</template>

<script>
  const download = require('./static/download.jpg')
  export default {
    data() {
      return {
        title: 'vue title',
        download
      }
    },
  }
</script>

<style lang="scss">
$color: red;
.title {
  color: $color;
  font-size: 24px;
  display: flex;
  img {
    width: 200px;
  }
}
</style>