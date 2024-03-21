// 存放首页广告数据类型
export type BannerItem = {
  /** 跳转链接 */
  hrefUrl: string
  /** id */
  id: string
  /** 图片链接 */
  imgUrl: string
  /** 跳转类型 */
  type: number
}

/** 首页-前台类目数据类型*/
export type CategoryItem = {
  // 图标路径
  icon: string
  // id
  id: string
  // 分类名称
  name: string
}
