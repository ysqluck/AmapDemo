<template>
  <div class="home">
    <!-- <PointerAmap/> -->
    <Liner/>
  </div>
</template>

<script>
// import PointerAmap from '../components/Amap-scatterPointer/index'
import Liner from '../components/Amap-line/index'
export default {
  name: 'Home',
  components: {
    // PointerAmap,
    Liner
  }
}
</script>
<style scoped lang="scss">
.home{
  width:100%;
  height:100%
}
</style>
