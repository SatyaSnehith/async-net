/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/home/fileComponent.js":
/*!***********************************!*\
  !*** ./src/home/fileComponent.js ***!
  \***********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ FileComponent; }
/* harmony export */ });
/* harmony import */ var _nui_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../nui/components */ "./src/nui/components.js");
/* harmony import */ var _nui_style__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../nui/style */ "./src/nui/style.js");


class FileComponent extends _nui_components__WEBPACK_IMPORTED_MODULE_0__.Column {
  constructor() {
    super({
      styles: {
        width: '130px',
        height: '160px',
        backgroundColor: _nui_style__WEBPACK_IMPORTED_MODULE_1__.Color.FileColor,
        borderRadius: '8px',
        ..._nui_style__WEBPACK_IMPORTED_MODULE_1__.Style.Pointer
      },
      attrs: {
        tabIndex: '0',
        onclick: e => {
          console.log(e);
        }
      }
    });
    _nui_components__WEBPACK_IMPORTED_MODULE_0__.SizeObserver.addObserver(isMobile => {
      if (isMobile) {
        this.style({
          width: '130px',
          height: '160px'
        });
      } else {
        this.style({
          width: 130 * 1.5 + 'px',
          height: 130 * 1.5 + 'px'
        });
      }
    });
    const preview = new _nui_components__WEBPACK_IMPORTED_MODULE_0__.Column({
      styles: {
        height: '100%',
        padding: '6px'
      }
    });
    const icon = new _nui_components__WEBPACK_IMPORTED_MODULE_0__.Column({
      styles: {
        backgroundColor: _nui_style__WEBPACK_IMPORTED_MODULE_1__.Color.FileInnerColor,
        borderRadius: '4px',
        height: '100%',
        width: '100%'
      }
    });
    preview.add(icon);
    this.add(preview);
    const info = new _nui_components__WEBPACK_IMPORTED_MODULE_0__.Row({
      styles: {
        padding: '4px 8px'
      }
    });
    info.add(new _nui_components__WEBPACK_IMPORTED_MODULE_0__.Text({
      text: "File name",
      styles: {
        width: '100%',
        alignContent: 'center',
        textAlign: 'center'
      }
    }));
    info.add(new _nui_components__WEBPACK_IMPORTED_MODULE_0__.IconButton({
      svgName: 'moreVertical',
      styles: {
        padding: '6px'
      }
    }));
    this.hoverStyle({
      backgroundColor: _nui_style__WEBPACK_IMPORTED_MODULE_1__.Color.FileColor
    }, {
      backgroundColor: _nui_style__WEBPACK_IMPORTED_MODULE_1__.Color.HoveredFileColor
    });
    this.add(info);
  }
}

/***/ }),

/***/ "./src/home/files.js":
/*!***************************!*\
  !*** ./src/home/files.js ***!
  \***************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ FilesTab; }
/* harmony export */ });
/* harmony import */ var _fileComponent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./fileComponent */ "./src/home/fileComponent.js");
/* harmony import */ var _nui_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../nui/element */ "./src/nui/element.js");


const filesUi = props => {};
class FilesTab extends _nui_element__WEBPACK_IMPORTED_MODULE_1__.Element {
  constructor(props) {
    super({
      tag: 'div',
      styles: {
        display: 'inline-flex',
        flexFlow: 'wrap',
        padding: '16px',
        gap: '16px',
        justifyContent: 'center'
      }
    });
    for (let i = 0; i <= 20; ++i) {
      this.add(new _fileComponent__WEBPACK_IMPORTED_MODULE_0__["default"]());
    }
  }
}
class ViewModel {
  constructor() {}
}

/***/ }),

/***/ "./src/home/home.js":
/*!**************************!*\
  !*** ./src/home/home.js ***!
  \**************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ HomeScreen; }
/* harmony export */ });
/* harmony import */ var _nui_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../nui/components */ "./src/nui/components.js");
/* harmony import */ var _nui_ref__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../nui/ref */ "./src/nui/ref.js");
/* harmony import */ var _nui_api__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../nui/api */ "./src/nui/api.js");
/* harmony import */ var _files__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./files */ "./src/home/files.js");
/* harmony import */ var _nui_style__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../nui/style */ "./src/nui/style.js");






// https://www.youtube.com/watch?v=0fONene3OIA&ab_channel=BeyondFireship
// web vitals chrome extesion

const homeUi = props => {
  const screen = new _nui_components__WEBPACK_IMPORTED_MODULE_0__.Column();
  const topBar = new _nui_components__WEBPACK_IMPORTED_MODULE_0__.Row({
    styles: {
      padding: '8px',
      alignItems: 'center',
      position: 'sticky',
      top: '0',
      backgroundColor: _nui_style__WEBPACK_IMPORTED_MODULE_4__.Color.BgColor,
      zIndex: '100'
    }
  });
  const selectedTitle = (0,_nui_ref__WEBPACK_IMPORTED_MODULE_1__.ref)('Files');
  const titles = _nui_components__WEBPACK_IMPORTED_MODULE_0__.Tabs.createTabItems('Files', 'Text');
  const titleTabs = new _nui_components__WEBPACK_IMPORTED_MODULE_0__.TitleTabs({
    tabItems: titles,
    selectedItem: selectedTitle
  });
  topBar.add(titleTabs);
  topBar.add(new _nui_components__WEBPACK_IMPORTED_MODULE_0__.HorizontalSpace('auto'));
  topBar.add(new _nui_components__WEBPACK_IMPORTED_MODULE_0__.IconButton({
    svgName: 'refresh',
    attrs: {
      tabIndex: '0',
      onclick: () => props?.onRefreshClicked?.()
    }
  }));
  topBar.add(new _nui_components__WEBPACK_IMPORTED_MODULE_0__.HorizontalSpace('4px'));
  const themeIcon = (0,_nui_ref__WEBPACK_IMPORTED_MODULE_1__.ref)('sun');
  topBar.add(new _nui_components__WEBPACK_IMPORTED_MODULE_0__.IconButton({
    svgName: themeIcon,
    attrs: {
      tabIndex: '0',
      onclick: () => {
        const body = document.body;
        body.classList.toggle('darkTheme');
        body.classList.toggle('lightTheme');
        if (themeIcon.value === 'moon') themeIcon.value = 'sun';else themeIcon.value = 'moon';
      }
    }
  }));
  topBar.add(new _nui_components__WEBPACK_IMPORTED_MODULE_0__.HorizontalSpace('4px'));
  topBar.add(new _nui_components__WEBPACK_IMPORTED_MODULE_0__.IconButton({
    svgName: 'settings',
    attrs: {
      tabIndex: '0',
      onclick: () => props?.onSettingsClicked?.()
    }
  }));
  screen.add(topBar);
  const textCol = new _nui_components__WEBPACK_IMPORTED_MODULE_0__.Column();
  const s = new _nui_components__WEBPACK_IMPORTED_MODULE_0__.StateSet({
    selectedItem: selectedTitle,
    states: {
      'Files': new _files__WEBPACK_IMPORTED_MODULE_3__["default"](),
      'Text': textCol
    }
  });
  screen.add(s);
  return {
    selectedTitle: selectedTitle,
    el: screen
  };
};
class HomeScreen extends _nui_components__WEBPACK_IMPORTED_MODULE_0__.Screen {
  constructor() {
    super();
    const count = (0,_nui_ref__WEBPACK_IMPORTED_MODULE_1__.ref)('-1');
    const ui = homeUi({
      count: count,
      onSettingsClicked: () => this.onSettingsClicked()
    });
    const viewModel = new HomeViewModel();
    viewModel.itemsApi.subscribe(data => {
      count.value = data.totalItems.toString();
    });
    viewModel.itemsApi.isLoading.addObserver(data => {
      console.log("isLoading: " + data);
    });
    viewModel.getItems();
    this.add(ui.el);
    this.ui = ui;
  }
  onSettingsClicked() {
    console.log("settings");
    this.ui.selectedTitle.value = 'Text';
  }
}
class HomeViewModel {
  constructor() {
    this.itemsApi = new _nui_api__WEBPACK_IMPORTED_MODULE_2__.ApiCall({
      url: 'https://raw.githubusercontent.com/SatyaSnehith/posts/main/projects.json'
    });
  }
  async getItems() {
    await this.itemsApi.call();
  }
}

