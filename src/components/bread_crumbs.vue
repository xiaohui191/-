<template>
  <div id="bread_crumbs">
    <div class="bread_crumbs_bar">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item v-for="(elem,index) in bread_crumbs_list" :key="index">{{elem}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
  </div>
</template>
<script>
export default {
  name: "bread_crumbs",
  data: () => ({

  }),
  props: ['bread_crumbs_list']
}
</script>
<style lang="scss" scoped>
</style>
