<template>
  <div id="detialnavbar">
    <nav-bar>
      <div slot="center" class="title" >
        <img 
          src="@/assets/img/common/back.svg" 
          alt="" 
          @click="backClick">
        <div 
         v-for="(item,index) in titles" 
         :key="index"
         class="title-item"
         :class="{active:currentIndex === index}"
         @click="titleClick(index)">{{item}}</div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue'
export default {
  name: 'DetailNavBar',
  components: {
    NavBar
  },
  data() {
    return {
      titles: ['商品','参数','评论','推荐'],
      currentIndex: 0
    }
  },
  methods: {
    titleClick(index) {
      this.currentIndex = index
    },
    backClick() {
      this.$router.back()
    }  
  }
}
</script>

<style scoped>
.title {
  display: flex;
  font-size: 15px;
  /*看个人审美 可加 */
  /* padding-left: 40px;
  padding-right: 40px; */
}
.title-item {
  flex: 1;
}
.active {
  color: #ff8d96;
}
</style>