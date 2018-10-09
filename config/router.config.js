export default [
    {
        path: '/user',
        component: '../layouts/UserLayout',
        routes: [
            { path: '/user', redirect: '/user/login' },
            { path: '/user/login', component: './User/Login' },
        ]
    },
    {
        path: '/',
        component: '../layouts/BasicLayout',
        routes: [
            { path: '/', redirect: '/helloworld' },
            {
                path: '/helloworld',
                name: '样例',
                icon: 'pie-chart',
                component: './HelloWorld',
            },
            {
                path: '/dashboard',
                name: 'Dashboard',
                icon: 'dashboard',
                routes: [
                    { path: '/dashboard/analysis', name: '分析页', component: './Dashboard/Analysis' },
                    { path: '/dashboard/monitor', name: '监控页', component: './Dashboard/Monitor' },
                    { path: '/dashboard/workplace', name: '工作台', component: './Dashboard/Workplace' },
                ]
            },
            {
                path: '/puzzlecard',
                name: '对话框',
                icon: 'pie-chart',
                component: './puzzlecards'
            },
            {
                path: '/archive',
                name: '档案利用',
                icon: 'dashboard',
                routes: [
                    {
                        path: '/archive/register',
                        name: '查阅单登记',
                        component: './Archive/Register',
                    },
                    {
                        path: '/archive/manage',
                        name: '查阅单管理',
                        component: './Archive/Manage',
                    }
                ]
            }
        ]

    }
]