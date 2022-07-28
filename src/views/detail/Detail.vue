<template>
  <div class="detail">
    <detail-nav-bar/>
    <detail-swipper :topImages="topImages"></detail-swipper>
    <detail-goods-info></detail-goods-info>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwipper from './childComps/DetailSwipper.vue'
import { getDetail,Goods } from 'network/detail'
import DetailGoodsInfo from './childComps/c.vue'
export default {
  name: 'Detail',
  components: {
    DetailNavBar,
    DetailSwipper,
    getDetail,
    Goods,
    DetailGoodsInfo
  },
  data() {
    return {
      iid: null,
      //* 定义数组存储轮播数据
      topImages: [],
      goods: {}
    }
  },
  created() {
    this.iid = this.$route.params.iid
    getDetail(this.iid).then(res => {
      //* 老是通过res.result获取数据太费劲 简写一下 因为result是数据入口必写参数
      const data = res.result
      this.topImages = data.itemInfo.topImages
      //! 通过new关键字创建Goods类 接收三个参数
      this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo)
      console.log(this.goods);
    })
  }
}
</script>

<style  scoped>
  
</style>

