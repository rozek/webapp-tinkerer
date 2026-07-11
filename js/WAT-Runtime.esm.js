/*******************************************************************************
*                                                                              *
*                        WebApp Tinkerer (WAT) Runtime                         *
*                                                                              *
*******************************************************************************/
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
const WAT_Version = '0.1';
import { ObjectMergedWith as Object_assign, 
//  throwError,
quoted, escaped, ValuesAreEqual as _ValuesAreEqual, ValuesDiffer as _ValuesDiffer, ValueIsBoolean, ValueIsNumber, ValueIsFiniteNumber, ValueIsNumberInRange, ValueIsInteger, ValueIsIntegerInRange, ValueIsOrdinal, ValueIsCardinal, ValueIsString, ValueIsStringMatching, ValueIsText, ValueIsTextline, ValueIsObject, ValueIsPlainObject, ValueIsList, ValueIsListSatisfying, ValueIsFunction, ValueIsOneOf, ValueIsColor, ValueIsEMailAddress, ValueIsURL, ValidatorForClassifier, acceptNil, rejectNil, allowBoolean, expectBoolean, expectNumber, allowFiniteNumber, allowInteger, expectInteger, allowIntegerInRange, allowOrdinal, expectCardinal, expectString, allowText, expectText, allowTextline, expectTextline, expectPlainObject, allowList, expectList, allowListSatisfying, expectListSatisfying, allowFunction, expectFunction, allowOneOf, expectOneOf, allowColor, allowURL, expectURL, HexColor, } from 'javascript-interface-library';
import * as JIL from 'javascript-interface-library';
function ValuesAreEqual(a, b, Mode) {
    try {
        return _ValuesAreEqual(a, b, Mode);
    }
    catch (Signal) {
        console.error('ValuesAreEqual failed comparing', a, 'with', b, 'reason:', Signal);
    }
    ;
    return false;
}
function ValuesDiffer(a, b, Mode) {
    try {
        return _ValuesDiffer(a, b, Mode);
    }
    catch (Signal) {
        console.error('ValuesDiffer failed comparing', a, 'with', b, 'reason:', Signal);
    }
    ;
    return true;
}
import { render, html, Component, createRef, useRef, useEffect, useCallback } from 'htm/preact';
/**** most built-in behaviors are now thin wrappers around JCL components ****/
// n.b.: JCL and WAT must share the same preact instance (which they do, as
// both resolve "preact", "preact/hooks" etc. through the import map of the
// hosting page)
// @ts-ignore TS2307 allow importing from "javascript-code-library"
import { ui as JCL_ui, ValueIsIdentifier, allowIdentifier, allowedIdentifier, expectIdentifier, expectedIdentifier, ValueIsPhoneNumber, // implements the former WAT stub
ValueIsDimension, allowDimension, allowedDimension, expectDimension, expectedDimension, ValueIsPosition, allowPosition, allowedPosition, expectPosition, expectedPosition, ValueIsSize, allowSize, allowedSize, expectSize, expectedSize, ValueIsGeometry, allowGeometry, allowedGeometry, expectGeometry, expectedGeometry, ValueIsTextFormat, ValueIsHTMLFormat, ValueIsMarkdownFormat, ValueIsImageFormat, JCL_supportedTextFormats, JCL_supportedHTMLFormats, JCL_supportedMarkdownFormats, JCL_supportedImageFormats, } from 'javascript-code-library';
const JCL_native = JCL_ui.native;
const JCL_legacy = JCL_ui.legacy;
/**** validators adopted from JCL remain part of WAT's public API ****/
// n.b.: JCL's ValueIsPosition/Size/Geometry use "ValueIsPlainObject" where
// WAT formerly used "ValueIsObject" - i.e., class instances which happen to
// carry x/y/Width/Height are no longer accepted (plain objects and proxies
// over plain objects still are)
export { ValueIsIdentifier, allowIdentifier, allowedIdentifier, expectIdentifier, expectedIdentifier, ValueIsPhoneNumber, ValueIsDimension, allowDimension, allowedDimension, expectDimension, expectedDimension, ValueIsPosition, allowPosition, allowedPosition, expectPosition, expectedPosition, ValueIsSize, allowSize, allowedSize, expectSize, expectedSize, ValueIsGeometry, allowGeometry, allowedGeometry, expectGeometry, expectedGeometry, ValueIsTextFormat, ValueIsHTMLFormat, ValueIsMarkdownFormat, ValueIsImageFormat, };
/**** supported MIME format lists (now shared with JCL) ****/
export const WAT_supportedTextFormats = JCL_supportedTextFormats;
export const WAT_supportedHTMLFormats = JCL_supportedHTMLFormats;
export const WAT_supportedMarkdownFormats = JCL_supportedMarkdownFormats;
export const WAT_supportedImageFormats = JCL_supportedImageFormats;
import hyperactiv from 'hyperactiv';
const { observe, computed, dispose } = hyperactiv;
import { customAlphabet } from 'nanoid';
// @ts-ignore TS2307 typescript has problems importing "nanoid-dictionary"
import { nolookalikesSafe } from 'nanoid-dictionary';
import Conversion from 'svelte-coordinate-conversion';
const { fromLocalTo, fromViewportTo, fromDocumentTo } = Conversion;
export { fromLocalTo, fromViewportTo, fromDocumentTo };
/**** generic constructor for asynchronous functions ****/
export const AsyncFunction = (async () => { }).constructor;
/**** provide "toReversed" polyfill ****/
// @ts-ignore TS2550 allow polyfilling
if (!Array.prototype.toReversed) {
    // @ts-ignore TS2550 allow polyfilling
    Array.prototype.toReversed = function () {
        return Array.from(this).reverse();
    };
}
/**** WAT Visual Categories ****/
const WAT_Categories = ['applet', 'page', 'widget'];
export const WAT_horizontalAnchorses = ['left-width', 'left-right', 'width-right'];
export const WAT_verticalAnchorses = ['top-height', 'top-bottom', 'height-bottom'];
export const WAT_Orientations = ['any', 'portrait', 'landscape'];
/**** configuration-related types ****/
export const WAT_Overflows = ['visible', 'hidden', 'scroll', 'auto'];
export const WAT_FontWeights = [
    'thin', 'extra-light', 'light', 'normal', 'medium', 'semi-bold',
    'bold', 'extra-bold', 'heavy'
];
export const WAT_FontWeightValues = {
    'thin': 100, 'extra-light': 200, 'light': 300, 'normal': 400, 'medium': 500,
    'semi-bold': 600, 'bold': 700, 'extra-bold': 800, 'heavy': 900
};
export const WAT_FontStyles = ['normal', 'italic'];
export const WAT_TextDecorationLines = ['none', 'underline', 'overline', 'line-through'];
export const WAT_TextDecorationStyles = ['solid', 'double', 'dotted', 'dashed', 'wavy'];
export const WAT_TextAlignments = ['left', 'center', 'right', 'justify'];
export const WAT_BackgroundModes = ['normal', 'contain', 'cover', 'fill', 'tile'];
export const WAT_BorderStyles = [
    'none', 'hidden', 'dotted', 'dashed', 'solid', 'double', 'groove', 'ridge',
    'inset', 'outset'
];
export const WAT_Cursors = [
    'auto', 'none', 'default', 'alias', 'all-scroll', 'cell', 'context-menu',
    'col-resize', 'copy', 'crosshair', 'e-resize', 'ew-resize', 'grab', 'grabbing',
    'help', 'move', 'n-resize', 'ne-resize', 'nesw-resize', 'ns-resize', 'nw-resize',
    'nwse-resize', 'no-drop', 'not-allowed', 'pointer', 'progress', 'row-resize',
    's-resize', 'se-resize', 'sw-resize', 'text', 'vertical-text', 'w-resize', 'wait',
    'zoom-in', 'zoom-out'
];
/**** Error Report ****/
export const WAT_ErrorTypes = [
    'missing Behaviour',
    'Behaviour Compilation Failure', 'Behaviour Execution Failure',
    'Script Compilation Failure', 'Script Execution Failure',
    '"Value" Setting Failure', 'Rendering Failure',
    'Callback Failure', 'Reactivity Failure',
];
/**** throwError - simplifies construction of named errors ****/
export function throwError(Message) {
    let Match = /^([$a-zA-Z][$a-zA-Z0-9]*):\s*(\S.+)\s*$/.exec(Message);
    if (Match == null) {
        throw new Error(Message);
    }
    else {
        let namedError = new Error(Match[2]);
        namedError.name = Match[1];
        throw namedError;
    }
}
/**** throwReadOnlyError ****/
// @ts-ignore TS2534 why is TS complaining here?
export function throwReadOnlyError(Name) {
    throwError('ReadOnlyProperty: property ' + quoted(Name) + ' must not be set');
}
//------------------------------------------------------------------------------
//--                 Classification and Validation Functions                  --
//------------------------------------------------------------------------------
/**** allowValue ****/
export function allowValue(Description, Value, Validator) {
    if (Value == null) {
        return undefined;
    }
    else {
        return expectValue(Description, Value, Validator);
    }
}
/**** expectValue ****/
export function expectValue(Description, Value, Validator) {
    if (Value == null) {
        throwError(`MissingArgument: no ${Description} given`);
    }
    if ((Validator == null) || (Validator(Value) === true)) {
        return Value;
    }
    else {
        throwError(`InvalidArgument: the given ${Description} is invalid`);
    }
}
/**** ValueIsName ****/
const WAT_NamePattern = /^[^\x00-\x1F\x7F /#][^\x00-\x1F\x7F/]*$/;
// no ctrl.char.s, no "/", no leading " " or "#"
export function ValueIsName(Value) {
    return (ValueIsStringMatching(Value, WAT_NamePattern) &&
        (Value.trim() === Value) &&
        (Value.trim() !== '.') && (Value.trim() !== '..'));
}
/**** allow/expect[ed]Name ****/
export const allowName = ValidatorForClassifier(ValueIsName, acceptNil, 'WAT name'), allowedName = allowName;
export const expectName = ValidatorForClassifier(ValueIsName, rejectNil, 'WAT name'), expectedName = expectName;
/**** ValueIsPath ****/
export function ValueIsPath(Value) {
    return (ValueIsString(Value) &&
        Value.trim().split('/').every(StringIsPathItem));
}
export function StringIsPathItem(Value) {
    return ((Value.trim() === Value) && ((Value === '') || (Value === '.') || (Value === '..') ||
        /^#\d+$/.test(Value) || ValueIsName(Value)));
}
/**** allow/expect[ed]Path ****/
export const allowPath = ValidatorForClassifier(ValueIsPath, acceptNil, 'WAT path'), allowedPath = allowPath;
export const expectPath = ValidatorForClassifier(ValueIsPath, rejectNil, 'WAT path'), expectedPath = expectPath;
/**** ValueIsCategory ****/
export function ValueIsCategory(Value) {
    return ValueIsOneOf(Value, WAT_Categories);
}
/**** allow/expect[ed]Category ****/
export const allowCategory = ValidatorForClassifier(ValueIsCategory, acceptNil, 'WAT behavior category'), allowedCategory = allowCategory;
export const expectCategory = ValidatorForClassifier(ValueIsCategory, rejectNil, 'WAT behavior category'), expectedCategory = expectCategory;
/**** ValueIsBehavior ****/
const WAT_BehaviorPattern = /^[a-z][a-z0-9_]*(\.[a-z0-9_]+)+$/i;
export function ValueIsBehavior(Value) {
    return (ValueIsStringMatching(Value, WAT_BehaviorPattern) &&
        (Value.trim() === Value));
}
/**** allow/expect[ed]Behavior ****/
export const allowBehavior = ValidatorForClassifier(ValueIsBehavior, acceptNil, 'WAT behavior name'), allowedBehavior = allowBehavior;
export const expectBehavior = ValidatorForClassifier(ValueIsBehavior, rejectNil, 'WAT behavior name'), expectedBehavior = expectBehavior;
/**** ValueIsVisual ****/
export function ValueIsVisual(Value) {
    return (Value instanceof WAT_Visual);
}
/**** allow/expect[ed]Visual ****/
export const allowVisual = ValidatorForClassifier(ValueIsVisual, acceptNil, 'WAT visual'), allowedVisual = allowVisual;
export const expectVisual = ValidatorForClassifier(ValueIsVisual, rejectNil, 'WAT visual'), expectedVisual = expectVisual;
/**** ValueIsApplet ****/
export function ValueIsApplet(Value) {
    return (Value instanceof WAT_Applet);
}
/**** allow/expect[ed]Applet ****/
export const allowApplet = ValidatorForClassifier(ValueIsApplet, acceptNil, 'WAT applet'), allowedApplet = allowApplet;
export const expectApplet = ValidatorForClassifier(ValueIsApplet, rejectNil, 'WAT applet'), expectedApplet = expectApplet;
/**** ValueIsPage ****/
export function ValueIsPage(Value) {
    return (Value instanceof WAT_Page);
}
/**** allow/expect[ed]Page ****/
export const allowPage = ValidatorForClassifier(ValueIsPage, acceptNil, 'WAT page'), allowedPage = allowPage;
export const expectPage = ValidatorForClassifier(ValueIsPage, rejectNil, 'WAT page'), expectedPage = expectPage;
/**** ValueIsWidget ****/
export function ValueIsWidget(Value) {
    return (Value instanceof WAT_Widget);
}
/**** allow/expect[ed]Widget ****/
export const allowWidget = ValidatorForClassifier(ValueIsWidget, acceptNil, 'WAT widget'), allowedWidget = allowWidget;
export const expectWidget = ValidatorForClassifier(ValueIsWidget, rejectNil, 'WAT widget'), expectedWidget = expectWidget;
/**** ValueIsLocation ****/
export function ValueIsLocation(Value) {
    return ValueIsFiniteNumber(Value);
}
/**** allow/expect[ed]Location ****/
export const allowLocation = ValidatorForClassifier(ValueIsLocation, acceptNil, 'WAT coordinate'), allowedLocation = allowLocation;
export const expectLocation = ValidatorForClassifier(ValueIsLocation, rejectNil, 'WAT coordinate'), expectedLocation = expectLocation;
/**** ValueIsIncompleteGeometry ****/
function ValueIsIncompleteGeometry(Value) {
    if (!ValueIsPlainObject(Value)) {
        return false;
    }
    for (let Key in Value) {
        if (Value.hasOwnProperty(Key)) {
            switch (Key) {
                case 'x':
                case 'y':
                    if ((Value[Key] != null) && !ValueIsLocation(Value[Key])) {
                        return false;
                    }
                    break;
                case 'Width':
                case 'Height':
                    if ((Value[Key] != null) && !ValueIsDimension(Value[Key])) {
                        return false;
                    }
                    break;
                default:
                    return false;
            }
        }
    }
    return true;
}
/**** allow/expect[ed]IncompleteGeometry ****/
const allowIncompleteGeometry = ValidatorForClassifier(ValueIsIncompleteGeometry, acceptNil, 'WAT geometry'), allowedIncompleteGeometry = allowIncompleteGeometry;
const expectIncompleteGeometry = ValidatorForClassifier(ValueIsIncompleteGeometry, rejectNil, 'WAT geometry'), expectedIncompleteGeometry = expectIncompleteGeometry;
/**** ValueIsTextDecoration ****/
export function ValueIsTextDecoration(Value) {
    return (Value === 'none') || (ValueIsObject(Value) &&
        ValueIsBoolean(Value.isActive) &&
        ValueIsOneOf(Value.Line, WAT_TextDecorationLines) &&
        ((Value.Color == null) || ValueIsColor(Value.Color)) &&
        ((Value.Style == null) || ValueIsOneOf(Value.Style, WAT_TextDecorationStyles)) &&
        ((Value.Thickness == null) || ValueIsDimension(Value.Thickness)));
}
/**** allow/expect[ed]TextDecoration ****/
export const allowTextDecoration = ValidatorForClassifier(ValueIsTextDecoration, acceptNil, 'a text decoration'), allowedTextDecoration = allowTextDecoration;
export const expectTextDecoration = ValidatorForClassifier(ValueIsTextDecoration, rejectNil, 'a text decoration'), expectedTextDecoration = expectTextDecoration;
/**** ValueIsTextShadow ****/
export function ValueIsTextShadow(Value) {
    return (Value === 'none') || (ValueIsObject(Value) &&
        ValueIsBoolean(Value.isActive) &&
        ValueIsLocation(Value.xOffset) && ValueIsLocation(Value.yOffset) &&
        ValueIsDimension(Value.BlurRadius) && ValueIsColor(Value.Color));
}
/**** allow/expect[ed]TextShadow ****/
export const allowTextShadow = ValidatorForClassifier(ValueIsTextShadow, acceptNil, 'widget text shadow specification'), allowedTextShadow = allowTextShadow;
export const expectTextShadow = ValidatorForClassifier(ValueIsTextShadow, rejectNil, 'a text shadow specification'), expectedTextShadow = expectTextShadow;
/**** ValueIsBackgroundTexture ****/
export function ValueIsBackgroundTexture(Value) {
    return (Value === 'none') || (ValueIsObject(Value) &&
        ValueIsBoolean(Value.isActive) &&
        ValueIsURL(Value.ImageURL) &&
        ValueIsOneOf(Value.Mode, WAT_BackgroundModes) &&
        ValueIsLocation(Value.xOffset) && ValueIsLocation(Value.yOffset));
}
/**** allow/expect[ed]BackgroundTexture ****/
export const allowBackgroundTexture = ValidatorForClassifier(ValueIsBackgroundTexture, acceptNil, 'widget background texture'), allowedBackgroundTexture = allowBackgroundTexture;
export const expectBackgroundTexture = ValidatorForClassifier(ValueIsBackgroundTexture, rejectNil, 'widget background texture'), expectedBackgroundTexture = expectBackgroundTexture;
/**** ValueIsBoxShadow ****/
export function ValueIsBoxShadow(Value) {
    return (Value === 'none') || (ValueIsObject(Value) &&
        ValueIsBoolean(Value.isActive) &&
        ValueIsLocation(Value.xOffset) && ValueIsLocation(Value.yOffset) &&
        ValueIsDimension(Value.BlurRadius) && ValueIsDimension(Value.SpreadRadius) &&
        ValueIsColor(Value.Color));
}
/**** allow/expect[ed]BoxShadow ****/
export const allowBoxShadow = ValidatorForClassifier(ValueIsBoxShadow, acceptNil, 'widget box shadow specification'), allowedBoxShadow = allowBoxShadow;
export const expectBoxShadow = ValidatorForClassifier(ValueIsBoxShadow, rejectNil, 'widget box shadow specification'), expectedBoxShadow = expectBoxShadow;
/**** ValueIsErrorReport ****/
export function ValueIsErrorReport(Value) {
    return (ValueIsPlainObject(Value) &&
        ValueIsOneOf(Value.Type, WAT_ErrorTypes) &&
        ValueIsText(Value.Message));
}
/**** allow/expect[ed]ErrorReport ****/
export const allowErrorReport = ValidatorForClassifier(ValueIsErrorReport, acceptNil, 'WAT error report'), allowedErrorReport = allowErrorReport;
export const expectErrorReport = ValidatorForClassifier(ValueIsErrorReport, rejectNil, 'WAT error report'), expectedErrorReport = expectErrorReport;
/**** ValueIsSerializableValue ****/
export function ValueIsSerializableValue(Value, visitedObjects = new WeakSet()) {
    switch (true) {
        case (Value == null): // deliberately also allows undefined
        case ValueIsBoolean(Value):
        case ValueIsFiniteNumber(Value): // NaN/Infinity are not serializable
        case ValueIsString(Value):
            return true;
        case ValueIsList(Value):
            if (visitedObjects.has(Value)) {
                return false;
            } // recursion detected
            visitedObjects.add(Value);
            try {
                return ValueIsListSatisfying(Value, (Item) => {
                    if (Item === undefined) {
                        return false;
                    } // JSON would make "null" of it
                    return ValueIsSerializableValue(Item, visitedObjects);
                });
            }
            finally {
                visitedObjects.delete(Value);
            }
        case ValueIsPlainObject(Value):
            if (visitedObjects.has(Value)) {
                return false;
            } // recursion detected
            visitedObjects.add(Value);
            try {
                for (let Property in Value) {
                    if (Value.hasOwnProperty(Property) &&
                        !ValueIsSerializableValue(Value[Property], visitedObjects)) {
                        return false;
                    }
                }
                return true;
            }
            finally {
                visitedObjects.delete(Value);
            }
    }
    return false;
}
/**** allow/expect[ed]SerializableValue ****/
export const allowSerializableValue = ValidatorForClassifier(ValueIsSerializableValue, acceptNil, 'serializable value'), allowedSerializableValue = allowSerializableValue;
export const expectSerializableValue = ValidatorForClassifier(ValueIsSerializableValue, rejectNil, 'serializable value'), expectedSerializableValue = expectSerializableValue;
/**** ValueIsSerializableObject ****/
export function ValueIsSerializableObject(Value) {
    if (ValueIsPlainObject(Value)) {
        for (let Property in Value) {
            if (Value.hasOwnProperty(Property) &&
                !ValueIsSerializableValue(Value[Property])) {
                return false;
            }
        }
        return true;
    }
    else {
        return false;
    }
}
/**** allow/expect[ed]SerializableObject ****/
export const allowSerializableObject = ValidatorForClassifier(ValueIsSerializableObject, acceptNil, 'serializable object'), allowedSerializableObject = allowSerializableObject;
export const expectSerializableObject = ValidatorForClassifier(ValueIsSerializableObject, rejectNil, 'serializable object'), expectedSerializableObject = expectSerializableObject;
/**** ValueIsListOf ****/
export function ValueIsListOf(Value, ValueList) {
    return ValueIsListSatisfying(Value, (Value) => ValueIsOneOf(Value, ValueList));
}
/**** allow/expect[ed]ListOf ****/
export function allowListOf(Description, Argument, ValueList) {
    return (Argument == null
        ? Argument
        : expectedListOf(Description, Argument, ValueList));
}
export const allowedListOf = allowListOf;
export function expectListOf(Description, Argument, ValueList) {
    if (Argument == null) {
        throwError(`MissingArgument: no ${escaped(Description)} given`);
    }
    else {
        if (ValueIsListSatisfying(Argument, (Value) => ValueIsOneOf(Value, ValueList))) {
            return Argument;
        }
        else {
            throwError(`InvalidArgument: the given value is no ${escaped(Description)}`);
        }
    }
}
export const expectedListOf = expectListOf;
/**** ValueIsJSON ****/
export function ValueIsJSON(Value) {
    try {
        return ValueIsText(Value) && (JSON.parse(Value) !== undefined); // tricky!
    }
    catch (Signal) {
        return false;
    }
}
/**** allow/expect[ed]JSON ****/
export const allowJSON = ValidatorForClassifier(ValueIsJSON, acceptNil, 'JSON string'), allowedJSON = allowJSON;
export const expectJSON = ValidatorForClassifier(ValueIsJSON, rejectNil, 'JSON string'), expectedJSON = expectJSON;
/**** ValueIsLineList ****/
export function ValueIsLineList(Value, Pattern) {
    const Validator = (Pattern == null
        ? ValueIsTextline
        : (Value) => ValueIsStringMatching(Value, Pattern));
    return ValueIsListSatisfying(Value, Validator);
}
/**** allow/expect[ed]LineList ****/
export function allowLineList(Description, Argument, Pattern) {
    return (Argument == null
        ? Argument
        : expectedLineList(Description, Argument, Pattern));
}
export const allowedLineList = allowLineList;
export function expectLineList(Description, Argument, Pattern) {
    if (Argument == null) {
        throwError(`MissingArgument: no ${escaped(Description)} given`);
    }
    else {
        const Validator = (Pattern == null
            ? ValueIsTextline
            : (Value) => ValueIsStringMatching(Value, Pattern));
        if (ValueIsListSatisfying(Argument, Validator)) {
            return Argument;
        }
        else {
            throwError(`InvalidArgument: the given value is no ${escaped(Description)}`);
        }
    }
}
export const expectedLineList = expectLineList;
/**** ValueIsNumberList ****/
export function ValueIsNumberList(Value, minValue, maxValue, withMin, withMax) {
    const Validator = ((minValue == null) && (maxValue == null)
        ? ValueIsNumber
        : (Value) => ValueIsNumberInRange(Value, minValue, maxValue, withMin, withMax));
    return ValueIsListSatisfying(Value, Validator);
}
/**** allow/expect[ed]NumberList ****/
export function allowNumberList(Description, Argument, minValue, maxValue, withMin, withMax) {
    return (Argument == null
        ? Argument
        : expectedNumberList(Description, Argument, minValue, maxValue, withMin, withMax));
}
export const allowedNumberList = allowNumberList;
export function expectNumberList(Description, Argument, minValue, maxValue, withMin, withMax) {
    if (Argument == null) {
        throwError(`MissingArgument: no ${escaped(Description)} given`);
    }
    else {
        const Validator = ((minValue == null) && (maxValue == null)
            ? ValueIsNumber
            : (Value) => ValueIsNumberInRange(Value, minValue, maxValue, withMin, withMax));
        if (ValueIsListSatisfying(Argument, Validator)) {
            return Argument;
        }
        else {
            throwError(`InvalidArgument: the given value is no ${escaped(Description)}`);
        }
    }
}
export const expectedNumberList = expectNumberList;
/**** ValueIsIntegerList ****/
export function ValueIsIntegerList(Value, minValue, maxValue) {
    const Validator = ((minValue == null) && (maxValue == null)
        ? ValueIsInteger
        : (Value) => ValueIsIntegerInRange(Value, minValue, maxValue));
    return ValueIsListSatisfying(Value, Validator);
}
/**** allow/expect[ed]IntegerList ****/
export function allowIntegerList(Description, Argument, minValue, maxValue) {
    return (Argument == null
        ? Argument
        : expectedIntegerList(Description, Argument, minValue, maxValue));
}
export const allowedIntegerList = allowIntegerList;
export function expectIntegerList(Description, Argument, minValue, maxValue) {
    if (Argument == null) {
        throwError(`MissingArgument: no ${escaped(Description)} given`);
    }
    else {
        const Validator = ((minValue == null) && (maxValue == null)
            ? ValueIsInteger
            : (Value) => ValueIsIntegerInRange(Value, minValue, maxValue));
        if (ValueIsListSatisfying(Argument, Validator)) {
            return Argument;
        }
        else {
            throwError(`InvalidArgument: the given value is no ${escaped(Description)}`);
        }
    }
}
export const expectedIntegerList = expectIntegerList;
/**** acceptableValue ****/
export function acceptableValue(Value, Validator, Default) {
    return (Validator(Value) === true ? Value : Default);
}
/**** ActivationStack ****/
export function ActivationStack() {
    const StackTrace = new Error().stack || '';
    const StackLines = StackTrace.split('\n');
    const OwnLineIndex = StackLines.findIndex((Line) => Line.includes('ActivationStack'));
    return (OwnLineIndex < 0
        ? StackTrace.replace(/^[^\n]+\n[^\n]+/, '')
        : StackLines.slice(OwnLineIndex + 1).join('\n'));
}
/**** DesignerAssetsBase ****/
let DesignerAssetsBase = 'https://rozek.github.io/webapp-tinkerer/';
/**** URLhasSchema ****/
export function URLhasSchema(Value) {
    return ValueIsURL(Value) && ValueIsStringMatching(Value, /^[a-z][a-z0-9+.-]*:\/\//i);
}
//------------------------------------------------------------------------------
//--                           Stylesheet Handling                            --
//------------------------------------------------------------------------------
let WATStyleElement = document.getElementById('WAT-Stylesheet');
if (WATStyleElement == null) {
    WATStyleElement = document.createElement('style');
    WATStyleElement.id = 'WAT-Stylesheet';
    WATStyleElement.textContent = `
/*******************************************************************************
*                                                                              *
*                        WebApp Tinkerer (WAT) Runtime                         *
*                                                                              *
*******************************************************************************/

  div[type="wat/applet"] { overflow:visible }       /* important for designer */

  div[type="wat/applet"] { box-sizing:border-box }

/**** all WAT elements are absolutely positioned ****/

  .WAT {
    box-sizing:border-box;
    display:block; position:absolute;
    margin:0px; padding:0px;
    background:none; border:none; border-radius:0px; outline:none;
  }

  .WAT * { box-sizing:border-box }

/**** elements of class "WAT Content" cover their whole container ****/

  .WAT.Content {
    display:block; position:absolute;
    left:0px; top:0px; width:100%; height:100%;
  }

/**** "Placeholders" are not yet ready for rendering ****/

  .WAT.Placeholder {
    background-image:repeating-linear-gradient(-45deg,
      rgba(222,222,222, 1) 0px, rgba(222,222,222, 1) 4px,
      rgba(0,0,0, 0) 4px, rgba(0,0,0, 0) 8px
    ); background-size:11.31px 11.31px;
  }

/**** WAT Applet ****/

  .WAT.Applet {
    color:black;
    font-family:'Source Sans Pro','Helvetica Neue',Helvetica,Arial,sans-serif;
    font-size:14px; font-weight:400; line-height:1.4; color:black;
    text-align:left; text-shadow:none;
  }

  .withMobileFrame {
    border:solid 5px black;
    border-radius:5px;
  }

  .WAT.Applet.fullscreen {
    display:block; position:absolute; margin:0px;
    left:0px; top:0px; right:0px; bottom:0px; width:auto; height:auto;
  }

/**** WAT MarkdownView Contents ****/

  .WAT.MarkdownView.Content h1 { font-size:22px; font-weight:bold; line-height:1.5; margin:0px }
  .WAT.MarkdownView.Content h2 { font-size:20px; font-weight:bold; line-height:1.5; margin:0px }
  .WAT.MarkdownView.Content h3 { font-size:18px; font-weight:bold; line-height:1.5; margin:0px }
  .WAT.MarkdownView.Content h4 { font-size:16px; font-weight:bold; line-height:1.5; margin:0px }
  .WAT.MarkdownView.Content h5 { font-size:15px; font-weight:bold; line-height:1.5; margin:0px }
  .WAT.MarkdownView.Content h6 { font-size:14px; font-weight:bold; line-height:1.5; margin:0px }

  .WAT.MarkdownView.Content h1:not(:first-child) { margin-top:11px }
  .WAT.MarkdownView.Content h2:not(:first-child) { margin-top:10px }
  .WAT.MarkdownView.Content h3:not(:first-child) { margin-top:9px }
  .WAT.MarkdownView.Content h4:not(:first-child) { margin-top:8px }
  .WAT.MarkdownView.Content h5:not(:first-child) { margin-top:8px }
  .WAT.MarkdownView.Content h6:not(:first-child) { margin-top:7px }

  .WAT.MarkdownView.Content p { font-size:14px; font-weight:normal; line-height:1.5; margin:0px }
  .WAT.MarkdownView.Content p:not(:first-child) { margin-top:7px }

  .WAT.MarkdownView.Content ul { font-size:14px; font-weight:normal; line-height:1.5; margin:0px }
  .WAT.MarkdownView.Content ul:not(:first-child) { margin-top:7px }

  .WAT.MarkdownView.Content ol { font-size:14px; font-weight:normal; line-height:1.5; margin:0px }
  .WAT.MarkdownView.Content ol:not(:first-child) { margin-top:7px }

  .WAT.MarkdownView.Content li { margin-left:20px }
  .WAT.MarkdownView.Content ul, .WAT.MarkdownView.Content ol { padding-left:0px }

  .WAT.MarkdownView.Content blockquote {
    margin:7px 0px 0px 10px;
    padding:0px 0px 0px 6px;
    border:none; border-left:solid 4px lightgray;
  }

  .WAT.MarkdownView.Content code {
    font-family:Menlo,Courier,monospace;
    font-size:13px; font-weight:normal; line-height:1.5; margin:0px;
    padding:2px; background-color:#EEEEEE;
  }

  .WAT.MarkdownView.Content pre { background-color:#EEEEEE; padding:2px 0px 2px 6px }
  .WAT.MarkdownView.Content pre:not(:first-child) { margin-top:7px }
  .WAT.MarkdownView.Content pre > code { padding:0px }

/**** Syntax Highlighing ****/

  .hljs {
    display:block;
    overflow-x:auto;
    padding:0.5em;
    background:#f0f0f0;
    color:#444444;
  }

  .hljs-comment, .hljs-quote                     { font-style:italic;  color:#999988 }
  .hljs-keyword, .hljs-selector-tag, .hljs-subst { font-weight:bold;   color:#333333 }
  .hljs-string,  .hljs-doctag                    { color:#dd1144 }
  .hljs-number                                   { color:#009999 }
  .hljs-title, .hljs-section, .hljs-selector-id  { font-weight:bold;   color:#990000 }
  .hljs-class .hljs-title, .hljs-type            { font-weight:bold;   color:#445588 }
  .hljs-variable, .hljs-template-variable        { color:#336699 }
  .hljs-attr                                     { color:#007700 }
  .hljs-tag, .hljs-name                          { font-weight:normal; color:#000080}
  .hljs-regexp                                   { color:#009926 }
  .hljs-symbol, .hljs-bullet, .hljs-link, .hljs-meta, .hljs-selector-pseudo { color:#990073 }
  .hljs-built_in, .hljs-builtin-name             { color:#0086b3 }
  .hljs-deletion                                 { background:#ffdddd }
  .hljs-addition                                 { background:#ddffdd }
  .hljs-emphasis                                 { font-style:italic }
  .hljs-strong                                   { font-weight:bold }
  .hljs.language-html, .hljs.language-xml        { color:#333333 }
  .hljs.language-css .hljs-selector-class,
  .hljs.language-css .hljs-selector-tag,
  .hljs.language-css .hljs-attribute             { color:#1e347b }
  .hljs.language-javascript .hljs-keyword        { color:#0000aa }
  .hljs.language-typescript .hljs-keyword        { color:#0000aa }
  .hljs.language-java .hljs-keyword              { color:#bb9966 }
  .hljs.language-json .hljs-attribute            { color:#0000aa }
/**** WAT ModalLayer ****/

  .WAT.ModalLayer {
    display:block; position:fixed;
    left:0px; top:0px; right:auto; bottom:auto; width:100%; height:100%;
    background:black; opacity:0.1;
    z-index:1000000;
    pointer-events:auto;
  }

/**** WAT Underlay ****/

  .WAT.WidgetUnderlay {
    display:block; position:fixed;
    left:0px; top:0px; right:auto; bottom:auto; width:100%; height:100%;
    pointer-events:auto;
  }
  .WAT.WidgetUnderlay.modal {
    background:rgba(0,0,0,0.1);
  }

/**** WAT AppletOverlayLayer ****/

  .WAT.AppletOverlayLayer {
    display:block; position:absolute; overflow:visible;
    left:0px; top:0px; right:0px; bottom:0px; width:auto; height:auto;
    pointer-events:none;

    color:black;
    font-family:'Source Sans Pro','Helvetica Neue',Helvetica,Arial,sans-serif;
    font-size:14px; font-weight:400; line-height:1.4; color:black;
    text-align:left; text-shadow:none;
  }

/**** AppletOverlay ****/

  .WAT.AppletOverlay {
    display:block; position:absolute;
    z-index:1000000;
    pointer-events:auto;
  }
  .WAT.AppletOverlay > .ContentPane {
    display:block; position:absolute; overflow:visible;
    left:0px; top:0px; right:0px; bottom:0px;
    border:none;
  }

/**** Dialog ****/

  .WAT.Dialog {
    display:block; position:fixed;
    border:solid 1px #000000; border-radius:4px;
    background:white; color:black;
    box-shadow:0px 0px 10px 0px rgba(0,0,0,0.5);
    z-index:1000000;
    pointer-events:auto;
  }

/**** Dialog Components ****/

  .WAT.Dialog.withTitlebar > .Titlebar {
    display:block; position:absolute; overflow:hidden;
    left:0px; top:0px; right:0px; height:30px;
    background:#EEEEEE; border:none; border-radius:3px 3px 0px 0px;
    user-select:none; pointer-events:auto;

    -webkit-touch-callout:none;
    -ms-touch-action:none; touch-action:none;
  }

  .WAT.Dialog.withTitlebar > .Titlebar > .Title {
    display:block; position:absolute;
    left:6px; top:3px; right:30px; height:24px;
    border:none;
    font-weight:bold; color:black; line-height:24px;
    user-select:none; pointer-events:none;
  }

  .WAT.Dialog.withTitlebar > .Titlebar > .CloseButton {
    display:block; position:absolute;
    top:3px; right:4px; width:24px; height:24px;
    border:none;
    user-select:none; pointer-events:auto;
  }

  .WAT.Dialog > .ContentPane {
    display:block; position:absolute; overflow:auto;
    left:0px; top:0px; right:0px; bottom:0px;
    border:none;
  }
  .WAT.Dialog.withTitlebar > .ContentPane {
    display:block; position:absolute;
    left:0px; top:30px; right:0px; bottom:0px;
    border:none;
  }
  .WAT.resizable.Dialog > .ContentPane {
    display:block; position:absolute;
    left:0px; top:0px; right:0px; bottom:10px;
    border:none;
  }
  .WAT.resizable.Dialog.withTitlebar > .ContentPane {
    display:block; position:absolute;
    left:0px; top:30px; right:0px; bottom:10px;
    border:none;
  }

  .WAT.resizable.Dialog > .leftResizer {
    display:block; position:absolute;
    left:0px; bottom:0px; width:30px; height:9px;
    border:none; border-top:solid 1px black; border-right:solid 1px black;
    border-radius:0px 0px 0px 3px;
    cursor:nesw-resize; pointer-events:auto;

    -webkit-touch-callout:none;
    -ms-touch-action:none; touch-action:none;
  }

  .WAT.resizable.Dialog > .middleResizer {
    display:block; position:absolute;
    left:30px; bottom:0px; right:30px; height:9px;
    border:none; border-top:solid 1px black;
    border-radius:0px;
    cursor:ns-resize; pointer-events:auto;

    -webkit-touch-callout:none;
    -ms-touch-action:none; touch-action:none;
  }

  .WAT.resizable.Dialog > .rightResizer {
    display:block; position:absolute;
    bottom:0px; right:0px; width:30px; height:9px;
    border:none; border-left:solid 1px black; border-top:solid 1px black;
    border-radius:0px 0px 3px 0px;
    cursor:nwse-resize; pointer-events:auto;

    -webkit-touch-callout:none;
    -ms-touch-action:none; touch-action:none;
  }

/**** WAT WidgetOverlayLayer ****/

  .WAT.WidgetOverlayLayer {
    display:block; position:absolute; overflow:visible;
    left:0px; top:0px; right:0px; bottom:0px; width:auto; height:auto;
    pointer-events:none;
  }

/**** WidgetOverlay ****/

  .WAT.WidgetOverlay {
    display:block; position:fixed;
    background:white; color:black;
    box-shadow:0px 0px 10px 0px rgba(0,0,0,0.5);
    pointer-events:auto;
  }

/**** "broken" and Error Indicator ****/

  .WAT.broken {
    overflow:visible;
    border:dotted 1px orange; background:rgba(255,0,0,0.1);
  }

  .WAT.ErrorIndicator {
    overflow:hidden;
    left:0px; top:0px; width:24px; height:24px;
    background:url("data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3Csvg width='24px' height='24px' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12 17.0001H12.01M12 10.0001V14.0001M6.41209 21.0001H17.588C19.3696 21.0001 20.2604 21.0001 20.783 20.6254C21.2389 20.2985 21.5365 19.7951 21.6033 19.238C21.6798 18.5996 21.2505 17.819 20.3918 16.2579L14.8039 6.09805C13.8897 4.4359 13.4326 3.60482 12.8286 3.32987C12.3022 3.09024 11.6978 3.09024 11.1714 3.32987C10.5674 3.60482 10.1103 4.4359 9.19614 6.09805L3.6082 16.2579C2.74959 17.819 2.32028 18.5996 2.39677 19.238C2.46351 19.7951 2.76116 20.2985 3.21709 20.6254C3.7396 21.0001 4.63043 21.0001 6.41209 21.0001Z' stroke='orange' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' fill='white'/%3E%3C/svg%3E");
    pointer-events:auto;
    z-index:1000001;
  }/**** Mover, Resizer ****/

  .WAT.Mover, .WAT.Resizer, .WAT.Dragger {
    display:block; position:absolute;
    background:none;
    user-select:none; pointer-events:auto;

    -webkit-touch-callout:none;
    -ms-touch-action:none; touch-action:none;
  }

/**** Shaper ****/

  .WAT.Shaper {
    display:block; position:absolute; overflow:visible;
    left:0px; top:0px; right:0px; bottom:0px;
    outline:dotted 2px orangered;
    background:none;
    user-select:none; pointer-events:none;

    -webkit-touch-callout:none;
    -ms-touch-action:none; touch-action:none;
  }

  .WAT.ShaperHandle {
    display:block; position:absolute;
    width:8px; height:8px;
    background:orangered; border:solid 1px darkgray;
    z-index:100000;
    user-select:none; pointer-events:auto;

    -webkit-touch-callout:none;
    -ms-touch-action:none; touch-action:none;
  }



/**** common Settings ****/

  div.WAT {
    touch-action:none; user-select:none;
    -webkit-touch-callout:none;
  }

  .WAT img {
    -webkit-user-drag:none; -khtml-user-drag:none;
    -moz-user-drag:none; -o-user-drag:none;
    user-drag: none;
    user-select: none;
  }

  .disabled, [disabled] { opacity:0.3 }
  .readonly             { background:none }
  .no-pointer-events    { pointer-events:none }

  .textured { background-repeat:repeat }

  .centered {
    display:flex; align-items:center; justify-content:center;
  }

  .horizontally-centered {
    display:flex; justify-content:center;
  }

  .vertically-centered {
    display:flex; align-items:center;
  }

  .scrollable   { overflow:scroll }
  .scrollable-x { overflow-x:scroll; overflow-y:hidden }
  .scrollable-y { overflow-x:hidden; overflow-y:scroll }

`.trimLeft();
    document.head.appendChild(WATStyleElement);
}
/**** installStylesheetForBehavior ****/
function installStylesheetForBehavior(Applet, Category, Behavior, Stylesheet) {
    allowText('stylesheet', Stylesheet);
    // @ts-ignore TS7053 allow indexing
    let Registration = Applet._BehaviorPool[Category][Behavior.toLowerCase()];
    if (Registration == null)
        throwError(`InternalError: no registration for ${Category} behaviour ${quoted(Behavior)} found`);
    const StylesheetId = `WAT-Stylesheet_for_${Category}_Behavior_${Behavior.toLowerCase()}`;
    if ((Stylesheet == null) || (Stylesheet.trim() === '')) {
        let StyleElement = document.getElementById(StylesheetId);
        if (StyleElement != null) {
            StyleElement.remove();
        }
    }
    else {
        let StyleElement = document.getElementById(StylesheetId);
        if (StyleElement == null) {
            StyleElement = document.createElement('style');
            StyleElement.id = StylesheetId;
            document.head.appendChild(StyleElement);
        }
        StyleElement.textContent = Stylesheet;
    }
}
/**** uninstallStylesheetForBehavior ****/
function uninstallStylesheetForBehavior(Applet, Category, Behavior) {
    const StylesheetId = `WAT-Stylesheet_for_${Category}_Behavior_${Behavior.toLowerCase()}`;
    let StyleElement = document.getElementById(StylesheetId);
    if (StyleElement != null) {
        StyleElement.remove();
    }
}
/**** installStylesheetForVisual ****/
function installStylesheetForVisual(Visual, Stylesheet) {
    expectVisual('WAT visual', Visual);
    allowText('stylesheet', Stylesheet);
    const StylesheetId = `WAT-Stylesheet_for_${IdOfVisual(Visual)}`;
    if ((Stylesheet == null) || (Stylesheet.trim() === '')) {
        let StyleElement = document.getElementById(StylesheetId);
        if (StyleElement != null) {
            StyleElement.remove();
        }
    }
    else {
        let StyleElement = document.getElementById(StylesheetId);
        if (StyleElement == null) {
            StyleElement = document.createElement('style');
            StyleElement.id = StylesheetId;
            document.head.appendChild(StyleElement);
        }
        StyleElement.textContent = Stylesheet;
    }
}
/**** uninstallStylesheetForVisual ****/
function uninstallStylesheetForVisual(Visual) {
    expectVisual('WAT visual', Visual);
    const StylesheetId = `WAT-Stylesheet_for_${IdOfVisual(Visual)}`;
    let StyleElement = document.getElementById(StylesheetId);
    if (StyleElement != null) {
        StyleElement.remove();
    }
}
//------------------------------------------------------------------------------
//--                             Behavior Support                             --
//------------------------------------------------------------------------------
/**** BehaviorIsIntrinsic ****/
const IntrinsicBehaviors = new Set();
// filled by "registerIntrinsicBehavior" - i.e., this set always reflects
// the actually integrated behaviors rather than a fixed name pattern
export function BehaviorIsIntrinsic(Behavior) {
    expectBehavior('behavior', Behavior);
    return IntrinsicBehaviors.has(Behavior.toLowerCase());
}
/**** registerIntrinsicBehavior ****/
function registerIntrinsicBehavior(Applet, Category, Name, compiledScript) {
    expectApplet('applet', Applet);
    expectCategory('behavior category', Category);
    expectBehavior('behavior', Name);
    expectFunction('behavior function', compiledScript);
    const normalizedName = Name.toLowerCase();
    // @ts-ignore TS7053 allow indexing
    if (Applet._BehaviorPool[Category][normalizedName] != null)
        throwError(`InvalidArgument:a behaviour for ${Category}s with the name ${Name} has already been registered`);
    const ScriptSource = compiledScript.toString();
    const activeScript = ScriptSource.slice(// extracts the mere function body
    ScriptSource.indexOf('{') + 1, ScriptSource.lastIndexOf('}')).trim();
    // @ts-ignore TS7053 allow indexing
    Applet._BehaviorPool[Category][normalizedName] = {
        Category, Name, activeScript, compiledScript, isNew: true
    };
    IntrinsicBehaviors.add(normalizedName);
}
/**** brokenBehavior ****/
async function brokenBehavior(Visual) {
    const Applet = Visual.Applet;
    const Category = Visual.Category;
    const Behavior = Visual.Behavior;
    // @ts-ignore TS7053 allow indexing
    const Signal = Applet._BehaviorPool[Category][Behavior.toLowerCase()].Error;
    setErrorReport(Visual, {
        Type: 'Behaviour Compilation Failure',
        Sufferer: Visual, Message: '' + Signal, Cause: Signal
    });
}
/**** missingBehavior ****/
function missingBehavior(Visual) {
    setErrorReport(Visual, {
        Type: 'missing Behaviour',
        Sufferer: Visual, Message: `missing Behaviour ${quoted(Visual.Behavior)}`, Cause: undefined
    });
}
//----------------------------------------------------------------------------//
//                       configurable Property Support                        //
//----------------------------------------------------------------------------//
export const WAT_PropertyEditorTypes = [
    'checkbox', 'choice',
    'textline-input', 'password-input', 'number-input', 'integer-input', 'search-input',
    'phone-number-input', 'email-address-input', 'url-input',
    'time-input', 'date-time-input', 'date-input', 'month-input', 'week-input',
    'color-input', 'drop-down', 'slider',
    'text-input', 'html-input', 'css-input', 'javascript-input', 'json-input',
    'linelist-input', 'numberlist-input', 'integerlist-input'
];
export const WAT_PropertyContainerTypes = ['none', 'observed', 'memoized'];
/**** forbiddenPropertyNames ****/
const forbiddenPropertyNames = Object.create(null);
function collectInternalNames() {
    Object.assign(forbiddenPropertyNames, {
        mount: true, unmount: true, render: true, // intrinsic callback names
        input: true, click: true, dblclick: true,
        drop: true, ready: true
    });
    // @ts-ignore TS2345 allow abstract class as argument
    collectInternalNamesFrom(WAT_Visual);
    collectInternalNamesFrom(WAT_Applet);
    collectInternalNamesFrom(WAT_Page);
    collectInternalNamesFrom(WAT_Widget);
    delete forbiddenPropertyNames['value']; // "Value" may be customized
}
function collectInternalNamesFrom(WAT_Class) {
    Object.getOwnPropertyNames(WAT_Class.prototype).forEach((Name) => {
        if (!Name.startsWith('_')) {
            forbiddenPropertyNames[Name.toLowerCase()] = true;
        }
    });
}
/**** validatePropertyName ****/
function validatePropertyName(Name) {
    if (Name.toLowerCase() in forbiddenPropertyNames)
        throwError('InvalidArgument: forbidden property name ' + quoted(Name));
}
/**** PatternIsCompilable ****/
function PatternIsCompilable(Pattern) {
    try {
        new RegExp(Pattern);
        return true;
    }
    catch (Signal) {
        return false;
    }
}
/**** ValueIsPropertyDescriptor ****/
function ValueIsPropertyDescriptor(Value) {
    if (!ValueIsPlainObject(Value) ||
        !ValueIsIdentifier(Value.Name) ||
        (Value.Name.toLowerCase() in forbiddenPropertyNames) ||
        (Value.Label != null) && !ValueIsTextline(Value.Label) ||
        (Value.EditorType == null) ||
        !ValueIsOneOf(Value.EditorType, WAT_PropertyEditorTypes) ||
        (Value.AccessorsFor != null) && !ValueIsOneOf(Value.AccessorsFor, WAT_PropertyContainerTypes) ||
        (Value.Validator != null) && !ValueIsFunction(Value.Validator) ||
        (Value.readonly != null) && !ValueIsBoolean(Value.readonly) ||
        (Value.withCallback != null) && !ValueIsBoolean(Value.withCallback)) {
        return false;
    }
    /**** validate editor-specific settings ****/
    const { EditorType, Placeholder, FalseValue, TrueValue, minLength, maxLength, multiple, Pattern, minValue, maxValue, Stepping, Resizability, LineWrapping, SpellChecking, ValueList, Hashmarks, Suggestions } = Value;
    switch (EditorType) {
        case 'checkbox':
            break;
        case 'choice': // drop-down for boolean properties
            if (!ValueIsTextline(FalseValue) || !ValueIsTextline(TrueValue)) {
                return false;
            }
            break;
        case 'textline-input':
        case 'password-input':
        case 'email-address-input':
        case 'phone-number-input':
        case 'url-input':
        case 'search-input':
            if ((Placeholder != null) && !ValueIsTextline(Placeholder) ||
                (minLength != null) && !ValueIsOrdinal(minLength) ||
                (maxLength != null) && !ValueIsOrdinal(maxLength) ||
                (multiple != null) && !ValueIsBoolean(multiple) ||
                (SpellChecking != null) && !ValueIsBoolean(SpellChecking) ||
                (Pattern != null) && !((Pattern instanceof RegExp) || ValueIsTextline(Pattern) && PatternIsCompilable(Pattern)) ||
                (Suggestions != null) && !ValueIsListSatisfying(Suggestions, ValueIsTextline)) {
                return false;
            }
            break;
        case 'number-input':
        case 'integer-input':
            if ((Placeholder != null) && !ValueIsTextline(Placeholder) ||
                (minValue != null) && !ValueIsFiniteNumber(minValue) ||
                (maxValue != null) && !ValueIsFiniteNumber(maxValue) ||
                (Stepping != null) && !ValueIsNumberInRange(Stepping, 0, Infinity, false) && (Stepping !== 'any') ||
                (Suggestions != null) && !ValueIsListSatisfying(Suggestions, ValueIsFiniteNumber)) {
                return false;
            }
            break;
        case 'time-input':
            if ((minValue != null) && !ValueIsStringMatching(minValue, WAT_TimeRegExp) ||
                (maxValue != null) && !ValueIsStringMatching(maxValue, WAT_TimeRegExp) ||
                (Suggestions != null) && !ValueIsListSatisfying(Suggestions, WAT_TimeMatcher)) {
                return false;
            }
            break;
        case 'date-time-input':
            if ((minValue != null) && !ValueIsStringMatching(minValue, WAT_DateTimeRegExp) ||
                (maxValue != null) && !ValueIsStringMatching(maxValue, WAT_DateTimeRegExp) ||
                (Suggestions != null) && !ValueIsListSatisfying(Suggestions, WAT_DateTimeMatcher)) {
                return false;
            }
            break;
        case 'date-input':
            if ((minValue != null) && !ValueIsStringMatching(minValue, WAT_DateRegExp) ||
                (maxValue != null) && !ValueIsStringMatching(maxValue, WAT_DateRegExp) ||
                (Suggestions != null) && !ValueIsListSatisfying(Suggestions, WAT_DateMatcher)) {
                return false;
            }
            break;
        case 'month-input':
            if ((minValue != null) && !ValueIsStringMatching(minValue, WAT_MonthRegExp) ||
                (maxValue != null) && !ValueIsStringMatching(maxValue, WAT_MonthRegExp) ||
                (Suggestions != null) && !ValueIsListSatisfying(Suggestions, WAT_MonthMatcher)) {
                return false;
            }
            break;
        case 'week-input':
            if ((minValue != null) && !ValueIsStringMatching(minValue, WAT_WeekRegExp) ||
                (maxValue != null) && !ValueIsStringMatching(maxValue, WAT_WeekRegExp) ||
                (Suggestions != null) && !ValueIsListSatisfying(Suggestions, WAT_WeekMatcher)) {
                return false;
            }
            break;
        case 'color-input':
            break;
        case 'drop-down':
            if (!ValueIsListSatisfying(ValueList, ValueIsTextline)) {
                return false;
            }
            break;
        case 'slider':
            if ((minValue != null) && !ValueIsFiniteNumber(minValue) ||
                (maxValue != null) && !ValueIsFiniteNumber(maxValue) ||
                (Stepping != null) && !ValueIsNumberInRange(Stepping, 0, Infinity, false) && (Stepping !== 'any') ||
                (Hashmarks != null) && !ValueIsListSatisfying(Hashmarks, HashmarkMatcher)) {
                return false;
            }
            break;
        case 'text-input':
            if ((Placeholder != null) && !ValueIsTextline(Placeholder) ||
                (minLength != null) && !ValueIsOrdinal(minLength) ||
                (maxLength != null) && !ValueIsOrdinal(maxLength) ||
                (SpellChecking != null) && !ValueIsBoolean(SpellChecking) ||
                (Resizability != null) && !ValueIsOneOf(Resizability, ['none', 'horizontal', 'vertical', 'both']) ||
                (LineWrapping != null) && !ValueIsBoolean(LineWrapping)) {
                return false;
            }
            break;
        case 'html-input':
        case 'css-input':
        case 'javascript-input':
        case 'json-input':
        case 'linelist-input':
        case 'numberlist-input':
        case 'integerlist-input':
            if ((Placeholder != null) && !ValueIsTextline(Placeholder) ||
                (minLength != null) && !ValueIsOrdinal(minLength) ||
                (maxLength != null) && !ValueIsOrdinal(maxLength) ||
                (Resizability != null) && !ValueIsOneOf(Resizability, ['none', 'horizontal', 'vertical', 'both']) ||
                (LineWrapping != null) && !ValueIsBoolean(LineWrapping)) {
                return false;
            }
            if ((EditorType === 'linelist-input') &&
                (Pattern != null) && !((Pattern instanceof RegExp) || ValueIsTextline(Pattern) && PatternIsCompilable(Pattern))) {
                return false;
            }
            if ((EditorType === 'numberlist-input') || (EditorType === 'integerlist-input')) {
                if ((minValue != null) && !ValueIsFiniteNumber(minValue) ||
                    (maxValue != null) && !ValueIsFiniteNumber(maxValue)) {
                    return false;
                }
            }
            break;
    }
    return true;
}
/**** normalizedPropertyDescriptor ****/
function normalizedPropertyDescriptor(Value) {
    if (!ValueIsPropertyDescriptor(Value))
        throwError(`InvalidArgument: invalid property ${(Value === null || Value === void 0 ? void 0 : Value.Name) == null ? '' : quoted('' + (Value === null || Value === void 0 ? void 0 : Value.Name))}`);
    let { Name, Label, EditorType, readonly, Validator, Default, AccessorsFor, withCallback, Placeholder, FalseValue, TrueValue, minLength, maxLength, multiple, Pattern, minValue, maxValue, withMin, withMax, Stepping, Resizability, LineWrapping, SpellChecking, ValueList, Hashmarks, Suggestions } = Value;
    if (Label == null) {
        Label = Name;
    }
    let Descriptor = { Name, Label, EditorType };
    if (readonly != null) {
        Descriptor.readonly = readonly;
    }
    if (withCallback != null) {
        Descriptor.withCallback = withCallback;
    }
    if (Validator != null) {
        Descriptor.Validator = Validator;
    }
    if (Default != null) {
        Descriptor.Default = ( // do not share
        ValueIsList(Default) ? Default.slice() : Default // given list default
        );
    }
    if (withMin != null) {
        Descriptor.withMin = withMin;
    }
    if (withMax != null) {
        Descriptor.withMax = withMax;
    }
    if (AccessorsFor == null) {
        Descriptor.AccessorsFor = 'memoized';
    }
    else {
        if (AccessorsFor !== 'none') {
            Descriptor.AccessorsFor = AccessorsFor;
        }
    }
    switch (Value.EditorType) {
        case 'checkbox':
            break;
        case 'choice': // drop-down for boolean properties
            Descriptor.FalseValue = FalseValue;
            Descriptor.TrueValue = TrueValue;
            break;
        case 'textline-input':
        case 'password-input':
        case 'email-address-input':
        case 'phone-number-input':
        case 'url-input':
        case 'search-input':
            if (Placeholder != null) {
                Descriptor.Placeholder = Placeholder;
            }
            if (minLength != null) {
                Descriptor.minLength = minLength;
            }
            if (maxLength != null) {
                Descriptor.maxLength = maxLength;
            }
            if (multiple != null) {
                Descriptor.multiple = multiple;
            }
            if (SpellChecking != null) {
                Descriptor.SpellChecking = SpellChecking;
            }
            if (Pattern != null) {
                Descriptor.Pattern = Pattern;
            }
            if (Suggestions != null) {
                Descriptor.Suggestions = Suggestions.slice();
            }
            break;
        case 'number-input':
        case 'integer-input':
            if (Placeholder != null) {
                Descriptor.Placeholder = Placeholder;
            }
            if (minValue != null) {
                Descriptor.minValue = minValue;
            }
            if (maxValue != null) {
                Descriptor.maxValue = maxValue;
            }
            if (Stepping != null) {
                Descriptor.Stepping = Stepping;
            }
            if (Suggestions != null) {
                Descriptor.Suggestions = Suggestions.slice();
            }
            break;
        case 'time-input':
        case 'date-time-input':
        case 'date-input':
        case 'month-input':
        case 'week-input':
            if (minValue != null) {
                Descriptor.minValue = minValue;
            }
            if (maxValue != null) {
                Descriptor.maxValue = maxValue;
            }
            if (Suggestions != null) {
                Descriptor.Suggestions = Suggestions.slice();
            }
            break;
        case 'color-input':
            break;
        case 'drop-down':
            Descriptor.ValueList = ValueList.slice();
            break;
        case 'slider':
            if (minValue != null) {
                Descriptor.minValue = minValue;
            }
            if (maxValue != null) {
                Descriptor.maxValue = maxValue;
            }
            if (Stepping != null) {
                Descriptor.Stepping = Stepping;
            }
            if (Hashmarks != null) {
                Descriptor.Hashmarks = Hashmarks.slice();
            }
            break;
        case 'text-input':
            if (Placeholder != null) {
                Descriptor.Placeholder = Placeholder;
            }
            if (minLength != null) {
                Descriptor.minLength = minLength;
            }
            if (maxLength != null) {
                Descriptor.maxLength = maxLength;
            }
            if (SpellChecking != null) {
                Descriptor.SpellChecking = SpellChecking;
            }
            if (Resizability != null) {
                Descriptor.Resizability = Resizability;
            }
            if (LineWrapping != null) {
                Descriptor.LineWrapping = LineWrapping;
            }
            break;
        case 'html-input':
        case 'css-input':
        case 'javascript-input':
        case 'json-input':
        case 'linelist-input':
        case 'numberlist-input':
        case 'integerlist-input':
            if (Placeholder != null) {
                Descriptor.Placeholder = Placeholder;
            }
            if (minLength != null) {
                Descriptor.minLength = minLength;
            }
            if (maxLength != null) {
                Descriptor.maxLength = maxLength;
            }
            if (Resizability != null) {
                Descriptor.Resizability = Resizability;
            }
            if (LineWrapping != null) {
                Descriptor.LineWrapping = LineWrapping;
            }
            if (EditorType === 'linelist-input') {
                if (Pattern != null) {
                    Descriptor.Pattern = Pattern;
                }
            }
            if ((EditorType === 'numberlist-input') || (EditorType === 'integerlist-input')) {
                if (minValue != null) {
                    Descriptor.minValue = minValue;
                }
                if (maxValue != null) {
                    Descriptor.maxValue = maxValue;
                }
            }
            break;
    }
    return Descriptor;
}
/**** installAccessorFor ****/
function installAccessorFor(Visual, Descriptor) {
    const { minValue, maxValue, withMin, withMax, Pattern, ValueList } = Descriptor;
    const RegEx = (Pattern == null
        ? undefined
        : Pattern instanceof RegExp // anchor given RegExp as well
            ? new RegExp('^(?:' + Pattern.source + ')$', Pattern.flags)
            : new RegExp('^(?:' + Pattern + ')$'));
    let Validator = Descriptor.Validator;
    if (Validator == null) {
        switch (Descriptor.EditorType) {
            case 'checkbox':
            case 'choice':
                Validator = ValueIsBoolean;
                break;
            case 'textline-input':
            case 'password-input':
                Validator = (Pattern == null
                    ? ValueIsTextline
                    : (Value) => ValueIsStringMatching(Value, RegEx));
                break;
            case 'email-address-input':
                Validator = ValueIsEMailAddress;
                break;
            case 'phone-number-input':
                Validator = ValueIsPhoneNumber;
                break;
            case 'url-input':
                Validator = ValueIsURL;
                break;
            case 'search-input':
                Validator = ValueIsTextline;
                break;
            case 'number-input':
                if ((Descriptor.minValue == null) && (Descriptor.maxValue == null)) {
                    Validator = ValueIsFiniteNumber; // reject NaN and Infinity
                }
                else {
                    Validator = (Value) => ValueIsNumberInRange(Value, minValue, maxValue, withMin, withMax);
                }
                break;
            case 'integer-input':
                if ((Descriptor.minValue == null) && (Descriptor.maxValue == null)) {
                    Validator = ValueIsInteger;
                }
                else {
                    Validator = (Value) => ValueIsIntegerInRange(Value, minValue, maxValue);
                }
                break;
            case 'time-input':
                Validator = (Value) => ValueIsStringMatching(Value, WAT_TimeRegExp);
                break;
            case 'date-time-input':
                Validator = (Value) => ValueIsStringMatching(Value, WAT_DateTimeRegExp);
                break;
            case 'date-input':
                Validator = (Value) => ValueIsStringMatching(Value, WAT_DateRegExp);
                break;
            case 'month-input':
                Validator = (Value) => ValueIsStringMatching(Value, WAT_MonthRegExp);
                break;
            case 'week-input':
                Validator = (Value) => ValueIsStringMatching(Value, WAT_WeekRegExp);
                break;
            case 'color-input':
                Validator = ValueIsColor;
                break;
            case 'drop-down':
                Validator = (Value) => ValueIsOneOf(Value, ValueList);
                break;
            case 'slider':
                if ((Descriptor.minValue == null) && (Descriptor.maxValue == null)) {
                    Validator = ValueIsFiniteNumber; // reject NaN and Infinity
                }
                else {
                    Validator = (Value) => ValueIsNumberInRange(Value, minValue, maxValue, withMin, withMax);
                }
                break;
            case 'text-input':
            case 'html-input':
            case 'css-input':
            case 'javascript-input':
                Validator = ValueIsText;
                break;
            case 'json-input':
                Validator = ValueIsJSON;
                break;
            case 'linelist-input':
                Validator = (Value) => ValueIsLineList(Value, RegEx);
                break;
            case 'numberlist-input':
                Validator = (Value) => (ValueIsNumberList(Value, minValue, maxValue, withMin, withMax) &&
                    Value.every(ValueIsFiniteNumber) // reject NaN and Infinity
                );
                break;
            case 'integerlist-input':
                Validator = (Value) => ValueIsIntegerList(Value, minValue, maxValue);
                break;
        }
    }
    const Container = Descriptor.AccessorsFor, Default = Descriptor.Default;
    Object.defineProperty(Visual, Descriptor.Name, {
        configurable: true, enumerable: true,
        get: () => {
            const Result = acceptableValue(Visual[Container][Descriptor.Name], Validator, Default);
            return ( // never hand out the list default itself...
            ValueIsList(Result) && (Result === Default) ? Result.slice() : Result); // ...as it could be mutated by the caller
        },
        set: (newValue) => {
            ;
            (Default == null ? allowValue : expectValue)(Descriptor.Name, newValue, Validator);
            const originalValue = newValue; // for callbacks, prior normalization
            if (ValuesAreEqual(newValue, Default)) {
                newValue = undefined;
            }
            if (ValuesDiffer(newValue, Visual[Container][Descriptor.Name])) {
                Visual[Container][Descriptor.Name] = (ValueIsList(newValue) ? newValue.slice() : newValue);
                if (Descriptor.withCallback) {
                    Visual.on(Descriptor.Name)(originalValue);
                }
                Visual.rerender();
            }
        },
    });
}
//----------------------------------------------------------------------------//
//                              Callback Support                              //
//----------------------------------------------------------------------------//
function noCallback() { }
/**** makeVisualReady ****/
function makeVisualReady(Visual) {
    var _a, _b;
    switch (Visual.Category) {
        case 'applet':
            if (!Visual.isReady) {
                // @ts-ignore TS2445 allow access to "_isReady"
                Visual._isReady = true;
                Visual.on('ready')();
            }
            ;
            Visual.PageList.forEach((Page) => makeVisualReady(Page));
            break;
        case 'page':
            if ((_a = Visual.Applet) === null || _a === void 0 ? void 0 : _a.isReady) {
                if (!Visual.isReady) {
                    // @ts-ignore TS2445 allow access to "_isReady"
                    Visual._isReady = true;
                    Visual.on('ready')();
                }
                ;
                Visual.WidgetList.forEach((Widget) => makeVisualReady(Widget));
            }
            break;
        case 'widget':
            if (((_b = Visual.Page) === null || _b === void 0 ? void 0 : _b.isReady) && !Visual.isReady) {
                // @ts-ignore TS2445 allow access to "_isReady"
                Visual._isReady = true;
                Visual.on('ready')();
            }
    }
}
//------------------------------------------------------------------------------
//--                           Reactivity Handling                            --
//------------------------------------------------------------------------------
const reactiveFunctionsForVisual = new WeakMap();
/**** registerReactiveFunctionIn ****/
function registerReactiveFunctionIn(Visual, reactiveFunction) {
    let reactiveFunctions = reactiveFunctionsForVisual.get(Visual);
    if (reactiveFunctions == null) {
        reactiveFunctionsForVisual.set(Visual, reactiveFunctions = []);
    }
    reactiveFunctions.push(reactiveFunction);
}
/**** unregisterAllReactiveFunctionsFrom ****/
function unregisterAllReactiveFunctionsFrom(Visual) {
    let reactiveFunctions = reactiveFunctionsForVisual.get(Visual);
    if (reactiveFunctions == null) {
        return;
    }
    reactiveFunctions.forEach((reactiveFunction) => {
        dispose(reactiveFunction);
    });
    reactiveFunctions.length = 0;
}
//------------------------------------------------------------------------------
//--                              Error Handling                              --
//------------------------------------------------------------------------------
/**** setErrorReport ****/
function setErrorReport(Visual, ErrorReport) {
    expectVisual('visual', Visual);
    allowErrorReport('error report', ErrorReport);
    if (ValuesDiffer(Visual.ErrorReport, ErrorReport)) {
        console.log('setErrorReport', Visual, ErrorReport);
        Visual._ErrorReport = ErrorReport;
        Visual.rerender();
    }
}
/**** setScriptError (used by Designer) ****/
export function setScriptError(Visual, ScriptError) {
    expectVisual('visual', Visual);
    allowErrorReport('script error', ScriptError);
    if (ValuesDiffer(Visual.ScriptError, ScriptError)) {
        Visual._ScriptError = ScriptError;
        Visual.rerender();
    }
}
/**** ErrorRenderingFor ****/
function ErrorRenderingFor(Visual) {
    const onClick = () => showErrorReport(Visual, Visual.ErrorReport);
    return html `<div class="WAT ErrorIndicator" onClick=${onClick}/>`;
}
/**** showErrorReport ****/
function showErrorReport(Visual, ErrorReport) {
    if (typeof (DesignerLayer === null || DesignerLayer === void 0 ? void 0 : DesignerLayer.showErrorReport) === 'function') {
        DesignerLayer.showErrorReport(Visual, ErrorReport);
    }
    else {
        window.alert(ErrorReport.Type + '\n\n' + ErrorReport.Message);
    }
}
//-------------------------------------------------------------------------------
//--                            Gesture Recognizer                             --
//-------------------------------------------------------------------------------
// warning: coordinates are relative to the viewport!
export function GestureRecognizer(OptionSet) {
    expectPlainObject('recognizer option set', OptionSet);
    /**** validate options ****/
    let { onlyFrom, neverFrom, ClickRadius, MultiClickLimit, MultiClickTimeSpan, primaryLongPressDelay, secondaryLongPressDelay, onClick, onDblClick, onMultiClick, onLongPressIndication, onLongPress, onDragStart, onDragContinuation, onDragFinish, onDragCancellation, } = OptionSet;
    if (!(onlyFrom instanceof Element)) {
        allowTextline('"onlyFrom" selector', onlyFrom);
    }
    if (!(neverFrom instanceof Element)) {
        allowTextline('"neverFrom" selector', neverFrom);
    }
    allowOrdinal('click radius', ClickRadius);
    allowOrdinal('multi-click limit', MultiClickLimit);
    allowOrdinal('multi-click time span', MultiClickTimeSpan);
    allowOrdinal('primary long-press delay', primaryLongPressDelay);
    allowOrdinal('secondary long-press delay', secondaryLongPressDelay);
    allowFunction('"onClick" callback', onClick);
    allowFunction('"onDblClick" callback', onDblClick);
    allowFunction('"onMultiClick" callback', onMultiClick);
    allowFunction('"onLongPressIndication" callback', onLongPressIndication);
    allowFunction('"onLongPress" callback', onLongPress);
    allowFunction('"onDragStart" callback', onDragStart);
    allowFunction('"onDragContinuation" callback', onDragContinuation);
    allowFunction('"onDragFinish" callback', onDragFinish);
    allowFunction('"onDragCancellation" callback', onDragCancellation);
    /**** detect configured features and apply defaults ****/
    if (ClickRadius == null) {
        ClickRadius = 4;
    }
    if (MultiClickTimeSpan == null) {
        MultiClickTimeSpan = 300;
    }
    if (MultiClickLimit == null) {
        MultiClickLimit = 0;
        if (onClick != null) {
            MultiClickLimit = 1;
        }
        if (onDblClick != null) {
            MultiClickLimit = 2;
        }
        if (onMultiClick != null) {
            MultiClickLimit = 3;
        }
    }
    const RecognizerMayClick = (MultiClickLimit > 0);
    const RecognizerMayLongPress = (onLongPress != null);
    if (RecognizerMayLongPress) {
        if (primaryLongPressDelay == null) {
            primaryLongPressDelay = 500;
        }
        if (secondaryLongPressDelay == null) {
            secondaryLongPressDelay = 1000;
        }
    }
    const RecognizerMayDrag = ((onDragStart != null) && (onDragContinuation != null) &&
        (onDragFinish != null) && (onDragCancellation != null));
    /**** Working Variables ****/
    let Status = '', StartX = 0, StartY = 0;
    let curEvent, curX, curY;
    let curPointerId = undefined;
    let lastClickCount = 0, lastClickTime = 0;
    let LongPressTimer, LongPressState = '';
    /**** actual recognizer ****/
    return (Event) => {
        switch (Event.type) {
            case 'pointerdown': return onPointerDown(Event);
            case 'pointermove': return onPointerMove(Event);
            case 'pointerup': return onPointerUp(Event);
            case 'pointercancel': return onPointerCancel(Event);
            default: return; // ignore any other events
        }
    };
    /**** onPointerDown ****/
    function onPointerDown(Event) {
        if ((Status !== '') && (Event.pointerId !== curPointerId)) {
            return;
        }
        // ignore other pointers
        if (Event.buttons !== 1) { // only handle events for primary button
            if (Status !== '') {
                onPointerCancel(Event);
            }
            return;
        }
        const Target = Event.target;
        if (neverFrom != null) {
            if (neverFrom instanceof Element) {
                if (neverFrom.contains(Target)) {
                    return;
                }
            }
            else {
                if (Target.closest(neverFrom) != null) {
                    return;
                }
            }
        }
        if (onlyFrom != null) {
            if (onlyFrom instanceof Element) {
                if (!onlyFrom.contains(Target)) {
                    return;
                }
            }
            else {
                if (Target.closest(onlyFrom) == null) {
                    return;
                }
            }
        }
        // @ts-ignore TS18047,TS2339 allow "Event.target.setPointerCapture"
        Event.target.setPointerCapture(Event.pointerId);
        Event.stopPropagation(); // consume event
        Event.preventDefault();
        if (LongPressTimer != null) {
            clearTimeout(LongPressTimer);
        }
        LongPressState = '';
        LongPressTimer = undefined;
        curPointerId = Event.pointerId;
        Status = 'observing'; // i.e., before choice between "click" and "drag"
        StartX = curX = Event.clientX;
        curEvent = Event;
        StartY = curY = Event.clientY;
        if (RecognizerMayLongPress) { // prepare for a long press
            LongPressState = 'preparing';
            LongPressTimer = setTimeout(handleLongPressTimeout, primaryLongPressDelay);
        }
    }
    /**** onPointerMove ****/
    function onPointerMove(Event) {
        if (Status === '') {
            return;
        } // recognizer is not active yet
        if (Event.pointerId !== curPointerId) {
            return;
        } // ignore other pointers
        if (Event.buttons !== 1) { // only handle events for primary button
            if (Status !== '') {
                onPointerCancel(Event);
            }
            return;
        }
        Event.stopPropagation(); // consume event
        Event.preventDefault();
        ({ clientX: curX, clientY: curY } = curEvent = Event);
        if (Status === 'observing') {
            if (RecognizerMayDrag &&
                ((curX - StartX) ** 2 + (curY - StartY) ** 2 >= ClickRadius ** 2)) { // ok, no "click" any longer, but "drag"
                Status = 'moving';
                call(onDragStart, [curX - StartX, curY - StartY, StartX, StartY, Event]);
                /**** cancel any long-press preparations ****/
                if (LongPressTimer != null) {
                    clearTimeout(LongPressTimer);
                }
                if ((LongPressState === 'waiting') || (LongPressState === 'ready')) {
                    call(onLongPressIndication, [false, curX, curY, StartX, StartY, Event]);
                }
                LongPressState = '';
                LongPressTimer = undefined;
            }
        }
        else { // Status === 'moving'
            call(onDragContinuation, [curX - StartX, curY - StartY, StartX, StartY, Event]);
        }
    }
    /**** onPointerUp ****/
    function onPointerUp(Event) {
        if (Status === '') {
            return;
        } // recognizer is not active yet
        if (Event.pointerId !== curPointerId) {
            return;
        } // ignore other pointers
        if (Event.buttons !== 0) { // only handle events for primary button
            if (Status !== '') {
                onPointerCancel(Event);
            }
            return;
        }
        Event.stopPropagation(); // consume event
        Event.preventDefault();
        ({ clientX: curX, clientY: curY } = curEvent = Event);
        if (Status === 'observing') {
            if (LongPressState === 'ready') {
                lastClickCount = lastClickTime = 0;
                call(onLongPressIndication, [false, curX, curY, StartX, StartY, Event]);
                call(onLongPress, [curX, curY, StartX, StartY, Event]);
                LongPressState = '';
            }
            else {
                const now = Date.now();
                if ((lastClickCount === MultiClickLimit) ||
                    (now - lastClickTime > MultiClickTimeSpan)) {
                    lastClickCount = 1;
                }
                else {
                    lastClickCount++;
                }
                lastClickTime = now;
                if (RecognizerMayClick) {
                    switch (lastClickCount) {
                        case 1:
                            call(onClick, [curX, curY, StartX, StartY, Event]);
                            break;
                        case 2:
                            call(onDblClick, [curX, curY, StartX, StartY, Event]);
                            break;
                    }
                    call(onMultiClick, [lastClickCount, curX, curY, StartX, StartY, Event]);
                }
                /**** cancel any long-press preparations ****/
                if (LongPressTimer != null) {
                    clearTimeout(LongPressTimer);
                }
                if (LongPressState === 'waiting') {
                    call(onLongPressIndication, [false, curX, curY, StartX, StartY, Event]);
                }
                LongPressState = '';
                LongPressTimer = undefined;
            }
        }
        else { // Status === 'moving'
            lastClickCount = lastClickTime = 0;
            call(onDragFinish, [curX - StartX, curY - StartY, StartX, StartY, Event]);
        }
        Status = '';
        curPointerId = undefined;
    }
    /**** onPointerCancel ****/
    function onPointerCancel(Event) {
        if (Status === '') {
            return;
        } // recognizer is not active yet
        if (Event.pointerId !== curPointerId) {
            return;
        } // ignore other pointers
        Event.stopPropagation(); // consume event
        Event.preventDefault();
        ({ clientX: curX, clientY: curY } = curEvent = Event);
        if (Status === 'moving') {
            call(onDragCancellation, [curX - StartX, curY - StartY, StartX, StartY, Event]);
        }
        Status = '';
        lastClickCount = lastClickTime = 0;
        /**** cancel any long-press preparations ****/
        if (LongPressTimer != null) {
            clearTimeout(LongPressTimer);
        }
        if ((LongPressState === 'waiting') || (LongPressState === 'ready')) {
            call(onLongPressIndication, [false, curX, curY, StartX, StartY, Event]);
        }
        LongPressState = '';
        LongPressTimer = undefined;
        curPointerId = undefined;
    }
    /**** long-press timeout handling ****/
    function handleLongPressTimeout() {
        switch (LongPressState) {
            case 'preparing':
                LongPressState = 'waiting';
                LongPressTimer = setTimeout(handleLongPressTimeout, secondaryLongPressDelay);
                call(onLongPressIndication, [true, curX, curY, StartX, StartY, curEvent]);
                break;
            case 'waiting':
                LongPressState = 'ready';
                LongPressTimer = undefined;
        }
    }
    /**** callback invocation ****/
    function call(Callback, ArgumentList) {
        if (!ValueIsFunction(Callback)) {
            return;
        }
        try {
            Callback.apply(null, ArgumentList);
        }
        catch (Signal) {
            console.warn('Callback failure', Signal);
        }
    }
}
/**** WAT_Mover ****/
export function WAT_Mover(PropSet) {
    const { Widget, style, onDragStart, onDragContinuation, onDragFinish, onDragCancellation, onMove } = PropSet;
    const GridWidth = acceptableValue(PropSet.GridWidth, ValueIsCardinal, 1);
    const GridHeight = acceptableValue(PropSet.GridHeight, ValueIsCardinal, 1);
    const PropsRef = useRef(null);
    PropsRef.current = {
        Widget, onDragStart, onDragContinuation, onDragFinish, onDragCancellation,
        onMove, GridWidth, GridHeight
    };
    const DragInfoRef = useRef(null);
    const DragInfo = DragInfoRef.current || (DragInfoRef.current = {});
    function handleMove(dx, dy) {
        const { onMove, GridWidth, GridHeight } = PropsRef.current;
        if (typeof onMove !== 'function') {
            return;
        }
        let x = GridWidth * Math.round((DragInfo.StartX + dx) / GridWidth);
        let y = GridHeight * Math.round((DragInfo.StartY + dy) / GridHeight);
        onMove(x - DragInfo.StartX, y - DragInfo.StartY, x, y);
    }
    const RecognizerRef = useRef(null);
    const Recognizer = RecognizerRef.current || (RecognizerRef.current = GestureRecognizer({
        onlyFrom: '.WAT.Mover',
        ClickRadius: 0,
        onDragStart: (dx, dy, x, y, Event) => {
            const { Widget, onDragStart } = PropsRef.current;
            DragInfo.StartX = (Widget == null ? 0 : Widget.x);
            DragInfo.StartY = (Widget == null ? 0 : Widget.y);
            if (typeof onDragStart === 'function') {
                onDragStart(dx, dy, x, y, Event);
            }
            handleMove(dx, dy);
        },
        onDragContinuation: (dx, dy, x, y, Event) => {
            const { onDragContinuation } = PropsRef.current;
            if (typeof onDragContinuation === 'function') {
                onDragContinuation(dx, dy, x, y, Event);
            }
            handleMove(dx, dy);
        },
        onDragFinish: (dx, dy, x, y, Event) => {
            const { onDragFinish } = PropsRef.current;
            if (typeof onDragFinish === 'function') {
                onDragFinish(dx, dy, x, y, Event);
            }
            handleMove(dx, dy);
        },
        onDragCancellation: (dx, dy, x, y, Event) => {
            const { onDragCancellation, onMove } = PropsRef.current;
            if (typeof onDragCancellation === 'function') {
                onDragCancellation(dx, dy, x, y, Event);
            }
            if (typeof onMove === 'function') { // restore original geometry
                onMove(0, 0, DragInfo.StartX, DragInfo.StartY);
            }
        },
    }));
    return html `<div class="WAT Mover" style="${style || ''}"
      onPointerDown=${Recognizer} onPointerUp=${Recognizer}
      onPointerMove=${Recognizer} onPointerCancel=${Recognizer}
    />`;
}
/**** WAT_Resizer ****/
export function WAT_Resizer(PropSet) {
    const { Widget, style, onDragStart, onDragContinuation, onDragFinish, onDragCancellation, onResize } = PropSet;
    const GridWidth = acceptableValue(PropSet.GridWidth, ValueIsCardinal, 1);
    const GridHeight = acceptableValue(PropSet.GridHeight, ValueIsCardinal, 1);
    const minWidth = acceptableValue(PropSet.minWidth, ValueIsOrdinal, 0);
    const minHeight = acceptableValue(PropSet.minHeight, ValueIsOrdinal, 0);
    const PropsRef = useRef(null);
    PropsRef.current = {
        Widget, onDragStart, onDragContinuation, onDragFinish, onDragCancellation,
        onResize, GridWidth, GridHeight, minWidth, minHeight
    };
    const DragInfoRef = useRef(null);
    const DragInfo = DragInfoRef.current || (DragInfoRef.current = {});
    function handleResize(dx, dy) {
        const { onResize, GridWidth, GridHeight, minWidth, minHeight } = PropsRef.current;
        if (typeof onResize !== 'function') {
            return;
        }
        let Width = GridWidth * Math.round((DragInfo.StartWidth + dx) / GridWidth);
        let Height = GridHeight * Math.round((DragInfo.StartHeight + dy) / GridHeight);
        Width = Math.max(minWidth, Width);
        Height = Math.max(minHeight, Height);
        onResize(Width - DragInfo.StartWidth, Height - DragInfo.StartHeight, Width, Height);
    }
    const RecognizerRef = useRef(null);
    const Recognizer = RecognizerRef.current || (RecognizerRef.current = GestureRecognizer({
        onlyFrom: '.WAT.Resizer',
        ClickRadius: 0,
        onDragStart: (dx, dy, x, y, Event) => {
            const { Widget, onDragStart } = PropsRef.current;
            DragInfo.StartWidth = (Widget == null ? 0 : Widget.Width);
            DragInfo.StartHeight = (Widget == null ? 0 : Widget.Height);
            if (typeof onDragStart === 'function') {
                onDragStart(dx, dy, x, y, Event);
            }
            handleResize(dx, dy);
        },
        onDragContinuation: (dx, dy, x, y, Event) => {
            const { onDragContinuation } = PropsRef.current;
            if (typeof onDragContinuation === 'function') {
                onDragContinuation(dx, dy, x, y, Event);
            }
            handleResize(dx, dy);
        },
        onDragFinish: (dx, dy, x, y, Event) => {
            const { onDragFinish } = PropsRef.current;
            if (typeof onDragFinish === 'function') {
                onDragFinish(dx, dy, x, y, Event);
            }
            handleResize(dx, dy);
        },
        onDragCancellation: (dx, dy, x, y, Event) => {
            const { onDragCancellation, onResize } = PropsRef.current;
            if (typeof onDragCancellation === 'function') {
                onDragCancellation(dx, dy, x, y, Event);
            }
            if (typeof onResize === 'function') { // restore original geometry
                onResize(0, 0, DragInfo.StartWidth, DragInfo.StartHeight);
            }
        },
    }));
    return html `<div class="WAT Resizer" style="${style || ''}"
      onPointerDown=${Recognizer} onPointerUp=${Recognizer}
      onPointerMove=${Recognizer} onPointerCancel=${Recognizer}
    />`;
}
/**** WAT_Shaper ****/
export function WAT_Shaper(PropSet) {
    const { Widget, onDragStart, onDragContinuation, onDragFinish, onDragCancellation, onShape } = PropSet;
    const GridWidth = acceptableValue(PropSet.GridWidth, ValueIsCardinal, 1);
    const GridHeight = acceptableValue(PropSet.GridHeight, ValueIsCardinal, 1);
    const PropsRef = useRef(null);
    PropsRef.current = {
        Widget, onDragStart, onDragContinuation, onDragFinish, onDragCancellation,
        onShape, GridWidth, GridHeight
    };
    const DragInfoRef = useRef(null);
    const DragInfo = DragInfoRef.current || (DragInfoRef.current = {});
    /**** Recognizer ****/
    const RecognizerRef = useRef(null);
    const Recognizer = RecognizerRef.current || (RecognizerRef.current = GestureRecognizer({
        onlyFrom: '.WAT.ShaperHandle',
        ClickRadius: 0,
        onDragStart: (dx, dy, x, y, Event) => {
            const { Widget, onDragStart } = PropsRef.current;
            if ((Widget == null) || (Widget.Page == null)) {
                return;
            }
            DragInfo.initialGeometry = Widget.Geometry;
            if (typeof onDragStart === 'function') {
                onDragStart(dx, dy, x, y, Event);
            }
            handleShapeChange(dx, dy);
        },
        onDragContinuation: (dx, dy, x, y, Event) => {
            const { onDragContinuation } = PropsRef.current;
            if (typeof onDragContinuation === 'function') {
                onDragContinuation(dx, dy, x, y, Event);
            }
            handleShapeChange(dx, dy);
        },
        onDragFinish: (dx, dy, x, y, Event) => {
            const { onDragFinish } = PropsRef.current;
            if (typeof onDragFinish === 'function') {
                onDragFinish(dx, dy, x, y, Event);
            }
            handleShapeChange(dx, dy);
        },
        onDragCancellation: (dx, dy, x, y, Event) => {
            const { onDragCancellation, onShape } = PropsRef.current;
            if (typeof onDragCancellation === 'function') {
                onDragCancellation(dx, dy, x, y, Event);
            }
            if (typeof onShape === 'function') { // restore original geometry
                const { initialGeometry } = DragInfo;
                onShape(initialGeometry.x, initialGeometry.y, initialGeometry.Width, initialGeometry.Height);
            }
        },
    }));
    /**** handleShapeChange ****/
    function handleShapeChange(dx, dy) {
        const { onShape, GridWidth, GridHeight } = PropsRef.current;
        if (typeof onShape !== 'function') {
            return;
        }
        const dxWest = Math.min(dx, DragInfo.initialGeometry.Width);
        const dyNorth = Math.min(dy, DragInfo.initialGeometry.Height);
        let dX = 0, dY = 0, dW = 0, dH = 0;
        switch (DragInfo.ShapeMode) {
            case 'nw':
                dX = dxWest;
                dW = -dX;
                dY = dyNorth;
                dH = -dY;
                break;
            case 'n':
                dY = dyNorth;
                dH = -dY;
                break;
            case 'ne':
                dW = dx;
                dY = dyNorth;
                dH = -dY;
                break;
            case 'e':
                dW = dx;
                break;
            case 'se':
                dW = dx;
                dH = dy;
                break;
            case 's':
                dH = dy;
                break;
            case 'sw':
                dX = dxWest;
                dW = -dX;
                dH = dy;
                break;
            case 'w':
                dX = dxWest;
                dW = -dX;
                break;
        }
        let Width = Math.max(0, DragInfo.initialGeometry.Width + dW);
        let Height = Math.max(0, DragInfo.initialGeometry.Height + dH);
        let xl = DragInfo.initialGeometry.x + dX, xr = xl + Width;
        let yt = DragInfo.initialGeometry.y + dY, yb = yt + Height;
        /**** snap-to-grid ****/
        let xl_ = GridWidth * Math.round(xl / GridWidth);
        let xr_ = GridWidth * Math.round(xr / GridWidth);
        let yt_ = GridHeight * Math.round(yt / GridHeight);
        let yb_ = GridHeight * Math.round(yb / GridHeight);
        switch (DragInfo.ShapeMode) {
            case 'nw':
                xl = Math.min(xl_, xr);
                yt = Math.min(yt_, yb);
                break;
            case 'n':
                yt = Math.min(yt_, yb);
                break;
            case 'ne':
                xr = Math.max(xl, xr_);
                yt = Math.min(yt_, yb);
                break;
            case 'e':
                xr = Math.max(xl, xr_);
                break;
            case 'se':
                xr = Math.max(xl, xr_);
                yb = Math.max(yt, yb_);
                break;
            case 's':
                yb = Math.max(yt, yb_);
                break;
            case 'sw':
                xl = Math.min(xl_, xr);
                yb = Math.max(yt, yb_);
                break;
            case 'w':
                xl = Math.min(xl_, xr);
                break;
        }
        onShape(xl, yt, xr - xl, yb - yt);
    }
    /**** handleShapeEvent (actually an event multiplexer) ****/
    function handleShapeEvent(Event, Mode) {
        DragInfo.ShapeMode = Mode;
        Recognizer(Event);
    }
    /**** actual rendering ****/
    const WidgetId = IdOfVisual(Widget);
    const Geometry = Widget.Geometry;
    return html `<div class="WAT Content Shaper">
      <${WAT_ShaperHandle} key=${WidgetId + 'nw'} Mode="nw" Geometry=${Geometry}
        onPointerEvent=${(Event) => handleShapeEvent(Event, 'nw')}/>
      <${WAT_ShaperHandle} key=${WidgetId + 'n'}  Mode="n"  Geometry=${Geometry}
        onPointerEvent=${(Event) => handleShapeEvent(Event, 'n')}/>
      <${WAT_ShaperHandle} key=${WidgetId + 'ne'} Mode="ne" Geometry=${Geometry}
        onPointerEvent=${(Event) => handleShapeEvent(Event, 'ne')}/>
      <${WAT_ShaperHandle} key=${WidgetId + 'e'}  Mode="e"  Geometry=${Geometry}
        onPointerEvent=${(Event) => handleShapeEvent(Event, 'e')}/>
      <${WAT_ShaperHandle} key=${WidgetId + 'se'} Mode="se" Geometry=${Geometry}
        onPointerEvent=${(Event) => handleShapeEvent(Event, 'se')}/>
      <${WAT_ShaperHandle} key=${WidgetId + 's'}  Mode="s"  Geometry=${Geometry}
        onPointerEvent=${(Event) => handleShapeEvent(Event, 's')}/>
      <${WAT_ShaperHandle} key=${WidgetId + 'sw'} Mode="sw" Geometry=${Geometry}
        onPointerEvent=${(Event) => handleShapeEvent(Event, 'sw')}/>
      <${WAT_ShaperHandle} key=${WidgetId + 'w'}  Mode="w"  Geometry=${Geometry}
        onPointerEvent=${(Event) => handleShapeEvent(Event, 'w')}/>
    </>`;
}
/**** WAT_ShaperHandle ****/
function WAT_ShaperHandle(PropSet) {
    let { Mode, Geometry, onPointerEvent } = PropSet, otherProps = __rest(PropSet, ["Mode", "Geometry", "onPointerEvent"]);
    let { Width, Height } = Geometry;
    const xl = -8, xm = Math.round(Width / 2) - 4, xr = Width;
    const yt = -8, ym = Math.round(Height / 2) - 4, yb = Height;
    let CSSGeometry, Cursor;
    switch (Mode) {
        case 'nw':
            CSSGeometry = `left:${xl}px; top:${yt}px;`;
            Cursor = 'nwse';
            break;
        case 'n':
            CSSGeometry = `left:${xm}px; top:${yt}px;`;
            Cursor = 'ns';
            break;
        case 'ne':
            CSSGeometry = `left:${xr}px; top:${yt}px;`;
            Cursor = 'nesw';
            break;
        case 'e':
            CSSGeometry = `left:${xr}px; top:${ym}px;`;
            Cursor = 'ew';
            break;
        case 'se':
            CSSGeometry = `left:${xr}px; top:${yb}px;`;
            Cursor = 'nwse';
            break;
        case 's':
            CSSGeometry = `left:${xm}px; top:${yb}px;`;
            Cursor = 'ns';
            break;
        case 'sw':
            CSSGeometry = `left:${xl}px; top:${yb}px;`;
            Cursor = 'nesw';
            break;
        case 'w':
            CSSGeometry = `left:${xl}px; top:${ym}px;`;
            Cursor = 'ew';
            break;
    }
    Cursor = 'cursor:' + Cursor + '-resize';
    return html `<div class="WAT ShaperHandle" style="${CSSGeometry} ${Cursor}" ...${otherProps}
      onPointerDown=${onPointerEvent} onPointerMove=${onPointerEvent}
      onPointerUp=${onPointerEvent} onPointerCancel=${onPointerEvent}
    />`;
} /**** WAT_Dragger ****/
export function WAT_Dragger(PropSet) {
    const { Widget, style, onDragStart, onDragContinuation, onDragFinish, onDragCancellation, onDrag } = PropSet;
    const DropMode = acceptableValue(PropSet.DropMode, (Value) => ValueIsOneOf(Value, ['touch', 'enclose']), 'enclose');
    const GridWidth = acceptableValue(PropSet.GridWidth, ValueIsCardinal, 1);
    const GridHeight = acceptableValue(PropSet.GridHeight, ValueIsCardinal, 1);
    const PropsRef = useRef(null);
    PropsRef.current = {
        Widget, onDragStart, onDragContinuation, onDragFinish, onDragCancellation,
        onDrag, DropMode, GridWidth, GridHeight
    };
    const DragInfoRef = useRef(null);
    const DragInfo = DragInfoRef.current || (DragInfoRef.current = {});
    /**** handleDrag ****/
    function handleDrag(dx, dy) {
        const { Widget, onDrag, DropMode, GridWidth, GridHeight } = PropsRef.current;
        if (typeof onDrag !== 'function') {
            return;
        }
        if ((Widget == null) || (Widget.Page == null)) {
            return;
        }
        let x = GridWidth * Math.round((DragInfo.StartX + dx) / GridWidth);
        let y = GridHeight * Math.round((DragInfo.StartY + dy) / GridHeight);
        onDrag(x - DragInfo.StartX, y - DragInfo.StartY, x, y);
        const xl = Widget.x;
        const xr = xl + Widget.Width;
        const yt = Widget.y;
        const yb = yt + Widget.Height;
        let CatcherList = Widget.Page.WidgetList.filter((Candidate) => {
            if (Widget === Candidate) {
                return false;
            }
            const { x, y, Width, Height } = Candidate.Geometry;
            if (DropMode === 'touch') {
                return (xl <= x + Width) && (xr >= x) && (yt <= y + Height) && (yb >= y);
            }
            else { // DropMode === 'enclose'
                return (xl >= x) && (xr <= x + Width) && (yt >= y) && (yb <= y + Height);
            }
        });
        let Catcher = CatcherList.find((Candidate) => {
            try {
                return (Candidate.on('drop-request')(Widget) === true);
            }
            catch (Signal) { /* nop - error is already set */ }
        });
        if (Catcher === DragInfo.Catcher) {
            return;
        }
        if (DragInfo.Catcher != null) {
            try {
                DragInfo.Catcher.on('droppable-left')(Widget);
            }
            catch (Signal) { /* nop - error is already set */ }
            try {
                Widget.on('catcher-left')(DragInfo.Catcher);
            }
            catch (Signal) { /* nop - error is already set */ }
        }
        DragInfo.Catcher = Catcher;
        if (Catcher != null) {
            try {
                Catcher.on('droppable-entered')(Widget);
            }
            catch (Signal) { /* nop - error is already set */ }
            try {
                Widget.on('catcher-entered')(Catcher);
            }
            catch (Signal) { /* nop - error is already set */ }
        }
    }
    /**** handleDrop ****/
    function handleDrop() {
        const { Widget } = PropsRef.current;
        if (DragInfo.Catcher != null) {
            // *C* NOTE: key "drop" is also used by file inputs with signature (Event,FileList) - handlers must discriminate
            try {
                DragInfo.Catcher.on('drop')(Widget);
            }
            catch (Signal) { /* nop - error is already set */ }
            try {
                Widget.on('dropped-on')(DragInfo.Catcher);
            }
            catch (Signal) { /* nop - error is already set */ }
            delete DragInfo.Catcher;
        }
    }
    /**** Recognizer ****/
    const RecognizerRef = useRef(null);
    const Recognizer = RecognizerRef.current || (RecognizerRef.current = GestureRecognizer({
        onlyFrom: '.WAT.Dragger',
        ClickRadius: 0,
        onDragStart: (dx, dy, x, y, Event) => {
            const { Widget, onDragStart } = PropsRef.current;
            DragInfo.StartX = (Widget == null ? 0 : Widget.x);
            DragInfo.StartY = (Widget == null ? 0 : Widget.y);
            if (typeof onDragStart === 'function') {
                onDragStart(dx, dy, x, y, Event);
            }
            handleDrag(dx, dy);
        },
        onDragContinuation: (dx, dy, x, y, Event) => {
            const { onDragContinuation } = PropsRef.current;
            if (typeof onDragContinuation === 'function') {
                onDragContinuation(dx, dy, x, y, Event);
            }
            handleDrag(dx, dy);
        },
        onDragFinish: (dx, dy, x, y, Event) => {
            const { onDragFinish } = PropsRef.current;
            if (typeof onDragFinish === 'function') {
                onDragFinish(dx, dy, x, y, Event);
            }
            handleDrag(dx, dy);
            handleDrop();
        },
        onDragCancellation: (dx, dy, x, y, Event) => {
            const { Widget, onDragCancellation, onDrag } = PropsRef.current;
            if (typeof onDragCancellation === 'function') {
                onDragCancellation(dx, dy, x, y, Event);
            }
            if (DragInfo.Catcher != null) {
                try {
                    DragInfo.Catcher.on('droppable-left')(Widget);
                }
                catch (Signal) { /* nop - error is already set */ }
                try {
                    Widget.on('catcher-left')(DragInfo.Catcher);
                }
                catch (Signal) { /* nop - error is already set */ }
                delete DragInfo.Catcher;
            }
            if (typeof onDrag === 'function') { // restore original geometry
                onDrag(0, 0, DragInfo.StartX, DragInfo.StartY);
            }
        },
    }));
    return html `<div class="WAT Dragger" style="${style || ''}"
      onPointerDown=${Recognizer} onPointerUp=${Recognizer}
      onPointerMove=${Recognizer} onPointerCancel=${Recognizer}
    />`;
}
//------------------------------------------------------------------------------
//--                                WAT_Visual                                --
//------------------------------------------------------------------------------
export class WAT_Visual {
    constructor(Behavior, Container) {
        Object.defineProperty(this, "_Container", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**** Behavior ****/
        Object.defineProperty(this, "_Behavior", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_normalizedBehavior", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**** Name ****/
        Object.defineProperty(this, "_Name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**** Synopsis ****/
        Object.defineProperty(this, "_Synopsis", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**** isReady ****/
        Object.defineProperty(this, "_isReady", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        /**** configurableProperties ****/
        Object.defineProperty(this, "_configurableProperties", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        /**** FontFamily - inheritable ****/
        Object.defineProperty(this, "_FontFamily", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**** FontSize - inheritable ****/
        Object.defineProperty(this, "_FontSize", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**** FontWeight - inheritable ****/
        Object.defineProperty(this, "_FontWeight", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**** FontStyle - inheritable ****/
        Object.defineProperty(this, "_FontStyle", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**** TextDecoration - not inheritable ****/
        Object.defineProperty(this, "_TextDecoration", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**** TextShadow - inheritable ****/
        Object.defineProperty(this, "_TextShadow", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**** TextAlignment - inheritable ****/
        Object.defineProperty(this, "_TextAlignment", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**** LineHeight - inheritable ****/
        Object.defineProperty(this, "_LineHeight", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**** ForegroundColor - inheritable ****/
        Object.defineProperty(this, "_ForegroundColor", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**** BackgroundColor - inheritable ****/
        Object.defineProperty(this, "_BackgroundColor", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**** BackgroundTexture - not inheritable ****/
        Object.defineProperty(this, "_BackgroundTexture", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**** hasBackground - not inheritable ****/
        Object.defineProperty(this, "_hasBackground", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        /**** Opacity - 0...100%, not inheritable ****/
        Object.defineProperty(this, "_Opacity", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**** Cursor - inheritable ****/
        Object.defineProperty(this, "_Cursor", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**** unobserved ****/
        // @ts-ignore TS2564 allow "_unobserved" to be assigned upon first use
        Object.defineProperty(this, "_unobserved", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**** observed ****/
        // @ts-ignore TS2564 allow "_observed" to be assigned upon first use
        Object.defineProperty(this, "_observed", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**** memoized ****/
        // @ts-ignore TS2564 allow "_memoized" to be assigned upon first use
        Object.defineProperty(this, "_memoized", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**** activeScript - is always treated as existing ****/
        Object.defineProperty(this, "_activeScript", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**** pendingScript - may be missing or may consist of white-space only ****/
        Object.defineProperty(this, "_pendingScript", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**** activateScript - even if underlying applet is not (yet) attached ****/
        Object.defineProperty(this, "_activationToken", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        /**** ScriptError (used by Designer) ****/
        Object.defineProperty(this, "_ScriptError", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**** Error - for internal use only ****/
        Object.defineProperty(this, "_ErrorReport", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**** on ****/
        Object.defineProperty(this, "_CallbackRegistry", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**** View ****/
        Object.defineProperty(this, "_View", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        allowBehavior('visual behavior', Behavior);
        this._Behavior = Behavior;
        this._normalizedBehavior = (Behavior == null ? undefined : Behavior.toLowerCase());
        this._Container = Container;
    }
    /**** Category - to be overwritten ****/
    // @ts-ignore TS2378 this getter throws
    get Category() { throwError('InternalError: "Category" has to be overwritten'); }
    set Category(_) { throwReadOnlyError('Category'); }
    get Behavior() { return this._Behavior; }
    set Behavior(_) { throwReadOnlyError('Behavior'); }
    /**** normalizedBehavior ****/
    get normalizedBehavior() { return this._normalizedBehavior; }
    set normalizedBehavior(_) { throwReadOnlyError('normalizedBehavior'); }
    get Name() { return this._Name; }
    set Name(newName) {
        if (ValueIsString(newName)) {
            newName = newName.trim();
            if (newName === '') {
                newName = undefined;
            }
        }
        allowName('WAT name', newName);
        if (this._Name !== newName) {
            this._Name = newName;
            this.rerender();
        }
    }
    /**** normalizedName ****/
    get normalizedName() {
        return (this._Name == null ? undefined : this._Name.toLowerCase());
    }
    set normalizedName(_) { throwReadOnlyError('normalizedName'); }
    /**** Applet ****/
    // @ts-ignore TS2378 this getter throws
    get Applet() { throwError('InternalError: "Applet" has to be overwritten'); }
    set Applet(_) { throwReadOnlyError('Applet'); }
    /**** Path - to be overwritten ****/
    // @ts-ignore TS2378 this getter throws
    get Path() { throwError('InternalError: "Path" has to be overwritten'); }
    set Path(_) { throwReadOnlyError('Path'); }
    /**** isAttached ****/
    // @ts-ignore TS2378 this getter throws
    get isAttached() { throwError('InternalError: "isAttached" has to be overwritten'); }
    set isAttached(_) { throwReadOnlyError('isAttached'); }
    get Synopsis() { return this._Synopsis; }
    set Synopsis(newSynopsis) {
        allowText('visual synopsis', newSynopsis);
        if ((newSynopsis != null) && (newSynopsis.trim() === '')) {
            newSynopsis = undefined;
        }
        if (this._Synopsis !== newSynopsis) {
            this._Synopsis = newSynopsis;
            this.rerender();
        }
    }
    get isReady() { return this._isReady; }
    set isReady(_) { throwReadOnlyError('isReady'); }
    get configurableProperties() {
        return this._configurableProperties.map((Descriptor) => (Object.assign({}, Descriptor)));
    }
    set configurableProperties(newProperties) {
        allowListSatisfying('configurable properties', newProperties, ValueIsPropertyDescriptor);
        if (newProperties == null) {
            newProperties = [];
        }
        const PropertySet = Object.create(null);
        newProperties = newProperties.filter((Descriptor) => {
            if (Descriptor.Name in PropertySet) {
                return false;
            }
            else {
                PropertySet[Descriptor.Name] = normalizedPropertyDescriptor(Descriptor);
                return true;
            }
        }).map((Descriptor) => PropertySet[Descriptor.Name]);
        if (ValuesDiffer(this._configurableProperties, newProperties)) {
            this._configurableProperties.forEach((Descriptor) => {
                if (Descriptor.AccessorsFor != null) {
                    delete this[Descriptor.Name];
                }
            });
            this._configurableProperties = newProperties;
            this._configurableProperties.forEach((Descriptor) => {
                if (Descriptor.AccessorsFor != null) {
                    installAccessorFor(this, Descriptor);
                }
            });
            this.rerender();
        }
    }
    /**** configurableProperty ****/
    configurableProperty(Name) {
        expectIdentifier('property identifier', Name);
        const DescriptorIndex = this._configurableProperties.findIndex((Descriptor) => Descriptor.Name === Name);
        if (DescriptorIndex < 0) {
            return undefined;
        }
        const Descriptor = Object.assign({}, this._configurableProperties[DescriptorIndex]);
        if (Descriptor.Hashmarks != null) {
            Descriptor.Hashmarks = Descriptor.Hashmarks.slice();
        }
        if (Descriptor.Suggestions != null) {
            Descriptor.Suggestions = Descriptor.Suggestions.slice();
        }
        if (Descriptor.ValueList != null) {
            Descriptor.ValueList = Descriptor.ValueList.slice();
        }
        return Descriptor;
    }
    /**** configure ****/
    configure(OptionSet) {
        expectPlainObject('options set', OptionSet);
        for (const Key in OptionSet) {
            if (Object.prototype.hasOwnProperty.call(OptionSet, Key)) {
                this[Key] = OptionSet[Key];
            }
        }
    }
    get FontFamily() {
        return (this._FontFamily == null
            ? this._Container == null ? undefined : this._Container.FontFamily
            : this._FontFamily);
    }
    set FontFamily(newFontFamily) {
        allowTextline('font family', newFontFamily);
        if ((newFontFamily || '').trim() === '') {
            newFontFamily = undefined;
        }
        if (this._FontFamily !== newFontFamily) {
            this._FontFamily = newFontFamily;
            this.rerender();
        }
    }
    get FontSize() {
        return (this._FontSize == null
            ? this._Container == null ? undefined : this._Container.FontSize
            : this._FontSize);
    }
    set FontSize(newFontSize) {
        allowOrdinal('font size', newFontSize);
        if (this._FontSize !== newFontSize) {
            this._FontSize = newFontSize;
            this.rerender();
        }
    }
    get FontWeight() {
        return (this._FontWeight == null
            ? this._Container == null ? undefined : this._Container.FontWeight
            : this._FontWeight);
    }
    set FontWeight(newFontWeight) {
        allowOneOf('font weight', newFontWeight, WAT_FontWeights);
        if (this._FontWeight !== newFontWeight) {
            this._FontWeight = newFontWeight;
            this.rerender();
        }
    }
    get FontStyle() {
        return (this._FontStyle == null
            ? this._Container == null ? undefined : this._Container.FontStyle
            : this._FontStyle);
    }
    set FontStyle(newFontStyle) {
        allowOneOf('font style', newFontStyle, WAT_FontStyles);
        if (this._FontStyle !== newFontStyle) {
            this._FontStyle = newFontStyle;
            this.rerender();
        }
    }
    get TextDecoration() {
        return (this._TextDecoration == null ? undefined : Object.assign({}, this._TextDecoration));
    }
    set TextDecoration(newTextDecoration) {
        allowTextDecoration('text decoration', newTextDecoration);
        // @ts-ignore TS2367 "newTextDecoration" may be "none"
        if (newTextDecoration === 'none') {
            newTextDecoration = { isActive: false, Line: 'none' };
        }
        if (ValuesDiffer(this._TextDecoration, newTextDecoration)) {
            if (newTextDecoration == null) {
                this._TextDecoration = undefined;
            }
            else {
                const { isActive, Line, Color, Style, Thickness } = newTextDecoration;
                this._TextDecoration = { isActive, Line, Color, Style, Thickness };
            }
            this.rerender();
        }
    }
    get TextShadow() {
        return (this._TextShadow == null
            ? this._Container == null ? undefined : this._Container.TextShadow
            : Object.assign({}, this._TextShadow));
    }
    set TextShadow(newTextShadow) {
        allowTextShadow('text shadow', newTextShadow);
        // @ts-ignore TS2367 "newTextShadow" may be "none"
        if (newTextShadow === 'none') {
            newTextShadow = { isActive: false, xOffset: 0, yOffset: 0, BlurRadius: 0, Color: 'transparent' };
        }
        if (ValuesDiffer(this._TextShadow, newTextShadow)) {
            if (newTextShadow == null) {
                this._TextShadow = undefined;
            }
            else {
                const { isActive, xOffset, yOffset, BlurRadius, Color } = newTextShadow;
                this._TextShadow = { isActive, xOffset, yOffset, BlurRadius, Color };
            }
            this.rerender();
        }
    }
    get TextAlignment() {
        return (this._TextAlignment == null
            ? this._Container == null ? undefined : this._Container.TextAlignment
            : this._TextAlignment);
    }
    set TextAlignment(newTextAlignment) {
        allowOneOf('text alignment', newTextAlignment, WAT_TextAlignments);
        if (this._TextAlignment !== newTextAlignment) {
            this._TextAlignment = newTextAlignment;
            this.rerender();
        }
    }
    get LineHeight() {
        return (this._LineHeight == null
            ? this._Container == null ? undefined : this._Container.LineHeight
            : this._LineHeight);
    }
    set LineHeight(newLineHeight) {
        allowOrdinal('line height', newLineHeight);
        if (this._LineHeight !== newLineHeight) {
            this._LineHeight = newLineHeight;
            this.rerender();
        }
    }
    get ForegroundColor() {
        return (this._ForegroundColor == null
            ? this._Container == null ? undefined : this._Container.ForegroundColor
            : this._ForegroundColor);
    }
    set ForegroundColor(newForegroundColor) {
        allowColor('foreground color', newForegroundColor);
        if (this._ForegroundColor !== newForegroundColor) {
            this._ForegroundColor = newForegroundColor;
            this.rerender();
        }
    }
    /**** Color - synonym for "ForegroundColor" ****/
    get Color() { return this.ForegroundColor; }
    set Color(newColor) { this.ForegroundColor = newColor; }
    get BackgroundColor() {
        return (this._BackgroundColor == null
            ? this._Container == null ? undefined : this._Container.BackgroundColor
            : this._BackgroundColor);
    }
    set BackgroundColor(newColor) {
        allowColor('background color', newColor);
        if (this._BackgroundColor !== newColor) {
            this._BackgroundColor = newColor;
            this.rerender();
        }
    }
    get BackgroundTexture() {
        return (this._BackgroundTexture == null
            ? undefined
            : Object.assign({}, this._BackgroundTexture));
    }
    set BackgroundTexture(newTexture) {
        allowBackgroundTexture('background texture', newTexture);
        // @ts-ignore TS2367 "newTexture" may be "none"
        if (newTexture === 'none') {
            newTexture = { isActive: false, ImageURL: 'about:blank', Mode: 'normal', xOffset: 0, yOffset: 0 };
        }
        if (ValuesDiffer(this._BackgroundTexture, newTexture)) {
            if (newTexture == null) {
                this._BackgroundTexture = undefined;
            }
            else {
                const { isActive, ImageURL, Mode, xOffset, yOffset } = newTexture;
                this._BackgroundTexture = { isActive, ImageURL, Mode, xOffset, yOffset };
            }
            this.rerender();
        }
    }
    get hasBackground() { return this._hasBackground; }
    set hasBackground(newSetting) {
        expectBoolean('background setting', newSetting);
        if (this._hasBackground !== newSetting) {
            this._hasBackground = newSetting;
            this.rerender();
        }
    }
    get Opacity() {
        return this._Opacity;
    }
    set Opacity(newOpacity) {
        allowIntegerInRange('opacity', newOpacity, 0, 100);
        if (this._Opacity !== newOpacity) {
            this._Opacity = newOpacity;
            this.rerender();
        }
    }
    get Cursor() {
        return (this._Cursor == null
            ? this._Container == null ? undefined : this._Container.Cursor
            : this._Cursor);
    }
    set Cursor(newCursor) {
        if ((newCursor || '').trim() === '') {
            newCursor = undefined;
        }
        allowOneOf('cursor name', newCursor, WAT_Cursors);
        if (this._Cursor !== newCursor) {
            this._Cursor = newCursor;
            this.rerender();
        }
    }
    /**** Overflows ****/
    // @ts-ignore TS2378 this getter throws
    get Overflows() { throwError('InternalError: "Overflows" has to be overwritten'); }
    // @ts-ignore TS2378 this getter throws
    set Overflows(_) { throwError('InternalError: "Overflows" has to be overwritten'); }
    get unobserved() {
        if (this._unobserved == null) {
            this._unobserved = {};
        }
        return this._unobserved;
    }
    set unobserved(_) { throwReadOnlyError('unobserved'); }
    get observed() {
        if (this._observed == null) {
            this._observed = observe({}, { deep: false });
        }
        return this._observed;
    }
    set observed(_) { throwReadOnlyError('observed'); }
    get memoized() {
        if (this._memoized == null) {
            this._memoized = {};
        }
        return this._memoized;
    }
    set memoized(_) { throwReadOnlyError('memoized'); }
    /**** Script ****/
    get Script() {
        return (this._pendingScript == null
            ? (this._activeScript || '')
            : this._pendingScript);
    }
    set Script(_) { throwReadOnlyError('Script'); }
    get activeScript() { return this._activeScript || ''; }
    set activeScript(_) { throwReadOnlyError('activeScript'); }
    get pendingScript() { return this._pendingScript; }
    set pendingScript(newScript) {
        allowText('script', newScript);
        if (this._pendingScript !== newScript) {
            this._pendingScript = newScript;
            this.rerender();
        }
    }
    async activateScript(Mode = 'catch-exception') {
        const activationToken = ++this._activationToken;
        let activeScript = (this._activeScript || '').trim();
        this._CallbackRegistry = undefined;
        unregisterAllReactiveFunctionsFrom(this);
        uninstallStylesheetForVisual(this); // new script may no longer install one
        /**** prepare for script execution ****/
        const isStale = () => (activationToken !== this._activationToken);
        // stale (i.e., overtaken) activation runs must not register anything
        const reactively = (reactiveFunction) => {
            expectFunction('reactive function', reactiveFunction);
            if (isStale()) {
                return;
            }
            // @ts-ignore TS2345 do not care about the specific signature of "reactiveFunction"
            registerReactiveFunctionIn(this, computed(() => {
                try {
                    const Result = reactiveFunction();
                    if (Result instanceof Promise) {
                        console.warn('started  tracking asynchronous reactive function');
                        Result.catch((Signal) => {
                            console.warn(`asynchronous reactive function failed`, Signal);
                            setErrorReport(this, {
                                Type: 'Reactivity Failure',
                                Sufferer: this, Message: '' + Signal, Cause: Signal
                            });
                        }).then(() => console.warn('finished tracking asynchronous reactive function'));
                    }
                }
                catch (Signal) {
                    console.warn('execution error in reactive function', Signal);
                    setErrorReport(this, {
                        Type: 'Reactivity Failure',
                        Sufferer: this, Message: '' + Signal, Cause: Signal
                    });
                }
            }));
        };
        const on = (CallbackName, ...ArgList) => ((ArgList.length > 0) && isStale() // guard registrations/deletions...
            ? noCallback // ...but keep the one-argument lookup
            // @ts-ignore TS2556 spreading preserves "arguments.length" for "on"
            : this.on(CallbackName, ...ArgList));
        const onOf = (CallbackName) => (...ArgList) => ((ArgList.length > 0) && isStale()
            ? noCallback
            // @ts-ignore TS2556 spreading preserves "arguments.length" for "on"
            : this.on(CallbackName, ...ArgList));
        const onReady = onOf('ready');
        const onRender = onOf('render');
        const onMount = onOf('mount');
        const onUpdate = onOf('update');
        const onUnmount = onOf('unmount');
        const onValueChange = onOf('Value');
        /**** run behavior script first ****/
        this._ErrorReport = undefined;
        const Applet = this.Applet;
        if (Applet == null) {
            if (Mode === 'rethrow-exception') {
                throwError('NotAttached: this visual is not attached');
            }
            setErrorReport(this, {
                Type: 'Script Execution Failure',
                Sufferer: this, Message: 'NotAttached: this visual is not attached',
                Cause: undefined
            });
            return;
        }
        const Category = this.Category;
        const Behavior = this.Behavior;
        if (Behavior != null) {
            // @ts-ignore TS7053 allow indexing
            const Registration = Applet._BehaviorPool[Category][Behavior.toLowerCase()];
            if (Registration == null) {
                missingBehavior(this);
            }
            else {
                const BehaviorIsNew = Registration.isNew || false;
                Registration.isNew = false; // only the first activation run sees it
                try {
                    await Registration.compiledScript.call(this, this, this, html, reactively, on, onReady, onRender, onMount, onUpdate, onUnmount, onValueChange, (Stylesheet) => {
                        if (!isStale()) {
                            installStylesheetForBehavior(Applet, Category, Behavior, Stylesheet);
                        }
                    }, BehaviorIsNew);
                    if (activationToken !== this._activationToken) {
                        return;
                    }
                }
                catch (Signal) {
                    if (activationToken !== this._activationToken) {
                        return;
                    }
                    console.warn('Behavior Execution Failure', Signal);
                    setErrorReport(this, {
                        Type: 'Behaviour Execution Failure',
                        Sufferer: this, Message: '' + Signal, Cause: Signal
                    });
                    if (Mode === 'rethrow-exception') {
                        throw Signal;
                    }
                    return;
                }
            }
            if (this._ErrorReport != null) {
                return;
            }
        }
        /**** compile and run the script ****/
        this._ScriptError = undefined; // only to be set by "applyPendingScript"
        let compiledScript;
        try {
            // @ts-ignore TS2351 AsyncFunction *is* constructible
            compiledScript = new AsyncFunction('me,my, html,reactively, ' +
                'on, onReady,onRender, onMount,onUpdate,onUnmount, onValueChange, ' +
                'installStylesheet,BehaviorIsNew', activeScript);
        }
        catch (Signal) {
            console.warn('Script Compilation Failure', Signal);
            setErrorReport(this, {
                Type: 'Script Compilation Failure',
                Sufferer: this, Message: '' + Signal, Cause: Signal
            });
            if (Mode === 'rethrow-exception') {
                throw Signal;
            }
            return;
        }
        try {
            await compiledScript.call(this, this, this, html, reactively, on, onReady, onRender, onMount, onUpdate, onUnmount, onValueChange, (Stylesheet) => {
                if (!isStale()) {
                    installStylesheetForVisual(this, Stylesheet);
                }
            }, false // Behavior.isNew
            );
            if (activationToken !== this._activationToken) {
                return;
            }
        }
        catch (Signal) {
            if (activationToken !== this._activationToken) {
                return;
            }
            console.warn('Script Execution Failure', Signal);
            setErrorReport(this, {
                Type: 'Script Execution Failure',
                Sufferer: this, Message: '' + Signal, Cause: Signal
            });
            if (Mode === 'rethrow-exception') {
                throw Signal;
            }
        }
        this.rerender();
    }
    /**** applyPendingScript - but only if it can be compiled ****/
    async applyPendingScript() {
        if (this._pendingScript == null) {
            return;
        }
        if (!this.isAttached) {
            return;
        } // consider attached applets only
        let activeScript = this._activeScript || '';
        let pendingScript = this._pendingScript || '';
        if (activeScript === pendingScript) {
            this._pendingScript = undefined;
            this._ScriptError = undefined;
            this.rerender();
            return;
        }
        if (pendingScript.trim() !== '') {
            let compiledScript; // try compiling pending script first
            try {
                // @ts-ignore TS2351 AsyncFunction *is* constructible
                compiledScript = new AsyncFunction('me,my, html,reactively, ' +
                    'on, onReady,onRender, onMount,onUpdate,onUnmount, onValueChange, ' +
                    'installStylesheet,BehaviorIsNew', pendingScript);
            }
            catch (Signal) {
                setScriptError(this, {
                    Type: 'Script Compilation Failure',
                    Sufferer: this, Message: '' + Signal, Cause: Signal
                });
                this.rerender();
                return;
            }
        }
        this._activeScript = pendingScript.replace(/^\s*\n/, '');
        this._pendingScript = undefined;
        this._ScriptError = undefined;
        this._isReady = false;
        try {
            await this.activateScript('rethrow-exception');
        }
        catch (Signal) {
            if (this._ErrorReport == null) {
                setScriptError(this, {
                    Type: 'Script Execution Failure',
                    Sufferer: this, Message: '' + Signal, Cause: Signal
                });
            }
            else {
                setScriptError(this, Object.assign({}, this._ErrorReport));
            }
            this.rerender();
            return;
        }
        this.rerender(); // just to be on the safe side, may be optimized away
        makeVisualReady(this);
        if (this.isReady && this.isMounted) {
            this.on('mount')();
        }
    } // wasn't invoked before because "isReady" was false
    get ScriptError() {
        return (this._ScriptError == null ? undefined : Object.assign({}, this._ScriptError));
    }
    set ScriptError(_) {
        throwReadOnlyError('ScriptError');
    }
    get ErrorReport() {
        return (this._ErrorReport == null ? undefined : Object.assign({}, this._ErrorReport));
    }
    set ErrorReport(_) {
        throwReadOnlyError('ErrorReport');
    }
    /**** isBroken ****/
    get isBroken() { return (this._ErrorReport != null); }
    set isBroken(_) { throwReadOnlyError('isBroken'); }
    on(CallbackName, newCallback) {
        var _a, _b;
        expectTextline('callback name', CallbackName);
        const normalizedCallbackName = CallbackName.toLowerCase();
        if (arguments.length === 1) {
            const registeredCallback = (_a = this._CallbackRegistry) === null || _a === void 0 ? void 0 : _a[normalizedCallbackName];
            return registeredCallback || noCallback;
        }
        else {
            allowFunction('callback', newCallback);
            if (newCallback == null) {
                if (this._CallbackRegistry != null) {
                    delete this._CallbackRegistry[normalizedCallbackName];
                }
            }
            else {
                if (this._CallbackRegistry == null) {
                    this._CallbackRegistry = Object.create(null);
                }
                // @ts-ignore TS2532 no, "this._CallbackRegistry" is no longer undefined
                this._CallbackRegistry[normalizedCallbackName] = this._Callback.bind(this, CallbackName, newCallback);
                if ( // handle a few special cases
                (normalizedCallbackName === 'ready') && this.isReady ||
                    (normalizedCallbackName === 'mount') && this.isReady && this.isMounted) {
                    // @ts-ignore TS2532 no, "this._CallbackRegistry" is no longer undefined
                    this._CallbackRegistry[normalizedCallbackName]();
                }
            }
            return ((_b = this._CallbackRegistry) === null || _b === void 0 ? void 0 : _b[normalizedCallbackName]) || noCallback;
        }
    }
    _Callback(CallbackName, Callback, ...ArgList) {
        try {
            let Result = Callback.apply(this, ArgList);
            if (Result instanceof Promise) {
                console.warn('started  tracking asynchronous callback ' + quoted(CallbackName));
                return Result.then((Value) => {
                    console.warn('finished tracking asynchronous callback ' + quoted(CallbackName));
                    return Value;
                }, (Signal) => {
                    console.warn(`asynchronous callback ${quoted(CallbackName)} failed`, Signal);
                    setErrorReport(this, {
                        Type: 'Callback Failure',
                        Sufferer: this, Message: '' + Signal, Cause: Signal
                    });
                    return undefined;
                });
            }
            return Result;
        }
        catch (Signal) {
            console.warn(`callback ${quoted(CallbackName)} failed`, Signal);
            setErrorReport(this, {
                Type: 'Callback Failure',
                Sufferer: this, Message: '' + Signal, Cause: Signal
            });
        }
    }
    /**** Renderer ****/
    get Renderer() {
        const Renderer = this.on('render');
        return (Renderer === noCallback ? undefined : Renderer);
    }
    set Renderer(newRenderer) {
        allowFunction('renderer', newRenderer);
        this.on('render', newRenderer);
        this.rerender();
    }
    /**** CSSStyle ****/
    get CSSStyle() {
        let CSSStyleList = [];
        const { FontFamily, FontSize, FontWeight, FontStyle, TextDecoration, TextShadow, TextAlignment, LineHeight, ForegroundColor, hasBackground, BackgroundColor, BackgroundTexture, Opacity, Cursor, Overflows, } = this;
        if (FontFamily != null) {
            CSSStyleList.push(`font-family:${FontFamily.replace(/[;{}\r\n]/g, '')}`);
        }
        if (FontSize != null) {
            CSSStyleList.push(`font-size:${FontSize}px`);
        }
        if (FontWeight != null) {
            CSSStyleList.push(`font-weight:${FontWeight}`);
        }
        if (FontStyle != null) {
            CSSStyleList.push(`font-style:${FontStyle}`);
        }
        if (TextDecoration != null) {
            if (TextDecoration.isActive) {
                CSSStyleList.push('text-decoration:' + TextDecoration.Line +
                    (TextDecoration.Color == null ? '' : ' ' + TextDecoration.Color) +
                    (TextDecoration.Style == null ? '' : ' ' + TextDecoration.Style) +
                    (TextDecoration.Thickness == null ? '' : ' ' + TextDecoration.Thickness + 'px'));
            }
            else {
                CSSStyleList.push('text-decoration:none');
            }
        }
        if (TextShadow != null) {
            if (TextShadow.isActive) {
                CSSStyleList.push('text-shadow:' +
                    TextShadow.xOffset + 'px ' + TextShadow.yOffset + 'px ' +
                    TextShadow.BlurRadius + 'px ' + TextShadow.Color);
            }
            else {
                CSSStyleList.push('text-shadow:none');
            }
        }
        if (TextAlignment != null) {
            CSSStyleList.push(`text-align:${TextAlignment}`);
        }
        if (LineHeight != null) {
            CSSStyleList.push(`line-height:${LineHeight}px`);
        }
        if (ForegroundColor != null) {
            CSSStyleList.push(`color:${ForegroundColor}`);
        }
        if (hasBackground) {
            if (BackgroundColor != null) {
                CSSStyleList.push(`background-color:${BackgroundColor}`);
            }
            if (BackgroundTexture != null) {
                const { isActive, ImageURL, Mode, xOffset, yOffset } = BackgroundTexture;
                let BackgroundSize = 'auto auto';
                switch (Mode) {
                    case 'normal': break;
                    case 'contain':
                    case 'cover':
                        BackgroundSize = BackgroundTexture.Mode;
                        break;
                    case 'fill':
                        BackgroundSize = '100% 100%';
                        break;
                    case 'tile':
                        BackgroundSize = 'auto auto';
                        break;
                }
                let BackgroundRepeat = (Mode === 'tile' ? 'repeat' : 'no-repeat');
                if (isActive) {
                    const escapedImageURL = ImageURL.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
                    CSSStyleList.push(`background-image:url("${escapedImageURL}")`, `background-position:${Math.round(xOffset)}px ${Math.round(yOffset)}px;` +
                        `background-size:${BackgroundSize}; background-repeat:${BackgroundRepeat}`);
                }
                else {
                    CSSStyleList.push('background-image:none');
                }
            }
        }
        if (Opacity != null) {
            CSSStyleList.push(`opacity:${Opacity / 100}`);
        }
        if (Cursor != null) {
            CSSStyleList.push(`cursor:${Cursor}`);
        }
        CSSStyleList.push(`overflow:${Overflows.join(' ')}`);
        return CSSStyleList.join(';') + ';';
    }
    set CSSStyle(_) { throwReadOnlyError('CSSStyle'); }
    get View() { return this._View; }
    set View(_) { throwReadOnlyError('View'); }
    /**** isMounted ****/
    get isMounted() { return (this._View != null); }
    set isMounted(_) { throwReadOnlyError('isMounted'); }
    /**** _serializeConfigurationInto ****/
    _serializeConfigurationInto(Serialization) {
        let serializableMemoized = undefined;
        if (this._memoized != null) { // test serializability of "memoized" as well
            for (const Key in this._memoized) { // ...but per entry: unserializable
                if (!this._memoized.hasOwnProperty(Key)) {
                    continue;
                } // entries...
                if (ValueIsSerializableValue(this._memoized[Key])) { // ...are just...
                    if (serializableMemoized == null) {
                        serializableMemoized = {};
                    }
                    serializableMemoized[Key] = this._memoized[Key]; // ...left out...
                }
                else { // ...with a warning...
                    console.warn('NotSerializable: cannot serialize entry ' + quoted(Key) +
                        ' of "memoized" in visual ' + quoted(this.Path) +
                        ' - this entry will be skipped');
                }
            }
        }
        /**** then perform the actual serialization ****/
        ;
        [
            'Behavior', 'Name', 'Synopsis',
            'FontFamily', 'FontSize', 'FontWeight', 'FontStyle',
            'TextDecoration', 'TextShadow', 'TextAlignment', 'LineHeight',
            'ForegroundColor', 'hasBackground', 'BackgroundColor', 'BackgroundTexture',
            'BorderWidths', 'BorderStyles', 'BorderColors', 'BorderRadii', 'BoxShadow',
            'Opacity', 'Overflows', 'Cursor',
            'activeScript', 'pendingScript',
        ].forEach((Name) => this._serializePropertyInto(Name, Serialization));
        if (serializableMemoized != null) {
            Serialization.memoized = structuredClone(serializableMemoized);
        }
    }
    /**** _deserializeConfigurationFrom ****/
    _deserializeConfigurationFrom(Serialization) {
        const deserializeProperty = (Name) => {
            if (Serialization[Name] != null) {
                try {
                    // @ts-ignore TS7053 allow "Visual" to be indexed
                    this[Name] = Serialization[Name]; // also validates the given value
                }
                catch (Signal) {
                    console.warn('DeserializationError: invalid value for property ' +
                        quoted(Name) + ' in visual ' + quoted(this.Path));
                }
            }
        };
        [
            /*'Behavior', */ 'Name', 'Synopsis',
            'FontFamily', 'FontSize', 'FontWeight', 'FontStyle',
            'TextDecoration', 'TextShadow', 'TextAlignment', 'LineHeight',
            'ForegroundColor', 'hasBackground', 'BackgroundColor', 'BackgroundTexture',
            'BorderWidths', 'BorderStyles', 'BorderColors', 'BorderRadii', 'BoxShadow',
            'Opacity', 'Overflows', 'Cursor',
            /*'activeScript',*/ 'pendingScript',
        ].forEach((Name) => deserializeProperty(Name));
        /**** migrate legacy "OverflowVisibility" serializations ****/
        if ((Serialization.Overflows == null) &&
            ('OverflowVisibility' in Serialization)) {
            try {
                this.Overflows = (Serialization.OverflowVisibility
                    ? (this.Category === 'page' // pages do not support "visible"
                        ? ['auto', 'auto'] : ['visible', 'visible'])
                    : ['hidden', 'hidden']);
            }
            catch (Signal) { /* nop - e.g., applets do not support "Overflows" */ }
        }
        if (ValueIsPlainObject(Serialization.memoized)) {
            try {
                Object.assign(this.memoized, structuredClone(Serialization.memoized));
            }
            catch (Signal) {
                console.warn('DeserializationError: invalid value for property "memoized" ' +
                    'in visual ' + quoted(this.Path), Signal);
            }
        }
        /**** "activeScript" needs special treatment ****/
        if (ValueIsText(Serialization.activeScript)) {
            this._activeScript = Serialization.activeScript;
        }
        this.activateScript(); // in "creation" order, i.e.,
        // pages and widgets will already be attached, applets may not
    } // and inner visuals may not yet (all) be present
    /**** _serializePropertyInto ****/
    _serializePropertyInto(Name, Serialization) {
        // @ts-ignore TS7053 allow "Visual" to be indexed
        if (this['_' + Name] != null) {
            Serialization[Name] = this[Name];
        }
    }
}
//------------------------------------------------------------------------------
//--                                WAT_Applet                                --
//------------------------------------------------------------------------------
export class WAT_Applet extends WAT_Visual {
    constructor(Behavior) {
        super(Behavior, undefined);
        Object.defineProperty(this, "_fullScreen", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        }); // used by the "WAT Applet Manager"
        Object.defineProperty(this, "_Width", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: -1
        }); // dto.
        Object.defineProperty(this, "_Height", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: -1
        }); // dto.
        /**** AssetsBase ****/
        Object.defineProperty(this, "_AssetsBase", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**** BehaviorSet ****/
        Object.defineProperty(this, "_BehaviorPool", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {
                applet: Object.create(null),
                page: Object.create(null),
                widget: Object.create(null),
            }
        });
        /**** minWidth ****/
        Object.defineProperty(this, "_minWidth", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: undefined
        });
        /**** maxWidth ****/
        Object.defineProperty(this, "_maxWidth", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: undefined
        });
        /**** minHeight ****/
        Object.defineProperty(this, "_minHeight", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: undefined
        });
        /**** maxHeight ****/
        Object.defineProperty(this, "_maxHeight", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: undefined
        });
        /**** toBeCentered ****/
        Object.defineProperty(this, "_toBeCentered", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: true
        });
        /**** withMobileFrame ****/
        Object.defineProperty(this, "_withMobileFrame", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        /**** expectedOrientation ****/
        Object.defineProperty(this, "_expectedOrientation", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'any'
        });
        /**** SnapToGrid ****/
        Object.defineProperty(this, "_SnapToGrid", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        /**** GridWidth ****/
        Object.defineProperty(this, "_GridWidth", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 10
        });
        /**** GridHeight ****/
        Object.defineProperty(this, "_GridHeight", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 10
        });
        /**** HeadExtensions ****/
        Object.defineProperty(this, "_HeadExtensions", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ''
        });
        /**** PageList ****/
        Object.defineProperty(this, "_PageList", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        /**** visitedPage ****/
        Object.defineProperty(this, "_visitedPage", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**** OverlayNamed ****/
        Object.defineProperty(this, "_OverlayList", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
    }
    /**** Category ****/
    get Category() { return 'applet'; }
    set Category(_) { throwReadOnlyError('Category'); }
    /**** Behavior ****/
    get Behavior() { return this._Behavior; }
    set Behavior(newBehavior) {
        var _a;
        allowBehavior('applet behavior', newBehavior);
        const normalizedBehavior = (newBehavior == null ? undefined : newBehavior.toLowerCase());
        if (this._normalizedBehavior !== normalizedBehavior) {
            this._normalizedBehavior = normalizedBehavior;
            // @ts-ignore TS7053 allow indexing
            this._Behavior = ((_a = this._BehaviorPool['applet'][normalizedBehavior]) === null || _a === void 0 ? void 0 : _a.Name) || newBehavior;
            this.activateScript();
            this.rerender();
        }
    }
    /**** Name ****/
    get Name() { return this._Name; }
    set Name(newName) { throwReadOnlyError('Name'); }
    /**** Applet ****/
    get Applet() { return this; }
    set Applet(_) { throwReadOnlyError('Applet'); }
    /**** Path - to be overwritten ****/
    get Path() { return '/'; }
    set Path(_) { throwReadOnlyError('Path'); }
    /**** isAttached ****/
    get isAttached() { return (this._View != null); }
    set isAttached(_) { throwReadOnlyError('isAttached'); }
    get AssetsBase() {
        return this._AssetsBase || 'https://rozek.github.io/webapp-tinkerer/';
    }
    // *C* "AssetsBase" is not serialized - a scripted setting does not survive a reload
    set AssetsBase(newURL) {
        allowURL('assets base URL', newURL);
        if (this._AssetsBase !== newURL) {
            this._AssetsBase = newURL;
            this.rerender();
        }
    }
    /**** AssetURL ****/
    AssetURL(relativeURL) {
        expectURL('asset URL', (relativeURL == null ? undefined : relativeURL + '/.')); // because AssetURL is incomplete
        const AssetsBase = this.AssetsBase.replace(/\/*$/, '/');
        switch (true) {
            case URLhasSchema(relativeURL):
                return relativeURL;
            case relativeURL.startsWith('/'):
                return AssetsBase + relativeURL.replace(/^\/+/, '');
            default: return AssetsBase + relativeURL;
        }
    }
    get BehaviorSet() {
        const Result = {
            applet: Object.create(null),
            page: Object.create(null),
            widget: Object.create(null),
        };
        for (const [Behavior, Registration] of Object.entries(this._BehaviorPool.applet)) {
            const { Category, Name, activeScript } = Registration;
            Result.applet[Behavior] = { Category, Name, activeScript };
        }
        for (const [Behavior, Registration] of Object.entries(this._BehaviorPool.page)) {
            const { Category, Name, activeScript } = Registration;
            Result.page[Behavior] = { Category, Name, activeScript };
        }
        for (const [Behavior, Registration] of Object.entries(this._BehaviorPool.widget)) {
            const { Category, Name, activeScript } = Registration;
            Result.widget[Behavior] = { Category, Name, activeScript };
        }
        return Result;
    }
    set BehaviorSet(_) { throwReadOnlyError('BehaviorSet'); }
    /**** BehaviorsOfCategory ****/
    BehaviorsOfCategory(Category) {
        expectCategory('behavior category', Category);
        // @ts-ignore TS7053 allow indexing
        return Object.keys(this._BehaviorPool[Category]);
    }
    /**** BehaviorOfCategory ****/
    BehaviorOfCategory(Category, Behavior) {
        expectCategory('behavior category', Category);
        expectBehavior('behavior name', Behavior);
        const normalizedBehavior = Behavior.toLowerCase();
        // @ts-ignore TS7053 allow indexing
        const Registration = this._BehaviorPool[Category][normalizedBehavior];
        if (Registration == null) {
            return undefined;
        }
        const { Name, activeScript } = Registration;
        return { Category, Name, activeScript };
    }
    /**** registerBehaviorOfCategory ****/
    registerBehaviorOfCategory(Category, Behavior, Script) {
        expectCategory('behavior category', Category);
        expectBehavior('behavior name', Behavior);
        expectText('behavior script', Script);
        const normalizedBehavior = Behavior.toLowerCase();
        if (BehaviorIsIntrinsic(normalizedBehavior))
            throwError('InvalidArgument: intrinsic behaviors must not be overwritten');
        try {
            // @ts-ignore TS2351 AsyncFunction *is* constructible
            const compiledScript = new AsyncFunction('me,my, html,reactively, ' +
                'on, onReady,onRender, onMount,onUpdate,onUnmount, onValueChange, ' +
                'installStylesheet,BehaviorIsNew', Script);
            // @ts-ignore TS7053 allow indexing
            this._BehaviorPool[Category][normalizedBehavior] = {
                Category, Name: Behavior, activeScript: Script, isNew: true,
                compiledScript, Error: undefined
            };
        }
        catch (Signal) {
            console.warn(`Script Compilation Failure for ${Category} behavior ${Behavior}`, Signal);
            // @ts-ignore TS7053 allow indexing
            this._BehaviorPool[Category][normalizedBehavior] = {
                Category, Name: Behavior, activeScript: Script, isNew: false,
                compiledScript: brokenBehavior, Error: Signal
            };
        }
        uninstallStylesheetForBehavior(this, Category, Behavior);
        switch (Category) {
            case 'applet':
                if (this._normalizedBehavior === normalizedBehavior) {
                    this.activateScript();
                }
                break;
            case 'page':
                this.PagesWithBehavior(Behavior).forEach((Page) => Page.activateScript());
                break;
            case 'widget':
                this.WidgetsWithBehavior(Behavior).forEach((Widget) => Widget.activateScript());
        }
    }
    /**** unregisterBehaviorOfCategory ****/
    unregisterBehaviorOfCategory(Category, Behavior) {
        expectCategory('behavior category', Category);
        expectBehavior('behavior name', Behavior);
        const normalizedBehavior = Behavior.toLowerCase();
        if (BehaviorIsIntrinsic(normalizedBehavior))
            throwError('InvalidArgument: intrinsic behaviors must not be unregistered');
        // @ts-ignore TS7053 allow indexing
        const Registration = this._BehaviorPool[Category][normalizedBehavior];
        if (Registration == null) {
            return undefined;
        }
        uninstallStylesheetForBehavior(this, Category, Behavior);
        // @ts-ignore TS7053 allow indexing
        delete this._BehaviorPool[Category][normalizedBehavior];
        switch (Category) {
            case 'applet':
                if (this._normalizedBehavior === normalizedBehavior) {
                    this.activateScript();
                }
                break;
            case 'page':
                this.PagesWithBehavior(Behavior).forEach((Page) => Page.activateScript());
                break;
            case 'widget':
                this.WidgetsWithBehavior(Behavior).forEach((Widget) => Widget.activateScript());
        }
    }
    /**** renameBehaviorOfCategory ****/
    renameBehaviorOfCategory(Category, oldName, newName) {
        expectCategory('behavior category', Category);
        expectBehavior('old behavior name', oldName);
        expectBehavior('new behavior name', newName);
        const normalizedOldName = oldName.toLowerCase();
        const normalizedNewName = newName.toLowerCase();
        if (BehaviorIsIntrinsic(normalizedOldName) || BehaviorIsIntrinsic(normalizedNewName))
            throwError('InvalidArgument: intrinsic behaviors must not be renamed');
        // @ts-ignore TS7053 allow indexing
        if (!(normalizedOldName in this._BehaviorPool[Category]))
            throwError(`InvalidArgument: no ${Category} behaviour ${quoted(oldName)} found`);
        if (newName === oldName) {
            return;
        }
        if (normalizedNewName === normalizedOldName) {
            // @ts-ignore TS7053 allow indexing
            this._BehaviorPool[Category][normalizedOldName].Name = newName;
            return;
        }
        // @ts-ignore TS7053 allow indexing
        if (normalizedNewName in this._BehaviorPool[Category])
            throwError(`NameCollision: a ${Category} behaviour ${quoted(newName)} already exists`);
        // @ts-ignore TS7053 allow indexing
        let Registration = this._BehaviorPool[Category][normalizedOldName];
        // @ts-ignore TS7053 allow indexing
        delete this._BehaviorPool[Category][normalizedOldName];
        Registration.Name = newName;
        Registration.isNew = true; // just to be safe (it could be important)
        // @ts-ignore TS7053 allow indexing
        this._BehaviorPool[Category][normalizedNewName] = Registration;
        uninstallStylesheetForBehavior(this, Category, oldName);
        switch (Category) {
            case 'applet':
                if (this._normalizedBehavior === normalizedOldName) {
                    this._Behavior = newName;
                    this._normalizedBehavior = normalizedNewName;
                    this.activateScript();
                }
                break;
            case 'page':
                this.PagesWithBehavior(oldName).forEach((Page) => {
                    Page['_Behavior'] = newName;
                    Page['_normalizedBehavior'] = normalizedNewName;
                    Page.activateScript();
                });
                break;
            case 'widget':
                this.WidgetsWithBehavior(oldName).forEach((Widget) => {
                    Widget['_Behavior'] = newName;
                    Widget['_normalizedBehavior'] = normalizedNewName;
                    Widget.activateScript();
                });
        }
        this.rerender();
    }
    /**** prescriptBehaviorOfCategory ****/
    prescriptBehaviorOfCategory(Category, Behavior, Script) {
        expectCategory('behavior category', Category);
        expectBehavior('behavior name', Behavior);
        expectText('behavior script', Script);
        const normalizedBehavior = Behavior.toLowerCase();
        // @ts-ignore TS7053 allow indexing
        const Registration = this._BehaviorPool[Category][normalizedBehavior];
        if (Registration == null)
            throwError(`InvalidArgument: no ${Category} behaviour ${quoted(Behavior)} found`);
        if (Registration.pendingScript !== Script) {
            Registration.pendingScript = Script;
        }
        this.rerender();
    }
    /**** rescriptBehaviorOfCategory ****/
    rescriptBehaviorOfCategory(Category, Behavior) {
        expectCategory('behavior category', Category);
        expectBehavior('behavior name', Behavior);
        const normalizedBehavior = Behavior.toLowerCase();
        // @ts-ignore TS7053 allow indexing
        const Registration = this._BehaviorPool[Category][normalizedBehavior];
        if (Registration == null)
            throwError(`InvalidArgument: no ${Category} behaviour ${quoted(Behavior)} found`);
        const { activeScript, pendingScript } = Registration;
        if (pendingScript == null) {
            return;
        }
        if (activeScript === pendingScript) {
            return;
        }
        try {
            // @ts-ignore TS7053 allow indexing
            this._BehaviorPool[Category][normalizedBehavior].pendingError = undefined;
            // @ts-ignore TS2351 AsyncFunction *is* constructible
            const compiledScript = new AsyncFunction('me,my, html,reactively, ' +
                'on, onReady,onRender, onMount,onUpdate,onUnmount, onValueChange, ' +
                'installStylesheet,BehaviorIsNew', pendingScript);
        }
        catch (Signal) {
            console.warn(`Script Compilation Failure for ${Category} behavior ${Behavior}`, Signal);
            // @ts-ignore TS7053 allow indexing
            this._BehaviorPool[Category][normalizedBehavior].pendingError = Signal;
            return;
        }
        this.registerBehaviorOfCategory(Category, Behavior, pendingScript);
        // the new registration has no "pendingScript" - which lets the guard
        // above return early upon the next invocation
        this.rerender();
    }
    /**** groupedBehaviorListOfCategory ****/
    groupedBehaviorListOfCategory(Category) {
        expectCategory('behavior category', Category);
        const groupedList = Object.create(null);
        // @ts-ignore TS7053 allow indexing
        Object.values(this._BehaviorPool[Category]).forEach((Behavior) => {
            const Name = Behavior.Name;
            const Prefix = Name.replace(/[.][^.]+$/, '');
            const Suffix = Name.replace(/^.*[.]/, '');
            if (!(Prefix in groupedList)) {
                groupedList[Prefix] = [];
            }
            groupedList[Prefix].push(Suffix);
        });
        return groupedList;
    }
    /**** PagesWithBehavior ****/
    PagesWithBehavior(Behavior) {
        expectBehavior('behavior name', Behavior);
        const normalizedBehavior = Behavior.toLowerCase();
        return this._PageList.filter((Page) => (Page.Behavior || '').toLowerCase() === normalizedBehavior);
    }
    /**** WidgetsWithBehavior ****/
    WidgetsWithBehavior(Behavior) {
        expectBehavior('behavior name', Behavior);
        const normalizedBehavior = Behavior.toLowerCase();
        return this._PageList.map((Page) => Page.WidgetList.filter((Widget) => (Widget.Behavior || '').toLowerCase() === normalizedBehavior)).flat();
    }
    /**** intrinsicBehaviorsOfCategory ****/
    intrinsicBehaviorsOfCategory(Category) {
        expectCategory('behavior category', Category);
        // @ts-ignore TS7053 allow indexing
        return Object.values(this._BehaviorPool[Category])
            .map((Registration) => Registration.Name)
            .filter((Name) => BehaviorIsIntrinsic(Name.toLowerCase()));
    }
    /**** extrinsicBehaviorsOfCategory ****/
    extrinsicBehaviorsOfCategory(Category) {
        expectCategory('behavior category', Category);
        // @ts-ignore TS7053 allow indexing
        return Object.values(this._BehaviorPool[Category])
            .map((Registration) => Registration.Name)
            .filter((Name) => !BehaviorIsIntrinsic(Name.toLowerCase()));
    }
    /**** missingBehaviorsOfCategory ****/
    missingBehaviorsOfCategory(Category) {
        expectCategory('behavior category', Category);
        const missingBehaviorSet = Object.create(null);
        switch (Category) {
            case 'applet':
                return ((this._Behavior == null) ||
                    (this._Behavior.toLowerCase() in this._BehaviorPool['applet'])
                    ? [] : [this._Behavior]);
            case 'page':
                this.PageList.forEach((Page) => {
                    if ((Page.Behavior != null) &&
                        !(Page.Behavior.toLowerCase() in this._BehaviorPool['page'])) {
                        missingBehaviorSet[Page.Behavior.toLowerCase()] = Page.Behavior;
                    }
                });
                break;
            case 'widget':
                this.PageList.forEach((Page) => {
                    Page.WidgetList.forEach((Widget) => {
                        if ((Widget.Behavior != null) &&
                            !(Widget.Behavior.toLowerCase() in this._BehaviorPool['widget'])) {
                            missingBehaviorSet[Widget.Behavior.toLowerCase()] = Widget.Behavior;
                        }
                    });
                });
        }
        return Object.values(missingBehaviorSet);
    }
    /**** brokenBehaviorsOfCategory ****/
    brokenBehaviorsOfCategory(Category) {
        expectCategory('behavior category', Category);
        const brokenBehaviors = [];
        // @ts-ignore TS7053 allow indexing
        Object.values(this._BehaviorPool[Category]).forEach((Registration) => {
            if (Registration.Error != null) {
                brokenBehaviors.push(Registration.Name);
            }
        });
        return brokenBehaviors;
    }
    /**** usedBehaviorsOfCategory ****/
    usedBehaviorsOfCategory(Category) {
        expectCategory('behavior category', Category);
        const usedBehaviorSet = Object.create(null);
        switch (Category) {
            case 'applet':
                return ((this._Behavior != null) &&
                    (this._Behavior.toLowerCase() in this._BehaviorPool['applet'])
                    ? [this._BehaviorPool['applet'][this._Behavior.toLowerCase()].Name] : []);
            case 'page':
                this.PageList.forEach((Page) => {
                    if ((Page.Behavior != null) &&
                        (Page.Behavior.toLowerCase() in this._BehaviorPool['page'])) {
                        usedBehaviorSet[Page.Behavior.toLowerCase()] = true;
                    }
                });
                return Object.keys(usedBehaviorSet).map((normalizedName) => this._BehaviorPool['page'][normalizedName].Name);
            case 'widget':
            default: // just to satisfy the compiler
                this.PageList.forEach((Page) => {
                    Page.WidgetList.forEach((Widget) => {
                        if ((Widget.Behavior != null) &&
                            (Widget.Behavior.toLowerCase() in this._BehaviorPool['widget'])) {
                            usedBehaviorSet[Widget.Behavior.toLowerCase()] = Widget.Behavior;
                        }
                    });
                });
                return Object.keys(usedBehaviorSet).map((normalizedName) => this._BehaviorPool['widget'][normalizedName].Name);
        }
    }
    /**** unusedBehaviorsOfCategory ****/
    unusedBehaviorsOfCategory(Category) {
        expectCategory('behavior category', Category);
        // @ts-ignore TS7053 allow indexing
        const usedBehaviorSet = Object.assign({}, this._BehaviorPool[Category]);
        switch (Category) {
            case 'applet':
                if (this._Behavior != null) {
                    delete usedBehaviorSet[this._Behavior.toLowerCase()];
                }
                break;
            case 'page':
                this.PageList.forEach((Page) => {
                    if (Page.Behavior != null) {
                        delete usedBehaviorSet[Page.Behavior.toLowerCase()];
                    }
                });
                break;
            case 'widget':
                this.PageList.forEach((Page) => {
                    Page.WidgetList.forEach((Widget) => {
                        if (Widget.Behavior != null) {
                            delete usedBehaviorSet[Widget.Behavior.toLowerCase()];
                        }
                    });
                });
        }
        return Object.values(usedBehaviorSet).map((Registration) => Registration.Name);
    }
    /**** BehaviorOfCategoryIsBroken ****/
    BehaviorOfCategoryIsBroken(Category, Behavior) {
        expectCategory('behavior category', Category);
        expectBehavior('behavior', Behavior);
        const normalizedBehavior = Behavior.toLowerCase();
        // @ts-ignore TS7053 allow indexing
        const Registration = this._BehaviorPool[Category][normalizedBehavior];
        return (Registration != null) && (Registration.Error != null);
    }
    /**** BehaviorOfCategoryIsUnused ****/
    BehaviorOfCategoryIsUnused(Category, Behavior) {
        expectCategory('behavior category', Category);
        expectBehavior('behavior', Behavior);
        const normalizedBehavior = Behavior.toLowerCase();
        // @ts-ignore TS7053 allow indexing
        const Registration = this._BehaviorPool[Category][normalizedBehavior];
        if (Registration == null)
            throwError(`InvalidArgument:no ${Category} behaviour named ${Behavior} found`);
        switch (Category) {
            case 'applet':
                return (this._normalizedBehavior !== normalizedBehavior);
            case 'page':
                return this.PageList.every((Page) => Page.normalizedBehavior !== normalizedBehavior);
            case 'widget':
                return this.PageList.every((Page) => Page.WidgetList.every((Widget) => Widget.normalizedBehavior !== normalizedBehavior));
        }
        return false; // just to satisfy the compiler
    }
    /**** SerializationOfBehavior ****/
    SerializationOfBehavior(Category, Behavior) {
        expectCategory('behavior category', Category);
        expectBehavior('behavior', Behavior);
        const normalizedBehavior = Behavior.toLowerCase();
        if (BehaviorIsIntrinsic(normalizedBehavior))
            throwError('InvalidArgument: intrinsic behaviors must not be serialized');
        // @ts-ignore TS7053 allow indexing
        const Registration = this._BehaviorPool[Category][normalizedBehavior];
        if (Registration == null)
            throwError(`InvalidArgument: no ${Category} behaviour ${quoted(Behavior)} found`);
        const { Name, activeScript } = Registration;
        return { BehaviorSet: { [Category]: {
                    [Name]: activeScript
                } } };
    }
    /**** SerializationOfBehavior ****/
    SerializationOfBehaviors(groupedBehaviorList) {
        expectPlainObject('grouped behavior list', groupedBehaviorList);
        const BehaviorSet = {};
        let SerializationIsEmpty = true;
        if ('applet' in groupedBehaviorList) {
            let AppletBehaviors = groupedBehaviorList['applet'];
            expectListSatisfying('list of applet behaviors', AppletBehaviors, ValueIsBehavior);
            AppletBehaviors = AppletBehaviors.filter((Behavior) => ((Behavior.toLowerCase() in this._BehaviorPool['applet']) &&
                !BehaviorIsIntrinsic(Behavior.toLowerCase())));
            if (AppletBehaviors.length > 0) {
                SerializationIsEmpty = false;
                const AppletBehaviorSet = BehaviorSet['applet'] = {};
                AppletBehaviors.forEach((Behavior) => {
                    let Registration = this._BehaviorPool['applet'][Behavior.toLowerCase()];
                    AppletBehaviorSet[Registration.Name] = Registration.activeScript;
                });
            }
        }
        if ('page' in groupedBehaviorList) {
            let PageBehaviors = groupedBehaviorList['page'];
            expectListSatisfying('list of page behaviors', PageBehaviors, ValueIsBehavior);
            PageBehaviors = PageBehaviors.filter((Behavior) => ((Behavior.toLowerCase() in this._BehaviorPool['page']) &&
                !BehaviorIsIntrinsic(Behavior.toLowerCase())));
            if (PageBehaviors.length > 0) {
                SerializationIsEmpty = false;
                const PageBehaviorSet = BehaviorSet['page'] = {};
                PageBehaviors.forEach((Behavior) => {
                    let Registration = this._BehaviorPool['page'][Behavior.toLowerCase()];
                    PageBehaviorSet[Registration.Name] = Registration.activeScript;
                });
            }
        }
        if ('widget' in groupedBehaviorList) {
            let WidgetBehaviors = groupedBehaviorList['widget'];
            expectListSatisfying('list of widget behaviors', WidgetBehaviors, ValueIsBehavior);
            WidgetBehaviors = WidgetBehaviors.filter((Behavior) => ((Behavior.toLowerCase() in this._BehaviorPool['widget']) &&
                !BehaviorIsIntrinsic(Behavior.toLowerCase())));
            if (WidgetBehaviors.length > 0) {
                SerializationIsEmpty = false;
                const WidgetBehaviorSet = BehaviorSet['widget'] = {};
                WidgetBehaviors.forEach((Behavior) => {
                    let Registration = this._BehaviorPool['widget'][Behavior.toLowerCase()];
                    WidgetBehaviorSet[Registration.Name] = Registration.activeScript;
                });
            }
        }
        return (SerializationIsEmpty ? undefined : { BehaviorSet });
    }
    /**** deserializeBehavior[s] ****/
    deserializeBehaviorsFrom(Serialization) {
        this._deserializeBehaviorsFrom(Serialization);
    }
    deserializeBehaviorFrom(Serialization) {
        this._deserializeBehaviorsFrom(Serialization);
    }
    /**** VisualWithElement ****/
    VisualWithElement(DOMElement) {
        let Candidate = undefined;
        if (this._View == null) {
            return undefined;
        }
        if (this._View.contains(DOMElement)) {
            Candidate = this;
        }
        const visitedPage = this._visitedPage;
        if ((visitedPage != null) && (visitedPage._View != null)) {
            if (visitedPage._View.contains(DOMElement)) {
                Candidate = visitedPage;
            }
            /**** scan all visible widgets on this page ****/
            visitedPage._WidgetList.filter((Widget) => Widget.isVisible && ((Widget._Pane == null) || (Widget._Pane === visitedPage))).forEach((Widget) => {
                if (Widget._View == null) {
                    return;
                }
                if (Widget._View.contains(DOMElement)) {
                    Candidate = Widget;
                }
                Widget._OverlayList.forEach((Overlay) => {
                    const SourceWidget = this.WidgetAtPath(Overlay.SourceWidgetPath);
                    if (SourceWidget == null) {
                        return;
                    }
                    /**** scan all widgets shown on this one's overlays ****/
                    const WidgetsToShow = (SourceWidget.normalizedBehavior === 'basic_controls.outline'
                        ? SourceWidget.bundledWidgets()
                        : [SourceWidget]).filter((Widget) => (Widget.isVisible && ((Widget._Pane == null) || (Widget._Pane === Overlay))));
                    WidgetsToShow.forEach((Widget) => {
                        if (Widget._View == null) {
                            return;
                        }
                        if (Widget._View.contains(DOMElement)) {
                            Candidate = Widget;
                        }
                    });
                });
            });
        }
        /**** scan all shown widgets on all currently open applet overlays ****/
        this._OverlayList.forEach((Overlay) => {
            if (Overlay._View == null) {
                return undefined;
            }
            const SourceWidget = this.WidgetAtPath(Overlay.SourceWidgetPath);
            if (SourceWidget == null) {
                return;
            }
            const WidgetsToShow = (SourceWidget.normalizedBehavior === 'basic_controls.outline'
                ? SourceWidget.bundledWidgets()
                : [SourceWidget]).filter((Widget) => (Widget.isVisible && ((Widget._Pane == null) || (Widget._Pane === Overlay))));
            WidgetsToShow.forEach((Widget) => {
                if (Widget._View == null) {
                    return;
                }
                if (Widget._View.contains(DOMElement)) {
                    Candidate = Widget;
                }
            });
        });
        return Candidate;
    }
    /**** WidgetsNamed ****/
    WidgetsNamed(NameSet) {
        expectPlainObject('widget name set', NameSet);
        const WidgetSet = {};
        for (const [PageName, NameList] of Object.entries(NameSet)) {
            const Page = this.existingPage(PageName); // may fail
            NameList.forEach((WidgetName) => {
                const Widget = Page.existingWidget(WidgetName); // may fail
                if (WidgetName in WidgetSet)
                    throwError(`NameCollision: a widget named ${quoted(WidgetName)} has already been picked`);
                WidgetSet[WidgetName] = Widget;
            });
        }
        return WidgetSet;
    }
    /**** namedWidgets ****/
    get namedWidgets() {
        const WidgetSet = {};
        this._PageList.forEach((Page) => {
            const namedWidgets = Page.namedWidgets;
            Object.assign(WidgetSet, namedWidgets);
        });
        return WidgetSet;
    }
    set namedWidgets(_) { throwReadOnlyError('namedWidgets'); }
    /**** uniqueWidgets ****/
    get uniqueWidgets() {
        const WidgetSet = {};
        this._PageList.forEach((Page) => {
            const uniqueWidgets = Page.uniqueWidgets;
            Object.assign(WidgetSet, uniqueWidgets);
        });
        return WidgetSet;
    }
    set uniqueWidgets(_) { throwReadOnlyError('uniqueWidgets'); }
    /**** configureWidgets ****/
    configureWidgets(OptionSet) {
        expectPlainObject('options set', OptionSet);
        for (const PageName in OptionSet) {
            if (OptionSet.hasOwnProperty(PageName)) {
                if (ValueIsName(PageName)) {
                    let Page = this.existingPage(PageName);
                    Page.configureWidgets(OptionSet[PageName]);
                }
                else {
                    throwError(`InvalidArgument: invalid page name ${quoted(PageName)}`);
                }
            }
        }
    }
    get minWidth() {
        return (this._minWidth == null ? 0 : this._minWidth);
    }
    set minWidth(_) {
        throwReadOnlyError('minWidth');
    }
    get maxWidth() {
        return this._maxWidth;
    }
    set maxWidth(_) {
        throwReadOnlyError('maxWidth');
    }
    get minHeight() {
        return (this._minHeight == null ? 0 : this._minHeight);
    }
    set minHeight(_) {
        throwReadOnlyError('minHeight');
    }
    get maxHeight() {
        return this._maxHeight;
    }
    set maxHeight(_) {
        throwReadOnlyError('maxHeight');
    }
    get toBeCentered() { return this._toBeCentered; }
    set toBeCentered(newSetting) {
        expectBoolean('viewport centering setting', newSetting);
        if (this._toBeCentered !== newSetting) {
            this._toBeCentered = newSetting;
            //      this.rerender()
        }
    }
    get withMobileFrame() { return this._withMobileFrame; }
    set withMobileFrame(newSetting) {
        expectBoolean('mobile frame setting', newSetting);
        if (this._withMobileFrame !== newSetting) {
            this._withMobileFrame = newSetting;
            //      this.rerender()
        }
    }
    get expectedOrientation() { return this._expectedOrientation; }
    set expectedOrientation(_) { throwReadOnlyError('expectedOrientation'); }
    /**** x/y ****/
    get x() { return this.Geometry.x; }
    set x(_) { throwReadOnlyError('x'); }
    get y() { return this.Geometry.y; }
    set y(_) { throwReadOnlyError('y'); }
    /**** Width/Height - independent of configured width/height limits ****/
    get Width() { return this.Geometry.Width; }
    set Width(_) { throwReadOnlyError('Width'); }
    get Height() { return this.Geometry.Height; }
    set Height(_) { throwReadOnlyError('Height'); }
    /**** Position ****/
    get Position() {
        let { x, y } = this.Geometry;
        return { x, y };
    }
    set Position(_) {
        throwReadOnlyError('Position');
    }
    /**** Size ****/
    get Size() {
        let { Width, Height } = this.Geometry;
        return { Width, Height };
    }
    set Size(_) {
        throwReadOnlyError('Size');
    }
    /**** Geometry ****/
    get Geometry() {
        let View = this._View;
        if (View == null)
            throwError('NotAttached: this applet is not attached');
        const Bounds = View.getBoundingClientRect();
        return {
            x: Bounds.left + window.scrollX, Width: View.offsetWidth,
            y: Bounds.top + window.scrollY, Height: View.offsetHeight
        };
    }
    set Geometry(_) { throwReadOnlyError('Geometry'); }
    /**** Overflows ****/
    get Overflows() { return ['hidden', 'hidden']; }
    set Overflows(_) { throwReadOnlyError('Overflows'); }
    get SnapToGrid() { return this._SnapToGrid; }
    set SnapToGrid(newSetting) {
        expectBoolean('snap-to-grid setting', newSetting);
        if (this._SnapToGrid !== newSetting) {
            this._SnapToGrid = newSetting;
            //      this.rerender()
        }
    }
    get GridWidth() { return this._GridWidth; }
    set GridWidth(newWidth) {
        expectCardinal('snap-to-grid width', newWidth);
        if (this._GridWidth !== newWidth) {
            this._GridWidth = newWidth;
            //      this.rerender()
        }
    }
    get GridHeight() { return this._GridHeight; }
    set GridHeight(newHeight) {
        expectCardinal('snap-to-grid height', newHeight);
        if (this._GridHeight !== newHeight) {
            this._GridHeight = newHeight;
            //      this.rerender()
        }
    }
    get HeadExtensions() { return this._HeadExtensions; }
    set HeadExtensions(newValue) {
        allowText('head extension', newValue);
        if (newValue == null) {
            newValue = '';
        }
        newValue = newValue.trim();
        if (this._HeadExtensions !== newValue) {
            this._HeadExtensions = newValue;
            //      this.rerender()                                   // no need to rerender
        }
    }
    /**** rerender ****/
    rerender(Visual) {
        if (this._View != null) {
            rerender();
        }
    }
    get PageList() { return this._PageList.slice(); }
    set PageList(_) { throwReadOnlyError('PageList'); }
    /**** PageCount ****/
    get PageCount() { return this._PageList.length; }
    set PageCount(_) { throwReadOnlyError('PageCount'); }
    /**** IndexOfPage ****/
    IndexOfPage(PageOrNameOrIndex) {
        const Page = this.Page(PageOrNameOrIndex);
        if (Page == null) {
            return -1;
        }
        return this._PageList.indexOf(Page);
    }
    /**** Page ****/
    Page(PageOrNameOrIndex) {
        expectValue('page, name or index', PageOrNameOrIndex);
        switch (true) {
            case ValueIsPage(PageOrNameOrIndex):
                const Page = PageOrNameOrIndex;
                // @ts-ignore TS2446 allow WAT_Applet to access a protected member of WAT_Page
                return (Page._Container === this ? Page : undefined);
            case ValueIsInteger(PageOrNameOrIndex):
                let Index = PageOrNameOrIndex;
                if (Index < 0) {
                    Index += this._PageList.length;
                }
                return this._PageList[Index];
            case ValueIsName(PageOrNameOrIndex):
                return this.PageNamed(PageOrNameOrIndex);
        }
        throwError('InvalidArgument: no valid page, page name or page index given');
    }
    /**** existingPage ****/
    existingPage(PageOrNameOrIndex) {
        let Page = this.Page(PageOrNameOrIndex);
        if (Page == null)
            throwError('PageNotFound: the desired page could not be found');
        return Page;
    }
    /**** PageNamed ****/
    PageNamed(Name) {
        expectName('WAT page name', Name);
        const normalizedName = Name.trim().toLowerCase();
        let Result = undefined;
        this._PageList.some((Page) => ((Page.normalizedName === normalizedName) && (Result = Page) // tricky
        ));
        return Result;
    }
    /**** PageAt ****/
    PageAt(Index) {
        expectInteger('WAT page index', Index);
        if (Index < 0) {
            Index += this._PageList.length;
        }
        return this._PageList[Index];
    }
    /**** hasPage ****/
    hasPage(PageOrNameOrIndex) {
        return (this.Page(PageOrNameOrIndex) != null);
    }
    /**** newPageAt ****/
    newPageAt(Behavior, Index) {
        return this.PageDeserializedAt({ Behavior: Behavior || null }, Index);
    }
    /**** PageDeserializedAt ****/
    PageDeserializedAt(Serialization, Index) {
        expectSerializableObject('page serialization', Serialization);
        allowInteger('page insertion index', Index);
        if (Index == null) {
            Index = this._PageList.length;
        }
        else {
            if (Index < 0) {
                Index += this._PageList.length;
            }
            Index = Math.max(0, Math.min(Index, this._PageList.length));
        }
        const Behavior = acceptableValue(Serialization.Behavior, ValueIsBehavior);
        let newPage = new WAT_Page(Behavior, this); // sets "isReady" to false
        this._PageList.splice(Index, 0, newPage);
        try {
            // @ts-ignore TS2446 allow WAT_Applet to access a protected member of WAT_Page
            newPage._deserializeConfigurationFrom(Serialization);
            // @ts-ignore TS2446 allow WAT_Applet to access a protected member of WAT_Page
            newPage._deserializeWidgetsFrom(Serialization);
        }
        catch (Signal) {
            this._PageList.splice(Index, 1);
            /**** fully release the now orphaned page and its widgets ****/
            // @ts-ignore TS2446 allow accessing protected member
            newPage._WidgetList.forEach((Widget) => {
                unregisterAllReactiveFunctionsFrom(Widget);
                uninstallStylesheetForVisual(Widget);
                // @ts-ignore TS2341 allow accessing private member
                Widget._activationToken = (Widget._activationToken || 0) + 1;
                // cancels any running script activation
                // @ts-ignore TS2446 allow accessing protected member
                Widget._Container = undefined;
            });
            unregisterAllReactiveFunctionsFrom(newPage);
            uninstallStylesheetForVisual(newPage);
            // @ts-ignore TS2341 allow accessing private member
            newPage._activationToken = (newPage._activationToken || 0) + 1;
            // cancels any running script activation
            // @ts-ignore TS2446 allow accessing protected member
            newPage._Container = undefined;
            throw Signal;
        }
        makeVisualReady(newPage);
        this.rerender();
        return newPage;
    }
    /**** DuplicateOfPageAt ****/
    DuplicateOfPageAt(Index) {
        expectInteger('page index', Index);
        const Page = this.existingPage(Index); // DRY
        return this.PageDeserializedAt(Page.Serialization, Page.Index + 1);
    }
    /**** mayShiftPageUp/Down ****/
    mayShiftPageUp(PageOrNameOrIndex) {
        const Page = this.existingPage(PageOrNameOrIndex);
        return (Page.Index > 0);
    }
    mayShiftPageDown(PageOrNameOrIndex) {
        const Page = this.existingPage(PageOrNameOrIndex);
        return (Page.Index < this._PageList.length - 1);
    }
    /**** shiftPageToTop/Up/Down/ToBottom ****/
    shiftPageToTop(PageOrNameOrIndex) {
        const Page = this.existingPage(PageOrNameOrIndex);
        this.shiftPageTo(Page, 0);
    }
    shiftPageUp(PageOrNameOrIndex) {
        const Page = this.existingPage(PageOrNameOrIndex);
        this.shiftPageTo(Page, Page.Index - 1);
    }
    shiftPageDown(PageOrNameOrIndex) {
        const Page = this.existingPage(PageOrNameOrIndex);
        this.shiftPageTo(Page, Page.Index + 1);
    }
    shiftPageToBottom(PageOrNameOrIndex) {
        const Page = this.existingPage(PageOrNameOrIndex);
        this.shiftPageTo(Page, this._PageList.length);
    }
    /**** shiftPageTo ****/
    shiftPageTo(PageOrNameOrIndex, newIndex) {
        const Page = this.existingPage(PageOrNameOrIndex);
        expectInteger('page insertion index', newIndex);
        if (newIndex < 0) {
            newIndex += this._PageList.length;
        }
        newIndex = Math.max(0, Math.min(newIndex, this._PageList.length));
        const oldIndex = this._PageList.indexOf(Page);
        if (oldIndex === newIndex) {
            return;
        }
        this._PageList.splice(oldIndex, 1);
        this._PageList.splice(newIndex, 0, Page);
        this.rerender();
    }
    /**** shiftPagesTo (for Designer only, less strict argument validations) ****/
    shiftPagesTo(PageList, newIndexList) {
        const IndexSet = [];
        newIndexList.forEach((Index, i) => {
            if (this._PageList.indexOf(PageList[i]) >= 0) {
                IndexSet[Index] = PageList[i];
            }
        });
        newIndexList = newIndexList.slice().sort((a, b) => a - b);
        PageList.forEach((Page) => {
            const Index = this._PageList.indexOf(Page);
            if (Index >= 0) {
                this._PageList.splice(Index, 1);
            }
        });
        newIndexList.forEach((newIndex) => {
            if (IndexSet[newIndex] != null) {
                this._PageList.splice(newIndex, 0, IndexSet[newIndex]);
                // @ts-ignore TS2322 allow "undefined" to prevent duplicate insertions
                IndexSet[newIndex] = undefined;
            }
        });
        this.rerender();
    }
    /**** destroyPage ****/
    destroyPage(PageOrNameOrIndex) {
        const Page = this.Page(PageOrNameOrIndex);
        if (Page == null) {
            if (ValueIsPage(PageOrNameOrIndex))
                throwError('NoSuchPage: the given page could not be found');
            return;
        }
        // @ts-ignore TS2446 allow accessing protected member
        Page._WidgetList.forEach((Widget) => {
            unregisterAllReactiveFunctionsFrom(Widget);
            uninstallStylesheetForVisual(Widget);
            // @ts-ignore TS2341 allow accessing private member
            Widget._activationToken = (Widget._activationToken || 0) + 1;
            // cancels any running script activation
            // @ts-ignore TS2446 allow accessing protected member
            Widget._Container = undefined;
        });
        unregisterAllReactiveFunctionsFrom(Page);
        uninstallStylesheetForVisual(Page);
        // @ts-ignore TS2341 allow accessing private member
        Page._activationToken = (Page._activationToken || 0) + 1;
        // cancels any running script activation
        const oldIndex = this._PageList.indexOf(Page);
        this._PageList.splice(oldIndex, 1);
        // @ts-ignore TS2446 allow accessing protected member
        Page._Container = undefined;
        if (this._visitedPage === Page) {
            this._visitedPage = this._PageList[0];
        }
        this.rerender();
    }
    /**** clear ****/
    clear() {
        this.closeAllOverlays();
        this._PageList.forEach((Page) => {
            // @ts-ignore TS2446 allow accessing protected member
            Page._WidgetList.forEach((Widget) => {
                unregisterAllReactiveFunctionsFrom(Widget);
                uninstallStylesheetForVisual(Widget);
                // @ts-ignore TS2341 allow accessing private member
                Widget._activationToken = (Widget._activationToken || 0) + 1;
                // cancels any running script activation
                // @ts-ignore TS2446 allow accessing protected member
                Widget._Container = undefined;
            });
            unregisterAllReactiveFunctionsFrom(Page);
            uninstallStylesheetForVisual(Page);
            // @ts-ignore TS2341 allow accessing private member
            Page._activationToken = (Page._activationToken || 0) + 1;
            // cancels any running script activation
            // @ts-ignore TS2446 allow accessing protected member
            Page._Container = undefined;
        });
        this._PageList.length = 0;
        this._visitedPage = undefined;
        this.rerender();
    }
    get visitedPage() { return this._visitedPage; }
    set visitedPage(_) { throwReadOnlyError('visitedPage'); }
    /**** visitPage ****/
    visitPage(PageOrNameOrIndex) {
        let Page;
        if (PageOrNameOrIndex != null) {
            Page = this.existingPage(PageOrNameOrIndex);
        }
        if (Page == null) {
            Page = this._PageList[0];
        }
        if (Page != this._visitedPage) {
            this._visitedPage = Page;
            this.rerender();
            return;
        }
    }
    /**** WidgetAtPath ****/
    WidgetAtPath(Path) {
        expectPath('widget path', Path);
        const PathItemList = Path.replace(/\/\/+/g, '/').replace(/^\//, '')
            .split('/').map((PathItem) => {
            if (/^#\d+$/.test(PathItem.trim())) {
                return parseInt(PathItem.trim().slice(1), 10);
            }
            else {
                return PathItem;
            }
        });
        switch (PathItemList.length) {
            case 0: throwError('InvalidArgument: empty widget path given');
            case 1: throwError('InvalidArgument: incomplete widget path given');
            case 2: break;
            default: throwError('InvalidArgument: invalid widget path given');
        }
        const Page = this.Page(PathItemList[0]);
        if (Page == null) {
            return undefined;
        }
        return Page.Widget(PathItemList[1]);
    }
    OverlayNamed(OverlayName) {
        const OverlayIndex = this.IndexOfOverlay(OverlayName);
        return this._OverlayList[OverlayIndex]; // even if OverlayIndex = -1
    }
    /**** existingOverlayNamed ****/
    existingOverlayNamed(OverlayName) {
        const OverlayIndex = this.IndexOfOverlay(OverlayName);
        if (OverlayIndex < 0)
            throwError(`NotFound: no overlay named ${quoted(OverlayName)} found`);
        return this._OverlayList[OverlayIndex];
    }
    /**** IndexOfOverlay ****/
    IndexOfOverlay(OverlayName) {
        expectName('overlay name', OverlayName);
        const normalizedName = OverlayName.toLowerCase();
        return this._OverlayList.findIndex((Overlay) => Overlay.normalizedName === normalizedName);
    }
    /**** openOverlay ****/
    openOverlay(Descriptor) {
        if (this.OverlayIsOpen(Descriptor.Name))
            throwError(`AlreadyOpen: an overlay named ${quoted(Descriptor.Name)} is already open`);
        const Overlay = new WAT_AppletOverlay(this, Descriptor);
        this._OverlayList.push(Overlay);
        this.rerender();
        if (Overlay.onOpen != null) {
            Overlay.onOpen(Overlay);
        }
    }
    /**** closeOverlay ****/
    closeOverlay(OverlayName) {
        const OverlayIndex = this.IndexOfOverlay(OverlayName);
        if (OverlayIndex < 0) {
            return;
        }
        const [Overlay] = this._OverlayList.splice(OverlayIndex, 1);
        // @ts-ignore TS2445 I know, it's a hack, but allow access to protected members here
        if (Overlay._View != null) {
            Overlay._View._releaseWidgets();
        }
        this.rerender();
        if (Overlay.onClose != null) {
            Overlay.onClose(Overlay);
        }
    }
    /**** closeAllOverlays ****/
    closeAllOverlays() {
        if (this._OverlayList.length > 0) {
            this._OverlayList.slice().forEach((Overlay) => this.closeOverlay(Overlay.Name));
        }
    }
    /**** OverlayIsOpen ****/
    OverlayIsOpen(OverlayName) {
        return (this.OverlayNamed(OverlayName) != null);
    }
    /**** openOverlays ****/
    openOverlays() {
        return this._OverlayList.map((Overlay) => Overlay.Name);
    }
    /**** GeometryOfOverlay ****/
    GeometryOfOverlay(OverlayName) {
        const Overlay = this.existingOverlayNamed(OverlayName);
        const { x, y, Width, Height } = Overlay;
        // @ts-ignore TS2322 "x" and "y2 are no longer undefined here
        return { x, y, Width, Height };
    }
    /**** moveOverlayBy ****/
    moveOverlayBy(OverlayName, dx, dy) {
        const Overlay = this.existingOverlayNamed(OverlayName);
        expectNumber('dx', dx);
        expectNumber('dy', dy);
        // @ts-ignore TS2322 "x" and "y2 are no longer undefined here
        this.moveOverlayTo(OverlayName, Overlay.x + dx, Overlay.y + dy); // DRY
    }
    /**** moveOverlayTo ****/
    moveOverlayTo(OverlayName, x, y) {
        const Overlay = this.existingOverlayNamed(OverlayName);
        expectLocation('x coordinate', x);
        expectLocation('y coordinate', y);
        Overlay.x = x;
        Overlay.y = y;
        this.rerender();
    }
    /**** sizeOverlayBy ****/
    sizeOverlayBy(OverlayName, dW, dH) {
        const Overlay = this.existingOverlayNamed(OverlayName);
        expectNumber('dW', dW);
        expectNumber('dH', dH);
        this.sizeOverlayTo(OverlayName, Overlay.Width + dW, Overlay.Height + dH); // DRY
    }
    /**** sizeOverlayTo ****/
    sizeOverlayTo(OverlayName, Width, Height) {
        const Overlay = this.existingOverlayNamed(OverlayName);
        expectDimension('Width', Width);
        expectDimension('Height', Height);
        Overlay.Width = Math.max(Overlay.minWidth || 0, Math.min(Width, Overlay.maxWidth || Infinity));
        Overlay.Height = Math.max(Overlay.minHeight || 0, Math.min(Height, Overlay.maxHeight || Infinity));
        this.rerender();
    }
    /**** bringOverlayToFront ****/
    bringOverlayToFront(OverlayName) {
        const Index = this.IndexOfOverlay(OverlayName);
        if (Index < 0)
            throwError(`NotFound: no overlay named ${quoted(OverlayName)} found`);
        const [Overlay] = this._OverlayList.splice(Index, 1);
        this._OverlayList.push(Overlay);
        this.rerender();
    }
    /**** openDialog ****/
    openDialog(Descriptor) {
        if (this.OverlayIsOpen(Descriptor.Name))
            throwError(`AlreadyOpen: an overlay named ${quoted(Descriptor.Name)} is already open`);
        const Dialog = new WAT_Dialog(this, Descriptor);
        this._OverlayList.push(Dialog);
        this.rerender();
        if (Dialog.onOpen != null) {
            Dialog.onOpen(Dialog);
        }
    }
    /**** closeDialog ****/
    closeDialog(OverlayName) {
        this.closeOverlay(OverlayName);
    }
    /**** DialogIsOpen ****/
    DialogIsOpen(OverlayName) {
        return this.OverlayIsOpen(OverlayName);
    }
    /**** Serialization ****/
    get Serialization() {
        const Result = {};
        this._serializeBehaviorsInto(Result);
        this._serializeConfigurationInto(Result);
        this._serializePagesInto(Result);
        return Result;
    }
    set Serialization(_) { throwReadOnlyError('Serialization'); }
    /**** _serializeBehaviorsInto ****/
    _serializeBehaviorsInto(Serialization) {
        const BehaviorPool = this._BehaviorPool;
        // the pool (unlike "this.BehaviorSet") still contains "pendingScript"s
        const serializedBehavior = (Registration) => {
            const { activeScript, pendingScript } = Registration;
            return ((pendingScript == null) || // keeps the old (and compact) format
                (pendingScript === activeScript) // whenever possible
                ? activeScript
                : { activeScript, pendingScript });
        };
        Serialization.BehaviorSet = { applet: {}, page: {}, widget: {} };
        Object.keys(BehaviorPool.applet).forEach((normalizedBehavior) => {
            if (!BehaviorIsIntrinsic(normalizedBehavior)) {
                const Registration = BehaviorPool.applet[normalizedBehavior];
                // @ts-ignore TS18047 Serialization.BehaviorSet is not null
                Serialization.BehaviorSet.applet[Registration.Name] = serializedBehavior(Registration);
            }
        });
        Object.keys(BehaviorPool.page).forEach((normalizedBehavior) => {
            if (!BehaviorIsIntrinsic(normalizedBehavior)) {
                const Registration = BehaviorPool.page[normalizedBehavior];
                // @ts-ignore TS18047 Serialization.BehaviorSet is not null
                Serialization.BehaviorSet.page[Registration.Name] = serializedBehavior(Registration);
            }
        });
        Object.keys(BehaviorPool.widget).forEach((normalizedBehavior) => {
            if (!BehaviorIsIntrinsic(normalizedBehavior)) {
                const Registration = BehaviorPool.widget[normalizedBehavior];
                // @ts-ignore TS18047 Serialization.BehaviorSet is not null
                Serialization.BehaviorSet.widget[Registration.Name] = serializedBehavior(Registration);
            }
        });
        return;
    }
    /**** _deserializeBehaviorsFrom ****/
    _deserializeBehaviorsFrom(Serialization) {
        const BehaviorSet = Serialization.BehaviorSet;
        if (!ValueIsPlainObject(BehaviorSet)) {
            return;
        }
        const ScriptsOf = (SerializedBehavior) => (ValueIsPlainObject(SerializedBehavior)
            ? SerializedBehavior // new format (w/ object)
            : { activeScript: SerializedBehavior } // old format (w/ string)
        );
        // @ts-ignore TS18047 BehaviorSet is not null
        const AppletBehaviorSet = BehaviorSet['applet'];
        if (ValueIsPlainObject(AppletBehaviorSet)) {
            Object.entries(AppletBehaviorSet).forEach(([Name, Script]) => {
                const { activeScript, pendingScript } = ScriptsOf(Script);
                if (ValueIsBehavior(Name) && ValueIsText(activeScript)) {
                    try {
                        this.registerBehaviorOfCategory('applet', Name, activeScript);
                        if (ValueIsText(pendingScript)) {
                            this._BehaviorPool.applet[Name.toLowerCase()].pendingScript = pendingScript;
                        }
                    }
                    catch (Signal) {
                        console.warn(`could not register applet behavior ${quoted(Name)}`, Signal);
                    }
                }
            });
        }
        // @ts-ignore TS18047 BehaviorSet is not null
        const PageBehaviorSet = BehaviorSet['page'];
        if (ValueIsPlainObject(PageBehaviorSet)) {
            Object.entries(PageBehaviorSet).forEach(([Name, Script]) => {
                const { activeScript, pendingScript } = ScriptsOf(Script);
                if (ValueIsBehavior(Name) && ValueIsText(activeScript)) {
                    try {
                        this.registerBehaviorOfCategory('page', Name, activeScript);
                        if (ValueIsText(pendingScript)) {
                            this._BehaviorPool.page[Name.toLowerCase()].pendingScript = pendingScript;
                        }
                    }
                    catch (Signal) {
                        console.warn(`could not register page behavior ${quoted(Name)}`, Signal);
                    }
                }
            });
        }
        // @ts-ignore TS18047 BehaviorSet is not null
        const WidgetBehaviorSet = BehaviorSet['widget'];
        if (ValueIsPlainObject(WidgetBehaviorSet)) {
            Object.entries(WidgetBehaviorSet).forEach(([Name, Script]) => {
                const { activeScript, pendingScript } = ScriptsOf(Script);
                if (ValueIsBehavior(Name) && ValueIsText(activeScript)) {
                    try {
                        this.registerBehaviorOfCategory('widget', Name, activeScript);
                        if (ValueIsText(pendingScript)) {
                            this._BehaviorPool.widget[Name.toLowerCase()].pendingScript = pendingScript;
                        }
                    }
                    catch (Signal) {
                        console.warn(`could not register widget behavior ${quoted(Name)}`, Signal);
                    }
                }
            });
        }
    }
    /**** _serializePagesInto ****/
    _serializePagesInto(Serialization) {
        const PageList = this._PageList;
        //    if (PageList.length > 0) {              // always serialize the "PageList"
        Serialization.PageList = PageList.map((Page) => Page.Serialization);
        //    } // presence of "PageList" is important to recognize applet serialization
    }
    /**** _deserializePagesFrom ****/
    _deserializePagesFrom(Serialization) {
        if (Serialization.PageList == null) {
            return;
        }
        const PageList = this._PageList;
        if (PageList.length > 0) {
            this.clear();
        }
        if (!ValueIsList(Serialization.PageList)) {
            console.warn('DeserializationError: invalid "PageList"');
            return;
        }
        ;
        Serialization.PageList.forEach((PageSerialization, Index) => {
            if (!ValueIsPlainObject(PageSerialization)) {
                console.warn('DeserializationError: invalid "PageList" entry #' + Index);
                return;
            }
            this.PageDeserializedAt(PageSerialization, Index);
        } // also activates the scripts of all pages and their widgets
        );
    }
    /**** _serializeConfigurationInto ****/
    _serializeConfigurationInto(Serialization) {
        super._serializeConfigurationInto(Serialization);
        [
            'Name',
            'SnapToGrid', 'GridWidth', 'GridHeight',
            'HeadExtensions',
        ].forEach((Name) => this._serializePropertyInto(Name, Serialization));
        /**** "activeScript" needs special treatment ****/
        // @ts-ignore TS2339 if it exists "Serialization.activeScript" is a string
        if ((Serialization.activeScript || '').trim() === '') {
            delete Serialization.activeScript;
        }
        /**** additional properties used by the "WAT Applet Manager" ****/
        // *C* "Width"/"Height" are write-only for the applet manager - they are never deserialized
        if (this._View != null) { // "Width" and "Height" require an attached applet
            this._serializePropertyInto('Width', Serialization);
            this._serializePropertyInto('Height', Serialization);
        }
        ;
        [
            'minWidth', 'minHeight', 'maxWidth', 'maxHeight',
            'toBeCentered', 'withMobileFrame', 'expectedOrientation',
        ].forEach((Name) => this._serializePropertyInto(Name, Serialization));
    }
    /**** _deserializeConfigurationFrom ****/
    _deserializeConfigurationFrom(Serialization) {
        const deserializeProperty = (Name) => {
            if (Serialization[Name] != null) {
                try {
                    // @ts-ignore TS7053 allow "Applet" to be indexed
                    this[Name] = Serialization[Name]; // also validates the given value
                }
                catch (Signal) {
                    console.warn('DeserializationError: invalid value for applet property ' + quoted(Name));
                }
            }
        };
        [
            'SnapToGrid', 'GridWidth', 'GridHeight',
            'HeadExtensions',
        ].forEach((Name) => deserializeProperty(Name));
        /**** additional properties used by the "WAT Applet Manager" ****/
        if (ValueIsBoolean(Serialization.toBeCentered)) {
            this._toBeCentered = Serialization.toBeCentered;
        }
        if (ValueIsDimension(Serialization.minWidth)) {
            this._minWidth = Serialization.minWidth;
        }
        if (ValueIsDimension(Serialization.minHeight)) {
            this._minHeight = Serialization.minHeight;
        }
        if (ValueIsDimension(Serialization.maxWidth)) {
            this._maxWidth = Serialization.maxWidth;
        }
        if (ValueIsDimension(Serialization.maxHeight)) {
            this._maxHeight = Serialization.maxHeight;
        }
        if (ValueIsBoolean(Serialization.withMobileFrame)) {
            this._withMobileFrame = Serialization.withMobileFrame;
        }
        if (ValueIsOneOf(Serialization.expectedOrientation, WAT_Orientations)) {
            this._expectedOrientation = Serialization.expectedOrientation;
        }
        /**** common properties including "activeScript" ****/
        super._deserializeConfigurationFrom(Serialization);
    }
    /**** deserializedFrom ****/
    static deserializedFrom(JSONString) {
        expectString('JSON string', JSONString);
        let Serialization;
        try {
            Serialization = JSON.parse(JSONString);
        }
        catch (Signal) {
            throwError('InvalidArgument: the given "Serialization" is no valid JSON');
        }
        if (!ValueIsPlainObject(Serialization))
            throwError('InvalidArgument: the given "Serialization" is no valid WAT applet serialization');
        const Behavior = acceptableValue(Serialization.Behavior, ValueIsBehavior);
        const Applet = new WAT_Applet(Behavior); // sets "isReady" to false
        const AppletName = Serialization.Name;
        delete Serialization.Name;
        if (ValueIsName(AppletName)) {
            Applet._Name = AppletName;
        }
        registerIntrinsicBehaviorsIn(Applet);
        Applet._deserializeBehaviorsFrom(Serialization);
        Applet._deserializeConfigurationFrom(Serialization);
        Applet._deserializePagesFrom(Serialization);
        if (Applet._PageList.length === 0) {
            Applet._deserializePagesFrom({ PageList: [
                    { WidgetList: [] }
                ] });
        }
        makeVisualReady(Applet);
        return Applet;
    }
    /**** preserve ****/
    async preserve() {
        if (this.Name == null) {
            console.warn('could not preserve applet, reason: applet has no name');
            return;
        }
        try {
            await AppletStore.setItem(this.Name, JSON.stringify(this.Serialization));
        }
        catch (Signal) {
            console.error('could not preserve applet, reason', Signal);
        }
    }
    /**** removeLocalBackup ****/
    async removeLocalBackup() {
        if (this.Name == null) {
            console.warn('could not remove applet, reason: applet has no name');
            return;
        }
        try {
            await AppletStore.removeItem(this.Name);
        }
        catch (Signal) {
            console.error('could not remove applet, reason', Signal);
        }
    }
    /**** replaceWith ****/
    replaceWith(Serialization) {
        Serialization = Object.assign({}, Serialization);
        const AppletView = this._View;
        delete this._View;
        const AppletName = this._Name;
        delete Serialization.Name;
        try {
            this._isReady = false;
            this.closeAllOverlays();
            this.clear();
            this._resetConfiguration(); // don't let old applet state "bleed through"
            const Behavior = acceptableValue(Serialization.Behavior, ValueIsBehavior);
            this._Behavior = Behavior;
            this._normalizedBehavior = (Behavior == null ? undefined : Behavior.toLowerCase());
            this._BehaviorPool = {
                applet: Object.create(null),
                page: Object.create(null),
                widget: Object.create(null),
            };
            registerIntrinsicBehaviorsIn(this);
            this._deserializeBehaviorsFrom(Serialization);
            this._deserializeConfigurationFrom(Serialization);
            this._deserializePagesFrom(Serialization);
            if (this._PageList.length === 0) {
                this._deserializePagesFrom({ PageList: [
                        { WidgetList: [] }
                    ] });
            }
            if (this.visitedPage == null) {
                this.visitPage(this.PageList[0]);
            }
        }
        finally {
            this._Name = AppletName; // just to be safe, should not be necessary
            this._View = AppletView;
            makeVisualReady(this);
            this.rerender();
        }
    }
    /**** _resetConfiguration - reset all optional state to its default ****/
    _resetConfiguration() {
        this.configurableProperties = []; // also removes any installed accessors
        // @ts-ignore TS2322 clear "_observed" - the next access initializes it freshly
        this._observed = undefined;
        this._activeScript = undefined;
        this._pendingScript = undefined;
        this._ScriptError = undefined;
        this._memoized = {};
        this._Behavior = undefined;
        this._normalizedBehavior = undefined;
        this._Synopsis = undefined;
        this._FontFamily = undefined;
        this._FontSize = undefined;
        this._FontWeight = undefined;
        this._FontStyle = undefined;
        this._TextDecoration = undefined;
        this._TextShadow = undefined;
        this._TextAlignment = undefined;
        this._LineHeight = undefined;
        this._ForegroundColor = undefined;
        this._hasBackground = false;
        this._BackgroundColor = undefined;
        this._BackgroundTexture = undefined;
        this._Opacity = undefined;
        this._Cursor = undefined;
        this._minWidth = undefined;
        this._maxWidth = undefined;
        this._minHeight = undefined;
        this._maxHeight = undefined;
        this._SnapToGrid = false;
        this._GridWidth = 10;
        this._GridHeight = 10;
        this._HeadExtensions = '';
        this._toBeCentered = true;
        this._withMobileFrame = false;
        this._expectedOrientation = 'any';
        this._AssetsBase = undefined;
    }
}
//------------------------------------------------------------------------------
//--                                 WAT_Page                                 --
//------------------------------------------------------------------------------
export class WAT_Page extends WAT_Visual {
    constructor(Behavior, Applet) {
        super(Behavior, Applet);
        /**** Overflows ****/
        Object.defineProperty(this, "_Overflows", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**** WidgetList ****/
        Object.defineProperty(this, "_WidgetList", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
    }
    /**** Category ****/
    get Category() { return 'page'; }
    set Category(_) { throwReadOnlyError('Category'); }
    /**** Behavior ****/
    get Behavior() { return this._Behavior; }
    set Behavior(newBehavior) {
        var _a, _b;
        allowBehavior('page behavior', newBehavior);
        const normalizedBehavior = (newBehavior == null ? undefined : newBehavior.toLowerCase());
        if (this._normalizedBehavior !== normalizedBehavior) {
            this._normalizedBehavior = normalizedBehavior;
            // @ts-ignore TS2446,TS7053 allow accessing a protected member and indexing
            this._Behavior = ((_b = (_a = this.Applet) === null || _a === void 0 ? void 0 : _a._BehaviorPool['page'][normalizedBehavior]) === null || _b === void 0 ? void 0 : _b.Name) || newBehavior;
            this.activateScript();
            this.rerender();
        }
    }
    /**** Applet ****/
    get Applet() { return this._Container; }
    set Applet(_) { throwReadOnlyError('Applet'); }
    /**** Path - to be overwritten ****/
    get Path() {
        if (!this.isAttached) {
            return '';
        }
        return (this.Name == null
            ? '/#' + this.Index
            : '/' + this.Name);
    }
    set Path(_) { throwReadOnlyError('Path'); }
    /**** isAttached ****/
    get isAttached() { var _a; return (((_a = this._Container) === null || _a === void 0 ? void 0 : _a.isAttached) == true); }
    set isAttached(_) { throwReadOnlyError('isAttached'); }
    /**** WidgetsNamed ****/
    WidgetsNamed(NameList) {
        expectListSatisfying('widget name list', NameList, ValueIsName);
        const WidgetSet = {};
        NameList.forEach((WidgetName) => {
            const Widget = this.existingWidget(WidgetName); // may fail
            WidgetSet[WidgetName] = Widget; // even if multiply requested
        });
        return Array.from(Object.values(WidgetSet));
    }
    /**** namedWidgets ****/
    get namedWidgets() {
        const WidgetSet = {};
        this._WidgetList.forEach((Widget) => {
            if (Widget.Name != null) {
                WidgetSet[Widget.Name] = Widget;
            }
        });
        return WidgetSet;
    }
    set namedWidgets(_) { throwReadOnlyError('namedWidgets'); }
    /**** uniqueWidgets ****/
    get uniqueWidgets() {
        const WidgetSet = {};
        this._WidgetList.forEach((Widget) => {
            if ((Widget.Name != null) && Widget.Name.startsWith('@')) {
                WidgetSet[Widget.Name] = Widget;
            }
        });
        return WidgetSet;
    }
    set uniqueWidgets(_) { throwReadOnlyError('uniqueWidgets'); }
    /**** configureWidgets ****/
    configureWidgets(OptionSet) {
        expectPlainObject('options set', OptionSet);
        for (const WidgetName in OptionSet) {
            if (OptionSet.hasOwnProperty(WidgetName)) {
                if (ValueIsName(WidgetName)) {
                    let Widget = this.existingWidget(WidgetName);
                    Widget.configure(OptionSet[WidgetName]);
                }
                else {
                    throwError(`InvalidArgument: invalid widget name ${quoted(WidgetName)}`);
                }
            }
        }
    }
    /**** x/y ****/
    get x() { return this.Geometry.x; }
    set x(_) { throwReadOnlyError('x'); }
    get y() { return this.Geometry.y; }
    set y(_) { throwReadOnlyError('y'); }
    /**** Width/Height - independent of configured width/height limits ****/
    get Width() { return this.Geometry.Width; }
    set Width(_) { throwReadOnlyError('Width'); }
    get Height() { return this.Geometry.Height; }
    set Height(_) { throwReadOnlyError('Height'); }
    /**** Position ****/
    get Position() {
        let { x, y } = this.Geometry;
        return { x, y };
    }
    set Position(_) {
        throwReadOnlyError('Position');
    }
    /**** Size ****/
    get Size() {
        let { Width, Height } = this.Geometry;
        return { Width, Height };
    }
    set Size(_) {
        throwReadOnlyError('Size');
    }
    /**** Geometry ****/
    get Geometry() {
        let Applet = this.Applet;
        if (Applet == null)
            throwError('NotAttached: this page is not attached');
        return Applet.Geometry;
    }
    set Geometry(_) { throwReadOnlyError('Geometry'); }
    get Overflows() {
        return acceptableValue((this._Overflows == null ? undefined : this._Overflows.slice()), (Value) => ValueIsListOf(Value, ['hidden', 'scroll', 'auto']), ['hidden', 'hidden']);
    }
    set Overflows(newValue) {
        allowListOf('overflow settings', newValue, ['hidden', 'scroll', 'auto']);
        if (ValuesDiffer(this._Overflows, newValue)) {
            this._Overflows = (newValue == null ? undefined : newValue.slice());
            this.rerender();
        }
    }
    /**** rerender ****/
    rerender() {
        const Applet = this.Applet;
        if (Applet != null) {
            Applet.rerender(this);
        }
    }
    /**** Index ****/
    get Index() {
        const Applet = this._Container;
        return (Applet == null ? -1 : Applet.IndexOfPage(this));
    }
    set Index(_) { throwReadOnlyError('Index'); }
    /**** mayBeShiftedUp/Down ****/
    get mayBeShiftedUp() {
        const Applet = this._Container;
        return (Applet == null ? false : Applet.mayShiftPageUp(this));
    }
    set mayBeShiftedUp(_) { throwReadOnlyError('mayBeShiftedUp'); }
    get mayBeShiftedDown() {
        const Applet = this._Container;
        return (Applet == null ? false : Applet.mayShiftPageDown(this));
    }
    set mayBeShiftedDown(_) { throwReadOnlyError('mayBeShiftedDown'); }
    /**** shiftToTop/Up/Down/ToBottom ****/
    shiftToTop() {
        const Applet = this._Container;
        if (Applet == null)
            throwError('InvalidArgument: this page is not attached');
        Applet.shiftPageToTop(this);
    }
    shiftUp() {
        const Applet = this._Container;
        if (Applet == null)
            throwError('InvalidArgument: this page is not attached');
        Applet.shiftPageUp(this);
    }
    shiftDown() {
        const Applet = this._Container;
        if (Applet == null)
            throwError('InvalidArgument: this page is not attached');
        Applet.shiftPageDown(this);
    }
    shiftToBottom() {
        const Applet = this._Container;
        if (Applet == null)
            throwError('InvalidArgument: this page is not attached');
        Applet.shiftPageToBottom(this);
    }
    get WidgetList() { return this._WidgetList.slice(); }
    set WidgetList(_) { throwReadOnlyError('WidgetList'); }
    /**** WidgetCount ****/
    get WidgetCount() { return this._WidgetList.length; }
    set WidgetCount(_) { throwReadOnlyError('WidgetCount'); }
    /**** IndexOfWidget ****/
    IndexOfWidget(Widget) {
        expectWidget('WAT widget to search for', Widget);
        return this._WidgetList.indexOf(Widget);
    }
    /**** Widget ****/
    Widget(WidgetOrNameOrIndex) {
        expectValue('widget, name or index', WidgetOrNameOrIndex);
        switch (true) {
            case ValueIsWidget(WidgetOrNameOrIndex):
                const Widget = WidgetOrNameOrIndex;
                return (Widget.Page === this ? Widget : undefined);
            case ValueIsInteger(WidgetOrNameOrIndex):
                let Index = WidgetOrNameOrIndex;
                if (Index < 0) {
                    Index += this._WidgetList.length;
                }
                return this._WidgetList[Index];
            case ValueIsName(WidgetOrNameOrIndex):
                return this.WidgetNamed(WidgetOrNameOrIndex);
        }
        throwError('InvalidArgument: no valid widget, widget name or widget index given');
    }
    /**** existingWidget ****/
    existingWidget(WidgetOrNameOrIndex) {
        let Widget = this.Widget(WidgetOrNameOrIndex);
        if (Widget == null)
            throwError('WidgetNotFound: the desired widget could not be found');
        return Widget;
    }
    /**** WidgetNamed ****/
    WidgetNamed(Name) {
        expectName('WAT widget name', Name);
        Name = Name.trim().toLowerCase();
        let Result = undefined;
        this._WidgetList.forEach((Widget) => {
            if ((Result == null) &&
                (Widget.Name != null) && (Widget.Name.toLowerCase() === Name)) {
                Result = Widget;
            }
        });
        return Result;
    }
    /**** WidgetAt ****/
    WidgetAt(Index) {
        expectInteger('WAT widget index', Index);
        if (Index < 0) {
            Index += this._WidgetList.length;
        }
        return this._WidgetList[Index];
    }
    /**** hasWidget ****/
    hasWidget(WidgetOrNameOrIndex) {
        return (this.Widget(WidgetOrNameOrIndex) != null);
    }
    /**** newWidgetAt ****/
    newWidgetAt(Behavior, Index) {
        return this.WidgetDeserializedAt({ Behavior: Behavior || null }, Index);
    }
    /**** WidgetDeserializedAt ****/
    WidgetDeserializedAt(Serialization, Index) {
        expectSerializableObject('widget serialization', Serialization);
        allowInteger('widget insertion index', Index);
        if (Index == null) {
            Index = this._WidgetList.length;
        }
        else {
            if (Index < 0) {
                Index += this._WidgetList.length;
            }
            Index = Math.max(0, Math.min(Index, this._WidgetList.length));
        }
        const Behavior = acceptableValue(Serialization.Behavior, ValueIsBehavior);
        let newWidget = new WAT_Widget(Behavior, this); // sets "isReady" to false
        this._WidgetList.splice(Index, 0, newWidget);
        // @ts-ignore TS2446 allow WAT_Page to access a protected member of WAT_Widget
        newWidget._deserializeConfigurationFrom(Serialization);
        makeVisualReady(newWidget);
        this.rerender();
        return newWidget;
    }
    /**** DuplicateOfWidgetAt ****/
    DuplicateOfWidgetAt(Index) {
        expectInteger('widget index', Index);
        const Widget = this.existingWidget(Index); // DRY
        return this.WidgetDeserializedAt(Widget.Serialization, Index);
    }
    /**** mayShiftWidgetUp/Down ****/
    mayShiftWidgetUp(WidgetOrNameOrIndex) {
        const Widget = this.existingWidget(WidgetOrNameOrIndex);
        return (Widget.Index > 0);
    }
    mayShiftWidgetDown(WidgetOrNameOrIndex) {
        const Widget = this.existingWidget(WidgetOrNameOrIndex);
        return (Widget.Index < this._WidgetList.length - 1);
    }
    /**** shiftWidgetToTop/Up/Down/ToBottom ****/
    shiftWidgetToTop(WidgetOrNameOrIndex) {
        const Widget = this.existingWidget(WidgetOrNameOrIndex);
        this.shiftWidgetTo(Widget, 0);
    }
    shiftWidgetUp(WidgetOrNameOrIndex) {
        const Widget = this.existingWidget(WidgetOrNameOrIndex);
        this.shiftWidgetTo(Widget, Widget.Index - 1);
    }
    shiftWidgetDown(WidgetOrNameOrIndex) {
        const Widget = this.existingWidget(WidgetOrNameOrIndex);
        this.shiftWidgetTo(Widget, Widget.Index + 1);
    }
    shiftWidgetToBottom(WidgetOrNameOrIndex) {
        const Widget = this.existingWidget(WidgetOrNameOrIndex);
        this.shiftWidgetTo(Widget, this._WidgetList.length);
    }
    /**** shiftWidgetTo ****/
    shiftWidgetTo(WidgetOrNameOrIndex, newIndex) {
        const Widget = this.existingWidget(WidgetOrNameOrIndex);
        expectInteger('widget insertion index', newIndex);
        if (newIndex < 0) {
            newIndex += this._WidgetList.length;
        }
        newIndex = Math.max(0, Math.min(newIndex, this._WidgetList.length));
        const oldIndex = this._WidgetList.indexOf(Widget);
        if (oldIndex === newIndex) {
            return;
        }
        this._WidgetList.splice(oldIndex, 1);
        this._WidgetList.splice(newIndex, 0, Widget);
        this.rerender();
    }
    /**** shiftWidgetsTo (for Designer only, less strict argument validations) ****/
    shiftWidgetsTo(WidgetList, newIndexList) {
        const IndexSet = [];
        newIndexList.forEach((Index, i) => {
            if (this._WidgetList.indexOf(WidgetList[i]) >= 0) {
                IndexSet[Index] = WidgetList[i];
            }
        });
        newIndexList = newIndexList.slice().sort((a, b) => a - b);
        WidgetList.forEach((Widget) => {
            const Index = this._WidgetList.indexOf(Widget);
            if (Index >= 0) {
                this._WidgetList.splice(Index, 1);
            }
        });
        newIndexList.forEach((newIndex) => {
            if (IndexSet[newIndex] != null) {
                this._WidgetList.splice(newIndex, 0, IndexSet[newIndex]);
                // @ts-ignore TS2322 explicitly clear this entry to avoid duplicate insertions
                IndexSet[newIndex] = undefined;
            }
        });
        this.rerender();
    }
    /**** destroyWidget ****/
    destroyWidget(WidgetOrNameOrIndex) {
        const Widget = this.Widget(WidgetOrNameOrIndex);
        if (Widget == null) {
            if (ValueIsWidget(WidgetOrNameOrIndex))
                throwError('NoSuchWidget: the given widget could not be found');
            return;
        }
        unregisterAllReactiveFunctionsFrom(Widget);
        uninstallStylesheetForVisual(Widget);
        // @ts-ignore TS2341 allow accessing private member
        Widget._activationToken = (Widget._activationToken || 0) + 1;
        // cancels any running script activation
        const oldIndex = this._WidgetList.indexOf(Widget);
        this._WidgetList.splice(oldIndex, 1);
        // @ts-ignore TS2446 allow accessing protected member
        Widget._Container = undefined;
        this.rerender();
    }
    /**** clear ****/
    clear() {
        this._WidgetList.forEach((Widget) => {
            unregisterAllReactiveFunctionsFrom(Widget);
            uninstallStylesheetForVisual(Widget);
            // @ts-ignore TS2341 allow accessing private member
            Widget._activationToken = (Widget._activationToken || 0) + 1;
            // cancels any running script activation
            // @ts-ignore TS2446 allow accessing protected member
            Widget._Container = undefined;
        });
        this._WidgetList.length = 0;
        this.rerender();
    }
    /**** Serialization ****/
    get Serialization() {
        const Result = {};
        this._serializeConfigurationInto(Result);
        this._serializeWidgetsInto(Result);
        return Result;
    }
    set Serialization(_) { throwReadOnlyError('Serialization'); }
    /**** _serializeWidgetsInto ****/
    _serializeWidgetsInto(Serialization) {
        const WidgetList = this._WidgetList || [];
        //    if (WidgetList.length > 0) {          // always serialize the "WidgetList"
        Serialization.WidgetList = WidgetList.map((Widget) => Widget.Serialization);
        //    }            // presence of "WidgetList" makes a page recognizable as such
    }
    /**** _deserializeWidgetsFrom ****/
    _deserializeWidgetsFrom(Serialization) {
        if (Serialization.WidgetList == null) {
            return;
        }
        const WidgetList = this._WidgetList;
        if (WidgetList.length > 0) {
            this.clear();
        }
        if (!ValueIsList(Serialization.WidgetList)) {
            console.warn('DeserializationError: invalid "WidgetList"');
            return;
        }
        ;
        Serialization.WidgetList.forEach((WidgetSerialization, Index) => {
            if (!ValueIsPlainObject(WidgetSerialization)) {
                console.warn('DeserializationError: invalid "WidgetList" entry #' + Index);
                return;
            }
            this.WidgetDeserializedAt(WidgetSerialization, Index);
        });
    }
    /**** recursivelyActivateAllScripts ****/
    recursivelyActivateAllScripts() {
        this.activateScript();
        this._WidgetList.forEach((Widget) => Widget.activateScript());
    }
}
//------------------------------------------------------------------------------
//--                                WAT_Widget                                --
//------------------------------------------------------------------------------
export class WAT_Widget extends WAT_Visual {
    constructor(Behavior, Page) {
        super(Behavior, Page);
        Object.defineProperty(this, "_Pane", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**** Lock ****/
        Object.defineProperty(this, "_Lock", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        /**** Visibility ****/
        Object.defineProperty(this, "_Visibility", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: true
        });
        /**** Enabling ****/
        Object.defineProperty(this, "_Enabling", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: true
        });
        /**** BorderStyles - in "t,r,b,l" order, not inheritable ****/
        Object.defineProperty(this, "_BorderStyles", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**** BorderWidths - in "t,r,b,l" order, not inheritable ****/
        Object.defineProperty(this, "_BorderWidths", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**** BorderColors - in "t,r,b,l" order, not inheritable ****/
        Object.defineProperty(this, "_BorderColors", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**** BorderRadii - in "tl,tr,br,bl" order, not inheritable ****/
        Object.defineProperty(this, "_BorderRadii", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**** BoxShadow - not inheritable ****/
        Object.defineProperty(this, "_BoxShadow", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**** minWidth ****/
        Object.defineProperty(this, "_minWidth", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: undefined
        });
        /**** maxWidth ****/
        Object.defineProperty(this, "_maxWidth", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: undefined
        });
        /**** minHeight ****/
        Object.defineProperty(this, "_minHeight", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: undefined
        });
        /**** maxHeight ****/
        Object.defineProperty(this, "_maxHeight", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: undefined
        });
        /**** Anchors ****/
        Object.defineProperty(this, "_Anchors", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ['left-width', 'top-height']
        });
        /**** Offsets ****/
        Object.defineProperty(this, "_Offsets", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: [10, 30, 10, 30]
        });
        /**** Overflows ****/
        Object.defineProperty(this, "_Overflows", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**** OverlayNamed ****/
        Object.defineProperty(this, "_OverlayList", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
    }
    // avoids multiple renderings at different places
    /**** Category ****/
    get Category() { return 'widget'; }
    set Category(_) { throwReadOnlyError('Category'); }
    /**** Applet ****/
    // @ts-ignore TS2446 allow WAT_Widget to access a protected member of WAT_Page
    get Applet() { var _a; return (_a = this._Container) === null || _a === void 0 ? void 0 : _a._Container; }
    set Applet(_) { throwReadOnlyError('Applet'); }
    /**** Page ****/
    get Page() { return this._Container; }
    set Page(_) { throwReadOnlyError('Page'); }
    /**** Path - to be overwritten ****/
    get Path() {
        var _a;
        if (!this.isAttached) {
            return '';
        }
        return ((_a = this._Container) === null || _a === void 0 ? void 0 : _a.Path) + (this.Name == null
            ? '/#' + this.Index
            : '/' + this.Name);
    }
    set Path(_) { throwReadOnlyError('Path'); }
    /**** isAttached ****/
    // @ts-ignore TS2446 allow WAT_Widget to access a protected member of WAT_Page
    get isAttached() { var _a, _b; return (((_b = (_a = this._Container) === null || _a === void 0 ? void 0 : _a._Container) === null || _b === void 0 ? void 0 : _b.isAttached) == true); }
    set isAttached(_) { throwReadOnlyError('isAttached'); }
    /**** closestOutline ****/
    get closestOutline() {
        const { x, y, Width, Height } = this.Geometry;
        const Outlines = this.Page.WidgetList.slice(this.Index + 1)
            .filter((Widget) => {
            if (Widget.normalizedBehavior !== 'basic_controls.outline') {
                return false;
            }
            const { x: WidgetX, y: WidgetY, Width: WidgetW, Height: WidgetH } = Widget.Geometry;
            return ((WidgetX <= x) && (WidgetX + WidgetW >= x + Width) &&
                (WidgetY <= y) && (WidgetY + WidgetH >= y + Height));
        });
        if (Outlines.length <= 1) {
            return Outlines[0];
        }
        const ScoreFor = new Map();
        Outlines.forEach((Widget) => {
            const { x: WidgetX, y: WidgetY, Width: WidgetW, Height: WidgetH } = Widget.Geometry;
            ScoreFor.set(Widget, ((x - WidgetX) * WidgetH + (WidgetX + WidgetW - x - Width) * WidgetH +
                (y - WidgetY) * WidgetW + (WidgetY + WidgetH - y - Height) * WidgetW));
        });
        // @ts-ignore TS6057 no, the ScoreFor entries are not undefined
        Outlines.sort((a, b) => ScoreFor.get(a) - ScoreFor.get(b));
        return Outlines[0];
    }
    set closestOutline(_) { throwReadOnlyError('closestOutline'); }
    /**** Outline ****/
    Outline(Name) {
        expectName('outline name', Name);
        const normalizedName = Name.toLowerCase();
        const { x, y, Width, Height } = this.Geometry;
        const Outlines = this.Page.WidgetList.slice(this.Index + 1)
            .filter((Widget) => {
            if ((Widget.normalizedBehavior !== 'basic_controls.outline') ||
                (Widget.normalizedName !== normalizedName)) {
                return false;
            }
            const { x: WidgetX, y: WidgetY, Width: WidgetW, Height: WidgetH } = Widget.Geometry;
            return ((WidgetX <= x) && (WidgetX + WidgetW >= x + Width) &&
                (WidgetY <= y) && (WidgetY + WidgetH >= y + Height));
        });
        return Outlines[0];
    }
    get Lock() { return this._Lock; }
    set Lock(newLock) {
        expectBoolean('widget layout lock', newLock);
        if (this._Lock !== newLock) {
            this._Lock = newLock;
            this.rerender();
        }
    }
    /**** lock/unlock ****/
    lock() { this.Lock = true; }
    unlock() { this.Lock = false; }
    /**** isLocked ****/
    get isLocked() { return this._Lock; }
    set isLocked(newLock) { this.Lock = newLock; }
    get Visibility() {
        return this._Visibility;
    }
    set Visibility(newVisibility) {
        expectBoolean('widget visibility', newVisibility);
        if (this._Visibility !== newVisibility) {
            this._Visibility = newVisibility;
            this.rerender();
        }
    }
    /**** show/hide ****/
    show() { this.Visibility = true; }
    hide() { this.Visibility = false; }
    /**** isVisible ****/
    get isVisible() { return this.Visibility; }
    set isVisible(newVisibility) { this.Visibility = newVisibility; }
    get Enabling() {
        return this._Enabling;
    }
    set Enabling(newEnabling) {
        expectBoolean('widget enabling', newEnabling);
        if (this._Enabling !== newEnabling) {
            this._Enabling = newEnabling;
            this.rerender();
        }
    }
    /**** enable/disable ****/
    enable() { this.Enabling = true; }
    disable() { this.Enabling = false; }
    /**** isEnabled ****/
    get isEnabled() { return this.Enabling; }
    set isEnabled(newEnabling) { this.Enabling = newEnabling; }
    /**** isDisabled ****/
    get isDisabled() { return !this.Enabling; }
    set isDisabled(newDisabling) { this.Enabling = !newDisabling; }
    get BorderStyles() {
        return (this._BorderStyles == null ? undefined : this._BorderStyles.slice());
    }
    set BorderStyles(newBorderStyles) {
        let newSettings = undefined;
        switch (true) {
            case (newBorderStyles == null):
                break;
            case ValueIsOneOf(newBorderStyles, WAT_BorderStyles):
                newSettings = new Array(4).fill(newBorderStyles); // satisfies TS
                break;
            case ValueIsListSatisfying(newBorderStyles, (Value) => ValueIsOneOf(Value, WAT_BorderStyles)):
                switch (newBorderStyles.length) { // "as any" satisfies TS
                    case 0: break;
                    case 1:
                        newSettings = new Array(4).fill(newBorderStyles[0]);
                        break;
                    case 2: // t/b,l/r
                        newSettings = [
                            newBorderStyles[0], newBorderStyles[1],
                            newBorderStyles[0], newBorderStyles[1],
                        ];
                        break;
                    case 3: // t,l/r,b
                        newSettings = [
                            newBorderStyles[0], newBorderStyles[1],
                            newBorderStyles[2], newBorderStyles[1],
                        ];
                        break;
                    case 4: // t,r,b,l
                        newSettings = newBorderStyles.slice();
                        break;
                    default:
                        throwError('InvalidArgument: given "BorderStyles" list has an invalid length');
                }
                break;
            default: throwError('InvalidArgument: invalid "BorderStyles" given');
        }
        if (ValuesDiffer(this._BorderStyles, newSettings)) {
            this._BorderStyles = newSettings;
            this.rerender();
        }
    }
    get BorderWidths() {
        return (this._BorderWidths == null ? undefined : this._BorderWidths.slice());
    }
    set BorderWidths(newBorderWidths) {
        let newSettings = undefined;
        switch (true) {
            case (newBorderWidths == null):
                break;
            case ValueIsDimension(newBorderWidths):
                newSettings = new Array(4).fill(newBorderWidths); // satisfies TS
                break;
            case ValueIsListSatisfying(newBorderWidths, ValueIsDimension):
                switch (newBorderWidths.length) { // "as any" satisfies TS
                    case 0: break;
                    case 1:
                        newSettings = new Array(4).fill(newBorderWidths[0]);
                        break;
                    case 2: // t/b,l/r
                        newSettings = [
                            newBorderWidths[0], newBorderWidths[1],
                            newBorderWidths[0], newBorderWidths[1],
                        ];
                        break;
                    case 3: // t,l/r,b
                        newSettings = [
                            newBorderWidths[0], newBorderWidths[1],
                            newBorderWidths[2], newBorderWidths[1],
                        ];
                        break;
                    case 4: // t,r,b,l
                        newSettings = newBorderWidths.slice();
                        break;
                    default:
                        throwError('InvalidArgument: given "BorderWidths" list has an invalid length');
                }
                break;
            default: throwError('InvalidArgument: invalid "BorderWidths" given');
        }
        if (ValuesDiffer(this._BorderWidths, newSettings)) {
            this._BorderWidths = newSettings;
            this.rerender();
        }
    }
    get BorderColors() {
        return (this._BorderColors == null ? undefined : this._BorderColors.slice());
    }
    set BorderColors(newBorderColors) {
        let newSettings = undefined;
        switch (true) {
            case (newBorderColors == null):
                break;
            case ValueIsColor(newBorderColors):
                newSettings = new Array(4).fill(newBorderColors); // satisfies TS
                break;
            case ValueIsListSatisfying(newBorderColors, ValueIsColor):
                switch (newBorderColors.length) { // "as any" satisfies TS
                    case 0: break;
                    case 1:
                        newSettings = new Array(4).fill(newBorderColors[0]);
                        break;
                    case 2: // t/b,l/r
                        newSettings = [
                            newBorderColors[0], newBorderColors[1],
                            newBorderColors[0], newBorderColors[1],
                        ];
                        break;
                    case 3: // t,l/r,b
                        newSettings = [
                            newBorderColors[0], newBorderColors[1],
                            newBorderColors[2], newBorderColors[1],
                        ];
                        break;
                    case 4: // t,r,b,l
                        newSettings = newBorderColors.slice();
                        break;
                    default:
                        throwError('InvalidArgument: given "BorderColors" list has an invalid length');
                }
                break;
            default: throwError('InvalidArgument: invalid "BorderColors" given');
        }
        if (ValuesDiffer(this._BorderColors, newSettings)) {
            this._BorderColors = newSettings;
            this.rerender();
        }
    }
    get BorderRadii() {
        return (this._BorderRadii == null ? undefined : this._BorderRadii.slice());
    }
    set BorderRadii(newBorderRadii) {
        let newSettings = undefined;
        switch (true) {
            case (newBorderRadii == null):
                break;
            case ValueIsDimension(newBorderRadii):
                newSettings = new Array(4).fill(newBorderRadii); // satisfies TS
                break;
            case ValueIsListSatisfying(newBorderRadii, ValueIsDimension):
                switch (newBorderRadii.length) { // "as any" satisfies TS
                    case 0: break;
                    case 1:
                        newSettings = new Array(4).fill(newBorderRadii[0]);
                        break;
                    case 2: // tl/br,tr/bl
                        newSettings = [
                            newBorderRadii[0], newBorderRadii[1],
                            newBorderRadii[0], newBorderRadii[1],
                        ];
                        break;
                    case 3: // tl,tr/bl,br
                        newSettings = [
                            newBorderRadii[0], newBorderRadii[1],
                            newBorderRadii[2], newBorderRadii[1],
                        ];
                        break;
                    case 4: // tl,tr,br,bl
                        newSettings = newBorderRadii.slice();
                        break;
                    default:
                        throwError('InvalidArgument: given "BorderRadii" list has an invalid length');
                }
                break;
            default: throwError('InvalidArgument: invalid "BorderRadii" given');
        }
        if (ValuesDiffer(this._BorderRadii, newSettings)) {
            this._BorderRadii = newSettings;
            this.rerender();
        }
    }
    get BoxShadow() {
        return (this._BoxShadow == null ? undefined : Object.assign({}, this._BoxShadow));
    }
    set BoxShadow(newBoxShadow) {
        allowBoxShadow('widget box shadow', newBoxShadow);
        // @ts-ignore TS2367 "newBoxShadow" may be "none"
        if (newBoxShadow === 'none') {
            newBoxShadow = { isActive: false, xOffset: 0, yOffset: 0, BlurRadius: 0, SpreadRadius: 0, Color: 'transparent' };
        }
        if (ValuesDiffer(this._BoxShadow, newBoxShadow)) {
            if (newBoxShadow == null) {
                this._BoxShadow = undefined;
            }
            else {
                const { isActive, xOffset, yOffset, BlurRadius, SpreadRadius, Color } = newBoxShadow;
                this._BoxShadow = { isActive, xOffset, yOffset, BlurRadius, SpreadRadius, Color };
            }
            this.rerender();
        }
    }
    /**** rerender ****/
    rerender() {
        const Applet = this.Applet;
        if (Applet != null) {
            Applet.rerender(this);
        }
    }
    /**** CSSStyle ****/
    get CSSStyle() {
        let CSSStyleList = [];
        const { BorderWidths, BorderStyles, BorderColors, BorderRadii, BoxShadow, } = this;
        if (BorderWidths != null) {
            CSSStyleList.push('border-width:' +
                BorderWidths[0] + 'px ' + BorderWidths[1] + 'px ' +
                BorderWidths[2] + 'px ' + BorderWidths[3] + 'px');
        }
        if (BorderStyles != null) {
            CSSStyleList.push('border-style:' +
                BorderStyles[0] + ' ' + BorderStyles[1] + ' ' +
                BorderStyles[2] + ' ' + BorderStyles[3]);
        }
        if (BorderColors != null) {
            CSSStyleList.push('border-color:' +
                BorderColors[0] + ' ' + BorderColors[1] + ' ' +
                BorderColors[2] + ' ' + BorderColors[3]);
        }
        if (BorderRadii != null) {
            CSSStyleList.push('border-radius:' +
                BorderRadii[0] + 'px ' + BorderRadii[1] + 'px ' +
                BorderRadii[2] + 'px ' + BorderRadii[3] + 'px');
        }
        if ((BoxShadow != null) && BoxShadow.isActive) {
            CSSStyleList.push('box-shadow:' +
                BoxShadow.xOffset + 'px ' + BoxShadow.yOffset + 'px ' +
                BoxShadow.BlurRadius + 'px ' + BoxShadow.SpreadRadius + 'px ' +
                BoxShadow.Color);
        }
        return (super.CSSStyle +
            (CSSStyleList.length === 0 ? '' : CSSStyleList.join(';') + ';'));
    }
    set CSSStyle(_) { throwReadOnlyError('CSSStyle'); }
    /**** Index ****/
    get Index() {
        const Page = this._Container;
        return (Page == null ? -1 : Page.IndexOfWidget(this));
    }
    set Index(_) { throwReadOnlyError('Index'); }
    /**** mayBeShiftedUp/Down ****/
    get mayBeShiftedUp() {
        const Page = this._Container;
        return (Page == null ? false : Page.mayShiftWidgetUp(this));
    }
    set mayBeShiftedUp(_) { throwReadOnlyError('mayBeShiftedUp'); }
    get mayBeShiftedDown() {
        const Page = this._Container;
        return (Page == null ? false : Page.mayShiftWidgetDown(this));
    }
    set mayBeShiftedDown(_) { throwReadOnlyError('mayBeShiftedDown'); }
    /**** shiftToTop/Up/Down/ToBottom ****/
    shiftToTop() {
        const Page = this._Container;
        if (Page == null)
            throwError('InvalidArgument: this widget is not attached');
        Page.shiftWidgetToTop(this);
    }
    shiftUp() {
        const Page = this._Container;
        if (Page == null)
            throwError('InvalidArgument: this widget is not attached');
        Page.shiftWidgetUp(this);
    }
    shiftDown() {
        const Page = this._Container;
        if (Page == null)
            throwError('InvalidArgument: this widget is not attached');
        Page.shiftWidgetDown(this);
    }
    shiftToBottom() {
        const Page = this._Container;
        if (Page == null)
            throwError('InvalidArgument: this widget is not attached');
        Page.shiftWidgetToBottom(this);
    }
    get minWidth() {
        return (this._minWidth == null ? 0 : this._minWidth);
    }
    set minWidth(newMinWidth) {
        allowDimension('minimal widget width', newMinWidth);
        if (newMinWidth != null) {
            newMinWidth = Math.round(newMinWidth);
        }
        if (this._minWidth !== newMinWidth) {
            this._minWidth = newMinWidth;
            if ((this._minWidth != null) && (this._maxWidth != null) &&
                (this._maxWidth < this._minWidth)) {
                this._maxWidth = newMinWidth;
            }
            this.rerender();
        }
    }
    get maxWidth() {
        return this._maxWidth;
    }
    set maxWidth(newMaxWidth) {
        allowDimension('maximal widget width', newMaxWidth);
        if (newMaxWidth != null) {
            newMaxWidth = Math.round(newMaxWidth);
        }
        if ((newMaxWidth != null) && (this._minWidth != null)) {
            newMaxWidth = Math.max(this._minWidth, newMaxWidth);
        }
        if (this._maxWidth !== newMaxWidth) {
            this._maxWidth = newMaxWidth;
            this.rerender();
        }
    }
    get minHeight() {
        return (this._minHeight == null ? 0 : this._minHeight);
    }
    set minHeight(newMinHeight) {
        allowDimension('minimal widget height', newMinHeight);
        if (newMinHeight != null) {
            newMinHeight = Math.round(newMinHeight);
        }
        if (this._minHeight !== newMinHeight) {
            this._minHeight = newMinHeight;
            if ((this._minHeight != null) && (this._maxHeight != null) &&
                (this._maxHeight < this._minHeight)) {
                this._maxHeight = newMinHeight;
            }
            this.rerender();
        }
    }
    get maxHeight() {
        return this._maxHeight;
    }
    set maxHeight(newMaxHeight) {
        allowDimension('maximal widget height', newMaxHeight);
        if (newMaxHeight != null) {
            newMaxHeight = Math.round(newMaxHeight);
        }
        if ((newMaxHeight != null) && (this._minHeight != null)) {
            newMaxHeight = Math.max(this._minHeight, newMaxHeight);
        }
        if (this._maxHeight !== newMaxHeight) {
            this._maxHeight = newMaxHeight;
            this.rerender();
        }
    }
    /**** x/y ****/
    get x() { return this.Geometry.x; }
    get y() { return this.Geometry.y; }
    set x(newX) {
        expectLocation('x coordinate', newX);
        this.changeGeometryTo(newX);
    }
    set y(newY) {
        expectLocation('y coordinate', newY);
        this.changeGeometryTo(undefined, newY);
    }
    /**** Width/Height - independent of configured width/height limits ****/
    get Width() { return this.Geometry.Width; }
    get Height() { return this.Geometry.Height; }
    set Width(newWidth) {
        expectDimension('widget width', newWidth);
        this.changeGeometryTo(undefined, undefined, newWidth);
    }
    set Height(newHeight) {
        expectDimension('widget height', newHeight);
        this.changeGeometryTo(undefined, undefined, undefined, newHeight);
    }
    /**** Position ****/
    get Position() {
        let { x, y } = this.Geometry;
        return { x, y };
    }
    set Position(newPosition) {
        expectPlainObject('widget position', newPosition);
        expectLocation('x coordinate', newPosition.x);
        expectLocation('y coordinate', newPosition.y);
        this.changeGeometryTo(newPosition.x, newPosition.y);
    }
    /**** Size ****/
    get Size() {
        let { Width, Height } = this.Geometry;
        return { Width, Height };
    }
    set Size(newSize) {
        expectPlainObject('widget size', newSize);
        expectDimension('width', newSize.Width);
        expectDimension('height', newSize.Height);
        this.changeGeometryTo(undefined, undefined, newSize.Width, newSize.Height);
    }
    /**** Geometry - Position & Size derived from Anchors & Offsets ****/
    get Geometry() {
        let x, Width;
        let y, Height;
        const Anchors = this.Anchors;
        const Offsets = this.Offsets;
        /**** if need be, calculate container dimensions ****/
        let outerWidth = 0, outerHeight = 0;
        if ((Anchors[0] !== 'left-width') || (Anchors[1] !== 'top-height')) {
            const Container = this._Container;
            if (Container == null)
                throwError('NotAttached: relative geometries can only be calculated for attached widgets');
            ({ Width: outerWidth, Height: outerHeight } = Container.Geometry);
        }
        /**** derive geometry from offsets and take care of any size constraints ****/
        switch (Anchors[0]) {
            case 'left-width':
                Width = Offsets[1];
                break;
            case 'width-right':
                Width = Offsets[0];
                break;
            case 'left-right': Width = outerWidth - Offsets[0] - Offsets[1];
        }
        // @ts-ignore TS2454 "Width" will definitely have a value
        Width = Math.max(0, this._minWidth || 0, Math.min(Width, this._maxWidth == null ? Infinity : this._maxWidth));
        switch (Anchors[0]) {
            case 'left-width':
                x = Offsets[0];
                break;
            case 'width-right':
                x = outerWidth - Offsets[1] - Width;
                break;
            case 'left-right': x = Offsets[0];
        }
        switch (Anchors[1]) {
            case 'top-height':
                Height = Offsets[3];
                break;
            case 'height-bottom':
                Height = Offsets[2];
                break;
            case 'top-bottom': Height = outerHeight - Offsets[2] - Offsets[3];
        }
        // @ts-ignore TS2454 "Height" will definitely have a value
        Height = Math.max(0, this._minHeight || 0, Math.min(Height, this._maxHeight == null ? Infinity : this._maxHeight));
        switch (Anchors[1]) {
            case 'top-height':
                y = Offsets[2];
                break;
            case 'height-bottom':
                y = outerHeight - Offsets[3] - Height;
                break;
            case 'top-bottom': y = Offsets[2];
        }
        // @ts-ignore TS2454 "x" and "y" will definitely have values
        return { x, y, Width, Height };
    }
    set Geometry(newGeometry) {
        expectIncompleteGeometry('widget geometry', newGeometry);
        this.changeGeometryTo(newGeometry.x, newGeometry.y, newGeometry.Width, newGeometry.Height);
    }
    /**** changeGeometryBy  ****/
    changeGeometryBy(dx, dy, dWidth, dHeight) {
        allowFiniteNumber('dx', dx);
        allowFiniteNumber('dy', dy);
        allowFiniteNumber('dWidth', dWidth);
        allowFiniteNumber('dHeight', dHeight);
        const { x, y, Width, Height } = this.Geometry;
        this.changeGeometryTo(x + (dx || 0), y + (dy || 0), Width + (dWidth || 0), Height + (dHeight || 0));
    }
    /**** changeGeometryTo  ****/
    changeGeometryTo(newX, newY, newWidth, newHeight) {
        allowLocation('x coordinate', newX);
        allowLocation('y coordinate', newY);
        allowDimension('widget width', newWidth);
        allowDimension('widget height', newHeight);
        if (newX != null) {
            newX = Math.round(newX);
        }
        if (newY != null) {
            newY = Math.round(newY);
        }
        if (newWidth != null) {
            newWidth = Math.round(newWidth);
        }
        if (newHeight != null) {
            newHeight = Math.round(newHeight);
        }
        const curAnchors = this.Anchors;
        const curGeometry = this.Geometry;
        /**** keep any new Width and Height settings within confiured limits ****/
        if (newWidth != null) {
            newWidth = Math.max(0, this._minWidth || 0, Math.min(newWidth, this._maxWidth == null ? Infinity : this._maxWidth));
        }
        if (newHeight != null) {
            newHeight = Math.max(0, this._minHeight || 0, Math.min(newHeight, this._maxHeight == null ? Infinity : this._maxHeight));
        }
        /**** consider real changes only ****/
        if (newX === curGeometry.x) {
            newX = undefined;
        }
        if (newY === curGeometry.y) {
            newY = undefined;
        }
        if (newWidth === curGeometry.Width) {
            newWidth = undefined;
        }
        if (newHeight === curGeometry.Height) {
            newHeight = undefined;
        }
        if ((newX == null) && (newWidth == null) &&
            (newY == null) && (newHeight == null)) {
            return;
        }
        /**** if need be, calculate container dimensions ****/
        let outerWidth = 0, outerHeight = 0;
        if ((curAnchors[0] !== 'left-width') || (curAnchors[1] !== 'top-height')) {
            const Container = this._Container;
            if (Container == null)
                throwError('NotAttached: relative geometries can only be changed for attached widgets');
            ({ Width: outerWidth, Height: outerHeight } = Container.Geometry);
        }
        /**** now update any affected Offsets ****/
        if ((newX != null) || (newWidth != null)) {
            if (newX == null) {
                newX = curGeometry.x;
            }
            if (newWidth == null) {
                newWidth = curGeometry.Width;
            }
            switch (curAnchors[0]) {
                case 'left-width':
                    this._Offsets[0] = newX;
                    this._Offsets[1] = newWidth;
                    break;
                case 'width-right':
                    this._Offsets[0] = newWidth;
                    this._Offsets[1] = outerWidth - newX - newWidth;
                    break;
                case 'left-right':
                    this._Offsets[0] = newX;
                    this._Offsets[1] = outerWidth - newX - newWidth;
            }
        }
        if ((newY != null) || (newHeight != null)) {
            if (newY == null) {
                newY = curGeometry.y;
            }
            if (newHeight == null) {
                newHeight = curGeometry.Height;
            }
            switch (curAnchors[1]) {
                case 'top-height':
                    this._Offsets[2] = newY;
                    this._Offsets[3] = newHeight;
                    break;
                case 'height-bottom':
                    this._Offsets[2] = newHeight;
                    this._Offsets[3] = outerHeight - newY - newHeight;
                    break;
                case 'top-bottom':
                    this._Offsets[2] = newY;
                    this._Offsets[3] = outerHeight - newY - newHeight;
            }
        }
        this.rerender();
    }
    get Anchors() {
        return this._Anchors.slice();
    }
    set Anchors(newAnchors) {
        expectList('widget anchors', newAnchors);
        expectOneOf('horizontal widget anchors', newAnchors[0], WAT_horizontalAnchorses);
        expectOneOf('vertical widget anchors', newAnchors[1], WAT_verticalAnchorses);
        const curAnchors = this.Anchors;
        /**** consider real changes only ****/
        if ((newAnchors[0] === curAnchors[0]) && (newAnchors[1] === curAnchors[1])) {
            return;
        }
        const curGeometry = this.Geometry; // already within constraints
        /**** if need be, calculate container dimensions ****/
        let outerWidth = 0, outerHeight = 0;
        if ((newAnchors[0] !== curAnchors[0]) && (newAnchors[0] !== 'left-width') ||
            (newAnchors[1] !== curAnchors[1]) && (newAnchors[1] !== 'top-height')) {
            const Container = this._Container;
            if (Container == null)
                throwError('NotAttached: relative geometries can only be calculated for attached widgets');
            ({ Width: outerWidth, Height: outerHeight } = Container.Geometry);
        }
        this._Anchors = newAnchors.slice();
        if (newAnchors[0] !== curAnchors[0]) {
            switch (newAnchors[0]) {
                case 'left-width':
                    this._Offsets[0] = curGeometry.x;
                    this._Offsets[1] = curGeometry.Width;
                    break;
                case 'width-right':
                    this._Offsets[0] = curGeometry.Width;
                    this._Offsets[1] = outerWidth - curGeometry.x - curGeometry.Width;
                    break;
                case 'left-right':
                    this._Offsets[0] = curGeometry.x;
                    this._Offsets[1] = outerWidth - curGeometry.x - curGeometry.Width;
            }
        }
        if (newAnchors[1] !== curAnchors[1]) {
            switch (newAnchors[1]) {
                case 'top-height':
                    this._Offsets[2] = curGeometry.y;
                    this._Offsets[3] = curGeometry.Height;
                    break;
                case 'height-bottom':
                    this._Offsets[2] = curGeometry.Height;
                    this._Offsets[3] = outerHeight - curGeometry.y - curGeometry.Height;
                    break;
                case 'top-bottom':
                    this._Offsets[2] = curGeometry.y;
                    this._Offsets[3] = outerHeight - curGeometry.y - curGeometry.Height;
            }
        }
        this.rerender();
    }
    get Offsets() {
        return this._Offsets.slice();
    }
    set Offsets(newOffsets) {
        expectListSatisfying('widget offsets', newOffsets, (Value) => (Value == null) || ValueIsFiniteNumber(Value), undefined, 4, 4);
        // more specific validations will follow below
        const curAnchors = this.Anchors;
        const curOffsets = this.Offsets;
        /**** consider real changes only ****/
        if (((newOffsets[0] == null) || (newOffsets[0] === curOffsets[0])) &&
            ((newOffsets[1] == null) || (newOffsets[1] === curOffsets[1])) &&
            ((newOffsets[2] == null) || (newOffsets[2] === curOffsets[2])) &&
            ((newOffsets[3] == null) || (newOffsets[3] === curOffsets[3]))) {
            return;
        }
        /**** now update offsets ****/
        if ((newOffsets[0] != null) || (newOffsets[1] != null)) {
            switch (curAnchors[0]) {
                case 'left-width':
                    allowLocation('x coordinate', newOffsets[0]);
                    allowDimension('widget width', newOffsets[1]);
                    break;
                case 'width-right':
                    allowDimension('widget width', newOffsets[0]);
                    allowLocation('right offset', newOffsets[1]);
                    break;
                case 'left-right':
                    allowLocation('x coordinate', newOffsets[0]);
                    allowLocation('right offset', newOffsets[1]);
            }
            if (newOffsets[0] != null) {
                this._Offsets[0] = newOffsets[0];
            }
            if (newOffsets[1] != null) {
                this._Offsets[1] = newOffsets[1];
            }
        }
        if ((newOffsets[2] != null) || (newOffsets[3] != null)) {
            switch (curAnchors[1]) {
                case 'top-height':
                    allowLocation('y coordinate', newOffsets[2]);
                    allowDimension('widget height', newOffsets[3]);
                    break;
                case 'height-bottom':
                    allowDimension('widget height', newOffsets[2]);
                    allowLocation('bottom offset', newOffsets[3]);
                    break;
                case 'top-bottom':
                    allowLocation('y coordinate', newOffsets[2]);
                    allowLocation('bottom offset', newOffsets[3]);
            }
            if (newOffsets[2] != null) {
                this._Offsets[2] = newOffsets[2];
            }
            if (newOffsets[3] != null) {
                this._Offsets[3] = newOffsets[3];
            }
        }
        this.rerender();
    }
    get Overflows() {
        return acceptableValue((this._Overflows == null ? undefined : this._Overflows.slice()), (Value) => ValueIsListOf(Value, WAT_Overflows), ['visible', 'visible']);
    }
    set Overflows(newValue) {
        allowListOf('overflow settings', newValue, WAT_Overflows);
        if (ValuesDiffer(this._Overflows, newValue)) {
            this._Overflows = (newValue == null ? undefined : newValue.slice());
            this.rerender();
        }
    }
    /**** Overlay - which Overlay contains this widget? ****/
    get Overlay() {
        const View = this.View;
        if (View == null) {
            return undefined;
        }
        const OverlayElement = View.closest('.WAT.AppletOverlay,.WAT.Dialog,.WAT.WidgetOverlay');
        if (OverlayElement == null) {
            return undefined;
        }
        return OverlayElement['_Overlay'];
    }
    set Overlay(_) { throwReadOnlyError('Overlay'); }
    /**** AppletOverlay - which AppletOverlay contains this widget? ****/
    get AppletOverlay() {
        const View = this.View;
        if (View == null) {
            return undefined;
        }
        const OverlayElement = View.closest('.WAT.AppletOverlay,.WAT.Dialog');
        if (OverlayElement == null) {
            return undefined;
        }
        return OverlayElement['_Overlay'];
    }
    set AppletOverlay(_) { throwReadOnlyError('AppletOverlay'); }
    /**** Dialog - which AppletOverlay contains this widget? ****/
    get Dialog() {
        const View = this.View;
        if (View == null) {
            return undefined;
        }
        const OverlayElement = View.closest('.WAT.Dialog');
        if (OverlayElement == null) {
            return undefined;
        }
        return OverlayElement['_Overlay'];
    }
    set Dialog(_) { throwReadOnlyError('Dialog'); }
    /**** WidgetOverlay - which WidgetOverlay contains this widget? ****/
    get WidgetOverlay() {
        const View = this.View;
        if (View == null) {
            return undefined;
        }
        const OverlayElement = View.closest('.WAT.WidgetOverlay');
        if (OverlayElement == null) {
            return undefined;
        }
        return OverlayElement['_Overlay'];
    }
    set WidgetOverlay(_) { throwReadOnlyError('WidgetOverlay'); }
    OverlayNamed(OverlayName) {
        const OverlayIndex = this.IndexOfOverlay(OverlayName);
        return this._OverlayList[OverlayIndex]; // even if OverlayIndex = -1
    }
    /**** existingOverlayNamed ****/
    existingOverlayNamed(OverlayName) {
        const OverlayIndex = this.IndexOfOverlay(OverlayName);
        if (OverlayIndex < 0)
            throwError(`NotFound: no overlay named ${quoted(OverlayName)} found`);
        return this._OverlayList[OverlayIndex];
    }
    /**** IndexOfOverlay ****/
    IndexOfOverlay(OverlayName) {
        expectName('overlay name', OverlayName);
        const normalizedName = OverlayName.toLowerCase();
        return this._OverlayList.findIndex((Overlay) => Overlay.normalizedName === normalizedName);
    }
    /**** openOverlay ****/
    openOverlay(Descriptor) {
        if (this.OverlayIsOpen(Descriptor.Name))
            throwError(`AlreadyOpen: an overlay named ${quoted(Descriptor.Name)} is already open`);
        const Overlay = new WAT_WidgetOverlay(this, Descriptor);
        this._OverlayList.push(Overlay);
        this.rerender();
        if (Overlay.onOpen != null) {
            Overlay.onOpen(Overlay);
        }
    }
    /**** closeOverlay ****/
    closeOverlay(OverlayName) {
        const OverlayIndex = this.IndexOfOverlay(OverlayName);
        if (OverlayIndex < 0) {
            return;
        }
        const [Overlay] = this._OverlayList.splice(OverlayIndex, 1);
        // @ts-ignore TS2445 I know, it's a hack, but allow access to protected members here
        if (Overlay._View != null) {
            Overlay._View._releaseWidgets();
        }
        this.rerender();
        if (Overlay.onClose != null) {
            Overlay.onClose(Overlay);
        }
    }
    /**** closeAllOverlays ****/
    closeAllOverlays() {
        if (this._OverlayList.length > 0) {
            this._OverlayList.slice().forEach((Overlay) => this.closeOverlay(Overlay.Name));
        }
    }
    /**** OverlayIsOpen ****/
    OverlayIsOpen(OverlayName) {
        return (this.OverlayNamed(OverlayName) != null);
    }
    /**** openOverlays ****/
    openOverlays() {
        return this._OverlayList.map((Overlay) => Overlay.Name);
    }
    /**** GeometryOfOverlay ****/
    GeometryOfOverlay(OverlayName) {
        const Overlay = this.existingOverlayNamed(OverlayName);
        const { x, y, Width, Height } = Overlay;
        return { x, y, Width, Height };
    }
    /**** moveOverlayBy ****/
    moveOverlayBy(OverlayName, dx, dy) {
        const Overlay = this.existingOverlayNamed(OverlayName);
        expectNumber('dx', dx);
        expectNumber('dy', dy);
        this.moveOverlayTo(OverlayName, Overlay.x + dx, Overlay.y + dy); // DRY
    }
    /**** moveOverlayTo ****/
    moveOverlayTo(OverlayName, x, y) {
        const Overlay = this.existingOverlayNamed(OverlayName);
        expectLocation('x coordinate', x);
        expectLocation('y coordinate', y);
        Overlay.x = x;
        Overlay.y = y;
        this.rerender();
    }
    /**** sizeOverlayBy ****/
    sizeOverlayBy(OverlayName, dW, dH) {
        const Overlay = this.existingOverlayNamed(OverlayName);
        expectNumber('dW', dW);
        expectNumber('dH', dH);
        this.sizeOverlayTo(OverlayName, Overlay.Width + dW, Overlay.Height + dH); // DRY
    }
    /**** sizeOverlayTo ****/
    sizeOverlayTo(OverlayName, Width, Height) {
        const Overlay = this.existingOverlayNamed(OverlayName);
        expectDimension('Width', Width);
        expectDimension('Height', Height);
        Overlay.Width = Math.max(Overlay.minWidth || 0, Math.min(Width, Overlay.maxWidth || Infinity));
        Overlay.Height = Math.max(Overlay.minHeight || 0, Math.min(Height, Overlay.maxHeight || Infinity));
        this.rerender();
    }
    /**** Serialization ****/
    get Serialization() {
        const Result = {};
        this._serializeConfigurationInto(Result);
        return Result;
    }
    set Serialization(_) { throwReadOnlyError('Serialization'); }
    /**** _serializeConfigurationInto ****/
    _serializeConfigurationInto(Serialization) {
        super._serializeConfigurationInto(Serialization);
        if (this.Lock == true) {
            Serialization.Lock = true;
        }
        if (this.Visibility == false) {
            Serialization.Visibility = false;
        }
        if (this.Enabling == false) {
            Serialization.Enabling = false;
        }
        if (ValuesDiffer(this._Anchors, ['left-width', 'top-height'])) {
            Serialization.Anchors = this.Anchors;
        }
        Serialization.Offsets = this.Offsets;
        [
            'minWidth', 'maxWidth', 'minHeight', 'maxHeight',
        ].forEach((Name) => this._serializePropertyInto(Name, Serialization));
    }
    /**** _deserializeConfigurationFrom ****/
    _deserializeConfigurationFrom(Serialization) {
        const deserializeProperty = (Name) => {
            if (Serialization[Name] != null) {
                try {
                    // @ts-ignore TS7053 allow indexing of "this" and "Serialization"
                    this[Name] = Serialization[Name]; // also validates the given value
                }
                catch (Signal) {
                    console.warn('DeserializationError: invalid value for property ' +
                        quoted(Name) + ' in visual ' + quoted(this.Path));
                }
            }
        };
        /**** Anchors and Offsets require some special attention ****/
        let newAnchors = Serialization.Anchors;
        if (ValueIsList(newAnchors) &&
            ValueIsOneOf(newAnchors[0], WAT_horizontalAnchorses) &&
            ValueIsOneOf(newAnchors[1], WAT_verticalAnchorses)) {
            this._Anchors = newAnchors.slice();
        }
        let Anchors = this.Anchors;
        let newOffsets = Serialization.Offsets;
        if (ValueIsListSatisfying(newOffsets, ValueIsFiniteNumber, 4, 4)) {
            if (((Anchors[0] === 'left-width') && ValueIsDimension(newOffsets[1]) ||
                (Anchors[0] === 'left-right') ||
                (Anchors[0] === 'width-right') && ValueIsDimension(newOffsets[0])) && ((Anchors[1] === 'top-height') && ValueIsDimension(newOffsets[3]) ||
                (Anchors[1] === 'top-bottom') ||
                (Anchors[1] === 'height-bottom') && ValueIsDimension(newOffsets[2]))) {
                this._Offsets = newOffsets.slice();
            }
            else {
                console.warn('DeserializationError: invalid value for property ' +
                    quoted('Offsets') + ' in visual ' + quoted(this.Path));
            }
        }
        else if (newOffsets != null) {
            console.warn('DeserializationError: invalid value for property ' +
                quoted('Offsets') + ' in visual ' + quoted(this.Path));
        }
        /**** the remaining properties are simpler ****/
        ;
        [
            'Lock', 'Visibility', 'Enabling',
            'minWidth', 'maxWidth', 'minHeight', 'maxHeight',
        ].forEach((Name) => deserializeProperty(Name));
        /**** common properties including "activeScript" ****/
        super._deserializeConfigurationFrom(Serialization);
    }
}
//------------------------------------------------------------------------------
//--                            WAT_AppletOverlay                             --
//------------------------------------------------------------------------------
class WAT_AppletOverlay {
    constructor(Applet, Descriptor) {
        Object.defineProperty(this, "_Applet", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_View", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_Name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_normalizedName", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_isModal", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_Anchoring", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_x", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_Width", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_y", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_Height", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_minWidth", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_maxWidth", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_minHeight", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_maxHeight", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_SourceWidgetPath", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_onOpen", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_onClose", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        expectApplet('overlay applet', Applet);
        this._Applet = Applet;
        expectPlainObject('overlay descriptor', Descriptor);
        expectName('overlay name', Descriptor.Name);
        allowBoolean('overlay modality', Descriptor.isModal);
        allowList('anchoring', Descriptor.Anchoring);
        allowLocation('overlay x coordinate', Descriptor.x);
        allowLocation('overlay y coordinate', Descriptor.y);
        allowDimension('overlay width', Descriptor.Width);
        allowDimension('overlay height', Descriptor.Height);
        allowDimension('minimal overlay width', Descriptor.minWidth);
        allowDimension('maximal overlay width', Descriptor.maxWidth);
        allowDimension('minimal overlay height', Descriptor.minHeight);
        allowDimension('maximal overlay height', Descriptor.maxHeight);
        allowFunction('"onOpen" callback', Descriptor.onOpen);
        allowFunction('"onClose" callback', Descriptor.onClose);
        let { Name, isModal, Anchoring, x, y, Width, Height, minWidth, maxWidth, minHeight, maxHeight, onOpen, onClose } = Descriptor;
        if (Anchoring != null) {
            expectOneOf('horizontal anchoring', Anchoring[0], ['left', 'right']);
            expectOneOf('vertical anchoring', Anchoring[1], ['top', 'bottom']);
        }
        this._Name = Name;
        this._normalizedName = Name.toLowerCase();
        this._isModal = (isModal || false);
        this._Anchoring = (Anchoring == null ? ['left', 'top'] : Anchoring.slice(0, 2));
        this._minWidth = Math.max(0, minWidth || 0);
        this._maxWidth = maxWidth;
        this._minHeight = Math.max(0, minHeight || 0);
        this._maxHeight = maxHeight;
        this._x = x;
        this._onOpen = onOpen;
        this._y = y;
        this._onClose = onClose;
        let SourceWidget, SourceWidgetPath;
        switch (true) {
            case Descriptor.SourceWidget == null:
                throwError('MissingArgument: no source widget path given');
            case ValueIsPath(Descriptor.SourceWidget):
                SourceWidgetPath = Descriptor.SourceWidget;
                SourceWidget = Applet.WidgetAtPath(SourceWidgetPath);
                if (SourceWidget == null)
                    throwError(`NoSuchWidget: no widget at path ${quoted(Descriptor.SourceWidget)} found`);
                break;
            case ValueIsWidget(Descriptor.SourceWidget):
                SourceWidget = Descriptor.SourceWidget;
                SourceWidgetPath = SourceWidget.Path;
                break;
            default:
                throwError('InvalidArgument: the given source widget is neither a widget ' +
                    'nor a widget path');
        }
        this._SourceWidgetPath = SourceWidgetPath;
        if ((Width == null) || (Height == null)) {
            let SourceGeometry = SourceWidget.Geometry;
            if (Width == null) {
                Width = SourceGeometry.Width;
            }
            if (Height == null) {
                Height = SourceGeometry.Height;
            }
        }
        this._Width = Math.max(this._minWidth, Math.min(Width, maxWidth || Infinity));
        this._Height = Math.max(this._minHeight, Math.min(Height, maxHeight || Infinity));
    }
    /**** Applet ****/
    get Applet() { return this._Applet; }
    set Applet(_) { throwReadOnlyError('Applet'); }
    /**** Name ****/
    get Name() { return this._Name; }
    set Name(_) { throwReadOnlyError('Name'); }
    /**** normalizedName ****/
    get normalizedName() { return this._normalizedName; }
    set normalizedName(_) { throwReadOnlyError('normalizedName'); }
    /**** isModal ****/
    get isModal() { return this._isModal; }
    set isModal(_) { throwReadOnlyError('isModal'); }
    /**** Anchoring ****/
    get Anchoring() { return this._Anchoring.slice(); }
    set Anchoring(_) { throwReadOnlyError('Anchoring'); }
    /**** SourceWidgetPath ****/
    get SourceWidgetPath() { return this._SourceWidgetPath; }
    set SourceWidgetPath(_) { throwReadOnlyError('SourceWidgetPath'); }
    /**** onOpen ****/
    get onOpen() { return this._onOpen; }
    set onOpen(_) { throwReadOnlyError('onOpen'); }
    /**** onClose ****/
    get onClose() { return this._onClose; }
    set onClose(_) { throwReadOnlyError('onClose'); }
    /**** x ****/
    get x() { return this._x; }
    set x(newX) {
        allowLocation('overlay x position', newX);
        if (this._x !== newX) {
            this._x = newX;
            this._Applet.rerender();
        }
    }
    /**** y ****/
    get y() { return this._y; }
    set y(newY) {
        allowLocation('overlay y position', newY);
        if (this._y !== newY) {
            this._y = newY;
            this._Applet.rerender();
        }
    }
    /**** Width ****/
    get Width() { return this._Width; }
    set Width(newWidth) {
        expectDimension('overlay width', newWidth);
        if (this._Width !== newWidth) {
            this._Width = newWidth;
            this._Applet.rerender();
        }
    }
    /**** Height ****/
    get Height() { return this._Height; }
    set Height(newHeight) {
        expectDimension('overlay height', newHeight);
        if (this._Height !== newHeight) {
            this._Height = newHeight;
            this._Applet.rerender();
        }
    }
    /**** minWidth ****/
    get minWidth() { return this._minWidth; }
    set minWidth(newValue) {
        expectDimension('minimal overlay width', newValue);
        if (this._minWidth !== newValue) {
            this._minWidth = newValue;
            this._Applet.rerender();
        }
    }
    /**** maxWidth ****/
    get maxWidth() { return this._maxWidth; }
    set maxWidth(newValue) {
        allowDimension('maximal overlay width', newValue);
        if (this._maxWidth !== newValue) {
            this._maxWidth = newValue;
            this._Applet.rerender();
        }
    }
    /**** minHeight ****/
    get minHeight() { return this._minHeight; }
    set minHeight(newValue) {
        expectDimension('minimal overlay height', newValue);
        if (this._minHeight !== newValue) {
            this._minHeight = newValue;
            this._Applet.rerender();
        }
    }
    /**** maxHeight ****/
    get maxHeight() { return this._maxHeight; }
    set maxHeight(newValue) {
        allowDimension('maximal overlay height', newValue);
        if (this._maxHeight !== newValue) {
            this._maxHeight = newValue;
            this._Applet.rerender();
        }
    }
    /**** close ****/
    close() {
        this._Applet.closeOverlay(this._Name);
    }
}
//------------------------------------------------------------------------------
//--                                WAT_Dialog                                --
//------------------------------------------------------------------------------
class WAT_Dialog extends WAT_AppletOverlay {
    constructor(Applet, Descriptor) {
        super(Applet, Descriptor);
        Object.defineProperty(this, "_Title", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_isClosable", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_isDraggable", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_isResizable", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        allowTextline('dialog title', Descriptor.Title);
        allowBoolean('dialog closability', Descriptor.isClosable);
        allowBoolean('dialog draggability', Descriptor.isDraggable);
        allowBoolean('dialog resizability', Descriptor.isResizable);
        let { Title, isClosable, isDraggable, isResizable } = Descriptor;
        this._isClosable = (isClosable || false);
        this._isDraggable = (isDraggable || false);
        this._isResizable = (isResizable || false);
        if (Title == null) {
            if (isClosable || isDraggable) {
                Title = this._Name;
            }
        }
        this._Title = Title;
        /**** allow room for dialog decoration ****/
        if (isClosable) {
            this._minWidth = Math.max(30 + 10, this._minWidth);
        }
        if (this._maxWidth != null) {
            this._maxWidth = Math.max(this._maxWidth, this._minWidth);
        }
        if ((Title != null) || isClosable || isDraggable) {
            this._Height += 30;
            this._minHeight += 30;
        }
        if (isResizable) {
            this._Height += 10;
            this._minHeight += 10;
        }
        if (this._maxHeight != null) {
            if ((Title != null) || isClosable || isDraggable) {
                this._maxHeight += 30;
            }
            if (isResizable) {
                this._maxHeight += 10;
            }
        }
        this._Width = Math.max(this._minWidth, Math.min(this._Width, this._maxWidth || Infinity));
        this._Height = Math.max(this._minHeight, Math.min(this._Height, this._maxHeight || Infinity));
    }
    /**** Title ****/
    get Title() { return this._Title; }
    set Title(_) { throwReadOnlyError('Title'); }
    /**** isClosable ****/
    get isClosable() { return this._isClosable; }
    set isClosable(_) { throwReadOnlyError('isClosable'); }
    /**** isDraggable ****/
    get isDraggable() { return this._isDraggable; }
    set isDraggable(_) { throwReadOnlyError('isDraggable'); }
    /**** isResizable ****/
    get isResizable() { return this._isResizable; }
    set isResizable(_) { throwReadOnlyError('isResizable'); }
}
//------------------------------------------------------------------------------
//--                            WAT_WidgetOverlay                             --
//------------------------------------------------------------------------------
class WAT_WidgetOverlay {
    constructor(Widget, Descriptor) {
        var _a;
        Object.defineProperty(this, "_Widget", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_View", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_Name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_normalizedName", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_isModal", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_x", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_Width", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_y", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_Height", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_minWidth", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_maxWidth", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_minHeight", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_maxHeight", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_SourceWidgetPath", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_onOpen", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_onClose", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        expectWidget('overlay widget', Widget);
        this._Widget = Widget;
        expectPlainObject('overlay descriptor', Descriptor);
        expectName('overlay name', Descriptor.Name);
        allowBoolean('overlay modality', Descriptor.isModal);
        allowLocation('overlay x coordinate', Descriptor.x);
        allowLocation('overlay y coordinate', Descriptor.y);
        allowDimension('overlay width', Descriptor.Width);
        allowDimension('overlay height', Descriptor.Height);
        allowDimension('minimal overlay width', Descriptor.minWidth);
        allowDimension('maximal overlay width', Descriptor.maxWidth);
        allowDimension('minimal overlay height', Descriptor.minHeight);
        allowDimension('maximal overlay height', Descriptor.maxHeight);
        allowFunction('"onOpen" callback', Descriptor.onOpen);
        allowFunction('"onClose" callback', Descriptor.onClose);
        let { Name, isModal, x, y, Width, Height, minWidth, maxWidth, minHeight, maxHeight, onOpen, onClose } = Descriptor;
        this._Name = Name;
        this._normalizedName = Name.toLowerCase();
        this._isModal = (isModal || false);
        this._minWidth = Math.max(0, minWidth || 0);
        this._maxWidth = maxWidth;
        this._minHeight = Math.max(0, minHeight || 0);
        this._maxHeight = maxHeight;
        this._x = (x || 0);
        this._onOpen = onOpen;
        this._y = (y || 0);
        this._onClose = onClose;
        let SourceWidget, SourceWidgetPath;
        switch (true) {
            case Descriptor.SourceWidget == null:
                throwError('MissingArgument: no source widget path given');
            case ValueIsPath(Descriptor.SourceWidget):
                SourceWidgetPath = Descriptor.SourceWidget;
                SourceWidget = (_a = Widget.Applet) === null || _a === void 0 ? void 0 : _a.WidgetAtPath(SourceWidgetPath);
                if (SourceWidget == null)
                    throwError(`NoSuchWidget: no widget at path ${quoted(Descriptor.SourceWidget)} found`);
                break;
            case ValueIsWidget(Descriptor.SourceWidget):
                SourceWidget = Descriptor.SourceWidget;
                SourceWidgetPath = SourceWidget.Path;
                break;
            default:
                throwError('InvalidArgument: the given source widget is neither a widget ' +
                    'nor a widget path');
        }
        this._SourceWidgetPath = SourceWidgetPath;
        if ((Width == null) || (Height == null)) {
            let SourceGeometry = SourceWidget.Geometry;
            if (Width == null) {
                Width = SourceGeometry.Width;
            }
            if (Height == null) {
                Height = SourceGeometry.Height;
            }
        }
        this._Width = Math.max(this._minWidth, Math.min(Width, maxWidth || Infinity));
        this._Height = Math.max(this._minHeight, Math.min(Height, maxHeight || Infinity));
    }
    /**** Widget ****/
    get Widget() { return this._Widget; }
    set Widget(_) { throwReadOnlyError('Widget'); }
    /**** Name ****/
    get Name() { return this._Name; }
    set Name(_) { throwReadOnlyError('Name'); }
    /**** normalizedName ****/
    get normalizedName() { return this._normalizedName; }
    set normalizedName(_) { throwReadOnlyError('normalizedName'); }
    /**** isModal ****/
    get isModal() { return this._isModal; }
    set isModal(_) { throwReadOnlyError('isModal'); }
    /**** SourceWidgetPath ****/
    get SourceWidgetPath() { return this._SourceWidgetPath; }
    set SourceWidgetPath(_) { throwReadOnlyError('SourceWidgetPath'); }
    /**** onOpen ****/
    get onOpen() { return this._onOpen; }
    set onOpen(_) { throwReadOnlyError('onOpen'); }
    /**** onClose ****/
    get onClose() { return this._onClose; }
    set onClose(_) { throwReadOnlyError('onClose'); }
    /**** x ****/
    get x() { return this._x; }
    set x(newX) {
        expectLocation('overlay x position', newX);
        if (this._x !== newX) {
            this._x = newX;
            this._Widget.rerender();
        }
    }
    /**** y ****/
    get y() { return this._y; }
    set y(newY) {
        expectLocation('overlay y position', newY);
        if (this._y !== newY) {
            this._y = newY;
            this._Widget.rerender();
        }
    }
    /**** Width ****/
    get Width() { return this._Width; }
    set Width(newWidth) {
        expectDimension('overlay width', newWidth);
        if (this._Width !== newWidth) {
            this._Width = newWidth;
            this._Widget.rerender();
        }
    }
    /**** Height ****/
    get Height() { return this._Height; }
    set Height(newHeight) {
        expectDimension('overlay height', newHeight);
        if (this._Height !== newHeight) {
            this._Height = newHeight;
            this._Widget.rerender();
        }
    }
    /**** minWidth ****/
    get minWidth() { return this._minWidth; }
    set minWidth(newValue) {
        expectDimension('minimal overlay width', newValue);
        if (this._minWidth !== newValue) {
            this._minWidth = newValue;
            this._Widget.rerender();
        }
    }
    /**** maxWidth ****/
    get maxWidth() { return this._maxWidth; }
    set maxWidth(newValue) {
        allowDimension('maximal overlay width', newValue);
        if (this._maxWidth !== newValue) {
            this._maxWidth = newValue;
            this._Widget.rerender();
        }
    }
    /**** minHeight ****/
    get minHeight() { return this._minHeight; }
    set minHeight(newValue) {
        expectDimension('minimal overlay height', newValue);
        if (this._minHeight !== newValue) {
            this._minHeight = newValue;
            this._Widget.rerender();
        }
    }
    /**** maxHeight ****/
    get maxHeight() { return this._maxHeight; }
    set maxHeight(newValue) {
        allowDimension('maximal overlay height', newValue);
        if (this._maxHeight !== newValue) {
            this._maxHeight = newValue;
            this._Widget.rerender();
        }
    }
    /**** close ****/
    close() {
        this._Widget.closeOverlay(this._Name);
    }
}
//------------------------------------------------------------------------------
//--                           built-in Behaviours                            --
//------------------------------------------------------------------------------
/**** for ImageView ****/
export const WAT_ImageScalings = ['none', 'stretch', 'cover', 'contain'];
export const WAT_ImageAlignments = [
    'left top', 'center top', 'right top', 'left center', 'center center',
    'right center', 'left bottom', 'center bottom', 'right bottom'
];
/**** for WebView ****/
// *C* SECURITY: do not add "allow-same-origin" together with "allow-scripts" - it defeats the sandbox
export const WAT_DefaultSandboxPermissions = ('allow-downloads allow-forms allow-modals allow-orientation-lock ' +
    'allow-pointer-lock allow-popups allow-scripts');
export const WAT_ReferrerPolicies = [
    'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin',
    'same-origin', 'strict-origin', 'strict-origin-when-cross-origin',
    'unsafe-url'
];
/**** for Slider ****/
const HashmarkPattern = /^\s*([+-]?(\d+([.]\d+)?|[.]\d+)([eE][+-]?\d+)?|\d+[.]\d*)(?:\s*:\s*([^\x00-\x1F\x7F-\x9F  ￹-￻]+))?$/;
function HashmarkMatcher(Value) {
    return ValueIsStringMatching(Value, HashmarkPattern) || ValueIsNumber(Value);
}
/**** for TimeInput ****/
export const WAT_TimePattern = '\\d{2}:\\d{2}(?::\\d{2})?';
export const WAT_TimeRegExp = /^\d{2}:\d{2}(?::\d{2})?$/;
export function WAT_TimeMatcher(Value) {
    return ValueIsStringMatching(Value, WAT_TimeRegExp);
}
/**** for DateTimeInput ****/
export const WAT_DateTimePattern = '\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}(?::\\d{2})?';
export const WAT_DateTimeRegExp = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(?::\d{2})?$/;
export function WAT_DateTimeMatcher(Value) {
    return ValueIsStringMatching(Value, WAT_DateTimeRegExp);
}
/**** for DateInput ****/
export const WAT_DatePattern = '\\d{4}-\\d{2}-\\d{2}';
export const WAT_DateRegExp = /^\d{4}-\d{2}-\d{2}$/;
export function WAT_DateMatcher(Value) {
    return ValueIsStringMatching(Value, WAT_DateRegExp);
}
/**** for WeekInput ****/
export const WAT_WeekPattern = '\\d{4}-W\\d{2}';
export const WAT_WeekRegExp = /^\d{4}-W\d{2}$/;
export function WAT_WeekMatcher(Value) {
    return ValueIsStringMatching(Value, WAT_WeekRegExp);
}
/**** for MonthInput ****/
export const WAT_MonthPattern = '\\d{4}-\\d{2}';
export const WAT_MonthRegExp = /^\d{4}-\d{2}$/;
export function WAT_MonthMatcher(Value) {
    return ValueIsStringMatching(Value, WAT_MonthRegExp);
}
/**** for MarkdownView ****/
import { Marked } from 'marked';
import hljs from 'highlight.js/lib/core';
import { default as _css } from 'highlight.js/lib/languages/css';
hljs.registerLanguage('css', _css);
import { default as _javascript } from 'highlight.js/lib/languages/javascript';
hljs.registerLanguage('javascript', _javascript);
import { default as _java } from 'highlight.js/lib/languages/java';
hljs.registerLanguage('java', _java);
import { default as _json } from 'highlight.js/lib/languages/json';
hljs.registerLanguage('json', _json);
import { default as _typescript } from 'highlight.js/lib/languages/typescript';
hljs.registerLanguage('typescript', _typescript);
import { default as _xml } from 'highlight.js/lib/languages/xml';
hljs.registerLanguage('html', _xml);
hljs.registerLanguage('xml', _xml);
/**** now actually register all intrinsic behaviours ****/
function registerIntrinsicBehaviorsIn(Applet) {
    /**** plain_Widget ****/
    const WAT_plainWidget = async (me, my, html, reactively, on, onReady, onRender, onMount, onUpdate, onUnmount, onValueChange, installStylesheet, BehaviorIsNew) => {
        my.configurableProperties = [
            { Name: 'visiblePattern', Label: 'visible Pattern', Default: true,
                EditorType: 'checkbox', AccessorsFor: 'memoized' },
        ];
        onRender(() => {
            return html `<div class="WAT Content ${my.visiblePattern === true ? 'Placeholder' : ''}"/>`;
        });
    };
    registerIntrinsicBehavior(Applet, 'widget', 'basic_controls.plain_Widget', WAT_plainWidget);
    /**** Outline ****/
    const WAT_Outline = async (me, my, html, reactively, on, onReady, onRender, onMount, onUpdate, onUnmount, onValueChange, installStylesheet, BehaviorIsNew) => {
        installStylesheet(`
      .WAT.Widget > .WAT.Outline {
        outline:dotted 1px blue;
        outline-offset:2px;
      }
    `);
        /**** custom Properties ****/
        my.configurableProperties = [
            // *C* "initialMaxWidth"/"initialMaxHeight" are not used by the runtime itself
            { Name: 'initialMaxWidth', Label: 'initial max. Width', minValue: 0, Stepping: 1,
                EditorType: 'integer-input', AccessorsFor: 'memoized' },
            { Name: 'initialMaxHeight', Label: 'initial max. Height', minValue: 0, Stepping: 1,
                EditorType: 'integer-input', AccessorsFor: 'memoized' },
        ];
        Object_assign(me, {
            /**** bundledWidgets ****/
            bundledWidgets: function () {
                const Page = this.Page;
                if (Page == null) {
                    return [];
                }
                const { x, y, Width, Height } = this.Geometry;
                const [minX, maxX, minY, maxY] = [x, x + Width, y, y + Height];
                return Page.WidgetList.filter((Widget) => {
                    if (Widget === this) {
                        return false;
                    }
                    const { x, y, Width, Height } = Widget.Geometry;
                    return ((x >= minX) && (x + Width <= maxX) &&
                        (y >= minY) && (y + Height <= maxY));
                });
            },
        });
        /**** Renderer ****/
        onRender(() => html `<div class="WAT Content Outline"/>`);
    };
    registerIntrinsicBehavior(Applet, 'widget', 'basic_controls.Outline', WAT_Outline);
    /**** WidgetPane ****/
    const WAT_WidgetPane = async (me, my, html, reactively, on, onReady, onRender, onMount, onUpdate, onUnmount, onValueChange, installStylesheet, BehaviorIsNew) => {
        var _a, _b;
        installStylesheet(`
      .WAT.Widget > .WAT.WidgetPane {
        overflow:hidden;
      }
    `);
        /**** custom Properties ****/
        my.configurableProperties = [
            { Name: 'Value',
                EditorType: 'textline-input', AccessorsFor: 'none', Placeholder: '(enter content path)' },
            { Name: 'visiblePattern', Label: 'visible Pattern', Default: true,
                EditorType: 'checkbox', AccessorsFor: 'memoized' },
        ];
        (_b = (_a = me)._releaseWidgets) === null || _b === void 0 ? void 0 : _b.call(_a);
        // *C* release widgets still claimed from a previous script activation
        Object_assign(me, {
            /**** Value ****/
            get Value() {
                return acceptableValue(this.memoized.Value, ValueIsPath);
            },
            set Value(newValue) {
                var _a;
                let SourceWidget, SourcePath;
                if (ValueIsWidget(newValue)) {
                    SourceWidget = newValue;
                    SourcePath = SourceWidget.Path;
                }
                else {
                    allowPath('widget pane source path', newValue);
                    if ((newValue == null) || (newValue.trim() === '')) {
                        SourceWidget = undefined;
                        SourcePath = undefined;
                    }
                    else {
                        SourceWidget = (_a = this.Applet) === null || _a === void 0 ? void 0 : _a.WidgetAtPath(newValue);
                        SourcePath = newValue;
                    }
                }
                if (SourceWidget != null) {
                    if (SourceWidget === this)
                        throwError('InvalidArgument: a WidgetPane can not show itself');
                    if (SourceWidget.Page === this.Page)
                        throwError('InvalidArgument: a WidgetPane can not show other widgets from the same page');
                }
                if (this.memoized.Value !== SourcePath) {
                    this.memoized.Value = SourcePath;
                    this.on('Value')(SourcePath);
                    this.rerender();
                }
            },
            /**** _releaseWidgets - releases all widgets shown by this pane ****/
            _shownWidgets: [],
            _releaseWidgets: function () {
                this._shownWidgets.forEach((Widget) => {
                    if (Widget._Pane === this) {
                        Widget._Pane = undefined;
                    }
                });
                this._shownWidgets = [];
            },
            componentWillUnmount: function () {
                this._releaseWidgets();
            },
            /**** _GeometryRelativeTo  ****/
            _GeometryOfWidgetRelativeTo: function (Widget, BaseGeometry, PaneGeometry) {
                const WidgetAnchors = Widget.Anchors;
                const { x: WidgetX, y: WidgetY, Width: WidgetWidth, Height: WidgetHeight } = Widget.Geometry;
                const { minWidth, minHeight, maxWidth, maxHeight } = Widget;
                const { x: BaseX, y: BaseY, Width: BaseWidth, Height: BaseHeight } = BaseGeometry;
                const { x: PaneX, y: PaneY, Width: PaneWidth, Height: PaneHeight } = PaneGeometry;
                let x, y, Width, Height;
                switch (WidgetAnchors[0]) {
                    case 'left-width':
                        x = WidgetX - BaseX;
                        Width = WidgetWidth;
                        break;
                    case 'width-right':
                        x = PaneWidth - (BaseX + BaseWidth - (WidgetX + WidgetWidth)) - WidgetWidth;
                        Width = WidgetWidth;
                        break;
                    case 'left-right':
                        x = WidgetX - BaseX;
                        Width = Math.max(minWidth || 0, Math.min(PaneWidth - BaseWidth + WidgetWidth, maxWidth || Infinity));
                }
                switch (WidgetAnchors[1]) {
                    case 'top-height':
                        y = WidgetY - BaseY;
                        Height = WidgetHeight;
                        break;
                    case 'height-bottom':
                        y = PaneHeight - (BaseY + BaseHeight - (WidgetY + WidgetHeight)) - WidgetHeight;
                        Height = WidgetHeight;
                        break;
                    case 'top-bottom':
                        y = WidgetY - BaseY;
                        Height = Math.max(minHeight || 0, Math.min(PaneHeight - BaseHeight + WidgetHeight, maxHeight || Infinity));
                }
                // @ts-ignore TS5905 all variables will be assigned by now
                return { x, y, Width, Height };
            },
        });
        /**** Renderer ****/
        onRender(function () {
            var _a;
            this._releaseWidgets();
            const Value = this.Value;
            const SourceWidget = ((Value == null) || (Value.trim() === '')
                ? undefined
                : (_a = this.Applet) === null || _a === void 0 ? void 0 : _a.WidgetAtPath(Value));
            const noSourceWidget = (SourceWidget == null) || (SourceWidget === this);
            const withPattern = (noSourceWidget && (my.visiblePattern === true));
            let WidgetsToShow;
            if (noSourceWidget) {
                WidgetsToShow = [];
            }
            else {
                WidgetsToShow = (SourceWidget.normalizedBehavior === 'basic_controls.outline'
                    ? SourceWidget.bundledWidgets()
                    : [SourceWidget]).filter((Widget) => (Widget.isVisible && ((Widget._Pane == null) || (Widget._Pane === this))));
                WidgetsToShow.forEach((Widget) => Widget._Pane = this);
            }
            this._shownWidgets = WidgetsToShow;
            const PaneGeometry = this.Geometry;
            const BaseGeometry = noSourceWidget ? PaneGeometry : SourceWidget.Geometry;
            return html `<div class="WAT Content WidgetPane ${withPattern ? 'Placeholder' : ''}">
        ${WidgetsToShow.toReversed().map((Widget) => {
                let Geometry = this._GeometryOfWidgetRelativeTo(Widget, BaseGeometry, PaneGeometry);
                return html `<${WAT_WidgetView} key=${IdOfVisual(Widget)} Widget=${Widget} Geometry=${Geometry}/>`;
            })}
      </div>`;
        });
    };
    registerIntrinsicBehavior(Applet, 'widget', 'basic_controls.WidgetPane', WAT_WidgetPane);
    /**** TextView ****/
    // a thin WAT wrapper around the "ui.TextView" component from the
    // "javascript-code-library" (JCL) - the actual appearance now comes from
    // JCL, this behavior only contributes widget geometry, file dropping and
    // the WAT property interface
    const WAT_TextView = async (me, my, html, reactively, on, onReady, onRender, onMount, onUpdate, onUnmount, onValueChange, installStylesheet, BehaviorIsNew) => {
        installStylesheet(`
      .WAT.Widget > .WAT.TextView {
        left:0px; top:0px; width:100%; height:100%;
        white-space:pre-wrap; overflow:visible;
        font:inherit;
      }
    `); // geometry as before the JCL migration - and, most importantly,
        // typography and overflow are RESET to the applet's own settings
        // (JCL's TextView would impose 14px/21px and overflow:auto which
        //  would reflow existing applets)
        /**** custom Properties ****/
        my.configurableProperties = [
            { Name: 'Value', Placeholder: '(enter text)',
                EditorType: 'text-input', AccessorsFor: 'memoized', withCallback: true, },
            { Name: 'readonly', Default: true,
                EditorType: 'checkbox', AccessorsFor: 'memoized' },
            { Name: 'acceptableFileTypes', Label: 'File Types', Default: WAT_supportedTextFormats,
                EditorType: 'linelist-input', AccessorsFor: 'memoized',
                Validator: (Value) => ValueIsListSatisfying(Value, ValueIsTextFormat) },
        ];
        /**** Renderer ****/
        onRender(function () {
            const { Value, Enabling, readonly } = this;
            let acceptableFileTypes = this.acceptableFileTypes;
            if (acceptableFileTypes.length === 0) {
                acceptableFileTypes = WAT_supportedTextFormats.slice();
            }
            /**** prepare file dropping ****/
            const allowsDropping = ((Enabling == true) && !readonly && (acceptableFileTypes.length > 0));
            function _acceptableDataIn(Event) {
                if (Event.dataTransfer.types.includes('text/plain')) {
                    return true;
                }
                for (let Item of Event.dataTransfer.items) {
                    if ((Item.kind === 'file') && acceptableFileTypes.includes(Item.type)) {
                        return true;
                    }
                }
                return false;
            }
            const _onDragOver = (Event) => {
                if (_acceptableDataIn(Event)) {
                    Event.preventDefault();
                    Event.dataTransfer.dropEffect = 'copy';
                }
            };
            const _onDrop = async (Event) => {
                if (_acceptableDataIn(Event)) {
                    Event.preventDefault();
                    if (Event.dataTransfer.types.includes('text/plain')) {
                        const Value = Event.dataTransfer.getData('text');
                        this.Value = Value;
                        this.on('input')(Event);
                    }
                    else {
                        try {
                            for (let Item of Event.dataTransfer.items) {
                                if ((Item.kind === 'file') && acceptableFileTypes.includes(Item.type)) {
                                    this.Value = await FileReadAsText(Item.getAsFile(), Item.type);
                                    this.on('input')(Event);
                                    break;
                                }
                            }
                        }
                        catch (Signal) {
                            console.warn('file drop error', Signal);
                            this.on('drop-error')(Signal);
                        }
                    }
                }
            };
            /**** actual rendering ****/
            return html `<${JCL_ui.TextView} Class="WAT Content TextView"
        Value=${Value == null ? '' : '' + Value}
        onDragOver=${allowsDropping ? _onDragOver : undefined}
        onDrop=${allowsDropping ? _onDrop : undefined}
      />`;
        });
    };
    registerIntrinsicBehavior(Applet, 'widget', 'basic_controls.TextView', WAT_TextView);
    /**** HTMLView ****/
    // a thin WAT wrapper around the "ui.HTMLView" component from the
    // "javascript-code-library" (JCL) - the actual appearance now comes from
    // JCL, this behavior only contributes widget geometry, file dropping and
    // the WAT property interface
    // (JCL_ui.HTMLView renders raw HTML without sanitization - just like this
    //  behavior did before, i.e., the security level remains unchanged)
    const WAT_HTMLView = async (me, my, html, reactively, on, onReady, onRender, onMount, onUpdate, onUnmount, onValueChange, installStylesheet, BehaviorIsNew) => {
        installStylesheet(`
      .WAT.Widget > .WAT.HTMLView {
        left:0px; top:0px; width:100%; height:100%;
        overflow:visible;
        font:inherit;
      }
    `); // geometry as before the JCL migration - and, most importantly,
        // typography and overflow are RESET to the applet's own settings
        // (JCL's HTMLView would impose 14px/21px and overflow:auto which
        //  would reflow existing applets)
        /**** custom Properties ****/
        my.configurableProperties = [
            { Name: 'Value', Placeholder: '(enter HTML)',
                EditorType: 'text-input', AccessorsFor: 'memoized', withCallback: true },
            { Name: 'readonly', Default: true,
                EditorType: 'checkbox', AccessorsFor: 'memoized' },
            { Name: 'acceptableFileTypes', Label: 'File Types', Default: WAT_supportedHTMLFormats,
                EditorType: 'linelist-input', AccessorsFor: 'memoized',
                Validator: (Value) => ValueIsListSatisfying(Value, ValueIsHTMLFormat) },
        ];
        /**** Renderer ****/
        onRender(function () {
            const { Enabling, readonly } = this;
            let acceptableFileTypes = this.acceptableFileTypes;
            if (acceptableFileTypes.length === 0) {
                acceptableFileTypes = WAT_supportedHTMLFormats.slice();
            }
            /**** prepare file dropping ****/
            const allowsDropping = ((Enabling == true) && !readonly && (acceptableFileTypes.length > 0));
            function _acceptableDataIn(Event) {
                if (Event.dataTransfer.types.includes('text/plain')) {
                    return true;
                }
                for (let Item of Event.dataTransfer.items) {
                    if ((Item.kind === 'file') && acceptableFileTypes.includes(Item.type)) {
                        return true;
                    }
                }
                return false;
            }
            const _onDragOver = (Event) => {
                if (_acceptableDataIn(Event)) {
                    Event.preventDefault();
                    Event.dataTransfer.dropEffect = 'copy';
                }
            };
            const _onDrop = async (Event) => {
                if (_acceptableDataIn(Event)) {
                    Event.preventDefault();
                    if (Event.dataTransfer.types.includes('text/plain')) {
                        // *C* SECURITY: dropped text is taken over verbatim and will be rendered as HTML
                        const Value = Event.dataTransfer.getData('text');
                        this.Value = Value;
                        this.on('input')(Event);
                    }
                    else {
                        try {
                            for (let Item of Event.dataTransfer.items) {
                                if ((Item.kind === 'file') && acceptableFileTypes.includes(Item.type)) {
                                    this.Value = await FileReadAsHTML(Item.getAsFile(), Item.type);
                                    this.on('input')(Event);
                                    break;
                                }
                            }
                        }
                        catch (Signal) {
                            console.warn('file drop error', Signal);
                            this.on('drop-error')(Signal);
                        }
                    }
                }
            };
            /**** actual rendering ****/
            // *C* SECURITY: content is rendered as raw HTML without sanitization (XSS risk!)
            return html `<${JCL_ui.HTMLView} Class="WAT Content HTMLView"
        Value=${this.Value || ''}
        onDragOver=${allowsDropping ? _onDragOver : undefined}
        onDrop=${allowsDropping ? _onDrop : undefined}
      />`;
        });
    };
    registerIntrinsicBehavior(Applet, 'widget', 'basic_controls.HTMLView', WAT_HTMLView);
    /**** MarkdownView ****/
    // a thin WAT wrapper around the "ui.MarkdownView" component from the
    // "javascript-code-library" (JCL) - Markdown parsing (incl. KaTeX and
    // syntax highlighting) now comes from JCL which lazily loads "marked",
    // "marked-katex-extension", "marked-highlight" and "highlight.js" on
    // first use ("loadMarkdownLibraries"). This behavior only contributes
    // widget geometry, file dropping and the WAT property interface
    const WAT_MarkdownView = async (me, my, html, reactively, on, onReady, onRender, onMount, onUpdate, onUnmount, onValueChange, installStylesheet, BehaviorIsNew) => {
        installStylesheet(`
      .WAT.Widget > .WAT.MarkdownView {
        left:0px; top:0px; width:100%; height:100%;
        overflow:visible;
        font:inherit;
      }
    `); // geometry as before the JCL migration - and, most importantly,
        // typography and overflow are RESET to the applet's own settings
        // (the h1/p/... rules from WAT's global stylesheet still win over
        //  JCL's own MarkdownView rules by specificity)
        /**** custom Properties ****/
        my.configurableProperties = [
            { Name: 'Value', Placeholder: '(enter Markdown)',
                EditorType: 'text-input', AccessorsFor: 'none' },
            { Name: 'readonly', Default: true,
                EditorType: 'checkbox', AccessorsFor: 'memoized' },
            { Name: 'acceptableFileTypes', Label: 'File Types', Default: WAT_supportedMarkdownFormats,
                EditorType: 'linelist-input', AccessorsFor: 'memoized',
                Validator: (Value) => ValueIsListSatisfying(Value, ValueIsMarkdownFormat) },
        ];
        Object_assign(me, {
            /**** Value ****/
            get Value() {
                return acceptableValue(this.memoized.Value, ValueIsText, '');
            },
            set Value(newValue) {
                allowText('value', newValue);
                if (newValue == null) {
                    newValue = '';
                }
                if (this.memoized.Value !== newValue) {
                    this.memoized.Value = newValue;
                    this.on('Value')(newValue);
                    this.rerender(); // Markdown parsing now happens in JCL_ui.MarkdownView
                }
            },
        });
        /**** Renderer ****/
        onRender(function () {
            const { Enabling, readonly } = this;
            let acceptableFileTypes = this.acceptableFileTypes;
            if (acceptableFileTypes.length === 0) {
                acceptableFileTypes = WAT_supportedMarkdownFormats.slice();
            }
            /**** prepare file dropping ****/
            const allowsDropping = ((Enabling == true) && !readonly && (acceptableFileTypes.length > 0));
            function _acceptableDataIn(Event) {
                if (Event.dataTransfer.types.includes('text/plain')) {
                    return true;
                }
                for (let Item of Event.dataTransfer.items) {
                    if ((Item.kind === 'file') && acceptableFileTypes.includes(Item.type)) {
                        return true;
                    }
                }
                return false;
            }
            const _onDragOver = (Event) => {
                if (_acceptableDataIn(Event)) {
                    Event.preventDefault();
                    Event.dataTransfer.dropEffect = 'copy';
                }
            };
            const _onDrop = async (Event) => {
                if (_acceptableDataIn(Event)) {
                    Event.preventDefault();
                    if (Event.dataTransfer.types.includes('text/plain')) {
                        // *C* SECURITY: dropped text is taken over verbatim and will be rendered as HTML
                        const Value = Event.dataTransfer.getData('text');
                        this.Value = Value;
                        this.on('input')(Event);
                    }
                    else {
                        try {
                            for (let Item of Event.dataTransfer.items) {
                                if ((Item.kind === 'file') && acceptableFileTypes.includes(Item.type)) {
                                    this.Value = await FileReadAsMarkdown(Item.getAsFile(), Item.type);
                                    this.on('input')(Event);
                                    break;
                                }
                            }
                        }
                        catch (Signal) {
                            console.warn('file drop error', Signal);
                            this.on('drop-error')(Signal);
                        }
                    }
                }
            };
            /**** actual rendering ****/
            // *C* SECURITY: content is rendered as raw HTML without sanitization (XSS risk!)
            // (JCL_ui.MarkdownView does not sanitize either - unchanged security level)
            return html `<${JCL_ui.MarkdownView} Class="WAT Content MarkdownView"
        Value=${this.Value || ''}
        onDragOver=${allowsDropping ? _onDragOver : undefined}
        onDrop=${allowsDropping ? _onDrop : undefined}
      />`;
        });
    };
    registerIntrinsicBehavior(Applet, 'widget', 'basic_controls.MarkdownView', WAT_MarkdownView);
    /**** ImageView ****/
    // a thin WAT wrapper around the "ui.ImageView" component from the
    // "javascript-code-library" (JCL) - the actual appearance now comes from
    // JCL, this behavior only contributes widget geometry, file dropping and
    // the WAT property interface (WAT's "ImageScaling" and "ImageAlignment"
    // are mapped onto JCL's "Scaling" and "Alignment" props)
    const WAT_ImageView = async (me, my, html, reactively, on, onReady, onRender, onMount, onUpdate, onUnmount, onValueChange, installStylesheet, BehaviorIsNew) => {
        installStylesheet(`
      .WAT.Widget > .WAT.ImageView {
        left:0px; top:0px; width:100%; height:100%;
      }
    `); // n.b.: an <img> is a "replaced element" and does NOT stretch with
        // insets and width/height:auto alone - width and height must be
        // set explicitly (or the image would appear in its natural size)
        /**** custom Properties ****/
        my.configurableProperties = [
            { Name: 'Value', Placeholder: '(enter image URL)',
                EditorType: 'url-input', AccessorsFor: 'none' },
            { Name: 'readonly', Default: true,
                EditorType: 'checkbox', AccessorsFor: 'memoized' },
            { Name: 'ImageScaling', Label: 'Image Scaling', Default: 'contain',
                EditorType: 'drop-down', AccessorsFor: 'memoized', ValueList: WAT_ImageScalings },
            { Name: 'ImageAlignment', Label: 'Image Alignment', Default: 'center center',
                EditorType: 'drop-down', AccessorsFor: 'memoized', ValueList: WAT_ImageAlignments },
            { Name: 'acceptableFileTypes', Label: 'File Types', Default: WAT_supportedImageFormats,
                EditorType: 'linelist-input', AccessorsFor: 'memoized',
                Validator: (Value) => ValueIsListSatisfying(Value, ValueIsImageFormat) },
        ];
        Object_assign(me, {
            /**** Value ****/
            get Value() {
                return acceptableValue(this.memoized.Value, ValueIsURL);
            },
            set Value(newValue) {
                if (ValueIsString(newValue) && ((newValue === null || newValue === void 0 ? void 0 : newValue.trim()) === '')) {
                    newValue = undefined;
                }
                allowURL('value', newValue);
                if (this.memoized.Value !== newValue) {
                    this.memoized.Value = newValue;
                    this.on('Value')(newValue);
                    this.rerender();
                }
            },
        });
        /**** Renderer ****/
        onRender(function () {
            const ImageURL = (this.Value == null ? '' : this.Applet.AssetURL(this.Value));
            const { ImageScaling, ImageAlignment, Enabling, readonly } = this;
            let acceptableFileTypes = this.acceptableFileTypes;
            if (acceptableFileTypes.length === 0) {
                acceptableFileTypes = WAT_supportedImageFormats.slice();
            }
            /**** prepare file dropping ****/
            const allowsDropping = ((Enabling == true) && !readonly && (acceptableFileTypes.length > 0));
            function _acceptableDataIn(Event) {
                if (Event.dataTransfer.types.includes('text/html')) {
                    return true;
                }
                for (let Item of Event.dataTransfer.items) {
                    if ((Item.kind === 'file') && acceptableFileTypes.includes(Item.type)) {
                        return true;
                    }
                }
                return false;
            }
            const _onDragOver = (Event) => {
                if (_acceptableDataIn(Event)) {
                    Event.preventDefault();
                    Event.dataTransfer.dropEffect = 'copy';
                }
            };
            const _onDrop = async (Event) => {
                var _a;
                if (_acceptableDataIn(Event)) {
                    Event.preventDefault();
                    let ImageSource;
                    if (Event.dataTransfer.types.some((Type) => ((Type === 'text/html') &&
                        Event.dataTransfer.getData('text/html').includes('<img')))) {
                        const HTML = Event.dataTransfer.getData('text/html');
                        const Parser = new DOMParser();
                        const Doc = Parser.parseFromString(HTML, 'text/html');
                        ImageSource = (_a = Doc.querySelector('img')) === null || _a === void 0 ? void 0 : _a.src;
                    }
                    if ((ImageSource != null) && (ImageSource !== '')) {
                        this.Value = ImageSource;
                        this.on('input')(Event);
                    }
                    else {
                        try {
                            for (let Item of Event.dataTransfer.items) {
                                if ((Item.kind === 'file') && acceptableFileTypes.includes(Item.type)) {
                                    this.Value = await FileReadAsImage(Item.getAsFile(), Item.type);
                                    this.on('input')(Event);
                                    break;
                                }
                            }
                        }
                        catch (Signal) {
                            console.warn('file drop error', Signal);
                            this.on('drop-error')(Signal);
                        }
                    }
                }
            };
            function _onClick(Event) { my.on('click')(Event); }
            /**** actual rendering ****/
            return html `<${JCL_ui.ImageView} Class="WAT Content ImageView"
        Value=${ImageURL || undefined}
        Scaling=${ImageScaling} Alignment=${ImageAlignment}
        onDragOver=${allowsDropping ? _onDragOver : undefined}
        onDrop=${allowsDropping ? _onDrop : undefined}
        onClick=${_onClick}
      />`;
        });
    };
    registerIntrinsicBehavior(Applet, 'widget', 'basic_controls.ImageView', WAT_ImageView);
    /**** SVGView ****/
    // a thin WAT wrapper around the "ui.SVGView" component from the
    // "javascript-code-library" (JCL) - the actual appearance now comes from
    // JCL, this behavior only contributes widget geometry and the WAT property
    // interface (WAT's "ImageScaling" and "ImageAlignment" are mapped onto
    // JCL's "Scaling" and "Alignment" props)
    const WAT_SVGView = async (me, my, html, reactively, on, onReady, onRender, onMount, onUpdate, onUnmount, onValueChange, installStylesheet, BehaviorIsNew) => {
        installStylesheet(`
      .WAT.Widget > .WAT.SVGView {
        left:0px; top:0px; width:100%; height:100%;
      }
    `); // n.b.: an <img> is a "replaced element" and does NOT stretch with
        // insets and width/height:auto alone - width and height must be
        // set explicitly (or the image would appear in its natural size)
        /**** custom Properties ****/
        my.configurableProperties = [
            { Name: 'Value', Placeholder: '(enter SVG)',
                EditorType: 'text-input', AccessorsFor: 'memoized', withCallback: true },
            { Name: 'ImageScaling', Label: 'Image Scaling', Default: 'contain',
                EditorType: 'drop-down', AccessorsFor: 'memoized', ValueList: WAT_ImageScalings },
            { Name: 'ImageAlignment', Label: 'Image Alignment', Default: 'center center',
                EditorType: 'drop-down', AccessorsFor: 'memoized', ValueList: WAT_ImageAlignments },
        ];
        /**** Renderer ****/
        onRender(function () {
            const { Value, ImageScaling, ImageAlignment } = this;
            return html `<${JCL_ui.SVGView} Class="WAT Content SVGView"
        Value=${Value || undefined}
        Scaling=${ImageScaling} Alignment=${ImageAlignment}
      />`;
        });
    };
    registerIntrinsicBehavior(Applet, 'widget', 'basic_controls.SVGView', WAT_SVGView);
    /**** WebView ****/
    // a thin WAT wrapper around the "ui.WebView" component from the
    // "javascript-code-library" (JCL) - the actual appearance now comes from
    // JCL, this behavior only contributes widget geometry and the WAT property
    // interface. WAT's "PermissionsPolicy", "allowsFullscreen",
    // "SandboxPermissions" and "ReferrerPolicy" are mapped onto JCL's "allow",
    // "allowFullscreen", "Sandbox" and "ReferrerPolicy" props
    const WAT_WebView = async (me, my, html, reactively, on, onReady, onRender, onMount, onUpdate, onUnmount, onValueChange, installStylesheet, BehaviorIsNew) => {
        installStylesheet(`
      .WAT.Widget > .WAT.WebView {
        left:0px; top:0px; width:100%; height:100%;
      }
    `); // n.b.: an <iframe> is a "replaced element" and does NOT stretch
        // with insets and width/height:auto alone - width and height must
        // be set explicitly (or the iframe would keep its natural size)
        /**** custom Properties ****/
        my.configurableProperties = [
            { Name: 'Value', Placeholder: '(enter URL)',
                EditorType: 'url-input', AccessorsFor: 'none' },
            { Name: 'PermissionsPolicy', Label: 'Permissions Policy',
                EditorType: 'textline-input', AccessorsFor: 'memoized' },
            { Name: 'allowsFullscreen', Label: 'allows Fullscreen', Default: false,
                EditorType: 'checkbox', AccessorsFor: 'memoized' },
            { Name: 'SandboxPermissions', Label: 'Sandbox Permissions', Default: WAT_DefaultSandboxPermissions,
                EditorType: 'textline-input', AccessorsFor: 'memoized' },
            { Name: 'ReferrerPolicy', Label: 'Referrer Policy', Default: 'strict-origin-when-cross-origin',
                EditorType: 'drop-down', AccessorsFor: 'memoized', ValueList: WAT_ReferrerPolicies },
        ];
        Object_assign(me, {
            /**** Value ****/
            get Value() {
                return acceptableValue(this.memoized.Value, ValueIsURL);
            },
            set Value(newValue) {
                if (ValueIsString(newValue) && ((newValue === null || newValue === void 0 ? void 0 : newValue.trim()) === '')) {
                    newValue = undefined;
                }
                allowURL('value', newValue);
                if (this.memoized.Value !== newValue) {
                    this.memoized.Value = newValue;
                    this.on('Value')(newValue);
                    this.rerender();
                }
            },
        });
        /**** Renderer ****/
        onRender(function () {
            const WebURL = (this.Value == null ? '' : this.Applet.AssetURL(this.Value));
            const { PermissionsPolicy, allowsFullscreen, SandboxPermissions, ReferrerPolicy } = this;
            // *C* SECURITY: JCL_ui.WebView removes the "sandbox" attribute upon
            // Sandbox="none" - WAT never did that: an explicit "none" therefore
            // still keeps the iframe fully sandboxed (as before the migration)
            const Sandbox = (SandboxPermissions === 'none' ? '' : SandboxPermissions);
            return html `<${JCL_ui.WebView} Class="WAT Content WebView"
        Value=${WebURL || ''}
        allow=${PermissionsPolicy} allowFullscreen=${allowsFullscreen}
        Sandbox=${Sandbox} ReferrerPolicy=${ReferrerPolicy}
      />`;
        });
    };
    registerIntrinsicBehavior(Applet, 'widget', 'basic_controls.WebView', WAT_WebView);
    /**** TitleView ****/
    // a thin WAT wrapper around the "ui.Title" component from the
    // "javascript-code-library" (JCL) - this behavior deliberately keeps WAT's
    // own typography rules: applets must render identically in every WAT
    // instance, regardless of any changes to JCL's own styling
    // (nota bene: JCL's Title/Subtitle/Label/Fineprint read "PropSet.class"
    //  literally before merging - the "class" prop is therefore lowercase here)
    const WAT_TitleView = async (me, my, html, reactively, on, onReady, onRender, onMount, onUpdate, onUnmount, onValueChange, installStylesheet, BehaviorIsNew) => {
        installStylesheet(`
      .WAT.Widget > .WAT.TitleView {
        left:0px; top:0px; width:100%; height:100%;
        font-size:22px; font-weight:bold; line-height:32px;
        overflow:hidden; text-overflow:ellipsis;
      }
    `); // WAT's original geometry and typography rules
        my.configurableProperties = [
            { Name: 'Value', Placeholder: '(enter title)',
                EditorType: 'textline-input', AccessorsFor: 'memoized', withCallback: true, },
        ];
        onRender(function () {
            return html `<${JCL_ui.Title} class="WAT Content TitleView"
        Value=${my.Value}
      />`;
        });
    };
    registerIntrinsicBehavior(Applet, 'widget', 'basic_controls.TitleView', WAT_TitleView);
    /**** SubtitleView ****/
    // a thin WAT wrapper around the "ui.Subtitle" component from the
    // "javascript-code-library" (JCL) - see WAT_TitleView for details
    const WAT_SubtitleView = async (me, my, html, reactively, on, onReady, onRender, onMount, onUpdate, onUnmount, onValueChange, installStylesheet, BehaviorIsNew) => {
        installStylesheet(`
      .WAT.Widget > .WAT.SubtitleView {
        left:0px; top:2px; width:100%; height:100%;
        font-size:18px; font-weight:bold; line-height:27px;
        overflow:hidden; text-overflow:ellipsis;
      }
    `); // WAT's original geometry and typography rules
        my.configurableProperties = [
            { Name: 'Value', Placeholder: '(enter subtitle)',
                EditorType: 'textline-input', AccessorsFor: 'memoized', withCallback: true, },
        ];
        onRender(function () {
            return html `<${JCL_ui.Subtitle} class="WAT Content SubtitleView"
        Value=${my.Value}
      />`;
        });
    };
    registerIntrinsicBehavior(Applet, 'widget', 'basic_controls.SubtitleView', WAT_SubtitleView);
    /**** LabelView ****/
    // a thin WAT wrapper around the "ui.Label" component from the
    // "javascript-code-library" (JCL) - see WAT_TitleView for details
    const WAT_LabelView = async (me, my, html, reactively, on, onReady, onRender, onMount, onUpdate, onUnmount, onValueChange, installStylesheet, BehaviorIsNew) => {
        installStylesheet(`
      .WAT.Widget > .WAT.LabelView {
        left:0px; top:4px; width:100%; height:100%;
        font-size:14px; font-weight:bold; line-height:21px;
        overflow:hidden; text-overflow:ellipsis;
      }
    `); // WAT's original geometry and typography rules
        my.configurableProperties = [
            { Name: 'Value', Placeholder: '(enter label)',
                EditorType: 'textline-input', AccessorsFor: 'memoized', withCallback: true, },
        ];
        function _onClick(Event) { my.on('click')(Event); }
        onRender(function () {
            return html `<${JCL_ui.Label} class="WAT Content LabelView"
        Value=${my.Value} onClick=${_onClick}
      />`;
        });
    };
    registerIntrinsicBehavior(Applet, 'widget', 'basic_controls.LabelView', WAT_LabelView);
    /**** FineprintView ****/
    // a thin WAT wrapper around the "ui.Fineprint" component from the
    // "javascript-code-library" (JCL) - see WAT_TitleView for details
    const WAT_FineprintView = async (me, my, html, reactively, on, onReady, onRender, onMount, onUpdate, onUnmount, onValueChange, installStylesheet, BehaviorIsNew) => {
        installStylesheet(`
      .WAT.Widget > .WAT.FineprintView {
        left:0px; top:0px; width:100%; height:100%;
        font-size:12px; font-weight:normal; line-height:18px;
        overflow:visible; text-overflow:ellipsis;
      }
    `); // WAT's original geometry and typography rules (fineprints may be
        // multi-line - JCL's Fineprint would clip them via overflow:hidden)
        my.configurableProperties = [
            { Name: 'Value', Placeholder: '(enter fineprint)',
                EditorType: 'text-input', AccessorsFor: 'memoized', withCallback: true, },
        ];
        onRender(function () {
            return html `<${JCL_ui.Fineprint} class="WAT Content FineprintView"
        Value=${my.Value}
      />`;
        });
    };
    registerIntrinsicBehavior(Applet, 'widget', 'basic_controls.FineprintView', WAT_FineprintView);
    /**** Icon ****/
    // a thin WAT wrapper around the "ui.Icon" component from the
    // "javascript-code-library" (JCL) - the actual appearance now comes from
    // JCL, this behavior only contributes widget geometry and the WAT property
    // interface
    const WAT_Icon = async (me, my, html, reactively, on, onReady, onRender, onMount, onUpdate, onUnmount, onValueChange, installStylesheet, BehaviorIsNew) => {
        installStylesheet(`
      .WAT.Widget > .WAT.Icon {
        left:1px; top:1px; right:1px; bottom:1px;
        width:auto !important; height:auto !important;
        display:flex; justify-content:center; align-items:center;
      }
    `); // geometry only - but it must override JCL's fixed 24x24px sizing
        // (!important) so that the 24x24px inner icon gets centered again
        /**** custom Properties ****/
        my.configurableProperties = [
            { Name: 'Icon', Default: 'icons/circle-information.png',
                EditorType: 'url-input', AccessorsFor: 'none' },
        ];
        Object_assign(me, {
            /**** Icon ****/
            get Icon() {
                return acceptableValue(this.memoized.Icon, ValueIsURL, '');
            },
            set Icon(newValue) {
                if (ValueIsString(newValue) && ((newValue === null || newValue === void 0 ? void 0 : newValue.trim()) === '')) {
                    newValue = undefined;
                }
                allowURL('icon URL', newValue);
                if (this.memoized.Icon !== newValue) {
                    this.memoized.Icon = newValue;
                    this.rerender();
                }
            },
        });
        /**** Renderer ****/
        onRender(function () {
            const { Enabling, Icon, Color } = this;
            const IconURL = this.Applet.AssetURL(this.Icon.trim() === '' ? '/icons/circle-information.png' : this.Icon);
            const disabled = (Enabling == false);
            const _onClick = (Event) => {
                if (Enabling === false) {
                    return consumingEvent(Event);
                }
                this.on('click')(Event);
            };
            /**** actual rendering ****/
            return html `<${JCL_ui.Icon} Class="WAT Content Icon"
        Value=${IconURL} Color=${Color || 'black'}
        disabled=${disabled} onClick=${_onClick}
      />`;
        });
    };
    registerIntrinsicBehavior(Applet, 'widget', 'basic_controls.Icon', WAT_Icon);
    /**** value lists for straight and curved Arrows ****/
    const WAT_ArrowDirections = ['nw', 'n', 'ne', 'e', 'se', 's', 'sw', 'w'];
    const WAT_ArrowRotations = ['cw', 'ccw'];
    const WAT_ArrowTipPositions = ['n', 'e', 's', 'w'];
    const WAT_ArrowHeadPositions = ['none', 'start', 'end', 'both'];
    /**** StraightArrow ****/
    const WAT_StraightArrow = async (me, my, html, reactively, on, onReady, onRender, onMount, onUpdate, onUnmount, onValueChange, installStylesheet, BehaviorIsNew) => {
        installStylesheet(`
      .WAT.Widget > .WAT.StraightArrow {
        overflow:visible;
      }
    `);
        /**** custom Properties ****/
        my.configurableProperties = [
            { Name: 'Direction', Default: 'e',
                EditorType: 'drop-down', AccessorsFor: 'memoized', ValueList: WAT_ArrowDirections },
            { Name: 'ArrowHeads', Label: 'Arrow Heads', Default: 'end',
                EditorType: 'drop-down', AccessorsFor: 'memoized', ValueList: WAT_ArrowHeadPositions },
        ];
        /**** Renderer ****/
        onRender(function () {
            const { Width, Height } = this.Geometry;
            const Color = this.ForegroundColor || 'black';
            const Direction = this.Direction || 'e';
            const ArrowHeads = this.ArrowHeads || 'end';
            const xm = Width / 2, ym = Height / 2;
            let x1, y1, x2, y2;
            switch (Direction) {
                case 'n':
                    x1 = xm;
                    y1 = Height;
                    x2 = xm;
                    y2 = 0;
                    break;
                case 'ne':
                    x1 = 6;
                    y1 = Height - 6;
                    x2 = Width - 6;
                    y2 = 6;
                    break;
                case 'e':
                    x1 = 0;
                    y1 = ym;
                    x2 = Width;
                    y2 = ym;
                    break;
                case 'se':
                    x1 = 6;
                    y1 = 6;
                    x2 = Width - 6;
                    y2 = Height - 6;
                    break;
                case 's':
                    x1 = xm;
                    y1 = 0;
                    x2 = xm;
                    y2 = Height;
                    break;
                case 'sw':
                    x1 = Width - 6;
                    y1 = 6;
                    x2 = 6;
                    y2 = Height - 6;
                    break;
                case 'w':
                    x1 = Width;
                    y1 = ym;
                    x2 = 0;
                    y2 = ym;
                    break;
                default:
                    x1 = Width - 6;
                    y1 = Height - 6;
                    x2 = 6;
                    y2 = 6; // 'nw'
            }
            const HeadAtStart = (ArrowHeads === 'start') || (ArrowHeads === 'both');
            const HeadAtEnd = (ArrowHeads === 'end') || (ArrowHeads === 'both');
            const SVGSource = `
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg"
          width="${Width}" height="${Height}"
        >
          <defs>
            <marker id="arrow-head" orient="auto-start-reverse"
              markerWidth="5" markerHeight="4"
              refX="4" refY="2"
            >
              <path d="M0,0 V4 L5,2 Z" fill="${Color}"/>
            </marker>
          </defs>

          <path stroke-width="3" stroke="${Color}" fill="none"
            ${HeadAtStart ? 'marker-start="url(#arrow-head)"' : ''}
            ${HeadAtEnd ? 'marker-end="url(#arrow-head)"' : ''}
            d="M ${x1},${y1} L ${x2},${y2}"
          />
        </svg>
      `;
            const DataURL = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(SVGSource);
            return html `<img class="WAT Content StraightArrow" src=${DataURL}/>`;
        });
    };
    registerIntrinsicBehavior(Applet, 'widget', 'basic_controls.StraightArrow', WAT_StraightArrow);
    /**** CurvedArrow ****/
    const WAT_CurvedArrow = async (me, my, html, reactively, on, onReady, onRender, onMount, onUpdate, onUnmount, onValueChange, installStylesheet, BehaviorIsNew) => {
        installStylesheet(`
      .WAT.Widget > .WAT.CurvedArrow {
        overflow:visible;
      }
    `);
        /**** custom Properties ****/
        my.configurableProperties = [
            { Name: 'Direction', Default: 'cw',
                EditorType: 'drop-down', AccessorsFor: 'memoized', ValueList: WAT_ArrowRotations },
            { Name: 'TipPosition', Label: 'Tip Position', Default: 'n',
                EditorType: 'drop-down', AccessorsFor: 'memoized', ValueList: WAT_ArrowTipPositions },
            { Name: 'ArrowHeads', Label: 'Arrow Heads', Default: 'end',
                EditorType: 'drop-down', AccessorsFor: 'memoized', ValueList: WAT_ArrowHeadPositions },
        ];
        /**** Renderer ****/
        onRender(function () {
            const { Width: W, Height: H } = this.Geometry;
            const Color = this.ForegroundColor || 'black';
            const Direction = this.Direction || 'cw';
            const TipPosition = this.TipPosition || 'n';
            const ArrowHeads = this.ArrowHeads || 'end';
            let Arc;
            switch (Direction + ' ' + TipPosition) {
                case 'cw n':
                    Arc = `M ${W},${H - 6} A ${W - 6} ${H - 18} 0 0 1 6 12`;
                    break;
                case 'cw e':
                    Arc = `M 6,${H} A ${W - 18} ${H - 6} 0 0 1 ${W - 12} 6`;
                    break;
                case 'cw s':
                    Arc = `M 0,6 A ${W - 6} ${H - 18} 0 0 1 ${W - 6} ${H - 12}`;
                    break;
                case 'cw w':
                    Arc = `M ${W - 6},0 A ${W - 18} ${H - 6} 0 0 1 12 ${H - 6}`;
                    break;
                case 'ccw n':
                    Arc = `M 0,${H - 6} A ${W - 6} ${H - 18} 0 0 0 ${W - 6} 12`;
                    break;
                case 'ccw e':
                    Arc = `M 6,0 A ${W - 18} ${H - 6} 0 0 0 ${W - 12} ${H - 6}`;
                    break;
                case 'ccw s':
                    Arc = `M ${W},6 A ${W - 6} ${H - 18} 0 0 0 6 ${H - 12}`;
                    break;
                default: Arc = `M ${W - 6},${H} A ${W - 18} ${H - 6} 0 0 0 12 6`; // 'ccw w'
            }
            const HeadAtStart = (ArrowHeads === 'start') || (ArrowHeads === 'both');
            const HeadAtEnd = (ArrowHeads === 'end') || (ArrowHeads === 'both');
            const SVGSource = `
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg"
          width="${W}" height="${H}"
        >
          <defs>
            <marker id="arrow-head" orient="auto-start-reverse"
              markerWidth="5" markerHeight="4"
              refX="0" refY="2"
            >
              <path d="M0,0 V4 L5,2 Z" fill="${Color}"/>
            </marker>
          </defs>

          <path stroke-width="3" stroke="${Color}" fill="none"
            ${HeadAtStart ? 'marker-start="url(#arrow-head)"' : ''}
            ${HeadAtEnd ? 'marker-end="url(#arrow-head)"' : ''}
            d="${Arc}"
          />
        </svg>
      `;
            const DataURL = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(SVGSource);
            return html `<img class="WAT Content CurvedArrow" src=${DataURL}/>`;
        });
    };
    registerIntrinsicBehavior(Applet, 'widget', 'basic_controls.CurvedArrow', WAT_CurvedArrow);
    /**** Button ****/
    // a thin WAT wrapper around the "native.Button" component from the
    // "javascript-code-library" (JCL) - the actual appearance now comes from JCL,
    // this behavior only contributes widget geometry and the WAT property
    // interface
    const WAT_Button = async (me, my, html, reactively, on, onReady, onRender, onMount, onUpdate, onUnmount, onValueChange, installStylesheet, BehaviorIsNew) => {
        installStylesheet(`
      .WAT.Widget > .WAT.Button {
        left:1px; top:1px; right:1px; bottom:1px; width:auto; height:auto;
        text-align:center;
      }
    `); // geometry and label alignment only - the look itself comes from JCL
        /**** custom Properties ****/
        my.configurableProperties = [
            { Name: 'Label', Placeholder: '(enter label)',
                EditorType: 'textline-input', AccessorsFor: 'memoized' },
        ];
        /**** Renderer ****/
        onRender(function () {
            const { Label, Enabling } = this;
            const _onClick = (Event) => {
                if (Enabling == false) {
                    return consumingEvent(Event);
                }
                this.on('click')(Event);
            };
            return html `<${JCL_native.Button} Class="WAT Content Button"
        disabled=${Enabling == false} onClick=${_onClick}
      >${Label}</>`;
        });
    };
    registerIntrinsicBehavior(Applet, 'widget', 'native_controls.Button', WAT_Button);
    /**** Checkbox ****/
    // a thin WAT wrapper around the "native.Checkbox" component from the
    // "javascript-code-library" (JCL) - the actual appearance now comes from JCL,
    // this behavior only contributes widget geometry and the WAT property
    // interface
    const WAT_Checkbox = async (me, my, html, reactively, on, onReady, onRender, onMount, onUpdate, onUnmount, onValueChange, installStylesheet, BehaviorIsNew) => {
        installStylesheet(`
      .WAT.Widget > .WAT.Checkbox {
        left:1px; top:1px; right:1px; bottom:1px; width:auto; height:auto;
      }
    `); // geometry only - the look itself comes from JCL
        /**** custom Properties ****/
        my.configurableProperties = [
            { Name: 'Value',
                EditorType: 'checkbox', AccessorsFor: 'memoized', withCallback: true },
        ];
        /**** Renderer ****/
        onRender(function () {
            const { Value, Enabling } = this;
            const _onValueInput = (newValue, Event) => {
                if (Enabling == false) {
                    return;
                }
                this.Value = newValue;
                this.on('click')(Event);
                this.on('input')(Event);
            };
            return html `<${JCL_native.Checkbox} Class="WAT Content Checkbox"
        Value=${Value} disabled=${Enabling == false}
        onValueInput=${_onValueInput}
      />`; // a null "Value" shows an "indeterminate" checkbox
        });
    };
    registerIntrinsicBehavior(Applet, 'widget', 'native_controls.Checkbox', WAT_Checkbox);
    /**** Radiobutton ****/
    // a thin WAT wrapper around the "native.Radiobutton" component from the
    // "javascript-code-library" (JCL) - the actual appearance now comes from JCL,
    // this behavior only contributes widget geometry and the WAT property
    // interface
    const WAT_Radiobutton = async (me, my, html, reactively, on, onReady, onRender, onMount, onUpdate, onUnmount, onValueChange, installStylesheet, BehaviorIsNew) => {
        installStylesheet(`
      .WAT.Widget > .WAT.Radiobutton {
        left:1px; top:1px; right:1px; bottom:1px; width:auto; height:auto;
      }
    `); // geometry only - the look itself comes from JCL
        /**** custom Properties ****/
        my.configurableProperties = [
            { Name: 'Value',
                EditorType: 'checkbox', AccessorsFor: 'memoized', withCallback: true },
        ];
        /**** Renderer ****/
        onRender(function () {
            // *C* radiobuttons lack a grouping mechanism ("name" attribute) - group behavior must be scripted manually
            const { Value, Enabling } = this;
            const _onValueInput = (newValue, Event) => {
                if (Enabling == false) {
                    return;
                }
                this.Value = newValue;
                this.on('click')(Event);
                this.on('input')(Event);
            };
            return html `<${JCL_native.Radiobutton} Class="WAT Content Radiobutton"
        Value=${Value} disabled=${Enabling == false}
        onValueInput=${_onValueInput}
      />`;
        });
    };
    registerIntrinsicBehavior(Applet, 'widget', 'native_controls.Radiobutton', WAT_Radiobutton);
    /**** Gauge ****/
    // a thin WAT wrapper around the "native.Gauge" component from the
    // "javascript-code-library" (JCL) - the actual appearance now comes from JCL,
    // this behavior only contributes widget geometry and the WAT property
    // interface
    const WAT_Gauge = async (me, my, html, reactively, on, onReady, onRender, onMount, onUpdate, onUnmount, onValueChange, installStylesheet, BehaviorIsNew) => {
        installStylesheet(`
      .WAT.Widget > .WAT.Gauge {
        left:1px; top:1px; right:1px; bottom:1px; width:auto; height:auto;
      }
    `); // geometry only - the look itself comes from JCL
        /**** custom Properties ****/
        my.configurableProperties = [
            { Name: 'Value',
                EditorType: 'number-input', AccessorsFor: 'memoized', withCallback: true },
            { Name: 'Minimum',
                EditorType: 'number-input', AccessorsFor: 'memoized' },
            { Name: 'lowerBound', Label: 'lower Bound',
                EditorType: 'number-input', AccessorsFor: 'memoized' },
            { Name: 'Optimum',
                EditorType: 'number-input', AccessorsFor: 'memoized' },
            { Name: 'upperBound', Label: 'upper Bound',
                EditorType: 'number-input', AccessorsFor: 'memoized' },
            { Name: 'Maximum',
                EditorType: 'number-input', AccessorsFor: 'memoized' },
        ];
        /**** Renderer ****/
        onRender(function () {
            const { Value, Minimum, lowerBound, Optimum, upperBound, Maximum } = this;
            return html `<${JCL_native.Gauge} Class="WAT Content Gauge"
        Value=${Value} Minimum=${Minimum} lowerBound=${lowerBound}
        Optimum=${Optimum} upperBound=${upperBound} Maximum=${Maximum}
      />`;
        });
    };
    registerIntrinsicBehavior(Applet, 'widget', 'native_controls.Gauge', WAT_Gauge);
    /**** Progressbar ****/
    // a thin WAT wrapper around the "native.Progressbar" component from the
    // "javascript-code-library" (JCL) - the actual appearance now comes from JCL,
    // this behavior only contributes widget geometry, the WAT progress color
    // and the WAT property interface
    const WAT_Progressbar = async (me, my, html, reactively, on, onReady, onRender, onMount, onUpdate, onUnmount, onValueChange, installStylesheet, BehaviorIsNew) => {
        installStylesheet(`
      .WAT.Widget > .WAT.Progressbar {
        left:1px; top:1px; right:1px; bottom:1px; width:auto; height:auto;
      }
      .WAT.Widget > .WAT.Progressbar > progress {
        -webkit-appearance:none; -moz-appearance:none; appearance:none;
        background-color:#EEEEEE;
      }
      .WAT.Widget > .WAT.Progressbar > progress::-webkit-progress-value,
      .WAT.Widget > .WAT.Progressbar > progress::-moz-progress-bar {
        background-color:var(--WAT-ProgressColor,dodgerblue);
      }
    `); // geometry plus those rules JCL does not provide identically
        /**** custom Properties ****/
        my.configurableProperties = [
            { Name: 'Value',
                EditorType: 'number-input', AccessorsFor: 'memoized', withCallback: true },
            { Name: 'Maximum',
                EditorType: 'number-input', AccessorsFor: 'memoized', minValue: 0 },
        ];
        /**** Renderer ****/
        onRender(function () {
            const { Value, Maximum } = this;
            return html `<${JCL_native.Progressbar} Class="WAT Content Progressbar"
        Value=${Value} Maximum=${Maximum}
        Style="--WAT-ProgressColor:${this.ForegroundColor || 'dodgerblue'}; accent-color:${this.ForegroundColor || 'dodgerblue'}"
      />`;
        });
    };
    registerIntrinsicBehavior(Applet, 'widget', 'native_controls.Progressbar', WAT_Progressbar);
    /**** Slider ****/
    // a thin WAT wrapper around the "native.Slider" component from the
    // "javascript-code-library" (JCL) - the actual appearance, hashmark support
    // and the protection of local input against external changes now come from
    // JCL, this behavior only contributes widget geometry and the WAT property
    // interface
    const WAT_Slider = async (me, my, html, reactively, on, onReady, onRender, onMount, onUpdate, onUnmount, onValueChange, installStylesheet, BehaviorIsNew) => {
        installStylesheet(`
      .WAT.Widget > .WAT.Slider {
        left:1px; top:1px; right:1px; bottom:1px; width:auto; height:auto;
      }
    `); // geometry only - the look itself comes from JCL
        /**** custom Properties ****/
        my.configurableProperties = [
            { Name: 'Value',
                EditorType: 'number-input', AccessorsFor: 'memoized', withCallback: true },
            { Name: 'Minimum',
                EditorType: 'number-input', AccessorsFor: 'memoized' },
            { Name: 'Stepping',
                EditorType: 'number-input', AccessorsFor: 'memoized', minValue: 0, withMin: false },
            { Name: 'Maximum',
                EditorType: 'number-input', AccessorsFor: 'memoized' },
            { Name: 'Hashmarks', Pattern: HashmarkPattern, Default: [],
                EditorType: 'linelist-input', AccessorsFor: 'memoized' },
        ];
        /**** Renderer ****/
        onRender(function () {
            const { Value, Enabling, Minimum, Stepping, Maximum, Hashmarks } = this;
            const _onValueInput = (newValue, Event) => {
                if (Enabling === false) {
                    return;
                }
                this.Value = (isNaN(newValue) ? undefined : newValue);
                this.on('input')(Event);
            };
            const _onBlur = (Event) => {
                this.on('blur')(Event);
            };
            /**** actual rendering ****/
            const HashmarkList = ( // JCL expects hashmarks to be textlines
            Hashmarks == null ? undefined : Hashmarks.map((Item) => '' + Item));
            return html `<${JCL_native.Slider} Class="WAT Content Slider"
        Value=${Value} Minimum=${Minimum} Step=${Stepping} Maximum=${Maximum}
        Hashmarks=${HashmarkList} disabled=${Enabling === false}
        onValueInput=${_onValueInput} onBlur=${_onBlur}
      />`;
        });
    };
    registerIntrinsicBehavior(Applet, 'widget', 'native_controls.Slider', WAT_Slider);
    /**** TextlineInput ****/
    // a thin WAT wrapper around the "native.TextlineInput" component from the
    // "javascript-code-library" (JCL) - the actual appearance and the protection
    // of local input against external changes now come from JCL, this behavior
    // only contributes widget geometry and the WAT property interface
    const WAT_TextlineInput = async (me, my, html, reactively, on, onReady, onRender, onMount, onUpdate, onUnmount, onValueChange, installStylesheet, BehaviorIsNew) => {
        installStylesheet(`
      .WAT.Widget > .WAT.TextlineInput {
        left:1px; top:1px; right:1px; bottom:1px; width:auto; height:auto;
        line-height:normal;
      }
    `); // geometry only - the look itself comes from JCL
        /**** custom Properties ****/
        my.configurableProperties = [
            { Name: 'Value',
                EditorType: 'textline-input', AccessorsFor: 'memoized', withCallback: true },
            { Name: 'Placeholder',
                EditorType: 'textline-input', AccessorsFor: 'memoized' },
            { Name: 'readonly',
                EditorType: 'checkbox', AccessorsFor: 'memoized' },
            { Name: 'minLength', minValue: 0, Stepping: 1,
                EditorType: 'integer-input', AccessorsFor: 'memoized' },
            { Name: 'maxLength', minValue: 0, Stepping: 1,
                EditorType: 'integer-input', AccessorsFor: 'memoized' },
            { Name: 'Pattern',
                EditorType: 'textline-input', AccessorsFor: 'memoized',
                Validator: (Value) => ValueIsTextline(Value) && PatternIsCompilable(Value) },
            { Name: 'SpellChecking',
                EditorType: 'checkbox', AccessorsFor: 'memoized' },
            { Name: 'Suggestions',
                EditorType: 'linelist-input', AccessorsFor: 'memoized' },
        ];
        /**** Renderer ****/
        onRender(function () {
            const { Value, Enabling, Placeholder, readonly, minLength, maxLength, Pattern, SpellChecking, Suggestions } = this;
            const _onValueInput = (newValue, Event) => {
                if (Enabling === false) {
                    return;
                }
                this.Value = newValue;
                this.on('input')(Event);
            };
            const _onBlur = (Event) => {
                this.on('blur')(Event);
            };
            return html `<${JCL_native.TextlineInput} Class="WAT Content TextlineInput"
        Value=${Value == null ? '' : '' + Value} Placeholder=${Placeholder}
        readonly=${readonly} minLength=${minLength} maxLength=${maxLength}
        Pattern=${Pattern} SpellCheck=${SpellChecking}
        Suggestions=${Suggestions} disabled=${Enabling === false}
        onValueInput=${_onValueInput} onBlur=${_onBlur}
      />`;
        });
    };
    registerIntrinsicBehavior(Applet, 'widget', 'native_controls.TextlineInput', WAT_TextlineInput);
    /**** PasswordInput ****/
    // a thin WAT wrapper around the "native.PasswordInput" component from the
    // "javascript-code-library" (JCL) - the actual appearance and the protection
    // of local input against external changes now come from JCL, this behavior
    // only contributes widget geometry and the WAT property interface
    const WAT_PasswordInput = async (me, my, html, reactively, on, onReady, onRender, onMount, onUpdate, onUnmount, onValueChange, installStylesheet, BehaviorIsNew) => {
        installStylesheet(`
      .WAT.Widget > .WAT.PasswordInput {
        left:1px; top:1px; right:1px; bottom:1px; width:auto; height:auto;
        line-height:normal;
      }
    `); // geometry only - the look itself comes from JCL
        /**** custom Properties ****/
        my.configurableProperties = [
            { Name: 'Value',
                EditorType: 'password-input', AccessorsFor: 'memoized', withCallback: true },
            { Name: 'Placeholder',
                EditorType: 'textline-input', AccessorsFor: 'memoized' },
            { Name: 'readonly',
                EditorType: 'checkbox', AccessorsFor: 'memoized' },
            { Name: 'minLength', minValue: 0, Stepping: 1,
                EditorType: 'integer-input', AccessorsFor: 'memoized' },
            { Name: 'maxLength', minValue: 0, Stepping: 1,
                EditorType: 'integer-input', AccessorsFor: 'memoized' },
            { Name: 'Pattern',
                EditorType: 'textline-input', AccessorsFor: 'memoized',
                Validator: (Value) => ValueIsTextline(Value) && PatternIsCompilable(Value) },
        ];
        /**** Renderer ****/
        onRender(function () {
            const { Value, Enabling, Placeholder, readonly, minLength, maxLength, Pattern } = this;
            const _onValueInput = (newValue, Event) => {
                if (Enabling === false) {
                    return;
                }
                this.Value = newValue;
                this.on('input')(Event);
            };
            const _onBlur = (Event) => {
                this.on('blur')(Event);
            };
            return html `<${JCL_native.PasswordInput} Class="WAT Content PasswordInput"
        Value=${Value == null ? '' : '' + Value} Placeholder=${Placeholder}
        readonly=${readonly} minLength=${minLength} maxLength=${maxLength}
        Pattern=${Pattern} disabled=${Enabling === false}
        onValueInput=${_onValueInput} onBlur=${_onBlur}
      />`;
        });
    };
    registerIntrinsicBehavior(Applet, 'widget', 'native_controls.PasswordInput', WAT_PasswordInput);
    /**** NumberInput ****/
    // a thin WAT wrapper around the "native.NumberInput" component from the
    // "javascript-code-library" (JCL) - the actual appearance and the protection
    // of local input against external changes now come from JCL, this behavior
    // only contributes widget geometry and the WAT property interface
    const WAT_NumberInput = async (me, my, html, reactively, on, onReady, onRender, onMount, onUpdate, onUnmount, onValueChange, installStylesheet, BehaviorIsNew) => {
        installStylesheet(`
      .WAT.Widget > .WAT.NumberInput {
        left:1px; top:1px; right:1px; bottom:1px; width:auto; height:auto;
        line-height:normal;
      }
    `); // geometry only - the look itself comes from JCL
        /**** custom Properties ****/
        my.configurableProperties = [
            { Name: 'Value',
                EditorType: 'number-input', AccessorsFor: 'memoized', withCallback: true },
            { Name: 'Placeholder',
                EditorType: 'textline-input', AccessorsFor: 'memoized' },
            { Name: 'readonly',
                EditorType: 'checkbox', AccessorsFor: 'memoized' },
            { Name: 'Minimum',
                EditorType: 'number-input', AccessorsFor: 'memoized' },
            { Name: 'Stepping',
                EditorType: 'number-input', AccessorsFor: 'memoized', minValue: 0, withMin: false },
            { Name: 'Maximum',
                EditorType: 'number-input', AccessorsFor: 'memoized' },
            { Name: 'Suggestions',
                EditorType: 'numberlist-input', AccessorsFor: 'memoized' },
        ];
        /**** Renderer ****/
        onRender(function () {
            const { Value, Enabling, Placeholder, readonly, Minimum, Stepping, Maximum, Suggestions } = this;
            const _onValueInput = (newValue, Event) => {
                if (Enabling === false) {
                    return;
                }
                this.Value = newValue;
                this.on('input')(Event);
            };
            const _onBlur = (Event) => {
                this.on('blur')(Event);
            };
            return html `<${JCL_native.NumberInput} Class="WAT Content NumberInput"
        Value=${Value == null ? undefined : parseFloat(Value)}
        Placeholder=${Placeholder} readonly=${readonly}
        Minimum=${Minimum} Maximum=${Maximum} Step=${Stepping}
        Suggestions=${Suggestions} disabled=${Enabling === false}
        onValueInput=${_onValueInput} onBlur=${_onBlur}
      />`;
        });
    };
    registerIntrinsicBehavior(Applet, 'widget', 'native_controls.NumberInput', WAT_NumberInput);
    /**** PhoneNumberInput ****/
    // a thin WAT wrapper around the "native.PhoneNumberInput" component from the
    // "javascript-code-library" (JCL) - the actual appearance and the protection
    // of local input against external changes now come from JCL, this behavior
    // only contributes widget geometry and the WAT property interface
    const WAT_PhoneNumberInput = async (me, my, html, reactively, on, onReady, onRender, onMount, onUpdate, onUnmount, onValueChange, installStylesheet, BehaviorIsNew) => {
        installStylesheet(`
      .WAT.Widget > .WAT.PhoneNumberInput {
        left:1px; top:1px; right:1px; bottom:1px; width:auto; height:auto;
        line-height:normal;
      }
    `); // geometry only - the look itself comes from JCL
        /**** custom Properties ****/
        my.configurableProperties = [
            { Name: 'Value',
                EditorType: 'phone-number-input', AccessorsFor: 'memoized', withCallback: true },
            { Name: 'Placeholder',
                EditorType: 'textline-input', AccessorsFor: 'memoized' },
            { Name: 'readonly',
                EditorType: 'checkbox', AccessorsFor: 'memoized' },
            { Name: 'minLength', minValue: 0, Stepping: 1,
                EditorType: 'integer-input', AccessorsFor: 'memoized' },
            { Name: 'maxLength', minValue: 0, Stepping: 1,
                EditorType: 'integer-input', AccessorsFor: 'memoized' },
            { Name: 'Pattern',
                EditorType: 'textline-input', AccessorsFor: 'memoized',
                Validator: (Value) => ValueIsTextline(Value) && PatternIsCompilable(Value) },
            { Name: 'SpellChecking',
                EditorType: 'checkbox', AccessorsFor: 'memoized' },
            { Name: 'Suggestions',
                EditorType: 'linelist-input', AccessorsFor: 'memoized' },
        ];
        /**** Renderer ****/
        onRender(function () {
            const { Value, Enabling, Placeholder, readonly, minLength, maxLength, Pattern, SpellChecking, Suggestions } = this;
            const _onValueInput = (newValue, Event) => {
                if (Enabling === false) {
                    return;
                }
                this.Value = newValue;
                this.on('input')(Event);
            };
            const _onBlur = (Event) => {
                this.on('blur')(Event);
            };
            return html `<${JCL_native.PhoneNumberInput} Class="WAT Content PhoneNumberInput"
        Value=${Value == null ? '' : '' + Value} Placeholder=${Placeholder}
        readonly=${readonly} minLength=${minLength} maxLength=${maxLength}
        Pattern=${Pattern} spellcheck=${SpellChecking}
        Suggestions=${Suggestions} disabled=${Enabling === false}
        onValueInput=${_onValueInput} onBlur=${_onBlur}
      />`;
        }); // "spellcheck" reaches the <input> via JCL "RestProps"
    };
    registerIntrinsicBehavior(Applet, 'widget', 'native_controls.PhoneNumberInput', WAT_PhoneNumberInput);
    /**** EMailAddressInput ****/
    // a thin WAT wrapper around the "native.EMailAddressInput" component from the
    // "javascript-code-library" (JCL) - the actual appearance and the protection
    // of local input against external changes now come from JCL, this behavior
    // only contributes widget geometry and the WAT property interface
    const WAT_EMailAddressInput = async (me, my, html, reactively, on, onReady, onRender, onMount, onUpdate, onUnmount, onValueChange, installStylesheet, BehaviorIsNew) => {
        installStylesheet(`
      .WAT.Widget > .WAT.EMailAddressInput {
        left:1px; top:1px; right:1px; bottom:1px; width:auto; height:auto;
        line-height:normal;
      }
    `); // geometry only - the look itself comes from JCL
        /**** custom Properties ****/
        my.configurableProperties = [
            { Name: 'Value',
                EditorType: 'email-address-input', AccessorsFor: 'memoized', withCallback: true },
            { Name: 'Placeholder',
                EditorType: 'textline-input', AccessorsFor: 'memoized' },
            { Name: 'readonly',
                EditorType: 'checkbox', AccessorsFor: 'memoized' },
            { Name: 'minLength', minValue: 0, Stepping: 1,
                EditorType: 'integer-input', AccessorsFor: 'memoized' },
            { Name: 'maxLength', minValue: 0, Stepping: 1,
                EditorType: 'integer-input', AccessorsFor: 'memoized' },
            { Name: 'Pattern',
                EditorType: 'textline-input', AccessorsFor: 'memoized',
                Validator: (Value) => ValueIsTextline(Value) && PatternIsCompilable(Value) },
            { Name: 'SpellChecking',
                EditorType: 'checkbox', AccessorsFor: 'memoized' },
            { Name: 'Suggestions',
                EditorType: 'linelist-input', AccessorsFor: 'memoized' },
        ];
        /**** Renderer ****/
        onRender(function () {
            const { Value, Enabling, Placeholder, readonly, minLength, maxLength, Pattern, SpellChecking, Suggestions } = this;
            const _onValueInput = (newValue, Event) => {
                if (Enabling === false) {
                    return;
                }
                this.Value = newValue;
                this.on('input')(Event);
            };
            const _onBlur = (Event) => {
                this.on('blur')(Event);
            };
            return html `<${JCL_native.EMailAddressInput} Class="WAT Content EMailAddressInput"
        Value=${Value == null ? '' : '' + Value} Placeholder=${Placeholder}
        readonly=${readonly} minLength=${minLength} maxLength=${maxLength}
        Pattern=${Pattern} spellcheck=${SpellChecking}
        Suggestions=${Suggestions} disabled=${Enabling === false}
        onValueInput=${_onValueInput} onBlur=${_onBlur}
      />`;
        }); // "spellcheck" reaches the <input> via JCL "RestProps"
    };
    registerIntrinsicBehavior(Applet, 'widget', 'native_controls.EMailAddressInput', WAT_EMailAddressInput);
    /**** URLInput ****/
    // a thin WAT wrapper around the "native.URLInput" component from the
    // "javascript-code-library" (JCL) - the actual appearance and the protection
    // of local input against external changes now come from JCL, this behavior
    // only contributes widget geometry and the WAT property interface
    const WAT_URLInput = async (me, my, html, reactively, on, onReady, onRender, onMount, onUpdate, onUnmount, onValueChange, installStylesheet, BehaviorIsNew) => {
        installStylesheet(`
      .WAT.Widget > .WAT.URLInput {
        left:1px; top:1px; right:1px; bottom:1px; width:auto; height:auto;
        line-height:normal;
      }
    `); // geometry only - the look itself comes from JCL
        /**** custom Properties ****/
        my.configurableProperties = [
            { Name: 'Value',
                EditorType: 'url-input', AccessorsFor: 'memoized', withCallback: true },
            { Name: 'Placeholder',
                EditorType: 'textline-input', AccessorsFor: 'memoized' },
            { Name: 'readonly',
                EditorType: 'checkbox', AccessorsFor: 'memoized' },
            { Name: 'minLength', minValue: 0, Stepping: 1,
                EditorType: 'integer-input', AccessorsFor: 'memoized' },
            { Name: 'maxLength', minValue: 0, Stepping: 1,
                EditorType: 'integer-input', AccessorsFor: 'memoized' },
            { Name: 'Pattern',
                EditorType: 'textline-input', AccessorsFor: 'memoized',
                Validator: (Value) => ValueIsTextline(Value) && PatternIsCompilable(Value) },
            { Name: 'SpellChecking',
                EditorType: 'checkbox', AccessorsFor: 'memoized' },
            { Name: 'Suggestions',
                EditorType: 'linelist-input', AccessorsFor: 'memoized' },
        ];
        /**** Renderer ****/
        onRender(function () {
            const { Value, Enabling, Placeholder, readonly, minLength, maxLength, Pattern, SpellChecking, Suggestions } = this;
            const _onValueInput = (newValue, Event) => {
                if (Enabling === false) {
                    return;
                }
                this.Value = newValue;
                this.on('input')(Event);
            };
            const _onBlur = (Event) => {
                this.on('blur')(Event);
            };
            return html `<${JCL_native.URLInput} Class="WAT Content URLInput"
        Value=${Value == null ? '' : '' + Value} Placeholder=${Placeholder}
        readonly=${readonly} minLength=${minLength} maxLength=${maxLength}
        Pattern=${Pattern} spellcheck=${SpellChecking}
        Suggestions=${Suggestions} disabled=${Enabling === false}
        onValueInput=${_onValueInput} onBlur=${_onBlur}
      />`;
        }); // "spellcheck" reaches the <input> via JCL "RestProps"
    };
    registerIntrinsicBehavior(Applet, 'widget', 'native_controls.URLInput', WAT_URLInput);
    /**** TimeInput ****/
    // a thin WAT wrapper around the "native.TimeInput" component from the
    // "javascript-code-library" (JCL) - the actual appearance and the protection
    // of local input against external changes now come from JCL, this behavior
    // only contributes widget geometry and the WAT property interface
    const WAT_TimeInput = async (me, my, html, reactively, on, onReady, onRender, onMount, onUpdate, onUnmount, onValueChange, installStylesheet, BehaviorIsNew) => {
        installStylesheet(`
      .WAT.Widget > .WAT.TimeInput {
        left:1px; top:1px; right:1px; bottom:1px; width:auto; height:auto;
        line-height:normal;
      }
    `); // geometry only - the look itself comes from JCL
        /**** custom Properties ****/
        my.configurableProperties = [
            { Name: 'Value',
                EditorType: 'time-input', AccessorsFor: 'memoized', withCallback: true },
            { Name: 'readonly',
                EditorType: 'checkbox', AccessorsFor: 'memoized' },
            { Name: 'withSeconds', Label: 'with Seconds',
                EditorType: 'checkbox', AccessorsFor: 'memoized' },
            { Name: 'Minimum',
                EditorType: 'time-input', AccessorsFor: 'memoized' },
            { Name: 'Maximum',
                EditorType: 'time-input', AccessorsFor: 'memoized' },
            { Name: 'Suggestions', Pattern: WAT_TimeRegExp,
                EditorType: 'linelist-input', AccessorsFor: 'memoized' },
        ];
        /**** Renderer ****/
        onRender(function () {
            const { Value, Enabling, readonly, withSeconds, Minimum, Maximum, Suggestions } = this;
            const _onValueInput = (newValue, Event) => {
                if (Enabling === false) {
                    return;
                }
                this.Value = newValue;
                this.on('input')(Event);
            };
            const _onBlur = (Event) => {
                this.on('blur')(Event);
            };
            return html `<${JCL_native.TimeInput} Class="WAT Content TimeInput"
        Value=${Value == null ? '' : '' + Value} readonly=${readonly}
        withSeconds=${withSeconds} Minimum=${Minimum} Maximum=${Maximum}
        Suggestions=${Suggestions} disabled=${Enabling === false}
        onValueInput=${_onValueInput} onBlur=${_onBlur}
      />`;
        });
    };
    registerIntrinsicBehavior(Applet, 'widget', 'native_controls.TimeInput', WAT_TimeInput);
    /**** DateTimeInput ****/
    // a thin WAT wrapper around the "native.DateTimeInput" component from the
    // "javascript-code-library" (JCL) - the actual appearance and the protection
    // of local input against external changes now come from JCL, this behavior
    // only contributes widget geometry and the WAT property interface
    const WAT_DateTimeInput = async (me, my, html, reactively, on, onReady, onRender, onMount, onUpdate, onUnmount, onValueChange, installStylesheet, BehaviorIsNew) => {
        installStylesheet(`
      .WAT.Widget > .WAT.DateTimeInput {
        left:1px; top:1px; right:1px; bottom:1px; width:auto; height:auto;
        line-height:normal;
      }
    `); // geometry only - the look itself comes from JCL
        /**** custom Properties ****/
        my.configurableProperties = [
            { Name: 'Value',
                EditorType: 'date-time-input', AccessorsFor: 'memoized', withCallback: true },
            { Name: 'readonly',
                EditorType: 'checkbox', AccessorsFor: 'memoized' },
            { Name: 'withSeconds', Label: 'with Seconds',
                EditorType: 'checkbox', AccessorsFor: 'memoized' },
            { Name: 'Minimum',
                EditorType: 'date-time-input', AccessorsFor: 'memoized' },
            { Name: 'Maximum',
                EditorType: 'date-time-input', AccessorsFor: 'memoized' },
            { Name: 'Suggestions', Pattern: WAT_DateTimeRegExp,
                EditorType: 'linelist-input', AccessorsFor: 'memoized' },
        ];
        /**** Renderer ****/
        onRender(function () {
            const { Value, Enabling, readonly, withSeconds, Minimum, Maximum, Suggestions } = this;
            const _onValueInput = (newValue, Event) => {
                if (Enabling === false) {
                    return;
                }
                this.Value = newValue;
                this.on('input')(Event);
            };
            const _onBlur = (Event) => {
                this.on('blur')(Event);
            };
            return html `<${JCL_native.DateTimeInput} Class="WAT Content DateTimeInput"
        Value=${Value == null ? '' : '' + Value} readonly=${readonly}
        withSeconds=${withSeconds} Minimum=${Minimum} Maximum=${Maximum}
        Suggestions=${Suggestions} disabled=${Enabling === false}
        onValueInput=${_onValueInput} onBlur=${_onBlur}
      />`;
        });
    };
    registerIntrinsicBehavior(Applet, 'widget', 'native_controls.DateTimeInput', WAT_DateTimeInput);
    /**** DateInput ****/
    // a thin WAT wrapper around the "native.DateInput" component from the
    // "javascript-code-library" (JCL) - the actual appearance and the protection
    // of local input against external changes now come from JCL, this behavior
    // only contributes widget geometry and the WAT property interface
    const WAT_DateInput = async (me, my, html, reactively, on, onReady, onRender, onMount, onUpdate, onUnmount, onValueChange, installStylesheet, BehaviorIsNew) => {
        installStylesheet(`
      .WAT.Widget > .WAT.DateInput {
        left:1px; top:1px; right:1px; bottom:1px; width:auto; height:auto;
        line-height:normal;
      }
    `); // geometry only - the look itself comes from JCL
        /**** custom Properties ****/
        my.configurableProperties = [
            { Name: 'Value',
                EditorType: 'date-input', AccessorsFor: 'memoized', withCallback: true },
            { Name: 'readonly',
                EditorType: 'checkbox', AccessorsFor: 'memoized' },
            { Name: 'Minimum',
                EditorType: 'date-input', AccessorsFor: 'memoized' },
            { Name: 'Maximum',
                EditorType: 'date-input', AccessorsFor: 'memoized' },
            { Name: 'Suggestions', Pattern: WAT_DateRegExp,
                EditorType: 'linelist-input', AccessorsFor: 'memoized' },
        ];
        { // *C* migrate pre-anchor datetime-local values
            const memoized = me.memoized;
            const Value = memoized === null || memoized === void 0 ? void 0 : memoized.Value;
            if (ValueIsString(Value) && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/.test(Value)) {
                memoized.Value = Value.slice(0, 10);
            }
        }
        /**** Renderer ****/
        onRender(function () {
            const { Value, Enabling, readonly, Minimum, Maximum, Suggestions } = this;
            const _onValueInput = (newValue, Event) => {
                if (Enabling === false) {
                    return;
                }
                this.Value = newValue;
                this.on('input')(Event);
            };
            const _onBlur = (Event) => {
                this.on('blur')(Event);
            };
            return html `<${JCL_native.DateInput} Class="WAT Content DateInput"
        Value=${Value == null ? '' : '' + Value} readonly=${readonly}
        Minimum=${Minimum} Maximum=${Maximum}
        Suggestions=${Suggestions} disabled=${Enabling === false}
        onValueInput=${_onValueInput} onBlur=${_onBlur}
      />`;
        });
    };
    registerIntrinsicBehavior(Applet, 'widget', 'native_controls.DateInput', WAT_DateInput);
    /**** WeekInput ****/
    // a thin WAT wrapper around the "native.WeekInput" component from the
    // "javascript-code-library" (JCL) - the actual appearance and the protection
    // of local input against external changes now come from JCL, this behavior
    // only contributes widget geometry and the WAT property interface
    const WAT_WeekInput = async (me, my, html, reactively, on, onReady, onRender, onMount, onUpdate, onUnmount, onValueChange, installStylesheet, BehaviorIsNew) => {
        installStylesheet(`
      .WAT.Widget > .WAT.WeekInput {
        left:1px; top:1px; right:1px; bottom:1px; width:auto; height:auto;
        line-height:normal;
      }
    `); // geometry only - the look itself comes from JCL
        /**** custom Properties ****/
        my.configurableProperties = [
            { Name: 'Value',
                EditorType: 'week-input', AccessorsFor: 'memoized', withCallback: true },
            { Name: 'readonly',
                EditorType: 'checkbox', AccessorsFor: 'memoized' },
            { Name: 'Minimum',
                EditorType: 'week-input', AccessorsFor: 'memoized' },
            { Name: 'Maximum',
                EditorType: 'week-input', AccessorsFor: 'memoized' },
            { Name: 'Suggestions', Pattern: WAT_WeekRegExp,
                EditorType: 'linelist-input', AccessorsFor: 'memoized' },
        ];
        { // *C* migrate pre-anchor datetime-local values
            const memoized = me.memoized;
            const Value = memoized === null || memoized === void 0 ? void 0 : memoized.Value;
            if (ValueIsString(Value) && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/.test(Value)) {
                console.warn('WeekInput: discarding pre-anchor datetime-local value', Value);
                delete memoized.Value;
            }
        }
        /**** Renderer ****/
        onRender(function () {
            const { Value, Enabling, readonly, Minimum, Maximum, Suggestions } = this;
            const _onValueInput = (newValue, Event) => {
                if (Enabling === false) {
                    return;
                }
                this.Value = newValue;
                this.on('input')(Event);
            };
            const _onBlur = (Event) => {
                this.on('blur')(Event);
            };
            return html `<${JCL_native.WeekInput} Class="WAT Content WeekInput"
        Value=${Value == null ? '' : '' + Value} readonly=${readonly}
        Minimum=${Minimum} Maximum=${Maximum}
        Suggestions=${Suggestions} disabled=${Enabling === false}
        onValueInput=${_onValueInput} onBlur=${_onBlur}
      />`;
        });
    };
    registerIntrinsicBehavior(Applet, 'widget', 'native_controls.WeekInput', WAT_WeekInput);
    /**** MonthInput ****/
    // a thin WAT wrapper around the "native.MonthInput" component from the
    // "javascript-code-library" (JCL) - the actual appearance and the protection
    // of local input against external changes now come from JCL, this behavior
    // only contributes widget geometry and the WAT property interface
    const WAT_MonthInput = async (me, my, html, reactively, on, onReady, onRender, onMount, onUpdate, onUnmount, onValueChange, installStylesheet, BehaviorIsNew) => {
        installStylesheet(`
      .WAT.Widget > .WAT.MonthInput {
        left:1px; top:1px; right:1px; bottom:1px; width:auto; height:auto;
        line-height:normal;
      }
    `); // geometry only - the look itself comes from JCL
        /**** custom Properties ****/
        my.configurableProperties = [
            { Name: 'Value',
                EditorType: 'month-input', AccessorsFor: 'memoized', withCallback: true },
            { Name: 'readonly',
                EditorType: 'checkbox', AccessorsFor: 'memoized' },
            { Name: 'Minimum',
                EditorType: 'month-input', AccessorsFor: 'memoized' },
            { Name: 'Maximum',
                EditorType: 'month-input', AccessorsFor: 'memoized' },
            { Name: 'Suggestions', Pattern: WAT_MonthRegExp,
                EditorType: 'linelist-input', AccessorsFor: 'memoized' },
        ];
        { // *C* migrate pre-anchor datetime-local values
            const memoized = me.memoized;
            const Value = memoized === null || memoized === void 0 ? void 0 : memoized.Value;
            if (ValueIsString(Value) && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/.test(Value)) {
                memoized.Value = Value.slice(0, 7);
            }
        }
        /**** Renderer ****/
        onRender(function () {
            const { Value, Enabling, readonly, Minimum, Maximum, Suggestions } = this;
            const _onValueInput = (newValue, Event) => {
                if (Enabling === false) {
                    return;
                }
                this.Value = newValue;
                this.on('input')(Event);
            };
            const _onBlur = (Event) => {
                this.on('blur')(Event);
            };
            return html `<${JCL_native.MonthInput} Class="WAT Content MonthInput"
        Value=${Value == null ? '' : '' + Value} readonly=${readonly}
        Minimum=${Minimum} Maximum=${Maximum}
        Suggestions=${Suggestions} disabled=${Enabling === false}
        onValueInput=${_onValueInput} onBlur=${_onBlur}
      />`;
        });
    };
    registerIntrinsicBehavior(Applet, 'widget', 'native_controls.MonthInput', WAT_MonthInput);
    /**** FileInput ****/
    const WAT_FileInput = async (me, my, html, reactively, on, onReady, onRender, onMount, onUpdate, onUnmount, onValueChange, installStylesheet, BehaviorIsNew) => {
        installStylesheet(`
      .WAT.Widget > .WAT.FileInput {
        left:1px; top:1px; right:1px; bottom:1px; width:auto; height:auto;
        border:solid 1px #888888; border-radius:2px;
        background:#e8f0ff;
        padding:0px 2px 0px 2px;
      }
      .WAT.Widget > .WAT.FileInput > span {
        display:block; position:absolute; overflow:hidden;
        left:0px; top:0px; width:100%; height:100%;
        color:gray;
        padding:0px 2px 0px 2px; white-space:pre; text-overflow:ellipsis;
      }
    `);
        /**** custom Properties ****/
        my.configurableProperties = [
            { Name: 'Value',
                EditorType: 'text-input', AccessorsFor: 'memoized', withCallback: true },
            { Name: 'Placeholder',
                EditorType: 'textline-input', AccessorsFor: 'memoized' },
            { Name: 'allowMultiple', Label: 'multiple',
                EditorType: 'checkbox', AccessorsFor: 'memoized' },
            { Name: 'acceptableFileTypes', Label: 'File Types', Default: [],
                EditorType: 'linelist-input', AccessorsFor: 'memoized' },
        ];
        /**** Renderer ****/
        onRender(function () {
            const { Value, Enabling, Placeholder, allowMultiple, acceptableFileTypes } = this;
            const acceptedFilesIn = (FileList) => {
                let acceptedFiles = Array.from(FileList);
                if ((acceptableFileTypes != null) && (acceptableFileTypes.length > 0)) {
                    acceptedFiles = acceptedFiles.filter((acceptedFile) => (acceptableFileTypes.some((FileType) => {
                        FileType = FileType.trim().toLowerCase();
                        return (FileType.startsWith('.') ? acceptedFile.name.toLowerCase().endsWith(FileType) :
                            FileType.endsWith('/*') ? acceptedFile.type.toLowerCase().startsWith(FileType.slice(0, -1)) :
                                (acceptedFile.type.toLowerCase() === FileType));
                    })));
                }
                if ((allowMultiple != true) && (acceptedFiles.length > 1)) {
                    acceptedFiles = acceptedFiles.slice(0, 1);
                }
                return acceptedFiles;
            }; // the file dialog does not enforce "accept" settings
            const _onInput = async (Event) => {
                if (this.Enabling === false) {
                    return consumingEvent(Event);
                }
                const acceptedFiles = acceptedFilesIn(Event.target.files);
                if (acceptedFiles.length === 0) {
                    Event.target.value = '';
                    return;
                }
                this.Value = acceptedFiles.map((File) => File.name).join('\n');
                // *C* NOTE: "input" is fired with (Event,FileList) here - unlike other widgets
                await this.on('input')(Event, acceptedFiles);
                Event.target.value = '';
            };
            const _onDragEnter = (Event) => { return consumingEvent(Event); };
            const _onDragOver = (Event) => { return consumingEvent(Event); };
            const _onDrop = async (Event) => {
                consumeEvent(Event);
                if (this.Enabling === false) {
                    return;
                }
                const droppedFiles = acceptedFilesIn(Event.dataTransfer.files);
                if (droppedFiles.length === 0) {
                    return;
                }
                this.Value = droppedFiles.map((File) => File.name).join('\n');
                await this.on('drop')(Event, droppedFiles);
            }; // nota bene: "files" is now in "Event.dataTransfer.files"
            /**** actual rendering ****/
            return html `<label class="WAT Content FileInput"
        onDragEnter=${_onDragEnter} onDragOver=${_onDragOver} onDrop=${_onDrop}
      >
        ${(Value || '') === ''
                ? (Placeholder || '') === '' ? '' : html `<span style="
              font-size:${Math.round((this.FontSize || 14) * 0.95)}px; line-height:${this.Height}px
            ">${Placeholder}</span>`
                : html `<span style="line-height:${this.Height}px">${Value}</span>`}
        <input type="file" style="display:none"
          multiple=${allowMultiple} accept=${acceptableFileTypes}
          disabled=${Enabling === false} onInput=${_onInput}
        />
      </label>`;
        });
    };
    registerIntrinsicBehavior(Applet, 'widget', 'native_controls.FileInput', WAT_FileInput);
    /**** PseudoFileInput ****/
    // a thin WAT wrapper around the "legacy.PseudoFileInput" component from the
    // "javascript-code-library" (JCL) - the actual appearance now comes from JCL,
    // this behavior only contributes widget geometry, file type filtering and
    // the WAT property interface
    const WAT_PseudoFileInput = async (me, my, html, reactively, on, onReady, onRender, onMount, onUpdate, onUnmount, onValueChange, installStylesheet, BehaviorIsNew) => {
        installStylesheet(`
      .WAT.Widget > .WAT.PseudoFileInput > div {
        user-select:none;
      }
    `); // only rules JCL does not provide - the look itself comes from JCL
        /**** custom Properties ****/
        my.configurableProperties = [
            { Name: 'Value',
                EditorType: 'text-input', AccessorsFor: 'memoized', withCallback: true },
            { Name: 'Icon', Default: 'icons/arrow-up-from-bracket.png',
                EditorType: 'url-input', AccessorsFor: 'none' },
            { Name: 'allowMultiple', Label: 'multiple',
                EditorType: 'checkbox', AccessorsFor: 'memoized' },
            { Name: 'acceptableFileTypes', Label: 'File Types', Default: [],
                EditorType: 'linelist-input', AccessorsFor: 'memoized' },
        ];
        Object_assign(me, {
            /**** Icon ****/
            get Icon() {
                return acceptableValue(this.memoized.Icon, ValueIsURL, '');
            },
            set Icon(newValue) {
                if (ValueIsString(newValue) && ((newValue === null || newValue === void 0 ? void 0 : newValue.trim()) === '')) {
                    newValue = undefined;
                }
                allowURL('icon URL', newValue);
                if (this.memoized.Icon !== newValue) {
                    this.memoized.Icon = newValue;
                    this.rerender();
                }
            },
        });
        /**** Renderer ****/
        onRender(function () {
            const { Enabling, Icon, Color, allowMultiple, acceptableFileTypes } = this;
            const IconURL = this.Applet.AssetURL(this.Icon.trim() === '' ? '/icons/arrow-up-from-bracket.png' : this.Icon);
            const acceptedFilesIn = (FileList) => {
                let acceptedFiles = Array.from(FileList);
                if ((acceptableFileTypes != null) && (acceptableFileTypes.length > 0)) {
                    acceptedFiles = acceptedFiles.filter((acceptedFile) => (acceptableFileTypes.some((FileType) => {
                        FileType = FileType.trim().toLowerCase();
                        return (FileType.startsWith('.') ? acceptedFile.name.toLowerCase().endsWith(FileType) :
                            FileType.endsWith('/*') ? acceptedFile.type.toLowerCase().startsWith(FileType.slice(0, -1)) :
                                (acceptedFile.type.toLowerCase() === FileType));
                    })));
                }
                if ((allowMultiple != true) && (acceptedFiles.length > 1)) {
                    acceptedFiles = acceptedFiles.slice(0, 1);
                }
                return acceptedFiles;
            }; // the file dialog does not enforce "accept" settings
            const _onValueInput = async (ValueList, Event) => {
                if (this.Enabling == false) {
                    return;
                }
                const acceptedFiles = acceptedFilesIn(ValueList);
                if (acceptedFiles.length === 0) {
                    return;
                }
                this.Value = acceptedFiles.map((File) => File.name).join('\n');
                // *C* NOTE: "input" is fired with (Event,FileList) here - unlike other widgets
                await this.on('input')(Event, acceptedFiles);
            };
            /**** actual rendering ****/
            return html `<${JCL_legacy.PseudoFileInput} Class="WAT Content PseudoFileInput"
        Icon=${IconURL} Color=${Color || 'black'} multiple=${allowMultiple}
        Accept=${acceptableFileTypes == null ? undefined : acceptableFileTypes.join(',')}
        disabled=${Enabling === false} onValueInput=${_onValueInput}
      />`;
        });
    };
    registerIntrinsicBehavior(Applet, 'widget', 'native_controls.PseudoFileInput', WAT_PseudoFileInput);
    /**** FileDropArea ****/
    const WAT_FileDropArea = async (me, my, html, reactively, on, onReady, onRender, onMount, onUpdate, onUnmount, onValueChange, installStylesheet, BehaviorIsNew) => {
        installStylesheet(`
      .WAT.Widget > .WAT.FileDropArea {
        display:flex; flex-flow:column nowrap;
          justify-content:center; align-items:center;
        border:dashed 4px #DDDDDD; border-radius:4px;
        color:#DDDDDD; background:white;
      }

      .WAT.Widget > .WAT.FileDropArea * { pointer-events:none }

      .WAT.Widget > .WAT.FileDropArea > input[type="file"] {
        display:block; position:absolute; appearance:none;
        left:0px; top:0px; right:0px; bottom:0px;
        opacity:0.01;
      }
    `);
        /**** custom Properties ****/
        my.configurableProperties = [
            { Name: 'Value',
                EditorType: 'text-input', AccessorsFor: 'memoized', withCallback: true },
            { Name: 'Placeholder',
                EditorType: 'textline-input', AccessorsFor: 'memoized' },
            { Name: 'allowMultiple', Label: 'multiple',
                EditorType: 'checkbox', AccessorsFor: 'memoized' },
            { Name: 'acceptableFileTypes', Label: 'File Types', Default: [],
                EditorType: 'linelist-input', AccessorsFor: 'memoized' },
        ];
        /**** Renderer ****/
        onRender(function () {
            const { Value, Enabling, Placeholder, allowMultiple, acceptableFileTypes } = this;
            const acceptedFilesIn = (FileList) => {
                let acceptedFiles = Array.from(FileList);
                if ((acceptableFileTypes != null) && (acceptableFileTypes.length > 0)) {
                    acceptedFiles = acceptedFiles.filter((acceptedFile) => (acceptableFileTypes.some((FileType) => {
                        FileType = FileType.trim().toLowerCase();
                        return (FileType.startsWith('.') ? acceptedFile.name.toLowerCase().endsWith(FileType) :
                            FileType.endsWith('/*') ? acceptedFile.type.toLowerCase().startsWith(FileType.slice(0, -1)) :
                                (acceptedFile.type.toLowerCase() === FileType));
                    })));
                }
                if ((allowMultiple != true) && (acceptedFiles.length > 1)) {
                    acceptedFiles = acceptedFiles.slice(0, 1);
                }
                return acceptedFiles;
            }; // the file dialog does not enforce "accept" settings
            const _onInput = async (Event) => {
                if (this.Enabling === false) {
                    return consumingEvent(Event);
                }
                const acceptedFiles = acceptedFilesIn(Event.target.files);
                if (acceptedFiles.length === 0) {
                    Event.target.value = '';
                    return;
                }
                this.Value = acceptedFiles.map((File) => File.name).join('\n');
                // *C* NOTE: "input" is fired with (Event,FileList) here - unlike other widgets
                await this.on('input')(Event, acceptedFiles);
                Event.target.value = '';
            };
            const _onDragEnter = (Event) => { return consumingEvent(Event); };
            const _onDragOver = (Event) => { return consumingEvent(Event); };
            const _onDrop = async (Event) => {
                consumeEvent(Event);
                if (this.Enabling === false) {
                    return;
                }
                const droppedFiles = acceptedFilesIn(Event.dataTransfer.files);
                if (droppedFiles.length === 0) {
                    return;
                }
                this.Value = droppedFiles.map((File) => File.name).join('\n');
                await this.on('drop')(Event, droppedFiles);
            }; // nota bene: "files" is now in "Event.dataTransfer.files"
            /**** actual rendering ****/
            return html `<label class="WAT Content FileDropArea"
        onDragEnter=${_onDragEnter} onDragOver=${_onDragOver} onDrop=${_onDrop}>
        <span>${Placeholder}</span>
        <input type="file"
          multiple=${allowMultiple} accept=${acceptableFileTypes}
          disabled=${Enabling === false} onInput=${_onInput}
        />
      </label>`;
        });
    };
    registerIntrinsicBehavior(Applet, 'widget', 'native_controls.FileDropArea', WAT_FileDropArea);
    /**** SearchInput ****/
    // a thin WAT wrapper around the "native.SearchInput" component from the
    // "javascript-code-library" (JCL) - the actual appearance and the protection
    // of local input against external changes now come from JCL, this behavior
    // only contributes widget geometry and the WAT property interface
    const WAT_SearchInput = async (me, my, html, reactively, on, onReady, onRender, onMount, onUpdate, onUnmount, onValueChange, installStylesheet, BehaviorIsNew) => {
        installStylesheet(`
      .WAT.Widget > .WAT.SearchInput {
        left:1px; top:1px; right:1px; bottom:1px; width:auto; height:auto;
        line-height:normal;
      }
    `); // geometry only - the look itself comes from JCL
        /**** custom Properties ****/
        my.configurableProperties = [
            { Name: 'Value',
                EditorType: 'textline-input', AccessorsFor: 'memoized', withCallback: true },
            { Name: 'Placeholder',
                EditorType: 'textline-input', AccessorsFor: 'memoized' },
            { Name: 'readonly',
                EditorType: 'checkbox', AccessorsFor: 'memoized' },
            { Name: 'minLength', minValue: 0, Stepping: 1,
                EditorType: 'integer-input', AccessorsFor: 'memoized' },
            { Name: 'maxLength', minValue: 0, Stepping: 1,
                EditorType: 'integer-input', AccessorsFor: 'memoized' },
            { Name: 'Pattern',
                EditorType: 'textline-input', AccessorsFor: 'memoized',
                Validator: (Value) => ValueIsTextline(Value) && PatternIsCompilable(Value) },
            { Name: 'SpellChecking',
                EditorType: 'checkbox', AccessorsFor: 'memoized' },
            { Name: 'Suggestions',
                EditorType: 'linelist-input', AccessorsFor: 'memoized' },
        ];
        /**** Renderer ****/
        onRender(function () {
            const { Value, Enabling, Placeholder, readonly, minLength, maxLength, Pattern, SpellChecking, Suggestions } = this;
            const _onValueInput = (newValue, Event) => {
                if (Enabling === false) {
                    return;
                }
                this.Value = newValue;
                this.on('input')(Event);
            };
            const _onBlur = (Event) => {
                this.on('blur')(Event);
            };
            return html `<${JCL_native.SearchInput} Class="WAT Content SearchInput"
        Value=${Value == null ? '' : '' + Value} Placeholder=${Placeholder}
        readonly=${readonly} minLength=${minLength} maxLength=${maxLength}
        Pattern=${Pattern} SpellCheck=${SpellChecking}
        Suggestions=${Suggestions} disabled=${Enabling === false}
        onValueInput=${_onValueInput} onBlur=${_onBlur}
      />`;
        });
    };
    registerIntrinsicBehavior(Applet, 'widget', 'native_controls.SearchInput', WAT_SearchInput);
    /**** ColorInput ****/
    // a thin WAT wrapper around the "native.ColorInput" component from the
    // "javascript-code-library" (JCL) - the actual appearance now comes from JCL,
    // this behavior only contributes widget geometry and the WAT property
    // interface
    const WAT_ColorInput = async (me, my, html, reactively, on, onReady, onRender, onMount, onUpdate, onUnmount, onValueChange, installStylesheet, BehaviorIsNew) => {
        installStylesheet(`
      .WAT.Widget > .WAT.ColorInput {
        left:1px; top:1px; right:1px; bottom:1px; width:auto; height:auto;
      }
    `); // geometry only - the look itself comes from JCL
        /**** custom Properties ****/
        my.configurableProperties = [
            { Name: 'Value',
                EditorType: 'color-input', AccessorsFor: 'none' },
            { Name: 'Suggestions',
                EditorType: 'linelist-input', AccessorsFor: 'none',
                Validator: (Value) => ValueIsListSatisfying(Value, ValueIsColor) },
        ];
        Object_assign(me, {
            /**** Value ****/
            get Value() {
                return acceptableValue(this.memoized.Value, ValueIsColor, '#000000');
            },
            set Value(newValue) {
                allowColor('value', newValue);
                newValue = (newValue == null ? undefined : HexColor(newValue));
                if (this.memoized.Value !== newValue) {
                    this.memoized.Value = newValue;
                    this.on('Value')(newValue);
                    this.rerender();
                }
            },
            /**** Suggestions ****/
            get Suggestions() {
                const Candidate = acceptableValue(this.memoized.Suggestions, (Value) => ValueIsListSatisfying(Value, ValueIsColor));
                return (Candidate == null ? undefined : Candidate.slice());
            },
            set Suggestions(newValue) {
                allowListSatisfying('suggestion list', newValue, ValueIsColor);
                if (ValuesDiffer(this.memoized.Suggestions, newValue)) {
                    this.memoized.Suggestions = (newValue == null ? undefined : newValue.slice());
                    this.rerender();
                }
            },
        });
        /**** Renderer ****/
        onRender(function () {
            const { Value, Enabling, Suggestions } = this;
            const _onValueInput = (newValue, Event) => {
                if (Enabling === false) {
                    return;
                }
                this.Value = newValue;
                this.on('input')(Event);
            };
            /**** actual rendering ****/
            return html `<${JCL_native.ColorInput} Class="WAT Content ColorInput"
        Value=${Value} Suggestions=${Suggestions} minWidth=${0}
        disabled=${Enabling == false} onValueInput=${_onValueInput}
      />`; // "minWidth=0" keeps the former WAT geometry behavior
        });
    };
    registerIntrinsicBehavior(Applet, 'widget', 'native_controls.ColorInput', WAT_ColorInput);
    /**** DropDown ****/
    const WAT_DropDown = async (me, my, html, reactively, on, onReady, onRender, onMount, onUpdate, onUnmount, onValueChange, installStylesheet, BehaviorIsNew) => {
        installStylesheet(`
      .WAT.Widget > .WAT.DropDown {
        left:1px; top:1px; right:1px; bottom:1px; width:auto; height:auto;
        border:solid 1px #888888; border-radius:2px;
        background:#e8f0ff;
        padding:0px 2px 0px 2px;
      }
    `);
        /**** custom Properties ****/
        my.configurableProperties = [
            { Name: 'Value',
                EditorType: 'textline-input', AccessorsFor: 'memoized', withCallback: true },
            { Name: 'Options', Default: [],
                EditorType: 'linelist-input', AccessorsFor: 'memoized' },
        ];
        /**** Renderer ****/
        onRender(function () {
            const { Value, Enabling, Options } = this;
            const _onInput = (Event) => {
                if (Enabling === false) {
                    return consumingEvent(Event);
                }
                this.Value = Event.target.value;
                this.on('input')(Event);
            };
            /**** actual rendering ****/
            const hasMatch = Options.some((Option) => {
                let OptionValue = Option.replace(/:.*$/, '').trim();
                const OptionLabel = Option.replace(/^[^:]*:/, '').trim();
                if (/^[-]+$/.test(OptionLabel)) {
                    return false;
                }
                if (OptionValue === Option) {
                    OptionValue = OptionValue.replace(/^-/, '');
                }
                return (OptionValue === Value);
            }); // dto. for a missing or unmatched "Value" setting
            return html `<select class="WAT Content DropDown"
        disabled=${Enabling == false} onInput=${_onInput}
      >${hasMatch ? '' : html `<option hidden selected value=""></option>`}${Options.map((Option) => {
                let OptionValue = Option.replace(/:.*$/, '').trim();
                let OptionLabel = Option.replace(/^[^:]*:/, '').trim(); // allows for empty values
                const disabled = (OptionLabel[0] === '-');
                if (/^[-]+$/.test(OptionLabel)) {
                    return html `<hr/>`;
                }
                else {
                    if (OptionValue === Option) {
                        OptionValue = OptionValue.replace(/^-/, '');
                    }
                    if (disabled) {
                        OptionLabel = OptionLabel.replace(/^-/, '');
                    }
                    return html `<option value=${OptionValue}
              selected=${OptionValue === Value} disabled=${disabled}
            >${OptionLabel}</option>`;
                }
            })}</select>`;
        });
    };
    registerIntrinsicBehavior(Applet, 'widget', 'native_controls.DropDown', WAT_DropDown);
    /**** PseudoDropDown ****/
    const WAT_PseudoDropDown = async (me, my, html, reactively, on, onReady, onRender, onMount, onUpdate, onUnmount, onValueChange, installStylesheet, BehaviorIsNew) => {
        installStylesheet(`
      .WAT.Widget > .WAT.PseudoDropDown {
        display:flex; justify-content:center; align-items:center;
      }
      .WAT.Widget > .WAT.PseudoDropDown > div {
        display:block; position:relative;
        width:24px; height:24px;
        -webkit-mask-size:contain;           mask-size:contain;
        -webkit-mask-position:center center; mask-position:center center;
        user-select:none;
      }

      .WAT.Widget > .WAT.PseudoDropDown > select {
        display:block; position:absolute;
        left:0px; top:0px; right:0px; bottom:0px;
        opacity:0.01;
      }
    `);
        /**** custom Properties ****/
        my.configurableProperties = [
            { Name: 'Value',
                EditorType: 'textline-input', AccessorsFor: 'memoized', withCallback: true },
            { Name: 'Icon', Default: 'icons/drop-down.png',
                EditorType: 'url-input', AccessorsFor: 'none' },
            { Name: 'Options', Default: [],
                EditorType: 'linelist-input', AccessorsFor: 'memoized' },
        ];
        Object_assign(me, {
            /**** Icon ****/
            get Icon() {
                return acceptableValue(this.memoized.Icon, ValueIsURL, '');
            },
            set Icon(newValue) {
                if (ValueIsString(newValue) && ((newValue === null || newValue === void 0 ? void 0 : newValue.trim()) === '')) {
                    newValue = undefined;
                }
                allowURL('icon URL', newValue);
                if (this.memoized.Icon !== newValue) {
                    this.memoized.Icon = newValue;
                    this.rerender();
                }
            },
        });
        /**** Renderer ****/
        onRender(function () {
            const { Value, Enabling, Icon, Color, Options } = this;
            const IconURL = this.Applet.AssetURL(this.Icon.trim() === '' ? '/icons/drop-down.png' : this.Icon);
            const _onInput = (Event) => {
                if (Enabling === false) {
                    return consumingEvent(Event);
                }
                this.Value = Event.target.value;
                this.on('input')(Event);
            };
            /**** actual rendering ****/
            const hasMatch = Options.some((Option) => {
                let OptionValue = Option.replace(/:.*$/, '').trim();
                const OptionLabel = Option.replace(/^[^:]*:/, '').trim();
                if (/^[-]+$/.test(OptionLabel)) {
                    return false;
                }
                if (OptionValue === Option) {
                    OptionValue = OptionValue.replace(/^-/, '');
                }
                return (OptionValue === Value);
            }); // dto. for a missing or unmatched "Value" setting
            return html `<div class="WAT Content PseudoDropDown">
        <div style="
          -webkit-mask-image:url(${IconURL}); mask-image:url(${IconURL});
          background-color:${Color || 'black'};
        "></div>
        <select disabled=${Enabling == false} onInput=${_onInput}>
          ${hasMatch ? '' : html `<option hidden selected value=""></option>`}
          ${Options.map((Option) => {
                let OptionValue = Option.replace(/:.*$/, '').trim();
                let OptionLabel = Option.replace(/^[^:]*:/, '').trim(); // allows for empty values
                const disabled = (OptionLabel[0] === '-');
                if (/^[-]+$/.test(OptionLabel)) {
                    return html `<hr/>`;
                }
                else {
                    if (OptionValue === Option) {
                        OptionValue = OptionValue.replace(/^-/, '');
                    }
                    if (disabled) {
                        OptionLabel = OptionLabel.replace(/^-/, '');
                    }
                    return html `<option value=${OptionValue}
                selected=${OptionValue === Value} disabled=${disabled}
              >${OptionLabel}</option>`;
                }
            })}
        </select>
      </div>`;
        });
    };
    registerIntrinsicBehavior(Applet, 'widget', 'native_controls.PseudoDropDown', WAT_PseudoDropDown);
    /**** TextInput ****/
    // a thin WAT wrapper around the "native.TextInput" component from the
    // "javascript-code-library" (JCL) - the actual appearance and the protection
    // of local input against external changes now come from JCL, this behavior
    // only contributes widget geometry, the WAT property interface and the
    // WAT-specific file dropping support
    const WAT_TextInput = async (me, my, html, reactively, on, onReady, onRender, onMount, onUpdate, onUnmount, onValueChange, installStylesheet, BehaviorIsNew) => {
        installStylesheet(`
      .WAT.Widget > .WAT.TextInput {
        left:1px; top:1px; right:1px; bottom:1px; width:auto; height:auto;
        padding:2px 2px 2px 2px;
      }
    `); // geometry only - the look itself comes from JCL (except padding)
        /**** custom Properties ****/
        my.configurableProperties = [
            { Name: 'Value',
                EditorType: 'text-input', AccessorsFor: 'memoized', withCallback: true },
            { Name: 'Placeholder',
                EditorType: 'textline-input', AccessorsFor: 'memoized' },
            { Name: 'readonly',
                EditorType: 'checkbox', AccessorsFor: 'memoized' },
            { Name: 'minLength', minValue: 0, Stepping: 1,
                EditorType: 'integer-input', AccessorsFor: 'memoized' },
            { Name: 'maxLength', minValue: 0, Stepping: 1,
                EditorType: 'integer-input', AccessorsFor: 'memoized' },
            { Name: 'LineWrapping',
                EditorType: 'checkbox', AccessorsFor: 'memoized' },
            { Name: 'SpellChecking',
                EditorType: 'checkbox', AccessorsFor: 'memoized' },
            { Name: 'acceptableFileTypes', Label: 'File Types', Default: [],
                EditorType: 'linelist-input', AccessorsFor: 'memoized',
                Validator: (Value) => ValueIsListSatisfying(Value, ValueIsTextFormat) },
        ];
        /**** Renderer ****/
        onRender(function () {
            const { Value, Enabling, Placeholder, readonly, minLength, maxLength, LineWrapping, SpellChecking, acceptableFileTypes } = this;
            const _onValueInput = (newValue, Event) => {
                if (Enabling === false) {
                    return;
                }
                this.Value = newValue;
                this.on('input')(Event);
            };
            const _onBlur = (Event) => {
                this.on('blur')(Event);
            };
            /**** prepare file dropping ****/
            const allowsDropping = ((Enabling == true) && !readonly && (acceptableFileTypes.length > 0));
            function _acceptableDataIn(Event) {
                if (Event.dataTransfer.types.includes('text/plain')) {
                    return true;
                }
                for (let Item of Event.dataTransfer.items) {
                    if ((Item.kind === 'file') && acceptableFileTypes.includes(Item.type)) {
                        return true;
                    }
                }
                return false;
            }
            const _onDragOver = (Event) => {
                if (_acceptableDataIn(Event)) {
                    Event.preventDefault();
                    Event.dataTransfer.dropEffect = 'copy';
                }
            };
            const _onDrop = async (Event) => {
                if (_acceptableDataIn(Event)) {
                    Event.preventDefault();
                    const InputElement = Event.target;
                    const _updateWith = (newText) => {
                        InputElement.value = newText; // route dropped text through the
                        InputElement.dispatchEvent(// JCL input pipeline in order to
                        new InputEvent('input', { bubbles: true })); // keep its internal state in sync
                    };
                    if (Event.dataTransfer.types.includes('text/plain')) {
                        _updateWith(Event.dataTransfer.getData('text'));
                    }
                    else {
                        try {
                            for (let Item of Event.dataTransfer.items) {
                                if ((Item.kind === 'file') && acceptableFileTypes.includes(Item.type)) {
                                    _updateWith(await FileReadAsText(Item.getAsFile(), Item.type));
                                    break;
                                }
                            }
                        }
                        catch (Signal) {
                            console.warn('file drop error', Signal);
                            this.on('drop-error')(Signal);
                        }
                    }
                }
            };
            /**** actual rendering ****/
            return html `<${JCL_native.TextInput} Class="WAT Content TextInput"
        Value=${Value == null ? '' : '' + Value} Placeholder=${Placeholder}
        readonly=${readonly} minLength=${minLength} maxLength=${maxLength}
        wrap=${LineWrapping} SpellCheck=${SpellChecking}
        disabled=${Enabling === false}
        onValueInput=${_onValueInput} onBlur=${_onBlur}
        onDragOver=${allowsDropping ? _onDragOver : undefined}
        onDrop=${allowsDropping ? _onDrop : undefined}
      />`;
        }); // "onDragOver"/"onDrop" reach the <textarea> via JCL "RestProps"
    };
    registerIntrinsicBehavior(Applet, 'widget', 'native_controls.TextInput', WAT_TextInput);
    /**** FlatListView ****/
    const WAT_FlatListView = async (me, my, html, reactively, on, onReady, onRender, onMount, onUpdate, onUnmount, onValueChange, installStylesheet, BehaviorIsNew) => {
        installStylesheet(`
      .WAT.Widget > .WAT.FlatListView {
        display:flex; position:relative; flex-flow:column nowrap; align-items:stretch;
        overflow:scroll; overflow-x:auto; overflow-y:scroll;
        border:solid 1px #888888; border-radius:2px;
        background:#e8f0ff; padding:0px 2px 0px 4px;
      }

      .WAT.Widget > .WAT.FlatListView.empty {
        overflow:hidden;
        background-color:#EEEEEE;
      }

      .WAT.Widget > .WAT.FlatListView > div.Placeholder {
        display:flex; position:relative;
          flex-flow:column nowrap; align-items:center; justify-content:center;
        width:100%; height:100%;
      }

      .WAT.Widget > .WAT.FlatListView > div.Placeholder > * {
        position:relative;
      }

      .WAT.Widget > .WAT.FlatListView > div.ListItem {
        display:block; position:relative; overflow:hidden; flex:0 0 auto;
        left:0px; top:0px; width:auto; height:22px; line-height:22px;
        background:none;
        border:none; border-bottom:solid 1px lightgray;
        white-space:nowrap; text-overflow:ellipsis;
        user-select:none; pointer-events:auto;
      }

      .WAT.Widget > .WAT.FlatListView > div.ListItem:last-child {
        border:none; border-bottom:solid 1px transparent;
      }

      .WAT.Widget > .WAT.FlatListView > div.ListItem.selected {
        background:dodgerblue; color:white;
      }
    `);
        /**** custom Properties ****/
        my.configurableProperties = [
            { Name: 'Placeholder', Default: '(empty)',
                EditorType: 'textline-input', AccessorsFor: 'memoized' },
            { Name: 'SelectionLimit', Label: 'Selection Limit',
                EditorType: 'integer-input', AccessorsFor: 'memoized',
                minValue: 0, Stepping: 1 }, // *C* SelectionLimit == null means "unlimited"
        ];
        Object_assign(me, {
            /**** List ****/
            get List() {
                const Candidate = acceptableValue(this._List, ValueIsList, []);
                return (Candidate == null ? [] : Candidate.slice());
            },
            set List(newList) {
                expectList('list', newList);
                if (ValuesDiffer(this._List, newList)) {
                    this._List = (newList == null ? undefined : newList.slice());
                    this.rerender();
                }
            },
            /**** selectedIndices ****/
            get selectedIndices() {
                return (this._selectedIndices || []).slice();
            },
            set selectedIndices(newList) {
                expectListSatisfying('indicies of selected list elements', newList, ValueIsOrdinal);
                if (ValuesDiffer(this._selectedIndices, newList)) {
                    const selectedIndexSet = Object.create(null);
                    this._selectedIndices = newList.filter((selectedIndex) => {
                        if ((selectedIndex < this.List.length) &&
                            !(selectedIndex in selectedIndexSet)) {
                            selectedIndexSet[selectedIndex] = true;
                            return true;
                        }
                        else {
                            return false;
                        }
                    });
                    this.rerender();
                }
            },
        });
        /**** Renderer ****/
        onRender(function () {
            let { List, Placeholder, SelectionLimit, selectedIndices } = this;
            const effectiveSelectionLimit = (SelectionLimit == null ? Infinity : SelectionLimit);
            /**** validate selection ****/
            const oldSelectedIndices = (this._selectedIndices || []).slice();
            const selectedIndexSet = Object.create(null);
            selectedIndices = selectedIndices.filter((selectedIndex) => {
                if ((selectedIndex < List.length) &&
                    !(selectedIndex in selectedIndexSet)) {
                    selectedIndexSet[selectedIndex] = true;
                    return true;
                }
                else {
                    return false;
                }
            });
            if (selectedIndices.length > effectiveSelectionLimit) {
                const deselectedIndices = selectedIndices.slice(SelectionLimit);
                selectedIndices.length = SelectionLimit;
                deselectedIndices.forEach((deselectedIndex) => {
                    delete selectedIndexSet[deselectedIndex];
                });
            }
            this._selectedIndices = selectedIndices;
            if (ValuesDiffer(oldSelectedIndices, selectedIndices)) {
                const IndicesToDeselect = oldSelectedIndices.filter((selectedIndex) => !(selectedIndex in selectedIndexSet));
                const IndicesToSelect = selectedIndices.filter((selectedIndex) => (oldSelectedIndices.indexOf(selectedIndex) < 0));
                setTimeout(() => {
                    this.on('selection-change')(selectedIndices);
                    IndicesToDeselect.forEach((deselectedIndex) => {
                        // *C* "List" may have shrunk - pass "undefined" for items gone by now
                        this.on('item-deselected')((deselectedIndex < List.length ? List[deselectedIndex] : undefined), deselectedIndex);
                    });
                    // *C* currently unreachable - render validation can only remove indices
                    IndicesToSelect.forEach((selectedIndex) => {
                        this.on('item-selected')(List[selectedIndex], selectedIndex);
                    });
                }, 0);
            }
            /**** _onClick ****/
            const _onClick = (Event, Index) => {
                Event.stopImmediatePropagation();
                Event.preventDefault();
                if (effectiveSelectionLimit === 0) {
                    this.on('click')(Event, Index);
                    return;
                }
                let SelectionChanged = false;
                let IndicesToSelect, IndicesToDeselect;
                if (Event.shiftKey || Event.metaKey || Event.ctrlKey) {
                    SelectionChanged = true;
                    if (ItemIsSelected(Index)) {
                        IndicesToDeselect = [Index];
                        selectedIndices = selectedIndices.filter((selectedIndex) => (selectedIndex !== Index));
                    }
                    else {
                        if (selectedIndices.length >= effectiveSelectionLimit) {
                            IndicesToDeselect = [selectedIndices.shift()];
                        }
                        IndicesToSelect = [Index];
                        selectedIndices.push(Index);
                    }
                }
                else {
                    const ItemWasSelected = ItemIsSelected(Index);
                    IndicesToDeselect = selectedIndices.filter((selectedIndex) => (selectedIndex !== Index));
                    SelectionChanged = !ItemWasSelected || (IndicesToDeselect.length > 0);
                    IndicesToSelect = (ItemWasSelected ? [] : [Index]);
                    selectedIndices = [Index];
                }
                this._selectedIndices = selectedIndices;
                if (SelectionChanged) {
                    this.on('selection-change')(selectedIndices);
                }
                // @ts-ignore TS2454 let's check IF variables were assigned
                if (IndicesToDeselect != null) {
                    IndicesToDeselect.forEach((deselectedIndex) => {
                        this.on('item-deselected')(List[deselectedIndex], deselectedIndex);
                    });
                }
                // @ts-ignore TS2454 let's check IF variables were assigned
                if (IndicesToSelect != null) {
                    IndicesToSelect.forEach((selectedIndex) => {
                        this.on('item-selected')(List[selectedIndex], selectedIndex);
                    });
                }
                this.rerender();
                this.on('click')(Event, Index);
            };
            /**** _onDblClick ****/
            const _onDblClick = (Event, Index) => {
                this.on('double-click')(Event, Index);
            };
            /**** ItemIsSelected ****/
            function ItemIsSelected(Index) {
                return (Index in selectedIndexSet);
            }
            /**** actual rendering ****/
            const registeredRenderer = this.on('render-item');
            const ItemRenderer = (registeredRenderer === noCallback
                ? ((Item) => Item + '')
                : registeredRenderer);
            // *C* SECURITY: list items are rendered as raw HTML without sanitization (XSS risk!)
            return html `<div class="WAT Content ${List.length === 0 ? 'empty' : ''} FlatListView">
        ${List.length === 0
                ? html `<div class="Placeholder"><div>${Placeholder}</></>`
                : List.map((Item, Index) => html `<div
              class="ListItem ${ItemIsSelected(Index) ? 'selected' : ''}"
              dangerouslySetInnerHTML=${{
                    __html: ItemRenderer(Item, Index, ItemIsSelected(Index))
                }}
              onClick=${(Event) => _onClick(Event, Index)}
              onDblClick=${(Event) => _onDblClick(Event, Index)}
            />`)}
      </>`;
        });
    };
    registerIntrinsicBehavior(Applet, 'widget', 'other_controls.FlatListView', WAT_FlatListView);
    /**** TextlineTab ****/
    const WAT_TextlineTab = async (me, my, html, reactively, on, onReady, onRender, onMount, onUpdate, onUnmount, onValueChange, installStylesheet, BehaviorIsNew) => {
        installStylesheet(`
      .WAT.Widget > .WAT.TextlineTab {
        font-weight:bold; color:black;
        text-align:left; text-decoration:none;
        text-underline-offset:5px; text-underline-position:under;
        user-select:none;
      }

      .WAT.Widget > .WAT.active.TextlineTab {
        text-decoration:underline solid black 2px;
      }
    `);
        /**** custom Properties ****/
        my.configurableProperties = [
            { Name: 'Label', Placeholder: '(enter label)',
                EditorType: 'textline-input', AccessorsFor: 'memoized' },
            { Name: 'isActive', Default: false,
                EditorType: 'checkbox', AccessorsFor: 'memoized' },
        ];
        /**** Renderer ****/
        onRender(function () {
            const { Label, isActive, Enabling } = this;
            const disabled = (Enabling == false);
            const onClick = (Event) => {
                if (disabled) {
                    return consumingEvent(Event);
                }
                this.on('click')(Event);
            };
            return html `<div class="WAT Content TextlineTab ${isActive ? 'active' : ''}" style="
        line-height:${this.LineHeight || this.Height}px;
      " disabled=${disabled} onClick=${onClick}
      >${Label}</>`;
        });
    };
    registerIntrinsicBehavior(Applet, 'widget', 'other_controls.TextlineTab', WAT_TextlineTab);
    /**** IconTab ****/
    const WAT_IconTab = async (me, my, html, reactively, on, onReady, onRender, onMount, onUpdate, onUnmount, onValueChange, installStylesheet, BehaviorIsNew) => {
        installStylesheet(`
      .WAT.Widget > .WAT.IconTab        { border:solid 2px transparent; border-radius:0px }
      .WAT.Widget > .WAT.active.IconTab { border-bottom:solid 2px black }

      .WAT.Widget > .WAT.IconTab {
        display:flex; justify-content:center; align-items:center;
      }
      .WAT.Widget > .WAT.IconTab > div {
        display:block; position:relative;
        width:24px; height:24px;
        -webkit-mask-size:contain;           mask-size:contain;
        -webkit-mask-position:center center; mask-position:center center;
        user-select:none;
      }
    `);
        /**** custom Properties ****/
        my.configurableProperties = [
            { Name: 'Icon', Default: 'icons/menu.png',
                EditorType: 'url-input', AccessorsFor: 'none' },
            { Name: 'isActive', Default: false,
                EditorType: 'checkbox', AccessorsFor: 'memoized' },
        ];
        Object_assign(me, {
            /**** Icon ****/
            get Icon() {
                return acceptableValue(this.memoized.Icon, ValueIsURL, '');
            },
            set Icon(newValue) {
                if (ValueIsString(newValue) && ((newValue === null || newValue === void 0 ? void 0 : newValue.trim()) === '')) {
                    newValue = undefined;
                }
                allowURL('icon URL', newValue);
                if (this.memoized.Icon !== newValue) {
                    this.memoized.Icon = newValue;
                    this.rerender();
                }
            },
        });
        /**** Renderer ****/
        onRender(function () {
            const { Enabling, isActive, Icon, Color } = this;
            const IconURL = this.Applet.AssetURL(this.Icon.trim() === '' ? '/icons/menu.png' : this.Icon);
            const disabled = (Enabling == false);
            const onClick = (Event) => {
                if (disabled) {
                    return consumingEvent(Event);
                }
                this.on('click')(Event);
            };
            return html `<div class="WAT Content IconTab ${isActive ? 'active' : ''}">
        <div style="
          -webkit-mask-image:url(${IconURL}); mask-image:url(${IconURL});
          background-color:${Color || 'black'};
        " disabled=${disabled} onClick=${onClick}/>
      </>`;
        });
    };
    registerIntrinsicBehavior(Applet, 'widget', 'other_controls.IconTab', WAT_IconTab);
    /**** QRCodeView ****/
    // a thin WAT wrapper around the "legacy.QRCodeView" component from the
    // "javascript-code-library" (JCL) - n.b.: JCL and WAT must share the same
    // preact instance (which they do, as both resolve "preact" through the
    // import map of the hosting page)
    const WAT_QRCodeECCLevels = ['L', 'M', 'Q', 'H'];
    const WAT_QRCodeView = async (me, my, html, reactively, on, onReady, onRender, onMount, onUpdate, onUnmount, onValueChange, installStylesheet, BehaviorIsNew) => {
        const legacyQRCodeView = JCL_legacy.QRCodeView;
        installStylesheet(`
      .WAT.Widget > .WAT.QRCodeView {
        display:block; position:absolute;
        width:100%; height:100%;
      }
    `); // n.b.: specific enough to beat JCL's own 160x160px component rule
        /**** custom Properties ****/
        my.configurableProperties = [
            { Name: 'Value', Placeholder: '(enter text to encode)',
                EditorType: 'text-input', AccessorsFor: 'memoized', withCallback: true },
            { Name: 'ECCLevel', Label: 'ECC Level', Default: 'M',
                EditorType: 'drop-down', AccessorsFor: 'memoized', ValueList: WAT_QRCodeECCLevels },
            { Name: 'BorderWidth', Label: 'Border Width', Default: 1,
                EditorType: 'number-input', AccessorsFor: 'memoized', minValue: 0 },
            { Name: 'minVersion', Label: 'min. Version', Default: 1,
                EditorType: 'number-input', AccessorsFor: 'memoized', minValue: 1, maxValue: 40 },
            { Name: 'maxVersion', Label: 'max. Version', Default: 40,
                EditorType: 'number-input', AccessorsFor: 'memoized', minValue: 1, maxValue: 40 },
        ];
        /**** Renderer ****/
        onRender(function () {
            var _a, _b, _c;
            const Value = this.Value || '';
            if (Value === '') { // "legacyQRCodeView" insists on a "Value"
                return html `<div class="WAT Content QRCodeView"/>`;
            }
            const minVersion = (_a = this.minVersion) !== null && _a !== void 0 ? _a : 1;
            const maxVersion = Math.max((_b = this.maxVersion) !== null && _b !== void 0 ? _b : 40, minVersion);
            return html `<${legacyQRCodeView} Class="WAT Content QRCodeView"
        Value=${Value} ECCLevel=${this.ECCLevel || 'M'}
        BorderWidth=${(_c = this.BorderWidth) !== null && _c !== void 0 ? _c : 1}
        minVersion=${minVersion} maxVersion=${maxVersion}
        ForegroundColor=${this.ForegroundColor || 'black'}
        BackgroundColor=${this.BackgroundColor || 'transparent'}
      />`;
        });
    };
    registerIntrinsicBehavior(Applet, 'widget', 'other_controls.QRCodeView', WAT_QRCodeView);
}
/**** readTextFile ****/
async function readTextFile(File) {
    return new Promise((resolve, reject) => {
        const Reader = new FileReader();
        Reader.onload = (Event) => resolve(Event.target.result);
        Reader.onerror = (Event) => reject(Event.target.error);
        Reader.onabort = (Event) => reject(new Error('Loading was aborted'));
        Reader.readAsText(File);
    });
}
/**** readBinaryFile ****/
async function readBinaryFile(File) {
    return new Promise((resolve, reject) => {
        const Reader = new FileReader();
        Reader.onload = (Event) => resolve(Event.target.result);
        Reader.onerror = (Event) => reject(Event.target.error);
        Reader.onabort = (Event) => reject(new Error('Loading was aborted'));
        Reader.readAsArrayBuffer(File);
    });
}
/**** readDataURLFile ****/
async function readDataURLFile(File) {
    return new Promise((resolve, reject) => {
        const Reader = new FileReader();
        Reader.onload = (Event) => resolve(Event.target.result);
        Reader.onerror = (Event) => reject(Event.target.error);
        Reader.onabort = (Event) => reject(new Error('Loading was aborted'));
        Reader.readAsDataURL(File);
    });
}
/**** FileReadAsText ****/
async function FileReadAsText(File, FileType) {
    switch (FileType) {
        case 'text/plain':
        case 'application/javascript':
        case 'application/typescript':
        case 'application/json': return await readTextFile(File);
        case 'text/markdown': return await MarkdownFileReadAsText(File);
        case 'text/html': return await HTMLFileReadAsText(File);
        case 'application/pdf': return await PDFFileReadAsText(File);
        case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
            return await DOCXFileReadAsText(File);
        default: throwError('UnsupportedFileFormat: cannot read the given file as text');
    }
}
/**** FileReadAsMarkdown ****/
async function FileReadAsMarkdown(File, FileType) {
    switch (FileType) {
        case 'text/plain':
        case 'text/markdown': return await readTextFile(File);
        case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
            return await DOCXFileReadAsMarkdown(File);
        default: throwError('UnsupportedFileFormat: cannot read the given file as Markdown');
    }
}
/**** FileReadAsHTML ****/
async function FileReadAsHTML(File, FileType) {
    switch (FileType) {
        case 'text/plain':
        case 'text/html': return await readTextFile(File);
        case 'text/markdown': return await MarkdownFileReadAsHTML(File);
        case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
            return await DOCXFileReadAsHTML(File);
        default: throwError('UnsupportedFileFormat: cannot read the given file as HTML');
    }
}
/**** FileReadAsImage ****/
async function FileReadAsImage(File, FileType) {
    if (WAT_supportedImageFormats.indexOf(FileType) >= 0) {
        return await readDataURLFile(File);
    }
    else {
        throwError('UnsupportedFileFormat: cannot read the given file as an image');
    }
}
/**** HTMLFileReadAsText ****/
async function HTMLFileReadAsText(File) {
    const HTMLContent = await readTextFile(File);
    try {
        const { default: HTMLtoText } = await import('https://cdn.jsdelivr.net/npm/@blac-sheep/html-to-text/+esm');
        return HTMLtoText(HTMLContent);
    }
    catch (Signal) {
        throwError('ConversionError: could not convert the given HTML file into plain text, reason: ' + Signal);
    }
}
/**** MarkdownFileReadAsText (see https://marked.js.org/using_pro#renderer) ****/
async function MarkdownFileReadAsText(File) {
    const Markdown = await readTextFile(File);
    return await MarkdownAsText(Markdown);
}
export async function MarkdownAsText(Markdown) {
    expectText('markdown document', Markdown);
    try {
        const { default: PlainTextRenderer } = await import('https://cdn.jsdelivr.net/npm/marked-plaintext/+esm');
        const marked = new Marked();
        const TextOf = (Value) => {
            var _a;
            return ( // "marked" >= v13 passes tokens...
            typeof Value === 'string' ? Value : ((_a = Value === null || Value === void 0 ? void 0 : Value.text) !== null && _a !== void 0 ? _a : '') // ...not strings
            );
        };
        const Renderer = new PlainTextRenderer();
        Renderer.heading = (Text) => `\n${TextOf(Text)}\n\n`;
        Renderer.paragraph = (Text) => `${TextOf(Text)}\n\n`;
        Renderer.list = (Text) => `${TextOf(Text)}\n`;
        Renderer.listitem = (Text) => `- ${TextOf(Text)}\n`;
        Renderer.link = (HRef, Title, Text) => `${typeof HRef === 'string' ? Text : TextOf(HRef)}`;
        Renderer.image = (HRef, Title, Text) => `[${typeof HRef === 'string' ? Text : TextOf(HRef)}]`;
        Renderer.code = (Code) => `${TextOf(Code)}\n\n`;
        Renderer.blockquote = (Quote) => `${TextOf(Quote)}\n\n`;
        Renderer.br = () => `\n`;
        marked.setOptions({
            renderer: Renderer,
            gfm: true, breaks: true,
        });
        //    marked.use(markedKatex({ nonStandard:true }))
        return marked.parse(Markdown);
    }
    catch (Signal) {
        throwError('ConversionError: could not convert the given Markdown file into plain text, reason: ' + Signal);
    }
}
/**** MarkdownFileReadAsHTML ****/
async function MarkdownFileReadAsHTML(File) {
    const Markdown = await readTextFile(File);
    return await MarkdownAsHTML(Markdown);
}
export async function MarkdownAsHTML(Markdown) {
    expectText('markdown document', Markdown);
    try {
        const marked = new Marked();
        marked.setOptions({
            gfm: true, breaks: true,
        });
        //    marked.use(markedKatex({ nonStandard:true }))
        return marked.parse(Markdown);
    }
    catch (Signal) {
        throwError('ConversionError: could not convert the given Markdown file into HTML, reason: ' + Signal);
    }
}
/**** DOCXFileReadAsText ****/
async function DOCXFileReadAsText(File) {
    const Buffer = await readBinaryFile(File);
    try {
        const mammoth = (await import('https://rozek.github.io/mammoth.js/mammoth.browser.esm.js')).default;
        return (await mammoth.extractRawText({ arrayBuffer: Buffer })).value;
    }
    catch (Signal) {
        throwError('ConversionError: could not convert the given DOCX file into plain text, reason: ' + Signal);
    }
}
/**** DOCXFileReadAsHTML ****/
async function DOCXFileReadAsHTML(File) {
    const Buffer = await readBinaryFile(File);
    try {
        const mammoth = (await import('https://rozek.github.io/mammoth.js/mammoth.browser.esm.js')).default;
        return (await mammoth.convertToHtml({ arrayBuffer: Buffer })).value;
    }
    catch (Signal) {
        throwError('ConversionError: could not convert the given DOCX file into HTML, reason: ' + Signal);
    }
}
/**** DOCXFileReadAsMarkdown ****/
async function DOCXFileReadAsMarkdown(File) {
    const Buffer = await readBinaryFile(File);
    try {
        const mammoth = (await import('https://rozek.github.io/mammoth.js/mammoth.browser.esm.js')).default;
        return (await mammoth.convertToMarkdown({ arrayBuffer: Buffer })).value;
    }
    catch (Signal) {
        throwError('ConversionError: could not convert the given DOCX file into Markdown, reason: ' + Signal);
    }
}
/**** PDFFileReadAsText ****/
// @ts-ignore TS2366 "throwError" never returns
async function PDFFileReadAsText(File) {
    const Buffer = await readBinaryFile(File);
    let PDF = undefined;
    try {
        const { getDocument, GlobalWorkerOptions } = await import('https://cdn.jsdelivr.net/npm/pdfjs-dist/build/pdf.min.mjs');
        GlobalWorkerOptions.workerSrc = 'https://cdn.jsdelivr.net/npm/pdfjs-dist/build/pdf.worker.min.mjs';
        PDF = await getDocument(Buffer).promise;
        let Text = '';
        for (let i = 1; i <= PDF.numPages; i++) {
            const Page = await PDF.getPage(i);
            const Content = await Page.getTextContent();
            Text += Content.items.map((Item) => Item.str).join(' ') + '\n';
            Page.cleanup();
        }
        return Text;
    }
    catch (Signal) {
        throwError('ConversionError: could not convert the given PDF file into plain text, reason: ' + Signal);
    }
    finally {
        PDF === null || PDF === void 0 ? void 0 : PDF.destroy();
    }
}
//------------------------------------------------------------------------------
//--                WAT_combinedView (for Applet and Designer)                --
//------------------------------------------------------------------------------
class WAT_combinedView extends Component {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "state", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: { Value: 0 }
        });
    }
    /**** componentDidMount/WillUnmount ****/
    componentDidMount() { combinedView = this; rerender(); }
    componentWillUnmount() { combinedView = undefined; }
    /**** rerender ****/
    rerender(Visual) {
        // @ts-ignore TS2339 "Value" is a valid property
        this.setState({ Value: this.state.Value + 1 });
    }
    /**** render ****/
    render(PropSet) {
        const Applet = PropSet.Applet;
        let AppletRendering;
        try {
            AppletRendering = (Applet.isReady
                ? html `<${WAT_AppletView} Applet=${Applet}/>`
                : html `<div class="WAT centered" style="width:100%; height:100%"><div>(loading)</div></div>`);
        }
        catch (Signal) {
            console.warn('uncaught Error in Applet Rendering', Signal);
        }
        let DesignerRendering;
        try {
            DesignerRendering = (Applet.isAttached && (DesignerLayer != null)
                ? html `<${DesignerLayer} Applet=${Applet} AssetsBase=${DesignerAssetsBase}/>`
                : '');
        }
        catch (Signal) {
            console.warn('uncaught Error in Designer Rendering', Signal);
        }
        return html `<div style="
        left:0px; top:0px; right:0px; bottom:0px
      ">
        ${AppletRendering}
        ${DesignerRendering}
      </div>`;
    }
}
//------------------------------------------------------------------------------
//--                              WAT_AppletView                              --
//------------------------------------------------------------------------------
class WAT_AppletView extends Component {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "_Applet", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_Ref", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: createRef()
        });
    }
    /**** componentDidMount ****/
    componentDidMount() {
        const Applet = this._Applet;
        const Base = this._Ref.current;
        Base['_Applet'] = Applet;
        Applet['_View'] = Base;
        Applet.on('mount')();
    }
    /**** componentDidUpdate ****/
    componentDidUpdate() {
        const Applet = this._Applet;
        Applet.on('update')();
    }
    /**** componentWillUnmount ****/
    componentWillUnmount() {
        const Applet = this._Applet;
        Applet['_View'] = undefined;
        Applet.on('unmount')();
    }
    /**** render ****/
    // rendering sequence
    // - Applet -> visitedPage -> Widgets [-> Widgets in case of WidgetPanes]
    // - openOverlays -> SourceWidget [-> Widgets in case of WidgetPanes]
    render(PropSet) {
        const Applet = this._Applet = PropSet.Applet;
        const visitedPage = Applet.visitedPage;
        const openOverlays = Applet._OverlayList;
        const lastOverlayIndex = openOverlays.length - 1;
        let topmostVisibility = undefined;
        let needsModalLayer = (openOverlays.length > 0) &&
            openOverlays[lastOverlayIndex].isModal;
        if (needsModalLayer) { // but not if the topmost modal overlay is hidden
            const SourceWidget = Applet.WidgetAtPath(openOverlays[lastOverlayIndex].SourceWidgetPath);
            topmostVisibility = (SourceWidget == null
                ? true
                : SourceWidget.on('visibility-request')() !== false); // "WAT_AppletOverlayView" renders '' if Visibility === false
            if (topmostVisibility === false) {
                needsModalLayer = false;
            }
        }
        const broken = (Applet.isBroken ? 'broken' : '');
        return html `<div ref=${this._Ref} class="WAT ${broken} Applet" style="
        ${Applet.CSSStyle}
        left:0px; top:0px; right:0px; bottom:0px;
      ">
        ${Applet.isAttached ? html `
          ${broken === '' ? Applet.on('render')() : ErrorRenderingFor(Applet)}
          ${visitedPage == null
            ? html `<div class="WAT centered" style="width:100%; height:100%"><div>(no page to show)</div></div>`
            : html `<${WAT_PageView} Page=${visitedPage}/>`}
        ` : ''}
      </div>
      ${Applet.isAttached && (openOverlays.length > 0) ? html `<div class="WAT AppletOverlayLayer" style="
        ${OverlayCSSfromApplet(Applet)}
      ">
        ${openOverlays.map((Overlay, Index) => html `
          ${(Index === lastOverlayIndex) && needsModalLayer ? html `<${WAT_ModalLayer}/>` : ''}
          <${WAT_AppletOverlayView} key=${Overlay.Name} Applet=${Applet} Overlay=${Overlay}
            Visibility=${Index === lastOverlayIndex ? topmostVisibility : undefined}/>
        `)}
      </div>` : ''}`;
    }
}
/**** OverlayCSSfromApplet ****/
function OverlayCSSfromApplet(Applet) {
    let CSSStyleList = [];
    const { FontFamily, FontSize, FontWeight, FontStyle, LineHeight, ForegroundColor, } = Applet;
    if (FontFamily != null) {
        CSSStyleList.push(`font-family:${FontFamily}`);
    }
    if (FontSize != null) {
        CSSStyleList.push(`font-size:${FontSize}px`);
    }
    if (FontWeight != null) {
        CSSStyleList.push(`font-weight:${FontWeight}`);
    }
    if (FontStyle != null) {
        CSSStyleList.push(`font-style:${FontStyle}`);
    }
    if (LineHeight != null) {
        CSSStyleList.push(`line-height:${LineHeight}px`);
    }
    if (ForegroundColor != null) {
        CSSStyleList.push(`color:${ForegroundColor}`);
    }
    return (CSSStyleList.length === 0 ? '' : CSSStyleList.join(';') + ';');
} //------------------------------------------------------------------------------
//--                               WAT_PageView                               --
//------------------------------------------------------------------------------
class WAT_PageView extends Component {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "_Page", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_shownWidgets", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        Object.defineProperty(this, "_Ref", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: createRef()
        });
    }
    /**** componentDidMount ****/
    componentDidMount() {
        const Page = this._Page;
        const Base = this._Ref.current;
        Base['_Page'] = Page;
        Page['_View'] = Base;
        Page.on('mount')();
    }
    /**** componentDidUpdate ****/
    componentDidUpdate() {
        const Page = this._Page;
        Page.on('update')();
    }
    /**** componentWillUnmount ****/
    componentWillUnmount() {
        this._releaseWidgets();
        const Page = this._Page;
        Page['_View'] = undefined;
        Page.on('unmount')();
    }
    /**** _releaseWidgets - releases *all* widgets on this page ****/
    _releaseWidgets() {
        if (this._Page == null) {
            return;
        }
        this._Page.WidgetList.forEach((Widget) => {
            if (Widget._Pane === this._Page) {
                Widget._Pane = undefined;
            }
            if (Widget.normalizedBehavior === 'basic_controls.widgetpane') {
                if (typeof Widget._releaseWidgets === 'function') {
                    Widget._releaseWidgets();
                }
            }
        });
    }
    /**** render ****/
    render(PropSet) {
        const Page = PropSet.Page;
        if ((this._Page != null) && (this._Page !== Page)) {
            this.componentWillUnmount(); // because preact reuses components
            this._Page = Page;
            this.componentDidMount();
        }
        else {
            this._Page = Page;
        }
        this._releaseWidgets();
        const WidgetsToShow = Page.WidgetList.filter((Widget) => (Widget.isVisible && ((Widget._Pane == null) || (Widget._Pane === Page))));
        WidgetsToShow.forEach((Widget) => Widget._Pane = Page);
        this._shownWidgets = WidgetsToShow;
        const broken = (Page.isBroken ? 'broken' : '');
        return html `<div ref=${this._Ref} class="WAT ${broken} Page" style="
        ${Page.CSSStyle}
        left:0px; top:0px; right:0px; bottom:0px
      ">
        ${broken === '' ? Page.on('render')() : ErrorRenderingFor(Page)}
        ${WidgetsToShow.toReversed().map((Widget) => {
            return html `<${WAT_WidgetView} key=${IdOfVisual(Widget)} Widget=${Widget} Geometry=${Widget.Geometry}/>`;
        })}
      </div>`;
    }
}
//------------------------------------------------------------------------------
//--                              WAT_WidgetView                              --
//------------------------------------------------------------------------------
class WAT_WidgetView extends Component {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "_Widget", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_Ref", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: createRef()
        });
    }
    /**** componentDidMount ****/
    componentDidMount() {
        const Widget = this._Widget;
        const Base = this._Ref.current;
        Base['_Widget'] = Widget;
        Widget['_View'] = Base;
        Widget.on('mount')();
    }
    /**** componentDidUpdate ****/
    componentDidUpdate() {
        const Widget = this._Widget;
        Widget.on('update')();
    }
    /**** componentWillUnmount ****/
    componentWillUnmount() {
        const Widget = this._Widget;
        if (Widget['_View'] === this._Ref.current) {
            Widget['_View'] = undefined;
            if (typeof Widget.componentWillUnmount === 'function') {
                Widget.componentWillUnmount();
            }
            Widget.on('unmount')();
        } // otherwise another view already owns this widget's _View
    }
    /**** render ****/
    render(PropSet) {
        const Widget = PropSet.Widget;
        if ((this._Widget != null) && (this._Widget !== Widget)) {
            this.componentWillUnmount(); // because preact reuses components
            this._Widget = Widget;
            this.componentDidMount();
        }
        else {
            this._Widget = Widget;
        }
        let { x, y, Width, Height } = PropSet.Geometry;
        const CSSGeometry = ((x != null) && (Width != null) && (y != null) && (Height != null)
            ? `left:${x}px; top:${y}px; width:${Width}px; height:${Height}px; right:auto; bottom:auto;`
            : '');
        const openOverlays = Widget._OverlayList;
        const lastOverlayIndex = openOverlays.length - 1;
        const broken = (Widget.isBroken ? 'broken' : '');
        return html `<div ref=${this._Ref} class="WAT ${broken} Widget" style="
        ${Widget.CSSStyle} ${CSSGeometry}
      ">
        ${broken === '' ? Widget.on('render')() : ErrorRenderingFor(Widget)}
      </div>
      ${(broken === '') && (openOverlays.length > 0) ? html `<div class="WAT WidgetOverlayLayer"
        style="${CSSGeometry}"
      >
        ${openOverlays.map((Overlay, Index) => html `
          ${(Index === lastOverlayIndex)
            ? html `<${WAT_WidgetUnderlay} key=${Overlay.Name} Widget=${Widget} Overlay=${Overlay}>
              <${WAT_WidgetOverlayView} key=${Overlay.Name} Widget=${Widget} Overlay=${Overlay}/>
            </>`
            : html `<${WAT_WidgetOverlayView} key=${Overlay.Name} Widget=${Widget} Overlay=${Overlay}/>`}
        `)}
      </div>` : ''}`;
    }
}
//------------------------------------------------------------------------------
//--                              WAT_ModalLayer                              --
//------------------------------------------------------------------------------
const WAT_ModalLayer_EventTypes = [
    'click', 'dblclick',
    'mousedown', 'mouseup', 'mousemove', 'mouseover', 'mouseout',
    'mouseenter', 'mouseleave',
    'touchstart', 'touchend', 'touchmove', 'touchcancel',
    'pointerdown', 'pointerup', 'pointermove', 'pointerover', 'pointerout',
    'pointerenter', 'pointerleave', 'pointercancel',
    'keydown', 'keyup', 'keypress',
    'wheel', 'contextmenu', 'focus', 'blur'
];
class WAT_ModalLayer extends Component {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "_Ref", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: createRef()
        });
        Object.defineProperty(this, "_KeyEventConsumer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (Event) => {
                var _a;
                const topmostOverlayView = (_a = this._Ref.current) === null || _a === void 0 ? void 0 : _a.nextElementSibling;
                if ((topmostOverlayView == null) ||
                    !topmostOverlayView.contains(Event.target)) {
                    consumeEvent(Event);
                }
            }
        }); // keyboard events go to the focused element, not this modal layer
    }
    componentDidMount() {
        WAT_ModalLayer_EventTypes.forEach((EventType) => {
            this._Ref.current.addEventListener(EventType, consumeEvent);
        });
        document.addEventListener('keydown', this._KeyEventConsumer, true);
        document.addEventListener('keyup', this._KeyEventConsumer, true);
    }
    componentWillUnmount() {
        WAT_ModalLayer_EventTypes.forEach((EventType) => {
            this._Ref.current.removeEventListener(EventType, consumeEvent);
        });
        document.removeEventListener('keydown', this._KeyEventConsumer, true);
        document.removeEventListener('keyup', this._KeyEventConsumer, true);
    }
    render(PropSet) {
        return html `<div ref=${this._Ref} class="WAT ModalLayer"/>`;
    }
}
//------------------------------------------------------------------------------
//--                          WAT_AppletOverlayView                           --
//------------------------------------------------------------------------------
class WAT_AppletOverlayView extends Component {
    constructor() {
        super(...arguments);
        // @ts-ignore TS2564 will be initialized in renderer
        Object.defineProperty(this, "_Applet", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        // @ts-ignore TS2564 will be initialized in renderer
        Object.defineProperty(this, "_Overlay", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_DragInfo", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {
                Mode: undefined,
                StartX: NaN, StartY: NaN, initialGeometry: undefined
            }
        });
        Object.defineProperty(this, "_shownWidgets", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        Object.defineProperty(this, "_Ref", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: createRef()
        });
        /**** generic GestureRecognizer ****/
        Object.defineProperty(this, "_Recognizer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
    }
    /**** _releaseWidgets ****/
    _releaseWidgets() {
        this._shownWidgets.forEach((Widget) => {
            if (Widget._Pane === this._Overlay) {
                Widget._Pane = undefined;
            }
        });
        this._shownWidgets = [];
    }
    /**** componentDidMount ****/
    componentDidMount() {
        // @ts-ignore TS2445 I know, it's a hack, but allow access to protected member here
        this._Overlay._View = this;
        const Base = this._Ref.current;
        if (Base != null) { // "render" returns '' for a hidden overlay
            Base['_Applet'] = this._Applet;
            Base['_Overlay'] = this._Overlay;
        }
    }
    /**** componentDidUpdate ****/
    componentDidUpdate() {
        const Base = this._Ref.current;
        if (Base != null) { // set expandos again after overlay became visible
            Base['_Applet'] = this._Applet;
            Base['_Overlay'] = this._Overlay;
        }
    }
    /**** componentWillUnmount ****/
    componentWillUnmount() {
        //    this._releaseWidgets()  // may be too late, is therefore done when closing
        // @ts-ignore TS2445 I know, it's a hack, but allow access to protected member here
        delete this._Overlay._View;
    }
    /**** _GeometryRelativeTo  ****/
    _GeometryOfWidgetRelativeTo(Widget, BaseGeometry, PaneGeometry) {
        const WidgetAnchors = Widget.Anchors;
        const { x: WidgetX, y: WidgetY, Width: WidgetWidth, Height: WidgetHeight } = Widget.Geometry;
        const { minWidth, minHeight, maxWidth, maxHeight } = Widget;
        const { x: BaseX, y: BaseY, Width: BaseWidth, Height: BaseHeight } = BaseGeometry;
        const { x: PaneX, y: PaneY, Width: PaneWidth, Height: PaneHeight } = PaneGeometry;
        let x, y, Width, Height;
        switch (WidgetAnchors[0]) {
            case 'left-width':
                x = WidgetX - BaseX;
                Width = WidgetWidth;
                break;
            case 'width-right':
                x = PaneWidth - (BaseX + BaseWidth - (WidgetX + WidgetWidth)) - WidgetWidth;
                Width = WidgetWidth;
                break;
            case 'left-right':
                x = WidgetX - BaseX;
                Width = Math.max(minWidth || 0, Math.min(PaneWidth - BaseWidth + WidgetWidth, maxWidth || Infinity));
        }
        switch (WidgetAnchors[1]) {
            case 'top-height':
                y = WidgetY - BaseY;
                Height = WidgetHeight;
                break;
            case 'height-bottom':
                y = PaneHeight - (BaseY + BaseHeight - (WidgetY + WidgetHeight)) - WidgetHeight;
                Height = WidgetHeight;
                break;
            case 'top-bottom':
                y = WidgetY - BaseY;
                Height = Math.max(minHeight || 0, Math.min(PaneHeight - BaseHeight + WidgetHeight, maxHeight || Infinity));
        }
        // @ts-ignore TS5905 all variables will be assigned by now
        return { x, y, Width, Height };
    }
    /**** dialog dragging and resizing ****/
    _handleDrag(dx, dy) {
        if (this._DragInfo.Mode === 'drag') {
            this._moveDialog(dx, dy);
        }
        else {
            this._resizeDialog(dx, dy);
        }
        this._Applet.bringOverlayToFront(this._Overlay.Name);
        rerender();
    }
    _moveDialog(dx, dy) {
        this._Overlay.x = this._DragInfo.initialGeometry.x + dx;
        this._Overlay.y = this._DragInfo.initialGeometry.y + dy;
    }
    _resizeDialog(dx, dy) {
        const Dialog = this._Overlay;
        const DragInfo = this._DragInfo;
        const { minWidth, maxWidth, minHeight, maxHeight } = Dialog;
        let newWidth = DragInfo.initialGeometry.Width;
        switch (DragInfo.Mode) {
            case 'resize-sw':
                newWidth = Math.max(minWidth || 0, Math.min(newWidth - dx, maxWidth || Infinity));
                dx = newWidth - DragInfo.initialGeometry.Width;
                Dialog.x = DragInfo.initialGeometry.x - dx;
                Dialog.Width = DragInfo.initialGeometry.Width + dx;
                break;
            case 'resize-se':
                Dialog.Width = Math.max(minWidth || 0, Math.min(DragInfo.initialGeometry.Width + dx, maxWidth || Infinity));
        }
        Dialog.Height = Math.max(minHeight || 0, Math.min(DragInfo.initialGeometry.Height + dy, maxHeight || Infinity));
    }
    _installGestureRecognizer() {
        if (this._Recognizer != null) {
            return;
        }
        this._Recognizer = GestureRecognizer({
            onlyFrom: '.Titlebar,.leftResizer,.middleResizer,.rightResizer',
            neverFrom: '.CloseButton',
            onDragStart: (dx, dy, _x, _y, Event) => {
                let ClassList = Event.target.classList;
                switch (true) {
                    case ClassList.contains('leftResizer'):
                        this._DragInfo.Mode = 'resize-sw';
                        break;
                    case ClassList.contains('middleResizer'):
                        this._DragInfo.Mode = 'resize-s';
                        break;
                    case ClassList.contains('rightResizer'):
                        this._DragInfo.Mode = 'resize-se';
                        break;
                    default: this._DragInfo.Mode = 'drag';
                }
                const { x, y, Width, Height } = this._Overlay;
                this._DragInfo.initialGeometry = { x, y, Width, Height };
                this._handleDrag(dx, dy);
            },
            onDragContinuation: (dx, dy) => this._handleDrag(dx, dy),
            onDragFinish: (dx, dy) => this._handleDrag(dx, dy),
            onDragCancellation: (dx, dy) => this._handleDrag(dx, dy),
        });
    }
    /**** render ****/
    render(PropSet) {
        this._releaseWidgets();
        const { Applet, Overlay } = PropSet;
        if ((this._Overlay != null) && (this._Overlay !== Overlay)) {
            this.componentWillUnmount(); // because preact reuses components
            this._Applet = Applet;
            this._Overlay = Overlay;
            this.componentDidMount();
        }
        else {
            this._Applet = Applet;
            this._Overlay = Overlay;
        }
        let { SourceWidgetPath, Title, isClosable, isDraggable, isResizable, x, y, Width, Height, Anchoring } = Overlay;
        const asDialog = (Overlay instanceof WAT_Dialog);
        const fromRight = (Anchoring[0] === 'right');
        const fromBottom = (Anchoring[1] === 'bottom');
        /**** leave here if overlay should not be shown... ****/
        const SourceWidget = Applet.WidgetAtPath(SourceWidgetPath);
        const Visibility = (PropSet.Visibility != null // "WAT_AppletView" may already
            ? PropSet.Visibility // have determined the visibility
            : (SourceWidget == null ? true : SourceWidget.on('visibility-request')())); // an invisible SourceWidget is shown if visibility-request returns true
        if (Visibility === false) {
            return '';
        }
        /**** ...otherwise continue as usual ****/
        if (x == null) {
            x = Overlay.x = (Applet.Width - Width) / 2;
        }
        if (y == null) {
            y = Overlay.y = (Applet.Height - Height) / 2;
        }
        const hasTitlebar = asDialog && ((Title != null) || isDraggable || isClosable);
        const resizable = (asDialog && isResizable ? 'resizable' : '');
        const withTitlebar = (asDialog && hasTitlebar ? 'withTitlebar' : '');
        /**** repositioning on viewport ****/
        const { x: AppletX, y: AppletY, Width: AppletWidth, Height: AppletHeight } = Applet.Geometry;
        let { left, top } = {
            left: x + (fromRight ? AppletWidth : 0),
            top: y + (fromBottom ? AppletHeight : 0)
        };
        if (asDialog) {
            ;
            ({ left, top } = fromDocumentTo('viewport', {
                left: left + AppletX, top: top + AppletY
            }));
            left = Math.max(0, Math.min(left, document.documentElement.clientWidth - 30));
            top = Math.max(0, Math.min(top, document.documentElement.clientHeight - 30));
        }
        else {
            left = Math.max(0, Math.min(left, AppletWidth));
            top = Math.max(0, Math.min(top, AppletHeight));
        }
        /**** Event Handlers ****/
        this._installGestureRecognizer();
        let Recognizer = this._Recognizer;
        const onClose = () => {
            Applet.closeOverlay(Overlay.Name);
        };
        /**** ContentPane Rendering ****/
        //    const SourceWidget = Applet.WidgetAtPath(SourceWidgetPath as WAT_Path)
        if (SourceWidget == null) {
            this._shownWidgets = [];
        }
        else {
            const WidgetsToShow = (SourceWidget.normalizedBehavior === 'basic_controls.outline'
                ? SourceWidget.bundledWidgets()
                : [SourceWidget]).filter((Widget) => ((Widget.isVisible || (Widget === SourceWidget)) && // see above
                ((Widget._Pane == null) || (Widget._Pane === Overlay))));
            WidgetsToShow.forEach((Widget) => Widget._Pane = Overlay);
            this._shownWidgets = WidgetsToShow;
        }
        const PaneGeometry = { x, y, Width, Height }; // some browsers need Width+2,Height+2
        if (hasTitlebar) {
            PaneGeometry.Height -= 30;
        }
        if (asDialog && isResizable) {
            PaneGeometry.Height -= 10;
        }
        PaneGeometry.Height = Math.max(0, PaneGeometry.Height);
        const BaseGeometry = (SourceWidget == null
            ? { x: 0, y: 0, Width: 0, Height: 0 } // just a dummy
            : SourceWidget.Geometry);
        let ContentPaneIsTooSmall = false; // browsers are not precise enough
        let ContentPane = this._shownWidgets.toReversed().map((Widget) => {
            let Geometry = this._GeometryOfWidgetRelativeTo(Widget, BaseGeometry, PaneGeometry);
            const { x, y, Width, Height } = Geometry;
            if ((x < 0) || (x + Width > PaneGeometry.Width) ||
                (y < 0) || (y + Height > PaneGeometry.Height)) {
                ContentPaneIsTooSmall = true;
            }
            return html `<${WAT_WidgetView} key=${IdOfVisual(Widget)} Widget=${Widget} Geometry=${Geometry}/>`;
        });
        /**** actual overlay rendering ****/
        if (asDialog) {
            return html `<div ref=${this._Ref} class="WAT ${resizable} Dialog ${withTitlebar}" style="
          left:${left}px; top:${top}px; width:${Width}px; height:${Height}px;
        ">
          ${hasTitlebar && html `<div class="Titlebar"
            onPointerDown=${Recognizer} onPointerUp=${Recognizer}
            onPointerMove=${Recognizer} onPointerCancel=${Recognizer}
          >
            <div class="Title">${Title}</div>

            ${(isClosable) && html `
              <img class="CloseButton" src="${Applet.AssetURL('/icons/xmark.png')}" onClick=${onClose}/>
            `}
          </div>`}

          <div class="ContentPane" style="
            overflow:${ContentPaneIsTooSmall ? 'auto' : 'hidden'}"
          >${ContentPane}</div>

          ${isResizable && html `
            <div class="leftResizer"
              onPointerDown=${Recognizer} onPointerUp=${Recognizer}
              onPointerMove=${Recognizer} onPointerCancel=${Recognizer}
            />
            <div class="middleResizer"
              onPointerDown=${Recognizer} onPointerUp=${Recognizer}
              onPointerMove=${Recognizer} onPointerCancel=${Recognizer}
            />
            <div class="rightResizer"
              onPointerDown=${Recognizer} onPointerUp=${Recognizer}
              onPointerMove=${Recognizer} onPointerCancel=${Recognizer}
            />
          `}
        </div>`;
        }
        else {
            return html `<div ref=${this._Ref} class="WAT AppletOverlay" style="
          left:${left}px; top:${top}px; width:${Width}px; height:${Height}px;
        ">
          <div class="ContentPane">${ContentPane}</div>
        </div>`;
        }
    }
}
//------------------------------------------------------------------------------
//--                            WAT_WidgetUnderlay                            --
//------------------------------------------------------------------------------
const WAT_WidgetUnderlay_EventTypes = [
    'click', 'dblclick',
    /*'mousedown',*/ 'mouseup', 'mousemove', 'mouseover', 'mouseout',
    'mouseenter', 'mouseleave',
    /*'touchstart',*/ 'touchend', 'touchmove', 'touchcancel',
    /*'pointerdown',*/ 'pointerup', 'pointermove', 'pointerover', 'pointerout',
    'pointerenter', 'pointerleave', 'pointercancel',
    'keydown', 'keyup', 'keypress',
    'wheel', 'contextmenu', 'focus', 'blur'
];
class WAT_WidgetUnderlay extends Component {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "_Widget", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_Ref", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: createRef()
        });
        Object.defineProperty(this, "_EventConsumer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (Event) => {
                if (Event.target !== Event.currentTarget) {
                    return;
                } // don't block overlay
                consumeEvent(Event);
            }
        });
    }
    componentDidMount() {
        const Base = this._Ref.current;
        Base['_Widget'] = this._Widget;
        WAT_WidgetUnderlay_EventTypes.forEach((EventType) => {
            this._Ref.current.addEventListener(EventType, this._EventConsumer);
        });
    }
    componentWillUnmount() {
        WAT_WidgetUnderlay_EventTypes.forEach((EventType) => {
            this._Ref.current.removeEventListener(EventType, this._EventConsumer);
        });
    }
    render(PropSet) {
        const { Widget, Overlay } = PropSet;
        this._Widget = Widget;
        const handleEvent = (Event) => {
            if (Event.target !== Event.currentTarget) {
                return;
            }
            consumeEvent(Event);
            if (!Overlay.isModal) {
                Widget.closeOverlay(Overlay.Name);
            }
        };
        const modal = (Overlay.isModal ? 'modal' : '');
        return html `<div ref=${this._Ref} class="WAT ${modal} WidgetUnderlay"
        onMouseDown=${handleEvent} onPointerDown=${handleEvent}
        onTouchStart=${handleEvent}
      >${PropSet.children}</>`;
    }
}
//------------------------------------------------------------------------------
//--                          WAT_WidgetOverlayView                           --
//------------------------------------------------------------------------------
class WAT_WidgetOverlayView extends Component {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "_Widget", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        // @ts-ignore TS2564 will be initialized in renderer
        Object.defineProperty(this, "_Overlay", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_shownWidgets", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        Object.defineProperty(this, "_Ref", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: createRef()
        });
    }
    /**** _releaseWidgets ****/
    _releaseWidgets() {
        this._shownWidgets.forEach((Widget) => {
            if (Widget._Pane === this._Overlay) {
                Widget._Pane = undefined;
            }
        });
        this._shownWidgets = [];
    }
    /**** componentDidMount ****/
    componentDidMount() {
        // @ts-ignore TS2445 I know, it's a hack, but allow access to protected member here
        this._Overlay._View = this;
        const Base = this._Ref.current;
        if (Base != null) { // just a defensive guard
            Base['_Widget'] = this._Widget;
            Base['_Overlay'] = this._Overlay;
        }
    }
    /**** componentWillUnmount ****/
    componentWillUnmount() {
        //    this._releaseWidgets()  // may be too late, is therefore done when closing
        // @ts-ignore TS2445 I know, it's a hack, but allow access to protected member here
        delete this._Overlay._View;
    }
    /**** _GeometryRelativeTo  ****/
    _GeometryOfWidgetRelativeTo(Widget, BaseGeometry, PaneGeometry) {
        const WidgetAnchors = Widget.Anchors;
        const { x: WidgetX, y: WidgetY, Width: WidgetWidth, Height: WidgetHeight } = Widget.Geometry;
        const { minWidth, minHeight, maxWidth, maxHeight } = Widget;
        const { x: BaseX, y: BaseY, Width: BaseWidth, Height: BaseHeight } = BaseGeometry;
        const { x: PaneX, y: PaneY, Width: PaneWidth, Height: PaneHeight } = PaneGeometry;
        let x, y, Width, Height;
        switch (WidgetAnchors[0]) {
            case 'left-width':
                x = WidgetX - BaseX;
                Width = WidgetWidth;
                break;
            case 'width-right':
                x = PaneWidth - (BaseX + BaseWidth - (WidgetX + WidgetWidth)) - WidgetWidth;
                Width = WidgetWidth;
                break;
            case 'left-right':
                x = WidgetX - BaseX;
                Width = Math.max(minWidth || 0, Math.min(PaneWidth - BaseWidth + WidgetWidth, maxWidth || Infinity));
        }
        switch (WidgetAnchors[1]) {
            case 'top-height':
                y = WidgetY - BaseY;
                Height = WidgetHeight;
                break;
            case 'height-bottom':
                y = PaneHeight - (BaseY + BaseHeight - (WidgetY + WidgetHeight)) - WidgetHeight;
                Height = WidgetHeight;
                break;
            case 'top-bottom':
                y = WidgetY - BaseY;
                Height = Math.max(minHeight || 0, Math.min(PaneHeight - BaseHeight + WidgetHeight, maxHeight || Infinity));
        }
        // @ts-ignore TS5905 all variables will be assigned by now
        return { x, y, Width, Height };
    }
    /**** render ****/
    render(PropSet) {
        this._releaseWidgets();
        const { Widget, Overlay } = PropSet;
        if ((this._Overlay != null) && (this._Overlay !== Overlay)) {
            this.componentWillUnmount(); // because preact reuses components
            this._Widget = Widget;
            this._Overlay = Overlay;
            this.componentDidMount();
        }
        else {
            this._Widget = Widget;
            this._Overlay = Overlay;
        }
        const { SourceWidgetPath, x, y, Width, Height } = Overlay;
        /**** repositioning on viewport ****/
        const { x: AppletX, y: AppletY } = Widget.Applet.Geometry;
        const { x: WidgetX, y: WidgetY } = Widget.Geometry;
        let { left, top } = fromDocumentTo('viewport', {
            left: x + WidgetX + AppletX, top: y + WidgetY + AppletY
        });
        left = Math.max(0, Math.min(left, document.documentElement.clientWidth - 30));
        top = Math.max(0, Math.min(top, document.documentElement.clientHeight - 30));
        /**** onClose ****/
        const onClose = () => {
            Widget.closeOverlay(Overlay.Name);
        };
        /**** ContentPane Rendering ****/
        const SourceWidget = Widget.Applet.WidgetAtPath(SourceWidgetPath);
        if (SourceWidget == null) {
            this._shownWidgets = [];
        }
        else {
            const WidgetsToShow = (SourceWidget.normalizedBehavior === 'basic_controls.outline'
                ? SourceWidget.bundledWidgets()
                : [SourceWidget]).filter((Widget) => (Widget.isVisible && ((Widget._Pane == null) || (Widget._Pane === Overlay))));
            WidgetsToShow.forEach((Widget) => Widget._Pane = Overlay);
            this._shownWidgets = WidgetsToShow;
        }
        const PaneGeometry = { x, y, Width, Height };
        const BaseGeometry = (SourceWidget == null
            ? { x: 0, y: 0, Width: 0, Height: 0 } // just a dummy
            : SourceWidget.Geometry);
        let ContentPane = this._shownWidgets.toReversed().map((Widget) => {
            let Geometry = this._GeometryOfWidgetRelativeTo(Widget, BaseGeometry, PaneGeometry);
            return html `<${WAT_WidgetView} key=${IdOfVisual(Widget)} Widget=${Widget} Geometry=${Geometry}/>`;
        });
        /**** actual overlay rendering ****/
        return html `<div ref=${this._Ref} class="WAT WidgetOverlay" style="
        left:${left}px; top:${top}px; width:${Width}px; height:${Height}px;
      ">
        ${ContentPane}
      </div>`;
    }
}
/**** consume/consumingEvent ****/
function consumeEvent(Event) {
    Event.stopPropagation();
    Event.preventDefault();
}
const consumingEvent = consumeEvent;
/**** rerender - sometimes optimizes rerendering ****/
let combinedView = undefined;
let RenderRequest;
export function rerender() {
    if (RenderRequest != null) {
        return;
    }
    if (combinedView != null) {
        RenderRequest = setTimeout(() => {
            RenderRequest = undefined;
            if (combinedView != null) {
                try {
                    combinedView.rerender();
                }
                catch (Signal) {
                    console.error('caught failure in rendering request', Signal);
                }
            }
        }, 0);
    }
}
function mapTouchToMouseIn(Target) {
    function TouchEventMapper(originalEvent) {
        let simulatedEventType;
        switch (originalEvent.type) {
            case 'touchstart':
                simulatedEventType = 'mousedown';
                break;
            case 'touchmove':
                simulatedEventType = 'mousemove';
                break;
            case 'touchend':
                simulatedEventType = 'mouseup';
                break;
            case 'touchcancel':
                simulatedEventType = 'mouseup';
                break;
            default: return;
        }
        let firstTouch = originalEvent.changedTouches[0];
        let clientX = firstTouch.clientX, pageX = firstTouch.pageX, PageXOffset = window.pageXOffset;
        let clientY = firstTouch.clientY, pageY = firstTouch.pageY, PageYOffset = window.pageYOffset;
        if ((pageX === 0) && (Math.floor(clientX) > Math.floor(pageX)) ||
            (pageY === 0) && (Math.floor(clientY) > Math.floor(pageY))) {
            clientX -= PageXOffset;
            clientY -= PageYOffset;
        }
        else if ((clientX < pageX - PageXOffset) || (clientY < pageY - PageYOffset)) {
            clientX = pageX - PageXOffset;
            clientY = pageY - PageYOffset;
        }
        let simulatedEvent = new MouseEvent(simulatedEventType, {
            bubbles: true, cancelable: true,
            screenX: firstTouch.screenX, screenY: firstTouch.screenY,
            // @ts-ignore we definitely want "pageX" and "pageY"
            clientX, clientY, pageX, pageY, buttons: 1, button: 0,
            ctrlKey: originalEvent.ctrlKey, shiftKey: originalEvent.shiftKey,
            altKey: originalEvent.altKey, metaKey: originalEvent.metaKey
        });
        firstTouch.target.dispatchEvent(simulatedEvent);
        //    originalEvent.preventDefault()
    }
    // @ts-ignore TS2345 allow "TouchEventMapper" as callback
    Target.addEventListener('touchstart', TouchEventMapper, true);
    // @ts-ignore TS2345 allow "TouchEventMapper" as callback
    Target.addEventListener('touchmove', TouchEventMapper, true);
    // @ts-ignore TS2345 allow "TouchEventMapper" as callback
    Target.addEventListener('touchend', TouchEventMapper, true);
    // @ts-ignore TS2345 allow "TouchEventMapper" as callback
    Target.addEventListener('touchcancel', TouchEventMapper, true);
}
//mapTouchToMouseIn(document)
//----------------------------------------------------------------------------//
//                           Confirmation Handling                            //
//----------------------------------------------------------------------------//
export function OperationWasConfirmed(Message) {
    let ConfirmationCode = Math.round(Math.random() * 10000).toString();
    ConfirmationCode += '0000'.slice(ConfirmationCode.length);
    Message = (Message || 'This operation can not be undone.') + '\n\n' +
        'Please, enter the following number if you want to proceed:\n\n' +
        '   ' + ConfirmationCode + '\n\n' +
        'Otherwise, the operation will be cancelled';
    let UserInput = window.prompt(Message, '');
    if (UserInput === ConfirmationCode) {
        return true;
    }
    else {
        window.alert('Operation will be cancelled');
        return false;
    }
}
/**** useDesigner ****/
let DesignerLayer = undefined;
export function useDesigner(newDesigner) {
    allowFunction('WAT designer', newDesigner); // it's a preact function component
    console.log('installing WebApp Tinkerer Designer');
    DesignerLayer = newDesigner;
    rerender();
}
/**** AppletFor ****/
export function AppletFor(Value) {
    switch (true) {
        case ValueIsApplet(Value): return Value;
        case ValueIsPage(Value): return Value.Applet;
        case ValueIsWidget(Value): return Value.Applet;
        case (Value instanceof Event):
            if (Value.target != null) {
                Value = Value.target.closest('.WAT.Applet,.WAT.Page,.WAT.Widget,' +
                    '.WAT.AppletOverlay,.WAT.Dialog,' +
                    '.WAT.WidgetOverlay,.WAT.WidgetUnderlay');
                if (Value == null) {
                    break;
                }
            }
            else {
                break;
            }
        case (Value instanceof Element):
            switch (true) {
                case (Value === null || Value === void 0 ? void 0 : Value._Applet) != null: return Value._Applet;
                case (Value === null || Value === void 0 ? void 0 : Value._Page) != null: return Value._Page.Applet;
                case (Value === null || Value === void 0 ? void 0 : Value._Widget) != null: return Value._Widget.Applet;
            }
    }
    window.alert('could not find any visual for this DOM element');
    return undefined;
}
/**** PageFor ****/
export function PageFor(Value) {
    switch (true) {
        case ValueIsApplet(Value): return Value.visitedPage;
        case ValueIsPage(Value): return Value;
        case ValueIsWidget(Value): return Value.Page;
        case (Value instanceof Event):
            if (Value.target != null) {
                Value = Value.target.closest('.WAT.Applet,.WAT.Page,.WAT.Widget,' +
                    '.WAT.AppletOverlay,.WAT.Dialog,' +
                    '.WAT.WidgetOverlay,.WAT.WidgetUnderlay');
                if (Value == null) {
                    break;
                }
            }
            else {
                break;
            }
        case (Value instanceof Element):
            switch (true) {
                case (Value === null || Value === void 0 ? void 0 : Value._Applet) != null: return Value._Applet.visitedPage;
                case (Value === null || Value === void 0 ? void 0 : Value._Page) != null: return Value._Page;
                case (Value === null || Value === void 0 ? void 0 : Value._Widget) != null: return Value._Widget.Page;
            }
    }
    window.alert('could not find any visual for this DOM element');
    return undefined;
}
/**** WidgetFor ****/
export function WidgetFor(Value) {
    switch (true) {
        case ValueIsWidget(Value): return Value;
        case (Value instanceof Event):
            if (Value.target != null) {
                Value = Value.target.closest('.WAT.Widget,' +
                    '.WAT.WidgetOverlay,.WAT.WidgetUnderlay');
                if (Value == null) {
                    break;
                }
            }
            else {
                break;
            }
        case (Value instanceof Element):
            if ((Value === null || Value === void 0 ? void 0 : Value._Widget) != null) {
                return Value._Widget;
            }
    }
    window.alert('could not find any widget for this DOM element');
    return undefined;
} //------------------------------------------------------------------------------
//--                               WAT Startup                                --
//------------------------------------------------------------------------------
let AppletStore;
/**** startup ****/
function startup() {
    localforage.ready(function () {
        AppletStore = localforage.createInstance({
            name: 'WebApp Tinkerer'
        });
        window.addEventListener('unhandledrejection', (Event) => {
            var _a, _b;
            console.error('caught unhandled error in Promise:', ((_a = Event.reason) === null || _a === void 0 ? void 0 : _a.stack) || ((_b = Event.reason) === null || _b === void 0 ? void 0 : _b.message), Event);
            Event.preventDefault();
        });
        collectInternalNames();
        startWAT();
    });
}
/**** startWAT ****/
async function startWAT() {
    console.log('starting WebApp Tinkerer Runtime...');
    /**** find rendering target (with applet name) ****/
    let AppletElement = document.body.querySelector('div[type="wat/applet"]');
    if (AppletElement == null) {
        AppletElement = document.createElement('div');
        AppletElement.setAttribute('type', 'wat/applet');
        AppletElement.classList.add('fullscreen');
        document.body.appendChild(AppletElement);
    }
    let AppletName = acceptableValue(AppletElement.getAttribute('name'), ValueIsName, 'WAT-Applet');
    let AssetsBase = acceptableValue(AppletElement.getAttribute('assets-base'), ValueIsURL, '');
    if (AssetsBase.trim() === '') {
        AssetsBase = 'https://rozek.github.io/webapp-tinkerer/';
    }
    DesignerAssetsBase = acceptableValue(AppletElement.getAttribute('designer-assets-base'), ValueIsURL, '');
    if (DesignerAssetsBase.trim() === '') {
        DesignerAssetsBase = 'https://rozek.github.io/webapp-tinkerer/';
    }
    /**** read applet script - if stored separately ****/
    let ScriptElement = document.querySelector('script[type="wat/applet-script"]');
    /**** deserialize applet ****/
    let SerializationElement = document.querySelector('script[type="wat/applet"]');
    let Applet = undefined;
    let Serialization = undefined;
    try {
        Serialization = await AppletStore.getItem(AppletName);
    }
    catch (Signal) {
        console.warn(`could not read backup of applet ${quoted(AppletName)}`, Signal);
        Serialization = null;
    }
    if (Serialization != null) {
        try {
            Applet = WAT_Applet.deserializedFrom(Serialization);
        }
        catch (Signal) {
            console.error(`could not deserialize applet ${quoted(AppletName)} from backup`, Signal);
        }
    }
    if ((Applet == null) && (SerializationElement != null)) {
        Serialization = SerializationElement.textContent || '';
        try {
            const ParsedSerialization = JSON.parse(Serialization);
            if (ScriptElement != null) {
                ParsedSerialization.activeScript = ScriptElement.textContent || '';
            }
            Applet = WAT_Applet.deserializedFrom(JSON.stringify(ParsedSerialization));
        }
        catch (Signal) {
            console.error(`could not deserialize applet ${quoted(AppletName)}`, Signal);
        }
    }
    if ((Applet == null) && (SerializationElement == null) && (ScriptElement != null)) { // an applet script without serialization runs in an empty applet
        try {
            Applet = WAT_Applet.deserializedFrom(JSON.stringify({
                PageList: [{ WidgetList: [] }],
                activeScript: ScriptElement.textContent || ''
            }));
        }
        catch (Signal) {
            console.error(`could not deserialize applet ${quoted(AppletName)}`, Signal);
        }
    }
    if (Applet == null) { // in case of an error, create an empty applet
        Applet = WAT_Applet.deserializedFrom('{"PageList":[{ "WidgetList":[] }]}');
    }
    ;
    Applet._Name = AppletName;
    if (Applet._AssetsBase == null) {
        ;
        Applet._AssetsBase = AssetsBase;
    }
    if (Applet.visitedPage == null) {
        Applet.visitPage(Applet.PageList[0]);
    }
    /**** finally render the applet ****/
    AppletElement.innerHTML = '';
    render(html `<${WAT_combinedView} Applet=${Applet}/>`, AppletElement);
    /**** rerender whenever window is changed ****/
    window.addEventListener('resize', rerender);
    window.Applet = Applet; // for testing and debugging purposes only
    console.log('WebApp Tinkerer Runtime is operational');
}
/**** IdOfVisual ****/
const IdForVisual = new WeakMap();
function IdOfVisual(Visual) {
    if (IdForVisual.has(Visual)) {
        return IdForVisual.get(Visual);
    }
    else {
        let Id = newId();
        IdForVisual.set(Visual, Id);
        return Id;
    }
}
/**** newId - uses nanoid with custom dictionary ****/
export const newId = customAlphabet(nolookalikesSafe, 21);
const global = (new Function('return this'))();
global.JIL = JIL;
global.WAT = {};
const WAT = global.WAT; // just for convenience
for (const [Key, Value] of Object.entries(JIL)) { // map JIL to WAT
    if (Key !== 'default') {
        WAT[Key] = Value;
    }
}
Object.assign(WAT, {
    Version: WAT_Version,
    Object_assign, AsyncFunction,
    newId,
    throwError, throwReadOnlyError,
    acceptableValue, allowValue, expectValue,
    ValueIsIdentifier, allowIdentifier, allowedIdentifier, expectIdentifier, expectedIdentifier,
    ValueIsName, allowName, allowedName, expectName, expectedName,
    ValueIsPath, allowPath, allowedPath, expectPath, expectedPath,
    ValueIsCategory, allowCategory, allowedCategory, expectCategory, expectedCategory,
    ValueIsBehavior, allowBehavior, allowedBehavior, expectBehavior, expectedBehavior,
    ValueIsVisual, allowVisual, allowedVisual, expectVisual, expectedVisual,
    ValueIsApplet, allowApplet, allowedApplet, expectApplet, expectedApplet,
    ValueIsPage, allowPage, allowedPage, expectPage, expectedPage,
    ValueIsWidget, allowWidget, allowedWidget, expectWidget, expectedWidget,
    ValueIsLocation, allowLocation, allowedLocation, expectLocation, expectedLocation,
    ValueIsDimension, allowDimension, allowedDimension, expectDimension, expectedDimension,
    ValueIsPosition, allowPosition, allowedPosition, expectPosition, expectedPosition,
    ValueIsSize, allowSize, allowedSize, expectSize, expectedSize,
    ValueIsGeometry, allowGeometry, allowedGeometry, expectGeometry, expectedGeometry,
    ValueIsSerializableValue, allowSerializableValue, allowedSerializableValue, expectSerializableValue, expectedSerializableValue,
    ValueIsSerializableObject, allowSerializableObject, allowedSerializableObject, expectSerializableObject, expectedSerializableObject,
    BehaviorIsIntrinsic,
    GestureRecognizer,
    Mover: WAT_Mover, Resizer: WAT_Resizer, Shaper: WAT_Shaper, Dragger: WAT_Dragger,
    Component, createRef, useRef, useEffect, useCallback,
    fromLocalTo, fromViewportTo, fromDocumentTo,
    OperationWasConfirmed,
});
global.AppletFor = AppletFor;
global.PageFor = PageFor;
global.WidgetFor = WidgetFor;
/**** start WAT up ****/
localforage.config({
    driver: [localforage.INDEXEDDB, localforage.WEBSQL]
});
if (document.readyState === 'loading') {
    window.addEventListener('DOMContentLoaded', startup);
}
else {
    startup();
}
