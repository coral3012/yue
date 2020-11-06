import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)


const routes = [
  /* 跟页面是主页 路由重定向 */

  {
    path: "/",
    redirect: () => "/home",
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import("../components/Login"),
  },
  {
    path: '/reg',
    name: 'Reg',
    component: () => import("../components/Reg"),
  },
  /* 1、主页 */
  {
    path: "/home",
    name: "Home",
    component: () => import("../views/Home/index"),
    children: [
      {/* 个性装扮 */
        path: "/",
        redirect: "myStyle"
      },
      {/* 个性装扮 */
        path: "myStyle",
        name: "MyStyle",
        component: () => import("@/views/Home/MyStyle/index.vue")
      },{/* 歌单 */
        path: "listenList",
        name: "ListenList",
        component: () => import("@/views/Home/ListenList/index.vue")
      },{/* 主播电台 */
        path: "radio",
        name: "Radio",
        component: () => import("@/views/Home/Radio/index.vue")
      },{/* 排行榜 */
        path: "songTop",
        name: "SongTop",
        component: () => import("@/views/Home/SongTop/index.vue")
      }
    ]
  },
  {
    path: "/search",
    name: "Search",
    component: () => import("@/views/Search/index"),
  },
  /* 2、音乐页面 */
  {
    path: "/music",
    name: "Music",
    component: () => import("../views/Music/index"),

  },
  {
    path: '/playMusic/:id',
    name: "PlayM",
    component: () => import("@/views/Music/PlayMusic/index.vue"),
  },
  /* 3、朋友页面 */
  {
    path: "/firends",
    name: "Firends",
    component: () => import("../views/Firends/index"),
    meta: {
      needLogin: true,
    }
  },
  {
    path: "/video/:id",
    name: "Video",
    component: () => import("@/views/Video/index"),
  },
  /* 4、我的页面 */
  {
    path: "/mine",
    name: "Mine",
    component: () => import("../views/Mine/index"),
  },

]



const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this,location).catch(err => err)
}



//返回的地址不发生变更详情参照vant里面的api  scrollBehavior
const router = new VueRouter({
  routes,
  // mode: "history",
  scrollBehavior(to,from,savedPosition) {
    // console.log(savedPosition)这里的值是null
    if (savedPosition && localStorage.getItem('scrollTop') && document.querySelector('.firends_content')) {
      // return (0,localStorage.getItem('scrollTop'))
      document.querySelector('.firends_content').scrollTo(0,localStorage.getItem('scrollTop'))
      //再删除防止进入页面的有Localhost值位置变更
      localStorage.removeItem('scrollTop')

    }
    return { x: 0,y: 0 }
  }
})

router.beforeEach((to,from,next) => {
  if (to.meta.needLogin) {
    if (localStorage.getItem("token")) {
      next()
    } else {
      next({ name: "Login" })
    }
  } else {
    next()
  }
})


export default router
