var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var WAT;
(function (WAT) {
    var Version = '0.1.0';
    WAT.WAT_horizontalAnchorses = ['left-width', 'left-right', 'width-right'];
    WAT.WAT_verticalAnchorses = ['top-height', 'top-bottom', 'height-bottom'];
    /**** visual data types ****/
    WAT.WAT_FontWeights = [
        'thin', 'extra-light', 'light', 'normal', 'medium', 'semi-bold',
        'bold', 'extra-bold', 'heavy', 'lighter', 'bolder'
    ];
    WAT.WAT_FontWeightValues = Object.assign(Object.create(null), {
        'thin': 100, 'extra-light': 200, 'light': 300, 'normal': 400, 'medium': 500,
        'semi-bold': 600, 'bold': 700, 'extra-bold': 800, 'heavy': 900
    });
    WAT.WAT_FontStyles = ['normal', 'italic'];
    WAT.WAT_BackgroundModes = ['normal', 'contain', 'cover', 'fill', 'tile'];
    WAT.WAT_Cursors = [
        'alias', 'all-scroll', 'auto', 'cell', 'context-menu', 'col-resize', 'copy',
        'crosshair', 'default', 'e-resize', 'ew-resize', 'grab', 'grabbing', 'help',
        'move', 'n-resize', 'ne-resize', 'nesw-resize', 'ns-resize', 'nw-resize',
        'nwse-resize', 'no-drop', 'none', 'not-allowed', 'pointer', 'progress',
        'row-resize', 's-resize', 'se-resize', 'sw-resize', 'text', 'vertical-text',
        'w-resize', 'wait', 'zoom-in', 'zoom-out'
    ];
    WAT.WAT_Overflows = ['visible', 'hidden', 'scroll', 'auto'];
    WAT.WAT_TextOverflows = ['clip', 'ellipsis'];
    /**** get a reference to the "global" object ****/
    WAT.global = Function('return this')();
    // see https://stackoverflow.com/questions/3277182/how-to-get-the-global-object-in-javascript
    /**** check jQuery dependency ****/
    if ( // duck typing test for jQuery
    (typeof $ !== 'function') || ($.fn == null) ||
        !/^\d+[.]\d+([.]\d+)?$/.test($.fn.jquery)) {
        window.alert('jQuery not found\n\n' +
            'The WebApp Tinkerer (WAT) requires jQuery to be loaded first');
        throw new Error('MissingDependency: "jquery" not found');
    }
    /**** check javascript-interface-library dependency ****/
    if ((WAT.global['JIL'] == null) || (typeof WAT.global['JIL'] !== 'object')) {
        window.alert('"javascript-interface-library" not found\n\n' +
            'The WebApp Tinkerer (WAT) requires the "javascript-interface-library" ' +
            'to be loaded first');
        throw new Error('MissingDependency: "javascript-interface-library" not found');
    }
    var _a = WAT.global['JIL'], Object_hasOwnProperty = _a.Object_hasOwnProperty, StringIsEmpty = _a.StringIsEmpty, ObjectIsEmpty = _a.ObjectIsEmpty, ValuesAreEqual = _a.ValuesAreEqual, ValuesDiffer = _a.ValuesDiffer, throwError = _a.throwError, ValueIsBoolean = _a.ValueIsBoolean, ValueIsFiniteNumber = _a.ValueIsFiniteNumber, ValueIsNumberInRange = _a.ValueIsNumberInRange, ValueIsString = _a.ValueIsString, ValueIsEmptyString = _a.ValueIsEmptyString, ValueIsStringMatching = _a.ValueIsStringMatching, ValueIsTextline = _a.ValueIsTextline, ValueIsFunction = _a.ValueIsFunction, ValueIsObject = _a.ValueIsObject, ValueIsArray = _a.ValueIsArray, ValueIsOneOf = _a.ValueIsOneOf, ValueIsColor = _a.ValueIsColor, ValueIsEMailAddress = _a.ValueIsEMailAddress, ValueIsURL = _a.ValueIsURL, ValidatorForClassifier = _a.ValidatorForClassifier, acceptNil = _a.acceptNil, rejectNil = _a.rejectNil, allowBoolean = _a.allowBoolean, expectBoolean = _a.expectBoolean, expectedBoolean = _a.expectedBoolean, expectedNumber = _a.expectedNumber, allowFiniteNumber = _a.allowFiniteNumber, expectFiniteNumber = _a.expectFiniteNumber, allowNumberInRange = _a.allowNumberInRange, expectedNumberInRange = _a.expectedNumberInRange, expectCardinal = _a.expectCardinal, allowInteger = _a.allowInteger, expectInteger = _a.expectInteger, allowIntegerInRange = _a.allowIntegerInRange, expectedIntegerInRange = _a.expectedIntegerInRange, allowOrdinal = _a.allowOrdinal, expectString = _a.expectString, allowStringMatching = _a.allowStringMatching, expectedStringMatching = _a.expectedStringMatching, allowText = _a.allowText, expectText = _a.expectText, allowTextline = _a.allowTextline, expectTextline = _a.expectTextline, expectedTextline = _a.expectedTextline, expectFunction = _a.expectFunction, expectObject = _a.expectObject, allowPlainObject = _a.allowPlainObject, expectPlainObject = _a.expectPlainObject, allowArray = _a.allowArray, expectedArray = _a.expectedArray, allowListSatisfying = _a.allowListSatisfying, allowOneOf = _a.allowOneOf, expectOneOf = _a.expectOneOf, allowColor = _a.allowColor, expectColor = _a.expectColor, allowEMailAddress = _a.allowEMailAddress, allowURL = _a.allowURL, expectURL = _a.expectURL, HexColor = _a.HexColor, shortHexColor = _a.shortHexColor, quoted = _a.quoted, HTMLsafe = _a.HTMLsafe;
    /**** ValueIsVisual ****/
    function ValueIsVisual(Value) {
        return (Value instanceof WAT_Visual);
    }
    WAT.ValueIsVisual = ValueIsVisual;
    /**** allow/expect[ed]Visual ****/
    WAT.allowVisual = ValidatorForClassifier(ValueIsVisual, acceptNil, 'WAT visual'), WAT.allowedVisual = WAT.allowVisual;
    WAT.expectVisual = ValidatorForClassifier(ValueIsVisual, rejectNil, 'WAT visual'), WAT.expectedVisual = WAT.expectVisual;
    /**** ValueIsApplet ****/
    function ValueIsApplet(Value) {
        return (Value instanceof WAT_Applet);
    }
    WAT.ValueIsApplet = ValueIsApplet;
    /**** allow/expect[ed]Applet ****/
    WAT.allowApplet = ValidatorForClassifier(ValueIsApplet, acceptNil, 'WAT applet'), WAT.allowedApplet = WAT.allowApplet;
    WAT.expectApplet = ValidatorForClassifier(ValueIsApplet, rejectNil, 'WAT applet'), WAT.expectedApplet = WAT.expectApplet;
    /**** ValueIsContainer ****/
    function ValueIsContainer(Value) {
        return ((Value instanceof WAT_Card) ||
            (Value instanceof WAT_Compound));
    }
    WAT.ValueIsContainer = ValueIsContainer;
    /**** allow/expect[ed]Container ****/
    WAT.allowContainer = ValidatorForClassifier(ValueIsContainer, acceptNil, 'WAT container'), WAT.allowedContainer = WAT.allowContainer;
    WAT.expectContainer = ValidatorForClassifier(ValueIsContainer, rejectNil, 'WAT container'), WAT.expectedContainer = WAT.expectContainer;
    /**** ValueIsCard ****/
    function ValueIsCard(Value) {
        return (Value instanceof WAT_Card);
    }
    WAT.ValueIsCard = ValueIsCard;
    /**** allow/expect[ed]Card ****/
    WAT.allowCard = ValidatorForClassifier(ValueIsCard, acceptNil, 'WAT card'), WAT.allowedCard = WAT.allowCard;
    WAT.expectCard = ValidatorForClassifier(ValueIsCard, rejectNil, 'WAT card'), WAT.expectedCard = WAT.expectCard;
    /**** ValueIsComponent ****/
    function ValueIsComponent(Value) {
        return ((Value instanceof WAT_Compound) ||
            (Value instanceof WAT_Control));
    }
    WAT.ValueIsComponent = ValueIsComponent;
    /**** allow/expect[ed]Component ****/
    WAT.allowComponent = ValidatorForClassifier(ValueIsComponent, acceptNil, 'WAT component'), WAT.allowedComponent = WAT.allowComponent;
    WAT.expectComponent = ValidatorForClassifier(ValueIsComponent, rejectNil, 'WAT component'), WAT.expectedComponent = WAT.expectComponent;
    /**** ValueIsCompound ****/
    function ValueIsCompound(Value) {
        return (Value instanceof WAT_Compound);
    }
    WAT.ValueIsCompound = ValueIsCompound;
    /**** allow/expect[ed]Compound ****/
    WAT.allowCompound = ValidatorForClassifier(ValueIsCompound, acceptNil, 'WAT compound'), WAT.allowedCompound = WAT.allowCompound;
    WAT.expectCompound = ValidatorForClassifier(ValueIsCompound, rejectNil, 'WAT compound'), WAT.expectedCompound = WAT.expectCompound;
    /**** ValueIsControl ****/
    function ValueIsControl(Value) {
        return (Value instanceof WAT_Control);
    }
    WAT.ValueIsControl = ValueIsControl;
    /**** allow/expect[ed]Control ****/
    WAT.allowControl = ValidatorForClassifier(ValueIsControl, acceptNil, 'WAT control'), WAT.allowedControl = WAT.allowControl;
    WAT.expectControl = ValidatorForClassifier(ValueIsControl, rejectNil, 'WAT control'), WAT.expectedControl = WAT.expectControl;
    /**** ValueIsName ****/
    var WAT_NamePattern = /^[#]?[a-z$_][a-z$_0-9]*(-[a-z$_][a-z$_0-9]*)*$/i;
    function ValueIsName(Value) {
        return ValueIsStringMatching(Value, WAT_NamePattern);
    }
    WAT.ValueIsName = ValueIsName;
    /**** allow/expect[ed]Name ****/
    WAT.allowName = ValidatorForClassifier(ValueIsName, acceptNil, 'WAT name'), WAT.allowedName = WAT.allowName;
    WAT.expectName = ValidatorForClassifier(ValueIsName, rejectNil, 'WAT name'), WAT.expectedName = WAT.expectName;
    /**** ValueIsOrdinaryName ****/
    var WAT_OrdinaryNamePattern = /^[a-z$_][a-z$_0-9]*(-[a-z$_][a-z$_0-9]*)*$/i;
    function ValueIsOrdinaryName(Value) {
        return ValueIsStringMatching(Value, WAT_OrdinaryNamePattern);
    }
    WAT.ValueIsOrdinaryName = ValueIsOrdinaryName;
    /**** allow/expect[ed]OrdinaryName ****/
    WAT.allowOrdinaryName = ValidatorForClassifier(ValueIsOrdinaryName, acceptNil, '"ordinary" WAT name'), WAT.allowedOrdinaryName = WAT.allowOrdinaryName;
    WAT.expectOrdinaryName = ValidatorForClassifier(ValueIsOrdinaryName, rejectNil, '"ordinary" WAT name'), WAT.expectedOrdinaryName = WAT.expectOrdinaryName;
    /**** ValueIsUniqueName ****/
    var WAT_UniqueNamePattern = /^[#][a-z$_][a-z$_0-9]*(-[a-z$_][a-z$_0-9]*)*$/i;
    function ValueIsUniqueName(Value) {
        return ValueIsStringMatching(Value, WAT_UniqueNamePattern);
    }
    WAT.ValueIsUniqueName = ValueIsUniqueName;
    /**** allow/expect[ed]UniqueName ****/
    WAT.allowUniqueName = ValidatorForClassifier(ValueIsUniqueName, acceptNil, 'unique WAT name'), WAT.allowedUniqueName = WAT.allowUniqueName;
    WAT.expectUniqueName = ValidatorForClassifier(ValueIsUniqueName, rejectNil, 'unique WAT name'), WAT.expectedUniqueName = WAT.expectUniqueName;
    /**** ValueIsIdentifier ****/
    var IdentifierPattern = /^[a-z$_][a-z$_0-9]*$/i;
    function ValueIsIdentifier(Value) {
        return ValueIsStringMatching(Value, IdentifierPattern);
    }
    WAT.ValueIsIdentifier = ValueIsIdentifier;
    /**** allow/expect[ed]Identifier ****/
    WAT.allowIdentifier = ValidatorForClassifier(ValueIsIdentifier, acceptNil, 'WAT identifier'), WAT.allowedIdentifier = WAT.allowIdentifier;
    WAT.expectIdentifier = ValidatorForClassifier(ValueIsIdentifier, rejectNil, 'WAT identifier'), WAT.expectedIdentifier = WAT.expectIdentifier;
    /**** ValueIsLocation ****/
    function ValueIsLocation(Value) {
        return ValueIsNumberInRange(Value, 0, Infinity, true, false);
    }
    WAT.ValueIsLocation = ValueIsLocation;
    /**** allow/expect[ed]Location ****/
    WAT.allowLocation = ValidatorForClassifier(ValueIsLocation, acceptNil, 'coordinate'), WAT.allowedLocation = WAT.allowLocation;
    WAT.expectLocation = ValidatorForClassifier(ValueIsLocation, rejectNil, 'coordinate'), WAT.expectedLocation = WAT.expectLocation;
    /**** ValueIsDimension ****/
    function ValueIsDimension(Value) {
        return ValueIsFiniteNumber(Value) && (Value >= 0);
    }
    WAT.ValueIsDimension = ValueIsDimension;
    /**** allow/expect[ed]Dimension ****/
    WAT.allowDimension = ValidatorForClassifier(ValueIsDimension, acceptNil, 'extent'), WAT.allowedDimension = WAT.allowDimension;
    WAT.expectDimension = ValidatorForClassifier(ValueIsDimension, rejectNil, 'extent'), WAT.expectedDimension = WAT.expectDimension;
    /**** ValueIsIncompleteGeometry ****/
    function ValueIsIncompleteGeometry(Value) {
        if (!ValueIsObject(Value)) {
            return false;
        }
        for (var Key in Value) {
            if (Object_hasOwnProperty(Value, Key)) {
                switch (Key) {
                    case 'x':
                    case 'y':
                        if ((Value[Key] != null) &&
                            !ValueIsFiniteNumber(Value[Key])) {
                            return false;
                        }
                        break;
                    case 'Width':
                    case 'Height':
                        if ((Value[Key] != null) &&
                            !ValueIsNumberInRange(Value[Key], 0)) {
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
    var allowIncompleteGeometry = ValidatorForClassifier(ValueIsIncompleteGeometry, acceptNil, 'WAT geometry'), allowedIncompleteGeometry = allowIncompleteGeometry;
    var expectIncompleteGeometry = ValidatorForClassifier(ValueIsIncompleteGeometry, rejectNil, 'WAT geometry'), expectedIncompleteGeometry = expectIncompleteGeometry;
    /**** ValueIsOffsets ****/
    function ValueIsOffsets(Value) {
        return (ValueIsArray(Value) && (Value.length === 2) &&
            ValueIsFiniteNumber(Value[0]) && ValueIsFiniteNumber(Value[1]));
    }
    WAT.ValueIsOffsets = ValueIsOffsets;
    /**** allow/expect[ed]Offsets ****/
    WAT.allowOffsets = ValidatorForClassifier(ValueIsOffsets, acceptNil, 'list of WAT offset values'), WAT.allowedOffsets = WAT.allowOffsets;
    WAT.expectOffsets = ValidatorForClassifier(ValueIsOffsets, rejectNil, 'list of WAT offset values'), WAT.expectedOffsets = WAT.expectOffsets;
    /**** ValueIsTextDecoration ****/
    WAT.WAT_TextDecorationLines = ['none', 'underline', 'overline', 'line-through'];
    WAT.WAT_TextDecorationStyles = ['solid', 'double', 'dotted', 'dashed', 'wavy'];
    function ValueIsTextDecoration(Value) {
        return (Value === 'none') || (ValueIsObject(Value) &&
            ValueIsOneOf(Value.Line, WAT.WAT_TextDecorationLines) &&
            ((Value.Color == null) || ValueIsColor(Value.Color)) &&
            ((Value.Style == null) || ValueIsOneOf(Value.Style, WAT.WAT_TextDecorationStyles)) &&
            ((Value.Thickness == null) || ValueIsDimension(Value.Thickness)));
    }
    WAT.ValueIsTextDecoration = ValueIsTextDecoration;
    /**** allow/expect[ed]TextDecoration ****/
    WAT.allowTextDecoration = ValidatorForClassifier(ValueIsTextDecoration, acceptNil, 'a WAT text decoration'), WAT.allowedTextDecoration = WAT.allowTextDecoration;
    WAT.expectTextDecoration = ValidatorForClassifier(ValueIsTextDecoration, rejectNil, 'a WAT text decoration'), WAT.expectedTextDecoration = WAT.expectTextDecoration;
    function ValueIsTextShadow(Value) {
        return (Value === 'none') || (ValueIsObject(Value) &&
            ValueIsLocation(Value.xOffset) && ValueIsLocation(Value.yOffset) &&
            ValueIsDimension(Value.BlurRadius) && ValueIsColor(Value.Color));
    }
    WAT.ValueIsTextShadow = ValueIsTextShadow;
    /**** allow/expect[ed]TextShadow ****/
    WAT.allowTextShadow = ValidatorForClassifier(ValueIsTextShadow, acceptNil, 'a WAT text shadow specification'), WAT.allowedTextShadow = WAT.allowTextShadow;
    WAT.expectTextShadow = ValidatorForClassifier(ValueIsTextShadow, rejectNil, 'a WAT text shadow specification'), WAT.expectedTextShadow = WAT.expectTextShadow;
    /**** ValueIsTextAlignment ****/
    WAT.WAT_TextAlignments = ['left', 'center', 'right', 'justify'];
    function ValueIsTextAlignment(Value) {
        return ValueIsOneOf(Value, WAT.WAT_TextAlignments);
    }
    WAT.ValueIsTextAlignment = ValueIsTextAlignment;
    /**** allow/expect[ed]TextAlignment ****/
    WAT.allowTextAlignment = ValidatorForClassifier(ValueIsTextAlignment, acceptNil, 'a WAT text alignment'), WAT.allowedTextAlignment = WAT.allowTextAlignment;
    WAT.expectTextAlignment = ValidatorForClassifier(ValueIsTextAlignment, rejectNil, 'a WAT text alignment'), WAT.expectedTextAlignment = WAT.expectTextAlignment;
    /**** ValueIsBorderStyle ****/
    WAT.WAT_BorderStyles = [
        'none', 'dotted', 'dashed', 'solid', 'double',
        'groove', 'ridge', 'inset', 'outset'
    ];
    function ValueIsBorderStyle(Value) {
        return ValueIsOneOf(Value, WAT.WAT_BorderStyles);
    }
    WAT.ValueIsBorderStyle = ValueIsBorderStyle;
    /**** allow/expect[ed]BorderStyle ****/
    WAT.allowBorderStyle = ValidatorForClassifier(ValueIsBorderStyle, acceptNil, 'a WAT border style'), WAT.allowedBorderStyle = WAT.allowBorderStyle;
    WAT.expectBorderStyle = ValidatorForClassifier(ValueIsBorderStyle, rejectNil, 'a WAT border style'), WAT.expectedBorderStyle = WAT.expectBorderStyle;
    function ValueIsBoxShadow(Value) {
        return (Value === 'none') || (ValueIsObject(Value) && ValueIsBoolean(Value.isInset) &&
            ValueIsLocation(Value.xOffset) && ValueIsLocation(Value.yOffset) &&
            ValueIsDimension(Value.BlurRadius) && ValueIsDimension(Value.SpreadRadius) &&
            ValueIsColor(Value.Color));
    }
    WAT.ValueIsBoxShadow = ValueIsBoxShadow;
    /**** allow/expect[ed]BoxShadow ****/
    WAT.allowBoxShadow = ValidatorForClassifier(ValueIsBoxShadow, acceptNil, 'a WAT box shadow specification'), WAT.allowedBoxShadow = WAT.allowBoxShadow;
    WAT.expectBoxShadow = ValidatorForClassifier(ValueIsBoxShadow, rejectNil, 'a WAT box shadow specification'), WAT.expectedBoxShadow = WAT.expectBoxShadow;
    function ValueIsCustomCursor(Value) {
        return (Value === 'none') || (ValueIsObject(Value) &&
            (ValueIsEmptyString(Value.ImageURL) || ValueIsURL(Value.ImageURL)) &&
            ValueIsNumberInRange(Value.xOffset, 0, 31) &&
            ValueIsNumberInRange(Value.yOffset, 0, 31));
    }
    WAT.ValueIsCustomCursor = ValueIsCustomCursor;
    /**** allow/expect[ed]CustomCursor ****/
    WAT.allowCustomCursor = ValidatorForClassifier(ValueIsCustomCursor, acceptNil, 'a custom WAT cursor'), WAT.allowedCustomCursor = WAT.allowCustomCursor;
    WAT.expectCustomCursor = ValidatorForClassifier(ValueIsCustomCursor, rejectNil, 'a custom WAT cursor'), WAT.expectedCustomCursor = WAT.expectCustomCursor;
    /**** throwReadOnlyError ****/
    function throwReadOnlyError(Name) {
        throwError('ReadOnlyProperty: property ' + quoted(Name) + ' must not be set');
    }
    WAT.throwReadOnlyError = throwReadOnlyError;
    /**** TouchEventHandler ****/
    // see https://stackoverflow.com/questions/1517924/javascript-mapping-touch-events-to-mouse-events
    // and https://stackoverflow.com/questions/5885808/includes-touch-events-clientx-y-scrolling-or-not
    function TouchEventHandler(Event) {
        var EventType;
        switch (Event.type) {
            case "touchstart":
                EventType = "mousedown";
                break;
            case "touchmove":
                EventType = "mousemove";
                break;
            case "touchend":
                EventType = "mouseup";
                break;
            case "touchcancel":
                EventType = "mouseup";
                break;
            default: return;
        }
        ;
        var firstTouch = Event.changedTouches[0];
        var clientX = firstTouch.clientX, pageX = firstTouch.pageX, PageXOffset = window.pageXOffset;
        var clientY = firstTouch.clientY, pageY = firstTouch.pageY, PageYOffset = window.pageYOffset;
        if ((pageX === 0) && (Math.floor(clientX) > Math.floor(pageX)) ||
            (pageY === 0) && (Math.floor(clientY) > Math.floor(pageY))) {
            clientX -= PageXOffset;
            clientY -= PageYOffset;
        }
        else if ((clientX < pageX - PageXOffset) || (clientY < pageY - PageYOffset)) {
            clientX = pageX - PageXOffset;
            clientY = pageY - PageYOffset;
        }
        var simulatedEvent = document.createEvent("MouseEvent");
        simulatedEvent.initMouseEvent(EventType, true, true, window, 1, // type, canBubble, cancelable, view, clickCount,
        firstTouch.screenX, firstTouch.screenY, // screenX, screenY,
        clientX, clientY, // clientX, clientY,
        false, false, false, false, 0, null // ctrlKey, altKey, shiftKey, metaKey, button, relatedTarget
        );
        var MouseGrabLayer = document.getElementById('MouseGrabLayer');
        if (MouseGrabLayer == null) {
            firstTouch.target.dispatchEvent(simulatedEvent);
        }
        else {
            MouseGrabLayer.dispatchEvent(simulatedEvent);
        }
    }
    ;
    document.addEventListener('touchstart', TouchEventHandler, true);
    document.addEventListener('touchmove', TouchEventHandler, true);
    document.addEventListener('touchend', TouchEventHandler, true);
    document.addEventListener('touchcancel', TouchEventHandler, true);
    function parseHTML(HTML, Callbacks) {
        var StartTagPattern = /^<([-a-z0-9]+)((?:[\s\xA0]+[-a-z0-9_]+(?:[\s\xA0]*=[\s\xA0]*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s\xA0]+))?)*)[\s\xA0]*(\/?)>/i;
        var EndTagPattern = /^<\/([-a-z0-9_]+)[^>]*>/i;
        var AttributePattern = /([-a-z0-9]+)(?:[\s\xA0]*=[\s\xA0]*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s\xA0]+)))?/gi;
        /**** MapOf makes a "map" with keys from a given comma-separated key list ****/
        function MapOf(Elements) {
            var ElementList = Elements.split(',');
            var Result = Object.create(null);
            for (var i = 0, l = ElementList.length; i < l; i++) {
                Result[ElementList[i]] = true;
            }
            return Result;
        }
        /**** maps with the names of tags and attributes with a specific characteristic ****/
        var isEmptyElement = MapOf('area,base,basefont,br,col,embed,frame,hr,img,isIndex,keygen,link,' +
            'meta,param,source,track,wbr' // without "input"
        );
        var isBlockElement = MapOf('address,article,aside,audio,blockquote,canvas,center,dd,dir,div,dl,dt,' +
            'fieldset,figcaption,figure,footer,form,frameset,h1,h2,h3,h4,h5,h6,header,' +
            'hgroup,hr,ins,isIndex,li,main,menu,nav,noframes,noscript,ol,output,p,pre,' +
            'section,table,tbody,td,tfoot,th,thead,tr,ul,video');
        var isInlineElement = MapOf('a,abbr,acronym,Applet,b,basefont,bdo,big,br,button,cite,code,del,dfn,em,' +
            'font,i,iframe,img,input,ins,kbd,label,map,object,q,s,samp,script,select,' +
            'small,span,strike,strong,sub,sup,textarea,tt,u,var');
        var isSelfClosingElement = MapOf('area,base,basefont,bgsound,br,col,colgroup,dd,dt,embed,frame,hr,img,' +
            'input,isIndex,keygen,li,link,menuitem,meta,options,p,param,source,td,' +
            'tfoot,th,thead,tr,track,wbr');
        var isSpecialElement = MapOf('script,style' + ',preprocessor,business-logic');
        var isKeywordAttribute = MapOf('checked,compact,declare,defer,disabled,ismap,multiple,nohref,noresize,' +
            'noshade,nowrap,readonly,selected');
        /**** actual HTML parser ****/
        var doNothing = function () { };
        var processStartTag = Callbacks.processStartTag || doNothing;
        var processEndTag = Callbacks.processEndTag || doNothing;
        var processText = Callbacks.processText || doNothing;
        var processComment = Callbacks.processComment || doNothing;
        var Stack = []; // Stack with tag names of unclosed HTML elements
        Stack.last = function last() { return this[this.length - 1]; };
        function parseStartTag(_, TagName, rest, isUnary) {
            TagName = TagName.toLowerCase();
            if (isBlockElement[TagName]) { // close pending inline elements
                while ((Stack.last() != null) && isInlineElement[Stack.last()]) {
                    parseEndTag('', Stack.last());
                }
            }
            if (isSelfClosingElement[TagName] && (Stack.last() === TagName)) {
                parseEndTag('', TagName);
            }
            isUnary = isEmptyElement[TagName] || !!isUnary;
            if (!isUnary) {
                Stack.push(TagName);
            }
            if (processStartTag !== doNothing) {
                var Attributes_1 = [];
                rest.replace(AttributePattern, function (Match, AttributeName) {
                    var AttributeValue = (arguments[2] ? arguments[2] :
                        (arguments[3] ? arguments[3] :
                            (arguments[4] ? arguments[4] :
                                (isKeywordAttribute[AttributeName] ? AttributeName : ''))));
                    Attributes_1.push({
                        Name: AttributeName, Value: AttributeValue,
                        escapedValue: AttributeValue.replace(/(^|[^\\])"/g, '$1\\\"')
                    });
                    return '';
                });
                processStartTag(TagName, Attributes_1, isUnary, (Stack.length === (isUnary ? 0 : 1)));
            }
            return '';
        }
        function parseEndTag(_, TagName) {
            var Position; // how many open elements have to be closed?
            if (TagName == null) {
                Position = 0;
            }
            else {
                TagName = TagName.toLowerCase();
                for (Position = Stack.length - 1; Position >= 0; Position--) {
                    if (Stack[Position] === TagName) {
                        break;
                    }
                }
            }
            if (Position >= 0) {
                for (var i = Stack.length - 1; i >= Position; i--) {
                    processEndTag(Stack[i], (i === 0));
                }
                Stack.length = Position;
            }
            return '';
        }
        var lastHTMLContent = HTML;
        while (HTML !== '') {
            var inText = true;
            if ((Stack.last() == null) || !isSpecialElement[Stack.last()]) {
                if (HTML.startsWith('<!--')) { // HTML comment
                    var Index = HTML.indexOf('-->', 4);
                    if (Index > 0) {
                        processComment(HTML.slice(4, Index));
                        HTML = HTML.slice(Index + 3);
                        inText = false;
                    }
                }
                else if (HTML.startsWith('</')) { // HTML end tag
                    var Match = HTML.match(EndTagPattern);
                    if (Match != null) {
                        HTML = HTML.slice(Match[0].length);
                        Match[0].replace(EndTagPattern, parseEndTag); // for side effects
                        inText = false;
                    }
                }
                else if (HTML.startsWith('<')) { // HTML start tag
                    var Match = HTML.match(StartTagPattern);
                    if (Match != null) {
                        HTML = HTML.slice(Match[0].length);
                        Match[0].replace(StartTagPattern, parseStartTag); // for side effects
                        inText = false;
                    }
                }
                if (inText) {
                    var Index = HTML.indexOf('<');
                    var Text = (Index < 0 ? HTML : HTML.slice(0, Index));
                    HTML = (Index < 0 ? '' : HTML.slice(Index));
                    processText(Text, Stack.length === 0);
                }
            }
            else {
                HTML = HTML.replace(new RegExp('^((?:.|\n)*?)<\/' + Stack.last() + '[^>]*>', 'i'), function (_, Text) {
                    Text = Text
                        .replace(/<!--(.*?)-->/g, '$1')
                        .replace(/<!\[CDATA\[(.*?)]]>/g, '$1');
                    processText(Text, Stack.length === 0);
                    return '';
                });
                parseEndTag('', Stack.last());
            }
            if (HTML === lastHTMLContent) {
                switch (true) {
                    case HTML.startsWith('<'):
                        HTML = HTML.slice(1);
                        processText('&lt;', Stack.length === 0);
                        break;
                    default:
                        throwError('HTMLParseError: could not parse "' + HTML + '"');
                }
            }
            lastHTMLContent = HTML;
        }
        parseEndTag();
    }
    WAT.parseHTML = parseHTML;
    /**** AttributeFrom ****/
    function AttributeFrom(AttributeName, Attributes) {
        for (var i = 0, l = Attributes.length; i < l; i++) {
            var Attribute = Attributes[i];
            if (Attribute.Name === AttributeName) {
                return Attribute.Value;
            }
        }
        return undefined;
    }
    WAT.AttributeFrom = AttributeFrom;
    /**** deserializedTag ****/
    function deserializedTag(TagName, Attributes, isUnary) {
        var Result = '<' + TagName;
        for (var i = 0, l = Attributes.length; i < l; i++) {
            var Attribute = Attributes[i];
            Result += ' ' + Attribute.Name + '="' + Attribute.escapedValue + '"';
        }
        return Result + (isUnary ? '/>' : '>');
    }
    WAT.deserializedTag = deserializedTag;
    /**** escapedHTMLAttribute ****/
    function escapedHTMLAttribute(OriginalValue) {
        return OriginalValue.replace(/[&<>"'\u0000-\u001F\u007F-\u009F\\]/g, function (Match) {
            switch (Match) {
                case '&': return '&amp;';
                case '<': return '&lt;';
                case '>': return '&gt;';
                case '"': return '&quot;';
                case "'": return '&apos;';
                case '\n': return '\n'; // allows line feeds to be preserved
                case '\\': return '&#92;';
                default:
                    var Result = Match.charCodeAt(0).toString(16);
                    return '&#x0000'.substring(3, 7 - Result.length) + Result + ';';
            }
        });
    }
    WAT.escapedHTMLAttribute = escapedHTMLAttribute;
    /**** unescapedHTMLAttribute ****/
    function unescapedHTMLAttribute(OriginalValue) {
        return OriginalValue.replace(/&(amp|lt|gt|quot|apos|#92|#x[0-9a-fA-F]{4});/g, function (Match) {
            switch (Match) {
                case '&amp;': return '&';
                case '&lt;': return '<';
                case '&gt;': return '>';
                case '&quot;': return '"';
                case '&apos;': return "'";
                case '&#92;': return '\\';
                default:
                    var Code = parseInt(Match.slice(3), 16);
                    return String.fromCharCode(Code);
            }
        });
    }
    WAT.unescapedHTMLAttribute = unescapedHTMLAttribute;
    /**** uniqueIdOfVisual ****/
    function uniqueIdOfVisual(Visual) {
        var Peer = $(Visual.Peer);
        var Id = Peer.attr('id');
        if (Id == null) {
            Peer.attr('id', Id = newUniqueId());
        }
        return Id;
    }
    WAT.uniqueIdOfVisual = uniqueIdOfVisual;
    /**** updateUniqueIdsInPeer ****/
    function updateUniqueIdsInPeer(Peer) {
        var $Peer = $(Peer);
        var IdMappings = Object.create(null);
        function mappedId(oldId) {
            var newId = IdMappings[oldId];
            if (newId == null) {
                newId = (IdMappings[oldId] = newUniqueId());
            }
            return newId;
        }
        if ($Peer.is('[id|="wat"]')) { // "find" searches inside(!) element only
            $Peer.attr('id', mappedId($Peer.attr('id')));
        }
        $Peer.find('[id|="wat"]').each(function () {
            var Candidate = $(this);
            Candidate.attr('id', mappedId(Candidate.attr('id')));
        });
        $Peer.find('input[list|="wat"]').each(function () {
            var Candidate = $(this);
            Candidate.attr('list', mappedId(Candidate.attr('list')));
        });
        $Peer.find('label[for|="wat"]').each(function () {
            var Candidate = $(this);
            Candidate.attr('for', mappedId(Candidate.attr('for')));
        });
    }
    /**** newUniqueId ****/
    var uniqueIdCounter = 0;
    function newUniqueId() {
        uniqueIdCounter++;
        return 'wat-' + uniqueIdCounter;
    }
    WAT.newUniqueId = newUniqueId;
    //----------------------------------------------------------------------------//
    //                             Category Handling                              //
    //----------------------------------------------------------------------------//
    WAT.WAT_Categories = ['Applet', 'Card', 'Compound', 'Control'];
    /**** CategoryOfPeer ****/
    function CategoryOfPeer(Peer) {
        var Classes = Peer.classList;
        switch (true) {
            case Classes.contains('Applet'): return 'Applet';
            case Classes.contains('Card'): return 'Card';
            case Classes.contains('Compound'): return 'Compound';
            case Classes.contains('Control'): return 'Control';
        }
    }
    /**** CategoryOfVisual ****/
    function CategoryOfVisual(Visual) {
        var CategoryObject = Object.getPrototypeOf(Object.getPrototypeOf(Visual) // this is the visual's MasterObject
        );
        switch (CategoryObject.constructor) {
            case WAT_Applet: return 'Applet';
            case WAT_Card: return 'Card';
            case WAT_Compound: return 'Compound';
            case WAT_Control: return 'Control';
        }
        return CategoryObject.Category;
    }
    var MasterRegistry = Object.create(null);
    var CategoryMethodSet = Object.create(null);
    // used by "CategoryMethod"
    /**** existingRecordOfMaster ****/
    function existingRecordOfMaster(Name) {
        WAT.expectOrdinaryName('master name', Name);
        var MasterRecord = MasterRegistry[Name.toLowerCase()];
        if (MasterRecord == null)
            throwError('NoSuchMaster: a master with the name ' + quoted(Name) + ' does not exist');
        return MasterRecord;
    }
    /**** Category/Name/Label/Classes/TemplateOfMaster ****/
    function CategoryOfMaster(Name) {
        return existingRecordOfMaster(Name).Category;
    }
    WAT.CategoryOfMaster = CategoryOfMaster;
    function NameOfMaster(Name) {
        return existingRecordOfMaster(Name).Name;
    }
    WAT.NameOfMaster = NameOfMaster;
    function GroupOfMaster(Name) {
        return existingRecordOfMaster(Name).Group;
    }
    WAT.GroupOfMaster = GroupOfMaster;
    function LabelOfMaster(Name) {
        return existingRecordOfMaster(Name).Label;
    }
    WAT.LabelOfMaster = LabelOfMaster;
    function ClassesOfMaster(Name) {
        return existingRecordOfMaster(Name).Classes;
    }
    WAT.ClassesOfMaster = ClassesOfMaster;
    function TemplateOfMaster(Name) {
        return existingRecordOfMaster(Name).Template;
    }
    WAT.TemplateOfMaster = TemplateOfMaster;
    /**** MasterOfVisual ****/
    function MasterOfVisual(Visual) {
        var MasterObject = Object.getPrototypeOf(Visual);
        for (var Master in MasterRegistry) {
            if (MasterRegistry[Master].Prototype === MasterObject) {
                return MasterRegistry[Master].Name;
            }
        }
        debugger;
        throwError('InternalError: could not find master of given visual');
    }
    //----------------------------------------------------------------------------//
    //                            Property Management                             //
    //----------------------------------------------------------------------------//
    WAT.WAT_PropertyEditorTypes = [
        'checkbox', 'choice',
        'textline-input', 'password-input', 'number-input', 'search-input',
        'phone-number-input', 'email-address-input', 'url-input',
        'time-input', 'date-time-input', 'date-input', 'month-input', 'week-input',
        'color-input', 'drop-down', 'slider',
        'text-input', 'html-input', 'css-input', 'javascript-input', 'json-input',
        'linelist-input', 'numberlist-input'
    ];
    /**** internalNames ****/
    var internalNames = Object.create(null);
    function collectInternalNames() {
        collectInternalNamesFrom(MasterRegistry['plainApplet'.toLowerCase()].Prototype);
        collectInternalNamesFrom(MasterRegistry['plainCard'.toLowerCase()].Prototype);
        collectInternalNamesFrom(MasterRegistry['plainCompound'.toLowerCase()].Prototype);
        collectInternalNamesFrom(MasterRegistry['plainControl'.toLowerCase()].Prototype);
    }
    function collectInternalNamesFrom(Visual) {
        for (var Name in Visual) {
            if (!(Name in Object)) {
                internalNames[Name] = Name;
            }
        }
    }
    /**** expectedPropertyDescriptor ****/
    function expectedPropertyDescriptor(Description, Value) {
        expectPlainObject(Description, Value);
        var Name = Value.Name;
        if (!ValueIsIdentifier(Name))
            throwError('InvalidArgument: invalid property name ' + quoted(Name));
        validatePropertyName(Name);
        var Label = Value.Label;
        switch (true) {
            case (Label == null):
                Label = Name;
                break;
            case ValueIsTextline(Label):
                Label = Label.trim() || Name;
                break;
            default: throwError('InvalidArgument: the label of property ' + quoted(Name) +
                ' does not consist of a single line of text');
        }
        var EditorType = Value.EditorType;
        switch (true) {
            case (EditorType == null): throwError('InvalidArgument: missing editor type for property ' + quoted(Name));
            case !ValueIsOneOf(EditorType, WAT.WAT_PropertyEditorTypes): throwError('InvalidArgument: invalid editor type given for property ' + quoted(Name));
        }
        var Property = { Name: Name, Label: Label, EditorType: EditorType };
        var InputPattern;
        switch (EditorType) {
            case 'checkbox':
                break;
            case 'choice': // drop-down for boolean properties
                Property.FalseValue = expectedTextline('label for value "false"', Value.FalseValue);
                Property.TrueValue = expectedTextline('label for value "true"', Value.TrueValue);
                break;
            case 'textline-input':
            case 'password-input':
            case 'email-address-input':
            case 'phone-number-input':
            case 'url-input':
            case 'search-input':
                if (Value.minLength != null) {
                    Property.minLength = expectedIntegerInRange('minimal input length', Value.minLength, 0);
                }
                if (Value.maxLength != null) {
                    Property.maxLength = expectedIntegerInRange('maximal input length', Value.maxLength, 0);
                }
                if ((Value.multiple != null) && (EditorType === 'email-address-input')) {
                    Property.multiple = expectedBoolean('multi-value flag', Value.multiple);
                }
                if (Value.Pattern != null) {
                    Property.Pattern = expectedTextline('input pattern', Value.Pattern);
                }
                break;
            case 'number-input':
                if (Value.minValue != null) {
                    Property.minValue = expectedNumber('minimal allowed value', Value.minValue);
                }
                if (Value.maxValue != null) {
                    Property.maxValue = expectedNumber('maximal allowed value', Value.maxValue);
                }
                if (Value.StepValue != null) {
                    if (Value.StepValue === 'any') {
                        Property.StepValue = 'any';
                    }
                    else {
                        Property.StepValue = expectedNumberInRange('step value', Value.StepValue, 0, Infinity, false);
                    }
                }
                break;
            case 'time-input':
                InputPattern = /^[0-9]{2}:[0-9]{2}$/;
            case 'date-time-input':
                InputPattern = /^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}$/;
            case 'date-input':
                InputPattern = InputPattern || /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/;
            case 'month-input':
                InputPattern = InputPattern || /^[0-9]{4}-[0-9]{2}$/;
            case 'week-input':
                InputPattern = InputPattern || /^[0-9]{4}-W[0-9]{2}$/;
                if (Value.minValue != null) {
                    Property.minValue = expectedStringMatching('minimal allowed value', Value.minValue, InputPattern);
                }
                if (Value.maxValue != null) {
                    Property.maxValue = expectedStringMatching('maximal allowed value', Value.maxValue, InputPattern);
                }
                if (Value.StepValue != null) {
                    if (Value.StepValue === 'any') {
                        Property.StepValue = 'any';
                    }
                    else {
                        Property.StepValue = expectedIntegerInRange('step value', Value.StepValue, 0);
                    }
                }
                break;
            case 'color-input':
                break;
            case 'drop-down':
                Property.ValueList = expectedArray('list of allowed values', Value.ValueList);
                for (var i = 0, l = Property.ValueList.length; i < l; i++) {
                    if (!ValueIsTextline(Property.ValueList[i]))
                        throwError('InvalidArgument: element #' + (i + 1) + ' of the list of ' +
                            'foreseen drop-down values is not a valid line of text');
                }
                break;
            case 'slider':
                if (Value.minValue != null) {
                    Property.minValue = expectedNumber('minimal allowed value', Value.minValue);
                }
                if (Value.maxValue != null) {
                    Property.maxValue = expectedNumber('maximal allowed value', Value.maxValue);
                }
                if (Value.StepValue != null) {
                    if (Value.StepValue === 'any') {
                        Property.StepValue = 'any';
                    }
                    else {
                        Property.StepValue = expectedNumberInRange('step value', Value.StepValue, 0, Infinity, false);
                    }
                }
                break;
            case 'text-input':
            case 'html-input':
            case 'css-input':
            case 'javascript-input':
            case 'json-input':
                if (Value.minLength != null) {
                    Property.minLength = expectedIntegerInRange('minimal input length', Value.minLength, 0);
                }
                if (Value.maxLength != null) {
                    Property.maxLength = expectedIntegerInRange('maximal input length', Value.maxLength, 0);
                }
                break;
            case 'linelist-input':
            case 'numberlist-input':
                break;
        }
        return Property;
    }
    /**** forbiddenPropertyNames ****/
    var forbiddenPropertyNames = Object.create(null);
    function collectForbiddenPropertyNames() {
        for (var Name in internalNames) {
            forbiddenPropertyNames[Name] = Name;
        }
        delete forbiddenPropertyNames['Value']; // "Value" is deliberately allowed!
    }
    /**** validatePropertyName ****/
    function validatePropertyName(Name) {
        if (Name in forbiddenPropertyNames)
            throwError('InvalidArgument: forbidden property name ' + quoted(Name));
    }
    //----------------------------------------------------------------------------//
    //                              "super" Handling                              //
    //----------------------------------------------------------------------------//
    /**** CategoryCall ****/
    function CategoryCall(Name) {
        var ArgList = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            ArgList[_i - 1] = arguments[_i];
        }
        WAT.expectIdentifier('function name', Name);
        var Category = Object.getPrototypeOf(Object.getPrototypeOf(Object.getPrototypeOf(this))); // since instance prototype is itself an instance
        var Owner = Category;
        while (Object.getOwnPropertyDescriptor(Owner, Name) == null) {
            Owner = Object.getPrototypeOf(Owner);
            if (Owner == null)
                throwError('NoSuchFunction: no prototype function called ' +
                    quoted(Name) + ' found');
        }
        return Owner[Name].apply(this, ArgList);
    }
    /**** MasterCall ****/
    function MasterCall(Name) {
        var ArgList = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            ArgList[_i - 1] = arguments[_i];
        }
        WAT.expectIdentifier('function name', Name);
        var Master = Object.getPrototypeOf(Object.getPrototypeOf(this));
        // since instance prototype is itself an instance
        var Owner = Master;
        while (Object.getOwnPropertyDescriptor(Owner, Name) == null) {
            Owner = Object.getPrototypeOf(Owner);
            if (Owner == null)
                throwError('NoSuchFunction: no prototype function called ' +
                    quoted(Name) + ' found');
        }
        return Owner[Name].apply(this, ArgList);
    }
    /**** CategoryGet ****/
    function CategoryGet(Name) {
        WAT.expectIdentifier('function name', Name);
        var Category = Object.getPrototypeOf(Object.getPrototypeOf(Object.getPrototypeOf(this))); // since instance prototype is itself an instance
        var Owner = Category, PropertyInfo;
        while ((PropertyInfo = Object.getOwnPropertyDescriptor(Owner, Name)) == null) {
            Owner = Object.getPrototypeOf(Owner);
            if (Owner == null)
                throwError('NoSuchFunction: no prototype function called ' +
                    quoted(Name) + ' found');
        }
        return PropertyInfo.get.call(this);
    }
    /**** MasterGet ****/
    function MasterGet(Name) {
        WAT.expectIdentifier('function name', Name);
        var Master = Object.getPrototypeOf(Object.getPrototypeOf(this));
        // since instance prototype is itself an instance
        var Owner = Master, PropertyInfo;
        while ((PropertyInfo = Object.getOwnPropertyDescriptor(Owner, Name)) == null) {
            Owner = Object.getPrototypeOf(Owner);
            if (Owner == null)
                throwError('NoSuchFunction: no prototype function called ' +
                    quoted(Name) + ' found');
        }
        return PropertyInfo.get.call(this);
    }
    /**** CategorySet ****/
    function CategorySet(Name, Value) {
        WAT.expectIdentifier('function name', Name);
        var Category = Object.getPrototypeOf(Object.getPrototypeOf(Object.getPrototypeOf(this))); // since instance prototype is itself an instance
        var Owner = Category, PropertyInfo;
        while ((PropertyInfo = Object.getOwnPropertyDescriptor(Owner, Name)) == null) {
            Owner = Object.getPrototypeOf(Owner);
            if (Owner == null)
                throwError('NoSuchFunction: no prototype function called ' +
                    quoted(Name) + ' found');
        }
        PropertyInfo.set.call(this, Value);
    }
    /**** MasterSet ****/
    function MasterSet(Name, Value) {
        WAT.expectIdentifier('function name', Name);
        var Master = Object.getPrototypeOf(Object.getPrototypeOf(this));
        // since instance prototype is itself an instance
        var Owner = Master, PropertyInfo;
        while ((PropertyInfo = Object.getOwnPropertyDescriptor(Owner, Name)) == null) {
            Owner = Object.getPrototypeOf(Owner);
            if (Owner == null)
                throwError('NoSuchFunction: no prototype function called ' +
                    quoted(Name) + ' found');
        }
        PropertyInfo.set.call(this, Value);
    }
    //----------------------------------------------------------------------------//
    //                      Container and Content Validation                      //
    //----------------------------------------------------------------------------//
    /**** validateAllPeers ****/
    function validateAllPeers() {
        $(document.body).find('.WAT').each(function () {
            var Candidate = $(this);
            switch (CategoryOfPeer(this)) {
                case 'Applet':
                    if (Candidate.parent().closest('.WAT').length > 0) {
                        Candidate.remove();
                    }
                    if (Candidate.children('.WAT.Card').length === 0) {
                        Candidate.append('<div class="WAT Card" style="visibility:visible"></div>');
                    }
                    else {
                        var visibleCardPeer_1;
                        Candidate.children('.WAT.Card').each(function () {
                            var CardPeer = $(this);
                            if ((CardPeer.css('display') === 'block') &&
                                (CardPeer.css('visibility') === 'visible')) {
                                if (visibleCardPeer_1 == null) {
                                    visibleCardPeer_1 = CardPeer;
                                }
                                else {
                                    CardPeer.css({ display: 'none', visibility: 'hidden' });
                                }
                            }
                        });
                        if (visibleCardPeer_1 == null) {
                            Candidate.children('.WAT.Card').first().css({
                                display: 'block', visibility: 'visible'
                            });
                        }
                    }
                    break;
                case 'Card':
                    if (!Candidate.parent().is('.WAT.Applet')) {
                        Candidate.remove();
                    }
                    break;
                case 'Compound':
                case 'Control':
                    if (!Candidate.parent().is('.WAT.Card') &&
                        !Candidate.parent().is('.WAT.Compound')) {
                        Candidate.remove();
                    }
                    break;
                default:
                    Candidate.remove();
            }
        });
    }
    /**** validateContentsOfPeer ****/
    function validateContentsOfPeer(Peer) {
        switch (CategoryOfPeer(Peer)) {
            case 'Applet':
                validateContentsOfAppletPeer(Peer);
                break;
            case 'Card':
            case 'Compound':
                validateContentsOfContainerPeer(Peer);
                break;
            case 'Control':
                validateContentsOfControlPeer(Peer);
                break;
        }
    }
    /**** validateContentsOfAppletPeer ****/
    function validateContentsOfAppletPeer(Peer) {
        var $Peer = $(Peer);
        $Peer.children().each(function () {
            var Candidate = $(this);
            if (Candidate.is('.WAT.Card')) {
                validateContentsOfContainerPeer(Candidate);
            }
            else {
                Candidate.remove();
            }
        });
        if ($Peer.children('.WAT.Card').length === 0) {
            $Peer.append('<div class="WAT Card" style="visibility:visible"></div>');
        }
        else {
            var visibleCardPeer_2;
            $Peer.children('.WAT.Card').each(function () {
                var CardPeer = $(this);
                if ((CardPeer.css('display') === 'block') &&
                    (CardPeer.css('visibility') === 'visible')) {
                    if (visibleCardPeer_2 == null) {
                        visibleCardPeer_2 = CardPeer;
                    }
                    else {
                        CardPeer.css({ display: 'none', visibility: 'hidden' });
                    }
                }
            });
            if (visibleCardPeer_2 == null) {
                $Peer.children('.WAT.Card').first().css({
                    display: 'block', visibility: 'visible'
                });
            }
        }
    }
    /**** validateContentsOfContainerPeer ****/
    function validateContentsOfContainerPeer(Peer) {
        $(Peer).children().each(function () {
            var Candidate = $(this);
            if (Candidate.is('.WAT.Compound,.WAT.Control')) {
                validateContentsOfControlPeer(Candidate);
            }
            else {
                Candidate.remove();
            }
        });
    }
    /**** validateContentsOfControlPeer ****/
    function validateContentsOfControlPeer(Peer) {
        $(Peer).children().each(function () {
            var Candidate = $(this);
            if (Candidate.hasClass('WAT')) {
                Candidate.remove();
            }
        });
    }
    //----------------------------------------------------------------------------//
    //                     Serialization and Deserialization                      //
    //----------------------------------------------------------------------------//
    /**** serialize/deserializeValueOfVisual ****/
    function serializeValueOfVisual(Visual) {
        var Peer = $(Visual.Peer);
        var Value = Visual.Value;
        if (Value == null) {
            Peer.removeAttr('wat-value');
        }
        else {
            var Serialization = void 0;
            try {
                Serialization = JSON.stringify(Value);
            }
            catch (Signal) {
                throwError('SerializationFailure: unable to serialize the value of visual ' +
                    quoted(Visual.Path));
            }
            Peer.attr('wat-value', Serialization);
        }
    }
    function deserializeValueOfVisual(Visual) {
        var Peer = $(Visual.Peer);
        var Serialization = Peer.attr('wat-value');
        if (Serialization == null) {
            Visual.Value = undefined;
        }
        else {
            var Value = void 0;
            try {
                Value = JSON.parse(Serialization);
            }
            catch (Signal) {
                throwError('DeserializationFailure: unable to deserialize the value of visual ' +
                    quoted(Visual.Path));
            }
            Visual.Value = Value;
        }
    }
    /**** serialize/deserializeStateOfVisual ****/
    function serializeStateOfVisual(Visual) {
        var Peer = $(Visual.Peer);
        var State = Visual.State;
        if (State == null) {
            Peer.removeAttr('wat-state');
        }
        else {
            var Serialization = void 0;
            try {
                Serialization = JSON.stringify(State);
            }
            catch (Signal) {
                throwError('SerializationFailure: unable to serialize the state of visual ' +
                    quoted(Visual.Path));
            }
            Peer.attr('wat-state', Serialization);
        }
    }
    function deserializeStateOfVisual(Visual) {
        var Peer = $(Visual.Peer);
        var Serialization = Peer.attr('wat-state');
        if (Serialization == null) {
            Visual.State = undefined;
        }
        else {
            var State = void 0;
            try {
                State = JSON.parse(Serialization);
            }
            catch (Signal) {
                throwError('DeserializationFailure: unable to deserialize the state of visual ' +
                    quoted(Visual.Path));
            }
            Visual.State = State;
        }
    }
    /**** SerializationOfVisual ****/
    function SerializationOfVisual(Visual) {
        var Peer = Visual.Peer;
        var Serialization;
        triggerRecursivelyInwards(Peer, 'before-serialization');
        Serialization = Peer.outerHTML;
        triggerRecursivelyOutwards(Peer, 'after-serialization');
        return Serialization;
    }
    /**** PeerDeserializedFrom ****/
    function PeerDeserializedFrom(Serialization) {
        var Peer = $(Serialization)[0];
        validateContentsOfPeer(Peer);
        updateUniqueIdsInPeer(Peer);
        return Peer;
    }
    /**** normalizedScript ****/
    function normalizedScript(Script) {
        return Script
            .replace(/^\s*\n/, '')
            .replace(/\n\s*$/, '\n');
    }
    /**** activeScriptOfVisual ****/
    function activeScriptOfVisual(Visual) {
        var Peer = $(Visual.Peer);
        return Peer.attr('wat-script');
    }
    function setActiveScriptOfVisual(Visual, newScript) {
        clearErrorInfoOfVisual(Visual); // set again when active Script is applied
        var Peer = $(Visual.Peer);
        if ((newScript == null) || StringIsEmpty(newScript)) {
            Peer.removeAttr('wat-script');
        }
        else {
            Peer.attr('wat-script', normalizedScript(newScript));
        }
    }
    /**** [set]PendingScriptOfVisual ****/
    function pendingScriptOfVisual(Visual) {
        var Peer = $(Visual.Peer);
        return Peer.attr('wat-pending-script');
    }
    function setPendingScriptOfVisual(Visual, newScript) {
        clearPendingScriptErrorOfVisual(Visual); // set again by "applyPendingScript"
        var Peer = $(Visual.Peer);
        if ((newScript == null) || StringIsEmpty(newScript) ||
            (normalizedScript(newScript) === activeScriptOfVisual(Visual))) {
            Peer.removeAttr('wat-pending-script');
        }
        else {
            Peer.attr('wat-pending-script', normalizedScript(newScript));
        }
    }
    /**** applyActiveScriptOfVisual - without events ****/
    function applyActiveScriptOfVisual(Visual) {
        //  clearErrorInfoOfVisual(Visual)                        // already done before
        var activeScript = activeScriptOfVisual(Visual);
        if (activeScript == null) {
            return;
        }
        var compiledScript;
        try {
            compiledScript = Function('WAT, on, reactive,$, superCall,superGet,superSet', activeScript);
        }
        catch (Signal) {
            setErrorInfoOfVisual(Visual, {
                Title: 'Compilation Error',
                shortMessage: 'Could not compile active script of visual',
                Reason: Signal,
                Applet: Visual.Applet,
                Sufferer: Visual, Property: 'Script'
            });
            console.log('activeScript compilation error', Signal);
            return;
        }
        //  releaseVisual(Visual)    // not necessary: visual has just been deserialized
        function on(Topic, secondArg, thirdArg) {
            WAT.expectName('event topic', Topic);
            var Anchor;
            if (Topic.charAt(0) === '#') {
                Anchor = document.body;
            }
            else {
                Anchor = Visual.Peer;
            }
            if (ValueIsString(secondArg)) {
                expectFunction('event handler', thirdArg);
                $(Anchor).on(Topic, secondArg, thirdArg);
            }
            else {
                expectFunction('event handler', secondArg);
                if (Topic.charAt(0) === '#') {
                    $(Anchor).on(Topic, secondArg);
                }
                else {
                    $(Anchor).on(Topic, function (Event) {
                        if (Event.target.id === uniqueIdOfVisual(Visual)) {
                            secondArg.apply(Event.target, arguments);
                        }
                    });
                }
            }
        }
        function Reactivity() {
            var ArgumentList = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                ArgumentList[_i] = arguments[_i];
            }
            ArgumentList.unshift(Visual);
            return ReactivityContextOfApplet(Visual.Applet)._.apply(
            // @ts-ignore don't worry about number of arguments
            null, ArgumentList // since number of arguments is important
            );
        }
        var superCall = MasterCall.bind(Visual);
        var superGet = MasterGet.bind(Visual);
        var superSet = MasterSet.bind(Visual);
        try {
            compiledScript.call(Visual, WAT, on, Reactivity, Reactivity, superCall, superGet, superSet);
        }
        catch (Signal) {
            setErrorInfoOfVisual(Visual, {
                Title: 'Execution Error',
                shortMessage: 'Could not execute active script of visual',
                Reason: Signal,
                Applet: Visual.Applet,
                Sufferer: Visual, Property: 'Script'
            });
            console.log('activeScript execution error', Signal);
        }
    }
    /**** applyPendingScriptOfVisual ****/
    function applyPendingScriptOfVisual(Visual) {
        //  clearErrorInfoOfVisual(Visual)                        // already done before
        var pendingScript = pendingScriptOfVisual(Visual); // normalized
        var activeScript = activeScriptOfVisual(Visual); // dto.
        if (activeScript === pendingScript) {
            return;
        }
        var Peer = $(Visual.Peer);
        if (pendingScript == null) {
            //    setPendingScriptOfVisual(Visual,null) // unnecessary - it's already "null"
            setActiveScriptOfVisual(Visual, null);
            triggerRecursivelyInwards(Visual.Peer, 'before-refresh');
            releaseVisual(Visual);
            triggerRecursivelyOutwards(Visual.Peer, 'after-refresh');
            //    clearErrorInfoOfVisual(Visual)   // already done by "activeScriptOfVisual"
        }
        else {
            clearPendingScriptErrorOfVisual(Visual);
            var compiledScript = void 0;
            try {
                compiledScript = Function('WAT, on, reactive,$, superCall,superGet,superSet', pendingScript);
            }
            catch (Signal) {
                setPendingScriptErrorOfVisual(Visual, {
                    Message: Signal.toString()
                });
                throw Signal;
            }
            triggerRecursivelyInwards(Visual.Peer, 'before-refresh');
            setPendingScriptOfVisual(Visual, null);
            setActiveScriptOfVisual(Visual, pendingScript);
            releaseVisual(Visual);
            function on(Topic, secondArg, thirdArg) {
                WAT.expectName('event topic', Topic);
                var Anchor;
                if (Topic.charAt(0) === '#') {
                    Anchor = document.body;
                }
                else {
                    Anchor = Visual.Peer;
                }
                if (ValueIsString(secondArg)) {
                    expectFunction('event handler', thirdArg);
                    $(Anchor).on(Topic, secondArg, thirdArg);
                }
                else {
                    expectFunction('event handler', secondArg);
                    if (Topic.charAt(0) === '#') {
                        $(Anchor).on(Topic, secondArg);
                    }
                    else {
                        $(Anchor).on(Topic, function (Event) {
                            if (Event.target.id === uniqueIdOfVisual(Visual)) {
                                secondArg.apply(Event.target, arguments);
                            }
                        });
                    }
                }
            }
            function Reactivity() {
                var ArgumentList = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    ArgumentList[_i] = arguments[_i];
                }
                ArgumentList.unshift(Visual);
                return ReactivityContextOfApplet(Visual.Applet)._.apply(
                // @ts-ignore don't worry about number of arguments
                null, ArgumentList // since number of arguments is important
                );
            }
            var superCall = MasterCall.bind(Visual);
            var superGet = MasterGet.bind(Visual);
            var superSet = MasterSet.bind(Visual);
            try {
                compiledScript.call(Visual, WAT, on, Reactivity, Reactivity, superCall, superGet, superSet);
            }
            catch (Signal) { // restore previously active script
                setPendingScriptErrorOfVisual(Visual, {
                    Message: Signal.toString()
                });
                setPendingScriptOfVisual(Visual, pendingScript);
                setActiveScriptOfVisual(Visual, activeScript);
                releaseVisual(Visual);
                applyActiveScriptOfVisual(Visual);
                throw Signal;
            }
            triggerRecursivelyOutwards(Visual.Peer, 'after-refresh');
        }
    }
    /**** [set]PendingScriptErrorOfVisual ****/
    function pendingScriptErrorOfVisual(Visual) {
        return $(Visual.Peer).data('wat-pending-script-error');
    }
    function setPendingScriptErrorOfVisual(Visual, newScriptError) {
        if (newScriptError == null) {
            $(Visual.Peer).data('wat-pending-script-error', null);
        }
        else {
            $(Visual.Peer).data('wat-pending-script-error', newScriptError);
        }
    }
    /**** clearPendingScriptErrorOfVisual ****/
    function clearPendingScriptErrorOfVisual(Visual) {
        setPendingScriptErrorOfVisual(Visual, undefined);
    }
    //----------------------------------------------------------------------------//
    //                             Geometry Handling                              //
    //----------------------------------------------------------------------------//
    /**** GeometryOfVisual ****/
    function GeometryOfVisual(Visual) {
        var Peer = Visual.Peer;
        return {
            x: Peer.offsetLeft, Width: Peer.offsetWidth,
            y: Peer.offsetTop, Height: Peer.offsetHeight // dto.
        };
    }
    /**** GeometryOfVisualOnPage - relative to <body> element ****/
    function GeometryOfVisualOnPage(Visual) {
        var boundingRect = Visual.Peer.getBoundingClientRect(); // incl. border
        return {
            x: boundingRect.left + window.scrollX - document.body.offsetLeft, Width: boundingRect.width,
            y: boundingRect.top + window.scrollY - document.body.offsetTop, Height: boundingRect.height
        };
    }
    /**** changeGeometryOfVisualTo ****/
    function changeGeometryOfVisualTo(Visual, x, y, Width, Height, Duration) {
        var StyleChanges = {};
        function changeStyles(additionalChanges) {
            Object.assign(StyleChanges, additionalChanges);
        }
        /**** compute horizontal geometry update ****/
        var Peer = $(Visual.Peer);
        var horizontalAnchors, oldLeft, oldWidth, oldRight;
        if ((x != null) || (Width != null)) {
            horizontalAnchors = horizontalAnchorsOfVisual(Visual);
            oldWidth = Math.round(Peer[0].offsetWidth);
        }
        if (x != null) {
            oldLeft = Math.round(Peer[0].offsetLeft);
            oldRight = (horizontalAnchors === 'left-width' ? NaN : Peer.parent()[0].clientWidth - oldLeft - oldWidth);
            x = Math.round(x);
            var dx = x - oldLeft;
            switch (horizontalAnchors) {
                case 'left-width':
                    changeStyles({ left: x + 'px' });
                    break;
                case 'width-right':
                    changeStyles({ right: (oldRight - dx) + 'px' });
                    break;
                case 'left-right':
                    changeStyles({ left: x + 'px', right: (oldRight - dx) + 'px' });
                    break;
            }
        }
        if (Width != null) {
            Width = Math.round(Width);
            if (horizontalAnchors === 'left-right') {
                oldRight = (StyleChanges.right != null ? parseInt(StyleChanges.right, 10) : Peer.parent()[0].clientWidth - oldLeft - oldWidth);
                changeStyles({ right: (oldRight - (Width - oldWidth)) + 'px' });
            }
            else {
                changeStyles({ width: Width + 'px' });
            }
        }
        /**** compute vertical geometry update ****/
        var verticalAnchors, oldTop, oldHeight, oldBottom;
        if ((y != null) || (Height != null)) {
            verticalAnchors = verticalAnchorsOfVisual(Visual);
            oldHeight = Math.round(Peer[0].offsetHeight);
        }
        if (y != null) {
            oldTop = Math.round(Peer[0].offsetTop);
            oldBottom = (verticalAnchors === 'top-height' ? NaN : Peer.parent()[0].clientHeight - oldTop - oldHeight);
            y = Math.round(y);
            var dy = y - oldTop;
            switch (verticalAnchors) {
                case 'top-height':
                    changeStyles({ top: y + 'px' });
                    break;
                case 'height-bottom':
                    changeStyles({ bottom: (oldBottom - dy) + 'px' });
                    break;
                case 'top-bottom':
                    changeStyles({ top: y + 'px', bottom: (oldBottom - dy) + 'px' });
                    break;
            }
        }
        if (Height != null) {
            Height = Math.round(Height);
            if (verticalAnchors === 'top-bottom') {
                oldBottom = (StyleChanges.bottom != null ? parseInt(StyleChanges.bottom, 10) : Peer.parent()[0].clientHeight - oldTop - oldHeight);
                changeStyles({ bottom: (oldBottom - (Height - oldHeight)) + 'px' });
            }
            else {
                changeStyles({ height: Height + 'px' });
            }
        }
        /**** now actually update the visual ****/
        if (!ObjectIsEmpty(StyleChanges)) {
            if (Duration == null) {
                Peer.css(StyleChanges);
            }
            else {
                Peer.css(StyleChanges, Duration);
            }
        }
    }
    /**** horizontalAnchorsOfVisual ****/
    function horizontalAnchorsOfVisual(Visual) {
        var Peer = $(Visual.Peer);
        var left = Peer[0].style.left || 'auto';
        var right = Peer[0].style.right || 'auto';
        var Width = Peer[0].style.width || 'auto';
        if (right === 'auto') {
            return 'left-width';
        }
        if (Width === 'auto') {
            return 'left-right';
        }
        if (left === 'auto') {
            return 'width-right';
        } // check this last
        console.error('could not determine horizontal anchors of given Visual\n' +
            'got left:' + left + ', right:' + right + ', width:' + Width);
        return 'left-width';
    }
    /**** horizontalOffsetsOfVisual ****/
    function horizontalOffsetsOfVisual(Visual) {
        var Peer = $(Visual.Peer);
        var left = Math.round(Peer[0].offsetLeft);
        var width = Math.round(Peer[0].offsetWidth);
        var right = Math.round(Peer.parent()[0].offsetWidth - left - width);
        switch (horizontalAnchorsOfVisual(Visual)) {
            case 'left-width': return [left, width];
            case 'width-right': return [width, right];
            case 'left-right': return [left, right];
        }
    }
    /**** changeHorizontalAnchorsOfVisualTo ****/
    function changeHorizontalAnchorsOfVisualTo(Visual, newAnchors) {
        var oldAnchors = horizontalAnchorsOfVisual(Visual);
        if (ValuesAreEqual(oldAnchors, newAnchors)) {
            return;
        }
        var Peer = $(Visual.Peer);
        var left = Math.round(Peer[0].offsetLeft);
        var Width = Math.round(Peer[0].offsetWidth);
        var right = Math.round(Peer.parent()[0].offsetWidth - left - Width);
        var StyleSet;
        switch (newAnchors) {
            case 'left-width':
                StyleSet = { left: left + 'px', width: Width + 'px', right: 'auto' };
                break;
            case 'width-right':
                StyleSet = { left: 'auto', width: Width + 'px', right: right + 'px' };
                break;
            case 'left-right':
                StyleSet = { left: left + 'px', width: 'auto', right: right + 'px' };
                break;
        }
        Peer.css(StyleSet);
    }
    /**** changeHorizontalOffsetsOfVisualTo ****/
    function changeHorizontalOffsetsOfVisualTo(Visual, newOffsets) {
        var Peer = $(Visual.Peer);
        switch (horizontalAnchorsOfVisual(Visual)) {
            case 'left-width':
                if (newOffsets[0] != null) {
                    Peer.css('left', Math.round(newOffsets[0]) + 'px');
                }
                if (newOffsets[1] != null) {
                    Peer.css('width', Math.round(newOffsets[1]) + 'px');
                }
                break;
            case 'width-right':
                if (newOffsets[0] != null) {
                    Peer.css('width', Math.round(newOffsets[0]) + 'px');
                }
                if (newOffsets[1] != null) {
                    Peer.css('right', Math.round(newOffsets[1]) + 'px');
                }
                break;
            case 'left-right':
                if (newOffsets[0] != null) {
                    Peer.css('left', Math.round(newOffsets[0]) + 'px');
                }
                if (newOffsets[1] != null) {
                    Peer.css('right', Math.round(newOffsets[1]) + 'px');
                }
        }
    }
    /**** verticalAnchorsOfVisual ****/
    function verticalAnchorsOfVisual(Visual) {
        var Peer = $(Visual.Peer);
        var top = Peer[0].style.top || 'auto';
        var bottom = Peer[0].style.bottom || 'auto';
        var Height = Peer[0].style.height || 'auto';
        if (bottom === 'auto') {
            return 'top-height';
        }
        if (Height === 'auto') {
            return 'top-bottom';
        }
        if (top === 'auto') {
            return 'height-bottom';
        } // check this last
        console.error('could not determine vertical anchors of given Visual\n' +
            'got top:' + top + ', bottom:' + bottom + ', height:' + Height);
        return 'top-height';
    }
    /**** verticalOffsetsOfVisual ****/
    function verticalOffsetsOfVisual(Visual) {
        var Peer = $(Visual.Peer);
        var top = Math.round(Peer[0].offsetTop);
        var height = Math.round(Peer[0].offsetHeight);
        var bottom = Math.round(Peer.parent()[0].offsetHeight - top - height);
        switch (verticalAnchorsOfVisual(Visual)) {
            case 'top-height': return [top, height];
            case 'height-bottom': return [height, bottom];
            case 'top-bottom': return [top, bottom];
        }
    }
    /**** changeVerticalAnchorsOfVisualTo ****/
    function changeVerticalAnchorsOfVisualTo(Visual, newAnchors) {
        var oldAnchors = verticalAnchorsOfVisual(Visual);
        if (ValuesAreEqual(oldAnchors, newAnchors)) {
            return;
        }
        var Peer = $(Visual.Peer);
        var top = Math.round(Peer[0].offsetTop);
        var Height = Math.round(Peer[0].offsetHeight);
        var bottom = Math.round(Peer.parent()[0].offsetHeight - top - Height);
        var StyleSet;
        switch (newAnchors) {
            case 'top-height':
                StyleSet = { top: top + 'px', height: Height + 'px', bottom: 'auto' };
                break;
            case 'height-bottom':
                StyleSet = { top: 'auto', height: Height + 'px', bottom: bottom + 'px' };
                break;
            case 'top-bottom':
                StyleSet = { top: top + 'px', height: 'auto', bottom: bottom + 'px' };
                break;
        }
        Peer.css(StyleSet);
    }
    /**** changeVerticalOffsetsOfVisualTo ****/
    function changeVerticalOffsetsOfVisualTo(Visual, newOffsets) {
        var Peer = $(Visual.Peer);
        switch (verticalAnchorsOfVisual(Visual)) {
            case 'top-height':
                if (newOffsets[0] != null) {
                    Peer.css('top', Math.round(newOffsets[0]) + 'px');
                }
                if (newOffsets[1] != null) {
                    Peer.css('height', Math.round(newOffsets[1]) + 'px');
                }
                break;
            case 'height-bottom':
                if (newOffsets[0] != null) {
                    Peer.css('height', Math.round(newOffsets[0]) + 'px');
                }
                if (newOffsets[1] != null) {
                    Peer.css('bottom', Math.round(newOffsets[1]) + 'px');
                }
                break;
            case 'top-bottom':
                if (newOffsets[0] != null) {
                    Peer.css('top', Math.round(newOffsets[0]) + 'px');
                }
                if (newOffsets[1] != null) {
                    Peer.css('bottom', Math.round(newOffsets[1]) + 'px');
                }
        }
    }
    //----------------------------------------------------------------------------//
    //                               Event Handling                               //
    //----------------------------------------------------------------------------//
    /**** triggerRecursivelyInwards ****/
    function triggerRecursivelyInwards(VisualPeer, EventType, extraParameters) {
        var Peer = $(VisualPeer);
        Peer.trigger(EventType, extraParameters);
        Peer.children('.WAT.Card,.WAT.Compound,.WAT.Control').each(function () {
            triggerRecursivelyInwards(this, EventType, extraParameters);
        });
    }
    /**** triggerRecursivelyOutwards ****/
    function triggerRecursivelyOutwards(VisualPeer, EventType, extraParameters) {
        var Peer = $(VisualPeer);
        Peer.children('.WAT.Card,.WAT.Compound,.WAT.Control').each(function () {
            triggerRecursivelyOutwards(this, EventType, extraParameters);
        });
        Peer.trigger(EventType, extraParameters);
    }
    /**** ReactivityContextForApplet ****/
    function ReactivityContextForApplet(Applet) {
        var FunctionKeySet; // every function is associated with a unique key
        var reactiveVariableSet; // set of reactive variables & their current values
        var reactiveVisualSet; // set of visuals bound to reactive variables
        var FunctionStack; // (reversed) stack of currently running reactive funct.s
        var FunctionVarSet; // set of reactive var.s already known for a given fct.
        var FunctionVarCount; // # of reactive var.s already known for a given fct.
        var FunctionVarList; // list of reactive var.s to be passed upon fct. call
        var VarFunctionSet; // set of functions interested in a given reactive var.
        var recalculating; // are we in the middle of a recalculation?
        var RecalculationError; // last error that occurred during recalculation
        var activeVarSet; // set of variables handled during this recalculation
        var pendingFunctionSet; // set of reactive functions yet to be (re)calculated
        var pendingFunctionList; // sorted list of reactive funct.s to be calculated
        /**** reset ****/
        function reset() {
            FunctionKeySet = new WeakMap();
            reactiveVariableSet = Object.create(null);
            reactiveVisualSet = Object.create(null);
            FunctionStack = [];
            FunctionVarSet = new WeakMap();
            FunctionVarCount = new WeakMap();
            FunctionVarList = new WeakMap();
            VarFunctionSet = Object.create(null);
            resetCalculation();
        }
        /**** resetCalculation - done AFTER any recalculation ****/
        function resetCalculation() {
            recalculating = false;
            //  RecalculationError  = undefined                            // not in here!
            activeVarSet = Object.create(null);
            pendingFunctionSet = Object.create(null);
            pendingFunctionList = [];
        }
        /**** changedVariables ****/
        function changedVariables() {
            return Object.assign(Object.create(null), reactiveVariableSet);
        }
        /**** getReactiveVariable ****/
        function getReactiveVariable(VariableName) {
            if (FunctionStack.length > 0) {
                registerFunctionsForVariable(FunctionStack, VariableName);
            }
            return reactiveVariableSet[VariableName.toLowerCase()];
        }
        /**** setReactiveVariable ****/
        function setReactiveVariable(VariableName, newValue, definitely) {
            if (definitely === void 0) { definitely = false; }
            var normalizedName = VariableName.toLowerCase();
            var oldValue = reactiveVariableSet[normalizedName];
            var equalValues = ValuesAreEqual(oldValue, newValue);
            if (equalValues && !definitely) {
                return;
            }
            if (normalizedName in activeVarSet) {
                if (equalValues) {
                    return;
                }
                else {
                    throw new Error('CircularDependency: trigger variable "' + VariableName + '" ' +
                        'has been changed during an ongoing recalculation');
                }
            }
            reactiveVariableSet[normalizedName] = newValue; // before Ctrl.Value is set!
            activeVarSet[normalizedName] = newValue;
            var associatedVisual = reactiveVisualSet[normalizedName];
            if (associatedVisual != null) {
                associatedVisual.Value = newValue;
            }
            extendCalculationBy(normalizedName);
            if (!recalculating) {
                recalculate();
                if (RecalculationError != null) {
                    throw RecalculationError;
                }
            }
        }
        /**** clearReactiveVariable ****/
        function clearReactiveVariable(VariableName) {
            delete reactiveVariableSet[VariableName.toLowerCase()];
        }
        /**** registerReactiveFunctionOfVisual ****/
        function registerReactiveFunctionOfVisual(Visual, Handler, VarNames, toBeInvokedOnRegistration) {
            if (toBeInvokedOnRegistration == null) {
                toBeInvokedOnRegistration = (VarNames == null);
            }
            if (VarNames == null) {
                VarNames = '';
            }
            var FunctionKey = FunctionKeySet.get(Handler);
            if (FunctionKey == null) {
                FunctionKey = newFunctionKey();
                FunctionKeySet.set(Handler, FunctionKey);
                var $Peer = $(Visual.Peer);
                var reactiveFunctionList = $Peer.data('wat-reactive-function-list');
                if (reactiveFunctionList == null) {
                    $Peer.data('wat-reactive-function-list', [Handler]);
                }
                else {
                    reactiveFunctionList.push(Handler);
                }
                FunctionVarSet.set(Handler, Object.create(null));
                FunctionVarCount.set(Handler, 0);
                VarNames = VarNames.trim().replace(/\s+/g, ' ');
                if (VarNames !== '') {
                    var VarNameList = VarNames.split(' ');
                    for (var i = 0, l = VarNameList.length; i < l; i++) {
                        registerFunctionForVariable(Handler, VarNameList[i]);
                    }
                    if (!toBeInvokedOnRegistration) {
                        var VarSet = FunctionVarSet.get(Handler); // already normalized
                        var VarList = [];
                        for (var VarName in VarSet) {
                            VarList.push(VarName);
                        }
                        FunctionVarList.set(Handler, VarList);
                        return;
                    }
                }
            }
            if (toBeInvokedOnRegistration) {
                calculateReactiveFunction(Handler);
            }
        }
        /**** unregisterReactiveFunctionOfVisual ****/
        function unregisterReactiveFunctionOfVisual(Visual, Handler) {
            var $Peer = $(Visual.Peer);
            var reactiveFunctionList = $Peer.data('wat-reactive-function-list');
            if (reactiveFunctionList != null) {
                var Index = reactiveFunctionList.indexOf(Handler);
                if (Index >= 0) {
                    reactiveFunctionList.splice(Index, 1);
                }
            }
            var FunctionKey = FunctionKeySet.get(Handler);
            var VarSet = FunctionVarSet.get(Handler); // already normalized
            for (var VarName in VarSet) {
                var FunctionSet = VarFunctionSet[VarName];
                delete FunctionSet[FunctionKey];
                if (ObjectIsEmpty(FunctionSet)) {
                    delete VarFunctionSet[VarName];
                }
            }
        }
        /**** unregisterReactiveFunctionsOfVisual ****/
        function unregisterReactiveFunctionsOfVisual(Visual) {
            var $Peer = $(Visual.Peer);
            var reactiveFunctionList = $Peer.data('wat-reactive-function-list');
            if (reactiveFunctionList != null) {
                for (var i = 0, l = reactiveFunctionList.length; i < l; i++) {
                    unregisterReactiveFunctionOfVisual(Visual, reactiveFunctionList[i] // this is not a typo!
                    );
                }
            }
        }
        /**** registerFunctionForVariable ****/
        function registerFunctionForVariable(Handler, VarName) {
            var normalizedName = VarName.toLowerCase();
            var VarSet = FunctionVarSet.get(Handler); // reference, not copy
            if (!(normalizedName in VarSet)) {
                VarSet[normalizedName] = true;
                FunctionVarCount.set(Handler, FunctionVarCount.get(Handler) + 1);
                var FunctionSet = VarFunctionSet[normalizedName];
                if (FunctionSet == null) {
                    FunctionSet = VarFunctionSet[normalizedName] = Object.create(null);
                }
                var FunctionKey = FunctionKeySet.get(Handler);
                FunctionSet[FunctionKey] = Handler;
            }
        }
        /**** registerFunctionsForVariable ****/
        function registerFunctionsForVariable(HandlerList, VarName) {
            for (var i = 0, l = HandlerList.length; i < l; i++) {
                registerFunctionForVariable(HandlerList[i], VarName);
            }
        }
        /**** extendCalculationBy ****/
        function extendCalculationBy(VarName) {
            var normalizedName = VarName.toLowerCase();
            var FunctionSet = VarFunctionSet[normalizedName];
            if (FunctionSet == null) {
                return;
            }
            var FunctionSetHasChanged = false;
            for (var FunctionKey in FunctionSet) {
                if (!(FunctionKey in pendingFunctionSet)) {
                    FunctionSetHasChanged = true;
                    pendingFunctionSet[FunctionKey] = FunctionSet[FunctionKey];
                }
            }
            if (!FunctionSetHasChanged) {
                return;
            }
            pendingFunctionList = [];
            for (var FunctionKey in pendingFunctionSet) {
                pendingFunctionList.push(FunctionKey);
            }
            pendingFunctionList.sort(function (FunctionKey_A, FunctionKey_B) {
                var VarCount_A = FunctionVarCount.get(pendingFunctionSet[FunctionKey_A]);
                var VarCount_B = FunctionVarCount.get(pendingFunctionSet[FunctionKey_B]);
                switch (true) {
                    case VarCount_A < VarCount_B: return -1;
                    case VarCount_A === VarCount_B: return 0;
                    default: return 1;
                }
            });
        }
        /**** recalculate ****/
        function recalculate() {
            recalculating = true;
            RecalculationError = undefined;
            while (pendingFunctionList.length > 0) {
                var FunctionKey = pendingFunctionList.shift();
                var Handler = pendingFunctionSet[FunctionKey];
                delete pendingFunctionSet[FunctionKey];
                try {
                    calculateReactiveFunction(Handler);
                }
                catch (Signal) {
                    console.error('error during automatic recalculation of reactive functions', Signal);
                    RecalculationError = Signal;
                }
            }
            resetCalculation(); // also sets recalculating = false
        }
        /**** calculateReactiveFunction ****/
        function calculateReactiveFunction(Handler) {
            var reactiveVarSet;
            var VarList = FunctionVarList.get(Handler); // already normalized
            if (VarList != null) {
                reactiveVarSet = Object.create(null);
                for (var i = 0, l = VarList.length; i < l; i++) {
                    var VarName = VarList[i];
                    reactiveVarSet[VarName] = reactiveVariableSet[VarName];
                }
            }
            FunctionStack.unshift(Handler);
            try {
                Handler(reactiveVarSet);
                FunctionStack.shift();
            }
            catch (Signal) {
                FunctionStack.shift();
                throw Signal;
            }
        }
        function _(Visual, firstArg, secondArg, thirdArg) {
            switch (arguments.length - 1) {
                case 0:
                    throwError('MissingArgument: reactive variable name or function expected');
                case 1:
                    if (ValueIsString(firstArg)) {
                        return getReactiveVariable(firstArg);
                    }
                    if (ValueIsFunction(firstArg)) {
                        return registerReactiveFunctionOfVisual(Visual, firstArg);
                    }
                    break;
                case 2:
                    if (ValueIsString(firstArg)) {
                        return setReactiveVariable(firstArg, secondArg, false);
                    }
                    if (ValueIsFunction(firstArg)) {
                        if (ValueIsBoolean(secondArg)) {
                            return (secondArg == true
                                ? registerReactiveFunctionOfVisual(Visual, firstArg)
                                : unregisterReactiveFunctionOfVisual(Visual, firstArg));
                        }
                        if (ValueIsString(secondArg)) {
                            return registerReactiveFunctionOfVisual(Visual, firstArg, secondArg, false);
                        }
                    }
                    break;
                case 3:
                    if (ValueIsString(firstArg) && ValueIsBoolean(thirdArg)) {
                        return setReactiveVariable(firstArg, secondArg, thirdArg);
                    }
                    if (ValueIsFunction(firstArg) && ValueIsString(secondArg) && ValueIsBoolean(thirdArg)) {
                        return registerReactiveFunctionOfVisual(Visual, firstArg, secondArg, thirdArg);
                    }
            }
            throwError('InvalidArguments: variable name (with opt. value) or function ' +
                '(with opt. variable names) expected');
        }
        reset();
        return {
            reactiveVariableSet: reactiveVariableSet,
            reactiveVisualSet: reactiveVisualSet,
            _: _,
            setReactiveVariable: setReactiveVariable,
            clearReactiveVariable: clearReactiveVariable,
            unregisterReactiveFunctionsOfVisual: unregisterReactiveFunctionsOfVisual
        };
    }
    /**** ReactivityContextOfApplet ****/
    function ReactivityContextOfApplet(Applet) {
        return $(Applet.Peer).data('wat-reactivity-context');
    }
    /**** reactiveVariablesOfApplet - with normalized variable names ****/
    function reactiveVariablesOfApplet(Applet) {
        var Result = [];
        var reactiveVariableSet = ReactivityContextOfApplet(Applet).reactiveVariableSet;
        for (var Identifier in reactiveVariableSet) {
            Result.push(Identifier);
        }
        return Result;
    }
    /**** VisualInAppletWithReactiveVariable ****/
    function VisualInAppletWithReactiveVariable(Applet, Identifier) {
        var ReactivityContext = ReactivityContextOfApplet(Applet);
        return ReactivityContext.reactiveVisualSet[Identifier.toLowerCase()];
    }
    /**** removeReactiveVariablesFromContainer ****/
    function removeReactiveVariablesFromContainer(Container) {
        Container.Components.forEach(function (Component) {
            Component.reactiveVariable = undefined;
            if (ValueIsCompound(Component)) {
                removeReactiveVariablesFromContainer(Component);
            }
        });
    }
    /**** newFunctionKey ****/
    var KeyCounter = 0;
    function newFunctionKey() {
        KeyCounter += 1;
        return 'BRE-' + KeyCounter;
    }
    $(function () {
        $(document).on('value-changed', '.WAT', function (Event, newValue) {
            if (Event.target !== this) {
                return;
            }
            var Visual = VisualOfElement(this);
            if (Visual == null) {
                return;
            }
            var reactiveVariable = Visual.reactiveVariable;
            if (reactiveVariable != null) {
                console.log('reactiveVariable', reactiveVariable, ' = ', newValue);
                ReactivityContextOfApplet(Visual.Applet).setReactiveVariable(reactiveVariable, newValue);
            }
        });
    });
    /**** [set]ErrorInfoOfVisual ****/
    function ErrorInfoOfVisual(Visual) {
        return $(Visual.Peer).data('wat-error-info');
    }
    function setErrorInfoOfVisual(Visual, newErrorInfo) {
        var Peer = $(Visual.Peer);
        if (newErrorInfo == null) {
            if (Peer.data('wat-error-info') != null) {
                Peer.data('wat-error-info', null);
                Peer.children('.WAT-ErrorIndicator').remove();
            }
        }
        else {
            if (Peer.data('wat-error-info') == null) { // keep first error set
                Peer.data('wat-error-info', newErrorInfo);
                Peer.children('.WAT-ErrorIndicator').remove();
                Peer.append('<div class="WAT-ErrorIndicator"></div>');
            }
        }
    }
    /**** clearErrorInfoOfVisual ****/
    function clearErrorInfoOfVisual(Visual) {
        setErrorInfoOfVisual(Visual, undefined);
    }
    /**** install Event Handler for Error Indicators ****/
    function installEventHandlerForErrorIndicators() {
        $(document).off('click', '.WAT-ErrorIndicator');
        $(document).on('click', '.WAT-ErrorIndicator', function (Event) {
            var ErrorIndicator = $(Event.target);
            var affectedVisual = VisualWithElement(ErrorIndicator);
            if (affectedVisual == null) {
                alert('WAT Error\n\nCould not find Visual with this Error Indicator');
                return;
            }
            var ErrorInfo = ErrorInfoOfVisual(affectedVisual);
            if (ErrorInfo != null) {
                if (Designer != null) {
                    if (window.confirm(ErrorInfo.Title + '\n\n' +
                        (ErrorInfo.longMessage || ErrorInfo.shortMessage) +
                        (ErrorInfo.Reason != null ? '\n\nReason:\n' + ErrorInfo.Reason : '') +
                        '\n\nDo you want to proceed to the Designer?')) {
                        Designer.startDesigning(ErrorInfo.Sufferer, ErrorInfo.Property);
                    }
                }
                else {
                    window.alert(ErrorInfo.Title + '\n\n' +
                        (ErrorInfo.longMessage || ErrorInfo.shortMessage) +
                        (ErrorInfo.Reason != null ? '\n\nReason:\n' + ErrorInfo.Reason : ''));
                }
            }
        });
    }
    /**** VisualOfElement ****/
    function VisualOfElement(Element) {
        return $(Element).prop('WAT-Visual');
    }
    WAT.VisualOfElement = VisualOfElement;
    /**** VisualWithElement ****/
    function VisualWithElement(Element) {
        return $(Element).closest('.WAT').prop('WAT-Visual');
    }
    WAT.VisualWithElement = VisualWithElement;
    /**** [build]VisualFromPeer - without events ****/
    function VisualFromPeer(Peer, recursively) {
        var $Peer = $(Peer);
        var Category = CategoryOfPeer(Peer);
        var Master = $Peer.attr('wat-master') || 'plain' + Category;
        var Visual, MasterInfo;
        if (Master.toLowerCase() in MasterRegistry) {
            MasterInfo = MasterRegistry[Master.toLowerCase()];
            Visual = Object.create(MasterInfo.Prototype);
            if (MasterInfo.Classes != null) {
                MasterInfo.Classes.split(' ').forEach(function (Class) { $Peer.addClass(Class); });
            }
        }
        else {
            MasterInfo = MasterRegistry[('plain' + Category).toLowerCase()];
            Visual = Object.create(MasterInfo.Prototype);
            setErrorInfoOfVisual(Visual, {
                Title: 'Unknown Master',
                shortMessage: 'Unknown master "' + Master + '"',
                Applet: VisualOfElement($Peer.closest('.WAT.Applet')[0]),
                Sufferer: Visual
            });
        }
        Visual['Peer'] = Peer;
        $Peer.prop('WAT-Visual', Visual);
        MasterInfo.Initializer.call(Visual);
        if (Category === 'Applet') {
            $Peer.data('wat-reactivity-context', ReactivityContextForApplet(Visual));
            //      $Peer.data('wat-prominent-visual-registry',Object.create(null))
        }
        var reactiveVariable = $Peer.attr('wat-reactive-variable');
        if (ValueIsIdentifier(reactiveVariable)) {
            var Applet = VisualOfElement($Peer.closest('.WAT.Applet')[0]);
            var ReactivityContext = ReactivityContextOfApplet(Applet);
            var normalizedName = reactiveVariable.toLowerCase();
            if (normalizedName in ReactivityContext.reactiveVariableSet) {
                $Peer.removeAttr('wat-reactive-variable');
                setErrorInfoOfVisual(Visual, {
                    Title: 'Already used Reactive Variable',
                    shortMessage: 'Reactive variable name "' + reactiveVariable + '" is already used',
                    Applet: Applet,
                    Sufferer: Visual, Property: 'reactiveVariable'
                });
            }
            ReactivityContext.setReactiveVariable(normalizedName, Visual.Value);
        }
        applyActiveScriptOfVisual(Visual);
        if (recursively != null) {
            switch (Category) {
                case 'Applet':
                    $Peer.children('.WAT.Card').each(function () {
                        buildVisualFromPeer(this, recursively);
                    });
                    break;
                case 'Card':
                case 'Compound':
                    $Peer.children('.WAT.Compound,.WAT.Control').each(function () {
                        buildVisualFromPeer(this, recursively);
                    });
                    break;
                //        case 'Card':
                //        break
            }
        }
        return Visual;
    }
    var buildVisualFromPeer = VisualFromPeer;
    /**** releaseVisual ****/
    function releaseVisual(Visual) {
        ReactivityContextOfApplet(Visual.Applet).unregisterReactiveFunctionsOfVisual(Visual);
        $(Visual.Peer).off();
        Object.getOwnPropertyNames(Visual).forEach(function (Name) {
            if (Name !== 'Peer') {
                delete Visual[Name];
            }
        });
    }
    /**** applyMixin ****/
    function applyMixinTo(Mixin, TargetClass) {
        Object.getOwnPropertyNames(Mixin.prototype).forEach(function (Name) {
            Object.defineProperty(TargetClass.prototype, Name, Object.getOwnPropertyDescriptor(Mixin.prototype, Name) || Object.create(null));
        });
    }
    //----------------------------------------------------------------------------//
    //                                 WAT_Visual                                 //
    //----------------------------------------------------------------------------//
    var WAT_Visual = /** @class */ (function () {
        function WAT_Visual() {
        }
        Object.defineProperty(WAT_Visual.prototype, "isAttached", {
            /**** isAttached ****/
            get: function () {
                return document.body.contains(this.Peer);
            },
            set: function (_) { throwReadOnlyError('isAttached'); },
            enumerable: false,
            configurable: true
        });
        /**** mustBeAttached ****/
        WAT_Visual.prototype.mustBeAttached = function () {
            if (!this.isAttached) {
                throwError('NotAttached: the given visual is not part of a web document');
            }
        };
        Object.defineProperty(WAT_Visual.prototype, "uniqueId", {
            /**** uniqueId ****/
            get: function () { return uniqueIdOfVisual(this); },
            set: function (_) { throwReadOnlyError('uniqueId'); },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Visual.prototype, "Category", {
            /**** Category ****/
            get: function () { return CategoryOfVisual(this); },
            set: function (_) { throwReadOnlyError('Category'); },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Visual.prototype, "Master", {
            /**** Master ****/
            get: function () { return MasterOfVisual(this); },
            set: function (_) { throwReadOnlyError('Master'); },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Visual.prototype, "Name", {
            /**** Name ****/
            get: function () {
                var Candidate = $(this.Peer).attr('wat-name');
                return ValueIsName(Candidate) ? Candidate : undefined;
            },
            set: function (newName) {
                WAT.allowName('visual name', newName);
                if (newName == null) {
                    $(this.Peer).removeAttr('wat-name');
                }
                else {
                    $(this.Peer).attr('wat-name', newName);
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Visual.prototype, "Applet", {
            /**** Applet ****/
            get: function () {
                return VisualOfElement($(this.Peer).closest('.WAT.Applet')[0]);
            },
            set: function (_) { throwReadOnlyError('Applet'); },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Visual.prototype, "Card", {
            /**** Card ****/
            get: function () {
                return VisualOfElement($(this.Peer).closest('.WAT.Card')[0]);
            },
            set: function (_) { throwReadOnlyError('Card'); },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Visual.prototype, "Classes", {
            /**** Classes ****/
            get: function () {
                return $(this.Peer).attr('class');
            },
            set: function (newClasses) {
                expectTextline('CSS class string', newClasses);
                var newClassList = newClasses.split(' ');
                var MasterRecord = MasterRegistry[MasterOfVisual(this).toLowerCase()];
                var requiredClasses = (MasterRecord == null
                    ? 'WAT ' + MasterRecord.Category
                    : MasterRecord.Classes);
                var requiredClassList = requiredClasses.split(' ');
                for (var i = requiredClassList.length - 1; i >= 0; i--) {
                    var requiredClass = requiredClassList[i];
                    var requiredClassIndex = newClassList.indexOf(requiredClass);
                    if (requiredClassIndex >= 0) {
                        newClassList.splice(requiredClassIndex, 1);
                    }
                    newClassList.unshift(requiredClass);
                }
                $(this.Peer).attr('class', newClassList.join(' '));
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Visual.prototype, "ErrorInfo", {
            /**** ErrorInfo ****/
            get: function () {
                var ErrorInfo = ErrorInfoOfVisual(this);
                return (ErrorInfo == null
                    ? undefined
                    : Object.assign({}, ErrorInfo));
            },
            set: function (_) { throwReadOnlyError('ErrorInfo'); },
            enumerable: false,
            configurable: true
        });
        /**** clearErrorInfo ****/
        WAT_Visual.prototype.clearErrorInfo = function () {
            clearErrorInfoOfVisual(this);
        };
        Object.defineProperty(WAT_Visual.prototype, "activeScript", {
            /**** activeScript ****/
            get: function () {
                return activeScriptOfVisual(this);
            },
            set: function (_) { throwReadOnlyError('activeScript'); },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Visual.prototype, "pendingScript", {
            /**** pendingScript ****/
            get: function () {
                return pendingScriptOfVisual(this);
            },
            set: function (newScript) {
                allowText('script', newScript);
                setPendingScriptOfVisual(this, newScript);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Visual.prototype, "Script", {
            /**** Script ****/
            get: function () {
                return pendingScriptOfVisual(this) || activeScriptOfVisual(this);
            },
            set: function (newScript) {
                allowText('script', newScript);
                setPendingScriptOfVisual(this, newScript);
            },
            enumerable: false,
            configurable: true
        });
        /**** applyPendingScript ****/
        WAT_Visual.prototype.applyPendingScript = function () {
            applyPendingScriptOfVisual(this);
        };
        Object.defineProperty(WAT_Visual.prototype, "pendingScriptError", {
            /**** pendingScriptError ****/
            get: function () {
                var Error = pendingScriptErrorOfVisual(this);
                return (Error == null
                    ? undefined
                    : Object.assign({}, Error));
            },
            set: function (_) {
                throwReadOnlyError('pendingScriptError');
            },
            enumerable: false,
            configurable: true
        });
        /**** clearPendingScriptError ****/
        WAT_Visual.prototype.clearPendingScriptError = function () {
            clearPendingScriptErrorOfVisual(this);
        };
        Object.defineProperty(WAT_Visual.prototype, "Visibility", {
            /**** Visibility ****/
            get: function () {
                var Peer = $(this.Peer);
                return ((Peer.css('display') !== 'none') &&
                    (Peer.css('visibility') !== 'hidden'));
            },
            set: function (newVisibility) {
                expectBoolean('visibility setting', newVisibility);
                if (newVisibility === this.Visibility) {
                    return;
                }
                var Peer = $(this.Peer);
                Peer.css({
                    display: 'block',
                    visibility: (newVisibility == true ? 'visible' : 'hidden')
                });
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Visual.prototype, "isVisible", {
            /**** isVisible ****/
            get: function () { return this.Visibility; },
            set: function (newVisibility) { this.Visibility = newVisibility; },
            enumerable: false,
            configurable: true
        });
        /**** show/hide ****/
        WAT_Visual.prototype.show = function () { this.Visibility = true; };
        WAT_Visual.prototype.hide = function () { this.Visibility = false; };
        Object.defineProperty(WAT_Visual.prototype, "Enabling", {
            /**** Enabling ****/
            get: function () {
                var Peer = $(this.Peer);
                return !Peer.attr('disabled');
            },
            set: function (newEnabling) {
                expectBoolean('enabling setting', newEnabling);
                if (newEnabling == true) {
                    $(this.Peer).removeAttr('disabled');
                }
                else {
                    $(this.Peer).attr('disabled', 'disabled');
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Visual.prototype, "isEnabled", {
            /**** isEnabled ****/
            get: function () { return this.Enabling; },
            set: function (newEnabling) { this.Enabling = newEnabling; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Visual.prototype, "isDisabled", {
            /**** isDisabled ****/
            get: function () { return !this.Enabling; },
            set: function (newDisabling) { this.Enabling = !newDisabling; },
            enumerable: false,
            configurable: true
        });
        /**** enable/disable ****/
        WAT_Visual.prototype.enable = function () { this.Enabling = true; };
        WAT_Visual.prototype.disable = function () { this.Enabling = false; };
        Object.defineProperty(WAT_Visual.prototype, "minWidth", {
            /**** minWidth ****/
            get: function () {
                return parseInt($(this.Peer).css('min-width'), 10);
            },
            set: function (newMinWidth) {
                WAT.allowDimension('minimal width', newMinWidth);
                var Peer = $(this.Peer);
                if (newMinWidth == null) {
                    Peer.css('min-width', '');
                }
                else {
                    Peer.css('min-width', Math.round(newMinWidth) + 'px');
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Visual.prototype, "maxWidth", {
            /**** maxWidth ****/
            get: function () {
                var maxWidth = $(this.Peer).css('max-width');
                return (maxWidth === 'none' ? Infinity : parseInt(maxWidth, 10));
            },
            set: function (newMaxWidth) {
                WAT.allowDimension('maximal width', newMaxWidth);
                var Peer = $(this.Peer);
                if (newMaxWidth == null) {
                    Peer.css('max-width', '');
                }
                else {
                    if (newMaxWidth === Infinity) {
                        Peer.css('max-width', 'none');
                    }
                    else {
                        Peer.css('max-width', Math.round(newMaxWidth) + 'px');
                    }
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Visual.prototype, "minHeight", {
            /**** minHeight ****/
            get: function () {
                return parseInt($(this.Peer).css('min-height'), 10);
            },
            set: function (newMinHeight) {
                WAT.allowDimension('minimal height', newMinHeight);
                var Peer = $(this.Peer);
                if (newMinHeight == null) {
                    Peer.css('min-height', '');
                }
                else {
                    Peer.css('min-height', Math.round(newMinHeight) + 'px');
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Visual.prototype, "maxHeight", {
            /**** maxHeight ****/
            get: function () {
                var maxHeight = $(this.Peer).css('max-height');
                return (maxHeight === 'none' ? Infinity : parseInt(maxHeight, 10));
            },
            set: function (newMaxHeight) {
                WAT.allowDimension('maximal height', newMaxHeight);
                var Peer = $(this.Peer);
                if (newMaxHeight == null) {
                    Peer.css('max-height', '');
                }
                else {
                    if (newMaxHeight === Infinity) {
                        Peer.css('max-height', 'none');
                    }
                    else {
                        Peer.css('max-height', Math.round(newMaxHeight) + 'px');
                    }
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Visual.prototype, "x", {
            /**** x/y ****/
            get: function () { return GeometryOfVisual(this).x; },
            set: function (newX) {
                WAT.expectLocation('x coordinate', newX);
                this.Geometry = { x: newX };
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Visual.prototype, "y", {
            get: function () { return GeometryOfVisual(this).y; },
            set: function (newY) {
                WAT.expectLocation('y coordinate', newY);
                this.Geometry = { y: newY };
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Visual.prototype, "Width", {
            /**** Width/Height ****/
            get: function () { return GeometryOfVisual(this).Width; },
            set: function (newWidth) {
                WAT.expectDimension('visual width', newWidth);
                this.Geometry = { Width: newWidth };
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Visual.prototype, "Height", {
            get: function () { return GeometryOfVisual(this).Height; },
            set: function (newHeight) {
                WAT.expectDimension('visual height', newHeight);
                this.Geometry = { Height: newHeight };
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Visual.prototype, "Position", {
            /**** Position ****/
            get: function () {
                var _a = this.Geometry, x = _a.x, y = _a.y;
                return { x: x, y: y };
            },
            set: function (newPosition) {
                expectObject('visual position', newPosition);
                WAT.expectLocation('x coordinate', newPosition.x);
                WAT.expectLocation('y coordinate', newPosition.y);
                this.Geometry = { x: newPosition.x, y: newPosition.y };
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Visual.prototype, "Size", {
            /**** Size ****/
            get: function () {
                var _a = this.Geometry, Width = _a.Width, Height = _a.Height;
                return { Width: Width, Height: Height };
            },
            set: function (newSize) {
                expectObject('visual size', newSize);
                WAT.expectDimension('width', newSize.Width);
                WAT.expectDimension('height', newSize.Height);
                this.Geometry = { Width: newSize.Width, Height: newSize.Height };
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Visual.prototype, "Geometry", {
            /**** Geometry ****/
            get: function () {
                return GeometryOfVisual(this);
            },
            set: function (newGeometry) {
                expectIncompleteGeometry('visual geometry', newGeometry);
                changeGeometryOfVisualTo(this, newGeometry.x, newGeometry.y, newGeometry.Width, newGeometry.Height);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Visual.prototype, "GeometryOnPage", {
            /**** GeometryOnPage ****/
            get: function () {
                return GeometryOfVisualOnPage(this);
            },
            set: function (_) {
                throwReadOnlyError('GeometryOnPage');
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Visual.prototype, "horizontalAnchors", {
            /**** horizontalAnchors ****/
            get: function () {
                return horizontalAnchorsOfVisual(this);
            },
            set: function (newAnchors) {
                expectOneOf('horizontal anchors', newAnchors, WAT.WAT_horizontalAnchorses);
                changeHorizontalAnchorsOfVisualTo(this, newAnchors);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Visual.prototype, "horizontalOffsets", {
            /**** horizontalOffsets ****/
            get: function () {
                return horizontalOffsetsOfVisual(this);
            },
            set: function (newOffsets) {
                WAT.expectOffsets('horizontal offsets', newOffsets);
                changeHorizontalOffsetsOfVisualTo(this, newOffsets);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Visual.prototype, "verticalAnchors", {
            /**** verticalAnchors ****/
            get: function () {
                return verticalAnchorsOfVisual(this);
            },
            set: function (newAnchors) {
                expectOneOf('vertical anchors', newAnchors, WAT.WAT_verticalAnchorses);
                changeVerticalAnchorsOfVisualTo(this, newAnchors);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Visual.prototype, "verticalOffsets", {
            /**** verticalOffsets ****/
            get: function () {
                return verticalOffsetsOfVisual(this);
            },
            set: function (newOffsets) {
                WAT.expectOffsets('vertical offsets', newOffsets);
                changeVerticalOffsetsOfVisualTo(this, newOffsets);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Visual.prototype, "Value", {
            /**** Value ****/
            get: function () {
                return $(this.Peer).data('wat-value'); // local cache
            },
            set: function (newValue) {
                var Peer = $(this.Peer);
                var oldValue = Peer.data('wat-value'); // local cache
                if (ValuesDiffer(oldValue, newValue)) {
                    Peer.data('wat-value', newValue == null ? null : newValue);
                    Peer.trigger('value-changed', [newValue, oldValue]);
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Visual.prototype, "State", {
            /**** State ****/
            get: function () {
                return $(this.Peer).data('wat-state'); // local cache
            },
            set: function (newState) {
                allowPlainObject('state value', newState);
                $(this.Peer).data('wat-state', newState == null ? null : newState);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Visual.prototype, "reactiveVariable", {
            /**** Value ****/
            get: function () {
                var rawValue = $(this.Peer).attr('wat-reactive-variable');
                return (ValueIsIdentifier(rawValue) ? rawValue : undefined);
            },
            set: function (newIdentifier) {
                WAT.allowIdentifier('variable identifier', newIdentifier);
                var oldIdentifier = this.reactiveVariable;
                if (oldIdentifier === newIdentifier) {
                    return;
                }
                var ReactivityContext = ReactivityContextOfApplet(this.Applet);
                if ((newIdentifier != null) &&
                    (newIdentifier in ReactivityContext.reactiveVariableSet))
                    throwError('VariableInUse: a reactive variable with the name ' +
                        quoted(newIdentifier) + ' has already been defined');
                if (oldIdentifier != null) {
                    ReactivityContext.clearReactiveVariable(oldIdentifier);
                    delete ReactivityContext.reactiveVisualSet[oldIdentifier];
                }
                var Peer = $(this.Peer);
                if (newIdentifier == null) {
                    Peer.removeAttr('wat-reactive-variable');
                }
                else {
                    Peer.attr('wat-reactive-variable', newIdentifier);
                }
                if (newIdentifier != null) {
                    ReactivityContext.setReactiveVariable(newIdentifier, this.Value);
                } // "Value" is fetched from "cache"
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Visual.prototype, "FontFamily", {
            /**** FontFamily ****/
            get: function () {
                return $(this.Peer).css('font-family');
            },
            set: function (newFontFamily) {
                allowTextline('font family', newFontFamily);
                $(this.Peer).css('font-family', newFontFamily);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Visual.prototype, "FontSize", {
            /**** FontSize ****/
            get: function () {
                return parseInt($(this.Peer).css('font-size'), 10);
            },
            set: function (newFontSize) {
                WAT.allowDimension('font size', newFontSize);
                var Peer = $(this.Peer);
                if (newFontSize == null) {
                    Peer.css('font-size', '');
                }
                else {
                    Peer.css('font-size', Math.round(newFontSize) + 'px');
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Visual.prototype, "FontWeight", {
            /**** FontWeight ****/
            get: function () {
                var FontWeight = $(this.Peer).css('font-weight');
                switch (FontWeight) {
                    case 'lighter':
                    case 'normal':
                    case 'bolder':
                    case 'bold':
                        return FontWeight;
                    default:
                        var BoldnessIndex = Math.max(1, Math.min(9, Math.round(parseInt(FontWeight, 10) / 100))) - 1;
                        return WAT.WAT_FontWeights[BoldnessIndex];
                }
            },
            set: function (newFontWeight) {
                allowOneOf('font weight', newFontWeight, WAT.WAT_FontWeights);
                var Peer = $(this.Peer);
                switch (newFontWeight) {
                    case 'lighter':
                    case 'normal':
                    case 'bolder':
                    case 'bold':
                        Peer.css('font-weight', newFontWeight);
                        break;
                    default:
                        Peer.css('font-weight', WAT.WAT_FontWeightValues[newFontWeight]);
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Visual.prototype, "FontStyle", {
            /**** FontStyle ****/
            get: function () {
                var FontStyle = $(this.Peer).css('font-style');
                switch (FontStyle) {
                    case 'normal':
                    case 'italic':
                        return FontStyle;
                    default:
                        return (FontStyle.startsWith('oblique') ? 'italic' : 'normal');
                }
            },
            set: function (newFontStyle) {
                allowOneOf('font style', newFontStyle, WAT.WAT_FontStyles);
                $(this.Peer).css('font-style', newFontStyle);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Visual.prototype, "LineHeight", {
            /**** LineHeight ****/
            get: function () {
                var LineHeight = $(this.Peer).css('line-height');
                switch (true) {
                    case (LineHeight === 'normal'):
                        return Math.round(this.FontSize * 1.5);
                    case (LineHeight.indexOf('%') > 0):
                        return Math.round(this.FontSize * 100 * parseInt(LineHeight, 10));
                    default:
                        return parseInt(LineHeight, 10);
                }
            },
            set: function (newLineHeight) {
                WAT.allowDimension('line height', newLineHeight);
                var Peer = $(this.Peer);
                if (newLineHeight == null) {
                    Peer.css('line-height', '');
                }
                else {
                    Peer.css('line-height', Math.round(newLineHeight) + 'px');
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Visual.prototype, "TextDecoration", {
            /**** TextDecoration ****/
            get: function () {
                var $Peer = $(this.Peer);
                var TextDecoration = [
                    $Peer.css('text-decoration-line'),
                    $Peer.css('text-decoration-color'),
                    $Peer.css('text-decoration-style'),
                    $Peer.css('text-decoration-thickness')
                ];
                if ((TextDecoration[0] === 'none') ||
                    !ValueIsOneOf(TextDecoration[0], WAT.WAT_TextDecorationLines)) {
                    return 'none';
                }
                else {
                    var Thickness = parseInt(TextDecoration[3], 10);
                    return {
                        Line: TextDecoration[0],
                        Color: TextDecoration[1] == null ? undefined : HexColor(TextDecoration[1]),
                        Style: ValueIsOneOf(TextDecoration[2], WAT.WAT_TextDecorationStyles) ? TextDecoration[2] : 'solid',
                        Thickness: isNaN(Thickness) ? undefined : Thickness
                    };
                }
            },
            set: function (newTextDecoration) {
                WAT.allowTextDecoration('text decoration', newTextDecoration);
                var Peer = $(this.Peer);
                switch (newTextDecoration) {
                    case null:
                    case undefined:
                        Peer.css('text-decoration', '');
                        break;
                    case 'none':
                        Peer.css('text-decoration', 'none');
                        break;
                    default:
                        Peer.css('text-decoration', newTextDecoration.Line + ' ' +
                            (newTextDecoration.Color == null ? 'currentColor' : shortHexColor(newTextDecoration.Color)) + ' ' +
                            newTextDecoration.Style + ' ' +
                            (newTextDecoration.Thickness == null ? 'from-font' : Math.round(newTextDecoration.Thickness) + 'px'));
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Visual.prototype, "TextShadow", {
            /**** TextShadow ****/
            get: function () {
                var TextShadow = $(this.Peer).css('text-shadow');
                if (TextShadow === 'none') {
                    return 'none';
                }
                else {
                    var splitTextShadow = TextShadow.replace(/,\s/g, ',').split(' ');
                    return {
                        xOffset: parseInt(splitTextShadow[1], 10),
                        yOffset: parseInt(splitTextShadow[2], 10),
                        BlurRadius: parseInt(splitTextShadow[3], 10),
                        Color: HexColor(splitTextShadow[0])
                    };
                }
            },
            set: function (newTextShadow) {
                WAT.allowTextShadow('text shadow', newTextShadow);
                var Peer = $(this.Peer);
                switch (newTextShadow) {
                    case null:
                    case undefined:
                        Peer.css('text-shadow', '');
                        break;
                    case 'none':
                        Peer.css('text-shadow', 'none');
                        break;
                    default:
                        Peer.css('text-shadow', Math.round(newTextShadow.xOffset) + 'px ' +
                            Math.round(newTextShadow.yOffset) + 'px ' +
                            Math.round(newTextShadow.BlurRadius) + 'px ' +
                            shortHexColor(newTextShadow.Color));
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Visual.prototype, "TextAlignment", {
            /**** TextAlignment ****/
            get: function () {
                var TextAlignment = $(this.Peer).css('text-align');
                return ValueIsTextAlignment(TextAlignment) ? TextAlignment : 'left';
            },
            set: function (newTextAlignment) {
                allowOneOf('text alignment', newTextAlignment, WAT.WAT_TextAlignments);
                $(this.Peer).css('text-align', newTextAlignment);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Visual.prototype, "ForegroundColor", {
            /**** ForegroundColor ****/
            get: function () {
                var Peer = $(this.Peer);
                return HexColor(Peer.css('color'));
            },
            set: function (newColor) {
                allowColor('foreground color', newColor);
                if (newColor != null) {
                    newColor = HexColor(newColor);
                }
                var Peer = $(this.Peer);
                Peer.css('color', newColor);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Visual.prototype, "Color", {
            /**** Color ****/
            get: function () {
                return this.ForegroundColor; // DRY
            },
            set: function (newColor) {
                this.ForegroundColor = newColor; // DRY
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Visual.prototype, "BackgroundColor", {
            /**** BackgroundColor ****/
            get: function () {
                var Peer = $(this.Peer);
                return HexColor(Peer.css('background-color'));
            },
            set: function (newColor) {
                allowColor('background color', newColor);
                if (newColor != null) {
                    newColor = HexColor(newColor);
                }
                var Peer = $(this.Peer);
                Peer.css('background-color', newColor);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Visual.prototype, "BackgroundTexture", {
            /**** BackgroundTexture ****/
            get: function () {
                var _a = window.getComputedStyle(this.Peer), backgroundImage = _a.backgroundImage, backgroundPosition = _a.backgroundPosition, backgroundSize = _a.backgroundSize, backgroundRepeat = _a.backgroundRepeat;
                if (backgroundImage === 'none') {
                    return 'none';
                }
                var Result = { ImageURL: '', Mode: 'normal', xOffset: 0, yOffset: 0 };
                Result.ImageURL = backgroundImage.slice(5, backgroundImage.length - 2);
                var Positions = backgroundPosition.split(' ');
                if (Positions[0].endsWith('px')) {
                    Result.xOffset = parseInt(Positions[0], 10);
                }
                if (Positions[1].endsWith('px')) {
                    Result.yOffset = parseInt(Positions[1], 10);
                }
                if (backgroundRepeat === 'no-repeat') {
                    switch (backgroundSize) {
                        case 'auto auto':
                            Result.Mode = 'normal';
                            break;
                        case 'contain':
                        case 'cover':
                            Result.Mode = backgroundSize;
                            break;
                        case '100% 100%':
                            Result.Mode = 'fill';
                            break;
                    }
                }
                else {
                    Result.Mode = 'tile';
                }
                return Result;
            },
            set: function (newTexture) {
                if ((newTexture != null) && (newTexture !== 'none')) {
                    allowPlainObject('background texture', newTexture);
                    switch (true) {
                        case newTexture.ImageURL == null:
                        case ValueIsEmptyString(newTexture.ImageURL):
                            newTexture = Object.assign({}, newTexture);
                            newTexture.ImageURL = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAAXNSR0IArs4c6QAAACVJREFUKFNjZGBg+M+ABP7/R+EyMNJBwX80SxkZQbYiACPtFQAAeDEf9ZbSKAQAAAAASUVORK5CYII=';
                            //          newTexture.Mode     = 'tile'
                            break;
                        default:
                            expectURL('background image url', newTexture.ImageURL);
                    }
                    expectOneOf('background image mode', newTexture.Mode, WAT.WAT_BackgroundModes);
                    WAT.expectLocation('background image x offset', newTexture.xOffset);
                    WAT.expectLocation('background image y offset', newTexture.yOffset);
                }
                var Peer = $(this.Peer);
                switch (newTexture) {
                    case null:
                    case undefined:
                        Peer.css({
                            'background-image': '', 'background-position': '',
                            'background-size': '', 'background-repeat': ''
                        });
                        break;
                    case 'none':
                        Peer.css('background-image', 'none');
                        break;
                    default:
                        var BackgroundSize = void 0;
                        switch (newTexture.Mode) {
                            case 'normal':
                                BackgroundSize = 'auto auto';
                                break;
                            case 'contain':
                            case 'cover':
                                BackgroundSize = newTexture.Mode;
                                break;
                            case 'fill':
                                BackgroundSize = '100% 100%';
                                break;
                            case 'tile':
                                BackgroundSize = 'auto auto';
                                break;
                        }
                        Peer.css({
                            'background-image': (newTexture.ImageURL === '' ? '' : 'url("' + newTexture.ImageURL + '")'),
                            'background-position': Math.round(newTexture.xOffset) + 'px ' + Math.round(newTexture.yOffset) + 'px',
                            'background-size': BackgroundSize,
                            'background-repeat': newTexture.Mode === 'tile' ? 'repeat' : 'no-repeat'
                        });
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Visual.prototype, "BorderWidths", {
            /**** BorderWidths ****/
            get: function () {
                var Peer = $(this.Peer);
                return [
                    parseInt(Peer.css('border-top-width'), 10),
                    parseInt(Peer.css('border-right-width'), 10),
                    parseInt(Peer.css('border-bottom-width'), 10),
                    parseInt(Peer.css('border-left-width'), 10)
                ];
            },
            set: function (newBorderWidths) {
                allowArray('list of border widths', newBorderWidths);
                var Peer = $(this.Peer);
                if (newBorderWidths == null) {
                    Peer.css('border-width', '');
                }
                else {
                    WAT.expectDimension('top border width', newBorderWidths[0]);
                    WAT.expectDimension('right border width', newBorderWidths[1]);
                    WAT.expectDimension('bottom border width', newBorderWidths[2]);
                    WAT.expectDimension('left border width', newBorderWidths[3]);
                    Peer.css('border-width', newBorderWidths[0] + 'px ' + newBorderWidths[1] + 'px ' +
                        newBorderWidths[2] + 'px ' + newBorderWidths[3] + 'px');
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Visual.prototype, "BorderColors", {
            /**** BorderColors ****/
            get: function () {
                var Peer = $(this.Peer);
                return [
                    HexColor(Peer.css('border-top-color')),
                    HexColor(Peer.css('border-right-color')),
                    HexColor(Peer.css('border-bottom-color')),
                    HexColor(Peer.css('border-left-color'))
                ];
            },
            set: function (newBorderColors) {
                allowArray('list of border colors', newBorderColors);
                var Peer = $(this.Peer);
                if (newBorderColors == null) {
                    Peer.css('border-color', '');
                }
                else {
                    expectColor('top border color', newBorderColors[0]);
                    expectColor('right border color', newBorderColors[1]);
                    expectColor('bottom border color', newBorderColors[2]);
                    expectColor('left border color', newBorderColors[3]);
                    Peer.css('border-color', newBorderColors.join(' '));
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Visual.prototype, "BorderStyles", {
            /**** BorderStyles ****/
            get: function () {
                function normalizedBorderStyle(Value) {
                    return (ValueIsOneOf(Value, WAT.WAT_BorderStyles) ? Value : 'none');
                }
                var Peer = $(this.Peer);
                return [
                    normalizedBorderStyle(Peer.css('border-top-style')),
                    normalizedBorderStyle(Peer.css('border-right-style')),
                    normalizedBorderStyle(Peer.css('border-bottom-style')),
                    normalizedBorderStyle(Peer.css('border-left-style'))
                ];
            },
            set: function (newBorderStyles) {
                allowArray('list of border styles', newBorderStyles);
                var Peer = $(this.Peer);
                if (newBorderStyles == null) {
                    Peer.css('border-style', '');
                }
                else {
                    WAT.expectBorderStyle('top border style', newBorderStyles[0]);
                    WAT.expectBorderStyle('right border style', newBorderStyles[1]);
                    WAT.expectBorderStyle('bottom border style', newBorderStyles[2]);
                    WAT.expectBorderStyle('left border style', newBorderStyles[3]);
                    Peer.css('border-style', newBorderStyles.join(' '));
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Visual.prototype, "BorderRadii", {
            /**** BorderRadii ****/
            get: function () {
                var Peer = $(this.Peer);
                return [
                    parseInt(Peer.css('border-top-left-radius'), 10),
                    parseInt(Peer.css('border-top-right-radius'), 10),
                    parseInt(Peer.css('border-bottom-right-radius'), 10),
                    parseInt(Peer.css('border-bottom-left-radius'), 10)
                ];
            },
            set: function (newBorderRadii) {
                allowArray('list of border radii', newBorderRadii);
                var Peer = $(this.Peer);
                if (newBorderRadii == null) {
                    Peer.css('border-radius', '');
                }
                else {
                    WAT.expectDimension('top-left border radius', newBorderRadii[0]);
                    WAT.expectDimension('top-right border radius', newBorderRadii[1]);
                    WAT.expectDimension('bottom-right border radius', newBorderRadii[2]);
                    WAT.expectDimension('bottom-left border radius', newBorderRadii[3]);
                    Peer.css('border-radius', Math.round(newBorderRadii[0]) + 'px ' + Math.round(newBorderRadii[1]) + 'px ' +
                        Math.round(newBorderRadii[2]) + 'px ' + Math.round(newBorderRadii[3]) + 'px');
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Visual.prototype, "BoxShadow", {
            /**** BoxShadow ****/
            get: function () {
                var BoxShadow = $(this.Peer).css('box-shadow');
                if (BoxShadow === 'none') {
                    return 'none';
                }
                else {
                    var splitBoxShadow = BoxShadow.replace(/,\s/g, ',').split(' ');
                    return {
                        isInset: (splitBoxShadow[5] === 'inset'),
                        xOffset: parseInt(splitBoxShadow[1], 10),
                        yOffset: parseInt(splitBoxShadow[2], 10),
                        BlurRadius: parseInt(splitBoxShadow[3], 10),
                        SpreadRadius: parseInt(splitBoxShadow[4], 10),
                        Color: HexColor(splitBoxShadow[0])
                    };
                }
            },
            set: function (newBoxShadow) {
                WAT.allowBoxShadow('box shadow', newBoxShadow);
                var Peer = $(this.Peer);
                switch (newBoxShadow) {
                    case null:
                    case undefined:
                        Peer.css('box-shadow', '');
                        break;
                    case 'none':
                        Peer.css('box-shadow', 'none');
                        break;
                    default:
                        if (this.BoxShadow !== newBoxShadow) {
                            Peer.css('box-shadow', (newBoxShadow.isInset ? 'inset ' : '') +
                                Math.round(newBoxShadow.xOffset) + 'px ' +
                                Math.round(newBoxShadow.yOffset) + 'px ' +
                                Math.round(newBoxShadow.BlurRadius) + 'px ' +
                                Math.round(newBoxShadow.SpreadRadius) + 'px ' +
                                shortHexColor(newBoxShadow.Color));
                        }
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Visual.prototype, "Cursor", {
            /**** Cursor ****/
            get: function () {
                var CursorSpec = $(this.Peer).css('cursor');
                return (CursorSpec.indexOf(',') > 0
                    ? CursorSpec.replace(/^.*,\s*/, '')
                    : CursorSpec);
            },
            set: function (newCursor) {
                allowOneOf('cursor', newCursor, WAT.WAT_Cursors);
                var Peer = $(this.Peer);
                var CursorSpec = Peer.css('cursor');
                var Prefix = (CursorSpec.indexOf(',') > 0
                    ? CursorSpec.replace(/,[^,]+$/, ', ')
                    : '');
                if (newCursor == null) {
                    Peer.css('cursor', ''); // also clears "customCursor"
                }
                else {
                    Peer.css('cursor', Prefix + newCursor);
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Visual.prototype, "customCursor", {
            /**** customCursor ****/
            get: function () {
                var CSSCursor = $(this.Peer).css('cursor');
                var Match = /^url\(([^\)]*)\)(\s+\d+)?(\s+\d+)?,/.exec(CSSCursor);
                if (Match == null) {
                    return 'none';
                }
                else {
                    var ImageURL = Match[1];
                    var xOffset = parseInt(Match[2], 10);
                    var yOffset = parseInt(Match[3], 10);
                    if ('\'"'.indexOf(ImageURL[0]) >= 0) {
                        ImageURL = ImageURL.slice(1, ImageURL.length - 1);
                    }
                    if (!ValueIsNumberInRange(xOffset, 0, 31)) {
                        xOffset = 0;
                    }
                    if (!ValueIsNumberInRange(yOffset, 0, 31)) {
                        yOffset = 0;
                    }
                    return { ImageURL: ImageURL, xOffset: xOffset, yOffset: yOffset };
                }
            },
            set: function (newCursor) {
                WAT.allowCustomCursor('custom cursor', newCursor);
                var Peer = $(this.Peer);
                var CursorSpec = Peer.css('cursor');
                var standardCursor = (CursorSpec.indexOf(',') > 0
                    ? CursorSpec.replace(/^.*,\s*/, '')
                    : CursorSpec);
                var CSSCursor;
                if ((newCursor == null) || (newCursor === 'none')) {
                    CSSCursor = standardCursor;
                }
                else {
                    if (ValueIsEmptyString(newCursor.ImageURL)) {
                        newCursor = Object.assign({}, newCursor);
                        newCursor.ImageURL = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAAXNSR0IArs4c6QAAAD5JREFUKFNj/P///38GLICRkZERJMwIUgBlw5WB9OBUADOQdBOgxmJYA3YDshuR3QPWhO4BZEdjVQDSgGwqANbXNP3sko9LAAAAAElFTkSuQmCC';
                    }
                    CSSCursor = ('url("' + newCursor.ImageURL + '") ' +
                        Math.round(newCursor.xOffset) + ' ' + Math.round(newCursor.yOffset) + ', ' +
                        standardCursor);
                }
                Peer.css('cursor', CSSCursor);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Visual.prototype, "TabIndex", {
            /**** TabIndex ****/
            get: function () {
                var TabIndex = $(this.Peer).attr('tabindex');
                return (TabIndex == null ? undefined : parseInt(TabIndex, 10));
            },
            set: function (newTabIndex) {
                allowIntegerInRange('tab index', newTabIndex, -1, 32767);
                if (newTabIndex == null) {
                    $(this.Peer).removeAttr('tabindex');
                }
                else {
                    $(this.Peer).attr('tabindex', newTabIndex);
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Visual.prototype, "PointerSensitivity", {
            /**** PointerSensitivity ****/
            get: function () {
                var Peer = $(this.Peer);
                return (Peer.css('pointer-events') !== 'none');
            },
            set: function (newPointerSensitivity) {
                allowBoolean('pointer sensitivity setting', newPointerSensitivity);
                if (newPointerSensitivity == null) {
                    $(this.Peer).css('pointer-events', '');
                }
                else {
                    $(this.Peer).css('pointer-events', newPointerSensitivity == true ? 'auto' : 'none');
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Visual.prototype, "Overflows", {
            /**** Overflows ****/
            get: function () {
                function normalizedOverflow(Overflow) {
                    switch (Overflow) {
                        case 'visible':
                        case 'hidden':
                        case 'scroll':
                        case 'auto':
                            return Overflow;
                        case 'clip':
                            return 'hidden';
                        case 'overlay':
                        default:
                            return 'auto';
                    }
                }
                var Peer = $(this.Peer);
                var Overflows = Peer.css('overflow').trim().split(' ');
                var horizontalOverflow = normalizedOverflow(Overflows[0]);
                var verticalOverflow = normalizedOverflow(Overflows[1] || horizontalOverflow);
                return [horizontalOverflow, verticalOverflow];
            },
            set: function (newOverflows) {
                allowArray('list of overflow settings', newOverflows);
                if (newOverflows != null) {
                    expectOneOf('horizontal overflow', newOverflows[0], WAT.WAT_Overflows);
                    expectOneOf('vertical overflow', newOverflows[1], WAT.WAT_Overflows);
                }
                if (newOverflows == null) {
                    $(this.Peer).css('overflow', '');
                }
                else {
                    $(this.Peer).css('overflow', newOverflows.join(' '));
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Visual.prototype, "TextOverflow", {
            /**** TextOverflow ****/
            get: function () {
                var Peer = $(this.Peer);
                return (Peer.css('text-overflow') === 'clip' ? 'clip' : 'ellipsis');
            },
            set: function (newTextOverflow) {
                allowOneOf('text overflow setting', newTextOverflow, WAT.WAT_TextOverflows);
                if (newTextOverflow == null) {
                    $(this.Peer).css('text-overflow', '');
                }
                else {
                    $(this.Peer).css('text-overflow', newTextOverflow);
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Visual.prototype, "Opacity", {
            /**** Opacity ****/
            get: function () {
                var Peer = $(this.Peer);
                return Math.round(100 * parseFloat(Peer.css('opacity')));
            },
            set: function (newOpacity) {
                allowNumberInRange('opacity', newOpacity, 0, 100, true, true);
                if (newOpacity == null) {
                    $(this.Peer).css('opacity', '');
                }
                else {
                    newOpacity = Math.round(newOpacity);
                    $(this.Peer).css('opacity', newOpacity + '%');
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Visual.prototype, "customProperties", {
            /**** customProperties ****/
            get: function () {
                var customProperties = MasterRegistry[this.Master.toLowerCase()].customPropertyDescriptorList;
                var Result = [];
                customProperties.forEach(function (Descriptor) {
                    Result.push(Object.assign({}, Descriptor)); // *C* not yet perfect
                });
                return Result;
            },
            set: function (_) {
                throwReadOnlyError('customProperties');
            },
            enumerable: false,
            configurable: true
        });
        /**** serialized ****/
        WAT_Visual.prototype.serialized = function () {
            return SerializationOfVisual(this);
        };
        return WAT_Visual;
    }());
    // not in "MasterRegistry"
    //----------------------------------------------------------------------------//
    //                                 WAT_Applet                                 //
    //----------------------------------------------------------------------------//
    var WAT_Applet = /** @class */ (function (_super) {
        __extends(WAT_Applet, _super);
        function WAT_Applet() {
            return _super.call(this) || this;
        }
        /**** deserializedFrom ****/
        WAT_Applet.prototype.deserializedFrom = function (Serialization) {
            expectText('applet serialization', Serialization);
            var new$Peer = $(PeerDeserializedFrom(Serialization)); // *C* HTML should be validated first
            var newApplet = VisualFromPeer(new$Peer[0], 'recursively');
            $(this.Peer).replaceWith(new$Peer);
            triggerRecursivelyOutwards(new$Peer[0], 'after-deserialization');
            return newApplet;
        };
        Object.defineProperty(WAT_Applet.prototype, "Name", {
            /**** Name ****/
            get: function () {
                var Candidate = $(this.Peer).attr('name');
                return ValueIsName(Candidate) ? Candidate : undefined;
            },
            set: function (newName) {
                WAT.allowName('applet name', newName);
                if (newName == null) {
                    $(this.Peer).removeAttr('name');
                }
                else {
                    $(this.Peer).attr('name', newName);
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Applet.prototype, "Index", {
            /**** Index ****/
            get: function () {
                var Peer = $(this.Peer);
                return $('.WAT.Applet').index(Peer);
            },
            set: function (_) { throwReadOnlyError('Index'); },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Applet.prototype, "Path", {
            /**** Path ****/
            get: function () {
                this.mustBeAttached();
                var Name = this.Name;
                return (Name == null ? '/#' + this.Index : '/' + Name);
            },
            set: function (_) { throwReadOnlyError('Path'); },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Applet.prototype, "Resizability", {
            /**** Resizability ****/
            get: function () {
                return ($(this.Peer).attr('wat-resizable') === 'true');
            },
            set: function (newResizability) {
                expectBoolean('resizability setting', newResizability);
                if (newResizability === this.Resizability) {
                    return;
                }
                var Peer = $(this.Peer);
                if (newResizability == true) {
                    $(this.Peer).attr('wat-resizable', 'true');
                }
                else {
                    $(this.Peer).removeAttr('wat-resizable');
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Applet.prototype, "Visibility", {
            /**** Visibility ****/
            get: function () {
                var Peer = $(this.Peer);
                return ((Peer.css('display') !== 'none') &&
                    (Peer.css('visibility') !== 'hidden'));
            },
            set: function (_) {
                throwError('ForbiddenOperation: the "Visibility" of an applet must not be changed');
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Applet.prototype, "Cards", {
            /**** Cards ****/
            get: function () {
                var Result = [];
                $(this.Peer).children('.WAT.Card').each(function () {
                    Result.push(VisualOfElement(this));
                });
                return Result;
            },
            set: function (_) { throwReadOnlyError('Cards'); },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Applet.prototype, "NumberOfCards", {
            /**** NumberOfCards ****/
            get: function () { return this.Cards.length; },
            set: function (_) { throwReadOnlyError('NumberOfCards'); },
            enumerable: false,
            configurable: true
        });
        /**** CardAtIndex ****/
        WAT_Applet.prototype.CardAtIndex = function (Index) {
            expectInteger('card index', Index);
            var Cards = this.Cards;
            return Cards[Index < 0 ? Cards.length + Index : Index];
        };
        /**** IndexOfCard ****/
        WAT_Applet.prototype.IndexOfCard = function (Card) {
            expectCardInApplet('card', Card, this);
            return this.Cards.indexOf(Card);
        };
        /**** CardWithName ****/
        WAT_Applet.prototype.CardWithName = function (Name) {
            WAT.expectName('card name', Name);
            var Result;
            this.Cards.some(function (Card) {
                return (Card.Name === Name ? (Result = Card, true) : false);
            });
            return Result;
        };
        Object.defineProperty(WAT_Applet.prototype, "firstCard", {
            /**** firstCard ****/
            get: function () { return this.Cards[0]; },
            set: function (_) { throwReadOnlyError('firstCard'); },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Applet.prototype, "lastCard", {
            /**** lastCard ****/
            get: function () {
                var Cards = this.Cards;
                return Cards[Cards.length - 1];
            },
            set: function (_) { throwReadOnlyError('lastCard'); },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Applet.prototype, "visibleCard", {
            /**** visibleCard ****/
            get: function () {
                var Result;
                this.Cards.some(function (Card) {
                    return (Card.isVisible ? (Result = Card, true) : false);
                });
                return Result;
            },
            set: function (Card) {
                this.showCard(Card);
            },
            enumerable: false,
            configurable: true
        });
        /**** hideCard ****/
        WAT_Applet.prototype.hideCard = function (Card) {
            expectCardInApplet('card', Card, this);
            if (Card.isVisible) {
                var CardToShow = this.CardAfter(Card) || this.firstCard;
                if (CardToShow === Card)
                    throwError('InvalidOperation: the sole card of an applet must not be hidden');
                $(CardToShow.Peer).css({ visibility: 'visible', 'display': 'block' });
                $(Card.Peer).css({ visibility: '', 'display': 'none' });
            }
        };
        /**** showCard ****/
        WAT_Applet.prototype.showCard = function (Card) {
            expectCardInApplet('card', Card, this);
            if (Card.isVisible) {
                return;
            }
            var CardToHide = this.visibleCard;
            $(Card.Peer).css({ visibility: 'visible', 'display': 'block' });
            $(CardToHide.Peer).css({ visibility: '', 'display': 'none' });
        };
        /**** hasCardBefore ****/
        WAT_Applet.prototype.hasCardBefore = function (Card) {
            expectCardInApplet('card', Card, this);
            var prevPeer = $(Card.Peer).prev('.WAT.Card');
            return (prevPeer.length > 0);
        };
        /**** hasCardAfter ****/
        WAT_Applet.prototype.hasCardAfter = function (Card) {
            expectCardInApplet('card', Card, this);
            var nextPeer = $(Card.Peer).next('.WAT.Card');
            return (nextPeer.length > 0);
        };
        /**** CardBefore ****/
        WAT_Applet.prototype.CardBefore = function (Card) {
            expectCardInApplet('card', Card, this);
            var prevPeer = $(Card.Peer).prev('.WAT.Card');
            return (prevPeer.length === 0
                ? undefined
                : VisualOfElement(prevPeer[0]));
        };
        /**** CardAfter ****/
        WAT_Applet.prototype.CardAfter = function (Card) {
            expectCardInApplet('card', Card, this);
            var nextPeer = $(Card.Peer).next('.WAT.Card');
            return (nextPeer.length === 0
                ? undefined
                : VisualOfElement(nextPeer[0]));
        };
        /**** CardMayBeShiftedUp - permitted if technically possible ****/
        WAT_Applet.prototype.CardMayBeShiftedUp = function (Card) {
            return this.hasCardBefore(Card);
        };
        /**** CardMayBeShiftedDown - permitted if technically possible ****/
        WAT_Applet.prototype.CardMayBeShiftedDown = function (Card) {
            return this.hasCardAfter(Card);
        };
        /**** shiftCardToTop - permitted if technically possible ****/
        WAT_Applet.prototype.shiftCardToTop = function (Card) {
            //    expectCardInApplet('card',Card, this)      // done by "CardMayBeShiftedUp"
            if (this.CardMayBeShiftedUp(Card)) {
                $(this.Peer).prepend(Card.Peer);
            }
        };
        /**** shiftCardUp - permitted if technically possible ****/
        WAT_Applet.prototype.shiftCardUp = function (Card) {
            //    expectCardInApplet('card',Card, this)              // done by "CardBefore"
            var prevCard = this.CardBefore(Card);
            if (prevCard != null) {
                $(Card.Peer).insertBefore(prevCard.Peer);
            }
        };
        /**** shiftCardDown - permitted if technically possible ****/
        WAT_Applet.prototype.shiftCardDown = function (Card) {
            //    expectCardInApplet('card',Card, this)               // done by "CardAfter"
            var nextCard = this.CardAfter(Card);
            if (nextCard != null) {
                $(Card.Peer).insertAfter(nextCard.Peer);
            }
        };
        /**** shiftCardToBottom - permitted if technically possible ****/
        WAT_Applet.prototype.shiftCardToBottom = function (Card) {
            //    expectCardInApplet('card',Card, this)    // done by "CardMayBeShiftedDown"
            if (this.CardMayBeShiftedDown(Card)) {
                $(this.Peer).append(Card.Peer);
            }
        };
        /**** CardMayBeShiftedToIndex - permitted if technically possible ****/
        WAT_Applet.prototype.CardMayBeShiftedToIndex = function (Card, Index) {
            expectCardInApplet('card', Card, this);
            expectInteger('card index', Index);
            var Cards = this.Cards;
            if (Index < 0) {
                Index += Cards.length;
            }
            return (Index >= 0) && (Index <= Cards.length);
        };
        /**** shiftCardToIndex - done if technically possible ****/
        WAT_Applet.prototype.shiftCardToIndex = function (Card, newIndex) {
            expectCardInApplet('card', Card, this);
            expectInteger('card index', newIndex);
            var Cards = this.Cards;
            if (newIndex < 0) {
                newIndex += Cards.length;
            }
            newIndex = Math.max(0, Math.min(newIndex, Cards.length - 1));
            var oldIndex = Cards.indexOf(Card);
            if (oldIndex === newIndex) {
                return;
            }
            if (newIndex < oldIndex) {
                $(Card.Peer).insertBefore(Cards[newIndex].Peer);
            }
            else {
                $(Card.Peer).insertAfter(Cards[newIndex].Peer);
            }
        };
        /**** newCardCreatedAtIndex ****/
        WAT_Applet.prototype.newCardCreatedAtIndex = function (Master, Index) {
            WAT.expectName('master name', Master);
            allowInteger('insertion index', Index);
            var MasterRecord = existingRecordOfMaster(Master);
            if (MasterRecord.Category !== 'Card')
                throwError('ForbiddenOperation: only instances of existing masters of category ' +
                    '"Card" may be added to an applet');
            var existingCards = this.Cards;
            if (Index == null) {
                Index = existingCards.length;
            }
            else {
                if (Index < 0) {
                    Index = Math.max(0, Index + existingCards.length);
                }
            }
            var newPeer = $('<div wat-master="' + MasterRecord.Name + '"></div>');
            newPeer.attr('class', MasterRecord.Classes);
            if (MasterRecord.Template !== '') {
                newPeer.html(MasterRecord.Template);
                //                                     "Classes" will be set by "VisualFromPeer"
                //        validateContentsOfPeer(newPeer)     // done during master registration
                updateUniqueIdsInPeer(newPeer[0]);
            }
            if (Index < existingCards.length) {
                newPeer.insertBefore(existingCards[Index].Peer);
            }
            else {
                $(this.Peer).append(newPeer);
            }
            var newCard = VisualFromPeer(newPeer[0], 'recursively');
            triggerRecursivelyOutwards(newCard.Peer, 'after-deserialization');
            return newCard;
        };
        /**** newCardDeserializedAtIndex ****/
        WAT_Applet.prototype.newCardDeserializedAtIndex = function (Serialization, Index) {
            expectString('serialization', Serialization);
            allowInteger('insertion index', Index);
            var Master = Serialization
                .replace(/^[^<]*<[^>]+wat-master=["']?/, '')
                .replace(/["'\s>][\s\S]*$/, '');
            var MasterRecord = existingRecordOfMaster(Master);
            if (MasterRecord.Category !== 'Card')
                throwError('ForbiddenOperation: only visuals of category "Card" may be added to ' +
                    'an applet');
            var existingCards = this.Cards;
            if (Index == null) {
                Index = existingCards.length;
            }
            else {
                if (Index < 0) {
                    Index = Math.max(0, Index + existingCards.length);
                }
            }
            var newPeer = PeerDeserializedFrom(Serialization);
            if (Index < existingCards.length) {
                $(newPeer).insertBefore(existingCards[Index].Peer);
            }
            else {
                $(this.Peer).append(newPeer);
            }
            var newCard = VisualFromPeer(newPeer, 'recursively');
            triggerRecursivelyOutwards(newCard.Peer, 'after-deserialization');
            return newCard;
        };
        /**** newDuplicateOfCard ****/
        WAT_Applet.prototype.newDuplicateOfCard = function (Card, Index) {
            WAT.expectCard('card to be duplicated', Card);
            allowInteger('insertion index', Index);
            var Serialization = Card.serialized();
            return this.newCardDeserializedAtIndex(Serialization, Index);
        };
        /**** removeCard - idempotent, ignores removal prohibition of card ****/
        WAT_Applet.prototype.removeCard = function (Card) {
            WAT.expectCard('card', Card);
            var Applet = Card.Applet;
            if (Applet == null) {
                return;
            }
            if (Applet !== this)
                throwError('ForbiddenOperation: the given card is not part of this applet');
            if (Card.isVisible) {
                var CardToShow = (this.NumberOfCards === 1
                    ? this.newCardCreatedAtIndex('plainCard', 2)
                    : (this.CardAfter(Card) || this.firstCard));
                this.showCard(CardToShow);
            }
            triggerRecursivelyInwards(Card.Peer, 'before-removal'); // still attached
            Card.reactiveVariable = undefined;
            removeReactiveVariablesFromContainer(Card);
            $(Card.Peer).remove();
        };
        /**** remove ****/
        WAT_Applet.prototype.remove = function () {
            throwError('ForbiddenOperation: applets must not be removed');
        };
        return WAT_Applet;
    }(WAT_Visual));
    MasterRegistry['plainApplet'.toLowerCase()] = {
        Category: 'Applet', Name: 'plainApplet',
        Group: null, Label: 'plain Applet',
        Classes: 'WAT Applet', Template: '', Initializer: function () { },
        customPropertyDescriptorList: [],
        Prototype: new WAT_Applet(),
    };
    //----------------------------------------------------------------------------//
    //                           WAT_Container (Mixin)                            //
    //----------------------------------------------------------------------------//
    var WAT_Container = /** @class */ (function (_super) {
        __extends(WAT_Container, _super);
        function WAT_Container() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(WAT_Container.prototype, "Components", {
            /**** Components ****/
            get: function () {
                var Result = [];
                $(this.Peer).children().filter('.WAT.Compound,.WAT.Control').each(function () {
                    Result.push(VisualOfElement(this));
                }); // "filter" keeps DOM order of inner visuals
                return Result;
            },
            set: function (_) { throwReadOnlyError('Components'); },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Container.prototype, "NumberOfComponents", {
            /**** NumberOfComponents ****/
            get: function () { return this.Components.length; },
            set: function (_) { throwReadOnlyError('NumberOfComponents'); },
            enumerable: false,
            configurable: true
        });
        /**** ComponentAtIndex ****/
        WAT_Container.prototype.ComponentAtIndex = function (Index) {
            expectInteger('component index', Index);
            var Components = this.Components;
            return Components[Index < 0 ? Components.length + Index : Index];
        };
        /**** IndexOfComponent ****/
        WAT_Container.prototype.IndexOfComponent = function (Component) {
            expectComponentInContainer('component', Component, this);
            return this.Components.indexOf(Component);
        };
        /**** ComponentWithName ****/
        WAT_Container.prototype.CardWithName = function (Name) {
            WAT.expectName('component name', Name);
            var Result;
            this.Components.some(function (Component) {
                return (Component.Name === Name ? (Result = Component, true) : false);
            });
            return Result;
        };
        /**** hasComponentBefore ****/
        WAT_Container.prototype.hasComponentBefore = function (Component) {
            expectComponentInContainer('Component', Component, this);
            var prevPeer = $(Component.Peer).prev('.WAT.Compound,.WAT.Control');
            return (prevPeer.length > 0);
        };
        /**** hasComponentAfter ****/
        WAT_Container.prototype.hasComponentAfter = function (Component) {
            expectComponentInContainer('Component', Component, this);
            var nextPeer = $(Component.Peer).next('.WAT.Compound,.WAT.Control');
            return (nextPeer.length > 0);
        };
        /**** ComponentBefore ****/
        WAT_Container.prototype.ComponentBefore = function (Component) {
            expectComponentInContainer('Component', Component, this);
            var prevPeer = $(Component.Peer).prev('.WAT.Compound,.WAT.Control');
            return (prevPeer.length === 0
                ? undefined
                : VisualOfElement(prevPeer[0]));
        };
        /**** ComponentAfter ****/
        WAT_Container.prototype.ComponentAfter = function (Component) {
            expectComponentInContainer('Component', Component, this);
            var nextPeer = $(Component.Peer).next('.WAT.Compound,.WAT.Control');
            return (nextPeer.length === 0
                ? undefined
                : VisualOfElement(nextPeer[0]));
        };
        /**** ComponentMayBeShiftedUp - permitted if technically possible ****/
        WAT_Container.prototype.ComponentMayBeShiftedUp = function (Component) {
            return this.hasComponentBefore(Component);
        };
        /**** ComponentMayBeShiftedDown - permitted if technically possible ****/
        WAT_Container.prototype.ComponentMayBeShiftedDown = function (Component) {
            return this.hasComponentAfter(Component);
        };
        /**** shiftComponentToTop - permitted if technically possible ****/
        WAT_Container.prototype.shiftComponentToTop = function (Component) {
            //    expectComponentInContainer('component',Component, this) // done by "ComponentMayBeShiftedUp"
            if (this.ComponentMayBeShiftedUp(Component)) {
                $(this.Peer).prepend(Component.Peer);
            }
            else
                throwError('ForbiddenOperation: the given component can not be shifted to the ' +
                    'top of its container');
        };
        /**** shiftComponentUp - permitted if technically possible ****/
        WAT_Container.prototype.shiftComponentUp = function (Component) {
            //    expectComponentInContainer('component',Component, this) // done by "ComponentBefore"
            var prevComponent = this.ComponentBefore(Component);
            if (prevComponent != null) {
                $(Component.Peer).insertBefore(prevComponent.Peer);
            }
            else
                throwError('ForbiddenOperation: the given component can not be shifted up ' +
                    'within its container');
        };
        /**** shiftComponentDown - permitted if technically possible ****/
        WAT_Container.prototype.shiftComponentDown = function (Component) {
            //    expectComponentInContainer('component',Component, this) // done by "ComponentAfter"
            var nextComponent = this.ComponentAfter(Component);
            if (nextComponent != null) {
                $(Component.Peer).insertAfter(nextComponent.Peer);
            }
            else
                throwError('ForbiddenOperation: the given component can not be shifted down ' +
                    'within its container');
        };
        /**** shiftComponentToBottom - permitted if technically possible ****/
        WAT_Container.prototype.shiftComponentToBottom = function (Component) {
            //    expectComponentInContainer('component',Component, this) // done by "ComponentMayBeShiftedDown"
            if (this.ComponentMayBeShiftedDown(Component)) {
                $(this.Peer).append(Component.Peer);
            }
            else
                throwError('ForbiddenOperation: the given component can not be shifted to the ' +
                    'bottom of its container');
        };
        /**** ComponentMayBeShiftedToIndex - permitted if technically possible ****/
        WAT_Container.prototype.ComponentMayBeShiftedToIndex = function (Component, Index) {
            expectComponentInContainer('component', Component, this);
            expectInteger('component index', Index);
            var Components = this.Components;
            if (Index < 0) {
                Index += Components.length;
            }
            return (Index >= 0) && (Index <= Components.length);
        };
        /**** shiftComponentToIndex - done if technically possible ****/
        WAT_Container.prototype.shiftComponentToIndex = function (Component, newIndex) {
            expectComponentInContainer('component', Component, this);
            expectInteger('component index', newIndex);
            var Components = this.Components;
            if (newIndex < 0) {
                newIndex += Components.length;
            }
            newIndex = Math.max(0, Math.min(newIndex, Components.length - 1));
            var oldIndex = Components.indexOf(Component);
            if (oldIndex === newIndex) {
                return;
            }
            if (newIndex < oldIndex) {
                $(Component.Peer).insertBefore(Components[newIndex].Peer);
            }
            else {
                $(Component.Peer).insertAfter(Components[newIndex].Peer);
            }
        };
        /**** newComponentCreatedAtIndex ****/
        WAT_Container.prototype.newComponentCreatedAtIndex = function (Master, Index) {
            WAT.expectName('master name', Master);
            allowInteger('insertion index', Index);
            var MasterRecord = existingRecordOfMaster(Master);
            if ((MasterRecord.Category !== 'Compound') &&
                (MasterRecord.Category !== 'Control'))
                throwError('ForbiddenOperation: only instances of existing masters of category ' +
                    '"Control" or "Compound" may be added to a container');
            var existingComponents = this.Components;
            if (Index == null) {
                Index = existingComponents.length;
            }
            else {
                if (Index < 0) {
                    Index = Math.max(0, Index + existingComponents.length);
                }
            }
            var newPeer = $('<div wat-master="' + MasterRecord.Name + '"></div>');
            newPeer.attr('class', MasterRecord.Classes);
            if (MasterRecord.Template !== '') {
                newPeer.html(MasterRecord.Template);
                //                                     "Classes" will be set by "VisualFromPeer"
                //        validateContentsOfPeer(newPeer)     // done during master registration
                updateUniqueIdsInPeer(newPeer[0]);
            }
            if (Index < existingComponents.length) {
                newPeer.insertBefore(existingComponents[Index].Peer);
            }
            else {
                $(this.Peer).append(newPeer);
            }
            var newComponent = VisualFromPeer(newPeer[0], 'recursively');
            if (MasterRecord.initialGeometry != null) {
                newComponent.Geometry = MasterRecord.initialGeometry;
            }
            triggerRecursivelyOutwards(newComponent.Peer, 'after-deserialization');
            return newComponent;
        };
        /**** newComponentDeserializedAtIndex ****/
        WAT_Container.prototype.newComponentDeserializedAtIndex = function (Serialization, Index) {
            expectString('serialization', Serialization);
            allowInteger('insertion index', Index);
            var Master = Serialization
                .replace(/^[^<]*<[^>]+wat-master=["']?/, '')
                .replace(/["'\s>][\s\S]*$/, '');
            var MasterRecord = existingRecordOfMaster(Master);
            if ((MasterRecord.Category !== 'Compound') &&
                (MasterRecord.Category !== 'Control'))
                throwError('ForbiddenOperation: only visuals of category "Control" or ' +
                    '"Compound" may be added to a container');
            var existingComponents = this.Components;
            if (Index == null) {
                Index = existingComponents.length;
            }
            else {
                if (Index < 0) {
                    Index = Math.max(0, Index + existingComponents.length);
                }
            }
            var newPeer = PeerDeserializedFrom(Serialization);
            if (Index < existingComponents.length) {
                $(newPeer).insertBefore(existingComponents[Index].Peer);
            }
            else {
                $(this.Peer).append(newPeer);
            }
            var newComponent = VisualFromPeer(newPeer, 'recursively');
            triggerRecursivelyOutwards(newComponent.Peer, 'after-deserialization');
            return newComponent;
        };
        /**** newDuplicateOfComponent ****/
        WAT_Container.prototype.newDuplicateOfComponent = function (Component, Index) {
            WAT.expectComponent('component to be duplicated', Component);
            allowInteger('insertion index', Index);
            var Serialization = Component.serialized();
            return this.newComponentDeserializedAtIndex(Serialization, Index);
        };
        /**** removeComponent - idempotent, ignores removal prohibition of component ****/
        WAT_Container.prototype.removeComponent = function (Component) {
            WAT.expectComponent('component', Component);
            var Container = Component.Container;
            if (Container == null) {
                return;
            }
            if (Container !== this)
                throwError('ForbiddenOperation: the given component is not part of this container');
            triggerRecursivelyInwards(Component.Peer, 'before-removal'); // still attached
            Component.reactiveVariable = undefined;
            if (ValueIsCompound(Component)) {
                removeReactiveVariablesFromContainer(Component);
            }
            $(Component.Peer).remove();
        };
        return WAT_Container;
    }(WAT_Visual));
    // not in "MasterRegistry"
    //----------------------------------------------------------------------------//
    //                                  WAT_Card                                  //
    //----------------------------------------------------------------------------//
    var WAT_Card = /** @class */ (function (_super) {
        __extends(WAT_Card, _super);
        function WAT_Card() {
            return _super.call(this) || this;
        }
        Object.defineProperty(WAT_Card.prototype, "Index", {
            /**** Index ****/
            get: function () {
                var Peer = $(this.Peer);
                return Peer.parent().children('.WAT.Card').index(Peer);
            },
            set: function (_) { throwReadOnlyError('Index'); },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Card.prototype, "Path", {
            /**** Path ****/
            get: function () {
                this.mustBeAttached();
                var Name = this.Name;
                return this.Applet.Path + (Name == null ? '/#' + this.Index : '/' + Name);
            },
            set: function (_) { throwReadOnlyError('Path'); },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Card.prototype, "Visibility", {
            /**** Visibility ****/
            get: function () {
                var Peer = $(this.Peer);
                return ((Peer.css('display') !== 'none') &&
                    (Peer.css('visibility') !== 'hidden'));
            },
            set: function (newVisibility) {
                expectBoolean('visibility setting', newVisibility);
                if (newVisibility === this.Visibility) {
                    return;
                }
                if (newVisibility == true) {
                    this.Applet.showCard(this);
                }
                else {
                    this.Applet.hideCard(this);
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Card.prototype, "minWidth", {
            /**** minWidth ****/
            get: function () {
                return parseInt($(this.Peer).css('min-width'), 10);
            },
            set: function (_) { throwReadOnlyError('minWidth'); },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Card.prototype, "maxWidth", {
            /**** maxWidth ****/
            get: function () {
                var maxWidth = $(this.Peer).css('max-width');
                return (maxWidth === 'none' ? Infinity : parseInt(maxWidth, 10));
            },
            set: function (_) { throwReadOnlyError('maxWidth'); },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Card.prototype, "minHeight", {
            /**** minHeight ****/
            get: function () {
                return parseInt($(this.Peer).css('min-height'), 10);
            },
            set: function (_) { throwReadOnlyError('minHeight'); },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Card.prototype, "maxHeight", {
            /**** maxHeight ****/
            get: function () {
                var maxHeight = $(this.Peer).css('max-height');
                return (maxHeight === 'none' ? Infinity : parseInt(maxHeight, 10));
            },
            set: function (_) { throwReadOnlyError('maxHeight'); },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Card.prototype, "x", {
            /**** x/y ****/
            get: function () { return GeometryOfVisual(this).x; },
            set: function (_) { throwReadOnlyError('x'); },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Card.prototype, "y", {
            get: function () { return GeometryOfVisual(this).y; },
            set: function (_) { throwReadOnlyError('y'); },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Card.prototype, "Width", {
            /**** Width/Height ****/
            get: function () { return GeometryOfVisual(this).Width; },
            set: function (_) { throwReadOnlyError('Width'); },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Card.prototype, "Height", {
            get: function () { return GeometryOfVisual(this).Height; },
            set: function (_) { throwReadOnlyError('Height'); },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Card.prototype, "Position", {
            /**** Position ****/
            get: function () {
                var _a = this.Geometry, x = _a.x, y = _a.y;
                return { x: x, y: y };
            },
            set: function (_) { throwReadOnlyError('Position'); },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Card.prototype, "Size", {
            /**** Size ****/
            get: function () {
                var _a = this.Geometry, Width = _a.Width, Height = _a.Height;
                return { Width: Width, Height: Height };
            },
            set: function (_) { throwReadOnlyError('Size'); },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Card.prototype, "Geometry", {
            /**** Geometry ****/
            get: function () { return GeometryOfVisual(this); },
            set: function (_) { throwReadOnlyError('Geometry'); },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Card.prototype, "horizontalAnchors", {
            /**** horizontalAnchors ****/
            get: function () {
                return horizontalAnchorsOfVisual(this);
            },
            set: function (_) {
                throwReadOnlyError('horizontalAnchors');
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Card.prototype, "horizontalOffsets", {
            /**** horizontalOffsets ****/
            get: function () {
                return horizontalOffsetsOfVisual(this);
            },
            set: function (_) {
                throwReadOnlyError('horizontalOffsets');
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Card.prototype, "verticalAnchors", {
            /**** verticalAnchors ****/
            get: function () {
                return verticalAnchorsOfVisual(this);
            },
            set: function (_) {
                throwReadOnlyError('verticalAnchors');
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Card.prototype, "verticalOffsets", {
            /**** verticalOffsets ****/
            get: function () {
                return verticalOffsetsOfVisual(this);
            },
            set: function (_) {
                throwReadOnlyError('verticalOffsets');
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Card.prototype, "mayBeShiftedUp", {
            /**** mayBeShiftedUp - permitted if technically possible ****/
            get: function () {
                this.mustBeAttached();
                var Applet = this.Applet;
                return Applet.CardMayBeShiftedUp(this);
            },
            set: function (_) { throwReadOnlyError('mayBeShiftedUp'); },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Card.prototype, "mayBeShiftedDown", {
            /**** mayBeShiftedDown - permitted if technically possible ****/
            get: function () {
                this.mustBeAttached();
                var Applet = this.Applet;
                return Applet.CardMayBeShiftedDown(this);
            },
            set: function (_) { throwReadOnlyError('mayBeShiftedDown'); },
            enumerable: false,
            configurable: true
        });
        /**** shiftToTop - done if technically possible and externally permitted ****/
        WAT_Card.prototype.shiftToTop = function () {
            //    this.mustBeAttached()                  // will be done by "mayBeShiftedUp"
            if (this.mayBeShiftedUp) {
                this.Applet.shiftCardToTop(this);
            }
            else
                throwError('ForbiddenOperation: this card can not be shifted to the top of its ' +
                    'applet');
        };
        /**** shiftUp - done if technically possible and externally permitted ****/
        WAT_Card.prototype.shiftUp = function () {
            //    this.mustBeAttached()                  // will be done by "mayBeShiftedUp"
            if (this.mayBeShiftedUp) {
                this.Applet.shiftCardUp(this);
            }
            else
                throwError('ForbiddenOperation: this card can not be shifted up within its applet');
        };
        /**** shiftDown - done if technically possible and externally permitted ****/
        WAT_Card.prototype.shiftDown = function () {
            //    this.mustBeAttached()                  // will be done by "mayBeShiftedUp"
            if (this.mayBeShiftedDown) {
                this.Applet.shiftCardDown(this);
            }
            else
                throwError('ForbiddenOperation: this card can not be shifted down within its applet');
        };
        /**** shiftToBottom - done if technically possible and externally permitted ****/
        WAT_Card.prototype.shiftToBottom = function () {
            //    this.mustBeAttached()                  // will be done by "mayBeShiftedUp"
            if (this.mayBeShiftedDown) {
                this.Applet.shiftCardToBottom(this);
            }
            else
                throwError('ForbiddenOperation: this card can not be shifted to the bottom of ' +
                    'its applet');
        };
        /**** mayBeShiftedToIndex - permitted if technically possible ****/
        WAT_Card.prototype.mayBeShiftedToIndex = function (Index) {
            expectInteger('card index', Index);
            this.mustBeAttached();
            var Applet = this.Applet;
            return Applet.CardMayBeShiftedToIndex(this, Index);
        };
        /**** shiftToIndex - done if technically possible ****/
        WAT_Card.prototype.shiftToIndex = function (Index) {
            //    expectInteger('card index',Index)         // done by "mayBeShiftedToIndex"
            //    this.mustBeAttached()                                              // dto.
            if (this.mayBeShiftedToIndex(Index)) {
                this.Applet.shiftCardToIndex(this, Index);
            }
            else
                throwError('ForbiddenOperation: this card can not be shifted to the given index');
        };
        /**** remove - idempotent, ignores removal prohibition of card ****/
        WAT_Card.prototype.remove = function () {
            this.Applet.removeCard(this);
        };
        return WAT_Card;
    }(WAT_Visual));
    applyMixinTo(WAT_Container, WAT_Card);
    MasterRegistry['plainCard'.toLowerCase()] = {
        Category: 'Card', Name: 'plainCard',
        Group: null, Label: 'plain Card',
        Classes: 'WAT Card', Template: '', Initializer: function () { },
        customPropertyDescriptorList: [],
        Prototype: new WAT_Card(),
    };
    //----------------------------------------------------------------------------//
    //                           WAT_Component (Mixin)                            //
    //----------------------------------------------------------------------------//
    var WAT_Component = /** @class */ (function (_super) {
        __extends(WAT_Component, _super);
        function WAT_Component() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(WAT_Component.prototype, "Container", {
            /**** Container ****/
            get: function () {
                var ContainerPeer = $(this.Peer).parent();
                return (ContainerPeer.is('.WAT.Card,.WAT.Compound')
                    ? VisualOfElement(ContainerPeer[0])
                    : undefined);
            },
            set: function (_) { throwReadOnlyError('Container'); },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Component.prototype, "Index", {
            /**** Index ****/
            get: function () {
                var Peer = $(this.Peer);
                return Peer.parent().children('.WAT.Control,.WAT.Compound').index(Peer);
            },
            set: function (_) { throwReadOnlyError('Index'); },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Component.prototype, "mayBeShiftedUp", {
            /**** mayBeShiftedUp - permitted if technically possible ****/
            get: function () {
                this.mustBeAttached();
                var Container = this.Container;
                return Container.ComponentMayBeShiftedUp(this);
            },
            set: function (_) { throwReadOnlyError('mayBeShiftedUp'); },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_Component.prototype, "mayBeShiftedDown", {
            /**** mayBeShiftedDown - permitted if technically possible ****/
            get: function () {
                this.mustBeAttached();
                var Container = this.Container;
                return Container.ComponentMayBeShiftedDown(this);
            },
            set: function (_) { throwReadOnlyError('mayBeShiftedDown'); },
            enumerable: false,
            configurable: true
        });
        /**** shiftToTop - done if technically possible and externally permitted ****/
        WAT_Component.prototype.shiftToTop = function () {
            //    this.mustBeAttached()                  // will be done by "mayBeShiftedUp"
            if (this.mayBeShiftedUp) {
                this.Container.shiftComponentToTop(this);
            }
            else
                throwError('ForbiddenOperation: this component can not be shifted to the top of ' +
                    'its container');
        };
        /**** shiftUp - done if technically possible and externally permitted ****/
        WAT_Component.prototype.shiftUp = function () {
            //    this.mustBeAttached()                  // will be done by "mayBeShiftedUp"
            if (this.mayBeShiftedUp) {
                this.Container.shiftComponentUp(this);
            }
            else
                throwError('ForbiddenOperation: this component can not be shifted up within its ' +
                    'container');
        };
        /**** shiftDown - done if technically possible and externally permitted ****/
        WAT_Component.prototype.shiftDown = function () {
            //    this.mustBeAttached()                  // will be done by "mayBeShiftedUp"
            if (this.mayBeShiftedDown) {
                this.Container.shiftComponentDown(this);
            }
            else
                throwError('ForbiddenOperation: this component can not be shifted down within its ' +
                    'container');
        };
        /**** shiftToBottom - done if technically possible and externally permitted ****/
        WAT_Component.prototype.shiftToBottom = function () {
            //    this.mustBeAttached()                  // will be done by "mayBeShiftedUp"
            if (this.mayBeShiftedDown) {
                this.Container.shiftComponentToBottom(this);
            }
            else
                throwError('ForbiddenOperation: this component can not be shifted to the bottom of ' +
                    'its container');
        };
        /**** mayBeShiftedToIndex - permitted if technically possible ****/
        WAT_Component.prototype.mayBeShiftedToIndex = function (Index) {
            expectInteger('component index', Index);
            this.mustBeAttached();
            var Container = this.Container;
            return Container.ComponentMayBeShiftedToIndex(this, Index);
        };
        /**** shiftToIndex - done if technically possible ****/
        WAT_Component.prototype.shiftToIndex = function (Index) {
            //    expectInteger('component index',Index)    // done by "mayBeShiftedToIndex"
            //    this.mustBeAttached()                                              // dto.
            if (this.mayBeShiftedToIndex(Index)) {
                this.Container.shiftComponentToIndex(this, Index);
            }
            else
                throwError('ForbiddenOperation: this component can not be shifted to the given index');
        };
        /**** remove - idempotent, ignores removal prohibition of component ****/
        WAT_Component.prototype.remove = function () {
            this.Container.removeComponent(this);
        };
        return WAT_Component;
    }(WAT_Visual));
    // not in "MasterRegistry"
    //----------------------------------------------------------------------------//
    //                                WAT_Compound                                //
    //----------------------------------------------------------------------------//
    var WAT_Compound = /** @class */ (function (_super) {
        __extends(WAT_Compound, _super);
        function WAT_Compound() {
            return _super.call(this) || this;
        }
        Object.defineProperty(WAT_Compound.prototype, "Path", {
            /**** Path ****/
            get: function () {
                this.mustBeAttached();
                var Name = this.Name;
                return this.Container.Path + (Name == null ? '/#' + this.Index : '/' + Name);
            },
            set: function (_) { throwReadOnlyError('Path'); },
            enumerable: false,
            configurable: true
        });
        return WAT_Compound;
    }(WAT_Visual));
    applyMixinTo(WAT_Container, WAT_Compound);
    applyMixinTo(WAT_Component, WAT_Compound);
    MasterRegistry['plainCompound'.toLowerCase()] = {
        Category: 'Compound', Name: 'plainCompound',
        Group: null, Label: 'plain Compound',
        Classes: 'WAT Compound', Template: '', Initializer: function () { },
        initialGeometry: { Width: 80, Height: 30 },
        customPropertyDescriptorList: [],
        Prototype: new WAT_Compound(),
    };
    //----------------------------------------------------------------------------//
    //                                THC_Control                                 //
    //----------------------------------------------------------------------------//
    var WAT_Control = /** @class */ (function (_super) {
        __extends(WAT_Control, _super);
        function WAT_Control() {
            return _super.call(this) || this;
        }
        Object.defineProperty(WAT_Control.prototype, "Path", {
            /**** Path ****/
            get: function () {
                this.mustBeAttached();
                var Name = this.Name;
                return this.Container.Path + (Name == null ? '/#' + this.Index : '/' + Name);
            },
            set: function (_) { throwReadOnlyError('Path'); },
            enumerable: false,
            configurable: true
        });
        return WAT_Control;
    }(WAT_Visual));
    applyMixinTo(WAT_Component, WAT_Control);
    MasterRegistry['plainControl'.toLowerCase()] = {
        Category: 'Control', Name: 'plainControl',
        Group: null, Label: 'plain Control',
        Classes: 'WAT Control', Template: '', Initializer: function () { },
        initialGeometry: { Width: 80, Height: 30 },
        customPropertyDescriptorList: [],
        Prototype: new WAT_Control(),
    };
    /**** expectCardInApplet ****/
    function expectCardInApplet(Description, Argument, Applet) {
        WAT.expectCard(Description, Argument);
        if (Argument.Applet !== Applet)
            throwError('InvalidArgument: the given card is not part of the given applet');
    }
    /**** expectComponentInContainer ****/
    function expectComponentInContainer(Description, Argument, Container) {
        WAT.expectComponent(Description, Argument);
        if (Argument.Container !== Container)
            throwError('InvalidArgument: the given component is not part of the given container');
    }
    /**** HTMLView ****/
    var WAT_HTMLView = /** @class */ (function (_super) {
        __extends(WAT_HTMLView, _super);
        function WAT_HTMLView() {
            return _super.call(this) || this;
        }
        Object.defineProperty(WAT_HTMLView.prototype, "Value", {
            /**** Value ****/
            get: function () {
                return $(this.Peer).html();
            },
            set: function (newValue) {
                expectText('HTML value', newValue);
                var oldValue = this.Value;
                if (newValue !== oldValue) {
                    $(this.Peer).html(newValue);
                    $(this.Peer).trigger('value-changed', [newValue, oldValue]);
                }
            },
            enumerable: false,
            configurable: true
        });
        return WAT_HTMLView;
    }(WAT_Control));
    MasterRegistry['HTMLView'.toLowerCase()] = {
        Category: 'Control', Name: 'HTMLView',
        Group: undefined, Label: 'HTML View',
        Classes: 'WAT Control HTMLView',
        Template: '<b>HTML</b>',
        Initializer: function () { },
        customPropertyDescriptorList: [
            { Name: 'Value', Label: 'Value', EditorType: 'html-input' }
        ],
        initialGeometry: { Width: 80, Height: 30 },
        Prototype: new WAT_HTMLView(),
    };
    /**** ImageView ****/
    var WAT_ImageScalings = ['none', 'stretch', 'cover', 'contain'];
    var WAT_ImageAlignments = [
        'left top', 'center top', 'right top', 'left center', 'center center',
        'right center', 'left bottom', 'center bottom', 'right bottom'
    ];
    var WAT_ImageView = /** @class */ (function (_super) {
        __extends(WAT_ImageView, _super);
        function WAT_ImageView() {
            return _super.call(this) || this;
        }
        Object.defineProperty(WAT_ImageView.prototype, "Value", {
            /**** Value ****/
            get: function () {
                return $(this.SubPeer).attr('src');
            },
            set: function (newValue) {
                expectURL('image URL', newValue);
                var oldValue = this.Value;
                if (newValue !== oldValue) {
                    $(this.SubPeer).attr('src', newValue);
                    $(this.Peer).trigger('value-changed', [newValue, oldValue]);
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_ImageView.prototype, "Scaling", {
            /**** Scaling ****/
            get: function () {
                switch ($(this.SubPeer).css('object-fit')) {
                    case 'none': return 'none';
                    case 'fill': return 'stretch';
                    case 'cover': return 'cover';
                    case 'contain': return 'contain';
                    default: return 'contain';
                }
            },
            set: function (newScaling) {
                allowOneOf('image scaling', newScaling, WAT_ImageScalings);
                $(this.SubPeer).css('object-fit', newScaling === 'stretch' ? 'fill' : (newScaling || 'contain'));
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_ImageView.prototype, "Alignment", {
            /**** Alignment ****/
            get: function () {
                var Alignment = $(this.SubPeer).css('object-position').split(' ');
                if ((Alignment[0] === 'top') || (Alignment[0] === 'bottom')) {
                    Alignment.unshift('center');
                }
                if ('left center right'.indexOf(Alignment[0]) < 0) {
                    Alignment[0] = 'center';
                }
                if ('top center bottom'.indexOf(Alignment[1]) < 0) {
                    Alignment[1] = 'center';
                }
                return Alignment.join(' ');
            },
            set: function (newAlignment) {
                allowOneOf('image alignment', newAlignment, WAT_ImageAlignments);
                $(this.SubPeer).css('object-position', newAlignment || 'center');
            },
            enumerable: false,
            configurable: true
        });
        return WAT_ImageView;
    }(WAT_Control));
    $(function () {
        $(document.body).on('after-refresh', '.WAT.Control.ImageView', function () {
            var Visual = WAT.VisualOfElement(this);
            Visual['SubPeer'] = $(this).children()[0];
        });
    });
    MasterRegistry['ImageView'.toLowerCase()] = {
        Category: 'Control', Name: 'ImageView',
        Group: undefined, Label: 'Image View',
        Classes: 'WAT Control ImageView', Template: '<img/>',
        Initializer: function () { this.SubPeer = $(this.Peer).children()[0]; },
        customPropertyDescriptorList: [
            { Name: 'Value', Label: 'Value', EditorType: 'url-input' },
            { Name: 'Scaling', Label: 'Scaling', EditorType: 'drop-down',
                ValueList: ['none', 'fill', 'cover', 'contain'] },
            { Name: 'Alignment', Label: 'Alignment', EditorType: 'drop-down',
                ValueList: [
                    'top left', 'top', 'top right',
                    'left', 'center', 'right',
                    'bottom left', 'bottom', 'bottom right'
                ] },
        ],
        initialGeometry: { Width: 40, Height: 40 },
        Prototype: new WAT_ImageView(),
    };
    /**** TextView ****/
    var WAT_TextView = /** @class */ (function (_super) {
        __extends(WAT_TextView, _super);
        function WAT_TextView() {
            return _super.call(this) || this;
        }
        Object.defineProperty(WAT_TextView.prototype, "Value", {
            /**** Value ****/
            get: function () {
                return $(this.Peer).text();
            },
            set: function (newValue) {
                expectText('text value', newValue);
                var oldValue = this.Value;
                if (newValue !== oldValue) {
                    $(this.Peer).text(newValue);
                    $(this.Peer).trigger('value-changed', [newValue, oldValue]);
                }
            },
            enumerable: false,
            configurable: true
        });
        return WAT_TextView;
    }(WAT_Control));
    MasterRegistry['TextView'.toLowerCase()] = {
        Category: 'Control', Name: 'TextView',
        Group: undefined, Label: 'Text View',
        Classes: 'WAT Control TextView',
        Template: 'Text\nView',
        Initializer: function () { },
        customPropertyDescriptorList: [
            { Name: 'Value', Label: 'Value', EditorType: 'text-input' }
        ],
        initialGeometry: { Width: 80, Height: 30 },
        Prototype: new WAT_TextView(),
    };
    /**** TextlineView ****/
    var WAT_TextlineView = /** @class */ (function (_super) {
        __extends(WAT_TextlineView, _super);
        function WAT_TextlineView() {
            return _super.call(this) || this;
        }
        Object.defineProperty(WAT_TextlineView.prototype, "Value", {
            /**** Value ****/
            get: function () {
                return $(this.Peer).text();
            },
            set: function (newValue) {
                expectTextline('text value', newValue);
                var oldValue = this.Value;
                if (newValue !== oldValue) {
                    $(this.Peer).text(newValue);
                    $(this.Peer).trigger('value-changed', [newValue, oldValue]);
                }
            },
            enumerable: false,
            configurable: true
        });
        return WAT_TextlineView;
    }(WAT_Control));
    MasterRegistry['TextlineView'.toLowerCase()] = {
        Category: 'Control', Name: 'TextlineView',
        Group: undefined, Label: 'Textline View',
        Classes: 'WAT Control TextlineView',
        Template: 'Textline View',
        Initializer: function () { },
        customPropertyDescriptorList: [
            { Name: 'Value', Label: 'Value', EditorType: 'textline-input' }
        ],
        initialGeometry: { Width: 90, Height: 30 },
        Prototype: new WAT_TextlineView(),
    };
    /**** IFrameView ****/
    var WAT_IFrameView = /** @class */ (function (_super) {
        __extends(WAT_IFrameView, _super);
        function WAT_IFrameView() {
            return _super.call(this) || this;
        }
        Object.defineProperty(WAT_IFrameView.prototype, "Value", {
            /**** Value ****/
            get: function () {
                return $(this.SubPeer).attr('src');
            },
            set: function (newValue) {
                expectURL('IFrame URL', newValue);
                var oldValue = this.Value;
                if (newValue !== oldValue) {
                    $(this.SubPeer).attr('src', newValue);
                    $(this.Peer).trigger('value-changed', [newValue, oldValue]);
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_IFrameView.prototype, "Title", {
            /**** Title ****/
            get: function () {
                return $(this.SubPeer).attr('title');
            },
            set: function (newTitle) {
                allowTextline('IFrame Title', newTitle);
                if (newTitle == null) {
                    $(this.SubPeer).removeAttr('title');
                }
                else {
                    $(this.SubPeer).attr('title', newTitle);
                }
            },
            enumerable: false,
            configurable: true
        });
        return WAT_IFrameView;
    }(WAT_Control));
    $(function () {
        $(document.body).on('after-refresh', '.WAT.Control.IFrameView', function () {
            var Visual = WAT.VisualOfElement(this);
            Visual['SubPeer'] = $(this).children()[0];
        });
    });
    MasterRegistry['IFrameView'.toLowerCase()] = {
        Category: 'Control', Name: 'IFrameView',
        Group: undefined, Label: 'IFrame View',
        Classes: 'WAT Control IFrameView',
        Template: '<iframe class="WAT-Content"></iframe>',
        Initializer: function () { this.SubPeer = $(this.Peer).children()[0]; },
        customPropertyDescriptorList: [
            { Name: 'Value', Label: 'Value', EditorType: 'url-input' },
            { Name: 'Title', Label: 'Title', EditorType: 'textline-input' }
        ],
        initialGeometry: { Width: 80, Height: 60 },
        Prototype: new WAT_IFrameView(),
    };
    WAT.WAT_SpellCheckings = ['default', 'enabled', 'disabled'];
    /**** nativePushButton ****/
    var WAT_nativePushButton = /** @class */ (function (_super) {
        __extends(WAT_nativePushButton, _super);
        function WAT_nativePushButton() {
            return _super.call(this) || this;
        }
        Object.defineProperty(WAT_nativePushButton.prototype, "Value", {
            /**** Value ****/
            get: function () {
                return $(this.SubPeer).html();
            },
            set: function (newValue) {
                expectText('button label', newValue);
                var oldValue = this.Value;
                if (newValue !== oldValue) {
                    $(this.SubPeer).html(newValue);
                    $(this.Peer).trigger('value-changed', [newValue, oldValue]);
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_nativePushButton.prototype, "Label", {
            /**** Label ****/
            get: function () { return this.Value; },
            set: function (newLabel) { this.Value = newLabel; },
            enumerable: false,
            configurable: true
        });
        return WAT_nativePushButton;
    }(WAT_Control));
    $(function () {
        $(document.body).on('click', '.WAT.Control.nativePushButton > button', function () {
            var SubPeer = $(this);
            SubPeer.parent().trigger('triggered');
        });
        $(document.body).on('after-refresh', '.WAT.Control.nativePushButton', function () {
            var Visual = WAT.VisualOfElement(this);
            Visual['SubPeer'] = $(this).children()[0];
        });
    });
    MasterRegistry['nativePushButton'.toLowerCase()] = {
        Category: 'Control', Name: 'nativePushButton',
        Group: 'native Controls', Label: 'PushButton',
        Classes: 'WAT Control nativePushButton',
        Template: '<button class="WAT-Content"></button>',
        Initializer: function () { this.SubPeer = $(this.Peer).children()[0]; },
        customPropertyDescriptorList: [
            { Name: 'Value', Label: 'Value', EditorType: 'html-input' }
        ],
        initialGeometry: { Width: 80, Height: 30 },
        Prototype: new WAT_nativePushButton(),
    };
    /**** nativeCheckbox ****/
    WAT.WAT_CheckboxValues = ['indeterminate', 'unchecked', 'checked', true, false, null];
    var WAT_nativeCheckbox = /** @class */ (function (_super) {
        __extends(WAT_nativeCheckbox, _super);
        function WAT_nativeCheckbox() {
            return _super.call(this) || this;
        }
        Object.defineProperty(WAT_nativeCheckbox.prototype, "Value", {
            /**** Value ****/
            get: function () {
                return ($(this.SubPeer).prop('indeterminate')
                    ? 'indeterminate'
                    : ($(this.SubPeer).prop('checked') ? 'checked' : 'unchecked'));
            },
            set: function (newValue) {
                allowOneOf('checkbox value', newValue, WAT.WAT_CheckboxValues);
                var oldValue = this.Value;
                if (newValue !== oldValue) {
                    var SubPeer = $(this.SubPeer);
                    switch (newValue) {
                        case 'checked':
                        case true:
                            SubPeer.prop('checked', true);
                            SubPeer.prop('indeterminate', false);
                            break;
                        case 'unchecked':
                        case false:
                            SubPeer.prop('checked', false);
                            SubPeer.prop('indeterminate', false);
                            break;
                        case 'indeterminate':
                        case null:
                        case undefined:
                        default:
                            SubPeer.prop('indeterminate', true);
                            break;
                    }
                    $(this.Peer).trigger('value-changed', [newValue, oldValue]);
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_nativeCheckbox.prototype, "isChecked", {
            /**** isChecked ****/
            get: function () {
                return $(this.SubPeer).prop('checked');
            },
            set: function (newCheck) {
                expectBoolean('"checked" value', newCheck);
                this.Value = (newCheck == true ? 'checked' : 'unchecked');
            },
            enumerable: false,
            configurable: true
        });
        /**** check/uncheck ****/
        WAT_nativeCheckbox.prototype.check = function () { this.Value = 'checked'; };
        WAT_nativeCheckbox.prototype.uncheck = function () { this.Value = 'unchecked'; };
        Object.defineProperty(WAT_nativeCheckbox.prototype, "isIndeterminate", {
            /**** isIndeterminate ****/
            get: function () {
                return $(this.SubPeer).prop('indeterminate');
            },
            set: function (newValue) {
                expectBoolean('"indeterminate" value', newValue);
                if ($(this.SubPeer).prop('indeterminate') !== newValue) {
                    this.Value = (newValue == true
                        ? 'indeterminate'
                        : ($(this.SubPeer).prop('checked') ? 'checked' : 'unchecked'));
                }
            },
            enumerable: false,
            configurable: true
        });
        return WAT_nativeCheckbox;
    }(WAT_Control));
    $(function () {
        $(document.body).on('input', '.WAT.Control.nativeCheckbox > input', function () {
            var SubPeer = $(this);
            SubPeer.parent().trigger('value-changed', [SubPeer.val()]);
        });
        $(document.body).on('after-refresh', '.WAT.Control.nativeCheckbox', function () {
            var Visual = WAT.VisualOfElement(this);
            Visual['SubPeer'] = $(this).children()[0];
        });
        $(document.body).on('before-serialization', '.WAT.Control.nativeCheckbox', function () {
            var Visual = WAT.VisualOfElement(this);
            $(this).attr('value', Visual.Value);
        });
        $(document.body).on('after-deserialization', '.WAT.Control.nativeCheckbox', function () {
            var Value = $(this).attr('value');
            if (Value != null) {
                var Visual = WAT.VisualOfElement(this);
                Visual.Value = Value;
            }
        });
    });
    MasterRegistry['nativeCheckbox'.toLowerCase()] = {
        Category: 'Control', Name: 'nativeCheckbox',
        Group: 'native Controls', Label: 'Checkbox',
        Classes: 'WAT Control nativeCheckbox',
        Template: '<input type="checkbox">',
        Initializer: function () { this.SubPeer = $(this.Peer).children()[0]; },
        customPropertyDescriptorList: [
            { Name: 'Value', Label: 'Value', EditorType: 'drop-down',
                ValueList: ['checked', 'unchecked', 'indeterminate'] }
        ],
        initialGeometry: { Width: 80, Height: 30 },
        Prototype: new WAT_nativeCheckbox(),
    };
    /**** nativeRadiobutton ****/
    WAT.WAT_RadiobuttonValues = ['unchecked', 'checked', true, false];
    var WAT_nativeRadiobutton = /** @class */ (function (_super) {
        __extends(WAT_nativeRadiobutton, _super);
        function WAT_nativeRadiobutton() {
            return _super.call(this) || this;
        }
        Object.defineProperty(WAT_nativeRadiobutton.prototype, "Value", {
            /**** Value ****/
            get: function () {
                return ($(this.SubPeer).prop('checked') ? 'checked' : 'unchecked');
            },
            set: function (newValue) {
                expectOneOf('radio button value', newValue, WAT.WAT_RadiobuttonValues);
                var oldValue = this.Value;
                if (newValue !== oldValue) {
                    var GroupName = this.GroupName, GroupValue = this.GroupValue;
                    if ((GroupName == null) || (GroupValue == null)) { // radio w/o group
                        var SubPeer = $(this.SubPeer);
                        switch (newValue) {
                            case 'checked':
                            case true:
                                SubPeer.prop('checked', true);
                                break;
                            case 'unchecked':
                            case false:
                                SubPeer.prop('checked', false);
                        }
                        $(this.Peer).trigger('value-changed', [newValue, oldValue]);
                    }
                    else { // for radiobutton w/ group
                        var RadiosInGroup = $('input[type="radio"][name="' + GroupName + '"]');
                        var RadiosToCheck_1 = (newValue === 'checked'
                            ? RadiosInGroup.filter('[value="' + GroupValue + '"]').first()
                            : $());
                        RadiosInGroup.each(function () {
                            if (this === RadiosToCheck_1[0]) {
                                this.checked = true;
                                $(this).parent().trigger('value-changed', ['checked', 'unchecked']);
                            }
                            else {
                                if (this.checked) {
                                    this.checked = false;
                                    $(this).parent().trigger('value-changed', ['unchecked', 'checked']);
                                }
                            }
                        });
                    }
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_nativeRadiobutton.prototype, "GroupName", {
            /**** GroupName ****/
            get: function () {
                return $(this.SubPeer).attr('name');
            },
            set: function (newName) {
                WAT.allowName('radio button value', newName);
                if (this.SubPeer.checked) {
                    $('input[type="radio"][name="' + newName + '"]:checked').each(function () {
                        this.checked = false;
                        $(this).parent().trigger('value-changed', ['unchecked', 'checked']);
                    });
                }
                $(this.SubPeer).attr('name', newName);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_nativeRadiobutton.prototype, "GroupValue", {
            /**** GroupValue ****/
            get: function () {
                return $(this.SubPeer).attr('value');
            },
            set: function (newValue) {
                allowTextline('radio button value', newValue);
                var oldValue = this.GroupValue;
                if (oldValue === newValue) {
                    return;
                }
                if (newValue == null) {
                    $(this.SubPeer).removeAttr('value');
                }
                else {
                    if (newValue.indexOf('"') >= 0)
                        throwError('InvalidArgument: a "group value" must not contain any double quotes');
                    $(this.SubPeer).attr('value', newValue);
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_nativeRadiobutton.prototype, "ValueOfGroup", {
            /**** ValueOfGroup ****/
            get: function () {
                var GroupName = this.GroupName;
                if (GroupName == null) {
                    return (this.isChecked ? this.GroupValue : '');
                }
                else {
                    return $('input[type="radio"][name="' + GroupName + '"]:checked').val();
                }
            },
            set: function (newValue) {
                allowTextline('radio button value', newValue);
                if (newValue.indexOf('"') >= 0)
                    throwError('InvalidArgument: a "group value" must not contain any double quotes');
                var GroupName = this.GroupName;
                if (GroupName == null)
                    throwError('MissingGroupName: no "group name" set');
                var oldValue = this.ValueOfGroup;
                if (oldValue === newValue) {
                    return;
                }
                var RadiosInGroup = $('input[type="radio"][name="' + GroupName + '"]');
                if (RadiosInGroup.length > 0) {
                    var RadiosToCheck_2 = RadiosInGroup.filter('[value="' + newValue + '"]').first();
                    RadiosInGroup.each(function () {
                        if (this === RadiosToCheck_2[0]) {
                            this.checked = true;
                            $(this).parent().trigger('value-changed', ['checked', 'unchecked']);
                        }
                        else {
                            if (this.checked) {
                                this.checked = false;
                                $(this).parent().trigger('value-changed', ['unchecked', 'checked']);
                            }
                        }
                    });
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_nativeRadiobutton.prototype, "isChecked", {
            /**** isChecked ****/
            get: function () {
                return $(this.SubPeer).prop('checked');
            },
            set: function (newCheck) {
                expectBoolean('"checked" value', newCheck);
                this.Value = (newCheck == true ? 'checked' : 'unchecked');
            },
            enumerable: false,
            configurable: true
        });
        /**** check/uncheck ****/
        WAT_nativeRadiobutton.prototype.check = function () { this.Value = 'checked'; };
        WAT_nativeRadiobutton.prototype.uncheck = function () { this.Value = 'unchecked'; };
        return WAT_nativeRadiobutton;
    }(WAT_Control));
    $(function () {
        $(document.body).on('input', '.WAT.Control.nativeRadiobutton > input', function () {
            var SubPeer = $(this);
            SubPeer.parent().trigger('value-changed', [SubPeer.val()]);
        });
        $(document.body).on('after-refresh', '.WAT.Control.nativeRadiobutton', function () {
            var Visual = WAT.VisualOfElement(this);
            Visual['SubPeer'] = $(this).children()[0];
        });
        $(document.body).on('before-serialization', '.WAT.Control.nativeRadiobutton', function () {
            var Visual = WAT.VisualOfElement(this);
            $(this).attr('value', Visual.Value);
        });
        $(document.body).on('after-deserialization', '.WAT.Control.nativeRadiobutton', function () {
            var Value = $(this).attr('value');
            if (Value != null) {
                var Visual = WAT.VisualOfElement(this);
                Visual.Value = Value;
            }
        });
    });
    MasterRegistry['nativeRadiobutton'.toLowerCase()] = {
        Category: 'Control', Name: 'nativeRadiobutton',
        Group: 'native Controls', Label: 'Radiobutton',
        Classes: 'WAT Control nativeRadiobutton',
        Template: '<input type="radio">',
        Initializer: function () { this.SubPeer = $(this.Peer).children()[0]; },
        customPropertyDescriptorList: [
            { Name: 'Value', Label: 'Value', EditorType: 'drop-down',
                ValueList: ['checked', 'unchecked'] },
            { Name: 'GroupName', Label: 'Group Name', EditorType: 'textline-input' },
            { Name: 'GroupValue', Label: 'Group Value', EditorType: 'textline-input' },
            { Name: 'ValueOfGroup', Label: 'Value of Group', EditorType: 'textline-input' }
        ],
        initialGeometry: { Width: 80, Height: 30 },
        Prototype: new WAT_nativeRadiobutton(),
    };
    /**** nativeGauge ****/
    var WAT_nativeGauge = /** @class */ (function (_super) {
        __extends(WAT_nativeGauge, _super);
        function WAT_nativeGauge() {
            return _super.call(this) || this;
        }
        Object.defineProperty(WAT_nativeGauge.prototype, "Value", {
            /**** Value ****/
            get: function () {
                return parseFloat($(this.SubPeer).val());
            },
            set: function (newValue) {
                expectFiniteNumber('gauge value', newValue);
                var oldValue = this.Value;
                if (newValue !== oldValue) {
                    $(this.SubPeer).val(newValue.toString(10));
                    $(this.Peer).trigger('value-changed', [newValue, oldValue]);
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_nativeGauge.prototype, "Minimum", {
            /**** Minimum ****/
            get: function () {
                return parseFloat($(this.SubPeer).attr('min') || '0');
            },
            set: function (newValue) {
                allowFiniteNumber('minimum value', newValue);
                if (newValue == null) {
                    $(this.SubPeer).removeAttr('min');
                }
                else {
                    $(this.SubPeer).attr('min', newValue);
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_nativeGauge.prototype, "Maximum", {
            /**** Maximum ****/
            get: function () {
                return parseFloat($(this.SubPeer).attr('max') || '1');
            },
            set: function (newValue) {
                allowFiniteNumber('maximum value', newValue);
                if (newValue == null) {
                    $(this.SubPeer).removeAttr('max');
                }
                else {
                    $(this.SubPeer).attr('max', newValue);
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_nativeGauge.prototype, "lowerBound", {
            /**** lowerBound ****/
            get: function () {
                var SubPeer = $(this.SubPeer);
                return parseFloat((SubPeer.attr('low') || SubPeer.attr('min')));
            },
            set: function (newValue) {
                allowFiniteNumber('lower bound value', newValue);
                if (newValue == null) {
                    $(this.SubPeer).removeAttr('low');
                }
                else {
                    $(this.SubPeer).attr('low', newValue);
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_nativeGauge.prototype, "upperBound", {
            /**** upperBound ****/
            get: function () {
                var SubPeer = $(this.SubPeer);
                return parseFloat((SubPeer.attr('high') || SubPeer.attr('max')));
            },
            set: function (newValue) {
                allowFiniteNumber('upper bound value', newValue);
                if (newValue == null) {
                    $(this.SubPeer).removeAttr('high');
                }
                else {
                    $(this.SubPeer).attr('high', newValue);
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_nativeGauge.prototype, "Optimum", {
            /**** Optimum ****/
            get: function () {
                var Candidate = $(this.SubPeer).attr('optimum');
                return (Candidate == null ? undefined : parseFloat(Candidate));
            },
            set: function (newValue) {
                allowFiniteNumber('optimum value', newValue);
                if (newValue == null) {
                    $(this.SubPeer).removeAttr('optimum');
                }
                else {
                    $(this.SubPeer).attr('optimum', newValue);
                }
            },
            enumerable: false,
            configurable: true
        });
        return WAT_nativeGauge;
    }(WAT_Control));
    $(function () {
        $(document.body).on('after-refresh', '.WAT.Control.nativeGauge', function () {
            var Visual = WAT.VisualOfElement(this);
            Visual['SubPeer'] = $(this).children()[0];
        });
    });
    MasterRegistry['nativeGauge'.toLowerCase()] = {
        Category: 'Control', Name: 'nativeGauge',
        Group: 'native Controls', Label: 'Gauge',
        Classes: 'WAT Control nativeGauge',
        Template: '<meter class="WAT-Content" style="width:100%"></meter>',
        Initializer: function () { this.SubPeer = $(this.Peer).children()[0]; },
        customPropertyDescriptorList: [
            { Name: 'Value', Label: 'Value', EditorType: 'number-input' },
            { Name: 'Minimum', Label: 'Minimum', EditorType: 'number-input' },
            { Name: 'lowerBound', Label: 'lower Bound', EditorType: 'number-input' },
            { Name: 'Optimum', Label: 'Optimum', EditorType: 'number-input' },
            { Name: 'upperBound', Label: 'upper Bound', EditorType: 'number-input' },
            { Name: 'Maximum', Label: 'Maximum', EditorType: 'number-input' }
        ],
        initialGeometry: { Width: 80, Height: 30 },
        Prototype: new WAT_nativeGauge(),
    };
    /**** nativeProgressbar ****/
    var WAT_nativeProgressbar = /** @class */ (function (_super) {
        __extends(WAT_nativeProgressbar, _super);
        function WAT_nativeProgressbar() {
            return _super.call(this) || this;
        }
        Object.defineProperty(WAT_nativeProgressbar.prototype, "Value", {
            /**** Value ****/
            get: function () {
                return parseFloat($(this.SubPeer).val());
            },
            set: function (newValue) {
                expectFiniteNumber('progressbar value', newValue);
                var oldValue = this.Value;
                if (newValue !== oldValue) {
                    $(this.SubPeer).val(newValue.toString(10));
                    $(this.Peer).trigger('value-changed', [newValue, oldValue]);
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_nativeProgressbar.prototype, "Minimum", {
            /**** Minimum ****/
            get: function () { return 0; },
            set: function (newValue) { throwReadOnlyError('Minimum'); },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_nativeProgressbar.prototype, "Maximum", {
            /**** Maximum ****/
            get: function () {
                return parseFloat($(this.SubPeer).attr('max') || '1');
            },
            set: function (newValue) {
                allowNumberInRange('maximum value', newValue, 0);
                if (newValue == null) {
                    $(this.SubPeer).removeAttr('max');
                }
                else {
                    $(this.SubPeer).attr('max', newValue);
                }
            },
            enumerable: false,
            configurable: true
        });
        return WAT_nativeProgressbar;
    }(WAT_Control));
    $(function () {
        $(document.body).on('after-refresh', '.WAT.Control.nativeProgressbar', function () {
            var Visual = WAT.VisualOfElement(this);
            Visual['SubPeer'] = $(this).children()[0];
        });
    });
    MasterRegistry['nativeProgressbar'.toLowerCase()] = {
        Category: 'Control', Name: 'nativeProgressbar',
        Group: 'native Controls', Label: 'Progressbar',
        Classes: 'WAT Control nativeProgressbar',
        Template: '<progress class="WAT-Content" style="width:100%"></progress>',
        Initializer: function () { this.SubPeer = $(this.Peer).children()[0]; },
        customPropertyDescriptorList: [
            { Name: 'Value', Label: 'Value', EditorType: 'number-input', minValue: 0 },
            { Name: 'Maximum', Label: 'Maximum', EditorType: 'number-input', minValue: 0 }
        ],
        initialGeometry: { Width: 80, Height: 30 },
        Prototype: new WAT_nativeProgressbar(),
    };
    /**** nativeSlider ****/
    var HashmarkPattern = /^\s*(\d+(?:[.]\d+)?|\d*[.](?:\d*))(?:\s*:\s*([^\x00-\x1F\x7F-\x9F\u2028\u2029\uFFF9-\uFFFB]+))?$/;
    function HashmarkMatcher(Value) {
        return HashmarkPattern.test(Value);
    }
    var WAT_nativeSlider = /** @class */ (function (_super) {
        __extends(WAT_nativeSlider, _super);
        function WAT_nativeSlider() {
            return _super.call(this) || this;
        }
        Object.defineProperty(WAT_nativeSlider.prototype, "Value", {
            /**** Value ****/
            get: function () {
                return parseFloat($(this.SubPeer).val());
            },
            set: function (newValue) {
                expectFiniteNumber('slider value', newValue);
                var oldValue = this.Value;
                if (newValue !== oldValue) {
                    $(this.SubPeer).val(newValue.toString(10));
                    $(this.Peer).trigger('value-changed', [newValue, oldValue]);
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_nativeSlider.prototype, "Minimum", {
            /**** Minimum ****/
            get: function () {
                var Candidate = $(this.SubPeer).attr('min');
                return (Candidate == null ? undefined : parseFloat(Candidate));
            },
            set: function (newMinimum) {
                allowFiniteNumber('minimum value', newMinimum);
                if (newMinimum == null) {
                    $(this.SubPeer).removeAttr('min');
                }
                else {
                    $(this.SubPeer).attr('min', newMinimum);
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_nativeSlider.prototype, "Maximum", {
            /**** Maximum ****/
            get: function () {
                var Candidate = $(this.SubPeer).attr('max');
                return (Candidate == null ? undefined : parseFloat(Candidate));
            },
            set: function (newMaximum) {
                allowFiniteNumber('maximum value', newMaximum);
                if (newMaximum == null) {
                    $(this.SubPeer).removeAttr('max');
                }
                else {
                    $(this.SubPeer).attr('max', newMaximum);
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_nativeSlider.prototype, "Stepping", {
            /**** Stepping ****/
            get: function () {
                var Candidate = $(this.SubPeer).attr('step');
                return (Candidate === 'any'
                    ? undefined
                    : (Candidate == null ? 1 : parseFloat(Candidate)));
            },
            set: function (newStepping) {
                if (newStepping === 'any') {
                    $(this.SubPeer).attr('step', 'any');
                }
                else {
                    allowFiniteNumber('stepping value', newStepping);
                    if (newStepping == null) {
                        $(this.SubPeer).removeAttr('step');
                    }
                    else {
                        $(this.SubPeer).attr('step', newStepping);
                    }
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_nativeSlider.prototype, "Hashmarks", {
            /**** Hashmarks ****/
            get: function () {
                var Result = [];
                var ListId = $(this.SubPeer).attr('list');
                if (ListId != null) {
                    $('#' + ListId).children('option').each(function () {
                        var Option = $(this);
                        var Value = Option.attr('value'), Label = Option.attr('label');
                        Result.push((Value === Label) || (Label == null)
                            ? Value
                            : (Value + ':' + Label));
                    });
                }
                return Result;
            },
            set: function (newHashmarks) {
                allowListSatisfying('list of hashmarks', newHashmarks, HashmarkMatcher);
                var ListId = $(this.SubPeer).attr('list');
                if ((newHashmarks == null) || (newHashmarks.length === 0)) {
                    if ((ListId != null) && $('#' + ListId).is('datalist')) {
                        $('#' + ListId).remove();
                        $(this.SubPeer).removeAttr('list');
                    }
                }
                else {
                    if ((ListId == null) || !$('#' + ListId).is('datalist')) {
                        ListId = newUniqueId();
                        $(this.SubPeer).attr('list', ListId);
                    }
                    var ListElement = $('#' + ListId);
                    if (ListElement.length === 0) {
                        ListElement = $('<datalist id="' + ListId + '"></datalist>');
                        ListElement.insertAfter($(this.SubPeer));
                    }
                    else {
                        ListElement.empty();
                    }
                    for (var i = 0, l = newHashmarks.length; i < l; i++) {
                        var Match = HashmarkPattern.exec(newHashmarks[i]);
                        if (Match == null) {
                            continue;
                        }
                        ListElement.append('<option value="' + Match[1] + '"' +
                            (Match[2] == null ? '' : (' label="' + HTMLsafe(Match[2]) + '"')) +
                            '></option>');
                    }
                }
            },
            enumerable: false,
            configurable: true
        });
        return WAT_nativeSlider;
    }(WAT_Control));
    $(function () {
        $(document.body).on('input', '.WAT.Control.nativeSlider > input', function () {
            var SubPeer = $(this);
            SubPeer.parent().trigger('value-changed', [parseFloat($(this.SubPeer).val())]);
        });
        $(document.body).on('after-refresh', '.WAT.Control.nativeSlider', function () {
            var Visual = WAT.VisualOfElement(this);
            Visual['SubPeer'] = $(this).children()[0];
        });
    });
    MasterRegistry['nativeSlider'.toLowerCase()] = {
        Category: 'Control', Name: 'nativeSlider',
        Group: 'native Controls', Label: 'Slider',
        Classes: 'WAT Control nativeSlider',
        Template: '<input type="range" class="WAT-Content">',
        Initializer: function () { this.SubPeer = $(this.Peer).children()[0]; },
        customPropertyDescriptorList: [
            { Name: 'Value', Label: 'Value', EditorType: 'number-input' },
            { Name: 'Minimum', Label: 'Minimum', EditorType: 'number-input' },
            { Name: 'Maximum', Label: 'Maximum', EditorType: 'number-input' },
            { Name: 'Stepping', Label: 'Stepping', EditorType: 'number-input' },
            { Name: 'Hashmarks', Label: 'Hashmarks', EditorType: 'linelist-input' }
        ],
        initialGeometry: { Width: 80, Height: 30 },
        Prototype: new WAT_nativeSlider(),
    };
    /**** nativeTextlineInput ****/
    var WAT_nativeTextlineInput = /** @class */ (function (_super) {
        __extends(WAT_nativeTextlineInput, _super);
        function WAT_nativeTextlineInput() {
            return _super.call(this) || this;
        }
        Object.defineProperty(WAT_nativeTextlineInput.prototype, "Value", {
            /**** Value ****/
            get: function () {
                return $(this.SubPeer).val();
            },
            set: function (newValue) {
                allowTextline('text line', newValue);
                var oldValue = this.Value;
                if (newValue !== oldValue) {
                    $(this.SubPeer).val(newValue || '');
                    $(this.Peer).trigger('value-changed', [newValue, oldValue]);
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_nativeTextlineInput.prototype, "minLength", {
            /**** minLength ****/
            get: function () {
                return parseInt($(this.SubPeer).attr('minlength') || '0', 10);
            },
            set: function (newMinLength) {
                allowOrdinal('minimal length', newMinLength);
                $(this.SubPeer).attr('minlength', newMinLength || 0);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_nativeTextlineInput.prototype, "Maximum", {
            /**** Maximum ****/
            get: function () {
                var Candidate = $(this.SubPeer).attr('maxlength');
                return (Candidate == null ? Infinity : parseInt(Candidate, 10));
            },
            set: function (newMaxLength) {
                allowOrdinal('maximum length', newMaxLength);
                if (newMaxLength == null) {
                    $(this.SubPeer).removeAttr('maxlength');
                }
                else {
                    $(this.SubPeer).attr('maxlength', newMaxLength);
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_nativeTextlineInput.prototype, "Pattern", {
            /**** Pattern ****/
            get: function () {
                return $(this.SubPeer).attr('pattern');
            },
            set: function (newPattern) {
                expectTextline('input pattern', newPattern);
                if (newPattern == null) {
                    $(this.SubPeer).removeAttr('pattern');
                }
                else {
                    $(this.SubPeer).attr('pattern', newPattern);
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_nativeTextlineInput.prototype, "Placeholder", {
            /**** Placeholder ****/
            get: function () {
                return $(this.SubPeer).attr('placeholder');
            },
            set: function (newPlaceholder) {
                expectTextline('input placeholder', newPlaceholder);
                if (newPlaceholder == null) {
                    $(this.SubPeer).removeAttr('placeholder');
                }
                else {
                    $(this.SubPeer).attr('placeholder', newPlaceholder);
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_nativeTextlineInput.prototype, "isReadonly", {
            /**** isReadonly ****/
            get: function () {
                return ($(this.SubPeer).attr('readonly') != null);
            },
            set: function (newFlag) {
                expectBoolean('readonly flag', newFlag);
                if (newFlag == false) {
                    $(this.SubPeer).removeAttr('readonly');
                }
                else {
                    $(this.SubPeer).attr('readonly', 'true');
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_nativeTextlineInput.prototype, "SpellChecking", {
            /**** SpellChecking ****/
            get: function () {
                switch ($(this.SubPeer).attr('spellcheck')) {
                    case 'false': return 'disabled';
                    case 'true': return 'enabled';
                    case '':
                    default: return 'default';
                }
            },
            set: function (newSpellChecking) {
                allowOneOf('spell checking setting', newSpellChecking, WAT.WAT_SpellCheckings);
                switch (newSpellChecking) {
                    case 'disabled':
                        $(this.SubPeer).attr('spellcheck', 'false');
                        break;
                    case 'enabled':
                        $(this.SubPeer).attr('spellcheck', 'true');
                        break;
                    case 'default':
                    default: $(this.SubPeer).removeAttr('spellcheck');
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_nativeTextlineInput.prototype, "Suggestions", {
            /**** Suggestions ****/
            get: function () {
                var Result = [];
                var ListId = $(this.SubPeer).attr('list');
                if (ListId != null) {
                    $('#' + ListId).children('option').each(function () {
                        Result.push($(this).attr('value'));
                    });
                }
                return Result;
            },
            set: function (newSuggestions) {
                allowListSatisfying('list of suggestions', newSuggestions, ValueIsTextline);
                var ListId = $(this.SubPeer).attr('list');
                if ((newSuggestions == null) || (newSuggestions.length === 0)) {
                    if (ListId != null) {
                        $('#' + ListId).remove();
                        $(this.SubPeer).removeAttr('list');
                    }
                }
                else {
                    if ((ListId == null) || !$('#' + ListId).is('datalist')) {
                        ListId = newUniqueId();
                        $(this.SubPeer).attr('list', ListId);
                    }
                    var ListElement = $('#' + ListId);
                    if (ListElement.length === 0) {
                        ListElement = $('<datalist id="' + ListId + '"></datalist>');
                        ListElement.insertAfter($(this.SubPeer));
                    }
                    else {
                        ListElement.empty();
                    }
                    for (var i = 0, l = newSuggestions.length; i < l; i++) {
                        ListElement.append('<option value="' + newSuggestions[i] + '"></option>');
                    }
                }
            },
            enumerable: false,
            configurable: true
        });
        return WAT_nativeTextlineInput;
    }(WAT_Control));
    $(function () {
        $(document.body).on('input', '.WAT.Control.nativeTextlineInput > input', function () {
            var SubPeer = $(this);
            SubPeer.parent().trigger('value-changed', [SubPeer.val()]);
        });
        $(document.body).on('after-refresh', '.WAT.Control.nativeTextlineInput', function () {
            var Visual = WAT.VisualOfElement(this);
            Visual['SubPeer'] = $(this).children()[0];
        });
    });
    MasterRegistry['nativeTextlineInput'.toLowerCase()] = {
        Category: 'Control', Name: 'nativeTextlineInput',
        Group: 'native Controls', Label: 'Textline Input',
        Classes: 'WAT Control nativeTextlineInput',
        Template: '<input type="text" class="WAT-Content">',
        Initializer: function () { this.SubPeer = $(this.Peer).children()[0]; },
        customPropertyDescriptorList: [
            { Name: 'isReadonly', Label: 'read-only', EditorType: 'checkbox' },
            { Name: 'Value', Label: 'Value', EditorType: 'textline-input' },
            { Name: 'minLength', Label: 'min. Length', EditorType: 'number-input', minValue: 0, StepValue: 1 },
            { Name: 'maxLength', Label: 'max. Length', EditorType: 'number-input', minValue: 0, StepValue: 1 },
            { Name: 'Pattern', Label: 'Pattern', EditorType: 'textline-input' },
            { Name: 'Placeholder', Label: 'Placeholder', EditorType: 'textline-input' },
            { Name: 'SpellChecking', Label: 'SpellChecking', EditorType: 'drop-down',
                ValueList: ['default', 'enabled', 'disabled'] },
            { Name: 'Suggestions', Label: 'Suggestions', EditorType: 'linelist-input' }
        ],
        initialGeometry: { Width: 80, Height: 30 },
        Prototype: new WAT_nativeTextlineInput(),
    };
    /**** nativePasswordInput ****/
    var WAT_nativePasswordInput = /** @class */ (function (_super) {
        __extends(WAT_nativePasswordInput, _super);
        function WAT_nativePasswordInput() {
            return _super.call(this) || this;
        }
        Object.defineProperty(WAT_nativePasswordInput.prototype, "Value", {
            /**** Value ****/
            get: function () {
                return $(this.SubPeer).val();
            },
            set: function (newValue) {
                allowTextline('password', newValue);
                var oldValue = this.Value;
                if (newValue !== oldValue) {
                    $(this.SubPeer).val(newValue || '');
                    $(this.Peer).trigger('value-changed', [newValue, oldValue]);
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_nativePasswordInput.prototype, "minLength", {
            /**** minLength ****/
            get: function () {
                return parseInt($(this.SubPeer).attr('minlength') || '0', 10);
            },
            set: function (newMinLength) {
                allowOrdinal('minimal length', newMinLength);
                $(this.SubPeer).attr('minlength', newMinLength || 0);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_nativePasswordInput.prototype, "Maximum", {
            /**** Maximum ****/
            get: function () {
                var Candidate = $(this.SubPeer).attr('maxlength');
                return (Candidate == null ? Infinity : parseInt(Candidate, 10));
            },
            set: function (newMaxLength) {
                allowOrdinal('maximum length', newMaxLength);
                if (newMaxLength == null) {
                    $(this.SubPeer).removeAttr('maxlength');
                }
                else {
                    $(this.SubPeer).attr('maxlength', newMaxLength);
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_nativePasswordInput.prototype, "Pattern", {
            /**** Pattern ****/
            get: function () {
                return $(this.SubPeer).attr('pattern');
            },
            set: function (newPattern) {
                expectTextline('input pattern', newPattern);
                if (newPattern == null) {
                    $(this.SubPeer).removeAttr('pattern');
                }
                else {
                    $(this.SubPeer).attr('pattern', newPattern);
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_nativePasswordInput.prototype, "Placeholder", {
            /**** Placeholder ****/
            get: function () {
                return $(this.SubPeer).attr('placeholder');
            },
            set: function (newPlaceholder) {
                expectTextline('input placeholder', newPlaceholder);
                if (newPlaceholder == null) {
                    $(this.SubPeer).removeAttr('placeholder');
                }
                else {
                    $(this.SubPeer).attr('placeholder', newPlaceholder);
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_nativePasswordInput.prototype, "isReadonly", {
            /**** isReadonly ****/
            get: function () {
                return ($(this.SubPeer).attr('readonly') != null);
            },
            set: function (newFlag) {
                expectBoolean('readonly flag', newFlag);
                if (newFlag == false) {
                    $(this.SubPeer).removeAttr('readonly');
                }
                else {
                    $(this.SubPeer).attr('readonly', 'true');
                }
            },
            enumerable: false,
            configurable: true
        });
        return WAT_nativePasswordInput;
    }(WAT_Control));
    $(function () {
        $(document.body).on('input', '.WAT.Control.nativePasswordInput > input', function () {
            var SubPeer = $(this);
            SubPeer.parent().trigger('value-changed', [SubPeer.val()]);
        });
        $(document.body).on('after-refresh', '.WAT.Control.nativePasswordInput', function () {
            var Visual = WAT.VisualOfElement(this);
            Visual['SubPeer'] = $(this).children()[0];
        });
    });
    MasterRegistry['nativePasswordInput'.toLowerCase()] = {
        Category: 'Control', Name: 'nativePasswordInput',
        Group: 'native Controls', Label: 'Password Input',
        Classes: 'WAT Control nativePasswordInput',
        Template: '<input type="password" class="WAT-Content">',
        Initializer: function () { this.SubPeer = $(this.Peer).children()[0]; },
        customPropertyDescriptorList: [
            { Name: 'isReadonly', Label: 'read-only', EditorType: 'checkbox' },
            { Name: 'Value', Label: 'Value', EditorType: 'textline-input' },
            { Name: 'minLength', Label: 'min. Length', EditorType: 'number-input', minValue: 0, StepValue: 1 },
            { Name: 'maxLength', Label: 'max. Length', EditorType: 'number-input', minValue: 0, StepValue: 1 },
            { Name: 'Pattern', Label: 'Pattern', EditorType: 'textline-input' },
            { Name: 'Placeholder', Label: 'Placeholder', EditorType: 'textline-input' }
        ],
        initialGeometry: { Width: 80, Height: 30 },
        Prototype: new WAT_nativePasswordInput(),
    };
    /**** nativeNumberInput ****/
    var WAT_nativeNumberInput = /** @class */ (function (_super) {
        __extends(WAT_nativeNumberInput, _super);
        function WAT_nativeNumberInput() {
            return _super.call(this) || this;
        }
        Object.defineProperty(WAT_nativeNumberInput.prototype, "Value", {
            /**** Value ****/
            get: function () {
                return parseFloat($(this.SubPeer).val());
            },
            set: function (newValue) {
                allowFiniteNumber('number value', newValue);
                var oldValue = this.Value;
                if (newValue !== oldValue) {
                    $(this.SubPeer).val(newValue == null ? '' : newValue.toString(10));
                    $(this.Peer).trigger('value-changed', [newValue, oldValue]);
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_nativeNumberInput.prototype, "Minimum", {
            /**** Minimum ****/
            get: function () {
                var Candidate = $(this.SubPeer).attr('min');
                return (Candidate == null ? undefined : parseFloat(Candidate));
            },
            set: function (newMinimum) {
                allowFiniteNumber('minimum value', newMinimum);
                if (newMinimum == null) {
                    $(this.SubPeer).removeAttr('min');
                }
                else {
                    $(this.SubPeer).attr('min', newMinimum);
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_nativeNumberInput.prototype, "Maximum", {
            /**** Maximum ****/
            get: function () {
                var Candidate = $(this.SubPeer).attr('max');
                return (Candidate == null ? undefined : parseFloat(Candidate));
            },
            set: function (newMaximum) {
                allowFiniteNumber('maximum value', newMaximum);
                if (newMaximum == null) {
                    $(this.SubPeer).removeAttr('max');
                }
                else {
                    $(this.SubPeer).attr('max', newMaximum);
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_nativeNumberInput.prototype, "Stepping", {
            /**** Stepping ****/
            get: function () {
                var Candidate = $(this.SubPeer).attr('step');
                return (Candidate === 'any'
                    ? undefined
                    : (Candidate == null ? 1 : parseFloat(Candidate)));
            },
            set: function (newStepping) {
                if (newStepping === 'any') {
                    $(this.SubPeer).attr('step', 'any');
                }
                else {
                    allowFiniteNumber('stepping value', newStepping);
                    if (newStepping == null) {
                        $(this.SubPeer).removeAttr('step');
                    }
                    else {
                        $(this.SubPeer).attr('step', newStepping);
                    }
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_nativeNumberInput.prototype, "Placeholder", {
            /**** Placeholder ****/
            get: function () {
                return $(this.SubPeer).attr('placeholder');
            },
            set: function (newPlaceholder) {
                expectTextline('input placeholder', newPlaceholder);
                if (newPlaceholder == null) {
                    $(this.SubPeer).removeAttr('placeholder');
                }
                else {
                    $(this.SubPeer).attr('placeholder', newPlaceholder);
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_nativeNumberInput.prototype, "isReadonly", {
            /**** isReadonly ****/
            get: function () {
                return ($(this.SubPeer).attr('readonly') != null);
            },
            set: function (newFlag) {
                expectBoolean('readonly flag', newFlag);
                if (newFlag == false) {
                    $(this.SubPeer).removeAttr('readonly');
                }
                else {
                    $(this.SubPeer).attr('readonly', 'true');
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_nativeNumberInput.prototype, "Suggestions", {
            /**** Suggestions ****/
            get: function () {
                var Result = [];
                var ListId = $(this.SubPeer).attr('list');
                if (ListId != null) {
                    $('#' + ListId).children('option').each(function () {
                        Result.push(parseFloat($(this).attr('value')));
                    });
                }
                return Result;
            },
            set: function (newSuggestions) {
                allowListSatisfying('list of suggestions', newSuggestions, ValueIsFiniteNumber);
                var ListId = $(this.SubPeer).attr('list');
                if ((newSuggestions == null) || (newSuggestions.length === 0)) {
                    if (ListId != null) {
                        $('#' + ListId).remove();
                        $(this.SubPeer).removeAttr('list');
                    }
                }
                else {
                    if ((ListId == null) || !$('#' + ListId).is('datalist')) {
                        ListId = newUniqueId();
                        $(this.SubPeer).attr('list', ListId);
                    }
                    var ListElement = $('#' + ListId);
                    if (ListElement.length === 0) {
                        ListElement = $('<datalist id="' + ListId + '"></datalist>');
                        ListElement.insertAfter($(this.SubPeer));
                    }
                    else {
                        ListElement.empty();
                    }
                    for (var i = 0, l = newSuggestions.length; i < l; i++) {
                        ListElement.append('<option value="' + newSuggestions[i] + '"></option>');
                    }
                }
            },
            enumerable: false,
            configurable: true
        });
        return WAT_nativeNumberInput;
    }(WAT_Control));
    $(function () {
        $(document.body).on('input', '.WAT.Control.nativeNumberInput > input', function () {
            var SubPeer = $(this);
            SubPeer.parent().trigger('value-changed', [parseFloat(SubPeer.val())]);
        });
        $(document.body).on('after-refresh', '.WAT.Control.nativeNumberInput', function () {
            var Visual = WAT.VisualOfElement(this);
            Visual['SubPeer'] = $(this).children()[0];
        });
    });
    MasterRegistry['nativeNumberInput'.toLowerCase()] = {
        Category: 'Control', Name: 'nativeNumberInput',
        Group: 'native Controls', Label: 'Number Input',
        Classes: 'WAT Control nativeNumberInput',
        Template: '<input type="number" class="WAT-Content">',
        Initializer: function () { this.SubPeer = $(this.Peer).children()[0]; },
        customPropertyDescriptorList: [
            { Name: 'isReadonly', Label: 'read-only', EditorType: 'checkbox' },
            { Name: 'Value', Label: 'Value', EditorType: 'number-input' },
            { Name: 'Minimum', Label: 'Minimum', EditorType: 'number-input' },
            { Name: 'Maximum', Label: 'Maximum', EditorType: 'number-input' },
            { Name: 'Stepping', Label: 'Stepping', EditorType: 'number-input' },
            { Name: 'Placeholder', Label: 'Placeholder', EditorType: 'textline-input' },
            { Name: 'Suggestions', Label: 'Suggestions', EditorType: 'numberlist-input' }
        ],
        initialGeometry: { Width: 80, Height: 30 },
        Prototype: new WAT_nativeNumberInput(),
    };
    /**** nativePhoneNumberInput ****/
    var WAT_nativePhoneNumberInput = /** @class */ (function (_super) {
        __extends(WAT_nativePhoneNumberInput, _super);
        function WAT_nativePhoneNumberInput() {
            return _super.call(this) || this;
        }
        Object.defineProperty(WAT_nativePhoneNumberInput.prototype, "Value", {
            /**** Value ****/
            get: function () {
                return $(this.SubPeer).val();
            },
            set: function (newValue) {
                allowTextline('phone number', newValue);
                var oldValue = this.Value;
                if (newValue !== oldValue) {
                    $(this.SubPeer).val(newValue || '');
                    $(this.Peer).trigger('value-changed', [newValue, oldValue]);
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_nativePhoneNumberInput.prototype, "minLength", {
            /**** minLength ****/
            get: function () {
                return parseInt($(this.SubPeer).attr('minlength') || '0', 10);
            },
            set: function (newMinLength) {
                allowOrdinal('minimal length', newMinLength);
                $(this.SubPeer).attr('minlength', newMinLength || 0);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_nativePhoneNumberInput.prototype, "Maximum", {
            /**** Maximum ****/
            get: function () {
                var Candidate = $(this.SubPeer).attr('maxlength');
                return (Candidate == null ? Infinity : parseInt(Candidate, 10));
            },
            set: function (newMaxLength) {
                allowOrdinal('maximum length', newMaxLength);
                if (newMaxLength == null) {
                    $(this.SubPeer).removeAttr('maxlength');
                }
                else {
                    $(this.SubPeer).attr('maxlength', newMaxLength);
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_nativePhoneNumberInput.prototype, "Pattern", {
            /**** Pattern ****/
            get: function () {
                return $(this.SubPeer).attr('pattern');
            },
            set: function (newPattern) {
                expectTextline('input pattern', newPattern);
                if (newPattern == null) {
                    $(this.SubPeer).removeAttr('pattern');
                }
                else {
                    $(this.SubPeer).attr('pattern', newPattern);
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_nativePhoneNumberInput.prototype, "Placeholder", {
            /**** Placeholder ****/
            get: function () {
                return $(this.SubPeer).attr('placeholder');
            },
            set: function (newPlaceholder) {
                expectTextline('input placeholder', newPlaceholder);
                if (newPlaceholder == null) {
                    $(this.SubPeer).removeAttr('placeholder');
                }
                else {
                    $(this.SubPeer).attr('placeholder', newPlaceholder);
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_nativePhoneNumberInput.prototype, "isReadonly", {
            /**** isReadonly ****/
            get: function () {
                return ($(this.SubPeer).attr('readonly') != null);
            },
            set: function (newFlag) {
                expectBoolean('readonly flag', newFlag);
                if (newFlag == false) {
                    $(this.SubPeer).removeAttr('readonly');
                }
                else {
                    $(this.SubPeer).attr('readonly', 'true');
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_nativePhoneNumberInput.prototype, "Suggestions", {
            /**** Suggestions ****/
            get: function () {
                var Result = [];
                var ListId = $(this.SubPeer).attr('list');
                if (ListId != null) {
                    $('#' + ListId).children('option').each(function () {
                        Result.push($(this).attr('value'));
                    });
                }
                return Result;
            },
            set: function (newSuggestions) {
                allowListSatisfying('list of suggestions', newSuggestions, ValueIsTextline);
                var ListId = $(this.SubPeer).attr('list');
                if ((newSuggestions == null) || (newSuggestions.length === 0)) {
                    if (ListId != null) {
                        $('#' + ListId).remove();
                        $(this.SubPeer).removeAttr('list');
                    }
                }
                else {
                    if ((ListId == null) || !$('#' + ListId).is('datalist')) {
                        ListId = newUniqueId();
                        $(this.SubPeer).attr('list', ListId);
                    }
                    var ListElement = $('#' + ListId);
                    if (ListElement.length === 0) {
                        ListElement = $('<datalist id="' + ListId + '"></datalist>');
                        ListElement.insertAfter($(this.SubPeer));
                    }
                    else {
                        ListElement.empty();
                    }
                    for (var i = 0, l = newSuggestions.length; i < l; i++) {
                        ListElement.append('<option value="' + newSuggestions[i] + '"></option>');
                    }
                }
            },
            enumerable: false,
            configurable: true
        });
        return WAT_nativePhoneNumberInput;
    }(WAT_Control));
    $(function () {
        $(document.body).on('input', '.WAT.Control.nativePhoneNumberInput > input', function () {
            var SubPeer = $(this);
            SubPeer.parent().trigger('value-changed', [SubPeer.val()]);
        });
        $(document.body).on('after-refresh', '.WAT.Control.nativePhoneNumberInput', function () {
            var Visual = WAT.VisualOfElement(this);
            Visual['SubPeer'] = $(this).children()[0];
        });
    });
    MasterRegistry['nativePhoneNumberInput'.toLowerCase()] = {
        Category: 'Control', Name: 'nativePhoneNumberInput',
        Group: 'native Controls', Label: 'Phone Number Input',
        Classes: 'WAT Control nativePhoneNumberInput',
        Template: '<input type="tel" class="WAT-Content">',
        Initializer: function () { this.SubPeer = $(this.Peer).children()[0]; },
        customPropertyDescriptorList: [
            { Name: 'isReadonly', Label: 'read-only', EditorType: 'checkbox' },
            { Name: 'Value', Label: 'Value', EditorType: 'phone-number-input' },
            { Name: 'minLength', Label: 'min. Length', EditorType: 'number-input', minValue: 0, StepValue: 1 },
            { Name: 'maxLength', Label: 'max. Length', EditorType: 'number-input', minValue: 0, StepValue: 1 },
            { Name: 'Pattern', Label: 'Pattern', EditorType: 'textline-input' },
            { Name: 'Placeholder', Label: 'Placeholder', EditorType: 'textline-input' },
            { Name: 'Suggestions', Label: 'Suggestions', EditorType: 'linelist-input' }
        ],
        initialGeometry: { Width: 80, Height: 30 },
        Prototype: new WAT_nativePhoneNumberInput(),
    };
    /**** nativeEMailAddressInput ****/
    var WAT_nativeEMailAddressInput = /** @class */ (function (_super) {
        __extends(WAT_nativeEMailAddressInput, _super);
        function WAT_nativeEMailAddressInput() {
            return _super.call(this) || this;
        }
        Object.defineProperty(WAT_nativeEMailAddressInput.prototype, "Value", {
            /**** Value ****/
            get: function () {
                return $(this.SubPeer).val();
            },
            set: function (newValue) {
                if ((newValue != null) && $(this.SubPeer).attr('multiple')) {
                    var ValueList = newValue.split(',');
                    for (var i = 0, l = ValueList.length; i < l; i++) {
                        if (!ValueIsEMailAddress(ValueList[i])) {
                            throwError('InvalidArgument: item #' + (i + 1) + ' is not a valid email address');
                        }
                    }
                }
                else {
                    allowEMailAddress('input value', newValue);
                }
                var oldValue = this.Value;
                if (newValue !== oldValue) {
                    $(this.SubPeer).val(newValue || '');
                    $(this.Peer).trigger('value-changed', [newValue, oldValue]);
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_nativeEMailAddressInput.prototype, "multiple", {
            /**** multiple ****/
            get: function () {
                return ($(this.SubPeer).attr('multiple') != null);
            },
            set: function (newFlag) {
                expectBoolean('multiplicity flag', newFlag);
                if (newFlag == false) {
                    $(this.SubPeer).removeAttr('multiple');
                }
                else {
                    $(this.SubPeer).attr('multiple', 'true');
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_nativeEMailAddressInput.prototype, "minLength", {
            /**** minLength ****/
            get: function () {
                return parseInt($(this.SubPeer).attr('minlength') || '0', 10);
            },
            set: function (newMinLength) {
                allowOrdinal('minimal length', newMinLength);
                $(this.SubPeer).attr('minlength', newMinLength || 0);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_nativeEMailAddressInput.prototype, "Maximum", {
            /**** Maximum ****/
            get: function () {
                var Candidate = $(this.SubPeer).attr('maxlength');
                return (Candidate == null ? Infinity : parseInt(Candidate, 10));
            },
            set: function (newMaxLength) {
                allowOrdinal('maximum length', newMaxLength);
                if (newMaxLength == null) {
                    $(this.SubPeer).removeAttr('maxlength');
                }
                else {
                    $(this.SubPeer).attr('maxlength', newMaxLength);
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_nativeEMailAddressInput.prototype, "Pattern", {
            /**** Pattern ****/
            get: function () {
                return $(this.SubPeer).attr('pattern');
            },
            set: function (newPattern) {
                expectTextline('input pattern', newPattern);
                if (newPattern == null) {
                    $(this.SubPeer).removeAttr('pattern');
                }
                else {
                    $(this.SubPeer).attr('pattern', newPattern);
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_nativeEMailAddressInput.prototype, "Placeholder", {
            /**** Placeholder ****/
            get: function () {
                return $(this.SubPeer).attr('placeholder');
            },
            set: function (newPlaceholder) {
                expectTextline('input placeholder', newPlaceholder);
                if (newPlaceholder == null) {
                    $(this.SubPeer).removeAttr('placeholder');
                }
                else {
                    $(this.SubPeer).attr('placeholder', newPlaceholder);
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_nativeEMailAddressInput.prototype, "isReadonly", {
            /**** isReadonly ****/
            get: function () {
                return ($(this.SubPeer).attr('readonly') != null);
            },
            set: function (newFlag) {
                expectBoolean('readonly flag', newFlag);
                if (newFlag == false) {
                    $(this.SubPeer).removeAttr('readonly');
                }
                else {
                    $(this.SubPeer).attr('readonly', 'true');
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_nativeEMailAddressInput.prototype, "Suggestions", {
            /**** Suggestions ****/
            get: function () {
                var Result = [];
                var ListId = $(this.SubPeer).attr('list');
                if (ListId != null) {
                    $('#' + ListId).children('option').each(function () {
                        Result.push($(this).attr('value'));
                    });
                }
                return Result;
            },
            set: function (newSuggestions) {
                allowListSatisfying('list of suggestions', newSuggestions, ValueIsTextline);
                var ListId = $(this.SubPeer).attr('list');
                if ((newSuggestions == null) || (newSuggestions.length === 0)) {
                    if (ListId != null) {
                        $('#' + ListId).remove();
                        $(this.SubPeer).removeAttr('list');
                    }
                }
                else {
                    if ((ListId == null) || !$('#' + ListId).is('datalist')) {
                        ListId = newUniqueId();
                        $(this.SubPeer).attr('list', ListId);
                    }
                    var ListElement = $('#' + ListId);
                    if (ListElement.length === 0) {
                        ListElement = $('<datalist id="' + ListId + '"></datalist>');
                        ListElement.insertAfter($(this.SubPeer));
                    }
                    else {
                        ListElement.empty();
                    }
                    for (var i = 0, l = newSuggestions.length; i < l; i++) {
                        ListElement.append('<option value="' + newSuggestions[i] + '"></option>');
                    }
                }
            },
            enumerable: false,
            configurable: true
        });
        return WAT_nativeEMailAddressInput;
    }(WAT_Control));
    $(function () {
        $(document.body).on('input', '.WAT.Control.nativeEMailAddressInput > input', function () {
            var SubPeer = $(this);
            SubPeer.parent().trigger('value-changed', [SubPeer.val()]);
        });
        $(document.body).on('after-refresh', '.WAT.Control.nativeEMailAddressInput', function () {
            var Visual = WAT.VisualOfElement(this);
            Visual['SubPeer'] = $(this).children()[0];
        });
    });
    MasterRegistry['nativeEMailAddressInput'.toLowerCase()] = {
        Category: 'Control', Name: 'nativeEMailAddressInput',
        Group: 'native Controls', Label: 'EMail Address Input',
        Classes: 'WAT Control nativeEMailAddressInput',
        Template: '<input type="email" class="WAT-Content">',
        Initializer: function () { this.SubPeer = $(this.Peer).children()[0]; },
        customPropertyDescriptorList: [
            { Name: 'isReadonly', Label: 'read-only', EditorType: 'checkbox' },
            { Name: 'multiple', Label: 'multiple', EditorType: 'checkbox' },
            { Name: 'Value', Label: 'Value', EditorType: 'email-address-input' },
            { Name: 'minLength', Label: 'min. Length', EditorType: 'number-input', minValue: 0, StepValue: 1 },
            { Name: 'maxLength', Label: 'max. Length', EditorType: 'number-input', minValue: 0, StepValue: 1 },
            { Name: 'Pattern', Label: 'Pattern', EditorType: 'textline-input' },
            { Name: 'Placeholder', Label: 'Placeholder', EditorType: 'textline-input' },
            { Name: 'Suggestions', Label: 'Suggestions', EditorType: 'linelist-input' }
        ],
        initialGeometry: { Width: 80, Height: 30 },
        Prototype: new WAT_nativeEMailAddressInput(),
    };
    /**** nativeURLInput ****/
    var WAT_nativeURLInput = /** @class */ (function (_super) {
        __extends(WAT_nativeURLInput, _super);
        function WAT_nativeURLInput() {
            return _super.call(this) || this;
        }
        Object.defineProperty(WAT_nativeURLInput.prototype, "Value", {
            /**** Value ****/
            get: function () {
                return $(this.SubPeer).val();
            },
            set: function (newValue) {
                allowURL('URL', newValue);
                var oldValue = this.Value;
                if (newValue !== oldValue) {
                    $(this.SubPeer).val(newValue || '');
                    $(this.Peer).trigger('value-changed', [newValue, oldValue]);
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_nativeURLInput.prototype, "minLength", {
            /**** minLength ****/
            get: function () {
                return parseInt($(this.SubPeer).attr('minlength') || '0', 10);
            },
            set: function (newMinLength) {
                allowOrdinal('minimal length', newMinLength);
                $(this.SubPeer).attr('minlength', newMinLength || 0);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_nativeURLInput.prototype, "Maximum", {
            /**** Maximum ****/
            get: function () {
                var Candidate = $(this.SubPeer).attr('maxlength');
                return (Candidate == null ? Infinity : parseInt(Candidate, 10));
            },
            set: function (newMaxLength) {
                allowOrdinal('maximum length', newMaxLength);
                if (newMaxLength == null) {
                    $(this.SubPeer).removeAttr('maxlength');
                }
                else {
                    $(this.SubPeer).attr('maxlength', newMaxLength);
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_nativeURLInput.prototype, "Pattern", {
            /**** Pattern ****/
            get: function () {
                return $(this.SubPeer).attr('pattern');
            },
            set: function (newPattern) {
                expectTextline('input pattern', newPattern);
                if (newPattern == null) {
                    $(this.SubPeer).removeAttr('pattern');
                }
                else {
                    $(this.SubPeer).attr('pattern', newPattern);
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_nativeURLInput.prototype, "Placeholder", {
            /**** Placeholder ****/
            get: function () {
                return $(this.SubPeer).attr('placeholder');
            },
            set: function (newPlaceholder) {
                expectTextline('input placeholder', newPlaceholder);
                if (newPlaceholder == null) {
                    $(this.SubPeer).removeAttr('placeholder');
                }
                else {
                    $(this.SubPeer).attr('placeholder', newPlaceholder);
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_nativeURLInput.prototype, "isReadonly", {
            /**** isReadonly ****/
            get: function () {
                return ($(this.SubPeer).attr('readonly') != null);
            },
            set: function (newFlag) {
                expectBoolean('readonly flag', newFlag);
                if (newFlag == false) {
                    $(this.SubPeer).removeAttr('readonly');
                }
                else {
                    $(this.SubPeer).attr('readonly', 'true');
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_nativeURLInput.prototype, "Suggestions", {
            /**** Suggestions ****/
            get: function () {
                var Result = [];
                var ListId = $(this.SubPeer).attr('list');
                if (ListId != null) {
                    $('#' + ListId).children('option').each(function () {
                        Result.push($(this).attr('value'));
                    });
                }
                return Result;
            },
            set: function (newSuggestions) {
                allowListSatisfying('list of suggestions', newSuggestions, ValueIsURL);
                var ListId = $(this.SubPeer).attr('list');
                if ((newSuggestions == null) || (newSuggestions.length === 0)) {
                    if (ListId != null) {
                        $('#' + ListId).remove();
                        $(this.SubPeer).removeAttr('list');
                    }
                }
                else {
                    if ((ListId == null) || !$('#' + ListId).is('datalist')) {
                        ListId = newUniqueId();
                        $(this.SubPeer).attr('list', ListId);
                    }
                    var ListElement = $('#' + ListId);
                    if (ListElement.length === 0) {
                        ListElement = $('<datalist id="' + ListId + '"></datalist>');
                        ListElement.insertAfter($(this.SubPeer));
                    }
                    else {
                        ListElement.empty();
                    }
                    for (var i = 0, l = newSuggestions.length; i < l; i++) {
                        ListElement.append('<option value="' + newSuggestions[i] + '"></option>');
                    }
                }
            },
            enumerable: false,
            configurable: true
        });
        return WAT_nativeURLInput;
    }(WAT_Control));
    $(function () {
        $(document.body).on('input', '.WAT.Control.nativeURLInput > input', function () {
            var SubPeer = $(this);
            SubPeer.parent().trigger('value-changed', [SubPeer.val()]);
        });
        $(document.body).on('after-refresh', '.WAT.Control.nativeURLInput', function () {
            var Visual = WAT.VisualOfElement(this);
            Visual['SubPeer'] = $(this).children()[0];
        });
    });
    MasterRegistry['nativeURLInput'.toLowerCase()] = {
        Category: 'Control', Name: 'nativeURLInput',
        Group: 'native Controls', Label: 'URL Input',
        Classes: 'WAT Control nativeURLInput',
        Template: '<input type="url" class="WAT-Content">',
        Initializer: function () { this.SubPeer = $(this.Peer).children()[0]; },
        customPropertyDescriptorList: [
            { Name: 'isReadonly', Label: 'read-only', EditorType: 'checkbox' },
            { Name: 'Value', Label: 'Value', EditorType: 'url-input' },
            { Name: 'minLength', Label: 'min. Length', EditorType: 'number-input', minValue: 0, StepValue: 1 },
            { Name: 'maxLength', Label: 'max. Length', EditorType: 'number-input', minValue: 0, StepValue: 1 },
            { Name: 'Pattern', Label: 'Pattern', EditorType: 'textline-input' },
            { Name: 'Placeholder', Label: 'Placeholder', EditorType: 'textline-input' },
            { Name: 'Suggestions', Label: 'Suggestions', EditorType: 'linelist-input' }
        ],
        initialGeometry: { Width: 80, Height: 30 },
        Prototype: new WAT_nativeURLInput(),
    };
    /**** nativeDateInput ****/
    var DatePattern = '\\d{4}-\\d{2}-\\d{2}';
    var DateRegExp = /\d{4}-\d{2}-\d{2}/;
    function DateMatcher(Value) {
        return ValueIsStringMatching(Value, DateRegExp);
    }
    var WAT_nativeDateInput = /** @class */ (function (_super) {
        __extends(WAT_nativeDateInput, _super);
        function WAT_nativeDateInput() {
            return _super.call(this) || this;
        }
        Object.defineProperty(WAT_nativeDateInput.prototype, "Value", {
            /**** Value ****/
            get: function () {
                return $(this.SubPeer).val();
            },
            set: function (newValue) {
                allowStringMatching('date', newValue, DateRegExp);
                var oldValue = this.Value;
                if (newValue !== oldValue) {
                    $(this.SubPeer).val(newValue || '');
                    $(this.Peer).trigger('value-changed', [newValue, oldValue]);
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_nativeDateInput.prototype, "Minimum", {
            /**** Minimum ****/
            get: function () {
                return $(this.SubPeer).attr('min');
            },
            set: function (newMinimum) {
                allowStringMatching('earliest date', newMinimum, DateRegExp);
                if (newMinimum == null) {
                    $(this.SubPeer).removeAttr('min');
                }
                else {
                    $(this.SubPeer).attr('min', newMinimum);
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_nativeDateInput.prototype, "Maximum", {
            /**** Maximum ****/
            get: function () {
                return $(this.SubPeer).attr('max');
            },
            set: function (newMaximum) {
                allowStringMatching('latest date', newMaximum, DateRegExp);
                if (newMaximum == null) {
                    $(this.SubPeer).removeAttr('max');
                }
                else {
                    $(this.SubPeer).attr('max', newMaximum);
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_nativeDateInput.prototype, "Stepping", {
            /**** Stepping ****/
            get: function () {
                var Candidate = $(this.SubPeer).attr('step');
                return (Candidate === 'any'
                    ? undefined
                    : (Candidate == null ? 1 : parseFloat(Candidate)));
            },
            set: function (newStepping) {
                if (newStepping === 'any') {
                    $(this.SubPeer).attr('step', 'any');
                }
                else {
                    allowFiniteNumber('stepping value', newStepping);
                    if (newStepping == null) {
                        $(this.SubPeer).removeAttr('step');
                    }
                    else {
                        $(this.SubPeer).attr('step', newStepping);
                    }
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_nativeDateInput.prototype, "Placeholder", {
            /**** Placeholder ****/
            get: function () {
                return $(this.SubPeer).attr('placeholder');
            },
            set: function (newPlaceholder) {
                expectTextline('input placeholder', newPlaceholder);
                if (newPlaceholder == null) {
                    $(this.SubPeer).removeAttr('placeholder');
                }
                else {
                    $(this.SubPeer).attr('placeholder', newPlaceholder);
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_nativeDateInput.prototype, "isReadonly", {
            /**** isReadonly ****/
            get: function () {
                return ($(this.SubPeer).attr('readonly') != null);
            },
            set: function (newFlag) {
                expectBoolean('readonly flag', newFlag);
                if (newFlag == false) {
                    $(this.SubPeer).removeAttr('readonly');
                }
                else {
                    $(this.SubPeer).attr('readonly', 'true');
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_nativeDateInput.prototype, "Suggestions", {
            /**** Suggestions ****/
            get: function () {
                var Result = [];
                var ListId = $(this.SubPeer).attr('list');
                if (ListId != null) {
                    $('#' + ListId).children('option').each(function () {
                        Result.push($(this).attr('value'));
                    });
                }
                return Result;
            },
            set: function (newSuggestions) {
                allowListSatisfying('list of suggestions', newSuggestions, DateMatcher);
                var ListId = $(this.SubPeer).attr('list');
                if ((newSuggestions == null) || (newSuggestions.length === 0)) {
                    if (ListId != null) {
                        $('#' + ListId).remove();
                        $(this.SubPeer).removeAttr('list');
                    }
                }
                else {
                    if ((ListId == null) || !$('#' + ListId).is('datalist')) {
                        ListId = newUniqueId();
                        $(this.SubPeer).attr('list', ListId);
                    }
                    var ListElement = $('#' + ListId);
                    if (ListElement.length === 0) {
                        ListElement = $('<datalist id="' + ListId + '"></datalist>');
                        ListElement.insertAfter($(this.SubPeer));
                    }
                    else {
                        ListElement.empty();
                    }
                    for (var i = 0, l = newSuggestions.length; i < l; i++) {
                        ListElement.append('<option value="' + newSuggestions[i] + '"></option>');
                    }
                }
            },
            enumerable: false,
            configurable: true
        });
        return WAT_nativeDateInput;
    }(WAT_Control));
    $(function () {
        $(document.body).on('input', '.WAT.Control.nativeDateInput > input', function () {
            var SubPeer = $(this);
            SubPeer.parent().trigger('value-changed', [SubPeer.val()]);
        });
        $(document.body).on('after-refresh', '.WAT.Control.nativeDateInput', function () {
            var Visual = WAT.VisualOfElement(this);
            Visual['SubPeer'] = $(this).children()[0];
        });
    });
    MasterRegistry['nativeDateInput'.toLowerCase()] = {
        Category: 'Control', Name: 'nativeDateInput',
        Group: 'native Controls', Label: 'Date Input',
        Classes: 'WAT Control nativeDateInput',
        Template: '<input type="date" pattern="\\d{4}-\\d{2}-\\d{2}" class="WAT-Content">',
        Initializer: function () { this.SubPeer = $(this.Peer).children()[0]; },
        customPropertyDescriptorList: [
            { Name: 'isReadonly', Label: 'read-only', EditorType: 'checkbox' },
            { Name: 'Value', Label: 'Value', EditorType: 'date-input' },
            { Name: 'Minimum', Label: 'Minimum', EditorType: 'date-input' },
            { Name: 'Maximum', Label: 'Maximum', EditorType: 'date-input' },
            { Name: 'Stepping', Label: 'Stepping', EditorType: 'number-input' },
            { Name: 'Placeholder', Label: 'Placeholder', EditorType: 'textline-input' },
            { Name: 'Suggestions', Label: 'Suggestions', EditorType: 'linelist-input' }
        ],
        initialGeometry: { Width: 80, Height: 30 },
        Prototype: new WAT_nativeDateInput(),
    };
    /**** nativeMonthInput ****/
    var MonthPattern = '\\d{4}-\\d{2}';
    var MonthRegExp = /\d{4}-\d{2}/;
    function MonthMatcher(Value) {
        return ValueIsStringMatching(Value, MonthRegExp);
    }
    var WAT_nativeMonthInput = /** @class */ (function (_super) {
        __extends(WAT_nativeMonthInput, _super);
        function WAT_nativeMonthInput() {
            return _super.call(this) || this;
        }
        Object.defineProperty(WAT_nativeMonthInput.prototype, "Value", {
            /**** Value ****/
            get: function () {
                return $(this.SubPeer).val();
            },
            set: function (newValue) {
                allowStringMatching('month', newValue, MonthRegExp);
                var oldValue = this.Value;
                if (newValue !== oldValue) {
                    $(this.SubPeer).val(newValue || '');
                    $(this.Peer).trigger('value-changed', [newValue, oldValue]);
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_nativeMonthInput.prototype, "Minimum", {
            /**** Minimum ****/
            get: function () {
                return $(this.SubPeer).attr('min');
            },
            set: function (newMinimum) {
                allowStringMatching('earliest month', newMinimum, MonthRegExp);
                if (newMinimum == null) {
                    $(this.SubPeer).removeAttr('min');
                }
                else {
                    $(this.SubPeer).attr('min', newMinimum);
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_nativeMonthInput.prototype, "Maximum", {
            /**** Maximum ****/
            get: function () {
                return $(this.SubPeer).attr('max');
            },
            set: function (newMaximum) {
                allowStringMatching('latest month', newMaximum, MonthRegExp);
                if (newMaximum == null) {
                    $(this.SubPeer).removeAttr('max');
                }
                else {
                    $(this.SubPeer).attr('max', newMaximum);
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_nativeMonthInput.prototype, "Stepping", {
            /**** Stepping ****/
            get: function () {
                var Candidate = $(this.SubPeer).attr('step');
                return (Candidate === 'any'
                    ? undefined
                    : (Candidate == null ? 1 : parseFloat(Candidate)));
            },
            set: function (newStepping) {
                if (newStepping === 'any') {
                    $(this.SubPeer).attr('step', 'any');
                }
                else {
                    allowFiniteNumber('stepping value', newStepping);
                    if (newStepping == null) {
                        $(this.SubPeer).removeAttr('step');
                    }
                    else {
                        $(this.SubPeer).attr('step', newStepping);
                    }
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_nativeMonthInput.prototype, "Placeholder", {
            /**** Placeholder ****/
            get: function () {
                return $(this.SubPeer).attr('placeholder');
            },
            set: function (newPlaceholder) {
                expectTextline('input placeholder', newPlaceholder);
                if (newPlaceholder == null) {
                    $(this.SubPeer).removeAttr('placeholder');
                }
                else {
                    $(this.SubPeer).attr('placeholder', newPlaceholder);
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_nativeMonthInput.prototype, "isReadonly", {
            /**** isReadonly ****/
            get: function () {
                return ($(this.SubPeer).attr('readonly') != null);
            },
            set: function (newFlag) {
                expectBoolean('readonly flag', newFlag);
                if (newFlag == false) {
                    $(this.SubPeer).removeAttr('readonly');
                }
                else {
                    $(this.SubPeer).attr('readonly', 'true');
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_nativeMonthInput.prototype, "Suggestions", {
            /**** Suggestions ****/
            get: function () {
                var Result = [];
                var ListId = $(this.SubPeer).attr('list');
                if (ListId != null) {
                    $('#' + ListId).children('option').each(function () {
                        Result.push($(this).attr('value'));
                    });
                }
                return Result;
            },
            set: function (newSuggestions) {
                allowListSatisfying('list of suggestions', newSuggestions, MonthMatcher);
                var ListId = $(this.SubPeer).attr('list');
                if ((newSuggestions == null) || (newSuggestions.length === 0)) {
                    if (ListId != null) {
                        $('#' + ListId).remove();
                        $(this.SubPeer).removeAttr('list');
                    }
                }
                else {
                    if ((ListId == null) || !$('#' + ListId).is('datalist')) {
                        ListId = newUniqueId();
                        $(this.SubPeer).attr('list', ListId);
                    }
                    var ListElement = $('#' + ListId);
                    if (ListElement.length === 0) {
                        ListElement = $('<datalist id="' + ListId + '"></datalist>');
                        ListElement.insertAfter($(this.SubPeer));
                    }
                    else {
                        ListElement.empty();
                    }
                    for (var i = 0, l = newSuggestions.length; i < l; i++) {
                        ListElement.append('<option value="' + newSuggestions[i] + '"></option>');
                    }
                }
            },
            enumerable: false,
            configurable: true
        });
        return WAT_nativeMonthInput;
    }(WAT_Control));
    $(function () {
        $(document.body).on('input', '.WAT.Control.nativeMonthInput > input', function () {
            var SubPeer = $(this);
            SubPeer.parent().trigger('value-changed', [SubPeer.val()]);
        });
        $(document.body).on('after-refresh', '.WAT.Control.nativeMonthInput', function () {
            var Visual = WAT.VisualOfElement(this);
            Visual['SubPeer'] = $(this).children()[0];
        });
    });
    MasterRegistry['nativeMonthInput'.toLowerCase()] = {
        Category: 'Control', Name: 'nativeMonthInput',
        Group: 'native Controls', Label: 'Month Input',
        Classes: 'WAT Control nativeMonthInput',
        Template: '<input type="month" pattern="\\d{4}-\\d{2}" class="WAT-Content">',
        Initializer: function () { this.SubPeer = $(this.Peer).children()[0]; },
        customPropertyDescriptorList: [
            { Name: 'isReadonly', Label: 'read-only', EditorType: 'checkbox' },
            { Name: 'Value', Label: 'Value', EditorType: 'month-input' },
            { Name: 'Minimum', Label: 'Minimum', EditorType: 'month-input' },
            { Name: 'Maximum', Label: 'Maximum', EditorType: 'month-input' },
            { Name: 'Stepping', Label: 'Stepping', EditorType: 'number-input' },
            { Name: 'Placeholder', Label: 'Placeholder', EditorType: 'textline-input' },
            { Name: 'Suggestions', Label: 'Suggestions', EditorType: 'linelist-input' }
        ],
        initialGeometry: { Width: 80, Height: 30 },
        Prototype: new WAT_nativeMonthInput(),
    };
    /**** nativeWeekInput ****/
    var WeekPattern = '\\d{4}-W\\d{2}';
    var WeekRegExp = /\d{4}-W\d{2}/;
    function WeekMatcher(Value) {
        return ValueIsStringMatching(Value, WeekRegExp);
    }
    var WAT_nativeWeekInput = /** @class */ (function (_super) {
        __extends(WAT_nativeWeekInput, _super);
        function WAT_nativeWeekInput() {
            return _super.call(this) || this;
        }
        Object.defineProperty(WAT_nativeWeekInput.prototype, "Value", {
            /**** Value ****/
            get: function () {
                return $(this.SubPeer).val();
            },
            set: function (newValue) {
                allowStringMatching('week', newValue, WeekRegExp);
                var oldValue = this.Value;
                if (newValue !== oldValue) {
                    $(this.SubPeer).val(newValue || '');
                    $(this.Peer).trigger('value-changed', [newValue, oldValue]);
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_nativeWeekInput.prototype, "Minimum", {
            /**** Minimum ****/
            get: function () {
                return $(this.SubPeer).attr('min');
            },
            set: function (newMinimum) {
                allowStringMatching('earliest week', newMinimum, WeekRegExp);
                if (newMinimum == null) {
                    $(this.SubPeer).removeAttr('min');
                }
                else {
                    $(this.SubPeer).attr('min', newMinimum);
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_nativeWeekInput.prototype, "Maximum", {
            /**** Maximum ****/
            get: function () {
                return $(this.SubPeer).attr('max');
            },
            set: function (newMaximum) {
                allowStringMatching('latest week', newMaximum, WeekRegExp);
                if (newMaximum == null) {
                    $(this.SubPeer).removeAttr('max');
                }
                else {
                    $(this.SubPeer).attr('max', newMaximum);
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_nativeWeekInput.prototype, "Stepping", {
            /**** Stepping ****/
            get: function () {
                var Candidate = $(this.SubPeer).attr('step');
                return (Candidate === 'any'
                    ? undefined
                    : (Candidate == null ? 1 : parseFloat(Candidate)));
            },
            set: function (newStepping) {
                if (newStepping === 'any') {
                    $(this.SubPeer).attr('step', 'any');
                }
                else {
                    allowFiniteNumber('stepping value', newStepping);
                    if (newStepping == null) {
                        $(this.SubPeer).removeAttr('step');
                    }
                    else {
                        $(this.SubPeer).attr('step', newStepping);
                    }
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_nativeWeekInput.prototype, "Placeholder", {
            /**** Placeholder ****/
            get: function () {
                return $(this.SubPeer).attr('placeholder');
            },
            set: function (newPlaceholder) {
                expectTextline('input placeholder', newPlaceholder);
                if (newPlaceholder == null) {
                    $(this.SubPeer).removeAttr('placeholder');
                }
                else {
                    $(this.SubPeer).attr('placeholder', newPlaceholder);
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_nativeWeekInput.prototype, "isReadonly", {
            /**** isReadonly ****/
            get: function () {
                return ($(this.SubPeer).attr('readonly') != null);
            },
            set: function (newFlag) {
                expectBoolean('readonly flag', newFlag);
                if (newFlag == false) {
                    $(this.SubPeer).removeAttr('readonly');
                }
                else {
                    $(this.SubPeer).attr('readonly', 'true');
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_nativeWeekInput.prototype, "Suggestions", {
            /**** Suggestions ****/
            get: function () {
                var Result = [];
                var ListId = $(this.SubPeer).attr('list');
                if (ListId != null) {
                    $('#' + ListId).children('option').each(function () {
                        Result.push($(this).attr('value'));
                    });
                }
                return Result;
            },
            set: function (newSuggestions) {
                allowListSatisfying('list of suggestions', newSuggestions, WeekMatcher);
                var ListId = $(this.SubPeer).attr('list');
                if ((newSuggestions == null) || (newSuggestions.length === 0)) {
                    if (ListId != null) {
                        $('#' + ListId).remove();
                        $(this.SubPeer).removeAttr('list');
                    }
                }
                else {
                    if ((ListId == null) || !$('#' + ListId).is('datalist')) {
                        ListId = newUniqueId();
                        $(this.SubPeer).attr('list', ListId);
                    }
                    var ListElement = $('#' + ListId);
                    if (ListElement.length === 0) {
                        ListElement = $('<datalist id="' + ListId + '"></datalist>');
                        ListElement.insertAfter($(this.SubPeer));
                    }
                    else {
                        ListElement.empty();
                    }
                    for (var i = 0, l = newSuggestions.length; i < l; i++) {
                        ListElement.append('<option value="' + newSuggestions[i] + '"></option>');
                    }
                }
            },
            enumerable: false,
            configurable: true
        });
        return WAT_nativeWeekInput;
    }(WAT_Control));
    $(function () {
        $(document.body).on('input', '.WAT.Control.nativeWeekInput > input', function () {
            var SubPeer = $(this);
            SubPeer.parent().trigger('value-changed', [SubPeer.val()]);
        });
        $(document.body).on('after-refresh', '.WAT.Control.nativeWeekInput', function () {
            var Visual = WAT.VisualOfElement(this);
            Visual['SubPeer'] = $(this).children()[0];
        });
    });
    MasterRegistry['nativeWeekInput'.toLowerCase()] = {
        Category: 'Control', Name: 'nativeWeekInput',
        Group: 'native Controls', Label: 'Week Input',
        Classes: 'WAT Control nativeWeekInput',
        Template: '<input type="week" pattern="\\d{4}-W\\d{2}" class="WAT-Content">',
        Initializer: function () { this.SubPeer = $(this.Peer).children()[0]; },
        customPropertyDescriptorList: [
            { Name: 'isReadonly', Label: 'read-only', EditorType: 'checkbox' },
            { Name: 'Value', Label: 'Value', EditorType: 'week-input' },
            { Name: 'Minimum', Label: 'Minimum', EditorType: 'week-input' },
            { Name: 'Maximum', Label: 'Maximum', EditorType: 'week-input' },
            { Name: 'Stepping', Label: 'Stepping', EditorType: 'number-input' },
            { Name: 'Placeholder', Label: 'Placeholder', EditorType: 'textline-input' },
            { Name: 'Suggestions', Label: 'Suggestions', EditorType: 'linelist-input' }
        ],
        initialGeometry: { Width: 80, Height: 30 },
        Prototype: new WAT_nativeWeekInput(),
    };
    /**** nativeDateTimeInput ****/
    var DateTimePattern = '\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}';
    var DateTimeRegExp = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/;
    function DateTimeMatcher(Value) {
        return ValueIsStringMatching(Value, DateTimeRegExp);
    }
    var WAT_nativeDateTimeInput = /** @class */ (function (_super) {
        __extends(WAT_nativeDateTimeInput, _super);
        function WAT_nativeDateTimeInput() {
            return _super.call(this) || this;
        }
        Object.defineProperty(WAT_nativeDateTimeInput.prototype, "Value", {
            /**** Value ****/
            get: function () {
                return $(this.SubPeer).val();
            },
            set: function (newValue) {
                allowStringMatching('timestamp', newValue, DateTimeRegExp);
                var oldValue = this.Value;
                if (newValue !== oldValue) {
                    $(this.SubPeer).val(newValue || '');
                    $(this.Peer).trigger('value-changed', [newValue, oldValue]);
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_nativeDateTimeInput.prototype, "Minimum", {
            /**** Minimum ****/
            get: function () {
                return $(this.SubPeer).attr('min');
            },
            set: function (newMinimum) {
                allowStringMatching('earliest timestamp', newMinimum, DateTimeRegExp);
                if (newMinimum == null) {
                    $(this.SubPeer).removeAttr('min');
                }
                else {
                    $(this.SubPeer).attr('min', newMinimum);
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_nativeDateTimeInput.prototype, "Maximum", {
            /**** Maximum ****/
            get: function () {
                return $(this.SubPeer).attr('max');
            },
            set: function (newMaximum) {
                allowStringMatching('latest timestamp', newMaximum, DateTimeRegExp);
                if (newMaximum == null) {
                    $(this.SubPeer).removeAttr('max');
                }
                else {
                    $(this.SubPeer).attr('max', newMaximum);
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_nativeDateTimeInput.prototype, "Stepping", {
            /**** Stepping ****/
            get: function () {
                var Candidate = $(this.SubPeer).attr('step');
                return (Candidate === 'any'
                    ? undefined
                    : (Candidate == null ? 1 : parseFloat(Candidate)));
            },
            set: function (newStepping) {
                if (newStepping === 'any') {
                    $(this.SubPeer).attr('step', 'any');
                }
                else {
                    allowFiniteNumber('stepping value', newStepping);
                    if (newStepping == null) {
                        $(this.SubPeer).removeAttr('step');
                    }
                    else {
                        $(this.SubPeer).attr('step', newStepping);
                    }
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_nativeDateTimeInput.prototype, "Placeholder", {
            /**** Placeholder ****/
            get: function () {
                return $(this.SubPeer).attr('placeholder');
            },
            set: function (newPlaceholder) {
                expectTextline('input placeholder', newPlaceholder);
                if (newPlaceholder == null) {
                    $(this.SubPeer).removeAttr('placeholder');
                }
                else {
                    $(this.SubPeer).attr('placeholder', newPlaceholder);
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_nativeDateTimeInput.prototype, "isReadonly", {
            /**** isReadonly ****/
            get: function () {
                return ($(this.SubPeer).attr('readonly') != null);
            },
            set: function (newFlag) {
                expectBoolean('readonly flag', newFlag);
                if (newFlag == false) {
                    $(this.SubPeer).removeAttr('readonly');
                }
                else {
                    $(this.SubPeer).attr('readonly', 'true');
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_nativeDateTimeInput.prototype, "Suggestions", {
            /**** Suggestions ****/
            get: function () {
                var Result = [];
                var ListId = $(this.SubPeer).attr('list');
                if (ListId != null) {
                    $('#' + ListId).children('option').each(function () {
                        Result.push($(this).attr('value'));
                    });
                }
                return Result;
            },
            set: function (newSuggestions) {
                allowListSatisfying('list of suggestions', newSuggestions, DateTimeMatcher);
                var ListId = $(this.SubPeer).attr('list');
                if ((newSuggestions == null) || (newSuggestions.length === 0)) {
                    if (ListId != null) {
                        $('#' + ListId).remove();
                        $(this.SubPeer).removeAttr('list');
                    }
                }
                else {
                    if ((ListId == null) || !$('#' + ListId).is('datalist')) {
                        ListId = newUniqueId();
                        $(this.SubPeer).attr('list', ListId);
                    }
                    var ListElement = $('#' + ListId);
                    if (ListElement.length === 0) {
                        ListElement = $('<datalist id="' + ListId + '"></datalist>');
                        ListElement.insertAfter($(this.SubPeer));
                    }
                    else {
                        ListElement.empty();
                    }
                    for (var i = 0, l = newSuggestions.length; i < l; i++) {
                        ListElement.append('<option value="' + newSuggestions[i] + '"></option>');
                    }
                }
            },
            enumerable: false,
            configurable: true
        });
        return WAT_nativeDateTimeInput;
    }(WAT_Control));
    $(function () {
        $(document.body).on('input', '.WAT.Control.nativeDateTimeInput > input', function () {
            var SubPeer = $(this);
            SubPeer.parent().trigger('value-changed', [SubPeer.val()]);
        });
        $(document.body).on('after-refresh', '.WAT.Control.nativeDateTimeInput', function () {
            var Visual = WAT.VisualOfElement(this);
            Visual['SubPeer'] = $(this).children()[0];
        });
    });
    MasterRegistry['nativeDateTimeInput'.toLowerCase()] = {
        Category: 'Control', Name: 'nativeDateTimeInput',
        Group: 'native Controls', Label: 'Date and Time Input',
        Classes: 'WAT Control nativeDateTimeInput',
        Template: '<input type="datetime-local" pattern="\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}" class="WAT-Content">',
        Initializer: function () { this.SubPeer = $(this.Peer).children()[0]; },
        customPropertyDescriptorList: [
            { Name: 'isReadonly', Label: 'read-only', EditorType: 'checkbox' },
            { Name: 'Value', Label: 'Value', EditorType: 'date-time-input' },
            { Name: 'Minimum', Label: 'Minimum', EditorType: 'date-time-input' },
            { Name: 'Maximum', Label: 'Maximum', EditorType: 'date-time-input' },
            { Name: 'Stepping', Label: 'Stepping', EditorType: 'number-input' },
            { Name: 'Placeholder', Label: 'Placeholder', EditorType: 'textline-input' },
            { Name: 'Suggestions', Label: 'Suggestions', EditorType: 'linelist-input' }
        ],
        initialGeometry: { Width: 80, Height: 30 },
        Prototype: new WAT_nativeDateTimeInput(),
    };
    /**** nativeTimeInput ****/
    var TimePattern = '\\d{2}:\\d{2}';
    var TimeRegExp = /\d{2}:\d{2}/;
    function TimeMatcher(Value) {
        return ValueIsStringMatching(Value, TimeRegExp);
    }
    var WAT_nativeTimeInput = /** @class */ (function (_super) {
        __extends(WAT_nativeTimeInput, _super);
        function WAT_nativeTimeInput() {
            return _super.call(this) || this;
        }
        Object.defineProperty(WAT_nativeTimeInput.prototype, "Value", {
            /**** Value ****/
            get: function () {
                return $(this.SubPeer).val();
            },
            set: function (newValue) {
                allowStringMatching('time', newValue, TimeRegExp);
                var oldValue = this.Value;
                if (newValue !== oldValue) {
                    $(this.SubPeer).val(newValue || '');
                    $(this.Peer).trigger('value-changed', [newValue, oldValue]);
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_nativeTimeInput.prototype, "Minimum", {
            /**** Minimum ****/
            get: function () {
                return $(this.SubPeer).attr('min');
            },
            set: function (newMinimum) {
                allowStringMatching('earliest time', newMinimum, TimeRegExp);
                if (newMinimum == null) {
                    $(this.SubPeer).removeAttr('min');
                }
                else {
                    $(this.SubPeer).attr('min', newMinimum);
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_nativeTimeInput.prototype, "Maximum", {
            /**** Maximum ****/
            get: function () {
                return $(this.SubPeer).attr('max');
            },
            set: function (newMaximum) {
                allowStringMatching('latest time', newMaximum, TimeRegExp);
                if (newMaximum == null) {
                    $(this.SubPeer).removeAttr('max');
                }
                else {
                    $(this.SubPeer).attr('max', newMaximum);
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_nativeTimeInput.prototype, "Stepping", {
            /**** Stepping ****/
            get: function () {
                var Candidate = $(this.SubPeer).attr('step');
                return (Candidate === 'any'
                    ? undefined
                    : (Candidate == null ? 1 : parseFloat(Candidate)));
            },
            set: function (newStepping) {
                if (newStepping === 'any') {
                    $(this.SubPeer).attr('step', 'any');
                }
                else {
                    allowFiniteNumber('stepping value', newStepping);
                    if (newStepping == null) {
                        $(this.SubPeer).removeAttr('step');
                    }
                    else {
                        $(this.SubPeer).attr('step', newStepping);
                    }
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_nativeTimeInput.prototype, "Placeholder", {
            /**** Placeholder ****/
            get: function () {
                return $(this.SubPeer).attr('placeholder');
            },
            set: function (newPlaceholder) {
                expectTextline('input placeholder', newPlaceholder);
                if (newPlaceholder == null) {
                    $(this.SubPeer).removeAttr('placeholder');
                }
                else {
                    $(this.SubPeer).attr('placeholder', newPlaceholder);
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_nativeTimeInput.prototype, "isReadonly", {
            /**** isReadonly ****/
            get: function () {
                return ($(this.SubPeer).attr('readonly') != null);
            },
            set: function (newFlag) {
                expectBoolean('readonly flag', newFlag);
                if (newFlag == false) {
                    $(this.SubPeer).removeAttr('readonly');
                }
                else {
                    $(this.SubPeer).attr('readonly', 'true');
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_nativeTimeInput.prototype, "Suggestions", {
            /**** Suggestions ****/
            get: function () {
                var Result = [];
                var ListId = $(this.SubPeer).attr('list');
                if (ListId != null) {
                    $('#' + ListId).children('option').each(function () {
                        Result.push($(this).attr('value'));
                    });
                }
                return Result;
            },
            set: function (newSuggestions) {
                allowListSatisfying('list of suggestions', newSuggestions, TimeMatcher);
                var ListId = $(this.SubPeer).attr('list');
                if ((newSuggestions == null) || (newSuggestions.length === 0)) {
                    if (ListId != null) {
                        $('#' + ListId).remove();
                        $(this.SubPeer).removeAttr('list');
                    }
                }
                else {
                    if ((ListId == null) || !$('#' + ListId).is('datalist')) {
                        ListId = newUniqueId();
                        $(this.SubPeer).attr('list', ListId);
                    }
                    var ListElement = $('#' + ListId);
                    if (ListElement.length === 0) {
                        ListElement = $('<datalist id="' + ListId + '"></datalist>');
                        ListElement.insertAfter($(this.SubPeer));
                    }
                    else {
                        ListElement.empty();
                    }
                    for (var i = 0, l = newSuggestions.length; i < l; i++) {
                        ListElement.append('<option value="' + newSuggestions[i] + '"></option>');
                    }
                }
            },
            enumerable: false,
            configurable: true
        });
        return WAT_nativeTimeInput;
    }(WAT_Control));
    $(function () {
        $(document.body).on('input', '.WAT.Control.nativeTimeInput > input', function () {
            var SubPeer = $(this);
            SubPeer.parent().trigger('value-changed', [SubPeer.val()]);
        });
        $(document.body).on('after-refresh', '.WAT.Control.nativeTimeInput', function () {
            var Visual = WAT.VisualOfElement(this);
            Visual['SubPeer'] = $(this).children()[0];
        });
    });
    MasterRegistry['nativeTimeInput'.toLowerCase()] = {
        Category: 'Control', Name: 'nativeTimeInput',
        Group: 'native Controls', Label: 'Time Input',
        Classes: 'WAT Control nativeTimeInput',
        Template: '<input type="time" pattern="\\d{2}:\\d{2}" class="WAT-Content">',
        Initializer: function () { this.SubPeer = $(this.Peer).children()[0]; },
        customPropertyDescriptorList: [
            { Name: 'isReadonly', Label: 'read-only', EditorType: 'checkbox' },
            { Name: 'Value', Label: 'Value', EditorType: 'time-input' },
            { Name: 'Minimum', Label: 'Minimum', EditorType: 'time-input' },
            { Name: 'Maximum', Label: 'Maximum', EditorType: 'time-input' },
            { Name: 'Stepping', Label: 'Stepping', EditorType: 'number-input' },
            { Name: 'Placeholder', Label: 'Placeholder', EditorType: 'textline-input' },
            { Name: 'Suggestions', Label: 'Suggestions', EditorType: 'linelist-input' }
        ],
        initialGeometry: { Width: 80, Height: 30 },
        Prototype: new WAT_nativeTimeInput(),
    };
    /**** nativeSearchInput ****/
    var WAT_nativeSearchInput = /** @class */ (function (_super) {
        __extends(WAT_nativeSearchInput, _super);
        function WAT_nativeSearchInput() {
            return _super.call(this) || this;
        }
        Object.defineProperty(WAT_nativeSearchInput.prototype, "Value", {
            /**** Value ****/
            get: function () {
                return $(this.SubPeer).val();
            },
            set: function (newValue) {
                allowTextline('text to search for', newValue);
                var oldValue = this.Value;
                if (newValue !== oldValue) {
                    $(this.SubPeer).val(newValue || '');
                    $(this.Peer).trigger('value-changed', [newValue, oldValue]);
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_nativeSearchInput.prototype, "minLength", {
            /**** minLength ****/
            get: function () {
                return parseInt($(this.SubPeer).attr('minlength') || '0', 10);
            },
            set: function (newMinLength) {
                allowOrdinal('minimal length', newMinLength);
                $(this.SubPeer).attr('minlength', newMinLength || 0);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_nativeSearchInput.prototype, "Maximum", {
            /**** Maximum ****/
            get: function () {
                var Candidate = $(this.SubPeer).attr('maxlength');
                return (Candidate == null ? Infinity : parseInt(Candidate, 10));
            },
            set: function (newMaxLength) {
                allowOrdinal('maximum length', newMaxLength);
                if (newMaxLength == null) {
                    $(this.SubPeer).removeAttr('maxlength');
                }
                else {
                    $(this.SubPeer).attr('maxlength', newMaxLength);
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_nativeSearchInput.prototype, "Pattern", {
            /**** Pattern ****/
            get: function () {
                return $(this.SubPeer).attr('pattern');
            },
            set: function (newPattern) {
                expectTextline('input pattern', newPattern);
                if (newPattern == null) {
                    $(this.SubPeer).removeAttr('pattern');
                }
                else {
                    $(this.SubPeer).attr('pattern', newPattern);
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_nativeSearchInput.prototype, "Placeholder", {
            /**** Placeholder ****/
            get: function () {
                return $(this.SubPeer).attr('placeholder');
            },
            set: function (newPlaceholder) {
                expectTextline('input placeholder', newPlaceholder);
                if (newPlaceholder == null) {
                    $(this.SubPeer).removeAttr('placeholder');
                }
                else {
                    $(this.SubPeer).attr('placeholder', newPlaceholder);
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_nativeSearchInput.prototype, "isReadonly", {
            /**** isReadonly ****/
            get: function () {
                return ($(this.SubPeer).attr('readonly') != null);
            },
            set: function (newFlag) {
                expectBoolean('readonly flag', newFlag);
                if (newFlag == false) {
                    $(this.SubPeer).removeAttr('readonly');
                }
                else {
                    $(this.SubPeer).attr('readonly', 'true');
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_nativeSearchInput.prototype, "SpellChecking", {
            /**** SpellChecking ****/
            get: function () {
                switch ($(this.SubPeer).attr('spellcheck')) {
                    case 'false': return 'disabled';
                    case 'true': return 'enabled';
                    case '':
                    default: return 'default';
                }
            },
            set: function (newSpellChecking) {
                allowOneOf('spell checking setting', newSpellChecking, WAT.WAT_SpellCheckings);
                switch (newSpellChecking) {
                    case 'disabled':
                        $(this.SubPeer).attr('spellcheck', 'false');
                        break;
                    case 'enabled':
                        $(this.SubPeer).attr('spellcheck', 'true');
                        break;
                    case 'default':
                    default: $(this.SubPeer).removeAttr('spellcheck');
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_nativeSearchInput.prototype, "Suggestions", {
            /**** Suggestions ****/
            get: function () {
                var Result = [];
                var ListId = $(this.SubPeer).attr('list');
                if (ListId != null) {
                    $('#' + ListId).children('option').each(function () {
                        Result.push($(this).attr('value'));
                    });
                }
                return Result;
            },
            set: function (newSuggestions) {
                allowListSatisfying('list of suggestions', newSuggestions, ValueIsTextline);
                var ListId = $(this.SubPeer).attr('list');
                if ((newSuggestions == null) || (newSuggestions.length === 0)) {
                    if (ListId != null) {
                        $('#' + ListId).remove();
                        $(this.SubPeer).removeAttr('list');
                    }
                }
                else {
                    if ((ListId == null) || !$('#' + ListId).is('datalist')) {
                        ListId = newUniqueId();
                        $(this.SubPeer).attr('list', ListId);
                    }
                    var ListElement = $('#' + ListId);
                    if (ListElement.length === 0) {
                        ListElement = $('<datalist id="' + ListId + '"></datalist>');
                        ListElement.insertAfter($(this.SubPeer));
                    }
                    else {
                        ListElement.empty();
                    }
                    for (var i = 0, l = newSuggestions.length; i < l; i++) {
                        ListElement.append('<option value="' + newSuggestions[i] + '"></option>');
                    }
                }
            },
            enumerable: false,
            configurable: true
        });
        return WAT_nativeSearchInput;
    }(WAT_Control));
    $(function () {
        $(document.body).on('input', '.WAT.Control.nativeSearchInput > input', function () {
            var SubPeer = $(this);
            SubPeer.parent().trigger('value-changed', [SubPeer.val()]);
        });
        $(document.body).on('after-refresh', '.WAT.Control.nativeSearchInput', function () {
            var Visual = WAT.VisualOfElement(this);
            Visual['SubPeer'] = $(this).children()[0];
        });
    });
    MasterRegistry['nativeSearchInput'.toLowerCase()] = {
        Category: 'Control', Name: 'nativeSearchInput',
        Group: 'native Controls', Label: 'Search Input',
        Classes: 'WAT Control nativeSearchInput',
        Template: '<input type="search" class="WAT-Content">',
        Initializer: function () { this.SubPeer = $(this.Peer).children()[0]; },
        customPropertyDescriptorList: [
            { Name: 'isReadonly', Label: 'read-only', EditorType: 'checkbox' },
            { Name: 'Value', Label: 'Value', EditorType: 'textline-input' },
            { Name: 'minLength', Label: 'min. Length', EditorType: 'number-input', minValue: 0, StepValue: 1 },
            { Name: 'maxLength', Label: 'max. Length', EditorType: 'number-input', minValue: 0, StepValue: 1 },
            { Name: 'Pattern', Label: 'Pattern', EditorType: 'textline-input' },
            { Name: 'Placeholder', Label: 'Placeholder', EditorType: 'textline-input' },
            { Name: 'SpellChecking', Label: 'SpellChecking', EditorType: 'drop-down',
                ValueList: ['default', 'enabled', 'disabled'] },
            { Name: 'Suggestions', Label: 'Suggestions', EditorType: 'linelist-input' }
        ],
        initialGeometry: { Width: 80, Height: 30 },
        Prototype: new WAT_nativeSearchInput(),
    };
    /**** nativeTextInput ****/
    var WAT_nativeTextInput = /** @class */ (function (_super) {
        __extends(WAT_nativeTextInput, _super);
        function WAT_nativeTextInput() {
            return _super.call(this) || this;
        }
        Object.defineProperty(WAT_nativeTextInput.prototype, "Value", {
            /**** Value ****/
            get: function () {
                return $(this.SubPeer).val();
            },
            set: function (newValue) {
                allowText('text', newValue);
                var oldValue = this.Value;
                if (newValue !== oldValue) {
                    $(this.SubPeer).val(newValue || '');
                    $(this.Peer).trigger('value-changed', [newValue, oldValue]);
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_nativeTextInput.prototype, "LineWrapping", {
            /**** LineWrapping ****/
            get: function () {
                return ($(this.SubPeer).attr('wrap') === 'hard');
            },
            set: function (newFlag) {
                expectBoolean('line wrapping flag', newFlag);
                $(this.SubPeer).attr('wrap', newFlag == true ? 'hard' : 'soft');
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_nativeTextInput.prototype, "isResizable", {
            /**** isResizable ****/
            get: function () {
                return ($(this.SubPeer).css('resize') !== 'none');
            },
            set: function (newFlag) {
                expectBoolean('line wrapping flag', newFlag);
                $(this.SubPeer).css('resize', newFlag == true ? 'both' : 'none');
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_nativeTextInput.prototype, "minLength", {
            /**** minLength ****/
            get: function () {
                return parseInt($(this.SubPeer).attr('minlength') || '0', 10);
            },
            set: function (newMinLength) {
                allowOrdinal('minimal length', newMinLength);
                $(this.SubPeer).attr('minlength', newMinLength || 0);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_nativeTextInput.prototype, "Maximum", {
            /**** Maximum ****/
            get: function () {
                var Candidate = $(this.SubPeer).attr('maxlength');
                return (Candidate == null ? Infinity : parseInt(Candidate, 10));
            },
            set: function (newMaxLength) {
                allowOrdinal('maximum length', newMaxLength);
                if (newMaxLength == null) {
                    $(this.SubPeer).removeAttr('maxlength');
                }
                else {
                    $(this.SubPeer).attr('maxlength', newMaxLength);
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_nativeTextInput.prototype, "Placeholder", {
            /**** Placeholder ****/
            get: function () {
                return $(this.SubPeer).attr('placeholder');
            },
            set: function (newPlaceholder) {
                expectTextline('input placeholder', newPlaceholder);
                if (newPlaceholder == null) {
                    $(this.SubPeer).removeAttr('placeholder');
                }
                else {
                    $(this.SubPeer).attr('placeholder', newPlaceholder);
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_nativeTextInput.prototype, "isReadonly", {
            /**** isReadonly ****/
            get: function () {
                return ($(this.SubPeer).attr('readonly') != null);
            },
            set: function (newFlag) {
                expectBoolean('readonly flag', newFlag);
                if (newFlag == false) {
                    $(this.SubPeer).removeAttr('readonly');
                }
                else {
                    $(this.SubPeer).attr('readonly', 'true');
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_nativeTextInput.prototype, "SpellChecking", {
            /**** SpellChecking ****/
            get: function () {
                switch ($(this.SubPeer).attr('spellcheck')) {
                    case 'false': return 'disabled';
                    case 'true': return 'enabled';
                    case '':
                    default: return 'default';
                }
            },
            set: function (newSpellChecking) {
                allowOneOf('spell checking setting', newSpellChecking, WAT.WAT_SpellCheckings);
                switch (newSpellChecking) {
                    case 'disabled':
                        $(this.SubPeer).attr('spellcheck', 'false');
                        break;
                    case 'enabled':
                        $(this.SubPeer).attr('spellcheck', 'true');
                        break;
                    case 'default':
                    default: $(this.SubPeer).removeAttr('spellcheck');
                }
            },
            enumerable: false,
            configurable: true
        });
        return WAT_nativeTextInput;
    }(WAT_Control));
    $(function () {
        $(document.body).on('input', '.WAT.Control.nativeTextInput > textarea', function () {
            var SubPeer = $(this);
            SubPeer.parent().trigger('value-changed', [SubPeer.val()]);
        });
        $(document.body).on('after-refresh', '.WAT.Control.nativeTextInput', function () {
            var Visual = WAT.VisualOfElement(this);
            Visual['SubPeer'] = $(this).children()[0];
        });
    });
    MasterRegistry['nativeTextInput'.toLowerCase()] = {
        Category: 'Control', Name: 'nativeTextInput',
        Group: 'native Controls', Label: 'Text Input',
        Classes: 'WAT Control nativeTextInput',
        Template: '<textarea class="WAT-Content"></textarea>',
        Initializer: function () { this.SubPeer = $(this.Peer).children()[0]; },
        customPropertyDescriptorList: [
            { Name: 'isReadonly', Label: 'read-only', EditorType: 'checkbox' },
            { Name: 'Value', Label: 'Value', EditorType: 'textline-input' },
            { Name: 'LineWrapping', Label: 'Line Wrapping', EditorType: 'choice',
                FalseValue: 'soft', TrueValue: 'hard' },
            { Name: 'minLength', Label: 'min. Length', EditorType: 'number-input', minValue: 0, StepValue: 1 },
            { Name: 'maxLength', Label: 'max. Length', EditorType: 'number-input', minValue: 0, StepValue: 1 },
            { Name: 'Placeholder', Label: 'Placeholder', EditorType: 'textline-input' },
            { Name: 'SpellChecking', Label: 'SpellChecking', EditorType: 'drop-down',
                ValueList: ['default', 'enabled', 'disabled'] },
            { Name: 'isResizable', Label: 'resizable', EditorType: 'checkbox' }
        ],
        initialGeometry: { Width: 80, Height: 30 },
        Prototype: new WAT_nativeTextInput(),
    };
    /**** nativeColorInput ****/
    var WAT_nativeColorInput = /** @class */ (function (_super) {
        __extends(WAT_nativeColorInput, _super);
        function WAT_nativeColorInput() {
            return _super.call(this) || this;
        }
        Object.defineProperty(WAT_nativeColorInput.prototype, "Value", {
            /**** Value ****/
            get: function () {
                return $(this.SubPeer).val();
            },
            set: function (newValue) {
                allowColor('color value', newValue);
                var oldValue = this.Value;
                if (newValue !== oldValue) {
                    $(this.SubPeer).val(newValue || '');
                    $(this.Peer).trigger('value-changed', [newValue, oldValue]);
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_nativeColorInput.prototype, "Suggestions", {
            /**** Suggestions ****/
            get: function () {
                var Result = [];
                var ListId = $(this.SubPeer).attr('list');
                if (ListId != null) {
                    $('#' + ListId).children('option').each(function () {
                        Result.push($(this).attr('value'));
                    });
                }
                return Result;
            },
            set: function (newSuggestions) {
                allowListSatisfying('list of suggestions', newSuggestions, ValueIsColor);
                var ListId = $(this.SubPeer).attr('list');
                if ((newSuggestions == null) || (newSuggestions.length === 0)) {
                    if (ListId != null) {
                        $('#' + ListId).remove();
                        $(this.SubPeer).removeAttr('list');
                    }
                }
                else {
                    if ((ListId == null) || !$('#' + ListId).is('datalist')) {
                        ListId = newUniqueId();
                        $(this.SubPeer).attr('list', ListId);
                    }
                    var ListElement = $('#' + ListId);
                    if (ListElement.length === 0) {
                        ListElement = $('<datalist id="' + ListId + '"></datalist>');
                        ListElement.insertAfter($(this.SubPeer));
                    }
                    else {
                        ListElement.empty();
                    }
                    for (var i = 0, l = newSuggestions.length; i < l; i++) {
                        ListElement.append('<option value="' + newSuggestions[i] + '"></option>');
                    }
                }
            },
            enumerable: false,
            configurable: true
        });
        return WAT_nativeColorInput;
    }(WAT_Control));
    $(function () {
        $(document.body).on('input', '.WAT.Control.nativeColorInput > input', function () {
            var SubPeer = $(this);
            SubPeer.parent().trigger('value-changed', [SubPeer.val()]);
        });
        $(document.body).on('after-refresh', '.WAT.Control.nativeColorInput', function () {
            var Visual = WAT.VisualOfElement(this);
            Visual['SubPeer'] = $(this).children()[0];
        });
    });
    MasterRegistry['nativeColorInput'.toLowerCase()] = {
        Category: 'Control', Name: 'nativeColorInput',
        Group: 'native Controls', Label: 'Color Input',
        Classes: 'WAT Control nativeColorInput',
        Template: '<input type="color" class="WAT-Content">',
        Initializer: function () { this.SubPeer = $(this.Peer).children()[0]; },
        customPropertyDescriptorList: [
            { Name: 'Value', Label: 'Value', EditorType: 'color-input' },
            { Name: 'Suggestions', Label: 'Suggestions', EditorType: 'linelist-input' }
        ],
        initialGeometry: { Width: 80, Height: 30 },
        Prototype: new WAT_nativeColorInput(),
    };
    /**** nativeDropDown ****/
    var OptionPattern = /^\s*([^\x00-\x1F\x7F-\x9F\u2028\u2029\uFFF9-\uFFFB]+)(?:\s+([^\x00-\x1F\x7F-\x9F\u2028\u2029\uFFF9-\uFFFB]+))?$/;
    function OptionMatcher(Value) {
        return OptionPattern.test(Value);
    }
    var WAT_nativeDropDown = /** @class */ (function (_super) {
        __extends(WAT_nativeDropDown, _super);
        function WAT_nativeDropDown() {
            return _super.call(this) || this;
        }
        Object.defineProperty(WAT_nativeDropDown.prototype, "Value", {
            /**** Value ****/
            get: function () {
                var ValueOrList = $(this.SubPeer).val();
                return ($(this.SubPeer).attr('multiple')
                    ? (ValueOrList || []).join('\n')
                    : (ValueOrList || ''));
            },
            set: function (newValue) {
                allowTextline('DropDown value', newValue);
                var oldValue = this.Value;
                if (newValue !== oldValue) {
                    var SubPeer = $(this.SubPeer);
                    if (SubPeer.attr('multiple')) {
                        // @ts-ignore
                        SubPeer.val((newValue || '').split('\n'));
                    }
                    else {
                        SubPeer.val(newValue || '');
                    }
                    $(this.Peer).trigger('value-changed', [newValue, oldValue]);
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_nativeDropDown.prototype, "multiple", {
            /**** multiple ****/
            get: function () {
                return ($(this.SubPeer).attr('multiple') != null);
            },
            set: function (newFlag) {
                expectBoolean('multiplicity flag', newFlag);
                if (newFlag == false) {
                    $(this.SubPeer).removeAttr('multiple');
                }
                else {
                    $(this.SubPeer).attr('multiple', 'true');
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_nativeDropDown.prototype, "Options", {
            /**** Options ****/
            get: function () {
                var Result = [];
                $(this.SubPeer).children('option').each(function () {
                    var Option = $(this);
                    var Value = Option.attr('value'), Label = Option.text().trim();
                    Result.push((Value === Label) || (Label === '')
                        ? Value
                        : (Value + ': ' + Label));
                });
                return Result;
            },
            set: function (newOptions) {
                allowListSatisfying('list of options', newOptions, OptionMatcher);
                var SubPeer = $(this.SubPeer);
                SubPeer.empty();
                if ((newOptions != null) || (newOptions.length > 0)) {
                    var ListElement = SubPeer;
                    for (var i = 0, l = newOptions.length; i < l; i++) {
                        var Match = OptionPattern.exec(newOptions[i]);
                        if (Match == null) {
                            continue;
                        }
                        ListElement.append('<option' +
                            ' value="' + HTMLsafe(Match[1]) + '">' +
                            HTMLsafe(Match[2] == null ? Match[1] : Match[2]) +
                            '</option>');
                    }
                }
            },
            enumerable: false,
            configurable: true
        });
        return WAT_nativeDropDown;
    }(WAT_Control));
    $(function () {
        $(document.body).on('input', '.WAT.Control.nativeDropDown > select', function () {
            var SubPeer = $(this);
            SubPeer.parent().trigger('value-changed', [SubPeer.val()]);
        });
        $(document.body).on('after-refresh', '.WAT.Control.nativeDropDown', function () {
            var Visual = WAT.VisualOfElement(this);
            Visual['SubPeer'] = $(this).children()[0];
        });
    });
    MasterRegistry['nativeDropDown'.toLowerCase()] = {
        Category: 'Control', Name: 'nativeDropDown',
        Group: 'native Controls', Label: 'DropDown',
        Classes: 'WAT Control nativeDropDown',
        Template: '<select class="WAT-Content"></select>',
        Initializer: function () { this.SubPeer = $(this.Peer).children()[0]; },
        customPropertyDescriptorList: [
            { Name: 'multiple', Label: 'multiple', EditorType: 'checkbox' },
            { Name: 'Value', Label: 'Value', EditorType: 'textline-input' },
            { Name: 'Options', Label: 'Options', EditorType: 'linelist-input' }
        ],
        initialGeometry: { Width: 80, Height: 30 },
        Prototype: new WAT_nativeDropDown(),
    };
    /**** straightLineView ****/
    var WAT_straightLineView = /** @class */ (function (_super) {
        __extends(WAT_straightLineView, _super);
        function WAT_straightLineView() {
            return _super.call(this) || this;
        }
        Object.defineProperty(WAT_straightLineView.prototype, "minWidth", {
            /**** min/maxWidth ****/
            get: function () {
                return CategoryGet.call(this, 'minWidth');
            },
            set: function (newMinWidth) {
                CategorySet.call(this, 'minWidth', newMinWidth);
                this.updateStraightLineView('Geometry');
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_straightLineView.prototype, "maxWidth", {
            get: function () {
                return CategoryGet.call(this, 'maxWidth');
            },
            set: function (newMaxWidth) {
                CategorySet.call(this, 'maxWidth', newMaxWidth);
                this.updateStraightLineView('Geometry');
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_straightLineView.prototype, "minHeight", {
            /**** min/maxHeight ****/
            get: function () {
                return CategoryGet.call(this, 'minHeight');
            },
            set: function (newMinHeight) {
                CategorySet.call(this, 'minHeight', newMinHeight);
                this.updateStraightLineView('Geometry');
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_straightLineView.prototype, "maxHeight", {
            get: function () {
                return CategoryGet.call(this, 'maxHeight');
            },
            set: function (newMaxHeight) {
                CategorySet.call(this, 'maxHeight', newMaxHeight);
                this.updateStraightLineView('Geometry');
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_straightLineView.prototype, "Geometry", {
            /**** Geometry ****/
            get: function () {
                return CategoryGet.call(this, 'Geometry');
            },
            set: function (newGeometry) {
                CategorySet.call(this, 'Geometry', newGeometry);
                this.updateStraightLineView('Geometry');
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_straightLineView.prototype, "LineColor", {
            /**** LineColor ****/
            get: function () {
                return this.Color;
            },
            set: function (newColor) {
                this.Color = newColor;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_straightLineView.prototype, "LineThickness", {
            /**** LineThickness ****/
            get: function () {
                var $Line = $(this.SubPeer).children().eq(1);
                return parseInt($Line.attr('stroke-width'), 10);
            },
            set: function (newThickness) {
                expectCardinal('line thickness', newThickness);
                this.updateStraightLineView('LineThickness', newThickness);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_straightLineView.prototype, "LineOrientation", {
            /**** LineOrientation ****/
            get: function () {
                var $Line = $(this.SubPeer).children().eq(1);
                var x1 = parseInt($Line.attr('x1'), 10);
                var y1 = parseInt($Line.attr('y1'), 10);
                var x2 = parseInt($Line.attr('x2'), 10);
                var y2 = parseInt($Line.attr('y2'), 10);
                if (x1 < x2) {
                    return (y1 < y2 ? 'nw-se' : 'e-w');
                }
                else {
                    return (x1 == x2 ? 'n-s' : 'ne-sw');
                }
            },
            set: function (newOrientation) {
                expectOneOf('line orientation', newOrientation, ['nw-se', 'n-s', 'ne-sw', 'e-w']);
                this.updateStraightLineView('LineOrientation', newOrientation);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_straightLineView.prototype, "ArrowHeads", {
            /**** ArrowHeads ****/
            get: function () {
                var $Line = $(this.SubPeer).children().eq(1);
                var StartMarker = $Line.attr('marker-start');
                var EndMarker = $Line.attr('marker-end');
                if (StartMarker == null) {
                    return (EndMarker == null ? 'none' : 'start-only');
                }
                else {
                    return (EndMarker == null ? 'end-only' : 'both');
                }
            },
            set: function (newArrowHeads) {
                expectOneOf('arrow heads', newArrowHeads, ['none', 'start-only', 'end-only', 'both']);
                this.updateStraightLineView('ArrowHeads', newArrowHeads);
            },
            enumerable: false,
            configurable: true
        });
        /**** updateStraightLineView ****/
        WAT_straightLineView.prototype.updateStraightLineView = function (Property, newValue) {
            var $Line = $(this.SubPeer).children().eq(1);
            switch (Property) {
                case 'Geometry':
                case 'LineOrientation':
                    var Width = this.Width;
                    var LineThickness = this.LineThickness;
                    var Height = this.Height;
                    var StartOffset = ($Line.attr('marker-start') == null ? 0 : LineThickness);
                    var EndOffset = ($Line.attr('marker-end') == null ? 0 : LineThickness);
                    this.SubPeer.setAttribute('viewBox', '0 0 ' + Width + ' ' + Height);
                    switch (newValue || this.LineOrientation) {
                        // @ts-ignore
                        case 'nw-se':
                            $Line.attr('x1', StartOffset).attr('y1', StartOffset).attr('x2', Width - EndOffset).attr('y2', Height - EndOffset);
                            break;
                        // @ts-ignore
                        case 'n-s':
                            $Line.attr('x1', Width / 2).attr('y1', StartOffset).attr('x2', Width / 2).attr('y2', Height - EndOffset);
                            break;
                        // @ts-ignore
                        case 'ne-sw':
                            $Line.attr('x1', Width - StartOffset).attr('y1', StartOffset).attr('x2', EndOffset).attr('y2', Height - EndOffset);
                            break;
                        // @ts-ignore
                        case 'e-w':
                            $Line.attr('x1', StartOffset).attr('y1', Height / 2).attr('x2', Width - EndOffset).attr('y2', Height / 2);
                            break;
                    }
                    break;
                case 'LineThickness':
                    $Line.attr('stroke-width', newValue);
                    this.updateStraightLineView('Geometry');
                    break;
                case 'ArrowHeads':
                    switch (newValue) {
                        case 'none':
                            $Line.removeAttr('marker-start');
                            $Line.removeAttr('marker-end');
                            break;
                        case 'start-only':
                            $Line.attr('marker-start', 'url(#start-arrow)');
                            $Line.removeAttr('marker-end');
                            break;
                        case 'end-only':
                            $Line.removeAttr('marker-start');
                            $Line.attr('marker-end', 'url(#end-arrow)');
                            break;
                        case 'both':
                            $Line.attr('marker-start', 'url(#start-arrow)');
                            $Line.attr('marker-end', 'url(#end-arrow)');
                    }
                    this.updateStraightLineView('Geometry');
            }
        };
        return WAT_straightLineView;
    }(WAT_Control));
    $(function () {
        $(document.body).on('after-refresh', '.WAT.Control.straightLineView', function () {
            var Visual = WAT.VisualOfElement(this);
            Visual['SubPeer'] = $(this).children()[0];
        });
    });
    MasterRegistry['straightLineView'.toLowerCase()] = {
        Category: 'Control', Name: 'straightLineView',
        Group: undefined, Label: 'straightLineView',
        Classes: 'WAT Control straightLineView',
        Template: "\n      <svg width=\"100%\" height=\"100%\" viewBox=\"0 0 40 40\">\n        <defs>\n          <marker id=\"start-arrow\" markerWidth=\"10\" markerHeight=\"8\"\n            refX=\"1\" refY=\"2\" orient=\"auto\">\n            <polygon fill=\"currentColor\" points=\"5 0, 0 2, 5 4\"/>\n          </marker>\n          <marker id=\"end-arrow\" markerWidth=\"10\" markerHeight=\"8\"\n            refX=\"4\" refY=\"2\" orient=\"auto\">\n            <polygon fill=\"currentColor\" points=\"0 0, 5 2, 0 4\"/>\n          </marker>\n        </defs>\n        <line x1=\"0\" y1=\"0\" x2=\"40\" y2=\"40\"\n          stroke=\"currentColor\" stroke-width=\"2\"\n          marker-start=\"url(#start-arrow)\"\n          marker-end=\"url(#end-arrow)\"/>\n      </svg>\n    ".replace(/^\s+/, '').replace(/\s+$/, '').replace(/\s+/, ' '),
        Initializer: function () { this.SubPeer = $(this.Peer).children()[0]; },
        customPropertyDescriptorList: [
            { Name: 'LineColor', Label: 'Line Color', EditorType: 'color-input' },
            { Name: 'LineThickness', Label: 'Line Thickness', EditorType: 'number-input',
                minValue: 1, StepValue: 1 },
            { Name: 'LineOrientation', Label: 'Line Orientation', EditorType: 'drop-down',
                ValueList: ['nw-se', 'n-s', 'ne-sw', 'e-w'] },
            { Name: 'ArrowHeads', Label: 'Arrow Heads', EditorType: 'drop-down',
                ValueList: ['none', 'start-only', 'end-only', 'both'] }
        ],
        initialGeometry: { Width: 40, Height: 40 },
        Prototype: new WAT_straightLineView(),
    };
    /**** angledLineView ****/
    var WAT_angledLineView = /** @class */ (function (_super) {
        __extends(WAT_angledLineView, _super);
        function WAT_angledLineView() {
            return _super.call(this) || this;
        }
        Object.defineProperty(WAT_angledLineView.prototype, "minWidth", {
            /**** min/maxWidth ****/
            get: function () {
                return CategoryGet.call(this, 'minWidth');
            },
            set: function (newMinWidth) {
                CategorySet.call(this, 'minWidth', newMinWidth);
                this.updateAngledLineView('Geometry');
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_angledLineView.prototype, "maxWidth", {
            get: function () {
                return CategoryGet.call(this, 'maxWidth');
            },
            set: function (newMaxWidth) {
                CategorySet.call(this, 'maxWidth', newMaxWidth);
                this.updateAngledLineView('Geometry');
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_angledLineView.prototype, "minHeight", {
            /**** min/maxHeight ****/
            get: function () {
                return CategoryGet.call(this, 'minHeight');
            },
            set: function (newMinHeight) {
                CategorySet.call(this, 'minHeight', newMinHeight);
                this.updateAngledLineView('Geometry');
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_angledLineView.prototype, "maxHeight", {
            get: function () {
                return CategoryGet.call(this, 'maxHeight');
            },
            set: function (newMaxHeight) {
                CategorySet.call(this, 'maxHeight', newMaxHeight);
                this.updateAngledLineView('Geometry');
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_angledLineView.prototype, "Geometry", {
            /**** Geometry ****/
            get: function () {
                return CategoryGet.call(this, 'Geometry');
            },
            set: function (newGeometry) {
                CategorySet.call(this, 'Geometry', newGeometry);
                this.updateAngledLineView('Geometry');
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_angledLineView.prototype, "LineColor", {
            /**** LineColor ****/
            get: function () {
                return this.Color;
            },
            set: function (newColor) {
                this.Color = newColor;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_angledLineView.prototype, "LineThickness", {
            /**** LineThickness ****/
            get: function () {
                var $Line = $(this.SubPeer).children().eq(1);
                return parseInt($Line.attr('stroke-width'), 10);
            },
            set: function (newThickness) {
                expectCardinal('line thickness', newThickness);
                this.updateAngledLineView('LineThickness', newThickness);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_angledLineView.prototype, "LineOrientation", {
            /**** LineOrientation ****/
            get: function () {
                var $Line = $(this.SubPeer).children().eq(1);
                var Points = $Line.attr('points').replace(/,/g, ' ').split(' ');
                var x1 = parseInt(Points[0], 10);
                var y1 = parseInt(Points[1], 10);
                var x2 = parseInt(Points[4], 10);
                var y2 = parseInt(Points[5], 10);
                // @ts-ignore results of given formala match required result type
                return ((y1 > y2 ? 'up' : 'down') + '-' +
                    (x1 > x2 ? 'left' : 'right'));
            },
            set: function (newOrientation) {
                expectOneOf('line orientation', newOrientation, ['up-left', 'up-right', 'down-left', 'down-right']);
                this.updateAngledLineView('LineOrientation', newOrientation);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WAT_angledLineView.prototype, "ArrowHeads", {
            /**** ArrowHeads ****/
            get: function () {
                var $Line = $(this.SubPeer).children().eq(1);
                var StartMarker = $Line.attr('marker-start');
                var EndMarker = $Line.attr('marker-end');
                if (StartMarker == null) {
                    return (EndMarker == null ? 'none' : 'start-only');
                }
                else {
                    return (EndMarker == null ? 'end-only' : 'both');
                }
            },
            set: function (newArrowHeads) {
                expectOneOf('arrow heads', newArrowHeads, ['none', 'start-only', 'end-only', 'both']);
                this.updateAngledLineView('ArrowHeads', newArrowHeads);
            },
            enumerable: false,
            configurable: true
        });
        /**** updateAngledLineView ****/
        WAT_angledLineView.prototype.updateAngledLineView = function (Property, newValue) {
            var $Line = $(this.SubPeer).children().eq(1);
            switch (Property) {
                case 'Geometry':
                case 'LineOrientation':
                    var Width = this.Width;
                    var LineThickness = this.LineThickness;
                    var Height = this.Height;
                    var StartOffset = Math.ceil(($Line.attr('marker-start') == null ? 0.5 : 2.5) * LineThickness);
                    var EndOffset = Math.ceil(($Line.attr('marker-end') == null ? 0.5 : 2.5) * LineThickness);
                    this.SubPeer.setAttribute('viewBox', '0 0 ' + Width + ' ' + Height);
                    switch (newValue || this.LineOrientation) {
                        case 'up-left':
                            $Line.attr('points', "".concat(Width - StartOffset, ",").concat(Height - StartOffset, ", ").concat(Width - StartOffset, ",").concat(EndOffset, " ").concat(EndOffset, ",").concat(EndOffset));
                            break;
                        case 'up-right':
                            $Line.attr('points', "".concat(StartOffset, ",").concat(Height - StartOffset, ", ").concat(StartOffset, ",").concat(EndOffset, " ").concat(Width - EndOffset, ",").concat(EndOffset));
                            break;
                        case 'down-left':
                            $Line.attr('points', "".concat(Width - StartOffset, ",").concat(StartOffset, ", ").concat(Width - StartOffset, ",").concat(Height - EndOffset, " ").concat(EndOffset, ",").concat(Height - EndOffset));
                            break;
                        case 'down-right':
                            $Line.attr('points', "".concat(StartOffset, ",").concat(StartOffset, ", ").concat(StartOffset, ",").concat(Height - EndOffset, " ").concat(Width - EndOffset, ",").concat(Height - EndOffset));
                    }
                    break;
                case 'LineThickness':
                    $Line.attr('stroke-width', newValue);
                    this.updateAngledLineView('Geometry');
                    break;
                case 'ArrowHeads':
                    switch (newValue) {
                        case 'none':
                            $Line.removeAttr('marker-start');
                            $Line.removeAttr('marker-end');
                            break;
                        case 'start-only':
                            $Line.attr('marker-start', 'url(#start-arrow)');
                            $Line.removeAttr('marker-end');
                            break;
                        case 'end-only':
                            $Line.removeAttr('marker-start');
                            $Line.attr('marker-end', 'url(#end-arrow)');
                            break;
                        case 'both':
                            $Line.attr('marker-start', 'url(#start-arrow)');
                            $Line.attr('marker-end', 'url(#end-arrow)');
                    }
                    this.updateAngledLineView('Geometry');
            }
        };
        return WAT_angledLineView;
    }(WAT_Control));
    $(function () {
        $(document.body).on('after-refresh', '.WAT.Control.angledLineView', function () {
            var Visual = WAT.VisualOfElement(this);
            Visual['SubPeer'] = $(this).children()[0];
        });
    });
    MasterRegistry['angledLineView'.toLowerCase()] = {
        Category: 'Control', Name: 'angledLineView',
        Group: undefined, Label: 'angledLineView',
        Classes: 'WAT Control angledLineView',
        Template: "\n      <svg width=\"100%\" height=\"100%\" viewBox=\"0 0 40 40\">\n        <defs>\n          <marker id=\"start-arrow\" markerWidth=\"10\" markerHeight=\"8\"\n            refX=\"1\" refY=\"2\" orient=\"auto\">\n            <polygon fill=\"currentColor\" points=\"5 0, 0 2, 5 4\"/>\n          </marker>\n          <marker id=\"end-arrow\" markerWidth=\"10\" markerHeight=\"8\"\n            refX=\"4\" refY=\"2\" orient=\"auto\">\n            <polygon fill=\"currentColor\" points=\"0 0, 5 2, 0 4\"/>\n          </marker>\n        </defs>\n        <polyline stroke=\"currentColor\" stroke-width=\"2\" fill=\"none\"\n          marker-start=\"url(#start-arrow)\"\n          marker-end=\"url(#end-arrow)\"\n          points=\"2,2 2,38 38,38\" />\n      </svg>\n    ".replace(/^\s+/, '').replace(/\s+$/, '').replace(/\s+/, ' '),
        Initializer: function () {
            $(this.Peer).css('overflow', 'visible');
            this.SubPeer = $(this.Peer).children()[0];
        },
        customPropertyDescriptorList: [
            { Name: 'LineColor', Label: 'Line Color', EditorType: 'color-input' },
            { Name: 'LineThickness', Label: 'Line Thickness', EditorType: 'number-input',
                minValue: 1, StepValue: 1 },
            { Name: 'LineOrientation', Label: 'Line Orientation', EditorType: 'drop-down',
                ValueList: ['up-left', 'up-right', 'down-left', 'down-right'] },
            { Name: 'ArrowHeads', Label: 'Arrow Heads', EditorType: 'drop-down',
                ValueList: ['none', 'start-only', 'end-only', 'both'] }
        ],
        initialGeometry: { Width: 40, Height: 40 },
        Prototype: new WAT_angledLineView(),
    };
    /**** fromViewportTo ****/
    function fromViewportTo(System, originalPosition, Target) {
        switch (true) {
            case (originalPosition == null):
                throw new Error('no "Position" given');
            case (typeof originalPosition.left !== 'number') && !(originalPosition.left instanceof Number):
            case (typeof originalPosition.top !== 'number') && !(originalPosition.top instanceof Number):
                throw new Error('invalid "Position" given');
        }
        switch (System) {
            case null:
            case undefined:
                throw new Error('no coordinate system given');
            // @ts-ignore the following check is for non-TypeScript applications only
            case 'viewport':
                return { left: originalPosition.left, top: originalPosition.top };
            case 'document':
                return {
                    left: originalPosition.left + window.scrollX,
                    top: originalPosition.top + window.scrollY
                };
            case 'local':
                switch (true) {
                    case (Target == null):
                        throw new Error('no target element given');
                    case (Target instanceof Element):
                        var computedStyle = window.getComputedStyle(Target);
                        var leftOffset = parseFloat(computedStyle.borderLeftWidth);
                        var topOffset = parseFloat(computedStyle.borderTopWidth);
                        var TargetPositionInViewport = Target.getBoundingClientRect();
                        return {
                            left: originalPosition.left - TargetPositionInViewport.left - leftOffset,
                            top: originalPosition.top - TargetPositionInViewport.top - topOffset
                        };
                    default:
                        throw new Error('invalid target element given');
                }
            default:
                throw new Error('invalid coordinate system given');
        }
    }
    WAT.fromViewportTo = fromViewportTo;
    /**** fromDocumentTo ****/
    function fromDocumentTo(System, originalPosition, Target) {
        switch (true) {
            case (originalPosition == null):
                throw new Error('no "Position" given');
            case (typeof originalPosition.left !== 'number') && !(originalPosition.left instanceof Number):
            case (typeof originalPosition.top !== 'number') && !(originalPosition.top instanceof Number):
                throw new Error('invalid "Position" given');
        }
        switch (System) {
            case null:
            case undefined:
                throw new Error('no coordinate system given');
            case 'viewport':
                return {
                    left: originalPosition.left - window.scrollX,
                    top: originalPosition.top - window.scrollY
                };
            // @ts-ignore the following check is for non-TypeScript applications only
            case 'document':
                return { left: originalPosition.left, top: originalPosition.top };
            case 'local':
                switch (true) {
                    case (Target == null):
                        throw new Error('no target element given');
                    case (Target instanceof Element):
                        var computedStyle = window.getComputedStyle(Target);
                        var leftOffset = parseFloat(computedStyle.borderLeftWidth);
                        var topOffset = parseFloat(computedStyle.borderTopWidth);
                        var TargetPositionInViewport = Target.getBoundingClientRect();
                        return {
                            left: originalPosition.left + window.scrollX - TargetPositionInViewport.left - leftOffset,
                            top: originalPosition.top + window.scrollY - TargetPositionInViewport.top - topOffset
                        };
                    default:
                        throw new Error('invalid target element given');
                }
            default:
                throw new Error('invalid coordinate system given');
        }
    }
    WAT.fromDocumentTo = fromDocumentTo;
    /**** fromLocalTo ****/
    function fromLocalTo(System, originalPosition, Source) {
        switch (true) {
            case (originalPosition == null):
                throw new Error('no "Position" given');
            case (typeof originalPosition.left !== 'number') && !(originalPosition.left instanceof Number):
            case (typeof originalPosition.top !== 'number') && !(originalPosition.top instanceof Number):
                throw new Error('invalid "Position" given');
        }
        var SourcePositionInViewport, leftPosition, topPosition;
        switch (true) {
            case (Source == null):
                throw new Error('no source element given');
            case (Source instanceof Element):
                var computedStyle = window.getComputedStyle(Source);
                var leftOffset = parseFloat(computedStyle.borderLeftWidth);
                var topOffset = parseFloat(computedStyle.borderTopWidth);
                SourcePositionInViewport = Source.getBoundingClientRect();
                leftPosition = SourcePositionInViewport.left + leftOffset;
                topPosition = SourcePositionInViewport.top + topOffset;
                break;
            default:
                throw new Error('invalid source element given');
        }
        switch (System) {
            case null:
            case undefined:
                throw new Error('no coordinate system given');
            case 'viewport':
                return {
                    left: originalPosition.left + leftPosition,
                    top: originalPosition.top + topPosition
                };
            case 'document':
                return {
                    left: originalPosition.left + leftPosition + window.scrollX,
                    top: originalPosition.top + topPosition + window.scrollY
                };
            // @ts-ignore the following check is for non-TypeScript applications only
            case 'local':
                return { left: originalPosition.left, top: originalPosition.top };
            default:
                throw new Error('invalid coordinate system given');
        }
    }
    WAT.fromLocalTo = fromLocalTo;
    /**** ViewportSize ****/
    // Internet Explorer and MS/Edge are NOT supported
    function ViewportSize() {
        return {
            Width: Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0),
            Height: Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
        };
    }
    WAT.ViewportSize = ViewportSize;
    var Designer;
    /**** registerDesigner ****/
    function registerDesigner(newDesigner) {
        expectPlainObject('WAT designer', newDesigner);
        if (!ValueIsFunction(newDesigner.startDesigning) ||
            !ValueIsFunction(newDesigner.stopDesigning) ||
            !ValueIsFunction(newDesigner.createDesignerButtonForApplet) ||
            !ValueIsFunction(newDesigner.importInternalFunctions))
            throwError('InvalidArgument: the given object is no valid WAT Designer');
        if (Designer == null) {
            Designer = newDesigner;
            Designer.importInternalFunctions({
                fromViewportTo: fromViewportTo,
                fromDocumentTo: fromDocumentTo,
                fromLocalTo: fromLocalTo,
                ViewportSize: ViewportSize
            });
            if (WAT_isRunning) {
                $('.WAT.Applet').each(function () {
                    Designer.createDesignerButtonForApplet(VisualOfElement(this));
                });
            }
        }
        else {
            if (Designer !== newDesigner)
                throwError('DesignerExists: another WAT Designer has already been registered');
        }
    }
    WAT.registerDesigner = registerDesigner;
    /**** ready - similar to jQuery.ready ****/
    var WAT_isReady = false;
    var ReadyFunctionsToCall = [];
    function ready(FunctionToCall) {
        expectFunction('function to call', FunctionToCall);
        if (WAT_isReady && !ReadyFunctionsAreRunning) {
            return FunctionToCall(); // may throw!
        }
        else {
            ReadyFunctionsToCall.push(FunctionToCall);
        }
    }
    WAT.ready = ready;
    /**** invokeAllReadyFunctionsToCall - WAT is ready but applets not yet started ****/
    // ReadyFunctionsToCall may be extended while invokeAllReadyFunctionsToCall is running!
    var ReadyFunctionsAreRunning = false;
    function invokeAllReadyFunctionsToCall() {
        console.info('WAT is ready');
        ReadyFunctionsAreRunning = true;
        for (var i = 0; i < ReadyFunctionsToCall.length; i++) {
            try {
                ReadyFunctionsToCall[i]();
            }
            catch (signal) {
                console.error('registered WAT "ready" handler failed with ', signal);
            }
        }
        ReadyFunctionsAreRunning = false;
    }
    /**** running - similar to jQuery.ready ****/
    var WAT_isRunning = false;
    var RunningFunctionsToCall = [];
    function running(FunctionToCall) {
        expectFunction('function to call', FunctionToCall);
        if (WAT_isRunning && !RunningFunctionsAreRunning) {
            return FunctionToCall(); // may throw!
        }
        else {
            RunningFunctionsToCall.push(FunctionToCall);
        }
    }
    WAT.running = running;
    /**** invokeAllRunningFunctionsToCall - all WAT applets are running ****/
    // RunningFunctionsToCall may be extended while invokeAllRunningFunctionsToCall is running!
    var RunningFunctionsAreRunning = false;
    function invokeAllRunningFunctionsToCall() {
        console.info('WAT is running');
        RunningFunctionsAreRunning = true;
        for (var i = 0; i < RunningFunctionsToCall.length; i++) {
            try {
                RunningFunctionsToCall[i]();
            }
            catch (signal) {
                console.error('registered WAT "running" handler failed with ', signal);
            }
        }
        RunningFunctionsAreRunning = false;
    }
    //----------------------------------------------------------------------------//
    //                                WAT Start-Up                                //
    //----------------------------------------------------------------------------//
    WAT.global['WAT'] = Object.assign(WAT.ready, WAT);
    /**** startWAT ****/
    function startWAT() {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        WAT_isReady = true;
                        invokeAllReadyFunctionsToCall();
                        return [4 /*yield*/, startAllApplets()];
                    case 1:
                        _a.sent();
                        WAT_isRunning = true;
                        invokeAllRunningFunctionsToCall();
                        if (Designer != null) {
                            $('.WAT.Applet').each(function () {
                                Designer.createDesignerButtonForApplet(VisualOfElement(this));
                            });
                        }
                        return [2 /*return*/];
                }
            });
        });
    }
    /**** startAllApplets ****/
    function startAllApplets() {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                $('.WAT.Applet').each(function () {
                    return __awaiter(this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: // applets start simultaneously
                                return [4 /*yield*/, startAppletFromPeer(this)];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    });
                });
                return [2 /*return*/];
            });
        });
    }
    /**** startAppletFromPeer ****/
    function startAppletFromPeer(Peer) {
        return __awaiter(this, void 0, Promise, function () {
            var Applet;
            return __generator(this, function (_a) {
                Applet = VisualFromPeer(Peer, 'recursively') // WAT is not yet running!
                ;
                triggerRecursivelyOutwards(Peer, 'after-deserialization');
                return [2 /*return*/];
            });
        });
    }
    /**** start WAT and applets ****/
    function startup() {
        collectInternalNames();
        collectForbiddenPropertyNames();
        validateAllPeers();
        installEventHandlerForErrorIndicators();
        startWAT();
    }
    $(startup);
    console.info('WAT is available');
})(WAT || (WAT = {}));
