import { http } from '@/utils/http.ts'
import type { BannerItem } from '@/types/home'
// 封装首页请求
export const getHomeBannerAPI = (distributionSite = 1) => {
  return http<BannerItem[]>({
    method: 'GET',
    url: '/home/banner',
    data: {
      distributionSite,
    },
  })
}
