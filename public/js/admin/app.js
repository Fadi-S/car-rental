/******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 19);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// a duplex stream is just a stream that is both readable and writable.
// Since JS doesn't have multiple prototypal inheritance, this class
// prototypally inherits from Readable, and then parasitically from
// Writable.



/*<replacement>*/

var pna = __webpack_require__(6);
/*</replacement>*/

/*<replacement>*/
var objectKeys = Object.keys || function (obj) {
  var keys = [];
  for (var key in obj) {
    keys.push(key);
  }return keys;
};
/*</replacement>*/

module.exports = Duplex;

/*<replacement>*/
var util = __webpack_require__(5);
util.inherits = __webpack_require__(3);
/*</replacement>*/

var Readable = __webpack_require__(14);
var Writable = __webpack_require__(12);

util.inherits(Duplex, Readable);

{
  // avoid scope creep, the keys array can then be collected
  var keys = objectKeys(Writable.prototype);
  for (var v = 0; v < keys.length; v++) {
    var method = keys[v];
    if (!Duplex.prototype[method]) Duplex.prototype[method] = Writable.prototype[method];
  }
}

function Duplex(options) {
  if (!(this instanceof Duplex)) return new Duplex(options);

  Readable.call(this, options);
  Writable.call(this, options);

  if (options && options.readable === false) this.readable = false;

  if (options && options.writable === false) this.writable = false;

  this.allowHalfOpen = true;
  if (options && options.allowHalfOpen === false) this.allowHalfOpen = false;

  this.once('end', onend);
}

Object.defineProperty(Duplex.prototype, 'writableHighWaterMark', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function () {
    return this._writableState.highWaterMark;
  }
});

// the no-half-open enforcer
function onend() {
  // if we allow half-open state, or if the writable side ended,
  // then we're ok.
  if (this.allowHalfOpen || this._writableState.ended) return;

  // no more data can be written.
  // But allow more writes to happen in this tick.
  pna.nextTick(onEndNT, this);
}

function onEndNT(self) {
  self.end();
}

Object.defineProperty(Duplex.prototype, 'destroyed', {
  get: function () {
    if (this._readableState === undefined || this._writableState === undefined) {
      return false;
    }
    return this._readableState.destroyed && this._writableState.destroyed;
  },
  set: function (value) {
    // we ignore the value if the stream
    // has not been initialized yet
    if (this._readableState === undefined || this._writableState === undefined) {
      return;
    }

    // backward compatibility, the user is explicitly
    // managing destroyed
    this._readableState.destroyed = value;
    this._writableState.destroyed = value;
  }
});

Duplex.prototype._destroy = function (err, cb) {
  this.push(null);
  this.end();

  pna.nextTick(cb, err);
};

/***/ }),
/* 1 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 2 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

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
/* 3 */
/***/ (function(module, exports) {

if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}


/***/ }),
/* 4 */
/***/ (function(module, exports) {

/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {/* globals __webpack_amd_options__ */
module.exports = __webpack_amd_options__;

/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.

function isArray(arg) {
  if (Array.isArray) {
    return Array.isArray(arg);
  }
  return objectToString(arg) === '[object Array]';
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = Buffer.isBuffer;

function objectToString(o) {
  return Object.prototype.toString.call(o);
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(9).Buffer))

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

if (!process.version ||
    process.version.indexOf('v0.') === 0 ||
    process.version.indexOf('v1.') === 0 && process.version.indexOf('v1.8.') !== 0) {
  module.exports = { nextTick: nextTick };
} else {
  module.exports = process
}

function nextTick(fn, arg1, arg2, arg3) {
  if (typeof fn !== 'function') {
    throw new TypeError('"callback" argument must be a function');
  }
  var len = arguments.length;
  var args, i;
  switch (len) {
  case 0:
  case 1:
    return process.nextTick(fn);
  case 2:
    return process.nextTick(function afterTickOne() {
      fn.call(null, arg1);
    });
  case 3:
    return process.nextTick(function afterTickTwo() {
      fn.call(null, arg1, arg2);
    });
  case 4:
    return process.nextTick(function afterTickThree() {
      fn.call(null, arg1, arg2, arg3);
    });
  default:
    args = new Array(len - 1);
    i = 0;
    while (i < args.length) {
      args[i++] = arguments[i];
    }
    return process.nextTick(function afterTick() {
      fn.apply(null, args);
    });
  }
}


/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

/* eslint-disable node/no-deprecated-api */
var buffer = __webpack_require__(9)
var Buffer = buffer.Buffer

// alternative to using Object.keys for old browsers
function copyProps (src, dst) {
  for (var key in src) {
    dst[key] = src[key]
  }
}
if (Buffer.from && Buffer.alloc && Buffer.allocUnsafe && Buffer.allocUnsafeSlow) {
  module.exports = buffer
} else {
  // Copy properties from require('buffer')
  copyProps(buffer, exports)
  exports.Buffer = SafeBuffer
}

function SafeBuffer (arg, encodingOrOffset, length) {
  return Buffer(arg, encodingOrOffset, length)
}

// Copy static methods from Buffer
copyProps(Buffer, SafeBuffer)

SafeBuffer.from = function (arg, encodingOrOffset, length) {
  if (typeof arg === 'number') {
    throw new TypeError('Argument must not be a number')
  }
  return Buffer(arg, encodingOrOffset, length)
}

SafeBuffer.alloc = function (size, fill, encoding) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  var buf = Buffer(size)
  if (fill !== undefined) {
    if (typeof encoding === 'string') {
      buf.fill(fill, encoding)
    } else {
      buf.fill(fill)
    }
  } else {
    buf.fill(0)
  }
  return buf
}

SafeBuffer.allocUnsafe = function (size) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  return Buffer(size)
}

SafeBuffer.allocUnsafeSlow = function (size) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  return buffer.SlowBuffer(size)
}


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * jQuery JavaScript Library v3.3.1
 * https://jquery.com/
 *
 * Includes Sizzle.js
 * https://sizzlejs.com/
 *
 * Copyright JS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2018-01-20T17:24Z
 */
( function( global, factory ) {

	"use strict";

	if ( typeof module === "object" && typeof module.exports === "object" ) {

		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
} )( typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1
// throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode
// arguments.callee.caller (trac-13335). But as of jQuery 3.0 (2016), strict mode should be common
// enough that all such attempts are guarded in a try block.
"use strict";

var arr = [];

var document = window.document;

var getProto = Object.getPrototypeOf;

var slice = arr.slice;

var concat = arr.concat;

var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var fnToString = hasOwn.toString;

var ObjectFunctionString = fnToString.call( Object );

var support = {};

var isFunction = function isFunction( obj ) {

      // Support: Chrome <=57, Firefox <=52
      // In some browsers, typeof returns "function" for HTML <object> elements
      // (i.e., `typeof document.createElement( "object" ) === "function"`).
      // We don't want to classify *any* DOM node as a function.
      return typeof obj === "function" && typeof obj.nodeType !== "number";
  };


var isWindow = function isWindow( obj ) {
		return obj != null && obj === obj.window;
	};




	var preservedScriptAttributes = {
		type: true,
		src: true,
		noModule: true
	};

	function DOMEval( code, doc, node ) {
		doc = doc || document;

		var i,
			script = doc.createElement( "script" );

		script.text = code;
		if ( node ) {
			for ( i in preservedScriptAttributes ) {
				if ( node[ i ] ) {
					script[ i ] = node[ i ];
				}
			}
		}
		doc.head.appendChild( script ).parentNode.removeChild( script );
	}


function toType( obj ) {
	if ( obj == null ) {
		return obj + "";
	}

	// Support: Android <=2.3 only (functionish RegExp)
	return typeof obj === "object" || typeof obj === "function" ?
		class2type[ toString.call( obj ) ] || "object" :
		typeof obj;
}
/* global Symbol */
// Defining this global in .eslintrc.json would create a danger of using the global
// unguarded in another place, it seems safer to define global only for this module



var
	version = "3.3.1",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android <=4.0 only
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {

		// Return all the elements in a clean array
		if ( num == null ) {
			return slice.call( this );
		}

		// Return just the one element from the set
		return num < 0 ? this[ num + this.length ] : this[ num ];
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !isFunction( target ) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = Array.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && Array.isArray( src ) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	isPlainObject: function( obj ) {
		var proto, Ctor;

		// Detect obvious negatives
		// Use toString instead of jQuery.type to catch host objects
		if ( !obj || toString.call( obj ) !== "[object Object]" ) {
			return false;
		}

		proto = getProto( obj );

		// Objects with no prototype (e.g., `Object.create( null )`) are plain
		if ( !proto ) {
			return true;
		}

		// Objects with prototype are plain iff they were constructed by a global Object function
		Ctor = hasOwn.call( proto, "constructor" ) && proto.constructor;
		return typeof Ctor === "function" && fnToString.call( Ctor ) === ObjectFunctionString;
	},

	isEmptyObject: function( obj ) {

		/* eslint-disable no-unused-vars */
		// See https://github.com/eslint/eslint/issues/6125
		var name;

		for ( name in obj ) {
			return false;
		}
		return true;
	},

	// Evaluates a script in a global context
	globalEval: function( code ) {
		DOMEval( code );
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android <=4.0 only
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	// Support: Android <=4.0 only, PhantomJS 1 only
	// push.apply(_, arraylike) throws on ancient WebKit
	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
}

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: real iOS 8.2 only (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = toType( obj );

	if ( isFunction( obj ) || isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.3.3
 * https://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-08-08
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// https://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,

	// CSS escapes
	// http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// CSS string/identifier serialization
	// https://drafts.csswg.org/cssom/#common-serializing-idioms
	rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
	fcssescape = function( ch, asCodePoint ) {
		if ( asCodePoint ) {

			// U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
			if ( ch === "\0" ) {
				return "\uFFFD";
			}

			// Control characters and (dependent upon position) numbers get escaped as code points
			return ch.slice( 0, -1 ) + "\\" + ch.charCodeAt( ch.length - 1 ).toString( 16 ) + " ";
		}

		// Other potentially-special ASCII characters get backslash-escaped
		return "\\" + ch;
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	},

	disabledAncestor = addCombinator(
		function( elem ) {
			return elem.disabled === true && ("form" in elem || "label" in elem);
		},
		{ dir: "parentNode", next: "legend" }
	);

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

				// ID selector
				if ( (m = match[1]) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!compilerCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

				if ( nodeType !== 1 ) {
					newContext = context;
					newSelector = selector;

				// qSA looks outside Element context, which is not what we want
				// Thanks to Andrew Dupont for this workaround technique
				// Support: IE <=8
				// Exclude object elements
				} else if ( context.nodeName.toLowerCase() !== "object" ) {

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rcssescape, fcssescape );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					while ( i-- ) {
						groups[i] = "#" + nid + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch ( qsaError ) {
					} finally {
						if ( nid === expando ) {
							context.removeAttribute( "id" );
						}
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created element and returns a boolean result
 */
function assert( fn ) {
	var el = document.createElement("fieldset");

	try {
		return !!fn( el );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( el.parentNode ) {
			el.parentNode.removeChild( el );
		}
		// release memory in IE
		el = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			a.sourceIndex - b.sourceIndex;

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for :enabled/:disabled
 * @param {Boolean} disabled true for :disabled; false for :enabled
 */
function createDisabledPseudo( disabled ) {

	// Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
	return function( elem ) {

		// Only certain elements can match :enabled or :disabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
		if ( "form" in elem ) {

			// Check for inherited disabledness on relevant non-disabled elements:
			// * listed form-associated elements in a disabled fieldset
			//   https://html.spec.whatwg.org/multipage/forms.html#category-listed
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
			// * option elements in a disabled optgroup
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
			// All such elements have a "form" property.
			if ( elem.parentNode && elem.disabled === false ) {

				// Option elements defer to a parent optgroup if present
				if ( "label" in elem ) {
					if ( "label" in elem.parentNode ) {
						return elem.parentNode.disabled === disabled;
					} else {
						return elem.disabled === disabled;
					}
				}

				// Support: IE 6 - 11
				// Use the isDisabled shortcut property to check for disabled fieldset ancestors
				return elem.isDisabled === disabled ||

					// Where there is no isDisabled, check manually
					/* jshint -W018 */
					elem.isDisabled !== !disabled &&
						disabledAncestor( elem ) === disabled;
			}

			return elem.disabled === disabled;

		// Try to winnow out elements that can't be disabled before trusting the disabled property.
		// Some victims get caught in our net (label, legend, menu, track), but it shouldn't
		// even exist on them, let alone have a boolean value.
		} else if ( "label" in elem ) {
			return elem.disabled === disabled;
		}

		// Remaining elements are neither :enabled nor :disabled
		return false;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, subWindow,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	if ( preferredDoc !== document &&
		(subWindow = document.defaultView) && subWindow.top !== subWindow ) {

		// Support: IE 11, Edge
		if ( subWindow.addEventListener ) {
			subWindow.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( subWindow.attachEvent ) {
			subWindow.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( el ) {
		el.className = "i";
		return !el.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( el ) {
		el.appendChild( document.createComment("") );
		return !el.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programmatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( el ) {
		docElem.appendChild( el ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});

	// ID filter and find
	if ( support.getById ) {
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var elem = context.getElementById( id );
				return elem ? [ elem ] : [];
			}
		};
	} else {
		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};

		// Support: IE 6 - 7 only
		// getElementById is not reliable as a find shortcut
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var node, i, elems,
					elem = context.getElementById( id );

				if ( elem ) {

					// Verify the id attribute
					node = elem.getAttributeNode("id");
					if ( node && node.value === id ) {
						return [ elem ];
					}

					// Fall back on getElementsByName
					elems = context.getElementsByName( id );
					i = 0;
					while ( (elem = elems[i++]) ) {
						node = elem.getAttributeNode("id");
						if ( node && node.value === id ) {
							return [ elem ];
						}
					}
				}

				return [];
			}
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See https://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( el ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// https://bugs.jquery.com/ticket/12359
			docElem.appendChild( el ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// https://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( el.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !el.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !el.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !el.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibling-combinator selector` fails
			if ( !el.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( el ) {
			el.innerHTML = "<a href='' disabled='disabled'></a>" +
				"<select disabled='disabled'><option/></select>";

			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			el.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( el.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( el.querySelectorAll(":enabled").length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Support: IE9-11+
			// IE's :disabled selector does not pick up the children of disabled fieldsets
			docElem.appendChild( el ).disabled = true;
			if ( el.querySelectorAll(":disabled").length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			el.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( el ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( el, "*" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( el, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		!compilerCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.escape = function( sel ) {
	return (sel + "").replace( rcssescape, fcssescape );
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = {});

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {
							// Use previously-cached element index if available
							if ( useCache ) {
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] || (node[ expando ] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = {});

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": createDisabledPseudo( false ),
		"disabled": createDisabledPseudo( true ),

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		skip = combinator.next,
		key = skip || dir,
		checkNonElements = base && key === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
			return false;
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

						if ( skip && skip === elem.nodeName.toLowerCase() ) {
							elem = elem[ dir ] || elem;
						} else if ( (oldCache = uniqueCache[ key ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ key ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
			return false;
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context === document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				context.nodeType === 9 && documentIsHTML && Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( el ) {
	// Should return 1, but returns 4 (following)
	return el.compareDocumentPosition( document.createElement("fieldset") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// https://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( el ) {
	el.innerHTML = "<a href='#'></a>";
	return el.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( el ) {
	el.innerHTML = "<input/>";
	el.firstChild.setAttribute( "value", "" );
	return el.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( el ) {
	return el.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;

// Deprecated
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;
jQuery.escapeSelector = Sizzle.escape;




var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;



function nodeName( elem, name ) {

  return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();

};
var rsingleTag = ( /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i );



// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			return !!qualifier.call( elem, i, elem ) !== not;
		} );
	}

	// Single element
	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );
	}

	// Arraylike of elements (jQuery, arguments, Array)
	if ( typeof qualifier !== "string" ) {
		return jQuery.grep( elements, function( elem ) {
			return ( indexOf.call( qualifier, elem ) > -1 ) !== not;
		} );
	}

	// Filtered directly for both simple and complex selectors
	return jQuery.filter( qualifier, elements, not );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	if ( elems.length === 1 && elem.nodeType === 1 ) {
		return jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [];
	}

	return jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
		return elem.nodeType === 1;
	} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i, ret,
			len = this.length,
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		ret = this.pushStack( [] );

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		return len > 1 ? jQuery.uniqueSort( ret ) : ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	// Shortcut simple #id case for speed
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Method init() accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[ 0 ] === "<" &&
				selector[ selector.length - 1 ] === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					if ( elem ) {

						// Inject the element directly into the jQuery object
						this[ 0 ] = elem;
						this.length = 1;
					}
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( isFunction( selector ) ) {
			return root.ready !== undefined ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter( function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			targets = typeof selectors !== "string" && jQuery( selectors );

		// Positional selectors never match, since there's no _selection_ context
		if ( !rneedsContext.test( selectors ) ) {
			for ( ; i < l; i++ ) {
				for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

					// Always skip document fragments
					if ( cur.nodeType < 11 && ( targets ?
						targets.index( cur ) > -1 :

						// Don't pass non-elements to Sizzle
						cur.nodeType === 1 &&
							jQuery.find.matchesSelector( cur, selectors ) ) ) {

						matched.push( cur );
						break;
					}
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within the set
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
        if ( nodeName( elem, "iframe" ) ) {
            return elem.contentDocument;
        }

        // Support: IE 9 - 11 only, iOS 7 only, Android Browser <=4.3 only
        // Treat the template element as a regular one in browsers that
        // don't support it.
        if ( nodeName( elem, "template" ) ) {
            elem = elem.content || elem;
        }

        return jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.uniqueSort( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
} );
var rnothtmlwhite = ( /[^\x20\t\r\n\f]+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnothtmlwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = locked || options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && toType( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = queue = [];
				if ( !memory && !firing ) {
					list = memory = "";
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


function Identity( v ) {
	return v;
}
function Thrower( ex ) {
	throw ex;
}

function adoptValue( value, resolve, reject, noValue ) {
	var method;

	try {

		// Check for promise aspect first to privilege synchronous behavior
		if ( value && isFunction( ( method = value.promise ) ) ) {
			method.call( value ).done( resolve ).fail( reject );

		// Other thenables
		} else if ( value && isFunction( ( method = value.then ) ) ) {
			method.call( value, resolve, reject );

		// Other non-thenables
		} else {

			// Control `resolve` arguments by letting Array#slice cast boolean `noValue` to integer:
			// * false: [ value ].slice( 0 ) => resolve( value )
			// * true: [ value ].slice( 1 ) => resolve()
			resolve.apply( undefined, [ value ].slice( noValue ) );
		}

	// For Promises/A+, convert exceptions into rejections
	// Since jQuery.when doesn't unwrap thenables, we can skip the extra checks appearing in
	// Deferred#then to conditionally suppress rejection.
	} catch ( value ) {

		// Support: Android 4.0 only
		// Strict mode functions invoked without .call/.apply get global-object context
		reject.apply( undefined, [ value ] );
	}
}

jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, callbacks,
				// ... .then handlers, argument index, [final state]
				[ "notify", "progress", jQuery.Callbacks( "memory" ),
					jQuery.Callbacks( "memory" ), 2 ],
				[ "resolve", "done", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 0, "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 1, "rejected" ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				"catch": function( fn ) {
					return promise.then( null, fn );
				},

				// Keep pipe for back-compat
				pipe: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;

					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {

							// Map tuples (progress, done, fail) to arguments (done, fail, progress)
							var fn = isFunction( fns[ tuple[ 4 ] ] ) && fns[ tuple[ 4 ] ];

							// deferred.progress(function() { bind to newDefer or newDefer.notify })
							// deferred.done(function() { bind to newDefer or newDefer.resolve })
							// deferred.fail(function() { bind to newDefer or newDefer.reject })
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},
				then: function( onFulfilled, onRejected, onProgress ) {
					var maxDepth = 0;
					function resolve( depth, deferred, handler, special ) {
						return function() {
							var that = this,
								args = arguments,
								mightThrow = function() {
									var returned, then;

									// Support: Promises/A+ section 2.3.3.3.3
									// https://promisesaplus.com/#point-59
									// Ignore double-resolution attempts
									if ( depth < maxDepth ) {
										return;
									}

									returned = handler.apply( that, args );

									// Support: Promises/A+ section 2.3.1
									// https://promisesaplus.com/#point-48
									if ( returned === deferred.promise() ) {
										throw new TypeError( "Thenable self-resolution" );
									}

									// Support: Promises/A+ sections 2.3.3.1, 3.5
									// https://promisesaplus.com/#point-54
									// https://promisesaplus.com/#point-75
									// Retrieve `then` only once
									then = returned &&

										// Support: Promises/A+ section 2.3.4
										// https://promisesaplus.com/#point-64
										// Only check objects and functions for thenability
										( typeof returned === "object" ||
											typeof returned === "function" ) &&
										returned.then;

									// Handle a returned thenable
									if ( isFunction( then ) ) {

										// Special processors (notify) just wait for resolution
										if ( special ) {
											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special )
											);

										// Normal processors (resolve) also hook into progress
										} else {

											// ...and disregard older resolution values
											maxDepth++;

											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special ),
												resolve( maxDepth, deferred, Identity,
													deferred.notifyWith )
											);
										}

									// Handle all other returned values
									} else {

										// Only substitute handlers pass on context
										// and multiple values (non-spec behavior)
										if ( handler !== Identity ) {
											that = undefined;
											args = [ returned ];
										}

										// Process the value(s)
										// Default process is resolve
										( special || deferred.resolveWith )( that, args );
									}
								},

								// Only normal processors (resolve) catch and reject exceptions
								process = special ?
									mightThrow :
									function() {
										try {
											mightThrow();
										} catch ( e ) {

											if ( jQuery.Deferred.exceptionHook ) {
												jQuery.Deferred.exceptionHook( e,
													process.stackTrace );
											}

											// Support: Promises/A+ section 2.3.3.3.4.1
											// https://promisesaplus.com/#point-61
											// Ignore post-resolution exceptions
											if ( depth + 1 >= maxDepth ) {

												// Only substitute handlers pass on context
												// and multiple values (non-spec behavior)
												if ( handler !== Thrower ) {
													that = undefined;
													args = [ e ];
												}

												deferred.rejectWith( that, args );
											}
										}
									};

							// Support: Promises/A+ section 2.3.3.3.1
							// https://promisesaplus.com/#point-57
							// Re-resolve promises immediately to dodge false rejection from
							// subsequent errors
							if ( depth ) {
								process();
							} else {

								// Call an optional hook to record the stack, in case of exception
								// since it's otherwise lost when execution goes async
								if ( jQuery.Deferred.getStackHook ) {
									process.stackTrace = jQuery.Deferred.getStackHook();
								}
								window.setTimeout( process );
							}
						};
					}

					return jQuery.Deferred( function( newDefer ) {

						// progress_handlers.add( ... )
						tuples[ 0 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onProgress ) ?
									onProgress :
									Identity,
								newDefer.notifyWith
							)
						);

						// fulfilled_handlers.add( ... )
						tuples[ 1 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onFulfilled ) ?
									onFulfilled :
									Identity
							)
						);

						// rejected_handlers.add( ... )
						tuples[ 2 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onRejected ) ?
									onRejected :
									Thrower
							)
						);
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 5 ];

			// promise.progress = list.add
			// promise.done = list.add
			// promise.fail = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(
					function() {

						// state = "resolved" (i.e., fulfilled)
						// state = "rejected"
						state = stateString;
					},

					// rejected_callbacks.disable
					// fulfilled_callbacks.disable
					tuples[ 3 - i ][ 2 ].disable,

					// rejected_handlers.disable
					// fulfilled_handlers.disable
					tuples[ 3 - i ][ 3 ].disable,

					// progress_callbacks.lock
					tuples[ 0 ][ 2 ].lock,

					// progress_handlers.lock
					tuples[ 0 ][ 3 ].lock
				);
			}

			// progress_handlers.fire
			// fulfilled_handlers.fire
			// rejected_handlers.fire
			list.add( tuple[ 3 ].fire );

			// deferred.notify = function() { deferred.notifyWith(...) }
			// deferred.resolve = function() { deferred.resolveWith(...) }
			// deferred.reject = function() { deferred.rejectWith(...) }
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? undefined : this, arguments );
				return this;
			};

			// deferred.notifyWith = list.fireWith
			// deferred.resolveWith = list.fireWith
			// deferred.rejectWith = list.fireWith
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( singleValue ) {
		var

			// count of uncompleted subordinates
			remaining = arguments.length,

			// count of unprocessed arguments
			i = remaining,

			// subordinate fulfillment data
			resolveContexts = Array( i ),
			resolveValues = slice.call( arguments ),

			// the master Deferred
			master = jQuery.Deferred(),

			// subordinate callback factory
			updateFunc = function( i ) {
				return function( value ) {
					resolveContexts[ i ] = this;
					resolveValues[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( !( --remaining ) ) {
						master.resolveWith( resolveContexts, resolveValues );
					}
				};
			};

		// Single- and empty arguments are adopted like Promise.resolve
		if ( remaining <= 1 ) {
			adoptValue( singleValue, master.done( updateFunc( i ) ).resolve, master.reject,
				!remaining );

			// Use .then() to unwrap secondary thenables (cf. gh-3000)
			if ( master.state() === "pending" ||
				isFunction( resolveValues[ i ] && resolveValues[ i ].then ) ) {

				return master.then();
			}
		}

		// Multiple arguments are aggregated like Promise.all array elements
		while ( i-- ) {
			adoptValue( resolveValues[ i ], updateFunc( i ), master.reject );
		}

		return master.promise();
	}
} );


// These usually indicate a programmer mistake during development,
// warn about them ASAP rather than swallowing them by default.
var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;

jQuery.Deferred.exceptionHook = function( error, stack ) {

	// Support: IE 8 - 9 only
	// Console exists when dev tools are open, which can happen at any time
	if ( window.console && window.console.warn && error && rerrorNames.test( error.name ) ) {
		window.console.warn( "jQuery.Deferred exception: " + error.message, error.stack, stack );
	}
};




jQuery.readyException = function( error ) {
	window.setTimeout( function() {
		throw error;
	} );
};




// The deferred used on DOM ready
var readyList = jQuery.Deferred();

jQuery.fn.ready = function( fn ) {

	readyList
		.then( fn )

		// Wrap jQuery.readyException in a function so that the lookup
		// happens at the time of error handling instead of callback
		// registration.
		.catch( function( error ) {
			jQuery.readyException( error );
		} );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );
	}
} );

jQuery.ready.then = readyList.then;

// The ready event handler and self cleanup method
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed );
	window.removeEventListener( "load", completed );
	jQuery.ready();
}

// Catch cases where $(document).ready() is called
// after the browser event has already occurred.
// Support: IE <=9 - 10 only
// Older IE sometimes signals "interactive" too soon
if ( document.readyState === "complete" ||
	( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

	// Handle it asynchronously to allow scripts the opportunity to delay ready
	window.setTimeout( jQuery.ready );

} else {

	// Use the handy event callback
	document.addEventListener( "DOMContentLoaded", completed );

	// A fallback to window.onload, that will always work
	window.addEventListener( "load", completed );
}




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( toType( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn(
					elems[ i ], key, raw ?
					value :
					value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	if ( chainable ) {
		return elems;
	}

	// Gets
	if ( bulk ) {
		return fn.call( elems );
	}

	return len ? fn( elems[ 0 ], key ) : emptyGet;
};


// Matches dashed string for camelizing
var rmsPrefix = /^-ms-/,
	rdashAlpha = /-([a-z])/g;

// Used by camelCase as callback to replace()
function fcamelCase( all, letter ) {
	return letter.toUpperCase();
}

// Convert dashed to camelCase; used by the css and data modules
// Support: IE <=9 - 11, Edge 12 - 15
// Microsoft forgot to hump their vendor prefix (#9572)
function camelCase( string ) {
	return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
}
var acceptData = function( owner ) {

	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};




function Data() {
	this.expando = jQuery.expando + Data.uid++;
}

Data.uid = 1;

Data.prototype = {

	cache: function( owner ) {

		// Check if the owner object already has a cache
		var value = owner[ this.expando ];

		// If not, create one
		if ( !value ) {
			value = {};

			// We can accept data for non-element nodes in modern browsers,
			// but we should not, see #8335.
			// Always return an empty object.
			if ( acceptData( owner ) ) {

				// If it is a node unlikely to be stringify-ed or looped over
				// use plain assignment
				if ( owner.nodeType ) {
					owner[ this.expando ] = value;

				// Otherwise secure it in a non-enumerable property
				// configurable must be true to allow the property to be
				// deleted when data is removed
				} else {
					Object.defineProperty( owner, this.expando, {
						value: value,
						configurable: true
					} );
				}
			}
		}

		return value;
	},
	set: function( owner, data, value ) {
		var prop,
			cache = this.cache( owner );

		// Handle: [ owner, key, value ] args
		// Always use camelCase key (gh-2257)
		if ( typeof data === "string" ) {
			cache[ camelCase( data ) ] = value;

		// Handle: [ owner, { properties } ] args
		} else {

			// Copy the properties one-by-one to the cache object
			for ( prop in data ) {
				cache[ camelCase( prop ) ] = data[ prop ];
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		return key === undefined ?
			this.cache( owner ) :

			// Always use camelCase key (gh-2257)
			owner[ this.expando ] && owner[ this.expando ][ camelCase( key ) ];
	},
	access: function( owner, key, value ) {

		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				( ( key && typeof key === "string" ) && value === undefined ) ) {

			return this.get( owner, key );
		}

		// When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i,
			cache = owner[ this.expando ];

		if ( cache === undefined ) {
			return;
		}

		if ( key !== undefined ) {

			// Support array or space separated string of keys
			if ( Array.isArray( key ) ) {

				// If key is an array of keys...
				// We always set camelCase keys, so remove that.
				key = key.map( camelCase );
			} else {
				key = camelCase( key );

				// If a key with the spaces exists, use it.
				// Otherwise, create an array by matching non-whitespace
				key = key in cache ?
					[ key ] :
					( key.match( rnothtmlwhite ) || [] );
			}

			i = key.length;

			while ( i-- ) {
				delete cache[ key[ i ] ];
			}
		}

		// Remove the expando if there's no more data
		if ( key === undefined || jQuery.isEmptyObject( cache ) ) {

			// Support: Chrome <=35 - 45
			// Webkit & Blink performance suffers when deleting properties
			// from DOM nodes, so set to undefined instead
			// https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)
			if ( owner.nodeType ) {
				owner[ this.expando ] = undefined;
			} else {
				delete owner[ this.expando ];
			}
		}
	},
	hasData: function( owner ) {
		var cache = owner[ this.expando ];
		return cache !== undefined && !jQuery.isEmptyObject( cache );
	}
};
var dataPriv = new Data();

var dataUser = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /[A-Z]/g;

function getData( data ) {
	if ( data === "true" ) {
		return true;
	}

	if ( data === "false" ) {
		return false;
	}

	if ( data === "null" ) {
		return null;
	}

	// Only convert to a number if it doesn't change the string
	if ( data === +data + "" ) {
		return +data;
	}

	if ( rbrace.test( data ) ) {
		return JSON.parse( data );
	}

	return data;
}

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = getData( data );
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			dataUser.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend( {
	hasData: function( elem ) {
		return dataUser.hasData( elem ) || dataPriv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return dataUser.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		dataUser.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to dataPriv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return dataPriv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		dataPriv.remove( elem, name );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = dataUser.get( elem );

				if ( elem.nodeType === 1 && !dataPriv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE 11 only
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					dataPriv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				dataUser.set( this, key );
			} );
		}

		return access( this, function( value ) {
			var data;

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {

				// Attempt to get data from the cache
				// The key will always be camelCased in Data
				data = dataUser.get( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			this.each( function() {

				// We always store the camelCased key
				dataUser.set( this, key, value );
			} );
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each( function() {
			dataUser.remove( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = dataPriv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || Array.isArray( data ) ) {
					queue = dataPriv.access( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// Clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// Not public - generate a queueHooks object, or return the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return dataPriv.get( elem, key ) || dataPriv.access( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				dataPriv.remove( elem, [ type + "queue", key ] );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// Ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = dataPriv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHiddenWithinTree = function( elem, el ) {

		// isHiddenWithinTree might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;

		// Inline style trumps all
		return elem.style.display === "none" ||
			elem.style.display === "" &&

			// Otherwise, check computed style
			// Support: Firefox <=43 - 45
			// Disconnected elements can have computed display: none, so first confirm that elem is
			// in the document.
			jQuery.contains( elem.ownerDocument, elem ) &&

			jQuery.css( elem, "display" ) === "none";
	};

var swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};




function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted, scale,
		maxIterations = 20,
		currentValue = tween ?
			function() {
				return tween.cur();
			} :
			function() {
				return jQuery.css( elem, prop, "" );
			},
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Support: Firefox <=54
		// Halve the iteration target value to prevent interference from CSS upper bounds (gh-2144)
		initial = initial / 2;

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		while ( maxIterations-- ) {

			// Evaluate and update our best guess (doubling guesses that zero out).
			// Finish if the scale equals or crosses 1 (making the old*new product non-positive).
			jQuery.style( elem, prop, initialInUnit + unit );
			if ( ( 1 - scale ) * ( 1 - ( scale = currentValue() / initial || 0.5 ) ) <= 0 ) {
				maxIterations = 0;
			}
			initialInUnit = initialInUnit / scale;

		}

		initialInUnit = initialInUnit * 2;
		jQuery.style( elem, prop, initialInUnit + unit );

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}


var defaultDisplayMap = {};

function getDefaultDisplay( elem ) {
	var temp,
		doc = elem.ownerDocument,
		nodeName = elem.nodeName,
		display = defaultDisplayMap[ nodeName ];

	if ( display ) {
		return display;
	}

	temp = doc.body.appendChild( doc.createElement( nodeName ) );
	display = jQuery.css( temp, "display" );

	temp.parentNode.removeChild( temp );

	if ( display === "none" ) {
		display = "block";
	}
	defaultDisplayMap[ nodeName ] = display;

	return display;
}

function showHide( elements, show ) {
	var display, elem,
		values = [],
		index = 0,
		length = elements.length;

	// Determine new display value for elements that need to change
	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		display = elem.style.display;
		if ( show ) {

			// Since we force visibility upon cascade-hidden elements, an immediate (and slow)
			// check is required in this first loop unless we have a nonempty display value (either
			// inline or about-to-be-restored)
			if ( display === "none" ) {
				values[ index ] = dataPriv.get( elem, "display" ) || null;
				if ( !values[ index ] ) {
					elem.style.display = "";
				}
			}
			if ( elem.style.display === "" && isHiddenWithinTree( elem ) ) {
				values[ index ] = getDefaultDisplay( elem );
			}
		} else {
			if ( display !== "none" ) {
				values[ index ] = "none";

				// Remember what we're overwriting
				dataPriv.set( elem, "display", display );
			}
		}
	}

	// Set the display of the elements in a second loop to avoid constant reflow
	for ( index = 0; index < length; index++ ) {
		if ( values[ index ] != null ) {
			elements[ index ].style.display = values[ index ];
		}
	}

	return elements;
}

jQuery.fn.extend( {
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHiddenWithinTree( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([a-z][^\/\0>\x20\t\r\n\f]+)/i );

var rscriptType = ( /^$|^module$|\/(?:java|ecma)script/i );



// We have to close these tags to support XHTML (#13200)
var wrapMap = {

	// Support: IE <=9 only
	option: [ 1, "<select multiple='multiple'>", "</select>" ],

	// XHTML parsers do not magically insert elements in the
	// same way that tag soup parsers do. So we cannot shorten
	// this by omitting <tbody> or other required elements.
	thead: [ 1, "<table>", "</table>" ],
	col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	_default: [ 0, "", "" ]
};

// Support: IE <=9 only
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) {

	// Support: IE <=9 - 11 only
	// Use typeof to avoid zero-argument method invocation on host objects (#15151)
	var ret;

	if ( typeof context.getElementsByTagName !== "undefined" ) {
		ret = context.getElementsByTagName( tag || "*" );

	} else if ( typeof context.querySelectorAll !== "undefined" ) {
		ret = context.querySelectorAll( tag || "*" );

	} else {
		ret = [];
	}

	if ( tag === undefined || tag && nodeName( context, tag ) ) {
		return jQuery.merge( [ context ], ret );
	}

	return ret;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		dataPriv.set(
			elems[ i ],
			"globalEval",
			!refElements || dataPriv.get( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/;

function buildFragment( elems, context, scripts, selection, ignored ) {
	var elem, tmp, tag, wrap, contains, j,
		fragment = context.createDocumentFragment(),
		nodes = [],
		i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( toType( elem ) === "object" ) {

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || fragment.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;
				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, tmp.childNodes );

				// Remember the top-level container
				tmp = fragment.firstChild;

				// Ensure the created nodes are orphaned (#12392)
				tmp.textContent = "";
			}
		}
	}

	// Remove wrapper from fragment
	fragment.textContent = "";

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}
			continue;
		}

		contains = jQuery.contains( elem.ownerDocument, elem );

		// Append to fragment
		tmp = getAll( fragment.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( contains ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	return fragment;
}


( function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// Support: Android 4.0 - 4.3 only
	// Check state lost if the name is set (#11217)
	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Android <=4.1 only
	// Older WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE <=11 only
	// Make sure textarea (and checkbox) defaultValue is properly cloned
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
} )();
var documentElement = document.documentElement;



var
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE <=9 only
// See #13393 for more info
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.get( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Ensure that invalid selectors throw exceptions at attach time
		// Evaluate against documentElement in case elem is a non-element node (e.g., document)
		if ( selector ) {
			jQuery.find.matchesSelector( documentElement, selector );
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.hasData( elem ) && dataPriv.get( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove data and the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			dataPriv.remove( elem, "handle events" );
		}
	},

	dispatch: function( nativeEvent ) {

		// Make a writable jQuery.Event from the native event object
		var event = jQuery.event.fix( nativeEvent );

		var i, j, ret, matched, handleObj, handlerQueue,
			args = new Array( arguments.length ),
			handlers = ( dataPriv.get( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;

		for ( i = 1; i < arguments.length; i++ ) {
			args[ i ] = arguments[ i ];
		}

		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, handleObj, sel, matchedHandlers, matchedSelectors,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		if ( delegateCount &&

			// Support: IE <=9
			// Black-hole SVG <use> instance trees (trac-13180)
			cur.nodeType &&

			// Support: Firefox <=42
			// Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
			// https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
			// Support: IE 11 only
			// ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
			!( event.type === "click" && event.button >= 1 ) ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && !( event.type === "click" && cur.disabled === true ) ) {
					matchedHandlers = [];
					matchedSelectors = {};
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matchedSelectors[ sel ] === undefined ) {
							matchedSelectors[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matchedSelectors[ sel ] ) {
							matchedHandlers.push( handleObj );
						}
					}
					if ( matchedHandlers.length ) {
						handlerQueue.push( { elem: cur, handlers: matchedHandlers } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		cur = this;
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: cur, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	addProp: function( name, hook ) {
		Object.defineProperty( jQuery.Event.prototype, name, {
			enumerable: true,
			configurable: true,

			get: isFunction( hook ) ?
				function() {
					if ( this.originalEvent ) {
							return hook( this.originalEvent );
					}
				} :
				function() {
					if ( this.originalEvent ) {
							return this.originalEvent[ name ];
					}
				},

			set: function( value ) {
				Object.defineProperty( this, name, {
					enumerable: true,
					configurable: true,
					writable: true,
					value: value
				} );
			}
		} );
	},

	fix: function( originalEvent ) {
		return originalEvent[ jQuery.expando ] ?
			originalEvent :
			new jQuery.Event( originalEvent );
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {

			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					this.focus();
					return false;
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {

			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( this.type === "checkbox" && this.click && nodeName( this, "input" ) ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	}
};

jQuery.removeEvent = function( elem, type, handle ) {

	// This "if" is needed for plain objects
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle );
	}
};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: Android <=2.3 only
				src.returnValue === false ?
			returnTrue :
			returnFalse;

		// Create target properties
		// Support: Safari <=6 - 7 only
		// Target should not be a text node (#504, #13143)
		this.target = ( src.target && src.target.nodeType === 3 ) ?
			src.target.parentNode :
			src.target;

		this.currentTarget = src.currentTarget;
		this.relatedTarget = src.relatedTarget;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || Date.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,
	isSimulated: false,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && !this.isSimulated ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Includes all common event props including KeyEvent and MouseEvent specific props
jQuery.each( {
	altKey: true,
	bubbles: true,
	cancelable: true,
	changedTouches: true,
	ctrlKey: true,
	detail: true,
	eventPhase: true,
	metaKey: true,
	pageX: true,
	pageY: true,
	shiftKey: true,
	view: true,
	"char": true,
	charCode: true,
	key: true,
	keyCode: true,
	button: true,
	buttons: true,
	clientX: true,
	clientY: true,
	offsetX: true,
	offsetY: true,
	pointerId: true,
	pointerType: true,
	screenX: true,
	screenY: true,
	targetTouches: true,
	toElement: true,
	touches: true,

	which: function( event ) {
		var button = event.button;

		// Add which for key events
		if ( event.which == null && rkeyEvent.test( event.type ) ) {
			return event.charCode != null ? event.charCode : event.keyCode;
		}

		// Add which for click: 1 === left; 2 === middle; 3 === right
		if ( !event.which && button !== undefined && rmouseEvent.test( event.type ) ) {
			if ( button & 1 ) {
				return 1;
			}

			if ( button & 2 ) {
				return 3;
			}

			if ( button & 4 ) {
				return 2;
			}

			return 0;
		}

		return event.which;
	}
}, jQuery.event.addProp );

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://bugs.chromium.org/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	}
} );


var

	/* eslint-disable max-len */

	// See https://github.com/eslint/eslint/issues/3229
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,

	/* eslint-enable */

	// Support: IE <=10 - 11, Edge 12 - 13 only
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

// Prefer a tbody over its parent table for containing new rows
function manipulationTarget( elem, content ) {
	if ( nodeName( elem, "table" ) &&
		nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ) {

		return jQuery( elem ).children( "tbody" )[ 0 ] || elem;
	}

	return elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	if ( ( elem.type || "" ).slice( 0, 5 ) === "true/" ) {
		elem.type = elem.type.slice( 5 );
	} else {
		elem.removeAttribute( "type" );
	}

	return elem;
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( dataPriv.hasData( src ) ) {
		pdataOld = dataPriv.access( src );
		pdataCur = dataPriv.set( dest, pdataOld );
		events = pdataOld.events;

		if ( events ) {
			delete pdataCur.handle;
			pdataCur.events = {};

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( dataUser.hasData( src ) ) {
		udataOld = dataUser.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		dataUser.set( dest, udataCur );
	}
}

// Fix IE bugs, see support tests
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var fragment, first, scripts, hasScripts, node, doc,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		valueIsFunction = isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( valueIsFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( valueIsFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android <=4.0 only, PhantomJS 1 only
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!dataPriv.access( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src && ( node.type || "" ).toLowerCase()  !== "module" ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl ) {
								jQuery._evalUrl( node.src );
							}
						} else {
							DOMEval( node.textContent.replace( rcleanScript, "" ), doc, node );
						}
					}
				}
			}
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		nodes = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = nodes[ i ] ) != null; i++ ) {
		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = jQuery.contains( elem.ownerDocument, elem );

		// Fix IE cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: https://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems ) {
		var data, elem, type,
			special = jQuery.event.special,
			i = 0;

		for ( ; ( elem = elems[ i ] ) !== undefined; i++ ) {
			if ( acceptData( elem ) ) {
				if ( ( data = elem[ dataPriv.expando ] ) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataPriv.expando ] = undefined;
				}
				if ( elem[ dataUser.expando ] ) {

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataUser.expando ] = undefined;
				}
			}
		}
	}
} );

jQuery.fn.extend( {
	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each( function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				} );
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: Android <=4.0 only, PhantomJS 1 only
			// .get() because push.apply(_, arraylike) throws on ancient WebKit
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );
var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function( elem ) {

		// Support: IE <=11 only, Firefox <=30 (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};

var rboxStyle = new RegExp( cssExpand.join( "|" ), "i" );



( function() {

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computeStyleTests() {

		// This is a singleton, we need to execute it only once
		if ( !div ) {
			return;
		}

		container.style.cssText = "position:absolute;left:-11111px;width:60px;" +
			"margin-top:1px;padding:0;border:0";
		div.style.cssText =
			"position:relative;display:block;box-sizing:border-box;overflow:scroll;" +
			"margin:auto;border:1px;padding:1px;" +
			"width:60%;top:1%";
		documentElement.appendChild( container ).appendChild( div );

		var divStyle = window.getComputedStyle( div );
		pixelPositionVal = divStyle.top !== "1%";

		// Support: Android 4.0 - 4.3 only, Firefox <=3 - 44
		reliableMarginLeftVal = roundPixelMeasures( divStyle.marginLeft ) === 12;

		// Support: Android 4.0 - 4.3 only, Safari <=9.1 - 10.1, iOS <=7.0 - 9.3
		// Some styles come back with percentage values, even though they shouldn't
		div.style.right = "60%";
		pixelBoxStylesVal = roundPixelMeasures( divStyle.right ) === 36;

		// Support: IE 9 - 11 only
		// Detect misreporting of content dimensions for box-sizing:border-box elements
		boxSizingReliableVal = roundPixelMeasures( divStyle.width ) === 36;

		// Support: IE 9 only
		// Detect overflow:scroll screwiness (gh-3699)
		div.style.position = "absolute";
		scrollboxSizeVal = div.offsetWidth === 36 || "absolute";

		documentElement.removeChild( container );

		// Nullify the div so it wouldn't be stored in the memory and
		// it will also be a sign that checks already performed
		div = null;
	}

	function roundPixelMeasures( measure ) {
		return Math.round( parseFloat( measure ) );
	}

	var pixelPositionVal, boxSizingReliableVal, scrollboxSizeVal, pixelBoxStylesVal,
		reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	// Support: IE <=9 - 11 only
	// Style of cloned element affects source element cloned (#8908)
	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	jQuery.extend( support, {
		boxSizingReliable: function() {
			computeStyleTests();
			return boxSizingReliableVal;
		},
		pixelBoxStyles: function() {
			computeStyleTests();
			return pixelBoxStylesVal;
		},
		pixelPosition: function() {
			computeStyleTests();
			return pixelPositionVal;
		},
		reliableMarginLeft: function() {
			computeStyleTests();
			return reliableMarginLeftVal;
		},
		scrollboxSize: function() {
			computeStyleTests();
			return scrollboxSizeVal;
		}
	} );
} )();


function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,

		// Support: Firefox 51+
		// Retrieving style before computed somehow
		// fixes an issue with getting wrong values
		// on detached elements
		style = elem.style;

	computed = computed || getStyles( elem );

	// getPropertyValue is needed for:
	//   .css('filter') (IE 9 only, #12537)
	//   .css('--customProperty) (#3144)
	if ( computed ) {
		ret = computed.getPropertyValue( name ) || computed[ name ];

		if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// A tribute to the "awesome hack by Dean Edwards"
		// Android Browser returns percentage for some values,
		// but width seems to be reliably pixels.
		// This is against the CSSOM draft spec:
		// https://drafts.csswg.org/cssom/#resolved-values
		if ( !support.pixelBoxStyles() && rnumnonpx.test( ret ) && rboxStyle.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?

		// Support: IE <=9 - 11 only
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var

	// Swappable if display is none or starts with table
	// except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rcustomProp = /^--/,
	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style;

// Return a css property mapped to a potentially vendor prefixed property
function vendorPropName( name ) {

	// Shortcut for names that are not vendor prefixed
	if ( name in emptyStyle ) {
		return name;
	}

	// Check for vendor prefixed names
	var capName = name[ 0 ].toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

// Return a property mapped along what jQuery.cssProps suggests or to
// a vendor prefixed property.
function finalPropName( name ) {
	var ret = jQuery.cssProps[ name ];
	if ( !ret ) {
		ret = jQuery.cssProps[ name ] = vendorPropName( name ) || name;
	}
	return ret;
}

function setPositiveNumber( elem, value, subtract ) {

	// Any relative (+/-) values have already been
	// normalized at this point
	var matches = rcssNum.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || "px" ) :
		value;
}

function boxModelAdjustment( elem, dimension, box, isBorderBox, styles, computedVal ) {
	var i = dimension === "width" ? 1 : 0,
		extra = 0,
		delta = 0;

	// Adjustment may not be necessary
	if ( box === ( isBorderBox ? "border" : "content" ) ) {
		return 0;
	}

	for ( ; i < 4; i += 2 ) {

		// Both box models exclude margin
		if ( box === "margin" ) {
			delta += jQuery.css( elem, box + cssExpand[ i ], true, styles );
		}

		// If we get here with a content-box, we're seeking "padding" or "border" or "margin"
		if ( !isBorderBox ) {

			// Add padding
			delta += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// For "border" or "margin", add border
			if ( box !== "padding" ) {
				delta += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );

			// But still keep track of it otherwise
			} else {
				extra += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}

		// If we get here with a border-box (content + padding + border), we're seeking "content" or
		// "padding" or "margin"
		} else {

			// For "content", subtract padding
			if ( box === "content" ) {
				delta -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// For "content" or "padding", subtract border
			if ( box !== "margin" ) {
				delta -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	// Account for positive content-box scroll gutter when requested by providing computedVal
	if ( !isBorderBox && computedVal >= 0 ) {

		// offsetWidth/offsetHeight is a rounded sum of content, padding, scroll gutter, and border
		// Assuming integer scroll gutter, subtract the rest and round down
		delta += Math.max( 0, Math.ceil(
			elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ] -
			computedVal -
			delta -
			extra -
			0.5
		) );
	}

	return delta;
}

function getWidthOrHeight( elem, dimension, extra ) {

	// Start with computed style
	var styles = getStyles( elem ),
		val = curCSS( elem, dimension, styles ),
		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
		valueIsBorderBox = isBorderBox;

	// Support: Firefox <=54
	// Return a confounding non-pixel value or feign ignorance, as appropriate.
	if ( rnumnonpx.test( val ) ) {
		if ( !extra ) {
			return val;
		}
		val = "auto";
	}

	// Check for style in case a browser which returns unreliable values
	// for getComputedStyle silently falls back to the reliable elem.style
	valueIsBorderBox = valueIsBorderBox &&
		( support.boxSizingReliable() || val === elem.style[ dimension ] );

	// Fall back to offsetWidth/offsetHeight when value is "auto"
	// This happens for inline elements with no explicit setting (gh-3571)
	// Support: Android <=4.1 - 4.3 only
	// Also use offsetWidth/offsetHeight for misreported inline dimensions (gh-3602)
	if ( val === "auto" ||
		!parseFloat( val ) && jQuery.css( elem, "display", false, styles ) === "inline" ) {

		val = elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ];

		// offsetWidth/offsetHeight provide border-box values
		valueIsBorderBox = true;
	}

	// Normalize "" and auto
	val = parseFloat( val ) || 0;

	// Adjust for the element's box model
	return ( val +
		boxModelAdjustment(
			elem,
			dimension,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles,

			// Provide the current computed size to request scroll gutter calculation (gh-3589)
			val
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = camelCase( name ),
			isCustomProp = rcustomProp.test( name ),
			style = elem.style;

		// Make sure that we're working with the right name. We don't
		// want to query the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Gets hook for the prefixed version, then unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set (#7116)
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			if ( type === "number" ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// background-* props affect original clone's values
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				if ( isCustomProp ) {
					style.setProperty( name, value );
				} else {
					style[ name ] = value;
				}
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = camelCase( name ),
			isCustomProp = rcustomProp.test( name );

		// Make sure that we're working with the right name. We don't
		// want to modify the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Try prefixed name followed by the unprefixed name
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		// Convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Make numeric if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}

		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( i, dimension ) {
	jQuery.cssHooks[ dimension ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// Certain elements can have dimension info if we invisibly show them
				// but it must have a current display style that would benefit
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&

					// Support: Safari 8+
					// Table columns in Safari have non-zero offsetWidth & zero
					// getBoundingClientRect().width unless display is changed.
					// Support: IE <=11 only
					// Running getBoundingClientRect on a disconnected node
					// in IE throws an error.
					( !elem.getClientRects().length || !elem.getBoundingClientRect().width ) ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, dimension, extra );
						} ) :
						getWidthOrHeight( elem, dimension, extra );
			}
		},

		set: function( elem, value, extra ) {
			var matches,
				styles = getStyles( elem ),
				isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
				subtract = extra && boxModelAdjustment(
					elem,
					dimension,
					extra,
					isBorderBox,
					styles
				);

			// Account for unreliable border-box dimensions by comparing offset* to computed and
			// faking a content-box to get border and padding (gh-3699)
			if ( isBorderBox && support.scrollboxSize() === styles.position ) {
				subtract -= Math.ceil(
					elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ] -
					parseFloat( styles[ dimension ] ) -
					boxModelAdjustment( elem, dimension, "border", false, styles ) -
					0.5
				);
			}

			// Convert to pixels if value adjustment is needed
			if ( subtract && ( matches = rcssNum.exec( value ) ) &&
				( matches[ 3 ] || "px" ) !== "px" ) {

				elem.style[ dimension ] = value;
				value = jQuery.css( elem, dimension );
			}

			return setPositiveNumber( elem, value, subtract );
		}
	};
} );

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return ( parseFloat( curCSS( elem, "marginLeft" ) ) ||
				elem.getBoundingClientRect().left -
					swap( elem, { marginLeft: 0 }, function() {
						return elem.getBoundingClientRect().left;
					} )
				) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( prefix !== "margin" ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( Array.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// Passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails.
			// Simple values such as "10px" are parsed to Float;
			// complex values such as "rotate(1rad)" are returned as-is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// Use step hook for back compat.
			// Use cssHook if its there.
			// Use .style if available and use plain properties where available.
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 &&
				( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
					jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9 only
// Panic based approach to setting things on disconnected nodes
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, inProgress,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

function schedule() {
	if ( inProgress ) {
		if ( document.hidden === false && window.requestAnimationFrame ) {
			window.requestAnimationFrame( schedule );
		} else {
			window.setTimeout( schedule, jQuery.fx.interval );
		}

		jQuery.fx.tick();
	}
}

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = Date.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// If we include width, step value is 1 to do all cssExpand values,
	// otherwise step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// We're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	var prop, value, toggle, hooks, oldfire, propTween, restoreDisplay, display,
		isBox = "width" in props || "height" in props,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHiddenWithinTree( elem ),
		dataShow = dataPriv.get( elem, "fxshow" );

	// Queue-skipping animations hijack the fx hooks
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// Ensure the complete handler is called before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// Detect show/hide animations
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.test( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// Pretend to be hidden if this is a "show" and
				// there is still data from a stopped show/hide
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;

				// Ignore all other no-op show/hide data
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );
		}
	}

	// Bail out if this is a no-op like .hide().hide()
	propTween = !jQuery.isEmptyObject( props );
	if ( !propTween && jQuery.isEmptyObject( orig ) ) {
		return;
	}

	// Restrict "overflow" and "display" styles during box animations
	if ( isBox && elem.nodeType === 1 ) {

		// Support: IE <=9 - 11, Edge 12 - 15
		// Record all 3 overflow attributes because IE does not infer the shorthand
		// from identically-valued overflowX and overflowY and Edge just mirrors
		// the overflowX value there.
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Identify a display type, preferring old show/hide data over the CSS cascade
		restoreDisplay = dataShow && dataShow.display;
		if ( restoreDisplay == null ) {
			restoreDisplay = dataPriv.get( elem, "display" );
		}
		display = jQuery.css( elem, "display" );
		if ( display === "none" ) {
			if ( restoreDisplay ) {
				display = restoreDisplay;
			} else {

				// Get nonempty value(s) by temporarily forcing visibility
				showHide( [ elem ], true );
				restoreDisplay = elem.style.display || restoreDisplay;
				display = jQuery.css( elem, "display" );
				showHide( [ elem ] );
			}
		}

		// Animate inline elements as inline-block
		if ( display === "inline" || display === "inline-block" && restoreDisplay != null ) {
			if ( jQuery.css( elem, "float" ) === "none" ) {

				// Restore the original display value at the end of pure show/hide animations
				if ( !propTween ) {
					anim.done( function() {
						style.display = restoreDisplay;
					} );
					if ( restoreDisplay == null ) {
						display = style.display;
						restoreDisplay = display === "none" ? "" : display;
					}
				}
				style.display = "inline-block";
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always( function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		} );
	}

	// Implement show/hide animations
	propTween = false;
	for ( prop in orig ) {

		// General show/hide setup for this element animation
		if ( !propTween ) {
			if ( dataShow ) {
				if ( "hidden" in dataShow ) {
					hidden = dataShow.hidden;
				}
			} else {
				dataShow = dataPriv.access( elem, "fxshow", { display: restoreDisplay } );
			}

			// Store hidden/visible for toggle so `.stop().toggle()` "reverses"
			if ( toggle ) {
				dataShow.hidden = !hidden;
			}

			// Show elements before animating them
			if ( hidden ) {
				showHide( [ elem ], true );
			}

			/* eslint-disable no-loop-func */

			anim.done( function() {

			/* eslint-enable no-loop-func */

				// The final step of a "hide" animation is actually hiding the element
				if ( !hidden ) {
					showHide( [ elem ] );
				}
				dataPriv.remove( elem, "fxshow" );
				for ( prop in orig ) {
					jQuery.style( elem, prop, orig[ prop ] );
				}
			} );
		}

		// Per-property setup
		propTween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );
		if ( !( prop in dataShow ) ) {
			dataShow[ prop ] = propTween.start;
			if ( hidden ) {
				propTween.end = propTween.start;
				propTween.start = 0;
			}
		}
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( Array.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// Not quite $.extend, this won't overwrite existing keys.
			// Reusing 'index' because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// Don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3 only
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			// If there's more to do, yield
			if ( percent < 1 && length ) {
				return remaining;
			}

			// If this was an empty animation, synthesize a final progress notification
			if ( !length ) {
				deferred.notifyWith( elem, [ animation, 1, 0 ] );
			}

			// Resolve the animation and report its conclusion
			deferred.resolveWith( elem, [ animation ] );
			return false;
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// If we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// Resolve when we played the last frame; otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					result.stop.bind( result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	// Attach callbacks from options
	animation
		.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	return animation;
}

jQuery.Animation = jQuery.extend( Animation, {

	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnothtmlwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !isFunction( easing ) && easing
	};

	// Go to the end state if fx are off
	if ( jQuery.fx.off ) {
		opt.duration = 0;

	} else {
		if ( typeof opt.duration !== "number" ) {
			if ( opt.duration in jQuery.fx.speeds ) {
				opt.duration = jQuery.fx.speeds[ opt.duration ];

			} else {
				opt.duration = jQuery.fx.speeds._default;
			}
		}
	}

	// Normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// Show any hidden elements after setting opacity to 0
		return this.filter( isHiddenWithinTree ).css( "opacity", 0 ).show()

			// Animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || dataPriv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = dataPriv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// Start the next in the queue if the last step wasn't forced.
			// Timers currently will call their complete callbacks, which
			// will dequeue but only if they were gotoEnd.
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = dataPriv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// Enable finishing flag on private data
			data.finish = true;

			// Empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// Look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// Look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// Turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = Date.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Run the timer and safely remove it when done (allowing for external removal)
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	jQuery.fx.start();
};

jQuery.fx.interval = 13;
jQuery.fx.start = function() {
	if ( inProgress ) {
		return;
	}

	inProgress = true;
	schedule();
};

jQuery.fx.stop = function() {
	inProgress = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// https://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: Android <=4.3 only
	// Default value for a checkbox should be "on"
	support.checkOn = input.value !== "";

	// Support: IE <=11 only
	// Must access selectedIndex to make default options select
	support.optSelected = opt.selected;

	// Support: IE <=11 only
	// An input loses its value after becoming a radio
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
} )();


var boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// Attribute hooks are determined by the lowercase version
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			hooks = jQuery.attrHooks[ name.toLowerCase() ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : undefined );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					nodeName( elem, "input" ) ) {
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name,
			i = 0,

			// Attribute names can contain non-HTML whitespace characters
			// https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
			attrNames = value && value.match( rnothtmlwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				elem.removeAttribute( name );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle,
			lowercaseName = name.toLowerCase();

		if ( !isXML ) {

			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ lowercaseName ];
			attrHandle[ lowercaseName ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				lowercaseName :
				null;
			attrHandle[ lowercaseName ] = handle;
		}
		return ret;
	};
} );




var rfocusable = /^(?:input|select|textarea|button)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each( function() {
			delete this[ jQuery.propFix[ name ] || name ];
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// Support: IE <=9 - 11 only
				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// https://web.archive.org/web/20141116233347/http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				if ( tabindex ) {
					return parseInt( tabindex, 10 );
				}

				if (
					rfocusable.test( elem.nodeName ) ||
					rclickable.test( elem.nodeName ) &&
					elem.href
				) {
					return 0;
				}

				return -1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Support: IE <=11 only
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
// eslint rule "no-unused-expressions" is disabled for this code
// since it considers such accessions noop
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		},
		set: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );




	// Strip and collapse whitespace according to HTML spec
	// https://infra.spec.whatwg.org/#strip-and-collapse-ascii-whitespace
	function stripAndCollapse( value ) {
		var tokens = value.match( rnothtmlwhite ) || [];
		return tokens.join( " " );
	}


function getClass( elem ) {
	return elem.getAttribute && elem.getAttribute( "class" ) || "";
}

function classesToArray( value ) {
	if ( Array.isArray( value ) ) {
		return value;
	}
	if ( typeof value === "string" ) {
		return value.match( rnothtmlwhite ) || [];
	}
	return [];
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		classes = classesToArray( value );

		if ( classes.length ) {
			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		classes = classesToArray( value );

		if ( classes.length ) {
			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value,
			isValidValue = type === "string" || Array.isArray( value );

		if ( typeof stateVal === "boolean" && isValidValue ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( isValidValue ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = classesToArray( value );

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// Store className if set
					dataPriv.set( this, "__className__", className );
				}

				// If the element has a class name or if we're passed `false`,
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				if ( this.setAttribute ) {
					this.setAttribute( "class",
						className || value === false ?
						"" :
						dataPriv.get( this, "__className__" ) || ""
					);
				}
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + stripAndCollapse( getClass( elem ) ) + " " ).indexOf( className ) > -1 ) {
					return true;
			}
		}

		return false;
	}
} );




var rreturn = /\r/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, valueIsFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				// Handle most common string cases
				if ( typeof ret === "string" ) {
					return ret.replace( rreturn, "" );
				}

				// Handle cases where value is null/undef or number
				return ret == null ? "" : ret;
			}

			return;
		}

		valueIsFunction = isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( valueIsFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( Array.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {

				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE <=10 - 11 only
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					stripAndCollapse( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option, i,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one",
					values = one ? null : [],
					max = one ? index + 1 : options.length;

				if ( index < 0 ) {
					i = max;

				} else {
					i = one ? index : 0;
				}

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// Support: IE <=9 only
					// IE8-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							!option.disabled &&
							( !option.parentNode.disabled ||
								!nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					/* eslint-disable no-cond-assign */

					if ( option.selected =
						jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1
					) {
						optionSet = true;
					}

					/* eslint-enable no-cond-assign */
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( Array.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




// Return jQuery for attributes-only inclusion


support.focusin = "onfocusin" in window;


var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	stopPropagationCallback = function( e ) {
		e.stopPropagation();
	};

jQuery.extend( jQuery.event, {

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special, lastElement,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = lastElement = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {
			lastElement = cur;
			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( dataPriv.get( cur, "events" ) || {} )[ event.type ] &&
				dataPriv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( ( !special._default ||
				special._default.apply( eventPath.pop(), data ) === false ) &&
				acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && isFunction( elem[ type ] ) && !isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;

					if ( event.isPropagationStopped() ) {
						lastElement.addEventListener( type, stopPropagationCallback );
					}

					elem[ type ]();

					if ( event.isPropagationStopped() ) {
						lastElement.removeEventListener( type, stopPropagationCallback );
					}

					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	// Piggyback on a donor event to simulate a different one
	// Used only for `focus(in | out)` events
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true
			}
		);

		jQuery.event.trigger( e, null, elem );
	}

} );

jQuery.fn.extend( {

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


// Support: Firefox <=44
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome <=48 - 49, Safari <=9.0 - 9.1
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://bugs.chromium.org/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				dataPriv.access( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					dataPriv.remove( doc, fix );

				} else {
					dataPriv.access( doc, fix, attaches );
				}
			}
		};
	} );
}
var location = window.location;

var nonce = Date.now();

var rquery = ( /\?/ );



// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml;
	if ( !data || typeof data !== "string" ) {
		return null;
	}

	// Support: IE 9 - 11 only
	// IE throws on parseFromString with invalid input.
	try {
		xml = ( new window.DOMParser() ).parseFromString( data, "text/xml" );
	} catch ( e ) {
		xml = undefined;
	}

	if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( Array.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && toType( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, valueOrFunction ) {

			// If value is a function, invoke it and use its return value
			var value = isFunction( valueOrFunction ) ?
				valueOrFunction() :
				valueOrFunction;

			s[ s.length ] = encodeURIComponent( key ) + "=" +
				encodeURIComponent( value == null ? "" : value );
		};

	// If an array was passed in, assume that it is an array of form elements.
	if ( Array.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();

			if ( val == null ) {
				return null;
			}

			if ( Array.isArray( val ) ) {
				return jQuery.map( val, function( val ) {
					return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
				} );
			}

			return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


var
	r20 = /%20/g,
	rhash = /#.*$/,
	rantiCache = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Anchor tag for parsing the document origin
	originAnchor = document.createElement( "a" );
	originAnchor.href = location.href;

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnothtmlwhite ) || [];

		if ( isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType[ 0 ] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s.throws ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: location.href,
		type: "GET",
		isLocal: rlocalProtocol.test( location.protocol ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",

		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": JSON.parse,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,

			// URL without anti-cache param
			cacheURL,

			// Response headers
			responseHeadersString,
			responseHeaders,

			// timeout handle
			timeoutTimer,

			// Url cleanup var
			urlAnchor,

			// Request state (becomes false upon send and true upon completion)
			completed,

			// To know if global events are to be dispatched
			fireGlobals,

			// Loop variable
			i,

			// uncached part of the url
			uncached,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( completed ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return completed ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					if ( completed == null ) {
						name = requestHeadersNames[ name.toLowerCase() ] =
							requestHeadersNames[ name.toLowerCase() ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( completed == null ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( completed ) {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						} else {

							// Lazy-add the new callbacks in a way that preserves old ones
							for ( code in map ) {
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR );

		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || location.href ) + "" )
			.replace( rprotocol, location.protocol + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = ( s.dataType || "*" ).toLowerCase().match( rnothtmlwhite ) || [ "" ];

		// A cross-domain request is in order when the origin doesn't match the current origin.
		if ( s.crossDomain == null ) {
			urlAnchor = document.createElement( "a" );

			// Support: IE <=8 - 11, Edge 12 - 15
			// IE throws exception on accessing the href property if url is malformed,
			// e.g. http://example.com:80x/
			try {
				urlAnchor.href = s.url;

				// Support: IE <=8 - 11 only
				// Anchor's host property isn't correctly set when s.url is relative
				urlAnchor.href = urlAnchor.href;
				s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
					urlAnchor.protocol + "//" + urlAnchor.host;
			} catch ( e ) {

				// If there is an error parsing the URL, assume it is crossDomain,
				// it can be rejected by the transport if it is invalid
				s.crossDomain = true;
			}
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( completed ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		// Remove hash to simplify url manipulation
		cacheURL = s.url.replace( rhash, "" );

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// Remember the hash so we can put it back
			uncached = s.url.slice( cacheURL.length );

			// If data is available and should be processed, append data to url
			if ( s.data && ( s.processData || typeof s.data === "string" ) ) {
				cacheURL += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data;

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add or update anti-cache param if needed
			if ( s.cache === false ) {
				cacheURL = cacheURL.replace( rantiCache, "$1" );
				uncached = ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + ( nonce++ ) + uncached;
			}

			// Put hash and anti-cache on the URL that will be requested (gh-1732)
			s.url = cacheURL + uncached;

		// Change '%20' to '+' if this is encoded form body content (gh-2658)
		} else if ( s.data && s.processData &&
			( s.contentType || "" ).indexOf( "application/x-www-form-urlencoded" ) === 0 ) {
			s.data = s.data.replace( r20, "+" );
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || completed ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// Aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		completeDeferred.add( s.complete );
		jqXHR.done( s.success );
		jqXHR.fail( s.error );

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( completed ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				completed = false;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Rethrow post-completion exceptions
				if ( completed ) {
					throw e;
				}

				// Propagate others as results
				done( -1, e );
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Ignore repeat invocations
			if ( completed ) {
				return;
			}

			completed = true;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// Extract error from statusText and normalize for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// Shift arguments if data argument was omitted
		if ( isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );


jQuery._evalUrl = function( url ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,
		"throws": true
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		var wrap;

		if ( this[ 0 ] ) {
			if ( isFunction( html ) ) {
				html = html.call( this[ 0 ] );
			}

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var htmlIsFunction = isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( htmlIsFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function( selector ) {
		this.parent( selector ).not( "body" ).each( function() {
			jQuery( this ).replaceWith( this.childNodes );
		} );
		return this;
	}
} );


jQuery.expr.pseudos.hidden = function( elem ) {
	return !jQuery.expr.pseudos.visible( elem );
};
jQuery.expr.pseudos.visible = function( elem ) {
	return !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length );
};




jQuery.ajaxSettings.xhr = function() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
};

var xhrSuccessStatus = {

		// File protocol always yields status code 0, assume 200
		0: 200,

		// Support: IE <=9 only
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport( function( options ) {
	var callback, errorCallback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr();

				xhr.open(
					options.type,
					options.url,
					options.async,
					options.username,
					options.password
				);

				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}

				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}

				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
					headers[ "X-Requested-With" ] = "XMLHttpRequest";
				}

				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}

				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							callback = errorCallback = xhr.onload =
								xhr.onerror = xhr.onabort = xhr.ontimeout =
									xhr.onreadystatechange = null;

							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {

								// Support: IE <=9 only
								// On a manual native abort, IE9 throws
								// errors on any property access that is not readyState
								if ( typeof xhr.status !== "number" ) {
									complete( 0, "error" );
								} else {
									complete(

										// File: protocol always yields status 0; see #8605, #14207
										xhr.status,
										xhr.statusText
									);
								}
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,

									// Support: IE <=9 only
									// IE9 has no XHR2 but throws on binary (trac-11426)
									// For XHR2 non-text, let the caller handle it (gh-2498)
									( xhr.responseType || "text" ) !== "text"  ||
									typeof xhr.responseText !== "string" ?
										{ binary: xhr.response } :
										{ text: xhr.responseText },
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};

				// Listen to events
				xhr.onload = callback();
				errorCallback = xhr.onerror = xhr.ontimeout = callback( "error" );

				// Support: IE 9 only
				// Use onreadystatechange to replace onabort
				// to handle uncaught aborts
				if ( xhr.onabort !== undefined ) {
					xhr.onabort = errorCallback;
				} else {
					xhr.onreadystatechange = function() {

						// Check readyState before timeout as it changes
						if ( xhr.readyState === 4 ) {

							// Allow onerror to be called first,
							// but that will not handle a native abort
							// Also, save errorCallback to a variable
							// as xhr.onerror cannot be accessed
							window.setTimeout( function() {
								if ( callback ) {
									errorCallback();
								}
							} );
						}
					};
				}

				// Create the abort callback
				callback = callback( "abort" );

				try {

					// Do send the request (this may raise an exception)
					xhr.send( options.hasContent && options.data || null );
				} catch ( e ) {

					// #14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) {
						throw e;
					}
				}
			},

			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




// Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
jQuery.ajaxPrefilter( function( s ) {
	if ( s.crossDomain ) {
		s.contents.script = false;
	}
} );

// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery( "<script>" ).prop( {
					charset: s.scriptCharset,
					src: s.url
				} ).on(
					"load error",
					callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					}
				);

				// Use native DOM manipulation to avoid our domManip AJAX trickery
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// Force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// Make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// Save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// Support: Safari 8 only
// In Safari 8 documents created via document.implementation.createHTMLDocument
// collapse sibling forms: the second one becomes a child of the first one.
// Because of that, this security measure has to be disabled in Safari 8.
// https://bugs.webkit.org/show_bug.cgi?id=137337
support.createHTMLDocument = ( function() {
	var body = document.implementation.createHTMLDocument( "" ).body;
	body.innerHTML = "<form></form><form></form>";
	return body.childNodes.length === 2;
} )();


// Argument "data" should be string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( typeof data !== "string" ) {
		return [];
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}

	var base, parsed, scripts;

	if ( !context ) {

		// Stop scripts or inline event handlers from being executed immediately
		// by using document.implementation
		if ( support.createHTMLDocument ) {
			context = document.implementation.createHTMLDocument( "" );

			// Set the base href for the created document
			// so any parsed elements with URLs
			// are based on the document's URL (gh-2965)
			base = context.createElement( "base" );
			base.href = document.location.href;
			context.head.appendChild( base );
		} else {
			context = document;
		}
	}

	parsed = rsingleTag.exec( data );
	scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = stripAndCollapse( url.slice( off ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.expr.pseudos.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};




jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;

		// Need to be able to calculate position if either
		// top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {

	// offset() relates an element's border box to the document origin
	offset: function( options ) {

		// Preserve chaining for setter
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var rect, win,
			elem = this[ 0 ];

		if ( !elem ) {
			return;
		}

		// Return zeros for disconnected and hidden (display: none) elements (gh-2310)
		// Support: IE <=11 only
		// Running getBoundingClientRect on a
		// disconnected node in IE throws an error
		if ( !elem.getClientRects().length ) {
			return { top: 0, left: 0 };
		}

		// Get document-relative position by adding viewport scroll to viewport-relative gBCR
		rect = elem.getBoundingClientRect();
		win = elem.ownerDocument.defaultView;
		return {
			top: rect.top + win.pageYOffset,
			left: rect.left + win.pageXOffset
		};
	},

	// position() relates an element's margin box to its offset parent's padding box
	// This corresponds to the behavior of CSS absolute positioning
	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset, doc,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// position:fixed elements are offset from the viewport, which itself always has zero offset
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// Assume position:fixed implies availability of getBoundingClientRect
			offset = elem.getBoundingClientRect();

		} else {
			offset = this.offset();

			// Account for the *real* offset parent, which can be the document or its root element
			// when a statically positioned element is identified
			doc = elem.ownerDocument;
			offsetParent = elem.offsetParent || doc.documentElement;
			while ( offsetParent &&
				( offsetParent === doc.body || offsetParent === doc.documentElement ) &&
				jQuery.css( offsetParent, "position" ) === "static" ) {

				offsetParent = offsetParent.parentNode;
			}
			if ( offsetParent && offsetParent !== elem && offsetParent.nodeType === 1 ) {

				// Incorporate borders into its offset, since they are outside its content origin
				parentOffset = jQuery( offsetParent ).offset();
				parentOffset.top += jQuery.css( offsetParent, "borderTopWidth", true );
				parentOffset.left += jQuery.css( offsetParent, "borderLeftWidth", true );
			}
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	// This method will return documentElement in the following cases:
	// 1) For the element inside the iframe without offsetParent, this method will return
	//    documentElement of the parent window
	// 2) For the hidden or detached element
	// 3) For body or html element, i.e. in case of the html node - it will return itself
	//
	// but those exceptions were never presented as a real life use-cases
	// and might be considered as more preferable results.
	//
	// This logic, however, is not guaranteed and can change at any point in the future
	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && jQuery.css( offsetParent, "position" ) === "static" ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {

			// Coalesce documents and windows
			var win;
			if ( isWindow( elem ) ) {
				win = elem;
			} else if ( elem.nodeType === 9 ) {
				win = elem.defaultView;
			}

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : win.pageXOffset,
					top ? val : win.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length );
	};
} );

// Support: Safari <=7 - 9.1, Chrome <=37 - 49
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://bugs.chromium.org/p/chromium/issues/detail?id=589347
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
		function( defaultExtra, funcName ) {

		// Margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( isWindow( elem ) ) {

					// $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)
					return funcName.indexOf( "outer" ) === 0 ?
						elem[ "inner" + name ] :
						elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable );
		};
	} );
} );


jQuery.each( ( "blur focus focusin focusout resize scroll click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup contextmenu" ).split( " " ),
	function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
} );

jQuery.fn.extend( {
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );




jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	}
} );

// Bind a function to a context, optionally partially applying any
// arguments.
// jQuery.proxy is deprecated to promote standards (specifically Function#bind)
// However, it is not slated for removal any time soon
jQuery.proxy = function( fn, context ) {
	var tmp, args, proxy;

	if ( typeof context === "string" ) {
		tmp = fn[ context ];
		context = fn;
		fn = tmp;
	}

	// Quick check to determine if target is callable, in the spec
	// this throws a TypeError, but we will just return undefined.
	if ( !isFunction( fn ) ) {
		return undefined;
	}

	// Simulated bind
	args = slice.call( arguments, 2 );
	proxy = function() {
		return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
	};

	// Set the guid of unique handler to the same of original handler, so it can be removed
	proxy.guid = fn.guid = fn.guid || jQuery.guid++;

	return proxy;
};

jQuery.holdReady = function( hold ) {
	if ( hold ) {
		jQuery.readyWait++;
	} else {
		jQuery.ready( true );
	}
};
jQuery.isArray = Array.isArray;
jQuery.parseJSON = JSON.parse;
jQuery.nodeName = nodeName;
jQuery.isFunction = isFunction;
jQuery.isWindow = isWindow;
jQuery.camelCase = camelCase;
jQuery.type = toType;

jQuery.now = Date.now;

jQuery.isNumeric = function( obj ) {

	// As of jQuery 3.0, isNumeric is limited to
	// strings and numbers (primitives or objects)
	// that can be coerced to finite numbers (gh-2662)
	var type = jQuery.type( obj );
	return ( type === "number" || type === "string" ) &&

		// parseFloat NaNs numeric-cast false positives ("")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		!isNaN( obj - parseFloat( obj ) );
};




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( true ) {
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function() {
		return jQuery;
	}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}




var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;
} );


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__(40)
var ieee754 = __webpack_require__(41)
var isArray = __webpack_require__(13)

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 10 */
/***/ (function(module, exports) {

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      } else {
        // At least give some kind of context to the user
        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
        err.context = er;
        throw err;
      }
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        args = Array.prototype.slice.call(arguments, 1);
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    args = Array.prototype.slice.call(arguments, 1);
    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else if (listeners) {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.prototype.listenerCount = function(type) {
  if (this._events) {
    var evlistener = this._events[type];

    if (isFunction(evlistener))
      return 1;
    else if (evlistener)
      return evlistener.length;
  }
  return 0;
};

EventEmitter.listenerCount = function(emitter, type) {
  return emitter.listenerCount(type);
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(14);
exports.Stream = exports;
exports.Readable = exports;
exports.Writable = __webpack_require__(12);
exports.Duplex = __webpack_require__(0);
exports.Transform = __webpack_require__(18);
exports.PassThrough = __webpack_require__(49);


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process, setImmediate, global) {// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// A bit simpler than readable streams.
// Implement an async ._write(chunk, encoding, cb), and it'll handle all
// the drain event emission and buffering.



/*<replacement>*/

var pna = __webpack_require__(6);
/*</replacement>*/

module.exports = Writable;

/* <replacement> */
function WriteReq(chunk, encoding, cb) {
  this.chunk = chunk;
  this.encoding = encoding;
  this.callback = cb;
  this.next = null;
}

// It seems a linked list but it is not
// there will be only 2 of these for each stream
function CorkedRequest(state) {
  var _this = this;

  this.next = null;
  this.entry = null;
  this.finish = function () {
    onCorkedFinish(_this, state);
  };
}
/* </replacement> */

/*<replacement>*/
var asyncWrite = !process.browser && ['v0.10', 'v0.9.'].indexOf(process.version.slice(0, 5)) > -1 ? setImmediate : pna.nextTick;
/*</replacement>*/

/*<replacement>*/
var Duplex;
/*</replacement>*/

Writable.WritableState = WritableState;

/*<replacement>*/
var util = __webpack_require__(5);
util.inherits = __webpack_require__(3);
/*</replacement>*/

/*<replacement>*/
var internalUtil = {
  deprecate: __webpack_require__(48)
};
/*</replacement>*/

/*<replacement>*/
var Stream = __webpack_require__(15);
/*</replacement>*/

/*<replacement>*/

var Buffer = __webpack_require__(7).Buffer;
var OurUint8Array = global.Uint8Array || function () {};
function _uint8ArrayToBuffer(chunk) {
  return Buffer.from(chunk);
}
function _isUint8Array(obj) {
  return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;
}

/*</replacement>*/

var destroyImpl = __webpack_require__(16);

util.inherits(Writable, Stream);

function nop() {}

function WritableState(options, stream) {
  Duplex = Duplex || __webpack_require__(0);

  options = options || {};

  // Duplex streams are both readable and writable, but share
  // the same options object.
  // However, some cases require setting options to different
  // values for the readable and the writable sides of the duplex stream.
  // These options can be provided separately as readableXXX and writableXXX.
  var isDuplex = stream instanceof Duplex;

  // object stream flag to indicate whether or not this stream
  // contains buffers or objects.
  this.objectMode = !!options.objectMode;

  if (isDuplex) this.objectMode = this.objectMode || !!options.writableObjectMode;

  // the point at which write() starts returning false
  // Note: 0 is a valid value, means that we always return false if
  // the entire buffer is not flushed immediately on write()
  var hwm = options.highWaterMark;
  var writableHwm = options.writableHighWaterMark;
  var defaultHwm = this.objectMode ? 16 : 16 * 1024;

  if (hwm || hwm === 0) this.highWaterMark = hwm;else if (isDuplex && (writableHwm || writableHwm === 0)) this.highWaterMark = writableHwm;else this.highWaterMark = defaultHwm;

  // cast to ints.
  this.highWaterMark = Math.floor(this.highWaterMark);

  // if _final has been called
  this.finalCalled = false;

  // drain event flag.
  this.needDrain = false;
  // at the start of calling end()
  this.ending = false;
  // when end() has been called, and returned
  this.ended = false;
  // when 'finish' is emitted
  this.finished = false;

  // has it been destroyed
  this.destroyed = false;

  // should we decode strings into buffers before passing to _write?
  // this is here so that some node-core streams can optimize string
  // handling at a lower level.
  var noDecode = options.decodeStrings === false;
  this.decodeStrings = !noDecode;

  // Crypto is kind of old and crusty.  Historically, its default string
  // encoding is 'binary' so we have to make this configurable.
  // Everything else in the universe uses 'utf8', though.
  this.defaultEncoding = options.defaultEncoding || 'utf8';

  // not an actual buffer we keep track of, but a measurement
  // of how much we're waiting to get pushed to some underlying
  // socket or file.
  this.length = 0;

  // a flag to see when we're in the middle of a write.
  this.writing = false;

  // when true all writes will be buffered until .uncork() call
  this.corked = 0;

  // a flag to be able to tell if the onwrite cb is called immediately,
  // or on a later tick.  We set this to true at first, because any
  // actions that shouldn't happen until "later" should generally also
  // not happen before the first write call.
  this.sync = true;

  // a flag to know if we're processing previously buffered items, which
  // may call the _write() callback in the same tick, so that we don't
  // end up in an overlapped onwrite situation.
  this.bufferProcessing = false;

  // the callback that's passed to _write(chunk,cb)
  this.onwrite = function (er) {
    onwrite(stream, er);
  };

  // the callback that the user supplies to write(chunk,encoding,cb)
  this.writecb = null;

  // the amount that is being written when _write is called.
  this.writelen = 0;

  this.bufferedRequest = null;
  this.lastBufferedRequest = null;

  // number of pending user-supplied write callbacks
  // this must be 0 before 'finish' can be emitted
  this.pendingcb = 0;

  // emit prefinish if the only thing we're waiting for is _write cbs
  // This is relevant for synchronous Transform streams
  this.prefinished = false;

  // True if the error was already emitted and should not be thrown again
  this.errorEmitted = false;

  // count buffered requests
  this.bufferedRequestCount = 0;

  // allocate the first CorkedRequest, there is always
  // one allocated and free to use, and we maintain at most two
  this.corkedRequestsFree = new CorkedRequest(this);
}

WritableState.prototype.getBuffer = function getBuffer() {
  var current = this.bufferedRequest;
  var out = [];
  while (current) {
    out.push(current);
    current = current.next;
  }
  return out;
};

(function () {
  try {
    Object.defineProperty(WritableState.prototype, 'buffer', {
      get: internalUtil.deprecate(function () {
        return this.getBuffer();
      }, '_writableState.buffer is deprecated. Use _writableState.getBuffer ' + 'instead.', 'DEP0003')
    });
  } catch (_) {}
})();

// Test _writableState for inheritance to account for Duplex streams,
// whose prototype chain only points to Readable.
var realHasInstance;
if (typeof Symbol === 'function' && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] === 'function') {
  realHasInstance = Function.prototype[Symbol.hasInstance];
  Object.defineProperty(Writable, Symbol.hasInstance, {
    value: function (object) {
      if (realHasInstance.call(this, object)) return true;
      if (this !== Writable) return false;

      return object && object._writableState instanceof WritableState;
    }
  });
} else {
  realHasInstance = function (object) {
    return object instanceof this;
  };
}

function Writable(options) {
  Duplex = Duplex || __webpack_require__(0);

  // Writable ctor is applied to Duplexes, too.
  // `realHasInstance` is necessary because using plain `instanceof`
  // would return false, as no `_writableState` property is attached.

  // Trying to use the custom `instanceof` for Writable here will also break the
  // Node.js LazyTransform implementation, which has a non-trivial getter for
  // `_writableState` that would lead to infinite recursion.
  if (!realHasInstance.call(Writable, this) && !(this instanceof Duplex)) {
    return new Writable(options);
  }

  this._writableState = new WritableState(options, this);

  // legacy.
  this.writable = true;

  if (options) {
    if (typeof options.write === 'function') this._write = options.write;

    if (typeof options.writev === 'function') this._writev = options.writev;

    if (typeof options.destroy === 'function') this._destroy = options.destroy;

    if (typeof options.final === 'function') this._final = options.final;
  }

  Stream.call(this);
}

// Otherwise people can pipe Writable streams, which is just wrong.
Writable.prototype.pipe = function () {
  this.emit('error', new Error('Cannot pipe, not readable'));
};

function writeAfterEnd(stream, cb) {
  var er = new Error('write after end');
  // TODO: defer error events consistently everywhere, not just the cb
  stream.emit('error', er);
  pna.nextTick(cb, er);
}

// Checks that a user-supplied chunk is valid, especially for the particular
// mode the stream is in. Currently this means that `null` is never accepted
// and undefined/non-string values are only allowed in object mode.
function validChunk(stream, state, chunk, cb) {
  var valid = true;
  var er = false;

  if (chunk === null) {
    er = new TypeError('May not write null values to stream');
  } else if (typeof chunk !== 'string' && chunk !== undefined && !state.objectMode) {
    er = new TypeError('Invalid non-string/buffer chunk');
  }
  if (er) {
    stream.emit('error', er);
    pna.nextTick(cb, er);
    valid = false;
  }
  return valid;
}

Writable.prototype.write = function (chunk, encoding, cb) {
  var state = this._writableState;
  var ret = false;
  var isBuf = !state.objectMode && _isUint8Array(chunk);

  if (isBuf && !Buffer.isBuffer(chunk)) {
    chunk = _uint8ArrayToBuffer(chunk);
  }

  if (typeof encoding === 'function') {
    cb = encoding;
    encoding = null;
  }

  if (isBuf) encoding = 'buffer';else if (!encoding) encoding = state.defaultEncoding;

  if (typeof cb !== 'function') cb = nop;

  if (state.ended) writeAfterEnd(this, cb);else if (isBuf || validChunk(this, state, chunk, cb)) {
    state.pendingcb++;
    ret = writeOrBuffer(this, state, isBuf, chunk, encoding, cb);
  }

  return ret;
};

Writable.prototype.cork = function () {
  var state = this._writableState;

  state.corked++;
};

Writable.prototype.uncork = function () {
  var state = this._writableState;

  if (state.corked) {
    state.corked--;

    if (!state.writing && !state.corked && !state.finished && !state.bufferProcessing && state.bufferedRequest) clearBuffer(this, state);
  }
};

Writable.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {
  // node::ParseEncoding() requires lower case.
  if (typeof encoding === 'string') encoding = encoding.toLowerCase();
  if (!(['hex', 'utf8', 'utf-8', 'ascii', 'binary', 'base64', 'ucs2', 'ucs-2', 'utf16le', 'utf-16le', 'raw'].indexOf((encoding + '').toLowerCase()) > -1)) throw new TypeError('Unknown encoding: ' + encoding);
  this._writableState.defaultEncoding = encoding;
  return this;
};

function decodeChunk(state, chunk, encoding) {
  if (!state.objectMode && state.decodeStrings !== false && typeof chunk === 'string') {
    chunk = Buffer.from(chunk, encoding);
  }
  return chunk;
}

Object.defineProperty(Writable.prototype, 'writableHighWaterMark', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function () {
    return this._writableState.highWaterMark;
  }
});

// if we're already writing something, then just put this
// in the queue, and wait our turn.  Otherwise, call _write
// If we return false, then we need a drain event, so set that flag.
function writeOrBuffer(stream, state, isBuf, chunk, encoding, cb) {
  if (!isBuf) {
    var newChunk = decodeChunk(state, chunk, encoding);
    if (chunk !== newChunk) {
      isBuf = true;
      encoding = 'buffer';
      chunk = newChunk;
    }
  }
  var len = state.objectMode ? 1 : chunk.length;

  state.length += len;

  var ret = state.length < state.highWaterMark;
  // we must ensure that previous needDrain will not be reset to false.
  if (!ret) state.needDrain = true;

  if (state.writing || state.corked) {
    var last = state.lastBufferedRequest;
    state.lastBufferedRequest = {
      chunk: chunk,
      encoding: encoding,
      isBuf: isBuf,
      callback: cb,
      next: null
    };
    if (last) {
      last.next = state.lastBufferedRequest;
    } else {
      state.bufferedRequest = state.lastBufferedRequest;
    }
    state.bufferedRequestCount += 1;
  } else {
    doWrite(stream, state, false, len, chunk, encoding, cb);
  }

  return ret;
}

function doWrite(stream, state, writev, len, chunk, encoding, cb) {
  state.writelen = len;
  state.writecb = cb;
  state.writing = true;
  state.sync = true;
  if (writev) stream._writev(chunk, state.onwrite);else stream._write(chunk, encoding, state.onwrite);
  state.sync = false;
}

function onwriteError(stream, state, sync, er, cb) {
  --state.pendingcb;

  if (sync) {
    // defer the callback if we are being called synchronously
    // to avoid piling up things on the stack
    pna.nextTick(cb, er);
    // this can emit finish, and it will always happen
    // after error
    pna.nextTick(finishMaybe, stream, state);
    stream._writableState.errorEmitted = true;
    stream.emit('error', er);
  } else {
    // the caller expect this to happen before if
    // it is async
    cb(er);
    stream._writableState.errorEmitted = true;
    stream.emit('error', er);
    // this can emit finish, but finish must
    // always follow error
    finishMaybe(stream, state);
  }
}

function onwriteStateUpdate(state) {
  state.writing = false;
  state.writecb = null;
  state.length -= state.writelen;
  state.writelen = 0;
}

function onwrite(stream, er) {
  var state = stream._writableState;
  var sync = state.sync;
  var cb = state.writecb;

  onwriteStateUpdate(state);

  if (er) onwriteError(stream, state, sync, er, cb);else {
    // Check if we're actually ready to finish, but don't emit yet
    var finished = needFinish(state);

    if (!finished && !state.corked && !state.bufferProcessing && state.bufferedRequest) {
      clearBuffer(stream, state);
    }

    if (sync) {
      /*<replacement>*/
      asyncWrite(afterWrite, stream, state, finished, cb);
      /*</replacement>*/
    } else {
      afterWrite(stream, state, finished, cb);
    }
  }
}

function afterWrite(stream, state, finished, cb) {
  if (!finished) onwriteDrain(stream, state);
  state.pendingcb--;
  cb();
  finishMaybe(stream, state);
}

// Must force callback to be called on nextTick, so that we don't
// emit 'drain' before the write() consumer gets the 'false' return
// value, and has a chance to attach a 'drain' listener.
function onwriteDrain(stream, state) {
  if (state.length === 0 && state.needDrain) {
    state.needDrain = false;
    stream.emit('drain');
  }
}

// if there's something in the buffer waiting, then process it
function clearBuffer(stream, state) {
  state.bufferProcessing = true;
  var entry = state.bufferedRequest;

  if (stream._writev && entry && entry.next) {
    // Fast case, write everything using _writev()
    var l = state.bufferedRequestCount;
    var buffer = new Array(l);
    var holder = state.corkedRequestsFree;
    holder.entry = entry;

    var count = 0;
    var allBuffers = true;
    while (entry) {
      buffer[count] = entry;
      if (!entry.isBuf) allBuffers = false;
      entry = entry.next;
      count += 1;
    }
    buffer.allBuffers = allBuffers;

    doWrite(stream, state, true, state.length, buffer, '', holder.finish);

    // doWrite is almost always async, defer these to save a bit of time
    // as the hot path ends with doWrite
    state.pendingcb++;
    state.lastBufferedRequest = null;
    if (holder.next) {
      state.corkedRequestsFree = holder.next;
      holder.next = null;
    } else {
      state.corkedRequestsFree = new CorkedRequest(state);
    }
    state.bufferedRequestCount = 0;
  } else {
    // Slow case, write chunks one-by-one
    while (entry) {
      var chunk = entry.chunk;
      var encoding = entry.encoding;
      var cb = entry.callback;
      var len = state.objectMode ? 1 : chunk.length;

      doWrite(stream, state, false, len, chunk, encoding, cb);
      entry = entry.next;
      state.bufferedRequestCount--;
      // if we didn't call the onwrite immediately, then
      // it means that we need to wait until it does.
      // also, that means that the chunk and cb are currently
      // being processed, so move the buffer counter past them.
      if (state.writing) {
        break;
      }
    }

    if (entry === null) state.lastBufferedRequest = null;
  }

  state.bufferedRequest = entry;
  state.bufferProcessing = false;
}

Writable.prototype._write = function (chunk, encoding, cb) {
  cb(new Error('_write() is not implemented'));
};

Writable.prototype._writev = null;

Writable.prototype.end = function (chunk, encoding, cb) {
  var state = this._writableState;

  if (typeof chunk === 'function') {
    cb = chunk;
    chunk = null;
    encoding = null;
  } else if (typeof encoding === 'function') {
    cb = encoding;
    encoding = null;
  }

  if (chunk !== null && chunk !== undefined) this.write(chunk, encoding);

  // .end() fully uncorks
  if (state.corked) {
    state.corked = 1;
    this.uncork();
  }

  // ignore unnecessary end() calls.
  if (!state.ending && !state.finished) endWritable(this, state, cb);
};

function needFinish(state) {
  return state.ending && state.length === 0 && state.bufferedRequest === null && !state.finished && !state.writing;
}
function callFinal(stream, state) {
  stream._final(function (err) {
    state.pendingcb--;
    if (err) {
      stream.emit('error', err);
    }
    state.prefinished = true;
    stream.emit('prefinish');
    finishMaybe(stream, state);
  });
}
function prefinish(stream, state) {
  if (!state.prefinished && !state.finalCalled) {
    if (typeof stream._final === 'function') {
      state.pendingcb++;
      state.finalCalled = true;
      pna.nextTick(callFinal, stream, state);
    } else {
      state.prefinished = true;
      stream.emit('prefinish');
    }
  }
}

function finishMaybe(stream, state) {
  var need = needFinish(state);
  if (need) {
    prefinish(stream, state);
    if (state.pendingcb === 0) {
      state.finished = true;
      stream.emit('finish');
    }
  }
  return need;
}

function endWritable(stream, state, cb) {
  state.ending = true;
  finishMaybe(stream, state);
  if (cb) {
    if (state.finished) pna.nextTick(cb);else stream.once('finish', cb);
  }
  state.ended = true;
  stream.writable = false;
}

function onCorkedFinish(corkReq, state, err) {
  var entry = corkReq.entry;
  corkReq.entry = null;
  while (entry) {
    var cb = entry.callback;
    state.pendingcb--;
    cb(err);
    entry = entry.next;
  }
  if (state.corkedRequestsFree) {
    state.corkedRequestsFree.next = corkReq;
  } else {
    state.corkedRequestsFree = corkReq;
  }
}

Object.defineProperty(Writable.prototype, 'destroyed', {
  get: function () {
    if (this._writableState === undefined) {
      return false;
    }
    return this._writableState.destroyed;
  },
  set: function (value) {
    // we ignore the value if the stream
    // has not been initialized yet
    if (!this._writableState) {
      return;
    }

    // backward compatibility, the user is explicitly
    // managing destroyed
    this._writableState.destroyed = value;
  }
});

Writable.prototype.destroy = destroyImpl.destroy;
Writable.prototype._undestroy = destroyImpl.undestroy;
Writable.prototype._destroy = function (err, cb) {
  this.end();
  cb(err);
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(46).setImmediate, __webpack_require__(2)))

/***/ }),
/* 13 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, process) {// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



/*<replacement>*/

var pna = __webpack_require__(6);
/*</replacement>*/

module.exports = Readable;

/*<replacement>*/
var isArray = __webpack_require__(13);
/*</replacement>*/

/*<replacement>*/
var Duplex;
/*</replacement>*/

Readable.ReadableState = ReadableState;

/*<replacement>*/
var EE = __webpack_require__(10).EventEmitter;

var EElistenerCount = function (emitter, type) {
  return emitter.listeners(type).length;
};
/*</replacement>*/

/*<replacement>*/
var Stream = __webpack_require__(15);
/*</replacement>*/

/*<replacement>*/

var Buffer = __webpack_require__(7).Buffer;
var OurUint8Array = global.Uint8Array || function () {};
function _uint8ArrayToBuffer(chunk) {
  return Buffer.from(chunk);
}
function _isUint8Array(obj) {
  return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;
}

/*</replacement>*/

/*<replacement>*/
var util = __webpack_require__(5);
util.inherits = __webpack_require__(3);
/*</replacement>*/

/*<replacement>*/
var debugUtil = __webpack_require__(43);
var debug = void 0;
if (debugUtil && debugUtil.debuglog) {
  debug = debugUtil.debuglog('stream');
} else {
  debug = function () {};
}
/*</replacement>*/

var BufferList = __webpack_require__(44);
var destroyImpl = __webpack_require__(16);
var StringDecoder;

util.inherits(Readable, Stream);

var kProxyEvents = ['error', 'close', 'destroy', 'pause', 'resume'];

function prependListener(emitter, event, fn) {
  // Sadly this is not cacheable as some libraries bundle their own
  // event emitter implementation with them.
  if (typeof emitter.prependListener === 'function') return emitter.prependListener(event, fn);

  // This is a hack to make sure that our error handler is attached before any
  // userland ones.  NEVER DO THIS. This is here only because this code needs
  // to continue to work with older versions of Node.js that do not include
  // the prependListener() method. The goal is to eventually remove this hack.
  if (!emitter._events || !emitter._events[event]) emitter.on(event, fn);else if (isArray(emitter._events[event])) emitter._events[event].unshift(fn);else emitter._events[event] = [fn, emitter._events[event]];
}

function ReadableState(options, stream) {
  Duplex = Duplex || __webpack_require__(0);

  options = options || {};

  // Duplex streams are both readable and writable, but share
  // the same options object.
  // However, some cases require setting options to different
  // values for the readable and the writable sides of the duplex stream.
  // These options can be provided separately as readableXXX and writableXXX.
  var isDuplex = stream instanceof Duplex;

  // object stream flag. Used to make read(n) ignore n and to
  // make all the buffer merging and length checks go away
  this.objectMode = !!options.objectMode;

  if (isDuplex) this.objectMode = this.objectMode || !!options.readableObjectMode;

  // the point at which it stops calling _read() to fill the buffer
  // Note: 0 is a valid value, means "don't call _read preemptively ever"
  var hwm = options.highWaterMark;
  var readableHwm = options.readableHighWaterMark;
  var defaultHwm = this.objectMode ? 16 : 16 * 1024;

  if (hwm || hwm === 0) this.highWaterMark = hwm;else if (isDuplex && (readableHwm || readableHwm === 0)) this.highWaterMark = readableHwm;else this.highWaterMark = defaultHwm;

  // cast to ints.
  this.highWaterMark = Math.floor(this.highWaterMark);

  // A linked list is used to store data chunks instead of an array because the
  // linked list can remove elements from the beginning faster than
  // array.shift()
  this.buffer = new BufferList();
  this.length = 0;
  this.pipes = null;
  this.pipesCount = 0;
  this.flowing = null;
  this.ended = false;
  this.endEmitted = false;
  this.reading = false;

  // a flag to be able to tell if the event 'readable'/'data' is emitted
  // immediately, or on a later tick.  We set this to true at first, because
  // any actions that shouldn't happen until "later" should generally also
  // not happen before the first read call.
  this.sync = true;

  // whenever we return null, then we set a flag to say
  // that we're awaiting a 'readable' event emission.
  this.needReadable = false;
  this.emittedReadable = false;
  this.readableListening = false;
  this.resumeScheduled = false;

  // has it been destroyed
  this.destroyed = false;

  // Crypto is kind of old and crusty.  Historically, its default string
  // encoding is 'binary' so we have to make this configurable.
  // Everything else in the universe uses 'utf8', though.
  this.defaultEncoding = options.defaultEncoding || 'utf8';

  // the number of writers that are awaiting a drain event in .pipe()s
  this.awaitDrain = 0;

  // if true, a maybeReadMore has been scheduled
  this.readingMore = false;

  this.decoder = null;
  this.encoding = null;
  if (options.encoding) {
    if (!StringDecoder) StringDecoder = __webpack_require__(17).StringDecoder;
    this.decoder = new StringDecoder(options.encoding);
    this.encoding = options.encoding;
  }
}

function Readable(options) {
  Duplex = Duplex || __webpack_require__(0);

  if (!(this instanceof Readable)) return new Readable(options);

  this._readableState = new ReadableState(options, this);

  // legacy
  this.readable = true;

  if (options) {
    if (typeof options.read === 'function') this._read = options.read;

    if (typeof options.destroy === 'function') this._destroy = options.destroy;
  }

  Stream.call(this);
}

Object.defineProperty(Readable.prototype, 'destroyed', {
  get: function () {
    if (this._readableState === undefined) {
      return false;
    }
    return this._readableState.destroyed;
  },
  set: function (value) {
    // we ignore the value if the stream
    // has not been initialized yet
    if (!this._readableState) {
      return;
    }

    // backward compatibility, the user is explicitly
    // managing destroyed
    this._readableState.destroyed = value;
  }
});

Readable.prototype.destroy = destroyImpl.destroy;
Readable.prototype._undestroy = destroyImpl.undestroy;
Readable.prototype._destroy = function (err, cb) {
  this.push(null);
  cb(err);
};

// Manually shove something into the read() buffer.
// This returns true if the highWaterMark has not been hit yet,
// similar to how Writable.write() returns true if you should
// write() some more.
Readable.prototype.push = function (chunk, encoding) {
  var state = this._readableState;
  var skipChunkCheck;

  if (!state.objectMode) {
    if (typeof chunk === 'string') {
      encoding = encoding || state.defaultEncoding;
      if (encoding !== state.encoding) {
        chunk = Buffer.from(chunk, encoding);
        encoding = '';
      }
      skipChunkCheck = true;
    }
  } else {
    skipChunkCheck = true;
  }

  return readableAddChunk(this, chunk, encoding, false, skipChunkCheck);
};

// Unshift should *always* be something directly out of read()
Readable.prototype.unshift = function (chunk) {
  return readableAddChunk(this, chunk, null, true, false);
};

function readableAddChunk(stream, chunk, encoding, addToFront, skipChunkCheck) {
  var state = stream._readableState;
  if (chunk === null) {
    state.reading = false;
    onEofChunk(stream, state);
  } else {
    var er;
    if (!skipChunkCheck) er = chunkInvalid(state, chunk);
    if (er) {
      stream.emit('error', er);
    } else if (state.objectMode || chunk && chunk.length > 0) {
      if (typeof chunk !== 'string' && !state.objectMode && Object.getPrototypeOf(chunk) !== Buffer.prototype) {
        chunk = _uint8ArrayToBuffer(chunk);
      }

      if (addToFront) {
        if (state.endEmitted) stream.emit('error', new Error('stream.unshift() after end event'));else addChunk(stream, state, chunk, true);
      } else if (state.ended) {
        stream.emit('error', new Error('stream.push() after EOF'));
      } else {
        state.reading = false;
        if (state.decoder && !encoding) {
          chunk = state.decoder.write(chunk);
          if (state.objectMode || chunk.length !== 0) addChunk(stream, state, chunk, false);else maybeReadMore(stream, state);
        } else {
          addChunk(stream, state, chunk, false);
        }
      }
    } else if (!addToFront) {
      state.reading = false;
    }
  }

  return needMoreData(state);
}

function addChunk(stream, state, chunk, addToFront) {
  if (state.flowing && state.length === 0 && !state.sync) {
    stream.emit('data', chunk);
    stream.read(0);
  } else {
    // update the buffer info.
    state.length += state.objectMode ? 1 : chunk.length;
    if (addToFront) state.buffer.unshift(chunk);else state.buffer.push(chunk);

    if (state.needReadable) emitReadable(stream);
  }
  maybeReadMore(stream, state);
}

function chunkInvalid(state, chunk) {
  var er;
  if (!_isUint8Array(chunk) && typeof chunk !== 'string' && chunk !== undefined && !state.objectMode) {
    er = new TypeError('Invalid non-string/buffer chunk');
  }
  return er;
}

// if it's past the high water mark, we can push in some more.
// Also, if we have no data yet, we can stand some
// more bytes.  This is to work around cases where hwm=0,
// such as the repl.  Also, if the push() triggered a
// readable event, and the user called read(largeNumber) such that
// needReadable was set, then we ought to push more, so that another
// 'readable' event will be triggered.
function needMoreData(state) {
  return !state.ended && (state.needReadable || state.length < state.highWaterMark || state.length === 0);
}

Readable.prototype.isPaused = function () {
  return this._readableState.flowing === false;
};

// backwards compatibility.
Readable.prototype.setEncoding = function (enc) {
  if (!StringDecoder) StringDecoder = __webpack_require__(17).StringDecoder;
  this._readableState.decoder = new StringDecoder(enc);
  this._readableState.encoding = enc;
  return this;
};

// Don't raise the hwm > 8MB
var MAX_HWM = 0x800000;
function computeNewHighWaterMark(n) {
  if (n >= MAX_HWM) {
    n = MAX_HWM;
  } else {
    // Get the next highest power of 2 to prevent increasing hwm excessively in
    // tiny amounts
    n--;
    n |= n >>> 1;
    n |= n >>> 2;
    n |= n >>> 4;
    n |= n >>> 8;
    n |= n >>> 16;
    n++;
  }
  return n;
}

// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function howMuchToRead(n, state) {
  if (n <= 0 || state.length === 0 && state.ended) return 0;
  if (state.objectMode) return 1;
  if (n !== n) {
    // Only flow one buffer at a time
    if (state.flowing && state.length) return state.buffer.head.data.length;else return state.length;
  }
  // If we're asking for more than the current hwm, then raise the hwm.
  if (n > state.highWaterMark) state.highWaterMark = computeNewHighWaterMark(n);
  if (n <= state.length) return n;
  // Don't have enough
  if (!state.ended) {
    state.needReadable = true;
    return 0;
  }
  return state.length;
}

// you can override either this method, or the async _read(n) below.
Readable.prototype.read = function (n) {
  debug('read', n);
  n = parseInt(n, 10);
  var state = this._readableState;
  var nOrig = n;

  if (n !== 0) state.emittedReadable = false;

  // if we're doing read(0) to trigger a readable event, but we
  // already have a bunch of data in the buffer, then just trigger
  // the 'readable' event and move on.
  if (n === 0 && state.needReadable && (state.length >= state.highWaterMark || state.ended)) {
    debug('read: emitReadable', state.length, state.ended);
    if (state.length === 0 && state.ended) endReadable(this);else emitReadable(this);
    return null;
  }

  n = howMuchToRead(n, state);

  // if we've ended, and we're now clear, then finish it up.
  if (n === 0 && state.ended) {
    if (state.length === 0) endReadable(this);
    return null;
  }

  // All the actual chunk generation logic needs to be
  // *below* the call to _read.  The reason is that in certain
  // synthetic stream cases, such as passthrough streams, _read
  // may be a completely synchronous operation which may change
  // the state of the read buffer, providing enough data when
  // before there was *not* enough.
  //
  // So, the steps are:
  // 1. Figure out what the state of things will be after we do
  // a read from the buffer.
  //
  // 2. If that resulting state will trigger a _read, then call _read.
  // Note that this may be asynchronous, or synchronous.  Yes, it is
  // deeply ugly to write APIs this way, but that still doesn't mean
  // that the Readable class should behave improperly, as streams are
  // designed to be sync/async agnostic.
  // Take note if the _read call is sync or async (ie, if the read call
  // has returned yet), so that we know whether or not it's safe to emit
  // 'readable' etc.
  //
  // 3. Actually pull the requested chunks out of the buffer and return.

  // if we need a readable event, then we need to do some reading.
  var doRead = state.needReadable;
  debug('need readable', doRead);

  // if we currently have less than the highWaterMark, then also read some
  if (state.length === 0 || state.length - n < state.highWaterMark) {
    doRead = true;
    debug('length less than watermark', doRead);
  }

  // however, if we've ended, then there's no point, and if we're already
  // reading, then it's unnecessary.
  if (state.ended || state.reading) {
    doRead = false;
    debug('reading or ended', doRead);
  } else if (doRead) {
    debug('do read');
    state.reading = true;
    state.sync = true;
    // if the length is currently zero, then we *need* a readable event.
    if (state.length === 0) state.needReadable = true;
    // call internal read method
    this._read(state.highWaterMark);
    state.sync = false;
    // If _read pushed data synchronously, then `reading` will be false,
    // and we need to re-evaluate how much data we can return to the user.
    if (!state.reading) n = howMuchToRead(nOrig, state);
  }

  var ret;
  if (n > 0) ret = fromList(n, state);else ret = null;

  if (ret === null) {
    state.needReadable = true;
    n = 0;
  } else {
    state.length -= n;
  }

  if (state.length === 0) {
    // If we have nothing in the buffer, then we want to know
    // as soon as we *do* get something into the buffer.
    if (!state.ended) state.needReadable = true;

    // If we tried to read() past the EOF, then emit end on the next tick.
    if (nOrig !== n && state.ended) endReadable(this);
  }

  if (ret !== null) this.emit('data', ret);

  return ret;
};

function onEofChunk(stream, state) {
  if (state.ended) return;
  if (state.decoder) {
    var chunk = state.decoder.end();
    if (chunk && chunk.length) {
      state.buffer.push(chunk);
      state.length += state.objectMode ? 1 : chunk.length;
    }
  }
  state.ended = true;

  // emit 'readable' now to make sure it gets picked up.
  emitReadable(stream);
}

// Don't emit readable right away in sync mode, because this can trigger
// another read() call => stack overflow.  This way, it might trigger
// a nextTick recursion warning, but that's not so bad.
function emitReadable(stream) {
  var state = stream._readableState;
  state.needReadable = false;
  if (!state.emittedReadable) {
    debug('emitReadable', state.flowing);
    state.emittedReadable = true;
    if (state.sync) pna.nextTick(emitReadable_, stream);else emitReadable_(stream);
  }
}

function emitReadable_(stream) {
  debug('emit readable');
  stream.emit('readable');
  flow(stream);
}

// at this point, the user has presumably seen the 'readable' event,
// and called read() to consume some data.  that may have triggered
// in turn another _read(n) call, in which case reading = true if
// it's in progress.
// However, if we're not ended, or reading, and the length < hwm,
// then go ahead and try to read some more preemptively.
function maybeReadMore(stream, state) {
  if (!state.readingMore) {
    state.readingMore = true;
    pna.nextTick(maybeReadMore_, stream, state);
  }
}

function maybeReadMore_(stream, state) {
  var len = state.length;
  while (!state.reading && !state.flowing && !state.ended && state.length < state.highWaterMark) {
    debug('maybeReadMore read 0');
    stream.read(0);
    if (len === state.length)
      // didn't get any data, stop spinning.
      break;else len = state.length;
  }
  state.readingMore = false;
}

// abstract method.  to be overridden in specific implementation classes.
// call cb(er, data) where data is <= n in length.
// for virtual (non-string, non-buffer) streams, "length" is somewhat
// arbitrary, and perhaps not very meaningful.
Readable.prototype._read = function (n) {
  this.emit('error', new Error('_read() is not implemented'));
};

Readable.prototype.pipe = function (dest, pipeOpts) {
  var src = this;
  var state = this._readableState;

  switch (state.pipesCount) {
    case 0:
      state.pipes = dest;
      break;
    case 1:
      state.pipes = [state.pipes, dest];
      break;
    default:
      state.pipes.push(dest);
      break;
  }
  state.pipesCount += 1;
  debug('pipe count=%d opts=%j', state.pipesCount, pipeOpts);

  var doEnd = (!pipeOpts || pipeOpts.end !== false) && dest !== process.stdout && dest !== process.stderr;

  var endFn = doEnd ? onend : unpipe;
  if (state.endEmitted) pna.nextTick(endFn);else src.once('end', endFn);

  dest.on('unpipe', onunpipe);
  function onunpipe(readable, unpipeInfo) {
    debug('onunpipe');
    if (readable === src) {
      if (unpipeInfo && unpipeInfo.hasUnpiped === false) {
        unpipeInfo.hasUnpiped = true;
        cleanup();
      }
    }
  }

  function onend() {
    debug('onend');
    dest.end();
  }

  // when the dest drains, it reduces the awaitDrain counter
  // on the source.  This would be more elegant with a .once()
  // handler in flow(), but adding and removing repeatedly is
  // too slow.
  var ondrain = pipeOnDrain(src);
  dest.on('drain', ondrain);

  var cleanedUp = false;
  function cleanup() {
    debug('cleanup');
    // cleanup event handlers once the pipe is broken
    dest.removeListener('close', onclose);
    dest.removeListener('finish', onfinish);
    dest.removeListener('drain', ondrain);
    dest.removeListener('error', onerror);
    dest.removeListener('unpipe', onunpipe);
    src.removeListener('end', onend);
    src.removeListener('end', unpipe);
    src.removeListener('data', ondata);

    cleanedUp = true;

    // if the reader is waiting for a drain event from this
    // specific writer, then it would cause it to never start
    // flowing again.
    // So, if this is awaiting a drain, then we just call it now.
    // If we don't know, then assume that we are waiting for one.
    if (state.awaitDrain && (!dest._writableState || dest._writableState.needDrain)) ondrain();
  }

  // If the user pushes more data while we're writing to dest then we'll end up
  // in ondata again. However, we only want to increase awaitDrain once because
  // dest will only emit one 'drain' event for the multiple writes.
  // => Introduce a guard on increasing awaitDrain.
  var increasedAwaitDrain = false;
  src.on('data', ondata);
  function ondata(chunk) {
    debug('ondata');
    increasedAwaitDrain = false;
    var ret = dest.write(chunk);
    if (false === ret && !increasedAwaitDrain) {
      // If the user unpiped during `dest.write()`, it is possible
      // to get stuck in a permanently paused state if that write
      // also returned false.
      // => Check whether `dest` is still a piping destination.
      if ((state.pipesCount === 1 && state.pipes === dest || state.pipesCount > 1 && indexOf(state.pipes, dest) !== -1) && !cleanedUp) {
        debug('false write response, pause', src._readableState.awaitDrain);
        src._readableState.awaitDrain++;
        increasedAwaitDrain = true;
      }
      src.pause();
    }
  }

  // if the dest has an error, then stop piping into it.
  // however, don't suppress the throwing behavior for this.
  function onerror(er) {
    debug('onerror', er);
    unpipe();
    dest.removeListener('error', onerror);
    if (EElistenerCount(dest, 'error') === 0) dest.emit('error', er);
  }

  // Make sure our error handler is attached before userland ones.
  prependListener(dest, 'error', onerror);

  // Both close and finish should trigger unpipe, but only once.
  function onclose() {
    dest.removeListener('finish', onfinish);
    unpipe();
  }
  dest.once('close', onclose);
  function onfinish() {
    debug('onfinish');
    dest.removeListener('close', onclose);
    unpipe();
  }
  dest.once('finish', onfinish);

  function unpipe() {
    debug('unpipe');
    src.unpipe(dest);
  }

  // tell the dest that it's being piped to
  dest.emit('pipe', src);

  // start the flow if it hasn't been started already.
  if (!state.flowing) {
    debug('pipe resume');
    src.resume();
  }

  return dest;
};

function pipeOnDrain(src) {
  return function () {
    var state = src._readableState;
    debug('pipeOnDrain', state.awaitDrain);
    if (state.awaitDrain) state.awaitDrain--;
    if (state.awaitDrain === 0 && EElistenerCount(src, 'data')) {
      state.flowing = true;
      flow(src);
    }
  };
}

Readable.prototype.unpipe = function (dest) {
  var state = this._readableState;
  var unpipeInfo = { hasUnpiped: false };

  // if we're not piping anywhere, then do nothing.
  if (state.pipesCount === 0) return this;

  // just one destination.  most common case.
  if (state.pipesCount === 1) {
    // passed in one, but it's not the right one.
    if (dest && dest !== state.pipes) return this;

    if (!dest) dest = state.pipes;

    // got a match.
    state.pipes = null;
    state.pipesCount = 0;
    state.flowing = false;
    if (dest) dest.emit('unpipe', this, unpipeInfo);
    return this;
  }

  // slow case. multiple pipe destinations.

  if (!dest) {
    // remove all.
    var dests = state.pipes;
    var len = state.pipesCount;
    state.pipes = null;
    state.pipesCount = 0;
    state.flowing = false;

    for (var i = 0; i < len; i++) {
      dests[i].emit('unpipe', this, unpipeInfo);
    }return this;
  }

  // try to find the right one.
  var index = indexOf(state.pipes, dest);
  if (index === -1) return this;

  state.pipes.splice(index, 1);
  state.pipesCount -= 1;
  if (state.pipesCount === 1) state.pipes = state.pipes[0];

  dest.emit('unpipe', this, unpipeInfo);

  return this;
};

// set up data events if they are asked for
// Ensure readable listeners eventually get something
Readable.prototype.on = function (ev, fn) {
  var res = Stream.prototype.on.call(this, ev, fn);

  if (ev === 'data') {
    // Start flowing on next tick if stream isn't explicitly paused
    if (this._readableState.flowing !== false) this.resume();
  } else if (ev === 'readable') {
    var state = this._readableState;
    if (!state.endEmitted && !state.readableListening) {
      state.readableListening = state.needReadable = true;
      state.emittedReadable = false;
      if (!state.reading) {
        pna.nextTick(nReadingNextTick, this);
      } else if (state.length) {
        emitReadable(this);
      }
    }
  }

  return res;
};
Readable.prototype.addListener = Readable.prototype.on;

function nReadingNextTick(self) {
  debug('readable nexttick read 0');
  self.read(0);
}

// pause() and resume() are remnants of the legacy readable stream API
// If the user uses them, then switch into old mode.
Readable.prototype.resume = function () {
  var state = this._readableState;
  if (!state.flowing) {
    debug('resume');
    state.flowing = true;
    resume(this, state);
  }
  return this;
};

function resume(stream, state) {
  if (!state.resumeScheduled) {
    state.resumeScheduled = true;
    pna.nextTick(resume_, stream, state);
  }
}

function resume_(stream, state) {
  if (!state.reading) {
    debug('resume read 0');
    stream.read(0);
  }

  state.resumeScheduled = false;
  state.awaitDrain = 0;
  stream.emit('resume');
  flow(stream);
  if (state.flowing && !state.reading) stream.read(0);
}

Readable.prototype.pause = function () {
  debug('call pause flowing=%j', this._readableState.flowing);
  if (false !== this._readableState.flowing) {
    debug('pause');
    this._readableState.flowing = false;
    this.emit('pause');
  }
  return this;
};

function flow(stream) {
  var state = stream._readableState;
  debug('flow', state.flowing);
  while (state.flowing && stream.read() !== null) {}
}

// wrap an old-style stream as the async data source.
// This is *not* part of the readable stream interface.
// It is an ugly unfortunate mess of history.
Readable.prototype.wrap = function (stream) {
  var _this = this;

  var state = this._readableState;
  var paused = false;

  stream.on('end', function () {
    debug('wrapped end');
    if (state.decoder && !state.ended) {
      var chunk = state.decoder.end();
      if (chunk && chunk.length) _this.push(chunk);
    }

    _this.push(null);
  });

  stream.on('data', function (chunk) {
    debug('wrapped data');
    if (state.decoder) chunk = state.decoder.write(chunk);

    // don't skip over falsy values in objectMode
    if (state.objectMode && (chunk === null || chunk === undefined)) return;else if (!state.objectMode && (!chunk || !chunk.length)) return;

    var ret = _this.push(chunk);
    if (!ret) {
      paused = true;
      stream.pause();
    }
  });

  // proxy all the other methods.
  // important when wrapping filters and duplexes.
  for (var i in stream) {
    if (this[i] === undefined && typeof stream[i] === 'function') {
      this[i] = function (method) {
        return function () {
          return stream[method].apply(stream, arguments);
        };
      }(i);
    }
  }

  // proxy certain important events.
  for (var n = 0; n < kProxyEvents.length; n++) {
    stream.on(kProxyEvents[n], this.emit.bind(this, kProxyEvents[n]));
  }

  // when we try to consume some more bytes, simply unpause the
  // underlying stream.
  this._read = function (n) {
    debug('wrapped _read', n);
    if (paused) {
      paused = false;
      stream.resume();
    }
  };

  return this;
};

Object.defineProperty(Readable.prototype, 'readableHighWaterMark', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function () {
    return this._readableState.highWaterMark;
  }
});

// exposed for testing purposes only.
Readable._fromList = fromList;

// Pluck off n bytes from an array of buffers.
// Length is the combined lengths of all the buffers in the list.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function fromList(n, state) {
  // nothing buffered
  if (state.length === 0) return null;

  var ret;
  if (state.objectMode) ret = state.buffer.shift();else if (!n || n >= state.length) {
    // read it all, truncate the list
    if (state.decoder) ret = state.buffer.join('');else if (state.buffer.length === 1) ret = state.buffer.head.data;else ret = state.buffer.concat(state.length);
    state.buffer.clear();
  } else {
    // read part of list
    ret = fromListPartial(n, state.buffer, state.decoder);
  }

  return ret;
}

// Extracts only enough buffered data to satisfy the amount requested.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function fromListPartial(n, list, hasStrings) {
  var ret;
  if (n < list.head.data.length) {
    // slice is the same for buffers and strings
    ret = list.head.data.slice(0, n);
    list.head.data = list.head.data.slice(n);
  } else if (n === list.head.data.length) {
    // first chunk is a perfect match
    ret = list.shift();
  } else {
    // result spans more than one buffer
    ret = hasStrings ? copyFromBufferString(n, list) : copyFromBuffer(n, list);
  }
  return ret;
}

// Copies a specified amount of characters from the list of buffered data
// chunks.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function copyFromBufferString(n, list) {
  var p = list.head;
  var c = 1;
  var ret = p.data;
  n -= ret.length;
  while (p = p.next) {
    var str = p.data;
    var nb = n > str.length ? str.length : n;
    if (nb === str.length) ret += str;else ret += str.slice(0, n);
    n -= nb;
    if (n === 0) {
      if (nb === str.length) {
        ++c;
        if (p.next) list.head = p.next;else list.head = list.tail = null;
      } else {
        list.head = p;
        p.data = str.slice(nb);
      }
      break;
    }
    ++c;
  }
  list.length -= c;
  return ret;
}

// Copies a specified amount of bytes from the list of buffered data chunks.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function copyFromBuffer(n, list) {
  var ret = Buffer.allocUnsafe(n);
  var p = list.head;
  var c = 1;
  p.data.copy(ret);
  n -= p.data.length;
  while (p = p.next) {
    var buf = p.data;
    var nb = n > buf.length ? buf.length : n;
    buf.copy(ret, ret.length - n, 0, nb);
    n -= nb;
    if (n === 0) {
      if (nb === buf.length) {
        ++c;
        if (p.next) list.head = p.next;else list.head = list.tail = null;
      } else {
        list.head = p;
        p.data = buf.slice(nb);
      }
      break;
    }
    ++c;
  }
  list.length -= c;
  return ret;
}

function endReadable(stream) {
  var state = stream._readableState;

  // If we get here before consuming all the bytes, then that is a
  // bug in node.  Should never happen.
  if (state.length > 0) throw new Error('"endReadable()" called on non-empty stream');

  if (!state.endEmitted) {
    state.ended = true;
    pna.nextTick(endReadableNT, state, stream);
  }
}

function endReadableNT(state, stream) {
  // Check that we didn't get one last unshift.
  if (!state.endEmitted && state.length === 0) {
    state.endEmitted = true;
    stream.readable = false;
    stream.emit('end');
  }
}

function indexOf(xs, x) {
  for (var i = 0, l = xs.length; i < l; i++) {
    if (xs[i] === x) return i;
  }
  return -1;
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2), __webpack_require__(1)))

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(10).EventEmitter;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*<replacement>*/

var pna = __webpack_require__(6);
/*</replacement>*/

// undocumented cb() API, needed for core, not for public API
function destroy(err, cb) {
  var _this = this;

  var readableDestroyed = this._readableState && this._readableState.destroyed;
  var writableDestroyed = this._writableState && this._writableState.destroyed;

  if (readableDestroyed || writableDestroyed) {
    if (cb) {
      cb(err);
    } else if (err && (!this._writableState || !this._writableState.errorEmitted)) {
      pna.nextTick(emitErrorNT, this, err);
    }
    return this;
  }

  // we set destroyed to true before firing error callbacks in order
  // to make it re-entrance safe in case destroy() is called within callbacks

  if (this._readableState) {
    this._readableState.destroyed = true;
  }

  // if this is a duplex stream mark the writable part as destroyed as well
  if (this._writableState) {
    this._writableState.destroyed = true;
  }

  this._destroy(err || null, function (err) {
    if (!cb && err) {
      pna.nextTick(emitErrorNT, _this, err);
      if (_this._writableState) {
        _this._writableState.errorEmitted = true;
      }
    } else if (cb) {
      cb(err);
    }
  });

  return this;
}

function undestroy() {
  if (this._readableState) {
    this._readableState.destroyed = false;
    this._readableState.reading = false;
    this._readableState.ended = false;
    this._readableState.endEmitted = false;
  }

  if (this._writableState) {
    this._writableState.destroyed = false;
    this._writableState.ended = false;
    this._writableState.ending = false;
    this._writableState.finished = false;
    this._writableState.errorEmitted = false;
  }
}

function emitErrorNT(self, err) {
  self.emit('error', err);
}

module.exports = {
  destroy: destroy,
  undestroy: undestroy
};

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



/*<replacement>*/

var Buffer = __webpack_require__(7).Buffer;
/*</replacement>*/

var isEncoding = Buffer.isEncoding || function (encoding) {
  encoding = '' + encoding;
  switch (encoding && encoding.toLowerCase()) {
    case 'hex':case 'utf8':case 'utf-8':case 'ascii':case 'binary':case 'base64':case 'ucs2':case 'ucs-2':case 'utf16le':case 'utf-16le':case 'raw':
      return true;
    default:
      return false;
  }
};

function _normalizeEncoding(enc) {
  if (!enc) return 'utf8';
  var retried;
  while (true) {
    switch (enc) {
      case 'utf8':
      case 'utf-8':
        return 'utf8';
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return 'utf16le';
      case 'latin1':
      case 'binary':
        return 'latin1';
      case 'base64':
      case 'ascii':
      case 'hex':
        return enc;
      default:
        if (retried) return; // undefined
        enc = ('' + enc).toLowerCase();
        retried = true;
    }
  }
};

// Do not cache `Buffer.isEncoding` when checking encoding names as some
// modules monkey-patch it to support additional encodings
function normalizeEncoding(enc) {
  var nenc = _normalizeEncoding(enc);
  if (typeof nenc !== 'string' && (Buffer.isEncoding === isEncoding || !isEncoding(enc))) throw new Error('Unknown encoding: ' + enc);
  return nenc || enc;
}

// StringDecoder provides an interface for efficiently splitting a series of
// buffers into a series of JS strings without breaking apart multi-byte
// characters.
exports.StringDecoder = StringDecoder;
function StringDecoder(encoding) {
  this.encoding = normalizeEncoding(encoding);
  var nb;
  switch (this.encoding) {
    case 'utf16le':
      this.text = utf16Text;
      this.end = utf16End;
      nb = 4;
      break;
    case 'utf8':
      this.fillLast = utf8FillLast;
      nb = 4;
      break;
    case 'base64':
      this.text = base64Text;
      this.end = base64End;
      nb = 3;
      break;
    default:
      this.write = simpleWrite;
      this.end = simpleEnd;
      return;
  }
  this.lastNeed = 0;
  this.lastTotal = 0;
  this.lastChar = Buffer.allocUnsafe(nb);
}

StringDecoder.prototype.write = function (buf) {
  if (buf.length === 0) return '';
  var r;
  var i;
  if (this.lastNeed) {
    r = this.fillLast(buf);
    if (r === undefined) return '';
    i = this.lastNeed;
    this.lastNeed = 0;
  } else {
    i = 0;
  }
  if (i < buf.length) return r ? r + this.text(buf, i) : this.text(buf, i);
  return r || '';
};

StringDecoder.prototype.end = utf8End;

// Returns only complete characters in a Buffer
StringDecoder.prototype.text = utf8Text;

// Attempts to complete a partial non-UTF-8 character using bytes from a Buffer
StringDecoder.prototype.fillLast = function (buf) {
  if (this.lastNeed <= buf.length) {
    buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed);
    return this.lastChar.toString(this.encoding, 0, this.lastTotal);
  }
  buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, buf.length);
  this.lastNeed -= buf.length;
};

// Checks the type of a UTF-8 byte, whether it's ASCII, a leading byte, or a
// continuation byte. If an invalid byte is detected, -2 is returned.
function utf8CheckByte(byte) {
  if (byte <= 0x7F) return 0;else if (byte >> 5 === 0x06) return 2;else if (byte >> 4 === 0x0E) return 3;else if (byte >> 3 === 0x1E) return 4;
  return byte >> 6 === 0x02 ? -1 : -2;
}

// Checks at most 3 bytes at the end of a Buffer in order to detect an
// incomplete multi-byte UTF-8 character. The total number of bytes (2, 3, or 4)
// needed to complete the UTF-8 character (if applicable) are returned.
function utf8CheckIncomplete(self, buf, i) {
  var j = buf.length - 1;
  if (j < i) return 0;
  var nb = utf8CheckByte(buf[j]);
  if (nb >= 0) {
    if (nb > 0) self.lastNeed = nb - 1;
    return nb;
  }
  if (--j < i || nb === -2) return 0;
  nb = utf8CheckByte(buf[j]);
  if (nb >= 0) {
    if (nb > 0) self.lastNeed = nb - 2;
    return nb;
  }
  if (--j < i || nb === -2) return 0;
  nb = utf8CheckByte(buf[j]);
  if (nb >= 0) {
    if (nb > 0) {
      if (nb === 2) nb = 0;else self.lastNeed = nb - 3;
    }
    return nb;
  }
  return 0;
}

// Validates as many continuation bytes for a multi-byte UTF-8 character as
// needed or are available. If we see a non-continuation byte where we expect
// one, we "replace" the validated continuation bytes we've seen so far with
// a single UTF-8 replacement character ('\ufffd'), to match v8's UTF-8 decoding
// behavior. The continuation byte check is included three times in the case
// where all of the continuation bytes for a character exist in the same buffer.
// It is also done this way as a slight performance increase instead of using a
// loop.
function utf8CheckExtraBytes(self, buf, p) {
  if ((buf[0] & 0xC0) !== 0x80) {
    self.lastNeed = 0;
    return '\ufffd';
  }
  if (self.lastNeed > 1 && buf.length > 1) {
    if ((buf[1] & 0xC0) !== 0x80) {
      self.lastNeed = 1;
      return '\ufffd';
    }
    if (self.lastNeed > 2 && buf.length > 2) {
      if ((buf[2] & 0xC0) !== 0x80) {
        self.lastNeed = 2;
        return '\ufffd';
      }
    }
  }
}

// Attempts to complete a multi-byte UTF-8 character using bytes from a Buffer.
function utf8FillLast(buf) {
  var p = this.lastTotal - this.lastNeed;
  var r = utf8CheckExtraBytes(this, buf, p);
  if (r !== undefined) return r;
  if (this.lastNeed <= buf.length) {
    buf.copy(this.lastChar, p, 0, this.lastNeed);
    return this.lastChar.toString(this.encoding, 0, this.lastTotal);
  }
  buf.copy(this.lastChar, p, 0, buf.length);
  this.lastNeed -= buf.length;
}

// Returns all complete UTF-8 characters in a Buffer. If the Buffer ended on a
// partial character, the character's bytes are buffered until the required
// number of bytes are available.
function utf8Text(buf, i) {
  var total = utf8CheckIncomplete(this, buf, i);
  if (!this.lastNeed) return buf.toString('utf8', i);
  this.lastTotal = total;
  var end = buf.length - (total - this.lastNeed);
  buf.copy(this.lastChar, 0, end);
  return buf.toString('utf8', i, end);
}

// For UTF-8, a replacement character is added when ending on a partial
// character.
function utf8End(buf) {
  var r = buf && buf.length ? this.write(buf) : '';
  if (this.lastNeed) return r + '\ufffd';
  return r;
}

// UTF-16LE typically needs two bytes per character, but even if we have an even
// number of bytes available, we need to check if we end on a leading/high
// surrogate. In that case, we need to wait for the next two bytes in order to
// decode the last character properly.
function utf16Text(buf, i) {
  if ((buf.length - i) % 2 === 0) {
    var r = buf.toString('utf16le', i);
    if (r) {
      var c = r.charCodeAt(r.length - 1);
      if (c >= 0xD800 && c <= 0xDBFF) {
        this.lastNeed = 2;
        this.lastTotal = 4;
        this.lastChar[0] = buf[buf.length - 2];
        this.lastChar[1] = buf[buf.length - 1];
        return r.slice(0, -1);
      }
    }
    return r;
  }
  this.lastNeed = 1;
  this.lastTotal = 2;
  this.lastChar[0] = buf[buf.length - 1];
  return buf.toString('utf16le', i, buf.length - 1);
}

// For UTF-16LE we do not explicitly append special replacement characters if we
// end on a partial character, we simply let v8 handle that.
function utf16End(buf) {
  var r = buf && buf.length ? this.write(buf) : '';
  if (this.lastNeed) {
    var end = this.lastTotal - this.lastNeed;
    return r + this.lastChar.toString('utf16le', 0, end);
  }
  return r;
}

function base64Text(buf, i) {
  var n = (buf.length - i) % 3;
  if (n === 0) return buf.toString('base64', i);
  this.lastNeed = 3 - n;
  this.lastTotal = 3;
  if (n === 1) {
    this.lastChar[0] = buf[buf.length - 1];
  } else {
    this.lastChar[0] = buf[buf.length - 2];
    this.lastChar[1] = buf[buf.length - 1];
  }
  return buf.toString('base64', i, buf.length - n);
}

function base64End(buf) {
  var r = buf && buf.length ? this.write(buf) : '';
  if (this.lastNeed) return r + this.lastChar.toString('base64', 0, 3 - this.lastNeed);
  return r;
}

// Pass bytes on through for single-byte encodings (e.g. ascii, latin1, hex)
function simpleWrite(buf) {
  return buf.toString(this.encoding);
}

function simpleEnd(buf) {
  return buf && buf.length ? this.write(buf) : '';
}

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// a transform stream is a readable/writable stream where you do
// something with the data.  Sometimes it's called a "filter",
// but that's not a great name for it, since that implies a thing where
// some bits pass through, and others are simply ignored.  (That would
// be a valid example of a transform, of course.)
//
// While the output is causally related to the input, it's not a
// necessarily symmetric or synchronous transformation.  For example,
// a zlib stream might take multiple plain-text writes(), and then
// emit a single compressed chunk some time in the future.
//
// Here's how this works:
//
// The Transform stream has all the aspects of the readable and writable
// stream classes.  When you write(chunk), that calls _write(chunk,cb)
// internally, and returns false if there's a lot of pending writes
// buffered up.  When you call read(), that calls _read(n) until
// there's enough pending readable data buffered up.
//
// In a transform stream, the written data is placed in a buffer.  When
// _read(n) is called, it transforms the queued up data, calling the
// buffered _write cb's as it consumes chunks.  If consuming a single
// written chunk would result in multiple output chunks, then the first
// outputted bit calls the readcb, and subsequent chunks just go into
// the read buffer, and will cause it to emit 'readable' if necessary.
//
// This way, back-pressure is actually determined by the reading side,
// since _read has to be called to start processing a new chunk.  However,
// a pathological inflate type of transform can cause excessive buffering
// here.  For example, imagine a stream where every byte of input is
// interpreted as an integer from 0-255, and then results in that many
// bytes of output.  Writing the 4 bytes {ff,ff,ff,ff} would result in
// 1kb of data being output.  In this case, you could write a very small
// amount of input, and end up with a very large amount of output.  In
// such a pathological inflating mechanism, there'd be no way to tell
// the system to stop doing the transform.  A single 4MB write could
// cause the system to run out of memory.
//
// However, even in such a pathological case, only a single written chunk
// would be consumed, and then the rest would wait (un-transformed) until
// the results of the previous transformed chunk were consumed.



module.exports = Transform;

var Duplex = __webpack_require__(0);

/*<replacement>*/
var util = __webpack_require__(5);
util.inherits = __webpack_require__(3);
/*</replacement>*/

util.inherits(Transform, Duplex);

function afterTransform(er, data) {
  var ts = this._transformState;
  ts.transforming = false;

  var cb = ts.writecb;

  if (!cb) {
    return this.emit('error', new Error('write callback called multiple times'));
  }

  ts.writechunk = null;
  ts.writecb = null;

  if (data != null) // single equals check for both `null` and `undefined`
    this.push(data);

  cb(er);

  var rs = this._readableState;
  rs.reading = false;
  if (rs.needReadable || rs.length < rs.highWaterMark) {
    this._read(rs.highWaterMark);
  }
}

function Transform(options) {
  if (!(this instanceof Transform)) return new Transform(options);

  Duplex.call(this, options);

  this._transformState = {
    afterTransform: afterTransform.bind(this),
    needTransform: false,
    transforming: false,
    writecb: null,
    writechunk: null,
    writeencoding: null
  };

  // start out asking for a readable event once data is transformed.
  this._readableState.needReadable = true;

  // we have implemented the _read method, and done the other things
  // that Readable wants before the first _read call, so unset the
  // sync guard flag.
  this._readableState.sync = false;

  if (options) {
    if (typeof options.transform === 'function') this._transform = options.transform;

    if (typeof options.flush === 'function') this._flush = options.flush;
  }

  // When the writable side finishes, then flush out anything remaining.
  this.on('prefinish', prefinish);
}

function prefinish() {
  var _this = this;

  if (typeof this._flush === 'function') {
    this._flush(function (er, data) {
      done(_this, er, data);
    });
  } else {
    done(this, null, null);
  }
}

Transform.prototype.push = function (chunk, encoding) {
  this._transformState.needTransform = false;
  return Duplex.prototype.push.call(this, chunk, encoding);
};

// This is the part where you do stuff!
// override this function in implementation classes.
// 'chunk' is an input chunk.
//
// Call `push(newChunk)` to pass along transformed output
// to the readable side.  You may call 'push' zero or more times.
//
// Call `cb(err)` when you are done with this chunk.  If you pass
// an error, then that'll put the hurt on the whole operation.  If you
// never call cb(), then you'll never get another chunk.
Transform.prototype._transform = function (chunk, encoding, cb) {
  throw new Error('_transform() is not implemented');
};

Transform.prototype._write = function (chunk, encoding, cb) {
  var ts = this._transformState;
  ts.writecb = cb;
  ts.writechunk = chunk;
  ts.writeencoding = encoding;
  if (!ts.transforming) {
    var rs = this._readableState;
    if (ts.needTransform || rs.needReadable || rs.length < rs.highWaterMark) this._read(rs.highWaterMark);
  }
};

// Doesn't matter what the args are here.
// _transform does all the work.
// That we got here means that the readable side wants more data.
Transform.prototype._read = function (n) {
  var ts = this._transformState;

  if (ts.writechunk !== null && ts.writecb && !ts.transforming) {
    ts.transforming = true;
    this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
  } else {
    // mark that we need a transform, so that any data that comes in
    // will get processed, now that we've asked for it.
    ts.needTransform = true;
  }
};

Transform.prototype._destroy = function (err, cb) {
  var _this2 = this;

  Duplex.prototype._destroy.call(this, err, function (err2) {
    cb(err2);
    _this2.emit('close');
  });
};

function done(stream, er, data) {
  if (er) return stream.emit('error', er);

  if (data != null) // single equals check for both `null` and `undefined`
    stream.push(data);

  // if there's nothing in the write buffer, then that means
  // that nothing more will ever be provided
  if (stream._writableState.length) throw new Error('Calling transform done when ws.length != 0');

  if (stream._transformState.transforming) throw new Error('Calling transform done when still transforming');

  return stream.push(null);
}

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(20);
module.exports = __webpack_require__(54);


/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__bootstrap_min__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__bootstrap_min___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__bootstrap_min__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__detect__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__detect___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__detect__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__fastclick__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__fastclick___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__fastclick__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__jquery_slimscroll__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__jquery_slimscroll___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__jquery_slimscroll__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__jquery_blockUI__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__jquery_blockUI___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__jquery_blockUI__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__waves__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__waves___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__waves__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__wow_min__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__wow_min___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__wow_min__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__jquery_nicescroll__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__jquery_nicescroll___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7__jquery_nicescroll__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__jquery_scrollTo_min__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__jquery_scrollTo_min___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8__jquery_scrollTo_min__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__jquery_core__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__jquery_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9__jquery_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__jquery_app__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__jquery_app___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10__jquery_app__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pace_min__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pace_min___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11__pace_min__);














/***/ }),
/* 21 */
/***/ (function(module, exports) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*!
 * Bootstrap v3.3.7 (http://getbootstrap.com)
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under the MIT license
 */
if ("undefined" == typeof jQuery) throw new Error("Bootstrap's JavaScript requires jQuery");+function (a) {
  "use strict";
  var b = a.fn.jquery.split(" ")[0].split(".");if (b[0] < 2 && b[1] < 9 || 1 == b[0] && 9 == b[1] && b[2] < 1 || b[0] > 3) throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher, but lower than version 4");
}(jQuery), +function (a) {
  "use strict";
  function b() {
    var a = document.createElement("bootstrap"),
        b = { WebkitTransition: "webkitTransitionEnd", MozTransition: "transitionend", OTransition: "oTransitionEnd otransitionend", transition: "transitionend" };for (var c in b) {
      if (void 0 !== a.style[c]) return { end: b[c] };
    }return !1;
  }a.fn.emulateTransitionEnd = function (b) {
    var c = !1,
        d = this;a(this).one("bsTransitionEnd", function () {
      c = !0;
    });var e = function e() {
      c || a(d).trigger(a.support.transition.end);
    };return setTimeout(e, b), this;
  }, a(function () {
    a.support.transition = b(), a.support.transition && (a.event.special.bsTransitionEnd = { bindType: a.support.transition.end, delegateType: a.support.transition.end, handle: function handle(b) {
        if (a(b.target).is(this)) return b.handleObj.handler.apply(this, arguments);
      } });
  });
}(jQuery), +function (a) {
  "use strict";
  function b(b) {
    return this.each(function () {
      var c = a(this),
          e = c.data("bs.alert");e || c.data("bs.alert", e = new d(this)), "string" == typeof b && e[b].call(c);
    });
  }var c = '[data-dismiss="alert"]',
      d = function d(b) {
    a(b).on("click", c, this.close);
  };d.VERSION = "3.3.7", d.TRANSITION_DURATION = 150, d.prototype.close = function (b) {
    function c() {
      g.detach().trigger("closed.bs.alert").remove();
    }var e = a(this),
        f = e.attr("data-target");f || (f = e.attr("href"), f = f && f.replace(/.*(?=#[^\s]*$)/, ""));var g = a("#" === f ? [] : f);b && b.preventDefault(), g.length || (g = e.closest(".alert")), g.trigger(b = a.Event("close.bs.alert")), b.isDefaultPrevented() || (g.removeClass("in"), a.support.transition && g.hasClass("fade") ? g.one("bsTransitionEnd", c).emulateTransitionEnd(d.TRANSITION_DURATION) : c());
  };var e = a.fn.alert;a.fn.alert = b, a.fn.alert.Constructor = d, a.fn.alert.noConflict = function () {
    return a.fn.alert = e, this;
  }, a(document).on("click.bs.alert.data-api", c, d.prototype.close);
}(jQuery), +function (a) {
  "use strict";
  function b(b) {
    return this.each(function () {
      var d = a(this),
          e = d.data("bs.button"),
          f = "object" == (typeof b === "undefined" ? "undefined" : _typeof(b)) && b;e || d.data("bs.button", e = new c(this, f)), "toggle" == b ? e.toggle() : b && e.setState(b);
    });
  }var c = function c(b, d) {
    this.$element = a(b), this.options = a.extend({}, c.DEFAULTS, d), this.isLoading = !1;
  };c.VERSION = "3.3.7", c.DEFAULTS = { loadingText: "loading..." }, c.prototype.setState = function (b) {
    var c = "disabled",
        d = this.$element,
        e = d.is("input") ? "val" : "html",
        f = d.data();b += "Text", null == f.resetText && d.data("resetText", d[e]()), setTimeout(a.proxy(function () {
      d[e](null == f[b] ? this.options[b] : f[b]), "loadingText" == b ? (this.isLoading = !0, d.addClass(c).attr(c, c).prop(c, !0)) : this.isLoading && (this.isLoading = !1, d.removeClass(c).removeAttr(c).prop(c, !1));
    }, this), 0);
  }, c.prototype.toggle = function () {
    var a = !0,
        b = this.$element.closest('[data-toggle="buttons"]');if (b.length) {
      var c = this.$element.find("input");"radio" == c.prop("type") ? (c.prop("checked") && (a = !1), b.find(".active").removeClass("active"), this.$element.addClass("active")) : "checkbox" == c.prop("type") && (c.prop("checked") !== this.$element.hasClass("active") && (a = !1), this.$element.toggleClass("active")), c.prop("checked", this.$element.hasClass("active")), a && c.trigger("change");
    } else this.$element.attr("aria-pressed", !this.$element.hasClass("active")), this.$element.toggleClass("active");
  };var d = a.fn.button;a.fn.button = b, a.fn.button.Constructor = c, a.fn.button.noConflict = function () {
    return a.fn.button = d, this;
  }, a(document).on("click.bs.button.data-api", '[data-toggle^="button"]', function (c) {
    var d = a(c.target).closest(".btn");b.call(d, "toggle"), a(c.target).is('input[type="radio"], input[type="checkbox"]') || (c.preventDefault(), d.is("input,button") ? d.trigger("focus") : d.find("input:visible,button:visible").first().trigger("focus"));
  }).on("focus.bs.button.data-api blur.bs.button.data-api", '[data-toggle^="button"]', function (b) {
    a(b.target).closest(".btn").toggleClass("focus", /^focus(in)?$/.test(b.type));
  });
}(jQuery), +function (a) {
  "use strict";
  function b(b) {
    return this.each(function () {
      var d = a(this),
          e = d.data("bs.carousel"),
          f = a.extend({}, c.DEFAULTS, d.data(), "object" == (typeof b === "undefined" ? "undefined" : _typeof(b)) && b),
          g = "string" == typeof b ? b : f.slide;e || d.data("bs.carousel", e = new c(this, f)), "number" == typeof b ? e.to(b) : g ? e[g]() : f.interval && e.pause().cycle();
    });
  }var c = function c(b, _c) {
    this.$element = a(b), this.$indicators = this.$element.find(".carousel-indicators"), this.options = _c, this.paused = null, this.sliding = null, this.interval = null, this.$active = null, this.$items = null, this.options.keyboard && this.$element.on("keydown.bs.carousel", a.proxy(this.keydown, this)), "hover" == this.options.pause && !("ontouchstart" in document.documentElement) && this.$element.on("mouseenter.bs.carousel", a.proxy(this.pause, this)).on("mouseleave.bs.carousel", a.proxy(this.cycle, this));
  };c.VERSION = "3.3.7", c.TRANSITION_DURATION = 600, c.DEFAULTS = { interval: 5e3, pause: "hover", wrap: !0, keyboard: !0 }, c.prototype.keydown = function (a) {
    if (!/input|textarea/i.test(a.target.tagName)) {
      switch (a.which) {case 37:
          this.prev();break;case 39:
          this.next();break;default:
          return;}a.preventDefault();
    }
  }, c.prototype.cycle = function (b) {
    return b || (this.paused = !1), this.interval && clearInterval(this.interval), this.options.interval && !this.paused && (this.interval = setInterval(a.proxy(this.next, this), this.options.interval)), this;
  }, c.prototype.getItemIndex = function (a) {
    return this.$items = a.parent().children(".item"), this.$items.index(a || this.$active);
  }, c.prototype.getItemForDirection = function (a, b) {
    var c = this.getItemIndex(b),
        d = "prev" == a && 0 === c || "next" == a && c == this.$items.length - 1;if (d && !this.options.wrap) return b;var e = "prev" == a ? -1 : 1,
        f = (c + e) % this.$items.length;return this.$items.eq(f);
  }, c.prototype.to = function (a) {
    var b = this,
        c = this.getItemIndex(this.$active = this.$element.find(".item.active"));if (!(a > this.$items.length - 1 || a < 0)) return this.sliding ? this.$element.one("slid.bs.carousel", function () {
      b.to(a);
    }) : c == a ? this.pause().cycle() : this.slide(a > c ? "next" : "prev", this.$items.eq(a));
  }, c.prototype.pause = function (b) {
    return b || (this.paused = !0), this.$element.find(".next, .prev").length && a.support.transition && (this.$element.trigger(a.support.transition.end), this.cycle(!0)), this.interval = clearInterval(this.interval), this;
  }, c.prototype.next = function () {
    if (!this.sliding) return this.slide("next");
  }, c.prototype.prev = function () {
    if (!this.sliding) return this.slide("prev");
  }, c.prototype.slide = function (b, d) {
    var e = this.$element.find(".item.active"),
        f = d || this.getItemForDirection(b, e),
        g = this.interval,
        h = "next" == b ? "left" : "right",
        i = this;if (f.hasClass("active")) return this.sliding = !1;var j = f[0],
        k = a.Event("slide.bs.carousel", { relatedTarget: j, direction: h });if (this.$element.trigger(k), !k.isDefaultPrevented()) {
      if (this.sliding = !0, g && this.pause(), this.$indicators.length) {
        this.$indicators.find(".active").removeClass("active");var l = a(this.$indicators.children()[this.getItemIndex(f)]);l && l.addClass("active");
      }var m = a.Event("slid.bs.carousel", { relatedTarget: j, direction: h });return a.support.transition && this.$element.hasClass("slide") ? (f.addClass(b), f[0].offsetWidth, e.addClass(h), f.addClass(h), e.one("bsTransitionEnd", function () {
        f.removeClass([b, h].join(" ")).addClass("active"), e.removeClass(["active", h].join(" ")), i.sliding = !1, setTimeout(function () {
          i.$element.trigger(m);
        }, 0);
      }).emulateTransitionEnd(c.TRANSITION_DURATION)) : (e.removeClass("active"), f.addClass("active"), this.sliding = !1, this.$element.trigger(m)), g && this.cycle(), this;
    }
  };var d = a.fn.carousel;a.fn.carousel = b, a.fn.carousel.Constructor = c, a.fn.carousel.noConflict = function () {
    return a.fn.carousel = d, this;
  };var e = function e(c) {
    var d,
        e = a(this),
        f = a(e.attr("data-target") || (d = e.attr("href")) && d.replace(/.*(?=#[^\s]+$)/, ""));if (f.hasClass("carousel")) {
      var g = a.extend({}, f.data(), e.data()),
          h = e.attr("data-slide-to");h && (g.interval = !1), b.call(f, g), h && f.data("bs.carousel").to(h), c.preventDefault();
    }
  };a(document).on("click.bs.carousel.data-api", "[data-slide]", e).on("click.bs.carousel.data-api", "[data-slide-to]", e), a(window).on("load", function () {
    a('[data-ride="carousel"]').each(function () {
      var c = a(this);b.call(c, c.data());
    });
  });
}(jQuery), +function (a) {
  "use strict";
  function b(b) {
    var c,
        d = b.attr("data-target") || (c = b.attr("href")) && c.replace(/.*(?=#[^\s]+$)/, "");return a(d);
  }function c(b) {
    return this.each(function () {
      var c = a(this),
          e = c.data("bs.collapse"),
          f = a.extend({}, d.DEFAULTS, c.data(), "object" == (typeof b === "undefined" ? "undefined" : _typeof(b)) && b);!e && f.toggle && /show|hide/.test(b) && (f.toggle = !1), e || c.data("bs.collapse", e = new d(this, f)), "string" == typeof b && e[b]();
    });
  }var d = function d(b, c) {
    this.$element = a(b), this.options = a.extend({}, d.DEFAULTS, c), this.$trigger = a('[data-toggle="collapse"][href="#' + b.id + '"],[data-toggle="collapse"][data-target="#' + b.id + '"]'), this.transitioning = null, this.options.parent ? this.$parent = this.getParent() : this.addAriaAndCollapsedClass(this.$element, this.$trigger), this.options.toggle && this.toggle();
  };d.VERSION = "3.3.7", d.TRANSITION_DURATION = 350, d.DEFAULTS = { toggle: !0 }, d.prototype.dimension = function () {
    var a = this.$element.hasClass("width");return a ? "width" : "height";
  }, d.prototype.show = function () {
    if (!this.transitioning && !this.$element.hasClass("in")) {
      var b,
          e = this.$parent && this.$parent.children(".panel").children(".in, .collapsing");if (!(e && e.length && (b = e.data("bs.collapse"), b && b.transitioning))) {
        var f = a.Event("show.bs.collapse");if (this.$element.trigger(f), !f.isDefaultPrevented()) {
          e && e.length && (c.call(e, "hide"), b || e.data("bs.collapse", null));var g = this.dimension();this.$element.removeClass("collapse").addClass("collapsing")[g](0).attr("aria-expanded", !0), this.$trigger.removeClass("collapsed").attr("aria-expanded", !0), this.transitioning = 1;var h = function h() {
            this.$element.removeClass("collapsing").addClass("collapse in")[g](""), this.transitioning = 0, this.$element.trigger("shown.bs.collapse");
          };if (!a.support.transition) return h.call(this);var i = a.camelCase(["scroll", g].join("-"));this.$element.one("bsTransitionEnd", a.proxy(h, this)).emulateTransitionEnd(d.TRANSITION_DURATION)[g](this.$element[0][i]);
        }
      }
    }
  }, d.prototype.hide = function () {
    if (!this.transitioning && this.$element.hasClass("in")) {
      var b = a.Event("hide.bs.collapse");if (this.$element.trigger(b), !b.isDefaultPrevented()) {
        var c = this.dimension();this.$element[c](this.$element[c]())[0].offsetHeight, this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded", !1), this.$trigger.addClass("collapsed").attr("aria-expanded", !1), this.transitioning = 1;var e = function e() {
          this.transitioning = 0, this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse");
        };return a.support.transition ? void this.$element[c](0).one("bsTransitionEnd", a.proxy(e, this)).emulateTransitionEnd(d.TRANSITION_DURATION) : e.call(this);
      }
    }
  }, d.prototype.toggle = function () {
    this[this.$element.hasClass("in") ? "hide" : "show"]();
  }, d.prototype.getParent = function () {
    return a(this.options.parent).find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]').each(a.proxy(function (c, d) {
      var e = a(d);this.addAriaAndCollapsedClass(b(e), e);
    }, this)).end();
  }, d.prototype.addAriaAndCollapsedClass = function (a, b) {
    var c = a.hasClass("in");a.attr("aria-expanded", c), b.toggleClass("collapsed", !c).attr("aria-expanded", c);
  };var e = a.fn.collapse;a.fn.collapse = c, a.fn.collapse.Constructor = d, a.fn.collapse.noConflict = function () {
    return a.fn.collapse = e, this;
  }, a(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]', function (d) {
    var e = a(this);e.attr("data-target") || d.preventDefault();var f = b(e),
        g = f.data("bs.collapse"),
        h = g ? "toggle" : e.data();c.call(f, h);
  });
}(jQuery), +function (a) {
  "use strict";
  function b(b) {
    var c = b.attr("data-target");c || (c = b.attr("href"), c = c && /#[A-Za-z]/.test(c) && c.replace(/.*(?=#[^\s]*$)/, ""));var d = c && a(c);return d && d.length ? d : b.parent();
  }function c(c) {
    c && 3 === c.which || (a(e).remove(), a(f).each(function () {
      var d = a(this),
          e = b(d),
          f = { relatedTarget: this };e.hasClass("open") && (c && "click" == c.type && /input|textarea/i.test(c.target.tagName) && a.contains(e[0], c.target) || (e.trigger(c = a.Event("hide.bs.dropdown", f)), c.isDefaultPrevented() || (d.attr("aria-expanded", "false"), e.removeClass("open").trigger(a.Event("hidden.bs.dropdown", f)))));
    }));
  }function d(b) {
    return this.each(function () {
      var c = a(this),
          d = c.data("bs.dropdown");d || c.data("bs.dropdown", d = new g(this)), "string" == typeof b && d[b].call(c);
    });
  }var e = ".dropdown-backdrop",
      f = '[data-toggle="dropdown"]',
      g = function g(b) {
    a(b).on("click.bs.dropdown", this.toggle);
  };g.VERSION = "3.3.7", g.prototype.toggle = function (d) {
    var e = a(this);if (!e.is(".disabled, :disabled")) {
      var f = b(e),
          g = f.hasClass("open");if (c(), !g) {
        "ontouchstart" in document.documentElement && !f.closest(".navbar-nav").length && a(document.createElement("div")).addClass("dropdown-backdrop").insertAfter(a(this)).on("click", c);var h = { relatedTarget: this };if (f.trigger(d = a.Event("show.bs.dropdown", h)), d.isDefaultPrevented()) return;e.trigger("focus").attr("aria-expanded", "true"), f.toggleClass("open").trigger(a.Event("shown.bs.dropdown", h));
      }return !1;
    }
  }, g.prototype.keydown = function (c) {
    if (/(38|40|27|32)/.test(c.which) && !/input|textarea/i.test(c.target.tagName)) {
      var d = a(this);if (c.preventDefault(), c.stopPropagation(), !d.is(".disabled, :disabled")) {
        var e = b(d),
            g = e.hasClass("open");if (!g && 27 != c.which || g && 27 == c.which) return 27 == c.which && e.find(f).trigger("focus"), d.trigger("click");var h = " li:not(.disabled):visible a",
            i = e.find(".dropdown-menu" + h);if (i.length) {
          var j = i.index(c.target);38 == c.which && j > 0 && j--, 40 == c.which && j < i.length - 1 && j++, ~j || (j = 0), i.eq(j).trigger("focus");
        }
      }
    }
  };var h = a.fn.dropdown;a.fn.dropdown = d, a.fn.dropdown.Constructor = g, a.fn.dropdown.noConflict = function () {
    return a.fn.dropdown = h, this;
  }, a(document).on("click.bs.dropdown.data-api", c).on("click.bs.dropdown.data-api", ".dropdown form", function (a) {
    a.stopPropagation();
  }).on("click.bs.dropdown.data-api", f, g.prototype.toggle).on("keydown.bs.dropdown.data-api", f, g.prototype.keydown).on("keydown.bs.dropdown.data-api", ".dropdown-menu", g.prototype.keydown);
}(jQuery), +function (a) {
  "use strict";
  function b(b, d) {
    return this.each(function () {
      var e = a(this),
          f = e.data("bs.modal"),
          g = a.extend({}, c.DEFAULTS, e.data(), "object" == (typeof b === "undefined" ? "undefined" : _typeof(b)) && b);f || e.data("bs.modal", f = new c(this, g)), "string" == typeof b ? f[b](d) : g.show && f.show(d);
    });
  }var c = function c(b, _c2) {
    this.options = _c2, this.$body = a(document.body), this.$element = a(b), this.$dialog = this.$element.find(".modal-dialog"), this.$backdrop = null, this.isShown = null, this.originalBodyPad = null, this.scrollbarWidth = 0, this.ignoreBackdropClick = !1, this.options.remote && this.$element.find(".modal-content").load(this.options.remote, a.proxy(function () {
      this.$element.trigger("loaded.bs.modal");
    }, this));
  };c.VERSION = "3.3.7", c.TRANSITION_DURATION = 300, c.BACKDROP_TRANSITION_DURATION = 150, c.DEFAULTS = { backdrop: !0, keyboard: !0, show: !0 }, c.prototype.toggle = function (a) {
    return this.isShown ? this.hide() : this.show(a);
  }, c.prototype.show = function (b) {
    var d = this,
        e = a.Event("show.bs.modal", { relatedTarget: b });this.$element.trigger(e), this.isShown || e.isDefaultPrevented() || (this.isShown = !0, this.checkScrollbar(), this.setScrollbar(), this.$body.addClass("modal-open"), this.escape(), this.resize(), this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', a.proxy(this.hide, this)), this.$dialog.on("mousedown.dismiss.bs.modal", function () {
      d.$element.one("mouseup.dismiss.bs.modal", function (b) {
        a(b.target).is(d.$element) && (d.ignoreBackdropClick = !0);
      });
    }), this.backdrop(function () {
      var e = a.support.transition && d.$element.hasClass("fade");d.$element.parent().length || d.$element.appendTo(d.$body), d.$element.show().scrollTop(0), d.adjustDialog(), e && d.$element[0].offsetWidth, d.$element.addClass("in"), d.enforceFocus();var f = a.Event("shown.bs.modal", { relatedTarget: b });e ? d.$dialog.one("bsTransitionEnd", function () {
        d.$element.trigger("focus").trigger(f);
      }).emulateTransitionEnd(c.TRANSITION_DURATION) : d.$element.trigger("focus").trigger(f);
    }));
  }, c.prototype.hide = function (b) {
    b && b.preventDefault(), b = a.Event("hide.bs.modal"), this.$element.trigger(b), this.isShown && !b.isDefaultPrevented() && (this.isShown = !1, this.escape(), this.resize(), a(document).off("focusin.bs.modal"), this.$element.removeClass("in").off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"), this.$dialog.off("mousedown.dismiss.bs.modal"), a.support.transition && this.$element.hasClass("fade") ? this.$element.one("bsTransitionEnd", a.proxy(this.hideModal, this)).emulateTransitionEnd(c.TRANSITION_DURATION) : this.hideModal());
  }, c.prototype.enforceFocus = function () {
    a(document).off("focusin.bs.modal").on("focusin.bs.modal", a.proxy(function (a) {
      document === a.target || this.$element[0] === a.target || this.$element.has(a.target).length || this.$element.trigger("focus");
    }, this));
  }, c.prototype.escape = function () {
    this.isShown && this.options.keyboard ? this.$element.on("keydown.dismiss.bs.modal", a.proxy(function (a) {
      27 == a.which && this.hide();
    }, this)) : this.isShown || this.$element.off("keydown.dismiss.bs.modal");
  }, c.prototype.resize = function () {
    this.isShown ? a(window).on("resize.bs.modal", a.proxy(this.handleUpdate, this)) : a(window).off("resize.bs.modal");
  }, c.prototype.hideModal = function () {
    var a = this;this.$element.hide(), this.backdrop(function () {
      a.$body.removeClass("modal-open"), a.resetAdjustments(), a.resetScrollbar(), a.$element.trigger("hidden.bs.modal");
    });
  }, c.prototype.removeBackdrop = function () {
    this.$backdrop && this.$backdrop.remove(), this.$backdrop = null;
  }, c.prototype.backdrop = function (b) {
    var d = this,
        e = this.$element.hasClass("fade") ? "fade" : "";if (this.isShown && this.options.backdrop) {
      var f = a.support.transition && e;if (this.$backdrop = a(document.createElement("div")).addClass("modal-backdrop " + e).appendTo(this.$body), this.$element.on("click.dismiss.bs.modal", a.proxy(function (a) {
        return this.ignoreBackdropClick ? void (this.ignoreBackdropClick = !1) : void (a.target === a.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus() : this.hide()));
      }, this)), f && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), !b) return;f ? this.$backdrop.one("bsTransitionEnd", b).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION) : b();
    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass("in");var g = function g() {
        d.removeBackdrop(), b && b();
      };a.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one("bsTransitionEnd", g).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION) : g();
    } else b && b();
  }, c.prototype.handleUpdate = function () {
    this.adjustDialog();
  }, c.prototype.adjustDialog = function () {
    var a = this.$element[0].scrollHeight > document.documentElement.clientHeight;this.$element.css({ paddingLeft: !this.bodyIsOverflowing && a ? this.scrollbarWidth : "", paddingRight: this.bodyIsOverflowing && !a ? this.scrollbarWidth : "" });
  }, c.prototype.resetAdjustments = function () {
    this.$element.css({ paddingLeft: "", paddingRight: "" });
  }, c.prototype.checkScrollbar = function () {
    var a = window.innerWidth;if (!a) {
      var b = document.documentElement.getBoundingClientRect();a = b.right - Math.abs(b.left);
    }this.bodyIsOverflowing = document.body.clientWidth < a, this.scrollbarWidth = this.measureScrollbar();
  }, c.prototype.setScrollbar = function () {
    var a = parseInt(this.$body.css("padding-right") || 0, 10);this.originalBodyPad = document.body.style.paddingRight || "", this.bodyIsOverflowing && this.$body.css("padding-right", a + this.scrollbarWidth);
  }, c.prototype.resetScrollbar = function () {
    this.$body.css("padding-right", this.originalBodyPad);
  }, c.prototype.measureScrollbar = function () {
    var a = document.createElement("div");a.className = "modal-scrollbar-measure", this.$body.append(a);var b = a.offsetWidth - a.clientWidth;return this.$body[0].removeChild(a), b;
  };var d = a.fn.modal;a.fn.modal = b, a.fn.modal.Constructor = c, a.fn.modal.noConflict = function () {
    return a.fn.modal = d, this;
  }, a(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function (c) {
    var d = a(this),
        e = d.attr("href"),
        f = a(d.attr("data-target") || e && e.replace(/.*(?=#[^\s]+$)/, "")),
        g = f.data("bs.modal") ? "toggle" : a.extend({ remote: !/#/.test(e) && e }, f.data(), d.data());d.is("a") && c.preventDefault(), f.one("show.bs.modal", function (a) {
      a.isDefaultPrevented() || f.one("hidden.bs.modal", function () {
        d.is(":visible") && d.trigger("focus");
      });
    }), b.call(f, g, this);
  });
}(jQuery), +function (a) {
  "use strict";
  function b(b) {
    return this.each(function () {
      var d = a(this),
          e = d.data("bs.tooltip"),
          f = "object" == (typeof b === "undefined" ? "undefined" : _typeof(b)) && b;!e && /destroy|hide/.test(b) || (e || d.data("bs.tooltip", e = new c(this, f)), "string" == typeof b && e[b]());
    });
  }var c = function c(a, b) {
    this.type = null, this.options = null, this.enabled = null, this.timeout = null, this.hoverState = null, this.$element = null, this.inState = null, this.init("tooltip", a, b);
  };c.VERSION = "3.3.7", c.TRANSITION_DURATION = 150, c.DEFAULTS = { animation: !0, placement: "top", selector: !1, template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>', trigger: "hover focus", title: "", delay: 0, html: !1, container: !1, viewport: { selector: "body", padding: 0 } }, c.prototype.init = function (b, c, d) {
    if (this.enabled = !0, this.type = b, this.$element = a(c), this.options = this.getOptions(d), this.$viewport = this.options.viewport && a(a.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : this.options.viewport.selector || this.options.viewport), this.inState = { click: !1, hover: !1, focus: !1 }, this.$element[0] instanceof document.constructor && !this.options.selector) throw new Error("`selector` option must be specified when initializing " + this.type + " on the window.document object!");for (var e = this.options.trigger.split(" "), f = e.length; f--;) {
      var g = e[f];if ("click" == g) this.$element.on("click." + this.type, this.options.selector, a.proxy(this.toggle, this));else if ("manual" != g) {
        var h = "hover" == g ? "mouseenter" : "focusin",
            i = "hover" == g ? "mouseleave" : "focusout";this.$element.on(h + "." + this.type, this.options.selector, a.proxy(this.enter, this)), this.$element.on(i + "." + this.type, this.options.selector, a.proxy(this.leave, this));
      }
    }this.options.selector ? this._options = a.extend({}, this.options, { trigger: "manual", selector: "" }) : this.fixTitle();
  }, c.prototype.getDefaults = function () {
    return c.DEFAULTS;
  }, c.prototype.getOptions = function (b) {
    return b = a.extend({}, this.getDefaults(), this.$element.data(), b), b.delay && "number" == typeof b.delay && (b.delay = { show: b.delay, hide: b.delay }), b;
  }, c.prototype.getDelegateOptions = function () {
    var b = {},
        c = this.getDefaults();return this._options && a.each(this._options, function (a, d) {
      c[a] != d && (b[a] = d);
    }), b;
  }, c.prototype.enter = function (b) {
    var c = b instanceof this.constructor ? b : a(b.currentTarget).data("bs." + this.type);return c || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), a(b.currentTarget).data("bs." + this.type, c)), b instanceof a.Event && (c.inState["focusin" == b.type ? "focus" : "hover"] = !0), c.tip().hasClass("in") || "in" == c.hoverState ? void (c.hoverState = "in") : (clearTimeout(c.timeout), c.hoverState = "in", c.options.delay && c.options.delay.show ? void (c.timeout = setTimeout(function () {
      "in" == c.hoverState && c.show();
    }, c.options.delay.show)) : c.show());
  }, c.prototype.isInStateTrue = function () {
    for (var a in this.inState) {
      if (this.inState[a]) return !0;
    }return !1;
  }, c.prototype.leave = function (b) {
    var c = b instanceof this.constructor ? b : a(b.currentTarget).data("bs." + this.type);if (c || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), a(b.currentTarget).data("bs." + this.type, c)), b instanceof a.Event && (c.inState["focusout" == b.type ? "focus" : "hover"] = !1), !c.isInStateTrue()) return clearTimeout(c.timeout), c.hoverState = "out", c.options.delay && c.options.delay.hide ? void (c.timeout = setTimeout(function () {
      "out" == c.hoverState && c.hide();
    }, c.options.delay.hide)) : c.hide();
  }, c.prototype.show = function () {
    var b = a.Event("show.bs." + this.type);if (this.hasContent() && this.enabled) {
      this.$element.trigger(b);var d = a.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]);if (b.isDefaultPrevented() || !d) return;var e = this,
          f = this.tip(),
          g = this.getUID(this.type);this.setContent(), f.attr("id", g), this.$element.attr("aria-describedby", g), this.options.animation && f.addClass("fade");var h = "function" == typeof this.options.placement ? this.options.placement.call(this, f[0], this.$element[0]) : this.options.placement,
          i = /\s?auto?\s?/i,
          j = i.test(h);j && (h = h.replace(i, "") || "top"), f.detach().css({ top: 0, left: 0, display: "block" }).addClass(h).data("bs." + this.type, this), this.options.container ? f.appendTo(this.options.container) : f.insertAfter(this.$element), this.$element.trigger("inserted.bs." + this.type);var k = this.getPosition(),
          l = f[0].offsetWidth,
          m = f[0].offsetHeight;if (j) {
        var n = h,
            o = this.getPosition(this.$viewport);h = "bottom" == h && k.bottom + m > o.bottom ? "top" : "top" == h && k.top - m < o.top ? "bottom" : "right" == h && k.right + l > o.width ? "left" : "left" == h && k.left - l < o.left ? "right" : h, f.removeClass(n).addClass(h);
      }var p = this.getCalculatedOffset(h, k, l, m);this.applyPlacement(p, h);var q = function q() {
        var a = e.hoverState;e.$element.trigger("shown.bs." + e.type), e.hoverState = null, "out" == a && e.leave(e);
      };a.support.transition && this.$tip.hasClass("fade") ? f.one("bsTransitionEnd", q).emulateTransitionEnd(c.TRANSITION_DURATION) : q();
    }
  }, c.prototype.applyPlacement = function (b, c) {
    var d = this.tip(),
        e = d[0].offsetWidth,
        f = d[0].offsetHeight,
        g = parseInt(d.css("margin-top"), 10),
        h = parseInt(d.css("margin-left"), 10);isNaN(g) && (g = 0), isNaN(h) && (h = 0), b.top += g, b.left += h, a.offset.setOffset(d[0], a.extend({ using: function using(a) {
        d.css({ top: Math.round(a.top), left: Math.round(a.left) });
      } }, b), 0), d.addClass("in");var i = d[0].offsetWidth,
        j = d[0].offsetHeight;"top" == c && j != f && (b.top = b.top + f - j);var k = this.getViewportAdjustedDelta(c, b, i, j);k.left ? b.left += k.left : b.top += k.top;var l = /top|bottom/.test(c),
        m = l ? 2 * k.left - e + i : 2 * k.top - f + j,
        n = l ? "offsetWidth" : "offsetHeight";d.offset(b), this.replaceArrow(m, d[0][n], l);
  }, c.prototype.replaceArrow = function (a, b, c) {
    this.arrow().css(c ? "left" : "top", 50 * (1 - a / b) + "%").css(c ? "top" : "left", "");
  }, c.prototype.setContent = function () {
    var a = this.tip(),
        b = this.getTitle();a.find(".tooltip-inner")[this.options.html ? "html" : "text"](b), a.removeClass("fade in top bottom left right");
  }, c.prototype.hide = function (b) {
    function d() {
      "in" != e.hoverState && f.detach(), e.$element && e.$element.removeAttr("aria-describedby").trigger("hidden.bs." + e.type), b && b();
    }var e = this,
        f = a(this.$tip),
        g = a.Event("hide.bs." + this.type);if (this.$element.trigger(g), !g.isDefaultPrevented()) return f.removeClass("in"), a.support.transition && f.hasClass("fade") ? f.one("bsTransitionEnd", d).emulateTransitionEnd(c.TRANSITION_DURATION) : d(), this.hoverState = null, this;
  }, c.prototype.fixTitle = function () {
    var a = this.$element;(a.attr("title") || "string" != typeof a.attr("data-original-title")) && a.attr("data-original-title", a.attr("title") || "").attr("title", "");
  }, c.prototype.hasContent = function () {
    return this.getTitle();
  }, c.prototype.getPosition = function (b) {
    b = b || this.$element;var c = b[0],
        d = "BODY" == c.tagName,
        e = c.getBoundingClientRect();null == e.width && (e = a.extend({}, e, { width: e.right - e.left, height: e.bottom - e.top }));var f = window.SVGElement && c instanceof window.SVGElement,
        g = d ? { top: 0, left: 0 } : f ? null : b.offset(),
        h = { scroll: d ? document.documentElement.scrollTop || document.body.scrollTop : b.scrollTop() },
        i = d ? { width: a(window).width(), height: a(window).height() } : null;return a.extend({}, e, h, i, g);
  }, c.prototype.getCalculatedOffset = function (a, b, c, d) {
    return "bottom" == a ? { top: b.top + b.height, left: b.left + b.width / 2 - c / 2 } : "top" == a ? { top: b.top - d, left: b.left + b.width / 2 - c / 2 } : "left" == a ? { top: b.top + b.height / 2 - d / 2, left: b.left - c } : { top: b.top + b.height / 2 - d / 2, left: b.left + b.width };
  }, c.prototype.getViewportAdjustedDelta = function (a, b, c, d) {
    var e = { top: 0, left: 0 };if (!this.$viewport) return e;var f = this.options.viewport && this.options.viewport.padding || 0,
        g = this.getPosition(this.$viewport);if (/right|left/.test(a)) {
      var h = b.top - f - g.scroll,
          i = b.top + f - g.scroll + d;h < g.top ? e.top = g.top - h : i > g.top + g.height && (e.top = g.top + g.height - i);
    } else {
      var j = b.left - f,
          k = b.left + f + c;j < g.left ? e.left = g.left - j : k > g.right && (e.left = g.left + g.width - k);
    }return e;
  }, c.prototype.getTitle = function () {
    var a,
        b = this.$element,
        c = this.options;return a = b.attr("data-original-title") || ("function" == typeof c.title ? c.title.call(b[0]) : c.title);
  }, c.prototype.getUID = function (a) {
    do {
      a += ~~(1e6 * Math.random());
    } while (document.getElementById(a));return a;
  }, c.prototype.tip = function () {
    if (!this.$tip && (this.$tip = a(this.options.template), 1 != this.$tip.length)) throw new Error(this.type + " `template` option must consist of exactly 1 top-level element!");return this.$tip;
  }, c.prototype.arrow = function () {
    return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow");
  }, c.prototype.enable = function () {
    this.enabled = !0;
  }, c.prototype.disable = function () {
    this.enabled = !1;
  }, c.prototype.toggleEnabled = function () {
    this.enabled = !this.enabled;
  }, c.prototype.toggle = function (b) {
    var c = this;b && (c = a(b.currentTarget).data("bs." + this.type), c || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), a(b.currentTarget).data("bs." + this.type, c))), b ? (c.inState.click = !c.inState.click, c.isInStateTrue() ? c.enter(c) : c.leave(c)) : c.tip().hasClass("in") ? c.leave(c) : c.enter(c);
  }, c.prototype.destroy = function () {
    var a = this;clearTimeout(this.timeout), this.hide(function () {
      a.$element.off("." + a.type).removeData("bs." + a.type), a.$tip && a.$tip.detach(), a.$tip = null, a.$arrow = null, a.$viewport = null, a.$element = null;
    });
  };var d = a.fn.tooltip;a.fn.tooltip = b, a.fn.tooltip.Constructor = c, a.fn.tooltip.noConflict = function () {
    return a.fn.tooltip = d, this;
  };
}(jQuery), +function (a) {
  "use strict";
  function b(b) {
    return this.each(function () {
      var d = a(this),
          e = d.data("bs.popover"),
          f = "object" == (typeof b === "undefined" ? "undefined" : _typeof(b)) && b;!e && /destroy|hide/.test(b) || (e || d.data("bs.popover", e = new c(this, f)), "string" == typeof b && e[b]());
    });
  }var c = function c(a, b) {
    this.init("popover", a, b);
  };if (!a.fn.tooltip) throw new Error("Popover requires tooltip.js");c.VERSION = "3.3.7", c.DEFAULTS = a.extend({}, a.fn.tooltip.Constructor.DEFAULTS, { placement: "right", trigger: "click", content: "", template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>' }), c.prototype = a.extend({}, a.fn.tooltip.Constructor.prototype), c.prototype.constructor = c, c.prototype.getDefaults = function () {
    return c.DEFAULTS;
  }, c.prototype.setContent = function () {
    var a = this.tip(),
        b = this.getTitle(),
        c = this.getContent();a.find(".popover-title")[this.options.html ? "html" : "text"](b), a.find(".popover-content").children().detach().end()[this.options.html ? "string" == typeof c ? "html" : "append" : "text"](c), a.removeClass("fade top bottom left right in"), a.find(".popover-title").html() || a.find(".popover-title").hide();
  }, c.prototype.hasContent = function () {
    return this.getTitle() || this.getContent();
  }, c.prototype.getContent = function () {
    var a = this.$element,
        b = this.options;return a.attr("data-content") || ("function" == typeof b.content ? b.content.call(a[0]) : b.content);
  }, c.prototype.arrow = function () {
    return this.$arrow = this.$arrow || this.tip().find(".arrow");
  };var d = a.fn.popover;a.fn.popover = b, a.fn.popover.Constructor = c, a.fn.popover.noConflict = function () {
    return a.fn.popover = d, this;
  };
}(jQuery), +function (a) {
  "use strict";
  function b(c, d) {
    this.$body = a(document.body), this.$scrollElement = a(a(c).is(document.body) ? window : c), this.options = a.extend({}, b.DEFAULTS, d), this.selector = (this.options.target || "") + " .nav li > a", this.offsets = [], this.targets = [], this.activeTarget = null, this.scrollHeight = 0, this.$scrollElement.on("scroll.bs.scrollspy", a.proxy(this.process, this)), this.refresh(), this.process();
  }function c(c) {
    return this.each(function () {
      var d = a(this),
          e = d.data("bs.scrollspy"),
          f = "object" == (typeof c === "undefined" ? "undefined" : _typeof(c)) && c;e || d.data("bs.scrollspy", e = new b(this, f)), "string" == typeof c && e[c]();
    });
  }b.VERSION = "3.3.7", b.DEFAULTS = { offset: 10 }, b.prototype.getScrollHeight = function () {
    return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight);
  }, b.prototype.refresh = function () {
    var b = this,
        c = "offset",
        d = 0;this.offsets = [], this.targets = [], this.scrollHeight = this.getScrollHeight(), a.isWindow(this.$scrollElement[0]) || (c = "position", d = this.$scrollElement.scrollTop()), this.$body.find(this.selector).map(function () {
      var b = a(this),
          e = b.data("target") || b.attr("href"),
          f = /^#./.test(e) && a(e);return f && f.length && f.is(":visible") && [[f[c]().top + d, e]] || null;
    }).sort(function (a, b) {
      return a[0] - b[0];
    }).each(function () {
      b.offsets.push(this[0]), b.targets.push(this[1]);
    });
  }, b.prototype.process = function () {
    var a,
        b = this.$scrollElement.scrollTop() + this.options.offset,
        c = this.getScrollHeight(),
        d = this.options.offset + c - this.$scrollElement.height(),
        e = this.offsets,
        f = this.targets,
        g = this.activeTarget;if (this.scrollHeight != c && this.refresh(), b >= d) return g != (a = f[f.length - 1]) && this.activate(a);if (g && b < e[0]) return this.activeTarget = null, this.clear();for (a = e.length; a--;) {
      g != f[a] && b >= e[a] && (void 0 === e[a + 1] || b < e[a + 1]) && this.activate(f[a]);
    }
  }, b.prototype.activate = function (b) {
    this.activeTarget = b, this.clear();var c = this.selector + '[data-target="' + b + '"],' + this.selector + '[href="' + b + '"]',
        d = a(c).parents("li").addClass("active");d.parent(".dropdown-menu").length && (d = d.closest("li.dropdown").addClass("active")), d.trigger("activate.bs.scrollspy");
  }, b.prototype.clear = function () {
    a(this.selector).parentsUntil(this.options.target, ".active").removeClass("active");
  };var d = a.fn.scrollspy;a.fn.scrollspy = c, a.fn.scrollspy.Constructor = b, a.fn.scrollspy.noConflict = function () {
    return a.fn.scrollspy = d, this;
  }, a(window).on("load.bs.scrollspy.data-api", function () {
    a('[data-spy="scroll"]').each(function () {
      var b = a(this);c.call(b, b.data());
    });
  });
}(jQuery), +function (a) {
  "use strict";
  function b(b) {
    return this.each(function () {
      var d = a(this),
          e = d.data("bs.tab");e || d.data("bs.tab", e = new c(this)), "string" == typeof b && e[b]();
    });
  }var c = function c(b) {
    this.element = a(b);
  };c.VERSION = "3.3.7", c.TRANSITION_DURATION = 150, c.prototype.show = function () {
    var b = this.element,
        c = b.closest("ul:not(.dropdown-menu)"),
        d = b.data("target");if (d || (d = b.attr("href"), d = d && d.replace(/.*(?=#[^\s]*$)/, "")), !b.parent("li").hasClass("active")) {
      var e = c.find(".active:last a"),
          f = a.Event("hide.bs.tab", { relatedTarget: b[0] }),
          g = a.Event("show.bs.tab", { relatedTarget: e[0] });if (e.trigger(f), b.trigger(g), !g.isDefaultPrevented() && !f.isDefaultPrevented()) {
        var h = a(d);this.activate(b.closest("li"), c), this.activate(h, h.parent(), function () {
          e.trigger({ type: "hidden.bs.tab", relatedTarget: b[0] }), b.trigger({ type: "shown.bs.tab", relatedTarget: e[0] });
        });
      }
    }
  }, c.prototype.activate = function (b, d, e) {
    function f() {
      g.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !1), b.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded", !0), h ? (b[0].offsetWidth, b.addClass("in")) : b.removeClass("fade"), b.parent(".dropdown-menu").length && b.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !0), e && e();
    }var g = d.find("> .active"),
        h = e && a.support.transition && (g.length && g.hasClass("fade") || !!d.find("> .fade").length);g.length && h ? g.one("bsTransitionEnd", f).emulateTransitionEnd(c.TRANSITION_DURATION) : f(), g.removeClass("in");
  };var d = a.fn.tab;a.fn.tab = b, a.fn.tab.Constructor = c, a.fn.tab.noConflict = function () {
    return a.fn.tab = d, this;
  };var e = function e(c) {
    c.preventDefault(), b.call(a(this), "show");
  };a(document).on("click.bs.tab.data-api", '[data-toggle="tab"]', e).on("click.bs.tab.data-api", '[data-toggle="pill"]', e);
}(jQuery), +function (a) {
  "use strict";
  function b(b) {
    return this.each(function () {
      var d = a(this),
          e = d.data("bs.affix"),
          f = "object" == (typeof b === "undefined" ? "undefined" : _typeof(b)) && b;e || d.data("bs.affix", e = new c(this, f)), "string" == typeof b && e[b]();
    });
  }var c = function c(b, d) {
    this.options = a.extend({}, c.DEFAULTS, d), this.$target = a(this.options.target).on("scroll.bs.affix.data-api", a.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", a.proxy(this.checkPositionWithEventLoop, this)), this.$element = a(b), this.affixed = null, this.unpin = null, this.pinnedOffset = null, this.checkPosition();
  };c.VERSION = "3.3.7", c.RESET = "affix affix-top affix-bottom", c.DEFAULTS = { offset: 0, target: window }, c.prototype.getState = function (a, b, c, d) {
    var e = this.$target.scrollTop(),
        f = this.$element.offset(),
        g = this.$target.height();if (null != c && "top" == this.affixed) return e < c && "top";if ("bottom" == this.affixed) return null != c ? !(e + this.unpin <= f.top) && "bottom" : !(e + g <= a - d) && "bottom";var h = null == this.affixed,
        i = h ? e : f.top,
        j = h ? g : b;return null != c && e <= c ? "top" : null != d && i + j >= a - d && "bottom";
  }, c.prototype.getPinnedOffset = function () {
    if (this.pinnedOffset) return this.pinnedOffset;this.$element.removeClass(c.RESET).addClass("affix");var a = this.$target.scrollTop(),
        b = this.$element.offset();return this.pinnedOffset = b.top - a;
  }, c.prototype.checkPositionWithEventLoop = function () {
    setTimeout(a.proxy(this.checkPosition, this), 1);
  }, c.prototype.checkPosition = function () {
    if (this.$element.is(":visible")) {
      var b = this.$element.height(),
          d = this.options.offset,
          e = d.top,
          f = d.bottom,
          g = Math.max(a(document).height(), a(document.body).height());"object" != (typeof d === "undefined" ? "undefined" : _typeof(d)) && (f = e = d), "function" == typeof e && (e = d.top(this.$element)), "function" == typeof f && (f = d.bottom(this.$element));var h = this.getState(g, b, e, f);if (this.affixed != h) {
        null != this.unpin && this.$element.css("top", "");var i = "affix" + (h ? "-" + h : ""),
            j = a.Event(i + ".bs.affix");if (this.$element.trigger(j), j.isDefaultPrevented()) return;this.affixed = h, this.unpin = "bottom" == h ? this.getPinnedOffset() : null, this.$element.removeClass(c.RESET).addClass(i).trigger(i.replace("affix", "affixed") + ".bs.affix");
      }"bottom" == h && this.$element.offset({ top: g - b - f });
    }
  };var d = a.fn.affix;a.fn.affix = b, a.fn.affix.Constructor = c, a.fn.affix.noConflict = function () {
    return a.fn.affix = d, this;
  }, a(window).on("load", function () {
    a('[data-spy="affix"]').each(function () {
      var c = a(this),
          d = c.data();d.offset = d.offset || {}, null != d.offsetBottom && (d.offset.bottom = d.offsetBottom), null != d.offsetTop && (d.offset.top = d.offsetTop), b.call(c, d);
    });
  });
}(jQuery);

/***/ }),
/* 22 */
/***/ (function(module, exports) {

/**
 * jQuery.browser.mobile (http://detectmobilebrowser.com/)
 *
 * jQuery.browser.mobile will be true if the browser is a mobile device
 *
 **/
(function (a) {
  (jQuery.browser = jQuery.browser || {}).mobile = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4));
})(navigator.userAgent || navigator.vendor || window.opera);

/***/ }),
/* 23 */
/***/ (function(module, exports) {

/*! WOW - v0.1.9 - 2014-05-10
* Copyright (c) 2014 Matthieu Aussaguel; Licensed MIT */(function () {
  var a,
      b,
      c = function c(a, b) {
    return function () {
      return a.apply(b, arguments);
    };
  };a = function () {
    function a() {}return a.prototype.extend = function (a, b) {
      var c, d;for (c in a) {
        d = a[c], null != d && (b[c] = d);
      }return b;
    }, a.prototype.isMobile = function (a) {
      return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(a)
      );
    }, a;
  }(), b = this.WeakMap || (b = function () {
    function a() {
      this.keys = [], this.values = [];
    }return a.prototype.get = function (a) {
      var b, c, d, e, f;for (f = this.keys, b = d = 0, e = f.length; e > d; b = ++d) {
        if (c = f[b], c === a) return this.values[b];
      }
    }, a.prototype.set = function (a, b) {
      var c, d, e, f, g;for (g = this.keys, c = e = 0, f = g.length; f > e; c = ++e) {
        if (d = g[c], d === a) return void (this.values[c] = b);
      }return this.keys.push(a), this.values.push(b);
    }, a;
  }()), this.WOW = function () {
    function d(a) {
      null == a && (a = {}), this.scrollCallback = c(this.scrollCallback, this), this.scrollHandler = c(this.scrollHandler, this), this.start = c(this.start, this), this.scrolled = !0, this.config = this.util().extend(a, this.defaults), this.animationNameCache = new b();
    }return d.prototype.defaults = { boxClass: "wow", animateClass: "animated", offset: 0, mobile: !0 }, d.prototype.init = function () {
      var a;return this.element = window.document.documentElement, "interactive" === (a = document.readyState) || "complete" === a ? this.start() : document.addEventListener("DOMContentLoaded", this.start);
    }, d.prototype.start = function () {
      var a, b, c, d;if (this.boxes = this.element.getElementsByClassName(this.config.boxClass), this.boxes.length) {
        if (this.disabled()) return this.resetStyle();for (d = this.boxes, b = 0, c = d.length; c > b; b++) {
          a = d[b], this.applyStyle(a, !0);
        }return window.addEventListener("scroll", this.scrollHandler, !1), window.addEventListener("resize", this.scrollHandler, !1), this.interval = setInterval(this.scrollCallback, 50);
      }
    }, d.prototype.stop = function () {
      return window.removeEventListener("scroll", this.scrollHandler, !1), window.removeEventListener("resize", this.scrollHandler, !1), null != this.interval ? clearInterval(this.interval) : void 0;
    }, d.prototype.show = function (a) {
      return this.applyStyle(a), a.className = "" + a.className + " " + this.config.animateClass;
    }, d.prototype.applyStyle = function (a, b) {
      var c, d, e;return d = a.getAttribute("data-wow-duration"), c = a.getAttribute("data-wow-delay"), e = a.getAttribute("data-wow-iteration"), this.animate(function (f) {
        return function () {
          return f.customStyle(a, b, d, c, e);
        };
      }(this));
    }, d.prototype.animate = function () {
      return "requestAnimationFrame" in window ? function (a) {
        return window.requestAnimationFrame(a);
      } : function (a) {
        return a();
      };
    }(), d.prototype.resetStyle = function () {
      var a, b, c, d, e;for (d = this.boxes, e = [], b = 0, c = d.length; c > b; b++) {
        a = d[b], e.push(a.setAttribute("style", "visibility: visible;"));
      }return e;
    }, d.prototype.customStyle = function (a, b, c, d, e) {
      return b && this.cacheAnimationName(a), a.style.visibility = b ? "hidden" : "visible", c && this.vendorSet(a.style, { animationDuration: c }), d && this.vendorSet(a.style, { animationDelay: d }), e && this.vendorSet(a.style, { animationIterationCount: e }), this.vendorSet(a.style, { animationName: b ? "none" : this.cachedAnimationName(a) }), a;
    }, d.prototype.vendors = ["moz", "webkit"], d.prototype.vendorSet = function (a, b) {
      var c, d, e, f;f = [];for (c in b) {
        d = b[c], a["" + c] = d, f.push(function () {
          var b, f, g, h;for (g = this.vendors, h = [], b = 0, f = g.length; f > b; b++) {
            e = g[b], h.push(a["" + e + c.charAt(0).toUpperCase() + c.substr(1)] = d);
          }return h;
        }.call(this));
      }return f;
    }, d.prototype.vendorCSS = function (a, b) {
      var c, d, e, f, g, h;for (d = window.getComputedStyle(a), c = d.getPropertyCSSValue(b), h = this.vendors, f = 0, g = h.length; g > f; f++) {
        e = h[f], c = c || d.getPropertyCSSValue("-" + e + "-" + b);
      }return c;
    }, d.prototype.animationName = function (a) {
      var b;try {
        b = this.vendorCSS(a, "animation-name").cssText;
      } catch (c) {
        b = window.getComputedStyle(a).getPropertyValue("animation-name");
      }return "none" === b ? "" : b;
    }, d.prototype.cacheAnimationName = function (a) {
      return this.animationNameCache.set(a, this.animationName(a));
    }, d.prototype.cachedAnimationName = function (a) {
      return this.animationNameCache.get(a);
    }, d.prototype.scrollHandler = function () {
      return this.scrolled = !0;
    }, d.prototype.scrollCallback = function () {
      var a;return this.scrolled && (this.scrolled = !1, this.boxes = function () {
        var b, c, d, e;for (d = this.boxes, e = [], b = 0, c = d.length; c > b; b++) {
          a = d[b], a && (this.isVisible(a) ? this.show(a) : e.push(a));
        }return e;
      }.call(this), !this.boxes.length) ? this.stop() : void 0;
    }, d.prototype.offsetTop = function (a) {
      for (var b; void 0 === a.offsetTop;) {
        a = a.parentNode;
      }for (b = a.offsetTop; a = a.offsetParent;) {
        b += a.offsetTop;
      }return b;
    }, d.prototype.isVisible = function (a) {
      var b, c, d, e, f;return c = a.getAttribute("data-wow-offset") || this.config.offset, f = window.pageYOffset, e = f + this.element.clientHeight - c, d = this.offsetTop(a), b = d + a.clientHeight, e >= d && b >= f;
    }, d.prototype.util = function () {
      return this._util || (this._util = new a());
    }, d.prototype.disabled = function () {
      return !this.config.mobile && this.util().isMobile(navigator.userAgent);
    }, d;
  }();
}).call(this);

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

;(function () {
	'use strict';

	/**
  * @preserve FastClick: polyfill to remove click delays on browsers with touch UIs.
  *
  * @codingstandard ftlabs-jsv2
  * @copyright The Financial Times Limited [All Rights Reserved]
  * @license MIT License (see LICENSE.txt)
  */

	/*jslint browser:true, node:true*/
	/*global define, Event, Node*/

	/**
  * Instantiate fast-clicking listeners on the specified layer.
  *
  * @constructor
  * @param {Element} layer The layer to listen on
  * @param {Object} [options={}] The options to override the defaults
  */

	function FastClick(layer, options) {
		var oldOnClick;

		options = options || {};

		/**
   * Whether a click is currently being tracked.
   *
   * @type boolean
   */
		this.trackingClick = false;

		/**
   * Timestamp for when click tracking started.
   *
   * @type number
   */
		this.trackingClickStart = 0;

		/**
   * The element being tracked for a click.
   *
   * @type EventTarget
   */
		this.targetElement = null;

		/**
   * X-coordinate of touch start event.
   *
   * @type number
   */
		this.touchStartX = 0;

		/**
   * Y-coordinate of touch start event.
   *
   * @type number
   */
		this.touchStartY = 0;

		/**
   * ID of the last touch, retrieved from Touch.identifier.
   *
   * @type number
   */
		this.lastTouchIdentifier = 0;

		/**
   * Touchmove boundary, beyond which a click will be cancelled.
   *
   * @type number
   */
		this.touchBoundary = options.touchBoundary || 10;

		/**
   * The FastClick layer.
   *
   * @type Element
   */
		this.layer = layer;

		/**
   * The minimum time between tap(touchstart and touchend) events
   *
   * @type number
   */
		this.tapDelay = options.tapDelay || 200;

		/**
   * The maximum time for a tap
   *
   * @type number
   */
		this.tapTimeout = options.tapTimeout || 700;

		if (FastClick.notNeeded(layer)) {
			return;
		}

		// Some old versions of Android don't have Function.prototype.bind
		function bind(method, context) {
			return function () {
				return method.apply(context, arguments);
			};
		}

		var methods = ['onMouse', 'onClick', 'onTouchStart', 'onTouchMove', 'onTouchEnd', 'onTouchCancel'];
		var context = this;
		for (var i = 0, l = methods.length; i < l; i++) {
			context[methods[i]] = bind(context[methods[i]], context);
		}

		// Set up event handlers as required
		if (deviceIsAndroid) {
			layer.addEventListener('mouseover', this.onMouse, true);
			layer.addEventListener('mousedown', this.onMouse, true);
			layer.addEventListener('mouseup', this.onMouse, true);
		}

		layer.addEventListener('click', this.onClick, true);
		layer.addEventListener('touchstart', this.onTouchStart, false);
		layer.addEventListener('touchmove', this.onTouchMove, false);
		layer.addEventListener('touchend', this.onTouchEnd, false);
		layer.addEventListener('touchcancel', this.onTouchCancel, false);

		// Hack is required for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
		// which is how FastClick normally stops click events bubbling to callbacks registered on the FastClick
		// layer when they are cancelled.
		if (!Event.prototype.stopImmediatePropagation) {
			layer.removeEventListener = function (type, callback, capture) {
				var rmv = Node.prototype.removeEventListener;
				if (type === 'click') {
					rmv.call(layer, type, callback.hijacked || callback, capture);
				} else {
					rmv.call(layer, type, callback, capture);
				}
			};

			layer.addEventListener = function (type, callback, capture) {
				var adv = Node.prototype.addEventListener;
				if (type === 'click') {
					adv.call(layer, type, callback.hijacked || (callback.hijacked = function (event) {
						if (!event.propagationStopped) {
							callback(event);
						}
					}), capture);
				} else {
					adv.call(layer, type, callback, capture);
				}
			};
		}

		// If a handler is already declared in the element's onclick attribute, it will be fired before
		// FastClick's onClick handler. Fix this by pulling out the user-defined handler function and
		// adding it as listener.
		if (typeof layer.onclick === 'function') {

			// Android browser on at least 3.2 requires a new reference to the function in layer.onclick
			// - the old one won't work if passed to addEventListener directly.
			oldOnClick = layer.onclick;
			layer.addEventListener('click', function (event) {
				oldOnClick(event);
			}, false);
			layer.onclick = null;
		}
	}

	/**
 * Windows Phone 8.1 fakes user agent string to look like Android and iPhone.
 *
 * @type boolean
 */
	var deviceIsWindowsPhone = navigator.userAgent.indexOf("Windows Phone") >= 0;

	/**
  * Android requires exceptions.
  *
  * @type boolean
  */
	var deviceIsAndroid = navigator.userAgent.indexOf('Android') > 0 && !deviceIsWindowsPhone;

	/**
  * iOS requires exceptions.
  *
  * @type boolean
  */
	var deviceIsIOS = /iP(ad|hone|od)/.test(navigator.userAgent) && !deviceIsWindowsPhone;

	/**
  * iOS 4 requires an exception for select elements.
  *
  * @type boolean
  */
	var deviceIsIOS4 = deviceIsIOS && /OS 4_\d(_\d)?/.test(navigator.userAgent);

	/**
  * iOS 6.0-7.* requires the target element to be manually derived
  *
  * @type boolean
  */
	var deviceIsIOSWithBadTarget = deviceIsIOS && /OS [6-7]_\d/.test(navigator.userAgent);

	/**
  * BlackBerry requires exceptions.
  *
  * @type boolean
  */
	var deviceIsBlackBerry10 = navigator.userAgent.indexOf('BB10') > 0;

	/**
  * Determine whether a given element requires a native click.
  *
  * @param {EventTarget|Element} target Target DOM element
  * @returns {boolean} Returns true if the element needs a native click
  */
	FastClick.prototype.needsClick = function (target) {
		switch (target.nodeName.toLowerCase()) {

			// Don't send a synthetic click to disabled inputs (issue #62)
			case 'button':
			case 'select':
			case 'textarea':
				if (target.disabled) {
					return true;
				}

				break;
			case 'input':

				// File inputs need real clicks on iOS 6 due to a browser bug (issue #68)
				if (deviceIsIOS && target.type === 'file' || target.disabled) {
					return true;
				}

				break;
			case 'label':
			case 'iframe': // iOS8 homescreen apps can prevent events bubbling into frames
			case 'video':
				return true;
		}

		return (/\bneedsclick\b/.test(target.className)
		);
	};

	/**
  * Determine whether a given element requires a call to focus to simulate click into element.
  *
  * @param {EventTarget|Element} target Target DOM element
  * @returns {boolean} Returns true if the element requires a call to focus to simulate native click.
  */
	FastClick.prototype.needsFocus = function (target) {
		switch (target.nodeName.toLowerCase()) {
			case 'textarea':
				return true;
			case 'select':
				return !deviceIsAndroid;
			case 'input':
				switch (target.type) {
					case 'button':
					case 'checkbox':
					case 'file':
					case 'image':
					case 'radio':
					case 'submit':
						return false;
				}

				// No point in attempting to focus disabled inputs
				return !target.disabled && !target.readOnly;
			default:
				return (/\bneedsfocus\b/.test(target.className)
				);
		}
	};

	/**
  * Send a click event to the specified element.
  *
  * @param {EventTarget|Element} targetElement
  * @param {Event} event
  */
	FastClick.prototype.sendClick = function (targetElement, event) {
		var clickEvent, touch;

		// On some Android devices activeElement needs to be blurred otherwise the synthetic click will have no effect (#24)
		if (document.activeElement && document.activeElement !== targetElement) {
			document.activeElement.blur();
		}

		touch = event.changedTouches[0];

		// Synthesise a click event, with an extra attribute so it can be tracked
		clickEvent = document.createEvent('MouseEvents');
		clickEvent.initMouseEvent(this.determineEventType(targetElement), true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null);
		clickEvent.forwardedTouchEvent = true;
		targetElement.dispatchEvent(clickEvent);
	};

	FastClick.prototype.determineEventType = function (targetElement) {

		//Issue #159: Android Chrome Select Box does not open with a synthetic click event
		if (deviceIsAndroid && targetElement.tagName.toLowerCase() === 'select') {
			return 'mousedown';
		}

		return 'click';
	};

	/**
  * @param {EventTarget|Element} targetElement
  */
	FastClick.prototype.focus = function (targetElement) {
		var length;

		// Issue #160: on iOS 7, some input elements (e.g. date datetime month) throw a vague TypeError on setSelectionRange. These elements don't have an integer value for the selectionStart and selectionEnd properties, but unfortunately that can't be used for detection because accessing the properties also throws a TypeError. Just check the type instead. Filed as Apple bug #15122724.
		if (deviceIsIOS && targetElement.setSelectionRange && targetElement.type.indexOf('date') !== 0 && targetElement.type !== 'time' && targetElement.type !== 'month') {
			length = targetElement.value.length;
			targetElement.setSelectionRange(length, length);
		} else {
			targetElement.focus();
		}
	};

	/**
  * Check whether the given target element is a child of a scrollable layer and if so, set a flag on it.
  *
  * @param {EventTarget|Element} targetElement
  */
	FastClick.prototype.updateScrollParent = function (targetElement) {
		var scrollParent, parentElement;

		scrollParent = targetElement.fastClickScrollParent;

		// Attempt to discover whether the target element is contained within a scrollable layer. Re-check if the
		// target element was moved to another parent.
		if (!scrollParent || !scrollParent.contains(targetElement)) {
			parentElement = targetElement;
			do {
				if (parentElement.scrollHeight > parentElement.offsetHeight) {
					scrollParent = parentElement;
					targetElement.fastClickScrollParent = parentElement;
					break;
				}

				parentElement = parentElement.parentElement;
			} while (parentElement);
		}

		// Always update the scroll top tracker if possible.
		if (scrollParent) {
			scrollParent.fastClickLastScrollTop = scrollParent.scrollTop;
		}
	};

	/**
  * @param {EventTarget} targetElement
  * @returns {Element|EventTarget}
  */
	FastClick.prototype.getTargetElementFromEventTarget = function (eventTarget) {

		// On some older browsers (notably Safari on iOS 4.1 - see issue #56) the event target may be a text node.
		if (eventTarget.nodeType === Node.TEXT_NODE) {
			return eventTarget.parentNode;
		}

		return eventTarget;
	};

	/**
  * On touch start, record the position and scroll offset.
  *
  * @param {Event} event
  * @returns {boolean}
  */
	FastClick.prototype.onTouchStart = function (event) {
		var targetElement, touch, selection;

		// Ignore multiple touches, otherwise pinch-to-zoom is prevented if both fingers are on the FastClick element (issue #111).
		if (event.targetTouches.length > 1) {
			return true;
		}

		targetElement = this.getTargetElementFromEventTarget(event.target);
		touch = event.targetTouches[0];

		if (deviceIsIOS) {

			// Only trusted events will deselect text on iOS (issue #49)
			selection = window.getSelection();
			if (selection.rangeCount && !selection.isCollapsed) {
				return true;
			}

			if (!deviceIsIOS4) {

				// Weird things happen on iOS when an alert or confirm dialog is opened from a click event callback (issue #23):
				// when the user next taps anywhere else on the page, new touchstart and touchend events are dispatched
				// with the same identifier as the touch event that previously triggered the click that triggered the alert.
				// Sadly, there is an issue on iOS 4 that causes some normal touch events to have the same identifier as an
				// immediately preceeding touch event (issue #52), so this fix is unavailable on that platform.
				// Issue 120: touch.identifier is 0 when Chrome dev tools 'Emulate touch events' is set with an iOS device UA string,
				// which causes all touch events to be ignored. As this block only applies to iOS, and iOS identifiers are always long,
				// random integers, it's safe to to continue if the identifier is 0 here.
				if (touch.identifier && touch.identifier === this.lastTouchIdentifier) {
					event.preventDefault();
					return false;
				}

				this.lastTouchIdentifier = touch.identifier;

				// If the target element is a child of a scrollable layer (using -webkit-overflow-scrolling: touch) and:
				// 1) the user does a fling scroll on the scrollable layer
				// 2) the user stops the fling scroll with another tap
				// then the event.target of the last 'touchend' event will be the element that was under the user's finger
				// when the fling scroll was started, causing FastClick to send a click event to that layer - unless a check
				// is made to ensure that a parent layer was not scrolled before sending a synthetic click (issue #42).
				this.updateScrollParent(targetElement);
			}
		}

		this.trackingClick = true;
		this.trackingClickStart = event.timeStamp;
		this.targetElement = targetElement;

		this.touchStartX = touch.pageX;
		this.touchStartY = touch.pageY;

		// Prevent phantom clicks on fast double-tap (issue #36)
		if (event.timeStamp - this.lastClickTime < this.tapDelay) {
			event.preventDefault();
		}

		return true;
	};

	/**
  * Based on a touchmove event object, check whether the touch has moved past a boundary since it started.
  *
  * @param {Event} event
  * @returns {boolean}
  */
	FastClick.prototype.touchHasMoved = function (event) {
		var touch = event.changedTouches[0],
		    boundary = this.touchBoundary;

		if (Math.abs(touch.pageX - this.touchStartX) > boundary || Math.abs(touch.pageY - this.touchStartY) > boundary) {
			return true;
		}

		return false;
	};

	/**
  * Update the last position.
  *
  * @param {Event} event
  * @returns {boolean}
  */
	FastClick.prototype.onTouchMove = function (event) {
		if (!this.trackingClick) {
			return true;
		}

		// If the touch has moved, cancel the click tracking
		if (this.targetElement !== this.getTargetElementFromEventTarget(event.target) || this.touchHasMoved(event)) {
			this.trackingClick = false;
			this.targetElement = null;
		}

		return true;
	};

	/**
  * Attempt to find the labelled control for the given label element.
  *
  * @param {EventTarget|HTMLLabelElement} labelElement
  * @returns {Element|null}
  */
	FastClick.prototype.findControl = function (labelElement) {

		// Fast path for newer browsers supporting the HTML5 control attribute
		if (labelElement.control !== undefined) {
			return labelElement.control;
		}

		// All browsers under test that support touch events also support the HTML5 htmlFor attribute
		if (labelElement.htmlFor) {
			return document.getElementById(labelElement.htmlFor);
		}

		// If no for attribute exists, attempt to retrieve the first labellable descendant element
		// the list of which is defined here: http://www.w3.org/TR/html5/forms.html#category-label
		return labelElement.querySelector('button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea');
	};

	/**
  * On touch end, determine whether to send a click event at once.
  *
  * @param {Event} event
  * @returns {boolean}
  */
	FastClick.prototype.onTouchEnd = function (event) {
		var forElement,
		    trackingClickStart,
		    targetTagName,
		    scrollParent,
		    touch,
		    targetElement = this.targetElement;

		if (!this.trackingClick) {
			return true;
		}

		// Prevent phantom clicks on fast double-tap (issue #36)
		if (event.timeStamp - this.lastClickTime < this.tapDelay) {
			this.cancelNextClick = true;
			return true;
		}

		if (event.timeStamp - this.trackingClickStart > this.tapTimeout) {
			return true;
		}

		// Reset to prevent wrong click cancel on input (issue #156).
		this.cancelNextClick = false;

		this.lastClickTime = event.timeStamp;

		trackingClickStart = this.trackingClickStart;
		this.trackingClick = false;
		this.trackingClickStart = 0;

		// On some iOS devices, the targetElement supplied with the event is invalid if the layer
		// is performing a transition or scroll, and has to be re-detected manually. Note that
		// for this to function correctly, it must be called *after* the event target is checked!
		// See issue #57; also filed as rdar://13048589 .
		if (deviceIsIOSWithBadTarget) {
			touch = event.changedTouches[0];

			// In certain cases arguments of elementFromPoint can be negative, so prevent setting targetElement to null
			targetElement = document.elementFromPoint(touch.pageX - window.pageXOffset, touch.pageY - window.pageYOffset) || targetElement;
			targetElement.fastClickScrollParent = this.targetElement.fastClickScrollParent;
		}

		targetTagName = targetElement.tagName.toLowerCase();
		if (targetTagName === 'label') {
			forElement = this.findControl(targetElement);
			if (forElement) {
				this.focus(targetElement);
				if (deviceIsAndroid) {
					return false;
				}

				targetElement = forElement;
			}
		} else if (this.needsFocus(targetElement)) {

			// Case 1: If the touch started a while ago (best guess is 100ms based on tests for issue #36) then focus will be triggered anyway. Return early and unset the target element reference so that the subsequent click will be allowed through.
			// Case 2: Without this exception for input elements tapped when the document is contained in an iframe, then any inputted text won't be visible even though the value attribute is updated as the user types (issue #37).
			if (event.timeStamp - trackingClickStart > 100 || deviceIsIOS && window.top !== window && targetTagName === 'input') {
				this.targetElement = null;
				return false;
			}

			this.focus(targetElement);
			this.sendClick(targetElement, event);

			// Select elements need the event to go through on iOS 4, otherwise the selector menu won't open.
			// Also this breaks opening selects when VoiceOver is active on iOS6, iOS7 (and possibly others)
			if (!deviceIsIOS || targetTagName !== 'select') {
				this.targetElement = null;
				event.preventDefault();
			}

			return false;
		}

		if (deviceIsIOS && !deviceIsIOS4) {

			// Don't send a synthetic click event if the target element is contained within a parent layer that was scrolled
			// and this tap is being used to stop the scrolling (usually initiated by a fling - issue #42).
			scrollParent = targetElement.fastClickScrollParent;
			if (scrollParent && scrollParent.fastClickLastScrollTop !== scrollParent.scrollTop) {
				return true;
			}
		}

		// Prevent the actual click from going though - unless the target node is marked as requiring
		// real clicks or if it is in the whitelist in which case only non-programmatic clicks are permitted.
		if (!this.needsClick(targetElement)) {
			event.preventDefault();
			this.sendClick(targetElement, event);
		}

		return false;
	};

	/**
  * On touch cancel, stop tracking the click.
  *
  * @returns {void}
  */
	FastClick.prototype.onTouchCancel = function () {
		this.trackingClick = false;
		this.targetElement = null;
	};

	/**
  * Determine mouse events which should be permitted.
  *
  * @param {Event} event
  * @returns {boolean}
  */
	FastClick.prototype.onMouse = function (event) {

		// If a target element was never set (because a touch event was never fired) allow the event
		if (!this.targetElement) {
			return true;
		}

		if (event.forwardedTouchEvent) {
			return true;
		}

		// Programmatically generated events targeting a specific element should be permitted
		if (!event.cancelable) {
			return true;
		}

		// Derive and check the target element to see whether the mouse event needs to be permitted;
		// unless explicitly enabled, prevent non-touch click events from triggering actions,
		// to prevent ghost/doubleclicks.
		if (!this.needsClick(this.targetElement) || this.cancelNextClick) {

			// Prevent any user-added listeners declared on FastClick element from being fired.
			if (event.stopImmediatePropagation) {
				event.stopImmediatePropagation();
			} else {

				// Part of the hack for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
				event.propagationStopped = true;
			}

			// Cancel the event
			event.stopPropagation();
			event.preventDefault();

			return false;
		}

		// If the mouse event is permitted, return true for the action to go through.
		return true;
	};

	/**
  * On actual clicks, determine whether this is a touch-generated click, a click action occurring
  * naturally after a delay after a touch (which needs to be cancelled to avoid duplication), or
  * an actual click which should be permitted.
  *
  * @param {Event} event
  * @returns {boolean}
  */
	FastClick.prototype.onClick = function (event) {
		var permitted;

		// It's possible for another FastClick-like library delivered with third-party code to fire a click event before FastClick does (issue #44). In that case, set the click-tracking flag back to false and return early. This will cause onTouchEnd to return early.
		if (this.trackingClick) {
			this.targetElement = null;
			this.trackingClick = false;
			return true;
		}

		// Very odd behaviour on iOS (issue #18): if a submit element is present inside a form and the user hits enter in the iOS simulator or clicks the Go button on the pop-up OS keyboard the a kind of 'fake' click event will be triggered with the submit-type input element as the target.
		if (event.target.type === 'submit' && event.detail === 0) {
			return true;
		}

		permitted = this.onMouse(event);

		// Only unset targetElement if the click is not permitted. This will ensure that the check for !targetElement in onMouse fails and the browser's click doesn't go through.
		if (!permitted) {
			this.targetElement = null;
		}

		// If clicks are permitted, return true for the action to go through.
		return permitted;
	};

	/**
  * Remove all FastClick's event listeners.
  *
  * @returns {void}
  */
	FastClick.prototype.destroy = function () {
		var layer = this.layer;

		if (deviceIsAndroid) {
			layer.removeEventListener('mouseover', this.onMouse, true);
			layer.removeEventListener('mousedown', this.onMouse, true);
			layer.removeEventListener('mouseup', this.onMouse, true);
		}

		layer.removeEventListener('click', this.onClick, true);
		layer.removeEventListener('touchstart', this.onTouchStart, false);
		layer.removeEventListener('touchmove', this.onTouchMove, false);
		layer.removeEventListener('touchend', this.onTouchEnd, false);
		layer.removeEventListener('touchcancel', this.onTouchCancel, false);
	};

	/**
  * Check whether FastClick is needed.
  *
  * @param {Element} layer The layer to listen on
  */
	FastClick.notNeeded = function (layer) {
		var metaViewport;
		var chromeVersion;
		var blackberryVersion;
		var firefoxVersion;

		// Devices that don't support touch don't need FastClick
		if (typeof window.ontouchstart === 'undefined') {
			return true;
		}

		// Chrome version - zero for other browsers
		chromeVersion = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1];

		if (chromeVersion) {

			if (deviceIsAndroid) {
				metaViewport = document.querySelector('meta[name=viewport]');

				if (metaViewport) {
					// Chrome on Android with user-scalable="no" doesn't need FastClick (issue #89)
					if (metaViewport.content.indexOf('user-scalable=no') !== -1) {
						return true;
					}
					// Chrome 32 and above with width=device-width or less don't need FastClick
					if (chromeVersion > 31 && document.documentElement.scrollWidth <= window.outerWidth) {
						return true;
					}
				}

				// Chrome desktop doesn't need FastClick (issue #15)
			} else {
				return true;
			}
		}

		if (deviceIsBlackBerry10) {
			blackberryVersion = navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/);

			// BlackBerry 10.3+ does not require Fastclick library.
			// https://github.com/ftlabs/fastclick/issues/251
			if (blackberryVersion[1] >= 10 && blackberryVersion[2] >= 3) {
				metaViewport = document.querySelector('meta[name=viewport]');

				if (metaViewport) {
					// user-scalable=no eliminates click delay.
					if (metaViewport.content.indexOf('user-scalable=no') !== -1) {
						return true;
					}
					// width=device-width (or less than device-width) eliminates click delay.
					if (document.documentElement.scrollWidth <= window.outerWidth) {
						return true;
					}
				}
			}
		}

		// IE10 with -ms-touch-action: none or manipulation, which disables double-tap-to-zoom (issue #97)
		if (layer.style.msTouchAction === 'none' || layer.style.touchAction === 'manipulation') {
			return true;
		}

		// Firefox version - zero for other browsers
		firefoxVersion = +(/Firefox\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1];

		if (firefoxVersion >= 27) {
			// Firefox 27+ does not have tap delay if the content is not zoomable - https://bugzilla.mozilla.org/show_bug.cgi?id=922896

			metaViewport = document.querySelector('meta[name=viewport]');
			if (metaViewport && (metaViewport.content.indexOf('user-scalable=no') !== -1 || document.documentElement.scrollWidth <= window.outerWidth)) {
				return true;
			}
		}

		// IE11: prefixed -ms-touch-action is no longer supported and it's recomended to use non-prefixed version
		// http://msdn.microsoft.com/en-us/library/windows/apps/Hh767313.aspx
		if (layer.style.touchAction === 'none' || layer.style.touchAction === 'manipulation') {
			return true;
		}

		return false;
	};

	/**
  * Factory method for creating a FastClick object
  *
  * @param {Element} layer The layer to listen on
  * @param {Object} [options={}] The options to override the defaults
  */
	FastClick.attach = function (layer, options) {
		return new FastClick(layer, options);
	};

	if ("function" === 'function' && _typeof(__webpack_require__(4)) === 'object' && __webpack_require__(4)) {

		// AMD. Register as an anonymous module.
		!(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {
			return FastClick;
		}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else if (typeof module !== 'undefined' && module.exports) {
		module.exports = FastClick.attach;
		module.exports.FastClick = FastClick;
	} else {
		window.FastClick = FastClick;
	}
})();

/***/ }),
/* 25 */
/***/ (function(module, exports) {

/*! Copyright (c) 2011 Piotr Rochala (http://rocha.la)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 * Version: 1.3.8
 *
 */
(function ($) {

  $.fn.extend({
    slimScroll: function slimScroll(options) {

      var defaults = {

        // width in pixels of the visible scroll area
        width: 'auto',

        // height in pixels of the visible scroll area
        height: '250px',

        // width in pixels of the scrollbar and rail
        size: '7px',

        // scrollbar color, accepts any hex/color value
        color: '#000',

        // scrollbar position - left/right
        position: 'right',

        // distance in pixels between the side edge and the scrollbar
        distance: '1px',

        // default scroll position on load - top / bottom / $('selector')
        start: 'top',

        // sets scrollbar opacity
        opacity: .4,

        // enables always-on mode for the scrollbar
        alwaysVisible: false,

        // check if we should hide the scrollbar when user is hovering over
        disableFadeOut: false,

        // sets visibility of the rail
        railVisible: false,

        // sets rail color
        railColor: '#333',

        // sets rail opacity
        railOpacity: .2,

        // whether  we should use jQuery UI Draggable to enable bar dragging
        railDraggable: true,

        // defautlt CSS class of the slimscroll rail
        railClass: 'slimScrollRail',

        // defautlt CSS class of the slimscroll bar
        barClass: 'slimScrollBar',

        // defautlt CSS class of the slimscroll wrapper
        wrapperClass: 'slimScrollDiv',

        // check if mousewheel should scroll the window if we reach top/bottom
        allowPageScroll: false,

        // scroll amount applied to each mouse wheel step
        wheelStep: 20,

        // scroll amount applied when user is using gestures
        touchScrollStep: 200,

        // sets border radius
        borderRadius: '7px',

        // sets border radius of the rail
        railBorderRadius: '7px'
      };

      var o = $.extend(defaults, options);

      // do it for every element that matches selector
      this.each(function () {

        var isOverPanel,
            isOverBar,
            isDragg,
            queueHide,
            touchDif,
            barHeight,
            percentScroll,
            lastScroll,
            divS = '<div></div>',
            minBarHeight = 30,
            releaseScroll = false;

        // used in event handlers and for better minification
        var me = $(this);

        // ensure we are not binding it again
        if (me.parent().hasClass(o.wrapperClass)) {
          // start from last bar position
          var offset = me.scrollTop();

          // find bar and rail
          bar = me.siblings('.' + o.barClass);
          rail = me.siblings('.' + o.railClass);

          getBarHeight();

          // check if we should scroll existing instance
          if ($.isPlainObject(options)) {
            // Pass height: auto to an existing slimscroll object to force a resize after contents have changed
            if ('height' in options && options.height == 'auto') {
              me.parent().css('height', 'auto');
              me.css('height', 'auto');
              var height = me.parent().parent().height();
              me.parent().css('height', height);
              me.css('height', height);
            } else if ('height' in options) {
              var h = options.height;
              me.parent().css('height', h);
              me.css('height', h);
            }

            if ('scrollTo' in options) {
              // jump to a static point
              offset = parseInt(o.scrollTo);
            } else if ('scrollBy' in options) {
              // jump by value pixels
              offset += parseInt(o.scrollBy);
            } else if ('destroy' in options) {
              // remove slimscroll elements
              bar.remove();
              rail.remove();
              me.unwrap();
              return;
            }

            // scroll content by the given offset
            scrollContent(offset, false, true);
          }

          return;
        } else if ($.isPlainObject(options)) {
          if ('destroy' in options) {
            return;
          }
        }

        // optionally set height to the parent's height
        o.height = o.height == 'auto' ? me.parent().height() : o.height;

        // wrap content
        var wrapper = $(divS).addClass(o.wrapperClass).css({
          position: 'relative',
          overflow: 'hidden',
          width: o.width,
          height: o.height
        });

        // update style for the div
        me.css({
          overflow: 'hidden',
          width: o.width,
          height: o.height
        });

        // create scrollbar rail
        var rail = $(divS).addClass(o.railClass).css({
          width: o.size,
          height: '100%',
          position: 'absolute',
          top: 0,
          display: o.alwaysVisible && o.railVisible ? 'block' : 'none',
          'border-radius': o.railBorderRadius,
          background: o.railColor,
          opacity: o.railOpacity,
          zIndex: 90
        });

        // create scrollbar
        var bar = $(divS).addClass(o.barClass).css({
          background: o.color,
          width: o.size,
          position: 'absolute',
          top: 0,
          opacity: o.opacity,
          display: o.alwaysVisible ? 'block' : 'none',
          'border-radius': o.borderRadius,
          BorderRadius: o.borderRadius,
          MozBorderRadius: o.borderRadius,
          WebkitBorderRadius: o.borderRadius,
          zIndex: 99
        });

        // set position
        var posCss = o.position == 'right' ? { right: o.distance } : { left: o.distance };
        rail.css(posCss);
        bar.css(posCss);

        // wrap it
        me.wrap(wrapper);

        // append to parent div
        me.parent().append(bar);
        me.parent().append(rail);

        // make it draggable and no longer dependent on the jqueryUI
        if (o.railDraggable) {
          bar.bind("mousedown", function (e) {
            var $doc = $(document);
            isDragg = true;
            t = parseFloat(bar.css('top'));
            pageY = e.pageY;

            $doc.bind("mousemove.slimscroll", function (e) {
              currTop = t + e.pageY - pageY;
              bar.css('top', currTop);
              scrollContent(0, bar.position().top, false); // scroll content
            });

            $doc.bind("mouseup.slimscroll", function (e) {
              isDragg = false;hideBar();
              $doc.unbind('.slimscroll');
            });
            return false;
          }).bind("selectstart.slimscroll", function (e) {
            e.stopPropagation();
            e.preventDefault();
            return false;
          });
        }

        // on rail over
        rail.hover(function () {
          showBar();
        }, function () {
          hideBar();
        });

        // on bar over
        bar.hover(function () {
          isOverBar = true;
        }, function () {
          isOverBar = false;
        });

        // show on parent mouseover
        me.hover(function () {
          isOverPanel = true;
          showBar();
          hideBar();
        }, function () {
          isOverPanel = false;
          hideBar();
        });

        // support for mobile
        me.bind('touchstart', function (e, b) {
          if (e.originalEvent.touches.length) {
            // record where touch started
            touchDif = e.originalEvent.touches[0].pageY;
          }
        });

        me.bind('touchmove', function (e) {
          // prevent scrolling the page if necessary
          if (!releaseScroll) {
            e.originalEvent.preventDefault();
          }
          if (e.originalEvent.touches.length) {
            // see how far user swiped
            var diff = (touchDif - e.originalEvent.touches[0].pageY) / o.touchScrollStep;
            // scroll content
            scrollContent(diff, true);
            touchDif = e.originalEvent.touches[0].pageY;
          }
        });

        // set up initial height
        getBarHeight();

        // check start position
        if (o.start === 'bottom') {
          // scroll content to bottom
          bar.css({ top: me.outerHeight() - bar.outerHeight() });
          scrollContent(0, true);
        } else if (o.start !== 'top') {
          // assume jQuery selector
          scrollContent($(o.start).position().top, null, true);

          // make sure bar stays hidden
          if (!o.alwaysVisible) {
            bar.hide();
          }
        }

        // attach scroll events
        attachWheel(this);

        function _onWheel(e) {
          // use mouse wheel only when mouse is over
          if (!isOverPanel) {
            return;
          }

          var e = e || window.event;

          var delta = 0;
          if (e.wheelDelta) {
            delta = -e.wheelDelta / 120;
          }
          if (e.detail) {
            delta = e.detail / 3;
          }

          var target = e.target || e.srcTarget || e.srcElement;
          if ($(target).closest('.' + o.wrapperClass).is(me.parent())) {
            // scroll content
            scrollContent(delta, true);
          }

          // stop window scroll
          if (e.preventDefault && !releaseScroll) {
            e.preventDefault();
          }
          if (!releaseScroll) {
            e.returnValue = false;
          }
        }

        function scrollContent(y, isWheel, isJump) {
          releaseScroll = false;
          var delta = y;
          var maxTop = me.outerHeight() - bar.outerHeight();

          if (isWheel) {
            // move bar with mouse wheel
            delta = parseInt(bar.css('top')) + y * parseInt(o.wheelStep) / 100 * bar.outerHeight();

            // move bar, make sure it doesn't go out
            delta = Math.min(Math.max(delta, 0), maxTop);

            // if scrolling down, make sure a fractional change to the
            // scroll position isn't rounded away when the scrollbar's CSS is set
            // this flooring of delta would happened automatically when
            // bar.css is set below, but we floor here for clarity
            delta = y > 0 ? Math.ceil(delta) : Math.floor(delta);

            // scroll the scrollbar
            bar.css({ top: delta + 'px' });
          }

          // calculate actual scroll amount
          percentScroll = parseInt(bar.css('top')) / (me.outerHeight() - bar.outerHeight());
          delta = percentScroll * (me[0].scrollHeight - me.outerHeight());

          if (isJump) {
            delta = y;
            var offsetTop = delta / me[0].scrollHeight * me.outerHeight();
            offsetTop = Math.min(Math.max(offsetTop, 0), maxTop);
            bar.css({ top: offsetTop + 'px' });
          }

          // scroll content
          me.scrollTop(delta);

          // fire scrolling event
          me.trigger('slimscrolling', ~~delta);

          // ensure bar is visible
          showBar();

          // trigger hide when scroll is stopped
          hideBar();
        }

        function attachWheel(target) {
          if (window.addEventListener) {
            target.addEventListener('DOMMouseScroll', _onWheel, false);
            target.addEventListener('mousewheel', _onWheel, false);
          } else {
            document.attachEvent("onmousewheel", _onWheel);
          }
        }

        function getBarHeight() {
          // calculate scrollbar height and make sure it is not too small
          barHeight = Math.max(me.outerHeight() / me[0].scrollHeight * me.outerHeight(), minBarHeight);
          bar.css({ height: barHeight + 'px' });

          // hide scrollbar if content is not long enough
          var display = barHeight == me.outerHeight() ? 'none' : 'block';
          bar.css({ display: display });
        }

        function showBar() {
          // recalculate bar height
          getBarHeight();
          clearTimeout(queueHide);

          // when bar reached top or bottom
          if (percentScroll == ~~percentScroll) {
            //release wheel
            releaseScroll = o.allowPageScroll;

            // publish approporiate event
            if (lastScroll != percentScroll) {
              var msg = ~~percentScroll == 0 ? 'top' : 'bottom';
              me.trigger('slimscroll', msg);
            }
          } else {
            releaseScroll = false;
          }
          lastScroll = percentScroll;

          // show only when required
          if (barHeight >= me.outerHeight()) {
            //allow window scroll
            releaseScroll = true;
            return;
          }
          bar.stop(true, true).fadeIn('fast');
          if (o.railVisible) {
            rail.stop(true, true).fadeIn('fast');
          }
        }

        function hideBar() {
          // only hide when options allow it
          if (!o.alwaysVisible) {
            queueHide = setTimeout(function () {
              if (!(o.disableFadeOut && isOverPanel) && !isOverBar && !isDragg) {
                bar.fadeOut('slow');
                rail.fadeOut('slow');
              }
            }, 1000);
          }
        }
      });

      // maintain chainability
      return this;
    }
  });

  $.fn.extend({
    slimscroll: $.fn.slimScroll
  });
})(jQuery);

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * jQuery blockUI plugin
 * Version 2.70.0-2014.11.23
 * Requires jQuery v1.7 or later
 *
 * Examples at: http://malsup.com/jquery/block/
 * Copyright (c) 2007-2013 M. Alsup
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 * Thanks to Amir-Hossein Sobhi for some excellent contributions!
 */

;(function () {
	/*jshint eqeqeq:false curly:false latedef:false */
	"use strict";

	function setup($) {
		$.fn._fadeIn = $.fn.fadeIn;

		var noOp = $.noop || function () {};

		// this bit is to ensure we don't call setExpression when we shouldn't (with extra muscle to handle
		// confusing userAgent strings on Vista)
		var msie = /MSIE/.test(navigator.userAgent);
		var ie6 = /MSIE 6.0/.test(navigator.userAgent) && !/MSIE 8.0/.test(navigator.userAgent);
		var mode = document.documentMode || 0;
		var setExpr = $.isFunction(document.createElement('div').style.setExpression);

		// global $ methods for blocking/unblocking the entire page
		$.blockUI = function (opts) {
			install(window, opts);
		};
		$.unblockUI = function (opts) {
			remove(window, opts);
		};

		// convenience method for quick growl-like notifications  (http://www.google.com/search?q=growl)
		$.growlUI = function (title, message, timeout, onClose) {
			var $m = $('<div class="growlUI"></div>');
			if (title) $m.append('<h1>' + title + '</h1>');
			if (message) $m.append('<h2>' + message + '</h2>');
			if (timeout === undefined) timeout = 3000;

			// Added by konapun: Set timeout to 30 seconds if this growl is moused over, like normal toast notifications
			var callBlock = function callBlock(opts) {
				opts = opts || {};

				$.blockUI({
					message: $m,
					fadeIn: typeof opts.fadeIn !== 'undefined' ? opts.fadeIn : 700,
					fadeOut: typeof opts.fadeOut !== 'undefined' ? opts.fadeOut : 1000,
					timeout: typeof opts.timeout !== 'undefined' ? opts.timeout : timeout,
					centerY: false,
					showOverlay: false,
					onUnblock: onClose,
					css: $.blockUI.defaults.growlCSS
				});
			};

			callBlock();
			var nonmousedOpacity = $m.css('opacity');
			$m.mouseover(function () {
				callBlock({
					fadeIn: 0,
					timeout: 30000
				});

				var displayBlock = $('.blockMsg');
				displayBlock.stop(); // cancel fadeout if it has started
				displayBlock.fadeTo(300, 1); // make it easier to read the message by removing transparency
			}).mouseout(function () {
				$('.blockMsg').fadeOut(1000);
			});
			// End konapun additions
		};

		// plugin method for blocking element content
		$.fn.block = function (opts) {
			if (this[0] === window) {
				$.blockUI(opts);
				return this;
			}
			var fullOpts = $.extend({}, $.blockUI.defaults, opts || {});
			this.each(function () {
				var $el = $(this);
				if (fullOpts.ignoreIfBlocked && $el.data('blockUI.isBlocked')) return;
				$el.unblock({ fadeOut: 0 });
			});

			return this.each(function () {
				if ($.css(this, 'position') == 'static') {
					this.style.position = 'relative';
					$(this).data('blockUI.static', true);
				}
				this.style.zoom = 1; // force 'hasLayout' in ie
				install(this, opts);
			});
		};

		// plugin method for unblocking element content
		$.fn.unblock = function (opts) {
			if (this[0] === window) {
				$.unblockUI(opts);
				return this;
			}
			return this.each(function () {
				remove(this, opts);
			});
		};

		$.blockUI.version = 2.70; // 2nd generation blocking at no extra cost!

		// override these in your code to change the default behavior and style
		$.blockUI.defaults = {
			// message displayed when blocking (use null for no message)
			message: '<h1>Please wait...</h1>',

			title: null, // title string; only used when theme == true
			draggable: true, // only used when theme == true (requires jquery-ui.js to be loaded)

			theme: false, // set to true to use with jQuery UI themes

			// styles for the message when blocking; if you wish to disable
			// these and use an external stylesheet then do this in your code:
			// $.blockUI.defaults.css = {};
			css: {
				padding: 0,
				margin: 0,
				width: '30%',
				top: '40%',
				left: '35%',
				textAlign: 'center',
				color: '#000',
				border: '3px solid #aaa',
				backgroundColor: '#fff',
				cursor: 'wait'
			},

			// minimal style set used when themes are used
			themedCSS: {
				width: '30%',
				top: '40%',
				left: '35%'
			},

			// styles for the overlay
			overlayCSS: {
				backgroundColor: '#000',
				opacity: 0.6,
				cursor: 'wait'
			},

			// style to replace wait cursor before unblocking to correct issue
			// of lingering wait cursor
			cursorReset: 'default',

			// styles applied when using $.growlUI
			growlCSS: {
				width: '350px',
				top: '10px',
				left: '',
				right: '10px',
				border: 'none',
				padding: '5px',
				opacity: 0.6,
				cursor: 'default',
				color: '#fff',
				backgroundColor: '#000',
				'-webkit-border-radius': '10px',
				'-moz-border-radius': '10px',
				'border-radius': '10px'
			},

			// IE issues: 'about:blank' fails on HTTPS and javascript:false is s-l-o-w
			// (hat tip to Jorge H. N. de Vasconcelos)
			/*jshint scripturl:true */
			iframeSrc: /^https/i.test(window.location.href || '') ? 'javascript:false' : 'about:blank',

			// force usage of iframe in non-IE browsers (handy for blocking applets)
			forceIframe: false,

			// z-index for the blocking overlay
			baseZ: 1000,

			// set these to true to have the message automatically centered
			centerX: true, // <-- only effects element blocking (page block controlled via css above)
			centerY: true,

			// allow body element to be stetched in ie6; this makes blocking look better
			// on "short" pages.  disable if you wish to prevent changes to the body height
			allowBodyStretch: true,

			// enable if you want key and mouse events to be disabled for content that is blocked
			bindEvents: true,

			// be default blockUI will supress tab navigation from leaving blocking content
			// (if bindEvents is true)
			constrainTabKey: true,

			// fadeIn time in millis; set to 0 to disable fadeIn on block
			fadeIn: 200,

			// fadeOut time in millis; set to 0 to disable fadeOut on unblock
			fadeOut: 400,

			// time in millis to wait before auto-unblocking; set to 0 to disable auto-unblock
			timeout: 0,

			// disable if you don't want to show the overlay
			showOverlay: true,

			// if true, focus will be placed in the first available input field when
			// page blocking
			focusInput: true,

			// elements that can receive focus
			focusableElements: ':input:enabled:visible',

			// suppresses the use of overlay styles on FF/Linux (due to performance issues with opacity)
			// no longer needed in 2012
			// applyPlatformOpacityRules: true,

			// callback method invoked when fadeIn has completed and blocking message is visible
			onBlock: null,

			// callback method invoked when unblocking has completed; the callback is
			// passed the element that has been unblocked (which is the window object for page
			// blocks) and the options that were passed to the unblock call:
			//	onUnblock(element, options)
			onUnblock: null,

			// callback method invoked when the overlay area is clicked.
			// setting this will turn the cursor to a pointer, otherwise cursor defined in overlayCss will be used.
			onOverlayClick: null,

			// don't ask; if you really must know: http://groups.google.com/group/jquery-en/browse_thread/thread/36640a8730503595/2f6a79a77a78e493#2f6a79a77a78e493
			quirksmodeOffsetHack: 4,

			// class name of the message block
			blockMsgClass: 'blockMsg',

			// if it is already blocked, then ignore it (don't unblock and reblock)
			ignoreIfBlocked: false
		};

		// private data and functions follow...

		var pageBlock = null;
		var pageBlockEls = [];

		function install(el, opts) {
			var css, themedCSS;
			var full = el == window;
			var msg = opts && opts.message !== undefined ? opts.message : undefined;
			opts = $.extend({}, $.blockUI.defaults, opts || {});

			if (opts.ignoreIfBlocked && $(el).data('blockUI.isBlocked')) return;

			opts.overlayCSS = $.extend({}, $.blockUI.defaults.overlayCSS, opts.overlayCSS || {});
			css = $.extend({}, $.blockUI.defaults.css, opts.css || {});
			if (opts.onOverlayClick) opts.overlayCSS.cursor = 'pointer';

			themedCSS = $.extend({}, $.blockUI.defaults.themedCSS, opts.themedCSS || {});
			msg = msg === undefined ? opts.message : msg;

			// remove the current block (if there is one)
			if (full && pageBlock) remove(window, { fadeOut: 0 });

			// if an existing element is being used as the blocking content then we capture
			// its current place in the DOM (and current display style) so we can restore
			// it when we unblock
			if (msg && typeof msg != 'string' && (msg.parentNode || msg.jquery)) {
				var node = msg.jquery ? msg[0] : msg;
				var data = {};
				$(el).data('blockUI.history', data);
				data.el = node;
				data.parent = node.parentNode;
				data.display = node.style.display;
				data.position = node.style.position;
				if (data.parent) data.parent.removeChild(node);
			}

			$(el).data('blockUI.onUnblock', opts.onUnblock);
			var z = opts.baseZ;

			// blockUI uses 3 layers for blocking, for simplicity they are all used on every platform;
			// layer1 is the iframe layer which is used to supress bleed through of underlying content
			// layer2 is the overlay layer which has opacity and a wait cursor (by default)
			// layer3 is the message content that is displayed while blocking
			var lyr1, lyr2, lyr3, s;
			if (msie || opts.forceIframe) lyr1 = $('<iframe class="blockUI" style="z-index:' + z++ + ';display:none;border:none;margin:0;padding:0;position:absolute;width:100%;height:100%;top:0;left:0" src="' + opts.iframeSrc + '"></iframe>');else lyr1 = $('<div class="blockUI" style="display:none"></div>');

			if (opts.theme) lyr2 = $('<div class="blockUI blockOverlay ui-widget-overlay" style="z-index:' + z++ + ';display:none"></div>');else lyr2 = $('<div class="blockUI blockOverlay" style="z-index:' + z++ + ';display:none;border:none;margin:0;padding:0;width:100%;height:100%;top:0;left:0"></div>');

			if (opts.theme && full) {
				s = '<div class="blockUI ' + opts.blockMsgClass + ' blockPage ui-dialog ui-widget ui-corner-all" style="z-index:' + (z + 10) + ';display:none;position:fixed">';
				if (opts.title) {
					s += '<div class="ui-widget-header ui-dialog-titlebar ui-corner-all blockTitle">' + (opts.title || '&nbsp;') + '</div>';
				}
				s += '<div class="ui-widget-content ui-dialog-content"></div>';
				s += '</div>';
			} else if (opts.theme) {
				s = '<div class="blockUI ' + opts.blockMsgClass + ' blockElement ui-dialog ui-widget ui-corner-all" style="z-index:' + (z + 10) + ';display:none;position:absolute">';
				if (opts.title) {
					s += '<div class="ui-widget-header ui-dialog-titlebar ui-corner-all blockTitle">' + (opts.title || '&nbsp;') + '</div>';
				}
				s += '<div class="ui-widget-content ui-dialog-content"></div>';
				s += '</div>';
			} else if (full) {
				s = '<div class="blockUI ' + opts.blockMsgClass + ' blockPage" style="z-index:' + (z + 10) + ';display:none;position:fixed"></div>';
			} else {
				s = '<div class="blockUI ' + opts.blockMsgClass + ' blockElement" style="z-index:' + (z + 10) + ';display:none;position:absolute"></div>';
			}
			lyr3 = $(s);

			// if we have a message, style it
			if (msg) {
				if (opts.theme) {
					lyr3.css(themedCSS);
					lyr3.addClass('ui-widget-content');
				} else lyr3.css(css);
			}

			// style the overlay
			if (!opts.theme /*&& (!opts.applyPlatformOpacityRules)*/) lyr2.css(opts.overlayCSS);
			lyr2.css('position', full ? 'fixed' : 'absolute');

			// make iframe layer transparent in IE
			if (msie || opts.forceIframe) lyr1.css('opacity', 0.0);

			//$([lyr1[0],lyr2[0],lyr3[0]]).appendTo(full ? 'body' : el);
			var layers = [lyr1, lyr2, lyr3],
			    $par = full ? $('body') : $(el);
			$.each(layers, function () {
				this.appendTo($par);
			});

			if (opts.theme && opts.draggable && $.fn.draggable) {
				lyr3.draggable({
					handle: '.ui-dialog-titlebar',
					cancel: 'li'
				});
			}

			// ie7 must use absolute positioning in quirks mode and to account for activex issues (when scrolling)
			var expr = setExpr && (!$.support.boxModel || $('object,embed', full ? null : el).length > 0);
			if (ie6 || expr) {
				// give body 100% height
				if (full && opts.allowBodyStretch && $.support.boxModel) $('html,body').css('height', '100%');

				// fix ie6 issue when blocked element has a border width
				if ((ie6 || !$.support.boxModel) && !full) {
					var t = sz(el, 'borderTopWidth'),
					    l = sz(el, 'borderLeftWidth');
					var fixT = t ? '(0 - ' + t + ')' : 0;
					var fixL = l ? '(0 - ' + l + ')' : 0;
				}

				// simulate fixed position
				$.each(layers, function (i, o) {
					var s = o[0].style;
					s.position = 'absolute';
					if (i < 2) {
						if (full) s.setExpression('height', 'Math.max(document.body.scrollHeight, document.body.offsetHeight) - (jQuery.support.boxModel?0:' + opts.quirksmodeOffsetHack + ') + "px"');else s.setExpression('height', 'this.parentNode.offsetHeight + "px"');
						if (full) s.setExpression('width', 'jQuery.support.boxModel && document.documentElement.clientWidth || document.body.clientWidth + "px"');else s.setExpression('width', 'this.parentNode.offsetWidth + "px"');
						if (fixL) s.setExpression('left', fixL);
						if (fixT) s.setExpression('top', fixT);
					} else if (opts.centerY) {
						if (full) s.setExpression('top', '(document.documentElement.clientHeight || document.body.clientHeight) / 2 - (this.offsetHeight / 2) + (blah = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + "px"');
						s.marginTop = 0;
					} else if (!opts.centerY && full) {
						var top = opts.css && opts.css.top ? parseInt(opts.css.top, 10) : 0;
						var expression = '((document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + ' + top + ') + "px"';
						s.setExpression('top', expression);
					}
				});
			}

			// show the message
			if (msg) {
				if (opts.theme) lyr3.find('.ui-widget-content').append(msg);else lyr3.append(msg);
				if (msg.jquery || msg.nodeType) $(msg).show();
			}

			if ((msie || opts.forceIframe) && opts.showOverlay) lyr1.show(); // opacity is zero
			if (opts.fadeIn) {
				var cb = opts.onBlock ? opts.onBlock : noOp;
				var cb1 = opts.showOverlay && !msg ? cb : noOp;
				var cb2 = msg ? cb : noOp;
				if (opts.showOverlay) lyr2._fadeIn(opts.fadeIn, cb1);
				if (msg) lyr3._fadeIn(opts.fadeIn, cb2);
			} else {
				if (opts.showOverlay) lyr2.show();
				if (msg) lyr3.show();
				if (opts.onBlock) opts.onBlock.bind(lyr3)();
			}

			// bind key and mouse events
			bind(1, el, opts);

			if (full) {
				pageBlock = lyr3[0];
				pageBlockEls = $(opts.focusableElements, pageBlock);
				if (opts.focusInput) setTimeout(focus, 20);
			} else center(lyr3[0], opts.centerX, opts.centerY);

			if (opts.timeout) {
				// auto-unblock
				var to = setTimeout(function () {
					if (full) $.unblockUI(opts);else $(el).unblock(opts);
				}, opts.timeout);
				$(el).data('blockUI.timeout', to);
			}
		}

		// remove the block
		function remove(el, opts) {
			var count;
			var full = el == window;
			var $el = $(el);
			var data = $el.data('blockUI.history');
			var to = $el.data('blockUI.timeout');
			if (to) {
				clearTimeout(to);
				$el.removeData('blockUI.timeout');
			}
			opts = $.extend({}, $.blockUI.defaults, opts || {});
			bind(0, el, opts); // unbind events

			if (opts.onUnblock === null) {
				opts.onUnblock = $el.data('blockUI.onUnblock');
				$el.removeData('blockUI.onUnblock');
			}

			var els;
			if (full) // crazy selector to handle odd field errors in ie6/7
				els = $('body').children().filter('.blockUI').add('body > .blockUI');else els = $el.find('>.blockUI');

			// fix cursor issue
			if (opts.cursorReset) {
				if (els.length > 1) els[1].style.cursor = opts.cursorReset;
				if (els.length > 2) els[2].style.cursor = opts.cursorReset;
			}

			if (full) pageBlock = pageBlockEls = null;

			if (opts.fadeOut) {
				count = els.length;
				els.stop().fadeOut(opts.fadeOut, function () {
					if (--count === 0) reset(els, data, opts, el);
				});
			} else reset(els, data, opts, el);
		}

		// move blocking element back into the DOM where it started
		function reset(els, data, opts, el) {
			var $el = $(el);
			if ($el.data('blockUI.isBlocked')) return;

			els.each(function (i, o) {
				// remove via DOM calls so we don't lose event handlers
				if (this.parentNode) this.parentNode.removeChild(this);
			});

			if (data && data.el) {
				data.el.style.display = data.display;
				data.el.style.position = data.position;
				data.el.style.cursor = 'default'; // #59
				if (data.parent) data.parent.appendChild(data.el);
				$el.removeData('blockUI.history');
			}

			if ($el.data('blockUI.static')) {
				$el.css('position', 'static'); // #22
			}

			if (typeof opts.onUnblock == 'function') opts.onUnblock(el, opts);

			// fix issue in Safari 6 where block artifacts remain until reflow
			var body = $(document.body),
			    w = body.width(),
			    cssW = body[0].style.width;
			body.width(w - 1).width(w);
			body[0].style.width = cssW;
		}

		// bind/unbind the handler
		function bind(b, el, opts) {
			var full = el == window,
			    $el = $(el);

			// don't bother unbinding if there is nothing to unbind
			if (!b && (full && !pageBlock || !full && !$el.data('blockUI.isBlocked'))) return;

			$el.data('blockUI.isBlocked', b);

			// don't bind events when overlay is not in use or if bindEvents is false
			if (!full || !opts.bindEvents || b && !opts.showOverlay) return;

			// bind anchors and inputs for mouse and key events
			var events = 'mousedown mouseup keydown keypress keyup touchstart touchend touchmove';
			if (b) $(document).bind(events, opts, handler);else $(document).unbind(events, handler);

			// former impl...
			//		var $e = $('a,:input');
			//		b ? $e.bind(events, opts, handler) : $e.unbind(events, handler);
		}

		// event handler to suppress keyboard/mouse events when blocking
		function handler(e) {
			// allow tab navigation (conditionally)
			if (e.type === 'keydown' && e.keyCode && e.keyCode == 9) {
				if (pageBlock && e.data.constrainTabKey) {
					var els = pageBlockEls;
					var fwd = !e.shiftKey && e.target === els[els.length - 1];
					var back = e.shiftKey && e.target === els[0];
					if (fwd || back) {
						setTimeout(function () {
							focus(back);
						}, 10);
						return false;
					}
				}
			}
			var opts = e.data;
			var target = $(e.target);
			if (target.hasClass('blockOverlay') && opts.onOverlayClick) opts.onOverlayClick(e);

			// allow events within the message content
			if (target.parents('div.' + opts.blockMsgClass).length > 0) return true;

			// allow events for content that is not being blocked
			return target.parents().children().filter('div.blockUI').length === 0;
		}

		function focus(back) {
			if (!pageBlockEls) return;
			var e = pageBlockEls[back === true ? pageBlockEls.length - 1 : 0];
			if (e) e.focus();
		}

		function center(el, x, y) {
			var p = el.parentNode,
			    s = el.style;
			var l = (p.offsetWidth - el.offsetWidth) / 2 - sz(p, 'borderLeftWidth');
			var t = (p.offsetHeight - el.offsetHeight) / 2 - sz(p, 'borderTopWidth');
			if (x) s.left = l > 0 ? l + 'px' : '0';
			if (y) s.top = t > 0 ? t + 'px' : '0';
		}

		function sz(el, p) {
			return parseInt($.css(el, p), 10) || 0;
		}
	}

	/*global define:true */
	if ("function" === 'function' && __webpack_require__(4) && __webpack_require__(4).jQuery) {
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(8)], __WEBPACK_AMD_DEFINE_FACTORY__ = (setup),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {
		setup(jQuery);
	}
})();

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

;(function (window) {
    'use strict';

    var Waves = Waves || {};
    var $$ = document.querySelectorAll.bind(document);

    // Find exact position of element
    function isWindow(obj) {
        return obj !== null && obj === obj.window;
    }

    function getWindow(elem) {
        return isWindow(elem) ? elem : elem.nodeType === 9 && elem.defaultView;
    }

    function offset(elem) {
        var docElem,
            win,
            box = { top: 0, left: 0 },
            doc = elem && elem.ownerDocument;

        docElem = doc.documentElement;

        if (_typeof(elem.getBoundingClientRect) !== ( true ? 'undefined' : _typeof(undefined))) {
            box = elem.getBoundingClientRect();
        }
        win = getWindow(doc);
        return {
            top: box.top + win.pageYOffset - docElem.clientTop,
            left: box.left + win.pageXOffset - docElem.clientLeft
        };
    }

    function convertStyle(obj) {
        var style = '';

        for (var a in obj) {
            if (obj.hasOwnProperty(a)) {
                style += a + ':' + obj[a] + ';';
            }
        }

        return style;
    }

    var Effect = {

        // Effect delay
        duration: 750,

        show: function show(e, element) {

            // Disable right click
            if (e.button === 2) {
                return false;
            }

            var el = element || this;

            // Create ripple
            var ripple = document.createElement('div');
            ripple.className = 'waves-ripple';
            el.appendChild(ripple);

            // Get click coordinate and element witdh
            var pos = offset(el);
            var relativeY = e.pageY - pos.top;
            var relativeX = e.pageX - pos.left;
            var scale = 'scale(' + el.clientWidth / 100 * 10 + ')';

            // Support for touch devices
            if ('touches' in e) {
                relativeY = e.touches[0].pageY - pos.top;
                relativeX = e.touches[0].pageX - pos.left;
            }

            // Attach data to element
            ripple.setAttribute('data-hold', Date.now());
            ripple.setAttribute('data-scale', scale);
            ripple.setAttribute('data-x', relativeX);
            ripple.setAttribute('data-y', relativeY);

            // Set ripple position
            var rippleStyle = {
                'top': relativeY + 'px',
                'left': relativeX + 'px'
            };

            ripple.className = ripple.className + ' waves-notransition';
            ripple.setAttribute('style', convertStyle(rippleStyle));
            ripple.className = ripple.className.replace('waves-notransition', '');

            // Scale the ripple
            rippleStyle['-webkit-transform'] = scale;
            rippleStyle['-moz-transform'] = scale;
            rippleStyle['-ms-transform'] = scale;
            rippleStyle['-o-transform'] = scale;
            rippleStyle.transform = scale;
            rippleStyle.opacity = '1';

            rippleStyle['-webkit-transition-duration'] = Effect.duration + 'ms';
            rippleStyle['-moz-transition-duration'] = Effect.duration + 'ms';
            rippleStyle['-o-transition-duration'] = Effect.duration + 'ms';
            rippleStyle['transition-duration'] = Effect.duration + 'ms';

            rippleStyle['-webkit-transition-timing-function'] = 'cubic-bezier(0.250, 0.460, 0.450, 0.940)';
            rippleStyle['-moz-transition-timing-function'] = 'cubic-bezier(0.250, 0.460, 0.450, 0.940)';
            rippleStyle['-o-transition-timing-function'] = 'cubic-bezier(0.250, 0.460, 0.450, 0.940)';
            rippleStyle['transition-timing-function'] = 'cubic-bezier(0.250, 0.460, 0.450, 0.940)';

            ripple.setAttribute('style', convertStyle(rippleStyle));
        },

        hide: function hide(e) {
            TouchHandler.touchup(e);

            var el = this;
            var width = el.clientWidth * 1.4;

            // Get first ripple
            var ripple = null;
            var ripples = el.getElementsByClassName('waves-ripple');
            if (ripples.length > 0) {
                ripple = ripples[ripples.length - 1];
            } else {
                return false;
            }

            var relativeX = ripple.getAttribute('data-x');
            var relativeY = ripple.getAttribute('data-y');
            var scale = ripple.getAttribute('data-scale');

            // Get delay beetween mousedown and mouse leave
            var diff = Date.now() - Number(ripple.getAttribute('data-hold'));
            var delay = 350 - diff;

            if (delay < 0) {
                delay = 0;
            }

            // Fade out ripple after delay
            setTimeout(function () {
                var style = {
                    'top': relativeY + 'px',
                    'left': relativeX + 'px',
                    'opacity': '0',

                    // Duration
                    '-webkit-transition-duration': Effect.duration + 'ms',
                    '-moz-transition-duration': Effect.duration + 'ms',
                    '-o-transition-duration': Effect.duration + 'ms',
                    'transition-duration': Effect.duration + 'ms',
                    '-webkit-transform': scale,
                    '-moz-transform': scale,
                    '-ms-transform': scale,
                    '-o-transform': scale,
                    'transform': scale
                };

                ripple.setAttribute('style', convertStyle(style));

                setTimeout(function () {
                    try {
                        el.removeChild(ripple);
                    } catch (e) {
                        return false;
                    }
                }, Effect.duration);
            }, delay);
        },

        // Little hack to make <input> can perform waves effect
        wrapInput: function wrapInput(elements) {
            for (var a = 0; a < elements.length; a++) {
                var el = elements[a];

                if (el.tagName.toLowerCase() === 'input') {
                    var parent = el.parentNode;

                    // If input already have parent just pass through
                    if (parent.tagName.toLowerCase() === 'i' && parent.className.indexOf('waves-effect') !== -1) {
                        continue;
                    }

                    // Put element class and style to the specified parent
                    var wrapper = document.createElement('i');
                    wrapper.className = el.className + ' waves-input-wrapper';

                    var elementStyle = el.getAttribute('style');

                    if (!elementStyle) {
                        elementStyle = '';
                    }

                    wrapper.setAttribute('style', elementStyle);

                    el.className = 'waves-button-input';
                    el.removeAttribute('style');

                    // Put element as child
                    parent.replaceChild(wrapper, el);
                    wrapper.appendChild(el);
                }
            }
        }
    };

    /**
     * Disable mousedown event for 500ms during and after touch
     */
    var TouchHandler = {
        /* uses an integer rather than bool so there's no issues with
         * needing to clear timeouts if another touch event occurred
         * within the 500ms. Cannot mouseup between touchstart and
         * touchend, nor in the 500ms after touchend. */
        touches: 0,
        allowEvent: function allowEvent(e) {
            var allow = true;

            if (e.type === 'touchstart') {
                TouchHandler.touches += 1; //push
            } else if (e.type === 'touchend' || e.type === 'touchcancel') {
                setTimeout(function () {
                    if (TouchHandler.touches > 0) {
                        TouchHandler.touches -= 1; //pop after 500ms
                    }
                }, 500);
            } else if (e.type === 'mousedown' && TouchHandler.touches > 0) {
                allow = false;
            }

            return allow;
        },
        touchup: function touchup(e) {
            TouchHandler.allowEvent(e);
        }
    };

    /**
     * Delegated click handler for .waves-effect element.
     * returns null when .waves-effect element not in "click tree"
     */
    function getWavesEffectElement(e) {
        if (TouchHandler.allowEvent(e) === false) {
            return null;
        }

        var element = null;
        var target = e.target || e.srcElement;

        while (target.parentElement !== null) {
            if (!(target instanceof SVGElement) && target.className.indexOf('waves-effect') !== -1) {
                element = target;
                break;
            } else if (target.classList.contains('waves-effect')) {
                element = target;
                break;
            }
            target = target.parentElement;
        }

        return element;
    }

    /**
     * Bubble the click and show effect if .waves-effect elem was found
     */
    function showEffect(e) {
        var element = getWavesEffectElement(e);

        if (element !== null) {
            Effect.show(e, element);

            if ('ontouchstart' in window) {
                element.addEventListener('touchend', Effect.hide, false);
                element.addEventListener('touchcancel', Effect.hide, false);
            }

            element.addEventListener('mouseup', Effect.hide, false);
            element.addEventListener('mouseleave', Effect.hide, false);
        }
    }

    Waves.displayEffect = function (options) {
        options = options || {};

        if ('duration' in options) {
            Effect.duration = options.duration;
        }

        //Wrap input inside <i> tag
        Effect.wrapInput($$('.waves-effect'));

        if ('ontouchstart' in window) {
            document.body.addEventListener('touchstart', showEffect, false);
        }

        document.body.addEventListener('mousedown', showEffect, false);
    };

    /**
     * Attach Waves to an input element (or any element which doesn't
     * bubble mouseup/mousedown events).
     *   Intended to be used with dynamically loaded forms/inputs, or
     * where the user doesn't want a delegated click handler.
     */
    Waves.attach = function (element) {
        //FUTURE: automatically add waves classes and allow users
        // to specify them with an options param? Eg. light/classic/button
        if (element.tagName.toLowerCase() === 'input') {
            Effect.wrapInput([element]);
            element = element.parentElement;
        }

        if ('ontouchstart' in window) {
            element.addEventListener('touchstart', showEffect, false);
        }

        element.addEventListener('mousedown', showEffect, false);
    };

    window.Waves = Waves;

    document.addEventListener('DOMContentLoaded', function () {
        Waves.displayEffect();
    }, false);
})(window);

/*
Tabs
*/
/*! VelocityJS.org (1.2.2). (C) 2014 Julian Shapiro. MIT @license: en.wikipedia.org/wiki/MIT_License */
/*! VelocityJS.org jQuery Shim (1.0.1). (C) 2014 The jQuery Foundation. MIT @license: en.wikipedia.org/wiki/MIT_License. */
!function (e) {
    function t(e) {
        var t = e.length,
            r = $.type(e);return "function" === r || $.isWindow(e) ? !1 : 1 === e.nodeType && t ? !0 : "array" === r || 0 === t || "number" == typeof t && t > 0 && t - 1 in e;
    }if (!e.jQuery) {
        var $ = function $(e, t) {
            return new $.fn.init(e, t);
        };$.isWindow = function (e) {
            return null != e && e == e.window;
        }, $.type = function (e) {
            return null == e ? e + "" : "object" == (typeof e === 'undefined' ? 'undefined' : _typeof(e)) || "function" == typeof e ? a[o.call(e)] || "object" : typeof e === 'undefined' ? 'undefined' : _typeof(e);
        }, $.isArray = Array.isArray || function (e) {
            return "array" === $.type(e);
        }, $.isPlainObject = function (e) {
            var t;if (!e || "object" !== $.type(e) || e.nodeType || $.isWindow(e)) return !1;try {
                if (e.constructor && !n.call(e, "constructor") && !n.call(e.constructor.prototype, "isPrototypeOf")) return !1;
            } catch (r) {
                return !1;
            }for (t in e) {}return void 0 === t || n.call(e, t);
        }, $.each = function (e, r, a) {
            var n,
                o = 0,
                i = e.length,
                s = t(e);if (a) {
                if (s) for (; i > o && (n = r.apply(e[o], a), n !== !1); o++) {} else for (o in e) {
                    if (n = r.apply(e[o], a), n === !1) break;
                }
            } else if (s) for (; i > o && (n = r.call(e[o], o, e[o]), n !== !1); o++) {} else for (o in e) {
                if (n = r.call(e[o], o, e[o]), n === !1) break;
            }return e;
        }, $.data = function (e, t, a) {
            if (void 0 === a) {
                var n = e[$.expando],
                    o = n && r[n];if (void 0 === t) return o;if (o && t in o) return o[t];
            } else if (void 0 !== t) {
                var n = e[$.expando] || (e[$.expando] = ++$.uuid);return r[n] = r[n] || {}, r[n][t] = a, a;
            }
        }, $.removeData = function (e, t) {
            var a = e[$.expando],
                n = a && r[a];n && $.each(t, function (e, t) {
                delete n[t];
            });
        }, $.extend = function () {
            var e,
                t,
                r,
                a,
                n,
                o,
                i = arguments[0] || {},
                s = 1,
                l = arguments.length,
                u = !1;for ("boolean" == typeof i && (u = i, i = arguments[s] || {}, s++), "object" != (typeof i === 'undefined' ? 'undefined' : _typeof(i)) && "function" !== $.type(i) && (i = {}), s === l && (i = this, s--); l > s; s++) {
                if (null != (n = arguments[s])) for (a in n) {
                    e = i[a], r = n[a], i !== r && (u && r && ($.isPlainObject(r) || (t = $.isArray(r))) ? (t ? (t = !1, o = e && $.isArray(e) ? e : []) : o = e && $.isPlainObject(e) ? e : {}, i[a] = $.extend(u, o, r)) : void 0 !== r && (i[a] = r));
                }
            }return i;
        }, $.queue = function (e, r, a) {
            function n(e, r) {
                var a = r || [];return null != e && (t(Object(e)) ? !function (e, t) {
                    for (var r = +t.length, a = 0, n = e.length; r > a;) {
                        e[n++] = t[a++];
                    }if (r !== r) for (; void 0 !== t[a];) {
                        e[n++] = t[a++];
                    }return e.length = n, e;
                }(a, "string" == typeof e ? [e] : e) : [].push.call(a, e)), a;
            }if (e) {
                r = (r || "fx") + "queue";var o = $.data(e, r);return a ? (!o || $.isArray(a) ? o = $.data(e, r, n(a)) : o.push(a), o) : o || [];
            }
        }, $.dequeue = function (e, t) {
            $.each(e.nodeType ? [e] : e, function (e, r) {
                t = t || "fx";var a = $.queue(r, t),
                    n = a.shift();"inprogress" === n && (n = a.shift()), n && ("fx" === t && a.unshift("inprogress"), n.call(r, function () {
                    $.dequeue(r, t);
                }));
            });
        }, $.fn = $.prototype = { init: function init(e) {
                if (e.nodeType) return this[0] = e, this;throw new Error("Not a DOM node.");
            }, offset: function offset() {
                var t = this[0].getBoundingClientRect ? this[0].getBoundingClientRect() : { top: 0, left: 0 };return { top: t.top + (e.pageYOffset || document.scrollTop || 0) - (document.clientTop || 0), left: t.left + (e.pageXOffset || document.scrollLeft || 0) - (document.clientLeft || 0) };
            }, position: function position() {
                function e() {
                    for (var e = this.offsetParent || document; e && "html" === !e.nodeType.toLowerCase && "static" === e.style.position;) {
                        e = e.offsetParent;
                    }return e || document;
                }var t = this[0],
                    e = e.apply(t),
                    r = this.offset(),
                    a = /^(?:body|html)$/i.test(e.nodeName) ? { top: 0, left: 0 } : $(e).offset();return r.top -= parseFloat(t.style.marginTop) || 0, r.left -= parseFloat(t.style.marginLeft) || 0, e.style && (a.top += parseFloat(e.style.borderTopWidth) || 0, a.left += parseFloat(e.style.borderLeftWidth) || 0), { top: r.top - a.top, left: r.left - a.left };
            } };var r = {};$.expando = "velocity" + new Date().getTime(), $.uuid = 0;for (var a = {}, n = a.hasOwnProperty, o = a.toString, i = "Boolean Number String Function Array Date RegExp Object Error".split(" "), s = 0; s < i.length; s++) {
            a["[object " + i[s] + "]"] = i[s].toLowerCase();
        }$.fn.init.prototype = $.fn, e.Velocity = { Utilities: $ };
    }
}(window), function (e) {
    "object" == ( false ? 'undefined' : _typeof(module)) && "object" == _typeof(module.exports) ? module.exports = e() :  true ? !(__WEBPACK_AMD_DEFINE_FACTORY__ = (e),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : e();
}(function () {
    return function (e, t, r, a) {
        function n(e) {
            for (var t = -1, r = e ? e.length : 0, a = []; ++t < r;) {
                var n = e[t];n && a.push(n);
            }return a;
        }function o(e) {
            return g.isWrapped(e) ? e = [].slice.call(e) : g.isNode(e) && (e = [e]), e;
        }function i(e) {
            var t = $.data(e, "velocity");return null === t ? a : t;
        }function s(e) {
            return function (t) {
                return Math.round(t * e) * (1 / e);
            };
        }function l(e, r, a, n) {
            function o(e, t) {
                return 1 - 3 * t + 3 * e;
            }function i(e, t) {
                return 3 * t - 6 * e;
            }function s(e) {
                return 3 * e;
            }function l(e, t, r) {
                return ((o(t, r) * e + i(t, r)) * e + s(t)) * e;
            }function u(e, t, r) {
                return 3 * o(t, r) * e * e + 2 * i(t, r) * e + s(t);
            }function c(t, r) {
                for (var n = 0; m > n; ++n) {
                    var o = u(r, e, a);if (0 === o) return r;var i = l(r, e, a) - t;r -= i / o;
                }return r;
            }function p() {
                for (var t = 0; b > t; ++t) {
                    w[t] = l(t * x, e, a);
                }
            }function f(t, r, n) {
                var o,
                    i,
                    s = 0;do {
                    i = r + (n - r) / 2, o = l(i, e, a) - t, o > 0 ? n = i : r = i;
                } while (Math.abs(o) > h && ++s < v);return i;
            }function d(t) {
                for (var r = 0, n = 1, o = b - 1; n != o && w[n] <= t; ++n) {
                    r += x;
                }--n;var i = (t - w[n]) / (w[n + 1] - w[n]),
                    s = r + i * x,
                    l = u(s, e, a);return l >= y ? c(t, s) : 0 == l ? s : f(t, r, r + x);
            }function g() {
                V = !0, (e != r || a != n) && p();
            }var m = 4,
                y = .001,
                h = 1e-7,
                v = 10,
                b = 11,
                x = 1 / (b - 1),
                S = "Float32Array" in t;if (4 !== arguments.length) return !1;for (var P = 0; 4 > P; ++P) {
                if ("number" != typeof arguments[P] || isNaN(arguments[P]) || !isFinite(arguments[P])) return !1;
            }e = Math.min(e, 1), a = Math.min(a, 1), e = Math.max(e, 0), a = Math.max(a, 0);var w = S ? new Float32Array(b) : new Array(b),
                V = !1,
                C = function C(t) {
                return V || g(), e === r && a === n ? t : 0 === t ? 0 : 1 === t ? 1 : l(d(t), r, n);
            };C.getControlPoints = function () {
                return [{ x: e, y: r }, { x: a, y: n }];
            };var T = "generateBezier(" + [e, r, a, n] + ")";return C.toString = function () {
                return T;
            }, C;
        }function u(e, t) {
            var r = e;return g.isString(e) ? v.Easings[e] || (r = !1) : r = g.isArray(e) && 1 === e.length ? s.apply(null, e) : g.isArray(e) && 2 === e.length ? b.apply(null, e.concat([t])) : g.isArray(e) && 4 === e.length ? l.apply(null, e) : !1, r === !1 && (r = v.Easings[v.defaults.easing] ? v.defaults.easing : h), r;
        }function c(e) {
            if (e) {
                var t = new Date().getTime(),
                    r = v.State.calls.length;r > 1e4 && (v.State.calls = n(v.State.calls));for (var o = 0; r > o; o++) {
                    if (v.State.calls[o]) {
                        var s = v.State.calls[o],
                            l = s[0],
                            u = s[2],
                            f = s[3],
                            d = !!f,
                            m = null;f || (f = v.State.calls[o][3] = t - 16);for (var y = Math.min((t - f) / u.duration, 1), h = 0, b = l.length; b > h; h++) {
                            var S = l[h],
                                w = S.element;if (i(w)) {
                                var V = !1;if (u.display !== a && null !== u.display && "none" !== u.display) {
                                    if ("flex" === u.display) {
                                        var C = ["-webkit-box", "-moz-box", "-ms-flexbox", "-webkit-flex"];$.each(C, function (e, t) {
                                            x.setPropertyValue(w, "display", t);
                                        });
                                    }x.setPropertyValue(w, "display", u.display);
                                }u.visibility !== a && "hidden" !== u.visibility && x.setPropertyValue(w, "visibility", u.visibility);for (var T in S) {
                                    if ("element" !== T) {
                                        var k = S[T],
                                            A,
                                            F = g.isString(k.easing) ? v.Easings[k.easing] : k.easing;if (1 === y) A = k.endValue;else {
                                            var E = k.endValue - k.startValue;if (A = k.startValue + E * F(y, u, E), !d && A === k.currentValue) continue;
                                        }if (k.currentValue = A, "tween" === T) m = A;else {
                                            if (x.Hooks.registered[T]) {
                                                var j = x.Hooks.getRoot(T),
                                                    H = i(w).rootPropertyValueCache[j];H && (k.rootPropertyValue = H);
                                            }var N = x.setPropertyValue(w, T, k.currentValue + (0 === parseFloat(A) ? "" : k.unitType), k.rootPropertyValue, k.scrollData);x.Hooks.registered[T] && (i(w).rootPropertyValueCache[j] = x.Normalizations.registered[j] ? x.Normalizations.registered[j]("extract", null, N[1]) : N[1]), "transform" === N[0] && (V = !0);
                                        }
                                    }
                                }u.mobileHA && i(w).transformCache.translate3d === a && (i(w).transformCache.translate3d = "(0px, 0px, 0px)", V = !0), V && x.flushTransformCache(w);
                            }
                        }u.display !== a && "none" !== u.display && (v.State.calls[o][2].display = !1), u.visibility !== a && "hidden" !== u.visibility && (v.State.calls[o][2].visibility = !1), u.progress && u.progress.call(s[1], s[1], y, Math.max(0, f + u.duration - t), f, m), 1 === y && p(o);
                    }
                }
            }v.State.isTicking && P(c);
        }function p(e, t) {
            if (!v.State.calls[e]) return !1;for (var r = v.State.calls[e][0], n = v.State.calls[e][1], o = v.State.calls[e][2], s = v.State.calls[e][4], l = !1, u = 0, c = r.length; c > u; u++) {
                var p = r[u].element;if (t || o.loop || ("none" === o.display && x.setPropertyValue(p, "display", o.display), "hidden" === o.visibility && x.setPropertyValue(p, "visibility", o.visibility)), o.loop !== !0 && ($.queue(p)[1] === a || !/\.velocityQueueEntryFlag/i.test($.queue(p)[1])) && i(p)) {
                    i(p).isAnimating = !1, i(p).rootPropertyValueCache = {};var f = !1;$.each(x.Lists.transforms3D, function (e, t) {
                        var r = /^scale/.test(t) ? 1 : 0,
                            n = i(p).transformCache[t];i(p).transformCache[t] !== a && new RegExp("^\\(" + r + "[^.]").test(n) && (f = !0, delete i(p).transformCache[t]);
                    }), o.mobileHA && (f = !0, delete i(p).transformCache.translate3d), f && x.flushTransformCache(p), x.Values.removeClass(p, "velocity-animating");
                }if (!t && o.complete && !o.loop && u === c - 1) try {
                    o.complete.call(n, n);
                } catch (d) {
                    setTimeout(function () {
                        throw d;
                    }, 1);
                }s && o.loop !== !0 && s(n), i(p) && o.loop === !0 && !t && ($.each(i(p).tweensContainer, function (e, t) {
                    /^rotate/.test(e) && 360 === parseFloat(t.endValue) && (t.endValue = 0, t.startValue = 360), /^backgroundPosition/.test(e) && 100 === parseFloat(t.endValue) && "%" === t.unitType && (t.endValue = 0, t.startValue = 100);
                }), v(p, "reverse", { loop: !0, delay: o.delay })), o.queue !== !1 && $.dequeue(p, o.queue);
            }v.State.calls[e] = !1;for (var g = 0, m = v.State.calls.length; m > g; g++) {
                if (v.State.calls[g] !== !1) {
                    l = !0;break;
                }
            }l === !1 && (v.State.isTicking = !1, delete v.State.calls, v.State.calls = []);
        }var f = function () {
            if (r.documentMode) return r.documentMode;for (var e = 7; e > 4; e--) {
                var t = r.createElement("div");if (t.innerHTML = "<!--[if IE " + e + "]><span></span><![endif]-->", t.getElementsByTagName("span").length) return t = null, e;
            }return a;
        }(),
            d = function () {
            var e = 0;return t.webkitRequestAnimationFrame || t.mozRequestAnimationFrame || function (t) {
                var r = new Date().getTime(),
                    a;return a = Math.max(0, 16 - (r - e)), e = r + a, setTimeout(function () {
                    t(r + a);
                }, a);
            };
        }(),
            g = { isString: function isString(e) {
                return "string" == typeof e;
            }, isArray: Array.isArray || function (e) {
                return "[object Array]" === Object.prototype.toString.call(e);
            }, isFunction: function isFunction(e) {
                return "[object Function]" === Object.prototype.toString.call(e);
            }, isNode: function isNode(e) {
                return e && e.nodeType;
            }, isNodeList: function isNodeList(e) {
                return "object" == (typeof e === 'undefined' ? 'undefined' : _typeof(e)) && /^\[object (HTMLCollection|NodeList|Object)\]$/.test(Object.prototype.toString.call(e)) && e.length !== a && (0 === e.length || "object" == _typeof(e[0]) && e[0].nodeType > 0);
            }, isWrapped: function isWrapped(e) {
                return e && (e.jquery || t.Zepto && t.Zepto.zepto.isZ(e));
            }, isSVG: function isSVG(e) {
                return t.SVGElement && e instanceof t.SVGElement;
            }, isEmptyObject: function isEmptyObject(e) {
                for (var t in e) {
                    return !1;
                }return !0;
            } },
            $,
            m = !1;if (e.fn && e.fn.jquery ? ($ = e, m = !0) : $ = t.Velocity.Utilities, 8 >= f && !m) throw new Error("Velocity: IE8 and below require jQuery to be loaded before Velocity.");if (7 >= f) return void (jQuery.fn.velocity = jQuery.fn.animate);var y = 400,
            h = "swing",
            v = { State: { isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent), isAndroid: /Android/i.test(navigator.userAgent), isGingerbread: /Android 2\.3\.[3-7]/i.test(navigator.userAgent), isChrome: t.chrome, isFirefox: /Firefox/i.test(navigator.userAgent), prefixElement: r.createElement("div"), prefixMatches: {}, scrollAnchor: null, scrollPropertyLeft: null, scrollPropertyTop: null, isTicking: !1, calls: [] }, CSS: {}, Utilities: $, Redirects: {}, Easings: {}, Promise: t.Promise, defaults: { queue: "", duration: y, easing: h, begin: a, complete: a, progress: a, display: a, visibility: a, loop: !1, delay: !1, mobileHA: !0, _cacheValues: !0 }, init: function init(e) {
                $.data(e, "velocity", { isSVG: g.isSVG(e), isAnimating: !1, computedStyle: null, tweensContainer: null, rootPropertyValueCache: {}, transformCache: {} });
            }, hook: null, mock: !1, version: { major: 1, minor: 2, patch: 2 }, debug: !1 };t.pageYOffset !== a ? (v.State.scrollAnchor = t, v.State.scrollPropertyLeft = "pageXOffset", v.State.scrollPropertyTop = "pageYOffset") : (v.State.scrollAnchor = r.documentElement || r.body.parentNode || r.body, v.State.scrollPropertyLeft = "scrollLeft", v.State.scrollPropertyTop = "scrollTop");var b = function () {
            function e(e) {
                return -e.tension * e.x - e.friction * e.v;
            }function t(t, r, a) {
                var n = { x: t.x + a.dx * r, v: t.v + a.dv * r, tension: t.tension, friction: t.friction };return { dx: n.v, dv: e(n) };
            }function r(r, a) {
                var n = { dx: r.v, dv: e(r) },
                    o = t(r, .5 * a, n),
                    i = t(r, .5 * a, o),
                    s = t(r, a, i),
                    l = 1 / 6 * (n.dx + 2 * (o.dx + i.dx) + s.dx),
                    u = 1 / 6 * (n.dv + 2 * (o.dv + i.dv) + s.dv);return r.x = r.x + l * a, r.v = r.v + u * a, r;
            }return function a(e, t, n) {
                var o = { x: -1, v: 0, tension: null, friction: null },
                    i = [0],
                    s = 0,
                    l = 1e-4,
                    u = .016,
                    c,
                    p,
                    f;for (e = parseFloat(e) || 500, t = parseFloat(t) || 20, n = n || null, o.tension = e, o.friction = t, c = null !== n, c ? (s = a(e, t), p = s / n * u) : p = u;;) {
                    if (f = r(f || o, p), i.push(1 + f.x), s += 16, !(Math.abs(f.x) > l && Math.abs(f.v) > l)) break;
                }return c ? function (e) {
                    return i[e * (i.length - 1) | 0];
                } : s;
            };
        }();v.Easings = { linear: function linear(e) {
                return e;
            }, swing: function swing(e) {
                return .5 - Math.cos(e * Math.PI) / 2;
            }, spring: function spring(e) {
                return 1 - Math.cos(4.5 * e * Math.PI) * Math.exp(6 * -e);
            } }, $.each([["ease", [.25, .1, .25, 1]], ["ease-in", [.42, 0, 1, 1]], ["ease-out", [0, 0, .58, 1]], ["ease-in-out", [.42, 0, .58, 1]], ["easeInSine", [.47, 0, .745, .715]], ["easeOutSine", [.39, .575, .565, 1]], ["easeInOutSine", [.445, .05, .55, .95]], ["easeInQuad", [.55, .085, .68, .53]], ["easeOutQuad", [.25, .46, .45, .94]], ["easeInOutQuad", [.455, .03, .515, .955]], ["easeInCubic", [.55, .055, .675, .19]], ["easeOutCubic", [.215, .61, .355, 1]], ["easeInOutCubic", [.645, .045, .355, 1]], ["easeInQuart", [.895, .03, .685, .22]], ["easeOutQuart", [.165, .84, .44, 1]], ["easeInOutQuart", [.77, 0, .175, 1]], ["easeInQuint", [.755, .05, .855, .06]], ["easeOutQuint", [.23, 1, .32, 1]], ["easeInOutQuint", [.86, 0, .07, 1]], ["easeInExpo", [.95, .05, .795, .035]], ["easeOutExpo", [.19, 1, .22, 1]], ["easeInOutExpo", [1, 0, 0, 1]], ["easeInCirc", [.6, .04, .98, .335]], ["easeOutCirc", [.075, .82, .165, 1]], ["easeInOutCirc", [.785, .135, .15, .86]]], function (e, t) {
            v.Easings[t[0]] = l.apply(null, t[1]);
        });var x = v.CSS = { RegEx: { isHex: /^#([A-f\d]{3}){1,2}$/i, valueUnwrap: /^[A-z]+\((.*)\)$/i, wrappedValueAlreadyExtracted: /[0-9.]+ [0-9.]+ [0-9.]+( [0-9.]+)?/, valueSplit: /([A-z]+\(.+\))|(([A-z0-9#-.]+?)(?=\s|$))/gi }, Lists: { colors: ["fill", "stroke", "stopColor", "color", "backgroundColor", "borderColor", "borderTopColor", "borderRightColor", "borderBottomColor", "borderLeftColor", "outlineColor"], transformsBase: ["translateX", "translateY", "scale", "scaleX", "scaleY", "skewX", "skewY", "rotateZ"], transforms3D: ["transformPerspective", "translateZ", "scaleZ", "rotateX", "rotateY"] }, Hooks: { templates: { textShadow: ["Color X Y Blur", "black 0px 0px 0px"], boxShadow: ["Color X Y Blur Spread", "black 0px 0px 0px 0px"], clip: ["Top Right Bottom Left", "0px 0px 0px 0px"], backgroundPosition: ["X Y", "0% 0%"], transformOrigin: ["X Y Z", "50% 50% 0px"], perspectiveOrigin: ["X Y", "50% 50%"] }, registered: {}, register: function register() {
                    for (var e = 0; e < x.Lists.colors.length; e++) {
                        var t = "color" === x.Lists.colors[e] ? "0 0 0 1" : "255 255 255 1";x.Hooks.templates[x.Lists.colors[e]] = ["Red Green Blue Alpha", t];
                    }var r, a, n;if (f) for (r in x.Hooks.templates) {
                        a = x.Hooks.templates[r], n = a[0].split(" ");var o = a[1].match(x.RegEx.valueSplit);"Color" === n[0] && (n.push(n.shift()), o.push(o.shift()), x.Hooks.templates[r] = [n.join(" "), o.join(" ")]);
                    }for (r in x.Hooks.templates) {
                        a = x.Hooks.templates[r], n = a[0].split(" ");for (var e in n) {
                            var i = r + n[e],
                                s = e;x.Hooks.registered[i] = [r, s];
                        }
                    }
                }, getRoot: function getRoot(e) {
                    var t = x.Hooks.registered[e];return t ? t[0] : e;
                }, cleanRootPropertyValue: function cleanRootPropertyValue(e, t) {
                    return x.RegEx.valueUnwrap.test(t) && (t = t.match(x.RegEx.valueUnwrap)[1]), x.Values.isCSSNullValue(t) && (t = x.Hooks.templates[e][1]), t;
                }, extractValue: function extractValue(e, t) {
                    var r = x.Hooks.registered[e];if (r) {
                        var a = r[0],
                            n = r[1];return t = x.Hooks.cleanRootPropertyValue(a, t), t.toString().match(x.RegEx.valueSplit)[n];
                    }return t;
                }, injectValue: function injectValue(e, t, r) {
                    var a = x.Hooks.registered[e];if (a) {
                        var n = a[0],
                            o = a[1],
                            i,
                            s;return r = x.Hooks.cleanRootPropertyValue(n, r), i = r.toString().match(x.RegEx.valueSplit), i[o] = t, s = i.join(" ");
                    }return r;
                } }, Normalizations: { registered: { clip: function clip(e, t, r) {
                        switch (e) {case "name":
                                return "clip";case "extract":
                                var a;return x.RegEx.wrappedValueAlreadyExtracted.test(r) ? a = r : (a = r.toString().match(x.RegEx.valueUnwrap), a = a ? a[1].replace(/,(\s+)?/g, " ") : r), a;case "inject":
                                return "rect(" + r + ")";}
                    }, blur: function blur(e, t, r) {
                        switch (e) {case "name":
                                return v.State.isFirefox ? "filter" : "-webkit-filter";case "extract":
                                var a = parseFloat(r);if (!a && 0 !== a) {
                                    var n = r.toString().match(/blur\(([0-9]+[A-z]+)\)/i);a = n ? n[1] : 0;
                                }return a;case "inject":
                                return parseFloat(r) ? "blur(" + r + ")" : "none";}
                    }, opacity: function opacity(e, t, r) {
                        if (8 >= f) switch (e) {case "name":
                                return "filter";case "extract":
                                var a = r.toString().match(/alpha\(opacity=(.*)\)/i);return r = a ? a[1] / 100 : 1;case "inject":
                                return t.style.zoom = 1, parseFloat(r) >= 1 ? "" : "alpha(opacity=" + parseInt(100 * parseFloat(r), 10) + ")";} else switch (e) {case "name":
                                return "opacity";case "extract":
                                return r;case "inject":
                                return r;}
                    } }, register: function register() {
                    9 >= f || v.State.isGingerbread || (x.Lists.transformsBase = x.Lists.transformsBase.concat(x.Lists.transforms3D));for (var e = 0; e < x.Lists.transformsBase.length; e++) {
                        !function () {
                            var t = x.Lists.transformsBase[e];x.Normalizations.registered[t] = function (e, r, n) {
                                switch (e) {case "name":
                                        return "transform";case "extract":
                                        return i(r) === a || i(r).transformCache[t] === a ? /^scale/i.test(t) ? 1 : 0 : i(r).transformCache[t].replace(/[()]/g, "");case "inject":
                                        var o = !1;switch (t.substr(0, t.length - 1)) {case "translate":
                                                o = !/(%|px|em|rem|vw|vh|\d)$/i.test(n);break;case "scal":case "scale":
                                                v.State.isAndroid && i(r).transformCache[t] === a && 1 > n && (n = 1), o = !/(\d)$/i.test(n);break;case "skew":
                                                o = !/(deg|\d)$/i.test(n);break;case "rotate":
                                                o = !/(deg|\d)$/i.test(n);}return o || (i(r).transformCache[t] = "(" + n + ")"), i(r).transformCache[t];}
                            };
                        }();
                    }for (var e = 0; e < x.Lists.colors.length; e++) {
                        !function () {
                            var t = x.Lists.colors[e];x.Normalizations.registered[t] = function (e, r, n) {
                                switch (e) {case "name":
                                        return t;case "extract":
                                        var o;if (x.RegEx.wrappedValueAlreadyExtracted.test(n)) o = n;else {
                                            var i,
                                                s = { black: "rgb(0, 0, 0)", blue: "rgb(0, 0, 255)", gray: "rgb(128, 128, 128)", green: "rgb(0, 128, 0)", red: "rgb(255, 0, 0)", white: "rgb(255, 255, 255)" };/^[A-z]+$/i.test(n) ? i = s[n] !== a ? s[n] : s.black : x.RegEx.isHex.test(n) ? i = "rgb(" + x.Values.hexToRgb(n).join(" ") + ")" : /^rgba?\(/i.test(n) || (i = s.black), o = (i || n).toString().match(x.RegEx.valueUnwrap)[1].replace(/,(\s+)?/g, " ");
                                        }return 8 >= f || 3 !== o.split(" ").length || (o += " 1"), o;case "inject":
                                        return 8 >= f ? 4 === n.split(" ").length && (n = n.split(/\s+/).slice(0, 3).join(" ")) : 3 === n.split(" ").length && (n += " 1"), (8 >= f ? "rgb" : "rgba") + "(" + n.replace(/\s+/g, ",").replace(/\.(\d)+(?=,)/g, "") + ")";}
                            };
                        }();
                    }
                } }, Names: { camelCase: function camelCase(e) {
                    return e.replace(/-(\w)/g, function (e, t) {
                        return t.toUpperCase();
                    });
                }, SVGAttribute: function SVGAttribute(e) {
                    var t = "width|height|x|y|cx|cy|r|rx|ry|x1|x2|y1|y2";return (f || v.State.isAndroid && !v.State.isChrome) && (t += "|transform"), new RegExp("^(" + t + ")$", "i").test(e);
                }, prefixCheck: function prefixCheck(e) {
                    if (v.State.prefixMatches[e]) return [v.State.prefixMatches[e], !0];for (var t = ["", "Webkit", "Moz", "ms", "O"], r = 0, a = t.length; a > r; r++) {
                        var n;if (n = 0 === r ? e : t[r] + e.replace(/^\w/, function (e) {
                            return e.toUpperCase();
                        }), g.isString(v.State.prefixElement.style[n])) return v.State.prefixMatches[e] = n, [n, !0];
                    }return [e, !1];
                } }, Values: { hexToRgb: function hexToRgb(e) {
                    var t = /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
                        r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i,
                        a;return e = e.replace(t, function (e, t, r, a) {
                        return t + t + r + r + a + a;
                    }), a = r.exec(e), a ? [parseInt(a[1], 16), parseInt(a[2], 16), parseInt(a[3], 16)] : [0, 0, 0];
                }, isCSSNullValue: function isCSSNullValue(e) {
                    return 0 == e || /^(none|auto|transparent|(rgba\(0, ?0, ?0, ?0\)))$/i.test(e);
                }, getUnitType: function getUnitType(e) {
                    return (/^(rotate|skew)/i.test(e) ? "deg" : /(^(scale|scaleX|scaleY|scaleZ|alpha|flexGrow|flexHeight|zIndex|fontWeight)$)|((opacity|red|green|blue|alpha)$)/i.test(e) ? "" : "px"
                    );
                }, getDisplayType: function getDisplayType(e) {
                    var t = e && e.tagName.toString().toLowerCase();return (/^(b|big|i|small|tt|abbr|acronym|cite|code|dfn|em|kbd|strong|samp|var|a|bdo|br|img|map|object|q|script|span|sub|sup|button|input|label|select|textarea)$/i.test(t) ? "inline" : /^(li)$/i.test(t) ? "list-item" : /^(tr)$/i.test(t) ? "table-row" : /^(table)$/i.test(t) ? "table" : /^(tbody)$/i.test(t) ? "table-row-group" : "block"
                    );
                }, addClass: function addClass(e, t) {
                    e.classList ? e.classList.add(t) : e.className += (e.className.length ? " " : "") + t;
                }, removeClass: function removeClass(e, t) {
                    e.classList ? e.classList.remove(t) : e.className = e.className.toString().replace(new RegExp("(^|\\s)" + t.split(" ").join("|") + "(\\s|$)", "gi"), " ");
                } }, getPropertyValue: function getPropertyValue(e, r, n, o) {
                function s(e, r) {
                    function n() {
                        u && x.setPropertyValue(e, "display", "none");
                    }var l = 0;if (8 >= f) l = $.css(e, r);else {
                        var u = !1;if (/^(width|height)$/.test(r) && 0 === x.getPropertyValue(e, "display") && (u = !0, x.setPropertyValue(e, "display", x.Values.getDisplayType(e))), !o) {
                            if ("height" === r && "border-box" !== x.getPropertyValue(e, "boxSizing").toString().toLowerCase()) {
                                var c = e.offsetHeight - (parseFloat(x.getPropertyValue(e, "borderTopWidth")) || 0) - (parseFloat(x.getPropertyValue(e, "borderBottomWidth")) || 0) - (parseFloat(x.getPropertyValue(e, "paddingTop")) || 0) - (parseFloat(x.getPropertyValue(e, "paddingBottom")) || 0);return n(), c;
                            }if ("width" === r && "border-box" !== x.getPropertyValue(e, "boxSizing").toString().toLowerCase()) {
                                var p = e.offsetWidth - (parseFloat(x.getPropertyValue(e, "borderLeftWidth")) || 0) - (parseFloat(x.getPropertyValue(e, "borderRightWidth")) || 0) - (parseFloat(x.getPropertyValue(e, "paddingLeft")) || 0) - (parseFloat(x.getPropertyValue(e, "paddingRight")) || 0);return n(), p;
                            }
                        }var d;d = i(e) === a ? t.getComputedStyle(e, null) : i(e).computedStyle ? i(e).computedStyle : i(e).computedStyle = t.getComputedStyle(e, null), "borderColor" === r && (r = "borderTopColor"), l = 9 === f && "filter" === r ? d.getPropertyValue(r) : d[r], ("" === l || null === l) && (l = e.style[r]), n();
                    }if ("auto" === l && /^(top|right|bottom|left)$/i.test(r)) {
                        var g = s(e, "position");("fixed" === g || "absolute" === g && /top|left/i.test(r)) && (l = $(e).position()[r] + "px");
                    }return l;
                }var l;if (x.Hooks.registered[r]) {
                    var u = r,
                        c = x.Hooks.getRoot(u);n === a && (n = x.getPropertyValue(e, x.Names.prefixCheck(c)[0])), x.Normalizations.registered[c] && (n = x.Normalizations.registered[c]("extract", e, n)), l = x.Hooks.extractValue(u, n);
                } else if (x.Normalizations.registered[r]) {
                    var p, d;p = x.Normalizations.registered[r]("name", e), "transform" !== p && (d = s(e, x.Names.prefixCheck(p)[0]), x.Values.isCSSNullValue(d) && x.Hooks.templates[r] && (d = x.Hooks.templates[r][1])), l = x.Normalizations.registered[r]("extract", e, d);
                }if (!/^[\d-]/.test(l)) if (i(e) && i(e).isSVG && x.Names.SVGAttribute(r)) {
                    if (/^(height|width)$/i.test(r)) try {
                        l = e.getBBox()[r];
                    } catch (g) {
                        l = 0;
                    } else l = e.getAttribute(r);
                } else l = s(e, x.Names.prefixCheck(r)[0]);return x.Values.isCSSNullValue(l) && (l = 0), v.debug >= 2 && console.log("Get " + r + ": " + l), l;
            }, setPropertyValue: function setPropertyValue(e, r, a, n, o) {
                var s = r;if ("scroll" === r) o.container ? o.container["scroll" + o.direction] = a : "Left" === o.direction ? t.scrollTo(a, o.alternateValue) : t.scrollTo(o.alternateValue, a);else if (x.Normalizations.registered[r] && "transform" === x.Normalizations.registered[r]("name", e)) x.Normalizations.registered[r]("inject", e, a), s = "transform", a = i(e).transformCache[r];else {
                    if (x.Hooks.registered[r]) {
                        var l = r,
                            u = x.Hooks.getRoot(r);n = n || x.getPropertyValue(e, u), a = x.Hooks.injectValue(l, a, n), r = u;
                    }if (x.Normalizations.registered[r] && (a = x.Normalizations.registered[r]("inject", e, a), r = x.Normalizations.registered[r]("name", e)), s = x.Names.prefixCheck(r)[0], 8 >= f) try {
                        e.style[s] = a;
                    } catch (c) {
                        v.debug && console.log("Browser does not support [" + a + "] for [" + s + "]");
                    } else i(e) && i(e).isSVG && x.Names.SVGAttribute(r) ? e.setAttribute(r, a) : e.style[s] = a;v.debug >= 2 && console.log("Set " + r + " (" + s + "): " + a);
                }return [s, a];
            }, flushTransformCache: function flushTransformCache(e) {
                function t(t) {
                    return parseFloat(x.getPropertyValue(e, t));
                }var r = "";if ((f || v.State.isAndroid && !v.State.isChrome) && i(e).isSVG) {
                    var a = { translate: [t("translateX"), t("translateY")], skewX: [t("skewX")], skewY: [t("skewY")], scale: 1 !== t("scale") ? [t("scale"), t("scale")] : [t("scaleX"), t("scaleY")], rotate: [t("rotateZ"), 0, 0] };$.each(i(e).transformCache, function (e) {
                        /^translate/i.test(e) ? e = "translate" : /^scale/i.test(e) ? e = "scale" : /^rotate/i.test(e) && (e = "rotate"), a[e] && (r += e + "(" + a[e].join(" ") + ") ", delete a[e]);
                    });
                } else {
                    var n, o;$.each(i(e).transformCache, function (t) {
                        return n = i(e).transformCache[t], "transformPerspective" === t ? (o = n, !0) : (9 === f && "rotateZ" === t && (t = "rotate"), void (r += t + n + " "));
                    }), o && (r = "perspective" + o + " " + r);
                }x.setPropertyValue(e, "transform", r);
            } };x.Hooks.register(), x.Normalizations.register(), v.hook = function (e, t, r) {
            var n = a;return e = o(e), $.each(e, function (e, o) {
                if (i(o) === a && v.init(o), r === a) n === a && (n = v.CSS.getPropertyValue(o, t));else {
                    var s = v.CSS.setPropertyValue(o, t, r);"transform" === s[0] && v.CSS.flushTransformCache(o), n = s;
                }
            }), n;
        };var S = function S() {
            function e() {
                return l ? T.promise || null : f;
            }function n() {
                function e(e) {
                    function p(e, t) {
                        var r = a,
                            i = a,
                            s = a;return g.isArray(e) ? (r = e[0], !g.isArray(e[1]) && /^[\d-]/.test(e[1]) || g.isFunction(e[1]) || x.RegEx.isHex.test(e[1]) ? s = e[1] : (g.isString(e[1]) && !x.RegEx.isHex.test(e[1]) || g.isArray(e[1])) && (i = t ? e[1] : u(e[1], o.duration), e[2] !== a && (s = e[2]))) : r = e, t || (i = i || o.easing), g.isFunction(r) && (r = r.call(n, w, P)), g.isFunction(s) && (s = s.call(n, w, P)), [r || 0, i, s];
                    }function f(e, t) {
                        var r, a;return a = (t || "0").toString().toLowerCase().replace(/[%A-z]+$/, function (e) {
                            return r = e, "";
                        }), r || (r = x.Values.getUnitType(e)), [a, r];
                    }function d() {
                        var e = { myParent: n.parentNode || r.body, position: x.getPropertyValue(n, "position"), fontSize: x.getPropertyValue(n, "fontSize") },
                            a = e.position === N.lastPosition && e.myParent === N.lastParent,
                            o = e.fontSize === N.lastFontSize;N.lastParent = e.myParent, N.lastPosition = e.position, N.lastFontSize = e.fontSize;var s = 100,
                            l = {};if (o && a) l.emToPx = N.lastEmToPx, l.percentToPxWidth = N.lastPercentToPxWidth, l.percentToPxHeight = N.lastPercentToPxHeight;else {
                            var u = i(n).isSVG ? r.createElementNS("http://www.w3.org/2000/svg", "rect") : r.createElement("div");v.init(u), e.myParent.appendChild(u), $.each(["overflow", "overflowX", "overflowY"], function (e, t) {
                                v.CSS.setPropertyValue(u, t, "hidden");
                            }), v.CSS.setPropertyValue(u, "position", e.position), v.CSS.setPropertyValue(u, "fontSize", e.fontSize), v.CSS.setPropertyValue(u, "boxSizing", "content-box"), $.each(["minWidth", "maxWidth", "width", "minHeight", "maxHeight", "height"], function (e, t) {
                                v.CSS.setPropertyValue(u, t, s + "%");
                            }), v.CSS.setPropertyValue(u, "paddingLeft", s + "em"), l.percentToPxWidth = N.lastPercentToPxWidth = (parseFloat(x.getPropertyValue(u, "width", null, !0)) || 1) / s, l.percentToPxHeight = N.lastPercentToPxHeight = (parseFloat(x.getPropertyValue(u, "height", null, !0)) || 1) / s, l.emToPx = N.lastEmToPx = (parseFloat(x.getPropertyValue(u, "paddingLeft")) || 1) / s, e.myParent.removeChild(u);
                        }return null === N.remToPx && (N.remToPx = parseFloat(x.getPropertyValue(r.body, "fontSize")) || 16), null === N.vwToPx && (N.vwToPx = parseFloat(t.innerWidth) / 100, N.vhToPx = parseFloat(t.innerHeight) / 100), l.remToPx = N.remToPx, l.vwToPx = N.vwToPx, l.vhToPx = N.vhToPx, v.debug >= 1 && console.log("Unit ratios: " + JSON.stringify(l), n), l;
                    }if (o.begin && 0 === w) try {
                        o.begin.call(m, m);
                    } catch (y) {
                        setTimeout(function () {
                            throw y;
                        }, 1);
                    }if ("scroll" === k) {
                        var S = /^x$/i.test(o.axis) ? "Left" : "Top",
                            V = parseFloat(o.offset) || 0,
                            C,
                            A,
                            F;o.container ? g.isWrapped(o.container) || g.isNode(o.container) ? (o.container = o.container[0] || o.container, C = o.container["scroll" + S], F = C + $(n).position()[S.toLowerCase()] + V) : o.container = null : (C = v.State.scrollAnchor[v.State["scrollProperty" + S]], A = v.State.scrollAnchor[v.State["scrollProperty" + ("Left" === S ? "Top" : "Left")]], F = $(n).offset()[S.toLowerCase()] + V), s = { scroll: { rootPropertyValue: !1, startValue: C, currentValue: C, endValue: F, unitType: "", easing: o.easing, scrollData: { container: o.container, direction: S, alternateValue: A } }, element: n }, v.debug && console.log("tweensContainer (scroll): ", s.scroll, n);
                    } else if ("reverse" === k) {
                        if (!i(n).tweensContainer) return void $.dequeue(n, o.queue);"none" === i(n).opts.display && (i(n).opts.display = "auto"), "hidden" === i(n).opts.visibility && (i(n).opts.visibility = "visible"), i(n).opts.loop = !1, i(n).opts.begin = null, i(n).opts.complete = null, b.easing || delete o.easing, b.duration || delete o.duration, o = $.extend({}, i(n).opts, o);var E = $.extend(!0, {}, i(n).tweensContainer);for (var j in E) {
                            if ("element" !== j) {
                                var H = E[j].startValue;E[j].startValue = E[j].currentValue = E[j].endValue, E[j].endValue = H, g.isEmptyObject(b) || (E[j].easing = o.easing), v.debug && console.log("reverse tweensContainer (" + j + "): " + JSON.stringify(E[j]), n);
                            }
                        }s = E;
                    } else if ("start" === k) {
                        var E;i(n).tweensContainer && i(n).isAnimating === !0 && (E = i(n).tweensContainer), $.each(h, function (e, t) {
                            if (RegExp("^" + x.Lists.colors.join("$|^") + "$").test(e)) {
                                var r = p(t, !0),
                                    n = r[0],
                                    o = r[1],
                                    i = r[2];if (x.RegEx.isHex.test(n)) {
                                    for (var s = ["Red", "Green", "Blue"], l = x.Values.hexToRgb(n), u = i ? x.Values.hexToRgb(i) : a, c = 0; c < s.length; c++) {
                                        var f = [l[c]];o && f.push(o), u !== a && f.push(u[c]), h[e + s[c]] = f;
                                    }delete h[e];
                                }
                            }
                        });for (var R in h) {
                            var O = p(h[R]),
                                z = O[0],
                                q = O[1],
                                M = O[2];R = x.Names.camelCase(R);var I = x.Hooks.getRoot(R),
                                B = !1;if (i(n).isSVG || "tween" === I || x.Names.prefixCheck(I)[1] !== !1 || x.Normalizations.registered[I] !== a) {
                                (o.display !== a && null !== o.display && "none" !== o.display || o.visibility !== a && "hidden" !== o.visibility) && /opacity|filter/.test(R) && !M && 0 !== z && (M = 0), o._cacheValues && E && E[R] ? (M === a && (M = E[R].endValue + E[R].unitType), B = i(n).rootPropertyValueCache[I]) : x.Hooks.registered[R] ? M === a ? (B = x.getPropertyValue(n, I), M = x.getPropertyValue(n, R, B)) : B = x.Hooks.templates[I][1] : M === a && (M = x.getPropertyValue(n, R));var W,
                                    G,
                                    D,
                                    X = !1;if (W = f(R, M), M = W[0], D = W[1], W = f(R, z), z = W[0].replace(/^([+-\/*])=/, function (e, t) {
                                    return X = t, "";
                                }), G = W[1], M = parseFloat(M) || 0, z = parseFloat(z) || 0, "%" === G && (/^(fontSize|lineHeight)$/.test(R) ? (z /= 100, G = "em") : /^scale/.test(R) ? (z /= 100, G = "") : /(Red|Green|Blue)$/i.test(R) && (z = z / 100 * 255, G = "")), /[\/*]/.test(X)) G = D;else if (D !== G && 0 !== M) if (0 === z) G = D;else {
                                    l = l || d();var Y = /margin|padding|left|right|width|text|word|letter/i.test(R) || /X$/.test(R) || "x" === R ? "x" : "y";switch (D) {case "%":
                                            M *= "x" === Y ? l.percentToPxWidth : l.percentToPxHeight;break;case "px":
                                            break;default:
                                            M *= l[D + "ToPx"];}switch (G) {case "%":
                                            M *= 1 / ("x" === Y ? l.percentToPxWidth : l.percentToPxHeight);break;case "px":
                                            break;default:
                                            M *= 1 / l[G + "ToPx"];}
                                }switch (X) {case "+":
                                        z = M + z;break;case "-":
                                        z = M - z;break;case "*":
                                        z = M * z;break;case "/":
                                        z = M / z;}s[R] = { rootPropertyValue: B, startValue: M, currentValue: M, endValue: z, unitType: G, easing: q }, v.debug && console.log("tweensContainer (" + R + "): " + JSON.stringify(s[R]), n);
                            } else v.debug && console.log("Skipping [" + I + "] due to a lack of browser support.");
                        }s.element = n;
                    }s.element && (x.Values.addClass(n, "velocity-animating"), L.push(s), "" === o.queue && (i(n).tweensContainer = s, i(n).opts = o), i(n).isAnimating = !0, w === P - 1 ? (v.State.calls.push([L, m, o, null, T.resolver]), v.State.isTicking === !1 && (v.State.isTicking = !0, c())) : w++);
                }var n = this,
                    o = $.extend({}, v.defaults, b),
                    s = {},
                    l;switch (i(n) === a && v.init(n), parseFloat(o.delay) && o.queue !== !1 && $.queue(n, o.queue, function (e) {
                    v.velocityQueueEntryFlag = !0, i(n).delayTimer = { setTimeout: setTimeout(e, parseFloat(o.delay)), next: e };
                }), o.duration.toString().toLowerCase()) {case "fast":
                        o.duration = 200;break;case "normal":
                        o.duration = y;break;case "slow":
                        o.duration = 600;break;default:
                        o.duration = parseFloat(o.duration) || 1;}v.mock !== !1 && (v.mock === !0 ? o.duration = o.delay = 1 : (o.duration *= parseFloat(v.mock) || 1, o.delay *= parseFloat(v.mock) || 1)), o.easing = u(o.easing, o.duration), o.begin && !g.isFunction(o.begin) && (o.begin = null), o.progress && !g.isFunction(o.progress) && (o.progress = null), o.complete && !g.isFunction(o.complete) && (o.complete = null), o.display !== a && null !== o.display && (o.display = o.display.toString().toLowerCase(), "auto" === o.display && (o.display = v.CSS.Values.getDisplayType(n))), o.visibility !== a && null !== o.visibility && (o.visibility = o.visibility.toString().toLowerCase()), o.mobileHA = o.mobileHA && v.State.isMobile && !v.State.isGingerbread, o.queue === !1 ? o.delay ? setTimeout(e, o.delay) : e() : $.queue(n, o.queue, function (t, r) {
                    return r === !0 ? (T.promise && T.resolver(m), !0) : (v.velocityQueueEntryFlag = !0, void e(t));
                }), "" !== o.queue && "fx" !== o.queue || "inprogress" === $.queue(n)[0] || $.dequeue(n);
            }var s = arguments[0] && (arguments[0].p || $.isPlainObject(arguments[0].properties) && !arguments[0].properties.names || g.isString(arguments[0].properties)),
                l,
                f,
                d,
                m,
                h,
                b;if (g.isWrapped(this) ? (l = !1, d = 0, m = this, f = this) : (l = !0, d = 1, m = s ? arguments[0].elements || arguments[0].e : arguments[0]), m = o(m)) {
                s ? (h = arguments[0].properties || arguments[0].p, b = arguments[0].options || arguments[0].o) : (h = arguments[d], b = arguments[d + 1]);var P = m.length,
                    w = 0;if (!/^(stop|finish)$/i.test(h) && !$.isPlainObject(b)) {
                    var V = d + 1;b = {};for (var C = V; C < arguments.length; C++) {
                        g.isArray(arguments[C]) || !/^(fast|normal|slow)$/i.test(arguments[C]) && !/^\d/.test(arguments[C]) ? g.isString(arguments[C]) || g.isArray(arguments[C]) ? b.easing = arguments[C] : g.isFunction(arguments[C]) && (b.complete = arguments[C]) : b.duration = arguments[C];
                    }
                }var T = { promise: null, resolver: null, rejecter: null };l && v.Promise && (T.promise = new v.Promise(function (e, t) {
                    T.resolver = e, T.rejecter = t;
                }));var k;switch (h) {case "scroll":
                        k = "scroll";break;case "reverse":
                        k = "reverse";break;case "finish":case "stop":
                        $.each(m, function (e, t) {
                            i(t) && i(t).delayTimer && (clearTimeout(i(t).delayTimer.setTimeout), i(t).delayTimer.next && i(t).delayTimer.next(), delete i(t).delayTimer);
                        });var A = [];return $.each(v.State.calls, function (e, t) {
                            t && $.each(t[1], function (r, n) {
                                var o = b === a ? "" : b;return o === !0 || t[2].queue === o || b === a && t[2].queue === !1 ? void $.each(m, function (r, a) {
                                    a === n && ((b === !0 || g.isString(b)) && ($.each($.queue(a, g.isString(b) ? b : ""), function (e, t) {
                                        g.isFunction(t) && t(null, !0);
                                    }), $.queue(a, g.isString(b) ? b : "", [])), "stop" === h ? (i(a) && i(a).tweensContainer && o !== !1 && $.each(i(a).tweensContainer, function (e, t) {
                                        t.endValue = t.currentValue;
                                    }), A.push(e)) : "finish" === h && (t[2].duration = 1));
                                }) : !0;
                            });
                        }), "stop" === h && ($.each(A, function (e, t) {
                            p(t, !0);
                        }), T.promise && T.resolver(m)), e();default:
                        if (!$.isPlainObject(h) || g.isEmptyObject(h)) {
                            if (g.isString(h) && v.Redirects[h]) {
                                var F = $.extend({}, b),
                                    E = F.duration,
                                    j = F.delay || 0;return F.backwards === !0 && (m = $.extend(!0, [], m).reverse()), $.each(m, function (e, t) {
                                    parseFloat(F.stagger) ? F.delay = j + parseFloat(F.stagger) * e : g.isFunction(F.stagger) && (F.delay = j + F.stagger.call(t, e, P)), F.drag && (F.duration = parseFloat(E) || (/^(callout|transition)/.test(h) ? 1e3 : y), F.duration = Math.max(F.duration * (F.backwards ? 1 - e / P : (e + 1) / P), .75 * F.duration, 200)), v.Redirects[h].call(t, t, F || {}, e, P, m, T.promise ? T : a);
                                }), e();
                            }var H = "Velocity: First argument (" + h + ") was not a property map, a known action, or a registered redirect. Aborting.";return T.promise ? T.rejecter(new Error(H)) : console.log(H), e();
                        }k = "start";}var N = { lastParent: null, lastPosition: null, lastFontSize: null, lastPercentToPxWidth: null, lastPercentToPxHeight: null, lastEmToPx: null, remToPx: null, vwToPx: null, vhToPx: null },
                    L = [];$.each(m, function (e, t) {
                    g.isNode(t) && n.call(t);
                });var F = $.extend({}, v.defaults, b),
                    R;if (F.loop = parseInt(F.loop), R = 2 * F.loop - 1, F.loop) for (var O = 0; R > O; O++) {
                    var z = { delay: F.delay, progress: F.progress };O === R - 1 && (z.display = F.display, z.visibility = F.visibility, z.complete = F.complete), S(m, "reverse", z);
                }return e();
            }
        };v = $.extend(S, v), v.animate = S;var P = t.requestAnimationFrame || d;return v.State.isMobile || r.hidden === a || r.addEventListener("visibilitychange", function () {
            r.hidden ? (P = function P(e) {
                return setTimeout(function () {
                    e(!0);
                }, 16);
            }, c()) : P = t.requestAnimationFrame || d;
        }), e.Velocity = v, e !== t && (e.fn.velocity = S, e.fn.velocity.defaults = v.defaults), $.each(["Down", "Up"], function (e, t) {
            v.Redirects["slide" + t] = function (e, r, n, o, i, s) {
                var l = $.extend({}, r),
                    u = l.begin,
                    c = l.complete,
                    p = { height: "", marginTop: "", marginBottom: "", paddingTop: "", paddingBottom: "" },
                    f = {};l.display === a && (l.display = "Down" === t ? "inline" === v.CSS.Values.getDisplayType(e) ? "inline-block" : "block" : "none"), l.begin = function () {
                    u && u.call(i, i);for (var r in p) {
                        f[r] = e.style[r];var a = v.CSS.getPropertyValue(e, r);p[r] = "Down" === t ? [a, 0] : [0, a];
                    }f.overflow = e.style.overflow, e.style.overflow = "hidden";
                }, l.complete = function () {
                    for (var t in f) {
                        e.style[t] = f[t];
                    }c && c.call(i, i), s && s.resolver(i);
                }, v(e, p, l);
            };
        }), $.each(["In", "Out"], function (e, t) {
            v.Redirects["fade" + t] = function (e, r, n, o, i, s) {
                var l = $.extend({}, r),
                    u = { opacity: "In" === t ? 1 : 0 },
                    c = l.complete;l.complete = n !== o - 1 ? l.begin = null : function () {
                    c && c.call(i, i), s && s.resolver(i);
                }, l.display === a && (l.display = "In" === t ? "auto" : "none"), v(this, u, l);
            };
        }), v;
    }(window.jQuery || window.Zepto || window, window, document);
});;!function (a, b, c, d) {
    "use strict";
    function k(a, b, c) {
        return setTimeout(q(a, c), b);
    }function l(a, b, c) {
        return Array.isArray(a) ? (m(a, c[b], c), !0) : !1;
    }function m(a, b, c) {
        var e;if (a) if (a.forEach) a.forEach(b, c);else if (a.length !== d) for (e = 0; e < a.length;) {
            b.call(c, a[e], e, a), e++;
        } else for (e in a) {
            a.hasOwnProperty(e) && b.call(c, a[e], e, a);
        }
    }function n(a, b, c) {
        for (var e = Object.keys(b), f = 0; f < e.length;) {
            (!c || c && a[e[f]] === d) && (a[e[f]] = b[e[f]]), f++;
        }return a;
    }function o(a, b) {
        return n(a, b, !0);
    }function p(a, b, c) {
        var e,
            d = b.prototype;e = a.prototype = Object.create(d), e.constructor = a, e._super = d, c && n(e, c);
    }function q(a, b) {
        return function () {
            return a.apply(b, arguments);
        };
    }function r(a, b) {
        return (typeof a === 'undefined' ? 'undefined' : _typeof(a)) == g ? a.apply(b ? b[0] || d : d, b) : a;
    }function s(a, b) {
        return a === d ? b : a;
    }function t(a, b, c) {
        m(x(b), function (b) {
            a.addEventListener(b, c, !1);
        });
    }function u(a, b, c) {
        m(x(b), function (b) {
            a.removeEventListener(b, c, !1);
        });
    }function v(a, b) {
        for (; a;) {
            if (a == b) return !0;a = a.parentNode;
        }return !1;
    }function w(a, b) {
        return a.indexOf(b) > -1;
    }function x(a) {
        return a.trim().split(/\s+/g);
    }function y(a, b, c) {
        if (a.indexOf && !c) return a.indexOf(b);for (var d = 0; d < a.length;) {
            if (c && a[d][c] == b || !c && a[d] === b) return d;d++;
        }return -1;
    }function z(a) {
        return Array.prototype.slice.call(a, 0);
    }function A(a, b, c) {
        for (var d = [], e = [], f = 0; f < a.length;) {
            var g = b ? a[f][b] : a[f];y(e, g) < 0 && d.push(a[f]), e[f] = g, f++;
        }return c && (d = b ? d.sort(function (a, c) {
            return a[b] > c[b];
        }) : d.sort()), d;
    }function B(a, b) {
        for (var c, f, g = b[0].toUpperCase() + b.slice(1), h = 0; h < e.length;) {
            if (c = e[h], f = c ? c + g : b, f in a) return f;h++;
        }return d;
    }function D() {
        return C++;
    }function E(a) {
        var b = a.ownerDocument;return b.defaultView || b.parentWindow;
    }function ab(a, b) {
        var c = this;this.manager = a, this.callback = b, this.element = a.element, this.target = a.options.inputTarget, this.domHandler = function (b) {
            r(a.options.enable, [a]) && c.handler(b);
        }, this.init();
    }function bb(a) {
        var b,
            c = a.options.inputClass;return b = c ? c : H ? wb : I ? Eb : G ? Gb : rb, new b(a, cb);
    }function cb(a, b, c) {
        var d = c.pointers.length,
            e = c.changedPointers.length,
            f = b & O && 0 === d - e,
            g = b & (Q | R) && 0 === d - e;c.isFirst = !!f, c.isFinal = !!g, f && (a.session = {}), c.eventType = b, db(a, c), a.emit("hammer.input", c), a.recognize(c), a.session.prevInput = c;
    }function db(a, b) {
        var c = a.session,
            d = b.pointers,
            e = d.length;c.firstInput || (c.firstInput = gb(b)), e > 1 && !c.firstMultiple ? c.firstMultiple = gb(b) : 1 === e && (c.firstMultiple = !1);var f = c.firstInput,
            g = c.firstMultiple,
            h = g ? g.center : f.center,
            i = b.center = hb(d);b.timeStamp = j(), b.deltaTime = b.timeStamp - f.timeStamp, b.angle = lb(h, i), b.distance = kb(h, i), eb(c, b), b.offsetDirection = jb(b.deltaX, b.deltaY), b.scale = g ? nb(g.pointers, d) : 1, b.rotation = g ? mb(g.pointers, d) : 0, fb(c, b);var k = a.element;v(b.srcEvent.target, k) && (k = b.srcEvent.target), b.target = k;
    }function eb(a, b) {
        var c = b.center,
            d = a.offsetDelta || {},
            e = a.prevDelta || {},
            f = a.prevInput || {};(b.eventType === O || f.eventType === Q) && (e = a.prevDelta = { x: f.deltaX || 0, y: f.deltaY || 0 }, d = a.offsetDelta = { x: c.x, y: c.y }), b.deltaX = e.x + (c.x - d.x), b.deltaY = e.y + (c.y - d.y);
    }function fb(a, b) {
        var f,
            g,
            h,
            j,
            c = a.lastInterval || b,
            e = b.timeStamp - c.timeStamp;if (b.eventType != R && (e > N || c.velocity === d)) {
            var k = c.deltaX - b.deltaX,
                l = c.deltaY - b.deltaY,
                m = ib(e, k, l);g = m.x, h = m.y, f = i(m.x) > i(m.y) ? m.x : m.y, j = jb(k, l), a.lastInterval = b;
        } else f = c.velocity, g = c.velocityX, h = c.velocityY, j = c.direction;b.velocity = f, b.velocityX = g, b.velocityY = h, b.direction = j;
    }function gb(a) {
        for (var b = [], c = 0; c < a.pointers.length;) {
            b[c] = { clientX: h(a.pointers[c].clientX), clientY: h(a.pointers[c].clientY) }, c++;
        }return { timeStamp: j(), pointers: b, center: hb(b), deltaX: a.deltaX, deltaY: a.deltaY };
    }function hb(a) {
        var b = a.length;if (1 === b) return { x: h(a[0].clientX), y: h(a[0].clientY) };for (var c = 0, d = 0, e = 0; b > e;) {
            c += a[e].clientX, d += a[e].clientY, e++;
        }return { x: h(c / b), y: h(d / b) };
    }function ib(a, b, c) {
        return { x: b / a || 0, y: c / a || 0 };
    }function jb(a, b) {
        return a === b ? S : i(a) >= i(b) ? a > 0 ? T : U : b > 0 ? V : W;
    }function kb(a, b, c) {
        c || (c = $);var d = b[c[0]] - a[c[0]],
            e = b[c[1]] - a[c[1]];return Math.sqrt(d * d + e * e);
    }function lb(a, b, c) {
        c || (c = $);var d = b[c[0]] - a[c[0]],
            e = b[c[1]] - a[c[1]];return 180 * Math.atan2(e, d) / Math.PI;
    }function mb(a, b) {
        return lb(b[1], b[0], _) - lb(a[1], a[0], _);
    }function nb(a, b) {
        return kb(b[0], b[1], _) / kb(a[0], a[1], _);
    }function rb() {
        this.evEl = pb, this.evWin = qb, this.allow = !0, this.pressed = !1, ab.apply(this, arguments);
    }function wb() {
        this.evEl = ub, this.evWin = vb, ab.apply(this, arguments), this.store = this.manager.session.pointerEvents = [];
    }function Ab() {
        this.evTarget = yb, this.evWin = zb, this.started = !1, ab.apply(this, arguments);
    }function Bb(a, b) {
        var c = z(a.touches),
            d = z(a.changedTouches);return b & (Q | R) && (c = A(c.concat(d), "identifier", !0)), [c, d];
    }function Eb() {
        this.evTarget = Db, this.targetIds = {}, ab.apply(this, arguments);
    }function Fb(a, b) {
        var c = z(a.touches),
            d = this.targetIds;if (b & (O | P) && 1 === c.length) return d[c[0].identifier] = !0, [c, c];var e,
            f,
            g = z(a.changedTouches),
            h = [],
            i = this.target;if (f = c.filter(function (a) {
            return v(a.target, i);
        }), b === O) for (e = 0; e < f.length;) {
            d[f[e].identifier] = !0, e++;
        }for (e = 0; e < g.length;) {
            d[g[e].identifier] && h.push(g[e]), b & (Q | R) && delete d[g[e].identifier], e++;
        }return h.length ? [A(f.concat(h), "identifier", !0), h] : void 0;
    }function Gb() {
        ab.apply(this, arguments);var a = q(this.handler, this);this.touch = new Eb(this.manager, a), this.mouse = new rb(this.manager, a);
    }function Pb(a, b) {
        this.manager = a, this.set(b);
    }function Qb(a) {
        if (w(a, Mb)) return Mb;var b = w(a, Nb),
            c = w(a, Ob);return b && c ? Nb + " " + Ob : b || c ? b ? Nb : Ob : w(a, Lb) ? Lb : Kb;
    }function Yb(a) {
        this.id = D(), this.manager = null, this.options = o(a || {}, this.defaults), this.options.enable = s(this.options.enable, !0), this.state = Rb, this.simultaneous = {}, this.requireFail = [];
    }function Zb(a) {
        return a & Wb ? "cancel" : a & Ub ? "end" : a & Tb ? "move" : a & Sb ? "start" : "";
    }function $b(a) {
        return a == W ? "down" : a == V ? "up" : a == T ? "left" : a == U ? "right" : "";
    }function _b(a, b) {
        var c = b.manager;return c ? c.get(a) : a;
    }function ac() {
        Yb.apply(this, arguments);
    }function bc() {
        ac.apply(this, arguments), this.pX = null, this.pY = null;
    }function cc() {
        ac.apply(this, arguments);
    }function dc() {
        Yb.apply(this, arguments), this._timer = null, this._input = null;
    }function ec() {
        ac.apply(this, arguments);
    }function fc() {
        ac.apply(this, arguments);
    }function gc() {
        Yb.apply(this, arguments), this.pTime = !1, this.pCenter = !1, this._timer = null, this._input = null, this.count = 0;
    }function hc(a, b) {
        return b = b || {}, b.recognizers = s(b.recognizers, hc.defaults.preset), new kc(a, b);
    }function kc(a, b) {
        b = b || {}, this.options = o(b, hc.defaults), this.options.inputTarget = this.options.inputTarget || a, this.handlers = {}, this.session = {}, this.recognizers = [], this.element = a, this.input = bb(this), this.touchAction = new Pb(this, this.options.touchAction), lc(this, !0), m(b.recognizers, function (a) {
            var b = this.add(new a[0](a[1]));a[2] && b.recognizeWith(a[2]), a[3] && b.requireFailure(a[3]);
        }, this);
    }function lc(a, b) {
        var c = a.element;m(a.options.cssProps, function (a, d) {
            c.style[B(c.style, d)] = b ? a : "";
        });
    }function mc(a, c) {
        var d = b.createEvent("Event");d.initEvent(a, !0, !0), d.gesture = c, c.target.dispatchEvent(d);
    }var e = ["", "webkit", "moz", "MS", "ms", "o"],
        f = b.createElement("div"),
        g = "function",
        h = Math.round,
        i = Math.abs,
        j = Date.now,
        C = 1,
        F = /mobile|tablet|ip(ad|hone|od)|android/i,
        G = "ontouchstart" in a,
        H = B(a, "PointerEvent") !== d,
        I = G && F.test(navigator.userAgent),
        J = "touch",
        K = "pen",
        L = "mouse",
        M = "kinect",
        N = 25,
        O = 1,
        P = 2,
        Q = 4,
        R = 8,
        S = 1,
        T = 2,
        U = 4,
        V = 8,
        W = 16,
        X = T | U,
        Y = V | W,
        Z = X | Y,
        $ = ["x", "y"],
        _ = ["clientX", "clientY"];ab.prototype = { handler: function handler() {}, init: function init() {
            this.evEl && t(this.element, this.evEl, this.domHandler), this.evTarget && t(this.target, this.evTarget, this.domHandler), this.evWin && t(E(this.element), this.evWin, this.domHandler);
        }, destroy: function destroy() {
            this.evEl && u(this.element, this.evEl, this.domHandler), this.evTarget && u(this.target, this.evTarget, this.domHandler), this.evWin && u(E(this.element), this.evWin, this.domHandler);
        } };var ob = { mousedown: O, mousemove: P, mouseup: Q },
        pb = "mousedown",
        qb = "mousemove mouseup";p(rb, ab, { handler: function handler(a) {
            var b = ob[a.type];b & O && 0 === a.button && (this.pressed = !0), b & P && 1 !== a.which && (b = Q), this.pressed && this.allow && (b & Q && (this.pressed = !1), this.callback(this.manager, b, { pointers: [a], changedPointers: [a], pointerType: L, srcEvent: a }));
        } });var sb = { pointerdown: O, pointermove: P, pointerup: Q, pointercancel: R, pointerout: R },
        tb = { 2: J, 3: K, 4: L, 5: M },
        ub = "pointerdown",
        vb = "pointermove pointerup pointercancel";a.MSPointerEvent && (ub = "MSPointerDown", vb = "MSPointerMove MSPointerUp MSPointerCancel"), p(wb, ab, { handler: function handler(a) {
            var b = this.store,
                c = !1,
                d = a.type.toLowerCase().replace("ms", ""),
                e = sb[d],
                f = tb[a.pointerType] || a.pointerType,
                g = f == J,
                h = y(b, a.pointerId, "pointerId");e & O && (0 === a.button || g) ? 0 > h && (b.push(a), h = b.length - 1) : e & (Q | R) && (c = !0), 0 > h || (b[h] = a, this.callback(this.manager, e, { pointers: b, changedPointers: [a], pointerType: f, srcEvent: a }), c && b.splice(h, 1));
        } });var xb = { touchstart: O, touchmove: P, touchend: Q, touchcancel: R },
        yb = "touchstart",
        zb = "touchstart touchmove touchend touchcancel";p(Ab, ab, { handler: function handler(a) {
            var b = xb[a.type];if (b === O && (this.started = !0), this.started) {
                var c = Bb.call(this, a, b);b & (Q | R) && 0 === c[0].length - c[1].length && (this.started = !1), this.callback(this.manager, b, { pointers: c[0], changedPointers: c[1], pointerType: J, srcEvent: a });
            }
        } });var Cb = { touchstart: O, touchmove: P, touchend: Q, touchcancel: R },
        Db = "touchstart touchmove touchend touchcancel";p(Eb, ab, { handler: function handler(a) {
            var b = Cb[a.type],
                c = Fb.call(this, a, b);c && this.callback(this.manager, b, { pointers: c[0], changedPointers: c[1], pointerType: J, srcEvent: a });
        } }), p(Gb, ab, { handler: function handler(a, b, c) {
            var d = c.pointerType == J,
                e = c.pointerType == L;if (d) this.mouse.allow = !1;else if (e && !this.mouse.allow) return;b & (Q | R) && (this.mouse.allow = !0), this.callback(a, b, c);
        }, destroy: function destroy() {
            this.touch.destroy(), this.mouse.destroy();
        } });var Hb = B(f.style, "touchAction"),
        Ib = Hb !== d,
        Jb = "compute",
        Kb = "auto",
        Lb = "manipulation",
        Mb = "none",
        Nb = "pan-x",
        Ob = "pan-y";Pb.prototype = { set: function set(a) {
            a == Jb && (a = this.compute()), Ib && (this.manager.element.style[Hb] = a), this.actions = a.toLowerCase().trim();
        }, update: function update() {
            this.set(this.manager.options.touchAction);
        }, compute: function compute() {
            var a = [];return m(this.manager.recognizers, function (b) {
                r(b.options.enable, [b]) && (a = a.concat(b.getTouchAction()));
            }), Qb(a.join(" "));
        }, preventDefaults: function preventDefaults(a) {
            if (!Ib) {
                var b = a.srcEvent,
                    c = a.offsetDirection;if (this.manager.session.prevented) return b.preventDefault(), void 0;var d = this.actions,
                    e = w(d, Mb),
                    f = w(d, Ob),
                    g = w(d, Nb);return e || f && c & X || g && c & Y ? this.preventSrc(b) : void 0;
            }
        }, preventSrc: function preventSrc(a) {
            this.manager.session.prevented = !0, a.preventDefault();
        } };var Rb = 1,
        Sb = 2,
        Tb = 4,
        Ub = 8,
        Vb = Ub,
        Wb = 16,
        Xb = 32;Yb.prototype = { defaults: {}, set: function set(a) {
            return n(this.options, a), this.manager && this.manager.touchAction.update(), this;
        }, recognizeWith: function recognizeWith(a) {
            if (l(a, "recognizeWith", this)) return this;var b = this.simultaneous;return a = _b(a, this), b[a.id] || (b[a.id] = a, a.recognizeWith(this)), this;
        }, dropRecognizeWith: function dropRecognizeWith(a) {
            return l(a, "dropRecognizeWith", this) ? this : (a = _b(a, this), delete this.simultaneous[a.id], this);
        }, requireFailure: function requireFailure(a) {
            if (l(a, "requireFailure", this)) return this;var b = this.requireFail;return a = _b(a, this), -1 === y(b, a) && (b.push(a), a.requireFailure(this)), this;
        }, dropRequireFailure: function dropRequireFailure(a) {
            if (l(a, "dropRequireFailure", this)) return this;a = _b(a, this);var b = y(this.requireFail, a);return b > -1 && this.requireFail.splice(b, 1), this;
        }, hasRequireFailures: function hasRequireFailures() {
            return this.requireFail.length > 0;
        }, canRecognizeWith: function canRecognizeWith(a) {
            return !!this.simultaneous[a.id];
        }, emit: function emit(a) {
            function d(d) {
                b.manager.emit(b.options.event + (d ? Zb(c) : ""), a);
            }var b = this,
                c = this.state;Ub > c && d(!0), d(), c >= Ub && d(!0);
        }, tryEmit: function tryEmit(a) {
            return this.canEmit() ? this.emit(a) : (this.state = Xb, void 0);
        }, canEmit: function canEmit() {
            for (var a = 0; a < this.requireFail.length;) {
                if (!(this.requireFail[a].state & (Xb | Rb))) return !1;a++;
            }return !0;
        }, recognize: function recognize(a) {
            var b = n({}, a);return r(this.options.enable, [this, b]) ? (this.state & (Vb | Wb | Xb) && (this.state = Rb), this.state = this.process(b), this.state & (Sb | Tb | Ub | Wb) && this.tryEmit(b), void 0) : (this.reset(), this.state = Xb, void 0);
        }, process: function process() {}, getTouchAction: function getTouchAction() {}, reset: function reset() {} }, p(ac, Yb, { defaults: { pointers: 1 }, attrTest: function attrTest(a) {
            var b = this.options.pointers;return 0 === b || a.pointers.length === b;
        }, process: function process(a) {
            var b = this.state,
                c = a.eventType,
                d = b & (Sb | Tb),
                e = this.attrTest(a);return d && (c & R || !e) ? b | Wb : d || e ? c & Q ? b | Ub : b & Sb ? b | Tb : Sb : Xb;
        } }), p(bc, ac, { defaults: { event: "pan", threshold: 10, pointers: 1, direction: Z }, getTouchAction: function getTouchAction() {
            var a = this.options.direction,
                b = [];return a & X && b.push(Ob), a & Y && b.push(Nb), b;
        }, directionTest: function directionTest(a) {
            var b = this.options,
                c = !0,
                d = a.distance,
                e = a.direction,
                f = a.deltaX,
                g = a.deltaY;return e & b.direction || (b.direction & X ? (e = 0 === f ? S : 0 > f ? T : U, c = f != this.pX, d = Math.abs(a.deltaX)) : (e = 0 === g ? S : 0 > g ? V : W, c = g != this.pY, d = Math.abs(a.deltaY))), a.direction = e, c && d > b.threshold && e & b.direction;
        }, attrTest: function attrTest(a) {
            return ac.prototype.attrTest.call(this, a) && (this.state & Sb || !(this.state & Sb) && this.directionTest(a));
        }, emit: function emit(a) {
            this.pX = a.deltaX, this.pY = a.deltaY;var b = $b(a.direction);b && this.manager.emit(this.options.event + b, a), this._super.emit.call(this, a);
        } }), p(cc, ac, { defaults: { event: "pinch", threshold: 0, pointers: 2 }, getTouchAction: function getTouchAction() {
            return [Mb];
        }, attrTest: function attrTest(a) {
            return this._super.attrTest.call(this, a) && (Math.abs(a.scale - 1) > this.options.threshold || this.state & Sb);
        }, emit: function emit(a) {
            if (this._super.emit.call(this, a), 1 !== a.scale) {
                var b = a.scale < 1 ? "in" : "out";this.manager.emit(this.options.event + b, a);
            }
        } }), p(dc, Yb, { defaults: { event: "press", pointers: 1, time: 500, threshold: 5 }, getTouchAction: function getTouchAction() {
            return [Kb];
        }, process: function process(a) {
            var b = this.options,
                c = a.pointers.length === b.pointers,
                d = a.distance < b.threshold,
                e = a.deltaTime > b.time;if (this._input = a, !d || !c || a.eventType & (Q | R) && !e) this.reset();else if (a.eventType & O) this.reset(), this._timer = k(function () {
                this.state = Vb, this.tryEmit();
            }, b.time, this);else if (a.eventType & Q) return Vb;return Xb;
        }, reset: function reset() {
            clearTimeout(this._timer);
        }, emit: function emit(a) {
            this.state === Vb && (a && a.eventType & Q ? this.manager.emit(this.options.event + "up", a) : (this._input.timeStamp = j(), this.manager.emit(this.options.event, this._input)));
        } }), p(ec, ac, { defaults: { event: "rotate", threshold: 0, pointers: 2 }, getTouchAction: function getTouchAction() {
            return [Mb];
        }, attrTest: function attrTest(a) {
            return this._super.attrTest.call(this, a) && (Math.abs(a.rotation) > this.options.threshold || this.state & Sb);
        } }), p(fc, ac, { defaults: { event: "swipe", threshold: 10, velocity: .65, direction: X | Y, pointers: 1 }, getTouchAction: function getTouchAction() {
            return bc.prototype.getTouchAction.call(this);
        }, attrTest: function attrTest(a) {
            var c,
                b = this.options.direction;return b & (X | Y) ? c = a.velocity : b & X ? c = a.velocityX : b & Y && (c = a.velocityY), this._super.attrTest.call(this, a) && b & a.direction && a.distance > this.options.threshold && i(c) > this.options.velocity && a.eventType & Q;
        }, emit: function emit(a) {
            var b = $b(a.direction);b && this.manager.emit(this.options.event + b, a), this.manager.emit(this.options.event, a);
        } }), p(gc, Yb, { defaults: { event: "tap", pointers: 1, taps: 1, interval: 300, time: 250, threshold: 2, posThreshold: 10 }, getTouchAction: function getTouchAction() {
            return [Lb];
        }, process: function process(a) {
            var b = this.options,
                c = a.pointers.length === b.pointers,
                d = a.distance < b.threshold,
                e = a.deltaTime < b.time;if (this.reset(), a.eventType & O && 0 === this.count) return this.failTimeout();if (d && e && c) {
                if (a.eventType != Q) return this.failTimeout();var f = this.pTime ? a.timeStamp - this.pTime < b.interval : !0,
                    g = !this.pCenter || kb(this.pCenter, a.center) < b.posThreshold;this.pTime = a.timeStamp, this.pCenter = a.center, g && f ? this.count += 1 : this.count = 1, this._input = a;var h = this.count % b.taps;if (0 === h) return this.hasRequireFailures() ? (this._timer = k(function () {
                    this.state = Vb, this.tryEmit();
                }, b.interval, this), Sb) : Vb;
            }return Xb;
        }, failTimeout: function failTimeout() {
            return this._timer = k(function () {
                this.state = Xb;
            }, this.options.interval, this), Xb;
        }, reset: function reset() {
            clearTimeout(this._timer);
        }, emit: function emit() {
            this.state == Vb && (this._input.tapCount = this.count, this.manager.emit(this.options.event, this._input));
        } }), hc.VERSION = "2.0.4", hc.defaults = { domEvents: !1, touchAction: Jb, enable: !0, inputTarget: null, inputClass: null, preset: [[ec, { enable: !1 }], [cc, { enable: !1 }, ["rotate"]], [fc, { direction: X }], [bc, { direction: X }, ["swipe"]], [gc], [gc, { event: "doubletap", taps: 2 }, ["tap"]], [dc]], cssProps: { userSelect: "default", touchSelect: "none", touchCallout: "none", contentZooming: "none", userDrag: "none", tapHighlightColor: "rgba(0,0,0,0)" } };var ic = 1,
        jc = 2;kc.prototype = { set: function set(a) {
            return n(this.options, a), a.touchAction && this.touchAction.update(), a.inputTarget && (this.input.destroy(), this.input.target = a.inputTarget, this.input.init()), this;
        }, stop: function stop(a) {
            this.session.stopped = a ? jc : ic;
        }, recognize: function recognize(a) {
            var b = this.session;if (!b.stopped) {
                this.touchAction.preventDefaults(a);var c,
                    d = this.recognizers,
                    e = b.curRecognizer;(!e || e && e.state & Vb) && (e = b.curRecognizer = null);for (var f = 0; f < d.length;) {
                    c = d[f], b.stopped === jc || e && c != e && !c.canRecognizeWith(e) ? c.reset() : c.recognize(a), !e && c.state & (Sb | Tb | Ub) && (e = b.curRecognizer = c), f++;
                }
            }
        }, get: function get(a) {
            if (a instanceof Yb) return a;for (var b = this.recognizers, c = 0; c < b.length; c++) {
                if (b[c].options.event == a) return b[c];
            }return null;
        }, add: function add(a) {
            if (l(a, "add", this)) return this;var b = this.get(a.options.event);return b && this.remove(b), this.recognizers.push(a), a.manager = this, this.touchAction.update(), a;
        }, remove: function remove(a) {
            if (l(a, "remove", this)) return this;var b = this.recognizers;return a = this.get(a), b.splice(y(b, a), 1), this.touchAction.update(), this;
        }, on: function on(a, b) {
            var c = this.handlers;return m(x(a), function (a) {
                c[a] = c[a] || [], c[a].push(b);
            }), this;
        }, off: function off(a, b) {
            var c = this.handlers;return m(x(a), function (a) {
                b ? c[a].splice(y(c[a], b), 1) : delete c[a];
            }), this;
        }, emit: function emit(a, b) {
            this.options.domEvents && mc(a, b);var c = this.handlers[a] && this.handlers[a].slice();if (c && c.length) {
                b.type = a, b.preventDefault = function () {
                    b.srcEvent.preventDefault();
                };for (var d = 0; d < c.length;) {
                    c[d](b), d++;
                }
            }
        }, destroy: function destroy() {
            this.element && lc(this, !1), this.handlers = {}, this.session = {}, this.input.destroy(), this.element = null;
        } }, n(hc, { INPUT_START: O, INPUT_MOVE: P, INPUT_END: Q, INPUT_CANCEL: R, STATE_POSSIBLE: Rb, STATE_BEGAN: Sb, STATE_CHANGED: Tb, STATE_ENDED: Ub, STATE_RECOGNIZED: Vb, STATE_CANCELLED: Wb, STATE_FAILED: Xb, DIRECTION_NONE: S, DIRECTION_LEFT: T, DIRECTION_RIGHT: U, DIRECTION_UP: V, DIRECTION_DOWN: W, DIRECTION_HORIZONTAL: X, DIRECTION_VERTICAL: Y, DIRECTION_ALL: Z, Manager: kc, Input: ab, TouchAction: Pb, TouchInput: Eb, MouseInput: rb, PointerEventInput: wb, TouchMouseInput: Gb, SingleTouchInput: Ab, Recognizer: Yb, AttrRecognizer: ac, Tap: gc, Pan: bc, Swipe: fc, Pinch: cc, Rotate: ec, Press: dc, on: t, off: u, each: m, merge: o, extend: n, inherit: p, bindFn: q, prefixed: B }), ( false ? 'undefined' : _typeof(__webpack_require__(29))) == g && __webpack_require__(4) ? !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {
        return hc;
    }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : "undefined" != typeof module && module.exports ? module.exports = hc : a[c] = hc;
}(window, document, "Hammer");;(function (factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(8), __webpack_require__(30)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object') {
        factory(require('jquery'), require('hammerjs'));
    } else {
        factory(jQuery, Hammer);
    }
})(function ($, Hammer) {
    function hammerify(el, options) {
        var $el = $(el);
        if (!$el.data("hammer")) {
            $el.data("hammer", new Hammer($el[0], options));
        }
    }

    $.fn.hammer = function (options) {
        return this.each(function () {
            hammerify(this, options);
        });
    };

    // extend the emit method to also trigger jQuery events
    Hammer.Manager.prototype.emit = function (originalEmit) {
        return function (type, data) {
            originalEmit.call(this, type, data);
            $(this.element).trigger({
                type: type,
                gesture: data
            });
        };
    }(Hammer.Manager.prototype.emit);
});

var methods = {
    init: function init() {
        return this.each(function () {

            // For each set of tabs, we want to keep track of
            // which tab is active and its associated content
            var $this = $(this),
                window_width = $(window).width();

            $this.width('100%');
            // Set Tab Width for each tab
            var $num_tabs = $(this).children('li').length;
            $this.children('li').each(function () {
                $(this).width(100 / $num_tabs + '%');
            });
            var $active,
                $content,
                $links = $this.find('li.tab a'),
                $tabs_width = $this.width(),
                $tab_width = $this.find('li').first().outerWidth(),
                $index = 0;

            // If the location.hash matches one of the links, use that as the active tab.
            $active = $($links.filter('[href="' + location.hash + '"]'));

            // If no match is found, use the first link or any with class 'active' as the initial active tab.
            if ($active.length === 0) {
                $active = $(this).find('li.tab a.active').first();
            }
            if ($active.length === 0) {
                $active = $(this).find('li.tab a').first();
            }

            $active.addClass('active');
            $index = $links.index($active);
            if ($index < 0) {
                $index = 0;
            }

            $content = $($active[0].hash);

            // append indicator then set indicator width to tab width
            $this.append('<div class="indicator"></div>');
            var $indicator = $this.find('.indicator');
            if ($this.is(":visible")) {
                $indicator.css({ "right": $tabs_width - ($index + 1) * $tab_width });
                $indicator.css({ "left": $index * $tab_width });
            }
            $(window).resize(function () {
                $tabs_width = $this.width();
                $tab_width = $this.find('li').first().outerWidth();
                if ($index < 0) {
                    $index = 0;
                }
                if ($tab_width !== 0 && $tabs_width !== 0) {
                    $indicator.css({ "right": $tabs_width - ($index + 1) * $tab_width });
                    $indicator.css({ "left": $index * $tab_width });
                }
            });

            // Hide the remaining content
            $links.not($active).each(function () {
                $(this.hash).hide();
            });

            // Bind the click event handler
            $this.on('click', 'a', function (e) {
                $tabs_width = $this.width();
                $tab_width = $this.find('li').first().outerWidth();

                // Make the old tab inactive.
                $active.removeClass('active');
                $content.hide();

                // Update the variables with the new link and content
                $active = $(this);
                $content = $(this.hash);
                $links = $this.find('li.tab a');

                // Make the tab active.
                $active.addClass('active');
                var $prev_index = $index;
                $index = $links.index($(this));
                if ($index < 0) {
                    $index = 0;
                }
                // Change url to current tab
                // window.location.hash = $active.attr('href');

                $content.show();

                // Update indicator
                if ($index - $prev_index >= 0) {
                    $indicator.velocity({ "right": $tabs_width - ($index + 1) * $tab_width }, { duration: 300, queue: false, easing: 'easeOutQuad' });
                    $indicator.velocity({ "left": $index * $tab_width }, { duration: 300, queue: false, easing: 'easeOutQuad', delay: 90 });
                } else {
                    $indicator.velocity({ "left": $index * $tab_width }, { duration: 300, queue: false, easing: 'easeOutQuad' });
                    $indicator.velocity({ "right": $tabs_width - ($index + 1) * $tab_width }, { duration: 300, queue: false, easing: 'easeOutQuad', delay: 90 });
                }

                // Prevent the anchor's default click action
                e.preventDefault();
            });
        });
    },
    select_tab: function select_tab(id) {
        this.find('a[href="#' + id + '"]').trigger('click');
    }
};

$.fn.tabs = function (methodOrOptions) {
    if (methods[methodOrOptions]) {
        return methods[methodOrOptions].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if ((typeof methodOrOptions === 'undefined' ? 'undefined' : _typeof(methodOrOptions)) === 'object' || !methodOrOptions) {
        // Default to "init"
        return methods.init.apply(this, arguments);
    } else {
        $.error('Method ' + methodOrOptions + ' does not exist on jQuery.tooltip');
    }
};

$(document).ready(function () {
    $('ul.tabs').tabs();
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(28)(module)))

/***/ }),
/* 28 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 29 */
/***/ (function(module, exports) {

module.exports = function() {
	throw new Error("define cannot be used indirect");
};


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/*! Hammer.JS - v2.0.7 - 2016-04-22
 * http://hammerjs.github.io/
 *
 * Copyright (c) 2016 Jorik Tangelder;
 * Licensed under the MIT license */
(function(window, document, exportName, undefined) {
  'use strict';

var VENDOR_PREFIXES = ['', 'webkit', 'Moz', 'MS', 'ms', 'o'];
var TEST_ELEMENT = document.createElement('div');

var TYPE_FUNCTION = 'function';

var round = Math.round;
var abs = Math.abs;
var now = Date.now;

/**
 * set a timeout with a given scope
 * @param {Function} fn
 * @param {Number} timeout
 * @param {Object} context
 * @returns {number}
 */
function setTimeoutContext(fn, timeout, context) {
    return setTimeout(bindFn(fn, context), timeout);
}

/**
 * if the argument is an array, we want to execute the fn on each entry
 * if it aint an array we don't want to do a thing.
 * this is used by all the methods that accept a single and array argument.
 * @param {*|Array} arg
 * @param {String} fn
 * @param {Object} [context]
 * @returns {Boolean}
 */
function invokeArrayArg(arg, fn, context) {
    if (Array.isArray(arg)) {
        each(arg, context[fn], context);
        return true;
    }
    return false;
}

/**
 * walk objects and arrays
 * @param {Object} obj
 * @param {Function} iterator
 * @param {Object} context
 */
function each(obj, iterator, context) {
    var i;

    if (!obj) {
        return;
    }

    if (obj.forEach) {
        obj.forEach(iterator, context);
    } else if (obj.length !== undefined) {
        i = 0;
        while (i < obj.length) {
            iterator.call(context, obj[i], i, obj);
            i++;
        }
    } else {
        for (i in obj) {
            obj.hasOwnProperty(i) && iterator.call(context, obj[i], i, obj);
        }
    }
}

/**
 * wrap a method with a deprecation warning and stack trace
 * @param {Function} method
 * @param {String} name
 * @param {String} message
 * @returns {Function} A new function wrapping the supplied method.
 */
function deprecate(method, name, message) {
    var deprecationMessage = 'DEPRECATED METHOD: ' + name + '\n' + message + ' AT \n';
    return function() {
        var e = new Error('get-stack-trace');
        var stack = e && e.stack ? e.stack.replace(/^[^\(]+?[\n$]/gm, '')
            .replace(/^\s+at\s+/gm, '')
            .replace(/^Object.<anonymous>\s*\(/gm, '{anonymous}()@') : 'Unknown Stack Trace';

        var log = window.console && (window.console.warn || window.console.log);
        if (log) {
            log.call(window.console, deprecationMessage, stack);
        }
        return method.apply(this, arguments);
    };
}

/**
 * extend object.
 * means that properties in dest will be overwritten by the ones in src.
 * @param {Object} target
 * @param {...Object} objects_to_assign
 * @returns {Object} target
 */
var assign;
if (typeof Object.assign !== 'function') {
    assign = function assign(target) {
        if (target === undefined || target === null) {
            throw new TypeError('Cannot convert undefined or null to object');
        }

        var output = Object(target);
        for (var index = 1; index < arguments.length; index++) {
            var source = arguments[index];
            if (source !== undefined && source !== null) {
                for (var nextKey in source) {
                    if (source.hasOwnProperty(nextKey)) {
                        output[nextKey] = source[nextKey];
                    }
                }
            }
        }
        return output;
    };
} else {
    assign = Object.assign;
}

/**
 * extend object.
 * means that properties in dest will be overwritten by the ones in src.
 * @param {Object} dest
 * @param {Object} src
 * @param {Boolean} [merge=false]
 * @returns {Object} dest
 */
var extend = deprecate(function extend(dest, src, merge) {
    var keys = Object.keys(src);
    var i = 0;
    while (i < keys.length) {
        if (!merge || (merge && dest[keys[i]] === undefined)) {
            dest[keys[i]] = src[keys[i]];
        }
        i++;
    }
    return dest;
}, 'extend', 'Use `assign`.');

/**
 * merge the values from src in the dest.
 * means that properties that exist in dest will not be overwritten by src
 * @param {Object} dest
 * @param {Object} src
 * @returns {Object} dest
 */
var merge = deprecate(function merge(dest, src) {
    return extend(dest, src, true);
}, 'merge', 'Use `assign`.');

/**
 * simple class inheritance
 * @param {Function} child
 * @param {Function} base
 * @param {Object} [properties]
 */
function inherit(child, base, properties) {
    var baseP = base.prototype,
        childP;

    childP = child.prototype = Object.create(baseP);
    childP.constructor = child;
    childP._super = baseP;

    if (properties) {
        assign(childP, properties);
    }
}

/**
 * simple function bind
 * @param {Function} fn
 * @param {Object} context
 * @returns {Function}
 */
function bindFn(fn, context) {
    return function boundFn() {
        return fn.apply(context, arguments);
    };
}

/**
 * let a boolean value also be a function that must return a boolean
 * this first item in args will be used as the context
 * @param {Boolean|Function} val
 * @param {Array} [args]
 * @returns {Boolean}
 */
function boolOrFn(val, args) {
    if (typeof val == TYPE_FUNCTION) {
        return val.apply(args ? args[0] || undefined : undefined, args);
    }
    return val;
}

/**
 * use the val2 when val1 is undefined
 * @param {*} val1
 * @param {*} val2
 * @returns {*}
 */
function ifUndefined(val1, val2) {
    return (val1 === undefined) ? val2 : val1;
}

/**
 * addEventListener with multiple events at once
 * @param {EventTarget} target
 * @param {String} types
 * @param {Function} handler
 */
function addEventListeners(target, types, handler) {
    each(splitStr(types), function(type) {
        target.addEventListener(type, handler, false);
    });
}

/**
 * removeEventListener with multiple events at once
 * @param {EventTarget} target
 * @param {String} types
 * @param {Function} handler
 */
function removeEventListeners(target, types, handler) {
    each(splitStr(types), function(type) {
        target.removeEventListener(type, handler, false);
    });
}

/**
 * find if a node is in the given parent
 * @method hasParent
 * @param {HTMLElement} node
 * @param {HTMLElement} parent
 * @return {Boolean} found
 */
function hasParent(node, parent) {
    while (node) {
        if (node == parent) {
            return true;
        }
        node = node.parentNode;
    }
    return false;
}

/**
 * small indexOf wrapper
 * @param {String} str
 * @param {String} find
 * @returns {Boolean} found
 */
function inStr(str, find) {
    return str.indexOf(find) > -1;
}

/**
 * split string on whitespace
 * @param {String} str
 * @returns {Array} words
 */
function splitStr(str) {
    return str.trim().split(/\s+/g);
}

/**
 * find if a array contains the object using indexOf or a simple polyFill
 * @param {Array} src
 * @param {String} find
 * @param {String} [findByKey]
 * @return {Boolean|Number} false when not found, or the index
 */
function inArray(src, find, findByKey) {
    if (src.indexOf && !findByKey) {
        return src.indexOf(find);
    } else {
        var i = 0;
        while (i < src.length) {
            if ((findByKey && src[i][findByKey] == find) || (!findByKey && src[i] === find)) {
                return i;
            }
            i++;
        }
        return -1;
    }
}

/**
 * convert array-like objects to real arrays
 * @param {Object} obj
 * @returns {Array}
 */
function toArray(obj) {
    return Array.prototype.slice.call(obj, 0);
}

/**
 * unique array with objects based on a key (like 'id') or just by the array's value
 * @param {Array} src [{id:1},{id:2},{id:1}]
 * @param {String} [key]
 * @param {Boolean} [sort=False]
 * @returns {Array} [{id:1},{id:2}]
 */
function uniqueArray(src, key, sort) {
    var results = [];
    var values = [];
    var i = 0;

    while (i < src.length) {
        var val = key ? src[i][key] : src[i];
        if (inArray(values, val) < 0) {
            results.push(src[i]);
        }
        values[i] = val;
        i++;
    }

    if (sort) {
        if (!key) {
            results = results.sort();
        } else {
            results = results.sort(function sortUniqueArray(a, b) {
                return a[key] > b[key];
            });
        }
    }

    return results;
}

/**
 * get the prefixed property
 * @param {Object} obj
 * @param {String} property
 * @returns {String|Undefined} prefixed
 */
function prefixed(obj, property) {
    var prefix, prop;
    var camelProp = property[0].toUpperCase() + property.slice(1);

    var i = 0;
    while (i < VENDOR_PREFIXES.length) {
        prefix = VENDOR_PREFIXES[i];
        prop = (prefix) ? prefix + camelProp : property;

        if (prop in obj) {
            return prop;
        }
        i++;
    }
    return undefined;
}

/**
 * get a unique id
 * @returns {number} uniqueId
 */
var _uniqueId = 1;
function uniqueId() {
    return _uniqueId++;
}

/**
 * get the window object of an element
 * @param {HTMLElement} element
 * @returns {DocumentView|Window}
 */
function getWindowForElement(element) {
    var doc = element.ownerDocument || element;
    return (doc.defaultView || doc.parentWindow || window);
}

var MOBILE_REGEX = /mobile|tablet|ip(ad|hone|od)|android/i;

var SUPPORT_TOUCH = ('ontouchstart' in window);
var SUPPORT_POINTER_EVENTS = prefixed(window, 'PointerEvent') !== undefined;
var SUPPORT_ONLY_TOUCH = SUPPORT_TOUCH && MOBILE_REGEX.test(navigator.userAgent);

var INPUT_TYPE_TOUCH = 'touch';
var INPUT_TYPE_PEN = 'pen';
var INPUT_TYPE_MOUSE = 'mouse';
var INPUT_TYPE_KINECT = 'kinect';

var COMPUTE_INTERVAL = 25;

var INPUT_START = 1;
var INPUT_MOVE = 2;
var INPUT_END = 4;
var INPUT_CANCEL = 8;

var DIRECTION_NONE = 1;
var DIRECTION_LEFT = 2;
var DIRECTION_RIGHT = 4;
var DIRECTION_UP = 8;
var DIRECTION_DOWN = 16;

var DIRECTION_HORIZONTAL = DIRECTION_LEFT | DIRECTION_RIGHT;
var DIRECTION_VERTICAL = DIRECTION_UP | DIRECTION_DOWN;
var DIRECTION_ALL = DIRECTION_HORIZONTAL | DIRECTION_VERTICAL;

var PROPS_XY = ['x', 'y'];
var PROPS_CLIENT_XY = ['clientX', 'clientY'];

/**
 * create new input type manager
 * @param {Manager} manager
 * @param {Function} callback
 * @returns {Input}
 * @constructor
 */
function Input(manager, callback) {
    var self = this;
    this.manager = manager;
    this.callback = callback;
    this.element = manager.element;
    this.target = manager.options.inputTarget;

    // smaller wrapper around the handler, for the scope and the enabled state of the manager,
    // so when disabled the input events are completely bypassed.
    this.domHandler = function(ev) {
        if (boolOrFn(manager.options.enable, [manager])) {
            self.handler(ev);
        }
    };

    this.init();

}

Input.prototype = {
    /**
     * should handle the inputEvent data and trigger the callback
     * @virtual
     */
    handler: function() { },

    /**
     * bind the events
     */
    init: function() {
        this.evEl && addEventListeners(this.element, this.evEl, this.domHandler);
        this.evTarget && addEventListeners(this.target, this.evTarget, this.domHandler);
        this.evWin && addEventListeners(getWindowForElement(this.element), this.evWin, this.domHandler);
    },

    /**
     * unbind the events
     */
    destroy: function() {
        this.evEl && removeEventListeners(this.element, this.evEl, this.domHandler);
        this.evTarget && removeEventListeners(this.target, this.evTarget, this.domHandler);
        this.evWin && removeEventListeners(getWindowForElement(this.element), this.evWin, this.domHandler);
    }
};

/**
 * create new input type manager
 * called by the Manager constructor
 * @param {Hammer} manager
 * @returns {Input}
 */
function createInputInstance(manager) {
    var Type;
    var inputClass = manager.options.inputClass;

    if (inputClass) {
        Type = inputClass;
    } else if (SUPPORT_POINTER_EVENTS) {
        Type = PointerEventInput;
    } else if (SUPPORT_ONLY_TOUCH) {
        Type = TouchInput;
    } else if (!SUPPORT_TOUCH) {
        Type = MouseInput;
    } else {
        Type = TouchMouseInput;
    }
    return new (Type)(manager, inputHandler);
}

/**
 * handle input events
 * @param {Manager} manager
 * @param {String} eventType
 * @param {Object} input
 */
function inputHandler(manager, eventType, input) {
    var pointersLen = input.pointers.length;
    var changedPointersLen = input.changedPointers.length;
    var isFirst = (eventType & INPUT_START && (pointersLen - changedPointersLen === 0));
    var isFinal = (eventType & (INPUT_END | INPUT_CANCEL) && (pointersLen - changedPointersLen === 0));

    input.isFirst = !!isFirst;
    input.isFinal = !!isFinal;

    if (isFirst) {
        manager.session = {};
    }

    // source event is the normalized value of the domEvents
    // like 'touchstart, mouseup, pointerdown'
    input.eventType = eventType;

    // compute scale, rotation etc
    computeInputData(manager, input);

    // emit secret event
    manager.emit('hammer.input', input);

    manager.recognize(input);
    manager.session.prevInput = input;
}

/**
 * extend the data with some usable properties like scale, rotate, velocity etc
 * @param {Object} manager
 * @param {Object} input
 */
function computeInputData(manager, input) {
    var session = manager.session;
    var pointers = input.pointers;
    var pointersLength = pointers.length;

    // store the first input to calculate the distance and direction
    if (!session.firstInput) {
        session.firstInput = simpleCloneInputData(input);
    }

    // to compute scale and rotation we need to store the multiple touches
    if (pointersLength > 1 && !session.firstMultiple) {
        session.firstMultiple = simpleCloneInputData(input);
    } else if (pointersLength === 1) {
        session.firstMultiple = false;
    }

    var firstInput = session.firstInput;
    var firstMultiple = session.firstMultiple;
    var offsetCenter = firstMultiple ? firstMultiple.center : firstInput.center;

    var center = input.center = getCenter(pointers);
    input.timeStamp = now();
    input.deltaTime = input.timeStamp - firstInput.timeStamp;

    input.angle = getAngle(offsetCenter, center);
    input.distance = getDistance(offsetCenter, center);

    computeDeltaXY(session, input);
    input.offsetDirection = getDirection(input.deltaX, input.deltaY);

    var overallVelocity = getVelocity(input.deltaTime, input.deltaX, input.deltaY);
    input.overallVelocityX = overallVelocity.x;
    input.overallVelocityY = overallVelocity.y;
    input.overallVelocity = (abs(overallVelocity.x) > abs(overallVelocity.y)) ? overallVelocity.x : overallVelocity.y;

    input.scale = firstMultiple ? getScale(firstMultiple.pointers, pointers) : 1;
    input.rotation = firstMultiple ? getRotation(firstMultiple.pointers, pointers) : 0;

    input.maxPointers = !session.prevInput ? input.pointers.length : ((input.pointers.length >
        session.prevInput.maxPointers) ? input.pointers.length : session.prevInput.maxPointers);

    computeIntervalInputData(session, input);

    // find the correct target
    var target = manager.element;
    if (hasParent(input.srcEvent.target, target)) {
        target = input.srcEvent.target;
    }
    input.target = target;
}

function computeDeltaXY(session, input) {
    var center = input.center;
    var offset = session.offsetDelta || {};
    var prevDelta = session.prevDelta || {};
    var prevInput = session.prevInput || {};

    if (input.eventType === INPUT_START || prevInput.eventType === INPUT_END) {
        prevDelta = session.prevDelta = {
            x: prevInput.deltaX || 0,
            y: prevInput.deltaY || 0
        };

        offset = session.offsetDelta = {
            x: center.x,
            y: center.y
        };
    }

    input.deltaX = prevDelta.x + (center.x - offset.x);
    input.deltaY = prevDelta.y + (center.y - offset.y);
}

/**
 * velocity is calculated every x ms
 * @param {Object} session
 * @param {Object} input
 */
function computeIntervalInputData(session, input) {
    var last = session.lastInterval || input,
        deltaTime = input.timeStamp - last.timeStamp,
        velocity, velocityX, velocityY, direction;

    if (input.eventType != INPUT_CANCEL && (deltaTime > COMPUTE_INTERVAL || last.velocity === undefined)) {
        var deltaX = input.deltaX - last.deltaX;
        var deltaY = input.deltaY - last.deltaY;

        var v = getVelocity(deltaTime, deltaX, deltaY);
        velocityX = v.x;
        velocityY = v.y;
        velocity = (abs(v.x) > abs(v.y)) ? v.x : v.y;
        direction = getDirection(deltaX, deltaY);

        session.lastInterval = input;
    } else {
        // use latest velocity info if it doesn't overtake a minimum period
        velocity = last.velocity;
        velocityX = last.velocityX;
        velocityY = last.velocityY;
        direction = last.direction;
    }

    input.velocity = velocity;
    input.velocityX = velocityX;
    input.velocityY = velocityY;
    input.direction = direction;
}

/**
 * create a simple clone from the input used for storage of firstInput and firstMultiple
 * @param {Object} input
 * @returns {Object} clonedInputData
 */
function simpleCloneInputData(input) {
    // make a simple copy of the pointers because we will get a reference if we don't
    // we only need clientXY for the calculations
    var pointers = [];
    var i = 0;
    while (i < input.pointers.length) {
        pointers[i] = {
            clientX: round(input.pointers[i].clientX),
            clientY: round(input.pointers[i].clientY)
        };
        i++;
    }

    return {
        timeStamp: now(),
        pointers: pointers,
        center: getCenter(pointers),
        deltaX: input.deltaX,
        deltaY: input.deltaY
    };
}

/**
 * get the center of all the pointers
 * @param {Array} pointers
 * @return {Object} center contains `x` and `y` properties
 */
function getCenter(pointers) {
    var pointersLength = pointers.length;

    // no need to loop when only one touch
    if (pointersLength === 1) {
        return {
            x: round(pointers[0].clientX),
            y: round(pointers[0].clientY)
        };
    }

    var x = 0, y = 0, i = 0;
    while (i < pointersLength) {
        x += pointers[i].clientX;
        y += pointers[i].clientY;
        i++;
    }

    return {
        x: round(x / pointersLength),
        y: round(y / pointersLength)
    };
}

/**
 * calculate the velocity between two points. unit is in px per ms.
 * @param {Number} deltaTime
 * @param {Number} x
 * @param {Number} y
 * @return {Object} velocity `x` and `y`
 */
function getVelocity(deltaTime, x, y) {
    return {
        x: x / deltaTime || 0,
        y: y / deltaTime || 0
    };
}

/**
 * get the direction between two points
 * @param {Number} x
 * @param {Number} y
 * @return {Number} direction
 */
function getDirection(x, y) {
    if (x === y) {
        return DIRECTION_NONE;
    }

    if (abs(x) >= abs(y)) {
        return x < 0 ? DIRECTION_LEFT : DIRECTION_RIGHT;
    }
    return y < 0 ? DIRECTION_UP : DIRECTION_DOWN;
}

/**
 * calculate the absolute distance between two points
 * @param {Object} p1 {x, y}
 * @param {Object} p2 {x, y}
 * @param {Array} [props] containing x and y keys
 * @return {Number} distance
 */
function getDistance(p1, p2, props) {
    if (!props) {
        props = PROPS_XY;
    }
    var x = p2[props[0]] - p1[props[0]],
        y = p2[props[1]] - p1[props[1]];

    return Math.sqrt((x * x) + (y * y));
}

/**
 * calculate the angle between two coordinates
 * @param {Object} p1
 * @param {Object} p2
 * @param {Array} [props] containing x and y keys
 * @return {Number} angle
 */
function getAngle(p1, p2, props) {
    if (!props) {
        props = PROPS_XY;
    }
    var x = p2[props[0]] - p1[props[0]],
        y = p2[props[1]] - p1[props[1]];
    return Math.atan2(y, x) * 180 / Math.PI;
}

/**
 * calculate the rotation degrees between two pointersets
 * @param {Array} start array of pointers
 * @param {Array} end array of pointers
 * @return {Number} rotation
 */
function getRotation(start, end) {
    return getAngle(end[1], end[0], PROPS_CLIENT_XY) + getAngle(start[1], start[0], PROPS_CLIENT_XY);
}

/**
 * calculate the scale factor between two pointersets
 * no scale is 1, and goes down to 0 when pinched together, and bigger when pinched out
 * @param {Array} start array of pointers
 * @param {Array} end array of pointers
 * @return {Number} scale
 */
function getScale(start, end) {
    return getDistance(end[0], end[1], PROPS_CLIENT_XY) / getDistance(start[0], start[1], PROPS_CLIENT_XY);
}

var MOUSE_INPUT_MAP = {
    mousedown: INPUT_START,
    mousemove: INPUT_MOVE,
    mouseup: INPUT_END
};

var MOUSE_ELEMENT_EVENTS = 'mousedown';
var MOUSE_WINDOW_EVENTS = 'mousemove mouseup';

/**
 * Mouse events input
 * @constructor
 * @extends Input
 */
function MouseInput() {
    this.evEl = MOUSE_ELEMENT_EVENTS;
    this.evWin = MOUSE_WINDOW_EVENTS;

    this.pressed = false; // mousedown state

    Input.apply(this, arguments);
}

inherit(MouseInput, Input, {
    /**
     * handle mouse events
     * @param {Object} ev
     */
    handler: function MEhandler(ev) {
        var eventType = MOUSE_INPUT_MAP[ev.type];

        // on start we want to have the left mouse button down
        if (eventType & INPUT_START && ev.button === 0) {
            this.pressed = true;
        }

        if (eventType & INPUT_MOVE && ev.which !== 1) {
            eventType = INPUT_END;
        }

        // mouse must be down
        if (!this.pressed) {
            return;
        }

        if (eventType & INPUT_END) {
            this.pressed = false;
        }

        this.callback(this.manager, eventType, {
            pointers: [ev],
            changedPointers: [ev],
            pointerType: INPUT_TYPE_MOUSE,
            srcEvent: ev
        });
    }
});

var POINTER_INPUT_MAP = {
    pointerdown: INPUT_START,
    pointermove: INPUT_MOVE,
    pointerup: INPUT_END,
    pointercancel: INPUT_CANCEL,
    pointerout: INPUT_CANCEL
};

// in IE10 the pointer types is defined as an enum
var IE10_POINTER_TYPE_ENUM = {
    2: INPUT_TYPE_TOUCH,
    3: INPUT_TYPE_PEN,
    4: INPUT_TYPE_MOUSE,
    5: INPUT_TYPE_KINECT // see https://twitter.com/jacobrossi/status/480596438489890816
};

var POINTER_ELEMENT_EVENTS = 'pointerdown';
var POINTER_WINDOW_EVENTS = 'pointermove pointerup pointercancel';

// IE10 has prefixed support, and case-sensitive
if (window.MSPointerEvent && !window.PointerEvent) {
    POINTER_ELEMENT_EVENTS = 'MSPointerDown';
    POINTER_WINDOW_EVENTS = 'MSPointerMove MSPointerUp MSPointerCancel';
}

/**
 * Pointer events input
 * @constructor
 * @extends Input
 */
function PointerEventInput() {
    this.evEl = POINTER_ELEMENT_EVENTS;
    this.evWin = POINTER_WINDOW_EVENTS;

    Input.apply(this, arguments);

    this.store = (this.manager.session.pointerEvents = []);
}

inherit(PointerEventInput, Input, {
    /**
     * handle mouse events
     * @param {Object} ev
     */
    handler: function PEhandler(ev) {
        var store = this.store;
        var removePointer = false;

        var eventTypeNormalized = ev.type.toLowerCase().replace('ms', '');
        var eventType = POINTER_INPUT_MAP[eventTypeNormalized];
        var pointerType = IE10_POINTER_TYPE_ENUM[ev.pointerType] || ev.pointerType;

        var isTouch = (pointerType == INPUT_TYPE_TOUCH);

        // get index of the event in the store
        var storeIndex = inArray(store, ev.pointerId, 'pointerId');

        // start and mouse must be down
        if (eventType & INPUT_START && (ev.button === 0 || isTouch)) {
            if (storeIndex < 0) {
                store.push(ev);
                storeIndex = store.length - 1;
            }
        } else if (eventType & (INPUT_END | INPUT_CANCEL)) {
            removePointer = true;
        }

        // it not found, so the pointer hasn't been down (so it's probably a hover)
        if (storeIndex < 0) {
            return;
        }

        // update the event in the store
        store[storeIndex] = ev;

        this.callback(this.manager, eventType, {
            pointers: store,
            changedPointers: [ev],
            pointerType: pointerType,
            srcEvent: ev
        });

        if (removePointer) {
            // remove from the store
            store.splice(storeIndex, 1);
        }
    }
});

var SINGLE_TOUCH_INPUT_MAP = {
    touchstart: INPUT_START,
    touchmove: INPUT_MOVE,
    touchend: INPUT_END,
    touchcancel: INPUT_CANCEL
};

var SINGLE_TOUCH_TARGET_EVENTS = 'touchstart';
var SINGLE_TOUCH_WINDOW_EVENTS = 'touchstart touchmove touchend touchcancel';

/**
 * Touch events input
 * @constructor
 * @extends Input
 */
function SingleTouchInput() {
    this.evTarget = SINGLE_TOUCH_TARGET_EVENTS;
    this.evWin = SINGLE_TOUCH_WINDOW_EVENTS;
    this.started = false;

    Input.apply(this, arguments);
}

inherit(SingleTouchInput, Input, {
    handler: function TEhandler(ev) {
        var type = SINGLE_TOUCH_INPUT_MAP[ev.type];

        // should we handle the touch events?
        if (type === INPUT_START) {
            this.started = true;
        }

        if (!this.started) {
            return;
        }

        var touches = normalizeSingleTouches.call(this, ev, type);

        // when done, reset the started state
        if (type & (INPUT_END | INPUT_CANCEL) && touches[0].length - touches[1].length === 0) {
            this.started = false;
        }

        this.callback(this.manager, type, {
            pointers: touches[0],
            changedPointers: touches[1],
            pointerType: INPUT_TYPE_TOUCH,
            srcEvent: ev
        });
    }
});

/**
 * @this {TouchInput}
 * @param {Object} ev
 * @param {Number} type flag
 * @returns {undefined|Array} [all, changed]
 */
function normalizeSingleTouches(ev, type) {
    var all = toArray(ev.touches);
    var changed = toArray(ev.changedTouches);

    if (type & (INPUT_END | INPUT_CANCEL)) {
        all = uniqueArray(all.concat(changed), 'identifier', true);
    }

    return [all, changed];
}

var TOUCH_INPUT_MAP = {
    touchstart: INPUT_START,
    touchmove: INPUT_MOVE,
    touchend: INPUT_END,
    touchcancel: INPUT_CANCEL
};

var TOUCH_TARGET_EVENTS = 'touchstart touchmove touchend touchcancel';

/**
 * Multi-user touch events input
 * @constructor
 * @extends Input
 */
function TouchInput() {
    this.evTarget = TOUCH_TARGET_EVENTS;
    this.targetIds = {};

    Input.apply(this, arguments);
}

inherit(TouchInput, Input, {
    handler: function MTEhandler(ev) {
        var type = TOUCH_INPUT_MAP[ev.type];
        var touches = getTouches.call(this, ev, type);
        if (!touches) {
            return;
        }

        this.callback(this.manager, type, {
            pointers: touches[0],
            changedPointers: touches[1],
            pointerType: INPUT_TYPE_TOUCH,
            srcEvent: ev
        });
    }
});

/**
 * @this {TouchInput}
 * @param {Object} ev
 * @param {Number} type flag
 * @returns {undefined|Array} [all, changed]
 */
function getTouches(ev, type) {
    var allTouches = toArray(ev.touches);
    var targetIds = this.targetIds;

    // when there is only one touch, the process can be simplified
    if (type & (INPUT_START | INPUT_MOVE) && allTouches.length === 1) {
        targetIds[allTouches[0].identifier] = true;
        return [allTouches, allTouches];
    }

    var i,
        targetTouches,
        changedTouches = toArray(ev.changedTouches),
        changedTargetTouches = [],
        target = this.target;

    // get target touches from touches
    targetTouches = allTouches.filter(function(touch) {
        return hasParent(touch.target, target);
    });

    // collect touches
    if (type === INPUT_START) {
        i = 0;
        while (i < targetTouches.length) {
            targetIds[targetTouches[i].identifier] = true;
            i++;
        }
    }

    // filter changed touches to only contain touches that exist in the collected target ids
    i = 0;
    while (i < changedTouches.length) {
        if (targetIds[changedTouches[i].identifier]) {
            changedTargetTouches.push(changedTouches[i]);
        }

        // cleanup removed touches
        if (type & (INPUT_END | INPUT_CANCEL)) {
            delete targetIds[changedTouches[i].identifier];
        }
        i++;
    }

    if (!changedTargetTouches.length) {
        return;
    }

    return [
        // merge targetTouches with changedTargetTouches so it contains ALL touches, including 'end' and 'cancel'
        uniqueArray(targetTouches.concat(changedTargetTouches), 'identifier', true),
        changedTargetTouches
    ];
}

/**
 * Combined touch and mouse input
 *
 * Touch has a higher priority then mouse, and while touching no mouse events are allowed.
 * This because touch devices also emit mouse events while doing a touch.
 *
 * @constructor
 * @extends Input
 */

var DEDUP_TIMEOUT = 2500;
var DEDUP_DISTANCE = 25;

function TouchMouseInput() {
    Input.apply(this, arguments);

    var handler = bindFn(this.handler, this);
    this.touch = new TouchInput(this.manager, handler);
    this.mouse = new MouseInput(this.manager, handler);

    this.primaryTouch = null;
    this.lastTouches = [];
}

inherit(TouchMouseInput, Input, {
    /**
     * handle mouse and touch events
     * @param {Hammer} manager
     * @param {String} inputEvent
     * @param {Object} inputData
     */
    handler: function TMEhandler(manager, inputEvent, inputData) {
        var isTouch = (inputData.pointerType == INPUT_TYPE_TOUCH),
            isMouse = (inputData.pointerType == INPUT_TYPE_MOUSE);

        if (isMouse && inputData.sourceCapabilities && inputData.sourceCapabilities.firesTouchEvents) {
            return;
        }

        // when we're in a touch event, record touches to  de-dupe synthetic mouse event
        if (isTouch) {
            recordTouches.call(this, inputEvent, inputData);
        } else if (isMouse && isSyntheticEvent.call(this, inputData)) {
            return;
        }

        this.callback(manager, inputEvent, inputData);
    },

    /**
     * remove the event listeners
     */
    destroy: function destroy() {
        this.touch.destroy();
        this.mouse.destroy();
    }
});

function recordTouches(eventType, eventData) {
    if (eventType & INPUT_START) {
        this.primaryTouch = eventData.changedPointers[0].identifier;
        setLastTouch.call(this, eventData);
    } else if (eventType & (INPUT_END | INPUT_CANCEL)) {
        setLastTouch.call(this, eventData);
    }
}

function setLastTouch(eventData) {
    var touch = eventData.changedPointers[0];

    if (touch.identifier === this.primaryTouch) {
        var lastTouch = {x: touch.clientX, y: touch.clientY};
        this.lastTouches.push(lastTouch);
        var lts = this.lastTouches;
        var removeLastTouch = function() {
            var i = lts.indexOf(lastTouch);
            if (i > -1) {
                lts.splice(i, 1);
            }
        };
        setTimeout(removeLastTouch, DEDUP_TIMEOUT);
    }
}

function isSyntheticEvent(eventData) {
    var x = eventData.srcEvent.clientX, y = eventData.srcEvent.clientY;
    for (var i = 0; i < this.lastTouches.length; i++) {
        var t = this.lastTouches[i];
        var dx = Math.abs(x - t.x), dy = Math.abs(y - t.y);
        if (dx <= DEDUP_DISTANCE && dy <= DEDUP_DISTANCE) {
            return true;
        }
    }
    return false;
}

var PREFIXED_TOUCH_ACTION = prefixed(TEST_ELEMENT.style, 'touchAction');
var NATIVE_TOUCH_ACTION = PREFIXED_TOUCH_ACTION !== undefined;

// magical touchAction value
var TOUCH_ACTION_COMPUTE = 'compute';
var TOUCH_ACTION_AUTO = 'auto';
var TOUCH_ACTION_MANIPULATION = 'manipulation'; // not implemented
var TOUCH_ACTION_NONE = 'none';
var TOUCH_ACTION_PAN_X = 'pan-x';
var TOUCH_ACTION_PAN_Y = 'pan-y';
var TOUCH_ACTION_MAP = getTouchActionProps();

/**
 * Touch Action
 * sets the touchAction property or uses the js alternative
 * @param {Manager} manager
 * @param {String} value
 * @constructor
 */
function TouchAction(manager, value) {
    this.manager = manager;
    this.set(value);
}

TouchAction.prototype = {
    /**
     * set the touchAction value on the element or enable the polyfill
     * @param {String} value
     */
    set: function(value) {
        // find out the touch-action by the event handlers
        if (value == TOUCH_ACTION_COMPUTE) {
            value = this.compute();
        }

        if (NATIVE_TOUCH_ACTION && this.manager.element.style && TOUCH_ACTION_MAP[value]) {
            this.manager.element.style[PREFIXED_TOUCH_ACTION] = value;
        }
        this.actions = value.toLowerCase().trim();
    },

    /**
     * just re-set the touchAction value
     */
    update: function() {
        this.set(this.manager.options.touchAction);
    },

    /**
     * compute the value for the touchAction property based on the recognizer's settings
     * @returns {String} value
     */
    compute: function() {
        var actions = [];
        each(this.manager.recognizers, function(recognizer) {
            if (boolOrFn(recognizer.options.enable, [recognizer])) {
                actions = actions.concat(recognizer.getTouchAction());
            }
        });
        return cleanTouchActions(actions.join(' '));
    },

    /**
     * this method is called on each input cycle and provides the preventing of the browser behavior
     * @param {Object} input
     */
    preventDefaults: function(input) {
        var srcEvent = input.srcEvent;
        var direction = input.offsetDirection;

        // if the touch action did prevented once this session
        if (this.manager.session.prevented) {
            srcEvent.preventDefault();
            return;
        }

        var actions = this.actions;
        var hasNone = inStr(actions, TOUCH_ACTION_NONE) && !TOUCH_ACTION_MAP[TOUCH_ACTION_NONE];
        var hasPanY = inStr(actions, TOUCH_ACTION_PAN_Y) && !TOUCH_ACTION_MAP[TOUCH_ACTION_PAN_Y];
        var hasPanX = inStr(actions, TOUCH_ACTION_PAN_X) && !TOUCH_ACTION_MAP[TOUCH_ACTION_PAN_X];

        if (hasNone) {
            //do not prevent defaults if this is a tap gesture

            var isTapPointer = input.pointers.length === 1;
            var isTapMovement = input.distance < 2;
            var isTapTouchTime = input.deltaTime < 250;

            if (isTapPointer && isTapMovement && isTapTouchTime) {
                return;
            }
        }

        if (hasPanX && hasPanY) {
            // `pan-x pan-y` means browser handles all scrolling/panning, do not prevent
            return;
        }

        if (hasNone ||
            (hasPanY && direction & DIRECTION_HORIZONTAL) ||
            (hasPanX && direction & DIRECTION_VERTICAL)) {
            return this.preventSrc(srcEvent);
        }
    },

    /**
     * call preventDefault to prevent the browser's default behavior (scrolling in most cases)
     * @param {Object} srcEvent
     */
    preventSrc: function(srcEvent) {
        this.manager.session.prevented = true;
        srcEvent.preventDefault();
    }
};

/**
 * when the touchActions are collected they are not a valid value, so we need to clean things up. *
 * @param {String} actions
 * @returns {*}
 */
function cleanTouchActions(actions) {
    // none
    if (inStr(actions, TOUCH_ACTION_NONE)) {
        return TOUCH_ACTION_NONE;
    }

    var hasPanX = inStr(actions, TOUCH_ACTION_PAN_X);
    var hasPanY = inStr(actions, TOUCH_ACTION_PAN_Y);

    // if both pan-x and pan-y are set (different recognizers
    // for different directions, e.g. horizontal pan but vertical swipe?)
    // we need none (as otherwise with pan-x pan-y combined none of these
    // recognizers will work, since the browser would handle all panning
    if (hasPanX && hasPanY) {
        return TOUCH_ACTION_NONE;
    }

    // pan-x OR pan-y
    if (hasPanX || hasPanY) {
        return hasPanX ? TOUCH_ACTION_PAN_X : TOUCH_ACTION_PAN_Y;
    }

    // manipulation
    if (inStr(actions, TOUCH_ACTION_MANIPULATION)) {
        return TOUCH_ACTION_MANIPULATION;
    }

    return TOUCH_ACTION_AUTO;
}

function getTouchActionProps() {
    if (!NATIVE_TOUCH_ACTION) {
        return false;
    }
    var touchMap = {};
    var cssSupports = window.CSS && window.CSS.supports;
    ['auto', 'manipulation', 'pan-y', 'pan-x', 'pan-x pan-y', 'none'].forEach(function(val) {

        // If css.supports is not supported but there is native touch-action assume it supports
        // all values. This is the case for IE 10 and 11.
        touchMap[val] = cssSupports ? window.CSS.supports('touch-action', val) : true;
    });
    return touchMap;
}

/**
 * Recognizer flow explained; *
 * All recognizers have the initial state of POSSIBLE when a input session starts.
 * The definition of a input session is from the first input until the last input, with all it's movement in it. *
 * Example session for mouse-input: mousedown -> mousemove -> mouseup
 *
 * On each recognizing cycle (see Manager.recognize) the .recognize() method is executed
 * which determines with state it should be.
 *
 * If the recognizer has the state FAILED, CANCELLED or RECOGNIZED (equals ENDED), it is reset to
 * POSSIBLE to give it another change on the next cycle.
 *
 *               Possible
 *                  |
 *            +-----+---------------+
 *            |                     |
 *      +-----+-----+               |
 *      |           |               |
 *   Failed      Cancelled          |
 *                          +-------+------+
 *                          |              |
 *                      Recognized       Began
 *                                         |
 *                                      Changed
 *                                         |
 *                                  Ended/Recognized
 */
var STATE_POSSIBLE = 1;
var STATE_BEGAN = 2;
var STATE_CHANGED = 4;
var STATE_ENDED = 8;
var STATE_RECOGNIZED = STATE_ENDED;
var STATE_CANCELLED = 16;
var STATE_FAILED = 32;

/**
 * Recognizer
 * Every recognizer needs to extend from this class.
 * @constructor
 * @param {Object} options
 */
function Recognizer(options) {
    this.options = assign({}, this.defaults, options || {});

    this.id = uniqueId();

    this.manager = null;

    // default is enable true
    this.options.enable = ifUndefined(this.options.enable, true);

    this.state = STATE_POSSIBLE;

    this.simultaneous = {};
    this.requireFail = [];
}

Recognizer.prototype = {
    /**
     * @virtual
     * @type {Object}
     */
    defaults: {},

    /**
     * set options
     * @param {Object} options
     * @return {Recognizer}
     */
    set: function(options) {
        assign(this.options, options);

        // also update the touchAction, in case something changed about the directions/enabled state
        this.manager && this.manager.touchAction.update();
        return this;
    },

    /**
     * recognize simultaneous with an other recognizer.
     * @param {Recognizer} otherRecognizer
     * @returns {Recognizer} this
     */
    recognizeWith: function(otherRecognizer) {
        if (invokeArrayArg(otherRecognizer, 'recognizeWith', this)) {
            return this;
        }

        var simultaneous = this.simultaneous;
        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
        if (!simultaneous[otherRecognizer.id]) {
            simultaneous[otherRecognizer.id] = otherRecognizer;
            otherRecognizer.recognizeWith(this);
        }
        return this;
    },

    /**
     * drop the simultaneous link. it doesnt remove the link on the other recognizer.
     * @param {Recognizer} otherRecognizer
     * @returns {Recognizer} this
     */
    dropRecognizeWith: function(otherRecognizer) {
        if (invokeArrayArg(otherRecognizer, 'dropRecognizeWith', this)) {
            return this;
        }

        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
        delete this.simultaneous[otherRecognizer.id];
        return this;
    },

    /**
     * recognizer can only run when an other is failing
     * @param {Recognizer} otherRecognizer
     * @returns {Recognizer} this
     */
    requireFailure: function(otherRecognizer) {
        if (invokeArrayArg(otherRecognizer, 'requireFailure', this)) {
            return this;
        }

        var requireFail = this.requireFail;
        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
        if (inArray(requireFail, otherRecognizer) === -1) {
            requireFail.push(otherRecognizer);
            otherRecognizer.requireFailure(this);
        }
        return this;
    },

    /**
     * drop the requireFailure link. it does not remove the link on the other recognizer.
     * @param {Recognizer} otherRecognizer
     * @returns {Recognizer} this
     */
    dropRequireFailure: function(otherRecognizer) {
        if (invokeArrayArg(otherRecognizer, 'dropRequireFailure', this)) {
            return this;
        }

        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
        var index = inArray(this.requireFail, otherRecognizer);
        if (index > -1) {
            this.requireFail.splice(index, 1);
        }
        return this;
    },

    /**
     * has require failures boolean
     * @returns {boolean}
     */
    hasRequireFailures: function() {
        return this.requireFail.length > 0;
    },

    /**
     * if the recognizer can recognize simultaneous with an other recognizer
     * @param {Recognizer} otherRecognizer
     * @returns {Boolean}
     */
    canRecognizeWith: function(otherRecognizer) {
        return !!this.simultaneous[otherRecognizer.id];
    },

    /**
     * You should use `tryEmit` instead of `emit` directly to check
     * that all the needed recognizers has failed before emitting.
     * @param {Object} input
     */
    emit: function(input) {
        var self = this;
        var state = this.state;

        function emit(event) {
            self.manager.emit(event, input);
        }

        // 'panstart' and 'panmove'
        if (state < STATE_ENDED) {
            emit(self.options.event + stateStr(state));
        }

        emit(self.options.event); // simple 'eventName' events

        if (input.additionalEvent) { // additional event(panleft, panright, pinchin, pinchout...)
            emit(input.additionalEvent);
        }

        // panend and pancancel
        if (state >= STATE_ENDED) {
            emit(self.options.event + stateStr(state));
        }
    },

    /**
     * Check that all the require failure recognizers has failed,
     * if true, it emits a gesture event,
     * otherwise, setup the state to FAILED.
     * @param {Object} input
     */
    tryEmit: function(input) {
        if (this.canEmit()) {
            return this.emit(input);
        }
        // it's failing anyway
        this.state = STATE_FAILED;
    },

    /**
     * can we emit?
     * @returns {boolean}
     */
    canEmit: function() {
        var i = 0;
        while (i < this.requireFail.length) {
            if (!(this.requireFail[i].state & (STATE_FAILED | STATE_POSSIBLE))) {
                return false;
            }
            i++;
        }
        return true;
    },

    /**
     * update the recognizer
     * @param {Object} inputData
     */
    recognize: function(inputData) {
        // make a new copy of the inputData
        // so we can change the inputData without messing up the other recognizers
        var inputDataClone = assign({}, inputData);

        // is is enabled and allow recognizing?
        if (!boolOrFn(this.options.enable, [this, inputDataClone])) {
            this.reset();
            this.state = STATE_FAILED;
            return;
        }

        // reset when we've reached the end
        if (this.state & (STATE_RECOGNIZED | STATE_CANCELLED | STATE_FAILED)) {
            this.state = STATE_POSSIBLE;
        }

        this.state = this.process(inputDataClone);

        // the recognizer has recognized a gesture
        // so trigger an event
        if (this.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED | STATE_CANCELLED)) {
            this.tryEmit(inputDataClone);
        }
    },

    /**
     * return the state of the recognizer
     * the actual recognizing happens in this method
     * @virtual
     * @param {Object} inputData
     * @returns {Const} STATE
     */
    process: function(inputData) { }, // jshint ignore:line

    /**
     * return the preferred touch-action
     * @virtual
     * @returns {Array}
     */
    getTouchAction: function() { },

    /**
     * called when the gesture isn't allowed to recognize
     * like when another is being recognized or it is disabled
     * @virtual
     */
    reset: function() { }
};

/**
 * get a usable string, used as event postfix
 * @param {Const} state
 * @returns {String} state
 */
function stateStr(state) {
    if (state & STATE_CANCELLED) {
        return 'cancel';
    } else if (state & STATE_ENDED) {
        return 'end';
    } else if (state & STATE_CHANGED) {
        return 'move';
    } else if (state & STATE_BEGAN) {
        return 'start';
    }
    return '';
}

/**
 * direction cons to string
 * @param {Const} direction
 * @returns {String}
 */
function directionStr(direction) {
    if (direction == DIRECTION_DOWN) {
        return 'down';
    } else if (direction == DIRECTION_UP) {
        return 'up';
    } else if (direction == DIRECTION_LEFT) {
        return 'left';
    } else if (direction == DIRECTION_RIGHT) {
        return 'right';
    }
    return '';
}

/**
 * get a recognizer by name if it is bound to a manager
 * @param {Recognizer|String} otherRecognizer
 * @param {Recognizer} recognizer
 * @returns {Recognizer}
 */
function getRecognizerByNameIfManager(otherRecognizer, recognizer) {
    var manager = recognizer.manager;
    if (manager) {
        return manager.get(otherRecognizer);
    }
    return otherRecognizer;
}

/**
 * This recognizer is just used as a base for the simple attribute recognizers.
 * @constructor
 * @extends Recognizer
 */
function AttrRecognizer() {
    Recognizer.apply(this, arguments);
}

inherit(AttrRecognizer, Recognizer, {
    /**
     * @namespace
     * @memberof AttrRecognizer
     */
    defaults: {
        /**
         * @type {Number}
         * @default 1
         */
        pointers: 1
    },

    /**
     * Used to check if it the recognizer receives valid input, like input.distance > 10.
     * @memberof AttrRecognizer
     * @param {Object} input
     * @returns {Boolean} recognized
     */
    attrTest: function(input) {
        var optionPointers = this.options.pointers;
        return optionPointers === 0 || input.pointers.length === optionPointers;
    },

    /**
     * Process the input and return the state for the recognizer
     * @memberof AttrRecognizer
     * @param {Object} input
     * @returns {*} State
     */
    process: function(input) {
        var state = this.state;
        var eventType = input.eventType;

        var isRecognized = state & (STATE_BEGAN | STATE_CHANGED);
        var isValid = this.attrTest(input);

        // on cancel input and we've recognized before, return STATE_CANCELLED
        if (isRecognized && (eventType & INPUT_CANCEL || !isValid)) {
            return state | STATE_CANCELLED;
        } else if (isRecognized || isValid) {
            if (eventType & INPUT_END) {
                return state | STATE_ENDED;
            } else if (!(state & STATE_BEGAN)) {
                return STATE_BEGAN;
            }
            return state | STATE_CHANGED;
        }
        return STATE_FAILED;
    }
});

/**
 * Pan
 * Recognized when the pointer is down and moved in the allowed direction.
 * @constructor
 * @extends AttrRecognizer
 */
function PanRecognizer() {
    AttrRecognizer.apply(this, arguments);

    this.pX = null;
    this.pY = null;
}

inherit(PanRecognizer, AttrRecognizer, {
    /**
     * @namespace
     * @memberof PanRecognizer
     */
    defaults: {
        event: 'pan',
        threshold: 10,
        pointers: 1,
        direction: DIRECTION_ALL
    },

    getTouchAction: function() {
        var direction = this.options.direction;
        var actions = [];
        if (direction & DIRECTION_HORIZONTAL) {
            actions.push(TOUCH_ACTION_PAN_Y);
        }
        if (direction & DIRECTION_VERTICAL) {
            actions.push(TOUCH_ACTION_PAN_X);
        }
        return actions;
    },

    directionTest: function(input) {
        var options = this.options;
        var hasMoved = true;
        var distance = input.distance;
        var direction = input.direction;
        var x = input.deltaX;
        var y = input.deltaY;

        // lock to axis?
        if (!(direction & options.direction)) {
            if (options.direction & DIRECTION_HORIZONTAL) {
                direction = (x === 0) ? DIRECTION_NONE : (x < 0) ? DIRECTION_LEFT : DIRECTION_RIGHT;
                hasMoved = x != this.pX;
                distance = Math.abs(input.deltaX);
            } else {
                direction = (y === 0) ? DIRECTION_NONE : (y < 0) ? DIRECTION_UP : DIRECTION_DOWN;
                hasMoved = y != this.pY;
                distance = Math.abs(input.deltaY);
            }
        }
        input.direction = direction;
        return hasMoved && distance > options.threshold && direction & options.direction;
    },

    attrTest: function(input) {
        return AttrRecognizer.prototype.attrTest.call(this, input) &&
            (this.state & STATE_BEGAN || (!(this.state & STATE_BEGAN) && this.directionTest(input)));
    },

    emit: function(input) {

        this.pX = input.deltaX;
        this.pY = input.deltaY;

        var direction = directionStr(input.direction);

        if (direction) {
            input.additionalEvent = this.options.event + direction;
        }
        this._super.emit.call(this, input);
    }
});

/**
 * Pinch
 * Recognized when two or more pointers are moving toward (zoom-in) or away from each other (zoom-out).
 * @constructor
 * @extends AttrRecognizer
 */
function PinchRecognizer() {
    AttrRecognizer.apply(this, arguments);
}

inherit(PinchRecognizer, AttrRecognizer, {
    /**
     * @namespace
     * @memberof PinchRecognizer
     */
    defaults: {
        event: 'pinch',
        threshold: 0,
        pointers: 2
    },

    getTouchAction: function() {
        return [TOUCH_ACTION_NONE];
    },

    attrTest: function(input) {
        return this._super.attrTest.call(this, input) &&
            (Math.abs(input.scale - 1) > this.options.threshold || this.state & STATE_BEGAN);
    },

    emit: function(input) {
        if (input.scale !== 1) {
            var inOut = input.scale < 1 ? 'in' : 'out';
            input.additionalEvent = this.options.event + inOut;
        }
        this._super.emit.call(this, input);
    }
});

/**
 * Press
 * Recognized when the pointer is down for x ms without any movement.
 * @constructor
 * @extends Recognizer
 */
function PressRecognizer() {
    Recognizer.apply(this, arguments);

    this._timer = null;
    this._input = null;
}

inherit(PressRecognizer, Recognizer, {
    /**
     * @namespace
     * @memberof PressRecognizer
     */
    defaults: {
        event: 'press',
        pointers: 1,
        time: 251, // minimal time of the pointer to be pressed
        threshold: 9 // a minimal movement is ok, but keep it low
    },

    getTouchAction: function() {
        return [TOUCH_ACTION_AUTO];
    },

    process: function(input) {
        var options = this.options;
        var validPointers = input.pointers.length === options.pointers;
        var validMovement = input.distance < options.threshold;
        var validTime = input.deltaTime > options.time;

        this._input = input;

        // we only allow little movement
        // and we've reached an end event, so a tap is possible
        if (!validMovement || !validPointers || (input.eventType & (INPUT_END | INPUT_CANCEL) && !validTime)) {
            this.reset();
        } else if (input.eventType & INPUT_START) {
            this.reset();
            this._timer = setTimeoutContext(function() {
                this.state = STATE_RECOGNIZED;
                this.tryEmit();
            }, options.time, this);
        } else if (input.eventType & INPUT_END) {
            return STATE_RECOGNIZED;
        }
        return STATE_FAILED;
    },

    reset: function() {
        clearTimeout(this._timer);
    },

    emit: function(input) {
        if (this.state !== STATE_RECOGNIZED) {
            return;
        }

        if (input && (input.eventType & INPUT_END)) {
            this.manager.emit(this.options.event + 'up', input);
        } else {
            this._input.timeStamp = now();
            this.manager.emit(this.options.event, this._input);
        }
    }
});

/**
 * Rotate
 * Recognized when two or more pointer are moving in a circular motion.
 * @constructor
 * @extends AttrRecognizer
 */
function RotateRecognizer() {
    AttrRecognizer.apply(this, arguments);
}

inherit(RotateRecognizer, AttrRecognizer, {
    /**
     * @namespace
     * @memberof RotateRecognizer
     */
    defaults: {
        event: 'rotate',
        threshold: 0,
        pointers: 2
    },

    getTouchAction: function() {
        return [TOUCH_ACTION_NONE];
    },

    attrTest: function(input) {
        return this._super.attrTest.call(this, input) &&
            (Math.abs(input.rotation) > this.options.threshold || this.state & STATE_BEGAN);
    }
});

/**
 * Swipe
 * Recognized when the pointer is moving fast (velocity), with enough distance in the allowed direction.
 * @constructor
 * @extends AttrRecognizer
 */
function SwipeRecognizer() {
    AttrRecognizer.apply(this, arguments);
}

inherit(SwipeRecognizer, AttrRecognizer, {
    /**
     * @namespace
     * @memberof SwipeRecognizer
     */
    defaults: {
        event: 'swipe',
        threshold: 10,
        velocity: 0.3,
        direction: DIRECTION_HORIZONTAL | DIRECTION_VERTICAL,
        pointers: 1
    },

    getTouchAction: function() {
        return PanRecognizer.prototype.getTouchAction.call(this);
    },

    attrTest: function(input) {
        var direction = this.options.direction;
        var velocity;

        if (direction & (DIRECTION_HORIZONTAL | DIRECTION_VERTICAL)) {
            velocity = input.overallVelocity;
        } else if (direction & DIRECTION_HORIZONTAL) {
            velocity = input.overallVelocityX;
        } else if (direction & DIRECTION_VERTICAL) {
            velocity = input.overallVelocityY;
        }

        return this._super.attrTest.call(this, input) &&
            direction & input.offsetDirection &&
            input.distance > this.options.threshold &&
            input.maxPointers == this.options.pointers &&
            abs(velocity) > this.options.velocity && input.eventType & INPUT_END;
    },

    emit: function(input) {
        var direction = directionStr(input.offsetDirection);
        if (direction) {
            this.manager.emit(this.options.event + direction, input);
        }

        this.manager.emit(this.options.event, input);
    }
});

/**
 * A tap is ecognized when the pointer is doing a small tap/click. Multiple taps are recognized if they occur
 * between the given interval and position. The delay option can be used to recognize multi-taps without firing
 * a single tap.
 *
 * The eventData from the emitted event contains the property `tapCount`, which contains the amount of
 * multi-taps being recognized.
 * @constructor
 * @extends Recognizer
 */
function TapRecognizer() {
    Recognizer.apply(this, arguments);

    // previous time and center,
    // used for tap counting
    this.pTime = false;
    this.pCenter = false;

    this._timer = null;
    this._input = null;
    this.count = 0;
}

inherit(TapRecognizer, Recognizer, {
    /**
     * @namespace
     * @memberof PinchRecognizer
     */
    defaults: {
        event: 'tap',
        pointers: 1,
        taps: 1,
        interval: 300, // max time between the multi-tap taps
        time: 250, // max time of the pointer to be down (like finger on the screen)
        threshold: 9, // a minimal movement is ok, but keep it low
        posThreshold: 10 // a multi-tap can be a bit off the initial position
    },

    getTouchAction: function() {
        return [TOUCH_ACTION_MANIPULATION];
    },

    process: function(input) {
        var options = this.options;

        var validPointers = input.pointers.length === options.pointers;
        var validMovement = input.distance < options.threshold;
        var validTouchTime = input.deltaTime < options.time;

        this.reset();

        if ((input.eventType & INPUT_START) && (this.count === 0)) {
            return this.failTimeout();
        }

        // we only allow little movement
        // and we've reached an end event, so a tap is possible
        if (validMovement && validTouchTime && validPointers) {
            if (input.eventType != INPUT_END) {
                return this.failTimeout();
            }

            var validInterval = this.pTime ? (input.timeStamp - this.pTime < options.interval) : true;
            var validMultiTap = !this.pCenter || getDistance(this.pCenter, input.center) < options.posThreshold;

            this.pTime = input.timeStamp;
            this.pCenter = input.center;

            if (!validMultiTap || !validInterval) {
                this.count = 1;
            } else {
                this.count += 1;
            }

            this._input = input;

            // if tap count matches we have recognized it,
            // else it has began recognizing...
            var tapCount = this.count % options.taps;
            if (tapCount === 0) {
                // no failing requirements, immediately trigger the tap event
                // or wait as long as the multitap interval to trigger
                if (!this.hasRequireFailures()) {
                    return STATE_RECOGNIZED;
                } else {
                    this._timer = setTimeoutContext(function() {
                        this.state = STATE_RECOGNIZED;
                        this.tryEmit();
                    }, options.interval, this);
                    return STATE_BEGAN;
                }
            }
        }
        return STATE_FAILED;
    },

    failTimeout: function() {
        this._timer = setTimeoutContext(function() {
            this.state = STATE_FAILED;
        }, this.options.interval, this);
        return STATE_FAILED;
    },

    reset: function() {
        clearTimeout(this._timer);
    },

    emit: function() {
        if (this.state == STATE_RECOGNIZED) {
            this._input.tapCount = this.count;
            this.manager.emit(this.options.event, this._input);
        }
    }
});

/**
 * Simple way to create a manager with a default set of recognizers.
 * @param {HTMLElement} element
 * @param {Object} [options]
 * @constructor
 */
function Hammer(element, options) {
    options = options || {};
    options.recognizers = ifUndefined(options.recognizers, Hammer.defaults.preset);
    return new Manager(element, options);
}

/**
 * @const {string}
 */
Hammer.VERSION = '2.0.7';

/**
 * default settings
 * @namespace
 */
Hammer.defaults = {
    /**
     * set if DOM events are being triggered.
     * But this is slower and unused by simple implementations, so disabled by default.
     * @type {Boolean}
     * @default false
     */
    domEvents: false,

    /**
     * The value for the touchAction property/fallback.
     * When set to `compute` it will magically set the correct value based on the added recognizers.
     * @type {String}
     * @default compute
     */
    touchAction: TOUCH_ACTION_COMPUTE,

    /**
     * @type {Boolean}
     * @default true
     */
    enable: true,

    /**
     * EXPERIMENTAL FEATURE -- can be removed/changed
     * Change the parent input target element.
     * If Null, then it is being set the to main element.
     * @type {Null|EventTarget}
     * @default null
     */
    inputTarget: null,

    /**
     * force an input class
     * @type {Null|Function}
     * @default null
     */
    inputClass: null,

    /**
     * Default recognizer setup when calling `Hammer()`
     * When creating a new Manager these will be skipped.
     * @type {Array}
     */
    preset: [
        // RecognizerClass, options, [recognizeWith, ...], [requireFailure, ...]
        [RotateRecognizer, {enable: false}],
        [PinchRecognizer, {enable: false}, ['rotate']],
        [SwipeRecognizer, {direction: DIRECTION_HORIZONTAL}],
        [PanRecognizer, {direction: DIRECTION_HORIZONTAL}, ['swipe']],
        [TapRecognizer],
        [TapRecognizer, {event: 'doubletap', taps: 2}, ['tap']],
        [PressRecognizer]
    ],

    /**
     * Some CSS properties can be used to improve the working of Hammer.
     * Add them to this method and they will be set when creating a new Manager.
     * @namespace
     */
    cssProps: {
        /**
         * Disables text selection to improve the dragging gesture. Mainly for desktop browsers.
         * @type {String}
         * @default 'none'
         */
        userSelect: 'none',

        /**
         * Disable the Windows Phone grippers when pressing an element.
         * @type {String}
         * @default 'none'
         */
        touchSelect: 'none',

        /**
         * Disables the default callout shown when you touch and hold a touch target.
         * On iOS, when you touch and hold a touch target such as a link, Safari displays
         * a callout containing information about the link. This property allows you to disable that callout.
         * @type {String}
         * @default 'none'
         */
        touchCallout: 'none',

        /**
         * Specifies whether zooming is enabled. Used by IE10>
         * @type {String}
         * @default 'none'
         */
        contentZooming: 'none',

        /**
         * Specifies that an entire element should be draggable instead of its contents. Mainly for desktop browsers.
         * @type {String}
         * @default 'none'
         */
        userDrag: 'none',

        /**
         * Overrides the highlight color shown when the user taps a link or a JavaScript
         * clickable element in iOS. This property obeys the alpha value, if specified.
         * @type {String}
         * @default 'rgba(0,0,0,0)'
         */
        tapHighlightColor: 'rgba(0,0,0,0)'
    }
};

var STOP = 1;
var FORCED_STOP = 2;

/**
 * Manager
 * @param {HTMLElement} element
 * @param {Object} [options]
 * @constructor
 */
function Manager(element, options) {
    this.options = assign({}, Hammer.defaults, options || {});

    this.options.inputTarget = this.options.inputTarget || element;

    this.handlers = {};
    this.session = {};
    this.recognizers = [];
    this.oldCssProps = {};

    this.element = element;
    this.input = createInputInstance(this);
    this.touchAction = new TouchAction(this, this.options.touchAction);

    toggleCssProps(this, true);

    each(this.options.recognizers, function(item) {
        var recognizer = this.add(new (item[0])(item[1]));
        item[2] && recognizer.recognizeWith(item[2]);
        item[3] && recognizer.requireFailure(item[3]);
    }, this);
}

Manager.prototype = {
    /**
     * set options
     * @param {Object} options
     * @returns {Manager}
     */
    set: function(options) {
        assign(this.options, options);

        // Options that need a little more setup
        if (options.touchAction) {
            this.touchAction.update();
        }
        if (options.inputTarget) {
            // Clean up existing event listeners and reinitialize
            this.input.destroy();
            this.input.target = options.inputTarget;
            this.input.init();
        }
        return this;
    },

    /**
     * stop recognizing for this session.
     * This session will be discarded, when a new [input]start event is fired.
     * When forced, the recognizer cycle is stopped immediately.
     * @param {Boolean} [force]
     */
    stop: function(force) {
        this.session.stopped = force ? FORCED_STOP : STOP;
    },

    /**
     * run the recognizers!
     * called by the inputHandler function on every movement of the pointers (touches)
     * it walks through all the recognizers and tries to detect the gesture that is being made
     * @param {Object} inputData
     */
    recognize: function(inputData) {
        var session = this.session;
        if (session.stopped) {
            return;
        }

        // run the touch-action polyfill
        this.touchAction.preventDefaults(inputData);

        var recognizer;
        var recognizers = this.recognizers;

        // this holds the recognizer that is being recognized.
        // so the recognizer's state needs to be BEGAN, CHANGED, ENDED or RECOGNIZED
        // if no recognizer is detecting a thing, it is set to `null`
        var curRecognizer = session.curRecognizer;

        // reset when the last recognizer is recognized
        // or when we're in a new session
        if (!curRecognizer || (curRecognizer && curRecognizer.state & STATE_RECOGNIZED)) {
            curRecognizer = session.curRecognizer = null;
        }

        var i = 0;
        while (i < recognizers.length) {
            recognizer = recognizers[i];

            // find out if we are allowed try to recognize the input for this one.
            // 1.   allow if the session is NOT forced stopped (see the .stop() method)
            // 2.   allow if we still haven't recognized a gesture in this session, or the this recognizer is the one
            //      that is being recognized.
            // 3.   allow if the recognizer is allowed to run simultaneous with the current recognized recognizer.
            //      this can be setup with the `recognizeWith()` method on the recognizer.
            if (session.stopped !== FORCED_STOP && ( // 1
                    !curRecognizer || recognizer == curRecognizer || // 2
                    recognizer.canRecognizeWith(curRecognizer))) { // 3
                recognizer.recognize(inputData);
            } else {
                recognizer.reset();
            }

            // if the recognizer has been recognizing the input as a valid gesture, we want to store this one as the
            // current active recognizer. but only if we don't already have an active recognizer
            if (!curRecognizer && recognizer.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED)) {
                curRecognizer = session.curRecognizer = recognizer;
            }
            i++;
        }
    },

    /**
     * get a recognizer by its event name.
     * @param {Recognizer|String} recognizer
     * @returns {Recognizer|Null}
     */
    get: function(recognizer) {
        if (recognizer instanceof Recognizer) {
            return recognizer;
        }

        var recognizers = this.recognizers;
        for (var i = 0; i < recognizers.length; i++) {
            if (recognizers[i].options.event == recognizer) {
                return recognizers[i];
            }
        }
        return null;
    },

    /**
     * add a recognizer to the manager
     * existing recognizers with the same event name will be removed
     * @param {Recognizer} recognizer
     * @returns {Recognizer|Manager}
     */
    add: function(recognizer) {
        if (invokeArrayArg(recognizer, 'add', this)) {
            return this;
        }

        // remove existing
        var existing = this.get(recognizer.options.event);
        if (existing) {
            this.remove(existing);
        }

        this.recognizers.push(recognizer);
        recognizer.manager = this;

        this.touchAction.update();
        return recognizer;
    },

    /**
     * remove a recognizer by name or instance
     * @param {Recognizer|String} recognizer
     * @returns {Manager}
     */
    remove: function(recognizer) {
        if (invokeArrayArg(recognizer, 'remove', this)) {
            return this;
        }

        recognizer = this.get(recognizer);

        // let's make sure this recognizer exists
        if (recognizer) {
            var recognizers = this.recognizers;
            var index = inArray(recognizers, recognizer);

            if (index !== -1) {
                recognizers.splice(index, 1);
                this.touchAction.update();
            }
        }

        return this;
    },

    /**
     * bind event
     * @param {String} events
     * @param {Function} handler
     * @returns {EventEmitter} this
     */
    on: function(events, handler) {
        if (events === undefined) {
            return;
        }
        if (handler === undefined) {
            return;
        }

        var handlers = this.handlers;
        each(splitStr(events), function(event) {
            handlers[event] = handlers[event] || [];
            handlers[event].push(handler);
        });
        return this;
    },

    /**
     * unbind event, leave emit blank to remove all handlers
     * @param {String} events
     * @param {Function} [handler]
     * @returns {EventEmitter} this
     */
    off: function(events, handler) {
        if (events === undefined) {
            return;
        }

        var handlers = this.handlers;
        each(splitStr(events), function(event) {
            if (!handler) {
                delete handlers[event];
            } else {
                handlers[event] && handlers[event].splice(inArray(handlers[event], handler), 1);
            }
        });
        return this;
    },

    /**
     * emit event to the listeners
     * @param {String} event
     * @param {Object} data
     */
    emit: function(event, data) {
        // we also want to trigger dom events
        if (this.options.domEvents) {
            triggerDomEvent(event, data);
        }

        // no handlers, so skip it all
        var handlers = this.handlers[event] && this.handlers[event].slice();
        if (!handlers || !handlers.length) {
            return;
        }

        data.type = event;
        data.preventDefault = function() {
            data.srcEvent.preventDefault();
        };

        var i = 0;
        while (i < handlers.length) {
            handlers[i](data);
            i++;
        }
    },

    /**
     * destroy the manager and unbinds all events
     * it doesn't unbind dom events, that is the user own responsibility
     */
    destroy: function() {
        this.element && toggleCssProps(this, false);

        this.handlers = {};
        this.session = {};
        this.input.destroy();
        this.element = null;
    }
};

/**
 * add/remove the css properties as defined in manager.options.cssProps
 * @param {Manager} manager
 * @param {Boolean} add
 */
function toggleCssProps(manager, add) {
    var element = manager.element;
    if (!element.style) {
        return;
    }
    var prop;
    each(manager.options.cssProps, function(value, name) {
        prop = prefixed(element.style, name);
        if (add) {
            manager.oldCssProps[prop] = element.style[prop];
            element.style[prop] = value;
        } else {
            element.style[prop] = manager.oldCssProps[prop] || '';
        }
    });
    if (!add) {
        manager.oldCssProps = {};
    }
}

/**
 * trigger dom event
 * @param {String} event
 * @param {Object} data
 */
function triggerDomEvent(event, data) {
    var gestureEvent = document.createEvent('Event');
    gestureEvent.initEvent(event, true, true);
    gestureEvent.gesture = data;
    data.target.dispatchEvent(gestureEvent);
}

assign(Hammer, {
    INPUT_START: INPUT_START,
    INPUT_MOVE: INPUT_MOVE,
    INPUT_END: INPUT_END,
    INPUT_CANCEL: INPUT_CANCEL,

    STATE_POSSIBLE: STATE_POSSIBLE,
    STATE_BEGAN: STATE_BEGAN,
    STATE_CHANGED: STATE_CHANGED,
    STATE_ENDED: STATE_ENDED,
    STATE_RECOGNIZED: STATE_RECOGNIZED,
    STATE_CANCELLED: STATE_CANCELLED,
    STATE_FAILED: STATE_FAILED,

    DIRECTION_NONE: DIRECTION_NONE,
    DIRECTION_LEFT: DIRECTION_LEFT,
    DIRECTION_RIGHT: DIRECTION_RIGHT,
    DIRECTION_UP: DIRECTION_UP,
    DIRECTION_DOWN: DIRECTION_DOWN,
    DIRECTION_HORIZONTAL: DIRECTION_HORIZONTAL,
    DIRECTION_VERTICAL: DIRECTION_VERTICAL,
    DIRECTION_ALL: DIRECTION_ALL,

    Manager: Manager,
    Input: Input,
    TouchAction: TouchAction,

    TouchInput: TouchInput,
    MouseInput: MouseInput,
    PointerEventInput: PointerEventInput,
    TouchMouseInput: TouchMouseInput,
    SingleTouchInput: SingleTouchInput,

    Recognizer: Recognizer,
    AttrRecognizer: AttrRecognizer,
    Tap: TapRecognizer,
    Pan: PanRecognizer,
    Swipe: SwipeRecognizer,
    Pinch: PinchRecognizer,
    Rotate: RotateRecognizer,
    Press: PressRecognizer,

    on: addEventListeners,
    off: removeEventListeners,
    each: each,
    merge: merge,
    extend: extend,
    assign: assign,
    inherit: inherit,
    bindFn: bindFn,
    prefixed: prefixed
});

// this prevents errors when Hammer is loaded in the presence of an AMD
//  style loader but by script tag, not by the loader.
var freeGlobal = (typeof window !== 'undefined' ? window : (typeof self !== 'undefined' ? self : {})); // jshint ignore:line
freeGlobal.Hammer = Hammer;

if (true) {
    !(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {
        return Hammer;
    }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
} else if (typeof module != 'undefined' && module.exports) {
    module.exports = Hammer;
} else {
    window[exportName] = Hammer;
}

})(window, document, 'Hammer');


/***/ }),
/* 31 */
/***/ (function(module, exports) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/* jquery.nicescroll 3.5.0 InuYaksa*2013 MIT http://areaaperta.com/nicescroll */(function (e) {
    var z = !1,
        E = !1,
        L = 5E3,
        M = 2E3,
        y = 0,
        N = function () {
        var e = document.getElementsByTagName("script"),
            e = e[e.length - 1].src.split("?")[0];return 0 < e.split("/").length ? e.split("/").slice(0, -1).join("/") + "/" : "";
    }(),
        H = ["ms", "moz", "webkit", "o"],
        v = window.requestAnimationFrame || !1,
        w = window.cancelAnimationFrame || !1;if (!v) for (var O in H) {
        var F = H[O];v || (v = window[F + "RequestAnimationFrame"]);w || (w = window[F + "CancelAnimationFrame"] || window[F + "CancelRequestAnimationFrame"]);
    }var A = window.MutationObserver || window.WebKitMutationObserver || !1,
        I = { zindex: "auto", cursoropacitymin: 0, cursoropacitymax: 1, cursorcolor: "#424242", cursorwidth: "5px", cursorborder: "1px solid #fff", cursorborderradius: "5px", scrollspeed: 60, mousescrollstep: 24, touchbehavior: !1, hwacceleration: !0, usetransition: !0, boxzoom: !1, dblclickzoom: !0, gesturezoom: !0, grabcursorenabled: !0, autohidemode: !0, background: "", iframeautoresize: !0, cursorminheight: 32, preservenativescrolling: !0, railoffset: !1, bouncescroll: !0, spacebarenabled: !0, railpadding: { top: 0, right: 0, left: 0, bottom: 0 }, disableoutline: !0,
        horizrailenabled: !0, railalign: "right", railvalign: "bottom", enabletranslate3d: !0, enablemousewheel: !0, enablekeyboard: !0, smoothscroll: !0, sensitiverail: !0, enablemouselockapi: !0, cursorfixedheight: !1, directionlockdeadzone: 6, hidecursordelay: 400, nativeparentscrolling: !0, enablescrollonselection: !0, overflowx: !0, overflowy: !0, cursordragspeed: 0.3, rtlmode: !1, cursordragontouch: !1, oneaxismousemode: "auto" },
        G = !1,
        P = function P() {
        if (G) return G;var e = document.createElement("DIV"),
            c = { haspointerlock: "pointerLockElement" in document || "mozPointerLockElement" in document || "webkitPointerLockElement" in document };c.isopera = "opera" in window;c.isopera12 = c.isopera && "getUserMedia" in navigator;c.isoperamini = "[object OperaMini]" === Object.prototype.toString.call(window.operamini);c.isie = "all" in document && "attachEvent" in e && !c.isopera;c.isieold = c.isie && !("msInterpolationMode" in e.style);c.isie7 = c.isie && !c.isieold && (!("documentMode" in document) || 7 == document.documentMode);c.isie8 = c.isie && "documentMode" in document && 8 == document.documentMode;c.isie9 = c.isie && "performance" in window && 9 <= document.documentMode;c.isie10 = c.isie && "performance" in window && 10 <= document.documentMode;c.isie9mobile = /iemobile.9/i.test(navigator.userAgent);c.isie9mobile && (c.isie9 = !1);c.isie7mobile = !c.isie9mobile && c.isie7 && /iemobile/i.test(navigator.userAgent);c.ismozilla = "MozAppearance" in e.style;c.iswebkit = "WebkitAppearance" in e.style;c.ischrome = "chrome" in window;c.ischrome22 = c.ischrome && c.haspointerlock;c.ischrome26 = c.ischrome && "transition" in e.style;c.cantouch = "ontouchstart" in document.documentElement || "ontouchstart" in window;c.hasmstouch = window.navigator.msPointerEnabled || !1;c.ismac = /^mac$/i.test(navigator.platform);c.isios = c.cantouch && /iphone|ipad|ipod/i.test(navigator.platform);c.isios4 = c.isios && !("seal" in Object);c.isandroid = /android/i.test(navigator.userAgent);c.trstyle = !1;c.hastransform = !1;c.hastranslate3d = !1;c.transitionstyle = !1;c.hastransition = !1;c.transitionend = !1;for (var k = ["transform", "msTransform", "webkitTransform", "MozTransform", "OTransform"], l = 0; l < k.length; l++) {
            if ("undefined" != typeof e.style[k[l]]) {
                c.trstyle = k[l];break;
            }
        }c.hastransform = !1 != c.trstyle;c.hastransform && (e.style[c.trstyle] = "translate3d(1px,2px,3px)", c.hastranslate3d = /translate3d/.test(e.style[c.trstyle]));c.transitionstyle = !1;c.prefixstyle = "";c.transitionend = !1;for (var k = "transition webkitTransition MozTransition OTransition OTransition msTransition KhtmlTransition".split(" "), q = " -webkit- -moz- -o- -o -ms- -khtml-".split(" "), t = "transitionend webkitTransitionEnd transitionend otransitionend oTransitionEnd msTransitionEnd KhtmlTransitionEnd".split(" "), l = 0; l < k.length; l++) {
            if (k[l] in e.style) {
                c.transitionstyle = k[l];c.prefixstyle = q[l];c.transitionend = t[l];break;
            }
        }c.ischrome26 && (c.prefixstyle = q[1]);c.hastransition = c.transitionstyle;a: {
            k = ["-moz-grab", "-webkit-grab", "grab"];if (c.ischrome && !c.ischrome22 || c.isie) k = [];for (l = 0; l < k.length; l++) {
                if (q = k[l], e.style.cursor = q, e.style.cursor == q) {
                    k = q;break a;
                }
            }k = "url(http://www.google.com/intl/en_ALL/mapfiles/openhand.cur),n-resize";
        }c.cursorgrabvalue = k;c.hasmousecapture = "setCapture" in e;c.hasMutationObserver = !1 !== A;return G = c;
    },
        Q = function Q(h, c) {
        function k() {
            var d = b.win;if ("zIndex" in d) return d.zIndex();for (; 0 < d.length && 9 != d[0].nodeType;) {
                var c = d.css("zIndex");if (!isNaN(c) && 0 != c) return parseInt(c);d = d.parent();
            }return !1;
        }function l(d, c, f) {
            c = d.css(c);d = parseFloat(c);return isNaN(d) ? (d = u[c] || 0, f = 3 == d ? f ? b.win.outerHeight() - b.win.innerHeight() : b.win.outerWidth() - b.win.innerWidth() : 1, b.isie8 && d && (d += 1), f ? d : 0) : d;
        }function q(d, c, f, g) {
            b._bind(d, c, function (b) {
                b = b ? b : window.event;var g = { original: b, target: b.target || b.srcElement, type: "wheel",
                    deltaMode: "MozMousePixelScroll" == b.type ? 0 : 1, deltaX: 0, deltaZ: 0, preventDefault: function preventDefault() {
                        b.preventDefault ? b.preventDefault() : b.returnValue = !1;return !1;
                    }, stopImmediatePropagation: function stopImmediatePropagation() {
                        b.stopImmediatePropagation ? b.stopImmediatePropagation() : b.cancelBubble = !0;
                    } };"mousewheel" == c ? (g.deltaY = -0.025 * b.wheelDelta, b.wheelDeltaX && (g.deltaX = -0.025 * b.wheelDeltaX)) : g.deltaY = b.detail;return f.call(d, g);
            }, g);
        }function t(d, c, f) {
            var g, e;0 == d.deltaMode ? (g = -Math.floor(d.deltaX * (b.opt.mousescrollstep / 54)), e = -Math.floor(d.deltaY * (b.opt.mousescrollstep / 54))) : 1 == d.deltaMode && (g = -Math.floor(d.deltaX * b.opt.mousescrollstep), e = -Math.floor(d.deltaY * b.opt.mousescrollstep));c && b.opt.oneaxismousemode && 0 == g && e && (g = e, e = 0);g && (b.scrollmom && b.scrollmom.stop(), b.lastdeltax += g, b.debounced("mousewheelx", function () {
                var d = b.lastdeltax;b.lastdeltax = 0;b.rail.drag || b.doScrollLeftBy(d);
            }, 120));if (e) {
                if (b.opt.nativeparentscrolling && f && !b.ispage && !b.zoomactive) if (0 > e) {
                    if (b.getScrollTop() >= b.page.maxh) return !0;
                } else if (0 >= b.getScrollTop()) return !0;
                b.scrollmom && b.scrollmom.stop();b.lastdeltay += e;b.debounced("mousewheely", function () {
                    var d = b.lastdeltay;b.lastdeltay = 0;b.rail.drag || b.doScrollBy(d);
                }, 120);
            }d.stopImmediatePropagation();return d.preventDefault();
        }var b = this;this.version = "3.5.0";this.name = "nicescroll";this.me = c;this.opt = { doc: e("body"), win: !1 };e.extend(this.opt, I);this.opt.snapbackspeed = 80;if (h) for (var p in b.opt) {
            "undefined" != typeof h[p] && (b.opt[p] = h[p]);
        }this.iddoc = (this.doc = b.opt.doc) && this.doc[0] ? this.doc[0].id || "" : "";this.ispage = /BODY|HTML/.test(b.opt.win ? b.opt.win[0].nodeName : this.doc[0].nodeName);this.haswrapper = !1 !== b.opt.win;this.win = b.opt.win || (this.ispage ? e(window) : this.doc);this.docscroll = this.ispage && !this.haswrapper ? e(window) : this.win;this.body = e("body");this.iframe = this.isfixed = this.viewport = !1;this.isiframe = "IFRAME" == this.doc[0].nodeName && "IFRAME" == this.win[0].nodeName;this.istextarea = "TEXTAREA" == this.win[0].nodeName;this.forcescreen = !1;this.canshowonmouseevent = "scroll" != b.opt.autohidemode;this.page = this.view = this.onzoomout = this.onzoomin = this.onscrollcancel = this.onscrollend = this.onscrollstart = this.onclick = this.ongesturezoom = this.onkeypress = this.onmousewheel = this.onmousemove = this.onmouseup = this.onmousedown = !1;this.scroll = { x: 0, y: 0 };this.scrollratio = { x: 0, y: 0 };this.cursorheight = 20;this.scrollvaluemax = 0;this.observerremover = this.observer = this.scrollmom = this.scrollrunning = this.checkrtlmode = !1;do {
            this.id = "ascrail" + M++;
        } while (document.getElementById(this.id));this.hasmousefocus = this.hasfocus = this.zoomactive = this.zoom = this.selectiondrag = this.cursorfreezed = this.cursor = this.rail = !1;this.visibility = !0;this.hidden = this.locked = !1;this.cursoractive = !0;this.overflowx = b.opt.overflowx;this.overflowy = b.opt.overflowy;this.nativescrollingarea = !1;this.checkarea = 0;this.events = [];this.saved = {};this.delaylist = {};this.synclist = {};this.lastdeltay = this.lastdeltax = 0;this.detected = P();var g = e.extend({}, this.detected);this.ishwscroll = (this.canhwscroll = g.hastransform && b.opt.hwacceleration) && b.haswrapper;this.istouchcapable = !1;g.cantouch && g.ischrome && !g.isios && !g.isandroid && (this.istouchcapable = !0, g.cantouch = !1);g.cantouch && g.ismozilla && !g.isios && !g.isandroid && (this.istouchcapable = !0, g.cantouch = !1);b.opt.enablemouselockapi || (g.hasmousecapture = !1, g.haspointerlock = !1);this.delayed = function (d, c, f, g) {
            var e = b.delaylist[d],
                k = new Date().getTime();if (!g && e && e.tt) return !1;e && e.tt && clearTimeout(e.tt);if (e && e.last + f > k && !e.tt) b.delaylist[d] = { last: k + f, tt: setTimeout(function () {
                    b.delaylist[d].tt = 0;c.call();
                }, f) };else if (!e || !e.tt) b.delaylist[d] = { last: k, tt: 0 }, setTimeout(function () {
                c.call();
            }, 0);
        };this.debounced = function (d, c, f) {
            var g = b.delaylist[d];new Date().getTime();b.delaylist[d] = c;g || setTimeout(function () {
                var c = b.delaylist[d];b.delaylist[d] = !1;c.call();
            }, f);
        };this.synched = function (d, c) {
            b.synclist[d] = c;(function () {
                b.onsync || (v(function () {
                    b.onsync = !1;for (d in b.synclist) {
                        var c = b.synclist[d];c && c.call(b);b.synclist[d] = !1;
                    }
                }), b.onsync = !0);
            })();return d;
        };this.unsynched = function (d) {
            b.synclist[d] && (b.synclist[d] = !1);
        };this.css = function (d, c) {
            for (var f in c) {
                b.saved.css.push([d, f, d.css(f)]), d.css(f, c[f]);
            }
        };this.scrollTop = function (d) {
            return "undefined" == typeof d ? b.getScrollTop() : b.setScrollTop(d);
        };this.scrollLeft = function (d) {
            return "undefined" == typeof d ? b.getScrollLeft() : b.setScrollLeft(d);
        };BezierClass = function BezierClass(b, c, f, g, e, k, l) {
            this.st = b;this.ed = c;this.spd = f;this.p1 = g || 0;this.p2 = e || 1;this.p3 = k || 0;this.p4 = l || 1;this.ts = new Date().getTime();this.df = this.ed - this.st;
        };BezierClass.prototype = { B2: function B2(b) {
                return 3 * b * b * (1 - b);
            }, B3: function B3(b) {
                return 3 * b * (1 - b) * (1 - b);
            }, B4: function B4(b) {
                return (1 - b) * (1 - b) * (1 - b);
            },
            getNow: function getNow() {
                var b = 1 - (new Date().getTime() - this.ts) / this.spd,
                    c = this.B2(b) + this.B3(b) + this.B4(b);return 0 > b ? this.ed : this.st + Math.round(this.df * c);
            }, update: function update(b, c) {
                this.st = this.getNow();this.ed = b;this.spd = c;this.ts = new Date().getTime();this.df = this.ed - this.st;return this;
            } };if (this.ishwscroll) {
            this.doc.translate = { x: 0, y: 0, tx: "0px", ty: "0px" };g.hastranslate3d && g.isios && this.doc.css("-webkit-backface-visibility", "hidden");var s = function s() {
                var d = b.doc.css(g.trstyle);return d && "matrix" == d.substr(0, 6) ? d.replace(/^.*\((.*)\)$/g, "$1").replace(/px/g, "").split(/, +/) : !1;
            };this.getScrollTop = function (d) {
                if (!d) {
                    if (d = s()) return 16 == d.length ? -d[13] : -d[5];if (b.timerscroll && b.timerscroll.bz) return b.timerscroll.bz.getNow();
                }return b.doc.translate.y;
            };this.getScrollLeft = function (d) {
                if (!d) {
                    if (d = s()) return 16 == d.length ? -d[12] : -d[4];if (b.timerscroll && b.timerscroll.bh) return b.timerscroll.bh.getNow();
                }return b.doc.translate.x;
            };this.notifyScrollEvent = document.createEvent ? function (b) {
                var c = document.createEvent("UIEvents");
                c.initUIEvent("scroll", !1, !0, window, 1);b.dispatchEvent(c);
            } : document.fireEvent ? function (b) {
                var c = document.createEventObject();b.fireEvent("onscroll");c.cancelBubble = !0;
            } : function (b, c) {};g.hastranslate3d && b.opt.enabletranslate3d ? (this.setScrollTop = function (d, c) {
                b.doc.translate.y = d;b.doc.translate.ty = -1 * d + "px";b.doc.css(g.trstyle, "translate3d(" + b.doc.translate.tx + "," + b.doc.translate.ty + ",0px)");c || b.notifyScrollEvent(b.win[0]);
            }, this.setScrollLeft = function (d, c) {
                b.doc.translate.x = d;b.doc.translate.tx = -1 * d + "px";b.doc.css(g.trstyle, "translate3d(" + b.doc.translate.tx + "," + b.doc.translate.ty + ",0px)");c || b.notifyScrollEvent(b.win[0]);
            }) : (this.setScrollTop = function (d, c) {
                b.doc.translate.y = d;b.doc.translate.ty = -1 * d + "px";b.doc.css(g.trstyle, "translate(" + b.doc.translate.tx + "," + b.doc.translate.ty + ")");c || b.notifyScrollEvent(b.win[0]);
            }, this.setScrollLeft = function (d, c) {
                b.doc.translate.x = d;b.doc.translate.tx = -1 * d + "px";b.doc.css(g.trstyle, "translate(" + b.doc.translate.tx + "," + b.doc.translate.ty + ")");c || b.notifyScrollEvent(b.win[0]);
            });
        } else this.getScrollTop = function () {
            return b.docscroll.scrollTop();
        }, this.setScrollTop = function (d) {
            return b.docscroll.scrollTop(d);
        }, this.getScrollLeft = function () {
            return b.docscroll.scrollLeft();
        }, this.setScrollLeft = function (d) {
            return b.docscroll.scrollLeft(d);
        };this.getTarget = function (b) {
            return !b ? !1 : b.target ? b.target : b.srcElement ? b.srcElement : !1;
        };this.hasParent = function (b, c) {
            if (!b) return !1;for (var f = b.target || b.srcElement || b || !1; f && f.id != c;) {
                f = f.parentNode || !1;
            }return !1 !== f;
        };var u = { thin: 1, medium: 3, thick: 5 };this.getOffset = function () {
            if (b.isfixed) return { top: parseFloat(b.win.css("top")),
                left: parseFloat(b.win.css("left")) };if (!b.viewport) return b.win.offset();var d = b.win.offset(),
                c = b.viewport.offset();return { top: d.top - c.top + b.viewport.scrollTop(), left: d.left - c.left + b.viewport.scrollLeft() };
        };this.updateScrollBar = function (d) {
            if (b.ishwscroll) b.rail.css({ height: b.win.innerHeight() }), b.railh && b.railh.css({ width: b.win.innerWidth() });else {
                var c = b.getOffset(),
                    f = c.top,
                    g = c.left,
                    f = f + l(b.win, "border-top-width", !0);b.win.outerWidth();b.win.innerWidth();var g = g + (b.rail.align ? b.win.outerWidth() - l(b.win, "border-right-width") - b.rail.width : l(b.win, "border-left-width")),
                    e = b.opt.railoffset;e && (e.top && (f += e.top), b.rail.align && e.left && (g += e.left));b.locked || b.rail.css({ top: f, left: g, height: d ? d.h : b.win.innerHeight() });b.zoom && b.zoom.css({ top: f + 1, left: 1 == b.rail.align ? g - 20 : g + b.rail.width + 4 });b.railh && !b.locked && (f = c.top, g = c.left, d = b.railh.align ? f + l(b.win, "border-top-width", !0) + b.win.innerHeight() - b.railh.height : f + l(b.win, "border-top-width", !0), g += l(b.win, "border-left-width"), b.railh.css({ top: d, left: g,
                    width: b.railh.width }));
            }
        };this.doRailClick = function (d, c, f) {
            var g;b.locked || (b.cancelEvent(d), c ? (c = f ? b.doScrollLeft : b.doScrollTop, g = f ? (d.pageX - b.railh.offset().left - b.cursorwidth / 2) * b.scrollratio.x : (d.pageY - b.rail.offset().top - b.cursorheight / 2) * b.scrollratio.y, c(g)) : (c = f ? b.doScrollLeftBy : b.doScrollBy, g = f ? b.scroll.x : b.scroll.y, d = f ? d.pageX - b.railh.offset().left : d.pageY - b.rail.offset().top, f = f ? b.view.w : b.view.h, g >= d ? c(f) : c(-f)));
        };b.hasanimationframe = v;b.hascancelanimationframe = w;b.hasanimationframe ? b.hascancelanimationframe || (w = function w() {
            b.cancelAnimationFrame = !0;
        }) : (v = function v(b) {
            return setTimeout(b, 15 - Math.floor(+new Date() / 1E3) % 16);
        }, w = clearInterval);this.init = function () {
            b.saved.css = [];if (g.isie7mobile || g.isoperamini) return !0;g.hasmstouch && b.css(b.ispage ? e("html") : b.win, { "-ms-touch-action": "none" });b.zindex = "auto";b.zindex = !b.ispage && "auto" == b.opt.zindex ? k() || "auto" : b.opt.zindex;!b.ispage && "auto" != b.zindex && b.zindex > y && (y = b.zindex);b.isie && 0 == b.zindex && "auto" == b.opt.zindex && (b.zindex = "auto");if (!b.ispage || !g.cantouch && !g.isieold && !g.isie9mobile) {
                var d = b.docscroll;b.ispage && (d = b.haswrapper ? b.win : b.doc);g.isie9mobile || b.css(d, { "overflow-y": "hidden" });b.ispage && g.isie7 && ("BODY" == b.doc[0].nodeName ? b.css(e("html"), { "overflow-y": "hidden" }) : "HTML" == b.doc[0].nodeName && b.css(e("body"), { "overflow-y": "hidden" }));g.isios && !b.ispage && !b.haswrapper && b.css(e("body"), { "-webkit-overflow-scrolling": "touch" });var c = e(document.createElement("div"));c.css({ position: "relative", top: 0, "float": "right", width: b.opt.cursorwidth, height: "0px",
                    "background-color": b.opt.cursorcolor, border: b.opt.cursorborder, "background-clip": "padding-box", "-webkit-border-radius": b.opt.cursorborderradius, "-moz-border-radius": b.opt.cursorborderradius, "border-radius": b.opt.cursorborderradius });c.hborder = parseFloat(c.outerHeight() - c.innerHeight());b.cursor = c;var f = e(document.createElement("div"));f.attr("id", b.id);f.addClass("nicescroll-rails");var l,
                    h,
                    x = ["left", "right"],
                    q;for (q in x) {
                    h = x[q], (l = b.opt.railpadding[h]) ? f.css("padding-" + h, l + "px") : b.opt.railpadding[h] = 0;
                }f.append(c);f.width = Math.max(parseFloat(b.opt.cursorwidth), c.outerWidth()) + b.opt.railpadding.left + b.opt.railpadding.right;f.css({ width: f.width + "px", zIndex: b.zindex, background: b.opt.background, cursor: "default" });f.visibility = !0;f.scrollable = !0;f.align = "left" == b.opt.railalign ? 0 : 1;b.rail = f;c = b.rail.drag = !1;b.opt.boxzoom && !b.ispage && !g.isieold && (c = document.createElement("div"), b.bind(c, "click", b.doZoom), b.zoom = e(c), b.zoom.css({ cursor: "pointer", "z-index": b.zindex, backgroundImage: "url(" + N + "zoomico.png)",
                    height: 18, width: 18, backgroundPosition: "0px 0px" }), b.opt.dblclickzoom && b.bind(b.win, "dblclick", b.doZoom), g.cantouch && b.opt.gesturezoom && (b.ongesturezoom = function (d) {
                    1.5 < d.scale && b.doZoomIn(d);0.8 > d.scale && b.doZoomOut(d);return b.cancelEvent(d);
                }, b.bind(b.win, "gestureend", b.ongesturezoom)));b.railh = !1;if (b.opt.horizrailenabled) {
                    b.css(d, { "overflow-x": "hidden" });c = e(document.createElement("div"));c.css({ position: "relative", top: 0, height: b.opt.cursorwidth, width: "0px", "background-color": b.opt.cursorcolor,
                        border: b.opt.cursorborder, "background-clip": "padding-box", "-webkit-border-radius": b.opt.cursorborderradius, "-moz-border-radius": b.opt.cursorborderradius, "border-radius": b.opt.cursorborderradius });c.wborder = parseFloat(c.outerWidth() - c.innerWidth());b.cursorh = c;var m = e(document.createElement("div"));m.attr("id", b.id + "-hr");m.addClass("nicescroll-rails");m.height = Math.max(parseFloat(b.opt.cursorwidth), c.outerHeight());m.css({ height: m.height + "px", zIndex: b.zindex, background: b.opt.background });m.append(c);
                    m.visibility = !0;m.scrollable = !0;m.align = "top" == b.opt.railvalign ? 0 : 1;b.railh = m;b.railh.drag = !1;
                }b.ispage ? (f.css({ position: "fixed", top: "0px", height: "100%" }), f.align ? f.css({ right: "0px" }) : f.css({ left: "0px" }), b.body.append(f), b.railh && (m.css({ position: "fixed", left: "0px", width: "100%" }), m.align ? m.css({ bottom: "0px" }) : m.css({ top: "0px" }), b.body.append(m))) : (b.ishwscroll ? ("static" == b.win.css("position") && b.css(b.win, { position: "relative" }), d = "HTML" == b.win[0].nodeName ? b.body : b.win, b.zoom && (b.zoom.css({ position: "absolute",
                    top: 1, right: 0, "margin-right": f.width + 4 }), d.append(b.zoom)), f.css({ position: "absolute", top: 0 }), f.align ? f.css({ right: 0 }) : f.css({ left: 0 }), d.append(f), m && (m.css({ position: "absolute", left: 0, bottom: 0 }), m.align ? m.css({ bottom: 0 }) : m.css({ top: 0 }), d.append(m))) : (b.isfixed = "fixed" == b.win.css("position"), d = b.isfixed ? "fixed" : "absolute", b.isfixed || (b.viewport = b.getViewport(b.win[0])), b.viewport && (b.body = b.viewport, !1 == /fixed|relative|absolute/.test(b.viewport.css("position")) && b.css(b.viewport, { position: "relative" })), f.css({ position: d }), b.zoom && b.zoom.css({ position: d }), b.updateScrollBar(), b.body.append(f), b.zoom && b.body.append(b.zoom), b.railh && (m.css({ position: d }), b.body.append(m))), g.isios && b.css(b.win, { "-webkit-tap-highlight-color": "rgba(0,0,0,0)", "-webkit-touch-callout": "none" }), g.isie && b.opt.disableoutline && b.win.attr("hideFocus", "true"), g.iswebkit && b.opt.disableoutline && b.win.css({ outline: "none" }));!1 === b.opt.autohidemode ? (b.autohidedom = !1, b.rail.css({ opacity: b.opt.cursoropacitymax }), b.railh && b.railh.css({ opacity: b.opt.cursoropacitymax })) : !0 === b.opt.autohidemode || "leave" === b.opt.autohidemode ? (b.autohidedom = e().add(b.rail), g.isie8 && (b.autohidedom = b.autohidedom.add(b.cursor)), b.railh && (b.autohidedom = b.autohidedom.add(b.railh)), b.railh && g.isie8 && (b.autohidedom = b.autohidedom.add(b.cursorh))) : "scroll" == b.opt.autohidemode ? (b.autohidedom = e().add(b.rail), b.railh && (b.autohidedom = b.autohidedom.add(b.railh))) : "cursor" == b.opt.autohidemode ? (b.autohidedom = e().add(b.cursor), b.railh && (b.autohidedom = b.autohidedom.add(b.cursorh))) : "hidden" == b.opt.autohidemode && (b.autohidedom = !1, b.hide(), b.locked = !1);if (g.isie9mobile) b.scrollmom = new J(b), b.onmangotouch = function (d) {
                    d = b.getScrollTop();var c = b.getScrollLeft();if (d == b.scrollmom.lastscrolly && c == b.scrollmom.lastscrollx) return !0;var f = d - b.mangotouch.sy,
                        g = c - b.mangotouch.sx;if (0 != Math.round(Math.sqrt(Math.pow(g, 2) + Math.pow(f, 2)))) {
                        var n = 0 > f ? -1 : 1,
                            e = 0 > g ? -1 : 1,
                            k = +new Date();b.mangotouch.lazy && clearTimeout(b.mangotouch.lazy);80 < k - b.mangotouch.tm || b.mangotouch.dry != n || b.mangotouch.drx != e ? (b.scrollmom.stop(), b.scrollmom.reset(c, d), b.mangotouch.sy = d, b.mangotouch.ly = d, b.mangotouch.sx = c, b.mangotouch.lx = c, b.mangotouch.dry = n, b.mangotouch.drx = e, b.mangotouch.tm = k) : (b.scrollmom.stop(), b.scrollmom.update(b.mangotouch.sx - g, b.mangotouch.sy - f), b.mangotouch.tm = k, f = Math.max(Math.abs(b.mangotouch.ly - d), Math.abs(b.mangotouch.lx - c)), b.mangotouch.ly = d, b.mangotouch.lx = c, 2 < f && (b.mangotouch.lazy = setTimeout(function () {
                            b.mangotouch.lazy = !1;b.mangotouch.dry = 0;b.mangotouch.drx = 0;b.mangotouch.tm = 0;b.scrollmom.doMomentum(30);
                        }, 100)));
                    }
                }, f = b.getScrollTop(), m = b.getScrollLeft(), b.mangotouch = { sy: f, ly: f, dry: 0, sx: m, lx: m, drx: 0, lazy: !1, tm: 0 }, b.bind(b.docscroll, "scroll", b.onmangotouch);else {
                    if (g.cantouch || b.istouchcapable || b.opt.touchbehavior || g.hasmstouch) {
                        b.scrollmom = new J(b);b.ontouchstart = function (d) {
                            if (d.pointerType && 2 != d.pointerType) return !1;if (!b.locked) {
                                if (g.hasmstouch) for (var c = d.target ? d.target : !1; c;) {
                                    var f = e(c).getNiceScroll();if (0 < f.length && f[0].me == b.me) break;if (0 < f.length) return !1;if ("DIV" == c.nodeName && c.id == b.id) break;c = c.parentNode ? c.parentNode : !1;
                                }b.cancelScroll();if ((c = b.getTarget(d)) && /INPUT/i.test(c.nodeName) && /range/i.test(c.type)) return b.stopPropagation(d);!("clientX" in d) && "changedTouches" in d && (d.clientX = d.changedTouches[0].clientX, d.clientY = d.changedTouches[0].clientY);b.forcescreen && (f = d, d = { original: d.original ? d.original : d }, d.clientX = f.screenX, d.clientY = f.screenY);b.rail.drag = { x: d.clientX, y: d.clientY, sx: b.scroll.x, sy: b.scroll.y, st: b.getScrollTop(), sl: b.getScrollLeft(), pt: 2, dl: !1 };if (b.ispage || !b.opt.directionlockdeadzone) b.rail.drag.dl = "f";else {
                                    var f = e(window).width(),
                                        n = e(window).height(),
                                        k = Math.max(document.body.scrollWidth, document.documentElement.scrollWidth),
                                        l = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight),
                                        n = Math.max(0, l - n),
                                        f = Math.max(0, k - f);b.rail.drag.ck = !b.rail.scrollable && b.railh.scrollable ? 0 < n ? "v" : !1 : b.rail.scrollable && !b.railh.scrollable ? 0 < f ? "h" : !1 : !1;b.rail.drag.ck || (b.rail.drag.dl = "f");
                                }b.opt.touchbehavior && b.isiframe && g.isie && (f = b.win.position(), b.rail.drag.x += f.left, b.rail.drag.y += f.top);
                                b.hasmoving = !1;b.lastmouseup = !1;b.scrollmom.reset(d.clientX, d.clientY);if (!g.cantouch && !this.istouchcapable && !g.hasmstouch) {
                                    if (!c || !/INPUT|SELECT|TEXTAREA/i.test(c.nodeName)) return !b.ispage && g.hasmousecapture && c.setCapture(), b.opt.touchbehavior ? b.cancelEvent(d) : b.stopPropagation(d);/SUBMIT|CANCEL|BUTTON/i.test(e(c).attr("type")) && (pc = { tg: c, click: !1 }, b.preventclick = pc);
                                }
                            }
                        };b.ontouchend = function (d) {
                            if (d.pointerType && 2 != d.pointerType) return !1;if (b.rail.drag && 2 == b.rail.drag.pt && (b.scrollmom.doMomentum(), b.rail.drag = !1, b.hasmoving && (b.hasmoving = !1, b.lastmouseup = !0, b.hideCursor(), g.hasmousecapture && document.releaseCapture(), !g.cantouch))) return b.cancelEvent(d);
                        };var t = b.opt.touchbehavior && b.isiframe && !g.hasmousecapture;b.ontouchmove = function (d, c) {
                            if (d.pointerType && 2 != d.pointerType) return !1;if (b.rail.drag && 2 == b.rail.drag.pt) {
                                if (g.cantouch && "undefined" == typeof d.original) return !0;b.hasmoving = !0;b.preventclick && !b.preventclick.click && (b.preventclick.click = b.preventclick.tg.onclick || !1, b.preventclick.tg.onclick = b.onpreventclick);d = e.extend({ original: d }, d);"changedTouches" in d && (d.clientX = d.changedTouches[0].clientX, d.clientY = d.changedTouches[0].clientY);if (b.forcescreen) {
                                    var f = d;d = { original: d.original ? d.original : d };d.clientX = f.screenX;d.clientY = f.screenY;
                                }f = ofy = 0;if (t && !c) {
                                    var n = b.win.position(),
                                        f = -n.left;ofy = -n.top;
                                }var k = d.clientY + ofy,
                                    n = k - b.rail.drag.y,
                                    l = d.clientX + f,
                                    h = l - b.rail.drag.x,
                                    r = b.rail.drag.st - n;b.ishwscroll && b.opt.bouncescroll ? 0 > r ? r = Math.round(r / 2) : r > b.page.maxh && (r = b.page.maxh + Math.round((r - b.page.maxh) / 2)) : (0 > r && (k = r = 0), r > b.page.maxh && (r = b.page.maxh, k = 0));if (b.railh && b.railh.scrollable) {
                                    var m = b.rail.drag.sl - h;b.ishwscroll && b.opt.bouncescroll ? 0 > m ? m = Math.round(m / 2) : m > b.page.maxw && (m = b.page.maxw + Math.round((m - b.page.maxw) / 2)) : (0 > m && (l = m = 0), m > b.page.maxw && (m = b.page.maxw, l = 0));
                                }f = !1;if (b.rail.drag.dl) f = !0, "v" == b.rail.drag.dl ? m = b.rail.drag.sl : "h" == b.rail.drag.dl && (r = b.rail.drag.st);else {
                                    var n = Math.abs(n),
                                        h = Math.abs(h),
                                        x = b.opt.directionlockdeadzone;if ("v" == b.rail.drag.ck) {
                                        if (n > x && h <= 0.3 * n) return b.rail.drag = !1, !0;h > x && (b.rail.drag.dl = "f", e("body").scrollTop(e("body").scrollTop()));
                                    } else if ("h" == b.rail.drag.ck) {
                                        if (h > x && n <= 0.3 * h) return b.rail.drag = !1, !0;n > x && (b.rail.drag.dl = "f", e("body").scrollLeft(e("body").scrollLeft()));
                                    }
                                }b.synched("touchmove", function () {
                                    b.rail.drag && 2 == b.rail.drag.pt && (b.prepareTransition && b.prepareTransition(0), b.rail.scrollable && b.setScrollTop(r), b.scrollmom.update(l, k), b.railh && b.railh.scrollable ? (b.setScrollLeft(m), b.showCursor(r, m)) : b.showCursor(r), g.isie10 && document.selection.clear());
                                });
                                g.ischrome && b.istouchcapable && (f = !1);if (f) return b.cancelEvent(d);
                            }
                        };
                    }b.onmousedown = function (d, c) {
                        if (!(b.rail.drag && 1 != b.rail.drag.pt)) {
                            if (b.locked) return b.cancelEvent(d);b.cancelScroll();b.rail.drag = { x: d.clientX, y: d.clientY, sx: b.scroll.x, sy: b.scroll.y, pt: 1, hr: !!c };var f = b.getTarget(d);!b.ispage && g.hasmousecapture && f.setCapture();b.isiframe && !g.hasmousecapture && (b.saved.csspointerevents = b.doc.css("pointer-events"), b.css(b.doc, { "pointer-events": "none" }));return b.cancelEvent(d);
                        }
                    };b.onmouseup = function (d) {
                        if (b.rail.drag && (g.hasmousecapture && document.releaseCapture(), b.isiframe && !g.hasmousecapture && b.doc.css("pointer-events", b.saved.csspointerevents), 1 == b.rail.drag.pt)) return b.rail.drag = !1, b.cancelEvent(d);
                    };b.onmousemove = function (d) {
                        if (b.rail.drag && 1 == b.rail.drag.pt) {
                            if (g.ischrome && 0 == d.which) return b.onmouseup(d);b.cursorfreezed = !0;if (b.rail.drag.hr) {
                                b.scroll.x = b.rail.drag.sx + (d.clientX - b.rail.drag.x);0 > b.scroll.x && (b.scroll.x = 0);var c = b.scrollvaluemaxw;b.scroll.x > c && (b.scroll.x = c);
                            } else b.scroll.y = b.rail.drag.sy + (d.clientY - b.rail.drag.y), 0 > b.scroll.y && (b.scroll.y = 0), c = b.scrollvaluemax, b.scroll.y > c && (b.scroll.y = c);b.synched("mousemove", function () {
                                b.rail.drag && 1 == b.rail.drag.pt && (b.showCursor(), b.rail.drag.hr ? b.doScrollLeft(Math.round(b.scroll.x * b.scrollratio.x), b.opt.cursordragspeed) : b.doScrollTop(Math.round(b.scroll.y * b.scrollratio.y), b.opt.cursordragspeed));
                            });return b.cancelEvent(d);
                        }
                    };if (g.cantouch || b.opt.touchbehavior) b.onpreventclick = function (d) {
                        if (b.preventclick) return b.preventclick.tg.onclick = b.preventclick.click, b.preventclick = !1, b.cancelEvent(d);
                    }, b.bind(b.win, "mousedown", b.ontouchstart), b.onclick = g.isios ? !1 : function (d) {
                        return b.lastmouseup ? (b.lastmouseup = !1, b.cancelEvent(d)) : !0;
                    }, b.opt.grabcursorenabled && g.cursorgrabvalue && (b.css(b.ispage ? b.doc : b.win, { cursor: g.cursorgrabvalue }), b.css(b.rail, { cursor: g.cursorgrabvalue }));else {
                        var p = function p(d) {
                            if (b.selectiondrag) {
                                if (d) {
                                    var c = b.win.outerHeight();d = d.pageY - b.selectiondrag.top;0 < d && d < c && (d = 0);d >= c && (d -= c);b.selectiondrag.df = d;
                                }0 != b.selectiondrag.df && (b.doScrollBy(2 * -Math.floor(b.selectiondrag.df / 6)), b.debounced("doselectionscroll", function () {
                                    p();
                                }, 50));
                            }
                        };b.hasTextSelected = "getSelection" in document ? function () {
                            return 0 < document.getSelection().rangeCount;
                        } : "selection" in document ? function () {
                            return "None" != document.selection.type;
                        } : function () {
                            return !1;
                        };b.onselectionstart = function (d) {
                            b.ispage || (b.selectiondrag = b.win.offset());
                        };b.onselectionend = function (d) {
                            b.selectiondrag = !1;
                        };b.onselectiondrag = function (d) {
                            b.selectiondrag && b.hasTextSelected() && b.debounced("selectionscroll", function () {
                                p(d);
                            }, 250);
                        };
                    }g.hasmstouch && (b.css(b.rail, { "-ms-touch-action": "none" }), b.css(b.cursor, { "-ms-touch-action": "none" }), b.bind(b.win, "MSPointerDown", b.ontouchstart), b.bind(document, "MSPointerUp", b.ontouchend), b.bind(document, "MSPointerMove", b.ontouchmove), b.bind(b.cursor, "MSGestureHold", function (b) {
                        b.preventDefault();
                    }), b.bind(b.cursor, "contextmenu", function (b) {
                        b.preventDefault();
                    }));this.istouchcapable && (b.bind(b.win, "touchstart", b.ontouchstart), b.bind(document, "touchend", b.ontouchend), b.bind(document, "touchcancel", b.ontouchend), b.bind(document, "touchmove", b.ontouchmove));b.bind(b.cursor, "mousedown", b.onmousedown);b.bind(b.cursor, "mouseup", b.onmouseup);b.railh && (b.bind(b.cursorh, "mousedown", function (d) {
                        b.onmousedown(d, !0);
                    }), b.bind(b.cursorh, "mouseup", function (d) {
                        if (!(b.rail.drag && 2 == b.rail.drag.pt)) return b.rail.drag = !1, b.hasmoving = !1, b.hideCursor(), g.hasmousecapture && document.releaseCapture(), b.cancelEvent(d);
                    }));if (b.opt.cursordragontouch || !g.cantouch && !b.opt.touchbehavior) b.rail.css({ cursor: "default" }), b.railh && b.railh.css({ cursor: "default" }), b.jqbind(b.rail, "mouseenter", function () {
                        b.canshowonmouseevent && b.showCursor();b.rail.active = !0;
                    }), b.jqbind(b.rail, "mouseleave", function () {
                        b.rail.active = !1;b.rail.drag || b.hideCursor();
                    }), b.opt.sensitiverail && (b.bind(b.rail, "click", function (d) {
                        b.doRailClick(d, !1, !1);
                    }), b.bind(b.rail, "dblclick", function (d) {
                        b.doRailClick(d, !0, !1);
                    }), b.bind(b.cursor, "click", function (d) {
                        b.cancelEvent(d);
                    }), b.bind(b.cursor, "dblclick", function (d) {
                        b.cancelEvent(d);
                    })), b.railh && (b.jqbind(b.railh, "mouseenter", function () {
                        b.canshowonmouseevent && b.showCursor();b.rail.active = !0;
                    }), b.jqbind(b.railh, "mouseleave", function () {
                        b.rail.active = !1;b.rail.drag || b.hideCursor();
                    }), b.opt.sensitiverail && (b.bind(b.railh, "click", function (d) {
                        b.doRailClick(d, !1, !0);
                    }), b.bind(b.railh, "dblclick", function (d) {
                        b.doRailClick(d, !0, !0);
                    }), b.bind(b.cursorh, "click", function (d) {
                        b.cancelEvent(d);
                    }), b.bind(b.cursorh, "dblclick", function (d) {
                        b.cancelEvent(d);
                    })));!g.cantouch && !b.opt.touchbehavior ? (b.bind(g.hasmousecapture ? b.win : document, "mouseup", b.onmouseup), b.bind(document, "mousemove", b.onmousemove), b.onclick && b.bind(document, "click", b.onclick), !b.ispage && b.opt.enablescrollonselection && (b.bind(b.win[0], "mousedown", b.onselectionstart), b.bind(document, "mouseup", b.onselectionend), b.bind(b.cursor, "mouseup", b.onselectionend), b.cursorh && b.bind(b.cursorh, "mouseup", b.onselectionend), b.bind(document, "mousemove", b.onselectiondrag)), b.zoom && (b.jqbind(b.zoom, "mouseenter", function () {
                        b.canshowonmouseevent && b.showCursor();b.rail.active = !0;
                    }), b.jqbind(b.zoom, "mouseleave", function () {
                        b.rail.active = !1;b.rail.drag || b.hideCursor();
                    }))) : (b.bind(g.hasmousecapture ? b.win : document, "mouseup", b.ontouchend), b.bind(document, "mousemove", b.ontouchmove), b.onclick && b.bind(document, "click", b.onclick), b.opt.cursordragontouch && (b.bind(b.cursor, "mousedown", b.onmousedown), b.bind(b.cursor, "mousemove", b.onmousemove), b.cursorh && b.bind(b.cursorh, "mousedown", function (d) {
                        b.onmousedown(d, !0);
                    }), b.cursorh && b.bind(b.cursorh, "mousemove", b.onmousemove)));b.opt.enablemousewheel && (b.isiframe || b.bind(g.isie && b.ispage ? document : b.win, "mousewheel", b.onmousewheel), b.bind(b.rail, "mousewheel", b.onmousewheel), b.railh && b.bind(b.railh, "mousewheel", b.onmousewheelhr));!b.ispage && !g.cantouch && !/HTML|BODY/.test(b.win[0].nodeName) && (b.win.attr("tabindex") || b.win.attr({ tabindex: L++ }), b.jqbind(b.win, "focus", function (d) {
                        z = b.getTarget(d).id || !0;b.hasfocus = !0;b.canshowonmouseevent && b.noticeCursor();
                    }), b.jqbind(b.win, "blur", function (d) {
                        z = !1;b.hasfocus = !1;
                    }), b.jqbind(b.win, "mouseenter", function (d) {
                        E = b.getTarget(d).id || !0;b.hasmousefocus = !0;b.canshowonmouseevent && b.noticeCursor();
                    }), b.jqbind(b.win, "mouseleave", function () {
                        E = !1;b.hasmousefocus = !1;b.rail.drag || b.hideCursor();
                    }));
                }b.onkeypress = function (d) {
                    if (b.locked && 0 == b.page.maxh) return !0;d = d ? d : window.e;var c = b.getTarget(d);if (c && /INPUT|TEXTAREA|SELECT|OPTION/.test(c.nodeName) && (!c.getAttribute("type") && !c.type || !/submit|button|cancel/i.tp)) return !0;if (b.hasfocus || b.hasmousefocus && !z || b.ispage && !z && !E) {
                        c = d.keyCode;if (b.locked && 27 != c) return b.cancelEvent(d);
                        var f = d.ctrlKey || !1,
                            n = d.shiftKey || !1,
                            g = !1;switch (c) {case 38:case 63233:
                                b.doScrollBy(72);g = !0;break;case 40:case 63235:
                                b.doScrollBy(-72);g = !0;break;case 37:case 63232:
                                b.railh && (f ? b.doScrollLeft(0) : b.doScrollLeftBy(72), g = !0);break;case 39:case 63234:
                                b.railh && (f ? b.doScrollLeft(b.page.maxw) : b.doScrollLeftBy(-72), g = !0);break;case 33:case 63276:
                                b.doScrollBy(b.view.h);g = !0;break;case 34:case 63277:
                                b.doScrollBy(-b.view.h);g = !0;break;case 36:case 63273:
                                b.railh && f ? b.doScrollPos(0, 0) : b.doScrollTo(0);g = !0;break;
                            case 35:case 63275:
                                b.railh && f ? b.doScrollPos(b.page.maxw, b.page.maxh) : b.doScrollTo(b.page.maxh);g = !0;break;case 32:
                                b.opt.spacebarenabled && (n ? b.doScrollBy(b.view.h) : b.doScrollBy(-b.view.h), g = !0);break;case 27:
                                b.zoomactive && (b.doZoom(), g = !0);}if (g) return b.cancelEvent(d);
                    }
                };b.opt.enablekeyboard && b.bind(document, g.isopera && !g.isopera12 ? "keypress" : "keydown", b.onkeypress);b.bind(window, "resize", b.lazyResize);b.bind(window, "orientationchange", b.lazyResize);b.bind(window, "load", b.lazyResize);if (g.ischrome && !b.ispage && !b.haswrapper) {
                    var s = b.win.attr("style"),
                        f = parseFloat(b.win.css("width")) + 1;b.win.css("width", f);b.synched("chromefix", function () {
                        b.win.attr("style", s);
                    });
                }b.onAttributeChange = function (d) {
                    b.lazyResize(250);
                };!b.ispage && !b.haswrapper && (!1 !== A ? (b.observer = new A(function (d) {
                    d.forEach(b.onAttributeChange);
                }), b.observer.observe(b.win[0], { childList: !0, characterData: !1, attributes: !0, subtree: !1 }), b.observerremover = new A(function (d) {
                    d.forEach(function (d) {
                        if (0 < d.removedNodes.length) for (var c in d.removedNodes) {
                            if (d.removedNodes[c] == b.win[0]) return b.remove();
                        }
                    });
                }), b.observerremover.observe(b.win[0].parentNode, { childList: !0, characterData: !1, attributes: !1, subtree: !1 })) : (b.bind(b.win, g.isie && !g.isie9 ? "propertychange" : "DOMAttrModified", b.onAttributeChange), g.isie9 && b.win[0].attachEvent("onpropertychange", b.onAttributeChange), b.bind(b.win, "DOMNodeRemoved", function (d) {
                    d.target == b.win[0] && b.remove();
                })));!b.ispage && b.opt.boxzoom && b.bind(window, "resize", b.resizeZoom);b.istextarea && b.bind(b.win, "mouseup", b.lazyResize);b.checkrtlmode = !0;
                b.lazyResize(30);
            }if ("IFRAME" == this.doc[0].nodeName) {
                var K = function K(d) {
                    b.iframexd = !1;try {
                        var c = "contentDocument" in this ? this.contentDocument : this.contentWindow.document;
                    } catch (f) {
                        b.iframexd = !0, c = !1;
                    }if (b.iframexd) return "console" in window && console.log("NiceScroll error: policy restriced iframe"), !0;b.forcescreen = !0;b.isiframe && (b.iframe = { doc: e(c), html: b.doc.contents().find("html")[0], body: b.doc.contents().find("body")[0] }, b.getContentSize = function () {
                        return { w: Math.max(b.iframe.html.scrollWidth, b.iframe.body.scrollWidth),
                            h: Math.max(b.iframe.html.scrollHeight, b.iframe.body.scrollHeight) };
                    }, b.docscroll = e(b.iframe.body));!g.isios && b.opt.iframeautoresize && !b.isiframe && (b.win.scrollTop(0), b.doc.height(""), d = Math.max(c.getElementsByTagName("html")[0].scrollHeight, c.body.scrollHeight), b.doc.height(d));b.lazyResize(30);g.isie7 && b.css(e(b.iframe.html), { "overflow-y": "hidden" });b.css(e(b.iframe.body), { "overflow-y": "hidden" });g.isios && b.haswrapper && b.css(e(c.body), { "-webkit-transform": "translate3d(0,0,0)" });"contentWindow" in this ? b.bind(this.contentWindow, "scroll", b.onscroll) : b.bind(c, "scroll", b.onscroll);b.opt.enablemousewheel && b.bind(c, "mousewheel", b.onmousewheel);b.opt.enablekeyboard && b.bind(c, g.isopera ? "keypress" : "keydown", b.onkeypress);if (g.cantouch || b.opt.touchbehavior) b.bind(c, "mousedown", b.ontouchstart), b.bind(c, "mousemove", function (d) {
                        b.ontouchmove(d, !0);
                    }), b.opt.grabcursorenabled && g.cursorgrabvalue && b.css(e(c.body), { cursor: g.cursorgrabvalue });b.bind(c, "mouseup", b.ontouchend);b.zoom && (b.opt.dblclickzoom && b.bind(c, "dblclick", b.doZoom), b.ongesturezoom && b.bind(c, "gestureend", b.ongesturezoom));
                };this.doc[0].readyState && "complete" == this.doc[0].readyState && setTimeout(function () {
                    K.call(b.doc[0], !1);
                }, 500);b.bind(this.doc, "load", K);
            }
        };this.showCursor = function (d, c) {
            b.cursortimeout && (clearTimeout(b.cursortimeout), b.cursortimeout = 0);if (b.rail) {
                b.autohidedom && (b.autohidedom.stop().css({ opacity: b.opt.cursoropacitymax }), b.cursoractive = !0);if (!b.rail.drag || 1 != b.rail.drag.pt) "undefined" != typeof d && !1 !== d && (b.scroll.y = Math.round(1 * d / b.scrollratio.y)), "undefined" != typeof c && (b.scroll.x = Math.round(1 * c / b.scrollratio.x));b.cursor.css({ height: b.cursorheight, top: b.scroll.y });b.cursorh && (!b.rail.align && b.rail.visibility ? b.cursorh.css({ width: b.cursorwidth, left: b.scroll.x + b.rail.width }) : b.cursorh.css({ width: b.cursorwidth, left: b.scroll.x }), b.cursoractive = !0);b.zoom && b.zoom.stop().css({ opacity: b.opt.cursoropacitymax });
            }
        };this.hideCursor = function (d) {
            !b.cursortimeout && b.rail && b.autohidedom && !(b.hasmousefocus && "leave" == b.opt.autohidemode) && (b.cursortimeout = setTimeout(function () {
                if (!b.rail.active || !b.showonmouseevent) b.autohidedom.stop().animate({ opacity: b.opt.cursoropacitymin }), b.zoom && b.zoom.stop().animate({ opacity: b.opt.cursoropacitymin }), b.cursoractive = !1;b.cursortimeout = 0;
            }, d || b.opt.hidecursordelay));
        };this.noticeCursor = function (d, c, f) {
            b.showCursor(c, f);b.rail.active || b.hideCursor(d);
        };this.getContentSize = b.ispage ? function () {
            return { w: Math.max(document.body.scrollWidth, document.documentElement.scrollWidth), h: Math.max(document.body.scrollHeight, document.documentElement.scrollHeight) };
        } : b.haswrapper ? function () {
            return { w: b.doc.outerWidth() + parseInt(b.win.css("paddingLeft")) + parseInt(b.win.css("paddingRight")), h: b.doc.outerHeight() + parseInt(b.win.css("paddingTop")) + parseInt(b.win.css("paddingBottom")) };
        } : function () {
            return { w: b.docscroll[0].scrollWidth, h: b.docscroll[0].scrollHeight };
        };this.onResize = function (d, c) {
            if (!b.win) return !1;if (!b.haswrapper && !b.ispage) {
                if ("none" == b.win.css("display")) return b.visibility && b.hideRail().hideRailHr(), !1;!b.hidden && !b.visibility && b.showRail().showRailHr();
            }var f = b.page.maxh,
                g = b.page.maxw,
                e = b.view.w;b.view = { w: b.ispage ? b.win.width() : parseInt(b.win[0].clientWidth), h: b.ispage ? b.win.height() : parseInt(b.win[0].clientHeight) };b.page = c ? c : b.getContentSize();b.page.maxh = Math.max(0, b.page.h - b.view.h);b.page.maxw = Math.max(0, b.page.w - b.view.w);if (b.page.maxh == f && b.page.maxw == g && b.view.w == e) {
                if (b.ispage) return b;f = b.win.offset();if (b.lastposition && (g = b.lastposition, g.top == f.top && g.left == f.left)) return b;b.lastposition = f;
            }0 == b.page.maxh ? (b.hideRail(), b.scrollvaluemax = 0, b.scroll.y = 0, b.scrollratio.y = 0, b.cursorheight = 0, b.setScrollTop(0), b.rail.scrollable = !1) : b.rail.scrollable = !0;0 == b.page.maxw ? (b.hideRailHr(), b.scrollvaluemaxw = 0, b.scroll.x = 0, b.scrollratio.x = 0, b.cursorwidth = 0, b.setScrollLeft(0), b.railh.scrollable = !1) : b.railh.scrollable = !0;b.locked = 0 == b.page.maxh && 0 == b.page.maxw;if (b.locked) return b.ispage || b.updateScrollBar(b.view), !1;!b.hidden && !b.visibility ? b.showRail().showRailHr() : !b.hidden && !b.railh.visibility && b.showRailHr();
            b.istextarea && b.win.css("resize") && "none" != b.win.css("resize") && (b.view.h -= 20);b.cursorheight = Math.min(b.view.h, Math.round(b.view.h * (b.view.h / b.page.h)));b.cursorheight = b.opt.cursorfixedheight ? b.opt.cursorfixedheight : Math.max(b.opt.cursorminheight, b.cursorheight);b.cursorwidth = Math.min(b.view.w, Math.round(b.view.w * (b.view.w / b.page.w)));b.cursorwidth = b.opt.cursorfixedheight ? b.opt.cursorfixedheight : Math.max(b.opt.cursorminheight, b.cursorwidth);b.scrollvaluemax = b.view.h - b.cursorheight - b.cursor.hborder;
            b.railh && (b.railh.width = 0 < b.page.maxh ? b.view.w - b.rail.width : b.view.w, b.scrollvaluemaxw = b.railh.width - b.cursorwidth - b.cursorh.wborder);b.checkrtlmode && b.railh && (b.checkrtlmode = !1, b.opt.rtlmode && 0 == b.scroll.x && b.setScrollLeft(b.page.maxw));b.ispage || b.updateScrollBar(b.view);b.scrollratio = { x: b.page.maxw / b.scrollvaluemaxw, y: b.page.maxh / b.scrollvaluemax };b.getScrollTop() > b.page.maxh ? b.doScrollTop(b.page.maxh) : (b.scroll.y = Math.round(b.getScrollTop() * (1 / b.scrollratio.y)), b.scroll.x = Math.round(b.getScrollLeft() * (1 / b.scrollratio.x)), b.cursoractive && b.noticeCursor());b.scroll.y && 0 == b.getScrollTop() && b.doScrollTo(Math.floor(b.scroll.y * b.scrollratio.y));return b;
        };this.resize = b.onResize;this.lazyResize = function (d) {
            d = isNaN(d) ? 30 : d;b.delayed("resize", b.resize, d);return b;
        };this._bind = function (d, c, f, g) {
            b.events.push({ e: d, n: c, f: f, b: g, q: !1 });d.addEventListener ? d.addEventListener(c, f, g || !1) : d.attachEvent ? d.attachEvent("on" + c, f) : d["on" + c] = f;
        };this.jqbind = function (d, c, f) {
            b.events.push({ e: d, n: c, f: f, q: !0 });e(d).bind(c, f);
        };
        this.bind = function (d, c, f, e) {
            var k = "jquery" in d ? d[0] : d;"mousewheel" == c ? "onwheel" in b.win ? b._bind(k, "wheel", f, e || !1) : (d = "undefined" != typeof document.onmousewheel ? "mousewheel" : "DOMMouseScroll", q(k, d, f, e || !1), "DOMMouseScroll" == d && q(k, "MozMousePixelScroll", f, e || !1)) : k.addEventListener ? (g.cantouch && /mouseup|mousedown|mousemove/.test(c) && b._bind(k, "mousedown" == c ? "touchstart" : "mouseup" == c ? "touchend" : "touchmove", function (b) {
                if (b.touches) {
                    if (2 > b.touches.length) {
                        var d = b.touches.length ? b.touches[0] : b;d.original = b;f.call(this, d);
                    }
                } else b.changedTouches && (d = b.changedTouches[0], d.original = b, f.call(this, d));
            }, e || !1), b._bind(k, c, f, e || !1), g.cantouch && "mouseup" == c && b._bind(k, "touchcancel", f, e || !1)) : b._bind(k, c, function (d) {
                if ((d = d || window.event || !1) && d.srcElement) d.target = d.srcElement;"pageY" in d || (d.pageX = d.clientX + document.documentElement.scrollLeft, d.pageY = d.clientY + document.documentElement.scrollTop);return !1 === f.call(k, d) || !1 === e ? b.cancelEvent(d) : !0;
            });
        };this._unbind = function (b, c, f, g) {
            b.removeEventListener ? b.removeEventListener(c, f, g) : b.detachEvent ? b.detachEvent("on" + c, f) : b["on" + c] = !1;
        };this.unbindAll = function () {
            for (var d = 0; d < b.events.length; d++) {
                var c = b.events[d];c.q ? c.e.unbind(c.n, c.f) : b._unbind(c.e, c.n, c.f, c.b);
            }
        };this.cancelEvent = function (b) {
            b = b.original ? b.original : b ? b : window.event || !1;if (!b) return !1;b.preventDefault && b.preventDefault();b.stopPropagation && b.stopPropagation();b.preventManipulation && b.preventManipulation();b.cancelBubble = !0;b.cancel = !0;return b.returnValue = !1;
        };this.stopPropagation = function (b) {
            b = b.original ? b.original : b ? b : window.event || !1;if (!b) return !1;if (b.stopPropagation) return b.stopPropagation();b.cancelBubble && (b.cancelBubble = !0);return !1;
        };this.showRail = function () {
            if (0 != b.page.maxh && (b.ispage || "none" != b.win.css("display"))) b.visibility = !0, b.rail.visibility = !0, b.rail.css("display", "block");return b;
        };this.showRailHr = function () {
            if (!b.railh) return b;if (0 != b.page.maxw && (b.ispage || "none" != b.win.css("display"))) b.railh.visibility = !0, b.railh.css("display", "block");return b;
        };this.hideRail = function () {
            b.visibility = !1;b.rail.visibility = !1;b.rail.css("display", "none");return b;
        };this.hideRailHr = function () {
            if (!b.railh) return b;b.railh.visibility = !1;b.railh.css("display", "none");return b;
        };this.show = function () {
            b.hidden = !1;b.locked = !1;return b.showRail().showRailHr();
        };this.hide = function () {
            b.hidden = !0;b.locked = !0;return b.hideRail().hideRailHr();
        };this.toggle = function () {
            return b.hidden ? b.show() : b.hide();
        };this.remove = function () {
            b.stop();b.cursortimeout && clearTimeout(b.cursortimeout);b.doZoomOut();b.unbindAll();g.isie9 && b.win[0].detachEvent("onpropertychange", b.onAttributeChange);!1 !== b.observer && b.observer.disconnect();!1 !== b.observerremover && b.observerremover.disconnect();b.events = null;b.cursor && b.cursor.remove();b.cursorh && b.cursorh.remove();b.rail && b.rail.remove();b.railh && b.railh.remove();b.zoom && b.zoom.remove();for (var d = 0; d < b.saved.css.length; d++) {
                var c = b.saved.css[d];c[0].css(c[1], "undefined" == typeof c[2] ? "" : c[2]);
            }b.saved = !1;b.me.data("__nicescroll", "");var f = e.nicescroll;f.each(function (d) {
                if (this && this.id === b.id) {
                    delete f[d];for (var c = ++d; c < f.length; c++, d++) {
                        f[d] = f[c];
                    }f.length--;f.length && delete f[f.length];
                }
            });for (var k in b) {
                b[k] = null, delete b[k];
            }b = null;
        };this.scrollstart = function (d) {
            this.onscrollstart = d;return b;
        };this.scrollend = function (d) {
            this.onscrollend = d;return b;
        };this.scrollcancel = function (d) {
            this.onscrollcancel = d;return b;
        };this.zoomin = function (d) {
            this.onzoomin = d;return b;
        };this.zoomout = function (d) {
            this.onzoomout = d;return b;
        };this.isScrollable = function (b) {
            b = b.target ? b.target : b;if ("OPTION" == b.nodeName) return !0;
            for (; b && 1 == b.nodeType && !/BODY|HTML/.test(b.nodeName);) {
                var c = e(b),
                    c = c.css("overflowY") || c.css("overflowX") || c.css("overflow") || "";if (/scroll|auto/.test(c)) return b.clientHeight != b.scrollHeight;b = b.parentNode ? b.parentNode : !1;
            }return !1;
        };this.getViewport = function (b) {
            for (b = b && b.parentNode ? b.parentNode : !1; b && 1 == b.nodeType && !/BODY|HTML/.test(b.nodeName);) {
                var c = e(b);if (/fixed|absolute/.test(c.css("position"))) return c;var f = c.css("overflowY") || c.css("overflowX") || c.css("overflow") || "";if (/scroll|auto/.test(f) && b.clientHeight != b.scrollHeight || 0 < c.getNiceScroll().length) return c;b = b.parentNode ? b.parentNode : !1;
            }return !1;
        };this.onmousewheel = function (d) {
            if (b.locked) return b.debounced("checkunlock", b.resize, 250), !0;if (b.rail.drag) return b.cancelEvent(d);"auto" == b.opt.oneaxismousemode && 0 != d.deltaX && (b.opt.oneaxismousemode = !1);if (b.opt.oneaxismousemode && 0 == d.deltaX && !b.rail.scrollable) return b.railh && b.railh.scrollable ? b.onmousewheelhr(d) : !0;var c = +new Date(),
                f = !1;b.opt.preservenativescrolling && b.checkarea + 600 < c && (b.nativescrollingarea = b.isScrollable(d), f = !0);b.checkarea = c;if (b.nativescrollingarea) return !0;if (d = t(d, !1, f)) b.checkarea = 0;return d;
        };this.onmousewheelhr = function (d) {
            if (b.locked || !b.railh.scrollable) return !0;if (b.rail.drag) return b.cancelEvent(d);var c = +new Date(),
                f = !1;b.opt.preservenativescrolling && b.checkarea + 600 < c && (b.nativescrollingarea = b.isScrollable(d), f = !0);b.checkarea = c;return b.nativescrollingarea ? !0 : b.locked ? b.cancelEvent(d) : t(d, !0, f);
        };this.stop = function () {
            b.cancelScroll();b.scrollmon && b.scrollmon.stop();
            b.cursorfreezed = !1;b.scroll.y = Math.round(b.getScrollTop() * (1 / b.scrollratio.y));b.noticeCursor();return b;
        };this.getTransitionSpeed = function (d) {
            var c = Math.round(10 * b.opt.scrollspeed);d = Math.min(c, Math.round(d / 20 * b.opt.scrollspeed));return 20 < d ? d : 0;
        };b.opt.smoothscroll ? b.ishwscroll && g.hastransition && b.opt.usetransition ? (this.prepareTransition = function (d, c) {
            var f = c ? 20 < d ? d : 0 : b.getTransitionSpeed(d),
                e = f ? g.prefixstyle + "transform " + f + "ms ease-out" : "";if (!b.lasttransitionstyle || b.lasttransitionstyle != e) b.lasttransitionstyle = e, b.doc.css(g.transitionstyle, e);return f;
        }, this.doScrollLeft = function (c, g) {
            var f = b.scrollrunning ? b.newscrolly : b.getScrollTop();b.doScrollPos(c, f, g);
        }, this.doScrollTop = function (c, g) {
            var f = b.scrollrunning ? b.newscrollx : b.getScrollLeft();b.doScrollPos(f, c, g);
        }, this.doScrollPos = function (c, e, f) {
            var k = b.getScrollTop(),
                l = b.getScrollLeft();(0 > (b.newscrolly - k) * (e - k) || 0 > (b.newscrollx - l) * (c - l)) && b.cancelScroll();!1 == b.opt.bouncescroll && (0 > e ? e = 0 : e > b.page.maxh && (e = b.page.maxh), 0 > c ? c = 0 : c > b.page.maxw && (c = b.page.maxw));
            if (b.scrollrunning && c == b.newscrollx && e == b.newscrolly) return !1;b.newscrolly = e;b.newscrollx = c;b.newscrollspeed = f || !1;if (b.timer) return !1;b.timer = setTimeout(function () {
                var f = b.getScrollTop(),
                    k = b.getScrollLeft(),
                    l,
                    h;l = c - k;h = e - f;l = Math.round(Math.sqrt(Math.pow(l, 2) + Math.pow(h, 2)));l = b.newscrollspeed && 1 < b.newscrollspeed ? b.newscrollspeed : b.getTransitionSpeed(l);b.newscrollspeed && 1 >= b.newscrollspeed && (l *= b.newscrollspeed);b.prepareTransition(l, !0);b.timerscroll && b.timerscroll.tm && clearInterval(b.timerscroll.tm);
                0 < l && (!b.scrollrunning && b.onscrollstart && b.onscrollstart.call(b, { type: "scrollstart", current: { x: k, y: f }, request: { x: c, y: e }, end: { x: b.newscrollx, y: b.newscrolly }, speed: l }), g.transitionend ? b.scrollendtrapped || (b.scrollendtrapped = !0, b.bind(b.doc, g.transitionend, b.onScrollEnd, !1)) : (b.scrollendtrapped && clearTimeout(b.scrollendtrapped), b.scrollendtrapped = setTimeout(b.onScrollEnd, l)), b.timerscroll = { bz: new BezierClass(f, b.newscrolly, l, 0, 0, 0.58, 1), bh: new BezierClass(k, b.newscrollx, l, 0, 0, 0.58, 1) }, b.cursorfreezed || (b.timerscroll.tm = setInterval(function () {
                    b.showCursor(b.getScrollTop(), b.getScrollLeft());
                }, 60)));b.synched("doScroll-set", function () {
                    b.timer = 0;b.scrollendtrapped && (b.scrollrunning = !0);b.setScrollTop(b.newscrolly);b.setScrollLeft(b.newscrollx);if (!b.scrollendtrapped) b.onScrollEnd();
                });
            }, 50);
        }, this.cancelScroll = function () {
            if (!b.scrollendtrapped) return !0;var c = b.getScrollTop(),
                e = b.getScrollLeft();b.scrollrunning = !1;g.transitionend || clearTimeout(g.transitionend);b.scrollendtrapped = !1;b._unbind(b.doc, g.transitionend, b.onScrollEnd);b.prepareTransition(0);b.setScrollTop(c);b.railh && b.setScrollLeft(e);b.timerscroll && b.timerscroll.tm && clearInterval(b.timerscroll.tm);b.timerscroll = !1;b.cursorfreezed = !1;b.showCursor(c, e);return b;
        }, this.onScrollEnd = function () {
            b.scrollendtrapped && b._unbind(b.doc, g.transitionend, b.onScrollEnd);b.scrollendtrapped = !1;b.prepareTransition(0);b.timerscroll && b.timerscroll.tm && clearInterval(b.timerscroll.tm);b.timerscroll = !1;var c = b.getScrollTop(),
                e = b.getScrollLeft();b.setScrollTop(c);b.railh && b.setScrollLeft(e);b.noticeCursor(!1, c, e);b.cursorfreezed = !1;0 > c ? c = 0 : c > b.page.maxh && (c = b.page.maxh);0 > e ? e = 0 : e > b.page.maxw && (e = b.page.maxw);if (c != b.newscrolly || e != b.newscrollx) return b.doScrollPos(e, c, b.opt.snapbackspeed);b.onscrollend && b.scrollrunning && b.onscrollend.call(b, { type: "scrollend", current: { x: e, y: c }, end: { x: b.newscrollx, y: b.newscrolly } });b.scrollrunning = !1;
        }) : (this.doScrollLeft = function (c, g) {
            var f = b.scrollrunning ? b.newscrolly : b.getScrollTop();b.doScrollPos(c, f, g);
        }, this.doScrollTop = function (c, g) {
            var f = b.scrollrunning ? b.newscrollx : b.getScrollLeft();b.doScrollPos(f, c, g);
        }, this.doScrollPos = function (c, g, f) {
            function e() {
                if (b.cancelAnimationFrame) return !0;b.scrollrunning = !0;if (p = 1 - p) return b.timer = v(e) || 1;var c = 0,
                    d = sy = b.getScrollTop();if (b.dst.ay) {
                    var d = b.bzscroll ? b.dst.py + b.bzscroll.getNow() * b.dst.ay : b.newscrolly,
                        f = d - sy;if (0 > f && d < b.newscrolly || 0 < f && d > b.newscrolly) d = b.newscrolly;b.setScrollTop(d);d == b.newscrolly && (c = 1);
                } else c = 1;var g = sx = b.getScrollLeft();if (b.dst.ax) {
                    g = b.bzscroll ? b.dst.px + b.bzscroll.getNow() * b.dst.ax : b.newscrollx;f = g - sx;if (0 > f && g < b.newscrollx || 0 < f && g > b.newscrollx) g = b.newscrollx;b.setScrollLeft(g);g == b.newscrollx && (c += 1);
                } else c += 1;2 == c ? (b.timer = 0, b.cursorfreezed = !1, b.bzscroll = !1, b.scrollrunning = !1, 0 > d ? d = 0 : d > b.page.maxh && (d = b.page.maxh), 0 > g ? g = 0 : g > b.page.maxw && (g = b.page.maxw), g != b.newscrollx || d != b.newscrolly ? b.doScrollPos(g, d) : b.onscrollend && b.onscrollend.call(b, { type: "scrollend", current: { x: sx, y: sy }, end: { x: b.newscrollx, y: b.newscrolly } })) : b.timer = v(e) || 1;
            }g = "undefined" == typeof g || !1 === g ? b.getScrollTop(!0) : g;if (b.timer && b.newscrolly == g && b.newscrollx == c) return !0;b.timer && w(b.timer);b.timer = 0;var k = b.getScrollTop(),
                l = b.getScrollLeft();(0 > (b.newscrolly - k) * (g - k) || 0 > (b.newscrollx - l) * (c - l)) && b.cancelScroll();b.newscrolly = g;b.newscrollx = c;if (!b.bouncescroll || !b.rail.visibility) 0 > b.newscrolly ? b.newscrolly = 0 : b.newscrolly > b.page.maxh && (b.newscrolly = b.page.maxh);if (!b.bouncescroll || !b.railh.visibility) 0 > b.newscrollx ? b.newscrollx = 0 : b.newscrollx > b.page.maxw && (b.newscrollx = b.page.maxw);b.dst = {};b.dst.x = c - l;b.dst.y = g - k;b.dst.px = l;b.dst.py = k;var h = Math.round(Math.sqrt(Math.pow(b.dst.x, 2) + Math.pow(b.dst.y, 2)));b.dst.ax = b.dst.x / h;b.dst.ay = b.dst.y / h;var m = 0,
                q = h;0 == b.dst.x ? (m = k, q = g, b.dst.ay = 1, b.dst.py = 0) : 0 == b.dst.y && (m = l, q = c, b.dst.ax = 1, b.dst.px = 0);h = b.getTransitionSpeed(h);f && 1 >= f && (h *= f);b.bzscroll = 0 < h ? b.bzscroll ? b.bzscroll.update(q, h) : new BezierClass(m, q, h, 0, 1, 0, 1) : !1;if (!b.timer) {
                (k == b.page.maxh && g >= b.page.maxh || l == b.page.maxw && c >= b.page.maxw) && b.checkContentSize();var p = 1;b.cancelAnimationFrame = !1;b.timer = 1;
                b.onscrollstart && !b.scrollrunning && b.onscrollstart.call(b, { type: "scrollstart", current: { x: l, y: k }, request: { x: c, y: g }, end: { x: b.newscrollx, y: b.newscrolly }, speed: h });e();(k == b.page.maxh && g >= k || l == b.page.maxw && c >= l) && b.checkContentSize();b.noticeCursor();
            }
        }, this.cancelScroll = function () {
            b.timer && w(b.timer);b.timer = 0;b.bzscroll = !1;b.scrollrunning = !1;return b;
        }) : (this.doScrollLeft = function (c, g) {
            var f = b.getScrollTop();b.doScrollPos(c, f, g);
        }, this.doScrollTop = function (c, g) {
            var f = b.getScrollLeft();b.doScrollPos(f, c, g);
        }, this.doScrollPos = function (c, g, f) {
            var e = c > b.page.maxw ? b.page.maxw : c;0 > e && (e = 0);var k = g > b.page.maxh ? b.page.maxh : g;0 > k && (k = 0);b.synched("scroll", function () {
                b.setScrollTop(k);b.setScrollLeft(e);
            });
        }, this.cancelScroll = function () {});this.doScrollBy = function (c, g) {
            var f = 0,
                f = g ? Math.floor((b.scroll.y - c) * b.scrollratio.y) : (b.timer ? b.newscrolly : b.getScrollTop(!0)) - c;if (b.bouncescroll) {
                var e = Math.round(b.view.h / 2);f < -e ? f = -e : f > b.page.maxh + e && (f = b.page.maxh + e);
            }b.cursorfreezed = !1;py = b.getScrollTop(!0);if (0 > f && 0 >= py) return b.noticeCursor();if (f > b.page.maxh && py >= b.page.maxh) return b.checkContentSize(), b.noticeCursor();b.doScrollTop(f);
        };this.doScrollLeftBy = function (c, g) {
            var f = 0,
                f = g ? Math.floor((b.scroll.x - c) * b.scrollratio.x) : (b.timer ? b.newscrollx : b.getScrollLeft(!0)) - c;if (b.bouncescroll) {
                var e = Math.round(b.view.w / 2);f < -e ? f = -e : f > b.page.maxw + e && (f = b.page.maxw + e);
            }b.cursorfreezed = !1;px = b.getScrollLeft(!0);if (0 > f && 0 >= px || f > b.page.maxw && px >= b.page.maxw) return b.noticeCursor();b.doScrollLeft(f);
        };this.doScrollTo = function (c, g) {
            g && Math.round(c * b.scrollratio.y);b.cursorfreezed = !1;b.doScrollTop(c);
        };this.checkContentSize = function () {
            var c = b.getContentSize();(c.h != b.page.h || c.w != b.page.w) && b.resize(!1, c);
        };b.onscroll = function (c) {
            b.rail.drag || b.cursorfreezed || b.synched("scroll", function () {
                b.scroll.y = Math.round(b.getScrollTop() * (1 / b.scrollratio.y));b.railh && (b.scroll.x = Math.round(b.getScrollLeft() * (1 / b.scrollratio.x)));b.noticeCursor();
            });
        };b.bind(b.docscroll, "scroll", b.onscroll);this.doZoomIn = function (c) {
            if (!b.zoomactive) {
                b.zoomactive = !0;b.zoomrestore = { style: {} };var k = "position top left zIndex backgroundColor marginTop marginBottom marginLeft marginRight".split(" "),
                    f = b.win[0].style,
                    l;for (l in k) {
                    var h = k[l];b.zoomrestore.style[h] = "undefined" != typeof f[h] ? f[h] : "";
                }b.zoomrestore.style.width = b.win.css("width");b.zoomrestore.style.height = b.win.css("height");b.zoomrestore.padding = { w: b.win.outerWidth() - b.win.width(), h: b.win.outerHeight() - b.win.height() };g.isios4 && (b.zoomrestore.scrollTop = e(window).scrollTop(), e(window).scrollTop(0));
                b.win.css({ position: g.isios4 ? "absolute" : "fixed", top: 0, left: 0, "z-index": y + 100, margin: "0px" });k = b.win.css("backgroundColor");("" == k || /transparent|rgba\(0, 0, 0, 0\)|rgba\(0,0,0,0\)/.test(k)) && b.win.css("backgroundColor", "#fff");b.rail.css({ "z-index": y + 101 });b.zoom.css({ "z-index": y + 102 });b.zoom.css("backgroundPosition", "0px -18px");b.resizeZoom();b.onzoomin && b.onzoomin.call(b);return b.cancelEvent(c);
            }
        };this.doZoomOut = function (c) {
            if (b.zoomactive) return b.zoomactive = !1, b.win.css("margin", ""), b.win.css(b.zoomrestore.style), g.isios4 && e(window).scrollTop(b.zoomrestore.scrollTop), b.rail.css({ "z-index": b.zindex }), b.zoom.css({ "z-index": b.zindex }), b.zoomrestore = !1, b.zoom.css("backgroundPosition", "0px 0px"), b.onResize(), b.onzoomout && b.onzoomout.call(b), b.cancelEvent(c);
        };this.doZoom = function (c) {
            return b.zoomactive ? b.doZoomOut(c) : b.doZoomIn(c);
        };this.resizeZoom = function () {
            if (b.zoomactive) {
                var c = b.getScrollTop();b.win.css({ width: e(window).width() - b.zoomrestore.padding.w + "px", height: e(window).height() - b.zoomrestore.padding.h + "px" });
                b.onResize();b.setScrollTop(Math.min(b.page.maxh, c));
            }
        };this.init();e.nicescroll.push(this);
    },
        J = function J(e) {
        var c = this;this.nc = e;this.steptime = this.lasttime = this.speedy = this.speedx = this.lasty = this.lastx = 0;this.snapy = this.snapx = !1;this.demuly = this.demulx = 0;this.lastscrolly = this.lastscrollx = -1;this.timer = this.chky = this.chkx = 0;this.time = function () {
            return +new Date();
        };this.reset = function (e, l) {
            c.stop();var h = c.time();c.steptime = 0;c.lasttime = h;c.speedx = 0;c.speedy = 0;c.lastx = e;c.lasty = l;c.lastscrollx = -1;c.lastscrolly = -1;
        };this.update = function (e, l) {
            var h = c.time();c.steptime = h - c.lasttime;c.lasttime = h;var h = l - c.lasty,
                t = e - c.lastx,
                b = c.nc.getScrollTop(),
                p = c.nc.getScrollLeft(),
                b = b + h,
                p = p + t;c.snapx = 0 > p || p > c.nc.page.maxw;c.snapy = 0 > b || b > c.nc.page.maxh;c.speedx = t;c.speedy = h;c.lastx = e;c.lasty = l;
        };this.stop = function () {
            c.nc.unsynched("domomentum2d");c.timer && clearTimeout(c.timer);c.timer = 0;c.lastscrollx = -1;c.lastscrolly = -1;
        };this.doSnapy = function (e, l) {
            var h = !1;0 > l ? (l = 0, h = !0) : l > c.nc.page.maxh && (l = c.nc.page.maxh, h = !0);0 > e ? (e = 0, h = !0) : e > c.nc.page.maxw && (e = c.nc.page.maxw, h = !0);h && c.nc.doScrollPos(e, l, c.nc.opt.snapbackspeed);
        };this.doMomentum = function (e) {
            var l = c.time(),
                h = e ? l + e : c.lasttime;e = c.nc.getScrollLeft();var t = c.nc.getScrollTop(),
                b = c.nc.page.maxh,
                p = c.nc.page.maxw;c.speedx = 0 < p ? Math.min(60, c.speedx) : 0;c.speedy = 0 < b ? Math.min(60, c.speedy) : 0;h = h && 60 >= l - h;if (0 > t || t > b || 0 > e || e > p) h = !1;e = c.speedx && h ? c.speedx : !1;if (c.speedy && h && c.speedy || e) {
                var g = Math.max(16, c.steptime);50 < g && (e = g / 50, c.speedx *= e, c.speedy *= e, g = 50);c.demulxy = 0;c.lastscrollx = c.nc.getScrollLeft();c.chkx = c.lastscrollx;c.lastscrolly = c.nc.getScrollTop();c.chky = c.lastscrolly;var s = c.lastscrollx,
                    u = c.lastscrolly,
                    d = function d() {
                    var e = 600 < c.time() - l ? 0.04 : 0.02;if (c.speedx && (s = Math.floor(c.lastscrollx - c.speedx * (1 - c.demulxy)), c.lastscrollx = s, 0 > s || s > p)) e = 0.1;if (c.speedy && (u = Math.floor(c.lastscrolly - c.speedy * (1 - c.demulxy)), c.lastscrolly = u, 0 > u || u > b)) e = 0.1;c.demulxy = Math.min(1, c.demulxy + e);c.nc.synched("domomentum2d", function () {
                        c.speedx && (c.nc.getScrollLeft() != c.chkx && c.stop(), c.chkx = s, c.nc.setScrollLeft(s));c.speedy && (c.nc.getScrollTop() != c.chky && c.stop(), c.chky = u, c.nc.setScrollTop(u));c.timer || (c.nc.hideCursor(), c.doSnapy(s, u));
                    });1 > c.demulxy ? c.timer = setTimeout(d, g) : (c.stop(), c.nc.hideCursor(), c.doSnapy(s, u));
                };d();
            } else c.doSnapy(c.nc.getScrollLeft(), c.nc.getScrollTop());
        };
    },
        B = e.fn.scrollTop;e.cssHooks.pageYOffset = { get: function get(h, c, k) {
            return (c = e.data(h, "__nicescroll") || !1) && c.ishwscroll ? c.getScrollTop() : B.call(h);
        }, set: function set(h, c) {
            var k = e.data(h, "__nicescroll") || !1;k && k.ishwscroll ? k.setScrollTop(parseInt(c)) : B.call(h, c);return this;
        } };e.fn.scrollTop = function (h) {
        if ("undefined" == typeof h) {
            var c = this[0] ? e.data(this[0], "__nicescroll") || !1 : !1;return c && c.ishwscroll ? c.getScrollTop() : B.call(this);
        }return this.each(function () {
            var c = e.data(this, "__nicescroll") || !1;c && c.ishwscroll ? c.setScrollTop(parseInt(h)) : B.call(e(this), h);
        });
    };var C = e.fn.scrollLeft;e.cssHooks.pageXOffset = { get: function get(h, c, k) {
            return (c = e.data(h, "__nicescroll") || !1) && c.ishwscroll ? c.getScrollLeft() : C.call(h);
        }, set: function set(h, c) {
            var k = e.data(h, "__nicescroll") || !1;k && k.ishwscroll ? k.setScrollLeft(parseInt(c)) : C.call(h, c);return this;
        } };e.fn.scrollLeft = function (h) {
        if ("undefined" == typeof h) {
            var c = this[0] ? e.data(this[0], "__nicescroll") || !1 : !1;return c && c.ishwscroll ? c.getScrollLeft() : C.call(this);
        }return this.each(function () {
            var c = e.data(this, "__nicescroll") || !1;c && c.ishwscroll ? c.setScrollLeft(parseInt(h)) : C.call(e(this), h);
        });
    };var D = function D(h) {
        var c = this;this.length = 0;this.name = "nicescrollarray";this.each = function (e) {
            for (var h = 0, k = 0; h < c.length; h++) {
                e.call(c[h], k++);
            }return c;
        };this.push = function (e) {
            c[c.length] = e;c.length++;
        };this.eq = function (e) {
            return c[e];
        };if (h) for (a = 0; a < h.length; a++) {
            var k = e.data(h[a], "__nicescroll") || !1;k && (this[this.length] = k, this.length++);
        }return this;
    };(function (e, c, k) {
        for (var l = 0; l < c.length; l++) {
            k(e, c[l]);
        }
    })(D.prototype, "show hide toggle onResize resize remove stop doScrollPos".split(" "), function (e, c) {
        e[c] = function () {
            var e = arguments;return this.each(function () {
                this[c].apply(this, e);
            });
        };
    });e.fn.getNiceScroll = function (h) {
        return "undefined" == typeof h ? new D(this) : this[h] && e.data(this[h], "__nicescroll") || !1;
    };e.extend(e.expr[":"], { nicescroll: function nicescroll(h) {
            return e.data(h, "__nicescroll") ? !0 : !1;
        } });e.fn.niceScroll = function (h, c) {
        "undefined" == typeof c && "object" == (typeof h === "undefined" ? "undefined" : _typeof(h)) && !("jquery" in h) && (c = h, h = !1);var k = new D();"undefined" == typeof c && (c = {});h && (c.doc = e(h), c.win = e(this));var l = !("doc" in c);!l && !("win" in c) && (c.win = e(this));this.each(function () {
            var h = e(this).data("__nicescroll") || !1;h || (c.doc = l ? e(this) : c.doc, h = new Q(c, e(this)), e(this).data("__nicescroll", h));k.push(h);
        });return 1 == k.length ? k[0] : k;
    };window.NiceScroll = { getjQuery: function getjQuery() {
            return e;
        } };e.nicescroll || (e.nicescroll = new D(), e.nicescroll.options = I);
})(jQuery);

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * Copyright (c) 2007-2015 Ariel Flesler - aflesler ○ gmail • com | http://flesler.blogspot.com
 * Licensed under MIT
 * @author Ariel Flesler
 * @version 2.1.3
 */
;(function (f) {
  "use strict";
   true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(8)], __WEBPACK_AMD_DEFINE_FACTORY__ = (f),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : "undefined" !== typeof module && module.exports ? module.exports = f(require("jquery")) : f(jQuery);
})(function ($) {
  "use strict";
  function n(a) {
    return !a.nodeName || -1 !== $.inArray(a.nodeName.toLowerCase(), ["iframe", "#document", "html", "body"]);
  }function h(a) {
    return $.isFunction(a) || $.isPlainObject(a) ? a : { top: a, left: a };
  }var p = $.scrollTo = function (a, d, b) {
    return $(window).scrollTo(a, d, b);
  };p.defaults = { axis: "xy", duration: 0, limit: !0 };$.fn.scrollTo = function (a, d, b) {
    "object" === (typeof d === "undefined" ? "undefined" : _typeof(d)) && (b = d, d = 0);"function" === typeof b && (b = { onAfter: b });"max" === a && (a = 9E9);b = $.extend({}, p.defaults, b);d = d || b.duration;var u = b.queue && 1 < b.axis.length;u && (d /= 2);b.offset = h(b.offset);b.over = h(b.over);return this.each(function () {
      function k(a) {
        var k = $.extend({}, b, { queue: !0, duration: d, complete: a && function () {
            a.call(q, e, b);
          } });r.animate(f, k);
      }if (null !== a) {
        var l = n(this),
            q = l ? this.contentWindow || window : this,
            r = $(q),
            e = a,
            f = {},
            t;switch (typeof e === "undefined" ? "undefined" : _typeof(e)) {case "number":case "string":
            if (/^([+-]=?)?\d+(\.\d+)?(px|%)?$/.test(e)) {
              e = h(e);break;
            }e = l ? $(e) : $(e, q);case "object":
            if (e.length === 0) return;if (e.is || e.style) t = (e = $(e)).offset();}var v = $.isFunction(b.offset) && b.offset(q, e) || b.offset;$.each(b.axis.split(""), function (a, c) {
          var d = "x" === c ? "Left" : "Top",
              m = d.toLowerCase(),
              g = "scroll" + d,
              h = r[g](),
              n = p.max(q, c);t ? (f[g] = t[m] + (l ? 0 : h - r.offset()[m]), b.margin && (f[g] -= parseInt(e.css("margin" + d), 10) || 0, f[g] -= parseInt(e.css("border" + d + "Width"), 10) || 0), f[g] += v[m] || 0, b.over[m] && (f[g] += e["x" === c ? "width" : "height"]() * b.over[m])) : (d = e[m], f[g] = d.slice && "%" === d.slice(-1) ? parseFloat(d) / 100 * n : d);b.limit && /^\d+$/.test(f[g]) && (f[g] = 0 >= f[g] ? 0 : Math.min(f[g], n));!a && 1 < b.axis.length && (h === f[g] ? f = {} : u && (k(b.onAfterFirst), f = {}));
        });k(b.onAfter);
      }
    });
  };p.max = function (a, d) {
    var b = "x" === d ? "Width" : "Height",
        h = "scroll" + b;if (!n(a)) return a[h] - $(a)[b.toLowerCase()]();var b = "client" + b,
        k = a.ownerDocument || a.document,
        l = k.documentElement,
        k = k.body;return Math.max(l[h], k[h]) - Math.min(l[b], k[b]);
  };$.Tween.propHooks.scrollLeft = $.Tween.propHooks.scrollTop = { get: function get(a) {
      return $(a.elem)[a.prop]();
    }, set: function set(a) {
      var d = this.get(a);if (a.options.interrupt && a._last && a._last !== d) return $(a.elem).stop();var b = Math.round(a.now);d !== b && ($(a.elem)[a.prop](b), a._last = this.get(a));
    } };return p;
});

/***/ }),
/* 33 */
/***/ (function(module, exports) {

//portlets
!function ($) {
    "use strict";

    /**
    Portlet Widget
    */

    var Portlet = function Portlet() {
        this.$body = $("body"), this.$portletIdentifier = ".portlet", this.$portletCloser = '.portlet a[data-toggle="remove"]', this.$portletRefresher = '.portlet a[data-toggle="reload"]';
    };

    //on init
    Portlet.prototype.init = function () {
        // Panel closest
        var $this = this;
        $(document).on("click", this.$portletCloser, function (ev) {
            ev.preventDefault();
            var $portlet = $(this).closest($this.$portletIdentifier);
            var $portlet_parent = $portlet.parent();
            $portlet.remove();
            if ($portlet_parent.children().length == 0) {
                $portlet_parent.remove();
            }
        });

        // Panel Reload
        $(document).on("click", this.$portletRefresher, function (ev) {
            ev.preventDefault();
            var $portlet = $(this).closest($this.$portletIdentifier);
            // This is just a simulation, nothing is going to be reloaded
            $portlet.append('<div class="panel-disabled"><div class="loader-1"></div></div>');
            var $pd = $portlet.find('.panel-disabled');
            setTimeout(function () {
                $pd.fadeOut('fast', function () {
                    $pd.remove();
                });
            }, 500 + 300 * (Math.random() * 5));
        });
    },
    //
    $.Portlet = new Portlet(), $.Portlet.Constructor = Portlet;
}(window.jQuery),

/**
 * Notifications
 */
function ($) {
    "use strict";

    var Notification = function Notification() {};

    //simple notificaiton
    Notification.prototype.notify = function (style, position, title, text) {
        var icon = 'fa fa-adjust';
        if (style == "error") {
            icon = "fa fa-exclamation";
        } else if (style == "warning") {
            icon = "fa fa-warning";
        } else if (style == "success") {
            icon = "fa fa-check";
        } else if (style == "custom") {
            icon = "md md-album";
        } else if (style == "info") {
            icon = "fa fa-question";
        } else {
            icon = "fa fa-adjust";
        }
        $.notify({
            title: title,
            text: text,
            image: "<i class='" + icon + "'></i>"
        }, {
            style: 'metro',
            className: style,
            globalPosition: position,
            showAnimation: "show",
            showDuration: 0,
            hideDuration: 0,
            autoHide: true,
            clickToHide: true
        });
    },

    //auto hide notification
    Notification.prototype.autoHideNotify = function (style, position, title, text) {
        var icon = "fa fa-adjust";
        if (style == "error") {
            icon = "fa fa-exclamation";
        } else if (style == "warning") {
            icon = "fa fa-warning";
        } else if (style == "success") {
            icon = "fa fa-check";
        } else if (style == "custom") {
            icon = "md md-album";
        } else if (style == "info") {
            icon = "fa fa-question";
        } else {
            icon = "fa fa-adjust";
        }
        $.notify({
            title: title,
            text: text,
            image: "<i class='" + icon + "'></i>"
        }, {
            style: 'metro',
            className: style,
            globalPosition: position,
            showAnimation: "show",
            showDuration: 0,
            hideDuration: 0,
            autoHideDelay: 5000,
            autoHide: true,
            clickToHide: true
        });
    },
    //confirmation notification
    Notification.prototype.confirm = function (style, position, title) {
        var icon = "fa fa-adjust";
        if (style == "error") {
            icon = "fa fa-exclamation";
        } else if (style == "warning") {
            icon = "fa fa-warning";
        } else if (style == "success") {
            icon = "fa fa-check";
        } else if (style == "custom") {
            icon = "md md-album";
        } else if (style == "info") {
            icon = "fa fa-question";
        } else {
            icon = "fa fa-adjust";
        }
        $.notify({
            title: title,
            text: 'Are you sure you want to do nothing?<div class="clearfix"></div><br><a class="btn btn-sm btn-white yes">Yes</a> <a class="btn btn-sm btn-danger no">No</a>',
            image: "<i class='" + icon + "'></i>"
        }, {
            style: 'metro',
            className: style,
            globalPosition: position,
            showAnimation: "show",
            showDuration: 0,
            hideDuration: 0,
            autoHide: false,
            clickToHide: false
        });
        //listen for click events from this style
        $(document).on('click', '.notifyjs-metro-base .no', function () {
            //programmatically trigger propogating hide event
            $(this).trigger('notify-hide');
        });
        $(document).on('click', '.notifyjs-metro-base .yes', function () {
            //show button text
            alert($(this).text() + " clicked!");
            //hide notification
            $(this).trigger('notify-hide');
        });
    },
    //init - examples
    Notification.prototype.init = function () {},
    //init
    $.Notification = new Notification(), $.Notification.Constructor = Notification;
}(window.jQuery),

/**
 * Components
 */
function ($) {
    "use strict";

    var Components = function Components() {};

    //initializing tooltip
    Components.prototype.initTooltipPlugin = function () {
        $.fn.tooltip && $('[data-toggle="tooltip"]').tooltip();
    },

    //initializing popover
    Components.prototype.initPopoverPlugin = function () {
        $.fn.popover && $('[data-toggle="popover"]').popover();
    },

    //initializing custom modal
    Components.prototype.initCustomModalPlugin = function () {
        $('[data-plugin="custommodal"]').on('click', function (e) {
            Custombox.open({
                target: $(this).attr("href"),
                effect: $(this).attr("data-animation"),
                overlaySpeed: $(this).attr("data-overlaySpeed"),
                overlayColor: $(this).attr("data-overlayColor")
            });
            e.preventDefault();
        });
    },

    //initializing nicescroll
    Components.prototype.initNiceScrollPlugin = function () {
        //You can change the color of scroll bar here
        $.fn.niceScroll && $(".nicescroll").niceScroll({ cursorcolor: '#98a6ad', cursorwidth: '6px', cursorborderradius: '5px' });
    },

    //initializing Slimscroll
    Components.prototype.initSlimScrollPlugin = function () {
        //You can change the color of scroll bar here
        $.fn.niceScroll && $(".slimscroll-noti").slimScroll({ position: 'right', size: "5px", color: '#98a6ad', height: '230px', wheelStep: 10 });
    },

    //range slider
    Components.prototype.initRangeSlider = function () {
        $.fn.slider && $('[data-plugin="range-slider"]').slider({});
    },

    /* -------------
     * Form related controls
     */
    //switch
    Components.prototype.initSwitchery = function () {
        $('[data-plugin="switchery"]').each(function (idx, obj) {
            new Switchery($(this)[0], $(this).data());
        });
    },
    //multiselect
    Components.prototype.initMultiSelect = function () {
        if ($('[data-plugin="multiselect"]').length > 0) $('[data-plugin="multiselect"]').multiSelect($(this).data());
    },

    /* -------------
    * small charts related widgets
    */
    //peity charts
    Components.prototype.initPeityCharts = function () {
        $('[data-plugin="peity-pie"]').each(function (idx, obj) {
            var colors = $(this).attr('data-colors') ? $(this).attr('data-colors').split(",") : [];
            var width = $(this).attr('data-width') ? $(this).attr('data-width') : 20; //default is 20
            var height = $(this).attr('data-height') ? $(this).attr('data-height') : 20; //default is 20
            $(this).peity("pie", {
                fill: colors,
                width: width,
                height: height
            });
        });
        //donut
        $('[data-plugin="peity-donut"]').each(function (idx, obj) {
            var colors = $(this).attr('data-colors') ? $(this).attr('data-colors').split(",") : [];
            var width = $(this).attr('data-width') ? $(this).attr('data-width') : 20; //default is 20
            var height = $(this).attr('data-height') ? $(this).attr('data-height') : 20; //default is 20
            $(this).peity("donut", {
                fill: colors,
                width: width,
                height: height
            });
        });

        $('[data-plugin="peity-donut-alt"]').each(function (idx, obj) {
            $(this).peity("donut");
        });

        // line
        $('[data-plugin="peity-line"]').each(function (idx, obj) {
            $(this).peity("line", $(this).data());
        });

        // bar
        $('[data-plugin="peity-bar"]').each(function (idx, obj) {
            var colors = $(this).attr('data-colors') ? $(this).attr('data-colors').split(",") : [];
            var width = $(this).attr('data-width') ? $(this).attr('data-width') : 20; //default is 20
            var height = $(this).attr('data-height') ? $(this).attr('data-height') : 20; //default is 20
            $(this).peity("bar", {
                fill: colors,
                width: width,
                height: height
            });
        });
    }, Components.prototype.initCounterUp = function () {
        var delay = $(this).attr('data-delay') ? $(this).attr('data-delay') : 100; //default is 100
        var time = $(this).attr('data-time') ? $(this).attr('data-time') : 1200; //default is 1200
        $('[data-plugin="counterup"]').each(function (idx, obj) {
            $(this).counterUp({
                delay: 100,
                time: 1200
            });
        });
    },

    //initilizing
    Components.prototype.init = function () {
        var $this = this;
        this.initTooltipPlugin(), this.initPopoverPlugin(), this.initNiceScrollPlugin(), this.initSlimScrollPlugin(), this.initCustomModalPlugin(), this.initRangeSlider(), this.initSwitchery(), this.initMultiSelect(), this.initPeityCharts(), this.initCounterUp(),
        //creating portles
        $.Portlet.init();
    }, $.Components = new Components(), $.Components.Constructor = Components;
}(window.jQuery),
//initializing main application module
function ($) {
    "use strict";

    $.Components.init();
}(window.jQuery);

/***/ }),
/* 34 */
/***/ (function(module, exports) {

/**
* Theme: Ubold Admin Template
* Author: Coderthemes
* Module/App: Main Js
*/

!function ($) {
  "use strict";

  var Sidemenu = function Sidemenu() {
    this.$body = $("body"), this.$openLeftBtn = $(".open-left"), this.$menuItem = $("#sidebar-menu a");
  };
  Sidemenu.prototype.openLeftBar = function () {
    $("#wrapper").toggleClass("enlarged");
    $("#wrapper").addClass("forced");

    if ($("#wrapper").hasClass("enlarged") && $("body").hasClass("fixed-left")) {
      $("body").removeClass("fixed-left").addClass("fixed-left-void");
    } else if (!$("#wrapper").hasClass("enlarged") && $("body").hasClass("fixed-left-void")) {
      $("body").removeClass("fixed-left-void").addClass("fixed-left");
    }

    if ($("#wrapper").hasClass("enlarged")) {
      $(".left ul").removeAttr("style");
    } else {
      $(".subdrop").siblings("ul:first").show();
    }

    toggle_slimscroll(".slimscrollleft");
    $("body").trigger("resize");
  },
  //menu item click
  Sidemenu.prototype.menuItemClick = function (e) {
    if (!$("#wrapper").hasClass("enlarged")) {
      if ($(this).parent().hasClass("has_sub")) {}
      if (!$(this).hasClass("subdrop")) {
        // hide any open menus and remove all other classes
        $("ul", $(this).parents("ul:first")).slideUp(350);
        $("a", $(this).parents("ul:first")).removeClass("subdrop");
        $("#sidebar-menu .pull-right i").removeClass("md-remove").addClass("md-add");

        // open our new menu and add the open class
        $(this).next("ul").slideDown(350);
        $(this).addClass("subdrop");
        $(".pull-right i", $(this).parents(".has_sub:last")).removeClass("md-add").addClass("md-remove");
        $(".pull-right i", $(this).siblings("ul")).removeClass("md-remove").addClass("md-add");
      } else if ($(this).hasClass("subdrop")) {
        $(this).removeClass("subdrop");
        $(this).next("ul").slideUp(350);
        $(".pull-right i", $(this).parent()).removeClass("md-remove").addClass("md-add");
      }
    }
  },

  //init sidemenu
  Sidemenu.prototype.init = function () {
    var $this = this;

    var ua = navigator.userAgent,
        event = ua.match(/iP/i) ? "touchstart" : "click";

    //bind on click
    this.$openLeftBtn.on(event, function (e) {
      e.stopPropagation();
      $this.openLeftBar();
    });

    // LEFT SIDE MAIN NAVIGATION
    $this.$menuItem.on(event, $this.menuItemClick);

    // NAVIGATION HIGHLIGHT & OPEN PARENT
    $("#sidebar-menu ul li.has_sub a.active").parents("li:last").children("a:first").addClass("active").trigger("click");
  },

  //init Sidemenu
  $.Sidemenu = new Sidemenu(), $.Sidemenu.Constructor = Sidemenu;
}(window.jQuery), function ($) {
  "use strict";

  var FullScreen = function FullScreen() {
    this.$body = $("body"), this.$fullscreenBtn = $("#btn-fullscreen");
  };

  //turn on full screen
  // Thanks to http://davidwalsh.name/fullscreen
  FullScreen.prototype.launchFullscreen = function (element) {
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    }
  }, FullScreen.prototype.exitFullscreen = function () {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  },
  //toggle screen
  FullScreen.prototype.toggle_fullscreen = function () {
    var $this = this;
    var fullscreenEnabled = document.fullscreenEnabled || document.mozFullScreenEnabled || document.webkitFullscreenEnabled;
    if (fullscreenEnabled) {
      if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
        $this.launchFullscreen(document.documentElement);
      } else {
        $this.exitFullscreen();
      }
    }
  },
  //init sidemenu
  FullScreen.prototype.init = function () {
    var $this = this;
    //bind
    $this.$fullscreenBtn.on('click', function () {
      $this.toggle_fullscreen();
    });
  },
  //init FullScreen
  $.FullScreen = new FullScreen(), $.FullScreen.Constructor = FullScreen;
}(window.jQuery),

//main app module
function ($) {
  "use strict";

  var App = function App() {
    this.VERSION = "1.6.0", this.AUTHOR = "Coderthemes", this.SUPPORT = "coderthemes@gmail.com", this.pageScrollElement = "html, body", this.$body = $("body");
  };

  //on doc load
  App.prototype.onDocReady = function (e) {
    FastClick.attach(document.body);
    resizefunc.push("initscrolls");
    resizefunc.push("changeptype");

    $('.animate-number').each(function () {
      $(this).animateNumbers($(this).attr("data-value"), true, parseInt($(this).attr("data-duration")));
    });

    //RUN RESIZE ITEMS
    $(window).resize(debounce(resizeitems, 100));
    $("body").trigger("resize");

    // right side-bar toggle
    $('.right-bar-toggle').on('click', function (e) {

      $('#wrapper').toggleClass('right-bar-enabled');
    });
  },
  //initilizing 
  App.prototype.init = function () {
    var $this = this;
    //document load initialization
    $(document).ready($this.onDocReady);
    //init side bar - left
    $.Sidemenu.init();
    //init fullscreen
    $.FullScreen.init();
  }, $.App = new App(), $.App.Constructor = App;
}(window.jQuery),

//initializing main application module
function ($) {
  "use strict";

  $.App.init();
}(window.jQuery);

/* ------------ some utility functions ----------------------- */
//this full screen
var toggle_fullscreen = function toggle_fullscreen() {};

function executeFunctionByName(functionName, context /*, args */) {
  var args = [].slice.call(arguments).splice(2);
  var namespaces = functionName.split(".");
  var func = namespaces.pop();
  for (var i = 0; i < namespaces.length; i++) {
    context = context[namespaces[i]];
  }
  return context[func].apply(this, args);
}
var w, h, dw, dh;
var changeptype = function changeptype() {
  w = $(window).width();
  h = $(window).height();
  dw = $(document).width();
  dh = $(document).height();

  if (jQuery.browser.mobile === true) {
    $("body").addClass("mobile").removeClass("fixed-left");
  }

  if (!$("#wrapper").hasClass("forced")) {
    if (w > 990) {
      $("body").removeClass("smallscreen").addClass("widescreen");
      $("#wrapper").removeClass("enlarged");
    } else {
      $("body").removeClass("widescreen").addClass("smallscreen");
      $("#wrapper").addClass("enlarged");
      $(".left ul").removeAttr("style");
    }
    if ($("#wrapper").hasClass("enlarged") && $("body").hasClass("fixed-left")) {
      $("body").removeClass("fixed-left").addClass("fixed-left-void");
    } else if (!$("#wrapper").hasClass("enlarged") && $("body").hasClass("fixed-left-void")) {
      $("body").removeClass("fixed-left-void").addClass("fixed-left");
    }
  }
  toggle_slimscroll(".slimscrollleft");
};

var debounce = function debounce(func, wait, immediate) {
  var timeout, result;
  return function () {
    var context = this,
        args = arguments;
    var later = function later() {
      timeout = null;
      if (!immediate) result = func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) result = func.apply(context, args);
    return result;
  };
};

function resizeitems() {
  if ($.isArray(resizefunc)) {
    for (i = 0; i < resizefunc.length; i++) {
      window[resizefunc[i]]();
    }
  }
}

function initscrolls() {
  if (jQuery.browser.mobile !== true) {
    //SLIM SCROLL
    $('.slimscroller').slimscroll({
      height: 'auto',
      size: "5px"
    });

    $('.slimscrollleft').slimScroll({
      height: 'auto',
      position: 'right',
      size: "5px",
      color: '#98a6ad',
      wheelStep: 5
    });
  }
}
function toggle_slimscroll(item) {
  if ($("#wrapper").hasClass("enlarged")) {
    $(item).css("overflow", "inherit").parent().css("overflow", "inherit");
    $(item).siblings(".slimScrollBar").css("visibility", "hidden");
  } else {
    $(item).css("overflow", "hidden").parent().css("overflow", "hidden");
    $(item).siblings(".slimScrollBar").css("visibility", "visible");
  }
}

var wow = new WOW({
  boxClass: 'wow', // animated element css class (default is wow)
  animateClass: 'animated', // animation css class (default is animated)
  offset: 50, // distance to the element when triggering the animation (default is 0)
  mobile: false // trigger animations on mobile devices (true is default)
});
wow.init();

// === following js will activate the menu in left side bar based on url ====
$(document).ready(function () {
  $("#sidebar-menu a").each(function () {
    if (this.href == window.location.href) {
      $(this).addClass("active");
      $(this).parent().addClass("active"); // add active to li of the current link
      $(this).parent().parent().prev().addClass("active"); // add active class to an anchor
      $(this).parent().parent().prev().click(); // click the item to make it drop
    }
  });
});

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*! pace 1.0.2 */
(function () {
  var a,
      b,
      c,
      d,
      e,
      f,
      g,
      h,
      i,
      j,
      k,
      l,
      m,
      n,
      o,
      p,
      q,
      r,
      s,
      t,
      u,
      _v,
      w,
      x,
      y,
      z,
      A,
      B,
      C,
      D,
      E,
      F,
      G,
      H,
      I,
      J,
      K,
      L,
      M,
      N,
      O,
      P,
      Q,
      R,
      S,
      T,
      U,
      V,
      W,
      X = [].slice,
      Y = {}.hasOwnProperty,
      Z = function Z(a, b) {
    function c() {
      this.constructor = a;
    }for (var d in b) {
      Y.call(b, d) && (a[d] = b[d]);
    }return c.prototype = b.prototype, a.prototype = new c(), a.__super__ = b.prototype, a;
  },
      $ = [].indexOf || function (a) {
    for (var b = 0, c = this.length; c > b; b++) {
      if (b in this && this[b] === a) return b;
    }return -1;
  };for (u = { catchupTime: 100, initialRate: .03, minTime: 250, ghostTime: 100, maxProgressPerFrame: 20, easeFactor: 1.25, startOnPageLoad: !0, restartOnPushState: !0, restartOnRequestAfter: 500, target: "body", elements: { checkInterval: 100, selectors: ["body"] }, eventLag: { minSamples: 10, sampleCount: 3, lagThreshold: 3 }, ajax: { trackMethods: ["GET"], trackWebSockets: !0, ignoreURLs: [] } }, C = function C() {
    var a;return null != (a = "undefined" != typeof performance && null !== performance && "function" == typeof performance.now ? performance.now() : void 0) ? a : +new Date();
  }, E = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame, t = window.cancelAnimationFrame || window.mozCancelAnimationFrame, null == E && (E = function E(a) {
    return setTimeout(a, 50);
  }, t = function t(a) {
    return clearTimeout(a);
  }), G = function G(a) {
    var b, _c;return b = C(), (_c = function c() {
      var d;return d = C() - b, d >= 33 ? (b = C(), a(d, function () {
        return E(_c);
      })) : setTimeout(_c, 33 - d);
    })();
  }, F = function F() {
    var a, b, c;return c = arguments[0], b = arguments[1], a = 3 <= arguments.length ? X.call(arguments, 2) : [], "function" == typeof c[b] ? c[b].apply(c, a) : c[b];
  }, _v = function v() {
    var a, b, c, d, e, f, g;for (b = arguments[0], d = 2 <= arguments.length ? X.call(arguments, 1) : [], f = 0, g = d.length; g > f; f++) {
      if (c = d[f]) for (a in c) {
        Y.call(c, a) && (e = c[a], null != b[a] && "object" == _typeof(b[a]) && null != e && "object" == (typeof e === "undefined" ? "undefined" : _typeof(e)) ? _v(b[a], e) : b[a] = e);
      }
    }return b;
  }, q = function q(a) {
    var b, c, d, e, f;for (c = b = 0, e = 0, f = a.length; f > e; e++) {
      d = a[e], c += Math.abs(d), b++;
    }return c / b;
  }, x = function x(a, b) {
    var c, d, e;if (null == a && (a = "options"), null == b && (b = !0), e = document.querySelector("[data-pace-" + a + "]")) {
      if (c = e.getAttribute("data-pace-" + a), !b) return c;try {
        return JSON.parse(c);
      } catch (f) {
        return d = f, "undefined" != typeof console && null !== console ? console.error("Error parsing inline pace options", d) : void 0;
      }
    }
  }, g = function () {
    function a() {}return a.prototype.on = function (a, b, c, d) {
      var e;return null == d && (d = !1), null == this.bindings && (this.bindings = {}), null == (e = this.bindings)[a] && (e[a] = []), this.bindings[a].push({ handler: b, ctx: c, once: d });
    }, a.prototype.once = function (a, b, c) {
      return this.on(a, b, c, !0);
    }, a.prototype.off = function (a, b) {
      var c, d, e;if (null != (null != (d = this.bindings) ? d[a] : void 0)) {
        if (null == b) return delete this.bindings[a];for (c = 0, e = []; c < this.bindings[a].length;) {
          e.push(this.bindings[a][c].handler === b ? this.bindings[a].splice(c, 1) : c++);
        }return e;
      }
    }, a.prototype.trigger = function () {
      var a, b, c, d, e, f, g, h, i;if (c = arguments[0], a = 2 <= arguments.length ? X.call(arguments, 1) : [], null != (g = this.bindings) ? g[c] : void 0) {
        for (e = 0, i = []; e < this.bindings[c].length;) {
          h = this.bindings[c][e], d = h.handler, b = h.ctx, f = h.once, d.apply(null != b ? b : this, a), i.push(f ? this.bindings[c].splice(e, 1) : e++);
        }return i;
      }
    }, a;
  }(), j = window.Pace || {}, window.Pace = j, _v(j, g.prototype), D = j.options = _v({}, u, window.paceOptions, x()), U = ["ajax", "document", "eventLag", "elements"], Q = 0, S = U.length; S > Q; Q++) {
    K = U[Q], D[K] === !0 && (D[K] = u[K]);
  }i = function (a) {
    function b() {
      return V = b.__super__.constructor.apply(this, arguments);
    }return Z(b, a), b;
  }(Error), b = function () {
    function a() {
      this.progress = 0;
    }return a.prototype.getElement = function () {
      var a;if (null == this.el) {
        if (a = document.querySelector(D.target), !a) throw new i();this.el = document.createElement("div"), this.el.className = "pace pace-active", document.body.className = document.body.className.replace(/pace-done/g, ""), document.body.className += " pace-running", this.el.innerHTML = '<div class="pace-progress">\n  <div class="pace-progress-inner"></div>\n</div>\n<div class="pace-activity"></div>', null != a.firstChild ? a.insertBefore(this.el, a.firstChild) : a.appendChild(this.el);
      }return this.el;
    }, a.prototype.finish = function () {
      var a;return a = this.getElement(), a.className = a.className.replace("pace-active", ""), a.className += " pace-inactive", document.body.className = document.body.className.replace("pace-running", ""), document.body.className += " pace-done";
    }, a.prototype.update = function (a) {
      return this.progress = a, this.render();
    }, a.prototype.destroy = function () {
      try {
        this.getElement().parentNode.removeChild(this.getElement());
      } catch (a) {
        i = a;
      }return this.el = void 0;
    }, a.prototype.render = function () {
      var a, b, c, d, e, f, g;if (null == document.querySelector(D.target)) return !1;for (a = this.getElement(), d = "translate3d(" + this.progress + "%, 0, 0)", g = ["webkitTransform", "msTransform", "transform"], e = 0, f = g.length; f > e; e++) {
        b = g[e], a.children[0].style[b] = d;
      }return (!this.lastRenderedProgress || this.lastRenderedProgress | 0 !== this.progress | 0) && (a.children[0].setAttribute("data-progress-text", "" + (0 | this.progress) + "%"), this.progress >= 100 ? c = "99" : (c = this.progress < 10 ? "0" : "", c += 0 | this.progress), a.children[0].setAttribute("data-progress", "" + c)), this.lastRenderedProgress = this.progress;
    }, a.prototype.done = function () {
      return this.progress >= 100;
    }, a;
  }(), h = function () {
    function a() {
      this.bindings = {};
    }return a.prototype.trigger = function (a, b) {
      var c, d, e, f, g;if (null != this.bindings[a]) {
        for (f = this.bindings[a], g = [], d = 0, e = f.length; e > d; d++) {
          c = f[d], g.push(c.call(this, b));
        }return g;
      }
    }, a.prototype.on = function (a, b) {
      var c;return null == (c = this.bindings)[a] && (c[a] = []), this.bindings[a].push(b);
    }, a;
  }(), P = window.XMLHttpRequest, O = window.XDomainRequest, N = window.WebSocket, w = function w(a, b) {
    var c, d, e;e = [];for (d in b.prototype) {
      try {
        e.push(null == a[d] && "function" != typeof b[d] ? "function" == typeof Object.defineProperty ? Object.defineProperty(a, d, { get: function get() {
            return b.prototype[d];
          }, configurable: !0, enumerable: !0 }) : a[d] = b.prototype[d] : void 0);
      } catch (f) {
        c = f;
      }
    }return e;
  }, A = [], j.ignore = function () {
    var a, b, c;return b = arguments[0], a = 2 <= arguments.length ? X.call(arguments, 1) : [], A.unshift("ignore"), c = b.apply(null, a), A.shift(), c;
  }, j.track = function () {
    var a, b, c;return b = arguments[0], a = 2 <= arguments.length ? X.call(arguments, 1) : [], A.unshift("track"), c = b.apply(null, a), A.shift(), c;
  }, J = function J(a) {
    var b;if (null == a && (a = "GET"), "track" === A[0]) return "force";if (!A.length && D.ajax) {
      if ("socket" === a && D.ajax.trackWebSockets) return !0;if (b = a.toUpperCase(), $.call(D.ajax.trackMethods, b) >= 0) return !0;
    }return !1;
  }, k = function (a) {
    function b() {
      var a,
          c = this;b.__super__.constructor.apply(this, arguments), a = function a(_a) {
        var b;return b = _a.open, _a.open = function (d, e) {
          return J(d) && c.trigger("request", { type: d, url: e, request: _a }), b.apply(_a, arguments);
        };
      }, window.XMLHttpRequest = function (b) {
        var c;return c = new P(b), a(c), c;
      };try {
        w(window.XMLHttpRequest, P);
      } catch (d) {}if (null != O) {
        window.XDomainRequest = function () {
          var b;return b = new O(), a(b), b;
        };try {
          w(window.XDomainRequest, O);
        } catch (d) {}
      }if (null != N && D.ajax.trackWebSockets) {
        window.WebSocket = function (a, b) {
          var d;return d = null != b ? new N(a, b) : new N(a), J("socket") && c.trigger("request", { type: "socket", url: a, protocols: b, request: d }), d;
        };try {
          w(window.WebSocket, N);
        } catch (d) {}
      }
    }return Z(b, a), b;
  }(h), R = null, y = function y() {
    return null == R && (R = new k()), R;
  }, I = function I(a) {
    var b, c, d, e;for (e = D.ajax.ignoreURLs, c = 0, d = e.length; d > c; c++) {
      if (b = e[c], "string" == typeof b) {
        if (-1 !== a.indexOf(b)) return !0;
      } else if (b.test(a)) return !0;
    }return !1;
  }, y().on("request", function (b) {
    var c, d, e, f, g;return f = b.type, e = b.request, g = b.url, I(g) ? void 0 : j.running || D.restartOnRequestAfter === !1 && "force" !== J(f) ? void 0 : (d = arguments, c = D.restartOnRequestAfter || 0, "boolean" == typeof c && (c = 0), setTimeout(function () {
      var b, c, g, h, i, k;if (b = "socket" === f ? e.readyState < 2 : 0 < (h = e.readyState) && 4 > h) {
        for (j.restart(), i = j.sources, k = [], c = 0, g = i.length; g > c; c++) {
          if (K = i[c], K instanceof a) {
            K.watch.apply(K, d);break;
          }k.push(void 0);
        }return k;
      }
    }, c));
  }), a = function () {
    function a() {
      var a = this;this.elements = [], y().on("request", function () {
        return a.watch.apply(a, arguments);
      });
    }return a.prototype.watch = function (a) {
      var b, c, d, e;return d = a.type, b = a.request, e = a.url, I(e) ? void 0 : (c = "socket" === d ? new n(b) : new o(b), this.elements.push(c));
    }, a;
  }(), o = function () {
    function a(a) {
      var b,
          c,
          d,
          e,
          f,
          g,
          h = this;if (this.progress = 0, null != window.ProgressEvent) for (c = null, a.addEventListener("progress", function (a) {
        return h.progress = a.lengthComputable ? 100 * a.loaded / a.total : h.progress + (100 - h.progress) / 2;
      }, !1), g = ["load", "abort", "timeout", "error"], d = 0, e = g.length; e > d; d++) {
        b = g[d], a.addEventListener(b, function () {
          return h.progress = 100;
        }, !1);
      } else f = a.onreadystatechange, a.onreadystatechange = function () {
        var b;return 0 === (b = a.readyState) || 4 === b ? h.progress = 100 : 3 === a.readyState && (h.progress = 50), "function" == typeof f ? f.apply(null, arguments) : void 0;
      };
    }return a;
  }(), n = function () {
    function a(a) {
      var b,
          c,
          d,
          e,
          f = this;for (this.progress = 0, e = ["error", "open"], c = 0, d = e.length; d > c; c++) {
        b = e[c], a.addEventListener(b, function () {
          return f.progress = 100;
        }, !1);
      }
    }return a;
  }(), d = function () {
    function a(a) {
      var b, c, d, f;for (null == a && (a = {}), this.elements = [], null == a.selectors && (a.selectors = []), f = a.selectors, c = 0, d = f.length; d > c; c++) {
        b = f[c], this.elements.push(new e(b));
      }
    }return a;
  }(), e = function () {
    function a(a) {
      this.selector = a, this.progress = 0, this.check();
    }return a.prototype.check = function () {
      var a = this;return document.querySelector(this.selector) ? this.done() : setTimeout(function () {
        return a.check();
      }, D.elements.checkInterval);
    }, a.prototype.done = function () {
      return this.progress = 100;
    }, a;
  }(), c = function () {
    function a() {
      var a,
          b,
          c = this;this.progress = null != (b = this.states[document.readyState]) ? b : 100, a = document.onreadystatechange, document.onreadystatechange = function () {
        return null != c.states[document.readyState] && (c.progress = c.states[document.readyState]), "function" == typeof a ? a.apply(null, arguments) : void 0;
      };
    }return a.prototype.states = { loading: 0, interactive: 50, complete: 100 }, a;
  }(), f = function () {
    function a() {
      var a,
          b,
          c,
          d,
          e,
          f = this;this.progress = 0, a = 0, e = [], d = 0, c = C(), b = setInterval(function () {
        var g;return g = C() - c - 50, c = C(), e.push(g), e.length > D.eventLag.sampleCount && e.shift(), a = q(e), ++d >= D.eventLag.minSamples && a < D.eventLag.lagThreshold ? (f.progress = 100, clearInterval(b)) : f.progress = 100 * (3 / (a + 3));
      }, 50);
    }return a;
  }(), m = function () {
    function a(a) {
      this.source = a, this.last = this.sinceLastUpdate = 0, this.rate = D.initialRate, this.catchup = 0, this.progress = this.lastProgress = 0, null != this.source && (this.progress = F(this.source, "progress"));
    }return a.prototype.tick = function (a, b) {
      var c;return null == b && (b = F(this.source, "progress")), b >= 100 && (this.done = !0), b === this.last ? this.sinceLastUpdate += a : (this.sinceLastUpdate && (this.rate = (b - this.last) / this.sinceLastUpdate), this.catchup = (b - this.progress) / D.catchupTime, this.sinceLastUpdate = 0, this.last = b), b > this.progress && (this.progress += this.catchup * a), c = 1 - Math.pow(this.progress / 100, D.easeFactor), this.progress += c * this.rate * a, this.progress = Math.min(this.lastProgress + D.maxProgressPerFrame, this.progress), this.progress = Math.max(0, this.progress), this.progress = Math.min(100, this.progress), this.lastProgress = this.progress, this.progress;
    }, a;
  }(), L = null, H = null, r = null, M = null, p = null, s = null, j.running = !1, z = function z() {
    return D.restartOnPushState ? j.restart() : void 0;
  }, null != window.history.pushState && (T = window.history.pushState, window.history.pushState = function () {
    return z(), T.apply(window.history, arguments);
  }), null != window.history.replaceState && (W = window.history.replaceState, window.history.replaceState = function () {
    return z(), W.apply(window.history, arguments);
  }), l = { ajax: a, elements: d, document: c, eventLag: f }, (B = function B() {
    var a, c, d, e, f, g, h, i;for (j.sources = L = [], g = ["ajax", "elements", "document", "eventLag"], c = 0, e = g.length; e > c; c++) {
      a = g[c], D[a] !== !1 && L.push(new l[a](D[a]));
    }for (i = null != (h = D.extraSources) ? h : [], d = 0, f = i.length; f > d; d++) {
      K = i[d], L.push(new K(D));
    }return j.bar = r = new b(), H = [], M = new m();
  })(), j.stop = function () {
    return j.trigger("stop"), j.running = !1, r.destroy(), s = !0, null != p && ("function" == typeof t && t(p), p = null), B();
  }, j.restart = function () {
    return j.trigger("restart"), j.stop(), j.start();
  }, j.go = function () {
    var a;return j.running = !0, r.render(), a = C(), s = !1, p = G(function (b, c) {
      var d, e, f, g, h, i, k, l, n, o, p, q, t, u, v, w;for (l = 100 - r.progress, e = p = 0, f = !0, i = q = 0, u = L.length; u > q; i = ++q) {
        for (K = L[i], o = null != H[i] ? H[i] : H[i] = [], h = null != (w = K.elements) ? w : [K], k = t = 0, v = h.length; v > t; k = ++t) {
          g = h[k], n = null != o[k] ? o[k] : o[k] = new m(g), f &= n.done, n.done || (e++, p += n.tick(b));
        }
      }return d = p / e, r.update(M.tick(b, d)), r.done() || f || s ? (r.update(100), j.trigger("done"), setTimeout(function () {
        return r.finish(), j.running = !1, j.trigger("hide");
      }, Math.max(D.ghostTime, Math.max(D.minTime - (C() - a), 0)))) : c();
    });
  }, j.start = function (a) {
    _v(D, a), j.running = !0;try {
      r.render();
    } catch (b) {
      i = b;
    }return document.querySelector(".pace") ? (j.trigger("start"), j.go()) : setTimeout(j.start, 50);
  },  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(36)], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
    return j;
  }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) ? module.exports = j : D.startOnPageLoad && j.start();
}).call(this);

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {/**
 * Pace
 *
 * A progress bar for the command-line.
 *
 * Example usage:
 *
 *     var total = 50000,
 *         count = 0,
 *         pace = require('pace')(total);
 *
 *     while (count++ < total) {
 *       pace.op();
 *
 *       // Cause some work to be done.
 *       for (var i = 0; i < 1000000; i++) {
 *         count = count;
 *       }
 *     }
 */

// Module dependencies.
var charm = __webpack_require__(37);

/**
 * Pace 'class'.
 */
function Pace(options) {
  options = options || {};

  // Total number of items to process.
  if (!options.total) {
    throw new Error('You MUST specify the total number of operations that will be processed.');
  }
  this.total = options.total;

  // Current item number.
  this.current = 0;

  // Maximum percent of total time the progressbar is allowed to take during processing.
  // Defaults to 0.5%
  this.max_burden = options.maxBurden || 0.5;

  // Whether to show current burden %.
  this.show_burden = options.showBurden || false;

  // Internal time tracking properties.
  this.started = false;
  this.size = 50;
  this.inner_time = 0;
  this.outer_time = 0;
  this.elapsed = 0;
  this.time_start = 0;
  this.time_end = 0;
  this.time_left = 0;
  this.time_burden = 0;
  this.skip_steps = 0;
  this.skipped = 0;
  this.aborted = false;

  // Setup charm.
  this.charm = charm();
  this.charm.pipe(process.stdout);

  // Prepare the output.
  this.charm.write("\n\n\n");
}

/**
 * Export a factory function for new pace instances.
 */
module.exports = function(options) {
  if (typeof options === 'number') {
    options = {
      total: options
    };
  }
  return new Pace(options);
};

/**
 * An operation has been emitted.
 */
Pace.prototype.op = function op(count) {
  if (count) {
    this.current = count;
  }
  else {
    this.current++;
  }

  if (this.burdenReached()) {
    return;
  }

  // Record the start time of the whole task.
  if (!this.started) {
    this.started = new Date().getTime();
  }

  // Record start time.
  this.time_start = new Date().getTime();

  this.updateTimes();
  this.clear();
  this.outputProgress();
  this.outputStats();
  this.outputTimes();

  // The task is complete.
  if (this.current >= this.total) {
    this.finished();
  }

  // Record end time.
  this.time_end = new Date().getTime();
  this.inner_time = this.time_end - this.time_start;
};

/**
 * Update times.
 */
Pace.prototype.updateTimes = function updateTimes() {
  this.elapsed = this.time_start - this.started;
  if (this.time_end > 0) {
    this.outer_time = this.time_start - this.time_end;
  }
  if (this.inner_time > 0 && this.outer_time > 0) {
    // Set Current Burden
    this.time_burden = (this.inner_time / (this.inner_time + this.outer_time)) * 100;

    // Estimate time left.
    this.time_left = (this.elapsed / this.current) * (this.total - this.current);

    if (this.time_left < 0) this.time_left = 0;
  }
  // If our "burden" is too high, increase the skip steps.
  if (this.time_burden > this.max_burden && (this.skip_steps < (this.total / this.size))) {
    this.skip_steps = Math.floor(++this.skip_steps * 1.3);
  }
};

/**
 * Move the cursor back to the beginning and clear old output.
 */
Pace.prototype.clear = function clear() {
  this.charm.erase('line').up(1).erase('line').up(1).erase('line').write("\r");
};

/**
 * Output the progress bar.
 */
Pace.prototype.outputProgress = function outputProgress() {
  this.charm.write('Processing: ');
  this.charm.foreground('green').background('green');
  for (var i = 0; i < ((this.current / this.total) * this.size) - 1 ; i++) {
     this.charm.write(' ');
  }
  this.charm.foreground('white').background('white');
  while (i < this.size - 1) {
    this.charm.write(' ');
    i++;
  }
  this.charm.display('reset').down(1).left(100);
};

/**
 * Output numerical progress stats.
 */
Pace.prototype.outputStats = function outputStats() {
  this.perc = (this.current/this.total)*100;
  this.perc = padLeft(this.perc.toFixed(2), 2);
  this.charm.write('            ').display('bright').write(this.perc + '%').display('reset');
  this.total_len = formatNumber(this.total).length;
  this.charm.write('   ').display('bright').write(padLeft(formatNumber(this.current), this.total_len)).display('reset');
  this.charm.write('/' + formatNumber(this.total));

  // Output burden.
  if (this.show_burden) {
    this.charm.write('    ').display('bright').write('Burden: ').display('reset');
    this.charm.write(this.time_burden.toFixed(2) + '% / ' + this.skip_steps);
  }

  this.charm.display('reset').down(1).left(100);
};

/**
 * Output times.
 */
Pace.prototype.outputTimes = function outputTimes() {
  // Output times.
  var hours = Math.floor(this.elapsed / (1000 * 60 * 60));
  var min = Math.floor(((this.elapsed / 1000) % (60 * 60)) / 60);
  var sec = Math.floor((this.elapsed / 1000) % 60);

  this.charm.write('            ').display('bright').write('Elapsed: ').display('reset');
  this.charm.write(hours + 'h ' + min + 'm ' + sec + 's');

  if (this.time_left){
    hours = Math.floor(this.time_left / (1000 * 60 * 60));
    min = Math.floor(((this.time_left / 1000) % (60 * 60)) / 60);
    sec = Math.ceil((this.time_left / 1000) % 60);

    this.charm.write('   ').display('bright').write('Remaining: ').display('reset');
    this.charm.write(hours + 'h ' + min + 'm ' + sec + 's');
  }
};

/**
 * The progress has finished.
 */
Pace.prototype.finished = function finished() {
  this.charm.write("\n\n");
  this.charm.write('Finished!');
  this.charm.write("\n\n");
};

/**
 * Check if the burden threshold has been reached.
 */
Pace.prototype.burdenReached = function burdenReached() {
  // Skip this cycle if the burden has determined we should.
  if ((this.skip_steps > 0) && (this.current < this.total)) {
    if (this.skipped < this.skip_steps) {
      this.skipped++;
      return true;
    }
    else {
      this.skipped = 0;
    }
  }
  return false;
};


/**
 * Utility functions.
 */

// Left-pad a string.
function padLeft(str, length, pad) {
  pad = pad || ' ';
  while (str.length < length)
    str = pad + str;
  return str;
}

// Ported from php.js. Same has php's number_format().
function formatNumber(number, decimals, dec_point, thousands_sep) {
  number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
  var n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
    sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
    dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
    s = '',
    toFixedFix = function (n, prec) {
      var k = Math.pow(10, prec);
      return '' + Math.round(n * k) / k;
    };
  // Fix for IE parseFloat(0.55).toFixed(0) = 0;
  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
  }
  if ((s[1] || '').length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1).join('0');
  }
  return s.join(dec);
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {var tty = __webpack_require__(38);
var encode = __webpack_require__(39);
var Stream = __webpack_require__(42).Stream;

var exports = module.exports = function () {
    var input = null;
    function setInput (s) {
        if (input) throw new Error('multiple inputs specified')
        else input = s
    }
    
    var output = null;
    function setOutput (s) {
        if (output) throw new Error('multiple outputs specified')
        else output = s
    }
    
    for (var i = 0; i < arguments.length; i++) {
        var arg = arguments[i];
        if (!arg) continue;
        if (arg.readable) setInput(arg)
        else if (arg.stdin || arg.input) setInput(arg.stdin || arg.input)
        
        if (arg.writable) setOutput(arg)
        else if (arg.stdout || arg.output) setOutput(arg.stdout || arg.output)
        
    }
    
    if (input && typeof input.fd === 'number' && tty.isatty(input.fd)) {
        if (process.stdin.setRawMode) {
            process.stdin.setRawMode(true);
        }
        else tty.setRawMode(true);
    }
    
    var charm = new Charm;
    if (input) {
        input.pipe(charm);
    }
    
    if (output) {
        charm.pipe(output);
    }
    
    charm.once('^C', process.exit);
    charm.once('end', function () {
      if (input) {
          if (typeof input.fd === 'number' && tty.isatty(input.fd)) {
            if (process.stdin.setRawMode) {
                process.stdin.setRawMode(false);
            }
            else tty.setRawMode(false);
          }
          input.destroy();
      }
    });

    return charm;
};

var Charm = exports.Charm = function Charm () {
    this.writable = true;
    this.readable = true;
    this.pending = [];
}

Charm.prototype = new Stream;

Charm.prototype.write = function (buf) {
    var self = this;
    
    if (self.pending.length) {
        var codes = extractCodes(buf);
        var matched = false;
        
        for (var i = 0; i < codes.length; i++) {
            for (var j = 0; j < self.pending.length; j++) {
                var cb = self.pending[j];
                if (cb(codes[i])) {
                    matched = true;
                    self.pending.splice(j, 1);
                    break;
                }
            }
        }
        
        if (matched) return;
    }
    
    if (buf.length === 1) {
        if (buf[0] === 3) self.emit('^C');
        if (buf[0] === 4) self.emit('^D');
    }
    
    self.emit('data', buf);
    
    return self;
};


Charm.prototype.destroy = function () {
    this.end();
};

Charm.prototype.end = function (buf) {
    if (buf) this.write(buf);
    this.emit('end');
};

Charm.prototype.reset = function (cb) {
    this.write(encode('c'));
    return this;
};

Charm.prototype.position = function (x, y) {
    // get/set absolute coordinates
    if (typeof x === 'function') {
        var cb = x;
        this.pending.push(function (buf) {
            if (buf[0] === 27 && buf[1] === encode.ord('[')
            && buf[buf.length-1] === encode.ord('R')) {
                var pos = buf.toString()
                    .slice(2,-1)
                    .split(';')
                    .map(Number)
                ;
                cb(pos[1], pos[0]);
                return true;
            }
        });
        this.write(encode('[6n'));
    }
    else {
        this.write(encode(
            '[' + Math.floor(y) + ';' + Math.floor(x) + 'f'
        ));
    }
    return this;
};

Charm.prototype.move = function (x, y) {
    // set relative coordinates
    var bufs = [];
    
    if (y < 0) this.up(-y)
    else if (y > 0) this.down(y)
    
    if (x > 0) this.right(x)
    else if (x < 0) this.left(-x)
    
    return this;
};

Charm.prototype.up = function (y) {
    if (y === undefined) y = 1;
    this.write(encode('[' + Math.floor(y) + 'A'));
    return this;
};

Charm.prototype.down = function (y) {
    if (y === undefined) y = 1;
    this.write(encode('[' + Math.floor(y) + 'B'));
    return this;
};

Charm.prototype.right = function (x) {
    if (x === undefined) x = 1;
    this.write(encode('[' + Math.floor(x) + 'C'));
    return this;
};

Charm.prototype.left = function (x) {
    if (x === undefined) x = 1;
    this.write(encode('[' + Math.floor(x) + 'D'));
    return this;
};

Charm.prototype.column = function (x) {
    this.write(encode('[' + Math.floor(x) + 'G'));
    return this;
};

Charm.prototype.push = function (withAttributes) {
    this.write(encode(withAttributes ? '7' : '[s'));
    return this;
};

Charm.prototype.pop = function (withAttributes) {
    this.write(encode(withAttributes ? '8' : '[u'));
    return this;
};

Charm.prototype.erase = function (s) {
    if (s === 'end' || s === '$') {
        this.write(encode('[K'));
    }
    else if (s === 'start' || s === '^') {
        this.write(encode('[1K'));
    }
    else if (s === 'line') {
        this.write(encode('[2K'));
    }
    else if (s === 'down') {
        this.write(encode('[J'));
    }
    else if (s === 'up') {
        this.write(encode('[1J'));
    }
    else if (s === 'screen') {
        this.write(encode('[1J'));
    }
    else {
        this.emit('error', new Error('Unknown erase type: ' + s));
    }
    return this;
};

Charm.prototype.display = function (attr) {
    var c = {
        reset : 0,
        bright : 1,
        dim : 2,
        underscore : 4,
        blink : 5,
        reverse : 7,
        hidden : 8
    }[attr];
    if (c === undefined) {
        this.emit('error', new Error('Unknown attribute: ' + attr));
    }
    this.write(encode('[' + c + 'm'));
    return this;
};

Charm.prototype.foreground = function (color) {
    if (typeof color === 'number') {
        if (color < 0 || color >= 256) {
            this.emit('error', new Error('Color out of range: ' + color));
        }
        this.write(encode('[38;5;' + color + 'm'));
    }
    else {
        var c = {
            black : 30,
            red : 31,
            green : 32,
            yellow : 33,
            blue : 34,
            magenta : 35,
            cyan : 36,
            white : 37
        }[color.toLowerCase()];
        
        if (!c) this.emit('error', new Error('Unknown color: ' + color));
        this.write(encode('[' + c + 'm'));
    }
    return this;
};

Charm.prototype.background = function (color) {
    if (typeof color === 'number') {
        if (color < 0 || color >= 256) {
            this.emit('error', new Error('Color out of range: ' + color));
        }
        this.write(encode('[48;5;' + color + 'm'));
    }
    else {
        var c = {
          black : 40,
          red : 41,
          green : 42,
          yellow : 43,
          blue : 44,
          magenta : 45,
          cyan : 46,
          white : 47
        }[color.toLowerCase()];
        
        if (!c) this.emit('error', new Error('Unknown color: ' + color));
        this.write(encode('[' + c + 'm'));
    }
    return this;
};

Charm.prototype.cursor = function (visible) {
    this.write(encode(visible ? '[?25h' : '[?25l'));
    return this;
};

var extractCodes = exports.extractCodes = function (buf) {
    var codes = [];
    var start = -1;
    
    for (var i = 0; i < buf.length; i++) {
        if (buf[i] === 27) {
            if (start >= 0) codes.push(buf.slice(start, i));
            start = i;
        }
        else if (start >= 0 && i === buf.length - 1) {
            codes.push(buf.slice(start));
        }
    }
    
    return codes;
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 38 */
/***/ (function(module, exports) {

exports.isatty = function () { return false; };

function ReadStream() {
  throw new Error('tty.ReadStream is not implemented');
}
exports.ReadStream = ReadStream;

function WriteStream() {
  throw new Error('tty.ReadStream is not implemented');
}
exports.WriteStream = WriteStream;


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {var encode = module.exports = function (xs) {
    function bytes (s) {
        if (typeof s === 'string') {
            return s.split('').map(ord);
        }
        else if (Array.isArray(s)) {
            return s.reduce(function (acc, c) {
                return acc.concat(bytes(c));
            }, []);
        }
    }
    
    return new Buffer([ 0x1b ].concat(bytes(xs)));
};

var ord = encode.ord = function ord (c) {
    return c.charCodeAt(0)
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(9).Buffer))

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  for (var i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(
      uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)
    ))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}


/***/ }),
/* 41 */
/***/ (function(module, exports) {

exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

module.exports = Stream;

var EE = __webpack_require__(10).EventEmitter;
var inherits = __webpack_require__(3);

inherits(Stream, EE);
Stream.Readable = __webpack_require__(11);
Stream.Writable = __webpack_require__(50);
Stream.Duplex = __webpack_require__(51);
Stream.Transform = __webpack_require__(52);
Stream.PassThrough = __webpack_require__(53);

// Backwards-compat with node 0.4.x
Stream.Stream = Stream;



// old-style streams.  Note that the pipe method (the only relevant
// part of this class) is overridden in the Readable class.

function Stream() {
  EE.call(this);
}

Stream.prototype.pipe = function(dest, options) {
  var source = this;

  function ondata(chunk) {
    if (dest.writable) {
      if (false === dest.write(chunk) && source.pause) {
        source.pause();
      }
    }
  }

  source.on('data', ondata);

  function ondrain() {
    if (source.readable && source.resume) {
      source.resume();
    }
  }

  dest.on('drain', ondrain);

  // If the 'end' option is not supplied, dest.end() will be called when
  // source gets the 'end' or 'close' events.  Only dest.end() once.
  if (!dest._isStdio && (!options || options.end !== false)) {
    source.on('end', onend);
    source.on('close', onclose);
  }

  var didOnEnd = false;
  function onend() {
    if (didOnEnd) return;
    didOnEnd = true;

    dest.end();
  }


  function onclose() {
    if (didOnEnd) return;
    didOnEnd = true;

    if (typeof dest.destroy === 'function') dest.destroy();
  }

  // don't leave dangling pipes when there are errors.
  function onerror(er) {
    cleanup();
    if (EE.listenerCount(this, 'error') === 0) {
      throw er; // Unhandled stream error in pipe.
    }
  }

  source.on('error', onerror);
  dest.on('error', onerror);

  // remove all the event listeners that were added.
  function cleanup() {
    source.removeListener('data', ondata);
    dest.removeListener('drain', ondrain);

    source.removeListener('end', onend);
    source.removeListener('close', onclose);

    source.removeListener('error', onerror);
    dest.removeListener('error', onerror);

    source.removeListener('end', cleanup);
    source.removeListener('close', cleanup);

    dest.removeListener('close', cleanup);
  }

  source.on('end', cleanup);
  source.on('close', cleanup);

  dest.on('close', cleanup);

  dest.emit('pipe', source);

  // Allow for unix-like usage: A.pipe(B).pipe(C)
  return dest;
};


/***/ }),
/* 43 */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Buffer = __webpack_require__(7).Buffer;
var util = __webpack_require__(45);

function copyBuffer(src, target, offset) {
  src.copy(target, offset);
}

module.exports = function () {
  function BufferList() {
    _classCallCheck(this, BufferList);

    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  BufferList.prototype.push = function push(v) {
    var entry = { data: v, next: null };
    if (this.length > 0) this.tail.next = entry;else this.head = entry;
    this.tail = entry;
    ++this.length;
  };

  BufferList.prototype.unshift = function unshift(v) {
    var entry = { data: v, next: this.head };
    if (this.length === 0) this.tail = entry;
    this.head = entry;
    ++this.length;
  };

  BufferList.prototype.shift = function shift() {
    if (this.length === 0) return;
    var ret = this.head.data;
    if (this.length === 1) this.head = this.tail = null;else this.head = this.head.next;
    --this.length;
    return ret;
  };

  BufferList.prototype.clear = function clear() {
    this.head = this.tail = null;
    this.length = 0;
  };

  BufferList.prototype.join = function join(s) {
    if (this.length === 0) return '';
    var p = this.head;
    var ret = '' + p.data;
    while (p = p.next) {
      ret += s + p.data;
    }return ret;
  };

  BufferList.prototype.concat = function concat(n) {
    if (this.length === 0) return Buffer.alloc(0);
    if (this.length === 1) return this.head.data;
    var ret = Buffer.allocUnsafe(n >>> 0);
    var p = this.head;
    var i = 0;
    while (p) {
      copyBuffer(p.data, ret, i);
      i += p.data.length;
      p = p.next;
    }
    return ret;
  };

  return BufferList;
}();

if (util && util.inspect && util.inspect.custom) {
  module.exports.prototype[util.inspect.custom] = function () {
    var obj = util.inspect({ length: this.length });
    return this.constructor.name + ' ' + obj;
  };
}

/***/ }),
/* 45 */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var scope = (typeof global !== "undefined" && global) ||
            (typeof self !== "undefined" && self) ||
            window;
var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, scope, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, scope, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(scope, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(47);
// On some exotic environments, it's not clear which object `setimmediate` was
// able to install onto.  Search each possibility in the same order as the
// `setimmediate` library.
exports.setImmediate = (typeof self !== "undefined" && self.setImmediate) ||
                       (typeof global !== "undefined" && global.setImmediate) ||
                       (this && this.setImmediate);
exports.clearImmediate = (typeof self !== "undefined" && self.clearImmediate) ||
                         (typeof global !== "undefined" && global.clearImmediate) ||
                         (this && this.clearImmediate);

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2), __webpack_require__(1)))

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {
/**
 * Module exports.
 */

module.exports = deprecate;

/**
 * Mark that a method should not be used.
 * Returns a modified function which warns once by default.
 *
 * If `localStorage.noDeprecation = true` is set, then it is a no-op.
 *
 * If `localStorage.throwDeprecation = true` is set, then deprecated functions
 * will throw an Error when invoked.
 *
 * If `localStorage.traceDeprecation = true` is set, then deprecated functions
 * will invoke `console.trace()` instead of `console.error()`.
 *
 * @param {Function} fn - the function to deprecate
 * @param {String} msg - the string to print to the console when `fn` is invoked
 * @returns {Function} a new "deprecated" version of `fn`
 * @api public
 */

function deprecate (fn, msg) {
  if (config('noDeprecation')) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (config('throwDeprecation')) {
        throw new Error(msg);
      } else if (config('traceDeprecation')) {
        console.trace(msg);
      } else {
        console.warn(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
}

/**
 * Checks `localStorage` for boolean values for the given `name`.
 *
 * @param {String} name
 * @returns {Boolean}
 * @api private
 */

function config (name) {
  // accessing global.localStorage can trigger a DOMException in sandboxed iframes
  try {
    if (!global.localStorage) return false;
  } catch (_) {
    return false;
  }
  var val = global.localStorage[name];
  if (null == val) return false;
  return String(val).toLowerCase() === 'true';
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// a passthrough stream.
// basically just the most minimal sort of Transform stream.
// Every written chunk gets output as-is.



module.exports = PassThrough;

var Transform = __webpack_require__(18);

/*<replacement>*/
var util = __webpack_require__(5);
util.inherits = __webpack_require__(3);
/*</replacement>*/

util.inherits(PassThrough, Transform);

function PassThrough(options) {
  if (!(this instanceof PassThrough)) return new PassThrough(options);

  Transform.call(this, options);
}

PassThrough.prototype._transform = function (chunk, encoding, cb) {
  cb(null, chunk);
};

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(12);


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(0);


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(11).Transform


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(11).PassThrough


/***/ }),
/* 54 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);