/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@lit/reactive-element/development/css-tag.js"
/*!*******************************************************************!*\
  !*** ./node_modules/@lit/reactive-element/development/css-tag.js ***!
  \*******************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CSSResult: () => (/* binding */ CSSResult),
/* harmony export */   adoptStyles: () => (/* binding */ adoptStyles),
/* harmony export */   css: () => (/* binding */ css),
/* harmony export */   getCompatibleStyle: () => (/* binding */ getCompatibleStyle),
/* harmony export */   supportsAdoptingStyleSheets: () => (/* binding */ supportsAdoptingStyleSheets),
/* harmony export */   unsafeCSS: () => (/* binding */ unsafeCSS)
/* harmony export */ });
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const NODE_MODE = false;
// Allows minifiers to rename references to globalThis
const global = globalThis;
/**
 * Whether the current browser supports `adoptedStyleSheets`.
 */
const supportsAdoptingStyleSheets = global.ShadowRoot &&
    (global.ShadyCSS === undefined || global.ShadyCSS.nativeShadow) &&
    'adoptedStyleSheets' in Document.prototype &&
    'replace' in CSSStyleSheet.prototype;
const constructionToken = Symbol();
const cssTagCache = new WeakMap();
/**
 * A container for a string of CSS text, that may be used to create a CSSStyleSheet.
 *
 * CSSResult is the return value of `css`-tagged template literals and
 * `unsafeCSS()`. In order to ensure that CSSResults are only created via the
 * `css` tag and `unsafeCSS()`, CSSResult cannot be constructed directly.
 */
class CSSResult {
    constructor(cssText, strings, safeToken) {
        // This property needs to remain unminified.
        this['_$cssResult$'] = true;
        if (safeToken !== constructionToken) {
            throw new Error('CSSResult is not constructable. Use `unsafeCSS` or `css` instead.');
        }
        this.cssText = cssText;
        this._strings = strings;
    }
    // This is a getter so that it's lazy. In practice, this means stylesheets
    // are not created until the first element instance is made.
    get styleSheet() {
        // If `supportsAdoptingStyleSheets` is true then we assume CSSStyleSheet is
        // constructable.
        let styleSheet = this._styleSheet;
        const strings = this._strings;
        if (supportsAdoptingStyleSheets && styleSheet === undefined) {
            const cacheable = strings !== undefined && strings.length === 1;
            if (cacheable) {
                styleSheet = cssTagCache.get(strings);
            }
            if (styleSheet === undefined) {
                (this._styleSheet = styleSheet = new CSSStyleSheet()).replaceSync(this.cssText);
                if (cacheable) {
                    cssTagCache.set(strings, styleSheet);
                }
            }
        }
        return styleSheet;
    }
    toString() {
        return this.cssText;
    }
}
const textFromCSSResult = (value) => {
    // This property needs to remain unminified.
    if (value['_$cssResult$'] === true) {
        return value.cssText;
    }
    else if (typeof value === 'number') {
        return value;
    }
    else {
        throw new Error(`Value passed to 'css' function must be a 'css' function result: ` +
            `${value}. Use 'unsafeCSS' to pass non-literal values, but take care ` +
            `to ensure page security.`);
    }
};
/**
 * Wrap a value for interpolation in a {@linkcode css} tagged template literal.
 *
 * This is unsafe because untrusted CSS text can be used to phone home
 * or exfiltrate data to an attacker controlled site. Take care to only use
 * this with trusted input.
 */
const unsafeCSS = (value) => new CSSResult(typeof value === 'string' ? value : String(value), undefined, constructionToken);
/**
 * A template literal tag which can be used with LitElement's
 * {@linkcode LitElement.styles} property to set element styles.
 *
 * For security reasons, only literal string values and number may be used in
 * embedded expressions. To incorporate non-literal values {@linkcode unsafeCSS}
 * may be used inside an expression.
 */
const css = (strings, ...values) => {
    const cssText = strings.length === 1
        ? strings[0]
        : values.reduce((acc, v, idx) => acc + textFromCSSResult(v) + strings[idx + 1], strings[0]);
    return new CSSResult(cssText, strings, constructionToken);
};
/**
 * Applies the given styles to a `shadowRoot`. When Shadow DOM is
 * available but `adoptedStyleSheets` is not, styles are appended to the
 * `shadowRoot` to [mimic the native feature](https://developer.mozilla.org/en-US/docs/Web/API/ShadowRoot/adoptedStyleSheets).
 * Note, when shimming is used, any styles that are subsequently placed into
 * the shadowRoot should be placed *before* any shimmed adopted styles. This
 * will match spec behavior that gives adopted sheets precedence over styles in
 * shadowRoot.
 */
const adoptStyles = (renderRoot, styles) => {
    if (supportsAdoptingStyleSheets) {
        renderRoot.adoptedStyleSheets = styles.map((s) => s instanceof CSSStyleSheet ? s : s.styleSheet);
    }
    else {
        for (const s of styles) {
            const style = document.createElement('style');
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const nonce = global['litNonce'];
            if (nonce !== undefined) {
                style.setAttribute('nonce', nonce);
            }
            style.textContent = s.cssText;
            renderRoot.appendChild(style);
        }
    }
};
const cssResultFromStyleSheet = (sheet) => {
    let cssText = '';
    for (const rule of sheet.cssRules) {
        cssText += rule.cssText;
    }
    return unsafeCSS(cssText);
};
const getCompatibleStyle = supportsAdoptingStyleSheets ||
    (NODE_MODE && global.CSSStyleSheet === undefined)
    ? (s) => s
    : (s) => s instanceof CSSStyleSheet ? cssResultFromStyleSheet(s) : s;
//# sourceMappingURL=css-tag.js.map

/***/ },

/***/ "./node_modules/@lit/reactive-element/development/decorators/base.js"
/*!***************************************************************************!*\
  !*** ./node_modules/@lit/reactive-element/development/decorators/base.js ***!
  \***************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   desc: () => (/* binding */ desc)
/* harmony export */ });
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * Wraps up a few best practices when returning a property descriptor from a
 * decorator.
 *
 * Marks the defined property as configurable, and enumerable, and handles
 * the case where we have a busted Reflect.decorate zombiefill (e.g. in Angular
 * apps).
 *
 * @internal
 */
const desc = (obj, name, descriptor) => {
    // For backwards compatibility, we keep them configurable and enumerable.
    descriptor.configurable = true;
    descriptor.enumerable = true;
    if (
    // We check for Reflect.decorate each time, in case the zombiefill
    // is applied via lazy loading some Angular code.
    Reflect.decorate &&
        typeof name !== 'object') {
        // If we're called as a legacy decorator, and Reflect.decorate is present
        // then we have no guarantees that the returned descriptor will be
        // defined on the class, so we must apply it directly ourselves.
        Object.defineProperty(obj, name, descriptor);
    }
    return descriptor;
};
//# sourceMappingURL=base.js.map

/***/ },

/***/ "./node_modules/@lit/reactive-element/development/decorators/custom-element.js"
/*!*************************************************************************************!*\
  !*** ./node_modules/@lit/reactive-element/development/decorators/custom-element.js ***!
  \*************************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   customElement: () => (/* binding */ customElement)
/* harmony export */ });
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * Class decorator factory that defines the decorated class as a custom element.
 *
 * ```js
 * @customElement('my-element')
 * class MyElement extends LitElement {
 *   render() {
 *     return html``;
 *   }
 * }
 * ```
 * @category Decorator
 * @param tagName The tag name of the custom element to define.
 */
const customElement = (tagName) => (classOrTarget, context) => {
    if (context !== undefined) {
        context.addInitializer(() => {
            customElements.define(tagName, classOrTarget);
        });
    }
    else {
        customElements.define(tagName, classOrTarget);
    }
};
//# sourceMappingURL=custom-element.js.map

/***/ },

/***/ "./node_modules/@lit/reactive-element/development/decorators/event-options.js"
/*!************************************************************************************!*\
  !*** ./node_modules/@lit/reactive-element/development/decorators/event-options.js ***!
  \************************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   eventOptions: () => (/* binding */ eventOptions)
/* harmony export */ });
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * Adds event listener options to a method used as an event listener in a
 * lit-html template.
 *
 * @param options An object that specifies event listener options as accepted by
 * `EventTarget#addEventListener` and `EventTarget#removeEventListener`.
 *
 * Current browsers support the `capture`, `passive`, and `once` options. See:
 * https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#Parameters
 *
 * ```ts
 * class MyElement {
 *   clicked = false;
 *
 *   render() {
 *     return html`
 *       <div @click=${this._onClick}>
 *         <button></button>
 *       </div>
 *     `;
 *   }
 *
 *   @eventOptions({capture: true})
 *   _onClick(e) {
 *     this.clicked = true;
 *   }
 * }
 * ```
 * @category Decorator
 */
function eventOptions(options) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return ((protoOrValue, nameOrContext) => {
        const method = typeof protoOrValue === 'function'
            ? protoOrValue
            : protoOrValue[nameOrContext];
        Object.assign(method, options);
    });
}
//# sourceMappingURL=event-options.js.map

/***/ },

/***/ "./node_modules/@lit/reactive-element/development/decorators/property.js"
/*!*******************************************************************************!*\
  !*** ./node_modules/@lit/reactive-element/development/decorators/property.js ***!
  \*******************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   property: () => (/* binding */ property),
/* harmony export */   standardProperty: () => (/* binding */ standardProperty)
/* harmony export */ });
/* harmony import */ var _reactive_element_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../reactive-element.js */ "./node_modules/@lit/reactive-element/development/reactive-element.js");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/*
 * IMPORTANT: For compatibility with tsickle and the Closure JS compiler, all
 * property decorators (but not class decorators) in this file that have
 * an @ExportDecoratedItems annotation must be defined as a regular function,
 * not an arrow function.
 */

const DEV_MODE = true;
let issueWarning;
if (DEV_MODE) {
    // Ensure warnings are issued only 1x, even if multiple versions of Lit
    // are loaded.
    globalThis.litIssuedWarnings ??= new Set();
    /**
     * Issue a warning if we haven't already, based either on `code` or `warning`.
     * Warnings are disabled automatically only by `warning`; disabling via `code`
     * can be done by users.
     */
    issueWarning = (code, warning) => {
        warning += ` See https://lit.dev/msg/${code} for more information.`;
        if (!globalThis.litIssuedWarnings.has(warning) &&
            !globalThis.litIssuedWarnings.has(code)) {
            console.warn(warning);
            globalThis.litIssuedWarnings.add(warning);
        }
    };
}
const legacyProperty = (options, proto, name) => {
    const hasOwnProperty = proto.hasOwnProperty(name);
    proto.constructor.createProperty(name, options);
    // For accessors (which have a descriptor on the prototype) we need to
    // return a descriptor, otherwise TypeScript overwrites the descriptor we
    // define in createProperty() with the original descriptor. We don't do this
    // for fields, which don't have a descriptor, because this could overwrite
    // descriptor defined by other decorators.
    return hasOwnProperty
        ? Object.getOwnPropertyDescriptor(proto, name)
        : undefined;
};
// This is duplicated from a similar variable in reactive-element.ts, but
// actually makes sense to have this default defined with the decorator, so
// that different decorators could have different defaults.
const defaultPropertyDeclaration = {
    attribute: true,
    type: String,
    converter: _reactive_element_js__WEBPACK_IMPORTED_MODULE_0__.defaultConverter,
    reflect: false,
    hasChanged: _reactive_element_js__WEBPACK_IMPORTED_MODULE_0__.notEqual,
};
/**
 * Wraps a class accessor or setter so that `requestUpdate()` is called with the
 * property name and old value when the accessor is set.
 */
const standardProperty = (options = defaultPropertyDeclaration, target, context) => {
    const { kind, metadata } = context;
    if (DEV_MODE && metadata == null) {
        issueWarning('missing-class-metadata', `The class ${target} is missing decorator metadata. This ` +
            `could mean that you're using a compiler that supports decorators ` +
            `but doesn't support decorator metadata, such as TypeScript 5.1. ` +
            `Please update your compiler.`);
    }
    // Store the property options
    let properties = globalThis.litPropertyMetadata.get(metadata);
    if (properties === undefined) {
        globalThis.litPropertyMetadata.set(metadata, (properties = new Map()));
    }
    if (kind === 'setter') {
        options = Object.create(options);
        options.wrapped = true;
    }
    properties.set(context.name, options);
    if (kind === 'accessor') {
        // Standard decorators cannot dynamically modify the class, so we can't
        // replace a field with accessors. The user must use the new `accessor`
        // keyword instead.
        const { name } = context;
        return {
            set(v) {
                const oldValue = target.get.call(this);
                target.set.call(this, v);
                this.requestUpdate(name, oldValue, options, true, v);
            },
            init(v) {
                if (v !== undefined) {
                    this._$changeProperty(name, undefined, options, v);
                }
                return v;
            },
        };
    }
    else if (kind === 'setter') {
        const { name } = context;
        return function (value) {
            const oldValue = this[name];
            target.call(this, value);
            this.requestUpdate(name, oldValue, options, true, value);
        };
    }
    throw new Error(`Unsupported decorator location: ${kind}`);
};
/**
 * A class field or accessor decorator which creates a reactive property that
 * reflects a corresponding attribute value. When a decorated property is set
 * the element will update and render. A {@linkcode PropertyDeclaration} may
 * optionally be supplied to configure property features.
 *
 * This decorator should only be used for public fields. As public fields,
 * properties should be considered as primarily settable by element users,
 * either via attribute or the property itself.
 *
 * Generally, properties that are changed by the element should be private or
 * protected fields and should use the {@linkcode state} decorator.
 *
 * However, sometimes element code does need to set a public property. This
 * should typically only be done in response to user interaction, and an event
 * should be fired informing the user; for example, a checkbox sets its
 * `checked` property when clicked and fires a `changed` event. Mutating public
 * properties should typically not be done for non-primitive (object or array)
 * properties. In other cases when an element needs to manage state, a private
 * property decorated via the {@linkcode state} decorator should be used. When
 * needed, state properties can be initialized via public properties to
 * facilitate complex interactions.
 *
 * ```ts
 * class MyElement {
 *   @property({ type: Boolean })
 *   clicked = false;
 * }
 * ```
 * @category Decorator
 * @ExportDecoratedItems
 */
function property(options) {
    return (protoOrTarget, nameOrContext
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ) => {
        return (typeof nameOrContext === 'object'
            ? standardProperty(options, protoOrTarget, nameOrContext)
            : legacyProperty(options, protoOrTarget, nameOrContext));
    };
}
//# sourceMappingURL=property.js.map

/***/ },

/***/ "./node_modules/@lit/reactive-element/development/decorators/query-all.js"
/*!********************************************************************************!*\
  !*** ./node_modules/@lit/reactive-element/development/decorators/query-all.js ***!
  \********************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   queryAll: () => (/* binding */ queryAll)
/* harmony export */ });
/* harmony import */ var _base_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base.js */ "./node_modules/@lit/reactive-element/development/decorators/base.js");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

// Shared fragment used to generate empty NodeLists when a render root is
// undefined
let fragment;
/**
 * A property decorator that converts a class property into a getter
 * that executes a querySelectorAll on the element's renderRoot.
 *
 * @param selector A DOMString containing one or more selectors to match.
 *
 * See:
 * https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll
 *
 * ```ts
 * class MyElement {
 *   @queryAll('div')
 *   divs: NodeListOf<HTMLDivElement>;
 *
 *   render() {
 *     return html`
 *       <div id="first"></div>
 *       <div id="second"></div>
 *     `;
 *   }
 * }
 * ```
 * @category Decorator
 */
function queryAll(selector) {
    return ((obj, name) => {
        return (0,_base_js__WEBPACK_IMPORTED_MODULE_0__.desc)(obj, name, {
            get() {
                const container = this.renderRoot ?? (fragment ??= document.createDocumentFragment());
                return container.querySelectorAll(selector);
            },
        });
    });
}
//# sourceMappingURL=query-all.js.map

/***/ },

/***/ "./node_modules/@lit/reactive-element/development/decorators/query-assigned-elements.js"
/*!**********************************************************************************************!*\
  !*** ./node_modules/@lit/reactive-element/development/decorators/query-assigned-elements.js ***!
  \**********************************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   queryAssignedElements: () => (/* binding */ queryAssignedElements)
/* harmony export */ });
/* harmony import */ var _base_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base.js */ "./node_modules/@lit/reactive-element/development/decorators/base.js");
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

/**
 * A property decorator that converts a class property into a getter that
 * returns the `assignedElements` of the given `slot`. Provides a declarative
 * way to use
 * [`HTMLSlotElement.assignedElements`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLSlotElement/assignedElements).
 *
 * Can be passed an optional {@linkcode QueryAssignedElementsOptions} object.
 *
 * Example usage:
 * ```ts
 * class MyElement {
 *   @queryAssignedElements({ slot: 'list' })
 *   listItems!: Array<HTMLElement>;
 *   @queryAssignedElements()
 *   unnamedSlotEls!: Array<HTMLElement>;
 *
 *   render() {
 *     return html`
 *       <slot name="list"></slot>
 *       <slot></slot>
 *     `;
 *   }
 * }
 * ```
 *
 * Note, the type of this property should be annotated as `Array<HTMLElement>`.
 *
 * @category Decorator
 */
function queryAssignedElements(options) {
    return ((obj, name) => {
        const { slot, selector } = options ?? {};
        const slotSelector = `slot${slot ? `[name=${slot}]` : ':not([name])'}`;
        return (0,_base_js__WEBPACK_IMPORTED_MODULE_0__.desc)(obj, name, {
            get() {
                const slotEl = this.renderRoot?.querySelector(slotSelector);
                const elements = slotEl?.assignedElements(options) ?? [];
                return (selector === undefined
                    ? elements
                    : elements.filter((node) => node.matches(selector)));
            },
        });
    });
}
//# sourceMappingURL=query-assigned-elements.js.map

/***/ },

/***/ "./node_modules/@lit/reactive-element/development/decorators/query-assigned-nodes.js"
/*!*******************************************************************************************!*\
  !*** ./node_modules/@lit/reactive-element/development/decorators/query-assigned-nodes.js ***!
  \*******************************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   queryAssignedNodes: () => (/* binding */ queryAssignedNodes)
/* harmony export */ });
/* harmony import */ var _base_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base.js */ "./node_modules/@lit/reactive-element/development/decorators/base.js");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

/**
 * A property decorator that converts a class property into a getter that
 * returns the `assignedNodes` of the given `slot`.
 *
 * Can be passed an optional {@linkcode QueryAssignedNodesOptions} object.
 *
 * Example usage:
 * ```ts
 * class MyElement {
 *   @queryAssignedNodes({slot: 'list', flatten: true})
 *   listItems!: Array<Node>;
 *
 *   render() {
 *     return html`
 *       <slot name="list"></slot>
 *     `;
 *   }
 * }
 * ```
 *
 * Note the type of this property should be annotated as `Array<Node>`. Use the
 * queryAssignedElements decorator to list only elements, and optionally filter
 * the element list using a CSS selector.
 *
 * @category Decorator
 */
function queryAssignedNodes(options) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return ((obj, name) => {
        const { slot } = options ?? {};
        const slotSelector = `slot${slot ? `[name=${slot}]` : ':not([name])'}`;
        return (0,_base_js__WEBPACK_IMPORTED_MODULE_0__.desc)(obj, name, {
            get() {
                const slotEl = this.renderRoot?.querySelector(slotSelector);
                return (slotEl?.assignedNodes(options) ?? []);
            },
        });
    });
}
//# sourceMappingURL=query-assigned-nodes.js.map

/***/ },

/***/ "./node_modules/@lit/reactive-element/development/decorators/query-async.js"
/*!**********************************************************************************!*\
  !*** ./node_modules/@lit/reactive-element/development/decorators/query-async.js ***!
  \**********************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   queryAsync: () => (/* binding */ queryAsync)
/* harmony export */ });
/* harmony import */ var _base_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base.js */ "./node_modules/@lit/reactive-element/development/decorators/base.js");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

// Note, in the future, we may extend this decorator to support the use case
// where the queried element may need to do work to become ready to interact
// with (e.g. load some implementation code). If so, we might elect to
// add a second argument defining a function that can be run to make the
// queried element loaded/updated/ready.
/**
 * A property decorator that converts a class property into a getter that
 * returns a promise that resolves to the result of a querySelector on the
 * element's renderRoot done after the element's `updateComplete` promise
 * resolves. When the queried property may change with element state, this
 * decorator can be used instead of requiring users to await the
 * `updateComplete` before accessing the property.
 *
 * @param selector A DOMString containing one or more selectors to match.
 *
 * See: https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector
 *
 * ```ts
 * class MyElement {
 *   @queryAsync('#first')
 *   first: Promise<HTMLDivElement>;
 *
 *   render() {
 *     return html`
 *       <div id="first"></div>
 *       <div id="second"></div>
 *     `;
 *   }
 * }
 *
 * // external usage
 * async doSomethingWithFirst() {
 *  (await aMyElement.first).doSomething();
 * }
 * ```
 * @category Decorator
 */
function queryAsync(selector) {
    return ((obj, name) => {
        return (0,_base_js__WEBPACK_IMPORTED_MODULE_0__.desc)(obj, name, {
            async get() {
                await this.updateComplete;
                return this.renderRoot?.querySelector(selector) ?? null;
            },
        });
    });
}
//# sourceMappingURL=query-async.js.map

/***/ },

/***/ "./node_modules/@lit/reactive-element/development/decorators/query.js"
/*!****************************************************************************!*\
  !*** ./node_modules/@lit/reactive-element/development/decorators/query.js ***!
  \****************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   query: () => (/* binding */ query)
