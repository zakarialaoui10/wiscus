/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/CommentsSections.js"
/*!********************************************!*\
  !*** ./src/components/CommentsSections.js ***!
  \********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CommentsSection: () => (/* binding */ CommentsSection)
/* harmony export */ });
/* harmony import */ var ziko_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ziko/dom */ "./node_modules/ziko/src/dom/index.js");

const {
  script
} = ziko_dom__WEBPACK_IMPORTED_MODULE_0__.tags;
function CommentsSection() {
  const sc = script({
    src: "https://giscus.app/client.js",
    crossorigin: 'anonymous',
    async: true,
    'data-engine': 'zikojs'
  });
  return sc;
  // removed by dead control flow

}

/***/ },

/***/ "./node_modules/ziko/src/__ziko__/__cache__.js"
/*!*****************************************************!*\
  !*** ./node_modules/ziko/src/__ziko__/__cache__.js ***!
  \*****************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   __CACHE__: () => (/* binding */ __CACHE__)
/* harmony export */ });
const __CACHE__ = {
    ui_index : 0,
    get_ui_index:function(){
        return this.ui_index ++
    },
    register_ui: function(UIElement){
        
    }
}

/***/ },

/***/ "./node_modules/ziko/src/__ziko__/__config__.js"
/*!******************************************************!*\
  !*** ./node_modules/ziko/src/__ziko__/__config__.js ***!
  \******************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   __Config__: () => (/* binding */ __Config__)
/* harmony export */ });
const __Config__ = {
    default:{
        target:null,
        render:true,
        math:{
            mode:"deg"
        }
    },
    setDefault:function(pairs){
        const keys=Object.keys(pairs);
        const values=Object.values(pairs);
        for(let i=0; i<keys.length; i++) this.default[keys[i]]=values[i];
    },
    init:()=>{
        // document.documentElement.setAttribute("data-engine","zikojs")
    },
    renderingMode :"spa",
    isSSC : false,
}

/***/ },

/***/ "./node_modules/ziko/src/__ziko__/__hydration__.js"
/*!*********************************************************!*\
  !*** ./node_modules/ziko/src/__ziko__/__hydration__.js ***!
  \*********************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   __HYDRATION__: () => (/* binding */ __HYDRATION__)
/* harmony export */ });
const __HYDRATION__ = {
    store : new Map(),
    index : 0,
    register: function(component){
        this.store.set(this.index++ , component)
    },
    reset(){
        this.index = 0;
        this.store.clear()
    }
    
}

/***/ },

/***/ "./node_modules/ziko/src/__ziko__/__state__.js"
/*!*****************************************************!*\
  !*** ./node_modules/ziko/src/__ziko__/__state__.js ***!
  \*****************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   __State__: () => (/* binding */ __State__)
/* harmony export */ });
/* harmony import */ var _hooks_use_storage_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../hooks/use-storage.js */ "./node_modules/ziko/src/hooks/use-storage.js");

var __State__ = {
    store : new Map(),
    index : 0,
    session_storage : null,
    register: function(state){
        if(!undefined && undefined){
            if(!this.session) this.session_storage = (0,_hooks_use_storage_js__WEBPACK_IMPORTED_MODULE_0__.useSessionStorage)('ziko-state', {})
            const savedValue = this.session_storage.get(this.index)
            if(!savedValue) this.session_storage.add({[this.index] : state.value});
            else state.value = savedValue
        }
        this.store.set(this.index++, state)
    },
    update: function(index, value){
       if(!undefined && undefined){
            this.session_storage.add({[index] : value})
        } 
    },

}


/***/ },

/***/ "./node_modules/ziko/src/__ziko__/__ui__.js"
/*!**************************************************!*\
  !*** ./node_modules/ziko/src/__ziko__/__ui__.js ***!
  \**************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UIStore: () => (/* binding */ UIStore),
/* harmony export */   __UI__: () => (/* binding */ __UI__)
/* harmony export */ });
class UIStore extends Array {
    constructor(...args) {
        super(...args); 
    }
    clear(){
        this.length = 0;
        return this;
    }
    getItemById(id) {
        return this.find(n => n.element.id === id);
    }
    getItemsByTagName(tag) {
        return this.filter(n => n.element.tagName.toLowerCase() === tag.toLowerCase());
    }
    getElementsByClassName(className) {
        return this.filter(n => n.element.classList?.contains(className));
    }
    querySelector(selector) {
        const el = globalThis?.document?.querySelector(selector);
        if (!el) return null;
        return this.find(ui => ui.element === el) || null;
    }
    querySelectorAll(selector) {
        const els = globalThis?.document?.querySelectorAll(selector);
        return Array.from(els)
            .map(el => this.find(ui => ui.element === el))
            .filter(Boolean);
    }
}

// create the singleton
const __UI__ = new UIStore();


/***/ },

/***/ "./node_modules/ziko/src/__ziko__/index.js"
/*!*************************************************!*\
  !*** ./node_modules/ziko/src/__ziko__/index.js ***!
  \*************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UIStore: () => (/* reexport safe */ _ui_js__WEBPACK_IMPORTED_MODULE_1__.UIStore),
/* harmony export */   __init__global__: () => (/* binding */ __init__global__)
/* harmony export */ });
/* harmony import */ var _params_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./params.js */ "./node_modules/ziko/src/__ziko__/params.js");
/* harmony import */ var _ui_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./__ui__.js */ "./node_modules/ziko/src/__ziko__/__ui__.js");
/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./__config__.js */ "./node_modules/ziko/src/__ziko__/__config__.js");
/* harmony import */ var _hydration_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./__hydration__.js */ "./node_modules/ziko/src/__ziko__/__hydration__.js");
/* harmony import */ var _cache_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./__cache__.js */ "./node_modules/ziko/src/__ziko__/__cache__.js");
/* harmony import */ var _state_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./__state__.js */ "./node_modules/ziko/src/__ziko__/__state__.js");






function __init__global__(){
    if ( !globalThis?.__Ziko__ ){
        globalThis.__Ziko__ = {
                    __UI__: _ui_js__WEBPACK_IMPORTED_MODULE_1__.__UI__,
                    __HYDRATION__: _hydration_js__WEBPACK_IMPORTED_MODULE_3__.__HYDRATION__,
                    __State__: _state_js__WEBPACK_IMPORTED_MODULE_5__.__State__,
                    __Config__: _config_js__WEBPACK_IMPORTED_MODULE_2__.__Config__,
                    __CACHE__: _cache_js__WEBPACK_IMPORTED_MODULE_4__.__CACHE__,
                    __PROVIDERS__: {}
                };
        (0,_params_js__WEBPACK_IMPORTED_MODULE_0__.defineParamsGetter)(__Ziko__)
    }
}



/***/ },

/***/ "./node_modules/ziko/src/__ziko__/params.js"
/*!**************************************************!*\
  !*** ./node_modules/ziko/src/__ziko__/params.js ***!
  \**************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   defineParamsGetter: () => (/* binding */ defineParamsGetter)
/* harmony export */ });
function parseQueryParams(queryString) {
    const params = {};
    queryString.replace(/[A-Z0-9]+?=([\w|:|\/\.]*)/gi, (match) => {
        const [key, value] = match.split('=');
        params[key] = value;
    });
    return params;
}

function defineParamsGetter(target ){
    Object.defineProperties(target, {
        'QueryParams': {
            get: function() {
                return parseQueryParams(globalThis.location.search.substring(1));
            },
            configurable: false,
            enumerable: true 
        },
        'HashParams': {
            get: function() {
                const hash = globalThis.location.hash.substring(1);
                return hash.split("#");
            },
            configurable: false,
            enumerable: true 
        }
    });
}


/*

  /users?name=ziko&age=26
  /users#name=ziko

*/



/***/ },

/***/ "./node_modules/ziko/src/data/string/checkers.js"
/*!*******************************************************!*\
  !*** ./node_modules/ziko/src/data/string/checkers.js ***!
  \*******************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   is_anagram: () => (/* binding */ is_anagram),
/* harmony export */   is_camelcase: () => (/* binding */ is_camelcase),
/* harmony export */   is_hyphencase: () => (/* binding */ is_hyphencase),
/* harmony export */   is_isogram: () => (/* binding */ is_isogram),
/* harmony export */   is_palindrome: () => (/* binding */ is_palindrome),
/* harmony export */   is_pascalcalse: () => (/* binding */ is_pascalcalse),
/* harmony export */   is_snakeCase: () => (/* binding */ is_snakeCase)
/* harmony export */ });
const is_camelcase = (text = '') =>{
    if (text.length === 0) return false; 
    const camelCasePattern = /^[a-z][a-zA-Z0-9]*$/;
    return camelCasePattern.test(text);
}
const is_hyphencase = (text = '') => text.split('-').length > 0;
const is_snakeCase = (text = '') => text.split('_').length > 0;
const is_pascalcalse = (text = '') => {
    if (text.length === 0) return false;
    const PascalCasePattern = /^[A-Z][a-zA-Z0-9]*$/;
    return PascalCasePattern.test(text);
}

const is_palindrome = text =>{
    const str = text.toLocaleLowerCase();
    let l = str.length,i;
    for(i=0;i<l/2;i++)if(str[i]!=str[l-i-1])return false;
    return true;
}

const is_anagram = (word, words) =>{
        word=word.split("").sort();
        words=words.split("").sort();
        return JSON.stringify(word)===JSON.stringify(words);    
}

const is_isogram = (text = '') => [...new Set(text.toLowerCase())].length === text.length;

/***/ },

/***/ "./node_modules/ziko/src/data/string/converters.js"
/*!*********************************************************!*\
  !*** ./node_modules/ziko/src/data/string/converters.js ***!
  \*********************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   camel2constantcase: () => (/* binding */ camel2constantcase),
/* harmony export */   camel2hyphencase: () => (/* binding */ camel2hyphencase),
/* harmony export */   camel2pascalcase: () => (/* binding */ camel2pascalcase),
/* harmony export */   camel2snakecase: () => (/* binding */ camel2snakecase),
/* harmony export */   constant2camelcase: () => (/* binding */ constant2camelcase),
/* harmony export */   constant2hyphencase: () => (/* binding */ constant2hyphencase),
/* harmony export */   constant2pascalcase: () => (/* binding */ constant2pascalcase),
/* harmony export */   constant2snakecase: () => (/* binding */ constant2snakecase),
/* harmony export */   hyphen2camelcase: () => (/* binding */ hyphen2camelcase),
/* harmony export */   hyphen2constantcase: () => (/* binding */ hyphen2constantcase),
/* harmony export */   hyphen2pascalcase: () => (/* binding */ hyphen2pascalcase),
/* harmony export */   hyphen2snakecase: () => (/* binding */ hyphen2snakecase),
/* harmony export */   pascal2camelcase: () => (/* binding */ pascal2camelcase),
/* harmony export */   pascal2constantcase: () => (/* binding */ pascal2constantcase),
/* harmony export */   pascal2hyphencase: () => (/* binding */ pascal2hyphencase),
/* harmony export */   pascal2snakecase: () => (/* binding */ pascal2snakecase),
/* harmony export */   snake2camelcase: () => (/* binding */ snake2camelcase),
/* harmony export */   snake2constantcase: () => (/* binding */ snake2constantcase),
/* harmony export */   snake2hyphencase: () => (/* binding */ snake2hyphencase),
/* harmony export */   snake2pascalcase: () => (/* binding */ snake2pascalcase)
/* harmony export */ });
const camel2hyphencase = (text = '') => text.replace(/[A-Z]/g, match => '-' + match.toLowerCase());
const camel2snakecase = (text = '') => text.replace(/[A-Z]/g, match => '_' + match.toLowerCase());
const camel2pascalcase = (text = '') => text.charAt(0).toUpperCase() + text.slice(1);
const camel2constantcase = (text = '') => text.replace(/[A-Z]/g, match => '_' + match).toUpperCase();

const pascal2snakecase = (text = '') => text.replace(/([A-Z])/g, (match, offset) => offset ? '_' + match.toLowerCase() : match.toLowerCase());
const pascal2hyphencase = (text = '') => text.replace(/([A-Z])/g, (match, offset) => offset ? '-' + match.toLowerCase() : match.toLowerCase());
const pascal2camelcase = (text = '') => text.charAt(0).toLowerCase() + text.slice(1);
const pascal2constantcase = (text = '') => text.replace(/([A-Z])/g, (match, offset) => offset ? '_' + match : match).toUpperCase();

const snake2camelcase = (text = '') => text.replace(/(_\w)/g, match => match[1].toUpperCase());
const snake2hyphencase = (text = '') => text.replace(/_/g, "-");
const snake2pascalcase = (text = '') => text.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('');
const snake2constantcase = (text = '') => text.toUpperCase();

const hyphen2camelcase = (text = '') => text.replace(/-([a-z])/g, match => match[1].toUpperCase());
const hyphen2snakecase = (text = '') => text.replace(/-/g, '_');
const hyphen2pascalcase = (text = '') => text.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('');
const hyphen2constantcase = (text = '') => text.replace(/-/g, '_').toUpperCase();

