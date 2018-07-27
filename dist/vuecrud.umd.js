(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("vue"));
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["vuecrud"] = factory(require("vue"));
	else
		root["vuecrud"] = factory(root["Vue"]);
})((typeof self !== 'undefined' ? self : this), function(__WEBPACK_EXTERNAL_MODULE__8bbf__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = "fb15");
/******/ })
/************************************************************************/
/******/ ({

/***/ "01f9":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__("2d00");
var $export = __webpack_require__("5ca1");
var redefine = __webpack_require__("2aba");
var hide = __webpack_require__("32e9");
var Iterators = __webpack_require__("84f2");
var $iterCreate = __webpack_require__("41a0");
var setToStringTag = __webpack_require__("7f20");
var getPrototypeOf = __webpack_require__("38fd");
var ITERATOR = __webpack_require__("2b4c")('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),

/***/ "0a49":
/***/ (function(module, exports, __webpack_require__) {

// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx = __webpack_require__("9b43");
var IObject = __webpack_require__("626a");
var toObject = __webpack_require__("4bf8");
var toLength = __webpack_require__("9def");
var asc = __webpack_require__("cd1c");
module.exports = function (TYPE, $create) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  var create = $create || asc;
  return function ($this, callbackfn, that) {
    var O = toObject($this);
    var self = IObject(O);
    var f = ctx(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var val, res;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      val = self[index];
      res = f(val, index, O);
      if (TYPE) {
        if (IS_MAP) result[index] = res;   // map
        else if (res) switch (TYPE) {
          case 3: return true;             // some
          case 5: return val;              // find
          case 6: return index;            // findIndex
          case 2: result.push(val);        // filter
        } else if (IS_EVERY) return false; // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};


/***/ }),

/***/ "0d58":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__("ce10");
var enumBugKeys = __webpack_require__("e11e");

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),

/***/ "1169":
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__("2d95");
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),

/***/ "11e9":
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__("52a7");
var createDesc = __webpack_require__("4630");
var toIObject = __webpack_require__("6821");
var toPrimitive = __webpack_require__("6a99");
var has = __webpack_require__("69a8");
var IE8_DOM_DEFINE = __webpack_require__("c69a");
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__("9e1e") ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),

/***/ "1495":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("86cc");
var anObject = __webpack_require__("cb7c");
var getKeys = __webpack_require__("0d58");

module.exports = __webpack_require__("9e1e") ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),

/***/ "1eb2":
/***/ (function(module, exports, __webpack_require__) {

// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  var i
  if ((i = window.document.currentScript) && (i = i.src.match(/(.+\/)[^/]+\.js$/))) {
    __webpack_require__.p = i[1] // eslint-disable-line
  }
}


/***/ }),

/***/ "20d6":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)
var $export = __webpack_require__("5ca1");
var $find = __webpack_require__("0a49")(6);
var KEY = 'findIndex';
var forced = true;
// Shouldn't skip holes
if (KEY in []) Array(1)[KEY](function () { forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  findIndex: function findIndex(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
__webpack_require__("9c6c")(KEY);


/***/ }),

/***/ "230e":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("d3f4");
var document = __webpack_require__("7726").document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),

/***/ "2aba":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("7726");
var hide = __webpack_require__("32e9");
var has = __webpack_require__("69a8");
var SRC = __webpack_require__("ca5a")('src');
var TO_STRING = 'toString';
var $toString = Function[TO_STRING];
var TPL = ('' + $toString).split(TO_STRING);

__webpack_require__("8378").inspectSource = function (it) {
  return $toString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) has(val, 'name') || hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    hide(O, key, val);
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});


/***/ }),

/***/ "2aeb":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__("cb7c");
var dPs = __webpack_require__("1495");
var enumBugKeys = __webpack_require__("e11e");
var IE_PROTO = __webpack_require__("613b")('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__("230e")('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__("fab2").appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),

/***/ "2b4c":
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__("5537")('wks');
var uid = __webpack_require__("ca5a");
var Symbol = __webpack_require__("7726").Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),

/***/ "2d00":
/***/ (function(module, exports) {

module.exports = false;


/***/ }),

/***/ "2d95":
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),

/***/ "32e9":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("86cc");
var createDesc = __webpack_require__("4630");
module.exports = __webpack_require__("9e1e") ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ "38fd":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__("69a8");
var toObject = __webpack_require__("4bf8");
var IE_PROTO = __webpack_require__("613b")('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),

/***/ "41a0":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__("2aeb");
var descriptor = __webpack_require__("4630");
var setToStringTag = __webpack_require__("7f20");
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__("32e9")(IteratorPrototype, __webpack_require__("2b4c")('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),

/***/ "456d":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__("4bf8");
var $keys = __webpack_require__("0d58");

__webpack_require__("5eda")('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});


/***/ }),

/***/ "4588":
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),

/***/ "4630":
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

/***/ "4bf8":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__("be13");
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),

/***/ "52a7":
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),

/***/ "5537":
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__("8378");
var global = __webpack_require__("7726");
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: __webpack_require__("2d00") ? 'pure' : 'global',
  copyright: '© 2018 Denis Pushkarev (zloirock.ru)'
});


/***/ }),

/***/ "5ca1":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("7726");
var core = __webpack_require__("8378");
var hide = __webpack_require__("32e9");
var redefine = __webpack_require__("2aba");
var ctx = __webpack_require__("9b43");
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if (target) redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),

/***/ "5dbc":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("d3f4");
var setPrototypeOf = __webpack_require__("8b97").set;
module.exports = function (that, target, C) {
  var S = target.constructor;
  var P;
  if (S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject(P) && setPrototypeOf) {
    setPrototypeOf(that, P);
  } return that;
};


/***/ }),

/***/ "5eda":
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__("5ca1");
var core = __webpack_require__("8378");
var fails = __webpack_require__("79e5");
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),

/***/ "613b":
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__("5537")('keys');
var uid = __webpack_require__("ca5a");
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),

/***/ "626a":
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__("2d95");
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),

/***/ "6821":
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__("626a");
var defined = __webpack_require__("be13");
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),

/***/ "69a8":
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),

/***/ "6a99":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__("d3f4");
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ "7726":
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),

/***/ "77f1":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("4588");
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),

/***/ "79e5":
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),

/***/ "7f20":
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__("86cc").f;
var has = __webpack_require__("69a8");
var TAG = __webpack_require__("2b4c")('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),

/***/ "7f7f":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("86cc").f;
var FProto = Function.prototype;
var nameRE = /^\s*function ([^ (]*)/;
var NAME = 'name';

// 19.2.4.2 name
NAME in FProto || __webpack_require__("9e1e") && dP(FProto, NAME, {
  configurable: true,
  get: function () {
    try {
      return ('' + this).match(nameRE)[1];
    } catch (e) {
      return '';
    }
  }
});


/***/ }),

/***/ "8378":
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.7' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),

/***/ "84f2":
/***/ (function(module, exports) {

module.exports = {};


/***/ }),

/***/ "86cc":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("cb7c");
var IE8_DOM_DEFINE = __webpack_require__("c69a");
var toPrimitive = __webpack_require__("6a99");
var dP = Object.defineProperty;

exports.f = __webpack_require__("9e1e") ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ "8b97":
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__("d3f4");
var anObject = __webpack_require__("cb7c");
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = __webpack_require__("9b43")(Function.call, __webpack_require__("11e9").f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};


/***/ }),

/***/ "8bbf":
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__8bbf__;

/***/ }),

/***/ "9093":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__("ce10");
var hiddenKeys = __webpack_require__("e11e").concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),

/***/ "9b43":
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__("d8e8");
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),

/***/ "9c6c":
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = __webpack_require__("2b4c")('unscopables');
var ArrayProto = Array.prototype;
if (ArrayProto[UNSCOPABLES] == undefined) __webpack_require__("32e9")(ArrayProto, UNSCOPABLES, {});
module.exports = function (key) {
  ArrayProto[UNSCOPABLES][key] = true;
};


/***/ }),

/***/ "9def":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__("4588");
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),

/***/ "9e1e":
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__("79e5")(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "aa77":
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__("5ca1");
var defined = __webpack_require__("be13");
var fails = __webpack_require__("79e5");
var spaces = __webpack_require__("fdef");
var space = '[' + spaces + ']';
var non = '\u200b\u0085';
var ltrim = RegExp('^' + space + space + '*');
var rtrim = RegExp(space + space + '*$');

var exporter = function (KEY, exec, ALIAS) {
  var exp = {};
  var FORCE = fails(function () {
    return !!spaces[KEY]() || non[KEY]() != non;
  });
  var fn = exp[KEY] = FORCE ? exec(trim) : spaces[KEY];
  if (ALIAS) exp[ALIAS] = fn;
  $export($export.P + $export.F * FORCE, 'String', exp);
};

// 1 -> String#trimLeft
// 2 -> String#trimRight
// 3 -> String#trim
var trim = exporter.trim = function (string, TYPE) {
  string = String(defined(string));
  if (TYPE & 1) string = string.replace(ltrim, '');
  if (TYPE & 2) string = string.replace(rtrim, '');
  return string;
};

module.exports = exporter;


/***/ }),

/***/ "ac6a":
/***/ (function(module, exports, __webpack_require__) {

var $iterators = __webpack_require__("cadf");
var getKeys = __webpack_require__("0d58");
var redefine = __webpack_require__("2aba");
var global = __webpack_require__("7726");
var hide = __webpack_require__("32e9");
var Iterators = __webpack_require__("84f2");
var wks = __webpack_require__("2b4c");
var ITERATOR = wks('iterator');
var TO_STRING_TAG = wks('toStringTag');
var ArrayValues = Iterators.Array;

var DOMIterables = {
  CSSRuleList: true, // TODO: Not spec compliant, should be false.
  CSSStyleDeclaration: false,
  CSSValueList: false,
  ClientRectList: false,
  DOMRectList: false,
  DOMStringList: false,
  DOMTokenList: true,
  DataTransferItemList: false,
  FileList: false,
  HTMLAllCollection: false,
  HTMLCollection: false,
  HTMLFormElement: false,
  HTMLSelectElement: false,
  MediaList: true, // TODO: Not spec compliant, should be false.
  MimeTypeArray: false,
  NamedNodeMap: false,
  NodeList: true,
  PaintRequestList: false,
  Plugin: false,
  PluginArray: false,
  SVGLengthList: false,
  SVGNumberList: false,
  SVGPathSegList: false,
  SVGPointList: false,
  SVGStringList: false,
  SVGTransformList: false,
  SourceBufferList: false,
  StyleSheetList: true, // TODO: Not spec compliant, should be false.
  TextTrackCueList: false,
  TextTrackList: false,
  TouchList: false
};

for (var collections = getKeys(DOMIterables), i = 0; i < collections.length; i++) {
  var NAME = collections[i];
  var explicit = DOMIterables[NAME];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  var key;
  if (proto) {
    if (!proto[ITERATOR]) hide(proto, ITERATOR, ArrayValues);
    if (!proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
    Iterators[NAME] = ArrayValues;
    if (explicit) for (key in $iterators) if (!proto[key]) redefine(proto, key, $iterators[key], true);
  }
}


/***/ }),

/***/ "be13":
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),

