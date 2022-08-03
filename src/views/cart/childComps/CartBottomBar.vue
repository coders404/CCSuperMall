<template>
  <div class="bottom-bar">
    <div class="allcheck">
      <check-button
        class="check-item"
        :isChecked="selectAll"
        @click.native="checkClick"
      />
      <span>全选</span>
    </div>
    <div class="totalPrice">
      <p>合计：￥{{ totalPrice }}</p>
    </div>
    <div class="close">去结算({{ cartLength }})</div>
  </div>
</template>
<script>
import CheckButton from "components/content/CheckButton.vue";
import { mapGetters } from "vuex";

export default {
  name: "CartBottomBar",
  data() {
    return {
      isChecked: true,
    };
  },
  components: {
    CheckButton,
  },
  computed: {
    ...mapGetters({
      totalPrice: "totalPrice",
      cartLength: "cartLength",
      CartList: "CartList",
    }),
    selectAll() {
      if (this.CartList.length == 0) return false;
      return !this.CartList.find((item) => !item.checked);
    },
  },
  methods: {
    checkClick() {
      if(this.selectAll) {
        this.CartList.forEach(item => {item.checked = false})
      }else {
        this.CartList.forEach(item => {item.checked = true})
      }
    },
  },
};
</script>
<style scoped>
.bottom-bar {
  display: flex;
  align-items: center;
  height: 44px;
  background: #f6f6f6;
  line-height: 44px;
}
.allcheck {
  width: 80px;
  display: flex;
  align-items: center;
}
.check-item {
  margin-left: 4px;
  margin-right: 4px;
  vertical-align: -3px;
}
.allcheck span {
  font-size: 15px;
}
.totalPrice {
  font-size: 17px;
  color: black;
}
.close {
  position: absolute;
  right: 0;
  background: #ff4500;
  width: 100px;
  text-align: center;
  color: #fff;
}
</style>
