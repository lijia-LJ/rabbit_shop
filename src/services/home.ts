import { http } from '@/utils/http'
import type { BannerItem, CategoryItem, HotItem } from '@/types/home'
// 封装首页轮播图请求
export const getHomeBannerAPI = (distributionSite = 1) => {
  return http<BannerItem[]>({
    method: 'GET',
    url: '/home/banner',
    data: {
      distributionSite,
    },
  })
}
// 封装首页分类请求
export const getHomeCategoryAPI = () => {
  return http<CategoryItem[]>({
    method: 'GET',
    url: '/home/category/mutli',
  })
}
// 封装首页热门请求
export const getHomeHotAPI = () => {
  return http<[HotItem]>({
    method: 'GET',
    url: '/home/hot/mutli',
  })
}
