global.webpackJsonpMpvue([0],[
/* 0 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() { return typeof global !== 'undefined' ? global : this; })();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {// fix env
try {
  if (!global) global = {};
  global.process = global.process || {};
  global.process.env = global.process.env || {};
  global.App = global.App || App;
  global.Page = global.Page || Page;
  global.Component = global.Component || Component;
  global.getApp = global.getApp || getApp;

  if (typeof wx !== 'undefined') {
    global.mpvue = wx;
    global.mpvuePlatform = 'wx';
  } else if (typeof swan !== 'undefined') {
    global.mpvue = swan;
    global.mpvuePlatform = 'swan';
  }else if (typeof tt !== 'undefined') {
    global.mpvue = tt;
    global.mpvuePlatform = 'tt';
  }else if (typeof my !== 'undefined') {
    global.mpvue = my;
    global.mpvuePlatform = 'my';
  }
} catch (e) {}

(function (global, factory) {
	 true ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Vue = factory());
}(this, (function () { 'use strict';

/*  */

// these helpers produces better vm code in JS engines due to their
// explicitness and function inlining
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive
 */
function isPrimitive (value) {
  return typeof value === 'string' || typeof value === 'number'
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

var _toString = Object.prototype.toString;

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(val);
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : typeof val === 'object'
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert a input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if a attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,is');

/**
 * Remove an item from an array
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether the object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /([^-])([A-Z])/g;
var hyphenate = cached(function (str) {
  return str
    .replace(hyphenateRE, '$1-$2')
    .replace(hyphenateRE, '$1-$2')
    .toLowerCase()
});

/**
 * Simple bind, faster than native
 */
function bind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }
  // record original fn length
  boundFn._length = fn.length;
  return boundFn
}

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/)
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/**
 * Return same value
 */
var identity = function (_) { return _; };

/**
 * Generate a static keys string from compiler modules.
 */


/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      return JSON.stringify(a) === JSON.stringify(b)
    } catch (e) {
      // possible circular reference
      return a === b
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var SSR_ATTR = 'data-server-rendered';

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

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
  'deactivated', 'onLaunch',
  'onLoad',
  'onShow',
  'onReady',
  'onHide',
  'onUnload',
  'onPullDownRefresh',
  'onReachBottom',
  'onShareAppMessage',
  'onPageScroll',
  'onTabItemTap',
  'attached',
  'ready',
  'moved',
  'detached'
];

/*  */

var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
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
  getTagNamespace: noop,

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
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

var emptyObject = Object.freeze({});

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = /[^\w.$]/;
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

var warn = noop;

var formatComponentName = (null); // work around flow check

/*  */

function handleError (err, vm, info) {
  if (config.errorHandler) {
    config.errorHandler.call(null, err, vm, info);
  } else {
    if (inBrowser && typeof console !== 'undefined') {
      console.error(err);
    } else {
      throw err
    }
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var UA = ['mpvue-runtime'].join();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = UA && UA.indexOf('android') > 0;
var isIOS = UA && /iphone|ipad|ipod|ios/.test(UA);
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;

// Firefix has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;

var supportsPassive = false;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
        /* istanbul ignore next */
        supportsPassive = true;
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
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
      _isServer = global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

/**
 * Defer a task to execute it asynchronously.
 */
var nextTick = (function () {
  var callbacks = [];
  var pending = false;
  var timerFunc;

  function nextTickHandler () {
    pending = false;
    var copies = callbacks.slice(0);
    callbacks.length = 0;
    for (var i = 0; i < copies.length; i++) {
      copies[i]();
    }
  }

  // the nextTick behavior leverages the microtask queue, which can be accessed
  // via either native Promise.then or MutationObserver.
  // MutationObserver has wider support, however it is seriously bugged in
  // UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
  // completely stops working after triggering a few times... so, if native
  // Promise is available, we will use it:
  /* istanbul ignore if */
  if (typeof Promise !== 'undefined' && isNative(Promise)) {
    var p = Promise.resolve();
    var logError = function (err) { console.error(err); };
    timerFunc = function () {
      p.then(nextTickHandler).catch(logError);
      // in problematic UIWebViews, Promise.then doesn't completely break, but
      // it can get stuck in a weird state where callbacks are pushed into the
      // microtask queue but the queue isn't being flushed, until the browser
      // needs to do some other work, e.g. handle a timer. Therefore we can
      // "force" the microtask queue to be flushed by adding an empty timer.
      if (isIOS) { setTimeout(noop); }
    };
  // } else if (typeof MutationObserver !== 'undefined' && (
  //   isNative(MutationObserver) ||
  //   // PhantomJS and iOS 7.x
  //   MutationObserver.toString() === '[object MutationObserverConstructor]'
  // )) {
  //   // use MutationObserver where native Promise is not available,
  //   // e.g. PhantomJS IE11, iOS7, Android 4.4
  //   var counter = 1
  //   var observer = new MutationObserver(nextTickHandler)
  //   var textNode = document.createTextNode(String(counter))
  //   observer.observe(textNode, {
  //     characterData: true
  //   })
  //   timerFunc = () => {
  //     counter = (counter + 1) % 2
  //     textNode.data = String(counter)
  //   }
  } else {
    // fallback to setTimeout
    /* istanbul ignore next */
    timerFunc = function () {
      setTimeout(nextTickHandler, 0);
    };
  }

  return function queueNextTick (cb, ctx) {
    var _resolve;
    callbacks.push(function () {
      if (cb) {
        try {
          cb.call(ctx);
        } catch (e) {
          handleError(e, ctx, 'nextTick');
        }
      } else if (_resolve) {
        _resolve(ctx);
      }
    });
    if (!pending) {
      pending = true;
      timerFunc();
    }
    if (!cb && typeof Promise !== 'undefined') {
      return new Promise(function (resolve, reject) {
        _resolve = resolve;
      })
    }
  }
})();

var _Set;
/* istanbul ignore if */
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = (function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */


var uid$1 = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid$1++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.target) {
    Dep.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// the current target watcher being evaluated.
// this is globally unique because there could be only one
// watcher being evaluated at any time.
Dep.target = null;
var targetStack = [];

function pushTarget (_target) {
  if (Dep.target) { targetStack.push(Dep.target); }
  Dep.target = _target;
}

function popTarget () {
  Dep.target = targetStack.pop();
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);[
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
]
.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * By default, when a reactive property is set, the new value is
 * also converted to become reactive. However when passing down props,
 * we don't want to force conversion because the value may be a nested value
 * under a frozen data structure. Converting it would defeat the optimization.
 */
var observerState = {
  shouldConvert: true
};

/**
 * Observer class that are attached to each observed
 * object. Once attached, the observer converts target
 * object's property keys into getter/setters that
 * collect dependencies and dispatches updates.
 */
var Observer = function Observer (value, key) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  if (key) {
    this.key = key;
  }
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    var augment = hasProto
      ? protoAugment
      : copyAugment;
    augment(value, arrayMethods, arrayKeys);
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through each property and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i], obj[keys[i]]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment an target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src, keys) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment an target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData, key) {
  if (!isObject(value)) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    observerState.shouldConvert &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value, key);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;

  var childOb = !shallow && observe(val, undefined, key);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.target) {
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
        }
        if (Array.isArray(value)) {
          dependArray(value);
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }

      /* eslint-enable no-self-compare */
      if (false) {
        customSetter();
      }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal, undefined, key);
      dep.notify();

      if (!obj.__keyPath) {
        def(obj, '__keyPath', {}, false);
      }
      obj.__keyPath[key] = true;
      if (newVal instanceof Object && !(newVal instanceof Array)) {
        // 标记是否是通过this.Obj = {} 赋值印发的改动，解决少更新问题#1305
        def(newVal, '__newReference', true, false);
      }
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (hasOwn(target, key)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
    "production" !== 'production' && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  // Vue.set 添加对象属性，渲染时候把 val 传给小程序渲染
  if (!target.__keyPath) {
    def(target, '__keyPath', {}, false);
  }
  target.__keyPath[key] = true;
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
    "production" !== 'production' && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  if (!target.__keyPath) {
    def(target, '__keyPath', {}, false);
  }
  // Vue.del 删除对象属性，渲染时候把这个属性设置为 undefined
  target.__keyPath[key] = 'del';
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;
  var keys = Object.keys(from);
  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (isPlainObject(toVal) && isPlainObject(fromVal)) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this) : childVal,
        parentVal.call(this)
      )
    }
  } else if (parentVal || childVal) {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm)
        : undefined;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
      "production" !== 'production' && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn.call(this, parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  return childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (parentVal, childVal) {
  var res = Object.create(parentVal || null);
  return childVal
    ? extend(res, childVal)
    : res
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
strats.watch = function (parentVal, childVal) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key in childVal) {
    var parent = ret[key];
    var child = childVal[key];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (parentVal, childVal) {
  if (!childVal) { return Object.create(parentVal || null) }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  extend(ret, childVal);
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else {}
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options) {
  var inject = options.inject;
  if (Array.isArray(inject)) {
    var normalized = options.inject = {};
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = inject[i];
    }
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def = dirs[key];
      if (typeof def === 'function') {
        dirs[key] = { bind: def, update: def };
      }
    }
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child);
  normalizeInject(child);
  normalizeDirectives(child);
  var extendsFrom = child.extends;
  if (extendsFrom) {
    parent = mergeOptions(parent, extendsFrom, vm);
  }
  if (child.mixins) {
    for (var i = 0, l = child.mixins.length; i < l; i++) {
      parent = mergeOptions(parent, child.mixins[i], vm);
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
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if (false) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */

function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // handle boolean props
  if (isType(Boolean, prop.type)) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (!isType(String, prop.type) && (value === '' || value === hyphenate(key))) {
      value = true;
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldConvert = observerState.shouldConvert;
    observerState.shouldConvert = true;
    observe(value);
    observerState.shouldConvert = prevShouldConvert;
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if (false) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isType (type, fn) {
  if (!Array.isArray(fn)) {
    return getType(fn) === getType(type)
  }
  for (var i = 0, len = fn.length; i < len; i++) {
    if (getType(fn[i]) === getType(type)) {
      return true
    }
  }
  /* istanbul ignore next */
  return false
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var mark;
var measure;

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.functionalContext = undefined;
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
};

var prototypeAccessors = { child: {} };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    vnode.children,
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.isCloned = true;
  return cloned
}

function cloneVNodes (vnodes) {
  var len = vnodes.length;
  var res = new Array(len);
  for (var i = 0; i < len; i++) {
    res[i] = cloneVNode(vnodes[i]);
  }
  return res
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        cloned[i].apply(null, arguments$1);
      }
    } else {
      // return handler return value for single handlers
      return fns.apply(null, arguments)
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  vm
) {
  var name, cur, old, event;
  for (name in on) {
    cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
      "production" !== 'production' && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur);
      }
      add(event.name, cur, event.once, event.capture, event.passive);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    return
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  return res
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

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
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    last = res[res.length - 1];
    //  nested
    if (Array.isArray(c)) {
      res.push.apply(res, normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i)));
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        (last).text += String(c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[res.length - 1] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function ensureCtor (comp, base) {
  if (comp.__esModule && comp.default) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor,
  context
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (isDef(factory.contexts)) {
    // already pending
    factory.contexts.push(context);
  } else {
    var contexts = factory.contexts = [context];
    var sync = true;

    var forceRender = function () {
      for (var i = 0, l = contexts.length; i < l; i++) {
        contexts[i].$forceUpdate();
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender();
      }
    });

    var reject = once(function (reason) {
      "production" !== 'production' && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender();
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (typeof res.then === 'function') {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isDef(res.component) && typeof res.component.then === 'function') {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            setTimeout(function () {
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender();
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          setTimeout(function () {
            if (isUndef(factory.resolved)) {
              reject(
                null
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && isDef(c.componentOptions)) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn, once$$1) {
  if (once$$1) {
    target.$once(event, fn);
  } else {
    target.$on(event, fn);
  }
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, vm);
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var this$1 = this;

    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        this$1.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var this$1 = this;

    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        this$1.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (arguments.length === 1) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      for (var i = 0, l = cbs.length; i < l; i++) {
        try {
          cbs[i].apply(vm, args);
        } catch (e) {
          handleError(e, vm, ("event handler for \"" + event + "\""));
        }
      }
    }
    return vm
  };
}

/*  */

/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  var slots = {};
  if (!children) {
    return slots
  }
  var defaultSlot = [];
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.functionalContext === context) &&
      child.data && child.data.slot != null
    ) {
      var name = child.data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children);
      } else {
        slot.push(child);
      }
    } else {
      defaultSlot.push(child);
    }
  }
  // ignore whitespace
  if (!defaultSlot.every(isWhitespace)) {
    slots.default = defaultSlot;
  }
  return slots
}

function isWhitespace (node) {
  return node.isComment || node.text === ' '
}

function resolveScopedSlots (
  fns, // see flow/vnode
  res
) {
  res = res || {};
  for (var i = 0; i < fns.length; i++) {
    if (Array.isArray(fns[i])) {
      resolveScopedSlots(fns[i], res);
    } else {
      res[fns[i].key] = fns[i].fn;
    }
  }
  return res
}

/*  */

var activeInstance = null;


function initLifecycle (vm) {
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

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    if (vm._isMounted) {
      callHook(vm, 'beforeUpdate');
    }
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var prevActiveInstance = activeInstance;
    activeInstance = vm;
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(
        vm.$el, vnode, hydrating, false /* removeOnly */,
        vm.$options._parentElm,
        vm.$options._refElm
      );
      // no need for the ref nodes after initial patch
      // this prevents keeping a detached DOM tree in memory (#5851)
      vm.$options._parentElm = vm.$options._refElm = null;
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    activeInstance = prevActiveInstance;
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
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
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
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
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
  };
}

function mountComponent (
  vm,
  el,
  hydrating
) {
  vm.$el = el;
  if (!vm.$options.render) {
    vm.$options.render = createEmptyVNode;
    
  }
  callHook(vm, 'beforeMount');

  var updateComponent;
  /* istanbul ignore if */
  if (false) {
    updateComponent = function () {
      var name = vm._name;
      var id = vm._uid;
      var startTag = "vue-perf-start:" + id;
      var endTag = "vue-perf-end:" + id;

      mark(startTag);
      var vnode = vm._render();
      mark(endTag);
      measure((name + " render"), startTag, endTag);

      mark(startTag);
      vm._update(vnode, hydrating);
      mark(endTag);
      measure((name + " patch"), startTag, endTag);
    };
  } else {
    updateComponent = function () {
      vm._update(vm._render(), hydrating);
    };
  }

  vm._watcher = new Watcher(vm, updateComponent, noop);
  hydrating = false;

  // manually mounted instance, call mounted on self
  // mounted is called for render-created child components in its inserted hook
  if (vm.$vnode == null) {
    vm._isMounted = true;
    callHook(vm, 'mounted');
  }
  return vm
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  var hasChildren = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    parentVnode.data.scopedSlots || // has new scoped slots
    vm.$scopedSlots !== emptyObject // has old scoped slots
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listensers hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data && parentVnode.data.attrs;
  vm.$listeners = listeners;

  // update props
  if (propsData && vm.$options.props) {
    observerState.shouldConvert = false;
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      props[key] = validateProp(key, vm.$options.props, propsData, vm);
    }
    observerState.shouldConvert = true;
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }

  // update listeners
  if (listeners) {
    var oldListeners = vm.$options._parentListeners;
    vm.$options._parentListeners = listeners;
    updateComponentListeners(vm, listeners, oldListeners);
  }
  // resolve slots + force update if has children
  if (hasChildren) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  var handlers = vm.$options[hook];
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      try {
        handlers[i].call(vm);
      } catch (e) {
        handleError(e, vm, (hook + " hook"));
      }
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
}

/*  */


var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  waiting = flushing = false;
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
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
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if (false) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
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
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
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
}

/*  */

var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options
) {
  this.vm = vm;
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression = '';
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = function () {};
      "production" !== 'production' && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
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
Watcher.prototype.cleanupDeps = function cleanupDeps () {
    var this$1 = this;

  var i = this.deps.length;
  while (i--) {
    var dep = this$1.deps[i];
    if (!this$1.newDepIds.has(dep.id)) {
      dep.removeSub(this$1);
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
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
    var this$1 = this;

  var i = this.deps.length;
  while (i--) {
    this$1.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
    var this$1 = this;

  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this$1.deps[i].removeSub(this$1);
    }
    this.active = false;
  }
};

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
var seenObjects = new _Set();
function traverse (val) {
  seenObjects.clear();
  _traverse(val, seenObjects);
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || !Object.isExtensible(val)) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function checkOptionType (vm, name) {
  var option = vm.$options[name];
  if (!isPlainObject(option)) {
    warn(
      ("component option \"" + name + "\" should be an object."),
      vm
    );
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  observerState.shouldConvert = isRoot;
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    {
      defineReactive$$1(props, key, value);
    }
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  observerState.shouldConvert = true;
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
    "production" !== 'production' && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (props && hasOwn(props, key)) {
      "production" !== 'production' && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  try {
    return data.call(vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  "production" !== 'production' && checkOptionType(vm, 'computed');
  var watchers = vm._computedWatchers = Object.create(null);

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    watchers[key] = new Watcher(vm, getter, noop, computedWatcherOptions);

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else {}
  }
}

function defineComputed (target, key, userDef) {
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = createComputedGetter(key);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? userDef.cache !== false
        ? createComputedGetter(key)
        : userDef.get
      : noop;
    sharedPropertyDefinition.set = userDef.set
      ? userDef.set
      : noop;
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.target) {
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function initMethods (vm, methods) {
  "production" !== 'production' && checkOptionType(vm, 'methods');
  var props = vm.$options.props;
  for (var key in methods) {
    vm[key] = methods[key] == null ? noop : bind(methods[key], vm);
    
  }
}

function initWatch (vm, watch) {
  "production" !== 'production' && checkOptionType(vm, 'watch');
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  keyOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(keyOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      cb.call(vm, watcher.value);
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    observerState.shouldConvert = false;
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      {
        defineReactive$$1(vm, key, result[key]);
      }
    });
    observerState.shouldConvert = true;
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
        ? Reflect.ownKeys(inject)
        : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      var provideKey = inject[key];
      var source = vm;
      while (source) {
        if (source._provided && provideKey in source._provided) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (false) {
        warn(("Injection \"" + key + "\" not found"), vm);
      }
    }
    return result
  }
}

/*  */

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  context,
  children
) {
  var props = {};
  var propOptions = Ctor.options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || {});
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var _context = Object.create(context);
  var h = function (a, b, c, d) { return createElement(_context, a, b, c, d, true); };
  var vnode = Ctor.options.render.call(null, h, {
    data: data,
    props: props,
    children: children,
    parent: context,
    listeners: data.on || {},
    injections: resolveInject(Ctor.options.inject, context),
    slots: function () { return resolveSlots(children, context); }
  });
  if (vnode instanceof VNode) {
    vnode.functionalContext = context;
    vnode.functionalOptions = Ctor.options;
    if (data.slot) {
      (vnode.data || (vnode.data = {})).slot = data.slot;
    }
  }
  return vnode
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

// hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (
    vnode,
    hydrating,
    parentElm,
    refElm
  ) {
    if (!vnode.componentInstance || vnode.componentInstance._isDestroyed) {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance,
        parentElm,
        refElm
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    } else if (vnode.data.keepAlive) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;

    if (!componentInstance._isMounted) {
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor, context);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag);

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // keep listeners
  var listeners = data.on;

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

  // merge component management hooks onto the placeholder node
  mergeHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );
  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent, // activeInstance in lifecycle state
  parentElm,
  refElm
) {
  var vnodeComponentOptions = vnode.componentOptions;
  var options = {
    _isComponent: true,
    parent: parent,
    propsData: vnodeComponentOptions.propsData,
    _componentTag: vnodeComponentOptions.tag,
    _parentVnode: vnode,
    _parentListeners: vnodeComponentOptions.listeners,
    _renderChildren: vnodeComponentOptions.children,
    _parentElm: parentElm || null,
    _refElm: refElm || null
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnodeComponentOptions.Ctor(options)
}

function mergeHooks (data) {
  if (!data.hook) {
    data.hook = {};
  }
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var fromParent = data.hook[key];
    var ours = componentVNodeHooks[key];
    data.hook[key] = fromParent ? mergeHook$1(ours, fromParent) : ours;
  }
}

