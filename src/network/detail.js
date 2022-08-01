import { request } from './request'

//! 详情
export function getDetail(iid) {
  return request({
    url: '/detail/',
    params: {
      iid
    }
  })
}

//! 推荐
export function getRecommend() {
  return request({
    url: '/recommend'
  })
}


//! 复杂数据统一化
//! goods
export class Goods {
  constructor(itemInfo,columns,services) {
    this.title = itemInfo.title
    this.desc = itemInfo.desc
    this.newPrice = itemInfo.price
    this.oldPrice = itemInfo.oldPrice
    this.discount = itemInfo.discountDesc
    this.columns = columns
    this.services = services
    this.realPrice  = itemInfo.lowNowPrice
  }
}

//! Shops 
export class Shops {
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo
    this.name = shopInfo.name
    this.fans = shopInfo.cFans
    this.sells = shopInfo.cSells
    this.score = shopInfo.scorea
    this.goodsCount = shopInfo.cGoods
  }
}

//! GoodsParams
export class GoodsParams {
  constructor(info,rule) {
    this.info = info.set
    this.rule = rule
  }
}
