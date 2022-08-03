<template>
    <div class="cartlist" v-if="cartList.length!=0">
        <cart-list-item v-for="(item,index) in cartList" :key="index" :item="item"/>
    </div>
</template>

<script>
import CartListItem from './CartListItem.vue'
import { mapGetters } from 'vuex';
export default {
  name: 'CartList',
  components: {
    CartListItem
  },
  data() {
    return {
      
    };
  },
  computed: {
    ...mapGetters({
      cartList: 'CartList'
    })
  }
};
</script>

<style scoped>

</style>