function mergeHook$1 (one, two) {
  return function (a, b, c, d) {
    one(a, b, c, d);
    two(a, b, c, d);
  }
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input';(data.props || (data.props = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  if (isDef(on[event])) {
    on[event] = [data.model.callback].concat(on[event]);
  } else {
    on[event] = data.model.callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
    "production" !== 'production' && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if (false
  ) {
    warn(
      'Avoid using non-primitive value as key, ' +
      'use string/number value instead.',
      context
    );
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if (isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (isDef(vnode)) {
    if (ns) { applyNS(vnode, ns); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    return
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && isUndef(child.ns)) {
        applyNS(child, ns);
      }
    }
  }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i);
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i);
    }
  } else if (isObject(val)) {
    keys = Object.keys(val);
    ret = new Array(keys.length);
    for (i = 0, l = keys.length; i < l; i++) {
      key = keys[i];
      ret[i] = render(val[key], key, i);
    }
  }
  if (isDef(ret)) {
    (ret)._isVList = true;
  }
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      props = extend(extend({}, bindObject), props);
    }
    return scopedSlotFn(props) || fallback
  } else {
    var slotNodes = this.$slots[name];
    // warn duplicate slot usage
    if (slotNodes && "production" !== 'production') {
      slotNodes._rendered && warn(
        "Duplicate presence of slot \"" + name + "\" found in the same render tree " +
        "- this will likely cause render errors.",
        this
      );
      slotNodes._rendered = true;
    }
    return slotNodes || fallback
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

/**
 * Runtime helper for checking keyCodes from config.
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInAlias
) {
  var keyCodes = config.keyCodes[key] || builtInAlias;
  if (Array.isArray(keyCodes)) {
    return keyCodes.indexOf(eventKeyCode) === -1
  } else {
    return keyCodes !== eventKeyCode
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
      "production" !== 'production' && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        if (!(key in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var tree = this._staticTrees[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree by doing a shallow clone.
  if (tree && !isInFor) {
    return Array.isArray(tree)
      ? cloneVNodes(tree)
      : cloneVNode(tree)
  }
  // otherwise, render a fresh tree.
  tree = this._staticTrees[index] =
    this.$options.staticRenderFns[index].call(this._renderProxy);
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
      "production" !== 'production' && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(ours, existing) : ours;
      }
    }
  }
  return data
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null;
  var parentVnode = vm.$vnode = vm.$options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(vm.$options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;
  /* istanbul ignore else */
  {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs, null, true);
    defineReactive$$1(vm, '$listeners', parentData && parentData.on, null, true);
  }
}

function renderMixin (Vue) {
  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var staticRenderFns = ref.staticRenderFns;
    var _parentVnode = ref._parentVnode;

    if (vm._isMounted) {
      // clone slot nodes on re-renders
      for (var key in vm.$slots) {
        vm.$slots[key] = cloneVNodes(vm.$slots[key]);
      }
    }

    vm.$scopedSlots = (_parentVnode && _parentVnode.data.scopedSlots) || emptyObject;

    if (staticRenderFns && !vm._staticTrees) {
      vm._staticTrees = [];
    }
    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render function");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      {
        vnode = vm._vnode;
      }
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if (false) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };

  // internal render helpers.
  // these are exposed on the instance prototype to reduce generated render
  // code size.
  Vue.prototype._o = markOnce;
  Vue.prototype._n = toNumber;
  Vue.prototype._s = toString;
  Vue.prototype._l = renderList;
  Vue.prototype._t = renderSlot;
  Vue.prototype._q = looseEqual;
  Vue.prototype._i = looseIndexOf;
  Vue.prototype._m = renderStatic;
  Vue.prototype._f = resolveFilter;
  Vue.prototype._k = checkKeyCodes;
  Vue.prototype._b = bindObjectProps;
  Vue.prototype._v = createTextVNode;
  Vue.prototype._e = createEmptyVNode;
  Vue.prototype._u = resolveScopedSlots;
  Vue.prototype._g = bindObjectListeners;
}

/*  */

var uid = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid++;

    var startTag, endTag;
    /* istanbul ignore if */
    if (false) {
      startTag = "vue-perf-init:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
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
    callHook(vm, 'beforeCreate');
    initInjections(vm); // resolve injections before data/props
    initState(vm);
    initProvide(vm); // resolve provide after data/props
    callHook(vm, 'created');

    /* istanbul ignore if */
    if (false) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(((vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  opts.parent = options.parent;
  opts.propsData = options.propsData;
  opts._parentVnode = options._parentVnode;
  opts._parentListeners = options._parentListeners;
  opts._renderChildren = options._renderChildren;
  opts._componentTag = options._componentTag;
  opts._parentElm = options._parentElm;
  opts._refElm = options._refElm;
  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
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
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var extended = Ctor.extendOptions;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = dedupe(latest[key], extended[key], sealed[key]);
    }
  }
  return modified
}

function dedupe (latest, extended, sealed) {
  // compare latest and sealed to ensure lifecycle hooks won't be duplicated
  // between merges
  if (Array.isArray(latest)) {
    var res = [];
    sealed = Array.isArray(sealed) ? sealed : [sealed];
    extended = Array.isArray(extended) ? extended : [extended];
    for (var i = 0; i < latest.length; i++) {
      // push original options and not sealed options to exclude duplicated options
      if (extended.indexOf(latest[i]) >= 0 || sealed.indexOf(latest[i]) < 0) {
        res.push(latest[i]);
      }
    }
    return res
  } else {
    return latest
  }
}

function Vue$3 (options) {
  if (false
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue$3);
stateMixin(Vue$3);
eventsMixin(Vue$3);
lifecycleMixin(Vue$3);
renderMixin(Vue$3);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
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
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
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
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */

var patternTypes = [String, RegExp, Array];

function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (cache, current, filter) {
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        if (cachedNode !== current) {
          pruneCacheEntry(cachedNode);
        }
        cache[key] = null;
      }
    }
  }
}

function pruneCacheEntry (vnode) {
  if (vnode) {
    vnode.componentInstance.$destroy();
  }
}

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes
  },

  created: function created () {
    this.cache = Object.create(null);
  },

  destroyed: function destroyed () {
    var this$1 = this;

    for (var key in this$1.cache) {
      pruneCacheEntry(this$1.cache[key]);
    }
  },

  watch: {
    include: function include (val) {
      pruneCache(this.cache, this._vnode, function (name) { return matches(val, name); });
    },
    exclude: function exclude (val) {
      pruneCache(this.cache, this._vnode, function (name) { return !matches(val, name); });
    }
  },

  render: function render () {
    var vnode = getFirstComponentChild(this.$slots.default);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      if (name && (
        (this.include && !matches(this.include, name)) ||
        (this.exclude && matches(this.exclude, name))
      )) {
        return vnode
      }
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (this.cache[key]) {
        vnode.componentInstance = this.cache[key].componentInstance;
      } else {
        this.cache[key] = vnode;
      }
      vnode.data.keepAlive = true;
    }
    return vnode
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue$3);

