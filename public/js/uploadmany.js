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
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 53);
/******/ })
/************************************************************************/
/******/ ({

/***/ 53:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(54);


/***/ }),

/***/ 54:
/***/ (function(module, exports) {

$(document).ready(function () {
    var editor = new $.fn.dataTable.Editor({
        ajax: "/datatable/uploadmany",
        table: "#uploadmany",
        template: "#editForm",
        fields: [{
            label: "Name:",
            name: "u.name"
        }, {
            label: "Email:",
            name: "u.email"
        }, {
            label: "Images:",
            name: "files[].id",
            type: "uploadMany",
            display: function display(fileId, counter) {
                return '<img src="' + editor.file('files', fileId).web_path + '"/>';
            },
            noFileText: 'No images'
        }]
    });

    var options = {
        ajax: {
            url: '/datatable/uploadmany',
            type: "POST"
        },
        columns: [{ data: "u.id" }, { data: "u.name" }, { data: "u.email" }, {
            data: "files",
            render: function render(d) {
                return d.length ? d.length + ' image(s)' : 'No image';
            },
            title: "Image"
        }],
        orderCellsTop: true,
        fixedHeader: true,
        pageLength: 25,
        select: true,
        serverSide: false,
        stateSave: false,
        buttons: [{ extend: "create", editor: editor }, { extend: "edit", editor: editor }, { extend: "remove", editor: editor }]
    };

    var table = $("#uploadmany").DataTable(options);

    // Display the buttons
    new $.fn.dataTable.Buttons(table, [{ extend: "create", editor: editor }, { extend: "edit", editor: editor }, { extend: "remove", editor: editor }]);

    table.buttons().container().appendTo($('.col-md-6:eq(0)', table.table().container()));
});

/***/ })

/******/ });