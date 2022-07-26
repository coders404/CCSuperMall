<template>
  <div class="tab-controller">
    <div v-for="(item, index) in titles" :key="index" class="tab-controller-item" :class="{ active: counter === index }"
      @click="addClick(index)
      ">
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabController",
  props: {
    titles: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      counter: 0
    }
  },
  methods: {
    addClick(index) {
      this.counter = index
      this.$emit('addClick', index)
    },
  }
}
</script>

<style scoped>
.tab-controller {
  display: flex;
  text-align: center;
}

.tab-controller-item {
  flex: 1;
}

.active {
  color: var(--color-height-text);
}

.active span {
  border-bottom: 1px solid var(--color-height-text);
  padding: 5px;
}
</style>