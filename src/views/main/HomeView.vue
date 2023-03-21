<template>
  <div class="main"></div>
  <div class="ec2"></div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";
import * as echarts from "echarts";

let mChart: echarts.ECharts;
let mChart1: echarts.ECharts;

onMounted(() => {
  mChart = echarts.init(document.querySelector(".main")!);

  // prettier-ignore
  let dataAxis = ['点', '击', '柱', '子', '或', '者', '两', '指', '在', '触', '屏', '上', '滑', '动', '能', '够', '自', '动', '缩', '放'];
  // prettier-ignore
  let data = [220, 182, 191, 234, 290, 330, 310, 123, 442, 321, 90, 149, 210, 122, 133, 334, 198, 123, 125, 220];
  let yMax = 500;
  let dataShadow = [];
  for (let i = 0; i < data.length; i++) {
    dataShadow.push(yMax);
  }
  const option = {
    title: {
      text: "特性示例：渐变色 阴影 点击缩放",
      subtext: "Feature Sample: Gradient Color, Shadow, Click Zoom",
    },
    xAxis: {
      data: dataAxis,
      axisLabel: {
        inside: true,
        color: "#fff",
      },
      axisTick: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      z: 10,
    },
    yAxis: {
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        color: "#999",
      },
    },
    dataZoom: [
      {
        type: "inside",
      },
    ],
    series: [
      {
        type: "bar",
        showBackground: true,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "#83bff6" },
            { offset: 0.5, color: "#188df0" },
            { offset: 1, color: "#188df0" },
          ]),
        },
        emphasis: {
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "#2378f7" },
              { offset: 0.7, color: "#2378f7" },
              { offset: 1, color: "#83bff6" },
            ]),
          },
        },
        data: data,
      },
    ],
  };

  mChart.setOption(option);
  // Enable data zoom when user click bar.
  const zoomSize = 6;
  mChart.on("click", function (params) {
    console.log(dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)]);
    mChart.dispatchAction({
      type: "dataZoom",
      startValue: dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)],
      endValue: dataAxis[Math.min(params.dataIndex + zoomSize / 2, data.length - 1)],
    });
  });

  mChart1 = echarts.init(document.querySelector(".ec2")!);
  const option1 = {
    title: {
      text: "Basic Radar Chart",
    },
    legend: {
      data: ["Allocated Budget", "Actual Spending"],
    },
    radar: {
      // shape: 'circle',
      indicator: [
        { name: "Sales", max: 6500 },
        { name: "Administration", max: 16000 },
        { name: "Information Technology", max: 30000 },
        { name: "Customer Support", max: 38000 },
        { name: "Development", max: 52000 },
        { name: "Marketing", max: 25000 },
      ],
    },
    series: [
      {
        name: "Budget vs spending",
        type: "radar",
        data: [
          {
            value: [4200, 3000, 20000, 35000, 50000, 18000],
            name: "Allocated Budget",
          },
          {
            value: [5000, 14000, 28000, 26000, 42000, 21000],
            name: "Actual Spending",
          },
        ],
      },
    ],
  };

  mChart1.setOption(option1);
  mChart1.on("click", function (params) {
    console.log(params);
  });
});

onUnmounted(() => {
  console.log("onUnmonted");
  mChart.dispose();
  mChart1.dispose();
});
</script>

<style lang="less" scoped>
.main,
.ec2 {
  width: 600px;
  height: 400px;
}
</style>
