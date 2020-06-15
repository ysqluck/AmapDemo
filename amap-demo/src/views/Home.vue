<template>
  <div class="home">
    <PointerAmap/>
  </div>
</template>

<script>
import PointerAmap from '../components/Amap-scatterPointer/index'
export default {
  name: 'Home',
  components: {
    PointerAmap
  }
}
</script>
<style scoped lang="scss">
.home{
  width:100%;
  height:100%
}
</style>