const constant2camelcase = (text = '') => text.toLowerCase().replace(/_([a-z])/g, match => match[1].toUpperCase());
const constant2snakecase = (text = '') => text.toLowerCase();
const constant2pascalcase = (text = '') => text.toLowerCase().split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('');
const constant2hyphencase = (text = '') => text.toLowerCase().replace(/_/g, '-');

/***/ },

/***/ "./node_modules/ziko/src/data/string/index.js"
/*!****************************************************!*\
  !*** ./node_modules/ziko/src/data/string/index.js ***!
  \****************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   camel2constantcase: () => (/* reexport safe */ _converters_js__WEBPACK_IMPORTED_MODULE_0__.camel2constantcase),
/* harmony export */   camel2hyphencase: () => (/* reexport safe */ _converters_js__WEBPACK_IMPORTED_MODULE_0__.camel2hyphencase),
/* harmony export */   camel2pascalcase: () => (/* reexport safe */ _converters_js__WEBPACK_IMPORTED_MODULE_0__.camel2pascalcase),
/* harmony export */   camel2snakecase: () => (/* reexport safe */ _converters_js__WEBPACK_IMPORTED_MODULE_0__.camel2snakecase),
/* harmony export */   constant2camelcase: () => (/* reexport safe */ _converters_js__WEBPACK_IMPORTED_MODULE_0__.constant2camelcase),
/* harmony export */   constant2hyphencase: () => (/* reexport safe */ _converters_js__WEBPACK_IMPORTED_MODULE_0__.constant2hyphencase),
/* harmony export */   constant2pascalcase: () => (/* reexport safe */ _converters_js__WEBPACK_IMPORTED_MODULE_0__.constant2pascalcase),
/* harmony export */   constant2snakecase: () => (/* reexport safe */ _converters_js__WEBPACK_IMPORTED_MODULE_0__.constant2snakecase),
/* harmony export */   hyphen2camelcase: () => (/* reexport safe */ _converters_js__WEBPACK_IMPORTED_MODULE_0__.hyphen2camelcase),
/* harmony export */   hyphen2constantcase: () => (/* reexport safe */ _converters_js__WEBPACK_IMPORTED_MODULE_0__.hyphen2constantcase),
/* harmony export */   hyphen2pascalcase: () => (/* reexport safe */ _converters_js__WEBPACK_IMPORTED_MODULE_0__.hyphen2pascalcase),
/* harmony export */   hyphen2snakecase: () => (/* reexport safe */ _converters_js__WEBPACK_IMPORTED_MODULE_0__.hyphen2snakecase),
/* harmony export */   is_anagram: () => (/* reexport safe */ _checkers_js__WEBPACK_IMPORTED_MODULE_1__.is_anagram),
/* harmony export */   is_camelcase: () => (/* reexport safe */ _checkers_js__WEBPACK_IMPORTED_MODULE_1__.is_camelcase),
/* harmony export */   is_hyphencase: () => (/* reexport safe */ _checkers_js__WEBPACK_IMPORTED_MODULE_1__.is_hyphencase),
/* harmony export */   is_isogram: () => (/* reexport safe */ _checkers_js__WEBPACK_IMPORTED_MODULE_1__.is_isogram),
/* harmony export */   is_palindrome: () => (/* reexport safe */ _checkers_js__WEBPACK_IMPORTED_MODULE_1__.is_palindrome),
/* harmony export */   is_pascalcalse: () => (/* reexport safe */ _checkers_js__WEBPACK_IMPORTED_MODULE_1__.is_pascalcalse),
/* harmony export */   is_snakeCase: () => (/* reexport safe */ _checkers_js__WEBPACK_IMPORTED_MODULE_1__.is_snakeCase),
/* harmony export */   pascal2camelcase: () => (/* reexport safe */ _converters_js__WEBPACK_IMPORTED_MODULE_0__.pascal2camelcase),
/* harmony export */   pascal2constantcase: () => (/* reexport safe */ _converters_js__WEBPACK_IMPORTED_MODULE_0__.pascal2constantcase),
/* harmony export */   pascal2hyphencase: () => (/* reexport safe */ _converters_js__WEBPACK_IMPORTED_MODULE_0__.pascal2hyphencase),
/* harmony export */   pascal2snakecase: () => (/* reexport safe */ _converters_js__WEBPACK_IMPORTED_MODULE_0__.pascal2snakecase),
/* harmony export */   snake2camelcase: () => (/* reexport safe */ _converters_js__WEBPACK_IMPORTED_MODULE_0__.snake2camelcase),
/* harmony export */   snake2constantcase: () => (/* reexport safe */ _converters_js__WEBPACK_IMPORTED_MODULE_0__.snake2constantcase),
/* harmony export */   snake2hyphencase: () => (/* reexport safe */ _converters_js__WEBPACK_IMPORTED_MODULE_0__.snake2hyphencase),
/* harmony export */   snake2pascalcase: () => (/* reexport safe */ _converters_js__WEBPACK_IMPORTED_MODULE_0__.snake2pascalcase)
/* harmony export */ });
/* harmony import */ var _converters_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./converters.js */ "./node_modules/ziko/src/data/string/converters.js");
/* harmony import */ var _checkers_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./checkers.js */ "./node_modules/ziko/src/data/string/checkers.js");



/***/ },

/***/ "./node_modules/ziko/src/dom/constructors/UIElement.js"
/*!*************************************************************!*\
  !*** ./node_modules/ziko/src/dom/constructors/UIElement.js ***!
  \*************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UIElement: () => (/* binding */ UIElement)
/* harmony export */ });
/* harmony import */ var _UIElementCore_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UIElementCore.js */ "./node_modules/ziko/src/dom/constructors/UIElementCore.js");
/* harmony import */ var _helpers_register_register_to_class_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../helpers/register/register-to-class.js */ "./node_modules/ziko/src/helpers/register/register-to-class.js");
/* harmony import */ var _mixins_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mixins/index.js */ "./node_modules/ziko/src/dom/constructors/mixins/index.js");
/* harmony import */ var _events_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../events/index.js */ "./node_modules/ziko/src/events/index.js");





class UIElement extends _UIElementCore_js__WEBPACK_IMPORTED_MODULE_0__.UIElementCore{
  constructor({element, name ='', type='html', render = __Ziko__.__Config__.default.render}={}){
    super()
    this.exp = {
      events : {

      }
    }
    ;(0,_helpers_register_register_to_class_js__WEBPACK_IMPORTED_MODULE_1__.register_to_class)(
      this, 
      _mixins_index_js__WEBPACK_IMPORTED_MODULE_2__.LifecycleMethods,
      _mixins_index_js__WEBPACK_IMPORTED_MODULE_2__.AttrsMethods, 
      _mixins_index_js__WEBPACK_IMPORTED_MODULE_2__.DomMethods, 
      _mixins_index_js__WEBPACK_IMPORTED_MODULE_2__.StyleMethods,
      _mixins_index_js__WEBPACK_IMPORTED_MODULE_2__.IndexingMethods,
      _events_index_js__WEBPACK_IMPORTED_MODULE_3__.PtrListeners,
      _events_index_js__WEBPACK_IMPORTED_MODULE_3__.ClickListeners,
      _events_index_js__WEBPACK_IMPORTED_MODULE_3__.KeyListeners,
      _events_index_js__WEBPACK_IMPORTED_MODULE_3__.ViewListeners,
    );

    if(element)this.init(element, name, type, render)
  }
  on(event_name, callback, {details_setter, category = 'global', isCustom = false,preventDefault = false} = {}){
    if(category && !this.exp.events.hasOwnProperty(category)) this.exp.events[category] = new _events_index_js__WEBPACK_IMPORTED_MODULE_3__.EventController(this, category);
    isCustom && this.exp.events[category].cache.customEvents.add(event_name)
    const EVENT = this.exp.events[category];
    EVENT.addListener(event_name, (e)=>{
      if(details_setter) details_setter(EVENT);
      callback(e)
    },{
      preventDefault
    });
    return this;
  }
  _off(event, category = 'global'){
    this.exp.events[category].removeListener(event)
  }
  get element(){
    return this.cache.element;
  }
  isInteractive(){
    return this.cache.isInteractive;
  }
  useClient(directive){
    if(!this.cache.isInteractive){
      this.element.setAttribute('data-hydration-index', globalThis.__Ziko__.__HYDRATION__.index);
      globalThis.__Ziko__.__HYDRATION__.register(() => this);
      this.cache.isInteractive = true;
    }
    if(directive)this.element.setAttribute('data-hydration-directive', directive);
    return this;
  }
  get st(){
    return this.cache.style;
  }
  get attr(){
    return this.cache.attributes;
  }
  get evt(){
    return this.events;
  }
  get html(){
    return this.element.innerHTML;
  }
  get text(){
    return this.element.textContent;
  }
  get isBody(){
    return this.element === globalThis?.document.body;
  }
  get parent(){
    return this.cache.parent;
  }
  get width(){
    return this.element.getBoundingClientRect().width;
  }
  get height(){
    return this.element.getBoundingClientRect().height;
  }
  get top(){
    return this.element.getBoundingClientRect().top;
  }
  get right(){
    return this.element.getBoundingClientRect().right;
  }
  get bottom(){
    return this.element.getBoundingClientRect().bottom;
  }
  get left(){
    return this.element.getBoundingClientRect().left;
  }

}



/***/ },

/***/ "./node_modules/ziko/src/dom/constructors/UIElementCore.js"
/*!*****************************************************************!*\
  !*** ./node_modules/ziko/src/dom/constructors/UIElementCore.js ***!
  \*****************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UIElementCore: () => (/* binding */ UIElementCore)
/* harmony export */ });
/* harmony import */ var _UINode_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UINode.js */ "./node_modules/ziko/src/dom/constructors/UINode.js");
/* harmony import */ var _ziko_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../__ziko__/index.js */ "./node_modules/ziko/src/__ziko__/index.js");
/* harmony import */ var _ziko_ui_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../__ziko__/__ui__.js */ "./node_modules/ziko/src/__ziko__/__ui__.js");



(0,_ziko_index_js__WEBPACK_IMPORTED_MODULE_1__.__init__global__)()
class UIElementCore extends _UINode_js__WEBPACK_IMPORTED_MODULE_0__.UINode{
  constructor(){
    super()
  }
  init(element, name, type, render){
    this.target = globalThis.__Ziko__.__Config__.default.target||globalThis?.document?.body;
    if(typeof element === "string") {
      switch(type){
        case "html" : {
          element = globalThis?.document?.createElement(element);
          // console.log('1')
        }; break;
        case "svg" : {
          element = globalThis?.document?.createElementNS("http://www.w3.org/2000/svg", element); 
          // console.log('2')
        }; break;
        default : throw Error("Not supported")
      }
    }
    else this.target = element?.parentElement;
    Object.assign(this.cache, {
      name,
      isInteractive : false,
      parent:null,
      isBody:false,
      isRoot:false,
      isHidden: false,
      isFrozzen:false,
      attributes: {},
      filters: {},
      temp:{}
    })
    this.events = {
      ptr:null,
      mouse:null,
      wheel:null,
      key:null,
      drag:null,
      drop:null,
      click:null,
      clipboard:null,
      focus:null,
      swipe:null,
      custom:null,
    }
    this.observer={
      resize:null,
      intersection:null
    }
    if(element) Object.assign(this.cache,{element});
    this.items = new _ziko_ui_js__WEBPACK_IMPORTED_MODULE_2__.UIStore();
    globalThis.__Ziko__.__UI__[this.cache.name]?globalThis.__Ziko__.__UI__[this.cache.name]?.push(this):globalThis.__Ziko__.__UI__[this.cache.name]=[this];
    element && render && this?.render?.()
    globalThis.__Ziko__.__UI__.push(this)
  }
  get element(){
    return this.cache.element;
  }
    [Symbol.iterator]() {
    return this.items[Symbol.iterator]();
  }
  maintain() {
    for (let i = 0; i < this.items.length; i++) {
      Object.defineProperty(this, i, {
        value: this.items[i],
        writable: true,
        configurable: true,
        enumerable: false 
        });
    }
  }
  isInteractive(){
    return this.cache.isInteractive;
  }
  isUIElement(){
    return true;
  }
}



/***/ },

/***/ "./node_modules/ziko/src/dom/constructors/UINode.js"
/*!**********************************************************!*\
  !*** ./node_modules/ziko/src/dom/constructors/UINode.js ***!
  \**********************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UINode: () => (/* binding */ UINode)
/* harmony export */ });
class UINode {
    constructor(node){
        this.cache = {
            node
        }
    }
    isUINode(){
        return true
    }
    get node(){
        return this.cache.node;
    } 
}

// globalThis.node = (node) => new UINode(node);

/***/ },