/* harmony export */ });
/* harmony import */ var _base_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base.js */ "./node_modules/@lit/reactive-element/development/decorators/base.js");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

const DEV_MODE = true;
let issueWarning;
if (DEV_MODE) {
    // Ensure warnings are issued only 1x, even if multiple versions of Lit
    // are loaded.
    globalThis.litIssuedWarnings ??= new Set();
    /**
     * Issue a warning if we haven't already, based either on `code` or `warning`.
     * Warnings are disabled automatically only by `warning`; disabling via `code`
     * can be done by users.
     */
    issueWarning = (code, warning) => {
        warning += code
            ? ` See https://lit.dev/msg/${code} for more information.`
            : '';
        if (!globalThis.litIssuedWarnings.has(warning) &&
            !globalThis.litIssuedWarnings.has(code)) {
            console.warn(warning);
            globalThis.litIssuedWarnings.add(warning);
        }
    };
}
/**
 * A property decorator that converts a class property into a getter that
 * executes a querySelector on the element's renderRoot.
 *
 * @param selector A DOMString containing one or more selectors to match.
 * @param cache An optional boolean which when true performs the DOM query only
 *     once and caches the result.
 *
 * See: https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector
 *
 * ```ts
 * class MyElement {
 *   @query('#first')
 *   first: HTMLDivElement;
 *
 *   render() {
 *     return html`
 *       <div id="first"></div>
 *       <div id="second"></div>
 *     `;
 *   }
 * }
 * ```
 * @category Decorator
 */
function query(selector, cache) {
    return ((protoOrTarget, nameOrContext, descriptor) => {
        const doQuery = (el) => {
            const result = (el.renderRoot?.querySelector(selector) ?? null);
            if (DEV_MODE && result === null && cache && !el.hasUpdated) {
                const name = typeof nameOrContext === 'object'
                    ? nameOrContext.name
                    : nameOrContext;
                issueWarning('', `@query'd field ${JSON.stringify(String(name))} with the 'cache' ` +
                    `flag set for selector '${selector}' has been accessed before ` +
                    `the first update and returned null. This is expected if the ` +
                    `renderRoot tree has not been provided beforehand (e.g. via ` +
                    `Declarative Shadow DOM). Therefore the value hasn't been cached.`);
            }
            // TODO: if we want to allow users to assert that the query will never
            // return null, we need a new option and to throw here if the result
            // is null.
            return result;
        };
        if (cache) {
            // Accessors to wrap from either:
            //   1. The decorator target, in the case of standard decorators
            //   2. The property descriptor, in the case of experimental decorators
            //      on auto-accessors.
            //   3. Functions that access our own cache-key property on the instance,
            //      in the case of experimental decorators on fields.
            const { get, set } = typeof nameOrContext === 'object'
                ? protoOrTarget
                : (descriptor ??
                    (() => {
                        const key = DEV_MODE
                            ? Symbol(`${String(nameOrContext)} (@query() cache)`)
                            : Symbol();
                        return {
                            get() {
                                return this[key];
                            },
                            set(v) {
                                this[key] = v;
                            },
                        };
                    })());
            return (0,_base_js__WEBPACK_IMPORTED_MODULE_0__.desc)(protoOrTarget, nameOrContext, {
                get() {
                    let result = get.call(this);
                    if (result === undefined) {
                        result = doQuery(this);
                        if (result !== null || this.hasUpdated) {
                            set.call(this, result);
                        }
                    }
                    return result;
                },
            });
        }
        else {
            // This object works as the return type for both standard and
            // experimental decorators.
            return (0,_base_js__WEBPACK_IMPORTED_MODULE_0__.desc)(protoOrTarget, nameOrContext, {
                get() {
                    return doQuery(this);
                },
            });
        }
    });
}
//# sourceMappingURL=query.js.map

/***/ },

/***/ "./node_modules/@lit/reactive-element/development/decorators/state.js"
/*!****************************************************************************!*\
  !*** ./node_modules/@lit/reactive-element/development/decorators/state.js ***!
  \****************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   state: () => (/* binding */ state)
/* harmony export */ });
/* harmony import */ var _property_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./property.js */ "./node_modules/@lit/reactive-element/development/decorators/property.js");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/*
 * IMPORTANT: For compatibility with tsickle and the Closure JS compiler, all
 * property decorators (but not class decorators) in this file that have
 * an @ExportDecoratedItems annotation must be defined as a regular function,
 * not an arrow function.
 */

/**
 * Declares a private or protected reactive property that still triggers
 * updates to the element when it changes. It does not reflect from the
 * corresponding attribute.
 *
 * Properties declared this way must not be used from HTML or HTML templating
 * systems, they're solely for properties internal to the element. These
 * properties may be renamed by optimization tools like closure compiler.
 * @category Decorator
 */
function state(options) {
    return (0,_property_js__WEBPACK_IMPORTED_MODULE_0__.property)({
        ...options,
        // Add both `state` and `attribute` because we found a third party
        // controller that is keying off of PropertyOptions.state to determine
        // whether a field is a private internal property or not.
        state: true,
        attribute: false,
    });
}
//# sourceMappingURL=state.js.map

/***/ },

/***/ "./node_modules/@lit/reactive-element/development/reactive-element.js"
/*!****************************************************************************!*\
  !*** ./node_modules/@lit/reactive-element/development/reactive-element.js ***!
  \****************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CSSResult: () => (/* reexport safe */ _css_tag_js__WEBPACK_IMPORTED_MODULE_0__.CSSResult),
/* harmony export */   ReactiveElement: () => (/* binding */ ReactiveElement),
/* harmony export */   adoptStyles: () => (/* reexport safe */ _css_tag_js__WEBPACK_IMPORTED_MODULE_0__.adoptStyles),
/* harmony export */   css: () => (/* reexport safe */ _css_tag_js__WEBPACK_IMPORTED_MODULE_0__.css),
/* harmony export */   defaultConverter: () => (/* binding */ defaultConverter),
/* harmony export */   getCompatibleStyle: () => (/* reexport safe */ _css_tag_js__WEBPACK_IMPORTED_MODULE_0__.getCompatibleStyle),
/* harmony export */   notEqual: () => (/* binding */ notEqual),
/* harmony export */   supportsAdoptingStyleSheets: () => (/* reexport safe */ _css_tag_js__WEBPACK_IMPORTED_MODULE_0__.supportsAdoptingStyleSheets),
/* harmony export */   unsafeCSS: () => (/* reexport safe */ _css_tag_js__WEBPACK_IMPORTED_MODULE_0__.unsafeCSS)
/* harmony export */ });
/* harmony import */ var _css_tag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./css-tag.js */ "./node_modules/@lit/reactive-element/development/css-tag.js");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * Use this module if you want to create your own base class extending
 * {@link ReactiveElement}.
 * @packageDocumentation
 */

// In the Node build, this import will be injected by Rollup:
// import {HTMLElement, customElements} from '@lit-labs/ssr-dom-shim';

// TODO (justinfagnani): Add `hasOwn` here when we ship ES2022
const { is, defineProperty, getOwnPropertyDescriptor, getOwnPropertyNames, getOwnPropertySymbols, getPrototypeOf, } = Object;
const NODE_MODE = false;
// Lets a minifier replace globalThis references with a minified name
const global = globalThis;
if (NODE_MODE) {
    global.customElements ??= customElements;
}
const DEV_MODE = true;
let issueWarning;
const trustedTypes = global
    .trustedTypes;
// Temporary workaround for https://crbug.com/993268
// Currently, any attribute starting with "on" is considered to be a
// TrustedScript source. Such boolean attributes must be set to the equivalent
// trusted emptyScript value.
const emptyStringForBooleanAttribute = trustedTypes
    ? trustedTypes.emptyScript
    : '';
const polyfillSupport = DEV_MODE
    ? global.reactiveElementPolyfillSupportDevMode
    : global.reactiveElementPolyfillSupport;
if (DEV_MODE) {
    // Ensure warnings are issued only 1x, even if multiple versions of Lit
    // are loaded.
    global.litIssuedWarnings ??= new Set();
    /**
     * Issue a warning if we haven't already, based either on `code` or `warning`.
     * Warnings are disabled automatically only by `warning`; disabling via `code`
     * can be done by users.
     */
    issueWarning = (code, warning) => {
        warning += ` See https://lit.dev/msg/${code} for more information.`;
        if (!global.litIssuedWarnings.has(warning) &&
            !global.litIssuedWarnings.has(code)) {
            console.warn(warning);
            global.litIssuedWarnings.add(warning);
        }
    };
    queueMicrotask(() => {
        issueWarning('dev-mode', `Lit is in dev mode. Not recommended for production!`);
        // Issue polyfill support warning.
        if (global.ShadyDOM?.inUse && polyfillSupport === undefined) {
            issueWarning('polyfill-support-missing', `Shadow DOM is being polyfilled via \`ShadyDOM\` but ` +
                `the \`polyfill-support\` module has not been loaded.`);
        }
    });
}
/**
 * Useful for visualizing and logging insights into what the Lit template system is doing.
 *
 * Compiled out of prod mode builds.
 */
const debugLogEvent = DEV_MODE
    ? (event) => {
        const shouldEmit = global
            .emitLitDebugLogEvents;
        if (!shouldEmit) {
            return;
        }
        global.dispatchEvent(new CustomEvent('lit-debug', {
            detail: event,
        }));
    }
    : undefined;
/*
 * When using Closure Compiler, JSCompiler_renameProperty(property, object) is
 * replaced at compile time by the munged name for object[property]. We cannot
 * alias this function, so we have to use a small shim that has the same
 * behavior when not compiling.
 */
/*@__INLINE__*/
const JSCompiler_renameProperty = (prop, _obj) => prop;
const defaultConverter = {
    toAttribute(value, type) {
        switch (type) {
            case Boolean:
                value = value ? emptyStringForBooleanAttribute : null;
                break;
            case Object:
            case Array:
                // if the value is `null` or `undefined` pass this through
                // to allow removing/no change behavior.
                value = value == null ? value : JSON.stringify(value);
                break;
        }
        return value;
    },
    fromAttribute(value, type) {
        let fromValue = value;
        switch (type) {
            case Boolean:
                fromValue = value !== null;
                break;
            case Number:
                fromValue = value === null ? null : Number(value);
                break;
            case Object:
            case Array:
                // Do *not* generate exception when invalid JSON is set as elements
                // don't normally complain on being mis-configured.
                // TODO(sorvell): Do generate exception in *dev mode*.
                try {
                    // Assert to adhere to Bazel's "must type assert JSON parse" rule.
                    fromValue = JSON.parse(value);
                }
                catch (e) {
                    fromValue = null;
                }
                break;
        }
        return fromValue;
    },
};
/**
 * Change function that returns true if `value` is different from `oldValue`.
 * This method is used as the default for a property's `hasChanged` function.
 */
const notEqual = (value, old) => !is(value, old);
const defaultPropertyDeclaration = {
    attribute: true,
    type: String,
    converter: defaultConverter,
    reflect: false,
    useDefault: false,
    hasChanged: notEqual,
};
// Ensure metadata is enabled. TypeScript does not polyfill
// Symbol.metadata, so we must ensure that it exists.
Symbol.metadata ??= Symbol('metadata');
// Map from a class's metadata object to property options
// Note that we must use nullish-coalescing assignment so that we only use one
// map even if we load multiple version of this module.
global.litPropertyMetadata ??= new WeakMap();
/**
 * Base element class which manages element properties and attributes. When
 * properties change, the `update` method is asynchronously called. This method
 * should be supplied by subclasses to render updates as desired.
 * @noInheritDoc
 */
