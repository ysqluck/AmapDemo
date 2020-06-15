<template>
  <div :id="geoId" style="width:100%;height:100%"></div>
</template>
<script>
export default {
  data() {
    return {
      geoId: this.randomString(),
      amap: "" //amap实例
    };
  },
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      this.amap = new AMap.Map(this.geoId, {
        mapStyle: "amap://styles/1de318cbb8d12c02303a22c550b9ccc9",
        // features: ["bg", "road"],
        center: [116.40866, 39.87596],
        zoom: 11,
        pitch: 66,
        rotation: 45,
        viewMode: "3D"
      });

      const layer = new Loca.LinkLayer({
        map: this.amap,
        fitView: false
      });
      //数据获取
      this.$http.get("../../../Mock/linerAmap.json").then(res => {
        layer.setData(res.data.slice(0, 5000), { lnglat: "lnglat" });
        layer.setOptions({
          blendMode: "lighter",
          style: {
            // 曲率 [-1, 1] 区间
            curveness: function(data) {
              if (data.value.dis < 100) {
                return 0.07;
              } else if (data.value.dis < 300) {
                return 0.05;
              } else if (data.value.dis < 500) {
                return 0.02;
              } else if (data.value.dis < 700) {
                return 0.01;
              } else {
                return 0.005;
              }
            },
            opacity: 0.8,
            color: "blue"
          }
        });

        layer.render();
      });
    }
  }
};
</script>
<style lang="scss" scoped>
</style>