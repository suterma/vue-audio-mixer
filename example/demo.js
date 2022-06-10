
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
(function () {
    'use strict';

    /**
     * Make a map and return a function for checking if a key
     * is in that map.
     * IMPORTANT: all calls of this function must be prefixed with
     * \/\*#\_\_PURE\_\_\*\/
     * So that rollup can tree-shake them if necessary.
     */
    function makeMap(str, expectsLowerCase) {
        const map = Object.create(null);
        const list = str.split(',');
        for (let i = 0; i < list.length; i++) {
            map[list[i]] = true;
        }
        return expectsLowerCase ? val => !!map[val.toLowerCase()] : val => !!map[val];
    }

    /**
     * On the client we only need to offer special cases for boolean attributes that
     * have different names from their corresponding dom properties:
     * - itemscope -> N/A
     * - allowfullscreen -> allowFullscreen
     * - formnovalidate -> formNoValidate
     * - ismap -> isMap
     * - nomodule -> noModule
     * - novalidate -> noValidate
     * - readonly -> readOnly
     */
    const specialBooleanAttrs = `itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly`;
    const isSpecialBooleanAttr = /*#__PURE__*/ makeMap(specialBooleanAttrs);
    /**
     * Boolean attributes should be included if the value is truthy or ''.
     * e.g. `<select multiple>` compiles to `{ multiple: '' }`
     */
    function includeBooleanAttr(value) {
        return !!value || value === '';
    }

    function normalizeStyle(value) {
        if (isArray(value)) {
            const res = {};
            for (let i = 0; i < value.length; i++) {
                const item = value[i];
                const normalized = isString(item)
                    ? parseStringStyle(item)
                    : normalizeStyle(item);
                if (normalized) {
                    for (const key in normalized) {
                        res[key] = normalized[key];
                    }
                }
            }
            return res;
        }
        else if (isString(value)) {
            return value;
        }
        else if (isObject(value)) {
            return value;
        }
    }
    const listDelimiterRE = /;(?![^(]*\))/g;
    const propertyDelimiterRE = /:(.+)/;
    function parseStringStyle(cssText) {
        const ret = {};
        cssText.split(listDelimiterRE).forEach(item => {
            if (item) {
                const tmp = item.split(propertyDelimiterRE);
                tmp.length > 1 && (ret[tmp[0].trim()] = tmp[1].trim());
            }
        });
        return ret;
    }
    function normalizeClass(value) {
        let res = '';
        if (isString(value)) {
            res = value;
        }
        else if (isArray(value)) {
            for (let i = 0; i < value.length; i++) {
                const normalized = normalizeClass(value[i]);
                if (normalized) {
                    res += normalized + ' ';
                }
            }
        }
        else if (isObject(value)) {
            for (const name in value) {
                if (value[name]) {
                    res += name + ' ';
                }
            }
        }
        return res.trim();
    }

    // These tag configs are shared between compiler-dom and runtime-dom, so they
    // https://developer.mozilla.org/en-US/docs/Web/HTML/Element
    const HTML_TAGS = 'html,body,base,head,link,meta,style,title,address,article,aside,footer,' +
        'header,h1,h2,h3,h4,h5,h6,nav,section,div,dd,dl,dt,figcaption,' +
        'figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,' +
        'data,dfn,em,i,kbd,mark,q,rp,rt,ruby,s,samp,small,span,strong,sub,sup,' +
        'time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,' +
        'canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,' +
        'th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,' +
        'option,output,progress,select,textarea,details,dialog,menu,' +
        'summary,template,blockquote,iframe,tfoot';
    // https://developer.mozilla.org/en-US/docs/Web/SVG/Element
    const SVG_TAGS = 'svg,animate,animateMotion,animateTransform,circle,clipPath,color-profile,' +
        'defs,desc,discard,ellipse,feBlend,feColorMatrix,feComponentTransfer,' +
        'feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap,' +
        'feDistanceLight,feDropShadow,feFlood,feFuncA,feFuncB,feFuncG,feFuncR,' +
        'feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset,' +
        'fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,filter,' +
        'foreignObject,g,hatch,hatchpath,image,line,linearGradient,marker,mask,' +
        'mesh,meshgradient,meshpatch,meshrow,metadata,mpath,path,pattern,' +
        'polygon,polyline,radialGradient,rect,set,solidcolor,stop,switch,symbol,' +
        'text,textPath,title,tspan,unknown,use,view';
    /**
     * Compiler only.
     * Do NOT use in runtime code paths unless behind `("development" !== 'production')` flag.
     */
    const isHTMLTag = /*#__PURE__*/ makeMap(HTML_TAGS);
    /**
     * Compiler only.
     * Do NOT use in runtime code paths unless behind `("development" !== 'production')` flag.
     */
    const isSVGTag = /*#__PURE__*/ makeMap(SVG_TAGS);

    function looseCompareArrays(a, b) {
        if (a.length !== b.length)
            return false;
        let equal = true;
        for (let i = 0; equal && i < a.length; i++) {
            equal = looseEqual(a[i], b[i]);
        }
        return equal;
    }
    function looseEqual(a, b) {
        if (a === b)
            return true;
        let aValidType = isDate(a);
        let bValidType = isDate(b);
        if (aValidType || bValidType) {
            return aValidType && bValidType ? a.getTime() === b.getTime() : false;
        }
        aValidType = isSymbol(a);
        bValidType = isSymbol(b);
        if (aValidType || bValidType) {
            return a === b;
        }
        aValidType = isArray(a);
        bValidType = isArray(b);
        if (aValidType || bValidType) {
            return aValidType && bValidType ? looseCompareArrays(a, b) : false;
        }
        aValidType = isObject(a);
        bValidType = isObject(b);
        if (aValidType || bValidType) {
            /* istanbul ignore if: this if will probably never be called */
            if (!aValidType || !bValidType) {
                return false;
            }
            const aKeysCount = Object.keys(a).length;
            const bKeysCount = Object.keys(b).length;
            if (aKeysCount !== bKeysCount) {
                return false;
            }
            for (const key in a) {
                const aHasKey = a.hasOwnProperty(key);
                const bHasKey = b.hasOwnProperty(key);
                if ((aHasKey && !bHasKey) ||
                    (!aHasKey && bHasKey) ||
                    !looseEqual(a[key], b[key])) {
                    return false;
                }
            }
        }
        return String(a) === String(b);
    }
    function looseIndexOf(arr, val) {
        return arr.findIndex(item => looseEqual(item, val));
    }

    /**
     * For converting {{ interpolation }} values to displayed strings.
     * @private
     */
    const toDisplayString = (val) => {
        return isString(val)
            ? val
            : val == null
                ? ''
                : isArray(val) ||
                    (isObject(val) &&
                        (val.toString === objectToString || !isFunction(val.toString)))
                    ? JSON.stringify(val, replacer, 2)
                    : String(val);
    };
    const replacer = (_key, val) => {
        // can't use isRef here since @vue/shared has no deps
        if (val && val.__v_isRef) {
            return replacer(_key, val.value);
        }
        else if (isMap(val)) {
            return {
                [`Map(${val.size})`]: [...val.entries()].reduce((entries, [key, val]) => {
                    entries[`${key} =>`] = val;
                    return entries;
                }, {})
            };
        }
        else if (isSet(val)) {
            return {
                [`Set(${val.size})`]: [...val.values()]
            };
        }
        else if (isObject(val) && !isArray(val) && !isPlainObject(val)) {
            return String(val);
        }
        return val;
    };

    const EMPTY_OBJ = Object.freeze({})
        ;
    const EMPTY_ARR = Object.freeze([]) ;
    const NOOP = () => { };
    /**
     * Always return false.
     */
    const NO = () => false;
    const onRE = /^on[^a-z]/;
    const isOn = (key) => onRE.test(key);
    const isModelListener = (key) => key.startsWith('onUpdate:');
    const extend = Object.assign;
    const remove = (arr, el) => {
        const i = arr.indexOf(el);
        if (i > -1) {
            arr.splice(i, 1);
        }
    };
    const hasOwnProperty = Object.prototype.hasOwnProperty;
    const hasOwn = (val, key) => hasOwnProperty.call(val, key);
    const isArray = Array.isArray;
    const isMap = (val) => toTypeString(val) === '[object Map]';
    const isSet = (val) => toTypeString(val) === '[object Set]';
    const isDate = (val) => toTypeString(val) === '[object Date]';
    const isFunction = (val) => typeof val === 'function';
    const isString = (val) => typeof val === 'string';
    const isSymbol = (val) => typeof val === 'symbol';
    const isObject = (val) => val !== null && typeof val === 'object';
    const isPromise = (val) => {
        return isObject(val) && isFunction(val.then) && isFunction(val.catch);
    };
    const objectToString = Object.prototype.toString;
    const toTypeString = (value) => objectToString.call(value);
    const toRawType = (value) => {
        // extract "RawType" from strings like "[object RawType]"
        return toTypeString(value).slice(8, -1);
    };
    const isPlainObject = (val) => toTypeString(val) === '[object Object]';
    const isIntegerKey = (key) => isString(key) &&
        key !== 'NaN' &&
        key[0] !== '-' &&
        '' + parseInt(key, 10) === key;
    const isReservedProp = /*#__PURE__*/ makeMap(
    // the leading comma is intentional so empty string "" is also included
    ',key,ref,ref_for,ref_key,' +
        'onVnodeBeforeMount,onVnodeMounted,' +
        'onVnodeBeforeUpdate,onVnodeUpdated,' +
        'onVnodeBeforeUnmount,onVnodeUnmounted');
    const isBuiltInDirective = /*#__PURE__*/ makeMap('bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text,memo');
    const cacheStringFunction = (fn) => {
        const cache = Object.create(null);
        return ((str) => {
            const hit = cache[str];
            return hit || (cache[str] = fn(str));
        });
    };
    const camelizeRE = /-(\w)/g;
    /**
     * @private
     */
    const camelize = cacheStringFunction((str) => {
        return str.replace(camelizeRE, (_, c) => (c ? c.toUpperCase() : ''));
    });
    const hyphenateRE = /\B([A-Z])/g;
    /**
     * @private
     */
    const hyphenate = cacheStringFunction((str) => str.replace(hyphenateRE, '-$1').toLowerCase());
    /**
     * @private
     */
    const capitalize = cacheStringFunction((str) => str.charAt(0).toUpperCase() + str.slice(1));
    /**
     * @private
     */
    const toHandlerKey = cacheStringFunction((str) => str ? `on${capitalize(str)}` : ``);
    // compare whether a value has changed, accounting for NaN.
    const hasChanged = (value, oldValue) => !Object.is(value, oldValue);
    const invokeArrayFns = (fns, arg) => {
        for (let i = 0; i < fns.length; i++) {
            fns[i](arg);
        }
    };
    const def = (obj, key, value) => {
        Object.defineProperty(obj, key, {
            configurable: true,
            enumerable: false,
            value
        });
    };
    const toNumber = (val) => {
        const n = parseFloat(val);
        return isNaN(n) ? val : n;
    };
    let _globalThis;
    const getGlobalThis = () => {
        return (_globalThis ||
            (_globalThis =
                typeof globalThis !== 'undefined'
                    ? globalThis
                    : typeof self !== 'undefined'
                        ? self
                        : typeof window !== 'undefined'
                            ? window
                            : typeof global !== 'undefined'
                                ? global
                                : {}));
    };

    function warn$1(msg, ...args) {
        console.warn(`[Vue warn] ${msg}`, ...args);
    }

    let activeEffectScope;
    class EffectScope {
        constructor(detached = false) {
            /**
             * @internal
             */
            this.active = true;
            /**
             * @internal
             */
            this.effects = [];
            /**
             * @internal
             */
            this.cleanups = [];
            if (!detached && activeEffectScope) {
                this.parent = activeEffectScope;
                this.index =
                    (activeEffectScope.scopes || (activeEffectScope.scopes = [])).push(this) - 1;
            }
        }
        run(fn) {
            if (this.active) {
                const currentEffectScope = activeEffectScope;
                try {
                    activeEffectScope = this;
                    return fn();
                }
                finally {
                    activeEffectScope = currentEffectScope;
                }
            }
            else {
                warn$1(`cannot run an inactive effect scope.`);
            }
        }
        /**
         * This should only be called on non-detached scopes
         * @internal
         */
        on() {
            activeEffectScope = this;
        }
        /**
         * This should only be called on non-detached scopes
         * @internal
         */
        off() {
            activeEffectScope = this.parent;
        }
        stop(fromParent) {
            if (this.active) {
                let i, l;
                for (i = 0, l = this.effects.length; i < l; i++) {
                    this.effects[i].stop();
                }
                for (i = 0, l = this.cleanups.length; i < l; i++) {
                    this.cleanups[i]();
                }
                if (this.scopes) {
                    for (i = 0, l = this.scopes.length; i < l; i++) {
                        this.scopes[i].stop(true);
                    }
                }
                // nested scope, dereference from parent to avoid memory leaks
                if (this.parent && !fromParent) {
                    // optimized O(1) removal
                    const last = this.parent.scopes.pop();
                    if (last && last !== this) {
                        this.parent.scopes[this.index] = last;
                        last.index = this.index;
                    }
                }
                this.active = false;
            }
        }
    }
    function recordEffectScope(effect, scope = activeEffectScope) {
        if (scope && scope.active) {
            scope.effects.push(effect);
        }
    }

    const createDep = (effects) => {
        const dep = new Set(effects);
        dep.w = 0;
        dep.n = 0;
        return dep;
    };
    const wasTracked = (dep) => (dep.w & trackOpBit) > 0;
    const newTracked = (dep) => (dep.n & trackOpBit) > 0;
    const initDepMarkers = ({ deps }) => {
        if (deps.length) {
            for (let i = 0; i < deps.length; i++) {
                deps[i].w |= trackOpBit; // set was tracked
            }
        }
    };
    const finalizeDepMarkers = (effect) => {
        const { deps } = effect;
        if (deps.length) {
            let ptr = 0;
            for (let i = 0; i < deps.length; i++) {
                const dep = deps[i];
                if (wasTracked(dep) && !newTracked(dep)) {
                    dep.delete(effect);
                }
                else {
                    deps[ptr++] = dep;
                }
                // clear bits
                dep.w &= ~trackOpBit;
                dep.n &= ~trackOpBit;
            }
            deps.length = ptr;
        }
    };

    const targetMap = new WeakMap();
    // The number of effects currently being tracked recursively.
    let effectTrackDepth = 0;
    let trackOpBit = 1;
    /**
     * The bitwise track markers support at most 30 levels of recursion.
     * This value is chosen to enable modern JS engines to use a SMI on all platforms.
     * When recursion depth is greater, fall back to using a full cleanup.
     */
    const maxMarkerBits = 30;
    let activeEffect;
    const ITERATE_KEY = Symbol('iterate' );
    const MAP_KEY_ITERATE_KEY = Symbol('Map key iterate' );
    class ReactiveEffect {
        constructor(fn, scheduler = null, scope) {
            this.fn = fn;
            this.scheduler = scheduler;
            this.active = true;
            this.deps = [];
            this.parent = undefined;
            recordEffectScope(this, scope);
        }
        run() {
            if (!this.active) {
                return this.fn();
            }
            let parent = activeEffect;
            let lastShouldTrack = shouldTrack;
            while (parent) {
                if (parent === this) {
                    return;
                }
                parent = parent.parent;
            }
            try {
                this.parent = activeEffect;
                activeEffect = this;
                shouldTrack = true;
                trackOpBit = 1 << ++effectTrackDepth;
                if (effectTrackDepth <= maxMarkerBits) {
                    initDepMarkers(this);
                }
                else {
                    cleanupEffect(this);
                }
                return this.fn();
            }
            finally {
                if (effectTrackDepth <= maxMarkerBits) {
                    finalizeDepMarkers(this);
                }
                trackOpBit = 1 << --effectTrackDepth;
                activeEffect = this.parent;
                shouldTrack = lastShouldTrack;
                this.parent = undefined;
                if (this.deferStop) {
                    this.stop();
                }
            }
        }
        stop() {
            // stopped while running itself - defer the cleanup
            if (activeEffect === this) {
                this.deferStop = true;
            }
            else if (this.active) {
                cleanupEffect(this);
                if (this.onStop) {
                    this.onStop();
                }
                this.active = false;
            }
        }
    }
    function cleanupEffect(effect) {
        const { deps } = effect;
        if (deps.length) {
            for (let i = 0; i < deps.length; i++) {
                deps[i].delete(effect);
            }
            deps.length = 0;
        }
    }
    let shouldTrack = true;
    const trackStack = [];
    function pauseTracking() {
        trackStack.push(shouldTrack);
        shouldTrack = false;
    }
    function resetTracking() {
        const last = trackStack.pop();
        shouldTrack = last === undefined ? true : last;
    }
    function track(target, type, key) {
        if (shouldTrack && activeEffect) {
            let depsMap = targetMap.get(target);
            if (!depsMap) {
                targetMap.set(target, (depsMap = new Map()));
            }
            let dep = depsMap.get(key);
            if (!dep) {
                depsMap.set(key, (dep = createDep()));
            }
            const eventInfo = { effect: activeEffect, target, type, key }
                ;
            trackEffects(dep, eventInfo);
        }
    }
    function trackEffects(dep, debuggerEventExtraInfo) {
        let shouldTrack = false;
        if (effectTrackDepth <= maxMarkerBits) {
            if (!newTracked(dep)) {
                dep.n |= trackOpBit; // set newly tracked
                shouldTrack = !wasTracked(dep);
            }
        }
        else {
            // Full cleanup mode.
            shouldTrack = !dep.has(activeEffect);
        }
        if (shouldTrack) {
            dep.add(activeEffect);
            activeEffect.deps.push(dep);
            if (activeEffect.onTrack) {
                activeEffect.onTrack(Object.assign({ effect: activeEffect }, debuggerEventExtraInfo));
            }
        }
    }
    function trigger(target, type, key, newValue, oldValue, oldTarget) {
        const depsMap = targetMap.get(target);
        if (!depsMap) {
            // never been tracked
            return;
        }
        let deps = [];
        if (type === "clear" /* CLEAR */) {
            // collection being cleared
            // trigger all effects for target
            deps = [...depsMap.values()];
        }
        else if (key === 'length' && isArray(target)) {
            depsMap.forEach((dep, key) => {
                if (key === 'length' || key >= newValue) {
                    deps.push(dep);
                }
            });
        }
        else {
            // schedule runs for SET | ADD | DELETE
            if (key !== void 0) {
                deps.push(depsMap.get(key));
            }
            // also run for iteration key on ADD | DELETE | Map.SET
            switch (type) {
                case "add" /* ADD */:
                    if (!isArray(target)) {
                        deps.push(depsMap.get(ITERATE_KEY));
                        if (isMap(target)) {
                            deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
                        }
                    }
                    else if (isIntegerKey(key)) {
                        // new index added to array -> length changes
                        deps.push(depsMap.get('length'));
                    }
                    break;
                case "delete" /* DELETE */:
                    if (!isArray(target)) {
                        deps.push(depsMap.get(ITERATE_KEY));
                        if (isMap(target)) {
                            deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
                        }
                    }
                    break;
                case "set" /* SET */:
                    if (isMap(target)) {
                        deps.push(depsMap.get(ITERATE_KEY));
                    }
                    break;
            }
        }
        const eventInfo = { target, type, key, newValue, oldValue, oldTarget }
            ;
        if (deps.length === 1) {
            if (deps[0]) {
                {
                    triggerEffects(deps[0], eventInfo);
                }
            }
        }
        else {
            const effects = [];
            for (const dep of deps) {
                if (dep) {
                    effects.push(...dep);
                }
            }
            {
                triggerEffects(createDep(effects), eventInfo);
            }
        }
    }
    function triggerEffects(dep, debuggerEventExtraInfo) {
        // spread into array for stabilization
        const effects = isArray(dep) ? dep : [...dep];
        for (const effect of effects) {
            if (effect.computed) {
                triggerEffect(effect, debuggerEventExtraInfo);
            }
        }
        for (const effect of effects) {
            if (!effect.computed) {
                triggerEffect(effect, debuggerEventExtraInfo);
            }
        }
    }
    function triggerEffect(effect, debuggerEventExtraInfo) {
        if (effect !== activeEffect || effect.allowRecurse) {
            if (effect.onTrigger) {
                effect.onTrigger(extend({ effect }, debuggerEventExtraInfo));
            }
            if (effect.scheduler) {
                effect.scheduler();
            }
            else {
                effect.run();
            }
        }
    }

    const isNonTrackableKeys = /*#__PURE__*/ makeMap(`__proto__,__v_isRef,__isVue`);
    const builtInSymbols = new Set(
    /*#__PURE__*/
    Object.getOwnPropertyNames(Symbol)
        // ios10.x Object.getOwnPropertyNames(Symbol) can enumerate 'arguments' and 'caller'
        // but accessing them on Symbol leads to TypeError because Symbol is a strict mode
        // function
        .filter(key => key !== 'arguments' && key !== 'caller')
        .map(key => Symbol[key])
        .filter(isSymbol));
    const get = /*#__PURE__*/ createGetter();
    const shallowGet = /*#__PURE__*/ createGetter(false, true);
    const readonlyGet = /*#__PURE__*/ createGetter(true);
    const shallowReadonlyGet = /*#__PURE__*/ createGetter(true, true);
    const arrayInstrumentations = /*#__PURE__*/ createArrayInstrumentations();
    function createArrayInstrumentations() {
        const instrumentations = {};
        ['includes', 'indexOf', 'lastIndexOf'].forEach(key => {
            instrumentations[key] = function (...args) {
                const arr = toRaw(this);
                for (let i = 0, l = this.length; i < l; i++) {
                    track(arr, "get" /* GET */, i + '');
                }
                // we run the method using the original args first (which may be reactive)
                const res = arr[key](...args);
                if (res === -1 || res === false) {
                    // if that didn't work, run it again using raw values.
                    return arr[key](...args.map(toRaw));
                }
                else {
                    return res;
                }
            };
        });
        ['push', 'pop', 'shift', 'unshift', 'splice'].forEach(key => {
            instrumentations[key] = function (...args) {
                pauseTracking();
                const res = toRaw(this)[key].apply(this, args);
                resetTracking();
                return res;
            };
        });
        return instrumentations;
    }
    function createGetter(isReadonly = false, shallow = false) {
        return function get(target, key, receiver) {
            if (key === "__v_isReactive" /* IS_REACTIVE */) {
                return !isReadonly;
            }
            else if (key === "__v_isReadonly" /* IS_READONLY */) {
                return isReadonly;
            }
            else if (key === "__v_isShallow" /* IS_SHALLOW */) {
                return shallow;
            }
            else if (key === "__v_raw" /* RAW */ &&
                receiver ===
                    (isReadonly
                        ? shallow
                            ? shallowReadonlyMap
                            : readonlyMap
                        : shallow
                            ? shallowReactiveMap
                            : reactiveMap).get(target)) {
                return target;
            }
            const targetIsArray = isArray(target);
            if (!isReadonly && targetIsArray && hasOwn(arrayInstrumentations, key)) {
                return Reflect.get(arrayInstrumentations, key, receiver);
            }
            const res = Reflect.get(target, key, receiver);
            if (isSymbol(key) ? builtInSymbols.has(key) : isNonTrackableKeys(key)) {
                return res;
            }
            if (!isReadonly) {
                track(target, "get" /* GET */, key);
            }
            if (shallow) {
                return res;
            }
            if (isRef(res)) {
                // ref unwrapping - skip unwrap for Array + integer key.
                return targetIsArray && isIntegerKey(key) ? res : res.value;
            }
            if (isObject(res)) {
                // Convert returned value into a proxy as well. we do the isObject check
                // here to avoid invalid value warning. Also need to lazy access readonly
                // and reactive here to avoid circular dependency.
                return isReadonly ? readonly(res) : reactive(res);
            }
            return res;
        };
    }
    const set = /*#__PURE__*/ createSetter();
    const shallowSet = /*#__PURE__*/ createSetter(true);
    function createSetter(shallow = false) {
        return function set(target, key, value, receiver) {
            let oldValue = target[key];
            if (isReadonly(oldValue) && isRef(oldValue) && !isRef(value)) {
                return false;
            }
            if (!shallow && !isReadonly(value)) {
                if (!isShallow$1(value)) {
                    value = toRaw(value);
                    oldValue = toRaw(oldValue);
                }
                if (!isArray(target) && isRef(oldValue) && !isRef(value)) {
                    oldValue.value = value;
                    return true;
                }
            }
            const hadKey = isArray(target) && isIntegerKey(key)
                ? Number(key) < target.length
                : hasOwn(target, key);
            const result = Reflect.set(target, key, value, receiver);
            // don't trigger if target is something up in the prototype chain of original
            if (target === toRaw(receiver)) {
                if (!hadKey) {
                    trigger(target, "add" /* ADD */, key, value);
                }
                else if (hasChanged(value, oldValue)) {
                    trigger(target, "set" /* SET */, key, value, oldValue);
                }
            }
            return result;
        };
    }
    function deleteProperty(target, key) {
        const hadKey = hasOwn(target, key);
        const oldValue = target[key];
        const result = Reflect.deleteProperty(target, key);
        if (result && hadKey) {
            trigger(target, "delete" /* DELETE */, key, undefined, oldValue);
        }
        return result;
    }
    function has(target, key) {
        const result = Reflect.has(target, key);
        if (!isSymbol(key) || !builtInSymbols.has(key)) {
            track(target, "has" /* HAS */, key);
        }
        return result;
    }
    function ownKeys(target) {
        track(target, "iterate" /* ITERATE */, isArray(target) ? 'length' : ITERATE_KEY);
        return Reflect.ownKeys(target);
    }
    const mutableHandlers = {
        get,
        set,
        deleteProperty,
        has,
        ownKeys
    };
    const readonlyHandlers = {
        get: readonlyGet,
        set(target, key) {
            {
                warn$1(`Set operation on key "${String(key)}" failed: target is readonly.`, target);
            }
            return true;
        },
        deleteProperty(target, key) {
            {
                warn$1(`Delete operation on key "${String(key)}" failed: target is readonly.`, target);
            }
            return true;
        }
    };
    const shallowReactiveHandlers = /*#__PURE__*/ extend({}, mutableHandlers, {
        get: shallowGet,
        set: shallowSet
    });
    // Props handlers are special in the sense that it should not unwrap top-level
    // refs (in order to allow refs to be explicitly passed down), but should
    // retain the reactivity of the normal readonly object.
    const shallowReadonlyHandlers = /*#__PURE__*/ extend({}, readonlyHandlers, {
        get: shallowReadonlyGet
    });

    const toShallow = (value) => value;
    const getProto = (v) => Reflect.getPrototypeOf(v);
    function get$1(target, key, isReadonly = false, isShallow = false) {
        // #1772: readonly(reactive(Map)) should return readonly + reactive version
        // of the value
        target = target["__v_raw" /* RAW */];
        const rawTarget = toRaw(target);
        const rawKey = toRaw(key);
        if (!isReadonly) {
            if (key !== rawKey) {
                track(rawTarget, "get" /* GET */, key);
            }
            track(rawTarget, "get" /* GET */, rawKey);
        }
        const { has } = getProto(rawTarget);
        const wrap = isShallow ? toShallow : isReadonly ? toReadonly : toReactive;
        if (has.call(rawTarget, key)) {
            return wrap(target.get(key));
        }
        else if (has.call(rawTarget, rawKey)) {
            return wrap(target.get(rawKey));
        }
        else if (target !== rawTarget) {
            // #3602 readonly(reactive(Map))
            // ensure that the nested reactive `Map` can do tracking for itself
            target.get(key);
        }
    }
    function has$1(key, isReadonly = false) {
        const target = this["__v_raw" /* RAW */];
        const rawTarget = toRaw(target);
        const rawKey = toRaw(key);
        if (!isReadonly) {
            if (key !== rawKey) {
                track(rawTarget, "has" /* HAS */, key);
            }
            track(rawTarget, "has" /* HAS */, rawKey);
        }
        return key === rawKey
            ? target.has(key)
            : target.has(key) || target.has(rawKey);
    }
    function size(target, isReadonly = false) {
        target = target["__v_raw" /* RAW */];
        !isReadonly && track(toRaw(target), "iterate" /* ITERATE */, ITERATE_KEY);
        return Reflect.get(target, 'size', target);
    }
    function add(value) {
        value = toRaw(value);
        const target = toRaw(this);
        const proto = getProto(target);
        const hadKey = proto.has.call(target, value);
        if (!hadKey) {
            target.add(value);
            trigger(target, "add" /* ADD */, value, value);
        }
        return this;
    }
    function set$1(key, value) {
        value = toRaw(value);
        const target = toRaw(this);
        const { has, get } = getProto(target);
        let hadKey = has.call(target, key);
        if (!hadKey) {
            key = toRaw(key);
            hadKey = has.call(target, key);
        }
        else {
            checkIdentityKeys(target, has, key);
        }
        const oldValue = get.call(target, key);
        target.set(key, value);
        if (!hadKey) {
            trigger(target, "add" /* ADD */, key, value);
        }
        else if (hasChanged(value, oldValue)) {
            trigger(target, "set" /* SET */, key, value, oldValue);
        }
        return this;
    }
    function deleteEntry(key) {
        const target = toRaw(this);
        const { has, get } = getProto(target);
        let hadKey = has.call(target, key);
        if (!hadKey) {
            key = toRaw(key);
            hadKey = has.call(target, key);
        }
        else {
            checkIdentityKeys(target, has, key);
        }
        const oldValue = get ? get.call(target, key) : undefined;
        // forward the operation before queueing reactions
        const result = target.delete(key);
        if (hadKey) {
            trigger(target, "delete" /* DELETE */, key, undefined, oldValue);
        }
        return result;
    }
    function clear() {
        const target = toRaw(this);
        const hadItems = target.size !== 0;
        const oldTarget = isMap(target)
                ? new Map(target)
                : new Set(target)
            ;
        // forward the operation before queueing reactions
        const result = target.clear();
        if (hadItems) {
            trigger(target, "clear" /* CLEAR */, undefined, undefined, oldTarget);
        }
        return result;
    }
    function createForEach(isReadonly, isShallow) {
        return function forEach(callback, thisArg) {
            const observed = this;
            const target = observed["__v_raw" /* RAW */];
            const rawTarget = toRaw(target);
            const wrap = isShallow ? toShallow : isReadonly ? toReadonly : toReactive;
            !isReadonly && track(rawTarget, "iterate" /* ITERATE */, ITERATE_KEY);
            return target.forEach((value, key) => {
                // important: make sure the callback is
                // 1. invoked with the reactive map as `this` and 3rd arg
                // 2. the value received should be a corresponding reactive/readonly.
                return callback.call(thisArg, wrap(value), wrap(key), observed);
            });
        };
    }
    function createIterableMethod(method, isReadonly, isShallow) {
        return function (...args) {
            const target = this["__v_raw" /* RAW */];
            const rawTarget = toRaw(target);
            const targetIsMap = isMap(rawTarget);
            const isPair = method === 'entries' || (method === Symbol.iterator && targetIsMap);
            const isKeyOnly = method === 'keys' && targetIsMap;
            const innerIterator = target[method](...args);
            const wrap = isShallow ? toShallow : isReadonly ? toReadonly : toReactive;
            !isReadonly &&
                track(rawTarget, "iterate" /* ITERATE */, isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY);
            // return a wrapped iterator which returns observed versions of the
            // values emitted from the real iterator
            return {
                // iterator protocol
                next() {
                    const { value, done } = innerIterator.next();
                    return done
                        ? { value, done }
                        : {
                            value: isPair ? [wrap(value[0]), wrap(value[1])] : wrap(value),
                            done
                        };
                },
                // iterable protocol
                [Symbol.iterator]() {
                    return this;
                }
            };
        };
    }
    function createReadonlyMethod(type) {
        return function (...args) {
            {
                const key = args[0] ? `on key "${args[0]}" ` : ``;
                console.warn(`${capitalize(type)} operation ${key}failed: target is readonly.`, toRaw(this));
            }
            return type === "delete" /* DELETE */ ? false : this;
        };
    }
    function createInstrumentations() {
        const mutableInstrumentations = {
            get(key) {
                return get$1(this, key);
            },
            get size() {
                return size(this);
            },
            has: has$1,
            add,
            set: set$1,
            delete: deleteEntry,
            clear,
            forEach: createForEach(false, false)
        };
        const shallowInstrumentations = {
            get(key) {
                return get$1(this, key, false, true);
            },
            get size() {
                return size(this);
            },
            has: has$1,
            add,
            set: set$1,
            delete: deleteEntry,
            clear,
            forEach: createForEach(false, true)
        };
        const readonlyInstrumentations = {
            get(key) {
                return get$1(this, key, true);
            },
            get size() {
                return size(this, true);
            },
            has(key) {
                return has$1.call(this, key, true);
            },
            add: createReadonlyMethod("add" /* ADD */),
            set: createReadonlyMethod("set" /* SET */),
            delete: createReadonlyMethod("delete" /* DELETE */),
            clear: createReadonlyMethod("clear" /* CLEAR */),
            forEach: createForEach(true, false)
        };
        const shallowReadonlyInstrumentations = {
            get(key) {
                return get$1(this, key, true, true);
            },
            get size() {
                return size(this, true);
            },
            has(key) {
                return has$1.call(this, key, true);
            },
            add: createReadonlyMethod("add" /* ADD */),
            set: createReadonlyMethod("set" /* SET */),
            delete: createReadonlyMethod("delete" /* DELETE */),
            clear: createReadonlyMethod("clear" /* CLEAR */),
            forEach: createForEach(true, true)
        };
        const iteratorMethods = ['keys', 'values', 'entries', Symbol.iterator];
        iteratorMethods.forEach(method => {
            mutableInstrumentations[method] = createIterableMethod(method, false, false);
            readonlyInstrumentations[method] = createIterableMethod(method, true, false);
            shallowInstrumentations[method] = createIterableMethod(method, false, true);
            shallowReadonlyInstrumentations[method] = createIterableMethod(method, true, true);
        });
        return [
            mutableInstrumentations,
            readonlyInstrumentations,
            shallowInstrumentations,
            shallowReadonlyInstrumentations
        ];
    }
    const [mutableInstrumentations, readonlyInstrumentations, shallowInstrumentations, shallowReadonlyInstrumentations] = /* #__PURE__*/ createInstrumentations();
    function createInstrumentationGetter(isReadonly, shallow) {
        const instrumentations = shallow
            ? isReadonly
                ? shallowReadonlyInstrumentations
                : shallowInstrumentations
            : isReadonly
                ? readonlyInstrumentations
                : mutableInstrumentations;
        return (target, key, receiver) => {
            if (key === "__v_isReactive" /* IS_REACTIVE */) {
                return !isReadonly;
            }
            else if (key === "__v_isReadonly" /* IS_READONLY */) {
                return isReadonly;
            }
            else if (key === "__v_raw" /* RAW */) {
                return target;
            }
            return Reflect.get(hasOwn(instrumentations, key) && key in target
                ? instrumentations
                : target, key, receiver);
        };
    }
    const mutableCollectionHandlers = {
        get: /*#__PURE__*/ createInstrumentationGetter(false, false)
    };
    const shallowCollectionHandlers = {
        get: /*#__PURE__*/ createInstrumentationGetter(false, true)
    };
    const readonlyCollectionHandlers = {
        get: /*#__PURE__*/ createInstrumentationGetter(true, false)
    };
    const shallowReadonlyCollectionHandlers = {
        get: /*#__PURE__*/ createInstrumentationGetter(true, true)
    };
    function checkIdentityKeys(target, has, key) {
        const rawKey = toRaw(key);
        if (rawKey !== key && has.call(target, rawKey)) {
            const type = toRawType(target);
            console.warn(`Reactive ${type} contains both the raw and reactive ` +
                `versions of the same object${type === `Map` ? ` as keys` : ``}, ` +
                `which can lead to inconsistencies. ` +
                `Avoid differentiating between the raw and reactive versions ` +
                `of an object and only use the reactive version if possible.`);
        }
    }

    const reactiveMap = new WeakMap();
    const shallowReactiveMap = new WeakMap();
    const readonlyMap = new WeakMap();
    const shallowReadonlyMap = new WeakMap();
    function targetTypeMap(rawType) {
        switch (rawType) {
            case 'Object':
            case 'Array':
                return 1 /* COMMON */;
            case 'Map':
            case 'Set':
            case 'WeakMap':
            case 'WeakSet':
                return 2 /* COLLECTION */;
            default:
                return 0 /* INVALID */;
        }
    }
    function getTargetType(value) {
        return value["__v_skip" /* SKIP */] || !Object.isExtensible(value)
            ? 0 /* INVALID */
            : targetTypeMap(toRawType(value));
    }
    function reactive(target) {
        // if trying to observe a readonly proxy, return the readonly version.
        if (isReadonly(target)) {
            return target;
        }
        return createReactiveObject(target, false, mutableHandlers, mutableCollectionHandlers, reactiveMap);
    }
    /**
     * Return a shallowly-reactive copy of the original object, where only the root
     * level properties are reactive. It also does not auto-unwrap refs (even at the
     * root level).
     */
    function shallowReactive(target) {
        return createReactiveObject(target, false, shallowReactiveHandlers, shallowCollectionHandlers, shallowReactiveMap);
    }
    /**
     * Creates a readonly copy of the original object. Note the returned copy is not
     * made reactive, but `readonly` can be called on an already reactive object.
     */
    function readonly(target) {
        return createReactiveObject(target, true, readonlyHandlers, readonlyCollectionHandlers, readonlyMap);
    }
    /**
     * Returns a reactive-copy of the original object, where only the root level
     * properties are readonly, and does NOT unwrap refs nor recursively convert
     * returned properties.
     * This is used for creating the props proxy object for stateful components.
     */
    function shallowReadonly(target) {
        return createReactiveObject(target, true, shallowReadonlyHandlers, shallowReadonlyCollectionHandlers, shallowReadonlyMap);
    }
    function createReactiveObject(target, isReadonly, baseHandlers, collectionHandlers, proxyMap) {
        if (!isObject(target)) {
            {
                console.warn(`value cannot be made reactive: ${String(target)}`);
            }
            return target;
        }
        // target is already a Proxy, return it.
        // exception: calling readonly() on a reactive object
        if (target["__v_raw" /* RAW */] &&
            !(isReadonly && target["__v_isReactive" /* IS_REACTIVE */])) {
            return target;
        }
        // target already has corresponding Proxy
        const existingProxy = proxyMap.get(target);
        if (existingProxy) {
            return existingProxy;
        }
        // only specific value types can be observed.
        const targetType = getTargetType(target);
        if (targetType === 0 /* INVALID */) {
            return target;
        }
        const proxy = new Proxy(target, targetType === 2 /* COLLECTION */ ? collectionHandlers : baseHandlers);
        proxyMap.set(target, proxy);
        return proxy;
    }
    function isReactive(value) {
        if (isReadonly(value)) {
            return isReactive(value["__v_raw" /* RAW */]);
        }
        return !!(value && value["__v_isReactive" /* IS_REACTIVE */]);
    }
    function isReadonly(value) {
        return !!(value && value["__v_isReadonly" /* IS_READONLY */]);
    }
    function isShallow$1(value) {
        return !!(value && value["__v_isShallow" /* IS_SHALLOW */]);
    }
    function isProxy(value) {
        return isReactive(value) || isReadonly(value);
    }
    function toRaw(observed) {
        const raw = observed && observed["__v_raw" /* RAW */];
        return raw ? toRaw(raw) : observed;
    }
    function markRaw(value) {
        def(value, "__v_skip" /* SKIP */, true);
        return value;
    }
    const toReactive = (value) => isObject(value) ? reactive(value) : value;
    const toReadonly = (value) => isObject(value) ? readonly(value) : value;

    function trackRefValue(ref) {
        if (shouldTrack && activeEffect) {
            ref = toRaw(ref);
            {
                trackEffects(ref.dep || (ref.dep = createDep()), {
                    target: ref,
                    type: "get" /* GET */,
                    key: 'value'
                });
            }
        }
    }
    function triggerRefValue(ref, newVal) {
        ref = toRaw(ref);
        if (ref.dep) {
            {
                triggerEffects(ref.dep, {
                    target: ref,
                    type: "set" /* SET */,
                    key: 'value',
                    newValue: newVal
                });
            }
        }
    }
    function isRef(r) {
        return !!(r && r.__v_isRef === true);
    }
    function unref(ref) {
        return isRef(ref) ? ref.value : ref;
    }
    const shallowUnwrapHandlers = {
        get: (target, key, receiver) => unref(Reflect.get(target, key, receiver)),
        set: (target, key, value, receiver) => {
            const oldValue = target[key];
            if (isRef(oldValue) && !isRef(value)) {
                oldValue.value = value;
                return true;
            }
            else {
                return Reflect.set(target, key, value, receiver);
            }
        }
    };
    function proxyRefs(objectWithRefs) {
        return isReactive(objectWithRefs)
            ? objectWithRefs
            : new Proxy(objectWithRefs, shallowUnwrapHandlers);
    }

    class ComputedRefImpl {
        constructor(getter, _setter, isReadonly, isSSR) {
            this._setter = _setter;
            this.dep = undefined;
            this.__v_isRef = true;
            this._dirty = true;
            this.effect = new ReactiveEffect(getter, () => {
                if (!this._dirty) {
                    this._dirty = true;
                    triggerRefValue(this);
                }
            });
            this.effect.computed = this;
            this.effect.active = this._cacheable = !isSSR;
            this["__v_isReadonly" /* IS_READONLY */] = isReadonly;
        }
        get value() {
            // the computed ref may get wrapped by other proxies e.g. readonly() #3376
            const self = toRaw(this);
            trackRefValue(self);
            if (self._dirty || !self._cacheable) {
                self._dirty = false;
                self._value = self.effect.run();
            }
            return self._value;
        }
        set value(newValue) {
            this._setter(newValue);
        }
    }
    function computed$1(getterOrOptions, debugOptions, isSSR = false) {
        let getter;
        let setter;
        const onlyGetter = isFunction(getterOrOptions);
        if (onlyGetter) {
            getter = getterOrOptions;
            setter = () => {
                    console.warn('Write operation failed: computed value is readonly');
                }
                ;
        }
        else {
            getter = getterOrOptions.get;
            setter = getterOrOptions.set;
        }
        const cRef = new ComputedRefImpl(getter, setter, onlyGetter || !setter, isSSR);
        if (debugOptions && !isSSR) {
            cRef.effect.onTrack = debugOptions.onTrack;
            cRef.effect.onTrigger = debugOptions.onTrigger;
        }
        return cRef;
    }

    const stack = [];
    function pushWarningContext(vnode) {
        stack.push(vnode);
    }
    function popWarningContext() {
        stack.pop();
    }
    function warn(msg, ...args) {
        // avoid props formatting or warn handler tracking deps that might be mutated
        // during patch, leading to infinite recursion.
        pauseTracking();
        const instance = stack.length ? stack[stack.length - 1].component : null;
        const appWarnHandler = instance && instance.appContext.config.warnHandler;
        const trace = getComponentTrace();
        if (appWarnHandler) {
            callWithErrorHandling(appWarnHandler, instance, 11 /* APP_WARN_HANDLER */, [
                msg + args.join(''),
                instance && instance.proxy,
                trace
                    .map(({ vnode }) => `at <${formatComponentName(instance, vnode.type)}>`)
                    .join('\n'),
                trace
            ]);
        }
        else {
            const warnArgs = [`[Vue warn]: ${msg}`, ...args];
            /* istanbul ignore if */
            if (trace.length &&
                // avoid spamming console during tests
                !false) {
                warnArgs.push(`\n`, ...formatTrace(trace));
            }
            console.warn(...warnArgs);
        }
        resetTracking();
    }
    function getComponentTrace() {
        let currentVNode = stack[stack.length - 1];
        if (!currentVNode) {
            return [];
        }
        // we can't just use the stack because it will be incomplete during updates
        // that did not start from the root. Re-construct the parent chain using
        // instance parent pointers.
        const normalizedStack = [];
        while (currentVNode) {
            const last = normalizedStack[0];
            if (last && last.vnode === currentVNode) {
                last.recurseCount++;
            }
            else {
                normalizedStack.push({
                    vnode: currentVNode,
                    recurseCount: 0
                });
            }
            const parentInstance = currentVNode.component && currentVNode.component.parent;
            currentVNode = parentInstance && parentInstance.vnode;
        }
        return normalizedStack;
    }
    /* istanbul ignore next */
    function formatTrace(trace) {
        const logs = [];
        trace.forEach((entry, i) => {
            logs.push(...(i === 0 ? [] : [`\n`]), ...formatTraceEntry(entry));
        });
        return logs;
    }
    function formatTraceEntry({ vnode, recurseCount }) {
        const postfix = recurseCount > 0 ? `... (${recurseCount} recursive calls)` : ``;
        const isRoot = vnode.component ? vnode.component.parent == null : false;
        const open = ` at <${formatComponentName(vnode.component, vnode.type, isRoot)}`;
        const close = `>` + postfix;
        return vnode.props
            ? [open, ...formatProps(vnode.props), close]
            : [open + close];
    }
    /* istanbul ignore next */
    function formatProps(props) {
        const res = [];
        const keys = Object.keys(props);
        keys.slice(0, 3).forEach(key => {
            res.push(...formatProp(key, props[key]));
        });
        if (keys.length > 3) {
            res.push(` ...`);
        }
        return res;
    }
    /* istanbul ignore next */
    function formatProp(key, value, raw) {
        if (isString(value)) {
            value = JSON.stringify(value);
            return raw ? value : [`${key}=${value}`];
        }
        else if (typeof value === 'number' ||
            typeof value === 'boolean' ||
            value == null) {
            return raw ? value : [`${key}=${value}`];
        }
        else if (isRef(value)) {
            value = formatProp(key, toRaw(value.value), true);
            return raw ? value : [`${key}=Ref<`, value, `>`];
        }
        else if (isFunction(value)) {
            return [`${key}=fn${value.name ? `<${value.name}>` : ``}`];
        }
        else {
            value = toRaw(value);
            return raw ? value : [`${key}=`, value];
        }
    }

    const ErrorTypeStrings = {
        ["sp" /* SERVER_PREFETCH */]: 'serverPrefetch hook',
        ["bc" /* BEFORE_CREATE */]: 'beforeCreate hook',
        ["c" /* CREATED */]: 'created hook',
        ["bm" /* BEFORE_MOUNT */]: 'beforeMount hook',
        ["m" /* MOUNTED */]: 'mounted hook',
        ["bu" /* BEFORE_UPDATE */]: 'beforeUpdate hook',
        ["u" /* UPDATED */]: 'updated',
        ["bum" /* BEFORE_UNMOUNT */]: 'beforeUnmount hook',
        ["um" /* UNMOUNTED */]: 'unmounted hook',
        ["a" /* ACTIVATED */]: 'activated hook',
        ["da" /* DEACTIVATED */]: 'deactivated hook',
        ["ec" /* ERROR_CAPTURED */]: 'errorCaptured hook',
        ["rtc" /* RENDER_TRACKED */]: 'renderTracked hook',
        ["rtg" /* RENDER_TRIGGERED */]: 'renderTriggered hook',
        [0 /* SETUP_FUNCTION */]: 'setup function',
        [1 /* RENDER_FUNCTION */]: 'render function',
        [2 /* WATCH_GETTER */]: 'watcher getter',
        [3 /* WATCH_CALLBACK */]: 'watcher callback',
        [4 /* WATCH_CLEANUP */]: 'watcher cleanup function',
        [5 /* NATIVE_EVENT_HANDLER */]: 'native event handler',
        [6 /* COMPONENT_EVENT_HANDLER */]: 'component event handler',
        [7 /* VNODE_HOOK */]: 'vnode hook',
        [8 /* DIRECTIVE_HOOK */]: 'directive hook',
        [9 /* TRANSITION_HOOK */]: 'transition hook',
        [10 /* APP_ERROR_HANDLER */]: 'app errorHandler',
        [11 /* APP_WARN_HANDLER */]: 'app warnHandler',
        [12 /* FUNCTION_REF */]: 'ref function',
        [13 /* ASYNC_COMPONENT_LOADER */]: 'async component loader',
        [14 /* SCHEDULER */]: 'scheduler flush. This is likely a Vue internals bug. ' +
            'Please open an issue at https://new-issue.vuejs.org/?repo=vuejs/core'
    };
    function callWithErrorHandling(fn, instance, type, args) {
        let res;
        try {
            res = args ? fn(...args) : fn();
        }
        catch (err) {
            handleError(err, instance, type);
        }
        return res;
    }
    function callWithAsyncErrorHandling(fn, instance, type, args) {
        if (isFunction(fn)) {
            const res = callWithErrorHandling(fn, instance, type, args);
            if (res && isPromise(res)) {
                res.catch(err => {
                    handleError(err, instance, type);
                });
            }
            return res;
        }
        const values = [];
        for (let i = 0; i < fn.length; i++) {
            values.push(callWithAsyncErrorHandling(fn[i], instance, type, args));
        }
        return values;
    }
    function handleError(err, instance, type, throwInDev = true) {
        const contextVNode = instance ? instance.vnode : null;
        if (instance) {
            let cur = instance.parent;
            // the exposed instance is the render proxy to keep it consistent with 2.x
            const exposedInstance = instance.proxy;
            // in production the hook receives only the error code
            const errorInfo = ErrorTypeStrings[type] ;
            while (cur) {
                const errorCapturedHooks = cur.ec;
                if (errorCapturedHooks) {
                    for (let i = 0; i < errorCapturedHooks.length; i++) {
                        if (errorCapturedHooks[i](err, exposedInstance, errorInfo) === false) {
                            return;
                        }
                    }
                }
                cur = cur.parent;
            }
            // app-level handling
            const appErrorHandler = instance.appContext.config.errorHandler;
            if (appErrorHandler) {
                callWithErrorHandling(appErrorHandler, null, 10 /* APP_ERROR_HANDLER */, [err, exposedInstance, errorInfo]);
                return;
            }
        }
        logError(err, type, contextVNode, throwInDev);
    }
    function logError(err, type, contextVNode, throwInDev = true) {
        {
            const info = ErrorTypeStrings[type];
            if (contextVNode) {
                pushWarningContext(contextVNode);
            }
            warn(`Unhandled error${info ? ` during execution of ${info}` : ``}`);
            if (contextVNode) {
                popWarningContext();
            }
            // crash in dev by default so it's more noticeable
            if (throwInDev) {
                throw err;
            }
            else {
                console.error(err);
            }
        }
    }

    let isFlushing = false;
    let isFlushPending = false;
    const queue = [];
    let flushIndex = 0;
    const pendingPreFlushCbs = [];
    let activePreFlushCbs = null;
    let preFlushIndex = 0;
    const pendingPostFlushCbs = [];
    let activePostFlushCbs = null;
    let postFlushIndex = 0;
    const resolvedPromise = /*#__PURE__*/ Promise.resolve();
    let currentFlushPromise = null;
    let currentPreFlushParentJob = null;
    const RECURSION_LIMIT = 100;
    function nextTick(fn) {
        const p = currentFlushPromise || resolvedPromise;
        return fn ? p.then(this ? fn.bind(this) : fn) : p;
    }
    // #2768
    // Use binary-search to find a suitable position in the queue,
    // so that the queue maintains the increasing order of job's id,
    // which can prevent the job from being skipped and also can avoid repeated patching.
    function findInsertionIndex(id) {
        // the start index should be `flushIndex + 1`
        let start = flushIndex + 1;
        let end = queue.length;
        while (start < end) {
            const middle = (start + end) >>> 1;
            const middleJobId = getId(queue[middle]);
            middleJobId < id ? (start = middle + 1) : (end = middle);
        }
        return start;
    }
    function queueJob(job) {
        // the dedupe search uses the startIndex argument of Array.includes()
        // by default the search index includes the current job that is being run
        // so it cannot recursively trigger itself again.
        // if the job is a watch() callback, the search will start with a +1 index to
        // allow it recursively trigger itself - it is the user's responsibility to
        // ensure it doesn't end up in an infinite loop.
        if ((!queue.length ||
            !queue.includes(job, isFlushing && job.allowRecurse ? flushIndex + 1 : flushIndex)) &&
            job !== currentPreFlushParentJob) {
            if (job.id == null) {
                queue.push(job);
            }
            else {
                queue.splice(findInsertionIndex(job.id), 0, job);
            }
            queueFlush();
        }
    }
    function queueFlush() {
        if (!isFlushing && !isFlushPending) {
            isFlushPending = true;
            currentFlushPromise = resolvedPromise.then(flushJobs);
        }
    }
    function invalidateJob(job) {
        const i = queue.indexOf(job);
        if (i > flushIndex) {
            queue.splice(i, 1);
        }
    }
    function queueCb(cb, activeQueue, pendingQueue, index) {
        if (!isArray(cb)) {
            if (!activeQueue ||
                !activeQueue.includes(cb, cb.allowRecurse ? index + 1 : index)) {
                pendingQueue.push(cb);
            }
        }
        else {
            // if cb is an array, it is a component lifecycle hook which can only be
            // triggered by a job, which is already deduped in the main queue, so
            // we can skip duplicate check here to improve perf
            pendingQueue.push(...cb);
        }
        queueFlush();
    }
    function queuePreFlushCb(cb) {
        queueCb(cb, activePreFlushCbs, pendingPreFlushCbs, preFlushIndex);
    }
    function queuePostFlushCb(cb) {
        queueCb(cb, activePostFlushCbs, pendingPostFlushCbs, postFlushIndex);
    }
    function flushPreFlushCbs(seen, parentJob = null) {
        if (pendingPreFlushCbs.length) {
            currentPreFlushParentJob = parentJob;
            activePreFlushCbs = [...new Set(pendingPreFlushCbs)];
            pendingPreFlushCbs.length = 0;
            {
                seen = seen || new Map();
            }
            for (preFlushIndex = 0; preFlushIndex < activePreFlushCbs.length; preFlushIndex++) {
                if (checkRecursiveUpdates(seen, activePreFlushCbs[preFlushIndex])) {
                    continue;
                }
                activePreFlushCbs[preFlushIndex]();
            }
            activePreFlushCbs = null;
            preFlushIndex = 0;
            currentPreFlushParentJob = null;
            // recursively flush until it drains
            flushPreFlushCbs(seen, parentJob);
        }
    }
    function flushPostFlushCbs(seen) {
        // flush any pre cbs queued during the flush (e.g. pre watchers)
        flushPreFlushCbs();
        if (pendingPostFlushCbs.length) {
            const deduped = [...new Set(pendingPostFlushCbs)];
            pendingPostFlushCbs.length = 0;
            // #1947 already has active queue, nested flushPostFlushCbs call
            if (activePostFlushCbs) {
                activePostFlushCbs.push(...deduped);
                return;
            }
            activePostFlushCbs = deduped;
            {
                seen = seen || new Map();
            }
            activePostFlushCbs.sort((a, b) => getId(a) - getId(b));
            for (postFlushIndex = 0; postFlushIndex < activePostFlushCbs.length; postFlushIndex++) {
                if (checkRecursiveUpdates(seen, activePostFlushCbs[postFlushIndex])) {
                    continue;
                }
                activePostFlushCbs[postFlushIndex]();
            }
            activePostFlushCbs = null;
            postFlushIndex = 0;
        }
    }
    const getId = (job) => job.id == null ? Infinity : job.id;
    function flushJobs(seen) {
        isFlushPending = false;
        isFlushing = true;
        {
            seen = seen || new Map();
        }
        flushPreFlushCbs(seen);
        // Sort queue before flush.
        // This ensures that:
        // 1. Components are updated from parent to child. (because parent is always
        //    created before the child so its render effect will have smaller
        //    priority number)
        // 2. If a component is unmounted during a parent component's update,
        //    its update can be skipped.
        queue.sort((a, b) => getId(a) - getId(b));
        // conditional usage of checkRecursiveUpdate must be determined out of
        // try ... catch block since Rollup by default de-optimizes treeshaking
        // inside try-catch. This can leave all warning code unshaked. Although
        // they would get eventually shaken by a minifier like terser, some minifiers
        // would fail to do that (e.g. https://github.com/evanw/esbuild/issues/1610)
        const check = (job) => checkRecursiveUpdates(seen, job)
            ;
        try {
            for (flushIndex = 0; flushIndex < queue.length; flushIndex++) {
                const job = queue[flushIndex];
                if (job && job.active !== false) {
                    if (("development" !== 'production') && check(job)) {
                        continue;
                    }
                    // console.log(`running:`, job.id)
                    callWithErrorHandling(job, null, 14 /* SCHEDULER */);
                }
            }
        }
        finally {
            flushIndex = 0;
            queue.length = 0;
            flushPostFlushCbs(seen);
            isFlushing = false;
            currentFlushPromise = null;
            // some postFlushCb queued jobs!
            // keep flushing until it drains.
            if (queue.length ||
                pendingPreFlushCbs.length ||
                pendingPostFlushCbs.length) {
                flushJobs(seen);
            }
        }
    }
    function checkRecursiveUpdates(seen, fn) {
        if (!seen.has(fn)) {
            seen.set(fn, 1);
        }
        else {
            const count = seen.get(fn);
            if (count > RECURSION_LIMIT) {
                const instance = fn.ownerInstance;
                const componentName = instance && getComponentName(instance.type);
                warn(`Maximum recursive updates exceeded${componentName ? ` in component <${componentName}>` : ``}. ` +
                    `This means you have a reactive effect that is mutating its own ` +
                    `dependencies and thus recursively triggering itself. Possible sources ` +
                    `include component template, render function, updated hook or ` +
                    `watcher source function.`);
                return true;
            }
            else {
                seen.set(fn, count + 1);
            }
        }
    }

    /* eslint-disable no-restricted-globals */
    let isHmrUpdating = false;
    const hmrDirtyComponents = new Set();
    // Expose the HMR runtime on the global object
    // This makes it entirely tree-shakable without polluting the exports and makes
    // it easier to be used in toolings like vue-loader
    // Note: for a component to be eligible for HMR it also needs the __hmrId option
    // to be set so that its instances can be registered / removed.
    {
        getGlobalThis().__VUE_HMR_RUNTIME__ = {
            createRecord: tryWrap(createRecord),
            rerender: tryWrap(rerender),
            reload: tryWrap(reload)
        };
    }
    const map = new Map();
    function registerHMR(instance) {
        const id = instance.type.__hmrId;
        let record = map.get(id);
        if (!record) {
            createRecord(id, instance.type);
            record = map.get(id);
        }
        record.instances.add(instance);
    }
    function unregisterHMR(instance) {
        map.get(instance.type.__hmrId).instances.delete(instance);
    }
    function createRecord(id, initialDef) {
        if (map.has(id)) {
            return false;
        }
        map.set(id, {
            initialDef: normalizeClassComponent(initialDef),
            instances: new Set()
        });
        return true;
    }
    function normalizeClassComponent(component) {
        return isClassComponent(component) ? component.__vccOpts : component;
    }
    function rerender(id, newRender) {
        const record = map.get(id);
        if (!record) {
            return;
        }
        // update initial record (for not-yet-rendered component)
        record.initialDef.render = newRender;
        [...record.instances].forEach(instance => {
            if (newRender) {
                instance.render = newRender;
                normalizeClassComponent(instance.type).render = newRender;
            }
            instance.renderCache = [];
            // this flag forces child components with slot content to update
            isHmrUpdating = true;
            instance.update();
            isHmrUpdating = false;
        });
    }
    function reload(id, newComp) {
        const record = map.get(id);
        if (!record)
            return;
        newComp = normalizeClassComponent(newComp);
        // update initial def (for not-yet-rendered components)
        updateComponentDef(record.initialDef, newComp);
        // create a snapshot which avoids the set being mutated during updates
        const instances = [...record.instances];
        for (const instance of instances) {
            const oldComp = normalizeClassComponent(instance.type);
            if (!hmrDirtyComponents.has(oldComp)) {
                // 1. Update existing comp definition to match new one
                if (oldComp !== record.initialDef) {
                    updateComponentDef(oldComp, newComp);
                }
                // 2. mark definition dirty. This forces the renderer to replace the
                // component on patch.
                hmrDirtyComponents.add(oldComp);
            }
            // 3. invalidate options resolution cache
            instance.appContext.optionsCache.delete(instance.type);
            // 4. actually update
            if (instance.ceReload) {
                // custom element
                hmrDirtyComponents.add(oldComp);
                instance.ceReload(newComp.styles);
                hmrDirtyComponents.delete(oldComp);
            }
            else if (instance.parent) {
                // 4. Force the parent instance to re-render. This will cause all updated
                // components to be unmounted and re-mounted. Queue the update so that we
                // don't end up forcing the same parent to re-render multiple times.
                queueJob(instance.parent.update);
                // instance is the inner component of an async custom element
                // invoke to reset styles
                if (instance.parent.type.__asyncLoader &&
                    instance.parent.ceReload) {
                    instance.parent.ceReload(newComp.styles);
                }
            }
            else if (instance.appContext.reload) {
                // root instance mounted via createApp() has a reload method
                instance.appContext.reload();
            }
            else if (typeof window !== 'undefined') {
                // root instance inside tree created via raw render(). Force reload.
                window.location.reload();
            }
            else {
                console.warn('[HMR] Root or manually mounted instance modified. Full reload required.');
            }
        }
        // 5. make sure to cleanup dirty hmr components after update
        queuePostFlushCb(() => {
            for (const instance of instances) {
                hmrDirtyComponents.delete(normalizeClassComponent(instance.type));
            }
        });
    }
    function updateComponentDef(oldComp, newComp) {
        extend(oldComp, newComp);
        for (const key in oldComp) {
            if (key !== '__file' && !(key in newComp)) {
                delete oldComp[key];
            }
        }
    }
    function tryWrap(fn) {
        return (id, arg) => {
            try {
                return fn(id, arg);
            }
            catch (e) {
                console.error(e);
                console.warn(`[HMR] Something went wrong during Vue component hot-reload. ` +
                    `Full reload required.`);
            }
        };
    }

    let devtools;
    let buffer = [];
    let devtoolsNotInstalled = false;
    function emit(event, ...args) {
        if (devtools) {
            devtools.emit(event, ...args);
        }
        else if (!devtoolsNotInstalled) {
            buffer.push({ event, args });
        }
    }
    function setDevtoolsHook(hook, target) {
        var _a, _b;
        devtools = hook;
        if (devtools) {
            devtools.enabled = true;
            buffer.forEach(({ event, args }) => devtools.emit(event, ...args));
            buffer = [];
        }
        else if (
        // handle late devtools injection - only do this if we are in an actual
        // browser environment to avoid the timer handle stalling test runner exit
        // (#4815)
        typeof window !== 'undefined' &&
            // some envs mock window but not fully
            window.HTMLElement &&
            // also exclude jsdom
            !((_b = (_a = window.navigator) === null || _a === void 0 ? void 0 : _a.userAgent) === null || _b === void 0 ? void 0 : _b.includes('jsdom'))) {
            const replay = (target.__VUE_DEVTOOLS_HOOK_REPLAY__ =
                target.__VUE_DEVTOOLS_HOOK_REPLAY__ || []);
            replay.push((newHook) => {
                setDevtoolsHook(newHook, target);
            });
            // clear buffer after 3s - the user probably doesn't have devtools installed
            // at all, and keeping the buffer will cause memory leaks (#4738)
            setTimeout(() => {
                if (!devtools) {
                    target.__VUE_DEVTOOLS_HOOK_REPLAY__ = null;
                    devtoolsNotInstalled = true;
                    buffer = [];
                }
            }, 3000);
        }
        else {
            // non-browser env, assume not installed
            devtoolsNotInstalled = true;
            buffer = [];
        }
    }
    function devtoolsInitApp(app, version) {
        emit("app:init" /* APP_INIT */, app, version, {
            Fragment,
            Text,
            Comment,
            Static
        });
    }
    function devtoolsUnmountApp(app) {
        emit("app:unmount" /* APP_UNMOUNT */, app);
    }
    const devtoolsComponentAdded = /*#__PURE__*/ createDevtoolsComponentHook("component:added" /* COMPONENT_ADDED */);
    const devtoolsComponentUpdated = 
    /*#__PURE__*/ createDevtoolsComponentHook("component:updated" /* COMPONENT_UPDATED */);
    const devtoolsComponentRemoved = 
    /*#__PURE__*/ createDevtoolsComponentHook("component:removed" /* COMPONENT_REMOVED */);
    function createDevtoolsComponentHook(hook) {
        return (component) => {
            emit(hook, component.appContext.app, component.uid, component.parent ? component.parent.uid : undefined, component);
        };
    }
    const devtoolsPerfStart = /*#__PURE__*/ createDevtoolsPerformanceHook("perf:start" /* PERFORMANCE_START */);
    const devtoolsPerfEnd = /*#__PURE__*/ createDevtoolsPerformanceHook("perf:end" /* PERFORMANCE_END */);
    function createDevtoolsPerformanceHook(hook) {
        return (component, type, time) => {
            emit(hook, component.appContext.app, component.uid, component, type, time);
        };
    }
    function devtoolsComponentEmit(component, event, params) {
        emit("component:emit" /* COMPONENT_EMIT */, component.appContext.app, component, event, params);
    }

    function emit$1(instance, event, ...rawArgs) {
        if (instance.isUnmounted)
            return;
        const props = instance.vnode.props || EMPTY_OBJ;
        {
            const { emitsOptions, propsOptions: [propsOptions] } = instance;
            if (emitsOptions) {
                if (!(event in emitsOptions) &&
                    !(false )) {
                    if (!propsOptions || !(toHandlerKey(event) in propsOptions)) {
                        warn(`Component emitted event "${event}" but it is neither declared in ` +
                            `the emits option nor as an "${toHandlerKey(event)}" prop.`);
                    }
                }
                else {
                    const validator = emitsOptions[event];
                    if (isFunction(validator)) {
                        const isValid = validator(...rawArgs);
                        if (!isValid) {
                            warn(`Invalid event arguments: event validation failed for event "${event}".`);
                        }
                    }
                }
            }
        }
        let args = rawArgs;
        const isModelListener = event.startsWith('update:');
        // for v-model update:xxx events, apply modifiers on args
        const modelArg = isModelListener && event.slice(7);
        if (modelArg && modelArg in props) {
            const modifiersKey = `${modelArg === 'modelValue' ? 'model' : modelArg}Modifiers`;
            const { number, trim } = props[modifiersKey] || EMPTY_OBJ;
            if (trim) {
                args = rawArgs.map(a => a.trim());
            }
            if (number) {
                args = rawArgs.map(toNumber);
            }
        }
        {
            devtoolsComponentEmit(instance, event, args);
        }
        {
            const lowerCaseEvent = event.toLowerCase();
            if (lowerCaseEvent !== event && props[toHandlerKey(lowerCaseEvent)]) {
                warn(`Event "${lowerCaseEvent}" is emitted in component ` +
                    `${formatComponentName(instance, instance.type)} but the handler is registered for "${event}". ` +
                    `Note that HTML attributes are case-insensitive and you cannot use ` +
                    `v-on to listen to camelCase events when using in-DOM templates. ` +
                    `You should probably use "${hyphenate(event)}" instead of "${event}".`);
            }
        }
        let handlerName;
        let handler = props[(handlerName = toHandlerKey(event))] ||
            // also try camelCase event handler (#2249)
            props[(handlerName = toHandlerKey(camelize(event)))];
        // for v-model update:xxx events, also trigger kebab-case equivalent
        // for props passed via kebab-case
        if (!handler && isModelListener) {
            handler = props[(handlerName = toHandlerKey(hyphenate(event)))];
        }
        if (handler) {
            callWithAsyncErrorHandling(handler, instance, 6 /* COMPONENT_EVENT_HANDLER */, args);
        }
        const onceHandler = props[handlerName + `Once`];
        if (onceHandler) {
            if (!instance.emitted) {
                instance.emitted = {};
            }
            else if (instance.emitted[handlerName]) {
                return;
            }
            instance.emitted[handlerName] = true;
            callWithAsyncErrorHandling(onceHandler, instance, 6 /* COMPONENT_EVENT_HANDLER */, args);
        }
    }
    function normalizeEmitsOptions(comp, appContext, asMixin = false) {
        const cache = appContext.emitsCache;
        const cached = cache.get(comp);
        if (cached !== undefined) {
            return cached;
        }
        const raw = comp.emits;
        let normalized = {};
        // apply mixin/extends props
        let hasExtends = false;
        if (!isFunction(comp)) {
            const extendEmits = (raw) => {
                const normalizedFromExtend = normalizeEmitsOptions(raw, appContext, true);
                if (normalizedFromExtend) {
                    hasExtends = true;
                    extend(normalized, normalizedFromExtend);
                }
            };
            if (!asMixin && appContext.mixins.length) {
                appContext.mixins.forEach(extendEmits);
            }
            if (comp.extends) {
                extendEmits(comp.extends);
            }
            if (comp.mixins) {
                comp.mixins.forEach(extendEmits);
            }
        }
        if (!raw && !hasExtends) {
            cache.set(comp, null);
            return null;
        }
        if (isArray(raw)) {
            raw.forEach(key => (normalized[key] = null));
        }
        else {
            extend(normalized, raw);
        }
        cache.set(comp, normalized);
        return normalized;
    }
    // Check if an incoming prop key is a declared emit event listener.
    // e.g. With `emits: { click: null }`, props named `onClick` and `onclick` are
    // both considered matched listeners.
    function isEmitListener(options, key) {
        if (!options || !isOn(key)) {
            return false;
        }
        key = key.slice(2).replace(/Once$/, '');
        return (hasOwn(options, key[0].toLowerCase() + key.slice(1)) ||
            hasOwn(options, hyphenate(key)) ||
            hasOwn(options, key));
    }

    /**
     * mark the current rendering instance for asset resolution (e.g.
     * resolveComponent, resolveDirective) during render
     */
    let currentRenderingInstance = null;
    let currentScopeId = null;
    /**
     * Note: rendering calls maybe nested. The function returns the parent rendering
     * instance if present, which should be restored after the render is done:
     *
     * ```js
     * const prev = setCurrentRenderingInstance(i)
     * // ...render
     * setCurrentRenderingInstance(prev)
     * ```
     */
    function setCurrentRenderingInstance(instance) {
        const prev = currentRenderingInstance;
        currentRenderingInstance = instance;
        currentScopeId = (instance && instance.type.__scopeId) || null;
        return prev;
    }
    /**
     * Wrap a slot function to memoize current rendering instance
     * @private compiler helper
     */
    function withCtx(fn, ctx = currentRenderingInstance, isNonScopedSlot // false only
    ) {
        if (!ctx)
            return fn;
        // already normalized
        if (fn._n) {
            return fn;
        }
        const renderFnWithContext = (...args) => {
            // If a user calls a compiled slot inside a template expression (#1745), it
            // can mess up block tracking, so by default we disable block tracking and
            // force bail out when invoking a compiled slot (indicated by the ._d flag).
            // This isn't necessary if rendering a compiled `<slot>`, so we flip the
            // ._d flag off when invoking the wrapped fn inside `renderSlot`.
            if (renderFnWithContext._d) {
                setBlockTracking(-1);
            }
            const prevInstance = setCurrentRenderingInstance(ctx);
            const res = fn(...args);
            setCurrentRenderingInstance(prevInstance);
            if (renderFnWithContext._d) {
                setBlockTracking(1);
            }
            {
                devtoolsComponentUpdated(ctx);
            }
            return res;
        };
        // mark normalized to avoid duplicated wrapping
        renderFnWithContext._n = true;
        // mark this as compiled by default
        // this is used in vnode.ts -> normalizeChildren() to set the slot
        // rendering flag.
        renderFnWithContext._c = true;
        // disable block tracking by default
        renderFnWithContext._d = true;
        return renderFnWithContext;
    }

    /**
     * dev only flag to track whether $attrs was used during render.
     * If $attrs was used during render then the warning for failed attrs
     * fallthrough can be suppressed.
     */
    let accessedAttrs = false;
    function markAttrsAccessed() {
        accessedAttrs = true;
    }
    function renderComponentRoot(instance) {
        const { type: Component, vnode, proxy, withProxy, props, propsOptions: [propsOptions], slots, attrs, emit, render, renderCache, data, setupState, ctx, inheritAttrs } = instance;
        let result;
        let fallthroughAttrs;
        const prev = setCurrentRenderingInstance(instance);
        {
            accessedAttrs = false;
        }
        try {
            if (vnode.shapeFlag & 4 /* STATEFUL_COMPONENT */) {
                // withProxy is a proxy with a different `has` trap only for
                // runtime-compiled render functions using `with` block.
                const proxyToUse = withProxy || proxy;
                result = normalizeVNode(render.call(proxyToUse, proxyToUse, renderCache, props, setupState, data, ctx));
                fallthroughAttrs = attrs;
            }
            else {
                // functional
                const render = Component;
                // in dev, mark attrs accessed if optional props (attrs === props)
                if (("development" !== 'production') && attrs === props) {
                    markAttrsAccessed();
                }
                result = normalizeVNode(render.length > 1
                    ? render(props, ("development" !== 'production')
                        ? {
                            get attrs() {
                                markAttrsAccessed();
                                return attrs;
                            },
                            slots,
                            emit
                        }
                        : { attrs, slots, emit })
                    : render(props, null /* we know it doesn't need it */));
                fallthroughAttrs = Component.props
                    ? attrs
                    : getFunctionalFallthrough(attrs);
            }
        }
        catch (err) {
            blockStack.length = 0;
            handleError(err, instance, 1 /* RENDER_FUNCTION */);
            result = createVNode(Comment);
        }
        // attr merging
        // in dev mode, comments are preserved, and it's possible for a template
        // to have comments along side the root element which makes it a fragment
        let root = result;
        let setRoot = undefined;
        if (result.patchFlag > 0 &&
            result.patchFlag & 2048 /* DEV_ROOT_FRAGMENT */) {
            [root, setRoot] = getChildRoot(result);
        }
        if (fallthroughAttrs && inheritAttrs !== false) {
            const keys = Object.keys(fallthroughAttrs);
            const { shapeFlag } = root;
            if (keys.length) {
                if (shapeFlag & (1 /* ELEMENT */ | 6 /* COMPONENT */)) {
                    if (propsOptions && keys.some(isModelListener)) {
                        // If a v-model listener (onUpdate:xxx) has a corresponding declared
                        // prop, it indicates this component expects to handle v-model and
                        // it should not fallthrough.
                        // related: #1543, #1643, #1989
                        fallthroughAttrs = filterModelListeners(fallthroughAttrs, propsOptions);
                    }
                    root = cloneVNode(root, fallthroughAttrs);
                }
                else if (!accessedAttrs && root.type !== Comment) {
                    const allAttrs = Object.keys(attrs);
                    const eventAttrs = [];
                    const extraAttrs = [];
                    for (let i = 0, l = allAttrs.length; i < l; i++) {
                        const key = allAttrs[i];
                        if (isOn(key)) {
                            // ignore v-model handlers when they fail to fallthrough
                            if (!isModelListener(key)) {
                                // remove `on`, lowercase first letter to reflect event casing
                                // accurately
                                eventAttrs.push(key[2].toLowerCase() + key.slice(3));
                            }
                        }
                        else {
                            extraAttrs.push(key);
                        }
                    }
                    if (extraAttrs.length) {
                        warn(`Extraneous non-props attributes (` +
                            `${extraAttrs.join(', ')}) ` +
                            `were passed to component but could not be automatically inherited ` +
                            `because component renders fragment or text root nodes.`);
                    }
                    if (eventAttrs.length) {
                        warn(`Extraneous non-emits event listeners (` +
                            `${eventAttrs.join(', ')}) ` +
                            `were passed to component but could not be automatically inherited ` +
                            `because component renders fragment or text root nodes. ` +
                            `If the listener is intended to be a component custom event listener only, ` +
                            `declare it using the "emits" option.`);
                    }
                }
            }
        }
        // inherit directives
        if (vnode.dirs) {
            if (!isElementRoot(root)) {
                warn(`Runtime directive used on component with non-element root node. ` +
                    `The directives will not function as intended.`);
            }
            // clone before mutating since the root may be a hoisted vnode
            root = cloneVNode(root);
            root.dirs = root.dirs ? root.dirs.concat(vnode.dirs) : vnode.dirs;
        }
        // inherit transition data
        if (vnode.transition) {
            if (!isElementRoot(root)) {
                warn(`Component inside <Transition> renders non-element root node ` +
                    `that cannot be animated.`);
            }
            root.transition = vnode.transition;
        }
        if (setRoot) {
            setRoot(root);
        }
        else {
            result = root;
        }
        setCurrentRenderingInstance(prev);
        return result;
    }
    /**
     * dev only
     * In dev mode, template root level comments are rendered, which turns the
     * template into a fragment root, but we need to locate the single element
     * root for attrs and scope id processing.
     */
    const getChildRoot = (vnode) => {
        const rawChildren = vnode.children;
        const dynamicChildren = vnode.dynamicChildren;
        const childRoot = filterSingleRoot(rawChildren);
        if (!childRoot) {
            return [vnode, undefined];
        }
        const index = rawChildren.indexOf(childRoot);
        const dynamicIndex = dynamicChildren ? dynamicChildren.indexOf(childRoot) : -1;
        const setRoot = (updatedRoot) => {
            rawChildren[index] = updatedRoot;
            if (dynamicChildren) {
                if (dynamicIndex > -1) {
                    dynamicChildren[dynamicIndex] = updatedRoot;
                }
                else if (updatedRoot.patchFlag > 0) {
                    vnode.dynamicChildren = [...dynamicChildren, updatedRoot];
                }
            }
        };
        return [normalizeVNode(childRoot), setRoot];
    };
    function filterSingleRoot(children) {
        let singleRoot;
        for (let i = 0; i < children.length; i++) {
            const child = children[i];
            if (isVNode(child)) {
                // ignore user comment
                if (child.type !== Comment || child.children === 'v-if') {
                    if (singleRoot) {
                        // has more than 1 non-comment child, return now
                        return;
                    }
                    else {
                        singleRoot = child;
                    }
                }
            }
            else {
                return;
            }
        }
        return singleRoot;
    }
    const getFunctionalFallthrough = (attrs) => {
        let res;
        for (const key in attrs) {
            if (key === 'class' || key === 'style' || isOn(key)) {
                (res || (res = {}))[key] = attrs[key];
            }
        }
        return res;
    };
    const filterModelListeners = (attrs, props) => {
        const res = {};
        for (const key in attrs) {
            if (!isModelListener(key) || !(key.slice(9) in props)) {
                res[key] = attrs[key];
            }
        }
        return res;
    };
    const isElementRoot = (vnode) => {
        return (vnode.shapeFlag & (6 /* COMPONENT */ | 1 /* ELEMENT */) ||
            vnode.type === Comment // potential v-if branch switch
        );
    };
    function shouldUpdateComponent(prevVNode, nextVNode, optimized) {
        const { props: prevProps, children: prevChildren, component } = prevVNode;
        const { props: nextProps, children: nextChildren, patchFlag } = nextVNode;
        const emits = component.emitsOptions;
        // Parent component's render function was hot-updated. Since this may have
        // caused the child component's slots content to have changed, we need to
        // force the child to update as well.
        if ((prevChildren || nextChildren) && isHmrUpdating) {
            return true;
        }
        // force child update for runtime directive or transition on component vnode.
        if (nextVNode.dirs || nextVNode.transition) {
            return true;
        }
        if (optimized && patchFlag >= 0) {
            if (patchFlag & 1024 /* DYNAMIC_SLOTS */) {
                // slot content that references values that might have changed,
                // e.g. in a v-for
                return true;
            }
            if (patchFlag & 16 /* FULL_PROPS */) {
                if (!prevProps) {
                    return !!nextProps;
                }
                // presence of this flag indicates props are always non-null
                return hasPropsChanged(prevProps, nextProps, emits);
            }
            else if (patchFlag & 8 /* PROPS */) {
                const dynamicProps = nextVNode.dynamicProps;
                for (let i = 0; i < dynamicProps.length; i++) {
                    const key = dynamicProps[i];
                    if (nextProps[key] !== prevProps[key] &&
                        !isEmitListener(emits, key)) {
                        return true;
                    }
                }
            }
        }
        else {
            // this path is only taken by manually written render functions
            // so presence of any children leads to a forced update
            if (prevChildren || nextChildren) {
                if (!nextChildren || !nextChildren.$stable) {
                    return true;
                }
            }
            if (prevProps === nextProps) {
                return false;
            }
            if (!prevProps) {
                return !!nextProps;
            }
            if (!nextProps) {
                return true;
            }
            return hasPropsChanged(prevProps, nextProps, emits);
        }
        return false;
    }
    function hasPropsChanged(prevProps, nextProps, emitsOptions) {
        const nextKeys = Object.keys(nextProps);
        if (nextKeys.length !== Object.keys(prevProps).length) {
            return true;
        }
        for (let i = 0; i < nextKeys.length; i++) {
            const key = nextKeys[i];
            if (nextProps[key] !== prevProps[key] &&
                !isEmitListener(emitsOptions, key)) {
                return true;
            }
        }
        return false;
    }
    function updateHOCHostEl({ vnode, parent }, el // HostNode
    ) {
        while (parent && parent.subTree === vnode) {
            (vnode = parent.vnode).el = el;
            parent = parent.parent;
        }
    }

    const isSuspense = (type) => type.__isSuspense;
    function queueEffectWithSuspense(fn, suspense) {
        if (suspense && suspense.pendingBranch) {
            if (isArray(fn)) {
                suspense.effects.push(...fn);
            }
            else {
                suspense.effects.push(fn);
            }
        }
        else {
            queuePostFlushCb(fn);
        }
    }

    function provide(key, value) {
        if (!currentInstance) {
            {
                warn(`provide() can only be used inside setup().`);
            }
        }
        else {
            let provides = currentInstance.provides;
            // by default an instance inherits its parent's provides object
            // but when it needs to provide values of its own, it creates its
            // own provides object using parent provides object as prototype.
            // this way in `inject` we can simply look up injections from direct
            // parent and let the prototype chain do the work.
            const parentProvides = currentInstance.parent && currentInstance.parent.provides;
            if (parentProvides === provides) {
                provides = currentInstance.provides = Object.create(parentProvides);
            }
            // TS doesn't allow symbol as index type
            provides[key] = value;
        }
    }
    function inject(key, defaultValue, treatDefaultAsFactory = false) {
        // fallback to `currentRenderingInstance` so that this can be called in
        // a functional component
        const instance = currentInstance || currentRenderingInstance;
        if (instance) {
            // #2400
            // to support `app.use` plugins,
            // fallback to appContext's `provides` if the instance is at root
            const provides = instance.parent == null
                ? instance.vnode.appContext && instance.vnode.appContext.provides
                : instance.parent.provides;
            if (provides && key in provides) {
                // TS doesn't allow symbol as index type
                return provides[key];
            }
            else if (arguments.length > 1) {
                return treatDefaultAsFactory && isFunction(defaultValue)
                    ? defaultValue.call(instance.proxy)
                    : defaultValue;
            }
            else {
                warn(`injection "${String(key)}" not found.`);
            }
        }
        else {
            warn(`inject() can only be used inside setup() or functional components.`);
        }
    }
    // initial value for watchers to trigger on undefined initial values
    const INITIAL_WATCHER_VALUE = {};
    // implementation
    function watch(source, cb, options) {
        if (!isFunction(cb)) {
            warn(`\`watch(fn, options?)\` signature has been moved to a separate API. ` +
                `Use \`watchEffect(fn, options?)\` instead. \`watch\` now only ` +
                `supports \`watch(source, cb, options?) signature.`);
        }
        return doWatch(source, cb, options);
    }
    function doWatch(source, cb, { immediate, deep, flush, onTrack, onTrigger } = EMPTY_OBJ) {
        if (!cb) {
            if (immediate !== undefined) {
                warn(`watch() "immediate" option is only respected when using the ` +
                    `watch(source, callback, options?) signature.`);
            }
            if (deep !== undefined) {
                warn(`watch() "deep" option is only respected when using the ` +
                    `watch(source, callback, options?) signature.`);
            }
        }
        const warnInvalidSource = (s) => {
            warn(`Invalid watch source: `, s, `A watch source can only be a getter/effect function, a ref, ` +
                `a reactive object, or an array of these types.`);
        };
        const instance = currentInstance;
        let getter;
        let forceTrigger = false;
        let isMultiSource = false;
        if (isRef(source)) {
            getter = () => source.value;
            forceTrigger = isShallow$1(source);
        }
        else if (isReactive(source)) {
            getter = () => source;
            deep = true;
        }
        else if (isArray(source)) {
            isMultiSource = true;
            forceTrigger = source.some(s => isReactive(s) || isShallow$1(s));
            getter = () => source.map(s => {
                if (isRef(s)) {
                    return s.value;
                }
                else if (isReactive(s)) {
                    return traverse(s);
                }
                else if (isFunction(s)) {
                    return callWithErrorHandling(s, instance, 2 /* WATCH_GETTER */);
                }
                else {
                    warnInvalidSource(s);
                }
            });
        }
        else if (isFunction(source)) {
            if (cb) {
                // getter with cb
                getter = () => callWithErrorHandling(source, instance, 2 /* WATCH_GETTER */);
            }
            else {
                // no cb -> simple effect
                getter = () => {
                    if (instance && instance.isUnmounted) {
                        return;
                    }
                    if (cleanup) {
                        cleanup();
                    }
                    return callWithAsyncErrorHandling(source, instance, 3 /* WATCH_CALLBACK */, [onCleanup]);
                };
            }
        }
        else {
            getter = NOOP;
            warnInvalidSource(source);
        }
        if (cb && deep) {
            const baseGetter = getter;
            getter = () => traverse(baseGetter());
        }
        let cleanup;
        let onCleanup = (fn) => {
            cleanup = effect.onStop = () => {
                callWithErrorHandling(fn, instance, 4 /* WATCH_CLEANUP */);
            };
        };
        // in SSR there is no need to setup an actual effect, and it should be noop
        // unless it's eager
        if (isInSSRComponentSetup) {
            // we will also not call the invalidate callback (+ runner is not set up)
            onCleanup = NOOP;
            if (!cb) {
                getter();
            }
            else if (immediate) {
                callWithAsyncErrorHandling(cb, instance, 3 /* WATCH_CALLBACK */, [
                    getter(),
                    isMultiSource ? [] : undefined,
                    onCleanup
                ]);
            }
            return NOOP;
        }
        let oldValue = isMultiSource ? [] : INITIAL_WATCHER_VALUE;
        const job = () => {
            if (!effect.active) {
                return;
            }
            if (cb) {
                // watch(source, cb)
                const newValue = effect.run();
                if (deep ||
                    forceTrigger ||
                    (isMultiSource
                        ? newValue.some((v, i) => hasChanged(v, oldValue[i]))
                        : hasChanged(newValue, oldValue)) ||
                    (false  )) {
                    // cleanup before running cb again
                    if (cleanup) {
                        cleanup();
                    }
                    callWithAsyncErrorHandling(cb, instance, 3 /* WATCH_CALLBACK */, [
                        newValue,
                        // pass undefined as the old value when it's changed for the first time
                        oldValue === INITIAL_WATCHER_VALUE ? undefined : oldValue,
                        onCleanup
                    ]);
                    oldValue = newValue;
                }
            }
            else {
                // watchEffect
                effect.run();
            }
        };
        // important: mark the job as a watcher callback so that scheduler knows
        // it is allowed to self-trigger (#1727)
        job.allowRecurse = !!cb;
        let scheduler;
        if (flush === 'sync') {
            scheduler = job; // the scheduler function gets called directly
        }
        else if (flush === 'post') {
            scheduler = () => queuePostRenderEffect(job, instance && instance.suspense);
        }
        else {
            // default: 'pre'
            scheduler = () => queuePreFlushCb(job);
        }
        const effect = new ReactiveEffect(getter, scheduler);
        {
            effect.onTrack = onTrack;
            effect.onTrigger = onTrigger;
        }
        // initial run
        if (cb) {
            if (immediate) {
                job();
            }
            else {
                oldValue = effect.run();
            }
        }
        else if (flush === 'post') {
            queuePostRenderEffect(effect.run.bind(effect), instance && instance.suspense);
        }
        else {
            effect.run();
        }
        return () => {
            effect.stop();
            if (instance && instance.scope) {
                remove(instance.scope.effects, effect);
            }
        };
    }
    // this.$watch
    function instanceWatch(source, value, options) {
        const publicThis = this.proxy;
        const getter = isString(source)
            ? source.includes('.')
                ? createPathGetter(publicThis, source)
                : () => publicThis[source]
            : source.bind(publicThis, publicThis);
        let cb;
        if (isFunction(value)) {
            cb = value;
        }
        else {
            cb = value.handler;
            options = value;
        }
        const cur = currentInstance;
        setCurrentInstance(this);
        const res = doWatch(getter, cb.bind(publicThis), options);
        if (cur) {
            setCurrentInstance(cur);
        }
        else {
            unsetCurrentInstance();
        }
        return res;
    }
    function createPathGetter(ctx, path) {
        const segments = path.split('.');
        return () => {
            let cur = ctx;
            for (let i = 0; i < segments.length && cur; i++) {
                cur = cur[segments[i]];
            }
            return cur;
        };
    }
    function traverse(value, seen) {
        if (!isObject(value) || value["__v_skip" /* SKIP */]) {
            return value;
        }
        seen = seen || new Set();
        if (seen.has(value)) {
            return value;
        }
        seen.add(value);
        if (isRef(value)) {
            traverse(value.value, seen);
        }
        else if (isArray(value)) {
            for (let i = 0; i < value.length; i++) {
                traverse(value[i], seen);
            }
        }
        else if (isSet(value) || isMap(value)) {
            value.forEach((v) => {
                traverse(v, seen);
            });
        }
        else if (isPlainObject(value)) {
            for (const key in value) {
                traverse(value[key], seen);
            }
        }
        return value;
    }

    const isAsyncWrapper = (i) => !!i.type.__asyncLoader;

    const isKeepAlive = (vnode) => vnode.type.__isKeepAlive;
    function onActivated(hook, target) {
        registerKeepAliveHook(hook, "a" /* ACTIVATED */, target);
    }
    function onDeactivated(hook, target) {
        registerKeepAliveHook(hook, "da" /* DEACTIVATED */, target);
    }
    function registerKeepAliveHook(hook, type, target = currentInstance) {
        // cache the deactivate branch check wrapper for injected hooks so the same
        // hook can be properly deduped by the scheduler. "__wdc" stands for "with
        // deactivation check".
        const wrappedHook = hook.__wdc ||
            (hook.__wdc = () => {
                // only fire the hook if the target instance is NOT in a deactivated branch.
                let current = target;
                while (current) {
                    if (current.isDeactivated) {
                        return;
                    }
                    current = current.parent;
                }
                return hook();
            });
        injectHook(type, wrappedHook, target);
        // In addition to registering it on the target instance, we walk up the parent
        // chain and register it on all ancestor instances that are keep-alive roots.
        // This avoids the need to walk the entire component tree when invoking these
        // hooks, and more importantly, avoids the need to track child components in
        // arrays.
        if (target) {
            let current = target.parent;
            while (current && current.parent) {
                if (isKeepAlive(current.parent.vnode)) {
                    injectToKeepAliveRoot(wrappedHook, type, target, current);
                }
                current = current.parent;
            }
        }
    }
    function injectToKeepAliveRoot(hook, type, target, keepAliveRoot) {
        // injectHook wraps the original for error handling, so make sure to remove
        // the wrapped version.
        const injected = injectHook(type, hook, keepAliveRoot, true /* prepend */);
        onUnmounted(() => {
            remove(keepAliveRoot[type], injected);
        }, target);
    }

    function injectHook(type, hook, target = currentInstance, prepend = false) {
        if (target) {
            const hooks = target[type] || (target[type] = []);
            // cache the error handling wrapper for injected hooks so the same hook
            // can be properly deduped by the scheduler. "__weh" stands for "with error
            // handling".
            const wrappedHook = hook.__weh ||
                (hook.__weh = (...args) => {
                    if (target.isUnmounted) {
                        return;
                    }
                    // disable tracking inside all lifecycle hooks
                    // since they can potentially be called inside effects.
                    pauseTracking();
                    // Set currentInstance during hook invocation.
                    // This assumes the hook does not synchronously trigger other hooks, which
                    // can only be false when the user does something really funky.
                    setCurrentInstance(target);
                    const res = callWithAsyncErrorHandling(hook, target, type, args);
                    unsetCurrentInstance();
                    resetTracking();
                    return res;
                });
            if (prepend) {
                hooks.unshift(wrappedHook);
            }
            else {
                hooks.push(wrappedHook);
            }
            return wrappedHook;
        }
        else {
            const apiName = toHandlerKey(ErrorTypeStrings[type].replace(/ hook$/, ''));
            warn(`${apiName} is called when there is no active component instance to be ` +
                `associated with. ` +
                `Lifecycle injection APIs can only be used during execution of setup().` +
                (` If you are using async setup(), make sure to register lifecycle ` +
                        `hooks before the first await statement.`
                    ));
        }
    }
    const createHook = (lifecycle) => (hook, target = currentInstance) => 
    // post-create lifecycle registrations are noops during SSR (except for serverPrefetch)
    (!isInSSRComponentSetup || lifecycle === "sp" /* SERVER_PREFETCH */) &&
        injectHook(lifecycle, hook, target);
    const onBeforeMount = createHook("bm" /* BEFORE_MOUNT */);
    const onMounted = createHook("m" /* MOUNTED */);
    const onBeforeUpdate = createHook("bu" /* BEFORE_UPDATE */);
    const onUpdated = createHook("u" /* UPDATED */);
    const onBeforeUnmount = createHook("bum" /* BEFORE_UNMOUNT */);
    const onUnmounted = createHook("um" /* UNMOUNTED */);
    const onServerPrefetch = createHook("sp" /* SERVER_PREFETCH */);
    const onRenderTriggered = createHook("rtg" /* RENDER_TRIGGERED */);
    const onRenderTracked = createHook("rtc" /* RENDER_TRACKED */);
    function onErrorCaptured(hook, target = currentInstance) {
        injectHook("ec" /* ERROR_CAPTURED */, hook, target);
    }

    /**
    Runtime helper for applying directives to a vnode. Example usage:

    const comp = resolveComponent('comp')
    const foo = resolveDirective('foo')
    const bar = resolveDirective('bar')

    return withDirectives(h(comp), [
      [foo, this.x],
      [bar, this.y]
    ])
    */
    function validateDirectiveName(name) {
        if (isBuiltInDirective(name)) {
            warn('Do not use built-in directive ids as custom directive id: ' + name);
        }
    }
    /**
     * Adds directives to a VNode.
     */
    function withDirectives(vnode, directives) {
        const internalInstance = currentRenderingInstance;
        if (internalInstance === null) {
            warn(`withDirectives can only be used inside render functions.`);
            return vnode;
        }
        const instance = getExposeProxy(internalInstance) ||
            internalInstance.proxy;
        const bindings = vnode.dirs || (vnode.dirs = []);
        for (let i = 0; i < directives.length; i++) {
            let [dir, value, arg, modifiers = EMPTY_OBJ] = directives[i];
            if (isFunction(dir)) {
                dir = {
                    mounted: dir,
                    updated: dir
                };
            }
            if (dir.deep) {
                traverse(value);
            }
            bindings.push({
                dir,
                instance,
                value,
                oldValue: void 0,
                arg,
                modifiers
            });
        }
        return vnode;
    }
    function invokeDirectiveHook(vnode, prevVNode, instance, name) {
        const bindings = vnode.dirs;
        const oldBindings = prevVNode && prevVNode.dirs;
        for (let i = 0; i < bindings.length; i++) {
            const binding = bindings[i];
            if (oldBindings) {
                binding.oldValue = oldBindings[i].value;
            }
            let hook = binding.dir[name];
            if (hook) {
                // disable tracking inside all lifecycle hooks
                // since they can potentially be called inside effects.
                pauseTracking();
                callWithAsyncErrorHandling(hook, instance, 8 /* DIRECTIVE_HOOK */, [
                    vnode.el,
                    binding,
                    vnode,
                    prevVNode
                ]);
                resetTracking();
            }
        }
    }

    const COMPONENTS = 'components';
    /**
     * @private
     */
    function resolveComponent(name, maybeSelfReference) {
        return resolveAsset(COMPONENTS, name, true, maybeSelfReference) || name;
    }
    const NULL_DYNAMIC_COMPONENT = Symbol();
    // implementation
    function resolveAsset(type, name, warnMissing = true, maybeSelfReference = false) {
        const instance = currentRenderingInstance || currentInstance;
        if (instance) {
            const Component = instance.type;
            // explicit self name has highest priority
            if (type === COMPONENTS) {
                const selfName = getComponentName(Component, false /* do not include inferred name to avoid breaking existing code */);
                if (selfName &&
                    (selfName === name ||
                        selfName === camelize(name) ||
                        selfName === capitalize(camelize(name)))) {
                    return Component;
                }
            }
            const res = 
            // local registration
            // check instance[type] first which is resolved for options API
            resolve(instance[type] || Component[type], name) ||
                // global registration
                resolve(instance.appContext[type], name);
            if (!res && maybeSelfReference) {
                // fallback to implicit self-reference
                return Component;
            }
            if (warnMissing && !res) {
                const extra = type === COMPONENTS
                    ? `\nIf this is a native custom element, make sure to exclude it from ` +
                        `component resolution via compilerOptions.isCustomElement.`
                    : ``;
                warn(`Failed to resolve ${type.slice(0, -1)}: ${name}${extra}`);
            }
            return res;
        }
        else {
            warn(`resolve${capitalize(type.slice(0, -1))} ` +
                `can only be used in render() or setup().`);
        }
    }
    function resolve(registry, name) {
        return (registry &&
            (registry[name] ||
                registry[camelize(name)] ||
                registry[capitalize(camelize(name))]));
    }

    /**
     * Actual implementation
     */
    function renderList(source, renderItem, cache, index) {
        let ret;
        const cached = (cache && cache[index]);
        if (isArray(source) || isString(source)) {
            ret = new Array(source.length);
            for (let i = 0, l = source.length; i < l; i++) {
                ret[i] = renderItem(source[i], i, undefined, cached && cached[i]);
            }
        }
        else if (typeof source === 'number') {
            if (!Number.isInteger(source)) {
                warn(`The v-for range expect an integer value but got ${source}.`);
            }
            ret = new Array(source);
            for (let i = 0; i < source; i++) {
                ret[i] = renderItem(i + 1, i, undefined, cached && cached[i]);
            }
        }
        else if (isObject(source)) {
            if (source[Symbol.iterator]) {
                ret = Array.from(source, (item, i) => renderItem(item, i, undefined, cached && cached[i]));
            }
            else {
                const keys = Object.keys(source);
                ret = new Array(keys.length);
                for (let i = 0, l = keys.length; i < l; i++) {
                    const key = keys[i];
                    ret[i] = renderItem(source[key], key, i, cached && cached[i]);
                }
            }
        }
        else {
            ret = [];
        }
        if (cache) {
            cache[index] = ret;
        }
        return ret;
    }

    /**
     * #2437 In Vue 3, functional components do not have a public instance proxy but
     * they exist in the internal parent chain. For code that relies on traversing
     * public $parent chains, skip functional ones and go to the parent instead.
     */
    const getPublicInstance = (i) => {
        if (!i)
            return null;
        if (isStatefulComponent(i))
            return getExposeProxy(i) || i.proxy;
        return getPublicInstance(i.parent);
    };
    const publicPropertiesMap = 
    // Move PURE marker to new line to workaround compiler discarding it
    // due to type annotation
    /*#__PURE__*/ extend(Object.create(null), {
        $: i => i,
        $el: i => i.vnode.el,
        $data: i => i.data,
        $props: i => (shallowReadonly(i.props) ),
        $attrs: i => (shallowReadonly(i.attrs) ),
        $slots: i => (shallowReadonly(i.slots) ),
        $refs: i => (shallowReadonly(i.refs) ),
        $parent: i => getPublicInstance(i.parent),
        $root: i => getPublicInstance(i.root),
        $emit: i => i.emit,
        $options: i => (resolveMergedOptions(i) ),
        $forceUpdate: i => i.f || (i.f = () => queueJob(i.update)),
        $nextTick: i => i.n || (i.n = nextTick.bind(i.proxy)),
        $watch: i => (instanceWatch.bind(i) )
    });
    const isReservedPrefix = (key) => key === '_' || key === '$';
    const PublicInstanceProxyHandlers = {
        get({ _: instance }, key) {
            const { ctx, setupState, data, props, accessCache, type, appContext } = instance;
            // for internal formatters to know that this is a Vue instance
            if (key === '__isVue') {
                return true;
            }
            // prioritize <script setup> bindings during dev.
            // this allows even properties that start with _ or $ to be used - so that
            // it aligns with the production behavior where the render fn is inlined and
            // indeed has access to all declared variables.
            if (setupState !== EMPTY_OBJ &&
                setupState.__isScriptSetup &&
                hasOwn(setupState, key)) {
                return setupState[key];
            }
            // data / props / ctx
            // This getter gets called for every property access on the render context
            // during render and is a major hotspot. The most expensive part of this
            // is the multiple hasOwn() calls. It's much faster to do a simple property
            // access on a plain object, so we use an accessCache object (with null
            // prototype) to memoize what access type a key corresponds to.
            let normalizedProps;
            if (key[0] !== '$') {
                const n = accessCache[key];
                if (n !== undefined) {
                    switch (n) {
                        case 1 /* SETUP */:
                            return setupState[key];
                        case 2 /* DATA */:
                            return data[key];
                        case 4 /* CONTEXT */:
                            return ctx[key];
                        case 3 /* PROPS */:
                            return props[key];
                        // default: just fallthrough
                    }
                }
                else if (setupState !== EMPTY_OBJ && hasOwn(setupState, key)) {
                    accessCache[key] = 1 /* SETUP */;
                    return setupState[key];
                }
                else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
                    accessCache[key] = 2 /* DATA */;
                    return data[key];
                }
                else if (
                // only cache other properties when instance has declared (thus stable)
                // props
                (normalizedProps = instance.propsOptions[0]) &&
                    hasOwn(normalizedProps, key)) {
                    accessCache[key] = 3 /* PROPS */;
                    return props[key];
                }
                else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
                    accessCache[key] = 4 /* CONTEXT */;
                    return ctx[key];
                }
                else if (shouldCacheAccess) {
                    accessCache[key] = 0 /* OTHER */;
                }
            }
            const publicGetter = publicPropertiesMap[key];
            let cssModule, globalProperties;
            // public $xxx properties
            if (publicGetter) {
                if (key === '$attrs') {
                    track(instance, "get" /* GET */, key);
                    markAttrsAccessed();
                }
                return publicGetter(instance);
            }
            else if (
            // css module (injected by vue-loader)
            (cssModule = type.__cssModules) &&
                (cssModule = cssModule[key])) {
                return cssModule;
            }
            else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
                // user may set custom properties to `this` that start with `$`
                accessCache[key] = 4 /* CONTEXT */;
                return ctx[key];
            }
            else if (
            // global properties
            ((globalProperties = appContext.config.globalProperties),
                hasOwn(globalProperties, key))) {
                {
                    return globalProperties[key];
                }
            }
            else if (currentRenderingInstance &&
                (!isString(key) ||
                    // #1091 avoid internal isRef/isVNode checks on component instance leading
                    // to infinite warning loop
                    key.indexOf('__v') !== 0)) {
                if (data !== EMPTY_OBJ && isReservedPrefix(key[0]) && hasOwn(data, key)) {
                    warn(`Property ${JSON.stringify(key)} must be accessed via $data because it starts with a reserved ` +
                        `character ("$" or "_") and is not proxied on the render context.`);
                }
                else if (instance === currentRenderingInstance) {
                    warn(`Property ${JSON.stringify(key)} was accessed during render ` +
                        `but is not defined on instance.`);
                }
            }
        },
        set({ _: instance }, key, value) {
            const { data, setupState, ctx } = instance;
            if (setupState !== EMPTY_OBJ && hasOwn(setupState, key)) {
                setupState[key] = value;
                return true;
            }
            else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
                data[key] = value;
                return true;
            }
            else if (hasOwn(instance.props, key)) {
                warn(`Attempting to mutate prop "${key}". Props are readonly.`, instance);
                return false;
            }
            if (key[0] === '$' && key.slice(1) in instance) {
                warn(`Attempting to mutate public property "${key}". ` +
                        `Properties starting with $ are reserved and readonly.`, instance);
                return false;
            }
            else {
                if (key in instance.appContext.config.globalProperties) {
                    Object.defineProperty(ctx, key, {
                        enumerable: true,
                        configurable: true,
                        value
                    });
                }
                else {
                    ctx[key] = value;
                }
            }
            return true;
        },
        has({ _: { data, setupState, accessCache, ctx, appContext, propsOptions } }, key) {
            let normalizedProps;
            return (!!accessCache[key] ||
                (data !== EMPTY_OBJ && hasOwn(data, key)) ||
                (setupState !== EMPTY_OBJ && hasOwn(setupState, key)) ||
                ((normalizedProps = propsOptions[0]) && hasOwn(normalizedProps, key)) ||
                hasOwn(ctx, key) ||
                hasOwn(publicPropertiesMap, key) ||
                hasOwn(appContext.config.globalProperties, key));
        },
        defineProperty(target, key, descriptor) {
            if (descriptor.get != null) {
                // invalidate key cache of a getter based property #5417
                target._.accessCache[key] = 0;
            }
            else if (hasOwn(descriptor, 'value')) {
                this.set(target, key, descriptor.value, null);
            }
            return Reflect.defineProperty(target, key, descriptor);
        }
    };
    {
        PublicInstanceProxyHandlers.ownKeys = (target) => {
            warn(`Avoid app logic that relies on enumerating keys on a component instance. ` +
                `The keys will be empty in production mode to avoid performance overhead.`);
            return Reflect.ownKeys(target);
        };
    }
    // dev only
    // In dev mode, the proxy target exposes the same properties as seen on `this`
    // for easier console inspection. In prod mode it will be an empty object so
    // these properties definitions can be skipped.
    function createDevRenderContext(instance) {
        const target = {};
        // expose internal instance for proxy handlers
        Object.defineProperty(target, `_`, {
            configurable: true,
            enumerable: false,
            get: () => instance
        });
        // expose public properties
        Object.keys(publicPropertiesMap).forEach(key => {
            Object.defineProperty(target, key, {
                configurable: true,
                enumerable: false,
                get: () => publicPropertiesMap[key](instance),
                // intercepted by the proxy so no need for implementation,
                // but needed to prevent set errors
                set: NOOP
            });
        });
        return target;
    }
    // dev only
    function exposePropsOnRenderContext(instance) {
        const { ctx, propsOptions: [propsOptions] } = instance;
        if (propsOptions) {
            Object.keys(propsOptions).forEach(key => {
                Object.defineProperty(ctx, key, {
                    enumerable: true,
                    configurable: true,
                    get: () => instance.props[key],
                    set: NOOP
                });
            });
        }
    }
    // dev only
    function exposeSetupStateOnRenderContext(instance) {
        const { ctx, setupState } = instance;
        Object.keys(toRaw(setupState)).forEach(key => {
            if (!setupState.__isScriptSetup) {
                if (isReservedPrefix(key[0])) {
                    warn(`setup() return property ${JSON.stringify(key)} should not start with "$" or "_" ` +
                        `which are reserved prefixes for Vue internals.`);
                    return;
                }
                Object.defineProperty(ctx, key, {
                    enumerable: true,
                    configurable: true,
                    get: () => setupState[key],
                    set: NOOP
                });
            }
        });
    }

    function createDuplicateChecker() {
        const cache = Object.create(null);
        return (type, key) => {
            if (cache[key]) {
                warn(`${type} property "${key}" is already defined in ${cache[key]}.`);
            }
            else {
                cache[key] = type;
            }
        };
    }
    let shouldCacheAccess = true;
    function applyOptions(instance) {
        const options = resolveMergedOptions(instance);
        const publicThis = instance.proxy;
        const ctx = instance.ctx;
        // do not cache property access on public proxy during state initialization
        shouldCacheAccess = false;
        // call beforeCreate first before accessing other options since
        // the hook may mutate resolved options (#2791)
        if (options.beforeCreate) {
            callHook(options.beforeCreate, instance, "bc" /* BEFORE_CREATE */);
        }
        const { 
        // state
        data: dataOptions, computed: computedOptions, methods, watch: watchOptions, provide: provideOptions, inject: injectOptions, 
        // lifecycle
        created, beforeMount, mounted, beforeUpdate, updated, activated, deactivated, beforeDestroy, beforeUnmount, destroyed, unmounted, render, renderTracked, renderTriggered, errorCaptured, serverPrefetch, 
        // public API
        expose, inheritAttrs, 
        // assets
        components, directives, filters } = options;
        const checkDuplicateProperties = createDuplicateChecker() ;
        {
            const [propsOptions] = instance.propsOptions;
            if (propsOptions) {
                for (const key in propsOptions) {
                    checkDuplicateProperties("Props" /* PROPS */, key);
                }
            }
        }
        // options initialization order (to be consistent with Vue 2):
        // - props (already done outside of this function)
        // - inject
        // - methods
        // - data (deferred since it relies on `this` access)
        // - computed
        // - watch (deferred since it relies on `this` access)
        if (injectOptions) {
            resolveInjections(injectOptions, ctx, checkDuplicateProperties, instance.appContext.config.unwrapInjectedRef);
        }
        if (methods) {
            for (const key in methods) {
                const methodHandler = methods[key];
                if (isFunction(methodHandler)) {
                    // In dev mode, we use the `createRenderContext` function to define
                    // methods to the proxy target, and those are read-only but
                    // reconfigurable, so it needs to be redefined here
                    {
                        Object.defineProperty(ctx, key, {
                            value: methodHandler.bind(publicThis),
                            configurable: true,
                            enumerable: true,
                            writable: true
                        });
                    }
                    {
                        checkDuplicateProperties("Methods" /* METHODS */, key);
                    }
                }
                else {
                    warn(`Method "${key}" has type "${typeof methodHandler}" in the component definition. ` +
                        `Did you reference the function correctly?`);
                }
            }
        }
        if (dataOptions) {
            if (!isFunction(dataOptions)) {
                warn(`The data option must be a function. ` +
                    `Plain object usage is no longer supported.`);
            }
            const data = dataOptions.call(publicThis, publicThis);
            if (isPromise(data)) {
                warn(`data() returned a Promise - note data() cannot be async; If you ` +
                    `intend to perform data fetching before component renders, use ` +
                    `async setup() + <Suspense>.`);
            }
            if (!isObject(data)) {
                warn(`data() should return an object.`);
            }
            else {
                instance.data = reactive(data);
                {
                    for (const key in data) {
                        checkDuplicateProperties("Data" /* DATA */, key);
                        // expose data on ctx during dev
                        if (!isReservedPrefix(key[0])) {
                            Object.defineProperty(ctx, key, {
                                configurable: true,
                                enumerable: true,
                                get: () => data[key],
                                set: NOOP
                            });
                        }
                    }
                }
            }
        }
        // state initialization complete at this point - start caching access
        shouldCacheAccess = true;
        if (computedOptions) {
            for (const key in computedOptions) {
                const opt = computedOptions[key];
                const get = isFunction(opt)
                    ? opt.bind(publicThis, publicThis)
                    : isFunction(opt.get)
                        ? opt.get.bind(publicThis, publicThis)
                        : NOOP;
                if (get === NOOP) {
                    warn(`Computed property "${key}" has no getter.`);
                }
                const set = !isFunction(opt) && isFunction(opt.set)
                    ? opt.set.bind(publicThis)
                    : () => {
                            warn(`Write operation failed: computed property "${key}" is readonly.`);
                        }
                        ;
                const c = computed({
                    get,
                    set
                });
                Object.defineProperty(ctx, key, {
                    enumerable: true,
                    configurable: true,
                    get: () => c.value,
                    set: v => (c.value = v)
                });
                {
                    checkDuplicateProperties("Computed" /* COMPUTED */, key);
                }
            }
        }
        if (watchOptions) {
            for (const key in watchOptions) {
                createWatcher(watchOptions[key], ctx, publicThis, key);
            }
        }
        if (provideOptions) {
            const provides = isFunction(provideOptions)
                ? provideOptions.call(publicThis)
                : provideOptions;
            Reflect.ownKeys(provides).forEach(key => {
                provide(key, provides[key]);
            });
        }
        if (created) {
            callHook(created, instance, "c" /* CREATED */);
        }
        function registerLifecycleHook(register, hook) {
            if (isArray(hook)) {
                hook.forEach(_hook => register(_hook.bind(publicThis)));
            }
            else if (hook) {
                register(hook.bind(publicThis));
            }
        }
        registerLifecycleHook(onBeforeMount, beforeMount);
        registerLifecycleHook(onMounted, mounted);
        registerLifecycleHook(onBeforeUpdate, beforeUpdate);
        registerLifecycleHook(onUpdated, updated);
        registerLifecycleHook(onActivated, activated);
        registerLifecycleHook(onDeactivated, deactivated);
        registerLifecycleHook(onErrorCaptured, errorCaptured);
        registerLifecycleHook(onRenderTracked, renderTracked);
        registerLifecycleHook(onRenderTriggered, renderTriggered);
        registerLifecycleHook(onBeforeUnmount, beforeUnmount);
        registerLifecycleHook(onUnmounted, unmounted);
        registerLifecycleHook(onServerPrefetch, serverPrefetch);
        if (isArray(expose)) {
            if (expose.length) {
                const exposed = instance.exposed || (instance.exposed = {});
                expose.forEach(key => {
                    Object.defineProperty(exposed, key, {
                        get: () => publicThis[key],
                        set: val => (publicThis[key] = val)
                    });
                });
            }
            else if (!instance.exposed) {
                instance.exposed = {};
            }
        }
        // options that are handled when creating the instance but also need to be
        // applied from mixins
        if (render && instance.render === NOOP) {
            instance.render = render;
        }
        if (inheritAttrs != null) {
            instance.inheritAttrs = inheritAttrs;
        }
        // asset options.
        if (components)
            instance.components = components;
        if (directives)
            instance.directives = directives;
    }
    function resolveInjections(injectOptions, ctx, checkDuplicateProperties = NOOP, unwrapRef = false) {
        if (isArray(injectOptions)) {
            injectOptions = normalizeInject(injectOptions);
        }
        for (const key in injectOptions) {
            const opt = injectOptions[key];
            let injected;
            if (isObject(opt)) {
                if ('default' in opt) {
                    injected = inject(opt.from || key, opt.default, true /* treat default function as factory */);
                }
                else {
                    injected = inject(opt.from || key);
                }
            }
            else {
                injected = inject(opt);
            }
            if (isRef(injected)) {
                // TODO remove the check in 3.3
                if (unwrapRef) {
                    Object.defineProperty(ctx, key, {
                        enumerable: true,
                        configurable: true,
                        get: () => injected.value,
                        set: v => (injected.value = v)
                    });
                }
                else {
                    {
                        warn(`injected property "${key}" is a ref and will be auto-unwrapped ` +
                            `and no longer needs \`.value\` in the next minor release. ` +
                            `To opt-in to the new behavior now, ` +
                            `set \`app.config.unwrapInjectedRef = true\` (this config is ` +
                            `temporary and will not be needed in the future.)`);
                    }
                    ctx[key] = injected;
                }
            }
            else {
                ctx[key] = injected;
            }
            {
                checkDuplicateProperties("Inject" /* INJECT */, key);
            }
        }
    }
    function callHook(hook, instance, type) {
        callWithAsyncErrorHandling(isArray(hook)
            ? hook.map(h => h.bind(instance.proxy))
            : hook.bind(instance.proxy), instance, type);
    }
    function createWatcher(raw, ctx, publicThis, key) {
        const getter = key.includes('.')
            ? createPathGetter(publicThis, key)
            : () => publicThis[key];
        if (isString(raw)) {
            const handler = ctx[raw];
            if (isFunction(handler)) {
                watch(getter, handler);
            }
            else {
                warn(`Invalid watch handler specified by key "${raw}"`, handler);
            }
        }
        else if (isFunction(raw)) {
            watch(getter, raw.bind(publicThis));
        }
        else if (isObject(raw)) {
            if (isArray(raw)) {
                raw.forEach(r => createWatcher(r, ctx, publicThis, key));
            }
            else {
                const handler = isFunction(raw.handler)
                    ? raw.handler.bind(publicThis)
                    : ctx[raw.handler];
                if (isFunction(handler)) {
                    watch(getter, handler, raw);
                }
                else {
                    warn(`Invalid watch handler specified by key "${raw.handler}"`, handler);
                }
            }
        }
        else {
            warn(`Invalid watch option: "${key}"`, raw);
        }
    }
    /**
     * Resolve merged options and cache it on the component.
     * This is done only once per-component since the merging does not involve
     * instances.
     */
    function resolveMergedOptions(instance) {
        const base = instance.type;
        const { mixins, extends: extendsOptions } = base;
        const { mixins: globalMixins, optionsCache: cache, config: { optionMergeStrategies } } = instance.appContext;
        const cached = cache.get(base);
        let resolved;
        if (cached) {
            resolved = cached;
        }
        else if (!globalMixins.length && !mixins && !extendsOptions) {
            {
                resolved = base;
            }
        }
        else {
            resolved = {};
            if (globalMixins.length) {
                globalMixins.forEach(m => mergeOptions(resolved, m, optionMergeStrategies, true));
            }
            mergeOptions(resolved, base, optionMergeStrategies);
        }
        cache.set(base, resolved);
        return resolved;
    }
    function mergeOptions(to, from, strats, asMixin = false) {
        const { mixins, extends: extendsOptions } = from;
        if (extendsOptions) {
            mergeOptions(to, extendsOptions, strats, true);
        }
        if (mixins) {
            mixins.forEach((m) => mergeOptions(to, m, strats, true));
        }
        for (const key in from) {
            if (asMixin && key === 'expose') {
                warn(`"expose" option is ignored when declared in mixins or extends. ` +
                        `It should only be declared in the base component itself.`);
            }
            else {
                const strat = internalOptionMergeStrats[key] || (strats && strats[key]);
                to[key] = strat ? strat(to[key], from[key]) : from[key];
            }
        }
        return to;
    }
    const internalOptionMergeStrats = {
        data: mergeDataFn,
        props: mergeObjectOptions,
        emits: mergeObjectOptions,
        // objects
        methods: mergeObjectOptions,
        computed: mergeObjectOptions,
        // lifecycle
        beforeCreate: mergeAsArray,
        created: mergeAsArray,
        beforeMount: mergeAsArray,
        mounted: mergeAsArray,
        beforeUpdate: mergeAsArray,
        updated: mergeAsArray,
        beforeDestroy: mergeAsArray,
        beforeUnmount: mergeAsArray,
        destroyed: mergeAsArray,
        unmounted: mergeAsArray,
        activated: mergeAsArray,
        deactivated: mergeAsArray,
        errorCaptured: mergeAsArray,
        serverPrefetch: mergeAsArray,
        // assets
        components: mergeObjectOptions,
        directives: mergeObjectOptions,
        // watch
        watch: mergeWatchOptions,
        // provide / inject
        provide: mergeDataFn,
        inject: mergeInject
    };
    function mergeDataFn(to, from) {
        if (!from) {
            return to;
        }
        if (!to) {
            return from;
        }
        return function mergedDataFn() {
            return (extend)(isFunction(to) ? to.call(this, this) : to, isFunction(from) ? from.call(this, this) : from);
        };
    }
    function mergeInject(to, from) {
        return mergeObjectOptions(normalizeInject(to), normalizeInject(from));
    }
    function normalizeInject(raw) {
        if (isArray(raw)) {
            const res = {};
            for (let i = 0; i < raw.length; i++) {
                res[raw[i]] = raw[i];
            }
            return res;
        }
        return raw;
    }
    function mergeAsArray(to, from) {
        return to ? [...new Set([].concat(to, from))] : from;
    }
    function mergeObjectOptions(to, from) {
        return to ? extend(extend(Object.create(null), to), from) : from;
    }
    function mergeWatchOptions(to, from) {
        if (!to)
            return from;
        if (!from)
            return to;
        const merged = extend(Object.create(null), to);
        for (const key in from) {
            merged[key] = mergeAsArray(to[key], from[key]);
        }
        return merged;
    }

    function initProps(instance, rawProps, isStateful, // result of bitwise flag comparison
    isSSR = false) {
        const props = {};
        const attrs = {};
        def(attrs, InternalObjectKey, 1);
        instance.propsDefaults = Object.create(null);
        setFullProps(instance, rawProps, props, attrs);
        // ensure all declared prop keys are present
        for (const key in instance.propsOptions[0]) {
            if (!(key in props)) {
                props[key] = undefined;
            }
        }
        // validation
        {
            validateProps(rawProps || {}, props, instance);
        }
        if (isStateful) {
            // stateful
            instance.props = isSSR ? props : shallowReactive(props);
        }
        else {
            if (!instance.type.props) {
                // functional w/ optional props, props === attrs
                instance.props = attrs;
            }
            else {
                // functional w/ declared props
                instance.props = props;
            }
        }
        instance.attrs = attrs;
    }
    function updateProps(instance, rawProps, rawPrevProps, optimized) {
        const { props, attrs, vnode: { patchFlag } } = instance;
        const rawCurrentProps = toRaw(props);
        const [options] = instance.propsOptions;
        let hasAttrsChanged = false;
        if (
        // always force full diff in dev
        // - #1942 if hmr is enabled with sfc component
        // - vite#872 non-sfc component used by sfc component
        !((instance.type.__hmrId ||
                (instance.parent && instance.parent.type.__hmrId))) &&
            (optimized || patchFlag > 0) &&
            !(patchFlag & 16 /* FULL_PROPS */)) {
            if (patchFlag & 8 /* PROPS */) {
                // Compiler-generated props & no keys change, just set the updated
                // the props.
                const propsToUpdate = instance.vnode.dynamicProps;
                for (let i = 0; i < propsToUpdate.length; i++) {
                    let key = propsToUpdate[i];
                    // skip if the prop key is a declared emit event listener
                    if (isEmitListener(instance.emitsOptions, key)) {
                        continue;
                    }
                    // PROPS flag guarantees rawProps to be non-null
                    const value = rawProps[key];
                    if (options) {
                        // attr / props separation was done on init and will be consistent
                        // in this code path, so just check if attrs have it.
                        if (hasOwn(attrs, key)) {
                            if (value !== attrs[key]) {
                                attrs[key] = value;
                                hasAttrsChanged = true;
                            }
                        }
                        else {
                            const camelizedKey = camelize(key);
                            props[camelizedKey] = resolvePropValue(options, rawCurrentProps, camelizedKey, value, instance, false /* isAbsent */);
                        }
                    }
                    else {
                        if (value !== attrs[key]) {
                            attrs[key] = value;
                            hasAttrsChanged = true;
                        }
                    }
                }
            }
        }
        else {
            // full props update.
            if (setFullProps(instance, rawProps, props, attrs)) {
                hasAttrsChanged = true;
            }
            // in case of dynamic props, check if we need to delete keys from
            // the props object
            let kebabKey;
            for (const key in rawCurrentProps) {
                if (!rawProps ||
                    // for camelCase
                    (!hasOwn(rawProps, key) &&
                        // it's possible the original props was passed in as kebab-case
                        // and converted to camelCase (#955)
                        ((kebabKey = hyphenate(key)) === key || !hasOwn(rawProps, kebabKey)))) {
                    if (options) {
                        if (rawPrevProps &&
                            // for camelCase
                            (rawPrevProps[key] !== undefined ||
                                // for kebab-case
                                rawPrevProps[kebabKey] !== undefined)) {
                            props[key] = resolvePropValue(options, rawCurrentProps, key, undefined, instance, true /* isAbsent */);
                        }
                    }
                    else {
                        delete props[key];
                    }
                }
            }
            // in the case of functional component w/o props declaration, props and
            // attrs point to the same object so it should already have been updated.
            if (attrs !== rawCurrentProps) {
                for (const key in attrs) {
                    if (!rawProps ||
                        (!hasOwn(rawProps, key) &&
                            (!false ))) {
                        delete attrs[key];
                        hasAttrsChanged = true;
                    }
                }
            }
        }
        // trigger updates for $attrs in case it's used in component slots
        if (hasAttrsChanged) {
            trigger(instance, "set" /* SET */, '$attrs');
        }
        {
            validateProps(rawProps || {}, props, instance);
        }
    }
    function setFullProps(instance, rawProps, props, attrs) {
        const [options, needCastKeys] = instance.propsOptions;
        let hasAttrsChanged = false;
        let rawCastValues;
        if (rawProps) {
            for (let key in rawProps) {
                // key, ref are reserved and never passed down
                if (isReservedProp(key)) {
                    continue;
                }
                const value = rawProps[key];
                // prop option names are camelized during normalization, so to support
                // kebab -> camel conversion here we need to camelize the key.
                let camelKey;
                if (options && hasOwn(options, (camelKey = camelize(key)))) {
                    if (!needCastKeys || !needCastKeys.includes(camelKey)) {
                        props[camelKey] = value;
                    }
                    else {
                        (rawCastValues || (rawCastValues = {}))[camelKey] = value;
                    }
                }
                else if (!isEmitListener(instance.emitsOptions, key)) {
                    if (!(key in attrs) || value !== attrs[key]) {
                        attrs[key] = value;
                        hasAttrsChanged = true;
                    }
                }
            }
        }
        if (needCastKeys) {
            const rawCurrentProps = toRaw(props);
            const castValues = rawCastValues || EMPTY_OBJ;
            for (let i = 0; i < needCastKeys.length; i++) {
                const key = needCastKeys[i];
                props[key] = resolvePropValue(options, rawCurrentProps, key, castValues[key], instance, !hasOwn(castValues, key));
            }
        }
        return hasAttrsChanged;
    }
    function resolvePropValue(options, props, key, value, instance, isAbsent) {
        const opt = options[key];
        if (opt != null) {
            const hasDefault = hasOwn(opt, 'default');
            // default values
            if (hasDefault && value === undefined) {
                const defaultValue = opt.default;
                if (opt.type !== Function && isFunction(defaultValue)) {
                    const { propsDefaults } = instance;
                    if (key in propsDefaults) {
                        value = propsDefaults[key];
                    }
                    else {
                        setCurrentInstance(instance);
                        value = propsDefaults[key] = defaultValue.call(null, props);
                        unsetCurrentInstance();
                    }
                }
                else {
                    value = defaultValue;
                }
            }
            // boolean casting
            if (opt[0 /* shouldCast */]) {
                if (isAbsent && !hasDefault) {
                    value = false;
                }
                else if (opt[1 /* shouldCastTrue */] &&
                    (value === '' || value === hyphenate(key))) {
                    value = true;
                }
            }
        }
        return value;
    }
    function normalizePropsOptions(comp, appContext, asMixin = false) {
        const cache = appContext.propsCache;
        const cached = cache.get(comp);
        if (cached) {
            return cached;
        }
        const raw = comp.props;
        const normalized = {};
        const needCastKeys = [];
        // apply mixin/extends props
        let hasExtends = false;
        if (!isFunction(comp)) {
            const extendProps = (raw) => {
                hasExtends = true;
                const [props, keys] = normalizePropsOptions(raw, appContext, true);
                extend(normalized, props);
                if (keys)
                    needCastKeys.push(...keys);
            };
            if (!asMixin && appContext.mixins.length) {
                appContext.mixins.forEach(extendProps);
            }
            if (comp.extends) {
                extendProps(comp.extends);
            }
            if (comp.mixins) {
                comp.mixins.forEach(extendProps);
            }
        }
        if (!raw && !hasExtends) {
            cache.set(comp, EMPTY_ARR);
            return EMPTY_ARR;
        }
        if (isArray(raw)) {
            for (let i = 0; i < raw.length; i++) {
                if (!isString(raw[i])) {
                    warn(`props must be strings when using array syntax.`, raw[i]);
                }
                const normalizedKey = camelize(raw[i]);
                if (validatePropName(normalizedKey)) {
                    normalized[normalizedKey] = EMPTY_OBJ;
                }
            }
        }
        else if (raw) {
            if (!isObject(raw)) {
                warn(`invalid props options`, raw);
            }
            for (const key in raw) {
                const normalizedKey = camelize(key);
                if (validatePropName(normalizedKey)) {
                    const opt = raw[key];
                    const prop = (normalized[normalizedKey] =
                        isArray(opt) || isFunction(opt) ? { type: opt } : opt);
                    if (prop) {
                        const booleanIndex = getTypeIndex(Boolean, prop.type);
                        const stringIndex = getTypeIndex(String, prop.type);
                        prop[0 /* shouldCast */] = booleanIndex > -1;
                        prop[1 /* shouldCastTrue */] =
                            stringIndex < 0 || booleanIndex < stringIndex;
                        // if the prop needs boolean casting or default value
                        if (booleanIndex > -1 || hasOwn(prop, 'default')) {
                            needCastKeys.push(normalizedKey);
                        }
                    }
                }
            }
        }
        const res = [normalized, needCastKeys];
        cache.set(comp, res);
        return res;
    }
    function validatePropName(key) {
        if (key[0] !== '$') {
            return true;
        }
        else {
            warn(`Invalid prop name: "${key}" is a reserved property.`);
        }
        return false;
    }
    // use function string name to check type constructors
    // so that it works across vms / iframes.
    function getType(ctor) {
        const match = ctor && ctor.toString().match(/^\s*function (\w+)/);
        return match ? match[1] : ctor === null ? 'null' : '';
    }
    function isSameType(a, b) {
        return getType(a) === getType(b);
    }
    function getTypeIndex(type, expectedTypes) {
        if (isArray(expectedTypes)) {
            return expectedTypes.findIndex(t => isSameType(t, type));
        }
        else if (isFunction(expectedTypes)) {
            return isSameType(expectedTypes, type) ? 0 : -1;
        }
        return -1;
    }
    /**
     * dev only
     */
    function validateProps(rawProps, props, instance) {
        const resolvedValues = toRaw(props);
        const options = instance.propsOptions[0];
        for (const key in options) {
            let opt = options[key];
            if (opt == null)
                continue;
            validateProp(key, resolvedValues[key], opt, !hasOwn(rawProps, key) && !hasOwn(rawProps, hyphenate(key)));
        }
    }
    /**
     * dev only
     */
    function validateProp(name, value, prop, isAbsent) {
        const { type, required, validator } = prop;
        // required!
        if (required && isAbsent) {
            warn('Missing required prop: "' + name + '"');
            return;
        }
        // missing but optional
        if (value == null && !prop.required) {
            return;
        }
        // type check
        if (type != null && type !== true) {
            let isValid = false;
            const types = isArray(type) ? type : [type];
            const expectedTypes = [];
            // value is valid as long as one of the specified types match
            for (let i = 0; i < types.length && !isValid; i++) {
                const { valid, expectedType } = assertType(value, types[i]);
                expectedTypes.push(expectedType || '');
                isValid = valid;
            }
            if (!isValid) {
                warn(getInvalidTypeMessage(name, value, expectedTypes));
                return;
            }
        }
        // custom validator
        if (validator && !validator(value)) {
            warn('Invalid prop: custom validator check failed for prop "' + name + '".');
        }
    }
    const isSimpleType = /*#__PURE__*/ makeMap('String,Number,Boolean,Function,Symbol,BigInt');
    /**
     * dev only
     */
    function assertType(value, type) {
        let valid;
        const expectedType = getType(type);
        if (isSimpleType(expectedType)) {
            const t = typeof value;
            valid = t === expectedType.toLowerCase();
            // for primitive wrapper objects
            if (!valid && t === 'object') {
                valid = value instanceof type;
            }
        }
        else if (expectedType === 'Object') {
            valid = isObject(value);
        }
        else if (expectedType === 'Array') {
            valid = isArray(value);
        }
        else if (expectedType === 'null') {
            valid = value === null;
        }
        else {
            valid = value instanceof type;
        }
        return {
            valid,
            expectedType
        };
    }
    /**
     * dev only
     */
    function getInvalidTypeMessage(name, value, expectedTypes) {
        let message = `Invalid prop: type check failed for prop "${name}".` +
            ` Expected ${expectedTypes.map(capitalize).join(' | ')}`;
        const expectedType = expectedTypes[0];
        const receivedType = toRawType(value);
        const expectedValue = styleValue(value, expectedType);
        const receivedValue = styleValue(value, receivedType);
        // check if we need to specify expected value
        if (expectedTypes.length === 1 &&
            isExplicable(expectedType) &&
            !isBoolean(expectedType, receivedType)) {
            message += ` with value ${expectedValue}`;
        }
        message += `, got ${receivedType} `;
        // check if we need to specify received value
        if (isExplicable(receivedType)) {
            message += `with value ${receivedValue}.`;
        }
        return message;
    }
    /**
     * dev only
     */
    function styleValue(value, type) {
        if (type === 'String') {
            return `"${value}"`;
        }
        else if (type === 'Number') {
            return `${Number(value)}`;
        }
        else {
            return `${value}`;
        }
    }
    /**
     * dev only
     */
    function isExplicable(type) {
        const explicitTypes = ['string', 'number', 'boolean'];
        return explicitTypes.some(elem => type.toLowerCase() === elem);
    }
    /**
     * dev only
     */
    function isBoolean(...args) {
        return args.some(elem => elem.toLowerCase() === 'boolean');
    }

    const isInternalKey = (key) => key[0] === '_' || key === '$stable';
    const normalizeSlotValue = (value) => isArray(value)
        ? value.map(normalizeVNode)
        : [normalizeVNode(value)];
    const normalizeSlot = (key, rawSlot, ctx) => {
        if (rawSlot._n) {
            // already normalized - #5353
            return rawSlot;
        }
        const normalized = withCtx((...args) => {
            if (currentInstance) {
                warn(`Slot "${key}" invoked outside of the render function: ` +
                    `this will not track dependencies used in the slot. ` +
                    `Invoke the slot function inside the render function instead.`);
            }
            return normalizeSlotValue(rawSlot(...args));
        }, ctx);
        normalized._c = false;
        return normalized;
    };
    const normalizeObjectSlots = (rawSlots, slots, instance) => {
        const ctx = rawSlots._ctx;
        for (const key in rawSlots) {
            if (isInternalKey(key))
                continue;
            const value = rawSlots[key];
            if (isFunction(value)) {
                slots[key] = normalizeSlot(key, value, ctx);
            }
            else if (value != null) {
                {
                    warn(`Non-function value encountered for slot "${key}". ` +
                        `Prefer function slots for better performance.`);
                }
                const normalized = normalizeSlotValue(value);
                slots[key] = () => normalized;
            }
        }
    };
    const normalizeVNodeSlots = (instance, children) => {
        if (!isKeepAlive(instance.vnode) &&
            !(false )) {
            warn(`Non-function value encountered for default slot. ` +
                `Prefer function slots for better performance.`);
        }
        const normalized = normalizeSlotValue(children);
        instance.slots.default = () => normalized;
    };
    const initSlots = (instance, children) => {
        if (instance.vnode.shapeFlag & 32 /* SLOTS_CHILDREN */) {
            const type = children._;
            if (type) {
                // users can get the shallow readonly version of the slots object through `this.$slots`,
                // we should avoid the proxy object polluting the slots of the internal instance
                instance.slots = toRaw(children);
                // make compiler marker non-enumerable
                def(children, '_', type);
            }
            else {
                normalizeObjectSlots(children, (instance.slots = {}));
            }
        }
        else {
            instance.slots = {};
            if (children) {
                normalizeVNodeSlots(instance, children);
            }
        }
        def(instance.slots, InternalObjectKey, 1);
    };
    const updateSlots = (instance, children, optimized) => {
        const { vnode, slots } = instance;
        let needDeletionCheck = true;
        let deletionComparisonTarget = EMPTY_OBJ;
        if (vnode.shapeFlag & 32 /* SLOTS_CHILDREN */) {
            const type = children._;
            if (type) {
                // compiled slots.
                if (isHmrUpdating) {
                    // Parent was HMR updated so slot content may have changed.
                    // force update slots and mark instance for hmr as well
                    extend(slots, children);
                }
                else if (optimized && type === 1 /* STABLE */) {
                    // compiled AND stable.
                    // no need to update, and skip stale slots removal.
                    needDeletionCheck = false;
                }
                else {
                    // compiled but dynamic (v-if/v-for on slots) - update slots, but skip
                    // normalization.
                    extend(slots, children);
                    // #2893
                    // when rendering the optimized slots by manually written render function,
                    // we need to delete the `slots._` flag if necessary to make subsequent updates reliable,
                    // i.e. let the `renderSlot` create the bailed Fragment
                    if (!optimized && type === 1 /* STABLE */) {
                        delete slots._;
                    }
                }
            }
            else {
                needDeletionCheck = !children.$stable;
                normalizeObjectSlots(children, slots);
            }
            deletionComparisonTarget = children;
        }
        else if (children) {
            // non slot object children (direct value) passed to a component
            normalizeVNodeSlots(instance, children);
            deletionComparisonTarget = { default: 1 };
        }
        // delete stale slots
        if (needDeletionCheck) {
            for (const key in slots) {
                if (!isInternalKey(key) && !(key in deletionComparisonTarget)) {
                    delete slots[key];
                }
            }
        }
    };

    function createAppContext() {
        return {
            app: null,
            config: {
                isNativeTag: NO,
                performance: false,
                globalProperties: {},
                optionMergeStrategies: {},
                errorHandler: undefined,
                warnHandler: undefined,
                compilerOptions: {}
            },
            mixins: [],
            components: {},
            directives: {},
            provides: Object.create(null),
            optionsCache: new WeakMap(),
            propsCache: new WeakMap(),
            emitsCache: new WeakMap()
        };
    }
    let uid = 0;
    function createAppAPI(render, hydrate) {
        return function createApp(rootComponent, rootProps = null) {
            if (!isFunction(rootComponent)) {
                rootComponent = Object.assign({}, rootComponent);
            }
            if (rootProps != null && !isObject(rootProps)) {
                warn(`root props passed to app.mount() must be an object.`);
                rootProps = null;
            }
            const context = createAppContext();
            const installedPlugins = new Set();
            let isMounted = false;
            const app = (context.app = {
                _uid: uid++,
                _component: rootComponent,
                _props: rootProps,
                _container: null,
                _context: context,
                _instance: null,
                version,
                get config() {
                    return context.config;
                },
                set config(v) {
                    {
                        warn(`app.config cannot be replaced. Modify individual options instead.`);
                    }
                },
                use(plugin, ...options) {
                    if (installedPlugins.has(plugin)) {
                        warn(`Plugin has already been applied to target app.`);
                    }
                    else if (plugin && isFunction(plugin.install)) {
                        installedPlugins.add(plugin);
                        plugin.install(app, ...options);
                    }
                    else if (isFunction(plugin)) {
                        installedPlugins.add(plugin);
                        plugin(app, ...options);
                    }
                    else {
                        warn(`A plugin must either be a function or an object with an "install" ` +
                            `function.`);
                    }
                    return app;
                },
                mixin(mixin) {
                    {
                        if (!context.mixins.includes(mixin)) {
                            context.mixins.push(mixin);
                        }
                        else {
                            warn('Mixin has already been applied to target app' +
                                (mixin.name ? `: ${mixin.name}` : ''));
                        }
                    }
                    return app;
                },
                component(name, component) {
                    {
                        validateComponentName(name, context.config);
                    }
                    if (!component) {
                        return context.components[name];
                    }
                    if (context.components[name]) {
                        warn(`Component "${name}" has already been registered in target app.`);
                    }
                    context.components[name] = component;
                    return app;
                },
                directive(name, directive) {
                    {
                        validateDirectiveName(name);
                    }
                    if (!directive) {
                        return context.directives[name];
                    }
                    if (context.directives[name]) {
                        warn(`Directive "${name}" has already been registered in target app.`);
                    }
                    context.directives[name] = directive;
                    return app;
                },
                mount(rootContainer, isHydrate, isSVG) {
                    if (!isMounted) {
                        // #5571
                        if (rootContainer.__vue_app__) {
                            warn(`There is already an app instance mounted on the host container.\n` +
                                ` If you want to mount another app on the same host container,` +
                                ` you need to unmount the previous app by calling \`app.unmount()\` first.`);
                        }
                        const vnode = createVNode(rootComponent, rootProps);
                        // store app context on the root VNode.
                        // this will be set on the root instance on initial mount.
                        vnode.appContext = context;
                        // HMR root reload
                        {
                            context.reload = () => {
                                render(cloneVNode(vnode), rootContainer, isSVG);
                            };
                        }
                        if (isHydrate && hydrate) {
                            hydrate(vnode, rootContainer);
                        }
                        else {
                            render(vnode, rootContainer, isSVG);
                        }
                        isMounted = true;
                        app._container = rootContainer;
                        rootContainer.__vue_app__ = app;
                        {
                            app._instance = vnode.component;
                            devtoolsInitApp(app, version);
                        }
                        return getExposeProxy(vnode.component) || vnode.component.proxy;
                    }
                    else {
                        warn(`App has already been mounted.\n` +
                            `If you want to remount the same app, move your app creation logic ` +
                            `into a factory function and create fresh app instances for each ` +
                            `mount - e.g. \`const createMyApp = () => createApp(App)\``);
                    }
                },
                unmount() {
                    if (isMounted) {
                        render(null, app._container);
                        {
                            app._instance = null;
                            devtoolsUnmountApp(app);
                        }
                        delete app._container.__vue_app__;
                    }
                    else {
                        warn(`Cannot unmount an app that is not mounted.`);
                    }
                },
                provide(key, value) {
                    if (key in context.provides) {
                        warn(`App already provides property with key "${String(key)}". ` +
                            `It will be overwritten with the new value.`);
                    }
                    context.provides[key] = value;
                    return app;
                }
            });
            return app;
        };
    }

    /**
     * Function for handling a template ref
     */
    function setRef(rawRef, oldRawRef, parentSuspense, vnode, isUnmount = false) {
        if (isArray(rawRef)) {
            rawRef.forEach((r, i) => setRef(r, oldRawRef && (isArray(oldRawRef) ? oldRawRef[i] : oldRawRef), parentSuspense, vnode, isUnmount));
            return;
        }
        if (isAsyncWrapper(vnode) && !isUnmount) {
            // when mounting async components, nothing needs to be done,
            // because the template ref is forwarded to inner component
            return;
        }
        const refValue = vnode.shapeFlag & 4 /* STATEFUL_COMPONENT */
            ? getExposeProxy(vnode.component) || vnode.component.proxy
            : vnode.el;
        const value = isUnmount ? null : refValue;
        const { i: owner, r: ref } = rawRef;
        if (!owner) {
            warn(`Missing ref owner context. ref cannot be used on hoisted vnodes. ` +
                `A vnode with ref must be created inside the render function.`);
            return;
        }
        const oldRef = oldRawRef && oldRawRef.r;
        const refs = owner.refs === EMPTY_OBJ ? (owner.refs = {}) : owner.refs;
        const setupState = owner.setupState;
        // dynamic ref changed. unset old ref
        if (oldRef != null && oldRef !== ref) {
            if (isString(oldRef)) {
                refs[oldRef] = null;
                if (hasOwn(setupState, oldRef)) {
                    setupState[oldRef] = null;
                }
            }
            else if (isRef(oldRef)) {
                oldRef.value = null;
            }
        }
        if (isFunction(ref)) {
            callWithErrorHandling(ref, owner, 12 /* FUNCTION_REF */, [value, refs]);
        }
        else {
            const _isString = isString(ref);
            const _isRef = isRef(ref);
            if (_isString || _isRef) {
                const doSet = () => {
                    if (rawRef.f) {
                        const existing = _isString ? refs[ref] : ref.value;
                        if (isUnmount) {
                            isArray(existing) && remove(existing, refValue);
                        }
                        else {
                            if (!isArray(existing)) {
                                if (_isString) {
                                    refs[ref] = [refValue];
                                    if (hasOwn(setupState, ref)) {
                                        setupState[ref] = refs[ref];
                                    }
                                }
                                else {
                                    ref.value = [refValue];
                                    if (rawRef.k)
                                        refs[rawRef.k] = ref.value;
                                }
                            }
                            else if (!existing.includes(refValue)) {
                                existing.push(refValue);
                            }
                        }
                    }
                    else if (_isString) {
                        refs[ref] = value;
                        if (hasOwn(setupState, ref)) {
                            setupState[ref] = value;
                        }
                    }
                    else if (_isRef) {
                        ref.value = value;
                        if (rawRef.k)
                            refs[rawRef.k] = value;
                    }
                    else {
                        warn('Invalid template ref type:', ref, `(${typeof ref})`);
                    }
                };
                if (value) {
                    doSet.id = -1;
                    queuePostRenderEffect(doSet, parentSuspense);
                }
                else {
                    doSet();
                }
            }
            else {
                warn('Invalid template ref type:', ref, `(${typeof ref})`);
            }
        }
    }

    /* eslint-disable no-restricted-globals */
    let supported;
    let perf;
    function startMeasure(instance, type) {
        if (instance.appContext.config.performance && isSupported()) {
            perf.mark(`vue-${type}-${instance.uid}`);
        }
        {
            devtoolsPerfStart(instance, type, isSupported() ? perf.now() : Date.now());
        }
    }
    function endMeasure(instance, type) {
        if (instance.appContext.config.performance && isSupported()) {
            const startTag = `vue-${type}-${instance.uid}`;
            const endTag = startTag + `:end`;
            perf.mark(endTag);
            perf.measure(`<${formatComponentName(instance, instance.type)}> ${type}`, startTag, endTag);
            perf.clearMarks(startTag);
            perf.clearMarks(endTag);
        }
        {
            devtoolsPerfEnd(instance, type, isSupported() ? perf.now() : Date.now());
        }
    }
    function isSupported() {
        if (supported !== undefined) {
            return supported;
        }
        if (typeof window !== 'undefined' && window.performance) {
            supported = true;
            perf = window.performance;
        }
        else {
            supported = false;
        }
        return supported;
    }

    /**
     * This is only called in esm-bundler builds.
     * It is called when a renderer is created, in `baseCreateRenderer` so that
     * importing runtime-core is side-effects free.
     *
     * istanbul-ignore-next
     */
    function initFeatureFlags() {
        const needWarn = [];
        if (needWarn.length) {
            const multi = needWarn.length > 1;
            console.warn(`Feature flag${multi ? `s` : ``} ${needWarn.join(', ')} ${multi ? `are` : `is`} not explicitly defined. You are running the esm-bundler build of Vue, ` +
                `which expects these compile-time feature flags to be globally injected ` +
                `via the bundler config in order to get better tree-shaking in the ` +
                `production bundle.\n\n` +
                `For more details, see https://link.vuejs.org/feature-flags.`);
        }
    }

    const queuePostRenderEffect = queueEffectWithSuspense
        ;
    /**
     * The createRenderer function accepts two generic arguments:
     * HostNode and HostElement, corresponding to Node and Element types in the
     * host environment. For example, for runtime-dom, HostNode would be the DOM
     * `Node` interface and HostElement would be the DOM `Element` interface.
     *
     * Custom renderers can pass in the platform specific types like this:
     *
     * ``` js
     * const { render, createApp } = createRenderer<Node, Element>({
     *   patchProp,
     *   ...nodeOps
     * })
     * ```
     */
    function createRenderer(options) {
        return baseCreateRenderer(options);
    }
    // implementation
    function baseCreateRenderer(options, createHydrationFns) {
        // compile-time feature flags check
        {
            initFeatureFlags();
        }
        const target = getGlobalThis();
        target.__VUE__ = true;
        {
            setDevtoolsHook(target.__VUE_DEVTOOLS_GLOBAL_HOOK__, target);
        }
        const { insert: hostInsert, remove: hostRemove, patchProp: hostPatchProp, createElement: hostCreateElement, createText: hostCreateText, createComment: hostCreateComment, setText: hostSetText, setElementText: hostSetElementText, parentNode: hostParentNode, nextSibling: hostNextSibling, setScopeId: hostSetScopeId = NOOP, cloneNode: hostCloneNode, insertStaticContent: hostInsertStaticContent } = options;
        // Note: functions inside this closure should use `const xxx = () => {}`
        // style in order to prevent being inlined by minifiers.
        const patch = (n1, n2, container, anchor = null, parentComponent = null, parentSuspense = null, isSVG = false, slotScopeIds = null, optimized = isHmrUpdating ? false : !!n2.dynamicChildren) => {
            if (n1 === n2) {
                return;
            }
            // patching & not same type, unmount old tree
            if (n1 && !isSameVNodeType(n1, n2)) {
                anchor = getNextHostNode(n1);
                unmount(n1, parentComponent, parentSuspense, true);
                n1 = null;
            }
            if (n2.patchFlag === -2 /* BAIL */) {
                optimized = false;
                n2.dynamicChildren = null;
            }
            const { type, ref, shapeFlag } = n2;
            switch (type) {
                case Text:
                    processText(n1, n2, container, anchor);
                    break;
                case Comment:
                    processCommentNode(n1, n2, container, anchor);
                    break;
                case Static:
                    if (n1 == null) {
                        mountStaticNode(n2, container, anchor, isSVG);
                    }
                    else {
                        patchStaticNode(n1, n2, container, isSVG);
                    }
                    break;
                case Fragment:
                    processFragment(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
                    break;
                default:
                    if (shapeFlag & 1 /* ELEMENT */) {
                        processElement(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
                    }
                    else if (shapeFlag & 6 /* COMPONENT */) {
                        processComponent(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
                    }
                    else if (shapeFlag & 64 /* TELEPORT */) {
                        type.process(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, internals);
                    }
                    else if (shapeFlag & 128 /* SUSPENSE */) {
                        type.process(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, internals);
                    }
                    else {
                        warn('Invalid VNode type:', type, `(${typeof type})`);
                    }
            }
            // set ref
            if (ref != null && parentComponent) {
                setRef(ref, n1 && n1.ref, parentSuspense, n2 || n1, !n2);
            }
        };
        const processText = (n1, n2, container, anchor) => {
            if (n1 == null) {
                hostInsert((n2.el = hostCreateText(n2.children)), container, anchor);
            }
            else {
                const el = (n2.el = n1.el);
                if (n2.children !== n1.children) {
                    hostSetText(el, n2.children);
                }
            }
        };
        const processCommentNode = (n1, n2, container, anchor) => {
            if (n1 == null) {
                hostInsert((n2.el = hostCreateComment(n2.children || '')), container, anchor);
            }
            else {
                // there's no support for dynamic comments
                n2.el = n1.el;
            }
        };
        const mountStaticNode = (n2, container, anchor, isSVG) => {
            [n2.el, n2.anchor] = hostInsertStaticContent(n2.children, container, anchor, isSVG, n2.el, n2.anchor);
        };
        /**
         * Dev / HMR only
         */
        const patchStaticNode = (n1, n2, container, isSVG) => {
            // static nodes are only patched during dev for HMR
            if (n2.children !== n1.children) {
                const anchor = hostNextSibling(n1.anchor);
                // remove existing
                removeStaticNode(n1);
                [n2.el, n2.anchor] = hostInsertStaticContent(n2.children, container, anchor, isSVG);
            }
            else {
                n2.el = n1.el;
                n2.anchor = n1.anchor;
            }
        };
        const moveStaticNode = ({ el, anchor }, container, nextSibling) => {
            let next;
            while (el && el !== anchor) {
                next = hostNextSibling(el);
                hostInsert(el, container, nextSibling);
                el = next;
            }
            hostInsert(anchor, container, nextSibling);
        };
        const removeStaticNode = ({ el, anchor }) => {
            let next;
            while (el && el !== anchor) {
                next = hostNextSibling(el);
                hostRemove(el);
                el = next;
            }
            hostRemove(anchor);
        };
        const processElement = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
            isSVG = isSVG || n2.type === 'svg';
            if (n1 == null) {
                mountElement(n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
            }
            else {
                patchElement(n1, n2, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
            }
        };
        const mountElement = (vnode, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
            let el;
            let vnodeHook;
            const { type, props, shapeFlag, transition, patchFlag, dirs } = vnode;
            {
                el = vnode.el = hostCreateElement(vnode.type, isSVG, props && props.is, props);
                // mount children first, since some props may rely on child content
                // being already rendered, e.g. `<select value>`
                if (shapeFlag & 8 /* TEXT_CHILDREN */) {
                    hostSetElementText(el, vnode.children);
                }
                else if (shapeFlag & 16 /* ARRAY_CHILDREN */) {
                    mountChildren(vnode.children, el, null, parentComponent, parentSuspense, isSVG && type !== 'foreignObject', slotScopeIds, optimized);
                }
                if (dirs) {
                    invokeDirectiveHook(vnode, null, parentComponent, 'created');
                }
                // props
                if (props) {
                    for (const key in props) {
                        if (key !== 'value' && !isReservedProp(key)) {
                            hostPatchProp(el, key, null, props[key], isSVG, vnode.children, parentComponent, parentSuspense, unmountChildren);
                        }
                    }
                    /**
                     * Special case for setting value on DOM elements:
                     * - it can be order-sensitive (e.g. should be set *after* min/max, #2325, #4024)
                     * - it needs to be forced (#1471)
                     * #2353 proposes adding another renderer option to configure this, but
                     * the properties affects are so finite it is worth special casing it
                     * here to reduce the complexity. (Special casing it also should not
                     * affect non-DOM renderers)
                     */
                    if ('value' in props) {
                        hostPatchProp(el, 'value', null, props.value);
                    }
                    if ((vnodeHook = props.onVnodeBeforeMount)) {
                        invokeVNodeHook(vnodeHook, parentComponent, vnode);
                    }
                }
                // scopeId
                setScopeId(el, vnode, vnode.scopeId, slotScopeIds, parentComponent);
            }
            {
                Object.defineProperty(el, '__vnode', {
                    value: vnode,
                    enumerable: false
                });
                Object.defineProperty(el, '__vueParentComponent', {
                    value: parentComponent,
                    enumerable: false
                });
            }
            if (dirs) {
                invokeDirectiveHook(vnode, null, parentComponent, 'beforeMount');
            }
            // #1583 For inside suspense + suspense not resolved case, enter hook should call when suspense resolved
            // #1689 For inside suspense + suspense resolved case, just call it
            const needCallTransitionHooks = (!parentSuspense || (parentSuspense && !parentSuspense.pendingBranch)) &&
                transition &&
                !transition.persisted;
            if (needCallTransitionHooks) {
                transition.beforeEnter(el);
            }
            hostInsert(el, container, anchor);
            if ((vnodeHook = props && props.onVnodeMounted) ||
                needCallTransitionHooks ||
                dirs) {
                queuePostRenderEffect(() => {
                    vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
                    needCallTransitionHooks && transition.enter(el);
                    dirs && invokeDirectiveHook(vnode, null, parentComponent, 'mounted');
                }, parentSuspense);
            }
        };
        const setScopeId = (el, vnode, scopeId, slotScopeIds, parentComponent) => {
            if (scopeId) {
                hostSetScopeId(el, scopeId);
            }
            if (slotScopeIds) {
                for (let i = 0; i < slotScopeIds.length; i++) {
                    hostSetScopeId(el, slotScopeIds[i]);
                }
            }
            if (parentComponent) {
                let subTree = parentComponent.subTree;
                if (subTree.patchFlag > 0 &&
                    subTree.patchFlag & 2048 /* DEV_ROOT_FRAGMENT */) {
                    subTree =
                        filterSingleRoot(subTree.children) || subTree;
                }
                if (vnode === subTree) {
                    const parentVNode = parentComponent.vnode;
                    setScopeId(el, parentVNode, parentVNode.scopeId, parentVNode.slotScopeIds, parentComponent.parent);
                }
            }
        };
        const mountChildren = (children, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, start = 0) => {
            for (let i = start; i < children.length; i++) {
                const child = (children[i] = optimized
                    ? cloneIfMounted(children[i])
                    : normalizeVNode(children[i]));
                patch(null, child, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
            }
        };
        const patchElement = (n1, n2, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
            const el = (n2.el = n1.el);
            let { patchFlag, dynamicChildren, dirs } = n2;
            // #1426 take the old vnode's patch flag into account since user may clone a
            // compiler-generated vnode, which de-opts to FULL_PROPS
            patchFlag |= n1.patchFlag & 16 /* FULL_PROPS */;
            const oldProps = n1.props || EMPTY_OBJ;
            const newProps = n2.props || EMPTY_OBJ;
            let vnodeHook;
            // disable recurse in beforeUpdate hooks
            parentComponent && toggleRecurse(parentComponent, false);
            if ((vnodeHook = newProps.onVnodeBeforeUpdate)) {
                invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
            }
            if (dirs) {
                invokeDirectiveHook(n2, n1, parentComponent, 'beforeUpdate');
            }
            parentComponent && toggleRecurse(parentComponent, true);
            if (isHmrUpdating) {
                // HMR updated, force full diff
                patchFlag = 0;
                optimized = false;
                dynamicChildren = null;
            }
            const areChildrenSVG = isSVG && n2.type !== 'foreignObject';
            if (dynamicChildren) {
                patchBlockChildren(n1.dynamicChildren, dynamicChildren, el, parentComponent, parentSuspense, areChildrenSVG, slotScopeIds);
                if (parentComponent && parentComponent.type.__hmrId) {
                    traverseStaticChildren(n1, n2);
                }
            }
            else if (!optimized) {
                // full diff
                patchChildren(n1, n2, el, null, parentComponent, parentSuspense, areChildrenSVG, slotScopeIds, false);
            }
            if (patchFlag > 0) {
                // the presence of a patchFlag means this element's render code was
                // generated by the compiler and can take the fast path.
                // in this path old node and new node are guaranteed to have the same shape
                // (i.e. at the exact same position in the source template)
                if (patchFlag & 16 /* FULL_PROPS */) {
                    // element props contain dynamic keys, full diff needed
                    patchProps(el, n2, oldProps, newProps, parentComponent, parentSuspense, isSVG);
                }
                else {
                    // class
                    // this flag is matched when the element has dynamic class bindings.
                    if (patchFlag & 2 /* CLASS */) {
                        if (oldProps.class !== newProps.class) {
                            hostPatchProp(el, 'class', null, newProps.class, isSVG);
                        }
                    }
                    // style
                    // this flag is matched when the element has dynamic style bindings
                    if (patchFlag & 4 /* STYLE */) {
                        hostPatchProp(el, 'style', oldProps.style, newProps.style, isSVG);
                    }
                    // props
                    // This flag is matched when the element has dynamic prop/attr bindings
                    // other than class and style. The keys of dynamic prop/attrs are saved for
                    // faster iteration.
                    // Note dynamic keys like :[foo]="bar" will cause this optimization to
                    // bail out and go through a full diff because we need to unset the old key
                    if (patchFlag & 8 /* PROPS */) {
                        // if the flag is present then dynamicProps must be non-null
                        const propsToUpdate = n2.dynamicProps;
                        for (let i = 0; i < propsToUpdate.length; i++) {
                            const key = propsToUpdate[i];
                            const prev = oldProps[key];
                            const next = newProps[key];
                            // #1471 force patch value
                            if (next !== prev || key === 'value') {
                                hostPatchProp(el, key, prev, next, isSVG, n1.children, parentComponent, parentSuspense, unmountChildren);
                            }
                        }
                    }
                }
                // text
                // This flag is matched when the element has only dynamic text children.
                if (patchFlag & 1 /* TEXT */) {
                    if (n1.children !== n2.children) {
                        hostSetElementText(el, n2.children);
                    }
                }
            }
            else if (!optimized && dynamicChildren == null) {
                // unoptimized, full diff
                patchProps(el, n2, oldProps, newProps, parentComponent, parentSuspense, isSVG);
            }
            if ((vnodeHook = newProps.onVnodeUpdated) || dirs) {
                queuePostRenderEffect(() => {
                    vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
                    dirs && invokeDirectiveHook(n2, n1, parentComponent, 'updated');
                }, parentSuspense);
            }
        };
        // The fast path for blocks.
        const patchBlockChildren = (oldChildren, newChildren, fallbackContainer, parentComponent, parentSuspense, isSVG, slotScopeIds) => {
            for (let i = 0; i < newChildren.length; i++) {
                const oldVNode = oldChildren[i];
                const newVNode = newChildren[i];
                // Determine the container (parent element) for the patch.
                const container = 
                // oldVNode may be an errored async setup() component inside Suspense
                // which will not have a mounted element
                oldVNode.el &&
                    // - In the case of a Fragment, we need to provide the actual parent
                    // of the Fragment itself so it can move its children.
                    (oldVNode.type === Fragment ||
                        // - In the case of different nodes, there is going to be a replacement
                        // which also requires the correct parent container
                        !isSameVNodeType(oldVNode, newVNode) ||
                        // - In the case of a component, it could contain anything.
                        oldVNode.shapeFlag & (6 /* COMPONENT */ | 64 /* TELEPORT */))
                    ? hostParentNode(oldVNode.el)
                    : // In other cases, the parent container is not actually used so we
                        // just pass the block element here to avoid a DOM parentNode call.
                        fallbackContainer;
                patch(oldVNode, newVNode, container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, true);
            }
        };
        const patchProps = (el, vnode, oldProps, newProps, parentComponent, parentSuspense, isSVG) => {
            if (oldProps !== newProps) {
                for (const key in newProps) {
                    // empty string is not valid prop
                    if (isReservedProp(key))
                        continue;
                    const next = newProps[key];
                    const prev = oldProps[key];
                    // defer patching value
                    if (next !== prev && key !== 'value') {
                        hostPatchProp(el, key, prev, next, isSVG, vnode.children, parentComponent, parentSuspense, unmountChildren);
                    }
                }
                if (oldProps !== EMPTY_OBJ) {
                    for (const key in oldProps) {
                        if (!isReservedProp(key) && !(key in newProps)) {
                            hostPatchProp(el, key, oldProps[key], null, isSVG, vnode.children, parentComponent, parentSuspense, unmountChildren);
                        }
                    }
                }
                if ('value' in newProps) {
                    hostPatchProp(el, 'value', oldProps.value, newProps.value);
                }
            }
        };
        const processFragment = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
            const fragmentStartAnchor = (n2.el = n1 ? n1.el : hostCreateText(''));
            const fragmentEndAnchor = (n2.anchor = n1 ? n1.anchor : hostCreateText(''));
            let { patchFlag, dynamicChildren, slotScopeIds: fragmentSlotScopeIds } = n2;
            if (// #5523 dev root fragment may inherit directives
                (isHmrUpdating || patchFlag & 2048 /* DEV_ROOT_FRAGMENT */)) {
                // HMR updated / Dev root fragment (w/ comments), force full diff
                patchFlag = 0;
                optimized = false;
                dynamicChildren = null;
            }
            // check if this is a slot fragment with :slotted scope ids
            if (fragmentSlotScopeIds) {
                slotScopeIds = slotScopeIds
                    ? slotScopeIds.concat(fragmentSlotScopeIds)
                    : fragmentSlotScopeIds;
            }
            if (n1 == null) {
                hostInsert(fragmentStartAnchor, container, anchor);
                hostInsert(fragmentEndAnchor, container, anchor);
                // a fragment can only have array children
                // since they are either generated by the compiler, or implicitly created
                // from arrays.
                mountChildren(n2.children, container, fragmentEndAnchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
            }
            else {
                if (patchFlag > 0 &&
                    patchFlag & 64 /* STABLE_FRAGMENT */ &&
                    dynamicChildren &&
                    // #2715 the previous fragment could've been a BAILed one as a result
                    // of renderSlot() with no valid children
                    n1.dynamicChildren) {
                    // a stable fragment (template root or <template v-for>) doesn't need to
                    // patch children order, but it may contain dynamicChildren.
                    patchBlockChildren(n1.dynamicChildren, dynamicChildren, container, parentComponent, parentSuspense, isSVG, slotScopeIds);
                    if (parentComponent && parentComponent.type.__hmrId) {
                        traverseStaticChildren(n1, n2);
                    }
                    else if (
                    // #2080 if the stable fragment has a key, it's a <template v-for> that may
                    //  get moved around. Make sure all root level vnodes inherit el.
                    // #2134 or if it's a component root, it may also get moved around
                    // as the component is being moved.
                    n2.key != null ||
                        (parentComponent && n2 === parentComponent.subTree)) {
                        traverseStaticChildren(n1, n2, true /* shallow */);
                    }
                }
                else {
                    // keyed / unkeyed, or manual fragments.
                    // for keyed & unkeyed, since they are compiler generated from v-for,
                    // each child is guaranteed to be a block so the fragment will never
                    // have dynamicChildren.
                    patchChildren(n1, n2, container, fragmentEndAnchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
                }
            }
        };
        const processComponent = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
            n2.slotScopeIds = slotScopeIds;
            if (n1 == null) {
                if (n2.shapeFlag & 512 /* COMPONENT_KEPT_ALIVE */) {
                    parentComponent.ctx.activate(n2, container, anchor, isSVG, optimized);
                }
                else {
                    mountComponent(n2, container, anchor, parentComponent, parentSuspense, isSVG, optimized);
                }
            }
            else {
                updateComponent(n1, n2, optimized);
            }
        };
        const mountComponent = (initialVNode, container, anchor, parentComponent, parentSuspense, isSVG, optimized) => {
            const instance = (initialVNode.component = createComponentInstance(initialVNode, parentComponent, parentSuspense));
            if (instance.type.__hmrId) {
                registerHMR(instance);
            }
            {
                pushWarningContext(initialVNode);
                startMeasure(instance, `mount`);
            }
            // inject renderer internals for keepAlive
            if (isKeepAlive(initialVNode)) {
                instance.ctx.renderer = internals;
            }
            // resolve props and slots for setup context
            {
                {
                    startMeasure(instance, `init`);
                }
                setupComponent(instance);
                {
                    endMeasure(instance, `init`);
                }
            }
            // setup() is async. This component relies on async logic to be resolved
            // before proceeding
            if (instance.asyncDep) {
                parentSuspense && parentSuspense.registerDep(instance, setupRenderEffect);
                // Give it a placeholder if this is not hydration
                // TODO handle self-defined fallback
                if (!initialVNode.el) {
                    const placeholder = (instance.subTree = createVNode(Comment));
                    processCommentNode(null, placeholder, container, anchor);
                }
                return;
            }
            setupRenderEffect(instance, initialVNode, container, anchor, parentSuspense, isSVG, optimized);
            {
                popWarningContext();
                endMeasure(instance, `mount`);
            }
        };
        const updateComponent = (n1, n2, optimized) => {
            const instance = (n2.component = n1.component);
            if (shouldUpdateComponent(n1, n2, optimized)) {
                if (instance.asyncDep &&
                    !instance.asyncResolved) {
                    // async & still pending - just update props and slots
                    // since the component's reactive effect for render isn't set-up yet
                    {
                        pushWarningContext(n2);
                    }
                    updateComponentPreRender(instance, n2, optimized);
                    {
                        popWarningContext();
                    }
                    return;
                }
                else {
                    // normal update
                    instance.next = n2;
                    // in case the child component is also queued, remove it to avoid
                    // double updating the same child component in the same flush.
                    invalidateJob(instance.update);
                    // instance.update is the reactive effect.
                    instance.update();
                }
            }
            else {
                // no update needed. just copy over properties
                n2.el = n1.el;
                instance.vnode = n2;
            }
        };
        const setupRenderEffect = (instance, initialVNode, container, anchor, parentSuspense, isSVG, optimized) => {
            const componentUpdateFn = () => {
                if (!instance.isMounted) {
                    let vnodeHook;
                    const { el, props } = initialVNode;
                    const { bm, m, parent } = instance;
                    const isAsyncWrapperVNode = isAsyncWrapper(initialVNode);
                    toggleRecurse(instance, false);
                    // beforeMount hook
                    if (bm) {
                        invokeArrayFns(bm);
                    }
                    // onVnodeBeforeMount
                    if (!isAsyncWrapperVNode &&
                        (vnodeHook = props && props.onVnodeBeforeMount)) {
                        invokeVNodeHook(vnodeHook, parent, initialVNode);
                    }
                    toggleRecurse(instance, true);
                    if (el && hydrateNode) {
                        // vnode has adopted host node - perform hydration instead of mount.
                        const hydrateSubTree = () => {
                            {
                                startMeasure(instance, `render`);
                            }
                            instance.subTree = renderComponentRoot(instance);
                            {
                                endMeasure(instance, `render`);
                            }
                            {
                                startMeasure(instance, `hydrate`);
                            }
                            hydrateNode(el, instance.subTree, instance, parentSuspense, null);
                            {
                                endMeasure(instance, `hydrate`);
                            }
                        };
                        if (isAsyncWrapperVNode) {
                            initialVNode.type.__asyncLoader().then(
                            // note: we are moving the render call into an async callback,
                            // which means it won't track dependencies - but it's ok because
                            // a server-rendered async wrapper is already in resolved state
                            // and it will never need to change.
                            () => !instance.isUnmounted && hydrateSubTree());
                        }
                        else {
                            hydrateSubTree();
                        }
                    }
                    else {
                        {
                            startMeasure(instance, `render`);
                        }
                        const subTree = (instance.subTree = renderComponentRoot(instance));
                        {
                            endMeasure(instance, `render`);
                        }
                        {
                            startMeasure(instance, `patch`);
                        }
                        patch(null, subTree, container, anchor, instance, parentSuspense, isSVG);
                        {
                            endMeasure(instance, `patch`);
                        }
                        initialVNode.el = subTree.el;
                    }
                    // mounted hook
                    if (m) {
                        queuePostRenderEffect(m, parentSuspense);
                    }
                    // onVnodeMounted
                    if (!isAsyncWrapperVNode &&
                        (vnodeHook = props && props.onVnodeMounted)) {
                        const scopedInitialVNode = initialVNode;
                        queuePostRenderEffect(() => invokeVNodeHook(vnodeHook, parent, scopedInitialVNode), parentSuspense);
                    }
                    // activated hook for keep-alive roots.
                    // #1742 activated hook must be accessed after first render
                    // since the hook may be injected by a child keep-alive
                    if (initialVNode.shapeFlag & 256 /* COMPONENT_SHOULD_KEEP_ALIVE */ ||
                        (parent &&
                            isAsyncWrapper(parent.vnode) &&
                            parent.vnode.shapeFlag & 256 /* COMPONENT_SHOULD_KEEP_ALIVE */)) {
                        instance.a && queuePostRenderEffect(instance.a, parentSuspense);
                    }
                    instance.isMounted = true;
                    {
                        devtoolsComponentAdded(instance);
                    }
                    // #2458: deference mount-only object parameters to prevent memleaks
                    initialVNode = container = anchor = null;
                }
                else {
                    // updateComponent
                    // This is triggered by mutation of component's own state (next: null)
                    // OR parent calling processComponent (next: VNode)
                    let { next, bu, u, parent, vnode } = instance;
                    let originNext = next;
                    let vnodeHook;
                    {
                        pushWarningContext(next || instance.vnode);
                    }
                    // Disallow component effect recursion during pre-lifecycle hooks.
                    toggleRecurse(instance, false);
                    if (next) {
                        next.el = vnode.el;
                        updateComponentPreRender(instance, next, optimized);
                    }
                    else {
                        next = vnode;
                    }
                    // beforeUpdate hook
                    if (bu) {
                        invokeArrayFns(bu);
                    }
                    // onVnodeBeforeUpdate
                    if ((vnodeHook = next.props && next.props.onVnodeBeforeUpdate)) {
                        invokeVNodeHook(vnodeHook, parent, next, vnode);
                    }
                    toggleRecurse(instance, true);
                    // render
                    {
                        startMeasure(instance, `render`);
                    }
                    const nextTree = renderComponentRoot(instance);
                    {
                        endMeasure(instance, `render`);
                    }
                    const prevTree = instance.subTree;
                    instance.subTree = nextTree;
                    {
                        startMeasure(instance, `patch`);
                    }
                    patch(prevTree, nextTree, 
                    // parent may have changed if it's in a teleport
                    hostParentNode(prevTree.el), 
                    // anchor may have changed if it's in a fragment
                    getNextHostNode(prevTree), instance, parentSuspense, isSVG);
                    {
                        endMeasure(instance, `patch`);
                    }
                    next.el = nextTree.el;
                    if (originNext === null) {
                        // self-triggered update. In case of HOC, update parent component
                        // vnode el. HOC is indicated by parent instance's subTree pointing
                        // to child component's vnode
                        updateHOCHostEl(instance, nextTree.el);
                    }
                    // updated hook
                    if (u) {
                        queuePostRenderEffect(u, parentSuspense);
                    }
                    // onVnodeUpdated
                    if ((vnodeHook = next.props && next.props.onVnodeUpdated)) {
                        queuePostRenderEffect(() => invokeVNodeHook(vnodeHook, parent, next, vnode), parentSuspense);
                    }
                    {
                        devtoolsComponentUpdated(instance);
                    }
                    {
                        popWarningContext();
                    }
                }
            };
            // create reactive effect for rendering
            const effect = (instance.effect = new ReactiveEffect(componentUpdateFn, () => queueJob(update), instance.scope // track it in component's effect scope
            ));
            const update = (instance.update = () => effect.run());
            update.id = instance.uid;
            // allowRecurse
            // #1801, #2043 component render effects should allow recursive updates
            toggleRecurse(instance, true);
            {
                effect.onTrack = instance.rtc
                    ? e => invokeArrayFns(instance.rtc, e)
                    : void 0;
                effect.onTrigger = instance.rtg
                    ? e => invokeArrayFns(instance.rtg, e)
                    : void 0;
                update.ownerInstance = instance;
            }
            update();
        };
        const updateComponentPreRender = (instance, nextVNode, optimized) => {
            nextVNode.component = instance;
            const prevProps = instance.vnode.props;
            instance.vnode = nextVNode;
            instance.next = null;
            updateProps(instance, nextVNode.props, prevProps, optimized);
            updateSlots(instance, nextVNode.children, optimized);
            pauseTracking();
            // props update may have triggered pre-flush watchers.
            // flush them before the render update.
            flushPreFlushCbs(undefined, instance.update);
            resetTracking();
        };
        const patchChildren = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized = false) => {
            const c1 = n1 && n1.children;
            const prevShapeFlag = n1 ? n1.shapeFlag : 0;
            const c2 = n2.children;
            const { patchFlag, shapeFlag } = n2;
            // fast path
            if (patchFlag > 0) {
                if (patchFlag & 128 /* KEYED_FRAGMENT */) {
                    // this could be either fully-keyed or mixed (some keyed some not)
                    // presence of patchFlag means children are guaranteed to be arrays
                    patchKeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
                    return;
                }
                else if (patchFlag & 256 /* UNKEYED_FRAGMENT */) {
                    // unkeyed
                    patchUnkeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
                    return;
                }
            }
            // children has 3 possibilities: text, array or no children.
            if (shapeFlag & 8 /* TEXT_CHILDREN */) {
                // text children fast path
                if (prevShapeFlag & 16 /* ARRAY_CHILDREN */) {
                    unmountChildren(c1, parentComponent, parentSuspense);
                }
                if (c2 !== c1) {
                    hostSetElementText(container, c2);
                }
            }
            else {
                if (prevShapeFlag & 16 /* ARRAY_CHILDREN */) {
                    // prev children was array
                    if (shapeFlag & 16 /* ARRAY_CHILDREN */) {
                        // two arrays, cannot assume anything, do full diff
                        patchKeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
                    }
                    else {
                        // no new children, just unmount old
                        unmountChildren(c1, parentComponent, parentSuspense, true);
                    }
                }
                else {
                    // prev children was text OR null
                    // new children is array OR null
                    if (prevShapeFlag & 8 /* TEXT_CHILDREN */) {
                        hostSetElementText(container, '');
                    }
                    // mount new if array
                    if (shapeFlag & 16 /* ARRAY_CHILDREN */) {
                        mountChildren(c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
                    }
                }
            }
        };
        const patchUnkeyedChildren = (c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
            c1 = c1 || EMPTY_ARR;
            c2 = c2 || EMPTY_ARR;
            const oldLength = c1.length;
            const newLength = c2.length;
            const commonLength = Math.min(oldLength, newLength);
            let i;
            for (i = 0; i < commonLength; i++) {
                const nextChild = (c2[i] = optimized
                    ? cloneIfMounted(c2[i])
                    : normalizeVNode(c2[i]));
                patch(c1[i], nextChild, container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
            }
            if (oldLength > newLength) {
                // remove old
                unmountChildren(c1, parentComponent, parentSuspense, true, false, commonLength);
            }
            else {
                // mount new
                mountChildren(c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, commonLength);
            }
        };
        // can be all-keyed or mixed
        const patchKeyedChildren = (c1, c2, container, parentAnchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
            let i = 0;
            const l2 = c2.length;
            let e1 = c1.length - 1; // prev ending index
            let e2 = l2 - 1; // next ending index
            // 1. sync from start
            // (a b) c
            // (a b) d e
            while (i <= e1 && i <= e2) {
                const n1 = c1[i];
                const n2 = (c2[i] = optimized
                    ? cloneIfMounted(c2[i])
                    : normalizeVNode(c2[i]));
                if (isSameVNodeType(n1, n2)) {
                    patch(n1, n2, container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
                }
                else {
                    break;
                }
                i++;
            }
            // 2. sync from end
            // a (b c)
            // d e (b c)
            while (i <= e1 && i <= e2) {
                const n1 = c1[e1];
                const n2 = (c2[e2] = optimized
                    ? cloneIfMounted(c2[e2])
                    : normalizeVNode(c2[e2]));
                if (isSameVNodeType(n1, n2)) {
                    patch(n1, n2, container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
                }
                else {
                    break;
                }
                e1--;
                e2--;
            }
            // 3. common sequence + mount
            // (a b)
            // (a b) c
            // i = 2, e1 = 1, e2 = 2
            // (a b)
            // c (a b)
            // i = 0, e1 = -1, e2 = 0
            if (i > e1) {
                if (i <= e2) {
                    const nextPos = e2 + 1;
                    const anchor = nextPos < l2 ? c2[nextPos].el : parentAnchor;
                    while (i <= e2) {
                        patch(null, (c2[i] = optimized
                            ? cloneIfMounted(c2[i])
                            : normalizeVNode(c2[i])), container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
                        i++;
                    }
                }
            }
            // 4. common sequence + unmount
            // (a b) c
            // (a b)
            // i = 2, e1 = 2, e2 = 1
            // a (b c)
            // (b c)
            // i = 0, e1 = 0, e2 = -1
            else if (i > e2) {
                while (i <= e1) {
                    unmount(c1[i], parentComponent, parentSuspense, true);
                    i++;
                }
            }
            // 5. unknown sequence
            // [i ... e1 + 1]: a b [c d e] f g
            // [i ... e2 + 1]: a b [e d c h] f g
            // i = 2, e1 = 4, e2 = 5
            else {
                const s1 = i; // prev starting index
                const s2 = i; // next starting index
                // 5.1 build key:index map for newChildren
                const keyToNewIndexMap = new Map();
                for (i = s2; i <= e2; i++) {
                    const nextChild = (c2[i] = optimized
                        ? cloneIfMounted(c2[i])
                        : normalizeVNode(c2[i]));
                    if (nextChild.key != null) {
                        if (keyToNewIndexMap.has(nextChild.key)) {
                            warn(`Duplicate keys found during update:`, JSON.stringify(nextChild.key), `Make sure keys are unique.`);
                        }
                        keyToNewIndexMap.set(nextChild.key, i);
                    }
                }
                // 5.2 loop through old children left to be patched and try to patch
                // matching nodes & remove nodes that are no longer present
                let j;
                let patched = 0;
                const toBePatched = e2 - s2 + 1;
                let moved = false;
                // used to track whether any node has moved
                let maxNewIndexSoFar = 0;
                // works as Map<newIndex, oldIndex>
                // Note that oldIndex is offset by +1
                // and oldIndex = 0 is a special value indicating the new node has
                // no corresponding old node.
                // used for determining longest stable subsequence
                const newIndexToOldIndexMap = new Array(toBePatched);
                for (i = 0; i < toBePatched; i++)
                    newIndexToOldIndexMap[i] = 0;
                for (i = s1; i <= e1; i++) {
                    const prevChild = c1[i];
                    if (patched >= toBePatched) {
                        // all new children have been patched so this can only be a removal
                        unmount(prevChild, parentComponent, parentSuspense, true);
                        continue;
                    }
                    let newIndex;
                    if (prevChild.key != null) {
                        newIndex = keyToNewIndexMap.get(prevChild.key);
                    }
                    else {
                        // key-less node, try to locate a key-less node of the same type
                        for (j = s2; j <= e2; j++) {
                            if (newIndexToOldIndexMap[j - s2] === 0 &&
                                isSameVNodeType(prevChild, c2[j])) {
                                newIndex = j;
                                break;
                            }
                        }
                    }
                    if (newIndex === undefined) {
                        unmount(prevChild, parentComponent, parentSuspense, true);
                    }
                    else {
                        newIndexToOldIndexMap[newIndex - s2] = i + 1;
                        if (newIndex >= maxNewIndexSoFar) {
                            maxNewIndexSoFar = newIndex;
                        }
                        else {
                            moved = true;
                        }
                        patch(prevChild, c2[newIndex], container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
                        patched++;
                    }
                }
                // 5.3 move and mount
                // generate longest stable subsequence only when nodes have moved
                const increasingNewIndexSequence = moved
                    ? getSequence(newIndexToOldIndexMap)
                    : EMPTY_ARR;
                j = increasingNewIndexSequence.length - 1;
                // looping backwards so that we can use last patched node as anchor
                for (i = toBePatched - 1; i >= 0; i--) {
                    const nextIndex = s2 + i;
                    const nextChild = c2[nextIndex];
                    const anchor = nextIndex + 1 < l2 ? c2[nextIndex + 1].el : parentAnchor;
                    if (newIndexToOldIndexMap[i] === 0) {
                        // mount new
                        patch(null, nextChild, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
                    }
                    else if (moved) {
                        // move if:
                        // There is no stable subsequence (e.g. a reverse)
                        // OR current node is not among the stable sequence
                        if (j < 0 || i !== increasingNewIndexSequence[j]) {
                            move(nextChild, container, anchor, 2 /* REORDER */);
                        }
                        else {
                            j--;
                        }
                    }
                }
            }
        };
        const move = (vnode, container, anchor, moveType, parentSuspense = null) => {
            const { el, type, transition, children, shapeFlag } = vnode;
            if (shapeFlag & 6 /* COMPONENT */) {
                move(vnode.component.subTree, container, anchor, moveType);
                return;
            }
            if (shapeFlag & 128 /* SUSPENSE */) {
                vnode.suspense.move(container, anchor, moveType);
                return;
            }
            if (shapeFlag & 64 /* TELEPORT */) {
                type.move(vnode, container, anchor, internals);
                return;
            }
            if (type === Fragment) {
                hostInsert(el, container, anchor);
                for (let i = 0; i < children.length; i++) {
                    move(children[i], container, anchor, moveType);
                }
                hostInsert(vnode.anchor, container, anchor);
                return;
            }
            if (type === Static) {
                moveStaticNode(vnode, container, anchor);
                return;
            }
            // single nodes
            const needTransition = moveType !== 2 /* REORDER */ &&
                shapeFlag & 1 /* ELEMENT */ &&
                transition;
            if (needTransition) {
                if (moveType === 0 /* ENTER */) {
                    transition.beforeEnter(el);
                    hostInsert(el, container, anchor);
                    queuePostRenderEffect(() => transition.enter(el), parentSuspense);
                }
                else {
                    const { leave, delayLeave, afterLeave } = transition;
                    const remove = () => hostInsert(el, container, anchor);
                    const performLeave = () => {
                        leave(el, () => {
                            remove();
                            afterLeave && afterLeave();
                        });
                    };
                    if (delayLeave) {
                        delayLeave(el, remove, performLeave);
                    }
                    else {
                        performLeave();
                    }
                }
            }
            else {
                hostInsert(el, container, anchor);
            }
        };
        const unmount = (vnode, parentComponent, parentSuspense, doRemove = false, optimized = false) => {
            const { type, props, ref, children, dynamicChildren, shapeFlag, patchFlag, dirs } = vnode;
            // unset ref
            if (ref != null) {
                setRef(ref, null, parentSuspense, vnode, true);
            }
            if (shapeFlag & 256 /* COMPONENT_SHOULD_KEEP_ALIVE */) {
                parentComponent.ctx.deactivate(vnode);
                return;
            }
            const shouldInvokeDirs = shapeFlag & 1 /* ELEMENT */ && dirs;
            const shouldInvokeVnodeHook = !isAsyncWrapper(vnode);
            let vnodeHook;
            if (shouldInvokeVnodeHook &&
                (vnodeHook = props && props.onVnodeBeforeUnmount)) {
                invokeVNodeHook(vnodeHook, parentComponent, vnode);
            }
            if (shapeFlag & 6 /* COMPONENT */) {
                unmountComponent(vnode.component, parentSuspense, doRemove);
            }
            else {
                if (shapeFlag & 128 /* SUSPENSE */) {
                    vnode.suspense.unmount(parentSuspense, doRemove);
                    return;
                }
                if (shouldInvokeDirs) {
                    invokeDirectiveHook(vnode, null, parentComponent, 'beforeUnmount');
                }
                if (shapeFlag & 64 /* TELEPORT */) {
                    vnode.type.remove(vnode, parentComponent, parentSuspense, optimized, internals, doRemove);
                }
                else if (dynamicChildren &&
                    // #1153: fast path should not be taken for non-stable (v-for) fragments
                    (type !== Fragment ||
                        (patchFlag > 0 && patchFlag & 64 /* STABLE_FRAGMENT */))) {
                    // fast path for block nodes: only need to unmount dynamic children.
                    unmountChildren(dynamicChildren, parentComponent, parentSuspense, false, true);
                }
                else if ((type === Fragment &&
                    patchFlag &
                        (128 /* KEYED_FRAGMENT */ | 256 /* UNKEYED_FRAGMENT */)) ||
                    (!optimized && shapeFlag & 16 /* ARRAY_CHILDREN */)) {
                    unmountChildren(children, parentComponent, parentSuspense);
                }
                if (doRemove) {
                    remove(vnode);
                }
            }
            if ((shouldInvokeVnodeHook &&
                (vnodeHook = props && props.onVnodeUnmounted)) ||
                shouldInvokeDirs) {
                queuePostRenderEffect(() => {
                    vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
                    shouldInvokeDirs &&
                        invokeDirectiveHook(vnode, null, parentComponent, 'unmounted');
                }, parentSuspense);
            }
        };
        const remove = vnode => {
            const { type, el, anchor, transition } = vnode;
            if (type === Fragment) {
                if (vnode.patchFlag > 0 &&
                    vnode.patchFlag & 2048 /* DEV_ROOT_FRAGMENT */ &&
                    transition &&
                    !transition.persisted) {
                    vnode.children.forEach(child => {
                        if (child.type === Comment) {
                            hostRemove(child.el);
                        }
                        else {
                            remove(child);
                        }
                    });
                }
                else {
                    removeFragment(el, anchor);
                }
                return;
            }
            if (type === Static) {
                removeStaticNode(vnode);
                return;
            }
            const performRemove = () => {
                hostRemove(el);
                if (transition && !transition.persisted && transition.afterLeave) {
                    transition.afterLeave();
                }
            };
            if (vnode.shapeFlag & 1 /* ELEMENT */ &&
                transition &&
                !transition.persisted) {
                const { leave, delayLeave } = transition;
                const performLeave = () => leave(el, performRemove);
                if (delayLeave) {
                    delayLeave(vnode.el, performRemove, performLeave);
                }
                else {
                    performLeave();
                }
            }
            else {
                performRemove();
            }
        };
        const removeFragment = (cur, end) => {
            // For fragments, directly remove all contained DOM nodes.
            // (fragment child nodes cannot have transition)
            let next;
            while (cur !== end) {
                next = hostNextSibling(cur);
                hostRemove(cur);
                cur = next;
            }
            hostRemove(end);
        };
        const unmountComponent = (instance, parentSuspense, doRemove) => {
            if (instance.type.__hmrId) {
                unregisterHMR(instance);
            }
            const { bum, scope, update, subTree, um } = instance;
            // beforeUnmount hook
            if (bum) {
                invokeArrayFns(bum);
            }
            // stop effects in component scope
            scope.stop();
            // update may be null if a component is unmounted before its async
            // setup has resolved.
            if (update) {
                // so that scheduler will no longer invoke it
                update.active = false;
                unmount(subTree, instance, parentSuspense, doRemove);
            }
            // unmounted hook
            if (um) {
                queuePostRenderEffect(um, parentSuspense);
            }
            queuePostRenderEffect(() => {
                instance.isUnmounted = true;
            }, parentSuspense);
            // A component with async dep inside a pending suspense is unmounted before
            // its async dep resolves. This should remove the dep from the suspense, and
            // cause the suspense to resolve immediately if that was the last dep.
            if (parentSuspense &&
                parentSuspense.pendingBranch &&
                !parentSuspense.isUnmounted &&
                instance.asyncDep &&
                !instance.asyncResolved &&
                instance.suspenseId === parentSuspense.pendingId) {
                parentSuspense.deps--;
                if (parentSuspense.deps === 0) {
                    parentSuspense.resolve();
                }
            }
            {
                devtoolsComponentRemoved(instance);
            }
        };
        const unmountChildren = (children, parentComponent, parentSuspense, doRemove = false, optimized = false, start = 0) => {
            for (let i = start; i < children.length; i++) {
                unmount(children[i], parentComponent, parentSuspense, doRemove, optimized);
            }
        };
        const getNextHostNode = vnode => {
            if (vnode.shapeFlag & 6 /* COMPONENT */) {
                return getNextHostNode(vnode.component.subTree);
            }
            if (vnode.shapeFlag & 128 /* SUSPENSE */) {
                return vnode.suspense.next();
            }
            return hostNextSibling((vnode.anchor || vnode.el));
        };
        const render = (vnode, container, isSVG) => {
            if (vnode == null) {
                if (container._vnode) {
                    unmount(container._vnode, null, null, true);
                }
            }
            else {
                patch(container._vnode || null, vnode, container, null, null, null, isSVG);
            }
            flushPostFlushCbs();
            container._vnode = vnode;
        };
        const internals = {
            p: patch,
            um: unmount,
            m: move,
            r: remove,
            mt: mountComponent,
            mc: mountChildren,
            pc: patchChildren,
            pbc: patchBlockChildren,
            n: getNextHostNode,
            o: options
        };
        let hydrate;
        let hydrateNode;
        if (createHydrationFns) {
            [hydrate, hydrateNode] = createHydrationFns(internals);
        }
        return {
            render,
            hydrate,
            createApp: createAppAPI(render, hydrate)
        };
    }
    function toggleRecurse({ effect, update }, allowed) {
        effect.allowRecurse = update.allowRecurse = allowed;
    }
    /**
     * #1156
     * When a component is HMR-enabled, we need to make sure that all static nodes
     * inside a block also inherit the DOM element from the previous tree so that
     * HMR updates (which are full updates) can retrieve the element for patching.
     *
     * #2080
     * Inside keyed `template` fragment static children, if a fragment is moved,
     * the children will always be moved. Therefore, in order to ensure correct move
     * position, el should be inherited from previous nodes.
     */
    function traverseStaticChildren(n1, n2, shallow = false) {
        const ch1 = n1.children;
        const ch2 = n2.children;
        if (isArray(ch1) && isArray(ch2)) {
            for (let i = 0; i < ch1.length; i++) {
                // this is only called in the optimized path so array children are
                // guaranteed to be vnodes
                const c1 = ch1[i];
                let c2 = ch2[i];
                if (c2.shapeFlag & 1 /* ELEMENT */ && !c2.dynamicChildren) {
                    if (c2.patchFlag <= 0 || c2.patchFlag === 32 /* HYDRATE_EVENTS */) {
                        c2 = ch2[i] = cloneIfMounted(ch2[i]);
                        c2.el = c1.el;
                    }
                    if (!shallow)
                        traverseStaticChildren(c1, c2);
                }
                // also inherit for comment nodes, but not placeholders (e.g. v-if which
                // would have received .el during block patch)
                if (c2.type === Comment && !c2.el) {
                    c2.el = c1.el;
                }
            }
        }
    }
    // https://en.wikipedia.org/wiki/Longest_increasing_subsequence
    function getSequence(arr) {
        const p = arr.slice();
        const result = [0];
        let i, j, u, v, c;
        const len = arr.length;
        for (i = 0; i < len; i++) {
            const arrI = arr[i];
            if (arrI !== 0) {
                j = result[result.length - 1];
                if (arr[j] < arrI) {
                    p[i] = j;
                    result.push(i);
                    continue;
                }
                u = 0;
                v = result.length - 1;
                while (u < v) {
                    c = (u + v) >> 1;
                    if (arr[result[c]] < arrI) {
                        u = c + 1;
                    }
                    else {
                        v = c;
                    }
                }
                if (arrI < arr[result[u]]) {
                    if (u > 0) {
                        p[i] = result[u - 1];
                    }
                    result[u] = i;
                }
            }
        }
        u = result.length;
        v = result[u - 1];
        while (u-- > 0) {
            result[u] = v;
            v = p[v];
        }
        return result;
    }

    const isTeleport = (type) => type.__isTeleport;

    const Fragment = Symbol('Fragment' );
    const Text = Symbol('Text' );
    const Comment = Symbol('Comment' );
    const Static = Symbol('Static' );
    // Since v-if and v-for are the two possible ways node structure can dynamically
    // change, once we consider v-if branches and each v-for fragment a block, we
    // can divide a template into nested blocks, and within each block the node
    // structure would be stable. This allows us to skip most children diffing
    // and only worry about the dynamic nodes (indicated by patch flags).
    const blockStack = [];
    let currentBlock = null;
    /**
     * Open a block.
     * This must be called before `createBlock`. It cannot be part of `createBlock`
     * because the children of the block are evaluated before `createBlock` itself
     * is called. The generated code typically looks like this:
     *
     * ```js
     * function render() {
     *   return (openBlock(),createBlock('div', null, [...]))
     * }
     * ```
     * disableTracking is true when creating a v-for fragment block, since a v-for
     * fragment always diffs its children.
     *
     * @private
     */
    function openBlock(disableTracking = false) {
        blockStack.push((currentBlock = disableTracking ? null : []));
    }
    function closeBlock() {
        blockStack.pop();
        currentBlock = blockStack[blockStack.length - 1] || null;
    }
    // Whether we should be tracking dynamic child nodes inside a block.
    // Only tracks when this value is > 0
    // We are not using a simple boolean because this value may need to be
    // incremented/decremented by nested usage of v-once (see below)
    let isBlockTreeEnabled = 1;
    /**
     * Block tracking sometimes needs to be disabled, for example during the
     * creation of a tree that needs to be cached by v-once. The compiler generates
     * code like this:
     *
     * ``` js
     * _cache[1] || (
     *   setBlockTracking(-1),
     *   _cache[1] = createVNode(...),
     *   setBlockTracking(1),
     *   _cache[1]
     * )
     * ```
     *
     * @private
     */
    function setBlockTracking(value) {
        isBlockTreeEnabled += value;
    }
    function setupBlock(vnode) {
        // save current block children on the block vnode
        vnode.dynamicChildren =
            isBlockTreeEnabled > 0 ? currentBlock || EMPTY_ARR : null;
        // close block
        closeBlock();
        // a block is always going to be patched, so track it as a child of its
        // parent block
        if (isBlockTreeEnabled > 0 && currentBlock) {
            currentBlock.push(vnode);
        }
        return vnode;
    }
    /**
     * @private
     */
    function createElementBlock(type, props, children, patchFlag, dynamicProps, shapeFlag) {
        return setupBlock(createBaseVNode(type, props, children, patchFlag, dynamicProps, shapeFlag, true /* isBlock */));
    }
    /**
     * Create a block root vnode. Takes the same exact arguments as `createVNode`.
     * A block root keeps track of dynamic nodes within the block in the
     * `dynamicChildren` array.
     *
     * @private
     */
    function createBlock(type, props, children, patchFlag, dynamicProps) {
        return setupBlock(createVNode(type, props, children, patchFlag, dynamicProps, true /* isBlock: prevent a block from tracking itself */));
    }
    function isVNode(value) {
        return value ? value.__v_isVNode === true : false;
    }
    function isSameVNodeType(n1, n2) {
        if (n2.shapeFlag & 6 /* COMPONENT */ &&
            hmrDirtyComponents.has(n2.type)) {
            // HMR only: if the component has been hot-updated, force a reload.
            return false;
        }
        return n1.type === n2.type && n1.key === n2.key;
    }
    const createVNodeWithArgsTransform = (...args) => {
        return _createVNode(...(args));
    };
    const InternalObjectKey = `__vInternal`;
    const normalizeKey = ({ key }) => key != null ? key : null;
    const normalizeRef = ({ ref, ref_key, ref_for }) => {
        return (ref != null
            ? isString(ref) || isRef(ref) || isFunction(ref)
                ? { i: currentRenderingInstance, r: ref, k: ref_key, f: !!ref_for }
                : ref
            : null);
    };
    function createBaseVNode(type, props = null, children = null, patchFlag = 0, dynamicProps = null, shapeFlag = type === Fragment ? 0 : 1 /* ELEMENT */, isBlockNode = false, needFullChildrenNormalization = false) {
        const vnode = {
            __v_isVNode: true,
            __v_skip: true,
            type,
            props,
            key: props && normalizeKey(props),
            ref: props && normalizeRef(props),
            scopeId: currentScopeId,
            slotScopeIds: null,
            children,
            component: null,
            suspense: null,
            ssContent: null,
            ssFallback: null,
            dirs: null,
            transition: null,
            el: null,
            anchor: null,
            target: null,
            targetAnchor: null,
            staticCount: 0,
            shapeFlag,
            patchFlag,
            dynamicProps,
            dynamicChildren: null,
            appContext: null
        };
        if (needFullChildrenNormalization) {
            normalizeChildren(vnode, children);
            // normalize suspense children
            if (shapeFlag & 128 /* SUSPENSE */) {
                type.normalize(vnode);
            }
        }
        else if (children) {
            // compiled element vnode - if children is passed, only possible types are
            // string or Array.
            vnode.shapeFlag |= isString(children)
                ? 8 /* TEXT_CHILDREN */
                : 16 /* ARRAY_CHILDREN */;
        }
        // validate key
        if (vnode.key !== vnode.key) {
            warn(`VNode created with invalid key (NaN). VNode type:`, vnode.type);
        }
        // track vnode for block tree
        if (isBlockTreeEnabled > 0 &&
            // avoid a block node from tracking itself
            !isBlockNode &&
            // has current parent block
            currentBlock &&
            // presence of a patch flag indicates this node needs patching on updates.
            // component nodes also should always be patched, because even if the
            // component doesn't need to update, it needs to persist the instance on to
            // the next vnode so that it can be properly unmounted later.
            (vnode.patchFlag > 0 || shapeFlag & 6 /* COMPONENT */) &&
            // the EVENTS flag is only for hydration and if it is the only flag, the
            // vnode should not be considered dynamic due to handler caching.
            vnode.patchFlag !== 32 /* HYDRATE_EVENTS */) {
            currentBlock.push(vnode);
        }
        return vnode;
    }
    const createVNode = (createVNodeWithArgsTransform );
    function _createVNode(type, props = null, children = null, patchFlag = 0, dynamicProps = null, isBlockNode = false) {
        if (!type || type === NULL_DYNAMIC_COMPONENT) {
            if (!type) {
                warn(`Invalid vnode type when creating vnode: ${type}.`);
            }
            type = Comment;
        }
        if (isVNode(type)) {
            // createVNode receiving an existing vnode. This happens in cases like
            // <component :is="vnode"/>
            // #2078 make sure to merge refs during the clone instead of overwriting it
            const cloned = cloneVNode(type, props, true /* mergeRef: true */);
            if (children) {
                normalizeChildren(cloned, children);
            }
            if (isBlockTreeEnabled > 0 && !isBlockNode && currentBlock) {
                if (cloned.shapeFlag & 6 /* COMPONENT */) {
                    currentBlock[currentBlock.indexOf(type)] = cloned;
                }
                else {
                    currentBlock.push(cloned);
                }
            }
            cloned.patchFlag |= -2 /* BAIL */;
            return cloned;
        }
        // class component normalization.
        if (isClassComponent(type)) {
            type = type.__vccOpts;
        }
        // class & style normalization.
        if (props) {
            // for reactive or proxy objects, we need to clone it to enable mutation.
            props = guardReactiveProps(props);
            let { class: klass, style } = props;
            if (klass && !isString(klass)) {
                props.class = normalizeClass(klass);
            }
            if (isObject(style)) {
                // reactive state objects need to be cloned since they are likely to be
                // mutated
                if (isProxy(style) && !isArray(style)) {
                    style = extend({}, style);
                }
                props.style = normalizeStyle(style);
            }
        }
        // encode the vnode type information into a bitmap
        const shapeFlag = isString(type)
            ? 1 /* ELEMENT */
            : isSuspense(type)
                ? 128 /* SUSPENSE */
                : isTeleport(type)
                    ? 64 /* TELEPORT */
                    : isObject(type)
                        ? 4 /* STATEFUL_COMPONENT */
                        : isFunction(type)
                            ? 2 /* FUNCTIONAL_COMPONENT */
                            : 0;
        if (shapeFlag & 4 /* STATEFUL_COMPONENT */ && isProxy(type)) {
            type = toRaw(type);
            warn(`Vue received a Component which was made a reactive object. This can ` +
                `lead to unnecessary performance overhead, and should be avoided by ` +
                `marking the component with \`markRaw\` or using \`shallowRef\` ` +
                `instead of \`ref\`.`, `\nComponent that was made reactive: `, type);
        }
        return createBaseVNode(type, props, children, patchFlag, dynamicProps, shapeFlag, isBlockNode, true);
    }
    function guardReactiveProps(props) {
        if (!props)
            return null;
        return isProxy(props) || InternalObjectKey in props
            ? extend({}, props)
            : props;
    }
    function cloneVNode(vnode, extraProps, mergeRef = false) {
        // This is intentionally NOT using spread or extend to avoid the runtime
        // key enumeration cost.
        const { props, ref, patchFlag, children } = vnode;
        const mergedProps = extraProps ? mergeProps(props || {}, extraProps) : props;
        const cloned = {
            __v_isVNode: true,
            __v_skip: true,
            type: vnode.type,
            props: mergedProps,
            key: mergedProps && normalizeKey(mergedProps),
            ref: extraProps && extraProps.ref
                ? // #2078 in the case of <component :is="vnode" ref="extra"/>
                    // if the vnode itself already has a ref, cloneVNode will need to merge
                    // the refs so the single vnode can be set on multiple refs
                    mergeRef && ref
                        ? isArray(ref)
                            ? ref.concat(normalizeRef(extraProps))
                            : [ref, normalizeRef(extraProps)]
                        : normalizeRef(extraProps)
                : ref,
            scopeId: vnode.scopeId,
            slotScopeIds: vnode.slotScopeIds,
            children: patchFlag === -1 /* HOISTED */ && isArray(children)
                ? children.map(deepCloneVNode)
                : children,
            target: vnode.target,
            targetAnchor: vnode.targetAnchor,
            staticCount: vnode.staticCount,
            shapeFlag: vnode.shapeFlag,
            // if the vnode is cloned with extra props, we can no longer assume its
            // existing patch flag to be reliable and need to add the FULL_PROPS flag.
            // note: preserve flag for fragments since they use the flag for children
            // fast paths only.
            patchFlag: extraProps && vnode.type !== Fragment
                ? patchFlag === -1 // hoisted node
                    ? 16 /* FULL_PROPS */
                    : patchFlag | 16 /* FULL_PROPS */
                : patchFlag,
            dynamicProps: vnode.dynamicProps,
            dynamicChildren: vnode.dynamicChildren,
            appContext: vnode.appContext,
            dirs: vnode.dirs,
            transition: vnode.transition,
            // These should technically only be non-null on mounted VNodes. However,
            // they *should* be copied for kept-alive vnodes. So we just always copy
            // them since them being non-null during a mount doesn't affect the logic as
            // they will simply be overwritten.
            component: vnode.component,
            suspense: vnode.suspense,
            ssContent: vnode.ssContent && cloneVNode(vnode.ssContent),
            ssFallback: vnode.ssFallback && cloneVNode(vnode.ssFallback),
            el: vnode.el,
            anchor: vnode.anchor
        };
        return cloned;
    }
    /**
     * Dev only, for HMR of hoisted vnodes reused in v-for
     * https://github.com/vitejs/vite/issues/2022
     */
    function deepCloneVNode(vnode) {
        const cloned = cloneVNode(vnode);
        if (isArray(vnode.children)) {
            cloned.children = vnode.children.map(deepCloneVNode);
        }
        return cloned;
    }
    /**
     * @private
     */
    function createTextVNode(text = ' ', flag = 0) {
        return createVNode(Text, null, text, flag);
    }
    /**
     * @private
     */
    function createCommentVNode(text = '', 
    // when used as the v-else branch, the comment node must be created as a
    // block to ensure correct updates.
    asBlock = false) {
        return asBlock
            ? (openBlock(), createBlock(Comment, null, text))
            : createVNode(Comment, null, text);
    }
    function normalizeVNode(child) {
        if (child == null || typeof child === 'boolean') {
            // empty placeholder
            return createVNode(Comment);
        }
        else if (isArray(child)) {
            // fragment
            return createVNode(Fragment, null, 
            // #3666, avoid reference pollution when reusing vnode
            child.slice());
        }
        else if (typeof child === 'object') {
            // already vnode, this should be the most common since compiled templates
            // always produce all-vnode children arrays
            return cloneIfMounted(child);
        }
        else {
            // strings and numbers
            return createVNode(Text, null, String(child));
        }
    }
    // optimized normalization for template-compiled render fns
    function cloneIfMounted(child) {
        return child.el === null || child.memo ? child : cloneVNode(child);
    }
    function normalizeChildren(vnode, children) {
        let type = 0;
        const { shapeFlag } = vnode;
        if (children == null) {
            children = null;
        }
        else if (isArray(children)) {
            type = 16 /* ARRAY_CHILDREN */;
        }
        else if (typeof children === 'object') {
            if (shapeFlag & (1 /* ELEMENT */ | 64 /* TELEPORT */)) {
                // Normalize slot to plain children for plain element and Teleport
                const slot = children.default;
                if (slot) {
                    // _c marker is added by withCtx() indicating this is a compiled slot
                    slot._c && (slot._d = false);
                    normalizeChildren(vnode, slot());
                    slot._c && (slot._d = true);
                }
                return;
            }
            else {
                type = 32 /* SLOTS_CHILDREN */;
                const slotFlag = children._;
                if (!slotFlag && !(InternalObjectKey in children)) {
                    children._ctx = currentRenderingInstance;
                }
                else if (slotFlag === 3 /* FORWARDED */ && currentRenderingInstance) {
                    // a child component receives forwarded slots from the parent.
                    // its slot type is determined by its parent's slot type.
                    if (currentRenderingInstance.slots._ === 1 /* STABLE */) {
                        children._ = 1 /* STABLE */;
                    }
                    else {
                        children._ = 2 /* DYNAMIC */;
                        vnode.patchFlag |= 1024 /* DYNAMIC_SLOTS */;
                    }
                }
            }
        }
        else if (isFunction(children)) {
            children = { default: children, _ctx: currentRenderingInstance };
            type = 32 /* SLOTS_CHILDREN */;
        }
        else {
            children = String(children);
            // force teleport children to array so it can be moved around
            if (shapeFlag & 64 /* TELEPORT */) {
                type = 16 /* ARRAY_CHILDREN */;
                children = [createTextVNode(children)];
            }
            else {
                type = 8 /* TEXT_CHILDREN */;
            }
        }
        vnode.children = children;
        vnode.shapeFlag |= type;
    }
    function mergeProps(...args) {
        const ret = {};
        for (let i = 0; i < args.length; i++) {
            const toMerge = args[i];
            for (const key in toMerge) {
                if (key === 'class') {
                    if (ret.class !== toMerge.class) {
                        ret.class = normalizeClass([ret.class, toMerge.class]);
                    }
                }
                else if (key === 'style') {
                    ret.style = normalizeStyle([ret.style, toMerge.style]);
                }
                else if (isOn(key)) {
                    const existing = ret[key];
                    const incoming = toMerge[key];
                    if (incoming &&
                        existing !== incoming &&
                        !(isArray(existing) && existing.includes(incoming))) {
                        ret[key] = existing
                            ? [].concat(existing, incoming)
                            : incoming;
                    }
                }
                else if (key !== '') {
                    ret[key] = toMerge[key];
                }
            }
        }
        return ret;
    }
    function invokeVNodeHook(hook, instance, vnode, prevVNode = null) {
        callWithAsyncErrorHandling(hook, instance, 7 /* VNODE_HOOK */, [
            vnode,
            prevVNode
        ]);
    }

    const emptyAppContext = createAppContext();
    let uid$1 = 0;
    function createComponentInstance(vnode, parent, suspense) {
        const type = vnode.type;
        // inherit parent app context - or - if root, adopt from root vnode
        const appContext = (parent ? parent.appContext : vnode.appContext) || emptyAppContext;
        const instance = {
            uid: uid$1++,
            vnode,
            type,
            parent,
            appContext,
            root: null,
            next: null,
            subTree: null,
            effect: null,
            update: null,
            scope: new EffectScope(true /* detached */),
            render: null,
            proxy: null,
            exposed: null,
            exposeProxy: null,
            withProxy: null,
            provides: parent ? parent.provides : Object.create(appContext.provides),
            accessCache: null,
            renderCache: [],
            // local resolved assets
            components: null,
            directives: null,
            // resolved props and emits options
            propsOptions: normalizePropsOptions(type, appContext),
            emitsOptions: normalizeEmitsOptions(type, appContext),
            // emit
            emit: null,
            emitted: null,
            // props default value
            propsDefaults: EMPTY_OBJ,
            // inheritAttrs
            inheritAttrs: type.inheritAttrs,
            // state
            ctx: EMPTY_OBJ,
            data: EMPTY_OBJ,
            props: EMPTY_OBJ,
            attrs: EMPTY_OBJ,
            slots: EMPTY_OBJ,
            refs: EMPTY_OBJ,
            setupState: EMPTY_OBJ,
            setupContext: null,
            // suspense related
            suspense,
            suspenseId: suspense ? suspense.pendingId : 0,
            asyncDep: null,
            asyncResolved: false,
            // lifecycle hooks
            // not using enums here because it results in computed properties
            isMounted: false,
            isUnmounted: false,
            isDeactivated: false,
            bc: null,
            c: null,
            bm: null,
            m: null,
            bu: null,
            u: null,
            um: null,
            bum: null,
            da: null,
            a: null,
            rtg: null,
            rtc: null,
            ec: null,
            sp: null
        };
        {
            instance.ctx = createDevRenderContext(instance);
        }
        instance.root = parent ? parent.root : instance;
        instance.emit = emit$1.bind(null, instance);
        // apply custom element special handling
        if (vnode.ce) {
            vnode.ce(instance);
        }
        return instance;
    }
    let currentInstance = null;
    const setCurrentInstance = (instance) => {
        currentInstance = instance;
        instance.scope.on();
    };
    const unsetCurrentInstance = () => {
        currentInstance && currentInstance.scope.off();
        currentInstance = null;
    };
    const isBuiltInTag = /*#__PURE__*/ makeMap('slot,component');
    function validateComponentName(name, config) {
        const appIsNativeTag = config.isNativeTag || NO;
        if (isBuiltInTag(name) || appIsNativeTag(name)) {
            warn('Do not use built-in or reserved HTML elements as component id: ' + name);
        }
    }
    function isStatefulComponent(instance) {
        return instance.vnode.shapeFlag & 4 /* STATEFUL_COMPONENT */;
    }
    let isInSSRComponentSetup = false;
    function setupComponent(instance, isSSR = false) {
        isInSSRComponentSetup = isSSR;
        const { props, children } = instance.vnode;
        const isStateful = isStatefulComponent(instance);
        initProps(instance, props, isStateful, isSSR);
        initSlots(instance, children);
        const setupResult = isStateful
            ? setupStatefulComponent(instance, isSSR)
            : undefined;
        isInSSRComponentSetup = false;
        return setupResult;
    }
    function setupStatefulComponent(instance, isSSR) {
        var _a;
        const Component = instance.type;
        {
            if (Component.name) {
                validateComponentName(Component.name, instance.appContext.config);
            }
            if (Component.components) {
                const names = Object.keys(Component.components);
                for (let i = 0; i < names.length; i++) {
                    validateComponentName(names[i], instance.appContext.config);
                }
            }
            if (Component.directives) {
                const names = Object.keys(Component.directives);
                for (let i = 0; i < names.length; i++) {
                    validateDirectiveName(names[i]);
                }
            }
            if (Component.compilerOptions && isRuntimeOnly()) {
                warn(`"compilerOptions" is only supported when using a build of Vue that ` +
                    `includes the runtime compiler. Since you are using a runtime-only ` +
                    `build, the options should be passed via your build tool config instead.`);
            }
        }
        // 0. create render proxy property access cache
        instance.accessCache = Object.create(null);
        // 1. create public instance / render proxy
        // also mark it raw so it's never observed
        instance.proxy = markRaw(new Proxy(instance.ctx, PublicInstanceProxyHandlers));
        {
            exposePropsOnRenderContext(instance);
        }
        // 2. call setup()
        const { setup } = Component;
        if (setup) {
            const setupContext = (instance.setupContext =
                setup.length > 1 ? createSetupContext(instance) : null);
            setCurrentInstance(instance);
            pauseTracking();
            const setupResult = callWithErrorHandling(setup, instance, 0 /* SETUP_FUNCTION */, [shallowReadonly(instance.props) , setupContext]);
            resetTracking();
            unsetCurrentInstance();
            if (isPromise(setupResult)) {
                setupResult.then(unsetCurrentInstance, unsetCurrentInstance);
                if (isSSR) {
                    // return the promise so server-renderer can wait on it
                    return setupResult
                        .then((resolvedResult) => {
                        handleSetupResult(instance, resolvedResult, isSSR);
                    })
                        .catch(e => {
                        handleError(e, instance, 0 /* SETUP_FUNCTION */);
                    });
                }
                else {
                    // async setup returned Promise.
                    // bail here and wait for re-entry.
                    instance.asyncDep = setupResult;
                    if (!instance.suspense) {
                        const name = (_a = Component.name) !== null && _a !== void 0 ? _a : 'Anonymous';
                        warn(`Component <${name}>: setup function returned a promise, but no ` +
                            `<Suspense> boundary was found in the parent component tree. ` +
                            `A component with async setup() must be nested in a <Suspense> ` +
                            `in order to be rendered.`);
                    }
                }
            }
            else {
                handleSetupResult(instance, setupResult, isSSR);
            }
        }
        else {
            finishComponentSetup(instance, isSSR);
        }
    }
    function handleSetupResult(instance, setupResult, isSSR) {
        if (isFunction(setupResult)) {
            // setup returned an inline render function
            if (instance.type.__ssrInlineRender) {
                // when the function's name is `ssrRender` (compiled by SFC inline mode),
                // set it as ssrRender instead.
                instance.ssrRender = setupResult;
            }
            else {
                instance.render = setupResult;
            }
        }
        else if (isObject(setupResult)) {
            if (isVNode(setupResult)) {
                warn(`setup() should not return VNodes directly - ` +
                    `return a render function instead.`);
            }
            // setup returned bindings.
            // assuming a render function compiled from template is present.
            {
                instance.devtoolsRawSetupState = setupResult;
            }
            instance.setupState = proxyRefs(setupResult);
            {
                exposeSetupStateOnRenderContext(instance);
            }
        }
        else if (setupResult !== undefined) {
            warn(`setup() should return an object. Received: ${setupResult === null ? 'null' : typeof setupResult}`);
        }
        finishComponentSetup(instance, isSSR);
    }
    let compile;
    // dev only
    const isRuntimeOnly = () => !compile;
    function finishComponentSetup(instance, isSSR, skipOptions) {
        const Component = instance.type;
        // template / render function normalization
        // could be already set when returned from setup()
        if (!instance.render) {
            // only do on-the-fly compile if not in SSR - SSR on-the-fly compilation
            // is done by server-renderer
            if (!isSSR && compile && !Component.render) {
                const template = Component.template;
                if (template) {
                    {
                        startMeasure(instance, `compile`);
                    }
                    const { isCustomElement, compilerOptions } = instance.appContext.config;
                    const { delimiters, compilerOptions: componentCompilerOptions } = Component;
                    const finalCompilerOptions = extend(extend({
                        isCustomElement,
                        delimiters
                    }, compilerOptions), componentCompilerOptions);
                    Component.render = compile(template, finalCompilerOptions);
                    {
                        endMeasure(instance, `compile`);
                    }
                }
            }
            instance.render = (Component.render || NOOP);
        }
        // support for 2.x options
        {
            setCurrentInstance(instance);
            pauseTracking();
            applyOptions(instance);
            resetTracking();
            unsetCurrentInstance();
        }
        // warn missing template/render
        // the runtime compilation of template in SSR is done by server-render
        if (!Component.render && instance.render === NOOP && !isSSR) {
            /* istanbul ignore if */
            if (Component.template) {
                warn(`Component provided template option but ` +
                    `runtime compilation is not supported in this build of Vue.` +
                    (` Configure your bundler to alias "vue" to "vue/dist/vue.esm-bundler.js".`
                        ) /* should not happen */);
            }
            else {
                warn(`Component is missing template or render function.`);
            }
        }
    }
    function createAttrsProxy(instance) {
        return new Proxy(instance.attrs, {
                get(target, key) {
                    markAttrsAccessed();
                    track(instance, "get" /* GET */, '$attrs');
                    return target[key];
                },
                set() {
                    warn(`setupContext.attrs is readonly.`);
                    return false;
                },
                deleteProperty() {
                    warn(`setupContext.attrs is readonly.`);
                    return false;
                }
            }
            );
    }
    function createSetupContext(instance) {
        const expose = exposed => {
            if (instance.exposed) {
                warn(`expose() should be called only once per setup().`);
            }
            instance.exposed = exposed || {};
        };
        let attrs;
        {
            // We use getters in dev in case libs like test-utils overwrite instance
            // properties (overwrites should not be done in prod)
            return Object.freeze({
                get attrs() {
                    return attrs || (attrs = createAttrsProxy(instance));
                },
                get slots() {
                    return shallowReadonly(instance.slots);
                },
                get emit() {
                    return (event, ...args) => instance.emit(event, ...args);
                },
                expose
            });
        }
    }
    function getExposeProxy(instance) {
        if (instance.exposed) {
            return (instance.exposeProxy ||
                (instance.exposeProxy = new Proxy(proxyRefs(markRaw(instance.exposed)), {
                    get(target, key) {
                        if (key in target) {
                            return target[key];
                        }
                        else if (key in publicPropertiesMap) {
                            return publicPropertiesMap[key](instance);
                        }
                    }
                })));
        }
    }
    const classifyRE = /(?:^|[-_])(\w)/g;
    const classify = (str) => str.replace(classifyRE, c => c.toUpperCase()).replace(/[-_]/g, '');
    function getComponentName(Component, includeInferred = true) {
        return isFunction(Component)
            ? Component.displayName || Component.name
            : Component.name || (includeInferred && Component.__name);
    }
    /* istanbul ignore next */
    function formatComponentName(instance, Component, isRoot = false) {
        let name = getComponentName(Component);
        if (!name && Component.__file) {
            const match = Component.__file.match(/([^/\\]+)\.\w+$/);
            if (match) {
                name = match[1];
            }
        }
        if (!name && instance && instance.parent) {
            // try to infer the name based on reverse resolution
            const inferFromRegistry = (registry) => {
                for (const key in registry) {
                    if (registry[key] === Component) {
                        return key;
                    }
                }
            };
            name =
                inferFromRegistry(instance.components ||
                    instance.parent.type.components) || inferFromRegistry(instance.appContext.components);
        }
        return name ? classify(name) : isRoot ? `App` : `Anonymous`;
    }
    function isClassComponent(value) {
        return isFunction(value) && '__vccOpts' in value;
    }

    const computed = ((getterOrOptions, debugOptions) => {
        // @ts-ignore
        return computed$1(getterOrOptions, debugOptions, isInSSRComponentSetup);
    });

    function isShallow(value) {
        return !!(value && value["__v_isShallow" /* IS_SHALLOW */]);
    }

    function initCustomFormatter() {
        /* eslint-disable no-restricted-globals */
        if (typeof window === 'undefined') {
            return;
        }
        const vueStyle = { style: 'color:#3ba776' };
        const numberStyle = { style: 'color:#0b1bc9' };
        const stringStyle = { style: 'color:#b62e24' };
        const keywordStyle = { style: 'color:#9d288c' };
        // custom formatter for Chrome
        // https://www.mattzeunert.com/2016/02/19/custom-chrome-devtools-object-formatters.html
        const formatter = {
            header(obj) {
                // TODO also format ComponentPublicInstance & ctx.slots/attrs in setup
                if (!isObject(obj)) {
                    return null;
                }
                if (obj.__isVue) {
                    return ['div', vueStyle, `VueInstance`];
                }
                else if (isRef(obj)) {
                    return [
                        'div',
                        {},
                        ['span', vueStyle, genRefFlag(obj)],
                        '<',
                        formatValue(obj.value),
                        `>`
                    ];
                }
                else if (isReactive(obj)) {
                    return [
                        'div',
                        {},
                        ['span', vueStyle, isShallow(obj) ? 'ShallowReactive' : 'Reactive'],
                        '<',
                        formatValue(obj),
                        `>${isReadonly(obj) ? ` (readonly)` : ``}`
                    ];
                }
                else if (isReadonly(obj)) {
                    return [
                        'div',
                        {},
                        ['span', vueStyle, isShallow(obj) ? 'ShallowReadonly' : 'Readonly'],
                        '<',
                        formatValue(obj),
                        '>'
                    ];
                }
                return null;
            },
            hasBody(obj) {
                return obj && obj.__isVue;
            },
            body(obj) {
                if (obj && obj.__isVue) {
                    return [
                        'div',
                        {},
                        ...formatInstance(obj.$)
                    ];
                }
            }
        };
        function formatInstance(instance) {
            const blocks = [];
            if (instance.type.props && instance.props) {
                blocks.push(createInstanceBlock('props', toRaw(instance.props)));
            }
            if (instance.setupState !== EMPTY_OBJ) {
                blocks.push(createInstanceBlock('setup', instance.setupState));
            }
            if (instance.data !== EMPTY_OBJ) {
                blocks.push(createInstanceBlock('data', toRaw(instance.data)));
            }
            const computed = extractKeys(instance, 'computed');
            if (computed) {
                blocks.push(createInstanceBlock('computed', computed));
            }
            const injected = extractKeys(instance, 'inject');
            if (injected) {
                blocks.push(createInstanceBlock('injected', injected));
            }
            blocks.push([
                'div',
                {},
                [
                    'span',
                    {
                        style: keywordStyle.style + ';opacity:0.66'
                    },
                    '$ (internal): '
                ],
                ['object', { object: instance }]
            ]);
            return blocks;
        }
        function createInstanceBlock(type, target) {
            target = extend({}, target);
            if (!Object.keys(target).length) {
                return ['span', {}];
            }
            return [
                'div',
                { style: 'line-height:1.25em;margin-bottom:0.6em' },
                [
                    'div',
                    {
                        style: 'color:#476582'
                    },
                    type
                ],
                [
                    'div',
                    {
                        style: 'padding-left:1.25em'
                    },
                    ...Object.keys(target).map(key => {
                        return [
                            'div',
                            {},
                            ['span', keywordStyle, key + ': '],
                            formatValue(target[key], false)
                        ];
                    })
                ]
            ];
        }
        function formatValue(v, asRaw = true) {
            if (typeof v === 'number') {
                return ['span', numberStyle, v];
            }
            else if (typeof v === 'string') {
                return ['span', stringStyle, JSON.stringify(v)];
            }
            else if (typeof v === 'boolean') {
                return ['span', keywordStyle, v];
            }
            else if (isObject(v)) {
                return ['object', { object: asRaw ? toRaw(v) : v }];
            }
            else {
                return ['span', stringStyle, String(v)];
            }
        }
        function extractKeys(instance, type) {
            const Comp = instance.type;
            if (isFunction(Comp)) {
                return;
            }
            const extracted = {};
            for (const key in instance.ctx) {
                if (isKeyOfType(Comp, key, type)) {
                    extracted[key] = instance.ctx[key];
                }
            }
            return extracted;
        }
        function isKeyOfType(Comp, key, type) {
            const opts = Comp[type];
            if ((isArray(opts) && opts.includes(key)) ||
                (isObject(opts) && key in opts)) {
                return true;
            }
            if (Comp.extends && isKeyOfType(Comp.extends, key, type)) {
                return true;
            }
            if (Comp.mixins && Comp.mixins.some(m => isKeyOfType(m, key, type))) {
                return true;
            }
        }
        function genRefFlag(v) {
            if (isShallow(v)) {
                return `ShallowRef`;
            }
            if (v.effect) {
                return `ComputedRef`;
            }
            return `Ref`;
        }
        if (window.devtoolsFormatters) {
            window.devtoolsFormatters.push(formatter);
        }
        else {
            window.devtoolsFormatters = [formatter];
        }
    }

    // Core API ------------------------------------------------------------------
    const version = "3.2.37";

    const svgNS = 'http://www.w3.org/2000/svg';
    const doc = (typeof document !== 'undefined' ? document : null);
    const templateContainer = doc && /*#__PURE__*/ doc.createElement('template');
    const nodeOps = {
        insert: (child, parent, anchor) => {
            parent.insertBefore(child, anchor || null);
        },
        remove: child => {
            const parent = child.parentNode;
            if (parent) {
                parent.removeChild(child);
            }
        },
        createElement: (tag, isSVG, is, props) => {
            const el = isSVG
                ? doc.createElementNS(svgNS, tag)
                : doc.createElement(tag, is ? { is } : undefined);
            if (tag === 'select' && props && props.multiple != null) {
                el.setAttribute('multiple', props.multiple);
            }
            return el;
        },
        createText: text => doc.createTextNode(text),
        createComment: text => doc.createComment(text),
        setText: (node, text) => {
            node.nodeValue = text;
        },
        setElementText: (el, text) => {
            el.textContent = text;
        },
        parentNode: node => node.parentNode,
        nextSibling: node => node.nextSibling,
        querySelector: selector => doc.querySelector(selector),
        setScopeId(el, id) {
            el.setAttribute(id, '');
        },
        cloneNode(el) {
            const cloned = el.cloneNode(true);
            // #3072
            // - in `patchDOMProp`, we store the actual value in the `el._value` property.
            // - normally, elements using `:value` bindings will not be hoisted, but if
            //   the bound value is a constant, e.g. `:value="true"` - they do get
            //   hoisted.
            // - in production, hoisted nodes are cloned when subsequent inserts, but
            //   cloneNode() does not copy the custom property we attached.
            // - This may need to account for other custom DOM properties we attach to
            //   elements in addition to `_value` in the future.
            if (`_value` in el) {
                cloned._value = el._value;
            }
            return cloned;
        },
        // __UNSAFE__
        // Reason: innerHTML.
        // Static content here can only come from compiled templates.
        // As long as the user only uses trusted templates, this is safe.
        insertStaticContent(content, parent, anchor, isSVG, start, end) {
            // <parent> before | first ... last | anchor </parent>
            const before = anchor ? anchor.previousSibling : parent.lastChild;
            // #5308 can only take cached path if:
            // - has a single root node
            // - nextSibling info is still available
            if (start && (start === end || start.nextSibling)) {
                // cached
                while (true) {
                    parent.insertBefore(start.cloneNode(true), anchor);
                    if (start === end || !(start = start.nextSibling))
                        break;
                }
            }
            else {
                // fresh insert
                templateContainer.innerHTML = isSVG ? `<svg>${content}</svg>` : content;
                const template = templateContainer.content;
                if (isSVG) {
                    // remove outer svg wrapper
                    const wrapper = template.firstChild;
                    while (wrapper.firstChild) {
                        template.appendChild(wrapper.firstChild);
                    }
                    template.removeChild(wrapper);
                }
                parent.insertBefore(template, anchor);
            }
            return [
                // first
                before ? before.nextSibling : parent.firstChild,
                // last
                anchor ? anchor.previousSibling : parent.lastChild
            ];
        }
    };

    // compiler should normalize class + :class bindings on the same element
    // into a single binding ['staticClass', dynamic]
    function patchClass(el, value, isSVG) {
        // directly setting className should be faster than setAttribute in theory
        // if this is an element during a transition, take the temporary transition
        // classes into account.
        const transitionClasses = el._vtc;
        if (transitionClasses) {
            value = (value ? [value, ...transitionClasses] : [...transitionClasses]).join(' ');
        }
        if (value == null) {
            el.removeAttribute('class');
        }
        else if (isSVG) {
            el.setAttribute('class', value);
        }
        else {
            el.className = value;
        }
    }

    function patchStyle(el, prev, next) {
        const style = el.style;
        const isCssString = isString(next);
        if (next && !isCssString) {
            for (const key in next) {
                setStyle(style, key, next[key]);
            }
            if (prev && !isString(prev)) {
                for (const key in prev) {
                    if (next[key] == null) {
                        setStyle(style, key, '');
                    }
                }
            }
        }
        else {
            const currentDisplay = style.display;
            if (isCssString) {
                if (prev !== next) {
                    style.cssText = next;
                }
            }
            else if (prev) {
                el.removeAttribute('style');
            }
            // indicates that the `display` of the element is controlled by `v-show`,
            // so we always keep the current `display` value regardless of the `style`
            // value, thus handing over control to `v-show`.
            if ('_vod' in el) {
                style.display = currentDisplay;
            }
        }
    }
    const importantRE = /\s*!important$/;
    function setStyle(style, name, val) {
        if (isArray(val)) {
            val.forEach(v => setStyle(style, name, v));
        }
        else {
            if (val == null)
                val = '';
            if (name.startsWith('--')) {
                // custom property definition
                style.setProperty(name, val);
            }
            else {
                const prefixed = autoPrefix(style, name);
                if (importantRE.test(val)) {
                    // !important
                    style.setProperty(hyphenate(prefixed), val.replace(importantRE, ''), 'important');
                }
                else {
                    style[prefixed] = val;
                }
            }
        }
    }
    const prefixes = ['Webkit', 'Moz', 'ms'];
    const prefixCache = {};
    function autoPrefix(style, rawName) {
        const cached = prefixCache[rawName];
        if (cached) {
            return cached;
        }
        let name = camelize(rawName);
        if (name !== 'filter' && name in style) {
            return (prefixCache[rawName] = name);
        }
        name = capitalize(name);
        for (let i = 0; i < prefixes.length; i++) {
            const prefixed = prefixes[i] + name;
            if (prefixed in style) {
                return (prefixCache[rawName] = prefixed);
            }
        }
        return rawName;
    }

    const xlinkNS = 'http://www.w3.org/1999/xlink';
    function patchAttr(el, key, value, isSVG, instance) {
        if (isSVG && key.startsWith('xlink:')) {
            if (value == null) {
                el.removeAttributeNS(xlinkNS, key.slice(6, key.length));
            }
            else {
                el.setAttributeNS(xlinkNS, key, value);
            }
        }
        else {
            // note we are only checking boolean attributes that don't have a
            // corresponding dom prop of the same name here.
            const isBoolean = isSpecialBooleanAttr(key);
            if (value == null || (isBoolean && !includeBooleanAttr(value))) {
                el.removeAttribute(key);
            }
            else {
                el.setAttribute(key, isBoolean ? '' : value);
            }
        }
    }

    // __UNSAFE__
    // functions. The user is responsible for using them with only trusted content.
    function patchDOMProp(el, key, value, 
    // the following args are passed only due to potential innerHTML/textContent
    // overriding existing VNodes, in which case the old tree must be properly
    // unmounted.
    prevChildren, parentComponent, parentSuspense, unmountChildren) {
        if (key === 'innerHTML' || key === 'textContent') {
            if (prevChildren) {
                unmountChildren(prevChildren, parentComponent, parentSuspense);
            }
            el[key] = value == null ? '' : value;
            return;
        }
        if (key === 'value' &&
            el.tagName !== 'PROGRESS' &&
            // custom elements may use _value internally
            !el.tagName.includes('-')) {
            // store value as _value as well since
            // non-string values will be stringified.
            el._value = value;
            const newValue = value == null ? '' : value;
            if (el.value !== newValue ||
                // #4956: always set for OPTION elements because its value falls back to
                // textContent if no value attribute is present. And setting .value for
                // OPTION has no side effect
                el.tagName === 'OPTION') {
                el.value = newValue;
            }
            if (value == null) {
                el.removeAttribute(key);
            }
            return;
        }
        let needRemove = false;
        if (value === '' || value == null) {
            const type = typeof el[key];
            if (type === 'boolean') {
                // e.g. <select multiple> compiles to { multiple: '' }
                value = includeBooleanAttr(value);
            }
            else if (value == null && type === 'string') {
                // e.g. <div :id="null">
                value = '';
                needRemove = true;
            }
            else if (type === 'number') {
                // e.g. <img :width="null">
                // the value of some IDL attr must be greater than 0, e.g. input.size = 0 -> error
                value = 0;
                needRemove = true;
            }
        }
        // some properties perform value validation and throw,
        // some properties has getter, no setter, will error in 'use strict'
        // eg. <select :type="null"></select> <select :willValidate="null"></select>
        try {
            el[key] = value;
        }
        catch (e) {
            {
                warn(`Failed setting prop "${key}" on <${el.tagName.toLowerCase()}>: ` +
                    `value ${value} is invalid.`, e);
            }
        }
        needRemove && el.removeAttribute(key);
    }

    // Async edge case fix requires storing an event listener's attach timestamp.
    const [_getNow, skipTimestampCheck] = /*#__PURE__*/ (() => {
        let _getNow = Date.now;
        let skipTimestampCheck = false;
        if (typeof window !== 'undefined') {
            // Determine what event timestamp the browser is using. Annoyingly, the
            // timestamp can either be hi-res (relative to page load) or low-res
            // (relative to UNIX epoch), so in order to compare time we have to use the
            // same timestamp type when saving the flush timestamp.
            if (Date.now() > document.createEvent('Event').timeStamp) {
                // if the low-res timestamp which is bigger than the event timestamp
                // (which is evaluated AFTER) it means the event is using a hi-res timestamp,
                // and we need to use the hi-res version for event listeners as well.
                _getNow = performance.now.bind(performance);
            }
            // #3485: Firefox <= 53 has incorrect Event.timeStamp implementation
            // and does not fire microtasks in between event propagation, so safe to exclude.
            const ffMatch = navigator.userAgent.match(/firefox\/(\d+)/i);
            skipTimestampCheck = !!(ffMatch && Number(ffMatch[1]) <= 53);
        }
        return [_getNow, skipTimestampCheck];
    })();
    // To avoid the overhead of repeatedly calling performance.now(), we cache
    // and use the same timestamp for all event listeners attached in the same tick.
    let cachedNow = 0;
    const p = /*#__PURE__*/ Promise.resolve();
    const reset = () => {
        cachedNow = 0;
    };
    const getNow = () => cachedNow || (p.then(reset), (cachedNow = _getNow()));
    function addEventListener(el, event, handler, options) {
        el.addEventListener(event, handler, options);
    }
    function removeEventListener(el, event, handler, options) {
        el.removeEventListener(event, handler, options);
    }
    function patchEvent(el, rawName, prevValue, nextValue, instance = null) {
        // vei = vue event invokers
        const invokers = el._vei || (el._vei = {});
        const existingInvoker = invokers[rawName];
        if (nextValue && existingInvoker) {
            // patch
            existingInvoker.value = nextValue;
        }
        else {
            const [name, options] = parseName(rawName);
            if (nextValue) {
                // add
                const invoker = (invokers[rawName] = createInvoker(nextValue, instance));
                addEventListener(el, name, invoker, options);
            }
            else if (existingInvoker) {
                // remove
                removeEventListener(el, name, existingInvoker, options);
                invokers[rawName] = undefined;
            }
        }
    }
    const optionsModifierRE = /(?:Once|Passive|Capture)$/;
    function parseName(name) {
        let options;
        if (optionsModifierRE.test(name)) {
            options = {};
            let m;
            while ((m = name.match(optionsModifierRE))) {
                name = name.slice(0, name.length - m[0].length);
                options[m[0].toLowerCase()] = true;
            }
        }
        return [hyphenate(name.slice(2)), options];
    }
    function createInvoker(initialValue, instance) {
        const invoker = (e) => {
            // async edge case #6566: inner click event triggers patch, event handler
            // attached to outer element during patch, and triggered again. This
            // happens because browsers fire microtask ticks between event propagation.
            // the solution is simple: we save the timestamp when a handler is attached,
            // and the handler would only fire if the event passed to it was fired
            // AFTER it was attached.
            const timeStamp = e.timeStamp || _getNow();
            if (skipTimestampCheck || timeStamp >= invoker.attached - 1) {
                callWithAsyncErrorHandling(patchStopImmediatePropagation(e, invoker.value), instance, 5 /* NATIVE_EVENT_HANDLER */, [e]);
            }
        };
        invoker.value = initialValue;
        invoker.attached = getNow();
        return invoker;
    }
    function patchStopImmediatePropagation(e, value) {
        if (isArray(value)) {
            const originalStop = e.stopImmediatePropagation;
            e.stopImmediatePropagation = () => {
                originalStop.call(e);
                e._stopped = true;
            };
            return value.map(fn => (e) => !e._stopped && fn && fn(e));
        }
        else {
            return value;
        }
    }

    const nativeOnRE = /^on[a-z]/;
    const patchProp = (el, key, prevValue, nextValue, isSVG = false, prevChildren, parentComponent, parentSuspense, unmountChildren) => {
        if (key === 'class') {
            patchClass(el, nextValue, isSVG);
        }
        else if (key === 'style') {
            patchStyle(el, prevValue, nextValue);
        }
        else if (isOn(key)) {
            // ignore v-model listeners
            if (!isModelListener(key)) {
                patchEvent(el, key, prevValue, nextValue, parentComponent);
            }
        }
        else if (key[0] === '.'
            ? ((key = key.slice(1)), true)
            : key[0] === '^'
                ? ((key = key.slice(1)), false)
                : shouldSetAsProp(el, key, nextValue, isSVG)) {
            patchDOMProp(el, key, nextValue, prevChildren, parentComponent, parentSuspense, unmountChildren);
        }
        else {
            // special case for <input v-model type="checkbox"> with
            // :true-value & :false-value
            // store value as dom properties since non-string values will be
            // stringified.
            if (key === 'true-value') {
                el._trueValue = nextValue;
            }
            else if (key === 'false-value') {
                el._falseValue = nextValue;
            }
            patchAttr(el, key, nextValue, isSVG);
        }
    };
    function shouldSetAsProp(el, key, value, isSVG) {
        if (isSVG) {
            // most keys must be set as attribute on svg elements to work
            // ...except innerHTML & textContent
            if (key === 'innerHTML' || key === 'textContent') {
                return true;
            }
            // or native onclick with function values
            if (key in el && nativeOnRE.test(key) && isFunction(value)) {
                return true;
            }
            return false;
        }
        // these are enumerated attrs, however their corresponding DOM properties
        // are actually booleans - this leads to setting it with a string "false"
        // value leading it to be coerced to `true`, so we need to always treat
        // them as attributes.
        // Note that `contentEditable` doesn't have this problem: its DOM
        // property is also enumerated string values.
        if (key === 'spellcheck' || key === 'draggable' || key === 'translate') {
            return false;
        }
        // #1787, #2840 form property on form elements is readonly and must be set as
        // attribute.
        if (key === 'form') {
            return false;
        }
        // #1526 <input list> must be set as attribute
        if (key === 'list' && el.tagName === 'INPUT') {
            return false;
        }
        // #2766 <textarea type> must be set as attribute
        if (key === 'type' && el.tagName === 'TEXTAREA') {
            return false;
        }
        // native onclick with string value, must be set as attribute
        if (nativeOnRE.test(key) && isString(value)) {
            return false;
        }
        return key in el;
    }

    const getModelAssigner = (vnode) => {
        const fn = vnode.props['onUpdate:modelValue'] ||
            (false );
        return isArray(fn) ? value => invokeArrayFns(fn, value) : fn;
    };
    function onCompositionStart(e) {
        e.target.composing = true;
    }
    function onCompositionEnd(e) {
        const target = e.target;
        if (target.composing) {
            target.composing = false;
            target.dispatchEvent(new Event('input'));
        }
    }
    // We are exporting the v-model runtime directly as vnode hooks so that it can
    // be tree-shaken in case v-model is never used.
    const vModelText = {
        created(el, { modifiers: { lazy, trim, number } }, vnode) {
            el._assign = getModelAssigner(vnode);
            const castToNumber = number || (vnode.props && vnode.props.type === 'number');
            addEventListener(el, lazy ? 'change' : 'input', e => {
                if (e.target.composing)
                    return;
                let domValue = el.value;
                if (trim) {
                    domValue = domValue.trim();
                }
                if (castToNumber) {
                    domValue = toNumber(domValue);
                }
                el._assign(domValue);
            });
            if (trim) {
                addEventListener(el, 'change', () => {
                    el.value = el.value.trim();
                });
            }
            if (!lazy) {
                addEventListener(el, 'compositionstart', onCompositionStart);
                addEventListener(el, 'compositionend', onCompositionEnd);
                // Safari < 10.2 & UIWebView doesn't fire compositionend when
                // switching focus before confirming composition choice
                // this also fixes the issue where some browsers e.g. iOS Chrome
                // fires "change" instead of "input" on autocomplete.
                addEventListener(el, 'change', onCompositionEnd);
            }
        },
        // set value on mounted so it's after min/max for type="range"
        mounted(el, { value }) {
            el.value = value == null ? '' : value;
        },
        beforeUpdate(el, { value, modifiers: { lazy, trim, number } }, vnode) {
            el._assign = getModelAssigner(vnode);
            // avoid clearing unresolved text. #2302
            if (el.composing)
                return;
            if (document.activeElement === el && el.type !== 'range') {
                if (lazy) {
                    return;
                }
                if (trim && el.value.trim() === value) {
                    return;
                }
                if ((number || el.type === 'number') && toNumber(el.value) === value) {
                    return;
                }
            }
            const newValue = value == null ? '' : value;
            if (el.value !== newValue) {
                el.value = newValue;
            }
        }
    };
    const vModelCheckbox = {
        // #4096 array checkboxes need to be deep traversed
        deep: true,
        created(el, _, vnode) {
            el._assign = getModelAssigner(vnode);
            addEventListener(el, 'change', () => {
                const modelValue = el._modelValue;
                const elementValue = getValue(el);
                const checked = el.checked;
                const assign = el._assign;
                if (isArray(modelValue)) {
                    const index = looseIndexOf(modelValue, elementValue);
                    const found = index !== -1;
                    if (checked && !found) {
                        assign(modelValue.concat(elementValue));
                    }
                    else if (!checked && found) {
                        const filtered = [...modelValue];
                        filtered.splice(index, 1);
                        assign(filtered);
                    }
                }
                else if (isSet(modelValue)) {
                    const cloned = new Set(modelValue);
                    if (checked) {
                        cloned.add(elementValue);
                    }
                    else {
                        cloned.delete(elementValue);
                    }
                    assign(cloned);
                }
                else {
                    assign(getCheckboxValue(el, checked));
                }
            });
        },
        // set initial checked on mount to wait for true-value/false-value
        mounted: setChecked,
        beforeUpdate(el, binding, vnode) {
            el._assign = getModelAssigner(vnode);
            setChecked(el, binding, vnode);
        }
    };
    function setChecked(el, { value, oldValue }, vnode) {
        el._modelValue = value;
        if (isArray(value)) {
            el.checked = looseIndexOf(value, vnode.props.value) > -1;
        }
        else if (isSet(value)) {
            el.checked = value.has(vnode.props.value);
        }
        else if (value !== oldValue) {
            el.checked = looseEqual(value, getCheckboxValue(el, true));
        }
    }
    // retrieve raw value set via :value bindings
    function getValue(el) {
        return '_value' in el ? el._value : el.value;
    }
    // retrieve raw value for true-value and false-value set via :true-value or :false-value bindings
    function getCheckboxValue(el, checked) {
        const key = checked ? '_trueValue' : '_falseValue';
        return key in el ? el[key] : checked;
    }

    const vShow = {
        beforeMount(el, { value }, { transition }) {
            el._vod = el.style.display === 'none' ? '' : el.style.display;
            if (transition && value) {
                transition.beforeEnter(el);
            }
            else {
                setDisplay(el, value);
            }
        },
        mounted(el, { value }, { transition }) {
            if (transition && value) {
                transition.enter(el);
            }
        },
        updated(el, { value, oldValue }, { transition }) {
            if (!value === !oldValue)
                return;
            if (transition) {
                if (value) {
                    transition.beforeEnter(el);
                    setDisplay(el, true);
                    transition.enter(el);
                }
                else {
                    transition.leave(el, () => {
                        setDisplay(el, false);
                    });
                }
            }
            else {
                setDisplay(el, value);
            }
        },
        beforeUnmount(el, { value }) {
            setDisplay(el, value);
        }
    };
    function setDisplay(el, value) {
        el.style.display = value ? el._vod : 'none';
    }

    const rendererOptions = /*#__PURE__*/ extend({ patchProp }, nodeOps);
    // lazy create the renderer - this makes core renderer logic tree-shakable
    // in case the user only imports reactivity utilities from Vue.
    let renderer;
    function ensureRenderer() {
        return (renderer ||
            (renderer = createRenderer(rendererOptions)));
    }
    const createApp = ((...args) => {
        const app = ensureRenderer().createApp(...args);
        {
            injectNativeTagCheck(app);
            injectCompilerOptionsCheck(app);
        }
        const { mount } = app;
        app.mount = (containerOrSelector) => {
            const container = normalizeContainer(containerOrSelector);
            if (!container)
                return;
            const component = app._component;
            if (!isFunction(component) && !component.render && !component.template) {
                // __UNSAFE__
                // Reason: potential execution of JS expressions in in-DOM template.
                // The user must make sure the in-DOM template is trusted. If it's
                // rendered by the server, the template should not contain any user data.
                component.template = container.innerHTML;
            }
            // clear content before mounting
            container.innerHTML = '';
            const proxy = mount(container, false, container instanceof SVGElement);
            if (container instanceof Element) {
                container.removeAttribute('v-cloak');
                container.setAttribute('data-v-app', '');
            }
            return proxy;
        };
        return app;
    });
    function injectNativeTagCheck(app) {
        // Inject `isNativeTag`
        // this is used for component name validation (dev only)
        Object.defineProperty(app.config, 'isNativeTag', {
            value: (tag) => isHTMLTag(tag) || isSVGTag(tag),
            writable: false
        });
    }
    // dev only
    function injectCompilerOptionsCheck(app) {
        {
            const isCustomElement = app.config.isCustomElement;
            Object.defineProperty(app.config, 'isCustomElement', {
                get() {
                    return isCustomElement;
                },
                set() {
                    warn(`The \`isCustomElement\` config option is deprecated. Use ` +
                        `\`compilerOptions.isCustomElement\` instead.`);
                }
            });
            const compilerOptions = app.config.compilerOptions;
            const msg = `The \`compilerOptions\` config option is only respected when using ` +
                `a build of Vue.js that includes the runtime compiler (aka "full build"). ` +
                `Since you are using the runtime-only build, \`compilerOptions\` ` +
                `must be passed to \`@vue/compiler-dom\` in the build setup instead.\n` +
                `- For vue-loader: pass it via vue-loader's \`compilerOptions\` loader option.\n` +
                `- For vue-cli: see https://cli.vuejs.org/guide/webpack.html#modifying-options-of-a-loader\n` +
                `- For vite: pass it via @vitejs/plugin-vue options. See https://github.com/vitejs/vite/tree/main/packages/plugin-vue#example-for-passing-options-to-vuecompiler-dom`;
            Object.defineProperty(app.config, 'compilerOptions', {
                get() {
                    warn(msg);
                    return compilerOptions;
                },
                set() {
                    warn(msg);
                }
            });
        }
    }
    function normalizeContainer(container) {
        if (isString(container)) {
            const res = document.querySelector(container);
            if (!res) {
                warn(`Failed to mount app: mount target selector "${container}" returned null.`);
            }
            return res;
        }
        if (window.ShadowRoot &&
            container instanceof window.ShadowRoot &&
            container.mode === 'closed') {
            warn(`mounting on a ShadowRoot with \`{mode: "closed"}\` may lead to unpredictable bugs`);
        }
        return container;
    }

    function initDev() {
        {
            initCustomFormatter();
        }
    }

    // This entry exports the runtime only, and is built as
    {
        initDev();
    }

    var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

    function getDefaultExportFromCjs (x) {
    	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
    }

    var vueKnobControl_umd = {exports: {}};

    (function (module, exports) {
    	(function webpackUniversalModuleDefinition(root, factory) {
    		module.exports = factory();
    	})((typeof self !== 'undefined' ? self : commonjsGlobal), function() {
    	return /******/ (function(modules) { // webpackBootstrap
    	/******/ 	// The module cache
    	/******/ 	var installedModules = {};
    	/******/
    	/******/ 	// The require function
    	/******/ 	function __webpack_require__(moduleId) {
    	/******/
    	/******/ 		// Check if module is in cache
    	/******/ 		if(installedModules[moduleId]) {
    	/******/ 			return installedModules[moduleId].exports;
    	/******/ 		}
    	/******/ 		// Create a new module (and put it into the cache)
    	/******/ 		var module = installedModules[moduleId] = {
    	/******/ 			i: moduleId,
    	/******/ 			l: false,
    	/******/ 			exports: {}
    	/******/ 		};
    	/******/
    	/******/ 		// Execute the module function
    	/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
    	/******/
    	/******/ 		// Flag the module as loaded
    	/******/ 		module.l = true;
    	/******/
    	/******/ 		// Return the exports of the module
    	/******/ 		return module.exports;
    	/******/ 	}
    	/******/
    	/******/
    	/******/ 	// expose the modules object (__webpack_modules__)
    	/******/ 	__webpack_require__.m = modules;
    	/******/
    	/******/ 	// expose the module cache
    	/******/ 	__webpack_require__.c = installedModules;
    	/******/
    	/******/ 	// define getter function for harmony exports
    	/******/ 	__webpack_require__.d = function(exports, name, getter) {
    	/******/ 		if(!__webpack_require__.o(exports, name)) {
    	/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
    	/******/ 		}
    	/******/ 	};
    	/******/
    	/******/ 	// define __esModule on exports
    	/******/ 	__webpack_require__.r = function(exports) {
    	/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
    	/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
    	/******/ 		}
    	/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
    	/******/ 	};
    	/******/
    	/******/ 	// create a fake namespace object
    	/******/ 	// mode & 1: value is a module id, require it
    	/******/ 	// mode & 2: merge all properties of value into the ns
    	/******/ 	// mode & 4: return value when already ns object
    	/******/ 	// mode & 8|1: behave like require
    	/******/ 	__webpack_require__.t = function(value, mode) {
    	/******/ 		if(mode & 1) value = __webpack_require__(value);
    	/******/ 		if(mode & 8) return value;
    	/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
    	/******/ 		var ns = Object.create(null);
    	/******/ 		__webpack_require__.r(ns);
    	/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
    	/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
    	/******/ 		return ns;
    	/******/ 	};
    	/******/
    	/******/ 	// getDefaultExport function for compatibility with non-harmony modules
    	/******/ 	__webpack_require__.n = function(module) {
    	/******/ 		var getter = module && module.__esModule ?
    	/******/ 			function getDefault() { return module['default']; } :
    	/******/ 			function getModuleExports() { return module; };
    	/******/ 		__webpack_require__.d(getter, 'a', getter);
    	/******/ 		return getter;
    	/******/ 	};
    	/******/
    	/******/ 	// Object.prototype.hasOwnProperty.call
    	/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
    	/******/
    	/******/ 	// __webpack_public_path__
    	/******/ 	__webpack_require__.p = "";
    	/******/
    	/******/
    	/******/ 	// Load entry module and return exports
    	/******/ 	return __webpack_require__(__webpack_require__.s = "9be4");
    	/******/ })
    	/************************************************************************/
    	/******/ ({

    	/***/ "0181":
    	/***/ (function(module, exports, __webpack_require__) {

    	/* eslint-disable es/no-symbol -- required for testing */
    	var NATIVE_SYMBOL = __webpack_require__("3905");

    	module.exports = NATIVE_SYMBOL
    	  && !Symbol.sham
    	  && typeof Symbol.iterator == 'symbol';


    	/***/ }),

    	/***/ "07b7":
    	/***/ (function(module, exports, __webpack_require__) {

    	var NATIVE_BIND = __webpack_require__("fc3e");

    	var FunctionPrototype = Function.prototype;
    	var apply = FunctionPrototype.apply;
    	var call = FunctionPrototype.call;

    	// eslint-disable-next-line es/no-reflect -- safe
    	module.exports = typeof Reflect == 'object' && Reflect.apply || (NATIVE_BIND ? call.bind(apply) : function () {
    	  return call.apply(apply, arguments);
    	});


    	/***/ }),

    	/***/ "0eae":
    	/***/ (function(module, exports, __webpack_require__) {

    	var DESCRIPTORS = __webpack_require__("c2a7");
    	var fails = __webpack_require__("7aa9");

    	// V8 ~ Chrome 36-
    	// https://bugs.chromium.org/p/v8/issues/detail?id=3334
    	module.exports = DESCRIPTORS && fails(function () {
    	  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
    	  return Object.defineProperty(function () { /* empty */ }, 'prototype', {
    	    value: 42,
    	    writable: false
    	  }).prototype != 42;
    	});


    	/***/ }),

    	/***/ "101a":
    	/***/ (function(module, exports, __webpack_require__) {

    	var global = __webpack_require__("4f87");

    	var TypeError = global.TypeError;

    	module.exports = function (passed, required) {
    	  if (passed < required) throw TypeError('Not enough arguments');
    	  return passed;
    	};


    	/***/ }),

    	/***/ "11c1":
    	/***/ (function(module, exports, __webpack_require__) {

    	var uncurryThis = __webpack_require__("52fe");
    	var hasOwn = __webpack_require__("2ea1");
    	var toIndexedObject = __webpack_require__("e6b6");
    	var indexOf = __webpack_require__("411b").indexOf;
    	var hiddenKeys = __webpack_require__("c00d");

    	var push = uncurryThis([].push);

    	module.exports = function (object, names) {
    	  var O = toIndexedObject(object);
    	  var i = 0;
    	  var result = [];
    	  var key;
    	  for (key in O) !hasOwn(hiddenKeys, key) && hasOwn(O, key) && push(result, key);
    	  // Don't enum bug & hidden keys
    	  while (names.length > i) if (hasOwn(O, key = names[i++])) {
    	    ~indexOf(result, key) || push(result, key);
    	  }
    	  return result;
    	};


    	/***/ }),

    	/***/ "1350":
    	/***/ (function(module, exports, __webpack_require__) {

    	var isCallable = __webpack_require__("3a9e");
    	var isObject = __webpack_require__("5428");
    	var setPrototypeOf = __webpack_require__("d771");

    	// makes subclassing work correct for wrapped built-ins
    	module.exports = function ($this, dummy, Wrapper) {
    	  var NewTarget, NewTargetPrototype;
    	  if (
    	    // it can work only with native `setPrototypeOf`
    	    setPrototypeOf &&
    	    // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
    	    isCallable(NewTarget = dummy.constructor) &&
    	    NewTarget !== Wrapper &&
    	    isObject(NewTargetPrototype = NewTarget.prototype) &&
    	    NewTargetPrototype !== Wrapper.prototype
    	  ) setPrototypeOf($this, NewTargetPrototype);
    	  return $this;
    	};


    	/***/ }),

    	/***/ "1f42":
    	/***/ (function(module, exports, __webpack_require__) {

    	var global = __webpack_require__("4f87");
    	var call = __webpack_require__("85d7");
    	var isCallable = __webpack_require__("3a9e");
    	var isObject = __webpack_require__("5428");

    	var TypeError = global.TypeError;

    	// `OrdinaryToPrimitive` abstract operation
    	// https://tc39.es/ecma262/#sec-ordinarytoprimitive
    	module.exports = function (input, pref) {
    	  var fn, val;
    	  if (pref === 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
    	  if (isCallable(fn = input.valueOf) && !isObject(val = call(fn, input))) return val;
    	  if (pref !== 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
    	  throw TypeError("Can't convert object to primitive value");
    	};


    	/***/ }),

    	/***/ "21cf":
    	/***/ (function(module, exports, __webpack_require__) {

    	var getBuiltIn = __webpack_require__("5839");
    	var uncurryThis = __webpack_require__("52fe");
    	var getOwnPropertyNamesModule = __webpack_require__("959d");
    	var getOwnPropertySymbolsModule = __webpack_require__("4edd");
    	var anObject = __webpack_require__("4d06");

    	var concat = uncurryThis([].concat);

    	// all object keys, includes non-enumerable and symbols
    	module.exports = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
    	  var keys = getOwnPropertyNamesModule.f(anObject(it));
    	  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
    	  return getOwnPropertySymbols ? concat(keys, getOwnPropertySymbols(it)) : keys;
    	};


    	/***/ }),

    	/***/ "24b5":
    	/***/ (function(module, exports, __webpack_require__) {

    	var uncurryThis = __webpack_require__("52fe");
    	var fails = __webpack_require__("7aa9");
    	var isCallable = __webpack_require__("3a9e");
    	var classof = __webpack_require__("84ef");
    	var getBuiltIn = __webpack_require__("5839");
    	var inspectSource = __webpack_require__("bba4");

    	var noop = function () { /* empty */ };
    	var empty = [];
    	var construct = getBuiltIn('Reflect', 'construct');
    	var constructorRegExp = /^\s*(?:class|function)\b/;
    	var exec = uncurryThis(constructorRegExp.exec);
    	var INCORRECT_TO_STRING = !constructorRegExp.exec(noop);

    	var isConstructorModern = function isConstructor(argument) {
    	  if (!isCallable(argument)) return false;
    	  try {
    	    construct(noop, empty, argument);
    	    return true;
    	  } catch (error) {
    	    return false;
    	  }
    	};

    	var isConstructorLegacy = function isConstructor(argument) {
    	  if (!isCallable(argument)) return false;
    	  switch (classof(argument)) {
    	    case 'AsyncFunction':
    	    case 'GeneratorFunction':
    	    case 'AsyncGeneratorFunction': return false;
    	  }
    	  try {
    	    // we can't check .prototype since constructors produced by .bind haven't it
    	    // `Function#toString` throws on some built-it function in some legacy engines
    	    // (for example, `DOMQuad` and similar in FF41-)
    	    return INCORRECT_TO_STRING || !!exec(constructorRegExp, inspectSource(argument));
    	  } catch (error) {
    	    return true;
    	  }
    	};

    	isConstructorLegacy.sham = true;

    	// `IsConstructor` abstract operation
    	// https://tc39.es/ecma262/#sec-isconstructor
    	module.exports = !construct || fails(function () {
    	  var called;
    	  return isConstructorModern(isConstructorModern.call)
    	    || !isConstructorModern(Object)
    	    || !isConstructorModern(function () { called = true; })
    	    || called;
    	}) ? isConstructorLegacy : isConstructorModern;


    	/***/ }),

    	/***/ "2675":
    	/***/ (function(module, exports, __webpack_require__) {

    	var $propertyIsEnumerable = {}.propertyIsEnumerable;
    	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
    	var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

    	// Nashorn ~ JDK8 bug
    	var NASHORN_BUG = getOwnPropertyDescriptor && !$propertyIsEnumerable.call({ 1: 2 }, 1);

    	// `Object.prototype.propertyIsEnumerable` method implementation
    	// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
    	exports.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
    	  var descriptor = getOwnPropertyDescriptor(this, V);
    	  return !!descriptor && descriptor.enumerable;
    	} : $propertyIsEnumerable;


    	/***/ }),

    	/***/ "2b4c":
    	/***/ (function(module, exports, __webpack_require__) {

    	var global = __webpack_require__("4f87");

    	var TypeError = global.TypeError;

    	// `RequireObjectCoercible` abstract operation
    	// https://tc39.es/ecma262/#sec-requireobjectcoercible
    	module.exports = function (it) {
    	  if (it == undefined) throw TypeError("Can't call method on " + it);
    	  return it;
    	};


    	/***/ }),

    	/***/ "2ea1":
    	/***/ (function(module, exports, __webpack_require__) {

    	var uncurryThis = __webpack_require__("52fe");
    	var toObject = __webpack_require__("7f2e");

    	var hasOwnProperty = uncurryThis({}.hasOwnProperty);

    	// `HasOwnProperty` abstract operation
    	// https://tc39.es/ecma262/#sec-hasownproperty
    	module.exports = Object.hasOwn || function hasOwn(it, key) {
    	  return hasOwnProperty(toObject(it), key);
    	};


    	/***/ }),

    	/***/ "2ec1":
    	/***/ (function(module, exports) {

    	var g;

    	// This works in non-strict mode
    	g = (function() {
    		return this;
    	})();

    	try {
    		// This works if eval is allowed (see CSP)
    		g = g || new Function("return this")();
    	} catch (e) {
    		// This works if the window reference is available
    		if (typeof window === "object") g = window;
    	}

    	// g can still be undefined, but nothing to do about it...
    	// We return undefined, instead of nothing here, so it's
    	// easier to handle this case. if(!global) { ...}

    	module.exports = g;


    	/***/ }),

    	/***/ "2f2e":
    	/***/ (function(module, exports, __webpack_require__) {

    	var hasOwn = __webpack_require__("2ea1");
    	var ownKeys = __webpack_require__("21cf");
    	var getOwnPropertyDescriptorModule = __webpack_require__("7f51");
    	var definePropertyModule = __webpack_require__("4201");

    	module.exports = function (target, source, exceptions) {
    	  var keys = ownKeys(source);
    	  var defineProperty = definePropertyModule.f;
    	  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
    	  for (var i = 0; i < keys.length; i++) {
    	    var key = keys[i];
    	    if (!hasOwn(target, key) && !(exceptions && hasOwn(exceptions, key))) {
    	      defineProperty(target, key, getOwnPropertyDescriptor(source, key));
    	    }
    	  }
    	};


    	/***/ }),

    	/***/ "30a0":
    	/***/ (function(module, exports, __webpack_require__) {

    	var global = __webpack_require__("4f87");
    	var isCallable = __webpack_require__("3a9e");
    	var inspectSource = __webpack_require__("bba4");

    	var WeakMap = global.WeakMap;

    	module.exports = isCallable(WeakMap) && /native code/.test(inspectSource(WeakMap));


    	/***/ }),

    	/***/ "355f":
    	/***/ (function(module, exports, __webpack_require__) {

    	var uncurryThis = __webpack_require__("52fe");

    	module.exports = uncurryThis({}.isPrototypeOf);


    	/***/ }),

    	/***/ "367c":
    	/***/ (function(module, exports) {

    	// IE8- don't enum bug keys
    	module.exports = [
    	  'constructor',
    	  'hasOwnProperty',
    	  'isPrototypeOf',
    	  'propertyIsEnumerable',
    	  'toLocaleString',
    	  'toString',
    	  'valueOf'
    	];


    	/***/ }),

    	/***/ "38bb":
    	/***/ (function(module, exports) {

    	module.exports = function (bitmap, value) {
    	  return {
    	    enumerable: !(bitmap & 1),
    	    configurable: !(bitmap & 2),
    	    writable: !(bitmap & 4),
    	    value: value
    	  };
    	};


    	/***/ }),

    	/***/ "3905":
    	/***/ (function(module, exports, __webpack_require__) {

    	/* eslint-disable es/no-symbol -- required for testing */
    	var V8_VERSION = __webpack_require__("d88e");
    	var fails = __webpack_require__("7aa9");

    	// eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
    	module.exports = !!Object.getOwnPropertySymbols && !fails(function () {
    	  var symbol = Symbol();
    	  // Chrome 38 Symbol has incorrect toString conversion
    	  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
    	  return !String(symbol) || !(Object(symbol) instanceof Symbol) ||
    	    // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
    	    !Symbol.sham && V8_VERSION && V8_VERSION < 41;
    	});


    	/***/ }),

    	/***/ "3a3a":
    	/***/ (function(module, exports, __webpack_require__) {

    	var uncurryThis = __webpack_require__("52fe");

    	// `thisNumberValue` abstract operation
    	// https://tc39.es/ecma262/#sec-thisnumbervalue
    	module.exports = uncurryThis(1.0.valueOf);


    	/***/ }),

    	/***/ "3a9e":
    	/***/ (function(module, exports) {

    	// `IsCallable` abstract operation
    	// https://tc39.es/ecma262/#sec-iscallable
    	module.exports = function (argument) {
    	  return typeof argument == 'function';
    	};


    	/***/ }),

    	/***/ "3dbd":
    	/***/ (function(module, exports, __webpack_require__) {

    	var arraySpeciesConstructor = __webpack_require__("9844");

    	// `ArraySpeciesCreate` abstract operation
    	// https://tc39.es/ecma262/#sec-arrayspeciescreate
    	module.exports = function (originalArray, length) {
    	  return new (arraySpeciesConstructor(originalArray))(length === 0 ? 0 : length);
    	};


    	/***/ }),

    	/***/ "3fe7":
    	/***/ (function(module, exports, __webpack_require__) {

    	var global = __webpack_require__("4f87");
    	var isCallable = __webpack_require__("3a9e");
    	var tryToString = __webpack_require__("6c78");

    	var TypeError = global.TypeError;

    	// `Assert: IsCallable(argument) is true`
    	module.exports = function (argument) {
    	  if (isCallable(argument)) return argument;
    	  throw TypeError(tryToString(argument) + ' is not a function');
    	};


    	/***/ }),

    	/***/ "4054":
    	/***/ (function(module, exports, __webpack_require__) {

    	var global = __webpack_require__("4f87");
    	var uncurryThis = __webpack_require__("52fe");
    	var fails = __webpack_require__("7aa9");
    	var classof = __webpack_require__("5119");

    	var Object = global.Object;
    	var split = uncurryThis(''.split);

    	// fallback for non-array-like ES3 and non-enumerable old V8 strings
    	module.exports = fails(function () {
    	  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
    	  // eslint-disable-next-line no-prototype-builtins -- safe
    	  return !Object('z').propertyIsEnumerable(0);
    	}) ? function (it) {
    	  return classof(it) == 'String' ? split(it, '') : Object(it);
    	} : Object;


    	/***/ }),

    	/***/ "411b":
    	/***/ (function(module, exports, __webpack_require__) {

    	var toIndexedObject = __webpack_require__("e6b6");
    	var toAbsoluteIndex = __webpack_require__("b93f");
    	var lengthOfArrayLike = __webpack_require__("aa15");

    	// `Array.prototype.{ indexOf, includes }` methods implementation
    	var createMethod = function (IS_INCLUDES) {
    	  return function ($this, el, fromIndex) {
    	    var O = toIndexedObject($this);
    	    var length = lengthOfArrayLike(O);
    	    var index = toAbsoluteIndex(fromIndex, length);
    	    var value;
    	    // Array#includes uses SameValueZero equality algorithm
    	    // eslint-disable-next-line no-self-compare -- NaN check
    	    if (IS_INCLUDES && el != el) while (length > index) {
    	      value = O[index++];
    	      // eslint-disable-next-line no-self-compare -- NaN check
    	      if (value != value) return true;
    	    // Array#indexOf ignores holes, Array#includes - not
    	    } else for (;length > index; index++) {
    	      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    	    } return !IS_INCLUDES && -1;
    	  };
    	};

    	module.exports = {
    	  // `Array.prototype.includes` method
    	  // https://tc39.es/ecma262/#sec-array.prototype.includes
    	  includes: createMethod(true),
    	  // `Array.prototype.indexOf` method
    	  // https://tc39.es/ecma262/#sec-array.prototype.indexof
    	  indexOf: createMethod(false)
    	};


    	/***/ }),

    	/***/ "4201":
    	/***/ (function(module, exports, __webpack_require__) {

    	var global = __webpack_require__("4f87");
    	var DESCRIPTORS = __webpack_require__("c2a7");
    	var IE8_DOM_DEFINE = __webpack_require__("64a1");
    	var V8_PROTOTYPE_DEFINE_BUG = __webpack_require__("0eae");
    	var anObject = __webpack_require__("4d06");
    	var toPropertyKey = __webpack_require__("b28f");

    	var TypeError = global.TypeError;
    	// eslint-disable-next-line es/no-object-defineproperty -- safe
    	var $defineProperty = Object.defineProperty;
    	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
    	var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
    	var ENUMERABLE = 'enumerable';
    	var CONFIGURABLE = 'configurable';
    	var WRITABLE = 'writable';

    	// `Object.defineProperty` method
    	// https://tc39.es/ecma262/#sec-object.defineproperty
    	exports.f = DESCRIPTORS ? V8_PROTOTYPE_DEFINE_BUG ? function defineProperty(O, P, Attributes) {
    	  anObject(O);
    	  P = toPropertyKey(P);
    	  anObject(Attributes);
    	  if (typeof O === 'function' && P === 'prototype' && 'value' in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
    	    var current = $getOwnPropertyDescriptor(O, P);
    	    if (current && current[WRITABLE]) {
    	      O[P] = Attributes.value;
    	      Attributes = {
    	        configurable: CONFIGURABLE in Attributes ? Attributes[CONFIGURABLE] : current[CONFIGURABLE],
    	        enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
    	        writable: false
    	      };
    	    }
    	  } return $defineProperty(O, P, Attributes);
    	} : $defineProperty : function defineProperty(O, P, Attributes) {
    	  anObject(O);
    	  P = toPropertyKey(P);
    	  anObject(Attributes);
    	  if (IE8_DOM_DEFINE) try {
    	    return $defineProperty(O, P, Attributes);
    	  } catch (error) { /* empty */ }
    	  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
    	  if ('value' in Attributes) O[P] = Attributes.value;
    	  return O;
    	};


    	/***/ }),

    	/***/ "4d06":
    	/***/ (function(module, exports, __webpack_require__) {

    	var global = __webpack_require__("4f87");
    	var isObject = __webpack_require__("5428");

    	var String = global.String;
    	var TypeError = global.TypeError;

    	// `Assert: Type(argument) is Object`
    	module.exports = function (argument) {
    	  if (isObject(argument)) return argument;
    	  throw TypeError(String(argument) + ' is not an object');
    	};


    	/***/ }),

    	/***/ "4edd":
    	/***/ (function(module, exports) {

    	// eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
    	exports.f = Object.getOwnPropertySymbols;


    	/***/ }),

    	/***/ "4f87":
    	/***/ (function(module, exports, __webpack_require__) {

    	/* WEBPACK VAR INJECTION */(function(global) {var check = function (it) {
    	  return it && it.Math == Math && it;
    	};

    	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
    	module.exports =
    	  // eslint-disable-next-line es/no-global-this -- safe
    	  check(typeof globalThis == 'object' && globalThis) ||
    	  check(typeof window == 'object' && window) ||
    	  // eslint-disable-next-line no-restricted-globals -- safe
    	  check(typeof self == 'object' && self) ||
    	  check(typeof global == 'object' && global) ||
    	  // eslint-disable-next-line no-new-func -- fallback
    	  (function () { return this; })() || Function('return this')();

    	/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("2ec1")));

    	/***/ }),

    	/***/ "5119":
    	/***/ (function(module, exports, __webpack_require__) {

    	var uncurryThis = __webpack_require__("52fe");

    	var toString = uncurryThis({}.toString);
    	var stringSlice = uncurryThis(''.slice);

    	module.exports = function (it) {
    	  return stringSlice(toString(it), 8, -1);
    	};


    	/***/ }),

    	/***/ "5276":
    	/***/ (function(module, exports, __webpack_require__) {

    	var getBuiltIn = __webpack_require__("5839");

    	module.exports = getBuiltIn('navigator', 'userAgent') || '';


    	/***/ }),

    	/***/ "52fe":
    	/***/ (function(module, exports, __webpack_require__) {

    	var NATIVE_BIND = __webpack_require__("fc3e");

    	var FunctionPrototype = Function.prototype;
    	var bind = FunctionPrototype.bind;
    	var call = FunctionPrototype.call;
    	var uncurryThis = NATIVE_BIND && bind.bind(call, call);

    	module.exports = NATIVE_BIND ? function (fn) {
    	  return fn && uncurryThis(fn);
    	} : function (fn) {
    	  return fn && function () {
    	    return call.apply(fn, arguments);
    	  };
    	};


    	/***/ }),

    	/***/ "5428":
    	/***/ (function(module, exports, __webpack_require__) {

    	var isCallable = __webpack_require__("3a9e");

    	module.exports = function (it) {
    	  return typeof it == 'object' ? it !== null : isCallable(it);
    	};


    	/***/ }),

    	/***/ "5568":
    	/***/ (function(module, __webpack_exports__, __webpack_require__) {
    	/* harmony import */ __webpack_require__("ae5d");
    	/* unused harmony reexport * */


    	/***/ }),

    	/***/ "5663":
    	/***/ (function(module, exports, __webpack_require__) {

    	var DESCRIPTORS = __webpack_require__("c2a7");
    	var global = __webpack_require__("4f87");
    	var uncurryThis = __webpack_require__("52fe");
    	var isForced = __webpack_require__("5a86");
    	var redefine = __webpack_require__("9182");
    	var hasOwn = __webpack_require__("2ea1");
    	var inheritIfRequired = __webpack_require__("1350");
    	var isPrototypeOf = __webpack_require__("355f");
    	var isSymbol = __webpack_require__("9d9b");
    	var toPrimitive = __webpack_require__("6ed0");
    	var fails = __webpack_require__("7aa9");
    	var getOwnPropertyNames = __webpack_require__("959d").f;
    	var getOwnPropertyDescriptor = __webpack_require__("7f51").f;
    	var defineProperty = __webpack_require__("4201").f;
    	var thisNumberValue = __webpack_require__("3a3a");
    	var trim = __webpack_require__("fcdc").trim;

    	var NUMBER = 'Number';
    	var NativeNumber = global[NUMBER];
    	var NumberPrototype = NativeNumber.prototype;
    	var TypeError = global.TypeError;
    	var arraySlice = uncurryThis(''.slice);
    	var charCodeAt = uncurryThis(''.charCodeAt);

    	// `ToNumeric` abstract operation
    	// https://tc39.es/ecma262/#sec-tonumeric
    	var toNumeric = function (value) {
    	  var primValue = toPrimitive(value, 'number');
    	  return typeof primValue == 'bigint' ? primValue : toNumber(primValue);
    	};

    	// `ToNumber` abstract operation
    	// https://tc39.es/ecma262/#sec-tonumber
    	var toNumber = function (argument) {
    	  var it = toPrimitive(argument, 'number');
    	  var first, third, radix, maxCode, digits, length, index, code;
    	  if (isSymbol(it)) throw TypeError('Cannot convert a Symbol value to a number');
    	  if (typeof it == 'string' && it.length > 2) {
    	    it = trim(it);
    	    first = charCodeAt(it, 0);
    	    if (first === 43 || first === 45) {
    	      third = charCodeAt(it, 2);
    	      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
    	    } else if (first === 48) {
    	      switch (charCodeAt(it, 1)) {
    	        case 66: case 98: radix = 2; maxCode = 49; break; // fast equal of /^0b[01]+$/i
    	        case 79: case 111: radix = 8; maxCode = 55; break; // fast equal of /^0o[0-7]+$/i
    	        default: return +it;
    	      }
    	      digits = arraySlice(it, 2);
    	      length = digits.length;
    	      for (index = 0; index < length; index++) {
    	        code = charCodeAt(digits, index);
    	        // parseInt parses a string to a first unavailable symbol
    	        // but ToNumber should return NaN if a string contains unavailable symbols
    	        if (code < 48 || code > maxCode) return NaN;
    	      } return parseInt(digits, radix);
    	    }
    	  } return +it;
    	};

    	// `Number` constructor
    	// https://tc39.es/ecma262/#sec-number-constructor
    	if (isForced(NUMBER, !NativeNumber(' 0o1') || !NativeNumber('0b1') || NativeNumber('+0x1'))) {
    	  var NumberWrapper = function Number(value) {
    	    var n = arguments.length < 1 ? 0 : NativeNumber(toNumeric(value));
    	    var dummy = this;
    	    // check on 1..constructor(foo) case
    	    return isPrototypeOf(NumberPrototype, dummy) && fails(function () { thisNumberValue(dummy); })
    	      ? inheritIfRequired(Object(n), dummy, NumberWrapper) : n;
    	  };
    	  for (var keys = DESCRIPTORS ? getOwnPropertyNames(NativeNumber) : (
    	    // ES3:
    	    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
    	    // ES2015 (in case, if modules with ES2015 Number statics required before):
    	    'EPSILON,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,isFinite,isInteger,isNaN,isSafeInteger,parseFloat,parseInt,' +
    	    // ESNext
    	    'fromString,range'
    	  ).split(','), j = 0, key; keys.length > j; j++) {
    	    if (hasOwn(NativeNumber, key = keys[j]) && !hasOwn(NumberWrapper, key)) {
    	      defineProperty(NumberWrapper, key, getOwnPropertyDescriptor(NativeNumber, key));
    	    }
    	  }
    	  NumberWrapper.prototype = NumberPrototype;
    	  NumberPrototype.constructor = NumberWrapper;
    	  redefine(global, NUMBER, NumberWrapper);
    	}


    	/***/ }),

    	/***/ "56c9":
    	/***/ (function(module, exports, __webpack_require__) {

    	var classof = __webpack_require__("5119");

    	// `IsArray` abstract operation
    	// https://tc39.es/ecma262/#sec-isarray
    	// eslint-disable-next-line es/no-array-isarray -- safe
    	module.exports = Array.isArray || function isArray(argument) {
    	  return classof(argument) == 'Array';
    	};


    	/***/ }),

    	/***/ "5780":
    	/***/ (function(module, exports, __webpack_require__) {

    	var global = __webpack_require__("4f87");
    	var shared = __webpack_require__("e002");
    	var hasOwn = __webpack_require__("2ea1");
    	var uid = __webpack_require__("da09");
    	var NATIVE_SYMBOL = __webpack_require__("3905");
    	var USE_SYMBOL_AS_UID = __webpack_require__("0181");

    	var WellKnownSymbolsStore = shared('wks');
    	var Symbol = global.Symbol;
    	var symbolFor = Symbol && Symbol['for'];
    	var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol : Symbol && Symbol.withoutSetter || uid;

    	module.exports = function (name) {
    	  if (!hasOwn(WellKnownSymbolsStore, name) || !(NATIVE_SYMBOL || typeof WellKnownSymbolsStore[name] == 'string')) {
    	    var description = 'Symbol.' + name;
    	    if (NATIVE_SYMBOL && hasOwn(Symbol, name)) {
    	      WellKnownSymbolsStore[name] = Symbol[name];
    	    } else if (USE_SYMBOL_AS_UID && symbolFor) {
    	      WellKnownSymbolsStore[name] = symbolFor(description);
    	    } else {
    	      WellKnownSymbolsStore[name] = createWellKnownSymbol(description);
    	    }
    	  } return WellKnownSymbolsStore[name];
    	};


    	/***/ }),

    	/***/ "5839":
    	/***/ (function(module, exports, __webpack_require__) {

    	var global = __webpack_require__("4f87");
    	var isCallable = __webpack_require__("3a9e");

    	var aFunction = function (argument) {
    	  return isCallable(argument) ? argument : undefined;
    	};

    	module.exports = function (namespace, method) {
    	  return arguments.length < 2 ? aFunction(global[namespace]) : global[namespace] && global[namespace][method];
    	};


    	/***/ }),

    	/***/ "5a86":
    	/***/ (function(module, exports, __webpack_require__) {

    	var fails = __webpack_require__("7aa9");
    	var isCallable = __webpack_require__("3a9e");

    	var replacement = /#|\.prototype\./;

    	var isForced = function (feature, detection) {
    	  var value = data[normalize(feature)];
    	  return value == POLYFILL ? true
    	    : value == NATIVE ? false
    	    : isCallable(detection) ? fails(detection)
    	    : !!detection;
    	};

    	var normalize = isForced.normalize = function (string) {
    	  return String(string).replace(replacement, '.').toLowerCase();
    	};

    	var data = isForced.data = {};
    	var NATIVE = isForced.NATIVE = 'N';
    	var POLYFILL = isForced.POLYFILL = 'P';

    	module.exports = isForced;


    	/***/ }),

    	/***/ "60ea":
    	/***/ (function(module, exports, __webpack_require__) {

    	// Imports
    	var ___CSS_LOADER_API_IMPORT___ = __webpack_require__("c86a");
    	exports = ___CSS_LOADER_API_IMPORT___(false);
    	// Module
    	exports.push([module.i, "@-webkit-keyframes dash-frame{to{stroke-dashoffset:0}}@keyframes dash-frame{to{stroke-dashoffset:0}}.knob-control__range{fill:none;transition:stroke .1s ease-in}.knob-control__value{-webkit-animation-name:dash-frame;animation-name:dash-frame;-webkit-animation-fill-mode:forwards;animation-fill-mode:forwards;fill:none}.knob-control__text-display{font-size:1.3rem;text-align:center}", ""]);
    	// Exports
    	module.exports = exports;


    	/***/ }),

    	/***/ "64a1":
    	/***/ (function(module, exports, __webpack_require__) {

    	var DESCRIPTORS = __webpack_require__("c2a7");
    	var fails = __webpack_require__("7aa9");
    	var createElement = __webpack_require__("8be9");

    	// Thanks to IE8 for its funny defineProperty
    	module.exports = !DESCRIPTORS && !fails(function () {
    	  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
    	  return Object.defineProperty(createElement('div'), 'a', {
    	    get: function () { return 7; }
    	  }).a != 7;
    	});


    	/***/ }),

    	/***/ "68bc":
    	/***/ (function(module, exports, __webpack_require__) {

    	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// addapted from the document.currentScript polyfill by Adam Miller
    	// MIT license
    	// source: https://github.com/amiller-gh/currentScript-polyfill

    	// added support for Firefox https://bugzilla.mozilla.org/show_bug.cgi?id=1620505

    	(function (root, factory) {
    	  {
    	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
    					__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
    					(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
    					__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    	  }
    	}(typeof self !== 'undefined' ? self : this, function () {
    	  function getCurrentScript () {
    	    var descriptor = Object.getOwnPropertyDescriptor(document, 'currentScript');
    	    // for chrome
    	    if (!descriptor && 'currentScript' in document && document.currentScript) {
    	      return document.currentScript
    	    }

    	    // for other browsers with native support for currentScript
    	    if (descriptor && descriptor.get !== getCurrentScript && document.currentScript) {
    	      return document.currentScript
    	    }
    	  
    	    // IE 8-10 support script readyState
    	    // IE 11+ & Firefox support stack trace
    	    try {
    	      throw new Error();
    	    }
    	    catch (err) {
    	      // Find the second match for the "at" string to get file src url from stack.
    	      var ieStackRegExp = /.*at [^(]*\((.*):(.+):(.+)\)$/ig,
    	        ffStackRegExp = /@([^@]*):(\d+):(\d+)\s*$/ig,
    	        stackDetails = ieStackRegExp.exec(err.stack) || ffStackRegExp.exec(err.stack),
    	        scriptLocation = (stackDetails && stackDetails[1]) || false,
    	        line = (stackDetails && stackDetails[2]) || false,
    	        currentLocation = document.location.href.replace(document.location.hash, ''),
    	        pageSource,
    	        inlineScriptSourceRegExp,
    	        inlineScriptSource,
    	        scripts = document.getElementsByTagName('script'); // Live NodeList collection
    	  
    	      if (scriptLocation === currentLocation) {
    	        pageSource = document.documentElement.outerHTML;
    	        inlineScriptSourceRegExp = new RegExp('(?:[^\\n]+?\\n){0,' + (line - 2) + '}[^<]*<script>([\\d\\D]*?)<\\/script>[\\d\\D]*', 'i');
    	        inlineScriptSource = pageSource.replace(inlineScriptSourceRegExp, '$1').trim();
    	      }
    	  
    	      for (var i = 0; i < scripts.length; i++) {
    	        // If ready state is interactive, return the script tag
    	        if (scripts[i].readyState === 'interactive') {
    	          return scripts[i];
    	        }
    	  
    	        // If src matches, return the script tag
    	        if (scripts[i].src === scriptLocation) {
    	          return scripts[i];
    	        }
    	  
    	        // If inline source matches, return the script tag
    	        if (
    	          scriptLocation === currentLocation &&
    	          scripts[i].innerHTML &&
    	          scripts[i].innerHTML.trim() === inlineScriptSource
    	        ) {
    	          return scripts[i];
    	        }
    	      }
    	  
    	      // If no match, return null
    	      return null;
    	    }
    	  }
    	  return getCurrentScript
    	}));


    	/***/ }),

    	/***/ "6c78":
    	/***/ (function(module, exports, __webpack_require__) {

    	var global = __webpack_require__("4f87");

    	var String = global.String;

    	module.exports = function (argument) {
    	  try {
    	    return String(argument);
    	  } catch (error) {
    	    return 'Object';
    	  }
    	};


    	/***/ }),

    	/***/ "6ed0":
    	/***/ (function(module, exports, __webpack_require__) {

    	var global = __webpack_require__("4f87");
    	var call = __webpack_require__("85d7");
    	var isObject = __webpack_require__("5428");
    	var isSymbol = __webpack_require__("9d9b");
    	var getMethod = __webpack_require__("eef7");
    	var ordinaryToPrimitive = __webpack_require__("1f42");
    	var wellKnownSymbol = __webpack_require__("5780");

    	var TypeError = global.TypeError;
    	var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');

    	// `ToPrimitive` abstract operation
    	// https://tc39.es/ecma262/#sec-toprimitive
    	module.exports = function (input, pref) {
    	  if (!isObject(input) || isSymbol(input)) return input;
    	  var exoticToPrim = getMethod(input, TO_PRIMITIVE);
    	  var result;
    	  if (exoticToPrim) {
    	    if (pref === undefined) pref = 'default';
    	    result = call(exoticToPrim, input, pref);
    	    if (!isObject(result) || isSymbol(result)) return result;
    	    throw TypeError("Can't convert object to primitive value");
    	  }
    	  if (pref === undefined) pref = 'number';
    	  return ordinaryToPrimitive(input, pref);
    	};


    	/***/ }),

    	/***/ "708c":
    	/***/ (function(module, exports) {

    	// a string of all valid unicode whitespaces
    	module.exports = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002' +
    	  '\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';


    	/***/ }),

    	/***/ "70ae":
    	/***/ (function(module, exports, __webpack_require__) {

    	var DESCRIPTORS = __webpack_require__("c2a7");
    	var definePropertyModule = __webpack_require__("4201");
    	var createPropertyDescriptor = __webpack_require__("38bb");

    	module.exports = DESCRIPTORS ? function (object, key, value) {
    	  return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
    	} : function (object, key, value) {
    	  object[key] = value;
    	  return object;
    	};


    	/***/ }),

    	/***/ "7aa9":
    	/***/ (function(module, exports) {

    	module.exports = function (exec) {
    	  try {
    	    return !!exec();
    	  } catch (error) {
    	    return true;
    	  }
    	};


    	/***/ }),

    	/***/ "7e84":
    	/***/ (function(module, exports, __webpack_require__) {

    	var global = __webpack_require__("4f87");

    	// eslint-disable-next-line es/no-object-defineproperty -- safe
    	var defineProperty = Object.defineProperty;

    	module.exports = function (key, value) {
    	  try {
    	    defineProperty(global, key, { value: value, configurable: true, writable: true });
    	  } catch (error) {
    	    global[key] = value;
    	  } return value;
    	};


    	/***/ }),

    	/***/ "7f2e":
    	/***/ (function(module, exports, __webpack_require__) {

    	var global = __webpack_require__("4f87");
    	var requireObjectCoercible = __webpack_require__("2b4c");

    	var Object = global.Object;

    	// `ToObject` abstract operation
    	// https://tc39.es/ecma262/#sec-toobject
    	module.exports = function (argument) {
    	  return Object(requireObjectCoercible(argument));
    	};


    	/***/ }),

    	/***/ "7f51":
    	/***/ (function(module, exports, __webpack_require__) {

    	var DESCRIPTORS = __webpack_require__("c2a7");
    	var call = __webpack_require__("85d7");
    	var propertyIsEnumerableModule = __webpack_require__("2675");
    	var createPropertyDescriptor = __webpack_require__("38bb");
    	var toIndexedObject = __webpack_require__("e6b6");
    	var toPropertyKey = __webpack_require__("b28f");
    	var hasOwn = __webpack_require__("2ea1");
    	var IE8_DOM_DEFINE = __webpack_require__("64a1");

    	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
    	var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

    	// `Object.getOwnPropertyDescriptor` method
    	// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
    	exports.f = DESCRIPTORS ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
    	  O = toIndexedObject(O);
    	  P = toPropertyKey(P);
    	  if (IE8_DOM_DEFINE) try {
    	    return $getOwnPropertyDescriptor(O, P);
    	  } catch (error) { /* empty */ }
    	  if (hasOwn(O, P)) return createPropertyDescriptor(!call(propertyIsEnumerableModule.f, O, P), O[P]);
    	};


    	/***/ }),

    	/***/ "825d":
    	/***/ (function(module, exports, __webpack_require__) {

    	var NATIVE_WEAK_MAP = __webpack_require__("30a0");
    	var global = __webpack_require__("4f87");
    	var uncurryThis = __webpack_require__("52fe");
    	var isObject = __webpack_require__("5428");
    	var createNonEnumerableProperty = __webpack_require__("70ae");
    	var hasOwn = __webpack_require__("2ea1");
    	var shared = __webpack_require__("d341");
    	var sharedKey = __webpack_require__("d15c");
    	var hiddenKeys = __webpack_require__("c00d");

    	var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
    	var TypeError = global.TypeError;
    	var WeakMap = global.WeakMap;
    	var set, get, has;

    	var enforce = function (it) {
    	  return has(it) ? get(it) : set(it, {});
    	};

    	var getterFor = function (TYPE) {
    	  return function (it) {
    	    var state;
    	    if (!isObject(it) || (state = get(it)).type !== TYPE) {
    	      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
    	    } return state;
    	  };
    	};

    	if (NATIVE_WEAK_MAP || shared.state) {
    	  var store = shared.state || (shared.state = new WeakMap());
    	  var wmget = uncurryThis(store.get);
    	  var wmhas = uncurryThis(store.has);
    	  var wmset = uncurryThis(store.set);
    	  set = function (it, metadata) {
    	    if (wmhas(store, it)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    	    metadata.facade = it;
    	    wmset(store, it, metadata);
    	    return metadata;
    	  };
    	  get = function (it) {
    	    return wmget(store, it) || {};
    	  };
    	  has = function (it) {
    	    return wmhas(store, it);
    	  };
    	} else {
    	  var STATE = sharedKey('state');
    	  hiddenKeys[STATE] = true;
    	  set = function (it, metadata) {
    	    if (hasOwn(it, STATE)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    	    metadata.facade = it;
    	    createNonEnumerableProperty(it, STATE, metadata);
    	    return metadata;
    	  };
    	  get = function (it) {
    	    return hasOwn(it, STATE) ? it[STATE] : {};
    	  };
    	  has = function (it) {
    	    return hasOwn(it, STATE);
    	  };
    	}

    	module.exports = {
    	  set: set,
    	  get: get,
    	  has: has,
    	  enforce: enforce,
    	  getterFor: getterFor
    	};


    	/***/ }),

    	/***/ "84ef":
    	/***/ (function(module, exports, __webpack_require__) {

    	var global = __webpack_require__("4f87");
    	var TO_STRING_TAG_SUPPORT = __webpack_require__("dd7f");
    	var isCallable = __webpack_require__("3a9e");
    	var classofRaw = __webpack_require__("5119");
    	var wellKnownSymbol = __webpack_require__("5780");

    	var TO_STRING_TAG = wellKnownSymbol('toStringTag');
    	var Object = global.Object;

    	// ES3 wrong here
    	var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

    	// fallback for IE11 Script Access Denied error
    	var tryGet = function (it, key) {
    	  try {
    	    return it[key];
    	  } catch (error) { /* empty */ }
    	};

    	// getting tag from ES6+ `Object.prototype.toString`
    	module.exports = TO_STRING_TAG_SUPPORT ? classofRaw : function (it) {
    	  var O, tag, result;
    	  return it === undefined ? 'Undefined' : it === null ? 'Null'
    	    // @@toStringTag case
    	    : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG)) == 'string' ? tag
    	    // builtinTag case
    	    : CORRECT_ARGUMENTS ? classofRaw(O)
    	    // ES3 arguments fallback
    	    : (result = classofRaw(O)) == 'Object' && isCallable(O.callee) ? 'Arguments' : result;
    	};


    	/***/ }),

    	/***/ "85d7":
    	/***/ (function(module, exports, __webpack_require__) {

    	var NATIVE_BIND = __webpack_require__("fc3e");

    	var call = Function.prototype.call;

    	module.exports = NATIVE_BIND ? call.bind(call) : function () {
    	  return call.apply(call, arguments);
    	};


    	/***/ }),

    	/***/ "8824":
    	/***/ (function(module, exports, __webpack_require__) {

    	var global = __webpack_require__("4f87");
    	var classof = __webpack_require__("84ef");

    	var String = global.String;

    	module.exports = function (argument) {
    	  if (classof(argument) === 'Symbol') throw TypeError('Cannot convert a Symbol value to a string');
    	  return String(argument);
    	};


    	/***/ }),

    	/***/ "8be9":
    	/***/ (function(module, exports, __webpack_require__) {

    	var global = __webpack_require__("4f87");
    	var isObject = __webpack_require__("5428");

    	var document = global.document;
    	// typeof document.createElement is 'object' in old IE
    	var EXISTS = isObject(document) && isObject(document.createElement);

    	module.exports = function (it) {
    	  return EXISTS ? document.createElement(it) : {};
    	};


    	/***/ }),

    	/***/ "8e3b":
    	/***/ (function(module, exports, __webpack_require__) {

    	var DESCRIPTORS = __webpack_require__("c2a7");
    	var hasOwn = __webpack_require__("2ea1");

    	var FunctionPrototype = Function.prototype;
    	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
    	var getDescriptor = DESCRIPTORS && Object.getOwnPropertyDescriptor;

    	var EXISTS = hasOwn(FunctionPrototype, 'name');
    	// additional protection from minified / mangled / dropped function names
    	var PROPER = EXISTS && (function something() { /* empty */ }).name === 'something';
    	var CONFIGURABLE = EXISTS && (!DESCRIPTORS || (DESCRIPTORS && getDescriptor(FunctionPrototype, 'name').configurable));

    	module.exports = {
    	  EXISTS: EXISTS,
    	  PROPER: PROPER,
    	  CONFIGURABLE: CONFIGURABLE
    	};


    	/***/ }),

    	/***/ "9182":
    	/***/ (function(module, exports, __webpack_require__) {

    	var global = __webpack_require__("4f87");
    	var isCallable = __webpack_require__("3a9e");
    	var hasOwn = __webpack_require__("2ea1");
    	var createNonEnumerableProperty = __webpack_require__("70ae");
    	var setGlobal = __webpack_require__("7e84");
    	var inspectSource = __webpack_require__("bba4");
    	var InternalStateModule = __webpack_require__("825d");
    	var CONFIGURABLE_FUNCTION_NAME = __webpack_require__("8e3b").CONFIGURABLE;

    	var getInternalState = InternalStateModule.get;
    	var enforceInternalState = InternalStateModule.enforce;
    	var TEMPLATE = String(String).split('String');

    	(module.exports = function (O, key, value, options) {
    	  var unsafe = options ? !!options.unsafe : false;
    	  var simple = options ? !!options.enumerable : false;
    	  var noTargetGet = options ? !!options.noTargetGet : false;
    	  var name = options && options.name !== undefined ? options.name : key;
    	  var state;
    	  if (isCallable(value)) {
    	    if (String(name).slice(0, 7) === 'Symbol(') {
    	      name = '[' + String(name).replace(/^Symbol\(([^)]*)\)/, '$1') + ']';
    	    }
    	    if (!hasOwn(value, 'name') || (CONFIGURABLE_FUNCTION_NAME && value.name !== name)) {
    	      createNonEnumerableProperty(value, 'name', name);
    	    }
    	    state = enforceInternalState(value);
    	    if (!state.source) {
    	      state.source = TEMPLATE.join(typeof name == 'string' ? name : '');
    	    }
    	  }
    	  if (O === global) {
    	    if (simple) O[key] = value;
    	    else setGlobal(key, value);
    	    return;
    	  } else if (!unsafe) {
    	    delete O[key];
    	  } else if (!noTargetGet && O[key]) {
    	    simple = true;
    	  }
    	  if (simple) O[key] = value;
    	  else createNonEnumerableProperty(O, key, value);
    	// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
    	})(Function.prototype, 'toString', function toString() {
    	  return isCallable(this) && getInternalState(this).source || inspectSource(this);
    	});


    	/***/ }),

    	/***/ "959d":
    	/***/ (function(module, exports, __webpack_require__) {

    	var internalObjectKeys = __webpack_require__("11c1");
    	var enumBugKeys = __webpack_require__("367c");

    	var hiddenKeys = enumBugKeys.concat('length', 'prototype');

    	// `Object.getOwnPropertyNames` method
    	// https://tc39.es/ecma262/#sec-object.getownpropertynames
    	// eslint-disable-next-line es/no-object-getownpropertynames -- safe
    	exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
    	  return internalObjectKeys(O, hiddenKeys);
    	};


    	/***/ }),

    	/***/ "9844":
    	/***/ (function(module, exports, __webpack_require__) {

    	var global = __webpack_require__("4f87");
    	var isArray = __webpack_require__("56c9");
    	var isConstructor = __webpack_require__("24b5");
    	var isObject = __webpack_require__("5428");
    	var wellKnownSymbol = __webpack_require__("5780");

    	var SPECIES = wellKnownSymbol('species');
    	var Array = global.Array;

    	// a part of `ArraySpeciesCreate` abstract operation
    	// https://tc39.es/ecma262/#sec-arrayspeciescreate
    	module.exports = function (originalArray) {
    	  var C;
    	  if (isArray(originalArray)) {
    	    C = originalArray.constructor;
    	    // cross-realm fallback
    	    if (isConstructor(C) && (C === Array || isArray(C.prototype))) C = undefined;
    	    else if (isObject(C)) {
    	      C = C[SPECIES];
    	      if (C === null) C = undefined;
    	    }
    	  } return C === undefined ? Array : C;
    	};


    	/***/ }),

    	/***/ "9be4":
    	/***/ (function(module, __webpack_exports__, __webpack_require__) {
    	// ESM COMPAT FLAG
    	__webpack_require__.r(__webpack_exports__);

    	// CONCATENATED MODULE: /usr/local/lib/node_modules/@vue/cli-service-global/node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
    	// This file is imported into lib/wc client bundles.

    	if (typeof window !== 'undefined') {
    	  var currentScript = window.document.currentScript;
    	  {
    	    var getCurrentScript = __webpack_require__("68bc");
    	    currentScript = getCurrentScript();

    	    // for backward compatibility, because previously we directly included the polyfill
    	    if (!('currentScript' in document)) {
    	      Object.defineProperty(document, 'currentScript', { get: getCurrentScript });
    	    }
    	  }

    	  var src = currentScript && currentScript.src.match(/(.+\/)[^/]+\.js(\?.*)?$/);
    	  if (src) {
    	    __webpack_require__.p = src[1]; // eslint-disable-line
    	  }
    	}

    	// CONCATENATED MODULE: /usr/local/lib/node_modules/@vue/cli-service-global/node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"47358f68-vue-loader-template"}!/usr/local/lib/node_modules/@vue/cli-service-global/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!/usr/local/lib/node_modules/@vue/cli-service-global/node_modules/cache-loader/dist/cjs.js??ref--1-0!/usr/local/lib/node_modules/@vue/cli-service-global/node_modules/vue-loader/lib??vue-loader-options!./src/KnobControl.vue?vue&type=template&id=2963bfdb&
    	var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"knob-control",style:(_vm.style)},[_c('svg',{attrs:{"width":_vm.computedSize,"height":_vm.computedSize,"viewBox":"0 0 100 100"},on:{"click":_vm.onClick,"mousedown":_vm.onMouseDown,"mouseup":_vm.onMouseUp,"touchstart":_vm.onTouchStart,"touchend":_vm.onTouchEnd}},[_c('path',{staticClass:"knob-control__range",attrs:{"d":_vm.rangePath,"stroke-width":_vm.strokeWidth,"stroke":_vm.secondaryColor}}),(_vm.showValue)?_c('path',{ref:"path-value",staticClass:"knob-control__value",style:(_vm.dashStyle),attrs:{"d":_vm.valuePath,"stroke-width":_vm.strokeWidth,"stroke":_vm.primaryColor,"data-dash":_vm.length}}):_vm._e(),(_vm.showValue)?_c('text',{staticClass:"knob-control__text-display",attrs:{"x":50,"y":57,"text-anchor":"middle","fill":_vm.textColor}},[_vm._v(" "+_vm._s(_vm.valueDisplay)+" ")]):_vm._e()])])};
    	var staticRenderFns = [];


    	// CONCATENATED MODULE: ./src/KnobControl.vue?vue&type=template&id=2963bfdb&

    	// EXTERNAL MODULE: /usr/local/lib/node_modules/@vue/cli-service-global/node_modules/core-js/modules/es.number.constructor.js
    	__webpack_require__("5663");

    	// EXTERNAL MODULE: /usr/local/lib/node_modules/@vue/cli-service-global/node_modules/core-js/modules/es.array.concat.js
    	__webpack_require__("9efc");

    	// EXTERNAL MODULE: /usr/local/lib/node_modules/@vue/cli-service-global/node_modules/core-js/modules/web.timers.js
    	__webpack_require__("bff9");

    	// CONCATENATED MODULE: /usr/local/lib/node_modules/@vue/cli-service-global/node_modules/thread-loader/dist/cjs.js!/usr/local/lib/node_modules/@vue/cli-service-global/node_modules/babel-loader/lib??ref--13-1!/usr/local/lib/node_modules/@vue/cli-service-global/node_modules/cache-loader/dist/cjs.js??ref--1-0!/usr/local/lib/node_modules/@vue/cli-service-global/node_modules/vue-loader/lib??vue-loader-options!./src/KnobControl.vue?vue&type=script&lang=js&



    	//
    	//
    	//
    	//
    	//
    	//
    	//
    	//
    	//
    	//
    	//
    	//
    	//
    	//
    	//
    	//
    	//
    	//
    	//
    	//
    	//
    	//
    	//
    	//
    	//
    	//
    	//
    	//
    	//
    	//
    	//
    	//
    	//
    	//
    	//
    	//
    	//
    	var RADIUS = 40;
    	var MID_X = 50;
    	var MID_Y = 50;
    	var MIN_RADIANS = 4 * Math.PI / 3;
    	var MAX_RADIANS = -Math.PI / 3; // map a value (x) from one range (in min/max) onto another (out min/max)

    	var mapRange = function mapRange(x, inMin, inMax, outMin, outMax) {
    	  return (x - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
    	};

    	/* harmony default export */ var KnobControlvue_type_script_lang_js_ = ({
    	  data: function data() {
    	    return {
    	      length: 0,
    	      animatedValue: 0,
    	      interval: null
    	    };
    	  },
    	  props: {
    	    'animation': {
    	      type: Object,
    	      "default": function _default() {
    	        return {
    	          animated: false,
    	          animateValue: false,
    	          animationDuration: 2000,
    	          animationFunction: 'ease-in-out'
    	        };
    	      }
    	    },
    	    'value': {
    	      type: Number,
    	      required: true
    	    },
    	    'max': {
    	      type: Number,
    	      "default": 100
    	    },
    	    'min': {
    	      type: Number,
    	      "default": 0
    	    },
    	    'stepSize': {
    	      type: Number,
    	      "default": 1
    	    },
    	    'disabled': {
    	      type: Boolean,
    	      "default": false
    	    },
    	    'readonly': {
    	      type: Boolean,
    	      "default": false
    	    },
    	    'size': {
    	      type: Number,
    	      "default": 100
    	    },
    	    'responsive': {
    	      type: Boolean,
    	      "default": false
    	    },
    	    'primaryColor': {
    	      type: String,
    	      "default": '#409eff'
    	    },
    	    'secondaryColor': {
    	      type: String,
    	      "default": '#dcdfe6'
    	    },
    	    'textColor': {
    	      type: String,
    	      "default": '#000000'
    	    },
    	    'strokeWidth': {
    	      type: Number,
    	      "default": 17
    	    },
    	    'valueDisplayFunction': {
    	      type: Function,
    	      "default": function _default(v) {
    	        return v;
    	      }
    	    }
    	  },
    	  computed: {
    	    dashStyle: function dashStyle() {
    	      return {
    	        strokeDasharray: this.length,
    	        strokeDashoffset: this.length
    	      };
    	    },
    	    style: function style() {
    	      return {
    	        height: this.responsive ? this.size + '%' : this.size - 5 + 'px'
    	      };
    	    },
    	    computedSize: function computedSize() {
    	      return this.responsive ? this.size + '%' : this.size;
    	    },
    	    rangePath: function rangePath() {
    	      return "M ".concat(this.minX, " ").concat(this.minY, " A ").concat(RADIUS, " ").concat(RADIUS, " 0 1 1 ").concat(this.maxX, " ").concat(this.maxY);
    	    },
    	    valuePath: function valuePath() {
    	      return "M ".concat(this.zeroX, " ").concat(this.zeroY, " A ").concat(RADIUS, " ").concat(RADIUS, " 0 ").concat(this.largeArc, " ").concat(this.sweep, " ").concat(this.valueX, " ").concat(this.valueY);
    	    },
    	    showValue: function showValue() {
    	      return this.value >= this.min && this.value <= this.max && !this.disabled;
    	    },
    	    zeroRadians: function zeroRadians() {
    	      /* this weird little bit of logic below is to handle the fact that usually we
    	          want the value arc to start drawing from the 'zero' point, but, in the case
    	          that the minimum and maximum values are both above zero, we set the 'zero point'
    	          at the supplied minimum, so the value arc renders as the user would expect */
    	      if (this.min > 0 && this.max > 0) return mapRange(this.min, this.min, this.max, MIN_RADIANS, MAX_RADIANS);else return mapRange(0, this.min, this.max, MIN_RADIANS, MAX_RADIANS);
    	    },
    	    valueRadians: function valueRadians() {
    	      return mapRange(this.value, this.min, this.max, MIN_RADIANS, MAX_RADIANS);
    	    },
    	    minX: function minX() {
    	      return MID_X + Math.cos(MIN_RADIANS) * RADIUS;
    	    },
    	    minY: function minY() {
    	      return MID_Y - Math.sin(MIN_RADIANS) * RADIUS;
    	    },
    	    maxX: function maxX() {
    	      return MID_X + Math.cos(MAX_RADIANS) * RADIUS;
    	    },
    	    maxY: function maxY() {
    	      return MID_Y - Math.sin(MAX_RADIANS) * RADIUS;
    	    },
    	    zeroX: function zeroX() {
    	      return MID_X + Math.cos(this.zeroRadians) * RADIUS;
    	    },
    	    zeroY: function zeroY() {
    	      return MID_Y - Math.sin(this.zeroRadians) * RADIUS;
    	    },
    	    valueX: function valueX() {
    	      return MID_X + Math.cos(this.valueRadians) * RADIUS;
    	    },
    	    valueY: function valueY() {
    	      return MID_Y - Math.sin(this.valueRadians) * RADIUS;
    	    },
    	    largeArc: function largeArc() {
    	      return Math.abs(this.zeroRadians - this.valueRadians) < Math.PI ? 0 : 1;
    	    },
    	    sweep: function sweep() {
    	      return this.valueRadians > this.zeroRadians ? 0 : 1;
    	    },
    	    valueDisplay: function valueDisplay() {
    	      if (this.animation.animateValue) {
    	        return this.valueDisplayFunction(this.animatedValue);
    	      } else {
    	        return this.valueDisplayFunction(this.value);
    	      }
    	    }
    	  },
    	  methods: {
    	    updatePosition: function updatePosition(offsetX, offsetY) {
    	      var dx = offsetX - this.size / 2;
    	      var dy = this.size / 2 - offsetY;
    	      var angle = Math.atan2(dy, dx);
    	      var v;
    	      /* bit of weird looking logic to map the angles returned by Math.atan2() onto
    	          our own unconventional coordinate system */

    	      var start = -Math.PI / 2 - Math.PI / 6;

    	      if (angle > MAX_RADIANS) {
    	        v = mapRange(angle, MIN_RADIANS, MAX_RADIANS, this.min, this.max);
    	      } else if (angle < start) {
    	        v = mapRange(angle + 2 * Math.PI, MIN_RADIANS, MAX_RADIANS, this.min, this.max);
    	      } else {
    	        return;
    	      }

    	      this.$emit('input', Math.round((v - this.min) / this.stepSize) * this.stepSize + this.min);
    	    },
    	    onClick: function onClick(e) {
    	      if (!this.disabled && !this.readonly) {
    	        this.updatePosition(e.offsetX, e.offsetY);
    	      }
    	    },
    	    onMouseDown: function onMouseDown(e) {
    	      if (!this.disabled && !this.readonly) {
    	        e.preventDefault();
    	        window.addEventListener('mousemove', this.onMouseMove);
    	        window.addEventListener('mouseup', this.onMouseUp);
    	      }
    	    },
    	    onMouseUp: function onMouseUp(e) {
    	      if (!this.disabled && !this.readonly) {
    	        e.preventDefault();
    	        window.removeEventListener('mousemove', this.onMouseMove);
    	        window.removeEventListener('mouseup', this.onMouseUp);
    	      }
    	    },
    	    onTouchStart: function onTouchStart(e) {
    	      if (!this.disabled && !this.readonly) {
    	        e.preventDefault();
    	        window.addEventListener('touchmove', this.onTouchMove);
    	        window.addEventListener('touchend', this.onTouchEnd);
    	      }
    	    },
    	    onTouchEnd: function onTouchEnd(e) {
    	      if (!this.disabled && !this.readonly) {
    	        e.preventDefault();
    	        window.removeEventListener('touchmove', this.onTouchMove);
    	        window.removeEventListener('touchend', this.onTouchEnd);
    	      }
    	    },
    	    onMouseMove: function onMouseMove(e) {
    	      if (!this.disabled && !this.readonly) {
    	        e.preventDefault();
    	        this.updatePosition(e.offsetX, e.offsetY);
    	      }
    	    },
    	    onTouchMove: function onTouchMove(e) {
    	      if (!this.disabled && this.readonly && e.touches.length == 1) {
    	        var boundingClientRect = this.$el.getBoundingClientRect();
    	        var touch = e.targetTouches.item(0);
    	        var offsetX = touch.clientX - boundingClientRect.left;
    	        var offsetY = touch.clientY - boundingClientRect.top;
    	        this.updatePosition(offsetX, offsetY);
    	      }
    	    },
    	    dashLength: function dashLength() {
    	      var element = this.$refs['path-value'];
    	      var length = element.getTotalLength();

    	      if (this.animation.animated) {
    	        element.style.animationDuration = this.animation.animationDuration / 1000 + 's';
    	        element.style.animationFunction = this.animation.animationFunction;
    	      }

    	      element.dataset.dash = length;
    	      this.length = length;
    	    }
    	  },
    	  mounted: function mounted() {
    	    var _this = this;

    	    this.dashLength(); // the element should be in the DOM

    	    clearInterval(this.interval);
    	    this.interval = null;

    	    if (this.animation.animateValue) {
    	      this.interval = setInterval(function () {
    	        if (_this.animatedValue < _this.value) {
    	          _this.animatedValue += 1;
    	        } else {
    	          clearInterval(_this.interval);
    	          _this.interval = null;
    	        }
    	      }, this.animation.animationDuration * 1000 / this.value / 1000);
    	    }
    	  }
    	});
    	// CONCATENATED MODULE: ./src/KnobControl.vue?vue&type=script&lang=js&
    	 /* harmony default export */ var src_KnobControlvue_type_script_lang_js_ = (KnobControlvue_type_script_lang_js_); 
    	// EXTERNAL MODULE: ./src/KnobControl.vue?vue&type=style&index=0&lang=css&
    	__webpack_require__("5568");

    	// CONCATENATED MODULE: /usr/local/lib/node_modules/@vue/cli-service-global/node_modules/vue-loader/lib/runtime/componentNormalizer.js
    	/* globals __VUE_SSR_CONTEXT__ */

    	// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
    	// This module is a runtime utility for cleaner component module output and will
    	// be included in the final webpack user bundle.

    	function normalizeComponent (
    	  scriptExports,
    	  render,
    	  staticRenderFns,
    	  functionalTemplate,
    	  injectStyles,
    	  scopeId,
    	  moduleIdentifier, /* server only */
    	  shadowMode /* vue-cli only */
    	) {
    	  // Vue.extend constructor export interop
    	  var options = typeof scriptExports === 'function'
    	    ? scriptExports.options
    	    : scriptExports;

    	  // render functions
    	  if (render) {
    	    options.render = render;
    	    options.staticRenderFns = staticRenderFns;
    	    options._compiled = true;
    	  }

    	  // functional template
    	  if (functionalTemplate) {
    	    options.functional = true;
    	  }

    	  // scopedId
    	  if (scopeId) {
    	    options._scopeId = 'data-v-' + scopeId;
    	  }

    	  var hook;
    	  if (moduleIdentifier) { // server build
    	    hook = function (context) {
    	      // 2.3 injection
    	      context =
    	        context || // cached call
    	        (this.$vnode && this.$vnode.ssrContext) || // stateful
    	        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
    	      // 2.2 with runInNewContext: true
    	      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
    	        context = __VUE_SSR_CONTEXT__;
    	      }
    	      // inject component styles
    	      if (injectStyles) {
    	        injectStyles.call(this, context);
    	      }
    	      // register component module identifier for async chunk inferrence
    	      if (context && context._registeredComponents) {
    	        context._registeredComponents.add(moduleIdentifier);
    	      }
    	    };
    	    // used by ssr in case component is cached and beforeCreate
    	    // never gets called
    	    options._ssrRegister = hook;
    	  } else if (injectStyles) {
    	    hook = shadowMode
    	      ? function () {
    	        injectStyles.call(
    	          this,
    	          (options.functional ? this.parent : this).$root.$options.shadowRoot
    	        );
    	      }
    	      : injectStyles;
    	  }

    	  if (hook) {
    	    if (options.functional) {
    	      // for template-only hot-reload because in that case the render fn doesn't
    	      // go through the normalizer
    	      options._injectStyles = hook;
    	      // register for functional component in vue file
    	      var originalRender = options.render;
    	      options.render = function renderWithStyleInjection (h, context) {
    	        hook.call(context);
    	        return originalRender(h, context)
    	      };
    	    } else {
    	      // inject component registration as beforeCreate hook
    	      var existing = options.beforeCreate;
    	      options.beforeCreate = existing
    	        ? [].concat(existing, hook)
    	        : [hook];
    	    }
    	  }

    	  return {
    	    exports: scriptExports,
    	    options: options
    	  }
    	}

    	// CONCATENATED MODULE: ./src/KnobControl.vue






    	/* normalize component */

    	var component = normalizeComponent(
    	  src_KnobControlvue_type_script_lang_js_,
    	  render,
    	  staticRenderFns,
    	  false,
    	  null,
    	  null,
    	  null
    	  
    	);

    	/* harmony default export */ var KnobControl = (component.exports);
    	// CONCATENATED MODULE: /usr/local/lib/node_modules/@vue/cli-service-global/node_modules/@vue/cli-service/lib/commands/build/entry-lib.js


    	/* harmony default export */ __webpack_exports__["default"] = (KnobControl);



    	/***/ }),

    	/***/ "9d9b":
    	/***/ (function(module, exports, __webpack_require__) {

    	var global = __webpack_require__("4f87");
    	var getBuiltIn = __webpack_require__("5839");
    	var isCallable = __webpack_require__("3a9e");
    	var isPrototypeOf = __webpack_require__("355f");
    	var USE_SYMBOL_AS_UID = __webpack_require__("0181");

    	var Object = global.Object;

    	module.exports = USE_SYMBOL_AS_UID ? function (it) {
    	  return typeof it == 'symbol';
    	} : function (it) {
    	  var $Symbol = getBuiltIn('Symbol');
    	  return isCallable($Symbol) && isPrototypeOf($Symbol.prototype, Object(it));
    	};


    	/***/ }),

    	/***/ "9efc":
    	/***/ (function(module, exports, __webpack_require__) {

    	var $ = __webpack_require__("d61b");
    	var global = __webpack_require__("4f87");
    	var fails = __webpack_require__("7aa9");
    	var isArray = __webpack_require__("56c9");
    	var isObject = __webpack_require__("5428");
    	var toObject = __webpack_require__("7f2e");
    	var lengthOfArrayLike = __webpack_require__("aa15");
    	var createProperty = __webpack_require__("e6da");
    	var arraySpeciesCreate = __webpack_require__("3dbd");
    	var arrayMethodHasSpeciesSupport = __webpack_require__("ccf6");
    	var wellKnownSymbol = __webpack_require__("5780");
    	var V8_VERSION = __webpack_require__("d88e");

    	var IS_CONCAT_SPREADABLE = wellKnownSymbol('isConcatSpreadable');
    	var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
    	var MAXIMUM_ALLOWED_INDEX_EXCEEDED = 'Maximum allowed index exceeded';
    	var TypeError = global.TypeError;

    	// We can't use this feature detection in V8 since it causes
    	// deoptimization and serious performance degradation
    	// https://github.com/zloirock/core-js/issues/679
    	var IS_CONCAT_SPREADABLE_SUPPORT = V8_VERSION >= 51 || !fails(function () {
    	  var array = [];
    	  array[IS_CONCAT_SPREADABLE] = false;
    	  return array.concat()[0] !== array;
    	});

    	var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('concat');

    	var isConcatSpreadable = function (O) {
    	  if (!isObject(O)) return false;
    	  var spreadable = O[IS_CONCAT_SPREADABLE];
    	  return spreadable !== undefined ? !!spreadable : isArray(O);
    	};

    	var FORCED = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT;

    	// `Array.prototype.concat` method
    	// https://tc39.es/ecma262/#sec-array.prototype.concat
    	// with adding support of @@isConcatSpreadable and @@species
    	$({ target: 'Array', proto: true, forced: FORCED }, {
    	  // eslint-disable-next-line no-unused-vars -- required for `.length`
    	  concat: function concat(arg) {
    	    var O = toObject(this);
    	    var A = arraySpeciesCreate(O, 0);
    	    var n = 0;
    	    var i, k, length, len, E;
    	    for (i = -1, length = arguments.length; i < length; i++) {
    	      E = i === -1 ? O : arguments[i];
    	      if (isConcatSpreadable(E)) {
    	        len = lengthOfArrayLike(E);
    	        if (n + len > MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
    	        for (k = 0; k < len; k++, n++) if (k in E) createProperty(A, n, E[k]);
    	      } else {
    	        if (n >= MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
    	        createProperty(A, n++, E);
    	      }
    	    }
    	    A.length = n;
    	    return A;
    	  }
    	});


    	/***/ }),

    	/***/ "a373":
    	/***/ (function(module, __webpack_exports__, __webpack_require__) {
    	// ESM COMPAT FLAG
    	__webpack_require__.r(__webpack_exports__);

    	// EXPORTS
    	__webpack_require__.d(__webpack_exports__, "default", function() { return /* binding */ addStylesClient; });

    	// CONCATENATED MODULE: /usr/local/lib/node_modules/@vue/cli-service-global/node_modules/vue-style-loader/lib/listToStyles.js
    	/**
    	 * Translates the list format produced by css-loader into something
    	 * easier to manipulate.
    	 */
    	function listToStyles (parentId, list) {
    	  var styles = [];
    	  var newStyles = {};
    	  for (var i = 0; i < list.length; i++) {
    	    var item = list[i];
    	    var id = item[0];
    	    var css = item[1];
    	    var media = item[2];
    	    var sourceMap = item[3];
    	    var part = {
    	      id: parentId + ':' + i,
    	      css: css,
    	      media: media,
    	      sourceMap: sourceMap
    	    };
    	    if (!newStyles[id]) {
    	      styles.push(newStyles[id] = { id: id, parts: [part] });
    	    } else {
    	      newStyles[id].parts.push(part);
    	    }
    	  }
    	  return styles
    	}

    	// CONCATENATED MODULE: /usr/local/lib/node_modules/@vue/cli-service-global/node_modules/vue-style-loader/lib/addStylesClient.js
    	/*
    	  MIT License http://www.opensource.org/licenses/mit-license.php
    	  Author Tobias Koppers @sokra
    	  Modified by Evan You @yyx990803
    	*/



    	var hasDocument = typeof document !== 'undefined';

    	if (typeof DEBUG !== 'undefined' && DEBUG) {
    	  if (!hasDocument) {
    	    throw new Error(
    	    'vue-style-loader cannot be used in a non-browser environment. ' +
    	    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
    	  ) }
    	}

    	/*
    	type StyleObject = {
    	  id: number;
    	  parts: Array<StyleObjectPart>
    	}

    	type StyleObjectPart = {
    	  css: string;
    	  media: string;
    	  sourceMap: ?string
    	}
    	*/

    	var stylesInDom = {/*
    	  [id: number]: {
    	    id: number,
    	    refs: number,
    	    parts: Array<(obj?: StyleObjectPart) => void>
    	  }
    	*/};

    	var head = hasDocument && (document.head || document.getElementsByTagName('head')[0]);
    	var singletonElement = null;
    	var singletonCounter = 0;
    	var isProduction = false;
    	var noop = function () {};
    	var options = null;
    	var ssrIdKey = 'data-vue-ssr-id';

    	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
    	// tags it will allow on a page
    	var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase());

    	function addStylesClient (parentId, list, _isProduction, _options) {
    	  isProduction = _isProduction;

    	  options = _options || {};

    	  var styles = listToStyles(parentId, list);
    	  addStylesToDom(styles);

    	  return function update (newList) {
    	    var mayRemove = [];
    	    for (var i = 0; i < styles.length; i++) {
    	      var item = styles[i];
    	      var domStyle = stylesInDom[item.id];
    	      domStyle.refs--;
    	      mayRemove.push(domStyle);
    	    }
    	    if (newList) {
    	      styles = listToStyles(parentId, newList);
    	      addStylesToDom(styles);
    	    } else {
    	      styles = [];
    	    }
    	    for (var i = 0; i < mayRemove.length; i++) {
    	      var domStyle = mayRemove[i];
    	      if (domStyle.refs === 0) {
    	        for (var j = 0; j < domStyle.parts.length; j++) {
    	          domStyle.parts[j]();
    	        }
    	        delete stylesInDom[domStyle.id];
    	      }
    	    }
    	  }
    	}

    	function addStylesToDom (styles /* Array<StyleObject> */) {
    	  for (var i = 0; i < styles.length; i++) {
    	    var item = styles[i];
    	    var domStyle = stylesInDom[item.id];
    	    if (domStyle) {
    	      domStyle.refs++;
    	      for (var j = 0; j < domStyle.parts.length; j++) {
    	        domStyle.parts[j](item.parts[j]);
    	      }
    	      for (; j < item.parts.length; j++) {
    	        domStyle.parts.push(addStyle(item.parts[j]));
    	      }
    	      if (domStyle.parts.length > item.parts.length) {
    	        domStyle.parts.length = item.parts.length;
    	      }
    	    } else {
    	      var parts = [];
    	      for (var j = 0; j < item.parts.length; j++) {
    	        parts.push(addStyle(item.parts[j]));
    	      }
    	      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts };
    	    }
    	  }
    	}

    	function createStyleElement () {
    	  var styleElement = document.createElement('style');
    	  styleElement.type = 'text/css';
    	  head.appendChild(styleElement);
    	  return styleElement
    	}

    	function addStyle (obj /* StyleObjectPart */) {
    	  var update, remove;
    	  var styleElement = document.querySelector('style[' + ssrIdKey + '~="' + obj.id + '"]');

    	  if (styleElement) {
    	    if (isProduction) {
    	      // has SSR styles and in production mode.
    	      // simply do nothing.
    	      return noop
    	    } else {
    	      // has SSR styles but in dev mode.
    	      // for some reason Chrome can't handle source map in server-rendered
    	      // style tags - source maps in <style> only works if the style tag is
    	      // created and inserted dynamically. So we remove the server rendered
    	      // styles and inject new ones.
    	      styleElement.parentNode.removeChild(styleElement);
    	    }
    	  }

    	  if (isOldIE) {
    	    // use singleton mode for IE9.
    	    var styleIndex = singletonCounter++;
    	    styleElement = singletonElement || (singletonElement = createStyleElement());
    	    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
    	    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
    	  } else {
    	    // use multi-style-tag mode in all other cases
    	    styleElement = createStyleElement();
    	    update = applyToTag.bind(null, styleElement);
    	    remove = function () {
    	      styleElement.parentNode.removeChild(styleElement);
    	    };
    	  }

    	  update(obj);

    	  return function updateStyle (newObj /* StyleObjectPart */) {
    	    if (newObj) {
    	      if (newObj.css === obj.css &&
    	          newObj.media === obj.media &&
    	          newObj.sourceMap === obj.sourceMap) {
    	        return
    	      }
    	      update(obj = newObj);
    	    } else {
    	      remove();
    	    }
    	  }
    	}

    	var replaceText = (function () {
    	  var textStore = [];

    	  return function (index, replacement) {
    	    textStore[index] = replacement;
    	    return textStore.filter(Boolean).join('\n')
    	  }
    	})();

    	function applyToSingletonTag (styleElement, index, remove, obj) {
    	  var css = remove ? '' : obj.css;

    	  if (styleElement.styleSheet) {
    	    styleElement.styleSheet.cssText = replaceText(index, css);
    	  } else {
    	    var cssNode = document.createTextNode(css);
    	    var childNodes = styleElement.childNodes;
    	    if (childNodes[index]) styleElement.removeChild(childNodes[index]);
    	    if (childNodes.length) {
    	      styleElement.insertBefore(cssNode, childNodes[index]);
    	    } else {
    	      styleElement.appendChild(cssNode);
    	    }
    	  }
    	}

    	function applyToTag (styleElement, obj) {
    	  var css = obj.css;
    	  var media = obj.media;
    	  var sourceMap = obj.sourceMap;

    	  if (media) {
    	    styleElement.setAttribute('media', media);
    	  }
    	  if (options.ssrId) {
    	    styleElement.setAttribute(ssrIdKey, obj.id);
    	  }

    	  if (sourceMap) {
    	    // https://developer.chrome.com/devtools/docs/javascript-debugging
    	    // this makes source maps inside style tags work properly in Chrome
    	    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */';
    	    // http://stackoverflow.com/a/26603875
    	    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */';
    	  }

    	  if (styleElement.styleSheet) {
    	    styleElement.styleSheet.cssText = css;
    	  } else {
    	    while (styleElement.firstChild) {
    	      styleElement.removeChild(styleElement.firstChild);
    	    }
    	    styleElement.appendChild(document.createTextNode(css));
    	  }
    	}


    	/***/ }),

    	/***/ "a72a":
    	/***/ (function(module, exports, __webpack_require__) {

    	var uncurryThis = __webpack_require__("52fe");

    	module.exports = uncurryThis([].slice);


    	/***/ }),

    	/***/ "aa15":
    	/***/ (function(module, exports, __webpack_require__) {

    	var toLength = __webpack_require__("c92f");

    	// `LengthOfArrayLike` abstract operation
    	// https://tc39.es/ecma262/#sec-lengthofarraylike
    	module.exports = function (obj) {
    	  return toLength(obj.length);
    	};


    	/***/ }),

    	/***/ "ae5d":
    	/***/ (function(module, exports, __webpack_require__) {

    	// style-loader: Adds some css to the DOM by adding a <style> tag

    	// load the styles
    	var content = __webpack_require__("60ea");
    	if(content.__esModule) content = content.default;
    	if(typeof content === 'string') content = [[module.i, content, '']];
    	if(content.locals) module.exports = content.locals;
    	// add the styles to the DOM
    	var add = __webpack_require__("a373").default;
    	add("34b4b7a5", content, true, {"sourceMap":false,"shadowMode":false});

    	/***/ }),

    	/***/ "afa4":
    	/***/ (function(module, exports) {

    	module.exports = false;


    	/***/ }),

    	/***/ "b28f":
    	/***/ (function(module, exports, __webpack_require__) {

    	var toPrimitive = __webpack_require__("6ed0");
    	var isSymbol = __webpack_require__("9d9b");

    	// `ToPropertyKey` abstract operation
    	// https://tc39.es/ecma262/#sec-topropertykey
    	module.exports = function (argument) {
    	  var key = toPrimitive(argument, 'string');
    	  return isSymbol(key) ? key : key + '';
    	};


    	/***/ }),

    	/***/ "b93f":
    	/***/ (function(module, exports, __webpack_require__) {

    	var toIntegerOrInfinity = __webpack_require__("da66");

    	var max = Math.max;
    	var min = Math.min;

    	// Helper for a popular repeating case of the spec:
    	// Let integer be ? ToInteger(index).
    	// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
    	module.exports = function (index, length) {
    	  var integer = toIntegerOrInfinity(index);
    	  return integer < 0 ? max(integer + length, 0) : min(integer, length);
    	};


    	/***/ }),

    	/***/ "bba4":
    	/***/ (function(module, exports, __webpack_require__) {

    	var uncurryThis = __webpack_require__("52fe");
    	var isCallable = __webpack_require__("3a9e");
    	var store = __webpack_require__("d341");

    	var functionToString = uncurryThis(Function.toString);

    	// this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
    	if (!isCallable(store.inspectSource)) {
    	  store.inspectSource = function (it) {
    	    return functionToString(it);
    	  };
    	}

    	module.exports = store.inspectSource;


    	/***/ }),

    	/***/ "bff9":
    	/***/ (function(module, exports, __webpack_require__) {

    	var $ = __webpack_require__("d61b");
    	var global = __webpack_require__("4f87");
    	var apply = __webpack_require__("07b7");
    	var isCallable = __webpack_require__("3a9e");
    	var userAgent = __webpack_require__("5276");
    	var arraySlice = __webpack_require__("a72a");
    	var validateArgumentsLength = __webpack_require__("101a");

    	var MSIE = /MSIE .\./.test(userAgent); // <- dirty ie9- check
    	var Function = global.Function;

    	var wrap = function (scheduler) {
    	  return function (handler, timeout /* , ...arguments */) {
    	    var boundArgs = validateArgumentsLength(arguments.length, 1) > 2;
    	    var fn = isCallable(handler) ? handler : Function(handler);
    	    var args = boundArgs ? arraySlice(arguments, 2) : undefined;
    	    return scheduler(boundArgs ? function () {
    	      apply(fn, this, args);
    	    } : fn, timeout);
    	  };
    	};

    	// ie9- setTimeout & setInterval additional parameters fix
    	// https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#timers
    	$({ global: true, bind: true, forced: MSIE }, {
    	  // `setTimeout` method
    	  // https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#dom-settimeout
    	  setTimeout: wrap(global.setTimeout),
    	  // `setInterval` method
    	  // https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#dom-setinterval
    	  setInterval: wrap(global.setInterval)
    	});


    	/***/ }),

    	/***/ "c00d":
    	/***/ (function(module, exports) {

    	module.exports = {};


    	/***/ }),

    	/***/ "c2a7":
    	/***/ (function(module, exports, __webpack_require__) {

    	var fails = __webpack_require__("7aa9");

    	// Detect IE8's incomplete defineProperty implementation
    	module.exports = !fails(function () {
    	  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
    	  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
    	});


    	/***/ }),

    	/***/ "c86a":
    	/***/ (function(module, exports, __webpack_require__) {


    	/*
    	  MIT License http://www.opensource.org/licenses/mit-license.php
    	  Author Tobias Koppers @sokra
    	*/
    	// css base code, injected by the css-loader
    	// eslint-disable-next-line func-names
    	module.exports = function (useSourceMap) {
    	  var list = []; // return the list of modules as css string

    	  list.toString = function toString() {
    	    return this.map(function (item) {
    	      var content = cssWithMappingToString(item, useSourceMap);

    	      if (item[2]) {
    	        return "@media ".concat(item[2], " {").concat(content, "}");
    	      }

    	      return content;
    	    }).join('');
    	  }; // import a list of modules into the list
    	  // eslint-disable-next-line func-names


    	  list.i = function (modules, mediaQuery, dedupe) {
    	    if (typeof modules === 'string') {
    	      // eslint-disable-next-line no-param-reassign
    	      modules = [[null, modules, '']];
    	    }

    	    var alreadyImportedModules = {};

    	    if (dedupe) {
    	      for (var i = 0; i < this.length; i++) {
    	        // eslint-disable-next-line prefer-destructuring
    	        var id = this[i][0];

    	        if (id != null) {
    	          alreadyImportedModules[id] = true;
    	        }
    	      }
    	    }

    	    for (var _i = 0; _i < modules.length; _i++) {
    	      var item = [].concat(modules[_i]);

    	      if (dedupe && alreadyImportedModules[item[0]]) {
    	        // eslint-disable-next-line no-continue
    	        continue;
    	      }

    	      if (mediaQuery) {
    	        if (!item[2]) {
    	          item[2] = mediaQuery;
    	        } else {
    	          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
    	        }
    	      }

    	      list.push(item);
    	    }
    	  };

    	  return list;
    	};

    	function cssWithMappingToString(item, useSourceMap) {
    	  var content = item[1] || ''; // eslint-disable-next-line prefer-destructuring

    	  var cssMapping = item[3];

    	  if (!cssMapping) {
    	    return content;
    	  }

    	  if (useSourceMap && typeof btoa === 'function') {
    	    var sourceMapping = toComment(cssMapping);
    	    var sourceURLs = cssMapping.sources.map(function (source) {
    	      return "/*# sourceURL=".concat(cssMapping.sourceRoot || '').concat(source, " */");
    	    });
    	    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
    	  }

    	  return [content].join('\n');
    	} // Adapted from convert-source-map (MIT)


    	function toComment(sourceMap) {
    	  // eslint-disable-next-line no-undef
    	  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
    	  var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    	  return "/*# ".concat(data, " */");
    	}

    	/***/ }),

    	/***/ "c92f":
    	/***/ (function(module, exports, __webpack_require__) {

    	var toIntegerOrInfinity = __webpack_require__("da66");

    	var min = Math.min;

    	// `ToLength` abstract operation
    	// https://tc39.es/ecma262/#sec-tolength
    	module.exports = function (argument) {
    	  return argument > 0 ? min(toIntegerOrInfinity(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
    	};


    	/***/ }),

    	/***/ "ccf6":
    	/***/ (function(module, exports, __webpack_require__) {

    	var fails = __webpack_require__("7aa9");
    	var wellKnownSymbol = __webpack_require__("5780");
    	var V8_VERSION = __webpack_require__("d88e");

    	var SPECIES = wellKnownSymbol('species');

    	module.exports = function (METHOD_NAME) {
    	  // We can't use this feature detection in V8 since it causes
    	  // deoptimization and serious performance degradation
    	  // https://github.com/zloirock/core-js/issues/677
    	  return V8_VERSION >= 51 || !fails(function () {
    	    var array = [];
    	    var constructor = array.constructor = {};
    	    constructor[SPECIES] = function () {
    	      return { foo: 1 };
    	    };
    	    return array[METHOD_NAME](Boolean).foo !== 1;
    	  });
    	};


    	/***/ }),

    	/***/ "d067":
    	/***/ (function(module, exports, __webpack_require__) {

    	var global = __webpack_require__("4f87");
    	var isCallable = __webpack_require__("3a9e");

    	var String = global.String;
    	var TypeError = global.TypeError;

    	module.exports = function (argument) {
    	  if (typeof argument == 'object' || isCallable(argument)) return argument;
    	  throw TypeError("Can't set " + String(argument) + ' as a prototype');
    	};


    	/***/ }),

    	/***/ "d15c":
    	/***/ (function(module, exports, __webpack_require__) {

    	var shared = __webpack_require__("e002");
    	var uid = __webpack_require__("da09");

    	var keys = shared('keys');

    	module.exports = function (key) {
    	  return keys[key] || (keys[key] = uid(key));
    	};


    	/***/ }),

    	/***/ "d341":
    	/***/ (function(module, exports, __webpack_require__) {

    	var global = __webpack_require__("4f87");
    	var setGlobal = __webpack_require__("7e84");

    	var SHARED = '__core-js_shared__';
    	var store = global[SHARED] || setGlobal(SHARED, {});

    	module.exports = store;


    	/***/ }),

    	/***/ "d61b":
    	/***/ (function(module, exports, __webpack_require__) {

    	var global = __webpack_require__("4f87");
    	var getOwnPropertyDescriptor = __webpack_require__("7f51").f;
    	var createNonEnumerableProperty = __webpack_require__("70ae");
    	var redefine = __webpack_require__("9182");
    	var setGlobal = __webpack_require__("7e84");
    	var copyConstructorProperties = __webpack_require__("2f2e");
    	var isForced = __webpack_require__("5a86");

    	/*
    	  options.target      - name of the target object
    	  options.global      - target is the global object
    	  options.stat        - export as static methods of target
    	  options.proto       - export as prototype methods of target
    	  options.real        - real prototype method for the `pure` version
    	  options.forced      - export even if the native feature is available
    	  options.bind        - bind methods to the target, required for the `pure` version
    	  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
    	  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
    	  options.sham        - add a flag to not completely full polyfills
    	  options.enumerable  - export as enumerable property
    	  options.noTargetGet - prevent calling a getter on target
    	  options.name        - the .name of the function if it does not match the key
    	*/
    	module.exports = function (options, source) {
    	  var TARGET = options.target;
    	  var GLOBAL = options.global;
    	  var STATIC = options.stat;
    	  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
    	  if (GLOBAL) {
    	    target = global;
    	  } else if (STATIC) {
    	    target = global[TARGET] || setGlobal(TARGET, {});
    	  } else {
    	    target = (global[TARGET] || {}).prototype;
    	  }
    	  if (target) for (key in source) {
    	    sourceProperty = source[key];
    	    if (options.noTargetGet) {
    	      descriptor = getOwnPropertyDescriptor(target, key);
    	      targetProperty = descriptor && descriptor.value;
    	    } else targetProperty = target[key];
    	    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
    	    // contained in target
    	    if (!FORCED && targetProperty !== undefined) {
    	      if (typeof sourceProperty == typeof targetProperty) continue;
    	      copyConstructorProperties(sourceProperty, targetProperty);
    	    }
    	    // add a flag to not completely full polyfills
    	    if (options.sham || (targetProperty && targetProperty.sham)) {
    	      createNonEnumerableProperty(sourceProperty, 'sham', true);
    	    }
    	    // extend global
    	    redefine(target, key, sourceProperty, options);
    	  }
    	};


    	/***/ }),

    	/***/ "d771":
    	/***/ (function(module, exports, __webpack_require__) {

    	/* eslint-disable no-proto -- safe */
    	var uncurryThis = __webpack_require__("52fe");
    	var anObject = __webpack_require__("4d06");
    	var aPossiblePrototype = __webpack_require__("d067");

    	// `Object.setPrototypeOf` method
    	// https://tc39.es/ecma262/#sec-object.setprototypeof
    	// Works with __proto__ only. Old v8 can't work with null proto objects.
    	// eslint-disable-next-line es/no-object-setprototypeof -- safe
    	module.exports = Object.setPrototypeOf || ('__proto__' in {} ? function () {
    	  var CORRECT_SETTER = false;
    	  var test = {};
    	  var setter;
    	  try {
    	    // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
    	    setter = uncurryThis(Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set);
    	    setter(test, []);
    	    CORRECT_SETTER = test instanceof Array;
    	  } catch (error) { /* empty */ }
    	  return function setPrototypeOf(O, proto) {
    	    anObject(O);
    	    aPossiblePrototype(proto);
    	    if (CORRECT_SETTER) setter(O, proto);
    	    else O.__proto__ = proto;
    	    return O;
    	  };
    	}() : undefined);


    	/***/ }),

    	/***/ "d88e":
    	/***/ (function(module, exports, __webpack_require__) {

    	var global = __webpack_require__("4f87");
    	var userAgent = __webpack_require__("5276");

    	var process = global.process;
    	var Deno = global.Deno;
    	var versions = process && process.versions || Deno && Deno.version;
    	var v8 = versions && versions.v8;
    	var match, version;

    	if (v8) {
    	  match = v8.split('.');
    	  // in old Chrome, versions of V8 isn't V8 = Chrome / 10
    	  // but their correct versions are not interesting for us
    	  version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
    	}

    	// BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
    	// so check `userAgent` even if `.v8` exists, but 0
    	if (!version && userAgent) {
    	  match = userAgent.match(/Edge\/(\d+)/);
    	  if (!match || match[1] >= 74) {
    	    match = userAgent.match(/Chrome\/(\d+)/);
    	    if (match) version = +match[1];
    	  }
    	}

    	module.exports = version;


    	/***/ }),

    	/***/ "da09":
    	/***/ (function(module, exports, __webpack_require__) {

    	var uncurryThis = __webpack_require__("52fe");

    	var id = 0;
    	var postfix = Math.random();
    	var toString = uncurryThis(1.0.toString);

    	module.exports = function (key) {
    	  return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString(++id + postfix, 36);
    	};


    	/***/ }),

    	/***/ "da66":
    	/***/ (function(module, exports) {

    	var ceil = Math.ceil;
    	var floor = Math.floor;

    	// `ToIntegerOrInfinity` abstract operation
    	// https://tc39.es/ecma262/#sec-tointegerorinfinity
    	module.exports = function (argument) {
    	  var number = +argument;
    	  // eslint-disable-next-line no-self-compare -- safe
    	  return number !== number || number === 0 ? 0 : (number > 0 ? floor : ceil)(number);
    	};


    	/***/ }),

    	/***/ "dd7f":
    	/***/ (function(module, exports, __webpack_require__) {

    	var wellKnownSymbol = __webpack_require__("5780");

    	var TO_STRING_TAG = wellKnownSymbol('toStringTag');
    	var test = {};

    	test[TO_STRING_TAG] = 'z';

    	module.exports = String(test) === '[object z]';


    	/***/ }),

    	/***/ "e002":
    	/***/ (function(module, exports, __webpack_require__) {

    	var IS_PURE = __webpack_require__("afa4");
    	var store = __webpack_require__("d341");

    	(module.exports = function (key, value) {
    	  return store[key] || (store[key] = value !== undefined ? value : {});
    	})('versions', []).push({
    	  version: '3.21.1',
    	  mode: IS_PURE ? 'pure' : 'global',
    	  copyright: '© 2014-2022 Denis Pushkarev (zloirock.ru)',
    	  license: 'https://github.com/zloirock/core-js/blob/v3.21.1/LICENSE',
    	  source: 'https://github.com/zloirock/core-js'
    	});


    	/***/ }),

    	/***/ "e6b6":
    	/***/ (function(module, exports, __webpack_require__) {

    	// toObject with fallback for non-array-like ES3 strings
    	var IndexedObject = __webpack_require__("4054");
    	var requireObjectCoercible = __webpack_require__("2b4c");

    	module.exports = function (it) {
    	  return IndexedObject(requireObjectCoercible(it));
    	};


    	/***/ }),

    	/***/ "e6da":
    	/***/ (function(module, exports, __webpack_require__) {

    	var toPropertyKey = __webpack_require__("b28f");
    	var definePropertyModule = __webpack_require__("4201");
    	var createPropertyDescriptor = __webpack_require__("38bb");

    	module.exports = function (object, key, value) {
    	  var propertyKey = toPropertyKey(key);
    	  if (propertyKey in object) definePropertyModule.f(object, propertyKey, createPropertyDescriptor(0, value));
    	  else object[propertyKey] = value;
    	};


    	/***/ }),

    	/***/ "eef7":
    	/***/ (function(module, exports, __webpack_require__) {

    	var aCallable = __webpack_require__("3fe7");

    	// `GetMethod` abstract operation
    	// https://tc39.es/ecma262/#sec-getmethod
    	module.exports = function (V, P) {
    	  var func = V[P];
    	  return func == null ? undefined : aCallable(func);
    	};


    	/***/ }),

    	/***/ "fc3e":
    	/***/ (function(module, exports, __webpack_require__) {

    	var fails = __webpack_require__("7aa9");

    	module.exports = !fails(function () {
    	  var test = (function () { /* empty */ }).bind();
    	  // eslint-disable-next-line no-prototype-builtins -- safe
    	  return typeof test != 'function' || test.hasOwnProperty('prototype');
    	});


    	/***/ }),

    	/***/ "fcdc":
    	/***/ (function(module, exports, __webpack_require__) {

    	var uncurryThis = __webpack_require__("52fe");
    	var requireObjectCoercible = __webpack_require__("2b4c");
    	var toString = __webpack_require__("8824");
    	var whitespaces = __webpack_require__("708c");

    	var replace = uncurryThis(''.replace);
    	var whitespace = '[' + whitespaces + ']';
    	var ltrim = RegExp('^' + whitespace + whitespace + '*');
    	var rtrim = RegExp(whitespace + whitespace + '*$');

    	// `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation
    	var createMethod = function (TYPE) {
    	  return function ($this) {
    	    var string = toString(requireObjectCoercible($this));
    	    if (TYPE & 1) string = replace(string, ltrim, '');
    	    if (TYPE & 2) string = replace(string, rtrim, '');
    	    return string;
    	  };
    	};

    	module.exports = {
    	  // `String.prototype.{ trimLeft, trimStart }` methods
    	  // https://tc39.es/ecma262/#sec-string.prototype.trimstart
    	  start: createMethod(1),
    	  // `String.prototype.{ trimRight, trimEnd }` methods
    	  // https://tc39.es/ecma262/#sec-string.prototype.trimend
    	  end: createMethod(2),
    	  // `String.prototype.trim` method
    	  // https://tc39.es/ecma262/#sec-string.prototype.trim
    	  trim: createMethod(3)
    	};


    	/***/ })

    	/******/ })["default"];
    	});
    	
    } (vueKnobControl_umd));

    var VueKnobControl = /*@__PURE__*/getDefaultExportFromCjs(vueKnobControl_umd.exports);

    var tinyEmitter = {exports: {}};

    function E$1 () {
      // Keep this empty so it's easier to inherit from
      // (via https://github.com/lipsmack from https://github.com/scottcorgan/tiny-emitter/issues/3)
    }

    E$1.prototype = {
      on: function (name, callback, ctx) {
        var e = this.e || (this.e = {});

        (e[name] || (e[name] = [])).push({
          fn: callback,
          ctx: ctx
        });

        return this;
      },

      once: function (name, callback, ctx) {
        var self = this;
        function listener () {
          self.off(name, listener);
          callback.apply(ctx, arguments);
        }
        listener._ = callback;
        return this.on(name, listener, ctx);
      },

      emit: function (name) {
        var data = [].slice.call(arguments, 1);
        var evtArr = ((this.e || (this.e = {}))[name] || []).slice();
        var i = 0;
        var len = evtArr.length;

        for (i; i < len; i++) {
          evtArr[i].fn.apply(evtArr[i].ctx, data);
        }

        return this;
      },

      off: function (name, callback) {
        var e = this.e || (this.e = {});
        var evts = e[name];
        var liveEvents = [];

        if (evts && callback) {
          for (var i = 0, len = evts.length; i < len; i++) {
            if (evts[i].fn !== callback && evts[i].fn._ !== callback)
              liveEvents.push(evts[i]);
          }
        }

        // Remove event from queue to prevent memory leak
        // Suggested by https://github.com/lazd
        // Ref: https://github.com/scottcorgan/tiny-emitter/commit/c6ebfaa9bc973b33d110a84a307742b7cf94c953#commitcomment-5024910

        (liveEvents.length)
          ? e[name] = liveEvents
          : delete e[name];

        return this;
      }
    };

    tinyEmitter.exports = E$1;
    tinyEmitter.exports.TinyEmitter = E$1;

    var E = tinyEmitter.exports;
    var instance = new E();

    //NOTE: The event bus pattern is discouraged with vue
    const EventBus = {
      $on: (...args) => instance.on(...args),
      $once: (...args) => instance.once(...args),
      $off: (...args) => instance.off(...args),
      $emit: (...args) => instance.emit(...args)
    };

    var variables = {"knobTextColourDefault":"#000","knobTextColourDark":"#C0C0C0","marginBetweenChannelsSmall":"1","channelHeight":"200","meterHeight":"210","channelWidthSmall":"40","meterWidthSmall":"5","meterWidthBetweenSmall":"2","channelSliderThumbSizeSmall":"0.4","channelWidthMedium":"57","marginBetweenChannelsMedium":"2","meterWidthMedium":"10","meterWidthBetweenMedium":"5","channelSliderThumbSizeMedium":"0.6","masterChannelLabelBackgroundColour":"#000","channelLabelTextColour":"#FFFFFF","channelStripBackgroundColour":"#16191c","channelMuteButtonBackgroundColour":"#666B73","channelMuteButtonBackgroundColourActive":"#911","channelMuteButtonBorderColour":"#000","channelMuteButtonTextColourHover":"#FFF","channelMuteButtonTextColourActive":"#FFF","channelSoloButtonBackgroundColourActive":"#1cdd20","channelSoloButtonTextColourActive":"#FFF","channelPannerTextColour":"rgb(255, 255, 255)","loaderInnerColour":"#1d7a9c","loaderOuterColour":"#00a7cc","loaderTextColour":"#1d7a9c","sliderInputBackground":"repeating-linear-gradient(90deg, #000, #3b3e41 0.0625em, transparent 0.0625em, transparent 0.75em) no-repeat 50% 0.75em border-box, \r","sliderTrackColour":"#15181b","sliderThumbBackground":"radial-gradient(#ebe1e0 10%, rgba(235, 225, 224, 0.2) 10%, rgba(235, 225, 224, 0) 72%) no-repeat 50% 50%, radial-gradient(at 100% 50%, #e9dfde, #eae1de 71%, rgba(0, 0, 0, 0) 71%) no-repeat 2.5em 50%, linear-gradient(90deg, #e9dfde, #d0c8c6) no-repeat 100% 50%, radial-gradient(at 0 50%, #d0c6c5, #c6baba 71%, rgba(0, 0, 0, 0) 71%) no-repeat 0.75em 50%, linear-gradient(90deg, #e3d9d8, #d0c6c5) no-repeat 0 50%, linear-gradient(#cdc0c0, #fcf5ef, #fcf5ef, #cdc0c0)","progressBarBackgroundColour":"#4c4c4c","progressBarCursorColour":"#b6c8e1","transportTimeBackground":"#000","transportTimeTextColour":"#fff","transportButtonsColour":"#d5d5d5"};

    var script$8 = {
        mixins:[],
        props: {
            value: {
                type: [Number, String]
            }
        },

        data : function(){       
          return {
            dragging:false,
            progress:0,
            rows:[23,43,63,83,103,123,143,163,183]
          };
      },

       
         watch:{

          inputVal: function(){
            this.setProgress();
          },
        },

        mounted(){
          this.setProgress();
        },

        created(){





          

          //console.log(this.progress);
          //        this.inputVal = ((percent/100) * 1.5).toFixed(1);
          //        
      
          window.addEventListener('mousemove',this.doDrag);
          window.addEventListener('touchmove',this.doDrag);

          window.addEventListener("mouseup", this.triggerMouseUpEvent);
          window.addEventListener("touchend", this.triggerMouseUpEvent);
        },
        beforeDestroy() {
          window.removeEventListener('mousemove',this.doDrag);
          window.removeEventListener('touchmove',this.doDrag);
          window.removeEventListener("mouseup", this.triggerMouseUpEvent);
          window.removeEventListener("touchend", this.triggerMouseUpEvent);
        },
        computed: {

            trackHeight()
            {


              let paddingtop = 58;
              return parseInt(variables.meterHeight) - paddingtop;

            },
            thumbPosition(){
              return (this.progress) +'px';
            },
            inputVal: {
                get: function (){
                    return this.value;
                },

                set: function (value){
                    this.$emit('input', value);
                }
            }
        },
        methods: {

          setProgress()
          {
              let percent = (100/1.5)*this.value;
              let percentt = (this.trackHeight/100) * percent;
              this.progress = Math.round(percentt);
          },

          triggerMouseUpEvent()
          {
              this.dragging = false;
          },

          doDrag(e)
          {


            if(!this.dragging){
              return;
            }

            if (e.cancelable) 
              e.preventDefault();

            e = e.type == 'touchmove' ? e.touches[0] : e;

            let target = this.$refs['vue-audio-mixer-slider'];
            let rect = target.getBoundingClientRect();
            let x =  rect.bottom- e.clientY; //x position within the element.
            let percent = (100/this.trackHeight) * x;
            percent = Math.round(percent);


            if(percent > 100)
              percent = 100;
            if(percent < 0)
              percent = 0;
            
            this.inputVal = ((percent/100) * 1.5).toFixed(1);

          },


          startDrag(e)
          {
            if (e.cancelable) 
              e.preventDefault();
            this.dragging = true; 
          }

        }
    };

    const _hoisted_1$7 = {
      class: "vue-audio-mixer-slider",
      ref: "vue-audio-mixer-slider"
    };
    const _hoisted_2$6 = /*#__PURE__*/createBaseVNode("div", { class: "vue-audio-mixer-fader-slider-track" }, null, -1 /* HOISTED */);

    function render$8(_ctx, _cache, $props, $setup, $data, $options) {
      return (openBlock(), createElementBlock("div", _hoisted_1$7, [
        createBaseVNode("div", {
          class: "vue-audio-mixer-fader-thumb",
          onMousedown: _cache[0] || (_cache[0] = (...args) => ($options.startDrag && $options.startDrag(...args))),
          onTouchstart: _cache[1] || (_cache[1] = (...args) => ($options.startDrag && $options.startDrag(...args))),
          style: normalizeStyle({bottom: $options.thumbPosition})
        }, null, 36 /* STYLE, HYDRATE_EVENTS */),
        _hoisted_2$6,
        (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.rows, (p) => {
          return (openBlock(), createElementBlock("div", {
            class: "vue-audio-mixer-fader-slider-row",
            style: normalizeStyle({ bottom: p + 'px' })
          }, null, 4 /* STYLE */))
        }), 256 /* UNKEYED_FRAGMENT */)),
        (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.rows, (p) => {
          return (openBlock(), createElementBlock("div", {
            class: "vue-audio-mixer-fader-slider-row-right",
            style: normalizeStyle({ bottom: p + 'px' })
          }, null, 4 /* STYLE */))
        }), 256 /* UNKEYED_FRAGMENT */))
      ], 512 /* NEED_PATCH */))
    }

    script$8.render = render$8;
    script$8.__file = "src/components/Slider.vue";

    var script$7 = {
      name: 'Channel',
      props: [
        'index',
        'trackIndex', 
        'title',
        'context', 
        'url',
        'output',
        'leftAnalyser',
        'rightAnalyser',
        'scriptProcessorNode',
        'defaultPan',
        'defaultGain',
        'defaultMuted',
        'showMute',
        'isMaster',
        'mixerVars',
        'solodTracks'
      ],
      components:{
        VueKnobControl,
        Slider: script$8
      },
      data : function(){       
          return {
              leftBouncer : {average:0,opacity:1},
              rightBouncer: {average:0,opacity:1},
              gradient    : false,
              ctx         : false,
              gain        : 0.8,
              pan         : 0,
              soloModel   : false,
              mute        : false,
              meterHeight : parseInt(variables.meterHeight),
              titleModel  : '',
              loaded      : false
          };
      },

      computed:{

        knobTextColour()
        {

          if(this.mixerVars.theme_colour == 'default'){
            return variables.knobTextColourDefault;
          }

          if(this.mixerVars.theme_colour == 'dark'){
            return variables.knobTextColourDark;
          }

        },

        pannerSize()
        {
          return this.mixerVars.theme_size == 'Small' ? 30 :40; 
        },

        meterWidth()
        {
          return parseInt(variables['meterWidth'+this.mixerVars.theme_size]);
        },


        meterWidthBetween()
        {
          return parseInt(variables['meterWidthBetween'+this.mixerVars.theme_size]);
        },


        formattedGain()
        {
          return this.pad(Math.round((this.gain*100)),3);
        }

      },

      watch:{

        pan: function(){
            this.changePan();
        },


        mute: function(){
            this.muteChange();
        },

        


        soloModel: function(newVal){
            this.soloChange(this.trackIndex, newVal);
        },

        titleModel:function(){
          this.titleChange();
        }

      },

      created(){
       // EventBus.$on('loaded',()=>{this.loaded = true});
        this.titleModel = 'Track '+(this.trackIndex+1);
        EventBus.$on(this.mixerVars.instance_id+'ended', this.ended);
        this.scriptProcessorNode.onaudioprocess = () => {
          this.drawMeter();
        };
      },

      beforeDestroy() {
        EventBus.$off(this.mixerVars.instance_id+'ended',this.ended);
      },

      mounted(){

          this.ctx = document.getElementById('canvas'+this._uid).getContext("2d");
          this.gradient = this.ctx.createLinearGradient(0,0,0,400);
          this.gradient.addColorStop(1,'#31e2fc');
          this.gradient.addColorStop(0.75,'#38fedd');
          this.gradient.addColorStop(0.25,'#38fedd');
          this.gradient.addColorStop(0,'#31e0fc');

          this.pan = this.defaultPan === undefined ? 0 : this.defaultPan;
          this.gain = this.defaultGain === undefined ? 0 : this.defaultGain;
          this.mute = this.defaultMuted === undefined ? false : this.defaultMuted;
        
          this.changePan();
          this.changeGain();

          this.drawMeter();

      },
      methods: {

       

        pad(n, width, z) {
          z = z || '0';
          n = n + '';
          return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
        },

        ended(index){

          if(index == this.index){
            setTimeout( () => { this.clearCanvas();}, 10);
          }

        },

        changeGain()
        {
          this.$emit('gainChange',this.gain);
        },

        changePan() {
          this.$emit('panChange',this.pan);
        },

        muteChange() {
          this.$emit('muteChange',this.mute);
        },

        soloChange(trackIndex, is_solo) {
            EventBus.$emit(this.mixerVars.instance_id+'soloChange',{index:trackIndex, solo:is_solo});
        },

        titleChange() {
          this.$emit(this.mixerVars.instance_id+'titleChange',this.titleModel);
        },



        



        getAverageVolume(array) {
            var values = 0;
            var average;
            var length = array.length;
            // get all the frequency amplitudes
            for (var i = 0; i < length; i++) {
                values += array[i];
            }
            average = values / length;
            return average;
        },


        clearCanvas(){

           // clear the current state
          this.ctx.clearRect(0, 0, 60, this.meterHeight);

          this.ctx.fillStyle="#15181b";
          // create background to meters
          this.ctx.fillRect(0,0,this.meterWidth,this.meterHeight+200);
          this.ctx.fillRect(this.meterWidth+this.meterWidthBetween,0,this.meterWidth,this.meterHeight+200);

        },

       

        drawMeter(){

          // get the average for the first channel
          var array =  new Uint8Array(this.leftAnalyser.frequencyBinCount);
          this.leftAnalyser.getByteFrequencyData(array);
          var average = this.getAverageVolume(array);

          // get the average for the second channel
          var array2 =  new Uint8Array(this.rightAnalyser.frequencyBinCount);
          this.rightAnalyser.getByteFrequencyData(array2);
          var average2 = this.getAverageVolume(array2);

          // bouncers left
          if(average > this.leftBouncer.average){
            this.leftBouncer.average = average;
            this.leftBouncer.opacity = 1;
          }
          else {
            if(this.leftBouncer.opacity > 0.1) // fade out
              this.leftBouncer.opacity = this.leftBouncer.opacity -0.1;
            else
              this.leftBouncer.opacity = 0;
            this.leftBouncer.average--; // make it fall
          }

          // bouncers right
          if(average2 > this.rightBouncer.average){
            this.rightBouncer.opacity = 1;
            this.rightBouncer.average = average2;
          }
          else {
            if(this.rightBouncer.opacity > 0.1)// fade out
              this.rightBouncer.opacity = this.rightBouncer.opacity -0.1;
            else
              this.rightBouncer.opacity = 0;
            this.rightBouncer.average--;// make it fall
          }

          this.clearCanvas();

          // set the fill style
          this.ctx.fillStyle=this.gradient;


          // create the meters (ctx.meterHeight/100) is 1% of the meter height
          this.ctx.fillRect(0,this.meterHeight-(average*(this.meterHeight/100)),this.meterWidth,this.meterHeight+200);
          this.ctx.fillRect(this.meterWidth+this.meterWidthBetween,this.meterHeight-(average2*(this.meterHeight/100)),this.meterWidth,this.meterHeight+200);

          // create the bouncers

          if(average > 0)
            this.ctx.fillRect(0,this.meterHeight-(this.leftBouncer.average*(this.meterHeight/100))-2,this.meterWidth,this.leftBouncer.opacity);
          if(average2 > 0)
            this.ctx.fillRect(this.meterWidth+this.meterWidthBetween,this.meterHeight-(this.rightBouncer.average*(this.meterHeight/100))-2,this.meterWidth,this.rightBouncer.opacity);

        
        }

      }
    };

    const _hoisted_1$6 = ["id", "height"];
    const _hoisted_2$5 = { class: "slider_value" };
    const _hoisted_3$5 = { class: "vue-audio-mixer-channel-mute-button" };
    const _hoisted_4$4 = /*#__PURE__*/createBaseVNode("span", { class: "vue-audio-mixer-channel-mute-button-label" }, "M", -1 /* HOISTED */);
    const _hoisted_5$3 = {
      key: 0,
      class: "logo"
    };
    const _hoisted_6$1 = { class: "vue-audio-mixer-channel-solo-button" };
    const _hoisted_7$1 = /*#__PURE__*/createBaseVNode("span", { class: "vue-audio-mixer-channel-solo-button-label" }, "S", -1 /* HOISTED */);
    const _hoisted_8$1 = { class: "vue-audio-mixer-channel-label" };
    const _hoisted_9$1 = { "data-label": "0" };

    function render$7(_ctx, _cache, $props, $setup, $data, $options) {
      const _component_Slider = resolveComponent("Slider");

      return (openBlock(), createElementBlock("div", {
        class: normalizeClass(["vue-audio-mixer-channel", {'with-panner':$props.mixerVars.show_pan}])
      }, [
        createBaseVNode("div", {
          class: normalizeClass(["vue-audio-mixer-channel-panner-container", {'vue-audio-mixer-is-master':$props.isMaster}])
        }, [
          createCommentVNode(" <VueKnobControl\r\n          v-if=\"mixerVars.show_pan\"\r\n          :min=\"-90\"\r\n          :max=\"90\"\r\n          :size=\"pannerSize\"\r\n          :stroke-width=\"7\"\r\n          v-model=\"pan\"\r\n          class=\"vue-audio-mixer-channel-panner\"\r\n          primaryColor=\"#c40303\"\r\n          secondaryColor=\"#adadad\"\r\n          :textColor=\"knobTextColour\"\r\n        ></VueKnobControl> "),
          withDirectives(createBaseVNode("input", {
            type: "number",
            "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((_ctx.pan) = $event))
          }, null, 512 /* NEED_PATCH */), [
            [vModelText, _ctx.pan]
          ])
        ], 2 /* CLASS */),
        createBaseVNode("canvas", {
          id: 'canvas'+_ctx._uid,
          width: "25",
          height: _ctx.meterHeight,
          style: {"display":"block"},
          class: "vue-audio-mixer-channel-meter-canvas"
        }, null, 8 /* PROPS */, _hoisted_1$6),
        createBaseVNode("div", _hoisted_2$5, toDisplayString($options.formattedGain), 1 /* TEXT */),
        createVNode(_component_Slider, {
          modelValue: _ctx.gain,
          "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => ((_ctx.gain) = $event)),
          onInput: $options.changeGain
        }, null, 8 /* PROPS */, ["modelValue", "onInput"]),
        withDirectives(createBaseVNode("div", _hoisted_3$5, [
          createBaseVNode("label", null, [
            withDirectives(createBaseVNode("input", {
              "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => ((_ctx.mute) = $event)),
              type: "checkbox"
            }, null, 512 /* NEED_PATCH */), [
              [vModelCheckbox, _ctx.mute]
            ]),
            _hoisted_4$4
          ])
        ], 512 /* NEED_PATCH */), [
          [vShow, $props.showMute]
        ]),
        ($props.isMaster && !$props.showMute)
          ? (openBlock(), createElementBlock("div", _hoisted_5$3))
          : createCommentVNode("v-if", true),
        withDirectives(createBaseVNode("div", _hoisted_6$1, [
          createBaseVNode("label", null, [
            withDirectives(createBaseVNode("input", {
              "onUpdate:modelValue": _cache[3] || (_cache[3] = $event => ((_ctx.soloModel) = $event)),
              type: "checkbox"
            }, null, 512 /* NEED_PATCH */), [
              [vModelCheckbox, _ctx.soloModel]
            ]),
            _hoisted_7$1
          ])
        ], 512 /* NEED_PATCH */), [
          [vShow, !$props.isMaster]
        ]),
        createBaseVNode("div", _hoisted_8$1, [
          createBaseVNode("label", _hoisted_9$1, toDisplayString($props.title), 1 /* TEXT */)
        ])
      ], 2 /* CLASS */))
    }

    script$7.render = render$7;
    script$7.__file = "src/components/Channel.vue";

    var script$6 = {
      name: 'MixerChannel',
      props: [
          'title',
          'context', 
          'url',
          'output',
          'defaultPan',
          'defaultGain',
          'defaultMuted',
          'trackIndex',
          'mixerVars',
          'hidden',
          'solodTracks'
      ],
      components:{Channel: script$7},
      data : function(){       
          return {
            sourceNode         : false,
            scriptProcessorNode: false,
            gainNode           : false,
            pannerNode         : false,
            
            muted              : false,
            leftAnalyser       : false,
            
            leftBouncer        : {average:0,opacity:1},
            rightAnalyser      : false,
            rightBouncer       : {average:0,opacity:1},
            splitter           : false,
            ctx                : false,
            gradient           : false,
            buffer             : false,
            meterHeight        : 400,
            meterWidth         : 10,
            playFrom           : false,
            playing            : false,
            gainValue          : 0,
            pan                : 0,
            gain               : 0.8,
            loaded             : false,
            mutedBySolo                :false,
            mutedByMute                :false
          };
      },

      watch:{
        
        solodTracks(newVal)
        {
            if(this.solodTracks.length && this.solodTracks.indexOf(this.trackIndex) === -1)
              this.muteChange(true, true);
            else
              this.muteChange(false, true);
        },


      },

      created(){
        this.muted = this.defaultMuted;
        this.pan   = this.defaultPan;
        this.gainValue  = this.defaultGain.toString();

        this.scriptProcessorNode = this.context.createScriptProcessor(2048, 1, 1);
        EventBus.$on(this.mixerVars.instance_id+'play', this.playSound);
        EventBus.$on(this.mixerVars.instance_id+'stop', this.stopSound);
        this.loadSound();
      },

      beforeDestroy() {
        EventBus.$off(this.mixerVars.instance_id+'play',this.playSound);
        EventBus.$off(this.mixerVars.instance_id+'stop',this.stopSound);
      },



      mounted(){

      },
      methods: {


        mute()
        {
          this.gainValue = this.gainNode.gain.value; // store gain value
          this.gainNode.gain.value = 0; // mute the gain node
          this.muted = true;
          this.$emit('muteChange', {index:this.trackIndex,muted:this.muted});
        },

        unMute()
        {
          this.muted = false;
          this.gainNode.gain.value = this.gainValue; // restore previous gain value
          this.$emit('muteChange', {index:this.trackIndex,muted:this.muted});
        },

        

        /*
        * MUTE CHANGE
        * Event when mute changes
        */

        muteChange(value, triggered_from_solo){

            // don't mute hidden tracks
            if(this.hidden)
              return;


            if(triggered_from_solo)
            {
              if(value && !this.mutedByMute && !this.mutedBySolo)
                this.mute();
              
              if(!value && !this.mutedByMute)
                this.unMute();
            
              this.mutedBySolo = value;
            }else {
              if(value && !this.mutedByMute && !this.mutedBySolo)
                this.mute();
              
              if(!value && !this.mutedBySolo)
                this.unMute();

              this.mutedByMute = value;
            }

        },

        soloChange(value){
            this.$emit('soloChange', {index:this.trackIndex});
        },

        changeGain(gain)
        {
          this.gainValue = gain;
          //this.gain = gain;

          if(!this.muted){
            this.gainNode.gain.value = gain;
          }

            this.$emit('gainChange', {index:this.trackIndex,gain:gain});
        },

        

        changePan(pan) {
            this.pan = pan;
            var xDeg = parseInt(pan);
            var zDeg = xDeg + 90;
            if (zDeg > 90) {
                zDeg = 180 - zDeg;
            }
            var x = Math.sin(xDeg * (Math.PI / 180));
            var z = Math.sin(zDeg * (Math.PI / 180));
            this.pannerNode.setPosition(x, 0, z);

            this.$emit('panChange', {index:this.trackIndex,pan:pan});
        },
       
        // load the specified sound
        loadSound() {
            var request = new XMLHttpRequest();
            request.onerror = (e) => {
              EventBus.$emit("track_load_error", this.url);
            };
            request.open('GET', this.url, true);
            request.responseType = 'arraybuffer';

            // When loaded decode the data
            request.onload = () => { 
                // decode the data
                this.context.decodeAudioData(request.response, (buffer) => { // sound loaded
                    EventBus.$emit("pcm_data_loaded", {buffer:buffer, index:this.trackIndex});
                    // when the audio is decoded play the sound
                    this.buffer=buffer;
                    EventBus.$emit(this.mixerVars.instance_id+'track_loaded', this.buffer.duration);
                    this.setupAudioNodes();

                }, this.onError);
            };
            request.send();
        },
       
        playSound(playfrom) {

            if(playfrom === undefined)
                playfrom = 0;

            this.setupAudioNodes();


            this.sourceNode.start(0,playfrom/1000);

        },

        stopSound() {
            this.sourceNode.stop(0);
        },
     
        // log if an error occurs
        onError(e) {
            console.log(e);
        },

        getAverageVolume(array) {
            var values = 0;
            var average;
     
            var length = array.length;
     
            // get all the frequency amplitudes
            for (var i = 0; i < length; i++) {
                values += array[i];
            }
     
            average = values / length;
            return average;
        },


        setupAudioNodes() {
     


            // create a buffer source node
            this.sourceNode = this.context.createBufferSource();

            this.sourceNode.buffer = this.buffer;

           


           // this.sourceNode.loop = false; // false to stop looping
          //  this.sourceNode.muted = false; 


           // this.sourceNode.playbackRate.value = 1;

            // setup a analyzers
            this.leftAnalyser = this.context.createAnalyser();
            this.leftAnalyser.smoothingTimeConstant = 0.6;
            this.leftAnalyser.fftSize = 1024;
     
            this.rightAnalyser = this.context.createAnalyser();
            this.rightAnalyser.smoothingTimeConstant = 0.6;
            this.rightAnalyser.fftSize = 1024;



            // Create a gain node.
            this.gainNode = this.context.createGain();

            // Create a panner node.
            this.pannerNode = this.context.createPanner();
            this.pannerNode.panningModel = "equalpower";
            
            // setup a javascript node

            // create splitter
            this.splitter = this.context.createChannelSplitter(2);



            // connect everything together
            this.pannerNode.connect(this.splitter);
            this.gainNode.connect(this.pannerNode);
            this.scriptProcessorNode.connect(this.gainNode);
            this.sourceNode.connect(this.gainNode);
            this.splitter.connect(this.leftAnalyser,0,0);
            this.splitter.connect(this.rightAnalyser,1,0);
            this.pannerNode.connect(this.output);


            //this.leftAnalyser.connect(this.scriptProcessorNode);


            // initial values
            // 

            let mutedBySolo = this.mutedBySolo;
            this.mutedBySolo = false;
            this.mutedByMute = false;
           
            this.gainNode.gain.value = this.gainValue;
            this.changeGain(this.gainValue);

            this.muteChange(this.muted, mutedBySolo);

            this.changePan(this.pan);



            this.sourceNode.onended = () => {
              this.onended();
            };

            this.loaded = true;
          
        },


        onended()
        {

            // disconnect everything
            this.scriptProcessorNode.disconnect();
            this.sourceNode.disconnect();
            this.gainNode.disconnect();
            this.pannerNode.disconnect();
            this.leftAnalyser.disconnect();
            this.rightAnalyser.disconnect();
            this.splitter.disconnect();

            if(this.playFrom)
                EventBus.$emit(this.mixerVars.instance_id+'play', this.playFrom);

            EventBus.$emit(this.mixerVars.instance_id+'ended',this._uid);

        },

        

      }
    };

    function render$6(_ctx, _cache, $props, $setup, $data, $options) {
      const _component_Channel = resolveComponent("Channel");

      return (_ctx.loaded)
        ? (openBlock(), createBlock(_component_Channel, {
            key: 0,
            index: _ctx._uid,
            trackIndex: $props.trackIndex,
            title: $props.title,
            defaultPan: _ctx.pan,
            defaultMuted: _ctx.muted,
            defaultGain: $props.defaultGain,
            onGainChange: $options.changeGain,
            onMuteChange: $options.muteChange,
            onSoloChange: $options.soloChange,
            onPanChange: $options.changePan,
            leftAnalyser: _ctx.leftAnalyser,
            rightAnalyser: _ctx.rightAnalyser,
            scriptProcessorNode: _ctx.scriptProcessorNode,
            showMute: true,
            mixerVars: $props.mixerVars
          }, null, 8 /* PROPS */, ["index", "trackIndex", "title", "defaultPan", "defaultMuted", "defaultGain", "onGainChange", "onMuteChange", "onSoloChange", "onPanChange", "leftAnalyser", "rightAnalyser", "scriptProcessorNode", "mixerVars"]))
        : createCommentVNode("v-if", true)
    }

    script$6.render = render$6;
    script$6.__file = "src/components/MixerChannel.vue";

    var script$5 = {
      name: 'timedisplay',
      props: [
          'progressTime',
          'totalTime',
          'mixerVars'
      ],
      data : function(){       
          return {
          };
      },
      computed:{

        showMins()
        {
          return this.totalTime > 61000;
        },

        totalLength(){
          return this.formatTime(this.totalTime);
        },

        progressFormatted(){
          return this.formatTime(this.progressTime);
        },
      },
      methods:{
         formatTime(millis){
            //        let hours = Math.floor(millis / 36e5);
            let  mins = Math.floor((millis % 36e5) / 6e4);
            let  secs = Math.floor((millis % 6e4) / 1000);
            let  mill = Math.floor(millis % 1000);

            if(!this.showMins){ // if 60 seconds or less, don't show minutes
              var returns = [0,this.pad(secs+(mins*60),2),this.pad(mill, 2).substring(2, 0)];
            }else {
              var returns = [this.pad(mins,2),this.pad(secs,2),this.pad(mill, 2).substring(2, 0)];
            }

            return returns;
        },
        /* PAD 
        * pad string with leading zeros
        */
        pad: function(str, max) {
            str = str.toString();
            return str.length < max ? this.pad("0" + str, max) : str;
        },
      }



    };

    const _hoisted_1$5 = { class: "vue-audio-mixer-timer" };
    const _hoisted_2$4 = {
      key: 0,
      class: "vue-audio-mixer-timer-number"
    };
    const _hoisted_3$4 = { key: 1 };
    const _hoisted_4$3 = { class: "vue-audio-mixer-timer-number" };
    const _hoisted_5$2 = /*#__PURE__*/createTextVNode(":");
    const _hoisted_6 = { class: "vue-audio-mixer-timer-number" };
    const _hoisted_7 = { key: 2 };
    const _hoisted_8 = {
      key: 3,
      class: "total"
    };
    const _hoisted_9 = { key: 0 };
    const _hoisted_10 = /*#__PURE__*/createTextVNode(":");

    function render$5(_ctx, _cache, $props, $setup, $data, $options) {
      return (openBlock(), createElementBlock("div", _hoisted_1$5, [
        createBaseVNode("span", {
          class: normalizeClass(["vue-audio-mixer-progress-time", {'vue-audio-mixer-show-total-time':$props.mixerVars.show_total_time}])
        }, [
          ($options.showMins)
            ? (openBlock(), createElementBlock("span", _hoisted_2$4, toDisplayString($options.progressFormatted[0]), 1 /* TEXT */))
            : createCommentVNode("v-if", true),
          ($options.showMins)
            ? (openBlock(), createElementBlock("span", _hoisted_3$4, ":"))
            : createCommentVNode("v-if", true),
          createBaseVNode("span", _hoisted_4$3, toDisplayString($options.progressFormatted[1]), 1 /* TEXT */),
          _hoisted_5$2,
          createBaseVNode("span", _hoisted_6, toDisplayString($options.progressFormatted[2]), 1 /* TEXT */),
          ($props.mixerVars.show_total_time)
            ? (openBlock(), createElementBlock("span", _hoisted_7, " / "))
            : createCommentVNode("v-if", true),
          ($props.mixerVars.show_total_time)
            ? (openBlock(), createElementBlock("span", _hoisted_8, [
                ($options.showMins)
                  ? (openBlock(), createElementBlock("span", _hoisted_9, toDisplayString($options.totalLength[0]) + ":", 1 /* TEXT */))
                  : createCommentVNode("v-if", true),
                createBaseVNode("span", null, toDisplayString($options.totalLength[1]), 1 /* TEXT */),
                _hoisted_10,
                createBaseVNode("span", null, toDisplayString($options.totalLength[2]), 1 /* TEXT */)
              ]))
            : createCommentVNode("v-if", true)
        ], 2 /* CLASS */)
      ]))
    }

    script$5.render = render$5;
    script$5.__file = "src/components/TimeDisplay.vue";

    var script$4 = {
      name: 'progressbar',
      props: [
          'progressPercent',
          'mixerVars',
          'tracks',
          'recording'
      ],
      created(){
        this.waveFormLastGenerated = new Date();
        window.addEventListener('mousemove',this.doDrag);
        window.addEventListener("mouseup", this.triggerMouseUpEvent);
        window.addEventListener("touchend", this.triggerMouseUpEvent);
        EventBus.$on('pcm_data_loaded',this.addWavelengthPointData);
        EventBus.$on('loaded',this.create);
      },
      beforeDestroy() {
        window.removeEventListener('mousemove',this.doDrag);
        window.removeEventListener("mouseup", this.triggerMouseUpEvent);
        window.removeEventListener("touchend", this.triggerMouseUpEvent);
      },
      data : function(){       
          return {
            progress:0,
            dragging:false,
            restart:false,
            pcmData:[],
            rightData:[],

            canvas:null,
            dpr:null,
            padding:null,
            ctx:null,
            canvasWidth:0,
            canvasHeight:0,

            waveformDataPoints:[],
            regenerate_pcm_data:false,
            waveformPadding:20,
            reduced_pcm_data:[],
            max_length:0,
            newPCMdata:[]
          };
      },
      watch: {

        tracks: {
          // This will let Vue know to look inside the array
          deep: true,

          // We have to move our method to a handler field
          handler(){
          // only allow the canvas to be refreshed once every 1 seconds max
           clearTimeout(this.regenerate_pcm_data);
            this.regenerate_pcm_data = setTimeout(() => {
                this.convertPCMDataToWaveform();
            }, 100);
          }
        },

        progressPercent: function(newVal){
          if(this.$refs['vue-audio-mixer-progress-bar'] && !this.dragging)
            this.progress =  (this.$refs['vue-audio-mixer-progress-bar'].offsetWidth/100) * newVal;
        },

        progress:function()
        {
          this.drawWaveform(); 
        }

      },
      computed:{
        totalLength(){
          return this.formatTime(this.totalTime);
        },

        progressFormatted(){
          return this.formatTime(this.progressTime);
        },

        progressBarPosition()
        {
          return this.progress+'px';
        }

        
      },
      methods:{

        create(loaded){
          if(loaded){
            if(!this.canvas){
              this.$nextTick(() => {
                this.reducePCMData();
              });
            }
          }

        },

        // normalize the waveform data so it appears as big as possible
        normalizeData(filteredData) {
          const multiplier = Math.pow(Math.max(...filteredData), -1);
          return filteredData.map(n => n * multiplier);
        },

        // Fraws the waveform
        drawWaveformLineSegment (ctx, x, y, width, isEven) {

          let halfway = this.canvasHeight / 2;


          ctx.lineWidth = 1; // how thick the line is

          if(this.progress*this.dpr > x){
            if(this.recording){
              ctx.strokeStyle = isEven ?  "#8c0d0d" : "#bf1111"; // what color our line is
            }else {
              ctx.strokeStyle = isEven ?  "#38fedd" : "#99ffee"; // what color our line is
            }
          }else {
            ctx.strokeStyle = isEven ?  "#a3a3a3" : "#d9d9d9"; // what color our line is
          }

          

          ctx.beginPath();
          y = isEven ? y : -y;

          y = halfway +y;

          ctx.moveTo(x, halfway);
          ctx.lineTo(x, y);
          ctx.stroke();
        },

        // returns the loudness of an array of PCM data
        getAmps(buffer)
        {

          var rms = 0;

          for (var i = 0; i < buffer.length; i++) {
            rms += buffer[i] * buffer[i];
          }

          rms /= buffer.length;
          rms = Math.sqrt(rms);
     
          return rms;

        },

        // splits array into chunks
        chunkArray(arr, size)
        {
          return Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
            arr.slice(i * size, i * size + size)
          );
        },


        // convert PCM data to waveform data points
        convertPCMDataToWaveform()
        {

        

          this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
          this.ctx.fillStyle="#303030";
          // create background to meters
          this.ctx.fillRect(0,0,this.canvasWidth,this.canvasHeight);

          let finalData = [];

          for (let i = 0; i < this.reduced_pcm_data.length; i++){
            for (let d = 0; d < this.reduced_pcm_data[i].data.length; d++){
              if(finalData[d] === undefined){
                finalData.push(0);
              }
              // timex value by current gain and mute
              let track_value = this.tracks[this.reduced_pcm_data[i].index].muted ? 0 : (this.reduced_pcm_data[i].data[d] * this.tracks[this.reduced_pcm_data[i].index].gain);
              finalData[d] = finalData[d] + track_value;
            }
          }        

          let normalizedData = this.filterData(finalData);
          normalizedData = this.normalizeData(normalizedData);

          this.waveformDataPoints = normalizedData;
          this.drawWaveform();

        },

        // draws the waveform
        drawWaveform(){

          let normalizedData = this.waveformDataPoints;

          // draw the line segments
          const width = this.canvasWidth;

          for (let i = 0; i < normalizedData.length; i++) {
            const x = i;
            let height = normalizedData[i] * ((this.canvasHeight-this.waveformPadding)/2);
            this.drawWaveformLineSegment(this.ctx, x, height, width, i%2 == 0);
          }

        },

        createCanvas()
        {

           // Set up the canvas
          this.canvas = document.getElementById('vue-audio-mixer-waveform');
          this.dpr = window.devicePixelRatio || 1;
          this.padding = 20;
          this.canvasWidth = this.$refs['vue-audio-mixer-progress-bar'].offsetWidth * this.dpr;
          this.canvas.width = this.canvasWidth;
          this.canvas.height = 100;
          this.canvasHeight = this.canvas.offsetHeight * this.dpr;
          this.ctx = this.canvas.getContext("2d");
        },

        // filters data so we only have the correct number of data points to the number of pixesl in the canvas
        filterData(rawData)
        {
          const samples = this.canvasWidth; // Number of samples we want to have in our final data set
          const blockSize = rawData.length / samples; // Number of samples in each subdivision
          const filteredData = [];
          for (let i = 0; i < samples; i++) {
            let index = rawData[Math.ceil(i * blockSize)];
            if(index !== undefined)
              filteredData.push(rawData[Math.ceil(i * blockSize)]); 
          }
          return filteredData;
        },


        /**
         * Reduced the PCM data to the ammount of pixels in the canvas
         */

        reducePCMData(data)
        {

          if(!this.canvas){
            this.createCanvas();
          }


          // the number of pcm data parts we want to analyse per pixel
          let chunk_size = Math.floor(this.max_length/this.canvasWidth);
          for (let i = 0; i < this.pcmData.length; i++){

            // split data into chunk sizes
            let newArray = this.chunkArray(this.pcmData[i].data,chunk_size);
            // make an array of the amps of each track for each pixel
            let finalData = [];
            for (let c = 0; c < newArray.length; c++){
              let amps = this.tracks[this.pcmData[i].index].muted ? 0 : (this.getAmps(newArray[c]) * this.tracks[this.pcmData[i].index].gain);
              if(finalData[c] === undefined){
                finalData.push(0);
              }
              finalData[c] =  finalData[c] + amps;
            }
            // create new data array with reduced data
            this.reduced_pcm_data.push({data:finalData, index:this.pcmData[i].index});

          }
          this.pcmData = []; // remove this massive data from the storage

          this.convertPCMDataToWaveform();

        },

        
        /*
        * Called when a new audio source is loaded. Adds the PCM data to the array
        *
        * Raw buffer data is massive, so we need to reduce this down before using it
        *
        **/
        
        addWavelengthPointData(raw){


          var channels = 2;
          let finalData = [];

          for (var channel = 0; channel < channels; channel++) {

            // get the raw buffer data
            let buffer = raw.buffer.getChannelData(channel);

            // chunk this into chunks of 1000 points
            let newArray = this.chunkArray(buffer,1000);

            // make an array of the amps of each track for each chunk
            for (let c = 0; c < newArray.length; c++){
              if(finalData[c] === undefined){
                finalData.push(0);
              }
              finalData[c] =  finalData[c] + this.getAmps(newArray[c]);
            }
          }

          // Calculates the most data points there is
          if(finalData.length > this.max_length)
              this.max_length = finalData.length;

          this.pcmData.push({data:finalData,index:raw.index});

        },

        startDrag(e){
          this.dragging = true;
          this.progressBarClick(e);
        },

        doDrag(e){
          if(this.dragging)
            this.progressBarClick(e);
        },

        triggerMouseUpEvent(e){
          let doIt = this.dragging ? true : false;
          this.dragging = false;
          if(doIt)
            this.progressBarClick(e, true);
        },

        progressBarClick(e, fdsa)
        {

          // can't click while recording
          if(this.recording)
            return;

          let target = this.$refs['vue-audio-mixer-progress-bar'];
          var rect = target.getBoundingClientRect();
          var x = e.clientX - rect.left; //x position within the element.
          var percent = (100/target.offsetWidth) * x;

          percent = Math.round(percent);

          if(percent < 0 || percent > 100)
            return false;
           // only if mouse inside box


          if(!this.dragging)
            this.$emit('percent', percent);
          else
            this.progress = Math.round(x);

        }
      }



    };

    const _hoisted_1$4 = /*#__PURE__*/createBaseVNode("canvas", {
      width: "0",
      height: "20",
      id: "vue-audio-mixer-waveform"
    }, null, -1 /* HOISTED */);

    function render$4(_ctx, _cache, $props, $setup, $data, $options) {
      return (openBlock(), createElementBlock("div", null, [
        createBaseVNode("div", {
          class: "vue-audio-mixer-progress-bar",
          ref: "vue-audio-mixer-progress-bar",
          onMousedown: _cache[0] || (_cache[0] = (...args) => ($options.startDrag && $options.startDrag(...args)))
        }, [
          _hoisted_1$4,
          createBaseVNode("div", {
            class: "vue-audio-mixer-progress-cursor",
            style: normalizeStyle({left: $options.progressBarPosition})
          }, null, 4 /* STYLE */)
        ], 544 /* HYDRATE_EVENTS, NEED_PATCH */)
      ]))
    }

    script$4.render = render$4;
    script$4.__file = "src/components/ProgressBar.vue";

    var script$3 = {
      name: 'transportbuttons',
      props: [
          'playing'
      ],
      data : function(){       
          return {
          };
      },

    };

    const _hoisted_1$3 = { class: "vue-audio-mixer-transport" };
    const _hoisted_2$3 = /*#__PURE__*/createBaseVNode("span", null, null, -1 /* HOISTED */);
    const _hoisted_3$3 = /*#__PURE__*/createBaseVNode("span", null, null, -1 /* HOISTED */);
    const _hoisted_4$2 = [
      _hoisted_2$3,
      _hoisted_3$3
    ];

    function render$3(_ctx, _cache, $props, $setup, $data, $options) {
      return (openBlock(), createElementBlock("div", _hoisted_1$3, [
        createBaseVNode("button", {
          type: "button",
          class: normalizeClass(["vue-audio-mixer-transport-play-button", {'vue-audio-mixer-transport-play-button-active':$props.playing}]),
          onClick: _cache[0] || (_cache[0] = $event => (_ctx.$emit('togglePlay')))
        }, _hoisted_4$2, 2 /* CLASS */),
        createBaseVNode("button", {
          type: "button",
          class: "vue-audio-mixer-transport-start-button",
          onClick: _cache[1] || (_cache[1] = $event => (_ctx.$emit('stop')))
        })
      ]))
    }

    script$3.render = render$3;
    script$3.__file = "src/components/TransportButtons.vue";

    var script$2 = {
      name: 'loader',
      props: [
          'percentLoaded'
      ],
      data : function(){       
          return {
          };
      }

    };

    const _hoisted_1$2 = { class: "vue-audio-mixer-loader" };
    const _hoisted_2$2 = { class: "vue-audio-mixer-loader-text" };
    const _hoisted_3$2 = /*#__PURE__*/createTextVNode("Loading... ");
    const _hoisted_4$1 = /*#__PURE__*/createTextVNode("%");
    const _hoisted_5$1 = /*#__PURE__*/createBaseVNode("div", { class: "vue-audio-mixer-loader-inner" }, [
      /*#__PURE__*/createBaseVNode("div"),
      /*#__PURE__*/createBaseVNode("div")
    ], -1 /* HOISTED */);

    function render$2(_ctx, _cache, $props, $setup, $data, $options) {
      return (openBlock(), createElementBlock("div", _hoisted_1$2, [
        createBaseVNode("p", _hoisted_2$2, [
          _hoisted_3$2,
          createBaseVNode("span", null, toDisplayString($props.percentLoaded), 1 /* TEXT */),
          _hoisted_4$1
        ]),
        _hoisted_5$1
      ]))
    }

    script$2.render = render$2;
    script$2.__file = "src/components/Loader.vue";

    function commonjsRequire(path) {
    	throw new Error('Could not dynamically require "' + path + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
    }

    var recorder = {exports: {}};

    (function (module, exports) {
      (function (f) {
        {
          module.exports = f();
        }
      })(function () {
        return function e(t, n, r) {
          function s(o, u) {
            if (!n[o]) {
              if (!t[o]) {
                var a = typeof commonjsRequire == "function" && commonjsRequire;
                if (!u && a) return a(o, !0);
                if (i) return i(o, !0);
                var f = new Error("Cannot find module '" + o + "'");
                throw f.code = "MODULE_NOT_FOUND", f;
              }

              var l = n[o] = {
                exports: {}
              };
              t[o][0].call(l.exports, function (e) {
                var n = t[o][1][e];
                return s(n ? n : e);
              }, l, l.exports, e, t, n, r);
            }

            return n[o].exports;
          }

          var i = typeof commonjsRequire == "function" && commonjsRequire;

          for (var o = 0; o < r.length; o++) s(r[o]);

          return s;
        }({
          1: [function (require, module, exports) {

            module.exports = require("./recorder").Recorder;
          }, {
            "./recorder": 2
          }],
          2: [function (require, module, exports) {

            var _createClass = function () {
              function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                  var descriptor = props[i];
                  descriptor.enumerable = descriptor.enumerable || false;
                  descriptor.configurable = true;
                  if ("value" in descriptor) descriptor.writable = true;
                  Object.defineProperty(target, descriptor.key, descriptor);
                }
              }

              return function (Constructor, protoProps, staticProps) {
                if (protoProps) defineProperties(Constructor.prototype, protoProps);
                if (staticProps) defineProperties(Constructor, staticProps);
                return Constructor;
              };
            }();

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            exports.Recorder = undefined;

            var _inlineWorker = require('inline-worker');

            var _inlineWorker2 = _interopRequireDefault(_inlineWorker);

            function _interopRequireDefault(obj) {
              return obj && obj.__esModule ? obj : {
                default: obj
              };
            }

            function _classCallCheck(instance, Constructor) {
              if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
              }
            }

            var Recorder = exports.Recorder = function () {
              function Recorder(source, cfg) {
                var _this = this;

                _classCallCheck(this, Recorder);

                this.config = {
                  bufferLen: 4096,
                  numChannels: 2,
                  mimeType: 'audio/wav'
                };
                this.recording = false;
                this.callbacks = {
                  getBuffer: [],
                  exportWAV: []
                };
                Object.assign(this.config, cfg);
                this.context = source.context;
                this.node = (this.context.createScriptProcessor || this.context.createJavaScriptNode).call(this.context, this.config.bufferLen, this.config.numChannels, this.config.numChannels);

                this.node.onaudioprocess = function (e) {
                  if (!_this.recording) return;
                  var buffer = [];

                  for (var channel = 0; channel < _this.config.numChannels; channel++) {
                    buffer.push(e.inputBuffer.getChannelData(channel));
                  }

                  _this.worker.postMessage({
                    command: 'record',
                    buffer: buffer
                  });
                };

                source.connect(this.node);
                this.node.connect(this.context.destination); //this should not be necessary

                var self = {};
                this.worker = new _inlineWorker2.default(function () {
                  var recLength = 0,
                      recBuffers = [],
                      sampleRate = undefined,
                      numChannels = undefined;

                  self.onmessage = function (e) {
                    switch (e.data.command) {
                      case 'init':
                        init(e.data.config);
                        break;

                      case 'record':
                        record(e.data.buffer);
                        break;

                      case 'exportWAV':
                        exportWAV(e.data.type);
                        break;

                      case 'getBuffer':
                        getBuffer();
                        break;

                      case 'clear':
                        clear();
                        break;
                    }
                  };

                  function init(config) {
                    sampleRate = config.sampleRate;
                    numChannels = config.numChannels;
                    initBuffers();
                  }

                  function record(inputBuffer) {
                    for (var channel = 0; channel < numChannels; channel++) {
                      recBuffers[channel].push(inputBuffer[channel]);
                    }

                    recLength += inputBuffer[0].length;
                  }

                  function exportWAV(type) {
                    var buffers = [];

                    for (var channel = 0; channel < numChannels; channel++) {
                      buffers.push(mergeBuffers(recBuffers[channel], recLength));
                    }

                    var interleaved = undefined;

                    if (numChannels === 2) {
                      interleaved = interleave(buffers[0], buffers[1]);
                    } else {
                      interleaved = buffers[0];
                    }

                    var dataview = encodeWAV(interleaved);
                    var audioBlob = new Blob([dataview], {
                      type: type
                    });
                    self.postMessage({
                      command: 'exportWAV',
                      data: audioBlob
                    });
                  }

                  function getBuffer() {
                    var buffers = [];

                    for (var channel = 0; channel < numChannels; channel++) {
                      buffers.push(mergeBuffers(recBuffers[channel], recLength));
                    }

                    self.postMessage({
                      command: 'getBuffer',
                      data: buffers
                    });
                  }

                  function clear() {
                    recLength = 0;
                    recBuffers = [];
                    initBuffers();
                  }

                  function initBuffers() {
                    for (var channel = 0; channel < numChannels; channel++) {
                      recBuffers[channel] = [];
                    }
                  }

                  function mergeBuffers(recBuffers, recLength) {
                    var result = new Float32Array(recLength);
                    var offset = 0;

                    for (var i = 0; i < recBuffers.length; i++) {
                      result.set(recBuffers[i], offset);
                      offset += recBuffers[i].length;
                    }

                    return result;
                  }

                  function interleave(inputL, inputR) {
                    var length = inputL.length + inputR.length;
                    var result = new Float32Array(length);
                    var index = 0,
                        inputIndex = 0;

                    while (index < length) {
                      result[index++] = inputL[inputIndex];
                      result[index++] = inputR[inputIndex];
                      inputIndex++;
                    }

                    return result;
                  }

                  function floatTo16BitPCM(output, offset, input) {
                    for (var i = 0; i < input.length; i++, offset += 2) {
                      var s = Math.max(-1, Math.min(1, input[i]));
                      output.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
                    }
                  }

                  function writeString(view, offset, string) {
                    for (var i = 0; i < string.length; i++) {
                      view.setUint8(offset + i, string.charCodeAt(i));
                    }
                  }

                  function encodeWAV(samples) {
                    var buffer = new ArrayBuffer(44 + samples.length * 2);
                    var view = new DataView(buffer);
                    /* RIFF identifier */

                    writeString(view, 0, 'RIFF');
                    /* RIFF chunk length */

                    view.setUint32(4, 36 + samples.length * 2, true);
                    /* RIFF type */

                    writeString(view, 8, 'WAVE');
                    /* format chunk identifier */

                    writeString(view, 12, 'fmt ');
                    /* format chunk length */

                    view.setUint32(16, 16, true);
                    /* sample format (raw) */

                    view.setUint16(20, 1, true);
                    /* channel count */

                    view.setUint16(22, numChannels, true);
                    /* sample rate */

                    view.setUint32(24, sampleRate, true);
                    /* byte rate (sample rate * block align) */

                    view.setUint32(28, sampleRate * 4, true);
                    /* block align (channel count * bytes per sample) */

                    view.setUint16(32, numChannels * 2, true);
                    /* bits per sample */

                    view.setUint16(34, 16, true);
                    /* data chunk identifier */

                    writeString(view, 36, 'data');
                    /* data chunk length */

                    view.setUint32(40, samples.length * 2, true);
                    floatTo16BitPCM(view, 44, samples);
                    return view;
                  }
                }, self);
                this.worker.postMessage({
                  command: 'init',
                  config: {
                    sampleRate: this.context.sampleRate,
                    numChannels: this.config.numChannels
                  }
                });

                this.worker.onmessage = function (e) {
                  var cb = _this.callbacks[e.data.command].pop();

                  if (typeof cb == 'function') {
                    cb(e.data.data);
                  }
                };
              }

              _createClass(Recorder, [{
                key: 'record',
                value: function record() {
                  this.recording = true;
                }
              }, {
                key: 'stop',
                value: function stop() {
                  this.recording = false;
                }
              }, {
                key: 'clear',
                value: function clear() {
                  this.worker.postMessage({
                    command: 'clear'
                  });
                }
              }, {
                key: 'getBuffer',
                value: function getBuffer(cb) {
                  cb = cb || this.config.callback;
                  if (!cb) throw new Error('Callback not set');
                  this.callbacks.getBuffer.push(cb);
                  this.worker.postMessage({
                    command: 'getBuffer'
                  });
                }
              }, {
                key: 'exportWAV',
                value: function exportWAV(cb, mimeType) {
                  mimeType = mimeType || this.config.mimeType;
                  cb = cb || this.config.callback;
                  if (!cb) throw new Error('Callback not set');
                  this.callbacks.exportWAV.push(cb);
                  this.worker.postMessage({
                    command: 'exportWAV',
                    type: mimeType
                  });
                }
              }], [{
                key: 'forceDownload',
                value: function forceDownload(blob, filename) {
                  var url = (window.URL || window.webkitURL).createObjectURL(blob);
                  var link = window.document.createElement('a');
                  link.href = url;
                  link.download = filename || 'output.wav';
                  var click = document.createEvent("Event");
                  click.initEvent("click", true, true);
                  link.dispatchEvent(click);
                }
              }]);

              return Recorder;
            }();

            exports.default = Recorder;
          }, {
            "inline-worker": 3
          }],
          3: [function (require, module, exports) {

            module.exports = require("./inline-worker");
          }, {
            "./inline-worker": 4
          }],
          4: [function (require, module, exports) {
            (function (global) {

              var _createClass = function () {
                function defineProperties(target, props) {
                  for (var key in props) {
                    var prop = props[key];
                    prop.configurable = true;
                    if (prop.value) prop.writable = true;
                  }

                  Object.defineProperties(target, props);
                }

                return function (Constructor, protoProps, staticProps) {
                  if (protoProps) defineProperties(Constructor.prototype, protoProps);
                  if (staticProps) defineProperties(Constructor, staticProps);
                  return Constructor;
                };
              }();

              var _classCallCheck = function (instance, Constructor) {
                if (!(instance instanceof Constructor)) {
                  throw new TypeError("Cannot call a class as a function");
                }
              };

              var WORKER_ENABLED = !!(global === global.window && global.URL && global.Blob && global.Worker);

              var InlineWorker = function () {
                function InlineWorker(func, self) {
                  var _this = this;

                  _classCallCheck(this, InlineWorker);

                  if (WORKER_ENABLED) {
                    var functionBody = func.toString().trim().match(/^function\s*\w*\s*\([\w\s,]*\)\s*{([\w\W]*?)}$/)[1];
                    var url = global.URL.createObjectURL(new global.Blob([functionBody], {
                      type: "text/javascript"
                    }));
                    return new global.Worker(url);
                  }

                  this.self = self;

                  this.self.postMessage = function (data) {
                    setTimeout(function () {
                      _this.onmessage({
                        data: data
                      });
                    }, 0);
                  };

                  setTimeout(function () {
                    func.call(self);
                  }, 0);
                }

                _createClass(InlineWorker, {
                  postMessage: {
                    value: function postMessage(data) {
                      var _this = this;

                      setTimeout(function () {
                        _this.self.onmessage({
                          data: data
                        });
                      }, 0);
                    }
                  }
                });

                return InlineWorker;
              }();

              module.exports = InlineWorker;
            }).call(this, typeof commonjsGlobal !== "undefined" ? commonjsGlobal : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
          }, {}]
        }, {}, [1])(1);
      });
    })(recorder);

    var Recorder = /*@__PURE__*/getDefaultExportFromCjs(recorder.exports);

    var script$1 = {
      name: 'app',

      props: {
        theme:{
          String, 
          default:'default'
        },
        config: Object,
        size: {
          type: String,
          default:'medium'
        },
        showPan: {
          type: Boolean,
          default:true
        },
        showTotalTime:{
          type: Boolean,
          default:true
        }
      },
      components: {
        MixerChannel: script$6,
        Channel: script$7,
        Loader: script$2,
        TimeDisplay: script$5,
        TransportButtons: script$3,
        ProgressBar: script$4
      },
      data : function(){       
          return {
            context                    : false,
            gainNode                   : false,
            scriptProcessorNode        : false,
            leftAnalyser               : false,
            rightAnalyser              : false,
            splitter                   : false,
            masterPanValue             : 0,
            masterGainValue            : 1,
            masterMuted                : false,
            totalDuration              : 0,
            startedAt                  : 0,
            currentTime                : 0,
            timelineWidth              : 0,
            playing                    : false,
            pausedAt                   : 0,
            dragging                   : false,
            restart                    : false,
            overRideProgressBarPosition: false,
            progressBarPosition        : 0,
            tracks                     : [],
            solodTracks                : [],
            tracksLoaded               : 0,
            recorder                   : null,
            recording                  :false,
            track_load_error           : false
          };
      },
      created(){


        this.currentTime =  Date.now();
        this.startedAt = this.currentTime;

        this.checkConfig();


        var AudioContext = window.AudioContext // Default
        || window.webkitAudioContext // Safari and old versions of Chrome
        || false; 

        this.context            = new AudioContext;
        this.gainNode           = this.context.createGain();
        this.gainNode.connect(this.context.destination);
        this.scriptProcessorNode = this.context.createScriptProcessor(2048, 1, 1);
        this.setupAudioNodes();
        EventBus.$on(this.mixerVars.instance_id+'track_loaded', this.trackLoaded);
        EventBus.$on(this.mixerVars.instance_id+'stop', this.stopped);
        EventBus.$on(this.mixerVars.instance_id+'play', this.started);
        EventBus.$on(this.mixerVars.instance_id+'soloChange', this.detectedSoloChange);

        EventBus.$on('track_load_error',this.trackLoadError);

        setInterval(() => {
          if(this.playing)
            this.currentTime =  Date.now();
        }, 1);

      },

      beforeDestroy() {
        EventBus.$off(this.mixerVars.instance_id+'soloChange',this.detectedSoloChange);
        EventBus.$off(this.mixerVars.instance_id+'track_loaded',this.trackLoaded);
        EventBus.$off(this.mixerVars.instance_id+'stop',this.stopped);
        EventBus.$off(this.mixerVars.instance_id+'play',this.started);
      },

      watch: {
        progressPercent: function(newVal){
          if(newVal >= 100)
             EventBus.$emit(this.mixerVars.instance_id+'stop');
        },

        loading(newVal) {
          EventBus.$emit('loaded',!newVal);
          this.$emit('loaded',!newVal);
        },

        trackSettings(newVal)
        {
          this.$emit('input',newVal);
        }

        
      },

      computed: {

        visibleTracks(){

          return this.tracks.filter(t => !t.hidden);

        },

        mixerWidth()
        {

          if(this.track_load_error){
            return '500px';
          }


          let width = 69; // channel width of medium
          if(this.mixerVars.theme_size == 'Small'){
            width = 51; // channel width of small
          }
          return (width*(this.visibleTracks.length+1))+'px';

        },

        mixerVars()
        {
          return {
            'theme_size'     : this.themeSize,
            'theme_colour'     : this.theme,
            'instance_id'    : this._uid,
            'show_pan'       : this.showPan,
            'show_total_time': this.showTotalTime
          }
        },

        trackClass()
        {

          return 'vue-audio-mixer-theme-tracks-'+this.tracks.length;

        },

        themeClassColour(){
          return 'vue-audio-mixer-theme-'+this.theme;
        },

        themeClassSize() {
          let className = 'vue-audio-mixer-theme-'+(this.themeSize.toLowerCase());
          let toReturn = {};
          toReturn[className] = true;
          return toReturn;
        },

        themeSize()
        {
          if(this.size && this.size.toLowerCase() == 'small'){
            return 'Small'
          }

          return 'Medium'
        },

        // the starter config for the current settings
        trackSettings()
        {

          return {
            tracks: this.tracks,
            master:{
              "pan":parseFloat(this.masterPanValue),
              "gain":parseFloat(this.masterGainValue),
              "muted":this.masterMuted
            }
          };

        },

        progress(){
          return this.currentTime - this.startedAt;
        },

        progressPercent(){
          return (100/this.totalDuration)*(this.progress);
        },

        loading(){
          return this.tracksLoaded == 0 || this.tracksLoaded < this.tracks.length;
        },

        loadingPercent(){
          return ((100/this.tracks.length)*this.tracksLoaded).toFixed(2);
        }

      
      },

      methods: {

        trackLoadError(track_url)
        {

          this.track_load_error = track_url;

        },

        saveAudioMix(){
            this.stop();
            this.recording = true;
            this.recorder = new Recorder(this.pannerNode);
            this.play();
            this.recorder.record();
            this.stopMix();
        },

        stopMix() {
          setTimeout(() => {
            this.stopRecording();
         }, this.totalDuration);
        },

        stopRecording(){

          if(this.recording){
            this.recording = false;
            this.stop();
            this.recorder.exportWAV((blob) => {
                var a = document.createElement("a");
                document.body.appendChild(a);
                a.style = "display: none";
                let url = window.URL.createObjectURL(blob);
                a.href = url;
                a.download = 'mix.wav';
                a.click();
                window.URL.revokeObjectURL(url);
            });
          }
        },

        detectedSoloChange(track)
        {
            let index = this.solodTracks.indexOf(track.index);
            if (index > -1) {
              if(!track.solo)
                this.solodTracks.splice(index, 1);
            }else {
              if(track.solo)
                this.solodTracks.push(track.index);
            }
        },

        playFromPercent(percent){

          if(this.playing){
            this.restart = true;
            EventBus.$emit(this.mixerVars.instance_id+'stop');
          }

          this.currentTime =  Date.now();
          this.pausedAt =  (this.totalDuration/100) * percent;
          this.startedAt = this.currentTime - this.pausedAt;

          if(this.restart)
            setTimeout( () => { EventBus.$emit(this.mixerVars.instance_id+'play',this.pausedAt); }, 10);

          this.restart = false;
        },


        checkConfig(){

          let json = this.config;

          if(json){
            this.tracks          = json.tracks;
            this.masterPanValue  = json.master.pan;
            this.masterGainValue = json.master.gain;
            this.masterMuted     = json.master.muted;
          }


        },


        started(){
          this.overRideProgressBarPosition = false;
          this.playing = true;
        },

        stopped(){
          this.playing = false;
        },

        pause()
        {

          // stop if already playing
          if(this.playing){
            this.stopRecording();
            this.pausedAt = this.progress;
            EventBus.$emit(this.mixerVars.instance_id+'stop');
          }

        },

        play()
        {
          if(this.playing)
            this.pause();

          this.doPlay();

          
          
        },
        doPlay(){

          if(this.progressPercent >= 100){ // it's at the end, so restart
            this.playing = true;
            this.playFromPercent(0);
          }else {
            this.startedAt = Date.now() - this.progress;
            EventBus.$emit(this.mixerVars.instance_id+'play',this.pausedAt);      
          }

        },





        togglePlay()
        {

          if(this.playing){
            this.pause();
          }else {
            this.doPlay();
          }
          
        },

        stop()
        {
          if(!this.playing){
            this.stopRecording();
          }

          if(this.playing){
            this.pause();
          }
          
          this.pausedAt = 0;

          if(!this.playing){
            this.startedAt = this.currentTime;
            EventBus.$emit(this.mixerVars.instance_id+'stop');
          }
        },

        trackLoaded(duration){

          this.tracksLoaded++;


        

          duration = duration*1000;

          if(duration > this.totalDuration){
            this.totalDuration = duration;
          }

        },


        changeGain(value){
          this.tracks[value.index].gain = parseFloat(value.gain);
        },

        changePan(value){
          //TODO fix this.tracks[value.index].pan = parseFloat(value.pan);
          this.tracks[value.index].pan = parseFloat(0);
        },

        changeMute(value){
          this.tracks[value.index].muted = value.muted;
        },

        changeSolo(value){

        },

     

        /************************************************************
        *
        * Master channel controls
        *
        *************************************************************/

        changeMasterMute(value){
          if(value){
            this.masterGainValue = this.gainNode.gain.value; // store gain value
            this.gainNode.gain.value = 0; // mute the gain node
            this.masterMuted = true;
          }
          else {
            this.masterMuted = false;
            this.gainNode.gain.value = this.masterGainValue; // restore previous gain value
          }

        },

         // Master Gain

        changeMasterGain(gain)
        {
          this.masterGainValue = gain;
          if(!this.masterMuted)
            this.gainNode.gain.value = gain;
        },

        // Master Pan

        changeMasterPan(pan) {
          var xDeg = parseInt(pan);
          var zDeg = xDeg + 90;
          if (zDeg > 90) {
            zDeg = 180 - zDeg;
          }
          var x = Math.sin(xDeg * (Math.PI / 180));
          var z = Math.sin(zDeg * (Math.PI / 180));
          this.pannerNode.setPosition(x, 0, z);

          this.masterPanValue = pan;
        },

        // Master Audio Nodes

        setupAudioNodes() {


            // setup a analyzers
            this.leftAnalyser = this.context.createAnalyser();
            this.leftAnalyser.smoothingTimeConstant = 0.3;
            this.leftAnalyser.fftSize = 1024;
     
            this.rightAnalyser = this.context.createAnalyser();
            this.rightAnalyser.smoothingTimeConstant = 0.0;
            this.rightAnalyser.fftSize = 1024;

            // Create a gain node.
            this.gainNode = this.context.createGain();

            // Create a panner node.
            this.pannerNode = this.context.createPanner();
            this.pannerNode.panningModel = "equalpower";
            
            // create splitter
            this.splitter = this.context.createChannelSplitter();

            // connect everything together
            this.scriptProcessorNode.connect(this.gainNode);
            this.gainNode.connect(this.pannerNode);
            this.pannerNode.connect(this.splitter);
            this.splitter.connect(this.leftAnalyser,0,0);
            this.splitter.connect(this.rightAnalyser,1,0);
           // this.leftAnalyser.connect(this.scriptProcessorNode);
            this.pannerNode.connect(this.context.destination);

            // initial values
            this.changeMasterGain(this.masterGainValue);
            this.changeMasterPan(this.masterPanValue);
           // this.changeMasterMute(this.masterMuted);

        },

       

      }

    };

    const _hoisted_1$1 = {
      key: 0,
      class: "vue-audio-mixer-error"
    };
    const _hoisted_2$1 = { class: "vue-audio-mixer-loading-hider" };
    const _hoisted_3$1 = {
      class: "vue-audio-mixer-channel-strip",
      ref: "channelstrip"
    };
    const _hoisted_4 = { class: "time_and_transport" };
    const _hoisted_5 = { class: "text-center" };

    function render$1(_ctx, _cache, $props, $setup, $data, $options) {
      const _component_Loader = resolveComponent("Loader");
      const _component_MixerChannel = resolveComponent("MixerChannel");
      const _component_Channel = resolveComponent("Channel");
      const _component_ProgressBar = resolveComponent("ProgressBar");
      const _component_TimeDisplay = resolveComponent("TimeDisplay");
      const _component_TransportButtons = resolveComponent("TransportButtons");

      return (openBlock(), createElementBlock("div", {
        class: normalizeClass(["vue-audio-mixer", [$options.themeClassSize, $options.themeClassColour, $options.trackClass]]),
        style: normalizeStyle({ width: $options.mixerWidth })
      }, [
        (_ctx.track_load_error)
          ? (openBlock(), createElementBlock("p", _hoisted_1$1, "Track " + toDisplayString(_ctx.track_load_error) + " failed to load. Check that the track is hosted on the same domain as the mixer, or that CORS is enabled on the track's hosting service.", 1 /* TEXT */))
          : ($options.loading)
            ? (openBlock(), createBlock(_component_Loader, {
                key: 1,
                percentLoaded: $options.loadingPercent
              }, null, 8 /* PROPS */, ["percentLoaded"]))
            : createCommentVNode("v-if", true),
        withDirectives(createBaseVNode("div", _hoisted_2$1, [
          createBaseVNode("div", _hoisted_3$1, [
            createBaseVNode("div", null, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.tracks, (track, index) => {
                return withDirectives((openBlock(), createBlock(_component_MixerChannel, {
                  title: track.title,
                  defaultPan: track.pan,
                  hidden: track.hidden,
                  defaultGain: track.gain,
                  defaultMuted: track.muted,
                  context: _ctx.context,
                  output: _ctx.gainNode,
                  url: track.url,
                  key: index,
                  solodTracks: _ctx.solodTracks,
                  trackIndex: index,
                  onPanChange: $options.changePan,
                  onGainChange: $options.changeGain,
                  onMuteChange: $options.changeMute,
                  onSoloChange: $options.changeSolo,
                  mixerVars: $options.mixerVars
                }, null, 8 /* PROPS */, ["title", "defaultPan", "hidden", "defaultGain", "defaultMuted", "context", "output", "url", "solodTracks", "trackIndex", "onPanChange", "onGainChange", "onMuteChange", "onSoloChange", "mixerVars"])), [
                  [vShow, !track.hidden]
                ])
              }), 128 /* KEYED_FRAGMENT */)),
              createCommentVNode(" master channel "),
              createVNode(_component_Channel, {
                title: "Master",
                defaultPan: _ctx.masterPanValue,
                defaultGain: _ctx.masterGainValue,
                defaultMuted: _ctx.masterMuted,
                onMuteChange: $options.changeMasterMute,
                onGainChange: $options.changeMasterGain,
                onPanChange: $options.changeMasterPan,
                leftAnalyser: _ctx.leftAnalyser,
                rightAnalyser: _ctx.rightAnalyser,
                scriptProcessorNode: _ctx.scriptProcessorNode,
                showMute: false,
                isMaster: true,
                mixerVars: $options.mixerVars
              }, null, 8 /* PROPS */, ["defaultPan", "defaultGain", "defaultMuted", "onMuteChange", "onGainChange", "onPanChange", "leftAnalyser", "rightAnalyser", "scriptProcessorNode", "mixerVars"])
            ]),
            createVNode(_component_ProgressBar, {
              recording: _ctx.recording,
              progressPercent: $options.progressPercent,
              onPercent: $options.playFromPercent,
              mixerVars: $options.mixerVars,
              tracks: _ctx.tracks
            }, null, 8 /* PROPS */, ["recording", "progressPercent", "onPercent", "mixerVars", "tracks"]),
            createBaseVNode("div", _hoisted_4, [
              createVNode(_component_TimeDisplay, {
                progressTime: $options.progress,
                totalTime: _ctx.totalDuration,
                mixerVars: $options.mixerVars
              }, null, 8 /* PROPS */, ["progressTime", "totalTime", "mixerVars"]),
              createVNode(_component_TransportButtons, {
                playing: _ctx.playing,
                onStop: $options.stop,
                onTogglePlay: $options.togglePlay,
                mixerVars: $options.mixerVars
              }, null, 8 /* PROPS */, ["playing", "onStop", "onTogglePlay", "mixerVars"])
            ])
          ], 512 /* NEED_PATCH */),
          createBaseVNode("div", _hoisted_5, [
            createBaseVNode("button", {
              onClick: _cache[0] || (_cache[0] = (...args) => ($options.saveAudioMix && $options.saveAudioMix(...args))),
              class: normalizeClass(["vue-audio-mixer-download-mix", {'recording':_ctx.recording}])
            }, "Record and download mix", 2 /* CLASS */)
          ])
        ], 512 /* NEED_PATCH */), [
          [vShow, !$options.loading]
        ])
      ], 6 /* CLASS, STYLE */))
    }

    script$1.render = render$1;
    script$1.__file = "src/components/Mixer.vue";

    function styleInject(css, ref) {
      if ( ref === void 0 ) ref = {};
      var insertAt = ref.insertAt;

      if (!css || typeof document === 'undefined') { return; }

      var head = document.head || document.getElementsByTagName('head')[0];
      var style = document.createElement('style');
      style.type = 'text/css';

      if (insertAt === 'top') {
        if (head.firstChild) {
          head.insertBefore(style, head.firstChild);
        } else {
          head.appendChild(style);
        }
      } else {
        head.appendChild(style);
      }

      if (style.styleSheet) {
        style.styleSheet.cssText = css;
      } else {
        style.appendChild(document.createTextNode(css));
      }
    }

    var css_248z$1 = "@import url(\"https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap\");\n@import url(\"https://fonts.googleapis.com/css2?family=Open+Sans&display=swap\");\n.vue-audio-mixer-channel-label {\n  line-height: 0.6rem;\n  font-size: 0.55rem;\n  display: table;\n  padding: 2px;\n  margin-top: 5px;\n  width: 100%;\n  height: 30px;\n  overflow: hidden;\n  clear: both;\n  float: left;\n  color: #FFFFFF;\n  text-align: center;\n  border: none;\n  box-sizing: border-box;\n  overflow: hidden; }\n  .vue-audio-mixer-channel-label label {\n    word-wrap: break-word;\n    display: table-cell;\n    vertical-align: middle;\n    word-break: break-word; }\n\n.logo {\n  position: absolute;\n  top: 10px;\n  left: 5px;\n  right: 5px; }\n  .logo img {\n    width: 100%; }\n\n.vue-audio-mixer-channel-strip {\n  background: transparent !important;\n  background: #16191c;\n  position: relative;\n  overflow: auto;\n  display: block;\n  opacity: 1;\n  display: inline-block; }\n\n.vue-audio-mixer-theme-small .vue-audio-mixer-channel {\n  margin-right: 1px;\n  width: 40px; }\n\n.vue-audio-mixer-theme-medium .vue-audio-mixer-channel {\n  margin-right: 2px;\n  width: 57px; }\n\n.with-panner {\n  margin-top: 40px; }\n\n.vue-audio-mixer-channel {\n  height: 245px;\n  padding: 5px;\n  padding-top: 41px;\n  box-sizing: content-box;\n  position: relative;\n  float: left;\n  display: block; }\n  .vue-audio-mixer-channel:last-child {\n    margin-right: 0px; }\n    .vue-audio-mixer-channel:last-child .vue-audio-mixer-channel-label {\n      background: #000 !important; }\n\n.vue-audio-mixer-channel-slider {\n  right: 17px;\n  top: 40px;\n  display: block;\n  float: left;\n  -ms-transform: rotate(270deg);\n  /* IE 9 */\n  -webkit-transform: rotate(270deg);\n  /* Chrome, Safari, Opera */\n  transform: rotate(270deg);\n  position: absolute;\n  transform-origin: right; }\n\n.vue-audio-mixer-theme-small .vue-audio-mixer-channel-meter-canvas {\n  margin-right: 40px; }\n\n.vue-audio-mixer-theme-medium .vue-audio-mixer-channel-meter-canvas {\n  margin-right: 57px; }\n\n.vue-audio-mixer-channel-meter-canvas {\n  margin-left: 2px;\n  display: block;\n  float: left; }\n\n@keyframes rotate {\n  0% {\n    -webkit-transform: rotate(0deg) scale(1);\n    transform: rotate(0deg) scale(1); }\n  50% {\n    -webkit-transform: rotate(180deg) scale(0.6);\n    transform: rotate(180deg) scale(0.6); }\n  100% {\n    -webkit-transform: rotate(360deg) scale(1);\n    transform: rotate(360deg) scale(1); } }\n\n@-webkit-keyframes ball-scale-ripple {\n  0% {\n    -webkit-transform: scale(0.1);\n    transform: scale(0.1);\n    opacity: 1; }\n  70% {\n    -webkit-transform: scale(1);\n    transform: scale(1);\n    opacity: 0.7; }\n  100% {\n    opacity: 0.0; } }\n\n@keyframes ball-scale-ripple {\n  0% {\n    -webkit-transform: scale(0.1);\n    transform: scale(0.1);\n    opacity: 1; }\n  70% {\n    -webkit-transform: scale(1);\n    transform: scale(1);\n    opacity: 0.7; }\n  100% {\n    opacity: 0.0; } }\n\n.vue-audio-mixer-loader-inner {\n  position: relative; }\n\n.vue-audio-mixer-loader-inner > div {\n  -webkit-animation-fill-mode: both;\n  animation-fill-mode: both;\n  position: absolute;\n  left: -20px;\n  top: -20px;\n  border: 2px solid #1d7a9c;\n  border-bottom-color: transparent;\n  border-top-color: transparent;\n  border-radius: 100%;\n  height: 35px;\n  width: 35px;\n  -webkit-animation: rotate 1s 0s ease-in-out infinite;\n  animation: rotate 1s 0s ease-in-out infinite; }\n\n.vue-audio-mixer-loader-inner > div:last-child {\n  display: inline-block;\n  top: -10px;\n  left: -10px;\n  width: 15px;\n  height: 15px;\n  -webkit-animation-duration: 0.5s;\n  animation-duration: 0.5s;\n  border-color: #00a7cc transparent #00a7cc transparent;\n  -webkit-animation-direction: reverse;\n  animation-direction: reverse; }\n\n.vue-audio-mixer-loader {\n  width: 100%;\n  height: 100px;\n  position: relative; }\n\n.vue-audio-mixer-loader-inner {\n  margin: 0 auto;\n  width: 1px; }\n\n.vue-audio-mixer-loader-text {\n  color: #1d7a9c;\n  text-align: center;\n  width: 100%;\n  font-size: 0.7em;\n  position: relative;\n  top: 50%; }\n\n.vue-audio-mixer {\n  display: inline-block;\n  min-width: 105px;\n  overflow: auto;\n  margin: 0 auto;\n  font-family: 'Open Sans', sans-serif;\n  text-align: center; }\n  .vue-audio-mixer * {\n    -webkit-touch-callout: none;\n    -webkit-user-select: none;\n    /* Disable selection/copy in UIWebView */ }\n\n.vue-audio-mixer-error {\n  color: red;\n  background-color: white; }\n\n.vue-audio-mixer-loading-hider {\n  display: inline-block; }\n\n#vue-audio-mixer-waveform {\n  width: 100% !important;\n  display: block; }\n\n.vue-audio-mixer-download-mix {\n  cursor: pointer;\n  background-color: #bf1111;\n  border-radius: 5px;\n  color: white;\n  padding: 5px;\n  margin: 5px;\n  outline: 0 !important; }\n  .vue-audio-mixer-download-mix.recording {\n    background-color: #fc9595;\n    animation: anim-glow 2s ease infinite;\n    -webkit-animation: anim-glow 2s ease infinite;\n    -moz-animation: anim-glow 2s ease infinite; }\n\n@keyframes anim-glow {\n  0% {\n    box-shadow: 0 0 #bf1111; }\n  100% {\n    box-shadow: 0 0 10px 8px transparent;\n    border-width: 2px; } }\n\n* {\n  box-sizing: content-box; }\n\n.vue-audio-mixer-channel-mute-button, .vue-audio-mixer-channel-solo-button {\n  position: absolute;\n  left: 2px;\n  top: 5px;\n  cursor: pointer; }\n\n.vue-audio-mixer-theme-small .vue-audio-mixer-channel-solo-button {\n  left: 25px; }\n\n.vue-audio-mixer-theme-medium .vue-audio-mixer-channel-solo-button {\n  left: 35px; }\n\n.vue-audio-mixer-channel-mute-button-label, .vue-audio-mixer-channel-solo-button-label {\n  width: 18px;\n  text-align: center;\n  cursor: pointer; }\n\n.vue-audio-mixer-channel-mute-button label input, .vue-audio-mixer-channel-solo-button label input {\n  display: none; }\n\n.vue-audio-mixer-channel-mute-button, .vue-audio-mixer-channel-solo-button {\n  margin: 4px;\n  background-color: #666B73;\n  border-radius: 4px;\n  border: 1px solid #000;\n  overflow: auto;\n  float: left;\n  box-sizing: content-box; }\n\n.vue-audio-mixer-channel-mute-button label, .vue-audio-mixer-channel-solo-button label {\n  float: left;\n  margin-bottom: 0;\n  box-sizing: content-box; }\n\n.vue-audio-mixer-theme-small .vue-audio-mixer-channel-mute-button label span, .vue-audio-mixer-theme-small .vue-audio-mixer-channel-solo-button label span {\n  width: 8px;\n  font-size: 7px; }\n\n.vue-audio-mixer-theme-medium .vue-audio-mixer-channel-mute-button label span, .vue-audio-mixer-theme-medium .vue-audio-mixer-channel-solo-button label span {\n  width: 14px;\n  font-size: 12px; }\n\n.vue-audio-mixer-channel-mute-button label span, .vue-audio-mixer-channel-solo-button label span {\n  text-align: center;\n  padding: 3px;\n  width: 8px;\n  display: block;\n  border-radius: 4px;\n  box-sizing: content-box; }\n\n.vue-audio-mixer-channel-mute-button label input, .vue-audio-mixer-channel-solo-button label input {\n  position: absolute;\n  top: -20px; }\n\n.vue-audio-mixer-channel-mute-button input:hover + span, .vue-audio-mixer-channel-solo-button input:hover + span {\n  opacity: 0.8; }\n\n.vue-audio-mixer-channel-mute-button input:checked + span {\n  background-color: #911;\n  color: #FFF; }\n\n.vue-audio-mixer-channel-solo-button input:checked + span {\n  background-color: #1cdd20;\n  color: #FFF; }\n\n.vue-audio-mixer-channel-mute-button input:checked:hover + span, .vue-audio-mixer-channel-solo-button input:checked:hover + span {\n  opacity: 0.8;\n  color: #FFF; }\n\n.vue-audio-mixer-channel-panner-container {\n  top: -37px;\n  left: 0;\n  position: absolute;\n  width: 100%;\n  padding-left: 12px;\n  box-sizing: border-box; }\n\n.vue-audio-mixer-theme-small .vue-audio-mixer-channel-panner-container {\n  top: -27px; }\n  .vue-audio-mixer-theme-small .vue-audio-mixer-channel-panner-container .knob-control__text-display {\n    font-size: 1.5rem; }\n\n.vue-audio-mixer-channel-panner {\n  width: 19px;\n  height: 10px;\n  margin-top: 2px;\n  border: 0px;\n  background: none;\n  font: bold 7px Arial;\n  text-align: center;\n  color: white;\n  padding: 0px;\n  -webkit-appearance: none;\n  cursor: pointer; }\n\n.vue-audio-mixer-fader-thumb {\n  touch-action: none; }\n\n.vue-audio-mixer-slider {\n  height: 210px;\n  position: absolute;\n  width: 50%;\n  right: 0px; }\n\n.vue-audio-mixer-fader-slider-row, .vue-audio-mixer-fader-slider-row-right {\n  position: absolute;\n  width: 100%;\n  background: black;\n  height: 1px;\n  width: 4px;\n  left: 50%;\n  margin-left: -10px; }\n\n.vue-audio-mixer-fader-slider-row-right {\n  margin-left: 4px; }\n\n.vue-audio-mixer-fader-slider-track {\n  position: absolute;\n  height: 90%;\n  background: black;\n  width: 2px;\n  margin-left: -2px;\n  left: 50%;\n  margin-top: 1rem; }\n\n.vue-audio-mixer-fader-thumb {\n  position: absolute;\n  z-index: 1;\n  border: none;\n  height: 3rem;\n  width: 1.5rem;\n  left: 50%;\n  margin-left: -0.75rem;\n  margin-top: -2rem;\n  border-radius: 0px;\n  cursor: move;\n  user-select: none;\n  background: repeating-linear-gradient(0deg, transparent, transparent 5px, black 6px), linear-gradient(0deg, #464646 0%, #5a5a5a 14%, #141414 15%, #141414 50%, #5a5a5a 84%, #141414 85%, #1e1e1e 100%);\n  box-shadow: 0 0.25rem 0.5rem 0 rgba(0, 0, 0, 0.5); }\n  .vue-audio-mixer-fader-thumb:after {\n    content: '';\n    position: absolute;\n    top: 50%;\n    left: 0;\n    right: 0;\n    margin-top: -1px;\n    height: 3px;\n    background: rgba(255, 255, 255, 0.75); }\n\n.slider_value {\n  position: absolute;\n  right: 10px;\n  top: 37px;\n  font-size: 10px; }\n\n.waveform {\n  width: 100%; }\n\n.vue-audio-mixer-progress-bar {\n  margin-top: 1px;\n  background: #4c4c4c;\n  position: relative;\n  display: block;\n  clear: both;\n  overflow: auto;\n  cursor: pointer; }\n\n.vue-audio-mixer-progress-cursor {\n  width: 1px;\n  height: 100%;\n  background: #b6c8e1;\n  position: absolute;\n  left: 0;\n  top: 0; }\n\n.time_and_transport {\n  position: relative;\n  width: 100%;\n  background: #000; }\n\n.vue-audio-mixer-transport {\n  overflow: auto;\n  clear: both;\n  display: block;\n  text-align: right;\n  width: 150px;\n  height: 30px;\n  overflow: hidden;\n  position: relative;\n  margin: 0 auto 0 auto;\n  position: absolute;\n  top: 2px;\n  padding-left: 10px; }\n\n.vue-audio-mixer-theme-tracks-1 .vue-audio-mixer-progress-time, .vue-audio-mixer-theme-tracks-2 .vue-audio-mixer-progress-time, .vue-audio-mixer-theme-tracks-3.vue-audio-mixer-theme-small .vue-audio-mixer-progress-time, .vue-audio-mixer-theme-tracks-4.vue-audio-mixer-theme-small .vue-audio-mixer-progress-time {\n  width: 100%;\n  text-align: right !important; }\n\n.vue-audio-mixer-theme-tracks-1 .vue-audio-mixer-timer, .vue-audio-mixer-theme-tracks-2 .vue-audio-mixer-timer {\n  font-size: 0.7em; }\n  .vue-audio-mixer-theme-tracks-1 .vue-audio-mixer-timer .vue-audio-mixer-timer-number, .vue-audio-mixer-theme-tracks-2 .vue-audio-mixer-timer .vue-audio-mixer-timer-number {\n    width: 13px; }\n\n.vue-audio-mixer-theme-tracks-3 .vue-audio-mixer-show-total-time {\n  font-size: 0.7em; }\n  .vue-audio-mixer-theme-tracks-3 .vue-audio-mixer-show-total-time .vue-audio-mixer-timer-number {\n    width: 13px; }\n\n.vue-audio-mixer-timer {\n  font-family: \"Share Tech Mono\";\n  color: #fff;\n  font-size: 1em;\n  padding: 10px;\n  overflow: auto;\n  position: relative;\n  display: block;\n  clear: both;\n  background: #000;\n  text-align: right;\n  margin: 0px; }\n  .vue-audio-mixer-timer span {\n    display: inline-block;\n    text-align: left; }\n    .vue-audio-mixer-timer span .vue-audio-mixer-timer-number {\n      width: 18px; }\n  .vue-audio-mixer-timer .vue-audio-mixer-progress-time {\n    width: 100%;\n    text-align: center; }\n\nbutton {\n  border: none;\n  padding: 0;\n  background: transparent; }\n\n.vue-audio-mixer-transport-play-button {\n  cursor: pointer;\n  display: block;\n  width: 0;\n  float: left;\n  height: 0;\n  border-top: 8px solid transparent;\n  border-bottom: 8px solid transparent;\n  border-left: 9.6px solid #d5d5d5;\n  margin: 8px auto 30px auto;\n  position: relative;\n  z-index: 1;\n  transition: all 0.1s;\n  -webkit-transition: all 0.1s;\n  -moz-transition: all 0.1s;\n  left: 48px;\n  position: relative; }\n  .vue-audio-mixer-transport-play-button:focus, .vue-audio-mixer-transport-play-button:active {\n    outline: none; }\n  .vue-audio-mixer-transport-play-button:before {\n    content: '';\n    position: absolute;\n    top: -12px;\n    left: -18.4px;\n    bottom: -12px;\n    right: -5.6px;\n    border-radius: 50%;\n    border: 2px solid #d5d5d5;\n    z-index: -1;\n    transition: all 0.1s;\n    -webkit-transition: all 0.1s;\n    -moz-transition: all 0.1s; }\n  .vue-audio-mixer-transport-play-button:after {\n    content: '';\n    opacity: 0;\n    transition: opacity 0.2s;\n    -webkit-transition: opacity 0.2s;\n    -moz-transition: opacity 0.2s;\n    z-index: 2; }\n  .vue-audio-mixer-transport-play-button:hover:before, .vue-audio-mixer-transport-play-button:focus:before {\n    transform: scale(1.1);\n    -webkit-transform: scale(1.1);\n    -moz-transform: scale(1.1); }\n  .vue-audio-mixer-transport-play-button.vue-audio-mixer-transport-play-button-active {\n    border-color: transparent; }\n    .vue-audio-mixer-transport-play-button.vue-audio-mixer-transport-play-button-active span:nth-child(1), .vue-audio-mixer-transport-play-button.vue-audio-mixer-transport-play-button-active span:nth-child(2) {\n      content: '';\n      opacity: 1;\n      width: 1.14286px;\n      height: 12.8px;\n      background: #d5d5d5;\n      position: absolute;\n      right: 0.8px;\n      top: -6.4px;\n      border-left: 3.2px solid #d5d5d5; }\n    .vue-audio-mixer-transport-play-button.vue-audio-mixer-transport-play-button-active span:nth-child(1) {\n      right: 0.8px; }\n    .vue-audio-mixer-transport-play-button.vue-audio-mixer-transport-play-button-active span:nth-child(2) {\n      right: 7.2px; }\n\n.vue-audio-mixer-transport-start-button {\n  outline: none;\n  display: block;\n  float: left;\n  margin-left: 5px;\n  width: 0;\n  height: 0;\n  border-top: 8px solid transparent;\n  border-bottom: 8px solid transparent;\n  border-right: 9.6px solid #d5d5d5;\n  margin: 8px auto 8px auto;\n  position: relative;\n  z-index: 1;\n  cursor: pointer;\n  transition: all 0.1s;\n  -webkit-transition: all 0.1s;\n  -moz-transition: all 0.1s; }\n  .vue-audio-mixer-transport-start-button:before {\n    content: '';\n    position: absolute;\n    top: -12px;\n    left: -7.2px;\n    bottom: -12px;\n    right: -16.8px;\n    border-radius: 50%;\n    border: 2px solid #d5d5d5;\n    z-index: 2;\n    transition: all 0.1s;\n    -webkit-transition: all 0.1s;\n    -moz-transition: all 0.1s; }\n  .vue-audio-mixer-transport-start-button:after {\n    content: \"\";\n    display: block;\n    position: absolute;\n    width: 2px;\n    height: 10px;\n    background: #d5d5d5;\n    margin-top: -5px;\n    margin-left: -2px; }\n  .vue-audio-mixer-transport-start-button:hover:before, .vue-audio-mixer-transport-start-button:focus:before {\n    transform: scale(1.1);\n    -webkit-transform: scale(1.1);\n    -moz-transform: scale(1.1); }\n\n.vue-audio-mixer-transport-record-button {\n  display: block;\n  width: 0;\n  float: left;\n  height: 0;\n  border: 4px solid #d5d5d5;\n  border-radius: 75%;\n  margin: 50px auto 30px auto;\n  position: relative;\n  z-index: 1;\n  transition: all 0.1s;\n  -webkit-transition: all 0.1s;\n  -moz-transition: all 0.1s;\n  left: 125px; }\n  .vue-audio-mixer-transport-record-button:before {\n    content: '';\n    position: absolute;\n    top: -12px;\n    left: -30px;\n    bottom: -12px;\n    right: -30px;\n    border-radius: 50%;\n    border: 2px solid #d5d5d5;\n    z-index: 2;\n    transition: all 0.1s;\n    -webkit-transition: all 0.1s;\n    -moz-transition: all 0.1s; }\n  .vue-audio-mixer-transport-record-button:after {\n    content: '';\n    opacity: 0;\n    transition: opacity 0.2s;\n    -webkit-transition: opacity 0.2s;\n    -moz-transition: opacity 0.2s; }\n  .vue-audio-mixer-transport-record-button:hover:before, .vue-audio-mixer-transport-record-button:focus:before {\n    transform: scale(1.1);\n    -webkit-transform: scale(1.1);\n    -moz-transform: scale(1.1); }\n  .vue-audio-mixer-transport-record-button.vue-audio-mixer-transport-record-button-active {\n    border-color: red; }\n\n.vue-audio-mixer-theme-default .slider_value {\n  color: #000; }\n\n.vue-audio-mixer-theme-dark .slider_value {\n  color: #C0C0C0; }\n\n.vue-audio-mixer-theme-default .vue-audio-mixer-channel-label {\n  background: #4ba7b7; }\n\n.vue-audio-mixer-theme-dark .vue-audio-mixer-channel-label {\n  background: #27547B; }\n\n.vue-audio-mixer-theme-default .vue-audio-mixer-channel {\n  background: rgba(41, 44, 48, 0.2); }\n\n.vue-audio-mixer-theme-dark .vue-audio-mixer-channel {\n  background: #282D30; }\n\n.vue-audio-mixer-theme-default .vue-audio-mixer-channel-panner-container {\n  background: rgba(41, 44, 48, 0.2); }\n\n.vue-audio-mixer-theme-dark .vue-audio-mixer-channel-panner-container {\n  background: #282D30; }\n\n.vue-audio-mixer-theme-default .vue-audio-mixer-channel:last-child {\n  background: #4ba7b7; }\n\n.vue-audio-mixer-theme-dark .vue-audio-mixer-channel:last-child {\n  background: #383F44; }\n\n.vue-audio-mixer-theme-default .vue-audio-mixer-channel-panner-container.vue-audio-mixer-is-master {\n  background: #4ba7b7; }\n\n.vue-audio-mixer-theme-dark .vue-audio-mixer-channel-panner-container.vue-audio-mixer-is-master {\n  background: #383F44; }\n";
    styleInject(css_248z$1);

    var script = {
        name: 'app',
        components: {
            VueAudioMixer: script$1,
        },
        data: function() {
            return {
                is_loaded: false,
                newConfig: null,
                config: {
                    tracks: [
                        {
                            title: 'Bass',
                            url: 'https://audiomixer.io/stems/bass.mp3',
                            pan: -30,
                            gain: 1.2,
                            muted: false,
                            hidden: false,
                        },
                        {
                            title: 'Flutes',
                            url: 'https://audiomixer.io/stems/flutes.mp3',
                            pan: 73,
                            gain: 0.9,
                            muted: false,
                            hidden: false,
                        },
                        {
                            title: 'Perc',
                            url: 'https://audiomixer.io/stems/perc.mp3',
                            pan: 26,
                            gain: 0.85,
                            muted: false,
                            hidden: false,
                        },
                        {
                            title: 'Piano',
                            url: 'https://audiomixer.io/stems/piano.mp3',
                            pan: 10,
                            gain: 1.2,
                            muted: false,
                            hidden: false,
                        },
                        {
                            title: 'Strings',
                            url: 'https://audiomixer.io/stems/strings.mp3',
                            pan: -49,
                            gain: 0.9,
                            muted: false,
                            hidden: false,
                        },
                    ],
                    master: {
                        pan: 0,
                        gain: 0.3,
                        muted: false,
                    },
                },
            };
        },
        created() {
            this.newConfig = this.config;
        },

        beforeDestroy() {},
        methods: {
            loadedChange(loaded) {
                this.is_loaded = loaded;
            },

            setConfig(newVal) {
                this.newConfig = newVal;
            },

            // accepts json string
            // returns pretyyprinted json
            syntaxHighlight(json) {
                if (typeof json != 'string') {
                    json = JSON.stringify(json, undefined, 2);
                }
                json = json
                    .replace(/&/g, '&amp;')
                    .replace(/</g, '&lt;')
                    .replace(/>/g, '&gt;');
                return json.replace(
                    /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
                    function(match) {
                        var cls = 'number';
                        if (/^"/.test(match)) {
                            if (/:$/.test(match)) {
                                cls = 'key';
                            } else {
                                cls = 'string';
                            }
                        } else if (/true|false/.test(match)) {
                            cls = 'boolean';
                        } else if (/null/.test(match)) {
                            cls = 'null';
                        }
                        return '<span class="' + cls + '">' + match + '</span>';
                    }
                );
            },
        },

        computed: {},
    };

    const _hoisted_1 = { style: {"text-align":"center"} };
    const _hoisted_2 = { style: {"position":"relative","display":"inline-block"} };
    const _hoisted_3 = ["innerHTML"];

    function render(_ctx, _cache, $props, $setup, $data, $options) {
      const _component_vue_audio_mixer = resolveComponent("vue-audio-mixer");

      return (openBlock(), createElementBlock("div", null, [
        createBaseVNode("div", _hoisted_1, [
          createBaseVNode("div", _hoisted_2, [
            createVNode(_component_vue_audio_mixer, {
              config: _ctx.config,
              size: "medium",
              theme: "dark",
              onLoaded: $options.loadedChange,
              onInput: $options.setConfig,
              showPan: true,
              showTotalTime: true
            }, null, 8 /* PROPS */, ["config", "onLoaded", "onInput"])
          ])
        ]),
        createBaseVNode("pre", {
          innerHTML: $options.syntaxHighlight(_ctx.newConfig)
        }, null, 8 /* PROPS */, _hoisted_3)
      ]))
    }

    var css_248z = "";
    styleInject(css_248z);

    script.render = render;
    script.__file = "example/Demo.vue";

    createApp(script).mount("#app");

})();