class ReactiveElement
// In the Node build, this `extends` clause will be substituted with
// `(globalThis.HTMLElement ?? HTMLElement)`.
//
// This way, we will first prefer any global `HTMLElement` polyfill that the
// user has assigned, and then fall back to the `HTMLElement` shim which has
// been imported (see note at the top of this file about how this import is
// generated by Rollup). Note that the `HTMLElement` variable has been
// shadowed by this import, so it no longer refers to the global.
 extends HTMLElement {
    /**
     * Adds an initializer function to the class that is called during instance
     * construction.
     *
     * This is useful for code that runs against a `ReactiveElement`
     * subclass, such as a decorator, that needs to do work for each
     * instance, such as setting up a `ReactiveController`.
     *
     * ```ts
     * const myDecorator = (target: typeof ReactiveElement, key: string) => {
     *   target.addInitializer((instance: ReactiveElement) => {
     *     // This is run during construction of the element
     *     new MyController(instance);
     *   });
     * }
     * ```
     *
     * Decorating a field will then cause each instance to run an initializer
     * that adds a controller:
     *
     * ```ts
     * class MyElement extends LitElement {
     *   @myDecorator foo;
     * }
     * ```
     *
     * Initializers are stored per-constructor. Adding an initializer to a
     * subclass does not add it to a superclass. Since initializers are run in
     * constructors, initializers will run in order of the class hierarchy,
     * starting with superclasses and progressing to the instance's class.
     *
     * @nocollapse
     */
    static addInitializer(initializer) {
        this.__prepare();
        (this._initializers ??= []).push(initializer);
    }
    /**
     * Returns a list of attributes corresponding to the registered properties.
     * @nocollapse
     * @category attributes
     */
    static get observedAttributes() {
        // Ensure we've created all properties
        this.finalize();
        // this.__attributeToPropertyMap is only undefined after finalize() in
        // ReactiveElement itself. ReactiveElement.observedAttributes is only
        // accessed with ReactiveElement as the receiver when a subclass or mixin
        // calls super.observedAttributes
        return (this.__attributeToPropertyMap && [...this.__attributeToPropertyMap.keys()]);
    }
    /**
     * Creates a property accessor on the element prototype if one does not exist
     * and stores a {@linkcode PropertyDeclaration} for the property with the
     * given options. The property setter calls the property's `hasChanged`
     * property option or uses a strict identity check to determine whether or not
     * to request an update.
     *
     * This method may be overridden to customize properties; however,
     * when doing so, it's important to call `super.createProperty` to ensure
     * the property is setup correctly. This method calls
     * `getPropertyDescriptor` internally to get a descriptor to install.
     * To customize what properties do when they are get or set, override
     * `getPropertyDescriptor`. To customize the options for a property,
     * implement `createProperty` like this:
     *
     * ```ts
     * static createProperty(name, options) {
     *   options = Object.assign(options, {myOption: true});
     *   super.createProperty(name, options);
     * }
     * ```
     *
     * @nocollapse
     * @category properties
     */
    static createProperty(name, options = defaultPropertyDeclaration) {
        // If this is a state property, force the attribute to false.
        if (options.state) {
            options.attribute = false;
        }
        this.__prepare();
        // Whether this property is wrapping accessors.
        // Helps control the initial value change and reflection logic.
        if (this.prototype.hasOwnProperty(name)) {
            options = Object.create(options);
            options.wrapped = true;
        }
        this.elementProperties.set(name, options);
        if (!options.noAccessor) {
            const key = DEV_MODE
                ? // Use Symbol.for in dev mode to make it easier to maintain state
                    // when doing HMR.
                    Symbol.for(`${String(name)} (@property() cache)`)
                : Symbol();
            const descriptor = this.getPropertyDescriptor(name, key, options);
            if (descriptor !== undefined) {
                defineProperty(this.prototype, name, descriptor);
            }
        }
    }
    /**
     * Returns a property descriptor to be defined on the given named property.
     * If no descriptor is returned, the property will not become an accessor.
     * For example,
     *
     * ```ts
     * class MyElement extends LitElement {
     *   static getPropertyDescriptor(name, key, options) {
     *     const defaultDescriptor =
     *         super.getPropertyDescriptor(name, key, options);
     *     const setter = defaultDescriptor.set;
     *     return {
     *       get: defaultDescriptor.get,
     *       set(value) {
     *         setter.call(this, value);
     *         // custom action.
     *       },
     *       configurable: true,
     *       enumerable: true
     *     }
     *   }
     * }
     * ```
     *
     * @nocollapse
     * @category properties
     */
    static getPropertyDescriptor(name, key, options) {
        const { get, set } = getOwnPropertyDescriptor(this.prototype, name) ?? {
            get() {
                return this[key];
            },
            set(v) {
                this[key] = v;
            },
        };
        if (DEV_MODE && get == null) {
            if ('value' in (getOwnPropertyDescriptor(this.prototype, name) ?? {})) {
                throw new Error(`Field ${JSON.stringify(String(name))} on ` +
                    `${this.name} was declared as a reactive property ` +
                    `but it's actually declared as a value on the prototype. ` +
                    `Usually this is due to using @property or @state on a method.`);
            }
            issueWarning('reactive-property-without-getter', `Field ${JSON.stringify(String(name))} on ` +
                `${this.name} was declared as a reactive property ` +
                `but it does not have a getter. This will be an error in a ` +
                `future version of Lit.`);
        }
        return {
            get,
            set(value) {
                const oldValue = get?.call(this);
                set?.call(this, value);
                this.requestUpdate(name, oldValue, options);
            },
            configurable: true,
            enumerable: true,
        };
    }
    /**
     * Returns the property options associated with the given property.
     * These options are defined with a `PropertyDeclaration` via the `properties`
     * object or the `@property` decorator and are registered in
     * `createProperty(...)`.
     *
     * Note, this method should be considered "final" and not overridden. To
     * customize the options for a given property, override
     * {@linkcode createProperty}.
     *
     * @nocollapse
     * @final
     * @category properties
     */
    static getPropertyOptions(name) {
        return this.elementProperties.get(name) ?? defaultPropertyDeclaration;
    }
    /**
     * Initializes static own properties of the class used in bookkeeping
     * for element properties, initializers, etc.
     *
     * Can be called multiple times by code that needs to ensure these
     * properties exist before using them.
     *
     * This method ensures the superclass is finalized so that inherited
     * property metadata can be copied down.
     * @nocollapse
     */
    static __prepare() {
        if (this.hasOwnProperty(JSCompiler_renameProperty('elementProperties', this))) {
            // Already prepared
            return;
        }
        // Finalize any superclasses
        const superCtor = getPrototypeOf(this);
        superCtor.finalize();
        // Create own set of initializers for this class if any exist on the
        // superclass and copy them down. Note, for a small perf boost, avoid
        // creating initializers unless needed.
        if (superCtor._initializers !== undefined) {
            this._initializers = [...superCtor._initializers];
        }
        // Initialize elementProperties from the superclass
        this.elementProperties = new Map(superCtor.elementProperties);
    }
    /**
     * Finishes setting up the class so that it's ready to be registered
     * as a custom element and instantiated.
     *
     * This method is called by the ReactiveElement.observedAttributes getter.
     * If you override the observedAttributes getter, you must either call
     * super.observedAttributes to trigger finalization, or call finalize()
     * yourself.
     *
     * @nocollapse
     */
    static finalize() {
        if (this.hasOwnProperty(JSCompiler_renameProperty('finalized', this))) {
            return;
        }
        this.finalized = true;
        this.__prepare();
        // Create properties from the static properties block:
        if (this.hasOwnProperty(JSCompiler_renameProperty('properties', this))) {
            const props = this.properties;
            const propKeys = [
                ...getOwnPropertyNames(props),
                ...getOwnPropertySymbols(props),
            ];
            for (const p of propKeys) {
                this.createProperty(p, props[p]);
            }
        }
        // Create properties from standard decorator metadata:
        const metadata = this[Symbol.metadata];
        if (metadata !== null) {
            const properties = litPropertyMetadata.get(metadata);
            if (properties !== undefined) {
                for (const [p, options] of properties) {
                    this.elementProperties.set(p, options);
                }
            }
        }
        // Create the attribute-to-property map
        this.__attributeToPropertyMap = new Map();
        for (const [p, options] of this.elementProperties) {
            const attr = this.__attributeNameForProperty(p, options);
            if (attr !== undefined) {
                this.__attributeToPropertyMap.set(attr, p);
            }
        }
        this.elementStyles = this.finalizeStyles(this.styles);
        if (DEV_MODE) {
            if (this.hasOwnProperty('createProperty')) {
                issueWarning('no-override-create-property', 'Overriding ReactiveElement.createProperty() is deprecated. ' +
                    'The override will not be called with standard decorators');
            }
            if (this.hasOwnProperty('getPropertyDescriptor')) {
                issueWarning('no-override-get-property-descriptor', 'Overriding ReactiveElement.getPropertyDescriptor() is deprecated. ' +
                    'The override will not be called with standard decorators');
            }
        }
    }
    /**
     * Takes the styles the user supplied via the `static styles` property and
     * returns the array of styles to apply to the element.
     * Override this method to integrate into a style management system.
     *
     * Styles are deduplicated preserving the _last_ instance in the list. This
     * is a performance optimization to avoid duplicated styles that can occur
     * especially when composing via subclassing. The last item is kept to try
     * to preserve the cascade order with the assumption that it's most important
     * that last added styles override previous styles.
     *
     * @nocollapse
     * @category styles
     */
    static finalizeStyles(styles) {
        const elementStyles = [];
        if (Array.isArray(styles)) {
            // Dedupe the flattened array in reverse order to preserve the last items.
            // Casting to Array<unknown> works around TS error that
            // appears to come from trying to flatten a type CSSResultArray.
            const set = new Set(styles.flat(Infinity).reverse());
            // Then preserve original order by adding the set items in reverse order.
            for (const s of set) {
                elementStyles.unshift((0,_css_tag_js__WEBPACK_IMPORTED_MODULE_0__.getCompatibleStyle)(s));
            }
        }
        else if (styles !== undefined) {
            elementStyles.push((0,_css_tag_js__WEBPACK_IMPORTED_MODULE_0__.getCompatibleStyle)(styles));
        }
        return elementStyles;
    }
    /**
     * Returns the property name for the given attribute `name`.
     * @nocollapse
     */
    static __attributeNameForProperty(name, options) {
        const attribute = options.attribute;
        return attribute === false
            ? undefined
            : typeof attribute === 'string'
                ? attribute
                : typeof name === 'string'
                    ? name.toLowerCase()
                    : undefined;
    }
    constructor() {
        super();
        this.__instanceProperties = undefined;
        /**
         * True if there is a pending update as a result of calling `requestUpdate()`.
         * Should only be read.
         * @category updates
         */
        this.isUpdatePending = false;
        /**
         * Is set to `true` after the first update. The element code cannot assume
         * that `renderRoot` exists before the element `hasUpdated`.
         * @category updates
         */
        this.hasUpdated = false;
        /**
         * Name of currently reflecting property
         */
        this.__reflectingProperty = null;
        this.__initialize();
    }
    /**
     * Internal only override point for customizing work done when elements
     * are constructed.
     */
    __initialize() {
        this.__updatePromise = new Promise((res) => (this.enableUpdating = res));
        this._$changedProperties = new Map();
        // This enqueues a microtask that must run before the first update, so it
        // must be called before requestUpdate()
        this.__saveInstanceProperties();
        // ensures first update will be caught by an early access of
        // `updateComplete`
        this.requestUpdate();
        this.constructor._initializers?.forEach((i) => i(this));
    }
    /**
     * Registers a `ReactiveController` to participate in the element's reactive
     * update cycle. The element automatically calls into any registered
     * controllers during its lifecycle callbacks.
     *
     * If the element is connected when `addController()` is called, the
     * controller's `hostConnected()` callback will be immediately called.
     * @category controllers
     */
    addController(controller) {
        (this.__controllers ??= new Set()).add(controller);
        // If a controller is added after the element has been connected,
        // call hostConnected. Note, re-using existence of `renderRoot` here
        // (which is set in connectedCallback) to avoid the need to track a
        // first connected state.
        if (this.renderRoot !== undefined && this.isConnected) {
            controller.hostConnected?.();
        }
    }
    /**
     * Removes a `ReactiveController` from the element.
     * @category controllers
     */
    removeController(controller) {
        this.__controllers?.delete(controller);
    }
    /**
     * Fixes any properties set on the instance before upgrade time.
     * Otherwise these would shadow the accessor and break these properties.
     * The properties are stored in a Map which is played back after the
     * constructor runs.
     */
    __saveInstanceProperties() {
        const instanceProperties = new Map();
        const elementProperties = this.constructor
            .elementProperties;
        for (const p of elementProperties.keys()) {
            if (this.hasOwnProperty(p)) {
                instanceProperties.set(p, this[p]);
                delete this[p];
            }
        }
        if (instanceProperties.size > 0) {
            this.__instanceProperties = instanceProperties;
        }
    }
    /**
     * Returns the node into which the element should render and by default
     * creates and returns an open shadowRoot. Implement to customize where the
     * element's DOM is rendered. For example, to render into the element's
     * childNodes, return `this`.
     *
     * @return Returns a node into which to render.
     * @category rendering
     */
    createRenderRoot() {
        const renderRoot = this.shadowRoot ??
            this.attachShadow(this.constructor.shadowRootOptions);
        (0,_css_tag_js__WEBPACK_IMPORTED_MODULE_0__.adoptStyles)(renderRoot, this.constructor.elementStyles);
        return renderRoot;
    }
    /**
     * On first connection, creates the element's renderRoot, sets up
     * element styling, and enables updating.
     * @category lifecycle
     */
    connectedCallback() {
        // Create renderRoot before controllers `hostConnected`
        this.renderRoot ??=
            this.createRenderRoot();
        this.enableUpdating(true);
        this.__controllers?.forEach((c) => c.hostConnected?.());
    }
    /**
     * Note, this method should be considered final and not overridden. It is
     * overridden on the element instance with a function that triggers the first
     * update.
     * @category updates
     */
    enableUpdating(_requestedUpdate) { }
    /**
     * Allows for `super.disconnectedCallback()` in extensions while
     * reserving the possibility of making non-breaking feature additions
     * when disconnecting at some point in the future.
     * @category lifecycle
     */
    disconnectedCallback() {
        this.__controllers?.forEach((c) => c.hostDisconnected?.());
    }
    /**
     * Synchronizes property values when attributes change.
     *
     * Specifically, when an attribute is set, the corresponding property is set.
     * You should rarely need to implement this callback. If this method is
     * overridden, `super.attributeChangedCallback(name, _old, value)` must be
     * called.
     *
     * See [responding to attribute changes](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements#responding_to_attribute_changes)
     * on MDN for more information about the `attributeChangedCallback`.
     * @category attributes
     */
    attributeChangedCallback(name, _old, value) {
        this._$attributeToProperty(name, value);
    }
    __propertyToAttribute(name, value) {
        const elemProperties = this.constructor.elementProperties;
        const options = elemProperties.get(name);
        const attr = this.constructor.__attributeNameForProperty(name, options);
        if (attr !== undefined && options.reflect === true) {
            const converter = options.converter?.toAttribute !==
                undefined
                ? options.converter
                : defaultConverter;
            const attrValue = converter.toAttribute(value, options.type);
            if (DEV_MODE &&
                this.constructor.enabledWarnings.includes('migration') &&
                attrValue === undefined) {
                issueWarning('undefined-attribute-value', `The attribute value for the ${name} property is ` +
                    `undefined on element ${this.localName}. The attribute will be ` +
                    `removed, but in the previous version of \`ReactiveElement\`, ` +
                    `the attribute would not have changed.`);
            }
            // Track if the property is being reflected to avoid
            // setting the property again via `attributeChangedCallback`. Note:
            // 1. this takes advantage of the fact that the callback is synchronous.
            // 2. will behave incorrectly if multiple attributes are in the reaction
            // stack at time of calling. However, since we process attributes
            // in `update` this should not be possible (or an extreme corner case
            // that we'd like to discover).
            // mark state reflecting
            this.__reflectingProperty = name;
            if (attrValue == null) {
                this.removeAttribute(attr);
            }
            else {
                this.setAttribute(attr, attrValue);
            }
            // mark state not reflecting
            this.__reflectingProperty = null;
        }
    }
    /** @internal */
    _$attributeToProperty(name, value) {
        const ctor = this.constructor;
        // Note, hint this as an `AttributeMap` so closure clearly understands
        // the type; it has issues with tracking types through statics
        const propName = ctor.__attributeToPropertyMap.get(name);
        // Use tracking info to avoid reflecting a property value to an attribute
        // if it was just set because the attribute changed.
        if (propName !== undefined && this.__reflectingProperty !== propName) {
            const options = ctor.getPropertyOptions(propName);
            const converter = typeof options.converter === 'function'
                ? { fromAttribute: options.converter }
                : options.converter?.fromAttribute !== undefined
                    ? options.converter
                    : defaultConverter;
            // mark state reflecting
            this.__reflectingProperty = propName;
            const convertedValue = converter.fromAttribute(value, options.type);
            this[propName] =
                convertedValue ??
                    this.__defaultValues?.get(propName) ??
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    convertedValue;
            // mark state not reflecting
            this.__reflectingProperty = null;
        }
    }
    /**
     * Requests an update which is processed asynchronously. This should be called
     * when an element should update based on some state not triggered by setting
     * a reactive property. In this case, pass no arguments. It should also be
     * called when manually implementing a property setter. In this case, pass the
     * property `name` and `oldValue` to ensure that any configured property
     * options are honored.
     *
     * @param name name of requesting property
     * @param oldValue old value of requesting property
     * @param options property options to use instead of the previously
     *     configured options
     * @param useNewValue if true, the newValue argument is used instead of
     *     reading the property value. This is important to use if the reactive
     *     property is a standard private accessor, as opposed to a plain
     *     property, since private members can't be dynamically read by name.
     * @param newValue the new value of the property. This is only used if
     *     `useNewValue` is true.
     * @category updates
     */
    requestUpdate(name, oldValue, options, useNewValue = false, newValue) {
        // If we have a property key, perform property update steps.
        if (name !== undefined) {
            if (DEV_MODE && name instanceof Event) {
                issueWarning(``, `The requestUpdate() method was called with an Event as the property name. This is probably a mistake caused by binding this.requestUpdate as an event listener. Instead bind a function that will call it with no arguments: () => this.requestUpdate()`);
            }
            const ctor = this.constructor;
            if (useNewValue === false) {
                newValue = this[name];
            }
            options ??= ctor.getPropertyOptions(name);
            const changed = (options.hasChanged ?? notEqual)(newValue, oldValue) ||
                // When there is no change, check a corner case that can occur when
                // 1. there's a initial value which was not reflected
                // 2. the property is subsequently set to this value.
                // For example, `prop: {useDefault: true, reflect: true}`
                // and el.prop = 'foo'. This should be considered a change if the
                // attribute is not set because we will now reflect the property to the attribute.
                (options.useDefault &&
                    options.reflect &&
                    newValue === this.__defaultValues?.get(name) &&
                    !this.hasAttribute(ctor.__attributeNameForProperty(name, options)));
            if (changed) {
                this._$changeProperty(name, oldValue, options);
            }
            else {
                // Abort the request if the property should not be considered changed.
                return;
            }
        }
        if (this.isUpdatePending === false) {
            this.__updatePromise = this.__enqueueUpdate();
        }
    }
    /**
     * @internal
     */
    _$changeProperty(name, oldValue, { useDefault, reflect, wrapped }, initializeValue) {
        // Record default value when useDefault is used. This allows us to
        // restore this value when the attribute is removed.
        if (useDefault && !(this.__defaultValues ??= new Map()).has(name)) {
            this.__defaultValues.set(name, initializeValue ?? oldValue ?? this[name]);
            // if this is not wrapping an accessor, it must be an initial setting
            // and in this case we do not want to record the change or reflect.
            if (wrapped !== true || initializeValue !== undefined) {
                return;
            }
        }
        // TODO (justinfagnani): Create a benchmark of Map.has() + Map.set(
        // vs just Map.set()
        if (!this._$changedProperties.has(name)) {
            // On the initial change, the old value should be `undefined`, except
            // with `useDefault`
            if (!this.hasUpdated && !useDefault) {
                oldValue = undefined;
            }
            this._$changedProperties.set(name, oldValue);
        }
        // Add to reflecting properties set.
        // Note, it's important that every change has a chance to add the
        // property to `__reflectingProperties`. This ensures setting
        // attribute + property reflects correctly.
        if (reflect === true && this.__reflectingProperty !== name) {
            (this.__reflectingProperties ??= new Set()).add(name);
        }
    }
    /**
     * Sets up the element to asynchronously update.
     */
    async __enqueueUpdate() {
        this.isUpdatePending = true;
        try {
            // Ensure any previous update has resolved before updating.
            // This `await` also ensures that property changes are batched.
            await this.__updatePromise;
        }
        catch (e) {
            // Refire any previous errors async so they do not disrupt the update
            // cycle. Errors are refired so developers have a chance to observe
            // them, and this can be done by implementing
            // `window.onunhandledrejection`.
            Promise.reject(e);
        }
        const result = this.scheduleUpdate();
        // If `scheduleUpdate` returns a Promise, we await it. This is done to
        // enable coordinating updates with a scheduler. Note, the result is
        // checked to avoid delaying an additional microtask unless we need to.
        if (result != null) {
            await result;
        }
        return !this.isUpdatePending;
    }
    /**
     * Schedules an element update. You can override this method to change the
     * timing of updates by returning a Promise. The update will await the
     * returned Promise, and you should resolve the Promise to allow the update
     * to proceed. If this method is overridden, `super.scheduleUpdate()`
     * must be called.
     *
     * For instance, to schedule updates to occur just before the next frame:
     *
     * ```ts
     * override protected async scheduleUpdate(): Promise<unknown> {
     *   await new Promise((resolve) => requestAnimationFrame(() => resolve()));
     *   super.scheduleUpdate();
     * }
     * ```
     * @category updates
     */
    scheduleUpdate() {
        const result = this.performUpdate();
        if (DEV_MODE &&
            this.constructor.enabledWarnings.includes('async-perform-update') &&
            typeof result?.then ===
                'function') {
            issueWarning('async-perform-update', `Element ${this.localName} returned a Promise from performUpdate(). ` +
                `This behavior is deprecated and will be removed in a future ` +
                `version of ReactiveElement.`);
        }
        return result;
    }
    /**
     * Performs an element update. Note, if an exception is thrown during the
     * update, `firstUpdated` and `updated` will not be called.
     *
     * Call `performUpdate()` to immediately process a pending update. This should
     * generally not be needed, but it can be done in rare cases when you need to
     * update synchronously.
     *
     * @category updates
     */
    performUpdate() {
        // Abort any update if one is not pending when this is called.
        // This can happen if `performUpdate` is called early to "flush"
        // the update.
        if (!this.isUpdatePending) {
            return;
        }
        debugLogEvent?.({ kind: 'update' });
        if (!this.hasUpdated) {
            // Create renderRoot before first update. This occurs in `connectedCallback`
            // but is done here to support out of tree calls to `enableUpdating`/`performUpdate`.
            this.renderRoot ??=
                this.createRenderRoot();
            if (DEV_MODE) {
                // Produce warning if any reactive properties on the prototype are
                // shadowed by class fields. Instance fields set before upgrade are
                // deleted by this point, so any own property is caused by class field
                // initialization in the constructor.
                const ctor = this.constructor;
                const shadowedProperties = [...ctor.elementProperties.keys()].filter((p) => this.hasOwnProperty(p) && p in getPrototypeOf(this));
                if (shadowedProperties.length) {
                    throw new Error(`The following properties on element ${this.localName} will not ` +
                        `trigger updates as expected because they are set using class ` +
                        `fields: ${shadowedProperties.join(', ')}. ` +
                        `Native class fields and some compiled output will overwrite ` +
                        `accessors used for detecting changes. See ` +
                        `https://lit.dev/msg/class-field-shadowing ` +
                        `for more information.`);
                }
            }
            // Mixin instance properties once, if they exist.
            if (this.__instanceProperties) {
                // TODO (justinfagnani): should we use the stored value? Could a new value
                // have been set since we stored the own property value?
                for (const [p, value] of this.__instanceProperties) {
                    this[p] = value;
                }
                this.__instanceProperties = undefined;
            }
            // Trigger initial value reflection and populate the initial
            // `changedProperties` map, but only for the case of properties created
            // via `createProperty` on accessors, which will not have already
            // populated the `changedProperties` map since they are not set.
            // We can't know if these accessors had initializers, so we just set
            // them anyway - a difference from experimental decorators on fields and
            // standard decorators on auto-accessors.
            // For context see:
            // https://github.com/lit/lit/pull/4183#issuecomment-1711959635
            const elementProperties = this.constructor
                .elementProperties;
            if (elementProperties.size > 0) {
                for (const [p, options] of elementProperties) {
                    const { wrapped } = options;
                    const value = this[p];
                    if (wrapped === true &&
                        !this._$changedProperties.has(p) &&
                        value !== undefined) {
                        this._$changeProperty(p, undefined, options, value);
                    }
                }
            }
        }
        let shouldUpdate = false;
        const changedProperties = this._$changedProperties;
        try {
            shouldUpdate = this.shouldUpdate(changedProperties);
            if (shouldUpdate) {
                this.willUpdate(changedProperties);
                this.__controllers?.forEach((c) => c.hostUpdate?.());
                this.update(changedProperties);
            }
            else {
                this.__markUpdated();
            }
        }
        catch (e) {
            // Prevent `firstUpdated` and `updated` from running when there's an
            // update exception.
            shouldUpdate = false;
            // Ensure element can accept additional updates after an exception.
            this.__markUpdated();
            throw e;
        }
        // The update is no longer considered pending and further updates are now allowed.
        if (shouldUpdate) {
            this._$didUpdate(changedProperties);
        }
    }
    /**
     * Invoked before `update()` to compute values needed during the update.
     *
     * Implement `willUpdate` to compute property values that depend on other
     * properties and are used in the rest of the update process.
     *
     * ```ts
     * willUpdate(changedProperties) {
     *   // only need to check changed properties for an expensive computation.
     *   if (changedProperties.has('firstName') || changedProperties.has('lastName')) {
     *     this.sha = computeSHA(`${this.firstName} ${this.lastName}`);
     *   }
     * }
     *
     * render() {
     *   return html`SHA: ${this.sha}`;
     * }
     * ```
     *
     * @category updates
     */
    willUpdate(_changedProperties) { }
    // Note, this is an override point for polyfill-support.
    // @internal
    _$didUpdate(changedProperties) {
        this.__controllers?.forEach((c) => c.hostUpdated?.());
        if (!this.hasUpdated) {
            this.hasUpdated = true;
            this.firstUpdated(changedProperties);
        }
        this.updated(changedProperties);
        if (DEV_MODE &&
            this.isUpdatePending &&
            this.constructor.enabledWarnings.includes('change-in-update')) {
            issueWarning('change-in-update', `Element ${this.localName} scheduled an update ` +
                `(generally because a property was set) ` +
                `after an update completed, causing a new update to be scheduled. ` +
                `This is inefficient and should be avoided unless the next update ` +
                `can only be scheduled as a side effect of the previous update.`);
        }
    }
    __markUpdated() {
        this._$changedProperties = new Map();
        this.isUpdatePending = false;
    }
    /**
     * Returns a Promise that resolves when the element has completed updating.
     * The Promise value is a boolean that is `true` if the element completed the
     * update without triggering another update. The Promise result is `false` if
     * a property was set inside `updated()`. If the Promise is rejected, an
     * exception was thrown during the update.
     *
     * To await additional asynchronous work, override the `getUpdateComplete`
     * method. For example, it is sometimes useful to await a rendered element
     * before fulfilling this Promise. To do this, first await
     * `super.getUpdateComplete()`, then any subsequent state.
     *
     * @return A promise of a boolean that resolves to true if the update completed
     *     without triggering another update.
     * @category updates
     */
    get updateComplete() {
        return this.getUpdateComplete();
    }
    /**
     * Override point for the `updateComplete` promise.
     *
     * It is not safe to override the `updateComplete` getter directly due to a
     * limitation in TypeScript which means it is not possible to call a
     * superclass getter (e.g. `super.updateComplete.then(...)`) when the target
     * language is ES5 (https://github.com/microsoft/TypeScript/issues/338).
     * This method should be overridden instead. For example:
     *
     * ```ts
     * class MyElement extends LitElement {
     *   override async getUpdateComplete() {
     *     const result = await super.getUpdateComplete();
     *     await this._myChild.updateComplete;
     *     return result;
     *   }
     * }
     * ```
     *
     * @return A promise of a boolean that resolves to true if the update completed
     *     without triggering another update.
     * @category updates
     */
    getUpdateComplete() {
        return this.__updatePromise;
    }
    /**
     * Controls whether or not `update()` should be called when the element requests
     * an update. By default, this method always returns `true`, but this can be
     * customized to control when to update.
     *
     * @param _changedProperties Map of changed properties with old values
     * @category updates
     */
    shouldUpdate(_changedProperties) {
        return true;
    }
    /**
     * Updates the element. This method reflects property values to attributes.
     * It can be overridden to render and keep updated element DOM.
     * Setting properties inside this method will *not* trigger
     * another update.
     *
     * @param _changedProperties Map of changed properties with old values
     * @category updates
     */
    update(_changedProperties) {
        // The forEach() expression will only run when __reflectingProperties is
        // defined, and it returns undefined, setting __reflectingProperties to
        // undefined
        this.__reflectingProperties &&= this.__reflectingProperties.forEach((p) => this.__propertyToAttribute(p, this[p]));
        this.__markUpdated();
    }
    /**
     * Invoked whenever the element is updated. Implement to perform
     * post-updating tasks via DOM APIs, for example, focusing an element.
     *
     * Setting properties inside this method will trigger the element to update
     * again after this update cycle completes.
     *
     * @param _changedProperties Map of changed properties with old values
     * @category updates
     */
    updated(_changedProperties) { }
    /**
     * Invoked when the element is first updated. Implement to perform one time
     * work on the element after update.
     *
     * ```ts
     * firstUpdated() {
     *   this.renderRoot.getElementById('my-text-area').focus();
     * }
     * ```
     *
     * Setting properties inside this method will trigger the element to update
     * again after this update cycle completes.
     *
     * @param _changedProperties Map of changed properties with old values
     * @category updates
     */
    firstUpdated(_changedProperties) { }
}
/**
 * Memoized list of all element styles.
 * Created lazily on user subclasses when finalizing the class.
 * @nocollapse
 * @category styles
 */
ReactiveElement.elementStyles = [];
/**
 * Options used when calling `attachShadow`. Set this property to customize
 * the options for the shadowRoot; for example, to create a closed
 * shadowRoot: `{mode: 'closed'}`.
 *
 * Note, these options are used in `createRenderRoot`. If this method
 * is customized, options should be respected if possible.
 * @nocollapse
 * @category rendering
 */
