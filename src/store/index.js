import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    //! 里面存储的直接就是payload这个对象
    cartList: []
  },
  mutations: {
    //* mutations中每个事件尽可能只做一间事，目的是为了更好的监听数据是哪个mutations修改的
    // addCount(state,payload) {
    //   let oldProduct = null
    //   //! 遍历所有项的iid
    //   for (let item of state.cartList) {
    //     if(item.iid === payload.iid) {
    //       oldProduct = item
    //     }
    //   }
    //   //! 如果没值就是else直接添加属性 下次遍历的时候 有count属性 直接进行++即可
    //   if(oldProduct) {
    //     oldProduct.count += 1
    //   }else {
    //     payload.count = 1
    //     //! 注意这里是最后进行判定的 所以是先走的循环在进行判定
    //     state.cartList.push(payload)
    //   }
    // },
    addCounter(state,payload) {
      //! 在这里面操作devtools是 可以追踪到的
      payload.count++
    },
    addToCart(state,payload) {
      payload.checked = true
      state.cartList.push(payload)
    }
  },
  actions: {
    addCount(context,payload) {
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
      if(oldProduct) {
        context.commit('addCounter',oldProduct)
      }else {
        //! 不要直接在actions直接修改state devtools监听不到
        payload.count = 1
        context.commit('addToCart',payload)
      }
    }
  },
  //! 映射为computed里面的属性
  getters: {
    CartLength(state) {
      return state.cartList.length
    },
    CartList(state) {
      return state.cartList
    },
    totalPrice(state) {
      if(state.cartList.length == 0) return 0
      return state.cartList.filter(item => {
        return item.checked
      }).reduce((pre,item) => {
        return pre + item.price * item.count
      },0)
    },
    cartLength(state) {
      if(state.cartList.length == 0) return 0
      return state.cartList.filter( item => {
       return item.checked 
      }).length
    }
  }
})

export default store