/***/ "./node_modules/ziko/src/dom/constructors/mixins/attrs.js"
/*!****************************************************************!*\
  !*** ./node_modules/ziko/src/dom/constructors/mixins/attrs.js ***!
  \****************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   _set_attrs_: () => (/* binding */ _set_attrs_),
/* harmony export */   getAttr: () => (/* binding */ getAttr),
/* harmony export */   removeAttr: () => (/* binding */ removeAttr),
/* harmony export */   setAttr: () => (/* binding */ setAttr),
/* harmony export */   setContentEditable: () => (/* binding */ setContentEditable)
/* harmony export */ });
/* harmony import */ var _hooks_use_state_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../hooks/use-state.js */ "./node_modules/ziko/src/hooks/use-state.js");
/* harmony import */ var _data_string_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../data/string/index.js */ "./node_modules/ziko/src/data/string/index.js");



function setAttr(name, value) {
  if(name instanceof Object){
    const [names,values]=[Object.keys(name),Object.values(name)];
    for(let i=0;i<names.length;i++){
      if(values[i] instanceof Array)value[i] = values[i].join(" ");
      _set_attrs_.call(this, names[i], values[i])
    }
  }
  else{
    if(value instanceof Array) value = value.join(" ");
    _set_attrs_.call(this, name, value)
  }
  return this;
}
function removeAttr(...names) {
  for(let i=0;i<names.length;i++)this.element?.removeAttribute(names[i]);
  return this;
}
function getAttr(name){
  name = (0,_data_string_index_js__WEBPACK_IMPORTED_MODULE_1__.is_camelcase)(name) ? (0,_data_string_index_js__WEBPACK_IMPORTED_MODULE_1__.camel2hyphencase)(name) : name;
  return this.element.attributes[name].value;
}
function setContentEditable(bool = true) {
  this.setAttr("contenteditable", bool);
  return this;
}


function _set_attrs_(name, value){
    if(globalThis.SVGAElement && this.element instanceof globalThis.SVGAElement) name = (0,_data_string_index_js__WEBPACK_IMPORTED_MODULE_1__.is_camelcase)(name) ? (0,_data_string_index_js__WEBPACK_IMPORTED_MODULE_1__.camel2hyphencase)(name) : name;
    if(this?.attr[name] && this?.attr[name]===value) return;
    if((0,_hooks_use_state_js__WEBPACK_IMPORTED_MODULE_0__.isStateGetter)(value)){
        const getter = value()
        getter._subscribe(
            (newValue) => this.element?.setAttribute(name, newValue),
            this 
        );
    }
    else this.element?.setAttribute(name, value)
    Object.assign(this.cache.attributes, {[name]:value});   
}


/***/ },

/***/ "./node_modules/ziko/src/dom/constructors/mixins/dom.js"
/*!**************************************************************!*\
  !*** ./node_modules/ziko/src/dom/constructors/mixins/dom.js ***!
  \**************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   __addItem__: () => (/* binding */ __addItem__),
/* harmony export */   after: () => (/* binding */ after),
/* harmony export */   append: () => (/* binding */ append),
/* harmony export */   before: () => (/* binding */ before),
/* harmony export */   clear: () => (/* binding */ clear),
/* harmony export */   insertAt: () => (/* binding */ insertAt),
/* harmony export */   prepend: () => (/* binding */ prepend),
/* harmony export */   remove: () => (/* binding */ remove),
/* harmony export */   replaceElementWith: () => (/* binding */ replaceElementWith)
/* harmony export */ });
/* harmony import */ var _text_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../text/index.js */ "./node_modules/ziko/src/dom/text/index.js");
// import { isStateGetter } from "../../../hooks/use-state.js";
// import { 
//   is_camelcase,
//   camel2hyphencase
//  } from '../../../data/string/index.js';


function append(...ele) {
  __addItem__.call(this, "append", "push", ...ele);
  return this;
}
function prepend(...ele) {
  this.__addItem__.call(this, "prepend", "unshift", ...ele);
  return this;
}
function insertAt(index, ...ele) {
  if (index >= this.element.children.length) this.append(...ele);
  else
    for (let i = 0; i < ele.length; i++) {
      if (["number", "string"].includes(typeof ele[i])) ele[i] = (0,_text_index_js__WEBPACK_IMPORTED_MODULE_0__.text)(ele[i]);
      this.element?.insertBefore(ele[i].element, this.items[index].element);
      this.items.splice(index, 0, ele[i]);
    }
  return this;
}
function remove(...ele) {
  const remove = (ele) => {
    if (typeof ele === "number") ele = this.items[ele];
    if (ele?.isUIElement) this.element?.removeChild(ele.element);
    this.items = this.items.filter((n) => n !== ele);
  };
  for (let i = 0; i < ele.length; i++) remove(ele[i]);
  for (let i = 0; i < this.items.length; i++)
    Object.assign(this, { [[i]]: this.items[i] });
  // Remove from item
  return this;
}
function clear(){
  this?.items?.forEach(n=>n.unmount());
  this.element.innerHTML = "";
  return this;
}
function replaceElementWith(new_element){
    this.cache.element.replaceWith(new_element)
    this.cache.element = new_element;

    // To do : Dispose Events and States 
    return this
}
function after(ui){
  if(ui?.isUIElement) ui=ui.element;
  this.element?.after(ui)
  return this;
}
function before(ui){
  if(ui?.isUIElement) ui=ui.element;
  this.element?.before(ui)
  return this;
}




async function __addItem__(adder, pusher, ...ele) {
  if (this.cache.isFrozzen) {
    console.warn("You can't append new item to frozzen element");
    return this;
  }
  for (let i = 0; i < ele.length; i++) {
    if (["number", "string"].includes(typeof ele[i])) ele[i] = (0,_text_index_js__WEBPACK_IMPORTED_MODULE_0__.text)(ele[i]);
        // Fix Items Latter
    if (ele[i] instanceof Function) {
     const getter = ele[i]();
      if (getter.isStateGetter) {
        ele[i] = (0,_text_index_js__WEBPACK_IMPORTED_MODULE_0__.text)(getter.value);
        getter._subscribe(
            (newValue) => (ele[i].element.textContent = newValue),
            ele[i] 
        );
        // this.element.appendChild(textNode);
      }
    }
    if (typeof globalThis?.Node === "function" && ele[i] instanceof globalThis?.Node) ele[i] = new this.constructor(ele[i]);
    if (ele[i]?.isUINode) {
        ele[i].cache.parent = this;
        this.element?.[adder](ele[i].element);
        ele[i].target = this.element;
        this.items[pusher](ele[i]);
    } 
    else if(ele[i] instanceof Promise){
      const UIEle = await ele[i]
      UIEle.cache.parent = this;
      this.element?.[adder](UIEle.element);
      UIEle.target = this.element;
      this.items[pusher](UIEle)
    }
    else if (ele[i] instanceof Object) {
      if (ele[i]?.style) this.style(ele[i]?.style);
      if (ele[i]?.attr) {
        Object.entries(ele[i].attr).forEach((n) =>
          this.setAttr("" + n[0], n[1]),
        );
      }
    }
  }
  this.maintain();
  return this;
}

/***/ },

/***/ "./node_modules/ziko/src/dom/constructors/mixins/index.js"
/*!****************************************************************!*\
  !*** ./node_modules/ziko/src/dom/constructors/mixins/index.js ***!
  \****************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AttrsMethods: () => (/* reexport module object */ _attrs_js__WEBPACK_IMPORTED_MODULE_1__),
/* harmony export */   DomMethods: () => (/* reexport module object */ _dom_js__WEBPACK_IMPORTED_MODULE_2__),
/* harmony export */   IndexingMethods: () => (/* reexport module object */ _indexing_js__WEBPACK_IMPORTED_MODULE_3__),
/* harmony export */   LifecycleMethods: () => (/* reexport module object */ _lifecycle_js__WEBPACK_IMPORTED_MODULE_0__),
/* harmony export */   StyleMethods: () => (/* reexport module object */ _style_js__WEBPACK_IMPORTED_MODULE_4__),
/* harmony export */   __addItem__: () => (/* reexport safe */ _dom_js__WEBPACK_IMPORTED_MODULE_2__.__addItem__),
/* harmony export */   _set_attrs_: () => (/* reexport safe */ _attrs_js__WEBPACK_IMPORTED_MODULE_1__._set_attrs_),
/* harmony export */   after: () => (/* reexport safe */ _dom_js__WEBPACK_IMPORTED_MODULE_2__.after),
/* harmony export */   animate: () => (/* reexport safe */ _style_js__WEBPACK_IMPORTED_MODULE_4__.animate),
/* harmony export */   append: () => (/* reexport safe */ _dom_js__WEBPACK_IMPORTED_MODULE_2__.append),
/* harmony export */   at: () => (/* reexport safe */ _indexing_js__WEBPACK_IMPORTED_MODULE_3__.at),
/* harmony export */   before: () => (/* reexport safe */ _dom_js__WEBPACK_IMPORTED_MODULE_2__.before),
/* harmony export */   clear: () => (/* reexport safe */ _dom_js__WEBPACK_IMPORTED_MODULE_2__.clear),
/* harmony export */   find: () => (/* reexport safe */ _indexing_js__WEBPACK_IMPORTED_MODULE_3__.find),
/* harmony export */   forEach: () => (/* reexport safe */ _indexing_js__WEBPACK_IMPORTED_MODULE_3__.forEach),
/* harmony export */   getAttr: () => (/* reexport safe */ _attrs_js__WEBPACK_IMPORTED_MODULE_1__.getAttr),
/* harmony export */   hide: () => (/* reexport safe */ _style_js__WEBPACK_IMPORTED_MODULE_4__.hide),
/* harmony export */   insertAt: () => (/* reexport safe */ _dom_js__WEBPACK_IMPORTED_MODULE_2__.insertAt),
/* harmony export */   map: () => (/* reexport safe */ _indexing_js__WEBPACK_IMPORTED_MODULE_3__.map),
/* harmony export */   mount: () => (/* reexport safe */ _lifecycle_js__WEBPACK_IMPORTED_MODULE_0__.mount),
/* harmony export */   prepend: () => (/* reexport safe */ _dom_js__WEBPACK_IMPORTED_MODULE_2__.prepend),
/* harmony export */   remove: () => (/* reexport safe */ _dom_js__WEBPACK_IMPORTED_MODULE_2__.remove),
/* harmony export */   removeAttr: () => (/* reexport safe */ _attrs_js__WEBPACK_IMPORTED_MODULE_1__.removeAttr),
/* harmony export */   replaceElementWith: () => (/* reexport safe */ _dom_js__WEBPACK_IMPORTED_MODULE_2__.replaceElementWith),
/* harmony export */   setAttr: () => (/* reexport safe */ _attrs_js__WEBPACK_IMPORTED_MODULE_1__.setAttr),
/* harmony export */   setContentEditable: () => (/* reexport safe */ _attrs_js__WEBPACK_IMPORTED_MODULE_1__.setContentEditable),
/* harmony export */   show: () => (/* reexport safe */ _style_js__WEBPACK_IMPORTED_MODULE_4__.show),
/* harmony export */   size: () => (/* reexport safe */ _style_js__WEBPACK_IMPORTED_MODULE_4__.size),
/* harmony export */   style: () => (/* reexport safe */ _style_js__WEBPACK_IMPORTED_MODULE_4__.style),
/* harmony export */   unmount: () => (/* reexport safe */ _lifecycle_js__WEBPACK_IMPORTED_MODULE_0__.unmount)
/* harmony export */ });
/* harmony import */ var _lifecycle_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lifecycle.js */ "./node_modules/ziko/src/dom/constructors/mixins/lifecycle.js");
/* harmony import */ var _attrs_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./attrs.js */ "./node_modules/ziko/src/dom/constructors/mixins/attrs.js");
/* harmony import */ var _dom_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dom.js */ "./node_modules/ziko/src/dom/constructors/mixins/dom.js");
/* harmony import */ var _indexing_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./indexing.js */ "./node_modules/ziko/src/dom/constructors/mixins/indexing.js");
/* harmony import */ var _style_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./style.js */ "./node_modules/ziko/src/dom/constructors/mixins/style.js");


















/***/ },

/***/ "./node_modules/ziko/src/dom/constructors/mixins/indexing.js"
/*!*******************************************************************!*\
  !*** ./node_modules/ziko/src/dom/constructors/mixins/indexing.js ***!
  \*******************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   at: () => (/* binding */ at),
/* harmony export */   find: () => (/* binding */ find),
/* harmony export */   forEach: () => (/* binding */ forEach),
/* harmony export */   map: () => (/* binding */ map)
/* harmony export */ });
function at(index) {
  return this.items.at(index);
}
function forEach(callback) {
  this.items.forEach(callback);
  return this;
}
function map(callback) {
  return this.items.map(callback);
}
function find(condition) {
  return this.items.filter(condition);
}



/***/ },

