import register from './components/register.vue'
import login from './components/login.vue'
import dashboard from './components/dashboard.vue'
import portal from './components/portal.vue'
import applied from './components/applied.vue'
import request from './components/viewRequest.vue'
import resume from './components/resume.vue'

export default[
    {path:'/',component:login},
    {path:'/login',component:login},
    {path:'/register',component:register},
    {path:'/dashboard/:id',component:dashboard},
    {path:'/portal/:id',component:portal},
    {path:'/applied/:id',component:applied},
    {path:'/request/:id',component:request},
    {path:'/resume/:id',component:resume},
]