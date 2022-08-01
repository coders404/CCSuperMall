<template>
  <div id="detail">
    <detail-nav-bar class="nav-bar" @navClick="navClick" ref="nav" />
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <detail-swipper :top-images="topImages"></detail-swipper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shops-info :shops="shops" ref="shops"></detail-shops-info>
      <detail-goods-info :detail-info="detailInfo" @imgLoad="imgLoad"></detail-goods-info>
      <detail-params-info :goods-params="goodsParams" ref="params"></detail-params-info>
      <detail-comments-info :comments-info="commentsInfo" ref="commend"></detail-comments-info>
      <detail-recommends :goods="recommends" ref="recommend"/>
      <goods-list :goods="recommend"></goods-list>
    </scroll>
    <detail-bottom-bar></detail-bottom-bar>
    <back-top @click.native="backClick" v-show="showBackTop"></back-top>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwipper from './childComps/DetailSwipper.vue'
import DetailBaseInfo from './childComps/DetailBaseInfo.vue'
import DetailShopsInfo from './childComps/DetailShopsInfo.vue'
import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue'
import DetailParamsInfo from './childComps/DetailParamsInfo.vue'
import DetailCommentsInfo from './childComps/DetailCommentsInfo.vue'
import DetailRecommends from "./childComps/DetailRecommends";
import DetailBottomBar from './childComps/DetailBottomBar.vue'

import Scroll from 'components/common/scroll/Scroll.vue'

import {mixin} from 'assets/common/mixin'

//! 组件复用产生bug
//! import GoodsList from '../../components/content/Goods/GoodsList.vue'

import { getDetail, getRecommend, Goods, Shops, GoodsParams } from 'network/detail'

export default {
  name: 'Detail',
  components: {
    DetailNavBar,
    DetailSwipper,
    getDetail,
    Goods,
    DetailBaseInfo,
    Shops,
    DetailShopsInfo,
    DetailGoodsInfo,
    Scroll,
    DetailParamsInfo,
    DetailCommentsInfo,
    getRecommend,
    GoodsList: () => import('components/content/Goods/GoodsList.vue'),
    DetailRecommends,
    DetailBottomBar
  },
  mixins:[mixin],
  data() {
    return {
      iid: null,
      //! 存储轮播数据
      topImages: [],
      goods: {},
      shops: {},
      detailInfo: {},
      goodsParams: {},
      commentsInfo: {},
      recommends: {},//!商品推荐信息
      recommend: [],
      navOffTopsY: [],//! 存储navTbar跳转信息
      currentIndex: null
    }
  },
  created() {
    this.iid = this.$route.params.iid
    //! 详情页
    getDetail(this.iid).then(res => {
      const data = res.result
      //! 轮播数据
      this.topImages = data.itemInfo.topImages
      //! 商品数据
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
      //! 店铺数据
      this.shops = new Shops(data.shopInfo)
      //! 商品上身效果数据
      this.detailInfo = data.detailInfo
      //! 商品尺码数据
      this.goodsParams = new GoodsParams(data.itemParams.info, data.itemParams.rule)
      //! 获取评论信息展示
      //! 为0不获取页面进行展示
      if (data.rate.cRate !== 0) {
        this.commentsInfo = data.rate
      }
    })
    getRecommend().then(res => {
      this.recommend = res.data.list
    })
  },
  mounted() {
  },
  methods: {
    imgLoad() {
      //! 页面刷新完成 重新计算
      this.$refs.scroll.refresh()
      this.navOffTopsY = []
      this.navOffTopsY.push(0)
      this.navOffTopsY.push(this.$refs.params.$el.offsetTop)
      this.navOffTopsY.push(this.$refs.commend.$el.offsetTop)
      this.navOffTopsY.push(this.$refs.recommend.$el.offsetTop)
      //! number最大值
      this.navOffTopsY.push(Number.MAX_VALUE)
    },
    navClick(index) {
      this.$refs.scroll.scrollTo(0, -this.navOffTopsY[index], 300)
    },
    contentScroll(position) {
      //! 滚动切换标题
      const positionY = -position.y
      const length = this.navOffTopsY.length
      for (let i = 0; i < length - 1; i++) {
        //! hack写法
        if ((this.currentIndex !== i) && (positionY >= this.navOffTopsY[i] && positionY <= this.navOffTopsY[i + 1])) {
          this.currentIndex = i
          this.$refs.nav.currentIndex = this.currentIndex
        }
      }
      //! 是否显示回到顶部
			this.showBackTop = (-position.y) > 1500
    }
  }
}
</script>

<style  scoped>
#detail {
  /*相对自身位置定位 */
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}

.nav-bar {
  position: relative;
  z-index: 9;
  background-color: #fff;
}

.content {
  height: calc(100% - 44px);
}
</style>

