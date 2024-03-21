import { http } from '@/utils/http'
import type { BannerItem, CategoryItem } from '@/types/home'
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
export const getHomeCategoryAPI = (distributionSite = 1) => {
  return http<CategoryItem[]>({
    method: 'GET',
    url: '/home/category/mutli',
  })
}
