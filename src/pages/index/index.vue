<script setup lang="ts">
//引入首页导航区域
import XtxSwiper from '@/components/XtxSwiper.vue'
import CustomNavbar from './components/CustomNavbar.vue'
import { getHomeBannerAPI, getHomeCategoryAPI } from '@/services/home'
import { onLoad } from '@dcloudio/uni-app'
import type { BannerItem, CategoryItem } from '@/types/home'
import { ref } from 'vue'
import CategoryPanel from '@/pages/index/components/CategoryPanel.vue'

//调接口获取轮播图数据
const bannerList = ref<BannerItem[]>([])
const getHomeBannerData = async () => {
  const res = await getHomeBannerAPI()
  bannerList.value = res.result
}
//调接口获取分类数据
const categoryList = ref<CategoryItem[]>([])
const getHomeCategoryAPIData = async () => {
  const res = await getHomeCategoryAPI()
  categoryList.value = res.result
}
//页面加载时
onLoad(() => {
  getHomeBannerData(), getHomeCategoryAPIData()
})
</script>

<template>
  <CustomNavbar></CustomNavbar>
  <XtxSwiper :list="bannerList"></XtxSwiper>
  <CategoryPanel :list="categoryList"></CategoryPanel>
  <view class="index">index</view>
</template>

<style lang="scss">
page {
  background-color: #f7f7f7;
}
</style>