/***/ }),

/***/ "./src/nui/api.js":
/*!************************!*\
  !*** ./src/nui/api.js ***!
  \************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ApiCall: function() { return /* binding */ ApiCall; }
/* harmony export */ });
/* harmony import */ var _ref__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ref */ "./src/nui/ref.js");

class ApiCall {
  /**
   *
   * @param { {
   * url: String,
   * } } props
   */
  constructor() {
    let props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    this.url = props?.url;
    this.isLoading = (0,_ref__WEBPACK_IMPORTED_MODULE_0__.ref)(true);
    this.data = null;
    this.subscribers = [];
  }
  async api() {
    try {
      const response = await fetch(this.url);
      if (!response.ok) throw new Error('Network response was not ok');
      return await response.json();
    } catch (error) {
      console.error('Failed to fetch users:', error);
      return null;
    }
  }
  async call() {
    this.isLoading.value = true;
    this.data = await this.api();
    this.isLoading.value = false;
    this.notify();
  }
  subscribe(callback) {
    this.subscribers.push(callback);
  }
  notify() {
    if (this.data) {
      this.subscribers.forEach(callback => callback(this.data));
    }
  }
}

/***/ }),

/***/ "./src/nui/components.js":
/*!*******************************!*\
  !*** ./src/nui/components.js ***!
  \*******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Button: function() { return /* binding */ Button; },
/* harmony export */   Column: function() { return /* binding */ Column; },
/* harmony export */   Dialog: function() { return /* binding */ Dialog; },
/* harmony export */   HorizontalDivider: function() { return /* binding */ HorizontalDivider; },
/* harmony export */   HorizontalSpace: function() { return /* binding */ HorizontalSpace; },
/* harmony export */   IconButton: function() { return /* binding */ IconButton; },
/* harmony export */   MenuPopup: function() { return /* binding */ MenuPopup; },
/* harmony export */   Nav: function() { return /* binding */ Nav; },
/* harmony export */   Popup: function() { return /* binding */ Popup; },
/* harmony export */   Route: function() { return /* binding */ Route; },
/* harmony export */   Row: function() { return /* binding */ Row; },
/* harmony export */   Screen: function() { return /* binding */ Screen; },
/* harmony export */   SizeObserver: function() { return /* binding */ SizeObserver; },
/* harmony export */   State: function() { return /* binding */ State; },
/* harmony export */   StateSet: function() { return /* binding */ StateSet; },
/* harmony export */   SvgIcon: function() { return /* binding */ SvgIcon; },
/* harmony export */   Tabs: function() { return /* binding */ Tabs; },
/* harmony export */   Text: function() { return /* binding */ Text; },
/* harmony export */   TitleTabs: function() { return /* binding */ TitleTabs; },
/* harmony export */   UnderlineTabs: function() { return /* binding */ UnderlineTabs; },
/* harmony export */   VerticalSpace: function() { return /* binding */ VerticalSpace; }
/* harmony export */ });
/* harmony import */ var _element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./element */ "./src/nui/element.js");
/* harmony import */ var _style__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style */ "./src/nui/style.js");
/* harmony import */ var _ref__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ref */ "./src/nui/ref.js");



