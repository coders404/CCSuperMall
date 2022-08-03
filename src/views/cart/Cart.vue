<template>
  <div class="cart">
		<!-- 导航部分不需滚动 -->
		<nav-bar class="cart-nav">
			<div slot="center">购物车({{cartLength}})</div>
		</nav-bar>
		<scroll class="cart-content" ref="scroll">
			<cart-list></cart-list>
		</scroll>
		<cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
import CartList from './childComps/CartList.vue'
import CartBottomBar from './childComps/CartBottomBar.vue'

import NavBar from "components/common/navbar/NavBar.vue"
import Scroll from 'components/common/scroll/Scroll.vue'
import { mapGetters } from "vuex"
export default {
  name: "Cart",
  components: {
		NavBar,
		Scroll,
		CartList,
		CartBottomBar
	},
	data() {
		return {

		}
	},
	activated() {
		this.$refs.scroll.refresh()
	},
  computed: {
		...mapGetters({
			//! this.cartLength 映射为 this.$store.getters.CartLength
			cartLength: 'CartLength',
		})
  },
};
</script>

<style scopes>
.cart {
	height: 100vh;
}
.cart-nav {
	background: var(--color-tint);
	left: 0;
	top: 0;
	right: 0;
	z-index: 10;
}
.cart-nav div {
	color: #fff;
	font-size: 22px;
	font-weight: 600;
}
.cart-content{
    height: calc(100% - 44px - 49px - 44px);
    overflow: hidden;
}
</style>
