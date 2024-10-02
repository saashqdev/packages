const path = require('path');
const loaderUtils = require('loader-utils');
const backend = require('./lib/backend');
const _ = require('./lib/utils');

// Generate routes in the form of string concatenation
module.exports = function (content) {
    const options = Object.assign(loaderUtils.getOptions(this) || {}, loaderUtils.parseQuery(this.resourceQuery || ''));
    options.rootPath = options.rootPath || options.scopeName;
    options.chunkName = options.chunkName || options.scopeName;

    const resourceDir = path.dirname(this.resourcePath);

    // Dynamically generate routes
    const viewsPath = path.resolve(resourceDir, 'views');
    this.addContextDependency(viewsPath);
    const routesMap = backend.getRoutesMapFromDir(viewsPath, {
        excludes: new RegExp(`(^|/)(${_.KEYWORD_DIRS.join('|')})/`, 'g'),
    });

    Object.keys(routesMap).map((key) => {
        const route = routesMap[key];
        if (route.filePath !== _.WRAPPER_PATH)
            route.filePath = './' + path.relative(resourceDir, path.join(viewsPath, route.filePath));
        route.chunkName = options.chunkName;
        return route;
    });

    /* Support additional code, such as imports, etc. */
    return content.replace(/(export default\s+|module\.exports\s*=\s*)([\s\S]+)$/, (m, $1, $2) => {
        let customRoutesMap = {};
        try {
            const ctn = $2.trim();
            // eslint-disable-next-line no-eval
            customRoutesMap = eval('(function(){return ' + ctn + '})()');
        } catch (e) {}

        Object.keys(customRoutesMap).forEach((key) => _.normalizeRoute(key, customRoutesMap[key]));

        const routes = _.nestRoutes(_.mergeRoutesMap(routesMap, customRoutesMap), options.rootPath);
        const rootRoute = routes[0];

        return $1 + _.renderRoute(rootRoute, true);
    });
};
