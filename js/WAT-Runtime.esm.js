/*******************************************************************************
*                                                                              *
*                        WebApp Tinkerer (WAT) Runtime                         *
*                                                                              *
*******************************************************************************/
const IconFolder = 'https://rozek.github.io/webapp-tinkerer/icons';
import { 
//  throwError,
quoted, ValuesDiffer, ValueIsBoolean, ValueIsNumber, ValueIsFiniteNumber, ValueIsNumberInRange, ValueIsInteger, ValueIsIntegerInRange, ValueIsOrdinal, ValueIsString, ValueIsStringMatching, ValueIsText, ValueIsTextline, ValueIsObject, ValueIsPlainObject, ValueIsList, ValueIsListSatisfying, ValueIsFunction, ValueIsOneOf, ValueIsColor, ValueIsEMailAddress, /*ValueIsPhoneNumber,*/ ValueIsURL, ValidatorForClassifier, acceptNil, rejectNil, expectValue, allowBoolean, expectBoolean, allowNumber, expectNumber, allowFiniteNumber, allowNumberInRange, allowInteger, expectInteger, allowIntegerInRange, allowOrdinal, expectCardinal, expectString, allowStringMatching, allowText, expectText, allowTextline, expectPlainObject, expectList, allowListSatisfying, expectListSatisfying, allowFunction, expectFunction, allowOneOf, expectOneOf, allowColor, allowURL, } from 'javascript-interface-library';
import * as JIL from 'javascript-interface-library';
const ValueIsPhoneNumber = ValueIsTextline; // *C* should be implemented
import { render, html, Component, createRef, useRef } from 'htm/preact';
import hyperactiv from 'hyperactiv';
const { observe, computed, dispose } = hyperactiv;
import { customAlphabet } from 'nanoid';
// @ts-ignore TS2307 typescript has problems importing "nanoid-dictionary"
import { nolookalikesSafe } from 'nanoid-dictionary';
import mapTouchToMouseFor from 'svelte-touch-to-mouse';
mapTouchToMouseFor('.WAT.Dialog > .Titlebar');
mapTouchToMouseFor('.WAT.Dialog > .leftResizer');
mapTouchToMouseFor('.WAT.Dialog > .middleResizer');
mapTouchToMouseFor('.WAT.Dialog > .rightResizer');
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
export const WAT_horizontalAnchorses = ['left-width', 'left-right', 'width-right'];
export const WAT_verticalAnchorses = ['top-height', 'top-bottom', 'height-bottom'];
export const WAT_Orientations = ['any', 'portrait', 'landscape'];
/**** configuration-related types ****/
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
    //  'missing Behaviour',         'Behaviour Execution Failure',
    'Script Compilation Failure', 'Script Execution Failure',
    '"Value" Setting Failure', 'Rendering Failure',
    '"onMount" Callback Failure', '"onUnmount" Callback Failure',
    '"onFocus" Callback Failure', '"onBlur" Callback Failure',
    '"onClick" Callback Failure', '"onInput" Callback Failure',
    '"onDrop" Callback Failure', '"onDropError" Callback Failure',
    '"onValueChange" Callback Failure', 'Custom Callback Failure',
    'Event Handling Failure',
];
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
/**** ValueIsWidgetType ****/
export function ValueIsWidgetType(Value) {
    return ValueIsString(Value) && (Value in builtInWidgetTypes);
}
/**** allow/expect[ed]WidgetType ****/
export const allowWidgetType = ValidatorForClassifier(ValueIsWidgetType, acceptNil, 'WAT widget type'), allowedWidgetType = allowWidgetType;
export const expectWidgetType = ValidatorForClassifier(ValueIsWidgetType, rejectNil, 'WAT widget type'), expectedWidgetType = expectWidgetType;
/**** ValueIsLocation ****/
export function ValueIsLocation(Value) {
    return ValueIsFiniteNumber(Value);
}
/**** allow/expect[ed]Location ****/
export const allowLocation = ValidatorForClassifier(ValueIsLocation, acceptNil, 'WAT coordinate'), allowedLocation = allowLocation;
export const expectLocation = ValidatorForClassifier(ValueIsLocation, rejectNil, 'WAT coordinate'), expectedLocation = expectLocation;
/**** ValueIsDimension ****/
export function ValueIsDimension(Value) {
    return ValueIsFiniteNumber(Value) && (Value >= 0);
}
/**** allow/expect[ed]Dimension ****/
export const allowDimension = ValidatorForClassifier(ValueIsDimension, acceptNil, 'WAT dimension'), allowedDimension = allowDimension;
export const expectDimension = ValidatorForClassifier(ValueIsDimension, rejectNil, 'WAT dimension'), expectedDimension = expectDimension;
/**** ValueIsPosition ****/
export function ValueIsPosition(Value) {
    return (ValueIsObject(Value) &&
        ValueIsLocation(Value.x) &&
        ValueIsLocation(Value.y));
}
/**** allow/expect[ed]Position ****/
export const allowPosition = ValidatorForClassifier(ValueIsPosition, acceptNil, 'WAT position'), allowedPosition = allowPosition;
export const expectPosition = ValidatorForClassifier(ValueIsPosition, rejectNil, 'WAT position'), expectedPosition = expectPosition;
/**** ValueIsSize ****/
export function ValueIsSize(Value) {
    return (ValueIsObject(Value) &&
        ValueIsDimension(Value.Width) &&
        ValueIsDimension(Value.Height));
}
/**** allow/expect[ed]Size ****/
export const allowSize = ValidatorForClassifier(ValueIsSize, acceptNil, 'WAT size'), allowedSize = allowSize;
export const expectSize = ValidatorForClassifier(ValueIsSize, rejectNil, 'WAT size'), expectedSize = expectSize;
/**** ValueIsGeometry ****/
export function ValueIsGeometry(Value) {
    return (ValueIsObject(Value) &&
        ValueIsLocation(Value.x) && ValueIsDimension(Value.Width) &&
        ValueIsLocation(Value.y) && ValueIsDimension(Value.Height));
}
/**** allow/expect[ed]Geometry ****/
export const allowGeometry = ValidatorForClassifier(ValueIsGeometry, acceptNil, 'WAT geometry'), allowedGeometry = allowGeometry;
export const expectGeometry = ValidatorForClassifier(ValueIsGeometry, rejectNil, 'WAT geometry'), expectedGeometry = expectGeometry;
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
export function ValueIsSerializableValue(Value) {
    switch (true) {
        case (Value === null):
        case ValueIsBoolean(Value):
        case ValueIsNumber(Value):
        case ValueIsString(Value):
        case ValueIsListSatisfying(Value, ValueIsSerializableValue):
            return true;
        case ValueIsPlainObject(Value): // *C* check for recursion
            for (let Property in Value) {
                if (Value.hasOwnProperty(Property) &&
                    !ValueIsSerializableValue(Value[Property])) {
                    return false;
                }
            }
            return true;
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
//------------------------------------------------------------------------------
//--                           Stylesheet Handling                            --
//------------------------------------------------------------------------------
let StyleElement = document.getElementById('WAT-Stylesheet');
if (StyleElement == null) {
    StyleElement = document.createElement('style');
    StyleElement.id = 'WAT-Stylesheet';
    StyleElement.textContent = '';
    document.head.appendChild(StyleElement);
}
/**** appendStyle ****/
function appendStyle(Style) {
    // @ts-ignore TS18047 no, "StyleElement" is not null
    StyleElement.textContent += Style;
}
appendStyle(`
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

/**** WAT Applet ****/

  .WAT.Applet {
    color:black;
    font-family:'Source Sans Pro','Helvetica Neue',Helvetica,Arial,sans-serif;
    font-size:14px; font-weight:normal; line-height:1.4; color:black;
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

/**** WAT ModalLayer ****/

  .WAT.ModalLayer {
    display:block; position:fixed;
    left:0px; top:0px; right:auto; bottom:auto; width:100%; height:100%;
    background:black; opacity:0.1;
    z-index:1000000;
    pointer-events:auto;
  }

/**** WAT Underlay ****/

  .WAT.Underlay {
    display:block; position:fixed;
    left:0px; top:0px; right:auto; bottom:auto; width:100%; height:100%;
    pointer-events:auto;
  }
  .WAT.modal.Underlay {
    background:black; opacity:0.1;
  }

/**** WAT DialogLayer ****/

  .WAT.DialogLayer {
    display:block; position:absolute; overflow:visible;
    left:0px; top:0px; right:0px; bottom:0px; width:auto; height:auto;
    pointer-events:none;
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

/**** WAT OverlayLayer ****/

  .WAT.OverlayLayer {
    display:block; position:absolute; overflow:visible;
    left:0px; top:0px; right:0px; bottom:0px; width:auto; height:auto;
    pointer-events:none;
  }

/**** Overlay ****/

  .WAT.Overlay {
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
  }

/**** common Settings ****/

  .disabled, [disabled] { opacity:0.3 }
  .readonly             { background:none }
  .no-pointer-events    { pointer-events:none }

  .textured { background-image:repeat }

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

`.trimLeft());
//------------------------------------------------------------------------------
//--                               Acceptables                                --
//------------------------------------------------------------------------------
/**** acceptableBoolean ****/
export function acceptableBoolean(Value, Default) {
    return (ValueIsBoolean(Value) ? Value : Default);
}
/**** acceptableOptionalBoolean ****/
export function acceptableOptionalBoolean(Value, Default) {
    return (Value == null
        ? undefined
        : ValueIsBoolean(Value) ? Value : Default);
}
/**** acceptableNumber ****/
export function acceptableNumber(Value, Default) {
    return (ValueIsNumber(Value) ? Value : Default);
}
/**** acceptableOptionalNumber ****/
export function acceptableOptionalNumber(Value, Default) {
    return (ValueIsNumber(Value) ? Value : Default);
}
/**** acceptableNumberInRange ****/
export function acceptableNumberInRange(Value, Default, minValue = -Infinity, maxValue = Infinity, withMin = false, withMax = false) {
    return (ValueIsNumberInRange(Value, minValue, maxValue, withMin, withMax) ? Value : Default);
}
/**** acceptableOptionalNumberInRange ****/
export function acceptableOptionalNumberInRange(Value, Default, minValue = -Infinity, maxValue = Infinity, withMin = false, withMax = false) {
    return (ValueIsNumberInRange(Value, minValue, maxValue, withMin, withMax)
        ? Value
        : Default);
}
/**** acceptableInteger ****/
export function acceptableInteger(Value, Default) {
    return (ValueIsInteger(Value) ? Value : Default);
}
/**** acceptableOptionalInteger ****/
export function acceptableOptionalInteger(Value, Default) {
    return (ValueIsInteger(Value) ? Value : Default);
}
/**** acceptableIntegerInRange ****/
export function acceptableIntegerInRange(Value, Default, minValue = -Infinity, maxValue = Infinity) {
    return (ValueIsIntegerInRange(Value, minValue, maxValue) ? Value : Default);
}
/**** acceptableOptionalIntegerInRange ****/
export function acceptableOptionalIntegerInRange(Value, Default, minValue = -Infinity, maxValue = Infinity) {
    return (ValueIsIntegerInRange(Value, minValue, maxValue) ? Value : Default);
}
/**** acceptableOrdinal ****/
export function acceptableOrdinal(Value, Default) {
    return (ValueIsOrdinal(Value) ? Value : Default);
}
/**** acceptableOptionalOrdinal ****/
export function acceptableOptionalOrdinal(Value, Default) {
    return (ValueIsOrdinal(Value) ? Value : Default);
}
/**** acceptableString ****/
export function acceptableString(Value, Default) {
    return (ValueIsString(Value) ? Value : Default);
}
/**** acceptableOptionalString ****/
export function acceptableOptionalString(Value, Default) {
    return (ValueIsString(Value) ? Value : Default);
}
/**** acceptableNonEmptyString ****/
export function acceptableNonEmptyString(Value, Default) {
    return (ValueIsString(Value) && (Value.trim() !== '') ? Value : Default);
}
/**** acceptableOptionalNonEmptyString ****/
export function acceptableOptionalNonEmptyString(Value, Default) {
    return (ValueIsString(Value) && (Value.trim() !== '') ? Value : Default);
}
/**** acceptableStringMatching ****/
export function acceptableStringMatching(Value, Default, Pattern) {
    return (ValueIsStringMatching(Value, Pattern) ? Value : Default);
}
/**** acceptableOptionalStringMatching ****/
export function acceptableOptionalStringMatching(Value, Default, Pattern) {
    return (ValueIsStringMatching(Value, Pattern) ? Value : Default);
}
/**** acceptableText ****/
const noCtrlCharsButCRLFTABPattern = /^[^\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x9F\u2028\u2029\uFFF9-\uFFFB]*$/;
export function acceptableText(Value, Default) {
    return (ValueIsStringMatching(Value, noCtrlCharsButCRLFTABPattern) ? Value : Default);
}
/**** acceptableOptionalText ****/
export function acceptableOptionalText(Value, Default) {
    return (ValueIsText(Value) ? Value : Default);
}
/**** acceptableTextline ****/
export function acceptableTextline(Value, Default) {
    return (ValueIsTextline(Value) ? Value : Default).replace(/[\f\r\n\v\u0085\u2028\u2029].*$/, '...');
}
/**** acceptableOptionalTextline ****/
export function acceptableOptionalTextline(Value, Default) {
    const Result = ValueIsTextline(Value) ? Value : Default;
    return (Result == null
        ? undefined
        : Result.replace(/[\f\r\n\v\u0085\u2028\u2029].*$/, '...'));
}
/**** acceptableFunction ****/
export function acceptableFunction(Value, Default) {
    return (ValueIsFunction(Value) ? Value : Default);
}
/**** acceptableOptionalFunction ****/
export function acceptableOptionalFunction(Value, Default) {
    return (ValueIsFunction(Value) ? Value : Default);
}
/**** acceptableList ****/
export function acceptableList(Value, Default) {
    return (ValueIsList(Value) ? Value : Default);
}
/**** acceptableOptionalList ****/
export function acceptableOptionalList(Value, Default) {
    return (ValueIsList(Value) ? Value : Default);
}
/**** acceptableListSatisfying ****/
export function acceptableListSatisfying(Value, Default, Matcher) {
    return (ValueIsListSatisfying(Value, Matcher) ? Value : Default);
}
/**** acceptableOptionalListSatisfying ****/
export function acceptableOptionalListSatisfying(Value, Default, Matcher) {
    return (ValueIsListSatisfying(Value, Matcher) ? Value : Default);
}
/**** acceptableOneOf ****/
export function acceptableOneOf(Value, Default, ValueList) {
    return (ValueIsOneOf(Value, ValueList) ? Value : Default);
}
/**** acceptableOptionalOneOf ****/
export function acceptableOptionalOneOf(Value, ValueList) {
    return (ValueIsOneOf(Value, ValueList) ? Value : undefined);
}
/**** acceptableColor ****/
export function acceptableColor(Value, Default) {
    return (ValueIsColor(Value) ? Value : Default);
}
/**** acceptableOptionalColor ****/
export function acceptableOptionalColor(Value, Default) {
    return (ValueIsColor(Value) ? Value : Default);
}
/**** acceptableEMailAddress ****/
export function acceptableEMailAddress(Value, Default) {
    return (ValueIsEMailAddress(Value) ? Value : Default);
}
/**** acceptablePhoneNumber ****/
export function acceptablePhoneNumber(Value, Default) {
    return ( /*ValueIsPhoneNumber*/ValueIsTextline(Value) ? Value : Default);
}
/**** acceptableURL ****/
export function acceptableURL(Value, Default) {
    return (ValueIsURL(Value) ? Value : Default);
}
/**** acceptableName ****/
export function acceptableName(Value, Default) {
    return (ValueIsName(Value) ? Value : Default);
}
/**** acceptableOptionalName ****/
export function acceptableOptionalName(Value) {
    return (ValueIsName(Value) ? Value : undefined);
}
/**** acceptablePath ****/
export function acceptablePath(Value, Default) {
    return (ValueIsPath(Value) ? Value : Default);
}
/**** acceptableOptionalPath ****/
export function acceptableOptionalPath(Value) {
    return (ValueIsPath(Value) ? Value : undefined);
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
}
//------------------------------------------------------------------------------
//--                              Error Handling                              --
//------------------------------------------------------------------------------
/**** setErrorReport ****/
function setErrorReport(Visual, ErrorReport) {
    expectVisual('visual', Visual);
    allowErrorReport('error report', ErrorReport);
    if (ValuesDiffer(Visual.ErrorReport, ErrorReport)) {
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
    let { onlyFrom, neverFrom, ClickRadius, MultiClickLimit, MultiClickTimeSpan, primaryLongPressDelay, secondaryLongPressDelay, onClick, onDblClick, onMultiClick, onLongPressIndication, onLongPress, onDragStart, onDragContinuation, onDragFinish, onDragAbortion, } = OptionSet;
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
    allowFunction('"onDragAbortion" callback', onDragAbortion);
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
        (onDragFinish != null) && (onDragAbortion != null));
    /**** Working Variables ****/
    let Status = '', StartX = 0, StartY = 0;
    let curEvent, curX, curY;
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
        if (Event.buttons !== 1) { // only handle events for primary button
            if (Status !== '') {
                onPointerCancel(Event);
            }
            return;
        }
        // @ts-ignore TS18047,TS2339 allow "Event.target.setPointerCapture"
        Event.target.setPointerCapture(Event.pointerId);
        Event.stopPropagation(); // consume event
        Event.preventDefault();
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
                if (LongPressState !== 'preparing') {
                    call(onLongPressIndication, [false, Event, curX, curY, StartX, StartY]);
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
    }
    /**** onPointerCancel ****/
    function onPointerCancel(Event) {
        if (Status === '') {
            return;
        } // recognizer is not active yet
        Event.stopPropagation(); // consume event
        Event.preventDefault();
        ({ clientX: curX, clientY: curY } = curEvent = Event);
        if (Status === 'moving') {
            call(onDragAbortion, [curX - StartX, curY - StartY, StartX, StartY, Event]);
        }
        Status = '';
        lastClickCount = lastClickTime = 0;
        /**** cancel any long-press preparations ****/
        if (LongPressTimer != null) {
            clearTimeout(LongPressTimer);
        }
        if (LongPressState !== 'preparing') {
            call(onLongPressIndication, [false, curX, curY, StartX, StartY, Event]);
        }
        LongPressState = '';
        LongPressTimer = undefined;
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
//------------------------------------------------------------------------------
//--                                WAT_Visual                                --
//------------------------------------------------------------------------------
export class WAT_Visual {
    constructor(Container) {
        Object.defineProperty(this, "_Container", {
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
        /**** Value ****/
        Object.defineProperty(this, "_Value", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**** onValueChange ****/
        Object.defineProperty(this, "_onValueChange", {
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
        /**** Renderer ****/
        Object.defineProperty(this, "_Renderer", {
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
        /**** onMount ****/
        Object.defineProperty(this, "_onMount", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**** onUnmount ****/
        Object.defineProperty(this, "_onUnmount", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this._Container = Container;
    }
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
    /**** Path - to be overwritten ****/
    // @ts-ignore TS2378 this getter throws
    get Path() { throwError('InternalError: "Path" has to be overwritten'); }
    set Path(_) { throwReadOnlyError('Path'); }
    /**** isAttached ****/
    // @ts-ignore TS2378 this getter throws
    get isAttached() { throwError('InternalError: "isAttached" has to be overwritten'); }
    set isAttached(_) { throwReadOnlyError('isAttached'); }
    /**** configure ****/
    configure(OptionSet) {
        expectPlainObject('options set', OptionSet);
        for (const Key in OptionSet) {
            if (OptionSet.hasOwnProperty(Key)) {
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
            : this._TextShadow);
    }
    set TextShadow(newTextShadow) {
        allowTextShadow('text shadow', newTextShadow);
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
        allowOneOf('cursor name', newCursor, WAT_Cursors);
        if ((newCursor || '').trim() === '') {
            newCursor = undefined;
        }
        if (this._Cursor !== newCursor) {
            this._Cursor = newCursor;
            this.rerender();
        }
    }
    get Value() { return this._Value; }
    set Value(newValue) {
        allowSerializableValue('value', newValue);
        if (ValuesDiffer(this._Value, newValue)) {
            this._Value = newValue; // *C* a deep copy may be better
            if (this._onValueChange != null) {
                this._onValueChange_();
            } // no typo!
            this.rerender();
        }
    }
    get onValueChange() { return this._onValueChange_; }
    set onValueChange(newCallback) {
        allowFunction('"onValueChange" callback', newCallback);
        this._onValueChange = newCallback;
    }
    _onValueChange_(...ArgList) {
        if ((ArgList.length === 1) && (typeof ArgList[0] === 'function')) {
            this._onValueChange = ArgList[0];
        }
        else { // callback invocation
            try {
                if (this._onValueChange != null) {
                    this._onValueChange.apply(this, ArgList);
                }
            }
            catch (Signal) {
                console.warn('"onValueChange" Callback Failure', Signal);
                setErrorReport(this, {
                    Type: '"onValueChange" Callback Failure',
                    Sufferer: this, Message: '' + Signal, Cause: Signal
                });
            }
        }
    }
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
    /**** activateScript - even if underlying applet is not (yet) attached ****/
    async activateScript(Mode = 'catch-exception') {
        let activeScript = (this._activeScript || '').trim();
        //    this._Renderer = () => '' // not without behaviors!
        unregisterAllReactiveFunctionsFrom(this);
        /**** prepare for script execution ****/
        const reactively = (reactiveFunction) => {
            expectFunction('reactive function', reactiveFunction);
            // @ts-ignore TS2345 do not care about the specific signature of "reactiveFunction"
            registerReactiveFunctionIn(this, computed(() => {
                try {
                    reactiveFunction();
                }
                catch (Signal) {
                    console.warn('execution error in reactive function', Signal);
                    setErrorReport(this, {
                        Type: 'execution error in reactive function',
                        Sufferer: this, Message: '' + Signal, Cause: Signal
                    });
                }
            }));
        };
        const onRender = this._onRender_.bind(this);
        const onMount = this._onMount_.bind(this);
        const onUnmount = this._onUnmount_.bind(this);
        const onValueChange = this._onValueChange_.bind(this);
        /**** compile and run the script ****/
        this._ErrorReport = undefined;
        this._ScriptError = undefined; // only to be set by "applyPendingScript"
        let compiledScript;
        try {
            // @ts-ignore TS2351 AsyncFunction *is* constructible
            compiledScript = new AsyncFunction('me,my, html,reactively, onRender,onMount,onUnmount,onValueChange', activeScript);
        }
        catch (Signal) {
            console.warn('Script Compilation Failure', Signal);
            setErrorReport(this, {
                Type: 'Script Compilation Failure',
                Sufferer: this, Message: '' + Signal, Cause: Signal
            });
            return;
        }
        try {
            await compiledScript.call(this, this, this, html, reactively, onRender, onMount, onUnmount, onValueChange);
        }
        catch (Signal) {
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
        if (!this.isAttached) {
            return;
        } // consider attached applets only
        let activeScript = this._activeScript || '';
        let pendingScript = this._pendingScript || '';
        if (activeScript === pendingScript) {
            return;
        }
        if (pendingScript.trim() !== '') {
            let compiledScript; // try compiling pending script first
            try {
                // @ts-ignore TS2351 AsyncFunction *is* constructible
                compiledScript = new AsyncFunction('me,my, html,reactively, onRender,onMount,onUnmount,onValueChange', pendingScript);
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
        this._activeScript = pendingScript.trim();
        this._pendingScript = undefined;
        this._ScriptError = undefined;
        try {
            await this.activateScript('rethrow-exception');
        }
        catch (Signal) {
            setScriptError(this, {
                Type: 'Script Execution Failure',
                Sufferer: this, Message: '' + Signal, Cause: Signal
            });
            this.rerender();
            return;
        }
        this.rerender();
    }
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
    get Renderer() { return this._Renderer; }
    set Renderer(newRenderer) {
        allowFunction('renderer', newRenderer);
        if (newRenderer == null) {
            newRenderer = () => '';
        }
        this._Renderer = () => {
            try {
                newRenderer.call(this);
            }
            catch (Signal) {
                console.warn('Rendering Failure', Signal);
                setErrorReport(this, {
                    Type: 'Rendering Failure',
                    Sufferer: this, Message: '' + Signal, Cause: Signal
                });
            }
        };
        this.rerender();
    }
    /**** onRender ****/
    get onRender() { return this._onRender_; }
    set onRender(newCallback) {
        allowFunction('rendering callback', newCallback);
        this._Renderer = newCallback;
    }
    _onRender_(newCallback) {
        if (newCallback == null) { // callback invocation
            try {
                if (this._Renderer != null) {
                    this._Renderer.call(this);
                }
            }
            catch (Signal) {
                console.warn('Rendering Callback Failure', Signal);
                setErrorReport(this, {
                    Type: 'Rendering Callback Failure',
                    Sufferer: this, Message: '' + Signal, Cause: Signal
                });
            }
        }
        else { // definition invocation
            this._Renderer = newCallback;
        }
    }
    /**** Rendering - generates the rendering for this widget ****/
    Rendering() {
        let Renderer = this._Renderer;
        if (Renderer == null) {
            return '';
        }
        try {
            return Renderer.call(this);
        }
        catch (Signal) {
            console.error('Rendering Failure', Signal);
        }
    }
    /**** CSSStyle ****/
    get CSSStyle() {
        let CSSStyleList = [];
        const { FontFamily, FontSize, FontWeight, FontStyle, TextDecoration, TextShadow, TextAlignment, LineHeight, ForegroundColor, hasBackground, BackgroundColor, BackgroundTexture, Opacity, Cursor } = this;
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
                    CSSStyleList.push(`background-image:url(${ImageURL})`, `background-position:${Math.round(xOffset)}px ${Math.round(yOffset)}px;` +
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
        return (CSSStyleList.length === 0 ? '' : CSSStyleList.join(';') + ';');
    }
    set CSSStyle(_) { throwReadOnlyError('CSSStyle'); }
    get View() { return this._View; }
    set View(_) { throwReadOnlyError('View'); }
    /**** isMounted ****/
    get isMounted() { return (this._View != null); }
    set isMounted(_) { throwReadOnlyError('isMounted'); }
    get onMount() { return this._onMount_; }
    set onMount(newCallback) {
        allowFunction('"onMount" callback', newCallback);
        this._onMount = newCallback;
    }
    _onMount_(...ArgList) {
        if ((ArgList.length === 1) && (typeof ArgList[0] === 'function')) {
            this._onMount = ArgList[0];
            if (this.isMounted) {
                this._onMount_();
            }
        }
        else { // callback invocation
            try {
                if (this._onMount != null) {
                    this._onMount.apply(this, ArgList);
                }
            }
            catch (Signal) {
                console.warn('"onMount" Callback Failure', Signal);
                setErrorReport(this, {
                    Type: '"onMount" Callback Failure',
                    Sufferer: this, Message: '' + Signal, Cause: Signal
                });
            }
        }
    }
    get onUnmount() { return this._onUnmount_; }
    set onUnmount(newCallback) {
        allowFunction('"onUnmount" callback', newCallback);
        this._onUnmount = newCallback;
    }
    _onUnmount_(...ArgList) {
        if ((ArgList.length === 1) && (typeof ArgList[0] === 'function')) {
            this._onUnmount = ArgList[0];
            //      if (! this.isMounted) { this._onUnmount_() } // no! this would be wrong!
        }
        else { // callback invocation
            try {
                if (this._onUnmount != null) {
                    this._onUnmount.apply(this, ArgList);
                }
            }
            catch (Signal) {
                console.warn('"onUnmount" Callback Failure', Signal);
                setErrorReport(this, {
                    Type: '"onUnmount" Callback Failure',
                    Sufferer: this, Message: '' + Signal, Cause: Signal
                });
            }
        }
    }
    /**** _serializeConfigurationInto ****/
    _serializeConfigurationInto(Serialization) {
        if (this._Value != null) { // test serializability of "Value" first
            try {
                JSON.stringify(this._Value);
            }
            catch (Signal) {
                throwError('NotSerializable: cannot serialize "Value" of visual ' +
                    quoted(this.Path));
            }
        }
        if (this._memoized != null) { // test serializability of "memoized" as well
            try {
                JSON.stringify(this._memoized);
            }
            catch (Signal) {
                throwError('NotSerializable: cannot serialize "memoized" of visual ' +
                    quoted(this.Path));
            }
        }
        /**** then perform the actual serialization ****/
        ;
        [
            'Name',
            'FontFamily', 'FontSize', 'FontWeight', 'FontStyle',
            'TextDecoration', 'TextShadow', 'TextAlignment', 'LineHeight',
            'ForegroundColor', 'hasBackground', 'BackgroundColor', 'BackgroundTexture',
            'BorderWidths', 'BorderStyles', 'BorderColors', 'BorderRadii', 'BoxShadow',
            'Opacity', 'OverflowVisibility', 'Cursor',
            'activeScript', 'pendingScript',
            'memoized', 'Value',
        ].forEach((Name) => this._serializePropertyInto(Name, Serialization));
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
            'Name',
            'FontFamily', 'FontSize', 'FontWeight', 'FontStyle',
            'TextDecoration', 'TextShadow', 'TextAlignment', 'LineHeight',
            'ForegroundColor', 'hasBackground', 'BackgroundColor', 'BackgroundTexture',
            'BorderWidths', 'BorderStyles', 'BorderColors', 'BorderRadii', 'BoxShadow',
            'Opacity', 'OverflowVisibility', 'Cursor',
            /*'activeScript',*/ 'pendingScript',
            'Value',
        ].forEach((Name) => deserializeProperty(Name));
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
            this.activateScript(); // in "creation" order, i.e.,
        } // pages and widgets will already be attached, applets may not
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
    constructor() {
        super(undefined);
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
        /**** DialogNamed ****/
        Object.defineProperty(this, "_DialogList", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
    }
    /**** Name ****/
    get Name() { return this._Name; }
    set Name(newName) { throwReadOnlyError('Name'); }
    /**** Path - to be overwritten ****/
    get Path() { return '/'; }
    set Path(_) { throwReadOnlyError('Path'); }
    /**** isAttached ****/
    get isAttached() { return (this._View != null); }
    set isAttached(_) { throwReadOnlyError('isAttached'); }
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
        if (visitedPage != null) {
            if (visitedPage._View == null) {
                return undefined;
            }
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
                    const WidgetsToShow = (SourceWidget.Type === 'Outline'
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
        /**** scan all shown widgets on all currently open dialogs ****/
        this._DialogList.forEach((Dialog) => {
            if (Dialog._View == null) {
                return undefined;
            }
            const SourceWidget = this.WidgetAtPath(Dialog.SourceWidgetPath);
            if (SourceWidget == null) {
                return;
            }
            const WidgetsToShow = (SourceWidget.Type === 'Outline'
                ? SourceWidget.bundledWidgets()
                : [SourceWidget]).filter((Widget) => (Widget.isVisible && ((Widget._Pane == null) || (Widget._Pane === Dialog))));
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
    set toBeCentered(_) { throwReadOnlyError('toBeCentered'); }
    get withMobileFrame() { return this._withMobileFrame; }
    set withMobileFrame(_) { throwReadOnlyError('withMobileFrame'); }
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
    newPageAt(Index) {
        return this.PageDeserializedAt({}, Index);
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
        let newPage = new WAT_Page(this);
        this._PageList.splice(Index, 0, newPage);
        // @ts-ignore TS2446 allow WAT_Applet to access a protected member of WAT_Page
        newPage._deserializeConfigurationFrom(Serialization);
        // @ts-ignore TS2446 allow WAT_Applet to access a protected member of WAT_Page
        newPage._deserializeWidgetsFrom(Serialization);
        this.rerender();
        return newPage;
    }
    /**** DuplicateOfPageAt ****/
    DuplicateOfPageAt(Index) {
        expectInteger('page index', Index);
        const Page = this.existingPage(Index); // DRY
        return this.PageDeserializedAt(Page.Serialization, Index + 1);
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
        if (newIndex > oldIndex) {
            newIndex -= 1;
        }
        this._PageList.splice(oldIndex, 1);
        this._PageList.splice(newIndex, 0, Page);
        this.rerender();
    }
    /**** shiftPagesTo (for Designer only, less strict argument validations) ****/
    shiftPagesTo(PageList, newIndexList) {
        const IndexSet = [];
        newIndexList.forEach((Index, i) => IndexSet[Index] = PageList[i]);
        newIndexList = newIndexList.slice().sort();
        PageList.forEach((Page) => {
            const Index = this._PageList.indexOf(Page);
            this._PageList.splice(Index, 1);
        });
        newIndexList.forEach((newIndex) => {
            this._PageList.splice(newIndex, 0, IndexSet[newIndex]);
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
                return parseInt(PathItem.slice(1), 10);
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
    DialogNamed(DialogName) {
        const DialogIndex = this.IndexOfDialog(DialogName);
        return this._DialogList[DialogIndex]; // even if DialogIndex = -1
    }
    /**** existingDialogNamed ****/
    existingDialogNamed(DialogName) {
        const DialogIndex = this.IndexOfDialog(DialogName);
        if (DialogIndex < 0)
            throwError(`NotFound: no dialog named ${quoted(DialogName)} found`);
        return this._DialogList[DialogIndex];
    }
    /**** IndexOfDialog ****/
    IndexOfDialog(DialogName) {
        expectName('dialog name', DialogName);
        const normalizedName = DialogName.toLowerCase();
        return this._DialogList.findIndex((Dialog) => Dialog.normalizedName === normalizedName);
    }
    /**** openDialog ****/
    openDialog(Descriptor) {
        expectPlainObject('dialog descriptor', Descriptor);
        expectName('dialog name', Descriptor.Name);
        allowTextline('dialog title', Descriptor.Title);
        allowBoolean('dialog modality', Descriptor.isModal);
        allowBoolean('dialog closability', Descriptor.isClosable);
        allowBoolean('dialog draggability', Descriptor.isDraggable);
        allowBoolean('dialog resizability', Descriptor.isResizable);
        allowLocation('dialog x coordinate', Descriptor.x);
        allowLocation('dialog y coordinate', Descriptor.y);
        allowDimension('dialog width', Descriptor.Width);
        allowDimension('dialog height', Descriptor.Height);
        allowDimension('minimal dialog width', Descriptor.minWidth);
        allowDimension('maximal dialog width', Descriptor.maxWidth);
        allowDimension('minimal dialog height', Descriptor.minHeight);
        allowDimension('maximal dialog height', Descriptor.maxHeight);
        allowFunction('"onOpen" callback', Descriptor.onOpen);
        allowFunction('"onClose" callback', Descriptor.onClose);
        let { Name, Title, isModal, isClosable, isDraggable, isResizable, x, y, Width, Height, minWidth, maxWidth, minHeight, maxHeight, onOpen, onClose } = Descriptor;
        if (this.DialogIsOpen(Descriptor.Name))
            throwError(`AlreadyOpen: a dialog named ${quoted(Descriptor.Name)} is already open`);
        if (isModal == null) {
            isModal = false;
        }
        if (isClosable == null) {
            isClosable = true;
        }
        if (isDraggable == null) {
            isDraggable = true;
        }
        if (isResizable == null) {
            isResizable = false;
        }
        if (Title == null) {
            if (isClosable || isDraggable) {
                Title = Name;
            }
        }
        if (minWidth == null) {
            minWidth = 0;
        }
        if (minHeight == null) {
            minHeight = 0;
        }
        let SourceWidget, SourceWidgetPath;
        switch (true) {
            case null:
            case undefined:
                throwError('MissingArgument: no source widget path given');
            case ValueIsPath(Descriptor.SourceWidget):
                SourceWidgetPath = Descriptor.SourceWidget;
                SourceWidget = this.WidgetAtPath(SourceWidgetPath);
                if (SourceWidget == null)
                    throwError(`NoSuchWidget: no widget at path ${quoted(Descriptor.SourceWidget)} found`);
                break;
            case ValueIsWidget(Descriptor.SourceWidget):
                SourceWidget = Descriptor.SourceWidget;
                SourceWidgetPath = SourceWidget.Path;
            default:
                throwError('InvalidArgument: the given source widget is neither a widget ' +
                    'nor a widget path');
        }
        if ((Width == null) || (Height == null)) {
            let SourceGeometry = SourceWidget.Geometry;
            if (Width == null) {
                Width = SourceGeometry.Width;
            }
            if (Height == null) {
                Height = SourceGeometry.Height;
            }
        }
        if (isClosable) {
            minWidth = Math.max(30 + 10, minWidth);
        }
        if ((Title != null) || isClosable || isDraggable) {
            Height += 30;
            minHeight += 30;
        }
        if (isResizable) {
            Height += 10;
            minHeight += 10;
        }
        Width = Math.max(minWidth || 0, Math.min(Width, maxWidth || Infinity));
        Height = Math.max(minHeight || 0, Math.min(Height, maxHeight || Infinity));
        if (x == null) {
            x = (this.Width - Width) / 2;
        }
        if (y == null) {
            y = (this.Height - Height) / 2;
        }
        x = Math.max(0, Math.min(x, this.Width - Width));
        y = Math.max(0, Math.min(y, this.Height - Height));
        const Dialog = {
            Name, normalizedName: Name.toLowerCase(), SourceWidgetPath,
            Title, isModal, isClosable, isDraggable, isResizable,
            x, y, Width, Height, minWidth, maxWidth, minHeight, maxHeight,
            onOpen, onClose
        };
        this._DialogList.push(Dialog);
        this.rerender();
        if (Dialog.onOpen != null) {
            Dialog.onOpen(Dialog);
        }
    }
    /**** closeDialog ****/
    closeDialog(DialogName) {
        const DialogIndex = this.IndexOfDialog(DialogName);
        if (DialogIndex < 0) {
            return;
        }
        const [Dialog] = this._DialogList.splice(DialogIndex, 1);
        this.rerender();
        if (Dialog.onClose != null) {
            Dialog.onClose(Dialog);
        }
    }
    /**** closeAllDialogs ****/
    closeAllDialogs() {
        if (this._DialogList.length > 0) {
            this._DialogList.forEach((Dialog) => this.closeDialog(Dialog.Name));
        }
    }
    /**** DialogIsOpen ****/
    DialogIsOpen(DialogName) {
        return (this.DialogNamed(DialogName) != null);
    }
    /**** openDialogs ****/
    openDialogs() {
        return this._DialogList.map((Dialog) => Dialog.Name);
    }
    /**** GeometryOfDialog ****/
    GeometryOfDialog(DialogName) {
        const Dialog = this.existingDialogNamed(DialogName);
        const { x, y, Width, Height } = Dialog;
        return { x, y, Width, Height };
    }
    /**** moveDialogBy ****/
    moveDialogBy(DialogName, dx, dy) {
        const Dialog = this.existingDialogNamed(DialogName);
        expectNumber('dx', dx);
        expectNumber('dy', dy);
        this.moveDialogTo(DialogName, Dialog.x + dx, Dialog.y + dy); // DRY
    }
    /**** moveDialogTo ****/
    moveDialogTo(DialogName, x, y) {
        const Dialog = this.existingDialogNamed(DialogName);
        expectLocation('x coordinate', x);
        expectLocation('y coordinate', y);
        Dialog.x = x;
        Dialog.y = y;
        this.rerender();
    }
    /**** sizeDialogBy ****/
    sizeDialogBy(DialogName, dW, dH) {
        const Dialog = this.existingDialogNamed(DialogName);
        expectNumber('dW', dW);
        expectNumber('dH', dH);
        this.sizeDialogTo(DialogName, Dialog.Width + dW, Dialog.Height + dH); // DRY
    }
    /**** sizeDialogTo ****/
    sizeDialogTo(DialogName, Width, Height) {
        const Dialog = this.existingDialogNamed(DialogName);
        expectDimension('Width', Width);
        expectDimension('Height', Height);
        Dialog.Width = Math.max(Dialog.minWidth || 0, Math.min(Width, Dialog.maxWidth || Infinity));
        Dialog.Height = Math.max(Dialog.minHeight || 0, Math.min(Height, Dialog.maxHeight || Infinity));
        this.rerender();
    }
    /**** bringDialogToFront ****/
    bringDialogToFront(DialogName) {
        const Index = this.IndexOfDialog(DialogName);
        if (Index < 0)
            throwError(`NotFound: no dialog named ${quoted(DialogName)} found`);
        const [Dialog] = this._DialogList.splice(Index, 1);
        this._DialogList.push(Dialog);
        this.rerender();
    }
    /**** Serialization ****/
    get Serialization() {
        const Result = {};
        this._serializeConfigurationInto(Result);
        this._serializePagesInto(Result);
        return Result;
    }
    set Serialization(_) { throwReadOnlyError('Serialization'); }
    /**** _serializePagesInto ****/
    _serializePagesInto(Serialization) {
        const PageList = this._PageList;
        if (PageList.length > 0) {
            Serialization.PageList = PageList.map((Page) => Page.Serialization);
        }
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
        ;
        [
            'Width', 'Height',
            'minWidth', 'minHeight', 'maxWidth', 'maxHeight',
            'toBeCentered', 'withMobileFrame', 'expectedOrientation',
        ].forEach((Name) => this._serializePropertyInto(Name, Serialization));
    }
    /**** _deserializeConfigurationFrom ****/
    _deserializeConfigurationFrom(Serialization) {
        //    delete Serialization.Name                // do not deserialize applet name
        super._deserializeConfigurationFrom(Serialization);
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
            'Name',
            'SnapToGrid', 'GridWidth', 'GridHeight',
            'HeadExtensions',
        ].forEach((Name) => deserializeProperty(Name));
        /**** additional properties used by the "WAT Applet Manager" ****/
        if (ValueIsBoolean(Serialization.toBeCentered)) {
            this._toBeCentered = Serialization.toBeCentered;
        }
        if (ValueIsOrdinal(Serialization.minWidth)) {
            this._minWidth = Serialization.minWidth;
        }
        if (ValueIsOrdinal(Serialization.minHeight)) {
            this._minHeight = Serialization.minHeight;
        }
        if (ValueIsOrdinal(Serialization.maxWidth)) {
            this._maxWidth = Serialization.maxWidth;
        }
        if (ValueIsOrdinal(Serialization.maxHeight)) {
            this._maxHeight = Serialization.maxHeight;
        }
        if (ValueIsBoolean(Serialization.withMobileFrame)) {
            this._withMobileFrame = Serialization.withMobileFrame;
        }
        if (ValueIsOneOf(Serialization.expectedOrientation, WAT_Orientations)) {
            this._expectedOrientation = Serialization.expectedOrientation;
        }
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
        const Applet = new WAT_Applet();
        const AppletName = Serialization.Name;
        delete Serialization.Name;
        Applet._deserializeConfigurationFrom(Serialization);
        Applet._deserializePagesFrom(Serialization);
        if (ValueIsName(AppletName)) {
            Applet._Name = AppletName;
        }
        return Applet;
    }
    /**** preserve ****/
    async preserve() {
        await AppletStore.setItem(this.Name, JSON.stringify(this.Serialization));
    }
    /**** replaceWith ****/
    replaceWith(Serialization) {
        const AppletView = this._View;
        delete this._View;
        const AppletName = this._Name;
        delete Serialization.Name;
        this.clear();
        this._deserializeConfigurationFrom(Serialization);
        this._deserializePagesFrom(Serialization);
        this._Name = AppletName;
        this._View = AppletView;
        if (this._onMount != null) {
            this._onMount_();
        } // no typo!
        if (this.visitedPage == null) {
            this.visitPage(this.PageList[0]);
        }
        this.rerender();
    }
}
//------------------------------------------------------------------------------
//--                                 WAT_Page                                 --
//------------------------------------------------------------------------------
export class WAT_Page extends WAT_Visual {
    constructor(Applet) {
        super(Applet);
        /**** WidgetList ****/
        Object.defineProperty(this, "_WidgetList", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
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
                const Index = WidgetOrNameOrIndex;
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
    newWidgetAt(Type = 'plainWidget', Index) {
        return this.WidgetDeserializedAt(Type, {}, Index);
    }
    /**** WidgetDeserializedAt ****/
    WidgetDeserializedAt(Type = 'plainWidget', Serialization, Index) {
        expectWidgetType('widget type', Type);
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
        let newWidget = newWidgetOfType(Type, this);
        this._WidgetList.splice(Index, 0, newWidget);
        // @ts-ignore TS2446 allow WAT_Page to access a protected member of WAT_Widget
        newWidget._deserializeConfigurationFrom(Serialization);
        this.rerender();
        return newWidget;
    }
    /**** DuplicateOfWidgetAt ****/
    DuplicateOfWidgetAt(Index) {
        expectInteger('widget index', Index);
        const Widget = this.existingWidget(Index); // DRY
        return this.WidgetDeserializedAt(Widget.Type, Widget.Serialization, Index);
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
        if (newIndex > oldIndex) {
            newIndex -= 1;
        }
        this._WidgetList.splice(oldIndex, 1);
        this._WidgetList.splice(newIndex, 0, Widget);
        this.rerender();
    }
    /**** shiftWidgetsTo (for Designer only, less strict argument validations) ****/
    shiftWidgetsTo(WidgetList, newIndexList) {
        const IndexSet = [];
        newIndexList.forEach((Index, i) => IndexSet[Index] = WidgetList[i]);
        newIndexList = newIndexList.slice().sort();
        WidgetList.forEach((Widget) => {
            const Index = this._WidgetList.indexOf(Widget);
            this._WidgetList.splice(Index, 1);
        });
        newIndexList.forEach((newIndex) => {
            this._WidgetList.splice(newIndex, 0, IndexSet[newIndex]);
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
        const oldIndex = this._WidgetList.indexOf(Widget);
        this._WidgetList.splice(oldIndex, 1);
        // @ts-ignore TS2446 allow accessing protected member
        Widget._Container = undefined;
        this.rerender();
    }
    /**** clear ****/
    clear() {
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
        const WidgetList = this._WidgetList;
        if (WidgetList.length > 0) {
            Serialization.WidgetList = WidgetList.map((Widget) => Widget.Serialization);
        }
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
            if (!ValueIsWidgetType(WidgetSerialization.Type)) {
                console.warn('DeserializationError: invalid widget type ' +
                    quoted('' + WidgetSerialization.Type) + ' in "WidgetList" entry #' +
                    Index);
                return;
            }
            this.WidgetDeserializedAt(WidgetSerialization.Type, WidgetSerialization, Index);
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
    constructor(Page) {
        super(Page);
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
        /**** OverflowVisibility - not inheritable ****/
        Object.defineProperty(this, "_OverflowVisibility", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**** onFocus ****/
        Object.defineProperty(this, "_onFocus", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**** onBlur ****/
        Object.defineProperty(this, "_onBlur", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**** onClick ****/
        Object.defineProperty(this, "_onClick", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**** onDblClick ****/
        Object.defineProperty(this, "_onDblClick", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**** onInput ****/
        Object.defineProperty(this, "_onInput", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**** onDrop ****/
        Object.defineProperty(this, "_onDrop", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**** onDropError ****/
        Object.defineProperty(this, "_onDropError", {
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
            value: [0, 20, 0, 20]
        });
        /**** OverlayNamed ****/
        Object.defineProperty(this, "_OverlayList", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
    }
    // avoids multiple renderings atdifferent places
    /**** Type ****/
    // @ts-ignore TS2378 this getter throws
    get Type() { throwError('InternalError: "Type" has to be overwritten'); }
    set Type(_) { throwReadOnlyError('Type'); }
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
            case ValueIsListSatisfying(newBorderStyles, (Value) => (Value == null) || ValueIsOneOf(Value, WAT_BorderStyles)):
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
            case ValueIsListSatisfying(newBorderColors, (Value) => (Value == null) || ValueIsColor(Value)):
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
    get OverflowVisibility() {
        return this._OverflowVisibility;
    }
    set OverflowVisibility(newOverflowVisibility) {
        allowBoolean('widget overflow visibility', newOverflowVisibility);
        if (this._OverflowVisibility !== newOverflowVisibility) {
            this._OverflowVisibility = newOverflowVisibility;
            this.rerender();
        }
    }
    get onFocus() { return this._onFocus_; }
    set onFocus(newCallback) {
        allowFunction('"onFocus" callback', newCallback);
        this._onFocus = newCallback;
    }
    _onFocus_(...ArgList) {
        if ((ArgList.length === 1) && (typeof ArgList[0] === 'function')) {
            this._onFocus = ArgList[0];
        }
        else { // callback invocation
            try {
                if (this._onFocus != null) {
                    this._onFocus.apply(this, ArgList);
                }
            }
            catch (Signal) {
                console.warn('"onFocus" Callback Failure', Signal);
                setErrorReport(this, {
                    Type: '"onFocus" Callback Failure',
                    Sufferer: this, Message: '' + Signal, Cause: Signal
                });
            }
        }
    }
    get onBlur() { return this._onBlur_; }
    set onBlur(newCallback) {
        allowFunction('"onBlur" callback', newCallback);
        this._onBlur = newCallback;
    }
    _onBlur_(...ArgList) {
        if ((ArgList.length === 1) && (typeof ArgList[0] === 'function')) {
            this._onBlur = ArgList[0];
        }
        else { // callback invocation
            try {
                if (this._onBlur != null) {
                    this._onBlur.apply(this, ArgList);
                }
            }
            catch (Signal) {
                console.warn('"onBlur" Callback Failure', Signal);
                setErrorReport(this, {
                    Type: '"onBlur" Callback Failure',
                    Sufferer: this, Message: '' + Signal, Cause: Signal
                });
            }
        }
    }
    get onClick() { return this._onClick_; }
    set onClick(newCallback) {
        allowFunction('"onClick" callback', newCallback);
        this._onClick = newCallback;
    }
    _onClick_(...ArgList) {
        if ((ArgList.length === 1) && (typeof ArgList[0] === 'function')) {
            this._onClick = ArgList[0];
        }
        else { // callback invocation
            try {
                if (this._onClick != null) {
                    this._onClick.apply(this, ArgList);
                }
            }
            catch (Signal) {
                console.warn('"onClick" Callback Failure', Signal);
                setErrorReport(this, {
                    Type: '"onClick" Callback Failure',
                    Sufferer: this, Message: '' + Signal, Cause: Signal
                });
            }
        }
    }
    get onDblClick() { return this._onDblClick_; }
    set onDblClick(newCallback) {
        allowFunction('"onDblClick" callback', newCallback);
        this._onDblClick = newCallback;
    }
    _onDblClick_(...ArgList) {
        if ((ArgList.length === 1) && (typeof ArgList[0] === 'function')) {
            this._onDblClick = ArgList[0];
        }
        else { // callback invocation
            try {
                if (this._onDblClick != null) {
                    this._onDblClick.apply(this, ArgList);
                }
            }
            catch (Signal) {
                console.warn('"onDblClick" Callback Failure', Signal);
                setErrorReport(this, {
                    Type: '"onDblClick" Callback Failure',
                    Sufferer: this, Message: '' + Signal, Cause: Signal
                });
            }
        }
    }
    get onInput() { return this._onInput_; }
    set onInput(newCallback) {
        allowFunction('"onInput" callback', newCallback);
        this._onInput = newCallback;
    }
    _onInput_(...ArgList) {
        if ((ArgList.length === 1) && (typeof ArgList[0] === 'function')) {
            this._onInput = ArgList[0];
        }
        else { // callback invocation
            try {
                if (this._onInput != null) {
                    this._onInput.apply(this, ArgList);
                }
            }
            catch (Signal) {
                console.warn('"onInput" Callback Failure', Signal);
                setErrorReport(this, {
                    Type: '"onInput" Callback Failure',
                    Sufferer: this, Message: '' + Signal, Cause: Signal
                });
            }
        }
    }
    get onDrop() { return this._onDrop_; }
    set onDrop(newCallback) {
        allowFunction('"onDrop" callback', newCallback);
        this._onDrop = newCallback;
    }
    _onDrop_(...ArgList) {
        if ((ArgList.length === 1) && (typeof ArgList[0] === 'function')) {
            this._onDrop = ArgList[0];
        }
        else { // callback invocation
            try {
                if (this._onDrop != null) {
                    this._onDrop.apply(this, ArgList);
                }
            }
            catch (Signal) {
                console.warn('"onDrop" Callback Failure', Signal);
                setErrorReport(this, {
                    Type: '"onDrop" Callback Failure',
                    Sufferer: this, Message: '' + Signal, Cause: Signal
                });
            }
        }
    }
    get onDropError() { return this._onDropError_; }
    set onDropError(newCallback) {
        allowFunction('"onDropError" callback', newCallback);
        this._onDropError = newCallback;
    }
    _onDropError_(...ArgList) {
        if ((ArgList.length === 1) && (typeof ArgList[0] === 'function')) {
            this._onDropError = ArgList[0];
        }
        else { // callback invocation
            try {
                if (this._onDropError != null) {
                    this._onDropError.apply(this, ArgList);
                }
            }
            catch (Signal) {
                console.warn('"onDropError" Callback Failure', Signal);
                setErrorReport(this, {
                    Type: '"onDropError" Callback Failure',
                    Sufferer: this, Message: '' + Signal, Cause: Signal
                });
            }
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
        const { BorderWidths, BorderStyles, BorderColors, BorderRadii, BoxShadow, OverflowVisibility, } = this;
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
        if (OverflowVisibility != null) {
            CSSStyleList.push(OverflowVisibility == true ? 'visible' : 'hidden');
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
        const curGeometry = this.Geometry; // already within constraints
        /**** consider real changes only ****/
        if ((newAnchors[0] === curAnchors[0]) && (newAnchors[1] === curAnchors[1])) {
            return;
        }
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
        expectListSatisfying('patch offsets', newOffsets, ValueIsFiniteNumber);
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
                    allowDimension('patch width', newOffsets[1]);
                    break;
                case 'width-right':
                    allowDimension('patch width', newOffsets[0]);
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
                    allowDimension('patch height', newOffsets[3]);
                    break;
                case 'height-bottom':
                    allowDimension('patch height', newOffsets[2]);
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
        var _a;
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
        let { Name, Title, isModal, x, y, Width, Height, minWidth, maxWidth, minHeight, maxHeight, onOpen, onClose } = Descriptor;
        if (this.OverlayIsOpen(Descriptor.Name))
            throwError(`AlreadyOpen: an overlay named ${quoted(Descriptor.Name)} is already open`);
        if (isModal == null) {
            isModal = false;
        }
        if (x == null) {
            x = 0;
        }
        if (y == null) {
            y = 0;
        }
        if (minWidth == null) {
            minWidth = 0;
        }
        if (minHeight == null) {
            minHeight = 0;
        }
        let SourceWidget, SourceWidgetPath;
        switch (true) {
            case null:
            case undefined:
                throwError('MissingArgument: no source widget path given');
            case ValueIsPath(Descriptor.SourceWidget):
                SourceWidgetPath = Descriptor.SourceWidget;
                SourceWidget = (_a = this.Applet) === null || _a === void 0 ? void 0 : _a.WidgetAtPath(SourceWidgetPath);
                if (SourceWidget == null)
                    throwError(`NoSuchWidget: no widget at path ${quoted(Descriptor.SourceWidget)} found`);
                break;
            case ValueIsWidget(Descriptor.SourceWidget):
                SourceWidget = Descriptor.SourceWidget;
                SourceWidgetPath = SourceWidget.Path;
            default:
                throwError('InvalidArgument: the given source widget is neither a widget ' +
                    'nor a widget path');
        }
        if ((Width == null) || (Height == null)) {
            let SourceGeometry = SourceWidget.Geometry;
            if (Width == null) {
                Width = SourceGeometry.Width;
            }
            if (Height == null) {
                Height = SourceGeometry.Height;
            }
        }
        Width = Math.max(minWidth || 0, Math.min(Width, maxWidth || Infinity));
        Height = Math.max(minHeight || 0, Math.min(Height, maxHeight || Infinity));
        const Overlay = {
            Name, normalizedName: Name.toLowerCase(), SourceWidgetPath,
            isModal,
            x, y, Width, Height, minWidth, maxWidth, minHeight, maxHeight,
            onOpen, onClose
        };
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
        this.rerender();
        if (Overlay.onClose != null) {
            Overlay.onClose(Overlay);
        }
    }
    /**** closeAllOverlays ****/
    closeAllOverlays() {
        if (this._OverlayList.length > 0) {
            this._OverlayList.forEach((Overlay) => this.closeOverlay(Overlay.Name));
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
        Serialization.Type = this.Type;
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
    }
    /**** _deserializeConfigurationFrom ****/
    _deserializeConfigurationFrom(Serialization) {
        super._deserializeConfigurationFrom(Serialization);
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
        if (ValueIsListSatisfying(newOffsets, ValueIsInteger, 4, 4)) {
            if (((Anchors[0] === 'left-width') && ValueIsDimension(newOffsets[1]) ||
                (Anchors[0] === 'left-right') ||
                (Anchors[0] === 'width-right') && ValueIsDimension(newOffsets[0])) && ((Anchors[1] === 'top-height') && ValueIsDimension(newOffsets[3]) ||
                (Anchors[1] === 'top-bottom') ||
                (Anchors[1] === 'height-bottom') && ValueIsDimension(newOffsets[2]))) {
                this._Offsets = newOffsets.slice();
            }
        }
        /**** the remaining properties are simpler ****/
        ;
        [
            //      'Type',
            'Lock', 'Visibility', 'Enabling'
        ].forEach((Name) => deserializeProperty(Name));
    }
}
/**** WidgetTypes ****/
const builtInWidgetTypes = {};
function WidgetTypes() {
    return Object.keys(builtInWidgetTypes);
}
/**** newWidgetOfType ****/
function newWidgetOfType(Type, Page) {
    if (Type in builtInWidgetTypes) {
        return new builtInWidgetTypes[Type](Page);
    }
    else {
        throwError(`InvalidArgument: widget type ${quoted(Type)} is unknown`);
    }
}
//------------------------------------------------------------------------------
//--                          built-in Widget Types                           --
//------------------------------------------------------------------------------
/**** plainWidget ****/
export class WAT_plainWidget extends WAT_Widget {
    constructor(Page) {
        super(Page);
        Object.defineProperty(this, "_Renderer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                return html `<div class="WAT plainWidget"/>`;
            }
        });
    }
    get Type() { return 'plainWidget'; }
    set Type(_) { throwReadOnlyError('Type'); }
}
builtInWidgetTypes['plainWidget'] = WAT_plainWidget;
/**** Outline ****/
export class WAT_Outline extends WAT_Widget {
    constructor(Page) {
        super(Page);
        /**** Renderer ****/
        Object.defineProperty(this, "_Renderer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                return html `<div class="WAT Content Outline"/>`;
            }
        });
    }
    get Type() { return 'Outline'; }
    set Type(_) { throwReadOnlyError('Type'); }
    /**** bundledWidgets ****/
    bundledWidgets() {
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
    }
}
builtInWidgetTypes['Outline'] = WAT_Outline;
appendStyle(`
/**** Outline ****/

  .WAT.Widget > .WAT.Outline {
    outline:dotted 1px blue;
    outline-offset:2px;
  }
  `);
appendStyle(`
/**** Title/Subtitle/Label/Text/FinePrint ****/
  `);
/**** Title ****/
export class WAT_Title extends WAT_Widget {
    constructor(Page) {
        super(Page);
        Object.defineProperty(this, "_Renderer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                return html `<div class="WAT Content Title">${this.Value}</div>`;
            }
        });
    }
    get Type() { return 'Title'; }
    set Type(_) { throwReadOnlyError('Type'); }
}
builtInWidgetTypes['Title'] = WAT_Title;
appendStyle(`
  .WAT.Widget > .WAT.Title {
    font-size:22px; font-weight:bold; line-height:32px;
    text-overflow:ellipsis;
  }
  `);
/**** Subtitle ****/
export class WAT_Subtitle extends WAT_Widget {
    constructor(Page) {
        super(Page);
        Object.defineProperty(this, "_Renderer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                return html `<div class="WAT Content Subtitle">${this.Value}</div>`;
            }
        });
    }
    get Type() { return 'Subtitle'; }
    set Type(_) { throwReadOnlyError('Type'); }
}
builtInWidgetTypes['Subtitle'] = WAT_Subtitle;
appendStyle(`
  .WAT.Widget > .WAT.Subtitle {
    font-size:18px; font-weight:bold; line-height:27px;
    text-overflow:ellipsis;
  }
  `);
/**** Label ****/
export class WAT_Label extends WAT_Widget {
    constructor(Page) {
        super(Page);
        Object.defineProperty(this, "_Renderer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                return html `<div class="WAT Content Label">${this.Value}</div>`;
            }
        });
    }
    get Type() { return 'Label'; }
    set Type(_) { throwReadOnlyError('Type'); }
}
builtInWidgetTypes['Label'] = WAT_Label;
appendStyle(`
  .WAT.Widget > .WAT.Label {
    font-size:14px; font-weight:bold; line-height:21px;
    top:4px;
    text-overflow:ellipsis;
  }
  `);
/**** Text ****/
export class WAT_Text_ extends WAT_Widget {
    constructor(Page) {
        super(Page);
        Object.defineProperty(this, "_Renderer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                return html `<div class="WAT Content Text">${this.Value}</div>`;
            }
        });
    }
    get Type() { return 'Text'; }
    set Type(_) { throwReadOnlyError('Type'); }
}
builtInWidgetTypes['Text'] = WAT_Text_;
appendStyle(`
  .WAT.Widget > .WAT.Text {
    font-size:14px; font-weight:normal; line-height:21px;
    top:4px;
    text-overflow:ellipsis;
  }
  `);
/**** Fineprint ****/
export class WAT_Fineprint extends WAT_Widget {
    constructor(Page) {
        super(Page);
        Object.defineProperty(this, "_Renderer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                return html `<div class="WAT Content Fineprint">${this.Value}</div>`;
            }
        });
    }
    get Type() { return 'Fineprint'; }
    set Type(_) { throwReadOnlyError('Type'); }
}
builtInWidgetTypes['Fineprint'] = WAT_Fineprint;
appendStyle(`
  .WAT.Widget > .WAT.FinePrint {
    font-size:12px; font-weight:normal; line-height:18px;
    text-overflow:ellipsis;
  }
  `);
/**** HTMLView ****/
export class WAT_HTMLView extends WAT_Widget {
    constructor(Page) {
        super(Page);
        /**** readonly ****/
        Object.defineProperty(this, "_readonly", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: true
        });
        /**** acceptableFileTypes ****/
        Object.defineProperty(this, "_acceptableFileTypes", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        /**** Renderer ****/
        Object.defineProperty(this, "_Renderer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                const { Enabling, readonly } = this;
                let acceptableFileTypes = acceptableListSatisfying(this._acceptableFileTypes, [], ValueIsHTMLFormat);
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
                            const Value = Event.dataTransfer.getData('text');
                            this.Value = Value;
                            if (this._onInput != null) {
                                this._onInput_(Event);
                            } // no typo!
                        }
                        else {
                            try {
                                for (let Item of Event.dataTransfer.items) {
                                    if ((Item.kind === 'file') && acceptableFileTypes.includes(Item.type)) {
                                        this.Value = await FileReadAsHTML(Item.getAsFile(), Item.type);
                                        if (this._onInput != null) {
                                            this._onInput_(Event);
                                        } // no typo!
                                        break;
                                    }
                                }
                            }
                            catch (Signal) {
                                console.warn('file drop error', Signal);
                                if (this._onDropError != null) {
                                    this._onDropError_(Signal);
                                }
                            }
                        }
                    }
                };
                /**** actual rendering ****/
                return html `<div class="WAT Content HTMLView"
        onDragOver=${allowsDropping && _onDragOver} onDrop=${allowsDropping && _onDrop}
        dangerouslySetInnerHTML=${{ __html: acceptableText(this.Value, '') }}
      />`;
            }
        });
    }
    get Type() { return 'HTMLView'; }
    set Type(_) { throwReadOnlyError('Type'); }
    get readonly() { return this._readonly; }
    set readonly(newSetting) {
        allowBoolean('readonly setting', newSetting);
        if (this._readonly !== newSetting) {
            this._readonly = newSetting;
            this.rerender();
        }
    }
    get acceptableFileTypes() { return this._acceptableFileTypes.slice(); }
    set acceptableFileTypes(newSetting) {
        allowListSatisfying('acceptable file types', newSetting, ValueIsHTMLFormat);
        if (newSetting == null) {
            newSetting = [];
        }
        if (ValuesDiffer(this._acceptableFileTypes, newSetting)) {
            this._acceptableFileTypes = newSetting.slice();
            this.rerender();
        }
    }
    /**** _serializeConfigurationInto ****/
    _serializeConfigurationInto(Serialization) {
        super._serializeConfigurationInto(Serialization);
        [
            'readonly', 'acceptableFileTypes',
        ].forEach((Name) => this._serializePropertyInto(Name, Serialization));
    }
    /**** _deserializeConfigurationFrom ****/
    _deserializeConfigurationFrom(Serialization) {
        super._deserializeConfigurationFrom(Serialization);
        this._readonly = acceptableBoolean(Serialization.readonly, false);
        this._acceptableFileTypes = acceptableListSatisfying(Serialization.acceptableFileTypes, [], ValueIsHTMLFormat);
    }
}
builtInWidgetTypes['HTMLView'] = WAT_HTMLView;
appendStyle(`
  .WAT.Widget > .WAT.HTMLView {
    overflow-y:scroll;
  }
  `);
/**** ImageView ****/
export const WAT_ImageScalings = ['none', 'stretch', 'cover', 'contain'];
export const WAT_ImageAlignments = [
    'left top', 'center top', 'right top', 'left center', 'center center',
    'right center', 'left bottom', 'center bottom', 'right bottom'
];
export class WAT_ImageView extends WAT_Widget {
    constructor(Page) {
        super(Page);
        /**** ImageScaling ****/
        Object.defineProperty(this, "_ImageScaling", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**** ImageAlignment ****/
        Object.defineProperty(this, "_ImageAlignment", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_readonly", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: true
        });
        /**** acceptableFileTypes ****/
        Object.defineProperty(this, "_acceptableFileTypes", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        /**** Renderer ****/
        Object.defineProperty(this, "_Renderer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                const ImageScaling = acceptableOneOf(this._ImageScaling, 'contain', WAT_ImageScalings);
                const ImageAlignment = acceptableOneOf(this._ImageAlignment, 'center', WAT_ImageAlignments);
                const { Enabling, readonly } = this;
                let acceptableFileTypes = acceptableListSatisfying(this._acceptableFileTypes, [], ValueIsImageFormat);
                if (acceptableFileTypes.length === 0) {
                    acceptableFileTypes = WAT_supportedImageFormats.slice();
                }
                /**** prepare file dropping ****/
                const allowsDropping = ((Enabling == true) && !readonly && (acceptableFileTypes.length > 0));
                function _acceptableDataIn(Event) {
                    if (Event.dataTransfer.types.some((Type) => ((Type === 'text/html') &&
                        Event.dataTransfer.getData('text/html').includes('<img')))) {
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
                        if (Event.dataTransfer.types.some((Type) => ((Type === 'text/html') &&
                            Event.dataTransfer.getData('text/html').includes('<img')))) {
                            const HTML = Event.dataTransfer.getData('text/html');
                            const Parser = new DOMParser();
                            const Doc = Parser.parseFromString(HTML, 'text/html');
                            const ImageSource = (_a = Doc.querySelector('img')) === null || _a === void 0 ? void 0 : _a.src;
                            this.Value = ImageSource;
                            if (this._onInput != null) {
                                this._onInput_(Event);
                            } // no typo!
                        }
                        else {
                            try {
                                for (let Item of Event.dataTransfer.items) {
                                    if ((Item.kind === 'file') && acceptableFileTypes.includes(Item.type)) {
                                        this.Value = await FileReadAsImage(Item.getAsFile(), Item.type);
                                        if (this._onInput != null) {
                                            this._onInput_(Event);
                                        } // no typo!
                                        break;
                                    }
                                }
                            }
                            catch (Signal) {
                                console.warn('file drop error', Signal);
                                if (this._onDropError != null) {
                                    this._onDropError_(Signal);
                                }
                            }
                        }
                    }
                };
                /**** actual rendering ****/
                return html `<img class="WAT Content ImageView"
        src=${acceptableURL(this.Value, '')}
        style="object-fit:${ImageScaling}; object-position:${ImageAlignment}"
        onDragOver=${allowsDropping && _onDragOver} onDrop=${allowsDropping && _onDrop}
      />`;
            }
        });
    }
    get Type() { return 'ImageView'; }
    set Type(_) { throwReadOnlyError('Type'); }
    get ImageScaling() {
        return this._ImageScaling;
    }
    set ImageScaling(newSetting) {
        allowOneOf('image scaling', newSetting, WAT_ImageScalings);
        if (this._ImageScaling !== newSetting) {
            this._ImageScaling = newSetting;
            this.rerender();
        }
    }
    get ImageAlignment() {
        return this._ImageAlignment;
    }
    set ImageAlignment(newSetting) {
        allowOneOf('image alignment', newSetting, WAT_ImageAlignments);
        if (this._ImageAlignment !== newSetting) {
            this._ImageAlignment = newSetting;
            this.rerender();
        }
    } /**** readonly ****/
    get readonly() { return this._readonly; }
    set readonly(newSetting) {
        allowBoolean('readonly setting', newSetting);
        if (this._readonly !== newSetting) {
            this._readonly = newSetting;
            this.rerender();
        }
    }
    get acceptableFileTypes() { return this._acceptableFileTypes.slice(); }
    set acceptableFileTypes(newSetting) {
        allowListSatisfying('acceptable file types', newSetting, ValueIsImageFormat);
        if (newSetting == null) {
            newSetting = [];
        }
        if (ValuesDiffer(this._acceptableFileTypes, newSetting)) {
            this._acceptableFileTypes = newSetting.slice();
            this.rerender();
        }
    }
    /**** _serializeConfigurationInto ****/
    _serializeConfigurationInto(Serialization) {
        super._serializeConfigurationInto(Serialization);
        [
            'ImageScaling', 'ImageAlignment',
            'readonly', 'acceptableFileTypes',
        ].forEach((Name) => this._serializePropertyInto(Name, Serialization));
    }
    /**** _deserializeConfigurationFrom ****/
    _deserializeConfigurationFrom(Serialization) {
        super._deserializeConfigurationFrom(Serialization);
        this._ImageScaling = acceptableOneOf(Serialization.ImageScaling, 'contain', WAT_ImageScalings);
        this._ImageAlignment = acceptableOneOf(Serialization.ImageAlignment, 'center', WAT_ImageAlignments);
        this._readonly = acceptableBoolean(Serialization.readonly, false);
        this._acceptableFileTypes = acceptableListSatisfying(Serialization.acceptableFileTypes, [], ValueIsImageFormat);
    }
}
builtInWidgetTypes['ImageView'] = WAT_ImageView;
appendStyle(`
  .WAT.Widget > .WAT.ImageView {
    object-fit:contain; object-position:center;
  }
  `);
/**** SVGView ****/
export class WAT_SVGView extends WAT_Widget {
    constructor(Page) {
        super(Page);
        /**** ImageScaling ****/
        Object.defineProperty(this, "_ImageScaling", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**** ImageAlignment ****/
        Object.defineProperty(this, "_ImageAlignment", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**** Renderer ****/
        Object.defineProperty(this, "_Renderer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                const DataURL = 'data:image/svg+xml;base64,' + btoa(acceptableText(this.Value, ''));
                const ImageScaling = acceptableOneOf(this._ImageScaling, 'contain', WAT_ImageScalings);
                const ImageAlignment = acceptableOneOf(this._ImageAlignment, 'center', WAT_ImageAlignments);
                return html `<img class="WAT Content SVGView"
        src=${DataURL}
        style="object-fit:${ImageScaling}; object-position:${ImageAlignment}"
      />`;
            }
        });
    }
    get Type() { return 'SVGView'; }
    set Type(_) { throwReadOnlyError('Type'); }
    get ImageScaling() {
        return this._ImageScaling;
    }
    set ImageScaling(newSetting) {
        allowOneOf('image scaling', newSetting, WAT_ImageScalings);
        if (this._ImageScaling !== newSetting) {
            this._ImageScaling = newSetting;
            this.rerender();
        }
    }
    get ImageAlignment() {
        return this._ImageAlignment;
    }
    set ImageAlignment(newSetting) {
        allowOneOf('image alignment', newSetting, WAT_ImageAlignments);
        if (this._ImageAlignment !== newSetting) {
            this._ImageAlignment = newSetting;
            this.rerender();
        }
    }
    /**** _serializeConfigurationInto ****/
    _serializeConfigurationInto(Serialization) {
        super._serializeConfigurationInto(Serialization);
        this._serializePropertyInto('ImageScaling', Serialization);
        this._serializePropertyInto('ImageAlignment', Serialization);
    }
    /**** _deserializeConfigurationFrom ****/
    _deserializeConfigurationFrom(Serialization) {
        super._deserializeConfigurationFrom(Serialization);
        this._ImageScaling = acceptableOneOf(Serialization.ImageScaling, 'contain', WAT_ImageScalings);
        this._ImageAlignment = acceptableOneOf(Serialization.ImageAlignment, 'center', WAT_ImageAlignments);
    }
}
builtInWidgetTypes['SVGView'] = WAT_SVGView;
appendStyle(`
  .WAT.Widget > .WAT.SVGView {
    object-fit:contain; object-position:center;
  }
  `);
/**** WebView ****/
export const WAT_DefaultSandboxPermissions = ('allow-downloads allow-forms allow-modals allow-orientation-lock ' +
    'allow-pointer-lock allow-popups allow-same-origin allow-scripts');
export const WAT_ReferrerPolicies = [
    'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin',
    'same-origin', 'strict-origin', 'strict-origin', 'strict-origin-when-cross-origin',
    'unsafe-url'
];
export class WAT_WebView extends WAT_Widget {
    constructor(Page) {
        super(Page);
        /**** PermissionsPolicy ****/
        Object.defineProperty(this, "_PermissionsPolicy", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**** allowsFullscreen ****/
        Object.defineProperty(this, "_allowsFullscreen", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        /**** SandboxPermissions ****/
        Object.defineProperty(this, "_SandboxPermissions", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**** ReferrerPolicy ****/
        Object.defineProperty(this, "_ReferrerPolicy", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**** Renderer ****/
        Object.defineProperty(this, "_Renderer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                const PermissionsPolicy = acceptableOptionalTextline(this._PermissionsPolicy);
                const allowsFullscreen = acceptableBoolean(this._allowsFullscreen, false);
                const SandboxPermissions = acceptableTextline(this._SandboxPermissions, WAT_DefaultSandboxPermissions);
                const ReferrerPolicy = acceptableOptionalOneOf(this._ReferrerPolicy, WAT_ReferrerPolicies);
                return html `<iframe class="WAT Content WebView"
        src=${acceptableURL(this.Value, '')}
        allow=${PermissionsPolicy} allowfullscreen=${allowsFullscreen}
        sandbox=${SandboxPermissions} referrerpolicy=${ReferrerPolicy}
      />`;
            }
        });
    }
    get Type() { return 'WebView'; }
    set Type(_) { throwReadOnlyError('Type'); }
    get PermissionsPolicy() { return this._PermissionsPolicy; }
    set PermissionsPolicy(newSetting) {
        allowTextline('permissions policy', newSetting);
        if (this._PermissionsPolicy !== newSetting) {
            this._PermissionsPolicy = newSetting;
            this.rerender();
        }
    }
    get allowsFullscreen() { return this._allowsFullscreen; }
    set allowsFullscreen(newSetting) {
        allowBoolean('fullscreen permission', newSetting);
        if (this._allowsFullscreen !== newSetting) {
            this._allowsFullscreen = newSetting;
            this.rerender();
        }
    }
    get SandboxPermissions() { return this._SandboxPermissions; }
    set SandboxPermissions(newSetting) {
        allowTextline('sandbox permissions', newSetting);
        if (this._SandboxPermissions !== newSetting) {
            this._SandboxPermissions = newSetting;
            this.rerender();
        }
    }
    get ReferrerPolicy() {
        return this._ReferrerPolicy;
    }
    set ReferrerPolicy(newSetting) {
        allowOneOf('referrer policy', newSetting, WAT_ReferrerPolicies);
        if (this._ReferrerPolicy !== newSetting) {
            this._ReferrerPolicy = newSetting;
            this.rerender();
        }
    }
    /**** _serializeConfigurationInto ****/
    _serializeConfigurationInto(Serialization) {
        super._serializeConfigurationInto(Serialization);
        [
            'PermissionsPolicy', 'allowsFullscreen', 'SandboxPermissions',
            'ReferrerPolicy'
        ].forEach((Name) => this._serializePropertyInto(Name, Serialization));
    }
    /**** _deserializeConfigurationFrom ****/
    _deserializeConfigurationFrom(Serialization) {
        super._deserializeConfigurationFrom(Serialization);
        this._PermissionsPolicy = acceptableOptionalTextline(Serialization.PermissionsPolicy);
        this._allowsFullscreen = acceptableBoolean(Serialization.allowsFullscreen, false);
        this._SandboxPermissions = acceptableTextline(Serialization.SandboxPermissions, WAT_DefaultSandboxPermissions);
        this._ReferrerPolicy = acceptableOptionalOneOf(Serialization.ReferrerPolicy, WAT_ReferrerPolicies);
    }
}
builtInWidgetTypes['WebView'] = WAT_WebView;
appendStyle(`
  .WAT.Widget > .WAT.WebView {
  }
  `);
/**** Badge ****/
export class WAT_Badge extends WAT_Widget {
    constructor(Page) {
        super(Page);
        Object.defineProperty(this, "_Renderer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                const Value = (ValueIsNumber(this.Value)
                    ? '' + this.Value
                    : acceptableTextline(this.Value, ''));
                const BorderRadius = Math.round(Math.min(this.Width, this.Height) / 2);
                return html `<div class="WAT Content Badge" style="
        border-color:${this.ForegroundColor || 'black'}; border-radius:${BorderRadius}px;
        line-height:${this.Height - 4}px;
      ">${acceptableTextline(Value, '')}</>`;
            }
        });
    }
    get Type() { return 'Badge'; }
    set Type(_) { throwReadOnlyError('Type'); }
}
builtInWidgetTypes['Badge'] = WAT_Badge;
appendStyle(`
  .WAT.Widget > .WAT.Badge {
    font-size:18px; font-weight:bold; text-align:center;
    border:solid 2px black;
  }
  `);
/**** Icon ****/
export class WAT_Icon extends WAT_Widget {
    constructor(Page) {
        super(Page);
        Object.defineProperty(this, "_Renderer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                const _onClick = (Event) => {
                    if (this.Enabling == false) {
                        return consumingEvent(Event);
                    }
                    if (this._onClick != null) {
                        this._onClick_(Event);
                    } // no typo!
                };
                const Value = acceptableURL(this.Value, `${IconFolder}/pencil.png`);
                const Color = acceptableColor(this.Color, 'black');
                return html `<div class="WAT Content Icon" style="
        -webkit-mask-image:url(${Value}); mask-image:url(${Value});
        background-color:${Color};
      " disabled=${this.Enabling == false} onClick=${_onClick}
      />`;
            }
        });
    }
    get Type() { return 'Icon'; }
    set Type(_) { throwReadOnlyError('Type'); }
}
builtInWidgetTypes['Icon'] = WAT_Icon;
appendStyle(`
  .WAT.Widget > .WAT.Icon {
    -webkit-mask-size:contain;           mask-size:contain;
    -webkit-mask-position:center center; mask-position:center center;
  }
  `);
/**** horizontalSeparator ****/
export class WAT_horizontalSeparator extends WAT_Widget {
    constructor(Page) {
        super(Page);
        /**** rendering ****/
        Object.defineProperty(this, "_Renderer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                return html `<div class="WAT Content horizontalSeparator"></div>`;
            }
        });
    }
    get Type() { return 'horizontalSeparator'; }
    set Type(_) { throwReadOnlyError('Type'); }
}
builtInWidgetTypes['horizontalSeparator'] = WAT_horizontalSeparator;
appendStyle(`
  .WAT.Widget > .WAT.horizontalSeparator {
    border:none; border-top:solid 1px black;
  }
  `);
/**** verticalSeparator ****/
export class WAT_verticalSeparator extends WAT_Widget {
    constructor(Page) {
        super(Page);
        /**** rendering ****/
        Object.defineProperty(this, "_Renderer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                return html `<div class="WAT Content verticalSeparator"></div>`;
            }
        });
    }
    get Type() { return 'verticalSeparator'; }
    set Type(_) { throwReadOnlyError('Type'); }
}
builtInWidgetTypes['verticalSeparator'] = WAT_verticalSeparator;
appendStyle(`
  .WAT.Widget > .WAT.verticalSeparator {
    border:none; border-left:solid 1px black;
  }
  `);
/**** Button ****/
export class WAT_Button extends WAT_Widget {
    constructor(Page) {
        super(Page);
        Object.defineProperty(this, "_Renderer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                const onClick = (Event) => {
                    if (this.Enabling == false) {
                        return consumingEvent(Event);
                    }
                    if (this._onClick != null) {
                        this._onClick_(Event);
                    } // no typo!
                };
                const Label = acceptableTextline(this.Label || this.Value, '');
                return html `<button class="WAT Content Button" style="
        line-height:${this.LineHeight || this.Height}px;
      " disabled=${this.Enabling == false} onClick=${onClick}
      >${Label}</>`;
            }
        });
    }
    get Type() { return 'Button'; }
    set Type(_) { throwReadOnlyError('Type'); }
    get Label() { return this.memoized.Label; }
    set Label(newLabel) {
        allowTextline('button label', newLabel);
        if (this.memoized.Label != newLabel) {
            this.memoized.Label = newLabel;
            this.rerender();
        }
    }
}
builtInWidgetTypes['Button'] = WAT_Button;
appendStyle(`
  .WAT.Widget > .WAT.Button {
    border:solid 1px black; border-radius:4px;
    background:white;
    font-weight:bold; color:black;
    text-align:center;
  }
  `);
/**** Checkbox ****/
export class WAT_Checkbox extends WAT_Widget {
    constructor(Page) {
        super(Page);
        Object.defineProperty(this, "_Renderer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                const onClick = (Event) => {
                    if (this.Enabling == false) {
                        return consumingEvent(Event);
                    }
                    this.Value = Event.target.checked;
                    if (this._onClick != null) {
                        this._onClick_(Event);
                    } // no typo!
                };
                const Value = acceptableOptionalBoolean(this.Value);
                const checked = (Value == true);
                const indeterminate = (Value == null);
                return html `<input type="checkbox" class="WAT Checkbox"
        checked=${checked} indeterminate=${indeterminate}
        disabled=${this.Enabling == false} onClick=${onClick}
      />`;
            }
        });
    }
    get Type() { return 'Checkbox'; }
    set Type(_) { throwReadOnlyError('Type'); }
}
builtInWidgetTypes['Checkbox'] = WAT_Checkbox;
appendStyle(`
  .WAT.Widget > .WAT.Checkbox {
    left:50%; top:50%;
    transform:translate(-50%,-50%);
  }
  `);
/**** Radiobutton ****/
export class WAT_Radiobutton extends WAT_Widget {
    constructor(Page) {
        super(Page);
        Object.defineProperty(this, "_Renderer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                const onClick = (Event) => {
                    if (this.Enabling == false) {
                        return consumingEvent(Event);
                    }
                    this.Value = Event.target.checked;
                    if (this._onClick != null) {
                        this._onClick_(Event);
                    } // no typo!
                };
                const Value = acceptableBoolean(this.Value, false);
                return html `<input type="radio" class="WAT Radiobutton"
        checked=${Value == true}
        disabled=${this.Enabling == false} onClick=${onClick}
      />`;
            }
        });
    }
    get Type() { return 'Radiobutton'; }
    set Type(_) { throwReadOnlyError('Type'); }
}
builtInWidgetTypes['Radiobutton'] = WAT_Radiobutton;
appendStyle(`
  .WAT.Widget > .WAT.Radiobutton {
    left:50%; top:50%;
    transform:translate(-50%,-50%);
  }
  `);
/**** Gauge ****/
export class WAT_Gauge extends WAT_Widget {
    constructor(Page) {
        super(Page);
        /**** Minimum ****/
        Object.defineProperty(this, "_Minimum", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**** lowerBound ****/
        Object.defineProperty(this, "_lowerBound", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**** Optimum ****/
        Object.defineProperty(this, "_Optimum", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**** upperBound ****/
        Object.defineProperty(this, "_upperBound", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**** Maximum ****/
        Object.defineProperty(this, "_Maximum", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**** Renderer ****/
        Object.defineProperty(this, "_Renderer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                const Value = acceptableNumber(ValueIsString(this.Value) ? parseFloat(this.Value) : this.Value, 0);
                const Minimum = acceptableOptionalNumber(this._Minimum);
                const lowerBound = acceptableOptionalNumber(this._lowerBound);
                const Optimum = acceptableOptionalNumber(this._Optimum);
                const upperBound = acceptableOptionalNumber(this._upperBound);
                const Maximum = acceptableOptionalNumber(this._Maximum);
                return html `<meter class="WAT Content Gauge" value=${Value}
        min=${Minimum} low=${lowerBound} opt=${Optimum}
        high=${upperBound} max=${Maximum}
       />`;
            }
        });
    }
    get Type() { return 'Gauge'; }
    set Type(_) { throwReadOnlyError('Type'); }
    get Minimum() { return this._Minimum; }
    set Minimum(newSetting) {
        allowNumber('minimal value', newSetting);
        if (this._Minimum !== newSetting) {
            this._Minimum = newSetting;
            this.rerender();
        }
    }
    get lowerBound() { return this._lowerBound; }
    set lowerBound(newSetting) {
        allowNumber('lower bound', newSetting);
        if (this._lowerBound !== newSetting) {
            this._lowerBound = newSetting;
            this.rerender();
        }
    }
    get Optimum() { return this._Optimum; }
    set Optimum(newSetting) {
        allowNumber('optimal value', newSetting);
        if (this._Optimum !== newSetting) {
            this._Optimum = newSetting;
            this.rerender();
        }
    }
    get upperBound() { return this._upperBound; }
    set upperBound(newSetting) {
        allowNumber('upper bound', newSetting);
        if (this._upperBound !== newSetting) {
            this._upperBound = newSetting;
            this.rerender();
        }
    }
    get Maximum() { return this._Maximum; }
    set Maximum(newSetting) {
        allowNumber('maximal value', newSetting);
        if (this._Maximum !== newSetting) {
            this._Maximum = newSetting;
            this.rerender();
        }
    }
    /**** _serializeConfigurationInto ****/
    _serializeConfigurationInto(Serialization) {
        super._serializeConfigurationInto(Serialization);
        [
            ''
        ].forEach((Name) => this._serializePropertyInto(Name, Serialization));
    }
    /**** _deserializeConfigurationFrom ****/
    _deserializeConfigurationFrom(Serialization) {
        super._deserializeConfigurationFrom(Serialization);
        //this._PermissionsPolicy  = acceptableOptionalTextline(Serialization.PermissionsPolicy)
    }
}
builtInWidgetTypes['Gauge'] = WAT_Gauge;
appendStyle(`
  .WAT.Widget > .WAT.Gauge {
  }
  `);
/**** Progressbar ****/
export class WAT_Progressbar extends WAT_Widget {
    constructor(Page) {
        super(Page);
        /**** Maximum ****/
        Object.defineProperty(this, "_Maximum", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**** Renderer ****/
        Object.defineProperty(this, "_Renderer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                const Value = acceptableNumber(ValueIsString(this.Value) ? parseFloat(this.Value) : this.Value, 0);
                const Maximum = acceptableOptionalNumber(this._Maximum);
                return html `<progress class="WAT Content Progressbar" value=${Value} max=${Maximum}
      style="accent-color:${this.ForegroundColor || 'dodgerblue'}"/>`;
            }
        });
    }
    get Type() { return 'Progressbar'; }
    set Type(_) { throwReadOnlyError('Type'); }
    get Maximum() { return this._Maximum; }
    set Maximum(newSetting) {
        allowNumberInRange('maximal value', newSetting, 0, Infinity, true, false);
        if (this._Maximum !== newSetting) {
            this._Maximum = newSetting;
            this.rerender();
        }
    }
    /**** _serializeConfigurationInto ****/
    _serializeConfigurationInto(Serialization) {
        super._serializeConfigurationInto(Serialization);
        this._serializePropertyInto('Maximum', Serialization);
    }
    /**** _deserializeConfigurationFrom ****/
    _deserializeConfigurationFrom(Serialization) {
        super._deserializeConfigurationFrom(Serialization);
        this._Maximum = acceptableOptionalNumberInRange(Serialization.Maximum, undefined, 0);
    }
}
builtInWidgetTypes['Progressbar'] = WAT_Progressbar;
appendStyle(`
  .WAT.Widget > .WAT.Progressbar {
    -webkit-appearance:none; -moz-appearance:none; appearance:none;
    background-color:#EEEEEE;
  }
  .WAT.Widget > .WAT.Progressbar::-webkit-progress-bar {
    background-color:#EEEEEE;
    border:solid 1px #E0E0E0; border-radius:2px;
  }
  .WAT.Widget > .WAT.Progressbar::-webkit-progress-value,
  .WAT.Widget > .WAT.Progressbar::-moz-progress-bar {
    background-color:dodgerblue;
    border:none; border-radius:2px;
  }
  `);
/**** Slider ****/
const HashmarkPattern = /^\s*([+-]?(\d+([.]\d+)?|[.]\d+)([eE][+-]?\d+)?|\d*[.](?:\d*))(?:\s*:\s*([^\x00-\x1F\x7F-\x9F\u2028\u2029\uFFF9-\uFFFB]+))?$/;
function HashmarkMatcher(Value) {
    return ValueIsStringMatching(Value, HashmarkPattern) || ValueIsNumber(Value);
}
export class WAT_Slider extends WAT_Widget {
    constructor(Page) {
        super(Page);
        /**** Minimum ****/
        Object.defineProperty(this, "_Minimum", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**** Stepping ****/
        Object.defineProperty(this, "_Stepping", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**** Maximum ****/
        Object.defineProperty(this, "_Maximum", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_Hashmarks", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**** Renderer ****/
        Object.defineProperty(this, "_Renderer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                const { Value, Enabling } = this;
                /**** handle external changes ****/
                const shownValue = useRef('');
                const InputElement = useRef(null);
                let ValueToShow = acceptableNumber(ValueIsString(Value) ? parseFloat(Value) : Value, 0);
                if (document.activeElement === InputElement.current) {
                    ValueToShow = shownValue.current;
                }
                else {
                    shownValue.current = ValueToShow;
                }
                const _onInput = (Event) => {
                    if (Enabling === false) {
                        return consumingEvent(Event);
                    }
                    shownValue.current = this.Value = parseFloat(Event.target.value);
                    if (this._onInput != null) {
                        this._onInput_(Event);
                    } // no typo!
                };
                const _onBlur = (Event) => {
                    this.rerender();
                };
                /**** process any other parameters ****/
                const Minimum = acceptableOptionalNumber(this._Minimum);
                const Stepping = acceptableOptionalNumberInRange(this._Stepping, undefined, 0);
                const Maximum = acceptableOptionalNumber(this._Maximum);
                const Hashmarks = acceptableOptionalListSatisfying(this._Hashmarks, undefined, HashmarkMatcher);
                let HashmarkList = '', HashmarkId;
                if ((Hashmarks != null) && (Hashmarks.length > 0)) {
                    HashmarkId = IdOfWidget(this) + '-Hashmarks';
                    HashmarkList = html `\n<datalist id=${HashmarkId}>
          ${Hashmarks.map((Item) => {
                        Item = '' + Item;
                        const Value = Item.replace(/:.*$/, '').trim();
                        const Label = Item.replace(/^[^:]+:/, '').trim();
                        return html `<option value=${Value}>${Label}</option>`;
                    })}
        </datalist>`;
                }
                /**** actual rendering ****/
                return html `<input type="range" class="WAT Content Slider"
        value=${ValueToShow} min=${Minimum} max=${Maximum} step=${Stepping}
        disabled=${Enabling === false} onInput=${_onInput} onBlur=${_onBlur}
        list=${HashmarkId}
      />${HashmarkList}`;
            }
        });
    }
    get Type() { return 'Slider'; }
    set Type(_) { throwReadOnlyError('Type'); }
    get Minimum() { return this._Minimum; }
    set Minimum(newSetting) {
        allowNumber('minimal value', newSetting);
        if (this._Minimum !== newSetting) {
            this._Minimum = newSetting;
            this.rerender();
        }
    }
    get Stepping() { return this._Stepping; }
    set Stepping(newSetting) {
        allowNumberInRange('stepping', newSetting, 0, Infinity, true, false);
        if (this._Stepping !== newSetting) {
            this._Stepping = newSetting;
            this.rerender();
        }
    }
    get Maximum() { return this._Maximum; }
    set Maximum(newSetting) {
        allowNumber('maximal value', newSetting);
        if (this._Maximum !== newSetting) {
            this._Maximum = newSetting;
            this.rerender();
        }
    } /**** Hashmarks ****/
    get Hashmarks() {
        return (this._Hashmarks == null ? this._Hashmarks : this._Hashmarks.slice());
    }
    set Hashmarks(newSetting) {
        allowListSatisfying('hashmark list', newSetting, HashmarkMatcher);
        if (ValuesDiffer(this._Hashmarks, newSetting)) {
            this._Hashmarks = (newSetting == null ? newSetting : newSetting.slice());
            this.rerender();
        }
    }
    /**** _serializeConfigurationInto ****/
    _serializeConfigurationInto(Serialization) {
        super._serializeConfigurationInto(Serialization);
        [
            'Minimum', 'Stepping', 'Maximum', 'Hashmarks',
        ].forEach((Name) => this._serializePropertyInto(Name, Serialization));
    }
    /**** _deserializeConfigurationFrom ****/
    _deserializeConfigurationFrom(Serialization) {
        super._deserializeConfigurationFrom(Serialization);
        this._Minimum = acceptableOptionalNumber(Serialization.Minimum);
        this._Stepping = acceptableOptionalNumberInRange(Serialization.Stepping, undefined, 0);
        this._Maximum = acceptableOptionalNumber(Serialization.Maximum);
        this._Hashmarks = acceptableOptionalListSatisfying(Serialization.Hashmarks, undefined, HashmarkMatcher);
    }
}
builtInWidgetTypes['Slider'] = WAT_Slider;
appendStyle(`
  .WAT.Widget > .WAT.Slider {
  }
  `);
/**** TextlineInput ****/
export class WAT_TextlineInput extends WAT_Widget {
    constructor(Page) {
        super(Page);
        /**** Placeholder ****/
        Object.defineProperty(this, "_Placeholder", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**** readonly ****/
        Object.defineProperty(this, "_readonly", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        /**** minLength ****/
        Object.defineProperty(this, "_minLength", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**** maxLength ****/
        Object.defineProperty(this, "_maxLength", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**** Pattern ****/
        Object.defineProperty(this, "_Pattern", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**** SpellChecking ****/
        Object.defineProperty(this, "_SpellChecking", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        /**** Suggestions ****/
        Object.defineProperty(this, "_Suggestions", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**** Renderer ****/
        Object.defineProperty(this, "_shownValue", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ''
        });
        Object.defineProperty(this, "_InputElement", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: createRef()
        });
        Object.defineProperty(this, "_Renderer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                const { Value, Enabling } = this;
                /**** handle external changes ****/
                let ValueToShow = acceptableTextline(Value, '');
                if ((this._InputElement.current != null) &&
                    (document.activeElement === this._InputElement.current)) {
                    ValueToShow = this._shownValue;
                }
                else {
                    this._shownValue = ValueToShow;
                }
                const _onInput = (Event) => {
                    if (Enabling === false) {
                        return consumingEvent(Event);
                    }
                    this._shownValue = this.Value = Event.target.value;
                    if (this._onInput != null) {
                        this._onInput_(Event);
                    } // no typo!
                };
                const _onBlur = (Event) => {
                    this.rerender();
                    if (this._onBlur != null) {
                        this._onBlur_(Event);
                    } // no typo!
                };
                /**** process any other parameters ****/
                const Placeholder = acceptableOptionalTextline(this._Placeholder);
                const readonly = acceptableOptionalBoolean(this._readonly);
                const minLength = acceptableOptionalOrdinal(this._minLength);
                const maxLength = acceptableOptionalOrdinal(this._maxLength);
                const Pattern = acceptableOptionalTextline(this._Pattern);
                const SpellChecking = acceptableOptionalBoolean(this._SpellChecking);
                const Suggestions = acceptableOptionalListSatisfying(this._Suggestions, undefined, ValueIsTextline);
                let SuggestionList = '', SuggestionId;
                if ((Suggestions != null) && (Suggestions.length > 0)) {
                    SuggestionId = IdOfWidget(this) + '-Suggestions';
                    SuggestionList = html `<datalist id=${SuggestionId}>
          ${Suggestions.map((Value) => html `<option value=${Value}></option>`)}
        </datalist>`;
                }
                /**** actual rendering ****/
                return html `<input type="text" class="WAT Content TextlineInput"
        value=${ValueToShow} minlength=${minLength} maxlength=${maxLength}
        readOnly=${readonly} placeholder=${Placeholder}
        pattern=${Pattern} spellcheck=${SpellChecking}
        disabled=${Enabling === false} onInput=${_onInput} onBlur=${_onBlur}
        list=${SuggestionId}
      />${SuggestionList}`;
            }
        });
    }
    get Type() { return 'TextlineInput'; }
    set Type(_) { throwReadOnlyError('Type'); }
    get Placeholder() { return this._Placeholder; }
    set Placeholder(newSetting) {
        allowTextline('placeholder', newSetting);
        if (this._Placeholder !== newSetting) {
            this._Placeholder = newSetting;
            this.rerender();
        }
    }
    get readonly() { return this._readonly; }
    set readonly(newSetting) {
        allowBoolean('readonly setting', newSetting);
        if (this._readonly !== newSetting) {
            this._readonly = newSetting;
            this.rerender();
        }
    }
    get minLength() { return this._minLength; }
    set minLength(newSetting) {
        allowOrdinal('minimal length', newSetting);
        if (this._minLength !== newSetting) {
            this._minLength = newSetting;
            this.rerender();
        }
    }
    get maxLength() { return this._maxLength; }
    set maxLength(newSetting) {
        allowOrdinal('maximal length', newSetting);
        if (this._maxLength !== newSetting) {
            this._maxLength = newSetting;
            this.rerender();
        }
    }
    get Pattern() { return this._Pattern; }
    set Pattern(newSetting) {
        allowTextline('input pattern', newSetting);
        if (this._Pattern !== newSetting) {
            this._Pattern = newSetting;
            this.rerender();
        }
    }
    get SpellChecking() { return this._SpellChecking; }
    set SpellChecking(newSetting) {
        allowBoolean('spell check setting', newSetting);
        if (this._SpellChecking !== newSetting) {
            this._SpellChecking = newSetting;
            this.rerender();
        }
    }
    get Suggestions() {
        return (this._Suggestions == null ? this._Suggestions : this._Suggestions.slice());
    }
    set Suggestions(newSetting) {
        allowListSatisfying('suggestion list', newSetting, ValueIsTextline);
        if (ValuesDiffer(this._Suggestions, newSetting)) {
            this._Suggestions = (newSetting == null ? newSetting : newSetting.slice());
            this.rerender();
        }
    }
    /**** _serializeConfigurationInto ****/
    _serializeConfigurationInto(Serialization) {
        super._serializeConfigurationInto(Serialization);
        [
            'Placeholder', 'readonly', 'minLength', 'maxLength', 'Pattern',
            'SpellChecking', 'Suggestions',
        ].forEach((Name) => this._serializePropertyInto(Name, Serialization));
    }
    /**** _deserializeConfigurationFrom ****/
    _deserializeConfigurationFrom(Serialization) {
        super._deserializeConfigurationFrom(Serialization);
        this._Placeholder = acceptableOptionalTextline(Serialization.Placeholder);
        this._readonly = acceptableBoolean(Serialization.readonly, false);
        this._minLength = acceptableOptionalOrdinal(Serialization.minLength);
        this._maxLength = acceptableOptionalOrdinal(Serialization.maxLength);
        this._Pattern = acceptableOptionalTextline(Serialization.Pattern);
        this._SpellChecking = acceptableBoolean(Serialization.SpellChecking, false);
        this._Suggestions = acceptableOptionalListSatisfying(Serialization.Suggestions, undefined, ValueIsTextline);
    }
}
builtInWidgetTypes['TextlineInput'] = WAT_TextlineInput;
appendStyle(`
  .WAT.Widget > .WAT.TextlineInput {
    left:1px; top:1px; right:1px; bottom:1px; width:auto; height:auto;
    border:solid 1px #888888; border-radius:2px;
    background:#e8f0ff;
    padding:0px 2px 0px 2px;
  }

  .WAT.Widget > .WAT.TextlineInput:read-only {
    border:solid 1px #DDDDDD; border-radius:2px;
    background:#F0F0F0;
  }
  `);
/**** PasswordInput ****/
export class WAT_PasswordInput extends WAT_Widget {
    constructor(Page) {
        super(Page);
        /**** Placeholder ****/
        Object.defineProperty(this, "_Placeholder", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**** readonly ****/
        Object.defineProperty(this, "_readonly", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        /**** minLength ****/
        Object.defineProperty(this, "_minLength", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**** maxLength ****/
        Object.defineProperty(this, "_maxLength", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**** Pattern ****/
        Object.defineProperty(this, "_Pattern", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**** Renderer ****/
        Object.defineProperty(this, "_shownValue", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ''
        });
        Object.defineProperty(this, "_InputElement", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: createRef()
        });
        Object.defineProperty(this, "_Renderer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                const { Value, Enabling } = this;
                /**** handle external changes ****/
                let ValueToShow = acceptableTextline(Value, '');
                if ((this._InputElement.current != null) &&
                    (document.activeElement === this._InputElement.current)) {
                    ValueToShow = this._shownValue;
                }
                else {
                    this._shownValue = ValueToShow;
                }
                const _onInput = (Event) => {
                    if (Enabling === false) {
                        return consumingEvent(Event);
                    }
                    this._shownValue = this.Value = Event.target.value;
                    if (this._onInput != null) {
                        this._onInput_(Event);
                    } // no typo!
                };
                const _onBlur = (Event) => {
                    this.rerender();
                    if (this._onBlur != null) {
                        this._onBlur_(Event);
                    } // no typo!
                };
                /**** process any other parameters ****/
                const Placeholder = acceptableOptionalTextline(this._Placeholder);
                const readonly = acceptableOptionalBoolean(this._readonly);
                const minLength = acceptableOptionalOrdinal(this._minLength);
                const maxLength = acceptableOptionalOrdinal(this._maxLength);
                const Pattern = acceptableOptionalTextline(this._Pattern);
                /**** actual rendering ****/
                return html `<input type="password" class="WAT Content PasswordInput"
        value=${ValueToShow} minlength=${minLength} maxlength=${maxLength}
        readOnly=${readonly} placeholder=${Placeholder}
        pattern=${Pattern}
        disabled=${Enabling === false} onInput=${_onInput} onBlur=${_onBlur}
      />`;
            }
        });
    }
    get Type() { return 'PasswordInput'; }
    set Type(_) { throwReadOnlyError('Type'); }
    get Placeholder() { return this._Placeholder; }
    set Placeholder(newSetting) {
        allowTextline('placeholder', newSetting);
        if (this._Placeholder !== newSetting) {
            this._Placeholder = newSetting;
            this.rerender();
        }
    }
    get readonly() { return this._readonly; }
    set readonly(newSetting) {
        allowBoolean('readonly setting', newSetting);
        if (this._readonly !== newSetting) {
            this._readonly = newSetting;
            this.rerender();
        }
    }
    get minLength() { return this._minLength; }
    set minLength(newSetting) {
        allowOrdinal('minimal length', newSetting);
        if (this._minLength !== newSetting) {
            this._minLength = newSetting;
            this.rerender();
        }
    }
    get maxLength() { return this._maxLength; }
    set maxLength(newSetting) {
        allowOrdinal('maximal length', newSetting);
        if (this._maxLength !== newSetting) {
            this._maxLength = newSetting;
            this.rerender();
        }
    }
    get Pattern() { return this._Pattern; }
    set Pattern(newSetting) {
        allowTextline('input pattern', newSetting);
        if (this._Pattern !== newSetting) {
            this._Pattern = newSetting;
            this.rerender();
        }
    }
    /**** _serializeConfigurationInto ****/
    _serializeConfigurationInto(Serialization) {
        super._serializeConfigurationInto(Serialization);
        [
            'Placeholder', 'readonly', 'minLength', 'maxLength', 'Pattern',
        ].forEach((Name) => this._serializePropertyInto(Name, Serialization));
    }
    /**** _deserializeConfigurationFrom ****/
    _deserializeConfigurationFrom(Serialization) {
        super._deserializeConfigurationFrom(Serialization);
        this._Placeholder = acceptableOptionalTextline(Serialization.Placeholder);
        this._readonly = acceptableBoolean(Serialization.readonly, false);
        this._minLength = acceptableOptionalOrdinal(Serialization.minLength);
        this._maxLength = acceptableOptionalOrdinal(Serialization.maxLength);
        this._Pattern = acceptableOptionalTextline(Serialization.Pattern);
    }
}
builtInWidgetTypes['PasswordInput'] = WAT_PasswordInput;
appendStyle(`
  .WAT.Widget > .WAT.PasswordInput {
    left:1px; top:1px; right:1px; bottom:1px; width:auto; height:auto;
    border:solid 1px #888888; border-radius:2px;
    background:#e8f0ff;
    padding:0px 2px 0px 2px;
  }

  .WAT.Widget > .WAT.PasswordInput:read-only {
    border:solid 1px #DDDDDD; border-radius:2px;
    background:#F0F0F0;
  }
  `);
/**** NumberInput ****/
export class WAT_NumberInput extends WAT_Widget {
    constructor(Page) {
        super(Page);
        /**** Placeholder ****/
        Object.defineProperty(this, "_Placeholder", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**** readonly ****/
        Object.defineProperty(this, "_readonly", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        /**** Minimum ****/
        Object.defineProperty(this, "_Minimum", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**** Stepping ****/
        Object.defineProperty(this, "_Stepping", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**** Maximum ****/
        Object.defineProperty(this, "_Maximum", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**** Suggestions ****/
        Object.defineProperty(this, "_Suggestions", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**** Renderer ****/
        Object.defineProperty(this, "_shownValue", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "_InputElement", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: createRef()
        });
        Object.defineProperty(this, "_Renderer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                const { Value, Enabling } = this;
                /**** handle external changes ****/
                let ValueToShow = acceptableNumber(ValueIsString(Value) ? parseFloat(Value) : Value, 0);
                if ((this._InputElement.current != null) &&
                    (document.activeElement === this._InputElement.current)) {
                    ValueToShow = this._shownValue;
                }
                else {
                    this._shownValue = ValueToShow;
                }
                const _onInput = (Event) => {
                    if (Enabling === false) {
                        return consumingEvent(Event);
                    }
                    this._shownValue = this.Value = parseFloat(Event.target.value);
                    if (this._onInput != null) {
                        this._onInput_(Event);
                    } // no typo!
                };
                const _onBlur = (Event) => {
                    this.rerender();
                    if (this._onBlur != null) {
                        this._onBlur_(Event);
                    } // no typo!
                };
                /**** process any other parameters ****/
                const Placeholder = acceptableOptionalTextline(this._Placeholder);
                const readonly = acceptableOptionalBoolean(this._readonly);
                const Minimum = acceptableOptionalNumber(this._Minimum);
                const Stepping = acceptableOptionalNumberInRange(this._Stepping, undefined, 0);
                const Maximum = acceptableOptionalNumber(this._Maximum);
                const Suggestions = acceptableOptionalListSatisfying(this._Suggestions, undefined, ValueIsNumber);
                let SuggestionList = '', SuggestionId;
                if ((Suggestions != null) && (Suggestions.length > 0)) {
                    SuggestionId = IdOfWidget(this) + '-Suggestions';
                    SuggestionList = html `<datalist id=${SuggestionId}>
          ${Suggestions.map((Value) => html `<option value=${Value}></option>`)}
        </datalist>`;
                }
                /**** actual rendering ****/
                return html `<input type="number" class="WAT Content NumberInput"
        value=${ValueToShow} min=${Minimum} max=${Maximum} step=${Stepping}
        readOnly=${readonly} placeholder=${Placeholder}
        disabled=${Enabling === false} onInput=${_onInput} onBlur=${_onBlur}
        list=${SuggestionId}
      />${SuggestionList}`;
            }
        });
    }
    get Type() { return 'NumberInput'; }
    set Type(_) { throwReadOnlyError('Type'); }
    get Placeholder() { return this._Placeholder; }
    set Placeholder(newSetting) {
        allowTextline('placeholder', newSetting);
        if (this._Placeholder !== newSetting) {
            this._Placeholder = newSetting;
            this.rerender();
        }
    }
    get readonly() { return this._readonly; }
    set readonly(newSetting) {
        allowBoolean('readonly setting', newSetting);
        if (this._readonly !== newSetting) {
            this._readonly = newSetting;
            this.rerender();
        }
    }
    get Minimum() { return this._Minimum; }
    set Minimum(newSetting) {
        allowNumber('minimal value', newSetting);
        if (this._Minimum !== newSetting) {
            this._Minimum = newSetting;
            this.rerender();
        }
    }
    get Stepping() { return this._Stepping; }
    set Stepping(newSetting) {
        allowNumberInRange('stepping', newSetting, 0, Infinity, true, false);
        if (this._Stepping !== newSetting) {
            this._Stepping = newSetting;
            this.rerender();
        }
    }
    get Maximum() { return this._Maximum; }
    set Maximum(newSetting) {
        allowNumber('maximal value', newSetting);
        if (this._Maximum !== newSetting) {
            this._Maximum = newSetting;
            this.rerender();
        }
    }
    get Suggestions() {
        return (this._Suggestions == null ? this._Suggestions : this._Suggestions.slice());
    }
    set Suggestions(newSetting) {
        allowListSatisfying('suggestion list', newSetting, ValueIsNumber);
        if (ValuesDiffer(this._Suggestions, newSetting)) {
            this._Suggestions = (newSetting == null ? newSetting : newSetting.slice());
            this.rerender();
        }
    }
    /**** _serializeConfigurationInto ****/
    _serializeConfigurationInto(Serialization) {
        super._serializeConfigurationInto(Serialization);
        [
            'Placeholder', 'readonly', 'Minimum', 'Stepping', 'Maximum', 'Suggestions'
        ].forEach((Name) => this._serializePropertyInto(Name, Serialization));
    }
    /**** _deserializeConfigurationFrom ****/
    _deserializeConfigurationFrom(Serialization) {
        super._deserializeConfigurationFrom(Serialization);
        this._Placeholder = acceptableOptionalTextline(Serialization.Placeholder);
        this._readonly = acceptableBoolean(Serialization.readonly, false);
        this._Minimum = acceptableOptionalNumber(Serialization.Minimum);
        this._Stepping = acceptableOptionalNumberInRange(Serialization.Stepping, undefined, 0);
        this._Maximum = acceptableOptionalNumber(Serialization.Maximum);
        this._Suggestions = acceptableOptionalListSatisfying(Serialization.Suggestions, undefined, ValueIsNumber);
    }
}
builtInWidgetTypes['NumberInput'] = WAT_NumberInput;
appendStyle(`
  .WAT.Widget > .WAT.NumberInput {
    left:1px; top:1px; right:1px; bottom:1px; width:auto; height:auto;
    border:solid 1px #888888; border-radius:2px;
    background:#e8f0ff;
    padding:0px 2px 0px 2px;
  }

  .WAT.Widget > .WAT.NumberInput:read-only {
    border:solid 1px #DDDDDD; border-radius:2px;
    background:#F0F0F0;
  }
  `);
/**** PhoneNumberInput ****/
export class WAT_PhoneNumberInput extends WAT_Widget {
    constructor(Page) {
        super(Page);
        /**** Placeholder ****/
        Object.defineProperty(this, "_Placeholder", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**** readonly ****/
        Object.defineProperty(this, "_readonly", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        /**** minLength ****/
        Object.defineProperty(this, "_minLength", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**** maxLength ****/
        Object.defineProperty(this, "_maxLength", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**** Pattern ****/
        Object.defineProperty(this, "_Pattern", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**** Suggestions ****/
        Object.defineProperty(this, "_Suggestions", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**** Renderer ****/
        Object.defineProperty(this, "_shownValue", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ''
        });
        Object.defineProperty(this, "_InputElement", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: createRef()
        });
        Object.defineProperty(this, "_Renderer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                const { Value, Enabling } = this;
                /**** handle external changes ****/
                let ValueToShow = acceptablePhoneNumber(Value, '');
                if ((this._InputElement.current != null) &&
                    (document.activeElement === this._InputElement.current)) {
                    ValueToShow = this._shownValue;
                }
                else {
                    this._shownValue = ValueToShow;
                }
                const _onInput = (Event) => {
                    if (Enabling === false) {
                        return consumingEvent(Event);
                    }
                    this._shownValue = this.Value = Event.target.value;
                    if (this._onInput != null) {
                        this._onInput_(Event);
                    } // no typo!
                };
                const _onBlur = (Event) => {
                    this.rerender();
                    if (this._onBlur != null) {
                        this._onBlur_(Event);
                    } // no typo!
                };
                /**** process any other parameters ****/
                const Placeholder = acceptableOptionalTextline(this._Placeholder);
                const readonly = acceptableOptionalBoolean(this._readonly);
                const minLength = acceptableOptionalOrdinal(this._minLength);
                const maxLength = acceptableOptionalOrdinal(this._maxLength);
                const Pattern = acceptableOptionalTextline(this._Pattern);
                const Suggestions = acceptableOptionalListSatisfying(this._Suggestions, undefined, ValueIsPhoneNumber);
                let SuggestionList = '', SuggestionId;
                if ((Suggestions != null) && (Suggestions.length > 0)) {
                    SuggestionId = IdOfWidget(this) + '-Suggestions';
                    SuggestionList = html `<datalist id=${SuggestionId}>
          ${Suggestions.map((Value) => html `<option value=${Value}></option>`)}
        </datalist>`;
                }
                /**** actual rendering ****/
                return html `<input type="tel" class="WAT Content PhoneNumberInput"
        value=${ValueToShow} minlength=${minLength} maxlength=${maxLength}
        readOnly=${readonly} placeholder=${Placeholder}
        pattern=${Pattern}
        disabled=${Enabling == false} onInput=${_onInput} onBlur=${_onBlur}
        list=${SuggestionId}
      />${SuggestionList}`;
            }
        });
    }
    get Type() { return 'PhoneNumberInput'; }
    set Type(_) { throwReadOnlyError('Type'); }
    get Placeholder() { return this._Placeholder; }
    set Placeholder(newSetting) {
        allowTextline('placeholder', newSetting);
        if (this._Placeholder !== newSetting) {
            this._Placeholder = newSetting;
            this.rerender();
        }
    }
    get readonly() { return this._readonly; }
    set readonly(newSetting) {
        allowBoolean('readonly setting', newSetting);
        if (this._readonly !== newSetting) {
            this._readonly = newSetting;
            this.rerender();
        }
    }
    get minLength() { return this._minLength; }
    set minLength(newSetting) {
        allowOrdinal('minimal length', newSetting);
        if (this._minLength !== newSetting) {
            this._minLength = newSetting;
            this.rerender();
        }
    }
    get maxLength() { return this._maxLength; }
    set maxLength(newSetting) {
        allowOrdinal('maximal length', newSetting);
        if (this._maxLength !== newSetting) {
            this._maxLength = newSetting;
            this.rerender();
        }
    }
    get Pattern() { return this._Pattern; }
    set Pattern(newSetting) {
        allowTextline('input pattern', newSetting);
        if (this._Pattern !== newSetting) {
            this._Pattern = newSetting;
            this.rerender();
        }
    }
    get Suggestions() {
        return (this._Suggestions == null ? this._Suggestions : this._Suggestions.slice());
    }
    set Suggestions(newSetting) {
        allowListSatisfying('suggestion list', newSetting, ValueIsPhoneNumber);
        if (ValuesDiffer(this._Suggestions, newSetting)) {
            this._Suggestions = (newSetting == null ? newSetting : newSetting.slice());
            this.rerender();
        }
    }
    /**** _serializeConfigurationInto ****/
    _serializeConfigurationInto(Serialization) {
        super._serializeConfigurationInto(Serialization);
        [
            'Placeholder', 'readonly', 'minLength', 'maxLength', 'Pattern', 'Suggestions'
        ].forEach((Name) => this._serializePropertyInto(Name, Serialization));
    }
    /**** _deserializeConfigurationFrom ****/
    _deserializeConfigurationFrom(Serialization) {
        super._deserializeConfigurationFrom(Serialization);
        this._Placeholder = acceptableOptionalTextline(Serialization.Placeholder);
        this._readonly = acceptableBoolean(Serialization.readonly, false);
        this._minLength = acceptableOptionalOrdinal(Serialization.minLength);
        this._maxLength = acceptableOptionalOrdinal(Serialization.maxLength);
        this._Pattern = acceptableOptionalTextline(Serialization.Pattern);
        this._Suggestions = acceptableOptionalListSatisfying(Serialization.Suggestions, undefined, ValueIsPhoneNumber);
    }
}
builtInWidgetTypes['PhoneNumberInput'] = WAT_PhoneNumberInput;
appendStyle(`
  .WAT.Widget > .WAT.PhoneNumberInput {
    left:1px; top:1px; right:1px; bottom:1px; width:auto; height:auto;
    border:solid 1px #888888; border-radius:2px;
    background:#e8f0ff;
    padding:0px 2px 0px 2px;
  }

  .WAT.Widget > .WAT.PhoneNumberInput:read-only {
    border:solid 1px #DDDDDD; border-radius:2px;
    background:#F0F0F0;
  }
  `);
/**** EMailAddressInput ****/
export class WAT_EMailAddressInput extends WAT_Widget {
    constructor(Page) {
        super(Page);
        /**** Placeholder ****/
        Object.defineProperty(this, "_Placeholder", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**** readonly ****/
        Object.defineProperty(this, "_readonly", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        /**** minLength ****/
        Object.defineProperty(this, "_minLength", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**** maxLength ****/
        Object.defineProperty(this, "_maxLength", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**** Pattern ****/
        Object.defineProperty(this, "_Pattern", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**** Suggestions ****/
        Object.defineProperty(this, "_Suggestions", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**** Renderer ****/
        Object.defineProperty(this, "_shownValue", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ''
        });
        Object.defineProperty(this, "_InputElement", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: createRef()
        });
        Object.defineProperty(this, "_Renderer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                const { Value, Enabling } = this;
                /**** handle external changes ****/
                let ValueToShow = acceptableEMailAddress(Value, '');
                if ((this._InputElement.current != null) &&
                    (document.activeElement === this._InputElement.current)) {
                    ValueToShow = this._shownValue;
                }
                else {
                    this._shownValue = ValueToShow;
                }
                const _onInput = (Event) => {
                    if (Enabling === false) {
                        return consumingEvent(Event);
                    }
                    this._shownValue = this.Value = Event.target.value;
                    if (this._onInput != null) {
                        this._onInput_(Event);
                    } // no typo!
                };
                const _onBlur = (Event) => {
                    this.rerender();
                    if (this._onBlur != null) {
                        this._onBlur_(Event);
                    } // no typo!
                };
                /**** process any other parameters ****/
                const Placeholder = acceptableOptionalTextline(this._Placeholder);
                const readonly = acceptableOptionalBoolean(this._readonly);
                const minLength = acceptableOptionalOrdinal(this._minLength);
                const maxLength = acceptableOptionalOrdinal(this._maxLength);
                const Pattern = acceptableOptionalTextline(this._Pattern);
                const Suggestions = acceptableOptionalListSatisfying(this._Suggestions, undefined, ValueIsEMailAddress);
                let SuggestionList = '', SuggestionId;
                if ((Suggestions != null) && (Suggestions.length > 0)) {
                    SuggestionId = IdOfWidget(this) + '-Suggestions';
                    SuggestionList = html `<datalist id=${SuggestionId}>
          ${Suggestions.map((Value) => html `<option value=${Value}></option>`)}
        </datalist>`;
                }
                /**** actual rendering ****/
                return html `<input type="email" class="WAT Content EMailAddressInput"
        value=${ValueToShow} minlength=${minLength} maxlength=${maxLength}
        readOnly=${readonly} placeholder=${Placeholder}
        pattern=${Pattern}
        disabled=${Enabling === false} onInput=${_onInput} onBlur=${_onBlur}
        list=${SuggestionId}
      />${SuggestionList}`;
            }
        });
    }
    get Type() { return 'EMailAddressInput'; }
    set Type(_) { throwReadOnlyError('Type'); }
    get Placeholder() { return this._Placeholder; }
    set Placeholder(newSetting) {
        allowTextline('placeholder', newSetting);
        if (this._Placeholder !== newSetting) {
            this._Placeholder = newSetting;
            this.rerender();
        }
    }
    get readonly() { return this._readonly; }
    set readonly(newSetting) {
        allowBoolean('readonly setting', newSetting);
        if (this._readonly !== newSetting) {
            this._readonly = newSetting;
            this.rerender();
        }
    }
    get minLength() { return this._minLength; }
    set minLength(newSetting) {
        allowOrdinal('minimal length', newSetting);
        if (this._minLength !== newSetting) {
            this._minLength = newSetting;
            this.rerender();
        }
    }
    get maxLength() { return this._maxLength; }
    set maxLength(newSetting) {
        allowOrdinal('maximal length', newSetting);
        if (this._maxLength !== newSetting) {
            this._maxLength = newSetting;
            this.rerender();
        }
    }
    get Pattern() { return this._Pattern; }
    set Pattern(newSetting) {
        allowTextline('input pattern', newSetting);
        if (this._Pattern !== newSetting) {
            this._Pattern = newSetting;
            this.rerender();
        }
    }
    get Suggestions() {
        return (this._Suggestions == null ? this._Suggestions : this._Suggestions.slice());
    }
    set Suggestions(newSetting) {
        allowListSatisfying('suggestion list', newSetting, ValueIsEMailAddress);
        if (ValuesDiffer(this._Suggestions, newSetting)) {
            this._Suggestions = (newSetting == null ? newSetting : newSetting.slice());
            this.rerender();
        }
    }
    /**** _serializeConfigurationInto ****/
    _serializeConfigurationInto(Serialization) {
        super._serializeConfigurationInto(Serialization);
        [
            'Placeholder', 'readonly', 'minLength', 'maxLength', 'Pattern', 'Suggestions'
        ].forEach((Name) => this._serializePropertyInto(Name, Serialization));
    }
    /**** _deserializeConfigurationFrom ****/
    _deserializeConfigurationFrom(Serialization) {
        super._deserializeConfigurationFrom(Serialization);
        this._Placeholder = acceptableOptionalTextline(Serialization.Placeholder);
        this._readonly = acceptableBoolean(Serialization.readonly, false);
        this._minLength = acceptableOptionalOrdinal(Serialization.minLength);
        this._maxLength = acceptableOptionalOrdinal(Serialization.maxLength);
        this._Pattern = acceptableOptionalTextline(Serialization.Pattern);
        this._Suggestions = acceptableOptionalListSatisfying(Serialization.Suggestions, undefined, ValueIsEMailAddress);
    }
}
builtInWidgetTypes['EMailAddressInput'] = WAT_EMailAddressInput;
appendStyle(`
  .WAT.Widget > .WAT.EMailAddressInput {
    left:1px; top:1px; right:1px; bottom:1px; width:auto; height:auto;
    border:solid 1px #888888; border-radius:2px;
    background:#e8f0ff;
    padding:0px 2px 0px 2px;
  }

  .WAT.Widget > .WAT.EMailAddressInput:read-only {
    border:solid 1px #DDDDDD; border-radius:2px;
    background:#F0F0F0;
  }
  `);
/**** URLInput ****/
export class WAT_URLInput extends WAT_Widget {
    constructor(Page) {
        super(Page);
        /**** Placeholder ****/
        Object.defineProperty(this, "_Placeholder", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**** readonly ****/
        Object.defineProperty(this, "_readonly", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        /**** minLength ****/
        Object.defineProperty(this, "_minLength", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**** maxLength ****/
        Object.defineProperty(this, "_maxLength", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**** Pattern ****/
        Object.defineProperty(this, "_Pattern", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**** Suggestions ****/
        Object.defineProperty(this, "_Suggestions", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**** Renderer ****/
        Object.defineProperty(this, "_shownValue", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ''
        });
        Object.defineProperty(this, "_InputElement", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: createRef()
        });
        Object.defineProperty(this, "_Renderer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                const { Value, Enabling } = this;
                /**** handle external changes ****/
                let ValueToShow = acceptableURL(Value, '');
                if ((this._InputElement.current != null) &&
                    (document.activeElement === this._InputElement.current)) {
                    ValueToShow = this._shownValue;
                }
                else {
                    this._shownValue = ValueToShow;
                }
                const _onInput = (Event) => {
                    if (Enabling === false) {
                        return consumingEvent(Event);
                    }
                    this._shownValue = this.Value = Event.target.value;
                    if (this._onInput != null) {
                        this._onInput_(Event);
                    } // no typo!
                };
                const _onBlur = (Event) => {
                    this.rerender();
                    if (this._onBlur != null) {
                        this._onBlur_(Event);
                    } // no typo!
                };
                /**** process any other parameters ****/
                const Placeholder = acceptableOptionalTextline(this._Placeholder);
                const readonly = acceptableOptionalBoolean(this._readonly);
                const minLength = acceptableOptionalOrdinal(this._minLength);
                const maxLength = acceptableOptionalOrdinal(this._maxLength);
                const Pattern = acceptableOptionalTextline(this._Pattern);
                const Suggestions = acceptableOptionalListSatisfying(this._Suggestions, undefined, ValueIsURL);
                let SuggestionList = '', SuggestionId;
                if ((Suggestions != null) && (Suggestions.length > 0)) {
                    SuggestionId = IdOfWidget(this) + '-Suggestions';
                    SuggestionList = html `<datalist id=${SuggestionId}>
          ${Suggestions.map((Value) => html `<option value=${Value}></option>`)}
        </datalist>`;
                }
                /**** actual rendering ****/
                return html `<input type="url" class="WAT Content URLInput"
        value=${ValueToShow} minlength=${minLength} maxlength=${maxLength}
        readOnly=${readonly} placeholder=${Placeholder}
        pattern=${Pattern}
        disabled=${Enabling === false} onInput=${_onInput} onBlur=${_onBlur}
        list=${SuggestionId}
      />${SuggestionList}`;
            }
        });
    }
    get Type() { return 'URLInput'; }
    set Type(_) { throwReadOnlyError('Type'); }
    get Placeholder() { return this._Placeholder; }
    set Placeholder(newSetting) {
        allowTextline('placeholder', newSetting);
        if (this._Placeholder !== newSetting) {
            this._Placeholder = newSetting;
            this.rerender();
        }
    }
    get readonly() { return this._readonly; }
    set readonly(newSetting) {
        allowBoolean('readonly setting', newSetting);
        if (this._readonly !== newSetting) {
            this._readonly = newSetting;
            this.rerender();
        }
    }
    get minLength() { return this._minLength; }
    set minLength(newSetting) {
        allowOrdinal('minimal length', newSetting);
        if (this._minLength !== newSetting) {
            this._minLength = newSetting;
            this.rerender();
        }
    }
    get maxLength() { return this._maxLength; }
    set maxLength(newSetting) {
        allowOrdinal('maximal length', newSetting);
        if (this._maxLength !== newSetting) {
            this._maxLength = newSetting;
            this.rerender();
        }
    }
    get Pattern() { return this._Pattern; }
    set Pattern(newSetting) {
        allowTextline('input pattern', newSetting);
        if (this._Pattern !== newSetting) {
            this._Pattern = newSetting;
            this.rerender();
        }
    }
    get Suggestions() {
        return (this._Suggestions == null ? this._Suggestions : this._Suggestions.slice());
    }
    set Suggestions(newSetting) {
        allowListSatisfying('suggestion list', newSetting, ValueIsURL);
        if (ValuesDiffer(this._Suggestions, newSetting)) {
            this._Suggestions = (newSetting == null ? newSetting : newSetting.slice());
            this.rerender();
        }
    }
    /**** _serializeConfigurationInto ****/
    _serializeConfigurationInto(Serialization) {
        super._serializeConfigurationInto(Serialization);
        [
            'Placeholder', 'readonly', 'minLength', 'maxLength', 'Pattern', 'Suggestions'
        ].forEach((Name) => this._serializePropertyInto(Name, Serialization));
    }
    /**** _deserializeConfigurationFrom ****/
    _deserializeConfigurationFrom(Serialization) {
        super._deserializeConfigurationFrom(Serialization);
        this._Placeholder = acceptableOptionalTextline(Serialization.Placeholder);
        this._readonly = acceptableBoolean(Serialization.readonly, false);
        this._minLength = acceptableOptionalOrdinal(Serialization.minLength);
        this._maxLength = acceptableOptionalOrdinal(Serialization.maxLength);
        this._Pattern = acceptableOptionalTextline(Serialization.Pattern);
        this._Suggestions = acceptableOptionalListSatisfying(Serialization.Suggestions, undefined, ValueIsURL);
    }
}
builtInWidgetTypes['URLInput'] = WAT_URLInput;
appendStyle(`
  .WAT.Widget > .WAT.URLInput {
    left:1px; top:1px; right:1px; bottom:1px; width:auto; height:auto;
    border:solid 1px #888888; border-radius:2px;
    background:#e8f0ff;
    padding:0px 2px 0px 2px;
  }

  .WAT.Widget > .WAT.URLInput:read-only {
    border:solid 1px #DDDDDD; border-radius:2px;
    background:#F0F0F0;
  }
  `);
/**** TimeInput ****/
export const WAT_TimePattern = '\\d{2}:\\d{2}';
export const WAT_TimeRegExp = /\d{2}:\d{2}/;
export function WAT_TimeMatcher(Value) {
    return ValueIsStringMatching(Value, WAT_TimeRegExp);
}
export class WAT_TimeInput extends WAT_Widget {
    constructor(Page) {
        super(Page);
        /**** readonly ****/
        Object.defineProperty(this, "_readonly", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        /**** withSeconds ****/
        Object.defineProperty(this, "_withSeconds", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        /**** Minimum ****/
        Object.defineProperty(this, "_Minimum", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**** Maximum ****/
        Object.defineProperty(this, "_Maximum", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**** Suggestions ****/
        Object.defineProperty(this, "_Suggestions", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**** Renderer ****/
        Object.defineProperty(this, "_shownValue", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ''
        });
        Object.defineProperty(this, "_InputElement", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: createRef()
        });
        Object.defineProperty(this, "_Renderer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                const { Value, Enabling } = this;
                /**** handle external changes ****/
                let ValueToShow = acceptableStringMatching(Value, '', WAT_TimeRegExp);
                if ((this._InputElement.current != null) &&
                    (document.activeElement === this._InputElement.current)) {
                    ValueToShow = this._shownValue;
                }
                else {
                    this._shownValue = ValueToShow;
                }
                const _onInput = (Event) => {
                    if (Enabling === false) {
                        return consumingEvent(Event);
                    }
                    this._shownValue = this.Value = Event.target.value;
                    if (this._onInput != null) {
                        this._onInput_(Event);
                    } // no typo!
                };
                const _onBlur = (Event) => {
                    this.rerender();
                    if (this._onBlur != null) {
                        this._onBlur_(Event);
                    } // no typo!
                };
                /**** process any other parameters ****/
                const readonly = acceptableOptionalBoolean(this._readonly);
                const withSeconds = acceptableOptionalBoolean(this._withSeconds);
                const Minimum = acceptableOptionalStringMatching(this._Minimum, undefined, WAT_TimeRegExp);
                const Maximum = acceptableOptionalStringMatching(this._Maximum, undefined, WAT_TimeRegExp);
                const Suggestions = acceptableOptionalListSatisfying(this._Suggestions, undefined, WAT_TimeMatcher);
                let SuggestionList = '', SuggestionId;
                if ((Suggestions != null) && (Suggestions.length > 0)) {
                    SuggestionId = IdOfWidget(this) + '-Suggestions';
                    SuggestionList = html `<datalist id=${SuggestionId}>
          ${Suggestions.map((Value) => html `<option value=${Value}></option>`)}
        </datalist>`;
                }
                /**** actual rendering ****/
                return html `<input type="time" class="WAT Content TimeInput"
        value=${ValueToShow} min=${Minimum} max=${Maximum}
        step=${withSeconds ? 1 : 60}
        readOnly=${readonly} pattern=${WAT_TimePattern}
        disabled=${Enabling === false} onInput=${_onInput} onBlur=${_onBlur}
        list=${SuggestionId}
      />${SuggestionList}`;
            }
        });
    }
    get Type() { return 'TimeInput'; }
    set Type(_) { throwReadOnlyError('Type'); }
    get readonly() { return this._readonly; }
    set readonly(newSetting) {
        allowBoolean('readonly setting', newSetting);
        if (this._readonly !== newSetting) {
            this._readonly = newSetting;
            this.rerender();
        }
    }
    get withSeconds() { return this._withSeconds; }
    set withSeconds(newSetting) {
        allowBoolean('seconds display setting', newSetting);
        if (this._withSeconds !== newSetting) {
            this._withSeconds = newSetting;
            this.rerender();
        }
    }
    get Minimum() { return this._Minimum; }
    set Minimum(newSetting) {
        allowStringMatching('earliest time', newSetting, WAT_TimeRegExp);
        if (this._Minimum !== newSetting) {
            this._Minimum = newSetting;
            this.rerender();
        }
    }
    get Maximum() { return this._Maximum; }
    set Maximum(newSetting) {
        allowStringMatching('latest time', newSetting, WAT_TimeRegExp);
        if (this._Maximum !== newSetting) {
            this._Maximum = newSetting;
            this.rerender();
        }
    }
    get Suggestions() {
        return (this._Suggestions == null ? this._Suggestions : this._Suggestions.slice());
    }
    set Suggestions(newSetting) {
        allowListSatisfying('suggestion list', newSetting, WAT_TimeMatcher);
        if (ValuesDiffer(this._Suggestions, newSetting)) {
            this._Suggestions = (newSetting == null ? newSetting : newSetting.slice());
            this.rerender();
        }
    }
    /**** _serializeConfigurationInto ****/
    _serializeConfigurationInto(Serialization) {
        super._serializeConfigurationInto(Serialization);
        [
            'readonly', 'withSeconds', 'Minimum', 'Maximum', 'Suggestions'
        ].forEach((Name) => this._serializePropertyInto(Name, Serialization));
    }
    /**** _deserializeConfigurationFrom ****/
    _deserializeConfigurationFrom(Serialization) {
        super._deserializeConfigurationFrom(Serialization);
        this._readonly = acceptableBoolean(Serialization.readonly, false);
        this._withSeconds = acceptableBoolean(Serialization.withSeconds, false);
        this._Minimum = acceptableOptionalStringMatching(Serialization.Minimum, undefined, WAT_TimeRegExp);
        this._Maximum = acceptableOptionalStringMatching(Serialization.Maximum, undefined, WAT_TimeRegExp);
        this._Suggestions = acceptableOptionalListSatisfying(Serialization.Suggestions, undefined, WAT_TimeMatcher);
    }
}
builtInWidgetTypes['TimeInput'] = WAT_TimeInput;
appendStyle(`
  .WAT.Widget > .WAT.TimeInput {
    left:1px; top:1px; right:1px; bottom:1px; width:auto; height:auto;
    border:solid 1px #888888; border-radius:2px;
    background:#e8f0ff;
    padding:0px 2px 0px 2px;
  }

  .WAT.Widget > .WAT.TimeInput:read-only {
    border:solid 1px #DDDDDD; border-radius:2px;
    background:#F0F0F0;
  }
  `);
/**** DateTimeInput ****/
export const WAT_DateTimePattern = '\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}';
export const WAT_DateTimeRegExp = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/;
export function WAT_DateTimeMatcher(Value) {
    return ValueIsStringMatching(Value, WAT_DateTimeRegExp);
}
export class WAT_DateTimeInput extends WAT_Widget {
    constructor(Page) {
        super(Page);
        /**** readonly ****/
        Object.defineProperty(this, "_readonly", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        /**** withSeconds ****/
        Object.defineProperty(this, "_withSeconds", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        /**** Minimum ****/
        Object.defineProperty(this, "_Minimum", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**** Maximum ****/
        Object.defineProperty(this, "_Maximum", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**** Suggestions ****/
        Object.defineProperty(this, "_Suggestions", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**** Renderer ****/
        Object.defineProperty(this, "_shownValue", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ''
        });
        Object.defineProperty(this, "_InputElement", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: createRef()
        });
        Object.defineProperty(this, "_Renderer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                const { Value, Enabling } = this;
                /**** handle external changes ****/
                let ValueToShow = acceptableStringMatching(Value, '', WAT_DateTimeRegExp);
                if ((this._InputElement.current != null) &&
                    (document.activeElement === this._InputElement.current)) {
                    ValueToShow = this._shownValue;
                }
                else {
                    this._shownValue = ValueToShow;
                }
                const _onInput = (Event) => {
                    if (Enabling === false) {
                        return consumingEvent(Event);
                    }
                    this._shownValue = this.Value = Event.target.value;
                    if (this._onInput != null) {
                        this._onInput_(Event);
                    } // no typo!
                };
                const _onBlur = (Event) => {
                    this.rerender();
                    if (this._onBlur != null) {
                        this._onBlur_(Event);
                    } // no typo!
                };
                /**** process any other parameters ****/
                const readonly = acceptableOptionalBoolean(this._readonly);
                const withSeconds = acceptableOptionalBoolean(this._withSeconds);
                const Minimum = acceptableOptionalStringMatching(this._Minimum, undefined, WAT_DateTimeRegExp);
                const Maximum = acceptableOptionalStringMatching(this._Maximum, undefined, WAT_DateTimeRegExp);
                const Suggestions = acceptableOptionalListSatisfying(this._Suggestions, undefined, WAT_DateTimeMatcher);
                let SuggestionList = '', SuggestionId;
                if ((Suggestions != null) && (Suggestions.length > 0)) {
                    SuggestionId = IdOfWidget(this) + '-Suggestions';
                    SuggestionList = html `<datalist id=${SuggestionId}>
          ${Suggestions.map((Value) => html `<option value=${Value}></option>`)}
        </datalist>`;
                }
                /**** actual rendering ****/
                return html `<input type="datetime-local" class="WAT Content DateTimeInput"
        value=${ValueToShow} min=${Minimum} max=${Maximum}
        step=${withSeconds ? 1 : 60}
        readOnly=${readonly} pattern=${WAT_DateTimePattern}
        disabled=${Enabling === false} onInput=${_onInput} onBlur=${_onBlur}
        list=${SuggestionId}
      />${SuggestionList}`;
            }
        });
    }
    get Type() { return 'DateTimeInput'; }
    set Type(_) { throwReadOnlyError('Type'); }
    get readonly() { return this._readonly; }
    set readonly(newSetting) {
        allowBoolean('readonly setting', newSetting);
        if (this._readonly !== newSetting) {
            this._readonly = newSetting;
            this.rerender();
        }
    }
    get withSeconds() { return this._withSeconds; }
    set withSeconds(newSetting) {
        allowBoolean('seconds display setting', newSetting);
        if (this._withSeconds !== newSetting) {
            this._withSeconds = newSetting;
            this.rerender();
        }
    }
    get Minimum() { return this._Minimum; }
    set Minimum(newSetting) {
        allowStringMatching('earliest point in time', newSetting, WAT_DateTimeRegExp);
        if (this._Minimum !== newSetting) {
            this._Minimum = newSetting;
            this.rerender();
        }
    }
    get Maximum() { return this._Maximum; }
    set Maximum(newSetting) {
        allowStringMatching('latest point in time', newSetting, WAT_DateTimeRegExp);
        if (this._Maximum !== newSetting) {
            this._Maximum = newSetting;
            this.rerender();
        }
    }
    get Suggestions() {
        return (this._Suggestions == null ? this._Suggestions : this._Suggestions.slice());
    }
    set Suggestions(newSetting) {
        allowListSatisfying('suggestion list', newSetting, WAT_DateTimeMatcher);
        if (ValuesDiffer(this._Suggestions, newSetting)) {
            this._Suggestions = (newSetting == null ? newSetting : newSetting.slice());
            this.rerender();
        }
    }
    /**** _serializeConfigurationInto ****/
    _serializeConfigurationInto(Serialization) {
        super._serializeConfigurationInto(Serialization);
        [
            'readonly', 'withSeconds', 'Minimum', 'Maximum', 'Suggestions'
        ].forEach((Name) => this._serializePropertyInto(Name, Serialization));
    }
    /**** _deserializeConfigurationFrom ****/
    _deserializeConfigurationFrom(Serialization) {
        super._deserializeConfigurationFrom(Serialization);
        this._readonly = acceptableBoolean(Serialization.readonly, false);
        this._withSeconds = acceptableBoolean(Serialization.withSeconds, false);
        this._Minimum = acceptableOptionalStringMatching(Serialization.Minimum, undefined, WAT_DateTimeRegExp);
        this._Maximum = acceptableOptionalStringMatching(Serialization.Maximum, undefined, WAT_DateTimeRegExp);
        this._Suggestions = acceptableOptionalListSatisfying(Serialization.Suggestions, undefined, WAT_DateTimeMatcher);
    }
}
builtInWidgetTypes['DateTimeInput'] = WAT_DateTimeInput;
appendStyle(`
  .WAT.Widget > .WAT.DateTimeInput {
    left:1px; top:1px; right:1px; bottom:1px; width:auto; height:auto;
    border:solid 1px #888888; border-radius:2px;
    background:#e8f0ff;
    padding:0px 2px 0px 2px;
  }

  .WAT.Widget > .WAT.DateTimeInput:read-only {
    border:solid 1px #DDDDDD; border-radius:2px;
    background:#F0F0F0;
  }
  `);
/**** DateInput ****/
export const WAT_DatePattern = '\\d{4}-\\d{2}-\\d{2}';
export const WAT_DateRegExp = /\d{4}-\d{2}-\d{2}/;
export function WAT_DateMatcher(Value) {
    return ValueIsStringMatching(Value, WAT_DateRegExp);
}
export class WAT_DateInput extends WAT_Widget {
    constructor(Page) {
        super(Page);
        /**** readonly ****/
        Object.defineProperty(this, "_readonly", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        /**** Minimum ****/
        Object.defineProperty(this, "_Minimum", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**** Maximum ****/
        Object.defineProperty(this, "_Maximum", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**** Suggestions ****/
        Object.defineProperty(this, "_Suggestions", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**** Renderer ****/
        Object.defineProperty(this, "_shownValue", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ''
        });
        Object.defineProperty(this, "_InputElement", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: createRef()
        });
        Object.defineProperty(this, "_Renderer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                const { Value, Enabling } = this;
                /**** handle external changes ****/
                let ValueToShow = acceptableStringMatching(Value, '', WAT_DateRegExp);
                if ((this._InputElement.current != null) &&
                    (document.activeElement === this._InputElement.current)) {
                    ValueToShow = this._shownValue;
                }
                else {
                    this._shownValue = ValueToShow;
                }
                const _onInput = (Event) => {
                    if (Enabling === false) {
                        return consumingEvent(Event);
                    }
                    this._shownValue = this.Value = Event.target.value;
                    if (this._onInput != null) {
                        this._onInput_(Event);
                    } // no typo!
                };
                const _onBlur = (Event) => {
                    this.rerender();
                    if (this._onBlur != null) {
                        this._onBlur_(Event);
                    } // no typo!
                };
                /**** process any other parameters ****/
                const readonly = acceptableOptionalBoolean(this._readonly);
                const Minimum = acceptableOptionalStringMatching(this._Minimum, undefined, WAT_DateRegExp);
                const Maximum = acceptableOptionalStringMatching(this._Maximum, undefined, WAT_DateRegExp);
                const Suggestions = acceptableOptionalListSatisfying(this._Suggestions, undefined, WAT_DateMatcher);
                let SuggestionList = '', SuggestionId;
                if ((Suggestions != null) && (Suggestions.length > 0)) {
                    SuggestionId = IdOfWidget(this) + '-Suggestions';
                    SuggestionList = html `<datalist id=${SuggestionId}>
          ${Suggestions.map((Value) => html `<option value=${Value}></option>`)}
        </datalist>`;
                }
                /**** actual rendering ****/
                return html `<input type="date" class="WAT Content DateInput"
        value=${ValueToShow} min=${Minimum} max=${Maximum}
        readOnly=${readonly} pattern=${WAT_DatePattern}
        disabled=${Enabling === false} onInput=${_onInput} onBlur=${_onBlur}
        list=${SuggestionId}
      />${SuggestionList}`;
            }
        });
    }
    get Type() { return 'DateInput'; }
    set Type(_) { throwReadOnlyError('Type'); }
    get readonly() { return this._readonly; }
    set readonly(newSetting) {
        allowBoolean('readonly setting', newSetting);
        if (this._readonly !== newSetting) {
            this._readonly = newSetting;
            this.rerender();
        }
    }
    get Minimum() { return this._Minimum; }
    set Minimum(newSetting) {
        allowStringMatching('earliest date', newSetting, WAT_DateRegExp);
        if (this._Minimum !== newSetting) {
            this._Minimum = newSetting;
            this.rerender();
        }
    }
    get Maximum() { return this._Maximum; }
    set Maximum(newSetting) {
        allowStringMatching('latest date', newSetting, WAT_DateRegExp);
        if (this._Maximum !== newSetting) {
            this._Maximum = newSetting;
            this.rerender();
        }
    }
    get Suggestions() {
        return (this._Suggestions == null ? this._Suggestions : this._Suggestions.slice());
    }
    set Suggestions(newSetting) {
        allowListSatisfying('suggestion list', newSetting, WAT_DateMatcher);
        if (ValuesDiffer(this._Suggestions, newSetting)) {
            this._Suggestions = (newSetting == null ? newSetting : newSetting.slice());
            this.rerender();
        }
    }
    /**** _serializeConfigurationInto ****/
    _serializeConfigurationInto(Serialization) {
        super._serializeConfigurationInto(Serialization);
        [
            'readonly', 'withSeconds', 'Minimum', 'Maximum', 'Suggestions'
        ].forEach((Name) => this._serializePropertyInto(Name, Serialization));
    }
    /**** _deserializeConfigurationFrom ****/
    _deserializeConfigurationFrom(Serialization) {
        super._deserializeConfigurationFrom(Serialization);
        this._readonly = acceptableBoolean(Serialization.readonly, false);
        this._Minimum = acceptableOptionalStringMatching(Serialization.Minimum, undefined, WAT_DateRegExp);
        this._Maximum = acceptableOptionalStringMatching(Serialization.Maximum, undefined, WAT_DateRegExp);
        this._Suggestions = acceptableOptionalListSatisfying(Serialization.Suggestions, undefined, WAT_DateMatcher);
    }
}
builtInWidgetTypes['DateInput'] = WAT_DateInput;
appendStyle(`
  .WAT.Widget > .WAT.DateInput {
    left:1px; top:1px; right:1px; bottom:1px; width:auto; height:auto;
    border:solid 1px #888888; border-radius:2px;
    background:#e8f0ff;
    padding:0px 2px 0px 2px;
  }

  .WAT.Widget > .WAT.DateInput:read-only {
    border:solid 1px #DDDDDD; border-radius:2px;
    background:#F0F0F0;
  }
  `);
/**** WeekInput ****/
export const WAT_WeekPattern = '\\d{4}-W\\d{2}';
export const WAT_WeekRegExp = /\d{4}-W\d{2}/;
export function WAT_WeekMatcher(Value) {
    return ValueIsStringMatching(Value, WAT_WeekRegExp);
}
export class WAT_WeekInput extends WAT_Widget {
    constructor(Page) {
        super(Page);
        /**** readonly ****/
        Object.defineProperty(this, "_readonly", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        /**** Minimum ****/
        Object.defineProperty(this, "_Minimum", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**** Maximum ****/
        Object.defineProperty(this, "_Maximum", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**** Suggestions ****/
        Object.defineProperty(this, "_Suggestions", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**** Renderer ****/
        Object.defineProperty(this, "_shownValue", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ''
        });
        Object.defineProperty(this, "_InputElement", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: createRef()
        });
        Object.defineProperty(this, "_Renderer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                const { Value, Enabling } = this;
                /**** handle external changes ****/
                let ValueToShow = acceptableStringMatching(Value, '', WAT_WeekRegExp);
                if ((this._InputElement.current != null) &&
                    (document.activeElement === this._InputElement.current)) {
                    ValueToShow = this._shownValue;
                }
                else {
                    this._shownValue = ValueToShow;
                }
                const _onInput = (Event) => {
                    if (Enabling === false) {
                        return consumingEvent(Event);
                    }
                    this._shownValue = this.Value = Event.target.value;
                    if (this._onInput != null) {
                        this._onInput_(Event);
                    } // no typo!
                };
                const _onBlur = (Event) => {
                    this.rerender();
                    if (this._onBlur != null) {
                        this._onBlur_(Event);
                    } // no typo!
                };
                /**** process any other parameters ****/
                const readonly = acceptableOptionalBoolean(this._readonly);
                const Minimum = acceptableOptionalStringMatching(this._Minimum, undefined, WAT_WeekRegExp);
                const Maximum = acceptableOptionalStringMatching(this._Maximum, undefined, WAT_WeekRegExp);
                const Suggestions = acceptableOptionalListSatisfying(this._Suggestions, undefined, WAT_WeekMatcher);
                let SuggestionList = '', SuggestionId;
                if ((Suggestions != null) && (Suggestions.length > 0)) {
                    SuggestionId = IdOfWidget(this) + '-Suggestions';
                    SuggestionList = html `<datalist id=${SuggestionId}>
          ${Suggestions.map((Value) => html `<option value=${Value}></option>`)}
        </datalist>`;
                }
                /**** actual rendering ****/
                return html `<input type="week" class="WAT Content WeekInput"
        value=${Value} min=${Minimum} max=${Maximum}
        readOnly=${readonly} pattern=${WAT_WeekPattern}
        disabled=${Enabling === false} onInput=${_onInput} onBlur=${_onBlur}
        list=${SuggestionId}
      />${SuggestionList}`;
            }
        });
    }
    get Type() { return 'WeekInput'; }
    set Type(_) { throwReadOnlyError('Type'); }
    get readonly() { return this._readonly; }
    set readonly(newSetting) {
        allowBoolean('readonly setting', newSetting);
        if (this._readonly !== newSetting) {
            this._readonly = newSetting;
            this.rerender();
        }
    }
    get Minimum() { return this._Minimum; }
    set Minimum(newSetting) {
        allowStringMatching('earliest week', newSetting, WAT_WeekRegExp);
        if (this._Minimum !== newSetting) {
            this._Minimum = newSetting;
            this.rerender();
        }
    }
    get Maximum() { return this._Maximum; }
    set Maximum(newSetting) {
        allowStringMatching('latest week', newSetting, WAT_WeekRegExp);
        if (this._Maximum !== newSetting) {
            this._Maximum = newSetting;
            this.rerender();
        }
    }
    get Suggestions() {
        return (this._Suggestions == null ? this._Suggestions : this._Suggestions.slice());
    }
    set Suggestions(newSetting) {
        allowListSatisfying('suggestion list', newSetting, WAT_WeekMatcher);
        if (ValuesDiffer(this._Suggestions, newSetting)) {
            this._Suggestions = (newSetting == null ? newSetting : newSetting.slice());
            this.rerender();
        }
    }
    /**** _serializeConfigurationInto ****/
    _serializeConfigurationInto(Serialization) {
        super._serializeConfigurationInto(Serialization);
        [
            'readonly', 'withSeconds', 'Minimum', 'Maximum', 'Suggestions'
        ].forEach((Name) => this._serializePropertyInto(Name, Serialization));
    }
    /**** _deserializeConfigurationFrom ****/
    _deserializeConfigurationFrom(Serialization) {
        super._deserializeConfigurationFrom(Serialization);
        this._readonly = acceptableBoolean(Serialization.readonly, false);
        this._Minimum = acceptableOptionalStringMatching(Serialization.Minimum, undefined, WAT_WeekRegExp);
        this._Maximum = acceptableOptionalStringMatching(Serialization.Maximum, undefined, WAT_WeekRegExp);
        this._Suggestions = acceptableOptionalListSatisfying(Serialization.Suggestions, undefined, WAT_WeekMatcher);
    }
}
builtInWidgetTypes['WeekInput'] = WAT_WeekInput;
appendStyle(`
  .WAT.Widget > .WAT.WeekInput {
    left:1px; top:1px; right:1px; bottom:1px; width:auto; height:auto;
    border:solid 1px #888888; border-radius:2px;
    background:#e8f0ff;
    padding:0px 2px 0px 2px;
  }

  .WAT.Widget > .WAT.WeekInput:read-only {
    border:solid 1px #DDDDDD; border-radius:2px;
    background:#F0F0F0;
  }
  `);
/**** MonthInput ****/
export const WAT_MonthPattern = '\\d{4}-\\d{2}';
export const WAT_MonthRegExp = /\d{4}-\d{2}/;
export function WAT_MonthMatcher(Value) {
    return ValueIsStringMatching(Value, WAT_MonthRegExp);
}
export class WAT_MonthInput extends WAT_Widget {
    constructor(Page) {
        super(Page);
        /**** readonly ****/
        Object.defineProperty(this, "_readonly", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        /**** Minimum ****/
        Object.defineProperty(this, "_Minimum", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**** Maximum ****/
        Object.defineProperty(this, "_Maximum", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**** Suggestions ****/
        Object.defineProperty(this, "_Suggestions", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**** Renderer ****/
        Object.defineProperty(this, "_shownValue", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ''
        });
        Object.defineProperty(this, "_InputElement", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: createRef()
        });
        Object.defineProperty(this, "_Renderer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                const { Value, Enabling } = this;
                /**** handle external changes ****/
                let ValueToShow = acceptableStringMatching(Value, '', WAT_MonthRegExp);
                if ((this._InputElement.current != null) &&
                    (document.activeElement === this._InputElement.current)) {
                    ValueToShow = this._shownValue;
                }
                else {
                    this._shownValue = ValueToShow;
                }
                const _onInput = (Event) => {
                    if (Enabling === false) {
                        return consumingEvent(Event);
                    }
                    this._shownValue = this.Value = Event.target.value;
                    if (this._onInput != null) {
                        this._onInput_(Event);
                    } // no typo!
                };
                const _onBlur = (Event) => {
                    this.rerender();
                    if (this._onBlur != null) {
                        this._onBlur_(Event);
                    } // no typo!
                };
                /**** process any other parameters ****/
                const readonly = acceptableOptionalBoolean(this._readonly);
                const Minimum = acceptableOptionalStringMatching(this._Minimum, undefined, WAT_MonthRegExp);
                const Maximum = acceptableOptionalStringMatching(this._Maximum, undefined, WAT_MonthRegExp);
                const Suggestions = acceptableOptionalListSatisfying(this._Suggestions, undefined, WAT_MonthMatcher);
                let SuggestionList = '', SuggestionId;
                if ((Suggestions != null) && (Suggestions.length > 0)) {
                    SuggestionId = IdOfWidget(this) + '-Suggestions';
                    SuggestionList = html `<datalist id=${SuggestionId}>
          ${Suggestions.map((Value) => html `<option value=${Value}></option>`)}
        </datalist>`;
                }
                /**** actual rendering ****/
                return html `<input type="month" class="WAT Content MonthInput"
        value=${ValueToShow} min=${Minimum} max=${Maximum}
        readOnly=${readonly} pattern=${WAT_MonthPattern}
        disabled=${Enabling === false} onInput=${_onInput} onBlur=${_onBlur}
        list=${SuggestionId}
      />${SuggestionList}`;
            }
        });
    }
    get Type() { return 'MonthInput'; }
    set Type(_) { throwReadOnlyError('Type'); }
    get readonly() { return this._readonly; }
    set readonly(newSetting) {
        allowBoolean('readonly setting', newSetting);
        if (this._readonly !== newSetting) {
            this._readonly = newSetting;
            this.rerender();
        }
    }
    get Minimum() { return this._Minimum; }
    set Minimum(newSetting) {
        allowStringMatching('earliest month', newSetting, WAT_MonthRegExp);
        if (this._Minimum !== newSetting) {
            this._Minimum = newSetting;
            this.rerender();
        }
    }
    get Maximum() { return this._Maximum; }
    set Maximum(newSetting) {
        allowStringMatching('latest month', newSetting, WAT_MonthRegExp);
        if (this._Maximum !== newSetting) {
            this._Maximum = newSetting;
            this.rerender();
        }
    }
    get Suggestions() {
        return (this._Suggestions == null ? this._Suggestions : this._Suggestions.slice());
    }
    set Suggestions(newSetting) {
        allowListSatisfying('suggestion list', newSetting, WAT_MonthMatcher);
        if (ValuesDiffer(this._Suggestions, newSetting)) {
            this._Suggestions = (newSetting == null ? newSetting : newSetting.slice());
            this.rerender();
        }
    }
    /**** _serializeConfigurationInto ****/
    _serializeConfigurationInto(Serialization) {
        super._serializeConfigurationInto(Serialization);
        [
            'readonly', 'withSeconds', 'Minimum', 'Maximum', 'Suggestions'
        ].forEach((Name) => this._serializePropertyInto(Name, Serialization));
    }
    /**** _deserializeConfigurationFrom ****/
    _deserializeConfigurationFrom(Serialization) {
        super._deserializeConfigurationFrom(Serialization);
        this._readonly = acceptableBoolean(Serialization.readonly, false);
        this._Minimum = acceptableOptionalStringMatching(Serialization.Minimum, undefined, WAT_MonthRegExp);
        this._Maximum = acceptableOptionalStringMatching(Serialization.Maximum, undefined, WAT_MonthRegExp);
        this._Suggestions = acceptableOptionalListSatisfying(Serialization.Suggestions, undefined, WAT_MonthMatcher);
    }
}
builtInWidgetTypes['MonthInput'] = WAT_MonthInput;
appendStyle(`
  .WAT.Widget > .WAT.MonthInput {
    left:1px; top:1px; right:1px; bottom:1px; width:auto; height:auto;
    border:solid 1px #888888; border-radius:2px;
    background:#e8f0ff;
    padding:0px 2px 0px 2px;
  }

  .WAT.Widget > .WAT.MonthInput:read-only {
    border:solid 1px #DDDDDD; border-radius:2px;
    background:#F0F0F0;
  }
  `);
/**** FileInput ****/
export class WAT_FileInput extends WAT_Widget {
    constructor(Page) {
        super(Page);
        /**** Placeholder ****/
        Object.defineProperty(this, "_Placeholder", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**** allowMultiple ****/
        Object.defineProperty(this, "_allowMultiple", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        /**** acceptableTypes ****/
        Object.defineProperty(this, "_acceptableTypes", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**** Renderer ****/
        Object.defineProperty(this, "_Renderer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                const Value = acceptableText(this._Value, '').trim().replace(/[\n\r]+/g, ',');
                const Placeholder = acceptableTextline(this._Placeholder, '').trim();
                const acceptableTypes = acceptableOptionalTextline(this._acceptableTypes, '*');
                const allowMultiple = acceptableOptionalBoolean(this._allowMultiple);
                const _onInput = (Event) => {
                    if (this.Enabling === false) {
                        return consumingEvent(Event);
                    }
                    this.Value = Array.from(Event.target.files).map((File) => File.name).join('\n');
                    // @ts-ignore TS2445 well, this object *is* a subinstance of WAT_Widget
                    if (this._onInput != null) {
                        this._onInput_(Event);
                    } // no typo!
                };
                const _onDragEnter = (Event) => { return consumingEvent(Event); };
                const _onDragOver = (Event) => { return consumingEvent(Event); };
                const _onDrop = (Event) => {
                    consumeEvent(Event);
                    if (this.Enabling === false) {
                        return;
                    }
                    this.Value = Array.from(Event.dataTransfer.files).map((File) => File.name).join('\n');
                    // @ts-ignore TS2445 well, this object *is* a subinstance of WAT_Widget
                    this._onDrop_(Event, Event.dataTransfer.files);
                }; // nota bene: "files" is now in "Event.dataTransfer.files"
                /**** actual rendering ****/
                return html `<label class="WAT Content FileInput"
        onDragEnter=${_onDragEnter} onDragOver=${_onDragOver} onDrop=${_onDrop}
      >
        ${Value === ''
                    ? this._Placeholder === '' ? '' : html `<span style="
              font-size:${Math.round((this.FontSize || 14) * 0.95)}px; line-height:${this.Height}px
            ">${Placeholder}</span>`
                    : html `<span style="line-height:${this.Height}px">${Value}</span>`}
        <input type="file" style="display:none"
          multiple=${allowMultiple} accept=${acceptableTypes}
          disabled=${this.Enabling === false} onInput=${_onInput}
        />
      </label>`;
            }
        });
    }
    get Type() { return 'FileInput'; }
    set Type(_) { throwReadOnlyError('Type'); }
    get Placeholder() { return this._Placeholder; }
    set Placeholder(newSetting) {
        allowTextline('placeholder', newSetting);
        if (this._Placeholder !== newSetting) {
            this._Placeholder = newSetting;
            this.rerender();
        }
    }
    get allowMultiple() { return this._allowMultiple; }
    set allowMultiple(newSetting) {
        allowBoolean('"allowMultiple" setting', newSetting);
        if (this._allowMultiple !== newSetting) {
            this._allowMultiple = newSetting;
            this.rerender();
        }
    }
    get acceptableTypes() { return this._acceptableTypes; }
    set acceptableTypes(newSetting) {
        allowTextline('acceptable file types', newSetting);
        if (this._acceptableTypes !== newSetting) {
            this._acceptableTypes = newSetting;
            this.rerender();
        }
    }
    /**** _serializeConfigurationInto ****/
    _serializeConfigurationInto(Serialization) {
        super._serializeConfigurationInto(Serialization);
        [
            'Placeholder', 'acceptableTypes', 'allowMultiple'
        ].forEach((Name) => this._serializePropertyInto(Name, Serialization));
    }
    /**** _deserializeConfigurationFrom ****/
    _deserializeConfigurationFrom(Serialization) {
        super._deserializeConfigurationFrom(Serialization);
        this._Placeholder = acceptableTextline(Serialization.Placeholder, '').trim();
        this._acceptableTypes = acceptableTextline(Serialization.acceptableTypes, '*');
        this._allowMultiple = acceptableBoolean(Serialization.allowMultiple, false);
    }
}
builtInWidgetTypes['FileInput'] = WAT_FileInput;
appendStyle(`
  .WAT.Widget > .WAT.FileInput {
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
  }
  `);
/**** PseudoFileInput ****/
export class WAT_PseudoFileInput extends WAT_Widget {
    constructor(Page) {
        super(Page);
        /**** Icon ****/
        Object.defineProperty(this, "_Icon", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**** allowMultiple ****/
        Object.defineProperty(this, "_allowMultiple", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        /**** acceptableTypes ****/
        Object.defineProperty(this, "_acceptableTypes", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**** Renderer ****/
        Object.defineProperty(this, "_Renderer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                const Icon = acceptableURL(this._Icon, `${IconFolder}/arrow-up-from-bracket.png`);
                const Color = acceptableColor(this._Color, 'black');
                const acceptableTypes = acceptableOptionalTextline(this._acceptableTypes, '*');
                const allowMultiple = acceptableOptionalBoolean(this._allowMultiple);
                const _onInput = (Event) => {
                    if (this.Enabling == false) {
                        return consumingEvent(Event);
                    }
                    this.Value = Array.from(Event.target.files).map((File) => File.name).join('\n');
                    // @ts-ignore TS2445 well, this object *is* a subinstance of WAT_Widget
                    if (this._onInput != null) {
                        this._onInput_(Event);
                    } // no typo!
                };
                return html `<label class="WAT Content PseudoFileInput">
        <div style="
          -webkit-mask-image:url(${Icon}); mask-image:url(${Icon});
          background-color:${Color};
        "></div>
        <input type="file" style="display:none"
          multiple=${allowMultiple} accept=${acceptableTypes}
          disabled=${this.Enabling === false} onInput=${_onInput}
        />
      </label>`;
            }
        });
    }
    get Type() { return 'PseudoFileInput'; }
    set Type(_) { throwReadOnlyError('Type'); }
    get Icon() { return this._Icon; }
    set Icon(newSetting) {
        allowURL('icon image ULR', newSetting);
        if (this._Icon !== newSetting) {
            this._Icon = newSetting;
            this.rerender();
        }
    }
    get allowMultiple() { return this._allowMultiple; }
    set allowMultiple(newSetting) {
        allowBoolean('"allowMultiple" setting', newSetting);
        if (this._allowMultiple !== newSetting) {
            this._allowMultiple = newSetting;
            this.rerender();
        }
    }
    get acceptableTypes() { return this._acceptableTypes; }
    set acceptableTypes(newSetting) {
        allowTextline('acceptable file types', newSetting);
        if (this._acceptableTypes !== newSetting) {
            this._acceptableTypes = newSetting;
            this.rerender();
        }
    }
    /**** _serializeConfigurationInto ****/
    _serializeConfigurationInto(Serialization) {
        super._serializeConfigurationInto(Serialization);
        [
            'Icon', 'acceptableTypes', 'allowMultiple'
        ].forEach((Name) => this._serializePropertyInto(Name, Serialization));
    }
    /**** _deserializeConfigurationFrom ****/
    _deserializeConfigurationFrom(Serialization) {
        super._deserializeConfigurationFrom(Serialization);
        this._Icon = acceptableURL(Serialization.Icon, `${IconFolder}/arrow-up-from-bracket.png`);
        this._acceptableTypes = acceptableTextline(Serialization.acceptableTypes, '*');
        this._allowMultiple = acceptableBoolean(Serialization.allowMultiple, false);
    }
}
builtInWidgetTypes['PseudoFileInput'] = WAT_PseudoFileInput;
appendStyle(`
  .WAT.Widget > .WAT.PseudoFileInput > div {
    display:block; position:absolute;
    left:0px; top:0px; right:0px; bottom:0px;
    -webkit-mask-size:contain;           mask-size:contain;
    -webkit-mask-position:center center; mask-position:center center;
  }
  `);
/**** FileDropArea ****/
export class WAT_FileDropArea extends WAT_Widget {
    constructor(Page) {
        super(Page);
        /**** Placeholder ****/
        Object.defineProperty(this, "_Placeholder", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**** allowMultiple ****/
        Object.defineProperty(this, "_allowMultiple", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        /**** acceptableTypes ****/
        Object.defineProperty(this, "_acceptableTypes", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**** Renderer ****/
        Object.defineProperty(this, "_Renderer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                const Placeholder = acceptableTextline(this._Placeholder, '').trim();
                const acceptableTypes = acceptableOptionalTextline(this._acceptableTypes, '*');
                const allowMultiple = acceptableOptionalBoolean(this._allowMultiple);
                const _onInput = (Event) => {
                    if (this.Enabling == false) {
                        return consumingEvent(Event);
                    }
                    this.Value = Array.from(Event.target.files).map((File) => File.name).join('\n');
                    // @ts-ignore TS2445 well, this object *is* a subinstance of SNS_Sticker
                    if (this._onInput != null) {
                        this._onInput_(Event);
                    } // no typo!
                };
                const _onDragEnter = (Event) => { return consumingEvent(Event); };
                const _onDragOver = (Event) => { return consumingEvent(Event); };
                const _onDrop = (Event) => {
                    consumeEvent(Event);
                    if (this.Enabling == false) {
                        return;
                    }
                    this.Value = Array.from(Event.dataTransfer.files).map((File) => File.name).join('\n');
                    // @ts-ignore TS2445 well, this object *is* a subinstance of WAT_Widget
                    this._onDrop_(Event, Event.dataTransfer.files);
                }; // nota bene: "files" is now in "Event.dataTransfer.files"
                return html `<label class="WAT Content FileDropArea"
        onDragEnter=${_onDragEnter} onDragOver=${_onDragOver} onDrop=${_onDrop}>
        <span>${Placeholder}</span>
        <input type="file"
          multiple=${allowMultiple} accept=${acceptableTypes}
          disabled=${this.Enabling === false} onInput=${_onInput}
        />
      </label>`;
            }
        });
    }
    get Type() { return 'FileDropArea'; }
    set Type(_) { throwReadOnlyError('Type'); }
    get Placeholder() { return this._Placeholder; }
    set Placeholder(newSetting) {
        allowTextline('placeholder', newSetting);
        if (this._Placeholder !== newSetting) {
            this._Placeholder = newSetting;
            this.rerender();
        }
    }
    get allowMultiple() { return this._allowMultiple; }
    set allowMultiple(newSetting) {
        allowBoolean('"allowMultiple" setting', newSetting);
        if (this._allowMultiple !== newSetting) {
            this._allowMultiple = newSetting;
            this.rerender();
        }
    }
    get acceptableTypes() { return this._acceptableTypes; }
    set acceptableTypes(newSetting) {
        allowTextline('acceptable file types', newSetting);
        if (this._acceptableTypes !== newSetting) {
            this._acceptableTypes = newSetting;
            this.rerender();
        }
    }
    /**** _serializeConfigurationInto ****/
    _serializeConfigurationInto(Serialization) {
        super._serializeConfigurationInto(Serialization);
        [
            'Placeholder', 'acceptableTypes', 'allowMultiple'
        ].forEach((Name) => this._serializePropertyInto(Name, Serialization));
    }
    /**** _deserializeConfigurationFrom ****/
    _deserializeConfigurationFrom(Serialization) {
        super._deserializeConfigurationFrom(Serialization);
        this._Placeholder = acceptableTextline(Serialization.Placeholder, '').trim();
        this._acceptableTypes = acceptableTextline(Serialization.acceptableTypes, '*');
        this._allowMultiple = acceptableBoolean(Serialization.allowMultiple, false);
    }
}
builtInWidgetTypes['FileDropArea'] = WAT_FileDropArea;
appendStyle(`
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
/**** SearchInput ****/
export class WAT_SearchInput extends WAT_Widget {
    constructor(Page) {
        super(Page);
        /**** Placeholder ****/
        Object.defineProperty(this, "_Placeholder", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**** readonly ****/
        Object.defineProperty(this, "_readonly", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        /**** minLength ****/
        Object.defineProperty(this, "_minLength", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**** maxLength ****/
        Object.defineProperty(this, "_maxLength", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**** Pattern ****/
        Object.defineProperty(this, "_Pattern", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**** SpellChecking ****/
        Object.defineProperty(this, "_SpellChecking", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        /**** Suggestions ****/
        Object.defineProperty(this, "_Suggestions", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**** Renderer ****/
        Object.defineProperty(this, "_shownValue", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ''
        });
        Object.defineProperty(this, "_InputElement", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: createRef()
        });
        Object.defineProperty(this, "_Renderer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                const { Value, Enabling } = this;
                /**** handle external changes ****/
                let ValueToShow = acceptableTextline(Value, '');
                if ((this._InputElement.current != null) &&
                    (document.activeElement === this._InputElement.current)) {
                    ValueToShow = this._shownValue;
                }
                else {
                    this._shownValue = ValueToShow;
                }
                const _onInput = (Event) => {
                    if (Enabling === false) {
                        return consumingEvent(Event);
                    }
                    this._shownValue = this.Value = Event.target.value;
                    if (this._onInput != null) {
                        this._onInput_(Event);
                    } // no typo!
                };
                const _onBlur = (Event) => {
                    this.rerender();
                    if (this._onBlur != null) {
                        this._onBlur_(Event);
                    } // no typo!
                };
                /**** process any other parameters ****/
                const Placeholder = acceptableOptionalTextline(this._Placeholder);
                const readonly = acceptableOptionalBoolean(this._readonly);
                const minLength = acceptableOptionalOrdinal(this._minLength);
                const maxLength = acceptableOptionalOrdinal(this._maxLength);
                const Pattern = acceptableOptionalTextline(this._Pattern);
                const SpellChecking = acceptableOptionalBoolean(this._SpellChecking);
                const Suggestions = acceptableOptionalListSatisfying(this._Suggestions, undefined, ValueIsTextline);
                let SuggestionList = '', SuggestionId;
                if ((Suggestions != null) && (Suggestions.length > 0)) {
                    SuggestionId = IdOfWidget(this) + '-Suggestions';
                    SuggestionList = html `<datalist id=${SuggestionId}>
          ${Suggestions.map((Value) => html `<option value=${Value}></option>`)}
        </datalist>`;
                }
                /**** actual rendering ****/
                return html `<input type="search" class="WAT Content SearchInput"
        value=${ValueToShow} minlength=${minLength} maxlength=${maxLength}
        readOnly=${readonly} placeholder=${Placeholder}
        pattern=${Pattern} spellcheck=${SpellChecking}
        disabled=${Enabling == false} onInput=${_onInput} onBlur=${_onBlur}
        list=${SuggestionId}
      />${SuggestionList}`;
            }
        });
    }
    get Type() { return 'SearchInput'; }
    set Type(_) { throwReadOnlyError('Type'); }
    get Placeholder() { return this._Placeholder; }
    set Placeholder(newSetting) {
        allowTextline('placeholder', newSetting);
        if (this._Placeholder !== newSetting) {
            this._Placeholder = newSetting;
            this.rerender();
        }
    }
    get readonly() { return this._readonly; }
    set readonly(newSetting) {
        allowBoolean('readonly setting', newSetting);
        if (this._readonly !== newSetting) {
            this._readonly = newSetting;
            this.rerender();
        }
    }
    get minLength() { return this._minLength; }
    set minLength(newSetting) {
        allowOrdinal('minimal length', newSetting);
        if (this._minLength !== newSetting) {
            this._minLength = newSetting;
            this.rerender();
        }
    }
    get maxLength() { return this._maxLength; }
    set maxLength(newSetting) {
        allowOrdinal('maximal length', newSetting);
        if (this._maxLength !== newSetting) {
            this._maxLength = newSetting;
            this.rerender();
        }
    }
    get Pattern() { return this._Pattern; }
    set Pattern(newSetting) {
        allowTextline('input pattern', newSetting);
        if (this._Pattern !== newSetting) {
            this._Pattern = newSetting;
            this.rerender();
        }
    }
    get SpellChecking() { return this._SpellChecking; }
    set SpellChecking(newSetting) {
        allowBoolean('spell check setting', newSetting);
        if (this._SpellChecking !== newSetting) {
            this._SpellChecking = newSetting;
            this.rerender();
        }
    }
    get Suggestions() {
        return (this._Suggestions == null ? this._Suggestions : this._Suggestions.slice());
    }
    set Suggestions(newSetting) {
        allowListSatisfying('suggestion list', newSetting, ValueIsTextline);
        if (ValuesDiffer(this._Suggestions, newSetting)) {
            this._Suggestions = (newSetting == null ? newSetting : newSetting.slice());
            this.rerender();
        }
    }
    /**** _serializeConfigurationInto ****/
    _serializeConfigurationInto(Serialization) {
        super._serializeConfigurationInto(Serialization);
        [
            'Placeholder', 'readonly', 'minLength', 'maxLength', 'Pattern',
            'SpellChecking', 'Suggestions',
        ].forEach((Name) => this._serializePropertyInto(Name, Serialization));
    }
    /**** _deserializeConfigurationFrom ****/
    _deserializeConfigurationFrom(Serialization) {
        super._deserializeConfigurationFrom(Serialization);
        this._Placeholder = acceptableOptionalTextline(Serialization.Placeholder);
        this._readonly = acceptableBoolean(Serialization.readonly, false);
        this._minLength = acceptableOptionalOrdinal(Serialization.minLength);
        this._maxLength = acceptableOptionalOrdinal(Serialization.maxLength);
        this._Pattern = acceptableOptionalTextline(Serialization.Pattern);
        this._SpellChecking = acceptableBoolean(Serialization.SpellChecking, false);
        this._Suggestions = acceptableOptionalListSatisfying(Serialization.Suggestions, undefined, ValueIsTextline);
    }
}
builtInWidgetTypes['SearchInput'] = WAT_SearchInput;
appendStyle(`
  .WAT.Widget > .WAT.SearchInput {
    left:1px; top:1px; right:1px; bottom:1px; width:auto; height:auto;
    border:solid 1px #888888; border-radius:2px;
    background:#e8f0ff;
    padding:0px 2px 0px 2px;
  }

  .WAT.Widget > .WAT.SearchInput:read-only {
    border:solid 1px #DDDDDD; border-radius:2px;
    background:#F0F0F0;
  }
  `);
/**** ColorInput ****/
export class WAT_ColorInput extends WAT_Widget {
    constructor(Page) {
        super(Page);
        /**** Suggestions ****/
        Object.defineProperty(this, "_Suggestions", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**** Renderer ****/
        Object.defineProperty(this, "_Renderer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                let Value = acceptableOptionalColor(this._Value);
                const Suggestions = acceptableOptionalListSatisfying(this._Suggestions, undefined, ValueIsColor);
                let SuggestionList = '', SuggestionId;
                if ((Suggestions != null) && (Suggestions.length > 0)) {
                    SuggestionId = IdOfWidget(this) + '-Suggestions';
                    SuggestionList = html `<datalist id=${SuggestionId}>
          ${Suggestions.map((Value) => html `<option value=${Value}></option>`)}
        </datalist>`;
                }
                /**** actual rendering ****/
                const _onInput = (Event) => {
                    this.Value = Event.target.value;
                    if (this._onInput != null) {
                        this._onInput_(Event);
                    } // no typo!
                };
                return html `<input type="color" class="WAT Content ColorInput"
        value=${Value === '' ? null : Value}
        disabled=${this.Enabling == false} onInput=${_onInput}
        list=${SuggestionId}
      />${SuggestionList}`;
            }
        });
    }
    get Type() { return 'ColorInput'; }
    set Type(_) { throwReadOnlyError('Type'); }
    get Suggestions() {
        return (this._Suggestions == null ? this._Suggestions : this._Suggestions.slice());
    }
    set Suggestions(newSetting) {
        allowListSatisfying('suggestion list', newSetting, ValueIsColor);
        if (ValuesDiffer(this._Suggestions, newSetting)) {
            this._Suggestions = (newSetting == null ? newSetting : newSetting.slice());
            this.rerender();
        }
    }
    /**** _serializeConfigurationInto ****/
    _serializeConfigurationInto(Serialization) {
        super._serializeConfigurationInto(Serialization);
        this._serializePropertyInto('Suggestions', Serialization);
    }
    /**** _deserializeConfigurationFrom ****/
    _deserializeConfigurationFrom(Serialization) {
        super._deserializeConfigurationFrom(Serialization);
        this._Suggestions = acceptableOptionalListSatisfying(Serialization.Suggestions, undefined, ValueIsColor);
    }
}
builtInWidgetTypes['ColorInput'] = WAT_ColorInput;
appendStyle(`
  .WAT.Widget > .WAT.ColorInput {
    left:1px; top:1px; right:1px; bottom:1px; width:auto; height:auto;
    border:solid 1px #888888; border-radius:2px;
    background:#e8f0ff;
    padding:0px 2px 0px 2px;
  }
  `);
/**** DropDown ****/
export class WAT_DropDown extends WAT_Widget {
    constructor(Page) {
        super(Page);
        /**** Options ****/
        Object.defineProperty(this, "_Options", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**** Renderer ****/
        Object.defineProperty(this, "_Renderer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                let Value = acceptableTextline(this._Value, '');
                const Options = acceptableListSatisfying(this._Options, [], ValueIsTextline);
                const _onInput = (Event) => {
                    this.Value = Event.target.value;
                    if (this._onInput != null) {
                        this._onInput_(Event);
                    } // no typo!
                };
                return html `<select class="WAT Content DropDown"
        disabled=${this.Enabling == false} onInput=${_onInput}
      >${Options.map((Option) => {
                    const OptionValue = Option.replace(/:.*$/, '').trim();
                    let OptionLabel = Option.replace(/^[^:]+:/, '').trim();
                    const disabled = (OptionLabel[0] === '-');
                    if (/^-[^-]+$/.test(OptionLabel)) {
                        OptionLabel = OptionLabel.slice(1);
                    }
                    return html `<option value=${OptionValue} selected=${OptionValue === Value}
            disabled=${disabled}
          >
            ${OptionLabel}
          </option>`;
                })}</select>`;
            }
        });
    }
    get Type() { return 'DropDown'; }
    set Type(_) { throwReadOnlyError('Type'); }
    get Options() {
        return (this._Options == null ? this._Options : this._Options.slice());
    }
    set Options(newSetting) {
        allowListSatisfying('option list', newSetting, ValueIsTextline);
        if (ValuesDiffer(this._Options, newSetting)) {
            this._Options = (newSetting == null ? newSetting : newSetting.slice());
            this.rerender();
        }
    }
    /**** _serializeConfigurationInto ****/
    _serializeConfigurationInto(Serialization) {
        super._serializeConfigurationInto(Serialization);
        this._serializePropertyInto('Options', Serialization);
    }
    /**** _deserializeConfigurationFrom ****/
    _deserializeConfigurationFrom(Serialization) {
        super._deserializeConfigurationFrom(Serialization);
        this._Options = acceptableListSatisfying(Serialization.Options, [], ValueIsTextline);
    }
}
builtInWidgetTypes['DropDown'] = WAT_DropDown;
appendStyle(`
  .WAT.Widget > .WAT.DropDown {
    left:1px; top:1px; right:1px; bottom:1px; width:auto; height:auto;
    border:solid 1px #888888; border-radius:2px;
    background:#e8f0ff;
    padding:0px 2px 0px 2px;
  }
  `);
/**** PseudoDropDown ****/
export class WAT_PseudoDropDown extends WAT_Widget {
    constructor(Page) {
        super(Page);
        /**** Icon ****/
        Object.defineProperty(this, "_Icon", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**** Options ****/
        Object.defineProperty(this, "_Options", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**** Renderer ****/
        Object.defineProperty(this, "_Renderer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                let Value = acceptableTextline(this._Value, '');
                const Icon = acceptableURL(this._Icon, `${IconFolder}/menu.png`);
                const Color = acceptableColor(this._Color, 'black');
                const Options = acceptableListSatisfying(this._Options, [], ValueIsTextline);
                const _onInput = (Event) => {
                    this.Value = Event.target.value;
                    if (this._onInput != null) {
                        this._onInput_(Event);
                    } // no typo!
                };
                return html `<div class="WAT Content PseudoDropDown">
        <div style="
          -webkit-mask-image:url(${Icon}); mask-image:url(${Icon});
          background-color:${Color};
        "></div>
        <select disabled=${this.Enabling == false} onInput=${_onInput}>
          ${Options.map((Option) => {
                    const OptionValue = Option.replace(/:.*\$/, '').trim();
                    let OptionLabel = Option.replace(/^[^:]+:/, '').trim();
                    const disabled = (OptionLabel[0] === '-');
                    if (/^-[^-]+$/.test(OptionLabel)) {
                        OptionLabel = OptionLabel.slice(1);
                    }
                    return html `<option value=${OptionValue} selected=${OptionValue === Value}
              disabled=${disabled}
            >
              ${OptionLabel}
            </option>`;
                })}
        </select>
      </div>`;
            }
        });
    }
    get Type() { return 'PseudoDropDown'; }
    set Type(_) { throwReadOnlyError('Type'); }
    get Icon() { return this._Icon; }
    set Icon(newSetting) {
        allowURL('icon image ULR', newSetting);
        if (this._Icon !== newSetting) {
            this._Icon = newSetting;
            this.rerender();
        }
    }
    get Options() {
        return (this._Options == null ? this._Options : this._Options.slice());
    }
    set Options(newSetting) {
        allowListSatisfying('option list', newSetting, ValueIsTextline);
        if (ValuesDiffer(this._Options, newSetting)) {
            this._Options = (newSetting == null ? newSetting : newSetting.slice());
            this.rerender();
        }
    }
    /**** _serializeConfigurationInto ****/
    _serializeConfigurationInto(Serialization) {
        super._serializeConfigurationInto(Serialization);
        this._serializePropertyInto('Icon', Serialization);
        this._serializePropertyInto('Options', Serialization);
    }
    /**** _deserializeConfigurationFrom ****/
    _deserializeConfigurationFrom(Serialization) {
        super._deserializeConfigurationFrom(Serialization);
        this._Icon = acceptableURL(Serialization.Icon, `${IconFolder}/menu.png`);
        this._Options = acceptableListSatisfying(Serialization.Options, [], ValueIsTextline);
    }
}
builtInWidgetTypes['PseudoDropDown'] = WAT_PseudoDropDown;
appendStyle(`
  .WAT.Widget > .WAT.PseudoDropDown > div {
    display:block; position:absolute;
    left:0px; top:0px; right:0px; bottom:0px;
    -webkit-mask-size:contain;           mask-size:contain;
    -webkit-mask-position:center center; mask-position:center center;
  }

  .WAT.Widget > .WAT.PseudoDropDown > select {
    display:block; position:absolute;
    left:0px; top:0px; right:0px; bottom:0px;
    opacity:0.01;
  }
  `);
/**** TextInput ****/
export class WAT_TextInput extends WAT_Widget {
    constructor(Page) {
        super(Page);
        /**** Placeholder ****/
        Object.defineProperty(this, "_Placeholder", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**** readonly ****/
        Object.defineProperty(this, "_readonly", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: true
        });
        /**** minLength ****/
        Object.defineProperty(this, "_minLength", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**** maxLength ****/
        Object.defineProperty(this, "_maxLength", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**** LineWrapping ****/
        Object.defineProperty(this, "_LineWrapping", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        /**** SpellChecking ****/
        Object.defineProperty(this, "_SpellChecking", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        /**** acceptableFileTypes ****/
        Object.defineProperty(this, "_acceptableFileTypes", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        /**** Renderer ****/
        Object.defineProperty(this, "_shownValue", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ''
        });
        Object.defineProperty(this, "_InputElement", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: createRef()
        });
        Object.defineProperty(this, "_Renderer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                const { Value, Enabling } = this;
                /**** handle external changes ****/
                let ValueToShow = acceptableText(Value, '');
                if ((this._InputElement.current != null) &&
                    (document.activeElement === this._InputElement.current)) {
                    ValueToShow = this._shownValue;
                }
                else {
                    this._shownValue = ValueToShow;
                }
                const _onInput = (Event) => {
                    if (Enabling === false) {
                        return consumingEvent(Event);
                    }
                    this._shownValue = this.Value = Event.target.value;
                    if (this._onInput != null) {
                        this._onInput_(Event);
                    } // no typo!
                };
                const _onBlur = (Event) => {
                    this.rerender();
                    if (this._onBlur != null) {
                        this._onBlur_(Event);
                    } // no typo!
                };
                /**** process any other parameters ****/
                const Placeholder = acceptableOptionalTextline(this._Placeholder);
                const readonly = acceptableOptionalBoolean(this._readonly);
                const minLength = acceptableOptionalOrdinal(this._minLength);
                const maxLength = acceptableOptionalOrdinal(this._maxLength);
                const LineWrapping = acceptableOptionalBoolean(this._LineWrapping);
                const SpellChecking = acceptableOptionalBoolean(this._SpellChecking);
                let acceptableFileTypes = acceptableListSatisfying(this._acceptableFileTypes, [], ValueIsTextFormat);
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
                            this._shownValue = this.Value = Value;
                            if (this._onInput != null) {
                                this._onInput_(Event);
                            } // no typo!
                        }
                        else {
                            try {
                                for (let Item of Event.dataTransfer.items) {
                                    if ((Item.kind === 'file') && acceptableFileTypes.includes(Item.type)) {
                                        this._shownValue = this.Value = await FileReadAsText(Item.getAsFile(), Item.type);
                                        if (this._onInput != null) {
                                            this._onInput_(Event);
                                        } // no typo!
                                        break;
                                    }
                                }
                            }
                            catch (Signal) {
                                console.warn('file drop error', Signal);
                                if (this._onDropError != null) {
                                    this._onDropError_(Signal);
                                }
                            }
                        }
                    }
                };
                /**** actual rendering ****/
                return html `<textarea class="WAT Content TextInput"
        value=${ValueToShow} minlength=${minLength} maxlength=${maxLength}
        readOnly=${readonly} placeholder=${Placeholder}
        spellcheck=${SpellChecking} style="resize:none; ${LineWrapping == true
                    ? 'overflow-wrap:break-word; hyphens:auto'
                    : 'white-space:pre'}"
        disabled=${Enabling === false} onInput=${_onInput} onBlur=${_onBlur}
        onDragOver=${allowsDropping && _onDragOver} onDrop=${allowsDropping && _onDrop}
      />`;
            }
        });
    }
    get Type() { return 'TextInput'; }
    set Type(_) { throwReadOnlyError('Type'); }
    get Placeholder() { return this._Placeholder; }
    set Placeholder(newSetting) {
        allowTextline('placeholder', newSetting);
        if (this._Placeholder !== newSetting) {
            this._Placeholder = newSetting;
            this.rerender();
        }
    }
    get readonly() { return this._readonly; }
    set readonly(newSetting) {
        allowBoolean('readonly setting', newSetting);
        if (this._readonly !== newSetting) {
            this._readonly = newSetting;
            this.rerender();
        }
    }
    get minLength() { return this._minLength; }
    set minLength(newSetting) {
        allowOrdinal('minimal length', newSetting);
        if (this._minLength !== newSetting) {
            this._minLength = newSetting;
            this.rerender();
        }
    }
    get maxLength() { return this._maxLength; }
    set maxLength(newSetting) {
        allowOrdinal('maximal length', newSetting);
        if (this._maxLength !== newSetting) {
            this._maxLength = newSetting;
            this.rerender();
        }
    }
    get LineWrapping() { return this._LineWrapping; }
    set LineWrapping(newSetting) {
        allowBoolean('line wrapping setting', newSetting);
        if (this._LineWrapping !== newSetting) {
            this._LineWrapping = newSetting;
            this.rerender();
        }
    }
    get SpellChecking() { return this._SpellChecking; }
    set SpellChecking(newSetting) {
        allowBoolean('spell check setting', newSetting);
        if (this._SpellChecking !== newSetting) {
            this._SpellChecking = newSetting;
            this.rerender();
        }
    }
    get acceptableFileTypes() { return this._acceptableFileTypes.slice(); }
    set acceptableFileTypes(newSetting) {
        allowListSatisfying('acceptable file types', newSetting, ValueIsTextFormat);
        if (newSetting == null) {
            newSetting = [];
        }
        if (ValuesDiffer(this._acceptableFileTypes, newSetting)) {
            this._acceptableFileTypes = newSetting.slice();
            this.rerender();
        }
    }
    /**** _serializeConfigurationInto ****/
    _serializeConfigurationInto(Serialization) {
        super._serializeConfigurationInto(Serialization);
        [
            'Placeholder', 'readonly', 'minLength', 'maxLength', 'LineWrapping',
            'SpellChecking', 'acceptableFileTypes',
        ].forEach((Name) => this._serializePropertyInto(Name, Serialization));
    }
    /**** _deserializeConfigurationFrom ****/
    _deserializeConfigurationFrom(Serialization) {
        super._deserializeConfigurationFrom(Serialization);
        this._Placeholder = acceptableOptionalTextline(Serialization.Placeholder);
        this._readonly = acceptableBoolean(Serialization.readonly, false);
        this._minLength = acceptableOptionalOrdinal(Serialization.minLength);
        this._maxLength = acceptableOptionalOrdinal(Serialization.maxLength);
        this._LineWrapping = acceptableBoolean(Serialization.LineWrapping, true);
        this._SpellChecking = acceptableBoolean(Serialization.SpellChecking, false);
        this._acceptableFileTypes = acceptableListSatisfying(Serialization.acceptableFileTypes, [], ValueIsTextFormat);
    }
}
builtInWidgetTypes['TextInput'] = WAT_TextInput;
appendStyle(`
  .WAT.Widget > .WAT.TextInput {
    left:1px; top:1px; right:1px; bottom:1px; width:auto; height:auto;
    border:solid 1px #888888; border-radius:2px;
    background:#e8f0ff;
    padding:2px 2px 2px 2px;
  }

  .WAT.Widget > .WAT.TextInput:read-only {
    border:solid 1px #DDDDDD; border-radius:2px;
    background:#F0F0F0;
  }
  `);
/**** MarkdownView ****/
import { Marked } from 'marked';
import hljs from 'highlight.js/lib/core';
import { default as _css } from 'highlight.js/lib/languages/css';
hljs.registerLanguage('html', _css);
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
export class WAT_MarkdownView extends WAT_Widget {
    constructor(Page) {
        super(Page);
        Object.defineProperty(this, "_HTMLContent", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ''
        });
        Object.defineProperty(this, "_marked", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**** readonly ****/
        Object.defineProperty(this, "_readonly", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: true
        });
        /**** acceptableFileTypes ****/
        Object.defineProperty(this, "_acceptableFileTypes", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        /**** Renderer ****/
        Object.defineProperty(this, "_Renderer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                const { Enabling, readonly } = this;
                let acceptableFileTypes = acceptableListSatisfying(this._acceptableFileTypes, [], ValueIsMarkdownFormat);
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
                            const Value = Event.dataTransfer.getData('text');
                            this.Value = Value;
                            if (this._onInput != null) {
                                this._onInput_(Event);
                            } // no typo!
                        }
                        else {
                            try {
                                for (let Item of Event.dataTransfer.items) {
                                    if ((Item.kind === 'file') && acceptableFileTypes.includes(Item.type)) {
                                        this.Value = await FileReadAsMarkdown(Item.getAsFile(), Item.type);
                                        if (this._onInput != null) {
                                            this._onInput_(Event);
                                        } // no typo!
                                        break;
                                    }
                                }
                            }
                            catch (Signal) {
                                console.warn('file drop error', Signal);
                                if (this._onDropError != null) {
                                    this._onDropError_(Signal);
                                }
                            }
                        }
                    }
                };
                /**** actual rendering ****/
                return html `<div class="WAT Content MarkdownView"
        onDragOver=${allowsDropping && _onDragOver} onDrop=${allowsDropping && _onDrop}
        dangerouslySetInnerHTML=${{ __html: this._HTMLContent }}
      />`;
            }
        });
        this._marked = new Marked();
        this._marked.setOptions({
            gfm: true, breaks: true,
        });
        //    this._marked.use(markedKatex({ nonStandard:true }))
    }
    get Type() { return 'MarkdownView'; }
    set Type(_) { throwReadOnlyError('Type'); }
    /**** Value ****/
    get Value() { return this._Value; }
    set Value(newValue) {
        allowText('value', newValue);
        if (ValuesDiffer(this._Value, newValue)) {
            this._Value = newValue;
            try {
                this._HTMLContent = this._marked.parse(newValue);
            }
            catch (Signal) {
                console.warn('"Value" Setting Failure', Signal);
                setErrorReport(this, {
                    Type: '"Value" Setting Failure',
                    Sufferer: this, Message: '' + Signal, Cause: Signal
                });
            }
            if (this._onValueChange != null) {
                this._onValueChange_();
            } // no typo!
            this.rerender();
        }
    }
    get readonly() { return this._readonly; }
    set readonly(newSetting) {
        allowBoolean('readonly setting', newSetting);
        if (this._readonly !== newSetting) {
            this._readonly = newSetting;
            this.rerender();
        }
    }
    get acceptableFileTypes() { return this._acceptableFileTypes.slice(); }
    set acceptableFileTypes(newSetting) {
        allowListSatisfying('acceptable file types', newSetting, ValueIsMarkdownFormat);
        if (newSetting == null) {
            newSetting = [];
        }
        if (ValuesDiffer(this._acceptableFileTypes, newSetting)) {
            this._acceptableFileTypes = newSetting.slice();
            this.rerender();
        }
    }
    /**** _serializeConfigurationInto ****/
    _serializeConfigurationInto(Serialization) {
        super._serializeConfigurationInto(Serialization);
        [
            'readonly', 'acceptableFileTypes',
        ].forEach((Name) => this._serializePropertyInto(Name, Serialization));
    }
    /**** _deserializeConfigurationFrom ****/
    _deserializeConfigurationFrom(Serialization) {
        super._deserializeConfigurationFrom(Serialization);
        this._readonly = acceptableBoolean(Serialization.readonly, false);
        this._acceptableFileTypes = acceptableListSatisfying(Serialization.acceptableFileTypes, [], ValueIsMarkdownFormat);
    }
}
builtInWidgetTypes['MarkdownView'] = WAT_MarkdownView;
appendStyle(`
  .WAT.Widget > .WAT.MarkdownView {
    overflow-y:scroll;
  }
  `);
/**** TextTab ****/
export class WAT_TextTab extends WAT_Widget {
    constructor(Page) {
        super(Page);
        /**** Activation ****/
        Object.defineProperty(this, "_Activation", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        /**** Renderer ****/
        Object.defineProperty(this, "_Renderer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                const active = (this.isActive ? 'active' : '');
                const _onClick = (Event) => {
                    if (this.Enabling == false) {
                        return consumingEvent(Event);
                    }
                    if (this._onClick != null) {
                        this._onClick_(Event);
                    } // no typo!
                };
                const Value = acceptableTextline(this.Value, '');
                return html `<div class="WAT ${active} TextTab"
        onClick=${_onClick}>${Value}</div>`;
            }
        });
    }
    get Type() { return 'TextTab'; }
    set Type(_) { throwReadOnlyError('Type'); }
    get Activation() {
        return this._Activation;
    }
    set Activation(newActivation) {
        expectBoolean('tab activation', newActivation);
        if (this._Activation !== newActivation) {
            this._Activation = newActivation;
            this.rerender();
        }
    }
    /**** activate/deactivate ****/
    activate() { this.Activation = true; }
    deactivate() { this.Activation = false; }
    /**** isActive ****/
    get isActive() { return this.Activation; }
    set isActive(newActivation) { this.Activation = newActivation; }
}
builtInWidgetTypes['TextTab'] = WAT_TextTab;
appendStyle(`
  .WAT.Widget > .WAT.TextTab {
    display:block; position:absolute;
    left:0px; top:0px; right:0px; bottom:0px; width:auto; height:auto;
    border:none; border-bottom:solid 2px transparent;
    font-weight:bold;
  }
  .WAT.Widget > .WAT.TextTab.active {
    border:none; border-bottom:solid 2px black;
  }
  `);
/**** IconTab ****/
export class WAT_IconTab extends WAT_Widget {
    constructor(Page) {
        super(Page);
        /**** Activation ****/
        Object.defineProperty(this, "_Activation", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        /**** Renderer ****/
        Object.defineProperty(this, "_Renderer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                const active = (this.isActive ? 'active' : '');
                const _onClick = (Event) => {
                    if (this.Enabling == false) {
                        return consumingEvent(Event);
                    }
                    if (this._onClick != null) {
                        this._onClick_(Event);
                    } // no typo!
                };
                const Value = acceptableURL(this._Value, `${IconFolder}/pencil.png`);
                const Color = acceptableColor(this.Color, 'black');
                return html `<div class="WAT ${active} IconTab" style="
        -webkit-mask-image:url(${Value}); mask-image:url(${Value});
        background-color:${Color};
      " disabled=${this.Enabling == false} onClick=${_onClick}
      />`;
            }
        });
    }
    get Type() { return 'IconTab'; }
    set Type(_) { throwReadOnlyError('Type'); }
    get Activation() {
        return this._Activation;
    }
    set Activation(newActivation) {
        expectBoolean('tab activation', newActivation);
        if (this._Activation !== newActivation) {
            this._Activation = newActivation;
            this.rerender();
        }
    }
    /**** activate/deactivate ****/
    activate() { this.Activation = true; }
    deactivate() { this.Activation = false; }
    /**** isActive ****/
    get isActive() { return this.Activation; }
    set isActive(newActivation) { this.Activation = newActivation; }
}
builtInWidgetTypes['IconTab'] = WAT_IconTab;
appendStyle(`
  .WAT.Widget > .WAT.IconTab {
    left:0px; top:0px; right:0px; bottom:0px; width:auto; height:auto;
    border:none; border-bottom:solid 2px transparent;

    -webkit-mask-size:contain;           mask-size:contain;
    -webkit-mask-position:center center; mask-position:center center;
  }
  .WAT.Widget > .WAT.IconTab.active {
    border:none; border-bottom:solid 2px black;
  }
  `);
/**** WidgetPane ****/
export class WAT_WidgetPane extends WAT_Widget {
    constructor(Page) {
        super(Page);
        /**** _releaseWidgets ****/
        Object.defineProperty(this, "_shownWidgets", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        /**** Renderer ****/
        Object.defineProperty(this, "_Renderer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                var _a;
                this._releaseWidgets();
                if (this._Value == null) {
                    return '';
                }
                const SourceWidget = (_a = this.Applet) === null || _a === void 0 ? void 0 : _a.WidgetAtPath(this._Value);
                if ((SourceWidget == null) || (SourceWidget === this)) {
                    return '';
                }
                const WidgetsToShow = (SourceWidget.Type === 'Outline'
                    ? SourceWidget.bundledWidgets()
                    : [SourceWidget]).filter((Widget) => (Widget.isVisible && ((Widget._Pane == null) || (Widget._Pane === this))));
                WidgetsToShow.forEach((Widget) => Widget._Pane = this);
                this._shownWidgets = WidgetsToShow;
                const PaneGeometry = this.Geometry;
                const BaseGeometry = SourceWidget.Geometry;
                return html `<div class="WAT Content WidgetPane">
        ${WidgetsToShow.toReversed().map((Widget) => {
                    let Geometry = this._GeometryOfWidgetRelativeTo(Widget, BaseGeometry, PaneGeometry);
                    return html `<${WAT_WidgetView} Widget=${Widget} Geometry=${Geometry}/>`;
                })}
      </div>`;
            }
        });
    }
    get Type() { return 'WidgetPane'; }
    set Type(_) { throwReadOnlyError('Type'); }
    /**** Value ****/
    get Value() { return this._Value; }
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
        if (SourceWidget == null) {
            if (this._Value != null) {
                this._Value = undefined;
                this.rerender();
            }
            return;
        }
        if (SourceWidget === this)
            throwError('InvalidArgument: a WidgetPane can not show itself');
        if (SourceWidget.Page === this.Page)
            throwError('InvalidArgument: a WidgetPane can not show other widgets from the same page');
        if (this._Value !== SourcePath) {
            this._Value = SourcePath;
            if (this._onValueChange != null) {
                this._onValueChange_();
            } // no typo!
            this.rerender();
        }
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
    _releaseWidgets() {
        this._shownWidgets.forEach((Widget) => Widget._Pane = undefined);
    }
    componentWillUnmount() {
        this._releaseWidgets();
    }
}
builtInWidgetTypes['WidgetPane'] = WAT_WidgetPane;
appendStyle(`
  .WAT.Widget > .WAT.WidgetPane {
    overflow:hidden;
  }
  `);
/**** DoubleWidgetPane ****/
export class WAT_DoubleWidgetPane extends WAT_Widget {
    constructor(Page) {
        super(Page);
        /**** primaryWidgetPath ****/
        Object.defineProperty(this, "_primaryWidgetPath", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: undefined
        });
        /**** secondaryWidgetPath ****/
        Object.defineProperty(this, "_secondaryWidgetPath", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: undefined
        });
        /**** minPaneWidth ****/
        Object.defineProperty(this, "_minPaneWidth", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**** onVisibilityChange ****/
        Object.defineProperty(this, "_onVisibilityChange", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**** primaryPaneIsVisible ****/
        Object.defineProperty(this, "_primaryPaneIsVisible", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        /**** secondaryPaneIsVisible ****/
        Object.defineProperty(this, "_secondaryPaneIsVisible", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        /**** _releaseWidgets ****/
        Object.defineProperty(this, "_shownWidgets", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        /**** Renderer ****/
        Object.defineProperty(this, "_VisibilityChanged", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        Object.defineProperty(this, "_Renderer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                var _a, _b;
                this._releaseWidgets();
                const totalWidth = this.Width;
                const minPaneWidth = acceptableOrdinal(this._minPaneWidth, 200);
                const bothPanesVisible = totalWidth >= 2 * minPaneWidth;
                const PaneWidth = (bothPanesVisible ? Math.floor(totalWidth / 2) : totalWidth);
                const Value = acceptableOneOf(this._Value, 'primary', ['primary', 'secondary']);
                this._VisibilityChanged = (bothPanesVisible
                    ? !this._primaryPaneIsVisible || !this._secondaryPaneIsVisible
                    : (this._primaryPaneIsVisible !== (Value === 'primary')) ||
                        (this._secondaryPaneIsVisible !== (Value === 'secondary')));
                this._primaryPaneIsVisible = bothPanesVisible || (Value === 'primary');
                this._secondaryPaneIsVisible = bothPanesVisible || (Value === 'secondary');
                this._shownWidgets = [];
                let primaryWidget;
                let primaryWidgetsToShow = [];
                if (this._primaryPaneIsVisible && (this._primaryWidgetPath != null)) {
                    primaryWidget = (_a = this.Applet) === null || _a === void 0 ? void 0 : _a.WidgetAtPath(this._primaryWidgetPath);
                    if ((primaryWidget != null) && (primaryWidget !== this)) {
                        primaryWidgetsToShow = (primaryWidget.Type === 'Outline'
                            ? primaryWidget.bundledWidgets()
                            : [primaryWidget]).filter((Widget) => (Widget.isVisible && ((Widget._Pane == null) || (Widget._Pane === this))));
                        primaryWidgetsToShow.forEach((Widget) => Widget._Pane = this);
                        this._shownWidgets.push(...primaryWidgetsToShow);
                    }
                }
                let secondaryWidget;
                let secondaryWidgetsToShow = [];
                if (this._secondaryPaneIsVisible && (this._secondaryWidgetPath != null)) {
                    secondaryWidget = (_b = this.Applet) === null || _b === void 0 ? void 0 : _b.WidgetAtPath(this._secondaryWidgetPath);
                    if ((secondaryWidget != null) && (secondaryWidget !== this)) {
                        secondaryWidgetsToShow = (secondaryWidget.Type === 'Outline'
                            ? secondaryWidget.bundledWidgets()
                            : [secondaryWidget]).filter((Widget) => (Widget.isVisible && ((Widget._Pane == null) || (Widget._Pane === this))));
                        secondaryWidgetsToShow.forEach((Widget) => Widget._Pane = this);
                        this._shownWidgets.push(...secondaryWidgetsToShow);
                    }
                }
                const { x, y, Width, Height } = this.Geometry;
                const primaryPaneGeometry = { x, y, Width: PaneWidth, Height };
                const primaryBaseGeometry = (primaryWidget == null ? undefined : primaryWidget.Geometry);
                const secondaryPaneGeometry = (bothPanesVisible
                    ? { x: x + PaneWidth, y, Width: PaneWidth, Height }
                    : { x, y, Width: PaneWidth, Height });
                const secondaryBaseGeometry = (secondaryWidget == null ? undefined : secondaryWidget.Geometry);
                return html `<div class="WAT Content DoubleWidgetPane">
       <div class="primaryPane" style="
         width:${this._primaryPaneIsVisible ? PaneWidth : 0}px
       ">
        ${primaryWidgetsToShow.toReversed().map((Widget) => {
                    let Geometry = this._GeometryOfWidgetRelativeTo(Widget, primaryBaseGeometry, primaryPaneGeometry);
                    return html `<${WAT_WidgetView} Widget=${Widget} Geometry=${Geometry}/>`;
                })}
       </>

       <div class="secondaryPane" style="
         left:${bothPanesVisible ? PaneWidth : 0}px;
         width:${this._secondaryPaneIsVisible ? PaneWidth : 0}px
       ">
        ${secondaryWidgetsToShow.toReversed().map((Widget) => {
                    let Geometry = this._GeometryOfWidgetRelativeTo(Widget, secondaryBaseGeometry, secondaryPaneGeometry);
                    return html `<${WAT_WidgetView} Widget=${Widget} Geometry=${Geometry}/>`;
                })}
       </>
      </div>`;
            }
        });
    }
    get Type() { return 'DoubleWidgetPane'; }
    set Type(_) { throwReadOnlyError('Type'); }
    get primaryWidgetPath() { return this._primaryWidgetPath; }
    set primaryWidgetPath(newPath) {
        var _a;
        let SourceWidget, SourcePath;
        if (ValueIsWidget(newPath)) {
            SourceWidget = newPath;
            SourcePath = SourceWidget.Path;
        }
        else {
            allowPath('primary pane widget source path', newPath);
            if ((newPath == null) || (newPath.trim() === '')) {
                SourceWidget = undefined;
                SourcePath = undefined;
            }
            else {
                SourceWidget = (_a = this.Applet) === null || _a === void 0 ? void 0 : _a.WidgetAtPath(newPath);
                SourcePath = newPath;
            }
        }
        if (SourceWidget == null) {
            if (this._primaryWidgetPath != null) {
                this._primaryWidgetPath = undefined;
                this.rerender();
            }
            this._primaryWidgetPath = SourcePath;
            return;
        }
        if (this._primaryWidgetPath !== SourcePath) {
            this._primaryWidgetPath = SourcePath;
            if (SourceWidget === this)
                throwError('InvalidArgument: a DoubleWidgetPane can not show itself');
            if (SourceWidget.Page === this.Page)
                throwError('InvalidArgument: a DoubleWidgetPane can not show other widgets from the same page');
            this.rerender();
        }
    }
    get secondaryWidgetPath() { return this._secondaryWidgetPath; }
    set secondaryWidgetPath(newPath) {
        var _a;
        let SourceWidget, SourcePath;
        if (ValueIsWidget(newPath)) {
            SourceWidget = newPath;
            SourcePath = SourceWidget.Path;
        }
        else {
            allowPath('secondary pane widget source path', newPath);
            if ((newPath == null) || (newPath.trim() === '')) {
                SourceWidget = undefined;
                SourcePath = undefined;
            }
            else {
                SourceWidget = (_a = this.Applet) === null || _a === void 0 ? void 0 : _a.WidgetAtPath(newPath);
                SourcePath = newPath;
            }
        }
        if (SourceWidget == null) {
            if (this._secondaryWidgetPath != null) {
                this._secondaryWidgetPath = undefined;
                this.rerender();
            }
            this._secondaryWidgetPath = SourcePath;
            return;
        }
        if (this._secondaryWidgetPath !== SourcePath) {
            this._secondaryWidgetPath = SourcePath;
            if (SourceWidget === this)
                throwError('InvalidArgument: a DoubleWidgetPane can not show itself');
            if (SourceWidget.Page === this.Page)
                throwError('InvalidArgument: a DoubleWidgetPane can not show other widgets from the same page');
            this.rerender();
        }
    }
    get minPaneWidth() { return this._minPaneWidth; }
    set minPaneWidth(newSetting) {
        allowOrdinal('minimal pane width', newSetting);
        if (this._minPaneWidth !== newSetting) {
            this._minPaneWidth = newSetting;
            this.rerender();
        }
    }
    get onVisibilityChange() { return this._onVisibilityChange_; }
    set onVisibilityChange(newCallback) {
        allowFunction('"onVisibilityChange" callback', newCallback);
        this._onVisibilityChange = newCallback;
    }
    _onVisibilityChange_(...ArgList) {
        if ((ArgList.length === 1) && (typeof ArgList[0] === 'function')) {
            this._onVisibilityChange = ArgList[0];
        }
        else { // callback invocation
            try {
                if (this._onVisibilityChange != null) {
                    this._onVisibilityChange.apply(this, ArgList);
                }
            }
            catch (Signal) {
                console.warn('"onVisibilityChange" Callback Failure', Signal);
                setErrorReport(this, {
                    Type: 'Custom Callback Failure',
                    Sufferer: this, Message: '' + Signal, Cause: Signal
                });
            }
        }
    }
    get primaryPaneIsVisible() { return this._primaryPaneIsVisible; }
    set primaryPaneIsVisible(_) { throwReadOnlyError('primaryPaneIsVisible'); }
    get secondaryPaneIsVisible() { return this._secondaryPaneIsVisible; }
    set secondaryPaneIsVisible(_) { throwReadOnlyError('secondaryPaneIsVisible'); }
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
    /**** _serializeConfigurationInto ****/
    _serializeConfigurationInto(Serialization) {
        super._serializeConfigurationInto(Serialization);
        [
            'primaryWidgetPath', 'secondaryWidgetPath', 'minPaneWidth',
        ].forEach((Name) => this._serializePropertyInto(Name, Serialization));
    }
    /**** _deserializeConfigurationFrom ****/
    _deserializeConfigurationFrom(Serialization) {
        super._deserializeConfigurationFrom(Serialization);
        this._primaryWidgetPath = acceptableOptionalPath(Serialization.primaryWidgetPath);
        this._secondaryWidgetPath = acceptableOptionalPath(Serialization.secondaryWidgetPath);
        this._minPaneWidth = acceptableOrdinal(Serialization.minPaneWidth, 200);
    }
    _releaseWidgets() {
        this._shownWidgets.forEach((Widget) => Widget._Pane = undefined);
    }
    componentWillUnmount() {
        this._releaseWidgets();
    }
    componentDidMount() {
        if (this._VisibilityChanged && (this._onVisibilityChange != null)) {
            this._onVisibilityChange_();
        }
    }
    componentDidUpdate() {
        if (this._VisibilityChanged && (this._onVisibilityChange != null)) {
            this._onVisibilityChange_();
        }
    }
}
builtInWidgetTypes['DoubleWidgetPane'] = WAT_DoubleWidgetPane;
appendStyle(`
  .WAT.Widget > .WAT.DoubleWidgetPane {
    overflow:hidden;
  }
  .WAT.Widget > .WAT.DoubleWidgetPane > .primaryPane {
    display:block; position:absolute;
    left:0px; top:0px; right:auto; bottom:0px; height:auto;
  }
  .WAT.Widget > .WAT.DoubleWidgetPane > .secondaryPane {
    display:block; position:absolute;
    top:0px; right:auto; bottom:0px; height:auto;
  }
  `);
/**** SidebarWidgetPane ****/
export const WAT_SidebarStates = ['hidden', 'overlaid', 'visible'];
export class WAT_SidebarWidgetPane extends WAT_Widget {
    constructor(Page) {
        super(Page);
        /**** primaryWidgetPath ****/
        Object.defineProperty(this, "_primaryWidgetPath", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: undefined
        });
        /**** SidebarWidgetPath ****/
        Object.defineProperty(this, "_SidebarWidgetPath", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: undefined
        });
        /**** minPaneWidth ****/
        Object.defineProperty(this, "_minPaneWidth", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**** minSidebarWidth ****/
        Object.defineProperty(this, "_minSidebarWidth", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**** maxSidebarWidth ****/
        Object.defineProperty(this, "_maxSidebarWidth", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**** SidebarState ****/
        Object.defineProperty(this, "_SidebarState", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'hidden'
        });
        /**** onVisibilityChange ****/
        Object.defineProperty(this, "_onVisibilityChange", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**** _releaseWidgets ****/
        Object.defineProperty(this, "_shownWidgets", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        /**** Renderer ****/
        Object.defineProperty(this, "_VisibilityChanged", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        Object.defineProperty(this, "_Renderer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                var _a, _b;
                this._releaseWidgets();
                const totalWidth = this.Width;
                const minPaneWidth = acceptableOrdinal(this._minPaneWidth, 200);
                const minSidebarWidth = acceptableOrdinal(this._minSidebarWidth, 100);
                const maxSidebarWidth = acceptableOrdinal(this._maxSidebarWidth, 100);
                this._VisibilityChanged = false;
                if (totalWidth < minPaneWidth + minSidebarWidth) {
                    if (this._SidebarState === 'visible') {
                        this._VisibilityChanged = true;
                        this._SidebarState = 'hidden';
                    }
                }
                else {
                    if (this._SidebarState === 'hidden') {
                        this._VisibilityChanged = true;
                        this._SidebarState = 'visible';
                    }
                }
                let PaneWidth = 0, SidebarWidth = 0;
                switch (this._SidebarState) {
                    case 'hidden':
                        PaneWidth = totalWidth;
                        SidebarWidth = 0;
                        break;
                    case 'overlaid':
                        PaneWidth = totalWidth;
                        SidebarWidth = Math.max(minSidebarWidth, Math.min(PaneWidth - 40, maxSidebarWidth));
                        break;
                    case 'visible':
                        SidebarWidth = Math.max(minSidebarWidth, Math.min(totalWidth - minPaneWidth, maxSidebarWidth));
                        PaneWidth = totalWidth - SidebarWidth;
                }
                this._shownWidgets = [];
                let primaryWidget;
                let primaryWidgetsToShow = [];
                if (this._primaryWidgetPath != null) {
                    primaryWidget = (_a = this.Applet) === null || _a === void 0 ? void 0 : _a.WidgetAtPath(this._primaryWidgetPath);
                    if ((primaryWidget != null) && (primaryWidget !== this)) {
                        primaryWidgetsToShow = (primaryWidget.Type === 'Outline'
                            ? primaryWidget.bundledWidgets()
                            : [primaryWidget]).filter((Widget) => (Widget.isVisible && ((Widget._Pane == null) || (Widget._Pane === this))));
                        primaryWidgetsToShow.forEach((Widget) => Widget._Pane = this);
                        this._shownWidgets.push(...primaryWidgetsToShow);
                    }
                }
                let SidebarWidget;
                let SidebarWidgetsToShow = [];
                if ((this._SidebarState !== 'hidden') && (this._SidebarWidgetPath != null)) {
                    SidebarWidget = (_b = this.Applet) === null || _b === void 0 ? void 0 : _b.WidgetAtPath(this._SidebarWidgetPath);
                    if ((SidebarWidget != null) && (SidebarWidget !== this)) {
                        SidebarWidgetsToShow = (SidebarWidget.Type === 'Outline'
                            ? SidebarWidget.bundledWidgets()
                            : [SidebarWidget]).filter((Widget) => (Widget.isVisible && ((Widget._Pane == null) || (Widget._Pane === this))));
                        SidebarWidgetsToShow.forEach((Widget) => Widget._Pane = this);
                        this._shownWidgets.push(...SidebarWidgetsToShow);
                    }
                }
                const { x, y, Width, Height } = this.Geometry;
                const primaryPaneGeometry = {
                    x: x + (this._SidebarState === 'visible' ? SidebarWidth : 0), y, Width: PaneWidth, Height
                };
                const primaryBaseGeometry = (primaryWidget == null ? undefined : primaryWidget.Geometry);
                const SidebarPaneGeometry = { x, y, Width: SidebarWidth, Height };
                const SidebarBaseGeometry = (SidebarWidget == null ? undefined : SidebarWidget.Geometry);
                return html `<div class="WAT Content SidebarWidgetPane">
       <div class="primaryPane" style="
         left:${this._SidebarState === 'visible' ? SidebarWidth : 0}px;
         width:${PaneWidth}px
       ">
        ${primaryWidgetsToShow.toReversed().map((Widget) => {
                    let Geometry = this._GeometryOfWidgetRelativeTo(Widget, primaryBaseGeometry, primaryPaneGeometry);
                    return html `<${WAT_WidgetView} Widget=${Widget} Geometry=${Geometry}/>`;
                })}
       </>

       ${(this._SidebarState === 'overlaid') && html `
         <div class="SidebarUnderlay" onClick=${() => this.closeSidebar()}/>
       `}

       <div class="Sidebar" style="
         width:${this._SidebarState === 'hidden' ? 0 : SidebarWidth}px
       ">
        ${SidebarWidgetsToShow.toReversed().map((Widget) => {
                    let Geometry = this._GeometryOfWidgetRelativeTo(Widget, SidebarBaseGeometry, SidebarPaneGeometry);
                    return html `<${WAT_WidgetView} Widget=${Widget} Geometry=${Geometry}/>`;
                })}
       </>
      </div>`;
            }
        });
    }
    get Type() { return 'SidebarWidgetPane'; }
    set Type(_) { throwReadOnlyError('Type'); }
    get primaryWidgetPath() { return this._primaryWidgetPath; }
    set primaryWidgetPath(newPath) {
        var _a;
        let SourceWidget, SourcePath;
        if (ValueIsWidget(newPath)) {
            SourceWidget = newPath;
            SourcePath = SourceWidget.Path;
        }
        else {
            allowPath('primary widget source path', newPath);
            if ((newPath == null) || (newPath.trim() === '')) {
                SourceWidget = undefined;
                SourcePath = undefined;
            }
            else {
                SourceWidget = (_a = this.Applet) === null || _a === void 0 ? void 0 : _a.WidgetAtPath(newPath);
                SourcePath = newPath;
            }
        }
        if (SourceWidget == null) {
            if (this._primaryWidgetPath != null) {
                this._primaryWidgetPath = undefined;
                this.rerender();
            }
            this._primaryWidgetPath = SourcePath;
            return;
        }
        if (this._primaryWidgetPath !== SourcePath) {
            this._primaryWidgetPath = SourcePath;
            if (SourceWidget === this)
                throwError('InvalidArgument: a SidebarWidgetPane can not show itself');
            if (SourceWidget.Page === this.Page)
                throwError('InvalidArgument: a SidebarWidgetPane can not show other widgets from the same page');
            this.rerender();
        }
    }
    get SidebarWidgetPath() { return this._SidebarWidgetPath; }
    set SidebarWidgetPath(newPath) {
        var _a;
        let SourceWidget, SourcePath;
        if (ValueIsWidget(newPath)) {
            SourceWidget = newPath;
            SourcePath = SourceWidget.Path;
        }
        else {
            allowPath('sidebar widget source path', newPath);
            if ((newPath == null) || (newPath.trim() === '')) {
                SourceWidget = undefined;
                SourcePath = undefined;
            }
            else {
                SourceWidget = (_a = this.Applet) === null || _a === void 0 ? void 0 : _a.WidgetAtPath(newPath);
                SourcePath = newPath;
            }
        }
        if (SourceWidget == null) {
            if (this._SidebarWidgetPath != null) {
                this._SidebarWidgetPath = undefined;
                this.rerender();
            }
            this._SidebarWidgetPath = SourcePath;
            return;
        }
        if (this._SidebarWidgetPath !== SourcePath) {
            this._SidebarWidgetPath = SourcePath;
            if (SourceWidget === this)
                throwError('InvalidArgument: a SidebarWidgetPane can not show itself');
            if (SourceWidget.Page === this.Page)
                throwError('InvalidArgument: a SidebarWidgetPane can not show other widgets from the same page');
            this.rerender();
        }
    }
    get minPaneWidth() { return this._minPaneWidth; }
    set minPaneWidth(newSetting) {
        allowOrdinal('minimal pane width', newSetting);
        if (this._minPaneWidth !== newSetting) {
            this._minPaneWidth = newSetting;
            this.rerender();
        }
    }
    get minSidebarWidth() { return this._minSidebarWidth; }
    set minSidebarWidth(newSetting) {
        allowOrdinal('minimal sidebar width', newSetting);
        if (this._minSidebarWidth !== newSetting) {
            this._minSidebarWidth = newSetting;
            this.rerender();
        }
    }
    get maxSidebarWidth() { return this._maxSidebarWidth; }
    set maxSidebarWidth(newSetting) {
        allowOrdinal('maximal sidebar width', newSetting);
        if (this._maxSidebarWidth !== newSetting) {
            this._maxSidebarWidth = newSetting;
            this.rerender();
        }
    }
    /**** openSidebar ****/
    openSidebar() {
        switch (this._SidebarState) {
            case 'hidden':
                this._SidebarState = 'overlaid';
                this.rerender();
                if (this._onVisibilityChange != null) {
                    this._onVisibilityChange_();
                }
                return;
            case 'overlaid':
            case 'visible': return;
        }
    }
    /**** closeSidebar ****/
    closeSidebar() {
        switch (this._SidebarState) {
            case 'hidden': return;
            case 'overlaid':
                this._SidebarState = 'hidden';
                this.rerender();
                if (this._onVisibilityChange != null) {
                    this._onVisibilityChange_();
                }
                return;
            case 'visible': return;
        }
    }
    get SidebarState() { return this._SidebarState; }
    set SidebarState(_) { throwReadOnlyError('SidebarState'); }
    get onVisibilityChange() { return this._onVisibilityChange_; }
    set onVisibilityChange(newCallback) {
        allowFunction('"onVisibilityChange" callback', newCallback);
        this._onVisibilityChange = newCallback;
    }
    _onVisibilityChange_(...ArgList) {
        if ((ArgList.length === 1) && (typeof ArgList[0] === 'function')) {
            this._onVisibilityChange = ArgList[0];
        }
        else { // callback invocation
            try {
                if (this._onVisibilityChange != null) {
                    this._onVisibilityChange.apply(this, ArgList);
                }
            }
            catch (Signal) {
                console.warn('"onVisibilityChange" Callback Failure', Signal);
                setErrorReport(this, {
                    Type: 'Custom Callback Failure',
                    Sufferer: this, Message: '' + Signal, Cause: Signal
                });
            }
        }
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
    /**** _serializeConfigurationInto ****/
    _serializeConfigurationInto(Serialization) {
        super._serializeConfigurationInto(Serialization);
        [
            'primaryWidgetPath', 'SidebarWidgetPath',
            'minPaneWidth', 'minSidebarWidth', 'maxSidebarWidth',
        ].forEach((Name) => this._serializePropertyInto(Name, Serialization));
    }
    /**** _deserializeConfigurationFrom ****/
    _deserializeConfigurationFrom(Serialization) {
        super._deserializeConfigurationFrom(Serialization);
        this._primaryWidgetPath = acceptableOptionalPath(Serialization.primaryWidgetPath);
        this._SidebarWidgetPath = acceptableOptionalPath(Serialization.SidebarWidgetPath);
        this._minPaneWidth = acceptableOrdinal(Serialization.minPaneWidth, 200);
        this._minSidebarWidth = acceptableOrdinal(Serialization.minSidebarWidth, 100);
        this._maxSidebarWidth = acceptableOrdinal(Serialization.maxSidebarWidth, 200);
    }
    _releaseWidgets() {
        this._shownWidgets.forEach((Widget) => Widget._Pane = undefined);
    }
    componentWillUnmount() {
        this._releaseWidgets();
    }
    componentDidMount() {
        if (this._VisibilityChanged && (this._onVisibilityChange != null)) {
            this._onVisibilityChange_();
        }
    }
    componentDidUpdate() {
        if (this._VisibilityChanged && (this._onVisibilityChange != null)) {
            this._onVisibilityChange_();
        }
    }
}
builtInWidgetTypes['SidebarWidgetPane'] = WAT_SidebarWidgetPane;
appendStyle(`
  .WAT.Widget > .WAT.SidebarWidgetPane {
    overflow:hidden;
  }
  .WAT.Widget > .WAT.SidebarWidgetPane > .mainPane {
    display:block; position:absolute;
    top:0px; right:0px; bottom:0px; width:auto; height:auto;
  }
  .WAT.Widget > .WAT.SidebarWidgetPane > .SidebarUnderlay {
    display:block; position:absolute;
    left:0px; top:0px; right:0px; bottom:0px;
    background:black; opacity:0.1;
    pointer-events:auto;
  }
  .WAT.Widget > .WAT.SidebarWidgetPane > .Sidebar {
    display:block; position:absolute;
    left:0px; top:0px; right:auto; bottom:0px; height:auto;
  }
  `);
/**** Accordion ****/
export class WAT_Accordion extends WAT_Widget {
    constructor(Page) {
        super(Page);
        /**** Renderer ****/
        Object.defineProperty(this, "_Renderer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                return html `<div class="WAT Content Accordion">${this.Value}</div>`;
            }
        });
    }
    get Type() { return 'Accordion'; }
    set Type(_) { throwReadOnlyError('Type'); }
}
builtInWidgetTypes['Accordion'] = WAT_Accordion;
appendStyle(`
  .WAT.Widget > .WAT.Accordion {
  }
  `);
/**** AccordionFold ****/
export class WAT_AccordionFold extends WAT_Widget {
    constructor() {
        super(...arguments);
        /**** Renderer ****/
        Object.defineProperty(this, "_Renderer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                return html `<div class="WAT Content AccordionFold">${this.Value}</div>`;
            }
        });
    }
    get Type() { return 'AccordionFold'; }
    set Type(_) { throwReadOnlyError('Type'); }
}
builtInWidgetTypes['AccordionFold'] = WAT_AccordionFold;
appendStyle(`
  .WAT.Widget > .WAT.AccordionFold {
  }
  `);
/**** FlatListView ****/
export class WAT_FlatListView extends WAT_Widget {
    constructor(Page) {
        super(Page);
        /**** Placeholder ****/
        Object.defineProperty(this, "_Placeholder", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**** List ****/
        Object.defineProperty(this, "_List", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        /**** ItemRenderer ****/
        Object.defineProperty(this, "_ItemRenderer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**** SelectionLimit ****/
        Object.defineProperty(this, "_SelectionLimit", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**** selectedIndices ****/
        Object.defineProperty(this, "_selectedIndices", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        /**** onSelectionChange ****/
        Object.defineProperty(this, "_onSelectionChange", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**** onItemSelected ****/
        Object.defineProperty(this, "_onItemSelected", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**** onItemDeselected ****/
        Object.defineProperty(this, "_onItemDeselected", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**** Renderer ****/
        Object.defineProperty(this, "_Renderer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (PropSet) => {
                let List = acceptableList(this._List, []);
                let ItemRenderer = acceptableOptionalFunction(this._ItemRenderer);
                let Placeholder = acceptableTextline(this._Placeholder, '(empty)');
                let selectedIndices = acceptableListSatisfying(this._selectedIndices, [], ValueIsOrdinal);
                let SelectionLimit = acceptableOrdinal(this._SelectionLimit, 1);
                let onClick = acceptableOptionalFunction(this._onClick);
                let onDblClick = acceptableOptionalFunction(this._onDblClick);
                let onSelectionChange = acceptableOptionalFunction(this._onSelectionChange);
                let onItemSelected = acceptableOptionalFunction(this._onItemSelected);
                let onItemDeselected = acceptableOptionalFunction(this._onItemDeselected);
                if (ItemRenderer == null) {
                    ItemRenderer = (Item) => html `${Item + ''}`;
                }
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
                if (selectedIndices.length > SelectionLimit) {
                    const deselectedIndices = selectedIndices.slice(SelectionLimit);
                    selectedIndices.length = SelectionLimit;
                    this._onSelectionChange_(selectedIndices);
                    if (this._onItemDeselected != null) {
                        deselectedIndices.forEach((deselectedIndex) => {
                            this._onItemDeselected_(List[deselectedIndex], deselectedIndex);
                        });
                    }
                }
                const _onClick = (Event, Index) => {
                    Event.stopImmediatePropagation();
                    Event.preventDefault();
                    if (SelectionLimit === 0) {
                        return;
                    }
                    let SelectionChanged = false;
                    let IndicesToSelect, IndicesToDeselect;
                    if (Event.shiftKey || Event.metaKey) {
                        SelectionChanged = true;
                        if (ItemIsSelected(Index)) {
                            IndicesToDeselect = [Index];
                            selectedIndices = selectedIndices.filter((selectedIndex) => (selectedIndex !== Index));
                        }
                        else {
                            if (selectedIndices.length === SelectionLimit) {
                                IndicesToDeselect = [selectedIndices.shift()];
                            }
                            IndicesToSelect = [Index];
                            selectedIndices.push(Index);
                        }
                    }
                    else {
                        IndicesToDeselect = selectedIndices.filter((selectedIndex) => (selectedIndex !== Index));
                        SelectionChanged = !ItemIsSelected(Index);
                        IndicesToSelect = (SelectionChanged ? [Index] : []);
                        selectedIndices = [Index];
                    }
                    if (SelectionChanged && (this._onSelectionChange != null)) {
                        this._onSelectionChange_(selectedIndices);
                    }
                    // @ts-ignore TS2454 let's check IF variables were assigned
                    if ((IndicesToDeselect != null) && (this._onItemDeselected != null)) {
                        IndicesToDeselect.forEach((deselectedIndex) => {
                            this._onItemDeselected_(List[deselectedIndex], deselectedIndex);
                        });
                    }
                    // @ts-ignore TS2454 let's check IF variables were assigned
                    if ((IndicesToSelect != null) && (this._onItemSelected != null)) {
                        IndicesToSelect.forEach((selectedIndex) => {
                            this._onItemSelected_(List[selectedIndex], selectedIndex);
                        });
                    }
                    this._onClick_(Event, Index);
                };
                const _onDblClick = (Event, Index) => {
                    this._onDblClick_(Event, Index);
                };
                function ItemIsSelected(Index) {
                    return (Index in selectedIndexSet);
                }
                return html `<div class="WAT Content ${List.length === 0 ? 'empty' : ''} FlatListView"
        ...${PropSet}
      >
        ${List.length === 0
                    ? html `<div class="Placeholder"><div>${Placeholder}</></>`
                    : List.map((Item, Index) => html `<div
              class="ListItem ${ItemIsSelected(Index) ? 'selected' : undefined}"
              dangerouslySetInnerHTML=${{
                        __html: ItemRenderer(Item, Index, ItemIsSelected(Index))
                    }}
              onClick=${(Event) => _onClick(Event, Index)}
              onDblClick=${(Event) => _onDblClick(Event, Index)}
            />`)}
      </>`;
            }
        });
    }
    get Type() { return 'FlatListView'; }
    set Type(_) { throwReadOnlyError('Type'); }
    get Placeholder() { return this._Placeholder; }
    set Placeholder(newSetting) {
        allowTextline('placeholder', newSetting);
        if (this._Placeholder !== newSetting) {
            this._Placeholder = newSetting;
            this.rerender();
        }
    }
    get List() { return this._List.slice(); }
    set List(newList) {
        expectList('list', newList);
        if (ValuesDiffer(this._List, newList)) {
            this._List = newList.slice();
            this.rerender();
        }
    }
    get ItemRenderer() { return this._ItemRenderer; }
    set ItemRenderer(newCallback) {
        expectFunction('list item rendering callback', newCallback);
        this._ItemRenderer = newCallback;
    }
    get SelectionLimit() { return this._SelectionLimit; }
    set SelectionLimit(newSetting) {
        allowOrdinal('selection limit', newSetting);
        if (this._SelectionLimit !== newSetting) {
            this._SelectionLimit = newSetting;
            this.rerender();
        }
    }
    get selectedIndices() {
        return this._selectedIndices.slice();
    }
    set selectedIndices(newList) {
        expectListSatisfying('indicies of selected list elements', newList, ValueIsOrdinal);
        if (ValuesDiffer(this._selectedIndices, newList)) {
            const selectedIndexSet = Object.create(null);
            this._selectedIndices = newList.filter((selectedIndex) => {
                if ((selectedIndex < this._List.length) &&
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
    }
    get onSelectionChange() { return this._onSelectionChange_; }
    set onSelectionChange(newCallback) {
        allowFunction('"onSelectionChange" callback', newCallback);
        this._onSelectionChange = newCallback;
    }
    _onSelectionChange_(...ArgList) {
        if ((ArgList.length === 1) && (typeof ArgList[0] === 'function')) {
            this._onSelectionChange = ArgList[0];
        }
        else { // callback invocation
            try {
                if (this._onSelectionChange != null) {
                    this._onSelectionChange.apply(this, ArgList);
                }
            }
            catch (Signal) {
                console.warn('"onSelectionChange" Callback Failure', Signal);
                setErrorReport(this, {
                    Type: '"onSelectionChange" Callback Failure',
                    Sufferer: this, Message: '' + Signal, Cause: Signal
                });
            }
        }
    }
    get onItemSelected() { return this._onItemSelected_; }
    set onItemSelected(newCallback) {
        allowFunction('"onItemSelected" callback', newCallback);
        this._onItemSelected = newCallback;
    }
    _onItemSelected_(...ArgList) {
        if ((ArgList.length === 1) && (typeof ArgList[0] === 'function')) {
            this._onItemSelected = ArgList[0];
        }
        else { // callback invocation
            try {
                if (this._onItemSelected != null) {
                    this._onItemSelected.apply(this, ArgList);
                }
            }
            catch (Signal) {
                console.warn('"onItemSelected" Callback Failure', Signal);
                setErrorReport(this, {
                    Type: '"onItemSelected" Callback Failure',
                    Sufferer: this, Message: '' + Signal, Cause: Signal
                });
            }
        }
    }
    get onItemDeselected() { return this._onItemDeselected_; }
    set onItemDeselected(newCallback) {
        allowFunction('"onItemDeselected" callback', newCallback);
        this._onItemDeselected = newCallback;
    }
    _onItemDeselected_(...ArgList) {
        if ((ArgList.length === 1) && (typeof ArgList[0] === 'function')) {
            this._onItemDeselected = ArgList[0];
        }
        else { // callback invocation
            try {
                if (this._onItemDeselected != null) {
                    this._onItemDeselected.apply(this, ArgList);
                }
            }
            catch (Signal) {
                console.warn('"onItemDeselected" Callback Failure', Signal);
                setErrorReport(this, {
                    Type: '"onItemDeselected" Callback Failure',
                    Sufferer: this, Message: '' + Signal, Cause: Signal
                });
            }
        }
    }
    /**** _serializeConfigurationInto ****/
    _serializeConfigurationInto(Serialization) {
        super._serializeConfigurationInto(Serialization);
        [
            'Placeholder', 'SelectionLimit',
        ].forEach((Name) => this._serializePropertyInto(Name, Serialization));
    }
    /**** _deserializeConfigurationFrom ****/
    _deserializeConfigurationFrom(Serialization) {
        super._deserializeConfigurationFrom(Serialization);
        this._Placeholder = acceptableOptionalTextline(Serialization.Placeholder);
        this._SelectionLimit = acceptableOptionalOrdinal(Serialization.SelectionLimit);
    }
}
builtInWidgetTypes['FlatListView'] = WAT_FlatListView;
appendStyle(`
/**** FlatListView ****/

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
/**** nestedListView ****/
export class WAT_nestedListView extends WAT_Widget {
    constructor(Page) {
        super(Page);
        /**** Renderer ****/
        Object.defineProperty(this, "_Renderer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                return html `<div class="WAT Content nestedListView">${this.Value}</div>`;
            }
        });
    }
    get Type() { return 'nestedListView'; }
    set Type(_) { throwReadOnlyError('Type'); }
}
builtInWidgetTypes['nestedListView'] = WAT_nestedListView;
appendStyle(`
  .WAT.Widget > .WAT.nestedListView {
  }
  `);
/**** ValueIsTextFormat ****/
export const WAT_supportedTextFormats = [
    'application/javascript', 'application/typescript', 'application/json',
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/html', 'text/markdown', 'text/plain'
];
export function ValueIsTextFormat(Value) {
    return ValueIsOneOf(Value, WAT_supportedTextFormats);
}
/**** ValueIsHTMLFormat ****/
export const WAT_supportedHTMLFormats = [
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/html', 'text/markdown', 'text/plain'
];
export function ValueIsHTMLFormat(Value) {
    return ValueIsOneOf(Value, WAT_supportedHTMLFormats);
}
/**** ValueIsMarkdownFormat ****/
export const WAT_supportedMarkdownFormats = [
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/markdown', 'text/plain'
];
export function ValueIsMarkdownFormat(Value) {
    return ValueIsOneOf(Value, WAT_supportedMarkdownFormats);
}
/**** ValueIsImageFormat ****/
export const WAT_supportedImageFormats = [
    'image/apng', 'image/avif', 'image/bmp', 'image/gif', 'image/jpeg',
    'image/png', 'image/svg+xml', 'image/webp'
];
export function ValueIsImageFormat(Value) {
    return ValueIsOneOf(Value, WAT_supportedImageFormats);
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
        const Renderer = new PlainTextRenderer();
        Renderer.heading = (Text) => `\n${Text}\n\n`;
        Renderer.paragraph = (Text) => `${Text}\n\n`;
        Renderer.list = (Text) => `${Text}\n`;
        Renderer.listitem = (Text) => `- ${Text}\n`;
        Renderer.link = (HRef, Title, Text) => `${Text}`;
        Renderer.image = (HRef, Title, Text) => `[${Text}]`;
        Renderer.code = (Code) => `${Code}\n\n`;
        Renderer.blockquote = (Quote) => `${Quote}\n\n`;
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
async function PDFFileReadAsText(File) {
    const Buffer = await readBinaryFile(File);
    try {
        const { getDocument, GlobalWorkerOptions } = await import('https://cdn.jsdelivr.net/npm/pdfjs-dist/build/pdf.min.mjs');
        GlobalWorkerOptions.workerSrc = 'https://cdn.jsdelivr.net/npm/pdfjs-dist/build/pdf.worker.min.mjs';
        const PDF = await getDocument(Buffer).promise;
        let Text = '';
        for (let i = 1; i <= PDF.numPages; i++) {
            const Page = await PDF.getPage(i);
            const Content = await Page.getTextContent();
            Text += Content.items.map((Item) => Item.str).join('') + '\n';
        }
        return Text;
    }
    catch (Signal) {
        throwError('ConversionError: could not convert the given PDF file into plain text, reason: ' + Signal);
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
        return html `<div style="
        left:0px; top:0px; right:0px; bottom:0px
      ">
        <${WAT_AppletView} Applet=${Applet}/>
        ${Applet.isAttached && DesignerLayer && html `<${DesignerLayer} Applet=${Applet}/>`}
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
    }
    /**** componentDidMount ****/
    componentDidMount() {
        const Applet = this._Applet;
        Applet['_View'] = this.base;
        if (Applet['_onMount'] != null) {
            Applet._onMount_(); // no typo!
        }
        rerender();
    }
    /**** componentWillUnmount ****/
    componentWillUnmount() {
        const Applet = this._Applet;
        Applet['_View'] = undefined;
        if (Applet['_onUnmount'] != null) {
            Applet._onUnmount_(); // no typo!
        }
    }
    /**** render ****/
    render(PropSet) {
        const Applet = this._Applet = PropSet.Applet;
        const visitedPage = Applet.visitedPage;
        const openDialogs = Applet._DialogList;
        const lastDialogIndex = openDialogs.length - 1;
        const needsModalLayer = (openDialogs.length > 0) &&
            openDialogs[lastDialogIndex].isModal;
        const broken = (Applet.isBroken ? 'broken' : '');
        return html `<div class="WAT ${broken} Applet" style="
        ${Applet.CSSStyle}
        left:0px; top:0px; right:0px; bottom:0px;
      ">
        ${Applet.isAttached ? html `
          ${broken === '' ? Applet.Rendering() : ErrorRenderingFor(Applet)}
          ${visitedPage == null
            ? html `<div class="WAT centered" style="width:100%; height:100%"><div>(no page to show)</div></div>`
            : html `<${WAT_PageView} Page=${visitedPage}/>`}
        ` : ''}
      </div>
      ${Applet.isAttached && (openDialogs.length > 0) ? html `<div class="WAT DialogLayer">
        ${openDialogs.map((Dialog, Index) => html `
          ${(Index === lastDialogIndex) && needsModalLayer ? html `<${WAT_ModalLayer}/>` : ''}
          <${WAT_DialogView} Applet=${Applet} Dialog=${Dialog}/>
        `)}
      </div>` : ''}`;
    }
}
//------------------------------------------------------------------------------
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
    }
    /**** componentDidMount ****/
    componentDidMount() {
        const Page = this._Page;
        Page['_View'] = this.base;
        if (Page['_onMount'] != null) {
            Page._onMount_(); // no typo!
        }
    }
    /**** componentWillUnmount ****/
    componentWillUnmount() {
        this._releaseWidgets(this._shownWidgets);
        const Page = this._Page;
        Page['_View'] = undefined;
        if (Page['_onUnmount'] != null) {
            Page._onUnmount_(); // no typo!
        }
    }
    /**** _releaseWidgets ****/
    _releaseWidgets(WidgetList) {
        WidgetList.forEach((Widget) => {
            Widget._Pane = undefined;
            if ((Widget instanceof WAT_WidgetPane) ||
                (Widget instanceof WAT_DoubleWidgetPane) ||
                (Widget instanceof WAT_SidebarWidgetPane)) {
                Widget._releaseWidgets();
            }
        });
    }
    /**** render ****/
    render(PropSet) {
        const Page = this._Page = PropSet.Page;
        const broken = (Page.isBroken ? 'broken' : '');
        this._releaseWidgets(this._shownWidgets);
        const WidgetsToShow = Page.WidgetList.filter((Widget) => (Widget.isVisible && ((Widget._Pane == null) || (Widget._Pane === Page))));
        WidgetsToShow.forEach((Widget) => Widget._Pane = Page);
        this._shownWidgets = WidgetsToShow;
        return html `<div class="WAT ${broken} Page" style="
        ${Page.CSSStyle}
        left:0px; top:0px; right:0px; bottom:0px
      ">
        ${broken === '' ? Page.Rendering() : ErrorRenderingFor(Page)}
        ${WidgetsToShow.toReversed().map((Widget) => {
            return html `<${WAT_WidgetView} Widget=${Widget} Geometry=${Widget.Geometry}/>`;
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
    }
    /**** componentDidMount ****/
    componentDidMount() {
        const Widget = this._Widget;
        Widget['_View'] = this.base;
        if (Widget['_onMount'] != null) {
            Widget._onMount_(); // no typo!
        }
    }
    /**** componentWillUnmount ****/
    componentWillUnmount() {
        const Widget = this._Widget;
        Widget['_View'] = undefined;
        if (Widget['_onUnmount'] != null) {
            Widget._onUnmount_(); // no typo!
        }
    }
    /**** render ****/
    render(PropSet) {
        const Widget = this._Widget = PropSet.Widget;
        let { x, y, Width, Height } = PropSet.Geometry;
        const CSSGeometry = ((x != null) && (Width != null) && (y != null) && (Height != null)
            ? `left:${x}px; top:${y}px; width:${Width}px; height:${Height}px; right:auto; bottom:auto;`
            : '');
        const broken = (Widget.isBroken ? 'broken' : '');
        const openOverlays = Widget._OverlayList;
        const lastOverlayIndex = openOverlays.length - 1;
        return html `<div class="WAT ${broken} Widget" style="
        ${Widget.CSSStyle} ${CSSGeometry}
      ">
        ${broken === '' ? Widget.Rendering() : ErrorRenderingFor(Widget)}
      </div>
      ${(broken === '') && (openOverlays.length > 0) ? html `<div class="WAT OverlayLayer"
        style="${CSSGeometry}"
      >
        ${openOverlays.map((Overlay, Index) => html `
          ${(Index === lastOverlayIndex)
            ? html `<${WAT_Underlay} Widget=${Widget} Overlay=${Overlay}/>`
            : ''}
          <${WAT_OverlayView} Widget=${Widget} Overlay=${Overlay}/>
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
    componentDidMount() {
        WAT_ModalLayer_EventTypes.forEach((EventType) => {
            this.base.addEventListener(EventType, consumeEvent);
        });
    }
    componentWillUnmount() {
        WAT_ModalLayer_EventTypes.forEach((EventType) => {
            this.base.removeEventListener(EventType, consumeEvent);
        });
    }
    render(PropSet) {
        return html `<div class="WAT ModalLayer"/>`;
    }
}
//------------------------------------------------------------------------------
//--                              WAT_DialogView                              --
//------------------------------------------------------------------------------
class WAT_DialogView extends Component {
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
        Object.defineProperty(this, "_Dialog", {
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
        this._shownWidgets.forEach((Widget) => Widget._Pane = undefined);
    }
    /**** componentWillUnmount ****/
    componentWillUnmount() {
        this._releaseWidgets();
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
    } /**** dialog dragging and resizing ****/
    _handleDrag(dx, dy) {
        if (this._DragInfo.Mode === 'drag') {
            this._moveDialog(dx, dy);
        }
        else {
            this._resizeDialog(dx, dy);
        }
        this._Applet.bringDialogToFront(this._Dialog.Name);
        rerender();
    }
    _moveDialog(dx, dy) {
        this._Dialog.x = this._DragInfo.initialGeometry.x + dx;
        this._Dialog.y = this._DragInfo.initialGeometry.y + dy;
    }
    _resizeDialog(dx, dy) {
        const Dialog = this._Dialog;
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
                const { x, y, Width, Height } = this._Dialog;
                this._DragInfo.initialGeometry = { x, y, Width, Height };
                this._handleDrag(dx, dy);
            },
            onDragContinuation: (dx, dy) => this._handleDrag(dx, dy),
            onDragFinish: (dx, dy) => this._handleDrag(dx, dy),
            onDragAbortion: (dx, dy) => this._handleDrag(dx, dy),
        });
    }
    /**** render ****/
    render(PropSet) {
        this._releaseWidgets();
        const { Applet, Dialog } = PropSet;
        this._Applet = Applet;
        this._Dialog = Dialog;
        const { SourceWidgetPath, Title, isClosable, isDraggable, isResizable, x, y, Width, Height, } = Dialog;
        const hasTitlebar = (Title != null) || isDraggable || isClosable;
        const resizable = (isResizable ? 'resizable' : '');
        const withTitlebar = (hasTitlebar ? 'withTitlebar' : '');
        /**** repositioning on viewport ****/
        const { x: AppletX, y: AppletY } = Applet.Geometry;
        let { left, top } = fromDocumentTo('viewport', {
            left: x + AppletX, top: y + AppletY
        });
        left = Math.max(0, Math.min(left, document.documentElement.clientWidth - 30));
        top = Math.max(0, Math.min(top, document.documentElement.clientHeight - 30));
        /**** Event Handlers ****/
        this._installGestureRecognizer();
        let Recognizer = this._Recognizer;
        const onClose = () => {
            Applet.closeDialog(Dialog.Name);
        };
        /**** ContentPane Rendering ****/
        const SourceWidget = Applet.WidgetAtPath(SourceWidgetPath);
        if (SourceWidget == null) {
            this._shownWidgets = [];
        }
        else {
            const WidgetsToShow = (SourceWidget.Type === 'Outline'
                ? SourceWidget.bundledWidgets()
                : [SourceWidget]).filter((Widget) => (Widget.isVisible && ((Widget._Pane == null) || (Widget._Pane === Dialog))));
            WidgetsToShow.forEach((Widget) => Widget._Pane = Dialog);
            this._shownWidgets = WidgetsToShow;
        }
        const PaneGeometry = { x, y, Width, Height };
        if (hasTitlebar) {
            PaneGeometry.Height -= 30;
        }
        if (isResizable) {
            PaneGeometry.Height -= 10;
        }
        PaneGeometry.Height = Math.max(0, PaneGeometry.Height);
        const BaseGeometry = SourceWidget.Geometry;
        let ContentPane = this._shownWidgets.toReversed().map((Widget) => {
            let Geometry = this._GeometryOfWidgetRelativeTo(Widget, BaseGeometry, PaneGeometry);
            return html `<${WAT_WidgetView} Widget=${Widget} Geometry=${Geometry}/>`;
        });
        /**** actual dialog rendering ****/
        return html `<div class="WAT ${resizable} Dialog ${withTitlebar}" style="
        left:${left}px; top:${top}px; width:${Width}px; height:${Height}px;
      ">
        ${hasTitlebar && html `<div class="Titlebar"
          onPointerDown=${Recognizer} onPointerUp=${Recognizer}
          onPointerMove=${Recognizer} onPointerCancel=${Recognizer}
        >
          <div class="Title">${Title}</div>

          ${(isClosable) && html `
            <img class="CloseButton" src="${IconFolder}/xmark.png" onClick=${onClose}/>
          `}
        </div>`}

        <div class="ContentPane">${ContentPane}</div>

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
}
//------------------------------------------------------------------------------
//--                               WAT_Underlay                               --
//------------------------------------------------------------------------------
const WAT_Underlay_EventTypes = [
    'click', 'dblclick',
    /*'mousedown',*/ 'mouseup', 'mousemove', 'mouseover', 'mouseout',
    'mouseenter', 'mouseleave',
    /*'touchstart',*/ 'touchend', 'touchmove', 'touchcancel',
    /*'pointerdown',*/ 'pointerup', 'pointermove', 'pointerover', 'pointerout',
    'pointerenter', 'pointerleave', 'pointercancel',
    'keydown', 'keyup', 'keypress',
    'wheel', 'contextmenu', 'focus', 'blur'
];
class WAT_Underlay extends Component {
    componentDidMount() {
        WAT_Underlay_EventTypes.forEach((EventType) => {
            this.base.addEventListener(EventType, consumeEvent);
        });
    }
    componentWillUnmount() {
        WAT_Underlay_EventTypes.forEach((EventType) => {
            this.base.removeEventListener(EventType, consumeEvent);
        });
    }
    render(PropSet) {
        const { Widget, Overlay } = PropSet;
        const handleEvent = (Event) => {
            consumeEvent(Event);
            if (!Overlay.isModal) {
                Widget.closeOverlay(Overlay.Name);
            }
        };
        const modal = (Overlay.isModal ? 'modal' : '');
        return html `<div class="WAT ${modal} Underlay"
        onMouseDown=${handleEvent} onPointerDown=${handleEvent}
        onTouchStart=${handleEvent}
      />`;
    }
}
//------------------------------------------------------------------------------
//--                             WAT_OverlayView                              --
//------------------------------------------------------------------------------
class WAT_OverlayView extends Component {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "_shownWidgets", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
    }
    /**** _releaseWidgets ****/
    _releaseWidgets() {
        this._shownWidgets.forEach((Widget) => Widget._Pane = undefined);
    }
    /**** componentWillUnmount ****/
    componentWillUnmount() {
        this._releaseWidgets();
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
            const WidgetsToShow = (SourceWidget.Type === 'Outline'
                ? SourceWidget.bundledWidgets()
                : [SourceWidget]).filter((Widget) => (Widget.isVisible && ((Widget._Pane == null) || (Widget._Pane === Overlay))));
            WidgetsToShow.forEach((Widget) => Widget._Pane = Overlay);
            this._shownWidgets = WidgetsToShow;
        }
        const PaneGeometry = { x, y, Width, Height };
        const BaseGeometry = SourceWidget.Geometry;
        let ContentPane = this._shownWidgets.toReversed().map((Widget) => {
            let Geometry = this._GeometryOfWidgetRelativeTo(Widget, BaseGeometry, PaneGeometry);
            return html `<${WAT_WidgetView} Widget=${Widget} Geometry=${Geometry}/>`;
        });
        /**** actual overlay rendering ****/
        return html `<div class="WAT Overlay" style="
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
/**** rerender ****/
let combinedView = undefined;
export function rerender() {
    if (combinedView != null) {
        combinedView.rerender();
    }
} /**** useDesigner ****/
let DesignerLayer = undefined;
export function useDesigner(newDesigner) {
    allowFunction('WAT designer', newDesigner); // it's a preact function component
    console.log('installing WebApp Tinkerer Designer');
    DesignerLayer = newDesigner;
    rerender();
}
//------------------------------------------------------------------------------
//--                               WAT Startup                                --
//------------------------------------------------------------------------------
let AppletStore;
/**** startup ****/
function startup() {
    localforage.ready(function () {
        AppletStore = localforage.createInstance({
            name: 'WebApp Tinkerer'
        });
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
    let AppletName = acceptableName(AppletElement.getAttribute('name'), 'WAT-Applet');
    /**** read applet script - if stored separately ****/
    let ScriptElement = document.querySelector('script[type="wat/applet-script"]');
    /**** deserialize applet ****/
    let SerializationElement = document.querySelector('script[type="wat/applet"]');
    let Applet = undefined;
    let Serialization = await AppletStore.getItem(AppletName);
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
        if (ScriptElement != null) {
            Serialization.activeScript = ScriptElement.textContent || '';
        }
        try {
            Applet = WAT_Applet.deserializedFrom(Serialization);
        }
        catch (Signal) {
            console.error(`could not deserialize applet ${quoted(AppletName)}`, Signal);
        }
    }
    if (Applet == null) {
        Applet = WAT_Applet.deserializedFrom('{"PageList":[{ "WidgetList":[] }]}');
    }
    Applet._Name = AppletName;
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
/**** IdOfWidget ****/
const IdForWidget = new WeakMap();
function IdOfWidget(Widget) {
    if (IdForWidget.has(Widget)) {
        return IdForWidget.get(Widget);
    }
    else {
        let Id = newId();
        IdForWidget.set(Widget, Id);
        return Id;
    }
}
/**** newId - uses nanoid with custom dictionary ****/
export const newId = customAlphabet(nolookalikesSafe, 21);
const global = (new Function('return this'))();
global.WAT = {
    MarkdownAsText, MarkdownAsHTML
};
global.JIL = JIL;
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