/***/ "./node_modules/ziko/src/dom/constructors/mixins/lifecycle.js"
/*!********************************************************************!*\
  !*** ./node_modules/ziko/src/dom/constructors/mixins/lifecycle.js ***!
  \********************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   mount: () => (/* binding */ mount),
/* harmony export */   unmount: () => (/* binding */ unmount)
/* harmony export */ });
// export function mount(target = this.target) {
//   if(this.isBody) return ;
//   if(target?.isUIElement)target=target.element;
//   this.target=target;
//   this.target?.appendChild(this.element);
//   return this;
// }
// export function unmount(){
//   if(this.cache.parent)this.cache.parent.remove(this);
//   else if(this.target?.children?.length && [...this.target?.children].includes(this.element)) this.target.removeChild(this.element);
//   return this;
// }

// export function mountAfter(target = this.target, t = 1) {
//   setTimeout(() => this.mount(), t);
//   return this;
// }
// export function unmountAfter(t = 1) {
//   setTimeout(() => this.unmount(), t);
//   return this;
// }

function mount(target = this.target, delay = 0) {
    if (delay > 0) {
        setTimeout(() => this.mount(target, 0), delay);
        return this;
    }

    if (this.isBody) return this;

    if (target?.isUIElement) target = target.element;
    this.target = target;

    this.target?.appendChild(this.element);
    return this;
}

function unmount(delay = 0) {
    if (delay > 0) {
        setTimeout(() => this.unmount(0), delay);
        return this;
    }

    if (this.cache.parent) {
        this.cache.parent.remove(this);
    } else if (
        this.target?.children?.length &&
        [...this.target.children].includes(this.element)
    ) {
        this.target.removeChild(this.element);
    }

    return this;
}


/***/ },

/***/ "./node_modules/ziko/src/dom/constructors/mixins/style.js"
/*!****************************************************************!*\
  !*** ./node_modules/ziko/src/dom/constructors/mixins/style.js ***!
  \****************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   animate: () => (/* binding */ animate),
/* harmony export */   hide: () => (/* binding */ hide),
/* harmony export */   show: () => (/* binding */ show),
/* harmony export */   size: () => (/* binding */ size),
/* harmony export */   style: () => (/* binding */ style)
/* harmony export */ });
/* harmony import */ var _hooks_use_state_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../hooks/use-state.js */ "./node_modules/ziko/src/hooks/use-state.js");

function style(styles){
    if(!this.element?.style) return this;
    for(let key in styles){
        const value = styles[key];
        if((0,_hooks_use_state_js__WEBPACK_IMPORTED_MODULE_0__.isStateGetter)(value)){
            const getter = value()
            Object.assign(this.element.style, {[key] : getter.value})
            getter._subscribe(
                (newValue) => {
                    console.log({newValue})
                    Object.assign(this.element.style, {[key] : newValue})
                },
                // this 
            );
        }
        else Object.assign(this.element.style, {[key] : value})
    }
    return this;
}
function size(width, height){
    return this.style({width, height})
}
function hide(){

}
function show(){

}
function animate(keyframe, {duration=1000, iterations=1, easing="ease"}={}){
    this.element?.animate(keyframe,{duration, iterations, easing});
    return this;
}


/***/ },

/***/ "./node_modules/ziko/src/dom/flex/index.js"
/*!*************************************************!*\
  !*** ./node_modules/ziko/src/dom/flex/index.js ***!
  \*************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Flex: () => (/* binding */ Flex),
/* harmony export */   UIFlex: () => (/* binding */ UIFlex)
/* harmony export */ });
/* harmony import */ var _constructors_UIElement_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constructors/UIElement.js */ "./node_modules/ziko/src/dom/constructors/UIElement.js");
/* harmony import */ var _utils_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/index.js */ "./node_modules/ziko/src/dom/flex/utils/index.js");


class UIFlex extends _constructors_UIElement_js__WEBPACK_IMPORTED_MODULE_0__.UIElement {
  constructor({tag = "div", orientation = "h", order, w = "100%", h = "100%"} = {}) {
    super({element : tag , name : "Flex"});
    this.direction = "cols";
    this.style({ display: "flex" });
    // this.mount();
  }
  isFlex(){
    return true;
  }
  responsify(respBreakPoint, wrap = true) {
    this.wrap(wrap);
    if (this.element.clientWidth < respBreakPoint) this.vertical();
    else this.horizontal();
    return this;
  }
  setSpaceAround() {
    this.style({ justifyContent: "space-around" });
    return this;
  }
  setSpaceBetween() {
    this.style({ justifyContent: "space-between" });
    return this;
  }
  setBaseline() {
    this.style({ alignItems: "baseline" });
    return this;
  }
  gap(g) {
    if (this.direction === "row") this.style({ columnGap: g });
    else if (this.direction === "column") this.style({ rowGap: g });
    return this;
  }
  wrap(value = "wrap") {
    const values = ["no-wrap", "wrap","wrap-reverse"];
    this.style({
      flexWrap: typeof value === "string" ? value : values[+value],
    });
    return this;
  }
  _justifyContent(align = "center") {
    this.style({ justifyContent: align });
    return this;
  }
  // verticalize
  vertical(x, y, order = 1) {
    _utils_index_js__WEBPACK_IMPORTED_MODULE_1__.set_vertical.call(this, order)
    this.style({
      alignItems: typeof(x)==="number"?_utils_index_js__WEBPACK_IMPORTED_MODULE_1__.map_pos_x.call(this,x):x,
      justifyContent: typeof(y)=="number"?_utils_index_js__WEBPACK_IMPORTED_MODULE_1__.map_pos_y.call(this,y):y
    });
    return this;
  }
  // horizontalize
  horizontal(x, y, order = 1) {
    _utils_index_js__WEBPACK_IMPORTED_MODULE_1__.set_horizontal.call(this, order)
    this.style({
      alignItems: typeof(y)=="number"?_utils_index_js__WEBPACK_IMPORTED_MODULE_1__.map_pos_y.call(this,y):y,
      justifyContent: typeof(x)==="number"?_utils_index_js__WEBPACK_IMPORTED_MODULE_1__.map_pos_x.call(this,x):x
    });
    return this;
  }
  show() {
    this.isHidden = false;
    this.style({ display: "flex" });
    return this;
  }
}

const Flex = (...UIElement) =>{
  let tag="div";
  if(typeof UIElement[0]==="string"){
    tag=UIElement[0];
    UIElement.pop();
  }
  return new UIFlex(tag).append(...UIElement);
}



/***/ },

/***/ "./node_modules/ziko/src/dom/flex/utils/index.js"
/*!*******************************************************!*\
  !*** ./node_modules/ziko/src/dom/flex/utils/index.js ***!
  \*******************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   map_pos_x: () => (/* binding */ map_pos_x),
/* harmony export */   map_pos_y: () => (/* binding */ map_pos_y),
/* harmony export */   set_horizontal: () => (/* binding */ set_horizontal),
/* harmony export */   set_vertical: () => (/* binding */ set_vertical)
/* harmony export */ });
function set_vertical(direction){
  direction == 1
    ? this.style({ flexDirection: "column" })
    : direction == -1 && this.style({ flexDirection: "column-reverse" });
  return this;
}
function set_horizontal(direction){
    direction == 1
        ? this.style({ flexDirection: "row" })
        : direction == -1 && this.style({ flexDirection: "row-reverse" });
    return this;
}
function map_pos_x(align){
    let pos = ["flex-start", "center", "flex-end"];
    if (typeof align === "number") align = pos[align + 1];
    return align;
}
function map_pos_y(align){
    return map_pos_x(-align);
}

/***/ },

/***/ "./node_modules/ziko/src/dom/index.js"
/*!********************************************!*\
  !*** ./node_modules/ziko/src/dom/index.js ***!
  \********************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CloneElement: () => (/* reexport safe */ _utils_index_js__WEBPACK_IMPORTED_MODULE_2__.CloneElement),
/* harmony export */   Flex: () => (/* reexport safe */ _flex_index_js__WEBPACK_IMPORTED_MODULE_6__.Flex),
/* harmony export */   HTMLWrapper: () => (/* reexport safe */ _wrappers_index_js__WEBPACK_IMPORTED_MODULE_8__.HTMLWrapper),
/* harmony export */   SVGWrapper: () => (/* reexport safe */ _wrappers_index_js__WEBPACK_IMPORTED_MODULE_8__.SVGWrapper),
/* harmony export */   Suspense: () => (/* reexport safe */ _suspense_index_js__WEBPACK_IMPORTED_MODULE_7__.Suspense),
/* harmony export */   Switch: () => (/* reexport safe */ _logic_index_js__WEBPACK_IMPORTED_MODULE_10__.Switch),
/* harmony export */   UIElement: () => (/* reexport safe */ _constructors_UIElement_js__WEBPACK_IMPORTED_MODULE_0__.UIElement),
/* harmony export */   UIFlex: () => (/* reexport safe */ _flex_index_js__WEBPACK_IMPORTED_MODULE_6__.UIFlex),
/* harmony export */   UIHTMLWrapper: () => (/* reexport safe */ _wrappers_index_js__WEBPACK_IMPORTED_MODULE_8__.UIHTMLWrapper),
/* harmony export */   UINode: () => (/* reexport safe */ _constructors_UINode_js__WEBPACK_IMPORTED_MODULE_1__.UINode),
/* harmony export */   UISVGWrapper: () => (/* reexport safe */ _wrappers_index_js__WEBPACK_IMPORTED_MODULE_8__.UISVGWrapper),
/* harmony export */   UISwitch: () => (/* reexport safe */ _logic_index_js__WEBPACK_IMPORTED_MODULE_10__.UISwitch),
/* harmony export */   UIView: () => (/* reexport safe */ _view_index_js__WEBPACK_IMPORTED_MODULE_3__.UIView),
/* harmony export */   View: () => (/* reexport safe */ _view_index_js__WEBPACK_IMPORTED_MODULE_3__.View),
/* harmony export */   ZikoUISuspense: () => (/* reexport safe */ _suspense_index_js__WEBPACK_IMPORTED_MODULE_7__.ZikoUISuspense),
/* harmony export */   ZikoUIText: () => (/* reexport safe */ _text_index_js__WEBPACK_IMPORTED_MODULE_5__.ZikoUIText),
/* harmony export */   add_class: () => (/* reexport safe */ _utils_index_js__WEBPACK_IMPORTED_MODULE_2__.add_class),
/* harmony export */   add_vendor_prefix: () => (/* reexport safe */ _utils_index_js__WEBPACK_IMPORTED_MODULE_2__.add_vendor_prefix),
/* harmony export */   call_with_optional_props: () => (/* reexport safe */ _utils_index_js__WEBPACK_IMPORTED_MODULE_2__.call_with_optional_props),
/* harmony export */   cloneUI: () => (/* reexport safe */ _utils_index_js__WEBPACK_IMPORTED_MODULE_2__.cloneUI),
/* harmony export */   define_wc: () => (/* reexport safe */ _web_component_index_js__WEBPACK_IMPORTED_MODULE_9__.define_wc),
/* harmony export */   isPrimitive: () => (/* reexport safe */ _utils_index_js__WEBPACK_IMPORTED_MODULE_2__.isPrimitive),
/* harmony export */   linkStyle: () => (/* reexport safe */ _utils_index_js__WEBPACK_IMPORTED_MODULE_2__.linkStyle),
/* harmony export */   normalize_css_value: () => (/* reexport safe */ _utils_index_js__WEBPACK_IMPORTED_MODULE_2__.normalize_css_value),
/* harmony export */   remove_class: () => (/* reexport safe */ _utils_index_js__WEBPACK_IMPORTED_MODULE_2__.remove_class),
/* harmony export */   script: () => (/* reexport safe */ _utils_index_js__WEBPACK_IMPORTED_MODULE_2__.script),
/* harmony export */   style: () => (/* reexport safe */ _utils_index_js__WEBPACK_IMPORTED_MODULE_2__.style),
/* harmony export */   tags: () => (/* reexport safe */ _tags_index_js__WEBPACK_IMPORTED_MODULE_4__.tags),
/* harmony export */   text: () => (/* reexport safe */ _text_index_js__WEBPACK_IMPORTED_MODULE_5__.text),
/* harmony export */   waitElm: () => (/* reexport safe */ _utils_index_js__WEBPACK_IMPORTED_MODULE_2__.waitElm)
/* harmony export */ });
/* harmony import */ var _constructors_UIElement_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constructors/UIElement.js */ "./node_modules/ziko/src/dom/constructors/UIElement.js");
/* harmony import */ var _constructors_UINode_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constructors/UINode.js */ "./node_modules/ziko/src/dom/constructors/UINode.js");
/* harmony import */ var _utils_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/index.js */ "./node_modules/ziko/src/dom/utils/index.js");
/* harmony import */ var _view_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./view/index.js */ "./node_modules/ziko/src/dom/view/index.js");
/* harmony import */ var _tags_index_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./tags/index.js */ "./node_modules/ziko/src/dom/tags/index.js");
/* harmony import */ var _text_index_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./text/index.js */ "./node_modules/ziko/src/dom/text/index.js");
/* harmony import */ var _flex_index_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./flex/index.js */ "./node_modules/ziko/src/dom/flex/index.js");
/* harmony import */ var _suspense_index_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./suspense/index.js */ "./node_modules/ziko/src/dom/suspense/index.js");
/* harmony import */ var _wrappers_index_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./wrappers/index.js */ "./node_modules/ziko/src/dom/wrappers/index.js");
/* harmony import */ var _web_component_index_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./web-component/index.js */ "./node_modules/ziko/src/dom/web-component/index.js");
/* harmony import */ var _logic_index_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./logic/index.js */ "./node_modules/ziko/src/dom/logic/index.js");