const body = document.body;
const SizeObserver = {
  observers: [],
  mobileMaxWidth: 760,
  isMobile: body.clientWidth < 760,
  isMobileListening: false,
  listen: function () {
    this.isMobileListening = true;
    window.matchMedia("(max-width: " + SizeObserver.mobileMaxWidth + "px)").addEventListener("change", x => {
      this.isMobile = x.matches;
      for (const observer of this.observers) {
        observer(this.isMobile);
      }
    });
  },
  addObserver: function (observer) {
    if (!this.isMobileListening) {
      this.listen();
    }
    observer(this.isMobile);
    this.observers.push(observer);
  }
};
SizeObserver.addObserver(isMobile => console.log("isMobile: " + isMobile));
class VerticalSpace extends _element__WEBPACK_IMPORTED_MODULE_0__.Element {
  constructor(margin) {
    super({
      tag: 'div',
      styles: {
        marginTop: margin
      }
    });
  }
}
class HorizontalSpace extends _element__WEBPACK_IMPORTED_MODULE_0__.Element {
  constructor(margin) {
    super({
      tag: 'div',
      styles: {
        marginLeft: margin
      }
    });
  }
}
class HorizontalDivider extends _element__WEBPACK_IMPORTED_MODULE_0__.Element {
  /**
   *
   * @param { { styles } } props
   */
  constructor(props) {
    super({
      tag: 'div',
      styles: {
        height: '1px',
        backgroundColor: _style__WEBPACK_IMPORTED_MODULE_1__.Color.BorderColor,
        ...props.styles
      }
    });
  }
}
class Row extends _element__WEBPACK_IMPORTED_MODULE_0__.Element {
  /**
   *
   * @param { { id, items, styles, attrs } } props
   */
  constructor() {
    let props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    super({
      tag: 'div',
      ...props
    });
    this.style(_style__WEBPACK_IMPORTED_MODULE_1__.Style.Row);
    for (const e of props?.items ?? []) {
      this.add(e);
    }
  }
}
class Column extends _element__WEBPACK_IMPORTED_MODULE_0__.Element {
  /**
   *
   * @param { { id, items, styles, attrs } } props
   */
  constructor() {
    let props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    super({
      tag: 'div',
      ...props
    });
    this.style(_style__WEBPACK_IMPORTED_MODULE_1__.Style.Column);
    for (const e of props?.items ?? []) {
      this.add(e);
    }
  }
}
class Text extends _element__WEBPACK_IMPORTED_MODULE_0__.Element {
  /**
   *
   * @param { { text, styles, attrs } } props
   */
  constructor() {
    let props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    super({
      tag: 'div',
      attrs: props.attrs,
      styles: {
        ...{
          margin: '0px',
          color: _style__WEBPACK_IMPORTED_MODULE_1__.Color.TextColor,
          fontWeight: '300'
        },
        ...props.styles
      }
    });
    this.checkRef(props.text, value => {
      this.content(value);
    });
  }
}
class SvgIcon extends _element__WEBPACK_IMPORTED_MODULE_0__.Element {
  /**
   *
   * @param { { svgName, size, styles, attrs } } props
   */
  constructor() {
    let props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    super();
    this.size = props.size || '18px';
    this.node = (0,_element__WEBPACK_IMPORTED_MODULE_0__.fromHTML)(_style__WEBPACK_IMPORTED_MODULE_1__.Icon.icons[props.svgName]);
    this.style({
      ..._style__WEBPACK_IMPORTED_MODULE_1__.Style.Size(this.size),
      ...props.styles,
      stoke: _style__WEBPACK_IMPORTED_MODULE_1__.Color.TextColor,
      ..._style__WEBPACK_IMPORTED_MODULE_1__.Style.Size(this.size)
    });
    this.attr(props.attrs);
  }

  /**
   *
   * @param { { svg, size, styles } } props
   */
  content(props) {
    if (props.svg) {
      super.content(props.svg);
    }
    this.style({
      ...props.styles,
      verticalAlign: 'top',
      // svg bug
      pointerEvents: 'none',
      ..._style__WEBPACK_IMPORTED_MODULE_1__.Style.Size(this.size),
      stoke: _style__WEBPACK_IMPORTED_MODULE_1__.Color.TextColor
    });
  }
}
class IconButton extends _element__WEBPACK_IMPORTED_MODULE_0__.Element {
  /**
   *
   * @param { { svgName, styles, attrs } } props
   */
  constructor() {
    let props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    super({
      tag: 'div',
      attrs: props.attrs,
      styles: {
        display: 'flex',
        padding: '8px',
        borderRadius: '6px',
        alignItems: 'center',
        ..._style__WEBPACK_IMPORTED_MODULE_1__.Style.Pointer,
        ...props.styles
      }
    });
    this.svg = new SvgIcon({
      svgName: _ref__WEBPACK_IMPORTED_MODULE_2__.Ref.getValue(props.svgName),
      size: '16px'
    });
    this.checkRef(props.svgName, value => {
      console.log("svg change " + value);
      this.svg.replaceNode((0,_element__WEBPACK_IMPORTED_MODULE_0__.fromHTML)(_style__WEBPACK_IMPORTED_MODULE_1__.Icon.icons[value]));
    });
    this.add(this.svg);
    this.hoverStyle(_style__WEBPACK_IMPORTED_MODULE_1__.Style.EmptyBg, _style__WEBPACK_IMPORTED_MODULE_1__.Style.CardBg);
  }
}
class Button extends _element__WEBPACK_IMPORTED_MODULE_0__.Element {
  /**
   *
   * @param { { text, href, svgName, styles, attrs } } props
   */
  constructor() {
    let props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    super({
      tag: 'div',
      ...props
    });
    this.hoverStyle(_style__WEBPACK_IMPORTED_MODULE_1__.Style.EmptyBg, _style__WEBPACK_IMPORTED_MODULE_1__.Style.CardBg);
    this.style({
      margin: '0px',
      color: _style__WEBPACK_IMPORTED_MODULE_1__.Color.TextColor
    }, _style__WEBPACK_IMPORTED_MODULE_1__.Style.BorderRadius('4px'), _style__WEBPACK_IMPORTED_MODULE_1__.Style.Padding('4px 8px'), _style__WEBPACK_IMPORTED_MODULE_1__.Style.Pointer);
    if (props.svgName) {
      this.style({
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
      });
      this.svg = new SvgIcon({
        svgName: props.svgName,
        size: '16px'
      });
      this.add(this.svg);
      this.add(new HorizontalSpace('8px'));
    }
    this.add(new Text({
      text: props.text
    }));
    if (props.href) {
      this.href(props.href);
    }
  }
  href(ref) {
    this.node.href = ref;
  }
}
class Tabs extends _element__WEBPACK_IMPORTED_MODULE_0__.RefElementCollection {
  /**
   * @param { {
   * id: String,
   * selectedItem: Ref,
   * tabItems: RefArray,
   * toElement: Function,
   * styles: Object,
   * attrs: Object
   * } } props
   */
  constructor() {
    let props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    super({
      tag: 'div',
      items: props.tabItems,
      toElement: props.toElement,
      styles: {
        display: 'flex',
        ...props.styles
      },
      attrs: props.attrs
    });
    this.tabItems = props.tabItems;
    this.checkRef(props.selectedItem, (value, oldValue) => {
      if (oldValue === value) return;
      this.swapSelection(value);
      this.swapSelection(oldValue);
    });
  }
  swapSelection(text) {
    if (!text) return;
    const item = this.tabItems.find(i => {
      return i.text === text;
    });
    if (!item) return;
    item.selected.value = !item.selected.value;
  }
  static createTabItem(text) {
    let selected = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    return {
      text: text,
      selected: (0,_ref__WEBPACK_IMPORTED_MODULE_2__.ref)(selected)
    };
  }

