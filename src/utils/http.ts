// 添加拦截器：
// 拦截request请求
// 拦截uploadFile文件上传

import { useMemberStore } from '@/stores'

//TODO
// 1、非http开头需要拼接地址
// 2、请求超时
// 3、添加小程序端请求头表示
// 4、添加token请求头表示
const baseURL = 'https://pcapi-xiaotuxian-front-devtest.itheima.net'
//拦截器配置
const httpInterceptor = {
  //拦截前触发invoke
  invoke(options: UniApp.RequestOptions) {
    //1、非http开头的路径要拼接上baseURL
    if (!options.url.startsWith('http')) {
      options.url = baseURL + options.url
    }
    // 2、请求超时,单位是毫秒
    options.timeout = 10000
    console.log(options)
    // 3、添加小程序端请求头表示
    options.header = {
      ...options.header, //防止原本的header被覆盖
      'source-client': 'miniapp',
    }
    // 4、添加token请求头表示
    // 用户登录成功才会返回一个token值
    const memberStory = useMemberStore()
    const token = memberStory.profile?.token
    if (token) {
      options.header.Authorization = token
    }
  },
}
//添加拦截器
uni.addInterceptor('request', httpInterceptor)
uni.addInterceptor('uploadFile', httpInterceptor)

/**
 * 请求函数
 * @param UniApp.RequestOptions
 * @returns Promise
 * 1.返回Promise对象
 * 2.请求成功
 *    2.1提取核心数据res.data
 *    2.2添加类型，支持泛型
 * 3.请求失败
 *    3.1 网络错误-》提示用户更换网络
 *    3.2 401错误-》清理用户信息，跳转至登录页
 *    3.3 其他错误-》根据后端返回错误信息轻提示
 */
interface Data<T> {
  code: string
  msg: string
  result: T
}
export const http = <T>(options: UniApp.RequestOptions) => {
  //1、返回Promise对象
  return new Promise<Data<T>>((resolve, reject) => {
    uni.request({
      ...options,
      //2.请求成功
      success(res) {
        // 2.1提取核心数据
        // 状态码为2开头的代表请求成功
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(res.data as Data<T>)
        } else if (res.statusCode === 401) {
          const memberStory = useMemberStore()
          //清理用户登录信息
          memberStory.clearProfile()
          // 跳转至登录页
          uni.navigateTo({ url: 'pages/login/login' })
          reject(res)
        } else {
          // 其他错误
          // 详情根据后端返回信息
          uni.showToast({
            icon: 'none',
            title: (res.data as Data<T>).msg || '请求错误',
          })
          reject(res)
        }
      },
      fail(err) {
        // 网络发生错误 提示用户检查网络
        uni.showToast({
          icon: 'none',
          title: '网络错误，请换个网试试',
        })
        reject(err)
      },
    })
  })
}
