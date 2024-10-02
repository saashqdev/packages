# kubevue-loader

## Install

```
npm i --save-dev kubevue-loader
```

## Vue CLI Configuration

``` js
module.exports = {
    chainWebpack(config) {
        config.module.rule('vue')
            .test(/\.vue([\\/]index\.js)?$/)
            .use('kubevue-loader')
            .loader('kubevue-loader');
    },
};
```
