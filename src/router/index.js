import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";

Vue.use(VueRouter);

const routes = [{
    path: "/",
    name: "home",
    component: HomeView,
    children: [{
      path: "/homeindex",
      name: "homeindex",
      component: () => import("@/views/homeIndex/HomeIndex.vue")
    }, {
      path: "2-1",
      meta: ['数据管理', "用户列表"],
      component: () => import("@/views/homeIndex/HomeUser.vue")
    }, {
      path: "2-2",
      meta: ['数据管理', "商铺列表"],
      component: () => import("@/views/homeIndex/HomeShop.vue")
    }, {
      path: "2-3",
      meta: ['数据管理', "食品列表"],
      component: () => import("@/views/homeIndex/HomeFood.vue")
    }, {
      path: "2-4",
      meta: ['数据管理', "订单列表"],
      component: () => import("@/views/homeIndex/HomeOrder.vue")
    }, {
      path: "2-5",
      meta: ['数据管理', "管理员列表"],
      component: () => import("@/views/homeIndex/HomePerson.vue")
    }]
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import( /* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/MyLogin.vue")
  }
];

const router = new VueRouter({
  routes,
});
router.beforeEach((to, from, next) => {
  if (to.path === "/login") {
    next()
  } else {
    let token = localStorage.getItem("token");
    if (!token) return next({
      path: "/login"
    })
    if (token) return next()
  }
})
export default router;