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
/* harmony import */ var _admin_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./admin.scss */ "./src/admin.scss");
/* harmony import */ var _js_dashboard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./js/dashboard */ "./src/js/dashboard.js");
/* harmony import */ var _js_panel__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./js/panel */ "./src/js/panel.js");
/* harmony import */ var _js_buttons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./js/buttons */ "./src/js/buttons.js");
/**
 * Admin.
 * 
 * The main file that runs in wp-admin.
 */
// Import SCSS.
 // Import modules.




/**
 * Run.
 */

document.addEventListener('DOMContentLoaded', () => {
  const networkPluginsPage = document.querySelector('body.plugins-php.network-admin');

  if (!networkPluginsPage) {
    return;
  }

  Object(_js_panel__WEBPACK_IMPORTED_MODULE_2__["detachPanel"])();
  Object(_js_panel__WEBPACK_IMPORTED_MODULE_2__["handlePanelToggleClick"])();
  Object(_js_dashboard__WEBPACK_IMPORTED_MODULE_1__["setNetworkActiveStatus"])();
  Object(_js_buttons__WEBPACK_IMPORTED_MODULE_3__["toggleActivationLinks"])();
});

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

/***/ "./src/js/buttons.js":
/*!***************************!*\
  !*** ./src/js/buttons.js ***!
  \***************************/
/*! exports provided: toggleActivationLinks */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toggleActivationLinks", function() { return toggleActivationLinks; });
/* harmony import */ var _rest__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rest */ "./src/js/rest.js");
/* harmony import */ var _notices__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./notices */ "./src/js/notices.js");
/**
 * Buttons.
 */
// Import modules.


/**
 * Toggle Activation Plugin Buttons.
 * 
 * Click listeners for the deactivate and activate links.
 */

function toggleActivationLinks() {
  const deactivateCheckboxes = document.querySelectorAll('[data-toggle-activation-link]');
  deactivateCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', e => {
      e.preventDefault();
      const pathRoot = WholesomeNetworkPluginManagerSettings.restUrl;
      const path = 'site/' + e.target.attributes['data-site'].value + '/plugin/' + e.target.attributes['data-plugin'].value + '/?_wpnonce=' + WholesomeNetworkPluginManagerSettings.restNonce;

      if (e.target.checked) {
        Object(_rest__WEBPACK_IMPORTED_MODULE_0__["fetchEndpoint"])(pathRoot + '/activate/' + path).then(response => response.json()).then(response => Object(_notices__WEBPACK_IMPORTED_MODULE_1__["createAdminNotice"])(response));
      } else {
        Object(_rest__WEBPACK_IMPORTED_MODULE_0__["fetchEndpoint"])(pathRoot + '/deactivate/' + path).then(response => response.json()).then(response => Object(_notices__WEBPACK_IMPORTED_MODULE_1__["createAdminNotice"])(response));
      }

      setNetworkActiveStatus();
      return false;
    });
  });
}
;

/***/ }),

/***/ "./src/js/dashboard.js":
/*!*****************************!*\
  !*** ./src/js/dashboard.js ***!
  \*****************************/
/*! exports provided: setNetworkActiveStatus */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setNetworkActiveStatus", function() { return setNetworkActiveStatus; });
/**
 * Dashboard.
 */

/**
 * Add Network Active Class.
 * 
 * Add network active class to rows that have network active plugins.
 */
function setNetworkActiveStatus() {
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
}
;

/***/ }),

/***/ "./src/js/notices.js":
/*!***************************!*\
  !*** ./src/js/notices.js ***!
  \***************************/
/*! exports provided: createAdminNotice */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createAdminNotice", function() { return createAdminNotice; });
/**
 * Notices.
 */

/**
 * Create Admin Notice.
 * 
 * @param {string} message Message.
 */
function createAdminNotice(message) {
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
}
;

/***/ }),

/***/ "./src/js/panel.js":
/*!*************************!*\
  !*** ./src/js/panel.js ***!
  \*************************/
/*! exports provided: detachPanel, handlePanelToggleClick */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "detachPanel", function() { return detachPanel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "handlePanelToggleClick", function() { return handlePanelToggleClick; });
/* harmony import */ var _ui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ui */ "./src/js/ui.js");
/**
 * Panel.
 */
// Import modules.

/**
 * Detach Panel.
 * 
 * Detaches the Panel from the Button on load.
 */

function detachPanel() {
  const panels = document.querySelectorAll('.network-plugin-manager__toggle-panel');
  panels.forEach(panel => {
    const td = panel.closest('td');
    td.insertBefore(panel, td.querySelector('.toggle-row'));
  });
}
/**
 * Handle Panel Toggle Click.
 * 
 * Expand and collapse the toggle panel.
 */

function handlePanelToggleClick() {
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
        Object(_ui__WEBPACK_IMPORTED_MODULE_0__["slideDown"])(panel);
        icon.innerHTML = '▲';
      } else {
        button.setAttribute('aria-expanded', 'false');
        panel.setAttribute('aria-hidden', 'true');
        icon.innerHTML = '▼';
        Object(_ui__WEBPACK_IMPORTED_MODULE_0__["slideUp"])(panel);
      }

      return false;
    });
  });
}

/***/ }),

/***/ "./src/js/rest.js":
/*!************************!*\
  !*** ./src/js/rest.js ***!
  \************************/
/*! exports provided: fetchEndpoint */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchEndpoint", function() { return fetchEndpoint; });
/**
 * REST.
 */

/**
 * Fetch Endpoint.
 * 
 * Fetch command to activate and deactivate the plugin.
 * 
 * @param {string} path API Path.
 * @returns {object}
 */
async function fetchEndpoint(path) {
  try {
    const response = await fetch(path);
    return response;
  } catch (e) {
    // Error.
    return e;
  }
}
;

/***/ }),

/***/ "./src/js/ui.js":
/*!**********************!*\
  !*** ./src/js/ui.js ***!
  \**********************/
/*! exports provided: slideDown, slideUp */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "slideDown", function() { return slideDown; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "slideUp", function() { return slideUp; });
/**
 * UI.
 */

/**
 * Slide down with JQuery and JS.
 * @param {object} element Element.
 */
function slideDown(element) {
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
}
;
/**
 * Slide up with JQuery and JS.
 * @param {object} element Element.
 */

function slideUp(element) {
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
}
;

/***/ })

/******/ });
//# sourceMappingURL=admin.js.map