  /**
   *
   * @param { String } textList
   * @returns
   */
  static createTabItems() {
    for (var _len = arguments.length, textList = new Array(_len), _key = 0; _key < _len; _key++) {
      textList[_key] = arguments[_key];
    }
    return (0,_ref__WEBPACK_IMPORTED_MODULE_2__.refArray)(...textList.map(t => Tabs.createTabItem(t)));
  }
}
class TitleTabs extends Tabs {
  /**
   * @param { {
   * id: String,
   * selectedItem: Ref,
   * tabItems: RefArray,
   * styles: Object,
   * attrs: Object
   * } } props
   */
  constructor() {
    let props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    super({
      ...props,
      toElement: item => {
        const text = new Text({
          text: item.text,
          styles: {
            padding: '6px',
            ..._style__WEBPACK_IMPORTED_MODULE_1__.Style.Pointer
          },
          attrs: {
            onclick: () => {
              props.selectedItem.value = item.text;
            }
          }
        });
        text.checkRef(item.selected, selected => {
          text.style({
            color: selected ? _style__WEBPACK_IMPORTED_MODULE_1__.Color.TextColor : _style__WEBPACK_IMPORTED_MODULE_1__.Color.DescriptionColor,
            fontWeight: selected ? '400' : '300'
          });
        });
        return text;
      }
    });
  }
}
class UnderlineTabs extends Tabs {
  /**
   * @param { {
   * id: String,
   * selectedItem: Ref,
   * tabItems: RefArray,
   * styles: Object,
   * attrs: Object
   * } } props
   */
  constructor() {
    let props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    super({
      ...props,
      toElement: item => {
        const column = new Column({
          attrs: {
            onclick: () => {
              props.selectedItem.value = item.text;
            }
          }
        });
        const text = new Text({
          text: item.text,
          styles: {
            padding: '6px',
            ..._style__WEBPACK_IMPORTED_MODULE_1__.Style.Pointer
          }
        });
        const underline = new HorizontalDivider({
          styles: {
            height: '2px',
            backgroundColor: _style__WEBPACK_IMPORTED_MODULE_1__.Color.BgColor,
            margin: '0px 6px'
          }
        });
        column.add(text);
        column.add(underline);
        column.checkRef(item.selected, selected => {
          text.style({
            color: selected ? _style__WEBPACK_IMPORTED_MODULE_1__.Color.TextColor : _style__WEBPACK_IMPORTED_MODULE_1__.Color.DescriptionColor,
            fontWeight: selected ? '300' : '200'
          });
          underline.style({
            backgroundColor: selected ? _style__WEBPACK_IMPORTED_MODULE_1__.Color.TextColor : _style__WEBPACK_IMPORTED_MODULE_1__.Color.BgColor
          });
        });
        return column;
      }
    });
  }
}
class State extends _element__WEBPACK_IMPORTED_MODULE_0__.Element {
  /**
   *
   * @param { { id, styles, attrs } } props
   */
  constructor() {
    let props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    super({
      tag: 'div',
      ...props
    });
  }
  set el(el) {
    this.replaceNode(el.node);
  }
}
class StateSet extends State {
  /**
   *
   * @param { { id, states, selectedItem, styles, attrs } } props
   */
  constructor() {
    let props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    super(props);
    this.states = props.states;
    this.checkRef(props.selectedItem, key => {
      this.el = this.states[key];
    });
  }
  addState(key, element) {
    this.states[key] = element;
  }
}
class Route extends _element__WEBPACK_IMPORTED_MODULE_0__.Element {
  /**
   *
   * @param { { id, el, styles, attrs } } props
   */
  constructor() {
    let props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    super({
      tag: 'div',
      styles: {
        width: '100%',
        height: '100%'
      },
      attrs: props?.attrs
    });
    this._id = props?.id ?? 'route';
    this.style(props?.styles);
    this.add(props?.el);
    this.id = (0,_element__WEBPACK_IMPORTED_MODULE_0__.createTagName)(this._id || 'route');
  }
  onmount() {
    console.log('onmount ' + this.id);
  }
  onunmount() {
    console.log('onunmount ' + this.id);
  }
}
class Screen extends Route {
  /**
   *
   * @param { { id, el, styles, attrs } } props
   */
  constructor() {
    let props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    super({
      id: props?.id ?? 'screen',
      el: props?.el,
      styles: props?.styles,
      attrs: props?.attrs
    });
    this.style({
      backgroundColor: _style__WEBPACK_IMPORTED_MODULE_1__.Color.BgColor
    });
  }
}
class Popup extends Route {
  /**
   *
   * @param { { id, el, cancelOnClickOutside } } props
   */
  constructor() {
    let props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    super({
      id: 'popup',
      attrs: {
        onclick: e => {
          if (e.target == this.node && props.cancelOnClickOutside) {
            this.dismiss();
          }
        }
      }
    });
    this.popupContent = new _element__WEBPACK_IMPORTED_MODULE_0__.Element({
      tag: 'div',
      styles: {
        backgroundColor: _style__WEBPACK_IMPORTED_MODULE_1__.Color.BgColor
      }
    });
    this.add(this.popupContent);
    this.popupContent.add(props?.el);
  }
  show() {
    body.appendChild(this.node);
    this.onmount();
  }
  dismiss() {
    this.onunmount();
    body.removeChild(this.node);
  }
}
class MenuPopup extends Popup {
  /**
   *
   * @param { { id, items } } props
   */
  constructor() {
    let props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    super({
      cancelOnClickOutside: true
    });
    this.popupContent.style({
      width: 'auto',
      padding: '4px',
      position: 'absolute',
      borderRadius: '6px',
      display: 'flex',
      flexDirection: 'column',
      ..._style__WEBPACK_IMPORTED_MODULE_1__.Style.Border
    });
    for (const e of props.items) {
      this.popupContent.add(e);
    }
  }
  position(event) {
    const targetRect = event.target.getBoundingClientRect();
    const nodeRect = this.node.getBoundingClientRect();
    const popupNodeRect = this.popupContent.node.getBoundingClientRect();
    let x, y;
    if (targetRect.left <= nodeRect.width - popupNodeRect.width) x = targetRect.left;else x = targetRect.right - popupNodeRect.width;
    if (targetRect.bottom <= nodeRect.height - popupNodeRect.height) y = targetRect.bottom;else y = targetRect.top - popupNodeRect.height;
    this.popupContent.style({
      left: x + "px",
      top: y + "px"
    });
  }
  show(event) {
    super.show();
    this.position(event);
  }
}
class Dialog extends Popup {
  /**
   *
   * @param { { id, items } } props
   */
  constructor() {
    let props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    super({
      styles: {
        backgroundColor: '#55555555'
      }
    });
    this.popupContent.style({
      width: '300px',
      padding: '16px',
      margin: 'auto'
    });
    for (const e of props.items) {
      this.popupContent.add(e);
    }
  }
}
class Nav {
  constructor(el) {
    this.currentScreen = null;
    this.body = el;
  }