ReactiveElement.shadowRootOptions = { mode: 'open' };
// Assigned here to work around a jscompiler bug with static fields
// when compiling to ES5.
// https://github.com/google/closure-compiler/issues/3177
ReactiveElement[JSCompiler_renameProperty('elementProperties', ReactiveElement)] = new Map();
ReactiveElement[JSCompiler_renameProperty('finalized', ReactiveElement)] = new Map();
// Apply polyfills if available
polyfillSupport?.({ ReactiveElement });
// Dev mode warnings...
if (DEV_MODE) {
    // Default warning set.
    ReactiveElement.enabledWarnings = [
        'change-in-update',
        'async-perform-update',
    ];
    const ensureOwnWarnings = function (ctor) {
        if (!ctor.hasOwnProperty(JSCompiler_renameProperty('enabledWarnings', ctor))) {
            ctor.enabledWarnings = ctor.enabledWarnings.slice();
        }
    };
    ReactiveElement.enableWarning = function (warning) {
        ensureOwnWarnings(this);
        if (!this.enabledWarnings.includes(warning)) {
            this.enabledWarnings.push(warning);
        }
    };
    ReactiveElement.disableWarning = function (warning) {
        ensureOwnWarnings(this);
        const i = this.enabledWarnings.indexOf(warning);
        if (i >= 0) {
            this.enabledWarnings.splice(i, 1);
        }
    };
}
// IMPORTANT: do not change the property name or the assignment expression.
// This line will be used in regexes to search for ReactiveElement usage.
(global.reactiveElementVersions ??= []).push('2.1.2');
if (DEV_MODE && global.reactiveElementVersions.length > 1) {
    queueMicrotask(() => {
        issueWarning('multiple-versions', `Multiple versions of Lit loaded. Loading multiple versions ` +
            `is not recommended.`);
    });
}
//# sourceMappingURL=reactive-element.js.map

/***/ },

/***/ "./node_modules/giscus/dist/giscus.mjs"
/*!*********************************************!*\
  !*** ./node_modules/giscus/dist/giscus.mjs ***!
  \*********************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GiscusWidget: () => (/* binding */ r)
/* harmony export */ });
/* harmony import */ var lit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lit */ "./node_modules/lit/index.js");
/* harmony import */ var lit_decorators_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lit/decorators.js */ "./node_modules/lit/decorators.js");
/* harmony import */ var lit_directives_ref_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lit/directives/ref.js */ "./node_modules/lit/directives/ref.js");



var S = Object.defineProperty, _ = Object.getOwnPropertyDescriptor, i = (e, t, s, n) => {
  for (var a = n > 1 ? void 0 : n ? _(t, s) : t, c = e.length - 1, h; c >= 0; c--)
    (h = e[c]) && (a = (n ? h(t, s, a) : h(a)) || a);
  return n && a && S(t, s, a), a;
};
function E(e) {
  return customElements.get(e) ? (t) => t : (0,lit_decorators_js__WEBPACK_IMPORTED_MODULE_1__.customElement)(e);
}
let r = class extends lit__WEBPACK_IMPORTED_MODULE_0__.LitElement {
  constructor() {
    super(), this.GISCUS_SESSION_KEY = "giscus-session", this.GISCUS_DEFAULT_HOST = "https://giscus.app", this.ERROR_SUGGESTION = "Please consider reporting this error at https://github.com/giscus/giscus/issues/new.", this.__session = "", this._iframeRef = (0,lit_directives_ref_js__WEBPACK_IMPORTED_MODULE_2__.createRef)(), this.messageEventHandler = this.handleMessageEvent.bind(this), this.hasLoaded = !1, this.host = this.GISCUS_DEFAULT_HOST, this.strict = "0", this.reactionsEnabled = "1", this.emitMetadata = "0", this.inputPosition = "bottom", this.theme = "light", this.lang = "en", this.loading = "eager", this.setupSession(), window.addEventListener("message", this.messageEventHandler);
  }
  get iframeRef() {
    var e;
    return (e = this._iframeRef) == null ? void 0 : e.value;
  }
  get _host() {
    try {
      return new URL(this.host), this.host;
    } catch {
      return this.GISCUS_DEFAULT_HOST;
    }
  }
  disconnectedCallback() {
    super.disconnectedCallback(), window.removeEventListener("message", this.messageEventHandler);
  }
  _formatError(e) {
    return `[giscus] An error occurred. Error message: "${e}".`;
  }
  setupSession() {
    const e = location.href, t = new URL(e), s = localStorage.getItem(this.GISCUS_SESSION_KEY), n = t.searchParams.get("giscus") ?? "";
    if (this.__session = "", n) {
      localStorage.setItem(this.GISCUS_SESSION_KEY, JSON.stringify(n)), this.__session = n, t.searchParams.delete("giscus"), t.hash = "", history.replaceState(void 0, document.title, t.toString());
      return;
    }
    if (s)
      try {
        this.__session = JSON.parse(s);
      } catch (a) {
        localStorage.removeItem(this.GISCUS_SESSION_KEY), console.warn(
          `${this._formatError(
            a == null ? void 0 : a.message
          )} Session has been cleared.`
        );
      }
  }
  signOut() {
    localStorage.removeItem(this.GISCUS_SESSION_KEY), this.__session = "", this.update(/* @__PURE__ */ new Map());
  }
  handleMessageEvent(e) {
    if (e.origin !== this._host) return;
    const { data: t } = e;
    if (!(typeof t == "object" && t.giscus)) return;
    if (this.iframeRef && t.giscus.resizeHeight && (this.iframeRef.style.height = `${t.giscus.resizeHeight}px`), t.giscus.signOut) {
      console.info("[giscus] User has logged out. Session has been cleared."), this.signOut();
      return;
    }
    if (!t.giscus.error) return;
    const s = t.giscus.error;
    if (s.includes("Bad credentials") || s.includes("Invalid state value") || s.includes("State has expired")) {
      if (localStorage.getItem(this.GISCUS_SESSION_KEY) !== null) {
        console.warn(`${this._formatError(s)} Session has been cleared.`), this.signOut();
        return;
      }
      console.error(
        `${this._formatError(s)} No session is stored initially. ${this.ERROR_SUGGESTION}`
      );
    }
    if (s.includes("Discussion not found")) {
      console.warn(
        `[giscus] ${s}. A new discussion will be created if a comment/reaction is submitted.`
      );
      return;
    }
    console.error(`${this._formatError(s)} ${this.ERROR_SUGGESTION}`);
  }
  sendMessage(e) {
    var t;
    !((t = this.iframeRef) != null && t.contentWindow) || !this.hasLoaded || this.iframeRef.contentWindow.postMessage({ giscus: e }, this._host);
  }
  updateConfig() {
    const e = {
      setConfig: {
        repo: this.repo,
        repoId: this.repoId,
        category: this.category,
        categoryId: this.categoryId,
        term: this.getTerm(),
        number: +this.getNumber(),
        strict: this.strict === "1",
        reactionsEnabled: this.reactionsEnabled === "1",
        emitMetadata: this.emitMetadata === "1",
        inputPosition: this.inputPosition,
        theme: this.theme,
        lang: this.lang
      }
    };
    this.sendMessage(e);
  }
  firstUpdated() {
    var e;
    (e = this.iframeRef) == null || e.addEventListener("load", () => {
      var t;
      (t = this.iframeRef) == null || t.classList.remove("loading"), this.hasLoaded = !0, this.updateConfig();
    });
  }
  requestUpdate(e, t, s) {
    if (!this.hasUpdated || e === "host") {
      super.requestUpdate(e, t, s);
      return;
    }
    this.updateConfig();
  }
  getMetaContent(e, t = !1) {
    const s = t ? `meta[property='og:${e}'],` : "", n = document.querySelector(
      s + `meta[name='${e}']`
    );
    return n ? n.content : "";
  }
  _getCleanedUrl() {
    const e = new URL(location.href);
    return e.searchParams.delete("giscus"), e.hash = "", e;
  }
  getTerm() {
    switch (this.mapping) {
      case "url":
        return this._getCleanedUrl().toString();
      case "title":
        return document.title;
      case "og:title":
        return this.getMetaContent("title", !0);
      case "specific":
        return this.term ?? "";
      case "number":
        return "";
      case "pathname":
      default:
        return location.pathname.length < 2 ? "index" : location.pathname.substring(1).replace(/\.\w+$/, "");
    }
  }
  getNumber() {
    return this.mapping === "number" ? this.term ?? "" : "";
  }
  getIframeSrc() {
    const e = this._getCleanedUrl().toString(), t = `${e}${this.id ? "#" + this.id : ""}`, s = this.getMetaContent("description", !0), n = this.getMetaContent("giscus:backlink") || e, a = {
      origin: t,
      session: this.__session,
      repo: this.repo,
      repoId: this.repoId ?? "",
      category: this.category ?? "",
      categoryId: this.categoryId ?? "",
      term: this.getTerm(),
      number: this.getNumber(),
      strict: this.strict,
      reactionsEnabled: this.reactionsEnabled,
      emitMetadata: this.emitMetadata,
      inputPosition: this.inputPosition,
      theme: this.theme,
      description: s,
      backLink: n
    }, c = this._host, h = this.lang ? `/${this.lang}` : "", l = new URLSearchParams(a);
    return `${c}${h}/widget?${l.toString()}`;
  }
  render() {
    return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)`
      <iframe
        title="Comments"
        scrolling="no"
        class="loading"
        ${(0,lit_directives_ref_js__WEBPACK_IMPORTED_MODULE_2__.ref)(this._iframeRef)}
        src=${this.getIframeSrc()}
        loading=${this.loading}
        allow="clipboard-write"
        part="iframe"
      ></iframe>
    `;
  }
};
r.styles = (0,lit__WEBPACK_IMPORTED_MODULE_0__.css)`
    :host,
    iframe {
      width: 100%;
      border: none;
      min-height: 150px;
      color-scheme: light dark;
    }

    iframe.loading {
      opacity: 0;
    }
  `;
i([
  (0,lit_decorators_js__WEBPACK_IMPORTED_MODULE_1__.property)({ reflect: !0 })
], r.prototype, "host", 2);
i([
  (0,lit_decorators_js__WEBPACK_IMPORTED_MODULE_1__.property)({ reflect: !0 })
], r.prototype, "repo", 2);
i([
  (0,lit_decorators_js__WEBPACK_IMPORTED_MODULE_1__.property)({ reflect: !0 })
], r.prototype, "repoId", 2);
i([
  (0,lit_decorators_js__WEBPACK_IMPORTED_MODULE_1__.property)({ reflect: !0 })
], r.prototype, "category", 2);
i([
  (0,lit_decorators_js__WEBPACK_IMPORTED_MODULE_1__.property)({ reflect: !0 })
], r.prototype, "categoryId", 2);
i([
  (0,lit_decorators_js__WEBPACK_IMPORTED_MODULE_1__.property)({ reflect: !0 })
], r.prototype, "mapping", 2);
i([
  (0,lit_decorators_js__WEBPACK_IMPORTED_MODULE_1__.property)({ reflect: !0 })
], r.prototype, "term", 2);
i([
  (0,lit_decorators_js__WEBPACK_IMPORTED_MODULE_1__.property)({ reflect: !0 })
], r.prototype, "strict", 2);
i([
  (0,lit_decorators_js__WEBPACK_IMPORTED_MODULE_1__.property)({ reflect: !0 })
], r.prototype, "reactionsEnabled", 2);
i([
  (0,lit_decorators_js__WEBPACK_IMPORTED_MODULE_1__.property)({ reflect: !0 })
], r.prototype, "emitMetadata", 2);
i([
  (0,lit_decorators_js__WEBPACK_IMPORTED_MODULE_1__.property)({ reflect: !0 })
], r.prototype, "inputPosition", 2);
i([
  (0,lit_decorators_js__WEBPACK_IMPORTED_MODULE_1__.property)({ reflect: !0 })
], r.prototype, "theme", 2);
i([
  (0,lit_decorators_js__WEBPACK_IMPORTED_MODULE_1__.property)({ reflect: !0 })
], r.prototype, "lang", 2);
i([
  (0,lit_decorators_js__WEBPACK_IMPORTED_MODULE_1__.property)({ reflect: !0 })
], r.prototype, "loading", 2);
r = i([
  E("giscus-widget")
], r);



/***/ },

/***/ "./node_modules/lit-element/development/lit-element.js"
/*!*************************************************************!*\
  !*** ./node_modules/lit-element/development/lit-element.js ***!
  \*************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CSSResult: () => (/* reexport safe */ _lit_reactive_element__WEBPACK_IMPORTED_MODULE_0__.CSSResult),
/* harmony export */   LitElement: () => (/* binding */ LitElement),
/* harmony export */   ReactiveElement: () => (/* reexport safe */ _lit_reactive_element__WEBPACK_IMPORTED_MODULE_0__.ReactiveElement),
/* harmony export */   _$LE: () => (/* binding */ _$LE),
/* harmony export */   _$LH: () => (/* reexport safe */ lit_html__WEBPACK_IMPORTED_MODULE_1__._$LH),
/* harmony export */   adoptStyles: () => (/* reexport safe */ _lit_reactive_element__WEBPACK_IMPORTED_MODULE_0__.adoptStyles),
/* harmony export */   css: () => (/* reexport safe */ _lit_reactive_element__WEBPACK_IMPORTED_MODULE_0__.css),
/* harmony export */   defaultConverter: () => (/* reexport safe */ _lit_reactive_element__WEBPACK_IMPORTED_MODULE_0__.defaultConverter),
/* harmony export */   getCompatibleStyle: () => (/* reexport safe */ _lit_reactive_element__WEBPACK_IMPORTED_MODULE_0__.getCompatibleStyle),
/* harmony export */   html: () => (/* reexport safe */ lit_html__WEBPACK_IMPORTED_MODULE_1__.html),
/* harmony export */   mathml: () => (/* reexport safe */ lit_html__WEBPACK_IMPORTED_MODULE_1__.mathml),
/* harmony export */   noChange: () => (/* reexport safe */ lit_html__WEBPACK_IMPORTED_MODULE_1__.noChange),
/* harmony export */   notEqual: () => (/* reexport safe */ _lit_reactive_element__WEBPACK_IMPORTED_MODULE_0__.notEqual),
/* harmony export */   nothing: () => (/* reexport safe */ lit_html__WEBPACK_IMPORTED_MODULE_1__.nothing),
/* harmony export */   render: () => (/* reexport safe */ lit_html__WEBPACK_IMPORTED_MODULE_1__.render),
/* harmony export */   supportsAdoptingStyleSheets: () => (/* reexport safe */ _lit_reactive_element__WEBPACK_IMPORTED_MODULE_0__.supportsAdoptingStyleSheets),
/* harmony export */   svg: () => (/* reexport safe */ lit_html__WEBPACK_IMPORTED_MODULE_1__.svg),
/* harmony export */   unsafeCSS: () => (/* reexport safe */ _lit_reactive_element__WEBPACK_IMPORTED_MODULE_0__.unsafeCSS)
/* harmony export */ });
/* harmony import */ var _lit_reactive_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @lit/reactive-element */ "./node_modules/@lit/reactive-element/development/reactive-element.js");
/* harmony import */ var lit_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lit-html */ "./node_modules/lit-html/development/lit-html.js");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * The main LitElement module, which defines the {@linkcode LitElement} base
 * class and related APIs.
 *
 * LitElement components can define a template and a set of observed
 * properties. Changing an observed property triggers a re-render of the
 * element.
 *
 * Import {@linkcode LitElement} and {@linkcode html} from this module to
 * create a component:
 *
 *  ```js
 * import {LitElement, html} from 'lit-element';
 *
 * class MyElement extends LitElement {
 *
 *   // Declare observed properties
 *   static get properties() {
 *     return {
 *       adjective: {}
 *     }
 *   }
 *
 *   constructor() {
 *     this.adjective = 'awesome';
 *   }
 *
 *   // Define the element's template
 *   render() {
 *     return html`<p>your ${adjective} template here</p>`;
 *   }
 * }
 *
 * customElements.define('my-element', MyElement);
 * ```
 *
 * `LitElement` extends {@linkcode ReactiveElement} and adds lit-html
 * templating. The `ReactiveElement` class is provided for users that want to
 * build their own custom element base classes that don't use lit-html.
 *
 * @packageDocumentation
 */




/*
 * When using Closure Compiler, JSCompiler_renameProperty(property, object) is
 * replaced at compile time by the munged name for object[property]. We cannot
 * alias this function, so we have to use a small shim that has the same
 * behavior when not compiling.
 */
/*@__INLINE__*/
const JSCompiler_renameProperty = (prop, _obj) => prop;
const DEV_MODE = true;
// Allows minifiers to rename references to globalThis
const global = globalThis;
let issueWarning;
if (DEV_MODE) {
    // Ensure warnings are issued only 1x, even if multiple versions of Lit
    // are loaded.
    global.litIssuedWarnings ??= new Set();
    /**
     * Issue a warning if we haven't already, based either on `code` or `warning`.
     * Warnings are disabled automatically only by `warning`; disabling via `code`
     * can be done by users.
     */
    issueWarning = (code, warning) => {
        warning += ` See https://lit.dev/msg/${code} for more information.`;
        if (!global.litIssuedWarnings.has(warning) &&
            !global.litIssuedWarnings.has(code)) {
            console.warn(warning);
            global.litIssuedWarnings.add(warning);
        }
    };
}
/**
 * Base element class that manages element properties and attributes, and
 * renders a lit-html template.
 *
 * To define a component, subclass `LitElement` and implement a
 * `render` method to provide the component's template. Define properties
 * using the {@linkcode LitElement.properties properties} property or the
 * {@linkcode property} decorator.
 */
class LitElement extends _lit_reactive_element__WEBPACK_IMPORTED_MODULE_0__.ReactiveElement {
    constructor() {
        super(...arguments);
        /**
         * @category rendering
         */
        this.renderOptions = { host: this };
        this.__childPart = undefined;
    }
    /**
     * @category rendering
     */
    createRenderRoot() {
        const renderRoot = super.createRenderRoot();
        // When adoptedStyleSheets are shimmed, they are inserted into the
        // shadowRoot by createRenderRoot. Adjust the renderBefore node so that
        // any styles in Lit content render before adoptedStyleSheets. This is
        // important so that adoptedStyleSheets have precedence over styles in
        // the shadowRoot.
        this.renderOptions.renderBefore ??= renderRoot.firstChild;
        return renderRoot;
    }
    /**
     * Updates the element. This method reflects property values to attributes
     * and calls `render` to render DOM via lit-html. Setting properties inside
     * this method will *not* trigger another update.
     * @param changedProperties Map of changed properties with old values
     * @category updates
     */
    update(changedProperties) {
        // Setting properties in `render` should not trigger an update. Since
        // updates are allowed after super.update, it's important to call `render`
        // before that.
        const value = this.render();
        if (!this.hasUpdated) {
            this.renderOptions.isConnected = this.isConnected;
        }
        super.update(changedProperties);
        this.__childPart = (0,lit_html__WEBPACK_IMPORTED_MODULE_1__.render)(value, this.renderRoot, this.renderOptions);
    }
    /**
     * Invoked when the component is added to the document's DOM.
     *
     * In `connectedCallback()` you should setup tasks that should only occur when
     * the element is connected to the document. The most common of these is
     * adding event listeners to nodes external to the element, like a keydown
     * event handler added to the window.
     *
     * ```ts
     * connectedCallback() {
     *   super.connectedCallback();
     *   addEventListener('keydown', this._handleKeydown);
     * }
     * ```
     *
     * Typically, anything done in `connectedCallback()` should be undone when the
     * element is disconnected, in `disconnectedCallback()`.
     *
     * @category lifecycle
     */
    connectedCallback() {
        super.connectedCallback();
        this.__childPart?.setConnected(true);
    }
    /**
     * Invoked when the component is removed from the document's DOM.
     *
     * This callback is the main signal to the element that it may no longer be
     * used. `disconnectedCallback()` should ensure that nothing is holding a
     * reference to the element (such as event listeners added to nodes external
     * to the element), so that it is free to be garbage collected.
     *
     * ```ts
     * disconnectedCallback() {
     *   super.disconnectedCallback();
     *   window.removeEventListener('keydown', this._handleKeydown);
     * }
     * ```
     *
     * An element may be re-connected after being disconnected.
     *
     * @category lifecycle
     */
    disconnectedCallback() {
        super.disconnectedCallback();
        this.__childPart?.setConnected(false);
    }
    /**
     * Invoked on each update to perform rendering tasks. This method may return
     * any value renderable by lit-html's `ChildPart` - typically a
     * `TemplateResult`. Setting properties inside this method will *not* trigger
     * the element to update.
     * @category rendering
     */
    render() {
        return lit_html__WEBPACK_IMPORTED_MODULE_1__.noChange;
    }
}
// This property needs to remain unminified.
LitElement['_$litElement$'] = true;
/**
 * Ensure this class is marked as `finalized` as an optimization ensuring
 * it will not needlessly try to `finalize`.
 *
 * Note this property name is a string to prevent breaking Closure JS Compiler
 * optimizations. See @lit/reactive-element for more information.
 */
LitElement[JSCompiler_renameProperty('finalized', LitElement)] = true;
// Install hydration if available
global.litElementHydrateSupport?.({ LitElement });
// Apply polyfills if available
const polyfillSupport = DEV_MODE
    ? global.litElementPolyfillSupportDevMode
    : global.litElementPolyfillSupport;
polyfillSupport?.({ LitElement });
/**
 * END USERS SHOULD NOT RELY ON THIS OBJECT.
 *
 * Private exports for use by other Lit packages, not intended for use by
 * external users.
 *
 * We currently do not make a mangled rollup build of the lit-ssr code. In order
 * to keep a number of (otherwise private) top-level exports  mangled in the
 * client side code, we export a _$LE object containing those members (or
 * helper methods for accessing private fields of those members), and then
 * re-export them for use in lit-ssr. This keeps lit-ssr agnostic to whether the
 * client-side code is being used in `dev` mode or `prod` mode.
 *
 * This has a unique name, to disambiguate it from private exports in
 * lit-html, since this module re-exports all of lit-html.
 *
 * @private
 */
