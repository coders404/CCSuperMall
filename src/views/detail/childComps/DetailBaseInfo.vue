<template>
  <div class="detail-info" v-if="Object.keys(goods).length!==0">
    <div class="detail-title">{{goods.title}}</div>
    <div class="price">
      <span class="new-price">{{goods.newPrice}}</span>
      <span class="old-price">{{goods.oldPrice}}</span>
      <span class="disc">{{goods.discount}}</span>
    </div>
    <!-- 错误总结:不做v-if="Object.keys(goods).length!==0"判断时,组件使用goods.column.length时可能goods为null
    此时报错:length undefined.所以使用对象时严谨起见最好先判断其是否为空-->
    <div class="columns">
      <span v-for="(item,index) in goods.columns.length-1" :key="index">{{goods.columns[item-1]}}</span>
      <span>{{goods.services[0].name}}</span>
    </div>
    <div class="service">
      <span v-for="(item,index) in goods.services.length-1" :key="index">
        <img :src="goods.services[item].icon" alt />
        {{goods.services[item].name}}
      </span>
    </div>
  </div>
</template>
<script>
export default {
  name: "DetailBaseInfo",
  props: {
    goods: {
      type: Object,
      default() {
        return {};
      }
    }
  },
};
</script>
<style scoped>
.detail-title {
  margin-top: 10px;
  font-weight: 550;
}
.price {
  margin-top: 10px;
}
.price .new-price {
  font-size: 22px;
  color: var(--color-tint);
}
.price .old-price {
  margin-left: 5px;
  font-size: 13px;
  text-decoration: line-through;
}
.price .disc {
  color: #fff;
  display: inline-block;
  padding: 2px 5px;
  text-align: center;
  border-radius: 10px;
  margin-left: 7px;
  background: var(--color-height-text);
  vertical-align: 5px;
}
.columns {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.6);
  padding-bottom: 8px;
  border-bottom: 1px solid rgba(100, 100, 100, 0.1);
}

.service {
  display: flex;
  justify-content: space-between;
  padding: 15px 0 15px 0;
  font-size: 14px;
  border-bottom: 4px solid #f6f6f6;
  color: #333;
}
.service img {
  width: 11px;
  height: 11px;
}
</style>