  /**
   *
   * @param {Screen} newScreen
   */
  set screen(newScreen) {
    if (!(newScreen instanceof Screen)) return;
    if (this.currentScreen) {
      this.currentScreen.onunmount();
      this.currentScreen.node.replaceWith(newScreen.node);
    } else {
      this.body.appendChild(newScreen.node);
    }
    this.currentScreen = newScreen;
    this.currentScreen.onmount();
  }
}

/***/ }),

/***/ "./src/nui/element.js":
/*!****************************!*\
  !*** ./src/nui/element.js ***!
  \****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Element: function() { return /* binding */ Element; },
/* harmony export */   ElementCollection: function() { return /* binding */ ElementCollection; },
/* harmony export */   RefElementCollection: function() { return /* binding */ RefElementCollection; },
/* harmony export */   createTagName: function() { return /* binding */ createTagName; },
/* harmony export */   fromHTML: function() { return /* binding */ fromHTML; },
/* harmony export */   getTabIndex: function() { return /* binding */ getTabIndex; },
/* harmony export */   tagMap: function() { return /* binding */ tagMap; }
/* harmony export */ });
/* harmony import */ var _ref__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ref */ "./src/nui/ref.js");

function fromHTML(html) {
  let trim = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  html = trim ? html.trim() : html;
  const template = document.createElement('template');
  template.innerHTML = html;
  return template.content.children[0];
}
const tagMap = {};
function createTagName(tag) {
  let count = 1;
  if (tagMap[tag]) {
    count = tagMap[tag];
    count++;
  }
  tagMap[tag] = count;
  return count == 1 ? tag : tag + (count - 1);
}
let tabIndex = 0;
function getTabIndex() {
  return (++tabIndex).toString();
}
class Element {
  /**
   *
   * @param { { tag, id, styles, attrs } } props
   */
  constructor() {
    let props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    this.createElement(props?.tag);
    this.style(props?.styles);
    this.attr(props?.attrs);
    if (props?.id) {
      this.id = createTagName(props.id);
    }
  }
  createElement(tag) {
    if (tag) {
      this.node = document.createElement(tag);
    }
  }

  /**
   * Resets styles and attributes
   *
   * @param { string } c
   */
  content(c) {
    this.node.innerHTML = c;
  }
  style() {
    for (var _len = arguments.length, styles = new Array(_len), _key = 0; _key < _len; _key++) {
      styles[_key] = arguments[_key];
    }
    if (styles) {
      for (let i = 0; i < styles.length; ++i) {
        const style = styles[i];
        if (style) {
          for (const [key, value] of Object.entries(style)) {
            if (typeof value == 'string') {
              this.node.style[key] = value;
            } else if (value instanceof _ref__WEBPACK_IMPORTED_MODULE_0__.Ref) {
              this.node.style[key] = value.value;
              value.addObserver(v => {
                this.node.style[key] = value.value;
              });
            }
          }
        }
      }
    }
  }
  attr() {
    if (!this.node) return;
    for (var _len2 = arguments.length, attrs = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      attrs[_key2] = arguments[_key2];
    }
    if (attrs) {
      for (let i = 0; i < attrs.length; ++i) {
        const attr = attrs[i];
        if (attr) {
          for (const [key, value] of Object.entries(attr)) {
            this.node[key] = value;
          }
        }
      }
    }
  }
  add(element) {
    if (element instanceof Element) {
      if (element.id) {
        this[element.id] = element;
      }
      this.node.appendChild(element.node);
    }
  }
  onClick(onclick) {
    this.node.onclick = onclick;
  }
  onMouse(over, out) {
    this.node.onmouseover = over;
    this.node.onmouseout = out;
  }
  hoverStyle(defaultStyle, overStyle) {
    this.onMouse(() => this.style(overStyle), () => this.style(defaultStyle));
  }
  checkRef(data, onUpdate) {
    if (data instanceof _ref__WEBPACK_IMPORTED_MODULE_0__.Ref) {
      data.addObserver((value, oldValue) => {
        onUpdate(value, oldValue);
      });
      onUpdate(data.value);
    } else {
      onUpdate(data);
    }
  }
  replaceNode(node) {
    this.node.replaceWith(node);
    this.node = node;
  }
  static fromNode(node) {
    const element = new Element();
    element.node = node;
    return element;
  }
  static tabIndex = 0;
}
class ElementCollection extends Element {
  /**
   *
   * @param { { tag, id, items, styles, attrs } } props
   */
  constructor(props) {
    super(props);
    if (props) {
      this.items = props.items;
    }
  }
  add(element) {
    if (element instanceof ElementCollection) {
      this.addChildInstances(element);
    }
    super.add(element);
  }
  addAll(elements) {
    for (const el of elements) {
      this.add(el);
    }
  }
  addChildInstances(collection) {
    for (const el of collection.items) {
      if (el instanceof ElementCollection) {
        this.addChildInstances(el);
      }
      if (el instanceof Element) {
        if (el.id) {
          this[el.id] = el;
        }
      }
    }
  }
}
class RefElementCollection extends Element {
  /**
   *
   * @param { { tag, id, items, toElement, styles, attrs } } props
   */
  constructor(props) {
    super(props);
    this.toElement = props.toElement;
    if (props.items instanceof _ref__WEBPACK_IMPORTED_MODULE_0__.RefArray) {
      for (const item of props.items.values) {
        this.onAdd(item);
      }
      props.items.addObserver({
        onAdd: value => this.onAdd(value),
        onRemove: (value, index) => this.onRemove(value, index),
        onInsert: (value, index) => this.onInsert(value, index),
        onReplace: (index, value) => this.onReplace(index, value),
        onAddAll: values => this.onAddAll(values),
        onRemoveAll: values => this.onRemoveAll(values)
      });
    }
  }
  onUpdate(values) {}
  onReplace(index, value) {
    const child = this.node.children[index];
    if (child) {
      child.replaceWith(this.toElement(value).node);
    }
  }
  onAdd(value) {
    this.node.appendChild(this.toElement(value).node);
  }
  onRemove(value, index) {
    const child = this.node.children[index];
    if (child) {
      this.node.removeChild(child);
    }
  }
  onInsert(value, index) {
    const child = this.node.children[index];
    if (child) {
      this.node.insertBefore(this.toElement(value).node, child);
    }
  }
  onAddAll(values) {
    for (const value in values) {
      this.onAdd(value);
    }
  }
  onRemoveAll(values) {}
}

