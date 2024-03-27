<script setup lang="ts">
//引入首页导航区域
import XtxSwiper from '@/components/XtxSwiper.vue'
import CustomNavbar from './components/CustomNavbar.vue'
import { getHomeBannerAPI, getHomeCategoryAPI, getHomeHotAPI } from '@/services/home'
import { onLoad } from '@dcloudio/uni-app'
import type { BannerItem, CategoryItem, HotItem } from '@/types/home'
import { ref } from 'vue'
import type { XtxGuessInstance } from '@/types/component'
import CategoryPanel from '@/pages/index/components/CategoryPanel.vue'
import HotPanel from '@/pages/index/components/HotPanel.vue'
import PageSkeleton from '@/pages/index/components/PageSkeleton.vue'

//调接口获取轮播图数据
const bannerList = ref<BannerItem[]>([])
const getHomeBannerData = async () => {
  const res = await getHomeBannerAPI()
  bannerList.value = res.result
}

//是否开启骨架屏
const isLoading = ref(false)

//调接口获取分类数据
const categoryList = ref<CategoryItem[]>([])
const getHomeCategoryAPIData = async () => {
  const res = await getHomeCategoryAPI()
  categoryList.value = res.result
}

//调接口获取热门数据
const hotList = ref<HotItem[]>([])
const getHomeHotAPIData = async () => {
  const res = await getHomeHotAPI()
  hotList.value = res.result
}

//页面加载时
onLoad(async () => {
  isLoading.value = true
  await Promise.all([getHomeBannerData(), getHomeCategoryAPIData(), getHomeHotAPIData()])
  isLoading.value = false
})

// 猜你喜欢滚动触底时触发
const guessRef = ref<XtxGuessInstance>() // 猜你喜欢组件实例
const onScrolltolower = () => {
  console.log('触底啦~')
  // 父调子的方法
  guessRef.value?.getMore()
}

// 添加下拉刷新
// 动画的状态
const isTriggered = ref(false)
const onRefresherrefresh = async () => {
  // 开启动画
  isTriggered.value = true
  // 重置猜你喜欢数据
  guessRef.value?.resetData()
  // 下拉刷新请求数据
  await Promise.all([
    getHomeBannerData(),
    getHomeCategoryAPIData(),
    getHomeHotAPIData(),
    guessRef.value?.getMore(),
  ])
  // 关闭动画
  isTriggered.value = false
}
</script>

<template>
  <!-- 自定义导航栏 -->
  <CustomNavbar></CustomNavbar>
  <!-- 滚动容器 1、设置滚动方向 2、设置滚动区域高度-->
  <scroll-view
    class="scroll-view"
    scroll-y
    @scrolltolower="onScrolltolower"
    refresher-enabled
    @refresherrefresh="onRefresherrefresh"
    :refresher-triggered="isTriggered"
  >
    <!-- 骨架屏 -->
    <PageSkeleton v-if="isLoading"></PageSkeleton>
    <template v-else>
      <!-- 自定义轮播图 -->
      <XtxSwiper :list="bannerList"></XtxSwiper>
      <!-- 分类面板 -->
      <CategoryPanel :list="categoryList"></CategoryPanel>
      <!-- 热门推荐 -->
      <HotPanel :list="hotList"></HotPanel>
      <!-- 猜你喜欢 -->
      <XtxGuess ref="guessRef"></XtxGuess>
    </template>
  </scroll-view>
</template>

<style lang="scss">
page {
  background-color: #f7f7f7;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.scroll-view {
  flex: 1;
}
</style>