const _$LE = {
    _$attributeToProperty: (el, name, value) => {
        // eslint-disable-next-line
        el._$attributeToProperty(name, value);
    },
    // eslint-disable-next-line
    _$changedProperties: (el) => el._$changedProperties,
};
// IMPORTANT: do not change the property name or the assignment expression.
// This line will be used in regexes to search for LitElement usage.
(global.litElementVersions ??= []).push('4.2.2');
if (DEV_MODE && global.litElementVersions.length > 1) {
    queueMicrotask(() => {
        issueWarning('multiple-versions', `Multiple versions of Lit loaded. Loading multiple versions ` +
            `is not recommended.`);
    });
}
//# sourceMappingURL=lit-element.js.map

/***/ },

/***/ "./node_modules/lit-html/development/async-directive.js"
/*!**************************************************************!*\
  !*** ./node_modules/lit-html/development/async-directive.js ***!
  \**************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AsyncDirective: () => (/* binding */ AsyncDirective),
/* harmony export */   Directive: () => (/* reexport safe */ _directive_js__WEBPACK_IMPORTED_MODULE_1__.Directive),
/* harmony export */   PartType: () => (/* reexport safe */ _directive_js__WEBPACK_IMPORTED_MODULE_1__.PartType),
/* harmony export */   directive: () => (/* reexport safe */ _directive_js__WEBPACK_IMPORTED_MODULE_1__.directive)
/* harmony export */ });
/* harmony import */ var _directive_helpers_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./directive-helpers.js */ "./node_modules/lit-html/development/directive-helpers.js");
/* harmony import */ var _directive_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./directive.js */ "./node_modules/lit-html/development/directive.js");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */



const DEV_MODE = true;
/**
 * Recursively walks down the tree of Parts/TemplateInstances/Directives to set
 * the connected state of directives and run `disconnected`/ `reconnected`
 * callbacks.
 *
 * @return True if there were children to disconnect; false otherwise
 */
const notifyChildrenConnectedChanged = (parent, isConnected) => {
    const children = parent._$disconnectableChildren;
    if (children === undefined) {
        return false;
    }
    for (const obj of children) {
        // The existence of `_$notifyDirectiveConnectionChanged` is used as a "brand" to
        // disambiguate AsyncDirectives from other DisconnectableChildren
        // (as opposed to using an instanceof check to know when to call it); the
        // redundancy of "Directive" in the API name is to avoid conflicting with
        // `_$notifyConnectionChanged`, which exists `ChildParts` which are also in
        // this list
        // Disconnect Directive (and any nested directives contained within)
        // This property needs to remain unminified.
        obj['_$notifyDirectiveConnectionChanged']?.(isConnected, false);
        // Disconnect Part/TemplateInstance
        notifyChildrenConnectedChanged(obj, isConnected);
    }
    return true;
};
/**
 * Removes the given child from its parent list of disconnectable children, and
 * if the parent list becomes empty as a result, removes the parent from its
 * parent, and so forth up the tree when that causes subsequent parent lists to
 * become empty.
 */
const removeDisconnectableFromParent = (obj) => {
    let parent, children;
    do {
        if ((parent = obj._$parent) === undefined) {
            break;
        }
        children = parent._$disconnectableChildren;
        children.delete(obj);
        obj = parent;
    } while (children?.size === 0);
};
const addDisconnectableToParent = (obj) => {
    // Climb the parent tree, creating a sparse tree of children needing
    // disconnection
    for (let parent; (parent = obj._$parent); obj = parent) {
        let children = parent._$disconnectableChildren;
        if (children === undefined) {
            parent._$disconnectableChildren = children = new Set();
        }
        else if (children.has(obj)) {
            // Once we've reached a parent that already contains this child, we
            // can short-circuit
            break;
        }
        children.add(obj);
        installDisconnectAPI(parent);
    }
};
/**
 * Changes the parent reference of the ChildPart, and updates the sparse tree of
 * Disconnectable children accordingly.
 *
 * Note, this method will be patched onto ChildPart instances and called from
 * the core code when parts are moved between different parents.
 */
function reparentDisconnectables(newParent) {
    if (this._$disconnectableChildren !== undefined) {
        removeDisconnectableFromParent(this);
        this._$parent = newParent;
        addDisconnectableToParent(this);
    }
    else {
        this._$parent = newParent;
    }
}
/**
 * Sets the connected state on any directives contained within the committed
 * value of this part (i.e. within a TemplateInstance or iterable of
 * ChildParts) and runs their `disconnected`/`reconnected`s, as well as within
 * any directives stored on the ChildPart (when `valueOnly` is false).
 *
 * `isClearingValue` should be passed as `true` on a top-level part that is
 * clearing itself, and not as a result of recursively disconnecting directives
 * as part of a `clear` operation higher up the tree. This both ensures that any
 * directive on this ChildPart that produced a value that caused the clear
 * operation is not disconnected, and also serves as a performance optimization
 * to avoid needless bookkeeping when a subtree is going away; when clearing a
 * subtree, only the top-most part need to remove itself from the parent.
 *
 * `fromPartIndex` is passed only in the case of a partial `_clear` running as a
 * result of truncating an iterable.
 *
 * Note, this method will be patched onto ChildPart instances and called from the
 * core code when parts are cleared or the connection state is changed by the
 * user.
 */
function notifyChildPartConnectedChanged(isConnected, isClearingValue = false, fromPartIndex = 0) {
    const value = this._$committedValue;
    const children = this._$disconnectableChildren;
    if (children === undefined || children.size === 0) {
        return;
    }
    if (isClearingValue) {
        if (Array.isArray(value)) {
            // Iterable case: Any ChildParts created by the iterable should be
            // disconnected and removed from this ChildPart's disconnectable
            // children (starting at `fromPartIndex` in the case of truncation)
            for (let i = fromPartIndex; i < value.length; i++) {
                notifyChildrenConnectedChanged(value[i], false);
                removeDisconnectableFromParent(value[i]);
            }
        }
        else if (value != null) {
            // TemplateInstance case: If the value has disconnectable children (will
            // only be in the case that it is a TemplateInstance), we disconnect it
            // and remove it from this ChildPart's disconnectable children
            notifyChildrenConnectedChanged(value, false);
            removeDisconnectableFromParent(value);
        }
    }
    else {
        notifyChildrenConnectedChanged(this, isConnected);
    }
}
/**
 * Patches disconnection API onto ChildParts.
 */
const installDisconnectAPI = (obj) => {
    if (obj.type == _directive_js__WEBPACK_IMPORTED_MODULE_1__.PartType.CHILD) {
        obj._$notifyConnectionChanged ??=
            notifyChildPartConnectedChanged;
        obj._$reparentDisconnectables ??= reparentDisconnectables;
    }
};
/**
 * An abstract `Directive` base class whose `disconnected` method will be
 * called when the part containing the directive is cleared as a result of
 * re-rendering, or when the user calls `part.setConnected(false)` on
 * a part that was previously rendered containing the directive (as happens
 * when e.g. a LitElement disconnects from the DOM).
 *
 * If `part.setConnected(true)` is subsequently called on a
 * containing part, the directive's `reconnected` method will be called prior
 * to its next `update`/`render` callbacks. When implementing `disconnected`,
 * `reconnected` should also be implemented to be compatible with reconnection.
 *
 * Note that updates may occur while the directive is disconnected. As such,
 * directives should generally check the `this.isConnected` flag during
 * render/update to determine whether it is safe to subscribe to resources
 * that may prevent garbage collection.
 */
class AsyncDirective extends _directive_js__WEBPACK_IMPORTED_MODULE_1__.Directive {
    constructor() {
        super(...arguments);
        // @internal
        this._$disconnectableChildren = undefined;
    }
    /**
     * Initialize the part with internal fields
     * @param part
     * @param parent
     * @param attributeIndex
     */
    _$initialize(part, parent, attributeIndex) {
        super._$initialize(part, parent, attributeIndex);
        addDisconnectableToParent(this);
        this.isConnected = part._$isConnected;
    }
    // This property needs to remain unminified.
    /**
     * Called from the core code when a directive is going away from a part (in
     * which case `shouldRemoveFromParent` should be true), and from the
     * `setChildrenConnected` helper function when recursively changing the
     * connection state of a tree (in which case `shouldRemoveFromParent` should
     * be false).
     *
     * @param isConnected
     * @param isClearingDirective - True when the directive itself is being
     *     removed; false when the tree is being disconnected
     * @internal
     */
    ['_$notifyDirectiveConnectionChanged'](isConnected, isClearingDirective = true) {
        if (isConnected !== this.isConnected) {
            this.isConnected = isConnected;
            if (isConnected) {
                this.reconnected?.();
            }
            else {
                this.disconnected?.();
            }
        }
        if (isClearingDirective) {
            notifyChildrenConnectedChanged(this, isConnected);
            removeDisconnectableFromParent(this);
        }
    }
    /**
     * Sets the value of the directive's Part outside the normal `update`/`render`
     * lifecycle of a directive.
     *
     * This method should not be called synchronously from a directive's `update`
     * or `render`.
     *
     * @param directive The directive to update
     * @param value The value to set
     */
    setValue(value) {
        if ((0,_directive_helpers_js__WEBPACK_IMPORTED_MODULE_0__.isSingleExpression)(this.__part)) {
            this.__part._$setValue(value, this);
        }
        else {
            // this.__attributeIndex will be defined in this case, but
            // assert it in dev mode
            if (DEV_MODE && this.__attributeIndex === undefined) {
                throw new Error(`Expected this.__attributeIndex to be a number`);
            }
            const newValues = [...this.__part._$committedValue];
            newValues[this.__attributeIndex] = value;
            this.__part._$setValue(newValues, this, 0);
        }
    }
    /**
     * User callbacks for implementing logic to release any resources/subscriptions
     * that may have been retained by this directive. Since directives may also be
     * re-connected, `reconnected` should also be implemented to restore the
     * working state of the directive prior to the next render.
     */
    disconnected() { }
    reconnected() { }
}
//# sourceMappingURL=async-directive.js.map

/***/ },

/***/ "./node_modules/lit-html/development/directive-helpers.js"
/*!****************************************************************!*\
  !*** ./node_modules/lit-html/development/directive-helpers.js ***!
  \****************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TemplateResultType: () => (/* binding */ TemplateResultType),
/* harmony export */   clearPart: () => (/* binding */ clearPart),
/* harmony export */   getCommittedValue: () => (/* binding */ getCommittedValue),
/* harmony export */   getDirectiveClass: () => (/* binding */ getDirectiveClass),
/* harmony export */   insertPart: () => (/* binding */ insertPart),
/* harmony export */   isCompiledTemplateResult: () => (/* binding */ isCompiledTemplateResult),
/* harmony export */   isDirectiveResult: () => (/* binding */ isDirectiveResult),
/* harmony export */   isPrimitive: () => (/* binding */ isPrimitive),
/* harmony export */   isSingleExpression: () => (/* binding */ isSingleExpression),
/* harmony export */   isTemplateResult: () => (/* binding */ isTemplateResult),
/* harmony export */   removePart: () => (/* binding */ removePart),
/* harmony export */   setChildPartValue: () => (/* binding */ setChildPartValue),
/* harmony export */   setCommittedValue: () => (/* binding */ setCommittedValue)
/* harmony export */ });
/* harmony import */ var _lit_html_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lit-html.js */ "./node_modules/lit-html/development/lit-html.js");
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

const { _ChildPart: ChildPart } = _lit_html_js__WEBPACK_IMPORTED_MODULE_0__._$LH;
const ENABLE_SHADYDOM_NOPATCH = true;
const wrap = ENABLE_SHADYDOM_NOPATCH &&
    window.ShadyDOM?.inUse &&
    window.ShadyDOM?.noPatch === true
    ? window.ShadyDOM.wrap
    : (node) => node;
/**
 * Tests if a value is a primitive value.
 *
 * See https://tc39.github.io/ecma262/#sec-typeof-operator
 */
const isPrimitive = (value) => value === null || (typeof value != 'object' && typeof value != 'function');
const TemplateResultType = {
    HTML: 1,
    SVG: 2,
    MATHML: 3,
};
/**
 * Tests if a value is a TemplateResult or a CompiledTemplateResult.
 */
const isTemplateResult = (value, type) => type === undefined
    ? // This property needs to remain unminified.
        value?.['_$litType$'] !== undefined
    : value?.['_$litType$'] === type;
/**
 * Tests if a value is a CompiledTemplateResult.
 */
const isCompiledTemplateResult = (value) => {
    return value?.['_$litType$']?.h != null;
};
/**
 * Tests if a value is a DirectiveResult.
 */
const isDirectiveResult = (value) => 
// This property needs to remain unminified.
value?.['_$litDirective$'] !== undefined;
/**
 * Retrieves the Directive class for a DirectiveResult
 */
const getDirectiveClass = (value) => 
// This property needs to remain unminified.
value?.['_$litDirective$'];
/**
 * Tests whether a part has only a single-expression with no strings to
 * interpolate between.
 *
 * Only AttributePart and PropertyPart can have multiple expressions.
 * Multi-expression parts have a `strings` property and single-expression
 * parts do not.
 */
const isSingleExpression = (part) => part.strings === undefined;
const createMarker = () => document.createComment('');
/**
 * Inserts a ChildPart into the given container ChildPart's DOM, either at the
 * end of the container ChildPart, or before the optional `refPart`.
 *
 * This does not add the part to the containerPart's committed value. That must
 * be done by callers.
 *
 * @param containerPart Part within which to add the new ChildPart
 * @param refPart Part before which to add the new ChildPart; when omitted the
 *     part added to the end of the `containerPart`
 * @param part Part to insert, or undefined to create a new part
 */
const insertPart = (containerPart, refPart, part) => {
    const container = wrap(containerPart._$startNode).parentNode;
    const refNode = refPart === undefined ? containerPart._$endNode : refPart._$startNode;
    if (part === undefined) {
        const startNode = wrap(container).insertBefore(createMarker(), refNode);
        const endNode = wrap(container).insertBefore(createMarker(), refNode);
        part = new ChildPart(startNode, endNode, containerPart, containerPart.options);
    }
    else {
        const endNode = wrap(part._$endNode).nextSibling;
        const oldParent = part._$parent;
        const parentChanged = oldParent !== containerPart;
        if (parentChanged) {
            part._$reparentDisconnectables?.(containerPart);
            // Note that although `_$reparentDisconnectables` updates the part's
            // `_$parent` reference after unlinking from its current parent, that
            // method only exists if Disconnectables are present, so we need to
            // unconditionally set it here
            part._$parent = containerPart;
            // Since the _$isConnected getter is somewhat costly, only
            // read it once we know the subtree has directives that need
            // to be notified
            let newConnectionState;
            if (part._$notifyConnectionChanged !== undefined &&
                (newConnectionState = containerPart._$isConnected) !==
                    oldParent._$isConnected) {
                part._$notifyConnectionChanged(newConnectionState);
            }
        }
        if (endNode !== refNode || parentChanged) {
            let start = part._$startNode;
            while (start !== endNode) {
                const n = wrap(start).nextSibling;
                wrap(container).insertBefore(start, refNode);
                start = n;
            }
        }
    }
    return part;
};
/**
 * Sets the value of a Part.
 *
 * Note that this should only be used to set/update the value of user-created
 * parts (i.e. those created using `insertPart`); it should not be used
 * by directives to set the value of the directive's container part. Directives
 * should return a value from `update`/`render` to update their part state.
 *
 * For directives that require setting their part value asynchronously, they
 * should extend `AsyncDirective` and call `this.setValue()`.
 *
 * @param part Part to set
 * @param value Value to set
 * @param index For `AttributePart`s, the index to set
 * @param directiveParent Used internally; should not be set by user
 */
const setChildPartValue = (part, value, directiveParent = part) => {
    part._$setValue(value, directiveParent);
    return part;
};
// A sentinel value that can never appear as a part value except when set by
// live(). Used to force a dirty-check to fail and cause a re-render.
const RESET_VALUE = {};
/**
 * Sets the committed value of a ChildPart directly without triggering the
 * commit stage of the part.
 *
 * This is useful in cases where a directive needs to update the part such
 * that the next update detects a value change or not. When value is omitted,
 * the next update will be guaranteed to be detected as a change.
 *
 * @param part
 * @param value
 */
const setCommittedValue = (part, value = RESET_VALUE) => (part._$committedValue = value);
/**
 * Returns the committed value of a ChildPart.
 *
 * The committed value is used for change detection and efficient updates of
 * the part. It can differ from the value set by the template or directive in
 * cases where the template value is transformed before being committed.
 *
 * - `TemplateResult`s are committed as a `TemplateInstance`
 * - Iterables are committed as `Array<ChildPart>`
 * - All other types are committed as the template value or value returned or
 *   set by a directive.
 *
 * @param part
 */
const getCommittedValue = (part) => part._$committedValue;
/**
 * Removes a ChildPart from the DOM, including any of its content and markers.
 *
 * Note: The only difference between this and clearPart() is that this also
 * removes the part's start node. This means that the ChildPart must own its
 * start node, ie it must be a marker node specifically for this part and not an
 * anchor from surrounding content.
 *
 * @param part The Part to remove
 */
const removePart = (part) => {
    part._$clear();
    part._$startNode.remove();
};
const clearPart = (part) => {
    part._$clear();
};
//# sourceMappingURL=directive-helpers.js.map

/***/ },

/***/ "./node_modules/lit-html/development/directive.js"
/*!********************************************************!*\
  !*** ./node_modules/lit-html/development/directive.js ***!
  \********************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Directive: () => (/* binding */ Directive),
/* harmony export */   PartType: () => (/* binding */ PartType),
/* harmony export */   directive: () => (/* binding */ directive)
/* harmony export */ });
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const PartType = {
    ATTRIBUTE: 1,
    CHILD: 2,
    PROPERTY: 3,
    BOOLEAN_ATTRIBUTE: 4,
    EVENT: 5,
    ELEMENT: 6,
};
/**
 * Creates a user-facing directive function from a Directive class. This
 * function has the same parameters as the directive's render() method.
 */
const directive = (c) => (...values) => ({
    // This property needs to remain unminified.
    ['_$litDirective$']: c,
    values,
});
/**
 * Base class for creating custom directives. Users should extend this class,
 * implement `render` and/or `update`, and then pass their subclass to
 * `directive`.
 */
class Directive {
    constructor(_partInfo) { }
    // See comment in Disconnectable interface for why this is a getter
    get _$isConnected() {
        return this._$parent._$isConnected;
    }
    /** @internal */
    _$initialize(part, parent, attributeIndex) {
        this.__part = part;
        this._$parent = parent;
        this.__attributeIndex = attributeIndex;
    }
    /** @internal */
    _$resolve(part, props) {
        return this.update(part, props);
    }
    update(_part, props) {
        return this.render(...props);
    }
}
//# sourceMappingURL=directive.js.map

/***/ },

/***/ "./node_modules/lit-html/development/directives/ref.js"
/*!*************************************************************!*\
  !*** ./node_modules/lit-html/development/directives/ref.js ***!
  \*************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createRef: () => (/* binding */ createRef),
/* harmony export */   ref: () => (/* binding */ ref)
/* harmony export */ });
/* harmony import */ var _lit_html_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lit-html.js */ "./node_modules/lit-html/development/lit-html.js");
/* harmony import */ var _async_directive_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../async-directive.js */ "./node_modules/lit-html/development/async-directive.js");
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */


/**
 * Creates a new Ref object, which is container for a reference to an element.
 */
const createRef = () => new Ref();
/**
 * An object that holds a ref value.
 */
class Ref {
}
// When callbacks are used for refs, this map tracks the last value the callback
// was called with, for ensuring a directive doesn't clear the ref if the ref
// has already been rendered to a new spot. It is double-keyed on both the
// context (`options.host`) and the callback, since we auto-bind class methods
// to `options.host`.
const lastElementForContextAndCallback = new WeakMap();
class RefDirective extends _async_directive_js__WEBPACK_IMPORTED_MODULE_1__.AsyncDirective {
    render(_ref) {
        return _lit_html_js__WEBPACK_IMPORTED_MODULE_0__.nothing;
    }
    update(part, [ref]) {
        const refChanged = ref !== this._ref;
        if (refChanged && this._ref !== undefined) {
            // The ref passed to the directive has changed;
            // unset the previous ref's value
            this._updateRefValue(undefined);
        }
        if (refChanged || this._lastElementForRef !== this._element) {
            // We either got a new ref or this is the first render;
            // store the ref/element & update the ref value
            this._ref = ref;
            this._context = part.options?.host;
            this._updateRefValue((this._element = part.element));
        }
        return _lit_html_js__WEBPACK_IMPORTED_MODULE_0__.nothing;
    }
    _updateRefValue(element) {
        if (!this.isConnected) {
            element = undefined;
        }
        if (typeof this._ref === 'function') {
            // If the current ref was called with a previous value, call with
            // `undefined`; We do this to ensure callbacks are called in a consistent
            // way regardless of whether a ref might be moving up in the tree (in
            // which case it would otherwise be called with the new value before the
            // previous one unsets it) and down in the tree (where it would be unset
            // before being set). Note that element lookup is keyed by
            // both the context and the callback, since we allow passing unbound
            // functions that are called on options.host, and we want to treat
            // these as unique "instances" of a function.
            const context = this._context ?? globalThis;
            let lastElementForCallback = lastElementForContextAndCallback.get(context);
            if (lastElementForCallback === undefined) {
                lastElementForCallback = new WeakMap();
                lastElementForContextAndCallback.set(context, lastElementForCallback);
            }
            if (lastElementForCallback.get(this._ref) !== undefined) {
                this._ref.call(this._context, undefined);
            }
            lastElementForCallback.set(this._ref, element);
            // Call the ref with the new element value
            if (element !== undefined) {
                this._ref.call(this._context, element);
            }
        }
        else {
            this._ref.value = element;
        }
    }
    get _lastElementForRef() {
        return typeof this._ref === 'function'
            ? lastElementForContextAndCallback
                .get(this._context ?? globalThis)
                ?.get(this._ref)
            : this._ref?.value;
    }
    disconnected() {
        // Only clear the box if our element is still the one in it (i.e. another
        // directive instance hasn't rendered its element to it before us); that
        // only happens in the event of the directive being cleared (not via manual
        // disconnection)
        if (this._lastElementForRef === this._element) {
            this._updateRefValue(undefined);
        }
    }
    reconnected() {
        // If we were manually disconnected, we can safely put our element back in
        // the box, since no rendering could have occurred to change its state
        this._updateRefValue(this._element);
    }
}
/**
 * Sets the value of a Ref object or calls a ref callback with the element it's
 * bound to.
 *
 * A Ref object acts as a container for a reference to an element. A ref
 * callback is a function that takes an element as its only argument.
 *
 * The ref directive sets the value of the Ref object or calls the ref callback
 * during rendering, if the referenced element changed.
 *
 * Note: If a ref callback is rendered to a different element position or is
 * removed in a subsequent render, it will first be called with `undefined`,
 * followed by another call with the new element it was rendered to (if any).
 *
 * ```js
 * // Using Ref object
 * const inputRef = createRef();
 * render(html`<input ${ref(inputRef)}>`, container);
 * inputRef.value.focus();
 *
 * // Using callback
 * const callback = (inputElement) => inputElement.focus();
 * render(html`<input ${ref(callback)}>`, container);
 * ```
 */