// export * from './grid/index.js';


// export * from './graphics/index.js'



/***/ },

/***/ "./node_modules/ziko/src/dom/logic/index.js"
/*!**************************************************!*\
  !*** ./node_modules/ziko/src/dom/logic/index.js ***!
  \**************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Switch: () => (/* reexport safe */ _switch_index_js__WEBPACK_IMPORTED_MODULE_0__.Switch),
/* harmony export */   UISwitch: () => (/* reexport safe */ _switch_index_js__WEBPACK_IMPORTED_MODULE_0__.UISwitch)
/* harmony export */ });
/* harmony import */ var _switch_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./switch/index.js */ "./node_modules/ziko/src/dom/logic/switch/index.js");


/***/ },

/***/ "./node_modules/ziko/src/dom/logic/switch/index.js"
/*!*********************************************************!*\
  !*** ./node_modules/ziko/src/dom/logic/switch/index.js ***!
  \*********************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Switch: () => (/* binding */ Switch),
/* harmony export */   UISwitch: () => (/* binding */ UISwitch)
/* harmony export */ });
/* harmony import */ var _constructors_UIElement_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../constructors/UIElement.js */ "./node_modules/ziko/src/dom/constructors/UIElement.js");


class UISwitch extends _constructors_UIElement_js__WEBPACK_IMPORTED_MODULE_0__.UIElement{
    constructor(key, cases){
        super()
        this.key = key; 
        this.cases = cases;
        this.init()
    }
    init(){
        Object.values(this.cases).filter(n=>n != this.current).forEach(n=>n.unmount())
        super.init(this.current.element)
    }
    get current(){
        const matched = Object.keys(this.cases).find(n => n == this.key) ?? 'default'
        return this.cases[matched]
    }
    updateKey(key){
        this.key = key;
        this.replaceElementWith(this.current.element)
        // this.cache.element.replaceWith(this.current.element)
        // this.cache.element = this.current.element;
        return this;
    }
    
}

const Switch=({key, cases})=> new UISwitch(key, cases)



// export const Switch=({key, cases}) => {
//     const matched = Object.keys(cases).find(n => n == key) ?? 'default';
//     return this.cases[matched]()
// }

/***/ },

/***/ "./node_modules/ziko/src/dom/mini/UIElement.js"
/*!*****************************************************!*\
  !*** ./node_modules/ziko/src/dom/mini/UIElement.js ***!
  \*****************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UIElement: () => (/* binding */ UIElement)
/* harmony export */ });
/* harmony import */ var _constructors_UIElementCore_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constructors/UIElementCore.js */ "./node_modules/ziko/src/dom/constructors/UIElementCore.js");

class UIElement extends _constructors_UIElementCore_js__WEBPACK_IMPORTED_MODULE_0__.UIElementCore{
    constructor({element, name, type, render}){
        super({element, name, type, render})
    }
}



/***/ },

/***/ "./node_modules/ziko/src/dom/suspense/index.js"
/*!*****************************************************!*\
  !*** ./node_modules/ziko/src/dom/suspense/index.js ***!
  \*****************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Suspense: () => (/* binding */ Suspense),
/* harmony export */   ZikoUISuspense: () => (/* binding */ ZikoUISuspense)
/* harmony export */ });
/* harmony import */ var _mini_UIElement_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../mini/UIElement.js */ "./node_modules/ziko/src/dom/mini/UIElement.js");

class ZikoUISuspense extends _mini_UIElement_js__WEBPACK_IMPORTED_MODULE_0__.UIElement{
    constructor(fallback_ui, callback){
        super({element : "div", name : "suspense"})
        this.setAttr({
            dataTemp : "suspense"
        })
        this.fallback_ui = fallback_ui
        this.append(fallback_ui);
        (async ()=>{
            try{
                const ui = await callback()
                fallback_ui.unmount()
                this.append(ui)
            }
            catch(error){
                console.log({error})
            }
        })()
    }
}

const Suspense = (fallback_ui, callback) => new ZikoUISuspense(fallback_ui, callback);


/***/ },

/***/ "./node_modules/ziko/src/dom/tags/index.js"
/*!*************************************************!*\
  !*** ./node_modules/ziko/src/dom/tags/index.js ***!
  \*************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   tags: () => (/* binding */ tags)
/* harmony export */ });
/* harmony import */ var _constructors_UIElement_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constructors/UIElement.js */ "./node_modules/ziko/src/dom/constructors/UIElement.js");
/* harmony import */ var _tags_list_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tags-list.js */ "./node_modules/ziko/src/dom/tags/tags-list.js");



const tags = new Proxy({}, {
  get(target, prop) {
    if (typeof prop !== 'string') return undefined;
    let tag = prop.replaceAll("_","-").toLowerCase();
    let type ;
    if(_tags_list_js__WEBPACK_IMPORTED_MODULE_1__.HTMLTags.includes(tag)) type = 'html'
    if(_tags_list_js__WEBPACK_IMPORTED_MODULE_1__.SVGTags.includes(tag)) type = 'svg'
    if(_tags_list_js__WEBPACK_IMPORTED_MODULE_1__.MathMLTags.includes(tag)) type = 'mathml'
    return (...args)=>{
      // Fix undefined
      // console.log(isStateGetter(args[0]))
      // console.log(!!args)
      if(args.length === 0) {
        // console.log('length 0')
        return new _constructors_UIElement_js__WEBPACK_IMPORTED_MODULE_0__.UIElement({element : tag, name : tag, type})
      }
      if(
        ['string', 'number'].includes(typeof args[0]) 
        || args[0] instanceof _constructors_UIElement_js__WEBPACK_IMPORTED_MODULE_0__.UIElement 
        || (typeof args[0] === 'function' && args[0]().isStateGetter())
      ) return new _constructors_UIElement_js__WEBPACK_IMPORTED_MODULE_0__.UIElement({element : tag, name : tag, type}).append(...args);
      // console.log(args[0])
      return new _constructors_UIElement_js__WEBPACK_IMPORTED_MODULE_0__.UIElement({element : tag, type}).setAttr(args.shift()).append(...args)
    }
    // if(SVGTags.includes(tag)) return (...args) => new UIElement(tag,"",{el_type : "svg"}).append(...args);
    // return (...args)=>{
    //   if(!(args[0] instanceof UIElement) && args[0] instanceof Object){
    //     let attributes = args.shift()
    //     return new UIElement(tag).setAttr(attributes).append(...args)
    //   }
    //   return new UIElement(tag).append(...args);
    // }
    // // switch(tag){
    //   case "html"  : globalThis?.document?.createElement("html")
    //   case "head"  :
    //   case "style" :
    //   case "link"  :
    //   case "meta"  :
    //   case "srcipt":
    //   case "body"  : return null; break;
    //   default : return new UIElement(tag);
    // }
  }
});



/***/ },

/***/ "./node_modules/ziko/src/dom/tags/tags-list.js"
/*!*****************************************************!*\
  !*** ./node_modules/ziko/src/dom/tags/tags-list.js ***!
  \*****************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HTMLTags: () => (/* binding */ HTMLTags),
/* harmony export */   MathMLTags: () => (/* binding */ MathMLTags),
/* harmony export */   SVGTags: () => (/* binding */ SVGTags)
/* harmony export */ });
const HTMLTags = [
  'a',
  'abb',
  'address',
  'area',
  'article',
  'aside',
  'audio',
  'b',
  'base',
  'bdi',
  'bdo',
  'blockquote',
  'br',
  'button',
  'canvas',
  'caption',
  'cite',
  'code',
  'col',
  'colgroup',
  'data',
  'datalist',
  'dd',
  'del',
  'details',
  'dfn',
  'dialog',
  'div',
  'dl',
  'dt',
  'em',
  'embed',
  'fieldset',
  'figcaption',
  'figure',
  'footer',
  'form',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'header',
  'hgroup',
  'hr',
  'i',
  'iframe',
  'img',
  'ipnut',
  'ins',
  'kbd',
  'label',
  'legend',
  'li',
  'main',
  'map',
  'mark',
  'menu',
  'meter',
  'nav',
  'object',
  'ol',
  'optgroup',
  'option',
  'output',
  'p',
  'param',
  'picture',
  'pre',
  'progress',
  'q',
  'rp',
  'rt',
  'ruby',
  's',
  'samp',
  'search',
  'section',
  'select',
  'small',
  'source',
  'span',
  'strong',
  'sub',
  'summary',
  'sup',
  'table',
  'tbody',
  'td',
  'template',
  'textarea',
  'tfoot',
  'th',
  'thead',
  'time',
  'title',
  'tr',
  'track',
  'u',
  'ul',
  'var',
  'video',
  'wbr'
];

const SVGTags = [
    "svg", "g", "defs", "symbol", "use", "image", "switch",
    "rect", "circle", "ellipse", "line", "polyline", "polygon", "path",
    "text", "tspan", "textPath", "altGlyph", "altGlyphDef", "altGlyphItem", "glyph", "glyphRef",
    "linearGradient", "radialGradient", "pattern", "solidColor",
    "filter", "feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix",
    "feDiffuseLighting", "feDisplacementMap", "feDropShadow", "feFlood", "feFuncA", "feFuncR", "feFuncG", "feFuncB",
    "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "feSpecularLighting",
    "feTile", "feTurbulence",
    "animate", "animateMotion", "animateTransform", "set",
    "script",
    "desc", "title", "metadata", "foreignObject"
  ];

const MathMLTags = [
  'math', 'annotation', 
  `merror`,
  `mfrac`,
  `mi`, 
  `mprescripts`,
  `mn`, 
  `mo`, `mover`,
  `mpadded`, `mphantom`, `mprescripts`,
  `mroot`, `mrow`,
  `ms`, `semantics`, `mspace`, `msqrt`, `mstyle`, `msub`, `msup`, `msubsup`,
  `mtable`, `mtd`, `mtext`, `mtr`,
  `munder`, `munderover`
]

/***/ },

/***/ "./node_modules/ziko/src/dom/text/index.js"
/*!*************************************************!*\
  !*** ./node_modules/ziko/src/dom/text/index.js ***!
  \*************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ZikoUIText: () => (/* binding */ ZikoUIText),
/* harmony export */   text: () => (/* binding */ text)
/* harmony export */ });
/* harmony import */ var _constructors_UINode_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constructors/UINode.js */ "./node_modules/ziko/src/dom/constructors/UINode.js");

class ZikoUIText extends _constructors_UINode_js__WEBPACK_IMPORTED_MODULE_0__.UINode {
    constructor(...value) {
      super("span", "text", false, ...value);
      this.element = globalThis?.document?.createTextNode(...value)
    }
    isText(){
      return true
    }
}
const text = (...str) => new ZikoUIText(...str);


/***/ },

/***/ "./node_modules/ziko/src/dom/utils/index.js"
/*!**************************************************!*\
  !*** ./node_modules/ziko/src/dom/utils/index.js ***!
  \**************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CloneElement: () => (/* binding */ CloneElement),
/* harmony export */   add_class: () => (/* binding */ add_class),
/* harmony export */   add_vendor_prefix: () => (/* binding */ add_vendor_prefix),
/* harmony export */   call_with_optional_props: () => (/* binding */ call_with_optional_props),
/* harmony export */   cloneUI: () => (/* binding */ cloneUI),
/* harmony export */   isPrimitive: () => (/* binding */ isPrimitive),
/* harmony export */   linkStyle: () => (/* binding */ linkStyle),
/* harmony export */   normalize_css_value: () => (/* binding */ normalize_css_value),
/* harmony export */   remove_class: () => (/* binding */ remove_class),
/* harmony export */   script: () => (/* binding */ script),
/* harmony export */   style: () => (/* binding */ style),
/* harmony export */   waitElm: () => (/* binding */ waitElm)
/* harmony export */ });
const call_with_optional_props = (Component) => {
    return (...args) => {
        const first = args[0];
        const isChild = first?.isUIElement?.() || isPrimitive(first) ;
        return isChild 
                ? new Component({}, ...args)
                : new Component(first, ...args.slice(1))
    };
};
function add_vendor_prefix(property) {
	const propertyUC = property.slice(0, 1).toUpperCase() + property.slice(1);
	const vendors = ['Webkit', 'Moz', 'O', 'ms'];
	for(let i = 0, len = vendors.length; i < len; i++) {
		const vendor = vendors[i];
		if(typeof (globalThis?.document?.body).style[vendor + propertyUC] !== 'undefined') return vendor + propertyUC;
	}
	return property;
}
const normalize_css_value = value => typeof value === 'number' ? value+'px' : value;
const add_class = (UIElement, name) => UIElement.element.className = UIElement.element.className.replace(/\s+$/gi, '') + ' ' + name;
const remove_class =(UIElement, name) => UIElement.element.className = UIElement.element.className.replace(name, '');

