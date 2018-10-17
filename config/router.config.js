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
        // Routes: ['src/pages/Authorized'],
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
                authority: ['user'],
                // hideChildrenInMenu: true,
                routes: [
                    { path: '/dashboard/analysis', name: '分析页', component: './Dashboard/Analysis',hideInMenu:true },
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
            },
            {
                path: 'form',
                name: '表单',
                icon: 'dashboard',
                component: './form',
            }
        ]

    }
]