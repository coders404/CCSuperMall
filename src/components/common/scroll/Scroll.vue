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
  data() {
    return {
      bs: null,
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
    if (this.probeType == 2 || this.probeType == 3) {
      this.bs.on('scroll', (position) => {
        this.$emit('scroll', position);
      })
    }

    //* 上拉加载 pullingUp
    if (this.pullUpLoad) {
      this.bs.on('pullingUp', () => {
        this.$emit('pullingUp')
      })
    }
  },

  methods: {
    //* 封装回到顶部
    scrollTo(x, y, time = 400) {
      //* 判断有值没有
      this.bs.scrollTo(x, y, time)
    },
    refresh() {
      this.bs.refresh()
    },
    finishPullUp() {
      this.bs.finishPullUp()
    }
  }

}
</script>

<style>
</style>