// const addSuffixeToNumber=(value,suffixe="px")=>{
//   if(typeof value === "number") value+=suffixe;
//   if(value instanceof Array)value=value.map(n=>typeof n==="number"?n+=suffixe:n).join(" ");
//   return value;
// }

// const Id = (a) => document.getElementById(a);
// const Class = (a) => [...document.getElementsByClassName(a)];
// const $=(...selector)=>{
//   var ele=[]
//   for(let i=0;i<selector.length;i++){
//     if(typeof selector[i]=="string")ele.push(...document.querySelectorAll(selector[i]));
//     if(selector[i] instanceof UIElement)ele.push(selector[i].element)
//   }
//   return ele.length===1?ele[0]:ele;
// }

const style = (el, styles) => {if(el)Object.assign(el.style, styles)};

function script(src) {
  const Script = document?.createElement("script");
  Script.setAttribute("src", src);
  document.head.appendChild(Script);
}
function linkStyle(href) {
  const link = document?.createElement("link");
  link.setAttribute("rel", "stylesheet");
  link.setAttribute("href", href);
  document.head.appendChild(link);
}
const CloneElement = (UIElement) => {
  var clone = new UIElement.__proto__.constructor()
  //waitForUIElm(UIElement).then(e=>console.log(e)).then(()=>clone = new UIElement.__proto__.constructor())
  //let a = new UIElement.__proto__.constructor()
  return clone;
};
const cloneUI=UIElement=>{
  return Object.assign(Object.create(Object.getPrototypeOf(UIElement)),UIElement)
}
function isPrimitive(value) {
    return typeof value !== 'object' && typeof value !== 'function' || value === null;
}
const waitElm=(UIElement)=>{
    return new Promise(resolve => {
        if (UIElement) {
            return resolve(UIElement);
        }
        const observer = new MutationObserver(() => {
            if (UIElement) {
                resolve(UIElement);
                observer.disconnect();
            }
        });
        observer.observe(document?.body, {
            childList: true,
            subtree: true
        });
    });
  }


/***/ },

/***/ "./node_modules/ziko/src/dom/view/index.js"
/*!*************************************************!*\
  !*** ./node_modules/ziko/src/dom/view/index.js ***!
  \*************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UIView: () => (/* binding */ UIView),
/* harmony export */   View: () => (/* binding */ View)
/* harmony export */ });
/* harmony import */ var _constructors_UIElement_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constructors/UIElement.js */ "./node_modules/ziko/src/dom/constructors/UIElement.js");

class UIView extends _constructors_UIElement_js__WEBPACK_IMPORTED_MODULE_0__.UIElement{
    constructor(...items){
        super({element : 'div', name : 'view'})
        this.append(...items)
    }
}

const View = (...items) => new UIView(...items);
 

/***/ },

/***/ "./node_modules/ziko/src/dom/web-component/index.js"
/*!**********************************************************!*\
  !*** ./node_modules/ziko/src/dom/web-component/index.js ***!
  \**********************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   define_wc: () => (/* binding */ define_wc)
/* harmony export */ });
function define_wc(name, UI_Constructor, props = {}, { mode = 'open'} = {}) {
    if (globalThis.customElements?.get(name)) {
        console.warn(`Custom element "${name}" is already defined`);
        return;
    }
    if(name.search('-') === -1){
        console.warn(`"${name}" is not a valid custom element name`);
        return; 
    }
    globalThis.customElements?.define(
        name,
        class extends HTMLElement {
            static get observedAttributes() {
                return ['style', ...Object.keys(props)];
            }

            constructor() {
                super();
                this.attachShadow({ mode });
                this.props = {};
                this.mask = {
                    ...props,
                    // style: { type: Object }
                };
            }

            connectedCallback() {
                this.render();
            }

            render() {
                this.shadowRoot.innerHTML = '';
                const item = UI_Constructor(this.props);
                if(item instanceof Array) item.forEach(n => n.mount(this.shadowRoot)) 
                else item.mount(this.shadowRoot)
            }

            attributeChangedCallback(name, _, newValue) {
                Object.assign(this.props, {
                    [name]: this.mask[name].type(newValue)
                });
                this.render();
            }
        }
    );
}


/***/ },

/***/ "./node_modules/ziko/src/dom/wrappers/html/index.js"
/*!**********************************************************!*\
  !*** ./node_modules/ziko/src/dom/wrappers/html/index.js ***!
  \**********************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HTMLWrapper: () => (/* binding */ HTMLWrapper),
/* harmony export */   UIHTMLWrapper: () => (/* binding */ UIHTMLWrapper)
/* harmony export */ });
/* harmony import */ var _constructors_UIElement_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../constructors/UIElement.js */ "./node_modules/ziko/src/dom/constructors/UIElement.js");


class UIHTMLWrapper extends _constructors_UIElement_js__WEBPACK_IMPORTED_MODULE_0__.UIElement {
    constructor(content){
        super({element : 'div', name : 'html_wrappper'})
        this.element.append(html2dom(content))
        this.style({
            display : 'contents'
        })
    }
}

function html2dom(htmlString) {
    if(globalThis?.DOMParser){
        const parser = new DOMParser();
        const doc = parser.parseFromString(`<div>${htmlString}</div>`, 'text/html');
        doc.body.firstChild.style.display = "contents"
        return doc.body.firstChild;
    }
}

const HTMLWrapper = (content) => new UIHTMLWrapper(content)


/***/ },

/***/ "./node_modules/ziko/src/dom/wrappers/index.js"
/*!*****************************************************!*\
  !*** ./node_modules/ziko/src/dom/wrappers/index.js ***!
  \*****************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HTMLWrapper: () => (/* reexport safe */ _html_index_js__WEBPACK_IMPORTED_MODULE_0__.HTMLWrapper),
/* harmony export */   SVGWrapper: () => (/* reexport safe */ _svg_index_js__WEBPACK_IMPORTED_MODULE_1__.SVGWrapper),
/* harmony export */   UIHTMLWrapper: () => (/* reexport safe */ _html_index_js__WEBPACK_IMPORTED_MODULE_0__.UIHTMLWrapper),
/* harmony export */   UISVGWrapper: () => (/* reexport safe */ _svg_index_js__WEBPACK_IMPORTED_MODULE_1__.UISVGWrapper)
/* harmony export */ });
/* harmony import */ var _html_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./html/index.js */ "./node_modules/ziko/src/dom/wrappers/html/index.js");
/* harmony import */ var _svg_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./svg/index.js */ "./node_modules/ziko/src/dom/wrappers/svg/index.js");



/***/ },

/***/ "./node_modules/ziko/src/dom/wrappers/svg/index.js"
/*!*********************************************************!*\
  !*** ./node_modules/ziko/src/dom/wrappers/svg/index.js ***!
  \*********************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SVGWrapper: () => (/* binding */ SVGWrapper),
/* harmony export */   UISVGWrapper: () => (/* binding */ UISVGWrapper)
/* harmony export */ });
/* harmony import */ var _constructors_UIElement_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../constructors/UIElement.js */ "./node_modules/ziko/src/dom/constructors/UIElement.js");


class UISVGWrapper extends _constructors_UIElement_js__WEBPACK_IMPORTED_MODULE_0__.UIElement {
    constructor(content){
        super({element : 'div', name : 'html_wrappper'})
        this.element.append(svg2dom(content));
        this.style({
            display : 'contents'
        })
    }
}

function svg2dom(svgString) {
  if (typeof DOMParser !== "undefined") {
    const parser = new DOMParser();
    const doc = parser.parseFromString(svgString.trim(), "image/svg+xml");
    const svg = doc.documentElement;

    if (svg.nodeName === "parsererror") {
      throw new Error("Invalid SVG string");
    }
    if(svg.hasAttribute('xmlns')) return svg
    // TO Fix ...
    const {children, attributes} = svg;
    const element = document.createElementNS("http://www.w3.org/2000/svg", "svg")
    for(let {name, value} of attributes){
      element.setAttribute(name, value)
    }
    element.append(...children)

    globalThis.svg = svg
    globalThis.children = children 
    globalThis.attributes = attributes
    globalThis.element = element
    return element;
  }
  throw new Error("DOMParser is not available in this environment");
}



const SVGWrapper = (content) => new UISVGWrapper(content)


/***/ },

/***/ "./node_modules/ziko/src/events/controller/index.js"
/*!**********************************************************!*\
  !*** ./node_modules/ziko/src/events/controller/index.js ***!
  \**********************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EventController: () => (/* binding */ EventController)
/* harmony export */ });
class EventController {
  constructor(target, category){
    this.cache = {
      category,
      target,
      listeners : {},
      currentEvent : null,
      event : null,
      customEvents : new Set()
    }
  }
  get event(){
    return this.cache.event
  }
  get target(){
    return this.cache.target;
  }
  get element(){
    return this.cache.target.element;
  }
  get currentEvent(){
    return this.cache.currentEvent;
  }
  addListener(event_name, callback, {preventDefault = false, paused = false} = {}){
    this.cache.listeners[event_name] = {
      callback : e =>{
        this.cache.event = e;
        if(this.cache.listeners[event_name].preventDefault) e.preventDefault()
        if(!this.cache.listeners[event_name].paused) {
          this.cache.currentEvent = event_name;
          callback.call(this, this)
        }
      },
      preventDefault,
      paused,
    };
    this.element.addEventListener(event_name, this.cache.listeners[event_name].callback);
    return this;
  }
  removeListener(event_name){
    this.element.removeEventListener(event_name, this.cache.listeners[event_name].callback);
    return this;
  }
  pause(event_name){
    this.cache.listeners[event_name].paused = true;
    return this;
  }
  resume(event_name){
    this.cache.listeners[event_name].paused = false;
    return this;
  }
  preventDefault(event_name){
    // if(!event_name) 
    this.cache.listeners[event_name].preventDefault = true;
    return this;
  }
  useDefault(event_name){
    this.cache.listeners[event_name].preventDefault = false;
    return this;
  }
}

/***/ },

/***/ "./node_modules/ziko/src/events/custom-events-registry/click-away.js"
/*!***************************************************************************!*\
  !*** ./node_modules/ziko/src/events/custom-events-registry/click-away.js ***!
  \***************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ClickAwayEvent: () => (/* binding */ ClickAwayEvent),
/* harmony export */   register_click_away_event: () => (/* binding */ register_click_away_event)
/* harmony export */ });
class ClickAwayEvent extends Event {
  constructor(originalEvent, targetElement) {
    super("clickaway", { bubbles: true, cancelable: true });
    this.originalEvent = originalEvent;
    this.targetElement = targetElement;
  }
}

function register_click_away_event(element) {
  // console.log(element)
  function handler(e) {
    if (!element.contains(e.target)) {
      const clickAwayEvent = new ClickAwayEvent(e, element);
      element.dispatchEvent(clickAwayEvent);
    }
  }

  globalThis?.document?.addEventListener("click", handler);

  return () => globalThis?.document?.removeEventListener("click", handler);
  
}



// // Example usage
// const box = document.querySelector("#my-box");

// const stop = listenClickAway(box);

// box.addEventListener("clickaway", (e) => {
//   console.log("Clicked outside box!", e);
// });

// // later, you can stop listening:
// // stop();


/***/ },

/***/ "./node_modules/ziko/src/events/custom-events-registry/index.js"
/*!**********************************************************************!*\
  !*** ./node_modules/ziko/src/events/custom-events-registry/index.js ***!
  \**********************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ClickAwayEvent: () => (/* reexport safe */ _click_away_js__WEBPACK_IMPORTED_MODULE_0__.ClickAwayEvent),
/* harmony export */   SwipeEvent: () => (/* reexport safe */ _swipe_js__WEBPACK_IMPORTED_MODULE_2__.SwipeEvent),
/* harmony export */   ViewEvent: () => (/* reexport safe */ _view_js__WEBPACK_IMPORTED_MODULE_1__.ViewEvent),
/* harmony export */   register_click_away_event: () => (/* reexport safe */ _click_away_js__WEBPACK_IMPORTED_MODULE_0__.register_click_away_event),
/* harmony export */   register_swipe_event: () => (/* reexport safe */ _swipe_js__WEBPACK_IMPORTED_MODULE_2__.register_swipe_event),
/* harmony export */   register_view_event: () => (/* reexport safe */ _view_js__WEBPACK_IMPORTED_MODULE_1__.register_view_event)
/* harmony export */ });
/* harmony import */ var _click_away_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./click-away.js */ "./node_modules/ziko/src/events/custom-events-registry/click-away.js");
/* harmony import */ var _view_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./view.js */ "./node_modules/ziko/src/events/custom-events-registry/view.js");
/* harmony import */ var _swipe_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./swipe.js */ "./node_modules/ziko/src/events/custom-events-registry/swipe.js");