/***/ "c366":
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__("6821");
var toLength = __webpack_require__("9def");
var toAbsoluteIndex = __webpack_require__("77f1");
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),

/***/ "c5f6":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__("7726");
var has = __webpack_require__("69a8");
var cof = __webpack_require__("2d95");
var inheritIfRequired = __webpack_require__("5dbc");
var toPrimitive = __webpack_require__("6a99");
var fails = __webpack_require__("79e5");
var gOPN = __webpack_require__("9093").f;
var gOPD = __webpack_require__("11e9").f;
var dP = __webpack_require__("86cc").f;
var $trim = __webpack_require__("aa77").trim;
var NUMBER = 'Number';
var $Number = global[NUMBER];
var Base = $Number;
var proto = $Number.prototype;
// Opera ~12 has broken Object#toString
var BROKEN_COF = cof(__webpack_require__("2aeb")(proto)) == NUMBER;
var TRIM = 'trim' in String.prototype;

// 7.1.3 ToNumber(argument)
var toNumber = function (argument) {
  var it = toPrimitive(argument, false);
  if (typeof it == 'string' && it.length > 2) {
    it = TRIM ? it.trim() : $trim(it, 3);
    var first = it.charCodeAt(0);
    var third, radix, maxCode;
    if (first === 43 || first === 45) {
      third = it.charCodeAt(2);
      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if (first === 48) {
      switch (it.charCodeAt(1)) {
        case 66: case 98: radix = 2; maxCode = 49; break; // fast equal /^0b[01]+$/i
        case 79: case 111: radix = 8; maxCode = 55; break; // fast equal /^0o[0-7]+$/i
        default: return +it;
      }
      for (var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++) {
        code = digits.charCodeAt(i);
        // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols
        if (code < 48 || code > maxCode) return NaN;
      } return parseInt(digits, radix);
    }
  } return +it;
};

if (!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')) {
  $Number = function Number(value) {
    var it = arguments.length < 1 ? 0 : value;
    var that = this;
    return that instanceof $Number
      // check on 1..constructor(foo) case
      && (BROKEN_COF ? fails(function () { proto.valueOf.call(that); }) : cof(that) != NUMBER)
        ? inheritIfRequired(new Base(toNumber(it)), that, $Number) : toNumber(it);
  };
  for (var keys = __webpack_require__("9e1e") ? gOPN(Base) : (
    // ES3:
    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
    // ES6 (in case, if modules with ES6 Number statics required before):
    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
  ).split(','), j = 0, key; keys.length > j; j++) {
    if (has(Base, key = keys[j]) && !has($Number, key)) {
      dP($Number, key, gOPD(Base, key));
    }
  }
  $Number.prototype = proto;
  proto.constructor = $Number;
  __webpack_require__("2aba")(global, NUMBER, $Number);
}


/***/ }),

/***/ "c69a":
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__("9e1e") && !__webpack_require__("79e5")(function () {
  return Object.defineProperty(__webpack_require__("230e")('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "ca5a":
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),

/***/ "cadf":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__("9c6c");
var step = __webpack_require__("d53b");
var Iterators = __webpack_require__("84f2");
var toIObject = __webpack_require__("6821");

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__("01f9")(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),

/***/ "cb7c":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("d3f4");
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),

/***/ "cd1c":
/***/ (function(module, exports, __webpack_require__) {

// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = __webpack_require__("e853");

module.exports = function (original, length) {
  return new (speciesConstructor(original))(length);
};


/***/ }),

/***/ "ce10":
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__("69a8");
var toIObject = __webpack_require__("6821");
var arrayIndexOf = __webpack_require__("c366")(false);
var IE_PROTO = __webpack_require__("613b")('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),

/***/ "d3f4":
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),

/***/ "d53b":
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),

/***/ "d8e8":
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),

/***/ "e11e":
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),

/***/ "e853":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("d3f4");
var isArray = __webpack_require__("1169");
var SPECIES = __webpack_require__("2b4c")('species');

module.exports = function (original) {
  var C;
  if (isArray(original)) {
    C = original.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return C === undefined ? Array : C;
};


/***/ }),

/***/ "fab2":
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__("7726").document;
module.exports = document && document.documentElement;


/***/ }),

/***/ "fb15":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
var setPublicPath = __webpack_require__("1eb2");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.array.iterator.js
var es6_array_iterator = __webpack_require__("cadf");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.object.keys.js
var es6_object_keys = __webpack_require__("456d");

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom.iterable.js
var web_dom_iterable = __webpack_require__("ac6a");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.function.name.js
var es6_function_name = __webpack_require__("7f7f");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"C://sacha//vue//vuecrud//node_modules//.cache//vue-loader","cacheIdentifier":"2c4efe34-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/address.vue?vue&type=template&id=3950c2fd&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"el-input"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.autocompleteText),expression:"autocompleteText"}],ref:"autocompvare",staticClass:"el-input__inner",staticStyle:{"width":"500px"},attrs:{"type":"text","id":_vm.id,"placeholder":_vm.placeholder},domProps:{"value":(_vm.autocompleteText)},on:{"focus":function($event){_vm.onFocus()},"blur":function($event){_vm.onBlur()},"change":_vm.onChange,"keypress":_vm.onKeyPress,"input":function($event){if($event.target.composing){ return; }_vm.autocompleteText=$event.target.value}}})])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/address.vue?vue&type=template&id=3950c2fd&

// EXTERNAL MODULE: external {"commonjs":"vue","commonjs2":"vue","root":"Vue"}
var external_commonjs_vue_commonjs2_vue_root_Vue_ = __webpack_require__("8bbf");
var external_commonjs_vue_commonjs2_vue_root_Vue_default = /*#__PURE__*/__webpack_require__.n(external_commonjs_vue_commonjs2_vue_root_Vue_);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/components/address.vue?vue&type=script&lang=js&
//
//
//
//
//
//

/* harmony default export */ var addressvue_type_script_lang_js_ = ({
  name: 'oa-address',
  props: {
    value: Object,
    prop: String,
    schema: {},
    options: {},
    messages: {},
    id: {
      type: String,
      // required: true,
      default: function _default() {
        return 'address' + Math.floor(Math.random() * 1000 + 1);
      }
    },
    placeholder: {
      type: String,
      default: 'Start typing'
    },
    types: {
      type: String,
      default: 'address'
    },
    country: {
      type: [String, Array],
      default: null
    },
    enableGeolocation: {
      type: Boolean,
      default: false
    }
  },
  data: function data() {
    return {
      /**
       * The Autocomplete object.
       *
       * @type {Autocomplete}
       * @link https://developers.google.com/maps/documentation/javascript/reference#Autocomplete
       */
      autocomplete: null,

      /**
       * Autocomplete input text
       * @type {String}
       */
      autocompleteText: ''
    };
  },
  watch: {
    autocompleteText: function autocompleteText(newVal, oldVal) {
      this.$emit('inputChange', {
        newVal: newVal,
        oldVal: oldVal
      });
    }
  },
  mounted: function mounted() {
    var self = this;
    ensureGoogleMaps({
      libraries: ['places'],
      key: 'AIzaSyCe1exctmeJjIb4guyT6newSpyJ7kA3aLc',
      client: '',
      version: '3',
      loadGoogleApi: true
    }, function (xgoogle) {
      var options = {};

      if (self.types) {
        options.types = [self.types];
      }

      if (self.country) {
        options.componentRestrictions = {
          country: self.country
        };
      }

      self.autocomplete = new google.maps.places.Autocomplete(document.getElementById(self.id), options);
      self.autocomplete.addListener('place_changed', function () {
        var place = self.autocomplete.getPlace();

        if (!place.geometry) {
          // User entered the name of a Place that was not suggested and
          // pressed the Enter key, or the Place Details request failed.
          self.$emit('no-results-found', place);
          return;
        }

        var addressComponents = {
          street_number: 'short_name',
          route: 'long_name',
          locality: 'long_name',
          administrative_area_level_1: 'short_name',
          country: 'long_name',
          postal_code: 'short_name'
        };
        var returnData = {};

        if (place.address_components !== undefined) {
          // Get each component of the address from the place details
          for (var i = 0; i < place.address_components.length; i++) {
            var addressType = place.address_components[i].types[0];

            if (addressComponents[addressType]) {
              var val = place.address_components[i][addressComponents[addressType]];
              returnData[addressType] = val;
            }
          }

          returnData['latitude'] = place.geometry.location.lat();
          returnData['longitude'] = place.geometry.location.lng(); // return returnData object and PlaceResult object
          // this.$emit('placechanged', returnData, place, this.id);
          // update autocompleteText then emit change event

          self.autocompleteText = document.getElementById(self.id).value;
          self.onChange();
          self.$emit('propChange', 'street', returnData.route + (returnData.street_number ? ' ' + returnData.street_number : ''));
          self.$emit('propChange', 'postalCode', returnData.postal_code);
          self.$emit('propChange', 'city', returnData.locality);
          self.$emit('propChange', 'country', returnData.country);
        }
      });
    });
  },
  methods: {
    /**
     * When the input gets focus
     */
    onFocus: function onFocus() {
      this.geolocate();
      this.$emit('focus');
    },

    /**
     * When the input loses focus
     */
    onBlur: function onBlur() {
      this.$emit('blur');
    },

    /**
     * When the input got changed
     */
    onChange: function onChange() {
      this.$emit('change', this.autocompleteText);
    },

    /**
     * When a key gets pressed
     * @param  {Event} event A keypress event
     */
    onKeyPress: function onKeyPress(event) {
      this.$emit('keypress', event);
    },

    /**
     * Clear the input
     */
    clear: function clear() {
      this.autocompleteText = '';
    },

    /**
     * Focus the input
     */
    focus: function focus() {
      this.$refs.autocomplete.focus();
    },

    /**
     * Blur the input
     */
    blur: function blur() {
      this.$refs.autocomplete.blur();
    },
    // Bias the autocomplete object to the user's geographical location,
    // as supplied by the browser's 'navigator.geolocation' object.
    geolocate: function geolocate() {
      if (this.enableGeolocation) {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function (position) {
            var geolocation = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            var circle = new google.maps.Circle({
              center: geolocation,
              radius: position.coords.accuracy
            });
            this.autocomplete.setBounds(circle.getBounds());
          });
        }
      }
    }
  },
  computed: {
    model: {
      get: function get() {
        return this.value;
      },
      set: function set(val) {
        this.$emit('input', val);
      }
    },
    properties: function properties() {
      return this.schema.properties;
    },
    fields: function fields() {
      var fields = {};

      for (var key in this.schema.properties) {
        if (this.columns) {
          if (this.columns.indexOf(key) > 0) {
            fields[key] = this.schema.properties[key];
          }
        } else {
          if (key != 'id' && !this.schema.properties[key].readonly && !this.schema.properties[key]['x-rel-app']) {
            fields[key] = this.schema.properties[key];
          }
        }
      }

      return fields;
    }
  }
});

