import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('views/home/Home')
const Cart = () => import('views/cart/Cart')
const CateGory = () => import('views/cate/CateGory')
const ProFile = () => import('views/profile/Profile')

Vue.use(VueRouter)

const routes = [
    {
        path: '',
        redirect: '/home'
    },
    {
        path: '/home',
        component: Home
    },
    {
        path: '/cateGory',
        component: CateGory
    },
    {
        path: '/cart',
        component: Cart
    },
    {
        path: '/profile',
        component: ProFile
    },
]

const router = new VueRouter({
	routes,
	mode: 'history'
})




export default router 