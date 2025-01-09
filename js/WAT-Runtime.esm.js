/*******************************************************************************
*                                                                              *
*                        WebApp Tinkerer (WAT) Runtime                         *
*                                                                              *
*******************************************************************************/
const IconFolder = 'https://rozek.github.io/webapp-tinkerer/icons';
import { ObjectMergedWith as Object_assign, 
//  throwError,
quoted, ValuesDiffer, ValueIsBoolean, ValueIsNumber, ValueIsFiniteNumber, ValueIsNumberInRange, ValueIsInteger, ValueIsIntegerInRange, ValueIsOrdinal, ValueIsString, ValueIsStringMatching, ValueIsText, ValueIsTextline, ValueIsObject, ValueIsPlainObject, ValueIsList, ValueIsListSatisfying, ValueIsFunction, ValueIsOneOf, ValueIsColor, ValueIsEMailAddress, /*ValueIsPhoneNumber,*/ ValueIsURL, ValidatorForClassifier, acceptNil, rejectNil, expectValue, allowBoolean, expectBoolean, allowNumber, expectNumber, allowFiniteNumber, allowNumberInRange, allowInteger, expectInteger, allowIntegerInRange, allowOrdinal, expectCardinal, expectString, allowStringMatching, allowText, expectText, allowTextline, expectTextline, expectPlainObject, expectList, allowListSatisfying, expectListSatisfying, allowFunction, expectFunction, allowOneOf, expectOneOf, allowColor, allowEMailAddress, /*allowPhoneNumber,*/ allowURL, } from 'javascript-interface-library';
import * as JIL from 'javascript-interface-library';
const ValueIsPhoneNumber = ValueIsTextline; // *C* should be implemented
const allowPhoneNumber = allowTextline; // *C* should be implemented
import { render, html, Component, useRef } from 'htm/preact';
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
/**** WAT Visual Categories ****/
const WAT_Categories = ['applet', 'page', 'widget'];
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
    'missing Behaviour',
    'Behaviour Compilation Failure', 'Behaviour Execution Failure',
    'Script Compilation Failure', 'Script Execution Failure',
    '"Value" Setting Failure', 'Rendering Failure',
    'Callback Failure',
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
/**** ValueIsIdentifier ****/
const WAT_IdentifierPattern = /^[a-z$_][a-z$_0-9]*$/i;
export function ValueIsIdentifier(Value) {
    return ValueIsStringMatching(Value, WAT_IdentifierPattern);
}
/**** allow/expect[ed]Identifier ****/
export const allowIdentifier = ValidatorForClassifier(ValueIsIdentifier, acceptNil, 'WAT identifier'), allowedIdentifier = allowIdentifier;
export const expectIdentifier = ValidatorForClassifier(ValueIsIdentifier, rejectNil, 'WAT identifier'), expectedIdentifier = expectIdentifier;
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
    if (!Registration.isNew) {
        return;
    }
    const StylesheetId = `WAT-Stylesheet_for_${Category}_Behavior_${Behavior}`;
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
//------------------------------------------------------------------------------
//--                               Acceptables                                --
//------------------------------------------------------------------------------
/**** acceptableBoolean ****/
export function acceptableBoolean(Value, Default) {
    return (ValueIsBoolean(Value) ? Value : Default);
}
/**** acceptableOptionalBoolean ****/
export function acceptableOptionalBoolean(Value) {
    return (ValueIsBoolean(Value) ? Value : undefined);
}
/**** acceptableNumber ****/
export function acceptableNumber(Value, Default) {
    return (ValueIsNumber(Value) ? Value : Default);
}
/**** acceptableOptionalNumber ****/
export function acceptableOptionalNumber(Value) {
    return (ValueIsNumber(Value) ? Value : undefined);
}
/**** acceptableNumberInRange ****/
export function acceptableNumberInRange(Value, Default, minValue = -Infinity, maxValue = Infinity, withMin = false, withMax = false) {
    return (ValueIsNumberInRange(Value, minValue, maxValue, withMin, withMax) ? Value : Default);
}
/**** acceptableOptionalNumberInRange ****/
export function acceptableOptionalNumberInRange(Value, minValue = -Infinity, maxValue = Infinity, withMin = false, withMax = false) {
    return (ValueIsNumberInRange(Value, minValue, maxValue, withMin, withMax)
        ? Value
        : undefined);
}
/**** acceptableInteger ****/
export function acceptableInteger(Value, Default) {
    return (ValueIsInteger(Value) ? Value : Default);
}
/**** acceptableOptionalInteger ****/
export function acceptableOptionalInteger(Value) {
    return (ValueIsInteger(Value) ? Value : undefined);
}
/**** acceptableIntegerInRange ****/
export function acceptableIntegerInRange(Value, Default, minValue = -Infinity, maxValue = Infinity) {
    return (ValueIsIntegerInRange(Value, minValue, maxValue) ? Value : Default);
}
/**** acceptableOptionalIntegerInRange ****/
export function acceptableOptionalIntegerInRange(Value, minValue = -Infinity, maxValue = Infinity) {
    return (ValueIsIntegerInRange(Value, minValue, maxValue) ? Value : undefined);
}
/**** acceptableOrdinal ****/
export function acceptableOrdinal(Value, Default) {
    return (ValueIsOrdinal(Value) ? Value : Default);
}
/**** acceptableOptionalOrdinal ****/
export function acceptableOptionalOrdinal(Value) {
    return (ValueIsOrdinal(Value) ? Value : undefined);
}
/**** acceptableString ****/
export function acceptableString(Value, Default) {
    return (ValueIsString(Value) ? Value : Default);
}
/**** acceptableOptionalString ****/
export function acceptableOptionalString(Value) {
    return (ValueIsString(Value) ? Value : undefined);
}
/**** acceptableNonEmptyString ****/
export function acceptableNonEmptyString(Value, Default) {
    return (ValueIsString(Value) && (Value.trim() !== '') ? Value : Default);
}
/**** acceptableOptionalNonEmptyString ****/
export function acceptableOptionalNonEmptyString(Value) {
    return (ValueIsString(Value) && (Value.trim() !== '') ? Value : undefined);
}
/**** acceptableStringMatching ****/
export function acceptableStringMatching(Value, Default, Pattern) {
    return (ValueIsStringMatching(Value, Pattern) ? Value : Default);
}
/**** acceptableOptionalStringMatching ****/
export function acceptableOptionalStringMatching(Value, Pattern) {
    return (ValueIsStringMatching(Value, Pattern) ? Value : undefined);
}
/**** acceptableText ****/
const noCtrlCharsButCRLFTABPattern = /^[^\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x9F\u2028\u2029\uFFF9-\uFFFB]*$/;
export function acceptableText(Value, Default) {
    return (ValueIsStringMatching(Value, noCtrlCharsButCRLFTABPattern) ? Value : Default);
}
/**** acceptableOptionalText ****/
export function acceptableOptionalText(Value) {
    return (ValueIsText(Value) ? Value : undefined);
}
/**** acceptableTextline ****/
export function acceptableTextline(Value, Default) {
    return (ValueIsTextline(Value) ? Value : Default).replace(/[\f\r\n\v\u0085\u2028\u2029].*$/, '...');
}
/**** acceptableOptionalTextline ****/
export function acceptableOptionalTextline(Value) {
    const Result = ValueIsTextline(Value) ? Value : undefined;
    return (Result == null
        ? undefined
        : Result.replace(/[\f\r\n\v\u0085\u2028\u2029].*$/, '...'));
}
/**** acceptableFunction ****/
export function acceptableFunction(Value, Default) {
    return (ValueIsFunction(Value) ? Value : Default);
}
/**** acceptableOptionalFunction ****/
export function acceptableOptionalFunction(Value) {
    return (ValueIsFunction(Value) ? Value : undefined);
}
/**** acceptableList ****/
export function acceptableList(Value, Default) {
    return (ValueIsList(Value) ? Value : Default);
}
/**** acceptableOptionalList ****/
export function acceptableOptionalList(Value) {
    return (ValueIsList(Value) ? Value : undefined);
}
/**** acceptableListSatisfying ****/
export function acceptableListSatisfying(Value, Default, Matcher) {
    return (ValueIsListSatisfying(Value, Matcher) ? Value : Default);
}
/**** acceptableOptionalListSatisfying ****/
export function acceptableOptionalListSatisfying(Value, Matcher) {
    return (ValueIsListSatisfying(Value, Matcher) ? Value : undefined);
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
export function acceptableOptionalColor(Value) {
    return (ValueIsColor(Value) ? Value : undefined);
}
/**** acceptableOptionalEMailAddress ****/
export function acceptableOptionalEMailAddress(Value) {
    return (ValueIsEMailAddress(Value) ? Value : undefined);
}
/**** acceptableOptionalPhoneNumber ****/
export function acceptableOptionalPhoneNumber(Value) {
    return ( /*ValueIsPhoneNumber*/ValueIsTextline(Value) ? Value : undefined);
}
/**** acceptableOptionalURL ****/
export function acceptableOptionalURL(Value) {
    return (ValueIsURL(Value) ? Value : undefined);
}
/**** acceptableBehavior ****/
export function acceptableBehavior(Value, Default) {
    return (ValueIsBehavior(Value) ? Value : Default);
}
/**** acceptableOptionalBehavior ****/
export function acceptableOptionalBehavior(Value) {
    return (ValueIsBehavior(Value) ? Value : undefined);
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
//--                             Behavior Support                             --
//------------------------------------------------------------------------------
/**** BehaviorIsIntrinsic ****/
export function BehaviorIsIntrinsic(Behavior) {
    expectBehavior('behavior', Behavior);
    return /^(basic|native|traditional|mobile|wearable)_controls\./.test(Behavior.toLowerCase());
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
    const activeScript = compiledScript.toString()
        .replace(/^[^\n]+\n/, '') // removes first line (i.e., function head)
        .replace(/\n[^\n]+$/, ''); // removes last line (with trailing "}")
    // @ts-ignore TS7053 allow indexing
    Applet._BehaviorPool[Category][normalizedName] = {
        Category, Name, activeScript, compiledScript
    };
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
        Sufferer: Visual, Message: '' + Signal, Cause: Error
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
    'linelist-input', 'numberlist-input'
];
/**** forbiddenPropertyNames ****/
const forbiddenPropertyNames = Object.create(null);
function collectInternalNames() {
    // @ts-ignore TS2345 allow abstract class as argument
    collectInternalNamesFrom(WAT_Visual);
    collectInternalNamesFrom(WAT_Applet);
    collectInternalNamesFrom(WAT_Page);
    collectInternalNamesFrom(WAT_Widget);
    delete forbiddenPropertyNames['Value']; // "Value" may be customized
}
function collectInternalNamesFrom(WAT_Class) {
    Object.getOwnPropertyNames(WAT_Class.prototype).forEach((Name) => {
        if (!Name.startsWith('_')) {
            forbiddenPropertyNames[Name] = true;
        }
    });
}
/**** validatePropertyName ****/
function validatePropertyName(Name) {
    if (Name in forbiddenPropertyNames)
        throwError('InvalidArgument: forbidden property name ' + quoted(Name));
}
/**** ValueIsPropertyDescriptor ****/
function ValueIsPropertyDescriptor(Value) {
    if (!ValueIsPlainObject(Value) ||
        !ValueIsIdentifier(Value.Name) ||
        (Value.Name in forbiddenPropertyNames) ||
        (Value.Label != null) && !ValueIsTextline(Value.Label) ||
        (Value.EditorType == null) ||
        !ValueIsOneOf(Value.EditorType, WAT_PropertyEditorTypes) ||
        (Value.readonly != null) && !ValueIsBoolean(Value.readonly)) {
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
                (multiple != null) && !ValueIsBoolean(multiple) && (EditorType === 'email-address-input') ||
                (SpellChecking != null) && !ValueIsBoolean(SpellChecking) && (EditorType === 'textline-input') ||
                (Pattern != null) && !ValueIsTextline(Pattern) ||
                (Suggestions != null) && !ValueIsListSatisfying(Suggestions, ValueIsTextline)) {
                return false;
            }
            break;
        case 'number-input':
            if ((Placeholder != null) && !ValueIsTextline(Placeholder) ||
                (minValue != null) && !ValueIsFiniteNumber(minValue) ||
                (maxValue != null) && !ValueIsFiniteNumber(maxValue) ||
                (Stepping != null) && !ValueIsNumberInRange(Stepping, 0, Infinity, false) && (Stepping !== 'any') ||
                (Suggestions != null) && !ValueIsListSatisfying(Suggestions, ValueIsFiniteNumber)) {
                return false;
            }
            break;
        case 'integer-input':
            if ((Placeholder != null) && !ValueIsTextline(Placeholder) ||
                (minValue != null) && !ValueIsInteger(minValue) ||
                (maxValue != null) && !ValueIsInteger(maxValue) ||
                (Stepping != null) && !ValueIsIntegerInRange(Stepping, 0, Infinity) && (Stepping !== 'any') ||
                (Suggestions != null) && !ValueIsListSatisfying(Suggestions, ValueIsInteger)) {
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
            if ((Placeholder != null) && !ValueIsTextline(Placeholder) ||
                (minLength != null) && !ValueIsOrdinal(minLength) ||
                (maxLength != null) && !ValueIsOrdinal(maxLength) ||
                (Resizability != null) && !ValueIsOneOf(Resizability, ['none', 'horizontal', 'vertical', 'both']) ||
                (LineWrapping != null) && !ValueIsBoolean(LineWrapping)) {
                return false;
            }
            break;
    }
    return true;
}
/**** normalizedPropertyDescriptor ****/
function normalizedPropertyDescriptor(Value) {
    if (!ValueIsPropertyDescriptor(Value))
        throwError(`InvalidArgument: invalid property ${Value.Name == null ? '' : quoted('' + Value.Name)}`);
    let { Name, Label, EditorType, readonly, Placeholder, FalseValue, TrueValue, minLength, maxLength, multiple, Pattern, minValue, maxValue, Stepping, Resizability, LineWrapping, SpellChecking, ValueList, Hashmarks, Suggestions } = Value;
    if (Label == null) {
        Label = Name;
    }
    let Descriptor = { Name, Label, EditorType };
    if (readonly != null) {
        Descriptor.readonly = readonly;
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
            Descriptor.ValueList = ValueList;
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
            break;
    }
    return Descriptor;
}
//----------------------------------------------------------------------------//
//                              Callback Support                              //
//----------------------------------------------------------------------------//
function noCallback() { }
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
            this._configurableProperties = newProperties;
            this.rerender();
        }
    }
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
        this._CallbackRegistry = undefined;
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
        const onRender = this.on.bind(this, 'render');
        const onMount = this.on.bind(this, 'mount');
        const onUnmount = this.on.bind(this, 'unmount');
        const onValueChange = this.on.bind(this, 'value-change');
        function installStylesheet(Stylesheet) {
            throwError('NotForVisualScripts: visual scripts must not install behavior stylesheets');
        }
        /**** run behavior script first ****/
        this._ErrorReport = undefined;
        const Applet = this.Applet;
        if (Applet == null)
            throwError('NotAttached: this visual is not attached');
        const Category = this.Category;
        const Behavior = this.Behavior;
        if (Behavior != null) {
            // @ts-ignore TS7053 allow indexing
            const Registration = Applet._BehaviorPool[Category][Behavior.toLowerCase()];
            if (Registration == null) {
                missingBehavior(this);
            }
            else {
                try {
                    await Registration.compiledScript.call(this, this, this, html, reactively, onRender, onMount, onUnmount, onValueChange, installStylesheetForBehavior.bind(this, Applet, Category, Behavior), (Registration === null || Registration === void 0 ? void 0 : Registration.isNew) || false);
                    Registration.isNew = false;
                }
                catch (Signal) {
                    Registration.isNew = false;
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
            compiledScript = new AsyncFunction('me,my, html,reactively, onRender,onMount,onUnmount,onValueChange, ' +
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
            await compiledScript.call(this, this, this, html, reactively, onRender, onMount, onUnmount, onValueChange, installStylesheet, false // Behavior.isNew
            );
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
                compiledScript = new AsyncFunction('me,my, html,reactively, onRender,onMount,onUnmount,onValueChange, BehaviorIsNew', pendingScript);
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
    on(CallbackName, newCallback) {
        var _a;
        expectTextline('callback name', CallbackName);
        const normalizedCallbackName = CallbackName.toLowerCase();
        if (arguments.length === 1) {
            return ((_a = this._CallbackRegistry) === null || _a === void 0 ? void 0 : _a[normalizedCallbackName]) || noCallback;
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
                if ((normalizedCallbackName === 'mount') && this.isMounted) {
                    // @ts-ignore TS2532 no, "this._CallbackRegistry" is no longer undefined
                    this._CallbackRegistry['mount'](); // very special case
                }
            }
            return newCallback || noCallback;
        }
    }
    _Callback(CallbackName, Callback, ...ArgList) {
        try {
            return Callback.apply(this, ArgList);
        }
        catch (Signal) {
            console.warn(`callback ${quoted(CallbackName)} failed`, Signal);
            setErrorReport(this, {
                Type: 'Callback Handling Failure',
                Sufferer: this, Message: '' + Signal, Cause: Signal
            });
        }
    }
    /**** Renderer ****/
    get Renderer() { return this.on('render'); }
    set Renderer(newRenderer) {
        allowFunction('renderer', newRenderer);
        if (newRenderer == null) {
            newRenderer = () => '';
        }
        this.on('render', newRenderer);
        this.rerender();
    }
    /**** Rendering - generates the rendering for this widget ****/
    Rendering() {
        return this.on('render')();
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
    /**** _serializeConfigurationInto ****/
    _serializeConfigurationInto(Serialization) {
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
            'Behavior', 'Name', 'Synopsis',
            'FontFamily', 'FontSize', 'FontWeight', 'FontStyle',
            'TextDecoration', 'TextShadow', 'TextAlignment', 'LineHeight',
            'ForegroundColor', 'hasBackground', 'BackgroundColor', 'BackgroundTexture',
            'BorderWidths', 'BorderStyles', 'BorderColors', 'BorderRadii', 'BoxShadow',
            'Opacity', 'OverflowVisibility', 'Cursor',
            'activeScript', 'pendingScript',
            'memoized',
        ].forEach((Name) => this._serializePropertyInto(Name, Serialization));
        if (this._configurableProperties.length > 0) {
            Serialization.configurableProperties = this._configurableProperties.map((Descriptor) => (Object.assign({}, Descriptor)));
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
        if (ValueIsListSatisfying(Serialization.configurableProperties, ValueIsPropertyDescriptor)) {
            // @ts-ignore TS18047 "configurableProperties" is not null
            this._configurableProperties = Serialization.configurableProperties.map((Descriptor) => normalizedPropertyDescriptor(Descriptor));
        }
        ;
        [
            /*'Behavior', */ 'Name', 'Synopsis',
            'FontFamily', 'FontSize', 'FontWeight', 'FontStyle',
            'TextDecoration', 'TextShadow', 'TextAlignment', 'LineHeight',
            'ForegroundColor', 'hasBackground', 'BackgroundColor', 'BackgroundTexture',
            'BorderWidths', 'BorderStyles', 'BorderColors', 'BorderRadii', 'BoxShadow',
            'Opacity', 'OverflowVisibility', 'Cursor',
            /*'activeScript',*/ 'pendingScript',
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
        /**** DialogNamed ****/
        Object.defineProperty(this, "_DialogList", {
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
            const compiledScript = new AsyncFunction('me,my, html,reactively, onRender,onMount,onUnmount,onValueChange, ' +
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
                }
                break;
            case 'page':
                this.PagesWithBehavior(oldName).forEach((Page) => {
                    Page['_Behavior'] = newName;
                    Page['_normalizedBehavior'] = normalizedNewName;
                });
                break;
            case 'widget':
                this.WidgetsWithBehavior(oldName).forEach((Widget) => {
                    Widget['_Behavior'] = newName;
                    Widget['_normalizedBehavior'] = normalizedNewName;
                });
        }
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
        if (activeScript === pendingScript) {
            return;
        }
        try {
            // @ts-ignore TS7053 allow indexing
            this._BehaviorPool[Category][normalizedBehavior].pendingError = undefined;
            // @ts-ignore TS2351 AsyncFunction *is* constructible
            const compiledScript = new AsyncFunction('me,my, html,reactively, onRender,onMount,onUnmount,onValueChange, ' +
                'installStylesheet,BehaviorIsNew', pendingScript);
        }
        catch (Signal) {
            console.warn(`Script Compilation Failure for ${Category} behavior ${Behavior}`, Signal);
            // @ts-ignore TS7053 allow indexing
            this._BehaviorPool[Category][normalizedBehavior].pendingError = Signal;
        }
        this.registerBehaviorOfCategory(Category, Behavior, pendingScript);
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
        // @ts-ignore TS7053 allow indexing
        const Registration = this._BehaviorPool[Category][normalizedBehavior];
        if (Registration == null)
            throwError(`InvalidArgument: no ${Category} behaviour ${quoted(Behavior)} found`);
        const { Name, activeScript } = Registration;
        return { BehaviorSet: { [Category]: [{
                        Name, Script: activeScript
                    }] } };
    }
    /**** SerializationOfBehavior ****/
    SerializationOfBehaviors(groupedBehaviorList) {
        expectPlainObject('grouped behavior list', groupedBehaviorList);
        const Serialization = {};
        let SerializationIsEmpty = true;
        if ('applet' in groupedBehaviorList) {
            let AppletBehaviors = groupedBehaviorList['applet'];
            expectListSatisfying('list of applet behaviors', AppletBehaviors, ValueIsBehavior);
            AppletBehaviors = AppletBehaviors.filter((Behavior) => Behavior.toLowerCase() in this._BehaviorPool['applet']);
            if (AppletBehaviors.length > 0) {
                SerializationIsEmpty = false;
                Serialization['applet'] = AppletBehaviors.map((Behavior) => {
                    let Registration = this._BehaviorPool['applet'][Behavior.toLowerCase()];
                    return { Name: Registration.Name, Script: Registration.activeScript };
                });
            }
        }
        if ('page' in groupedBehaviorList) {
            let PageBehaviors = groupedBehaviorList['page'];
            expectListSatisfying('list of page behaviors', PageBehaviors, ValueIsBehavior);
            PageBehaviors = PageBehaviors.filter((Behavior) => Behavior.toLowerCase() in this._BehaviorPool['page']);
            if (PageBehaviors.length > 0) {
                SerializationIsEmpty = false;
                Serialization['page'] = PageBehaviors.map((Behavior) => {
                    let Registration = this._BehaviorPool['page'][Behavior.toLowerCase()];
                    return { Name: Registration.Name, Script: Registration.activeScript };
                });
            }
        }
        if ('widget' in groupedBehaviorList) {
            let WidgetBehaviors = groupedBehaviorList['widget'];
            expectListSatisfying('list of widget behaviors', WidgetBehaviors, ValueIsBehavior);
            WidgetBehaviors = WidgetBehaviors.filter((Behavior) => Behavior.toLowerCase() in this._BehaviorPool['widget']);
            if (WidgetBehaviors.length > 0) {
                SerializationIsEmpty = false;
                Serialization['widget'] = WidgetBehaviors.map((Behavior) => {
                    let Registration = this._BehaviorPool['widget'][Behavior.toLowerCase()];
                    return { Name: Registration.Name, Script: Registration.activeScript };
                });
            }
        }
        return (SerializationIsEmpty ? undefined : Serialization);
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
                    const WidgetsToShow = (SourceWidget.normalizedBehavior === 'plain_controls.outline'
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
            const WidgetsToShow = (SourceWidget.normalizedBehavior === 'plain_controls.outline'
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
        const Behavior = acceptableOptionalBehavior(Serialization.Behavior);
        let newPage = new WAT_Page(Behavior, this);
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
        this._serializeBehaviorsInto(Result);
        this._serializeConfigurationInto(Result);
        this._serializePagesInto(Result);
        return Result;
    }
    set Serialization(_) { throwReadOnlyError('Serialization'); }
    /**** _serializeBehaviorsInto ****/
    _serializeBehaviorsInto(Serialization) {
        const BehaviorSet = this.BehaviorSet;
        Serialization.BehaviorSet = { applet: {}, page: {}, widget: {} };
        Object.keys(BehaviorSet.applet).forEach((normalizedBehavior) => {
            if (!BehaviorIsIntrinsic(normalizedBehavior)) {
                const { Name, activeScript } = BehaviorSet.applet[normalizedBehavior];
                // @ts-ignore TS18047 Serialization.BehaviorSet is not null
                Serialization.BehaviorSet.applet[Name] = activeScript;
            }
        });
        Object.keys(BehaviorSet.page).forEach((normalizedBehavior) => {
            if (!BehaviorIsIntrinsic(normalizedBehavior)) {
                const { Name, activeScript } = BehaviorSet.page[normalizedBehavior];
                // @ts-ignore TS18047 Serialization.BehaviorSet is not null
                Serialization.BehaviorSet.page[Name] = activeScript;
            }
        });
        Object.keys(BehaviorSet.widget).forEach((normalizedBehavior) => {
            if (!BehaviorIsIntrinsic(normalizedBehavior)) {
                const { Name, activeScript } = BehaviorSet.widget[normalizedBehavior];
                // @ts-ignore TS18047 Serialization.BehaviorSet is not null
                Serialization.BehaviorSet.widget[Name] = activeScript;
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
        // @ts-ignore TS18047 BehaviorSet is not null
        const AppletBehaviorSet = BehaviorSet['applet'];
        if (ValueIsPlainObject(AppletBehaviorSet)) {
            Object.entries(AppletBehaviorSet).forEach(([Name, Script]) => {
                if (ValueIsBehavior(Name) && ValueIsText(Script)) {
                    this.registerBehaviorOfCategory('applet', Name, Script);
                }
            });
        }
        // @ts-ignore TS18047 BehaviorSet is not null
        const PageBehaviorSet = BehaviorSet['page'];
        if (ValueIsPlainObject(PageBehaviorSet)) {
            Object.entries(PageBehaviorSet).forEach(([Name, Script]) => {
                if (ValueIsBehavior(Name) && ValueIsText(Script)) {
                    this.registerBehaviorOfCategory('page', Name, Script);
                }
            });
        }
        // @ts-ignore TS18047 BehaviorSet is not null
        const WidgetBehaviorSet = BehaviorSet['widget'];
        if (ValueIsPlainObject(WidgetBehaviorSet)) {
            Object.entries(WidgetBehaviorSet).forEach(([Name, Script]) => {
                if (ValueIsBehavior(Name) && ValueIsText(Script)) {
                    this.registerBehaviorOfCategory('widget', Name, Script);
                }
            });
        }
    }
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
        const Behavior = acceptableOptionalBehavior(Serialization.Behavior);
        const Applet = new WAT_Applet(Behavior);
        const AppletName = Serialization.Name;
        delete Serialization.Name;
        if (ValueIsName(AppletName)) {
            Applet._Name = AppletName;
        }
        registerIntrinsicBehaviorsIn(Applet);
        Applet._deserializeBehaviorsFrom(Serialization);
        Applet._deserializeConfigurationFrom(Serialization);
        Applet._deserializePagesFrom(Serialization);
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
        this.on('mount')();
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
    constructor(Behavior, Applet) {
        super(Behavior, Applet);
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
        var _a;
        allowBehavior('applet behavior', newBehavior);
        const normalizedBehavior = (newBehavior == null ? undefined : newBehavior.toLowerCase());
        if (this._normalizedBehavior !== normalizedBehavior) {
            this._normalizedBehavior = normalizedBehavior;
            // @ts-ignore TS7053 allow indexing
            this._Behavior = ((_a = this._BehaviorPool['applet'][normalizedBehavior]) === null || _a === void 0 ? void 0 : _a.Name) || newBehavior;
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
        const Behavior = acceptableOptionalBehavior(Serialization.Behavior);
        let Widget = new WAT_Widget(Behavior, this);
        this._WidgetList.splice(Index, 0, Widget);
        // @ts-ignore TS2446 allow WAT_Page to access a protected member of WAT_Widget
        Widget._deserializeConfigurationFrom(Serialization);
        this.rerender();
        return Widget;
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
        /**** OverflowVisibility - not inheritable ****/
        Object.defineProperty(this, "_OverflowVisibility", {
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
            'Lock', 'Visibility', 'Enabling'
        ].forEach((Name) => deserializeProperty(Name));
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
export const WAT_DefaultSandboxPermissions = ('allow-downloads allow-forms allow-modals allow-orientation-lock ' +
    'allow-pointer-lock allow-popups allow-same-origin allow-scripts');
export const WAT_ReferrerPolicies = [
    'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin',
    'same-origin', 'strict-origin', 'strict-origin', 'strict-origin-when-cross-origin',
    'unsafe-url'
];
/**** for Slider ****/
const HashmarkPattern = /^\s*([+-]?(\d+([.]\d+)?|[.]\d+)([eE][+-]?\d+)?|\d*[.](?:\d*))(?:\s*:\s*([^\x00-\x1F\x7F-\x9F\u2028\u2029\uFFF9-\uFFFB]+))?$/;
function HashmarkMatcher(Value) {
    return ValueIsStringMatching(Value, HashmarkPattern) || ValueIsNumber(Value);
}
/**** for TimeInput ****/
export const WAT_TimePattern = '\\d{2}:\\d{2}';
export const WAT_TimeRegExp = /\d{2}:\d{2}/;
export function WAT_TimeMatcher(Value) {
    return ValueIsStringMatching(Value, WAT_TimeRegExp);
}
/**** for DateTimeInput ****/
export const WAT_DateTimePattern = '\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}';
export const WAT_DateTimeRegExp = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/;
export function WAT_DateTimeMatcher(Value) {
    return ValueIsStringMatching(Value, WAT_DateTimeRegExp);
}
/**** for DateInput ****/
export const WAT_DatePattern = '\\d{4}-\\d{2}-\\d{2}';
export const WAT_DateRegExp = /\d{4}-\d{2}-\d{2}/;
export function WAT_DateMatcher(Value) {
    return ValueIsStringMatching(Value, WAT_DateRegExp);
}
/**** for WeekInput ****/
export const WAT_WeekPattern = '\\d{4}-W\\d{2}';
export const WAT_WeekRegExp = /\d{4}-W\d{2}/;
export function WAT_WeekMatcher(Value) {
    return ValueIsStringMatching(Value, WAT_WeekRegExp);
}
/**** for MonthInput ****/
export const WAT_MonthPattern = '\\d{4}-\\d{2}';
export const WAT_MonthRegExp = /\d{4}-\d{2}/;
export function WAT_MonthMatcher(Value) {
    return ValueIsStringMatching(Value, WAT_MonthRegExp);
}
/**** for MarkdownView ****/
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
/**** now actually register all intrinsic behaviours ****/
function registerIntrinsicBehaviorsIn(Applet) {
    /**** plain_Widget ****/
    const WAT_plainWidget = async (me, my, html, reactively, onRender, onMount, onUnmount, onValueChange, installStylesheet, BehaviorIsNew) => {
        onRender(() => html `<div class="WAT plainWidget"/>`);
    };
    registerIntrinsicBehavior(Applet, 'widget', 'basic_controls.plain_Widget', WAT_plainWidget);
    /**** Outline ****/
    const WAT_Outline = async (me, my, html, reactively, onRender, onMount, onUnmount, onValueChange, installStylesheet, BehaviorIsNew) => {
        installStylesheet(`
      .WAT.Widget > .WAT.Outline {
        outline:dotted 1px blue;
        outline-offset:2px;
      }
    `);
        /**** custom Properties ****/
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
    const WAT_WidgetPane = async (me, my, html, reactively, onRender, onMount, onUnmount, onValueChange, installStylesheet, BehaviorIsNew) => {
        installStylesheet(`
      .WAT.Widget > .WAT.WidgetPane {
        overflow:hidden;
      }
    `);
        /**** custom Properties ****/
        my.configurableProperties = [
            { Name: 'Value', EditorType: 'textline-input', Placeholder: '(enter content path)' }
        ];
        Object_assign(me, {
            /**** Value ****/
            get Value() {
                return acceptableOptionalTextline(this.memoized.Value);
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
                if (SourceWidget == null) {
                    if (this.memoized.Value != null) {
                        this.memoized.Value = undefined;
                        this.on('value-change')();
                        this.rerender();
                    }
                    return;
                }
                if (SourceWidget === this)
                    throwError('InvalidArgument: a WidgetPane can not show itself');
                if (SourceWidget.Page === this.Page)
                    throwError('InvalidArgument: a WidgetPane can not show other widgets from the same page');
                if (this._Value !== SourcePath) {
                    this.memoized.Value = SourcePath;
                    this.on('value-change')();
                    this.rerender();
                }
            },
            /**** _releaseWidgets ****/
            _shownWidgets: [],
            _releaseWidgets: function () {
                this._shownWidgets.forEach((Widget) => Widget._Pane = undefined);
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
            if (Value == null) {
                return '';
            }
            const SourceWidget = (_a = this.Applet) === null || _a === void 0 ? void 0 : _a.WidgetAtPath(Value);
            if ((SourceWidget == null) || (SourceWidget === this)) {
                return '';
            }
            const WidgetsToShow = (SourceWidget.normalizedBehavior === 'basic_controls.outline'
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
        });
    };
    registerIntrinsicBehavior(Applet, 'widget', 'basic_controls.WidgetPane', WAT_WidgetPane);
    /**** TextView ****/
    const WAT_TextView = async (me, my, html, reactively, onRender, onMount, onUnmount, onValueChange, installStylesheet, BehaviorIsNew) => {
        installStylesheet(`
      .WAT.Widget > .WAT.TextView {
        overflow-y:scroll;
      }
    `);
        /**** custom Properties ****/
        my.configurableProperties = [
            { Name: 'Value', EditorType: 'text-input', Placeholder: '(enter text)' },
            { Name: 'readonly', EditorType: 'checkbox' },
            { Name: 'acceptableFileTypes', Label: 'File Types', EditorType: 'linelist-input' },
        ];
        Object_assign(me, {
            /**** Value ****/
            get Value() {
                return acceptableOptionalText(this.memoized.Value);
            },
            set Value(newValue) {
                allowText('value', newValue);
                if (newValue == null) {
                    newValue = '';
                }
                if (this.memoized.Value !== newValue) {
                    this.memoized.Value = newValue;
                    this.on('value-change')();
                    this.rerender();
                }
            },
            /**** readonly ****/
            get readonly() {
                return acceptableBoolean(this.memoized.readonly, true);
            },
            set readonly(newSetting) {
                allowBoolean('readonly setting', newSetting);
                if (this.memoized.readonly !== newSetting) {
                    this.memoized.readonly = newSetting;
                    this.rerender();
                }
            },
            /**** acceptableFileTypes ****/
            get acceptableFileTypes() {
                return acceptableListSatisfying(this.memoized.acceptableFileTypes, [], ValueIsHTMLFormat).slice();
            },
            set acceptableFileTypes(newSetting) {
                allowListSatisfying('acceptable file types', newSetting, ValueIsTextFormat);
                if (newSetting == null) {
                    newSetting = [];
                }
                if (ValuesDiffer(this.memoized.acceptableFileTypes, newSetting)) {
                    this.memoized.acceptableFileTypes = newSetting.slice();
                    this.rerender();
                }
            },
        });
        /**** Renderer ****/
        onRender(function () {
            const { Enabling, readonly } = this;
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
            return html `<div class="WAT Content TextView"
        onDragOver=${allowsDropping && _onDragOver} onDrop=${allowsDropping && _onDrop}
      >${this.Value}</>`;
        });
    };
    registerIntrinsicBehavior(Applet, 'widget', 'basic_controls.TextView', WAT_TextView);
    /**** HTMLView ****/
    const WAT_HTMLView = async (me, my, html, reactively, onRender, onMount, onUnmount, onValueChange, installStylesheet, BehaviorIsNew) => {
        installStylesheet(`
      .WAT.Widget > .WAT.HTMLView {
        overflow-y:scroll;
      }
    `);
        /**** custom Properties ****/
        my.configurableProperties = [
            { Name: 'Value', EditorType: 'text-input', Placeholder: '(enter HTML)' },
            { Name: 'readonly', EditorType: 'checkbox' },
            { Name: 'acceptableFileTypes', Label: 'File Types', EditorType: 'linelist-input' },
        ];
        Object_assign(me, {
            /**** Value ****/
            get Value() {
                return acceptableOptionalText(this.memoized.Value);
            },
            set Value(newValue) {
                allowText('value', newValue);
                if (newValue == null) {
                    newValue = '';
                }
                if (this.memoized.Value !== newValue) {
                    this.memoized.Value = newValue;
                    this.on('value-change')();
                    this.rerender();
                }
            },
            /**** readonly ****/
            get readonly() {
                return acceptableBoolean(this.memoized.readonly, true);
            },
            set readonly(newSetting) {
                allowBoolean('readonly setting', newSetting);
                if (this.memoized.readonly !== newSetting) {
                    this.memoized.readonly = newSetting;
                    this.rerender();
                }
            },
            /**** acceptableFileTypes ****/
            get acceptableFileTypes() {
                return acceptableListSatisfying(this.memoized.acceptableFileTypes, [], ValueIsHTMLFormat).slice();
            },
            set acceptableFileTypes(newSetting) {
                allowListSatisfying('acceptable file types', newSetting, ValueIsHTMLFormat);
                if (newSetting == null) {
                    newSetting = [];
                }
                if (ValuesDiffer(this.memoized.acceptableFileTypes, newSetting)) {
                    this.memoized.acceptableFileTypes = newSetting.slice();
                    this.rerender();
                }
            },
        });
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
                            this.on('drop-error')(Event);
                        }
                    }
                }
            };
            /**** actual rendering ****/
            return html `<div class="WAT Content HTMLView"
        onDragOver=${allowsDropping && _onDragOver} onDrop=${allowsDropping && _onDrop}
        dangerouslySetInnerHTML=${{ __html: this.Value || '' }}
      />`;
        });
    };
    registerIntrinsicBehavior(Applet, 'widget', 'basic_controls.HTMLView', WAT_HTMLView);
    /**** ImageView ****/
    const WAT_ImageView = async (me, my, html, reactively, onRender, onMount, onUnmount, onValueChange, installStylesheet, BehaviorIsNew) => {
        installStylesheet(`
      .WAT.Widget > .WAT.ImageView {
        object-fit:contain; object-position:center;
      }
    `);
        /**** custom Properties ****/
        my.configurableProperties = [
            { Name: 'Value', EditorType: 'url-input', Placeholder: '(enter Image URL)' },
            { Name: 'readonly', EditorType: 'checkbox' },
            { Name: 'ImageScaling', EditorType: 'drop-down', ValueList: WAT_ImageScalings },
            { Name: 'ImageAlignment', EditorType: 'drop-down', ValueList: WAT_ImageAlignments },
            { Name: 'acceptableFileTypes', Label: 'File Types', EditorType: 'linelist-input' },
        ];
        Object_assign(me, {
            /**** Value ****/
            get Value() {
                return acceptableOptionalURL(this.memoized.Value);
            },
            set Value(newValue) {
                allowText('value', newValue);
                if (newValue == null) {
                    newValue = '';
                }
                if (this.memoized.Value !== newValue) {
                    this.memoized.Value = newValue;
                    this.on('value-change')();
                    this.rerender();
                }
            },
            /**** ImageScaling ****/
            get ImageScaling() {
                return acceptableOneOf(this.memoized.ImageScaling, 'contain', WAT_ImageScalings);
            },
            set ImageScaling(newSetting) {
                allowOneOf('image scaling', newSetting, WAT_ImageScalings);
                if (this.memoized.ImageScaling !== newSetting) {
                    this.memoized.ImageScaling = newSetting;
                    this.rerender();
                }
            },
            /**** ImageAlignment ****/
            get ImageAlignment() {
                return acceptableOneOf(this.memoized.ImageAlignment, 'center', WAT_ImageAlignments);
            },
            set ImageAlignment(newSetting) {
                allowOneOf('image alignment', newSetting, WAT_ImageAlignments);
                if (this.memoized.ImageAlignment !== newSetting) {
                    this.memoized.ImageAlignment = newSetting;
                    this.rerender();
                }
            },
            /**** readonly ****/
            get readonly() {
                return acceptableBoolean(this.memoized.readonly, true);
            },
            set readonly(newSetting) {
                allowBoolean('readonly setting', newSetting);
                if (this.memoized.readonly !== newSetting) {
                    this.memoized.readonly = newSetting;
                    this.rerender();
                }
            },
            /**** acceptableFileTypes ****/
            get acceptableFileTypes() {
                return acceptableListSatisfying(this.memoized.acceptableFileTypes, [], ValueIsHTMLFormat).slice();
            },
            set acceptableFileTypes(newSetting) {
                allowListSatisfying('acceptable file types', newSetting, ValueIsImageFormat);
                if (newSetting == null) {
                    newSetting = [];
                }
                if (ValuesDiffer(this.memoized.acceptableFileTypes, newSetting)) {
                    this.memoized.acceptableFileTypes = newSetting.slice();
                    this.rerender();
                }
            },
        });
        /**** Renderer ****/
        onRender(function () {
            const { ImageScaling, ImageAlignment, Enabling, readonly } = this;
            let acceptableFileTypes = this.acceptableFileTypes;
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
                            this.on('drop-error')(Event);
                        }
                    }
                }
            };
            /**** actual rendering ****/
            return html `<img class="WAT Content ImageView"
        src=${this.Value || ''}
        style="object-fit:${ImageScaling}; object-position:${ImageAlignment}"
        onDragOver=${allowsDropping && _onDragOver} onDrop=${allowsDropping && _onDrop}
      />`;
        });
    };
    registerIntrinsicBehavior(Applet, 'widget', 'basic_controls.ImageView', WAT_ImageView);
    /**** SVGView ****/
    const WAT_SVGView = async (me, my, html, reactively, onRender, onMount, onUnmount, onValueChange, installStylesheet, BehaviorIsNew) => {
        installStylesheet(`
      .WAT.Widget > .WAT.SVGView {
        object-fit:contain; object-position:center;
      }
    `);
        /**** custom Properties ****/
        my.configurableProperties = [
            { Name: 'Value', EditorType: 'text-input', Placeholder: '(enter SVG)' },
            { Name: 'ImageScaling', EditorType: 'drop-down', ValueList: WAT_ImageScalings },
            { Name: 'ImageAlignment', EditorType: 'drop-down', ValueList: WAT_ImageAlignments },
        ];
        Object_assign(me, {
            /**** Value ****/
            get Value() {
                return acceptableOptionalText(this.memoized.Value);
            },
            set Value(newValue) {
                allowText('value', newValue);
                if (newValue == null) {
                    newValue = '';
                }
                if (this.memoized.Value !== newValue) {
                    this.memoized.Value = newValue;
                    this.on('value-change')();
                    this.rerender();
                }
            },
            /**** ImageScaling ****/
            get ImageScaling() {
                return acceptableOneOf(this.memoized.ImageScaling, 'contain', WAT_ImageScalings);
            },
            set ImageScaling(newSetting) {
                allowOneOf('image scaling', newSetting, WAT_ImageScalings);
                if (this.memoized.ImageScaling !== newSetting) {
                    this.memoized.ImageScaling = newSetting;
                    this.rerender();
                }
            },
            /**** ImageAlignment ****/
            get ImageAlignment() {
                return acceptableOneOf(this.memoized.ImageAlignment, 'center', WAT_ImageAlignments);
            },
            set ImageAlignment(newSetting) {
                allowOneOf('image alignment', newSetting, WAT_ImageAlignments);
                if (this.memoized.ImageAlignment !== newSetting) {
                    this.memoized.ImageAlignment = newSetting;
                    this.rerender();
                }
            },
        });
        /**** Renderer ****/
        onRender(function () {
            const DataURL = 'data:image/svg+xml;base64,' + btoa(this.memoized.Value || '');
            const { ImageScaling, ImageAlignment } = this;
            return html `<img class="WAT Content SVGView"
        src=${DataURL}
        style="object-fit:${ImageScaling}; object-position:${ImageAlignment}"
      />`;
        });
    };
    registerIntrinsicBehavior(Applet, 'widget', 'basic_controls.SVGView', WAT_SVGView);
    /**** WebView ****/
    const WAT_WebView = async (me, my, html, reactively, onRender, onMount, onUnmount, onValueChange, installStylesheet, BehaviorIsNew) => {
        /**** custom Properties ****/
        my.configurableProperties = [
            { Name: 'Value', EditorType: 'url-input', Placeholder: '(enter URL)' },
            { Name: 'PermissionsPolicy', EditorType: 'textline-input' },
            { Name: 'allowsFullscreen', EditorType: 'checkbox' },
            { Name: 'SandboxPermissions', EditorType: 'textline-input' },
            { Name: 'ReferrerPolicy', EditorType: 'drop-down', ValueList: WAT_ReferrerPolicies },
        ];
        Object_assign(me, {
            /**** Value ****/
            get Value() {
                return acceptableOptionalURL(this.memoized.Value);
            },
            set Value(newValue) {
                allowText('value', newValue);
                if (newValue == null) {
                    newValue = '';
                }
                if (this.memoized.Value !== newValue) {
                    this.memoized.Value = newValue;
                    this.on('value-change')();
                    this.rerender();
                }
            },
            /**** PermissionsPolicy ****/
            get PermissionsPolicy() {
                return acceptableOptionalTextline(this.memoized.PermissionsPolicy);
            },
            set PermissionsPolicy(newSetting) {
                allowTextline('permissions policy', newSetting);
                if (this.memoized.PermissionsPolicy !== newSetting) {
                    this.memoized.PermissionsPolicy = newSetting;
                    this.rerender();
                }
            },
            /**** allowsFullscreen ****/
            get allowsFullscreen() {
                return acceptableBoolean(this.memoized.allowsFullscreen, false);
            },
            set allowsFullscreen(newSetting) {
                allowBoolean('fullscreen permission', newSetting);
                if (this.memoized.allowsFullscreen !== newSetting) {
                    this.memoized.allowsFullscreen = newSetting;
                    this.rerender();
                }
            },
            /**** SandboxPermissions ****/
            get SandboxPermissions() {
                return acceptableTextline(this.memoized.SandboxPermissions, WAT_DefaultSandboxPermissions);
            },
            set SandboxPermissions(newSetting) {
                allowTextline('sandbox permissions', newSetting);
                if (this.memoized.SandboxPermissions !== newSetting) {
                    this.memoized.SandboxPermissions = newSetting;
                    this.rerender();
                }
            },
            /**** ReferrerPolicy ****/
            get ReferrerPolicy() {
                return acceptableOneOf(this.memoized.ReferrerPolicy, 'strict-origin-when-cross-origin', WAT_ReferrerPolicies);
            },
            set ReferrerPolicy(newSetting) {
                allowOneOf('referrer policy', newSetting, WAT_ReferrerPolicies);
                if (this.memoized.ReferrerPolicy !== newSetting) {
                    this.memoized.ReferrerPolicy = newSetting;
                    this.rerender();
                }
            },
        });
        /**** Renderer ****/
        onRender(function () {
            const { PermissionsPolicy, allowsFullscreen, SandboxPermissions, ReferrerPolicy } = this.memoized;
            return html `<iframe class="WAT Content WebView"
        src=${this.Value || ''}
        allow=${PermissionsPolicy} allowfullscreen=${allowsFullscreen}
        sandbox=${SandboxPermissions} referrerpolicy=${ReferrerPolicy}
      />`;
        });
    };
    registerIntrinsicBehavior(Applet, 'widget', 'basic_controls.WebView', WAT_WebView);
    /**** Button ****/
    const WAT_Button = async (me, my, html, reactively, onRender, onMount, onUnmount, onValueChange, installStylesheet, BehaviorIsNew) => {
        installStylesheet(`
      .WAT.Widget > .WAT.Button {
        border:solid 1px black; border-radius:4px;
        background:white;
        font-weight:bold; color:black;
        text-align:center;
      }
    `);
        /**** custom Properties ****/
        my.configurableProperties = [
            { Name: 'Label', EditorType: 'textline-input', Placeholder: '(enter label)' },
        ];
        Object_assign(me, {
            /**** Label ****/
            get Label() {
                return acceptableTextline(this.memoized.Label, 'Button');
            },
            set Label(newValue) {
                allowTextline('button label', newValue);
                if (this.memoized.Label !== newValue) {
                    this.memoized.Label = newValue;
                    this.rerender();
                }
            },
        });
        /**** Renderer ****/
        onRender(function () {
            const onClick = (Event) => {
                if (this.Enabling == false) {
                    return consumingEvent(Event);
                }
                this.on('click')(Event);
            };
            const Label = this.memoized.Label;
            return html `<button class="WAT Content Button" style="
        line-height:${this.LineHeight || this.Height}px;
      " disabled=${this.Enabling == false} onClick=${onClick}
      >${Label}</>`;
        });
    };
    registerIntrinsicBehavior(Applet, 'widget', 'native_controls.Button', WAT_Button);
    /**** Checkbox ****/
    const WAT_Checkbox = async (me, my, html, reactively, onRender, onMount, onUnmount, onValueChange, installStylesheet, BehaviorIsNew) => {
        installStylesheet(`
      .WAT.Widget > .WAT.Checkbox {
        left:50%; top:50%;
        transform:translate(-50%,-50%);
      }
    `);
        /**** custom Properties ****/
        my.configurableProperties = [
            { Name: 'Value', EditorType: 'checkbox' },
        ];
        Object_assign(me, {
            /**** Value ****/
            get Value() {
                return acceptableOptionalBoolean(this.memoized.Value);
            },
            set Value(newValue) {
                allowBoolean('value', newValue);
                if (this.memoized.Value !== newValue) {
                    this.memoized.Value = newValue;
                    this.on('value-change')();
                    this.rerender();
                }
            },
        });
        /**** Renderer ****/
        onRender(function () {
            const onClick = (Event) => {
                if (this.Enabling == false) {
                    return consumingEvent(Event);
                }
                this.Value = Event.target.checked;
                this.on('value-change')();
            };
            const Value = this.Value;
            const checked = (Value == true);
            const indeterminate = (Value == null);
            return html `<input type="checkbox" class="WAT Checkbox"
        checked=${checked} indeterminate=${indeterminate}
        disabled=${this.Enabling == false} onClick=${onClick}
      />`;
        });
    };
    registerIntrinsicBehavior(Applet, 'widget', 'native_controls.Checkbox', WAT_Checkbox);
    /**** Radiobutton ****/
    const WAT_Radiobutton = async (me, my, html, reactively, onRender, onMount, onUnmount, onValueChange, installStylesheet, BehaviorIsNew) => {
        installStylesheet(`
      .WAT.Widget > .WAT.Radiobutton {
        left:50%; top:50%;
        transform:translate(-50%,-50%);
      }
    `);
        /**** custom Properties ****/
        my.configurableProperties = [
            { Name: 'Value', EditorType: 'checkbox' },
        ];
        Object_assign(me, {
            /**** Value ****/
            get Value() {
                return acceptableBoolean(this.memoized.Value, false);
            },
            set Value(newValue) {
                expectBoolean('value', newValue);
                if (this.memoized.Value !== newValue) {
                    this.memoized.Value = newValue;
                    this.on('value-change')();
                    this.rerender();
                }
            },
        });
        /**** Renderer ****/
        onRender(function () {
            const onClick = (Event) => {
                if (this.Enabling == false) {
                    return consumingEvent(Event);
                }
                this.Value = Event.target.checked;
                this.on('value-change')();
            };
            return html `<input type="radio" class="WAT Radiobutton"
        checked=${this.Value == true}
        disabled=${this.Enabling == false} onClick=${onClick}
      />`;
        });
    };
    registerIntrinsicBehavior(Applet, 'widget', 'native_controls.Radiobutton', WAT_Radiobutton);
    /**** Gauge ****/
    const WAT_Gauge = async (me, my, html, reactively, onRender, onMount, onUnmount, onValueChange, installStylesheet, BehaviorIsNew) => {
        /**** custom Properties ****/
        my.configurableProperties = [
            { Name: 'Value', EditorType: 'number-input' },
            { Name: 'Minimum', EditorType: 'number-input' },
            { Name: 'lowerBound', EditorType: 'number-input' },
            { Name: 'Optimum', EditorType: 'number-input' },
            { Name: 'upperBound', EditorType: 'number-input' },
            { Name: 'Maximum', EditorType: 'number-input' },
        ];
        Object_assign(me, {
            /**** Value ****/
            get Value() {
                return acceptableOptionalNumber(this.memoized.Value);
            },
            set Value(newValue) {
                allowFiniteNumber('value', newValue);
                if (this.memoized.Value !== newValue) {
                    this.memoized.Value = newValue;
                    this.on('value-change')();
                    this.rerender();
                }
            },
            /**** Minimum ****/
            get Minimum() {
                return acceptableOptionalNumber(this.memoized.Minimum);
            },
            set Minimum(newValue) {
                allowNumber('minimal value', newValue);
                if (this.memoized.Minimum !== newValue) {
                    this.memoized.Minimum = newValue;
                    this.rerender();
                }
            },
            /**** lowerBound ****/
            get lowerBound() {
                return acceptableOptionalNumber(this.memoized.lowerBound);
            },
            set lowerBound(newValue) {
                allowNumber('lower bound', newValue);
                if (this.memoized.lowerBound !== newValue) {
                    this.memoized.lowerBound = newValue;
                    this.rerender();
                }
            },
            /**** Optimum ****/
            get Optimum() {
                return acceptableOptionalNumber(this.memoized.Optimum);
            },
            set Optimum(newValue) {
                allowNumber('optimum', newValue);
                if (this.memoized.Optimum !== newValue) {
                    this.memoized.Optimum = newValue;
                    this.rerender();
                }
            },
            /**** upperBound ****/
            get upperBound() {
                return acceptableOptionalNumber(this.memoized.upperBound);
            },
            set upperBound(newValue) {
                allowNumber('upper bound', newValue);
                if (this.memoized.upperBound !== newValue) {
                    this.memoized.upperBound = newValue;
                    this.rerender();
                }
            },
            /**** Maximum ****/
            get Maximum() {
                return acceptableOptionalNumber(this.memoized.Maximum);
            },
            set Maximum(newValue) {
                allowNumber('maximal value', newValue);
                if (this.memoized.Maximum !== newValue) {
                    this.memoized.Maximum = newValue;
                    this.rerender();
                }
            },
        });
        /**** Renderer ****/
        onRender(function () {
            const { Value, Minimum, lowerBound, Optimum, upperBound, Maximum } = this;
            return html `<meter class="WAT Content Gauge" value=${Value}
        min=${Minimum} low=${lowerBound} opt=${Optimum}
        high=${upperBound} max=${Maximum}
      />`;
        });
    };
    registerIntrinsicBehavior(Applet, 'widget', 'native_controls.Gauge', WAT_Gauge);
    /**** Progressbar ****/
    const WAT_Progressbar = async (me, my, html, reactively, onRender, onMount, onUnmount, onValueChange, installStylesheet, BehaviorIsNew) => {
        installStylesheet(`
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
        /**** custom Properties ****/
        my.configurableProperties = [
            { Name: 'Value', EditorType: 'number-input' },
            { Name: 'Maximum', EditorType: 'number-input' },
        ];
        Object_assign(me, {
            /**** Value ****/
            get Value() {
                return acceptableOptionalNumber(this.memoized.Value);
            },
            set Value(newValue) {
                allowFiniteNumber('value', newValue);
                if (this.memoized.Value !== newValue) {
                    this.memoized.Value = newValue;
                    this.on('value-change')();
                    this.rerender();
                }
            },
            /**** Maximum ****/
            get Maximum() {
                return acceptableOptionalNumberInRange(this.memoized.Maximum, 0, Infinity, true);
            },
            set Maximum(newValue) {
                allowNumber('maximal value', newValue);
                if (this.memoized.Maximum !== newValue) {
                    this.memoized.Maximum = newValue;
                    this.rerender();
                }
            },
        });
        /**** Renderer ****/
        onRender(function () {
            const { Value, Maximum } = this;
            return html `<progress class="WAT Content Progressbar" value=${Value} max=${Maximum}
      style="accent-color:${this.ForegroundColor || 'dodgerblue'}"/>`;
        });
    };
    registerIntrinsicBehavior(Applet, 'widget', 'native_controls.Progressbar', WAT_Progressbar);
    /**** Slider ****/
    const WAT_Slider = async (me, my, html, reactively, onRender, onMount, onUnmount, onValueChange, installStylesheet, BehaviorIsNew) => {
        /**** custom Properties ****/
        my.configurableProperties = [
            { Name: 'Value', EditorType: 'number-input' },
            { Name: 'Minimum', EditorType: 'number-input' },
            { Name: 'Stepping', EditorType: 'number-input', Minimum: 0 },
            { Name: 'Maximum', EditorType: 'number-input' },
            { Name: 'Hashmarks', EditorType: 'linelist-input' },
        ];
        Object_assign(me, {
            /**** Value ****/
            get Value() {
                return acceptableOptionalNumber(this.memoized.Value);
            },
            set Value(newValue) {
                allowFiniteNumber('value', newValue);
                if (this.memoized.Value !== newValue) {
                    this.memoized.Value = newValue;
                    this.on('value-change')();
                    this.rerender();
                }
            },
            /**** Minimum ****/
            get Minimum() {
                return acceptableOptionalNumber(this.memoized.Minimum);
            },
            set Minimum(newValue) {
                allowNumber('minimal value', newValue);
                if (this.memoized.Minimum !== newValue) {
                    this.memoized.Minimum = newValue;
                    this.rerender();
                }
            },
            /**** Stepping ****/
            get Stepping() {
                const Candidate = this.memoized.Stepping;
                return (Candidate === 'any' ? 'any' : acceptableOptionalNumberInRange(Candidate, 0, Infinity, false));
            },
            set Stepping(newValue) {
                if (newValue !== 'any') {
                    allowNumberInRange('step value', newValue, 0, Infinity, false);
                }
                if (this.memoized.Stepping !== newValue) {
                    this.memoized.Stepping = newValue;
                    this.rerender();
                }
            },
            /**** Maximum ****/
            get Maximum() {
                return acceptableOptionalNumber(this.memoized.Maximum);
            },
            set Maximum(newValue) {
                allowNumber('maximal value', newValue);
                if (this.memoized.Maximum !== newValue) {
                    this.memoized.Maximum = newValue;
                    this.rerender();
                }
            },
            /**** Hashmarks ****/
            get Hashmarks() {
                const Candidate = acceptableOptionalListSatisfying(this.memoized.Hashmarks, HashmarkMatcher);
                return (Candidate == null ? undefined : Candidate.slice());
            },
            set Hashmarks(newValue) {
                allowListSatisfying('hashmark list', newValue, HashmarkMatcher);
                if (ValuesDiffer(this.memoized.Hashmarks, newValue)) {
                    this.memoized.Hashmarks = (newValue == null ? newValue : newValue.slice());
                    this.rerender();
                }
            },
        });
        /**** Renderer ****/
        onRender(function () {
            const { Value, Enabling } = this;
            /**** handle external changes ****/
            const shownValue = useRef('');
            const InputElement = useRef(null);
            let ValueToShow = Value;
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
                this.on('input')(Event);
            };
            const _onBlur = (Event) => {
                this.on('blur')(Event);
                this.rerender();
            };
            /**** process any other parameters ****/
            const { Minimum, Stepping, Maximum, Hashmarks } = this;
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
        });
    };
    registerIntrinsicBehavior(Applet, 'widget', 'native_controls.Slider', WAT_Slider);
    /**** TextlineInput ****/
    const WAT_TextlineInput = async (me, my, html, reactively, onRender, onMount, onUnmount, onValueChange, installStylesheet, BehaviorIsNew) => {
        installStylesheet(`
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
        /**** custom Properties ****/
        my.configurableProperties = [
            { Name: 'Value', EditorType: 'textline-input' },
            { Name: 'Placeholder', EditorType: 'textline-input' },
            { Name: 'readonly', EditorType: 'checkbox' },
            { Name: 'minLength', EditorType: 'number-input', Minimum: 0, Stepping: 1 },
            { Name: 'maxLength', EditorType: 'number-input', Minimum: 0, Stepping: 1 },
            { Name: 'Pattern', EditorType: 'textline-input' },
            { Name: 'SpellChecking', EditorType: 'checkbox' },
            { Name: 'Suggestions', EditorType: 'linelist-input' },
        ];
        Object_assign(me, {
            /**** Value ****/
            get Value() {
                return acceptableOptionalTextline(this.memoized.Value);
            },
            set Value(newValue) {
                allowTextline('value', newValue);
                if (newValue == null) {
                    newValue = '';
                }
                if (this.memoized.Value !== newValue) {
                    this.memoized.Value = newValue;
                    this.on('value-change')();
                    this.rerender();
                }
            },
            /**** Placeholder ****/
            get Placeholder() {
                return acceptableOptionalTextline(this.memoized.Placeholder);
            },
            set Placeholder(newValue) {
                allowTextline('input placeholder', newValue);
                if (this.memoized.Placeholder !== newValue) {
                    this.memoized.Placeholder = newValue;
                    this.rerender();
                }
            },
            /**** readonly ****/
            get readonly() {
                return acceptableBoolean(this.memoized.readonly, false);
            },
            set readonly(newValue) {
                expectBoolean('readonly setting', newValue);
                if (this.memoized.readonly !== newValue) {
                    this.memoized.readonly = newValue;
                    this.rerender();
                }
            },
            /**** minLength ****/
            get minLength() {
                return acceptableOptionalOrdinal(this.memoized.minLength);
            },
            set minLength(newValue) {
                allowOrdinal('minimal input length', newValue);
                if (this.memoized.minLength !== newValue) {
                    this.memoized.minLength = newValue;
                    this.rerender();
                }
            },
            /**** maxLength ****/
            get maxLength() {
                return acceptableOptionalOrdinal(this.memoized.maxLength);
            },
            set maxLength(newValue) {
                allowOrdinal('maximal input length', newValue);
                if (this.memoized.maxLength !== newValue) {
                    this.memoized.maxLength = newValue;
                    this.rerender();
                }
            },
            /**** Pattern ****/
            get Pattern() {
                return acceptableOptionalTextline(this.memoized.Pattern);
            },
            set Pattern(newValue) {
                allowTextline('input pattern', newValue);
                if (this.memoized.Pattern !== newValue) {
                    this.memoized.Pattern = newValue;
                    this.rerender();
                }
            },
            /**** SpellChecking ****/
            get SpellChecking() {
                return acceptableBoolean(this.memoized.SpellChecking, false);
            },
            set SpellChecking(newValue) {
                expectBoolean('spell check setting', newValue);
                if (this.memoized.SpellChecking !== newValue) {
                    this.memoized.SpellChecking = newValue;
                    this.rerender();
                }
            },
            /**** Suggestions ****/
            get Suggestions() {
                const Candidate = acceptableOptionalListSatisfying(this.memoized.Suggestions, ValueIsTextline);
                return (Candidate == null ? undefined : Candidate.slice());
            },
            set Suggestions(newValue) {
                allowListSatisfying('suggestion list', newValue, ValueIsTextline);
                if (ValuesDiffer(this.memoized.Suggestions, newValue)) {
                    this.memoized.Suggestions = (newValue == null ? newValue : newValue.slice());
                    this.rerender();
                }
            },
        });
        /**** Renderer ****/
        onRender(function () {
            const { Value, Enabling } = this;
            /**** handle external changes ****/
            let ValueToShow = Value || '';
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
                this.on('input')(Event);
            };
            const _onBlur = (Event) => {
                this.rerender();
                this.on('blur')(Event);
            };
            /**** process any other parameters ****/
            const { Placeholder, readonly, minLength, maxLength, Pattern, SpellChecking, Suggestions } = this;
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
        });
    };
    registerIntrinsicBehavior(Applet, 'widget', 'native_controls.TextlineInput', WAT_TextlineInput);
    /**** PasswordInput ****/
    const WAT_PasswordInput = async (me, my, html, reactively, onRender, onMount, onUnmount, onValueChange, installStylesheet, BehaviorIsNew) => {
        installStylesheet(`
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
        /**** custom Properties ****/
        my.configurableProperties = [
            { Name: 'Value', EditorType: 'textline-input' },
            { Name: 'Placeholder', EditorType: 'textline-input' },
            { Name: 'readonly', EditorType: 'checkbox' },
            { Name: 'minLength', EditorType: 'number-input', Minimum: 0, Stepping: 1 },
            { Name: 'maxLength', EditorType: 'number-input', Minimum: 0, Stepping: 1 },
            { Name: 'Pattern', EditorType: 'textline-input' },
        ];
        Object_assign(me, {
            /**** Value ****/
            get Value() {
                return acceptableOptionalTextline(this.memoized.Value);
            },
            set Value(newValue) {
                allowTextline('value', newValue);
                if (newValue == null) {
                    newValue = '';
                }
                if (this.memoized.Value !== newValue) {
                    this.memoized.Value = newValue;
                    this.on('value-change')();
                    this.rerender();
                }
            },
            /**** Placeholder ****/
            get Placeholder() {
                return acceptableOptionalTextline(this.memoized.Placeholder);
            },
            set Placeholder(newValue) {
                allowTextline('input placeholder', newValue);
                if (this.memoized.Placeholder !== newValue) {
                    this.memoized.Placeholder = newValue;
                    this.rerender();
                }
            },
            /**** readonly ****/
            get readonly() {
                return acceptableBoolean(this.memoized.readonly, false);
            },
            set readonly(newValue) {
                expectBoolean('readonly setting', newValue);
                if (this.memoized.readonly !== newValue) {
                    this.memoized.readonly = newValue;
                    this.rerender();
                }
            },
            /**** minLength ****/
            get minLength() {
                return acceptableOptionalOrdinal(this.memoized.minLength);
            },
            set minLength(newValue) {
                allowOrdinal('minimal input length', newValue);
                if (this.memoized.minLength !== newValue) {
                    this.memoized.minLength = newValue;
                    this.rerender();
                }
            },
            /**** maxLength ****/
            get maxLength() {
                return acceptableOptionalOrdinal(this.memoized.maxLength);
            },
            set maxLength(newValue) {
                allowOrdinal('maximal input length', newValue);
                if (this.memoized.maxLength !== newValue) {
                    this.memoized.maxLength = newValue;
                    this.rerender();
                }
            },
            /**** Pattern ****/
            get Pattern() {
                return acceptableOptionalTextline(this.memoized.Pattern);
            },
            set Pattern(newValue) {
                allowTextline('input pattern', newValue);
                if (this.memoized.Pattern !== newValue) {
                    this.memoized.Pattern = newValue;
                    this.rerender();
                }
            },
        });
        /**** Renderer ****/
        onRender(function () {
            const { Value, Enabling } = this;
            /**** handle external changes ****/
            let ValueToShow = Value || '';
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
                this.on('input')(Event);
            };
            const _onBlur = (Event) => {
                this.rerender();
                this.on('blur')(Event);
            };
            /**** process any other parameters ****/
            const { Placeholder, readonly, minLength, maxLength, Pattern } = this;
            /**** actual rendering ****/
            return html `<input type="password" class="WAT Content PasswordInput"
        value=${ValueToShow} minlength=${minLength} maxlength=${maxLength}
        readOnly=${readonly} placeholder=${Placeholder}
        pattern=${Pattern}
        disabled=${Enabling === false} onInput=${_onInput} onBlur=${_onBlur}
      />`;
        });
    };
    registerIntrinsicBehavior(Applet, 'widget', 'native_controls.PasswordInput', WAT_PasswordInput);
    /**** NumberInput ****/
    const WAT_NumberInput = async (me, my, html, reactively, onRender, onMount, onUnmount, onValueChange, installStylesheet, BehaviorIsNew) => {
        installStylesheet(`
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
        /**** custom Properties ****/
        my.configurableProperties = [
            { Name: 'Value', EditorType: 'number-input' },
            { Name: 'Placeholder', EditorType: 'textline-input' },
            { Name: 'readonly', EditorType: 'checkbox' },
            { Name: 'Minimum', EditorType: 'number-input' },
            { Name: 'Stepping', EditorType: 'number-input', Minimum: 0 },
            { Name: 'Maximum', EditorType: 'number-input' },
            { Name: 'Suggestions', EditorType: 'numberlist-input' },
        ];
        Object_assign(me, {
            /**** Value ****/
            get Value() {
                return acceptableOptionalNumber(this.memoized.Value);
            },
            set Value(newValue) {
                allowFiniteNumber('value', newValue);
                if (this.memoized.Value !== newValue) {
                    this.memoized.Value = newValue;
                    this.on('value-change')();
                    this.rerender();
                }
            },
            /**** Placeholder ****/
            get Placeholder() {
                return acceptableOptionalTextline(this.memoized.Placeholder);
            },
            set Placeholder(newValue) {
                allowTextline('input placeholder', newValue);
                if (this.memoized.Placeholder !== newValue) {
                    this.memoized.Placeholder = newValue;
                    this.rerender();
                }
            },
            /**** readonly ****/
            get readonly() {
                return acceptableBoolean(this.memoized.readonly, false);
            },
            set readonly(newValue) {
                expectBoolean('readonly setting', newValue);
                if (this.memoized.readonly !== newValue) {
                    this.memoized.readonly = newValue;
                    this.rerender();
                }
            },
            /**** Minimum ****/
            get Minimum() {
                return acceptableOptionalNumber(this.memoized.Minimum);
            },
            set Minimum(newValue) {
                allowNumber('minimal value', newValue);
                if (this.memoized.Minimum !== newValue) {
                    this.memoized.Minimum = newValue;
                    this.rerender();
                }
            },
            /**** Stepping ****/
            get Stepping() {
                const Candidate = this.memoized.Stepping;
                return (Candidate === 'any' ? 'any' : acceptableOptionalNumberInRange(Candidate, 0, Infinity, false));
            },
            set Stepping(newValue) {
                if (newValue !== 'any') {
                    allowNumberInRange('step value', newValue, 0, Infinity, false);
                }
                if (this.memoized.Stepping !== newValue) {
                    this.memoized.Stepping = newValue;
                    this.rerender();
                }
            },
            /**** Maximum ****/
            get Maximum() {
                return acceptableOptionalNumber(this.memoized.Maximum);
            },
            set Maximum(newValue) {
                allowNumber('maximal value', newValue);
                if (this.memoized.Maximum !== newValue) {
                    this.memoized.Maximum = newValue;
                    this.rerender();
                }
            },
            /**** Suggestions ****/
            get Suggestions() {
                const Candidate = acceptableOptionalListSatisfying(this.memoized.Suggestions, ValueIsNumber);
                return (Candidate == null ? undefined : Candidate.slice());
            },
            set Suggestions(newValue) {
                allowListSatisfying('suggestion list', newValue, ValueIsNumber);
                if (ValuesDiffer(this.memoized.Suggestions, newValue)) {
                    this.memoized.Suggestions = (newValue == null ? newValue : newValue.slice());
                    this.rerender();
                }
            },
        });
        /**** Renderer ****/
        onRender(function () {
            const { Value, Enabling } = this;
            /**** handle external changes ****/
            let ValueToShow = Value;
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
                this.on('input')(Event);
            };
            const _onBlur = (Event) => {
                this.rerender();
                this.on('blur')(Event);
            };
            /**** process any other parameters ****/
            const { Placeholder, readonly, Minimum, Stepping, Maximum, Suggestions } = this;
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
        });
    };
    registerIntrinsicBehavior(Applet, 'widget', 'native_controls.NumberInput', WAT_NumberInput);
    /**** PhoneNumberInput ****/
    const WAT_PhoneNumberInput = async (me, my, html, reactively, onRender, onMount, onUnmount, onValueChange, installStylesheet, BehaviorIsNew) => {
        installStylesheet(`
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
        /**** custom Properties ****/
        my.configurableProperties = [
            { Name: 'Value', EditorType: 'textline-input' },
            { Name: 'Placeholder', EditorType: 'textline-input' },
            { Name: 'readonly', EditorType: 'checkbox' },
            { Name: 'minLength', EditorType: 'number-input', Minimum: 0, Stepping: 1 },
            { Name: 'maxLength', EditorType: 'number-input', Minimum: 0, Stepping: 1 },
            { Name: 'Pattern', EditorType: 'textline-input' },
            { Name: 'SpellChecking', EditorType: 'checkbox' },
            { Name: 'Suggestions', EditorType: 'linelist-input' },
        ];
        Object_assign(me, {
            /**** Value ****/
            get Value() {
                return acceptableOptionalPhoneNumber(this.memoized.Value);
            },
            set Value(newValue) {
                allowPhoneNumber('value', newValue);
                if (newValue == null) {
                    newValue = '';
                }
                if (this.memoized.Value !== newValue) {
                    this.memoized.Value = newValue;
                    this.on('value-change')();
                    this.rerender();
                }
            },
            /**** Placeholder ****/
            get Placeholder() {
                return acceptableOptionalTextline(this.memoized.Placeholder);
            },
            set Placeholder(newValue) {
                allowTextline('input placeholder', newValue);
                if (this.memoized.Placeholder !== newValue) {
                    this.memoized.Placeholder = newValue;
                    this.rerender();
                }
            },
            /**** readonly ****/
            get readonly() {
                return acceptableBoolean(this.memoized.readonly, false);
            },
            set readonly(newValue) {
                expectBoolean('readonly setting', newValue);
                if (this.memoized.readonly !== newValue) {
                    this.memoized.readonly = newValue;
                    this.rerender();
                }
            },
            /**** minLength ****/
            get minLength() {
                return acceptableOptionalOrdinal(this.memoized.minLength);
            },
            set minLength(newValue) {
                allowOrdinal('minimal input length', newValue);
                if (this.memoized.minLength !== newValue) {
                    this.memoized.minLength = newValue;
                    this.rerender();
                }
            },
            /**** maxLength ****/
            get maxLength() {
                return acceptableOptionalOrdinal(this.memoized.maxLength);
            },
            set maxLength(newValue) {
                allowOrdinal('maximal input length', newValue);
                if (this.memoized.maxLength !== newValue) {
                    this.memoized.maxLength = newValue;
                    this.rerender();
                }
            },
            /**** Pattern ****/
            get Pattern() {
                return acceptableOptionalTextline(this.memoized.Pattern);
            },
            set Pattern(newValue) {
                allowTextline('input pattern', newValue);
                if (this.memoized.Pattern !== newValue) {
                    this.memoized.Pattern = newValue;
                    this.rerender();
                }
            },
            /**** SpellChecking ****/
            get SpellChecking() {
                return acceptableBoolean(this.memoized.SpellChecking, false);
            },
            set SpellChecking(newValue) {
                expectBoolean('spell check setting', newValue);
                if (this.memoized.SpellChecking !== newValue) {
                    this.memoized.SpellChecking = newValue;
                    this.rerender();
                }
            },
            /**** Suggestions ****/
            get Suggestions() {
                const Candidate = acceptableOptionalListSatisfying(this.memoized.Suggestions, ValueIsPhoneNumber);
                return (Candidate == null ? undefined : Candidate.slice());
            },
            set Suggestions(newValue) {
                allowListSatisfying('suggestion list', newValue, ValueIsPhoneNumber);
                if (ValuesDiffer(this.memoized.Suggestions, newValue)) {
                    this.memoized.Suggestions = (newValue == null ? newValue : newValue.slice());
                    this.rerender();
                }
            },
        });
        /**** Renderer ****/
        onRender(function () {
            const { Value, Enabling } = this;
            /**** handle external changes ****/
            let ValueToShow = Value || '';
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
                this.on('input')(Event);
            };
            const _onBlur = (Event) => {
                this.rerender();
                this.on('blur')(Event);
            };
            /**** process any other parameters ****/
            const { Placeholder, readonly, minLength, maxLength, Pattern, SpellChecking, Suggestions } = this;
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
        pattern=${Pattern} spellcheck=${SpellChecking}
        disabled=${Enabling === false} onInput=${_onInput} onBlur=${_onBlur}
        list=${SuggestionId}
      />${SuggestionList}`;
        });
    };
    registerIntrinsicBehavior(Applet, 'widget', 'native_controls.PhoneNumberInput', WAT_PhoneNumberInput);
    /**** EMailAddressInput ****/
    const WAT_EMailAddressInput = async (me, my, html, reactively, onRender, onMount, onUnmount, onValueChange, installStylesheet, BehaviorIsNew) => {
        installStylesheet(`
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
        /**** custom Properties ****/
        my.configurableProperties = [
            { Name: 'Value', EditorType: 'textline-input' },
            { Name: 'Placeholder', EditorType: 'textline-input' },
            { Name: 'readonly', EditorType: 'checkbox' },
            { Name: 'minLength', EditorType: 'number-input', Minimum: 0, Stepping: 1 },
            { Name: 'maxLength', EditorType: 'number-input', Minimum: 0, Stepping: 1 },
            { Name: 'Pattern', EditorType: 'textline-input' },
            { Name: 'SpellChecking', EditorType: 'checkbox' },
            { Name: 'Suggestions', EditorType: 'linelist-input' },
        ];
        Object_assign(me, {
            /**** Value ****/
            get Value() {
                return acceptableOptionalEMailAddress(this.memoized.Value);
            },
            set Value(newValue) {
                allowEMailAddress('value', newValue);
                if (newValue == null) {
                    newValue = '';
                }
                if (this.memoized.Value !== newValue) {
                    this.memoized.Value = newValue;
                    this.on('value-change')();
                    this.rerender();
                }
            },
            /**** Placeholder ****/
            get Placeholder() {
                return acceptableOptionalTextline(this.memoized.Placeholder);
            },
            set Placeholder(newValue) {
                allowTextline('input placeholder', newValue);
                if (this.memoized.Placeholder !== newValue) {
                    this.memoized.Placeholder = newValue;
                    this.rerender();
                }
            },
            /**** readonly ****/
            get readonly() {
                return acceptableBoolean(this.memoized.readonly, false);
            },
            set readonly(newValue) {
                expectBoolean('readonly setting', newValue);
                if (this.memoized.readonly !== newValue) {
                    this.memoized.readonly = newValue;
                    this.rerender();
                }
            },
            /**** minLength ****/
            get minLength() {
                return acceptableOptionalOrdinal(this.memoized.minLength);
            },
            set minLength(newValue) {
                allowOrdinal('minimal input length', newValue);
                if (this.memoized.minLength !== newValue) {
                    this.memoized.minLength = newValue;
                    this.rerender();
                }
            },
            /**** maxLength ****/
            get maxLength() {
                return acceptableOptionalOrdinal(this.memoized.maxLength);
            },
            set maxLength(newValue) {
                allowOrdinal('maximal input length', newValue);
                if (this.memoized.maxLength !== newValue) {
                    this.memoized.maxLength = newValue;
                    this.rerender();
                }
            },
            /**** Pattern ****/
            get Pattern() {
                return acceptableOptionalTextline(this.memoized.Pattern);
            },
            set Pattern(newValue) {
                allowTextline('input pattern', newValue);
                if (this.memoized.Pattern !== newValue) {
                    this.memoized.Pattern = newValue;
                    this.rerender();
                }
            },
            /**** SpellChecking ****/
            get SpellChecking() {
                return acceptableBoolean(this.memoized.SpellChecking, false);
            },
            set SpellChecking(newValue) {
                expectBoolean('spell check setting', newValue);
                if (this.memoized.SpellChecking !== newValue) {
                    this.memoized.SpellChecking = newValue;
                    this.rerender();
                }
            },
            /**** Suggestions ****/
            get Suggestions() {
                const Candidate = acceptableOptionalListSatisfying(this.memoized.Suggestions, ValueIsEMailAddress);
                return (Candidate == null ? undefined : Candidate.slice());
            },
            set Suggestions(newValue) {
                allowListSatisfying('suggestion list', newValue, ValueIsEMailAddress);
                if (ValuesDiffer(this.memoized.Suggestions, newValue)) {
                    this.memoized.Suggestions = (newValue == null ? newValue : newValue.slice());
                    this.rerender();
                }
            },
        });
        /**** Renderer ****/
        onRender(function () {
            const { Value, Enabling } = this;
            /**** handle external changes ****/
            let ValueToShow = Value || '';
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
                this.on('input')(Event);
            };
            const _onBlur = (Event) => {
                this.rerender();
                this.on('blur')(Event);
            };
            /**** process any other parameters ****/
            const { Placeholder, readonly, minLength, maxLength, Pattern, SpellChecking, Suggestions } = this;
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
        pattern=${Pattern} spellcheck=${SpellChecking}
        disabled=${Enabling === false} onInput=${_onInput} onBlur=${_onBlur}
        list=${SuggestionId}
      />${SuggestionList}`;
        });
    };
    registerIntrinsicBehavior(Applet, 'widget', 'native_controls.EMailAddressInput', WAT_EMailAddressInput);
    /**** URLInput ****/
    const WAT_URLInput = async (me, my, html, reactively, onRender, onMount, onUnmount, onValueChange, installStylesheet, BehaviorIsNew) => {
        installStylesheet(`
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
        /**** custom Properties ****/
        my.configurableProperties = [
            { Name: 'Value', EditorType: 'textline-input' },
            { Name: 'Placeholder', EditorType: 'textline-input' },
            { Name: 'readonly', EditorType: 'checkbox' },
            { Name: 'minLength', EditorType: 'number-input', Minimum: 0, Stepping: 1 },
            { Name: 'maxLength', EditorType: 'number-input', Minimum: 0, Stepping: 1 },
            { Name: 'Pattern', EditorType: 'textline-input' },
            { Name: 'SpellChecking', EditorType: 'checkbox' },
            { Name: 'Suggestions', EditorType: 'linelist-input' },
        ];
        Object_assign(me, {
            /**** Value ****/
            get Value() {
                return acceptableOptionalURL(this.memoized.Value);
            },
            set Value(newValue) {
                allowURL('value', newValue);
                if (newValue == null) {
                    newValue = '';
                }
                if (this.memoized.Value !== newValue) {
                    this.memoized.Value = newValue;
                    this.on('value-change')();
                    this.rerender();
                }
            },
            /**** Placeholder ****/
            get Placeholder() {
                return acceptableOptionalTextline(this.memoized.Placeholder);
            },
            set Placeholder(newValue) {
                allowTextline('input placeholder', newValue);
                if (this.memoized.Placeholder !== newValue) {
                    this.memoized.Placeholder = newValue;
                    this.rerender();
                }
            },
            /**** readonly ****/
            get readonly() {
                return acceptableBoolean(this.memoized.readonly, false);
            },
            set readonly(newValue) {
                expectBoolean('readonly setting', newValue);
                if (this.memoized.readonly !== newValue) {
                    this.memoized.readonly = newValue;
                    this.rerender();
                }
            },
            /**** minLength ****/
            get minLength() {
                return acceptableOptionalOrdinal(this.memoized.minLength);
            },
            set minLength(newValue) {
                allowOrdinal('minimal input length', newValue);
                if (this.memoized.minLength !== newValue) {
                    this.memoized.minLength = newValue;
                    this.rerender();
                }
            },
            /**** maxLength ****/
            get maxLength() {
                return acceptableOptionalOrdinal(this.memoized.maxLength);
            },
            set maxLength(newValue) {
                allowOrdinal('maximal input length', newValue);
                if (this.memoized.maxLength !== newValue) {
                    this.memoized.maxLength = newValue;
                    this.rerender();
                }
            },
            /**** Pattern ****/
            get Pattern() {
                return acceptableOptionalTextline(this.memoized.Pattern);
            },
            set Pattern(newValue) {
                allowTextline('input pattern', newValue);
                if (this.memoized.Pattern !== newValue) {
                    this.memoized.Pattern = newValue;
                    this.rerender();
                }
            },
            /**** SpellChecking ****/
            get SpellChecking() {
                return acceptableBoolean(this.memoized.SpellChecking, false);
            },
            set SpellChecking(newValue) {
                expectBoolean('spell check setting', newValue);
                if (this.memoized.SpellChecking !== newValue) {
                    this.memoized.SpellChecking = newValue;
                    this.rerender();
                }
            },
            /**** Suggestions ****/
            get Suggestions() {
                const Candidate = acceptableOptionalListSatisfying(this.memoized.Suggestions, ValueIsURL);
                return (Candidate == null ? undefined : Candidate.slice());
            },
            set Suggestions(newValue) {
                allowListSatisfying('suggestion list', newValue, ValueIsURL);
                if (ValuesDiffer(this.memoized.Suggestions, newValue)) {
                    this.memoized.Suggestions = (newValue == null ? newValue : newValue.slice());
                    this.rerender();
                }
            },
        });
        /**** Renderer ****/
        onRender(function () {
            const { Value, Enabling } = this;
            /**** handle external changes ****/
            let ValueToShow = Value || '';
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
                this.on('input')(Event);
            };
            const _onBlur = (Event) => {
                this.rerender();
                this.on('blur')(Event);
            };
            /**** process any other parameters ****/
            const { Placeholder, readonly, minLength, maxLength, Pattern, SpellChecking, Suggestions } = this;
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
        pattern=${Pattern} spellcheck=${SpellChecking}
        disabled=${Enabling === false} onInput=${_onInput} onBlur=${_onBlur}
        list=${SuggestionId}
      />${SuggestionList}`;
        });
    };
    registerIntrinsicBehavior(Applet, 'widget', 'native_controls.URLInput', WAT_URLInput);
    /**** TimeInput ****/
    const WAT_TimeInput = async (me, my, html, reactively, onRender, onMount, onUnmount, onValueChange, installStylesheet, BehaviorIsNew) => {
        installStylesheet(`
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
        /**** custom Properties ****/
        my.configurableProperties = [
            { Name: 'Value', EditorType: 'textline-input' },
            { Name: 'readonly', EditorType: 'checkbox' },
            { Name: 'withSeconds', EditorType: 'checkbox' },
            { Name: 'Minimum', EditorType: 'time-input', Stepping: 1 },
            { Name: 'Maximum', EditorType: 'time-input', Stepping: 1 },
            { Name: 'Suggestions', EditorType: 'linelist-input' },
        ];
        Object_assign(me, {
            /**** Value ****/
            get Value() {
                return acceptableOptionalStringMatching(this.memoized.Value, WAT_TimeRegExp);
            },
            set Value(newValue) {
                allowStringMatching('value', newValue, WAT_TimeRegExp);
                if (newValue == null) {
                    newValue = '';
                }
                if (this.memoized.Value !== newValue) {
                    this.memoized.Value = newValue;
                    this.on('value-change')();
                    this.rerender();
                }
            },
            /**** readonly ****/
            get readonly() {
                return acceptableBoolean(this.memoized.readonly, false);
            },
            set readonly(newValue) {
                expectBoolean('readonly setting', newValue);
                if (this.memoized.readonly !== newValue) {
                    this.memoized.readonly = newValue;
                    this.rerender();
                }
            },
            /**** withSeconds ****/
            get withSeconds() {
                return acceptableBoolean(this.memoized.withSeconds, false);
            },
            set withSeconds(newValue) {
                expectBoolean('granularity setting', newValue);
                if (this.memoized.withSeconds !== newValue) {
                    this.memoized.withSeconds = newValue;
                    this.rerender();
                }
            },
            /**** Minimum ****/
            get Minimum() {
                return acceptableOptionalStringMatching(this.memoized.Minimum, WAT_TimeRegExp);
            },
            set Minimum(newValue) {
                allowStringMatching('earliest time', newValue, WAT_TimeRegExp);
                if (newValue == null) {
                    newValue = '';
                }
                if (this.memoized.Minimum !== newValue) {
                    this.memoized.Minimum = newValue;
                    this.rerender();
                }
            },
            /**** Maximum ****/
            get Maximum() {
                return acceptableOptionalStringMatching(this.memoized.Minimum, WAT_TimeRegExp);
            },
            set Maximum(newValue) {
                allowStringMatching('latest time', newValue, WAT_TimeRegExp);
                if (newValue == null) {
                    newValue = '';
                }
                if (this.memoized.Maximum !== newValue) {
                    this.memoized.Maximum = newValue;
                    this.rerender();
                }
            },
            /**** Suggestions ****/
            get Suggestions() {
                const Candidate = acceptableOptionalListSatisfying(this.memoized.Suggestions, WAT_TimeMatcher);
                return (Candidate == null ? undefined : Candidate.slice());
            },
            set Suggestions(newValue) {
                allowListSatisfying('suggestion list', newValue, WAT_TimeMatcher);
                if (ValuesDiffer(this.memoized.Suggestions, newValue)) {
                    this.memoized.Suggestions = (newValue == null ? newValue : newValue.slice());
                    this.rerender();
                }
            },
        });
        /**** Renderer ****/
        onRender(function () {
            const { Value, Enabling } = this;
            /**** handle external changes ****/
            let ValueToShow = Value || '';
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
                this.on('input')(Event);
            };
            const _onBlur = (Event) => {
                this.rerender();
                this.on('blur')(Event);
            };
            /**** process any other parameters ****/
            const { readonly, withSeconds, Minimum, Maximum, Suggestions } = this;
            let SuggestionList = '', SuggestionId;
            if ((Suggestions != null) && (Suggestions.length > 0)) {
                SuggestionId = IdOfWidget(this) + '-Suggestions';
                SuggestionList = html `<datalist id=${SuggestionId}>
          ${Suggestions.map((Value) => html `<option value=${Value}></option>`)}
        </datalist>`;
            }
            /**** actual rendering ****/
            return html `<input type="text" class="WAT Content TextlineInput"
        value=${ValueToShow} min=${Minimum} max=${Maximum}
        step=${withSeconds ? 1 : 60}
        readOnly=${readonly} pattern=${WAT_TimePattern}
        disabled=${Enabling === false} onInput=${_onInput} onBlur=${_onBlur}
        list=${SuggestionId}
      />${SuggestionList}`;
        });
    };
    registerIntrinsicBehavior(Applet, 'widget', 'native_controls.TimeInput', WAT_TimeInput);
    /**** SearchInput ****/
    const WAT_SearchInput = async (me, my, html, reactively, onRender, onMount, onUnmount, onValueChange, installStylesheet, BehaviorIsNew) => {
        installStylesheet(`
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
        /**** custom Properties ****/
        my.configurableProperties = [
            { Name: 'Value', EditorType: 'textline-input' },
            { Name: 'Placeholder', EditorType: 'textline-input' },
            { Name: 'readonly', EditorType: 'checkbox' },
            { Name: 'minLength', EditorType: 'number-input', Minimum: 0, Stepping: 1 },
            { Name: 'maxLength', EditorType: 'number-input', Minimum: 0, Stepping: 1 },
            { Name: 'Pattern', EditorType: 'textline-input' },
            { Name: 'SpellChecking', EditorType: 'checkbox' },
            { Name: 'Suggestions', EditorType: 'linelist-input' },
        ];
        Object_assign(me, {
            /**** Value ****/
            get Value() {
                return acceptableOptionalTextline(this.memoized.Value);
            },
            set Value(newValue) {
                allowTextline('value', newValue);
                if (newValue == null) {
                    newValue = '';
                }
                if (this.memoized.Value !== newValue) {
                    this.memoized.Value = newValue;
                    this.on('value-change')();
                    this.rerender();
                }
            },
            /**** Placeholder ****/
            get Placeholder() {
                return acceptableOptionalTextline(this.memoized.Placeholder);
            },
            set Placeholder(newValue) {
                allowTextline('input placeholder', newValue);
                if (this.memoized.Placeholder !== newValue) {
                    this.memoized.Placeholder = newValue;
                    this.rerender();
                }
            },
            /**** readonly ****/
            get readonly() {
                return acceptableBoolean(this.memoized.readonly, false);
            },
            set readonly(newValue) {
                expectBoolean('readonly setting', newValue);
                if (this.memoized.readonly !== newValue) {
                    this.memoized.readonly = newValue;
                    this.rerender();
                }
            },
            /**** minLength ****/
            get minLength() {
                return acceptableOptionalOrdinal(this.memoized.minLength);
            },
            set minLength(newValue) {
                allowOrdinal('minimal input length', newValue);
                if (this.memoized.minLength !== newValue) {
                    this.memoized.minLength = newValue;
                    this.rerender();
                }
            },
            /**** maxLength ****/
            get maxLength() {
                return acceptableOptionalOrdinal(this.memoized.maxLength);
            },
            set maxLength(newValue) {
                allowOrdinal('maximal input length', newValue);
                if (this.memoized.maxLength !== newValue) {
                    this.memoized.maxLength = newValue;
                    this.rerender();
                }
            },
            /**** Pattern ****/
            get Pattern() {
                return acceptableOptionalTextline(this.memoized.Pattern);
            },
            set Pattern(newValue) {
                allowTextline('input pattern', newValue);
                if (this.memoized.Pattern !== newValue) {
                    this.memoized.Pattern = newValue;
                    this.rerender();
                }
            },
            /**** SpellChecking ****/
            get SpellChecking() {
                return acceptableBoolean(this.memoized.SpellChecking, false);
            },
            set SpellChecking(newValue) {
                expectBoolean('spell check setting', newValue);
                if (this.memoized.SpellChecking !== newValue) {
                    this.memoized.SpellChecking = newValue;
                    this.rerender();
                }
            },
            /**** Suggestions ****/
            get Suggestions() {
                const Candidate = acceptableOptionalListSatisfying(this.memoized.Suggestions, ValueIsTextline);
                return (Candidate == null ? undefined : Candidate.slice());
            },
            set Suggestions(newValue) {
                allowListSatisfying('suggestion list', newValue, ValueIsTextline);
                if (ValuesDiffer(this.memoized.Suggestions, newValue)) {
                    this.memoized.Suggestions = (newValue == null ? newValue : newValue.slice());
                    this.rerender();
                }
            },
        });
        /**** Renderer ****/
        onRender(function () {
            const { Value, Enabling } = this;
            /**** handle external changes ****/
            let ValueToShow = Value || '';
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
                this.on('input')(Event);
            };
            const _onBlur = (Event) => {
                this.rerender();
                this.on('blur')(Event);
            };
            /**** process any other parameters ****/
            const { Placeholder, readonly, minLength, maxLength, Pattern, SpellChecking, Suggestions } = this;
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
        disabled=${Enabling === false} onInput=${_onInput} onBlur=${_onBlur}
        list=${SuggestionId}
      />${SuggestionList}`;
        });
    };
    registerIntrinsicBehavior(Applet, 'widget', 'native_controls.SearchInput', WAT_SearchInput);
}
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
        Applet.on('mount')();
    }
    /**** componentWillUnmount ****/
    componentWillUnmount() {
        const Applet = this._Applet;
        Applet['_View'] = undefined;
        Applet.on('unmount')();
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
        Page.on('mount')();
    }
    /**** componentWillUnmount ****/
    componentWillUnmount() {
        this._releaseWidgets(this._shownWidgets);
        const Page = this._Page;
        Page['_View'] = undefined;
        Page.on('unmount')();
    }
    /**** _releaseWidgets ****/
    _releaseWidgets(WidgetList) {
        WidgetList.forEach((Widget) => {
            Widget._Pane = undefined;
            if (Widget.Behavior === 'basic_controls.WidgetPane') {
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
        Widget.on('mount')();
    }
    /**** componentWillUnmount ****/
    componentWillUnmount() {
        const Widget = this._Widget;
        Widget['_View'] = undefined;
        Widget.on('unmount')();
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
    }
    /**** dialog dragging and resizing ****/
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
            const WidgetsToShow = (SourceWidget.normalizedBehavior === 'basic_controls.outline'
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
            const WidgetsToShow = (SourceWidget.normalizedBehavior === 'basic_controls.outline'
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
    Object_assign,
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