function ensureGoogleMaps(options, fn) {
  if (!options.loadGoogleApi) {
    fn(window.google.maps ? window.google.maps : window.google);
  } else if (external_commonjs_vue_commonjs2_vue_root_Vue_default.a.google) {
    fn(external_commonjs_vue_commonjs2_vue_root_Vue_default.a.google);
  } else {
    window.loadGoogleMapsAPI({
      key: options.key,
      client: options.client,
      libraries: options.libraries,
      v: options.version
    }, function (google) {
      external_commonjs_vue_commonjs2_vue_root_Vue_default.a.google = google;
      external_commonjs_vue_commonjs2_vue_root_Vue_default.a.prototype.$google = google;
      fn(google);
    });
  }
}

var CALLBACK_NAME = '__googleMapsApiOnLoadCallback';
var OPTIONS_KEYS = ['client', 'key', 'language', 'region', 'v'];

window.loadGoogleMapsAPI = function (options, callback) {
  options = options || {}; // Exit if not running inside a browser.

  if (typeof window === 'undefined') {
    alert('Can only load the Google Maps API in the browser');
  }

  if (window[CALLBACK_NAME]) {
    oldCallBack = window[CALLBACK_NAME];

    window[CALLBACK_NAME] = function () {
      oldCallBack();
      if (callback) callback(window.google.maps);
    };

    return;
  }

  var timeoutId = setTimeout(function () {
    window[CALLBACK_NAME] = function () {}; // Set the on load callback to a no-op.


    alert('Could not load the Google Maps API');
  }, options.timeout || 10000); // Hook up the on load callback.

  window[CALLBACK_NAME] = function () {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }

    if (callback) callback(window.google.maps);
    delete window[CALLBACK_NAME];
  }; // Prepare the `script` tag to be inserted into the page.


  var scriptElement = document.createElement('script');
  var params = ['callback=' + CALLBACK_NAME];
  OPTIONS_KEYS.forEach(function (key) {
    if (options[key]) {
      params.push(key + '=' + options[key]);
    }
  });

  if (options.libraries && options.libraries.length) {
    params.push('libraries=' + options.libraries.join(','));
  }

  scriptElement.src = 'https://maps.googleapis.com/maps/api/js?' + params.join('&'); // Insert the `script` tag.

  document.body.appendChild(scriptElement);
};
// CONCATENATED MODULE: ./src/components/address.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_addressvue_type_script_lang_js_ = (addressvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
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
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
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
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}

// CONCATENATED MODULE: ./src/components/address.vue





/* normalize component */

var component = normalizeComponent(
  components_addressvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var address = (component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"C://sacha//vue//vuecrud//node_modules//.cache//vue-loader","cacheIdentifier":"2c4efe34-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/checkboxGroup.vue?vue&type=template&id=31d2508e&
var checkboxGroupvue_type_template_id_31d2508e_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('el-checkbox-group',{model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v},expression:"model"}},_vm._l((_vm.options),function(item){return _c('el-checkbox',{key:item.value,attrs:{"label":item.value}},[_vm._v(_vm._s(item.label))])}))}
var checkboxGroupvue_type_template_id_31d2508e_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/checkboxGroup.vue?vue&type=template&id=31d2508e&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/components/checkboxGroup.vue?vue&type=script&lang=js&
//
//
//
//
//
//
/* harmony default export */ var checkboxGroupvue_type_script_lang_js_ = ({
  name: 'oa-checkbox-group',
  props: {
    value: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    schema: {},
    prop: String
  },
  data: function data() {
    return {
      options: []
    };
  },
  computed: {
    model: {
      get: function get() {
        return this.value;
      },
      set: function set(val) {
        this.$emit('input', val);
      }
    },
    resource: function resource() {
      return this.$route.params.resource;
    }
  },
  created: function created() {
    var self = this;
    var enumAction = this.schema['x-enum-action'];

    if (enumAction) {
      var enumValueField = this.schema['x-enum-valuefield'];
      var enumTextField = this.schema['x-enum-textfield'] || this.schema['x-enum-valuefield'];
      var service = abp.services.app[self.resource][enumAction];
      service().done(function (data) {
        self.options = data.items.map(function (p) {
          return {
            value: p[enumValueField],
            label: p[enumTextField]
          };
        });
      }).always(function () {// abp.ui.clearBusy(_$app);
      });
    } else if (this.schema.enum) {
      this.options = this.schema.enum.map(function (val) {
        return {
          value: val,
          label: val
        };
      });
    } else {
      return [];
    }
  }
});
// CONCATENATED MODULE: ./src/components/checkboxGroup.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_checkboxGroupvue_type_script_lang_js_ = (checkboxGroupvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/checkboxGroup.vue





/* normalize component */

var checkboxGroup_component = normalizeComponent(
  components_checkboxGroupvue_type_script_lang_js_,
  checkboxGroupvue_type_template_id_31d2508e_render,
  checkboxGroupvue_type_template_id_31d2508e_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var checkboxGroup = (checkboxGroup_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"C://sacha//vue//vuecrud//node_modules//.cache//vue-loader","cacheIdentifier":"2c4efe34-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/crudform.vue?vue&type=template&id=5ee1ef28&
var crudformvue_type_template_id_5ee1ef28_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('oa-form',{ref:"form",attrs:{"model":_vm.model,"schema":_vm.schema,"actions":_vm.actions,"service":_vm.service,"messages":_vm.messages}})}
var crudformvue_type_template_id_5ee1ef28_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/crudform.vue?vue&type=template&id=5ee1ef28&

// CONCATENATED MODULE: ./src/vueforms.js
//import jref from 'json-ref-lite'
var VueForms = {};
VueForms.jsonSchema = {};

VueForms.jsonSchema.getNotNull = function (schema) {
  if (schema.oneOf) {
    var lst = schema.oneOf.filter(function (s) {
      s.type != "null";
    });

    if (lst.length > 0) {
      return lst[0];
    } else {
      return schema;
    }
  } else {
    return schema;
  }
};

VueForms.isMobile = function () {
  return window.matchMedia("only screen and (max-width: 760px)").matches;
}; // override .resolve function to prevent stack-overflow issue
//  var _originalResolvefn = jref.resolve;
//  VueForms.jsonSchema.resolve = function (json) {
//      var clone = JSON.parse(JSON.stringify(json)); // create clone because jref.resolve changes the input value; which results (sometimes) in an stack-overflow error if presented a second time 
//      return _originalResolvefn(clone);
//  };


VueForms.jsonSchema.resolve = function (json) {
  return json;
};

/* harmony default export */ var vueforms = (VueForms);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/components/crudform.vue?vue&type=script&lang=js&


//
//
//
//

/* harmony default export */ var crudformvue_type_script_lang_js_ = ({
  name: 'oa-crud-form',
  props: {},
  data: function data() {
    var self = this;
    return {
      model: {},
      actions: [{
        name: 'Save',
        type: 'primary',
        execute: function execute() {
          self.$refs.form.validate(function (valid) {
            if (valid) {
              self.saveData(self.model, function () {
                self.$message({
                  type: 'success',
                  message: 'Save completed'
                });
                self.$router.push({
                  name: 'grid',
                  params: {
                    resource: self.resource
                  }
                });
              });
            } else {
              return false;
            }
          });
        }
      }, {
        name: 'Cancel',
        execute: function execute() {
          self.$router.push({
            name: 'grid',
            params: {
              resource: self.resource
            }
          });
        }
      }]
    };
  },
  computed: {
    module: function module() {
      return this.$route.params.module;
    },
    resource: function resource() {
      return this.$route.params.resource;
    },
    messages: function messages() {
      return abp.localization.values[this.module];
    },
    id: function id() {
      return this.$route.params.id;
    },
    isnew: function isnew() {
      return !this.id;
    },
    schema: function schema() {
      if (this.isnew) {
        return vueforms.jsonSchema.resolve(abp.schemas.app[this.resource].create.parameters.input);
      } else {
        return vueforms.jsonSchema.resolve(abp.schemas.app[this.resource].update.parameters.input);
      }
    },
    options: function options() {
      /*
                if (abp.forms.app[this.resource] && abp.forms.app[this.resource].options)
                    return abp.forms.app[this.resource].options;
                else
                */
      return null;
    },
    service: function service() {
      return abp.services.app[this.resource];
    }
  },
  methods: {
    fetchData: function fetchData() {
      var self = this;

      if (!this.isnew) {
        self.service.get({
          id: self.id
        }).done(function (data) {
          self.model = data; // this.pagination.totalItems = data.total;
        }).always(function () {// abp.ui.clearBusy(_$app);
        });
      }
    },
    saveData: function saveData(data, callback) {
      var self = this;

      if (self.isnew) {
        // add
        self.service.create(data).done(function (newdata) {
          if (callback) callback(); // this.pagination.totalItems = data.total;
        }).always(function () {// abp.ui.clearBusy(_$app);
        });
      } else {
        // update
        data.id = self.id;
        self.service.update(data).done(function (newdata) {
          if (callback) callback(); // this.pagination.totalItems = data.total;
        }).always(function () {// abp.ui.clearBusy(_$app);
        });
      }
    }
  },
  created: function created() {
    // this.$store.commit('setPageTitle', global.helper.i.titleize(global.helper.i.pluralize(this.resource)))
    // this.fetchGrid().then(() => { })
    this.fetchData();
  },
  watch: {
    // call again the method if the route changes
    $route: function $route() {
      this.fetchData();
    }
  }
});
// CONCATENATED MODULE: ./src/components/crudform.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_crudformvue_type_script_lang_js_ = (crudformvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/crudform.vue





/* normalize component */

var crudform_component = normalizeComponent(
  components_crudformvue_type_script_lang_js_,
  crudformvue_type_template_id_5ee1ef28_render,
  crudformvue_type_template_id_5ee1ef28_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var crudform = (crudform_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"C://sacha//vue//vuecrud//node_modules//.cache//vue-loader","cacheIdentifier":"2c4efe34-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/crudgrid.vue?vue&type=template&id=3ae48cc4&
var crudgridvue_type_template_id_3ae48cc4_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('el-row',{attrs:{"gutter":10}},[_c('el-col',{staticStyle:{"padding-bottom":"20px"},attrs:{"xs":24,"sm":2,"md":2,"lg":2,"xl":2}},_vm._l((_vm.actions),function(action){return _c('el-button',{key:action.name,attrs:{"icon":action.icon,"size":"small","type":action.type},on:{"click":function($event){action.execute()}}},[_vm._v(_vm._s(action.name))])})),_c('el-col',{attrs:{"xs":24,"sm":22,"md":22,"lg":22,"xl":22}},[(_vm.hasFilter)?_c('oa-filter-form',{ref:"filterform",attrs:{"model":_vm.filterModel,"schema":_vm.filterSchema,"service":_vm.service,"actions":_vm.filterActions,"messages":_vm.messages}}):_vm._e()],1)],1),_c('oa-grid',{attrs:{"model":_vm.model,"schema":_vm.schema,"messages":_vm.messages,"options":_vm.options,"actions":_vm.gridActions,"default-action":_vm.gridActions[0]}}),_c('br'),_c('div',{staticStyle:{"float":"right","margin-bottom":"10px"}},[_c('el-pagination',{attrs:{"current-page":_vm.currentPage,"page-size":_vm.pageSize,"layout":"total, prev, pager, next","total":_vm.totalCount},on:{"current-change":_vm.currentPageChange,"update:currentPage":function($event){_vm.currentPage=$event}}})],1)],1)}
var crudgridvue_type_template_id_3ae48cc4_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/crudgrid.vue?vue&type=template&id=3ae48cc4&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/components/crudgrid.vue?vue&type=script&lang=js&



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

