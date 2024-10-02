export default {
    path: 'account',
    component: () => import(/* webpackChunkName: 'account' */ './views/index.vue'),
    meta: {
        crumb: 'Account',
    },

    children: [
        {
            path: '',
            redirect: 'center',
        },

        {
            path: 'center',
            name: 'account.center',
            component: () => import(/* webpackChunkName: 'account' */ './views/center.vue'),
            meta: {
                title: 'Personal Center',
                crumb: 'Personal Center',
            },
        },

        {
            path: 'setting',
            name: 'account.setting',
            component: () => import(/* webpackChunkName: 'account' */ './views/setting.vue'),
            meta: {
                title: 'Personal Settings',
                crumb: 'Personal Settings',
            },
        },

        {
            path: 'security',
            name: 'account.security',
            component: () => import(/* webpackChunkName: 'account' */ './views/security.vue'),
            meta: {
                title: 'Security Settings',
                crumb: 'Security Settings',
            },
        },

        {
            path: 'leaf',
            component: () => import(/* webpackChunkName: 'account' */ './views/leaf.vue'),
            meta: { title: 'Page' },
        },
    ],
};
