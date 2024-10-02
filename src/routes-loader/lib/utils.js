const JS = require('javascript-stringify');

/**
 * Keyword directory
 * There should be no routing-related views internally
 */
exports.KEYWORD_DIRS = [
    'assets',
    'components',
    'directives',
    'filters',
    'mixins',
    'utils',
    'styles',
    'service',
    'module',
];

/**
 * Placeholder directory
 * Just to facilitate the classification of view files, the placeholder directory name is not reflected in the path
 */
exports.HOLDER_DIRS = [
    'views',
    'layout',
];

exports.WRAPPER_PATH = 'cloud-ui.kubevue/src/layouts/l-wrapper.vue';

/**
 * Convert file path to routing path
 */
exports.transform = (filePath) => {
    filePath = filePath.replace(/\\/g, '/');
    return ('/' + filePath).replace(/(\/index)?\.(vue|md)$/, '').replace(/^\//, '');
};

/**
 * Standardize routing
 * @param routePath routing path
 */
exports.normalize = (routePath) => routePath
    .replace(new RegExp(`(^|/)(${exports.HOLDER_DIRS.join('|')})($|/)`, 'g'), '$1')
    .replace(/(^|\/)_/g, '$1:')
    .replace(/_($|\/)/g, '?$1')
    .replace(/\+/g, '*')
    .replace(/\/$/g, '');

exports.createRoute = function createRoute(routePath) {
    const cap = routePath.match(/(.*)\/(.*)/);
    const [m, parentPath, currentPath] = cap || [null, '', routePath];

    const route = {
        path: routePath.includes('=') ? routePath.replace(/[=]/g, '') : currentPath,
        parentPath: routePath.includes('=') ? '' : parentPath,
        routePath,
    };

    return route;
};

exports.normalizeRoute = function normalizeRoute(routePath, route) {
    const newRoute = exports.createRoute(routePath);
    if (route.path !== undefined)
        newRoute.path = route.path;
    return Object.assign(route, newRoute);
};

const _mergeRoutesMap = function (routes1, routes2) {
    if (!routes2)
        return routes1;
    Object.keys(routes2).forEach((key) => {
        if (routes1[key]) {
            routes1[key] = Object.assign(routes1[key], routes2[key]);
        } else {
            key && console.warn('[routes-loader][warning] This route has no entity in the directory structure, please check: ' + key);
            routes1[key] = routes2[key];
        }
    });
    return routes1;
};
/**
 * Merge routesMap
 */
exports.mergeRoutesMap = (...args) => args.reduceRight((acc, cur) => _mergeRoutesMap(cur, acc));

/**
 * Convert routesMap to nested routes
 */
exports.nestRoutes = function (routesMap, rootPath = '', restRedirect = false) {
    const routes = [];

    const parse = function (route) {
        if (route.routePath === '')
            return;

        if (route.parentPath === undefined)
            route.parentPath = '';

        let parent = routesMap[route.parentPath];
        if (!parent) {
            parent = exports.createRoute(route.parentPath);
            parent.filePath = exports.WRAPPER_PATH;
            routesMap[route.parentPath] = parent;
            parse(parent);
        }
        if (!parent.filePath) {
            parent.filePath = exports.WRAPPER_PATH;
        }

        parent.children = parent.children || [];
        parent.children.push(route);
    };

    Object.keys(routesMap).forEach((routePath) => parse(routesMap[routePath]));
    // Supplement the first route
    Object.keys(routesMap).forEach((routePath) => {
        const route = routesMap[routePath];
        if (route.children && route.children.length) {
            const firstChild = route.children.find((child) => child.first);
            if (firstChild && firstChild.path[0] !== ':')
                route.children.unshift({ path: '', redirect: firstChild.path });
        }
    });
    routes.push(routesMap['']);

    routes[0].path = rootPath;
    if (restRedirect)
        routes.push({ path: '*', redirect: restRedirect === true ? rootPath : restRedirect });

    return routes;
};

/**
 * Concatenate into JS string
 */
exports.renderRoute = function (route, comments = false, level = 0) {
    const indent = ' '.repeat(level * 4);

    const properties = [];
    properties.push(`path: '${route.path}'`);
    /* eslint-disable multiline-ternary */
    route.filePath && properties.push(route.chunkName
        ? `component: () => import(/* webpackChunkName: "${route.chunkName}" */ '${route.filePath.replace(/\\/g, '/')}')`
        : `component: require('${route.filePath.replace(/\\/g, '/')}').default`);
    route.name && properties.push(`name: '${route.name}'`);
    route.components && properties.push(`components: ${JS.stringify(route.components)}`);
    route.redirect && properties.push(`redirect: '${route.redirect}'`);
    route.props && properties.push(`props: ${JS.stringify(route.props)}`);
    route.alias && properties.push(`alias: '${route.alias}'`);
    route.caseSensitive && properties.push(`caseSensitive: '${route.caseSensitive}'`);
    route.pathToRegexpOptions && properties.push(`pathToRegexpOptions: '${route.pathToRegexpOptions}'`);
    route.beforeEnter && properties.push(`beforeEnter: ${JS.stringify(route.beforeEnter)}`);
    route.meta && properties.push(`meta: ${JS.stringify(route.meta)}`);
    route.children && properties.push(`children: ${exports.renderRoutes(route.children, comments, level + 1)}`);
    return indent + `{ ${properties.join(', ')} }`;
};

/**
 * Concatenate into JS string
 */
exports.renderRoutes = function (routes, comments = false, level = 1) {
    const indent = ' '.repeat((level - 1) * 4);
    return '[\n' + routes.map((route) => {
        const indent = ' '.repeat(level * 4);
        return (comments && route.routePath !== undefined ? indent + `/* '${route.routePath}' */\n` : '')
        + exports.renderRoute(route, comments, level) + ',\n';
    }).join('') + indent + ']';
};