/* harmony default export */ var crudgridvue_type_script_lang_js_ = ({
  name: 'oa-crud-grid',
  data: function data() {
    return {
      model: [],
      filterModel: {},
      totalCount: 0,
      currentPage: 1,
      pageSize: 10
    };
  },
  computed: {
    module: function module() {
      return this.$route.params.module;
    },
    resource: function resource() {
      return this.$route.params.resource;
    },
    service: function service() {
      return abp.services.app[this.resource];
    },
    schema: function schema() {
      return vueforms.jsonSchema.resolve(abp.schemas.app[this.resource].get.returnValue);
    },
    messages: function messages() {
      return abp.localization.values[this.module];
    },
    gridActions: function gridActions() {
      var self = this;
      return [{
        name: self.translate('Edit'),
        icon: 'el-icon-edit',
        execute: function execute(row) {
          self.$router.push({
            name: 'edit',
            params: {
              resource: self.resource,
              id: row.id
            }
          });
        }
      }, {
        name: self.translate('Delete'),
        icon: 'el-icon-delete',
        execute: function execute(row) {
          self.$confirm('Confirm delete ?', self.translate('Delete'), {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning'
          }).then(function () {
            self.deleteData(row, function () {
              self.$message({
                type: 'success',
                message: self.translate('Delete completed')
              });
            });
          }).catch(function () {});
        },
        visible: function visible(row, index) {
          if (typeof row.canDelete !== 'undefined') {
            return row.canDelete;
          } else {
            return true;
          }
        }
      }];
    },
    defaultAction: function defaultAction() {
      return this.gridActions[0];
    },
    actions: function actions() {
      var self = this;
      return [{
        // name: self.translate('Add'),
        icon: 'el-icon-plus',
        type: 'primary',
        execute: function execute() {
          self.$router.push({
            name: 'add',
            params: {
              resource: self.resource
            }
          });
        }
      }];
    },
    filterSchema: function filterSchema() {
      var schema = {
        properties: {}
      };
      var action = abp.schemas.app[this.resource].getAll.parameters.input.properties;

      for (var key in action) {
        if (key != 'skipCount' && key != 'maxResultCount') {
          schema.properties[key] = action[key];
        }
      }

      return schema;
    },
    hasFilter: function hasFilter() {
      return Object.keys(this.filterSchema.properties).length > 0;
    },
    filterActions: function filterActions() {
      var self = this;
      return [{
        // name: self.translate('Search'),
        icon: 'el-icon-search',
        type: 'primary',
        execute: function execute() {
          self.fetchData();
        }
      }, {
        // name: self.translate('Reset'),
        icon: 'el-icon-close',
        execute: function execute() {
          self.$refs.filterform.resetForm();
          self.fetchData();
        }
      }];
    },
    options: function options() {
      /*
                      if (abp.grids.app[this.resource] && abp.grids.app[this.resource].options)
                          return abp.grids.app[this.resource].options;
                      else
                          return null;
                        var cols = [];
                      for (var key in this.schema.properties) {
                          cols.push(key);
                      }
                      */
      return null;
    },
    totalPages: function totalPages() {
      return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage);
    }
  },
  methods: {
    currentPageChange: function currentPageChange(val) {
      this.fetchData();
    },
    fetchData: function fetchData(callback) {
      var self = this;
      self.filterModel.skipCount = (this.currentPage - 1) * this.pageSize;
      self.filterModel.maxResultCount = this.pageSize; // { skipCount: 0, maxResultCount: 999 }

      self.service.getAll(self.filterModel).done(function (data) {
        self.model = data.items;
        self.totalCount = data.totalCount;
        if (callback) callback(); // this.pagination.totalItems = data.total;
      }).always(function () {// abp.ui.clearBusy(_$app);
      });
    },
    deleteData: function deleteData(data, callback) {
      var self = this;
      self.service.delete({
        id: data.id
      }).done(function (data) {
        self.fetchData(callback);
      }).always(function () {// abp.ui.clearBusy(_$app);
      });
    },
    translate: function translate(text) {
      if (this.messages && this.messages[text]) return this.messages[text];else return text;
    }
  },
  created: function created() {
    // this.$store.commit('setPageTitle', global.helper.i.titleize(global.helper.i.pluralize(this.resource)))
    // this.fetchGrid().then(() => { })
    this.fetchData();
  },
  watch: {
    // call again the method if the route changes
    $route: function $route() {
      this.fetchData();
    }
  }
});
// CONCATENATED MODULE: ./src/components/crudgrid.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_crudgridvue_type_script_lang_js_ = (crudgridvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/crudgrid.vue





/* normalize component */

