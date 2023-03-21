<template>
  <div>
    <el-form :inline="true" :model="data.filter" class="demo-form-inline">
      <el-form-item label="筛选标题">
        <el-input v-model="data.filter.titleWord" placeholder="请输入关键字" />
      </el-form-item>
      <el-form-item label="筛选介绍">
        <el-input v-model="data.filter.introWord" placeholder="请输入关键字" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmitFilter">筛选</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="showList" border style="width: 100%">
      <el-table-column prop="id" label="ID" width="180" />
      <el-table-column prop="title" label="标记" width="180" />
      <el-table-column prop="introduce" label="介绍" />
    </el-table>

    <el-pagination
      layout="sizes, prev, pager, next"
      background
      :total="data.list.length"
      :page-size="data.pageSize"
      :page-sizes="[5, 10, 15, 20]"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      class="pager"
    />
  </div>
</template>

<script setup lang="ts">
import { reactive, computed, watch } from "vue";
import { storeToRefs } from "pinia";
import { useHomeStore } from "@/stores/home";
import type { GoodsRes } from "@/types/resp";
import { isEmpty } from "lodash";

interface GoodsData {
  filter: {
    titleWord: string;
    introWord: string;
  };
  list: GoodsRes[];
  page: number;
  pageSize: number;
}

const data = reactive<GoodsData>({
  filter: {
    titleWord: "",
    introWord: "",
  },
  list: [],
  page: 1,
  pageSize: 10,
});

const store = useHomeStore();
const { goodsList } = storeToRefs(store);
data.list = goodsList.value;

// 根据 page、pageSize 计算当前要显示的内容
const showList = computed(() => {
  const { page, pageSize, list } = data;
  const start = (page - 1) * pageSize;
  const end = page * pageSize;
  return list.slice(start, end);
});

// init data
if (isEmpty(goodsList.value)) {
  store.getGoodsList();
  watch(goodsList, () => (data.list = goodsList.value));
}

// events
const handleSizeChange = (val: number) => {
  data.pageSize = val;
};

const handleCurrentChange = (val: number) => {
  data.page = val;
};

const onSubmitFilter = () => {
  const { titleWord, introWord } = data.filter;
  if (!titleWord && !introWord) {
    data.list = goodsList.value;
    return;
  }
  let arr = goodsList.value;
  if (titleWord) {
    arr = arr.filter((item) => item.title.indexOf(titleWord) !== -1);
  }
  if (introWord) {
    arr = arr.filter((item) => item.introduce.indexOf(introWord) !== -1);
  }
  data.list = arr;
};
</script>

<style lang="less" scoped>
.pager {
  margin-top: 20px;
}
</style>