/***/ },

/***/ "./node_modules/ziko/src/events/custom-events-registry/swipe.js"
/*!**********************************************************************!*\
  !*** ./node_modules/ziko/src/events/custom-events-registry/swipe.js ***!
  \**********************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SwipeEvent: () => (/* binding */ SwipeEvent),
/* harmony export */   register_swipe_event: () => (/* binding */ register_swipe_event)
/* harmony export */ });
class SwipeEvent extends CustomEvent {
  constructor(type, detail) {
    super(type, {
      detail,
      bubbles: true,
      cancelable: true
    });
  }
}

function register_swipe_event(
  element,
  threshold = 5,
  restraint = 100,
  allowedTime = 500
) {
  let startX = 0,
      startY = 0,
      startTime = 0,
      isPointerDown = false;

  function onPointerDown(e) {
    startX = e.clientX;
    startY = e.clientY;
    startTime = performance.now();
    isPointerDown = true;
  }

  function onPointerUp(e) {
    if (!isPointerDown) return;
    isPointerDown = false;

    const distX = e.clientX - startX;
    const distY = e.clientY - startY;
    const elapsed = performance.now() - startTime;

    let direction = null;
    let eventName = null;

    if (elapsed <= allowedTime) {
      if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) {
        direction = distX < 0 ? "left" : "right";
        eventName = "swipe" + direction;
      } 
      else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint) {
        direction = distY < 0 ? "up" : "down";
        eventName = "swipe" + direction;
      }
    }

    // Emit event
    if (eventName) {
      element.dispatchEvent(
        new SwipeEvent(eventName, {
          direction,
          distX,
          distY,
          originalEvent: e
        })
      );
    }
  }

  element.addEventListener("pointerdown", onPointerDown, { passive: true });
  element.addEventListener("pointerup", onPointerUp, { passive: true });

  return () => {
    element.removeEventListener("pointerdown", onPointerDown);
    element.removeEventListener("pointerup", onPointerUp);
  };
}




/***/ },

/***/ "./node_modules/ziko/src/events/custom-events-registry/view.js"
/*!*********************************************************************!*\
  !*** ./node_modules/ziko/src/events/custom-events-registry/view.js ***!
  \*********************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ViewEvent: () => (/* binding */ ViewEvent),
/* harmony export */   register_view_event: () => (/* binding */ register_view_event)
/* harmony export */ });
/* harmony import */ var _time_decorators_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../time/decorators/index.js */ "./node_modules/ziko/src/time/decorators/index.js");

class ViewEvent extends CustomEvent {
    constructor(type, detail, { bubbles = true, cancelable = true } = {}) {
        super(type, { detail, bubbles, cancelable });
    }
}

function register_view_event(
    element,
    {
        intersection = true,
        resize = true,
        threshold = 0,
        throttleResize = 100,
        throttleEnterExit = 0
    } = {}
) {
    let intersectionObserver, resizeObserver;
    const resizeCallback = entries => {
        for (let entry of entries) {
            const { width, height } = entry.contentRect;

            element.dispatchEvent(
                new ViewEvent("resizeview", {
                    width,
                    height,
                    entry
                })
            );
        }
    };

    const throttledResize = throttleResize > 0
        ? (0,_time_decorators_index_js__WEBPACK_IMPORTED_MODULE_0__.throttle)(resizeCallback, throttleResize)
        : resizeCallback;

    const intersectionCallback = entries => {
        for (let entry of entries) {
            const type = entry.isIntersecting ? "enterview" : "exitview";
            element.dispatchEvent(new ViewEvent(type, entry));
        }
    };

    const throttledIntersections = throttleEnterExit > 0
        ? (0,_time_decorators_index_js__WEBPACK_IMPORTED_MODULE_0__.throttle)(intersectionCallback, throttleEnterExit)
        : intersectionCallback;

    if (intersection) {
        intersectionObserver = new IntersectionObserver(throttledIntersections, { threshold });
        intersectionObserver.observe(element);
    }

    if (resize) {
        resizeObserver = new ResizeObserver(throttledResize);
        resizeObserver.observe(element);
    }

    // ---- UNREGISTER ----
    return () => {
        if (intersectionObserver) {
            intersectionObserver.unobserve(element);
            intersectionObserver.disconnect();
        }
        if (resizeObserver) {
            resizeObserver.unobserve(element);
            resizeObserver.disconnect();
        }
    };
}




/***/ },

/***/ "./node_modules/ziko/src/events/index.js"
/*!***********************************************!*\
  !*** ./node_modules/ziko/src/events/index.js ***!
  \***********************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ClickAwayEvent: () => (/* reexport safe */ _custom_events_registry_index_js__WEBPACK_IMPORTED_MODULE_2__.ClickAwayEvent),
/* harmony export */   ClickListeners: () => (/* reexport safe */ _mixins_index_js__WEBPACK_IMPORTED_MODULE_1__.ClickListeners),
/* harmony export */   EventController: () => (/* reexport safe */ _controller_index_js__WEBPACK_IMPORTED_MODULE_0__.EventController),
/* harmony export */   KeyListeners: () => (/* reexport safe */ _mixins_index_js__WEBPACK_IMPORTED_MODULE_1__.KeyListeners),
/* harmony export */   PtrListeners: () => (/* reexport safe */ _mixins_index_js__WEBPACK_IMPORTED_MODULE_1__.PtrListeners),
/* harmony export */   SwipeEvent: () => (/* reexport safe */ _custom_events_registry_index_js__WEBPACK_IMPORTED_MODULE_2__.SwipeEvent),
/* harmony export */   ViewEvent: () => (/* reexport safe */ _custom_events_registry_index_js__WEBPACK_IMPORTED_MODULE_2__.ViewEvent),
/* harmony export */   ViewListeners: () => (/* reexport safe */ _mixins_index_js__WEBPACK_IMPORTED_MODULE_1__.ViewListeners),
/* harmony export */   register_click_away_event: () => (/* reexport safe */ _custom_events_registry_index_js__WEBPACK_IMPORTED_MODULE_2__.register_click_away_event),
/* harmony export */   register_swipe_event: () => (/* reexport safe */ _custom_events_registry_index_js__WEBPACK_IMPORTED_MODULE_2__.register_swipe_event),
/* harmony export */   register_view_event: () => (/* reexport safe */ _custom_events_registry_index_js__WEBPACK_IMPORTED_MODULE_2__.register_view_event)
/* harmony export */ });
/* harmony import */ var _controller_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./controller/index.js */ "./node_modules/ziko/src/events/controller/index.js");
/* harmony import */ var _mixins_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mixins/index.js */ "./node_modules/ziko/src/events/mixins/index.js");
/* harmony import */ var _custom_events_registry_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./custom-events-registry/index.js */ "./node_modules/ziko/src/events/custom-events-registry/index.js");




/***/ },

/***/ "./node_modules/ziko/src/events/mixins/click.js"
/*!******************************************************!*\
  !*** ./node_modules/ziko/src/events/mixins/click.js ***!
  \******************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ClickListeners: () => (/* binding */ ClickListeners)
/* harmony export */ });
/* harmony import */ var _custom_events_registry_click_away_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../custom-events-registry/click-away.js */ "./node_modules/ziko/src/events/custom-events-registry/click-away.js");
/* harmony import */ var _utils_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/index.js */ "./node_modules/ziko/src/events/mixins/utils/index.js");


const CATEGORY = 'click';
const ClickListeners = {
    onClick(callback){
        return this.on(
            'click', callback, 
            { category : CATEGORY })
    },
    onDblClick(callback){
        return this.on(
            'dblclick', callback, 
            { category : CATEGORY})
    },
    onClickAway(callback){
        if(!(0,_utils_index_js__WEBPACK_IMPORTED_MODULE_1__.isCustomEventRegistred)(this, CATEGORY, 'clickaway')) (0,_custom_events_registry_click_away_js__WEBPACK_IMPORTED_MODULE_0__.register_click_away_event)(this.element);
        return this.on(
            'clickaway', callback, 
            { category : CATEGORY, isCustom : true})
    },
}




/***/ },

/***/ "./node_modules/ziko/src/events/mixins/index.js"
/*!******************************************************!*\
  !*** ./node_modules/ziko/src/events/mixins/index.js ***!
  \******************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ClickListeners: () => (/* reexport safe */ _click_js__WEBPACK_IMPORTED_MODULE_0__.ClickListeners),
/* harmony export */   KeyListeners: () => (/* reexport safe */ _key_js__WEBPACK_IMPORTED_MODULE_2__.KeyListeners),
/* harmony export */   PtrListeners: () => (/* reexport safe */ _ptr_js__WEBPACK_IMPORTED_MODULE_1__.PtrListeners),
/* harmony export */   ViewListeners: () => (/* reexport safe */ _view_js__WEBPACK_IMPORTED_MODULE_3__.ViewListeners)
/* harmony export */ });
/* harmony import */ var _click_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./click.js */ "./node_modules/ziko/src/events/mixins/click.js");
/* harmony import */ var _ptr_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ptr.js */ "./node_modules/ziko/src/events/mixins/ptr.js");
/* harmony import */ var _key_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./key.js */ "./node_modules/ziko/src/events/mixins/key.js");
/* harmony import */ var _view_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./view.js */ "./node_modules/ziko/src/events/mixins/view.js");




// export * from './swipe.js'

/***/ },

/***/ "./node_modules/ziko/src/events/mixins/key.js"
/*!****************************************************!*\
  !*** ./node_modules/ziko/src/events/mixins/key.js ***!
  \****************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   KeyListeners: () => (/* binding */ KeyListeners)
/* harmony export */ });
const CATEGORY = 'key'
const KeyListeners = {
    onKeyDown(callback){
        return this.on(
            'keydown', callback, 
            { category : CATEGORY, details_setter : ctx=> { ctx.kd = ctx.event.key }
        })
    },
    onKeyPress(callback){
        return this.on(
            'keypress', callback, 
            { category : CATEGORY, details_setter : ctx=> { ctx.kp = ctx.event.key }
        })
    },
    onKeyUp(callback){
        return this.on(
            'keydown', callback, 
            { category : CATEGORY, details_setter : ctx=> { ctx.ku = ctx.event.key }
        })
    },
    
}




/***/ },

/***/ "./node_modules/ziko/src/events/mixins/ptr.js"
/*!****************************************************!*\
  !*** ./node_modules/ziko/src/events/mixins/ptr.js ***!
  \****************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PtrListeners: () => (/* binding */ PtrListeners)
/* harmony export */ });
/* harmony import */ var _utils_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/index.js */ "./node_modules/ziko/src/events/mixins/utils/index.js");

const CATEGORY = 'ptr';
const PtrListeners = {
    onPtrDown(callback, useNormalizedCoordinates = false){
        return this.on(
            'pointerdown', callback, 
            { category : CATEGORY, details_setter : (ctx)=> {
                const {x, y} = (0,_utils_index_js__WEBPACK_IMPORTED_MODULE_0__.getCoordinates)(ctx, useNormalizedCoordinates);
                ctx.dx = x;
                ctx.dy = y;
                ctx.isDown = true;
                ctx.isDragging = ctx.isMoving ?? false
            }}
        )
    },
    onPtrMove(callback, useNormalizedCoordinates = false){
        return this.on(
            'pointermove', callback, 
            { category : CATEGORY, details_setter : (ctx)=> {
                const {x, y} = (0,_utils_index_js__WEBPACK_IMPORTED_MODULE_0__.getCoordinates)(ctx, useNormalizedCoordinates);
                ctx.mx = x;
                ctx.my = y;
                ctx.isMoving = true;
                ctx.isDragging = ctx.isDown ?? false
            }}
        )
    },
    onPtrUp(callback, useNormalizedCoordinates = false){
        return this.on(
            'pointerup', callback, 
            { category : CATEGORY, details_setter : (ctx)=> {
                const {x, y} = (0,_utils_index_js__WEBPACK_IMPORTED_MODULE_0__.getCoordinates)(ctx, useNormalizedCoordinates);
                ctx.ux = x;
                ctx.uy = y;
                ctx.isDown = false;
                ctx.isMoving = false;
                ctx.isDragging = false;
            }}
        )
    }
}





/***/ },

/***/ "./node_modules/ziko/src/events/mixins/utils/index.js"
/*!************************************************************!*\
  !*** ./node_modules/ziko/src/events/mixins/utils/index.js ***!
  \************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getCoordinates: () => (/* binding */ getCoordinates),