var crudgrid_component = normalizeComponent(
  components_crudgridvue_type_script_lang_js_,
  crudgridvue_type_template_id_3ae48cc4_render,
  crudgridvue_type_template_id_3ae48cc4_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var crudgrid = (crudgrid_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"C://sacha//vue//vuecrud//node_modules//.cache//vue-loader","cacheIdentifier":"2c4efe34-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/daterange.vue?vue&type=template&id=e97b25da&
var daterangevue_type_template_id_e97b25da_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('el-date-picker',{attrs:{"type":"daterange","picker-options":_vm.pickerOptions},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v},expression:"model"}})}
var daterangevue_type_template_id_e97b25da_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/daterange.vue?vue&type=template&id=e97b25da&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/components/daterange.vue?vue&type=script&lang=js&
//
//
//
//
/* harmony default export */ var daterangevue_type_script_lang_js_ = ({
  name: 'oa-daterange',
  data: function data() {
    return {
      pickerOptions: {
        shortcuts: [{
          text: 'Last week',
          onClick: function onClick(picker) {
            var end = new Date();
            var start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: 'Last month',
          onClick: function onClick(picker) {
            var end = new Date();
            var start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: 'Last 3 months',
          onClick: function onClick(picker) {
            var end = new Date();
            var start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      }
    };
  },
  props: {
    value: Array,
    schema: {},
    prop: String,
    options: {}
  },
  computed: {
    model: {
      get: function get() {
        return this.value;
      },
      set: function set(val) {
        this.$emit('input', val);
      }
    }
  }
});
// CONCATENATED MODULE: ./src/components/daterange.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_daterangevue_type_script_lang_js_ = (daterangevue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/daterange.vue





/* normalize component */

var daterange_component = normalizeComponent(
  components_daterangevue_type_script_lang_js_,
  daterangevue_type_template_id_e97b25da_render,
  daterangevue_type_template_id_e97b25da_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var daterange = (daterange_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"C://sacha//vue//vuecrud//node_modules//.cache//vue-loader","cacheIdentifier":"2c4efe34-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/dialogform.vue?vue&type=template&id=32daf262&
var dialogformvue_type_template_id_32daf262_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('oa-form',{ref:"form",attrs:{"model":_vm.model,"schema":_vm.schema,"actions":_vm.actions,"messages":_vm.messages,"service":_vm.service}})}
var dialogformvue_type_template_id_32daf262_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/dialogform.vue?vue&type=template&id=32daf262&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/components/dialogform.vue?vue&type=script&lang=js&


//
//
//
//
//

/* harmony default export */ var dialogformvue_type_script_lang_js_ = ({
  name: 'oa-dialog-form',
  props: {
    resource: {},
    value: {}
  },
  data: function data() {
    var self = this;
    return {
      messages: abp.localization.values['JobManager'],
      model: {},
      actions: [{
        name: 'Save',
        type: 'primary',
        execute: function execute() {
          self.$refs.form.validate(function (valid) {
            if (valid) {
              self.saveData(self.model, function () {
                self.$message({
                  type: 'success',
                  message: 'Save completed'
                });
                self.$emit('close', self.model);
              });
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        }
      }, {
        name: 'Cancel',
        execute: function execute() {
          self.$emit('close');
        }
      }]
    };
  },
  computed: {
    id: function id() {
      return this.value ? this.value[this.relationValueField] : null;
    },
    isnew: function isnew() {
      return !this.value;
    },
    relationValueField: function relationValueField() {
      return this.schema['x-rel-valuefield'] || 'id';
    },
    schema: function schema() {
      if (this.isnew) {
        return src.jsonSchema.resolve(abp.schemas.app[this.resource].create.parameters.input);
      } else {
        return src.jsonSchema.resolve(abp.schemas.app[this.resource].update.parameters.input);
      }
    },
    service: function service() {
      return abp.services.app[this.resource];
    }
  },
  methods: {
    fetchData: function fetchData() {
      var self = this;
      self.$refs.form.resetForm();

      if (!this.isnew) {
        abp.services.app[this.resource].get({
          id: self.id
        }).done(function (data) {
          self.model = data; // this.pagination.totalItems = data.total;
        }).always(function () {// abp.ui.clearBusy(_$app);
        });
      } else {
        self.model = {};
      }
    },
    saveData: function saveData(data, callback) {
      var self = this;

      if (self.isnew) {
        // add
        self.service.create(data).done(function (newdata) {
          self.model = newdata;
          self.$emit('input', newdata[this.relationValueField]);
          if (callback) callback();
        }).always(function () {// abp.ui.clearBusy(_$app);
        });
      } else {
        // update
        data.id = self.id;
        self.service.update(data).done(function (newdata) {
          self.model = newdata;
          self.$emit('input', newdata.id);
          if (callback) callback();
        }).always(function () {// abp.ui.clearBusy(_$app);
        });
      }
    }
  },
  mounted: function mounted() {
    this.fetchData();
  }
});
// CONCATENATED MODULE: ./src/components/dialogform.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_dialogformvue_type_script_lang_js_ = (dialogformvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/dialogform.vue





/* normalize component */

var dialogform_component = normalizeComponent(
  components_dialogformvue_type_script_lang_js_,
  dialogformvue_type_template_id_32daf262_render,
  dialogformvue_type_template_id_32daf262_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var dialogform = (dialogform_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"C://sacha//vue//vuecrud//node_modules//.cache//vue-loader","cacheIdentifier":"2c4efe34-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/field.vue?vue&type=template&id=53042832&
var fieldvue_type_template_id_53042832_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('el-form-item',{attrs:{"label":_vm.label,"prop":_vm.prop}},[_c(_vm.currentView,_vm._b({tag:"component",on:{"propChange":_vm.propChange},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v},expression:"model"}},'component',_vm.$props,false))],1)}
var fieldvue_type_template_id_53042832_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/field.vue?vue&type=template&id=53042832&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/components/field.vue?vue&type=script&lang=js&

//
//
//
//
//
//



/* harmony default export */ var fieldvue_type_script_lang_js_ = ({
  name: 'oa-field',
  template: ' ',
  props: {
    value: {},
    schema: {},
    prop: String,
    messages: Object,
    service: {}
  },
  computed: {
    currentView: function currentView() {
      var sch = vueforms.jsonSchema.getNotNull(this.schema);
      var type = Array.isArray(sch.type) ? sch.type[0] == 'null' ? sch.type[1] : sch.type[0] : sch.type;

      if (sch['x-type']) {
        type = sch['x-type'];
      } else if (sch['x-rel-action']) {
        type = 'relation';
      } else if (sch['x-rel-to-many-action']) {
        type = 'relation-to-many';
      } else if (sch.enum || sch['x-enum-action']) {
        if (type == 'array') {
          type = 'checkbox-group';
        } else {
          type = 'select';
        }
      } else if (type == 'boolean') {
        type = 'switch';
      } else if (type == 'integer' || type == 'number') {
        type = 'input-number';
      } else if (type == 'array' && this.schema.items.format == 'date-time') {
        type = 'daterange';
      } else if (sch.format == 'date-time') {
        type = 'datetime';
      } else if (sch['x-ui-multiline']) {
        type = 'textarea';
      } else if (type == 'address') {
        type = 'address';
      } else {
        type = 'input';
      }

      var compName = 'oa-' + type; //var comp = Vue.component(compName)

      var comp = src.components[compName];

      if (!comp) {
        comp = function comp(resolve, reject) {
          external_commonjs_vue_commonjs2_vue_root_Vue_default.a.$loadComponent({
            name: compName,
            path: abp.appPath + 'lib/vueforms/' + type + '.js',
            onLoad: resolve,
            onError: reject
          });
        };
      }

      return comp;
    },
    model: {
      get: function get() {
        return this.value;
      },
      set: function set(val) {
        this.$emit('input', val);
      }
    },
    label: function label() {
      var name = this.schema.title ? this.schema.title : this.prop.capitalize();
      if (this.messages && this.messages[name]) return this.messages[name];else return this.schema.title ? this.schema.title : name;
    }
  },
  methods: {
    propChange: function propChange(key, value) {
      this.$emit('propChange', key, value);
    }
  }
});
// CONCATENATED MODULE: ./src/components/field.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_fieldvue_type_script_lang_js_ = (fieldvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/field.vue





/* normalize component */

var field_component = normalizeComponent(
  components_fieldvue_type_script_lang_js_,
  fieldvue_type_template_id_53042832_render,
  fieldvue_type_template_id_53042832_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var field = (field_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"C://sacha//vue//vuecrud//node_modules//.cache//vue-loader","cacheIdentifier":"2c4efe34-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/filterform.vue?vue&type=template&id=7c1f51ca&
var filterformvue_type_template_id_7c1f51ca_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('el-form',{ref:"form",attrs:{"model":_vm.model,"rules":_vm.rules,"label-width":_vm.labelwidth,"inline":!_vm.isMobile,"label-position":_vm.labelPosition}},[_vm._l((_vm.fields),function(value,key){return _c('oa-field',{key:key,attrs:{"prop":key,"schema":_vm.properties[key],"messages":_vm.messages,"service":_vm.service},on:{"propChange":_vm.propChange},model:{value:(_vm.model[key]),callback:function ($$v) {_vm.$set(_vm.model, key, $$v)},expression:"model[key]"}})}),_c('el-form-item',_vm._l((_vm.actions),function(action){return _c('el-button',{key:action.name,attrs:{"size":"small","icon":action.icon,"type":action.type},on:{"click":function($event){action.execute()}}},[_vm._v(_vm._s(action.name))])}))],2)}
var filterformvue_type_template_id_7c1f51ca_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/filterform.vue?vue&type=template&id=7c1f51ca&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/components/filterform.vue?vue&type=script&lang=js&

//
//
//
//
//
//
//
//
//
/* harmony default export */ var filterformvue_type_script_lang_js_ = ({
  name: 'oa-filter-form',
  props: {
    model: {},
    schema: {},
    service: {},
    options: {},
    messages: {},
    actions: {},
    columns: {}
  },
  data: function data() {
    return {};
  },
  computed: {
    properties: function properties() {
      return this.schema.properties;
    },
    fields: function fields() {
      if (this.options) {
        return this.options.fields;
      } else {
        var fields = {};

        for (var key in this.schema.properties) {
          if (key != 'id' && !this.schema.properties[key].readonly && !this.schema.properties[key]['x-rel-app'] && !this.schema.properties[key]['x-rel-to-many-app']) {
            fields[key] = this.schema.properties[key];
          }
        }

        return fields;
      }
    },
    rules: function rules() {
      var rules = {};

      for (var key in this.schema.properties) {
        //var prop = this.schema.properties[key]
        var itemRules = [];
        rules[key] = itemRules;
      }

      return rules;
    },
    isMobile: function isMobile() {
      return window.matchMedia('only screen and (max-width: 760px)').matches;
    },
    labelPosition: function labelPosition() {
      return this.isMobile ? 'top' : 'right';
    },
    labelwidth: function labelwidth() {
      return this.isMobile ? '100px' : '';
    }
  },
  methods: {
    validate: function validate(callback) {
      this.$refs.form.validate(function (valid) {
        if (callback) callback(valid);
      });
    },
    submitForm: function submitForm() {
      this.$refs.form.validate(function (valid) {
        if (valid) {
          alert('submit!');
        } else {
          return false;
        }
      });
    },
    resetForm: function resetForm() {
      this.$refs.form.resetFields();
    },
    label: function label(name) {
      // var name = this.schema.properties[prop].title ? this.schema.properties[prop].title : prop.capitalize();
      if (this.messages && this.messages[name]) return this.messages[name];else return name;
    },
    propChange: function propChange(key, value) {
      this.$set(this.model, key, value);
    }
    /*
            created: function(){
                  for (key in this.fields) {
                    if (this.fields[key].type == "string"){
                        Vue.set(this.model, key, "");
                    } else if (this.fields[key].type == "int") {
                        Vue.set(this.model, key, 0);
                    }
                }
              }
            */

  }
});
// CONCATENATED MODULE: ./src/components/filterform.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_filterformvue_type_script_lang_js_ = (filterformvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/filterform.vue





/* normalize component */

var filterform_component = normalizeComponent(
  components_filterformvue_type_script_lang_js_,
  filterformvue_type_template_id_7c1f51ca_render,
  filterformvue_type_template_id_7c1f51ca_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var filterform = (filterform_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"C://sacha//vue//vuecrud//node_modules//.cache//vue-loader","cacheIdentifier":"2c4efe34-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/form.vue?vue&type=template&id=75203564&
var formvue_type_template_id_75203564_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('el-form',{ref:"form",attrs:{"model":_vm.model,"rules":_vm.rules,"label-width":"120px","label-position":_vm.labelPosition}},[(Object.keys(_vm.tabs).length > 1)?_c('el-tabs',{attrs:{"value":Object.keys(_vm.tabs)[0]}},_vm._l((_vm.tabs),function(gvalue,gkey){return _c('el-tab-pane',{key:gkey,attrs:{"label":_vm.label(gkey),"name":gkey}},_vm._l((gvalue),function(value,key){return _c('oa-field',{key:key,attrs:{"prop":key,"schema":_vm.properties[key],"messages":_vm.messages,"service":_vm.service},on:{"propChange":_vm.propChange},model:{value:(_vm.model[key]),callback:function ($$v) {_vm.$set(_vm.model, key, $$v)},expression:"model[key]"}})}))})):_vm._l((_vm.fields),function(value,key){return _c('oa-field',{key:key,attrs:{"prop":key,"schema":_vm.properties[key],"messages":_vm.messages,"service":_vm.service},on:{"propChange":_vm.propChange},model:{value:(_vm.model[key]),callback:function ($$v) {_vm.$set(_vm.model, key, $$v)},expression:"model[key]"}})}),_c('el-form-item',_vm._l((_vm.actions),function(action){return _c('el-button',{key:action.name,attrs:{"size":"small","type":action.type},on:{"click":function($event){action.execute()}}},[_vm._v(_vm._s(action.name))])}))],2)}
var formvue_type_template_id_75203564_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/form.vue?vue&type=template&id=75203564&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/components/form.vue?vue&type=script&lang=js&

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

/* harmony default export */ var formvue_type_script_lang_js_ = ({
  name: 'oa-form',
  props: {
    model: {},
    schema: {},
    options: {},
    messages: {},
    actions: {},
    columns: {},
    service: {}
  },
  data: function data() {
    return {};
  },
  computed: {
    properties: function properties() {
      return this.schema.properties;
    },
    fields: function fields() {
      if (this.options) {
        return this.options.fields;
      } else {
        var fields = {};

        for (var key in this.schema.properties) {
          if (this.columns) {
            if (this.columns.indexOf(key) > 0) {
              fields[key] = this.schema.properties[key];
            }
          } else {
            if (key != 'id' && !this.schema.properties[key].readonly && !this.schema.properties[key]['x-rel-app'] && !this.schema.properties[key]['x-rel-to-many-app']) {
              fields[key] = this.schema.properties[key];
            }
          }
        }

        return fields;
      }
    },
    rules: function rules() {
      var rules = {};

      for (var key in this.schema.properties) {
        var prop = this.schema.properties[key];
        var itemRules = [];

        if (prop.required && prop.type != 'object') {
          itemRules.push({
            required: true,
            message: 'Please input a value'
          });
          rules[key] = itemRules;
        }
      }

      if (this.schema.required) {
        for (var i = 0; i < this.schema.required.length; i++) {
          var prop = this.schema.required[i];
          var itemRules = rules[prop];

          if (!itemRules) {
            itemRules = [];
            rules[prop] = itemRules;
          }

          if (!itemRules) {
            itemRules = [];
            rules[key] = itemRules;
          }

          itemRules.push({
            required: true,
            message: 'Please input a value'
          });
        }
      }

      return rules;
    },
    tabs: function tabs() {
      var groups = {};

      for (var key in this.fields) {
        var el = this.fields[key];
        var group = el['x-ui-group'];

        if (group in groups == false) {
          groups[group] = {};
        }

        groups[group][key] = el;
      }

      ;
      return groups;
    },
    isMobile: function isMobile() {
      return window.matchMedia('only screen and (max-width: 760px)').matches;
    },
    labelPosition: function labelPosition() {
      return this.isMobile ? 'top' : 'right';
    }
  },
  methods: {
    validate: function validate(callback) {
      this.$refs.form.validate(function (valid) {
        if (callback) callback(valid);
      });
    },
    submitForm: function submitForm(formName) {
      this.$refs.form.validate(function (valid) {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm: function resetForm() {
      this.$refs.form.resetFields();
    },
    label: function label(name) {
      // var name = this.schema.properties[prop].title ? this.schema.properties[prop].title : prop.capitalize();
      if (this.messages && this.messages[name]) {
        return this.messages[name];
      } else {
        return name;
      }
    },
    propChange: function propChange(key, value) {
      this.$set(this.model, key, value);
    }
  }
});
// CONCATENATED MODULE: ./src/components/form.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_formvue_type_script_lang_js_ = (formvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/form.vue





/* normalize component */

var form_component = normalizeComponent(
  components_formvue_type_script_lang_js_,
  formvue_type_template_id_75203564_render,
  formvue_type_template_id_75203564_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var components_form = (form_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"C://sacha//vue//vuecrud//node_modules//.cache//vue-loader","cacheIdentifier":"2c4efe34-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/formitem.vue?vue&type=template&id=61aad5c4&
var formitemvue_type_template_id_61aad5c4_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('el-form-item',{attrs:{"label":_vm.label,"prop":_vm.prop}},[_vm._t("default"),_vm._t("footer")],2)}
var formitemvue_type_template_id_61aad5c4_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/formitem.vue?vue&type=template&id=61aad5c4&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/components/formitem.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
/* harmony default export */ var formitemvue_type_script_lang_js_ = ({
  name: 'oa-form-item',
  props: {
    label: {},
    prop: String,
    messages: Object
  },
  components: {},
  computed: {},
  methods: {}
});
// CONCATENATED MODULE: ./src/components/formitem.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_formitemvue_type_script_lang_js_ = (formitemvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/formitem.vue





/* normalize component */

var formitem_component = normalizeComponent(
  components_formitemvue_type_script_lang_js_,
  formitemvue_type_template_id_61aad5c4_render,
  formitemvue_type_template_id_61aad5c4_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var formitem = (formitem_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"C://sacha//vue//vuecrud//node_modules//.cache//vue-loader","cacheIdentifier":"2c4efe34-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/grid.vue?vue&type=template&id=49438bfe&
var gridvue_type_template_id_49438bfe_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[(!_vm.isMobile)?_c('el-table',{staticStyle:{"width":"100%"},attrs:{"data":_vm.model,"row-style":{cursor: 'pointer'}},on:{"row-click":_vm.rowClick}},[_vm._l((_vm.columns),function(value,key){return _c('el-table-column',{key:key,attrs:{"prop":key,"label":_vm.label(key),"formatter":_vm.formatter,"class-name":"crudcell"}})}),_c('el-table-column',{attrs:{"align":"right","min-width":"120px"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return _vm._l((_vm.actions),function(action){return _c('el-button',{directives:[{name:"show",rawName:"v-show",value:(_vm.actionVisible(action, scope.row, scope.$index)),expression:"actionVisible(action, scope.row, scope.$index)"}],key:action.name,attrs:{"icon":action.icon,"size":"small"},on:{"click":function($event){action.execute(scope.row, scope.$index)}}})})}}])})],2):_vm._l((_vm.model),function(row){return _c('el-card',{key:row.id,staticStyle:{"margin-bottom":"10px"}},[_vm._l((_vm.columns),function(value,key){return _c('el-row',{key:key,attrs:{"gutter":10}},[_c('el-col',{attrs:{"span":12}},[_vm._v(_vm._s(_vm.label(key)))]),_c('el-col',{attrs:{"span":12}},[_vm._v(_vm._s(row[key]))])],1)}),_c('div',{staticStyle:{"padding-top":"10px"}},_vm._l((_vm.actions),function(action){return _c('el-button',{directives:[{name:"show",rawName:"v-show",value:(_vm.actionVisible(action, row)),expression:"actionVisible(action, row)"}],key:action.name,attrs:{"icon":action.icon,"size":"small"},on:{"click":function($event){action.execute(row)}}})}))],2)})],2)}
var gridvue_type_template_id_49438bfe_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/grid.vue?vue&type=template&id=49438bfe&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/components/grid.vue?vue&type=script&lang=js&

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

/* harmony default export */ var gridvue_type_script_lang_js_ = ({
  name: 'oa-grid',
  props: {
    model: {},
    schema: {},
    messages: {},
    actions: {},
    defaultAction: {}
  },
  computed: {
    columns: function columns() {
      var fields = {};

      for (var key in this.schema.properties) {
        if (key != 'id' && this.schema.properties[key].type != 'array' && (!this.schema.properties[key].hasOwnProperty('x-ui-grid') || this.schema.properties[key]['x-ui-grid'])) {
          fields[key] = this.schema.properties[key];
        }
      }

      return fields;
    },
    isMobile: function isMobile() {
      return vueforms.isMobile();
    }
  },
  methods: {
    label: function label(prop) {
      var name = this.schema.properties[prop].title ? this.schema.properties[prop].title : prop.capitalize();

      if (this.messages && this.messages[name]) {
        return this.messages[name];
      } else {
        return name;
      }
    },
    formatter: function formatter(row, column, cellValue) {
      var schema = vueforms.jsonSchema.getNotNull(this.schema.properties[column.property]);

      if (schema.type == 'boolean') {
        return cellValue ? this.messages['Yes'] : this.messages['No'];
      } else if (schema.format == 'date-time') {
        if (!cellValue) return '';
        return moment(cellValue).locale('fr').format('lll');
      } else if (schema.enum) {
        var i = schema.enum.indexOf(cellValue);
        return this.messages[schema['x-enumNames'][i]] ? this.messages[schema['x-enumNames'][i]] : schema['x-enumNames'][i];
      }

      return cellValue;
    },
    rowClick: function rowClick(row, event, column) {
      if (column.label) {
        this.defaultAction.execute(row, event, column);
      }
    },
    actionVisible: function actionVisible(action, row, index) {
      if (action.visible) {
        return action.visible(row, index);
      } else {
        return true;
      }
    }
  }
});
// CONCATENATED MODULE: ./src/components/grid.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_gridvue_type_script_lang_js_ = (gridvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/grid.vue





/* normalize component */

var grid_component = normalizeComponent(
  components_gridvue_type_script_lang_js_,
  gridvue_type_template_id_49438bfe_render,
  gridvue_type_template_id_49438bfe_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var grid = (grid_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"C://sacha//vue//vuecrud//node_modules//.cache//vue-loader","cacheIdentifier":"2c4efe34-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/input.vue?vue&type=template&id=21cb54c6&
var inputvue_type_template_id_21cb54c6_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('el-input',{model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v},expression:"model"}})}
var inputvue_type_template_id_21cb54c6_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/input.vue?vue&type=template&id=21cb54c6&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/components/input.vue?vue&type=script&lang=js&
//
//
//
//
/* harmony default export */ var inputvue_type_script_lang_js_ = ({
  name: 'oa-input',
  props: {
    value: String,
    schema: {},
    prop: String,
    options: {}
  },
  computed: {
    model: {
      get: function get() {
        return this.value;
      },
      set: function set(val) {
        this.$emit('input', val);
      }
    }
  }
});
// CONCATENATED MODULE: ./src/components/input.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_inputvue_type_script_lang_js_ = (inputvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/input.vue





/* normalize component */

var input_component = normalizeComponent(
  components_inputvue_type_script_lang_js_,
  inputvue_type_template_id_21cb54c6_render,
  inputvue_type_template_id_21cb54c6_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var input = (input_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"C://sacha//vue//vuecrud//node_modules//.cache//vue-loader","cacheIdentifier":"2c4efe34-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/inputnumber.vue?vue&type=template&id=35cafac8&
var inputnumbervue_type_template_id_35cafac8_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('el-input-number',{model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v},expression:"model"}})}
var inputnumbervue_type_template_id_35cafac8_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/inputnumber.vue?vue&type=template&id=35cafac8&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.number.constructor.js
var es6_number_constructor = __webpack_require__("c5f6");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/components/inputnumber.vue?vue&type=script&lang=js&

//
//
//
//

/* harmony default export */ var inputnumbervue_type_script_lang_js_ = ({
  name: 'oa-inputnumber',
  props: {
    value: Number,
    schema: {},
    prop: String,
    options: {}
  },
  computed: {
    model: {
      get: function get() {
        return this.value;
      },
      set: function set(val) {
        this.$emit('input', val);
      }
    }
  }
});
// CONCATENATED MODULE: ./src/components/inputnumber.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_inputnumbervue_type_script_lang_js_ = (inputnumbervue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/inputnumber.vue





/* normalize component */

var inputnumber_component = normalizeComponent(
  components_inputnumbervue_type_script_lang_js_,
  inputnumbervue_type_template_id_35cafac8_render,
  inputnumbervue_type_template_id_35cafac8_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var inputnumber = (inputnumber_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"C://sacha//vue//vuecrud//node_modules//.cache//vue-loader","cacheIdentifier":"2c4efe34-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/relationtomany.vue?vue&type=template&id=01822702&
var relationtomanyvue_type_template_id_01822702_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('el-select',{attrs:{"multiple":"","value":_vm.model,"value-key":_vm.relationValueField,"filterable":"","clearable":"","remote":"","remote-method":_vm.remoteMethod,"loading":_vm.loading},on:{"input":_vm.updateModel,"clear":_vm.clear}},_vm._l((_vm.computedOptions),function(item){return _c('el-option',{key:item.value.id,attrs:{"label":item.label,"value":item.value}})})),(_vm.relationResource)?_c('el-button',{attrs:{"icon":_vm.buttonIcon},on:{"click":_vm.edit}}):_vm._e(),_vm._t("footer"),(_vm.relationResource)?_c('el-dialog',{ref:"customerDialog",attrs:{"title":"Client","visible":_vm.dialogVisible,"fullscreen":_vm.fullscreen,"before-close":_vm.handleClose,"append-to-body":true},on:{"update:visible":function($event){_vm.dialogVisible=$event},"open":_vm.openDialog,"close":_vm.closeDialog}},[_c('oa-dialog-form',{ref:"form",attrs:{"resource":_vm.relationResource},on:{"close":_vm.close},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v},expression:"model"}})],1):_vm._e()],2)}
var relationtomanyvue_type_template_id_01822702_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/relationtomany.vue?vue&type=template&id=01822702&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.array.find-index.js
var es6_array_find_index = __webpack_require__("20d6");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/components/relationtomany.vue?vue&type=script&lang=js&

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
/* harmony default export */ var relationtomanyvue_type_script_lang_js_ = ({
  name: 'oa-relation-to-many',
  props: {
    value: {},
    schema: {},
    messages: Object,
    service: {},
    prop: String,
    label: String
  },
  data: function data() {
    //var self = this
    return {
      form: {},
      loading: false,
      dialogVisible: false,
      options: null
    };
  },
  computed: {
    relationResource: function relationResource() {
      return this.schema['x-rel-to-many-app'];
    },
    relationAction: function relationAction() {
      return this.schema['x-rel-to-many-action'] || 'get' + this.prop.capitalize() + 's';
    },
    relationValueField: function relationValueField() {
      return this.schema['x-rel-to-many-valuefield'] || 'id';
    },
    relationTextField: function relationTextField() {
      return this.schema['x-rel-to-many-textfield'] || 'fullName';
    },
    id: function id() {
      return this.value ? this.value[this.relationValueField] : null;
    },
    isnew: function isnew() {
      return !this.value;
    },
    // schema: function() {
    //    if (this.isnew)
    //        return jref.resolve(abp.schemas.app[this.resource].create.input).properties[this.prop];
    //    else
    //        return jref.resolve(abp.schemas.app[this.resource].update.input).properties[this.prop];
    // },
    model: {
      get: function get() {
        return this.value;
      },
      set: function set(val) {
        this.$emit('input', val);
      }
    },
    isMobile: function isMobile() {
      return window.matchMedia('only screen and (max-width: 760px)').matches;
    },
    fullscreen: function fullscreen() {
      return this.isMobile;
    },
    buttonIcon: function buttonIcon() {
      return this.isnew ? 'el-icon-plus' : 'el-icon-edit';
    },
    computedOptions: function computedOptions() {
      var baseOptions = [];

      if (this.value) {
        baseOptions = this.value.map(function (t) {
          return {
            label: t[this.relationTextField],
            value: t
          };
        }.bind(this));
      }

      if (this.options) {
        var retval = baseOptions.concat(this.options); // Remove duplicates

        retval = retval.filter(function (item, index, arr) {
          var firstIndex = arr.findIndex(function (element) {
            return element.value[this.relationValueField] == item.value[this.relationValueField];
          }.bind(this));
          if (firstIndex == index) return item;
        }.bind(this));
        return retval;
      }

      if (baseOptions.length <= 0) return null;
      return baseOptions;
    }
  },
  // watch: {
  //    value: function (val, oldVal) {
  //        var self = this;
  //        if (val) {
  //            this.options= [{ label: self.value[self.relationTextField], value: val }];
  //        }
  //    }
  // },
  methods: {
    remoteMethod: function remoteMethod(query) {
      var self = this;

      if (!query && self.value) {
        // this.options.push({ label: self.value[self.relationTextField], value: this.value });
        this.options = null;
      } else if (query && query !== '' && (!self.value || query != self.value[self.relationTextField])) {
        self.loading = true;
        self.service[self.relationAction](query).done(function (data) {
          self.options = data.items.map(function (t) {
            // return { label: t.firstname + " " + t.lastname, value: t.id };
            return {
              label: t[self.relationTextField],
              value: t
            };
          });
          self.loading = false;
        }).always(function () {// abp.ui.clearBusy(_$app);
        });
      } else if (query == '') {
        this.options = null;
      }
    },
    clear: function clear() {
      // this.form.customerId = null;
      this.model = null;
    },
    edit: function edit() {
      this.dialogVisible = true;
      if (this.$refs.form) this.$refs.form.fetchData();
    },
    handleClose: function handleClose(done) {
      done();
    },
    close: function close(model) {
      var self = this;
      this.dialogVisible = false;

      if (model) {
        this.model = model; // this.options = [{ label: model[self.relationTextField], value: model }];

        this.options = null;
      }
    },
    updateModel: function updateModel(value) {
      this.model = value; // this.$emit('input', value);
    },
    openDialog: function openDialog() {
      if (this.fullscreen) {
        // document.body.style.position = 'fixed'; // for ios cursor bug
        document.body.classList.add('dialog-open');
      }
    },
    closeDialog: function closeDialog() {
      if (this.fullscreen) {
        // document.body.style.position = ''; // for ios cursor bug
        document.body.classList.remove('dialog-open');
      }
    } // },
    // created: function () {
    //    var self = this;
    //    if (this.value) {
    //        this.options = [{ label: self.value[self.relationTextField], value: this.value }];
    //    }

  }
});
// CONCATENATED MODULE: ./src/components/relationtomany.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_relationtomanyvue_type_script_lang_js_ = (relationtomanyvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/relationtomany.vue





/* normalize component */

var relationtomany_component = normalizeComponent(
  components_relationtomanyvue_type_script_lang_js_,
  relationtomanyvue_type_template_id_01822702_render,
  relationtomanyvue_type_template_id_01822702_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var relationtomany = (relationtomany_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"C://sacha//vue//vuecrud//node_modules//.cache//vue-loader","cacheIdentifier":"2c4efe34-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/relation.vue?vue&type=template&id=5b31cba6&
var relationvue_type_template_id_5b31cba6_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('el-select',{attrs:{"value-key":_vm.relationValueField,"filterable":"","clearable":"","remote":"","remote-method":_vm.remoteMethod,"loading":_vm.loading},on:{"clear":_vm.clear},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v},expression:"model"}},_vm._l((_vm.options),function(item){return _c('el-option',{key:item.value.id,attrs:{"label":item.label,"value":item.value}})})),(_vm.relationResource)?_c('el-button',{attrs:{"icon":_vm.buttonIcon},on:{"click":_vm.edit}}):_vm._e(),_vm._t("footer"),(_vm.relationResource)?_c('el-dialog',{ref:"customerDialog",attrs:{"title":"Client","visible":_vm.dialogVisible,"fullscreen":_vm.fullscreen,"before-close":_vm.handleClose,"append-to-body":true},on:{"update:visible":function($event){_vm.dialogVisible=$event},"open":_vm.openDialog,"close":_vm.closeDialog}},[_c('oa-dialog-form',{ref:"form",attrs:{"resource":_vm.relationResource},on:{"close":_vm.close},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v},expression:"model"}})],1):_vm._e()],2)}
var relationvue_type_template_id_5b31cba6_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/relation.vue?vue&type=template&id=5b31cba6&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/components/relation.vue?vue&type=script&lang=js&
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
/* harmony default export */ var relationvue_type_script_lang_js_ = ({
  name: 'oa-relation',
  props: {
    value: {},
    schema: {},
    messages: Object,
    service: {},
    prop: String,
    label: String
  },
  data: function data() {
    //var self = this
    return {
      form: {},
      loading: false,
      dialogVisible: false,
      options: []
    };
  },
  computed: {
    sch: function sch() {
      return this.schema.oneOf && this.schema.oneOf[0] ? this.schema.oneOf[0] : this.schema;
    },
    relationResource: function relationResource() {
      return this.sch['x-rel-app'];
    },
    relationAction: function relationAction() {
      return this.sch['x-rel-action'] || 'get' + this.prop.capitalize() + 's';
    },
    relationValueField: function relationValueField() {
      return this.sch['x-rel-valuefield'] || 'id';
    },
    relationTextField: function relationTextField() {
      return this.sch['x-rel-textfield'] || 'fullName';
    },
    id: function id() {
      return this.value ? this.value[this.relationValueField] : null;
    },
    isnew: function isnew() {
      return !this.value;
    },
    // schema: function() {
    //    if (this.isnew)
    //        return jref.resolve(abp.schemas.app[this.resource].create.input).properties[this.prop];
    //    else
    //        return jref.resolve(abp.schemas.app[this.resource].update.input).properties[this.prop];
    // },
    model: {
      get: function get() {
        return this.value;
      },
      set: function set(val) {
        this.$emit('input', val);
      }
    },
    isMobile: function isMobile() {
      return window.matchMedia('only screen and (max-width: 760px)').matches;
    },
    fullscreen: function fullscreen() {
      return this.isMobile;
    },
    buttonIcon: function buttonIcon() {
      return this.isnew ? 'el-icon-plus' : 'el-icon-edit';
    }
  },
  watch: {
    value: function value(val, oldVal) {
      var self = this;

      if (val) {
        this.options = [{
          label: self.value[self.relationTextField],
          value: val
        }];
      }
    }
  },
  methods: {
    remoteMethod: function remoteMethod(query) {
      var self = this;

      if (!query && self.value) {
        this.options.push({
          label: self.value[self.relationTextField],
          value: this.value
        });
      } else if (query && query !== '' && (!self.value || query != self.value[self.relationTextField])) {
        self.loading = true;
        self.service[self.relationAction](query).done(function (data) {
          self.options = data.items.map(function (t) {
            // return { label: t.firstname + " " + t.lastname, value: t.id };
            return {
              label: t[self.relationTextField],
              value: t
            };
          });
          self.loading = false;
        }).always(function () {// abp.ui.clearBusy(_$app);
        });
      } else if (query == '') {
        this.options = [];
      }
    },
    clear: function clear() {
      // this.form.customerId = null;
      this.model = null;
    },
    edit: function edit() {
      this.dialogVisible = true;
      if (this.$refs.form) this.$refs.form.fetchData();
    },
    handleClose: function handleClose(done) {
      done();
    },
    close: function close(model) {
      var self = this;
      this.dialogVisible = false;

      if (model) {
        this.model = model;
        this.options = [{
          label: model[self.relationTextField],
          value: model
        }];
      }
    },
    openDialog: function openDialog() {
      if (this.fullscreen) {
        // document.body.style.position = 'fixed'; // for ios cursor bug
        document.body.classList.add('dialog-open');
      }
    },
    closeDialog: function closeDialog() {
      if (this.fullscreen) {
        // document.body.style.position = ''; // for ios cursor bug
        document.body.classList.remove('dialog-open');
      }
    }
  },
  created: function created() {
    var self = this;

    if (this.value) {
      this.options = [{
        label: self.value[self.relationTextField],
        value: this.value
      }];
    }
  }
});
// CONCATENATED MODULE: ./src/components/relation.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_relationvue_type_script_lang_js_ = (relationvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/relation.vue





/* normalize component */

var relation_component = normalizeComponent(
  components_relationvue_type_script_lang_js_,
  relationvue_type_template_id_5b31cba6_render,
  relationvue_type_template_id_5b31cba6_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var relation = (relation_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"C://sacha//vue//vuecrud//node_modules//.cache//vue-loader","cacheIdentifier":"2c4efe34-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/select.vue?vue&type=template&id=55c31b5c&
var selectvue_type_template_id_55c31b5c_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('el-select',{attrs:{"placeholder":"Select"},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v},expression:"model"}},[(!_vm.hideNone)?_c('el-option',{attrs:{"label":_vm.noneLabel,"value":_vm.noneValue}}):_vm._e(),_vm._l((_vm.options),function(item){return _c('el-option',{key:item.value,attrs:{"label":item.label,"value":item.value}})})],2)}
var selectvue_type_template_id_55c31b5c_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/select.vue?vue&type=template&id=55c31b5c&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/components/select.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
/* harmony default export */ var selectvue_type_script_lang_js_ = ({
  name: 'oa-select',
  props: {
    value: {},
    schema: {},
    messages: Object,
    prop: String,
    service: {}
  },
  data: function data() {
    return {
      options: [],
      hideNone: false,
      noneLabel: 'None',
      noneValue: undefined
    };
  },
  computed: {
    model: {
      get: function get() {
        return this.value;
      },
      set: function set(val) {
        this.$emit('input', val);
      }
    }
  },
  created: function created() {
    var self = this;
    var sch = this.schema.oneOf && this.schema.oneOf[0] ? this.schema.oneOf[0] : this.schema;

    if (sch.enum) {
      for (var i = 0; i < sch.enum.length; i++) {
        var label = sch['x-enumNames'] ? sch['x-enumNames'][i] : this.prop + '_' + sch.enum[i];

        if (this.messages && this.messages[label]) {
          label = this.messages[label];
        }

        this.options.push({
          value: sch.enum[i],
          label: label
        });
      }
    } else if (sch['x-enum-action']) {
      var enumAction = this.schema['x-enum-action'];
      var enumValueField = this.schema['x-enum-valuefield'] || 'id';
      var enumTextField = this.schema['x-enum-textfield'] || 'fullName';
      self.service[enumAction]().done(function (data) {
        self.options = data.map(function (p) {
          return {
            value: p[enumValueField],
            label: p[enumTextField]
          };
        });
      }).always(function () {});
    }

    if (sch['x-enum-nonelabel']) {
      this.noneLabel = sch['x-enum-nonelabel'];

      if (this.messages && this.messages[this.noneLabel]) {
        this.noneLabel = this.messages[this.noneLabel];
      }
    }

    if (sch['x-enum-hideNone']) {
      this.hideNone = sch['x-enum-hideNone'];
    }
  }
});
// CONCATENATED MODULE: ./src/components/select.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_selectvue_type_script_lang_js_ = (selectvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/select.vue





