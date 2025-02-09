(function () {
  'use strict';

  /*!
   * Vue.js v2.7.16
   * (c) 2014-2023 Evan You
   * Released under the MIT License.
   */
  var emptyObject = Object.freeze({});
  var isArray$1 = Array.isArray;
  // These helpers produce better VM code in JS engines due to their
  // explicitness and function inlining.
  function isUndef(v) {
      return v === undefined || v === null;
  }
  function isDef(v) {
      return v !== undefined && v !== null;
  }
  function isTrue(v) {
      return v === true;
  }
  function isFalse(v) {
      return v === false;
  }
  /**
   * Check if value is primitive.
   */
  function isPrimitive(value) {
      return (typeof value === 'string' ||
          typeof value === 'number' ||
          // $flow-disable-line
          typeof value === 'symbol' ||
          typeof value === 'boolean');
  }
  function isFunction$1(value) {
      return typeof value === 'function';
  }
  /**
   * Quick object check - this is primarily used to tell
   * objects from primitive values when we know the value
   * is a JSON-compliant type.
   */
  function isObject$1(obj) {
      return obj !== null && typeof obj === 'object';
  }
  /**
   * Get the raw type string of a value, e.g., [object Object].
   */
  var _toString = Object.prototype.toString;
  /**
   * Strict object type check. Only returns true
   * for plain JavaScript objects.
   */
  function isPlainObject$1(obj) {
      return _toString.call(obj) === '[object Object]';
  }
  function isRegExp$1(v) {
      return _toString.call(v) === '[object RegExp]';
  }
  /**
   * Check if val is a valid array index.
   */
  function isValidArrayIndex(val) {
      var n = parseFloat(String(val));
      return n >= 0 && Math.floor(n) === n && isFinite(val);
  }
  function isPromise(val) {
      return (isDef(val) &&
          typeof val.then === 'function' &&
          typeof val.catch === 'function');
  }
  /**
   * Convert a value to a string that is actually rendered.
   */
  function toString$1(val) {
      return val == null
          ? ''
          : Array.isArray(val) || (isPlainObject$1(val) && val.toString === _toString)
              ? JSON.stringify(val, replacer, 2)
              : String(val);
  }
  function replacer(_key, val) {
      // avoid circular deps from v3
      if (val && val.__v_isRef) {
          return val.value;
      }
      return val;
  }
  /**
   * Convert an input value to a number for persistence.
   * If the conversion fails, return original string.
   */
  function toNumber(val) {
      var n = parseFloat(val);
      return isNaN(n) ? val : n;
  }
  /**
   * Make a map and return a function for checking if a key
   * is in that map.
   */
  function makeMap(str, expectsLowerCase) {
      var map = Object.create(null);
      var list = str.split(',');
      for (var i = 0; i < list.length; i++) {
          map[list[i]] = true;
      }
      return expectsLowerCase ? function (val) { return map[val.toLowerCase()]; } : function (val) { return map[val]; };
  }
  /**
   * Check if a tag is a built-in tag.
   */
  makeMap('slot,component', true);
  /**
   * Check if an attribute is a reserved attribute.
   */
  var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');
  /**
   * Remove an item from an array.
   */
  function remove$2(arr, item) {
      var len = arr.length;
      if (len) {
          // fast path for the only / last item
          if (item === arr[len - 1]) {
              arr.length = len - 1;
              return;
          }
          var index = arr.indexOf(item);
          if (index > -1) {
              return arr.splice(index, 1);
          }
      }
  }
  /**
   * Check whether an object has the property.
   */
  var hasOwnProperty$1 = Object.prototype.hasOwnProperty;
  function hasOwn(obj, key) {
      return hasOwnProperty$1.call(obj, key);
  }
  /**
   * Create a cached version of a pure function.
   */
  function cached(fn) {
      var cache = Object.create(null);
      return function cachedFn(str) {
          var hit = cache[str];
          return hit || (cache[str] = fn(str));
      };
  }
  /**
   * Camelize a hyphen-delimited string.
   */
  var camelizeRE = /-(\w)/g;
  var camelize = cached(function (str) {
      return str.replace(camelizeRE, function (_, c) { return (c ? c.toUpperCase() : ''); });
  });
  /**
   * Capitalize a string.
   */
  var capitalize = cached(function (str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
  });
  /**
   * Hyphenate a camelCase string.
   */
  var hyphenateRE = /\B([A-Z])/g;
  var hyphenate = cached(function (str) {
      return str.replace(hyphenateRE, '-$1').toLowerCase();
  });
  /**
   * Simple bind polyfill for environments that do not support it,
   * e.g., PhantomJS 1.x. Technically, we don't need this anymore
   * since native bind is now performant enough in most browsers.
   * But removing it would mean breaking code that was able to run in
   * PhantomJS 1.x, so this must be kept for backward compatibility.
   */
  /* istanbul ignore next */
  function polyfillBind(fn, ctx) {
      function boundFn(a) {
          var l = arguments.length;
          return l
              ? l > 1
                  ? fn.apply(ctx, arguments)
                  : fn.call(ctx, a)
              : fn.call(ctx);
      }
      boundFn._length = fn.length;
      return boundFn;
  }
  function nativeBind(fn, ctx) {
      return fn.bind(ctx);
  }
  // @ts-expect-error bind cannot be `undefined`
  var bind$1 = Function.prototype.bind ? nativeBind : polyfillBind;
  /**
   * Convert an Array-like object to a real Array.
   */
  function toArray$1(list, start) {
      start = start || 0;
      var i = list.length - start;
      var ret = new Array(i);
      while (i--) {
          ret[i] = list[i + start];
      }
      return ret;
  }
  /**
   * Mix properties into target object.
   */
  function extend$1(to, _from) {
      for (var key in _from) {
          to[key] = _from[key];
      }
      return to;
  }
  /**
   * Merge an Array of Objects into a single Object.
   */
  function toObject(arr) {
      var res = {};
      for (var i = 0; i < arr.length; i++) {
          if (arr[i]) {
              extend$1(res, arr[i]);
          }
      }
      return res;
  }
  /* eslint-disable no-unused-vars */
  /**
   * Perform no operation.
   * Stubbing args to make Flow happy without leaving useless transpiled code
   * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
   */
  function noop$1(a, b, c) { }
  /**
   * Always return false.
   */
  var no = function (a, b, c) { return false; };
  /* eslint-enable no-unused-vars */
  /**
   * Return the same value.
   */
  var identity = function (_) { return _; };
  /**
   * Check if two values are loosely equal - that is,
   * if they are plain objects, do they have the same shape?
   */
  function looseEqual(a, b) {
      if (a === b)
          return true;
      var isObjectA = isObject$1(a);
      var isObjectB = isObject$1(b);
      if (isObjectA && isObjectB) {
          try {
              var isArrayA = Array.isArray(a);
              var isArrayB = Array.isArray(b);
              if (isArrayA && isArrayB) {
                  return (a.length === b.length &&
                      a.every(function (e, i) {
                          return looseEqual(e, b[i]);
                      }));
              }
              else if (a instanceof Date && b instanceof Date) {
                  return a.getTime() === b.getTime();
              }
              else if (!isArrayA && !isArrayB) {
                  var keysA = Object.keys(a);
                  var keysB = Object.keys(b);
                  return (keysA.length === keysB.length &&
                      keysA.every(function (key) {
                          return looseEqual(a[key], b[key]);
                      }));
              }
              else {
                  /* istanbul ignore next */
                  return false;
              }
          }
          catch (e) {
              /* istanbul ignore next */
              return false;
          }
      }
      else if (!isObjectA && !isObjectB) {
          return String(a) === String(b);
      }
      else {
          return false;
      }
  }
  /**
   * Return the first index at which a loosely equal value can be
   * found in the array (if value is a plain object, the array must
   * contain an object of the same shape), or -1 if it is not present.
   */
  function looseIndexOf(arr, val) {
      for (var i = 0; i < arr.length; i++) {
          if (looseEqual(arr[i], val))
              return i;
      }
      return -1;
  }
  /**
   * Ensure a function is called only once.
   */
  function once(fn) {
      var called = false;
      return function () {
          if (!called) {
              called = true;
              fn.apply(this, arguments);
          }
      };
  }
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is#polyfill
  function hasChanged(x, y) {
      if (x === y) {
          return x === 0 && 1 / x !== 1 / y;
      }
      else {
          return x === x || y === y;
      }
  }

  var SSR_ATTR = 'data-server-rendered';
  var ASSET_TYPES = ['component', 'directive', 'filter'];
  var LIFECYCLE_HOOKS = [
      'beforeCreate',
      'created',
      'beforeMount',
      'mounted',
      'beforeUpdate',
      'updated',
      'beforeDestroy',
      'destroyed',
      'activated',
      'deactivated',
      'errorCaptured',
      'serverPrefetch',
      'renderTracked',
      'renderTriggered'
  ];

  var config = {
      /**
       * Option merge strategies (used in core/util/options)
       */
      // $flow-disable-line
      optionMergeStrategies: Object.create(null),
      /**
       * Whether to suppress warnings.
       */
      silent: false,
      /**
       * Show production mode tip message on boot?
       */
      productionTip: "production" !== 'production',
      /**
       * Whether to enable devtools
       */
      devtools: "production" !== 'production',
      /**
       * Whether to record perf
       */
      performance: false,
      /**
       * Error handler for watcher errors
       */
      errorHandler: null,
      /**
       * Warn handler for watcher warns
       */
      warnHandler: null,
      /**
       * Ignore certain custom elements
       */
      ignoredElements: [],
      /**
       * Custom user key aliases for v-on
       */
      // $flow-disable-line
      keyCodes: Object.create(null),
      /**
       * Check if a tag is reserved so that it cannot be registered as a
       * component. This is platform-dependent and may be overwritten.
       */
      isReservedTag: no,
      /**
       * Check if an attribute is reserved so that it cannot be used as a component
       * prop. This is platform-dependent and may be overwritten.
       */
      isReservedAttr: no,
      /**
       * Check if a tag is an unknown element.
       * Platform-dependent.
       */
      isUnknownElement: no,
      /**
       * Get the namespace of an element
       */
      getTagNamespace: noop$1,
      /**
       * Parse the real tag name for the specific platform.
       */
      parsePlatformTagName: identity,
      /**
       * Check if an attribute must be bound using property, e.g. value
       * Platform-dependent.
       */
      mustUseProp: no,
      /**
       * Perform updates asynchronously. Intended to be used by Vue Test Utils
       * This will significantly reduce performance if set to false.
       */
      async: true,
      /**
       * Exposed for legacy reasons
       */
      _lifecycleHooks: LIFECYCLE_HOOKS
  };

  /**
   * unicode letters used for parsing html tags, component names and property paths.
   * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
   * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
   */
  var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;
  /**
   * Check if a string starts with $ or _
   */
  function isReserved(str) {
      var c = (str + '').charCodeAt(0);
      return c === 0x24 || c === 0x5f;
  }
  /**
   * Define a property.
   */
  function def(obj, key, val, enumerable) {
      Object.defineProperty(obj, key, {
          value: val,
          enumerable: false,
          writable: true,
          configurable: true
      });
  }
  /**
   * Parse simple path.
   */
  var bailRE = new RegExp("[^".concat(unicodeRegExp.source, ".$_\\d]"));
  function parsePath(path) {
      if (bailRE.test(path)) {
          return;
      }
      var segments = path.split('.');
      return function (obj) {
          for (var i = 0; i < segments.length; i++) {
              if (!obj)
                  return;
              obj = obj[segments[i]];
          }
          return obj;
      };
  }

  // can we use __proto__?
  var hasProto = '__proto__' in {};
  // Browser environment sniffing
  var inBrowser = typeof window !== 'undefined';
  var UA = inBrowser && window.navigator.userAgent.toLowerCase();
  var isIE = UA && /msie|trident/.test(UA);
  var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
  var isEdge = UA && UA.indexOf('edge/') > 0;
  UA && UA.indexOf('android') > 0;
  var isIOS = UA && /iphone|ipad|ipod|ios/.test(UA);
  var isFF = UA && UA.match(/firefox\/(\d+)/);
  // Firefox has a "watch" function on Object.prototype...
  // @ts-expect-error firebox support
  var nativeWatch = {}.watch;
  var supportsPassive = false;
  if (inBrowser) {
      try {
          var opts = {};
          Object.defineProperty(opts, 'passive', {
              get: function () {
                  /* istanbul ignore next */
                  supportsPassive = true;
              }
          }); // https://github.com/facebook/flow/issues/285
          window.addEventListener('test-passive', null, opts);
      }
      catch (e) { }
  }
  // this needs to be lazy-evaled because vue may be required before
  // vue-server-renderer can set VUE_ENV
  var _isServer;
  var isServerRendering = function () {
      if (_isServer === undefined) {
          /* istanbul ignore if */
          if (!inBrowser && typeof global !== 'undefined') {
              // detect presence of vue-server-renderer and avoid
              // Webpack shimming the process
              _isServer =
                  global['process'] && global['process'].env.VUE_ENV === 'server';
          }
          else {
              _isServer = false;
          }
      }
      return _isServer;
  };
  // detect devtools
  var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;
  /* istanbul ignore next */
  function isNative(Ctor) {
      return typeof Ctor === 'function' && /native code/.test(Ctor.toString());
  }
  var hasSymbol = typeof Symbol !== 'undefined' &&
      isNative(Symbol) &&
      typeof Reflect !== 'undefined' &&
      isNative(Reflect.ownKeys);
  var _Set; // $flow-disable-line
  /* istanbul ignore if */ if (typeof Set !== 'undefined' && isNative(Set)) {
      // use native Set when available.
      _Set = Set;
  }
  else {
      // a non-standard Set polyfill that only works with primitive keys.
      _Set = /** @class */ (function () {
          function Set() {
              this.set = Object.create(null);
          }
          Set.prototype.has = function (key) {
              return this.set[key] === true;
          };
          Set.prototype.add = function (key) {
              this.set[key] = true;
          };
          Set.prototype.clear = function () {
              this.set = Object.create(null);
          };
          return Set;
      }());
  }

  var currentInstance = null;
  /**
   * @internal
   */
  function setCurrentInstance(vm) {
      if (vm === void 0) { vm = null; }
      if (!vm)
          currentInstance && currentInstance._scope.off();
      currentInstance = vm;
      vm && vm._scope.on();
  }

  /**
   * @internal
   */
  var VNode = /** @class */ (function () {
      function VNode(tag, data, children, text, elm, context, componentOptions, asyncFactory) {
          this.tag = tag;
          this.data = data;
          this.children = children;
          this.text = text;
          this.elm = elm;
          this.ns = undefined;
          this.context = context;
          this.fnContext = undefined;
          this.fnOptions = undefined;
          this.fnScopeId = undefined;
          this.key = data && data.key;
          this.componentOptions = componentOptions;
          this.componentInstance = undefined;
          this.parent = undefined;
          this.raw = false;
          this.isStatic = false;
          this.isRootInsert = true;
          this.isComment = false;
          this.isCloned = false;
          this.isOnce = false;
          this.asyncFactory = asyncFactory;
          this.asyncMeta = undefined;
          this.isAsyncPlaceholder = false;
      }
      Object.defineProperty(VNode.prototype, "child", {
          // DEPRECATED: alias for componentInstance for backwards compat.
          /* istanbul ignore next */
          get: function () {
              return this.componentInstance;
          },
          enumerable: false,
          configurable: true
      });
      return VNode;
  }());
  var createEmptyVNode = function (text) {
      if (text === void 0) { text = ''; }
      var node = new VNode();
      node.text = text;
      node.isComment = true;
      return node;
  };
  function createTextVNode(val) {
      return new VNode(undefined, undefined, undefined, String(val));
  }
  // optimized shallow clone
  // used for static nodes and slot nodes because they may be reused across
  // multiple renders, cloning them avoids errors when DOM manipulations rely
  // on their elm reference.
  function cloneVNode(vnode) {
      var cloned = new VNode(vnode.tag, vnode.data, 
      // #7975
      // clone children array to avoid mutating original in case of cloning
      // a child.
      vnode.children && vnode.children.slice(), vnode.text, vnode.elm, vnode.context, vnode.componentOptions, vnode.asyncFactory);
      cloned.ns = vnode.ns;
      cloned.isStatic = vnode.isStatic;
      cloned.key = vnode.key;
      cloned.isComment = vnode.isComment;
      cloned.fnContext = vnode.fnContext;
      cloned.fnOptions = vnode.fnOptions;
      cloned.fnScopeId = vnode.fnScopeId;
      cloned.asyncMeta = vnode.asyncMeta;
      cloned.isCloned = true;
      return cloned;
  }

  typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
      var e = new Error(message);
      return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
  };

  var uid$2 = 0;
  var pendingCleanupDeps = [];
  var cleanupDeps = function () {
      for (var i = 0; i < pendingCleanupDeps.length; i++) {
          var dep = pendingCleanupDeps[i];
          dep.subs = dep.subs.filter(function (s) { return s; });
          dep._pending = false;
      }
      pendingCleanupDeps.length = 0;
  };
  /**
   * A dep is an observable that can have multiple
   * directives subscribing to it.
   * @internal
   */
  var Dep = /** @class */ (function () {
      function Dep() {
          // pending subs cleanup
          this._pending = false;
          this.id = uid$2++;
          this.subs = [];
      }
      Dep.prototype.addSub = function (sub) {
          this.subs.push(sub);
      };
      Dep.prototype.removeSub = function (sub) {
          // #12696 deps with massive amount of subscribers are extremely slow to
          // clean up in Chromium
          // to workaround this, we unset the sub for now, and clear them on
          // next scheduler flush.
          this.subs[this.subs.indexOf(sub)] = null;
          if (!this._pending) {
              this._pending = true;
              pendingCleanupDeps.push(this);
          }
      };
      Dep.prototype.depend = function (info) {
          if (Dep.target) {
              Dep.target.addDep(this);
          }
      };
      Dep.prototype.notify = function (info) {
          // stabilize the subscriber list first
          var subs = this.subs.filter(function (s) { return s; });
          for (var i = 0, l = subs.length; i < l; i++) {
              var sub = subs[i];
              sub.update();
          }
      };
      return Dep;
  }());
  // The current target watcher being evaluated.
  // This is globally unique because only one watcher
  // can be evaluated at a time.
  Dep.target = null;
  var targetStack = [];
  function pushTarget(target) {
      targetStack.push(target);
      Dep.target = target;
  }
  function popTarget() {
      targetStack.pop();
      Dep.target = targetStack[targetStack.length - 1];
  }

  /*
   * not type checking this file because flow doesn't play well with
   * dynamically accessing methods on Array prototype
   */
  var arrayProto = Array.prototype;
  var arrayMethods = Object.create(arrayProto);
  var methodsToPatch = [
      'push',
      'pop',
      'shift',
      'unshift',
      'splice',
      'sort',
      'reverse'
  ];
  /**
   * Intercept mutating methods and emit events
   */
  methodsToPatch.forEach(function (method) {
      // cache original method
      var original = arrayProto[method];
      def(arrayMethods, method, function mutator() {
          var args = [];
          for (var _i = 0; _i < arguments.length; _i++) {
              args[_i] = arguments[_i];
          }
          var result = original.apply(this, args);
          var ob = this.__ob__;
          var inserted;
          switch (method) {
              case 'push':
              case 'unshift':
                  inserted = args;
                  break;
              case 'splice':
                  inserted = args.slice(2);
                  break;
          }
          if (inserted)
              ob.observeArray(inserted);
          // notify change
          {
              ob.dep.notify();
          }
          return result;
      });
  });

  var arrayKeys = Object.getOwnPropertyNames(arrayMethods);
  var NO_INITIAL_VALUE = {};
  /**
   * In some cases we may want to disable observation inside a component's
   * update computation.
   */
  var shouldObserve = true;
  function toggleObserving(value) {
      shouldObserve = value;
  }
  // ssr mock dep
  var mockDep = {
      notify: noop$1,
      depend: noop$1,
      addSub: noop$1,
      removeSub: noop$1
  };
  /**
   * Observer class that is attached to each observed
   * object. Once attached, the observer converts the target
   * object's property keys into getter/setters that
   * collect dependencies and dispatch updates.
   */
  var Observer = /** @class */ (function () {
      function Observer(value, shallow, mock) {
          if (shallow === void 0) { shallow = false; }
          if (mock === void 0) { mock = false; }
          this.value = value;
          this.shallow = shallow;
          this.mock = mock;
          // this.value = value
          this.dep = mock ? mockDep : new Dep();
          this.vmCount = 0;
          def(value, '__ob__', this);
          if (isArray$1(value)) {
              if (!mock) {
                  if (hasProto) {
                      value.__proto__ = arrayMethods;
                      /* eslint-enable no-proto */
                  }
                  else {
                      for (var i = 0, l = arrayKeys.length; i < l; i++) {
                          var key = arrayKeys[i];
                          def(value, key, arrayMethods[key]);
                      }
                  }
              }
              if (!shallow) {
                  this.observeArray(value);
              }
          }
          else {
              /**
               * Walk through all properties and convert them into
               * getter/setters. This method should only be called when
               * value type is Object.
               */
              var keys = Object.keys(value);
              for (var i = 0; i < keys.length; i++) {
                  var key = keys[i];
                  defineReactive(value, key, NO_INITIAL_VALUE, undefined, shallow, mock);
              }
          }
      }
      /**
       * Observe a list of Array items.
       */
      Observer.prototype.observeArray = function (value) {
          for (var i = 0, l = value.length; i < l; i++) {
              observe(value[i], false, this.mock);
          }
      };
      return Observer;
  }());
  // helpers
  /**
   * Attempt to create an observer instance for a value,
   * returns the new observer if successfully observed,
   * or the existing observer if the value already has one.
   */
  function observe(value, shallow, ssrMockReactivity) {
      if (value && hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
          return value.__ob__;
      }
      if (shouldObserve &&
          (ssrMockReactivity || !isServerRendering()) &&
          (isArray$1(value) || isPlainObject$1(value)) &&
          Object.isExtensible(value) &&
          !value.__v_skip /* ReactiveFlags.SKIP */ &&
          !isRef(value) &&
          !(value instanceof VNode)) {
          return new Observer(value, shallow, ssrMockReactivity);
      }
  }
  /**
   * Define a reactive property on an Object.
   */
  function defineReactive(obj, key, val, customSetter, shallow, mock, observeEvenIfShallow) {
      if (observeEvenIfShallow === void 0) { observeEvenIfShallow = false; }
      var dep = new Dep();
      var property = Object.getOwnPropertyDescriptor(obj, key);
      if (property && property.configurable === false) {
          return;
      }
      // cater for pre-defined getter/setters
      var getter = property && property.get;
      var setter = property && property.set;
      if ((!getter || setter) &&
          (val === NO_INITIAL_VALUE || arguments.length === 2)) {
          val = obj[key];
      }
      var childOb = shallow ? val && val.__ob__ : observe(val, false, mock);
      Object.defineProperty(obj, key, {
          enumerable: true,
          configurable: true,
          get: function reactiveGetter() {
              var value = getter ? getter.call(obj) : val;
              if (Dep.target) {
                  {
                      dep.depend();
                  }
                  if (childOb) {
                      childOb.dep.depend();
                      if (isArray$1(value)) {
                          dependArray(value);
                      }
                  }
              }
              return isRef(value) && !shallow ? value.value : value;
          },
          set: function reactiveSetter(newVal) {
              var value = getter ? getter.call(obj) : val;
              if (!hasChanged(value, newVal)) {
                  return;
              }
              if (setter) {
                  setter.call(obj, newVal);
              }
              else if (getter) {
                  // #7981: for accessor properties without setter
                  return;
              }
              else if (!shallow && isRef(value) && !isRef(newVal)) {
                  value.value = newVal;
                  return;
              }
              else {
                  val = newVal;
              }
              childOb = shallow ? newVal && newVal.__ob__ : observe(newVal, false, mock);
              {
                  dep.notify();
              }
          }
      });
      return dep;
  }
  function set(target, key, val) {
      if (isReadonly(target)) {
          return;
      }
      var ob = target.__ob__;
      if (isArray$1(target) && isValidArrayIndex(key)) {
          target.length = Math.max(target.length, key);
          target.splice(key, 1, val);
          // when mocking for SSR, array methods are not hijacked
          if (ob && !ob.shallow && ob.mock) {
              observe(val, false, true);
          }
          return val;
      }
      if (key in target && !(key in Object.prototype)) {
          target[key] = val;
          return val;
      }
      if (target._isVue || (ob && ob.vmCount)) {
          return val;
      }
      if (!ob) {
          target[key] = val;
          return val;
      }
      defineReactive(ob.value, key, val, undefined, ob.shallow, ob.mock);
      {
          ob.dep.notify();
      }
      return val;
  }
  function del(target, key) {
      if (isArray$1(target) && isValidArrayIndex(key)) {
          target.splice(key, 1);
          return;
      }
      var ob = target.__ob__;
      if (target._isVue || (ob && ob.vmCount)) {
          return;
      }
      if (isReadonly(target)) {
          return;
      }
      if (!hasOwn(target, key)) {
          return;
      }
      delete target[key];
      if (!ob) {
          return;
      }
      {
          ob.dep.notify();
      }
  }
  /**
   * Collect dependencies on array elements when the array is touched, since
   * we cannot intercept array element access like property getters.
   */
  function dependArray(value) {
      for (var e = void 0, i = 0, l = value.length; i < l; i++) {
          e = value[i];
          if (e && e.__ob__) {
              e.__ob__.dep.depend();
          }
          if (isArray$1(e)) {
              dependArray(e);
          }
      }
  }

  function reactive(target) {
      makeReactive(target, false);
      return target;
  }
  /**
   * Return a shallowly-reactive copy of the original object, where only the root
   * level properties are reactive. It also does not auto-unwrap refs (even at the
   * root level).
   */
  function shallowReactive(target) {
      makeReactive(target, true);
      def(target, "__v_isShallow" /* ReactiveFlags.IS_SHALLOW */, true);
      return target;
  }
  function makeReactive(target, shallow) {
      // if trying to observe a readonly proxy, return the readonly version.
      if (!isReadonly(target)) {
          observe(target, shallow, isServerRendering() /* ssr mock reactivity */);
      }
  }
  function isReactive(value) {
      if (isReadonly(value)) {
          return isReactive(value["__v_raw" /* ReactiveFlags.RAW */]);
      }
      return !!(value && value.__ob__);
  }
  function isShallow(value) {
      return !!(value && value.__v_isShallow);
  }
  function isReadonly(value) {
      return !!(value && value.__v_isReadonly);
  }
  function isRef(r) {
      return !!(r && r.__v_isRef === true);
  }
  function proxyWithRefUnwrap(target, source, key) {
      Object.defineProperty(target, key, {
          enumerable: true,
          configurable: true,
          get: function () {
              var val = source[key];
              if (isRef(val)) {
                  return val.value;
              }
              else {
                  var ob = val && val.__ob__;
                  if (ob)
                      ob.dep.depend();
                  return val;
              }
          },
          set: function (value) {
              var oldValue = source[key];
              if (isRef(oldValue) && !isRef(value)) {
                  oldValue.value = value;
              }
              else {
                  source[key] = value;
              }
          }
      });
  }

  var WATCHER = "watcher";
  var WATCHER_CB = "".concat(WATCHER, " callback");
  var WATCHER_GETTER = "".concat(WATCHER, " getter");
  var WATCHER_CLEANUP = "".concat(WATCHER, " cleanup");
  // initial value for watchers to trigger on undefined initial values
  var INITIAL_WATCHER_VALUE = {};
  // implementation
  function watch(source, cb, options) {
      return doWatch(source, cb, options);
  }
  function doWatch(source, cb, _a) {
      var _b = _a === void 0 ? emptyObject : _a, immediate = _b.immediate, deep = _b.deep, _c = _b.flush, flush = _c === void 0 ? 'pre' : _c; _b.onTrack; _b.onTrigger;
      var instance = currentInstance;
      var call = function (fn, type, args) {
          if (args === void 0) { args = null; }
          var res = invokeWithErrorHandling(fn, null, args, instance, type);
          if (deep && res && res.__ob__)
              res.__ob__.dep.depend();
          return res;
      };
      var getter;
      var forceTrigger = false;
      var isMultiSource = false;
      if (isRef(source)) {
          getter = function () { return source.value; };
          forceTrigger = isShallow(source);
      }
      else if (isReactive(source)) {
          getter = function () {
              source.__ob__.dep.depend();
              return source;
          };
          deep = true;
      }
      else if (isArray$1(source)) {
          isMultiSource = true;
          forceTrigger = source.some(function (s) { return isReactive(s) || isShallow(s); });
          getter = function () {
              return source.map(function (s) {
                  if (isRef(s)) {
                      return s.value;
                  }
                  else if (isReactive(s)) {
                      s.__ob__.dep.depend();
                      return traverse(s);
                  }
                  else if (isFunction$1(s)) {
                      return call(s, WATCHER_GETTER);
                  }
                  else ;
              });
          };
      }
      else if (isFunction$1(source)) {
          if (cb) {
              // getter with cb
              getter = function () { return call(source, WATCHER_GETTER); };
          }
          else {
              // no cb -> simple effect
              getter = function () {
                  if (instance && instance._isDestroyed) {
                      return;
                  }
                  if (cleanup) {
                      cleanup();
                  }
                  return call(source, WATCHER, [onCleanup]);
              };
          }
      }
      else {
          getter = noop$1;
      }
      if (cb && deep) {
          var baseGetter_1 = getter;
          getter = function () { return traverse(baseGetter_1()); };
      }
      var cleanup;
      var onCleanup = function (fn) {
          cleanup = watcher.onStop = function () {
              call(fn, WATCHER_CLEANUP);
          };
      };
      // in SSR there is no need to setup an actual effect, and it should be noop
      // unless it's eager
      if (isServerRendering()) {
          // we will also not call the invalidate callback (+ runner is not set up)
          onCleanup = noop$1;
          if (!cb) {
              getter();
          }
          else if (immediate) {
              call(cb, WATCHER_CB, [
                  getter(),
                  isMultiSource ? [] : undefined,
                  onCleanup
              ]);
          }
          return noop$1;
      }
      var watcher = new Watcher(currentInstance, getter, noop$1, {
          lazy: true
      });
      watcher.noRecurse = !cb;
      var oldValue = isMultiSource ? [] : INITIAL_WATCHER_VALUE;
      // overwrite default run
      watcher.run = function () {
          if (!watcher.active) {
              return;
          }
          if (cb) {
              // watch(source, cb)
              var newValue = watcher.get();
              if (deep ||
                  forceTrigger ||
                  (isMultiSource
                      ? newValue.some(function (v, i) {
                          return hasChanged(v, oldValue[i]);
                      })
                      : hasChanged(newValue, oldValue))) {
                  // cleanup before running cb again
                  if (cleanup) {
                      cleanup();
                  }
                  call(cb, WATCHER_CB, [
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
              watcher.get();
          }
      };
      if (flush === 'sync') {
          watcher.update = watcher.run;
      }
      else if (flush === 'post') {
          watcher.post = true;
          watcher.update = function () { return queueWatcher(watcher); };
      }
      else {
          // pre
          watcher.update = function () {
              if (instance && instance === currentInstance && !instance._isMounted) {
                  // pre-watcher triggered before
                  var buffer = instance._preWatchers || (instance._preWatchers = []);
                  if (buffer.indexOf(watcher) < 0)
                      buffer.push(watcher);
              }
              else {
                  queueWatcher(watcher);
              }
          };
      }
      // initial run
      if (cb) {
          if (immediate) {
              watcher.run();
          }
          else {
              oldValue = watcher.get();
          }
      }
      else if (flush === 'post' && instance) {
          instance.$once('hook:mounted', function () { return watcher.get(); });
      }
      else {
          watcher.get();
      }
      return function () {
          watcher.teardown();
      };
  }

  var activeEffectScope;
  var EffectScope = /** @class */ (function () {
      function EffectScope(detached) {
          if (detached === void 0) { detached = false; }
          this.detached = detached;
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
          this.parent = activeEffectScope;
          if (!detached && activeEffectScope) {
              this.index =
                  (activeEffectScope.scopes || (activeEffectScope.scopes = [])).push(this) - 1;
          }
      }
      EffectScope.prototype.run = function (fn) {
          if (this.active) {
              var currentEffectScope = activeEffectScope;
              try {
                  activeEffectScope = this;
                  return fn();
              }
              finally {
                  activeEffectScope = currentEffectScope;
              }
          }
      };
      /**
       * This should only be called on non-detached scopes
       * @internal
       */
      EffectScope.prototype.on = function () {
          activeEffectScope = this;
      };
      /**
       * This should only be called on non-detached scopes
       * @internal
       */
      EffectScope.prototype.off = function () {
          activeEffectScope = this.parent;
      };
      EffectScope.prototype.stop = function (fromParent) {
          if (this.active) {
              var i = void 0, l = void 0;
              for (i = 0, l = this.effects.length; i < l; i++) {
                  this.effects[i].teardown();
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
              if (!this.detached && this.parent && !fromParent) {
                  // optimized O(1) removal
                  var last = this.parent.scopes.pop();
                  if (last && last !== this) {
                      this.parent.scopes[this.index] = last;
                      last.index = this.index;
                  }
              }
              this.parent = undefined;
              this.active = false;
          }
      };
      return EffectScope;
  }());
  /**
   * @internal
   */
  function recordEffectScope(effect, scope) {
      if (scope === void 0) { scope = activeEffectScope; }
      if (scope && scope.active) {
          scope.effects.push(effect);
      }
  }
  function getCurrentScope() {
      return activeEffectScope;
  }
  function resolveProvided(vm) {
      // by default an instance inherits its parent's provides object
      // but when it needs to provide values of its own, it creates its
      // own provides object using parent provides object as prototype.
      // this way in `inject` we can simply look up injections from direct
      // parent and let the prototype chain do the work.
      var existing = vm._provided;
      var parentProvides = vm.$parent && vm.$parent._provided;
      if (parentProvides === existing) {
          return (vm._provided = Object.create(parentProvides));
      }
      else {
          return existing;
      }
  }

  var normalizeEvent = cached(function (name) {
      var passive = name.charAt(0) === '&';
      name = passive ? name.slice(1) : name;
      var once = name.charAt(0) === '~'; // Prefixed last, checked first
      name = once ? name.slice(1) : name;
      var capture = name.charAt(0) === '!';
      name = capture ? name.slice(1) : name;
      return {
          name: name,
          once: once,
          capture: capture,
          passive: passive
      };
  });
  function createFnInvoker(fns, vm) {
      function invoker() {
          var fns = invoker.fns;
          if (isArray$1(fns)) {
              var cloned = fns.slice();
              for (var i = 0; i < cloned.length; i++) {
                  invokeWithErrorHandling(cloned[i], null, arguments, vm, "v-on handler");
              }
          }
          else {
              // return handler return value for single handlers
              return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler");
          }
      }
      invoker.fns = fns;
      return invoker;
  }
  function updateListeners(on, oldOn, add, remove, createOnceHandler, vm) {
      var name, cur, old, event;
      for (name in on) {
          cur = on[name];
          old = oldOn[name];
          event = normalizeEvent(name);
          if (isUndef(cur)) ;
          else if (isUndef(old)) {
              if (isUndef(cur.fns)) {
                  cur = on[name] = createFnInvoker(cur, vm);
              }
              if (isTrue(event.once)) {
                  cur = on[name] = createOnceHandler(event.name, cur, event.capture);
              }
              add(event.name, cur, event.capture, event.passive, event.params);
          }
          else if (cur !== old) {
              old.fns = cur;
              on[name] = old;
          }
      }
      for (name in oldOn) {
          if (isUndef(on[name])) {
              event = normalizeEvent(name);
              remove(event.name, oldOn[name], event.capture);
          }
      }
  }

  function mergeVNodeHook(def, hookKey, hook) {
      if (def instanceof VNode) {
          def = def.data.hook || (def.data.hook = {});
      }
      var invoker;
      var oldHook = def[hookKey];
      function wrappedHook() {
          hook.apply(this, arguments);
          // important: remove merged hook to ensure it's called only once
          // and prevent memory leak
          remove$2(invoker.fns, wrappedHook);
      }
      if (isUndef(oldHook)) {
          // no existing hook
          invoker = createFnInvoker([wrappedHook]);
      }
      else {
          /* istanbul ignore if */
          if (isDef(oldHook.fns) && isTrue(oldHook.merged)) {
              // already a merged invoker
              invoker = oldHook;
              invoker.fns.push(wrappedHook);
          }
          else {
              // existing plain hook
              invoker = createFnInvoker([oldHook, wrappedHook]);
          }
      }
      invoker.merged = true;
      def[hookKey] = invoker;
  }

  function extractPropsFromVNodeData(data, Ctor, tag) {
      // we are only extracting raw values here.
      // validation and default values are handled in the child
      // component itself.
      var propOptions = Ctor.options.props;
      if (isUndef(propOptions)) {
          return;
      }
      var res = {};
      var attrs = data.attrs, props = data.props;
      if (isDef(attrs) || isDef(props)) {
          for (var key in propOptions) {
              var altKey = hyphenate(key);
              checkProp(res, props, key, altKey, true) ||
                  checkProp(res, attrs, key, altKey, false);
          }
      }
      return res;
  }
  function checkProp(res, hash, key, altKey, preserve) {
      if (isDef(hash)) {
          if (hasOwn(hash, key)) {
              res[key] = hash[key];
              if (!preserve) {
                  delete hash[key];
              }
              return true;
          }
          else if (hasOwn(hash, altKey)) {
              res[key] = hash[altKey];
              if (!preserve) {
                  delete hash[altKey];
              }
              return true;
          }
      }
      return false;
  }

  // The template compiler attempts to minimize the need for normalization by
  // statically analyzing the template at compile time.
  //
  // For plain HTML markup, normalization can be completely skipped because the
  // generated render function is guaranteed to return Array<VNode>. There are
  // two cases where extra normalization is needed:
  // 1. When the children contains components - because a functional component
  // may return an Array instead of a single root. In this case, just a simple
  // normalization is needed - if any child is an Array, we flatten the whole
  // thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
  // because functional components already normalize their own children.
  function simpleNormalizeChildren(children) {
      for (var i = 0; i < children.length; i++) {
          if (isArray$1(children[i])) {
              return Array.prototype.concat.apply([], children);
          }
      }
      return children;
  }
  // 2. When the children contains constructs that always generated nested Arrays,
  // e.g. <template>, <slot>, v-for, or when the children is provided by user
  // with hand-written render functions / JSX. In such cases a full normalization
  // is needed to cater to all possible types of children values.
  function normalizeChildren(children) {
      return isPrimitive(children)
          ? [createTextVNode(children)]
          : isArray$1(children)
              ? normalizeArrayChildren(children)
              : undefined;
  }
  function isTextNode(node) {
      return isDef(node) && isDef(node.text) && isFalse(node.isComment);
  }
  function normalizeArrayChildren(children, nestedIndex) {
      var res = [];
      var i, c, lastIndex, last;
      for (i = 0; i < children.length; i++) {
          c = children[i];
          if (isUndef(c) || typeof c === 'boolean')
              continue;
          lastIndex = res.length - 1;
          last = res[lastIndex];
          //  nested
          if (isArray$1(c)) {
              if (c.length > 0) {
                  c = normalizeArrayChildren(c, "".concat(nestedIndex || '', "_").concat(i));
                  // merge adjacent text nodes
                  if (isTextNode(c[0]) && isTextNode(last)) {
                      res[lastIndex] = createTextVNode(last.text + c[0].text);
                      c.shift();
                  }
                  res.push.apply(res, c);
              }
          }
          else if (isPrimitive(c)) {
              if (isTextNode(last)) {
                  // merge adjacent text nodes
                  // this is necessary for SSR hydration because text nodes are
                  // essentially merged when rendered to HTML strings
                  res[lastIndex] = createTextVNode(last.text + c);
              }
              else if (c !== '') {
                  // convert primitive to vnode
                  res.push(createTextVNode(c));
              }
          }
          else {
              if (isTextNode(c) && isTextNode(last)) {
                  // merge adjacent text nodes
                  res[lastIndex] = createTextVNode(last.text + c.text);
              }
              else {
                  // default key for nested array children (likely generated by v-for)
                  if (isTrue(children._isVList) &&
                      isDef(c.tag) &&
                      isUndef(c.key) &&
                      isDef(nestedIndex)) {
                      c.key = "__vlist".concat(nestedIndex, "_").concat(i, "__");
                  }
                  res.push(c);
              }
          }
      }
      return res;
  }

  /**
   * Runtime helper for rendering v-for lists.
   */
  function renderList(val, render) {
      var ret = null, i, l, keys, key;
      if (isArray$1(val) || typeof val === 'string') {
          ret = new Array(val.length);
          for (i = 0, l = val.length; i < l; i++) {
              ret[i] = render(val[i], i);
          }
      }
      else if (typeof val === 'number') {
          ret = new Array(val);
          for (i = 0; i < val; i++) {
              ret[i] = render(i + 1, i);
          }
      }
      else if (isObject$1(val)) {
          if (hasSymbol && val[Symbol.iterator]) {
              ret = [];
              var iterator = val[Symbol.iterator]();
              var result = iterator.next();
              while (!result.done) {
                  ret.push(render(result.value, ret.length));
                  result = iterator.next();
              }
          }
          else {
              keys = Object.keys(val);
              ret = new Array(keys.length);
              for (i = 0, l = keys.length; i < l; i++) {
                  key = keys[i];
                  ret[i] = render(val[key], key, i);
              }
          }
      }
      if (!isDef(ret)) {
          ret = [];
      }
      ret._isVList = true;
      return ret;
  }

  /**
   * Runtime helper for rendering <slot>
   */
  function renderSlot(name, fallbackRender, props, bindObject) {
      var scopedSlotFn = this.$scopedSlots[name];
      var nodes;
      if (scopedSlotFn) {
          // scoped slot
          props = props || {};
          if (bindObject) {
              props = extend$1(extend$1({}, bindObject), props);
          }
          nodes =
              scopedSlotFn(props) ||
                  (isFunction$1(fallbackRender) ? fallbackRender() : fallbackRender);
      }
      else {
          nodes =
              this.$slots[name] ||
                  (isFunction$1(fallbackRender) ? fallbackRender() : fallbackRender);
      }
      var target = props && props.slot;
      if (target) {
          return this.$createElement('template', { slot: target }, nodes);
      }
      else {
          return nodes;
      }
  }

  /**
   * Runtime helper for resolving filters
   */
  function resolveFilter(id) {
      return resolveAsset(this.$options, 'filters', id) || identity;
  }

  function isKeyNotMatch(expect, actual) {
      if (isArray$1(expect)) {
          return expect.indexOf(actual) === -1;
      }
      else {
          return expect !== actual;
      }
  }
  /**
   * Runtime helper for checking keyCodes from config.
   * exposed as Vue.prototype._k
   * passing in eventKeyName as last argument separately for backwards compat
   */
  function checkKeyCodes(eventKeyCode, key, builtInKeyCode, eventKeyName, builtInKeyName) {
      var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
      if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
          return isKeyNotMatch(builtInKeyName, eventKeyName);
      }
      else if (mappedKeyCode) {
          return isKeyNotMatch(mappedKeyCode, eventKeyCode);
      }
      else if (eventKeyName) {
          return hyphenate(eventKeyName) !== key;
      }
      return eventKeyCode === undefined;
  }

  /**
   * Runtime helper for merging v-bind="object" into a VNode's data.
   */
  function bindObjectProps(data, tag, value, asProp, isSync) {
      if (value) {
          if (!isObject$1(value)) ;
          else {
              if (isArray$1(value)) {
                  value = toObject(value);
              }
              var hash = void 0;
              var _loop_1 = function (key) {
                  if (key === 'class' || key === 'style' || isReservedAttribute(key)) {
                      hash = data;
                  }
                  else {
                      var type = data.attrs && data.attrs.type;
                      hash =
                          asProp || config.mustUseProp(tag, type, key)
                              ? data.domProps || (data.domProps = {})
                              : data.attrs || (data.attrs = {});
                  }
                  var camelizedKey = camelize(key);
                  var hyphenatedKey = hyphenate(key);
                  if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
                      hash[key] = value[key];
                      if (isSync) {
                          var on = data.on || (data.on = {});
                          on["update:".concat(key)] = function ($event) {
                              value[key] = $event;
                          };
                      }
                  }
              };
              for (var key in value) {
                  _loop_1(key);
              }
          }
      }
      return data;
  }

  /**
   * Runtime helper for rendering static trees.
   */
  function renderStatic(index, isInFor) {
      var cached = this._staticTrees || (this._staticTrees = []);
      var tree = cached[index];
      // if has already-rendered static tree and not inside v-for,
      // we can reuse the same tree.
      if (tree && !isInFor) {
          return tree;
      }
      // otherwise, render a fresh tree.
      tree = cached[index] = this.$options.staticRenderFns[index].call(this._renderProxy, this._c, this // for render fns generated for functional component templates
      );
      markStatic(tree, "__static__".concat(index), false);
      return tree;
  }
  /**
   * Runtime helper for v-once.
   * Effectively it means marking the node as static with a unique key.
   */
  function markOnce(tree, index, key) {
      markStatic(tree, "__once__".concat(index).concat(key ? "_".concat(key) : ""), true);
      return tree;
  }
  function markStatic(tree, key, isOnce) {
      if (isArray$1(tree)) {
          for (var i = 0; i < tree.length; i++) {
              if (tree[i] && typeof tree[i] !== 'string') {
                  markStaticNode(tree[i], "".concat(key, "_").concat(i), isOnce);
              }
          }
      }
      else {
          markStaticNode(tree, key, isOnce);
      }
  }
  function markStaticNode(node, key, isOnce) {
      node.isStatic = true;
      node.key = key;
      node.isOnce = isOnce;
  }

  function bindObjectListeners(data, value) {
      if (value) {
          if (!isPlainObject$1(value)) ;
          else {
              var on = (data.on = data.on ? extend$1({}, data.on) : {});
              for (var key in value) {
                  var existing = on[key];
                  var ours = value[key];
                  on[key] = existing ? [].concat(existing, ours) : ours;
              }
          }
      }
      return data;
  }

  function resolveScopedSlots(fns, res, 
  // the following are added in 2.6
  hasDynamicKeys, contentHashKey) {
      res = res || { $stable: !hasDynamicKeys };
      for (var i = 0; i < fns.length; i++) {
          var slot = fns[i];
          if (isArray$1(slot)) {
              resolveScopedSlots(slot, res, hasDynamicKeys);
          }
          else if (slot) {
              // marker for reverse proxying v-slot without scope on this.$slots
              // @ts-expect-error
              if (slot.proxy) {
                  // @ts-expect-error
                  slot.fn.proxy = true;
              }
              res[slot.key] = slot.fn;
          }
      }
      if (contentHashKey) {
          res.$key = contentHashKey;
      }
      return res;
  }

  // helper to process dynamic keys for dynamic arguments in v-bind and v-on.
  function bindDynamicKeys(baseObj, values) {
      for (var i = 0; i < values.length; i += 2) {
          var key = values[i];
          if (typeof key === 'string' && key) {
              baseObj[values[i]] = values[i + 1];
          }
      }
      return baseObj;
  }
  // helper to dynamically append modifier runtime markers to event names.
  // ensure only append when value is already string, otherwise it will be cast
  // to string and cause the type check to miss.
  function prependModifier(value, symbol) {
      return typeof value === 'string' ? symbol + value : value;
  }

  function installRenderHelpers(target) {
      target._o = markOnce;
      target._n = toNumber;
      target._s = toString$1;
      target._l = renderList;
      target._t = renderSlot;
      target._q = looseEqual;
      target._i = looseIndexOf;
      target._m = renderStatic;
      target._f = resolveFilter;
      target._k = checkKeyCodes;
      target._b = bindObjectProps;
      target._v = createTextVNode;
      target._e = createEmptyVNode;
      target._u = resolveScopedSlots;
      target._g = bindObjectListeners;
      target._d = bindDynamicKeys;
      target._p = prependModifier;
  }

  /**
   * Runtime helper for resolving raw children VNodes into a slot object.
   */
  function resolveSlots(children, context) {
      if (!children || !children.length) {
          return {};
      }
      var slots = {};
      for (var i = 0, l = children.length; i < l; i++) {
          var child = children[i];
          var data = child.data;
          // remove slot attribute if the node is resolved as a Vue slot node
          if (data && data.attrs && data.attrs.slot) {
              delete data.attrs.slot;
          }
          // named slots should only be respected if the vnode was rendered in the
          // same context.
          if ((child.context === context || child.fnContext === context) &&
              data &&
              data.slot != null) {
              var name_1 = data.slot;
              var slot = slots[name_1] || (slots[name_1] = []);
              if (child.tag === 'template') {
                  slot.push.apply(slot, child.children || []);
              }
              else {
                  slot.push(child);
              }
          }
          else {
              (slots.default || (slots.default = [])).push(child);
          }
      }
      // ignore slots that contains only whitespace
      for (var name_2 in slots) {
          if (slots[name_2].every(isWhitespace)) {
              delete slots[name_2];
          }
      }
      return slots;
  }
  function isWhitespace(node) {
      return (node.isComment && !node.asyncFactory) || node.text === ' ';
  }

  function isAsyncPlaceholder(node) {
      // @ts-expect-error not really boolean type
      return node.isComment && node.asyncFactory;
  }

  function normalizeScopedSlots(ownerVm, scopedSlots, normalSlots, prevScopedSlots) {
      var res;
      var hasNormalSlots = Object.keys(normalSlots).length > 0;
      var isStable = scopedSlots ? !!scopedSlots.$stable : !hasNormalSlots;
      var key = scopedSlots && scopedSlots.$key;
      if (!scopedSlots) {
          res = {};
      }
      else if (scopedSlots._normalized) {
          // fast path 1: child component re-render only, parent did not change
          return scopedSlots._normalized;
      }
      else if (isStable &&
          prevScopedSlots &&
          prevScopedSlots !== emptyObject &&
          key === prevScopedSlots.$key &&
          !hasNormalSlots &&
          !prevScopedSlots.$hasNormal) {
          // fast path 2: stable scoped slots w/ no normal slots to proxy,
          // only need to normalize once
          return prevScopedSlots;
      }
      else {
          res = {};
          for (var key_1 in scopedSlots) {
              if (scopedSlots[key_1] && key_1[0] !== '$') {
                  res[key_1] = normalizeScopedSlot(ownerVm, normalSlots, key_1, scopedSlots[key_1]);
              }
          }
      }
      // expose normal slots on scopedSlots
      for (var key_2 in normalSlots) {
          if (!(key_2 in res)) {
              res[key_2] = proxyNormalSlot(normalSlots, key_2);
          }
      }
      // avoriaz seems to mock a non-extensible $scopedSlots object
      // and when that is passed down this would cause an error
      if (scopedSlots && Object.isExtensible(scopedSlots)) {
          scopedSlots._normalized = res;
      }
      def(res, '$stable', isStable);
      def(res, '$key', key);
      def(res, '$hasNormal', hasNormalSlots);
      return res;
  }
  function normalizeScopedSlot(vm, normalSlots, key, fn) {
      var normalized = function () {
          var cur = currentInstance;
          setCurrentInstance(vm);
          var res = arguments.length ? fn.apply(null, arguments) : fn({});
          res =
              res && typeof res === 'object' && !isArray$1(res)
                  ? [res] // single vnode
                  : normalizeChildren(res);
          var vnode = res && res[0];
          setCurrentInstance(cur);
          return res &&
              (!vnode ||
                  (res.length === 1 && vnode.isComment && !isAsyncPlaceholder(vnode))) // #9658, #10391
              ? undefined
              : res;
      };
      // this is a slot using the new v-slot syntax without scope. although it is
      // compiled as a scoped slot, render fn users would expect it to be present
      // on this.$slots because the usage is semantically a normal slot.
      if (fn.proxy) {
          Object.defineProperty(normalSlots, key, {
              get: normalized,
              enumerable: true,
              configurable: true
          });
      }
      return normalized;
  }
  function proxyNormalSlot(slots, key) {
      return function () { return slots[key]; };
  }

  function initSetup(vm) {
      var options = vm.$options;
      var setup = options.setup;
      if (setup) {
          var ctx = (vm._setupContext = createSetupContext(vm));
          setCurrentInstance(vm);
          pushTarget();
          var setupResult = invokeWithErrorHandling(setup, null, [vm._props || shallowReactive({}), ctx], vm, "setup");
          popTarget();
          setCurrentInstance();
          if (isFunction$1(setupResult)) {
              // render function
              // @ts-ignore
              options.render = setupResult;
          }
          else if (isObject$1(setupResult)) {
              vm._setupState = setupResult;
              // __sfc indicates compiled bindings from <script setup>
              if (!setupResult.__sfc) {
                  for (var key in setupResult) {
                      if (!isReserved(key)) {
                          proxyWithRefUnwrap(vm, setupResult, key);
                      }
                  }
              }
              else {
                  // exposed for compiled render fn
                  var proxy = (vm._setupProxy = {});
                  for (var key in setupResult) {
                      if (key !== '__sfc') {
                          proxyWithRefUnwrap(proxy, setupResult, key);
                      }
                  }
              }
          }
          else ;
      }
  }
  function createSetupContext(vm) {
      return {
          get attrs() {
              if (!vm._attrsProxy) {
                  var proxy = (vm._attrsProxy = {});
                  def(proxy, '_v_attr_proxy', true);
                  syncSetupProxy(proxy, vm.$attrs, emptyObject, vm, '$attrs');
              }
              return vm._attrsProxy;
          },
          get listeners() {
              if (!vm._listenersProxy) {
                  var proxy = (vm._listenersProxy = {});
                  syncSetupProxy(proxy, vm.$listeners, emptyObject, vm, '$listeners');
              }
              return vm._listenersProxy;
          },
          get slots() {
              return initSlotsProxy(vm);
          },
          emit: bind$1(vm.$emit, vm),
          expose: function (exposed) {
              if (exposed) {
                  Object.keys(exposed).forEach(function (key) {
                      return proxyWithRefUnwrap(vm, exposed, key);
                  });
              }
          }
      };
  }
  function syncSetupProxy(to, from, prev, instance, type) {
      var changed = false;
      for (var key in from) {
          if (!(key in to)) {
              changed = true;
              defineProxyAttr(to, key, instance, type);
          }
          else if (from[key] !== prev[key]) {
              changed = true;
          }
      }
      for (var key in to) {
          if (!(key in from)) {
              changed = true;
              delete to[key];
          }
      }
      return changed;
  }
  function defineProxyAttr(proxy, key, instance, type) {
      Object.defineProperty(proxy, key, {
          enumerable: true,
          configurable: true,
          get: function () {
              return instance[type][key];
          }
      });
  }
  function initSlotsProxy(vm) {
      if (!vm._slotsProxy) {
          syncSetupSlots((vm._slotsProxy = {}), vm.$scopedSlots);
      }
      return vm._slotsProxy;
  }
  function syncSetupSlots(to, from) {
      for (var key in from) {
          to[key] = from[key];
      }
      for (var key in to) {
          if (!(key in from)) {
              delete to[key];
          }
      }
  }

  function initRender(vm) {
      vm._vnode = null; // the root of the child tree
      vm._staticTrees = null; // v-once cached trees
      var options = vm.$options;
      var parentVnode = (vm.$vnode = options._parentVnode); // the placeholder node in parent tree
      var renderContext = parentVnode && parentVnode.context;
      vm.$slots = resolveSlots(options._renderChildren, renderContext);
      vm.$scopedSlots = parentVnode
          ? normalizeScopedSlots(vm.$parent, parentVnode.data.scopedSlots, vm.$slots)
          : emptyObject;
      // bind the createElement fn to this instance
      // so that we get proper render context inside it.
      // args order: tag, data, children, normalizationType, alwaysNormalize
      // internal version is used by render functions compiled from templates
      // @ts-expect-error
      vm._c = function (a, b, c, d) { return createElement$1(vm, a, b, c, d, false); };
      // normalization is always applied for the public version, used in
      // user-written render functions.
      // @ts-expect-error
      vm.$createElement = function (a, b, c, d) { return createElement$1(vm, a, b, c, d, true); };
      // $attrs & $listeners are exposed for easier HOC creation.
      // they need to be reactive so that HOCs using them are always updated
      var parentData = parentVnode && parentVnode.data;
      /* istanbul ignore else */
      {
          defineReactive(vm, '$attrs', (parentData && parentData.attrs) || emptyObject, null, true);
          defineReactive(vm, '$listeners', options._parentListeners || emptyObject, null, true);
      }
  }
  var currentRenderingInstance = null;
  function renderMixin(Vue) {
      // install runtime convenience helpers
      installRenderHelpers(Vue.prototype);
      Vue.prototype.$nextTick = function (fn) {
          return nextTick(fn, this);
      };
      Vue.prototype._render = function () {
          var vm = this;
          var _a = vm.$options, render = _a.render, _parentVnode = _a._parentVnode;
          if (_parentVnode && vm._isMounted) {
              vm.$scopedSlots = normalizeScopedSlots(vm.$parent, _parentVnode.data.scopedSlots, vm.$slots, vm.$scopedSlots);
              if (vm._slotsProxy) {
                  syncSetupSlots(vm._slotsProxy, vm.$scopedSlots);
              }
          }
          // set parent vnode. this allows render functions to have access
          // to the data on the placeholder node.
          vm.$vnode = _parentVnode;
          // render self
          var prevInst = currentInstance;
          var prevRenderInst = currentRenderingInstance;
          var vnode;
          try {
              setCurrentInstance(vm);
              currentRenderingInstance = vm;
              vnode = render.call(vm._renderProxy, vm.$createElement);
          }
          catch (e) {
              handleError(e, vm, "render");
              // return error render result,
              // or previous vnode to prevent render error causing blank component
              /* istanbul ignore else */
              {
                  vnode = vm._vnode;
              }
          }
          finally {
              currentRenderingInstance = prevRenderInst;
              setCurrentInstance(prevInst);
          }
          // if the returned array contains only a single node, allow it
          if (isArray$1(vnode) && vnode.length === 1) {
              vnode = vnode[0];
          }
          // return empty vnode in case the render function errored out
          if (!(vnode instanceof VNode)) {
              vnode = createEmptyVNode();
          }
          // set parent
          vnode.parent = _parentVnode;
          return vnode;
      };
  }

  function ensureCtor(comp, base) {
      if (comp.__esModule || (hasSymbol && comp[Symbol.toStringTag] === 'Module')) {
          comp = comp.default;
      }
      return isObject$1(comp) ? base.extend(comp) : comp;
  }
  function createAsyncPlaceholder(factory, data, context, children, tag) {
      var node = createEmptyVNode();
      node.asyncFactory = factory;
      node.asyncMeta = { data: data, context: context, children: children, tag: tag };
      return node;
  }
  function resolveAsyncComponent(factory, baseCtor) {
      if (isTrue(factory.error) && isDef(factory.errorComp)) {
          return factory.errorComp;
      }
      if (isDef(factory.resolved)) {
          return factory.resolved;
      }
      var owner = currentRenderingInstance;
      if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
          // already pending
          factory.owners.push(owner);
      }
      if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
          return factory.loadingComp;
      }
      if (owner && !isDef(factory.owners)) {
          var owners_1 = (factory.owners = [owner]);
          var sync_1 = true;
          var timerLoading_1 = null;
          var timerTimeout_1 = null;
          owner.$on('hook:destroyed', function () { return remove$2(owners_1, owner); });
          var forceRender_1 = function (renderCompleted) {
              for (var i = 0, l = owners_1.length; i < l; i++) {
                  owners_1[i].$forceUpdate();
              }
              if (renderCompleted) {
                  owners_1.length = 0;
                  if (timerLoading_1 !== null) {
                      clearTimeout(timerLoading_1);
                      timerLoading_1 = null;
                  }
                  if (timerTimeout_1 !== null) {
                      clearTimeout(timerTimeout_1);
                      timerTimeout_1 = null;
                  }
              }
          };
          var resolve = once(function (res) {
              // cache resolved
              factory.resolved = ensureCtor(res, baseCtor);
              // invoke callbacks only if this is not a synchronous resolve
              // (async resolves are shimmed as synchronous during SSR)
              if (!sync_1) {
                  forceRender_1(true);
              }
              else {
                  owners_1.length = 0;
              }
          });
          var reject_1 = once(function (reason) {
              if (isDef(factory.errorComp)) {
                  factory.error = true;
                  forceRender_1(true);
              }
          });
          var res_1 = factory(resolve, reject_1);
          if (isObject$1(res_1)) {
              if (isPromise(res_1)) {
                  // () => Promise
                  if (isUndef(factory.resolved)) {
                      res_1.then(resolve, reject_1);
                  }
              }
              else if (isPromise(res_1.component)) {
                  res_1.component.then(resolve, reject_1);
                  if (isDef(res_1.error)) {
                      factory.errorComp = ensureCtor(res_1.error, baseCtor);
                  }
                  if (isDef(res_1.loading)) {
                      factory.loadingComp = ensureCtor(res_1.loading, baseCtor);
                      if (res_1.delay === 0) {
                          factory.loading = true;
                      }
                      else {
                          // @ts-expect-error NodeJS timeout type
                          timerLoading_1 = setTimeout(function () {
                              timerLoading_1 = null;
                              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                                  factory.loading = true;
                                  forceRender_1(false);
                              }
                          }, res_1.delay || 200);
                      }
                  }
                  if (isDef(res_1.timeout)) {
                      // @ts-expect-error NodeJS timeout type
                      timerTimeout_1 = setTimeout(function () {
                          timerTimeout_1 = null;
                          if (isUndef(factory.resolved)) {
                              reject_1(null);
                          }
                      }, res_1.timeout);
                  }
              }
          }
          sync_1 = false;
          // return in case resolved synchronously
          return factory.loading ? factory.loadingComp : factory.resolved;
      }
  }

  function getFirstComponentChild(children) {
      if (isArray$1(children)) {
          for (var i = 0; i < children.length; i++) {
              var c = children[i];
              if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
                  return c;
              }
          }
      }
  }

  var SIMPLE_NORMALIZE = 1;
  var ALWAYS_NORMALIZE = 2;
  // wrapper function for providing a more flexible interface
  // without getting yelled at by flow
  function createElement$1(context, tag, data, children, normalizationType, alwaysNormalize) {
      if (isArray$1(data) || isPrimitive(data)) {
          normalizationType = children;
          children = data;
          data = undefined;
      }
      if (isTrue(alwaysNormalize)) {
          normalizationType = ALWAYS_NORMALIZE;
      }
      return _createElement(context, tag, data, children, normalizationType);
  }
  function _createElement(context, tag, data, children, normalizationType) {
      if (isDef(data) && isDef(data.__ob__)) {
          return createEmptyVNode();
      }
      // object syntax in v-bind
      if (isDef(data) && isDef(data.is)) {
          tag = data.is;
      }
      if (!tag) {
          // in case of component :is set to falsy value
          return createEmptyVNode();
      }
      // support single function children as default scoped slot
      if (isArray$1(children) && isFunction$1(children[0])) {
          data = data || {};
          data.scopedSlots = { default: children[0] };
          children.length = 0;
      }
      if (normalizationType === ALWAYS_NORMALIZE) {
          children = normalizeChildren(children);
      }
      else if (normalizationType === SIMPLE_NORMALIZE) {
          children = simpleNormalizeChildren(children);
      }
      var vnode, ns;
      if (typeof tag === 'string') {
          var Ctor = void 0;
          ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
          if (config.isReservedTag(tag)) {
              vnode = new VNode(config.parsePlatformTagName(tag), data, children, undefined, undefined, context);
          }
          else if ((!data || !data.pre) &&
              isDef((Ctor = resolveAsset(context.$options, 'components', tag)))) {
              // component
              vnode = createComponent(Ctor, data, context, children, tag);
          }
          else {
              // unknown or unlisted namespaced elements
              // check at runtime because it may get assigned a namespace when its
              // parent normalizes children
              vnode = new VNode(tag, data, children, undefined, undefined, context);
          }
      }
      else {
          // direct component options / constructor
          vnode = createComponent(tag, data, context, children);
      }
      if (isArray$1(vnode)) {
          return vnode;
      }
      else if (isDef(vnode)) {
          if (isDef(ns))
              applyNS(vnode, ns);
          if (isDef(data))
              registerDeepBindings(data);
          return vnode;
      }
      else {
          return createEmptyVNode();
      }
  }
  function applyNS(vnode, ns, force) {
      vnode.ns = ns;
      if (vnode.tag === 'foreignObject') {
          // use default namespace inside foreignObject
          ns = undefined;
          force = true;
      }
      if (isDef(vnode.children)) {
          for (var i = 0, l = vnode.children.length; i < l; i++) {
              var child = vnode.children[i];
              if (isDef(child.tag) &&
                  (isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
                  applyNS(child, ns, force);
              }
          }
      }
  }
  // ref #5318
  // necessary to ensure parent re-render when deep bindings like :style and
  // :class are used on slot nodes
  function registerDeepBindings(data) {
      if (isObject$1(data.style)) {
          traverse(data.style);
      }
      if (isObject$1(data.class)) {
          traverse(data.class);
      }
  }

  function handleError(err, vm, info) {
      // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
      // See: https://github.com/vuejs/vuex/issues/1505
      pushTarget();
      try {
          if (vm) {
              var cur = vm;
              while ((cur = cur.$parent)) {
                  var hooks = cur.$options.errorCaptured;
                  if (hooks) {
                      for (var i = 0; i < hooks.length; i++) {
                          try {
                              var capture = hooks[i].call(cur, err, vm, info) === false;
                              if (capture)
                                  return;
                          }
                          catch (e) {
                              globalHandleError(e, cur, 'errorCaptured hook');
                          }
                      }
                  }
              }
          }
          globalHandleError(err, vm, info);
      }
      finally {
          popTarget();
      }
  }
  function invokeWithErrorHandling(handler, context, args, vm, info) {
      var res;
      try {
          res = args ? handler.apply(context, args) : handler.call(context);
          if (res && !res._isVue && isPromise(res) && !res._handled) {
              res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
              res._handled = true;
          }
      }
      catch (e) {
          handleError(e, vm, info);
      }
      return res;
  }
  function globalHandleError(err, vm, info) {
      if (config.errorHandler) {
          try {
              return config.errorHandler.call(null, err, vm, info);
          }
          catch (e) {
              // if the user intentionally throws the original error in the handler,
              // do not log it twice
              if (e !== err) {
                  logError(e);
              }
          }
      }
      logError(err);
  }
  function logError(err, vm, info) {
      /* istanbul ignore else */
      if (inBrowser && typeof console !== 'undefined') {
          console.error(err);
      }
      else {
          throw err;
      }
  }

  /* globals MutationObserver */
  var isUsingMicroTask = false;
  var callbacks = [];
  var pending = false;
  function flushCallbacks() {
      pending = false;
      var copies = callbacks.slice(0);
      callbacks.length = 0;
      for (var i = 0; i < copies.length; i++) {
          copies[i]();
      }
  }
  // Here we have async deferring wrappers using microtasks.
  // In 2.5 we used (macro) tasks (in combination with microtasks).
  // However, it has subtle problems when state is changed right before repaint
  // (e.g. #6813, out-in transitions).
  // Also, using (macro) tasks in event handler would cause some weird behaviors
  // that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
  // So we now use microtasks everywhere, again.
  // A major drawback of this tradeoff is that there are some scenarios
  // where microtasks have too high a priority and fire in between supposedly
  // sequential events (e.g. #4521, #6690, which have workarounds)
  // or even between bubbling of the same event (#6566).
  var timerFunc;
  // The nextTick behavior leverages the microtask queue, which can be accessed
  // via either native Promise.then or MutationObserver.
  // MutationObserver has wider support, however it is seriously bugged in
  // UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
  // completely stops working after triggering a few times... so, if native
  // Promise is available, we will use it:
  /* istanbul ignore next, $flow-disable-line */
  if (typeof Promise !== 'undefined' && isNative(Promise)) {
      var p_1 = Promise.resolve();
      timerFunc = function () {
          p_1.then(flushCallbacks);
          // In problematic UIWebViews, Promise.then doesn't completely break, but
          // it can get stuck in a weird state where callbacks are pushed into the
          // microtask queue but the queue isn't being flushed, until the browser
          // needs to do some other work, e.g. handle a timer. Therefore we can
          // "force" the microtask queue to be flushed by adding an empty timer.
          if (isIOS)
              setTimeout(noop$1);
      };
      isUsingMicroTask = true;
  }
  else if (!isIE &&
      typeof MutationObserver !== 'undefined' &&
      (isNative(MutationObserver) ||
          // PhantomJS and iOS 7.x
          MutationObserver.toString() === '[object MutationObserverConstructor]')) {
      // Use MutationObserver where native Promise is not available,
      // e.g. PhantomJS, iOS7, Android 4.4
      // (#6466 MutationObserver is unreliable in IE11)
      var counter_1 = 1;
      var observer = new MutationObserver(flushCallbacks);
      var textNode_1 = document.createTextNode(String(counter_1));
      observer.observe(textNode_1, {
          characterData: true
      });
      timerFunc = function () {
          counter_1 = (counter_1 + 1) % 2;
          textNode_1.data = String(counter_1);
      };
      isUsingMicroTask = true;
  }
  else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
      // Fallback to setImmediate.
      // Technically it leverages the (macro) task queue,
      // but it is still a better choice than setTimeout.
      timerFunc = function () {
          setImmediate(flushCallbacks);
      };
  }
  else {
      // Fallback to setTimeout.
      timerFunc = function () {
          setTimeout(flushCallbacks, 0);
      };
  }
  /**
   * @internal
   */
  function nextTick(cb, ctx) {
      var _resolve;
      callbacks.push(function () {
          if (cb) {
              try {
                  cb.call(ctx);
              }
              catch (e) {
                  handleError(e, ctx, 'nextTick');
              }
          }
          else if (_resolve) {
              _resolve(ctx);
          }
      });
      if (!pending) {
          pending = true;
          timerFunc();
      }
      // $flow-disable-line
      if (!cb && typeof Promise !== 'undefined') {
          return new Promise(function (resolve) {
              _resolve = resolve;
          });
      }
  }

  /**
   * Note: also update dist/vue.runtime.mjs when adding new exports to this file.
   */
  var version = '2.7.16';
  /**
   * @internal type is manually declared in <root>/types/v3-define-component.d.ts
   */
  function defineComponent(options) {
      return options;
  }

  var seenObjects = new _Set();
  /**
   * Recursively traverse an object to evoke all converted
   * getters, so that every nested property inside the object
   * is collected as a "deep" dependency.
   */
  function traverse(val) {
      _traverse(val, seenObjects);
      seenObjects.clear();
      return val;
  }
  function _traverse(val, seen) {
      var i, keys;
      var isA = isArray$1(val);
      if ((!isA && !isObject$1(val)) ||
          val.__v_skip /* ReactiveFlags.SKIP */ ||
          Object.isFrozen(val) ||
          val instanceof VNode) {
          return;
      }
      if (val.__ob__) {
          var depId = val.__ob__.dep.id;
          if (seen.has(depId)) {
              return;
          }
          seen.add(depId);
      }
      if (isA) {
          i = val.length;
          while (i--)
              _traverse(val[i], seen);
      }
      else if (isRef(val)) {
          _traverse(val.value, seen);
      }
      else {
          keys = Object.keys(val);
          i = keys.length;
          while (i--)
              _traverse(val[keys[i]], seen);
      }
  }

  var uid$1 = 0;
  /**
   * A watcher parses an expression, collects dependencies,
   * and fires callback when the expression value changes.
   * This is used for both the $watch() api and directives.
   * @internal
   */
  var Watcher = /** @class */ (function () {
      function Watcher(vm, expOrFn, cb, options, isRenderWatcher) {
          recordEffectScope(this, 
          // if the active effect scope is manually created (not a component scope),
          // prioritize it
          activeEffectScope && !activeEffectScope._vm
              ? activeEffectScope
              : vm
                  ? vm._scope
                  : undefined);
          if ((this.vm = vm) && isRenderWatcher) {
              vm._watcher = this;
          }
          // options
          if (options) {
              this.deep = !!options.deep;
              this.user = !!options.user;
              this.lazy = !!options.lazy;
              this.sync = !!options.sync;
              this.before = options.before;
          }
          else {
              this.deep = this.user = this.lazy = this.sync = false;
          }
          this.cb = cb;
          this.id = ++uid$1; // uid for batching
          this.active = true;
          this.post = false;
          this.dirty = this.lazy; // for lazy watchers
          this.deps = [];
          this.newDeps = [];
          this.depIds = new _Set();
          this.newDepIds = new _Set();
          this.expression = '';
          // parse expression for getter
          if (isFunction$1(expOrFn)) {
              this.getter = expOrFn;
          }
          else {
              this.getter = parsePath(expOrFn);
              if (!this.getter) {
                  this.getter = noop$1;
              }
          }
          this.value = this.lazy ? undefined : this.get();
      }
      /**
       * Evaluate the getter, and re-collect dependencies.
       */
      Watcher.prototype.get = function () {
          pushTarget(this);
          var value;
          var vm = this.vm;
          try {
              value = this.getter.call(vm, vm);
          }
          catch (e) {
              if (this.user) {
                  handleError(e, vm, "getter for watcher \"".concat(this.expression, "\""));
              }
              else {
                  throw e;
              }
          }
          finally {
              // "touch" every property so they are all tracked as
              // dependencies for deep watching
              if (this.deep) {
                  traverse(value);
              }
              popTarget();
              this.cleanupDeps();
          }
          return value;
      };
      /**
       * Add a dependency to this directive.
       */
      Watcher.prototype.addDep = function (dep) {
          var id = dep.id;
          if (!this.newDepIds.has(id)) {
              this.newDepIds.add(id);
              this.newDeps.push(dep);
              if (!this.depIds.has(id)) {
                  dep.addSub(this);
              }
          }
      };
      /**
       * Clean up for dependency collection.
       */
      Watcher.prototype.cleanupDeps = function () {
          var i = this.deps.length;
          while (i--) {
              var dep = this.deps[i];
              if (!this.newDepIds.has(dep.id)) {
                  dep.removeSub(this);
              }
          }
          var tmp = this.depIds;
          this.depIds = this.newDepIds;
          this.newDepIds = tmp;
          this.newDepIds.clear();
          tmp = this.deps;
          this.deps = this.newDeps;
          this.newDeps = tmp;
          this.newDeps.length = 0;
      };
      /**
       * Subscriber interface.
       * Will be called when a dependency changes.
       */
      Watcher.prototype.update = function () {
          /* istanbul ignore else */
          if (this.lazy) {
              this.dirty = true;
          }
          else if (this.sync) {
              this.run();
          }
          else {
              queueWatcher(this);
          }
      };
      /**
       * Scheduler job interface.
       * Will be called by the scheduler.
       */
      Watcher.prototype.run = function () {
          if (this.active) {
              var value = this.get();
              if (value !== this.value ||
                  // Deep watchers and watchers on Object/Arrays should fire even
                  // when the value is the same, because the value may
                  // have mutated.
                  isObject$1(value) ||
                  this.deep) {
                  // set new value
                  var oldValue = this.value;
                  this.value = value;
                  if (this.user) {
                      var info = "callback for watcher \"".concat(this.expression, "\"");
                      invokeWithErrorHandling(this.cb, this.vm, [value, oldValue], this.vm, info);
                  }
                  else {
                      this.cb.call(this.vm, value, oldValue);
                  }
              }
          }
      };
      /**
       * Evaluate the value of the watcher.
       * This only gets called for lazy watchers.
       */
      Watcher.prototype.evaluate = function () {
          this.value = this.get();
          this.dirty = false;
      };
      /**
       * Depend on all deps collected by this watcher.
       */
      Watcher.prototype.depend = function () {
          var i = this.deps.length;
          while (i--) {
              this.deps[i].depend();
          }
      };
      /**
       * Remove self from all dependencies' subscriber list.
       */
      Watcher.prototype.teardown = function () {
          if (this.vm && !this.vm._isBeingDestroyed) {
              remove$2(this.vm._scope.effects, this);
          }
          if (this.active) {
              var i = this.deps.length;
              while (i--) {
                  this.deps[i].removeSub(this);
              }
              this.active = false;
              if (this.onStop) {
                  this.onStop();
              }
          }
      };
      return Watcher;
  }());

  function initEvents(vm) {
      vm._events = Object.create(null);
      vm._hasHookEvent = false;
      // init parent attached events
      var listeners = vm.$options._parentListeners;
      if (listeners) {
          updateComponentListeners(vm, listeners);
      }
  }
  var target$1;
  function add$1(event, fn) {
      target$1.$on(event, fn);
  }
  function remove$1(event, fn) {
      target$1.$off(event, fn);
  }
  function createOnceHandler$1(event, fn) {
      var _target = target$1;
      return function onceHandler() {
          var res = fn.apply(null, arguments);
          if (res !== null) {
              _target.$off(event, onceHandler);
          }
      };
  }
  function updateComponentListeners(vm, listeners, oldListeners) {
      target$1 = vm;
      updateListeners(listeners, oldListeners || {}, add$1, remove$1, createOnceHandler$1, vm);
      target$1 = undefined;
  }
  function eventsMixin(Vue) {
      var hookRE = /^hook:/;
      Vue.prototype.$on = function (event, fn) {
          var vm = this;
          if (isArray$1(event)) {
              for (var i = 0, l = event.length; i < l; i++) {
                  vm.$on(event[i], fn);
              }
          }
          else {
              (vm._events[event] || (vm._events[event] = [])).push(fn);
              // optimize hook:event cost by using a boolean flag marked at registration
              // instead of a hash lookup
              if (hookRE.test(event)) {
                  vm._hasHookEvent = true;
              }
          }
          return vm;
      };
      Vue.prototype.$once = function (event, fn) {
          var vm = this;
          function on() {
              vm.$off(event, on);
              fn.apply(vm, arguments);
          }
          on.fn = fn;
          vm.$on(event, on);
          return vm;
      };
      Vue.prototype.$off = function (event, fn) {
          var vm = this;
          // all
          if (!arguments.length) {
              vm._events = Object.create(null);
              return vm;
          }
          // array of events
          if (isArray$1(event)) {
              for (var i_1 = 0, l = event.length; i_1 < l; i_1++) {
                  vm.$off(event[i_1], fn);
              }
              return vm;
          }
          // specific event
          var cbs = vm._events[event];
          if (!cbs) {
              return vm;
          }
          if (!fn) {
              vm._events[event] = null;
              return vm;
          }
          // specific handler
          var cb;
          var i = cbs.length;
          while (i--) {
              cb = cbs[i];
              if (cb === fn || cb.fn === fn) {
                  cbs.splice(i, 1);
                  break;
              }
          }
          return vm;
      };
      Vue.prototype.$emit = function (event) {
          var vm = this;
          var cbs = vm._events[event];
          if (cbs) {
              cbs = cbs.length > 1 ? toArray$1(cbs) : cbs;
              var args = toArray$1(arguments, 1);
              var info = "event handler for \"".concat(event, "\"");
              for (var i = 0, l = cbs.length; i < l; i++) {
                  invokeWithErrorHandling(cbs[i], vm, args, vm, info);
              }
          }
          return vm;
      };
  }

  var activeInstance = null;
  function setActiveInstance(vm) {
      var prevActiveInstance = activeInstance;
      activeInstance = vm;
      return function () {
          activeInstance = prevActiveInstance;
      };
  }
  function initLifecycle(vm) {
      var options = vm.$options;
      // locate first non-abstract parent
      var parent = options.parent;
      if (parent && !options.abstract) {
          while (parent.$options.abstract && parent.$parent) {
              parent = parent.$parent;
          }
          parent.$children.push(vm);
      }
      vm.$parent = parent;
      vm.$root = parent ? parent.$root : vm;
      vm.$children = [];
      vm.$refs = {};
      vm._provided = parent ? parent._provided : Object.create(null);
      vm._watcher = null;
      vm._inactive = null;
      vm._directInactive = false;
      vm._isMounted = false;
      vm._isDestroyed = false;
      vm._isBeingDestroyed = false;
  }
  function lifecycleMixin(Vue) {
      Vue.prototype._update = function (vnode, hydrating) {
          var vm = this;
          var prevEl = vm.$el;
          var prevVnode = vm._vnode;
          var restoreActiveInstance = setActiveInstance(vm);
          vm._vnode = vnode;
          // Vue.prototype.__patch__ is injected in entry points
          // based on the rendering backend used.
          if (!prevVnode) {
              // initial render
              vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
          }
          else {
              // updates
              vm.$el = vm.__patch__(prevVnode, vnode);
          }
          restoreActiveInstance();
          // update __vue__ reference
          if (prevEl) {
              prevEl.__vue__ = null;
          }
          if (vm.$el) {
              vm.$el.__vue__ = vm;
          }
          // if parent is an HOC, update its $el as well
          var wrapper = vm;
          while (wrapper &&
              wrapper.$vnode &&
              wrapper.$parent &&
              wrapper.$vnode === wrapper.$parent._vnode) {
              wrapper.$parent.$el = wrapper.$el;
              wrapper = wrapper.$parent;
          }
          // updated hook is called by the scheduler to ensure that children are
          // updated in a parent's updated hook.
      };
      Vue.prototype.$forceUpdate = function () {
          var vm = this;
          if (vm._watcher) {
              vm._watcher.update();
          }
      };
      Vue.prototype.$destroy = function () {
          var vm = this;
          if (vm._isBeingDestroyed) {
              return;
          }
          callHook$1(vm, 'beforeDestroy');
          vm._isBeingDestroyed = true;
          // remove self from parent
          var parent = vm.$parent;
          if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
              remove$2(parent.$children, vm);
          }
          // teardown scope. this includes both the render watcher and other
          // watchers created
          vm._scope.stop();
          // remove reference from data ob
          // frozen object may not have observer.
          if (vm._data.__ob__) {
              vm._data.__ob__.vmCount--;
          }
          // call the last hook...
          vm._isDestroyed = true;
          // invoke destroy hooks on current rendered tree
          vm.__patch__(vm._vnode, null);
          // fire destroyed hook
          callHook$1(vm, 'destroyed');
          // turn off all instance listeners.
          vm.$off();
          // remove __vue__ reference
          if (vm.$el) {
              vm.$el.__vue__ = null;
          }
          // release circular reference (#6759)
          if (vm.$vnode) {
              vm.$vnode.parent = null;
          }
      };
  }
  function mountComponent(vm, el, hydrating) {
      vm.$el = el;
      if (!vm.$options.render) {
          // @ts-expect-error invalid type
          vm.$options.render = createEmptyVNode;
      }
      callHook$1(vm, 'beforeMount');
      var updateComponent;
      /* istanbul ignore if */
      {
          updateComponent = function () {
              vm._update(vm._render(), hydrating);
          };
      }
      var watcherOptions = {
          before: function () {
              if (vm._isMounted && !vm._isDestroyed) {
                  callHook$1(vm, 'beforeUpdate');
              }
          }
      };
      // we set this to vm._watcher inside the watcher's constructor
      // since the watcher's initial patch may call $forceUpdate (e.g. inside child
      // component's mounted hook), which relies on vm._watcher being already defined
      new Watcher(vm, updateComponent, noop$1, watcherOptions, true /* isRenderWatcher */);
      hydrating = false;
      // flush buffer for flush: "pre" watchers queued in setup()
      var preWatchers = vm._preWatchers;
      if (preWatchers) {
          for (var i = 0; i < preWatchers.length; i++) {
              preWatchers[i].run();
          }
      }
      // manually mounted instance, call mounted on self
      // mounted is called for render-created child components in its inserted hook
      if (vm.$vnode == null) {
          vm._isMounted = true;
          callHook$1(vm, 'mounted');
      }
      return vm;
  }
  function updateChildComponent(vm, propsData, listeners, parentVnode, renderChildren) {
      // determine whether component has slot children
      // we need to do this before overwriting $options._renderChildren.
      // check if there are dynamic scopedSlots (hand-written or compiled but with
      // dynamic slot names). Static scoped slots compiled from template has the
      // "$stable" marker.
      var newScopedSlots = parentVnode.data.scopedSlots;
      var oldScopedSlots = vm.$scopedSlots;
      var hasDynamicScopedSlot = !!((newScopedSlots && !newScopedSlots.$stable) ||
          (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
          (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key) ||
          (!newScopedSlots && vm.$scopedSlots.$key));
      // Any static slot children from the parent may have changed during parent's
      // update. Dynamic scoped slots may also have changed. In such cases, a forced
      // update is necessary to ensure correctness.
      var needsForceUpdate = !!(renderChildren || // has new static slots
          vm.$options._renderChildren || // has old static slots
          hasDynamicScopedSlot);
      var prevVNode = vm.$vnode;
      vm.$options._parentVnode = parentVnode;
      vm.$vnode = parentVnode; // update vm's placeholder node without re-render
      if (vm._vnode) {
          // update child tree's parent
          vm._vnode.parent = parentVnode;
      }
      vm.$options._renderChildren = renderChildren;
      // update $attrs and $listeners hash
      // these are also reactive so they may trigger child update if the child
      // used them during render
      var attrs = parentVnode.data.attrs || emptyObject;
      if (vm._attrsProxy) {
          // force update if attrs are accessed and has changed since it may be
          // passed to a child component.
          if (syncSetupProxy(vm._attrsProxy, attrs, (prevVNode.data && prevVNode.data.attrs) || emptyObject, vm, '$attrs')) {
              needsForceUpdate = true;
          }
      }
      vm.$attrs = attrs;
      // update listeners
      listeners = listeners || emptyObject;
      var prevListeners = vm.$options._parentListeners;
      if (vm._listenersProxy) {
          syncSetupProxy(vm._listenersProxy, listeners, prevListeners || emptyObject, vm, '$listeners');
      }
      vm.$listeners = vm.$options._parentListeners = listeners;
      updateComponentListeners(vm, listeners, prevListeners);
      // update props
      if (propsData && vm.$options.props) {
          toggleObserving(false);
          var props = vm._props;
          var propKeys = vm.$options._propKeys || [];
          for (var i = 0; i < propKeys.length; i++) {
              var key = propKeys[i];
              var propOptions = vm.$options.props; // wtf flow?
              props[key] = validateProp(key, propOptions, propsData, vm);
          }
          toggleObserving(true);
          // keep a copy of raw propsData
          vm.$options.propsData = propsData;
      }
      // resolve slots + force update if has children
      if (needsForceUpdate) {
          vm.$slots = resolveSlots(renderChildren, parentVnode.context);
          vm.$forceUpdate();
      }
  }
  function isInInactiveTree(vm) {
      while (vm && (vm = vm.$parent)) {
          if (vm._inactive)
              return true;
      }
      return false;
  }
  function activateChildComponent(vm, direct) {
      if (direct) {
          vm._directInactive = false;
          if (isInInactiveTree(vm)) {
              return;
          }
      }
      else if (vm._directInactive) {
          return;
      }
      if (vm._inactive || vm._inactive === null) {
          vm._inactive = false;
          for (var i = 0; i < vm.$children.length; i++) {
              activateChildComponent(vm.$children[i]);
          }
          callHook$1(vm, 'activated');
      }
  }
  function deactivateChildComponent(vm, direct) {
      if (direct) {
          vm._directInactive = true;
          if (isInInactiveTree(vm)) {
              return;
          }
      }
      if (!vm._inactive) {
          vm._inactive = true;
          for (var i = 0; i < vm.$children.length; i++) {
              deactivateChildComponent(vm.$children[i]);
          }
          callHook$1(vm, 'deactivated');
      }
  }
  function callHook$1(vm, hook, args, setContext) {
      if (setContext === void 0) { setContext = true; }
      // #7573 disable dep collection when invoking lifecycle hooks
      pushTarget();
      var prevInst = currentInstance;
      var prevScope = getCurrentScope();
      setContext && setCurrentInstance(vm);
      var handlers = vm.$options[hook];
      var info = "".concat(hook, " hook");
      if (handlers) {
          for (var i = 0, j = handlers.length; i < j; i++) {
              invokeWithErrorHandling(handlers[i], vm, null, vm, info);
          }
      }
      if (vm._hasHookEvent) {
          vm.$emit('hook:' + hook);
      }
      if (setContext) {
          setCurrentInstance(prevInst);
          prevScope && prevScope.on();
      }
      popTarget();
  }
  var queue = [];
  var activatedChildren = [];
  var has = {};
  var waiting = false;
  var flushing = false;
  var index = 0;
  /**
   * Reset the scheduler's state.
   */
  function resetSchedulerState() {
      index = queue.length = activatedChildren.length = 0;
      has = {};
      waiting = flushing = false;
  }
  // Async edge case #6566 requires saving the timestamp when event listeners are
  // attached. However, calling performance.now() has a perf overhead especially
  // if the page has thousands of event listeners. Instead, we take a timestamp
  // every time the scheduler flushes and use that for all event listeners
  // attached during that flush.
  var currentFlushTimestamp = 0;
  // Async edge case fix requires storing an event listener's attach timestamp.
  var getNow = Date.now;
  // Determine what event timestamp the browser is using. Annoyingly, the
  // timestamp can either be hi-res (relative to page load) or low-res
  // (relative to UNIX epoch), so in order to compare time we have to use the
  // same timestamp type when saving the flush timestamp.
  // All IE versions use low-res event timestamps, and have problematic clock
  // implementations (#9632)
  if (inBrowser && !isIE) {
      var performance_1 = window.performance;
      if (performance_1 &&
          typeof performance_1.now === 'function' &&
          getNow() > document.createEvent('Event').timeStamp) {
          // if the event timestamp, although evaluated AFTER the Date.now(), is
          // smaller than it, it means the event is using a hi-res timestamp,
          // and we need to use the hi-res version for event listener timestamps as
          // well.
          getNow = function () { return performance_1.now(); };
      }
  }
  var sortCompareFn = function (a, b) {
      if (a.post) {
          if (!b.post)
              return 1;
      }
      else if (b.post) {
          return -1;
      }
      return a.id - b.id;
  };
  /**
   * Flush both queues and run the watchers.
   */
  function flushSchedulerQueue() {
      currentFlushTimestamp = getNow();
      flushing = true;
      var watcher, id;
      // Sort queue before flush.
      // This ensures that:
      // 1. Components are updated from parent to child. (because parent is always
      //    created before the child)
      // 2. A component's user watchers are run before its render watcher (because
      //    user watchers are created before the render watcher)
      // 3. If a component is destroyed during a parent component's watcher run,
      //    its watchers can be skipped.
      queue.sort(sortCompareFn);
      // do not cache length because more watchers might be pushed
      // as we run existing watchers
      for (index = 0; index < queue.length; index++) {
          watcher = queue[index];
          if (watcher.before) {
              watcher.before();
          }
          id = watcher.id;
          has[id] = null;
          watcher.run();
      }
      // keep copies of post queues before resetting state
      var activatedQueue = activatedChildren.slice();
      var updatedQueue = queue.slice();
      resetSchedulerState();
      // call component updated and activated hooks
      callActivatedHooks(activatedQueue);
      callUpdatedHooks(updatedQueue);
      cleanupDeps();
      // devtool hook
      /* istanbul ignore if */
      if (devtools && config.devtools) {
          devtools.emit('flush');
      }
  }
  function callUpdatedHooks(queue) {
      var i = queue.length;
      while (i--) {
          var watcher = queue[i];
          var vm = watcher.vm;
          if (vm && vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
              callHook$1(vm, 'updated');
          }
      }
  }
  /**
   * Queue a kept-alive component that was activated during patch.
   * The queue will be processed after the entire tree has been patched.
   */
  function queueActivatedComponent(vm) {
      // setting _inactive to false here so that a render function can
      // rely on checking whether it's in an inactive tree (e.g. router-view)
      vm._inactive = false;
      activatedChildren.push(vm);
  }
  function callActivatedHooks(queue) {
      for (var i = 0; i < queue.length; i++) {
          queue[i]._inactive = true;
          activateChildComponent(queue[i], true /* true */);
      }
  }
  /**
   * Push a watcher into the watcher queue.
   * Jobs with duplicate IDs will be skipped unless it's
   * pushed when the queue is being flushed.
   */
  function queueWatcher(watcher) {
      var id = watcher.id;
      if (has[id] != null) {
          return;
      }
      if (watcher === Dep.target && watcher.noRecurse) {
          return;
      }
      has[id] = true;
      if (!flushing) {
          queue.push(watcher);
      }
      else {
          // if already flushing, splice the watcher based on its id
          // if already past its id, it will be run next immediately.
          var i = queue.length - 1;
          while (i > index && queue[i].id > watcher.id) {
              i--;
          }
          queue.splice(i + 1, 0, watcher);
      }
      // queue the flush
      if (!waiting) {
          waiting = true;
          nextTick(flushSchedulerQueue);
      }
  }

  function initProvide(vm) {
      var provideOption = vm.$options.provide;
      if (provideOption) {
          var provided = isFunction$1(provideOption)
              ? provideOption.call(vm)
              : provideOption;
          if (!isObject$1(provided)) {
              return;
          }
          var source = resolveProvided(vm);
          // IE9 doesn't support Object.getOwnPropertyDescriptors so we have to
          // iterate the keys ourselves.
          var keys = hasSymbol ? Reflect.ownKeys(provided) : Object.keys(provided);
          for (var i = 0; i < keys.length; i++) {
              var key = keys[i];
              Object.defineProperty(source, key, Object.getOwnPropertyDescriptor(provided, key));
          }
      }
  }
  function initInjections(vm) {
      var result = resolveInject(vm.$options.inject, vm);
      if (result) {
          toggleObserving(false);
          Object.keys(result).forEach(function (key) {
              /* istanbul ignore else */
              {
                  defineReactive(vm, key, result[key]);
              }
          });
          toggleObserving(true);
      }
  }
  function resolveInject(inject, vm) {
      if (inject) {
          // inject is :any because flow is not smart enough to figure out cached
          var result = Object.create(null);
          var keys = hasSymbol ? Reflect.ownKeys(inject) : Object.keys(inject);
          for (var i = 0; i < keys.length; i++) {
              var key = keys[i];
              // #6574 in case the inject object is observed...
              if (key === '__ob__')
                  continue;
              var provideKey = inject[key].from;
              if (provideKey in vm._provided) {
                  result[key] = vm._provided[provideKey];
              }
              else if ('default' in inject[key]) {
                  var provideDefault = inject[key].default;
                  result[key] = isFunction$1(provideDefault)
                      ? provideDefault.call(vm)
                      : provideDefault;
              }
              else ;
          }
          return result;
      }
  }

  function FunctionalRenderContext(data, props, children, parent, Ctor) {
      var _this = this;
      var options = Ctor.options;
      // ensure the createElement function in functional components
      // gets a unique context - this is necessary for correct named slot check
      var contextVm;
      if (hasOwn(parent, '_uid')) {
          contextVm = Object.create(parent);
          contextVm._original = parent;
      }
      else {
          // the context vm passed in is a functional context as well.
          // in this case we want to make sure we are able to get a hold to the
          // real context instance.
          contextVm = parent;
          // @ts-ignore
          parent = parent._original;
      }
      var isCompiled = isTrue(options._compiled);
      var needNormalization = !isCompiled;
      this.data = data;
      this.props = props;
      this.children = children;
      this.parent = parent;
      this.listeners = data.on || emptyObject;
      this.injections = resolveInject(options.inject, parent);
      this.slots = function () {
          if (!_this.$slots) {
              normalizeScopedSlots(parent, data.scopedSlots, (_this.$slots = resolveSlots(children, parent)));
          }
          return _this.$slots;
      };
      Object.defineProperty(this, 'scopedSlots', {
          enumerable: true,
          get: function () {
              return normalizeScopedSlots(parent, data.scopedSlots, this.slots());
          }
      });
      // support for compiled functional template
      if (isCompiled) {
          // exposing $options for renderStatic()
          this.$options = options;
          // pre-resolve slots for renderSlot()
          this.$slots = this.slots();
          this.$scopedSlots = normalizeScopedSlots(parent, data.scopedSlots, this.$slots);
      }
      if (options._scopeId) {
          this._c = function (a, b, c, d) {
              var vnode = createElement$1(contextVm, a, b, c, d, needNormalization);
              if (vnode && !isArray$1(vnode)) {
                  vnode.fnScopeId = options._scopeId;
                  vnode.fnContext = parent;
              }
              return vnode;
          };
      }
      else {
          this._c = function (a, b, c, d) {
              return createElement$1(contextVm, a, b, c, d, needNormalization);
          };
      }
  }
  installRenderHelpers(FunctionalRenderContext.prototype);
  function createFunctionalComponent(Ctor, propsData, data, contextVm, children) {
      var options = Ctor.options;
      var props = {};
      var propOptions = options.props;
      if (isDef(propOptions)) {
          for (var key in propOptions) {
              props[key] = validateProp(key, propOptions, propsData || emptyObject);
          }
      }
      else {
          if (isDef(data.attrs))
              mergeProps(props, data.attrs);
          if (isDef(data.props))
              mergeProps(props, data.props);
      }
      var renderContext = new FunctionalRenderContext(data, props, children, contextVm, Ctor);
      var vnode = options.render.call(null, renderContext._c, renderContext);
      if (vnode instanceof VNode) {
          return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options);
      }
      else if (isArray$1(vnode)) {
          var vnodes = normalizeChildren(vnode) || [];
          var res = new Array(vnodes.length);
          for (var i = 0; i < vnodes.length; i++) {
              res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options);
          }
          return res;
      }
  }
  function cloneAndMarkFunctionalResult(vnode, data, contextVm, options, renderContext) {
      // #7817 clone node before setting fnContext, otherwise if the node is reused
      // (e.g. it was from a cached normal slot) the fnContext causes named slots
      // that should not be matched to match.
      var clone = cloneVNode(vnode);
      clone.fnContext = contextVm;
      clone.fnOptions = options;
      if (data.slot) {
          (clone.data || (clone.data = {})).slot = data.slot;
      }
      return clone;
  }
  function mergeProps(to, from) {
      for (var key in from) {
          to[camelize(key)] = from[key];
      }
  }

  function getComponentName(options) {
      return options.name || options.__name || options._componentTag;
  }
  // inline hooks to be invoked on component VNodes during patch
  var componentVNodeHooks = {
      init: function (vnode, hydrating) {
          if (vnode.componentInstance &&
              !vnode.componentInstance._isDestroyed &&
              vnode.data.keepAlive) {
              // kept-alive components, treat as a patch
              var mountedNode = vnode; // work around flow
              componentVNodeHooks.prepatch(mountedNode, mountedNode);
          }
          else {
              var child = (vnode.componentInstance = createComponentInstanceForVnode(vnode, activeInstance));
              child.$mount(hydrating ? vnode.elm : undefined, hydrating);
          }
      },
      prepatch: function (oldVnode, vnode) {
          var options = vnode.componentOptions;
          var child = (vnode.componentInstance = oldVnode.componentInstance);
          updateChildComponent(child, options.propsData, // updated props
          options.listeners, // updated listeners
          vnode, // new parent vnode
          options.children // new children
          );
      },
      insert: function (vnode) {
          var context = vnode.context, componentInstance = vnode.componentInstance;
          if (!componentInstance._isMounted) {
              componentInstance._isMounted = true;
              callHook$1(componentInstance, 'mounted');
          }
          if (vnode.data.keepAlive) {
              if (context._isMounted) {
                  // vue-router#1212
                  // During updates, a kept-alive component's child components may
                  // change, so directly walking the tree here may call activated hooks
                  // on incorrect children. Instead we push them into a queue which will
                  // be processed after the whole patch process ended.
                  queueActivatedComponent(componentInstance);
              }
              else {
                  activateChildComponent(componentInstance, true /* direct */);
              }
          }
      },
      destroy: function (vnode) {
          var componentInstance = vnode.componentInstance;
          if (!componentInstance._isDestroyed) {
              if (!vnode.data.keepAlive) {
                  componentInstance.$destroy();
              }
              else {
                  deactivateChildComponent(componentInstance, true /* direct */);
              }
          }
      }
  };
  var hooksToMerge = Object.keys(componentVNodeHooks);
  function createComponent(Ctor, data, context, children, tag) {
      if (isUndef(Ctor)) {
          return;
      }
      var baseCtor = context.$options._base;
      // plain options object: turn it into a constructor
      if (isObject$1(Ctor)) {
          Ctor = baseCtor.extend(Ctor);
      }
      // if at this stage it's not a constructor or an async component factory,
      // reject.
      if (typeof Ctor !== 'function') {
          return;
      }
      // async component
      var asyncFactory;
      // @ts-expect-error
      if (isUndef(Ctor.cid)) {
          asyncFactory = Ctor;
          Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
          if (Ctor === undefined) {
              // return a placeholder node for async component, which is rendered
              // as a comment node but preserves all the raw information for the node.
              // the information will be used for async server-rendering and hydration.
              return createAsyncPlaceholder(asyncFactory, data, context, children, tag);
          }
      }
      data = data || {};
      // resolve constructor options in case global mixins are applied after
      // component constructor creation
      resolveConstructorOptions(Ctor);
      // transform component v-model data into props & events
      if (isDef(data.model)) {
          // @ts-expect-error
          transformModel(Ctor.options, data);
      }
      // extract props
      // @ts-expect-error
      var propsData = extractPropsFromVNodeData(data, Ctor);
      // functional component
      // @ts-expect-error
      if (isTrue(Ctor.options.functional)) {
          return createFunctionalComponent(Ctor, propsData, data, context, children);
      }
      // extract listeners, since these needs to be treated as
      // child component listeners instead of DOM listeners
      var listeners = data.on;
      // replace with listeners with .native modifier
      // so it gets processed during parent component patch.
      data.on = data.nativeOn;
      // @ts-expect-error
      if (isTrue(Ctor.options.abstract)) {
          // abstract components do not keep anything
          // other than props & listeners & slot
          // work around flow
          var slot = data.slot;
          data = {};
          if (slot) {
              data.slot = slot;
          }
      }
      // install component management hooks onto the placeholder node
      installComponentHooks(data);
      // return a placeholder vnode
      // @ts-expect-error
      var name = getComponentName(Ctor.options) || tag;
      var vnode = new VNode(
      // @ts-expect-error
      "vue-component-".concat(Ctor.cid).concat(name ? "-".concat(name) : ''), data, undefined, undefined, undefined, context, 
      // @ts-expect-error
      { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children }, asyncFactory);
      return vnode;
  }
  function createComponentInstanceForVnode(
  // we know it's MountedComponentVNode but flow doesn't
  vnode, 
  // activeInstance in lifecycle state
  parent) {
      var options = {
          _isComponent: true,
          _parentVnode: vnode,
          parent: parent
      };
      // check inline-template render functions
      var inlineTemplate = vnode.data.inlineTemplate;
      if (isDef(inlineTemplate)) {
          options.render = inlineTemplate.render;
          options.staticRenderFns = inlineTemplate.staticRenderFns;
      }
      return new vnode.componentOptions.Ctor(options);
  }
  function installComponentHooks(data) {
      var hooks = data.hook || (data.hook = {});
      for (var i = 0; i < hooksToMerge.length; i++) {
          var key = hooksToMerge[i];
          var existing = hooks[key];
          var toMerge = componentVNodeHooks[key];
          // @ts-expect-error
          if (existing !== toMerge && !(existing && existing._merged)) {
              hooks[key] = existing ? mergeHook(toMerge, existing) : toMerge;
          }
      }
  }
  function mergeHook(f1, f2) {
      var merged = function (a, b) {
          // flow complains about extra args which is why we use any
          f1(a, b);
          f2(a, b);
      };
      merged._merged = true;
      return merged;
  }
  // transform component v-model info (value and callback) into
  // prop and event handler respectively.
  function transformModel(options, data) {
      var prop = (options.model && options.model.prop) || 'value';
      var event = (options.model && options.model.event) || 'input';
      (data.attrs || (data.attrs = {}))[prop] = data.model.value;
      var on = data.on || (data.on = {});
      var existing = on[event];
      var callback = data.model.callback;
      if (isDef(existing)) {
          if (isArray$1(existing)
              ? existing.indexOf(callback) === -1
              : existing !== callback) {
              on[event] = [callback].concat(existing);
          }
      }
      else {
          on[event] = callback;
      }
  }

  var warn = noop$1;

  /**
   * Option overwriting strategies are functions that handle
   * how to merge a parent option value and a child option
   * value into the final value.
   */
  var strats = config.optionMergeStrategies;
  /**
   * Helper that recursively merges two data objects together.
   */
  function mergeData(to, from, recursive) {
      if (recursive === void 0) { recursive = true; }
      if (!from)
          return to;
      var key, toVal, fromVal;
      var keys = hasSymbol
          ? Reflect.ownKeys(from)
          : Object.keys(from);
      for (var i = 0; i < keys.length; i++) {
          key = keys[i];
          // in case the object is already observed...
          if (key === '__ob__')
              continue;
          toVal = to[key];
          fromVal = from[key];
          if (!recursive || !hasOwn(to, key)) {
              set(to, key, fromVal);
          }
          else if (toVal !== fromVal &&
              isPlainObject$1(toVal) &&
              isPlainObject$1(fromVal)) {
              mergeData(toVal, fromVal);
          }
      }
      return to;
  }
  /**
   * Data
   */
  function mergeDataOrFn(parentVal, childVal, vm) {
      if (!vm) {
          // in a Vue.extend merge, both should be functions
          if (!childVal) {
              return parentVal;
          }
          if (!parentVal) {
              return childVal;
          }
          // when parentVal & childVal are both present,
          // we need to return a function that returns the
          // merged result of both functions... no need to
          // check if parentVal is a function here because
          // it has to be a function to pass previous merges.
          return function mergedDataFn() {
              return mergeData(isFunction$1(childVal) ? childVal.call(this, this) : childVal, isFunction$1(parentVal) ? parentVal.call(this, this) : parentVal);
          };
      }
      else {
          return function mergedInstanceDataFn() {
              // instance merge
              var instanceData = isFunction$1(childVal)
                  ? childVal.call(vm, vm)
                  : childVal;
              var defaultData = isFunction$1(parentVal)
                  ? parentVal.call(vm, vm)
                  : parentVal;
              if (instanceData) {
                  return mergeData(instanceData, defaultData);
              }
              else {
                  return defaultData;
              }
          };
      }
  }
  strats.data = function (parentVal, childVal, vm) {
      if (!vm) {
          if (childVal && typeof childVal !== 'function') {
              return parentVal;
          }
          return mergeDataOrFn(parentVal, childVal);
      }
      return mergeDataOrFn(parentVal, childVal, vm);
  };
  /**
   * Hooks and props are merged as arrays.
   */
  function mergeLifecycleHook(parentVal, childVal) {
      var res = childVal
          ? parentVal
              ? parentVal.concat(childVal)
              : isArray$1(childVal)
                  ? childVal
                  : [childVal]
          : parentVal;
      return res ? dedupeHooks(res) : res;
  }
  function dedupeHooks(hooks) {
      var res = [];
      for (var i = 0; i < hooks.length; i++) {
          if (res.indexOf(hooks[i]) === -1) {
              res.push(hooks[i]);
          }
      }
      return res;
  }
  LIFECYCLE_HOOKS.forEach(function (hook) {
      strats[hook] = mergeLifecycleHook;
  });
  /**
   * Assets
   *
   * When a vm is present (instance creation), we need to do
   * a three-way merge between constructor options, instance
   * options and parent options.
   */
  function mergeAssets(parentVal, childVal, vm, key) {
      var res = Object.create(parentVal || null);
      if (childVal) {
          return extend$1(res, childVal);
      }
      else {
          return res;
      }
  }
  ASSET_TYPES.forEach(function (type) {
      strats[type + 's'] = mergeAssets;
  });
  /**
   * Watchers.
   *
   * Watchers hashes should not overwrite one
   * another, so we merge them as arrays.
   */
  strats.watch = function (parentVal, childVal, vm, key) {
      // work around Firefox's Object.prototype.watch...
      //@ts-expect-error work around
      if (parentVal === nativeWatch)
          parentVal = undefined;
      //@ts-expect-error work around
      if (childVal === nativeWatch)
          childVal = undefined;
      /* istanbul ignore if */
      if (!childVal)
          return Object.create(parentVal || null);
      if (!parentVal)
          return childVal;
      var ret = {};
      extend$1(ret, parentVal);
      for (var key_1 in childVal) {
          var parent_1 = ret[key_1];
          var child = childVal[key_1];
          if (parent_1 && !isArray$1(parent_1)) {
              parent_1 = [parent_1];
          }
          ret[key_1] = parent_1 ? parent_1.concat(child) : isArray$1(child) ? child : [child];
      }
      return ret;
  };
  /**
   * Other object hashes.
   */
  strats.props =
      strats.methods =
          strats.inject =
              strats.computed =
                  function (parentVal, childVal, vm, key) {
                      if (!parentVal)
                          return childVal;
                      var ret = Object.create(null);
                      extend$1(ret, parentVal);
                      if (childVal)
                          extend$1(ret, childVal);
                      return ret;
                  };
  strats.provide = function (parentVal, childVal) {
      if (!parentVal)
          return childVal;
      return function () {
          var ret = Object.create(null);
          mergeData(ret, isFunction$1(parentVal) ? parentVal.call(this) : parentVal);
          if (childVal) {
              mergeData(ret, isFunction$1(childVal) ? childVal.call(this) : childVal, false // non-recursive
              );
          }
          return ret;
      };
  };
  /**
   * Default strategy.
   */
  var defaultStrat = function (parentVal, childVal) {
      return childVal === undefined ? parentVal : childVal;
  };
  /**
   * Ensure all props option syntax are normalized into the
   * Object-based format.
   */
  function normalizeProps(options, vm) {
      var props = options.props;
      if (!props)
          return;
      var res = {};
      var i, val, name;
      if (isArray$1(props)) {
          i = props.length;
          while (i--) {
              val = props[i];
              if (typeof val === 'string') {
                  name = camelize(val);
                  res[name] = { type: null };
              }
          }
      }
      else if (isPlainObject$1(props)) {
          for (var key in props) {
              val = props[key];
              name = camelize(key);
              res[name] = isPlainObject$1(val) ? val : { type: val };
          }
      }
      else ;
      options.props = res;
  }
  /**
   * Normalize all injections into Object-based format
   */
  function normalizeInject(options, vm) {
      var inject = options.inject;
      if (!inject)
          return;
      var normalized = (options.inject = {});
      if (isArray$1(inject)) {
          for (var i = 0; i < inject.length; i++) {
              normalized[inject[i]] = { from: inject[i] };
          }
      }
      else if (isPlainObject$1(inject)) {
          for (var key in inject) {
              var val = inject[key];
              normalized[key] = isPlainObject$1(val)
                  ? extend$1({ from: key }, val)
                  : { from: val };
          }
      }
      else ;
  }
  /**
   * Normalize raw function directives into object format.
   */
  function normalizeDirectives$1(options) {
      var dirs = options.directives;
      if (dirs) {
          for (var key in dirs) {
              var def = dirs[key];
              if (isFunction$1(def)) {
                  dirs[key] = { bind: def, update: def };
              }
          }
      }
  }
  /**
   * Merge two option objects into a new one.
   * Core utility used in both instantiation and inheritance.
   */
  function mergeOptions(parent, child, vm) {
      if (isFunction$1(child)) {
          // @ts-expect-error
          child = child.options;
      }
      normalizeProps(child);
      normalizeInject(child);
      normalizeDirectives$1(child);
      // Apply extends and mixins on the child options,
      // but only if it is a raw options object that isn't
      // the result of another mergeOptions call.
      // Only merged options has the _base property.
      if (!child._base) {
          if (child.extends) {
              parent = mergeOptions(parent, child.extends, vm);
          }
          if (child.mixins) {
              for (var i = 0, l = child.mixins.length; i < l; i++) {
                  parent = mergeOptions(parent, child.mixins[i], vm);
              }
          }
      }
      var options = {};
      var key;
      for (key in parent) {
          mergeField(key);
      }
      for (key in child) {
          if (!hasOwn(parent, key)) {
              mergeField(key);
          }
      }
      function mergeField(key) {
          var strat = strats[key] || defaultStrat;
          options[key] = strat(parent[key], child[key], vm, key);
      }
      return options;
  }
  /**
   * Resolve an asset.
   * This function is used because child instances need access
   * to assets defined in its ancestor chain.
   */
  function resolveAsset(options, type, id, warnMissing) {
      /* istanbul ignore if */
      if (typeof id !== 'string') {
          return;
      }
      var assets = options[type];
      // check local registration variations first
      if (hasOwn(assets, id))
          return assets[id];
      var camelizedId = camelize(id);
      if (hasOwn(assets, camelizedId))
          return assets[camelizedId];
      var PascalCaseId = capitalize(camelizedId);
      if (hasOwn(assets, PascalCaseId))
          return assets[PascalCaseId];
      // fallback to prototype chain
      var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
      return res;
  }

  function validateProp(key, propOptions, propsData, vm) {
      var prop = propOptions[key];
      var absent = !hasOwn(propsData, key);
      var value = propsData[key];
      // boolean casting
      var booleanIndex = getTypeIndex(Boolean, prop.type);
      if (booleanIndex > -1) {
          if (absent && !hasOwn(prop, 'default')) {
              value = false;
          }
          else if (value === '' || value === hyphenate(key)) {
              // only cast empty string / same name to boolean if
              // boolean has higher priority
              var stringIndex = getTypeIndex(String, prop.type);
              if (stringIndex < 0 || booleanIndex < stringIndex) {
                  value = true;
              }
          }
      }
      // check default value
      if (value === undefined) {
          value = getPropDefaultValue(vm, prop, key);
          // since the default value is a fresh copy,
          // make sure to observe it.
          var prevShouldObserve = shouldObserve;
          toggleObserving(true);
          observe(value);
          toggleObserving(prevShouldObserve);
      }
      return value;
  }
  /**
   * Get the default value of a prop.
   */
  function getPropDefaultValue(vm, prop, key) {
      // no default, return undefined
      if (!hasOwn(prop, 'default')) {
          return undefined;
      }
      var def = prop.default;
      // the raw prop value was also undefined from previous render,
      // return previous default value to avoid unnecessary watcher trigger
      if (vm &&
          vm.$options.propsData &&
          vm.$options.propsData[key] === undefined &&
          vm._props[key] !== undefined) {
          return vm._props[key];
      }
      // call factory function for non-Function types
      // a value is Function if its prototype is function even across different execution context
      return isFunction$1(def) && getType(prop.type) !== 'Function'
          ? def.call(vm)
          : def;
  }
  var functionTypeCheckRE = /^\s*function (\w+)/;
  /**
   * Use function string name to check built-in types,
   * because a simple equality check will fail when running
   * across different vms / iframes.
   */
  function getType(fn) {
      var match = fn && fn.toString().match(functionTypeCheckRE);
      return match ? match[1] : '';
  }
  function isSameType(a, b) {
      return getType(a) === getType(b);
  }
  function getTypeIndex(type, expectedTypes) {
      if (!isArray$1(expectedTypes)) {
          return isSameType(expectedTypes, type) ? 0 : -1;
      }
      for (var i = 0, len = expectedTypes.length; i < len; i++) {
          if (isSameType(expectedTypes[i], type)) {
              return i;
          }
      }
      return -1;
  }

  var sharedPropertyDefinition = {
      enumerable: true,
      configurable: true,
      get: noop$1,
      set: noop$1
  };
  function proxy(target, sourceKey, key) {
      sharedPropertyDefinition.get = function proxyGetter() {
          return this[sourceKey][key];
      };
      sharedPropertyDefinition.set = function proxySetter(val) {
          this[sourceKey][key] = val;
      };
      Object.defineProperty(target, key, sharedPropertyDefinition);
  }
  function initState(vm) {
      var opts = vm.$options;
      if (opts.props)
          initProps$1(vm, opts.props);
      // Composition API
      initSetup(vm);
      if (opts.methods)
          initMethods(vm, opts.methods);
      if (opts.data) {
          initData(vm);
      }
      else {
          var ob = observe((vm._data = {}));
          ob && ob.vmCount++;
      }
      if (opts.computed)
          initComputed$1(vm, opts.computed);
      if (opts.watch && opts.watch !== nativeWatch) {
          initWatch(vm, opts.watch);
      }
  }
  function initProps$1(vm, propsOptions) {
      var propsData = vm.$options.propsData || {};
      var props = (vm._props = shallowReactive({}));
      // cache prop keys so that future props updates can iterate using Array
      // instead of dynamic object key enumeration.
      var keys = (vm.$options._propKeys = []);
      var isRoot = !vm.$parent;
      // root instance props should be converted
      if (!isRoot) {
          toggleObserving(false);
      }
      var _loop_1 = function (key) {
          keys.push(key);
          var value = validateProp(key, propsOptions, propsData, vm);
          /* istanbul ignore else */
          {
              defineReactive(props, key, value, undefined, true /* shallow */);
          }
          // static props are already proxied on the component's prototype
          // during Vue.extend(). We only need to proxy props defined at
          // instantiation here.
          if (!(key in vm)) {
              proxy(vm, "_props", key);
          }
      };
      for (var key in propsOptions) {
          _loop_1(key);
      }
      toggleObserving(true);
  }
  function initData(vm) {
      var data = vm.$options.data;
      data = vm._data = isFunction$1(data) ? getData(data, vm) : data || {};
      if (!isPlainObject$1(data)) {
          data = {};
      }
      // proxy data on instance
      var keys = Object.keys(data);
      var props = vm.$options.props;
      vm.$options.methods;
      var i = keys.length;
      while (i--) {
          var key = keys[i];
          if (props && hasOwn(props, key)) ;
          else if (!isReserved(key)) {
              proxy(vm, "_data", key);
          }
      }
      // observe data
      var ob = observe(data);
      ob && ob.vmCount++;
  }
  function getData(data, vm) {
      // #7573 disable dep collection when invoking data getters
      pushTarget();
      try {
          return data.call(vm, vm);
      }
      catch (e) {
          handleError(e, vm, "data()");
          return {};
      }
      finally {
          popTarget();
      }
  }
  var computedWatcherOptions = { lazy: true };
  function initComputed$1(vm, computed) {
      // $flow-disable-line
      var watchers = (vm._computedWatchers = Object.create(null));
      // computed properties are just getters during SSR
      var isSSR = isServerRendering();
      for (var key in computed) {
          var userDef = computed[key];
          var getter = isFunction$1(userDef) ? userDef : userDef.get;
          if (!isSSR) {
              // create internal watcher for the computed property.
              watchers[key] = new Watcher(vm, getter || noop$1, noop$1, computedWatcherOptions);
          }
          // component-defined computed properties are already defined on the
          // component prototype. We only need to define computed properties defined
          // at instantiation here.
          if (!(key in vm)) {
              defineComputed(vm, key, userDef);
          }
      }
  }
  function defineComputed(target, key, userDef) {
      var shouldCache = !isServerRendering();
      if (isFunction$1(userDef)) {
          sharedPropertyDefinition.get = shouldCache
              ? createComputedGetter(key)
              : createGetterInvoker(userDef);
          sharedPropertyDefinition.set = noop$1;
      }
      else {
          sharedPropertyDefinition.get = userDef.get
              ? shouldCache && userDef.cache !== false
                  ? createComputedGetter(key)
                  : createGetterInvoker(userDef.get)
              : noop$1;
          sharedPropertyDefinition.set = userDef.set || noop$1;
      }
      Object.defineProperty(target, key, sharedPropertyDefinition);
  }
  function createComputedGetter(key) {
      return function computedGetter() {
          var watcher = this._computedWatchers && this._computedWatchers[key];
          if (watcher) {
              if (watcher.dirty) {
                  watcher.evaluate();
              }
              if (Dep.target) {
                  watcher.depend();
              }
              return watcher.value;
          }
      };
  }
  function createGetterInvoker(fn) {
      return function computedGetter() {
          return fn.call(this, this);
      };
  }
  function initMethods(vm, methods) {
      vm.$options.props;
      for (var key in methods) {
          vm[key] = typeof methods[key] !== 'function' ? noop$1 : bind$1(methods[key], vm);
      }
  }
  function initWatch(vm, watch) {
      for (var key in watch) {
          var handler = watch[key];
          if (isArray$1(handler)) {
              for (var i = 0; i < handler.length; i++) {
                  createWatcher(vm, key, handler[i]);
              }
          }
          else {
              createWatcher(vm, key, handler);
          }
      }
  }
  function createWatcher(vm, expOrFn, handler, options) {
      if (isPlainObject$1(handler)) {
          options = handler;
          handler = handler.handler;
      }
      if (typeof handler === 'string') {
          handler = vm[handler];
      }
      return vm.$watch(expOrFn, handler, options);
  }
  function stateMixin(Vue) {
      // flow somehow has problems with directly declared definition object
      // when using Object.defineProperty, so we have to procedurally build up
      // the object here.
      var dataDef = {};
      dataDef.get = function () {
          return this._data;
      };
      var propsDef = {};
      propsDef.get = function () {
          return this._props;
      };
      Object.defineProperty(Vue.prototype, '$data', dataDef);
      Object.defineProperty(Vue.prototype, '$props', propsDef);
      Vue.prototype.$set = set;
      Vue.prototype.$delete = del;
      Vue.prototype.$watch = function (expOrFn, cb, options) {
          var vm = this;
          if (isPlainObject$1(cb)) {
              return createWatcher(vm, expOrFn, cb, options);
          }
          options = options || {};
          options.user = true;
          var watcher = new Watcher(vm, expOrFn, cb, options);
          if (options.immediate) {
              var info = "callback for immediate watcher \"".concat(watcher.expression, "\"");
              pushTarget();
              invokeWithErrorHandling(cb, vm, [watcher.value], vm, info);
              popTarget();
          }
          return function unwatchFn() {
              watcher.teardown();
          };
      };
  }

  var uid = 0;
  function initMixin$1(Vue) {
      Vue.prototype._init = function (options) {
          var vm = this;
          // a uid
          vm._uid = uid++;
          // a flag to mark this as a Vue instance without having to do instanceof
          // check
          vm._isVue = true;
          // avoid instances from being observed
          vm.__v_skip = true;
          // effect scope
          vm._scope = new EffectScope(true /* detached */);
          // #13134 edge case where a child component is manually created during the
          // render of a parent component
          vm._scope.parent = undefined;
          vm._scope._vm = true;
          // merge options
          if (options && options._isComponent) {
              // optimize internal component instantiation
              // since dynamic options merging is pretty slow, and none of the
              // internal component options needs special treatment.
              initInternalComponent(vm, options);
          }
          else {
              vm.$options = mergeOptions(resolveConstructorOptions(vm.constructor), options || {}, vm);
          }
          /* istanbul ignore else */
          {
              vm._renderProxy = vm;
          }
          // expose real self
          vm._self = vm;
          initLifecycle(vm);
          initEvents(vm);
          initRender(vm);
          callHook$1(vm, 'beforeCreate', undefined, false /* setContext */);
          initInjections(vm); // resolve injections before data/props
          initState(vm);
          initProvide(vm); // resolve provide after data/props
          callHook$1(vm, 'created');
          if (vm.$options.el) {
              vm.$mount(vm.$options.el);
          }
      };
  }
  function initInternalComponent(vm, options) {
      var opts = (vm.$options = Object.create(vm.constructor.options));
      // doing this because it's faster than dynamic enumeration.
      var parentVnode = options._parentVnode;
      opts.parent = options.parent;
      opts._parentVnode = parentVnode;
      var vnodeComponentOptions = parentVnode.componentOptions;
      opts.propsData = vnodeComponentOptions.propsData;
      opts._parentListeners = vnodeComponentOptions.listeners;
      opts._renderChildren = vnodeComponentOptions.children;
      opts._componentTag = vnodeComponentOptions.tag;
      if (options.render) {
          opts.render = options.render;
          opts.staticRenderFns = options.staticRenderFns;
      }
  }
  function resolveConstructorOptions(Ctor) {
      var options = Ctor.options;
      if (Ctor.super) {
          var superOptions = resolveConstructorOptions(Ctor.super);
          var cachedSuperOptions = Ctor.superOptions;
          if (superOptions !== cachedSuperOptions) {
              // super option changed,
              // need to resolve new options.
              Ctor.superOptions = superOptions;
              // check if there are any late-modified/attached options (#4976)
              var modifiedOptions = resolveModifiedOptions(Ctor);
              // update base extend options
              if (modifiedOptions) {
                  extend$1(Ctor.extendOptions, modifiedOptions);
              }
              options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
              if (options.name) {
                  options.components[options.name] = Ctor;
              }
          }
      }
      return options;
  }
  function resolveModifiedOptions(Ctor) {
      var modified;
      var latest = Ctor.options;
      var sealed = Ctor.sealedOptions;
      for (var key in latest) {
          if (latest[key] !== sealed[key]) {
              if (!modified)
                  modified = {};
              modified[key] = latest[key];
          }
      }
      return modified;
  }

  function Vue(options) {
      this._init(options);
  }
  //@ts-expect-error Vue has function type
  initMixin$1(Vue);
  //@ts-expect-error Vue has function type
  stateMixin(Vue);
  //@ts-expect-error Vue has function type
  eventsMixin(Vue);
  //@ts-expect-error Vue has function type
  lifecycleMixin(Vue);
  //@ts-expect-error Vue has function type
  renderMixin(Vue);

  function initUse(Vue) {
      Vue.use = function (plugin) {
          var installedPlugins = this._installedPlugins || (this._installedPlugins = []);
          if (installedPlugins.indexOf(plugin) > -1) {
              return this;
          }
          // additional parameters
          var args = toArray$1(arguments, 1);
          args.unshift(this);
          if (isFunction$1(plugin.install)) {
              plugin.install.apply(plugin, args);
          }
          else if (isFunction$1(plugin)) {
              plugin.apply(null, args);
          }
          installedPlugins.push(plugin);
          return this;
      };
  }

  function initMixin(Vue) {
      Vue.mixin = function (mixin) {
          this.options = mergeOptions(this.options, mixin);
          return this;
      };
  }

  function initExtend(Vue) {
      /**
       * Each instance constructor, including Vue, has a unique
       * cid. This enables us to create wrapped "child
       * constructors" for prototypal inheritance and cache them.
       */
      Vue.cid = 0;
      var cid = 1;
      /**
       * Class inheritance
       */
      Vue.extend = function (extendOptions) {
          extendOptions = extendOptions || {};
          var Super = this;
          var SuperId = Super.cid;
          var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
          if (cachedCtors[SuperId]) {
              return cachedCtors[SuperId];
          }
          var name = getComponentName(extendOptions) || getComponentName(Super.options);
          var Sub = function VueComponent(options) {
              this._init(options);
          };
          Sub.prototype = Object.create(Super.prototype);
          Sub.prototype.constructor = Sub;
          Sub.cid = cid++;
          Sub.options = mergeOptions(Super.options, extendOptions);
          Sub['super'] = Super;
          // For props and computed properties, we define the proxy getters on
          // the Vue instances at extension time, on the extended prototype. This
          // avoids Object.defineProperty calls for each instance created.
          if (Sub.options.props) {
              initProps(Sub);
          }
          if (Sub.options.computed) {
              initComputed(Sub);
          }
          // allow further extension/mixin/plugin usage
          Sub.extend = Super.extend;
          Sub.mixin = Super.mixin;
          Sub.use = Super.use;
          // create asset registers, so extended classes
          // can have their private assets too.
          ASSET_TYPES.forEach(function (type) {
              Sub[type] = Super[type];
          });
          // enable recursive self-lookup
          if (name) {
              Sub.options.components[name] = Sub;
          }
          // keep a reference to the super options at extension time.
          // later at instantiation we can check if Super's options have
          // been updated.
          Sub.superOptions = Super.options;
          Sub.extendOptions = extendOptions;
          Sub.sealedOptions = extend$1({}, Sub.options);
          // cache constructor
          cachedCtors[SuperId] = Sub;
          return Sub;
      };
  }
  function initProps(Comp) {
      var props = Comp.options.props;
      for (var key in props) {
          proxy(Comp.prototype, "_props", key);
      }
  }
  function initComputed(Comp) {
      var computed = Comp.options.computed;
      for (var key in computed) {
          defineComputed(Comp.prototype, key, computed[key]);
      }
  }

  function initAssetRegisters(Vue) {
      /**
       * Create asset registration methods.
       */
      ASSET_TYPES.forEach(function (type) {
          // @ts-expect-error function is not exact same type
          Vue[type] = function (id, definition) {
              if (!definition) {
                  return this.options[type + 's'][id];
              }
              else {
                  if (type === 'component' && isPlainObject$1(definition)) {
                      // @ts-expect-error
                      definition.name = definition.name || id;
                      definition = this.options._base.extend(definition);
                  }
                  if (type === 'directive' && isFunction$1(definition)) {
                      definition = { bind: definition, update: definition };
                  }
                  this.options[type + 's'][id] = definition;
                  return definition;
              }
          };
      });
  }

  function _getComponentName(opts) {
      return opts && (getComponentName(opts.Ctor.options) || opts.tag);
  }
  function matches(pattern, name) {
      if (isArray$1(pattern)) {
          return pattern.indexOf(name) > -1;
      }
      else if (typeof pattern === 'string') {
          return pattern.split(',').indexOf(name) > -1;
      }
      else if (isRegExp$1(pattern)) {
          return pattern.test(name);
      }
      /* istanbul ignore next */
      return false;
  }
  function pruneCache(keepAliveInstance, filter) {
      var cache = keepAliveInstance.cache, keys = keepAliveInstance.keys, _vnode = keepAliveInstance._vnode, $vnode = keepAliveInstance.$vnode;
      for (var key in cache) {
          var entry = cache[key];
          if (entry) {
              var name_1 = entry.name;
              if (name_1 && !filter(name_1)) {
                  pruneCacheEntry(cache, key, keys, _vnode);
              }
          }
      }
      $vnode.componentOptions.children = undefined;
  }
  function pruneCacheEntry(cache, key, keys, current) {
      var entry = cache[key];
      if (entry && (!current || entry.tag !== current.tag)) {
          // @ts-expect-error can be undefined
          entry.componentInstance.$destroy();
      }
      cache[key] = null;
      remove$2(keys, key);
  }
  var patternTypes = [String, RegExp, Array];
  // TODO defineComponent
  var KeepAlive = {
      name: 'keep-alive',
      abstract: true,
      props: {
          include: patternTypes,
          exclude: patternTypes,
          max: [String, Number]
      },
      methods: {
          cacheVNode: function () {
              var _a = this, cache = _a.cache, keys = _a.keys, vnodeToCache = _a.vnodeToCache, keyToCache = _a.keyToCache;
              if (vnodeToCache) {
                  var tag = vnodeToCache.tag, componentInstance = vnodeToCache.componentInstance, componentOptions = vnodeToCache.componentOptions;
                  cache[keyToCache] = {
                      name: _getComponentName(componentOptions),
                      tag: tag,
                      componentInstance: componentInstance
                  };
                  keys.push(keyToCache);
                  // prune oldest entry
                  if (this.max && keys.length > parseInt(this.max)) {
                      pruneCacheEntry(cache, keys[0], keys, this._vnode);
                  }
                  this.vnodeToCache = null;
              }
          }
      },
      created: function () {
          this.cache = Object.create(null);
          this.keys = [];
      },
      destroyed: function () {
          for (var key in this.cache) {
              pruneCacheEntry(this.cache, key, this.keys);
          }
      },
      mounted: function () {
          var _this = this;
          this.cacheVNode();
          this.$watch('include', function (val) {
              pruneCache(_this, function (name) { return matches(val, name); });
          });
          this.$watch('exclude', function (val) {
              pruneCache(_this, function (name) { return !matches(val, name); });
          });
      },
      updated: function () {
          this.cacheVNode();
      },
      render: function () {
          var slot = this.$slots.default;
          var vnode = getFirstComponentChild(slot);
          var componentOptions = vnode && vnode.componentOptions;
          if (componentOptions) {
              // check pattern
              var name_2 = _getComponentName(componentOptions);
              var _a = this, include = _a.include, exclude = _a.exclude;
              if (
              // not included
              (include && (!name_2 || !matches(include, name_2))) ||
                  // excluded
                  (exclude && name_2 && matches(exclude, name_2))) {
                  return vnode;
              }
              var _b = this, cache = _b.cache, keys = _b.keys;
              var key = vnode.key == null
                  ? // same constructor may get registered as different local components
                      // so cid alone is not enough (#3269)
                      componentOptions.Ctor.cid +
                          (componentOptions.tag ? "::".concat(componentOptions.tag) : '')
                  : vnode.key;
              if (cache[key]) {
                  vnode.componentInstance = cache[key].componentInstance;
                  // make current key freshest
                  remove$2(keys, key);
                  keys.push(key);
              }
              else {
                  // delay setting the cache until update
                  this.vnodeToCache = vnode;
                  this.keyToCache = key;
              }
              // @ts-expect-error can vnode.data can be undefined
              vnode.data.keepAlive = true;
          }
          return vnode || (slot && slot[0]);
      }
  };

  var builtInComponents = {
      KeepAlive: KeepAlive
  };

  function initGlobalAPI(Vue) {
      // config
      var configDef = {};
      configDef.get = function () { return config; };
      Object.defineProperty(Vue, 'config', configDef);
      // exposed util methods.
      // NOTE: these are not considered part of the public API - avoid relying on
      // them unless you are aware of the risk.
      Vue.util = {
          warn: warn,
          extend: extend$1,
          mergeOptions: mergeOptions,
          defineReactive: defineReactive
      };
      Vue.set = set;
      Vue.delete = del;
      Vue.nextTick = nextTick;
      // 2.6 explicit observable API
      Vue.observable = function (obj) {
          observe(obj);
          return obj;
      };
      Vue.options = Object.create(null);
      ASSET_TYPES.forEach(function (type) {
          Vue.options[type + 's'] = Object.create(null);
      });
      // this is used to identify the "base" constructor to extend all plain-object
      // components with in Weex's multi-instance scenarios.
      Vue.options._base = Vue;
      extend$1(Vue.options.components, builtInComponents);
      initUse(Vue);
      initMixin(Vue);
      initExtend(Vue);
      initAssetRegisters(Vue);
  }

  initGlobalAPI(Vue);
  Object.defineProperty(Vue.prototype, '$isServer', {
      get: isServerRendering
  });
  Object.defineProperty(Vue.prototype, '$ssrContext', {
      get: function () {
          /* istanbul ignore next */
          return this.$vnode && this.$vnode.ssrContext;
      }
  });
  // expose FunctionalRenderContext for ssr runtime helper installation
  Object.defineProperty(Vue, 'FunctionalRenderContext', {
      value: FunctionalRenderContext
  });
  Vue.version = version;

  // these are reserved for web because they are directly compiled away
  // during template compilation
  var isReservedAttr = makeMap('style,class');
  // attributes that should be using props for binding
  var acceptValue = makeMap('input,textarea,option,select,progress');
  var mustUseProp = function (tag, type, attr) {
      return ((attr === 'value' && acceptValue(tag) && type !== 'button') ||
          (attr === 'selected' && tag === 'option') ||
          (attr === 'checked' && tag === 'input') ||
          (attr === 'muted' && tag === 'video'));
  };
  var isEnumeratedAttr = makeMap('contenteditable,draggable,spellcheck');
  var isValidContentEditableValue = makeMap('events,caret,typing,plaintext-only');
  var convertEnumeratedValue = function (key, value) {
      return isFalsyAttrValue(value) || value === 'false'
          ? 'false'
          : // allow arbitrary string value for contenteditable
              key === 'contenteditable' && isValidContentEditableValue(value)
                  ? value
                  : 'true';
  };
  var isBooleanAttr = makeMap('allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,' +
      'default,defaultchecked,defaultmuted,defaultselected,defer,disabled,' +
      'enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,' +
      'muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,' +
      'required,reversed,scoped,seamless,selected,sortable,' +
      'truespeed,typemustmatch,visible');
  var xlinkNS = 'http://www.w3.org/1999/xlink';
  var isXlink = function (name) {
      return name.charAt(5) === ':' && name.slice(0, 5) === 'xlink';
  };
  var getXlinkProp = function (name) {
      return isXlink(name) ? name.slice(6, name.length) : '';
  };
  var isFalsyAttrValue = function (val) {
      return val == null || val === false;
  };

  function genClassForVnode(vnode) {
      var data = vnode.data;
      var parentNode = vnode;
      var childNode = vnode;
      while (isDef(childNode.componentInstance)) {
          childNode = childNode.componentInstance._vnode;
          if (childNode && childNode.data) {
              data = mergeClassData(childNode.data, data);
          }
      }
      // @ts-expect-error parentNode.parent not VNodeWithData
      while (isDef((parentNode = parentNode.parent))) {
          if (parentNode && parentNode.data) {
              data = mergeClassData(data, parentNode.data);
          }
      }
      return renderClass(data.staticClass, data.class);
  }
  function mergeClassData(child, parent) {
      return {
          staticClass: concat(child.staticClass, parent.staticClass),
          class: isDef(child.class) ? [child.class, parent.class] : parent.class
      };
  }
  function renderClass(staticClass, dynamicClass) {
      if (isDef(staticClass) || isDef(dynamicClass)) {
          return concat(staticClass, stringifyClass(dynamicClass));
      }
      /* istanbul ignore next */
      return '';
  }
  function concat(a, b) {
      return a ? (b ? a + ' ' + b : a) : b || '';
  }
  function stringifyClass(value) {
      if (Array.isArray(value)) {
          return stringifyArray(value);
      }
      if (isObject$1(value)) {
          return stringifyObject(value);
      }
      if (typeof value === 'string') {
          return value;
      }
      /* istanbul ignore next */
      return '';
  }
  function stringifyArray(value) {
      var res = '';
      var stringified;
      for (var i = 0, l = value.length; i < l; i++) {
          if (isDef((stringified = stringifyClass(value[i]))) && stringified !== '') {
              if (res)
                  res += ' ';
              res += stringified;
          }
      }
      return res;
  }
  function stringifyObject(value) {
      var res = '';
      for (var key in value) {
          if (value[key]) {
              if (res)
                  res += ' ';
              res += key;
          }
      }
      return res;
  }

  var namespaceMap = {
      svg: 'http://www.w3.org/2000/svg',
      math: 'http://www.w3.org/1998/Math/MathML'
  };
  var isHTMLTag = makeMap('html,body,base,head,link,meta,style,title,' +
      'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' +
      'div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,' +
      'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' +
      's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' +
      'embed,object,param,source,canvas,script,noscript,del,ins,' +
      'caption,col,colgroup,table,thead,tbody,td,th,tr,' +
      'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' +
      'output,progress,select,textarea,' +
      'details,dialog,menu,menuitem,summary,' +
      'content,element,shadow,template,blockquote,iframe,tfoot');
  // this map is intentionally selective, only covering SVG elements that may
  // contain child elements.
  var isSVG = makeMap('svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,' +
      'foreignobject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' +
      'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view', true);
  var isReservedTag = function (tag) {
      return isHTMLTag(tag) || isSVG(tag);
  };
  function getTagNamespace(tag) {
      if (isSVG(tag)) {
          return 'svg';
      }
      // basic support for MathML
      // note it doesn't support other MathML elements being component roots
      if (tag === 'math') {
          return 'math';
      }
  }
  var unknownElementCache = Object.create(null);
  function isUnknownElement(tag) {
      /* istanbul ignore if */
      if (!inBrowser) {
          return true;
      }
      if (isReservedTag(tag)) {
          return false;
      }
      tag = tag.toLowerCase();
      /* istanbul ignore if */
      if (unknownElementCache[tag] != null) {
          return unknownElementCache[tag];
      }
      var el = document.createElement(tag);
      if (tag.indexOf('-') > -1) {
          // https://stackoverflow.com/a/28210364/1070244
          return (unknownElementCache[tag] =
              el.constructor === window.HTMLUnknownElement ||
                  el.constructor === window.HTMLElement);
      }
      else {
          return (unknownElementCache[tag] = /HTMLUnknownElement/.test(el.toString()));
      }
  }
  var isTextInputType = makeMap('text,number,password,search,email,tel,url');

  /**
   * Query an element selector if it's not an element already.
   */
  function query(el) {
      if (typeof el === 'string') {
          var selected = document.querySelector(el);
          if (!selected) {
              return document.createElement('div');
          }
          return selected;
      }
      else {
          return el;
      }
  }

  function createElement(tagName, vnode) {
      var elm = document.createElement(tagName);
      if (tagName !== 'select') {
          return elm;
      }
      // false or null will remove the attribute but undefined will not
      if (vnode.data &&
          vnode.data.attrs &&
          vnode.data.attrs.multiple !== undefined) {
          elm.setAttribute('multiple', 'multiple');
      }
      return elm;
  }
  function createElementNS(namespace, tagName) {
      return document.createElementNS(namespaceMap[namespace], tagName);
  }
  function createTextNode(text) {
      return document.createTextNode(text);
  }
  function createComment(text) {
      return document.createComment(text);
  }
  function insertBefore(parentNode, newNode, referenceNode) {
      parentNode.insertBefore(newNode, referenceNode);
  }
  function removeChild(node, child) {
      node.removeChild(child);
  }
  function appendChild(node, child) {
      node.appendChild(child);
  }
  function parentNode(node) {
      return node.parentNode;
  }
  function nextSibling(node) {
      return node.nextSibling;
  }
  function tagName(node) {
      return node.tagName;
  }
  function setTextContent(node, text) {
      node.textContent = text;
  }
  function setStyleScope(node, scopeId) {
      node.setAttribute(scopeId, '');
  }

  var nodeOps = /*#__PURE__*/Object.freeze({
    __proto__: null,
    createElement: createElement,
    createElementNS: createElementNS,
    createTextNode: createTextNode,
    createComment: createComment,
    insertBefore: insertBefore,
    removeChild: removeChild,
    appendChild: appendChild,
    parentNode: parentNode,
    nextSibling: nextSibling,
    tagName: tagName,
    setTextContent: setTextContent,
    setStyleScope: setStyleScope
  });

  var ref$1 = {
      create: function (_, vnode) {
          registerRef(vnode);
      },
      update: function (oldVnode, vnode) {
          if (oldVnode.data.ref !== vnode.data.ref) {
              registerRef(oldVnode, true);
              registerRef(vnode);
          }
      },
      destroy: function (vnode) {
          registerRef(vnode, true);
      }
  };
  function registerRef(vnode, isRemoval) {
      var ref = vnode.data.ref;
      if (!isDef(ref))
          return;
      var vm = vnode.context;
      var refValue = vnode.componentInstance || vnode.elm;
      var value = isRemoval ? null : refValue;
      var $refsValue = isRemoval ? undefined : refValue;
      if (isFunction$1(ref)) {
          invokeWithErrorHandling(ref, vm, [value], vm, "template ref function");
          return;
      }
      var isFor = vnode.data.refInFor;
      var _isString = typeof ref === 'string' || typeof ref === 'number';
      var _isRef = isRef(ref);
      var refs = vm.$refs;
      if (_isString || _isRef) {
          if (isFor) {
              var existing = _isString ? refs[ref] : ref.value;
              if (isRemoval) {
                  isArray$1(existing) && remove$2(existing, refValue);
              }
              else {
                  if (!isArray$1(existing)) {
                      if (_isString) {
                          refs[ref] = [refValue];
                          setSetupRef(vm, ref, refs[ref]);
                      }
                      else {
                          ref.value = [refValue];
                      }
                  }
                  else if (!existing.includes(refValue)) {
                      existing.push(refValue);
                  }
              }
          }
          else if (_isString) {
              if (isRemoval && refs[ref] !== refValue) {
                  return;
              }
              refs[ref] = $refsValue;
              setSetupRef(vm, ref, value);
          }
          else if (_isRef) {
              if (isRemoval && ref.value !== refValue) {
                  return;
              }
              ref.value = value;
          }
          else ;
      }
  }
  function setSetupRef(_a, key, val) {
      var _setupState = _a._setupState;
      if (_setupState && hasOwn(_setupState, key)) {
          if (isRef(_setupState[key])) {
              _setupState[key].value = val;
          }
          else {
              _setupState[key] = val;
          }
      }
  }

  /**
   * Virtual DOM patching algorithm based on Snabbdom by
   * Simon Friis Vindum (@paldepind)
   * Licensed under the MIT License
   * https://github.com/paldepind/snabbdom/blob/master/LICENSE
   *
   * modified by Evan You (@yyx990803)
   *
   * Not type-checking this because this file is perf-critical and the cost
   * of making flow understand it is not worth it.
   */
  var emptyNode = new VNode('', {}, []);
  var hooks = ['create', 'activate', 'update', 'remove', 'destroy'];
  function sameVnode(a, b) {
      return (a.key === b.key &&
          a.asyncFactory === b.asyncFactory &&
          ((a.tag === b.tag &&
              a.isComment === b.isComment &&
              isDef(a.data) === isDef(b.data) &&
              sameInputType(a, b)) ||
              (isTrue(a.isAsyncPlaceholder) && isUndef(b.asyncFactory.error))));
  }
  function sameInputType(a, b) {
      if (a.tag !== 'input')
          return true;
      var i;
      var typeA = isDef((i = a.data)) && isDef((i = i.attrs)) && i.type;
      var typeB = isDef((i = b.data)) && isDef((i = i.attrs)) && i.type;
      return typeA === typeB || (isTextInputType(typeA) && isTextInputType(typeB));
  }
  function createKeyToOldIdx(children, beginIdx, endIdx) {
      var i, key;
      var map = {};
      for (i = beginIdx; i <= endIdx; ++i) {
          key = children[i].key;
          if (isDef(key))
              map[key] = i;
      }
      return map;
  }
  function createPatchFunction(backend) {
      var i, j;
      var cbs = {};
      var modules = backend.modules, nodeOps = backend.nodeOps;
      for (i = 0; i < hooks.length; ++i) {
          cbs[hooks[i]] = [];
          for (j = 0; j < modules.length; ++j) {
              if (isDef(modules[j][hooks[i]])) {
                  cbs[hooks[i]].push(modules[j][hooks[i]]);
              }
          }
      }
      function emptyNodeAt(elm) {
          return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm);
      }
      function createRmCb(childElm, listeners) {
          function remove() {
              if (--remove.listeners === 0) {
                  removeNode(childElm);
              }
          }
          remove.listeners = listeners;
          return remove;
      }
      function removeNode(el) {
          var parent = nodeOps.parentNode(el);
          // element may have already been removed due to v-html / v-text
          if (isDef(parent)) {
              nodeOps.removeChild(parent, el);
          }
      }
      function createElm(vnode, insertedVnodeQueue, parentElm, refElm, nested, ownerArray, index) {
          if (isDef(vnode.elm) && isDef(ownerArray)) {
              // This vnode was used in a previous render!
              // now it's used as a new node, overwriting its elm would cause
              // potential patch errors down the road when it's used as an insertion
              // reference node. Instead, we clone the node on-demand before creating
              // associated DOM element for it.
              vnode = ownerArray[index] = cloneVNode(vnode);
          }
          vnode.isRootInsert = !nested; // for transition enter check
          if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
              return;
          }
          var data = vnode.data;
          var children = vnode.children;
          var tag = vnode.tag;
          if (isDef(tag)) {
              vnode.elm = vnode.ns
                  ? nodeOps.createElementNS(vnode.ns, tag)
                  : nodeOps.createElement(tag, vnode);
              setScope(vnode);
              createChildren(vnode, children, insertedVnodeQueue);
              if (isDef(data)) {
                  invokeCreateHooks(vnode, insertedVnodeQueue);
              }
              insert(parentElm, vnode.elm, refElm);
          }
          else if (isTrue(vnode.isComment)) {
              vnode.elm = nodeOps.createComment(vnode.text);
              insert(parentElm, vnode.elm, refElm);
          }
          else {
              vnode.elm = nodeOps.createTextNode(vnode.text);
              insert(parentElm, vnode.elm, refElm);
          }
      }
      function createComponent(vnode, insertedVnodeQueue, parentElm, refElm) {
          var i = vnode.data;
          if (isDef(i)) {
              var isReactivated = isDef(vnode.componentInstance) && i.keepAlive;
              if (isDef((i = i.hook)) && isDef((i = i.init))) {
                  i(vnode, false /* hydrating */);
              }
              // after calling the init hook, if the vnode is a child component
              // it should've created a child instance and mounted it. the child
              // component also has set the placeholder vnode's elm.
              // in that case we can just return the element and be done.
              if (isDef(vnode.componentInstance)) {
                  initComponent(vnode, insertedVnodeQueue);
                  insert(parentElm, vnode.elm, refElm);
                  if (isTrue(isReactivated)) {
                      reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm);
                  }
                  return true;
              }
          }
      }
      function initComponent(vnode, insertedVnodeQueue) {
          if (isDef(vnode.data.pendingInsert)) {
              insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert);
              vnode.data.pendingInsert = null;
          }
          vnode.elm = vnode.componentInstance.$el;
          if (isPatchable(vnode)) {
              invokeCreateHooks(vnode, insertedVnodeQueue);
              setScope(vnode);
          }
          else {
              // empty component root.
              // skip all element-related modules except for ref (#3455)
              registerRef(vnode);
              // make sure to invoke the insert hook
              insertedVnodeQueue.push(vnode);
          }
      }
      function reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm) {
          var i;
          // hack for #4339: a reactivated component with inner transition
          // does not trigger because the inner node's created hooks are not called
          // again. It's not ideal to involve module-specific logic in here but
          // there doesn't seem to be a better way to do it.
          var innerNode = vnode;
          while (innerNode.componentInstance) {
              innerNode = innerNode.componentInstance._vnode;
              if (isDef((i = innerNode.data)) && isDef((i = i.transition))) {
                  for (i = 0; i < cbs.activate.length; ++i) {
                      cbs.activate[i](emptyNode, innerNode);
                  }
                  insertedVnodeQueue.push(innerNode);
                  break;
              }
          }
          // unlike a newly created component,
          // a reactivated keep-alive component doesn't insert itself
          insert(parentElm, vnode.elm, refElm);
      }
      function insert(parent, elm, ref) {
          if (isDef(parent)) {
              if (isDef(ref)) {
                  if (nodeOps.parentNode(ref) === parent) {
                      nodeOps.insertBefore(parent, elm, ref);
                  }
              }
              else {
                  nodeOps.appendChild(parent, elm);
              }
          }
      }
      function createChildren(vnode, children, insertedVnodeQueue) {
          if (isArray$1(children)) {
              for (var i_1 = 0; i_1 < children.length; ++i_1) {
                  createElm(children[i_1], insertedVnodeQueue, vnode.elm, null, true, children, i_1);
              }
          }
          else if (isPrimitive(vnode.text)) {
              nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(String(vnode.text)));
          }
      }
      function isPatchable(vnode) {
          while (vnode.componentInstance) {
              vnode = vnode.componentInstance._vnode;
          }
          return isDef(vnode.tag);
      }
      function invokeCreateHooks(vnode, insertedVnodeQueue) {
          for (var i_2 = 0; i_2 < cbs.create.length; ++i_2) {
              cbs.create[i_2](emptyNode, vnode);
          }
          i = vnode.data.hook; // Reuse variable
          if (isDef(i)) {
              if (isDef(i.create))
                  i.create(emptyNode, vnode);
              if (isDef(i.insert))
                  insertedVnodeQueue.push(vnode);
          }
      }
      // set scope id attribute for scoped CSS.
      // this is implemented as a special case to avoid the overhead
      // of going through the normal attribute patching process.
      function setScope(vnode) {
          var i;
          if (isDef((i = vnode.fnScopeId))) {
              nodeOps.setStyleScope(vnode.elm, i);
          }
          else {
              var ancestor = vnode;
              while (ancestor) {
                  if (isDef((i = ancestor.context)) && isDef((i = i.$options._scopeId))) {
                      nodeOps.setStyleScope(vnode.elm, i);
                  }
                  ancestor = ancestor.parent;
              }
          }
          // for slot content they should also get the scopeId from the host instance.
          if (isDef((i = activeInstance)) &&
              i !== vnode.context &&
              i !== vnode.fnContext &&
              isDef((i = i.$options._scopeId))) {
              nodeOps.setStyleScope(vnode.elm, i);
          }
      }
      function addVnodes(parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
          for (; startIdx <= endIdx; ++startIdx) {
              createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm, false, vnodes, startIdx);
          }
      }
      function invokeDestroyHook(vnode) {
          var i, j;
          var data = vnode.data;
          if (isDef(data)) {
              if (isDef((i = data.hook)) && isDef((i = i.destroy)))
                  i(vnode);
              for (i = 0; i < cbs.destroy.length; ++i)
                  cbs.destroy[i](vnode);
          }
          if (isDef((i = vnode.children))) {
              for (j = 0; j < vnode.children.length; ++j) {
                  invokeDestroyHook(vnode.children[j]);
              }
          }
      }
      function removeVnodes(vnodes, startIdx, endIdx) {
          for (; startIdx <= endIdx; ++startIdx) {
              var ch = vnodes[startIdx];
              if (isDef(ch)) {
                  if (isDef(ch.tag)) {
                      removeAndInvokeRemoveHook(ch);
                      invokeDestroyHook(ch);
                  }
                  else {
                      // Text node
                      removeNode(ch.elm);
                  }
              }
          }
      }
      function removeAndInvokeRemoveHook(vnode, rm) {
          if (isDef(rm) || isDef(vnode.data)) {
              var i_3;
              var listeners = cbs.remove.length + 1;
              if (isDef(rm)) {
                  // we have a recursively passed down rm callback
                  // increase the listeners count
                  rm.listeners += listeners;
              }
              else {
                  // directly removing
                  rm = createRmCb(vnode.elm, listeners);
              }
              // recursively invoke hooks on child component root node
              if (isDef((i_3 = vnode.componentInstance)) &&
                  isDef((i_3 = i_3._vnode)) &&
                  isDef(i_3.data)) {
                  removeAndInvokeRemoveHook(i_3, rm);
              }
              for (i_3 = 0; i_3 < cbs.remove.length; ++i_3) {
                  cbs.remove[i_3](vnode, rm);
              }
              if (isDef((i_3 = vnode.data.hook)) && isDef((i_3 = i_3.remove))) {
                  i_3(vnode, rm);
              }
              else {
                  rm();
              }
          }
          else {
              removeNode(vnode.elm);
          }
      }
      function updateChildren(parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
          var oldStartIdx = 0;
          var newStartIdx = 0;
          var oldEndIdx = oldCh.length - 1;
          var oldStartVnode = oldCh[0];
          var oldEndVnode = oldCh[oldEndIdx];
          var newEndIdx = newCh.length - 1;
          var newStartVnode = newCh[0];
          var newEndVnode = newCh[newEndIdx];
          var oldKeyToIdx, idxInOld, vnodeToMove, refElm;
          // removeOnly is a special flag used only by <transition-group>
          // to ensure removed elements stay in correct relative positions
          // during leaving transitions
          var canMove = !removeOnly;
          while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
              if (isUndef(oldStartVnode)) {
                  oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
              }
              else if (isUndef(oldEndVnode)) {
                  oldEndVnode = oldCh[--oldEndIdx];
              }
              else if (sameVnode(oldStartVnode, newStartVnode)) {
                  patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
                  oldStartVnode = oldCh[++oldStartIdx];
                  newStartVnode = newCh[++newStartIdx];
              }
              else if (sameVnode(oldEndVnode, newEndVnode)) {
                  patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx);
                  oldEndVnode = oldCh[--oldEndIdx];
                  newEndVnode = newCh[--newEndIdx];
              }
              else if (sameVnode(oldStartVnode, newEndVnode)) {
                  // Vnode moved right
                  patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx);
                  canMove &&
                      nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
                  oldStartVnode = oldCh[++oldStartIdx];
                  newEndVnode = newCh[--newEndIdx];
              }
              else if (sameVnode(oldEndVnode, newStartVnode)) {
                  // Vnode moved left
                  patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
                  canMove &&
                      nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
                  oldEndVnode = oldCh[--oldEndIdx];
                  newStartVnode = newCh[++newStartIdx];
              }
              else {
                  if (isUndef(oldKeyToIdx))
                      oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
                  idxInOld = isDef(newStartVnode.key)
                      ? oldKeyToIdx[newStartVnode.key]
                      : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx);
                  if (isUndef(idxInOld)) {
                      // New element
                      createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
                  }
                  else {
                      vnodeToMove = oldCh[idxInOld];
                      if (sameVnode(vnodeToMove, newStartVnode)) {
                          patchVnode(vnodeToMove, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
                          oldCh[idxInOld] = undefined;
                          canMove &&
                              nodeOps.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm);
                      }
                      else {
                          // same key but different element. treat as new element
                          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
                      }
                  }
                  newStartVnode = newCh[++newStartIdx];
              }
          }
          if (oldStartIdx > oldEndIdx) {
              refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
              addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
          }
          else if (newStartIdx > newEndIdx) {
              removeVnodes(oldCh, oldStartIdx, oldEndIdx);
          }
      }
      function findIdxInOld(node, oldCh, start, end) {
          for (var i_5 = start; i_5 < end; i_5++) {
              var c = oldCh[i_5];
              if (isDef(c) && sameVnode(node, c))
                  return i_5;
          }
      }
      function patchVnode(oldVnode, vnode, insertedVnodeQueue, ownerArray, index, removeOnly) {
          if (oldVnode === vnode) {
              return;
          }
          if (isDef(vnode.elm) && isDef(ownerArray)) {
              // clone reused vnode
              vnode = ownerArray[index] = cloneVNode(vnode);
          }
          var elm = (vnode.elm = oldVnode.elm);
          if (isTrue(oldVnode.isAsyncPlaceholder)) {
              if (isDef(vnode.asyncFactory.resolved)) {
                  hydrate(oldVnode.elm, vnode, insertedVnodeQueue);
              }
              else {
                  vnode.isAsyncPlaceholder = true;
              }
              return;
          }
          // reuse element for static trees.
          // note we only do this if the vnode is cloned -
          // if the new node is not cloned it means the render functions have been
          // reset by the hot-reload-api and we need to do a proper re-render.
          if (isTrue(vnode.isStatic) &&
              isTrue(oldVnode.isStatic) &&
              vnode.key === oldVnode.key &&
              (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))) {
              vnode.componentInstance = oldVnode.componentInstance;
              return;
          }
          var i;
          var data = vnode.data;
          if (isDef(data) && isDef((i = data.hook)) && isDef((i = i.prepatch))) {
              i(oldVnode, vnode);
          }
          var oldCh = oldVnode.children;
          var ch = vnode.children;
          if (isDef(data) && isPatchable(vnode)) {
              for (i = 0; i < cbs.update.length; ++i)
                  cbs.update[i](oldVnode, vnode);
              if (isDef((i = data.hook)) && isDef((i = i.update)))
                  i(oldVnode, vnode);
          }
          if (isUndef(vnode.text)) {
              if (isDef(oldCh) && isDef(ch)) {
                  if (oldCh !== ch)
                      updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly);
              }
              else if (isDef(ch)) {
                  if (isDef(oldVnode.text))
                      nodeOps.setTextContent(elm, '');
                  addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
              }
              else if (isDef(oldCh)) {
                  removeVnodes(oldCh, 0, oldCh.length - 1);
              }
              else if (isDef(oldVnode.text)) {
                  nodeOps.setTextContent(elm, '');
              }
          }
          else if (oldVnode.text !== vnode.text) {
              nodeOps.setTextContent(elm, vnode.text);
          }
          if (isDef(data)) {
              if (isDef((i = data.hook)) && isDef((i = i.postpatch)))
                  i(oldVnode, vnode);
          }
      }
      function invokeInsertHook(vnode, queue, initial) {
          // delay insert hooks for component root nodes, invoke them after the
          // element is really inserted
          if (isTrue(initial) && isDef(vnode.parent)) {
              vnode.parent.data.pendingInsert = queue;
          }
          else {
              for (var i_6 = 0; i_6 < queue.length; ++i_6) {
                  queue[i_6].data.hook.insert(queue[i_6]);
              }
          }
      }
      // list of modules that can skip create hook during hydration because they
      // are already rendered on the client or has no need for initialization
      // Note: style is excluded because it relies on initial clone for future
      // deep updates (#7063).
      var isRenderedModule = makeMap('attrs,class,staticClass,staticStyle,key');
      // Note: this is a browser-only function so we can assume elms are DOM nodes.
      function hydrate(elm, vnode, insertedVnodeQueue, inVPre) {
          var i;
          var tag = vnode.tag, data = vnode.data, children = vnode.children;
          inVPre = inVPre || (data && data.pre);
          vnode.elm = elm;
          if (isTrue(vnode.isComment) && isDef(vnode.asyncFactory)) {
              vnode.isAsyncPlaceholder = true;
              return true;
          }
          if (isDef(data)) {
              if (isDef((i = data.hook)) && isDef((i = i.init)))
                  i(vnode, true /* hydrating */);
              if (isDef((i = vnode.componentInstance))) {
                  // child component. it should have hydrated its own tree.
                  initComponent(vnode, insertedVnodeQueue);
                  return true;
              }
          }
          if (isDef(tag)) {
              if (isDef(children)) {
                  // empty element, allow client to pick up and populate children
                  if (!elm.hasChildNodes()) {
                      createChildren(vnode, children, insertedVnodeQueue);
                  }
                  else {
                      // v-html and domProps: innerHTML
                      if (isDef((i = data)) &&
                          isDef((i = i.domProps)) &&
                          isDef((i = i.innerHTML))) {
                          if (i !== elm.innerHTML) {
                              return false;
                          }
                      }
                      else {
                          // iterate and compare children lists
                          var childrenMatch = true;
                          var childNode = elm.firstChild;
                          for (var i_7 = 0; i_7 < children.length; i_7++) {
                              if (!childNode ||
                                  !hydrate(childNode, children[i_7], insertedVnodeQueue, inVPre)) {
                                  childrenMatch = false;
                                  break;
                              }
                              childNode = childNode.nextSibling;
                          }
                          // if childNode is not null, it means the actual childNodes list is
                          // longer than the virtual children list.
                          if (!childrenMatch || childNode) {
                              return false;
                          }
                      }
                  }
              }
              if (isDef(data)) {
                  var fullInvoke = false;
                  for (var key in data) {
                      if (!isRenderedModule(key)) {
                          fullInvoke = true;
                          invokeCreateHooks(vnode, insertedVnodeQueue);
                          break;
                      }
                  }
                  if (!fullInvoke && data['class']) {
                      // ensure collecting deps for deep class bindings for future updates
                      traverse(data['class']);
                  }
              }
          }
          else if (elm.data !== vnode.text) {
              elm.data = vnode.text;
          }
          return true;
      }
      return function patch(oldVnode, vnode, hydrating, removeOnly) {
          if (isUndef(vnode)) {
              if (isDef(oldVnode))
                  invokeDestroyHook(oldVnode);
              return;
          }
          var isInitialPatch = false;
          var insertedVnodeQueue = [];
          if (isUndef(oldVnode)) {
              // empty mount (likely as component), create new root element
              isInitialPatch = true;
              createElm(vnode, insertedVnodeQueue);
          }
          else {
              var isRealElement = isDef(oldVnode.nodeType);
              if (!isRealElement && sameVnode(oldVnode, vnode)) {
                  // patch existing root node
                  patchVnode(oldVnode, vnode, insertedVnodeQueue, null, null, removeOnly);
              }
              else {
                  if (isRealElement) {
                      // mounting to a real element
                      // check if this is server-rendered content and if we can perform
                      // a successful hydration.
                      if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
                          oldVnode.removeAttribute(SSR_ATTR);
                          hydrating = true;
                      }
                      if (isTrue(hydrating)) {
                          if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
                              invokeInsertHook(vnode, insertedVnodeQueue, true);
                              return oldVnode;
                          }
                      }
                      // either not server-rendered, or hydration failed.
                      // create an empty node and replace it
                      oldVnode = emptyNodeAt(oldVnode);
                  }
                  // replacing existing element
                  var oldElm = oldVnode.elm;
                  var parentElm = nodeOps.parentNode(oldElm);
                  // create new node
                  createElm(vnode, insertedVnodeQueue, 
                  // extremely rare edge case: do not insert if old element is in a
                  // leaving transition. Only happens when combining transition +
                  // keep-alive + HOCs. (#4590)
                  oldElm._leaveCb ? null : parentElm, nodeOps.nextSibling(oldElm));
                  // update parent placeholder node element, recursively
                  if (isDef(vnode.parent)) {
                      var ancestor = vnode.parent;
                      var patchable = isPatchable(vnode);
                      while (ancestor) {
                          for (var i_8 = 0; i_8 < cbs.destroy.length; ++i_8) {
                              cbs.destroy[i_8](ancestor);
                          }
                          ancestor.elm = vnode.elm;
                          if (patchable) {
                              for (var i_9 = 0; i_9 < cbs.create.length; ++i_9) {
                                  cbs.create[i_9](emptyNode, ancestor);
                              }
                              // #6513
                              // invoke insert hooks that may have been merged by create hooks.
                              // e.g. for directives that uses the "inserted" hook.
                              var insert_1 = ancestor.data.hook.insert;
                              if (insert_1.merged) {
                                  // start at index 1 to avoid re-invoking component mounted hook
                                  // clone insert hooks to avoid being mutated during iteration.
                                  // e.g. for customed directives under transition group.
                                  var cloned = insert_1.fns.slice(1);
                                  for (var i_10 = 0; i_10 < cloned.length; i_10++) {
                                      cloned[i_10]();
                                  }
                              }
                          }
                          else {
                              registerRef(ancestor);
                          }
                          ancestor = ancestor.parent;
                      }
                  }
                  // destroy old node
                  if (isDef(parentElm)) {
                      removeVnodes([oldVnode], 0, 0);
                  }
                  else if (isDef(oldVnode.tag)) {
                      invokeDestroyHook(oldVnode);
                  }
              }
          }
          invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
          return vnode.elm;
      };
  }

  var directives = {
      create: updateDirectives,
      update: updateDirectives,
      destroy: function unbindDirectives(vnode) {
          // @ts-expect-error emptyNode is not VNodeWithData
          updateDirectives(vnode, emptyNode);
      }
  };
  function updateDirectives(oldVnode, vnode) {
      if (oldVnode.data.directives || vnode.data.directives) {
          _update(oldVnode, vnode);
      }
  }
  function _update(oldVnode, vnode) {
      var isCreate = oldVnode === emptyNode;
      var isDestroy = vnode === emptyNode;
      var oldDirs = normalizeDirectives(oldVnode.data.directives, oldVnode.context);
      var newDirs = normalizeDirectives(vnode.data.directives, vnode.context);
      var dirsWithInsert = [];
      var dirsWithPostpatch = [];
      var key, oldDir, dir;
      for (key in newDirs) {
          oldDir = oldDirs[key];
          dir = newDirs[key];
          if (!oldDir) {
              // new directive, bind
              callHook(dir, 'bind', vnode, oldVnode);
              if (dir.def && dir.def.inserted) {
                  dirsWithInsert.push(dir);
              }
          }
          else {
              // existing directive, update
              dir.oldValue = oldDir.value;
              dir.oldArg = oldDir.arg;
              callHook(dir, 'update', vnode, oldVnode);
              if (dir.def && dir.def.componentUpdated) {
                  dirsWithPostpatch.push(dir);
              }
          }
      }
      if (dirsWithInsert.length) {
          var callInsert = function () {
              for (var i = 0; i < dirsWithInsert.length; i++) {
                  callHook(dirsWithInsert[i], 'inserted', vnode, oldVnode);
              }
          };
          if (isCreate) {
              mergeVNodeHook(vnode, 'insert', callInsert);
          }
          else {
              callInsert();
          }
      }
      if (dirsWithPostpatch.length) {
          mergeVNodeHook(vnode, 'postpatch', function () {
              for (var i = 0; i < dirsWithPostpatch.length; i++) {
                  callHook(dirsWithPostpatch[i], 'componentUpdated', vnode, oldVnode);
              }
          });
      }
      if (!isCreate) {
          for (key in oldDirs) {
              if (!newDirs[key]) {
                  // no longer present, unbind
                  callHook(oldDirs[key], 'unbind', oldVnode, oldVnode, isDestroy);
              }
          }
      }
  }
  var emptyModifiers = Object.create(null);
  function normalizeDirectives(dirs, vm) {
      var res = Object.create(null);
      if (!dirs) {
          // $flow-disable-line
          return res;
      }
      var i, dir;
      for (i = 0; i < dirs.length; i++) {
          dir = dirs[i];
          if (!dir.modifiers) {
              // $flow-disable-line
              dir.modifiers = emptyModifiers;
          }
          res[getRawDirName(dir)] = dir;
          if (vm._setupState && vm._setupState.__sfc) {
              var setupDef = dir.def || resolveAsset(vm, '_setupState', 'v-' + dir.name);
              if (typeof setupDef === 'function') {
                  dir.def = {
                      bind: setupDef,
                      update: setupDef,
                  };
              }
              else {
                  dir.def = setupDef;
              }
          }
          dir.def = dir.def || resolveAsset(vm.$options, 'directives', dir.name);
      }
      // $flow-disable-line
      return res;
  }
  function getRawDirName(dir) {
      return (dir.rawName || "".concat(dir.name, ".").concat(Object.keys(dir.modifiers || {}).join('.')));
  }
  function callHook(dir, hook, vnode, oldVnode, isDestroy) {
      var fn = dir.def && dir.def[hook];
      if (fn) {
          try {
              fn(vnode.elm, dir, vnode, oldVnode, isDestroy);
          }
          catch (e) {
              handleError(e, vnode.context, "directive ".concat(dir.name, " ").concat(hook, " hook"));
          }
      }
  }

  var baseModules = [ref$1, directives];

  function updateAttrs(oldVnode, vnode) {
      var opts = vnode.componentOptions;
      if (isDef(opts) && opts.Ctor.options.inheritAttrs === false) {
          return;
      }
      if (isUndef(oldVnode.data.attrs) && isUndef(vnode.data.attrs)) {
          return;
      }
      var key, cur, old;
      var elm = vnode.elm;
      var oldAttrs = oldVnode.data.attrs || {};
      var attrs = vnode.data.attrs || {};
      // clone observed objects, as the user probably wants to mutate it
      if (isDef(attrs.__ob__) || isTrue(attrs._v_attr_proxy)) {
          attrs = vnode.data.attrs = extend$1({}, attrs);
      }
      for (key in attrs) {
          cur = attrs[key];
          old = oldAttrs[key];
          if (old !== cur) {
              setAttr(elm, key, cur, vnode.data.pre);
          }
      }
      // #4391: in IE9, setting type can reset value for input[type=radio]
      // #6666: IE/Edge forces progress value down to 1 before setting a max
      /* istanbul ignore if */
      if ((isIE || isEdge) && attrs.value !== oldAttrs.value) {
          setAttr(elm, 'value', attrs.value);
      }
      for (key in oldAttrs) {
          if (isUndef(attrs[key])) {
              if (isXlink(key)) {
                  elm.removeAttributeNS(xlinkNS, getXlinkProp(key));
              }
              else if (!isEnumeratedAttr(key)) {
                  elm.removeAttribute(key);
              }
          }
      }
  }
  function setAttr(el, key, value, isInPre) {
      if (isInPre || el.tagName.indexOf('-') > -1) {
          baseSetAttr(el, key, value);
      }
      else if (isBooleanAttr(key)) {
          // set attribute for blank value
          // e.g. <option disabled>Select one</option>
          if (isFalsyAttrValue(value)) {
              el.removeAttribute(key);
          }
          else {
              // technically allowfullscreen is a boolean attribute for <iframe>,
              // but Flash expects a value of "true" when used on <embed> tag
              value = key === 'allowfullscreen' && el.tagName === 'EMBED' ? 'true' : key;
              el.setAttribute(key, value);
          }
      }
      else if (isEnumeratedAttr(key)) {
          el.setAttribute(key, convertEnumeratedValue(key, value));
      }
      else if (isXlink(key)) {
          if (isFalsyAttrValue(value)) {
              el.removeAttributeNS(xlinkNS, getXlinkProp(key));
          }
          else {
              el.setAttributeNS(xlinkNS, key, value);
          }
      }
      else {
          baseSetAttr(el, key, value);
      }
  }
  function baseSetAttr(el, key, value) {
      if (isFalsyAttrValue(value)) {
          el.removeAttribute(key);
      }
      else {
          // #7138: IE10 & 11 fires input event when setting placeholder on
          // <textarea>... block the first input event and remove the blocker
          // immediately.
          /* istanbul ignore if */
          if (isIE &&
              !isIE9 &&
              el.tagName === 'TEXTAREA' &&
              key === 'placeholder' &&
              value !== '' &&
              !el.__ieph) {
              var blocker_1 = function (e) {
                  e.stopImmediatePropagation();
                  el.removeEventListener('input', blocker_1);
              };
              el.addEventListener('input', blocker_1);
              // $flow-disable-line
              el.__ieph = true; /* IE placeholder patched */
          }
          el.setAttribute(key, value);
      }
  }
  var attrs = {
      create: updateAttrs,
      update: updateAttrs
  };

  function updateClass(oldVnode, vnode) {
      var el = vnode.elm;
      var data = vnode.data;
      var oldData = oldVnode.data;
      if (isUndef(data.staticClass) &&
          isUndef(data.class) &&
          (isUndef(oldData) ||
              (isUndef(oldData.staticClass) && isUndef(oldData.class)))) {
          return;
      }
      var cls = genClassForVnode(vnode);
      // handle transition classes
      var transitionClass = el._transitionClasses;
      if (isDef(transitionClass)) {
          cls = concat(cls, stringifyClass(transitionClass));
      }
      // set the class
      if (cls !== el._prevClass) {
          el.setAttribute('class', cls);
          el._prevClass = cls;
      }
  }
  var klass = {
      create: updateClass,
      update: updateClass
  };

  // in some cases, the event used has to be determined at runtime
  // so we used some reserved tokens during compile.
  var RANGE_TOKEN = '__r';
  var CHECKBOX_RADIO_TOKEN = '__c';

  // normalize v-model event tokens that can only be determined at runtime.
  // it's important to place the event as the first in the array because
  // the whole point is ensuring the v-model callback gets called before
  // user-attached handlers.
  function normalizeEvents(on) {
      /* istanbul ignore if */
      if (isDef(on[RANGE_TOKEN])) {
          // IE input[type=range] only supports `change` event
          var event_1 = isIE ? 'change' : 'input';
          on[event_1] = [].concat(on[RANGE_TOKEN], on[event_1] || []);
          delete on[RANGE_TOKEN];
      }
      // This was originally intended to fix #4521 but no longer necessary
      // after 2.5. Keeping it for backwards compat with generated code from < 2.4
      /* istanbul ignore if */
      if (isDef(on[CHECKBOX_RADIO_TOKEN])) {
          on.change = [].concat(on[CHECKBOX_RADIO_TOKEN], on.change || []);
          delete on[CHECKBOX_RADIO_TOKEN];
      }
  }
  var target;
  function createOnceHandler(event, handler, capture) {
      var _target = target; // save current target element in closure
      return function onceHandler() {
          var res = handler.apply(null, arguments);
          if (res !== null) {
              remove(event, onceHandler, capture, _target);
          }
      };
  }
  // #9446: Firefox <= 53 (in particular, ESR 52) has incorrect Event.timeStamp
  // implementation and does not fire microtasks in between event propagation, so
  // safe to exclude.
  var useMicrotaskFix = isUsingMicroTask && !(isFF && Number(isFF[1]) <= 53);
  function add(name, handler, capture, passive) {
      // async edge case #6566: inner click event triggers patch, event handler
      // attached to outer element during patch, and triggered again. This
      // happens because browsers fire microtask ticks between event propagation.
      // the solution is simple: we save the timestamp when a handler is attached,
      // and the handler would only fire if the event passed to it was fired
      // AFTER it was attached.
      if (useMicrotaskFix) {
          var attachedTimestamp_1 = currentFlushTimestamp;
          var original_1 = handler;
          //@ts-expect-error
          handler = original_1._wrapper = function (e) {
              if (
              // no bubbling, should always fire.
              // this is just a safety net in case event.timeStamp is unreliable in
              // certain weird environments...
              e.target === e.currentTarget ||
                  // event is fired after handler attachment
                  e.timeStamp >= attachedTimestamp_1 ||
                  // bail for environments that have buggy event.timeStamp implementations
                  // #9462 iOS 9 bug: event.timeStamp is 0 after history.pushState
                  // #9681 QtWebEngine event.timeStamp is negative value
                  e.timeStamp <= 0 ||
                  // #9448 bail if event is fired in another document in a multi-page
                  // electron/nw.js app, since event.timeStamp will be using a different
                  // starting reference
                  e.target.ownerDocument !== document) {
                  return original_1.apply(this, arguments);
              }
          };
      }
      target.addEventListener(name, handler, supportsPassive ? { capture: capture, passive: passive } : capture);
  }
  function remove(name, handler, capture, _target) {
      (_target || target).removeEventListener(name, 
      //@ts-expect-error
      handler._wrapper || handler, capture);
  }
  function updateDOMListeners(oldVnode, vnode) {
      if (isUndef(oldVnode.data.on) && isUndef(vnode.data.on)) {
          return;
      }
      var on = vnode.data.on || {};
      var oldOn = oldVnode.data.on || {};
      // vnode is empty when removing all listeners,
      // and use old vnode dom element
      target = vnode.elm || oldVnode.elm;
      normalizeEvents(on);
      updateListeners(on, oldOn, add, remove, createOnceHandler, vnode.context);
      target = undefined;
  }
  var events = {
      create: updateDOMListeners,
      update: updateDOMListeners,
      // @ts-expect-error emptyNode has actually data
      destroy: function (vnode) { return updateDOMListeners(vnode, emptyNode); }
  };

  var svgContainer;
  function updateDOMProps(oldVnode, vnode) {
      if (isUndef(oldVnode.data.domProps) && isUndef(vnode.data.domProps)) {
          return;
      }
      var key, cur;
      var elm = vnode.elm;
      var oldProps = oldVnode.data.domProps || {};
      var props = vnode.data.domProps || {};
      // clone observed objects, as the user probably wants to mutate it
      if (isDef(props.__ob__) || isTrue(props._v_attr_proxy)) {
          props = vnode.data.domProps = extend$1({}, props);
      }
      for (key in oldProps) {
          if (!(key in props)) {
              elm[key] = '';
          }
      }
      for (key in props) {
          cur = props[key];
          // ignore children if the node has textContent or innerHTML,
          // as these will throw away existing DOM nodes and cause removal errors
          // on subsequent patches (#3360)
          if (key === 'textContent' || key === 'innerHTML') {
              if (vnode.children)
                  vnode.children.length = 0;
              if (cur === oldProps[key])
                  continue;
              // #6601 work around Chrome version <= 55 bug where single textNode
              // replaced by innerHTML/textContent retains its parentNode property
              if (elm.childNodes.length === 1) {
                  elm.removeChild(elm.childNodes[0]);
              }
          }
          if (key === 'value' && elm.tagName !== 'PROGRESS') {
              // store value as _value as well since
              // non-string values will be stringified
              elm._value = cur;
              // avoid resetting cursor position when value is the same
              var strCur = isUndef(cur) ? '' : String(cur);
              if (shouldUpdateValue(elm, strCur)) {
                  elm.value = strCur;
              }
          }
          else if (key === 'innerHTML' &&
              isSVG(elm.tagName) &&
              isUndef(elm.innerHTML)) {
              // IE doesn't support innerHTML for SVG elements
              svgContainer = svgContainer || document.createElement('div');
              svgContainer.innerHTML = "<svg>".concat(cur, "</svg>");
              var svg = svgContainer.firstChild;
              while (elm.firstChild) {
                  elm.removeChild(elm.firstChild);
              }
              while (svg.firstChild) {
                  elm.appendChild(svg.firstChild);
              }
          }
          else if (
          // skip the update if old and new VDOM state is the same.
          // `value` is handled separately because the DOM value may be temporarily
          // out of sync with VDOM state due to focus, composition and modifiers.
          // This  #4521 by skipping the unnecessary `checked` update.
          cur !== oldProps[key]) {
              // some property updates can throw
              // e.g. `value` on <progress> w/ non-finite value
              try {
                  elm[key] = cur;
              }
              catch (e) { }
          }
      }
  }
  function shouldUpdateValue(elm, checkVal) {
      return (
      //@ts-expect-error
      !elm.composing &&
          (elm.tagName === 'OPTION' ||
              isNotInFocusAndDirty(elm, checkVal) ||
              isDirtyWithModifiers(elm, checkVal)));
  }
  function isNotInFocusAndDirty(elm, checkVal) {
      // return true when textbox (.number and .trim) loses focus and its value is
      // not equal to the updated value
      var notInFocus = true;
      // #6157
      // work around IE bug when accessing document.activeElement in an iframe
      try {
          notInFocus = document.activeElement !== elm;
      }
      catch (e) { }
      return notInFocus && elm.value !== checkVal;
  }
  function isDirtyWithModifiers(elm, newVal) {
      var value = elm.value;
      var modifiers = elm._vModifiers; // injected by v-model runtime
      if (isDef(modifiers)) {
          if (modifiers.number) {
              return toNumber(value) !== toNumber(newVal);
          }
          if (modifiers.trim) {
              return value.trim() !== newVal.trim();
          }
      }
      return value !== newVal;
  }
  var domProps = {
      create: updateDOMProps,
      update: updateDOMProps
  };

  var parseStyleText = cached(function (cssText) {
      var res = {};
      var listDelimiter = /;(?![^(]*\))/g;
      var propertyDelimiter = /:(.+)/;
      cssText.split(listDelimiter).forEach(function (item) {
          if (item) {
              var tmp = item.split(propertyDelimiter);
              tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
          }
      });
      return res;
  });
  // merge static and dynamic style data on the same vnode
  function normalizeStyleData(data) {
      var style = normalizeStyleBinding(data.style);
      // static style is pre-processed into an object during compilation
      // and is always a fresh object, so it's safe to merge into it
      return data.staticStyle ? extend$1(data.staticStyle, style) : style;
  }
  // normalize possible array / string values into Object
  function normalizeStyleBinding(bindingStyle) {
      if (Array.isArray(bindingStyle)) {
          return toObject(bindingStyle);
      }
      if (typeof bindingStyle === 'string') {
          return parseStyleText(bindingStyle);
      }
      return bindingStyle;
  }
  /**
   * parent component style should be after child's
   * so that parent component's style could override it
   */
  function getStyle(vnode, checkChild) {
      var res = {};
      var styleData;
      {
          var childNode = vnode;
          while (childNode.componentInstance) {
              childNode = childNode.componentInstance._vnode;
              if (childNode &&
                  childNode.data &&
                  (styleData = normalizeStyleData(childNode.data))) {
                  extend$1(res, styleData);
              }
          }
      }
      if ((styleData = normalizeStyleData(vnode.data))) {
          extend$1(res, styleData);
      }
      var parentNode = vnode;
      // @ts-expect-error parentNode.parent not VNodeWithData
      while ((parentNode = parentNode.parent)) {
          if (parentNode.data && (styleData = normalizeStyleData(parentNode.data))) {
              extend$1(res, styleData);
          }
      }
      return res;
  }

  var cssVarRE = /^--/;
  var importantRE = /\s*!important$/;
  var setProp = function (el, name, val) {
      /* istanbul ignore if */
      if (cssVarRE.test(name)) {
          el.style.setProperty(name, val);
      }
      else if (importantRE.test(val)) {
          el.style.setProperty(hyphenate(name), val.replace(importantRE, ''), 'important');
      }
      else {
          var normalizedName = normalize(name);
          if (Array.isArray(val)) {
              // Support values array created by autoprefixer, e.g.
              // {display: ["-webkit-box", "-ms-flexbox", "flex"]}
              // Set them one by one, and the browser will only set those it can recognize
              for (var i = 0, len = val.length; i < len; i++) {
                  el.style[normalizedName] = val[i];
              }
          }
          else {
              el.style[normalizedName] = val;
          }
      }
  };
  var vendorNames = ['Webkit', 'Moz', 'ms'];
  var emptyStyle;
  var normalize = cached(function (prop) {
      emptyStyle = emptyStyle || document.createElement('div').style;
      prop = camelize(prop);
      if (prop !== 'filter' && prop in emptyStyle) {
          return prop;
      }
      var capName = prop.charAt(0).toUpperCase() + prop.slice(1);
      for (var i = 0; i < vendorNames.length; i++) {
          var name_1 = vendorNames[i] + capName;
          if (name_1 in emptyStyle) {
              return name_1;
          }
      }
  });
  function updateStyle(oldVnode, vnode) {
      var data = vnode.data;
      var oldData = oldVnode.data;
      if (isUndef(data.staticStyle) &&
          isUndef(data.style) &&
          isUndef(oldData.staticStyle) &&
          isUndef(oldData.style)) {
          return;
      }
      var cur, name;
      var el = vnode.elm;
      var oldStaticStyle = oldData.staticStyle;
      var oldStyleBinding = oldData.normalizedStyle || oldData.style || {};
      // if static style exists, stylebinding already merged into it when doing normalizeStyleData
      var oldStyle = oldStaticStyle || oldStyleBinding;
      var style = normalizeStyleBinding(vnode.data.style) || {};
      // store normalized style under a different key for next diff
      // make sure to clone it if it's reactive, since the user likely wants
      // to mutate it.
      vnode.data.normalizedStyle = isDef(style.__ob__) ? extend$1({}, style) : style;
      var newStyle = getStyle(vnode);
      for (name in oldStyle) {
          if (isUndef(newStyle[name])) {
              setProp(el, name, '');
          }
      }
      for (name in newStyle) {
          cur = newStyle[name];
          // ie9 setting to null has no effect, must use empty string
          setProp(el, name, cur == null ? '' : cur);
      }
  }
  var style = {
      create: updateStyle,
      update: updateStyle
  };

  var whitespaceRE = /\s+/;
  /**
   * Add class with compatibility for SVG since classList is not supported on
   * SVG elements in IE
   */
  function addClass(el, cls) {
      /* istanbul ignore if */
      if (!cls || !(cls = cls.trim())) {
          return;
      }
      /* istanbul ignore else */
      if (el.classList) {
          if (cls.indexOf(' ') > -1) {
              cls.split(whitespaceRE).forEach(function (c) { return el.classList.add(c); });
          }
          else {
              el.classList.add(cls);
          }
      }
      else {
          var cur = " ".concat(el.getAttribute('class') || '', " ");
          if (cur.indexOf(' ' + cls + ' ') < 0) {
              el.setAttribute('class', (cur + cls).trim());
          }
      }
  }
  /**
   * Remove class with compatibility for SVG since classList is not supported on
   * SVG elements in IE
   */
  function removeClass(el, cls) {
      /* istanbul ignore if */
      if (!cls || !(cls = cls.trim())) {
          return;
      }
      /* istanbul ignore else */
      if (el.classList) {
          if (cls.indexOf(' ') > -1) {
              cls.split(whitespaceRE).forEach(function (c) { return el.classList.remove(c); });
          }
          else {
              el.classList.remove(cls);
          }
          if (!el.classList.length) {
              el.removeAttribute('class');
          }
      }
      else {
          var cur = " ".concat(el.getAttribute('class') || '', " ");
          var tar = ' ' + cls + ' ';
          while (cur.indexOf(tar) >= 0) {
              cur = cur.replace(tar, ' ');
          }
          cur = cur.trim();
          if (cur) {
              el.setAttribute('class', cur);
          }
          else {
              el.removeAttribute('class');
          }
      }
  }

  function resolveTransition(def) {
      if (!def) {
          return;
      }
      /* istanbul ignore else */
      if (typeof def === 'object') {
          var res = {};
          if (def.css !== false) {
              extend$1(res, autoCssTransition(def.name || 'v'));
          }
          extend$1(res, def);
          return res;
      }
      else if (typeof def === 'string') {
          return autoCssTransition(def);
      }
  }
  var autoCssTransition = cached(function (name) {
      return {
          enterClass: "".concat(name, "-enter"),
          enterToClass: "".concat(name, "-enter-to"),
          enterActiveClass: "".concat(name, "-enter-active"),
          leaveClass: "".concat(name, "-leave"),
          leaveToClass: "".concat(name, "-leave-to"),
          leaveActiveClass: "".concat(name, "-leave-active")
      };
  });
  var hasTransition = inBrowser && !isIE9;
  var TRANSITION = 'transition';
  var ANIMATION = 'animation';
  // Transition property/event sniffing
  var transitionProp = 'transition';
  var transitionEndEvent = 'transitionend';
  var animationProp = 'animation';
  var animationEndEvent = 'animationend';
  if (hasTransition) {
      /* istanbul ignore if */
      if (window.ontransitionend === undefined &&
          window.onwebkittransitionend !== undefined) {
          transitionProp = 'WebkitTransition';
          transitionEndEvent = 'webkitTransitionEnd';
      }
      if (window.onanimationend === undefined &&
          window.onwebkitanimationend !== undefined) {
          animationProp = 'WebkitAnimation';
          animationEndEvent = 'webkitAnimationEnd';
      }
  }
  // binding to window is necessary to make hot reload work in IE in strict mode
  var raf = inBrowser
      ? window.requestAnimationFrame
          ? window.requestAnimationFrame.bind(window)
          : setTimeout
      : /* istanbul ignore next */ function (/* istanbul ignore next */ fn) { return fn(); };
  function nextFrame(fn) {
      raf(function () {
          // @ts-expect-error
          raf(fn);
      });
  }
  function addTransitionClass(el, cls) {
      var transitionClasses = el._transitionClasses || (el._transitionClasses = []);
      if (transitionClasses.indexOf(cls) < 0) {
          transitionClasses.push(cls);
          addClass(el, cls);
      }
  }
  function removeTransitionClass(el, cls) {
      if (el._transitionClasses) {
          remove$2(el._transitionClasses, cls);
      }
      removeClass(el, cls);
  }
  function whenTransitionEnds(el, expectedType, cb) {
      var _a = getTransitionInfo(el, expectedType), type = _a.type, timeout = _a.timeout, propCount = _a.propCount;
      if (!type)
          return cb();
      var event = type === TRANSITION ? transitionEndEvent : animationEndEvent;
      var ended = 0;
      var end = function () {
          el.removeEventListener(event, onEnd);
          cb();
      };
      var onEnd = function (e) {
          if (e.target === el) {
              if (++ended >= propCount) {
                  end();
              }
          }
      };
      setTimeout(function () {
          if (ended < propCount) {
              end();
          }
      }, timeout + 1);
      el.addEventListener(event, onEnd);
  }
  var transformRE = /\b(transform|all)(,|$)/;
  function getTransitionInfo(el, expectedType) {
      var styles = window.getComputedStyle(el);
      // JSDOM may return undefined for transition properties
      var transitionDelays = (styles[transitionProp + 'Delay'] || '').split(', ');
      var transitionDurations = (styles[transitionProp + 'Duration'] || '').split(', ');
      var transitionTimeout = getTimeout(transitionDelays, transitionDurations);
      var animationDelays = (styles[animationProp + 'Delay'] || '').split(', ');
      var animationDurations = (styles[animationProp + 'Duration'] || '').split(', ');
      var animationTimeout = getTimeout(animationDelays, animationDurations);
      var type;
      var timeout = 0;
      var propCount = 0;
      /* istanbul ignore if */
      if (expectedType === TRANSITION) {
          if (transitionTimeout > 0) {
              type = TRANSITION;
              timeout = transitionTimeout;
              propCount = transitionDurations.length;
          }
      }
      else if (expectedType === ANIMATION) {
          if (animationTimeout > 0) {
              type = ANIMATION;
              timeout = animationTimeout;
              propCount = animationDurations.length;
          }
      }
      else {
          timeout = Math.max(transitionTimeout, animationTimeout);
          type =
              timeout > 0
                  ? transitionTimeout > animationTimeout
                      ? TRANSITION
                      : ANIMATION
                  : null;
          propCount = type
              ? type === TRANSITION
                  ? transitionDurations.length
                  : animationDurations.length
              : 0;
      }
      var hasTransform = type === TRANSITION && transformRE.test(styles[transitionProp + 'Property']);
      return {
          type: type,
          timeout: timeout,
          propCount: propCount,
          hasTransform: hasTransform
      };
  }
  function getTimeout(delays, durations) {
      /* istanbul ignore next */
      while (delays.length < durations.length) {
          delays = delays.concat(delays);
      }
      return Math.max.apply(null, durations.map(function (d, i) {
          return toMs(d) + toMs(delays[i]);
      }));
  }
  // Old versions of Chromium (below 61.0.3163.100) formats floating pointer numbers
  // in a locale-dependent way, using a comma instead of a dot.
  // If comma is not replaced with a dot, the input will be rounded down (i.e. acting
  // as a floor function) causing unexpected behaviors
  function toMs(s) {
      return Number(s.slice(0, -1).replace(',', '.')) * 1000;
  }

  function enter(vnode, toggleDisplay) {
      var el = vnode.elm;
      // call leave callback now
      if (isDef(el._leaveCb)) {
          el._leaveCb.cancelled = true;
          el._leaveCb();
      }
      var data = resolveTransition(vnode.data.transition);
      if (isUndef(data)) {
          return;
      }
      /* istanbul ignore if */
      if (isDef(el._enterCb) || el.nodeType !== 1) {
          return;
      }
      var css = data.css, type = data.type, enterClass = data.enterClass, enterToClass = data.enterToClass, enterActiveClass = data.enterActiveClass, appearClass = data.appearClass, appearToClass = data.appearToClass, appearActiveClass = data.appearActiveClass, beforeEnter = data.beforeEnter, enter = data.enter, afterEnter = data.afterEnter, enterCancelled = data.enterCancelled, beforeAppear = data.beforeAppear, appear = data.appear, afterAppear = data.afterAppear, appearCancelled = data.appearCancelled, duration = data.duration;
      // activeInstance will always be the <transition> component managing this
      // transition. One edge case to check is when the <transition> is placed
      // as the root node of a child component. In that case we need to check
      // <transition>'s parent for appear check.
      var context = activeInstance;
      var transitionNode = activeInstance.$vnode;
      while (transitionNode && transitionNode.parent) {
          context = transitionNode.context;
          transitionNode = transitionNode.parent;
      }
      var isAppear = !context._isMounted || !vnode.isRootInsert;
      if (isAppear && !appear && appear !== '') {
          return;
      }
      var startClass = isAppear && appearClass ? appearClass : enterClass;
      var activeClass = isAppear && appearActiveClass ? appearActiveClass : enterActiveClass;
      var toClass = isAppear && appearToClass ? appearToClass : enterToClass;
      var beforeEnterHook = isAppear ? beforeAppear || beforeEnter : beforeEnter;
      var enterHook = isAppear ? (isFunction$1(appear) ? appear : enter) : enter;
      var afterEnterHook = isAppear ? afterAppear || afterEnter : afterEnter;
      var enterCancelledHook = isAppear
          ? appearCancelled || enterCancelled
          : enterCancelled;
      var explicitEnterDuration = toNumber(isObject$1(duration) ? duration.enter : duration);
      var expectsCSS = css !== false && !isIE9;
      var userWantsControl = getHookArgumentsLength(enterHook);
      var cb = (el._enterCb = once(function () {
          if (expectsCSS) {
              removeTransitionClass(el, toClass);
              removeTransitionClass(el, activeClass);
          }
          // @ts-expect-error
          if (cb.cancelled) {
              if (expectsCSS) {
                  removeTransitionClass(el, startClass);
              }
              enterCancelledHook && enterCancelledHook(el);
          }
          else {
              afterEnterHook && afterEnterHook(el);
          }
          el._enterCb = null;
      }));
      if (!vnode.data.show) {
          // remove pending leave element on enter by injecting an insert hook
          mergeVNodeHook(vnode, 'insert', function () {
              var parent = el.parentNode;
              var pendingNode = parent && parent._pending && parent._pending[vnode.key];
              if (pendingNode &&
                  pendingNode.tag === vnode.tag &&
                  pendingNode.elm._leaveCb) {
                  pendingNode.elm._leaveCb();
              }
              enterHook && enterHook(el, cb);
          });
      }
      // start enter transition
      beforeEnterHook && beforeEnterHook(el);
      if (expectsCSS) {
          addTransitionClass(el, startClass);
          addTransitionClass(el, activeClass);
          nextFrame(function () {
              removeTransitionClass(el, startClass);
              // @ts-expect-error
              if (!cb.cancelled) {
                  addTransitionClass(el, toClass);
                  if (!userWantsControl) {
                      if (isValidDuration(explicitEnterDuration)) {
                          setTimeout(cb, explicitEnterDuration);
                      }
                      else {
                          whenTransitionEnds(el, type, cb);
                      }
                  }
              }
          });
      }
      if (vnode.data.show) {
          toggleDisplay && toggleDisplay();
          enterHook && enterHook(el, cb);
      }
      if (!expectsCSS && !userWantsControl) {
          cb();
      }
  }
  function leave(vnode, rm) {
      var el = vnode.elm;
      // call enter callback now
      if (isDef(el._enterCb)) {
          el._enterCb.cancelled = true;
          el._enterCb();
      }
      var data = resolveTransition(vnode.data.transition);
      if (isUndef(data) || el.nodeType !== 1) {
          return rm();
      }
      /* istanbul ignore if */
      if (isDef(el._leaveCb)) {
          return;
      }
      var css = data.css, type = data.type, leaveClass = data.leaveClass, leaveToClass = data.leaveToClass, leaveActiveClass = data.leaveActiveClass, beforeLeave = data.beforeLeave, leave = data.leave, afterLeave = data.afterLeave, leaveCancelled = data.leaveCancelled, delayLeave = data.delayLeave, duration = data.duration;
      var expectsCSS = css !== false && !isIE9;
      var userWantsControl = getHookArgumentsLength(leave);
      var explicitLeaveDuration = toNumber(isObject$1(duration) ? duration.leave : duration);
      var cb = (el._leaveCb = once(function () {
          if (el.parentNode && el.parentNode._pending) {
              el.parentNode._pending[vnode.key] = null;
          }
          if (expectsCSS) {
              removeTransitionClass(el, leaveToClass);
              removeTransitionClass(el, leaveActiveClass);
          }
          // @ts-expect-error
          if (cb.cancelled) {
              if (expectsCSS) {
                  removeTransitionClass(el, leaveClass);
              }
              leaveCancelled && leaveCancelled(el);
          }
          else {
              rm();
              afterLeave && afterLeave(el);
          }
          el._leaveCb = null;
      }));
      if (delayLeave) {
          delayLeave(performLeave);
      }
      else {
          performLeave();
      }
      function performLeave() {
          // the delayed leave may have already been cancelled
          // @ts-expect-error
          if (cb.cancelled) {
              return;
          }
          // record leaving element
          if (!vnode.data.show && el.parentNode) {
              (el.parentNode._pending || (el.parentNode._pending = {}))[vnode.key] =
                  vnode;
          }
          beforeLeave && beforeLeave(el);
          if (expectsCSS) {
              addTransitionClass(el, leaveClass);
              addTransitionClass(el, leaveActiveClass);
              nextFrame(function () {
                  removeTransitionClass(el, leaveClass);
                  // @ts-expect-error
                  if (!cb.cancelled) {
                      addTransitionClass(el, leaveToClass);
                      if (!userWantsControl) {
                          if (isValidDuration(explicitLeaveDuration)) {
                              setTimeout(cb, explicitLeaveDuration);
                          }
                          else {
                              whenTransitionEnds(el, type, cb);
                          }
                      }
                  }
              });
          }
          leave && leave(el, cb);
          if (!expectsCSS && !userWantsControl) {
              cb();
          }
      }
  }
  function isValidDuration(val) {
      return typeof val === 'number' && !isNaN(val);
  }
  /**
   * Normalize a transition hook's argument length. The hook may be:
   * - a merged hook (invoker) with the original in .fns
   * - a wrapped component method (check ._length)
   * - a plain function (.length)
   */
  function getHookArgumentsLength(fn) {
      if (isUndef(fn)) {
          return false;
      }
      // @ts-expect-error
      var invokerFns = fn.fns;
      if (isDef(invokerFns)) {
          // invoker
          return getHookArgumentsLength(Array.isArray(invokerFns) ? invokerFns[0] : invokerFns);
      }
      else {
          // @ts-expect-error
          return (fn._length || fn.length) > 1;
      }
  }
  function _enter(_, vnode) {
      if (vnode.data.show !== true) {
          enter(vnode);
      }
  }
  var transition = inBrowser
      ? {
          create: _enter,
          activate: _enter,
          remove: function (vnode, rm) {
              /* istanbul ignore else */
              if (vnode.data.show !== true) {
                  // @ts-expect-error
                  leave(vnode, rm);
              }
              else {
                  rm();
              }
          }
      }
      : {};

  var platformModules = [attrs, klass, events, domProps, style, transition];

  // the directive module should be applied last, after all
  // built-in modules have been applied.
  var modules = platformModules.concat(baseModules);
  var patch = createPatchFunction({ nodeOps: nodeOps, modules: modules });

  /**
   * Not type checking this file because flow doesn't like attaching
   * properties to Elements.
   */
  /* istanbul ignore if */
  if (isIE9) {
      // http://www.matts411.com/post/internet-explorer-9-oninput/
      document.addEventListener('selectionchange', function () {
          var el = document.activeElement;
          // @ts-expect-error
          if (el && el.vmodel) {
              trigger(el, 'input');
          }
      });
  }
  var directive = {
      inserted: function (el, binding, vnode, oldVnode) {
          if (vnode.tag === 'select') {
              // #6903
              if (oldVnode.elm && !oldVnode.elm._vOptions) {
                  mergeVNodeHook(vnode, 'postpatch', function () {
                      directive.componentUpdated(el, binding, vnode);
                  });
              }
              else {
                  setSelected(el, binding, vnode.context);
              }
              el._vOptions = [].map.call(el.options, getValue);
          }
          else if (vnode.tag === 'textarea' || isTextInputType(el.type)) {
              el._vModifiers = binding.modifiers;
              if (!binding.modifiers.lazy) {
                  el.addEventListener('compositionstart', onCompositionStart);
                  el.addEventListener('compositionend', onCompositionEnd);
                  // Safari < 10.2 & UIWebView doesn't fire compositionend when
                  // switching focus before confirming composition choice
                  // this also fixes the issue where some browsers e.g. iOS Chrome
                  // fires "change" instead of "input" on autocomplete.
                  el.addEventListener('change', onCompositionEnd);
                  /* istanbul ignore if */
                  if (isIE9) {
                      el.vmodel = true;
                  }
              }
          }
      },
      componentUpdated: function (el, binding, vnode) {
          if (vnode.tag === 'select') {
              setSelected(el, binding, vnode.context);
              // in case the options rendered by v-for have changed,
              // it's possible that the value is out-of-sync with the rendered options.
              // detect such cases and filter out values that no longer has a matching
              // option in the DOM.
              var prevOptions_1 = el._vOptions;
              var curOptions_1 = (el._vOptions = [].map.call(el.options, getValue));
              if (curOptions_1.some(function (o, i) { return !looseEqual(o, prevOptions_1[i]); })) {
                  // trigger change event if
                  // no matching option found for at least one value
                  var needReset = el.multiple
                      ? binding.value.some(function (v) { return hasNoMatchingOption(v, curOptions_1); })
                      : binding.value !== binding.oldValue &&
                          hasNoMatchingOption(binding.value, curOptions_1);
                  if (needReset) {
                      trigger(el, 'change');
                  }
              }
          }
      }
  };
  function setSelected(el, binding, vm) {
      actuallySetSelected(el, binding);
      /* istanbul ignore if */
      if (isIE || isEdge) {
          setTimeout(function () {
              actuallySetSelected(el, binding);
          }, 0);
      }
  }
  function actuallySetSelected(el, binding, vm) {
      var value = binding.value;
      var isMultiple = el.multiple;
      if (isMultiple && !Array.isArray(value)) {
          return;
      }
      var selected, option;
      for (var i = 0, l = el.options.length; i < l; i++) {
          option = el.options[i];
          if (isMultiple) {
              selected = looseIndexOf(value, getValue(option)) > -1;
              if (option.selected !== selected) {
                  option.selected = selected;
              }
          }
          else {
              if (looseEqual(getValue(option), value)) {
                  if (el.selectedIndex !== i) {
                      el.selectedIndex = i;
                  }
                  return;
              }
          }
      }
      if (!isMultiple) {
          el.selectedIndex = -1;
      }
  }
  function hasNoMatchingOption(value, options) {
      return options.every(function (o) { return !looseEqual(o, value); });
  }
  function getValue(option) {
      return '_value' in option ? option._value : option.value;
  }
  function onCompositionStart(e) {
      e.target.composing = true;
  }
  function onCompositionEnd(e) {
      // prevent triggering an input event for no reason
      if (!e.target.composing)
          return;
      e.target.composing = false;
      trigger(e.target, 'input');
  }
  function trigger(el, type) {
      var e = document.createEvent('HTMLEvents');
      e.initEvent(type, true, true);
      el.dispatchEvent(e);
  }

  // recursively search for possible transition defined inside the component root
  function locateNode(vnode) {
      // @ts-expect-error
      return vnode.componentInstance && (!vnode.data || !vnode.data.transition)
          ? locateNode(vnode.componentInstance._vnode)
          : vnode;
  }
  var show = {
      bind: function (el, _a, vnode) {
          var value = _a.value;
          vnode = locateNode(vnode);
          var transition = vnode.data && vnode.data.transition;
          var originalDisplay = (el.__vOriginalDisplay =
              el.style.display === 'none' ? '' : el.style.display);
          if (value && transition) {
              vnode.data.show = true;
              enter(vnode, function () {
                  el.style.display = originalDisplay;
              });
          }
          else {
              el.style.display = value ? originalDisplay : 'none';
          }
      },
      update: function (el, _a, vnode) {
          var value = _a.value, oldValue = _a.oldValue;
          /* istanbul ignore if */
          if (!value === !oldValue)
              return;
          vnode = locateNode(vnode);
          var transition = vnode.data && vnode.data.transition;
          if (transition) {
              vnode.data.show = true;
              if (value) {
                  enter(vnode, function () {
                      el.style.display = el.__vOriginalDisplay;
                  });
              }
              else {
                  leave(vnode, function () {
                      el.style.display = 'none';
                  });
              }
          }
          else {
              el.style.display = value ? el.__vOriginalDisplay : 'none';
          }
      },
      unbind: function (el, binding, vnode, oldVnode, isDestroy) {
          if (!isDestroy) {
              el.style.display = el.__vOriginalDisplay;
          }
      }
  };

  var platformDirectives = {
      model: directive,
      show: show
  };

  // Provides transition support for a single element/component.
  var transitionProps = {
      name: String,
      appear: Boolean,
      css: Boolean,
      mode: String,
      type: String,
      enterClass: String,
      leaveClass: String,
      enterToClass: String,
      leaveToClass: String,
      enterActiveClass: String,
      leaveActiveClass: String,
      appearClass: String,
      appearActiveClass: String,
      appearToClass: String,
      duration: [Number, String, Object]
  };
  // in case the child is also an abstract component, e.g. <keep-alive>
  // we want to recursively retrieve the real component to be rendered
  function getRealChild(vnode) {
      var compOptions = vnode && vnode.componentOptions;
      if (compOptions && compOptions.Ctor.options.abstract) {
          return getRealChild(getFirstComponentChild(compOptions.children));
      }
      else {
          return vnode;
      }
  }
  function extractTransitionData(comp) {
      var data = {};
      var options = comp.$options;
      // props
      for (var key in options.propsData) {
          data[key] = comp[key];
      }
      // events.
      // extract listeners and pass them directly to the transition methods
      var listeners = options._parentListeners;
      for (var key in listeners) {
          data[camelize(key)] = listeners[key];
      }
      return data;
  }
  function placeholder(h, rawChild) {
      // @ts-expect-error
      if (/\d-keep-alive$/.test(rawChild.tag)) {
          return h('keep-alive', {
              props: rawChild.componentOptions.propsData
          });
      }
  }
  function hasParentTransition(vnode) {
      while ((vnode = vnode.parent)) {
          if (vnode.data.transition) {
              return true;
          }
      }
  }
  function isSameChild(child, oldChild) {
      return oldChild.key === child.key && oldChild.tag === child.tag;
  }
  var isNotTextNode = function (c) { return c.tag || isAsyncPlaceholder(c); };
  var isVShowDirective = function (d) { return d.name === 'show'; };
  var Transition = {
      name: 'transition',
      props: transitionProps,
      abstract: true,
      render: function (h) {
          var _this = this;
          var children = this.$slots.default;
          if (!children) {
              return;
          }
          // filter out text nodes (possible whitespaces)
          children = children.filter(isNotTextNode);
          /* istanbul ignore if */
          if (!children.length) {
              return;
          }
          var mode = this.mode;
          var rawChild = children[0];
          // if this is a component root node and the component's
          // parent container node also has transition, skip.
          if (hasParentTransition(this.$vnode)) {
              return rawChild;
          }
          // apply transition data to child
          // use getRealChild() to ignore abstract components e.g. keep-alive
          var child = getRealChild(rawChild);
          /* istanbul ignore if */
          if (!child) {
              return rawChild;
          }
          if (this._leaving) {
              return placeholder(h, rawChild);
          }
          // ensure a key that is unique to the vnode type and to this transition
          // component instance. This key will be used to remove pending leaving nodes
          // during entering.
          var id = "__transition-".concat(this._uid, "-");
          child.key =
              child.key == null
                  ? child.isComment
                      ? id + 'comment'
                      : id + child.tag
                  : isPrimitive(child.key)
                      ? String(child.key).indexOf(id) === 0
                          ? child.key
                          : id + child.key
                      : child.key;
          var data = ((child.data || (child.data = {})).transition =
              extractTransitionData(this));
          var oldRawChild = this._vnode;
          var oldChild = getRealChild(oldRawChild);
          // mark v-show
          // so that the transition module can hand over the control to the directive
          if (child.data.directives && child.data.directives.some(isVShowDirective)) {
              child.data.show = true;
          }
          if (oldChild &&
              oldChild.data &&
              !isSameChild(child, oldChild) &&
              !isAsyncPlaceholder(oldChild) &&
              // #6687 component root is a comment node
              !(oldChild.componentInstance &&
                  oldChild.componentInstance._vnode.isComment)) {
              // replace old child transition data with fresh one
              // important for dynamic transitions!
              var oldData = (oldChild.data.transition = extend$1({}, data));
              // handle transition mode
              if (mode === 'out-in') {
                  // return placeholder node and queue update when leave finishes
                  this._leaving = true;
                  mergeVNodeHook(oldData, 'afterLeave', function () {
                      _this._leaving = false;
                      _this.$forceUpdate();
                  });
                  return placeholder(h, rawChild);
              }
              else if (mode === 'in-out') {
                  if (isAsyncPlaceholder(child)) {
                      return oldRawChild;
                  }
                  var delayedLeave_1;
                  var performLeave = function () {
                      delayedLeave_1();
                  };
                  mergeVNodeHook(data, 'afterEnter', performLeave);
                  mergeVNodeHook(data, 'enterCancelled', performLeave);
                  mergeVNodeHook(oldData, 'delayLeave', function (leave) {
                      delayedLeave_1 = leave;
                  });
              }
          }
          return rawChild;
      }
  };

  // Provides transition support for list items.
  var props = extend$1({
      tag: String,
      moveClass: String
  }, transitionProps);
  delete props.mode;
  var TransitionGroup = {
      props: props,
      beforeMount: function () {
          var _this = this;
          var update = this._update;
          this._update = function (vnode, hydrating) {
              var restoreActiveInstance = setActiveInstance(_this);
              // force removing pass
              _this.__patch__(_this._vnode, _this.kept, false, // hydrating
              true // removeOnly (!important, avoids unnecessary moves)
              );
              _this._vnode = _this.kept;
              restoreActiveInstance();
              update.call(_this, vnode, hydrating);
          };
      },
      render: function (h) {
          var tag = this.tag || this.$vnode.data.tag || 'span';
          var map = Object.create(null);
          var prevChildren = (this.prevChildren = this.children);
          var rawChildren = this.$slots.default || [];
          var children = (this.children = []);
          var transitionData = extractTransitionData(this);
          for (var i = 0; i < rawChildren.length; i++) {
              var c = rawChildren[i];
              if (c.tag) {
                  if (c.key != null && String(c.key).indexOf('__vlist') !== 0) {
                      children.push(c);
                      map[c.key] = c;
                      (c.data || (c.data = {})).transition = transitionData;
                  }
              }
          }
          if (prevChildren) {
              var kept = [];
              var removed = [];
              for (var i = 0; i < prevChildren.length; i++) {
                  var c = prevChildren[i];
                  c.data.transition = transitionData;
                  // @ts-expect-error .getBoundingClientRect is not typed in Node
                  c.data.pos = c.elm.getBoundingClientRect();
                  if (map[c.key]) {
                      kept.push(c);
                  }
                  else {
                      removed.push(c);
                  }
              }
              this.kept = h(tag, null, kept);
              this.removed = removed;
          }
          return h(tag, null, children);
      },
      updated: function () {
          var children = this.prevChildren;
          var moveClass = this.moveClass || (this.name || 'v') + '-move';
          if (!children.length || !this.hasMove(children[0].elm, moveClass)) {
              return;
          }
          // we divide the work into three loops to avoid mixing DOM reads and writes
          // in each iteration - which helps prevent layout thrashing.
          children.forEach(callPendingCbs);
          children.forEach(recordPosition);
          children.forEach(applyTranslation);
          // force reflow to put everything in position
          // assign to this to avoid being removed in tree-shaking
          // $flow-disable-line
          this._reflow = document.body.offsetHeight;
          children.forEach(function (c) {
              if (c.data.moved) {
                  var el_1 = c.elm;
                  var s = el_1.style;
                  addTransitionClass(el_1, moveClass);
                  s.transform = s.WebkitTransform = s.transitionDuration = '';
                  el_1.addEventListener(transitionEndEvent, (el_1._moveCb = function cb(e) {
                      if (e && e.target !== el_1) {
                          return;
                      }
                      if (!e || /transform$/.test(e.propertyName)) {
                          el_1.removeEventListener(transitionEndEvent, cb);
                          el_1._moveCb = null;
                          removeTransitionClass(el_1, moveClass);
                      }
                  }));
              }
          });
      },
      methods: {
          hasMove: function (el, moveClass) {
              /* istanbul ignore if */
              if (!hasTransition) {
                  return false;
              }
              /* istanbul ignore if */
              if (this._hasMove) {
                  return this._hasMove;
              }
              // Detect whether an element with the move class applied has
              // CSS transitions. Since the element may be inside an entering
              // transition at this very moment, we make a clone of it and remove
              // all other transition classes applied to ensure only the move class
              // is applied.
              var clone = el.cloneNode();
              if (el._transitionClasses) {
                  el._transitionClasses.forEach(function (cls) {
                      removeClass(clone, cls);
                  });
              }
              addClass(clone, moveClass);
              clone.style.display = 'none';
              this.$el.appendChild(clone);
              var info = getTransitionInfo(clone);
              this.$el.removeChild(clone);
              return (this._hasMove = info.hasTransform);
          }
      }
  };
  function callPendingCbs(c) {
      /* istanbul ignore if */
      if (c.elm._moveCb) {
          c.elm._moveCb();
      }
      /* istanbul ignore if */
      if (c.elm._enterCb) {
          c.elm._enterCb();
      }
  }
  function recordPosition(c) {
      c.data.newPos = c.elm.getBoundingClientRect();
  }
  function applyTranslation(c) {
      var oldPos = c.data.pos;
      var newPos = c.data.newPos;
      var dx = oldPos.left - newPos.left;
      var dy = oldPos.top - newPos.top;
      if (dx || dy) {
          c.data.moved = true;
          var s = c.elm.style;
          s.transform = s.WebkitTransform = "translate(".concat(dx, "px,").concat(dy, "px)");
          s.transitionDuration = '0s';
      }
  }

  var platformComponents = {
      Transition: Transition,
      TransitionGroup: TransitionGroup
  };

  // install platform specific utils
  Vue.config.mustUseProp = mustUseProp;
  Vue.config.isReservedTag = isReservedTag;
  Vue.config.isReservedAttr = isReservedAttr;
  Vue.config.getTagNamespace = getTagNamespace;
  Vue.config.isUnknownElement = isUnknownElement;
  // install platform runtime directives & components
  extend$1(Vue.options.directives, platformDirectives);
  extend$1(Vue.options.components, platformComponents);
  // install platform patch function
  Vue.prototype.__patch__ = inBrowser ? patch : noop$1;
  // public mount method
  Vue.prototype.$mount = function (el, hydrating) {
      el = el && inBrowser ? query(el) : undefined;
      return mountComponent(this, el, hydrating);
  };
  // devtools global hook
  /* istanbul ignore next */
  if (inBrowser) {
      setTimeout(function () {
          if (config.devtools) {
              if (devtools) {
                  devtools.emit('init', Vue);
              }
          }
      }, 0);
  }

  function bind(fn, thisArg) {
    return function wrap() {
      return fn.apply(thisArg, arguments);
    };
  }

  // utils is a library of generic helper functions non-specific to axios

  const {toString} = Object.prototype;
  const {getPrototypeOf} = Object;

  const kindOf = (cache => thing => {
      const str = toString.call(thing);
      return cache[str] || (cache[str] = str.slice(8, -1).toLowerCase());
  })(Object.create(null));

  const kindOfTest = (type) => {
    type = type.toLowerCase();
    return (thing) => kindOf(thing) === type
  };

  const typeOfTest = type => thing => typeof thing === type;

  /**
   * Determine if a value is an Array
   *
   * @param {Object} val The value to test
   *
   * @returns {boolean} True if value is an Array, otherwise false
   */
  const {isArray} = Array;

  /**
   * Determine if a value is undefined
   *
   * @param {*} val The value to test
   *
   * @returns {boolean} True if the value is undefined, otherwise false
   */
  const isUndefined = typeOfTest('undefined');

  /**
   * Determine if a value is a Buffer
   *
   * @param {*} val The value to test
   *
   * @returns {boolean} True if value is a Buffer, otherwise false
   */
  function isBuffer(val) {
    return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor)
      && isFunction(val.constructor.isBuffer) && val.constructor.isBuffer(val);
  }

  /**
   * Determine if a value is an ArrayBuffer
   *
   * @param {*} val The value to test
   *
   * @returns {boolean} True if value is an ArrayBuffer, otherwise false
   */
  const isArrayBuffer = kindOfTest('ArrayBuffer');


  /**
   * Determine if a value is a view on an ArrayBuffer
   *
   * @param {*} val The value to test
   *
   * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
   */
  function isArrayBufferView(val) {
    let result;
    if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
      result = ArrayBuffer.isView(val);
    } else {
      result = (val) && (val.buffer) && (isArrayBuffer(val.buffer));
    }
    return result;
  }

  /**
   * Determine if a value is a String
   *
   * @param {*} val The value to test
   *
   * @returns {boolean} True if value is a String, otherwise false
   */
  const isString = typeOfTest('string');

  /**
   * Determine if a value is a Function
   *
   * @param {*} val The value to test
   * @returns {boolean} True if value is a Function, otherwise false
   */
  const isFunction = typeOfTest('function');

  /**
   * Determine if a value is a Number
   *
   * @param {*} val The value to test
   *
   * @returns {boolean} True if value is a Number, otherwise false
   */
  const isNumber = typeOfTest('number');

  /**
   * Determine if a value is an Object
   *
   * @param {*} thing The value to test
   *
   * @returns {boolean} True if value is an Object, otherwise false
   */
  const isObject = (thing) => thing !== null && typeof thing === 'object';

  /**
   * Determine if a value is a Boolean
   *
   * @param {*} thing The value to test
   * @returns {boolean} True if value is a Boolean, otherwise false
   */
  const isBoolean = thing => thing === true || thing === false;

  /**
   * Determine if a value is a plain Object
   *
   * @param {*} val The value to test
   *
   * @returns {boolean} True if value is a plain Object, otherwise false
   */
  const isPlainObject = (val) => {
    if (kindOf(val) !== 'object') {
      return false;
    }

    const prototype = getPrototypeOf(val);
    return (prototype === null || prototype === Object.prototype || Object.getPrototypeOf(prototype) === null) && !(Symbol.toStringTag in val) && !(Symbol.iterator in val);
  };

  /**
   * Determine if a value is a Date
   *
   * @param {*} val The value to test
   *
   * @returns {boolean} True if value is a Date, otherwise false
   */
  const isDate = kindOfTest('Date');

  /**
   * Determine if a value is a File
   *
   * @param {*} val The value to test
   *
   * @returns {boolean} True if value is a File, otherwise false
   */
  const isFile = kindOfTest('File');

  /**
   * Determine if a value is a Blob
   *
   * @param {*} val The value to test
   *
   * @returns {boolean} True if value is a Blob, otherwise false
   */
  const isBlob = kindOfTest('Blob');

  /**
   * Determine if a value is a FileList
   *
   * @param {*} val The value to test
   *
   * @returns {boolean} True if value is a File, otherwise false
   */
  const isFileList = kindOfTest('FileList');

  /**
   * Determine if a value is a Stream
   *
   * @param {*} val The value to test
   *
   * @returns {boolean} True if value is a Stream, otherwise false
   */
  const isStream = (val) => isObject(val) && isFunction(val.pipe);

  /**
   * Determine if a value is a FormData
   *
   * @param {*} thing The value to test
   *
   * @returns {boolean} True if value is an FormData, otherwise false
   */
  const isFormData = (thing) => {
    let kind;
    return thing && (
      (typeof FormData === 'function' && thing instanceof FormData) || (
        isFunction(thing.append) && (
          (kind = kindOf(thing)) === 'formdata' ||
          // detect form-data instance
          (kind === 'object' && isFunction(thing.toString) && thing.toString() === '[object FormData]')
        )
      )
    )
  };

  /**
   * Determine if a value is a URLSearchParams object
   *
   * @param {*} val The value to test
   *
   * @returns {boolean} True if value is a URLSearchParams object, otherwise false
   */
  const isURLSearchParams = kindOfTest('URLSearchParams');

  const [isReadableStream, isRequest, isResponse, isHeaders] = ['ReadableStream', 'Request', 'Response', 'Headers'].map(kindOfTest);

  /**
   * Trim excess whitespace off the beginning and end of a string
   *
   * @param {String} str The String to trim
   *
   * @returns {String} The String freed of excess whitespace
   */
  const trim = (str) => str.trim ?
    str.trim() : str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');

  /**
   * Iterate over an Array or an Object invoking a function for each item.
   *
   * If `obj` is an Array callback will be called passing
   * the value, index, and complete array for each item.
   *
   * If 'obj' is an Object callback will be called passing
   * the value, key, and complete object for each property.
   *
   * @param {Object|Array} obj The object to iterate
   * @param {Function} fn The callback to invoke for each item
   *
   * @param {Boolean} [allOwnKeys = false]
   * @returns {any}
   */
  function forEach(obj, fn, {allOwnKeys = false} = {}) {
    // Don't bother if no value provided
    if (obj === null || typeof obj === 'undefined') {
      return;
    }

    let i;
    let l;

    // Force an array if not already something iterable
    if (typeof obj !== 'object') {
      /*eslint no-param-reassign:0*/
      obj = [obj];
    }

    if (isArray(obj)) {
      // Iterate over array values
      for (i = 0, l = obj.length; i < l; i++) {
        fn.call(null, obj[i], i, obj);
      }
    } else {
      // Iterate over object keys
      const keys = allOwnKeys ? Object.getOwnPropertyNames(obj) : Object.keys(obj);
      const len = keys.length;
      let key;

      for (i = 0; i < len; i++) {
        key = keys[i];
        fn.call(null, obj[key], key, obj);
      }
    }
  }

  function findKey(obj, key) {
    key = key.toLowerCase();
    const keys = Object.keys(obj);
    let i = keys.length;
    let _key;
    while (i-- > 0) {
      _key = keys[i];
      if (key === _key.toLowerCase()) {
        return _key;
      }
    }
    return null;
  }

  const _global = (() => {
    /*eslint no-undef:0*/
    if (typeof globalThis !== "undefined") return globalThis;
    return typeof self !== "undefined" ? self : (typeof window !== 'undefined' ? window : global)
  })();

  const isContextDefined = (context) => !isUndefined(context) && context !== _global;

  /**
   * Accepts varargs expecting each argument to be an object, then
   * immutably merges the properties of each object and returns result.
   *
   * When multiple objects contain the same key the later object in
   * the arguments list will take precedence.
   *
   * Example:
   *
   * ```js
   * var result = merge({foo: 123}, {foo: 456});
   * console.log(result.foo); // outputs 456
   * ```
   *
   * @param {Object} obj1 Object to merge
   *
   * @returns {Object} Result of all merge properties
   */
  function merge(/* obj1, obj2, obj3, ... */) {
    const {caseless} = isContextDefined(this) && this || {};
    const result = {};
    const assignValue = (val, key) => {
      const targetKey = caseless && findKey(result, key) || key;
      if (isPlainObject(result[targetKey]) && isPlainObject(val)) {
        result[targetKey] = merge(result[targetKey], val);
      } else if (isPlainObject(val)) {
        result[targetKey] = merge({}, val);
      } else if (isArray(val)) {
        result[targetKey] = val.slice();
      } else {
        result[targetKey] = val;
      }
    };

    for (let i = 0, l = arguments.length; i < l; i++) {
      arguments[i] && forEach(arguments[i], assignValue);
    }
    return result;
  }

  /**
   * Extends object a by mutably adding to it the properties of object b.
   *
   * @param {Object} a The object to be extended
   * @param {Object} b The object to copy properties from
   * @param {Object} thisArg The object to bind function to
   *
   * @param {Boolean} [allOwnKeys]
   * @returns {Object} The resulting value of object a
   */
  const extend = (a, b, thisArg, {allOwnKeys}= {}) => {
    forEach(b, (val, key) => {
      if (thisArg && isFunction(val)) {
        a[key] = bind(val, thisArg);
      } else {
        a[key] = val;
      }
    }, {allOwnKeys});
    return a;
  };

  /**
   * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
   *
   * @param {string} content with BOM
   *
   * @returns {string} content value without BOM
   */
  const stripBOM = (content) => {
    if (content.charCodeAt(0) === 0xFEFF) {
      content = content.slice(1);
    }
    return content;
  };

  /**
   * Inherit the prototype methods from one constructor into another
   * @param {function} constructor
   * @param {function} superConstructor
   * @param {object} [props]
   * @param {object} [descriptors]
   *
   * @returns {void}
   */
  const inherits = (constructor, superConstructor, props, descriptors) => {
    constructor.prototype = Object.create(superConstructor.prototype, descriptors);
    constructor.prototype.constructor = constructor;
    Object.defineProperty(constructor, 'super', {
      value: superConstructor.prototype
    });
    props && Object.assign(constructor.prototype, props);
  };

  /**
   * Resolve object with deep prototype chain to a flat object
   * @param {Object} sourceObj source object
   * @param {Object} [destObj]
   * @param {Function|Boolean} [filter]
   * @param {Function} [propFilter]
   *
   * @returns {Object}
   */
  const toFlatObject = (sourceObj, destObj, filter, propFilter) => {
    let props;
    let i;
    let prop;
    const merged = {};

    destObj = destObj || {};
    // eslint-disable-next-line no-eq-null,eqeqeq
    if (sourceObj == null) return destObj;

    do {
      props = Object.getOwnPropertyNames(sourceObj);
      i = props.length;
      while (i-- > 0) {
        prop = props[i];
        if ((!propFilter || propFilter(prop, sourceObj, destObj)) && !merged[prop]) {
          destObj[prop] = sourceObj[prop];
          merged[prop] = true;
        }
      }
      sourceObj = filter !== false && getPrototypeOf(sourceObj);
    } while (sourceObj && (!filter || filter(sourceObj, destObj)) && sourceObj !== Object.prototype);

    return destObj;
  };

  /**
   * Determines whether a string ends with the characters of a specified string
   *
   * @param {String} str
   * @param {String} searchString
   * @param {Number} [position= 0]
   *
   * @returns {boolean}
   */
  const endsWith = (str, searchString, position) => {
    str = String(str);
    if (position === undefined || position > str.length) {
      position = str.length;
    }
    position -= searchString.length;
    const lastIndex = str.indexOf(searchString, position);
    return lastIndex !== -1 && lastIndex === position;
  };


  /**
   * Returns new array from array like object or null if failed
   *
   * @param {*} [thing]
   *
   * @returns {?Array}
   */
  const toArray = (thing) => {
    if (!thing) return null;
    if (isArray(thing)) return thing;
    let i = thing.length;
    if (!isNumber(i)) return null;
    const arr = new Array(i);
    while (i-- > 0) {
      arr[i] = thing[i];
    }
    return arr;
  };

  /**
   * Checking if the Uint8Array exists and if it does, it returns a function that checks if the
   * thing passed in is an instance of Uint8Array
   *
   * @param {TypedArray}
   *
   * @returns {Array}
   */
  // eslint-disable-next-line func-names
  const isTypedArray = (TypedArray => {
    // eslint-disable-next-line func-names
    return thing => {
      return TypedArray && thing instanceof TypedArray;
    };
  })(typeof Uint8Array !== 'undefined' && getPrototypeOf(Uint8Array));

  /**
   * For each entry in the object, call the function with the key and value.
   *
   * @param {Object<any, any>} obj - The object to iterate over.
   * @param {Function} fn - The function to call for each entry.
   *
   * @returns {void}
   */
  const forEachEntry = (obj, fn) => {
    const generator = obj && obj[Symbol.iterator];

    const iterator = generator.call(obj);

    let result;

    while ((result = iterator.next()) && !result.done) {
      const pair = result.value;
      fn.call(obj, pair[0], pair[1]);
    }
  };

  /**
   * It takes a regular expression and a string, and returns an array of all the matches
   *
   * @param {string} regExp - The regular expression to match against.
   * @param {string} str - The string to search.
   *
   * @returns {Array<boolean>}
   */
  const matchAll = (regExp, str) => {
    let matches;
    const arr = [];

    while ((matches = regExp.exec(str)) !== null) {
      arr.push(matches);
    }

    return arr;
  };

  /* Checking if the kindOfTest function returns true when passed an HTMLFormElement. */
  const isHTMLForm = kindOfTest('HTMLFormElement');

  const toCamelCase = str => {
    return str.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g,
      function replacer(m, p1, p2) {
        return p1.toUpperCase() + p2;
      }
    );
  };

  /* Creating a function that will check if an object has a property. */
  const hasOwnProperty = (({hasOwnProperty}) => (obj, prop) => hasOwnProperty.call(obj, prop))(Object.prototype);

  /**
   * Determine if a value is a RegExp object
   *
   * @param {*} val The value to test
   *
   * @returns {boolean} True if value is a RegExp object, otherwise false
   */
  const isRegExp = kindOfTest('RegExp');

  const reduceDescriptors = (obj, reducer) => {
    const descriptors = Object.getOwnPropertyDescriptors(obj);
    const reducedDescriptors = {};

    forEach(descriptors, (descriptor, name) => {
      let ret;
      if ((ret = reducer(descriptor, name, obj)) !== false) {
        reducedDescriptors[name] = ret || descriptor;
      }
    });

    Object.defineProperties(obj, reducedDescriptors);
  };

  /**
   * Makes all methods read-only
   * @param {Object} obj
   */

  const freezeMethods = (obj) => {
    reduceDescriptors(obj, (descriptor, name) => {
      // skip restricted props in strict mode
      if (isFunction(obj) && ['arguments', 'caller', 'callee'].indexOf(name) !== -1) {
        return false;
      }

      const value = obj[name];

      if (!isFunction(value)) return;

      descriptor.enumerable = false;

      if ('writable' in descriptor) {
        descriptor.writable = false;
        return;
      }

      if (!descriptor.set) {
        descriptor.set = () => {
          throw Error('Can not rewrite read-only method \'' + name + '\'');
        };
      }
    });
  };

  const toObjectSet = (arrayOrString, delimiter) => {
    const obj = {};

    const define = (arr) => {
      arr.forEach(value => {
        obj[value] = true;
      });
    };

    isArray(arrayOrString) ? define(arrayOrString) : define(String(arrayOrString).split(delimiter));

    return obj;
  };

  const noop = () => {};

  const toFiniteNumber = (value, defaultValue) => {
    return value != null && Number.isFinite(value = +value) ? value : defaultValue;
  };

  const ALPHA = 'abcdefghijklmnopqrstuvwxyz';

  const DIGIT = '0123456789';

  const ALPHABET = {
    DIGIT,
    ALPHA,
    ALPHA_DIGIT: ALPHA + ALPHA.toUpperCase() + DIGIT
  };

  const generateString = (size = 16, alphabet = ALPHABET.ALPHA_DIGIT) => {
    let str = '';
    const {length} = alphabet;
    while (size--) {
      str += alphabet[Math.random() * length|0];
    }

    return str;
  };

  /**
   * If the thing is a FormData object, return true, otherwise return false.
   *
   * @param {unknown} thing - The thing to check.
   *
   * @returns {boolean}
   */
  function isSpecCompliantForm(thing) {
    return !!(thing && isFunction(thing.append) && thing[Symbol.toStringTag] === 'FormData' && thing[Symbol.iterator]);
  }

  const toJSONObject = (obj) => {
    const stack = new Array(10);

    const visit = (source, i) => {

      if (isObject(source)) {
        if (stack.indexOf(source) >= 0) {
          return;
        }

        if(!('toJSON' in source)) {
          stack[i] = source;
          const target = isArray(source) ? [] : {};

          forEach(source, (value, key) => {
            const reducedValue = visit(value, i + 1);
            !isUndefined(reducedValue) && (target[key] = reducedValue);
          });

          stack[i] = undefined;

          return target;
        }
      }

      return source;
    };

    return visit(obj, 0);
  };

  const isAsyncFn = kindOfTest('AsyncFunction');

  const isThenable = (thing) =>
    thing && (isObject(thing) || isFunction(thing)) && isFunction(thing.then) && isFunction(thing.catch);

  // original code
  // https://github.com/DigitalBrainJS/AxiosPromise/blob/16deab13710ec09779922131f3fa5954320f83ab/lib/utils.js#L11-L34

  const _setImmediate = ((setImmediateSupported, postMessageSupported) => {
    if (setImmediateSupported) {
      return setImmediate;
    }

    return postMessageSupported ? ((token, callbacks) => {
      _global.addEventListener("message", ({source, data}) => {
        if (source === _global && data === token) {
          callbacks.length && callbacks.shift()();
        }
      }, false);

      return (cb) => {
        callbacks.push(cb);
        _global.postMessage(token, "*");
      }
    })(`axios@${Math.random()}`, []) : (cb) => setTimeout(cb);
  })(
    typeof setImmediate === 'function',
    isFunction(_global.postMessage)
  );

  const asap = typeof queueMicrotask !== 'undefined' ?
    queueMicrotask.bind(_global) : ( typeof process !== 'undefined' && process.nextTick || _setImmediate);

  // *********************

  var utils$2 = {
    isArray,
    isArrayBuffer,
    isBuffer,
    isFormData,
    isArrayBufferView,
    isString,
    isNumber,
    isBoolean,
    isObject,
    isPlainObject,
    isReadableStream,
    isRequest,
    isResponse,
    isHeaders,
    isUndefined,
    isDate,
    isFile,
    isBlob,
    isRegExp,
    isFunction,
    isStream,
    isURLSearchParams,
    isTypedArray,
    isFileList,
    forEach,
    merge,
    extend,
    trim,
    stripBOM,
    inherits,
    toFlatObject,
    kindOf,
    kindOfTest,
    endsWith,
    toArray,
    forEachEntry,
    matchAll,
    isHTMLForm,
    hasOwnProperty,
    hasOwnProp: hasOwnProperty, // an alias to avoid ESLint no-prototype-builtins detection
    reduceDescriptors,
    freezeMethods,
    toObjectSet,
    toCamelCase,
    noop,
    toFiniteNumber,
    findKey,
    global: _global,
    isContextDefined,
    ALPHABET,
    generateString,
    isSpecCompliantForm,
    toJSONObject,
    isAsyncFn,
    isThenable,
    setImmediate: _setImmediate,
    asap
  };

  /**
   * Create an Error with the specified message, config, error code, request and response.
   *
   * @param {string} message The error message.
   * @param {string} [code] The error code (for example, 'ECONNABORTED').
   * @param {Object} [config] The config.
   * @param {Object} [request] The request.
   * @param {Object} [response] The response.
   *
   * @returns {Error} The created error.
   */
  function AxiosError$1(message, code, config, request, response) {
    Error.call(this);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = (new Error()).stack;
    }

    this.message = message;
    this.name = 'AxiosError';
    code && (this.code = code);
    config && (this.config = config);
    request && (this.request = request);
    if (response) {
      this.response = response;
      this.status = response.status ? response.status : null;
    }
  }

  utils$2.inherits(AxiosError$1, Error, {
    toJSON: function toJSON() {
      return {
        // Standard
        message: this.message,
        name: this.name,
        // Microsoft
        description: this.description,
        number: this.number,
        // Mozilla
        fileName: this.fileName,
        lineNumber: this.lineNumber,
        columnNumber: this.columnNumber,
        stack: this.stack,
        // Axios
        config: utils$2.toJSONObject(this.config),
        code: this.code,
        status: this.status
      };
    }
  });

  const prototype$1 = AxiosError$1.prototype;
  const descriptors = {};

  [
    'ERR_BAD_OPTION_VALUE',
    'ERR_BAD_OPTION',
    'ECONNABORTED',
    'ETIMEDOUT',
    'ERR_NETWORK',
    'ERR_FR_TOO_MANY_REDIRECTS',
    'ERR_DEPRECATED',
    'ERR_BAD_RESPONSE',
    'ERR_BAD_REQUEST',
    'ERR_CANCELED',
    'ERR_NOT_SUPPORT',
    'ERR_INVALID_URL'
  // eslint-disable-next-line func-names
  ].forEach(code => {
    descriptors[code] = {value: code};
  });

  Object.defineProperties(AxiosError$1, descriptors);
  Object.defineProperty(prototype$1, 'isAxiosError', {value: true});

  // eslint-disable-next-line func-names
  AxiosError$1.from = (error, code, config, request, response, customProps) => {
    const axiosError = Object.create(prototype$1);

    utils$2.toFlatObject(error, axiosError, function filter(obj) {
      return obj !== Error.prototype;
    }, prop => {
      return prop !== 'isAxiosError';
    });

    AxiosError$1.call(axiosError, error.message, code, config, request, response);

    axiosError.cause = error;

    axiosError.name = error.name;

    customProps && Object.assign(axiosError, customProps);

    return axiosError;
  };

  // eslint-disable-next-line strict
  var httpAdapter = null;

  /**
   * Determines if the given thing is a array or js object.
   *
   * @param {string} thing - The object or array to be visited.
   *
   * @returns {boolean}
   */
  function isVisitable(thing) {
    return utils$2.isPlainObject(thing) || utils$2.isArray(thing);
  }

  /**
   * It removes the brackets from the end of a string
   *
   * @param {string} key - The key of the parameter.
   *
   * @returns {string} the key without the brackets.
   */
  function removeBrackets(key) {
    return utils$2.endsWith(key, '[]') ? key.slice(0, -2) : key;
  }

  /**
   * It takes a path, a key, and a boolean, and returns a string
   *
   * @param {string} path - The path to the current key.
   * @param {string} key - The key of the current object being iterated over.
   * @param {string} dots - If true, the key will be rendered with dots instead of brackets.
   *
   * @returns {string} The path to the current key.
   */
  function renderKey(path, key, dots) {
    if (!path) return key;
    return path.concat(key).map(function each(token, i) {
      // eslint-disable-next-line no-param-reassign
      token = removeBrackets(token);
      return !dots && i ? '[' + token + ']' : token;
    }).join(dots ? '.' : '');
  }

  /**
   * If the array is an array and none of its elements are visitable, then it's a flat array.
   *
   * @param {Array<any>} arr - The array to check
   *
   * @returns {boolean}
   */
  function isFlatArray(arr) {
    return utils$2.isArray(arr) && !arr.some(isVisitable);
  }

  const predicates = utils$2.toFlatObject(utils$2, {}, null, function filter(prop) {
    return /^is[A-Z]/.test(prop);
  });

  /**
   * Convert a data object to FormData
   *
   * @param {Object} obj
   * @param {?Object} [formData]
   * @param {?Object} [options]
   * @param {Function} [options.visitor]
   * @param {Boolean} [options.metaTokens = true]
   * @param {Boolean} [options.dots = false]
   * @param {?Boolean} [options.indexes = false]
   *
   * @returns {Object}
   **/

  /**
   * It converts an object into a FormData object
   *
   * @param {Object<any, any>} obj - The object to convert to form data.
   * @param {string} formData - The FormData object to append to.
   * @param {Object<string, any>} options
   *
   * @returns
   */
  function toFormData$1(obj, formData, options) {
    if (!utils$2.isObject(obj)) {
      throw new TypeError('target must be an object');
    }

    // eslint-disable-next-line no-param-reassign
    formData = formData || new (FormData)();

    // eslint-disable-next-line no-param-reassign
    options = utils$2.toFlatObject(options, {
      metaTokens: true,
      dots: false,
      indexes: false
    }, false, function defined(option, source) {
      // eslint-disable-next-line no-eq-null,eqeqeq
      return !utils$2.isUndefined(source[option]);
    });

    const metaTokens = options.metaTokens;
    // eslint-disable-next-line no-use-before-define
    const visitor = options.visitor || defaultVisitor;
    const dots = options.dots;
    const indexes = options.indexes;
    const _Blob = options.Blob || typeof Blob !== 'undefined' && Blob;
    const useBlob = _Blob && utils$2.isSpecCompliantForm(formData);

    if (!utils$2.isFunction(visitor)) {
      throw new TypeError('visitor must be a function');
    }

    function convertValue(value) {
      if (value === null) return '';

      if (utils$2.isDate(value)) {
        return value.toISOString();
      }

      if (!useBlob && utils$2.isBlob(value)) {
        throw new AxiosError$1('Blob is not supported. Use a Buffer instead.');
      }

      if (utils$2.isArrayBuffer(value) || utils$2.isTypedArray(value)) {
        return useBlob && typeof Blob === 'function' ? new Blob([value]) : Buffer.from(value);
      }

      return value;
    }

    /**
     * Default visitor.
     *
     * @param {*} value
     * @param {String|Number} key
     * @param {Array<String|Number>} path
     * @this {FormData}
     *
     * @returns {boolean} return true to visit the each prop of the value recursively
     */
    function defaultVisitor(value, key, path) {
      let arr = value;

      if (value && !path && typeof value === 'object') {
        if (utils$2.endsWith(key, '{}')) {
          // eslint-disable-next-line no-param-reassign
          key = metaTokens ? key : key.slice(0, -2);
          // eslint-disable-next-line no-param-reassign
          value = JSON.stringify(value);
        } else if (
          (utils$2.isArray(value) && isFlatArray(value)) ||
          ((utils$2.isFileList(value) || utils$2.endsWith(key, '[]')) && (arr = utils$2.toArray(value))
          )) {
          // eslint-disable-next-line no-param-reassign
          key = removeBrackets(key);

          arr.forEach(function each(el, index) {
            !(utils$2.isUndefined(el) || el === null) && formData.append(
              // eslint-disable-next-line no-nested-ternary
              indexes === true ? renderKey([key], index, dots) : (indexes === null ? key : key + '[]'),
              convertValue(el)
            );
          });
          return false;
        }
      }

      if (isVisitable(value)) {
        return true;
      }

      formData.append(renderKey(path, key, dots), convertValue(value));

      return false;
    }

    const stack = [];

    const exposedHelpers = Object.assign(predicates, {
      defaultVisitor,
      convertValue,
      isVisitable
    });

    function build(value, path) {
      if (utils$2.isUndefined(value)) return;

      if (stack.indexOf(value) !== -1) {
        throw Error('Circular reference detected in ' + path.join('.'));
      }

      stack.push(value);

      utils$2.forEach(value, function each(el, key) {
        const result = !(utils$2.isUndefined(el) || el === null) && visitor.call(
          formData, el, utils$2.isString(key) ? key.trim() : key, path, exposedHelpers
        );

        if (result === true) {
          build(el, path ? path.concat(key) : [key]);
        }
      });

      stack.pop();
    }

    if (!utils$2.isObject(obj)) {
      throw new TypeError('data must be an object');
    }

    build(obj);

    return formData;
  }

  /**
   * It encodes a string by replacing all characters that are not in the unreserved set with
   * their percent-encoded equivalents
   *
   * @param {string} str - The string to encode.
   *
   * @returns {string} The encoded string.
   */
  function encode$1(str) {
    const charMap = {
      '!': '%21',
      "'": '%27',
      '(': '%28',
      ')': '%29',
      '~': '%7E',
      '%20': '+',
      '%00': '\x00'
    };
    return encodeURIComponent(str).replace(/[!'()~]|%20|%00/g, function replacer(match) {
      return charMap[match];
    });
  }

  /**
   * It takes a params object and converts it to a FormData object
   *
   * @param {Object<string, any>} params - The parameters to be converted to a FormData object.
   * @param {Object<string, any>} options - The options object passed to the Axios constructor.
   *
   * @returns {void}
   */
  function AxiosURLSearchParams(params, options) {
    this._pairs = [];

    params && toFormData$1(params, this, options);
  }

  const prototype = AxiosURLSearchParams.prototype;

  prototype.append = function append(name, value) {
    this._pairs.push([name, value]);
  };

  prototype.toString = function toString(encoder) {
    const _encode = encoder ? function(value) {
      return encoder.call(this, value, encode$1);
    } : encode$1;

    return this._pairs.map(function each(pair) {
      return _encode(pair[0]) + '=' + _encode(pair[1]);
    }, '').join('&');
  };

  /**
   * It replaces all instances of the characters `:`, `$`, `,`, `+`, `[`, and `]` with their
   * URI encoded counterparts
   *
   * @param {string} val The value to be encoded.
   *
   * @returns {string} The encoded value.
   */
  function encode(val) {
    return encodeURIComponent(val).
      replace(/%3A/gi, ':').
      replace(/%24/g, '$').
      replace(/%2C/gi, ',').
      replace(/%20/g, '+').
      replace(/%5B/gi, '[').
      replace(/%5D/gi, ']');
  }

  /**
   * Build a URL by appending params to the end
   *
   * @param {string} url The base of the url (e.g., http://www.google.com)
   * @param {object} [params] The params to be appended
   * @param {?(object|Function)} options
   *
   * @returns {string} The formatted url
   */
  function buildURL(url, params, options) {
    /*eslint no-param-reassign:0*/
    if (!params) {
      return url;
    }
    
    const _encode = options && options.encode || encode;

    if (utils$2.isFunction(options)) {
      options = {
        serialize: options
      };
    } 

    const serializeFn = options && options.serialize;

    let serializedParams;

    if (serializeFn) {
      serializedParams = serializeFn(params, options);
    } else {
      serializedParams = utils$2.isURLSearchParams(params) ?
        params.toString() :
        new AxiosURLSearchParams(params, options).toString(_encode);
    }

    if (serializedParams) {
      const hashmarkIndex = url.indexOf("#");

      if (hashmarkIndex !== -1) {
        url = url.slice(0, hashmarkIndex);
      }
      url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
    }

    return url;
  }

  class InterceptorManager {
    constructor() {
      this.handlers = [];
    }

    /**
     * Add a new interceptor to the stack
     *
     * @param {Function} fulfilled The function to handle `then` for a `Promise`
     * @param {Function} rejected The function to handle `reject` for a `Promise`
     *
     * @return {Number} An ID used to remove interceptor later
     */
    use(fulfilled, rejected, options) {
      this.handlers.push({
        fulfilled,
        rejected,
        synchronous: options ? options.synchronous : false,
        runWhen: options ? options.runWhen : null
      });
      return this.handlers.length - 1;
    }

    /**
     * Remove an interceptor from the stack
     *
     * @param {Number} id The ID that was returned by `use`
     *
     * @returns {Boolean} `true` if the interceptor was removed, `false` otherwise
     */
    eject(id) {
      if (this.handlers[id]) {
        this.handlers[id] = null;
      }
    }

    /**
     * Clear all interceptors from the stack
     *
     * @returns {void}
     */
    clear() {
      if (this.handlers) {
        this.handlers = [];
      }
    }

    /**
     * Iterate over all the registered interceptors
     *
     * This method is particularly useful for skipping over any
     * interceptors that may have become `null` calling `eject`.
     *
     * @param {Function} fn The function to call for each interceptor
     *
     * @returns {void}
     */
    forEach(fn) {
      utils$2.forEach(this.handlers, function forEachHandler(h) {
        if (h !== null) {
          fn(h);
        }
      });
    }
  }

  var transitionalDefaults = {
    silentJSONParsing: true,
    forcedJSONParsing: true,
    clarifyTimeoutError: false
  };

  var URLSearchParams$1 = typeof URLSearchParams !== 'undefined' ? URLSearchParams : AxiosURLSearchParams;

  var FormData$1 = typeof FormData !== 'undefined' ? FormData : null;

  var Blob$1 = typeof Blob !== 'undefined' ? Blob : null;

  var platform$1 = {
    isBrowser: true,
    classes: {
      URLSearchParams: URLSearchParams$1,
      FormData: FormData$1,
      Blob: Blob$1
    },
    protocols: ['http', 'https', 'file', 'blob', 'url', 'data']
  };

  const hasBrowserEnv = typeof window !== 'undefined' && typeof document !== 'undefined';

  const _navigator = typeof navigator === 'object' && navigator || undefined;

  /**
   * Determine if we're running in a standard browser environment
   *
   * This allows axios to run in a web worker, and react-native.
   * Both environments support XMLHttpRequest, but not fully standard globals.
   *
   * web workers:
   *  typeof window -> undefined
   *  typeof document -> undefined
   *
   * react-native:
   *  navigator.product -> 'ReactNative'
   * nativescript
   *  navigator.product -> 'NativeScript' or 'NS'
   *
   * @returns {boolean}
   */
  const hasStandardBrowserEnv = hasBrowserEnv &&
    (!_navigator || ['ReactNative', 'NativeScript', 'NS'].indexOf(_navigator.product) < 0);

  /**
   * Determine if we're running in a standard browser webWorker environment
   *
   * Although the `isStandardBrowserEnv` method indicates that
   * `allows axios to run in a web worker`, the WebWorker will still be
   * filtered out due to its judgment standard
   * `typeof window !== 'undefined' && typeof document !== 'undefined'`.
   * This leads to a problem when axios post `FormData` in webWorker
   */
  const hasStandardBrowserWebWorkerEnv = (() => {
    return (
      typeof WorkerGlobalScope !== 'undefined' &&
      // eslint-disable-next-line no-undef
      self instanceof WorkerGlobalScope &&
      typeof self.importScripts === 'function'
    );
  })();

  const origin = hasBrowserEnv && window.location.href || 'http://localhost';

  var utils$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    hasBrowserEnv: hasBrowserEnv,
    hasStandardBrowserEnv: hasStandardBrowserEnv,
    hasStandardBrowserWebWorkerEnv: hasStandardBrowserWebWorkerEnv,
    navigator: _navigator,
    origin: origin
  });

  var platform = {
    ...utils$1,
    ...platform$1
  };

  function toURLEncodedForm(data, options) {
    return toFormData$1(data, new platform.classes.URLSearchParams(), Object.assign({
      visitor: function(value, key, path, helpers) {
        if (platform.isNode && utils$2.isBuffer(value)) {
          this.append(key, value.toString('base64'));
          return false;
        }

        return helpers.defaultVisitor.apply(this, arguments);
      }
    }, options));
  }

  /**
   * It takes a string like `foo[x][y][z]` and returns an array like `['foo', 'x', 'y', 'z']
   *
   * @param {string} name - The name of the property to get.
   *
   * @returns An array of strings.
   */
  function parsePropPath(name) {
    // foo[x][y][z]
    // foo.x.y.z
    // foo-x-y-z
    // foo x y z
    return utils$2.matchAll(/\w+|\[(\w*)]/g, name).map(match => {
      return match[0] === '[]' ? '' : match[1] || match[0];
    });
  }

  /**
   * Convert an array to an object.
   *
   * @param {Array<any>} arr - The array to convert to an object.
   *
   * @returns An object with the same keys and values as the array.
   */
  function arrayToObject(arr) {
    const obj = {};
    const keys = Object.keys(arr);
    let i;
    const len = keys.length;
    let key;
    for (i = 0; i < len; i++) {
      key = keys[i];
      obj[key] = arr[key];
    }
    return obj;
  }

  /**
   * It takes a FormData object and returns a JavaScript object
   *
   * @param {string} formData The FormData object to convert to JSON.
   *
   * @returns {Object<string, any> | null} The converted object.
   */
  function formDataToJSON(formData) {
    function buildPath(path, value, target, index) {
      let name = path[index++];

      if (name === '__proto__') return true;

      const isNumericKey = Number.isFinite(+name);
      const isLast = index >= path.length;
      name = !name && utils$2.isArray(target) ? target.length : name;

      if (isLast) {
        if (utils$2.hasOwnProp(target, name)) {
          target[name] = [target[name], value];
        } else {
          target[name] = value;
        }

        return !isNumericKey;
      }

      if (!target[name] || !utils$2.isObject(target[name])) {
        target[name] = [];
      }

      const result = buildPath(path, value, target[name], index);

      if (result && utils$2.isArray(target[name])) {
        target[name] = arrayToObject(target[name]);
      }

      return !isNumericKey;
    }

    if (utils$2.isFormData(formData) && utils$2.isFunction(formData.entries)) {
      const obj = {};

      utils$2.forEachEntry(formData, (name, value) => {
        buildPath(parsePropPath(name), value, obj, 0);
      });

      return obj;
    }

    return null;
  }

  /**
   * It takes a string, tries to parse it, and if it fails, it returns the stringified version
   * of the input
   *
   * @param {any} rawValue - The value to be stringified.
   * @param {Function} parser - A function that parses a string into a JavaScript object.
   * @param {Function} encoder - A function that takes a value and returns a string.
   *
   * @returns {string} A stringified version of the rawValue.
   */
  function stringifySafely(rawValue, parser, encoder) {
    if (utils$2.isString(rawValue)) {
      try {
        (parser || JSON.parse)(rawValue);
        return utils$2.trim(rawValue);
      } catch (e) {
        if (e.name !== 'SyntaxError') {
          throw e;
        }
      }
    }

    return (encoder || JSON.stringify)(rawValue);
  }

  const defaults = {

    transitional: transitionalDefaults,

    adapter: ['xhr', 'http', 'fetch'],

    transformRequest: [function transformRequest(data, headers) {
      const contentType = headers.getContentType() || '';
      const hasJSONContentType = contentType.indexOf('application/json') > -1;
      const isObjectPayload = utils$2.isObject(data);

      if (isObjectPayload && utils$2.isHTMLForm(data)) {
        data = new FormData(data);
      }

      const isFormData = utils$2.isFormData(data);

      if (isFormData) {
        return hasJSONContentType ? JSON.stringify(formDataToJSON(data)) : data;
      }

      if (utils$2.isArrayBuffer(data) ||
        utils$2.isBuffer(data) ||
        utils$2.isStream(data) ||
        utils$2.isFile(data) ||
        utils$2.isBlob(data) ||
        utils$2.isReadableStream(data)
      ) {
        return data;
      }
      if (utils$2.isArrayBufferView(data)) {
        return data.buffer;
      }
      if (utils$2.isURLSearchParams(data)) {
        headers.setContentType('application/x-www-form-urlencoded;charset=utf-8', false);
        return data.toString();
      }

      let isFileList;

      if (isObjectPayload) {
        if (contentType.indexOf('application/x-www-form-urlencoded') > -1) {
          return toURLEncodedForm(data, this.formSerializer).toString();
        }

        if ((isFileList = utils$2.isFileList(data)) || contentType.indexOf('multipart/form-data') > -1) {
          const _FormData = this.env && this.env.FormData;

          return toFormData$1(
            isFileList ? {'files[]': data} : data,
            _FormData && new _FormData(),
            this.formSerializer
          );
        }
      }

      if (isObjectPayload || hasJSONContentType ) {
        headers.setContentType('application/json', false);
        return stringifySafely(data);
      }

      return data;
    }],

    transformResponse: [function transformResponse(data) {
      const transitional = this.transitional || defaults.transitional;
      const forcedJSONParsing = transitional && transitional.forcedJSONParsing;
      const JSONRequested = this.responseType === 'json';

      if (utils$2.isResponse(data) || utils$2.isReadableStream(data)) {
        return data;
      }

      if (data && utils$2.isString(data) && ((forcedJSONParsing && !this.responseType) || JSONRequested)) {
        const silentJSONParsing = transitional && transitional.silentJSONParsing;
        const strictJSONParsing = !silentJSONParsing && JSONRequested;

        try {
          return JSON.parse(data);
        } catch (e) {
          if (strictJSONParsing) {
            if (e.name === 'SyntaxError') {
              throw AxiosError$1.from(e, AxiosError$1.ERR_BAD_RESPONSE, this, null, this.response);
            }
            throw e;
          }
        }
      }

      return data;
    }],

    /**
     * A timeout in milliseconds to abort a request. If set to 0 (default) a
     * timeout is not created.
     */
    timeout: 0,

    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',

    maxContentLength: -1,
    maxBodyLength: -1,

    env: {
      FormData: platform.classes.FormData,
      Blob: platform.classes.Blob
    },

    validateStatus: function validateStatus(status) {
      return status >= 200 && status < 300;
    },

    headers: {
      common: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': undefined
      }
    }
  };

  utils$2.forEach(['delete', 'get', 'head', 'post', 'put', 'patch'], (method) => {
    defaults.headers[method] = {};
  });

  // RawAxiosHeaders whose duplicates are ignored by node
  // c.f. https://nodejs.org/api/http.html#http_message_headers
  const ignoreDuplicateOf = utils$2.toObjectSet([
    'age', 'authorization', 'content-length', 'content-type', 'etag',
    'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
    'last-modified', 'location', 'max-forwards', 'proxy-authorization',
    'referer', 'retry-after', 'user-agent'
  ]);

  /**
   * Parse headers into an object
   *
   * ```
   * Date: Wed, 27 Aug 2014 08:58:49 GMT
   * Content-Type: application/json
   * Connection: keep-alive
   * Transfer-Encoding: chunked
   * ```
   *
   * @param {String} rawHeaders Headers needing to be parsed
   *
   * @returns {Object} Headers parsed into an object
   */
  var parseHeaders = rawHeaders => {
    const parsed = {};
    let key;
    let val;
    let i;

    rawHeaders && rawHeaders.split('\n').forEach(function parser(line) {
      i = line.indexOf(':');
      key = line.substring(0, i).trim().toLowerCase();
      val = line.substring(i + 1).trim();

      if (!key || (parsed[key] && ignoreDuplicateOf[key])) {
        return;
      }

      if (key === 'set-cookie') {
        if (parsed[key]) {
          parsed[key].push(val);
        } else {
          parsed[key] = [val];
        }
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    });

    return parsed;
  };

  const $internals = Symbol('internals');

  function normalizeHeader(header) {
    return header && String(header).trim().toLowerCase();
  }

  function normalizeValue(value) {
    if (value === false || value == null) {
      return value;
    }

    return utils$2.isArray(value) ? value.map(normalizeValue) : String(value);
  }

  function parseTokens(str) {
    const tokens = Object.create(null);
    const tokensRE = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
    let match;

    while ((match = tokensRE.exec(str))) {
      tokens[match[1]] = match[2];
    }

    return tokens;
  }

  const isValidHeaderName = (str) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(str.trim());

  function matchHeaderValue(context, value, header, filter, isHeaderNameFilter) {
    if (utils$2.isFunction(filter)) {
      return filter.call(this, value, header);
    }

    if (isHeaderNameFilter) {
      value = header;
    }

    if (!utils$2.isString(value)) return;

    if (utils$2.isString(filter)) {
      return value.indexOf(filter) !== -1;
    }

    if (utils$2.isRegExp(filter)) {
      return filter.test(value);
    }
  }

  function formatHeader(header) {
    return header.trim()
      .toLowerCase().replace(/([a-z\d])(\w*)/g, (w, char, str) => {
        return char.toUpperCase() + str;
      });
  }

  function buildAccessors(obj, header) {
    const accessorName = utils$2.toCamelCase(' ' + header);

    ['get', 'set', 'has'].forEach(methodName => {
      Object.defineProperty(obj, methodName + accessorName, {
        value: function(arg1, arg2, arg3) {
          return this[methodName].call(this, header, arg1, arg2, arg3);
        },
        configurable: true
      });
    });
  }

  let AxiosHeaders$1 = class AxiosHeaders {
    constructor(headers) {
      headers && this.set(headers);
    }

    set(header, valueOrRewrite, rewrite) {
      const self = this;

      function setHeader(_value, _header, _rewrite) {
        const lHeader = normalizeHeader(_header);

        if (!lHeader) {
          throw new Error('header name must be a non-empty string');
        }

        const key = utils$2.findKey(self, lHeader);

        if(!key || self[key] === undefined || _rewrite === true || (_rewrite === undefined && self[key] !== false)) {
          self[key || _header] = normalizeValue(_value);
        }
      }

      const setHeaders = (headers, _rewrite) =>
        utils$2.forEach(headers, (_value, _header) => setHeader(_value, _header, _rewrite));

      if (utils$2.isPlainObject(header) || header instanceof this.constructor) {
        setHeaders(header, valueOrRewrite);
      } else if(utils$2.isString(header) && (header = header.trim()) && !isValidHeaderName(header)) {
        setHeaders(parseHeaders(header), valueOrRewrite);
      } else if (utils$2.isHeaders(header)) {
        for (const [key, value] of header.entries()) {
          setHeader(value, key, rewrite);
        }
      } else {
        header != null && setHeader(valueOrRewrite, header, rewrite);
      }

      return this;
    }

    get(header, parser) {
      header = normalizeHeader(header);

      if (header) {
        const key = utils$2.findKey(this, header);

        if (key) {
          const value = this[key];

          if (!parser) {
            return value;
          }

          if (parser === true) {
            return parseTokens(value);
          }

          if (utils$2.isFunction(parser)) {
            return parser.call(this, value, key);
          }

          if (utils$2.isRegExp(parser)) {
            return parser.exec(value);
          }

          throw new TypeError('parser must be boolean|regexp|function');
        }
      }
    }

    has(header, matcher) {
      header = normalizeHeader(header);

      if (header) {
        const key = utils$2.findKey(this, header);

        return !!(key && this[key] !== undefined && (!matcher || matchHeaderValue(this, this[key], key, matcher)));
      }

      return false;
    }

    delete(header, matcher) {
      const self = this;
      let deleted = false;

      function deleteHeader(_header) {
        _header = normalizeHeader(_header);

        if (_header) {
          const key = utils$2.findKey(self, _header);

          if (key && (!matcher || matchHeaderValue(self, self[key], key, matcher))) {
            delete self[key];

            deleted = true;
          }
        }
      }

      if (utils$2.isArray(header)) {
        header.forEach(deleteHeader);
      } else {
        deleteHeader(header);
      }

      return deleted;
    }

    clear(matcher) {
      const keys = Object.keys(this);
      let i = keys.length;
      let deleted = false;

      while (i--) {
        const key = keys[i];
        if(!matcher || matchHeaderValue(this, this[key], key, matcher, true)) {
          delete this[key];
          deleted = true;
        }
      }

      return deleted;
    }

    normalize(format) {
      const self = this;
      const headers = {};

      utils$2.forEach(this, (value, header) => {
        const key = utils$2.findKey(headers, header);

        if (key) {
          self[key] = normalizeValue(value);
          delete self[header];
          return;
        }

        const normalized = format ? formatHeader(header) : String(header).trim();

        if (normalized !== header) {
          delete self[header];
        }

        self[normalized] = normalizeValue(value);

        headers[normalized] = true;
      });

      return this;
    }

    concat(...targets) {
      return this.constructor.concat(this, ...targets);
    }

    toJSON(asStrings) {
      const obj = Object.create(null);

      utils$2.forEach(this, (value, header) => {
        value != null && value !== false && (obj[header] = asStrings && utils$2.isArray(value) ? value.join(', ') : value);
      });

      return obj;
    }

    [Symbol.iterator]() {
      return Object.entries(this.toJSON())[Symbol.iterator]();
    }

    toString() {
      return Object.entries(this.toJSON()).map(([header, value]) => header + ': ' + value).join('\n');
    }

    get [Symbol.toStringTag]() {
      return 'AxiosHeaders';
    }

    static from(thing) {
      return thing instanceof this ? thing : new this(thing);
    }

    static concat(first, ...targets) {
      const computed = new this(first);

      targets.forEach((target) => computed.set(target));

      return computed;
    }

    static accessor(header) {
      const internals = this[$internals] = (this[$internals] = {
        accessors: {}
      });

      const accessors = internals.accessors;
      const prototype = this.prototype;

      function defineAccessor(_header) {
        const lHeader = normalizeHeader(_header);

        if (!accessors[lHeader]) {
          buildAccessors(prototype, _header);
          accessors[lHeader] = true;
        }
      }

      utils$2.isArray(header) ? header.forEach(defineAccessor) : defineAccessor(header);

      return this;
    }
  };

  AxiosHeaders$1.accessor(['Content-Type', 'Content-Length', 'Accept', 'Accept-Encoding', 'User-Agent', 'Authorization']);

  // reserved names hotfix
  utils$2.reduceDescriptors(AxiosHeaders$1.prototype, ({value}, key) => {
    let mapped = key[0].toUpperCase() + key.slice(1); // map `set` => `Set`
    return {
      get: () => value,
      set(headerValue) {
        this[mapped] = headerValue;
      }
    }
  });

  utils$2.freezeMethods(AxiosHeaders$1);

  /**
   * Transform the data for a request or a response
   *
   * @param {Array|Function} fns A single function or Array of functions
   * @param {?Object} response The response object
   *
   * @returns {*} The resulting transformed data
   */
  function transformData(fns, response) {
    const config = this || defaults;
    const context = response || config;
    const headers = AxiosHeaders$1.from(context.headers);
    let data = context.data;

    utils$2.forEach(fns, function transform(fn) {
      data = fn.call(config, data, headers.normalize(), response ? response.status : undefined);
    });

    headers.normalize();

    return data;
  }

  function isCancel$1(value) {
    return !!(value && value.__CANCEL__);
  }

  /**
   * A `CanceledError` is an object that is thrown when an operation is canceled.
   *
   * @param {string=} message The message.
   * @param {Object=} config The config.
   * @param {Object=} request The request.
   *
   * @returns {CanceledError} The created error.
   */
  function CanceledError$1(message, config, request) {
    // eslint-disable-next-line no-eq-null,eqeqeq
    AxiosError$1.call(this, message == null ? 'canceled' : message, AxiosError$1.ERR_CANCELED, config, request);
    this.name = 'CanceledError';
  }

  utils$2.inherits(CanceledError$1, AxiosError$1, {
    __CANCEL__: true
  });

  /**
   * Resolve or reject a Promise based on response status.
   *
   * @param {Function} resolve A function that resolves the promise.
   * @param {Function} reject A function that rejects the promise.
   * @param {object} response The response.
   *
   * @returns {object} The response.
   */
  function settle(resolve, reject, response) {
    const validateStatus = response.config.validateStatus;
    if (!response.status || !validateStatus || validateStatus(response.status)) {
      resolve(response);
    } else {
      reject(new AxiosError$1(
        'Request failed with status code ' + response.status,
        [AxiosError$1.ERR_BAD_REQUEST, AxiosError$1.ERR_BAD_RESPONSE][Math.floor(response.status / 100) - 4],
        response.config,
        response.request,
        response
      ));
    }
  }

  function parseProtocol(url) {
    const match = /^([-+\w]{1,25})(:?\/\/|:)/.exec(url);
    return match && match[1] || '';
  }

  /**
   * Calculate data maxRate
   * @param {Number} [samplesCount= 10]
   * @param {Number} [min= 1000]
   * @returns {Function}
   */
  function speedometer(samplesCount, min) {
    samplesCount = samplesCount || 10;
    const bytes = new Array(samplesCount);
    const timestamps = new Array(samplesCount);
    let head = 0;
    let tail = 0;
    let firstSampleTS;

    min = min !== undefined ? min : 1000;

    return function push(chunkLength) {
      const now = Date.now();

      const startedAt = timestamps[tail];

      if (!firstSampleTS) {
        firstSampleTS = now;
      }

      bytes[head] = chunkLength;
      timestamps[head] = now;

      let i = tail;
      let bytesCount = 0;

      while (i !== head) {
        bytesCount += bytes[i++];
        i = i % samplesCount;
      }

      head = (head + 1) % samplesCount;

      if (head === tail) {
        tail = (tail + 1) % samplesCount;
      }

      if (now - firstSampleTS < min) {
        return;
      }

      const passed = startedAt && now - startedAt;

      return passed ? Math.round(bytesCount * 1000 / passed) : undefined;
    };
  }

  /**
   * Throttle decorator
   * @param {Function} fn
   * @param {Number} freq
   * @return {Function}
   */
  function throttle(fn, freq) {
    let timestamp = 0;
    let threshold = 1000 / freq;
    let lastArgs;
    let timer;

    const invoke = (args, now = Date.now()) => {
      timestamp = now;
      lastArgs = null;
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      fn.apply(null, args);
    };

    const throttled = (...args) => {
      const now = Date.now();
      const passed = now - timestamp;
      if ( passed >= threshold) {
        invoke(args, now);
      } else {
        lastArgs = args;
        if (!timer) {
          timer = setTimeout(() => {
            timer = null;
            invoke(lastArgs);
          }, threshold - passed);
        }
      }
    };

    const flush = () => lastArgs && invoke(lastArgs);

    return [throttled, flush];
  }

  const progressEventReducer = (listener, isDownloadStream, freq = 3) => {
    let bytesNotified = 0;
    const _speedometer = speedometer(50, 250);

    return throttle(e => {
      const loaded = e.loaded;
      const total = e.lengthComputable ? e.total : undefined;
      const progressBytes = loaded - bytesNotified;
      const rate = _speedometer(progressBytes);
      const inRange = loaded <= total;

      bytesNotified = loaded;

      const data = {
        loaded,
        total,
        progress: total ? (loaded / total) : undefined,
        bytes: progressBytes,
        rate: rate ? rate : undefined,
        estimated: rate && total && inRange ? (total - loaded) / rate : undefined,
        event: e,
        lengthComputable: total != null,
        [isDownloadStream ? 'download' : 'upload']: true
      };

      listener(data);
    }, freq);
  };

  const progressEventDecorator = (total, throttled) => {
    const lengthComputable = total != null;

    return [(loaded) => throttled[0]({
      lengthComputable,
      total,
      loaded
    }), throttled[1]];
  };

  const asyncDecorator = (fn) => (...args) => utils$2.asap(() => fn(...args));

  var isURLSameOrigin = platform.hasStandardBrowserEnv ? ((origin, isMSIE) => (url) => {
    url = new URL(url, platform.origin);

    return (
      origin.protocol === url.protocol &&
      origin.host === url.host &&
      (isMSIE || origin.port === url.port)
    );
  })(
    new URL(platform.origin),
    platform.navigator && /(msie|trident)/i.test(platform.navigator.userAgent)
  ) : () => true;

  var cookies = platform.hasStandardBrowserEnv ?

    // Standard browser envs support document.cookie
    {
      write(name, value, expires, path, domain, secure) {
        const cookie = [name + '=' + encodeURIComponent(value)];

        utils$2.isNumber(expires) && cookie.push('expires=' + new Date(expires).toGMTString());

        utils$2.isString(path) && cookie.push('path=' + path);

        utils$2.isString(domain) && cookie.push('domain=' + domain);

        secure === true && cookie.push('secure');

        document.cookie = cookie.join('; ');
      },

      read(name) {
        const match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
        return (match ? decodeURIComponent(match[3]) : null);
      },

      remove(name) {
        this.write(name, '', Date.now() - 86400000);
      }
    }

    :

    // Non-standard browser env (web workers, react-native) lack needed support.
    {
      write() {},
      read() {
        return null;
      },
      remove() {}
    };

  /**
   * Determines whether the specified URL is absolute
   *
   * @param {string} url The URL to test
   *
   * @returns {boolean} True if the specified URL is absolute, otherwise false
   */
  function isAbsoluteURL(url) {
    // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
    // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
    // by any combination of letters, digits, plus, period, or hyphen.
    return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
  }

  /**
   * Creates a new URL by combining the specified URLs
   *
   * @param {string} baseURL The base URL
   * @param {string} relativeURL The relative URL
   *
   * @returns {string} The combined URL
   */
  function combineURLs(baseURL, relativeURL) {
    return relativeURL
      ? baseURL.replace(/\/?\/$/, '') + '/' + relativeURL.replace(/^\/+/, '')
      : baseURL;
  }

  /**
   * Creates a new URL by combining the baseURL with the requestedURL,
   * only when the requestedURL is not already an absolute URL.
   * If the requestURL is absolute, this function returns the requestedURL untouched.
   *
   * @param {string} baseURL The base URL
   * @param {string} requestedURL Absolute or relative URL to combine
   *
   * @returns {string} The combined full path
   */
  function buildFullPath(baseURL, requestedURL) {
    if (baseURL && !isAbsoluteURL(requestedURL)) {
      return combineURLs(baseURL, requestedURL);
    }
    return requestedURL;
  }

  const headersToObject = (thing) => thing instanceof AxiosHeaders$1 ? { ...thing } : thing;

  /**
   * Config-specific merge-function which creates a new config-object
   * by merging two configuration objects together.
   *
   * @param {Object} config1
   * @param {Object} config2
   *
   * @returns {Object} New object resulting from merging config2 to config1
   */
  function mergeConfig$1(config1, config2) {
    // eslint-disable-next-line no-param-reassign
    config2 = config2 || {};
    const config = {};

    function getMergedValue(target, source, prop, caseless) {
      if (utils$2.isPlainObject(target) && utils$2.isPlainObject(source)) {
        return utils$2.merge.call({caseless}, target, source);
      } else if (utils$2.isPlainObject(source)) {
        return utils$2.merge({}, source);
      } else if (utils$2.isArray(source)) {
        return source.slice();
      }
      return source;
    }

    // eslint-disable-next-line consistent-return
    function mergeDeepProperties(a, b, prop , caseless) {
      if (!utils$2.isUndefined(b)) {
        return getMergedValue(a, b, prop , caseless);
      } else if (!utils$2.isUndefined(a)) {
        return getMergedValue(undefined, a, prop , caseless);
      }
    }

    // eslint-disable-next-line consistent-return
    function valueFromConfig2(a, b) {
      if (!utils$2.isUndefined(b)) {
        return getMergedValue(undefined, b);
      }
    }

    // eslint-disable-next-line consistent-return
    function defaultToConfig2(a, b) {
      if (!utils$2.isUndefined(b)) {
        return getMergedValue(undefined, b);
      } else if (!utils$2.isUndefined(a)) {
        return getMergedValue(undefined, a);
      }
    }

    // eslint-disable-next-line consistent-return
    function mergeDirectKeys(a, b, prop) {
      if (prop in config2) {
        return getMergedValue(a, b);
      } else if (prop in config1) {
        return getMergedValue(undefined, a);
      }
    }

    const mergeMap = {
      url: valueFromConfig2,
      method: valueFromConfig2,
      data: valueFromConfig2,
      baseURL: defaultToConfig2,
      transformRequest: defaultToConfig2,
      transformResponse: defaultToConfig2,
      paramsSerializer: defaultToConfig2,
      timeout: defaultToConfig2,
      timeoutMessage: defaultToConfig2,
      withCredentials: defaultToConfig2,
      withXSRFToken: defaultToConfig2,
      adapter: defaultToConfig2,
      responseType: defaultToConfig2,
      xsrfCookieName: defaultToConfig2,
      xsrfHeaderName: defaultToConfig2,
      onUploadProgress: defaultToConfig2,
      onDownloadProgress: defaultToConfig2,
      decompress: defaultToConfig2,
      maxContentLength: defaultToConfig2,
      maxBodyLength: defaultToConfig2,
      beforeRedirect: defaultToConfig2,
      transport: defaultToConfig2,
      httpAgent: defaultToConfig2,
      httpsAgent: defaultToConfig2,
      cancelToken: defaultToConfig2,
      socketPath: defaultToConfig2,
      responseEncoding: defaultToConfig2,
      validateStatus: mergeDirectKeys,
      headers: (a, b , prop) => mergeDeepProperties(headersToObject(a), headersToObject(b),prop, true)
    };

    utils$2.forEach(Object.keys(Object.assign({}, config1, config2)), function computeConfigValue(prop) {
      const merge = mergeMap[prop] || mergeDeepProperties;
      const configValue = merge(config1[prop], config2[prop], prop);
      (utils$2.isUndefined(configValue) && merge !== mergeDirectKeys) || (config[prop] = configValue);
    });

    return config;
  }

  var resolveConfig = (config) => {
    const newConfig = mergeConfig$1({}, config);

    let {data, withXSRFToken, xsrfHeaderName, xsrfCookieName, headers, auth} = newConfig;

    newConfig.headers = headers = AxiosHeaders$1.from(headers);

    newConfig.url = buildURL(buildFullPath(newConfig.baseURL, newConfig.url), config.params, config.paramsSerializer);

    // HTTP basic authentication
    if (auth) {
      headers.set('Authorization', 'Basic ' +
        btoa((auth.username || '') + ':' + (auth.password ? unescape(encodeURIComponent(auth.password)) : ''))
      );
    }

    let contentType;

    if (utils$2.isFormData(data)) {
      if (platform.hasStandardBrowserEnv || platform.hasStandardBrowserWebWorkerEnv) {
        headers.setContentType(undefined); // Let the browser set it
      } else if ((contentType = headers.getContentType()) !== false) {
        // fix semicolon duplication issue for ReactNative FormData implementation
        const [type, ...tokens] = contentType ? contentType.split(';').map(token => token.trim()).filter(Boolean) : [];
        headers.setContentType([type || 'multipart/form-data', ...tokens].join('; '));
      }
    }

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.

    if (platform.hasStandardBrowserEnv) {
      withXSRFToken && utils$2.isFunction(withXSRFToken) && (withXSRFToken = withXSRFToken(newConfig));

      if (withXSRFToken || (withXSRFToken !== false && isURLSameOrigin(newConfig.url))) {
        // Add xsrf header
        const xsrfValue = xsrfHeaderName && xsrfCookieName && cookies.read(xsrfCookieName);

        if (xsrfValue) {
          headers.set(xsrfHeaderName, xsrfValue);
        }
      }
    }

    return newConfig;
  };

  const isXHRAdapterSupported = typeof XMLHttpRequest !== 'undefined';

  var xhrAdapter = isXHRAdapterSupported && function (config) {
    return new Promise(function dispatchXhrRequest(resolve, reject) {
      const _config = resolveConfig(config);
      let requestData = _config.data;
      const requestHeaders = AxiosHeaders$1.from(_config.headers).normalize();
      let {responseType, onUploadProgress, onDownloadProgress} = _config;
      let onCanceled;
      let uploadThrottled, downloadThrottled;
      let flushUpload, flushDownload;

      function done() {
        flushUpload && flushUpload(); // flush events
        flushDownload && flushDownload(); // flush events

        _config.cancelToken && _config.cancelToken.unsubscribe(onCanceled);

        _config.signal && _config.signal.removeEventListener('abort', onCanceled);
      }

      let request = new XMLHttpRequest();

      request.open(_config.method.toUpperCase(), _config.url, true);

      // Set the request timeout in MS
      request.timeout = _config.timeout;

      function onloadend() {
        if (!request) {
          return;
        }
        // Prepare the response
        const responseHeaders = AxiosHeaders$1.from(
          'getAllResponseHeaders' in request && request.getAllResponseHeaders()
        );
        const responseData = !responseType || responseType === 'text' || responseType === 'json' ?
          request.responseText : request.response;
        const response = {
          data: responseData,
          status: request.status,
          statusText: request.statusText,
          headers: responseHeaders,
          config,
          request
        };

        settle(function _resolve(value) {
          resolve(value);
          done();
        }, function _reject(err) {
          reject(err);
          done();
        }, response);

        // Clean up request
        request = null;
      }

      if ('onloadend' in request) {
        // Use onloadend if available
        request.onloadend = onloadend;
      } else {
        // Listen for ready state to emulate onloadend
        request.onreadystatechange = function handleLoad() {
          if (!request || request.readyState !== 4) {
            return;
          }

          // The request errored out and we didn't get a response, this will be
          // handled by onerror instead
          // With one exception: request that using file: protocol, most browsers
          // will return status as 0 even though it's a successful request
          if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
            return;
          }
          // readystate handler is calling before onerror or ontimeout handlers,
          // so we should call onloadend on the next 'tick'
          setTimeout(onloadend);
        };
      }

      // Handle browser request cancellation (as opposed to a manual cancellation)
      request.onabort = function handleAbort() {
        if (!request) {
          return;
        }

        reject(new AxiosError$1('Request aborted', AxiosError$1.ECONNABORTED, config, request));

        // Clean up request
        request = null;
      };

      // Handle low level network errors
      request.onerror = function handleError() {
        // Real errors are hidden from us by the browser
        // onerror should only fire if it's a network error
        reject(new AxiosError$1('Network Error', AxiosError$1.ERR_NETWORK, config, request));

        // Clean up request
        request = null;
      };

      // Handle timeout
      request.ontimeout = function handleTimeout() {
        let timeoutErrorMessage = _config.timeout ? 'timeout of ' + _config.timeout + 'ms exceeded' : 'timeout exceeded';
        const transitional = _config.transitional || transitionalDefaults;
        if (_config.timeoutErrorMessage) {
          timeoutErrorMessage = _config.timeoutErrorMessage;
        }
        reject(new AxiosError$1(
          timeoutErrorMessage,
          transitional.clarifyTimeoutError ? AxiosError$1.ETIMEDOUT : AxiosError$1.ECONNABORTED,
          config,
          request));

        // Clean up request
        request = null;
      };

      // Remove Content-Type if data is undefined
      requestData === undefined && requestHeaders.setContentType(null);

      // Add headers to the request
      if ('setRequestHeader' in request) {
        utils$2.forEach(requestHeaders.toJSON(), function setRequestHeader(val, key) {
          request.setRequestHeader(key, val);
        });
      }

      // Add withCredentials to request if needed
      if (!utils$2.isUndefined(_config.withCredentials)) {
        request.withCredentials = !!_config.withCredentials;
      }

      // Add responseType to request if needed
      if (responseType && responseType !== 'json') {
        request.responseType = _config.responseType;
      }

      // Handle progress if needed
      if (onDownloadProgress) {
        ([downloadThrottled, flushDownload] = progressEventReducer(onDownloadProgress, true));
        request.addEventListener('progress', downloadThrottled);
      }

      // Not all browsers support upload events
      if (onUploadProgress && request.upload) {
        ([uploadThrottled, flushUpload] = progressEventReducer(onUploadProgress));

        request.upload.addEventListener('progress', uploadThrottled);

        request.upload.addEventListener('loadend', flushUpload);
      }

      if (_config.cancelToken || _config.signal) {
        // Handle cancellation
        // eslint-disable-next-line func-names
        onCanceled = cancel => {
          if (!request) {
            return;
          }
          reject(!cancel || cancel.type ? new CanceledError$1(null, config, request) : cancel);
          request.abort();
          request = null;
        };

        _config.cancelToken && _config.cancelToken.subscribe(onCanceled);
        if (_config.signal) {
          _config.signal.aborted ? onCanceled() : _config.signal.addEventListener('abort', onCanceled);
        }
      }

      const protocol = parseProtocol(_config.url);

      if (protocol && platform.protocols.indexOf(protocol) === -1) {
        reject(new AxiosError$1('Unsupported protocol ' + protocol + ':', AxiosError$1.ERR_BAD_REQUEST, config));
        return;
      }


      // Send the request
      request.send(requestData || null);
    });
  };

  const composeSignals = (signals, timeout) => {
    const {length} = (signals = signals ? signals.filter(Boolean) : []);

    if (timeout || length) {
      let controller = new AbortController();

      let aborted;

      const onabort = function (reason) {
        if (!aborted) {
          aborted = true;
          unsubscribe();
          const err = reason instanceof Error ? reason : this.reason;
          controller.abort(err instanceof AxiosError$1 ? err : new CanceledError$1(err instanceof Error ? err.message : err));
        }
      };

      let timer = timeout && setTimeout(() => {
        timer = null;
        onabort(new AxiosError$1(`timeout ${timeout} of ms exceeded`, AxiosError$1.ETIMEDOUT));
      }, timeout);

      const unsubscribe = () => {
        if (signals) {
          timer && clearTimeout(timer);
          timer = null;
          signals.forEach(signal => {
            signal.unsubscribe ? signal.unsubscribe(onabort) : signal.removeEventListener('abort', onabort);
          });
          signals = null;
        }
      };

      signals.forEach((signal) => signal.addEventListener('abort', onabort));

      const {signal} = controller;

      signal.unsubscribe = () => utils$2.asap(unsubscribe);

      return signal;
    }
  };

  const streamChunk = function* (chunk, chunkSize) {
    let len = chunk.byteLength;

    if (len < chunkSize) {
      yield chunk;
      return;
    }

    let pos = 0;
    let end;

    while (pos < len) {
      end = pos + chunkSize;
      yield chunk.slice(pos, end);
      pos = end;
    }
  };

  const readBytes = async function* (iterable, chunkSize) {
    for await (const chunk of readStream(iterable)) {
      yield* streamChunk(chunk, chunkSize);
    }
  };

  const readStream = async function* (stream) {
    if (stream[Symbol.asyncIterator]) {
      yield* stream;
      return;
    }

    const reader = stream.getReader();
    try {
      for (;;) {
        const {done, value} = await reader.read();
        if (done) {
          break;
        }
        yield value;
      }
    } finally {
      await reader.cancel();
    }
  };

  const trackStream = (stream, chunkSize, onProgress, onFinish) => {
    const iterator = readBytes(stream, chunkSize);

    let bytes = 0;
    let done;
    let _onFinish = (e) => {
      if (!done) {
        done = true;
        onFinish && onFinish(e);
      }
    };

    return new ReadableStream({
      async pull(controller) {
        try {
          const {done, value} = await iterator.next();

          if (done) {
           _onFinish();
            controller.close();
            return;
          }

          let len = value.byteLength;
          if (onProgress) {
            let loadedBytes = bytes += len;
            onProgress(loadedBytes);
          }
          controller.enqueue(new Uint8Array(value));
        } catch (err) {
          _onFinish(err);
          throw err;
        }
      },
      cancel(reason) {
        _onFinish(reason);
        return iterator.return();
      }
    }, {
      highWaterMark: 2
    })
  };

  const isFetchSupported = typeof fetch === 'function' && typeof Request === 'function' && typeof Response === 'function';
  const isReadableStreamSupported = isFetchSupported && typeof ReadableStream === 'function';

  // used only inside the fetch adapter
  const encodeText = isFetchSupported && (typeof TextEncoder === 'function' ?
      ((encoder) => (str) => encoder.encode(str))(new TextEncoder()) :
      async (str) => new Uint8Array(await new Response(str).arrayBuffer())
  );

  const test = (fn, ...args) => {
    try {
      return !!fn(...args);
    } catch (e) {
      return false
    }
  };

  const supportsRequestStream = isReadableStreamSupported && test(() => {
    let duplexAccessed = false;

    const hasContentType = new Request(platform.origin, {
      body: new ReadableStream(),
      method: 'POST',
      get duplex() {
        duplexAccessed = true;
        return 'half';
      },
    }).headers.has('Content-Type');

    return duplexAccessed && !hasContentType;
  });

  const DEFAULT_CHUNK_SIZE = 64 * 1024;

  const supportsResponseStream = isReadableStreamSupported &&
    test(() => utils$2.isReadableStream(new Response('').body));


  const resolvers = {
    stream: supportsResponseStream && ((res) => res.body)
  };

  isFetchSupported && (((res) => {
    ['text', 'arrayBuffer', 'blob', 'formData', 'stream'].forEach(type => {
      !resolvers[type] && (resolvers[type] = utils$2.isFunction(res[type]) ? (res) => res[type]() :
        (_, config) => {
          throw new AxiosError$1(`Response type '${type}' is not supported`, AxiosError$1.ERR_NOT_SUPPORT, config);
        });
    });
  })(new Response));

  const getBodyLength = async (body) => {
    if (body == null) {
      return 0;
    }

    if(utils$2.isBlob(body)) {
      return body.size;
    }

    if(utils$2.isSpecCompliantForm(body)) {
      const _request = new Request(platform.origin, {
        method: 'POST',
        body,
      });
      return (await _request.arrayBuffer()).byteLength;
    }

    if(utils$2.isArrayBufferView(body) || utils$2.isArrayBuffer(body)) {
      return body.byteLength;
    }

    if(utils$2.isURLSearchParams(body)) {
      body = body + '';
    }

    if(utils$2.isString(body)) {
      return (await encodeText(body)).byteLength;
    }
  };

  const resolveBodyLength = async (headers, body) => {
    const length = utils$2.toFiniteNumber(headers.getContentLength());

    return length == null ? getBodyLength(body) : length;
  };

  var fetchAdapter = isFetchSupported && (async (config) => {
    let {
      url,
      method,
      data,
      signal,
      cancelToken,
      timeout,
      onDownloadProgress,
      onUploadProgress,
      responseType,
      headers,
      withCredentials = 'same-origin',
      fetchOptions
    } = resolveConfig(config);

    responseType = responseType ? (responseType + '').toLowerCase() : 'text';

    let composedSignal = composeSignals([signal, cancelToken && cancelToken.toAbortSignal()], timeout);

    let request;

    const unsubscribe = composedSignal && composedSignal.unsubscribe && (() => {
        composedSignal.unsubscribe();
    });

    let requestContentLength;

    try {
      if (
        onUploadProgress && supportsRequestStream && method !== 'get' && method !== 'head' &&
        (requestContentLength = await resolveBodyLength(headers, data)) !== 0
      ) {
        let _request = new Request(url, {
          method: 'POST',
          body: data,
          duplex: "half"
        });

        let contentTypeHeader;

        if (utils$2.isFormData(data) && (contentTypeHeader = _request.headers.get('content-type'))) {
          headers.setContentType(contentTypeHeader);
        }

        if (_request.body) {
          const [onProgress, flush] = progressEventDecorator(
            requestContentLength,
            progressEventReducer(asyncDecorator(onUploadProgress))
          );

          data = trackStream(_request.body, DEFAULT_CHUNK_SIZE, onProgress, flush);
        }
      }

      if (!utils$2.isString(withCredentials)) {
        withCredentials = withCredentials ? 'include' : 'omit';
      }

      // Cloudflare Workers throws when credentials are defined
      // see https://github.com/cloudflare/workerd/issues/902
      const isCredentialsSupported = "credentials" in Request.prototype;
      request = new Request(url, {
        ...fetchOptions,
        signal: composedSignal,
        method: method.toUpperCase(),
        headers: headers.normalize().toJSON(),
        body: data,
        duplex: "half",
        credentials: isCredentialsSupported ? withCredentials : undefined
      });

      let response = await fetch(request);

      const isStreamResponse = supportsResponseStream && (responseType === 'stream' || responseType === 'response');

      if (supportsResponseStream && (onDownloadProgress || (isStreamResponse && unsubscribe))) {
        const options = {};

        ['status', 'statusText', 'headers'].forEach(prop => {
          options[prop] = response[prop];
        });

        const responseContentLength = utils$2.toFiniteNumber(response.headers.get('content-length'));

        const [onProgress, flush] = onDownloadProgress && progressEventDecorator(
          responseContentLength,
          progressEventReducer(asyncDecorator(onDownloadProgress), true)
        ) || [];

        response = new Response(
          trackStream(response.body, DEFAULT_CHUNK_SIZE, onProgress, () => {
            flush && flush();
            unsubscribe && unsubscribe();
          }),
          options
        );
      }

      responseType = responseType || 'text';

      let responseData = await resolvers[utils$2.findKey(resolvers, responseType) || 'text'](response, config);

      !isStreamResponse && unsubscribe && unsubscribe();

      return await new Promise((resolve, reject) => {
        settle(resolve, reject, {
          data: responseData,
          headers: AxiosHeaders$1.from(response.headers),
          status: response.status,
          statusText: response.statusText,
          config,
          request
        });
      })
    } catch (err) {
      unsubscribe && unsubscribe();

      if (err && err.name === 'TypeError' && /fetch/i.test(err.message)) {
        throw Object.assign(
          new AxiosError$1('Network Error', AxiosError$1.ERR_NETWORK, config, request),
          {
            cause: err.cause || err
          }
        )
      }

      throw AxiosError$1.from(err, err && err.code, config, request);
    }
  });

  const knownAdapters = {
    http: httpAdapter,
    xhr: xhrAdapter,
    fetch: fetchAdapter
  };

  utils$2.forEach(knownAdapters, (fn, value) => {
    if (fn) {
      try {
        Object.defineProperty(fn, 'name', {value});
      } catch (e) {
        // eslint-disable-next-line no-empty
      }
      Object.defineProperty(fn, 'adapterName', {value});
    }
  });

  const renderReason = (reason) => `- ${reason}`;

  const isResolvedHandle = (adapter) => utils$2.isFunction(adapter) || adapter === null || adapter === false;

  var adapters = {
    getAdapter: (adapters) => {
      adapters = utils$2.isArray(adapters) ? adapters : [adapters];

      const {length} = adapters;
      let nameOrAdapter;
      let adapter;

      const rejectedReasons = {};

      for (let i = 0; i < length; i++) {
        nameOrAdapter = adapters[i];
        let id;

        adapter = nameOrAdapter;

        if (!isResolvedHandle(nameOrAdapter)) {
          adapter = knownAdapters[(id = String(nameOrAdapter)).toLowerCase()];

          if (adapter === undefined) {
            throw new AxiosError$1(`Unknown adapter '${id}'`);
          }
        }

        if (adapter) {
          break;
        }

        rejectedReasons[id || '#' + i] = adapter;
      }

      if (!adapter) {

        const reasons = Object.entries(rejectedReasons)
          .map(([id, state]) => `adapter ${id} ` +
            (state === false ? 'is not supported by the environment' : 'is not available in the build')
          );

        let s = length ?
          (reasons.length > 1 ? 'since :\n' + reasons.map(renderReason).join('\n') : ' ' + renderReason(reasons[0])) :
          'as no adapter specified';

        throw new AxiosError$1(
          `There is no suitable adapter to dispatch the request ` + s,
          'ERR_NOT_SUPPORT'
        );
      }

      return adapter;
    },
    adapters: knownAdapters
  };

  /**
   * Throws a `CanceledError` if cancellation has been requested.
   *
   * @param {Object} config The config that is to be used for the request
   *
   * @returns {void}
   */
  function throwIfCancellationRequested(config) {
    if (config.cancelToken) {
      config.cancelToken.throwIfRequested();
    }

    if (config.signal && config.signal.aborted) {
      throw new CanceledError$1(null, config);
    }
  }

  /**
   * Dispatch a request to the server using the configured adapter.
   *
   * @param {object} config The config that is to be used for the request
   *
   * @returns {Promise} The Promise to be fulfilled
   */
  function dispatchRequest(config) {
    throwIfCancellationRequested(config);

    config.headers = AxiosHeaders$1.from(config.headers);

    // Transform request data
    config.data = transformData.call(
      config,
      config.transformRequest
    );

    if (['post', 'put', 'patch'].indexOf(config.method) !== -1) {
      config.headers.setContentType('application/x-www-form-urlencoded', false);
    }

    const adapter = adapters.getAdapter(config.adapter || defaults.adapter);

    return adapter(config).then(function onAdapterResolution(response) {
      throwIfCancellationRequested(config);

      // Transform response data
      response.data = transformData.call(
        config,
        config.transformResponse,
        response
      );

      response.headers = AxiosHeaders$1.from(response.headers);

      return response;
    }, function onAdapterRejection(reason) {
      if (!isCancel$1(reason)) {
        throwIfCancellationRequested(config);

        // Transform response data
        if (reason && reason.response) {
          reason.response.data = transformData.call(
            config,
            config.transformResponse,
            reason.response
          );
          reason.response.headers = AxiosHeaders$1.from(reason.response.headers);
        }
      }

      return Promise.reject(reason);
    });
  }

  const VERSION$1 = "1.7.9";

  const validators$1 = {};

  // eslint-disable-next-line func-names
  ['object', 'boolean', 'number', 'function', 'string', 'symbol'].forEach((type, i) => {
    validators$1[type] = function validator(thing) {
      return typeof thing === type || 'a' + (i < 1 ? 'n ' : ' ') + type;
    };
  });

  const deprecatedWarnings = {};

  /**
   * Transitional option validator
   *
   * @param {function|boolean?} validator - set to false if the transitional option has been removed
   * @param {string?} version - deprecated version / removed since version
   * @param {string?} message - some message with additional info
   *
   * @returns {function}
   */
  validators$1.transitional = function transitional(validator, version, message) {
    function formatMessage(opt, desc) {
      return '[Axios v' + VERSION$1 + '] Transitional option \'' + opt + '\'' + desc + (message ? '. ' + message : '');
    }

    // eslint-disable-next-line func-names
    return (value, opt, opts) => {
      if (validator === false) {
        throw new AxiosError$1(
          formatMessage(opt, ' has been removed' + (version ? ' in ' + version : '')),
          AxiosError$1.ERR_DEPRECATED
        );
      }

      if (version && !deprecatedWarnings[opt]) {
        deprecatedWarnings[opt] = true;
        // eslint-disable-next-line no-console
        console.warn(
          formatMessage(
            opt,
            ' has been deprecated since v' + version + ' and will be removed in the near future'
          )
        );
      }

      return validator ? validator(value, opt, opts) : true;
    };
  };

  validators$1.spelling = function spelling(correctSpelling) {
    return (value, opt) => {
      // eslint-disable-next-line no-console
      console.warn(`${opt} is likely a misspelling of ${correctSpelling}`);
      return true;
    }
  };

  /**
   * Assert object's properties type
   *
   * @param {object} options
   * @param {object} schema
   * @param {boolean?} allowUnknown
   *
   * @returns {object}
   */

  function assertOptions(options, schema, allowUnknown) {
    if (typeof options !== 'object') {
      throw new AxiosError$1('options must be an object', AxiosError$1.ERR_BAD_OPTION_VALUE);
    }
    const keys = Object.keys(options);
    let i = keys.length;
    while (i-- > 0) {
      const opt = keys[i];
      const validator = schema[opt];
      if (validator) {
        const value = options[opt];
        const result = value === undefined || validator(value, opt, options);
        if (result !== true) {
          throw new AxiosError$1('option ' + opt + ' must be ' + result, AxiosError$1.ERR_BAD_OPTION_VALUE);
        }
        continue;
      }
      if (allowUnknown !== true) {
        throw new AxiosError$1('Unknown option ' + opt, AxiosError$1.ERR_BAD_OPTION);
      }
    }
  }

  var validator = {
    assertOptions,
    validators: validators$1
  };

  const validators = validator.validators;

  /**
   * Create a new instance of Axios
   *
   * @param {Object} instanceConfig The default config for the instance
   *
   * @return {Axios} A new instance of Axios
   */
  let Axios$1 = class Axios {
    constructor(instanceConfig) {
      this.defaults = instanceConfig;
      this.interceptors = {
        request: new InterceptorManager(),
        response: new InterceptorManager()
      };
    }

    /**
     * Dispatch a request
     *
     * @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
     * @param {?Object} config
     *
     * @returns {Promise} The Promise to be fulfilled
     */
    async request(configOrUrl, config) {
      try {
        return await this._request(configOrUrl, config);
      } catch (err) {
        if (err instanceof Error) {
          let dummy = {};

          Error.captureStackTrace ? Error.captureStackTrace(dummy) : (dummy = new Error());

          // slice off the Error: ... line
          const stack = dummy.stack ? dummy.stack.replace(/^.+\n/, '') : '';
          try {
            if (!err.stack) {
              err.stack = stack;
              // match without the 2 top stack lines
            } else if (stack && !String(err.stack).endsWith(stack.replace(/^.+\n.+\n/, ''))) {
              err.stack += '\n' + stack;
            }
          } catch (e) {
            // ignore the case where "stack" is an un-writable property
          }
        }

        throw err;
      }
    }

    _request(configOrUrl, config) {
      /*eslint no-param-reassign:0*/
      // Allow for axios('example/url'[, config]) a la fetch API
      if (typeof configOrUrl === 'string') {
        config = config || {};
        config.url = configOrUrl;
      } else {
        config = configOrUrl || {};
      }

      config = mergeConfig$1(this.defaults, config);

      const {transitional, paramsSerializer, headers} = config;

      if (transitional !== undefined) {
        validator.assertOptions(transitional, {
          silentJSONParsing: validators.transitional(validators.boolean),
          forcedJSONParsing: validators.transitional(validators.boolean),
          clarifyTimeoutError: validators.transitional(validators.boolean)
        }, false);
      }

      if (paramsSerializer != null) {
        if (utils$2.isFunction(paramsSerializer)) {
          config.paramsSerializer = {
            serialize: paramsSerializer
          };
        } else {
          validator.assertOptions(paramsSerializer, {
            encode: validators.function,
            serialize: validators.function
          }, true);
        }
      }

      validator.assertOptions(config, {
        baseUrl: validators.spelling('baseURL'),
        withXsrfToken: validators.spelling('withXSRFToken')
      }, true);

      // Set config.method
      config.method = (config.method || this.defaults.method || 'get').toLowerCase();

      // Flatten headers
      let contextHeaders = headers && utils$2.merge(
        headers.common,
        headers[config.method]
      );

      headers && utils$2.forEach(
        ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
        (method) => {
          delete headers[method];
        }
      );

      config.headers = AxiosHeaders$1.concat(contextHeaders, headers);

      // filter out skipped interceptors
      const requestInterceptorChain = [];
      let synchronousRequestInterceptors = true;
      this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
        if (typeof interceptor.runWhen === 'function' && interceptor.runWhen(config) === false) {
          return;
        }

        synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;

        requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
      });

      const responseInterceptorChain = [];
      this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
        responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
      });

      let promise;
      let i = 0;
      let len;

      if (!synchronousRequestInterceptors) {
        const chain = [dispatchRequest.bind(this), undefined];
        chain.unshift.apply(chain, requestInterceptorChain);
        chain.push.apply(chain, responseInterceptorChain);
        len = chain.length;

        promise = Promise.resolve(config);

        while (i < len) {
          promise = promise.then(chain[i++], chain[i++]);
        }

        return promise;
      }

      len = requestInterceptorChain.length;

      let newConfig = config;

      i = 0;

      while (i < len) {
        const onFulfilled = requestInterceptorChain[i++];
        const onRejected = requestInterceptorChain[i++];
        try {
          newConfig = onFulfilled(newConfig);
        } catch (error) {
          onRejected.call(this, error);
          break;
        }
      }

      try {
        promise = dispatchRequest.call(this, newConfig);
      } catch (error) {
        return Promise.reject(error);
      }

      i = 0;
      len = responseInterceptorChain.length;

      while (i < len) {
        promise = promise.then(responseInterceptorChain[i++], responseInterceptorChain[i++]);
      }

      return promise;
    }

    getUri(config) {
      config = mergeConfig$1(this.defaults, config);
      const fullPath = buildFullPath(config.baseURL, config.url);
      return buildURL(fullPath, config.params, config.paramsSerializer);
    }
  };

  // Provide aliases for supported request methods
  utils$2.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
    /*eslint func-names:0*/
    Axios$1.prototype[method] = function(url, config) {
      return this.request(mergeConfig$1(config || {}, {
        method,
        url,
        data: (config || {}).data
      }));
    };
  });

  utils$2.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
    /*eslint func-names:0*/

    function generateHTTPMethod(isForm) {
      return function httpMethod(url, data, config) {
        return this.request(mergeConfig$1(config || {}, {
          method,
          headers: isForm ? {
            'Content-Type': 'multipart/form-data'
          } : {},
          url,
          data
        }));
      };
    }

    Axios$1.prototype[method] = generateHTTPMethod();

    Axios$1.prototype[method + 'Form'] = generateHTTPMethod(true);
  });

  /**
   * A `CancelToken` is an object that can be used to request cancellation of an operation.
   *
   * @param {Function} executor The executor function.
   *
   * @returns {CancelToken}
   */
  let CancelToken$1 = class CancelToken {
    constructor(executor) {
      if (typeof executor !== 'function') {
        throw new TypeError('executor must be a function.');
      }

      let resolvePromise;

      this.promise = new Promise(function promiseExecutor(resolve) {
        resolvePromise = resolve;
      });

      const token = this;

      // eslint-disable-next-line func-names
      this.promise.then(cancel => {
        if (!token._listeners) return;

        let i = token._listeners.length;

        while (i-- > 0) {
          token._listeners[i](cancel);
        }
        token._listeners = null;
      });

      // eslint-disable-next-line func-names
      this.promise.then = onfulfilled => {
        let _resolve;
        // eslint-disable-next-line func-names
        const promise = new Promise(resolve => {
          token.subscribe(resolve);
          _resolve = resolve;
        }).then(onfulfilled);

        promise.cancel = function reject() {
          token.unsubscribe(_resolve);
        };

        return promise;
      };

      executor(function cancel(message, config, request) {
        if (token.reason) {
          // Cancellation has already been requested
          return;
        }

        token.reason = new CanceledError$1(message, config, request);
        resolvePromise(token.reason);
      });
    }

    /**
     * Throws a `CanceledError` if cancellation has been requested.
     */
    throwIfRequested() {
      if (this.reason) {
        throw this.reason;
      }
    }

    /**
     * Subscribe to the cancel signal
     */

    subscribe(listener) {
      if (this.reason) {
        listener(this.reason);
        return;
      }

      if (this._listeners) {
        this._listeners.push(listener);
      } else {
        this._listeners = [listener];
      }
    }

    /**
     * Unsubscribe from the cancel signal
     */

    unsubscribe(listener) {
      if (!this._listeners) {
        return;
      }
      const index = this._listeners.indexOf(listener);
      if (index !== -1) {
        this._listeners.splice(index, 1);
      }
    }

    toAbortSignal() {
      const controller = new AbortController();

      const abort = (err) => {
        controller.abort(err);
      };

      this.subscribe(abort);

      controller.signal.unsubscribe = () => this.unsubscribe(abort);

      return controller.signal;
    }

    /**
     * Returns an object that contains a new `CancelToken` and a function that, when called,
     * cancels the `CancelToken`.
     */
    static source() {
      let cancel;
      const token = new CancelToken(function executor(c) {
        cancel = c;
      });
      return {
        token,
        cancel
      };
    }
  };

  /**
   * Syntactic sugar for invoking a function and expanding an array for arguments.
   *
   * Common use case would be to use `Function.prototype.apply`.
   *
   *  ```js
   *  function f(x, y, z) {}
   *  var args = [1, 2, 3];
   *  f.apply(null, args);
   *  ```
   *
   * With `spread` this example can be re-written.
   *
   *  ```js
   *  spread(function(x, y, z) {})([1, 2, 3]);
   *  ```
   *
   * @param {Function} callback
   *
   * @returns {Function}
   */
  function spread$1(callback) {
    return function wrap(arr) {
      return callback.apply(null, arr);
    };
  }

  /**
   * Determines whether the payload is an error thrown by Axios
   *
   * @param {*} payload The value to test
   *
   * @returns {boolean} True if the payload is an error thrown by Axios, otherwise false
   */
  function isAxiosError$1(payload) {
    return utils$2.isObject(payload) && (payload.isAxiosError === true);
  }

  const HttpStatusCode$1 = {
    Continue: 100,
    SwitchingProtocols: 101,
    Processing: 102,
    EarlyHints: 103,
    Ok: 200,
    Created: 201,
    Accepted: 202,
    NonAuthoritativeInformation: 203,
    NoContent: 204,
    ResetContent: 205,
    PartialContent: 206,
    MultiStatus: 207,
    AlreadyReported: 208,
    ImUsed: 226,
    MultipleChoices: 300,
    MovedPermanently: 301,
    Found: 302,
    SeeOther: 303,
    NotModified: 304,
    UseProxy: 305,
    Unused: 306,
    TemporaryRedirect: 307,
    PermanentRedirect: 308,
    BadRequest: 400,
    Unauthorized: 401,
    PaymentRequired: 402,
    Forbidden: 403,
    NotFound: 404,
    MethodNotAllowed: 405,
    NotAcceptable: 406,
    ProxyAuthenticationRequired: 407,
    RequestTimeout: 408,
    Conflict: 409,
    Gone: 410,
    LengthRequired: 411,
    PreconditionFailed: 412,
    PayloadTooLarge: 413,
    UriTooLong: 414,
    UnsupportedMediaType: 415,
    RangeNotSatisfiable: 416,
    ExpectationFailed: 417,
    ImATeapot: 418,
    MisdirectedRequest: 421,
    UnprocessableEntity: 422,
    Locked: 423,
    FailedDependency: 424,
    TooEarly: 425,
    UpgradeRequired: 426,
    PreconditionRequired: 428,
    TooManyRequests: 429,
    RequestHeaderFieldsTooLarge: 431,
    UnavailableForLegalReasons: 451,
    InternalServerError: 500,
    NotImplemented: 501,
    BadGateway: 502,
    ServiceUnavailable: 503,
    GatewayTimeout: 504,
    HttpVersionNotSupported: 505,
    VariantAlsoNegotiates: 506,
    InsufficientStorage: 507,
    LoopDetected: 508,
    NotExtended: 510,
    NetworkAuthenticationRequired: 511,
  };

  Object.entries(HttpStatusCode$1).forEach(([key, value]) => {
    HttpStatusCode$1[value] = key;
  });

  /**
   * Create an instance of Axios
   *
   * @param {Object} defaultConfig The default config for the instance
   *
   * @returns {Axios} A new instance of Axios
   */
  function createInstance(defaultConfig) {
    const context = new Axios$1(defaultConfig);
    const instance = bind(Axios$1.prototype.request, context);

    // Copy axios.prototype to instance
    utils$2.extend(instance, Axios$1.prototype, context, {allOwnKeys: true});

    // Copy context to instance
    utils$2.extend(instance, context, null, {allOwnKeys: true});

    // Factory for creating new instances
    instance.create = function create(instanceConfig) {
      return createInstance(mergeConfig$1(defaultConfig, instanceConfig));
    };

    return instance;
  }

  // Create the default instance to be exported
  const axios = createInstance(defaults);

  // Expose Axios class to allow class inheritance
  axios.Axios = Axios$1;

  // Expose Cancel & CancelToken
  axios.CanceledError = CanceledError$1;
  axios.CancelToken = CancelToken$1;
  axios.isCancel = isCancel$1;
  axios.VERSION = VERSION$1;
  axios.toFormData = toFormData$1;

  // Expose AxiosError class
  axios.AxiosError = AxiosError$1;

  // alias for CanceledError for backward compatibility
  axios.Cancel = axios.CanceledError;

  // Expose all/spread
  axios.all = function all(promises) {
    return Promise.all(promises);
  };

  axios.spread = spread$1;

  // Expose isAxiosError
  axios.isAxiosError = isAxiosError$1;

  // Expose mergeConfig
  axios.mergeConfig = mergeConfig$1;

  axios.AxiosHeaders = AxiosHeaders$1;

  axios.formToJSON = thing => formDataToJSON(utils$2.isHTMLForm(thing) ? new FormData(thing) : thing);

  axios.getAdapter = adapters.getAdapter;

  axios.HttpStatusCode = HttpStatusCode$1;

  axios.default = axios;

  // This module is intended to unwrap Axios default export as named.
  // Keep top-level export same with static properties
  // so that it can keep same with es module or cjs
  const {
    Axios,
    AxiosError,
    CanceledError,
    isCancel,
    CancelToken,
    VERSION,
    all,
    Cancel,
    isAxiosError,
    spread,
    toFormData,
    AxiosHeaders,
    HttpStatusCode,
    formToJSON,
    getAdapter,
    mergeConfig
  } = axios;

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function getDefaultExportFromCjs (x) {
  	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
  }

  function getAugmentedNamespace(n) {
    if (n.__esModule) return n;
    var f = n.default;
  	if (typeof f == "function") {
  		var a = function a () {
  			if (this instanceof a) {
          return Reflect.construct(f, arguments, this.constructor);
  			}
  			return f.apply(this, arguments);
  		};
  		a.prototype = f.prototype;
    } else a = {};
    Object.defineProperty(a, '__esModule', {value: true});
  	Object.keys(n).forEach(function (k) {
  		var d = Object.getOwnPropertyDescriptor(n, k);
  		Object.defineProperty(a, k, d.get ? d : {
  			enumerable: true,
  			get: function () {
  				return n[k];
  			}
  		});
  	});
  	return a;
  }

  var cjs;
  var hasRequiredCjs;

  function requireCjs () {
  	if (hasRequiredCjs) return cjs;
  	hasRequiredCjs = 1;

  	var isMergeableObject = function isMergeableObject(value) {
  		return isNonNullObject(value)
  			&& !isSpecial(value)
  	};

  	function isNonNullObject(value) {
  		return !!value && typeof value === 'object'
  	}

  	function isSpecial(value) {
  		var stringValue = Object.prototype.toString.call(value);

  		return stringValue === '[object RegExp]'
  			|| stringValue === '[object Date]'
  			|| isReactElement(value)
  	}

  	// see https://github.com/facebook/react/blob/b5ac963fb791d1298e7f396236383bc955f916c1/src/isomorphic/classic/element/ReactElement.js#L21-L25
  	var canUseSymbol = typeof Symbol === 'function' && Symbol.for;
  	var REACT_ELEMENT_TYPE = canUseSymbol ? Symbol.for('react.element') : 0xeac7;

  	function isReactElement(value) {
  		return value.$$typeof === REACT_ELEMENT_TYPE
  	}

  	function emptyTarget(val) {
  		return Array.isArray(val) ? [] : {}
  	}

  	function cloneUnlessOtherwiseSpecified(value, options) {
  		return (options.clone !== false && options.isMergeableObject(value))
  			? deepmerge(emptyTarget(value), value, options)
  			: value
  	}

  	function defaultArrayMerge(target, source, options) {
  		return target.concat(source).map(function(element) {
  			return cloneUnlessOtherwiseSpecified(element, options)
  		})
  	}

  	function getMergeFunction(key, options) {
  		if (!options.customMerge) {
  			return deepmerge
  		}
  		var customMerge = options.customMerge(key);
  		return typeof customMerge === 'function' ? customMerge : deepmerge
  	}

  	function getEnumerableOwnPropertySymbols(target) {
  		return Object.getOwnPropertySymbols
  			? Object.getOwnPropertySymbols(target).filter(function(symbol) {
  				return Object.propertyIsEnumerable.call(target, symbol)
  			})
  			: []
  	}

  	function getKeys(target) {
  		return Object.keys(target).concat(getEnumerableOwnPropertySymbols(target))
  	}

  	function propertyIsOnObject(object, property) {
  		try {
  			return property in object
  		} catch(_) {
  			return false
  		}
  	}

  	// Protects from prototype poisoning and unexpected merging up the prototype chain.
  	function propertyIsUnsafe(target, key) {
  		return propertyIsOnObject(target, key) // Properties are safe to merge if they don't exist in the target yet,
  			&& !(Object.hasOwnProperty.call(target, key) // unsafe if they exist up the prototype chain,
  				&& Object.propertyIsEnumerable.call(target, key)) // and also unsafe if they're nonenumerable.
  	}

  	function mergeObject(target, source, options) {
  		var destination = {};
  		if (options.isMergeableObject(target)) {
  			getKeys(target).forEach(function(key) {
  				destination[key] = cloneUnlessOtherwiseSpecified(target[key], options);
  			});
  		}
  		getKeys(source).forEach(function(key) {
  			if (propertyIsUnsafe(target, key)) {
  				return
  			}

  			if (propertyIsOnObject(target, key) && options.isMergeableObject(source[key])) {
  				destination[key] = getMergeFunction(key, options)(target[key], source[key], options);
  			} else {
  				destination[key] = cloneUnlessOtherwiseSpecified(source[key], options);
  			}
  		});
  		return destination
  	}

  	function deepmerge(target, source, options) {
  		options = options || {};
  		options.arrayMerge = options.arrayMerge || defaultArrayMerge;
  		options.isMergeableObject = options.isMergeableObject || isMergeableObject;
  		// cloneUnlessOtherwiseSpecified is added to `options` so that custom arrayMerge()
  		// implementations can use it. The caller may not replace it.
  		options.cloneUnlessOtherwiseSpecified = cloneUnlessOtherwiseSpecified;

  		var sourceIsArray = Array.isArray(source);
  		var targetIsArray = Array.isArray(target);
  		var sourceAndTargetTypesMatch = sourceIsArray === targetIsArray;

  		if (!sourceAndTargetTypesMatch) {
  			return cloneUnlessOtherwiseSpecified(source, options)
  		} else if (sourceIsArray) {
  			return options.arrayMerge(target, source, options)
  		} else {
  			return mergeObject(target, source, options)
  		}
  	}

  	deepmerge.all = function deepmergeAll(array, options) {
  		if (!Array.isArray(array)) {
  			throw new Error('first argument should be an array')
  		}

  		return array.reduce(function(prev, next) {
  			return deepmerge(prev, next, options)
  		}, {})
  	};

  	var deepmerge_1 = deepmerge;

  	cjs = deepmerge_1;
  	return cjs;
  }

  var cjsExports = requireCjs();
  var oe = /*@__PURE__*/getDefaultExportFromCjs(cjsExports);

  var type;
  var hasRequiredType;

  function requireType () {
  	if (hasRequiredType) return type;
  	hasRequiredType = 1;

  	/** @type {import('./type')} */
  	type = TypeError;
  	return type;
  }

  var _nodeResolve_empty = {};

  var _nodeResolve_empty$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: _nodeResolve_empty
  });

  var require$$0 = /*@__PURE__*/getAugmentedNamespace(_nodeResolve_empty$1);

  var objectInspect;
  var hasRequiredObjectInspect;

  function requireObjectInspect () {
  	if (hasRequiredObjectInspect) return objectInspect;
  	hasRequiredObjectInspect = 1;
  	var hasMap = typeof Map === 'function' && Map.prototype;
  	var mapSizeDescriptor = Object.getOwnPropertyDescriptor && hasMap ? Object.getOwnPropertyDescriptor(Map.prototype, 'size') : null;
  	var mapSize = hasMap && mapSizeDescriptor && typeof mapSizeDescriptor.get === 'function' ? mapSizeDescriptor.get : null;
  	var mapForEach = hasMap && Map.prototype.forEach;
  	var hasSet = typeof Set === 'function' && Set.prototype;
  	var setSizeDescriptor = Object.getOwnPropertyDescriptor && hasSet ? Object.getOwnPropertyDescriptor(Set.prototype, 'size') : null;
  	var setSize = hasSet && setSizeDescriptor && typeof setSizeDescriptor.get === 'function' ? setSizeDescriptor.get : null;
  	var setForEach = hasSet && Set.prototype.forEach;
  	var hasWeakMap = typeof WeakMap === 'function' && WeakMap.prototype;
  	var weakMapHas = hasWeakMap ? WeakMap.prototype.has : null;
  	var hasWeakSet = typeof WeakSet === 'function' && WeakSet.prototype;
  	var weakSetHas = hasWeakSet ? WeakSet.prototype.has : null;
  	var hasWeakRef = typeof WeakRef === 'function' && WeakRef.prototype;
  	var weakRefDeref = hasWeakRef ? WeakRef.prototype.deref : null;
  	var booleanValueOf = Boolean.prototype.valueOf;
  	var objectToString = Object.prototype.toString;
  	var functionToString = Function.prototype.toString;
  	var $match = String.prototype.match;
  	var $slice = String.prototype.slice;
  	var $replace = String.prototype.replace;
  	var $toUpperCase = String.prototype.toUpperCase;
  	var $toLowerCase = String.prototype.toLowerCase;
  	var $test = RegExp.prototype.test;
  	var $concat = Array.prototype.concat;
  	var $join = Array.prototype.join;
  	var $arrSlice = Array.prototype.slice;
  	var $floor = Math.floor;
  	var bigIntValueOf = typeof BigInt === 'function' ? BigInt.prototype.valueOf : null;
  	var gOPS = Object.getOwnPropertySymbols;
  	var symToString = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol' ? Symbol.prototype.toString : null;
  	var hasShammedSymbols = typeof Symbol === 'function' && typeof Symbol.iterator === 'object';
  	// ie, `has-tostringtag/shams
  	var toStringTag = typeof Symbol === 'function' && Symbol.toStringTag && (typeof Symbol.toStringTag === hasShammedSymbols ? 'object' : 'symbol')
  	    ? Symbol.toStringTag
  	    : null;
  	var isEnumerable = Object.prototype.propertyIsEnumerable;

  	var gPO = (typeof Reflect === 'function' ? Reflect.getPrototypeOf : Object.getPrototypeOf) || (
  	    [].__proto__ === Array.prototype // eslint-disable-line no-proto
  	        ? function (O) {
  	            return O.__proto__; // eslint-disable-line no-proto
  	        }
  	        : null
  	);

  	function addNumericSeparator(num, str) {
  	    if (
  	        num === Infinity
  	        || num === -Infinity
  	        || num !== num
  	        || (num && num > -1e3 && num < 1000)
  	        || $test.call(/e/, str)
  	    ) {
  	        return str;
  	    }
  	    var sepRegex = /[0-9](?=(?:[0-9]{3})+(?![0-9]))/g;
  	    if (typeof num === 'number') {
  	        var int = num < 0 ? -$floor(-num) : $floor(num); // trunc(num)
  	        if (int !== num) {
  	            var intStr = String(int);
  	            var dec = $slice.call(str, intStr.length + 1);
  	            return $replace.call(intStr, sepRegex, '$&_') + '.' + $replace.call($replace.call(dec, /([0-9]{3})/g, '$&_'), /_$/, '');
  	        }
  	    }
  	    return $replace.call(str, sepRegex, '$&_');
  	}

  	var utilInspect = require$$0;
  	var inspectCustom = utilInspect.custom;
  	var inspectSymbol = isSymbol(inspectCustom) ? inspectCustom : null;

  	var quotes = {
  	    __proto__: null,
  	    'double': '"',
  	    single: "'"
  	};
  	var quoteREs = {
  	    __proto__: null,
  	    'double': /(["\\])/g,
  	    single: /(['\\])/g
  	};

  	objectInspect = function inspect_(obj, options, depth, seen) {
  	    var opts = options || {};

  	    if (has(opts, 'quoteStyle') && !has(quotes, opts.quoteStyle)) {
  	        throw new TypeError('option "quoteStyle" must be "single" or "double"');
  	    }
  	    if (
  	        has(opts, 'maxStringLength') && (typeof opts.maxStringLength === 'number'
  	            ? opts.maxStringLength < 0 && opts.maxStringLength !== Infinity
  	            : opts.maxStringLength !== null
  	        )
  	    ) {
  	        throw new TypeError('option "maxStringLength", if provided, must be a positive integer, Infinity, or `null`');
  	    }
  	    var customInspect = has(opts, 'customInspect') ? opts.customInspect : true;
  	    if (typeof customInspect !== 'boolean' && customInspect !== 'symbol') {
  	        throw new TypeError('option "customInspect", if provided, must be `true`, `false`, or `\'symbol\'`');
  	    }

  	    if (
  	        has(opts, 'indent')
  	        && opts.indent !== null
  	        && opts.indent !== '\t'
  	        && !(parseInt(opts.indent, 10) === opts.indent && opts.indent > 0)
  	    ) {
  	        throw new TypeError('option "indent" must be "\\t", an integer > 0, or `null`');
  	    }
  	    if (has(opts, 'numericSeparator') && typeof opts.numericSeparator !== 'boolean') {
  	        throw new TypeError('option "numericSeparator", if provided, must be `true` or `false`');
  	    }
  	    var numericSeparator = opts.numericSeparator;

  	    if (typeof obj === 'undefined') {
  	        return 'undefined';
  	    }
  	    if (obj === null) {
  	        return 'null';
  	    }
  	    if (typeof obj === 'boolean') {
  	        return obj ? 'true' : 'false';
  	    }

  	    if (typeof obj === 'string') {
  	        return inspectString(obj, opts);
  	    }
  	    if (typeof obj === 'number') {
  	        if (obj === 0) {
  	            return Infinity / obj > 0 ? '0' : '-0';
  	        }
  	        var str = String(obj);
  	        return numericSeparator ? addNumericSeparator(obj, str) : str;
  	    }
  	    if (typeof obj === 'bigint') {
  	        var bigIntStr = String(obj) + 'n';
  	        return numericSeparator ? addNumericSeparator(obj, bigIntStr) : bigIntStr;
  	    }

  	    var maxDepth = typeof opts.depth === 'undefined' ? 5 : opts.depth;
  	    if (typeof depth === 'undefined') { depth = 0; }
  	    if (depth >= maxDepth && maxDepth > 0 && typeof obj === 'object') {
  	        return isArray(obj) ? '[Array]' : '[Object]';
  	    }

  	    var indent = getIndent(opts, depth);

  	    if (typeof seen === 'undefined') {
  	        seen = [];
  	    } else if (indexOf(seen, obj) >= 0) {
  	        return '[Circular]';
  	    }

  	    function inspect(value, from, noIndent) {
  	        if (from) {
  	            seen = $arrSlice.call(seen);
  	            seen.push(from);
  	        }
  	        if (noIndent) {
  	            var newOpts = {
  	                depth: opts.depth
  	            };
  	            if (has(opts, 'quoteStyle')) {
  	                newOpts.quoteStyle = opts.quoteStyle;
  	            }
  	            return inspect_(value, newOpts, depth + 1, seen);
  	        }
  	        return inspect_(value, opts, depth + 1, seen);
  	    }

  	    if (typeof obj === 'function' && !isRegExp(obj)) { // in older engines, regexes are callable
  	        var name = nameOf(obj);
  	        var keys = arrObjKeys(obj, inspect);
  	        return '[Function' + (name ? ': ' + name : ' (anonymous)') + ']' + (keys.length > 0 ? ' { ' + $join.call(keys, ', ') + ' }' : '');
  	    }
  	    if (isSymbol(obj)) {
  	        var symString = hasShammedSymbols ? $replace.call(String(obj), /^(Symbol\(.*\))_[^)]*$/, '$1') : symToString.call(obj);
  	        return typeof obj === 'object' && !hasShammedSymbols ? markBoxed(symString) : symString;
  	    }
  	    if (isElement(obj)) {
  	        var s = '<' + $toLowerCase.call(String(obj.nodeName));
  	        var attrs = obj.attributes || [];
  	        for (var i = 0; i < attrs.length; i++) {
  	            s += ' ' + attrs[i].name + '=' + wrapQuotes(quote(attrs[i].value), 'double', opts);
  	        }
  	        s += '>';
  	        if (obj.childNodes && obj.childNodes.length) { s += '...'; }
  	        s += '</' + $toLowerCase.call(String(obj.nodeName)) + '>';
  	        return s;
  	    }
  	    if (isArray(obj)) {
  	        if (obj.length === 0) { return '[]'; }
  	        var xs = arrObjKeys(obj, inspect);
  	        if (indent && !singleLineValues(xs)) {
  	            return '[' + indentedJoin(xs, indent) + ']';
  	        }
  	        return '[ ' + $join.call(xs, ', ') + ' ]';
  	    }
  	    if (isError(obj)) {
  	        var parts = arrObjKeys(obj, inspect);
  	        if (!('cause' in Error.prototype) && 'cause' in obj && !isEnumerable.call(obj, 'cause')) {
  	            return '{ [' + String(obj) + '] ' + $join.call($concat.call('[cause]: ' + inspect(obj.cause), parts), ', ') + ' }';
  	        }
  	        if (parts.length === 0) { return '[' + String(obj) + ']'; }
  	        return '{ [' + String(obj) + '] ' + $join.call(parts, ', ') + ' }';
  	    }
  	    if (typeof obj === 'object' && customInspect) {
  	        if (inspectSymbol && typeof obj[inspectSymbol] === 'function' && utilInspect) {
  	            return utilInspect(obj, { depth: maxDepth - depth });
  	        } else if (customInspect !== 'symbol' && typeof obj.inspect === 'function') {
  	            return obj.inspect();
  	        }
  	    }
  	    if (isMap(obj)) {
  	        var mapParts = [];
  	        if (mapForEach) {
  	            mapForEach.call(obj, function (value, key) {
  	                mapParts.push(inspect(key, obj, true) + ' => ' + inspect(value, obj));
  	            });
  	        }
  	        return collectionOf('Map', mapSize.call(obj), mapParts, indent);
  	    }
  	    if (isSet(obj)) {
  	        var setParts = [];
  	        if (setForEach) {
  	            setForEach.call(obj, function (value) {
  	                setParts.push(inspect(value, obj));
  	            });
  	        }
  	        return collectionOf('Set', setSize.call(obj), setParts, indent);
  	    }
  	    if (isWeakMap(obj)) {
  	        return weakCollectionOf('WeakMap');
  	    }
  	    if (isWeakSet(obj)) {
  	        return weakCollectionOf('WeakSet');
  	    }
  	    if (isWeakRef(obj)) {
  	        return weakCollectionOf('WeakRef');
  	    }
  	    if (isNumber(obj)) {
  	        return markBoxed(inspect(Number(obj)));
  	    }
  	    if (isBigInt(obj)) {
  	        return markBoxed(inspect(bigIntValueOf.call(obj)));
  	    }
  	    if (isBoolean(obj)) {
  	        return markBoxed(booleanValueOf.call(obj));
  	    }
  	    if (isString(obj)) {
  	        return markBoxed(inspect(String(obj)));
  	    }
  	    // note: in IE 8, sometimes `global !== window` but both are the prototypes of each other
  	    /* eslint-env browser */
  	    if (typeof window !== 'undefined' && obj === window) {
  	        return '{ [object Window] }';
  	    }
  	    if (
  	        (typeof globalThis !== 'undefined' && obj === globalThis)
  	        || (typeof commonjsGlobal !== 'undefined' && obj === commonjsGlobal)
  	    ) {
  	        return '{ [object globalThis] }';
  	    }
  	    if (!isDate(obj) && !isRegExp(obj)) {
  	        var ys = arrObjKeys(obj, inspect);
  	        var isPlainObject = gPO ? gPO(obj) === Object.prototype : obj instanceof Object || obj.constructor === Object;
  	        var protoTag = obj instanceof Object ? '' : 'null prototype';
  	        var stringTag = !isPlainObject && toStringTag && Object(obj) === obj && toStringTag in obj ? $slice.call(toStr(obj), 8, -1) : protoTag ? 'Object' : '';
  	        var constructorTag = isPlainObject || typeof obj.constructor !== 'function' ? '' : obj.constructor.name ? obj.constructor.name + ' ' : '';
  	        var tag = constructorTag + (stringTag || protoTag ? '[' + $join.call($concat.call([], stringTag || [], protoTag || []), ': ') + '] ' : '');
  	        if (ys.length === 0) { return tag + '{}'; }
  	        if (indent) {
  	            return tag + '{' + indentedJoin(ys, indent) + '}';
  	        }
  	        return tag + '{ ' + $join.call(ys, ', ') + ' }';
  	    }
  	    return String(obj);
  	};

  	function wrapQuotes(s, defaultStyle, opts) {
  	    var style = opts.quoteStyle || defaultStyle;
  	    var quoteChar = quotes[style];
  	    return quoteChar + s + quoteChar;
  	}

  	function quote(s) {
  	    return $replace.call(String(s), /"/g, '&quot;');
  	}

  	function canTrustToString(obj) {
  	    return !toStringTag || !(typeof obj === 'object' && (toStringTag in obj || typeof obj[toStringTag] !== 'undefined'));
  	}
  	function isArray(obj) { return toStr(obj) === '[object Array]' && canTrustToString(obj); }
  	function isDate(obj) { return toStr(obj) === '[object Date]' && canTrustToString(obj); }
  	function isRegExp(obj) { return toStr(obj) === '[object RegExp]' && canTrustToString(obj); }
  	function isError(obj) { return toStr(obj) === '[object Error]' && canTrustToString(obj); }
  	function isString(obj) { return toStr(obj) === '[object String]' && canTrustToString(obj); }
  	function isNumber(obj) { return toStr(obj) === '[object Number]' && canTrustToString(obj); }
  	function isBoolean(obj) { return toStr(obj) === '[object Boolean]' && canTrustToString(obj); }

  	// Symbol and BigInt do have Symbol.toStringTag by spec, so that can't be used to eliminate false positives
  	function isSymbol(obj) {
  	    if (hasShammedSymbols) {
  	        return obj && typeof obj === 'object' && obj instanceof Symbol;
  	    }
  	    if (typeof obj === 'symbol') {
  	        return true;
  	    }
  	    if (!obj || typeof obj !== 'object' || !symToString) {
  	        return false;
  	    }
  	    try {
  	        symToString.call(obj);
  	        return true;
  	    } catch (e) {}
  	    return false;
  	}

  	function isBigInt(obj) {
  	    if (!obj || typeof obj !== 'object' || !bigIntValueOf) {
  	        return false;
  	    }
  	    try {
  	        bigIntValueOf.call(obj);
  	        return true;
  	    } catch (e) {}
  	    return false;
  	}

  	var hasOwn = Object.prototype.hasOwnProperty || function (key) { return key in this; };
  	function has(obj, key) {
  	    return hasOwn.call(obj, key);
  	}

  	function toStr(obj) {
  	    return objectToString.call(obj);
  	}

  	function nameOf(f) {
  	    if (f.name) { return f.name; }
  	    var m = $match.call(functionToString.call(f), /^function\s*([\w$]+)/);
  	    if (m) { return m[1]; }
  	    return null;
  	}

  	function indexOf(xs, x) {
  	    if (xs.indexOf) { return xs.indexOf(x); }
  	    for (var i = 0, l = xs.length; i < l; i++) {
  	        if (xs[i] === x) { return i; }
  	    }
  	    return -1;
  	}

  	function isMap(x) {
  	    if (!mapSize || !x || typeof x !== 'object') {
  	        return false;
  	    }
  	    try {
  	        mapSize.call(x);
  	        try {
  	            setSize.call(x);
  	        } catch (s) {
  	            return true;
  	        }
  	        return x instanceof Map; // core-js workaround, pre-v2.5.0
  	    } catch (e) {}
  	    return false;
  	}

  	function isWeakMap(x) {
  	    if (!weakMapHas || !x || typeof x !== 'object') {
  	        return false;
  	    }
  	    try {
  	        weakMapHas.call(x, weakMapHas);
  	        try {
  	            weakSetHas.call(x, weakSetHas);
  	        } catch (s) {
  	            return true;
  	        }
  	        return x instanceof WeakMap; // core-js workaround, pre-v2.5.0
  	    } catch (e) {}
  	    return false;
  	}

  	function isWeakRef(x) {
  	    if (!weakRefDeref || !x || typeof x !== 'object') {
  	        return false;
  	    }
  	    try {
  	        weakRefDeref.call(x);
  	        return true;
  	    } catch (e) {}
  	    return false;
  	}

  	function isSet(x) {
  	    if (!setSize || !x || typeof x !== 'object') {
  	        return false;
  	    }
  	    try {
  	        setSize.call(x);
  	        try {
  	            mapSize.call(x);
  	        } catch (m) {
  	            return true;
  	        }
  	        return x instanceof Set; // core-js workaround, pre-v2.5.0
  	    } catch (e) {}
  	    return false;
  	}

  	function isWeakSet(x) {
  	    if (!weakSetHas || !x || typeof x !== 'object') {
  	        return false;
  	    }
  	    try {
  	        weakSetHas.call(x, weakSetHas);
  	        try {
  	            weakMapHas.call(x, weakMapHas);
  	        } catch (s) {
  	            return true;
  	        }
  	        return x instanceof WeakSet; // core-js workaround, pre-v2.5.0
  	    } catch (e) {}
  	    return false;
  	}

  	function isElement(x) {
  	    if (!x || typeof x !== 'object') { return false; }
  	    if (typeof HTMLElement !== 'undefined' && x instanceof HTMLElement) {
  	        return true;
  	    }
  	    return typeof x.nodeName === 'string' && typeof x.getAttribute === 'function';
  	}

  	function inspectString(str, opts) {
  	    if (str.length > opts.maxStringLength) {
  	        var remaining = str.length - opts.maxStringLength;
  	        var trailer = '... ' + remaining + ' more character' + (remaining > 1 ? 's' : '');
  	        return inspectString($slice.call(str, 0, opts.maxStringLength), opts) + trailer;
  	    }
  	    var quoteRE = quoteREs[opts.quoteStyle || 'single'];
  	    quoteRE.lastIndex = 0;
  	    // eslint-disable-next-line no-control-regex
  	    var s = $replace.call($replace.call(str, quoteRE, '\\$1'), /[\x00-\x1f]/g, lowbyte);
  	    return wrapQuotes(s, 'single', opts);
  	}

  	function lowbyte(c) {
  	    var n = c.charCodeAt(0);
  	    var x = {
  	        8: 'b',
  	        9: 't',
  	        10: 'n',
  	        12: 'f',
  	        13: 'r'
  	    }[n];
  	    if (x) { return '\\' + x; }
  	    return '\\x' + (n < 0x10 ? '0' : '') + $toUpperCase.call(n.toString(16));
  	}

  	function markBoxed(str) {
  	    return 'Object(' + str + ')';
  	}

  	function weakCollectionOf(type) {
  	    return type + ' { ? }';
  	}

  	function collectionOf(type, size, entries, indent) {
  	    var joinedEntries = indent ? indentedJoin(entries, indent) : $join.call(entries, ', ');
  	    return type + ' (' + size + ') {' + joinedEntries + '}';
  	}

  	function singleLineValues(xs) {
  	    for (var i = 0; i < xs.length; i++) {
  	        if (indexOf(xs[i], '\n') >= 0) {
  	            return false;
  	        }
  	    }
  	    return true;
  	}

  	function getIndent(opts, depth) {
  	    var baseIndent;
  	    if (opts.indent === '\t') {
  	        baseIndent = '\t';
  	    } else if (typeof opts.indent === 'number' && opts.indent > 0) {
  	        baseIndent = $join.call(Array(opts.indent + 1), ' ');
  	    } else {
  	        return null;
  	    }
  	    return {
  	        base: baseIndent,
  	        prev: $join.call(Array(depth + 1), baseIndent)
  	    };
  	}

  	function indentedJoin(xs, indent) {
  	    if (xs.length === 0) { return ''; }
  	    var lineJoiner = '\n' + indent.prev + indent.base;
  	    return lineJoiner + $join.call(xs, ',' + lineJoiner) + '\n' + indent.prev;
  	}

  	function arrObjKeys(obj, inspect) {
  	    var isArr = isArray(obj);
  	    var xs = [];
  	    if (isArr) {
  	        xs.length = obj.length;
  	        for (var i = 0; i < obj.length; i++) {
  	            xs[i] = has(obj, i) ? inspect(obj[i], obj) : '';
  	        }
  	    }
  	    var syms = typeof gOPS === 'function' ? gOPS(obj) : [];
  	    var symMap;
  	    if (hasShammedSymbols) {
  	        symMap = {};
  	        for (var k = 0; k < syms.length; k++) {
  	            symMap['$' + syms[k]] = syms[k];
  	        }
  	    }

  	    for (var key in obj) { // eslint-disable-line no-restricted-syntax
  	        if (!has(obj, key)) { continue; } // eslint-disable-line no-restricted-syntax, no-continue
  	        if (isArr && String(Number(key)) === key && key < obj.length) { continue; } // eslint-disable-line no-restricted-syntax, no-continue
  	        if (hasShammedSymbols && symMap['$' + key] instanceof Symbol) {
  	            // this is to prevent shammed Symbols, which are stored as strings, from being included in the string key section
  	            continue; // eslint-disable-line no-restricted-syntax, no-continue
  	        } else if ($test.call(/[^\w$]/, key)) {
  	            xs.push(inspect(key, obj) + ': ' + inspect(obj[key], obj));
  	        } else {
  	            xs.push(key + ': ' + inspect(obj[key], obj));
  	        }
  	    }
  	    if (typeof gOPS === 'function') {
  	        for (var j = 0; j < syms.length; j++) {
  	            if (isEnumerable.call(obj, syms[j])) {
  	                xs.push('[' + inspect(syms[j]) + ']: ' + inspect(obj[syms[j]], obj));
  	            }
  	        }
  	    }
  	    return xs;
  	}
  	return objectInspect;
  }

  var sideChannelList;
  var hasRequiredSideChannelList;

  function requireSideChannelList () {
  	if (hasRequiredSideChannelList) return sideChannelList;
  	hasRequiredSideChannelList = 1;

  	var inspect = /*@__PURE__*/ requireObjectInspect();

  	var $TypeError = /*@__PURE__*/ requireType();

  	/*
  	* This function traverses the list returning the node corresponding to the given key.
  	*
  	* That node is also moved to the head of the list, so that if it's accessed again we don't need to traverse the whole list.
  	* By doing so, all the recently used nodes can be accessed relatively quickly.
  	*/
  	/** @type {import('./list.d.ts').listGetNode} */
  	// eslint-disable-next-line consistent-return
  	var listGetNode = function (list, key, isDelete) {
  		/** @type {typeof list | NonNullable<(typeof list)['next']>} */
  		var prev = list;
  		/** @type {(typeof list)['next']} */
  		var curr;
  		// eslint-disable-next-line eqeqeq
  		for (; (curr = prev.next) != null; prev = curr) {
  			if (curr.key === key) {
  				prev.next = curr.next;
  				if (!isDelete) {
  					// eslint-disable-next-line no-extra-parens
  					curr.next = /** @type {NonNullable<typeof list.next>} */ (list.next);
  					list.next = curr; // eslint-disable-line no-param-reassign
  				}
  				return curr;
  			}
  		}
  	};

  	/** @type {import('./list.d.ts').listGet} */
  	var listGet = function (objects, key) {
  		if (!objects) {
  			return void 0;
  		}
  		var node = listGetNode(objects, key);
  		return node && node.value;
  	};
  	/** @type {import('./list.d.ts').listSet} */
  	var listSet = function (objects, key, value) {
  		var node = listGetNode(objects, key);
  		if (node) {
  			node.value = value;
  		} else {
  			// Prepend the new node to the beginning of the list
  			objects.next = /** @type {import('./list.d.ts').ListNode<typeof value, typeof key>} */ ({ // eslint-disable-line no-param-reassign, no-extra-parens
  				key: key,
  				next: objects.next,
  				value: value
  			});
  		}
  	};
  	/** @type {import('./list.d.ts').listHas} */
  	var listHas = function (objects, key) {
  		if (!objects) {
  			return false;
  		}
  		return !!listGetNode(objects, key);
  	};
  	/** @type {import('./list.d.ts').listDelete} */
  	// eslint-disable-next-line consistent-return
  	var listDelete = function (objects, key) {
  		if (objects) {
  			return listGetNode(objects, key, true);
  		}
  	};

  	/** @type {import('.')} */
  	sideChannelList = function getSideChannelList() {
  		/** @typedef {ReturnType<typeof getSideChannelList>} Channel */
  		/** @typedef {Parameters<Channel['get']>[0]} K */
  		/** @typedef {Parameters<Channel['set']>[1]} V */

  		/** @type {import('./list.d.ts').RootNode<V, K> | undefined} */ var $o;

  		/** @type {Channel} */
  		var channel = {
  			assert: function (key) {
  				if (!channel.has(key)) {
  					throw new $TypeError('Side channel does not contain ' + inspect(key));
  				}
  			},
  			'delete': function (key) {
  				var root = $o && $o.next;
  				var deletedNode = listDelete($o, key);
  				if (deletedNode && root && root === deletedNode) {
  					$o = void 0;
  				}
  				return !!deletedNode;
  			},
  			get: function (key) {
  				return listGet($o, key);
  			},
  			has: function (key) {
  				return listHas($o, key);
  			},
  			set: function (key, value) {
  				if (!$o) {
  					// Initialize the linked list as an empty node, so that we don't have to special-case handling of the first node: we can always refer to it as (previous node).next, instead of something like (list).head
  					$o = {
  						next: void 0
  					};
  				}
  				// eslint-disable-next-line no-extra-parens
  				listSet(/** @type {NonNullable<typeof $o>} */ ($o), key, value);
  			}
  		};
  		// @ts-expect-error TODO: figure out why this is erroring
  		return channel;
  	};
  	return sideChannelList;
  }

  var esObjectAtoms;
  var hasRequiredEsObjectAtoms;

  function requireEsObjectAtoms () {
  	if (hasRequiredEsObjectAtoms) return esObjectAtoms;
  	hasRequiredEsObjectAtoms = 1;

  	/** @type {import('.')} */
  	esObjectAtoms = Object;
  	return esObjectAtoms;
  }

  var esErrors;
  var hasRequiredEsErrors;

  function requireEsErrors () {
  	if (hasRequiredEsErrors) return esErrors;
  	hasRequiredEsErrors = 1;

  	/** @type {import('.')} */
  	esErrors = Error;
  	return esErrors;
  }

  var _eval;
  var hasRequired_eval;

  function require_eval () {
  	if (hasRequired_eval) return _eval;
  	hasRequired_eval = 1;

  	/** @type {import('./eval')} */
  	_eval = EvalError;
  	return _eval;
  }

  var range;
  var hasRequiredRange;

  function requireRange () {
  	if (hasRequiredRange) return range;
  	hasRequiredRange = 1;

  	/** @type {import('./range')} */
  	range = RangeError;
  	return range;
  }

  var ref;
  var hasRequiredRef;

  function requireRef () {
  	if (hasRequiredRef) return ref;
  	hasRequiredRef = 1;

  	/** @type {import('./ref')} */
  	ref = ReferenceError;
  	return ref;
  }

  var syntax;
  var hasRequiredSyntax;

  function requireSyntax () {
  	if (hasRequiredSyntax) return syntax;
  	hasRequiredSyntax = 1;

  	/** @type {import('./syntax')} */
  	syntax = SyntaxError;
  	return syntax;
  }

  var uri;
  var hasRequiredUri;

  function requireUri () {
  	if (hasRequiredUri) return uri;
  	hasRequiredUri = 1;

  	/** @type {import('./uri')} */
  	uri = URIError;
  	return uri;
  }

  var abs;
  var hasRequiredAbs;

  function requireAbs () {
  	if (hasRequiredAbs) return abs;
  	hasRequiredAbs = 1;

  	/** @type {import('./abs')} */
  	abs = Math.abs;
  	return abs;
  }

  var floor;
  var hasRequiredFloor;

  function requireFloor () {
  	if (hasRequiredFloor) return floor;
  	hasRequiredFloor = 1;

  	/** @type {import('./floor')} */
  	floor = Math.floor;
  	return floor;
  }

  var max;
  var hasRequiredMax;

  function requireMax () {
  	if (hasRequiredMax) return max;
  	hasRequiredMax = 1;

  	/** @type {import('./max')} */
  	max = Math.max;
  	return max;
  }

  var min;
  var hasRequiredMin;

  function requireMin () {
  	if (hasRequiredMin) return min;
  	hasRequiredMin = 1;

  	/** @type {import('./min')} */
  	min = Math.min;
  	return min;
  }

  var pow;
  var hasRequiredPow;

  function requirePow () {
  	if (hasRequiredPow) return pow;
  	hasRequiredPow = 1;

  	/** @type {import('./pow')} */
  	pow = Math.pow;
  	return pow;
  }

  var round;
  var hasRequiredRound;

  function requireRound () {
  	if (hasRequiredRound) return round;
  	hasRequiredRound = 1;

  	/** @type {import('./round')} */
  	round = Math.round;
  	return round;
  }

  var _isNaN;
  var hasRequired_isNaN;

  function require_isNaN () {
  	if (hasRequired_isNaN) return _isNaN;
  	hasRequired_isNaN = 1;

  	/** @type {import('./isNaN')} */
  	_isNaN = Number.isNaN || function isNaN(a) {
  		return a !== a;
  	};
  	return _isNaN;
  }

  var sign;
  var hasRequiredSign;

  function requireSign () {
  	if (hasRequiredSign) return sign;
  	hasRequiredSign = 1;

  	var $isNaN = /*@__PURE__*/ require_isNaN();

  	/** @type {import('./sign')} */
  	sign = function sign(number) {
  		if ($isNaN(number) || number === 0) {
  			return number;
  		}
  		return number < 0 ? -1 : 1;
  	};
  	return sign;
  }

  var gOPD;
  var hasRequiredGOPD;

  function requireGOPD () {
  	if (hasRequiredGOPD) return gOPD;
  	hasRequiredGOPD = 1;

  	/** @type {import('./gOPD')} */
  	gOPD = Object.getOwnPropertyDescriptor;
  	return gOPD;
  }

  var gopd;
  var hasRequiredGopd;

  function requireGopd () {
  	if (hasRequiredGopd) return gopd;
  	hasRequiredGopd = 1;

  	/** @type {import('.')} */
  	var $gOPD = /*@__PURE__*/ requireGOPD();

  	if ($gOPD) {
  		try {
  			$gOPD([], 'length');
  		} catch (e) {
  			// IE 8 has a broken gOPD
  			$gOPD = null;
  		}
  	}

  	gopd = $gOPD;
  	return gopd;
  }

  var esDefineProperty;
  var hasRequiredEsDefineProperty;

  function requireEsDefineProperty () {
  	if (hasRequiredEsDefineProperty) return esDefineProperty;
  	hasRequiredEsDefineProperty = 1;

  	/** @type {import('.')} */
  	var $defineProperty = Object.defineProperty || false;
  	if ($defineProperty) {
  		try {
  			$defineProperty({}, 'a', { value: 1 });
  		} catch (e) {
  			// IE 8 has a broken defineProperty
  			$defineProperty = false;
  		}
  	}

  	esDefineProperty = $defineProperty;
  	return esDefineProperty;
  }

  var shams;
  var hasRequiredShams;

  function requireShams () {
  	if (hasRequiredShams) return shams;
  	hasRequiredShams = 1;

  	/** @type {import('./shams')} */
  	/* eslint complexity: [2, 18], max-statements: [2, 33] */
  	shams = function hasSymbols() {
  		if (typeof Symbol !== 'function' || typeof Object.getOwnPropertySymbols !== 'function') { return false; }
  		if (typeof Symbol.iterator === 'symbol') { return true; }

  		/** @type {{ [k in symbol]?: unknown }} */
  		var obj = {};
  		var sym = Symbol('test');
  		var symObj = Object(sym);
  		if (typeof sym === 'string') { return false; }

  		if (Object.prototype.toString.call(sym) !== '[object Symbol]') { return false; }
  		if (Object.prototype.toString.call(symObj) !== '[object Symbol]') { return false; }

  		// temp disabled per https://github.com/ljharb/object.assign/issues/17
  		// if (sym instanceof Symbol) { return false; }
  		// temp disabled per https://github.com/WebReflection/get-own-property-symbols/issues/4
  		// if (!(symObj instanceof Symbol)) { return false; }

  		// if (typeof Symbol.prototype.toString !== 'function') { return false; }
  		// if (String(sym) !== Symbol.prototype.toString.call(sym)) { return false; }

  		var symVal = 42;
  		obj[sym] = symVal;
  		for (var _ in obj) { return false; } // eslint-disable-line no-restricted-syntax, no-unreachable-loop
  		if (typeof Object.keys === 'function' && Object.keys(obj).length !== 0) { return false; }

  		if (typeof Object.getOwnPropertyNames === 'function' && Object.getOwnPropertyNames(obj).length !== 0) { return false; }

  		var syms = Object.getOwnPropertySymbols(obj);
  		if (syms.length !== 1 || syms[0] !== sym) { return false; }

  		if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) { return false; }

  		if (typeof Object.getOwnPropertyDescriptor === 'function') {
  			// eslint-disable-next-line no-extra-parens
  			var descriptor = /** @type {PropertyDescriptor} */ (Object.getOwnPropertyDescriptor(obj, sym));
  			if (descriptor.value !== symVal || descriptor.enumerable !== true) { return false; }
  		}

  		return true;
  	};
  	return shams;
  }

  var hasSymbols;
  var hasRequiredHasSymbols;

  function requireHasSymbols () {
  	if (hasRequiredHasSymbols) return hasSymbols;
  	hasRequiredHasSymbols = 1;

  	var origSymbol = typeof Symbol !== 'undefined' && Symbol;
  	var hasSymbolSham = requireShams();

  	/** @type {import('.')} */
  	hasSymbols = function hasNativeSymbols() {
  		if (typeof origSymbol !== 'function') { return false; }
  		if (typeof Symbol !== 'function') { return false; }
  		if (typeof origSymbol('foo') !== 'symbol') { return false; }
  		if (typeof Symbol('bar') !== 'symbol') { return false; }

  		return hasSymbolSham();
  	};
  	return hasSymbols;
  }

  var Reflect_getPrototypeOf;
  var hasRequiredReflect_getPrototypeOf;

  function requireReflect_getPrototypeOf () {
  	if (hasRequiredReflect_getPrototypeOf) return Reflect_getPrototypeOf;
  	hasRequiredReflect_getPrototypeOf = 1;

  	/** @type {import('./Reflect.getPrototypeOf')} */
  	Reflect_getPrototypeOf = (typeof Reflect !== 'undefined' && Reflect.getPrototypeOf) || null;
  	return Reflect_getPrototypeOf;
  }

  var Object_getPrototypeOf;
  var hasRequiredObject_getPrototypeOf;

  function requireObject_getPrototypeOf () {
  	if (hasRequiredObject_getPrototypeOf) return Object_getPrototypeOf;
  	hasRequiredObject_getPrototypeOf = 1;

  	var $Object = /*@__PURE__*/ requireEsObjectAtoms();

  	/** @type {import('./Object.getPrototypeOf')} */
  	Object_getPrototypeOf = $Object.getPrototypeOf || null;
  	return Object_getPrototypeOf;
  }

  var implementation;
  var hasRequiredImplementation;

  function requireImplementation () {
  	if (hasRequiredImplementation) return implementation;
  	hasRequiredImplementation = 1;

  	/* eslint no-invalid-this: 1 */

  	var ERROR_MESSAGE = 'Function.prototype.bind called on incompatible ';
  	var toStr = Object.prototype.toString;
  	var max = Math.max;
  	var funcType = '[object Function]';

  	var concatty = function concatty(a, b) {
  	    var arr = [];

  	    for (var i = 0; i < a.length; i += 1) {
  	        arr[i] = a[i];
  	    }
  	    for (var j = 0; j < b.length; j += 1) {
  	        arr[j + a.length] = b[j];
  	    }

  	    return arr;
  	};

  	var slicy = function slicy(arrLike, offset) {
  	    var arr = [];
  	    for (var i = offset, j = 0; i < arrLike.length; i += 1, j += 1) {
  	        arr[j] = arrLike[i];
  	    }
  	    return arr;
  	};

  	var joiny = function (arr, joiner) {
  	    var str = '';
  	    for (var i = 0; i < arr.length; i += 1) {
  	        str += arr[i];
  	        if (i + 1 < arr.length) {
  	            str += joiner;
  	        }
  	    }
  	    return str;
  	};

  	implementation = function bind(that) {
  	    var target = this;
  	    if (typeof target !== 'function' || toStr.apply(target) !== funcType) {
  	        throw new TypeError(ERROR_MESSAGE + target);
  	    }
  	    var args = slicy(arguments, 1);

  	    var bound;
  	    var binder = function () {
  	        if (this instanceof bound) {
  	            var result = target.apply(
  	                this,
  	                concatty(args, arguments)
  	            );
  	            if (Object(result) === result) {
  	                return result;
  	            }
  	            return this;
  	        }
  	        return target.apply(
  	            that,
  	            concatty(args, arguments)
  	        );

  	    };

  	    var boundLength = max(0, target.length - args.length);
  	    var boundArgs = [];
  	    for (var i = 0; i < boundLength; i++) {
  	        boundArgs[i] = '$' + i;
  	    }

  	    bound = Function('binder', 'return function (' + joiny(boundArgs, ',') + '){ return binder.apply(this,arguments); }')(binder);

  	    if (target.prototype) {
  	        var Empty = function Empty() {};
  	        Empty.prototype = target.prototype;
  	        bound.prototype = new Empty();
  	        Empty.prototype = null;
  	    }

  	    return bound;
  	};
  	return implementation;
  }

  var functionBind;
  var hasRequiredFunctionBind;

  function requireFunctionBind () {
  	if (hasRequiredFunctionBind) return functionBind;
  	hasRequiredFunctionBind = 1;

  	var implementation = requireImplementation();

  	functionBind = Function.prototype.bind || implementation;
  	return functionBind;
  }

  var functionCall;
  var hasRequiredFunctionCall;

  function requireFunctionCall () {
  	if (hasRequiredFunctionCall) return functionCall;
  	hasRequiredFunctionCall = 1;

  	/** @type {import('./functionCall')} */
  	functionCall = Function.prototype.call;
  	return functionCall;
  }

  var functionApply;
  var hasRequiredFunctionApply;

  function requireFunctionApply () {
  	if (hasRequiredFunctionApply) return functionApply;
  	hasRequiredFunctionApply = 1;

  	/** @type {import('./functionApply')} */
  	functionApply = Function.prototype.apply;
  	return functionApply;
  }

  var reflectApply;
  var hasRequiredReflectApply;

  function requireReflectApply () {
  	if (hasRequiredReflectApply) return reflectApply;
  	hasRequiredReflectApply = 1;

  	/** @type {import('./reflectApply')} */
  	reflectApply = typeof Reflect !== 'undefined' && Reflect && Reflect.apply;
  	return reflectApply;
  }

  var actualApply;
  var hasRequiredActualApply;

  function requireActualApply () {
  	if (hasRequiredActualApply) return actualApply;
  	hasRequiredActualApply = 1;

  	var bind = requireFunctionBind();

  	var $apply = requireFunctionApply();
  	var $call = requireFunctionCall();
  	var $reflectApply = requireReflectApply();

  	/** @type {import('./actualApply')} */
  	actualApply = $reflectApply || bind.call($call, $apply);
  	return actualApply;
  }

  var callBindApplyHelpers;
  var hasRequiredCallBindApplyHelpers;

  function requireCallBindApplyHelpers () {
  	if (hasRequiredCallBindApplyHelpers) return callBindApplyHelpers;
  	hasRequiredCallBindApplyHelpers = 1;

  	var bind = requireFunctionBind();
  	var $TypeError = /*@__PURE__*/ requireType();

  	var $call = requireFunctionCall();
  	var $actualApply = requireActualApply();

  	/** @type {import('.')} */
  	callBindApplyHelpers = function callBindBasic(args) {
  		if (args.length < 1 || typeof args[0] !== 'function') {
  			throw new $TypeError('a function is required');
  		}
  		return $actualApply(bind, $call, args);
  	};
  	return callBindApplyHelpers;
  }

  var get;
  var hasRequiredGet;

  function requireGet () {
  	if (hasRequiredGet) return get;
  	hasRequiredGet = 1;

  	var callBind = requireCallBindApplyHelpers();
  	var gOPD = /*@__PURE__*/ requireGopd();

  	var hasProtoAccessor;
  	try {
  		// eslint-disable-next-line no-extra-parens, no-proto
  		hasProtoAccessor = /** @type {{ __proto__?: typeof Array.prototype }} */ ([]).__proto__ === Array.prototype;
  	} catch (e) {
  		if (!e || typeof e !== 'object' || !('code' in e) || e.code !== 'ERR_PROTO_ACCESS') {
  			throw e;
  		}
  	}

  	// eslint-disable-next-line no-extra-parens
  	var desc = !!hasProtoAccessor && gOPD && gOPD(Object.prototype, /** @type {keyof typeof Object.prototype} */ ('__proto__'));

  	var $Object = Object;
  	var $getPrototypeOf = $Object.getPrototypeOf;

  	/** @type {import('./get')} */
  	get = desc && typeof desc.get === 'function'
  		? callBind([desc.get])
  		: typeof $getPrototypeOf === 'function'
  			? /** @type {import('./get')} */ function getDunder(value) {
  				// eslint-disable-next-line eqeqeq
  				return $getPrototypeOf(value == null ? value : $Object(value));
  			}
  			: false;
  	return get;
  }

  var getProto;
  var hasRequiredGetProto;

  function requireGetProto () {
  	if (hasRequiredGetProto) return getProto;
  	hasRequiredGetProto = 1;

  	var reflectGetProto = requireReflect_getPrototypeOf();
  	var originalGetProto = requireObject_getPrototypeOf();

  	var getDunderProto = /*@__PURE__*/ requireGet();

  	/** @type {import('.')} */
  	getProto = reflectGetProto
  		? function getProto(O) {
  			// @ts-expect-error TS can't narrow inside a closure, for some reason
  			return reflectGetProto(O);
  		}
  		: originalGetProto
  			? function getProto(O) {
  				if (!O || (typeof O !== 'object' && typeof O !== 'function')) {
  					throw new TypeError('getProto: not an object');
  				}
  				// @ts-expect-error TS can't narrow inside a closure, for some reason
  				return originalGetProto(O);
  			}
  			: getDunderProto
  				? function getProto(O) {
  					// @ts-expect-error TS can't narrow inside a closure, for some reason
  					return getDunderProto(O);
  				}
  				: null;
  	return getProto;
  }

  var hasown;
  var hasRequiredHasown;

  function requireHasown () {
  	if (hasRequiredHasown) return hasown;
  	hasRequiredHasown = 1;

  	var call = Function.prototype.call;
  	var $hasOwn = Object.prototype.hasOwnProperty;
  	var bind = requireFunctionBind();

  	/** @type {import('.')} */
  	hasown = bind.call(call, $hasOwn);
  	return hasown;
  }

  var getIntrinsic;
  var hasRequiredGetIntrinsic;

  function requireGetIntrinsic () {
  	if (hasRequiredGetIntrinsic) return getIntrinsic;
  	hasRequiredGetIntrinsic = 1;

  	var undefined$1;

  	var $Object = /*@__PURE__*/ requireEsObjectAtoms();

  	var $Error = /*@__PURE__*/ requireEsErrors();
  	var $EvalError = /*@__PURE__*/ require_eval();
  	var $RangeError = /*@__PURE__*/ requireRange();
  	var $ReferenceError = /*@__PURE__*/ requireRef();
  	var $SyntaxError = /*@__PURE__*/ requireSyntax();
  	var $TypeError = /*@__PURE__*/ requireType();
  	var $URIError = /*@__PURE__*/ requireUri();

  	var abs = /*@__PURE__*/ requireAbs();
  	var floor = /*@__PURE__*/ requireFloor();
  	var max = /*@__PURE__*/ requireMax();
  	var min = /*@__PURE__*/ requireMin();
  	var pow = /*@__PURE__*/ requirePow();
  	var round = /*@__PURE__*/ requireRound();
  	var sign = /*@__PURE__*/ requireSign();

  	var $Function = Function;

  	// eslint-disable-next-line consistent-return
  	var getEvalledConstructor = function (expressionSyntax) {
  		try {
  			return $Function('"use strict"; return (' + expressionSyntax + ').constructor;')();
  		} catch (e) {}
  	};

  	var $gOPD = /*@__PURE__*/ requireGopd();
  	var $defineProperty = /*@__PURE__*/ requireEsDefineProperty();

  	var throwTypeError = function () {
  		throw new $TypeError();
  	};
  	var ThrowTypeError = $gOPD
  		? (function () {
  			try {
  				// eslint-disable-next-line no-unused-expressions, no-caller, no-restricted-properties
  				arguments.callee; // IE 8 does not throw here
  				return throwTypeError;
  			} catch (calleeThrows) {
  				try {
  					// IE 8 throws on Object.getOwnPropertyDescriptor(arguments, '')
  					return $gOPD(arguments, 'callee').get;
  				} catch (gOPDthrows) {
  					return throwTypeError;
  				}
  			}
  		}())
  		: throwTypeError;

  	var hasSymbols = requireHasSymbols()();

  	var getProto = requireGetProto();
  	var $ObjectGPO = requireObject_getPrototypeOf();
  	var $ReflectGPO = requireReflect_getPrototypeOf();

  	var $apply = requireFunctionApply();
  	var $call = requireFunctionCall();

  	var needsEval = {};

  	var TypedArray = typeof Uint8Array === 'undefined' || !getProto ? undefined$1 : getProto(Uint8Array);

  	var INTRINSICS = {
  		__proto__: null,
  		'%AggregateError%': typeof AggregateError === 'undefined' ? undefined$1 : AggregateError,
  		'%Array%': Array,
  		'%ArrayBuffer%': typeof ArrayBuffer === 'undefined' ? undefined$1 : ArrayBuffer,
  		'%ArrayIteratorPrototype%': hasSymbols && getProto ? getProto([][Symbol.iterator]()) : undefined$1,
  		'%AsyncFromSyncIteratorPrototype%': undefined$1,
  		'%AsyncFunction%': needsEval,
  		'%AsyncGenerator%': needsEval,
  		'%AsyncGeneratorFunction%': needsEval,
  		'%AsyncIteratorPrototype%': needsEval,
  		'%Atomics%': typeof Atomics === 'undefined' ? undefined$1 : Atomics,
  		'%BigInt%': typeof BigInt === 'undefined' ? undefined$1 : BigInt,
  		'%BigInt64Array%': typeof BigInt64Array === 'undefined' ? undefined$1 : BigInt64Array,
  		'%BigUint64Array%': typeof BigUint64Array === 'undefined' ? undefined$1 : BigUint64Array,
  		'%Boolean%': Boolean,
  		'%DataView%': typeof DataView === 'undefined' ? undefined$1 : DataView,
  		'%Date%': Date,
  		'%decodeURI%': decodeURI,
  		'%decodeURIComponent%': decodeURIComponent,
  		'%encodeURI%': encodeURI,
  		'%encodeURIComponent%': encodeURIComponent,
  		'%Error%': $Error,
  		'%eval%': eval, // eslint-disable-line no-eval
  		'%EvalError%': $EvalError,
  		'%Float32Array%': typeof Float32Array === 'undefined' ? undefined$1 : Float32Array,
  		'%Float64Array%': typeof Float64Array === 'undefined' ? undefined$1 : Float64Array,
  		'%FinalizationRegistry%': typeof FinalizationRegistry === 'undefined' ? undefined$1 : FinalizationRegistry,
  		'%Function%': $Function,
  		'%GeneratorFunction%': needsEval,
  		'%Int8Array%': typeof Int8Array === 'undefined' ? undefined$1 : Int8Array,
  		'%Int16Array%': typeof Int16Array === 'undefined' ? undefined$1 : Int16Array,
  		'%Int32Array%': typeof Int32Array === 'undefined' ? undefined$1 : Int32Array,
  		'%isFinite%': isFinite,
  		'%isNaN%': isNaN,
  		'%IteratorPrototype%': hasSymbols && getProto ? getProto(getProto([][Symbol.iterator]())) : undefined$1,
  		'%JSON%': typeof JSON === 'object' ? JSON : undefined$1,
  		'%Map%': typeof Map === 'undefined' ? undefined$1 : Map,
  		'%MapIteratorPrototype%': typeof Map === 'undefined' || !hasSymbols || !getProto ? undefined$1 : getProto(new Map()[Symbol.iterator]()),
  		'%Math%': Math,
  		'%Number%': Number,
  		'%Object%': $Object,
  		'%Object.getOwnPropertyDescriptor%': $gOPD,
  		'%parseFloat%': parseFloat,
  		'%parseInt%': parseInt,
  		'%Promise%': typeof Promise === 'undefined' ? undefined$1 : Promise,
  		'%Proxy%': typeof Proxy === 'undefined' ? undefined$1 : Proxy,
  		'%RangeError%': $RangeError,
  		'%ReferenceError%': $ReferenceError,
  		'%Reflect%': typeof Reflect === 'undefined' ? undefined$1 : Reflect,
  		'%RegExp%': RegExp,
  		'%Set%': typeof Set === 'undefined' ? undefined$1 : Set,
  		'%SetIteratorPrototype%': typeof Set === 'undefined' || !hasSymbols || !getProto ? undefined$1 : getProto(new Set()[Symbol.iterator]()),
  		'%SharedArrayBuffer%': typeof SharedArrayBuffer === 'undefined' ? undefined$1 : SharedArrayBuffer,
  		'%String%': String,
  		'%StringIteratorPrototype%': hasSymbols && getProto ? getProto(''[Symbol.iterator]()) : undefined$1,
  		'%Symbol%': hasSymbols ? Symbol : undefined$1,
  		'%SyntaxError%': $SyntaxError,
  		'%ThrowTypeError%': ThrowTypeError,
  		'%TypedArray%': TypedArray,
  		'%TypeError%': $TypeError,
  		'%Uint8Array%': typeof Uint8Array === 'undefined' ? undefined$1 : Uint8Array,
  		'%Uint8ClampedArray%': typeof Uint8ClampedArray === 'undefined' ? undefined$1 : Uint8ClampedArray,
  		'%Uint16Array%': typeof Uint16Array === 'undefined' ? undefined$1 : Uint16Array,
  		'%Uint32Array%': typeof Uint32Array === 'undefined' ? undefined$1 : Uint32Array,
  		'%URIError%': $URIError,
  		'%WeakMap%': typeof WeakMap === 'undefined' ? undefined$1 : WeakMap,
  		'%WeakRef%': typeof WeakRef === 'undefined' ? undefined$1 : WeakRef,
  		'%WeakSet%': typeof WeakSet === 'undefined' ? undefined$1 : WeakSet,

  		'%Function.prototype.call%': $call,
  		'%Function.prototype.apply%': $apply,
  		'%Object.defineProperty%': $defineProperty,
  		'%Object.getPrototypeOf%': $ObjectGPO,
  		'%Math.abs%': abs,
  		'%Math.floor%': floor,
  		'%Math.max%': max,
  		'%Math.min%': min,
  		'%Math.pow%': pow,
  		'%Math.round%': round,
  		'%Math.sign%': sign,
  		'%Reflect.getPrototypeOf%': $ReflectGPO
  	};

  	if (getProto) {
  		try {
  			null.error; // eslint-disable-line no-unused-expressions
  		} catch (e) {
  			// https://github.com/tc39/proposal-shadowrealm/pull/384#issuecomment-1364264229
  			var errorProto = getProto(getProto(e));
  			INTRINSICS['%Error.prototype%'] = errorProto;
  		}
  	}

  	var doEval = function doEval(name) {
  		var value;
  		if (name === '%AsyncFunction%') {
  			value = getEvalledConstructor('async function () {}');
  		} else if (name === '%GeneratorFunction%') {
  			value = getEvalledConstructor('function* () {}');
  		} else if (name === '%AsyncGeneratorFunction%') {
  			value = getEvalledConstructor('async function* () {}');
  		} else if (name === '%AsyncGenerator%') {
  			var fn = doEval('%AsyncGeneratorFunction%');
  			if (fn) {
  				value = fn.prototype;
  			}
  		} else if (name === '%AsyncIteratorPrototype%') {
  			var gen = doEval('%AsyncGenerator%');
  			if (gen && getProto) {
  				value = getProto(gen.prototype);
  			}
  		}

  		INTRINSICS[name] = value;

  		return value;
  	};

  	var LEGACY_ALIASES = {
  		__proto__: null,
  		'%ArrayBufferPrototype%': ['ArrayBuffer', 'prototype'],
  		'%ArrayPrototype%': ['Array', 'prototype'],
  		'%ArrayProto_entries%': ['Array', 'prototype', 'entries'],
  		'%ArrayProto_forEach%': ['Array', 'prototype', 'forEach'],
  		'%ArrayProto_keys%': ['Array', 'prototype', 'keys'],
  		'%ArrayProto_values%': ['Array', 'prototype', 'values'],
  		'%AsyncFunctionPrototype%': ['AsyncFunction', 'prototype'],
  		'%AsyncGenerator%': ['AsyncGeneratorFunction', 'prototype'],
  		'%AsyncGeneratorPrototype%': ['AsyncGeneratorFunction', 'prototype', 'prototype'],
  		'%BooleanPrototype%': ['Boolean', 'prototype'],
  		'%DataViewPrototype%': ['DataView', 'prototype'],
  		'%DatePrototype%': ['Date', 'prototype'],
  		'%ErrorPrototype%': ['Error', 'prototype'],
  		'%EvalErrorPrototype%': ['EvalError', 'prototype'],
  		'%Float32ArrayPrototype%': ['Float32Array', 'prototype'],
  		'%Float64ArrayPrototype%': ['Float64Array', 'prototype'],
  		'%FunctionPrototype%': ['Function', 'prototype'],
  		'%Generator%': ['GeneratorFunction', 'prototype'],
  		'%GeneratorPrototype%': ['GeneratorFunction', 'prototype', 'prototype'],
  		'%Int8ArrayPrototype%': ['Int8Array', 'prototype'],
  		'%Int16ArrayPrototype%': ['Int16Array', 'prototype'],
  		'%Int32ArrayPrototype%': ['Int32Array', 'prototype'],
  		'%JSONParse%': ['JSON', 'parse'],
  		'%JSONStringify%': ['JSON', 'stringify'],
  		'%MapPrototype%': ['Map', 'prototype'],
  		'%NumberPrototype%': ['Number', 'prototype'],
  		'%ObjectPrototype%': ['Object', 'prototype'],
  		'%ObjProto_toString%': ['Object', 'prototype', 'toString'],
  		'%ObjProto_valueOf%': ['Object', 'prototype', 'valueOf'],
  		'%PromisePrototype%': ['Promise', 'prototype'],
  		'%PromiseProto_then%': ['Promise', 'prototype', 'then'],
  		'%Promise_all%': ['Promise', 'all'],
  		'%Promise_reject%': ['Promise', 'reject'],
  		'%Promise_resolve%': ['Promise', 'resolve'],
  		'%RangeErrorPrototype%': ['RangeError', 'prototype'],
  		'%ReferenceErrorPrototype%': ['ReferenceError', 'prototype'],
  		'%RegExpPrototype%': ['RegExp', 'prototype'],
  		'%SetPrototype%': ['Set', 'prototype'],
  		'%SharedArrayBufferPrototype%': ['SharedArrayBuffer', 'prototype'],
  		'%StringPrototype%': ['String', 'prototype'],
  		'%SymbolPrototype%': ['Symbol', 'prototype'],
  		'%SyntaxErrorPrototype%': ['SyntaxError', 'prototype'],
  		'%TypedArrayPrototype%': ['TypedArray', 'prototype'],
  		'%TypeErrorPrototype%': ['TypeError', 'prototype'],
  		'%Uint8ArrayPrototype%': ['Uint8Array', 'prototype'],
  		'%Uint8ClampedArrayPrototype%': ['Uint8ClampedArray', 'prototype'],
  		'%Uint16ArrayPrototype%': ['Uint16Array', 'prototype'],
  		'%Uint32ArrayPrototype%': ['Uint32Array', 'prototype'],
  		'%URIErrorPrototype%': ['URIError', 'prototype'],
  		'%WeakMapPrototype%': ['WeakMap', 'prototype'],
  		'%WeakSetPrototype%': ['WeakSet', 'prototype']
  	};

  	var bind = requireFunctionBind();
  	var hasOwn = /*@__PURE__*/ requireHasown();
  	var $concat = bind.call($call, Array.prototype.concat);
  	var $spliceApply = bind.call($apply, Array.prototype.splice);
  	var $replace = bind.call($call, String.prototype.replace);
  	var $strSlice = bind.call($call, String.prototype.slice);
  	var $exec = bind.call($call, RegExp.prototype.exec);

  	/* adapted from https://github.com/lodash/lodash/blob/4.17.15/dist/lodash.js#L6735-L6744 */
  	var rePropName = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
  	var reEscapeChar = /\\(\\)?/g; /** Used to match backslashes in property paths. */
  	var stringToPath = function stringToPath(string) {
  		var first = $strSlice(string, 0, 1);
  		var last = $strSlice(string, -1);
  		if (first === '%' && last !== '%') {
  			throw new $SyntaxError('invalid intrinsic syntax, expected closing `%`');
  		} else if (last === '%' && first !== '%') {
  			throw new $SyntaxError('invalid intrinsic syntax, expected opening `%`');
  		}
  		var result = [];
  		$replace(string, rePropName, function (match, number, quote, subString) {
  			result[result.length] = quote ? $replace(subString, reEscapeChar, '$1') : number || match;
  		});
  		return result;
  	};
  	/* end adaptation */

  	var getBaseIntrinsic = function getBaseIntrinsic(name, allowMissing) {
  		var intrinsicName = name;
  		var alias;
  		if (hasOwn(LEGACY_ALIASES, intrinsicName)) {
  			alias = LEGACY_ALIASES[intrinsicName];
  			intrinsicName = '%' + alias[0] + '%';
  		}

  		if (hasOwn(INTRINSICS, intrinsicName)) {
  			var value = INTRINSICS[intrinsicName];
  			if (value === needsEval) {
  				value = doEval(intrinsicName);
  			}
  			if (typeof value === 'undefined' && !allowMissing) {
  				throw new $TypeError('intrinsic ' + name + ' exists, but is not available. Please file an issue!');
  			}

  			return {
  				alias: alias,
  				name: intrinsicName,
  				value: value
  			};
  		}

  		throw new $SyntaxError('intrinsic ' + name + ' does not exist!');
  	};

  	getIntrinsic = function GetIntrinsic(name, allowMissing) {
  		if (typeof name !== 'string' || name.length === 0) {
  			throw new $TypeError('intrinsic name must be a non-empty string');
  		}
  		if (arguments.length > 1 && typeof allowMissing !== 'boolean') {
  			throw new $TypeError('"allowMissing" argument must be a boolean');
  		}

  		if ($exec(/^%?[^%]*%?$/, name) === null) {
  			throw new $SyntaxError('`%` may not be present anywhere but at the beginning and end of the intrinsic name');
  		}
  		var parts = stringToPath(name);
  		var intrinsicBaseName = parts.length > 0 ? parts[0] : '';

  		var intrinsic = getBaseIntrinsic('%' + intrinsicBaseName + '%', allowMissing);
  		var intrinsicRealName = intrinsic.name;
  		var value = intrinsic.value;
  		var skipFurtherCaching = false;

  		var alias = intrinsic.alias;
  		if (alias) {
  			intrinsicBaseName = alias[0];
  			$spliceApply(parts, $concat([0, 1], alias));
  		}

  		for (var i = 1, isOwn = true; i < parts.length; i += 1) {
  			var part = parts[i];
  			var first = $strSlice(part, 0, 1);
  			var last = $strSlice(part, -1);
  			if (
  				(
  					(first === '"' || first === "'" || first === '`')
  					|| (last === '"' || last === "'" || last === '`')
  				)
  				&& first !== last
  			) {
  				throw new $SyntaxError('property names with quotes must have matching quotes');
  			}
  			if (part === 'constructor' || !isOwn) {
  				skipFurtherCaching = true;
  			}

  			intrinsicBaseName += '.' + part;
  			intrinsicRealName = '%' + intrinsicBaseName + '%';

  			if (hasOwn(INTRINSICS, intrinsicRealName)) {
  				value = INTRINSICS[intrinsicRealName];
  			} else if (value != null) {
  				if (!(part in value)) {
  					if (!allowMissing) {
  						throw new $TypeError('base intrinsic for ' + name + ' exists, but the property is not available.');
  					}
  					return void 0;
  				}
  				if ($gOPD && (i + 1) >= parts.length) {
  					var desc = $gOPD(value, part);
  					isOwn = !!desc;

  					// By convention, when a data property is converted to an accessor
  					// property to emulate a data property that does not suffer from
  					// the override mistake, that accessor's getter is marked with
  					// an `originalValue` property. Here, when we detect this, we
  					// uphold the illusion by pretending to see that original data
  					// property, i.e., returning the value rather than the getter
  					// itself.
  					if (isOwn && 'get' in desc && !('originalValue' in desc.get)) {
  						value = desc.get;
  					} else {
  						value = value[part];
  					}
  				} else {
  					isOwn = hasOwn(value, part);
  					value = value[part];
  				}

  				if (isOwn && !skipFurtherCaching) {
  					INTRINSICS[intrinsicRealName] = value;
  				}
  			}
  		}
  		return value;
  	};
  	return getIntrinsic;
  }

  var callBound;
  var hasRequiredCallBound;

  function requireCallBound () {
  	if (hasRequiredCallBound) return callBound;
  	hasRequiredCallBound = 1;

  	var GetIntrinsic = /*@__PURE__*/ requireGetIntrinsic();

  	var callBindBasic = requireCallBindApplyHelpers();

  	/** @type {(thisArg: string, searchString: string, position?: number) => number} */
  	var $indexOf = callBindBasic([GetIntrinsic('%String.prototype.indexOf%')]);

  	/** @type {import('.')} */
  	callBound = function callBoundIntrinsic(name, allowMissing) {
  		// eslint-disable-next-line no-extra-parens
  		var intrinsic = /** @type {Parameters<typeof callBindBasic>[0][0]} */ (GetIntrinsic(name, !!allowMissing));
  		if (typeof intrinsic === 'function' && $indexOf(name, '.prototype.') > -1) {
  			return callBindBasic([intrinsic]);
  		}
  		return intrinsic;
  	};
  	return callBound;
  }

  var sideChannelMap;
  var hasRequiredSideChannelMap;

  function requireSideChannelMap () {
  	if (hasRequiredSideChannelMap) return sideChannelMap;
  	hasRequiredSideChannelMap = 1;

  	var GetIntrinsic = /*@__PURE__*/ requireGetIntrinsic();
  	var callBound = /*@__PURE__*/ requireCallBound();
  	var inspect = /*@__PURE__*/ requireObjectInspect();

  	var $TypeError = /*@__PURE__*/ requireType();
  	var $Map = GetIntrinsic('%Map%', true);

  	/** @type {<K, V>(thisArg: Map<K, V>, key: K) => V} */
  	var $mapGet = callBound('Map.prototype.get', true);
  	/** @type {<K, V>(thisArg: Map<K, V>, key: K, value: V) => void} */
  	var $mapSet = callBound('Map.prototype.set', true);
  	/** @type {<K, V>(thisArg: Map<K, V>, key: K) => boolean} */
  	var $mapHas = callBound('Map.prototype.has', true);
  	/** @type {<K, V>(thisArg: Map<K, V>, key: K) => boolean} */
  	var $mapDelete = callBound('Map.prototype.delete', true);
  	/** @type {<K, V>(thisArg: Map<K, V>) => number} */
  	var $mapSize = callBound('Map.prototype.size', true);

  	/** @type {import('.')} */
  	sideChannelMap = !!$Map && /** @type {Exclude<import('.'), false>} */ function getSideChannelMap() {
  		/** @typedef {ReturnType<typeof getSideChannelMap>} Channel */
  		/** @typedef {Parameters<Channel['get']>[0]} K */
  		/** @typedef {Parameters<Channel['set']>[1]} V */

  		/** @type {Map<K, V> | undefined} */ var $m;

  		/** @type {Channel} */
  		var channel = {
  			assert: function (key) {
  				if (!channel.has(key)) {
  					throw new $TypeError('Side channel does not contain ' + inspect(key));
  				}
  			},
  			'delete': function (key) {
  				if ($m) {
  					var result = $mapDelete($m, key);
  					if ($mapSize($m) === 0) {
  						$m = void 0;
  					}
  					return result;
  				}
  				return false;
  			},
  			get: function (key) { // eslint-disable-line consistent-return
  				if ($m) {
  					return $mapGet($m, key);
  				}
  			},
  			has: function (key) {
  				if ($m) {
  					return $mapHas($m, key);
  				}
  				return false;
  			},
  			set: function (key, value) {
  				if (!$m) {
  					// @ts-expect-error TS can't handle narrowing a variable inside a closure
  					$m = new $Map();
  				}
  				$mapSet($m, key, value);
  			}
  		};

  		// @ts-expect-error TODO: figure out why TS is erroring here
  		return channel;
  	};
  	return sideChannelMap;
  }

  var sideChannelWeakmap;
  var hasRequiredSideChannelWeakmap;

  function requireSideChannelWeakmap () {
  	if (hasRequiredSideChannelWeakmap) return sideChannelWeakmap;
  	hasRequiredSideChannelWeakmap = 1;

  	var GetIntrinsic = /*@__PURE__*/ requireGetIntrinsic();
  	var callBound = /*@__PURE__*/ requireCallBound();
  	var inspect = /*@__PURE__*/ requireObjectInspect();
  	var getSideChannelMap = requireSideChannelMap();

  	var $TypeError = /*@__PURE__*/ requireType();
  	var $WeakMap = GetIntrinsic('%WeakMap%', true);

  	/** @type {<K extends object, V>(thisArg: WeakMap<K, V>, key: K) => V} */
  	var $weakMapGet = callBound('WeakMap.prototype.get', true);
  	/** @type {<K extends object, V>(thisArg: WeakMap<K, V>, key: K, value: V) => void} */
  	var $weakMapSet = callBound('WeakMap.prototype.set', true);
  	/** @type {<K extends object, V>(thisArg: WeakMap<K, V>, key: K) => boolean} */
  	var $weakMapHas = callBound('WeakMap.prototype.has', true);
  	/** @type {<K extends object, V>(thisArg: WeakMap<K, V>, key: K) => boolean} */
  	var $weakMapDelete = callBound('WeakMap.prototype.delete', true);

  	/** @type {import('.')} */
  	sideChannelWeakmap = $WeakMap
  		? /** @type {Exclude<import('.'), false>} */ function getSideChannelWeakMap() {
  			/** @typedef {ReturnType<typeof getSideChannelWeakMap>} Channel */
  			/** @typedef {Parameters<Channel['get']>[0]} K */
  			/** @typedef {Parameters<Channel['set']>[1]} V */

  			/** @type {WeakMap<K & object, V> | undefined} */ var $wm;
  			/** @type {Channel | undefined} */ var $m;

  			/** @type {Channel} */
  			var channel = {
  				assert: function (key) {
  					if (!channel.has(key)) {
  						throw new $TypeError('Side channel does not contain ' + inspect(key));
  					}
  				},
  				'delete': function (key) {
  					if ($WeakMap && key && (typeof key === 'object' || typeof key === 'function')) {
  						if ($wm) {
  							return $weakMapDelete($wm, key);
  						}
  					} else if (getSideChannelMap) {
  						if ($m) {
  							return $m['delete'](key);
  						}
  					}
  					return false;
  				},
  				get: function (key) {
  					if ($WeakMap && key && (typeof key === 'object' || typeof key === 'function')) {
  						if ($wm) {
  							return $weakMapGet($wm, key);
  						}
  					}
  					return $m && $m.get(key);
  				},
  				has: function (key) {
  					if ($WeakMap && key && (typeof key === 'object' || typeof key === 'function')) {
  						if ($wm) {
  							return $weakMapHas($wm, key);
  						}
  					}
  					return !!$m && $m.has(key);
  				},
  				set: function (key, value) {
  					if ($WeakMap && key && (typeof key === 'object' || typeof key === 'function')) {
  						if (!$wm) {
  							$wm = new $WeakMap();
  						}
  						$weakMapSet($wm, key, value);
  					} else if (getSideChannelMap) {
  						if (!$m) {
  							$m = getSideChannelMap();
  						}
  						// eslint-disable-next-line no-extra-parens
  						/** @type {NonNullable<typeof $m>} */ ($m).set(key, value);
  					}
  				}
  			};

  			// @ts-expect-error TODO: figure out why this is erroring
  			return channel;
  		}
  		: getSideChannelMap;
  	return sideChannelWeakmap;
  }

  var sideChannel;
  var hasRequiredSideChannel;

  function requireSideChannel () {
  	if (hasRequiredSideChannel) return sideChannel;
  	hasRequiredSideChannel = 1;

  	var $TypeError = /*@__PURE__*/ requireType();
  	var inspect = /*@__PURE__*/ requireObjectInspect();
  	var getSideChannelList = requireSideChannelList();
  	var getSideChannelMap = requireSideChannelMap();
  	var getSideChannelWeakMap = requireSideChannelWeakmap();

  	var makeChannel = getSideChannelWeakMap || getSideChannelMap || getSideChannelList;

  	/** @type {import('.')} */
  	sideChannel = function getSideChannel() {
  		/** @typedef {ReturnType<typeof getSideChannel>} Channel */

  		/** @type {Channel | undefined} */ var $channelData;

  		/** @type {Channel} */
  		var channel = {
  			assert: function (key) {
  				if (!channel.has(key)) {
  					throw new $TypeError('Side channel does not contain ' + inspect(key));
  				}
  			},
  			'delete': function (key) {
  				return !!$channelData && $channelData['delete'](key);
  			},
  			get: function (key) {
  				return $channelData && $channelData.get(key);
  			},
  			has: function (key) {
  				return !!$channelData && $channelData.has(key);
  			},
  			set: function (key, value) {
  				if (!$channelData) {
  					$channelData = makeChannel();
  				}

  				$channelData.set(key, value);
  			}
  		};
  		// @ts-expect-error TODO: figure out why this is erroring
  		return channel;
  	};
  	return sideChannel;
  }

  var formats;
  var hasRequiredFormats;

  function requireFormats () {
  	if (hasRequiredFormats) return formats;
  	hasRequiredFormats = 1;

  	var replace = String.prototype.replace;
  	var percentTwenties = /%20/g;

  	var Format = {
  	    RFC1738: 'RFC1738',
  	    RFC3986: 'RFC3986'
  	};

  	formats = {
  	    'default': Format.RFC3986,
  	    formatters: {
  	        RFC1738: function (value) {
  	            return replace.call(value, percentTwenties, '+');
  	        },
  	        RFC3986: function (value) {
  	            return String(value);
  	        }
  	    },
  	    RFC1738: Format.RFC1738,
  	    RFC3986: Format.RFC3986
  	};
  	return formats;
  }

  var utils;
  var hasRequiredUtils;

  function requireUtils () {
  	if (hasRequiredUtils) return utils;
  	hasRequiredUtils = 1;

  	var formats = /*@__PURE__*/ requireFormats();

  	var has = Object.prototype.hasOwnProperty;
  	var isArray = Array.isArray;

  	var hexTable = (function () {
  	    var array = [];
  	    for (var i = 0; i < 256; ++i) {
  	        array.push('%' + ((i < 16 ? '0' : '') + i.toString(16)).toUpperCase());
  	    }

  	    return array;
  	}());

  	var compactQueue = function compactQueue(queue) {
  	    while (queue.length > 1) {
  	        var item = queue.pop();
  	        var obj = item.obj[item.prop];

  	        if (isArray(obj)) {
  	            var compacted = [];

  	            for (var j = 0; j < obj.length; ++j) {
  	                if (typeof obj[j] !== 'undefined') {
  	                    compacted.push(obj[j]);
  	                }
  	            }

  	            item.obj[item.prop] = compacted;
  	        }
  	    }
  	};

  	var arrayToObject = function arrayToObject(source, options) {
  	    var obj = options && options.plainObjects ? { __proto__: null } : {};
  	    for (var i = 0; i < source.length; ++i) {
  	        if (typeof source[i] !== 'undefined') {
  	            obj[i] = source[i];
  	        }
  	    }

  	    return obj;
  	};

  	var merge = function merge(target, source, options) {
  	    /* eslint no-param-reassign: 0 */
  	    if (!source) {
  	        return target;
  	    }

  	    if (typeof source !== 'object' && typeof source !== 'function') {
  	        if (isArray(target)) {
  	            target.push(source);
  	        } else if (target && typeof target === 'object') {
  	            if (
  	                (options && (options.plainObjects || options.allowPrototypes))
  	                || !has.call(Object.prototype, source)
  	            ) {
  	                target[source] = true;
  	            }
  	        } else {
  	            return [target, source];
  	        }

  	        return target;
  	    }

  	    if (!target || typeof target !== 'object') {
  	        return [target].concat(source);
  	    }

  	    var mergeTarget = target;
  	    if (isArray(target) && !isArray(source)) {
  	        mergeTarget = arrayToObject(target, options);
  	    }

  	    if (isArray(target) && isArray(source)) {
  	        source.forEach(function (item, i) {
  	            if (has.call(target, i)) {
  	                var targetItem = target[i];
  	                if (targetItem && typeof targetItem === 'object' && item && typeof item === 'object') {
  	                    target[i] = merge(targetItem, item, options);
  	                } else {
  	                    target.push(item);
  	                }
  	            } else {
  	                target[i] = item;
  	            }
  	        });
  	        return target;
  	    }

  	    return Object.keys(source).reduce(function (acc, key) {
  	        var value = source[key];

  	        if (has.call(acc, key)) {
  	            acc[key] = merge(acc[key], value, options);
  	        } else {
  	            acc[key] = value;
  	        }
  	        return acc;
  	    }, mergeTarget);
  	};

  	var assign = function assignSingleSource(target, source) {
  	    return Object.keys(source).reduce(function (acc, key) {
  	        acc[key] = source[key];
  	        return acc;
  	    }, target);
  	};

  	var decode = function (str, defaultDecoder, charset) {
  	    var strWithoutPlus = str.replace(/\+/g, ' ');
  	    if (charset === 'iso-8859-1') {
  	        // unescape never throws, no try...catch needed:
  	        return strWithoutPlus.replace(/%[0-9a-f]{2}/gi, unescape);
  	    }
  	    // utf-8
  	    try {
  	        return decodeURIComponent(strWithoutPlus);
  	    } catch (e) {
  	        return strWithoutPlus;
  	    }
  	};

  	var limit = 1024;

  	/* eslint operator-linebreak: [2, "before"] */

  	var encode = function encode(str, defaultEncoder, charset, kind, format) {
  	    // This code was originally written by Brian White (mscdex) for the io.js core querystring library.
  	    // It has been adapted here for stricter adherence to RFC 3986
  	    if (str.length === 0) {
  	        return str;
  	    }

  	    var string = str;
  	    if (typeof str === 'symbol') {
  	        string = Symbol.prototype.toString.call(str);
  	    } else if (typeof str !== 'string') {
  	        string = String(str);
  	    }

  	    if (charset === 'iso-8859-1') {
  	        return escape(string).replace(/%u[0-9a-f]{4}/gi, function ($0) {
  	            return '%26%23' + parseInt($0.slice(2), 16) + '%3B';
  	        });
  	    }

  	    var out = '';
  	    for (var j = 0; j < string.length; j += limit) {
  	        var segment = string.length >= limit ? string.slice(j, j + limit) : string;
  	        var arr = [];

  	        for (var i = 0; i < segment.length; ++i) {
  	            var c = segment.charCodeAt(i);
  	            if (
  	                c === 0x2D // -
  	                || c === 0x2E // .
  	                || c === 0x5F // _
  	                || c === 0x7E // ~
  	                || (c >= 0x30 && c <= 0x39) // 0-9
  	                || (c >= 0x41 && c <= 0x5A) // a-z
  	                || (c >= 0x61 && c <= 0x7A) // A-Z
  	                || (format === formats.RFC1738 && (c === 0x28 || c === 0x29)) // ( )
  	            ) {
  	                arr[arr.length] = segment.charAt(i);
  	                continue;
  	            }

  	            if (c < 0x80) {
  	                arr[arr.length] = hexTable[c];
  	                continue;
  	            }

  	            if (c < 0x800) {
  	                arr[arr.length] = hexTable[0xC0 | (c >> 6)]
  	                    + hexTable[0x80 | (c & 0x3F)];
  	                continue;
  	            }

  	            if (c < 0xD800 || c >= 0xE000) {
  	                arr[arr.length] = hexTable[0xE0 | (c >> 12)]
  	                    + hexTable[0x80 | ((c >> 6) & 0x3F)]
  	                    + hexTable[0x80 | (c & 0x3F)];
  	                continue;
  	            }

  	            i += 1;
  	            c = 0x10000 + (((c & 0x3FF) << 10) | (segment.charCodeAt(i) & 0x3FF));

  	            arr[arr.length] = hexTable[0xF0 | (c >> 18)]
  	                + hexTable[0x80 | ((c >> 12) & 0x3F)]
  	                + hexTable[0x80 | ((c >> 6) & 0x3F)]
  	                + hexTable[0x80 | (c & 0x3F)];
  	        }

  	        out += arr.join('');
  	    }

  	    return out;
  	};

  	var compact = function compact(value) {
  	    var queue = [{ obj: { o: value }, prop: 'o' }];
  	    var refs = [];

  	    for (var i = 0; i < queue.length; ++i) {
  	        var item = queue[i];
  	        var obj = item.obj[item.prop];

  	        var keys = Object.keys(obj);
  	        for (var j = 0; j < keys.length; ++j) {
  	            var key = keys[j];
  	            var val = obj[key];
  	            if (typeof val === 'object' && val !== null && refs.indexOf(val) === -1) {
  	                queue.push({ obj: obj, prop: key });
  	                refs.push(val);
  	            }
  	        }
  	    }

  	    compactQueue(queue);

  	    return value;
  	};

  	var isRegExp = function isRegExp(obj) {
  	    return Object.prototype.toString.call(obj) === '[object RegExp]';
  	};

  	var isBuffer = function isBuffer(obj) {
  	    if (!obj || typeof obj !== 'object') {
  	        return false;
  	    }

  	    return !!(obj.constructor && obj.constructor.isBuffer && obj.constructor.isBuffer(obj));
  	};

  	var combine = function combine(a, b) {
  	    return [].concat(a, b);
  	};

  	var maybeMap = function maybeMap(val, fn) {
  	    if (isArray(val)) {
  	        var mapped = [];
  	        for (var i = 0; i < val.length; i += 1) {
  	            mapped.push(fn(val[i]));
  	        }
  	        return mapped;
  	    }
  	    return fn(val);
  	};

  	utils = {
  	    arrayToObject: arrayToObject,
  	    assign: assign,
  	    combine: combine,
  	    compact: compact,
  	    decode: decode,
  	    encode: encode,
  	    isBuffer: isBuffer,
  	    isRegExp: isRegExp,
  	    maybeMap: maybeMap,
  	    merge: merge
  	};
  	return utils;
  }

  var stringify_1;
  var hasRequiredStringify;

  function requireStringify () {
  	if (hasRequiredStringify) return stringify_1;
  	hasRequiredStringify = 1;

  	var getSideChannel = requireSideChannel();
  	var utils = /*@__PURE__*/ requireUtils();
  	var formats = /*@__PURE__*/ requireFormats();
  	var has = Object.prototype.hasOwnProperty;

  	var arrayPrefixGenerators = {
  	    brackets: function brackets(prefix) {
  	        return prefix + '[]';
  	    },
  	    comma: 'comma',
  	    indices: function indices(prefix, key) {
  	        return prefix + '[' + key + ']';
  	    },
  	    repeat: function repeat(prefix) {
  	        return prefix;
  	    }
  	};

  	var isArray = Array.isArray;
  	var push = Array.prototype.push;
  	var pushToArray = function (arr, valueOrArray) {
  	    push.apply(arr, isArray(valueOrArray) ? valueOrArray : [valueOrArray]);
  	};

  	var toISO = Date.prototype.toISOString;

  	var defaultFormat = formats['default'];
  	var defaults = {
  	    addQueryPrefix: false,
  	    allowDots: false,
  	    allowEmptyArrays: false,
  	    arrayFormat: 'indices',
  	    charset: 'utf-8',
  	    charsetSentinel: false,
  	    commaRoundTrip: false,
  	    delimiter: '&',
  	    encode: true,
  	    encodeDotInKeys: false,
  	    encoder: utils.encode,
  	    encodeValuesOnly: false,
  	    filter: void 0,
  	    format: defaultFormat,
  	    formatter: formats.formatters[defaultFormat],
  	    // deprecated
  	    indices: false,
  	    serializeDate: function serializeDate(date) {
  	        return toISO.call(date);
  	    },
  	    skipNulls: false,
  	    strictNullHandling: false
  	};

  	var isNonNullishPrimitive = function isNonNullishPrimitive(v) {
  	    return typeof v === 'string'
  	        || typeof v === 'number'
  	        || typeof v === 'boolean'
  	        || typeof v === 'symbol'
  	        || typeof v === 'bigint';
  	};

  	var sentinel = {};

  	var stringify = function stringify(
  	    object,
  	    prefix,
  	    generateArrayPrefix,
  	    commaRoundTrip,
  	    allowEmptyArrays,
  	    strictNullHandling,
  	    skipNulls,
  	    encodeDotInKeys,
  	    encoder,
  	    filter,
  	    sort,
  	    allowDots,
  	    serializeDate,
  	    format,
  	    formatter,
  	    encodeValuesOnly,
  	    charset,
  	    sideChannel
  	) {
  	    var obj = object;

  	    var tmpSc = sideChannel;
  	    var step = 0;
  	    var findFlag = false;
  	    while ((tmpSc = tmpSc.get(sentinel)) !== void 0 && !findFlag) {
  	        // Where object last appeared in the ref tree
  	        var pos = tmpSc.get(object);
  	        step += 1;
  	        if (typeof pos !== 'undefined') {
  	            if (pos === step) {
  	                throw new RangeError('Cyclic object value');
  	            } else {
  	                findFlag = true; // Break while
  	            }
  	        }
  	        if (typeof tmpSc.get(sentinel) === 'undefined') {
  	            step = 0;
  	        }
  	    }

  	    if (typeof filter === 'function') {
  	        obj = filter(prefix, obj);
  	    } else if (obj instanceof Date) {
  	        obj = serializeDate(obj);
  	    } else if (generateArrayPrefix === 'comma' && isArray(obj)) {
  	        obj = utils.maybeMap(obj, function (value) {
  	            if (value instanceof Date) {
  	                return serializeDate(value);
  	            }
  	            return value;
  	        });
  	    }

  	    if (obj === null) {
  	        if (strictNullHandling) {
  	            return encoder && !encodeValuesOnly ? encoder(prefix, defaults.encoder, charset, 'key', format) : prefix;
  	        }

  	        obj = '';
  	    }

  	    if (isNonNullishPrimitive(obj) || utils.isBuffer(obj)) {
  	        if (encoder) {
  	            var keyValue = encodeValuesOnly ? prefix : encoder(prefix, defaults.encoder, charset, 'key', format);
  	            return [formatter(keyValue) + '=' + formatter(encoder(obj, defaults.encoder, charset, 'value', format))];
  	        }
  	        return [formatter(prefix) + '=' + formatter(String(obj))];
  	    }

  	    var values = [];

  	    if (typeof obj === 'undefined') {
  	        return values;
  	    }

  	    var objKeys;
  	    if (generateArrayPrefix === 'comma' && isArray(obj)) {
  	        // we need to join elements in
  	        if (encodeValuesOnly && encoder) {
  	            obj = utils.maybeMap(obj, encoder);
  	        }
  	        objKeys = [{ value: obj.length > 0 ? obj.join(',') || null : void 0 }];
  	    } else if (isArray(filter)) {
  	        objKeys = filter;
  	    } else {
  	        var keys = Object.keys(obj);
  	        objKeys = sort ? keys.sort(sort) : keys;
  	    }

  	    var encodedPrefix = encodeDotInKeys ? String(prefix).replace(/\./g, '%2E') : String(prefix);

  	    var adjustedPrefix = commaRoundTrip && isArray(obj) && obj.length === 1 ? encodedPrefix + '[]' : encodedPrefix;

  	    if (allowEmptyArrays && isArray(obj) && obj.length === 0) {
  	        return adjustedPrefix + '[]';
  	    }

  	    for (var j = 0; j < objKeys.length; ++j) {
  	        var key = objKeys[j];
  	        var value = typeof key === 'object' && key && typeof key.value !== 'undefined'
  	            ? key.value
  	            : obj[key];

  	        if (skipNulls && value === null) {
  	            continue;
  	        }

  	        var encodedKey = allowDots && encodeDotInKeys ? String(key).replace(/\./g, '%2E') : String(key);
  	        var keyPrefix = isArray(obj)
  	            ? typeof generateArrayPrefix === 'function' ? generateArrayPrefix(adjustedPrefix, encodedKey) : adjustedPrefix
  	            : adjustedPrefix + (allowDots ? '.' + encodedKey : '[' + encodedKey + ']');

  	        sideChannel.set(object, step);
  	        var valueSideChannel = getSideChannel();
  	        valueSideChannel.set(sentinel, sideChannel);
  	        pushToArray(values, stringify(
  	            value,
  	            keyPrefix,
  	            generateArrayPrefix,
  	            commaRoundTrip,
  	            allowEmptyArrays,
  	            strictNullHandling,
  	            skipNulls,
  	            encodeDotInKeys,
  	            generateArrayPrefix === 'comma' && encodeValuesOnly && isArray(obj) ? null : encoder,
  	            filter,
  	            sort,
  	            allowDots,
  	            serializeDate,
  	            format,
  	            formatter,
  	            encodeValuesOnly,
  	            charset,
  	            valueSideChannel
  	        ));
  	    }

  	    return values;
  	};

  	var normalizeStringifyOptions = function normalizeStringifyOptions(opts) {
  	    if (!opts) {
  	        return defaults;
  	    }

  	    if (typeof opts.allowEmptyArrays !== 'undefined' && typeof opts.allowEmptyArrays !== 'boolean') {
  	        throw new TypeError('`allowEmptyArrays` option can only be `true` or `false`, when provided');
  	    }

  	    if (typeof opts.encodeDotInKeys !== 'undefined' && typeof opts.encodeDotInKeys !== 'boolean') {
  	        throw new TypeError('`encodeDotInKeys` option can only be `true` or `false`, when provided');
  	    }

  	    if (opts.encoder !== null && typeof opts.encoder !== 'undefined' && typeof opts.encoder !== 'function') {
  	        throw new TypeError('Encoder has to be a function.');
  	    }

  	    var charset = opts.charset || defaults.charset;
  	    if (typeof opts.charset !== 'undefined' && opts.charset !== 'utf-8' && opts.charset !== 'iso-8859-1') {
  	        throw new TypeError('The charset option must be either utf-8, iso-8859-1, or undefined');
  	    }

  	    var format = formats['default'];
  	    if (typeof opts.format !== 'undefined') {
  	        if (!has.call(formats.formatters, opts.format)) {
  	            throw new TypeError('Unknown format option provided.');
  	        }
  	        format = opts.format;
  	    }
  	    var formatter = formats.formatters[format];

  	    var filter = defaults.filter;
  	    if (typeof opts.filter === 'function' || isArray(opts.filter)) {
  	        filter = opts.filter;
  	    }

  	    var arrayFormat;
  	    if (opts.arrayFormat in arrayPrefixGenerators) {
  	        arrayFormat = opts.arrayFormat;
  	    } else if ('indices' in opts) {
  	        arrayFormat = opts.indices ? 'indices' : 'repeat';
  	    } else {
  	        arrayFormat = defaults.arrayFormat;
  	    }

  	    if ('commaRoundTrip' in opts && typeof opts.commaRoundTrip !== 'boolean') {
  	        throw new TypeError('`commaRoundTrip` must be a boolean, or absent');
  	    }

  	    var allowDots = typeof opts.allowDots === 'undefined' ? opts.encodeDotInKeys === true ? true : defaults.allowDots : !!opts.allowDots;

  	    return {
  	        addQueryPrefix: typeof opts.addQueryPrefix === 'boolean' ? opts.addQueryPrefix : defaults.addQueryPrefix,
  	        allowDots: allowDots,
  	        allowEmptyArrays: typeof opts.allowEmptyArrays === 'boolean' ? !!opts.allowEmptyArrays : defaults.allowEmptyArrays,
  	        arrayFormat: arrayFormat,
  	        charset: charset,
  	        charsetSentinel: typeof opts.charsetSentinel === 'boolean' ? opts.charsetSentinel : defaults.charsetSentinel,
  	        commaRoundTrip: !!opts.commaRoundTrip,
  	        delimiter: typeof opts.delimiter === 'undefined' ? defaults.delimiter : opts.delimiter,
  	        encode: typeof opts.encode === 'boolean' ? opts.encode : defaults.encode,
  	        encodeDotInKeys: typeof opts.encodeDotInKeys === 'boolean' ? opts.encodeDotInKeys : defaults.encodeDotInKeys,
  	        encoder: typeof opts.encoder === 'function' ? opts.encoder : defaults.encoder,
  	        encodeValuesOnly: typeof opts.encodeValuesOnly === 'boolean' ? opts.encodeValuesOnly : defaults.encodeValuesOnly,
  	        filter: filter,
  	        format: format,
  	        formatter: formatter,
  	        serializeDate: typeof opts.serializeDate === 'function' ? opts.serializeDate : defaults.serializeDate,
  	        skipNulls: typeof opts.skipNulls === 'boolean' ? opts.skipNulls : defaults.skipNulls,
  	        sort: typeof opts.sort === 'function' ? opts.sort : null,
  	        strictNullHandling: typeof opts.strictNullHandling === 'boolean' ? opts.strictNullHandling : defaults.strictNullHandling
  	    };
  	};

  	stringify_1 = function (object, opts) {
  	    var obj = object;
  	    var options = normalizeStringifyOptions(opts);

  	    var objKeys;
  	    var filter;

  	    if (typeof options.filter === 'function') {
  	        filter = options.filter;
  	        obj = filter('', obj);
  	    } else if (isArray(options.filter)) {
  	        filter = options.filter;
  	        objKeys = filter;
  	    }

  	    var keys = [];

  	    if (typeof obj !== 'object' || obj === null) {
  	        return '';
  	    }

  	    var generateArrayPrefix = arrayPrefixGenerators[options.arrayFormat];
  	    var commaRoundTrip = generateArrayPrefix === 'comma' && options.commaRoundTrip;

  	    if (!objKeys) {
  	        objKeys = Object.keys(obj);
  	    }

  	    if (options.sort) {
  	        objKeys.sort(options.sort);
  	    }

  	    var sideChannel = getSideChannel();
  	    for (var i = 0; i < objKeys.length; ++i) {
  	        var key = objKeys[i];
  	        var value = obj[key];

  	        if (options.skipNulls && value === null) {
  	            continue;
  	        }
  	        pushToArray(keys, stringify(
  	            value,
  	            key,
  	            generateArrayPrefix,
  	            commaRoundTrip,
  	            options.allowEmptyArrays,
  	            options.strictNullHandling,
  	            options.skipNulls,
  	            options.encodeDotInKeys,
  	            options.encode ? options.encoder : null,
  	            options.filter,
  	            options.sort,
  	            options.allowDots,
  	            options.serializeDate,
  	            options.format,
  	            options.formatter,
  	            options.encodeValuesOnly,
  	            options.charset,
  	            sideChannel
  	        ));
  	    }

  	    var joined = keys.join(options.delimiter);
  	    var prefix = options.addQueryPrefix === true ? '?' : '';

  	    if (options.charsetSentinel) {
  	        if (options.charset === 'iso-8859-1') {
  	            // encodeURIComponent('&#10003;'), the "numeric entity" representation of a checkmark
  	            prefix += 'utf8=%26%2310003%3B&';
  	        } else {
  	            // encodeURIComponent('✓')
  	            prefix += 'utf8=%E2%9C%93&';
  	        }
  	    }

  	    return joined.length > 0 ? prefix + joined : '';
  	};
  	return stringify_1;
  }

  var parse;
  var hasRequiredParse;

  function requireParse () {
  	if (hasRequiredParse) return parse;
  	hasRequiredParse = 1;

  	var utils = /*@__PURE__*/ requireUtils();

  	var has = Object.prototype.hasOwnProperty;
  	var isArray = Array.isArray;

  	var defaults = {
  	    allowDots: false,
  	    allowEmptyArrays: false,
  	    allowPrototypes: false,
  	    allowSparse: false,
  	    arrayLimit: 20,
  	    charset: 'utf-8',
  	    charsetSentinel: false,
  	    comma: false,
  	    decodeDotInKeys: false,
  	    decoder: utils.decode,
  	    delimiter: '&',
  	    depth: 5,
  	    duplicates: 'combine',
  	    ignoreQueryPrefix: false,
  	    interpretNumericEntities: false,
  	    parameterLimit: 1000,
  	    parseArrays: true,
  	    plainObjects: false,
  	    strictDepth: false,
  	    strictNullHandling: false,
  	    throwOnLimitExceeded: false
  	};

  	var interpretNumericEntities = function (str) {
  	    return str.replace(/&#(\d+);/g, function ($0, numberStr) {
  	        return String.fromCharCode(parseInt(numberStr, 10));
  	    });
  	};

  	var parseArrayValue = function (val, options, currentArrayLength) {
  	    if (val && typeof val === 'string' && options.comma && val.indexOf(',') > -1) {
  	        return val.split(',');
  	    }

  	    if (options.throwOnLimitExceeded && currentArrayLength >= options.arrayLimit) {
  	        throw new RangeError('Array limit exceeded. Only ' + options.arrayLimit + ' element' + (options.arrayLimit === 1 ? '' : 's') + ' allowed in an array.');
  	    }

  	    return val;
  	};

  	// This is what browsers will submit when the ✓ character occurs in an
  	// application/x-www-form-urlencoded body and the encoding of the page containing
  	// the form is iso-8859-1, or when the submitted form has an accept-charset
  	// attribute of iso-8859-1. Presumably also with other charsets that do not contain
  	// the ✓ character, such as us-ascii.
  	var isoSentinel = 'utf8=%26%2310003%3B'; // encodeURIComponent('&#10003;')

  	// These are the percent-encoded utf-8 octets representing a checkmark, indicating that the request actually is utf-8 encoded.
  	var charsetSentinel = 'utf8=%E2%9C%93'; // encodeURIComponent('✓')

  	var parseValues = function parseQueryStringValues(str, options) {
  	    var obj = { __proto__: null };

  	    var cleanStr = options.ignoreQueryPrefix ? str.replace(/^\?/, '') : str;
  	    cleanStr = cleanStr.replace(/%5B/gi, '[').replace(/%5D/gi, ']');

  	    var limit = options.parameterLimit === Infinity ? undefined : options.parameterLimit;
  	    var parts = cleanStr.split(
  	        options.delimiter,
  	        options.throwOnLimitExceeded ? limit + 1 : limit
  	    );

  	    if (options.throwOnLimitExceeded && parts.length > limit) {
  	        throw new RangeError('Parameter limit exceeded. Only ' + limit + ' parameter' + (limit === 1 ? '' : 's') + ' allowed.');
  	    }

  	    var skipIndex = -1; // Keep track of where the utf8 sentinel was found
  	    var i;

  	    var charset = options.charset;
  	    if (options.charsetSentinel) {
  	        for (i = 0; i < parts.length; ++i) {
  	            if (parts[i].indexOf('utf8=') === 0) {
  	                if (parts[i] === charsetSentinel) {
  	                    charset = 'utf-8';
  	                } else if (parts[i] === isoSentinel) {
  	                    charset = 'iso-8859-1';
  	                }
  	                skipIndex = i;
  	                i = parts.length; // The eslint settings do not allow break;
  	            }
  	        }
  	    }

  	    for (i = 0; i < parts.length; ++i) {
  	        if (i === skipIndex) {
  	            continue;
  	        }
  	        var part = parts[i];

  	        var bracketEqualsPos = part.indexOf(']=');
  	        var pos = bracketEqualsPos === -1 ? part.indexOf('=') : bracketEqualsPos + 1;

  	        var key;
  	        var val;
  	        if (pos === -1) {
  	            key = options.decoder(part, defaults.decoder, charset, 'key');
  	            val = options.strictNullHandling ? null : '';
  	        } else {
  	            key = options.decoder(part.slice(0, pos), defaults.decoder, charset, 'key');

  	            val = utils.maybeMap(
  	                parseArrayValue(
  	                    part.slice(pos + 1),
  	                    options,
  	                    isArray(obj[key]) ? obj[key].length : 0
  	                ),
  	                function (encodedVal) {
  	                    return options.decoder(encodedVal, defaults.decoder, charset, 'value');
  	                }
  	            );
  	        }

  	        if (val && options.interpretNumericEntities && charset === 'iso-8859-1') {
  	            val = interpretNumericEntities(String(val));
  	        }

  	        if (part.indexOf('[]=') > -1) {
  	            val = isArray(val) ? [val] : val;
  	        }

  	        var existing = has.call(obj, key);
  	        if (existing && options.duplicates === 'combine') {
  	            obj[key] = utils.combine(obj[key], val);
  	        } else if (!existing || options.duplicates === 'last') {
  	            obj[key] = val;
  	        }
  	    }

  	    return obj;
  	};

  	var parseObject = function (chain, val, options, valuesParsed) {
  	    var currentArrayLength = 0;
  	    if (chain.length > 0 && chain[chain.length - 1] === '[]') {
  	        var parentKey = chain.slice(0, -1).join('');
  	        currentArrayLength = Array.isArray(val) && val[parentKey] ? val[parentKey].length : 0;
  	    }

  	    var leaf = valuesParsed ? val : parseArrayValue(val, options, currentArrayLength);

  	    for (var i = chain.length - 1; i >= 0; --i) {
  	        var obj;
  	        var root = chain[i];

  	        if (root === '[]' && options.parseArrays) {
  	            obj = options.allowEmptyArrays && (leaf === '' || (options.strictNullHandling && leaf === null))
  	                ? []
  	                : utils.combine([], leaf);
  	        } else {
  	            obj = options.plainObjects ? { __proto__: null } : {};
  	            var cleanRoot = root.charAt(0) === '[' && root.charAt(root.length - 1) === ']' ? root.slice(1, -1) : root;
  	            var decodedRoot = options.decodeDotInKeys ? cleanRoot.replace(/%2E/g, '.') : cleanRoot;
  	            var index = parseInt(decodedRoot, 10);
  	            if (!options.parseArrays && decodedRoot === '') {
  	                obj = { 0: leaf };
  	            } else if (
  	                !isNaN(index)
  	                && root !== decodedRoot
  	                && String(index) === decodedRoot
  	                && index >= 0
  	                && (options.parseArrays && index <= options.arrayLimit)
  	            ) {
  	                obj = [];
  	                obj[index] = leaf;
  	            } else if (decodedRoot !== '__proto__') {
  	                obj[decodedRoot] = leaf;
  	            }
  	        }

  	        leaf = obj;
  	    }

  	    return leaf;
  	};

  	var parseKeys = function parseQueryStringKeys(givenKey, val, options, valuesParsed) {
  	    if (!givenKey) {
  	        return;
  	    }

  	    // Transform dot notation to bracket notation
  	    var key = options.allowDots ? givenKey.replace(/\.([^.[]+)/g, '[$1]') : givenKey;

  	    // The regex chunks

  	    var brackets = /(\[[^[\]]*])/;
  	    var child = /(\[[^[\]]*])/g;

  	    // Get the parent

  	    var segment = options.depth > 0 && brackets.exec(key);
  	    var parent = segment ? key.slice(0, segment.index) : key;

  	    // Stash the parent if it exists

  	    var keys = [];
  	    if (parent) {
  	        // If we aren't using plain objects, optionally prefix keys that would overwrite object prototype properties
  	        if (!options.plainObjects && has.call(Object.prototype, parent)) {
  	            if (!options.allowPrototypes) {
  	                return;
  	            }
  	        }

  	        keys.push(parent);
  	    }

  	    // Loop through children appending to the array until we hit depth

  	    var i = 0;
  	    while (options.depth > 0 && (segment = child.exec(key)) !== null && i < options.depth) {
  	        i += 1;
  	        if (!options.plainObjects && has.call(Object.prototype, segment[1].slice(1, -1))) {
  	            if (!options.allowPrototypes) {
  	                return;
  	            }
  	        }
  	        keys.push(segment[1]);
  	    }

  	    // If there's a remainder, check strictDepth option for throw, else just add whatever is left

  	    if (segment) {
  	        if (options.strictDepth === true) {
  	            throw new RangeError('Input depth exceeded depth option of ' + options.depth + ' and strictDepth is true');
  	        }
  	        keys.push('[' + key.slice(segment.index) + ']');
  	    }

  	    return parseObject(keys, val, options, valuesParsed);
  	};

  	var normalizeParseOptions = function normalizeParseOptions(opts) {
  	    if (!opts) {
  	        return defaults;
  	    }

  	    if (typeof opts.allowEmptyArrays !== 'undefined' && typeof opts.allowEmptyArrays !== 'boolean') {
  	        throw new TypeError('`allowEmptyArrays` option can only be `true` or `false`, when provided');
  	    }

  	    if (typeof opts.decodeDotInKeys !== 'undefined' && typeof opts.decodeDotInKeys !== 'boolean') {
  	        throw new TypeError('`decodeDotInKeys` option can only be `true` or `false`, when provided');
  	    }

  	    if (opts.decoder !== null && typeof opts.decoder !== 'undefined' && typeof opts.decoder !== 'function') {
  	        throw new TypeError('Decoder has to be a function.');
  	    }

  	    if (typeof opts.charset !== 'undefined' && opts.charset !== 'utf-8' && opts.charset !== 'iso-8859-1') {
  	        throw new TypeError('The charset option must be either utf-8, iso-8859-1, or undefined');
  	    }

  	    if (typeof opts.throwOnLimitExceeded !== 'undefined' && typeof opts.throwOnLimitExceeded !== 'boolean') {
  	        throw new TypeError('`throwOnLimitExceeded` option must be a boolean');
  	    }

  	    var charset = typeof opts.charset === 'undefined' ? defaults.charset : opts.charset;

  	    var duplicates = typeof opts.duplicates === 'undefined' ? defaults.duplicates : opts.duplicates;

  	    if (duplicates !== 'combine' && duplicates !== 'first' && duplicates !== 'last') {
  	        throw new TypeError('The duplicates option must be either combine, first, or last');
  	    }

  	    var allowDots = typeof opts.allowDots === 'undefined' ? opts.decodeDotInKeys === true ? true : defaults.allowDots : !!opts.allowDots;

  	    return {
  	        allowDots: allowDots,
  	        allowEmptyArrays: typeof opts.allowEmptyArrays === 'boolean' ? !!opts.allowEmptyArrays : defaults.allowEmptyArrays,
  	        allowPrototypes: typeof opts.allowPrototypes === 'boolean' ? opts.allowPrototypes : defaults.allowPrototypes,
  	        allowSparse: typeof opts.allowSparse === 'boolean' ? opts.allowSparse : defaults.allowSparse,
  	        arrayLimit: typeof opts.arrayLimit === 'number' ? opts.arrayLimit : defaults.arrayLimit,
  	        charset: charset,
  	        charsetSentinel: typeof opts.charsetSentinel === 'boolean' ? opts.charsetSentinel : defaults.charsetSentinel,
  	        comma: typeof opts.comma === 'boolean' ? opts.comma : defaults.comma,
  	        decodeDotInKeys: typeof opts.decodeDotInKeys === 'boolean' ? opts.decodeDotInKeys : defaults.decodeDotInKeys,
  	        decoder: typeof opts.decoder === 'function' ? opts.decoder : defaults.decoder,
  	        delimiter: typeof opts.delimiter === 'string' || utils.isRegExp(opts.delimiter) ? opts.delimiter : defaults.delimiter,
  	        // eslint-disable-next-line no-implicit-coercion, no-extra-parens
  	        depth: (typeof opts.depth === 'number' || opts.depth === false) ? +opts.depth : defaults.depth,
  	        duplicates: duplicates,
  	        ignoreQueryPrefix: opts.ignoreQueryPrefix === true,
  	        interpretNumericEntities: typeof opts.interpretNumericEntities === 'boolean' ? opts.interpretNumericEntities : defaults.interpretNumericEntities,
  	        parameterLimit: typeof opts.parameterLimit === 'number' ? opts.parameterLimit : defaults.parameterLimit,
  	        parseArrays: opts.parseArrays !== false,
  	        plainObjects: typeof opts.plainObjects === 'boolean' ? opts.plainObjects : defaults.plainObjects,
  	        strictDepth: typeof opts.strictDepth === 'boolean' ? !!opts.strictDepth : defaults.strictDepth,
  	        strictNullHandling: typeof opts.strictNullHandling === 'boolean' ? opts.strictNullHandling : defaults.strictNullHandling,
  	        throwOnLimitExceeded: typeof opts.throwOnLimitExceeded === 'boolean' ? opts.throwOnLimitExceeded : false
  	    };
  	};

  	parse = function (str, opts) {
  	    var options = normalizeParseOptions(opts);

  	    if (str === '' || str === null || typeof str === 'undefined') {
  	        return options.plainObjects ? { __proto__: null } : {};
  	    }

  	    var tempObj = typeof str === 'string' ? parseValues(str, options) : str;
  	    var obj = options.plainObjects ? { __proto__: null } : {};

  	    // Iterate over the keys and setup the new object

  	    var keys = Object.keys(tempObj);
  	    for (var i = 0; i < keys.length; ++i) {
  	        var key = keys[i];
  	        var newObj = parseKeys(key, tempObj[key], options, typeof str === 'string');
  	        obj = utils.merge(obj, newObj, options);
  	    }

  	    if (options.allowSparse === true) {
  	        return obj;
  	    }

  	    return utils.compact(obj);
  	};
  	return parse;
  }

  var lib;
  var hasRequiredLib;

  function requireLib () {
  	if (hasRequiredLib) return lib;
  	hasRequiredLib = 1;

  	var stringify = /*@__PURE__*/ requireStringify();
  	var parse = /*@__PURE__*/ requireParse();
  	var formats = /*@__PURE__*/ requireFormats();

  	lib = {
  	    formats: formats,
  	    parse: parse,
  	    stringify: stringify
  	};
  	return lib;
  }

  var libExports = /*@__PURE__*/ requireLib();

  var nprogress$1 = {exports: {}};

  /* NProgress, (c) 2013, 2014 Rico Sta. Cruz - http://ricostacruz.com/nprogress
   * @license MIT */
  var nprogress = nprogress$1.exports;

  var hasRequiredNprogress;

  function requireNprogress () {
  	if (hasRequiredNprogress) return nprogress$1.exports;
  	hasRequiredNprogress = 1;
  	(function (module, exports) {
  (function(root, factory) {

  		  {
  		    module.exports = factory();
  		  }

  		})(nprogress, function() {
  		  var NProgress = {};

  		  NProgress.version = '0.2.0';

  		  var Settings = NProgress.settings = {
  		    minimum: 0.08,
  		    easing: 'ease',
  		    positionUsing: '',
  		    speed: 200,
  		    trickle: true,
  		    trickleRate: 0.02,
  		    trickleSpeed: 800,
  		    showSpinner: true,
  		    barSelector: '[role="bar"]',
  		    spinnerSelector: '[role="spinner"]',
  		    parent: 'body',
  		    template: '<div class="bar" role="bar"><div class="peg"></div></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
  		  };

  		  /**
  		   * Updates configuration.
  		   *
  		   *     NProgress.configure({
  		   *       minimum: 0.1
  		   *     });
  		   */
  		  NProgress.configure = function(options) {
  		    var key, value;
  		    for (key in options) {
  		      value = options[key];
  		      if (value !== undefined && options.hasOwnProperty(key)) Settings[key] = value;
  		    }

  		    return this;
  		  };

  		  /**
  		   * Last number.
  		   */

  		  NProgress.status = null;

  		  /**
  		   * Sets the progress bar status, where `n` is a number from `0.0` to `1.0`.
  		   *
  		   *     NProgress.set(0.4);
  		   *     NProgress.set(1.0);
  		   */

  		  NProgress.set = function(n) {
  		    var started = NProgress.isStarted();

  		    n = clamp(n, Settings.minimum, 1);
  		    NProgress.status = (n === 1 ? null : n);

  		    var progress = NProgress.render(!started),
  		        bar      = progress.querySelector(Settings.barSelector),
  		        speed    = Settings.speed,
  		        ease     = Settings.easing;

  		    progress.offsetWidth; /* Repaint */

  		    queue(function(next) {
  		      // Set positionUsing if it hasn't already been set
  		      if (Settings.positionUsing === '') Settings.positionUsing = NProgress.getPositioningCSS();

  		      // Add transition
  		      css(bar, barPositionCSS(n, speed, ease));

  		      if (n === 1) {
  		        // Fade out
  		        css(progress, { 
  		          transition: 'none', 
  		          opacity: 1 
  		        });
  		        progress.offsetWidth; /* Repaint */

  		        setTimeout(function() {
  		          css(progress, { 
  		            transition: 'all ' + speed + 'ms linear', 
  		            opacity: 0 
  		          });
  		          setTimeout(function() {
  		            NProgress.remove();
  		            next();
  		          }, speed);
  		        }, speed);
  		      } else {
  		        setTimeout(next, speed);
  		      }
  		    });

  		    return this;
  		  };

  		  NProgress.isStarted = function() {
  		    return typeof NProgress.status === 'number';
  		  };

  		  /**
  		   * Shows the progress bar.
  		   * This is the same as setting the status to 0%, except that it doesn't go backwards.
  		   *
  		   *     NProgress.start();
  		   *
  		   */
  		  NProgress.start = function() {
  		    if (!NProgress.status) NProgress.set(0);

  		    var work = function() {
  		      setTimeout(function() {
  		        if (!NProgress.status) return;
  		        NProgress.trickle();
  		        work();
  		      }, Settings.trickleSpeed);
  		    };

  		    if (Settings.trickle) work();

  		    return this;
  		  };

  		  /**
  		   * Hides the progress bar.
  		   * This is the *sort of* the same as setting the status to 100%, with the
  		   * difference being `done()` makes some placebo effect of some realistic motion.
  		   *
  		   *     NProgress.done();
  		   *
  		   * If `true` is passed, it will show the progress bar even if its hidden.
  		   *
  		   *     NProgress.done(true);
  		   */

  		  NProgress.done = function(force) {
  		    if (!force && !NProgress.status) return this;

  		    return NProgress.inc(0.3 + 0.5 * Math.random()).set(1);
  		  };

  		  /**
  		   * Increments by a random amount.
  		   */

  		  NProgress.inc = function(amount) {
  		    var n = NProgress.status;

  		    if (!n) {
  		      return NProgress.start();
  		    } else {
  		      if (typeof amount !== 'number') {
  		        amount = (1 - n) * clamp(Math.random() * n, 0.1, 0.95);
  		      }

  		      n = clamp(n + amount, 0, 0.994);
  		      return NProgress.set(n);
  		    }
  		  };

  		  NProgress.trickle = function() {
  		    return NProgress.inc(Math.random() * Settings.trickleRate);
  		  };

  		  /**
  		   * Waits for all supplied jQuery promises and
  		   * increases the progress as the promises resolve.
  		   *
  		   * @param $promise jQUery Promise
  		   */
  		  (function() {
  		    var initial = 0, current = 0;

  		    NProgress.promise = function($promise) {
  		      if (!$promise || $promise.state() === "resolved") {
  		        return this;
  		      }

  		      if (current === 0) {
  		        NProgress.start();
  		      }

  		      initial++;
  		      current++;

  		      $promise.always(function() {
  		        current--;
  		        if (current === 0) {
  		            initial = 0;
  		            NProgress.done();
  		        } else {
  		            NProgress.set((initial - current) / initial);
  		        }
  		      });

  		      return this;
  		    };

  		  })();

  		  /**
  		   * (Internal) renders the progress bar markup based on the `template`
  		   * setting.
  		   */

  		  NProgress.render = function(fromStart) {
  		    if (NProgress.isRendered()) return document.getElementById('nprogress');

  		    addClass(document.documentElement, 'nprogress-busy');
  		    
  		    var progress = document.createElement('div');
  		    progress.id = 'nprogress';
  		    progress.innerHTML = Settings.template;

  		    var bar      = progress.querySelector(Settings.barSelector),
  		        perc     = fromStart ? '-100' : toBarPerc(NProgress.status || 0),
  		        parent   = document.querySelector(Settings.parent),
  		        spinner;
  		    
  		    css(bar, {
  		      transition: 'all 0 linear',
  		      transform: 'translate3d(' + perc + '%,0,0)'
  		    });

  		    if (!Settings.showSpinner) {
  		      spinner = progress.querySelector(Settings.spinnerSelector);
  		      spinner && removeElement(spinner);
  		    }

  		    if (parent != document.body) {
  		      addClass(parent, 'nprogress-custom-parent');
  		    }

  		    parent.appendChild(progress);
  		    return progress;
  		  };

  		  /**
  		   * Removes the element. Opposite of render().
  		   */

  		  NProgress.remove = function() {
  		    removeClass(document.documentElement, 'nprogress-busy');
  		    removeClass(document.querySelector(Settings.parent), 'nprogress-custom-parent');
  		    var progress = document.getElementById('nprogress');
  		    progress && removeElement(progress);
  		  };

  		  /**
  		   * Checks if the progress bar is rendered.
  		   */

  		  NProgress.isRendered = function() {
  		    return !!document.getElementById('nprogress');
  		  };

  		  /**
  		   * Determine which positioning CSS rule to use.
  		   */

  		  NProgress.getPositioningCSS = function() {
  		    // Sniff on document.body.style
  		    var bodyStyle = document.body.style;

  		    // Sniff prefixes
  		    var vendorPrefix = ('WebkitTransform' in bodyStyle) ? 'Webkit' :
  		                       ('MozTransform' in bodyStyle) ? 'Moz' :
  		                       ('msTransform' in bodyStyle) ? 'ms' :
  		                       ('OTransform' in bodyStyle) ? 'O' : '';

  		    if (vendorPrefix + 'Perspective' in bodyStyle) {
  		      // Modern browsers with 3D support, e.g. Webkit, IE10
  		      return 'translate3d';
  		    } else if (vendorPrefix + 'Transform' in bodyStyle) {
  		      // Browsers without 3D support, e.g. IE9
  		      return 'translate';
  		    } else {
  		      // Browsers without translate() support, e.g. IE7-8
  		      return 'margin';
  		    }
  		  };

  		  /**
  		   * Helpers
  		   */

  		  function clamp(n, min, max) {
  		    if (n < min) return min;
  		    if (n > max) return max;
  		    return n;
  		  }

  		  /**
  		   * (Internal) converts a percentage (`0..1`) to a bar translateX
  		   * percentage (`-100%..0%`).
  		   */

  		  function toBarPerc(n) {
  		    return (-1 + n) * 100;
  		  }


  		  /**
  		   * (Internal) returns the correct CSS for changing the bar's
  		   * position given an n percentage, and speed and ease from Settings
  		   */

  		  function barPositionCSS(n, speed, ease) {
  		    var barCSS;

  		    if (Settings.positionUsing === 'translate3d') {
  		      barCSS = { transform: 'translate3d('+toBarPerc(n)+'%,0,0)' };
  		    } else if (Settings.positionUsing === 'translate') {
  		      barCSS = { transform: 'translate('+toBarPerc(n)+'%,0)' };
  		    } else {
  		      barCSS = { 'margin-left': toBarPerc(n)+'%' };
  		    }

  		    barCSS.transition = 'all '+speed+'ms '+ease;

  		    return barCSS;
  		  }

  		  /**
  		   * (Internal) Queues a function to be executed.
  		   */

  		  var queue = (function() {
  		    var pending = [];
  		    
  		    function next() {
  		      var fn = pending.shift();
  		      if (fn) {
  		        fn(next);
  		      }
  		    }

  		    return function(fn) {
  		      pending.push(fn);
  		      if (pending.length == 1) next();
  		    };
  		  })();

  		  /**
  		   * (Internal) Applies css properties to an element, similar to the jQuery 
  		   * css method.
  		   *
  		   * While this helper does assist with vendor prefixed property names, it 
  		   * does not perform any manipulation of values prior to setting styles.
  		   */

  		  var css = (function() {
  		    var cssPrefixes = [ 'Webkit', 'O', 'Moz', 'ms' ],
  		        cssProps    = {};

  		    function camelCase(string) {
  		      return string.replace(/^-ms-/, 'ms-').replace(/-([\da-z])/gi, function(match, letter) {
  		        return letter.toUpperCase();
  		      });
  		    }

  		    function getVendorProp(name) {
  		      var style = document.body.style;
  		      if (name in style) return name;

  		      var i = cssPrefixes.length,
  		          capName = name.charAt(0).toUpperCase() + name.slice(1),
  		          vendorName;
  		      while (i--) {
  		        vendorName = cssPrefixes[i] + capName;
  		        if (vendorName in style) return vendorName;
  		      }

  		      return name;
  		    }

  		    function getStyleProp(name) {
  		      name = camelCase(name);
  		      return cssProps[name] || (cssProps[name] = getVendorProp(name));
  		    }

  		    function applyCss(element, prop, value) {
  		      prop = getStyleProp(prop);
  		      element.style[prop] = value;
  		    }

  		    return function(element, properties) {
  		      var args = arguments,
  		          prop, 
  		          value;

  		      if (args.length == 2) {
  		        for (prop in properties) {
  		          value = properties[prop];
  		          if (value !== undefined && properties.hasOwnProperty(prop)) applyCss(element, prop, value);
  		        }
  		      } else {
  		        applyCss(element, args[1], args[2]);
  		      }
  		    }
  		  })();

  		  /**
  		   * (Internal) Determines if an element or space separated list of class names contains a class name.
  		   */

  		  function hasClass(element, name) {
  		    var list = typeof element == 'string' ? element : classList(element);
  		    return list.indexOf(' ' + name + ' ') >= 0;
  		  }

  		  /**
  		   * (Internal) Adds a class to an element.
  		   */

  		  function addClass(element, name) {
  		    var oldList = classList(element),
  		        newList = oldList + name;

  		    if (hasClass(oldList, name)) return; 

  		    // Trim the opening space.
  		    element.className = newList.substring(1);
  		  }

  		  /**
  		   * (Internal) Removes a class from an element.
  		   */

  		  function removeClass(element, name) {
  		    var oldList = classList(element),
  		        newList;

  		    if (!hasClass(element, name)) return;

  		    // Replace the class name.
  		    newList = oldList.replace(' ' + name + ' ', ' ');

  		    // Trim the opening and closing spaces.
  		    element.className = newList.substring(1, newList.length - 1);
  		  }

  		  /**
  		   * (Internal) Gets a space separated list of the class names on the element. 
  		   * The list is wrapped with a single space on each end to facilitate finding 
  		   * matches within the list.
  		   */

  		  function classList(element) {
  		    return (' ' + (element.className || '') + ' ').replace(/\s+/gi, ' ');
  		  }

  		  /**
  		   * (Internal) Removes an element from the DOM.
  		   */

  		  function removeElement(element) {
  		    element && element.parentNode && element.parentNode.removeChild(element);
  		  }

  		  return NProgress;
  		}); 
  	} (nprogress$1));
  	return nprogress$1.exports;
  }

  var nprogressExports = requireNprogress();
  var u = /*@__PURE__*/getDefaultExportFromCjs(nprogressExports);

  function T(t,e){let i;return function(...r){clearTimeout(i),i=setTimeout(()=>t.apply(this,r),e);}}function f$1(t,e){return document.dispatchEvent(new CustomEvent(`inertia:${t}`,e))}var H=t=>f$1("before",{cancelable:true,detail:{visit:t}}),q=t=>f$1("error",{detail:{errors:t}}),$=t=>f$1("exception",{cancelable:true,detail:{exception:t}}),N=t=>f$1("finish",{detail:{visit:t}}),W=t=>f$1("invalid",{cancelable:true,detail:{response:t}}),P$1=t=>f$1("navigate",{detail:{page:t}}),K=t=>f$1("progress",{detail:{progress:t}}),X=t=>f$1("start",{detail:{visit:t}}),B=t=>f$1("success",{detail:{page:t}});function I(t){return t instanceof File||t instanceof Blob||t instanceof FileList&&t.length>0||t instanceof FormData&&Array.from(t.values()).some(e=>I(e))||typeof t=="object"&&t!==null&&Object.values(t).some(e=>I(e))}function k$1(t,e=new FormData,i=null){t=t||{};for(let r in t)Object.prototype.hasOwnProperty.call(t,r)&&z(e,J(i,r),t[r]);return e}function J(t,e){return t?t+"["+e+"]":e}function z(t,e,i){if(Array.isArray(i))return Array.from(i.keys()).forEach(r=>z(t,J(e,r.toString()),i[r]));if(i instanceof Date)return t.append(e,i.toISOString());if(i instanceof File)return t.append(e,i,i.name);if(i instanceof Blob)return t.append(e,i);if(typeof i=="boolean")return t.append(e,i?"1":"0");if(typeof i=="string")return t.append(e,i);if(typeof i=="number")return t.append(e,`${i}`);if(i==null)return t.append(e,"");k$1(i,t,e);}var _={modal:null,listener:null,show(t){typeof t=="object"&&(t=`All Inertia requests must receive a valid Inertia response, however a plain JSON response was received.<hr>${JSON.stringify(t)}`);let e=document.createElement("html");e.innerHTML=t,e.querySelectorAll("a").forEach(r=>r.setAttribute("target","_top")),this.modal=document.createElement("div"),this.modal.style.position="fixed",this.modal.style.width="100vw",this.modal.style.height="100vh",this.modal.style.padding="50px",this.modal.style.boxSizing="border-box",this.modal.style.backgroundColor="rgba(0, 0, 0, .6)",this.modal.style.zIndex=2e5,this.modal.addEventListener("click",()=>this.hide());let i=document.createElement("iframe");if(i.style.backgroundColor="white",i.style.borderRadius="5px",i.style.width="100%",i.style.height="100%",this.modal.appendChild(i),document.body.prepend(this.modal),document.body.style.overflow="hidden",!i.contentWindow)throw new Error("iframe not yet ready.");i.contentWindow.document.open(),i.contentWindow.document.write(e.outerHTML),i.contentWindow.document.close(),this.listener=this.hideOnEscape.bind(this),document.addEventListener("keydown",this.listener);},hide(){this.modal.outerHTML="",this.modal=null,document.body.style.overflow="visible",document.removeEventListener("keydown",this.listener);},hideOnEscape(t){t.keyCode===27&&this.hide();}};function b$1(t){return new URL(t.toString(),window.location.toString())}function D$1(t,e,i,r="brackets"){let s=/^https?:\/\//.test(e.toString()),l=s||e.toString().startsWith("/"),h=!l&&!e.toString().startsWith("#")&&!e.toString().startsWith("?"),g=e.toString().includes("?")||t==="get"&&Object.keys(i).length,m=e.toString().includes("#"),c=new URL(e.toString(),"http://localhost");return t==="get"&&Object.keys(i).length&&(c.search=libExports.stringify(oe(libExports.parse(c.search,{ignoreQueryPrefix:true}),i),{encodeValuesOnly:true,arrayFormat:r}),i={}),[[s?`${c.protocol}//${c.host}`:"",l?c.pathname:"",h?c.pathname.substring(1):"",g?c.search:"",m?c.hash:""].join(""),i]}function E(t){return t=new URL(t.href),t.hash="",t}var C$1=typeof window>"u",Y=!C$1&&/CriOS/.test(window.navigator.userAgent),Z=t=>{requestAnimationFrame(()=>{requestAnimationFrame(t);});},F=class{constructor(){this.visitId=null;}init({initialPage:e,resolveComponent:i,swapComponent:r}){this.page=e,this.resolveComponent=i,this.swapComponent=r,this.setNavigationType(),this.clearRememberedStateOnReload(),this.isBackForwardVisit()?this.handleBackForwardVisit(this.page):this.isLocationVisit()?this.handleLocationVisit(this.page):this.handleInitialPageVisit(this.page),this.setupEventListeners();}setNavigationType(){this.navigationType=window.performance&&window.performance.getEntriesByType&&window.performance.getEntriesByType("navigation").length>0?window.performance.getEntriesByType("navigation")[0].type:"navigate";}clearRememberedStateOnReload(){this.navigationType==="reload"&&window.history.state?.rememberedState&&delete window.history.state.rememberedState;}handleInitialPageVisit(e){let i=window.location.hash;this.page.url.includes(i)||(this.page.url+=i),this.setPage(e,{preserveScroll:true,preserveState:true}).then(()=>P$1(e));}setupEventListeners(){window.addEventListener("popstate",this.handlePopstateEvent.bind(this)),document.addEventListener("scroll",T(this.handleScrollEvent.bind(this),100),true);}scrollRegions(){return document.querySelectorAll("[scroll-region]")}handleScrollEvent(e){typeof e.target.hasAttribute=="function"&&e.target.hasAttribute("scroll-region")&&this.saveScrollPositions();}saveScrollPositions(){this.replaceState({...this.page,scrollRegions:Array.from(this.scrollRegions()).map(e=>({top:e.scrollTop,left:e.scrollLeft}))});}resetScrollPositions(){Z(()=>{window.scrollTo(0,0),this.scrollRegions().forEach(e=>{typeof e.scrollTo=="function"?e.scrollTo(0,0):(e.scrollTop=0,e.scrollLeft=0);}),this.saveScrollPositions(),window.location.hash&&document.getElementById(window.location.hash.slice(1))?.scrollIntoView();});}restoreScrollPositions(){Z(()=>{this.page.scrollRegions&&this.scrollRegions().forEach((e,i)=>{let r=this.page.scrollRegions[i];if(r)typeof e.scrollTo=="function"?e.scrollTo(r.left,r.top):(e.scrollTop=r.top,e.scrollLeft=r.left);else return});});}isBackForwardVisit(){return window.history.state&&this.navigationType==="back_forward"}handleBackForwardVisit(e){window.history.state.version=e.version,this.setPage(window.history.state,{preserveScroll:true,preserveState:true}).then(()=>{this.restoreScrollPositions(),P$1(e);});}locationVisit(e,i){try{let r={preserveScroll:i};window.sessionStorage.setItem("inertiaLocationVisit",JSON.stringify(r)),window.location.href=e.href,E(window.location).href===E(e).href&&window.location.reload();}catch{return  false}}isLocationVisit(){try{return window.sessionStorage.getItem("inertiaLocationVisit")!==null}catch{return  false}}handleLocationVisit(e){let i=JSON.parse(window.sessionStorage.getItem("inertiaLocationVisit")||"");window.sessionStorage.removeItem("inertiaLocationVisit"),e.url+=window.location.hash,e.rememberedState=window.history.state?.rememberedState??{},e.scrollRegions=window.history.state?.scrollRegions??[],this.setPage(e,{preserveScroll:i.preserveScroll,preserveState:true}).then(()=>{i.preserveScroll&&this.restoreScrollPositions(),P$1(e);});}isLocationVisitResponse(e){return !!(e&&e.status===409&&e.headers["x-inertia-location"])}isInertiaResponse(e){return !!e?.headers["x-inertia"]}createVisitId(){return this.visitId={},this.visitId}cancelVisit(e,{cancelled:i=false,interrupted:r=false}){e&&!e.completed&&!e.cancelled&&!e.interrupted&&(e.cancelToken.abort(),e.onCancel(),e.completed=false,e.cancelled=i,e.interrupted=r,N(e),e.onFinish(e));}finishVisit(e){!e.cancelled&&!e.interrupted&&(e.completed=true,e.cancelled=false,e.interrupted=false,N(e),e.onFinish(e));}resolvePreserveOption(e,i){return typeof e=="function"?e(i):e==="errors"?Object.keys(i.props.errors||{}).length>0:e}cancel(){this.activeVisit&&this.cancelVisit(this.activeVisit,{cancelled:true});}visit(e,{method:i="get",data:r={},replace:s=false,preserveScroll:l=false,preserveState:h=false,only:g=[],except:m=[],headers:c={},errorBag:o="",forceFormData:v=false,onCancelToken:L=()=>{},onBefore:d=()=>{},onStart:p=()=>{},onProgress:x=()=>{},onFinish:y=()=>{},onCancel:ne=()=>{},onSuccess:U=()=>{},onError:G=()=>{},queryStringArrayFormat:A="brackets"}={}){let S=typeof e=="string"?b$1(e):e;if((I(r)||v)&&!(r instanceof FormData)&&(r=k$1(r)),!(r instanceof FormData)){let[n,a]=D$1(i,S,r,A);S=b$1(n),r=a;}let R={url:S,method:i,data:r,replace:s,preserveScroll:l,preserveState:h,only:g,except:m,headers:c,errorBag:o,forceFormData:v,queryStringArrayFormat:A,cancelled:false,completed:false,interrupted:false};if(d(R)===false||!H(R))return;this.activeVisit&&this.cancelVisit(this.activeVisit,{interrupted:true}),this.saveScrollPositions();let M=this.createVisitId();this.activeVisit={...R,onCancelToken:L,onBefore:d,onStart:p,onProgress:x,onFinish:y,onCancel:ne,onSuccess:U,onError:G,queryStringArrayFormat:A,cancelToken:new AbortController},L({cancel:()=>{this.activeVisit&&this.cancelVisit(this.activeVisit,{cancelled:true});}}),X(R),p(R);let j=!!(g.length||m.length);axios({method:i,url:E(S).href,data:i==="get"?{}:r,params:i==="get"?r:{},signal:this.activeVisit.cancelToken.signal,headers:{...c,Accept:"text/html, application/xhtml+xml","X-Requested-With":"XMLHttpRequest","X-Inertia":true,...j?{"X-Inertia-Partial-Component":this.page.component}:{},...g.length?{"X-Inertia-Partial-Data":g.join(",")}:{},...m.length?{"X-Inertia-Partial-Except":m.join(",")}:{},...o&&o.length?{"X-Inertia-Error-Bag":o}:{},...this.page.version?{"X-Inertia-Version":this.page.version}:{}},onUploadProgress:n=>{r instanceof FormData&&(n.percentage=n.progress?Math.round(n.progress*100):0,K(n),x(n));}}).then(n=>{if(!this.isInertiaResponse(n))return Promise.reject({response:n});let a=n.data;j&&a.component===this.page.component&&(a.props={...this.page.props,...a.props}),l=this.resolvePreserveOption(l,a),h=this.resolvePreserveOption(h,a),h&&window.history.state?.rememberedState&&a.component===this.page.component&&(a.rememberedState=window.history.state.rememberedState);let w=S,V=b$1(a.url);return w.hash&&!V.hash&&E(w).href===V.href&&(V.hash=w.hash,a.url=V.href),this.setPage(a,{visitId:M,replace:s,preserveScroll:l,preserveState:h})}).then(()=>{let n=this.page.props.errors||{};if(Object.keys(n).length>0){let a=o?n[o]?n[o]:{}:n;return q(a),G(a)}return B(this.page),U(this.page)}).catch(n=>{if(this.isInertiaResponse(n.response))return this.setPage(n.response.data,{visitId:M});if(this.isLocationVisitResponse(n.response)){let a=b$1(n.response.headers["x-inertia-location"]),w=S;w.hash&&!a.hash&&E(w).href===a.href&&(a.hash=w.hash),this.locationVisit(a,l===true);}else if(n.response)W(n.response)&&_.show(n.response.data);else return Promise.reject(n)}).then(()=>{this.activeVisit&&this.finishVisit(this.activeVisit);}).catch(n=>{if(!axios.isCancel(n)){let a=$(n);if(this.activeVisit&&this.finishVisit(this.activeVisit),a)return Promise.reject(n)}});}setPage(e,{visitId:i=this.createVisitId(),replace:r=false,preserveScroll:s=false,preserveState:l=false}={}){return Promise.resolve(this.resolveComponent(e.component)).then(h=>{i===this.visitId&&(e.scrollRegions=this.page.scrollRegions||[],e.rememberedState=e.rememberedState||{},r=r||b$1(e.url).href===window.location.href,r?this.replaceState(e):this.pushState(e),this.swapComponent({component:h,page:e,preserveState:l}).then(()=>{s?this.restoreScrollPositions():this.resetScrollPositions(),r||P$1(e);}));})}pushState(e){this.page=e,Y?setTimeout(()=>window.history.pushState(e,"",e.url)):window.history.pushState(e,"",e.url);}replaceState(e){this.page=e,Y?setTimeout(()=>window.history.replaceState(e,"",e.url)):window.history.replaceState(e,"",e.url);}handlePopstateEvent(e){if(e.state!==null){let i=e.state,r=this.createVisitId();Promise.resolve(this.resolveComponent(i.component)).then(s=>{r===this.visitId&&(this.page=i,this.swapComponent({component:s,page:i,preserveState:false}).then(()=>{this.restoreScrollPositions(),P$1(i);}));});}else {let i=b$1(this.page.url);i.hash=window.location.hash,this.replaceState({...this.page,url:i.href}),this.resetScrollPositions();}}get(e,i={},r={}){return this.visit(e,{...r,method:"get",data:i})}reload(e={}){return this.visit(window.location.href,{...e,preserveScroll:true,preserveState:true})}replace(e,i={}){return console.warn(`Inertia.replace() has been deprecated and will be removed in a future release. Please use Inertia.${i.method??"get"}() instead.`),this.visit(e,{preserveState:true,...i,replace:true})}post(e,i={},r={}){return this.visit(e,{preserveState:true,...r,method:"post",data:i})}put(e,i={},r={}){return this.visit(e,{preserveState:true,...r,method:"put",data:i})}patch(e,i={},r={}){return this.visit(e,{preserveState:true,...r,method:"patch",data:i})}delete(e,i={}){return this.visit(e,{preserveState:true,...i,method:"delete"})}remember(e,i="default"){C$1||this.replaceState({...this.page,rememberedState:{...this.page?.rememberedState,[i]:e}});}restore(e="default"){if(!C$1)return window.history.state?.rememberedState?.[e]}on(e,i){if(C$1)return ()=>{};let r=s=>{let l=i(s);s.cancelable&&!s.defaultPrevented&&l===false&&s.preventDefault();};return document.addEventListener(`inertia:${e}`,r),()=>document.removeEventListener(`inertia:${e}`,r)}};var se={buildDOMElement(t){let e=document.createElement("template");e.innerHTML=t;let i=e.content.firstChild;if(!t.startsWith("<script "))return i;let r=document.createElement("script");return r.innerHTML=i.innerHTML,i.getAttributeNames().forEach(s=>{r.setAttribute(s,i.getAttribute(s)||"");}),r},isInertiaManagedElement(t){return t.nodeType===Node.ELEMENT_NODE&&t.getAttribute("inertia")!==null},findMatchingElementIndex(t,e){let i=t.getAttribute("inertia");return i!==null?e.findIndex(r=>r.getAttribute("inertia")===i):-1},update:T(function(t){let e=t.map(r=>this.buildDOMElement(r));Array.from(document.head.childNodes).filter(r=>this.isInertiaManagedElement(r)).forEach(r=>{let s=this.findMatchingElementIndex(r,e);if(s===-1){r?.parentNode?.removeChild(r);return}let l=e.splice(s,1)[0];l&&!r.isEqualNode(l)&&r?.parentNode?.replaceChild(l,r);}),e.forEach(r=>document.head.appendChild(r));},1)};function ee(t,e,i){let r={},s=0;function l(){let o=s+=1;return r[o]=[],o.toString()}function h(o){o===null||Object.keys(r).indexOf(o)===-1||(delete r[o],c());}function g(o,v=[]){o!==null&&Object.keys(r).indexOf(o)>-1&&(r[o]=v),c();}function m(){let o=e(""),v={...o?{title:`<title inertia="">${o}</title>`}:{}},L=Object.values(r).reduce((d,p)=>d.concat(p),[]).reduce((d,p)=>{if(p.indexOf("<")===-1)return d;if(p.indexOf("<title ")===0){let y=p.match(/(<title [^>]+>)(.*?)(<\/title>)/);return d.title=y?`${y[1]}${e(y[2])}${y[3]}`:p,d}let x=p.match(/ inertia="[^"]+"/);return x?d[x[0]]=p:d[Object.keys(d).length]=p,d},v);return Object.values(L)}function c(){t?i(m()):se.update(m());}return c(),{forceUpdate:c,createProvider:function(){let o=l();return {update:v=>g(o,v),disconnect:()=>h(o)}}}}var te=null;function ae(t){document.addEventListener("inertia:start",le.bind(null,t)),document.addEventListener("inertia:progress",ce),document.addEventListener("inertia:finish",de);}function le(t){te=setTimeout(()=>u.start(),t);}function ce(t){u.isStarted()&&t.detail.progress?.percentage&&u.set(Math.max(u.status,t.detail.progress.percentage/100*.9));}function de(t){if(clearTimeout(te),u.isStarted())t.detail.visit.completed?u.done():t.detail.visit.interrupted?u.set(0):t.detail.visit.cancelled&&(u.done(),u.remove());else return}function pe(t){let e=document.createElement("style");e.type="text/css",e.textContent=`
    #nprogress {
      pointer-events: none;
    }

    #nprogress .bar {
      background: ${t};

      position: fixed;
      z-index: 1031;
      top: 0;
      left: 0;

      width: 100%;
      height: 2px;
    }

    #nprogress .peg {
      display: block;
      position: absolute;
      right: 0px;
      width: 100px;
      height: 100%;
      box-shadow: 0 0 10px ${t}, 0 0 5px ${t};
      opacity: 1.0;

      -webkit-transform: rotate(3deg) translate(0px, -4px);
          -ms-transform: rotate(3deg) translate(0px, -4px);
              transform: rotate(3deg) translate(0px, -4px);
    }

    #nprogress .spinner {
      display: block;
      position: fixed;
      z-index: 1031;
      top: 15px;
      right: 15px;
    }

    #nprogress .spinner-icon {
      width: 18px;
      height: 18px;
      box-sizing: border-box;

      border: solid 2px transparent;
      border-top-color: ${t};
      border-left-color: ${t};
      border-radius: 50%;

      -webkit-animation: nprogress-spinner 400ms linear infinite;
              animation: nprogress-spinner 400ms linear infinite;
    }

    .nprogress-custom-parent {
      overflow: hidden;
      position: relative;
    }

    .nprogress-custom-parent #nprogress .spinner,
    .nprogress-custom-parent #nprogress .bar {
      position: absolute;
    }

    @-webkit-keyframes nprogress-spinner {
      0%   { -webkit-transform: rotate(0deg); }
      100% { -webkit-transform: rotate(360deg); }
    }
    @keyframes nprogress-spinner {
      0%   { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `,document.head.appendChild(e);}function ie({delay:t=250,color:e="#29d",includeCSS:i=true,showSpinner:r=false}={}){ae(t),u.configure({showSpinner:r}),i&&pe(e);}var Ne=new F;

  var lodash_clonedeep = {exports: {}};

  /**
   * lodash (Custom Build) <https://lodash.com/>
   * Build: `lodash modularize exports="npm" -o ./`
   * Copyright jQuery Foundation and other contributors <https://jquery.org/>
   * Released under MIT license <https://lodash.com/license>
   * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
   * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
   */
  lodash_clonedeep.exports;

  var hasRequiredLodash_clonedeep;

  function requireLodash_clonedeep () {
  	if (hasRequiredLodash_clonedeep) return lodash_clonedeep.exports;
  	hasRequiredLodash_clonedeep = 1;
  	(function (module, exports) {
  		/** Used as the size to enable large array optimizations. */
  		var LARGE_ARRAY_SIZE = 200;

  		/** Used to stand-in for `undefined` hash values. */
  		var HASH_UNDEFINED = '__lodash_hash_undefined__';

  		/** Used as references for various `Number` constants. */
  		var MAX_SAFE_INTEGER = 9007199254740991;

  		/** `Object#toString` result references. */
  		var argsTag = '[object Arguments]',
  		    arrayTag = '[object Array]',
  		    boolTag = '[object Boolean]',
  		    dateTag = '[object Date]',
  		    errorTag = '[object Error]',
  		    funcTag = '[object Function]',
  		    genTag = '[object GeneratorFunction]',
  		    mapTag = '[object Map]',
  		    numberTag = '[object Number]',
  		    objectTag = '[object Object]',
  		    promiseTag = '[object Promise]',
  		    regexpTag = '[object RegExp]',
  		    setTag = '[object Set]',
  		    stringTag = '[object String]',
  		    symbolTag = '[object Symbol]',
  		    weakMapTag = '[object WeakMap]';

  		var arrayBufferTag = '[object ArrayBuffer]',
  		    dataViewTag = '[object DataView]',
  		    float32Tag = '[object Float32Array]',
  		    float64Tag = '[object Float64Array]',
  		    int8Tag = '[object Int8Array]',
  		    int16Tag = '[object Int16Array]',
  		    int32Tag = '[object Int32Array]',
  		    uint8Tag = '[object Uint8Array]',
  		    uint8ClampedTag = '[object Uint8ClampedArray]',
  		    uint16Tag = '[object Uint16Array]',
  		    uint32Tag = '[object Uint32Array]';

  		/**
  		 * Used to match `RegExp`
  		 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
  		 */
  		var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

  		/** Used to match `RegExp` flags from their coerced string values. */
  		var reFlags = /\w*$/;

  		/** Used to detect host constructors (Safari). */
  		var reIsHostCtor = /^\[object .+?Constructor\]$/;

  		/** Used to detect unsigned integer values. */
  		var reIsUint = /^(?:0|[1-9]\d*)$/;

  		/** Used to identify `toStringTag` values supported by `_.clone`. */
  		var cloneableTags = {};
  		cloneableTags[argsTag] = cloneableTags[arrayTag] =
  		cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] =
  		cloneableTags[boolTag] = cloneableTags[dateTag] =
  		cloneableTags[float32Tag] = cloneableTags[float64Tag] =
  		cloneableTags[int8Tag] = cloneableTags[int16Tag] =
  		cloneableTags[int32Tag] = cloneableTags[mapTag] =
  		cloneableTags[numberTag] = cloneableTags[objectTag] =
  		cloneableTags[regexpTag] = cloneableTags[setTag] =
  		cloneableTags[stringTag] = cloneableTags[symbolTag] =
  		cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] =
  		cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
  		cloneableTags[errorTag] = cloneableTags[funcTag] =
  		cloneableTags[weakMapTag] = false;

  		/** Detect free variable `global` from Node.js. */
  		var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

  		/** Detect free variable `self`. */
  		var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

  		/** Used as a reference to the global object. */
  		var root = freeGlobal || freeSelf || Function('return this')();

  		/** Detect free variable `exports`. */
  		var freeExports = exports && !exports.nodeType && exports;

  		/** Detect free variable `module`. */
  		var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

  		/** Detect the popular CommonJS extension `module.exports`. */
  		var moduleExports = freeModule && freeModule.exports === freeExports;

  		/**
  		 * Adds the key-value `pair` to `map`.
  		 *
  		 * @private
  		 * @param {Object} map The map to modify.
  		 * @param {Array} pair The key-value pair to add.
  		 * @returns {Object} Returns `map`.
  		 */
  		function addMapEntry(map, pair) {
  		  // Don't return `map.set` because it's not chainable in IE 11.
  		  map.set(pair[0], pair[1]);
  		  return map;
  		}

  		/**
  		 * Adds `value` to `set`.
  		 *
  		 * @private
  		 * @param {Object} set The set to modify.
  		 * @param {*} value The value to add.
  		 * @returns {Object} Returns `set`.
  		 */
  		function addSetEntry(set, value) {
  		  // Don't return `set.add` because it's not chainable in IE 11.
  		  set.add(value);
  		  return set;
  		}

  		/**
  		 * A specialized version of `_.forEach` for arrays without support for
  		 * iteratee shorthands.
  		 *
  		 * @private
  		 * @param {Array} [array] The array to iterate over.
  		 * @param {Function} iteratee The function invoked per iteration.
  		 * @returns {Array} Returns `array`.
  		 */
  		function arrayEach(array, iteratee) {
  		  var index = -1,
  		      length = array ? array.length : 0;

  		  while (++index < length) {
  		    if (iteratee(array[index], index, array) === false) {
  		      break;
  		    }
  		  }
  		  return array;
  		}

  		/**
  		 * Appends the elements of `values` to `array`.
  		 *
  		 * @private
  		 * @param {Array} array The array to modify.
  		 * @param {Array} values The values to append.
  		 * @returns {Array} Returns `array`.
  		 */
  		function arrayPush(array, values) {
  		  var index = -1,
  		      length = values.length,
  		      offset = array.length;

  		  while (++index < length) {
  		    array[offset + index] = values[index];
  		  }
  		  return array;
  		}

  		/**
  		 * A specialized version of `_.reduce` for arrays without support for
  		 * iteratee shorthands.
  		 *
  		 * @private
  		 * @param {Array} [array] The array to iterate over.
  		 * @param {Function} iteratee The function invoked per iteration.
  		 * @param {*} [accumulator] The initial value.
  		 * @param {boolean} [initAccum] Specify using the first element of `array` as
  		 *  the initial value.
  		 * @returns {*} Returns the accumulated value.
  		 */
  		function arrayReduce(array, iteratee, accumulator, initAccum) {
  		  var index = -1,
  		      length = array ? array.length : 0;
  		  while (++index < length) {
  		    accumulator = iteratee(accumulator, array[index], index, array);
  		  }
  		  return accumulator;
  		}

  		/**
  		 * The base implementation of `_.times` without support for iteratee shorthands
  		 * or max array length checks.
  		 *
  		 * @private
  		 * @param {number} n The number of times to invoke `iteratee`.
  		 * @param {Function} iteratee The function invoked per iteration.
  		 * @returns {Array} Returns the array of results.
  		 */
  		function baseTimes(n, iteratee) {
  		  var index = -1,
  		      result = Array(n);

  		  while (++index < n) {
  		    result[index] = iteratee(index);
  		  }
  		  return result;
  		}

  		/**
  		 * Gets the value at `key` of `object`.
  		 *
  		 * @private
  		 * @param {Object} [object] The object to query.
  		 * @param {string} key The key of the property to get.
  		 * @returns {*} Returns the property value.
  		 */
  		function getValue(object, key) {
  		  return object == null ? undefined : object[key];
  		}

  		/**
  		 * Checks if `value` is a host object in IE < 9.
  		 *
  		 * @private
  		 * @param {*} value The value to check.
  		 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
  		 */
  		function isHostObject(value) {
  		  // Many host objects are `Object` objects that can coerce to strings
  		  // despite having improperly defined `toString` methods.
  		  var result = false;
  		  if (value != null && typeof value.toString != 'function') {
  		    try {
  		      result = !!(value + '');
  		    } catch (e) {}
  		  }
  		  return result;
  		}

  		/**
  		 * Converts `map` to its key-value pairs.
  		 *
  		 * @private
  		 * @param {Object} map The map to convert.
  		 * @returns {Array} Returns the key-value pairs.
  		 */
  		function mapToArray(map) {
  		  var index = -1,
  		      result = Array(map.size);

  		  map.forEach(function(value, key) {
  		    result[++index] = [key, value];
  		  });
  		  return result;
  		}

  		/**
  		 * Creates a unary function that invokes `func` with its argument transformed.
  		 *
  		 * @private
  		 * @param {Function} func The function to wrap.
  		 * @param {Function} transform The argument transform.
  		 * @returns {Function} Returns the new function.
  		 */
  		function overArg(func, transform) {
  		  return function(arg) {
  		    return func(transform(arg));
  		  };
  		}

  		/**
  		 * Converts `set` to an array of its values.
  		 *
  		 * @private
  		 * @param {Object} set The set to convert.
  		 * @returns {Array} Returns the values.
  		 */
  		function setToArray(set) {
  		  var index = -1,
  		      result = Array(set.size);

  		  set.forEach(function(value) {
  		    result[++index] = value;
  		  });
  		  return result;
  		}

  		/** Used for built-in method references. */
  		var arrayProto = Array.prototype,
  		    funcProto = Function.prototype,
  		    objectProto = Object.prototype;

  		/** Used to detect overreaching core-js shims. */
  		var coreJsData = root['__core-js_shared__'];

  		/** Used to detect methods masquerading as native. */
  		var maskSrcKey = (function() {
  		  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  		  return uid ? ('Symbol(src)_1.' + uid) : '';
  		}());

  		/** Used to resolve the decompiled source of functions. */
  		var funcToString = funcProto.toString;

  		/** Used to check objects for own properties. */
  		var hasOwnProperty = objectProto.hasOwnProperty;

  		/**
  		 * Used to resolve the
  		 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
  		 * of values.
  		 */
  		var objectToString = objectProto.toString;

  		/** Used to detect if a method is native. */
  		var reIsNative = RegExp('^' +
  		  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  		  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
  		);

  		/** Built-in value references. */
  		var Buffer = moduleExports ? root.Buffer : undefined,
  		    Symbol = root.Symbol,
  		    Uint8Array = root.Uint8Array,
  		    getPrototype = overArg(Object.getPrototypeOf, Object),
  		    objectCreate = Object.create,
  		    propertyIsEnumerable = objectProto.propertyIsEnumerable,
  		    splice = arrayProto.splice;

  		/* Built-in method references for those with the same name as other `lodash` methods. */
  		var nativeGetSymbols = Object.getOwnPropertySymbols,
  		    nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined,
  		    nativeKeys = overArg(Object.keys, Object);

  		/* Built-in method references that are verified to be native. */
  		var DataView = getNative(root, 'DataView'),
  		    Map = getNative(root, 'Map'),
  		    Promise = getNative(root, 'Promise'),
  		    Set = getNative(root, 'Set'),
  		    WeakMap = getNative(root, 'WeakMap'),
  		    nativeCreate = getNative(Object, 'create');

  		/** Used to detect maps, sets, and weakmaps. */
  		var dataViewCtorString = toSource(DataView),
  		    mapCtorString = toSource(Map),
  		    promiseCtorString = toSource(Promise),
  		    setCtorString = toSource(Set),
  		    weakMapCtorString = toSource(WeakMap);

  		/** Used to convert symbols to primitives and strings. */
  		var symbolProto = Symbol ? Symbol.prototype : undefined,
  		    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

  		/**
  		 * Creates a hash object.
  		 *
  		 * @private
  		 * @constructor
  		 * @param {Array} [entries] The key-value pairs to cache.
  		 */
  		function Hash(entries) {
  		  var index = -1,
  		      length = entries ? entries.length : 0;

  		  this.clear();
  		  while (++index < length) {
  		    var entry = entries[index];
  		    this.set(entry[0], entry[1]);
  		  }
  		}

  		/**
  		 * Removes all key-value entries from the hash.
  		 *
  		 * @private
  		 * @name clear
  		 * @memberOf Hash
  		 */
  		function hashClear() {
  		  this.__data__ = nativeCreate ? nativeCreate(null) : {};
  		}

  		/**
  		 * Removes `key` and its value from the hash.
  		 *
  		 * @private
  		 * @name delete
  		 * @memberOf Hash
  		 * @param {Object} hash The hash to modify.
  		 * @param {string} key The key of the value to remove.
  		 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
  		 */
  		function hashDelete(key) {
  		  return this.has(key) && delete this.__data__[key];
  		}

  		/**
  		 * Gets the hash value for `key`.
  		 *
  		 * @private
  		 * @name get
  		 * @memberOf Hash
  		 * @param {string} key The key of the value to get.
  		 * @returns {*} Returns the entry value.
  		 */
  		function hashGet(key) {
  		  var data = this.__data__;
  		  if (nativeCreate) {
  		    var result = data[key];
  		    return result === HASH_UNDEFINED ? undefined : result;
  		  }
  		  return hasOwnProperty.call(data, key) ? data[key] : undefined;
  		}

  		/**
  		 * Checks if a hash value for `key` exists.
  		 *
  		 * @private
  		 * @name has
  		 * @memberOf Hash
  		 * @param {string} key The key of the entry to check.
  		 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
  		 */
  		function hashHas(key) {
  		  var data = this.__data__;
  		  return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key);
  		}

  		/**
  		 * Sets the hash `key` to `value`.
  		 *
  		 * @private
  		 * @name set
  		 * @memberOf Hash
  		 * @param {string} key The key of the value to set.
  		 * @param {*} value The value to set.
  		 * @returns {Object} Returns the hash instance.
  		 */
  		function hashSet(key, value) {
  		  var data = this.__data__;
  		  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
  		  return this;
  		}

  		// Add methods to `Hash`.
  		Hash.prototype.clear = hashClear;
  		Hash.prototype['delete'] = hashDelete;
  		Hash.prototype.get = hashGet;
  		Hash.prototype.has = hashHas;
  		Hash.prototype.set = hashSet;

  		/**
  		 * Creates an list cache object.
  		 *
  		 * @private
  		 * @constructor
  		 * @param {Array} [entries] The key-value pairs to cache.
  		 */
  		function ListCache(entries) {
  		  var index = -1,
  		      length = entries ? entries.length : 0;

  		  this.clear();
  		  while (++index < length) {
  		    var entry = entries[index];
  		    this.set(entry[0], entry[1]);
  		  }
  		}

  		/**
  		 * Removes all key-value entries from the list cache.
  		 *
  		 * @private
  		 * @name clear
  		 * @memberOf ListCache
  		 */
  		function listCacheClear() {
  		  this.__data__ = [];
  		}

  		/**
  		 * Removes `key` and its value from the list cache.
  		 *
  		 * @private
  		 * @name delete
  		 * @memberOf ListCache
  		 * @param {string} key The key of the value to remove.
  		 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
  		 */
  		function listCacheDelete(key) {
  		  var data = this.__data__,
  		      index = assocIndexOf(data, key);

  		  if (index < 0) {
  		    return false;
  		  }
  		  var lastIndex = data.length - 1;
  		  if (index == lastIndex) {
  		    data.pop();
  		  } else {
  		    splice.call(data, index, 1);
  		  }
  		  return true;
  		}

  		/**
  		 * Gets the list cache value for `key`.
  		 *
  		 * @private
  		 * @name get
  		 * @memberOf ListCache
  		 * @param {string} key The key of the value to get.
  		 * @returns {*} Returns the entry value.
  		 */
  		function listCacheGet(key) {
  		  var data = this.__data__,
  		      index = assocIndexOf(data, key);

  		  return index < 0 ? undefined : data[index][1];
  		}

  		/**
  		 * Checks if a list cache value for `key` exists.
  		 *
  		 * @private
  		 * @name has
  		 * @memberOf ListCache
  		 * @param {string} key The key of the entry to check.
  		 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
  		 */
  		function listCacheHas(key) {
  		  return assocIndexOf(this.__data__, key) > -1;
  		}

  		/**
  		 * Sets the list cache `key` to `value`.
  		 *
  		 * @private
  		 * @name set
  		 * @memberOf ListCache
  		 * @param {string} key The key of the value to set.
  		 * @param {*} value The value to set.
  		 * @returns {Object} Returns the list cache instance.
  		 */
  		function listCacheSet(key, value) {
  		  var data = this.__data__,
  		      index = assocIndexOf(data, key);

  		  if (index < 0) {
  		    data.push([key, value]);
  		  } else {
  		    data[index][1] = value;
  		  }
  		  return this;
  		}

  		// Add methods to `ListCache`.
  		ListCache.prototype.clear = listCacheClear;
  		ListCache.prototype['delete'] = listCacheDelete;
  		ListCache.prototype.get = listCacheGet;
  		ListCache.prototype.has = listCacheHas;
  		ListCache.prototype.set = listCacheSet;

  		/**
  		 * Creates a map cache object to store key-value pairs.
  		 *
  		 * @private
  		 * @constructor
  		 * @param {Array} [entries] The key-value pairs to cache.
  		 */
  		function MapCache(entries) {
  		  var index = -1,
  		      length = entries ? entries.length : 0;

  		  this.clear();
  		  while (++index < length) {
  		    var entry = entries[index];
  		    this.set(entry[0], entry[1]);
  		  }
  		}

  		/**
  		 * Removes all key-value entries from the map.
  		 *
  		 * @private
  		 * @name clear
  		 * @memberOf MapCache
  		 */
  		function mapCacheClear() {
  		  this.__data__ = {
  		    'hash': new Hash,
  		    'map': new (Map || ListCache),
  		    'string': new Hash
  		  };
  		}

  		/**
  		 * Removes `key` and its value from the map.
  		 *
  		 * @private
  		 * @name delete
  		 * @memberOf MapCache
  		 * @param {string} key The key of the value to remove.
  		 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
  		 */
  		function mapCacheDelete(key) {
  		  return getMapData(this, key)['delete'](key);
  		}

  		/**
  		 * Gets the map value for `key`.
  		 *
  		 * @private
  		 * @name get
  		 * @memberOf MapCache
  		 * @param {string} key The key of the value to get.
  		 * @returns {*} Returns the entry value.
  		 */
  		function mapCacheGet(key) {
  		  return getMapData(this, key).get(key);
  		}

  		/**
  		 * Checks if a map value for `key` exists.
  		 *
  		 * @private
  		 * @name has
  		 * @memberOf MapCache
  		 * @param {string} key The key of the entry to check.
  		 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
  		 */
  		function mapCacheHas(key) {
  		  return getMapData(this, key).has(key);
  		}

  		/**
  		 * Sets the map `key` to `value`.
  		 *
  		 * @private
  		 * @name set
  		 * @memberOf MapCache
  		 * @param {string} key The key of the value to set.
  		 * @param {*} value The value to set.
  		 * @returns {Object} Returns the map cache instance.
  		 */
  		function mapCacheSet(key, value) {
  		  getMapData(this, key).set(key, value);
  		  return this;
  		}

  		// Add methods to `MapCache`.
  		MapCache.prototype.clear = mapCacheClear;
  		MapCache.prototype['delete'] = mapCacheDelete;
  		MapCache.prototype.get = mapCacheGet;
  		MapCache.prototype.has = mapCacheHas;
  		MapCache.prototype.set = mapCacheSet;

  		/**
  		 * Creates a stack cache object to store key-value pairs.
  		 *
  		 * @private
  		 * @constructor
  		 * @param {Array} [entries] The key-value pairs to cache.
  		 */
  		function Stack(entries) {
  		  this.__data__ = new ListCache(entries);
  		}

  		/**
  		 * Removes all key-value entries from the stack.
  		 *
  		 * @private
  		 * @name clear
  		 * @memberOf Stack
  		 */
  		function stackClear() {
  		  this.__data__ = new ListCache;
  		}

  		/**
  		 * Removes `key` and its value from the stack.
  		 *
  		 * @private
  		 * @name delete
  		 * @memberOf Stack
  		 * @param {string} key The key of the value to remove.
  		 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
  		 */
  		function stackDelete(key) {
  		  return this.__data__['delete'](key);
  		}

  		/**
  		 * Gets the stack value for `key`.
  		 *
  		 * @private
  		 * @name get
  		 * @memberOf Stack
  		 * @param {string} key The key of the value to get.
  		 * @returns {*} Returns the entry value.
  		 */
  		function stackGet(key) {
  		  return this.__data__.get(key);
  		}

  		/**
  		 * Checks if a stack value for `key` exists.
  		 *
  		 * @private
  		 * @name has
  		 * @memberOf Stack
  		 * @param {string} key The key of the entry to check.
  		 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
  		 */
  		function stackHas(key) {
  		  return this.__data__.has(key);
  		}

  		/**
  		 * Sets the stack `key` to `value`.
  		 *
  		 * @private
  		 * @name set
  		 * @memberOf Stack
  		 * @param {string} key The key of the value to set.
  		 * @param {*} value The value to set.
  		 * @returns {Object} Returns the stack cache instance.
  		 */
  		function stackSet(key, value) {
  		  var cache = this.__data__;
  		  if (cache instanceof ListCache) {
  		    var pairs = cache.__data__;
  		    if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
  		      pairs.push([key, value]);
  		      return this;
  		    }
  		    cache = this.__data__ = new MapCache(pairs);
  		  }
  		  cache.set(key, value);
  		  return this;
  		}

  		// Add methods to `Stack`.
  		Stack.prototype.clear = stackClear;
  		Stack.prototype['delete'] = stackDelete;
  		Stack.prototype.get = stackGet;
  		Stack.prototype.has = stackHas;
  		Stack.prototype.set = stackSet;

  		/**
  		 * Creates an array of the enumerable property names of the array-like `value`.
  		 *
  		 * @private
  		 * @param {*} value The value to query.
  		 * @param {boolean} inherited Specify returning inherited property names.
  		 * @returns {Array} Returns the array of property names.
  		 */
  		function arrayLikeKeys(value, inherited) {
  		  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
  		  // Safari 9 makes `arguments.length` enumerable in strict mode.
  		  var result = (isArray(value) || isArguments(value))
  		    ? baseTimes(value.length, String)
  		    : [];

  		  var length = result.length,
  		      skipIndexes = !!length;

  		  for (var key in value) {
  		    if ((hasOwnProperty.call(value, key)) &&
  		        !(skipIndexes && (key == 'length' || isIndex(key, length)))) {
  		      result.push(key);
  		    }
  		  }
  		  return result;
  		}

  		/**
  		 * Assigns `value` to `key` of `object` if the existing value is not equivalent
  		 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
  		 * for equality comparisons.
  		 *
  		 * @private
  		 * @param {Object} object The object to modify.
  		 * @param {string} key The key of the property to assign.
  		 * @param {*} value The value to assign.
  		 */
  		function assignValue(object, key, value) {
  		  var objValue = object[key];
  		  if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
  		      (value === undefined && !(key in object))) {
  		    object[key] = value;
  		  }
  		}

  		/**
  		 * Gets the index at which the `key` is found in `array` of key-value pairs.
  		 *
  		 * @private
  		 * @param {Array} array The array to inspect.
  		 * @param {*} key The key to search for.
  		 * @returns {number} Returns the index of the matched value, else `-1`.
  		 */
  		function assocIndexOf(array, key) {
  		  var length = array.length;
  		  while (length--) {
  		    if (eq(array[length][0], key)) {
  		      return length;
  		    }
  		  }
  		  return -1;
  		}

  		/**
  		 * The base implementation of `_.assign` without support for multiple sources
  		 * or `customizer` functions.
  		 *
  		 * @private
  		 * @param {Object} object The destination object.
  		 * @param {Object} source The source object.
  		 * @returns {Object} Returns `object`.
  		 */
  		function baseAssign(object, source) {
  		  return object && copyObject(source, keys(source), object);
  		}

  		/**
  		 * The base implementation of `_.clone` and `_.cloneDeep` which tracks
  		 * traversed objects.
  		 *
  		 * @private
  		 * @param {*} value The value to clone.
  		 * @param {boolean} [isDeep] Specify a deep clone.
  		 * @param {boolean} [isFull] Specify a clone including symbols.
  		 * @param {Function} [customizer] The function to customize cloning.
  		 * @param {string} [key] The key of `value`.
  		 * @param {Object} [object] The parent object of `value`.
  		 * @param {Object} [stack] Tracks traversed objects and their clone counterparts.
  		 * @returns {*} Returns the cloned value.
  		 */
  		function baseClone(value, isDeep, isFull, customizer, key, object, stack) {
  		  var result;
  		  if (customizer) {
  		    result = object ? customizer(value, key, object, stack) : customizer(value);
  		  }
  		  if (result !== undefined) {
  		    return result;
  		  }
  		  if (!isObject(value)) {
  		    return value;
  		  }
  		  var isArr = isArray(value);
  		  if (isArr) {
  		    result = initCloneArray(value);
  		    if (!isDeep) {
  		      return copyArray(value, result);
  		    }
  		  } else {
  		    var tag = getTag(value),
  		        isFunc = tag == funcTag || tag == genTag;

  		    if (isBuffer(value)) {
  		      return cloneBuffer(value, isDeep);
  		    }
  		    if (tag == objectTag || tag == argsTag || (isFunc && !object)) {
  		      if (isHostObject(value)) {
  		        return object ? value : {};
  		      }
  		      result = initCloneObject(isFunc ? {} : value);
  		      if (!isDeep) {
  		        return copySymbols(value, baseAssign(result, value));
  		      }
  		    } else {
  		      if (!cloneableTags[tag]) {
  		        return object ? value : {};
  		      }
  		      result = initCloneByTag(value, tag, baseClone, isDeep);
  		    }
  		  }
  		  // Check for circular references and return its corresponding clone.
  		  stack || (stack = new Stack);
  		  var stacked = stack.get(value);
  		  if (stacked) {
  		    return stacked;
  		  }
  		  stack.set(value, result);

  		  if (!isArr) {
  		    var props = isFull ? getAllKeys(value) : keys(value);
  		  }
  		  arrayEach(props || value, function(subValue, key) {
  		    if (props) {
  		      key = subValue;
  		      subValue = value[key];
  		    }
  		    // Recursively populate clone (susceptible to call stack limits).
  		    assignValue(result, key, baseClone(subValue, isDeep, isFull, customizer, key, value, stack));
  		  });
  		  return result;
  		}

  		/**
  		 * The base implementation of `_.create` without support for assigning
  		 * properties to the created object.
  		 *
  		 * @private
  		 * @param {Object} prototype The object to inherit from.
  		 * @returns {Object} Returns the new object.
  		 */
  		function baseCreate(proto) {
  		  return isObject(proto) ? objectCreate(proto) : {};
  		}

  		/**
  		 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
  		 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
  		 * symbols of `object`.
  		 *
  		 * @private
  		 * @param {Object} object The object to query.
  		 * @param {Function} keysFunc The function to get the keys of `object`.
  		 * @param {Function} symbolsFunc The function to get the symbols of `object`.
  		 * @returns {Array} Returns the array of property names and symbols.
  		 */
  		function baseGetAllKeys(object, keysFunc, symbolsFunc) {
  		  var result = keysFunc(object);
  		  return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
  		}

  		/**
  		 * The base implementation of `getTag`.
  		 *
  		 * @private
  		 * @param {*} value The value to query.
  		 * @returns {string} Returns the `toStringTag`.
  		 */
  		function baseGetTag(value) {
  		  return objectToString.call(value);
  		}

  		/**
  		 * The base implementation of `_.isNative` without bad shim checks.
  		 *
  		 * @private
  		 * @param {*} value The value to check.
  		 * @returns {boolean} Returns `true` if `value` is a native function,
  		 *  else `false`.
  		 */
  		function baseIsNative(value) {
  		  if (!isObject(value) || isMasked(value)) {
  		    return false;
  		  }
  		  var pattern = (isFunction(value) || isHostObject(value)) ? reIsNative : reIsHostCtor;
  		  return pattern.test(toSource(value));
  		}

  		/**
  		 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
  		 *
  		 * @private
  		 * @param {Object} object The object to query.
  		 * @returns {Array} Returns the array of property names.
  		 */
  		function baseKeys(object) {
  		  if (!isPrototype(object)) {
  		    return nativeKeys(object);
  		  }
  		  var result = [];
  		  for (var key in Object(object)) {
  		    if (hasOwnProperty.call(object, key) && key != 'constructor') {
  		      result.push(key);
  		    }
  		  }
  		  return result;
  		}

  		/**
  		 * Creates a clone of  `buffer`.
  		 *
  		 * @private
  		 * @param {Buffer} buffer The buffer to clone.
  		 * @param {boolean} [isDeep] Specify a deep clone.
  		 * @returns {Buffer} Returns the cloned buffer.
  		 */
  		function cloneBuffer(buffer, isDeep) {
  		  if (isDeep) {
  		    return buffer.slice();
  		  }
  		  var result = new buffer.constructor(buffer.length);
  		  buffer.copy(result);
  		  return result;
  		}

  		/**
  		 * Creates a clone of `arrayBuffer`.
  		 *
  		 * @private
  		 * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
  		 * @returns {ArrayBuffer} Returns the cloned array buffer.
  		 */
  		function cloneArrayBuffer(arrayBuffer) {
  		  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
  		  new Uint8Array(result).set(new Uint8Array(arrayBuffer));
  		  return result;
  		}

  		/**
  		 * Creates a clone of `dataView`.
  		 *
  		 * @private
  		 * @param {Object} dataView The data view to clone.
  		 * @param {boolean} [isDeep] Specify a deep clone.
  		 * @returns {Object} Returns the cloned data view.
  		 */
  		function cloneDataView(dataView, isDeep) {
  		  var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
  		  return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
  		}

  		/**
  		 * Creates a clone of `map`.
  		 *
  		 * @private
  		 * @param {Object} map The map to clone.
  		 * @param {Function} cloneFunc The function to clone values.
  		 * @param {boolean} [isDeep] Specify a deep clone.
  		 * @returns {Object} Returns the cloned map.
  		 */
  		function cloneMap(map, isDeep, cloneFunc) {
  		  var array = isDeep ? cloneFunc(mapToArray(map), true) : mapToArray(map);
  		  return arrayReduce(array, addMapEntry, new map.constructor);
  		}

  		/**
  		 * Creates a clone of `regexp`.
  		 *
  		 * @private
  		 * @param {Object} regexp The regexp to clone.
  		 * @returns {Object} Returns the cloned regexp.
  		 */
  		function cloneRegExp(regexp) {
  		  var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
  		  result.lastIndex = regexp.lastIndex;
  		  return result;
  		}

  		/**
  		 * Creates a clone of `set`.
  		 *
  		 * @private
  		 * @param {Object} set The set to clone.
  		 * @param {Function} cloneFunc The function to clone values.
  		 * @param {boolean} [isDeep] Specify a deep clone.
  		 * @returns {Object} Returns the cloned set.
  		 */
  		function cloneSet(set, isDeep, cloneFunc) {
  		  var array = isDeep ? cloneFunc(setToArray(set), true) : setToArray(set);
  		  return arrayReduce(array, addSetEntry, new set.constructor);
  		}

  		/**
  		 * Creates a clone of the `symbol` object.
  		 *
  		 * @private
  		 * @param {Object} symbol The symbol object to clone.
  		 * @returns {Object} Returns the cloned symbol object.
  		 */
  		function cloneSymbol(symbol) {
  		  return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
  		}

  		/**
  		 * Creates a clone of `typedArray`.
  		 *
  		 * @private
  		 * @param {Object} typedArray The typed array to clone.
  		 * @param {boolean} [isDeep] Specify a deep clone.
  		 * @returns {Object} Returns the cloned typed array.
  		 */
  		function cloneTypedArray(typedArray, isDeep) {
  		  var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
  		  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
  		}

  		/**
  		 * Copies the values of `source` to `array`.
  		 *
  		 * @private
  		 * @param {Array} source The array to copy values from.
  		 * @param {Array} [array=[]] The array to copy values to.
  		 * @returns {Array} Returns `array`.
  		 */
  		function copyArray(source, array) {
  		  var index = -1,
  		      length = source.length;

  		  array || (array = Array(length));
  		  while (++index < length) {
  		    array[index] = source[index];
  		  }
  		  return array;
  		}

  		/**
  		 * Copies properties of `source` to `object`.
  		 *
  		 * @private
  		 * @param {Object} source The object to copy properties from.
  		 * @param {Array} props The property identifiers to copy.
  		 * @param {Object} [object={}] The object to copy properties to.
  		 * @param {Function} [customizer] The function to customize copied values.
  		 * @returns {Object} Returns `object`.
  		 */
  		function copyObject(source, props, object, customizer) {
  		  object || (object = {});

  		  var index = -1,
  		      length = props.length;

  		  while (++index < length) {
  		    var key = props[index];

  		    var newValue = undefined;

  		    assignValue(object, key, newValue === undefined ? source[key] : newValue);
  		  }
  		  return object;
  		}

  		/**
  		 * Copies own symbol properties of `source` to `object`.
  		 *
  		 * @private
  		 * @param {Object} source The object to copy symbols from.
  		 * @param {Object} [object={}] The object to copy symbols to.
  		 * @returns {Object} Returns `object`.
  		 */
  		function copySymbols(source, object) {
  		  return copyObject(source, getSymbols(source), object);
  		}

  		/**
  		 * Creates an array of own enumerable property names and symbols of `object`.
  		 *
  		 * @private
  		 * @param {Object} object The object to query.
  		 * @returns {Array} Returns the array of property names and symbols.
  		 */
  		function getAllKeys(object) {
  		  return baseGetAllKeys(object, keys, getSymbols);
  		}

  		/**
  		 * Gets the data for `map`.
  		 *
  		 * @private
  		 * @param {Object} map The map to query.
  		 * @param {string} key The reference key.
  		 * @returns {*} Returns the map data.
  		 */
  		function getMapData(map, key) {
  		  var data = map.__data__;
  		  return isKeyable(key)
  		    ? data[typeof key == 'string' ? 'string' : 'hash']
  		    : data.map;
  		}

  		/**
  		 * Gets the native function at `key` of `object`.
  		 *
  		 * @private
  		 * @param {Object} object The object to query.
  		 * @param {string} key The key of the method to get.
  		 * @returns {*} Returns the function if it's native, else `undefined`.
  		 */
  		function getNative(object, key) {
  		  var value = getValue(object, key);
  		  return baseIsNative(value) ? value : undefined;
  		}

  		/**
  		 * Creates an array of the own enumerable symbol properties of `object`.
  		 *
  		 * @private
  		 * @param {Object} object The object to query.
  		 * @returns {Array} Returns the array of symbols.
  		 */
  		var getSymbols = nativeGetSymbols ? overArg(nativeGetSymbols, Object) : stubArray;

  		/**
  		 * Gets the `toStringTag` of `value`.
  		 *
  		 * @private
  		 * @param {*} value The value to query.
  		 * @returns {string} Returns the `toStringTag`.
  		 */
  		var getTag = baseGetTag;

  		// Fallback for data views, maps, sets, and weak maps in IE 11,
  		// for data views in Edge < 14, and promises in Node.js.
  		if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
  		    (Map && getTag(new Map) != mapTag) ||
  		    (Promise && getTag(Promise.resolve()) != promiseTag) ||
  		    (Set && getTag(new Set) != setTag) ||
  		    (WeakMap && getTag(new WeakMap) != weakMapTag)) {
  		  getTag = function(value) {
  		    var result = objectToString.call(value),
  		        Ctor = result == objectTag ? value.constructor : undefined,
  		        ctorString = Ctor ? toSource(Ctor) : undefined;

  		    if (ctorString) {
  		      switch (ctorString) {
  		        case dataViewCtorString: return dataViewTag;
  		        case mapCtorString: return mapTag;
  		        case promiseCtorString: return promiseTag;
  		        case setCtorString: return setTag;
  		        case weakMapCtorString: return weakMapTag;
  		      }
  		    }
  		    return result;
  		  };
  		}

  		/**
  		 * Initializes an array clone.
  		 *
  		 * @private
  		 * @param {Array} array The array to clone.
  		 * @returns {Array} Returns the initialized clone.
  		 */
  		function initCloneArray(array) {
  		  var length = array.length,
  		      result = array.constructor(length);

  		  // Add properties assigned by `RegExp#exec`.
  		  if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
  		    result.index = array.index;
  		    result.input = array.input;
  		  }
  		  return result;
  		}

  		/**
  		 * Initializes an object clone.
  		 *
  		 * @private
  		 * @param {Object} object The object to clone.
  		 * @returns {Object} Returns the initialized clone.
  		 */
  		function initCloneObject(object) {
  		  return (typeof object.constructor == 'function' && !isPrototype(object))
  		    ? baseCreate(getPrototype(object))
  		    : {};
  		}

  		/**
  		 * Initializes an object clone based on its `toStringTag`.
  		 *
  		 * **Note:** This function only supports cloning values with tags of
  		 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
  		 *
  		 * @private
  		 * @param {Object} object The object to clone.
  		 * @param {string} tag The `toStringTag` of the object to clone.
  		 * @param {Function} cloneFunc The function to clone values.
  		 * @param {boolean} [isDeep] Specify a deep clone.
  		 * @returns {Object} Returns the initialized clone.
  		 */
  		function initCloneByTag(object, tag, cloneFunc, isDeep) {
  		  var Ctor = object.constructor;
  		  switch (tag) {
  		    case arrayBufferTag:
  		      return cloneArrayBuffer(object);

  		    case boolTag:
  		    case dateTag:
  		      return new Ctor(+object);

  		    case dataViewTag:
  		      return cloneDataView(object, isDeep);

  		    case float32Tag: case float64Tag:
  		    case int8Tag: case int16Tag: case int32Tag:
  		    case uint8Tag: case uint8ClampedTag: case uint16Tag: case uint32Tag:
  		      return cloneTypedArray(object, isDeep);

  		    case mapTag:
  		      return cloneMap(object, isDeep, cloneFunc);

  		    case numberTag:
  		    case stringTag:
  		      return new Ctor(object);

  		    case regexpTag:
  		      return cloneRegExp(object);

  		    case setTag:
  		      return cloneSet(object, isDeep, cloneFunc);

  		    case symbolTag:
  		      return cloneSymbol(object);
  		  }
  		}

  		/**
  		 * Checks if `value` is a valid array-like index.
  		 *
  		 * @private
  		 * @param {*} value The value to check.
  		 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
  		 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
  		 */
  		function isIndex(value, length) {
  		  length = length == null ? MAX_SAFE_INTEGER : length;
  		  return !!length &&
  		    (typeof value == 'number' || reIsUint.test(value)) &&
  		    (value > -1 && value % 1 == 0 && value < length);
  		}

  		/**
  		 * Checks if `value` is suitable for use as unique object key.
  		 *
  		 * @private
  		 * @param {*} value The value to check.
  		 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
  		 */
  		function isKeyable(value) {
  		  var type = typeof value;
  		  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
  		    ? (value !== '__proto__')
  		    : (value === null);
  		}

  		/**
  		 * Checks if `func` has its source masked.
  		 *
  		 * @private
  		 * @param {Function} func The function to check.
  		 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
  		 */
  		function isMasked(func) {
  		  return !!maskSrcKey && (maskSrcKey in func);
  		}

  		/**
  		 * Checks if `value` is likely a prototype object.
  		 *
  		 * @private
  		 * @param {*} value The value to check.
  		 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
  		 */
  		function isPrototype(value) {
  		  var Ctor = value && value.constructor,
  		      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

  		  return value === proto;
  		}

  		/**
  		 * Converts `func` to its source code.
  		 *
  		 * @private
  		 * @param {Function} func The function to process.
  		 * @returns {string} Returns the source code.
  		 */
  		function toSource(func) {
  		  if (func != null) {
  		    try {
  		      return funcToString.call(func);
  		    } catch (e) {}
  		    try {
  		      return (func + '');
  		    } catch (e) {}
  		  }
  		  return '';
  		}

  		/**
  		 * This method is like `_.clone` except that it recursively clones `value`.
  		 *
  		 * @static
  		 * @memberOf _
  		 * @since 1.0.0
  		 * @category Lang
  		 * @param {*} value The value to recursively clone.
  		 * @returns {*} Returns the deep cloned value.
  		 * @see _.clone
  		 * @example
  		 *
  		 * var objects = [{ 'a': 1 }, { 'b': 2 }];
  		 *
  		 * var deep = _.cloneDeep(objects);
  		 * console.log(deep[0] === objects[0]);
  		 * // => false
  		 */
  		function cloneDeep(value) {
  		  return baseClone(value, true, true);
  		}

  		/**
  		 * Performs a
  		 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
  		 * comparison between two values to determine if they are equivalent.
  		 *
  		 * @static
  		 * @memberOf _
  		 * @since 4.0.0
  		 * @category Lang
  		 * @param {*} value The value to compare.
  		 * @param {*} other The other value to compare.
  		 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
  		 * @example
  		 *
  		 * var object = { 'a': 1 };
  		 * var other = { 'a': 1 };
  		 *
  		 * _.eq(object, object);
  		 * // => true
  		 *
  		 * _.eq(object, other);
  		 * // => false
  		 *
  		 * _.eq('a', 'a');
  		 * // => true
  		 *
  		 * _.eq('a', Object('a'));
  		 * // => false
  		 *
  		 * _.eq(NaN, NaN);
  		 * // => true
  		 */
  		function eq(value, other) {
  		  return value === other || (value !== value && other !== other);
  		}

  		/**
  		 * Checks if `value` is likely an `arguments` object.
  		 *
  		 * @static
  		 * @memberOf _
  		 * @since 0.1.0
  		 * @category Lang
  		 * @param {*} value The value to check.
  		 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
  		 *  else `false`.
  		 * @example
  		 *
  		 * _.isArguments(function() { return arguments; }());
  		 * // => true
  		 *
  		 * _.isArguments([1, 2, 3]);
  		 * // => false
  		 */
  		function isArguments(value) {
  		  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
  		  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') &&
  		    (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
  		}

  		/**
  		 * Checks if `value` is classified as an `Array` object.
  		 *
  		 * @static
  		 * @memberOf _
  		 * @since 0.1.0
  		 * @category Lang
  		 * @param {*} value The value to check.
  		 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
  		 * @example
  		 *
  		 * _.isArray([1, 2, 3]);
  		 * // => true
  		 *
  		 * _.isArray(document.body.children);
  		 * // => false
  		 *
  		 * _.isArray('abc');
  		 * // => false
  		 *
  		 * _.isArray(_.noop);
  		 * // => false
  		 */
  		var isArray = Array.isArray;

  		/**
  		 * Checks if `value` is array-like. A value is considered array-like if it's
  		 * not a function and has a `value.length` that's an integer greater than or
  		 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
  		 *
  		 * @static
  		 * @memberOf _
  		 * @since 4.0.0
  		 * @category Lang
  		 * @param {*} value The value to check.
  		 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
  		 * @example
  		 *
  		 * _.isArrayLike([1, 2, 3]);
  		 * // => true
  		 *
  		 * _.isArrayLike(document.body.children);
  		 * // => true
  		 *
  		 * _.isArrayLike('abc');
  		 * // => true
  		 *
  		 * _.isArrayLike(_.noop);
  		 * // => false
  		 */
  		function isArrayLike(value) {
  		  return value != null && isLength(value.length) && !isFunction(value);
  		}

  		/**
  		 * This method is like `_.isArrayLike` except that it also checks if `value`
  		 * is an object.
  		 *
  		 * @static
  		 * @memberOf _
  		 * @since 4.0.0
  		 * @category Lang
  		 * @param {*} value The value to check.
  		 * @returns {boolean} Returns `true` if `value` is an array-like object,
  		 *  else `false`.
  		 * @example
  		 *
  		 * _.isArrayLikeObject([1, 2, 3]);
  		 * // => true
  		 *
  		 * _.isArrayLikeObject(document.body.children);
  		 * // => true
  		 *
  		 * _.isArrayLikeObject('abc');
  		 * // => false
  		 *
  		 * _.isArrayLikeObject(_.noop);
  		 * // => false
  		 */
  		function isArrayLikeObject(value) {
  		  return isObjectLike(value) && isArrayLike(value);
  		}

  		/**
  		 * Checks if `value` is a buffer.
  		 *
  		 * @static
  		 * @memberOf _
  		 * @since 4.3.0
  		 * @category Lang
  		 * @param {*} value The value to check.
  		 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
  		 * @example
  		 *
  		 * _.isBuffer(new Buffer(2));
  		 * // => true
  		 *
  		 * _.isBuffer(new Uint8Array(2));
  		 * // => false
  		 */
  		var isBuffer = nativeIsBuffer || stubFalse;

  		/**
  		 * Checks if `value` is classified as a `Function` object.
  		 *
  		 * @static
  		 * @memberOf _
  		 * @since 0.1.0
  		 * @category Lang
  		 * @param {*} value The value to check.
  		 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
  		 * @example
  		 *
  		 * _.isFunction(_);
  		 * // => true
  		 *
  		 * _.isFunction(/abc/);
  		 * // => false
  		 */
  		function isFunction(value) {
  		  // The use of `Object#toString` avoids issues with the `typeof` operator
  		  // in Safari 8-9 which returns 'object' for typed array and other constructors.
  		  var tag = isObject(value) ? objectToString.call(value) : '';
  		  return tag == funcTag || tag == genTag;
  		}

  		/**
  		 * Checks if `value` is a valid array-like length.
  		 *
  		 * **Note:** This method is loosely based on
  		 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
  		 *
  		 * @static
  		 * @memberOf _
  		 * @since 4.0.0
  		 * @category Lang
  		 * @param {*} value The value to check.
  		 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
  		 * @example
  		 *
  		 * _.isLength(3);
  		 * // => true
  		 *
  		 * _.isLength(Number.MIN_VALUE);
  		 * // => false
  		 *
  		 * _.isLength(Infinity);
  		 * // => false
  		 *
  		 * _.isLength('3');
  		 * // => false
  		 */
  		function isLength(value) {
  		  return typeof value == 'number' &&
  		    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
  		}

  		/**
  		 * Checks if `value` is the
  		 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
  		 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
  		 *
  		 * @static
  		 * @memberOf _
  		 * @since 0.1.0
  		 * @category Lang
  		 * @param {*} value The value to check.
  		 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
  		 * @example
  		 *
  		 * _.isObject({});
  		 * // => true
  		 *
  		 * _.isObject([1, 2, 3]);
  		 * // => true
  		 *
  		 * _.isObject(_.noop);
  		 * // => true
  		 *
  		 * _.isObject(null);
  		 * // => false
  		 */
  		function isObject(value) {
  		  var type = typeof value;
  		  return !!value && (type == 'object' || type == 'function');
  		}

  		/**
  		 * Checks if `value` is object-like. A value is object-like if it's not `null`
  		 * and has a `typeof` result of "object".
  		 *
  		 * @static
  		 * @memberOf _
  		 * @since 4.0.0
  		 * @category Lang
  		 * @param {*} value The value to check.
  		 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
  		 * @example
  		 *
  		 * _.isObjectLike({});
  		 * // => true
  		 *
  		 * _.isObjectLike([1, 2, 3]);
  		 * // => true
  		 *
  		 * _.isObjectLike(_.noop);
  		 * // => false
  		 *
  		 * _.isObjectLike(null);
  		 * // => false
  		 */
  		function isObjectLike(value) {
  		  return !!value && typeof value == 'object';
  		}

  		/**
  		 * Creates an array of the own enumerable property names of `object`.
  		 *
  		 * **Note:** Non-object values are coerced to objects. See the
  		 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
  		 * for more details.
  		 *
  		 * @static
  		 * @since 0.1.0
  		 * @memberOf _
  		 * @category Object
  		 * @param {Object} object The object to query.
  		 * @returns {Array} Returns the array of property names.
  		 * @example
  		 *
  		 * function Foo() {
  		 *   this.a = 1;
  		 *   this.b = 2;
  		 * }
  		 *
  		 * Foo.prototype.c = 3;
  		 *
  		 * _.keys(new Foo);
  		 * // => ['a', 'b'] (iteration order is not guaranteed)
  		 *
  		 * _.keys('hi');
  		 * // => ['0', '1']
  		 */
  		function keys(object) {
  		  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
  		}

  		/**
  		 * This method returns a new empty array.
  		 *
  		 * @static
  		 * @memberOf _
  		 * @since 4.13.0
  		 * @category Util
  		 * @returns {Array} Returns the new empty array.
  		 * @example
  		 *
  		 * var arrays = _.times(2, _.stubArray);
  		 *
  		 * console.log(arrays);
  		 * // => [[], []]
  		 *
  		 * console.log(arrays[0] === arrays[1]);
  		 * // => false
  		 */
  		function stubArray() {
  		  return [];
  		}

  		/**
  		 * This method returns `false`.
  		 *
  		 * @static
  		 * @memberOf _
  		 * @since 4.13.0
  		 * @category Util
  		 * @returns {boolean} Returns `false`.
  		 * @example
  		 *
  		 * _.times(2, _.stubFalse);
  		 * // => [false, false]
  		 */
  		function stubFalse() {
  		  return false;
  		}

  		module.exports = cloneDeep; 
  	} (lodash_clonedeep, lodash_clonedeep.exports));
  	return lodash_clonedeep.exports;
  }

  var lodash_clonedeepExports = requireLodash_clonedeep();
  var f = /*@__PURE__*/getDefaultExportFromCjs(lodash_clonedeepExports);

  var lodash_isequal = {exports: {}};

  /**
   * Lodash (Custom Build) <https://lodash.com/>
   * Build: `lodash modularize exports="npm" -o ./`
   * Copyright JS Foundation and other contributors <https://js.foundation/>
   * Released under MIT license <https://lodash.com/license>
   * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
   * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
   */
  lodash_isequal.exports;

  var hasRequiredLodash_isequal;

  function requireLodash_isequal () {
  	if (hasRequiredLodash_isequal) return lodash_isequal.exports;
  	hasRequiredLodash_isequal = 1;
  	(function (module, exports) {
  		/** Used as the size to enable large array optimizations. */
  		var LARGE_ARRAY_SIZE = 200;

  		/** Used to stand-in for `undefined` hash values. */
  		var HASH_UNDEFINED = '__lodash_hash_undefined__';

  		/** Used to compose bitmasks for value comparisons. */
  		var COMPARE_PARTIAL_FLAG = 1,
  		    COMPARE_UNORDERED_FLAG = 2;

  		/** Used as references for various `Number` constants. */
  		var MAX_SAFE_INTEGER = 9007199254740991;

  		/** `Object#toString` result references. */
  		var argsTag = '[object Arguments]',
  		    arrayTag = '[object Array]',
  		    asyncTag = '[object AsyncFunction]',
  		    boolTag = '[object Boolean]',
  		    dateTag = '[object Date]',
  		    errorTag = '[object Error]',
  		    funcTag = '[object Function]',
  		    genTag = '[object GeneratorFunction]',
  		    mapTag = '[object Map]',
  		    numberTag = '[object Number]',
  		    nullTag = '[object Null]',
  		    objectTag = '[object Object]',
  		    promiseTag = '[object Promise]',
  		    proxyTag = '[object Proxy]',
  		    regexpTag = '[object RegExp]',
  		    setTag = '[object Set]',
  		    stringTag = '[object String]',
  		    symbolTag = '[object Symbol]',
  		    undefinedTag = '[object Undefined]',
  		    weakMapTag = '[object WeakMap]';

  		var arrayBufferTag = '[object ArrayBuffer]',
  		    dataViewTag = '[object DataView]',
  		    float32Tag = '[object Float32Array]',
  		    float64Tag = '[object Float64Array]',
  		    int8Tag = '[object Int8Array]',
  		    int16Tag = '[object Int16Array]',
  		    int32Tag = '[object Int32Array]',
  		    uint8Tag = '[object Uint8Array]',
  		    uint8ClampedTag = '[object Uint8ClampedArray]',
  		    uint16Tag = '[object Uint16Array]',
  		    uint32Tag = '[object Uint32Array]';

  		/**
  		 * Used to match `RegExp`
  		 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
  		 */
  		var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

  		/** Used to detect host constructors (Safari). */
  		var reIsHostCtor = /^\[object .+?Constructor\]$/;

  		/** Used to detect unsigned integer values. */
  		var reIsUint = /^(?:0|[1-9]\d*)$/;

  		/** Used to identify `toStringTag` values of typed arrays. */
  		var typedArrayTags = {};
  		typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
  		typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
  		typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
  		typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
  		typedArrayTags[uint32Tag] = true;
  		typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
  		typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
  		typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
  		typedArrayTags[errorTag] = typedArrayTags[funcTag] =
  		typedArrayTags[mapTag] = typedArrayTags[numberTag] =
  		typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
  		typedArrayTags[setTag] = typedArrayTags[stringTag] =
  		typedArrayTags[weakMapTag] = false;

  		/** Detect free variable `global` from Node.js. */
  		var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

  		/** Detect free variable `self`. */
  		var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

  		/** Used as a reference to the global object. */
  		var root = freeGlobal || freeSelf || Function('return this')();

  		/** Detect free variable `exports`. */
  		var freeExports = exports && !exports.nodeType && exports;

  		/** Detect free variable `module`. */
  		var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

  		/** Detect the popular CommonJS extension `module.exports`. */
  		var moduleExports = freeModule && freeModule.exports === freeExports;

  		/** Detect free variable `process` from Node.js. */
  		var freeProcess = moduleExports && freeGlobal.process;

  		/** Used to access faster Node.js helpers. */
  		var nodeUtil = (function() {
  		  try {
  		    return freeProcess && freeProcess.binding && freeProcess.binding('util');
  		  } catch (e) {}
  		}());

  		/* Node.js helper references. */
  		var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

  		/**
  		 * A specialized version of `_.filter` for arrays without support for
  		 * iteratee shorthands.
  		 *
  		 * @private
  		 * @param {Array} [array] The array to iterate over.
  		 * @param {Function} predicate The function invoked per iteration.
  		 * @returns {Array} Returns the new filtered array.
  		 */
  		function arrayFilter(array, predicate) {
  		  var index = -1,
  		      length = array == null ? 0 : array.length,
  		      resIndex = 0,
  		      result = [];

  		  while (++index < length) {
  		    var value = array[index];
  		    if (predicate(value, index, array)) {
  		      result[resIndex++] = value;
  		    }
  		  }
  		  return result;
  		}

  		/**
  		 * Appends the elements of `values` to `array`.
  		 *
  		 * @private
  		 * @param {Array} array The array to modify.
  		 * @param {Array} values The values to append.
  		 * @returns {Array} Returns `array`.
  		 */
  		function arrayPush(array, values) {
  		  var index = -1,
  		      length = values.length,
  		      offset = array.length;

  		  while (++index < length) {
  		    array[offset + index] = values[index];
  		  }
  		  return array;
  		}

  		/**
  		 * A specialized version of `_.some` for arrays without support for iteratee
  		 * shorthands.
  		 *
  		 * @private
  		 * @param {Array} [array] The array to iterate over.
  		 * @param {Function} predicate The function invoked per iteration.
  		 * @returns {boolean} Returns `true` if any element passes the predicate check,
  		 *  else `false`.
  		 */
  		function arraySome(array, predicate) {
  		  var index = -1,
  		      length = array == null ? 0 : array.length;

  		  while (++index < length) {
  		    if (predicate(array[index], index, array)) {
  		      return true;
  		    }
  		  }
  		  return false;
  		}

  		/**
  		 * The base implementation of `_.times` without support for iteratee shorthands
  		 * or max array length checks.
  		 *
  		 * @private
  		 * @param {number} n The number of times to invoke `iteratee`.
  		 * @param {Function} iteratee The function invoked per iteration.
  		 * @returns {Array} Returns the array of results.
  		 */
  		function baseTimes(n, iteratee) {
  		  var index = -1,
  		      result = Array(n);

  		  while (++index < n) {
  		    result[index] = iteratee(index);
  		  }
  		  return result;
  		}

  		/**
  		 * The base implementation of `_.unary` without support for storing metadata.
  		 *
  		 * @private
  		 * @param {Function} func The function to cap arguments for.
  		 * @returns {Function} Returns the new capped function.
  		 */
  		function baseUnary(func) {
  		  return function(value) {
  		    return func(value);
  		  };
  		}

  		/**
  		 * Checks if a `cache` value for `key` exists.
  		 *
  		 * @private
  		 * @param {Object} cache The cache to query.
  		 * @param {string} key The key of the entry to check.
  		 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
  		 */
  		function cacheHas(cache, key) {
  		  return cache.has(key);
  		}

  		/**
  		 * Gets the value at `key` of `object`.
  		 *
  		 * @private
  		 * @param {Object} [object] The object to query.
  		 * @param {string} key The key of the property to get.
  		 * @returns {*} Returns the property value.
  		 */
  		function getValue(object, key) {
  		  return object == null ? undefined : object[key];
  		}

  		/**
  		 * Converts `map` to its key-value pairs.
  		 *
  		 * @private
  		 * @param {Object} map The map to convert.
  		 * @returns {Array} Returns the key-value pairs.
  		 */
  		function mapToArray(map) {
  		  var index = -1,
  		      result = Array(map.size);

  		  map.forEach(function(value, key) {
  		    result[++index] = [key, value];
  		  });
  		  return result;
  		}

  		/**
  		 * Creates a unary function that invokes `func` with its argument transformed.
  		 *
  		 * @private
  		 * @param {Function} func The function to wrap.
  		 * @param {Function} transform The argument transform.
  		 * @returns {Function} Returns the new function.
  		 */
  		function overArg(func, transform) {
  		  return function(arg) {
  		    return func(transform(arg));
  		  };
  		}

  		/**
  		 * Converts `set` to an array of its values.
  		 *
  		 * @private
  		 * @param {Object} set The set to convert.
  		 * @returns {Array} Returns the values.
  		 */
  		function setToArray(set) {
  		  var index = -1,
  		      result = Array(set.size);

  		  set.forEach(function(value) {
  		    result[++index] = value;
  		  });
  		  return result;
  		}

  		/** Used for built-in method references. */
  		var arrayProto = Array.prototype,
  		    funcProto = Function.prototype,
  		    objectProto = Object.prototype;

  		/** Used to detect overreaching core-js shims. */
  		var coreJsData = root['__core-js_shared__'];

  		/** Used to resolve the decompiled source of functions. */
  		var funcToString = funcProto.toString;

  		/** Used to check objects for own properties. */
  		var hasOwnProperty = objectProto.hasOwnProperty;

  		/** Used to detect methods masquerading as native. */
  		var maskSrcKey = (function() {
  		  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  		  return uid ? ('Symbol(src)_1.' + uid) : '';
  		}());

  		/**
  		 * Used to resolve the
  		 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
  		 * of values.
  		 */
  		var nativeObjectToString = objectProto.toString;

  		/** Used to detect if a method is native. */
  		var reIsNative = RegExp('^' +
  		  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  		  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
  		);

  		/** Built-in value references. */
  		var Buffer = moduleExports ? root.Buffer : undefined,
  		    Symbol = root.Symbol,
  		    Uint8Array = root.Uint8Array,
  		    propertyIsEnumerable = objectProto.propertyIsEnumerable,
  		    splice = arrayProto.splice,
  		    symToStringTag = Symbol ? Symbol.toStringTag : undefined;

  		/* Built-in method references for those with the same name as other `lodash` methods. */
  		var nativeGetSymbols = Object.getOwnPropertySymbols,
  		    nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined,
  		    nativeKeys = overArg(Object.keys, Object);

  		/* Built-in method references that are verified to be native. */
  		var DataView = getNative(root, 'DataView'),
  		    Map = getNative(root, 'Map'),
  		    Promise = getNative(root, 'Promise'),
  		    Set = getNative(root, 'Set'),
  		    WeakMap = getNative(root, 'WeakMap'),
  		    nativeCreate = getNative(Object, 'create');

  		/** Used to detect maps, sets, and weakmaps. */
  		var dataViewCtorString = toSource(DataView),
  		    mapCtorString = toSource(Map),
  		    promiseCtorString = toSource(Promise),
  		    setCtorString = toSource(Set),
  		    weakMapCtorString = toSource(WeakMap);

  		/** Used to convert symbols to primitives and strings. */
  		var symbolProto = Symbol ? Symbol.prototype : undefined,
  		    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

  		/**
  		 * Creates a hash object.
  		 *
  		 * @private
  		 * @constructor
  		 * @param {Array} [entries] The key-value pairs to cache.
  		 */
  		function Hash(entries) {
  		  var index = -1,
  		      length = entries == null ? 0 : entries.length;

  		  this.clear();
  		  while (++index < length) {
  		    var entry = entries[index];
  		    this.set(entry[0], entry[1]);
  		  }
  		}

  		/**
  		 * Removes all key-value entries from the hash.
  		 *
  		 * @private
  		 * @name clear
  		 * @memberOf Hash
  		 */
  		function hashClear() {
  		  this.__data__ = nativeCreate ? nativeCreate(null) : {};
  		  this.size = 0;
  		}

  		/**
  		 * Removes `key` and its value from the hash.
  		 *
  		 * @private
  		 * @name delete
  		 * @memberOf Hash
  		 * @param {Object} hash The hash to modify.
  		 * @param {string} key The key of the value to remove.
  		 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
  		 */
  		function hashDelete(key) {
  		  var result = this.has(key) && delete this.__data__[key];
  		  this.size -= result ? 1 : 0;
  		  return result;
  		}

  		/**
  		 * Gets the hash value for `key`.
  		 *
  		 * @private
  		 * @name get
  		 * @memberOf Hash
  		 * @param {string} key The key of the value to get.
  		 * @returns {*} Returns the entry value.
  		 */
  		function hashGet(key) {
  		  var data = this.__data__;
  		  if (nativeCreate) {
  		    var result = data[key];
  		    return result === HASH_UNDEFINED ? undefined : result;
  		  }
  		  return hasOwnProperty.call(data, key) ? data[key] : undefined;
  		}

  		/**
  		 * Checks if a hash value for `key` exists.
  		 *
  		 * @private
  		 * @name has
  		 * @memberOf Hash
  		 * @param {string} key The key of the entry to check.
  		 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
  		 */
  		function hashHas(key) {
  		  var data = this.__data__;
  		  return nativeCreate ? (data[key] !== undefined) : hasOwnProperty.call(data, key);
  		}

  		/**
  		 * Sets the hash `key` to `value`.
  		 *
  		 * @private
  		 * @name set
  		 * @memberOf Hash
  		 * @param {string} key The key of the value to set.
  		 * @param {*} value The value to set.
  		 * @returns {Object} Returns the hash instance.
  		 */
  		function hashSet(key, value) {
  		  var data = this.__data__;
  		  this.size += this.has(key) ? 0 : 1;
  		  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
  		  return this;
  		}

  		// Add methods to `Hash`.
  		Hash.prototype.clear = hashClear;
  		Hash.prototype['delete'] = hashDelete;
  		Hash.prototype.get = hashGet;
  		Hash.prototype.has = hashHas;
  		Hash.prototype.set = hashSet;

  		/**
  		 * Creates an list cache object.
  		 *
  		 * @private
  		 * @constructor
  		 * @param {Array} [entries] The key-value pairs to cache.
  		 */
  		function ListCache(entries) {
  		  var index = -1,
  		      length = entries == null ? 0 : entries.length;

  		  this.clear();
  		  while (++index < length) {
  		    var entry = entries[index];
  		    this.set(entry[0], entry[1]);
  		  }
  		}

  		/**
  		 * Removes all key-value entries from the list cache.
  		 *
  		 * @private
  		 * @name clear
  		 * @memberOf ListCache
  		 */
  		function listCacheClear() {
  		  this.__data__ = [];
  		  this.size = 0;
  		}

  		/**
  		 * Removes `key` and its value from the list cache.
  		 *
  		 * @private
  		 * @name delete
  		 * @memberOf ListCache
  		 * @param {string} key The key of the value to remove.
  		 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
  		 */
  		function listCacheDelete(key) {
  		  var data = this.__data__,
  		      index = assocIndexOf(data, key);

  		  if (index < 0) {
  		    return false;
  		  }
  		  var lastIndex = data.length - 1;
  		  if (index == lastIndex) {
  		    data.pop();
  		  } else {
  		    splice.call(data, index, 1);
  		  }
  		  --this.size;
  		  return true;
  		}

  		/**
  		 * Gets the list cache value for `key`.
  		 *
  		 * @private
  		 * @name get
  		 * @memberOf ListCache
  		 * @param {string} key The key of the value to get.
  		 * @returns {*} Returns the entry value.
  		 */
  		function listCacheGet(key) {
  		  var data = this.__data__,
  		      index = assocIndexOf(data, key);

  		  return index < 0 ? undefined : data[index][1];
  		}

  		/**
  		 * Checks if a list cache value for `key` exists.
  		 *
  		 * @private
  		 * @name has
  		 * @memberOf ListCache
  		 * @param {string} key The key of the entry to check.
  		 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
  		 */
  		function listCacheHas(key) {
  		  return assocIndexOf(this.__data__, key) > -1;
  		}

  		/**
  		 * Sets the list cache `key` to `value`.
  		 *
  		 * @private
  		 * @name set
  		 * @memberOf ListCache
  		 * @param {string} key The key of the value to set.
  		 * @param {*} value The value to set.
  		 * @returns {Object} Returns the list cache instance.
  		 */
  		function listCacheSet(key, value) {
  		  var data = this.__data__,
  		      index = assocIndexOf(data, key);

  		  if (index < 0) {
  		    ++this.size;
  		    data.push([key, value]);
  		  } else {
  		    data[index][1] = value;
  		  }
  		  return this;
  		}

  		// Add methods to `ListCache`.
  		ListCache.prototype.clear = listCacheClear;
  		ListCache.prototype['delete'] = listCacheDelete;
  		ListCache.prototype.get = listCacheGet;
  		ListCache.prototype.has = listCacheHas;
  		ListCache.prototype.set = listCacheSet;

  		/**
  		 * Creates a map cache object to store key-value pairs.
  		 *
  		 * @private
  		 * @constructor
  		 * @param {Array} [entries] The key-value pairs to cache.
  		 */
  		function MapCache(entries) {
  		  var index = -1,
  		      length = entries == null ? 0 : entries.length;

  		  this.clear();
  		  while (++index < length) {
  		    var entry = entries[index];
  		    this.set(entry[0], entry[1]);
  		  }
  		}

  		/**
  		 * Removes all key-value entries from the map.
  		 *
  		 * @private
  		 * @name clear
  		 * @memberOf MapCache
  		 */
  		function mapCacheClear() {
  		  this.size = 0;
  		  this.__data__ = {
  		    'hash': new Hash,
  		    'map': new (Map || ListCache),
  		    'string': new Hash
  		  };
  		}

  		/**
  		 * Removes `key` and its value from the map.
  		 *
  		 * @private
  		 * @name delete
  		 * @memberOf MapCache
  		 * @param {string} key The key of the value to remove.
  		 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
  		 */
  		function mapCacheDelete(key) {
  		  var result = getMapData(this, key)['delete'](key);
  		  this.size -= result ? 1 : 0;
  		  return result;
  		}

  		/**
  		 * Gets the map value for `key`.
  		 *
  		 * @private
  		 * @name get
  		 * @memberOf MapCache
  		 * @param {string} key The key of the value to get.
  		 * @returns {*} Returns the entry value.
  		 */
  		function mapCacheGet(key) {
  		  return getMapData(this, key).get(key);
  		}

  		/**
  		 * Checks if a map value for `key` exists.
  		 *
  		 * @private
  		 * @name has
  		 * @memberOf MapCache
  		 * @param {string} key The key of the entry to check.
  		 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
  		 */
  		function mapCacheHas(key) {
  		  return getMapData(this, key).has(key);
  		}

  		/**
  		 * Sets the map `key` to `value`.
  		 *
  		 * @private
  		 * @name set
  		 * @memberOf MapCache
  		 * @param {string} key The key of the value to set.
  		 * @param {*} value The value to set.
  		 * @returns {Object} Returns the map cache instance.
  		 */
  		function mapCacheSet(key, value) {
  		  var data = getMapData(this, key),
  		      size = data.size;

  		  data.set(key, value);
  		  this.size += data.size == size ? 0 : 1;
  		  return this;
  		}

  		// Add methods to `MapCache`.
  		MapCache.prototype.clear = mapCacheClear;
  		MapCache.prototype['delete'] = mapCacheDelete;
  		MapCache.prototype.get = mapCacheGet;
  		MapCache.prototype.has = mapCacheHas;
  		MapCache.prototype.set = mapCacheSet;

  		/**
  		 *
  		 * Creates an array cache object to store unique values.
  		 *
  		 * @private
  		 * @constructor
  		 * @param {Array} [values] The values to cache.
  		 */
  		function SetCache(values) {
  		  var index = -1,
  		      length = values == null ? 0 : values.length;

  		  this.__data__ = new MapCache;
  		  while (++index < length) {
  		    this.add(values[index]);
  		  }
  		}

  		/**
  		 * Adds `value` to the array cache.
  		 *
  		 * @private
  		 * @name add
  		 * @memberOf SetCache
  		 * @alias push
  		 * @param {*} value The value to cache.
  		 * @returns {Object} Returns the cache instance.
  		 */
  		function setCacheAdd(value) {
  		  this.__data__.set(value, HASH_UNDEFINED);
  		  return this;
  		}

  		/**
  		 * Checks if `value` is in the array cache.
  		 *
  		 * @private
  		 * @name has
  		 * @memberOf SetCache
  		 * @param {*} value The value to search for.
  		 * @returns {number} Returns `true` if `value` is found, else `false`.
  		 */
  		function setCacheHas(value) {
  		  return this.__data__.has(value);
  		}

  		// Add methods to `SetCache`.
  		SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
  		SetCache.prototype.has = setCacheHas;

  		/**
  		 * Creates a stack cache object to store key-value pairs.
  		 *
  		 * @private
  		 * @constructor
  		 * @param {Array} [entries] The key-value pairs to cache.
  		 */
  		function Stack(entries) {
  		  var data = this.__data__ = new ListCache(entries);
  		  this.size = data.size;
  		}

  		/**
  		 * Removes all key-value entries from the stack.
  		 *
  		 * @private
  		 * @name clear
  		 * @memberOf Stack
  		 */
  		function stackClear() {
  		  this.__data__ = new ListCache;
  		  this.size = 0;
  		}

  		/**
  		 * Removes `key` and its value from the stack.
  		 *
  		 * @private
  		 * @name delete
  		 * @memberOf Stack
  		 * @param {string} key The key of the value to remove.
  		 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
  		 */
  		function stackDelete(key) {
  		  var data = this.__data__,
  		      result = data['delete'](key);

  		  this.size = data.size;
  		  return result;
  		}

  		/**
  		 * Gets the stack value for `key`.
  		 *
  		 * @private
  		 * @name get
  		 * @memberOf Stack
  		 * @param {string} key The key of the value to get.
  		 * @returns {*} Returns the entry value.
  		 */
  		function stackGet(key) {
  		  return this.__data__.get(key);
  		}

  		/**
  		 * Checks if a stack value for `key` exists.
  		 *
  		 * @private
  		 * @name has
  		 * @memberOf Stack
  		 * @param {string} key The key of the entry to check.
  		 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
  		 */
  		function stackHas(key) {
  		  return this.__data__.has(key);
  		}

  		/**
  		 * Sets the stack `key` to `value`.
  		 *
  		 * @private
  		 * @name set
  		 * @memberOf Stack
  		 * @param {string} key The key of the value to set.
  		 * @param {*} value The value to set.
  		 * @returns {Object} Returns the stack cache instance.
  		 */
  		function stackSet(key, value) {
  		  var data = this.__data__;
  		  if (data instanceof ListCache) {
  		    var pairs = data.__data__;
  		    if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
  		      pairs.push([key, value]);
  		      this.size = ++data.size;
  		      return this;
  		    }
  		    data = this.__data__ = new MapCache(pairs);
  		  }
  		  data.set(key, value);
  		  this.size = data.size;
  		  return this;
  		}

  		// Add methods to `Stack`.
  		Stack.prototype.clear = stackClear;
  		Stack.prototype['delete'] = stackDelete;
  		Stack.prototype.get = stackGet;
  		Stack.prototype.has = stackHas;
  		Stack.prototype.set = stackSet;

  		/**
  		 * Creates an array of the enumerable property names of the array-like `value`.
  		 *
  		 * @private
  		 * @param {*} value The value to query.
  		 * @param {boolean} inherited Specify returning inherited property names.
  		 * @returns {Array} Returns the array of property names.
  		 */
  		function arrayLikeKeys(value, inherited) {
  		  var isArr = isArray(value),
  		      isArg = !isArr && isArguments(value),
  		      isBuff = !isArr && !isArg && isBuffer(value),
  		      isType = !isArr && !isArg && !isBuff && isTypedArray(value),
  		      skipIndexes = isArr || isArg || isBuff || isType,
  		      result = skipIndexes ? baseTimes(value.length, String) : [],
  		      length = result.length;

  		  for (var key in value) {
  		    if ((hasOwnProperty.call(value, key)) &&
  		        !(skipIndexes && (
  		           // Safari 9 has enumerable `arguments.length` in strict mode.
  		           key == 'length' ||
  		           // Node.js 0.10 has enumerable non-index properties on buffers.
  		           (isBuff && (key == 'offset' || key == 'parent')) ||
  		           // PhantomJS 2 has enumerable non-index properties on typed arrays.
  		           (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
  		           // Skip index properties.
  		           isIndex(key, length)
  		        ))) {
  		      result.push(key);
  		    }
  		  }
  		  return result;
  		}

  		/**
  		 * Gets the index at which the `key` is found in `array` of key-value pairs.
  		 *
  		 * @private
  		 * @param {Array} array The array to inspect.
  		 * @param {*} key The key to search for.
  		 * @returns {number} Returns the index of the matched value, else `-1`.
  		 */
  		function assocIndexOf(array, key) {
  		  var length = array.length;
  		  while (length--) {
  		    if (eq(array[length][0], key)) {
  		      return length;
  		    }
  		  }
  		  return -1;
  		}

  		/**
  		 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
  		 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
  		 * symbols of `object`.
  		 *
  		 * @private
  		 * @param {Object} object The object to query.
  		 * @param {Function} keysFunc The function to get the keys of `object`.
  		 * @param {Function} symbolsFunc The function to get the symbols of `object`.
  		 * @returns {Array} Returns the array of property names and symbols.
  		 */
  		function baseGetAllKeys(object, keysFunc, symbolsFunc) {
  		  var result = keysFunc(object);
  		  return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
  		}

  		/**
  		 * The base implementation of `getTag` without fallbacks for buggy environments.
  		 *
  		 * @private
  		 * @param {*} value The value to query.
  		 * @returns {string} Returns the `toStringTag`.
  		 */
  		function baseGetTag(value) {
  		  if (value == null) {
  		    return value === undefined ? undefinedTag : nullTag;
  		  }
  		  return (symToStringTag && symToStringTag in Object(value))
  		    ? getRawTag(value)
  		    : objectToString(value);
  		}

  		/**
  		 * The base implementation of `_.isArguments`.
  		 *
  		 * @private
  		 * @param {*} value The value to check.
  		 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
  		 */
  		function baseIsArguments(value) {
  		  return isObjectLike(value) && baseGetTag(value) == argsTag;
  		}

  		/**
  		 * The base implementation of `_.isEqual` which supports partial comparisons
  		 * and tracks traversed objects.
  		 *
  		 * @private
  		 * @param {*} value The value to compare.
  		 * @param {*} other The other value to compare.
  		 * @param {boolean} bitmask The bitmask flags.
  		 *  1 - Unordered comparison
  		 *  2 - Partial comparison
  		 * @param {Function} [customizer] The function to customize comparisons.
  		 * @param {Object} [stack] Tracks traversed `value` and `other` objects.
  		 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
  		 */
  		function baseIsEqual(value, other, bitmask, customizer, stack) {
  		  if (value === other) {
  		    return true;
  		  }
  		  if (value == null || other == null || (!isObjectLike(value) && !isObjectLike(other))) {
  		    return value !== value && other !== other;
  		  }
  		  return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
  		}

  		/**
  		 * A specialized version of `baseIsEqual` for arrays and objects which performs
  		 * deep comparisons and tracks traversed objects enabling objects with circular
  		 * references to be compared.
  		 *
  		 * @private
  		 * @param {Object} object The object to compare.
  		 * @param {Object} other The other object to compare.
  		 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
  		 * @param {Function} customizer The function to customize comparisons.
  		 * @param {Function} equalFunc The function to determine equivalents of values.
  		 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
  		 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
  		 */
  		function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
  		  var objIsArr = isArray(object),
  		      othIsArr = isArray(other),
  		      objTag = objIsArr ? arrayTag : getTag(object),
  		      othTag = othIsArr ? arrayTag : getTag(other);

  		  objTag = objTag == argsTag ? objectTag : objTag;
  		  othTag = othTag == argsTag ? objectTag : othTag;

  		  var objIsObj = objTag == objectTag,
  		      othIsObj = othTag == objectTag,
  		      isSameTag = objTag == othTag;

  		  if (isSameTag && isBuffer(object)) {
  		    if (!isBuffer(other)) {
  		      return false;
  		    }
  		    objIsArr = true;
  		    objIsObj = false;
  		  }
  		  if (isSameTag && !objIsObj) {
  		    stack || (stack = new Stack);
  		    return (objIsArr || isTypedArray(object))
  		      ? equalArrays(object, other, bitmask, customizer, equalFunc, stack)
  		      : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
  		  }
  		  if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
  		    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
  		        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

  		    if (objIsWrapped || othIsWrapped) {
  		      var objUnwrapped = objIsWrapped ? object.value() : object,
  		          othUnwrapped = othIsWrapped ? other.value() : other;

  		      stack || (stack = new Stack);
  		      return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
  		    }
  		  }
  		  if (!isSameTag) {
  		    return false;
  		  }
  		  stack || (stack = new Stack);
  		  return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
  		}

  		/**
  		 * The base implementation of `_.isNative` without bad shim checks.
  		 *
  		 * @private
  		 * @param {*} value The value to check.
  		 * @returns {boolean} Returns `true` if `value` is a native function,
  		 *  else `false`.
  		 */
  		function baseIsNative(value) {
  		  if (!isObject(value) || isMasked(value)) {
  		    return false;
  		  }
  		  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
  		  return pattern.test(toSource(value));
  		}

  		/**
  		 * The base implementation of `_.isTypedArray` without Node.js optimizations.
  		 *
  		 * @private
  		 * @param {*} value The value to check.
  		 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
  		 */
  		function baseIsTypedArray(value) {
  		  return isObjectLike(value) &&
  		    isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
  		}

  		/**
  		 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
  		 *
  		 * @private
  		 * @param {Object} object The object to query.
  		 * @returns {Array} Returns the array of property names.
  		 */
  		function baseKeys(object) {
  		  if (!isPrototype(object)) {
  		    return nativeKeys(object);
  		  }
  		  var result = [];
  		  for (var key in Object(object)) {
  		    if (hasOwnProperty.call(object, key) && key != 'constructor') {
  		      result.push(key);
  		    }
  		  }
  		  return result;
  		}

  		/**
  		 * A specialized version of `baseIsEqualDeep` for arrays with support for
  		 * partial deep comparisons.
  		 *
  		 * @private
  		 * @param {Array} array The array to compare.
  		 * @param {Array} other The other array to compare.
  		 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
  		 * @param {Function} customizer The function to customize comparisons.
  		 * @param {Function} equalFunc The function to determine equivalents of values.
  		 * @param {Object} stack Tracks traversed `array` and `other` objects.
  		 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
  		 */
  		function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
  		  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
  		      arrLength = array.length,
  		      othLength = other.length;

  		  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
  		    return false;
  		  }
  		  // Assume cyclic values are equal.
  		  var stacked = stack.get(array);
  		  if (stacked && stack.get(other)) {
  		    return stacked == other;
  		  }
  		  var index = -1,
  		      result = true,
  		      seen = (bitmask & COMPARE_UNORDERED_FLAG) ? new SetCache : undefined;

  		  stack.set(array, other);
  		  stack.set(other, array);

  		  // Ignore non-index properties.
  		  while (++index < arrLength) {
  		    var arrValue = array[index],
  		        othValue = other[index];

  		    if (customizer) {
  		      var compared = isPartial
  		        ? customizer(othValue, arrValue, index, other, array, stack)
  		        : customizer(arrValue, othValue, index, array, other, stack);
  		    }
  		    if (compared !== undefined) {
  		      if (compared) {
  		        continue;
  		      }
  		      result = false;
  		      break;
  		    }
  		    // Recursively compare arrays (susceptible to call stack limits).
  		    if (seen) {
  		      if (!arraySome(other, function(othValue, othIndex) {
  		            if (!cacheHas(seen, othIndex) &&
  		                (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
  		              return seen.push(othIndex);
  		            }
  		          })) {
  		        result = false;
  		        break;
  		      }
  		    } else if (!(
  		          arrValue === othValue ||
  		            equalFunc(arrValue, othValue, bitmask, customizer, stack)
  		        )) {
  		      result = false;
  		      break;
  		    }
  		  }
  		  stack['delete'](array);
  		  stack['delete'](other);
  		  return result;
  		}

  		/**
  		 * A specialized version of `baseIsEqualDeep` for comparing objects of
  		 * the same `toStringTag`.
  		 *
  		 * **Note:** This function only supports comparing values with tags of
  		 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
  		 *
  		 * @private
  		 * @param {Object} object The object to compare.
  		 * @param {Object} other The other object to compare.
  		 * @param {string} tag The `toStringTag` of the objects to compare.
  		 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
  		 * @param {Function} customizer The function to customize comparisons.
  		 * @param {Function} equalFunc The function to determine equivalents of values.
  		 * @param {Object} stack Tracks traversed `object` and `other` objects.
  		 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
  		 */
  		function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
  		  switch (tag) {
  		    case dataViewTag:
  		      if ((object.byteLength != other.byteLength) ||
  		          (object.byteOffset != other.byteOffset)) {
  		        return false;
  		      }
  		      object = object.buffer;
  		      other = other.buffer;

  		    case arrayBufferTag:
  		      if ((object.byteLength != other.byteLength) ||
  		          !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
  		        return false;
  		      }
  		      return true;

  		    case boolTag:
  		    case dateTag:
  		    case numberTag:
  		      // Coerce booleans to `1` or `0` and dates to milliseconds.
  		      // Invalid dates are coerced to `NaN`.
  		      return eq(+object, +other);

  		    case errorTag:
  		      return object.name == other.name && object.message == other.message;

  		    case regexpTag:
  		    case stringTag:
  		      // Coerce regexes to strings and treat strings, primitives and objects,
  		      // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
  		      // for more details.
  		      return object == (other + '');

  		    case mapTag:
  		      var convert = mapToArray;

  		    case setTag:
  		      var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
  		      convert || (convert = setToArray);

  		      if (object.size != other.size && !isPartial) {
  		        return false;
  		      }
  		      // Assume cyclic values are equal.
  		      var stacked = stack.get(object);
  		      if (stacked) {
  		        return stacked == other;
  		      }
  		      bitmask |= COMPARE_UNORDERED_FLAG;

  		      // Recursively compare objects (susceptible to call stack limits).
  		      stack.set(object, other);
  		      var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
  		      stack['delete'](object);
  		      return result;

  		    case symbolTag:
  		      if (symbolValueOf) {
  		        return symbolValueOf.call(object) == symbolValueOf.call(other);
  		      }
  		  }
  		  return false;
  		}

  		/**
  		 * A specialized version of `baseIsEqualDeep` for objects with support for
  		 * partial deep comparisons.
  		 *
  		 * @private
  		 * @param {Object} object The object to compare.
  		 * @param {Object} other The other object to compare.
  		 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
  		 * @param {Function} customizer The function to customize comparisons.
  		 * @param {Function} equalFunc The function to determine equivalents of values.
  		 * @param {Object} stack Tracks traversed `object` and `other` objects.
  		 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
  		 */
  		function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
  		  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
  		      objProps = getAllKeys(object),
  		      objLength = objProps.length,
  		      othProps = getAllKeys(other),
  		      othLength = othProps.length;

  		  if (objLength != othLength && !isPartial) {
  		    return false;
  		  }
  		  var index = objLength;
  		  while (index--) {
  		    var key = objProps[index];
  		    if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
  		      return false;
  		    }
  		  }
  		  // Assume cyclic values are equal.
  		  var stacked = stack.get(object);
  		  if (stacked && stack.get(other)) {
  		    return stacked == other;
  		  }
  		  var result = true;
  		  stack.set(object, other);
  		  stack.set(other, object);

  		  var skipCtor = isPartial;
  		  while (++index < objLength) {
  		    key = objProps[index];
  		    var objValue = object[key],
  		        othValue = other[key];

  		    if (customizer) {
  		      var compared = isPartial
  		        ? customizer(othValue, objValue, key, other, object, stack)
  		        : customizer(objValue, othValue, key, object, other, stack);
  		    }
  		    // Recursively compare objects (susceptible to call stack limits).
  		    if (!(compared === undefined
  		          ? (objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack))
  		          : compared
  		        )) {
  		      result = false;
  		      break;
  		    }
  		    skipCtor || (skipCtor = key == 'constructor');
  		  }
  		  if (result && !skipCtor) {
  		    var objCtor = object.constructor,
  		        othCtor = other.constructor;

  		    // Non `Object` object instances with different constructors are not equal.
  		    if (objCtor != othCtor &&
  		        ('constructor' in object && 'constructor' in other) &&
  		        !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
  		          typeof othCtor == 'function' && othCtor instanceof othCtor)) {
  		      result = false;
  		    }
  		  }
  		  stack['delete'](object);
  		  stack['delete'](other);
  		  return result;
  		}

  		/**
  		 * Creates an array of own enumerable property names and symbols of `object`.
  		 *
  		 * @private
  		 * @param {Object} object The object to query.
  		 * @returns {Array} Returns the array of property names and symbols.
  		 */
  		function getAllKeys(object) {
  		  return baseGetAllKeys(object, keys, getSymbols);
  		}

  		/**
  		 * Gets the data for `map`.
  		 *
  		 * @private
  		 * @param {Object} map The map to query.
  		 * @param {string} key The reference key.
  		 * @returns {*} Returns the map data.
  		 */
  		function getMapData(map, key) {
  		  var data = map.__data__;
  		  return isKeyable(key)
  		    ? data[typeof key == 'string' ? 'string' : 'hash']
  		    : data.map;
  		}

  		/**
  		 * Gets the native function at `key` of `object`.
  		 *
  		 * @private
  		 * @param {Object} object The object to query.
  		 * @param {string} key The key of the method to get.
  		 * @returns {*} Returns the function if it's native, else `undefined`.
  		 */
  		function getNative(object, key) {
  		  var value = getValue(object, key);
  		  return baseIsNative(value) ? value : undefined;
  		}

  		/**
  		 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
  		 *
  		 * @private
  		 * @param {*} value The value to query.
  		 * @returns {string} Returns the raw `toStringTag`.
  		 */
  		function getRawTag(value) {
  		  var isOwn = hasOwnProperty.call(value, symToStringTag),
  		      tag = value[symToStringTag];

  		  try {
  		    value[symToStringTag] = undefined;
  		    var unmasked = true;
  		  } catch (e) {}

  		  var result = nativeObjectToString.call(value);
  		  if (unmasked) {
  		    if (isOwn) {
  		      value[symToStringTag] = tag;
  		    } else {
  		      delete value[symToStringTag];
  		    }
  		  }
  		  return result;
  		}

  		/**
  		 * Creates an array of the own enumerable symbols of `object`.
  		 *
  		 * @private
  		 * @param {Object} object The object to query.
  		 * @returns {Array} Returns the array of symbols.
  		 */
  		var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
  		  if (object == null) {
  		    return [];
  		  }
  		  object = Object(object);
  		  return arrayFilter(nativeGetSymbols(object), function(symbol) {
  		    return propertyIsEnumerable.call(object, symbol);
  		  });
  		};

  		/**
  		 * Gets the `toStringTag` of `value`.
  		 *
  		 * @private
  		 * @param {*} value The value to query.
  		 * @returns {string} Returns the `toStringTag`.
  		 */
  		var getTag = baseGetTag;

  		// Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
  		if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
  		    (Map && getTag(new Map) != mapTag) ||
  		    (Promise && getTag(Promise.resolve()) != promiseTag) ||
  		    (Set && getTag(new Set) != setTag) ||
  		    (WeakMap && getTag(new WeakMap) != weakMapTag)) {
  		  getTag = function(value) {
  		    var result = baseGetTag(value),
  		        Ctor = result == objectTag ? value.constructor : undefined,
  		        ctorString = Ctor ? toSource(Ctor) : '';

  		    if (ctorString) {
  		      switch (ctorString) {
  		        case dataViewCtorString: return dataViewTag;
  		        case mapCtorString: return mapTag;
  		        case promiseCtorString: return promiseTag;
  		        case setCtorString: return setTag;
  		        case weakMapCtorString: return weakMapTag;
  		      }
  		    }
  		    return result;
  		  };
  		}

  		/**
  		 * Checks if `value` is a valid array-like index.
  		 *
  		 * @private
  		 * @param {*} value The value to check.
  		 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
  		 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
  		 */
  		function isIndex(value, length) {
  		  length = length == null ? MAX_SAFE_INTEGER : length;
  		  return !!length &&
  		    (typeof value == 'number' || reIsUint.test(value)) &&
  		    (value > -1 && value % 1 == 0 && value < length);
  		}

  		/**
  		 * Checks if `value` is suitable for use as unique object key.
  		 *
  		 * @private
  		 * @param {*} value The value to check.
  		 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
  		 */
  		function isKeyable(value) {
  		  var type = typeof value;
  		  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
  		    ? (value !== '__proto__')
  		    : (value === null);
  		}

  		/**
  		 * Checks if `func` has its source masked.
  		 *
  		 * @private
  		 * @param {Function} func The function to check.
  		 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
  		 */
  		function isMasked(func) {
  		  return !!maskSrcKey && (maskSrcKey in func);
  		}

  		/**
  		 * Checks if `value` is likely a prototype object.
  		 *
  		 * @private
  		 * @param {*} value The value to check.
  		 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
  		 */
  		function isPrototype(value) {
  		  var Ctor = value && value.constructor,
  		      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

  		  return value === proto;
  		}

  		/**
  		 * Converts `value` to a string using `Object.prototype.toString`.
  		 *
  		 * @private
  		 * @param {*} value The value to convert.
  		 * @returns {string} Returns the converted string.
  		 */
  		function objectToString(value) {
  		  return nativeObjectToString.call(value);
  		}

  		/**
  		 * Converts `func` to its source code.
  		 *
  		 * @private
  		 * @param {Function} func The function to convert.
  		 * @returns {string} Returns the source code.
  		 */
  		function toSource(func) {
  		  if (func != null) {
  		    try {
  		      return funcToString.call(func);
  		    } catch (e) {}
  		    try {
  		      return (func + '');
  		    } catch (e) {}
  		  }
  		  return '';
  		}

  		/**
  		 * Performs a
  		 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
  		 * comparison between two values to determine if they are equivalent.
  		 *
  		 * @static
  		 * @memberOf _
  		 * @since 4.0.0
  		 * @category Lang
  		 * @param {*} value The value to compare.
  		 * @param {*} other The other value to compare.
  		 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
  		 * @example
  		 *
  		 * var object = { 'a': 1 };
  		 * var other = { 'a': 1 };
  		 *
  		 * _.eq(object, object);
  		 * // => true
  		 *
  		 * _.eq(object, other);
  		 * // => false
  		 *
  		 * _.eq('a', 'a');
  		 * // => true
  		 *
  		 * _.eq('a', Object('a'));
  		 * // => false
  		 *
  		 * _.eq(NaN, NaN);
  		 * // => true
  		 */
  		function eq(value, other) {
  		  return value === other || (value !== value && other !== other);
  		}

  		/**
  		 * Checks if `value` is likely an `arguments` object.
  		 *
  		 * @static
  		 * @memberOf _
  		 * @since 0.1.0
  		 * @category Lang
  		 * @param {*} value The value to check.
  		 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
  		 *  else `false`.
  		 * @example
  		 *
  		 * _.isArguments(function() { return arguments; }());
  		 * // => true
  		 *
  		 * _.isArguments([1, 2, 3]);
  		 * // => false
  		 */
  		var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
  		  return isObjectLike(value) && hasOwnProperty.call(value, 'callee') &&
  		    !propertyIsEnumerable.call(value, 'callee');
  		};

  		/**
  		 * Checks if `value` is classified as an `Array` object.
  		 *
  		 * @static
  		 * @memberOf _
  		 * @since 0.1.0
  		 * @category Lang
  		 * @param {*} value The value to check.
  		 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
  		 * @example
  		 *
  		 * _.isArray([1, 2, 3]);
  		 * // => true
  		 *
  		 * _.isArray(document.body.children);
  		 * // => false
  		 *
  		 * _.isArray('abc');
  		 * // => false
  		 *
  		 * _.isArray(_.noop);
  		 * // => false
  		 */
  		var isArray = Array.isArray;

  		/**
  		 * Checks if `value` is array-like. A value is considered array-like if it's
  		 * not a function and has a `value.length` that's an integer greater than or
  		 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
  		 *
  		 * @static
  		 * @memberOf _
  		 * @since 4.0.0
  		 * @category Lang
  		 * @param {*} value The value to check.
  		 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
  		 * @example
  		 *
  		 * _.isArrayLike([1, 2, 3]);
  		 * // => true
  		 *
  		 * _.isArrayLike(document.body.children);
  		 * // => true
  		 *
  		 * _.isArrayLike('abc');
  		 * // => true
  		 *
  		 * _.isArrayLike(_.noop);
  		 * // => false
  		 */
  		function isArrayLike(value) {
  		  return value != null && isLength(value.length) && !isFunction(value);
  		}

  		/**
  		 * Checks if `value` is a buffer.
  		 *
  		 * @static
  		 * @memberOf _
  		 * @since 4.3.0
  		 * @category Lang
  		 * @param {*} value The value to check.
  		 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
  		 * @example
  		 *
  		 * _.isBuffer(new Buffer(2));
  		 * // => true
  		 *
  		 * _.isBuffer(new Uint8Array(2));
  		 * // => false
  		 */
  		var isBuffer = nativeIsBuffer || stubFalse;

  		/**
  		 * Performs a deep comparison between two values to determine if they are
  		 * equivalent.
  		 *
  		 * **Note:** This method supports comparing arrays, array buffers, booleans,
  		 * date objects, error objects, maps, numbers, `Object` objects, regexes,
  		 * sets, strings, symbols, and typed arrays. `Object` objects are compared
  		 * by their own, not inherited, enumerable properties. Functions and DOM
  		 * nodes are compared by strict equality, i.e. `===`.
  		 *
  		 * @static
  		 * @memberOf _
  		 * @since 0.1.0
  		 * @category Lang
  		 * @param {*} value The value to compare.
  		 * @param {*} other The other value to compare.
  		 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
  		 * @example
  		 *
  		 * var object = { 'a': 1 };
  		 * var other = { 'a': 1 };
  		 *
  		 * _.isEqual(object, other);
  		 * // => true
  		 *
  		 * object === other;
  		 * // => false
  		 */
  		function isEqual(value, other) {
  		  return baseIsEqual(value, other);
  		}

  		/**
  		 * Checks if `value` is classified as a `Function` object.
  		 *
  		 * @static
  		 * @memberOf _
  		 * @since 0.1.0
  		 * @category Lang
  		 * @param {*} value The value to check.
  		 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
  		 * @example
  		 *
  		 * _.isFunction(_);
  		 * // => true
  		 *
  		 * _.isFunction(/abc/);
  		 * // => false
  		 */
  		function isFunction(value) {
  		  if (!isObject(value)) {
  		    return false;
  		  }
  		  // The use of `Object#toString` avoids issues with the `typeof` operator
  		  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  		  var tag = baseGetTag(value);
  		  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
  		}

  		/**
  		 * Checks if `value` is a valid array-like length.
  		 *
  		 * **Note:** This method is loosely based on
  		 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
  		 *
  		 * @static
  		 * @memberOf _
  		 * @since 4.0.0
  		 * @category Lang
  		 * @param {*} value The value to check.
  		 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
  		 * @example
  		 *
  		 * _.isLength(3);
  		 * // => true
  		 *
  		 * _.isLength(Number.MIN_VALUE);
  		 * // => false
  		 *
  		 * _.isLength(Infinity);
  		 * // => false
  		 *
  		 * _.isLength('3');
  		 * // => false
  		 */
  		function isLength(value) {
  		  return typeof value == 'number' &&
  		    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
  		}

  		/**
  		 * Checks if `value` is the
  		 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
  		 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
  		 *
  		 * @static
  		 * @memberOf _
  		 * @since 0.1.0
  		 * @category Lang
  		 * @param {*} value The value to check.
  		 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
  		 * @example
  		 *
  		 * _.isObject({});
  		 * // => true
  		 *
  		 * _.isObject([1, 2, 3]);
  		 * // => true
  		 *
  		 * _.isObject(_.noop);
  		 * // => true
  		 *
  		 * _.isObject(null);
  		 * // => false
  		 */
  		function isObject(value) {
  		  var type = typeof value;
  		  return value != null && (type == 'object' || type == 'function');
  		}

  		/**
  		 * Checks if `value` is object-like. A value is object-like if it's not `null`
  		 * and has a `typeof` result of "object".
  		 *
  		 * @static
  		 * @memberOf _
  		 * @since 4.0.0
  		 * @category Lang
  		 * @param {*} value The value to check.
  		 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
  		 * @example
  		 *
  		 * _.isObjectLike({});
  		 * // => true
  		 *
  		 * _.isObjectLike([1, 2, 3]);
  		 * // => true
  		 *
  		 * _.isObjectLike(_.noop);
  		 * // => false
  		 *
  		 * _.isObjectLike(null);
  		 * // => false
  		 */
  		function isObjectLike(value) {
  		  return value != null && typeof value == 'object';
  		}

  		/**
  		 * Checks if `value` is classified as a typed array.
  		 *
  		 * @static
  		 * @memberOf _
  		 * @since 3.0.0
  		 * @category Lang
  		 * @param {*} value The value to check.
  		 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
  		 * @example
  		 *
  		 * _.isTypedArray(new Uint8Array);
  		 * // => true
  		 *
  		 * _.isTypedArray([]);
  		 * // => false
  		 */
  		var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

  		/**
  		 * Creates an array of the own enumerable property names of `object`.
  		 *
  		 * **Note:** Non-object values are coerced to objects. See the
  		 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
  		 * for more details.
  		 *
  		 * @static
  		 * @since 0.1.0
  		 * @memberOf _
  		 * @category Object
  		 * @param {Object} object The object to query.
  		 * @returns {Array} Returns the array of property names.
  		 * @example
  		 *
  		 * function Foo() {
  		 *   this.a = 1;
  		 *   this.b = 2;
  		 * }
  		 *
  		 * Foo.prototype.c = 3;
  		 *
  		 * _.keys(new Foo);
  		 * // => ['a', 'b'] (iteration order is not guaranteed)
  		 *
  		 * _.keys('hi');
  		 * // => ['0', '1']
  		 */
  		function keys(object) {
  		  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
  		}

  		/**
  		 * This method returns a new empty array.
  		 *
  		 * @static
  		 * @memberOf _
  		 * @since 4.13.0
  		 * @category Util
  		 * @returns {Array} Returns the new empty array.
  		 * @example
  		 *
  		 * var arrays = _.times(2, _.stubArray);
  		 *
  		 * console.log(arrays);
  		 * // => [[], []]
  		 *
  		 * console.log(arrays[0] === arrays[1]);
  		 * // => false
  		 */
  		function stubArray() {
  		  return [];
  		}

  		/**
  		 * This method returns `false`.
  		 *
  		 * @static
  		 * @memberOf _
  		 * @since 4.13.0
  		 * @category Util
  		 * @returns {boolean} Returns `false`.
  		 * @example
  		 *
  		 * _.times(2, _.stubFalse);
  		 * // => [false, false]
  		 */
  		function stubFalse() {
  		  return false;
  		}

  		module.exports = isEqual; 
  	} (lodash_isequal, lodash_isequal.exports));
  	return lodash_isequal.exports;
  }

  var lodash_isequalExports = requireLodash_isequal();
  var k = /*@__PURE__*/getDefaultExportFromCjs(lodash_isequalExports);

  var S={created(){if(!this.$options.remember||this.$isServer)return;Array.isArray(this.$options.remember)&&(this.$options.remember={data:this.$options.remember}),typeof this.$options.remember=="string"&&(this.$options.remember={data:[this.$options.remember]}),typeof this.$options.remember.data=="string"&&(this.$options.remember={data:[this.$options.remember.data]});let e=this.$options.remember.key instanceof Function?this.$options.remember.key.call(this):this.$options.remember.key,t=Ne.restore(e),r=this.$options.remember.data.filter(s=>!(this[s]!==null&&typeof this[s]=="object"&&this[s].__rememberable===false)),l=s=>this[s]!==null&&typeof this[s]=="object"&&typeof this[s].__remember=="function"&&typeof this[s].__restore=="function";r.forEach(s=>{this[s]!==void 0&&t!==void 0&&t[s]!==void 0&&(l(s)?this[s].__restore(t[s]):this[s]=t[s]),this.$watch(s,()=>{Ne.remember(r.reduce((p,c)=>({...p,[c]:l(c)?this[c].__remember():this[c]}),{}),e);},{immediate:true,deep:true});});}};function b(...e){let t=typeof e[0]=="string"?e[0]:null,r=(typeof e[0]=="string"?e[1]:e[0])||{},l=t?Ne.restore(t):null,s=typeof r=="object"?f(r):f(r()),p=null,c=null,d=o=>o,u=reactive({...l?l.data:f(s),isDirty:false,errors:l?l.errors:{},hasErrors:false,processing:false,progress:null,wasSuccessful:false,recentlySuccessful:false,data(){return Object.keys(s).reduce((o,n)=>(o[n]=this[n],o),{})},transform(o){return d=o,this},defaults(o,n){if(typeof r=="function")throw new Error("You cannot call `defaults()` when using a function to define your form data.");return typeof o>"u"?(s=this.data(),this.isDirty=false):s=Object.assign({},f(s),n?{[o]:n}:o),this},reset(...o){let n=typeof r=="object"?f(s):f(r()),i=f(n);return o.length===0?(s=i,Object.assign(this,n)):Object.keys(n).filter(m=>o.includes(m)).forEach(m=>{s[m]=i[m],this[m]=n[m];}),this},setError(o,n){return Object.assign(this.errors,n?{[o]:n}:o),this.hasErrors=Object.keys(this.errors).length>0,this},clearErrors(...o){return this.errors=Object.keys(this.errors).reduce((n,i)=>({...n,...o.length>0&&!o.includes(i)?{[i]:this.errors[i]}:{}}),{}),this.hasErrors=Object.keys(this.errors).length>0,this},submit(o,n,i={}){let m=d(this.data()),h={...i,onCancelToken:a=>{if(p=a,i.onCancelToken)return i.onCancelToken(a)},onBefore:a=>{if(this.wasSuccessful=false,this.recentlySuccessful=false,clearTimeout(c),i.onBefore)return i.onBefore(a)},onStart:a=>{if(this.processing=true,i.onStart)return i.onStart(a)},onProgress:a=>{if(this.progress=a,i.onProgress)return i.onProgress(a)},onSuccess:async a=>{this.processing=false,this.progress=null,this.clearErrors(),this.wasSuccessful=true,this.recentlySuccessful=true,c=setTimeout(()=>this.recentlySuccessful=false,2e3);let I=i.onSuccess?await i.onSuccess(a):null;return s=f(this.data()),this.isDirty=false,I},onError:a=>{if(this.processing=false,this.progress=null,this.clearErrors().setError(a),i.onError)return i.onError(a)},onCancel:()=>{if(this.processing=false,this.progress=null,i.onCancel)return i.onCancel()},onFinish:a=>{if(this.processing=false,this.progress=null,p=null,i.onFinish)return i.onFinish(a)}};o==="delete"?Ne.delete(n,{...h,data:m}):Ne[o](n,m,h);},get(o,n){this.submit("get",o,n);},post(o,n){this.submit("post",o,n);},put(o,n){this.submit("put",o,n);},patch(o,n){this.submit("patch",o,n);},delete(o,n){this.submit("delete",o,n);},cancel(){p&&p.cancel();},__rememberable:t===null,__remember(){return {data:this.data(),errors:this.errors}},__restore(o){Object.assign(this,o.data),this.setError(o.errors);}});return watch(u,o=>{u.isDirty=!k(u.data(),s),t&&Ne.remember(f(o.__remember()),t);},{immediate:true,deep:true}),u}var g={},P=null,D={name:"Inertia",props:{initialPage:{type:Object,required:true},initialComponent:{type:[Object,Function,String],required:false},resolveComponent:{type:Function,required:false},titleCallback:{type:Function,required:false,default:e=>e},onHeadUpdate:{type:Function,required:false,default:()=>()=>{}}},data(){return {component:this.initialComponent||null,page:this.initialPage,key:null}},created(){g=this,P=ee(this.$isServer,this.titleCallback,this.onHeadUpdate),this.$isServer||(Ne.init({initialPage:this.initialPage,resolveComponent:this.resolveComponent,swapComponent:async({component:e,page:t,preserveState:r})=>{this.component=e,this.page=t,this.key=r?this.key:Date.now();}}),Ne.on("navigate",()=>P.forceUpdate()));},render(e){if(this.component){let t=e(this.component,{key:this.key,props:this.page.props,scopedSlots:this.$scopedSlots});return this.component.layout?typeof this.component.layout=="function"?this.component.layout(e,t):Array.isArray(this.component.layout)?this.component.layout.concat(t).reverse().reduce((r,l)=>e(l,{props:this.page.props},[r])):e(this.component.layout,{props:this.page.props},[t]):t}}},C=D,O={install(e){Ne.form=b,e.mixin(S),e.mixin({beforeCreate(){Object.defineProperty(this,"$headManager",{get:function(){return P}}),Object.defineProperty(this,"$inertia",{get:function(){return Ne}}),Object.defineProperty(this,"$page",{get:function(){return g.page}});}});}};async function x({id:e="app",resolve:t,setup:r,title:l,progress:s={},page:p,render:c}){let d=typeof window>"u",u=d?null:document.getElementById(e),o=p||JSON.parse(u.dataset.page),n=h=>Promise.resolve(t(h)).then(a=>a.default||a),i=[],m=await n(o.component).then(h=>r({el:u,App:C,props:{attrs:{id:e,"data-page":JSON.stringify(o)},props:{initialPage:o,initialComponent:h,resolveComponent:n,titleCallback:l,onHeadUpdate:d?a=>i=a:null}},plugin:O}));if(!d&&s&&ie(s),d)return c(m).then(h=>({head:i,body:h}))}

  x({
      resolve: name => {
          const pages = {"./pages/Author/Show.vue": function(){ return Promise.resolve().then(function () { return Show; });}};
          return pages[`./pages/${name}.vue`]()
      },
      setup({ el, App, props, plugin }) {
          Vue.use(plugin);
          Vue.mixin({ methods: { route } });

          new Vue({
              render: h => h(App, props),
          }).$mount(el);
      },
  });

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


      var script$1 = defineComponent({
          data() {
              return {
                  showNavDropdown: false,
              }
          },
          methods: {
              logout() {
                  // TODO implement logout
              }
          }
      });

  function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
      // Vue.extend constructor export interop.
      const options = typeof script === 'function' ? script.options : script;
      // render functions
      if (template && template.render) {
          options.render = template.render;
          options.staticRenderFns = template.staticRenderFns;
          options._compiled = true;
      }
      return script;
  }

  /* script */
  const __vue_script__$1 = script$1;

  /* template */
  var __vue_render__$1 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{attrs:{"id":"app"}},[_c('nav',{staticClass:"navbar navbar-expand-md navbar-light bg-white shadow-sm"},[_c('div',{staticClass:"container"},[_c('a',{staticClass:"navbar-brand",attrs:{"href":"/"}},[_vm._v("\n                Postr\n            ")]),_vm._v(" "),_vm._m(0),_vm._v(" "),_c('div',{staticClass:"collapse navbar-collapse",attrs:{"id":"navbarSupportedContent"}},[_c('ul',{staticClass:"navbar-nav mr-auto"}),_vm._v(" "),_c('ul',{staticClass:"navbar-nav ml-auto"},[(!_vm.$page.props.user)?[_c('li',{staticClass:"nav-item"},[_c('a',{staticClass:"nav-link",attrs:{"href":_vm.route('login')}},[_vm._v("Login")])]),_vm._v(" "),(_vm.route().has('register'))?_c('li',{staticClass:"nav-item"},[_c('a',{staticClass:"nav-link",attrs:{"href":_vm.route('register')}},[_vm._v("Register")])]):_vm._e()]:[_c('li',{staticClass:"nav-item dropdown"},[_c('a',{staticClass:"nav-link dropdown-toggle",attrs:{"id":"navbarDropdown","href":"#","role":"button","data-toggle":"dropdown","aria-haspopup":"true","aria-expanded":"false"},on:{"click":function($event){$event.preventDefault();_vm.showNavDropdown = !_vm.showNavDropdown;}}},[_vm._v("\n                                "+_vm._s(_vm.$page.props.user.name)+"\n                            ")]),_vm._v(" "),_c('div',{staticClass:"dropdown-menu dropdown-menu-right",class:{show: _vm.showNavDropdown },attrs:{"aria-labelledby":"navbarDropdown"}},[_c('a',{staticClass:"dropdown-item",attrs:{"href":_vm.route('logout')},on:{"click":function($event){$event.preventDefault();return _vm.logout()}}},[_vm._v("\n                                    Logout\n                                ")])])])]],2)])])]),_vm._v(" "),_c('main',{staticClass:"py-4"},[_c('div',{staticClass:"container"},[_c('div',{staticClass:"row justify-content-center"},[_c('div',{staticClass:"col-md-8"},[_vm._t("default")],2)])])])])};
  var __vue_staticRenderFns__$1 = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('button',{staticClass:"navbar-toggler",attrs:{"type":"button","data-toggle":"collapse","data-target":"#navbarSupportedContent","aria-controls":"navbarSupportedContent","aria-expanded":"false","aria-label":"Toggle navigation"}},[_c('span',{staticClass:"navbar-toggler-icon"})])}];

    /* style */
    const __vue_inject_styles__$1 = undefined;
    /* style inject */
    
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    const __vue_component__$1 = /*#__PURE__*/normalizeComponent(
      { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
      __vue_inject_styles__$1,
      __vue_script__$1);

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


      var script = defineComponent({
          props: {
              author: Object,
              posts: Array,
          },
          components: {
              AppLayout: __vue_component__$1,
          }
      });

  /* script */
  const __vue_script__ = script;

  /* template */
  var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('AppLayout',[_c('div',{staticClass:"container"},[_c('div',{staticClass:"row justify-content-center"},[_c('div',{staticClass:"col-md-8"},[_c('p',[_vm._v("Viewing posts by "+_vm._s(_vm.author.name)+"...")]),_vm._v(" "),(!_vm.posts.length)?_c('p',[_vm._v("\n                    There are no posts by this user.\n                ")]):_vm._e(),_vm._v(" "),_vm._l((_vm.posts),function(post){return _c('div',{key:post.id,staticClass:"card my-2"},[_c('div',{staticClass:"card-body"},[_c('h6',{staticClass:"card-subtitle mb-2 text-muted"},[_vm._v(_vm._s((post.author || {}).name || 'Somebody')+" said...")]),_vm._v(" "),_c('p',{staticClass:"card-text"},[_vm._v(_vm._s(post.content))]),_vm._v(" "),_c('a',{staticClass:"card-link"},[_vm._v("Repost")]),_vm._v(" "),_c('a',{staticClass:"card-link"},[_vm._v("Like")])])])})],2)])])])};
  var __vue_staticRenderFns__ = [];

    /* style */
    const __vue_inject_styles__ = undefined;
    /* style inject */
    
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    const __vue_component__ = /*#__PURE__*/normalizeComponent(
      { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
      __vue_inject_styles__,
      __vue_script__);

  var Show = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: __vue_component__
  });

})();
