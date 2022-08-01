<template>
    <swiper class="detail-swipper">
      <swiper-item v-for="item in topImages" :key="item.iid">
        <img :src="item" alt="">
      </swiper-item>
    </swiper>
</template>

<script>
import { Swiper, SwiperItem } from 'components/common/swiper'
export default {
  name: 'DetailSwipper',
  props: {
    topImages: {
      type: Array,
      default() {
        return []
      }
    }
  },
  components: {
    Swiper,
    SwiperItem
  }
}
</script>

<style scoped>
.detail-swipper {
  height: 250px;
  overflow: hidden;
}
</style>