/* normalize component */

var select_component = normalizeComponent(
  components_selectvue_type_script_lang_js_,
  selectvue_type_template_id_55c31b5c_render,
  selectvue_type_template_id_55c31b5c_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var components_select = (select_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"C://sacha//vue//vuecrud//node_modules//.cache//vue-loader","cacheIdentifier":"2c4efe34-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/switch.vue?vue&type=template&id=78795dce&
var switchvue_type_template_id_78795dce_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('el-switch',{attrs:{"on-text":"","off-text":""},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v},expression:"model"}})}
var switchvue_type_template_id_78795dce_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/switch.vue?vue&type=template&id=78795dce&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/components/switch.vue?vue&type=script&lang=js&
//
//
//
//

/* harmony default export */ var switchvue_type_script_lang_js_ = ({
  name: 'oa-switch',
  props: {
    value: Boolean,
    schema: {},
    prop: String,
    options: {}
  },
  computed: {
    model: {
      get: function get() {
        return this.value;
      },
      set: function set(val) {
        this.$emit('input', val);
      }
    }
  }
});
// CONCATENATED MODULE: ./src/components/switch.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_switchvue_type_script_lang_js_ = (switchvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/switch.vue





/* normalize component */

var switch_component = normalizeComponent(
  components_switchvue_type_script_lang_js_,
  switchvue_type_template_id_78795dce_render,
  switchvue_type_template_id_78795dce_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var components_switch = (switch_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"C://sacha//vue//vuecrud//node_modules//.cache//vue-loader","cacheIdentifier":"2c4efe34-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/textarea.vue?vue&type=template&id=ba62e152&
var textareavue_type_template_id_ba62e152_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('el-input',{attrs:{"type":"textarea","autosize":""},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v},expression:"model"}})}
var textareavue_type_template_id_ba62e152_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/textarea.vue?vue&type=template&id=ba62e152&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/components/textarea.vue?vue&type=script&lang=js&
//
//
//
//

