<template>
  <div style="width:100%;height:100%" :id="geoId"></div>
</template>
<script>
export default {
  data() {
    return {
      geoId: this.randomString(),
      amap: "" //地图实例
    };
  },
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      this.amap = new AMap.Map(this.geoId, {
        center: [116.400389, 39.93729], //地图中心点
        features: ["bg", "road"], //需要过滤option，可有可无
        mapStyle: "amap://styles/1de318cbb8d12c02303a22c550b9ccc9", //地图样式 可在高德api中自定义地图样式
        rotation: 0, //欧拉角 旋转角度
        zoom: 11.3, //缩放比例
        viewMode: "2D", //3D还是2D
        pitch: 0, //欧拉角 抬头角度
        skyColor: "#33216a" //3D地图的天空颜色
      });

      var layer = new Loca.ScatterPointLayer({
        map: this.amap
      });

      var colors = ["#07E8E4", "#AD92D1", "#3346BD", "#EBEB8D", "#7FC97F"];
      //csv数据输入
      //   this.$http("../../../Mock/pointerAmap.csv").then(res => {
      //     layer.setData(res.data, {
      //       lnglat: function(obj) {
      //         var value = obj.value;
      //         return [value["lng"], value["lat"]];
      //       },
      //       type: "csv"
      //     });
      //json数据输入
      this.$http("../../../Mock/pointerAmap.json").then(res => {
        layer.setData(res.data);
        layer.setOptions({
          unit: "px",
          style: {
            // 根据车辆类型设定不同半径
            radius: function(obj) {
              var value = obj.value;
              switch (parseInt(value.type)) {
                case 3:
                  return 3;
                case 4:
                  return 3;
                case 41:
                  return 3;
                case 5:
                  return 3;
                default:
                  return 3;
              }
            },
            height: 0,
            // 根据车辆类型设定不同填充颜色
            color: function(obj) {
              var value = obj.value;
              switch (parseInt(value.type)) {
                case 3:
                  return colors[0];
                case 4:
                  return colors[1];
                case 41:
                  return colors[2];
                case 5:
                  return colors[3];
                default:
                  return colors[4];
              }
            },
            opacity: 1
          }
        });

        layer.render();
      });
    }
  }
};
</script>