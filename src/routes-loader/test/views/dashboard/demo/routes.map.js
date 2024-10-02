import * as lodash from 'lodash';

export default {
    'list/basic': {
        name: 'demo.list',
        meta: {
            title: 'Basic List',
            crumb: 'Basic List',
        },
    },
    'list/localList': {
        name: 'demo.localList',
        meta: {
            title: 'Local Paging',
            crumb: 'Local Paging',
        },
    },
    'list/tabs': {
        meta: {
            title: 'List Page',
            crumb: {
                title: 'List Page',
            },
        },
    },
    'list/tabs/basic': {
        name: 'demo.tabsList',
        meta: {
            title: 'List Page',
            crumb: {
                title: 'List Page',
            },
        },
    },
    'list/tabs/localList': {
        name: 'demo.tabs.localList',
        meta: {
            title: 'Local Paging',
            crumb: {
                title: 'Local Paging',
            },
        },
    },
    'list/tabs/noPageList': {
        name: 'demo.tabs.noPageList',
        meta: {
            title: 'List Page (no paging)',
            crumb: {
                title: 'List Page (no paging)',
            },
        },
    },
    form: {
        meta: {
            title: 'Form',
            crumb: 'Form',
        },
    },
    'form/basic': {
        meta: {
            title: 'Basic Form',
            crumb: 'Basic Form',
        },
    },
    'form/setting': {
        name: 'demo.form.setting',
        meta: {
            title: 'Settings',
            crumb: 'Settings',
        },
    },
    detail: {
        name: 'demo.detail',
        meta: {
            title: 'Details',
            crumb: 'Details',
        },
    },
    'detail/info': {
        meta: {
            crumb: 'Details',
        },
    },
    'detail/monitor': {
        meta: {
            crumb: 'Monitoring',
        },
    },
    router: {
        meta: {
            title: 'Routing',
            crumb: 'Routing',
            locks: [{
                include: [/router/],
                params: ['search', 'demo.router.list.page'],
            }],
        },
    },
    'router/list': {
        name: 'demo.router.list',
        first: true,
        meta: {
            title: 'List (routes)',
            crumb: 'List (routes)',
        },
    },
    'router/setting': {
        name: 'demo.router.setting',
        meta: {
            title: 'Settings',
            crumb: 'Settings',
        },
    },
    'router/detail': {
        name: 'demo.router.detail',
        meta: {
            title: 'Details',
            crumb: 'Details',
        },
    },
    'router/detail/info': {
        meta: {
            crumb: 'Details',
        },
    },
    'router/detail/monitor': {
        meta: {
            crumb: 'Monitoring',
        },
    },
};