/***/ }),

/***/ "./src/nui/ref.js":
/*!************************!*\
  !*** ./src/nui/ref.js ***!
  \************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Ref: function() { return /* binding */ Ref; },
/* harmony export */   RefArray: function() { return /* binding */ RefArray; },
/* harmony export */   RefArrayObserver: function() { return /* binding */ RefArrayObserver; },
/* harmony export */   RefArrayObserverLogger: function() { return /* binding */ RefArrayObserverLogger; },
/* harmony export */   ref: function() { return /* binding */ ref; },
/* harmony export */   refArray: function() { return /* binding */ refArray; }
/* harmony export */ });
class Ref {
  constructor(value) {
    this._value = value;
    this.observers = [];
  }
  addObserver(observer) {
    this.observers.push(observer);
  }
  removeObserver(observer) {
    this.observers.pop(observer);
  }
  set value(value) {
    const oldValue = this._value;
    this._value = value;
    for (const observer of this.observers) {
      observer(value, oldValue);
    }
  }
  get value() {
    return this._value;
  }
  get observerCount() {
    return this.observers.length;
  }
  static getValue(pRef) {
    if (pRef instanceof Ref) return pRef.value;else return pRef;
  }
}
class RefArray {
  constructor() {
    this._values = [];
    for (var _len = arguments.length, values = new Array(_len), _key = 0; _key < _len; _key++) {
      values[_key] = arguments[_key];
    }
    for (const value of values) this._values.push(value);
    this.observers = [];
  }
  addObserver(observer) {
    this.observers.push(observer);
  }
  removeObserver(observer) {
    this.observers.pop(observer);
  }
  callObservers(event, onFun) {
    for (const observer of this.observers) {
      const fun = observer[event];
      if (fun) {
        onFun(fun);
      }
    }
  }
  callAdd(value) {
    this.callObservers('onAdd', fun => fun(value));
  }
  callRemove(value, index) {
    this.callObservers('onRemove', fun => fun(value, index));
  }
  callInsert(value, index) {
    this.callObservers('onInsert', fun => fun(value, index));
  }
  callReplace(index, value) {
    this.callObservers('onReplace', fun => fun(index, value));
  }
  callUpdate() {
    this.callObservers('onUpdate', fun => fun(this._values));
  }
  replaceValue(index, value) {
    this._values.splice(index, 1, value);
    this.callReplace(index, value);
    this.callUpdate();
  }

  /**
   * replaces the first value which matches with `obj` with `value` 
   * 
   * @param {*} obj 
   * @param {*} value 
   */
  replaceValueMatching(obj, value) {
    this.replaceValueFor(v => {
      for (const [key, va] of Object.entries(obj)) {
        if (v[key] != va) {
          return false;
        }
      }
      return true;
    }, value);
  }

  /**
   * 
   * @param {function} condition 
   * @param {*} value 
   */
  replaceValueFor(condition, value) {
    this.replaceValue(this.findIndex(condition), value);
  }

  /**
   * 
   * @param {function} condition 
   * @param {*} defaultValue 
   */
  findIndex(condition, defaultValue) {
    return this._values.findIndex(condition, defaultValue);
  }

  /**
   * 
   * @param {function} condition 
   */
  find(condition) {
    return this._values.find(condition);
  }
  addValue(value) {
    this._values.push(value);
    this.callAdd(value);
    this.callUpdate();
  }
  add() {
    for (var _len2 = arguments.length, values = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      values[_key2] = arguments[_key2];
    }
    for (const value of values) {
      this.addValue(value);
    }
  }
  addAll(values) {
    for (const value of values) {
      this.addValue(value);
    }
  }
  remove(value) {
    const index = this._values.indexOf(value);
    this.removeIndex(index);
  }
  removeIndex(index) {
    const len = this._values.length;
    if (index >= len || index < 0) return;
    const value = this._values.splice(index, 1)[0];
    this.callRemove(value, index);
    this.callUpdate();
  }
  removeLast() {
    this.removeIndex(this._values.length - 1);
  }
  insert(value, index) {
    this._values.splice(index, 0, value);
    this.callInsert(value, index);
    this.callUpdate();
  }
  set values(values) {
    this._values = values;
    this.callUpdate();
  }
  get values() {
    return this._values;
  }
  get observerCount() {
    return this.observers.length;
  }
}
class RefArrayObserver {
  onUpdate(values) {}
  onAdd(value) {}
  onRemove(value, index) {}
  onInsert(value, index) {}
  onAddAll(values) {}
  onRemoveAll(values) {}
}
class RefArrayObserverLogger extends RefArrayObserver {
  onUpdate(values) {
    console.log("onUpdate: " + values);
  }
  onAdd(value) {
    console.log("onAdd: " + value);
  }
  onRemove(value) {
    console.log("onRemove: " + value);
  }
  onAddAll(values) {
    console.log("onAddAll: " + values);
  }
  onRemoveAll(values) {
    console.log("onRemoveAll: " + values);
  }
}
const refArray = function () {
  for (var _len3 = arguments.length, values = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    values[_key3] = arguments[_key3];
  }
  return new RefArray(...values);
};
const ref = value => new Ref(value);

/***/ }),

/***/ "./src/nui/style.js":
/*!**************************!*\
  !*** ./src/nui/style.js ***!
  \**************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Color: function() { return /* binding */ Color; },
