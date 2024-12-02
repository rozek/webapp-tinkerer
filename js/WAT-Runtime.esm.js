/*******************************************************************************
*                                                                              *
*                        WebApp Tinkerer (WAT) Runtime                         *
*                                                                              *
*******************************************************************************/
import { 
//  throwError,
quoted, ValuesDiffer, ValueIsBoolean, ValueIsNumber, ValueIsFiniteNumber, ValueIsNumberInRange, ValueIsInteger, ValueIsIntegerInRange, ValueIsOrdinal, ValueIsString, ValueIsStringMatching, ValueIsText, ValueIsTextline, ValueIsObject, ValueIsPlainObject, ValueIsList, ValueIsListSatisfying, ValueIsFunction, ValueIsOneOf, ValueIsColor, ValueIsEMailAddress, /*ValueIsPhoneNumber,*/ ValueIsURL, ValidatorForClassifier, acceptNil, rejectNil, expectValue, expectBoolean, allowFiniteNumber, allowInteger, expectInteger, allowIntegerInRange, allowOrdinal, expectCardinal, allowString, expectString, allowText, allowTextline, allowFunction, expectFunction, expectPlainObject, expectList, expectListSatisfying, allowOneOf, expectOneOf, allowColor, allowURL, } from 'javascript-interface-library';
import { render, html, Component } from 'htm/preact';
import hyperactiv from 'hyperactiv';
const { observe, computed, dispose } = hyperactiv;
import { customAlphabet } from 'nanoid';
// @ts-ignore TS2307 typescript has problems importing "nanoid-dictionary"
import { nolookalikesSafe } from 'nanoid-dictionary';
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
/**** configuration-related types ****/
export const WAT_FontStyles = ['normal', 'italic'];
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
/**** ValueIsSerializableValue ****/
export function ValueIsSerializableValue(Value) {
    switch (true) {
        case (Value === null):
        case ValueIsBoolean(Value):
        case ValueIsNumber(Value):
        case ValueIsString(Value):
        case ValueIsListSatisfying(Value, ValueIsSerializableValue):
            return true;
        case ValueIsPlainObject(Value):
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

/**** all WAT elements are absolutely positioned ****/

  .WAT {
    display:block; position:absolute;
    margin:0px; padding:0px;
    background:none; border:none; border-radius:0px; outline:none;
  }

/**** elements of class "WAT Content" cover their whole container ****/

  .WAT.Content {
    display:block; position:absolute;
    left:0px; top:0px; width:100%; height:100%;
  }

/**** WAT Applet ****/

  .WAT.Applet {
    padding:0px; overflow:hidden;
    background:white; color:black;
    font-family:'Source Sans Pro','Helvetica Neue',Helvetica,Arial,sans-serif;
    font-size:14px; font-weight:normal; line-height:1.4; color:black;
    text-align:left; text-shadow:none;
  }

  .WAT.Applet.fullscreen{
    display:block; position:absolute; margin:0px;
    left:0px; top:0px; right:0px; bottom:0px; width:auto; height:auto;
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
        /**** BackgroundColor ****/
        Object.defineProperty(this, "_BackgroundColor", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**** BackgroundTexture ****/
        Object.defineProperty(this, "_BackgroundTexture", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**** FontFamily ****/
        Object.defineProperty(this, "_FontFamily", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**** FontSize ****/
        Object.defineProperty(this, "_FontSize", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**** FontWeight ****/
        Object.defineProperty(this, "_FontWeight", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**** FontStyle ****/
        Object.defineProperty(this, "_FontStyle", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**** LineHeight ****/
        Object.defineProperty(this, "_LineHeight", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**** ForegroundColor ****/
        Object.defineProperty(this, "_ForegroundColor", {
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
            value: null
        }); // not "undefined"!
        /**** onValueChange - will not be called upon deserialization ****/
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
        allowName('WAT name', newName);
        if (newName != null) {
            newName = newName.trim();
            if (newName === '') {
                newName = undefined;
            }
        }
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
                switch (Key) {
                    case 'onMount':
                        this.onMount(OptionSet[Key]);
                        break;
                    case 'onUnmount':
                        this.onUnmount(OptionSet[Key]);
                        break;
                    case 'onRender':
                        this.onRender(OptionSet[Key]);
                        break;
                    case 'onValueChange':
                        this.onValueChange(OptionSet[Key]);
                        break;
                    // @ts-ignore TS7053 allow "Visual" to be indexed
                    default: this[Key] = OptionSet[Key];
                }
            }
        }
    }
    get BackgroundColor() {
        return (this._BackgroundColor == null
            ? this._Container == null ? undefined : this._Container.BackgroundColor
            : this._BackgroundColor);
    }
    set BackgroundColor(newColor) {
        allowColor('widget background color', newColor);
        if (this._BackgroundColor !== newColor) {
            this._BackgroundColor = newColor;
            this.rerender();
        }
    }
    get BackgroundTexture() {
        return (this._BackgroundTexture == null
            ? this._Container == null ? undefined : this._Container.BackgroundTexture
            : this._BackgroundTexture);
    }
    set BackgroundTexture(newTexture) {
        allowURL('widget background texture', newTexture);
        if (this._BackgroundTexture !== newTexture) {
            this._BackgroundTexture = newTexture;
            this.rerender();
        }
    }
    get FontFamily() {
        return (this._FontFamily == null
            ? this._Container == null ? undefined : this._Container.FontFamily
            : this._FontFamily);
    }
    set FontFamily(newFontFamily) {
        allowTextline('widget font family', newFontFamily);
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
        allowOrdinal('widget font size', newFontSize);
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
        allowIntegerInRange('widget font weight', newFontWeight, 1, 1000);
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
        allowOneOf('widget font style', newFontStyle, WAT_FontStyles);
        if (this._FontStyle !== newFontStyle) {
            this._FontStyle = newFontStyle;
            this.rerender();
        }
    }
    get LineHeight() {
        return (this._LineHeight == null
            ? this._Container == null ? undefined : this._Container.LineHeight
            : this._LineHeight);
    }
    set LineHeight(newLineHeight) {
        allowOrdinal('widget line height', newLineHeight);
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
        allowColor('widget foreground color', newForegroundColor);
        if (this._ForegroundColor !== newForegroundColor) {
            this._ForegroundColor = newForegroundColor;
            this.rerender();
        }
    }
    /**** Color ****/
    get Color() { return this.ForegroundColor; }
    set Color(newColor) { this.ForegroundColor = newColor; }
    get Value() { return this._Value; }
    set Value(newValue) {
        allowSerializableValue('Value', newValue);
        if (newValue === undefined) {
            newValue = null;
        }
        if (ValuesDiffer(this._Value, newValue)) {
            this._Value = newValue; // *C* a deep copy may be better
            if (this._onValueChange != null) {
                try {
                    this._onValueChange.call(this);
                }
                catch (Signal) {
                    console.error('"onValueChange" Callback Failure', Signal);
                }
            }
            this.rerender();
        }
    }
    onValueChange(newCallback) {
        allowFunction('"onValueChange" callback', newCallback);
        if (newCallback == null) {
            this._onValueChange = undefined;
        }
        else {
            this._onValueChange = () => {
                try {
                    newCallback.call(this);
                }
                catch (Signal) {
                    console.error('"onValueChange" Callback Failure', Signal);
                }
            };
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
    get Renderer() { return this._Renderer; }
    set Renderer(newRenderer) {
        allowFunction('WAT renderer', newRenderer);
        if (this._Renderer !== newRenderer) {
            this._Renderer = newRenderer;
            this.rerender();
        }
    }
    /**** onRender ****/
    onRender(newRenderer) {
        expectFunction('renderer callback', newRenderer);
        this.Renderer = newRenderer;
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
    get View() { return this._View; }
    set View(_) { throwReadOnlyError('View'); }
    /**** isMounted ****/
    get isMounted() { return (this._View != null); }
    set isMounted(_) { throwReadOnlyError('isMounted'); }
    onMount(newCallback) {
        allowFunction('"onMount" callback', newCallback);
        if (newCallback == null) {
            this._onMount = undefined;
        }
        else {
            this._onMount = () => {
                try {
                    newCallback.call(this);
                }
                catch (Signal) {
                    console.error('"onMount" Callback Failure', Signal);
                }
            };
        }
    }
    onUnmount(newCallback) {
        allowFunction('"onUnmount" callback', newCallback);
        if (newCallback == null) {
            this._onUnmount = undefined;
        }
        else {
            this._onUnmount = () => {
                try {
                    newCallback.call(this);
                }
                catch (Signal) {
                    console.error('"onUnmount" Callback Failure', Signal);
                }
            };
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
        const serializeProperty = (Name) => {
            // @ts-ignore TS7053 allow "Visual" to be indexed
            if (this['_' + Name] != null) {
                Serialization[Name] = this[Name];
            }
        };
        [
            'Name',
            'BackgroundColor', 'BackgroundTexture',
            'FontFamily', 'FontSize', 'FontWeight', 'FontStyle', 'LineHeight',
            'ForegroundColor',
            'memoized', 'Value',
        ].forEach((Name) => serializeProperty(Name));
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
            'BackgroundColor', 'BackgroundTexture',
            'FontFamily', 'FontSize', 'FontWeight', 'FontStyle', 'LineHeight',
            'ForegroundColor',
            'Value',
        ].forEach((Name) => deserializeProperty(Name));
        if (ValueIsPlainObject(Serialization.memoized)) {
            try {
                this.memoized = structuredClone(Serialization.memoized);
            }
            catch (Signal) {
                console.warn('DeserializationError: invalid value for property "memoized" ' +
                    'in visual ' + quoted(this.Path));
            }
        }
    }
}
//------------------------------------------------------------------------------
//--                                WAT_Applet                                --
//------------------------------------------------------------------------------
export class WAT_Applet extends WAT_Visual {
    constructor() {
        super(undefined);
        /**** activeScript - is always treated as existing ****/
        Object.defineProperty(this, "_activeScript", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**** pendingScript - may be missing or consist of white-space only ****/
        Object.defineProperty(this, "_pendingScript", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**** ScriptError - script compilation errors, for internal use only ****/
        Object.defineProperty(this, "_ScriptError", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
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
    }
    /**** Path - to be overwritten ****/
    get Path() { return '/'; }
    set Path(_) { throwReadOnlyError('Path'); }
    /**** isAttached ****/
    get isAttached() { return (this._View != null); }
    set isAttached(_) { throwReadOnlyError('isAttached'); }
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
        allowText('applet script', newScript);
        if (this._pendingScript !== newScript) {
            this._pendingScript = newScript;
            this.rerender();
        }
    }
    /**** activateScript - even if Applet is not (yet) attached ****/
    activateScript() {
        let activeScript = (this._activeScript || '').trim();
        this._Renderer = undefined;
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
                    console.error('WAT: execution error in reactive function', Signal);
                }
            }));
        };
        /**** compile and run the applet script ****/
        this.ScriptError = undefined; // only to be set by "applyPendingScript"
        let compiledScript;
        try {
            compiledScript = new Function('me,my, html,reactively', activeScript);
        }
        catch (Signal) {
            console.error('WAT: script compilation failure', Signal);
            return;
        }
        try {
            compiledScript.call(this, this, this, html, reactively);
        }
        catch (Signal) {
            console.error('WAT: script execution failure', Signal);
            return;
        }
        this.rerender();
    }
    /**** applyPendingScript - but only if it can be compiled ****/
    applyPendingScript() {
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
                compiledScript = new Function('me,my, html,reactively', pendingScript);
            }
            catch (Signal) {
                console.error('WAT: script compilation failure', Signal);
                this.ScriptError = '' + Signal;
                return;
            }
        }
        this._activeScript = pendingScript.trim();
        this._pendingScript = undefined;
        this._ScriptError = undefined;
        this.activateScript(); // may still fail
        this.rerender();
    }
    get ScriptError() {
        return this._ScriptError;
    }
    set ScriptError(newScriptError) {
        allowString('script error', newScriptError);
        this._ScriptError = newScriptError;
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
        let View = this._View;
        if (View == null)
            throwError('NotAttached: this applet is not attached');
        return {
            x: View.offsetLeft, Width: View.offsetWidth,
            y: View.offsetTop, Height: View.offsetHeight
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
        });
    }
    /**** _serializeConfigurationInto ****/
    _serializeConfigurationInto(Serialization) {
        super._serializeConfigurationInto(Serialization);
        //    delete Serialization.Name                  // do not serialize applet name
        const serializeProperty = (Name) => {
            // @ts-ignore TS7053 allow "Applet" to be indexed
            if (this['_' + Name] != null) {
                Serialization[Name] = this[Name];
            }
        };
        [
            'Name',
            'activeScript', 'pendingScript',
            'SnapToGrid', 'GridWidth', 'GridHeight',
        ].forEach((Name) => serializeProperty(Name));
        /**** "activeScript" needs special treatment ****/
        // @ts-ignore TS2339 if it exists "Serialization.activeScript" is a string
        if ((Serialization.activeScript || '').trim() === '') {
            delete Serialization.activeScript;
        }
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
            /*'activeScript',*/ 'pendingScript',
            'SnapToGrid', 'GridWidth', 'GridHeight',
        ].forEach((Name) => deserializeProperty(Name));
        /**** "activeScript" needs special treatment ****/
        if (ValueIsText(Serialization.activeScript)) {
            this._activeScript = Serialization.activeScript;
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
        Applet._deserializePagesFrom(Serialization);
        Applet._deserializeConfigurationFrom(Serialization);
        return Applet;
    }
    /**** preserve ****/
    async preserve() {
        await AppletStore.setItem('WAT-Applet', JSON.stringify(this.Serialization));
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
}
//------------------------------------------------------------------------------
//--                                WAT_Widget                                --
//------------------------------------------------------------------------------
export class WAT_Widget extends WAT_Visual {
    constructor(Page) {
        super(Page);
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
        /**** onClick ****/
        Object.defineProperty(this, "_onClick", {
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
    }
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
    onClick(newHandler) {
        expectFunction('"click" event handler', newHandler);
        this._onClick = newHandler;
    }
    onInput(newHandler) {
        expectFunction('"input" event handler', newHandler);
        this._onInput = newHandler;
    }
    onDrop(newHandler) {
        expectFunction('"drop" event handler', newHandler);
        this._onDrop = newHandler;
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
        if ((curAnchors[0] !== 'left-width') && (newWidth != null) ||
            (curAnchors[1] !== 'top-height') && (newHeight != null)) {
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
    WidgetsWithinOutline() {
        const Page = this.Page;
        if (Page == null) {
            return [];
        }
        const { x, y, Width, Height } = this.Geometry;
        const [minX, maxX, minY, maxY] = [x, x + Width, y, y + Height];
        return Page.WidgetList.filter((Widget) => {
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
    pointer-events:none;
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
  }
  `);
/**** HTMLView ****/
export class WAT_HTMLView extends WAT_Widget {
    constructor(Page) {
        super(Page);
        Object.defineProperty(this, "_Renderer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                return html `<div class="WAT Content HTMLView"
        dangerouslySetInnerHTML=${{ __html: acceptableText(this.Value, '') }}
      />`;
            }
        });
    }
    get Type() { return 'HTMLView'; }
    set Type(_) { throwReadOnlyError('Type'); }
}
builtInWidgetTypes['HTMLView'] = WAT_HTMLView;
appendStyle(`
  .WAT.Widget > .WAT.HTMLView {
  }
  `);
/**** ImageView ****/
export class WAT_ImageView extends WAT_Widget {
    constructor(Page) {
        super(Page);
        Object.defineProperty(this, "_Renderer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                return html `<img class="WAT Content ImageView" src=${acceptableURL(this.Value, '')}/>`;
            }
        });
    }
    get Type() { return 'ImageView'; }
    set Type(_) { throwReadOnlyError('Type'); }
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
        Object.defineProperty(this, "_Renderer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                const DataURL = 'data:image/svg+xml;base64,' + btoa(acceptableText(this.Value, ''));
                return html `<img class="WAT Content SVGView" src=${DataURL}/>`;
            }
        });
    }
    get Type() { return 'SVGView'; }
    set Type(_) { throwReadOnlyError('Type'); }
}
builtInWidgetTypes['SVGView'] = WAT_SVGView;
appendStyle(`
  .WAT.Widget > .WAT.SVGView {
    object-fit:contain; object-position:center;
  }
  `);
/**** WebView ****/
export class WAT_WebView extends WAT_Widget {
    constructor(Page) {
        super(Page);
        Object.defineProperty(this, "_Renderer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                return html `<iframe class="WAT Content WebView"
        src=${acceptableURL(this.Value, '')}
      />`;
            }
        });
    }
    get Type() { return 'WebView'; }
    set Type(_) { throwReadOnlyError('Type'); }
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
                const onClick = (Event) => {
                    if (this.Enabling == false) {
                        return consumingEvent(Event);
                    }
                    if (typeof this._onClick === 'function') {
                        this._onClick(Event);
                    }
                };
                const Value = acceptableURL(this.Value, './icons/pencil.png');
                const Color = acceptableColor(this.Color, 'black');
                return html `<div class="WAT Content Icon" style="
        -webkit-mask-image:url(${Value}); mask-image:url(${Value});
        background-color:${Color};
      " disabled=${this.Enabling == false} onClick=${onClick}
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
                    if (typeof this._onClick === 'function') {
                        this._onClick(Event);
                    }
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
                    if (typeof this._onClick === 'function') {
                        this._onClick(Event);
                    }
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
                    if (typeof this._onClick === 'function') {
                        this._onClick(Event);
                    }
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
  }
  `);
/**** CSSStyleOfVisual ****/
export function CSSStyleOfVisual(Visual) {
    expectVisual('widget', Visual);
    let CSSStyleList = [];
    const { BackgroundColor, BackgroundTexture, ForegroundColor, FontFamily, FontSize, FontWeight, FontStyle, LineHeight } = Visual;
    if (BackgroundColor != null) {
        CSSStyleList.push(`background-color:${BackgroundColor}`);
    }
    if (BackgroundTexture != null) {
        CSSStyleList.push(`background-image:${BackgroundTexture}; background-repeat:repeat`);
    }
    if (ForegroundColor != null) {
        CSSStyleList.push(`color:${ForegroundColor}`);
    }
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
    return CSSStyleList.join(';');
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
} //------------------------------------------------------------------------------
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
            try {
                Applet['_onMount']();
            }
            catch (Signal) { /* nop */ }
        }
        rerender();
    }
    /**** componentWillUnmount ****/
    componentWillUnmount() {
        const Applet = this._Applet;
        Applet['_View'] = undefined;
        if (Applet['_onUnmount'] != null) {
            try {
                Applet['_onUnmount']();
            }
            catch (Signal) { /* nop */ }
        }
    }
    /**** render ****/
    render(PropSet) {
        const Applet = this._Applet = PropSet.Applet;
        const visitedPage = Applet.visitedPage;
        return html `<div class="WAT Applet" style="
        ${CSSStyleOfVisual(Applet) || ''}
        left:0px; top:0px; right:0px; bottom:0px
      ">
        ${Applet.isAttached ? html `
          ${Applet.Rendering()}
          ${visitedPage == null
            ? html `<div class="WAT centered"><div>(no page to show)</div></div>`
            : html `<${WAT_PageView} Page=${visitedPage}/>`}
        ` : ''}
      </div>`;
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
    }
    /**** componentDidMount ****/
    componentDidMount() {
        const Page = this._Page;
        Page['_View'] = this.base;
        if (Page['_onMount'] != null) {
            Page['_onMount']();
        }
    }
    /**** componentWillUnmount ****/
    componentWillUnmount() {
        const Page = this._Page;
        Page['_View'] = undefined;
        if (Page['_onUnmount'] != null) {
            Page['_onUnmount']();
        }
    }
    /**** render ****/
    render(PropSet) {
        const Page = this._Page = PropSet.Page;
        return html `<div class="WAT Page" style="
        ${CSSStyleOfVisual(Page) || ''}
        left:0px; top:0px; right:0px; bottom:0px
      ">
        ${Page.Rendering()}
        ${Page.WidgetList.toReversed().map((Widget) => {
            if (Widget.isVisible) {
                return html `<${WAT_WidgetView} Widget=${Widget}/>`;
            }
            else {
                return '';
            }
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
            Widget['_onMount']();
        }
    }
    /**** componentWillUnmount ****/
    componentWillUnmount() {
        const Widget = this._Widget;
        Widget['_View'] = undefined;
        if (Widget['_onUnmount'] != null) {
            Widget['_onUnmount']();
        }
    }
    /**** render ****/
    render(PropSet) {
        const Widget = this._Widget = PropSet.Widget;
        let { x, y, Width, Height } = Widget.Geometry;
        const CSSGeometry = ((x != null) && (Width != null) && (y != null) && (Height != null)
            ? `left:${x}px; top:${y}px; width:${Width}px; height:${Height}px; right:auto; bottom:auto;`
            : '');
        return html `<div class="WAT Widget" style="
        ${CSSStyleOfVisual(Widget) || ''}
        ${CSSGeometry};
      ">
        ${Widget.Rendering()}
      </div>`;
    }
}
/**** useDesigner ****/
let DesignerLayer = undefined;
export function useDesigner(newDesigner) {
    allowFunction('WAT designer', newDesigner);
    console.log('installing WebApp Tinkerer Designer');
    DesignerLayer = newDesigner;
    rerender();
}
//------------------------------------------------------------------------------
//--                               WAT Startup                                --
//------------------------------------------------------------------------------
let AppletStore;
let Applet;
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
    let SerializationElement = document.querySelector('script[type="wat/applet"]');
    /**** deserialize applet ****/
    let Applet = undefined;
    let Serialization = await AppletStore.getItem('WAT-Applet');
    if (Serialization != null) {
        try {
            Applet = WAT_Applet.deserializedFrom(Serialization);
        }
        catch (Signal) {
            console.error('could not deserialize applet from backup', Signal);
        }
    }
    if ((Applet == null) && (SerializationElement != null)) {
        try {
            Applet = WAT_Applet.deserializedFrom(SerializationElement.textContent || '');
        }
        catch (Signal) {
            console.error('could not deserialize applet', Signal);
        }
    }
    if (Applet == null) {
        Applet = WAT_Applet.deserializedFrom('{"PageList":[]}');
    }
    if (Applet.visitedPage == null) {
        Applet.visitPage(Applet.PageList[0]);
    }
    /**** read and activate applet script - if stored separately ****/
    let ScriptElement = document.querySelector('script[type="wat/applet-script"]');
    if (ScriptElement != null) {
        Applet.activeScript = ScriptElement.textContent || '';
    }
    Applet.activateScript();
    /**** finally render the applet ****/
    let AppletElement = document.body.querySelector('div[type="wat/applet"]');
    if (AppletElement == null) {
        AppletElement = document.createElement('div');
        AppletElement.setAttribute('type', 'wat/applet');
        AppletElement.classList.add('fullscreen');
        document.body.appendChild(AppletElement);
    }
    AppletElement.innerHTML = '';
    render(html `<${WAT_combinedView} Applet=${Applet}/>`, AppletElement);
    console.log('WebApp Tinkerer Runtime is operational');
} /**** IdOfWidget ****/
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
