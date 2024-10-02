import * as lodash from 'lodash';

export default { path: 'demo', component: require('cloud-ui.kubevue/src/layouts/l-wrapper.vue').default, children: [
    { path: '', redirect: 'detail' },
    /* 'detail' */
    { path: 'detail', component: () => import(/* webpackChunkName: "demo" */ './views/detail/index.vue'), name: 'demo.detail', meta: {title:'Details',crumb:'Details'}, children: [
        /* 'detail/:monitor?' */
        { path: ':monitor?', component: () => import(/* webpackChunkName: "demo" */ './views/detail/_monitor_.vue') },
        /* 'detail/info' */
        { path: 'info', component: () => import(/* webpackChunkName: "demo" */ './views/detail/info.vue'), meta: {crumb:'Detailed information'} },
        /* 'detail/monitor' */
        { path: 'monitor', meta: {crumb:'Monitor'} },
    ] },
    /* 'list' */
    { path: 'list', component: require('cloud-ui.kubevue/src/layouts/l-wrapper.vue').default, children: [
        { path: '', redirect: 'basic' },
        /* 'list/basic' */
        { path: 'basic', component: () => import(/* webpackChunkName: "demo" */ './views/list/basic.vue'), name: 'demo.list', meta: {title:'Basic List',crumb:'Basic List'} },
        /* 'list/localList' */
        { path: 'localList', component: () => import(/* webpackChunkName: "demo" */ './views/list/localList.vue'), name: 'demo.localList', meta: {title:'Local Pagination',crumb:'Local Pagination'} },
        /* 'list/tabs' */
        { path: 'tabs', component: require('cloud-ui.kubevue/src/layouts/l-wrapper.vue').default, meta: {title:'List Page',crumb:{title:'List Page'}}, children: [
            { path: '', redirect: 'basic' },
            /* 'list/tabs/basic' */
            { path: 'basic', name: 'demo.tabsList', meta: {title:'List Page',crumb:{title:'List Page'}} },
            /* 'list/tabs/localList' */
            { path: 'localList', name: 'demo.tabs.localList', meta: {title:'Local Paging',crumb:{title:'Local Paging'}} },
            /* 'list/tabs/noPageList' */
            { path: 'noPageList', name: 'demo.tabs.noPageList', meta: {title:'List page (no paging)', crumb:{title:'List page (no paging)'}} },
        ] },
    ] },
    /* 'micro' */
    { path: 'micro', component: require('cloud-ui.kubevue/src/layouts/l-wrapper.vue').default, children: [
        { path: '', redirect: 'cloud-admin-1**' },
        /* 'micro/cloud-admin-1**' */
        { path: 'cloud-admin-1**', component: () => import(/* webpackChunkName: "demo" */ './views/micro/cloud-admin-1++.vue') },
        /* 'micro/cloud-admin-2**' */
        { path: 'cloud-admin-2**', component: () => import(/* webpackChunkName: "demo" */ './views/micro/cloud-admin-2++.vue') },
    ] },
    /* 'list/=tabs/basic' */
    { path: 'list/tabs/basic', component: () => import(/* webpackChunkName: "demo" */ './views/list/=tabs/basic.vue') },
    /* 'list/=tabs' */
    { path: 'list/tabs', component: () => import(/* webpackChunkName: "demo" */ './views/list/=tabs/index.vue') },
    /* 'list/=tabs/localList' */
    { path: 'list/tabs/localList', component: () => import(/* webpackChunkName: "demo" */ './views/list/=tabs/localList.vue') },
    /* 'list/=tabs/noPageList' */
    { path: 'list/tabs/noPageList', component: () => import(/* webpackChunkName: "demo" */ './views/list/=tabs/noPageList.vue') },
    /* 'form' */
    { path: 'form', component: require('cloud-ui.kubevue/src/layouts/l-wrapper.vue').default, meta: {title:'Form',crumb:'Form'}, children: [
        { path: '', redirect: 'basic' },
        /* 'form/basic' */
        { path: 'basic', component: () => import(/* webpackChunkName: "demo" */ './views/form/basic.vue'), meta: {title:'Basic Form',crumb:'Basic Form'} },
        /* 'form/setting' */
        { path: 'setting', component: () => import(/* webpackChunkName: "demo" */ './views/form/setting.vue'), name: 'demo.form.setting', meta: {title:'Settings',crumb:'Settings'} },
    ] },
    /* 'router' */
    { path: 'router', component: require('cloud-ui.kubevue/src/layouts/l-wrapper.vue').default, meta: {title:'Route',crumb:'Route',locks:[{include:[/router/],params:['search','demo.router.list.page']}]}, children: [
        { path: '', redirect: 'list' },
        /* 'router/list' */
        { path: 'list', component: () => import(/* webpackChunkName: "demo" */ './views/router/list.vue'), name: 'demo.router.list', meta: {title:'List (route)',crumb:'List (route)'} },
        /* 'router/setting' */
        { path: 'setting', component: () => import(/* webpackChunkName: "demo" */ './views/router/setting.vue'), name: 'demo.router.setting', meta: {title:'Settings',crumb:'Settings'} },
        /* 'router/detail' */
        { path: 'detail', component: () => import(/* webpackChunkName: "demo" */ './views/router/detail/index.vue'), name: 'demo.router.detail', meta: {title:'Details',crumb:'Details'}, children: [
            { path: '', redirect: 'info' },
            /* 'router/detail/info' */
            { path: 'info', component: () => import(/* webpackChunkName: "demo" */ './views/router/detail/info.vue'), meta: {crumb: 'Detailed information'} },
            /* 'router/detail/monitor' */
            { path: 'monitor', component: () => import(/* webpackChunkName: "demo" */ './views/router/detail/monitor.vue'), meta: {crumb:'Monitor'} },
        ] },
    ] },
] }