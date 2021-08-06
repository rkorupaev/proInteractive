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
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/modules/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/modules/index.js":
/*!*****************************!*\
  !*** ./js/modules/index.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// selector of all videos on the page\nvar videos = document.querySelectorAll('.video-modal__video-placeholder'); // generate video url\n\nvar generateUrl = function generateUrl(id) {\n  var query = '?rel=0&showinfo=0&autoplay=1';\n  return 'https://www.youtube.com/embed/' + id + query;\n}; // creating iframe\n\n\nvar createIframe = function createIframe(id) {\n  var iframe = document.createElement('iframe');\n  iframe.setAttribute('allowfullscreen', '');\n  iframe.setAttribute('allow', 'autoplay; encrypted-media');\n  iframe.setAttribute('src', generateUrl(id));\n  iframe.setAttribute(\"width\", \"315\");\n  iframe.setAttribute(\"height\", \"188\");\n  return iframe;\n}; // main code\n\n\nvideos.forEach(function (el) {\n  var videoHref = el.getAttribute('data-video');\n  var deletedLength = 'https://youtu.be/'.length;\n  var videoId = videoHref.substring(deletedLength, videoHref.length);\n  var placeholderImg = el.querySelector('.video-placeholder__image');\n  var youtubeImgSrc = 'https://i.ytimg.com/vi/' + videoId + '/maxresdefault.jpg';\n  placeholderImg.setAttribute('src', youtubeImgSrc);\n  var mainBodyVideoBlockPlaceHolder = document.querySelector(\".video-block__inner-block\");\n  mainBodyVideoBlockPlaceHolder.style.backgroundImage = \"url(\" + youtubeImgSrc + \")\";\n  el.addEventListener('click', function (e) {\n    e.preventDefault();\n    var iframe = createIframe(videoId);\n    el.querySelector('.video-placeholder__image').remove();\n    el.appendChild(iframe);\n    el.querySelector('.video-placeholder__button').remove();\n  });\n});\n\n//# sourceURL=webpack:///./js/modules/index.js?");

/***/ })

/******/ });