/* harmony export */   isCustomEventRegistred: () => (/* binding */ isCustomEventRegistred)
/* harmony export */ });
const getCoordinates = (ctx, normalized = false) =>{
    const rect = ctx.element.getBoundingClientRect();
    const e = ctx.event;
    let x = (e?.clientX - rect.left) | 0;
    let y = (e?.clientY - rect.top) | 0;

    if(normalized){
        const w = ctx.element.clientWidth;
        const h = ctx.element.clientHeight;
        x = +((x / w) * 2 - 1).toFixed(8);
        y = +((y / h) * -2 + 1).toFixed(8);
    }

    return {x, y};
}

const isCustomEventRegistred = (ctx, category, event_name) => ctx.exp.events?.[category]?.cache?.customEvents?.has(event_name)

/***/ },

/***/ "./node_modules/ziko/src/events/mixins/view.js"
/*!*****************************************************!*\
  !*** ./node_modules/ziko/src/events/mixins/view.js ***!
  \*****************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ViewListeners: () => (/* binding */ ViewListeners)
/* harmony export */ });
/* harmony import */ var _custom_events_registry_view_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../custom-events-registry/view.js */ "./node_modules/ziko/src/events/custom-events-registry/view.js");

const CATEGORY = 'view';
const ViewListeners = {
    onEnterView(callback){
        if(!this.exp.events?.[CATEGORY]) (0,_custom_events_registry_view_js__WEBPACK_IMPORTED_MODULE_0__.register_view_event)(this.element);
        return this.on(
            'enterview', callback, 
            { category : CATEGORY, isCustom : true})
    },
    onExitView(callback){
        if(!this.exp.events?.[CATEGORY]) (0,_custom_events_registry_view_js__WEBPACK_IMPORTED_MODULE_0__.register_view_event)(this.element);
        return this.on(
            'exitview', callback, 
            { category : CATEGORY, isCustom : true})
    },
    onResizeView(callback){
        if(!this.exp.events?.[CATEGORY]) (0,_custom_events_registry_view_js__WEBPACK_IMPORTED_MODULE_0__.register_view_event)(this.element);
        return this.on(
            'resizeview', callback, 
            { category : CATEGORY, isCustom : true})
    },
}




/***/ },

/***/ "./node_modules/ziko/src/helpers/register/register-to-class.js"
/*!*********************************************************************!*\
  !*** ./node_modules/ziko/src/helpers/register/register-to-class.js ***!
  \*********************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   register_to_class: () => (/* binding */ register_to_class)
/* harmony export */ });
function register_to_class(target, ...mixins){
    mixins.forEach(n => _register_to_class_(target, n))
}
function _register_to_class_(target, mixin) {
  const descriptors = Object.getOwnPropertyDescriptors(mixin);
  for (const key of Reflect.ownKeys(descriptors)) {
    const desc = descriptors[key];
    if ('get' in desc || 'set' in desc || typeof desc.value !== 'function') {
      Object.defineProperty(Object.getPrototypeOf(target), key, desc);
    } else if (typeof desc.value === 'function') {
      if (!Object.getPrototypeOf(target).hasOwnProperty(key)) {
        Object.defineProperty(Object.getPrototypeOf(target), key, desc);
      }
    }
  }
}

/***/ },

/***/ "./node_modules/ziko/src/hooks/use-ipc.js"
/*!************************************************!*\
  !*** ./node_modules/ziko/src/hooks/use-ipc.js ***!
  \************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useIPC: () => (/* binding */ useIPC)
/* harmony export */ });
class UseIPC {
    #channel;
    #eventData;
    #handlers;
    #uuid;
    #subscribers;
    #currentRooms;
    constructor(name = "") {
        this.#channel = new BroadcastChannel(name);
        this.#eventData = new Map();
        this.#handlers = new Map(); // Map<event, Array<{fn, rooms}>>
        this.#uuid = "ziko-channel:" + (Math.random()*10e16);  // To Be Replaced by UUID
        this.#subscribers = new Set([this.#uuid]);
        this.#currentRooms = new Set(); 
        this.#channel.addEventListener("message", (e) => {
            const { last_sent_event, userId, eventData, rooms } = e.data;
            if (userId === this.#uuid) return; // ignore own messages
            // broadcast if no rooms, else check intersection
            if (rooms && rooms.length && !rooms.some(r => this.#currentRooms.has(r))) return;
            this.#subscribers.add(userId);
            this.#eventData = new Map(eventData);
            const handlersList = this.#handlers.get(last_sent_event);
            if (!handlersList) return;
            handlersList.forEach(({ fn, rooms: handlerRooms }) => {
                // trigger if listener has no room filter, or intersects subscriber rooms
                if (!handlerRooms || handlerRooms.length === 0 ||
                    !rooms || rooms.some(r => handlerRooms.includes(r))) {
                    fn(this.#eventData.get(last_sent_event));
                }
            });
        });
    }

    emit(event, data, rooms) {
        this.#eventData.set(event, data);
        if(typeof rooms === 'string') rooms = [rooms]
        this.#channel.postMessage({
            eventData: Array.from(this.#eventData.entries()),
            last_sent_event: event,
            userId: this.#uuid,
            rooms: rooms && rooms.length ? rooms : undefined
        });
        return this;
    }
    on(event, handler = console.log, rooms) {
        if (!this.#handlers.has(event)) this.#handlers.set(event, []);
        if(typeof rooms === 'string') rooms = [rooms]
        this.#handlers.get(event).push({ fn: handler, rooms });
        return this;
    }
    off(event, handler) {
        if (!this.#handlers.has(event)) return this;
        this.#handlers.set(
            event,
            this.#handlers.get(event).filter(h => h.fn !== handler)
        );
        return this;
    }
    once(event, handler, rooms) {
        const wrapper = (data) => {
            handler(data);
            this.off(event, wrapper);
        };
        this.on(event, wrapper, rooms);
        return this;
    }
    join(...rooms) {
        rooms.forEach(r => this.#currentRooms.add(r));
        return this;
    }
    leave(...rooms) {
        if (!rooms.length) this.#currentRooms.clear();
        else rooms.forEach(r => this.#currentRooms.delete(r));
        return this;
    }
    close() {
        this.#channel.close();
        return this;
    }
}

const useIPC = (name) => new UseIPC(name);



/***/ },

/***/ "./node_modules/ziko/src/hooks/use-state.js"
/*!**************************************************!*\
  !*** ./node_modules/ziko/src/hooks/use-state.js ***!
  \**************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isStateGetter: () => (/* binding */ isStateGetter),
/* harmony export */   useState: () => (/* binding */ useState)
/* harmony export */ });
/* harmony import */ var _ziko_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../__ziko__/index.js */ "./node_modules/ziko/src/__ziko__/index.js");


if(!globalThis.__Ziko__) (0,_ziko_index_js__WEBPACK_IMPORTED_MODULE_0__.__init__global__)()

function useState(initialValue) {
    
    const {store, index} = __Ziko__.__State__
    __Ziko__.__State__.register({
            value : initialValue,
            subscribers : new Set(),
            paused : false
    })

    let current = store.get(index);

    function getValue() {
        return {
            value: current.value,
            isStateGetter: () => true,
            _subscribe: (fn) => current.subscribers.add(fn),
        };
    }

    function setValue(newValue) {
        if (current.paused) return;
        if (typeof newValue === "function") {
            newValue = newValue(current.value);
        }
        if (newValue !== current.value) {
            current.value = newValue;
            current.subscribers.forEach(fn => fn(current.value));
            __Ziko__.__State__.update(index, newValue)
        }
    }

    const controller = {
        pause: () => { current.paused = true; },
        resume: () => { current.paused = false; },
        clear: () => { current.subscribers.clear(); },
        force: (newValue) => {
            if (typeof newValue === "function") newValue = newValue(current.value);
            current.value = newValue;
            current.subscribers.forEach(fn => fn(current.value));
        },
        getSubscribers: () => new Set(current.subscribers),
    };

    return [getValue, setValue, controller];
}


const isStateGetter = (arg) => {
    return typeof arg === 'function' && arg?.()?.isStateGetter?.();
};


/***/ },

/***/ "./node_modules/ziko/src/hooks/use-storage.js"
/*!****************************************************!*\
  !*** ./node_modules/ziko/src/hooks/use-storage.js ***!
  \****************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useLocaleStorage: () => (/* binding */ useLocaleStorage),
/* harmony export */   useSessionStorage: () => (/* binding */ useSessionStorage)
/* harmony export */ });
/* harmony import */ var _use_ipc_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./use-ipc.js */ "./node_modules/ziko/src/hooks/use-ipc.js");


class UseStorage {
    constructor(storage, globalKey, initialValue, use_channel = true) {
        this.cache = {
            storage,
            globalKey,
            channel: use_channel ? (0,_use_ipc_js__WEBPACK_IMPORTED_MODULE_0__.useIPC)(`Ziko:useStorage-${globalKey}`) : null,
            oldItemKeys: new Set()
        };

        this.#init(initialValue, use_channel);
    }

    get items() {
        const raw = this.cache.storage.getItem(this.cache.globalKey);
        if (!raw) return {};
        try {
            return JSON.parse(raw);
        } catch {
            return {};
        }
    }

    #maintain() {
        const items = this.items;
        this.cache.oldItemKeys.forEach(k => delete this[k]);
        for (const key in items) {
            this[key] = items[key];
            this.cache.oldItemKeys.add(key);
        }
    }
    #init(initialValue, use_channel) {
        if (use_channel && this.cache.channel) this.cache.channel.on("Ziko-Storage-Updated", () => this.#maintain());
        if (!initialValue) {
            this.#maintain();
            return;
        }
        if (this.cache.storage.getItem(this.cache.globalKey)) {
            const existing = this.items;
            Object.keys(existing).forEach(k => this.cache.oldItemKeys.add(k));
            this.#maintain();
        } 
        else this.set(initialValue);
    }

    set(data) {
        this.cache.storage.setItem(this.cache.globalKey, JSON.stringify(data));
        if (this.cache.channel) this.cache.channel.emit("Ziko-Storage-Updated", data);
        this.#maintain();
        return this;
    }

    add(data) {
        this.set({
            ...this.items,
            ...data
        });
        return this;
    }
    remove(...keys) {
        const items = { ...this.items };
        keys.forEach(key => {
            delete items[key];
            delete this[key];
            this.cache.oldItemKeys.delete(key);
        });
        this.set(items);
        return this;
    }
    get(key) {
        return this.items[key];
    }
    clear() {
        this.cache.storage.removeItem(this.cache.globalKey);
        this.cache.oldItemKeys.forEach(k => delete this[k]);
        this.cache.oldItemKeys.clear();
        this.#maintain();
        return this;
    }
    onStorageUpdated(callback) {
        if (this.cache.channel) {
            this.cache.channel.on("Ziko-Storage-Updated", callback);
        }
        return this;
    }
}

// factory functions
const useLocaleStorage = (key, initialValue, use_channel = true) =>
    new UseStorage(localStorage, key, initialValue, use_channel);

const useSessionStorage = (key, initialValue, use_channel = true) =>
    new UseStorage(sessionStorage, key, initialValue, use_channel);




/***/ },

/***/ "./node_modules/ziko/src/time/decorators/index.js"
/*!********************************************************!*\
  !*** ./node_modules/ziko/src/time/decorators/index.js ***!
  \********************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   debounce: () => (/* binding */ debounce),
/* harmony export */   throttle: () => (/* binding */ throttle)
/* harmony export */ });
const debounce=(fn,delay=1000)=>{
    let id;
    return(...args) => id ? clearTimeout(id) : setTimeout(()=>fn(...args),delay);
}
const throttle=(fn,delay)=>{
    let lastTime=0;
    return (...args) => {
        const now = new Date().getTime()
        if(now-lastTime < delay) return;
        lastTime = now;
        fn(...args); 
    }
}


/***/ }

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
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			var e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!****************************!*\
  !*** ./src/wiscus/view.js ***!
  \****************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_CommentsSections_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/CommentsSections.js */ "./src/components/CommentsSections.js");
/**
 * Use this file for JavaScript code that you want to run in the front-end
 * on posts/pages that contain this block.
 *
 * When this file is defined as the value of the `viewScript` property
 * in `block.json` it will be enqueued on the front end of the site.
 *
 * Example:
 *
 * ```js
 * {
 *   "viewScript": "file:./view.js"
 * }
 * ```
 *
 * If you're not making any changes to this file because your project doesn't need any
 * JavaScript running in the front-end, then you should delete this file and remove
 * the `viewScript` property from `block.json`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-metadata/#view-script
 */

/* eslint-disable no-console */
console.log('Hello World! (from create-block-wiscus block)');
/* eslint-enable no-console */

console.log((0,_components_CommentsSections_js__WEBPACK_IMPORTED_MODULE_0__.CommentsSection)());
})();

/******/ })()
;
//# sourceMappingURL=view.js.map