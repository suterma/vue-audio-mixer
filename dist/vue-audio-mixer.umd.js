(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Demo = {}));
})(this, (function (exports) { 'use strict';

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
	var EventBus = {
	  $on: (...args) => instance.on(...args),
	  $once: (...args) => instance.once(...args),
	  $off: (...args) => instance.off(...args),
	  $emit: (...args) => instance.emit(...args)
	};

	var variables = {"knobTextColourDefault":"#000","knobTextColourDark":"#C0C0C0","marginBetweenChannelsSmall":"1","channelHeight":"200","meterHeight":"210","channelWidthSmall":"40","meterWidthSmall":"5","meterWidthBetweenSmall":"2","channelSliderThumbSizeSmall":"0.4","channelWidthMedium":"57","marginBetweenChannelsMedium":"2","meterWidthMedium":"10","meterWidthBetweenMedium":"5","channelSliderThumbSizeMedium":"0.6","masterChannelLabelBackgroundColour":"#000","channelLabelTextColour":"#FFFFFF","channelStripBackgroundColour":"#16191c","channelMuteButtonBackgroundColour":"#666B73","channelMuteButtonBackgroundColourActive":"#911","channelMuteButtonBorderColour":"#000","channelMuteButtonTextColourHover":"#FFF","channelMuteButtonTextColourActive":"#FFF","channelSoloButtonBackgroundColourActive":"#1cdd20","channelSoloButtonTextColourActive":"#FFF","channelPannerTextColour":"rgb(255, 255, 255)","loaderInnerColour":"#1d7a9c","loaderOuterColour":"#00a7cc","loaderTextColour":"#1d7a9c","sliderInputBackground":"repeating-linear-gradient(90deg, #000, #3b3e41 0.0625em, transparent 0.0625em, transparent 0.75em) no-repeat 50% 0.75em border-box, \r","sliderTrackColour":"#15181b","sliderThumbBackground":"radial-gradient(#ebe1e0 10%, rgba(235, 225, 224, 0.2) 10%, rgba(235, 225, 224, 0) 72%) no-repeat 50% 50%, radial-gradient(at 100% 50%, #e9dfde, #eae1de 71%, rgba(0, 0, 0, 0) 71%) no-repeat 2.5em 50%, linear-gradient(90deg, #e9dfde, #d0c8c6) no-repeat 100% 50%, radial-gradient(at 0 50%, #d0c6c5, #c6baba 71%, rgba(0, 0, 0, 0) 71%) no-repeat 0.75em 50%, linear-gradient(90deg, #e3d9d8, #d0c6c5) no-repeat 0 50%, linear-gradient(#cdc0c0, #fcf5ef, #fcf5ef, #cdc0c0)","progressBarBackgroundColour":"#4c4c4c","progressBarCursorColour":"#b6c8e1","transportTimeBackground":"#000","transportTimeTextColour":"#fff","transportButtonsColour":"#d5d5d5"};

	var script$7 = {
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

	/**
	 * Make a map and return a function for checking if a key
	 * is in that map.
	 * IMPORTANT: all calls of this function must be prefixed with
	 * \/\*#\_\_PURE\_\_\*\/
	 * So that rollup can tree-shake them if necessary.
	 */

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
	const EMPTY_ARR = [];
	const onRE = /^on[^a-z]/;
	const isOn = (key) => onRE.test(key);
	const extend = Object.assign;
	const isArray = Array.isArray;
	const isMap = (val) => toTypeString(val) === '[object Map]';
	const isSet = (val) => toTypeString(val) === '[object Set]';
	const isDate = (val) => toTypeString(val) === '[object Date]';
	const isFunction = (val) => typeof val === 'function';
	const isString = (val) => typeof val === 'string';
	const isSymbol = (val) => typeof val === 'symbol';
	const isObject = (val) => val !== null && typeof val === 'object';
	const objectToString = Object.prototype.toString;
	const toTypeString = (value) => objectToString.call(value);
	const isPlainObject = (val) => toTypeString(val) === '[object Object]';
	const invokeArrayFns = (fns, arg) => {
	    for (let i = 0; i < fns.length; i++) {
	        fns[i](arg);
	    }
	};

	function isReactive(value) {
	    if (isReadonly(value)) {
	        return isReactive(value["__v_raw" /* RAW */]);
	    }
	    return !!(value && value["__v_isReactive" /* IS_REACTIVE */]);
	}
	function isReadonly(value) {
	    return !!(value && value["__v_isReadonly" /* IS_READONLY */]);
	}
	function isProxy(value) {
	    return isReactive(value) || isReadonly(value);
	}
	function isRef(r) {
	    return !!(r && r.__v_isRef === true);
	}

	/**
	 * mark the current rendering instance for asset resolution (e.g.
	 * resolveComponent, resolveDirective) during render
	 */
	let currentRenderingInstance = null;
	let currentScopeId = null;

	const isSuspense = (type) => type.__isSuspense;
	/**
	 * Adds directives to a VNode.
	 */
	function withDirectives(vnode, directives) {
	    {
	        return vnode;
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

	const isTeleport = (type) => type.__isTeleport;

	const Fragment = Symbol(undefined);
	const Text = Symbol(undefined);
	const Comment = Symbol(undefined);
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
	function setupBlock(vnode) {
	    // save current block children on the block vnode
	    vnode.dynamicChildren =
	        currentBlock || EMPTY_ARR ;
	    // close block
	    closeBlock();
	    // a block is always going to be patched, so track it as a child of its
	    // parent block
	    if (currentBlock) {
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
	    // track vnode for block tree
	    if (// avoid a block node from tracking itself
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
	const createVNode = (_createVNode);
	function _createVNode(type, props = null, children = null, patchFlag = 0, dynamicProps = null, isBlockNode = false) {
	    if (!type || type === NULL_DYNAMIC_COMPONENT) {
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
	        if (!isBlockNode && currentBlock) {
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
	        children: children,
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
	function isClassComponent(value) {
	    return isFunction(value) && '__vccOpts' in value;
	}

	function addEventListener(el, event, handler, options) {
	    el.addEventListener(event, handler, options);
	}

	const getModelAssigner = (vnode) => {
	    const fn = vnode.props['onUpdate:modelValue'] ||
	        (false );
	    return isArray(fn) ? value => invokeArrayFns(fn, value) : fn;
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

	const _hoisted_1$6 = {
	  class: "vue-audio-mixer-slider",
	  ref: "vue-audio-mixer-slider"
	};
	const _hoisted_2$5 = /*#__PURE__*/createBaseVNode("div", { class: "vue-audio-mixer-fader-slider-track" }, null, -1);

	function render$7(_ctx, _cache, $props, $setup, $data, $options) {
	  return (openBlock(), createElementBlock("div", _hoisted_1$6, [
	    createBaseVNode("div", {
	      class: "vue-audio-mixer-fader-thumb",
	      onMousedown: _cache[0] || (_cache[0] = (...args) => ($options.startDrag && $options.startDrag(...args))),
	      onTouchstart: _cache[1] || (_cache[1] = (...args) => ($options.startDrag && $options.startDrag(...args))),
	      style: normalizeStyle({bottom: $options.thumbPosition})
	    }, null, 36),
	    _hoisted_2$5,
	    (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.rows, (p) => {
	      return (openBlock(), createElementBlock("div", {
	        class: "vue-audio-mixer-fader-slider-row",
	        style: normalizeStyle({ bottom: p + 'px' })
	      }, null, 4))
	    }), 256)),
	    (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.rows, (p) => {
	      return (openBlock(), createElementBlock("div", {
	        class: "vue-audio-mixer-fader-slider-row-right",
	        style: normalizeStyle({ bottom: p + 'px' })
	      }, null, 4))
	    }), 256))
	  ], 512))
	}

	script$7.render = render$7;

	var script$6 = {
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
	    Slider: script$7
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

	const _hoisted_1$5 = ["id", "height"];
	const _hoisted_2$4 = { class: "slider_value" };
	const _hoisted_3$4 = { class: "vue-audio-mixer-channel-mute-button" };
	const _hoisted_4$4 = /*#__PURE__*/createBaseVNode("span", { class: "vue-audio-mixer-channel-mute-button-label" }, "M", -1);
	const _hoisted_5$3 = {
	  key: 0,
	  class: "logo"
	};
	const _hoisted_6$1 = { class: "vue-audio-mixer-channel-solo-button" };
	const _hoisted_7$1 = /*#__PURE__*/createBaseVNode("span", { class: "vue-audio-mixer-channel-solo-button-label" }, "S", -1);
	const _hoisted_8$1 = { class: "vue-audio-mixer-channel-label" };
	const _hoisted_9$1 = { "data-label": "0" };

	function render$6(_ctx, _cache, $props, $setup, $data, $options) {
	  const _component_VueKnobControl = resolveComponent("VueKnobControl");
	  const _component_Slider = resolveComponent("Slider");

	  return (openBlock(), createElementBlock("div", {
	    class: normalizeClass(["vue-audio-mixer-channel", {'with-panner':$props.mixerVars.show_pan}])
	  }, [
	    createBaseVNode("div", {
	      class: normalizeClass(["vue-audio-mixer-channel-panner-container", {'vue-audio-mixer-is-master':$props.isMaster}])
	    }, [
	      ($props.mixerVars.show_pan)
	        ? (openBlock(), createBlock(_component_VueKnobControl, {
	            key: 0,
	            min: -90,
	            max: 90,
	            size: $options.pannerSize,
	            "stroke-width": 7,
	            modelValue: _ctx.pan,
	            "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((_ctx.pan) = $event)),
	            class: "vue-audio-mixer-channel-panner",
	            primaryColor: "#c40303",
	            secondaryColor: "#adadad",
	            textColor: $options.knobTextColour
	          }, null, 8, ["size", "modelValue", "textColor"]))
	        : createCommentVNode("", true)
	    ], 2),
	    createBaseVNode("canvas", {
	      id: 'canvas'+_ctx._uid,
	      width: "25",
	      height: _ctx.meterHeight,
	      style: {"display":"block"},
	      class: "vue-audio-mixer-channel-meter-canvas"
	    }, null, 8, _hoisted_1$5),
	    createBaseVNode("div", _hoisted_2$4, toDisplayString($options.formattedGain), 1),
	    createVNode(_component_Slider, {
	      modelValue: _ctx.gain,
	      "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => ((_ctx.gain) = $event)),
	      onInput: $options.changeGain
	    }, null, 8, ["modelValue", "onInput"]),
	    withDirectives(createBaseVNode("div", _hoisted_3$4, [
	      createBaseVNode("label", null, [
	        withDirectives(createBaseVNode("input", {
	          "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => ((_ctx.mute) = $event)),
	          type: "checkbox"
	        }, null, 512), [
	          [vModelCheckbox, _ctx.mute]
	        ]),
	        _hoisted_4$4
	      ])
	    ], 512), [
	      [vShow, $props.showMute]
	    ]),
	    ($props.isMaster && !$props.showMute)
	      ? (openBlock(), createElementBlock("div", _hoisted_5$3))
	      : createCommentVNode("", true),
	    withDirectives(createBaseVNode("div", _hoisted_6$1, [
	      createBaseVNode("label", null, [
	        withDirectives(createBaseVNode("input", {
	          "onUpdate:modelValue": _cache[3] || (_cache[3] = $event => ((_ctx.soloModel) = $event)),
	          type: "checkbox"
	        }, null, 512), [
	          [vModelCheckbox, _ctx.soloModel]
	        ]),
	        _hoisted_7$1
	      ])
	    ], 512), [
	      [vShow, !$props.isMaster]
	    ]),
	    createBaseVNode("div", _hoisted_8$1, [
	      createBaseVNode("label", _hoisted_9$1, toDisplayString($props.title), 1)
	    ])
	  ], 2))
	}

	script$6.render = render$6;

	var script$5 = {
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
	  components:{Channel: script$6},
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

	function render$5(_ctx, _cache, $props, $setup, $data, $options) {
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
	      }, null, 8, ["index", "trackIndex", "title", "defaultPan", "defaultMuted", "defaultGain", "onGainChange", "onMuteChange", "onSoloChange", "onPanChange", "leftAnalyser", "rightAnalyser", "scriptProcessorNode", "mixerVars"]))
	    : createCommentVNode("", true)
	}

	script$5.render = render$5;

	var script$4 = {
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

	const _hoisted_1$4 = { class: "vue-audio-mixer-timer" };
	const _hoisted_2$3 = {
	  key: 0,
	  class: "vue-audio-mixer-timer-number"
	};
	const _hoisted_3$3 = { key: 1 };
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

	function render$4(_ctx, _cache, $props, $setup, $data, $options) {
	  return (openBlock(), createElementBlock("div", _hoisted_1$4, [
	    createBaseVNode("span", {
	      class: normalizeClass(["vue-audio-mixer-progress-time", {'vue-audio-mixer-show-total-time':$props.mixerVars.show_total_time}])
	    }, [
	      ($options.showMins)
	        ? (openBlock(), createElementBlock("span", _hoisted_2$3, toDisplayString($options.progressFormatted[0]), 1))
	        : createCommentVNode("", true),
	      ($options.showMins)
	        ? (openBlock(), createElementBlock("span", _hoisted_3$3, ":"))
	        : createCommentVNode("", true),
	      createBaseVNode("span", _hoisted_4$3, toDisplayString($options.progressFormatted[1]), 1),
	      _hoisted_5$2,
	      createBaseVNode("span", _hoisted_6, toDisplayString($options.progressFormatted[2]), 1),
	      ($props.mixerVars.show_total_time)
	        ? (openBlock(), createElementBlock("span", _hoisted_7, " / "))
	        : createCommentVNode("", true),
	      ($props.mixerVars.show_total_time)
	        ? (openBlock(), createElementBlock("span", _hoisted_8, [
	            ($options.showMins)
	              ? (openBlock(), createElementBlock("span", _hoisted_9, toDisplayString($options.totalLength[0]) + ":", 1))
	              : createCommentVNode("", true),
	            createBaseVNode("span", null, toDisplayString($options.totalLength[1]), 1),
	            _hoisted_10,
	            createBaseVNode("span", null, toDisplayString($options.totalLength[2]), 1)
	          ]))
	        : createCommentVNode("", true)
	    ], 2)
	  ]))
	}

	script$4.render = render$4;

	var script$3 = {
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

	const _hoisted_1$3 = /*#__PURE__*/createBaseVNode("canvas", {
	  width: "0",
	  height: "20",
	  id: "vue-audio-mixer-waveform"
	}, null, -1);

	function render$3(_ctx, _cache, $props, $setup, $data, $options) {
	  return (openBlock(), createElementBlock("div", null, [
	    createBaseVNode("div", {
	      class: "vue-audio-mixer-progress-bar",
	      ref: "vue-audio-mixer-progress-bar",
	      onMousedown: _cache[0] || (_cache[0] = (...args) => ($options.startDrag && $options.startDrag(...args)))
	    }, [
	      _hoisted_1$3,
	      createBaseVNode("div", {
	        class: "vue-audio-mixer-progress-cursor",
	        style: normalizeStyle({left: $options.progressBarPosition})
	      }, null, 4)
	    ], 544)
	  ]))
	}

	script$3.render = render$3;

	var script$2 = {
	  name: 'transportbuttons',
	  props: [
	      'playing'
	  ],
	  data : function(){       
	      return {
	      };
	  },

	};

	const _hoisted_1$2 = { class: "vue-audio-mixer-transport" };
	const _hoisted_2$2 = /*#__PURE__*/createBaseVNode("span", null, null, -1);
	const _hoisted_3$2 = /*#__PURE__*/createBaseVNode("span", null, null, -1);
	const _hoisted_4$2 = [
	  _hoisted_2$2,
	  _hoisted_3$2
	];

	function render$2(_ctx, _cache, $props, $setup, $data, $options) {
	  return (openBlock(), createElementBlock("div", _hoisted_1$2, [
	    createBaseVNode("button", {
	      type: "button",
	      class: normalizeClass(["vue-audio-mixer-transport-play-button", {'vue-audio-mixer-transport-play-button-active':$props.playing}]),
	      onClick: _cache[0] || (_cache[0] = $event => (_ctx.$emit('togglePlay')))
	    }, _hoisted_4$2, 2),
	    createBaseVNode("button", {
	      type: "button",
	      class: "vue-audio-mixer-transport-start-button",
	      onClick: _cache[1] || (_cache[1] = $event => (_ctx.$emit('stop')))
	    })
	  ]))
	}

	script$2.render = render$2;

	var script$1 = {
	  name: 'loader',
	  props: [
	      'percentLoaded'
	  ],
	  data : function(){       
	      return {
	      };
	  }

	};

	const _hoisted_1$1 = { class: "vue-audio-mixer-loader" };
	const _hoisted_2$1 = { class: "vue-audio-mixer-loader-text" };
	const _hoisted_3$1 = /*#__PURE__*/createTextVNode("Loading... ");
	const _hoisted_4$1 = /*#__PURE__*/createTextVNode("%");
	const _hoisted_5$1 = /*#__PURE__*/createBaseVNode("div", { class: "vue-audio-mixer-loader-inner" }, [
	  /*#__PURE__*/createBaseVNode("div"),
	  /*#__PURE__*/createBaseVNode("div")
	], -1);

	function render$1(_ctx, _cache, $props, $setup, $data, $options) {
	  return (openBlock(), createElementBlock("div", _hoisted_1$1, [
	    createBaseVNode("p", _hoisted_2$1, [
	      _hoisted_3$1,
	      createBaseVNode("span", null, toDisplayString($props.percentLoaded), 1),
	      _hoisted_4$1
	    ]),
	    _hoisted_5$1
	  ]))
	}

	script$1.render = render$1;

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

	var script = {
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
	    MixerChannel: script$5,
	    Channel: script$6,
	    Loader: script$1,
	    TimeDisplay: script$4,
	    TransportButtons: script$2,
	    ProgressBar: script$3
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
	      this.tracks[value.index].pan = parseFloat(value.pan);
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

	const _hoisted_1 = {
	  key: 0,
	  class: "vue-audio-mixer-error"
	};
	const _hoisted_2 = { class: "vue-audio-mixer-loading-hider" };
	const _hoisted_3 = {
	  class: "vue-audio-mixer-channel-strip",
	  ref: "channelstrip"
	};
	const _hoisted_4 = { class: "time_and_transport" };
	const _hoisted_5 = { class: "text-center" };

	function render(_ctx, _cache, $props, $setup, $data, $options) {
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
	      ? (openBlock(), createElementBlock("p", _hoisted_1, "Track " + toDisplayString(_ctx.track_load_error) + " failed to load. Check that the track is hosted on the same domain as the mixer, or that CORS is enabled on the track's hosting service.", 1))
	      : ($options.loading)
	        ? (openBlock(), createBlock(_component_Loader, {
	            key: 1,
	            percentLoaded: $options.loadingPercent
	          }, null, 8, ["percentLoaded"]))
	        : createCommentVNode("", true),
	    withDirectives(createBaseVNode("div", _hoisted_2, [
	      createBaseVNode("div", _hoisted_3, [
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
	            }, null, 8, ["title", "defaultPan", "hidden", "defaultGain", "defaultMuted", "context", "output", "url", "solodTracks", "trackIndex", "onPanChange", "onGainChange", "onMuteChange", "onSoloChange", "mixerVars"])), [
	              [vShow, !track.hidden]
	            ])
	          }), 128)),
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
	          }, null, 8, ["defaultPan", "defaultGain", "defaultMuted", "onMuteChange", "onGainChange", "onPanChange", "leftAnalyser", "rightAnalyser", "scriptProcessorNode", "mixerVars"])
	        ]),
	        createVNode(_component_ProgressBar, {
	          recording: _ctx.recording,
	          progressPercent: $options.progressPercent,
	          onPercent: $options.playFromPercent,
	          mixerVars: $options.mixerVars,
	          tracks: _ctx.tracks
	        }, null, 8, ["recording", "progressPercent", "onPercent", "mixerVars", "tracks"]),
	        createBaseVNode("div", _hoisted_4, [
	          createVNode(_component_TimeDisplay, {
	            progressTime: $options.progress,
	            totalTime: _ctx.totalDuration,
	            mixerVars: $options.mixerVars
	          }, null, 8, ["progressTime", "totalTime", "mixerVars"]),
	          createVNode(_component_TransportButtons, {
	            playing: _ctx.playing,
	            onStop: $options.stop,
	            onTogglePlay: $options.togglePlay,
	            mixerVars: $options.mixerVars
	          }, null, 8, ["playing", "onStop", "onTogglePlay", "mixerVars"])
	        ])
	      ], 512),
	      createBaseVNode("div", _hoisted_5, [
	        createBaseVNode("button", {
	          onClick: _cache[0] || (_cache[0] = (...args) => ($options.saveAudioMix && $options.saveAudioMix(...args))),
	          class: normalizeClass(["vue-audio-mixer-download-mix", {'recording':_ctx.recording}])
	        }, "Record and download mix", 2)
	      ])
	    ], 512), [
	      [vShow, !$options.loading]
	    ])
	  ], 6))
	}

	script.render = render;

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

	var css_248z = "@import url(\"https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap\");\n@import url(\"https://fonts.googleapis.com/css2?family=Open+Sans&display=swap\");\n.vue-audio-mixer-channel-label {\n  line-height: 0.6rem;\n  font-size: 0.55rem;\n  display: table;\n  padding: 2px;\n  margin-top: 5px;\n  width: 100%;\n  height: 30px;\n  overflow: hidden;\n  clear: both;\n  float: left;\n  color: #FFFFFF;\n  text-align: center;\n  border: none;\n  box-sizing: border-box;\n  overflow: hidden; }\n  .vue-audio-mixer-channel-label label {\n    word-wrap: break-word;\n    display: table-cell;\n    vertical-align: middle;\n    word-break: break-word; }\n\n.logo {\n  position: absolute;\n  top: 10px;\n  left: 5px;\n  right: 5px; }\n  .logo img {\n    width: 100%; }\n\n.vue-audio-mixer-channel-strip {\n  background: transparent !important;\n  background: #16191c;\n  position: relative;\n  overflow: auto;\n  display: block;\n  opacity: 1;\n  display: inline-block; }\n\n.vue-audio-mixer-theme-small .vue-audio-mixer-channel {\n  margin-right: 1px;\n  width: 40px; }\n\n.vue-audio-mixer-theme-medium .vue-audio-mixer-channel {\n  margin-right: 2px;\n  width: 57px; }\n\n.with-panner {\n  margin-top: 40px; }\n\n.vue-audio-mixer-channel {\n  height: 245px;\n  padding: 5px;\n  padding-top: 41px;\n  box-sizing: content-box;\n  position: relative;\n  float: left;\n  display: block; }\n  .vue-audio-mixer-channel:last-child {\n    margin-right: 0px; }\n    .vue-audio-mixer-channel:last-child .vue-audio-mixer-channel-label {\n      background: #000 !important; }\n\n.vue-audio-mixer-channel-slider {\n  right: 17px;\n  top: 40px;\n  display: block;\n  float: left;\n  -ms-transform: rotate(270deg);\n  /* IE 9 */\n  -webkit-transform: rotate(270deg);\n  /* Chrome, Safari, Opera */\n  transform: rotate(270deg);\n  position: absolute;\n  transform-origin: right; }\n\n.vue-audio-mixer-theme-small .vue-audio-mixer-channel-meter-canvas {\n  margin-right: 40px; }\n\n.vue-audio-mixer-theme-medium .vue-audio-mixer-channel-meter-canvas {\n  margin-right: 57px; }\n\n.vue-audio-mixer-channel-meter-canvas {\n  margin-left: 2px;\n  display: block;\n  float: left; }\n\n@keyframes rotate {\n  0% {\n    -webkit-transform: rotate(0deg) scale(1);\n    transform: rotate(0deg) scale(1); }\n  50% {\n    -webkit-transform: rotate(180deg) scale(0.6);\n    transform: rotate(180deg) scale(0.6); }\n  100% {\n    -webkit-transform: rotate(360deg) scale(1);\n    transform: rotate(360deg) scale(1); } }\n\n@-webkit-keyframes ball-scale-ripple {\n  0% {\n    -webkit-transform: scale(0.1);\n    transform: scale(0.1);\n    opacity: 1; }\n  70% {\n    -webkit-transform: scale(1);\n    transform: scale(1);\n    opacity: 0.7; }\n  100% {\n    opacity: 0.0; } }\n\n@keyframes ball-scale-ripple {\n  0% {\n    -webkit-transform: scale(0.1);\n    transform: scale(0.1);\n    opacity: 1; }\n  70% {\n    -webkit-transform: scale(1);\n    transform: scale(1);\n    opacity: 0.7; }\n  100% {\n    opacity: 0.0; } }\n\n.vue-audio-mixer-loader-inner {\n  position: relative; }\n\n.vue-audio-mixer-loader-inner > div {\n  -webkit-animation-fill-mode: both;\n  animation-fill-mode: both;\n  position: absolute;\n  left: -20px;\n  top: -20px;\n  border: 2px solid #1d7a9c;\n  border-bottom-color: transparent;\n  border-top-color: transparent;\n  border-radius: 100%;\n  height: 35px;\n  width: 35px;\n  -webkit-animation: rotate 1s 0s ease-in-out infinite;\n  animation: rotate 1s 0s ease-in-out infinite; }\n\n.vue-audio-mixer-loader-inner > div:last-child {\n  display: inline-block;\n  top: -10px;\n  left: -10px;\n  width: 15px;\n  height: 15px;\n  -webkit-animation-duration: 0.5s;\n  animation-duration: 0.5s;\n  border-color: #00a7cc transparent #00a7cc transparent;\n  -webkit-animation-direction: reverse;\n  animation-direction: reverse; }\n\n.vue-audio-mixer-loader {\n  width: 100%;\n  height: 100px;\n  position: relative; }\n\n.vue-audio-mixer-loader-inner {\n  margin: 0 auto;\n  width: 1px; }\n\n.vue-audio-mixer-loader-text {\n  color: #1d7a9c;\n  text-align: center;\n  width: 100%;\n  font-size: 0.7em;\n  position: relative;\n  top: 50%; }\n\n.vue-audio-mixer {\n  display: inline-block;\n  min-width: 105px;\n  overflow: auto;\n  margin: 0 auto;\n  font-family: 'Open Sans', sans-serif;\n  text-align: center; }\n  .vue-audio-mixer * {\n    -webkit-touch-callout: none;\n    -webkit-user-select: none;\n    /* Disable selection/copy in UIWebView */ }\n\n.vue-audio-mixer-error {\n  color: red;\n  background-color: white; }\n\n.vue-audio-mixer-loading-hider {\n  display: inline-block; }\n\n#vue-audio-mixer-waveform {\n  width: 100% !important;\n  display: block; }\n\n.vue-audio-mixer-download-mix {\n  cursor: pointer;\n  background-color: #bf1111;\n  border-radius: 5px;\n  color: white;\n  padding: 5px;\n  margin: 5px;\n  outline: 0 !important; }\n  .vue-audio-mixer-download-mix.recording {\n    background-color: #fc9595;\n    animation: anim-glow 2s ease infinite;\n    -webkit-animation: anim-glow 2s ease infinite;\n    -moz-animation: anim-glow 2s ease infinite; }\n\n@keyframes anim-glow {\n  0% {\n    box-shadow: 0 0 #bf1111; }\n  100% {\n    box-shadow: 0 0 10px 8px transparent;\n    border-width: 2px; } }\n\n* {\n  box-sizing: content-box; }\n\n.vue-audio-mixer-channel-mute-button, .vue-audio-mixer-channel-solo-button {\n  position: absolute;\n  left: 2px;\n  top: 5px;\n  cursor: pointer; }\n\n.vue-audio-mixer-theme-small .vue-audio-mixer-channel-solo-button {\n  left: 25px; }\n\n.vue-audio-mixer-theme-medium .vue-audio-mixer-channel-solo-button {\n  left: 35px; }\n\n.vue-audio-mixer-channel-mute-button-label, .vue-audio-mixer-channel-solo-button-label {\n  width: 18px;\n  text-align: center;\n  cursor: pointer; }\n\n.vue-audio-mixer-channel-mute-button label input, .vue-audio-mixer-channel-solo-button label input {\n  display: none; }\n\n.vue-audio-mixer-channel-mute-button, .vue-audio-mixer-channel-solo-button {\n  margin: 4px;\n  background-color: #666B73;\n  border-radius: 4px;\n  border: 1px solid #000;\n  overflow: auto;\n  float: left;\n  box-sizing: content-box; }\n\n.vue-audio-mixer-channel-mute-button label, .vue-audio-mixer-channel-solo-button label {\n  float: left;\n  margin-bottom: 0;\n  box-sizing: content-box; }\n\n.vue-audio-mixer-theme-small .vue-audio-mixer-channel-mute-button label span, .vue-audio-mixer-theme-small .vue-audio-mixer-channel-solo-button label span {\n  width: 8px;\n  font-size: 7px; }\n\n.vue-audio-mixer-theme-medium .vue-audio-mixer-channel-mute-button label span, .vue-audio-mixer-theme-medium .vue-audio-mixer-channel-solo-button label span {\n  width: 14px;\n  font-size: 12px; }\n\n.vue-audio-mixer-channel-mute-button label span, .vue-audio-mixer-channel-solo-button label span {\n  text-align: center;\n  padding: 3px;\n  width: 8px;\n  display: block;\n  border-radius: 4px;\n  box-sizing: content-box; }\n\n.vue-audio-mixer-channel-mute-button label input, .vue-audio-mixer-channel-solo-button label input {\n  position: absolute;\n  top: -20px; }\n\n.vue-audio-mixer-channel-mute-button input:hover + span, .vue-audio-mixer-channel-solo-button input:hover + span {\n  opacity: 0.8; }\n\n.vue-audio-mixer-channel-mute-button input:checked + span {\n  background-color: #911;\n  color: #FFF; }\n\n.vue-audio-mixer-channel-solo-button input:checked + span {\n  background-color: #1cdd20;\n  color: #FFF; }\n\n.vue-audio-mixer-channel-mute-button input:checked:hover + span, .vue-audio-mixer-channel-solo-button input:checked:hover + span {\n  opacity: 0.8;\n  color: #FFF; }\n\n.vue-audio-mixer-channel-panner-container {\n  top: -37px;\n  left: 0;\n  position: absolute;\n  width: 100%;\n  padding-left: 12px;\n  box-sizing: border-box; }\n\n.vue-audio-mixer-theme-small .vue-audio-mixer-channel-panner-container {\n  top: -27px; }\n  .vue-audio-mixer-theme-small .vue-audio-mixer-channel-panner-container .knob-control__text-display {\n    font-size: 1.5rem; }\n\n.vue-audio-mixer-channel-panner {\n  width: 19px;\n  height: 10px;\n  margin-top: 2px;\n  border: 0px;\n  background: none;\n  font: bold 7px Arial;\n  text-align: center;\n  color: white;\n  padding: 0px;\n  -webkit-appearance: none;\n  cursor: pointer; }\n\n.vue-audio-mixer-fader-thumb {\n  touch-action: none; }\n\n.vue-audio-mixer-slider {\n  height: 210px;\n  position: absolute;\n  width: 50%;\n  right: 0px; }\n\n.vue-audio-mixer-fader-slider-row, .vue-audio-mixer-fader-slider-row-right {\n  position: absolute;\n  width: 100%;\n  background: black;\n  height: 1px;\n  width: 4px;\n  left: 50%;\n  margin-left: -10px; }\n\n.vue-audio-mixer-fader-slider-row-right {\n  margin-left: 4px; }\n\n.vue-audio-mixer-fader-slider-track {\n  position: absolute;\n  height: 90%;\n  background: black;\n  width: 2px;\n  margin-left: -2px;\n  left: 50%;\n  margin-top: 1rem; }\n\n.vue-audio-mixer-fader-thumb {\n  position: absolute;\n  z-index: 1;\n  border: none;\n  height: 3rem;\n  width: 1.5rem;\n  left: 50%;\n  margin-left: -0.75rem;\n  margin-top: -2rem;\n  border-radius: 0px;\n  cursor: move;\n  user-select: none;\n  background: repeating-linear-gradient(0deg, transparent, transparent 5px, black 6px), linear-gradient(0deg, #464646 0%, #5a5a5a 14%, #141414 15%, #141414 50%, #5a5a5a 84%, #141414 85%, #1e1e1e 100%);\n  box-shadow: 0 0.25rem 0.5rem 0 rgba(0, 0, 0, 0.5); }\n  .vue-audio-mixer-fader-thumb:after {\n    content: '';\n    position: absolute;\n    top: 50%;\n    left: 0;\n    right: 0;\n    margin-top: -1px;\n    height: 3px;\n    background: rgba(255, 255, 255, 0.75); }\n\n.slider_value {\n  position: absolute;\n  right: 10px;\n  top: 37px;\n  font-size: 10px; }\n\n.waveform {\n  width: 100%; }\n\n.vue-audio-mixer-progress-bar {\n  margin-top: 1px;\n  background: #4c4c4c;\n  position: relative;\n  display: block;\n  clear: both;\n  overflow: auto;\n  cursor: pointer; }\n\n.vue-audio-mixer-progress-cursor {\n  width: 1px;\n  height: 100%;\n  background: #b6c8e1;\n  position: absolute;\n  left: 0;\n  top: 0; }\n\n.time_and_transport {\n  position: relative;\n  width: 100%;\n  background: #000; }\n\n.vue-audio-mixer-transport {\n  overflow: auto;\n  clear: both;\n  display: block;\n  text-align: right;\n  width: 150px;\n  height: 30px;\n  overflow: hidden;\n  position: relative;\n  margin: 0 auto 0 auto;\n  position: absolute;\n  top: 2px;\n  padding-left: 10px; }\n\n.vue-audio-mixer-theme-tracks-1 .vue-audio-mixer-progress-time, .vue-audio-mixer-theme-tracks-2 .vue-audio-mixer-progress-time, .vue-audio-mixer-theme-tracks-3.vue-audio-mixer-theme-small .vue-audio-mixer-progress-time, .vue-audio-mixer-theme-tracks-4.vue-audio-mixer-theme-small .vue-audio-mixer-progress-time {\n  width: 100%;\n  text-align: right !important; }\n\n.vue-audio-mixer-theme-tracks-1 .vue-audio-mixer-timer, .vue-audio-mixer-theme-tracks-2 .vue-audio-mixer-timer {\n  font-size: 0.7em; }\n  .vue-audio-mixer-theme-tracks-1 .vue-audio-mixer-timer .vue-audio-mixer-timer-number, .vue-audio-mixer-theme-tracks-2 .vue-audio-mixer-timer .vue-audio-mixer-timer-number {\n    width: 13px; }\n\n.vue-audio-mixer-theme-tracks-3 .vue-audio-mixer-show-total-time {\n  font-size: 0.7em; }\n  .vue-audio-mixer-theme-tracks-3 .vue-audio-mixer-show-total-time .vue-audio-mixer-timer-number {\n    width: 13px; }\n\n.vue-audio-mixer-timer {\n  font-family: \"Share Tech Mono\";\n  color: #fff;\n  font-size: 1em;\n  padding: 10px;\n  overflow: auto;\n  position: relative;\n  display: block;\n  clear: both;\n  background: #000;\n  text-align: right;\n  margin: 0px; }\n  .vue-audio-mixer-timer span {\n    display: inline-block;\n    text-align: left; }\n    .vue-audio-mixer-timer span .vue-audio-mixer-timer-number {\n      width: 18px; }\n  .vue-audio-mixer-timer .vue-audio-mixer-progress-time {\n    width: 100%;\n    text-align: center; }\n\nbutton {\n  border: none;\n  padding: 0;\n  background: transparent; }\n\n.vue-audio-mixer-transport-play-button {\n  cursor: pointer;\n  display: block;\n  width: 0;\n  float: left;\n  height: 0;\n  border-top: 8px solid transparent;\n  border-bottom: 8px solid transparent;\n  border-left: 9.6px solid #d5d5d5;\n  margin: 8px auto 30px auto;\n  position: relative;\n  z-index: 1;\n  transition: all 0.1s;\n  -webkit-transition: all 0.1s;\n  -moz-transition: all 0.1s;\n  left: 48px;\n  position: relative; }\n  .vue-audio-mixer-transport-play-button:focus, .vue-audio-mixer-transport-play-button:active {\n    outline: none; }\n  .vue-audio-mixer-transport-play-button:before {\n    content: '';\n    position: absolute;\n    top: -12px;\n    left: -18.4px;\n    bottom: -12px;\n    right: -5.6px;\n    border-radius: 50%;\n    border: 2px solid #d5d5d5;\n    z-index: -1;\n    transition: all 0.1s;\n    -webkit-transition: all 0.1s;\n    -moz-transition: all 0.1s; }\n  .vue-audio-mixer-transport-play-button:after {\n    content: '';\n    opacity: 0;\n    transition: opacity 0.2s;\n    -webkit-transition: opacity 0.2s;\n    -moz-transition: opacity 0.2s;\n    z-index: 2; }\n  .vue-audio-mixer-transport-play-button:hover:before, .vue-audio-mixer-transport-play-button:focus:before {\n    transform: scale(1.1);\n    -webkit-transform: scale(1.1);\n    -moz-transform: scale(1.1); }\n  .vue-audio-mixer-transport-play-button.vue-audio-mixer-transport-play-button-active {\n    border-color: transparent; }\n    .vue-audio-mixer-transport-play-button.vue-audio-mixer-transport-play-button-active span:nth-child(1), .vue-audio-mixer-transport-play-button.vue-audio-mixer-transport-play-button-active span:nth-child(2) {\n      content: '';\n      opacity: 1;\n      width: 1.14286px;\n      height: 12.8px;\n      background: #d5d5d5;\n      position: absolute;\n      right: 0.8px;\n      top: -6.4px;\n      border-left: 3.2px solid #d5d5d5; }\n    .vue-audio-mixer-transport-play-button.vue-audio-mixer-transport-play-button-active span:nth-child(1) {\n      right: 0.8px; }\n    .vue-audio-mixer-transport-play-button.vue-audio-mixer-transport-play-button-active span:nth-child(2) {\n      right: 7.2px; }\n\n.vue-audio-mixer-transport-start-button {\n  outline: none;\n  display: block;\n  float: left;\n  margin-left: 5px;\n  width: 0;\n  height: 0;\n  border-top: 8px solid transparent;\n  border-bottom: 8px solid transparent;\n  border-right: 9.6px solid #d5d5d5;\n  margin: 8px auto 8px auto;\n  position: relative;\n  z-index: 1;\n  cursor: pointer;\n  transition: all 0.1s;\n  -webkit-transition: all 0.1s;\n  -moz-transition: all 0.1s; }\n  .vue-audio-mixer-transport-start-button:before {\n    content: '';\n    position: absolute;\n    top: -12px;\n    left: -7.2px;\n    bottom: -12px;\n    right: -16.8px;\n    border-radius: 50%;\n    border: 2px solid #d5d5d5;\n    z-index: 2;\n    transition: all 0.1s;\n    -webkit-transition: all 0.1s;\n    -moz-transition: all 0.1s; }\n  .vue-audio-mixer-transport-start-button:after {\n    content: \"\";\n    display: block;\n    position: absolute;\n    width: 2px;\n    height: 10px;\n    background: #d5d5d5;\n    margin-top: -5px;\n    margin-left: -2px; }\n  .vue-audio-mixer-transport-start-button:hover:before, .vue-audio-mixer-transport-start-button:focus:before {\n    transform: scale(1.1);\n    -webkit-transform: scale(1.1);\n    -moz-transform: scale(1.1); }\n\n.vue-audio-mixer-transport-record-button {\n  display: block;\n  width: 0;\n  float: left;\n  height: 0;\n  border: 4px solid #d5d5d5;\n  border-radius: 75%;\n  margin: 50px auto 30px auto;\n  position: relative;\n  z-index: 1;\n  transition: all 0.1s;\n  -webkit-transition: all 0.1s;\n  -moz-transition: all 0.1s;\n  left: 125px; }\n  .vue-audio-mixer-transport-record-button:before {\n    content: '';\n    position: absolute;\n    top: -12px;\n    left: -30px;\n    bottom: -12px;\n    right: -30px;\n    border-radius: 50%;\n    border: 2px solid #d5d5d5;\n    z-index: 2;\n    transition: all 0.1s;\n    -webkit-transition: all 0.1s;\n    -moz-transition: all 0.1s; }\n  .vue-audio-mixer-transport-record-button:after {\n    content: '';\n    opacity: 0;\n    transition: opacity 0.2s;\n    -webkit-transition: opacity 0.2s;\n    -moz-transition: opacity 0.2s; }\n  .vue-audio-mixer-transport-record-button:hover:before, .vue-audio-mixer-transport-record-button:focus:before {\n    transform: scale(1.1);\n    -webkit-transform: scale(1.1);\n    -moz-transform: scale(1.1); }\n  .vue-audio-mixer-transport-record-button.vue-audio-mixer-transport-record-button-active {\n    border-color: red; }\n\n.vue-audio-mixer-theme-default .slider_value {\n  color: #000; }\n\n.vue-audio-mixer-theme-dark .slider_value {\n  color: #C0C0C0; }\n\n.vue-audio-mixer-theme-default .vue-audio-mixer-channel-label {\n  background: #4ba7b7; }\n\n.vue-audio-mixer-theme-dark .vue-audio-mixer-channel-label {\n  background: #27547B; }\n\n.vue-audio-mixer-theme-default .vue-audio-mixer-channel {\n  background: rgba(41, 44, 48, 0.2); }\n\n.vue-audio-mixer-theme-dark .vue-audio-mixer-channel {\n  background: #282D30; }\n\n.vue-audio-mixer-theme-default .vue-audio-mixer-channel-panner-container {\n  background: rgba(41, 44, 48, 0.2); }\n\n.vue-audio-mixer-theme-dark .vue-audio-mixer-channel-panner-container {\n  background: #282D30; }\n\n.vue-audio-mixer-theme-default .vue-audio-mixer-channel:last-child {\n  background: #4ba7b7; }\n\n.vue-audio-mixer-theme-dark .vue-audio-mixer-channel:last-child {\n  background: #383F44; }\n\n.vue-audio-mixer-theme-default .vue-audio-mixer-channel-panner-container.vue-audio-mixer-is-master {\n  background: #4ba7b7; }\n\n.vue-audio-mixer-theme-dark .vue-audio-mixer-channel-panner-container.vue-audio-mixer-is-master {\n  background: #383F44; }\n";
	styleInject(css_248z);

	// Import vue component

	function install(Vue) {
	  if (install.installed) return;
	  install.installed = true;
	  Vue.component('vue-audio-mixer', script);
	} // Create module definition for Vue.use()

	const plugin = {
	  install
	};

	let GlobalVue = null;

	if (typeof window !== 'undefined') {
	  GlobalVue = window.Vue;
	} else if (typeof global !== 'undefined') {
	  GlobalVue = global.Vue;
	}

	if (GlobalVue) {
	  GlobalVue.use(plugin);
	} // To allow use as module (npm/webpack/etc.) export component

	exports["default"] = script;
	exports.install = install;

	Object.defineProperty(exports, '__esModule', { value: true });

}));