Object.defineProperty(Vue$3.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue$3.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

Vue$3.version = '2.4.1';
Vue$3.mpvueVersion = '2.0.6';

/* globals renderer */



var isReservedTag = makeMap(
  'template,script,style,element,content,slot,link,meta,svg,view,' +
  'a,div,img,image,text,span,richtext,input,switch,textarea,spinner,select,' +
  'slider,slider-neighbor,indicator,trisition,trisition-group,canvas,' +
  'list,cell,header,loading,loading-indicator,refresh,scrollable,scroller,' +
  'video,web,embed,tabbar,tabheader,datepicker,timepicker,marquee,countdown',
  true
);

// these are reserved for web because they are directly compiled away
// during template compilation
var isReservedAttr = makeMap('style,class');

// Elements that you can, intentionally, leave open (and which close themselves)
// more flexable than web
var canBeLeftOpenTag = makeMap(
  'web,spinner,switch,video,textarea,canvas,' +
  'indicator,marquee,countdown',
  true
);

var isUnaryTag = makeMap(
  'embed,img,image,input,link,meta',
  true
);

function mustUseProp () { /* console.log('mustUseProp') */ }
function getTagNamespace () { /* console.log('getTagNamespace') */ }
function isUnknownElement () { /* console.log('isUnknownElement') */ }



function getComKey (vm) {
  return vm && vm.$attrs ? vm.$attrs['mpcomid'] : '0'
}

// 用于小程序的 event type 到 web 的 event
var eventTypeMap = {
  tap: ['tap', 'click'],
  touchstart: ['touchstart'],
  touchmove: ['touchmove'],
  touchcancel: ['touchcancel'],
  touchend: ['touchend'],
  longtap: ['longtap'],
  input: ['input'],
  blur: ['change', 'blur'],
  submit: ['submit'],
  focus: ['focus'],
  scrolltoupper: ['scrolltoupper'],
  scrolltolower: ['scrolltolower'],
  scroll: ['scroll']
};

/*  */

// import { namespaceMap } from 'mp/util/index'

var obj = {};

function createElement$1 (tagName, vnode) {
  return obj
}

function createElementNS (namespace, tagName) {
  return obj
}

function createTextNode (text) {
  return obj
}

function createComment (text) {
  return obj
}

function insertBefore (parentNode, newNode, referenceNode) {}

function removeChild (node, child) {}

function appendChild (node, child) {}

function parentNode (node) {
  return obj
}

function nextSibling (node) {
  return obj
}

function tagName (node) {
  return 'div'
}

function setTextContent (node, text) {
  return obj
}

function setAttribute (node, key, val) {
  return obj
}


var nodeOps = Object.freeze({
	createElement: createElement$1,
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
	setAttribute: setAttribute
});

/*  */

var ref = {
  create: function create (_, vnode) {
    registerRef(vnode);
  },
  update: function update (oldVnode, vnode) {
    if (oldVnode.data.ref !== vnode.data.ref) {
      registerRef(oldVnode, true);
      registerRef(vnode);
    }
  },
  destroy: function destroy (vnode) {
    registerRef(vnode, true);
  }
};

function registerRef (vnode, isRemoval) {
  var key = vnode.data.ref;
  if (!key) { return }

  var vm = vnode.context;
  var ref = vnode.componentInstance || vnode.elm;
  var refs = vm.$refs;
  if (isRemoval) {
    if (Array.isArray(refs[key])) {
      remove(refs[key], ref);
    } else if (refs[key] === ref) {
      refs[key] = undefined;
    }
  } else {
    if (vnode.data.refInFor) {
      if (!Array.isArray(refs[key])) {
        refs[key] = [ref];
      } else if (refs[key].indexOf(ref) < 0) {
        // $flow-disable-line
        refs[key].push(ref);
      }
    } else {
      refs[key] = ref;
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

/*
 * Not type-checking this because this file is perf-critical and the cost
 * of making flow understand it is not worth it.
 */

var emptyNode = new VNode('', {}, []);

var hooks = ['create', 'activate', 'update', 'remove', 'destroy'];

function sameVnode (a, b) {
  return (
    a.key === b.key && (
      (
        a.tag === b.tag &&
        a.isComment === b.isComment &&
        isDef(a.data) === isDef(b.data) &&
        sameInputType(a, b)
      ) || (
        isTrue(a.isAsyncPlaceholder) &&
        a.asyncFactory === b.asyncFactory &&
        isUndef(b.asyncFactory.error)
      )
    )
  )
}

// Some browsers do not support dynamically changing type for <input>
// so they need to be treated as different nodes
function sameInputType (a, b) {
  if (a.tag !== 'input') { return true }
  var i;
  var typeA = isDef(i = a.data) && isDef(i = i.attrs) && i.type;
  var typeB = isDef(i = b.data) && isDef(i = i.attrs) && i.type;
  return typeA === typeB
}

function createKeyToOldIdx (children, beginIdx, endIdx) {
  var i, key;
  var map = {};
  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key;
    if (isDef(key)) { map[key] = i; }
  }
  return map
}

function createPatchFunction (backend) {
  var i, j;
  var cbs = {};

  var modules = backend.modules;
  var nodeOps = backend.nodeOps;

  for (i = 0; i < hooks.length; ++i) {
    cbs[hooks[i]] = [];
    for (j = 0; j < modules.length; ++j) {
      if (isDef(modules[j][hooks[i]])) {
        cbs[hooks[i]].push(modules[j][hooks[i]]);
      }
    }
  }

  function emptyNodeAt (elm) {
    return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm)
  }

  function createRmCb (childElm, listeners) {
    function remove$$1 () {
      if (--remove$$1.listeners === 0) {
        removeNode(childElm);
      }
    }
    remove$$1.listeners = listeners;
    return remove$$1
  }

  function removeNode (el) {
    var parent = nodeOps.parentNode(el);
    // element may have already been removed due to v-html / v-text
    if (isDef(parent)) {
      nodeOps.removeChild(parent, el);
    }
  }

  var inPre = 0;
  function createElm (vnode, insertedVnodeQueue, parentElm, refElm, nested) {
    vnode.isRootInsert = !nested; // for transition enter check
    if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
      return
    }

    var data = vnode.data;
    var children = vnode.children;
    var tag = vnode.tag;
    if (isDef(tag)) {
      vnode.elm = vnode.ns
        ? nodeOps.createElementNS(vnode.ns, tag)
        : nodeOps.createElement(tag, vnode);
      setScope(vnode);

      /* istanbul ignore if */
      {
        createChildren(vnode, children, insertedVnodeQueue);
        if (isDef(data)) {
          invokeCreateHooks(vnode, insertedVnodeQueue);
        }
        insert(parentElm, vnode.elm, refElm);
      }

      if (false) {
        inPre--;
      }
    } else if (isTrue(vnode.isComment)) {
      vnode.elm = nodeOps.createComment(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    } else {
      vnode.elm = nodeOps.createTextNode(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    }
  }

  function createComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i = vnode.data;
    if (isDef(i)) {
      var isReactivated = isDef(vnode.componentInstance) && i.keepAlive;
      if (isDef(i = i.hook) && isDef(i = i.init)) {
        i(vnode, false /* hydrating */, parentElm, refElm);
      }
      // after calling the init hook, if the vnode is a child component
      // it should've created a child instance and mounted it. the child
      // component also has set the placeholder vnode's elm.
      // in that case we can just return the element and be done.
      if (isDef(vnode.componentInstance)) {
        initComponent(vnode, insertedVnodeQueue);
        if (isTrue(isReactivated)) {
          reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm);
        }
        return true
      }
    }
  }

  function initComponent (vnode, insertedVnodeQueue) {
    if (isDef(vnode.data.pendingInsert)) {
      insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert);
      vnode.data.pendingInsert = null;
    }
    vnode.elm = vnode.componentInstance.$el;
    if (isPatchable(vnode)) {
      invokeCreateHooks(vnode, insertedVnodeQueue);
      setScope(vnode);
    } else {
      // empty component root.
      // skip all element-related modules except for ref (#3455)
      registerRef(vnode);
      // make sure to invoke the insert hook
      insertedVnodeQueue.push(vnode);
    }
  }

  function reactivateComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i;
    // hack for #4339: a reactivated component with inner transition
    // does not trigger because the inner node's created hooks are not called
    // again. It's not ideal to involve module-specific logic in here but
    // there doesn't seem to be a better way to do it.
    var innerNode = vnode;
    while (innerNode.componentInstance) {
      innerNode = innerNode.componentInstance._vnode;
      if (isDef(i = innerNode.data) && isDef(i = i.transition)) {
        for (i = 0; i < cbs.activate.length; ++i) {
          cbs.activate[i](emptyNode, innerNode);
        }
        insertedVnodeQueue.push(innerNode);
        break
      }
    }
    // unlike a newly created component,
    // a reactivated keep-alive component doesn't insert itself
    insert(parentElm, vnode.elm, refElm);
  }

  function insert (parent, elm, ref$$1) {
    if (isDef(parent)) {
      if (isDef(ref$$1)) {
        if (ref$$1.parentNode === parent) {
          nodeOps.insertBefore(parent, elm, ref$$1);
        }
      } else {
        nodeOps.appendChild(parent, elm);
      }
    }
  }

  function createChildren (vnode, children, insertedVnodeQueue) {
    if (Array.isArray(children)) {
      for (var i = 0; i < children.length; ++i) {
        createElm(children[i], insertedVnodeQueue, vnode.elm, null, true);
      }
    } else if (isPrimitive(vnode.text)) {
      nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(vnode.text));
    }
  }

  function isPatchable (vnode) {
    while (vnode.componentInstance) {
      vnode = vnode.componentInstance._vnode;
    }
    return isDef(vnode.tag)
  }

  function invokeCreateHooks (vnode, insertedVnodeQueue) {
    for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
      cbs.create[i$1](emptyNode, vnode);
    }
    i = vnode.data.hook; // Reuse variable
    if (isDef(i)) {
      if (isDef(i.create)) { i.create(emptyNode, vnode); }
      if (isDef(i.insert)) { insertedVnodeQueue.push(vnode); }
    }
  }

  // set scope id attribute for scoped CSS.
  // this is implemented as a special case to avoid the overhead
  // of going through the normal attribute patching process.
  function setScope (vnode) {
    var i;
    var ancestor = vnode;
    while (ancestor) {
      if (isDef(i = ancestor.context) && isDef(i = i.$options._scopeId)) {
        nodeOps.setAttribute(vnode.elm, i, '');
      }
      ancestor = ancestor.parent;
    }
    // for slot content they should also get the scopeId from the host instance.
    if (isDef(i = activeInstance) &&
      i !== vnode.context &&
      isDef(i = i.$options._scopeId)
    ) {
      nodeOps.setAttribute(vnode.elm, i, '');
    }
  }

  function addVnodes (parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
    for (; startIdx <= endIdx; ++startIdx) {
      createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm);
    }
  }

  function invokeDestroyHook (vnode) {
    var i, j;
    var data = vnode.data;
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.destroy)) { i(vnode); }
      for (i = 0; i < cbs.destroy.length; ++i) { cbs.destroy[i](vnode); }
    }
    if (isDef(i = vnode.children)) {
      for (j = 0; j < vnode.children.length; ++j) {
        invokeDestroyHook(vnode.children[j]);
      }
    }
  }

  function removeVnodes (parentElm, vnodes, startIdx, endIdx) {
    for (; startIdx <= endIdx; ++startIdx) {
      var ch = vnodes[startIdx];
      if (isDef(ch)) {
        if (isDef(ch.tag)) {
          removeAndInvokeRemoveHook(ch);
          invokeDestroyHook(ch);
        } else { // Text node
          removeNode(ch.elm);
        }
      }
    }
  }

  function removeAndInvokeRemoveHook (vnode, rm) {
    if (isDef(rm) || isDef(vnode.data)) {
      var i;
      var listeners = cbs.remove.length + 1;
      if (isDef(rm)) {
        // we have a recursively passed down rm callback
        // increase the listeners count
        rm.listeners += listeners;
      } else {
        // directly removing
        rm = createRmCb(vnode.elm, listeners);
      }
      // recursively invoke hooks on child component root node
      if (isDef(i = vnode.componentInstance) && isDef(i = i._vnode) && isDef(i.data)) {
        removeAndInvokeRemoveHook(i, rm);
      }
      for (i = 0; i < cbs.remove.length; ++i) {
        cbs.remove[i](vnode, rm);
      }
      if (isDef(i = vnode.data.hook) && isDef(i = i.remove)) {
        i(vnode, rm);
      } else {
        rm();
      }
    } else {
      removeNode(vnode.elm);
    }
  }

  function updateChildren (parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
    var oldStartIdx = 0;
    var newStartIdx = 0;
    var oldEndIdx = oldCh.length - 1;
    var oldStartVnode = oldCh[0];
    var oldEndVnode = oldCh[oldEndIdx];
    var newEndIdx = newCh.length - 1;
    var newStartVnode = newCh[0];
    var newEndVnode = newCh[newEndIdx];
    var oldKeyToIdx, idxInOld, elmToMove, refElm;

    // removeOnly is a special flag used only by <transition-group>
    // to ensure removed elements stay in correct relative positions
    // during leaving transitions
    var canMove = !removeOnly;

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (isUndef(oldStartVnode)) {
        oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
      } else if (isUndef(oldEndVnode)) {
        oldEndVnode = oldCh[--oldEndIdx];
      } else if (sameVnode(oldStartVnode, newStartVnode)) {
        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
        oldStartVnode = oldCh[++oldStartIdx];
        newStartVnode = newCh[++newStartIdx];
      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
        oldEndVnode = oldCh[--oldEndIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
        canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
        oldStartVnode = oldCh[++oldStartIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
        canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
        oldEndVnode = oldCh[--oldEndIdx];
        newStartVnode = newCh[++newStartIdx];
      } else {
        if (isUndef(oldKeyToIdx)) { oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx); }
        idxInOld = isDef(newStartVnode.key) ? oldKeyToIdx[newStartVnode.key] : null;
        if (isUndef(idxInOld)) { // New element
          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm);
          newStartVnode = newCh[++newStartIdx];
        } else {
          elmToMove = oldCh[idxInOld];
          /* istanbul ignore if */
          if (false) {
            warn(
              'It seems there are duplicate keys that is causing an update error. ' +
              'Make sure each v-for item has a unique key.'
            );
          }
          if (sameVnode(elmToMove, newStartVnode)) {
            patchVnode(elmToMove, newStartVnode, insertedVnodeQueue);
            oldCh[idxInOld] = undefined;
            canMove && nodeOps.insertBefore(parentElm, elmToMove.elm, oldStartVnode.elm);
            newStartVnode = newCh[++newStartIdx];
          } else {
            // same key but different element. treat as new element
            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm);
            newStartVnode = newCh[++newStartIdx];
          }
        }
      }
    }
    if (oldStartIdx > oldEndIdx) {
      refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
      addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
    } else if (newStartIdx > newEndIdx) {
      removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
    }
  }

  function patchVnode (oldVnode, vnode, insertedVnodeQueue, removeOnly) {
    if (oldVnode === vnode) {
      return
    }

    var elm = vnode.elm = oldVnode.elm;

    if (isTrue(oldVnode.isAsyncPlaceholder)) {
      if (isDef(vnode.asyncFactory.resolved)) {
        hydrate(oldVnode.elm, vnode, insertedVnodeQueue);
      } else {
        vnode.isAsyncPlaceholder = true;
      }
      return
    }

    // reuse element for static trees.
    // note we only do this if the vnode is cloned -
    // if the new node is not cloned it means the render functions have been
    // reset by the hot-reload-api and we need to do a proper re-render.
    if (isTrue(vnode.isStatic) &&
      isTrue(oldVnode.isStatic) &&
      vnode.key === oldVnode.key &&
      (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))
    ) {
      vnode.componentInstance = oldVnode.componentInstance;
      return
    }

    var i;
    var data = vnode.data;
    if (isDef(data) && isDef(i = data.hook) && isDef(i = i.prepatch)) {
      i(oldVnode, vnode);
    }

    var oldCh = oldVnode.children;
    var ch = vnode.children;
    if (isDef(data) && isPatchable(vnode)) {
      for (i = 0; i < cbs.update.length; ++i) { cbs.update[i](oldVnode, vnode); }
      if (isDef(i = data.hook) && isDef(i = i.update)) { i(oldVnode, vnode); }
    }
    if (isUndef(vnode.text)) {
      if (isDef(oldCh) && isDef(ch)) {
        if (oldCh !== ch) { updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly); }
      } else if (isDef(ch)) {
        if (isDef(oldVnode.text)) { nodeOps.setTextContent(elm, ''); }
        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
      } else if (isDef(oldCh)) {
        removeVnodes(elm, oldCh, 0, oldCh.length - 1);
      } else if (isDef(oldVnode.text)) {
        nodeOps.setTextContent(elm, '');
      }
    } else if (oldVnode.text !== vnode.text) {
      nodeOps.setTextContent(elm, vnode.text);
    }
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.postpatch)) { i(oldVnode, vnode); }
    }
  }

  function invokeInsertHook (vnode, queue, initial) {
    // delay insert hooks for component root nodes, invoke them after the
    // element is really inserted
    if (isTrue(initial) && isDef(vnode.parent)) {
      vnode.parent.data.pendingInsert = queue;
    } else {
      for (var i = 0; i < queue.length; ++i) {
        queue[i].data.hook.insert(queue[i]);
      }
    }
  }

  var bailed = false;
  // list of modules that can skip create hook during hydration because they
  // are already rendered on the client or has no need for initialization
  var isRenderedModule = makeMap('attrs,style,class,staticClass,staticStyle,key');

  // Note: this is a browser-only function so we can assume elms are DOM nodes.
  function hydrate (elm, vnode, insertedVnodeQueue) {
    if (isTrue(vnode.isComment) && isDef(vnode.asyncFactory)) {
      vnode.elm = elm;
      vnode.isAsyncPlaceholder = true;
      return true
    }
    vnode.elm = elm;
    var tag = vnode.tag;
    var data = vnode.data;
    var children = vnode.children;
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.init)) { i(vnode, true /* hydrating */); }
      if (isDef(i = vnode.componentInstance)) {
        // child component. it should have hydrated its own tree.
        initComponent(vnode, insertedVnodeQueue);
        return true
      }
    }
    if (isDef(tag)) {
      if (isDef(children)) {
        // empty element, allow client to pick up and populate children
        if (!elm.hasChildNodes()) {
          createChildren(vnode, children, insertedVnodeQueue);
        } else {
          var childrenMatch = true;
          var childNode = elm.firstChild;
          for (var i$1 = 0; i$1 < children.length; i$1++) {
            if (!childNode || !hydrate(childNode, children[i$1], insertedVnodeQueue)) {
              childrenMatch = false;
              break
            }
            childNode = childNode.nextSibling;
          }
          // if childNode is not null, it means the actual childNodes list is
          // longer than the virtual children list.
          if (!childrenMatch || childNode) {
            if (false
            ) {
              bailed = true;
              console.warn('Parent: ', elm);
              console.warn('Mismatching childNodes vs. VNodes: ', elm.childNodes, children);
            }
            return false
          }
        }
      }
      if (isDef(data)) {
        for (var key in data) {
          if (!isRenderedModule(key)) {
            invokeCreateHooks(vnode, insertedVnodeQueue);
            break
          }
        }
      }
    } else if (elm.data !== vnode.text) {
      elm.data = vnode.text;
    }
    return true
  }

  return function patch (oldVnode, vnode, hydrating, removeOnly, parentElm, refElm) {
    if (isUndef(vnode)) {
      if (isDef(oldVnode)) { invokeDestroyHook(oldVnode); }
      return
    }

    var isInitialPatch = false;
    var insertedVnodeQueue = [];

    if (isUndef(oldVnode)) {
      // empty mount (likely as component), create new root element
      isInitialPatch = true;
      createElm(vnode, insertedVnodeQueue, parentElm, refElm);
    } else {
      var isRealElement = isDef(oldVnode.nodeType);
      if (!isRealElement && sameVnode(oldVnode, vnode)) {
        // patch existing root node
        patchVnode(oldVnode, vnode, insertedVnodeQueue, removeOnly);
      } else {
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
              return oldVnode
            } else {}
          }
          // either not server-rendered, or hydration failed.
          // create an empty node and replace it
          oldVnode = emptyNodeAt(oldVnode);
        }
        // replacing existing element
        var oldElm = oldVnode.elm;
        var parentElm$1 = nodeOps.parentNode(oldElm);
        createElm(
          vnode,
          insertedVnodeQueue,
          // extremely rare edge case: do not insert if old element is in a
          // leaving transition. Only happens when combining transition +
          // keep-alive + HOCs. (#4590)
          oldElm._leaveCb ? null : parentElm$1,
          nodeOps.nextSibling(oldElm)
        );

        if (isDef(vnode.parent)) {
          // component root element replaced.
          // update parent placeholder node element, recursively
          var ancestor = vnode.parent;
          while (ancestor) {
            ancestor.elm = vnode.elm;
            ancestor = ancestor.parent;
          }
          if (isPatchable(vnode)) {
            for (var i = 0; i < cbs.create.length; ++i) {
              cbs.create[i](emptyNode, vnode.parent);
            }
          }
        }

        if (isDef(parentElm$1)) {
          removeVnodes(parentElm$1, [oldVnode], 0, 0);
        } else if (isDef(oldVnode.tag)) {
          invokeDestroyHook(oldVnode);
        }
      }
    }

    invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
    return vnode.elm
  }
}

/*  */

// import baseModules from 'core/vdom/modules/index'
// const platformModules = []
// import platformModules from 'web/runtime/modules/index'

// the directive module should be applied last, after all
// built-in modules have been applied.
// const modules = platformModules.concat(baseModules)
var modules = [ref];

var corePatch = createPatchFunction({ nodeOps: nodeOps, modules: modules });

function patch () {
  corePatch.apply(this, arguments);
  this.$updateDataToMP();
}

function callHook$1 (vm, hook, params) {
  var handlers = vm.$options[hook];
  if (hook === 'onError' && handlers) {
    handlers = [handlers];
  } else if (hook === 'onPageNotFound' && handlers) {
    handlers = [handlers];
  }

  var ret;
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      try {
        ret = handlers[i].call(vm, params);
      } catch (e) {
        handleError(e, vm, (hook + " hook"));
      }
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }

  // for child
  if (vm.$children.length) {
    vm.$children.forEach(function (v) { return callHook$1(v, hook, params); });
  }

  return ret
}

// mpType 小程序实例的类型，可能的值是 'app', 'page'
// rootVueVM 是 vue 的根组件实例，子组件中访问 this.$root 可得
function getGlobalData (app, rootVueVM) {
  var mp = rootVueVM.$mp;
  if (app && app.globalData) {
    mp.appOptions = app.globalData.appOptions;
  }
}

// 格式化 properties 属性，并给每个属性加上 observer 方法

// properties 的 一些类型 https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/component.html
// properties: {
//   paramA: Number,
//   myProperty: { // 属性名
//     type: String, // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
//     value: '', // 属性初始值（可选），如果未指定则会根据类型选择一个
//     observer: function(newVal, oldVal, changedPath) {
//        // 属性被改变时执行的函数（可选），也可以写成在methods段中定义的方法名字符串, 如：'_propertyChange'
//        // 通常 newVal 就是新设置的数据， oldVal 是旧数据
//     }
//   },
// }

// props 的一些类型 https://cn.vuejs.org/v2/guide/components-props.html#ad
// props: {
//   // 基础的类型检查 (`null` 匹配任何类型)
//   propA: Number,
//   // 多个可能的类型
//   propB: [String, Number],
//   // 必填的字符串
//   propC: {
//     type: String,
//     required: true
//   },
//   // 带有默认值的数字
//   propD: {
//     type: Number,
//     default: 100
//   },
//   // 带有默认值的对象
//   propE: {
//     type: Object,
//     // 对象或数组且一定会从一个工厂函数返回默认值
//     default: function () {
//       return { message: 'hello' }
//     }
//   },
//   // 自定义验证函数
//   propF: {
//     validator: function (value) {
//       // 这个值必须匹配下列字符串中的一个
//       return ['success', 'warning', 'danger'].indexOf(value) !== -1
//     }
//   }
// }

// core/util/options
function normalizeProps$1 (props, res, vm) {
  if (!props) { return }
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else {}
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  }

  // fix vueProps to properties
  for (var key$1 in res) {
    if (res.hasOwnProperty(key$1)) {
      var item = res[key$1];
      if (item.default) {
        item.value = item.default;
      }
      var oldObserver = item.observer;
      item.observer = function (newVal, oldVal) {
        vm[name] = newVal;
        // 先修改值再触发原始的 observer，跟 watch 行为保持一致
        if (typeof oldObserver === 'function') {
          oldObserver.call(vm, newVal, oldVal);
        }
      };
    }
  }

  return res
}

function normalizeProperties (vm) {
  var properties = vm.$options.properties;
  var vueProps = vm.$options.props;
  var res = {};

  normalizeProps$1(properties, res, vm);
  normalizeProps$1(vueProps, res, vm);

  return res
}

/**
 * 把 properties 中的属性 proxy 到 vm 上
 */
function initMpProps (vm) {
  var mpProps = vm._mpProps = {};
  var keys = Object.keys(vm.$options.properties || {});
  keys.forEach(function (key) {
    if (!(key in vm)) {
      proxy(vm, '_mpProps', key);
      mpProps[key] = undefined; // for observe
    }
  });
  observe(mpProps, true);
}

function initMP (mpType, next) {
  var rootVueVM = this.$root;
  if (!rootVueVM.$mp) {
    rootVueVM.$mp = {};
  }

  var mp = rootVueVM.$mp;

  // Please do not register multiple Pages
  // if (mp.registered) {
  if (mp.status) {
    // 处理子组件的小程序生命周期
    if (mpType === 'app') {
      callHook$1(this, 'onLaunch', mp.appOptions);
    } else {
      callHook$1(this, 'onLoad', mp.query);
      callHook$1(this, 'onReady');
    }
    return next()
  }
  // mp.registered = true

  mp.mpType = mpType;
  mp.status = 'register';

  if (mpType === 'app') {
    global.App({
      // 页面的初始数据
      globalData: {
        appOptions: {}
      },

      handleProxy: function handleProxy (e) {
        return rootVueVM.$handleProxyWithVue(e)
      },

      // Do something initial when launch.
      onLaunch: function onLaunch (options) {
        if ( options === void 0 ) options = {};

        mp.app = this;
        mp.status = 'launch';
        this.globalData.appOptions = mp.appOptions = options;
        callHook$1(rootVueVM, 'onLaunch', options);
        next();
      },

      // Do something when app show.
      onShow: function onShow (options) {
        if ( options === void 0 ) options = {};

        mp.status = 'show';
        this.globalData.appOptions = mp.appOptions = options;
        callHook$1(rootVueVM, 'onShow', options);
      },

      // Do something when app hide.
      onHide: function onHide () {
        mp.status = 'hide';
        callHook$1(rootVueVM, 'onHide');
      },

      onError: function onError (err) {
        callHook$1(rootVueVM, 'onError', err);
      },

      onPageNotFound: function onPageNotFound (err) {
        callHook$1(rootVueVM, 'onPageNotFound', err);
      }
    });
  } else if (mpType === 'component') {
    initMpProps(rootVueVM);

    global.Component({
      // 小程序原生的组件属性
      properties: normalizeProperties(rootVueVM),
      // 页面的初始数据
      data: {
        $root: {}
      },
      methods: {
        handleProxy: function handleProxy (e) {
          return rootVueVM.$handleProxyWithVue(e)
        }
      },
      // mp lifecycle for vue
      // 组件生命周期函数，在组件实例进入页面节点树时执行，注意此时不能调用 setData
      created: function created () {
        mp.status = 'created';
        mp.page = this;
      },
      // 组件生命周期函数，在组件实例进入页面节点树时执行
      attached: function attached () {
        mp.status = 'attached';
        callHook$1(rootVueVM, 'attached');
      },
      // 组件生命周期函数，在组件布局完成后执行，此时可以获取节点信息（使用 SelectorQuery ）
      ready: function ready () {
        mp.status = 'ready';

        callHook$1(rootVueVM, 'ready');
        next();

        // 只有页面需要 setData
        rootVueVM.$nextTick(function () {
          rootVueVM._initDataToMP();
        });
      },
      // 组件生命周期函数，在组件实例被移动到节点树另一个位置时执行
      moved: function moved () {
        callHook$1(rootVueVM, 'moved');
      },
      // 组件生命周期函数，在组件实例被从页面节点树移除时执行
      detached: function detached () {
        mp.status = 'detached';
        callHook$1(rootVueVM, 'detached');
      }
    });
  } else {
    var app = global.getApp();
    global.Page({
      // 页面的初始数据
      data: {
        $root: {}
      },

      handleProxy: function handleProxy (e) {
        return rootVueVM.$handleProxyWithVue(e)
      },

      // mp lifecycle for vue
      // 生命周期函数--监听页面加载
      onLoad: function onLoad (query) {
        mp.page = this;
        mp.query = query;
        mp.status = 'load';
        getGlobalData(app, rootVueVM);
        callHook$1(rootVueVM, 'onLoad', query);
      },

      // 生命周期函数--监听页面显示
      onShow: function onShow () {
        mp.page = this;
        mp.status = 'show';
        callHook$1(rootVueVM, 'onShow');

        // 只有页面需要 setData
        rootVueVM.$nextTick(function () {
          rootVueVM._initDataToMP();
        });
      },

      // 生命周期函数--监听页面初次渲染完成
      onReady: function onReady () {
        mp.status = 'ready';

        callHook$1(rootVueVM, 'onReady');
        next();
      },

      // 生命周期函数--监听页面隐藏
      onHide: function onHide () {
        mp.status = 'hide';
        callHook$1(rootVueVM, 'onHide');
        mp.page = null;
      },

      // 生命周期函数--监听页面卸载
      onUnload: function onUnload () {
        mp.status = 'unload';
        callHook$1(rootVueVM, 'onUnload');
        mp.page = null;
      },

      // 页面相关事件处理函数--监听用户下拉动作
      onPullDownRefresh: function onPullDownRefresh () {
        callHook$1(rootVueVM, 'onPullDownRefresh');
      },

      // 页面上拉触底事件的处理函数
      onReachBottom: function onReachBottom () {
        callHook$1(rootVueVM, 'onReachBottom');
      },

      // 用户点击右上角分享
      onShareAppMessage: rootVueVM.$options.onShareAppMessage
        ? function (options) { return callHook$1(rootVueVM, 'onShareAppMessage', options); } : null,

      // Do something when page scroll
      onPageScroll: function onPageScroll (options) {
        callHook$1(rootVueVM, 'onPageScroll', options);
      },

      // 当前是 tab 页时，点击 tab 时触发
      onTabItemTap: function onTabItemTap (options) {
        callHook$1(rootVueVM, 'onTabItemTap', options);
      }
    });
  }
}

