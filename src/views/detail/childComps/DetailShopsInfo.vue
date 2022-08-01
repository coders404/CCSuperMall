<template>
  <div class="shops-info">
    <div class="shops-top">
      <img :src="shops.logo" />
      <span class="title">{{ shops.name }}</span>
    </div>
    <div class="shops-middle">
      <div class="shops-middle-item shops-middle-left">
        <div class="info-sells">
          <div class="sells-count">
            {{ sellsCount }}
          </div>
          <div class="sells-text">总销量</div>
        </div>
        <div class="info-goods">
          <div class="goods-count">
            {{ shops.fans }}
          </div>
          <div class="goods-text">全部宝贝</div>
        </div>
      </div>
      <div class="shops-middle-item shops-middle-right">
        <table>
          <tr v-for="(item, index) in shops.score" :key="index">
            <td>{{ item.name }}</td>
            <td class="score" :class="{ 'score-better': item.isBetter }">
              {{ item.score }}
            </td>
            <td class="better" :class="{ 'better-more': item.isBetter }">
              <span>{{ item.isBetter ? "高" : "低" }}</span>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div class="shops-bottom">
      <div class="enter-shops">进店逛逛</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailshopsInfo',
  props: {
    shops: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    sellsCount () {
      const value = this.shops.sells
      if(value < 10000) return value
      else return parseInt(value/10000) + '万'
    }
  }
};
</script>

<style scoped>
.shops-info {
  padding: 25px 8px;
  border-bottom: 5px solid #f2f5f8;
  border-top: 5px solid #f2f5f8;
}

.shops-top {
  line-height: 45px;
  /* 让元素垂直中心对齐 */
  display: flex;
  align-items: center;
}

.shops-top img {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.shops-top .title {
  margin-left: 10px;
  vertical-align: center;
}
.shops-middle {
  margin-top: 15px;
  display: flex;
  align-items: center;
}

.shops-middle-item {
  flex: 1;
}

.shops-middle-left {
  display: flex;
  justify-content: space-evenly;
  color: #333;
  text-align: center;
  border-right: 1px solid rgba(0, 0, 0, 0.1);
}

.sells-count,
.goods-count {
  font-size: 18px;
}

.sells-text,
.goods-text {
  margin-top: 10px;
  font-size: 12px;
}

.shops-middle-right {
  font-size: 13px;
  color: #333;
}

.shops-middle-right table {
  width: 120px;
  margin-left: 30px;
}

.shops-middle-right table td {
  padding: 5px 0;
}

.shops-middle-right .score {
  color: #5ea732;
}

.shops-middle-right .score-better {
  color: #f13e3a;
}

.shops-middle-right .better span {
  background-color: #5ea732;
  color: #fff;
  text-align: center;
}

.shops-middle-right .better-more span {
  background-color: #f13e3a;
}

.shops-bottom {
  text-align: center;
  margin-top: 10px;
}

.enter-shops {
  display: inline-block;
  font-size: 14px;
  background-color: #f2f5f8;
  width: 150px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  border-radius: 10px;
}
</style>