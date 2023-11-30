const routes = [
    {
        path:'/',
        redirect:'/monitor',
    },
    //主屏幕
    {
        path:'/monitor',
        component:() => import('@/views/Monitor/index.vue')
    },
    //测试路由
    {
        path:'/test',
        component:() => import('@/components/test.vue')
    }
]

export default routes