import BackTop from 'components/content/BackTop.vue'
export const mixin = {
  data() {
    return {
       showBackTop: false,  //! 点击回到顶部
    }
  },
  components: {
    BackTop
  },
  methods: {
    backClick() {
			this.$refs.scroll.scrollTo(0, 0)
		}
  }
}