const ref = (0,_async_directive_js__WEBPACK_IMPORTED_MODULE_1__.directive)(RefDirective);
//# sourceMappingURL=ref.js.map

/***/ },

/***/ "./node_modules/lit-html/development/is-server.js"
/*!********************************************************!*\
  !*** ./node_modules/lit-html/development/is-server.js ***!
  \********************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isServer: () => (/* binding */ isServer)
/* harmony export */ });
/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * @fileoverview
 *
 * This file exports a boolean const whose value will depend on what environment
 * the module is being imported from.
 */
const NODE_MODE = false;
/**
 * A boolean that will be `true` in server environments like Node, and `false`
 * in browser environments. Note that your server environment or toolchain must
 * support the `"node"` export condition for this to be `true`.
 *
 * This can be used when authoring components to change behavior based on
 * whether or not the component is executing in an SSR context.
 */
const isServer = NODE_MODE;
//# sourceMappingURL=is-server.js.map

/***/ },

/***/ "./node_modules/lit-html/development/lit-html.js"
/*!*******************************************************!*\
  !*** ./node_modules/lit-html/development/lit-html.js ***!
  \*******************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   _$LH: () => (/* binding */ _$LH),
/* harmony export */   html: () => (/* binding */ html),
/* harmony export */   mathml: () => (/* binding */ mathml),
/* harmony export */   noChange: () => (/* binding */ noChange),
/* harmony export */   nothing: () => (/* binding */ nothing),
/* harmony export */   render: () => (/* binding */ render),
/* harmony export */   svg: () => (/* binding */ svg)
/* harmony export */ });
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const DEV_MODE = true;
const ENABLE_EXTRA_SECURITY_HOOKS = true;
const ENABLE_SHADYDOM_NOPATCH = true;
const NODE_MODE = false;
// Allows minifiers to rename references to globalThis
const global = globalThis;
/**
 * Useful for visualizing and logging insights into what the Lit template system is doing.
 *
 * Compiled out of prod mode builds.
 */
const debugLogEvent = DEV_MODE
    ? (event) => {
        const shouldEmit = global
            .emitLitDebugLogEvents;
        if (!shouldEmit) {
            return;
        }
        global.dispatchEvent(new CustomEvent('lit-debug', {
            detail: event,
        }));
    }
    : undefined;
// Used for connecting beginRender and endRender events when there are nested
// renders when errors are thrown preventing an endRender event from being
// called.
let debugLogRenderId = 0;
let issueWarning;
if (DEV_MODE) {
    global.litIssuedWarnings ??= new Set();
    /**
     * Issue a warning if we haven't already, based either on `code` or `warning`.
     * Warnings are disabled automatically only by `warning`; disabling via `code`
     * can be done by users.
     */
    issueWarning = (code, warning) => {
        warning += code
            ? ` See https://lit.dev/msg/${code} for more information.`
            : '';
        if (!global.litIssuedWarnings.has(warning) &&
            !global.litIssuedWarnings.has(code)) {
            console.warn(warning);
            global.litIssuedWarnings.add(warning);
        }
    };
    queueMicrotask(() => {
        issueWarning('dev-mode', `Lit is in dev mode. Not recommended for production!`);
    });
}
const wrap = ENABLE_SHADYDOM_NOPATCH &&
    global.ShadyDOM?.inUse &&
    global.ShadyDOM?.noPatch === true
    ? global.ShadyDOM.wrap
    : (node) => node;
const trustedTypes = global.trustedTypes;
/**
 * Our TrustedTypePolicy for HTML which is declared using the html template
 * tag function.
 *
 * That HTML is a developer-authored constant, and is parsed with innerHTML
 * before any untrusted expressions have been mixed in. Therefor it is
 * considered safe by construction.
 */
const policy = trustedTypes
    ? trustedTypes.createPolicy('lit-html', {
        createHTML: (s) => s,
    })
    : undefined;
const identityFunction = (value) => value;
const noopSanitizer = (_node, _name, _type) => identityFunction;
/** Sets the global sanitizer factory. */
const setSanitizer = (newSanitizer) => {
    if (!ENABLE_EXTRA_SECURITY_HOOKS) {
        return;
    }
    if (sanitizerFactoryInternal !== noopSanitizer) {
        throw new Error(`Attempted to overwrite existing lit-html security policy.` +
            ` setSanitizeDOMValueFactory should be called at most once.`);
    }
    sanitizerFactoryInternal = newSanitizer;
};
/**
 * Only used in internal tests, not a part of the public API.
 */
const _testOnlyClearSanitizerFactoryDoNotCallOrElse = () => {
    sanitizerFactoryInternal = noopSanitizer;
};
const createSanitizer = (node, name, type) => {
    return sanitizerFactoryInternal(node, name, type);
};
// Added to an attribute name to mark the attribute as bound so we can find
// it easily.
const boundAttributeSuffix = '$lit$';
// This marker is used in many syntactic positions in HTML, so it must be
// a valid element name and attribute name. We don't support dynamic names (yet)
// but this at least ensures that the parse tree is closer to the template
// intention.
const marker = `lit$${Math.random().toFixed(9).slice(2)}$`;
// String used to tell if a comment is a marker comment
const markerMatch = '?' + marker;
// Text used to insert a comment marker node. We use processing instruction
// syntax because it's slightly smaller, but parses as a comment node.
const nodeMarker = `<${markerMatch}>`;
const d = NODE_MODE && global.document === undefined
    ? {
        createTreeWalker() {
            return {};
        },
    }
    : document;
// Creates a dynamic marker. We never have to search for these in the DOM.
const createMarker = () => d.createComment('');
const isPrimitive = (value) => value === null || (typeof value != 'object' && typeof value != 'function');
const isArray = Array.isArray;
const isIterable = (value) => isArray(value) ||
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    typeof value?.[Symbol.iterator] === 'function';
const SPACE_CHAR = `[ \t\n\f\r]`;
const ATTR_VALUE_CHAR = `[^ \t\n\f\r"'\`<>=]`;
const NAME_CHAR = `[^\\s"'>=/]`;
// These regexes represent the five parsing states that we care about in the
// Template's HTML scanner. They match the *end* of the state they're named
// after.
// Depending on the match, we transition to a new state. If there's no match,
// we stay in the same state.
// Note that the regexes are stateful. We utilize lastIndex and sync it
// across the multiple regexes used. In addition to the five regexes below
// we also dynamically create a regex to find the matching end tags for raw
// text elements.
/**
 * End of text is: `<` followed by:
 *   (comment start) or (tag) or (dynamic tag binding)
 */
const textEndRegex = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g;
const COMMENT_START = 1;
const TAG_NAME = 2;
const DYNAMIC_TAG_NAME = 3;
const commentEndRegex = /-->/g;
/**
 * Comments not started with <!--, like </{, can be ended by a single `>`
 */
const comment2EndRegex = />/g;
/**
 * The tagEnd regex matches the end of the "inside an opening" tag syntax
 * position. It either matches a `>`, an attribute-like sequence, or the end
 * of the string after a space (attribute-name position ending).
 *
 * See attributes in the HTML spec:
 * https://www.w3.org/TR/html5/syntax.html#elements-attributes
 *
 * " \t\n\f\r" are HTML space characters:
 * https://infra.spec.whatwg.org/#ascii-whitespace
 *
 * So an attribute is:
 *  * The name: any character except a whitespace character, ("), ('), ">",
 *    "=", or "/". Note: this is different from the HTML spec which also excludes control characters.
 *  * Followed by zero or more space characters
 *  * Followed by "="
 *  * Followed by zero or more space characters
 *  * Followed by:
 *    * Any character except space, ('), ("), "<", ">", "=", (`), or
 *    * (") then any non-("), or
 *    * (') then any non-(')
 */
const tagEndRegex = new RegExp(`>|${SPACE_CHAR}(?:(${NAME_CHAR}+)(${SPACE_CHAR}*=${SPACE_CHAR}*(?:${ATTR_VALUE_CHAR}|("|')|))|$)`, 'g');
const ENTIRE_MATCH = 0;
const ATTRIBUTE_NAME = 1;
const SPACES_AND_EQUALS = 2;
const QUOTE_CHAR = 3;
const singleQuoteAttrEndRegex = /'/g;
const doubleQuoteAttrEndRegex = /"/g;
/**
 * Matches the raw text elements.
 *
 * Comments are not parsed within raw text elements, so we need to search their
 * text content for marker strings.
 */
const rawTextElement = /^(?:script|style|textarea|title)$/i;
/** TemplateResult types */
const HTML_RESULT = 1;
const SVG_RESULT = 2;
const MATHML_RESULT = 3;
// TemplatePart types
// IMPORTANT: these must match the values in PartType
const ATTRIBUTE_PART = 1;
const CHILD_PART = 2;
const PROPERTY_PART = 3;
const BOOLEAN_ATTRIBUTE_PART = 4;
const EVENT_PART = 5;
const ELEMENT_PART = 6;
const COMMENT_PART = 7;
/**
 * Generates a template literal tag function that returns a TemplateResult with
 * the given result type.
 */
const tag = (type) => (strings, ...values) => {
    // Warn against templates octal escape sequences
    // We do this here rather than in render so that the warning is closer to the
    // template definition.
    if (DEV_MODE && strings.some((s) => s === undefined)) {
        console.warn('Some template strings are undefined.\n' +
            'This is probably caused by illegal octal escape sequences.');
    }
    if (DEV_MODE) {
        // Import static-html.js results in a circular dependency which g3 doesn't
        // handle. Instead we know that static values must have the field
        // `_$litStatic$`.
        if (values.some((val) => val?.['_$litStatic$'])) {
            issueWarning('', `Static values 'literal' or 'unsafeStatic' cannot be used as values to non-static templates.\n` +
                `Please use the static 'html' tag function. See https://lit.dev/docs/templates/expressions/#static-expressions`);
        }
    }
    return {
        // This property needs to remain unminified.
        ['_$litType$']: type,
        strings,
        values,
    };
};
/**
 * Interprets a template literal as an HTML template that can efficiently
 * render to and update a container.
 *
 * ```ts
 * const header = (title: string) => html`<h1>${title}</h1>`;
 * ```
 *
 * The `html` tag returns a description of the DOM to render as a value. It is
 * lazy, meaning no work is done until the template is rendered. When rendering,
 * if a template comes from the same expression as a previously rendered result,
 * it's efficiently updated instead of replaced.
 */
const html = tag(HTML_RESULT);
/**
 * Interprets a template literal as an SVG fragment that can efficiently render
 * to and update a container.
 *
 * ```ts
 * const rect = svg`<rect width="10" height="10"></rect>`;
 *
 * const myImage = html`
 *   <svg viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
 *     ${rect}
 *   </svg>`;
 * ```
 *
 * The `svg` *tag function* should only be used for SVG fragments, or elements
 * that would be contained **inside** an `<svg>` HTML element. A common error is
 * placing an `<svg>` *element* in a template tagged with the `svg` tag
 * function. The `<svg>` element is an HTML element and should be used within a
 * template tagged with the {@linkcode html} tag function.
 *
 * In LitElement usage, it's invalid to return an SVG fragment from the
 * `render()` method, as the SVG fragment will be contained within the element's
 * shadow root and thus not be properly contained within an `<svg>` HTML
 * element.
 */
const svg = tag(SVG_RESULT);
/**
 * Interprets a template literal as MathML fragment that can efficiently render
 * to and update a container.
 *
 * ```ts
 * const num = mathml`<mn>1</mn>`;
 *
 * const eq = html`
 *   <math>
 *     ${num}
 *   </math>`;
 * ```
 *
 * The `mathml` *tag function* should only be used for MathML fragments, or
 * elements that would be contained **inside** a `<math>` HTML element. A common
 * error is placing a `<math>` *element* in a template tagged with the `mathml`
 * tag function. The `<math>` element is an HTML element and should be used
 * within a template tagged with the {@linkcode html} tag function.
 *
 * In LitElement usage, it's invalid to return an MathML fragment from the
 * `render()` method, as the MathML fragment will be contained within the
 * element's shadow root and thus not be properly contained within a `<math>`
 * HTML element.
 */
const mathml = tag(MATHML_RESULT);
/**
 * A sentinel value that signals that a value was handled by a directive and
 * should not be written to the DOM.
 */
const noChange = Symbol.for('lit-noChange');
/**
 * A sentinel value that signals a ChildPart to fully clear its content.
 *
 * ```ts
 * const button = html`${
 *  user.isAdmin
 *    ? html`<button>DELETE</button>`
 *    : nothing
 * }`;
 * ```
 *
 * Prefer using `nothing` over other falsy values as it provides a consistent
 * behavior between various expression binding contexts.
 *
 * In child expressions, `undefined`, `null`, `''`, and `nothing` all behave the
 * same and render no nodes. In attribute expressions, `nothing` _removes_ the
 * attribute, while `undefined` and `null` will render an empty string. In
 * property expressions `nothing` becomes `undefined`.
 */
const nothing = Symbol.for('lit-nothing');
/**
 * The cache of prepared templates, keyed by the tagged TemplateStringsArray
 * and _not_ accounting for the specific template tag used. This means that
 * template tags cannot be dynamic - they must statically be one of html, svg,
 * or attr. This restriction simplifies the cache lookup, which is on the hot
 * path for rendering.
 */
const templateCache = new WeakMap();
const walker = d.createTreeWalker(d, 129 /* NodeFilter.SHOW_{ELEMENT|COMMENT} */);
let sanitizerFactoryInternal = noopSanitizer;
function trustFromTemplateString(tsa, stringFromTSA) {
    // A security check to prevent spoofing of Lit template results.
    // In the future, we may be able to replace this with Array.isTemplateObject,
    // though we might need to make that check inside of the html and svg
    // functions, because precompiled templates don't come in as
    // TemplateStringArray objects.
    if (!isArray(tsa) || !tsa.hasOwnProperty('raw')) {
        let message = 'invalid template strings array';
        if (DEV_MODE) {
            message = `
          Internal Error: expected template strings to be an array
          with a 'raw' field. Faking a template strings array by
          calling html or svg like an ordinary function is effectively
          the same as calling unsafeHtml and can lead to major security
          issues, e.g. opening your code up to XSS attacks.
          If you're using the html or svg tagged template functions normally
          and still seeing this error, please file a bug at
          https://github.com/lit/lit/issues/new?template=bug_report.md
          and include information about your build tooling, if any.
        `
                .trim()
                .replace(/\n */g, '\n');
        }
        throw new Error(message);
    }
    return policy !== undefined
        ? policy.createHTML(stringFromTSA)
        : stringFromTSA;
}
/**
 * Returns an HTML string for the given TemplateStringsArray and result type
 * (HTML or SVG), along with the case-sensitive bound attribute names in
 * template order. The HTML contains comment markers denoting the `ChildPart`s
 * and suffixes on bound attributes denoting the `AttributeParts`.
 *
 * @param strings template strings array
 * @param type HTML or SVG
 * @return Array containing `[html, attrNames]` (array returned for terseness,
 *     to avoid object fields since this code is shared with non-minified SSR
 *     code)
 */
