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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/admin.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/admin.js":
/*!**********************!*\
  !*** ./src/admin.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _admin_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./admin.scss */ "./src/admin.scss");


const wholesomeHelpers = {};
/**
 * Run.
 */

document.addEventListener('DOMContentLoaded', () => {
  const network_plugins_page = document.querySelector('body.plugins-php.network-admin');

  if (!network_plugins_page) {
    return;
  }

  wholesomeHelpers.toggleActivationLinks();
  wholesomeHelpers.setNetworkActiveStatus();
  wholesomeHelpers.detachPanel();
  wholesomeHelpers.handlePanelToggleClick();
});
/**
 * Deactivate Plugin Fetch.
 * 
 * Fetch command to deactivate the plugin.
 * 
 * @param {string} path API Path.
 * @returns {object}
 */

wholesomeHelpers.toggleActivationPluginFetch = async function (path) {
  try {
    const response = await fetch(path);
    return response;
  } catch (e) {
    // Error.
    return e;
  }
};
/**
 * Toggle Activation Plugin Buttons.
 * 
 * Click listeners for the deactivate and activate links.
 */


wholesomeHelpers.toggleActivationLinks = function () {
  const deactivateCheckboxes = document.querySelectorAll('[data-toggle-activation-link]');
  deactivateCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', e => {
      e.preventDefault();
      const pathRoot = WholesomeNetworkPluginManagerSettings.restUrl;
      const path = 'site/' + e.target.attributes['data-site'].value + '/plugin/' + e.target.attributes['data-plugin'].value + '/?_wpnonce=' + WholesomeNetworkPluginManagerSettings.restNonce;
      let result = '';

      if (e.target.checked) {
        wholesomeHelpers.toggleActivationPluginFetch(pathRoot + '/activate/' + path).then(response => response.json()).then(response => wholesomeHelpers.createAdminNotice(response));
      } else {
        wholesomeHelpers.toggleActivationPluginFetch(pathRoot + '/deactivate/' + path).then(response => response.json()).then(response => wholesomeHelpers.createAdminNotice(response));
      }

      wholesomeHelpers.setNetworkActiveStatus();
      return false;
    });
  });
};
/**
 * Add Network Active Class.
 * 
 * Add network active class to rows that have network active plugins.
 */


wholesomeHelpers.setNetworkActiveStatus = function () {
  const tableRows = document.querySelectorAll('table tr');
  tableRows.forEach(row => {
    var text = row.querySelector('.network-plugin-manager__text');

    if (row.classList.contains('active') && !row.classList.contains('active--network')) {
      return;
    }

    if (row.querySelector('.network-plugin-manager__toggle-panel input:checked')) {
      row.classList.remove('inactive');
      row.classList.add('active');
      row.classList.add('active--network');

      if (text) {
        row.querySelector('.network-plugin-manager__text').innerHTML = WholesomeNetworkPluginManagerSettings.deactivateString;
      }
    } else {
      row.classList.remove('active');
      row.classList.remove('active--network');
      row.classList.add('inactive');

      if (text) {
        row.querySelector('.network-plugin-manager__text').innerHTML = WholesomeNetworkPluginManagerSettings.activateString;
      }
    }
  });
};

wholesomeHelpers.detachPanel = function () {
  const panels = document.querySelectorAll('.network-plugin-manager__toggle-panel');
  panels.forEach(panel => {
    const td = panel.closest('td');
    td.insertBefore(panel, td.querySelector('.toggle-row'));
  });
};

wholesomeHelpers.handlePanelToggleClick = function () {
  const buttons = document.querySelectorAll('button[data-toggle-network-panel]');
  buttons.forEach(button => {
    button.addEventListener('click', e => {
      e.preventDefault();
      const td = e.target.closest('td');
      const panel = td.querySelector('.network-plugin-manager__toggle-panel');
      const icon = td.querySelector('.network-plugin-manager__icon');

      if ('none' === panel.style.display) {
        button.setAttribute('aria-expanded', 'true');
        panel.setAttribute('aria-hidden', 'false');
        wholesomeHelpers.slideDown(panel);
        icon.innerHTML = '▲';
      } else {
        button.setAttribute('aria-expanded', 'false');
        panel.setAttribute('aria-hidden', 'true');
        icon.innerHTML = '▼';
        wholesomeHelpers.slideUp(panel);
      }

      return false;
    });
  });
};
/**
 * Slide down with JQuery and JS.
 * @param {object} element Element.
 */


wholesomeHelpers.slideDown = function (element) {
  if ('block' === element.style.display) {
    return;
  }

  element.style.height = 0;
  element.classList.add('slide-down');
  element.style.display = 'block';
  element.style.height = `${element.scrollHeight}px`;
  setTimeout(function () {
    element.classList.remove('slide-down');
    element.style.height = '';
  }, 250);
};
/**
 * Slide up with JQuery and JS.
 * @param {object} element Element.
 */


wholesomeHelpers.slideUp = function (element) {
  if ('none' === element.style.display) {
    return;
  }

  element.style.height = `${element.scrollHeight}px`;
  element.classList.add('slide-up');
  setTimeout(function () {
    element.style.height = 0;
  }, 10);
  setTimeout(function () {
    element.style.display = 'none';
    element.classList.remove('slide-up');
    element.style.height = '';
  }, 250);
};
/**
 * Create Admin Notice.
 */


wholesomeHelpers.createAdminNotice = function (message) {
  document.querySelectorAll('.updated.notice.is-dismissible').forEach(element => element.remove());
  const div = document.createElement('div');
  div.setAttribute('aria-live', 'polite');
  div.classList.add('updated', 'notice', 'is-dismissible', 'network-plugin-manager__notice');
  const p = document.createElement('p');
  p.innerHTML = message;
  div.append(p);
  const button = document.createElement('button');
  button.setAttribute('type', 'button');
  button.classList.add('notice-dismiss');
  const span = document.createElement('span');
  span.classList.add('screen-reader-text');
  span.innerHTML = WholesomeNetworkPluginManagerSettings.dismissNoticeString;
  button.append(span);
  div.append(button);
  var area = document.querySelector('.wrap > h2');
  area.parentNode.insertBefore(div, area);
  button.addEventListener('click', function () {
    div.remove();
  });
};

/***/ }),

/***/ "./src/admin.scss":
/*!************************!*\
  !*** ./src/admin.scss ***!
  \************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = window["wp"]["i18n"]; }());

/***/ })

/******/ });
//# sourceMappingURL=admin.js.map