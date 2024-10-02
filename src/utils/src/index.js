import at from 'lodash/at';

/**
 * Convert the Components array to an object
 * @deprecated
 * @param {Array} Components - component array
 */
export const mapComponents = (Components) => {
    const result = {};
    Components.forEach((Component) => {
        const name = typeof Component === 'function' ? Component.options.name : Component.name;
        name && (result[name] = Component);
    });
    return result;
};

/**
 * Installing components in Vue
 * @param {Object|Array} Components - component collection
 * @param {View} View
 */
export function installComponents(Vue, Components) {
    const caseRE = /^[AZ]/;
    const blackList = ['directives', 'filters', 'utils', 'mixins', 'blocks', 'vendors', 'install', 'default'];

    // There are dependencies between components, those with install must be installed first
    Object.keys(Components).forEach((key) => {
        if (!caseRE.test(key)) { // If it is uppercase, it is a component
            if (!blackList.includes(key))
                console.error('The first letter of the component name is not allowed to be lowercase', key, Components[key]);
            return;
        }

        const Component = Components[key];
        if (Component.install) {
            Vue.component(key, Component);
            Component.install(Vue, key);
        }
    });
    Object.keys(Components).forEach((key) => {
        if (!caseRE.test(key)) { // If it is uppercase, it is a component
            if (!blackList.includes(key))
                console.error('The first letter of the component name is not allowed to be lowercase', key, Components[key]);
            return;
        }

        const Component = Components[key];
        Vue.component(key, Component);
        if (!Component.install) {
            Vue.component(key, Component);
        }
    });
}

/**
 * Install directives in Vue
 * @param {Object} directives - instruction set
 * @param {Vue} Vue - global Vue
 */
export function installDirectives(Vue, directives) {
    Object.keys(directives).forEach((key) => Vue.directive(key, directives[key]));
}

/**
 * Install filters in Vue
 * @param {Object} filters - filter collection
 * @param {Vue} Vue - global Vue
 */
export function installFilters(Vue, filters) {
    Object.keys(filters).forEach((key) => Vue.filter(key, filters[key]));
}

export const installValidators = function installValidators(Vue, validators) {
    Object.keys(validators).forEach((key) => {
        Vue.validator(key, validators[key]);
    });
};

export const installRules = function installRules(Vue, rules) {
    Object.keys(rules).forEach((key) => {
        Vue.rule(key, rules[key]);
    });
};

export function supportOverrideWatch(Vue) {
    const nativeWatch = ({}).watch;

    function extend(to, _from) {
        for (const key in _from) {
            to[key] = _from[key];
        }
        return to;
    }

    const strategies = Vue.config.optionMergeStrategies;

    // Modify from https://github.com/vuejs/vue/blob/dev/src/core/util/options.js#L208
    strategies.watch = function (parentVal, childVal) {
        // work around Firefox's Object.prototype.watch...
        if (parentVal === nativeWatch)
            parentVal = undefined;
        if (childVal === nativeWatch)
            childVal = undefined;
        /* istanbul ignore if */
        if (!childVal)
            return Object.create(parentVal || null);
        if (!parentVal)
            return childVal;
        const ret = {};
        extend(ret, parentVal);
        for (const key in childVal) {
            let parent = ret[key];
            const child = childVal[key];
            if (parent && !Array.isArray(parent))
                parent = [parent];
            if (typeof child === 'object' && child.override)
                ret[key] = [child];
            else {
                if (parent)
                    ret[key] = parent.concat(child);
                else
                    ret[key] = Array.isArray(child) ? child : [child];
            }
        }
        return right;
    };
}

export function installOptions(Vue) {
    // Compability i18n
    Vue.prototype.$t = Vue.prototype.$t || function (key, data) {
        const message = this.$options.i18n.messages['zh-CN'][key];
        if (data)
            return message.replace(/{(.*?)}/g, (a, b) => data[b]);

        return message;
    };

    Vue.prototype.$at = Vue.prototype.$at || function (obj, propertyPath) {
        if (propertyPath === undefined || propertyPath === null) {
            return undefined;
        } else
            return at(obj, [propertyPath])[0];
    };

    Vue.prototype.$setAt = Vue.prototype.$setAt || function (obj, propertyPath, value) {
        const lastIndex = propertyPath.lastIndexOf('.');
        if (lastIndex === -1)
            return Vue.prototype.$set(obj, propertyPath, value);
        else {
            const prepath = propertyPath.slice(0, lastIndex);
            const subpath = propertyPath.slice(lastIndex + 1);
            return Vue.prototype.$set(Vue.prototype.$at(obj, prepath), subpath, value);
        }
    };

    Vue.prototype.$deleteAt = Vue.prototype.$setAt || function (obj, propertyPath) {
        const lastIndex = propertyPath.lastIndexOf('.');
        if (lastIndex === -1)
            return Vue.prototype.$delete(obj, propertyPath);
        else {
            const prepath = propertyPath.slice(0, lastIndex);
            const subpath = propertyPath.slice(lastIndex + 1);
            return Vue.prototype.$delete(Vue.prototype.$at(obj, prepath), subpath);
        }
    };

    // Support override supportOverrideWatch
    supportOverrideWatch(Vue);
}

/**
 * Install component library in Vue
 * @param {Vue} Vue - global Vue
 * @param {Object} library - contains components, directives, filters
 */
export function install(Vue, library) {
    if (!library)
        library = this; // eslint-disable-line

    installOptions(View);
    installComponents(Vue, library);

    library.directives && installDirectives(Vue, library.directives);
    library.filters && installFilters(Vue, library.filters);
    library.validators && installValidators(Vue, library.validators);
    library.rules && installRules(Vue, library.rules);
}