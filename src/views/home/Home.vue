<template>
	<div id="home">
		<nav-bar class="home-nav">
			<div slot="center">购物车</div>
		</nav-bar>
		<scroll 
		class="content" 
		ref="scroll" 
		:probeType="3" 
		@scroll="contentScroll"
		:pull-up-load="true"
		@pullingUp="loadMore"
		>
			<home-swiper :banners="banners"></home-swiper>
			<home-recommend-view :recommends="recommends"></home-recommend-view>
			<home-feature />
			<tab-controller :titles="['新款', '流行', '精选']" @addClick="tabClick"></tab-controller>
			<goods-list :goods="goodsClick"></goods-list>
		</scroll>
		<back-top @click.native="backClick" v-show="showBackTop"></back-top>
	</div>
</template>

<script>
//! Home页_子组件
import HomeSwiper from './childComps/HomeSwiper.vue'
import HomeRecommendView from './childComps/HomeRecommendView.vue'
import HomeFeature from './childComps/HomeFeature.vue'

//! content_项目复用组件
import TabController from 'components/content/TabController'
import GoodsList from 'components/content/Goods/GoodsList.vue'
import BackTop from 'components/content/BackTop.vue'

//! common_多项目复用组件
import NavBar from 'components/common/navbar/NavBar.vue'
import { getHomeMultidata, getHomeGoods } from 'network/home'
import Scroll from 'components/common/scroll/Scroll.vue'

export default {
	name: "Home",
	//! 注册组件
	components: {
		HomeSwiper,
		HomeRecommendView,
		HomeFeature,
		TabController,
		GoodsList,
		NavBar,
		Scroll,
		BackTop
	},

	data() {
		return {
			banners: [],
			recommends: [],
			goods: {
				'pop': { page: 0, list: [] },
				'new': { page: 0, list: [] },
				'sell': { page: 0, list: [] }
			},
			//! 设置一个仓库 存储每次的状态
			currentType: 'pop',
			showBackTop: false
		}
	},

	created() {
		//!异步操作
		//* 请求多条数据
		this.getHomeMultidata()

		//* 请求单条数据
		this.getHomeGoods('pop')
		this.getHomeGoods('new')
		this.getHomeGoods('sell')
	},
	computed: {
		goodsClick() {
			return this.goods[this.currentType].list
		}
	},

	methods: {
		//! 事件监听相关的方法
		tabClick(index) {
			switch (index) {
				case 0:
					this.currentType = 'pop'
					break;
				case 1:
					this.currentType = 'new'
					break;
				case 2:
					this.currentType = 'sell'
			}
		},

		backClick() {
			this.$refs.scroll.scrollTo(0,0)
		},

		contentScroll(position) {
			//* 细节 换我肯定想不到 太细了
			this.showBackTop = (-position.y) > 1500
		},

		loadMore() {
			// console.log('我现在又被加载了一次 立即执行');
			//* 这里直接执行之前已经封装好的getHomeGoods函数 数据自动累加 页码加值
			this.getHomeGoods(this.currentType)
			//* 图片异步加载完成之后 调用一次方法重新计算一下可滚动区域
			this.$refs.scroll.bs.refresh()
		},

		//! 网络请求方法
		getHomeMultidata() {
			getHomeMultidata().then(res => {
				this.banners = res.data.banner.list
				this.recommends = res.data.recommend.list
			})
		},

		getHomeGoods(type) {
			const page = this.goods[type].page + 1
			getHomeGoods(type, page).then(res => {
				// console.log(res);
				this.goods[type].list.push(...res.data.list)
				this.goods[type].page += 1
				//* 在执行完累加操作之后 重新调用一次scroll函数 不重新调用他不会执行第二次
				this.$refs.scroll.finishPullUp()
			})
		}
	}

}
</script>

<style scoped>
#home {
	height: 100vh;
	/* padding-top: 44px; */
}
.home-nav {
	background: var(--color-tint);
	position: fixed;
	left: 0;
	top: 0;
	right: 0;
	z-index: 10;
}

.content {
	height: calc(100% - 93px);
	margin-top: 44px;
	overflow: hidden;
}
</style>