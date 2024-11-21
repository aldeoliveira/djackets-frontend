import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ProductView from '@/views/ProductView.vue'
import CategoryView from '@/views/CategoryView.vue'
import Search from '@/views/Search.vue'
import Cart from '@/views/Cart.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/search',
    name: 'Search',
    component: Search
  },
  {
    path: '/cart/',
    name: 'Cart',
    component: Cart
  },
  {
    path: '/:category_slug/:product_slug/',
    name: 'Product',
    component: ProductView
  },
  {
    path: '/:category_slug/',
    name: 'Category',
    component: CategoryView
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
