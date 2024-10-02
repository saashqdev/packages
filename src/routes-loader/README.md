# @saashqdev/routes-loader

## Conventional Routing

Nested routing structure.

### Rule

- The directory structure determines the routing level
- If there is no `index.vue` under the module or branch page, it will be filled with the `LWrapper` component
- The following directories are keyword directories. There should be no views related to routing inside. File and sub-file paths will not be added as routes: `assets`, `components`, `directives`, `filters`, `mixins`, ` utils`, `styles`, `service`, `module`
- The following directories are placeholder directories, just to facilitate the classification of view files. The placeholder directory names are not reflected in the path: `views`, `layout`
- `_id` will be replaced by variable type `:id`
- `_id_` will be replaced by optional variable type `:id?`
- `any+` will be replaced by the wildcard type `any*`
- `=outside` will use the path of the file and sub-files as fixed routes to pull out the nested structure

You can refer to the [normalize](https://github.com/saashqdev/packages/blob/master/src/routes-loader/lib/utils.js#L35) function.

### Example

```
├─ account/                 #
│ ├─ module/ # Ignore keyword directories
│ ├─ components/ # Ignore keyword directories
│ │ ├─ s-detail.vue #
│ │ │ │ └─ ...
│ ├─ utils/ # Ignore keyword directories
│ ├─ views/
│ │ ├─ list.vue #
│ │ ├─ settings/ #
│ │ │ ├─ _id_.vue #
│ │ ├─ micro/ #
│ │ │ ├─ cloud++.vue #
│ │ ├─ detail/ #
│ │ │ ├─ index.vue #
│ │ │ ├─ info.vue #
│ │ │ ├─ monitor.vue #
│ │ │ ├─ =deep/ #
│ │ │ │ ├─ list.vue #
│ │ └─ ...
```

will generate

``` js
export default {
    path: 'account',
    component: LWrapper,
    children: [
        { path: '', redirect: 'list' },
        { path: 'list', component: () => import(/* webpackChunkName: 'account' */ './views/list.vue') },
        { path: 'settings', component: LWrapper, children: [
            { path: ':id?', component: () => import(/* webpackChunkName: 'account' */ './views/detail/_id_.vue') },
        ] },
        { path: 'micro', component: LWrapper, children: [
            { path: '', redirect: 'cloud**' },
            { path: 'cloud**', component: () => import(/* webpackChunkName: 'account' */ './views/micro/cloud++.vue') },
        ] },
        { path: 'detail', component: () => import(/* webpackChunkName: 'account' */ './views/index.vue'), children: [
            { path: '', redirect: 'info' },
            { path: 'info', component: () => import(/* webpackChunkName: 'account' */ './views/detail/info.vue') },
            { path: 'monitor', component: () => import(/* webpackChunkName: 'account' */ './views/detail/monitor.vue') },
        ] },
        { path: 'detail/deep/list', component: () => import(/* webpackChunkName: 'account' */ './views/detail/deep/list.vue') },
    ],
};
```