const getTemplateHtml = (strings, type) => {
    // Insert makers into the template HTML to represent the position of
    // bindings. The following code scans the template strings to determine the
    // syntactic position of the bindings. They can be in text position, where
    // we insert an HTML comment, attribute value position, where we insert a
    // sentinel string and re-write the attribute name, or inside a tag where
    // we insert the sentinel string.
    const l = strings.length - 1;
    // Stores the case-sensitive bound attribute names in the order of their
    // parts. ElementParts are also reflected in this array as undefined
    // rather than a string, to disambiguate from attribute bindings.
    const attrNames = [];
    let html = type === SVG_RESULT ? '<svg>' : type === MATHML_RESULT ? '<math>' : '';
    // When we're inside a raw text tag (not it's text content), the regex
    // will still be tagRegex so we can find attributes, but will switch to
    // this regex when the tag ends.
    let rawTextEndRegex;
    // The current parsing state, represented as a reference to one of the
    // regexes
    let regex = textEndRegex;
    for (let i = 0; i < l; i++) {
        const s = strings[i];
        // The index of the end of the last attribute name. When this is
        // positive at end of a string, it means we're in an attribute value
        // position and need to rewrite the attribute name.
        // We also use a special value of -2 to indicate that we encountered
        // the end of a string in attribute name position.
        let attrNameEndIndex = -1;
        let attrName;
        let lastIndex = 0;
        let match;
        // The conditions in this loop handle the current parse state, and the
        // assignments to the `regex` variable are the state transitions.
        while (lastIndex < s.length) {
            // Make sure we start searching from where we previously left off
            regex.lastIndex = lastIndex;
            match = regex.exec(s);
            if (match === null) {
                break;
            }
            lastIndex = regex.lastIndex;
            if (regex === textEndRegex) {
                if (match[COMMENT_START] === '!--') {
                    regex = commentEndRegex;
                }
                else if (match[COMMENT_START] !== undefined) {
                    // We started a weird comment, like </{
                    regex = comment2EndRegex;
                }
                else if (match[TAG_NAME] !== undefined) {
                    if (rawTextElement.test(match[TAG_NAME])) {
                        // Record if we encounter a raw-text element. We'll switch to
                        // this regex at the end of the tag.
                        rawTextEndRegex = new RegExp(`</${match[TAG_NAME]}`, 'g');
                    }
                    regex = tagEndRegex;
                }
                else if (match[DYNAMIC_TAG_NAME] !== undefined) {
                    if (DEV_MODE) {
                        throw new Error('Bindings in tag names are not supported. Please use static templates instead. ' +
                            'See https://lit.dev/docs/templates/expressions/#static-expressions');
                    }
                    regex = tagEndRegex;
                }
            }
            else if (regex === tagEndRegex) {
                if (match[ENTIRE_MATCH] === '>') {
                    // End of a tag. If we had started a raw-text element, use that
                    // regex
                    regex = rawTextEndRegex ?? textEndRegex;
                    // We may be ending an unquoted attribute value, so make sure we
                    // clear any pending attrNameEndIndex
                    attrNameEndIndex = -1;
                }
                else if (match[ATTRIBUTE_NAME] === undefined) {
                    // Attribute name position
                    attrNameEndIndex = -2;
                }
                else {
                    attrNameEndIndex = regex.lastIndex - match[SPACES_AND_EQUALS].length;
                    attrName = match[ATTRIBUTE_NAME];
                    regex =
                        match[QUOTE_CHAR] === undefined
                            ? tagEndRegex
                            : match[QUOTE_CHAR] === '"'
                                ? doubleQuoteAttrEndRegex
                                : singleQuoteAttrEndRegex;
                }
            }
            else if (regex === doubleQuoteAttrEndRegex ||
                regex === singleQuoteAttrEndRegex) {
                regex = tagEndRegex;
            }
            else if (regex === commentEndRegex || regex === comment2EndRegex) {
                regex = textEndRegex;
            }
            else {
                // Not one of the five state regexes, so it must be the dynamically
                // created raw text regex and we're at the close of that element.
                regex = tagEndRegex;
                rawTextEndRegex = undefined;
            }
        }
        if (DEV_MODE) {
            // If we have a attrNameEndIndex, which indicates that we should
            // rewrite the attribute name, assert that we're in a valid attribute
            // position - either in a tag, or a quoted attribute value.
            console.assert(attrNameEndIndex === -1 ||
                regex === tagEndRegex ||
                regex === singleQuoteAttrEndRegex ||
                regex === doubleQuoteAttrEndRegex, 'unexpected parse state B');
        }
        // We have four cases:
        //  1. We're in text position, and not in a raw text element
        //     (regex === textEndRegex): insert a comment marker.
        //  2. We have a non-negative attrNameEndIndex which means we need to
        //     rewrite the attribute name to add a bound attribute suffix.
        //  3. We're at the non-first binding in a multi-binding attribute, use a
        //     plain marker.
        //  4. We're somewhere else inside the tag. If we're in attribute name
        //     position (attrNameEndIndex === -2), add a sequential suffix to
        //     generate a unique attribute name.
        // Detect a binding next to self-closing tag end and insert a space to
        // separate the marker from the tag end:
        const end = regex === tagEndRegex && strings[i + 1].startsWith('/>') ? ' ' : '';
        html +=
            regex === textEndRegex
                ? s + nodeMarker
                : attrNameEndIndex >= 0
                    ? (attrNames.push(attrName),
                        s.slice(0, attrNameEndIndex) +
                            boundAttributeSuffix +
                            s.slice(attrNameEndIndex)) +
                        marker +
                        end
                    : s + marker + (attrNameEndIndex === -2 ? i : end);
    }
    const htmlResult = html +
        (strings[l] || '<?>') +
        (type === SVG_RESULT ? '</svg>' : type === MATHML_RESULT ? '</math>' : '');
    // Returned as an array for terseness
    return [trustFromTemplateString(strings, htmlResult), attrNames];
};
class Template {
    constructor(
    // This property needs to remain unminified.
    { strings, ['_$litType$']: type }, options) {
        this.parts = [];
        let node;
        let nodeIndex = 0;
        let attrNameIndex = 0;
        const partCount = strings.length - 1;
        const parts = this.parts;
        // Create template element
        const [html, attrNames] = getTemplateHtml(strings, type);
        this.el = Template.createElement(html, options);
        walker.currentNode = this.el.content;
        // Re-parent SVG or MathML nodes into template root
        if (type === SVG_RESULT || type === MATHML_RESULT) {
            const wrapper = this.el.content.firstChild;
            wrapper.replaceWith(...wrapper.childNodes);
        }
        // Walk the template to find binding markers and create TemplateParts
        while ((node = walker.nextNode()) !== null && parts.length < partCount) {
            if (node.nodeType === 1) {
                if (DEV_MODE) {
                    const tag = node.localName;
                    // Warn if `textarea` includes an expression and throw if `template`
                    // does since these are not supported. We do this by checking
                    // innerHTML for anything that looks like a marker. This catches
                    // cases like bindings in textarea there markers turn into text nodes.
                    if (/^(?:textarea|template)$/i.test(tag) &&
                        node.innerHTML.includes(marker)) {
                        const m = `Expressions are not supported inside \`${tag}\` ` +
                            `elements. See https://lit.dev/msg/expression-in-${tag} for more ` +
                            `information.`;
                        if (tag === 'template') {
                            throw new Error(m);
                        }
                        else
                            issueWarning('', m);
                    }
                }
                // TODO (justinfagnani): for attempted dynamic tag names, we don't
                // increment the bindingIndex, and it'll be off by 1 in the element
                // and off by two after it.
                if (node.hasAttributes()) {
                    for (const name of node.getAttributeNames()) {
                        if (name.endsWith(boundAttributeSuffix)) {
                            const realName = attrNames[attrNameIndex++];
                            const value = node.getAttribute(name);
                            const statics = value.split(marker);
                            const m = /([.?@])?(.*)/.exec(realName);
                            parts.push({
                                type: ATTRIBUTE_PART,
                                index: nodeIndex,
                                name: m[2],
                                strings: statics,
                                ctor: m[1] === '.'
                                    ? PropertyPart
                                    : m[1] === '?'
                                        ? BooleanAttributePart
                                        : m[1] === '@'
                                            ? EventPart
                                            : AttributePart,
                            });
                            node.removeAttribute(name);
                        }
                        else if (name.startsWith(marker)) {
                            parts.push({
                                type: ELEMENT_PART,
                                index: nodeIndex,
                            });
                            node.removeAttribute(name);
                        }
                    }
                }
                // TODO (justinfagnani): benchmark the regex against testing for each
                // of the 3 raw text element names.
                if (rawTextElement.test(node.tagName)) {
                    // For raw text elements we need to split the text content on
                    // markers, create a Text node for each segment, and create
                    // a TemplatePart for each marker.
                    const strings = node.textContent.split(marker);
                    const lastIndex = strings.length - 1;
                    if (lastIndex > 0) {
                        node.textContent = trustedTypes
                            ? trustedTypes.emptyScript
                            : '';
                        // Generate a new text node for each literal section
                        // These nodes are also used as the markers for child parts
                        for (let i = 0; i < lastIndex; i++) {
                            node.append(strings[i], createMarker());
                            // Walk past the marker node we just added
                            walker.nextNode();
                            parts.push({ type: CHILD_PART, index: ++nodeIndex });
                        }
                        // Note because this marker is added after the walker's current
                        // node, it will be walked to in the outer loop (and ignored), so
                        // we don't need to adjust nodeIndex here
                        node.append(strings[lastIndex], createMarker());
                    }
                }
            }
            else if (node.nodeType === 8) {
                const data = node.data;
                if (data === markerMatch) {
                    parts.push({ type: CHILD_PART, index: nodeIndex });
                }
                else {
                    let i = -1;
                    while ((i = node.data.indexOf(marker, i + 1)) !== -1) {
                        // Comment node has a binding marker inside, make an inactive part
                        // The binding won't work, but subsequent bindings will
                        parts.push({ type: COMMENT_PART, index: nodeIndex });
                        // Move to the end of the match
                        i += marker.length - 1;
                    }
                }
            }
            nodeIndex++;
        }
        if (DEV_MODE) {
            // If there was a duplicate attribute on a tag, then when the tag is
            // parsed into an element the attribute gets de-duplicated. We can detect
            // this mismatch if we haven't precisely consumed every attribute name
            // when preparing the template. This works because `attrNames` is built
            // from the template string and `attrNameIndex` comes from processing the
            // resulting DOM.
            if (attrNames.length !== attrNameIndex) {
                throw new Error(`Detected duplicate attribute bindings. This occurs if your template ` +
                    `has duplicate attributes on an element tag. For example ` +
                    `"<input ?disabled=\${true} ?disabled=\${false}>" contains a ` +
                    `duplicate "disabled" attribute. The error was detected in ` +
                    `the following template: \n` +
                    '`' +
                    strings.join('${...}') +
                    '`');
            }
        }
        // We could set walker.currentNode to another node here to prevent a memory
        // leak, but every time we prepare a template, we immediately render it
        // and re-use the walker in new TemplateInstance._clone().
        debugLogEvent &&
            debugLogEvent({
                kind: 'template prep',
                template: this,
                clonableTemplate: this.el,
                parts: this.parts,
                strings,
            });
    }
    // Overridden via `litHtmlPolyfillSupport` to provide platform support.
    /** @nocollapse */
    static createElement(html, _options) {
        const el = d.createElement('template');
        el.innerHTML = html;
        return el;
    }
}
function resolveDirective(part, value, parent = part, attributeIndex) {
    // Bail early if the value is explicitly noChange. Note, this means any
    // nested directive is still attached and is not run.
    if (value === noChange) {
        return value;
    }
    let currentDirective = attributeIndex !== undefined
        ? parent.__directives?.[attributeIndex]
        : parent.__directive;
    const nextDirectiveConstructor = isPrimitive(value)
        ? undefined
        : // This property needs to remain unminified.
            value['_$litDirective$'];
    if (currentDirective?.constructor !== nextDirectiveConstructor) {
        // This property needs to remain unminified.
        currentDirective?.['_$notifyDirectiveConnectionChanged']?.(false);
        if (nextDirectiveConstructor === undefined) {
            currentDirective = undefined;
        }
        else {
            currentDirective = new nextDirectiveConstructor(part);
            currentDirective._$initialize(part, parent, attributeIndex);
        }
        if (attributeIndex !== undefined) {
            (parent.__directives ??= [])[attributeIndex] =
                currentDirective;
        }
        else {
            parent.__directive = currentDirective;
        }
    }
    if (currentDirective !== undefined) {
        value = resolveDirective(part, currentDirective._$resolve(part, value.values), currentDirective, attributeIndex);
    }
    return value;
}
/**
 * An updateable instance of a Template. Holds references to the Parts used to
 * update the template instance.
 */
class TemplateInstance {
    constructor(template, parent) {
        this._$parts = [];
        /** @internal */
        this._$disconnectableChildren = undefined;
        this._$template = template;
        this._$parent = parent;
    }
    // Called by ChildPart parentNode getter
    get parentNode() {
        return this._$parent.parentNode;
    }
    // See comment in Disconnectable interface for why this is a getter
    get _$isConnected() {
        return this._$parent._$isConnected;
    }
    // This method is separate from the constructor because we need to return a
    // DocumentFragment and we don't want to hold onto it with an instance field.
    _clone(options) {
        const { el: { content }, parts: parts, } = this._$template;
        const fragment = (options?.creationScope ?? d).importNode(content, true);
        walker.currentNode = fragment;
        let node = walker.nextNode();
        let nodeIndex = 0;
        let partIndex = 0;
        let templatePart = parts[0];
        while (templatePart !== undefined) {
            if (nodeIndex === templatePart.index) {
                let part;
                if (templatePart.type === CHILD_PART) {
                    part = new ChildPart(node, node.nextSibling, this, options);
                }
                else if (templatePart.type === ATTRIBUTE_PART) {
                    part = new templatePart.ctor(node, templatePart.name, templatePart.strings, this, options);
                }
                else if (templatePart.type === ELEMENT_PART) {
                    part = new ElementPart(node, this, options);
                }
                this._$parts.push(part);
                templatePart = parts[++partIndex];
            }
            if (nodeIndex !== templatePart?.index) {
                node = walker.nextNode();
                nodeIndex++;
            }
        }
        // We need to set the currentNode away from the cloned tree so that we
        // don't hold onto the tree even if the tree is detached and should be
        // freed.
        walker.currentNode = d;
        return fragment;
    }
    _update(values) {
        let i = 0;
        for (const part of this._$parts) {
            if (part !== undefined) {
                debugLogEvent &&
                    debugLogEvent({
                        kind: 'set part',
                        part,
                        value: values[i],
                        valueIndex: i,
                        values,
                        templateInstance: this,
                    });
                if (part.strings !== undefined) {
                    part._$setValue(values, part, i);
                    // The number of values the part consumes is part.strings.length - 1
                    // since values are in between template spans. We increment i by 1
                    // later in the loop, so increment it by part.strings.length - 2 here
                    i += part.strings.length - 2;
                }
                else {
                    part._$setValue(values[i]);
                }
            }
            i++;
        }
    }
}
class ChildPart {
    // See comment in Disconnectable interface for why this is a getter
    get _$isConnected() {
        // ChildParts that are not at the root should always be created with a
        // parent; only RootChildNode's won't, so they return the local isConnected
        // state
        return this._$parent?._$isConnected ?? this.__isConnected;
    }
    constructor(startNode, endNode, parent, options) {
        this.type = CHILD_PART;
        this._$committedValue = nothing;
        // The following fields will be patched onto ChildParts when required by
        // AsyncDirective
        /** @internal */
        this._$disconnectableChildren = undefined;
        this._$startNode = startNode;
        this._$endNode = endNode;
        this._$parent = parent;
        this.options = options;
        // Note __isConnected is only ever accessed on RootParts (i.e. when there is
        // no _$parent); the value on a non-root-part is "don't care", but checking
        // for parent would be more code
        this.__isConnected = options?.isConnected ?? true;
        if (ENABLE_EXTRA_SECURITY_HOOKS) {
            // Explicitly initialize for consistent class shape.
            this._textSanitizer = undefined;
        }
    }
    /**
     * The parent node into which the part renders its content.
     *
     * A ChildPart's content consists of a range of adjacent child nodes of
     * `.parentNode`, possibly bordered by 'marker nodes' (`.startNode` and
     * `.endNode`).
     *
     * - If both `.startNode` and `.endNode` are non-null, then the part's content
     * consists of all siblings between `.startNode` and `.endNode`, exclusively.
     *
     * - If `.startNode` is non-null but `.endNode` is null, then the part's
     * content consists of all siblings following `.startNode`, up to and
     * including the last child of `.parentNode`. If `.endNode` is non-null, then
     * `.startNode` will always be non-null.
     *
     * - If both `.endNode` and `.startNode` are null, then the part's content
     * consists of all child nodes of `.parentNode`.
     */
    get parentNode() {
        let parentNode = wrap(this._$startNode).parentNode;
        const parent = this._$parent;
        if (parent !== undefined &&
            parentNode?.nodeType === 11 /* Node.DOCUMENT_FRAGMENT */) {
            // If the parentNode is a DocumentFragment, it may be because the DOM is
            // still in the cloned fragment during initial render; if so, get the real
            // parentNode the part will be committed into by asking the parent.
            parentNode = parent.parentNode;
        }
        return parentNode;
    }
    /**
     * The part's leading marker node, if any. See `.parentNode` for more
     * information.
     */
    get startNode() {
        return this._$startNode;
    }
    /**
     * The part's trailing marker node, if any. See `.parentNode` for more
     * information.
     */
    get endNode() {
        return this._$endNode;
    }
    _$setValue(value, directiveParent = this) {
        if (DEV_MODE && this.parentNode === null) {
            throw new Error(`This \`ChildPart\` has no \`parentNode\` and therefore cannot accept a value. This likely means the element containing the part was manipulated in an unsupported way outside of Lit's control such that the part's marker nodes were ejected from DOM. For example, setting the element's \`innerHTML\` or \`textContent\` can do this.`);
        }
        value = resolveDirective(this, value, directiveParent);
        if (isPrimitive(value)) {
            // Non-rendering child values. It's important that these do not render
            // empty text nodes to avoid issues with preventing default <slot>
            // fallback content.
            if (value === nothing || value == null || value === '') {
                if (this._$committedValue !== nothing) {
                    debugLogEvent &&
                        debugLogEvent({
                            kind: 'commit nothing to child',
                            start: this._$startNode,
                            end: this._$endNode,
                            parent: this._$parent,
                            options: this.options,
                        });
                    this._$clear();
                }
                this._$committedValue = nothing;
            }
            else if (value !== this._$committedValue && value !== noChange) {
                this._commitText(value);
            }
            // This property needs to remain unminified.
        }
        else if (value['_$litType$'] !== undefined) {
            this._commitTemplateResult(value);
        }
        else if (value.nodeType !== undefined) {
            if (DEV_MODE && this.options?.host === value) {
                this._commitText(`[probable mistake: rendered a template's host in itself ` +
                    `(commonly caused by writing \${this} in a template]`);
                console.warn(`Attempted to render the template host`, value, `inside itself. This is almost always a mistake, and in dev mode `, `we render some warning text. In production however, we'll `, `render it, which will usually result in an error, and sometimes `, `in the element disappearing from the DOM.`);
                return;
            }
            this._commitNode(value);
        }
        else if (isIterable(value)) {
            this._commitIterable(value);
        }
        else {
            // Fallback, will render the string representation
            this._commitText(value);
        }
    }
    _insert(node) {
        return wrap(wrap(this._$startNode).parentNode).insertBefore(node, this._$endNode);
    }
    _commitNode(value) {
        if (this._$committedValue !== value) {
            this._$clear();
            if (ENABLE_EXTRA_SECURITY_HOOKS &&
                sanitizerFactoryInternal !== noopSanitizer) {
                const parentNodeName = this._$startNode.parentNode?.nodeName;
                if (parentNodeName === 'STYLE' || parentNodeName === 'SCRIPT') {
                    let message = 'Forbidden';
                    if (DEV_MODE) {
                        if (parentNodeName === 'STYLE') {
                            message =
                                `Lit does not support binding inside style nodes. ` +
                                    `This is a security risk, as style injection attacks can ` +
                                    `exfiltrate data and spoof UIs. ` +
                                    `Consider instead using css\`...\` literals ` +
                                    `to compose styles, and do dynamic styling with ` +
                                    `css custom properties, ::parts, <slot>s, ` +
                                    `and by mutating the DOM rather than stylesheets.`;
                        }
                        else {
                            message =
                                `Lit does not support binding inside script nodes. ` +
                                    `This is a security risk, as it could allow arbitrary ` +
                                    `code execution.`;
                        }
                    }
                    throw new Error(message);
                }
            }
            debugLogEvent &&
                debugLogEvent({
                    kind: 'commit node',
                    start: this._$startNode,
                    parent: this._$parent,
                    value: value,
                    options: this.options,
                });
            this._$committedValue = this._insert(value);
        }
    }
    _commitText(value) {
        // If the committed value is a primitive it means we called _commitText on
        // the previous render, and we know that this._$startNode.nextSibling is a
        // Text node. We can now just replace the text content (.data) of the node.
        if (this._$committedValue !== nothing &&
            isPrimitive(this._$committedValue)) {
            const node = wrap(this._$startNode).nextSibling;
            if (ENABLE_EXTRA_SECURITY_HOOKS) {
                if (this._textSanitizer === undefined) {
                    this._textSanitizer = createSanitizer(node, 'data', 'property');
                }
                value = this._textSanitizer(value);
            }
            debugLogEvent &&
                debugLogEvent({
                    kind: 'commit text',
                    node,
                    value,
                    options: this.options,
                });
            node.data = value;
        }
        else {
            if (ENABLE_EXTRA_SECURITY_HOOKS) {
                const textNode = d.createTextNode('');
                this._commitNode(textNode);
                // When setting text content, for security purposes it matters a lot
                // what the parent is. For example, <style> and <script> need to be
                // handled with care, while <span> does not. So first we need to put a
                // text node into the document, then we can sanitize its content.
                if (this._textSanitizer === undefined) {
                    this._textSanitizer = createSanitizer(textNode, 'data', 'property');
                }
                value = this._textSanitizer(value);
                debugLogEvent &&
                    debugLogEvent({
                        kind: 'commit text',
                        node: textNode,
                        value,
                        options: this.options,
                    });
                textNode.data = value;
            }
            else {
                this._commitNode(d.createTextNode(value));
                debugLogEvent &&
                    debugLogEvent({
                        kind: 'commit text',
                        node: wrap(this._$startNode).nextSibling,
                        value,
                        options: this.options,
                    });
            }
        }
        this._$committedValue = value;
    }
    _commitTemplateResult(result) {
        // This property needs to remain unminified.
        const { values, ['_$litType$']: type } = result;
        // If $litType$ is a number, result is a plain TemplateResult and we get
        // the template from the template cache. If not, result is a
        // CompiledTemplateResult and _$litType$ is a CompiledTemplate and we need
        // to create the <template> element the first time we see it.
        const template = typeof type === 'number'
            ? this._$getTemplate(result)
            : (type.el === undefined &&
                (type.el = Template.createElement(trustFromTemplateString(type.h, type.h[0]), this.options)),
                type);
        if (this._$committedValue?._$template === template) {
            debugLogEvent &&
                debugLogEvent({
                    kind: 'template updating',
                    template,
                    instance: this._$committedValue,
                    parts: this._$committedValue._$parts,
                    options: this.options,
                    values,
                });
            this._$committedValue._update(values);
        }
        else {
            const instance = new TemplateInstance(template, this);
            const fragment = instance._clone(this.options);
            debugLogEvent &&
                debugLogEvent({
                    kind: 'template instantiated',
                    template,
                    instance,
                    parts: instance._$parts,
                    options: this.options,
                    fragment,
                    values,
                });
            instance._update(values);
            debugLogEvent &&
                debugLogEvent({
                    kind: 'template instantiated and updated',
                    template,
                    instance,
                    parts: instance._$parts,
                    options: this.options,
                    fragment,
                    values,
                });
            this._commitNode(fragment);
            this._$committedValue = instance;
        }
    }
    // Overridden via `litHtmlPolyfillSupport` to provide platform support.
    /** @internal */
    _$getTemplate(result) {
        let template = templateCache.get(result.strings);
        if (template === undefined) {
            templateCache.set(result.strings, (template = new Template(result)));
        }
        return template;
    }
    _commitIterable(value) {
        // For an Iterable, we create a new InstancePart per item, then set its
        // value to the item. This is a little bit of overhead for every item in
        // an Iterable, but it lets us recurse easily and efficiently update Arrays
        // of TemplateResults that will be commonly returned from expressions like:
        // array.map((i) => html`${i}`), by reusing existing TemplateInstances.
        // If value is an array, then the previous render was of an
        // iterable and value will contain the ChildParts from the previous
        // render. If value is not an array, clear this part and make a new
        // array for ChildParts.
        if (!isArray(this._$committedValue)) {
            this._$committedValue = [];
            this._$clear();
        }
        // Lets us keep track of how many items we stamped so we can clear leftover
        // items from a previous render
        const itemParts = this._$committedValue;
        let partIndex = 0;
        let itemPart;
        for (const item of value) {
            if (partIndex === itemParts.length) {
                // If no existing part, create a new one
                // TODO (justinfagnani): test perf impact of always creating two parts
                // instead of sharing parts between nodes
                // https://github.com/lit/lit/issues/1266
                itemParts.push((itemPart = new ChildPart(this._insert(createMarker()), this._insert(createMarker()), this, this.options)));
            }
            else {
                // Reuse an existing part
                itemPart = itemParts[partIndex];
            }
            itemPart._$setValue(item);
            partIndex++;
        }
        if (partIndex < itemParts.length) {
            // itemParts always have end nodes
            this._$clear(itemPart && wrap(itemPart._$endNode).nextSibling, partIndex);
            // Truncate the parts array so _value reflects the current state
            itemParts.length = partIndex;
        }
    }
    /**
     * Removes the nodes contained within this Part from the DOM.
     *
     * @param start Start node to clear from, for clearing a subset of the part's
     *     DOM (used when truncating iterables)
     * @param from  When `start` is specified, the index within the iterable from
     *     which ChildParts are being removed, used for disconnecting directives
     *     in those Parts.
     *
     * @internal
     */
    _$clear(start = wrap(this._$startNode).nextSibling, from) {
        this._$notifyConnectionChanged?.(false, true, from);
        while (start !== this._$endNode) {
            // The non-null assertion is safe because if _$startNode.nextSibling is
            // null, then _$endNode is also null, and we would not have entered this
            // loop.
            const n = wrap(start).nextSibling;
            wrap(start).remove();
            start = n;
        }
    }
    /**
     * Implementation of RootPart's `isConnected`. Note that this method
     * should only be called on `RootPart`s (the `ChildPart` returned from a
     * top-level `render()` call). It has no effect on non-root ChildParts.
     * @param isConnected Whether to set
     * @internal
     */
    setConnected(isConnected) {
        if (this._$parent === undefined) {
            this.__isConnected = isConnected;
            this._$notifyConnectionChanged?.(isConnected);
        }
        else if (DEV_MODE) {
            throw new Error('part.setConnected() may only be called on a ' +
                'RootPart returned from render().');
        }
    }
}
class AttributePart {
    get tagName() {
        return this.element.tagName;
    }
    // See comment in Disconnectable interface for why this is a getter
    get _$isConnected() {
        return this._$parent._$isConnected;
    }
    constructor(element, name, strings, parent, options) {
        this.type = ATTRIBUTE_PART;
        /** @internal */
        this._$committedValue = nothing;
        /** @internal */
        this._$disconnectableChildren = undefined;
        this.element = element;
        this.name = name;
        this._$parent = parent;
        this.options = options;
        if (strings.length > 2 || strings[0] !== '' || strings[1] !== '') {
            this._$committedValue = new Array(strings.length - 1).fill(new String());
            this.strings = strings;
        }
        else {
            this._$committedValue = nothing;
        }
        if (ENABLE_EXTRA_SECURITY_HOOKS) {
            this._sanitizer = undefined;
        }
    }
    /**
     * Sets the value of this part by resolving the value from possibly multiple
     * values and static strings and committing it to the DOM.
     * If this part is single-valued, `this._strings` will be undefined, and the
     * method will be called with a single value argument. If this part is
     * multi-value, `this._strings` will be defined, and the method is called
     * with the value array of the part's owning TemplateInstance, and an offset
     * into the value array from which the values should be read.
     * This method is overloaded this way to eliminate short-lived array slices
     * of the template instance values, and allow a fast-path for single-valued
     * parts.
     *
     * @param value The part value, or an array of values for multi-valued parts
     * @param valueIndex the index to start reading values from. `undefined` for
     *   single-valued parts
     * @param noCommit causes the part to not commit its value to the DOM. Used
     *   in hydration to prime attribute parts with their first-rendered value,
     *   but not set the attribute, and in SSR to no-op the DOM operation and
     *   capture the value for serialization.
     *
     * @internal
     */
    _$setValue(value, directiveParent = this, valueIndex, noCommit) {
        const strings = this.strings;
        // Whether any of the values has changed, for dirty-checking
        let change = false;
        if (strings === undefined) {
            // Single-value binding case
            value = resolveDirective(this, value, directiveParent, 0);
            change =
                !isPrimitive(value) ||
                    (value !== this._$committedValue && value !== noChange);
            if (change) {
                this._$committedValue = value;
            }
        }
        else {
            // Interpolation case
            const values = value;
            value = strings[0];
            let i, v;
            for (i = 0; i < strings.length - 1; i++) {
                v = resolveDirective(this, values[valueIndex + i], directiveParent, i);
                if (v === noChange) {
                    // If the user-provided value is `noChange`, use the previous value
                    v = this._$committedValue[i];
                }
                change ||=
                    !isPrimitive(v) || v !== this._$committedValue[i];
                if (v === nothing) {
                    value = nothing;
                }
                else if (value !== nothing) {
                    value += (v ?? '') + strings[i + 1];
                }
                // We always record each value, even if one is `nothing`, for future
                // change detection.
                this._$committedValue[i] = v;
            }
        }
        if (change && !noCommit) {
            this._commitValue(value);
        }
    }
    /** @internal */
    _commitValue(value) {
        if (value === nothing) {
            wrap(this.element).removeAttribute(this.name);
        }
        else {
            if (ENABLE_EXTRA_SECURITY_HOOKS) {
                if (this._sanitizer === undefined) {
                    this._sanitizer = sanitizerFactoryInternal(this.element, this.name, 'attribute');
                }
                value = this._sanitizer(value ?? '');
            }
            debugLogEvent &&
                debugLogEvent({
                    kind: 'commit attribute',
                    element: this.element,
                    name: this.name,
                    value,
                    options: this.options,
                });
            wrap(this.element).setAttribute(this.name, (value ?? ''));
        }
    }
}
class PropertyPart extends AttributePart {
    constructor() {
        super(...arguments);
        this.type = PROPERTY_PART;
    }
    /** @internal */
    _commitValue(value) {
        if (ENABLE_EXTRA_SECURITY_HOOKS) {
            if (this._sanitizer === undefined) {
                this._sanitizer = sanitizerFactoryInternal(this.element, this.name, 'property');
            }
            value = this._sanitizer(value);
        }
        debugLogEvent &&
            debugLogEvent({
                kind: 'commit property',
                element: this.element,
                name: this.name,
                value,
                options: this.options,
            });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.element[this.name] = value === nothing ? undefined : value;
    }
}
class BooleanAttributePart extends AttributePart {
    constructor() {
        super(...arguments);
        this.type = BOOLEAN_ATTRIBUTE_PART;
    }
    /** @internal */
    _commitValue(value) {
        debugLogEvent &&
            debugLogEvent({
                kind: 'commit boolean attribute',
                element: this.element,
                name: this.name,
                value: !!(value && value !== nothing),
                options: this.options,
            });
        wrap(this.element).toggleAttribute(this.name, !!value && value !== nothing);
    }
}
class EventPart extends AttributePart {
    constructor(element, name, strings, parent, options) {
        super(element, name, strings, parent, options);
        this.type = EVENT_PART;
        if (DEV_MODE && this.strings !== undefined) {
            throw new Error(`A \`<${element.localName}>\` has a \`@${name}=...\` listener with ` +
                'invalid content. Event listeners in templates must have exactly ' +
                'one expression and no surrounding text.');
        }
    }
    // EventPart does not use the base _$setValue/_resolveValue implementation
    // since the dirty checking is more complex
    /** @internal */
    _$setValue(newListener, directiveParent = this) {
        newListener =
            resolveDirective(this, newListener, directiveParent, 0) ?? nothing;
        if (newListener === noChange) {
            return;
        }
        const oldListener = this._$committedValue;
        // If the new value is nothing or any options change we have to remove the
        // part as a listener.
        const shouldRemoveListener = (newListener === nothing && oldListener !== nothing) ||
            newListener.capture !==
                oldListener.capture ||
            newListener.once !==
                oldListener.once ||
            newListener.passive !==
                oldListener.passive;
        // If the new value is not nothing and we removed the listener, we have
        // to add the part as a listener.
        const shouldAddListener = newListener !== nothing &&
            (oldListener === nothing || shouldRemoveListener);
        debugLogEvent &&
            debugLogEvent({
                kind: 'commit event listener',
                element: this.element,
                name: this.name,
                value: newListener,
                options: this.options,
                removeListener: shouldRemoveListener,
                addListener: shouldAddListener,
                oldListener,
            });
        if (shouldRemoveListener) {
            this.element.removeEventListener(this.name, this, oldListener);
        }
        if (shouldAddListener) {
            this.element.addEventListener(this.name, this, newListener);
        }
        this._$committedValue = newListener;
    }
    handleEvent(event) {
        if (typeof this._$committedValue === 'function') {
            this._$committedValue.call(this.options?.host ?? this.element, event);
        }
        else {
            this._$committedValue.handleEvent(event);
        }
    }
}
class ElementPart {
    constructor(element, parent, options) {
        this.element = element;
        this.type = ELEMENT_PART;
        /** @internal */
        this._$disconnectableChildren = undefined;
        this._$parent = parent;
        this.options = options;
    }
    // See comment in Disconnectable interface for why this is a getter
    get _$isConnected() {
        return this._$parent._$isConnected;
    }
    _$setValue(value) {
        debugLogEvent &&
            debugLogEvent({
                kind: 'commit to element binding',
                element: this.element,
                value,
                options: this.options,
            });
        resolveDirective(this, value);
    }
}
/**
 * END USERS SHOULD NOT RELY ON THIS OBJECT.
 *
 * Private exports for use by other Lit packages, not intended for use by
 * external users.
 *
 * We currently do not make a mangled rollup build of the lit-ssr code. In order
 * to keep a number of (otherwise private) top-level exports mangled in the
 * client side code, we export a _$LH object containing those members (or
 * helper methods for accessing private fields of those members), and then
 * re-export them for use in lit-ssr. This keeps lit-ssr agnostic to whether the
 * client-side code is being used in `dev` mode or `prod` mode.
 *
 * This has a unique name, to disambiguate it from private exports in
 * lit-element, which re-exports all of lit-html.
 *
 * @private
 */
