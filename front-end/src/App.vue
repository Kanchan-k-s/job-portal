

<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script >
import register from './components/register.vue'
export default {
  components: {
    'register': register
  },
  data() {
    return {

    }
  }
}
</script>
<style scoped>

</style>
