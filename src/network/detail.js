import { request } from './request'

export function getDetail(iid) {
  return request({
    url: '/detail/',
    params: {
      iid
    }
  })
}

//! 封装商品物流区域Class类 复杂数据统一化
export class Goods {
  constructor(itemInfo,columns,shopInfo) {
    this.title = itemInfo.title
    this.desc = itemInfo.desc
    this.newPrice = itemInfo.price
    this.oldPrice = itemInfo.oldPrice
    this.discount = itemInfo.discountDesc
    this.columns = columns
    this.services = shopInfo.services
    this.realPrice  = itemInfo.lowNowPrice
  }
  
}