const _$LH = {
    // Used in lit-ssr
    _boundAttributeSuffix: boundAttributeSuffix,
    _marker: marker,
    _markerMatch: markerMatch,
    _HTML_RESULT: HTML_RESULT,
    _getTemplateHtml: getTemplateHtml,
    // Used in tests and private-ssr-support
    _TemplateInstance: TemplateInstance,
    _isIterable: isIterable,
    _resolveDirective: resolveDirective,
    _ChildPart: ChildPart,
    _AttributePart: AttributePart,
    _BooleanAttributePart: BooleanAttributePart,
    _EventPart: EventPart,
    _PropertyPart: PropertyPart,
    _ElementPart: ElementPart,
};
// Apply polyfills if available
const polyfillSupport = DEV_MODE
    ? global.litHtmlPolyfillSupportDevMode
    : global.litHtmlPolyfillSupport;
polyfillSupport?.(Template, ChildPart);
// IMPORTANT: do not change the property name or the assignment expression.
// This line will be used in regexes to search for lit-html usage.
(global.litHtmlVersions ??= []).push('3.3.2');
if (DEV_MODE && global.litHtmlVersions.length > 1) {
    queueMicrotask(() => {
        issueWarning('multiple-versions', `Multiple versions of Lit loaded. ` +
            `Loading multiple versions is not recommended.`);
    });
}
/**
 * Renders a value, usually a lit-html TemplateResult, to the container.
 *
 * This example renders the text "Hello, Zoe!" inside a paragraph tag, appending
 * it to the container `document.body`.
 *
 * ```js
 * import {html, render} from 'lit';
 *
 * const name = "Zoe";
 * render(html`<p>Hello, ${name}!</p>`, document.body);
 * ```
 *
 * @param value Any [renderable
 *   value](https://lit.dev/docs/templates/expressions/#child-expressions),
 *   typically a {@linkcode TemplateResult} created by evaluating a template tag
 *   like {@linkcode html} or {@linkcode svg}.
 * @param container A DOM container to render to. The first render will append
 *   the rendered value to the container, and subsequent renders will
 *   efficiently update the rendered value if the same result type was
 *   previously rendered there.
 * @param options See {@linkcode RenderOptions} for options documentation.
 * @see
 * {@link https://lit.dev/docs/libraries/standalone-templates/#rendering-lit-html-templates| Rendering Lit HTML Templates}
 */
const render = (value, container, options) => {
    if (DEV_MODE && container == null) {
        // Give a clearer error message than
        //     Uncaught TypeError: Cannot read properties of null (reading
        //     '_$litPart$')
        // which reads like an internal Lit error.
        throw new TypeError(`The container to render into may not be ${container}`);
    }
    const renderId = DEV_MODE ? debugLogRenderId++ : 0;
    const partOwnerNode = options?.renderBefore ?? container;
    // This property needs to remain unminified.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let part = partOwnerNode['_$litPart$'];
    debugLogEvent &&
        debugLogEvent({
            kind: 'begin render',
            id: renderId,
            value,
            container,
            options,
            part,
        });
    if (part === undefined) {
        const endNode = options?.renderBefore ?? null;
        // This property needs to remain unminified.
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        partOwnerNode['_$litPart$'] = part = new ChildPart(container.insertBefore(createMarker(), endNode), endNode, undefined, options ?? {});
    }
    part._$setValue(value);
    debugLogEvent &&
        debugLogEvent({
            kind: 'end render',
            id: renderId,
            value,
            container,
            options,
            part,
        });
    return part;
};
if (ENABLE_EXTRA_SECURITY_HOOKS) {
    render.setSanitizer = setSanitizer;
    render.createSanitizer = createSanitizer;
    if (DEV_MODE) {
        render._testOnlyClearSanitizerFactoryDoNotCallOrElse =
            _testOnlyClearSanitizerFactoryDoNotCallOrElse;
    }
}
//# sourceMappingURL=lit-html.js.map

/***/ },

/***/ "./node_modules/lit/decorators.js"
/*!****************************************!*\
  !*** ./node_modules/lit/decorators.js ***!
  \****************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   customElement: () => (/* reexport safe */ _lit_reactive_element_decorators_custom_element_js__WEBPACK_IMPORTED_MODULE_0__.customElement),
/* harmony export */   eventOptions: () => (/* reexport safe */ _lit_reactive_element_decorators_event_options_js__WEBPACK_IMPORTED_MODULE_3__.eventOptions),
/* harmony export */   property: () => (/* reexport safe */ _lit_reactive_element_decorators_property_js__WEBPACK_IMPORTED_MODULE_1__.property),
/* harmony export */   query: () => (/* reexport safe */ _lit_reactive_element_decorators_query_js__WEBPACK_IMPORTED_MODULE_4__.query),
/* harmony export */   queryAll: () => (/* reexport safe */ _lit_reactive_element_decorators_query_all_js__WEBPACK_IMPORTED_MODULE_5__.queryAll),
/* harmony export */   queryAssignedElements: () => (/* reexport safe */ _lit_reactive_element_decorators_query_assigned_elements_js__WEBPACK_IMPORTED_MODULE_7__.queryAssignedElements),
/* harmony export */   queryAssignedNodes: () => (/* reexport safe */ _lit_reactive_element_decorators_query_assigned_nodes_js__WEBPACK_IMPORTED_MODULE_8__.queryAssignedNodes),
/* harmony export */   queryAsync: () => (/* reexport safe */ _lit_reactive_element_decorators_query_async_js__WEBPACK_IMPORTED_MODULE_6__.queryAsync),
/* harmony export */   standardProperty: () => (/* reexport safe */ _lit_reactive_element_decorators_property_js__WEBPACK_IMPORTED_MODULE_1__.standardProperty),
/* harmony export */   state: () => (/* reexport safe */ _lit_reactive_element_decorators_state_js__WEBPACK_IMPORTED_MODULE_2__.state)
/* harmony export */ });
/* harmony import */ var _lit_reactive_element_decorators_custom_element_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @lit/reactive-element/decorators/custom-element.js */ "./node_modules/@lit/reactive-element/development/decorators/custom-element.js");
/* harmony import */ var _lit_reactive_element_decorators_property_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @lit/reactive-element/decorators/property.js */ "./node_modules/@lit/reactive-element/development/decorators/property.js");
/* harmony import */ var _lit_reactive_element_decorators_state_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @lit/reactive-element/decorators/state.js */ "./node_modules/@lit/reactive-element/development/decorators/state.js");
/* harmony import */ var _lit_reactive_element_decorators_event_options_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @lit/reactive-element/decorators/event-options.js */ "./node_modules/@lit/reactive-element/development/decorators/event-options.js");
/* harmony import */ var _lit_reactive_element_decorators_query_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @lit/reactive-element/decorators/query.js */ "./node_modules/@lit/reactive-element/development/decorators/query.js");
/* harmony import */ var _lit_reactive_element_decorators_query_all_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @lit/reactive-element/decorators/query-all.js */ "./node_modules/@lit/reactive-element/development/decorators/query-all.js");
/* harmony import */ var _lit_reactive_element_decorators_query_async_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @lit/reactive-element/decorators/query-async.js */ "./node_modules/@lit/reactive-element/development/decorators/query-async.js");
/* harmony import */ var _lit_reactive_element_decorators_query_assigned_elements_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @lit/reactive-element/decorators/query-assigned-elements.js */ "./node_modules/@lit/reactive-element/development/decorators/query-assigned-elements.js");
/* harmony import */ var _lit_reactive_element_decorators_query_assigned_nodes_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @lit/reactive-element/decorators/query-assigned-nodes.js */ "./node_modules/@lit/reactive-element/development/decorators/query-assigned-nodes.js");

//# sourceMappingURL=decorators.js.map


/***/ },

/***/ "./node_modules/lit/directives/ref.js"
/*!********************************************!*\
  !*** ./node_modules/lit/directives/ref.js ***!
  \********************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createRef: () => (/* reexport safe */ lit_html_directives_ref_js__WEBPACK_IMPORTED_MODULE_0__.createRef),
/* harmony export */   ref: () => (/* reexport safe */ lit_html_directives_ref_js__WEBPACK_IMPORTED_MODULE_0__.ref)
/* harmony export */ });
/* harmony import */ var lit_html_directives_ref_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lit-html/directives/ref.js */ "./node_modules/lit-html/development/directives/ref.js");

//# sourceMappingURL=ref.js.map


/***/ },

/***/ "./node_modules/lit/index.js"
/*!***********************************!*\
  !*** ./node_modules/lit/index.js ***!
  \***********************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CSSResult: () => (/* reexport safe */ lit_element_lit_element_js__WEBPACK_IMPORTED_MODULE_2__.CSSResult),
/* harmony export */   LitElement: () => (/* reexport safe */ lit_element_lit_element_js__WEBPACK_IMPORTED_MODULE_2__.LitElement),
/* harmony export */   ReactiveElement: () => (/* reexport safe */ lit_element_lit_element_js__WEBPACK_IMPORTED_MODULE_2__.ReactiveElement),
/* harmony export */   _$LE: () => (/* reexport safe */ lit_element_lit_element_js__WEBPACK_IMPORTED_MODULE_2__._$LE),
/* harmony export */   _$LH: () => (/* reexport safe */ lit_element_lit_element_js__WEBPACK_IMPORTED_MODULE_2__._$LH),
/* harmony export */   adoptStyles: () => (/* reexport safe */ lit_element_lit_element_js__WEBPACK_IMPORTED_MODULE_2__.adoptStyles),
/* harmony export */   css: () => (/* reexport safe */ lit_element_lit_element_js__WEBPACK_IMPORTED_MODULE_2__.css),
/* harmony export */   defaultConverter: () => (/* reexport safe */ lit_element_lit_element_js__WEBPACK_IMPORTED_MODULE_2__.defaultConverter),
/* harmony export */   getCompatibleStyle: () => (/* reexport safe */ lit_element_lit_element_js__WEBPACK_IMPORTED_MODULE_2__.getCompatibleStyle),
/* harmony export */   html: () => (/* reexport safe */ lit_element_lit_element_js__WEBPACK_IMPORTED_MODULE_2__.html),
/* harmony export */   isServer: () => (/* reexport safe */ lit_html_is_server_js__WEBPACK_IMPORTED_MODULE_3__.isServer),
/* harmony export */   mathml: () => (/* reexport safe */ lit_element_lit_element_js__WEBPACK_IMPORTED_MODULE_2__.mathml),
/* harmony export */   noChange: () => (/* reexport safe */ lit_element_lit_element_js__WEBPACK_IMPORTED_MODULE_2__.noChange),
/* harmony export */   notEqual: () => (/* reexport safe */ lit_element_lit_element_js__WEBPACK_IMPORTED_MODULE_2__.notEqual),
/* harmony export */   nothing: () => (/* reexport safe */ lit_element_lit_element_js__WEBPACK_IMPORTED_MODULE_2__.nothing),
/* harmony export */   render: () => (/* reexport safe */ lit_element_lit_element_js__WEBPACK_IMPORTED_MODULE_2__.render),
/* harmony export */   supportsAdoptingStyleSheets: () => (/* reexport safe */ lit_element_lit_element_js__WEBPACK_IMPORTED_MODULE_2__.supportsAdoptingStyleSheets),
/* harmony export */   svg: () => (/* reexport safe */ lit_element_lit_element_js__WEBPACK_IMPORTED_MODULE_2__.svg),
/* harmony export */   unsafeCSS: () => (/* reexport safe */ lit_element_lit_element_js__WEBPACK_IMPORTED_MODULE_2__.unsafeCSS)
/* harmony export */ });
/* harmony import */ var _lit_reactive_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @lit/reactive-element */ "./node_modules/@lit/reactive-element/development/reactive-element.js");
/* harmony import */ var lit_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lit-html */ "./node_modules/lit-html/development/lit-html.js");
/* harmony import */ var lit_element_lit_element_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lit-element/lit-element.js */ "./node_modules/lit-element/development/lit-element.js");
/* harmony import */ var lit_html_is_server_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lit-html/is-server.js */ "./node_modules/lit-html/development/is-server.js");

//# sourceMappingURL=index.js.map


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
/* harmony import */ var ziko_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ziko/dom */ "./node_modules/ziko/src/dom/index.js");
/* harmony import */ var giscus__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! giscus */ "./node_modules/giscus/dist/giscus.mjs");
// import Giscus from '@giscus/react'
// import { createRoot } from 'react-dom/client';

const {
  giscus_widget
} = ziko_dom__WEBPACK_IMPORTED_MODULE_0__.tags;


// console.log(111)

const giscus_roots = [...document.getElementsByClassName('wiscus-discussion')];
giscus_roots.forEach(root => {
  const config = JSON.parse(root.dataset.config ?? '{}');
  const G = giscus_widget(config);
  G.mount(root);
  // console.log(config);
  // const app_root = createRoot(root);
  // app_root.render(<Giscus {...config} loading="lazy"/>)
});
})();

/******/ })()
;
//# sourceMappingURL=view.js.map