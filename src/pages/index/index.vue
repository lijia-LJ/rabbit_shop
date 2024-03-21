<script setup lang="ts">
//引入首页导航区域
import XtxSwiper from '@/components/XtxSwiper.vue'
import CustomNavbar from './components/CustomNavbar.vue'
import { getHomeBannerAPI } from '@/services/home'
import { onLoad } from '@dcloudio/uni-app'
import type { BannerItem } from '@/types/home'
import { ref } from 'vue'
//掉接口获取轮播图数据
const bannerList = ref<BannerItem[]>([])
const getHomeBannerData = async () => {
  const res = await getHomeBannerAPI()
  bannerList.value = res.result
}
//页面加载时
onLoad(() => {
  getHomeBannerData()
})
</script>

<template>
  <CustomNavbar></CustomNavbar>
  <XtxSwiper :list="bannerList"></XtxSwiper>
  <view class="index">index</view>
</template>

<style lang="scss">
//
</style>