/* harmony export */   Icon: function() { return /* binding */ Icon; },
/* harmony export */   Style: function() { return /* binding */ Style; }
/* harmony export */ });
const Color = {
  TextColor: 'var(--text-color)',
  BgColor: 'var(--bg-color)',
  CardColor: 'var(--card-color)',
  BorderColor: 'var(--border-color)',
  DescriptionColor: 'var(--description-color)',
  FileColor: 'var(--file-color)',
  HoveredFileColor: 'var(--hovered-file-color)',
  FileInnerColor: 'var(--file-inner-color)'
};
const Style = {
  CardBg: {
    backgroundColor: Color.CardColor
  },
  EmptyBg: {
    backgroundColor: ''
  },
  BorderRadius: br => {
    return {
      borderRadius: br
    };
  },
  Size: s => {
    return {
      height: s,
      width: s
    };
  },
  Height: h => {
    return {
      height: h
    };
  },
  Width: w => {
    return {
      width: w
    };
  },
  Pointer: {
    cursor: 'pointer'
  },
  Padding: p => {
    return {
      padding: p
    };
  },
  Margin: m => {
    return {
      margin: m
    };
  },
  TextColor: {
    color: Color.TextColor
  },
  Row: {
    display: 'flex',
    flexDirection: 'row'
  },
  Column: {
    display: 'flex',
    flexDirection: 'column'
  },
  Border: {
    borderWidth: '1px',
    borderColor: Color.BorderColor,
    borderStyle: 'solid'
  }
};
const Icon = {
  icons: {
    sun: '<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 12.6364C11.0083 12.6364 12.6364 11.0083 12.6364 9.00001C12.6364 6.9917 11.0083 5.36365 9 5.36365C6.9917 5.36365 5.36364 6.9917 5.36364 9.00001C5.36364 11.0083 6.9917 12.6364 9 12.6364Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 1V2.45455" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 15.5455V17" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M3.34182 3.3418L4.37455 4.37452" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M13.6255 13.6254L14.6582 14.6582" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M1 9H2.45455" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M15.5455 9H17" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M3.34182 14.6582L4.37455 13.6254" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M13.6255 4.37452L14.6582 3.3418" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    moon: '<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17 9.72072C16.8599 11.237 16.2908 12.682 15.3594 13.8867C14.428 15.0914 13.1728 16.0059 11.7406 16.5232C10.3084 17.0405 8.7585 17.1392 7.27225 16.8078C5.786 16.4764 4.42487 15.7286 3.34813 14.6519C2.27138 13.5751 1.52356 12.214 1.19216 10.7277C0.860763 9.2415 0.959498 7.6916 1.47681 6.25942C1.99413 4.82724 2.90862 3.572 4.1133 2.64059C5.31797 1.70918 6.76299 1.14012 8.27928 1C7.39154 2.20101 6.96435 3.68075 7.07542 5.1701C7.18648 6.65945 7.82842 8.05947 8.88447 9.11553C9.94053 10.1716 11.3405 10.8135 12.8299 10.9246C14.3192 11.0356 15.799 10.6085 17 9.72072Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    settings: '<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.99999 11.1818C10.205 11.1818 11.1818 10.205 11.1818 8.99999C11.1818 7.79501 10.205 6.81818 8.99999 6.81818C7.79501 6.81818 6.81818 7.79501 6.81818 8.99999C6.81818 10.205 7.79501 11.1818 8.99999 11.1818Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M14.3818 11.1818C14.285 11.4012 14.2561 11.6445 14.2989 11.8804C14.3417 12.1164 14.4542 12.3341 14.6218 12.5055L14.6655 12.5491C14.8007 12.6842 14.908 12.8446 14.9812 13.0212C15.0544 13.1978 15.0921 13.387 15.0921 13.5782C15.0921 13.7693 15.0544 13.9586 14.9812 14.1352C14.908 14.3118 14.8007 14.4722 14.6655 14.6073C14.5304 14.7425 14.3699 14.8498 14.1934 14.923C14.0168 14.9962 13.8275 15.0339 13.6364 15.0339C13.4452 15.0339 13.2559 14.9962 13.0794 14.923C12.9028 14.8498 12.7424 14.7425 12.6073 14.6073L12.5636 14.5636C12.3922 14.396 12.1745 14.2835 11.9386 14.2407C11.7027 14.1979 11.4594 14.2268 11.24 14.3236C11.0249 14.4158 10.8414 14.5689 10.7122 14.764C10.583 14.9591 10.5137 15.1878 10.5127 15.4218V15.5455C10.5127 15.9312 10.3595 16.3012 10.0867 16.574C9.81392 16.8468 9.44395 17 9.05818 17C8.67241 17 8.30244 16.8468 8.02966 16.574C7.75688 16.3012 7.60364 15.9312 7.60364 15.5455V15.48C7.59801 15.2393 7.52009 15.0058 7.38001 14.81C7.23993 14.6141 7.04417 14.4649 6.81818 14.3818C6.59882 14.285 6.3555 14.2561 6.11957 14.2989C5.88365 14.3417 5.66595 14.4542 5.49455 14.6218L5.45091 14.6655C5.31582 14.8007 5.1554 14.908 4.97882 14.9812C4.80224 15.0544 4.61297 15.0921 4.42182 15.0921C4.23067 15.0921 4.04139 15.0544 3.86481 14.9812C3.68824 14.908 3.52782 14.8007 3.39273 14.6655C3.25749 14.5304 3.1502 14.3699 3.077 14.1934C3.00381 14.0168 2.96613 13.8275 2.96613 13.6364C2.96613 13.4452 3.00381 13.2559 3.077 13.0794C3.1502 12.9028 3.25749 12.7424 3.39273 12.6073L3.43636 12.5636C3.60403 12.3922 3.7165 12.1745 3.75928 11.9386C3.80205 11.7027 3.77317 11.4594 3.67636 11.24C3.58417 11.0249 3.43109 10.8414 3.23597 10.7122C3.04085 10.583 2.81221 10.5137 2.57818 10.5127H2.45455C2.06878 10.5127 1.69881 10.3595 1.42603 10.0867C1.15325 9.81392 1 9.44395 1 9.05818C1 8.67241 1.15325 8.30244 1.42603 8.02966C1.69881 7.75688 2.06878 7.60364 2.45455 7.60364H2.52C2.76072 7.59801 2.99419 7.52009 3.19004 7.38001C3.38589 7.23993 3.53507 7.04417 3.61818 6.81818C3.71499 6.59882 3.74387 6.3555 3.70109 6.11957C3.65832 5.88365 3.54585 5.66595 3.37818 5.49455L3.33455 5.45091C3.19931 5.31582 3.09202 5.1554 3.01882 4.97882C2.94562 4.80224 2.90795 4.61297 2.90795 4.42182C2.90795 4.23067 2.94562 4.04139 3.01882 3.86481C3.09202 3.68824 3.19931 3.52782 3.33455 3.39273C3.46963 3.25749 3.63005 3.1502 3.80663 3.077C3.98321 3.00381 4.17249 2.96613 4.36364 2.96613C4.55479 2.96613 4.74406 3.00381 4.92064 3.077C5.09722 3.1502 5.25764 3.25749 5.39273 3.39273L5.43636 3.43636C5.60777 3.60403 5.82547 3.7165 6.06139 3.75928C6.29731 3.80205 6.54064 3.77317 6.76 3.67636H6.81818C7.03329 3.58417 7.21674 3.43109 7.34596 3.23597C7.47518 3.04085 7.54452 2.81221 7.54545 2.57818V2.45455C7.54545 2.06878 7.6987 1.69881 7.97148 1.42603C8.24426 1.15325 8.61423 1 9 1C9.38577 1 9.75574 1.15325 10.0285 1.42603C10.3013 1.69881 10.4545 2.06878 10.4545 2.45455V2.52C10.4555 2.75403 10.5248 2.98267 10.654 3.17779C10.7833 3.37291 10.9667 3.52599 11.1818 3.61818C11.4012 3.71499 11.6445 3.74387 11.8804 3.70109C12.1164 3.65832 12.3341 3.54585 12.5055 3.37818L12.5491 3.33455C12.6842 3.19931 12.8446 3.09202 13.0212 3.01882C13.1978 2.94562 13.387 2.90795 13.5782 2.90795C13.7693 2.90795 13.9586 2.94562 14.1352 3.01882C14.3118 3.09202 14.4722 3.19931 14.6073 3.33455C14.7425 3.46963 14.8498 3.63005 14.923 3.80663C14.9962 3.98321 15.0339 4.17249 15.0339 4.36364C15.0339 4.55479 14.9962 4.74406 14.923 4.92064C14.8498 5.09722 14.7425 5.25764 14.6073 5.39273L14.5636 5.43636C14.396 5.60777 14.2835 5.82547 14.2407 6.06139C14.1979 6.29731 14.2268 6.54064 14.3236 6.76V6.81818C14.4158 7.03329 14.5689 7.21674 14.764 7.34596C14.9591 7.47518 15.1878 7.54452 15.4218 7.54545H15.5455C15.9312 7.54545 16.3012 7.6987 16.574 7.97148C16.8468 8.24426 17 8.61423 17 9C17 9.38577 16.8468 9.75574 16.574 10.0285C16.3012 10.3013 15.9312 10.4545 15.5455 10.4545H15.48C15.246 10.4555 15.0173 10.5248 14.8222 10.654C14.6271 10.7833 14.474 10.9667 14.3818 11.1818Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    moreVertical: '<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 9.75C9.41421 9.75 9.75 9.41421 9.75 9C9.75 8.58579 9.41421 8.25 9 8.25C8.58579 8.25 8.25 8.58579 8.25 9C8.25 9.41421 8.58579 9.75 9 9.75Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 4.5C9.41421 4.5 9.75 4.16421 9.75 3.75C9.75 3.33579 9.41421 3 9 3C8.58579 3 8.25 3.33579 8.25 3.75C8.25 4.16421 8.58579 4.5 9 4.5Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 15C9.41421 15 9.75 14.6642 9.75 14.25C9.75 13.8358 9.41421 13.5 9 13.5C8.58579 13.5 8.25 13.8358 8.25 14.25C8.25 14.6642 8.58579 15 9 15Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    refresh: '<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17 2.72552V7.08916H12.6364" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M1 14.3619V9.99829H5.36364" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M2.82545 6.36192C3.1943 5.31958 3.82119 4.38766 4.64761 3.65313C5.47404 2.91859 6.47307 2.40538 7.55148 2.16138C8.6299 1.91737 9.75255 1.95053 10.8147 2.25775C11.8768 2.56497 12.8438 3.13625 13.6255 3.91828L17 7.08919M1 9.99828L4.37455 13.1692C5.15618 13.9512 6.12318 14.5225 7.18532 14.8297C8.24745 15.1369 9.3701 15.1701 10.4485 14.9261C11.5269 14.6821 12.526 14.1689 13.3524 13.4343C14.1788 12.6998 14.8057 11.7679 15.1745 10.7256" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    search: '<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.1111 15.2222C12.0385 15.2222 15.2222 12.0385 15.2222 8.1111C15.2222 4.18375 12.0385 1 8.1111 1C4.18375 1 1 4.18375 1 8.1111C1 12.0385 4.18375 15.2222 8.1111 15.2222Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M17 17L13.1333 13.1334" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>'
  },
  strokeWidth: '1',
  set: async (iconName, element) => {
    let icon = Icon.icons[iconName];
    if (icon) {
      Icon.setIcon(icon, element);
      return;
    }
    const svg = await Icon.getTextAwait(iconName);
    Icon.icons[iconName] = svg.replaceAll('stroke="white"', 'stroke="var(--text-color)"');
    // Icon.readSvg(
    //     iconName,
    //     (svg) => {
    Icon.setIcon(svg, element);
    //     }
    // )
  },
  readSvg: (name, onRead) => {
    Icon.getText(name, svg => {
      const i = svg.replaceAll('white', 'var(--text-color)');
      // .replaceAll('stroke-width="1.5"', `stroke-width="${Icon.strokeWidth}"`)
      // .replace(/(?:\r\n|\r|\n)/g, '')
      Icon.icons[name] = i;
      if (onRead) {
        onRead(i);
      }
    });
  },
  initIcons: () => {
    for (const [key, value] of Object.entries(Icon.icons)) {
      Icon.icons[key] = value.replaceAll('stroke="white"', 'stroke="var(--text-color)"');
    }
  },
  init: async () => {
    for (const name of Icon.names) {
      const svg = await Icon.getTextAwait(name);
      Icon.icons[name] = svg.replaceAll('white', 'var(--text-color)');
    }
  },
  setIcon: (icon, element) => {
    if (element instanceof SvgIcon) {
      element.content({
        svg: icon
      });
    }
  },
  getTextAwait: async iconName => {
    const response = await fetch("images/" + iconName + ".svg", {
      cache: 'default',
      priority: 'high'
    });
    const text = await response.text();
    return text;
  },
  getText: (iconName, onRes) => {
    fetch("images/" + iconName + ".svg", {
      cache: 'default'
    }).then(res => res.text()).then(onRes).catch(e => console.error(e));
  }
};
Icon.initIcons();

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
!function() {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _nui_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./nui/components */ "./src/nui/components.js");
/* harmony import */ var _home_home__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./home/home */ "./src/home/home.js");


const body = document.getElementsByTagName('body')[0];
const mainNav = new _nui_components__WEBPACK_IMPORTED_MODULE_0__.Nav(body);
mainNav.screen = new _home_home__WEBPACK_IMPORTED_MODULE_1__["default"]();
}();
/******/ })()
;
//# sourceMappingURL=bundle.js.map