var updateDataTotal = 0; // 总共更新的数据量
function diffLog (updateData) {
  updateData = JSON.stringify(updateData);
  if (!Vue$3._mpvueTraceTimer) {
    Vue$3._mpvueTraceTimer = setTimeout(function () {
      clearTimeout(Vue$3._mpvueTraceTimer);
      updateDataTotal = (updateDataTotal / 1024).toFixed(1);
      console.log('这次操作引发500ms内数据更新量:' + updateDataTotal + 'kb');
      Vue$3._mpvueTraceTimer = 0;
      updateDataTotal = 0;
    }, 500);
  } else if (Vue$3._mpvueTraceTimer) {
    updateData = updateData.replace(/[^\u0000-\u00ff]/g, 'aa'); // 中文占2字节，中文替换成两个字母计算占用空间
    updateDataTotal += updateData.length;
  }
}

var KEY_SEP$1 = '_';

function getDeepData (keyList, viewData) {
  if (keyList.length > 1) {
    var _key = keyList.splice(0, 1);
    var _viewData = viewData[_key];
    if (_viewData) {
      return getDeepData(keyList, _viewData)
    } else {
      return null
    }
  } else {
    if (viewData[keyList[0]]) {
      return viewData[keyList[0]]
    } else {
      return null
    }
  }
}

function compareAndSetDeepData (key, newData, vm, data, forceUpdate) {
  // 比较引用类型数据
  try {
    var keyList = key.split('.');
    // page.__viewData__老版小程序不存在，使用mpvue里绑的data比对
    var oldData = getDeepData(keyList, vm.$root.$mp.page.data);
    if (oldData === null || JSON.stringify(oldData) !== JSON.stringify(newData) || forceUpdate) {
      data[key] = newData;
    } else {
      var keys = Object.keys(oldData);
      keys.forEach(function (_key) {
        var properties = Object.getOwnPropertyDescriptor(oldData, _key);
        if (!properties['get'] && !properties['set']) {
          data[key + '.' + _key] = newData[_key];
        }
      });
    }
  } catch (e) {
    console.log(e, key, newData, vm);
  }
}

function cleanKeyPath (vm) {
  if (vm.__mpKeyPath) {
    Object.keys(vm.__mpKeyPath).forEach(function (_key) {
      delete vm.__mpKeyPath[_key]['__keyPath'];
    });
  }
}

function minifyDeepData (rootKey, originKey, vmData, data, _mpValueSet, vm) {
  try {
    if (vmData instanceof Array) {
       // 数组
      compareAndSetDeepData(rootKey + '.' + originKey, vmData, vm, data, true);
    } else {
      // Object
      var _keyPathOnThis = {}; // 存储这层对象的keyPath
      if (vmData.__keyPath && !vmData.__newReference) {
        // 有更新列表 ，按照更新列表更新
        _keyPathOnThis = vmData.__keyPath;
        Object.keys(vmData).forEach(function (_key) {
          if (vmData[_key] instanceof Object) {
            // 引用类型 递归
            if (_key === '__keyPath') {
              return
            }
            minifyDeepData(rootKey + '.' + originKey, _key, vmData[_key], data, null, vm);
          } else {
            // 更新列表中的 加入data
            if (_keyPathOnThis[_key] === true) {
              if (originKey) {
                data[rootKey + '.' + originKey + '.' + _key] = vmData[_key];
              } else {
                data[rootKey + '.' + _key] = vmData[_key];
              }
            }
          }
        });
         // 根节点可能有父子引用同一个引用类型数据，依赖树都遍历完后清理
        vm['__mpKeyPath'] = vm['__mpKeyPath'] || {};
        vm['__mpKeyPath'][vmData.__ob__.dep.id] = vmData;
      } else {
        // 没有更新列表
        compareAndSetDeepData(rootKey + '.' + originKey, vmData, vm, data);
      }
      // 标记是否是通过this.Obj = {} 赋值印发的改动，解决少更新问题#1305
      def(vmData, '__newReference', false, false);
    }
  } catch (e) {
    console.log(e, rootKey, originKey, vmData, data);
  }
}

function getRootKey (vm, rootKey) {
  if (!vm.$parent.$attrs) {
    rootKey = '$root.0' + KEY_SEP$1 + rootKey;
    return rootKey
  } else {
    rootKey = vm.$parent.$attrs.mpcomid + KEY_SEP$1 + rootKey;
    return getRootKey(vm.$parent, rootKey)
  }
}

function diffData (vm, data) {
  var vmData = vm._data || {};
  var vmProps = vm._props || {};
  var rootKey = '';
  if (!vm.$attrs) {
    rootKey = '$root.0';
  } else {
    rootKey = getRootKey(vm, vm.$attrs.mpcomid);
  }
  Vue$3.nextTick(function () {
    cleanKeyPath(vm);
  });
  // console.log(rootKey)

  // 值类型变量不考虑优化，还是直接更新
  var __keyPathOnThis = vmData.__keyPath || vm.__keyPath || {};
  delete vm.__keyPath;
  delete vmData.__keyPath;
  delete vmProps.__keyPath;
  if (vm._mpValueSet === 'done') {
    // 第二次赋值才进行缩减操作
    Object.keys(vmData).forEach(function (vmDataItemKey) {
      if (vmData[vmDataItemKey] instanceof Object) {
        // 引用类型
        minifyDeepData(rootKey, vmDataItemKey, vmData[vmDataItemKey], data, vm._mpValueSet, vm);
      } else if (vmData[vmDataItemKey] !== undefined) {
        // _data上的值属性只有要更新的时候才赋值
        if (__keyPathOnThis[vmDataItemKey] === true) {
          data[rootKey + '.' + vmDataItemKey] = vmData[vmDataItemKey];
        }
      }
    });

    Object.keys(vmProps).forEach(function (vmPropsItemKey) {
      if (vmProps[vmPropsItemKey] instanceof Object) {
        // 引用类型
        minifyDeepData(rootKey, vmPropsItemKey, vmProps[vmPropsItemKey], data, vm._mpValueSet, vm);
      } else if (vmProps[vmPropsItemKey] !== undefined) {
        data[rootKey + '.' + vmPropsItemKey] = vmProps[vmPropsItemKey];
      }
      // _props上的值属性只有要更新的时候才赋值
    });

    // 检查完data和props,最后补上_mpProps & _computedWatchers
    var vmMpProps = vm._mpProps || {};
    var vmComputedWatchers = vm._computedWatchers || {};
    Object.keys(vmMpProps).forEach(function (mpItemKey) {
      data[rootKey + '.' + mpItemKey] = vm[mpItemKey];
    });
    Object.keys(vmComputedWatchers).forEach(function (computedItemKey) {
      data[rootKey + '.' + computedItemKey] = vm[computedItemKey];
    });
    // 更新的时候要删除$root.0:{},否则会覆盖原正确数据
    delete data[rootKey];
  }
  if (vm._mpValueSet === undefined) {
    // 第一次设置数据成功后，标记位置true,再更新到这个节点如果没有keyPath数组认为不需要更新
    vm._mpValueSet = 'done';
  }
  if (Vue$3.config._mpTrace) {
    // console.log('更新VM节点', vm)
    // console.log('实际传到Page.setData数据', data)
    diffLog(data);
  }
}

// 节流方法，性能优化
// 全局的命名约定，为了节省编译的包大小一律采取形象的缩写，说明如下。
// $c === $child
// $k === $comKey

// 新型的被拍平的数据结构
// {
//   $root: {
//     '1-1'{
//       // ... data
//     },
//     '1.2-1': {
//       // ... data1
//     },
//     '1.2-2': {
//       // ... data2
//     }
//   }
// }

var KEY_SEP = '_';

function getVmData (vm) {
  // 确保当前 vm 所有数据被同步
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._props || {}),
    Object.keys(vm._mpProps || {}),
    Object.keys(vm._computedWatchers || {})
  );
  return dataKeys.reduce(function (res, key) {
    res[key] = vm[key];
    return res
  }, {})
}

function getParentComKey (vm, res) {
  if ( res === void 0 ) res = [];

  var ref = vm || {};
  var $parent = ref.$parent;
  if (!$parent) { return res }
  res.unshift(getComKey($parent));
  if ($parent.$parent) {
    return getParentComKey($parent, res)
  }
  return res
}

function formatVmData (vm) {
  var $p = getParentComKey(vm).join(KEY_SEP);
  var $k = $p + ($p ? KEY_SEP : '') + getComKey(vm);

  // getVmData 这儿获取当前组件内的所有数据，包含 props、computed 的数据
  // 改动 vue.runtime 所获的的核心能力
  var data = Object.assign(getVmData(vm), { $k: $k, $kk: ("" + $k + KEY_SEP), $p: $p });
  var key = '$root.' + $k;
  var res = {};
  res[key] = data;
  return res
}

function collectVmData (vm, res) {
  if ( res === void 0 ) res = {};

  var vms = vm.$children;
  if (vms && vms.length) {
    vms.forEach(function (v) { return collectVmData(v, res); });
  }
  return Object.assign(res, formatVmData(vm))
}

/**
 * 频率控制 返回函数连续调用时，func 执行频率限定为 次 / wait
 * 自动合并 data
 *
 * @param  {function}   func      传入函数
 * @param  {number}     wait      表示时间窗口的间隔
 * @param  {object}     options   如果想忽略开始边界上的调用，传入{leading: false}。
 *                                如果想忽略结尾边界上的调用，传入{trailing: false}
 * @return {function}             返回客户调用函数
 */