/* harmony default export */ var textareavue_type_script_lang_js_ = ({
  name: 'oa-textarea',
  props: {
    value: String,
    schema: {},
    prop: String,
    options: {}
  },
  computed: {
    model: {
      get: function get() {
        return this.value;
      },
      set: function set(val) {
        this.$emit('input', val);
      }
    }
  }
});
// CONCATENATED MODULE: ./src/components/textarea.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_textareavue_type_script_lang_js_ = (textareavue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/textarea.vue





/* normalize component */

var textarea_component = normalizeComponent(
  components_textareavue_type_script_lang_js_,
  textareavue_type_template_id_ba62e152_render,
  textareavue_type_template_id_ba62e152_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var components_textarea = (textarea_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"C://sacha//vue//vuecrud//node_modules//.cache//vue-loader","cacheIdentifier":"2c4efe34-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/time.vue?vue&type=template&id=66da3953&
var timevue_type_template_id_66da3953_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('el-time-select',{attrs:{"picker-options":{start: _vm.start, step: _vm.step, end: _vm.end }},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v},expression:"model"}})}
var timevue_type_template_id_66da3953_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/time.vue?vue&type=template&id=66da3953&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/components/time.vue?vue&type=script&lang=js&
//
//
//
//
//
/* harmony default export */ var timevue_type_script_lang_js_ = ({
  name: 'oa-time',
  props: {
    value: {},
    schema: {},
    prop: String,
    options: {}
  },
  computed: {
    model: {
      get: function get() {
        return this.value;
      },
      set: function set(val) {
        this.$emit('input', val);
      }
    },
    start: function start() {
      return this.schema['x-ui-start'] ? this.schema['x-ui-start'] : '00:00';
    },
    step: function step() {
      return this.schema['x-ui-step'] ? this.schema['x-ui-step'] : '00:30';
    },
    end: function end() {
      return this.schema['x-ui-end'] ? this.schema['x-ui-end'] : '23:30';
    }
  }
});
// CONCATENATED MODULE: ./src/components/time.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_timevue_type_script_lang_js_ = (timevue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/time.vue





