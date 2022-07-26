<template>
  <div class="recommend">
    <div v-for="(item, index) in recommends" :key="index" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" alt="">
      </a>
      <div class="recommend-title">{{item.title}}</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'HomeRecommendView',
  props: {
    recommends: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>
<style>
  .recommend {
    display: flex;
    text-align: center;
    font-size: 16px;
    margin-top: 8px;
    margin-bottom: 10px;
  }
  .recommend-item {
    flex: 1;
  }
  .recommend-item img {
    width: 65px;
    height: 65px;
  }
  .recommend-title {
    margin-top: 5px;
  }
</style>