function throttle (func, wait, options) {
  var context, args, result;
  var timeout = null;
  // 上次执行时间点
  var previous = 0;
  if (!options) { options = {}; }
  // 延迟执行函数
  function later () {
    // 若设定了开始边界不执行选项，上次执行时间始终为0
    previous = options.leading === false ? 0 : Date.now();
    timeout = null;
    result = func.apply(context, args);
    if (!timeout) { context = args = null; }
  }
  return function (handle, data) {
    var now = Date.now();
    // 首次执行时，如果设定了开始边界不执行选项，将上次执行时间设定为当前时间。
    if (!previous && options.leading === false) { previous = now; }
    // 延迟执行时间间隔
    var remaining = wait - (now - previous);
    context = this;
    args = args ? [handle, Object.assign(args[1], data)] : [handle, data];
    // 延迟时间间隔remaining小于等于0，表示上次执行至此所间隔时间已经超过一个时间窗口
    // remaining大于时间窗口wait，表示客户端系统时间被调整过
    if (remaining <= 0 || remaining > wait) {
      clearTimeout(timeout);
      timeout = null;
      previous = now;
      result = func.apply(context, args);
      if (!timeout) { context = args = null; }
    // 如果延迟执行不存在，且没有设定结尾边界不执行选项
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
    return result
  }
}

// 优化频繁的 setData: https://mp.weixin.qq.com/debug/wxadoc/dev/framework/performance/tips.html
var throttleSetData = throttle(function (handle, data) {
  handle(data);
}, 50);

function getPage (vm) {
  var rootVueVM = vm.$root;
  var ref = rootVueVM.$mp || {};
  var mpType = ref.mpType; if ( mpType === void 0 ) mpType = '';
  var page = ref.page;

  // 优化后台态页面进行 setData: https://mp.weixin.qq.com/debug/wxadoc/dev/framework/performance/tips.html
  if (mpType === 'app' || !page || typeof page.setData !== 'function') {
    return
  }
  return page
}

// 优化js变量动态变化时候引起全量更新
// 优化每次 setData 都传递大量新数据
function updateDataToMP () {
  var page = getPage(this);
  if (!page) {
    return
  }

  var data = formatVmData(this);
  diffData(this, data);
  throttleSetData(page.setData.bind(page), data);
}

function initDataToMP () {
  var page = getPage(this);
  if (!page) {
    return
  }

  var data = collectVmData(this.$root);
  page.setData(data);
}

// 虚拟dom的compid与真实dom的comkey匹配，多层嵌套的先补齐虚拟dom的compid直到完全匹配为止
function isVmKeyMatchedCompkey (k, comkey) {
  if (!k || !comkey) {
    return false
  }
  // 完全匹配 comkey = '1_0_1', k = '1_0_1'
  // 部分匹配 comkey = '1_0_10_1', k = '1_0_10'
  // k + KEY_SEP防止k = '1_0_1'误匹配comkey = '1_0_10_1'
  return comkey === k || comkey.indexOf(k + KEY_SEP$2) === 0
}

function getVM (vm, comkeys) {
  if ( comkeys === void 0 ) comkeys = [];

  var keys = comkeys.slice(1);
  if (!keys.length) { return vm }

  // bugfix #1375: 虚拟dom的compid和真实dom的comkey在组件嵌套时匹配出错，comid会丢失前缀，需要从父节点补充
  var comkey = keys.join(KEY_SEP$2);
  var comidPrefix = '';
  return keys.reduce(function (res, key) {
    var len = res.$children.length;
    for (var i = 0; i < len; i++) {
      var v = res.$children[i];
      var k = getComKey(v);
      if (comidPrefix) {
        k = comidPrefix + KEY_SEP$2 + k;
      }
      // 找到匹配的父节点
      if (isVmKeyMatchedCompkey(k, comkey)) {
        comidPrefix = k;
        res = v;
        return res
      }
    }
    return res
  }, vm)
}

function getHandle (vnode, eventid, eventTypes) {
  if ( eventTypes === void 0 ) eventTypes = [];

  var res = [];
  if (!vnode || !vnode.tag) {
    return res
  }

  var ref = vnode || {};
  var data = ref.data; if ( data === void 0 ) data = {};
  var children = ref.children; if ( children === void 0 ) children = [];
  var componentInstance = ref.componentInstance;
  if (componentInstance) {
    // 增加 slot 情况的处理
    // Object.values 会多增加几行编译后的代码
    Object.keys(componentInstance.$slots).forEach(function (slotKey) {
      var slot = componentInstance.$slots[slotKey];
      var slots = Array.isArray(slot) ? slot : [slot];
      slots.forEach(function (node) {
        res = res.concat(getHandle(node, eventid, eventTypes));
      });
    });
  } else {
    // 避免遍历超出当前组件的 vm
    children.forEach(function (node) {
      res = res.concat(getHandle(node, eventid, eventTypes));
    });
  }

  var attrs = data.attrs;
  var on = data.on;
  if (attrs && on && attrs['eventid'] === eventid) {
    eventTypes.forEach(function (et) {
      var h = on[et];
      if (typeof h === 'function') {
        res.push(h);
      } else if (Array.isArray(h)) {
        res = res.concat(h);
      }
    });
    return res
  }

  return res
}

function getWebEventByMP (e) {
  var type = e.type;
  var timeStamp = e.timeStamp;
  var touches = e.touches;
  var detail = e.detail; if ( detail === void 0 ) detail = {};
  var target = e.target; if ( target === void 0 ) target = {};
  var currentTarget = e.currentTarget; if ( currentTarget === void 0 ) currentTarget = {};
  var x = detail.x;
  var y = detail.y;
  var event = {
    mp: e,
    type: type,
    timeStamp: timeStamp,
    x: x,
    y: y,
    target: Object.assign({}, target, detail),
    currentTarget: currentTarget,
    stopPropagation: noop,
    preventDefault: noop
  };

  if (touches && touches.length) {
    Object.assign(event, touches[0]);
    event.touches = touches;
  }
  return event
}

var KEY_SEP$2 = '_';
function handleProxyWithVue (e) {
  var rootVueVM = this.$root;
  var type = e.type;
  var target = e.target; if ( target === void 0 ) target = {};
  var currentTarget = e.currentTarget;
  var ref = currentTarget || target;
  var dataset = ref.dataset; if ( dataset === void 0 ) dataset = {};
  var comkey = dataset.comkey; if ( comkey === void 0 ) comkey = '';
  var eventid = dataset.eventid;
  var vm = getVM(rootVueVM, comkey.split(KEY_SEP$2));

  if (!vm) {
    return
  }

  var webEventTypes = eventTypeMap[type] || [type];
  var handles = getHandle(vm._vnode, eventid, webEventTypes);

  // TODO, enevt 还需要处理更多
  // https://developer.mozilla.org/zh-CN/docs/Web/API/Event
  if (handles.length) {
    var event = getWebEventByMP(e);
    if (handles.length === 1) {
      var result = handles[0](event);
      return result
    }
    handles.forEach(function (h) { return h(event); });
  }
}

// for platforms
// import config from 'core/config'
// install platform specific utils
Vue$3.config.mustUseProp = mustUseProp;
Vue$3.config.isReservedTag = isReservedTag;
Vue$3.config.isReservedAttr = isReservedAttr;
Vue$3.config.getTagNamespace = getTagNamespace;
Vue$3.config.isUnknownElement = isUnknownElement;

// install platform patch function
Vue$3.prototype.__patch__ = patch;

// public mount method
Vue$3.prototype.$mount = function (el, hydrating) {
  var this$1 = this;

  // el = el && inBrowser ? query(el) : undefined
  // return mountComponent(this, el, hydrating)

  // 初始化小程序生命周期相关
  var options = this.$options;

  if (options && (options.render || options.mpType)) {
    var mpType = options.mpType; if ( mpType === void 0 ) mpType = 'page';
    return this._initMP(mpType, function () {
      return mountComponent(this$1, undefined, undefined)
    })
  } else {
    return mountComponent(this, undefined, undefined)
  }
};

// for mp
Vue$3.prototype._initMP = initMP;

Vue$3.prototype.$updateDataToMP = updateDataToMP;
Vue$3.prototype._initDataToMP = initDataToMP;

Vue$3.prototype.$handleProxyWithVue = handleProxyWithVue;

/*  */

return Vue$3;

})));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 2 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// this module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate
    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 3 */,
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {var sa={},nativeIsArray=Array.isArray,ObjProto=Object.prototype,ArrayProto=Array.prototype,nativeForEach=ArrayProto.forEach,nativeIndexOf=ArrayProto.indexOf,toString=ObjProto.toString,hasOwnProperty=ObjProto.hasOwnProperty,slice=ArrayProto.slice,each=function(e,t,a){if(null==e)return!1;var r={};if(nativeForEach&&e.forEach===nativeForEach)e.forEach(t,a);else if(e.length===+e.length){for(var i=0,s=e.length;i<s;i++)if(i in e&&t.call(a,e[i],i,e)===r)return!1}else for(var n in e)if(hasOwnProperty.call(e,n)&&t.call(a,e[n],n,e)===r)return!1};function isObject(e){return null!=e&&"[object Object]"==toString.call(e)}var getRandomBasic=function(){var e=(new Date).getTime();return function(t){return Math.ceil((e=(9301*e+49297)%233280)/233280*t)}}();function getRandom(){if("function"==typeof Uint32Array){var e="";if("undefined"!=typeof crypto?e=crypto:"undefined"!=typeof msCrypto&&(e=msCrypto),isObject(e)&&e.getRandomValues){var t=new Uint32Array(1);return e.getRandomValues(t)[0]/Math.pow(2,32)}}return getRandomBasic(1e19)/1e19}function extend(e){return each(slice.call(arguments,1),function(t){for(var a in t)void 0!==t[a]&&(e[a]=t[a])}),e}function extend2Lev(e){return each(slice.call(arguments,1),function(t){for(var a in t)void 0!==t[a]&&null!==t[a]&&(isObject(t[a])&&isObject(e[a])?extend(e[a],t[a]):e[a]=t[a])}),e}function coverExtend(e){return each(slice.call(arguments,1),function(t){for(var a in t)void 0!==t[a]&&void 0===e[a]&&(e[a]=t[a])}),e}var isArray=nativeIsArray||function(e){return"[object Array]"===toString.call(e)};function isFunction(e){if(!e)return!1;var t=Object.prototype.toString.call(e);return"[object Function]"==t||"[object AsyncFunction]"==t}function isArguments(e){return!(!e||!hasOwnProperty.call(e,"callee"))}function toArray(e){return e?e.toArray?e.toArray():isArray(e)?slice.call(e):isArguments(e)?slice.call(e):values(e):[]}function values(e){var t=[];return null==e?t:(each(e,function(e){t[t.length]=e}),t)}function include(e,t){var a=!1;return null==e?a:nativeIndexOf&&e.indexOf===nativeIndexOf?-1!=e.indexOf(t):(each(e,function(e){if(a||(a=e===t))return{}}),a)}function trim(e){return e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"")}function isEmptyObject(e){if(isObject(e)){for(var t in e)if(hasOwnProperty.call(e,t))return!1;return!0}return!1}function deepCopy(e){var t={};return function e(t,a){for(var r in a){var i=a[r];isArray(i)?(t[r]=[],e(t[r],i)):isObject(i)?(t[r]={},e(t[r],i)):t[r]=i}}(t,e),t}function isUndefined(e){return void 0===e}function isString(e){return"[object String]"==toString.call(e)}function isDate(e){return"[object Date]"==toString.call(e)}function isBoolean(e){return"[object Boolean]"==toString.call(e)}function isNumber(e){return"[object Number]"==toString.call(e)&&/[\d\.]+/.test(String(e))}function isJSONString(e){try{JSON.parse(e)}catch(e){return!1}return!0}var isInteger=Number.isInteger||function(e){return"number"==typeof e&&isFinite(e)&&Math.floor(e)===e},isSafeInteger=Number.isSafeInteger||function(e){return isInteger(e)&&Math.abs(e)<=Math.pow(2,53)-1},_={each:each,isObject:isObject,getRandomBasic:getRandomBasic,getRandom:getRandom,extend:extend,extend2Lev:extend2Lev,coverExtend:coverExtend,isArray:isArray,isFunction:isFunction,isArguments:isArguments,toArray:toArray,values:values,include:include,trim:trim,isEmptyObject:isEmptyObject,deepCopy:deepCopy,isUndefined:isUndefined,isString:isString,isDate:isDate,isBoolean:isBoolean,isNumber:isNumber,isJSONString:isJSONString,isInteger:isInteger,isSafeInteger:isSafeInteger,slice:slice},kit={};function encodeTrackData(e){e=JSON.stringify(e);var t=sa._.base64Encode(e);return encodeURIComponent(t)}function setPublicProperties(e){if(e&&e.properties){var t=sa._.getRefPage(),a=sa._.getCurrentPageInfo(),r={$referrer:t.route,$referrer_title:t.title,$title:a.title,$url:a.url};for(var i in!0===sa.para.preset_properties.url_path&&(r.$url_path=a.path),r)e.properties.hasOwnProperty(i)||(e.properties[i]=r[i])}}kit.buildData=function(e,t){var a={distinct_id:sa.store.getDistinctId(),identities:sa.store._state.identities,lib:{$lib:sa.lib_name,$lib_method:"code",$lib_version:sa.lib_version},properties:{}};return"track_id_unbind"===e.type&&"$UnbindID"===e.event&&(a.identities=_.deepCopy(e.unbind_value),delete e.unbind_value),_.isObject(t)||(t={}),_.extend(a,sa.store.getUnionId(),e),_.isObject(e.properties)&&!_.isEmptyObject(e.properties)&&_.extend(a.properties,e.properties),e.type&&"profile"===e.type.slice(0,7)||(a._track_id=Number(String(getRandom()).slice(2,5)+String(getRandom()).slice(2,4)+String(Date.now()).slice(-4)),a.properties=_.extend({},_.info.properties,sa.store.getProps(),_.info.currentProps,t,a.properties),"track"===e.type&&(a.properties.$is_first_day=_.getIsFirstDay()),setPublicProperties(a)),a.properties.$time&&_.isDate(a.properties.$time)?(a.time=1*a.properties.$time,delete a.properties.$time):a.time=1*new Date,sa.ee.sdk.emit("createData",a),_.parseSuperProperties(a.properties),_.searchObjDate(a),_.searchObjString(a),a},kit.processData=function(e){return e},kit.onceTrackData=function(e){return"data="+encodeTrackData(e)},kit.batchTrackData=function(e){var t=Date.now();return e.forEach(function(e){e._flush_time=t}),"data_list="+encodeTrackData(e)},kit.onEventSend=function(){return{}};var mergeStorageData={getData:function(e){wx.getStorage({key:sa.para.storage_prepare_data_key,complete:function(t){var a=t.data&&sa._.isArray(t.data)?t.data:[];mergeStorageData.deleteAesData(a),e&&e()}})},deleteAesData:function(e){var t=[],a=e.length;if(a>0){for(var r=0;r<a;r++)sa._.isObject(e[r])&&t.push(e[r]);sa.store.mem.mdata=t.concat(sa.store.mem.mdata)}}},sendStrategy={dataHasSend:!0,dataHasChange:!1,syncStorage:!1,failTime:0,init:function(){mergeStorageData.getData(sendStrategy.syncStorageState),sendStrategy.batchInterval()},syncStorageState:function(){sendStrategy.syncStorage=!0},onAppHide:function(){sa.para.batch_send&&this.batchSend()},send:function(e){this.dataHasChange=!0,sa.store.mem.getLength()>=500&&(sa._.logger.info("\u6570\u636e\u91cf\u5b58\u50a8\u8fc7\u5927\uff0c\u6709\u5f02\u5e38"),sa.store.mem.mdata.shift()),(e=kit.processData(e))&&sa.store.mem.add(e),sa.store.mem.getLength()>=sa.para.batch_send.max_length&&this.batchSend()},wxrequest:function(e){if(sa._.isArray(e.data)&&e.data.length>0){var t=kit.batchTrackData(e.data);sa._.wxrequest({url:sa.para.server_url,method:"POST",dataType:"text",data:t,success:function(){e.success(e.len)},fail:function(){e.fail()}})}else e.success(e.len)},batchSend:function(){if(this.dataHasSend){var e,t,a=sa.store.mem.mdata;(t=(e=a.length>=100?a.slice(0,100):a).length)>0&&(this.dataHasSend=!1,this.wxrequest({data:e,len:t,success:this.batchRemove.bind(this),fail:this.sendFail.bind(this)}))}},sendFail:function(){this.dataHasSend=!0,this.failTime++},batchRemove:function(e){sa.store.mem.clear(e),this.dataHasSend=!0,this.dataHasChange=!0,this.batchWrite(),this.failTime=0},is_first_batch_write:!0,batchWrite:function(){var e=this;this.dataHasChange&&(this.is_first_batch_write&&(this.is_first_batch_write=!1,setTimeout(function(){e.batchSend()},1e3)),this.dataHasChange=!1,this.syncStorage&&sa._.setStorageSync(sa.para.storage_prepare_data_key,sa.store.mem.mdata))},batchInterval:function(){var e=this;!function t(){setTimeout(function(){e.batchWrite(),t()},500)}(),function t(){setTimeout(function(){e.batchSend(),t()},sa.para.batch_send.send_timeout*Math.pow(2,e.failTime))}()}};function getSendUrl(e,t){var a=kit.onceTrackData(t);return-1!==e.indexOf("?")?e+"&"+a:e+"?"+a}function onceSend(e){e._flush_time=Date.now();var t=getSendUrl(sa.para.server_url,e);sa._.wxrequest({url:t,method:"GET"})}var saEvent={send:function(e,t){if(!sa.para.server_url)return sa._.logger.info("error: server_url \u4e0d\u80fd\u4e3a\u7a7a"),!1;if(sa.current_scene&&1154===sa.current_scene&&!sa.para.preset_events.moments_page)return!1;var a=sa._.deepCopy(e),r=sa.kit.onEventSend(a),i=sa.kit.buildData(e,r);i?(saEvent.debug(i),sa.events.emit("send",i),sa.para.batch_send?sendStrategy.send(i):onceSend(i)):sa._.logger.info("error: \u6570\u636e\u5f02\u5e38 "+i)},debug:function(e){sa._.logger.info(e)}},meta={init_status:!1,life_state:{app_launched:!1},plugin:{init_list:[],uninitialized_list:[]},privacy:{enable_data_collect:!1},mp_hook:{data:1,onLoad:1,onShow:1,onReady:1,onPullDownRefresh:1,onShareAppMessage:1,onShareTimeline:1,onReachBottom:1,onPageScroll:1,onResize:1,onTabItemTap:1,onHide:1,onUnload:1},user:{LOGIN_ID_KEY:"$identity_login_id"}};sa.popupEmitter={attached:function(){return!1}};var usePlugin=function(e,t){if(e&&e.info&&"miniprogram_abtesting"===e.info.lib_plugin_name)return"function"==typeof e.init&&e.init(sa,t),!1;if(meta.init_status)"function"==typeof e.init&&e.init(sa,t);else{var a={target:e,para:t};meta.plugin.uninitialized_list.push(a)}},checkPluginInitStatus=function(){if(meta.plugin.uninitialized_list.length>0){for(var e in meta.plugin.uninitialized_list){var t=meta.plugin.uninitialized_list[e];t&&t.target&&"function"==typeof t.target.init&&t.target.init(sa,t.para)}meta.plugin.uninitialized_list=[]}};function checkPrivacyStatus(){var e;return global&&global.sensors_data_pre_config&&(e=!!global.sensors_data_pre_config.is_compliance_enabled&&global.sensors_data_pre_config.is_compliance_enabled),!e||(!!meta.init_status||!!meta.privacy.enable_data_collect)}function enableDataCollect(){meta.privacy.enable_data_collect=!0}function initAppProxy(){var e=App;App=function(t){t[sa.para.name]=sa,e.apply(this,arguments)},monitorApp()}function monitorApp(){wx.onAppShow(function(e){if(!meta.life_state.app_launched){var t=wx.getLaunchOptionsSync()||{};sa.autoTrackCustom.appLaunch(t)}sa.autoTrackCustom.appShow(e)}),wx.onAppHide(function(){sa.autoTrackCustom.appHide()})}function checkAppLaunch(){if(!meta.life_state.app_launched){var e=wx.getLaunchOptionsSync()||{};sa.autoTrackCustom.appLaunch(e)}}function mpProxy(e,t,a){var r=sa.autoTrackCustom[a];if(e[t]){var i=e[t];e[t]=function(){!sa.para.autoTrackIsFirst||isObject(sa.para.autoTrackIsFirst)&&!sa.para.autoTrackIsFirst[a]?(i.apply(this,arguments),r.apply(this,arguments)):(!0===sa.para.autoTrackIsFirst||isObject(sa.para.autoTrackIsFirst)&&sa.para.autoTrackIsFirst[a])&&(r.apply(this,arguments),i.apply(this,arguments))}}else e[t]=function(){r.apply(this,arguments)}}function clickTrack(e){var t,a={},r={},i=e.currentTarget||{},s=e.target||{};if(isObject(sa.para.framework)&&isObject(sa.para.framework.taro)&&!sa.para.framework.taro.createApp&&s.id&&i.id&&s.id!==i.id)return!1;var n=i.dataset||{};if(t=e.type,a.$element_id=i.id,a.$element_type=n.type,a.$element_content=n.content,a.$element_name=n.name,isObject(e.event_prop)&&(r=e.event_prop),t&&isClick(t)){if(sa.para.preset_events&&sa.para.preset_events.collect_element&&!1===sa.para.preset_events.collect_element(arguments[0]))return!1;a.$url_path=sa._.getCurrentPath(),sa._.setPageRefData(a),a=sa._.extend(a,r),sa.track("$MPClick",a)}}function clickProxy(e,t){var a=e[t];e[t]=function(){var e=a.apply(this,arguments),t=arguments[0];return isObject(t)&&(sa.para.preset_events.defer_track?setTimeout(function(){clickTrack(t)},0):clickTrack(t)),e}}function isClick(e){return!!{tap:1,longpress:1,longtap:1}[e]}function tabProxy(e){var t=e.onTabItemTap;e.onTabItemTap=function(e){t&&t.apply(this,arguments);var a={};e&&(a.$element_content=e.text),a.$element_type="tabBar",a.$url_path=sa._.getCurrentPath(),sa._.setPageRefData(a),sa.track("$MPClick",a)}}function getMethods(e){var t=meta.mp_hook,a=[];for(var r in e)"function"!=typeof e[r]||t[r]||a.push(r);return a}function pageLeaveProxy(e){var t=e.onHide;e.onHide=function(){t&&t.apply(this,arguments),sa._.sendPageLeave()};var a=e.onUnload;e.onUnload=function(){a&&a.apply(this,arguments),sa._.sendPageLeave()}}function initPageProxy(){var e=Page;Page=function(t){try{t||(t={}),monitorClick(t),monitorHooks(t),e.apply(this,arguments)}catch(t){e.apply(this,arguments)}};var t=Component;Component=function(e){try{e||(e={}),e.methods||(e.methods={}),monitorClick(e.methods),monitorHooks(e.methods),t.apply(this,arguments)}catch(e){t.apply(this,arguments)}}}function monitorClick(e){var t=[];if(sa.para.autoTrack&&sa.para.autoTrack.mpClick){t=getMethods(e),tabProxy(e);for(var a=t.length,r=0;r<a;r++)clickProxy(e,t[r])}}function monitorHooks(e){sa.para.autoTrack&&sa.para.autoTrack.pageLeave&&pageLeaveProxy(e),mpProxy(e,"onLoad","pageLoad"),mpProxy(e,"onShow","pageShow"),mpProxy(e,"onAddToFavorites","pageAddFavorites"),"function"==typeof e.onShareAppMessage&&sa.autoTrackCustom.pageShare(e),"function"==typeof e.onShareTimeline&&sa.autoTrackCustom.pageShareTimeline(e)}function isValidListener(e){return"function"==typeof e||!(!e||"object"!=typeof e)&&isValidListener(e.listener)}function EventEmitter(){this._events={}}function isNewLoginId(e,t){return e!==sa.store._state.history_login_id.name||sa.store._state.history_login_id.value!==t}function isSameAndAnonymousID(e){var t=sa.store.getFirstId(),a=sa.store.getDistinctId();return t?e===t:e===a}function isPresetIdKeys(e,t){var a=["$identity_anonymous_id","$mp_openid","$identity_mp_openid","$identity_mp_unionid","$mp_unionid"];for(var r of(isArray(t)&&(a=a.concat(t)),a))if(r===e)return!0;return!1}EventEmitter.prototype.on=function(e,t){if(!e||!t)return!1;if(!isValidListener(t))throw new Error("listener must be a function");this._events[e]=this._events[e]||[];var a="object"==typeof t;return this._events[e].push(a?t:{listener:t,once:!1}),this},EventEmitter.prototype.prepend=function(e,t){if(!e||!t)return!1;if(!isValidListener(t))throw new Error("listener must be a function");this._events[e]=this._events[e]||[];var a="object"==typeof t;return this._events[e].unshift(a?t:{listener:t,once:!1}),this},EventEmitter.prototype.prependOnce=function(e,t){return this.prepend(e,{listener:t,once:!0})},EventEmitter.prototype.once=function(e,t){return this.on(e,{listener:t,once:!0})},EventEmitter.prototype.off=function(e,t){var a=this._events[e];if(!a)return!1;if("number"==typeof t)a.splice(t,1);else if("function"==typeof t)for(var r=0,i=a.length;r<i;r++)a[r]&&a[r].listener===t&&a.splice(r,1);return this},EventEmitter.prototype.emit=function(e,t){var a=this._events[e];if(!a)return!1;for(var r=0;r<a.length;r++){var i=a[r];i&&(i.listener.call(this,t||{}),i.once&&this.off(e,r))}return this},EventEmitter.prototype.removeAllListeners=function(e){e&&this._events[e]?this._events[e]=[]:this._events={}},EventEmitter.prototype.listeners=function(e){return e&&"string"==typeof e?this._events[e]:this._events},sa.kit=kit,sa.mergeStorageData=mergeStorageData,sa.saEvent=saEvent,sa.sendStrategy=sendStrategy,sa._=_,sa.ee={},sa.ee.sdk=new EventEmitter,sa.IDENTITY_KEY={EMAIL:"$identity_email",MOBILE:"$identity_mobile"},sa.usePlugin=usePlugin,sa.checkPluginInitStatus=checkPluginInitStatus,sa.enableDataCollect=enableDataCollect,sa.para={name:"sensors",server_url:"",send_timeout:1e3,show_log:!1,login_id_key:"$identity_login_id",allow_amend_share_path:!0,max_string_length:500,datasend_timeout:3e3,source_channel:[],autoTrack:{appLaunch:!0,appShow:!0,appHide:!0,pageShow:!0,pageShare:!0,mpClick:!1,mpFavorite:!0,pageLeave:!1},autotrack_exclude_page:{pageShow:[],pageLeave:[]},is_persistent_save:{share:!1,utm:!1},preset_properties:{url_path:!0},preset_events:{moments_page:!1,defer_track:!1,share_info_use_string:!1},batch_send:!0,storage_store_key:"sensorsdata2015_wechat",storage_prepare_data_key:"sensors_mp_prepare_data"};var logger="object"==typeof logger?logger:{};logger.info=function(){if(sa.para.show_log&&"object"==typeof console&&console.log)try{if(3===arguments.length)return console.log(arguments[0],arguments[1],arguments[2]);if(2===arguments.length)return console.log(arguments[0],arguments[1]);if(1===arguments.length)return console.log(arguments[0])}catch(e){console.log(arguments[0])}},_.logger=logger,sa.setPara=function(e){sa.para=_.extend2Lev(sa.para,e);var t=[];if(_.isArray(sa.para.source_channel))for(var a=sa.para.source_channel.length,r=0;r<a;r++)-1===" utm_source utm_medium utm_campaign utm_content utm_term sa_utm ".indexOf(" "+sa.para.source_channel[r]+" ")&&t.push(sa.para.source_channel[r]);sa.para.source_channel=t,_.isObject(sa.para.register)&&_.extend(_.info.properties,sa.para.register),sa.para.openid_url||(sa.para.openid_url=sa.para.server_url.replace(/([^\/])\/(sa)(\.gif){0,1}/,"$1/mp_login")),"number"!=typeof sa.para.send_timeout&&(sa.para.send_timeout=1e3);var i={send_timeout:6e3,max_length:6};e&&e.datasend_timeout||sa.para.batch_send&&(sa.para.datasend_timeout=1e4),!0===sa.para.batch_send?sa.para.batch_send=_.extend({},i):_.isObject(sa.para.batch_send)&&(sa.para.batch_send=_.extend({},i,sa.para.batch_send));var s={share:!1,utm:!1};!0===sa.para.is_persistent_save?(sa.para.is_persistent_save=_.extend({},s),sa.para.is_persistent_save.utm=!0):_.isObject(sa.para.is_persistent_save)&&(sa.para.is_persistent_save=_.extend({},s,sa.para.is_persistent_save)),sa.para.server_url?(sa.para.preset_properties=_.isObject(sa.para.preset_properties)?sa.para.preset_properties:{},_.isObject(sa.para.autotrack_exclude_page)||(sa.para.autotrack_exclude_page={pageShow:[],pageLeave:[]}),_.isArray(sa.para.autotrack_exclude_page.pageShow)||(sa.para.autotrack_exclude_page.pageShow=[]),_.isArray(sa.para.autotrack_exclude_page.pageLeave)||(sa.para.autotrack_exclude_page.pageLeave=[])):logger.info("\u8bf7\u4f7f\u7528 setPara() \u65b9\u6cd5\u8bbe\u7f6e server_url \u6570\u636e\u63a5\u6536\u5730\u5740,\u8be6\u60c5\u53ef\u67e5\u770bhttps://www.sensorsdata.cn/manual/mp_sdk_new.html#112-%E5%BC%95%E5%85%A5%E5%B9%B6%E9%85%8D%E7%BD%AE%E5%8F%82%E6%95%B0")},sa.getServerUrl=function(){return sa.para.server_url};var LIB_VERSION="1.17.11",LIB_NAME="MiniProgram",source_channel_standard="utm_source utm_medium utm_campaign utm_content utm_term",latest_source_channel=["$latest_utm_source","$latest_utm_medium","$latest_utm_campaign","$latest_utm_content","$latest_utm_term","$latest_sa_utm"],latest_share_info=["$latest_share_distinct_id","$latest_share_url_path","$latest_share_depth","$latest_share_method"],share_info_key=["sensors_share_d","sensors_share_p","sensors_share_i","sensors_share_m"],page_show_time=Date.now(),mpshow_time=null,query_share_depth=0,share_distinct_id="",share_method="",current_scene="",is_first_launch=!1,wxSDKVersion="";sa.lib_version=LIB_VERSION,sa.lib_name=LIB_NAME;var globalTitle={},page_route_map=[];_.decodeURIComponent=function(e){var t="";try{t=decodeURIComponent(e)}catch(a){t=e}return t},_.encodeDates=function(e){return _.each(e,function(t,a){_.isDate(t)?e[a]=_.formatDate(t):_.isObject(t)&&(e[a]=_.encodeDates(t))}),e},_.formatDate=function(e){function t(e){return e<10?"0"+e:e}return e.getFullYear()+"-"+t(e.getMonth()+1)+"-"+t(e.getDate())+" "+t(e.getHours())+":"+t(e.getMinutes())+":"+t(e.getSeconds())+"."+t(e.getMilliseconds())},_.searchObjDate=function(e){_.isObject(e)&&_.each(e,function(t,a){_.isObject(t)?_.searchObjDate(e[a]):_.isDate(t)&&(e[a]=_.formatDate(t))})},_.formatString=function(e){return e.length>sa.para.max_string_length?(logger.info("\u5b57\u7b26\u4e32\u957f\u5ea6\u8d85\u8fc7\u9650\u5236\uff0c\u5df2\u7ecf\u505a\u622a\u53d6--"+e),e.slice(0,sa.para.max_string_length)):e},_.searchObjString=function(e){_.isObject(e)&&_.each(e,function(t,a){_.isObject(t)?_.searchObjString(e[a]):_.isString(t)&&(e[a]=_.formatString(t))})},_.parseSuperProperties=function(e){_.isObject(e)&&(_.each(e,function(t,a){if(_.isFunction(t))try{e[a]=t(),_.isFunction(e[a])&&(logger.info("\u60a8\u7684\u5c5e\u6027- "+a+" \u683c\u5f0f\u4e0d\u6ee1\u8db3\u8981\u6c42\uff0c\u6211\u4eec\u5df2\u7ecf\u5c06\u5176\u5220\u9664"),delete e[a])}catch(t){delete e[a],logger.info("\u60a8\u7684\u5c5e\u6027- "+a+" \u629b\u51fa\u4e86\u5f02\u5e38\uff0c\u6211\u4eec\u5df2\u7ecf\u5c06\u5176\u5220\u9664")}}),_.strip_sa_properties(e))},_.unique=function(e){for(var t,a=[],r={},i=0;i<e.length;i++)(t=e[i])in r||(r[t]=!0,a.push(t));return a},_.check={checkKeyword:function(e){return/^((?!^distinct_id$|^original_id$|^device_id$|^time$|^properties$|^id$|^first_id$|^second_id$|^users$|^events$|^event$|^user_id$|^date$|^datetime$|^user_group|^user_tag)[a-zA-Z_$][a-zA-Z\d_$]{0,99})$/i.test(e)},ckeckIdLength:function(e){return!(String(e).length>255)||(logger.info("id \u957f\u5ea6\u8d85\u8fc7 255 \u4e2a\u5b57\u7b26\uff01"),!1)}},_.strip_sa_properties=function(e){return _.isObject(e)?(_.each(e,function(t,a){if(_.isArray(t)){var r=[];_.each(t,function(e){_.isString(e)?r.push(e):logger.info("\u60a8\u7684\u6570\u636e-",t,"\u7684\u6570\u7ec4\u91cc\u7684\u503c\u5fc5\u987b\u662f\u5b57\u7b26\u4e32,\u5df2\u7ecf\u5c06\u5176\u5220\u9664")}),e[a]=r}_.isString(t)||_.isNumber(t)||_.isDate(t)||_.isBoolean(t)||_.isArray(t)||(logger.info("\u60a8\u7684\u6570\u636e - "+a+":"+t+" - \u683c\u5f0f\u4e0d\u6ee1\u8db3\u8981\u6c42\uff0c\u5df2\u7ecf\u5c06\u5176\u5220\u9664"),delete e[a])}),e):e},_.strip_empty_properties=function(e){var t={};return _.each(e,function(e,a){null!=e&&(t[a]=e)}),t},_.utf8Encode=function(e){var t,a,r,i,s="";for(t=a=0,r=(e=(e+"").replace(/\r\n/g,"\n").replace(/\r/g,"\n")).length,i=0;i<r;i++){var n=e.charCodeAt(i),o=null;n<128?a++:o=n>127&&n<2048?String.fromCharCode(n>>6|192,63&n|128):String.fromCharCode(n>>12|224,n>>6&63|128,63&n|128),null!==o&&(a>t&&(s+=e.substring(t,a)),s+=o,t=a=i+1)}return a>t&&(s+=e.substring(t,e.length)),s},_.base64Encode=function(e){var t,a,r,i,s,n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",o=0,u=0,c="",p=[];if(!e)return e;e=_.utf8Encode(e);do{t=(s=e.charCodeAt(o++)<<16|e.charCodeAt(o++)<<8|e.charCodeAt(o++))>>18&63,a=s>>12&63,r=s>>6&63,i=63&s,p[u++]=n.charAt(t)+n.charAt(a)+n.charAt(r)+n.charAt(i)}while(o<e.length);switch(c=p.join(""),e.length%3){case 1:c=c.slice(0,-2)+"==";break;case 2:c=c.slice(0,-1)+"="}return c},_.urlSafeBase64=function(){var e={"+":"-","/":"_","=":"."},t={"-":"+",_:"/",".":"="};return{encode:function(t){return t.replace(/[+\/=]/g,function(t){return e[t]})},decode:function(e){return e.replace(/[-_.]/g,function(e){return t[e]})},trim:function(e){return e.replace(/[.=]{1,2}$/,"")},isBase64:function(e){return/^[A-Za-z0-9+\/]*[=]{0,2}$/.test(e)},isUrlSafeBase64:function(e){return/^[A-Za-z0-9_-]*[.]{0,2}$/.test(e)}}}(),_.btoa=function(e){for(var t,a,r,i,s="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",n="",o=0,_=(e=String(e)).length%3;o<e.length;)((a=e.charCodeAt(o++))>255||(r=e.charCodeAt(o++))>255||(i=e.charCodeAt(o++))>255)&&logger.info("Failed to execute 'btoa' : The string to be encoded contains characters outside of the Latin1 range."),n+=s.charAt((t=a<<16|r<<8|i)>>18&63)+s.charAt(t>>12&63)+s.charAt(t>>6&63)+s.charAt(63&t);return _?n.slice(0,_-3)+"===".substring(_):n},_.urlBase64Encode=function(e){return _.btoa(encodeURIComponent(e).replace(/%([0-9A-F]{2})/g,function(e,t){return String.fromCharCode("0x"+t)}))},_.rot13obfs=function(e,t){t="number"==typeof t?t:13;for(var a=(e=String(e)).split(""),r=0,i=a.length;r<i;r++){a[r].charCodeAt(0)<126&&(a[r]=String.fromCharCode((a[r].charCodeAt(0)+t)%126))}return a.join("")},_.rot13defs=function(e){return e=String(e),_.rot13obfs(e,113)},_.getCurrentPage=function(){var e={};try{var t=getCurrentPages();e=t[t.length-1]}catch(e){logger.info(e)}return e},_.getCurrentPath=function(){var e="\u672a\u53d6\u5230";try{var t=_.getCurrentPage();e=t?t.route:e}catch(e){logger.info(e)}return e},_.getIsFirstDay=function(){return"object"==typeof sa.store._state&&"number"==typeof sa.store._state.first_visit_day_time&&sa.store._state.first_visit_day_time>(new Date).getTime()},_.getCurrentUrl=function(e){var t=_.getCurrentPath(),a="";return _.isObject(e)&&e.sensors_mp_encode_url_query&&(a=e.sensors_mp_encode_url_query),t?a?t+"?"+a:t:"\u672a\u53d6\u5230"},_.getPath=function(e){return e="string"==typeof e?e.replace(/^\//,""):"\u53d6\u503c\u5f02\u5e38"},sa.initialState={queue:[],isComplete:!1,systemIsComplete:!1,storeIsComplete:!1,checkIsComplete:function(){this.systemIsComplete&&this.storeIsComplete&&(this.isComplete=!0,this.queue.length>0&&(_.each(this.queue,function(e){"appLaunch"===e[0]?sa.autoTrackCustom.appLaunch.apply(sa.autoTrackCustom,_.slice.call(e[1])):sa[e[0]].apply(sa,_.slice.call(e[1]))}),this.queue=[]))}},_.getCustomUtmFromQuery=function(e,t,a,r){if(!_.isObject(e))return{};var i={};if(e.sa_utm)for(var s in e)"sa_utm"!==s?_.include(sa.para.source_channel,s)&&(i[a+s]=e[s]):i[r+s]=e[s];else for(var s in e)-1===(" "+source_channel_standard+" ").indexOf(" "+s+" ")?_.include(sa.para.source_channel,s)&&(i[a+s]=e[s]):i[t+s]=e[s];return i},_.getObjFromQuery=function(e){var t=e.split("?"),a=[],r={};return t&&t[1]?(_.each(t[1].split("&"),function(e){(a=e.split("="))[0]&&a[1]&&(r[a[0]]=a[1])}),r):{}},_.setStorageSync=function(e,t){var a=function(){wx.setStorageSync(e,t)};try{a()}catch(e){logger.info("set Storage fail --",e);try{a()}catch(e){logger.info("set Storage fail again --",e)}}},_.getStorageSync=function(e){var t="";try{t=wx.getStorageSync(e)}catch(a){try{t=wx.getStorageSync(e)}catch(e){logger.info("getStorage fail")}}return t},_.getMPScene=function(e){return"number"==typeof e||"string"==typeof e&&""!==e?e="wx-"+String(e):"\u672a\u53d6\u5230\u503c"},_.objToParam=function(e,t){if("[object Object]"!==Object.prototype.toString.call(e))return logger.info("\u8bf7\u4f20\u5165\u6709\u6548\u5bf9\u8c61"),"";var a=[];for(var r in e)if(e.hasOwnProperty(r)){var i=e[r];void 0===i?a.push(r+"="):(i=t?encodeURIComponent(i):i,a.push(r+"="+i))}return a.join("&")},_.delObjectKey=function(e){if("[object Object]"===Object.prototype.toString.call(e))for(var t=0;t<share_info_key.length;t++)delete e[share_info_key[t]];else logger.info("\u8bf7\u4f20\u5165\u6709\u6548\u5bf9\u8c61")},_.shareInfoData=function(e){var t={},a={};if(sa.para.preset_events.share_info_use_string){a=e.query;for(var r=0;r<share_info_key.length;r++){if(!a.hasOwnProperty(share_info_key[r]))return{};a[share_info_key[r]]=_.decodeURIComponent(a[share_info_key[r]])}t={depth:Number(a.sensors_share_d),path:a.sensors_share_p||"",id:a.sensors_share_i||"",method:a.sensors_share_m||""}}else{if(!e.query.sampshare)return{};if(a=_.decodeURIComponent(e.query.sampshare),!_.isJSONString(a))return{};t={depth:(a=JSON.parse(a)).d,path:a.p,id:a.i,method:a.m}}return t},_.setShareInfo=function(e,t){var a={},r={},i=sa.store.getDistinctId(),s=sa.store.getFirstId();if(e&&_.isObject(e.query)){if(a=_.shareInfoData(e),_.isEmptyObject(a))return{};var n=a.depth,o=a.path,u=a.id,c=a.method}"string"==typeof u?(t.$share_distinct_id=u,share_distinct_id=u,r.$latest_share_distinct_id=u):t.$share_distinct_id="\u53d6\u503c\u5f02\u5e38","number"==typeof n?!share_distinct_id||share_distinct_id!==i&&share_distinct_id!==s?!share_distinct_id||share_distinct_id===i&&share_distinct_id===s?t.$share_depth="-1":(t.$share_depth=n+1,query_share_depth=n+1,r.$latest_share_depth=n+1):(t.$share_depth=n,query_share_depth=n,r.$latest_share_depth=n):t.$share_depth="-1","string"==typeof o?(t.$share_url_path=o,r.$latest_share_url_path=o):t.$share_url_path="\u53d6\u503c\u5f02\u5e38","string"==typeof c?(t.$share_method=c,r.$latest_share_method=c):t.$share_method="\u53d6\u503c\u5f02\u5e38",_.setLatestShare(r)},_.getShareInfo=function(){if(sa.para.preset_events.share_info_use_string){var e={sensors_share_i:sa.store.getDistinctId()||"\u53d6\u503c\u5f02\u5e38",sensors_share_p:_.getCurrentPath(),sensors_share_d:query_share_depth,sensors_share_m:share_method};return _.objToParam(e,!0)}var t=JSON.stringify({i:sa.store.getDistinctId()||"\u53d6\u503c\u5f02\u5e38",p:_.getCurrentPath(),d:query_share_depth,m:share_method});return"sampshare="+encodeURIComponent(t)},_.detectOptionQuery=function(e){if(!e||!_.isObject(e.query))return{};var t,a,r,i,s={};return s.query=_.extend({},e.query),"string"==typeof s.query.scene&&(t=s.query,a=["utm_source","utm_content","utm_medium","utm_campaign","utm_term","sa_utm"].concat(sa.para.source_channel),r=new RegExp("("+a.join("|")+")%3D","i"),1===(i=Object.keys(t)).length&&"scene"===i[0]&&r.test(t.scene))&&(s.scene=s.query.scene,delete s.query.scene),e.query.q&&e.query.scancode_time&&"101"===String(e.scene).slice(0,3)&&(s.q=String(s.query.q),delete s.query.q,delete s.query.scancode_time),s},_.getMixedQuery=function(e){var t=_.detectOptionQuery(e),a=t.scene,r=t.q,i=t.query;for(var s in i)i[s]=_.decodeURIComponent(i[s]);return a&&(a=-1!==(a=_.decodeURIComponent(a)).indexOf("?")?"?"+a.replace(/\?/g,""):"?"+a,_.extend(i,_.getObjFromQuery(a))),r&&_.extend(i,_.getObjFromQuery(_.decodeURIComponent(r))),i},_.setUtm=function(e,t){var a={},r=_.getMixedQuery(e),i=_.getCustomUtmFromQuery(r,"$","_","$"),s=_.getCustomUtmFromQuery(r,"$latest_","_latest_","$latest_");return a.pre1=i,a.pre2=s,_.extend(t,i),a},_.setSfSource=function(e,t){!_.isEmptyObject(e.query)&&e.query._sfs&&(t.$sf_source=e.query._sfs,sa.registerApp({$latest_sf_source:t.$sf_source}))},_.setPageSfSource=function(e){try{var t=_.getCurrentPage(),a=t?t.options:"",r=_.deepCopy(a);for(var i in r)r[i]=_.decodeURIComponent(r[i]);!_.isEmptyObject(r)&&r._sfs&&(e.$sf_source=r._sfs)}catch(e){logger.info(e)}};try{var oldSetNavigationBarTitle=wx.setNavigationBarTitle;Object.defineProperty(wx,"setNavigationBarTitle",{get:function(){return function(e){var t=_.getCurrentPath();e=_.isObject(e)?e:{},globalTitle[t]=e.title,oldSetNavigationBarTitle.call(this,e)}}})}catch(e){logger.info(e)}_.setRefPage=function(){var e={route:"\u76f4\u63a5\u6253\u5f00",path:"\u76f4\u63a5\u6253\u5f00",title:""};try{var t=_.getCurrentPage();if(t&&t.route){var a=t.sensors_mp_url_query?"?"+t.sensors_mp_url_query:"",r=t.route,i=_.getPageTitle(r);e.route=r+a,e.path=r,e.title=i,page_route_map.length>=2?(page_route_map.shift(),page_route_map.push(e)):page_route_map.push(e)}}catch(e){logger.info(e)}},_.getRefPage=function(){var e={route:"\u76f4\u63a5\u6253\u5f00",path:"\u76f4\u63a5\u6253\u5f00",title:""};return page_route_map.length>1&&(e.title=page_route_map[0].title,e.route=page_route_map[0].route,e.path=page_route_map[0].path),e},_.getCurrentPageInfo=function(){var e=_.getCurrentPage(),t={title:"",url:"",path:"\u672a\u53d6\u5230"};if(e&&e.route){var a=e.sensors_mp_url_query?"?"+e.sensors_mp_url_query:"";t.title=_.getPageTitle(e.route),t.url=e.route+a,t.path=e.route}return t},_.setPageRefData=function(e,t,a){var r=_.getRefPage();_.isObject(e)&&(t?page_route_map.length>0&&t?(a=a?"?"+a:"",e.$referrer=_.getPath(t)+a,e.$referrer_title=_.getPageTitle(t)):(e.$referrer="\u76f4\u63a5\u6253\u5f00",e.$referrer_title=""):(e.$referrer=r.route,e.$referrer_title=r.title))},_.getPageTitle=function(e){if("\u672a\u53d6\u5230"===e||!e)return"";var t="";try{if(__wxConfig){var a=__wxConfig,r=__wxConfig.page||{},i=r[e]||r[e+".html"],s={},n={};if(a.global&&a.global.window&&a.global.window.navigationBarTitleText&&(s.titleVal=a.global.window.navigationBarTitleText),i&&i.window&&i.window.navigationBarTitleText&&(n.titleVal=i.window.navigationBarTitleText),!n.titleVal&&__wxAppCode__){var o=__wxAppCode__[e+".json"];o&&o.navigationBarTitleText&&(n.titleVal=o.navigationBarTitleText)}if(_.each(globalTitle,function(a,r){if(r===e)return t=a}),0===t.length){var u=_.extend(s,n);t=u.titleVal||""}}}catch(e){logger.info(e)}return t},_.wxrequest=function(e){if(_.compareSDKVersion(wxSDKVersion,"2.10.0")>=0)e.timeout=sa.para.datasend_timeout,wx.request(e);else{var t=wx.request(e);setTimeout(function(){_.isObject(t)&&_.isFunction(t.abort)&&t.abort()},sa.para.datasend_timeout)}},_.getAppInfoSync=function(){if(wx.getAccountInfoSync){var e=wx.getAccountInfoSync(),t=e&&e.miniProgram?e.miniProgram:{};return{appId:t.appId,appEnv:t.envVersion,appVersion:t.version}}return{}},_.getAppId=function(){var e=_.getAppInfoSync();return e&&e.appId?e.appId:""},_.validId=function(e){return"string"!=typeof e&&"number"!=typeof e||""===e?(logger.info("\u8f93\u5165 ID \u7c7b\u578b\u9519\u8bef"),!1):"number"!=typeof e||(e=String(e),/^\d+$/.test(e))?!!_.check.ckeckIdLength(e)&&e:(logger.info("\u8f93\u5165 ID \u7c7b\u578b\u9519\u8bef"),!1)},_.compareSDKVersion=function(e,t){e=e.split("."),t=t.split(".");for(var a=Math.max(e.length,t.length);e.length<a;)e.push("0");for(;t.length<a;)t.push("0");for(var r=0;r<a;r++){var i=parseInt(e[r]),s=parseInt(t[r]);if(i>s)return 1;if(i<s)return-1}return 0},_.setUpperCase=function(e){return _.isString(e)?e.toLocaleUpperCase():e},_.getOpenidNameByAppid=function(){var e=_.getAppId(),t="$identity_mp_openid";return e&&(t="$identity_mp_"+e+"_openid"),t},_.info={currentProps:{},properties:{$lib:LIB_NAME,$lib_version:String(LIB_VERSION)},getSystem:function(){var e=this.properties;function t(){wx.getSystemInfo({success:function(t){var a,r;e.$brand=_.setUpperCase(t.brand),e.$manufacturer=t.brand,e.$model=t.model,e.$screen_width=Number(t.screenWidth),e.$screen_height=Number(t.screenHeight),e.$os=(a=t.platform,"ios"===(r=a.toLowerCase())?"iOS":"android"===r?"Android":a),e.$os_version=t.system.indexOf(" ")>-1?t.system.split(" ")[1]:t.system,wxSDKVersion=t.SDKVersion,e.$mp_client_app_version=t.version,e.$mp_client_basic_library_version=wxSDKVersion},complete:function(){var t=(new Date).getTimezoneOffset(),a=_.getAppInfoSync();_.isNumber(t)&&(e.$timezone_offset=t),a.appId&&(e.$app_id=a.appId),a.appVersion&&(e.$app_version=a.appVersion),sa.initialState.systemIsComplete=!0,sa.initialState.checkIsComplete()}})}wx.getNetworkType({success:function(t){e.$network_type=_.setUpperCase(t.networkType)},complete:t})}},_.eventEmitter=function(){this.sub=[]},_.eventEmitter.prototype={add:function(e){this.sub.push(e)},emit:function(e,t){this.sub.forEach(function(a){a.on(e,t)})}},_.eventSub=function(e){sa.events.add(this),this._events=[],this.handle=e,this.ready=!1},_.eventSub.prototype={on:function(e,t){if(this.ready){if(_.isFunction(this.handle))try{this.handle(e,t)}catch(e){logger.info(e)}}else this._events.push({event:e,data:t})},isReady:function(){var e=this;e.ready=!0,e._events.forEach(function(t){if(_.isFunction(e.handle))try{e.handle(t.event,t.data)}catch(e){logger.info(e)}})}},sa.eventSub=_.eventSub,sa.events=new _.eventEmitter,sa.store={storageInfo:null,store_queue:[],getUUID:function(){return Date.now()+"-"+Math.floor(1e7*getRandom())+"-"+getRandom().toString(16).replace(".","")+"-"+String(31242*getRandom()).replace(".","").slice(0,8)},getStorage:function(){return this.storageInfo?this.storageInfo:(this.storageInfo=sa._.getStorageSync(sa.para.storage_store_key)||"",this.storageInfo)},_state:{},mem:{mdata:[],getLength:function(){return this.mdata.length},add:function(e){this.mdata.push(e)},clear:function(e){this.mdata.splice(0,e)}},toState:function(e){var t=null;_.isJSONString(e)?(t=JSON.parse(e)).distinct_id?this._state=t:this.set("distinct_id",this.getUUID()):_.isObject(e)&&(t=e).distinct_id?this._state=t:this.set("distinct_id",this.getUUID());var a=this._state._first_id||this._state.first_id,r=this._state._distinct_id||this._state.distinct_id,i=this._state.openid,s=(this._state.history_login_id?this._state.history_login_id:{}).name;if(this._state.identities&&_.isString(this._state.identities)){var n=JSON.parse(_.rot13defs(this._state.identities));this._state.identities=n}var o,u,c=_.getOpenidNameByAppid();if(this._state.identities&&_.isObject(this._state.identities)&&!_.isEmptyObject(this._state.identities)){var p=(o=_.getAppId(),u="$mp_openid",o&&(u="$mp_"+o+"_openid"),u);this._state.identities.hasOwnProperty("$mp_id")&&(this._state.identities.$identity_mp_id=this._state.identities.$mp_id,delete this._state.identities.$mp_id),this._state.identities.hasOwnProperty("$mp_unionid")&&(this._state.identities.$identity_mp_unionid=this._state.identities.$mp_unionid,delete this._state.identities.$mp_unionid),this._state.identities.hasOwnProperty(p)&&(this._state.identities[c]=this._state.identities[p],delete this._state.identities[p]),this._state.identities.hasOwnProperty("$identity_anonymous_id")&&(this._state.identities.$identity_anonymous_id=a||r)}else this._state.identities={},this._state.identities.$identity_mp_id=this.getUUID(),this._state.identities.$identity_anonymous_id=a||r;if(i&&(this._state.identities[c]=i),a)if(s&&this._state.identities.hasOwnProperty(s)){if(this._state.identities[s]!==r){for(var d in this._state.identities[s]=r,this._state.identities)this._state.identities.hasOwnProperty(d)&&"$identity_mp_id"!==d&&d!==s&&delete this._state.identities[d];this._state.history_login_id.value=r}}else{for(var d in this._state.identities[meta.user.LOGIN_ID_KEY]=r,this._state.identities)this._state.identities.hasOwnProperty(d)&&"$identity_mp_id"!==d&&d!==meta.user.LOGIN_ID_KEY&&delete this._state.identities[d];this._state.history_login_id={name:meta.user.LOGIN_ID_KEY,value:r}}else{if(this._state.identities.hasOwnProperty("$identity_login_id")||this._state.identities.hasOwnProperty(s))for(var d in this._state.identities)this._state.identities.hasOwnProperty(d)&&"$identity_mp_id"!==d&&"$identity_anonymous_id"!==d&&delete this._state.identities[d];this._state.history_login_id={name:"",value:""}}this.save()},getFirstId:function(){return this._state._first_id||this._state.first_id},getDistinctId:function(){var e=this.getLoginDistinctId();return e||(this._state._distinct_id||this._state.distinct_id)},getUnionId:function(){var e={},t=this._state._first_id||this._state.first_id,a=this.getDistinctId();return t&&a?(e.login_id=a,e.anonymous_id=t):e.anonymous_id=a,e},getHistoryLoginId:function(){return isObject(this._state.history_login_id)?this._state.history_login_id:null},getLoginDistinctId:function(){var e=this.getHistoryLoginId();return isObject(e)&&e.value?e.name!==meta.user.LOGIN_ID_KEY?e.name+"+"+e.value:e.value:null},getProps:function(){return this._state.props||{}},setProps:function(e,t){var a=this._state.props||{};t?this.set("props",e):(_.extend(a,e),this.set("props",a))},set:function(e,t){var a={};for(var r in"string"==typeof e?a[e]=t:"object"==typeof e&&(a=e),this._state=this._state||{},a)this._state[r]=a[r],"first_id"===r?delete this._state._first_id:"distinct_id"===r&&(delete this._state._distinct_id,sa.events.emit("changeDistinctId"));this.save()},identitiesSet:function(e){var t={};switch(e.type){case"login":t.$identity_mp_id=sa.store._state.identities.$identity_mp_id,t[e.id_name]=e.id;break;case"logout":t.$identity_mp_id=sa.store._state.identities.$identity_mp_id;break;case"identify":(t=_.deepCopy(sa.store._state.identities)).$identity_anonymous_id=e.id}sa.store.set("identities",t)},change:function(e,t){this._state["_"+e]=t},encryptStorage:function(){var e=this.getStorage(),t="data:enc;";_.isObject(e)?e=t+_.rot13obfs(JSON.stringify(e)):_.isString(e)&&-1===e.indexOf(t)&&(e=t+_.rot13obfs(e)),sa._.setStorageSync(sa.para.storage_store_key,e)},save:function(){var e=_.deepCopy(this._state),t=_.rot13obfs(JSON.stringify(e.identities));if(e.identities=t,delete e._first_id,delete e._distinct_id,sa.para.encrypt_storage){e="data:enc;"+_.rot13obfs(JSON.stringify(e))}sa._.setStorageSync(sa.para.storage_store_key,e)},init:function(){var e=this.getStorage();if(e)_.isString(e)&&-1!==e.indexOf("data:enc;")&&(e=e.substring("data:enc;".length),e=JSON.parse(_.rot13defs(e))),this.toState(e);else{is_first_launch=!0;var t=new Date,a=t.getTime();t.setHours(23),t.setMinutes(59),t.setSeconds(60),sa.setOnceProfile({$first_visit_time:new Date}),this.set({distinct_id:this.getUUID(),first_visit_time:a,first_visit_day_time:t.getTime(),identities:{$identity_mp_id:this.getUUID()},history_login_id:{name:"",value:""}})}sa.store.checkStoreInit()},checkStoreInit:function(){meta.init_status&&(this.store_queue.length>0&&_.each(this.store_queue,function(e){sa[e.method].apply(sa,_.slice.call(e.params))}),this.store_queue=[])}},sa.setProfile=function(e,t){sa.saEvent.send({type:"profile_set",properties:e},t)},sa.setOnceProfile=function(e,t){sa.saEvent.send({type:"profile_set_once",properties:e},t)},sa.appendProfile=function(e,t){if(!_.isObject(e))return!1;_.each(e,function(t,a){_.isString(t)?e[a]=[t]:(delete e[a],logger.info("appendProfile\u5c5e\u6027\u7684\u503c\u5fc5\u987b\u662f\u5b57\u7b26\u4e32\u6216\u8005\u6570\u7ec4"))}),sa.saEvent.send({type:"profile_append",properties:e},t)},sa.incrementProfile=function(e,t){if(!_.isObject(e))return!1;var a=e;_.isString(e)&&((e={})[a]=1),sa.saEvent.send({type:"profile_increment",properties:e},t)},sa.track=function(e,t,a){this.saEvent.send({type:"track",event:e,properties:t},a)},sa.identify=function(e,t){if(!checkPrivacyStatus())return!1;if(!meta.init_status)return sa.store.store_queue.push({method:"identify",params:arguments}),!1;if(e=_.validId(e)){var a=sa.store.getFirstId();!0===t?a?sa.store.set("first_id",e):sa.store.set("distinct_id",e):a?sa.store.change("first_id",e):sa.store.change("distinct_id",e),sa.store.identitiesSet({type:"identify",id:e})}},sa.trackSignup=function(e,t,a,r){var i,s,n,o;isObject(e)?(i=e.id,s=e.event_name,n=e.id_name):(i=e,s=t),sa.store.set("distinct_id",i),o=n&&n!==meta.user.LOGIN_ID_KEY?n+"+"+i:i;var _=sa.store.getFirstId()||sa.store.getDistinctId();sa.saEvent.send({original_id:_,distinct_id:o,login_id:o,type:"track_signup",event:s,properties:a},r)},sa.registerApp=function(e){_.isObject(e)&&!_.isEmptyObject(e)&&(_.info.currentProps=_.extend(_.info.currentProps,e))},sa.register=function(e){_.isObject(e)&&!_.isEmptyObject(e)&&sa.store.setProps(e)},sa.clearAllRegister=function(){sa.store.setProps({},!0)},sa.clearAllProps=function(e){var t=sa.store.getProps(),a={};_.isArray(e)&&(_.each(t,function(t,r){_.include(e,r)||(a[r]=t)}),sa.store.setProps(a,!0))},sa.clearAppRegister=function(e){_.isArray(e)&&_.each(_.info.currentProps,function(t,a){_.include(e,a)&&delete _.info.currentProps[a]})},_.setLatestChannel=function(e){_.isEmptyObject(e)||(function(e,t){var a=!1;for(var r in t)e[t[r]]&&(a=!0);return a}(e,latest_source_channel)&&(sa.clearAppRegister(latest_source_channel),sa.clearAllProps(latest_source_channel)),sa.para.is_persistent_save.utm?sa.register(e):sa.registerApp(e))},_.setLatestShare=function(e){(e.$latest_share_depth||e.$latest_share_distinct_id||e.$latest_share_url_path||e.$latest_share_method)&&(sa.clearAppRegister(latest_share_info),sa.clearAllProps(latest_share_info),sa.para.is_persistent_save.share?sa.register(e):sa.registerApp(e))},sa.login=function(e){if(!(e=_.validId(e)))return!1;if(isSameAndAnonymousID(e))return!1;var t=sa.store.getFirstId(),a=sa.store.getDistinctId(),r=meta.user.LOGIN_ID_KEY;isNewLoginId(r,e)&&(sa.store._state.identities[r]=e,sa.store.set("history_login_id",{name:r,value:e}),t?sa.trackSignup({id:e,event_name:"$SignUp"}):(sa.store.set("first_id",a),sa.trackSignup({id:e,event_name:"$SignUp"})),sa.store.identitiesSet({type:"login",id:e,id_name:r}))},sa.loginWithKey=function(e,t){if(!_.isString(e))return logger.info("Key must be String"),!1;if(!_.check.checkKeyword(e)&&e.length>100)a="Key ["+e+"] is invalid",logger.info(a);else if(!_.check.checkKeyword(e))return a="Key ["+e+"] is invalid",logger.info(a),!1;if(isPresetIdKeys(e,["$mp_id","$identity_mp_id"])){var a="Key ["+e+"] is invalid";return logger.info(a),!1}if(!(t=_.validId(t)))return!1;if(isSameAndAnonymousID(t))return!1;var r=sa.store.getFirstId(),i=sa.store.getDistinctId();isNewLoginId(e,t)&&(sa.store._state.identities[e]=t,sa.store.set("history_login_id",{name:e,value:t}),r?sa.trackSignup({id:t,event_name:"$SignUp",id_name:e}):(sa.store.set("first_id",i),sa.trackSignup({id:t,event_name:"$SignUp",id_name:e})),sa.store.identitiesSet({type:"login",id:t,id_name:e}))},sa.getAnonymousID=function(){if(!_.isEmptyObject(sa.store._state))return sa.store._state._first_id||sa.store._state.first_id||sa.store._state._distinct_id||sa.store._state.distinct_id;logger.info("\u8bf7\u5148\u521d\u59cb\u5316SDK")},sa.getIdentities=function(){return _.isEmptyObject(sa.store._state)?(logger.info("\u8bf7\u5148\u521d\u59cb\u5316SDK"),null):sa.store._state.identities||null},sa.logout=function(e){var t=sa.store.getFirstId();sa.store.identitiesSet({type:"logout"}),sa.store.set("history_login_id",{name:"",value:""}),t?(sa.store.set("first_id",""),!0===e?sa.store.set("distinct_id",sa.store.getUUID()):sa.store.set("distinct_id",t)):logger.info("\u6ca1\u6709first_id\uff0clogout\u5931\u8d25")},sa.openid={getRequest:function(e){wx.login({success:function(t){t.code&&sa.para.appid&&sa.para.openid_url?_.wxrequest({url:sa.para.openid_url+"&code="+t.code+"&appid="+sa.para.appid,method:"GET",complete:function(t){_.isObject(t)&&_.isObject(t.data)&&t.data.openid?e(t.data.openid):e()}}):e()}})},getWXStorage:function(){var e=sa.store.getStorage();if(e&&_.isObject(e))return e.openid},getOpenid:function(e){if(!sa.para.appid)return e(),!1;var t=this.getWXStorage();t?e(t):this.getRequest(e)}},sa.init=function(e){if(!0===meta.init_status)return!1;meta.init_status=!0,e&&_.isObject(e)&&sa.setPara(e),sa.store.init(),sa._.info.getSystem(),sa.checkPluginInitStatus(),sa.para.batch_send&&sendStrategy.init(),sa.initialState.storeIsComplete=!0,sa.initialState.checkIsComplete(),checkAppLaunch()},sa.getPresetProperties=function(){if(_.info&&_.info.properties&&_.info.properties.$lib){var e={};_.each(_.info.currentProps,function(t,a){0===a.indexOf("$")&&(e[a]=t)});var t={$url_path:_.getCurrentPath(),$is_first_day:_.getIsFirstDay(),$is_first_time:is_first_launch},a=_.extend(e,t,_.info.properties,sa.store.getProps());return delete a.$lib,a}return{}},sa.setOpenid=function(e,t){if(!(e=_.validId(e)))return!1;if(!checkPrivacyStatus())return!1;if(!meta.init_status)return sa.store.store_queue.push({method:"setOpenid",params:arguments}),!1;t&&console.log("%c \u5f53\u524d\u7248\u672c setOpenid \u63a5\u53e3 \u5df2\u4e0d\u652f\u6301\u4f20\u5165\u7b2c\u4e8c\u4e2a\u53c2\u6570","color:#F39C12;font-size: 14px;"),sa.store.set("openid",e),sa.identify(e,!0);var a=_.getOpenidNameByAppid();sa.store._state.identities[a]=e,sa.store.save()},sa.unsetOpenid=function(e){var t=_.validId(e);if(!t)return!1;sa.store._state.openid===t&&sa.store.set("openid","");var a=_.getOpenidNameByAppid();sa.store._state.identities.hasOwnProperty(a)&&t===sa.store._state.identities[a]&&(delete sa.store._state.identities[a],sa.store.save())},sa.setUnionid=function(e){var t=_.validId(e);t&&(sa.store._state.identities.$identity_mp_unionid=t,sa.store.save())},sa.unsetUnionid=function(e){var t=_.validId(e);if(t&&sa.store._state.identities.hasOwnProperty("$identity_mp_unionid")&&t===sa.store._state.identities.$identity_mp_unionid){var a=_.getOpenidNameByAppid();sa.store._state.identities.hasOwnProperty(a)&&(delete sa.store._state.identities[a],delete sa.store._state.openid,sa.store.save()),delete sa.store._state.identities.$identity_mp_unionid,sa.store.save()}},sa.initWithOpenid=function(e,t){(e=e||{}).appid&&(sa.para.appid=e.appid),sa.openid.getOpenid(function(a){a&&sa.setOpenid(a,e.isCoverLogin),t&&_.isFunction(t)&&t(a),sa.init(e)})},sa.bind=function(e,t){if(_.isNumber(t)){if(_.isInteger(t)&&!1===_.isSafeInteger(t))return logger.info("Value must be String"),!1;t=String(t)}if(!_.isString(e))return logger.info("Key must be String"),!1;var a=sa.store.getHistoryLoginId(),r=a?a.name:"";if(!_.check.checkKeyword(e)||isPresetIdKeys(e,[meta.user.LOGIN_ID_KEY,r,"$mp_id","$identity_mp_id"])){var i="Key ["+e+"] is invalid";return logger.info(i),!1}if(!t||""===t)return logger.info("Value is empty or null"),!1;if(!_.isString(t))return logger.info("Value must be String"),!1;if(!_.check.ckeckIdLength(t)){i="Value ["+t+"] is beyond the maximum length 255";return logger.info(i),!1}sa.store._state.identities[e]=t,sa.store.save(),sa.saEvent.send({type:"track_id_bind",event:"$BindID"})},sa.unbind=function(e,t){if(_.isNumber(t)){if(_.isInteger(t)&&!1===_.isSafeInteger(t))return logger.info("Value must be String"),!1;t=String(t)}if(!_.isString(e))return logger.info("Key must be String"),!1;if(!_.check.checkKeyword(e)||isPresetIdKeys(e,[meta.user.LOGIN_ID_KEY])){var a="Key ["+e+"] is invalid";return logger.info(a),!1}if(!t||""===t)return logger.info("Value is empty or null"),!1;if(!_.isString(t))return logger.info("Value must be String"),!1;if(!_.check.ckeckIdLength(t)){a="Value ["+t+"] is beyond the maximum length 255";return logger.info(a),!1}sa.store._state.identities.hasOwnProperty(e)&&t===sa.store._state.identities[e]&&("$mp_id"!==e&&"$identity_mp_id"!==e&&delete sa.store._state.identities[e],sa.store.save());var r=sa.store.getDistinctId(),i=sa.store.getFirstId();r===e+"+"+t&&(sa.store.set("first_id",""),sa.store.set("distinct_id",i),sa.store.set("history_login_id",{name:"",value:""}));var s={};s[e]=t,sa.saEvent.send({type:"track_id_unbind",event:"$UnbindID",unbind_value:s})},sa.setWebViewUrl=function(e,t){if(!_.isString(e)||""===e)return logger.info("error:\u8bf7\u4f20\u5165\u6b63\u786e\u7684 URL \u683c\u5f0f"),!1;if(!/^http(s)?:\/\//.test(e))return logger.info("warning: \u8bf7\u4f20\u5165\u6b63\u786e\u7684 URL \u683c\u5f0f"),!1;var a=/([^?#]+)(\?[^#]*)?(#.*)?/.exec(e);if(!a)return!1;var r,i=a[1]||"",s=a[2]||"",n=a[3]||"",o="",u=sa.store.getDistinctId()||"",c=sa.store.getFirstId()||"";_.urlSafeBase64&&_.urlSafeBase64.encode?u=u?_.urlSafeBase64.trim(_.urlSafeBase64.encode(_.urlBase64Encode(u))):"":this._.rot13obfs&&(u=u?_.rot13obfs(u):""),u=encodeURIComponent(u);var p=c?"f"+u:"d"+u;t?(r=n.indexOf("_sasdk"),o=n.indexOf("?")>-1?r>-1?i+s+"#"+n.substring(1,r)+"_sasdk="+p:i+s+"#"+n.substring(1)+"&_sasdk="+p:i+s+"#"+n.substring(1)+"?_sasdk="+p):(r=s.indexOf("_sasdk"),o=/^\?(\w)+/.test(s)?r>-1?i+s.replace(/(_sasdk=)([^&]*)/gi,"_sasdk="+p)+n:i+"?"+s.substring(1)+"&_sasdk="+p+n:i+"?"+s.substring(1)+"_sasdk="+p+n);return o},_.each(["setProfile","setOnceProfile","track","quick","incrementProfile","appendProfile","login","logout","registerApp","register","clearAllRegister","clearAllProps","clearAppRegister","bind","unbind","unsetOpenid","setUnionid","unsetUnionid"],function(e){var t=sa[e];sa[e]=function(){if(!checkPrivacyStatus())return!1;sa.initialState.isComplete?t.apply(sa,arguments):sa.initialState.queue.push([e,arguments])}}),_.setQuery=function(e,t){if(e&&_.isObject(e)&&!_.isEmptyObject(e)){var a=[];return _.each(e,function(e,r){"q"===r&&_.isString(e)&&0===e.indexOf("http")||(t?a.push(r+"="+e):a.push(r+"="+_.decodeURIComponent(e)))}),a.join("&")}return""},_.getUtmFromPage=function(){var e={};try{var t=_.getCurrentPage(),a=_.deepCopy(t.options);for(var r in a)a[r]=_.decodeURIComponent(a[r]);e=_.getCustomUtmFromQuery(a,"$","_","$")}catch(e){logger.info(e)}return e},_.sendPageLeave=function(){var e={},t="";try{t=(e=_.getCurrentPage())?e.route:""}catch(e){logger.info(e)}if(page_show_time>=0&&""!==t){var a={},r=_.getPageTitle(t),i=(Date.now()-page_show_time)/1e3;(isNaN(i)||i<0)&&(i=0),a.$url_query=e.sensors_mp_url_query?e.sensors_mp_url_query:"",a.$url_path=t,a.$title=r,a.event_duration=i,-1===sa.para.autotrack_exclude_page.pageLeave.indexOf(t)&&sa.track("$MPPageLeave",a),page_show_time=-1}},sa.autoTrackCustom={trackCustom:function(e,t,a){var r=sa.para.autoTrack[e],i="";sa.para.autoTrack&&r&&("function"==typeof r?(i=r(),_.isObject(i)&&_.extend(t,i)):_.isObject(r)&&(_.extend(t,r),sa.para.autoTrack[e]=!0),sa.track(a,t))},appLaunch:function(e,t){if("object"!=typeof this||this.trackCustom||(this[sa.para.name]=sa),!checkPrivacyStatus())return!1;if(!sa.initialState.isComplete)return sa.initialState.queue.push(["appLaunch",arguments]),meta.life_state.app_launched=!0,!1;meta.life_state.app_launched=!0;var a={};if(e&&e.scene?(current_scene=e.scene,sa.current_scene=current_scene,a.$scene=_.getMPScene(e.scene)):a.$scene="\u672a\u53d6\u5230\u503c",e&&e.scene&&1010===e.scene&&e.query&&(e.query.sampshare&&delete e.query.sampshare,_.delObjectKey(e.query)),e&&e.path&&(a.$url_path=_.getPath(e.path),a.$title=_.getPageTitle(e.path),e.query&&_.isObject(e.query))){var r=_.setQuery(e.query);r=r?"?"+r:"",a.$url=a.$url_path+r}_.setShareInfo(e,a);var i=_.setUtm(e,a);is_first_launch?(a.$is_first_time=!0,_.isEmptyObject(i.pre1)||sa.setOnceProfile(i.pre1)):a.$is_first_time=!1,_.setLatestChannel(i.pre2),_.setSfSource(e,a),sa.registerApp({$latest_scene:a.$scene}),a.$url_query=_.setQuery(e.query),_.setPageRefData(a),t?(a=_.extend(a,t),sa.track("$MPLaunch",a)):sa.para.autoTrack&&sa.para.autoTrack.appLaunch&&sa.autoTrackCustom.trackCustom("appLaunch",a,"$MPLaunch")},appShow:function(e,t){var a={};mpshow_time=(new Date).getTime(),e&&e.scene?(current_scene=e.scene,sa.current_scene=current_scene,a.$scene=_.getMPScene(e.scene)):a.$scene="\u672a\u53d6\u5230\u503c",e&&e.scene&&1010===e.scene&&e.query&&(e.query.sampshare&&delete e.query.sampshare,_.delObjectKey(e.query)),e&&e.path&&(a.$url_path=_.getPath(e.path),a.$title=_.getPageTitle(e.path)),_.setShareInfo(e,a);var r=_.setUtm(e,a);_.setLatestChannel(r.pre2),_.setSfSource(e,a),sa.registerApp({$latest_scene:a.$scene}),a.$url_query=_.setQuery(e.query),_.setPageRefData(a,e.path,a.$url_query),e&&e.path&&(a.$url=e.path+(a.$url_query?"?"+a.$url_query:"")),t?(a=_.extend(a,t),sa.track("$MPShow",a)):sa.para.autoTrack&&sa.para.autoTrack.appShow&&sa.autoTrackCustom.trackCustom("appShow",a,"$MPShow")},appHide:function(e){var t=(new Date).getTime(),a={};a.$url_path=_.getCurrentPath(),mpshow_time&&t-mpshow_time>0&&(t-mpshow_time)/36e5<24&&(a.event_duration=(t-mpshow_time)/1e3),_.setPageRefData(a),e?(a=_.extend(a,e),sa.track("$MPHide",a)):sa.para.autoTrack&&sa.para.autoTrack.appHide&&sa.autoTrackCustom.trackCustom("appHide",a,"$MPHide"),sendStrategy.onAppHide()},pageLoad:function(e){current_scene&&1010===current_scene&&e&&(e.sampshare&&delete e.sampshare,_.delObjectKey(e)),e&&_.isObject(e)&&(this.sensors_mp_url_query=_.setQuery(e),this.sensors_mp_encode_url_query=_.setQuery(e,!0))},pageShow:function(){page_show_time=Date.now();var e={},t=_.getCurrentPath(),a=_.getPageTitle(t);_.setRefPage(),e.$url_path=t,e.$url_query=this.sensors_mp_url_query?this.sensors_mp_url_query:"",e=_.extend(e,_.getUtmFromPage()),_.setPageRefData(e),_.setPageSfSource(e),a&&(e.$title=a),sa.para.onshow?sa.para.onshow(sa,t,this):-1===sa.para.autotrack_exclude_page.pageShow.indexOf(t)&&sa.autoTrackCustom.trackCustom("pageShow",e,"$MPViewScreen")},pageShare:function(e){var t=e.onShareAppMessage;e.onShareAppMessage=function(){share_method="\u8f6c\u53d1\u6d88\u606f\u5361\u7247";var e=t.apply(this,arguments);if(sa.para.autoTrack&&sa.para.autoTrack.pageShare){var a={$url_path:_.getCurrentPath(),$share_depth:query_share_depth,$share_method:share_method};_.setPageRefData(a),sa.autoTrackCustom.trackCustom("pageShare",a,"$MPShare")}return sa.para.allow_amend_share_path&&("object"!=typeof e&&((e={}).path=_.getCurrentUrl(this)),"object"!=typeof e||void 0!==e.path&&""!==e.path||(e.path=_.getCurrentUrl(this)),"object"==typeof e&&"string"==typeof e.path&&(-1===e.path.indexOf("?")?e.path=e.path+"?":"&"!==e.path.slice(-1)&&(e.path=e.path+"&")),e.path=e.path+_.getShareInfo()),e}},pageShareTimeline:function(e){var t=e.onShareTimeline;e.onShareTimeline=function(){share_method="\u670b\u53cb\u5708\u5206\u4eab";var e=t.apply(this,arguments);if(sa.para.autoTrack&&sa.para.autoTrack.pageShare){var a={$url_path:_.getCurrentPath(),$share_depth:query_share_depth,$share_method:share_method};_.setPageRefData(a),sa.autoTrackCustom.trackCustom("pageShare",a,"$MPShare")}return sa.para.allow_amend_share_path&&("object"!=typeof e&&(e={}),"object"==typeof e&&void 0===e.query&&(e.query=""),"object"==typeof e&&"string"==typeof e.query&&""!==e.query&&"&"!==e.query.slice(-1)&&(e.query=e.query+"&"),e.query=e.query+_.getShareInfo()),e}},pageAddFavorites:function(){var e={};e.$url_path=_.getCurrentPath(),sa.para.autoTrack&&sa.para.autoTrack.mpFavorite&&sa.autoTrackCustom.trackCustom("mpFavorite",e,"$MPAddFavorites")}},sa.quick=function(){var e=arguments[0],t=arguments[1],a=arguments[2],r=_.isObject(a)?a:{};if("getAnonymousID"===e){if(!_.isEmptyObject(sa.store._state))return sa.store._state._first_id||sa.store._state.first_id||sa.store._state._distinct_id||sa.store._state.distinct_id;logger.info("\u8bf7\u5148\u521d\u59cb\u5316SDK")}else"appLaunch"===e||"appShow"===e?t?sa.autoTrackCustom[e](t,r):logger.info("App\u7684launch\u548cshow\uff0c\u5728sensors.quick\u7b2c\u4e8c\u4e2a\u53c2\u6570\u5fc5\u987b\u4f20\u5165App\u7684options\u53c2\u6570"):"appHide"===e&&(r=_.isObject(t)?t:{},sa.autoTrackCustom[e](r))},sa.appLaunch=function(e,t){var a={};e&&e.scene?(current_scene=e.scene,sa.current_scene=current_scene,a.$scene=_.getMPScene(e.scene)):a.$scene="\u672a\u53d6\u5230\u503c",e&&e.scene&&1010===e.scene&&e.query&&(e.query.sampshare&&delete e.query.sampshare,_.delObjectKey(e.query)),e&&e.path&&(a.$url_path=_.getPath(e.path),a.$title=_.getPageTitle(e.path)),_.setShareInfo(e,a);var r=_.setUtm(e,a);is_first_launch?(a.$is_first_time=!0,_.isEmptyObject(r.pre1)||sa.setOnceProfile(r.pre1)):a.$is_first_time=!1,_.setLatestChannel(r.pre2),_.setSfSource(e,a),sa.registerApp({$latest_scene:a.$scene}),a.$url_query=_.setQuery(e.query),a.$url=e.path+(a.$url_query?"?"+a.$url_query:""),_.setPageRefData(t),_.isObject(t)&&(a=_.extend(a,t)),sa.track("$MPLaunch",a)},sa.appShow=function(e,t){var a={};mpshow_time=(new Date).getTime(),e&&e.scene?(current_scene=e.scene,sa.current_scene=current_scene,a.$scene=_.getMPScene(e.scene)):a.$scene="\u672a\u53d6\u5230\u503c",e&&e.scene&&1010===e.scene&&e.query&&(e.query.sampshare&&delete e.query.sampshare,_.delObjectKey(e.query)),e&&e.path&&(a.$url_path=_.getPath(e.path),a.$title=_.getPageTitle(e.path)),_.setShareInfo(e,a);var r=_.setUtm(e,a);_.setLatestChannel(r.pre2),_.setSfSource(e,a),sa.registerApp({$latest_scene:a.$scene}),a.$url_query=_.setQuery(e.query),e&&e.path&&(a.$url=e.path+(a.$url_query?"?"+a.$url_query:"")),_.setPageRefData(a,e.path,a.$url_query),_.isObject(t)&&(a=_.extend(a,t)),sa.track("$MPShow",a)},sa.appHide=function(e){var t=(new Date).getTime(),a={};a.$url_path=_.getCurrentPath(),mpshow_time&&t-mpshow_time>0&&(t-mpshow_time)/36e5<24&&(a.event_duration=(t-mpshow_time)/1e3),_.setPageRefData(a),_.isObject(e)&&(a=_.extend(a,e)),sa.track("$MPHide",a),sendStrategy.onAppHide()},sa.pageShow=function(e){var t={},a=_.getCurrentPath(),r=_.getPageTitle(a),i=_.getCurrentPage();_.setRefPage(),r&&(t.$title=r),t.$url_path=a,t.$url_query=i.sensors_mp_url_query?i.sensors_mp_url_query:"",t=_.extend(t,_.getUtmFromPage()),_.setPageSfSource(t),_.setPageRefData(t),_.isObject(e)&&(t=_.extend(t,e)),sa.track("$MPViewScreen",t)},initAppProxy(),initPageProxy(),module.exports=sa;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 5 */,
/* 6 */,
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = listToStyles;
/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ }),
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["default"] = addStylesClient;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__listToStyles__ = __webpack_require__(7);
/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/



var hasDocument = typeof document !== 'undefined'

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
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}
var options = null
var ssrIdKey = 'data-vue-ssr-id'

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

function addStylesClient (parentId, list, _isProduction, _options) {
  isProduction = _isProduction

  options = _options || {}

  var styles = Object(__WEBPACK_IMPORTED_MODULE_0__listToStyles__["a" /* default */])(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = Object(__WEBPACK_IMPORTED_MODULE_0__listToStyles__["a" /* default */])(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[' + ssrIdKey + '~="' + obj.id + '"]')

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
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }
  if (options.ssrId) {
    styleElement.setAttribute(ssrIdKey, obj.id)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ })
]);