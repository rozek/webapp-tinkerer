/*******************************************************************************
*                                                                              *
*                        WebApp Tinkerer (WAT) Designer                        *
*                                                                              *
*******************************************************************************/
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
var WAD;
(function (WAD) {
    var Version = '0.1.0';
    WAD.WAT_horizontalAnchorses = ['left-width', 'left-right', 'width-right'];
    WAD.WAT_verticalAnchorses = ['top-height', 'top-bottom', 'height-bottom'];
    /**** visual data types ****/
    WAD.WAT_FontWeights = [
        'thin', 'extra-light', 'light', 'normal', 'medium', 'semi-bold',
        'bold', 'extra-bold', 'heavy', 'lighter', 'bolder'
    ];
    WAD.WAT_FontWeightValues = Object.assign(Object.create(null), {
        'thin': 100, 'extra-light': 200, 'light': 300, 'normal': 400, 'medium': 500,
        'semi-bold': 600, 'bold': 700, 'extra-bold': 800, 'heavy': 900
    });
    WAD.WAT_FontStyles = ['normal', 'italic'];
    WAD.WAT_BackgroundModes = ['normal', 'contain', 'cover', 'fill', 'tile'];
    WAD.WAT_Cursors = [
        'alias', 'all-scroll', 'auto', 'cell', 'context-menu', 'col-resize', 'copy',
        'crosshair', 'default', 'e-resize', 'ew-resize', 'grab', 'grabbing', 'help',
        'move', 'n-resize', 'ne-resize', 'nesw-resize', 'ns-resize', 'nw-resize',
        'nwse-resize', 'no-drop', 'none', 'not-allowed', 'pointer', 'progress',
        'row-resize', 's-resize', 'se-resize', 'sw-resize', 'text', 'vertical-text',
        'w-resize', 'wait', 'zoom-in', 'zoom-out'
    ];
    WAD.WAT_Overflows = ['visible', 'hidden', 'scroll', 'auto'];
    WAD.WAT_TextOverflows = ['clip', 'ellipsis'];
    WAD.WAT_Categories = ['Applet', 'Card', 'Compound', 'Control'];
    WAD.WAT_TextDecorationLines = ['none', 'underline', 'overline', 'line-through'];
    WAD.WAT_TextDecorationStyles = ['solid', 'double', 'dotted', 'dashed', 'wavy'];
    WAD.WAT_TextAlignments = ['left', 'center', 'right', 'justify'];
    WAD.WAT_BorderStyles = [
        'none', 'dotted', 'dashed', 'solid', 'double',
        'groove', 'ridge', 'inset', 'outset'
    ];
    /**** custom Properties ****/
    WAD.WAT_PropertyEditorTypes = [
        'checkbox', 'choice',
        'textline-input', 'password-input', 'number-input', 'search-input',
        'phone-number-input', 'email-address-input', 'url-input',
        'time-input', 'date-time-input', 'date-input', 'month-input', 'week-input',
        'color-input', 'drop-down', 'slider',
        'text-input', 'html-input', 'css-input', 'javascript-input', 'json-input',
        'linelist-input'
    ];
    /**** get a reference to the "global" object ****/
    var global = Function('return this')();
    // see https://stackoverflow.com/questions/3277182/how-to-get-the-global-object-in-javascript
    var WAT = global['WAT'];
    /**** check jQuery dependency ****/
    if ( // duck typing test for jQuery
    (typeof $ !== 'function') || ($.fn == null) ||
        !/^\d+[.]\d+([.]\d+)?$/.test($.fn.jquery)) {
        window.alert('jQuery not found\n\n' +
            'The WebApp Tinkerer (WAT) requires jQuery to be loaded first');
        throw new Error('MissingDependency: "jquery" not found');
    }
    /**** check javascript-interface-library dependency ****/
    if ((global['JIL'] == null) || (typeof global['JIL'] !== 'object')) {
        window.alert('"javascript-interface-library" not found\n\n' +
            'The WebApp Tinkerer (WAT) requires the "javascript-interface-library" ' +
            'to be loaded first');
        throw new Error('MissingDependency: "javascript-interface-library" not found');
    }
    var _a = global['JIL'], throwError = _a.throwError, ObjectIsEmpty = _a.ObjectIsEmpty, // ValuesDiffer,
    ValueIsBoolean = _a.ValueIsBoolean, ValueIsFiniteNumber = _a.ValueIsFiniteNumber, ValueIsString = _a.ValueIsString, ValueIsArray = _a.ValueIsArray, ValidatorForClassifier = _a.ValidatorForClassifier, acceptNil = _a.acceptNil, rejectNil = _a.rejectNil, allowFiniteNumber = _a.allowFiniteNumber, HTMLsafe = _a.HTMLsafe, quoted = _a.quoted, escaped = _a.escaped;
    /**** check download dependency ****/
    if ((global['download'] == null) || (typeof global['download'] !== 'function')) {
        window.alert('"download" not found\n\n' +
            'The WebApp Tinkerer (WAT) requires the "download" utility ' +
            'to be loaded first');
        throw new Error('MissingDependency: "download" not found');
    }
    var download = global['download'];
    /**** check CodeFlask dependency ****/
    if ((global['CodeFlask'] == null) || (typeof global['CodeFlask'] !== 'function')) {
        window.alert('"CodeFlask" not found\n\n' +
            'The WebApp Tinkerer (WAT) requires the "CodeFlask" editor ' +
            'to be loaded first');
        throw new Error('MissingDependency: "CodeFlask" not found');
    }
    var CodeFlask = global['CodeFlask'];
    var _b = global['WAT'], ValueIsVisual = _b.ValueIsVisual, allowVisual = _b.allowVisual, allowedVisual = _b.allowedVisual, expectVisual = _b.expectVisual, expectedVisual = _b.expectedVisual, ValueIsApplet = _b.ValueIsApplet, allowApplet = _b.allowApplet, allowedApplet = _b.allowedApplet, expectApplet = _b.expectApplet, expectedApplet = _b.expectedApplet, ValueIsContainer = _b.ValueIsContainer, allowContainer = _b.allowContainer, allowedContainer = _b.allowedContainer, expectContainer = _b.expectContainer, expectedContainer = _b.expectedContainer, ValueIsCard = _b.ValueIsCard, allowCard = _b.allowCard, allowedCard = _b.allowedCard, expectCard = _b.expectCard, expectedCard = _b.expectedCard, ValueIsComponent = _b.ValueIsComponent, allowComponent = _b.allowComponent, allowedComponent = _b.allowedComponent, expectComponent = _b.expectComponent, expectedComponent = _b.expectedComponent, ValueIsCompound = _b.ValueIsCompound, allowCompound = _b.allowCompound, allowedCompound = _b.allowedCompound, expectCompound = _b.expectCompound, expectedCompound = _b.expectedCompound, ValueIsControl = _b.ValueIsControl, allowControl = _b.allowControl, allowedControl = _b.allowedControl, expectControl = _b.expectControl, expectedControl = _b.expectedControl, ValueIsName = _b.ValueIsName, allowName = _b.allowName, allowedName = _b.allowedName, expectName = _b.expectName, expectedName = _b.expectedName, ValueIsOrdinaryName = _b.ValueIsOrdinaryName, allowOrdinaryName = _b.allowOrdinaryName, allowedOrdinaryName = _b.allowedOrdinaryName, expectOrdinaryName = _b.expectOrdinaryName, expectedOrdinaryName = _b.expectedOrdinaryName, ValueIsUniqueName = _b.ValueIsUniqueName, allowUniqueName = _b.allowUniqueName, allowedUniqueName = _b.allowedUniqueName, expectUniqueName = _b.expectUniqueName, expectedUniqueName = _b.expectedUniqueName, ValueIsIdentifier = _b.ValueIsIdentifier, allowIdentifier = _b.allowIdentifier, allowedIdentifier = _b.allowedIdentifier, expectIdentifier = _b.expectIdentifier, expectedIdentifier = _b.expectedIdentifier, ValueIsLocation = _b.ValueIsLocation, allowLocation = _b.allowLocation, allowedLocation = _b.allowedLocation, expectLocation = _b.expectLocation, expectedLocation = _b.expectedLocation, ValueIsDimension = _b.ValueIsDimension, allowDimension = _b.allowDimension, allowedDimension = _b.allowedDimension, expectDimension = _b.expectDimension, expectedDimension = _b.expectedDimension, ValueIsIncompleteGeometry = _b.ValueIsIncompleteGeometry, allowIncompleteGeometry = _b.allowIncompleteGeometry, allowedIncompleteGeometry = _b.allowedIncompleteGeometry, expectIncompleteGeometry = _b.expectIncompleteGeometry, expectedIncompleteGeometry = _b.expectedIncompleteGeometry, ValueIsOffsets = _b.ValueIsOffsets, allowOffsets = _b.allowOffsets, allowedOffsets = _b.allowedOffsets, expectOffsets = _b.expectOffsets, expectedOffsets = _b.expectedOffsets, ValueIsTextDecoration = _b.ValueIsTextDecoration, allowTextDecoration = _b.allowTextDecoration, allowedTextDecoration = _b.allowedTextDecoration, expectTextDecoration = _b.expectTextDecoration, expectedTextDecoration = _b.expectedTextDecoration, ValueIsTextShadow = _b.ValueIsTextShadow, allowTextShadow = _b.allowTextShadow, allowedTextShadow = _b.allowedTextShadow, expectTextShadow = _b.expectTextShadow, expectedTextShadow = _b.expectedTextShadow, ValueIsTextAlignment = _b.ValueIsTextAlignment, allowTextAlignment = _b.allowTextAlignment, allowedTextAlignment = _b.allowedTextAlignment, expectTextAlignment = _b.expectTextAlignment, expectedTextAlignment = _b.expectedTextAlignment, ValueIsBorderStyle = _b.ValueIsBorderStyle, allowBorderStyle = _b.allowBorderStyle, allowedBorderStyle = _b.allowedBorderStyle, expectBorderStyle = _b.expectBorderStyle, expectedBorderStyle = _b.expectedBorderStyle, ValueIsBoxShadow = _b.ValueIsBoxShadow, allowBoxShadow = _b.allowBoxShadow, allowedBoxShadow = _b.allowedBoxShadow, expectBoxShadow = _b.expectBoxShadow, expectedBoxShadow = _b.expectedBoxShadow, ValueIsCustomCursor = _b.ValueIsCustomCursor, allowCustomCursor = _b.allowCustomCursor, allowedCustomCursor = _b.allowedCustomCursor, expectCustomCursor = _b.expectCustomCursor, expectedCustomCursor = _b.expectedCustomCursor;
    var _c = global['WAT'], VisualOfElement = _c.VisualOfElement, VisualWithElement = _c.VisualWithElement;
    /**** Functions imported from the Runtime ****/
    function importInternalFunctions(FunctionSet) {
        // will be inserted again later
    }
    /**** ValuesDiffer ****/
    var nesting = 0;
    function ValuesDiffer(thisValue, otherValue, Mode, maxNesting) {
        if (maxNesting === void 0) { maxNesting = 100; }
        if (thisValue === otherValue) {
            return false;
        }
        var thisType = typeof thisValue;
        if (thisType !== typeof otherValue) {
            return true;
        }
        nesting++;
        if (nesting > maxNesting) {
            return false; // no change found yet - give up here
        }
        /**** ArraysDiffer ****/
        function ArraysDiffer(thisArray, otherArray, Mode) {
            if (!Array.isArray(otherArray)) {
                nesting--;
                return true;
            }
            if (thisArray.length !== otherArray.length) {
                nesting--;
                return true;
            }
            for (var i = 0, l = thisArray.length; i < l; i++) {
                if (ValuesDiffer(thisArray[i], otherArray[i], Mode)) {
                    nesting--;
                    return true;
                }
            }
            nesting--;
            return false;
        }
        /**** ObjectsDiffer ****/
        function ObjectsDiffer(thisObject, otherObject, Mode) {
            if (Object.getPrototypeOf(thisObject) !== Object.getPrototypeOf(otherObject)) {
                nesting--;
                return true;
            }
            for (var key in thisObject) {
                if (!(key in otherObject)) {
                    nesting--;
                    return true;
                }
            }
            for (var key in otherObject) {
                if (!(key in thisObject)) {
                    nesting--;
                    return true;
                }
                if (ValuesDiffer(thisObject[key], otherObject[key], Mode)) {
                    nesting--;
                    return true;
                }
            }
            nesting--;
            return false;
        }
        switch (thisType) {
            case 'undefined':
            case 'boolean':
            case 'string':
            case 'function':
                nesting--;
                return true; // most primitives are compared using "==="
            case 'number':
                nesting--;
                return ((isNaN(thisValue) !== isNaN(otherValue)) ||
                    (Math.abs(thisValue - otherValue) > Number.EPSILON));
            case 'object':
                if (thisValue == null) {
                    nesting--;
                    return true;
                } // since "other_value" != null!
                if (otherValue == null) {
                    nesting--;
                    return true;
                } // since "this_value" != null!
                if ((Mode === 'by-value') && ((thisValue instanceof Boolean) ||
                    (thisValue instanceof Number) ||
                    (thisValue instanceof String))) {
                    nesting--;
                    return (thisValue.valueOf() !== otherValue.valueOf());
                }
                if (Array.isArray(thisValue)) {
                    return ArraysDiffer(thisValue, otherValue, Mode);
                }
                return (Mode === 'by-reference'
                    ? (nesting--, true) // because (thisValue !== otherValue)
                    : ObjectsDiffer(thisValue, otherValue, Mode));
            default: return true; // unsupported property type
        }
        return true;
    }
    /**** ListWith ****/
    function ListWith(List, Item) {
        List = List.slice();
        if (List.indexOf(Item) < 0) {
            List.push(Item);
        }
        return List;
    }
    /**** ListWithAll ****/
    function ListWithAll(List, Items) {
        List = List.slice();
        Items.forEach(function (Item) {
            if (List.indexOf(Item) < 0) {
                List.push(Item);
            }
        });
        return List;
    }
    /**** ListWithout ****/
    function ListWithout(List, Item) {
        List = List.slice();
        var ItemIndex = List.indexOf(Item);
        if (ItemIndex >= 0) {
            List.splice(ItemIndex, 1);
        }
        return List;
    }
    /**** ListWithoutAll ****/
    function ListWithoutAll(List, Items) {
        List = List.slice();
        Items.forEach(function (Item) {
            var ItemIndex = List.indexOf(Item);
            if (ItemIndex >= 0) {
                List.splice(ItemIndex, 1);
            }
        });
        return List;
    }
    function VisualSetFrom(Visuals) {
        var VisualSet = Object.create(null);
        Visuals.forEach(function (Visual) {
            VisualSet[Visual.uniqueId] = Visual;
        });
        return VisualSet;
    }
    /**** ViewportSize ****/
    // Internet Explorer and MS/Edge are NOT supported
    function ViewportSize() {
        return {
            Width: Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0),
            Height: Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
        };
    }
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
                        var computedStyle_1 = window.getComputedStyle(Target);
                        var leftOffset = parseFloat(computedStyle_1.borderLeftWidth);
                        var topOffset = parseFloat(computedStyle_1.borderTopWidth);
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
    /**** AppletsInDocument ****/
    function AppletsInDocument() {
        var Result = [];
        $('.WAT.Applet').each(function () {
            Result.push(VisualOfElement(this));
        });
        return Result;
    }
    /**** orderedComponents ****/
    function orderedComponents(Components) {
        if (Components.length === 0) {
            return Components;
        }
        var Container = Components[0].Container;
        var Siblings = Container.Components; // in DOM order
        var ComponentSet = VisualSetFrom(Components);
        var Result = [];
        Siblings.forEach(function (Component) {
            if (Component.uniqueId in ComponentSet) {
                Result.push(Component);
            }
        });
        return Result;
    }
    /**** GeometriesOfComponents ****/
    function GeometriesOfComponents(Components) {
        return Components.map(function (Component) { return Component.Geometry; });
    }
    /**** changeGeometryOfComponentsBy ****/
    function changeGeometryOfComponentsBy(Components, dX, dY, dWidth, dHeight) {
        Components.forEach(function (Component, Index) {
            var Geometry = Component.Geometry;
            if (dX != null) {
                Geometry.x += dX;
            }
            if (dY != null) {
                Geometry.y += dY;
            }
            if (dWidth != null) {
                Geometry.Width += dWidth;
            }
            if (dHeight != null) {
                Geometry.Height += dHeight;
            }
            Component.Geometry = Geometry;
        });
    }
    /**** changeGeometryOfComponentsTo ****/
    function changeGeometryOfComponentsTo(Components, GeometryList) {
        Components.forEach(function (Component, Index) {
            Component.Geometry = GeometryList[Index];
        });
    }
    /**** topmostIndexOfVisualsAmong ****/
    function topmostIndexOfVisualsAmong(Visuals, Siblings) {
        return Visuals.reduce(function (topmostIndex, Visual) {
            return Math.min(topmostIndex, Siblings.indexOf(Visual));
        }, Siblings.length);
    }
    /**** bottommostIndexOfVisualsAmong ****/
    function bottommostIndexOfVisualsAmong(Visuals, Siblings) {
        return Visuals.reduce(function (bottommostIndex, Visual) {
            return Math.max(bottommostIndex, Siblings.indexOf(Visual));
        }, 0);
    }
    /**** VisualsMayBeShiftedUp ****/
    function VisualsMayBeShiftedUp(Mode, Visuals) {
        return Visuals.some(function (Visual) { return Visual.mayBeShiftedUp; });
    }
    /**** VisualsMayBeShiftedDown ****/
    function VisualsMayBeShiftedDown(Mode, Visuals) {
        return Visuals.some(function (Visual) { return Visual.mayBeShiftedDown; });
    }
    //----------------------------------------------------------------------------//
    //                                MouseGrabber                                //
    //----------------------------------------------------------------------------//
    var MouseGrabTarget = null;
    var MouseGrabLayer = null;
    /**** startMouseGrabbingFor ****/
    function startMouseGrabbingFor(Target) {
        if (MouseGrabLayer == null) {
            function delegatingEventHandler(Event) {
                if (MouseGrabTarget != null) {
                    var TargetEvent = $.Event(Event.type, Event);
                    TargetEvent.target = MouseGrabTarget[0];
                    MouseGrabTarget.trigger(TargetEvent); // bubbles from target upwards
                    return false; // but original event stops bubbling at MouseGrabLayer
                } // handler hides itself if not actually grabbing the mouse
            }
            MouseGrabLayer = $('<div id="WAD-MouseGrabLayer"></div>');
            MouseGrabLayer.on('mousedown mousemove mouseup', delegatingEventHandler);
            $(document.body).append(MouseGrabLayer);
        }
        MouseGrabTarget = Target;
    }
    /**** stopMouseGrabbing ****/
    function stopMouseGrabbing() {
        if (MouseGrabLayer != null) {
            MouseGrabLayer.remove(); // also removes any attached event handlers
            MouseGrabLayer = null;
        }
        MouseGrabTarget = null;
    }
    //----------------------------------------------------------------------------//
    //                           Dragger and Draggable                            //
    //----------------------------------------------------------------------------//
    var ThresholdX = 4;
    var Duration = 400;
    var ThresholdY = 4;
    var initialX, initialY; // position of initial MouseDown at drag start
    var initialGeometry; // initial geometry of "draggedElement"
    var SizeDirection;
    var initialTabIndex; // TabIndex will be set to "-1" while dragging
    var draggingElement, draggedElement;
    var computedStyle; // live(!), obtained upon displacement/deformation start
    /**** resetDragging ****/
    function resetDragging() {
        initialX = undefined;
        initialGeometry = undefined;
        SizeDirection = undefined;
        initialY = undefined;
        initialTabIndex = undefined;
        draggingElement = undefined;
        draggedElement = undefined;
        computedStyle = undefined;
    }
    /**** displaceDraggedElementBy - respects min/maxX/Y ****/
    var DefaultLimits = { left: 0, top: 0, right: 32, bottom: 24 };
    // left:   how far may the draggable extend beyond the left of its container?
    // right:  how close may the draggable get to the right of its container?
    // top:    how far may the draggable extend above the top of its container?
    // bottom: how close may the draggable get to the bottom of its container?
    function displaceDraggedElementBy(DeltaX, DeltaY, Duration) {
        var oldX = initialGeometry.x, newX = oldX + DeltaX;
        var oldY = initialGeometry.y, newY = oldY + DeltaY;
        var Limits;
        if ((newX !== oldX) || (newY !== oldY)) {
            var LimitsJSON = draggedElement.attr('dragger-limits');
            if (LimitsJSON != null) {
                try {
                    Limits = JSON.parse(LimitsJSON);
                }
                catch (Signal) { /* nop */ }
            }
            if (Limits == null) {
                Limits = DefaultLimits;
            }
            else {
                Limits = Object.assign({}, DefaultLimits, Limits);
            }
            var Container = draggedElement.parent();
            newX = Math.max(-Limits.left, Math.min(newX, Container.width() - Limits.right));
            newY = Math.max(-Limits.top, Math.min(newY, Container.height() - Limits.bottom));
        }
        changeGeometryOfElementTo(draggedElement, newX, newY, null, null, Duration);
    }
    /**** deformDraggedElementBy - respects min/maxX/Y/Width/Height ****/
    function deformDraggedElementBy(DeltaX, DeltaY, Duration) {
        var oldX = initialGeometry.x, oldWidth = initialGeometry.Width;
        var oldY = initialGeometry.y, oldHeight = initialGeometry.Height;
        var newX, newY, newWidth, newHeight;
        switch (SizeDirection) {
            case 'nw':
                newWidth = oldWidth - DeltaX;
                newHeight = oldHeight - DeltaY;
                break;
            case 'n':
                newWidth = oldWidth;
                newHeight = oldHeight - DeltaY;
                break;
            case 'ne':
                newWidth = oldWidth + DeltaX;
                newHeight = oldHeight - DeltaY;
                break;
            case 'e':
                newWidth = oldWidth + DeltaX;
                newHeight = oldHeight;
                break;
            case 'se':
                newWidth = oldWidth + DeltaX;
                newHeight = oldHeight + DeltaY;
                break;
            case 's':
                newWidth = oldWidth;
                newHeight = oldHeight + DeltaY;
                break;
            case 'sw':
                newWidth = oldWidth - DeltaX;
                newHeight = oldHeight + DeltaY;
                break;
            case 'w':
                newWidth = oldWidth - DeltaX;
                newHeight = oldHeight;
                break;
        }
        if (newWidth !== oldWidth) {
            var minWidth = parseFloat(computedStyle.minWidth || '0');
            var maxWidth = (computedStyle.maxWidth === 'none' ? Infinity : parseFloat(computedStyle.maxWidth));
            newWidth = Math.max(minWidth, Math.min(newWidth, maxWidth));
        }
        if (newHeight !== oldHeight) {
            var minHeight = parseFloat(computedStyle.minHeight || '0');
            var maxHeight = (computedStyle.maxHeight === 'none' ? Infinity : parseFloat(computedStyle.maxHeight));
            newHeight = Math.max(minHeight, Math.min(newHeight, maxHeight));
        }
        switch (SizeDirection) {
            case 'nw':
                newX = oldX - (newWidth - oldWidth);
                newY = oldY - (newHeight - oldHeight);
                break;
            case 'n':
                newX = oldX;
                newY = oldY - (newHeight - oldHeight);
                break;
            case 'ne':
                newX = oldX;
                newY = oldY - (newHeight - oldHeight);
                break;
            case 'e':
                newX = oldX;
                newY = oldY;
                break;
            case 'se':
                newX = oldX;
                newY = oldY;
                break;
            case 's':
                newX = oldX;
                newY = oldY;
                break;
            case 'sw':
                newX = oldX - (newWidth - oldWidth);
                newY = oldY;
                break;
            case 'w':
                newX = oldX - (newWidth - oldWidth);
                newY = oldY;
                break;
        }
        changeGeometryOfElementTo(draggedElement, newX, newY, newWidth, newHeight, Duration);
    }
    /**** MovementWasDetected ****/
    function MovementWasDetected(dx, dy) {
        return (dx * dx >= ThresholdX) || (dy * dy >= ThresholdY);
    }
    /**** onMouseDown_beforeDragging ****/
    function onMouseDown_beforeDragging(Event) {
        if ((initialGeometry == null) && (Event.which === 1)) {
            var Element = $(Event.target);
            if (Element.hasClass('WAD-Dragger')) {
                initialX = Event.pageX;
                SizeDirection = Element.attr('size-direction');
                initialY = Event.pageY;
                draggingElement = Element;
                draggedElement = Element.closest('.WAD-Draggable');
                startMouseGrabbingFor(draggingElement);
                grabKeyboardFor(draggingElement);
                if (MovementWasDetected(0, 0)) {
                    if (SizeDirection == null) { // start moving or sizing right away
                        startDisplacement(Event);
                    }
                    else {
                        startDeformation(Event);
                    }
                    return false;
                }
            }
        }
    }
    /**** onMouseMove_beforeDragging ****/
    function onMouseMove_beforeDragging(Event) {
        if (Event.which === 1) {
            var Element = $(Event.target);
            if (Element.is(draggingElement) && (initialGeometry == null)) {
                if (MovementWasDetected(Event.pageX - initialX, Event.pageY - initialY)) {
                    if (SizeDirection == null) { // start moving or sizing now
                        startDisplacement(Event);
                    }
                    else {
                        startDeformation(Event);
                    }
                    return false;
                }
            }
        }
    }
    /**** onMouseUp_beforeDragging ****/
    function onMouseUp_beforeDragging(Event) {
        if (Event.which === 1) {
            var Element = $(Event.target);
            if (Element.is(draggingElement) && (initialGeometry == null)) {
                stopMouseGrabbing();
                releaseKeyboardFor(draggingElement);
                resetDragging();
                var ClickEvent = $.Event('click');
                ClickEvent.clientX = Event.clientX;
                ClickEvent.clientY = Event.clientY;
                ClickEvent.pageX = Event.pageX;
                ClickEvent.pageY = Event.pageY;
                ClickEvent['originalEvent'] = Event;
                Element.trigger(ClickEvent);
                //      return false
            }
        }
    }
    /**** onKeyDown_beforeDragging ****/
    function onKeyDown_beforeDragging(Event) {
        var KeyCode = Event.which;
        if (KeyCode === 27) { // ESC key
            var Element = $(Event.target);
            if (Element.is(draggingElement) && (initialGeometry == null)) {
                stopMouseGrabbing();
                releaseKeyboardFor(draggingElement);
                resetDragging();
                return false;
            }
        }
    }
    /**** onMouseMove_whileDragging ****/
    function onMouseMove_whileDragging(Event) {
        if (Event.which === 1) {
            var Element = $(Event.target);
            if (Element.is(draggingElement) && (initialGeometry != null)) {
                if (SizeDirection == null) {
                    continueDisplacement(Event);
                }
                else {
                    continueDeformation(Event);
                }
                return false;
            }
        }
    }
    /**** onMouseUp_whileDragging ****/
    function onMouseUp_whileDragging(Event) {
        if (Event.which === 1) {
            var Element = $(Event.target);
            if (Element.is(draggingElement) && (initialGeometry != null)) {
                if (SizeDirection == null) {
                    finishDisplacement(Event);
                }
                else {
                    finishDeformation(Event);
                }
                return false;
            }
        }
    }
    /**** onKeyDown_whileDragging ****/
    function onKeyDown_whileDragging(Event) {
        var KeyCode = Event.which;
        if (KeyCode === 27) { // ESC key
            var Element = $(Event.target);
            if (Element.is(draggingElement) && (initialGeometry != null)) {
                if (SizeDirection == null) {
                    abortDisplacement();
                }
                else {
                    abortDeformation();
                }
                return false;
            }
        }
    }
    /**** startDisplacement ****/
    function startDisplacement(Event) {
        computedStyle = window.getComputedStyle(draggedElement[0], null);
        initialGeometry = GeometryOfElement(draggedElement);
        draggedElement.addClass('WAD-draggedElement');
        displaceDraggedElementBy(Event.pageX - initialX, Event.pageY - initialY);
    }
    /**** continueDisplacement ****/
    function continueDisplacement(Event) {
        displaceDraggedElementBy(Event.pageX - initialX, Event.pageY - initialY);
    }
    /**** finishDisplacement ****/
    function finishDisplacement(Event) {
        displaceDraggedElementBy(Event.pageX - initialX, Event.pageY - initialY);
        draggedElement.removeClass('WAD-draggedElement');
        releaseKeyboardFor(draggedElement);
        stopMouseGrabbing();
        resetDragging();
    }
    /**** abortDisplacement ****/
    function abortDisplacement() {
        displaceDraggedElementBy(0, 0, Duration);
        draggedElement.removeClass('WAD-draggedElement');
        releaseKeyboardFor(draggedElement);
        stopMouseGrabbing();
        resetDragging();
    }
    /**** startDeformation ****/
    function startDeformation(Event) {
        computedStyle = window.getComputedStyle(draggedElement[0], null);
        initialGeometry = GeometryOfElement(draggedElement);
        draggedElement.addClass('WAD-draggedElement');
        deformDraggedElementBy(Event.pageX - initialX, Event.pageY - initialY);
    }
    /**** continueDeformation ****/
    function continueDeformation(Event) {
        deformDraggedElementBy(Event.pageX - initialX, Event.pageY - initialY);
    }
    /**** finishDeformation ****/
    function finishDeformation(Event) {
        deformDraggedElementBy(Event.pageX - initialX, Event.pageY - initialY);
        draggedElement.removeClass('WAD-draggedElement');
        releaseKeyboardFor(draggedElement);
        stopMouseGrabbing();
        resetDragging();
    }
    /**** abortDeformation ****/
    function abortDeformation() {
        deformDraggedElementBy(0, 0, Duration);
        draggedElement.removeClass('WAD-draggedElement');
        releaseKeyboardFor(draggedElement);
        stopMouseGrabbing();
        resetDragging();
    }
    /**** grabKeyboardFor ****/
    function grabKeyboardFor(Element) {
        initialTabIndex = Element.attr('tabindex');
        Element.attr('tabindex', -1);
        Element.focus();
    }
    /**** releaseKeyboardFor ****/
    function releaseKeyboardFor(Element) {
        if (initialTabIndex == null) {
            Element.removeAttr('tabindex');
        }
        else {
            Element.attr('tabindex', initialTabIndex);
        }
    }
    /**** activate dragging after document has been loaded ****/
    $(function implementDraggability() {
        /**** before actual movement ****/
        $(document).on('mousedown', '.WAD-Dragger', onMouseDown_beforeDragging);
        $(document).on('mousemove', '.WAD-Dragger', onMouseMove_beforeDragging);
        $(document).on('mouseup', '.WAD-Dragger', onMouseUp_beforeDragging);
        $(document).on('keydown', '.WAD-Dragger', onKeyDown_beforeDragging);
        /**** during actual movement ****/
        $(document).on('mousemove', '.WAD-draggedElement', onMouseMove_whileDragging);
        $(document).on('mouseup', '.WAD-draggedElement', onMouseUp_whileDragging);
        $(document).on('keydown', '.WAD-draggedElement', onKeyDown_whileDragging);
        /**** start with a well-defined, clean state ****/
        $('.WAD-draggedElement').removeClass('WAD-draggedElement');
    });
    //----------------------------------------------------------------------------//
    //                             Geometry Handling                              //
    //----------------------------------------------------------------------------//
    /**** GeometryOfElement ****/
    function GeometryOfElement(Element) {
        return {
            x: Element[0].offsetLeft, Width: Element[0].offsetWidth,
            y: Element[0].offsetTop, Height: Element[0].offsetHeight // dto.
        };
    }
    /**** changeGeometryOfElementTo ****/
    function changeGeometryOfElementTo(Element, x, y, Width, Height, Duration) {
        var StyleChanges = {};
        function changeStyles(additionalChanges) {
            Object.assign(StyleChanges, additionalChanges);
        }
        /**** compute horizontal geometry update ****/
        var horizontalAnchors, oldLeft, oldWidth, oldRight;
        if ((x != null) || (Width != null)) {
            horizontalAnchors = horizontalAnchorsOfElement(Element);
            oldWidth = Math.round(Element[0].offsetWidth); // incl. border
        }
        if (x != null) {
            oldLeft = Math.round(Element[0].offsetLeft);
            oldRight = (horizontalAnchors === 'left-width' ? NaN : Element.parent()[0].clientWidth - oldLeft - oldWidth);
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
                oldRight = (StyleChanges.right != null ? parseFloat(StyleChanges.right) : Element.parent()[0].clientWidth - oldLeft - oldWidth);
                changeStyles({ right: (oldRight - (Width - oldWidth)) + 'px' });
            }
            else {
                changeStyles({ width: Width + 'px' });
            }
        }
        /**** compute vertical geometry update ****/
        var verticalAnchors, oldTop, oldHeight, oldBottom;
        if ((y != null) || (Height != null)) {
            verticalAnchors = verticalAnchorsOfElement(Element);
            oldHeight = Math.round(Element[0].offsetHeight);
        }
        if (y != null) {
            oldTop = Math.round(Element[0].offsetTop);
            oldBottom = (verticalAnchors === 'top-height' ? NaN : Element.parent()[0].clientHeight - oldTop - oldHeight);
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
                oldBottom = (StyleChanges.bottom != null ? parseFloat(StyleChanges.bottom) : Element.parent()[0].clientHeight - oldTop - oldHeight);
                changeStyles({ bottom: (oldBottom - (Height - oldHeight)) + 'px' });
            }
            else {
                changeStyles({ height: Height + 'px' });
            }
        }
        /**** now actually update the visual ****/
        if (!ObjectIsEmpty(StyleChanges)) {
            if (Duration == null) {
                Element.css(StyleChanges);
            }
            else {
                Element.animate(StyleChanges, Duration);
            }
        }
    }
    /**** horizontalAnchorsOfElement ****/
    function horizontalAnchorsOfElement(Element) {
        var left = Element[0].style.left || 'auto';
        var right = Element[0].style.right || 'auto';
        var Width = Element[0].style.width || 'auto';
        if (right === 'auto') {
            return 'left-width';
        }
        if (Width === 'auto') {
            return 'left-right';
        }
        if (left === 'auto') {
            return 'width-right';
        } // check this last
        console.error('could not determine horizontal anchors of given DOM element\n' +
            'got left:' + left + ', right:' + right + ', width:' + Width);
        return 'left-width';
    }
    /**** horizontalOffsetsOfElement ****/
    function horizontalOffsetsOfElement(Element) {
        var left = Math.round(Element[0].offsetLeft);
        var width = Math.round(Element[0].offsetWidth);
        var right = Math.round(Element.parent()[0].clientWidth - left - width);
        switch (horizontalAnchorsOfElement(Element)) {
            case 'left-width': return [left, width];
            case 'width-right': return [width, right];
            case 'left-right': return [left, right];
        }
    }
    /**** verticalAnchorsOfElement ****/
    function verticalAnchorsOfElement(Element) {
        var top = Element[0].style.top || 'auto';
        var bottom = Element[0].style.bottom || 'auto';
        var Height = Element[0].style.height || 'auto';
        if (bottom === 'auto') {
            return 'top-height';
        }
        if (Height === 'auto') {
            return 'top-bottom';
        }
        if (top === 'auto') {
            return 'height-bottom';
        } // check this last
        console.error('could not determine vertical anchors of given DOM element\n' +
            'got top:' + top + ', bottom:' + bottom + ', height:' + Height);
        return 'top-height';
    }
    /**** verticalOffsetsOfElement ****/
    function verticalOffsetsOfElement(Element) {
        var top = Math.round(Element[0].offsetTop);
        var height = Math.round(Element[0].offsetHeight);
        var bottom = Math.round(Element.parent()[0].clientHeight - top - height);
        switch (verticalAnchorsOfElement(Element)) {
            case 'top-height': return [top, height];
            case 'height-bottom': return [height, bottom];
            case 'top-bottom': return [top, bottom];
        }
    }
    /**** bringToFront ****/
    function bringToFront(Candidate) {
        var CandidateWasFound = false;
        $(document.body).children('.WAD.Dialog').each(function () {
            var Dialog = $(this);
            if (Dialog.is(Candidate)) {
                CandidateWasFound = true;
            }
            else {
                if (CandidateWasFound) {
                    Dialog.insertBefore(Candidate);
                }
            }
        }); // does not touch Candidate itself (would disturb drop-downs etc.)
    }
    /**** isFrontmostDialog ****/
    function isFrontmostDialog(Candidate) {
        var frontmostDialog = $(document.body).children('.WAD.Dialog').last();
        return Candidate.is(frontmostDialog);
    }
    //----------------------------------------------------------------------------//
    //                                   Dialog                                   //
    //----------------------------------------------------------------------------//
    var WAD_Dialog = /** @class */ (function () {
        function WAD_Dialog() {
            this.hasAlreadyBeenShown = false;
        }
        Object.defineProperty(WAD_Dialog.prototype, "$", {
            get: function () { return this.Peer; },
            enumerable: false,
            configurable: true
        });
        /**** build ****/
        WAD_Dialog.prototype.build = function () {
            //    to be overwritten
        };
        /**** configureDialog ****/
        WAD_Dialog.prototype.configureDialog = function () {
            var thisDialog = this;
            this.$.on('mousedown pointerdown', function () {
                bringToFront(thisDialog.Peer);
            });
        };
        /**** configureCloseButton ****/
        WAD_Dialog.prototype.configureCloseButton = function () {
            var thisDialog = this;
            this.$.find('[name="CloseButton"]').on('click', function () {
                thisDialog.close();
            });
        };
        /**** cacheNamedElements ****/
        WAD_Dialog.prototype.cacheNamedElements = function () {
            var thisDialog = this;
            thisDialog.$.find('[name]').each(function () {
                var namedElement = $(this);
                thisDialog[namedElement.attr('name')] = namedElement;
            });
        };
        /**** define element behaviours ****/
        WAD_Dialog.prototype.defineElementBehaviours = function () {
            //    to be overwritten
        };
        /**** show/hide ****/
        WAD_Dialog.prototype.show = function () {
            bringToFront(this.Peer);
            if (this.$.css('display') === 'none') {
                this.refreshEverything();
                Ticker.consider(this);
                this.$.show();
                this.hasAlreadyBeenShown = true;
            }
        };
        WAD_Dialog.prototype.hide = function () {
            this.$.hide();
            Ticker.ignore(this);
        };
        Object.defineProperty(WAD_Dialog.prototype, "isVisible", {
            /**** isVisible ****/
            get: function () { return (this.$.css('display') !== 'none'); },
            set: function (_) { },
            enumerable: false,
            configurable: true
        });
        /**** showAround ****/
        WAD_Dialog.prototype.showAround = function (ViewportX, ViewportY) {
            if (!this.hasAlreadyBeenShown) {
                var Width = this.$.outerWidth();
                var Height = this.$.outerHeight();
                var _a = ViewportSize(), ViewportWidth = _a.Width, ViewportHeight = _a.Height;
                ViewportX = Math.max(0, Math.min(ViewportX, ViewportWidth - Width));
                ViewportY = Math.max(0, Math.min(ViewportY, ViewportHeight - Height));
                var _b = fromViewportTo('document', { left: ViewportX, top: ViewportY }), left = _b.left, top = _b.top;
                this.$.css({ left: Math.round(left) + 'px', top: Math.round(top) + 'px' });
            }
            this.show();
        };
        /**** close (default implementation) ****/
        WAD_Dialog.prototype.close = function () {
            this.hide();
        };
        /**** onTick - to be overwritten ****/
        WAD_Dialog.prototype.onTick = function () {
            //    to be overwritten
        };
        /**** refreshEverything ****/
        WAD_Dialog.prototype.refreshEverything = function () {
            this.onTick(); // may be overwritten
        };
        return WAD_Dialog;
    }());
    var chosenDesignerInfo;
    /**** DesignerInfoOfApplet ****/
    function DesignerInfoOfApplet(Applet) {
        var AppletPeer = $(Applet.Peer);
        var DesignerInfo = AppletPeer.data('wad-designer-info');
        if (DesignerInfo == null) {
            DesignerInfo = {
                chosenApplet: Applet,
                chosenContainer: Applet.firstCard,
                selectedComponents: [],
                inLayoutMode: false,
                SnapToGrid: true
            };
            AppletPeer.data('wad-designer-info', DesignerInfo);
        }
        return DesignerInfo;
    }
    //----------------------------------------------------------------------------//
    //                                  Choices                                   //
    //----------------------------------------------------------------------------//
    /**** chooseApplet ****/
    function chooseApplet(Applet) {
        if ((Applet == null) || !Applet.isAttached) {
            chosenDesignerInfo = undefined;
        }
        else {
            var DesignerInfo = DesignerInfoOfApplet(Applet);
            if (DesignerInfo === chosenDesignerInfo) {
                return;
            }
            chosenDesignerInfo = DesignerInfo; // preset with chosen/selected visuals
        }
        Ticker.tickNow(); // also validates/completes any choices and selections
    }
    /**** chooseContainer ****/
    function chooseContainer(Container) {
        var chosenApplet = memoized('chosenApplet');
        if ((Container == null) || (Container.Applet !== chosenApplet)) {
            chosenDesignerInfo.chosenContainer = chosenApplet;
        }
        else {
            chosenDesignerInfo.chosenContainer = Container;
        }
        Ticker.tickNow(); // also validates/completes any choices and selections
    }
    /**** resetChoices - used from within "tick" ****/
    function resetChoices() {
        chosenDesignerInfo = undefined;
    }
    /**** validateChoices - used from within "tick" ****/
    function validateChoices() {
        if (chosenDesignerInfo == null) {
            resetChoices();
            return;
        }
        var chosenApplet = chosenDesignerInfo.chosenApplet;
        if (chosenApplet.isAttached) {
            var chosenContainer = chosenDesignerInfo.chosenContainer;
            if ((chosenContainer == null) ||
                (chosenContainer.Applet !== chosenApplet)) {
                debugger;
                chosenDesignerInfo.chosenContainer = chosenApplet.firstCard;
            }
        }
        else {
            resetChoices();
        }
    }
    /**** selectComponent ****/
    function selectComponent(Component, Mode) {
        if (Mode === void 0) { Mode = 'solely'; }
        if (!ComponentIsSelected(Component)) { // just a minor optimization
            if (Mode === 'solely') {
                chosenDesignerInfo.selectedComponents = [Component];
            }
            else {
                chosenDesignerInfo.selectedComponents = ListWith(chosenDesignerInfo.selectedComponents, Component);
            }
        }
    }
    /**** deselectComponent - idempotent ****/
    function deselectComponent(Component) {
        if (ComponentIsSelected(Component)) { // just a minor optimization
            chosenDesignerInfo.selectedComponents = ListWithout(chosenDesignerInfo.selectedComponents, Component);
        }
    }
    /**** toggleComponent ****/
    function toggleComponent(Component) {
        if (ComponentIsSelected(Component)) {
            deselectComponent(Component);
        }
        else {
            selectComponent(Component, 'additionally');
        }
    }
    /**** selectComponents ****/
    function selectComponents(Components, Mode) {
        if (Mode === void 0) { Mode = 'solely'; }
        if (Mode === 'solely') {
            chosenDesignerInfo.selectedComponents = Components;
        }
        else {
            chosenDesignerInfo.selectedComponents = ListWithAll(chosenDesignerInfo.selectedComponents, Components);
        }
    }
    /**** selectAllComponents ****/
    function selectAllComponents() {
        chosenDesignerInfo.selectedComponents = memoized('selectableComponents');
    }
    /**** deselectComponents - idempotent ****/
    function deselectComponents(Components) {
        chosenDesignerInfo.selectedComponents = ListWithoutAll(chosenDesignerInfo.selectedComponents, Components);
    }
    /**** deselectAllComponents - idempotent ****/
    function deselectAllComponents() {
        chosenDesignerInfo.selectedComponents = [];
    }
    /**** deselectAndSelectComponents ****/
    function deselectAndSelectComponents(ComponentsToDeselect, ComponentsToSelect) {
        chosenDesignerInfo.selectedComponents = ListWithAll(ListWithoutAll(memoized('selectedComponents'), ComponentsToDeselect), ComponentsToSelect);
    }
    /**** changeComponentSelectionTo ****/
    function changeComponentSelectionTo(Components) {
        chosenDesignerInfo.selectedComponents = Components;
    }
    /**** ComponentIsSelected ****/
    function ComponentIsSelected(Component) {
        return (memoized('selectedComponents').indexOf(Component) >= 0);
    } // not chosenDesignerInfo.selectedComponents!
    /**** resetSelections ****/
    function resetSelections() {
        if (chosenDesignerInfo != null) {
            chosenDesignerInfo.selectedComponents = [];
        } // needs a tick to "memoize" this change
    }
    /**** validateSelections ****/
    function validateSelections() {
        if (chosenDesignerInfo != null) {
            var selectedComponents = chosenDesignerInfo.selectedComponents.filter(function (Component) { return (Component.Container === memoized('chosenContainer')); });
            selectedComponents = orderedComponents(selectedComponents);
            chosenDesignerInfo.selectedComponents = selectedComponents;
        }
    }
    //----------------------------------------------------------------------------//
    //                                   Ticker                                   //
    //----------------------------------------------------------------------------//
    var WAD_Ticker = /** @class */ (function () {
        function WAD_Ticker() {
            this.Prospects = [];
        }
        /**** consider ****/
        WAD_Ticker.prototype.consider = function (Prospect) {
            if (this.Prospects.indexOf(Prospect) < 0) {
                this.Prospects.push(Prospect);
            }
            if (this.Prospects.length === 1) {
                this.startTicking();
            }
        };
        /**** ignore ****/
        WAD_Ticker.prototype.ignore = function (Prospect) {
            var ProspectIndex = this.Prospects.indexOf(Prospect);
            if (ProspectIndex >= 0) {
                this.Prospects.splice(ProspectIndex, 1);
            }
            if (this.Prospects.length === 0) {
                this.stopTicking();
            }
        };
        /**** startTicking ****/
        WAD_Ticker.prototype.startTicking = function () {
            var _this = this;
            if (this.TickerId == null) {
                this.TickerId = setInterval(function () {
                    _this.tick();
                }, 200);
            }
        };
        /**** stopTicking ****/
        WAD_Ticker.prototype.stopTicking = function () {
            if (this.TickerId != null) {
                clearInterval(this.TickerId);
                this.TickerId = null;
            }
        };
        /**** tickNow - i.e., immediately ****/
        WAD_Ticker.prototype.tickNow = function () {
            if (this.pendingTick != null) {
                clearInterval(this.pendingTick);
                this.pendingTick = undefined;
            }
            this.tick();
            if (this.TickerId != null) { // only if Ticker is currently running
                this.stopTicking(); // ...restart it
                this.startTicking();
            }
        };
        /**** tickPromptly - i.e., during the next idle phase ****/
        WAD_Ticker.prototype.tickPromptly = function () {
            var _this = this;
            if (this.pendingTick == null) {
                this.pendingTick = setTimeout(function () {
                    _this.tickNow();
                }, 0);
            }
        };
        /**** tick ****/
        WAD_Ticker.prototype.tick = function () {
            updateDesignerButtons();
            Memoizer.reset();
            validateChoices();
            validateSelections();
            if (chosenDesignerInfo == null) {
                Layouter.stopLayouting();
                this.Prospects.forEach(function (Prospect) { return Prospect.onTick(); });
                this.stopTicking();
            }
            else {
                this.Prospects.forEach(function (Prospect) { return Prospect.onTick(); });
            }
        };
        return WAD_Ticker;
    }());
    var Ticker = new WAD_Ticker();
    //----------------------------------------------------------------------------//
    //                                  Memoizer                                  //
    //----------------------------------------------------------------------------//
    var noSelection = {}; // special marker value
    var mixedValues = {}; // dto.
    var switchedOff = {}; // dto.
    var current = Object.create(null);
    var previous = Object.create(null);
    var WAD_Memoizer = /** @class */ (function () {
        function WAD_Memoizer() {
            this.MemoizationHandlerSet = Object.create(null);
            this.Memoization = Object.create(null);
        }
        /**** reset ****/
        WAD_Memoizer.prototype.reset = function () {
            previous = this.Memoization;
            current = this.Memoization = Object.create(null);
        };
        /**** toMemoize ****/
        WAD_Memoizer.prototype.toMemoize = function (Key, Handler) {
            this.MemoizationHandlerSet[Key] = Handler;
        };
        /**** memoized ****/
        WAD_Memoizer.prototype.memoized = function (Key) {
            var Value = this.Memoization[Key];
            if (Value === undefined) {
                var Handler = this.MemoizationHandlerSet[Key];
                if (Handler == null)
                    throwError('InternalError: no memoization handler for key ' + quoted(Key));
                Value = this.Memoization[Key] = Handler();
            }
            return ValueIsArray(Value) ? Value.slice() : Value;
        };
        return WAD_Memoizer;
    }());
    var Memoizer = new WAD_Memoizer();
    /**** memoize[d] ****/
    function memoize(Key) {
        current[Key] = Memoizer.memoized(Key);
    }
    function memoized(Key) {
        return current[Key] = Memoizer.memoized(Key);
    }
    /**** Memoization Handlers ****/
    /**** memoize AppletsInDocument ****/
    Memoizer.toMemoize('AppletsInDocument', function () { return AppletsInDocument(); });
    /**** memoize chosenApplet[HasChanged] ****/
    Memoizer.toMemoize('chosenApplet', function () {
        return (chosenDesignerInfo == null
            ? undefined
            : chosenDesignerInfo.chosenApplet);
    });
    Memoizer.toMemoize('chosenAppletHasChanged', function () {
        memoize('chosenApplet');
        return (current.chosenApplet !== previous.chosenApplet);
    });
    /**** memoize chosenContainer[HasChanged] ****/
    Memoizer.toMemoize('chosenContainer', function () {
        return (chosenDesignerInfo == null
            ? undefined
            : chosenDesignerInfo.chosenContainer);
    });
    Memoizer.toMemoize('chosenContainerHasChanged', function () {
        memoize('chosenContainer');
        return (current.chosenContainer !== previous.chosenContainer);
    });
    /**** memoize GeometryOnPageOfContainer ****/
    Memoizer.toMemoize('GeometryOnPageOfContainer', function () {
        return (chosenDesignerInfo == null
            ? undefined
            : chosenDesignerInfo.chosenContainer.GeometryOnPage);
    });
    /**** memoize selectableApplets - in DOM order ****/
    Memoizer.toMemoize('selectableApplets', function () {
        return (chosenDesignerInfo == null
            ? undefined
            : [chosenDesignerInfo.chosenApplet]);
    });
    /**** memoize selectableCards - in DOM order ****/
    Memoizer.toMemoize('selectableCards', function () {
        return (chosenDesignerInfo == null
            ? undefined
            : [chosenDesignerInfo.chosenApplet.firstCard]);
    });
    /**** memoize selectableComponents - in DOM order ****/
    Memoizer.toMemoize('selectableComponents', function () {
        var chosenContainer = memoized('chosenContainer');
        return (chosenContainer == null
            ? []
            : chosenContainer.Components);
    });
    /**** memoize GeometriesOfSelectableComponents - in DOM order ****/
    Memoizer.toMemoize('GeometriesOfSelectableComponents', function () {
        return GeometriesOfComponents(memoized('selectableComponents'));
    });
    /**** memoize selectedApplets/Cards/Components - validated and ordered(!) ****/
    Memoizer.toMemoize('selectedApplets', function () {
        return (chosenDesignerInfo == null
            ? undefined
            : [chosenDesignerInfo.chosenApplet]);
    });
    Memoizer.toMemoize('selectedCards', function () {
        return (chosenDesignerInfo == null
            ? undefined
            : [chosenDesignerInfo.chosenApplet.firstCard]);
    });
    Memoizer.toMemoize('selectedComponents', function () {
        return (chosenDesignerInfo == null
            ? undefined
            : chosenDesignerInfo.selectedComponents);
    });
    /**** memoize selectedApplets/Cards/ComponentsHaveChanged ****/
    Memoizer.toMemoize('selectedAppletsHaveChanged', function () {
        memoize('selectedApplets');
        return ValuesDiffer(current.selectedApplets, previous.selectedApplets, 'by-reference');
    });
    Memoizer.toMemoize('selectedCardsHaveChanged', function () {
        memoize('selectedCards');
        return ValuesDiffer(current.selectedCards, previous.selectedCards, 'by-reference');
    });
    Memoizer.toMemoize('selectedComponentsHaveChanged', function () {
        memoize('selectedComponents');
        return ValuesDiffer(current.selectedComponents, previous.selectedComponents, 'by-reference');
    });
    /**** memoize selectedApplets/Cards/ComponentsConfiguration ****/
    Memoizer.toMemoize('selectedAppletsConfiguration', function () {
        return ConfigurationOfVisuals(memoized('selectedApplets'));
    });
    Memoizer.toMemoize('selectedCardsConfiguration', function () {
        return ConfigurationOfVisuals(memoized('selectedCards'));
    });
    Memoizer.toMemoize('selectedComponentsConfiguration', function () {
        return ConfigurationOfVisuals(memoized('selectedComponents'));
    });
    /**** memoize selectedApplets/Cards/ComponentsCustomPropertySpecs ****/
    Memoizer.toMemoize('selectedAppletsCustomPropertySpecs', function () {
        var selectedApplets = memoized('selectedApplets');
        if (selectedApplets.length === 0) {
            return noSelection;
        }
        else {
            var Master = memoized('selectedAppletsConfiguration').Master;
            return (ValueIsOrdinaryName(Master)
                ? selectedApplets[0].customProperties
                : Master // no typo!
            );
        }
    });
    Memoizer.toMemoize('selectedCardsCustomPropertySpecs', function () {
        var selectedCards = memoized('selectedCards');
        if (selectedCards.length === 0) {
            return noSelection;
        }
        else {
            var Master = memoized('selectedCardsConfiguration').Master;
            return (ValueIsOrdinaryName(Master)
                ? selectedCards[0].customProperties
                : Master // no typo!
            );
        }
    });
    Memoizer.toMemoize('selectedComponentsCustomPropertySpecs', function () {
        var selectedComponents = memoized('selectedComponents');
        if (selectedComponents.length === 0) {
            return noSelection;
        }
        else {
            var Master = memoized('selectedComponentsConfiguration').Master;
            return (ValueIsOrdinaryName(Master)
                ? selectedComponents[0].customProperties
                : Master // no typo!
            );
        }
    });
    /**** memoize selectedApplets/Cards/ComponentsCustomPropertyValues ****/
    Memoizer.toMemoize('selectedAppletsCustomPropertyValues', function () {
        return customPropertyValuesOfVisuals(memoized('selectedApplets'), memoized('selectedAppletsCustomPropertySpecs'));
    });
    Memoizer.toMemoize('selectedCardsCustomPropertyValues', function () {
        return customPropertyValuesOfVisuals(memoized('selectedCards'), memoized('selectedCardsCustomPropertySpecs'));
    });
    Memoizer.toMemoize('selectedComponentsCustomPropertyValues', function () {
        return customPropertyValuesOfVisuals(memoized('selectedComponents'), memoized('selectedComponentsCustomPropertySpecs'));
    });
    /**** memoize selectedCardsMayBeShiftedUp ****/
    Memoizer.toMemoize('selectedCardsMayBeShiftedUp', function () {
        return VisualsMayBeShiftedUp('Card', memoized('selectedCards'));
    });
    Memoizer.toMemoize('selectedCardsMayBeShiftedDown', function () {
        return VisualsMayBeShiftedDown('Card', memoized('selectedCards'));
    });
    /**** memoize selectedComponentsMayBeShiftedUp ****/
    Memoizer.toMemoize('selectedComponentsMayBeShiftedUp', function () {
        return VisualsMayBeShiftedUp('Component', memoized('selectedComponents'));
    });
    Memoizer.toMemoize('selectedComponentsMayBeShiftedDown', function () {
        return VisualsMayBeShiftedDown('Component', memoized('selectedComponents'));
    });
    /**** memoize selectedApplets/Cards/ComponentsActiveScript ****/
    Memoizer.toMemoize('selectedAppletsActiveScript', function () {
        var selectedApplets = memoized('selectedApplets');
        if (selectedApplets.length === 0) {
            return noSelection;
        }
        else {
            var activeScript = selectedApplets[0].activeScript || '';
            for (var i = 1, l = selectedApplets.length; i < l; i++) {
                if (activeScript !== selectedApplets[i].activeScript || '') {
                    return mixedValues;
                }
            }
            return activeScript;
        }
    });
    Memoizer.toMemoize('selectedCardsActiveScript', function () {
        var selectedCards = memoized('selectedCards');
        if (selectedCards.length === 0) {
            return noSelection;
        }
        else {
            var activeScript = selectedCards[0].activeScript || '';
            for (var i = 1, l = selectedCards.length; i < l; i++) {
                if (activeScript !== selectedCards[i].activeScript || '') {
                    return mixedValues;
                }
            }
            return activeScript;
        }
    });
    Memoizer.toMemoize('selectedComponentsActiveScript', function () {
        var selectedComponents = memoized('selectedComponents');
        if (selectedComponents.length === 0) {
            return noSelection;
        }
        else {
            var activeScript = selectedComponents[0].activeScript || '';
            for (var i = 1, l = selectedComponents.length; i < l; i++) {
                if (activeScript !== selectedComponents[i].activeScript || '') {
                    return mixedValues;
                }
            }
            return activeScript;
        }
    });
    /**** memoize selectedApplets/Cards/ComponentsPendingScript ****/
    Memoizer.toMemoize('selectedAppletsPendingScript', function () {
        var selectedApplets = memoized('selectedApplets');
        if (selectedApplets.length === 0) {
            return noSelection;
        }
        else {
            var pendingScript = selectedApplets[0].pendingScript || '';
            for (var i = 1, l = selectedApplets.length; i < l; i++) {
                if (pendingScript !== selectedApplets[i].pendingScript || '') {
                    return mixedValues;
                }
            }
            return pendingScript;
        }
    });
    Memoizer.toMemoize('selectedCardsPendingScript', function () {
        var selectedCards = memoized('selectedCards');
        if (selectedCards.length === 0) {
            return noSelection;
        }
        else {
            var pendingScript = selectedCards[0].pendingScript || '';
            for (var i = 1, l = selectedCards.length; i < l; i++) {
                if (pendingScript !== selectedCards[i].pendingScript || '') {
                    return mixedValues;
                }
            }
            return pendingScript;
        }
    });
    Memoizer.toMemoize('selectedComponentsPendingScript', function () {
        var selectedComponents = memoized('selectedComponents');
        if (selectedComponents.length === 0) {
            return noSelection;
        }
        else {
            var pendingScript = selectedComponents[0].pendingScript || '';
            for (var i = 1, l = selectedComponents.length; i < l; i++) {
                if (pendingScript !== selectedComponents[i].pendingScript || '') {
                    return mixedValues;
                }
            }
            return pendingScript;
        }
    });
    /**** memoize selectedApplets/Cards/ComponentsScript ****/
    Memoizer.toMemoize('selectedAppletsScript', function () {
        var selectedApplets = memoized('selectedApplets');
        if (selectedApplets.length === 0) {
            return noSelection;
        }
        else {
            var Script = selectedApplets[0].Script || '';
            for (var i = 1, l = selectedApplets.length; i < l; i++) {
                if (Script !== selectedApplets[i].Script || '') {
                    return mixedValues;
                }
            }
            return Script;
        }
    });
    Memoizer.toMemoize('selectedCardsScript', function () {
        var selectedCards = memoized('selectedCards');
        if (selectedCards.length === 0) {
            return noSelection;
        }
        else {
            var Script = selectedCards[0].Script || '';
            for (var i = 1, l = selectedCards.length; i < l; i++) {
                if (Script !== selectedCards[i].Script || '') {
                    return mixedValues;
                }
            }
            return Script;
        }
    });
    Memoizer.toMemoize('selectedComponentsScript', function () {
        var selectedComponents = memoized('selectedComponents');
        if (selectedComponents.length === 0) {
            return noSelection;
        }
        else {
            var Script = selectedComponents[0].Script || '';
            for (var i = 1, l = selectedComponents.length; i < l; i++) {
                if (Script !== selectedComponents[i].Script || '') {
                    return mixedValues;
                }
            }
            return Script;
        }
    });
    /**** ConfigurationOfVisuals ****/
    var commonProperties = "\n    Master Name Path Classes Index\n    Enabling reactiveVariable TabIndex PointerSensitivity\n    x y Width Height minWidth maxWidth minHeight maxHeight Resizability\n    horizontalAnchors horizontalOffsets verticalAnchors verticalOffsets\n    Visibility Opacity Overflows\n    BackgroundColor\n    FontFamily FontSize FontWeight FontStyle LineHeight\n      TextDecoration TextShadow TextAlignment TextOverflow\n    ForegroundColor BackgroundColor BackgroundTexture\n    BorderWidths BorderColors BorderStyles BorderRadii\n    BoxShadow Cursor customCursor\n    Enabling Value\n  ".replace(/\s+/gm, ' ').trim().split(' ');
    function ConfigurationOfVisuals(Visuals) {
        function ConfigurationOfVisual(Visual) {
            var Configuration = Object.create(null);
            commonProperties.forEach(function (Property) { Configuration[Property] = Visual[Property]; });
            return Configuration;
        }
        if (Visuals.length === 0) {
            return noSelection;
        }
        else {
            var Configuration = ConfigurationOfVisual(Visuals[0]);
            for (var i = 1, l = Visuals.length; i < l; i++) {
                var newConfiguration = ConfigurationOfVisual(Visuals[i]);
                var hasCommonProperties = false;
                for (var PropertyName in Configuration) {
                    if (Configuration[PropertyName] === newConfiguration[PropertyName]) {
                        if (Configuration[PropertyName] !== mixedValues) {
                            hasCommonProperties = true;
                        }
                    }
                    else {
                        Configuration[PropertyName] = mixedValues;
                    }
                }
                if (!hasCommonProperties) {
                    break;
                }
            }
            return Configuration;
        }
    }
    /**** customPropertyValuesOfVisuals ****/
    function customPropertyValuesOfVisuals(Visuals, Specs) {
        if (Visuals.length === 0) {
            return noSelection;
        }
        else {
            if (ValueIsArray(Specs)) {
                /**** customValuesOfVisual ****/
                function customValuesOfVisual(Visual) {
                    var Configuration = [];
                    Specs.forEach(function (Spec) { Configuration.push(Visual[Spec.Name]); });
                    return Configuration;
                }
                var customValues_1 = customValuesOfVisual(Visuals[0]);
                var _loop_1 = function (i, l) {
                    var newValues = customValuesOfVisual(Visuals[i]);
                    var hasCommonValues = false;
                    customValues_1.forEach(function (Value, Index) {
                        if (ValuesDiffer(Value, newValues[Index], 'by-value', 10)) {
                            customValues_1[Index] = mixedValues;
                        }
                        else {
                            if (Value !== mixedValues) {
                                hasCommonValues = true;
                            }
                        }
                    });
                    if (!hasCommonValues) {
                        return "break";
                    }
                };
                for (var i = 1, l = Visuals.length; i < l; i++) {
                    var state_1 = _loop_1(i, l);
                    if (state_1 === "break")
                        break;
                }
                return customValues_1;
            }
            else {
                return Specs; // no typo!
            }
        }
    }
    //----------------------------------------------------------------------------//
    //                               User Commands                                //
    //----------------------------------------------------------------------------//
    var needsDownload = false;
    /**** doCreateComponent ****/
    function doCreateComponent(Master) {
        var Failure;
        var chosenContainer = memoized('chosenContainer');
        try {
            var newComponent = chosenContainer.newComponentCreatedAtIndex(Master);
            selectComponent(newComponent);
            needsDownload = true;
        }
        catch (Signal) {
            Failure = Failure || Signal;
        }
        if (Failure != null) {
            throw Failure;
        }
    }
    /**** doDuplicateSelectedComponents ****/
    function doDuplicateSelectedComponents() {
        var Failure;
        var chosenContainer = memoized('chosenContainer');
        var selectedComponents = memoized('selectedComponents');
        deselectAllComponents();
        var Duplicates = [];
        selectedComponents.forEach(function (Component) {
            try {
                var newComponent = chosenContainer.newDuplicateOfComponent(Component);
                newComponent.x += 10;
                newComponent.y += 10;
                Duplicates.push(newComponent);
                needsDownload = true;
            }
            catch (Signal) {
                Failure = Failure || Signal;
            }
        });
        selectComponents(Duplicates);
        if (Failure != null) {
            throw Failure;
        }
    }
    /**** doChangeGeometryOfSelectedComponentsTo ****/
    function doChangeGeometryOfSelectedComponentsTo(GeometryList) {
        var Failure;
        var selectedComponents = memoized('selectedComponents');
        selectedComponents.forEach(function (Component, Index) {
            try {
                Component.Geometry = GeometryList[Index];
                needsDownload = true;
            }
            catch (Signal) {
                Failure = Failure || Signal;
            }
        });
        if (Failure != null) {
            throw Failure;
        }
    }
    /**** doChangeGeometryOfSelectedComponentsBy ****/
    function doChangeGeometryOfSelectedComponentsBy(dx, dy, dWidth, dHeight) {
        var Failure;
        var selectedComponents = memoized('selectedComponents');
        selectedComponents.forEach(function (Component, Index) {
            var Geometry = Component.Geometry;
            if (dx != null) {
                Geometry.x += dx;
            }
            if (dy != null) {
                Geometry.y += dy;
            }
            if (dWidth != null) {
                Geometry.Width += dWidth;
            }
            if (dHeight != null) {
                Geometry.Height += dHeight;
            }
            try {
                Component.Geometry = Geometry;
                needsDownload = true;
            }
            catch (Signal) {
                Failure = Failure || Signal;
            }
        });
        if (Failure != null) {
            throw Failure;
        }
    }
    /**** doShiftComponentsToIndexAmong ****/
    function doShiftComponentsToIndexAmong(Components, Index, Siblings) {
        Siblings = Siblings.slice(); // because list will be changed
        var ComponentSet = VisualSetFrom(Components);
        var IndexList = [];
        Siblings.forEach(function (Sibling, i) {
            if (ComponentSet[Sibling.uniqueId] != null) {
                IndexList.push(i);
            }
        });
        var Failure;
        var Container = memoized('chosenContainer');
        Components.forEach(function (Component, i) {
            try {
                Container.shiftComponentToIndex(Component, Index);
                needsDownload = true;
            }
            catch (Signal) {
                Failure = Failure || Signal;
            }
            if (IndexList[i] > Index) {
                Index += 1;
            }
        });
        if (Failure != null) {
            throw Failure;
        }
    }
    /**** doShiftCardsToIndexAmong ****/
    function doShiftCardsToIndexAmong(Cards, Index, Siblings) {
        Siblings = Siblings.slice(); // because list will be changed
        var CardSet = VisualSetFrom(Cards);
        var IndexList = [];
        Siblings.forEach(function (Sibling, i) {
            if (CardSet[Sibling.uniqueId] != null) {
                IndexList.push(i);
            }
        });
        var Failure;
        var Applet = memoized('chosenApplet');
        Cards.forEach(function (Card, i) {
            try {
                Applet.shiftCardToIndex(Card, Index);
                needsDownload = true;
            }
            catch (Signal) {
                Failure = Failure || Signal;
            }
            if (IndexList[i] > Index) {
                Index += 1;
            }
        });
        if (Failure != null) {
            throw Failure;
        }
    }
    /**** doShiftSelectedVisualsToTop ****/
    function doShiftSelectedVisualsToTop(Mode) {
        if (Mode === 'Card') {
            doShiftCardsToIndexAmong(memoized('selectedCards'), 0, memoized('selectableCards'));
        }
        else {
            doShiftComponentsToIndexAmong(memoized('selectedComponents'), 0, memoized('selectableComponents'));
        }
    }
    /**** doShiftSelectedVisualsUp ****/
    function doShiftSelectedVisualsUp(Mode) {
        if (Mode === 'Card') {
            doShiftCardsToIndexAmong(memoized('selectedCards'), topmostIndexOfVisualsAmong(memoized('selectedCards'), memoized('selectableCards')) - 1, memoized('selectableCards'));
        }
        else {
            doShiftComponentsToIndexAmong(memoized('selectedComponents'), topmostIndexOfVisualsAmong(memoized('selectedComponents'), memoized('selectableComponents')) - 1, memoized('selectableComponents'));
        }
    }
    /**** doShiftSelectedVisualsDown ****/
    function doShiftSelectedVisualsDown(Mode) {
        if (Mode === 'Card') {
            doShiftCardsToIndexAmong(memoized('selectedCards'), bottommostIndexOfVisualsAmong(memoized('selectedCards'), memoized('selectableCards')) + 1, memoized('selectableCards'));
        }
        else {
            doShiftComponentsToIndexAmong(memoized('selectedComponents'), bottommostIndexOfVisualsAmong(memoized('selectedComponents'), memoized('selectableComponents')) + 1, memoized('selectableComponents'));
        }
    }
    /**** doShiftSelectedVisualsToBottom ****/
    function doShiftSelectedVisualsToBottom(Mode) {
        if (Mode === 'Card') {
            doShiftCardsToIndexAmong(memoized('selectedCards'), memoized('selectableCards').length, memoized('selectableCards'));
        }
        else {
            doShiftComponentsToIndexAmong(memoized('selectedComponents'), memoized('selectableComponents').length, memoized('selectableComponents'));
        }
    }
    /**** doSetPropertyOfSelectedVisualsTo ****/
    function doSetPropertyOfSelectedVisualsTo(Mode, Property, newValue) {
        switch (Mode) {
            case 'Applet':
                doSetPropertyOfSelectedAppletsTo(Property, newValue);
                break;
            case 'Card':
                doSetPropertyOfSelectedCardsTo(Property, newValue);
                break;
            case 'Component': doSetPropertyOfSelectedComponentsTo(Property, newValue);
        }
    }
    /**** doSetPropertyOfSelectedAppletsTo ****/
    function doSetPropertyOfSelectedAppletsTo(Property, newValue) {
        var Failure;
        var selectedApplets = memoized('selectedApplets');
        selectedApplets.forEach(function (Applet) {
            try {
                Applet[Property] = newValue;
                needsDownload = true;
            }
            catch (Signal) {
                Failure = Failure || Signal;
            }
        });
        if (Failure != null) {
            throw Failure;
        }
    }
    /**** doSetPropertyOfSelectedCardsTo ****/
    function doSetPropertyOfSelectedCardsTo(Property, newValue) {
        var Failure;
        var selectedCards = memoized('selectedCards');
        selectedCards.forEach(function (Card) {
            try {
                Card[Property] = newValue;
                needsDownload = true;
            }
            catch (Signal) {
                Failure = Failure || Signal;
            }
        });
        if (Failure != null) {
            throw Failure;
        }
    }
    /**** doSetPropertyOfSelectedComponentsTo ****/
    function doSetPropertyOfSelectedComponentsTo(Property, newValue) {
        var Failure;
        var selectedComponents = memoized('selectedComponents');
        selectedComponents.forEach(function (Component) {
            try {
                Component[Property] = newValue;
                needsDownload = true;
            }
            catch (Signal) {
                Failure = Failure || Signal;
            }
        });
        if (Failure != null) {
            throw Failure;
        }
    }
    /**** doSetPendingScriptOfSelectedAppletsTo ****/
    function doSetPendingScriptOfSelectedAppletsTo(newScript) {
        var Failure;
        var selectedApplets = memoized('selectedApplets');
        selectedApplets.forEach(function (Applet) {
            try {
                Applet.pendingScript = newScript;
                needsDownload = true;
            }
            catch (Signal) {
                Failure = Failure || Signal;
            }
        });
        if (Failure != null) {
            throw Failure;
        }
    }
    /**** doSetPendingScriptOfSelectedCardssTo ****/
    function doSetPendingScriptOfSelectedCardsTo(newScript) {
        var Failure;
        var selectedCards = memoized('selectedCards');
        selectedCards.forEach(function (Card) {
            try {
                Card.pendingScript = newScript;
                needsDownload = true;
            }
            catch (Signal) {
                Failure = Failure || Signal;
            }
        });
        if (Failure != null) {
            throw Failure;
        }
    }
    /**** doSetPendingScriptOfSelectedComponentsTo ****/
    function doSetPendingScriptOfSelectedComponentsTo(newScript) {
        var Failure;
        var selectedComponents = memoized('selectedComponents');
        selectedComponents.forEach(function (Component) {
            try {
                Component.pendingScript = newScript;
                needsDownload = true;
            }
            catch (Signal) {
                Failure = Failure || Signal;
            }
        });
        if (Failure != null) {
            throw Failure;
        }
    }
    /**** doApplyPendingScriptOfSelectedApplets ****/
    function doApplyPendingScriptOfSelectedApplets() {
        var Failure;
        var selectedApplets = memoized('selectedApplets');
        selectedApplets.forEach(function (Applet) {
            try {
                Applet.applyPendingScript();
                needsDownload = true;
            }
            catch (Signal) {
                Failure = Failure || Signal;
            }
        });
        if (Failure != null) {
            throw Failure;
        }
    }
    /**** doApplyPendingScriptOfSelectedCards ****/
    function doApplyPendingScriptOfSelectedCards() {
        var Failure;
        var selectedCards = memoized('selectedCards');
        selectedCards.forEach(function (Card) {
            try {
                Card.applyPendingScript();
                needsDownload = true;
            }
            catch (Signal) {
                Failure = Failure || Signal;
            }
        });
        if (Failure != null) {
            throw Failure;
        }
    }
    /**** doApplyPendingScriptOfSelectedComponents ****/
    function doApplyPendingScriptOfSelectedComponents() {
        var Failure;
        var selectedComponents = memoized('selectedComponents');
        selectedComponents.forEach(function (Component) {
            try {
                Component.applyPendingScript();
                needsDownload = true;
            }
            catch (Signal) {
                Failure = Failure || Signal;
            }
        });
        if (Failure != null) {
            throw Failure;
        }
    }
    /**** doRemoveSelectedComponents ****/
    function doRemoveSelectedComponents() {
        var Failure;
        var selectedComponents = memoized('selectedComponents');
        deselectAllComponents();
        selectedComponents.forEach(function (Component) {
            try {
                Component.remove();
                needsDownload = true;
            }
            catch (Signal) {
                Failure = Failure || Signal;
            }
        });
        if (Failure != null) {
            throw Failure;
        }
    }
    /**** doImportAppletFrom ****/
    function doImportAppletFrom(Serialization) {
        var oldApplet = memoized('chosenApplet');
        var newApplet = oldApplet.deserializedFrom(Serialization);
        Layouter.stopLayouting();
        chooseApplet(newApplet);
        needsDownload = false;
    }
    /**** doDownloadApplet ****/
    function doDownloadApplet() {
        var Applet = memoized('chosenApplet');
        var Serialization = Applet.serialized();
        var $Peer = $(Applet.Peer);
        var AppletName = $Peer.attr('name') || $Peer.attr('id');
        download((new TextEncoder()).encode(Serialization), (ValueIsOrdinaryName(AppletName) ? AppletName : 'WAT-Applet') + '.html', 'text/html;charset=utf-8');
        needsDownload = false;
    }
    //----------------------------------------------------------------------------//
    //                           Confirmation Handling                            //
    //----------------------------------------------------------------------------//
    function OperationWasConfirmed(Message) {
        var ConformationCode = Math.floor(Math.random() * 10000).toString();
        ConformationCode += '0000'.slice(ConformationCode.length);
        Message = (Message || 'This operation can not be undone.') + '\n\n' +
            'Please, enter the following number if you want to proceed:\n\n' +
            '   ' + ConformationCode + '\n\n' +
            'Otherwise, the operation will be cancelled';
        var UserInput = window.prompt(Message, '');
        if (UserInput === ConformationCode) {
            return true;
        }
        else {
            window.alert('Operation will be cancelled');
            return false;
        }
    }
    //------------------------------------------------------------------------------
    // handleUpload                                 allows to upload a new notebook
    //------------------------------------------------------------------------------
    var hasUndownloadedChanges = false;
    function handleUpload(Event) {
        Event.stopPropagation();
        Event.preventDefault();
        var File = Event.target.files[0];
        if (File == null) {
            return;
        }
        $('#hiddenFileInput').val('');
        var Applet = memoized('chosenApplet');
        if (needsDownload) {
            if (!OperationWasConfirmed('Warning! An upload cannot be undone - do you really want to ' +
                'proceed and replace this applet by the uploaded one?')) {
                return;
            }
        }
        var Reader = new FileReader();
        Reader.addEventListener('load', handleFileLoaded, false);
        Reader.readAsArrayBuffer(File);
    }
    function handleFileLoaded(Event) {
        Event.stopPropagation();
        Event.preventDefault();
        var Serialization;
        try {
            Serialization = new TextDecoder().decode(Event.target.result);
        }
        catch (Signal) {
            console.error(Signal);
            alert('applet could not be uploaded (see console)');
            Ticker.tickNow();
            return;
        }
        doImportAppletFrom(Serialization);
        Ticker.tickNow();
    }
    //----------------------------------------------------------------------------//
    //                                  Layouter                                  //
    //----------------------------------------------------------------------------//
    var ResizeHandleWidth = 8;
    var ResizeHandleHeight = 8;
    var WAD_LassoModes = ['touched', 'surrounded'];
    var WAD_LayoutModes = ['Lassoing', 'SelectingOrDragging', 'Dragging', 'Resizing'];
    var GraceDistance2 = 2 * 2 + 2 * 2; // before a mouse move is detected as such
    var WAD_Layouter = /** @class */ (function () {
        function WAD_Layouter() {
            this.GridWidth = 10;
            this.GridHeight = 10;
            this.LayoutOffsetX = 0;
            this.LayoutOffsetY = 0;
            this.LassoMode = 'touched';
        }
        /**** startLayouting ****/
        WAD_Layouter.prototype.startLayouting = function () {
            var chosenContainer = memoized('chosenContainer');
            var ContainerGeometry = memoized('GeometryOnPageOfContainer');
            this.LayoutOffsetX = ContainerGeometry.x;
            this.LayoutOffsetY = ContainerGeometry.y;
            this.DummyForComponent = Object.create(null);
            /**** create any layers used by the layouter itself ****/
            this.LayouterLayer = $('<div class="WAD WAD-LayouterLayer" tabindex="-1"></div>');
            DesignerLayer.append(this.LayouterLayer);
            /**** create mattes which hide all elements not to be layouted ****/
            this.topMatte = $('<div class="WAD WAD-Matte"></div>');
            this.LayouterLayer.append(this.topMatte);
            this.leftMatte = $('<div class="WAD WAD-Matte"></div>');
            this.LayouterLayer.append(this.leftMatte);
            this.rightMatte = $('<div class="WAD WAD-Matte"></div>');
            this.LayouterLayer.append(this.rightMatte);
            this.bottomMatte = $('<div class="WAD WAD-Matte"></div>');
            this.LayouterLayer.append(this.bottomMatte);
            /**** ok - let's start layouting ****/
            this.LayoutMode = null;
            this.updateLayerAndMatteGeometry();
            this.considerComponents(memoized('selectableComponents'));
            this.markComponents(memoized('selectedComponents'));
            this.startEventHandling();
            chosenDesignerInfo.inLayoutMode = true;
            Ticker.consider(this);
            Ticker.tickPromptly();
        };
        /**** resetLayouting - lightweight stopLayouting ****/
        WAD_Layouter.prototype.resetLayouting = function () {
            this.abortAnyOngoingLayoutMode();
            this.ignoreAllComponents();
            this.LayoutOffsetX = 0;
            this.LayoutOffsetY = 0;
            this.LayoutMode = null;
            this.initialComponent = null;
            this.initialSelection = null;
            this.initialGeometryList = [];
            this.SelectionLasso = null;
            this.horizontalGuideList = [];
            this.verticalGuideList = [];
            this.DummyForComponent = Object.create(null);
            this.considerComponents(memoized('selectableComponents'));
            this.markComponents(memoized('selectedComponents'));
            this.tabbedComponent = null;
        };
        /**** stopLayouting ****/
        WAD_Layouter.prototype.stopLayouting = function () {
            Ticker.ignore(this);
            if (this.LayouterLayer == null) {
                return;
            }
            this.stopEventHandling();
            this.abortAnyOngoingLayoutMode();
            this.ignoreAllComponents();
            this.LayoutMode = null;
            this.LayouterLayer.remove(); // removes all other elements as well
            /**** clear all remaining internal variables (helps GC) ****/
            this.LayoutOffsetX = 0;
            this.LayoutOffsetY = 0;
            this.LayouterLayer = null;
            this.topMatte = this.leftMatte = this.rightMatte = this.bottomMatte = null;
            this.initialComponent = null;
            this.initialSelection = null;
            this.initialGeometryList = [];
            this.SelectionLasso = null;
            this.horizontalGuideList = [];
            this.verticalGuideList = [];
            this.DummyForComponent = Object.create(null);
            this.tabbedComponent = null;
            if (chosenDesignerInfo != null) {
                chosenDesignerInfo.inLayoutMode = false;
            }
            Ticker.ignore(this);
            Ticker.tickPromptly();
        };
        /**** onTick ****/
        WAD_Layouter.prototype.onTick = function () {
            memoize('chosenContainer');
            if (current.chosenContainer !== previous.chosenContainer) {
                this.resetLayouting(); // prepares layouting for a different container
            }
            var ContainerGeometry = memoized('GeometryOnPageOfContainer');
            var ContainerStyle = window.getComputedStyle(memoized('chosenContainer').Peer, null);
            this.LayoutOffsetX = ContainerGeometry.x + (parseInt(ContainerStyle.borderLeftWidth, 10) || 0);
            this.LayoutOffsetY = ContainerGeometry.y + (parseInt(ContainerStyle.borderTopWidth, 10) || 0);
            //    memoize('GeometryOnPageOfContainer')                // already done before
            if (ValuesDiffer(current.GeometryOnPageOfContainer, previous.GeometryOnPageOfContainer)) {
                this.updateLayerAndMatteGeometry();
                this.updateConsideredComponents(); // since LayoutOffset may have changed
                if ((this.LayoutMode === 'Dragging') || (this.LayoutMode === 'Resizing')) {
                    this.clearGuides();
                    this.prepareGuides();
                }
            }
            else {
                memoize('selectableComponents');
                if (ValuesDiffer(current.selectableComponents, previous.selectableComponents, 'by-reference')) {
                    this.updateConsideredComponents();
                }
                else {
                    memoize('GeometriesOfSelectableComponents');
                    if (ValuesDiffer(current.GeometriesOfSelectableComponents, previous.GeometriesOfSelectableComponents)) {
                        this.updateConsideredComponents();
                    }
                }
                memoize('selectedComponents');
                if (ValuesDiffer(current.selectedComponents, previous.selectedComponents, 'by-reference')) {
                    this.updateSelectedComponents();
                }
            }
        };
        /**** updateLayerAndMatteGeometry - restrict container to within applet ****/
        WAD_Layouter.prototype.updateLayerAndMatteGeometry = function () {
            var ContainerGeometry = memoized('GeometryOnPageOfContainer');
            var OffsetX = ContainerGeometry.x, Width = ContainerGeometry.Width;
            var OffsetY = ContainerGeometry.y, Height = ContainerGeometry.Height;
            var AppletGeometry = memoized('chosenApplet').GeometryOnPage;
            var minOffsetX = AppletGeometry.x;
            var maxOffsetX = minOffsetX + AppletGeometry.Width - 1;
            var minOffsetY = AppletGeometry.y;
            var maxOffsetY = minOffsetY + AppletGeometry.Height - 1;
            OffsetX = Math.round(Math.max(minOffsetX, Math.min(OffsetX, maxOffsetX)));
            OffsetY = Math.round(Math.max(minOffsetY, Math.min(OffsetY, maxOffsetY)));
            Width = Math.round(Math.max(0, Math.min(Width, maxOffsetX - OffsetX)));
            Height = Math.round(Math.max(0, Math.min(Height, maxOffsetY - OffsetY)));
            var SelectionGeometry = {
                left: OffsetX + 'px', width: Width + 'px',
                top: OffsetY + 'px', height: Height + 'px'
            };
            var DocWidth = Math.ceil($(document).outerWidth());
            var DocHeight = Math.ceil($(document).outerHeight());
            this.topMatte.css({ left: '0px', top: '0px', width: DocWidth + 'px', height: OffsetY + 'px' });
            this.leftMatte.css({ left: '0px', top: OffsetY + 'px', width: (OffsetX - 1) + 'px', height: Height + 'px' });
            this.leftMatte.css('background-position', '0px ' + Math.round(OffsetY % 4) + 'px');
            this.rightMatte.css({ left: (OffsetX + Width) + 'px', top: OffsetY + 'px', width: (DocWidth - OffsetX - Width) + 'px', height: Height + 'px' });
            this.rightMatte.css('background-position', Math.round((OffsetX + Width) % 4) + 'px ' + Math.round(OffsetY % 4) + 'px');
            this.bottomMatte.css({ left: '0px', top: (OffsetY + Height) + 'px', width: DocWidth + 'px', height: (DocHeight - OffsetY - Height) + 'px' });
            this.bottomMatte.css('background-position', '0px ' + Math.round((OffsetY + Height) % 4) + 'px');
        };
        /**** updateConsideredComponents ****/
        WAD_Layouter.prototype.updateConsideredComponents = function () {
            var ComponentsToConsider = memoized('selectableComponents'); // in DOM order
            var consideredComponents = this.consideredComponents(); // dto.
            /**** ignore any no longer available components ****/
            var ComponentSet = VisualSetFrom(ComponentsToConsider);
            for (var i_1 = consideredComponents.length - 1; i_1 >= 0; i_1--) {
                var Component = consideredComponents[i_1];
                if (ComponentSet[Component.uniqueId] == null) { //no longer to be considered
                    this.ignoreComponent(Component);
                    consideredComponents = ListWithout(consideredComponents, Component);
                }
            }
            /**** process any components that have not changed ****/
            var ComponentToConsider, i, l;
            for (i = 0, l = ComponentsToConsider.length; i < l; i++) {
                ComponentToConsider = ComponentsToConsider[i];
                if (ComponentToConsider === consideredComponents[i]) {
                    this.updateDummyForComponent(ComponentToConsider);
                }
                else {
                    break;
                }
            }
            if (i === l) {
                return;
            } // that's the common case
            /**** process any new components or those that were shifted ****/
            for (; i < l; i++) {
                ComponentToConsider = ComponentsToConsider[i];
                if (this.ComponentIsConsidered(ComponentToConsider)) {
                    this.updateDummyForComponent(ComponentToConsider);
                    this.shiftDummyForComponentAfter(ComponentToConsider, (i === 0 ? null : ComponentsToConsider[i - 1]));
                }
                else {
                    this.considerComponent(ComponentToConsider, (i === 0 ? null : ComponentsToConsider[i - 1]));
                }
            }
        };
        /**** updateSelectedComponents - components have already been "considered" ****/
        WAD_Layouter.prototype.updateSelectedComponents = function () {
            var consideredComponents = this.consideredComponents();
            consideredComponents.forEach(function (Component) {
                var Dummy = Layouter.DummyForComponent[Component.uniqueId];
                if (ComponentIsSelected(Component)) {
                    if (!Dummy.hasClass('selected')) {
                        Layouter.markComponent(Component);
                    }
                }
                else {
                    if (Dummy.hasClass('selected')) {
                        Layouter.unmarkComponent(Component);
                    }
                }
            });
        };
        /**** considerComponent ****/
        WAD_Layouter.prototype.considerComponent = function (Component, otherComponent) {
            var Geometry = Component.Geometry;
            var x = Geometry.x + this.LayoutOffsetX, Width = Geometry.Width;
            var y = Geometry.y + this.LayoutOffsetY, Height = Geometry.Height;
            var Dummy = $('<div class="WAD WAD-Dummy" tabindex="0" style="' +
                'left:' + Math.round(x) + 'px; width:' + Math.round(Width) + 'px;' +
                'top:' + Math.round(y) + 'px; height:' + Math.round(Height) + 'px"></div>');
            Dummy.data('component', Component);
            this.DummyForComponent[Component.uniqueId] = Dummy;
            if (otherComponent == null) {
                this.LayouterLayer.prepend(Dummy);
            }
            else {
                Dummy.insertAfter(this.DummyForComponent[otherComponent.uniqueId]);
            }
        };
        /**** ignoreComponent ****/
        WAD_Layouter.prototype.ignoreComponent = function (Component) {
            var uniqueId = Component.uniqueId;
            this.DummyForComponent[uniqueId].remove();
            delete this.DummyForComponent[uniqueId];
            if (Component === this.tabbedComponent) {
                this.detabComponent(Component);
            }
        };
        /**** considerComponents ****/
        WAD_Layouter.prototype.considerComponents = function (Components) {
            Components.forEach(function (Component, Index) {
                Layouter.considerComponent(Component, Index === 0 ? null : Components[Index - 1]);
            });
        };
        /**** ignoreAllComponents ****/
        WAD_Layouter.prototype.ignoreAllComponents = function () {
            this.LayouterLayer.children('.WAD-Dummy').remove();
            this.DummyForComponent = Object.create(null);
            this.tabbedComponent = null;
        };
        /**** consideredComponents - in DOM order ****/
        WAD_Layouter.prototype.consideredComponents = function () {
            var Result = [];
            this.LayouterLayer.children('.WAD-Dummy').each(function () {
                Result.push($(this).data('component'));
            });
            return Result;
        };
        /**** ComponentIsConsidered ****/
        WAD_Layouter.prototype.ComponentIsConsidered = function (Component) {
            return (this.DummyForComponent[Component.uniqueId] != null);
        };
        /**** shiftDummyForComponentAfter ****/
        WAD_Layouter.prototype.shiftDummyForComponentAfter = function (thisComponent, otherComponent) {
            var Dummy = this.DummyForComponent[thisComponent.uniqueId];
            if (otherComponent == null) {
                this.LayouterLayer.prepend(Dummy);
            }
            else {
                Dummy.insertAfter(this.DummyForComponent[otherComponent.uniqueId]);
            }
        };
        /**** updateDummyForComponent ****/
        WAD_Layouter.prototype.updateDummyForComponent = function (Component) {
            var Geometry = Component.Geometry;
            var x = Geometry.x + this.LayoutOffsetX, Width = Geometry.Width;
            var y = Geometry.y + this.LayoutOffsetY, Height = Geometry.Height;
            var Dummy = this.DummyForComponent[Component.uniqueId];
            Dummy.css({
                left: Math.round(x) + 'px', width: Math.round(Width) + 'px',
                top: Math.round(y) + 'px', height: Math.round(Height) + 'px'
            });
        };
        /**** startEventHandling ****/
        WAD_Layouter.prototype.startEventHandling = function () {
            this.LayouterLayer.on('mousedown', this.onMouseDown);
            this.LayouterLayer.on('mousemove', this.onMouseMove);
            this.LayouterLayer.on('mouseup', this.onMouseUp);
            this.LayouterLayer.on('keydown', this.onKeyDown);
            this.LayouterLayer.on('keypress', this.onKeyPress);
            this.LayouterLayer.on('keyup', this.onKeyUp);
            this.LayouterLayer.focus();
        };
        /**** stopEventHandling ****/
        WAD_Layouter.prototype.stopEventHandling = function () {
            if (this.LayouterLayer != null) {
                this.LayouterLayer.off('mousedown', this.onMouseDown);
                this.LayouterLayer.off('mousemove', this.onMouseMove);
                this.LayouterLayer.off('mouseup', this.onMouseUp);
                this.LayouterLayer.blur();
                this.LayouterLayer.off('keydown', this.onKeyDown);
                this.LayouterLayer.off('keypress', this.onKeyPress);
                this.LayouterLayer.off('keyup', this.onKeyUp);
            }
        };
        /**** onMouseDown ****/
        WAD_Layouter.prototype.onMouseDown = function (Event) {
            if (Event.which !== 1) {
                return false;
            } // not the primary mouse button
            var Target = $(Event.target);
            var EventX = Event.pageX;
            var EventY = Event.pageY;
            Layouter.finishAnyOngoingLayoutMode(Event);
            switch (true) {
                case Target.hasClass('WAD-LayouterLayer'):
                    Layouter.startLassoSelection(EventX, EventY, Event);
                    break;
                case Target.hasClass('WAD-Dummy'):
                    Layouter.initialComponent = Target.data('component');
                    Layouter.startSelectingOrDragging(EventX, EventY);
                    break;
                case Target.hasClass('WAD-ResizeHandle'):
                    Layouter.ResizeMode = Target.data('resize-mode');
                    Layouter.startResizing(EventX, EventY);
            }
            return false; // swallow event in any case
        };
        /**** onMouseMove ****/
        WAD_Layouter.prototype.onMouseMove = function (Event) {
            var EventX = Event.pageX;
            var EventY = Event.pageY;
            switch (Layouter.LayoutMode) {
                case 'Lassoing':
                    Layouter.continueLassoSelection(EventX, EventY);
                    break;
                case 'SelectingOrDragging':
                    Layouter.continueSelectingOrDragging(EventX, EventY, Event);
                    break;
                case 'Dragging':
                    Layouter.continueDragging(EventX, EventY);
                    break;
                case 'Resizing':
                    Layouter.continueResizing(EventX, EventY);
                    break;
            }
            return false; // swallow event in any case
        };
        /**** onMouseUp ****/
        WAD_Layouter.prototype.onMouseUp = function (Event) {
            if (Event.which !== 1) {
                return false;
            } // not the primary mouse button
            var EventX = Event.pageX;
            var EventY = Event.pageY;
            switch (Layouter.LayoutMode) {
                case 'Lassoing':
                    Layouter.finishLassoSelection(EventX, EventY);
                    break;
                case 'SelectingOrDragging':
                    Layouter.finishSelectingOrDragging(EventX, EventY, Event);
                    break;
                case 'Dragging':
                    Layouter.finishDragging(EventX, EventY);
                    break;
                case 'Resizing':
                    Layouter.finishResizing(EventX, EventY);
                    break;
            }
            return false; // swallow event in any case
        };
        /**** onKeyDown ****/
        WAD_Layouter.prototype.onKeyDown = function (Event) {
            Layouter.handleKeyEvent(Event);
            return false; // swallow event
        };
        /**** onKeyPress ****/
        WAD_Layouter.prototype.onKeyPress = function (Event) {
            Layouter.handleKeyEvent(Event);
            return false; // swallow event
        };
        /**** onKeyUp ****/
        WAD_Layouter.prototype.onKeyUp = function ( /* Event */) {
            //    Layouter.handleKeyEvent(Event)
            return false; // swallow event
        };
        /**** handleKeyEvent ****/
        WAD_Layouter.prototype.handleKeyEvent = function (Event) {
            var KeyCode = Event.which;
            if (KeyCode === 27) { // ESC key
                Layouter.abortAnyOngoingLayoutMode();
                return;
            }
            switch (KeyCode) {
                case 8: // Backspace key
                case 46: // Delete key
                    Layouter.finishAnyOngoingLayoutMode(Event);
                    doRemoveSelectedComponents();
                    Ticker.tickNow();
                    break;
                case 9: // TAB key
                    Layouter.finishAnyOngoingLayoutMode(Event);
                    var ComponentToBeTabbed = (Event.shiftKey ? Layouter.prevTabbableComponent() : Layouter.nextTabbableComponent());
                    if (ComponentToBeTabbed != null) {
                        Layouter.entabComponent(ComponentToBeTabbed);
                    }
                    break;
                case 32: // Space key
                    Event.stopImmediatePropagation();
                    Layouter.finishAnyOngoingLayoutMode(Event);
                    var tabbedComponent = this.tabbedComponent;
                    if (tabbedComponent != null) {
                        if (ComponentIsSelected(tabbedComponent)) {
                            if (Event.shiftKey) {
                                deselectComponent(tabbedComponent);
                            }
                            else {
                                deselectAllComponents();
                            }
                        }
                        else {
                            selectComponent(tabbedComponent, Event.shiftKey ? 'additionally' : 'solely');
                        }
                        Ticker.tickPromptly();
                    }
                    break;
                case 37: // left arrow
                    Layouter.finishAnyOngoingLayoutMode(Event);
                    if (Event.metaKey) {
                        doChangeGeometryOfSelectedComponentsBy(null, null, Event.shiftKey ? -10 : -1, null);
                    }
                    else {
                        doChangeGeometryOfSelectedComponentsBy(Event.shiftKey ? -10 : -1, null, null, null);
                    }
                    Ticker.tickPromptly();
                    break;
                case 38: // up arrow
                    Layouter.finishAnyOngoingLayoutMode(Event);
                    if (Event.altKey) {
                        var selectedComponents = memoized('selectedComponents');
                        if (selectedComponents.length > 0) {
                            if (VisualsMayBeShiftedUp('Component', selectedComponents)) {
                                if (Event.shiftKey) {
                                    doShiftSelectedVisualsToTop('Component');
                                }
                                else {
                                    doShiftSelectedVisualsUp('Component');
                                }
                                Ticker.tickPromptly();
                            }
                        }
                    }
                    else {
                        if (Event.metaKey) {
                            doChangeGeometryOfSelectedComponentsBy(null, null, null, Event.shiftKey ? -10 : -1);
                        }
                        else {
                            doChangeGeometryOfSelectedComponentsBy(null, Event.shiftKey ? -10 : -1, null, null);
                        }
                        Ticker.tickPromptly();
                    }
                    break;
                case 39: // right arrow
                    Layouter.finishAnyOngoingLayoutMode(Event);
                    if (Event.metaKey) {
                        doChangeGeometryOfSelectedComponentsBy(null, null, Event.shiftKey ? +10 : +1, null);
                    }
                    else {
                        doChangeGeometryOfSelectedComponentsBy(Event.shiftKey ? +10 : +1, null, null, null);
                    }
                    Ticker.tickPromptly();
                    break;
                case 40: // down arrow
                    Layouter.finishAnyOngoingLayoutMode(Event);
                    if (Event.altKey) {
                        var selectedComponents = memoized('selectedComponents');
                        if (selectedComponents.length > 0) {
                            if (VisualsMayBeShiftedDown('Component', selectedComponents)) {
                                if (Event.shiftKey) {
                                    doShiftSelectedVisualsToBottom('Component');
                                }
                                else {
                                    doShiftSelectedVisualsDown('Component');
                                }
                                Ticker.tickPromptly();
                            }
                        }
                    }
                    else {
                        if (Event.metaKey) {
                            doChangeGeometryOfSelectedComponentsBy(null, null, null, Event.shiftKey ? +10 : +1);
                        }
                        else {
                            doChangeGeometryOfSelectedComponentsBy(null, Event.shiftKey ? +10 : +1, null, null);
                        }
                        Ticker.tickPromptly();
                    }
                    break;
                case 65: // "A"
                    Layouter.finishAnyOngoingLayoutMode(Event);
                    if (Event.metaKey) {
                        if (Event.shiftKey) {
                            deselectAllComponents();
                        }
                        else {
                            selectAllComponents();
                        }
                        Ticker.tickPromptly();
                    }
                    break;
            }
        };
        /**** entabComponent ****/
        WAD_Layouter.prototype.entabComponent = function (Component) {
            if (this.tabbedComponent != null) {
                if (this.tabbedComponent === Component) {
                    return; // component is already tabbed
                }
                else {
                    this.detabComponent(this.tabbedComponent);
                }
            }
            this.tabbedComponent = Component;
            this.DummyForComponent[this.tabbedComponent.uniqueId].addClass('WAD-Tabbed');
        };
        /**** detabComponent ****/
        WAD_Layouter.prototype.detabComponent = function (Component) {
            if (this.tabbedComponent === Component) {
                this.DummyForComponent[this.tabbedComponent.uniqueId].removeClass('WAD-Tabbed');
                this.tabbedComponent = null;
            }
        };
        /**** nextTabbableComponent ****/
        WAD_Layouter.prototype.nextTabbableComponent = function () {
            var selectableComponents = memoized('selectableComponents');
            if (this.tabbedComponent == null) {
                return selectableComponents.first();
            }
            var TabIndex = selectableComponents.indexOf(this.tabbedComponent);
            if (TabIndex < 0) {
                return undefined;
            }
            TabIndex += 1;
            return (TabIndex >= selectableComponents.length
                ? selectableComponents[0]
                : selectableComponents[TabIndex]);
        };
        /**** prevTabbableComponent ****/
        WAD_Layouter.prototype.prevTabbableComponent = function () {
            var selectableComponents = memoized('selectableComponents');
            if (this.tabbedComponent == null) {
                return selectableComponents[selectableComponents.length - 1];
            }
            var TabIndex = selectableComponents.indexOf(this.tabbedComponent);
            if (TabIndex < 0) {
                return undefined;
            }
            TabIndex -= 1;
            return (TabIndex < 0
                ? selectableComponents[selectableComponents.length - 1]
                : selectableComponents[TabIndex]);
        };
        /**** createLasso ****/
        WAD_Layouter.prototype.createLasso = function (PageX1, PageY1, PageX2, PageY2) {
            this.SelectionLasso = $('<div class="WAD WAD-Lasso"></div>');
            this.LayouterLayer.append(this.SelectionLasso);
            this.reshapeLassoTo(PageX1, PageY1, PageX2, PageY2);
        };
        /**** reshapeLassoTo ****/
        WAD_Layouter.prototype.reshapeLassoTo = function (PageX1, PageY1, PageX2, PageY2) {
            var LassoLeft = Math.round(PageX1 < PageX2 ? PageX1 : PageX2);
            var LassoTop = Math.round(PageY1 < PageY2 ? PageY1 : PageY2);
            var LassoRight = Math.round(PageX1 < PageX2 ? PageX2 : PageX1);
            var LassoBottom = Math.round(PageY1 < PageY2 ? PageY2 : PageY1);
            var LassoWidth = LassoRight - LassoLeft;
            var LassoHeight = LassoBottom - LassoTop;
            this.SelectionLasso.css({
                left: LassoLeft + 'px', width: LassoWidth + 'px',
                top: LassoTop + 'px', height: LassoHeight + 'px'
            });
        };
        /**** destroyLasso ****/
        WAD_Layouter.prototype.destroyLasso = function () {
            this.SelectionLasso.remove();
            this.SelectionLasso = null;
        };
        /**** ComponentsCaughtByLasso ****/
        WAD_Layouter.prototype.ComponentsCaughtByLasso = function (x1, y1, x2, y2) {
            var LassoLeft = Math.round(x1 < x2 ? x1 : x2); // w/o LayoutOffset!
            var LassoTop = Math.round(y1 < y2 ? y1 : y2); // dto.
            var LassoRight = Math.round(x1 < x2 ? x2 : x1); // dto.
            var LassoBottom = Math.round(y1 < y2 ? y2 : y1); // dto.
            var SelectableComponents = memoized('selectableComponents');
            var GeometryList = memoized('GeometriesOfSelectableComponents');
            return SelectableComponents.filter(function (_, Index) {
                var Geometry = GeometryList[Index];
                var ComponentLeft = Geometry.x, ComponentRight = ComponentLeft + Geometry.Width - 1;
                var ComponentTop = Geometry.y, ComponentBottom = ComponentTop + Geometry.Height - 1;
                var caught = false;
                if (Layouter.LassoMode === 'touched') {
                    caught = ((LassoLeft <= ComponentRight) && (ComponentLeft <= LassoRight) &&
                        (LassoTop <= ComponentBottom) && (ComponentTop <= LassoBottom));
                }
                else {
                    caught = ((LassoLeft <= ComponentLeft) && (ComponentRight <= LassoRight) &&
                        (LassoTop <= ComponentTop) && (ComponentBottom <= LassoBottom));
                }
                return caught;
            });
        };
        /**** markComponent ****/
        WAD_Layouter.prototype.markComponent = function (Component) {
            var Dummy = this.DummyForComponent[Component.uniqueId];
            Dummy.addClass('selected');
            this.createResizeHandles(Dummy);
        };
        /**** markComponents ****/
        WAD_Layouter.prototype.markComponents = function (Components) {
            Components.forEach(function (Component) {
                Layouter.markComponent(Component);
            });
        };
        /**** unmarkComponent ****/
        WAD_Layouter.prototype.unmarkComponent = function (Component) {
            var Dummy = this.DummyForComponent[Component.uniqueId];
            Dummy.removeClass('selected');
            this.destroyResizeHandles(Dummy);
        };
        /**** unmarkComponents ****/
        WAD_Layouter.prototype.unmarkComponents = function (Components) {
            Components.forEach(function (Component) {
                Layouter.unmarkComponent(Component);
            });
        };
        /**** createResizeHandles ****/
        WAD_Layouter.prototype.createResizeHandles = function (Dummy) {
            var ResizeHandles = [];
            function addResizeHandle(Type) {
                var ResizeHandle = $('<div class="WAD WAD-ResizeHandle WAD-ResizeHandle-' + Type + '"></div>');
                ResizeHandle.data('resize-mode', Type);
                Dummy.append(ResizeHandle);
            }
            addResizeHandle('nw');
            addResizeHandle('n');
            addResizeHandle('ne');
            addResizeHandle('w');
            addResizeHandle('e');
            addResizeHandle('sw');
            addResizeHandle('s');
            addResizeHandle('se');
        };
        /**** destroyResizeHandles ****/
        WAD_Layouter.prototype.destroyResizeHandles = function (Dummy) {
            Dummy.children('.WAD-ResizeHandle').remove();
        };
        /**** displaceSelectedComponentsBy ****/
        WAD_Layouter.prototype.displaceSelectedComponentsBy = function (dx, dy) {
            var SnapToGrid = chosenDesignerInfo.SnapToGrid;
            var GridX = 0, GridWidth = (SnapToGrid ? Layouter.GridWidth : 0);
            var GridY = 0, GridHeight = (SnapToGrid ? Layouter.GridHeight : 0);
            function displacedGeometryOf(Component, initialGeometry, dx, dy) {
                var newX = initialGeometry.x + dx;
                var newY = initialGeometry.y + dy;
                if (GridWidth > 1) {
                    newX = GridX + GridWidth * Math.round((newX - GridX) / GridWidth);
                }
                if (GridHeight > 1) {
                    newY = GridY + GridHeight * Math.round((newY - GridY) / GridHeight);
                }
                return {
                    x: newX, Width: initialGeometry.Width,
                    y: newY, Height: initialGeometry.Height
                };
            }
            var selectedComponents = memoized('selectedComponents');
            var newGeometryList = [];
            selectedComponents.forEach(function (Component, Index) {
                newGeometryList.push(displacedGeometryOf(Component, Layouter.initialGeometryList[Index], dx, dy));
            });
            doChangeGeometryOfSelectedComponentsTo(newGeometryList);
        };
        /**** deformSelectedComponentsBy ****/
        WAD_Layouter.prototype.deformSelectedComponentsBy = function (dx, dy) {
            var Direction = this.ResizeMode;
            var SnapToGrid = chosenDesignerInfo.SnapToGrid;
            var GridX = 0, GridWidth = (SnapToGrid ? Layouter.GridWidth : 0);
            var GridY = 0, GridHeight = (SnapToGrid ? Layouter.GridHeight : 0);
            function deformedGeometryOf(Component, initialGeometry, Direction, dx, dy) {
                var oldX = initialGeometry.x, oldWidth = initialGeometry.Width;
                var oldY = initialGeometry.y, oldHeight = initialGeometry.Height;
                if (GridWidth > 1) {
                    var auxX = oldX + dx;
                    auxX = GridX + GridWidth * Math.round((auxX - GridX) / GridWidth);
                    dx = auxX - oldX;
                }
                if (GridHeight > 1) {
                    var auxY = oldY + dy;
                    auxY = GridY + GridHeight * Math.round((auxY - GridY) / GridHeight);
                    dy = auxY - oldY;
                }
                var newX, newY, newWidth, newHeight;
                switch (Direction) {
                    case 'nw':
                        newWidth = oldWidth - dx;
                        newHeight = oldHeight - dy;
                        break;
                    case 'n':
                        newWidth = oldWidth;
                        newHeight = oldHeight - dy;
                        break;
                    case 'ne':
                        newWidth = oldWidth + dx;
                        newHeight = oldHeight - dy;
                        break;
                    case 'e':
                        newWidth = oldWidth + dx;
                        newHeight = oldHeight;
                        break;
                    case 'se':
                        newWidth = oldWidth + dx;
                        newHeight = oldHeight + dy;
                        break;
                    case 's':
                        newWidth = oldWidth;
                        newHeight = oldHeight + dy;
                        break;
                    case 'sw':
                        newWidth = oldWidth - dx;
                        newHeight = oldHeight + dy;
                        break;
                    case 'w':
                        newWidth = oldWidth - dx;
                        newHeight = oldHeight;
                        break;
                }
                var computedStyle;
                if (newWidth !== oldWidth) {
                    computedStyle = window.getComputedStyle(Component.Peer, null);
                    var minWidth = parseFloat(computedStyle.minWidth || '0');
                    var maxWidth = (computedStyle.maxWidth === 'none' ? Infinity : parseFloat(computedStyle.maxWidth));
                    newWidth = Math.max(minWidth, Math.min(newWidth, maxWidth));
                } // limits bind stronger than grid points
                if (newHeight !== oldHeight) {
                    computedStyle = computedStyle || window.getComputedStyle(Component.Peer, null);
                    var minHeight = parseFloat(computedStyle.minHeight || '0');
                    var maxHeight = (computedStyle.maxHeight === 'none' ? Infinity : parseFloat(computedStyle.maxHeight));
                    newHeight = Math.max(minHeight, Math.min(newHeight, maxHeight));
                } // limits bind stronger than grid points
                switch (Direction) {
                    case 'nw':
                        newX = oldX - (newWidth - oldWidth);
                        newY = oldY - (newHeight - oldHeight);
                        break;
                    case 'n':
                        newX = oldX;
                        newY = oldY - (newHeight - oldHeight);
                        break;
                    case 'ne':
                        newX = oldX;
                        newY = oldY - (newHeight - oldHeight);
                        break;
                    case 'e':
                        newX = oldX;
                        newY = oldY;
                        break;
                    case 'se':
                        newX = oldX;
                        newY = oldY;
                        break;
                    case 's':
                        newX = oldX;
                        newY = oldY;
                        break;
                    case 'sw':
                        newX = oldX - (newWidth - oldWidth);
                        newY = oldY;
                        break;
                    case 'w':
                        newX = oldX - (newWidth - oldWidth);
                        newY = oldY;
                        break;
                }
                return {
                    x: newX, Width: newWidth,
                    y: newY, Height: newHeight
                };
            }
            var selectedComponents = memoized('selectedComponents');
            var newGeometryList = [];
            selectedComponents.forEach(function (Component, Index) {
                newGeometryList.push(deformedGeometryOf(Component, Layouter.initialGeometryList[Index], Direction, dx, dy));
            });
            doChangeGeometryOfSelectedComponentsTo(newGeometryList);
        };
        /**** prepareGuides ****/
        WAD_Layouter.prototype.prepareGuides = function () {
            this.clearGuides(); // may exist because of keyboard dragging
            var potentialGuideX = this.potentialGuideX = [];
            var potentialGuideY = this.potentialGuideY = [];
            var selectableComponents = memoized('selectableComponents');
            selectableComponents.forEach(function (Component) {
                if (ComponentIsSelected(Component)) {
                    return;
                }
                var Geometry = Component.Geometry;
                /**** potential vertical guides ****/
                var X = Geometry.x, Width = Geometry.Width;
                var GuideX = Math.round(X);
                if (GuideX >= 0) {
                    potentialGuideX[GuideX] = Math.max(potentialGuideX[GuideX] || 0, WAD_Layouter.EdgeGuide);
                }
                GuideX = Math.round(X + Width / 2);
                if (GuideX >= 0) {
                    potentialGuideX[GuideX] = Math.max(potentialGuideX[GuideX] || 0, WAD_Layouter.CenterGuide);
                }
                GuideX = Math.round(X + Width);
                if (GuideX >= 0) {
                    potentialGuideX[GuideX] = Math.max(potentialGuideX[GuideX] || 0, WAD_Layouter.EdgeGuide);
                }
                /**** potential horizontal guides ****/
                var Y = Geometry.y, Height = Geometry.Height;
                var GuideY = Math.round(Y);
                if (GuideY >= 0) {
                    potentialGuideY[GuideY] = Math.max(potentialGuideY[GuideY] || 0, WAD_Layouter.EdgeGuide);
                }
                GuideY = Math.round(Y + Height / 2);
                if (GuideY >= 0) {
                    potentialGuideY[GuideY] = Math.max(potentialGuideY[GuideY] || 0, WAD_Layouter.CenterGuide);
                }
                GuideY = Math.round(Y + Height);
                if (GuideY >= 0) {
                    potentialGuideY[GuideY] = Math.max(potentialGuideY[GuideY] || 0, WAD_Layouter.EdgeGuide);
                }
            });
            this.horizontalGuideList = [];
            this.verticalGuideList = [];
        };
        /**** updateGuides ****/
        WAD_Layouter.prototype.updateGuides = function () {
            var potentialGuideX = this.potentialGuideX || [], requestedGuideX = [];
            var potentialGuideY = this.potentialGuideY || [], requestedGuideY = [];
            var selectedComponents = memoized('selectedComponents');
            selectedComponents.forEach(function (Component) {
                var Geometry = Component.Geometry;
                var X = Geometry.x, Width = Geometry.Width;
                var Y = Geometry.y, Height = Geometry.Height;
                /**** collect all vertical guides ****/
                var GuideX = Math.round(X);
                if ((GuideX >= 0) && (potentialGuideX[GuideX] != null)) {
                    requestedGuideX[GuideX] = potentialGuideX[GuideX];
                }
                GuideX = Math.round(X + Width / 2);
                if ((GuideX >= 0) && (potentialGuideX[GuideX] != null)) {
                    requestedGuideX[GuideX] = Math.max(potentialGuideX[GuideX], WAD_Layouter.CenterGuide);
                }
                GuideX = Math.round(X + Width);
                if ((GuideX >= 0) && (potentialGuideX[GuideX] != null)) {
                    requestedGuideX[GuideX] = potentialGuideX[GuideX];
                }
                /**** collect all horizontal guides ****/
                var GuideY = Math.round(Y);
                if ((GuideY >= 0) && (potentialGuideY[GuideY] != null)) {
                    requestedGuideY[GuideY] = potentialGuideY[GuideY];
                }
                GuideY = Math.round(Y + Height / 2);
                if ((GuideY >= 0) && (potentialGuideY[GuideY] != null)) {
                    requestedGuideY[GuideY] = Math.max(potentialGuideY[GuideY], WAD_Layouter.CenterGuide);
                }
                GuideY = Math.round(Y + Height);
                if ((GuideY >= 0) && (potentialGuideY[GuideY] != null)) {
                    requestedGuideY[GuideY] = potentialGuideY[GuideY];
                }
            });
            /**** remove all guides which are no longer needed ****/
            var verticalGuideList = this.verticalGuideList;
            for (var x in verticalGuideList) {
                if (verticalGuideList.hasOwnProperty(x)) {
                    if (requestedGuideX[x] == null) {
                        verticalGuideList[x].remove();
                        delete verticalGuideList[x];
                    }
                }
            }
            var horizontalGuideList = this.horizontalGuideList;
            for (var y in horizontalGuideList) {
                if (horizontalGuideList.hasOwnProperty(y)) {
                    if (requestedGuideY[y] == null) {
                        horizontalGuideList[y].remove();
                        delete horizontalGuideList[y];
                    }
                }
            }
            /**** finally add all requested guides which do not yet exist ****/
            var Guide;
            for (var x in requestedGuideX) {
                if (requestedGuideX.hasOwnProperty(x)) {
                    if (verticalGuideList[x] == null) {
                        var GuideX = parseInt(x, 10);
                        Guide = $('<div style="left:' + (GuideX + this.LayoutOffsetX) + 'px"></div>');
                        Guide.addClass(requestedGuideX[x] === WAD_Layouter.EdgeGuide
                            ? 'WAD WAD-verticalEdgeGuide'
                            : 'WAD WAD-verticalCenterGuide');
                        this.LayouterLayer.append(Guide);
                        verticalGuideList[x] = Guide;
                    }
                }
            }
            for (var y in requestedGuideY) {
                if (requestedGuideY.hasOwnProperty(y)) {
                    if (horizontalGuideList[y] == null) {
                        var GuideY = parseInt(y, 10);
                        Guide = $('<div style="top:' + (GuideY + this.LayoutOffsetY) + 'px"></div>');
                        Guide.addClass(requestedGuideY[y] === WAD_Layouter.EdgeGuide
                            ? 'WAD WAD-horizontalEdgeGuide'
                            : 'WAD WAD-horizontalCenterGuide');
                        this.LayouterLayer.append(Guide);
                        horizontalGuideList[y] = Guide;
                    }
                }
            }
        };
        /**** clearGuides ****/
        WAD_Layouter.prototype.clearGuides = function () {
            this.LayouterLayer.children('.WAD-horizontalEdgeGuide,.WAD-horizontalCenterGuide,' +
                '.WAD-verticalEdgeGuide,  .WAD-verticalCenterGuide').remove();
            this.potentialGuideX = null;
            this.horizontalGuideList = null;
            this.potentialGuideY = null;
            this.verticalGuideList = null;
        };
        /**** startLassoSelection ****/
        WAD_Layouter.prototype.startLassoSelection = function (PageX, PageY, Event) {
            this.LayoutMode = 'Lassoing';
            if (Event.shiftKey || Event.ctrlKey || Event.metaKey) {
                this.initialSelection = memoized('selectedComponents');
            }
            else {
                deselectAllComponents();
                this.initialSelection = [];
            }
            var Geometry = memoized('GeometryOnPageOfContainer');
            this.initialX = PageX - Geometry.x; // in local coordinates
            this.initialY = PageY - Geometry.y; // dto.
            this.createLasso(PageX, PageY, PageX, PageY);
        };
        /**** continueLassoSelection ****/
        WAD_Layouter.prototype.continueLassoSelection = function (PageX, PageY) {
            var initialX = this.initialX;
            var initialY = this.initialY;
            var Geometry = memoized('GeometryOnPageOfContainer');
            this.reshapeLassoTo(initialX + Geometry.x, initialY + Geometry.y, PageX, PageY);
            var caughtComponents = this.ComponentsCaughtByLasso(initialX, initialY, PageX - Geometry.x, PageY - Geometry.y);
            var selectedComponents = memoized('selectedComponents');
            var ComponentsToBeSelected = ListWithAll(this.initialSelection, caughtComponents);
            var ComponentsToBeDeselected = ListWithoutAll(selectedComponents, ComponentsToBeSelected);
            deselectAndSelectComponents(ComponentsToBeDeselected, ComponentsToBeSelected);
            Ticker.tickPromptly();
        };
        /**** finishLassoSelection ****/
        WAD_Layouter.prototype.finishLassoSelection = function (PageX, PageY) {
            this.continueLassoSelection(PageX, PageY); // just to be safe
            this.initialX = 0;
            this.initialY = 0;
            this.destroyLasso();
            this.initialSelection = [];
            this.LayoutMode = null;
            Ticker.tickPromptly();
        };
        /**** abortLassoSelection ****/
        WAD_Layouter.prototype.abortLassoSelection = function () {
            this.initialX = 0;
            this.initialY = 0;
            if (this.initialSelection == null) {
                deselectAllComponents();
            }
            else {
                deselectAndSelectComponents(ListWithoutAll(memoized('selectedComponents'), this.initialSelection), this.initialSelection);
            }
            Ticker.tickPromptly();
            this.destroyLasso();
            this.initialSelection = null;
            this.LayoutMode = null;
        };
        /**** startSelectingOrDragging ****/
        WAD_Layouter.prototype.startSelectingOrDragging = function (PageX, PageY) {
            this.LayoutMode = 'SelectingOrDragging';
            //  initialComponent has already been set outside
            var Geometry = memoized('GeometryOnPageOfContainer');
            this.initialX = PageX - Geometry.x; // in local coordinates
            this.initialY = PageY - Geometry.y; // dto.
            this.LayouterLayer.focus(); // it might have lost the focus before
        };
        /**** continueSelectingOrDragging ****/
        WAD_Layouter.prototype.continueSelectingOrDragging = function (PageX, PageY, Event) {
            var initialX = this.initialX;
            var initialY = this.initialY;
            var Geometry = memoized('GeometryOnPageOfContainer');
            var localX = PageX - Geometry.x;
            var localY = PageY - Geometry.y;
            var Distance2 = ((initialX - localX) * (initialX - localX) +
                (initialY - localY) * (initialY - localY));
            if (Distance2 > GraceDistance2) {
                this.startDragging(initialX + Geometry.x, initialY + Geometry.y, Event);
                this.continueDragging(PageX, PageY);
            }
        };
        /**** finishSelectingOrDragging ****/
        WAD_Layouter.prototype.finishSelectingOrDragging = function (PageX, PageY, Event) {
            var initialX = this.initialX;
            var initialY = this.initialY;
            var Geometry = memoized('GeometryOnPageOfContainer');
            var localX = PageX - Geometry.x;
            var localY = PageY - Geometry.y;
            var Distance2 = ((initialX - localX) * (initialX - localX) +
                (initialY - localY) * (initialY - localY));
            if (Distance2 > GraceDistance2) {
                this.startDragging(initialX + Geometry.x, initialY + Geometry.y, Event);
                this.finishDragging(PageX, PageY);
            }
            else {
                var initialComponent = this.initialComponent;
                var additive = (Event != null) && (Event.shiftKey || Event.ctrlKey || Event.metaKey);
                if (additive) {
                    if (ComponentIsSelected(initialComponent)) {
                        deselectComponent(initialComponent);
                    }
                    else {
                        selectComponent(initialComponent, 'additionally');
                    }
                }
                else {
                    var selectedComponents = memoized('selectedComponents');
                    var ComponentsToBeSelected = [initialComponent];
                    var ComponentsToBeDeselected = ListWithoutAll(selectedComponents, ComponentsToBeSelected);
                    deselectAndSelectComponents(ComponentsToBeDeselected, ComponentsToBeSelected);
                }
                Ticker.tickPromptly();
                if (Event.detail === 2) {
                    chooseContainer(initialComponent.Container);
                }
            }
            this.initialComponent = null;
            this.LayoutMode = null;
        };
        /**** abortSelectingOrDragging ****/
        WAD_Layouter.prototype.abortSelectingOrDragging = function () {
            this.initialComponent = null;
            this.LayoutMode = null;
        };
        /**** startDragging ****/
        WAD_Layouter.prototype.startDragging = function (PageX, PageY, Event) {
            this.LayoutMode = 'Dragging';
            //  initialComponent has already been set outside
            var Geometry = memoized('GeometryOnPageOfContainer');
            this.initialX = PageX - Geometry.x;
            this.initialY = PageY - Geometry.y;
            var selectedComponents = memoized('selectedComponents');
            if (!ComponentIsSelected(this.initialComponent)) {
                if (!Event.shiftKey && !Event.ctrlKey && !Event.metaKey) {
                    deselectComponents(ListWithout(selectedComponents, this.initialComponent));
                }
                selectComponent(this.initialComponent);
            }
            Ticker.tickNow();
            this.initialComponent = null;
            this.initialGeometryList = GeometriesOfComponents(memoized('selectedComponents'));
            this.prepareGuides();
        };
        /**** continueDragging ****/
        WAD_Layouter.prototype.continueDragging = function (PageX, PageY) {
            var Geometry = memoized('GeometryOnPageOfContainer');
            var localX = PageX - Geometry.x;
            var localY = PageY - Geometry.y;
            this.displaceSelectedComponentsBy(localX - this.initialX, localY - this.initialY);
            Ticker.tickNow();
            this.updateGuides();
        };
        /**** finishDragging ****/
        WAD_Layouter.prototype.finishDragging = function (PageX, PageY) {
            this.continueDragging(PageX, PageY); // incl. "tickNow"
            this.clearGuides();
            this.initialGeometryList = [];
            this.LayoutMode = null;
        };
        /**** abortDragging ****/
        WAD_Layouter.prototype.abortDragging = function () {
            this.displaceSelectedComponentsBy(0, 0);
            Ticker.tickNow();
            this.clearGuides();
            this.initialGeometryList = [];
            this.LayoutMode = null;
        };
        /**** startResizing ****/
        WAD_Layouter.prototype.startResizing = function (PageX, PageY) {
            this.LayoutMode = 'Resizing';
            //    ResizeMode has already been set outside
            var Geometry = memoized('GeometryOnPageOfContainer');
            this.initialX = PageX - Geometry.x;
            this.initialY = PageY - Geometry.y;
            this.initialGeometryList = GeometriesOfComponents(memoized('selectedComponents'));
            this.prepareGuides();
        };
        /**** continueResizing ****/
        WAD_Layouter.prototype.continueResizing = function (PageX, PageY) {
            var Geometry = memoized('GeometryOnPageOfContainer');
            var localX = PageX - Geometry.x;
            var localY = PageY - Geometry.y;
            this.deformSelectedComponentsBy(localX - this.initialX, localY - this.initialY);
            Ticker.tickNow();
            this.updateGuides();
        };
        /**** finishResizing ****/
        WAD_Layouter.prototype.finishResizing = function (PageX, PageY) {
            this.continueResizing(PageX, PageY); // incl. "tickNow"
            this.clearGuides();
            this.ResizeMode = null;
            this.initialGeometryList = [];
            this.LayoutMode = null;
        };
        /**** abortResizing ****/
        WAD_Layouter.prototype.abortResizing = function () {
            this.deformSelectedComponentsBy(0, 0);
            Ticker.tickNow();
            this.clearGuides();
            this.ResizeMode = null;
            this.initialGeometryList = [];
            this.LayoutMode = null;
        };
        /**** finishAnyOngoingLayoutMode ****/
        WAD_Layouter.prototype.finishAnyOngoingLayoutMode = function (Event) {
            if (this.LayoutMode != null) {
                var PageX = Event.pageX;
                var PageY = Event.pageY;
                switch (this.LayoutMode) {
                    case 'Lassoing':
                        this.finishLassoSelection(PageX, PageY);
                        break;
                    case 'SelectingOrDragging':
                        this.finishSelectingOrDragging(PageX, PageY, Event);
                        break;
                    case 'Dragging':
                        this.finishDragging(PageX, PageY);
                        break;
                    case 'Resizing':
                        this.finishResizing(PageX, PageY);
                        break;
                }
                this.clearGuides(); // may exist because of keyboard dragging
                this.LayoutMode = null;
            }
        };
        /**** abortAnyOngoingLayoutMode ****/
        WAD_Layouter.prototype.abortAnyOngoingLayoutMode = function () {
            if (this.LayoutMode != null) {
                switch (this.LayoutMode) {
                    case 'Lassoing':
                        this.abortLassoSelection();
                        break;
                    case 'SelectingOrDragging':
                        this.abortSelectingOrDragging();
                        break;
                    case 'Dragging':
                        this.abortDragging();
                        break;
                    case 'Resizing':
                        this.abortResizing();
                        break;
                }
                this.clearGuides(); // may exist because of keyboard dragging
                this.LayoutMode = null;
            }
        };
        WAD_Layouter.EdgeGuide = 2;
        WAD_Layouter.CenterGuide = 1; // i.e. centers are less often shown
        return WAD_Layouter;
    }());
    var Layouter = new WAD_Layouter();
    //----------------------------------------------------------------------------//
    //                                  Toolbox                                   //
    //----------------------------------------------------------------------------//
    var WAD_Toolbox = /** @class */ (function (_super) {
        __extends(WAD_Toolbox, _super);
        function WAD_Toolbox() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**** build (and configure) ****/
        WAD_Toolbox.prototype.build = function () {
            this.Peer = $("\n<div id=\"WAD-Toolbox\" class=\"WAD Dialog WAD-Draggable\" style=\"\n  display:none; width:160px; height:224px;\n\">\n  <div name=\"Titlebar\" class=\"WAD WAD-Titlebar WAD-Dragger\">\n    <div name=\"Title\"       class=\"WAD WAD-Title\">WAT Toolbox</div>\n    <div name=\"CloseButton\" class=\"WAD WAD-Dialog-CloseButton\">\n      <div class=\"WAD-CloseButtonIcon\"></div>\n    </div>\n  </div>\n\n\n  <button name=\"LayoutModeButton\" class=\"WAD WAD-stylableContent WAD-LayoutModeIcon\" style=\"\n    left:4px; top:28px;\n  \"></button>\n\n  <button name=\"NudgerButton\" class=\"WAD WAD-stylableContent WAD-NudgerIcon\" style=\"\n    left:44px; top:28px;\n  \"></button>\n\n  <button name=\"AppletConfigurationButton\" class=\"WAD WAD-stylableContent WAD-AppletConfigurationIcon\" style=\"\n    left:84px; top:28px;\n  \"></button>\n\n  <button name=\"AppletScriptButton\" class=\"WAD WAD-stylableContent WAD-AppletScriptIcon\" style=\"\n    left:124px; top:28px;\n  \"></button>\n\n\n  <button name=\"CardConfigurationButton\" class=\"WAD WAD-stylableContent WAD-CardConfigurationIcon\" style=\"\n    left:4px; top:68px;\n  \"></button>\n\n  <button name=\"CardScriptButton\" class=\"WAD WAD-stylableContent WAD-CardScriptIcon\" style=\"\n    left:44px; top:68px;\n  \"></button>\n\n  <button name=\"ComponentConfigurationButton\" class=\"WAD WAD-stylableContent WAD-ComponentConfigurationIcon\" style=\"\n    left:84px; top:68px;\n  \"></button>\n\n  <button name=\"ComponentScriptButton\" class=\"WAD WAD-stylableContent WAD-ComponentScriptIcon\" style=\"\n    left:124px; top:68px;\n  \"></button>\n\n\n  <select name=\"CreateButton\" class=\"WAD WAD-stylableContent WAD-CreateIcon WAD-Pseudo-DropDown\" style=\"\n    left:4px; top:108px;\n  \">\n   <option hidden disabled selected value></option>\n   <option value=\"HTMLView\">HTML View</option>\n   <option value=\"ImageView\">Image View</option>\n   <option value=\"TextView\">Text View</option>\n   <option value=\"TextlineView\">Textline View</option>\n   <option value=\"IFrameView\">IFrame View</option>\n   <optgroup label=\"native Controls\">\n     <option value=\"nativePushButton\">PushButton</option>\n     <option value=\"nativeCheckbox\">Checkbox</option>\n     <option value=\"nativeRadioButton\">RadioButton</option>\n      <option value=\"\" disabled>-</option>\n     <option value=\"nativeGauge\">Gauge</option>\n     <option value=\"nativeProgressbar\">Progressbar</option>\n     <option value=\"nativeSlider\">Slider</option>\n      <option value=\"\" disabled>-</option>\n     <option value=\"nativeTextlineInput\">Textline Input</option>\n     <option value=\"nativePasswordInput\">Password Input</option>\n     <option value=\"nativeNumberInput\">Number Input</option>\n     <option value=\"nativePhoneNumberInput\">Phone Number Input</option>\n     <option value=\"nativeEMailAddressInput\">EMail Address Input</option>\n     <option value=\"nativeURLInput\">URL Input</option>\n     <option value=\"nativeDateInput\">Date Input</option>\n     <option value=\"nativeMonthInput\">Month Input</option>\n     <option value=\"nativeWeekInput\">Week Input</option>\n     <option value=\"nativeDateTimeInput\">Date and Time Input</option>\n     <option value=\"nativeTimeInput\">Time Input</option>\n     <option value=\"nativeSearchInput\">Search Input</option>\n      <option value=\"\" disabled>-</option>\n     <option value=\"nativeTextInput\">Text Input</option>\n     <option value=\"nativeColorInput\">Color Input</option>\n     <option value=\"nativeDropDown\">DropDown</option>\n   </optgroup>\n   <option value=\"straightLineView\">straightLineView</option>\n   <option value=\"angledLineView\">angledLineView</option>\n  </select>\n\n  <button name=\"DuplicateButton\" class=\"WAD WAD-stylableContent WAD-DuplicateIcon\" style=\"\n    left:44px; top:108px;\n  \"></button>\n\n  <button name=\"DeleteButton\" class=\"WAD WAD-stylableContent WAD-DeleteIcon\" style=\"\n    left:84px; top:108px;\n  \"></button>\n\n  <button name=\"SnapToGridButton\" class=\"WAD WAD-stylableContent WAD-SnapToGridIcon\" style=\"\n    left:124px; top:108px;\n  \"></button>\n\n\n  <button name=\"ToTopButton\" class=\"WAD WAD-stylableContent WAD-ToTopIcon\" style=\"\n    left:4px; top:148px;\n  \"></button>\n\n  <button name=\"UpButton\" class=\"WAD WAD-stylableContent WAD-UpIcon\" style=\"\n    left:44px; top:148px;\n  \"></button>\n\n  <button name=\"DownButton\" class=\"WAD WAD-stylableContent WAD-DownIcon\" style=\"\n    left:84px; top:148px;\n  \"></button>\n\n  <button name=\"ToBottomButton\" class=\"WAD WAD-stylableContent WAD-ToBottomIcon\" style=\"\n    left:124px; top:148px;\n  \"></button>\n\n\n  <button name=\"ChooseContainerButton\" class=\"WAD WAD-stylableContent WAD-ChooseContainerIcon\" style=\"\n    left:4px; top:188px;\n  \"></button>\n\n  <button name=\"ChooseContentButton\" class=\"WAD WAD-stylableContent WAD-ChooseContentIcon\" style=\"\n    left:44px; top:188px;\n  \"></button>\n\n  <!-- see http://tympanus.net/codrops/2015/09/15/styling-customizing-file-inputs-smart-way/ -->\n  <input name=\"UploadButton\" type='file' id='hiddenFileInput'/>\n  <label for='hiddenFileInput' class='WAD WAD-stylableContent WAD-UploadIcon' style=\"\n    left:84px; top:188px;\n  \"></label>\n\n  <button name=\"DownloadButton\" class=\"WAD WAD-stylableContent WAD-DownloadIcon\" style=\"\n    left:124px; top:188px;\n  \"></button>\n</div>\n\n      ".trim()).hide();
            $(document.body).append(this.Peer);
            this.configureDialog();
            this.Peer.find('[name="CloseButton"]').on('click', function () {
                stopDesigning(); // later also actually closes this dialog
            });
            this.cacheNamedElements();
            this.defineElementBehaviours();
        };
        /**** define element behaviours ****/
        WAD_Toolbox.prototype.defineElementBehaviours = function () {
            this.LayoutModeButton.on('click', function () {
                if (chosenDesignerInfo.inLayoutMode) {
                    Layouter.stopLayouting();
                }
                else {
                    Layouter.startLayouting();
                }
            });
            this.NudgerButton.on('click', function (Event) {
                Nudger.showAround(Event.clientX, Event.clientY);
            });
            this.AppletConfigurationButton.on('click', function (Event) {
                ConfigurationDialog.setMode('Applet');
                ConfigurationDialog.showAround(Event.clientX, Event.clientY);
            });
            this.AppletScriptButton.on('click', function (Event) {
                ScriptEditor.setMode('Applet');
                ScriptEditor.showAround(Event.clientX, Event.clientY);
            });
            this.CardConfigurationButton.on('click', function (Event) {
                ConfigurationDialog.setMode('Card');
                ConfigurationDialog.showAround(Event.clientX, Event.clientY);
            });
            this.CardScriptButton.on('click', function (Event) {
                ScriptEditor.setMode('Card');
                ScriptEditor.showAround(Event.clientX, Event.clientY);
            });
            this.ComponentConfigurationButton.on('click', function (Event) {
                ConfigurationDialog.setMode('Component');
                ConfigurationDialog.showAround(Event.clientX, Event.clientY);
            });
            this.ComponentScriptButton.on('click', function (Event) {
                ScriptEditor.setMode('Component');
                ScriptEditor.showAround(Event.clientX, Event.clientY);
            });
            this.CreateButton.on('input', function () {
                return __awaiter(this, void 0, void 0, function () {
                    var Master;
                    return __generator(this, function (_a) {
                        Master = $(this).val();
                        $(this).val(''); // do not keep any selection
                        if (Master !== '') {
                            doCreateComponent(Master);
                        }
                        return [2 /*return*/];
                    });
                });
            });
            this.DuplicateButton.on('click', function () {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        doDuplicateSelectedComponents();
                        return [2 /*return*/];
                    });
                });
            });
            this.DeleteButton.on('click', function () {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        doRemoveSelectedComponents();
                        return [2 /*return*/];
                    });
                });
            });
            this.SnapToGridButton.on('click', function () {
                chosenDesignerInfo.SnapToGrid = !chosenDesignerInfo.SnapToGrid;
                Ticker.tickPromptly();
            });
            this.ToBottomButton.on('click', function () {
                var selectedComponents = memoized('selectedComponents');
                if (VisualsMayBeShiftedUp('Component', selectedComponents)) { // as seen in list of components
                    doShiftSelectedVisualsToTop('Component');
                }
            });
            this.DownButton.on('click', function () {
                var selectedComponents = memoized('selectedComponents');
                if (VisualsMayBeShiftedUp('Component', selectedComponents)) { // as seen in list of components
                    doShiftSelectedVisualsUp('Component');
                }
            });
            this.UpButton.on('click', function () {
                var selectedComponents = memoized('selectedComponents');
                if (VisualsMayBeShiftedDown('Component', selectedComponents)) { // as seen in list of components
                    doShiftSelectedVisualsDown('Component');
                }
            });
            this.ToTopButton.on('click', function () {
                var selectedComponents = memoized('selectedComponents');
                if (VisualsMayBeShiftedDown('Component', selectedComponents)) { // as seen in list of components
                    doShiftSelectedVisualsToBottom('Component');
                }
            });
            this.ChooseContainerButton.on('click', function () {
                var chosenContainer = memoized('chosenContainer');
                if (ValueIsComponent(chosenContainer)) {
                    chooseContainer(chosenContainer.Container);
                    selectComponent(chosenContainer, 'solely');
                    Ticker.tickNow();
                }
            });
            this.ChooseContentButton.on('click', function () {
                var selectedComponents = memoized('selectedComponents');
                if ((selectedComponents.length === 1) &&
                    ValueIsCompound(selectedComponents[0])) {
                    // @ts-ignore
                    chooseContainer(selectedComponents[0]);
                }
            });
            this.UploadButton.on('change', handleUpload);
            this.DownloadButton.on('click', function () {
                doDownloadApplet();
                Ticker.tickNow();
            });
        };
        /**** onTick ****/
        WAD_Toolbox.prototype.onTick = function () {
            if (chosenDesignerInfo == null) {
                this.close();
                return;
            }
            var chosenContainer = memoized('chosenContainer');
            var selectedComponents = memoized('selectedComponents');
            var ConfigurationMode = ConfigurationDialog.Mode;
            var ScriptMode = ScriptEditor.Mode;
            setActivationOf(this.LayoutModeButton, chosenDesignerInfo.inLayoutMode);
            setActivationOf(this.NudgerButton, Nudger.isVisible);
            setEnablingOf(this.NudgerButton, chosenDesignerInfo.inLayoutMode);
            setEnablingOf(this.AppletConfigurationButton, true);
            setActivationOf(this.AppletConfigurationButton, ConfigurationDialog.isVisible && (ConfigurationMode === 'Applet'));
            setEnablingOf(this.AppletScriptButton, true);
            setActivationOf(this.AppletScriptButton, ScriptEditor.isVisible && (ScriptMode === 'Applet'));
            setEnablingOf(this.CardConfigurationButton, true);
            setActivationOf(this.CardConfigurationButton, ConfigurationDialog.isVisible && (ConfigurationMode === 'Card'));
            setEnablingOf(this.CardScriptButton, true);
            setActivationOf(this.CardScriptButton, ScriptEditor.isVisible && (ScriptMode === 'Card'));
            setEnablingOf(this.ComponentConfigurationButton, selectedComponents.length === 1);
            setActivationOf(this.ComponentConfigurationButton, ConfigurationDialog.isVisible && (ConfigurationMode === 'Component'));
            setEnablingOf(this.ComponentScriptButton, selectedComponents.length === 1);
            setActivationOf(this.ComponentScriptButton, ScriptEditor.isVisible && (ScriptMode === 'Component'));
            var hasSelection = (selectedComponents.length > 0);
            setEnablingOf(this.CreateButton, true);
            setEnablingOf(this.DuplicateButton, hasSelection);
            setEnablingOf(this.DeleteButton, hasSelection);
            setEnablingOf(this.SnapToGridButton, true);
            setActivationOf(this.SnapToGridButton, chosenDesignerInfo.SnapToGrid);
            var mayBeShiftedUp = hasSelection && VisualsMayBeShiftedUp('Component', selectedComponents);
            var mayBeShiftedDown = hasSelection && VisualsMayBeShiftedDown('Component', selectedComponents);
            setEnablingOf(this.ToTopButton, mayBeShiftedDown);
            setEnablingOf(this.UpButton, mayBeShiftedDown);
            setEnablingOf(this.DownButton, mayBeShiftedUp);
            setEnablingOf(this.ToBottomButton, mayBeShiftedUp);
            setEnablingOf(this.ChooseContainerButton, !ValueIsCard(chosenContainer));
            setEnablingOf(this.ChooseContentButton, (selectedComponents.length === 1) && ValueIsCompound(selectedComponents[0]));
            setEnablingOf(this.UploadButton, true);
            setEnablingOf(this.DownloadButton, true);
            setActivationOf(this.DownloadButton, needsDownload);
        };
        return WAD_Toolbox;
    }(WAD_Dialog));
    var Toolbox = new WAD_Toolbox();
    //----------------------------------------------------------------------------//
    //                                   Nudger                                   //
    //----------------------------------------------------------------------------//
    var WAD_Nudger = /** @class */ (function (_super) {
        __extends(WAD_Nudger, _super);
        function WAD_Nudger() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**** build (and configure) ****/
        WAD_Nudger.prototype.build = function () {
            this.Peer = $("\n<div id=\"WAD-Nudger\" class=\"WAD Dialog WAD-Draggable\" style=\"\n  display:none; width:260px; height:144px;\n\">\n  <div name=\"Titlebar\" class=\"WAD WAD-Titlebar WAD-Dragger\">\n    <div name=\"Title\"       class=\"WAD WAD-Title\">WAT Geometry Adjustment</div>\n    <div name=\"CloseButton\" class=\"WAD WAD-Dialog-CloseButton\">\n      <div class=\"WAD-CloseButtonIcon\"></div>\n    </div>\n  </div>\n\n  <button name=\"MoveUpButton\" class=\"WAD WAD-stylableContent WAD-MoveUpIcon\" style=\"\n    position:absolute; left:44px; top:28px;\n  \"></button>\n\n  <button name=\"MoveLeftButton\" class=\"WAD WAD-stylableContent WAD-MoveLeftIcon\" style=\"\n    position:absolute; left:4px; top:68px;\n  \"></button>\n\n  <button name=\"MoveRightButton\" class=\"WAD WAD-stylableContent WAD-MoveRightIcon\" style=\"\n    position:absolute; left:84px; top:68px;\n  \"></button>\n\n  <button name=\"MoveDownButton\" class=\"WAD WAD-stylableContent WAD-MoveDownIcon\" style=\"\n    position:absolute; left:44px; top:108px;\n  \"></button>\n\n\n  <button name=\"DecreaseHeightButton\" class=\"WAD WAD-stylableContent WAD-DecreaseHeightIcon\" style=\"\n    position:absolute; left:184px; top:28px;\n  \"></button>\n\n  <button name=\"DecreaseWidthButton\" class=\"WAD WAD-stylableContent WAD-DecreaseWidthIcon\" style=\"\n    position:absolute; left:144px; top:68px;\n  \"></button>\n\n  <button name=\"IncreaseWidthButton\" class=\"WAD WAD-stylableContent WAD-IncreaseWidthIcon\" style=\"\n    position:absolute; left:224px; top:68px;\n  \"></button>\n\n  <button name=\"IncreaseHeightButton\" class=\"WAD WAD-stylableContent WAD-IncreaseHeightIcon\" style=\"\n    position:absolute; left:184px; top:108px;\n  \"></button>\n</div>\n\n      ".trim()).hide();
            $(document.body).append(this.Peer);
            this.configureDialog();
            this.configureCloseButton();
            this.cacheNamedElements();
            this.defineElementBehaviours();
        };
        /**** define element behaviours ****/
        WAD_Nudger.prototype.defineElementBehaviours = function () {
            this.MoveUpButton.on('click', function (Event) {
                doChangeGeometryOfSelectedComponentsBy(null, Event.shiftKey ? -10 : -1, null, null);
                Ticker.tickNow();
            });
            this.MoveLeftButton.on('click', function (Event) {
                doChangeGeometryOfSelectedComponentsBy(Event.shiftKey ? -10 : -1, null, null, null);
                Ticker.tickNow();
            });
            this.MoveRightButton.on('click', function (Event) {
                var selectedComponents = memoized('selectedComponents');
                doChangeGeometryOfSelectedComponentsBy(Event.shiftKey ? +10 : +1, null, null, null);
                Ticker.tickNow();
            });
            this.MoveDownButton.on('click', function (Event) {
                var selectedComponents = memoized('selectedComponents');
                doChangeGeometryOfSelectedComponentsBy(null, Event.shiftKey ? +10 : +1, null, null);
                Ticker.tickNow();
            });
            this.DecreaseHeightButton.on('click', function (Event) {
                var selectedComponents = memoized('selectedComponents');
                doChangeGeometryOfSelectedComponentsBy(null, null, null, Event.shiftKey ? -10 : -1);
                Ticker.tickNow();
            });
            this.DecreaseWidthButton.on('click', function (Event) {
                var selectedComponents = memoized('selectedComponents');
                doChangeGeometryOfSelectedComponentsBy(null, null, Event.shiftKey ? -10 : -1, null);
                Ticker.tickNow();
            });
            this.IncreaseWidthButton.on('click', function (Event) {
                var selectedComponents = memoized('selectedComponents');
                doChangeGeometryOfSelectedComponentsBy(null, null, Event.shiftKey ? +10 : +1, null);
                Ticker.tickNow();
            });
            this.IncreaseHeightButton.on('click', function (Event) {
                var selectedComponents = memoized('selectedComponents');
                doChangeGeometryOfSelectedComponentsBy(null, null, null, Event.shiftKey ? +10 : +1);
                Ticker.tickNow();
            });
        };
        /**** onTick ****/
        WAD_Nudger.prototype.onTick = function () {
            if ((chosenDesignerInfo == null) ||
                (!chosenDesignerInfo.inLayoutMode)) {
                this.close();
                return;
            }
            var hasSelection = (memoized('selectedComponents').length > 0);
            setEnablingOf(this.MoveUpButton, hasSelection);
            setEnablingOf(this.MoveLeftButton, hasSelection);
            setEnablingOf(this.MoveRightButton, hasSelection);
            setEnablingOf(this.MoveDownButton, hasSelection);
            setEnablingOf(this.IncreaseWidthButton, hasSelection);
            setEnablingOf(this.DecreaseWidthButton, hasSelection);
            setEnablingOf(this.IncreaseHeightButton, hasSelection);
            setEnablingOf(this.DecreaseHeightButton, hasSelection);
        };
        return WAD_Nudger;
    }(WAD_Dialog));
    var Nudger = new WAD_Nudger();
    var WAD_ConfigurationDialog = /** @class */ (function (_super) {
        __extends(WAD_ConfigurationDialog, _super);
        function WAD_ConfigurationDialog() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**** build (and configure) ****/
        WAD_ConfigurationDialog.prototype.build = function () {
            this.Peer = $("\n<div id=\"WAD-ConfigurationDialog\" class=\"WAD Dialog WAD-Draggable\" style=\"\n  display:none; width:300px; height:400px; min-width:120px; min-height:80px;\n\">\n  <div name=\"Titlebar\" class=\"WAD WAD-Titlebar WAD-Dragger\">\n    <div name=\"Title\"       class=\"WAD WAD-Title\">WAT Configuration Dialog</div>\n    <div name=\"CloseButton\" class=\"WAD WAD-Dialog-CloseButton\">\n      <div class=\"WAD-CloseButtonIcon\"></div>\n    </div>\n  </div>\n    <div style=\"\n      display:flex; flex-flow:row nowrap; align-items:center; flex:0 0 auto;\n      padding-left:4px; padding-right:2px; height:32px;\n    \">\n      <div style=\"\n        display:block; position:relative; flex:1 0 auto;\n        width:60px; height:24px; line-height:24px;\n      \"><span name=\"ModeView\">Visual</span> Configuration:</div>\n    </div>\n\n    <div name=\"ConfigurationPane\" style=\"\n      display:block; position:relative; flex:1 1 auto;\n    \">\n      <div class=\"WAD-vertically-scrollable\" style=\"\n        display:block; position:absolute;\n        left:0px; top:0px; right:0px; bottom:0px;\n        padding-top:2px;\n      \">\n        <div name=\"BasicsGroup\" class=\"WAD-Group\" collapsed=\"collapsed\">\n          <div class=\"WAD-GroupHeader\">\n            <div class=\"WAD-GroupHeaderState WAD-CollapsedIcon\"></div>\n            <div class=\"WAD-GroupHeaderTitle\">Basics</div>\n          </div>\n\n          <div class=\"WAD-GroupLine\">\n            <div class=\"WAD-StandardGroupLabel\">Master</div>\n            <div class=\"WAD-StandardGroupTextlineInput\">\n              <input name=\"MasterView\" type=\"text\" readonly class=\"WAD-stylableContent WAD-styledTextlineInput\">\n            </div>\n          </div>\n\n          <div class=\"WAD-GroupLine\">\n            <div class=\"WAD-StandardGroupLabel\">Name</div>\n            <div class=\"WAD-StandardGroupTextlineInput\">\n              <input name=\"NameInput\" type=\"text\" class=\"WAD-stylableContent WAD-styledTextlineInput\">\n            </div>\n          </div>\n\n          <div class=\"WAD-GroupLine\">\n            <div class=\"WAD-StandardGroupLabel\">Path</div>\n            <div class=\"WAD-StandardGroupTextlineInput\">\n              <input name=\"PathView\" type=\"text\" readonly class=\"WAD-stylableContent WAD-styledTextlineInput\">\n            </div>\n          </div>\n\n          <div class=\"WAD-GroupLine\">\n            <div class=\"WAD-StandardGroupLabel\">Classes</div>\n            <div class=\"WAD-StandardGroupTextlineInput\">\n              <input name=\"ClassesInput\" type=\"text\" class=\"WAD-stylableContent WAD-styledTextlineInput\">\n            </div>\n          </div>\n\n          <div class=\"WAD-GroupLine\">\n            <div class=\"WAD-StandardGroupLabel\">enabled</div>\n            <label class=\"WAD-StandardGroupCheckbox\" style=\"flex:0 0 auto;\">\n              <input name=\"isEnabledInput\" type=\"checkbox\">\n              <div class=\"WAD-styledCheckmark\"></div>\n            </label>\n          </div>\n\n          <div class=\"WAD-GroupLine\">\n            <div class=\"WAD-StandardGroupLabel\">reactive Variable</div>\n            <div class=\"WAD-StandardGroupTextlineInput\">\n              <input name=\"reactiveVariableInput\" type=\"text\" class=\"WAD-stylableContent WAD-styledTextlineInput\">\n            </div>\n          </div>\n\n          <div class=\"WAD-GroupLine\">\n            <div class=\"WAD-StandardGroupLabel\">Tab Index</div>\n            <div class=\"WAD-StandardGroupNumberInput\">\n              <input name=\"TabIndexInput\" type=\"number\" min=\"-1\" class=\"WAD-stylableContent WAD-styledNumberInput\">\n            </div>\n          </div>\n\n          <div class=\"WAD-GroupLine\">\n            <div class=\"WAD-StandardGroupLabel\">Mouse and Touch sensitive</div>\n            <label class=\"WAD-StandardGroupCheckbox\" style=\"flex:0 0 auto;\">\n              <input name=\"isPointerSensitiveInput\" type=\"checkbox\">\n              <div class=\"WAD-styledCheckmark\"></div>\n            </label>\n          </div>\n        </div>\n        <div name=\"GeometryGroup\" class=\"WAD-Group\" collapsed=\"collapsed\">\n          <div class=\"WAD-GroupHeader\">\n            <div class=\"WAD-GroupHeaderState WAD-CollapsedIcon\"></div>\n            <div class=\"WAD-GroupHeaderTitle\">Layout and Visibility</div>\n          </div>\n\n          <div class=\"WAD-GroupLine\">\n            <div class=\"WAD-StandardGroupLabel\">Position (x,y)</div>\n            <div class=\"WAD-innerGroupNumberInput\">\n              <input name=\"XInput\" type=\"number\" class=\"WAD-stylableContent WAD-styledNumberInput\">\n            </div>\n            <div class=\"WAD-outerGroupNumberInput\">\n              <input name=\"YInput\" type=\"number\" class=\"WAD-stylableContent WAD-styledNumberInput\">\n            </div>\n          </div>\n\n          <div class=\"WAD-GroupLine\">\n            <div class=\"WAD-StandardGroupLabel\">Size (w,h)</div>\n            <div class=\"WAD-innerGroupNumberInput\">\n              <input name=\"WidthInput\" type=\"number\" min=\"0\" class=\"WAD-stylableContent WAD-styledNumberInput\">\n            </div>\n            <div class=\"WAD-outerGroupNumberInput\">\n              <input name=\"HeightInput\" type=\"number\" min=\"0\" class=\"WAD-stylableContent WAD-styledNumberInput\">\n            </div>\n          </div>\n\n          <div class=\"WAD-GroupLine\">\n            <div class=\"WAD-StandardGroupLabel\">visible</div>\n            <label class=\"WAD-StandardGroupCheckbox\" style=\"flex:0 0 auto;\">\n              <input name=\"isVisibleInput\" type=\"checkbox\">\n              <div class=\"WAD-styledCheckmark\"></div>\n            </label>\n          </div>\n\n          <div class=\"WAD-GroupLine\">\n            <div class=\"WAD-StandardGroupLabel\">Opacity [%]</div>\n            <div class=\"WAD-StandardGroupNumberInput\">\n              <input name=\"OpacityInput\" type=\"number\" min=\"0\" max=\"100\" class=\"WAD-stylableContent WAD-styledNumberInput\">\n            </div>\n          </div>\n\n          <div class=\"WAD-GroupLine\">\n            <div class=\"WAD-StandardGroupLabel\">Overflows (h,v)</div>\n            <div class=\"WAD-innerGroupDropDown\">\n              <select name=\"Overflow0Input\" class=\"WAD-stylableContent WAD-styledDropDown\">\n                <option value=\"auto\">auto</option>\n                <option value=\"visible\">visible</option>\n                <option value=\"scroll\">scroll</option>\n                <option value=\"hidden\">hidden</option>\n              </select>\n              <div class=\"WAD-Pointerless WAD-DropDownIcon\"></div>\n            </div>\n            <div class=\"WAD-outerGroupDropDown\">\n              <select name=\"Overflow1Input\" class=\"WAD-stylableContent WAD-styledDropDown\">\n                <option value=\"auto\">auto</option>\n                <option value=\"visible\">visible</option>\n                <option value=\"scroll\">scroll</option>\n                <option value=\"hidden\">hidden</option>\n              </select>\n              <div class=\"WAD-Pointerless WAD-DropDownIcon\"></div>\n            </div>\n          </div>\n\n          <div class=\"WAD-GroupLine\">\n            <div class=\"WAD-StandardGroupLabel\">Anchors and Offsets</div>\n          </div>\n\n          <div class=\"WAD-GroupLine\">\n            <div class=\"WAD-StandardGroupLabel\">- horizontal</div>\n            <div class=\"WAD-StandardGroupDropDown\">\n              <select name=\"Anchors0Input\" class=\"WAD-stylableContent WAD-styledDropDown\">\n                <option value=\"left-width\" >left-width</option>\n                <option value=\"left-right\" >left-right</option>\n                <option value=\"width-right\">width-right</option>\n              </select>\n              <div class=\"WAD-Pointerless WAD-DropDownIcon\"></div>\n            </div>\n          </div>\n\n          <div class=\"WAD-GroupLine\">\n            <div class=\"WAD-innerGroupNumberInput\">\n              <input name=\"Offset0Input\" type=\"number\" class=\"WAD-stylableContent WAD-styledNumberInput\">\n            </div>\n            <div class=\"WAD-outerGroupNumberInput\">\n              <input name=\"Offset1Input\" type=\"number\" class=\"WAD-stylableContent WAD-styledNumberInput\">\n            </div>\n          </div>\n\n          <div class=\"WAD-GroupLine\">\n            <div class=\"WAD-StandardGroupLabel\">- vertical</div>\n            <div class=\"WAD-StandardGroupDropDown\">\n              <select name=\"Anchors1Input\" class=\"WAD-stylableContent WAD-styledDropDown\">\n                <option value=\"top-height\"   >top-height</option>\n                <option value=\"top-bottom\"   >top-bottom</option>\n                <option value=\"height-bottom\">height-bottom</option>\n              </select>\n              <div class=\"WAD-Pointerless WAD-DropDownIcon\"></div>\n            </div>\n          </div>\n\n          <div class=\"WAD-GroupLine\">\n            <div class=\"WAD-innerGroupNumberInput\">\n              <input name=\"Offset2Input\" type=\"number\" class=\"WAD-stylableContent WAD-styledNumberInput\">\n            </div>\n            <div class=\"WAD-outerGroupNumberInput\">\n              <input name=\"Offset3Input\" type=\"number\" class=\"WAD-stylableContent WAD-styledNumberInput\">\n            </div>\n          </div>\n\n          <div class=\"WAD-GroupLine\">\n            <div class=\"WAD-StandardGroupLabel\">min. Size</div>\n            <div class=\"WAD-innerGroupNumberInput\">\n              <input name=\"minWidthInput\" type=\"number\" min=\"0\" class=\"WAD-stylableContent WAD-styledNumberInput\">\n            </div>\n            <div class=\"WAD-outerGroupNumberInput\">\n              <input name=\"minHeightInput\" type=\"number\" min=\"0\" class=\"WAD-stylableContent WAD-styledNumberInput\">\n            </div>\n          </div>\n\n          <div class=\"WAD-GroupLine\">\n            <div class=\"WAD-StandardGroupLabel\">max. Size</div>\n            <div class=\"WAD-innerGroupNumberInput\">\n              <input name=\"maxWidthInput\" type=\"number\" min=\"0\" class=\"WAD-stylableContent WAD-styledNumberInput\">\n            </div>\n            <div class=\"WAD-outerGroupNumberInput\">\n              <input name=\"maxHeightInput\" type=\"number\" min=\"0\" class=\"WAD-stylableContent WAD-styledNumberInput\">\n            </div>\n          </div>\n\n          <div class=\"WAD-GroupLine\">\n            <div class=\"WAD-StandardGroupLabel\">Layer</div>\n            <div class=\"WAD-StandardGroupNumberInput\">\n              <input name=\"LayerInput\" type=\"number\" min=\"0\" class=\"WAD-stylableContent WAD-styledNumberInput\" readonly>\n            </div>\n          </div>\n\n          <div class=\"WAD-GroupLine\">\n            <button name=\"LayerToTopButton\" class=\"WAD-Visual WAD-PushButton WAD-farFarInnerGroupPushButton\">\n              <div class=\"WAD-LayerToTopIcon\"></div>\n            </button>\n            <button name=\"LayerUpButton\" class=\"WAD-Visual WAD-PushButton WAD-farInnerGroupPushButton\">\n              <div class=\"WAD-LayerUpIcon\"></div>\n            </button>\n            <button name=\"LayerDownButton\" class=\"WAD-Visual WAD-PushButton WAD-innerGroupPushButton\">\n              <div class=\"WAD-LayerDownIcon\"></div>\n            </button>\n            <button name=\"LayerToBottomButton\" class=\"WAD-Visual WAD-PushButton WAD-outerGroupPushButton\">\n              <div class=\"WAD-LayerToBottomIcon\"></div>\n            </button>\n          </div>\n        </div>\n        <div name=\"BorderGroup\" class=\"WAD-Group\" collapsed=\"collapsed\">\n          <div class=\"WAD-GroupHeader\">\n            <div class=\"WAD-GroupHeaderState WAD-CollapsedIcon\"></div>\n            <div class=\"WAD-GroupHeaderTitle\">Border</div>\n          </div>\n\n          <div class=\"WAD-GroupLine\">\n            <div class=\"WAD-StandardGroupLabel\">Border Width, Style and Color</div>\n          </div>\n\n          <div class=\"WAD-GroupLine\">\n            <div class=\"WAD-StandardGroupLabel\">- left</div>\n            <div class=\"WAD-farInnerGroupNumberInput\">\n              <input name=\"BorderLeftWidthInput\" type=\"number\" min=\"0\" class=\"WAD-stylableContent WAD-styledNumberInput\">\n            </div>\n            <div class=\"WAD-middleGroupDropDown\">\n              <select name=\"BorderLeftStyleInput\" class=\"WAD-stylableContent WAD-styledDropDown\">\n                <option value=\"none\">none</option>\n                <option value=\"dotted\">dotted</option>\n                <option value=\"dashed\">dashed</option>\n                <option value=\"solid\">solid</option>\n                <option value=\"double\">double</option>\n                <option value=\"groove\">groove</option>\n                <option value=\"ridge\">ridge</option>\n                <option value=\"inset\">inset</option>\n                <option value=\"outset\">outset</option>\n              </select>\n              <div class=\"WAD-Pointerless WAD-DropDownIcon\"></div>\n            </div>\n            <div class=\"WAD-StandardGroupColorInput\">\n              <input name=\"BorderLeftColorInput\" type=\"color\" class=\"WAD-stylableContent WAD-styledColorInput\">\n              <div name=\"ColorIndicator\" class=\"WAD-Pointerless WAD-ColorIndicator\"></div>\n            </div>\n          </div>\n\n          <div class=\"WAD-GroupLine\">\n            <div class=\"WAD-StandardGroupLabel\">- top</div>\n            <div class=\"WAD-farInnerGroupNumberInput\">\n              <input name=\"BorderTopWidthInput\" type=\"number\" min=\"0\" class=\"WAD-stylableContent WAD-styledNumberInput\">\n            </div>\n            <div class=\"WAD-middleGroupDropDown\">\n              <select name=\"BorderTopStyleInput\" class=\"WAD-stylableContent WAD-styledDropDown\">\n                <option value=\"none\">none</option>\n                <option value=\"dotted\">dotted</option>\n                <option value=\"dashed\">dashed</option>\n                <option value=\"solid\">solid</option>\n                <option value=\"double\">double</option>\n                <option value=\"groove\">groove</option>\n                <option value=\"ridge\">ridge</option>\n                <option value=\"inset\">inset</option>\n                <option value=\"outset\">outset</option>\n              </select>\n              <div class=\"WAD-Pointerless WAD-DropDownIcon\"></div>\n            </div>\n            <div class=\"WAD-StandardGroupColorInput\">\n              <input name=\"BorderTopColorInput\" type=\"color\" class=\"WAD-stylableContent WAD-styledColorInput\">\n              <div name=\"ColorIndicator\" class=\"WAD-Pointerless WAD-ColorIndicator\"></div>\n            </div>\n          </div>\n\n          <div class=\"WAD-GroupLine\">\n            <div class=\"WAD-StandardGroupLabel\">- right</div>\n            <div class=\"WAD-farInnerGroupNumberInput\">\n              <input name=\"BorderRightWidthInput\" type=\"number\" min=\"0\" class=\"WAD-stylableContent WAD-styledNumberInput\">\n            </div>\n            <div class=\"WAD-middleGroupDropDown\">\n              <select name=\"BorderRightStyleInput\" class=\"WAD-stylableContent WAD-styledDropDown\">\n                <option value=\"none\">none</option>\n                <option value=\"dotted\">dotted</option>\n                <option value=\"dashed\">dashed</option>\n                <option value=\"solid\">solid</option>\n                <option value=\"double\">double</option>\n                <option value=\"groove\">groove</option>\n                <option value=\"ridge\">ridge</option>\n                <option value=\"inset\">inset</option>\n                <option value=\"outset\">outset</option>\n              </select>\n              <div class=\"WAD-Pointerless WAD-DropDownIcon\"></div>\n            </div>\n            <div class=\"WAD-StandardGroupColorInput\">\n              <input name=\"BorderRightColorInput\" type=\"color\" class=\"WAD-stylableContent WAD-styledColorInput\">\n              <div name=\"ColorIndicator\" class=\"WAD-Pointerless WAD-ColorIndicator\"></div>\n            </div>\n          </div>\n\n          <div class=\"WAD-GroupLine\">\n            <div class=\"WAD-StandardGroupLabel\">- bottom</div>\n            <div class=\"WAD-farInnerGroupNumberInput\">\n              <input name=\"BorderBottomWidthInput\" type=\"number\" min=\"0\" class=\"WAD-stylableContent WAD-styledNumberInput\">\n            </div>\n            <div class=\"WAD-middleGroupDropDown\">\n              <select name=\"BorderBottomStyleInput\" class=\"WAD-stylableContent WAD-styledDropDown\">\n                <option value=\"none\">none</option>\n                <option value=\"dotted\">dotted</option>\n                <option value=\"dashed\">dashed</option>\n                <option value=\"solid\">solid</option>\n                <option value=\"double\">double</option>\n                <option value=\"groove\">groove</option>\n                <option value=\"ridge\">ridge</option>\n                <option value=\"inset\">inset</option>\n                <option value=\"outset\">outset</option>\n              </select>\n              <div class=\"WAD-Pointerless WAD-DropDownIcon\"></div>\n            </div>\n            <div class=\"WAD-StandardGroupColorInput\">\n              <input name=\"BorderBottomColorInput\" type=\"color\" class=\"WAD-stylableContent WAD-styledColorInput\">\n              <div name=\"ColorIndicator\" class=\"WAD-Pointerless WAD-ColorIndicator\"></div>\n            </div>\n          </div>\n\n          <div class=\"WAD-GroupLine\">\n            <div class=\"WAD-StandardGroupLabel\">Corner Radii</div>\n          </div>\n\n          <div class=\"WAD-GroupLine\">\n            <div class=\"WAD-StandardGroupLabel\">- tl, tr</div>\n            <div class=\"WAD-innerGroupNumberInput\">\n              <input name=\"BorderRadiusTLInput\" type=\"number\" min=\"0\" class=\"WAD-stylableContent WAD-styledNumberInput\">\n            </div>\n            <div class=\"WAD-outerGroupNumberInput\">\n              <input name=\"BorderRadiusTRInput\" type=\"number\" min=\"0\" class=\"WAD-stylableContent WAD-styledNumberInput\">\n            </div>\n          </div>\n\n          <div class=\"WAD-GroupLine\">\n            <div class=\"WAD-StandardGroupLabel\">- bl, br</div>\n            <div class=\"WAD-innerGroupNumberInput\">\n              <input name=\"BorderRadiusBLInput\" type=\"number\" min=\"0\" class=\"WAD-stylableContent WAD-styledNumberInput\">\n            </div>\n            <div class=\"WAD-outerGroupNumberInput\">\n              <input name=\"BorderRadiusBRInput\" type=\"number\" min=\"0\" class=\"WAD-stylableContent WAD-styledNumberInput\">\n            </div>\n          </div>\n        </div>\n        <div name=\"BackgroundGroup\" class=\"WAD-Group\" collapsed=\"collapsed\">\n          <div class=\"WAD-GroupHeader\">\n            <div class=\"WAD-GroupHeaderState WAD-CollapsedIcon\"></div>\n            <div class=\"WAD-GroupHeaderTitle\">Background</div>\n          </div>\n\n          <div class=\"WAD-GroupLine\">\n            <div class=\"WAD-StandardGroupLabel\">Background</div>\n            <label class=\"WAD-StandardGroupCheckbox\" style=\"flex:0 0 auto;\">\n              <input name=\"BackgroundInput\" type=\"checkbox\">\n              <div class=\"WAD-styledCheckmark\"></div>\n            </label>\n          </div>\n\n          <div class=\"WAD-GroupLine\">\n            <div class=\"WAD-StandardGroupLabel\">Color</div>\n            <div class=\"WAD-StandardGroupColorInput\">\n              <input name=\"BackgroundColorInput\" type=\"color\" class=\"WAD-stylableContent WAD-styledColorInput\">\n              <div name=\"ColorIndicator\" class=\"WAD-Pointerless WAD-ColorIndicator\"></div>\n            </div>\n          </div>\n\n          <div class=\"WAD-GroupLine\">\n            <div class=\"WAD-StandardGroupLabel\">Texture</div>\n            <label class=\"WAD-StandardGroupCheckbox\" style=\"flex:0 0 auto;\">\n              <input name=\"BackgroundTextureInput\" type=\"checkbox\">\n              <div class=\"WAD-styledCheckmark\"></div>\n            </label>\n          </div>\n\n          <div class=\"WAD-GroupLine\">\n            <div class=\"WAD-StandardGroupLabel\">Image</div>\n            <div class=\"WAD-StandardGroupTextlineInput\">\n              <input name=\"BackgroundImageURLInput\" type=\"text\" class=\"WAD-stylableContent WAD-styledURLInput\">\n            </div>\n          </div>\n\n          <div class=\"WAD-GroupLine\">\n            <div class=\"WAD-StandardGroupLabel\">Mode</div>\n            <div class=\"WAD-StandardGroupDropDown\">\n              <select name=\"BackgroundModeInput\" class=\"WAD-stylableContent WAD-styledDropDown\">\n                <option value=\"normal\">normal</option>\n                <option value=\"contain\">contain</option>\n                <option value=\"cover\">cover</option>\n                <option value=\"fill\">fill</option>\n                <option value=\"tile\">tile</option>\n              </select>\n              <div class=\"WAD-Pointerless WAD-DropDownIcon\"></div>\n            </div>\n          </div>\n\n          <div class=\"WAD-GroupLine\">\n            <div class=\"WAD-StandardGroupLabel\">Offsets</div>\n            <div class=\"WAD-innerGroupNumberInput\">\n              <input name=\"BackgroundOffsetXInput\" type=\"number\" class=\"WAD-stylableContent WAD-styledNumberInput\">\n            </div>\n            <div class=\"WAD-outerGroupNumberInput\">\n              <input name=\"BackgroundOffsetYInput\" type=\"number\" class=\"WAD-stylableContent WAD-styledNumberInput\">\n            </div>\n          </div>\n        </div>\n        <div name=\"TypographyGroup\" class=\"WAD-Group\" collapsed=\"collapsed\">\n          <div class=\"WAD-GroupHeader\">\n            <div class=\"WAD-GroupHeaderState WAD-CollapsedIcon\"></div>\n            <div class=\"WAD-GroupHeaderTitle\">Typography</div>\n          </div>\n\n          <div class=\"WAD-GroupLine\">\n            <div class=\"WAD-StandardGroupLabel\">Font Family</div>\n            <div class=\"WAD-StandardGroupTextlineInput\">\n              <input name=\"FontFamilyInput\" type=\"text\" class=\"WAD-stylableContent WAD-styledTextlineInput\">\n            </div>\n          </div>\n\n          <div class=\"WAD-GroupLine\">\n            <div class=\"WAD-StandardGroupLabel\">Size</div>\n            <div class=\"WAD-StandardGroupNumberInput\">\n              <input name=\"FontSizeInput\" type=\"number\" min=\"0\" class=\"WAD-stylableContent WAD-styledNumberInput\">\n            </div>\n          </div>\n\n          <div class=\"WAD-GroupLine\">\n            <div class=\"WAD-StandardGroupLabel\">Weight</div>\n            <div class=\"WAD-StandardGroupDropDown\">\n              <select name=\"FontWeightInput\" class=\"WAD-stylableContent WAD-styledDropDown\">\n                <option value=\"thin\">thin</option>\n                <option value=\"extra-light\">extra-light</option>\n                <option value=\"light\">light</option>\n                <option value=\"normal\">normal</option>\n                <option value=\"medium\">medium</option>\n                <option value=\"semi-bold\">semi-bold</option>\n                <option value=\"bold\">bold</option>\n                <option value=\"extra-bold\">extra-bold</option>\n                <option value=\"heavy\">heavy</option>\n              </select>\n              <div class=\"WAD-Pointerless WAD-DropDownIcon\"></div>\n            </div>\n          </div>\n\n          <div class=\"WAD-GroupLine\">\n            <div class=\"WAD-StandardGroupLabel\">Italic</div>\n            <label class=\"WAD-StandardGroupCheckbox\" style=\"flex:0 0 auto;\">\n              <input name=\"FontItalicInput\" type=\"checkbox\">\n              <div class=\"WAD-styledCheckmark\"></div>\n            </label>\n          </div>\n\n          <div class=\"WAD-GroupLine\">\n            <div class=\"WAD-StandardGroupLabel\">Color</div>\n            <div class=\"WAD-StandardGroupColorInput\">\n              <input name=\"ForegroundColorInput\" type=\"color\" class=\"WAD-stylableContent WAD-styledColorInput\">\n              <div name=\"ColorIndicator\" class=\"WAD-Pointerless WAD-ColorIndicator\"></div>\n            </div>\n          </div>\n\n          <div class=\"WAD-GroupLine\">\n            <div class=\"WAD-StandardGroupLabel\">Decoration</div>\n            <label class=\"WAD-StandardGroupCheckbox\" style=\"flex:0 0 auto;\">\n              <input name=\"TextDecorationInput\" type=\"checkbox\">\n              <div class=\"WAD-styledCheckmark\"></div>\n            </label>\n          </div>\n\n          <div class=\"WAD-GroupLine\">\n            <div class=\"WAD-StandardGroupLabel\">- Line</div>\n            <div class=\"WAD-StandardGroupDropDown\">\n              <select name=\"TextDecorationLineInput\" class=\"WAD-stylableContent WAD-styledDropDown\">\n                <option value=\"underline\">underlined</option>\n                <option value=\"overline\">overlined</option>\n                <option value=\"line-through\">lined-through</option>\n              </select>\n              <div class=\"WAD-Pointerless WAD-DropDownIcon\"></div>\n            </div>\n          </div>\n\n          <div class=\"WAD-GroupLine\">\n            <div class=\"WAD-StandardGroupLabel\">- Style</div>\n            <div class=\"WAD-StandardGroupDropDown\">\n              <select name=\"TextDecorationStyleInput\" class=\"WAD-stylableContent WAD-styledDropDown\">\n                <option value=\"solid\">solid</option>\n                <option value=\"double\">double</option>\n                <option value=\"dotted\">dotted</option>\n                <option value=\"dashed\">dashed</option>\n                <option value=\"wavy\">wavy</option>\n              </select>\n              <div class=\"WAD-Pointerless WAD-DropDownIcon\"></div>\n            </div>\n          </div>\n\n          <div class=\"WAD-GroupLine\">\n            <div class=\"WAD-StandardGroupLabel\">- Color</div>\n            <div class=\"WAD-StandardGroupColorInput\">\n              <input name=\"TextDecorationColorInput\" type=\"color\" class=\"WAD-stylableContent WAD-styledColorInput\">\n              <div name=\"ColorIndicator\" class=\"WAD-Pointerless WAD-ColorIndicator\"></div>\n            </div>\n          </div>\n\n          <div class=\"WAD-GroupLine\">\n            <div class=\"WAD-StandardGroupLabel\">Text Shadow</div>\n            <label class=\"WAD-StandardGroupCheckbox\" style=\"flex:0 0 auto;\">\n              <input name=\"TextShadowInput\" type=\"checkbox\">\n              <div class=\"WAD-styledCheckmark\"></div>\n            </label>\n          </div>\n\n          <div class=\"WAD-GroupLine\">\n            <div class=\"WAD-StandardGroupLabel\">- Color</div>\n            <div class=\"WAD-StandardGroupColorInput\">\n              <input name=\"TextShadowColorInput\" type=\"color\" class=\"WAD-stylableContent WAD-styledColorInput\">\n              <div name=\"ColorIndicator\" class=\"WAD-Pointerless WAD-ColorIndicator\"></div>\n            </div>\n          </div>\n\n          <div class=\"WAD-GroupLine\">\n            <div class=\"WAD-StandardGroupLabel\">- Offsets</div>\n            <div class=\"WAD-innerGroupNumberInput\">\n              <input name=\"TextShadowOffsetXInput\" type=\"number\" class=\"WAD-stylableContent WAD-styledNumberInput\">\n            </div>\n            <div class=\"WAD-outerGroupNumberInput\">\n              <input name=\"TextShadowOffsetYInput\" type=\"number\" class=\"WAD-stylableContent WAD-styledNumberInput\">\n            </div>\n          </div>\n\n          <div class=\"WAD-GroupLine\">\n            <div class=\"WAD-StandardGroupLabel\">- Blur Radius</div>\n            <div class=\"WAD-StandardGroupNumberInput\">\n              <input name=\"TextShadowBlurRadiusInput\" type=\"number\" min=\"0\" class=\"WAD-stylableContent WAD-styledNumberInput\">\n            </div>\n          </div>\n\n          <div class=\"WAD-GroupLine\">\n            <div class=\"WAD-StandardGroupLabel\">Line Height</div>\n            <div class=\"WAD-StandardGroupNumberInput\">\n              <input name=\"LineHeightInput\" type=\"number\" min=\"0\" class=\"WAD-stylableContent WAD-styledNumberInput\">\n            </div>\n          </div>\n\n          <div class=\"WAD-GroupLine\">\n            <div class=\"WAD-StandardGroupLabel\">Alignment</div>\n            <div class=\"WAD-StandardGroupDropDown\">\n              <select name=\"TextAlignmentInput\" class=\"WAD-stylableContent WAD-styledDropDown\">\n                <option value=\"left\">left-aligned</option>\n                <option value=\"center\">centered</option>\n                <option value=\"right\">right-aligned</option>\n                <option value=\"justify\">justified</option>\n              </select>\n              <div class=\"WAD-Pointerless WAD-DropDownIcon\"></div>\n            </div>\n          </div>\n        </div>\n        <div name=\"ShadowGroup\" class=\"WAD-Group\" collapsed=\"collapsed\">\n          <div class=\"WAD-GroupHeader\">\n            <div class=\"WAD-GroupHeaderState WAD-CollapsedIcon\"></div>\n            <div class=\"WAD-GroupHeaderTitle\">Shadow</div>\n          </div>\n\n          <div class=\"WAD-GroupLine\">\n            <div class=\"WAD-StandardGroupLabel\">Shadow</div>\n            <label class=\"WAD-StandardGroupCheckbox\" style=\"flex:0 0 auto;\">\n              <input name=\"ShadowInput\" type=\"checkbox\">\n              <div class=\"WAD-styledCheckmark\"></div>\n            </label>\n          </div>\n\n          <div class=\"WAD-GroupLine\">\n            <div class=\"WAD-StandardGroupLabel\">Direction</div>\n            <div class=\"WAD-StandardGroupDropDown\">\n              <select name=\"ShadowDirectionInput\" class=\"WAD-stylableContent WAD-styledDropDown\">\n                <option value=\"inwards\">inwards</option>\n                <option value=\"outwards\">outwards</option>\n              </select>\n              <div class=\"WAD-Pointerless WAD-DropDownIcon\"></div>\n            </div>\n          </div>\n\n          <div class=\"WAD-GroupLine\">\n            <div class=\"WAD-StandardGroupLabel\">Color</div>\n            <div class=\"WAD-StandardGroupColorInput\">\n              <input name=\"ShadowColorInput\" type=\"color\" class=\"WAD-stylableContent WAD-styledColorInput\">\n              <div name=\"ColorIndicator\" class=\"WAD-Pointerless WAD-ColorIndicator\"></div>\n            </div>\n          </div>\n\n          <div class=\"WAD-GroupLine\">\n            <div class=\"WAD-StandardGroupLabel\">Offsets</div>\n            <div class=\"WAD-innerGroupNumberInput\">\n              <input name=\"ShadowOffsetXInput\" type=\"number\" class=\"WAD-stylableContent WAD-styledNumberInput\">\n            </div>\n            <div class=\"WAD-outerGroupNumberInput\">\n              <input name=\"ShadowOffsetYInput\" type=\"number\" class=\"WAD-stylableContent WAD-styledNumberInput\">\n            </div>\n          </div>\n\n          <div class=\"WAD-GroupLine\">\n            <div class=\"WAD-StandardGroupLabel\">Blur Radius</div>\n            <div class=\"WAD-StandardGroupNumberInput\">\n              <input name=\"ShadowBlurRadiusInput\" type=\"number\" min=\"0\" class=\"WAD-stylableContent WAD-styledNumberInput\">\n            </div>\n          </div>\n\n          <div class=\"WAD-GroupLine\">\n            <div class=\"WAD-StandardGroupLabel\">Spread Radius</div>\n            <div class=\"WAD-StandardGroupNumberInput\">\n              <input name=\"ShadowSpreadRadiusInput\" type=\"number\" min=\"0\" class=\"WAD-stylableContent WAD-styledNumberInput\">\n            </div>\n          </div>\n        </div>\n        <div name=\"CursorGroup\" class=\"WAD-Group\" collapsed=\"collapsed\">\n          <div class=\"WAD-GroupHeader\">\n            <div class=\"WAD-GroupHeaderState WAD-CollapsedIcon\"></div>\n            <div class=\"WAD-GroupHeaderTitle\">Cursor</div>\n          </div>\n\n          <div class=\"WAD-GroupLine\">\n            <div class=\"WAD-StandardGroupLabel\">built-in</div>\n            <div class=\"WAD-StandardGroupDropDown\">\n              <select name=\"CursorTypeInput\" class=\"WAD-stylableContent WAD-styledDropDown\">\n                <option value=\"alias\">alias</option>\n                <option value=\"all-scroll\">all-scroll</option>\n                <option value=\"auto\">auto</option>\n                <option value=\"cell\">cell</option>\n                <option value=\"context-menu\">context-menu</option>\n                <option value=\"col-resize\">col-resize</option>\n                <option value=\"copy\">copy</option>\n                <option value=\"crosshair\">crosshair</option>\n                <option value=\"default\">default</option>\n                <option value=\"e-resize\">e-resize</option>\n                <option value=\"ew-resize\">ew-resize</option>\n                <option value=\"grab\">grab</option>\n                <option value=\"grabbing\">grabbing</option>\n                <option value=\"help\">help</option>\n                <option value=\"move\">move</option>\n                <option value=\"n-resize\">n-resize</option>\n                <option value=\"ne-resize\">ne-resize</option>\n                <option value=\"nesw-resize\">nesw-resize</option>\n                <option value=\"ns-resize\">ns-resize</option>\n                <option value=\"nw-resize\">nw-resize</option>\n                <option value=\"nwse-resize\">nwse-resize</option>\n                <option value=\"no-drop\">no-drop</option>\n                <option value=\"none\">none</option>\n                <option value=\"not-allowed\">not-allowed</option>\n                <option value=\"pointer\">pointer</option>\n                <option value=\"progress\">progress</option>\n                <option value=\"row-resize\">row-resize</option>\n                <option value=\"s-resize\">s-resize</option>\n                <option value=\"se-resize\">se-resize</option>\n                <option value=\"sw-resize\">sw-resize</option>\n                <option value=\"text\">text</option>\n                <option value=\"vertical-text\">vertical-text</option>\n                <option value=\"w-resize\">w-resize</option>\n                <option value=\"wait\">wait</option>\n                <option value=\"zoom-in\">zoom-in</option>\n                <option value=\"zoom-out\">zoom-out</option>\n              </select>\n              <div class=\"WAD-Pointerless WAD-DropDownIcon\"></div>\n            </div>\n          </div>\n\n          <div class=\"WAD-GroupLine\">\n            <div class=\"WAD-StandardGroupLabel\">custom Cursor</div>\n            <label class=\"WAD-StandardGroupCheckbox\" style=\"flex:0 0 auto;\">\n              <input name=\"CursorInput\" type=\"checkbox\">\n              <div class=\"WAD-styledCheckmark\"></div>\n            </label>\n          </div>\n\n          <div class=\"WAD-GroupLine\">\n            <div class=\"WAD-StandardGroupLabel\">- Image</div>\n            <div class=\"WAD-StandardGroupTextlineInput\">\n              <input name=\"CursorImageURLInput\" type=\"text\" class=\"WAD-stylableContent WAD-styledURLInput\">\n            </div>\n          </div>\n\n          <div class=\"WAD-GroupLine\">\n            <div class=\"WAD-StandardGroupLabel\">- Offsets</div>\n            <div class=\"WAD-innerGroupNumberInput\">\n              <input name=\"CursorOffsetXInput\" type=\"number\" min=\"0\" class=\"WAD-stylableContent WAD-styledNumberInput\">\n            </div>\n            <div class=\"WAD-outerGroupNumberInput\">\n              <input name=\"CursorOffsetYInput\" type=\"number\" min=\"0\" class=\"WAD-stylableContent WAD-styledNumberInput\">\n            </div>\n          </div>\n        </div>\n        <div name=\"customGroup\" class=\"WAD-Group\" collapsed=\"collapsed\">\n          <div class=\"WAD-GroupHeader\">\n            <div class=\"WAD-GroupHeaderState WAD-CollapsedIcon\"></div>\n            <div class=\"WAD-GroupHeaderTitle\">custom Properties</div>\n          </div>\n\n          <div name=\"customGroupPlaceholder\" class=\"WAD-GroupLine\" style=\"\n            width:100%; height:40px;\n            text-align:center; line-height:40px;\n            opacity:0.3;\n          \">(no custom properties)</div>\n\n          <!-- custom Properties -->\n        </div>\n\n      </div>\n    </div>\n  <div style=\"display:block; position:relative; height:32px\">\n    <div style=\"\n      display:block; position:absolute;\n      left:2px; bottom:0px; right:32px; height:32px;\n      overflow:hidden; text-overflow:ellipsis;\n    \">\n      <input name=\"MessageView\" type=\"text\" class=\"WAD WAD-stylableContent WAD-styledTextlineInput\" style=\"\n        background:transparent; border:none; text-align:left\n      \" readonly value=\"(room for messages)\">\n    </div>\n\n    <div name=\"SizeHandle\" class=\"WAD WAD-Dialog-ResizeHandle WAD-Dragger\" style=\"\n      right:0px; bottom:0px; width:32px; height:32px;\n      cursor:nwse-resize\n    \" size-direction=\"se\"></div>\n  </div>\n</div>\n\n      ".trim()).hide();
            $(document.body).append(this.Peer);
            this.configureDialog();
            this.configureCloseButton();
            this.cacheNamedElements();
            this.defineElementBehaviours();
        };
        /**** define element behaviours ****/
        WAD_ConfigurationDialog.prototype.defineElementBehaviours = function () {
            this.ConfigurationPane.find('.WAD-GroupHeader').on('click', function () {
                var Element = $(this).parent();
                if (Element.attr('collapsed')) {
                    Element.removeAttr('collapsed');
                }
                else {
                    Element.attr('collapsed', true);
                }
            });
            /**** tryToApplyChange ****/
            function tryToApplyChange(Element, Applicator) {
                try {
                    Applicator();
                    Element.removeClass('WAD-invalidInput');
                }
                catch (Signal) {
                    Element.addClass('WAD-invalidInput');
                    ConfigurationDialog.showError(Signal.toString().replace(/^[^:]*:/, ''));
                }
            }
            /**** Basics ****/
            this.NameInput.on('input', function () {
                ConfigurationDialog.clearError();
                var Mode = ConfigurationDialog.Mode;
                var selectedVisuals = memoized('selected' + Mode + 's');
                if (selectedVisuals.length > 0) {
                    var Name_1 = ConfigurationDialog.NameInput.val().trim();
                    if (ValueIsUniqueName(Name_1) && (selectedVisuals.length > 1)) {
                        ConfigurationDialog.showError('same unique name for multiple visuals');
                        return;
                    }
                    if (Name_1 === '') {
                        Name_1 = undefined;
                    }
                    tryToApplyChange(ConfigurationDialog.NameInput, function () { return doSetPropertyOfSelectedVisualsTo(Mode, 'Name', Name_1); });
                }
            });
            this.ClassesInput.on('input', function () {
                ConfigurationDialog.clearError();
                var Mode = ConfigurationDialog.Mode;
                var selectedVisuals = memoized('selected' + Mode + 's');
                if (selectedVisuals.length > 0) {
                    var Classes_1 = ConfigurationDialog.ClassesInput.val().trim();
                    tryToApplyChange(ConfigurationDialog.ClassesInput, function () { return doSetPropertyOfSelectedVisualsTo(Mode, 'Classes', Classes_1); });
                }
            });
            this.isEnabledInput.on('input', function () {
                ConfigurationDialog.clearError();
                var Mode = ConfigurationDialog.Mode;
                if (memoized('selected' + Mode + 's').length > 0) {
                    var Enabling_1 = ConfigurationDialog.isEnabledInput.prop('checked');
                    tryToApplyChange(ConfigurationDialog.isEnabledInput, function () { return doSetPropertyOfSelectedVisualsTo(Mode, 'Enabling', Enabling_1); });
                }
            });
            this.reactiveVariableInput.on('input', function () {
                ConfigurationDialog.clearError();
                var Mode = ConfigurationDialog.Mode;
                var selectedVisuals = memoized('selected' + Mode + 's');
                if (selectedVisuals.length > 0) {
                    var Variable_1 = ConfigurationDialog.reactiveVariableInput.val().trim();
                    if (Variable_1 === '') {
                        Variable_1 = undefined;
                    }
                    if ((Variable_1 != null) && (selectedVisuals.length > 1)) {
                        ConfigurationDialog.showError('same variable name for multiple visuals');
                        return;
                    }
                    tryToApplyChange(ConfigurationDialog.reactiveVariableInput, function () { return doSetPropertyOfSelectedVisualsTo(Mode, 'reactiveVariable', Variable_1); });
                }
            });
            this.TabIndexInput.on('input', function () {
                ConfigurationDialog.clearError();
                var Mode = ConfigurationDialog.Mode;
                var selectedVisuals = memoized('selected' + Mode + 's');
                if (selectedVisuals.length > 0) {
                    var TabIndex_1 = parseInt(ConfigurationDialog.TabIndexInput.val(), 10);
                    if ((TabIndex_1 > 0) && (selectedVisuals.length > 1)) {
                        ConfigurationDialog.showError('same TabIndex for multiple components');
                        return;
                    }
                    tryToApplyChange(ConfigurationDialog.TabIndexInput, function () { return doSetPropertyOfSelectedVisualsTo(Mode, 'TabIndex', TabIndex_1); });
                }
            });
            this.isPointerSensitiveInput.on('input', function () {
                ConfigurationDialog.clearError();
                var Mode = ConfigurationDialog.Mode;
                if (memoized('selected' + Mode + 's').length > 0) {
                    var PointerSensitivity_1 = ConfigurationDialog.isPointerSensitiveInput.prop('checked');
                    tryToApplyChange(ConfigurationDialog.isPointerSensitiveInput, function () { return doSetPropertyOfSelectedVisualsTo(Mode, 'PointerSensitivity', PointerSensitivity_1); });
                }
            });
            /**** Layout and Visibility ****/
            this.XInput.on('input', function () {
                ConfigurationDialog.clearError();
                var Mode = ConfigurationDialog.Mode;
                var selectedVisuals = memoized('selected' + Mode + 's');
                if (selectedVisuals.length > 0) {
                    var x_1 = parseInt(ConfigurationDialog.XInput.val(), 10);
                    tryToApplyChange(ConfigurationDialog.XInput, function () { return doSetPropertyOfSelectedVisualsTo(Mode, 'x', x_1); });
                }
            });
            this.YInput.on('input', function () {
                ConfigurationDialog.clearError();
                var Mode = ConfigurationDialog.Mode;
                var selectedVisuals = memoized('selected' + Mode + 's');
                if (selectedVisuals.length > 0) {
                    var y_1 = parseInt(ConfigurationDialog.YInput.val(), 10);
                    tryToApplyChange(ConfigurationDialog.YInput, function () { return doSetPropertyOfSelectedVisualsTo(Mode, 'y', y_1); });
                }
            });
            this.WidthInput.on('input', function () {
                ConfigurationDialog.clearError();
                var Mode = ConfigurationDialog.Mode;
                var selectedVisuals = memoized('selected' + Mode + 's');
                if (selectedVisuals.length > 0) {
                    var Width_1 = parseInt(ConfigurationDialog.WidthInput.val(), 10);
                    tryToApplyChange(ConfigurationDialog.WidthInput, function () { return doSetPropertyOfSelectedVisualsTo(Mode, 'Width', Width_1); });
                }
            });
            this.HeightInput.on('input', function () {
                ConfigurationDialog.clearError();
                var Mode = ConfigurationDialog.Mode;
                var selectedVisuals = memoized('selected' + Mode + 's');
                if (selectedVisuals.length > 0) {
                    var Height_1 = parseInt(ConfigurationDialog.HeightInput.val(), 10);
                    tryToApplyChange(ConfigurationDialog.HeightInput, function () { return doSetPropertyOfSelectedVisualsTo(Mode, 'Height', Height_1); });
                }
            });
            this.isVisibleInput.on('input', function () {
                ConfigurationDialog.clearError();
                var Mode = ConfigurationDialog.Mode;
                if (memoized('selected' + Mode + 's').length > 0) {
                    var Visibility_1 = ConfigurationDialog.isVisibleInput.prop('checked');
                    tryToApplyChange(ConfigurationDialog.isVisibleInput, function () { return doSetPropertyOfSelectedVisualsTo(Mode, 'Visibility', Visibility_1); });
                }
            });
            this.OpacityInput.on('input', function () {
                ConfigurationDialog.clearError();
                var Mode = ConfigurationDialog.Mode;
                var selectedVisuals = memoized('selected' + Mode + 's');
                if (selectedVisuals.length > 0) {
                    var Opacity_1 = parseInt(ConfigurationDialog.OpacityInput.val(), 10);
                    tryToApplyChange(ConfigurationDialog.OpacityInput, function () { return doSetPropertyOfSelectedVisualsTo(Mode, 'Opacity', Opacity_1); });
                }
            });
            [this.Overflow0Input, this.Overflow1Input].forEach(function (Element) {
                Element.on('input', function () {
                    ConfigurationDialog.clearError();
                    var Mode = ConfigurationDialog.Mode;
                    var selectedVisuals = memoized('selected' + Mode + 's');
                    if (selectedVisuals.length > 0) {
                        var Overflow0 = ConfigurationDialog.Overflow0Input.val();
                        var Overflow1 = ConfigurationDialog.Overflow1Input.val();
                        var Overflows_1 = [Overflow0, Overflow1];
                        tryToApplyChange(Element, function () { return doSetPropertyOfSelectedVisualsTo(Mode, 'Overflows', Overflows_1); });
                    }
                });
            });
            this.Anchors0Input.on('input', function () {
                ConfigurationDialog.clearError();
                var Mode = ConfigurationDialog.Mode;
                var selectedVisuals = memoized('selected' + Mode + 's');
                if (selectedVisuals.length > 0) {
                    var Anchors_1 = ConfigurationDialog.Anchors0Input.val();
                    tryToApplyChange(ConfigurationDialog.Anchors0Input, function () { return doSetPropertyOfSelectedVisualsTo(Mode, 'horizontalAnchors', Anchors_1); });
                }
            });
            [this.Offset0Input, this.Offset1Input].forEach(function (Element) {
                Element.on('input', function () {
                    ConfigurationDialog.clearError();
                    var Mode = ConfigurationDialog.Mode;
                    var selectedVisuals = memoized('selected' + Mode + 's');
                    if (selectedVisuals.length > 0) {
                        var Offset0 = parseInt(ConfigurationDialog.Offset0Input.val(), 10);
                        var Offset1 = parseInt(ConfigurationDialog.Offset1Input.val(), 10);
                        var Offsets_1 = [Offset0, Offset1];
                        tryToApplyChange(Element, function () { return doSetPropertyOfSelectedVisualsTo(Mode, 'horizontalOffsets', Offsets_1); });
                    }
                });
            });
            this.Anchors1Input.on('input', function () {
                ConfigurationDialog.clearError();
                var Mode = ConfigurationDialog.Mode;
                var selectedVisuals = memoized('selected' + Mode + 's');
                if (selectedVisuals.length > 0) {
                    var Anchors_2 = ConfigurationDialog.Anchors1Input.val();
                    tryToApplyChange(ConfigurationDialog.Anchors0Input, function () { return doSetPropertyOfSelectedVisualsTo(Mode, 'verticalAnchors', Anchors_2); });
                }
            });
            [this.Offset2Input, this.Offset3Input].forEach(function (Element) {
                Element.on('input', function () {
                    ConfigurationDialog.clearError();
                    var Mode = ConfigurationDialog.Mode;
                    var selectedVisuals = memoized('selected' + Mode + 's');
                    if (selectedVisuals.length > 0) {
                        var Offset2 = parseInt(ConfigurationDialog.Offset2Input.val(), 10);
                        var Offset3 = parseInt(ConfigurationDialog.Offset3Input.val(), 10);
                        var Offsets_2 = [Offset2, Offset3];
                        tryToApplyChange(Element, function () { return doSetPropertyOfSelectedVisualsTo(Mode, 'verticalOffsets', Offsets_2); });
                    }
                });
            });
            this.minWidthInput.on('input', function () {
                ConfigurationDialog.clearError();
                var Mode = ConfigurationDialog.Mode;
                var selectedVisuals = memoized('selected' + Mode + 's');
                if (selectedVisuals.length > 0) {
                    var minWidth_1 = parseInt(ConfigurationDialog.minWidthInput.val(), 10);
                    tryToApplyChange(ConfigurationDialog.minWidthInput, function () { return doSetPropertyOfSelectedVisualsTo(Mode, 'minWidth', minWidth_1); });
                }
            });
            this.minHeightInput.on('input', function () {
                ConfigurationDialog.clearError();
                var Mode = ConfigurationDialog.Mode;
                var selectedVisuals = memoized('selected' + Mode + 's');
                if (selectedVisuals.length > 0) {
                    var minHeight_1 = parseInt(ConfigurationDialog.minHeightInput.val(), 10);
                    tryToApplyChange(ConfigurationDialog.minHeightInput, function () { return doSetPropertyOfSelectedVisualsTo(Mode, 'minHeight', minHeight_1); });
                }
            });
            this.maxWidthInput.on('input', function () {
                ConfigurationDialog.clearError();
                var Mode = ConfigurationDialog.Mode;
                var selectedVisuals = memoized('selected' + Mode + 's');
                if (selectedVisuals.length > 0) {
                    var rawInput = ConfigurationDialog.maxWidthInput.val().trim();
                    var maxWidth_1 = (rawInput === '' ? undefined : parseInt(rawInput, 10));
                    tryToApplyChange(ConfigurationDialog.maxWidthInput, function () { return doSetPropertyOfSelectedVisualsTo(Mode, 'maxWidth', maxWidth_1); });
                }
            });
            this.maxHeightInput.on('input', function () {
                ConfigurationDialog.clearError();
                var Mode = ConfigurationDialog.Mode;
                var selectedVisuals = memoized('selected' + Mode + 's');
                if (selectedVisuals.length > 0) {
                    var rawInput = ConfigurationDialog.maxHeightInput.val().trim();
                    var maxHeight_1 = (rawInput === '' ? undefined : parseInt(rawInput, 10));
                    tryToApplyChange(ConfigurationDialog.maxHeightInput, function () { return doSetPropertyOfSelectedVisualsTo(Mode, 'maxHeight', maxHeight_1); });
                }
            });
            this.LayerToBottomButton.on('click', function () {
                ConfigurationDialog.clearError();
                var Mode = ConfigurationDialog.Mode;
                var selectedVisuals = memoized('selected' + Mode + 's');
                // @ts-ignore we know that only modes "Card" and "Component" are allowed
                if (VisualsMayBeShiftedUp(Mode, selectedVisuals)) { // as seen in list of components
                    tryToApplyChange(ConfigurationDialog.LayerToBottomButton, 
                    // @ts-ignore we know that only modes "Card" and "Component" are allowed
                    function () { return doShiftSelectedVisualsToTop(Mode); });
                }
            });
            this.LayerDownButton.on('click', function () {
                ConfigurationDialog.clearError();
                var Mode = ConfigurationDialog.Mode;
                var selectedVisuals = memoized('selected' + Mode + 's');
                // @ts-ignore we know that only modes "Card" and "Component" are allowed
                if (VisualsMayBeShiftedUp(Mode, selectedVisuals)) { // as seen in list of components
                    tryToApplyChange(ConfigurationDialog.LayerDownButton, 
                    // @ts-ignore we know that only modes "Card" and "Component" are allowed
                    function () { return doShiftSelectedVisualsUp(Mode); });
                }
            });
            this.LayerUpButton.on('click', function () {
                ConfigurationDialog.clearError();
                var Mode = ConfigurationDialog.Mode;
                var selectedVisuals = memoized('selected' + Mode + 's');
                // @ts-ignore we know that only modes "Card" and "Component" are allowed
                if (VisualsMayBeShiftedDown(Mode, selectedVisuals)) { // as seen in list of components
                    tryToApplyChange(ConfigurationDialog.LayerUpButton, 
                    // @ts-ignore we know that only modes "Card" and "Component" are allowed
                    function () { return doShiftSelectedVisualsDown(Mode); });
                }
            });
            this.LayerToTopButton.on('click', function () {
                ConfigurationDialog.clearError();
                var Mode = ConfigurationDialog.Mode;
                var selectedVisuals = memoized('selected' + Mode + 's');
                // @ts-ignore we know that only modes "Card" and "Component" are allowed
                if (VisualsMayBeShiftedDown(Mode, selectedVisuals)) { // as seen in list of components
                    tryToApplyChange(ConfigurationDialog.LayerToTopButton, 
                    // @ts-ignore we know that only modes "Card" and "Component" are allowed
                    function () { return doShiftSelectedVisualsToBottom(Mode); });
                }
            });
            [
                this.BorderLeftWidthInput, this.BorderTopWidthInput,
                this.BorderRightWidthInput, this.BorderBottomWidthInput
            ].forEach(function (Element) {
                Element.on('input', function () {
                    ConfigurationDialog.clearError();
                    var Mode = ConfigurationDialog.Mode;
                    var selectedVisuals = memoized('selected' + Mode + 's');
                    if (selectedVisuals.length > 0) {
                        var leftWidth = parseInt(ConfigurationDialog.BorderLeftWidthInput.val(), 10);
                        var topWidth = parseInt(ConfigurationDialog.BorderTopWidthInput.val(), 10);
                        var rightWidth = parseInt(ConfigurationDialog.BorderRightWidthInput.val(), 10);
                        var bottomWidth = parseInt(ConfigurationDialog.BorderBottomWidthInput.val(), 10);
                        var Widths_1 = [topWidth, rightWidth, bottomWidth, leftWidth];
                        tryToApplyChange(Element, function () { return doSetPropertyOfSelectedVisualsTo(Mode, 'BorderWidths', Widths_1); });
                    }
                });
            });
            [
                this.BorderLeftStyleInput, this.BorderTopStyleInput,
                this.BorderRightStyleInput, this.BorderBottomStyleInput
            ].forEach(function (Element) {
                Element.on('input', function () {
                    ConfigurationDialog.clearError();
                    var Mode = ConfigurationDialog.Mode;
                    var selectedVisuals = memoized('selected' + Mode + 's');
                    if (selectedVisuals.length > 0) {
                        var leftStyle = ConfigurationDialog.BorderLeftStyleInput.val();
                        var topStyle = ConfigurationDialog.BorderTopStyleInput.val();
                        var rightStyle = ConfigurationDialog.BorderRightStyleInput.val();
                        var bottomStyle = ConfigurationDialog.BorderBottomStyleInput.val();
                        var Styles_1 = [topStyle, rightStyle, bottomStyle, leftStyle];
                        tryToApplyChange(Element, function () { return doSetPropertyOfSelectedVisualsTo(Mode, 'BorderStyles', Styles_1); });
                    }
                });
            });
            [
                this.BorderLeftColorInput, this.BorderTopColorInput,
                this.BorderRightColorInput, this.BorderBottomColorInput
            ].forEach(function (Element) {
                Element.on('change', function () {
                    ConfigurationDialog.clearError();
                    var Mode = ConfigurationDialog.Mode;
                    var selectedVisuals = memoized('selected' + Mode + 's');
                    if (selectedVisuals.length > 0) {
                        var leftColor = ConfigurationDialog.BorderLeftColorInput.val();
                        var topColor = ConfigurationDialog.BorderTopColorInput.val();
                        var rightColor = ConfigurationDialog.BorderRightColorInput.val();
                        var bottomColor = ConfigurationDialog.BorderBottomColorInput.val();
                        var Colors_1 = [topColor, rightColor, bottomColor, leftColor];
                        tryToApplyChange(Element, function () { return doSetPropertyOfSelectedVisualsTo(Mode, 'BorderColors', Colors_1); });
                    }
                });
            });
            [
                this.BorderRadiusTLInput, this.BorderRadiusTRInput,
                this.BorderRadiusBRInput, this.BorderRadiusBLInput
            ].forEach(function (Element) {
                Element.on('input', function () {
                    ConfigurationDialog.clearError();
                    var Mode = ConfigurationDialog.Mode;
                    var selectedVisuals = memoized('selected' + Mode + 's');
                    if (selectedVisuals.length > 0) {
                        var TLRadius = parseInt(ConfigurationDialog.BorderRadiusTLInput.val(), 10);
                        var TRRadius = parseInt(ConfigurationDialog.BorderRadiusTRInput.val(), 10);
                        var BRRadius = parseInt(ConfigurationDialog.BorderRadiusBRInput.val(), 10);
                        var BLRadius = parseInt(ConfigurationDialog.BorderRadiusBLInput.val(), 10);
                        var Radii_1 = [TLRadius, TRRadius, BRRadius, BLRadius];
                        tryToApplyChange(Element, function () { return doSetPropertyOfSelectedVisualsTo(Mode, 'BorderRadii', Radii_1); });
                    }
                });
            });
            /**** Background ****/
            this.BackgroundInput.on('input', function () {
                ConfigurationDialog.clearError();
                var Mode = ConfigurationDialog.Mode;
                if (memoized('selected' + Mode + 's').length > 0) {
                    var hasBackground = ConfigurationDialog.BackgroundInput.prop('checked');
                    if (hasBackground) {
                        var Color_1 = ConfigurationDialog.BackgroundColorInput.val();
                        tryToApplyChange(ConfigurationDialog.BackgroundColorInput, function () { return doSetPropertyOfSelectedVisualsTo(Mode, 'BackgroundColor', Color_1); });
                    }
                    else {
                        tryToApplyChange(ConfigurationDialog.BackgroundInput, function () { return doSetPropertyOfSelectedVisualsTo(Mode, 'BackgroundColor', '#00000000'); });
                    }
                }
            });
            this.BackgroundColorInput.on('change', function () {
                ConfigurationDialog.clearError();
                var Mode = ConfigurationDialog.Mode;
                var selectedVisuals = memoized('selected' + Mode + 's');
                if (selectedVisuals.length > 0) {
                    var Color_2 = ConfigurationDialog.BackgroundColorInput.val();
                    tryToApplyChange(ConfigurationDialog.BackgroundColorInput, function () { return doSetPropertyOfSelectedVisualsTo(Mode, 'BackgroundColor', Color_2); });
                }
            });
            this.BackgroundTextureInput.on('input', function () {
                ConfigurationDialog.clearError();
                var Mode = ConfigurationDialog.Mode;
                if (memoized('selected' + Mode + 's').length > 0) {
                    var hasTexture = ConfigurationDialog.BackgroundTextureInput.prop('checked');
                    if (hasTexture) {
                        tryToApplyChange(ConfigurationDialog.BackgroundTextureInput, function () { return doSetPropertyOfSelectedVisualsTo(Mode, 'BackgroundTexture', {
                            ImageURL: '', Mode: 'normal', xOffset: 0, yOffset: 0
                        }); });
                    }
                    else {
                        tryToApplyChange(ConfigurationDialog.BackgroundTextureInput, function () { return doSetPropertyOfSelectedVisualsTo(Mode, 'BackgroundTexture', 'none'); });
                    }
                }
            });
            [
                this.BackgroundImageURLInput, this.BackgroundModeInput,
                this.BackgroundOffsetXInput, this.BackgroundOffsetYInput
            ].forEach(function (Element) {
                Element.on('input change', function () {
                    ConfigurationDialog.clearError();
                    var ConfigurationMode = ConfigurationDialog.Mode;
                    var selectedVisuals = memoized('selected' + ConfigurationMode + 's');
                    if (selectedVisuals.length > 0) {
                        var ImageURL = ConfigurationDialog.BackgroundImageURLInput.val().trim();
                        var Mode = ConfigurationDialog.BackgroundModeInput.val();
                        var xOffset = parseInt(ConfigurationDialog.BackgroundOffsetXInput.val(), 10);
                        var yOffset = parseInt(ConfigurationDialog.BackgroundOffsetYInput.val(), 10);
                        var Texture_1 = { ImageURL: ImageURL, Mode: Mode, xOffset: xOffset, yOffset: yOffset };
                        tryToApplyChange(ConfigurationDialog.BackgroundImageURLInput, function () { return doSetPropertyOfSelectedVisualsTo(ConfigurationMode, 'BackgroundTexture', Texture_1); });
                    }
                });
            });
            /**** Typography ****/
            this.FontFamilyInput.on('input', function () {
                ConfigurationDialog.clearError();
                var Mode = ConfigurationDialog.Mode;
                var selectedVisuals = memoized('selected' + Mode + 's');
                if (selectedVisuals.length > 0) {
                    var FontFamily_1 = ConfigurationDialog.FontFamilyInput.val().trim();
                    tryToApplyChange(ConfigurationDialog.FontFamilyInput, function () { return doSetPropertyOfSelectedVisualsTo(Mode, 'FontFamily', FontFamily_1); });
                }
            });
            this.FontSizeInput.on('input', function () {
                ConfigurationDialog.clearError();
                var Mode = ConfigurationDialog.Mode;
                var selectedVisuals = memoized('selected' + Mode + 's');
                if (selectedVisuals.length > 0) {
                    var FontSize_1 = parseInt(ConfigurationDialog.FontSizeInput.val(), 10);
                    tryToApplyChange(ConfigurationDialog.FontSizeInput, function () { return doSetPropertyOfSelectedVisualsTo(Mode, 'FontSize', FontSize_1); });
                }
            });
            this.FontWeightInput.on('input', function () {
                ConfigurationDialog.clearError();
                var Mode = ConfigurationDialog.Mode;
                var selectedVisuals = memoized('selected' + Mode + 's');
                if (selectedVisuals.length > 0) {
                    var FontWeight_1 = ConfigurationDialog.FontWeightInput.val();
                    tryToApplyChange(ConfigurationDialog.FontWeightInput, function () { return doSetPropertyOfSelectedVisualsTo(Mode, 'FontWeight', FontWeight_1); });
                }
            });
            this.FontItalicInput.on('input', function () {
                ConfigurationDialog.clearError();
                var Mode = ConfigurationDialog.Mode;
                if (memoized('selected' + Mode + 's').length > 0) {
                    var isItalic_1 = ConfigurationDialog.FontItalicInput.prop('checked');
                    tryToApplyChange(ConfigurationDialog.FontItalicInput, function () { return doSetPropertyOfSelectedVisualsTo(Mode, 'FontStyle', isItalic_1 ? 'italic' : 'normal'); });
                }
            });
            this.ForegroundColorInput.on('change', function () {
                ConfigurationDialog.clearError();
                var Mode = ConfigurationDialog.Mode;
                var selectedVisuals = memoized('selected' + Mode + 's');
                if (selectedVisuals.length > 0) {
                    var Color_3 = ConfigurationDialog.ForegroundColorInput.val();
                    tryToApplyChange(ConfigurationDialog.ForegroundColorInput, function () { return doSetPropertyOfSelectedVisualsTo(Mode, 'ForegroundColor', Color_3); });
                }
            });
            this.TextDecorationInput.on('input', function () {
                ConfigurationDialog.clearError();
                var Mode = ConfigurationDialog.Mode;
                if (memoized('selected' + Mode + 's').length > 0) {
                    var hasDecoration = ConfigurationDialog.TextDecorationInput.prop('checked');
                    if (hasDecoration) {
                        tryToApplyChange(ConfigurationDialog.TextDecorationInput, function () { return doSetPropertyOfSelectedVisualsTo(Mode, 'TextDecoration', { Line: 'underline', Style: 'solid', Color: 'red' }); });
                    }
                    else {
                        tryToApplyChange(ConfigurationDialog.TextDecorationInput, function () { return doSetPropertyOfSelectedVisualsTo(Mode, 'TextDecoration', 'none'); });
                    }
                }
            });
            [
                this.TextDecorationLineInput, this.TextDecorationStyleInput,
                this.TextDecorationColorInput
            ].forEach(function (Element) {
                Element.on('input change', function () {
                    ConfigurationDialog.clearError();
                    var Mode = ConfigurationDialog.Mode;
                    var selectedVisuals = memoized('selected' + Mode + 's');
                    if (selectedVisuals.length > 0) {
                        var Line_1 = ConfigurationDialog.TextDecorationLineInput.val();
                        var Style_1 = ConfigurationDialog.TextDecorationStyleInput.val();
                        var Color_4 = ConfigurationDialog.TextDecorationColorInput.val();
                        tryToApplyChange(Element, function () { return doSetPropertyOfSelectedVisualsTo(Mode, 'TextDecoration', { Line: Line_1, Style: Style_1, Color: Color_4 }); });
                    }
                });
            });
            this.TextShadowInput.on('input', function () {
                ConfigurationDialog.clearError();
                var Mode = ConfigurationDialog.Mode;
                if (memoized('selected' + Mode + 's').length > 0) {
                    var hasShadow = ConfigurationDialog.TextShadowInput.prop('checked');
                    if (hasShadow) {
                        tryToApplyChange(ConfigurationDialog.TextShadowInput, function () { return doSetPropertyOfSelectedVisualsTo(Mode, 'TextShadow', { xOffset: 0, yOffset: 0, BlurRadius: 4, Color: 'black' }); });
                    }
                    else {
                        tryToApplyChange(ConfigurationDialog.TextShadowInput, function () { return doSetPropertyOfSelectedVisualsTo(Mode, 'TextShadow', 'none'); });
                    }
                }
            });
            [
                this.TextShadowColorInput, this.TextShadowOffsetXInput,
                this.TextShadowOffsetYInput, this.TextShadowBlurRadiusInput
            ].forEach(function (Element) {
                Element.on('input change', function () {
                    ConfigurationDialog.clearError();
                    var Mode = ConfigurationDialog.Mode;
                    var selectedVisuals = memoized('selected' + Mode + 's');
                    if (selectedVisuals.length > 0) {
                        var Color_5 = ConfigurationDialog.TextShadowColorInput.val();
                        var xOffset_1 = parseInt(ConfigurationDialog.TextShadowOffsetXInput.val(), 10);
                        var yOffset_1 = parseInt(ConfigurationDialog.TextShadowOffsetYInput.val(), 10);
                        var BlurRadius_1 = parseInt(ConfigurationDialog.TextShadowBlurRadiusInput.val(), 10);
                        tryToApplyChange(Element, function () { return doSetPropertyOfSelectedVisualsTo(Mode, 'TextShadow', { Color: Color_5, xOffset: xOffset_1, yOffset: yOffset_1, BlurRadius: BlurRadius_1 }); });
                    }
                });
            });
            this.LineHeightInput.on('input', function () {
                ConfigurationDialog.clearError();
                var Mode = ConfigurationDialog.Mode;
                var selectedVisuals = memoized('selected' + Mode + 's');
                if (selectedVisuals.length > 0) {
                    var LineHeight_1 = parseInt(ConfigurationDialog.LineHeightInput.val(), 10);
                    tryToApplyChange(ConfigurationDialog.LineHeightInput, function () { return doSetPropertyOfSelectedVisualsTo(Mode, 'LineHeight', LineHeight_1); });
                }
            });
            this.TextAlignmentInput.on('input', function () {
                ConfigurationDialog.clearError();
                var Mode = ConfigurationDialog.Mode;
                var selectedVisuals = memoized('selected' + Mode + 's');
                if (selectedVisuals.length > 0) {
                    var TextAlignment_1 = ConfigurationDialog.TextAlignmentInput.val();
                    tryToApplyChange(ConfigurationDialog.TextAlignmentInput, function () { return doSetPropertyOfSelectedVisualsTo(Mode, 'TextAlignment', TextAlignment_1); });
                }
            });
            /**** Shadow ****/
            this.ShadowInput.on('input', function () {
                ConfigurationDialog.clearError();
                var Mode = ConfigurationDialog.Mode;
                if (memoized('selected' + Mode + 's').length > 0) {
                    var hasShadow = ConfigurationDialog.ShadowInput.prop('checked');
                    if (hasShadow) {
                        tryToApplyChange(ConfigurationDialog.ShadowInput, function () { return doSetPropertyOfSelectedVisualsTo(Mode, 'BoxShadow', {
                            isInset: false, Color: 'black', xOffset: 0, yOffset: 0,
                            BlurRadius: 4, SpreadRadius: 4
                        }); });
                    }
                    else {
                        tryToApplyChange(ConfigurationDialog.ShadowInput, function () { return doSetPropertyOfSelectedVisualsTo(Mode, 'BoxShadow', 'none'); });
                    }
                }
            });
            [
                this.ShadowDirectionInput, this.ShadowColorInput,
                this.ShadowOffsetXInput, this.ShadowOffsetYInput,
                this.ShadowBlurRadiusInput, this.ShadowSpreadRadiusInput
            ].forEach(function (Element) {
                Element.on('input change', function () {
                    ConfigurationDialog.clearError();
                    var Mode = ConfigurationDialog.Mode;
                    var selectedVisuals = memoized('selected' + Mode + 's');
                    if (selectedVisuals.length > 0) {
                        var isInset_1 = (ConfigurationDialog.ShadowDirectionInput.val() === 'inwards');
                        var Color_6 = ConfigurationDialog.ShadowColorInput.val();
                        var xOffset_2 = parseInt(ConfigurationDialog.ShadowOffsetXInput.val(), 10);
                        var yOffset_2 = parseInt(ConfigurationDialog.ShadowOffsetYInput.val(), 10);
                        var BlurRadius_2 = parseInt(ConfigurationDialog.ShadowBlurRadiusInput.val(), 10);
                        var SpreadRadius_1 = parseInt(ConfigurationDialog.ShadowSpreadRadiusInput.val(), 10);
                        tryToApplyChange(Element, function () { return doSetPropertyOfSelectedVisualsTo(Mode, 'BoxShadow', { isInset: isInset_1, Color: Color_6, xOffset: xOffset_2, yOffset: yOffset_2, BlurRadius: BlurRadius_2, SpreadRadius: SpreadRadius_1 }); });
                    }
                });
            });
            /**** Cursor ****/
            this.CursorTypeInput.on('input', function () {
                ConfigurationDialog.clearError();
                var Mode = ConfigurationDialog.Mode;
                var selectedVisuals = memoized('selected' + Mode + 's');
                if (selectedVisuals.length > 0) {
                    var Cursor_1 = ConfigurationDialog.CursorTypeInput.val();
                    tryToApplyChange(ConfigurationDialog.CursorTypeInput, function () { return doSetPropertyOfSelectedVisualsTo(Mode, 'Cursor', Cursor_1); });
                }
            });
            this.CursorInput.on('input', function () {
                ConfigurationDialog.clearError();
                var Mode = ConfigurationDialog.Mode;
                if (memoized('selected' + Mode + 's').length > 0) {
                    var hasCustomCursor = ConfigurationDialog.CursorInput.prop('checked');
                    if (hasCustomCursor) {
                        tryToApplyChange(ConfigurationDialog.CursorInput, function () { return doSetPropertyOfSelectedVisualsTo(Mode, 'customCursor', {
                            ImageURL: '', xOffset: 0, yOffset: 0
                        }); });
                    }
                    else {
                        tryToApplyChange(ConfigurationDialog.CursorInput, function () { return doSetPropertyOfSelectedVisualsTo(Mode, 'customCursor', 'none'); });
                    }
                }
            });
            [
                this.CursorImageURLInput, this.CursorOffsetXInput, this.CursorOffsetYInput
            ].forEach(function (Element) {
                Element.on('input', function () {
                    ConfigurationDialog.clearError();
                    var Mode = ConfigurationDialog.Mode;
                    var selectedVisuals = memoized('selected' + Mode + 's');
                    if (selectedVisuals.length > 0) {
                        var ImageURL_1 = ConfigurationDialog.CursorImageURLInput.val();
                        var xOffset_3 = parseInt(ConfigurationDialog.CursorOffsetXInput.val(), 10);
                        var yOffset_3 = parseInt(ConfigurationDialog.CursorOffsetYInput.val(), 10);
                        tryToApplyChange(Element, function () { return doSetPropertyOfSelectedVisualsTo(Mode, 'customCursor', { ImageURL: ImageURL_1, xOffset: xOffset_3, yOffset: yOffset_3 }); });
                    }
                });
            });
            /**** custom Properties ****/
            function handleCustomInput(Event, ValueOfControl) {
                ConfigurationDialog.clearError();
                var Mode = ConfigurationDialog.Mode;
                var selectedVisuals = memoized('selected' + Mode + 's');
                if (selectedVisuals.length > 0) {
                    var Control = $(Event.target);
                    var PropertySpec_1 = Control.closest('.WAD-GroupLine').data('wad-property-spec');
                    var PropertyValue_1 = ValueOfControl(Control, PropertySpec_1);
                    tryToApplyChange(Control, function () { return doSetPropertyOfSelectedVisualsTo(Mode, PropertySpec_1.Name, PropertyValue_1); });
                }
            }
            this.customGroup.on('input', 'input[type="checkbox"]', function (Event) {
                handleCustomInput(Event, function (Control) { return Control.prop('checked'); });
            });
            this.customGroup.on('input', 'select', function (Event) {
                handleCustomInput(Event, function (Control, PropertySpec) {
                    var rawValue = Control.val();
                    return (PropertySpec.EditorType === 'choice'
                        ? (rawValue === PropertySpec.TrueValue)
                        : rawValue);
                });
            });
            this.customGroup.on('input', 'input[type="text"]', function (Event) {
                handleCustomInput(Event, function (Control) { return Control.val(); });
            });
            this.customGroup.on('input', 'input[type="password"]', function (Event) {
                handleCustomInput(Event, function (Control) { return Control.val(); });
            });
            this.customGroup.on('input', 'input[type="email"]', function (Event) {
                handleCustomInput(Event, function (Control) { return Control.val(); });
            });
            this.customGroup.on('input', 'input[type="tel"]', function (Event) {
                handleCustomInput(Event, function (Control) { return Control.val(); });
            });
            this.customGroup.on('input', 'input[type="url"]', function (Event) {
                handleCustomInput(Event, function (Control) { return Control.val(); });
            });
            this.customGroup.on('input', 'input[type="search"]', function (Event) {
                handleCustomInput(Event, function (Control) { return Control.val(); });
            });
            this.customGroup.on('input', 'input[type="number"]', function (Event) {
                handleCustomInput(Event, function (Control) { return parseFloat(Control.val()); });
            });
            this.customGroup.on('input', 'input[type="datetime-local"]', function (Event) {
                handleCustomInput(Event, function (Control) { return Control.val(); });
            });
            this.customGroup.on('input', 'input[type="date"]', function (Event) {
                handleCustomInput(Event, function (Control) { return Control.val(); });
            });
            this.customGroup.on('input', 'input[type="month"]', function (Event) {
                handleCustomInput(Event, function (Control) { return Control.val(); });
            });
            this.customGroup.on('input', 'input[type="week"]', function (Event) {
                handleCustomInput(Event, function (Control) { return Control.val(); });
            });
            this.customGroup.on('change', 'input[type="color"]', function (Event) {
                handleCustomInput(Event, function (Control) { return Control.val(); });
            });
            this.customGroup.on('input', 'input[type="range"]', function (Event) {
                handleCustomInput(Event, function (Control) { return parseFloat(Control.val()); });
            });
            this.customGroup.on('input', 'textarea:not(.WAD-LineListInput)', function (Event) {
                handleCustomInput(Event, function (Control) { return Control.val(); });
            });
            this.customGroup.on('input', 'textarea.WAD-LineListInput', function (Event) {
                handleCustomInput(Event, function (Control, PropertySpec) {
                    return Control.val().split('\n');
                });
            });
            this.customGroup.on('input', 'textarea.WAD-NumberListInput', function (Event) {
                handleCustomInput(Event, function (Control, PropertySpec) {
                    var NumberList = [];
                    Control.val().split('\n').every(function (Line) {
                        Line = Line.trim();
                        if (Line === '') {
                            return true;
                        }
                        var Candidate = parseFloat(Line);
                        if (isFinite(Candidate)) {
                            NumberList.push(Candidate);
                            return true;
                        }
                        else {
                            Control.addClass('WAD-invalidInput');
                            ConfigurationDialog.showError('list contains non-numeric elements');
                            return false;
                        }
                    });
                    return NumberList;
                });
            });
        };
        /**** onTick ****/
        WAD_ConfigurationDialog.prototype.onTick = function () {
            if (chosenDesignerInfo == null) {
                this.close();
                return;
            }
            this.refresh();
        };
        WAD_ConfigurationDialog.prototype.setMode = function (newMode) {
            if (this.Mode !== newMode) {
                this.Mode = newMode;
                this.ModeView.text(newMode);
                if (this.isVisible) {
                    var focusedElement = $(':focus');
                    if ($.contains(this.Peer[0], focusedElement[0])) {
                        focusedElement.blur();
                    }
                    this.refresh();
                }
            }
        };
        /**** refresh ****/
        WAD_ConfigurationDialog.prototype.refresh = function () {
            this.clearErrorIndicators();
            var SelectionHasChanged = memoized('selected' + this.Mode + 'sHaveChanged');
            if (SelectionHasChanged) {
                var focusedElement = $(':focus');
                if ($.contains(this.Peer[0], focusedElement[0])) {
                    focusedElement.blur();
                }
            }
            var selectedVisuals = memoized('selected' + this.Mode + 's');
            if (selectedVisuals.length === 0) {
                this.clearPropertyInputs();
            }
            else {
                var Configuration = memoized('selected' + this.Mode + 'sConfiguration');
                this.refreshPropertyInputsFrom(this.Mode, Configuration);
            }
            if (this.Mode === 'Component') {
                this.refreshCustomPropertyGroup();
            }
            else {
                this.oldPropertySpecs = undefined;
                this.customGroup.children().slice(2).remove();
                this.customGroupPlaceholder.css('display', 'block');
                this.customGroupPlaceholder.text('(not in Component mode)');
            }
        };
        /**** clearErrorIndicators ****/
        WAD_ConfigurationDialog.prototype.clearErrorIndicators = function () {
            this.Peer.find('.WAD-invalidInput').each(function () {
                var Element = $(this);
                if (!Element.is(':focus')) {
                    Element.removeClass('WAD-invalidInput');
                }
            });
        };
        /**** clearPropertyInputs ****/
        WAD_ConfigurationDialog.prototype.clearPropertyInputs = function () {
            refreshLiteralInput(this.MasterView, noSelection);
            refreshLiteralInput(this.NameInput, noSelection);
            refreshLiteralInput(this.PathView, noSelection);
            refreshLiteralInput(this.ClassesInput, noSelection);
            refreshCheckbox(this.isEnabledInput, noSelection);
            refreshLiteralInput(this.reactiveVariableInput, noSelection);
            refreshNumericInput(this.TabIndexInput, noSelection);
            refreshCheckbox(this.isPointerSensitiveInput, noSelection);
            refreshNumericInput(this.XInput, noSelection);
            refreshNumericInput(this.YInput, noSelection);
            refreshNumericInput(this.WidthInput, noSelection);
            refreshNumericInput(this.HeightInput, noSelection);
            refreshCheckbox(this.isVisibleInput, noSelection);
            refreshNumericInput(this.OpacityInput, noSelection);
            refreshDropDown(this.Overflow0Input, noSelection);
            refreshDropDown(this.Overflow1Input, noSelection);
            refreshDropDown(this.Anchors0Input, noSelection);
            refreshNumericInput(this.Offset0Input, noSelection);
            refreshNumericInput(this.Offset1Input, noSelection);
            refreshDropDown(this.Anchors1Input, noSelection);
            refreshNumericInput(this.Offset2Input, noSelection);
            refreshNumericInput(this.Offset3Input, noSelection);
            refreshNumericInput(this.minWidthInput, noSelection);
            refreshNumericInput(this.minHeightInput, noSelection);
            refreshNumericInput(this.maxWidthInput, noSelection);
            refreshNumericInput(this.maxHeightInput, noSelection);
            refreshNumericInput(this.LayerInput, noSelection);
            setEnablingOf(this.LayerToTopButton, false);
            setEnablingOf(this.LayerUpButton, false);
            setEnablingOf(this.LayerDownButton, false);
            setEnablingOf(this.LayerToBottomButton, false);
            refreshNumericInput(this.BorderLeftWidthInput, noSelection);
            refreshDropDown(this.BorderLeftStyleInput, noSelection);
            refreshColorInput(this.BorderLeftColorInput, noSelection);
            refreshNumericInput(this.BorderTopWidthInput, noSelection);
            refreshDropDown(this.BorderTopStyleInput, noSelection);
            refreshColorInput(this.BorderTopColorInput, noSelection);
            refreshNumericInput(this.BorderRightWidthInput, noSelection);
            refreshDropDown(this.BorderRightStyleInput, noSelection);
            refreshColorInput(this.BorderRightColorInput, noSelection);
            refreshNumericInput(this.BorderBottomWidthInput, noSelection);
            refreshDropDown(this.BorderBottomStyleInput, noSelection);
            refreshColorInput(this.BorderBottomColorInput, noSelection);
            refreshNumericInput(this.BorderRadiusTLInput, noSelection);
            refreshNumericInput(this.BorderRadiusTRInput, noSelection);
            refreshNumericInput(this.BorderRadiusBLInput, noSelection);
            refreshNumericInput(this.BorderRadiusBRInput, noSelection);
            refreshCheckbox(this.BackgroundInput, noSelection);
            refreshColorInput(this.BackgroundColorInput, noSelection);
            refreshCheckbox(this.BackgroundTextureInput, noSelection);
            refreshLiteralInput(this.BackgroundImageURLInput, noSelection);
            refreshDropDown(this.BackgroundModeInput, noSelection);
            refreshNumericInput(this.BackgroundOffsetXInput, noSelection);
            refreshNumericInput(this.BackgroundOffsetYInput, noSelection);
            refreshLiteralInput(this.FontFamilyInput, noSelection);
            refreshNumericInput(this.FontSizeInput, noSelection);
            refreshDropDown(this.FontWeightInput, noSelection);
            refreshCheckbox(this.FontItalicInput, noSelection);
            refreshColorInput(this.ForegroundColorInput, noSelection);
            refreshCheckbox(this.TextDecorationInput, noSelection);
            refreshDropDown(this.TextDecorationLineInput, noSelection);
            refreshDropDown(this.TextDecorationStyleInput, noSelection);
            refreshColorInput(this.TextDecorationColorInput, noSelection);
            refreshCheckbox(this.TextShadowInput, noSelection);
            refreshColorInput(this.TextShadowColorInput, noSelection);
            refreshNumericInput(this.TextShadowOffsetXInput, noSelection);
            refreshNumericInput(this.TextShadowOffsetYInput, noSelection);
            refreshNumericInput(this.TextShadowBlurRadiusInput, noSelection);
            refreshNumericInput(this.LineHeightInput, noSelection);
            refreshDropDown(this.TextAlignmentInput, noSelection);
            refreshCheckbox(this.ShadowInput, noSelection);
            refreshDropDown(this.ShadowDirectionInput, noSelection);
            refreshColorInput(this.ShadowColorInput, noSelection);
            refreshNumericInput(this.ShadowOffsetXInput, noSelection);
            refreshNumericInput(this.ShadowOffsetYInput, noSelection);
            refreshNumericInput(this.ShadowBlurRadiusInput, noSelection);
            refreshNumericInput(this.ShadowSpreadRadiusInput, noSelection);
            refreshDropDown(this.CursorTypeInput, noSelection);
            refreshCheckbox(this.CursorInput, noSelection);
            refreshLiteralInput(this.CursorImageURLInput, noSelection);
            refreshNumericInput(this.CursorOffsetXInput, noSelection);
            refreshNumericInput(this.CursorOffsetYInput, noSelection);
        };
        /**** refreshPropertyInputsFrom ****/
        WAD_ConfigurationDialog.prototype.refreshPropertyInputsFrom = function (Mode, Configuration) {
            refreshLiteralInput(this.MasterView, Configuration.Master);
            refreshLiteralInput(this.NameInput, Configuration.Name, '(none)');
            refreshLiteralInput(this.PathView, Configuration.Path);
            refreshLiteralInput(this.ClassesInput, Configuration.Classes);
            refreshCheckbox(this.isEnabledInput, Configuration.Enabling);
            refreshLiteralInput(this.reactiveVariableInput, Configuration.reactiveVariable, '(none)');
            refreshNumericInput(this.TabIndexInput, Configuration.TabIndex);
            refreshCheckbox(this.isPointerSensitiveInput, Configuration.PointerSensitivity);
            setEnablingOf(this.TabIndexInput, Mode === 'Component');
            refreshNumericInput(this.XInput, Configuration.x);
            refreshNumericInput(this.YInput, Configuration.y);
            refreshNumericInput(this.WidthInput, Configuration.Width);
            refreshNumericInput(this.HeightInput, Configuration.Height);
            refreshCheckbox(this.isVisibleInput, Configuration.Visibility);
            refreshNumericInput(this.OpacityInput, Configuration.Opacity);
            refreshDropDown(this.Overflow0Input, Configuration.Overflows[0]);
            refreshDropDown(this.Overflow1Input, Configuration.Overflows[1]);
            refreshDropDown(this.Anchors0Input, Configuration.horizontalAnchors);
            refreshNumericInput(this.Offset0Input, Configuration.horizontalOffsets[0]);
            refreshNumericInput(this.Offset1Input, Configuration.horizontalOffsets[1]);
            refreshDropDown(this.Anchors1Input, Configuration.verticalAnchors);
            refreshNumericInput(this.Offset2Input, Configuration.verticalOffsets[0]);
            refreshNumericInput(this.Offset3Input, Configuration.verticalOffsets[1]);
            refreshNumericInput(this.minWidthInput, Configuration.minWidth);
            refreshNumericInput(this.minHeightInput, Configuration.minHeight);
            refreshNumericInput(this.maxWidthInput, Configuration.maxWidth);
            refreshNumericInput(this.maxHeightInput, Configuration.maxHeight);
            refreshNumericInput(this.LayerInput, Configuration.Index);
            var isResizable = ((Mode === 'Component') ||
                (Mode === 'Applet') && (Configuration.Resizability === true));
            setEnablingOf(this.XInput, Mode === 'Component');
            setEnablingOf(this.YInput, Mode === 'Component');
            setEnablingOf(this.WidthInput, isResizable);
            setEnablingOf(this.HeightInput, isResizable);
            setEnablingOf(this.isVisibleInput, Mode === 'Component');
            setEnablingOf(this.Overflow0Input, Mode === 'Component');
            setEnablingOf(this.Overflow1Input, Mode === 'Component');
            setEnablingOf(this.Anchors0Input, Mode === 'Component');
            setEnablingOf(this.Offset0Input, Mode === 'Component');
            setEnablingOf(this.Offset1Input, Mode === 'Component');
            setEnablingOf(this.Anchors1Input, Mode === 'Component');
            setEnablingOf(this.Offset2Input, Mode === 'Component');
            setEnablingOf(this.Offset3Input, Mode === 'Component');
            setEnablingOf(this.minWidthInput, isResizable);
            setEnablingOf(this.minHeightInput, isResizable);
            setEnablingOf(this.maxWidthInput, isResizable);
            setEnablingOf(this.maxHeightInput, isResizable);
            setEnablingOf(this.LayerInput, Mode !== 'Applet');
            var SelectionMayBeShiftedUp = memoized('selectedComponentsMayBeShiftedUp');
            var SelectionMayBeShiftedDown = memoized('selectedComponentsMayBeShiftedDown');
            setEnablingOf(this.LayerToTopButton, SelectionMayBeShiftedDown && (Mode !== 'Applet'));
            setEnablingOf(this.LayerUpButton, SelectionMayBeShiftedDown && (Mode !== 'Applet'));
            setEnablingOf(this.LayerDownButton, SelectionMayBeShiftedUp && (Mode !== 'Applet'));
            setEnablingOf(this.LayerToBottomButton, SelectionMayBeShiftedUp && (Mode !== 'Applet'));
            refreshNumericInput(this.BorderLeftWidthInput, Configuration.BorderWidths[3]);
            refreshDropDown(this.BorderLeftStyleInput, Configuration.BorderStyles[3]);
            refreshColorInput(this.BorderLeftColorInput, Configuration.BorderColors[3]);
            refreshNumericInput(this.BorderTopWidthInput, Configuration.BorderWidths[0]);
            refreshDropDown(this.BorderTopStyleInput, Configuration.BorderStyles[0]);
            refreshColorInput(this.BorderTopColorInput, Configuration.BorderColors[0]);
            refreshNumericInput(this.BorderRightWidthInput, Configuration.BorderWidths[1]);
            refreshDropDown(this.BorderRightStyleInput, Configuration.BorderStyles[1]);
            refreshColorInput(this.BorderRightColorInput, Configuration.BorderColors[1]);
            refreshNumericInput(this.BorderBottomWidthInput, Configuration.BorderWidths[2]);
            refreshDropDown(this.BorderBottomStyleInput, Configuration.BorderStyles[2]);
            refreshColorInput(this.BorderBottomColorInput, Configuration.BorderColors[2]);
            refreshNumericInput(this.BorderRadiusTLInput, Configuration.BorderRadii[0]);
            refreshNumericInput(this.BorderRadiusTRInput, Configuration.BorderRadii[1]);
            refreshNumericInput(this.BorderRadiusBRInput, Configuration.BorderRadii[2]);
            refreshNumericInput(this.BorderRadiusBLInput, Configuration.BorderRadii[3]);
            refreshCheckbox(this.BackgroundInput, Configuration.BackgroundColor !== '#00000000');
            if (Configuration.BackgroundColor === '#00000000') {
                refreshColorInput(this.BackgroundColorInput, switchedOff);
            }
            else {
                refreshColorInput(this.BackgroundColorInput, Configuration.BackgroundColor);
            }
            refreshCheckbox(this.BackgroundTextureInput, Configuration.BackgroundTexture !== 'none');
            if (Configuration.BackgroundTexture === 'none') {
                refreshLiteralInput(this.BackgroundImageURLInput, switchedOff);
                refreshDropDown(this.BackgroundModeInput, switchedOff);
                refreshNumericInput(this.BackgroundOffsetXInput, switchedOff);
                refreshNumericInput(this.BackgroundOffsetYInput, switchedOff);
            }
            else {
                refreshLiteralInput(this.BackgroundImageURLInput, Configuration.BackgroundTexture.ImageURL);
                refreshDropDown(this.BackgroundModeInput, Configuration.BackgroundTexture.Mode);
                refreshNumericInput(this.BackgroundOffsetXInput, Configuration.BackgroundTexture.xOffset);
                refreshNumericInput(this.BackgroundOffsetYInput, Configuration.BackgroundTexture.yOffset);
            }
            refreshLiteralInput(this.FontFamilyInput, Configuration.FontFamily);
            refreshNumericInput(this.FontSizeInput, Configuration.FontSize);
            refreshDropDown(this.FontWeightInput, Configuration.FontWeight);
            refreshCheckbox(this.FontItalicInput, (Configuration.FontStyle === 'italic'));
            refreshColorInput(this.ForegroundColorInput, Configuration.ForegroundColor);
            refreshCheckbox(this.TextDecorationInput, Configuration.TextDecoration !== 'none');
            if (Configuration.TextDecoration === 'none') {
                refreshDropDown(this.TextDecorationLineInput, switchedOff);
                refreshDropDown(this.TextDecorationStyleInput, switchedOff);
                refreshColorInput(this.TextDecorationColorInput, switchedOff);
            }
            else {
                refreshDropDown(this.TextDecorationLineInput, Configuration.TextDecoration.Line);
                refreshDropDown(this.TextDecorationStyleInput, Configuration.TextDecoration.Style);
                refreshColorInput(this.TextDecorationColorInput, Configuration.TextDecoration.Color);
            }
            refreshCheckbox(this.TextShadowInput, Configuration.TextShadow !== 'none');
            if (Configuration.TextShadow === 'none') {
                refreshColorInput(this.TextShadowColorInput, switchedOff);
                refreshNumericInput(this.TextShadowOffsetXInput, switchedOff);
                refreshNumericInput(this.TextShadowOffsetYInput, switchedOff);
                refreshNumericInput(this.TextShadowBlurRadiusInput, switchedOff);
            }
            else {
                refreshColorInput(this.TextShadowColorInput, Configuration.TextShadow.Color);
                refreshNumericInput(this.TextShadowOffsetXInput, Configuration.TextShadow.xOffset);
                refreshNumericInput(this.TextShadowOffsetYInput, Configuration.TextShadow.yOffset);
                refreshNumericInput(this.TextShadowBlurRadiusInput, Configuration.TextShadow.BlurRadius);
            }
            refreshNumericInput(this.LineHeightInput, Configuration.LineHeight);
            refreshDropDown(this.TextAlignmentInput, Configuration.TextAlignment);
            refreshCheckbox(this.ShadowInput, Configuration.BoxShadow !== 'none');
            if (Configuration.BoxShadow === 'none') {
                refreshDropDown(this.ShadowDirectionInput, switchedOff);
                refreshColorInput(this.ShadowColorInput, switchedOff);
                refreshNumericInput(this.ShadowOffsetXInput, switchedOff);
                refreshNumericInput(this.ShadowOffsetYInput, switchedOff);
                refreshNumericInput(this.ShadowBlurRadiusInput, switchedOff);
                refreshNumericInput(this.ShadowSpreadRadiusInput, switchedOff);
            }
            else {
                refreshDropDown(this.ShadowDirectionInput, Configuration.BoxShadow.isInset ? 'inwards' : 'outwards');
                refreshColorInput(this.ShadowColorInput, Configuration.BoxShadow.Color);
                refreshNumericInput(this.ShadowOffsetXInput, Configuration.BoxShadow.xOffset);
                refreshNumericInput(this.ShadowOffsetYInput, Configuration.BoxShadow.yOffset);
                refreshNumericInput(this.ShadowBlurRadiusInput, Configuration.BoxShadow.BlurRadius);
                refreshNumericInput(this.ShadowSpreadRadiusInput, Configuration.BoxShadow.SpreadRadius);
            }
            refreshDropDown(this.CursorTypeInput, Configuration.Cursor);
            refreshCheckbox(this.CursorInput, Configuration.customCursor !== 'none');
            if (Configuration.customCursor === 'none') {
                refreshLiteralInput(this.CursorImageURLInput, switchedOff);
                refreshNumericInput(this.CursorOffsetXInput, switchedOff);
                refreshNumericInput(this.CursorOffsetYInput, switchedOff);
            }
            else {
                refreshLiteralInput(this.CursorImageURLInput, Configuration.customCursor.ImageURL);
                refreshNumericInput(this.CursorOffsetXInput, Configuration.customCursor.xOffset);
                refreshNumericInput(this.CursorOffsetYInput, Configuration.customCursor.yOffset);
            }
        };
        /**** MarkupForPropertyView ****/
        WAD_ConfigurationDialog.prototype.MarkupForPropertyView = function (PropertySpec) {
            var PropertyName = PropertySpec.Name;
            var isReadOnly = (PropertySpec.isReadOnly == true);
            var Result = ('<div name="LabelView" class="WAD-StandardGroupLabel">' +
                HTMLsafe(PropertySpec.Label) +
                '</div>');
            var InputType, InputClass, InputPattern;
            switch (PropertySpec.EditorType) {
                case 'checkbox':
                    Result += ('<label class="WAD-StandardGroupCheckbox" style="flex:0 0 auto;">' +
                        '<input name="custom' + PropertyName + 'Input" type="checkbox" ' +
                        'class="WAD-customInput"' +
                        (isReadOnly ? ' disabled' : '') +
                        '>' +
                        '<div class="WAD-styledCheckmark"></div>' +
                        '</label>');
                    break;
                case 'choice': // drop-down for boolean properties
                    Result += ('<div class="WAD-StandardGroupDropDown">' +
                        '<select name="custom' + PropertyName + 'Input" ' +
                        'class="WAD-customInput WAD-stylableContent WAD-styledDropDown"' +
                        (isReadOnly ? ' disabled' : '') +
                        ' style="text-align:right">' +
                        '<option>' + HTMLsafe(PropertySpec.FalseValue) + '</option>' +
                        '<option>' + HTMLsafe(PropertySpec.TrueValue) + '</option>' +
                        '</select>' +
                        '</div>');
                    break;
                case 'textline-input':
                    InputType = 'text';
                    InputClass = 'WAD-customInput WAD-styledTextlineInput';
                case 'password-input':
                    InputType = InputType || 'password';
                    InputClass = InputClass || 'WAD-customInput WAD-styledPasswordInput';
                case 'email-address-input':
                    InputType = InputType || 'email';
                    InputClass = InputClass || 'WAD-customInput WAD-styledEMailAddressInput';
                case 'phone-number-input':
                    InputType = InputType || 'tel';
                    InputClass = InputClass || 'WAD-customInput WAD-styledPhoneNumberInput';
                case 'url-input':
                    InputType = InputType || 'url';
                    InputClass = InputClass || 'WAD-customInput WAD-styledURLInput';
                case 'search-input':
                    InputType = InputType || 'search';
                    InputClass = InputClass || 'WAD-customInput WAD-styledSearchInput';
                    Result += ('<div class="WAD-StandardGroupTextlineInput">' +
                        '<input name="custom' + PropertyName + 'Input" type="' + InputType + '" ' +
                        'class="WAD-customInput WAD-stylableContent ' + InputClass + '"' +
                        (isReadOnly ? ' readonly' : ''));
                    if (ValueIsFiniteNumber(PropertySpec.minLength)) {
                        Result += ' minlength="' + PropertySpec.minLength + '"';
                    }
                    if (ValueIsFiniteNumber(PropertySpec.maxLength)) {
                        Result += ' maxlength="' + PropertySpec.maxLength + '"';
                    }
                    if (ValueIsBoolean(PropertySpec.multiple)) {
                        Result += ' multiple';
                    }
                    if (ValueIsString(PropertySpec.Pattern)) {
                        Result += ' pattern="' + escaped(PropertySpec.Pattern) + '"';
                    }
                    Result += ('>' +
                        '</div>');
                    break;
                case 'number-input':
                    Result += ('<div class="WAD-StandardGroupNumberInput">' +
                        '<input name="custom' + PropertyName + 'Input" type="number" ' +
                        'class="WAD-customInput WAD-stylableContent WAD-styledNumberInput"' +
                        (isReadOnly ? ' readonly' : ''));
                    if (ValueIsFiniteNumber(PropertySpec.minValue)) {
                        Result += ' min="' + PropertySpec.minValue + '"';
                    }
                    if (ValueIsFiniteNumber(PropertySpec.maxValue)) {
                        Result += ' max="' + PropertySpec.maxValue + '"';
                    }
                    if (ValueIsFiniteNumber(PropertySpec.StepValue)) {
                        Result += ' step="' + PropertySpec.StepValue + '"';
                    }
                    Result += ('>' +
                        '</div>');
                    break;
                case 'time-input':
                    Result += ('<div class="WAD-StandardGroupTextlineInput">' +
                        '<input name="custom' + PropertyName + 'Input" type="time" ' +
                        'class="WAD-customInput WAD-stylableContent WAD-styledTimeInput"' +
                        (isReadOnly ? ' disabled' : '') + 'pattern="[0-9]{2}:[0-9]{2}"');
                    if (ValueIsFiniteNumber(PropertySpec.StepValue)) {
                        Result += ' step="' + PropertySpec.StepValue + '"';
                    }
                    Result += ('>' +
                        '</div>');
                    break;
                case 'date-time-input':
                    InputType = 'datetime-local';
                    InputClass = 'WAD-customInput WAD-styledDateTimeInput';
                    InputPattern = '[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}';
                case 'date-input':
                    InputType = InputType || 'date';
                    InputClass = InputClass || 'WAD-customInput WAD-styledDateInput';
                    InputPattern = InputPattern || '[0-9]{4}-[0-9]{2}-[0-9]{2}';
                case 'month-input':
                    InputType = InputType || 'month';
                    InputClass = InputClass || 'WAD-customInput WAD-styledMonthInput';
                    InputPattern = InputPattern || '[0-9]{4}-[0-9]{2}';
                case 'week-input':
                    InputType = InputType || 'week';
                    InputClass = InputClass || 'WAD-customInput WAD-styledWeekInput';
                    InputPattern = InputPattern || '[0-9]{4}-W[0-9]{2}';
                    Result += ('<div class="WAD-StandardGroupTextlineInput">' +
                        '<input name="custom' + PropertyName + 'Input" type="' + InputType + '" ' +
                        'class="WAD-customInput WAD-stylableContent ' + InputClass + '"' +
                        (isReadOnly ? ' disabled' : '') + 'pattern="' + InputPattern + '"');
                    if (ValueIsString(PropertySpec.minValue)) {
                        Result += ' min="' + escaped(PropertySpec.minValue) + '"';
                    }
                    if (ValueIsString(PropertySpec.maxValue)) {
                        Result += ' max="' + escaped(PropertySpec.maxValue) + '"';
                    }
                    if (ValueIsFiniteNumber(PropertySpec.StepValue)) {
                        Result += ' step="' + PropertySpec.StepValue + '"';
                    }
                    Result += ('>' +
                        '</div>');
                    break;
                case 'color-input':
                    Result += ('<div class="WAD-StandardGroupColorInput">' +
                        '<input name="custom' + PropertyName + 'Input" type="color" ' +
                        'class="WAD-customInput WAD-stylableContent WAD-styledColorInput"' +
                        (isReadOnly ? ' disabled' : '') +
                        '>' +
                        '<div name="ColorIndicator" class="WAD-Pointerless WAD-ColorIndicator"></div>' +
                        '</div>');
                    break;
                case 'drop-down':
                    Result += ('<div class="WAD-StandardGroupDropDown">' +
                        '<select name="custom' + PropertyName + 'Input" ' +
                        'class="WAD-customInput WAD-stylableContent WAD-styledDropDown"' +
                        (isReadOnly ? ' disabled' : '') +
                        ' style="text-align:right">');
                    var ValueList = PropertySpec.ValueList || [];
                    for (var i = 0, l = ValueList.length; i < l; i++) {
                        Result += '<option>' + HTMLsafe(ValueList[i]) + '</option>';
                    }
                    Result += ('</select>' +
                        '</div>');
                    break;
                case 'slider':
                    Result += ('<div class="WAD-StandardGroupTextlineInput">' +
                        '<input name="custom' + PropertyName + 'Input" type="range" ' +
                        'class="WAD-customInput WAD-styledSlider"' +
                        (isReadOnly ? ' disabled' : ''));
                    if (ValueIsFiniteNumber(PropertySpec.minValue)) {
                        Result += ' min="' + PropertySpec.minValue + '"';
                    }
                    if (ValueIsFiniteNumber(PropertySpec.maxValue)) {
                        Result += ' max="' + PropertySpec.maxValue + '"';
                    }
                    if (ValueIsFiniteNumber(PropertySpec.StepValue)) {
                        Result += ' step="' + PropertySpec.StepValue + '"';
                    }
                    Result += ('>' +
                        '</div>');
                    break;
                case 'text-input':
                case 'html-input':
                case 'css-input':
                case 'javascript-input':
                case 'json-input':
                    Result += ('<div class="WAD-largeGroupTextInput">' +
                        '<textarea name="custom' + PropertyName + 'Input" ' +
                        'class="WAD-customInput WAD-stylableContent WAD-styledTextInput"' +
                        (isReadOnly ? ' disabled' : ''));
                    if (ValueIsFiniteNumber(PropertySpec.minLength)) {
                        Result += ' minlength="' + PropertySpec.minLength + '"';
                    }
                    if (ValueIsFiniteNumber(PropertySpec.maxLength)) {
                        Result += ' maxlength="' + PropertySpec.maxLength + '"';
                    }
                    Result += ('></textarea>' +
                        '</div>');
                    break;
                case 'linelist-input':
                    Result += ('<div class="WAD-largeGroupTextInput">' +
                        '<textarea name="custom' + PropertyName + 'Input" ' +
                        'class="WAD-customInput WAD-stylableContent WAD-styledTextInput WAD-LineListInput"' +
                        (isReadOnly ? ' disabled' : '') +
                        '></textarea>' +
                        '</div>');
                    break;
                case 'numberlist-input':
                    Result += ('<div class="WAD-largeGroupTextInput">' +
                        '<textarea name="custom' + PropertyName + 'Input" ' +
                        'class="WAD-customInput WAD-stylableContent WAD-styledTextInput WAD-NumberListInput"' +
                        (isReadOnly ? ' disabled' : '') +
                        '></textarea>' +
                        '</div>');
                    break;
                default:
                    console.error('invalid EditorType', PropertySpec.EditorType, 'for Property', PropertyName);
            }
            return Result;
        };
        /**** refreshPropertyView ****/
        WAD_ConfigurationDialog.prototype.refreshPropertyView = function (Element, PropertySpec, PropertyValue) {
            var PropertyName = PropertySpec.Name;
            switch (PropertySpec.EditorType) {
                case 'checkbox':
                    refreshCheckbox(Element, PropertyValue);
                    break;
                case 'choice':
                    refreshDropDown(Element, PropertyValue === false ? PropertySpec.FalseValue
                        : (PropertyValue === true ? PropertySpec.TrueValue
                            : PropertyValue));
                    break;
                case 'number-input':
                case 'slider':
                    refreshNumericInput(Element, PropertyValue);
                    break;
                case 'color-input':
                    refreshColorInput(Element, PropertyValue);
                    break;
                case 'linelist-input':
                    if (ValueIsArray(PropertyValue)) {
                        PropertyValue = PropertyValue.join('\n');
                    }
                    refreshLiteralInput(Element, PropertyValue);
                    break;
                case 'numberlist-input':
                    if (ValueIsArray(PropertyValue)) {
                        PropertyValue = PropertyValue.map(function (Element) { return Element.toString(); }).join('\n');
                    }
                    refreshLiteralInput(Element, PropertyValue);
                    break;
                default:
                    refreshLiteralInput(Element, PropertyValue);
            }
        };
        WAD_ConfigurationDialog.prototype.refreshCustomPropertyGroup = function () {
            var _this = this;
            var PropertySpecs = memoized('selectedComponentsCustomPropertySpecs');
            switch (PropertySpecs) {
                case noSelection:
                    this.oldPropertySpecs = PropertySpecs;
                    this.customGroup.children().slice(2).remove();
                    this.customGroupPlaceholder.css('display', 'block');
                    this.customGroupPlaceholder.text('(no selection)');
                    return;
                case mixedValues:
                    this.oldPropertySpecs = PropertySpecs;
                    this.customGroup.children().slice(2).remove();
                    this.customGroupPlaceholder.css('display', 'block');
                    this.customGroupPlaceholder.text('(mixed custom properties)');
                    return;
                case switchedOff:
                    this.oldPropertySpecs = PropertySpecs;
                    this.customGroup.children().slice(2).remove();
                    this.customGroupPlaceholder.css('display', 'block');
                    this.customGroupPlaceholder.text('(no custom properties)');
                    return;
            }
            /**** if need be: rebuild property views ****/
            if (ValuesDiffer(this.oldPropertySpecs, PropertySpecs)) {
                this.oldPropertySpecs = PropertySpecs;
                this.customGroup.children().slice(2).remove();
                this.customGroupPlaceholder.css('display', 'none');
                PropertySpecs.forEach(function (PropertySpec) {
                    var PropertyView = $('<div class="WAD-GroupLine"></div>');
                    PropertyView.data('wad-property-spec', PropertySpec);
                    PropertyView.html(_this.MarkupForPropertyView(PropertySpec));
                    if (PropertyView.children().eq(1).hasClass('WAD-largeGroupTextInput')) {
                        PropertyView.addClass('WAD-largeGroupLine');
                    }
                    _this.customGroup.append(PropertyView);
                });
            }
            /**** refresh property view contents ****/
            var PropertyValues = memoized('selectedComponentsCustomPropertyValues');
            this.customGroup.children().slice(2).each(function (Index, Element) {
                var PropertyView = $(Element).find('.WAD-customInput').first();
                _this.refreshPropertyView(PropertyView, PropertySpecs[Index], PropertyValues[Index]);
            });
        };
        /**** Message Handling ****/
        WAD_ConfigurationDialog.prototype.clearError = function () { this.showMessage('', 'Error'); };
        WAD_ConfigurationDialog.prototype.clearMessage = function (MessageType) {
            this.showMessage('', MessageType);
        };
        WAD_ConfigurationDialog.prototype.showError = function (Message) {
            this.showMessage(Message, 'Error');
        };
        WAD_ConfigurationDialog.prototype.showMessage = function (Message, MessageType) {
            var MessageView = this.MessageView;
            var currentMessageType = MessageView.data('wad-message-type');
            if (MessageType === 'Error') {
                if (Message === '') {
                    MessageType = null;
                }
                MessageView.val(Message);
                MessageView.data('wad-message-type', MessageType);
                if (MessageType === 'Error') {
                    MessageView.addClass('WAD-invalidInput');
                }
                else {
                    MessageView.removeClass('WAD-invalidInput');
                }
            }
        };
        return WAD_ConfigurationDialog;
    }(WAD_Dialog));
    var ConfigurationDialog = new WAD_ConfigurationDialog();
    //----------------------------------------------------------------------------//
    //                               Script Editor                                //
    //----------------------------------------------------------------------------//
    var WAD_ScriptEditor = /** @class */ (function (_super) {
        __extends(WAD_ScriptEditor, _super);
        function WAD_ScriptEditor() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.pendingUpdatesFromInside = 2; // weird "onUpdate" workaround
            _this.pendingUserEdits = false; // prevents edits from being overwritten
            return _this;
        }
        /**** build (and configure) ****/
        WAD_ScriptEditor.prototype.build = function () {
            this.Peer = $("\n<div id=\"WAD-ScriptEditor\" class=\"WAD Dialog WAD-Draggable\" style=\"\n  display:none; width:300px; height:400px; min-width:120px; min-height:80px;\n\">\n  <div name=\"Titlebar\" class=\"WAD WAD-Titlebar WAD-Dragger\">\n    <div name=\"Title\"       class=\"WAD WAD-Title\">WAT Script Editor</div>\n    <div name=\"CloseButton\" class=\"WAD WAD-Dialog-CloseButton\">\n      <div class=\"WAD-CloseButtonIcon\"></div>\n    </div>\n  </div>\n    <div style=\"\n      display:flex; flex-flow:row nowrap; align-items:center; flex:0 0 auto;\n      padding-left:4px; padding-right:2px; height:32px;\n    \">\n      <div style=\"\n        display:block; position:relative; flex:1 0 auto;\n        width:60px; height:24px; line-height:24px;\n      \"><span name=\"ModeView\">Visual</span> Script:</div>\n\n      <button name=\"ScriptApplyButton\" class=\"WAD WAD-stylableContent WAD-smallOkIcon\"></button>\n      <div style=\"width:20px\"></div>\n      <button name=\"ScriptWithdrawButton\" class=\"WAD WAD-stylableContent WAD-smallCancelIcon\"></button>\n    </div>\n\n    <div style=\"\n      display:block; position:relative; flex:1 1 auto;\n    \">\n      <textarea name=\"ScriptInput\" class=\"WAD WAD-stylableContent WAD-styledTextInput\" style=\"\n        resize:none; white-space:pre;\n      \" placeholder=\"(no Script content)\"></textarea>\n    </div>\n  <div style=\"display:block; position:relative; height:32px\">\n    <div style=\"\n      display:block; position:absolute;\n      left:2px; bottom:0px; right:32px; height:32px;\n      overflow:hidden; text-overflow:ellipsis;\n    \">\n      <input name=\"MessageView\" type=\"text\" class=\"WAD WAD-stylableContent WAD-styledTextlineInput\" style=\"\n        background:transparent; border:none; text-align:left\n      \" readonly value=\"(room for messages)\">\n    </div>\n\n    <div name=\"SizeHandle\" class=\"WAD WAD-Dialog-ResizeHandle WAD-Dragger\" style=\"\n      right:0px; bottom:0px; width:32px; height:32px;\n      cursor:nwse-resize\n    \" size-direction=\"se\"></div>\n  </div>\n</div>\n\n      ".trim()).hide();
            $(document.body).append(this.Peer);
            this.configureDialog();
            this.configureCloseButton();
            this.cacheNamedElements();
            /*
                  this.ScriptInput.replaceWith('<div name="ScriptInput"></div>')
                  this.ScriptInput = this.Peer.find('[name="ScriptInput"]')
            
                  this.CodeFlask = new CodeFlask(this.ScriptInput[0],{ language:'js', lineNumbers:true })
            */
            this.defineElementBehaviours();
        };
        /**** define element behaviours ****/
        WAD_ScriptEditor.prototype.defineElementBehaviours = function () {
            var _this = this;
            /*
                  this.CodeFlask.onUpdate((Code:string) => {// also triggered by "updateCode"
                    if (memoized('chosenApplet') == null) { return }
            
                    ScriptEditor.clearError()
                    tryTo(() => {
                      let actualScript = memoized('selected' + this.Mode + 'sScript')
                      if (ValueIsString(actualScript) && (actualScript !== Code)) {
                        switch (this.Mode) {
                          case 'Applet':    doSetPendingScriptOfSelectedAppletsTo(Code); break
                          case 'Card':      doSetPendingScriptOfSelectedCardsTo(Code);   break
                          case 'Component': doSetPendingScriptOfSelectedComponentsTo(Code)
                        }
                        this.pendingUserEdits = true
                      }
                    })
                  })
            */
            this.ScriptInput.on('input', function () {
                if (memoized('chosenApplet') == null) {
                    return;
                }
                var Code = ScriptEditor.ScriptInput.val();
                ScriptEditor.clearError();
                tryTo(function () {
                    var actualScript = memoized('selected' + _this.Mode + 'sScript');
                    if (ValueIsString(actualScript) && (actualScript !== Code)) {
                        switch (_this.Mode) {
                            case 'Applet':
                                doSetPendingScriptOfSelectedAppletsTo(Code);
                                break;
                            case 'Card':
                                doSetPendingScriptOfSelectedCardsTo(Code);
                                break;
                            case 'Component': doSetPendingScriptOfSelectedComponentsTo(Code);
                        }
                        _this.pendingUserEdits = true;
                    }
                });
            });
            this.ScriptApplyButton.on('click', function () {
                var activeScript = memoized('selected' + _this.Mode + 'sActiveScript');
                var pendingScript = memoized('selected' + _this.Mode + 'sPendingScript');
                if (ValueIsString(pendingScript) && (pendingScript !== activeScript)) {
                    ScriptEditor.clearError();
                    tryTo(function () {
                        switch (_this.Mode) {
                            case 'Applet':
                                doApplyPendingScriptOfSelectedApplets();
                                break;
                            case 'Card':
                                doApplyPendingScriptOfSelectedCards();
                                break;
                            case 'Component': doApplyPendingScriptOfSelectedComponents();
                        }
                        _this.pendingUserEdits = false;
                        Ticker.tickNow();
                    });
                }
            });
            this.ScriptWithdrawButton.on('click', function () {
                ScriptEditor.clearError();
                var Script = memoized('selected' + _this.Mode + 'sScript');
                if (!ValueIsString(Script)) {
                    Script = '';
                }
                _this.CodeFlask.updateCode(Script);
                _this.pendingUserEdits = false;
                Ticker.tickNow();
            });
            /**** tryTo ****/
            function tryTo(Applicator) {
                try {
                    Applicator();
                }
                catch (Signal) {
                    ScriptEditor.showError(Signal.toString().replace(/^[^:]*:/, ''));
                }
            }
        };
        /**** close (specific implementation) ****/
        WAD_ScriptEditor.prototype.close = function () {
            //    this.CodeFlask.updateCode('')
            this.ScriptInput.val('');
            this.pendingUserEdits = false;
            this.hide();
        }; /**** onTick ****/
        WAD_ScriptEditor.prototype.onTick = function () {
            if (chosenDesignerInfo == null) {
                this.close();
                return;
            }
            var SelectionHasChanged = memoized('selected' + this.Mode + 'sHaveChanged');
            if (SelectionHasChanged) {
                this.pendingUserEdits = false;
            }
            var actualScript = memoized('selected' + this.Mode + 'sScript');
            if (!ValueIsString(actualScript) && !this.pendingUserEdits) {
                //      this.CodeFlask.updateCode('')
                this.ScriptInput.val('');
                this.hide();
                return;
            }
            //    let shownScript = this.CodeFlask.getCode()
            var shownScript = this.ScriptInput.val();
            if (ValueIsString(actualScript) && (actualScript !== shownScript) &&
                !this.pendingUserEdits) {
                //      this.CodeFlask.updateCode(actualScript)
                this.ScriptInput.val(actualScript);
            }
            var activeScript = memoized('selected' + this.Mode + 'sActiveScript');
            var mayBeApplied = (activeScript !== shownScript);
            setEnablingOf(this.ScriptApplyButton, mayBeApplied);
            setEnablingOf(this.ScriptWithdrawButton, mayBeApplied);
        };
        WAD_ScriptEditor.prototype.setMode = function (newMode) {
            if (this.Mode !== newMode) {
                this.Mode = newMode;
                this.ModeView.text(newMode);
                if (this.isVisible) {
                    this.pendingUserEdits = false;
                    this.onTick();
                }
            }
        };
        /**** Message Handling ****/
        WAD_ScriptEditor.prototype.clearError = function () { this.showMessage('', 'Error'); };
        WAD_ScriptEditor.prototype.clearMessage = function (MessageType) {
            this.showMessage('', MessageType);
        };
        WAD_ScriptEditor.prototype.showError = function (Message) {
            this.showMessage(Message, 'Error');
        };
        WAD_ScriptEditor.prototype.showMessage = function (Message, MessageType) {
            var MessageView = this.MessageView;
            var currentMessageType = MessageView.data('wad-message-type');
            if (MessageType === 'Error') {
                if (Message === '') {
                    MessageType = null;
                }
                MessageView.val(Message);
                MessageView.data('wad-message-type', MessageType);
                if (MessageType === 'Error') {
                    MessageView.addClass('WAD-invalidInput');
                }
                else {
                    MessageView.removeClass('WAD-invalidInput');
                }
            }
        };
        return WAD_ScriptEditor;
    }(WAD_Dialog));
    var ScriptEditor = new WAD_ScriptEditor();
    /**** setEnablingOf ****/
    function setEnablingOf(Element, enabled) {
        var disabled = !enabled;
        if (Element.prop('disabled') !== disabled) {
            Element.prop('disabled', disabled);
        }
    }
    /**** setActivationOf ****/
    function setActivationOf(Element, active) {
        if (active) {
            if (Element.attr('active') == null) {
                Element.attr('active', 'active');
            }
        }
        else {
            if (Element.attr('active') != null) {
                Element.removeAttr('active');
            }
        }
    }
    /**** refreshCheckbox ****/
    function refreshCheckbox(Element, Value) {
        switch (Value) {
            case noSelection:
                Element.prop('checked', false);
                Element.prop('indeterminate', false);
                setEnablingOf(Element, false);
                break;
            case mixedValues:
                Element.prop('checked', false);
                Element.prop('indeterminate', false);
                setEnablingOf(Element, true);
                break;
            case switchedOff:
                Element.prop('checked', false);
                Element.prop('indeterminate', false);
                setEnablingOf(Element, false);
                break;
            case false:
            case true:
                Element.prop('checked', Value);
                setEnablingOf(Element, true);
        }
    }
    /**** refreshDropDown ****/
    function refreshDropDown(Element, Value) {
        switch (Value) {
            case noSelection:
                Element.val(null);
                setEnablingOf(Element, false);
                break;
            case mixedValues:
                Element.val(null);
                setEnablingOf(Element, true);
                break;
            case switchedOff:
                Element.val(null);
                setEnablingOf(Element, false);
                break;
            default:
                Element.val(Value);
                setEnablingOf(Element, true);
        }
    }
    /**** refreshLiteralInput ****/
    function refreshLiteralInput(Element, Value, Placeholder) {
        switch (Value) {
            case noSelection:
                Element.val(null);
                Element.attr('placeholder', '(no selection)');
                setEnablingOf(Element, false);
                break;
            case mixedValues:
                Element.val(null);
                Element.attr('placeholder', '(mixed values)');
                setEnablingOf(Element, true);
                break;
            case switchedOff:
                Element.val(null);
                Element.attr('placeholder', '(n/a)');
                setEnablingOf(Element, false);
                break;
            default:
                if (!Element.is(':focus')) {
                    Element.val(Value);
                    if (Placeholder == null) {
                        Element.removeAttr('placeholder');
                    }
                    else {
                        Element.attr('placeholder', Placeholder);
                    }
                }
                setEnablingOf(Element, true);
        }
    }
    /**** refreshNumericInput ****/
    function refreshNumericInput(Element, Value) {
        switch (Value) {
            case noSelection:
                Element.val(null);
                Element.attr('placeholder', '(no selection)');
                setEnablingOf(Element, false);
                break;
            case mixedValues:
                Element.val(null);
                Element.attr('placeholder', '(mixed values)');
                setEnablingOf(Element, true);
                break;
            case switchedOff:
                Element.val(null);
                Element.attr('placeholder', '(n/a)');
                setEnablingOf(Element, false);
                break;
            default:
                if (!Element.is(':focus')) {
                    Element.val(isFinite(Value) ? Value : '');
                    Element.removeAttr('placeholder');
                }
                setEnablingOf(Element, true);
        }
    }
    /**** refreshColorInput ****/
    function refreshColorInput(Element, Value) {
        switch (Value) {
            case null:
            case undefined:
            case noSelection:
                Element.val('#000000');
                setEnablingOf(Element, false);
                break;
            case mixedValues:
                Element.val('#000000');
                setEnablingOf(Element, true);
                break;
            case switchedOff:
                Element.val('#000000');
                setEnablingOf(Element, false);
                break;
            default:
                if (!Element.is(':focus')) {
                    Element.val(Value.slice(0, 7));
                }
                setEnablingOf(Element, true);
        }
    }
    /**** refreshStateButton ****/
    function refreshStateButton(Element, Value) {
        switch (Value) {
            case noSelection:
                setActivationOf(Element, false);
                setEnablingOf(Element, false);
                break;
            case mixedValues:
                setActivationOf(Element, false);
                setEnablingOf(Element, true);
                break;
            case switchedOff:
                setActivationOf(Element, false);
                setEnablingOf(Element, false);
                break;
            case false:
            case true:
                setActivationOf(Element, Value);
                setEnablingOf(Element, true);
        }
    }
    //----------------------------------------------------------------------------//
    //                          DesignerButton Handling                           //
    //----------------------------------------------------------------------------//
    /**** createDesignerButtonForApplet ****/
    function createDesignerButtonForApplet(Applet) {
        var DesignerButton = $('<div class="WAD-DesignerButton WAD-Dragger WAD-Draggable"></div>');
        DesignerButton.data('wad-applet', Applet);
        DesignerButton.data('wad-offsets', [-4, 4]);
        DesignerButton.on('click', function () {
            var BoundingBox = DesignerButton[0].getBoundingClientRect();
            startDesigning(Applet, undefined, BoundingBox.left, BoundingBox.top);
        });
        DesignerLayer.append(DesignerButton);
        positionDesignerButton(DesignerButton, Applet);
    }
    /**** updateDesignerButtons ****/
    function updateDesignerButtons() {
        var chosenApplet = (chosenDesignerInfo == null
            ? undefined
            : chosenDesignerInfo.chosenApplet);
        DesignerLayer.children('.WAD-DesignerButton').each(function () {
            var DesignerButton = $(this);
            var Applet = DesignerButton.data('wad-applet');
            if (!ValueIsApplet(Applet) || !Applet.isAttached) {
                DesignerButton.remove();
                return;
            }
            if (Applet === chosenApplet) {
                DesignerButton.hide();
            }
            else {
                DesignerButton.show();
                positionDesignerButton(DesignerButton, Applet);
            }
        });
    }
    /**** positionDesignerButton ****/
    var DesignerButtonWidth = 32;
    var DesignerButtonHeight = 32;
    function positionDesignerButton(DesignerButton, Applet) {
        var _a = DesignerButton.data('wad-offsets'), OffsetX = _a[0], OffsetY = _a[1];
        var AppletPeer = $(Applet.Peer);
        var AppletPosition = AppletPeer.offset();
        var AppletWidth = AppletPeer.outerWidth();
        var Body = $(document.body);
        var BodyWidth = Body.width(), BodyHeight = Body.height();
        var ButtonX = Math.max(Math.min(AppletPosition.left + AppletWidth - DesignerButtonWidth + OffsetX, BodyWidth), 0);
        var ButtonY = Math.max(Math.min(AppletPosition.top + OffsetY, BodyHeight - DesignerButtonHeight), 0);
        DesignerButton.css({ left: ButtonX + 'px', top: ButtonY + 'px' });
        DesignerButton.data('wad-offsets', [
            ButtonX - (AppletPosition.left + AppletWidth) + DesignerButtonWidth,
            ButtonY - AppletPosition.top
        ]);
    }
    /**** startDesigning ****/
    function startDesigning(Visual, Property, x, y) {
        expectVisual('visual to be designed', Visual);
        allowIdentifier('property identifier', Property);
        allowFiniteNumber('x coordinate', x);
        allowFiniteNumber('y coordinate', y);
        chosenDesignerInfo = DesignerInfoOfApplet(Visual.Applet);
        switch (true) {
            case ValueIsApplet(Visual):
                chooseContainer(Visual.visibleCard);
                break;
            case ValueIsContainer(Visual):
                chooseContainer(Visual);
                break;
            default:
                chooseContainer(Visual.Container);
                selectComponent(Visual);
        }
        if (chosenDesignerInfo.inLayoutMode) {
            Layouter.startLayouting();
        }
        Toolbox.showAround(x, y);
        if (Property != null) {
            var Mode = void 0;
            switch (true) {
                case ValueIsApplet(Visual):
                    Mode = 'Applet';
                    break;
                case ValueIsCard(Visual):
                    Mode = 'Card';
                    break;
                default: Mode = 'Component';
            }
            if (Property === 'Script') {
                ScriptEditor.setMode(Mode);
                ScriptEditor.showAround(x, y);
            }
            else {
                ConfigurationDialog.setMode(Mode);
                ConfigurationDialog.showAround(x, y);
            }
        }
        Ticker.tickNow();
    }
    /**** stopDesigning ****/
    function stopDesigning() {
        chosenDesignerInfo = null;
        Toolbox.hide();
        Ticker.tickNow();
    }
    //----------------------------------------------------------------------------//
    //                                WAD Start-Up                                //
    //----------------------------------------------------------------------------//
    var DesignerLayer;
    WAT(function WAD_Startup() {
        DesignerLayer = $('<div id="WAD-DesignerLayer"></div>');
        $(document.body).append(DesignerLayer);
        /**** updateDesignerLayer - let it cover really EVERYTHING ****/
        function updateDesignerLayer() {
            var boundingRect = DesignerLayer[0].getBoundingClientRect();
            var x = boundingRect.left + window.scrollX, currentStyle;
            var y = boundingRect.top + window.scrollY;
            if (x !== 0) {
                currentStyle = window.getComputedStyle(DesignerLayer[0]);
                DesignerLayer.css('left', (parseInt(currentStyle.left, 10) - x) + 'px');
            }
            if (y !== 0) {
                currentStyle = currentStyle || window.getComputedStyle(DesignerLayer[0]);
                DesignerLayer.css('top', (parseInt(currentStyle.top, 10) - y) + 'px');
            }
        }
        setInterval(updateDesignerLayer, 200);
        Memoizer.reset();
        resetChoices();
        resetSelections();
        Toolbox.build();
        Nudger.build();
        ConfigurationDialog.build();
        ScriptEditor.build();
        WAT.registerDesigner({
            startDesigning: startDesigning,
            stopDesigning: stopDesigning,
            createDesignerButtonForApplet: createDesignerButtonForApplet,
            importInternalFunctions: importInternalFunctions // <<<< will be invoked upon registration
        });
        console.info('WAD has been registered');
    });
    console.info('WAD is available');
})(WAD || (WAD = {}));