/* normalize component */

var time_component = normalizeComponent(
  components_timevue_type_script_lang_js_,
  timevue_type_template_id_66da3953_render,
  timevue_type_template_id_66da3953_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var time = (time_component.exports);
// CONCATENATED MODULE: ./src/index.js























var components = [address, checkboxGroup, crudform, crudgrid, daterange, dialogform, field, filterform, components_form, formitem, grid, input, inputnumber, relationtomany, relation, components_select, components_switch, components_textarea, time];

var install = function install(Vue) {
  components.map(function (component) {
    Vue.component(component.name, component);
  });

  Vue.$loadComponent = function (opts) {
    var script = document.createElement('script');

    opts.onLoad = opts.onLoad || function () {};

    opts.onError = opts.onError || function () {};

    script.src = opts.path;
    script.async = true;

    script.onload = function () {
      var component = Vue.component(opts.name);

      if (component) {
        opts.onLoad(component);
      } else {
        opts.onError();
      }
    };

    script.onerror = opts.onError;
    document.body.appendChild(script);
  };
};
/* istanbul ignore if */
// if (typeof window !== 'undefined' && window.Vue) {
//   install(window.Vue)
// }


String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

Array.prototype.groupBy = function (keyFunction) {
  var groups = {};
  this.forEach(function (el) {
    var key = keyFunction(el);

    if (key in groups == false) {
      groups[key] = [];
    }

    groups[key].push(el);
  });
  return Object.keys(groups).map(function (key) {
    return {
      key: key,
      values: groups[key]
    };
  });
};

var comps = {};
components.forEach(function (val) {
  comps[val.name] = val;
});
/* harmony default export */ var src = ({
  version: '2.0.0',
  install: install,
  components: comps
}); //const _default = module.exports;
//export { _default as default };
// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/entry-lib.js


/* harmony default export */ var entry_lib = __webpack_exports__["default"] = (src);



/***/ }),

/***/ "fdef":
/***/ (function(module, exports) {

module.exports = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';


/***/ })

/******/ });
});
//# sourceMappingURL=vuecrud.umd.js.map