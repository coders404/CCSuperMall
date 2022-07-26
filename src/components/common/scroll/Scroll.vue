<template>
  <div class="warpper" ref="warpper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BSscroll from 'better-scroll'

export default {
  name: "Scroll",

  data() {
    return {
      bs: null,
    }
  },

  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: true
    }
  },

  mounted() {
    //* 创建示例对象
      this.bs = new BSscroll(this.$refs.warpper, {
        click: true,
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad
      })

    //* 监听页面距离滚动的视图距离
    this.bs.on('scroll',(position) => {
      // console.log(position);
      this.$emit('scroll', position);
    })

    //* 上拉加载更多 不在此处进行监听
    this.bs.on('pullingUp',() => {
      this.$emit('pullingUp');
    })
  },

  methods: {
    //* 封装回到顶部
    scrollTo(x,y, time = 400) {
      this.bs.scrollTo(x,y,time)
    },

    //* 封装加载更多
    finishPullUp() {
      this.bs.finishPullUp()
    }
  }

}
</script>

<style>
</style>

