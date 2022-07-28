<template>
	<div id="home">
		<nav-bar class="home-nav">
			<div slot="center">购物车</div>
		</nav-bar>
		<!--这里是直接复制出来一份 实现吸顶效果 -->
		<tab-controller 
				:titles="['新款', '流行', '精选']" 
				@addClick="tabClick" 
				ref="tabControl1"
				class="tab-control"
				v-show="tabFixed"
				></tab-controller>
		<scroll 
			class="content" 
			ref="scroll" 
			:probeType="3" 
			@scroll="contentScroll" 
			:pull-up-load="true"
			@pullingUp="loadMore">
			<home-swiper 
				:banners="banners" 
				@swiperImageLoad="swiperImageLoad"
				ref="swiper"
			></home-swiper>
			<home-recommend-view :recommends="recommends"></home-recommend-view>
			<home-feature />
			<tab-controller 
				:titles="['新款', '流行', '精选']" 
				@addClick="tabClick" 
				ref="tabControl2"
				></tab-controller>
			<goods-list :goods="goodsClick"></goods-list>
		</scroll>
		<back-top 
			@click.native="backClick" 
			v-show="showBackTop"></back-top>
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
			showBackTop: false,
			offsetTop: 0,
			tabFixed: false,
			scrollY: 0
		}
	},
	created() {
		//* 请求多条数据
		this.getHomeMultidata()
		//* 请求单条数据
		this.getHomeGoods('pop')
		this.getHomeGoods('new')
		this.getHomeGoods('sell')
	},
	activated() {
		this.$refs.scroll.bs.scrollTo(0,this.scrollY,0)
	},
	deactivated() {
		this.scrollY = this.$refs.scroll.getScrollY()
	},
	computed: {
		goodsClick() {
			return this.goods[this.currentType].list
		}
	},
	mounted() {
		const refresh = this.debounce(this.$refs.scroll.refresh,50)
		//* 监听图片加载完成状态
		this.$bus.$on('imgmonitor', () => {
			//! 执行refresh函数
			refresh()
		})
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
			//! 这两个参数是为了实现路由统一性 和顶部路由实现一致性
			this.$refs.tabControl1.currentIndex = index
			this.$refs.tabControl2.currentIndex = index
		},
		backClick() {
			this.$refs.scroll.scrollTo(0, 0)
		},
		contentScroll(position) {
			//* 细节隐式转换
			this.showBackTop = (-position.y) > 1500
			this.tabFixed = (-position.y) > this.offsetTop
		},
		swiperImageLoad() {
			//! 组件里面通过$el获取元素
			this.offsetTop = this.$refs.tabControl2.$el.offsetTop
		},
			//! 上拉加载更多
		loadMore() {
			this.getHomeGoods(this.currentType)
		},

		//! 封装debounce函数
		debounce(func, delay) {
			let timer = null
			return function (...args) {
				if (timer) clearTimeout(timer)
				timer = setTimeout(() => {
					func.apply(this, args)
				}, delay);
			}
		},
		//! 网路请求封装相关方法
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
				//* 加载完成一页之后better-scroll就不会在进行加载了 需要调用finishPullUp 函数重新加载
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
	/*使用原生滚动的时候需要固定定位 使用better-scroll实现了局部滚动  就不需要使用固定定位 */
	/* position: fixed; */
	left: 0;
	top: 0;
	right: 0;
	z-index: 10;
}
.content {
	height: calc(100% - 93px);
	margin-top: 44px;
	overflow: hidden;
	position: absolute;
	bottom: 49px;
}
.tab-control {
	position: relative;
	z-index: 10;
	background-color: #fff;
	height: 30px;
	margin-top: -1px;
	padding-top: 5px;
}
</style>