import { cloneElement } from 'preact';
import { Component } from 'preact';
import { Context } from 'preact';
import { createContext } from 'preact';
import { createPortal } from 'preact/compat';
import { createRef } from 'preact';
import { supportsPassiveEvents as DeviceSupportsPassiveEvents } from 'detect-it';
import { supportsPointerEvents as DeviceSupportsPointerEvents } from 'detect-it';
import { supportsTouchEvents as DeviceSupportsTouchEvents } from 'detect-it';
import { isValidElement } from 'preact';
import { deviceType as PointerType } from 'detect-it';
import { primaryInput } from 'detect-it';
import { render } from 'htm/preact';
import { toChildArray } from 'preact';
import { useCallback } from 'preact/hooks';
import { useContext } from 'preact/hooks';
import { useEffect } from 'preact/hooks';
import { useErrorBoundary } from 'preact/hooks';
import { useId } from 'preact/hooks';
import { useLayoutEffect } from 'preact/hooks';
import { useMemo } from 'preact/hooks';
import { useRef } from 'preact/hooks';
import { useState } from 'preact/hooks';
import { VNode } from 'preact';
import { z } from 'zod';

declare const $L10nDictionary: unique symbol;

/**** acceptableBoolean ****/
export declare function acceptableBoolean(Value: any): boolean | undefined;

/**** acceptableCardinal ****/
export declare function acceptableCardinal(Value: any): number | undefined;

/**** acceptableColor ****/
export declare function acceptableColor(Value: any): JCL_Color | undefined;

/**** acceptableEMailAddress ****/
export declare function acceptableEMailAddress(Value: any): JCL_EMailAddress | undefined;

/**** acceptableFunction ****/
export declare function acceptableFunction(Value: any): Function | undefined;

/**** acceptableInteger ****/
export declare function acceptableInteger(Value: any): number | undefined;

/**** acceptableIntegerInRange ****/
export declare function acceptableIntegerInRange(Value: any, Minimum?: number, Maximum?: number): number | undefined;

/**** acceptableName ****/
export declare function acceptableName(Value: any): JCL_Name | undefined;

/**** acceptableNameOrIndex ****/
export declare function acceptableNameOrIndex(Value: any): JCL_Name | JCL_Ordinal | undefined;

/**** acceptableNumber ****/
export declare function acceptableNumber(Value: any): number | undefined;

/**** acceptableNumberInRange ****/
export declare function acceptableNumberInRange(Value: any, Minimum?: number, Maximum?: number, withMinimum?: boolean, withMaximum?: boolean): number | undefined;

/**** acceptableOrdinal ****/
export declare function acceptableOrdinal(Value: any): number | undefined;

/**** acceptablePath ****/
export declare function acceptablePath(Value: any): JCL_Path | undefined;

/**** acceptablePhoneNumber ****/
export declare function acceptablePhoneNumber(Value: any): JCL_PhoneNumber | undefined;

/**** acceptableString ****/
export declare function acceptableString(Value: any): string | undefined;

/**** acceptableStringMatching ****/
export declare function acceptableStringMatching(Value: any, Pattern: RegExp): string | undefined;

/**** acceptableText ****/
export declare function acceptableText(Value: any): string | undefined;

/**** acceptableTextline ****/
export declare function acceptableTextline(Value: any): string | undefined;

/**** acceptableURL ****/
export declare function acceptableURL(Value: any): JCL_URL | undefined;

/**** acceptableValue ****/
export declare function acceptableValue(Value: any, Validator: Function): any | undefined;

/**** bundled exports ****/
export declare const ai: {
    fencedText: typeof fencedText;
    unfencedText: typeof unfencedText;
    TextFilledFrom: typeof TextFilledFrom;
};

export declare const allowAbortSignal: Function;

export declare const allowDictionary: Function;

export declare const allowDimension: Function;

export declare const allowedAbortSignal: Function;

export declare const allowedDictionary: Function;

export declare const allowedDimension: Function;

export declare const allowedGeometry: Function;

export declare const allowedIdentifier: Function;

export declare const allowedISOLanguageCode: Function;

export declare const allowedLocale: Function;

export declare const allowedLocation: Function;

export declare const allowedMIMEType: Function;

export declare const allowedName: Function;

export declare const allowedPath: Function;

export declare const allowedPhoneNumber: Function;

export declare const allowedPosition: Function;

export declare const allowedPreactRef: Function;

export declare const allowedPromise: Function;

export declare const allowedSize: Function;

export declare const allowedSwatch: Function;

export declare const allowedSwatchSet: Function;

export declare const allowGeometry: Function;

export declare const allowIdentifier: Function;

export declare const allowISOLanguageCode: Function;

export declare const allowLocale: Function;

export declare const allowLocation: Function;

export declare const allowMIMEType: Function;

export declare const allowName: Function;

export declare const allowPath: Function;

export declare const allowPhoneNumber: Function;

export declare const allowPosition: Function;

export declare const allowPreactRef: Function;

export declare const allowPromise: Function;

export declare const allowSize: Function;

export declare const allowSwatch: Function;

export declare const allowSwatchSet: Function;

/**** AppletFailingWith — returns a renderer that displays an error ****/
export declare function AppletFailingWith(Message: JCL_Text): JCL_Renderer;

/**** AppletView ****/
export declare function AppletView(PropSet: Indexable): any;

/**** generic constructor for asynchronous functions ****/
export declare const AsyncFunction: Function;

/**** AttributeFrom ****/
export declare function AttributeFrom(AttributeName: string, Attributes: HTMLAttribute[]): string | undefined;

/**** capitalized ****/
export declare function capitalized(Textline: JCL_Textline): JCL_Textline;

export declare function centered(PropSet: Indexable): any;

/**** consume/consumingEvent ****/
export declare function consumeEvent(Event: Event, completely?: boolean): void;

export declare const consumingEvent: typeof consumeEvent;

export declare function Customizable(PropSet: Indexable): any;

/**** DefaultSwatchSet — the shadcn/ui default palette ("neutral") ****/
export declare const DefaultSwatchSet: JCL_SwatchSet;

/**** Description ****/
export declare function Description(PropSet: Indexable): any;

/**** DescriptionOfHTTPStatus ****/
export declare function DescriptionOfHTTPStatus(StatusCode: JCL_Ordinal): JCL_Textline;

export { DeviceSupportsPassiveEvents }

export { DeviceSupportsPointerEvents }

export { DeviceSupportsTouchEvents }

/**** DialogBase ****/
export declare function DialogBase(PropSet: Indexable): any;

/**** DirectionOfLocale ****/
export declare function DirectionOfLocale(Locale: JCL_Locale): JCL_Direction;

/**** DOCXasHTML ****/
export declare function DOCXasHTML(Buffer: ArrayBuffer): Promise<string>;

/**** DOCXasMarkdown ****/
export declare function DOCXasMarkdown(Buffer: ArrayBuffer): Promise<string>;

/**** DOCXasText ****/
export declare function DOCXasText(Buffer: ArrayBuffer): Promise<string>;

/**** DOCXFileReadAsHTML ****/
export declare function DOCXFileReadAsHTML(File: globalThis.File): Promise<string>;

/**** DOCXFileReadAsMarkdown ****/
export declare function DOCXFileReadAsMarkdown(File: globalThis.File): Promise<string>;

/**** DOCXFileReadAsText ****/
export declare function DOCXFileReadAsText(File: globalThis.File): Promise<string>;

export declare function Dummy(PropSet: Indexable): any;

export declare function EnvironmentIsBrowser(): boolean;

/**** EnvironmentIsTauri/Browser ****/
export declare function EnvironmentIsTauri(): boolean;

/**** escapedHTMLAttribute ****/
export declare function escapedHTMLAttribute(OriginalValue: string): string;

/**** executeCallback ****/
export declare function executeCallback(Description: JCL_Textline, Callback: Function | undefined, ...ArgList: any[]): any;

export declare const executedCallback: typeof executeCallback;

export declare function expandingSpacer(PropSet: Indexable): any;

export declare const expectAbortSignal: Function;

export declare const expectDictionary: Function;

export declare const expectDimension: Function;

export declare const expectedAbortSignal: Function;

export declare const expectedDictionary: Function;

export declare const expectedDimension: Function;

export declare const expectedGeometry: Function;

export declare const expectedIdentifier: Function;

export declare const expectedISOLanguageCode: Function;

export declare const expectedLocale: Function;

export declare const expectedLocation: Function;

export declare const expectedMIMEType: Function;

export declare const expectedName: Function;

export declare const expectedPath: Function;

export declare const expectedPhoneNumber: Function;

export declare const expectedPosition: Function;

export declare const expectedPreactRef: Function;

export declare const expectedPromise: Function;

export declare const expectedSize: Function;

export declare const expectedSwatch: Function;

export declare const expectedSwatchSet: Function;

export declare const expectGeometry: Function;

export declare const expectIdentifier: Function;

export declare const expectISOLanguageCode: Function;

export declare const expectLocale: Function;

export declare const expectLocation: Function;

export declare const expectMIMEType: Function;

export declare const expectName: Function;

export declare const expectPath: Function;

export declare const expectPhoneNumber: Function;

export declare const expectPosition: Function;

export declare const expectPreactRef: Function;

export declare const expectPromise: Function;

export declare const expectSize: Function;

export declare const expectSwatch: Function;

export declare const expectSwatchSet: Function;

export declare function FAIcon(PropSet: Indexable): any;

/**** fencedText ****/
export declare function fencedText(Text: JCL_Text, withFences?: boolean): JCL_Text;

/**** fetched ****/
export declare function fetched(ResourceURL: JCL_URL, OptionSet?: Indexable): Promise<any>;

/**** fetchedAsHTML ****/
export declare function fetchedAsHTML(URL: JCL_URL, OptionSet?: Indexable): Promise<string>;

/**** fetchedAsMarkdown ****/
export declare function fetchedAsMarkdown(URL: JCL_URL, OptionSet?: Indexable): Promise<string>;

/**** fetchedAsText ****/
export declare function fetchedAsText(URL: JCL_URL, OptionSet?: Indexable): Promise<string>;

/**** fetchedBinary ****/
export declare function fetchedBinary(URL: JCL_URL, OptionSet?: Indexable): Promise<ArrayBuffer>;

/**** fetchedBlob ****/
export declare function fetchedBlob(URL: JCL_URL, OptionSet?: Indexable): Promise<Blob>;

/**** fetchedDataURL ****/
export declare function fetchedDataURL(URL: JCL_URL, OptionSet?: Indexable): Promise<JCL_URL>;

/**** fetchedJSON ****/
export declare function fetchedJSON(URL: JCL_URL, OptionSet?: Indexable): Promise<Serializable>;

/**** fetchedText ****/
export declare function fetchedText(URL: JCL_URL, OptionSet?: Indexable): Promise<JCL_Text>;

/**** Fineprint ****/
export declare function Fineprint(PropSet: Indexable): any;

export declare function FlagEmojiForISOCode(ISOCode: string): string;

/**** FlagEmojiForLocale — returns the flag emoji for a given locale ****/
export declare function FlagEmojiForLocale(Locale: JCL_Locale): string;

export declare function fullsized(PropSet: Indexable): any;

export declare function horizontal(PropSet: Indexable): any;

export declare function horizontalSeparator(PropSet: Indexable): any;

/**** HTMLasMarkdown ****/
export declare function HTMLasMarkdown(HTMLContent: string): Promise<string>;

/**** HTMLasText ****/
export declare function HTMLasText(HTMLContent: string): Promise<string>;

/**** type definitions ****/
export declare type HTMLAttribute = {
    Name: string;
    Value: string;
    escapedValue: string;
};

export declare type HTMLAttributeSet = {
    [Name: string]: HTMLAttribute;
};

/**** HTMLFileReadAsMarkdown ****/
export declare function HTMLFileReadAsMarkdown(File: globalThis.File): Promise<string>;

/**** HTMLFileReadAsText ****/
export declare function HTMLFileReadAsText(File: globalThis.File): Promise<string>;

export declare type HTMLParserCallbackSet = {
    processStartTag?: (TagName: string, Attributes: HTMLAttribute[], isUnary: boolean, isTopLevel: boolean) => any;
    processEndTag?: (TagName: string, isTopLevel: boolean) => any;
    processText?: (Text: string, isTopLevel: boolean) => any;
    processComment?: (Comment: string) => any;
};

export declare function HTMLtoMarkdown(HTMLContent: string): string;

/**** HTMLtoText ****/
export declare function HTMLtoText(HTMLContent: string): string;

export declare function HTMLView(PropSet: Indexable): any;

/**** HTTPMessageForStatus ****/
export declare const HTTPMessageForStatus: {
    [code: number]: JCL_Textline;
};

export declare function Icon(PropSet: Indexable): any;

/**** ImageView ****/
export declare function ImageView(PropSet: Indexable): any;

/**** make some existing types indexable ****/
export declare interface Indexable {
    [Key: string]: any;
}

/**** installStylesheetFor ****/
export declare function installStylesheetFor(Name: JCL_Name, Stylesheet: JCL_Text, overwrite?: boolean): void;

/**** InternetIsAvailable ****/
export declare function InternetIsAvailable(ServerURL?: JCL_URL, Timeout?: number): Promise<boolean>;

export declare class JCL_AppletElement extends HTMLElement {
    private _Renderer;
    constructor();
    connectedCallback(): void;
    disconnectedCallback(): void;
}

/**** some JCL-specific types ****/
export declare type JCL_AttrName = string;

/**** bezier path support - cubic bezier chains of the form "M...C...(Z)" ****/
declare type JCL_BezierModel = {
    Anchors: {
        x: number;
        y: number;
    }[];
    Controls: {
        c1: {
            x: number;
            y: number;
        };
        c2: {
            x: number;
            y: number;
        };
    }[];
    closed: boolean;
};

export declare class JCL_BitmapEditor {
    #private;
    /**** document and layer model ****/
    Width: number;
    Height: number;
    LayerList: JCL_BitmapEditorLayer[];
    activeLayerIndex: number;
    CallbackSet: Indexable;
    /**** activeLayer ****/
    get activeLayer(): JCL_BitmapEditorLayer | undefined;
    /**** initialiseDocument ****/
    initialiseDocument(Width: number, Height: number): void;
    /**** newLayerNamed ****/
    newLayerNamed(Name: string, Index?: number): JCL_BitmapEditorLayer;
    /**** removeLayer ****/
    removeLayer(Layer: JCL_BitmapEditorLayer): void;
    /**** configureLayer - patches visibility, opacity and blend mode ****/
    configureLayer(Layer: JCL_BitmapEditorLayer, Settings: Indexable): void;
    /**** rendering and compositing ****/
    ViewCanvas: HTMLCanvasElement | undefined;
    /**** requestRendering - renders at most once per animation frame ****/
    requestRendering(): void;
    /**** render ****/
    render(): void;
    /**** viewport handling ****/
    OffsetX: number;
    OffsetY: number;
    ZoomFactor: number;
    /**** attachTo - binds this editor to its (visible) view canvas ****/
    attachTo(Canvas: HTMLCanvasElement): void;
    /**** resizeViewCanvas - keeps the canvas backing store HiDPI-crisp ****/
    resizeViewCanvas(): void;
    /**** DocumentPointFor - maps view coordinates to document coordinates ****/
    DocumentPointFor(ViewX: number, ViewY: number): {
        x: number;
        y: number;
    };
    /**** panBy - shifts the viewport by the given view distances ****/
    panBy(dx: number, dy: number): void;
    /**** zoomTo - zooms the viewport, keeping a given view point stable ****/
    zoomTo(ZoomFactor: number, FixPointX?: number, FixPointY?: number): void;
    /**** reportViewportChange ****/
    reportViewportChange(): void;
    /**** pointer and wheel input handling ****/
    currentTool: JCL_BitmapEditorTool;
    currentColor: string;
    backgroundColor: string;
    BrushSize: number;
    BrushOpacity: number;
    /**** installInputHandlersOn ****/
    installInputHandlersOn(Canvas: HTMLCanvasElement): void;
    /**** destroy ****/
    destroy(): void;
    /**** brush engine - stamp-based and pressure-aware ****/
    beginStrokeAt(Point: {
        x: number;
        y: number;
    }, Pressure?: number): void;
    /**** continueStrokeAt ****/
    continueStrokeAt(Point: {
        x: number;
        y: number;
    }, Pressure?: number): void;
    /**** endStroke ****/
    endStroke(): void;
    /**** reportValueChange ****/
    reportValueChange(): void;
    beginShapeAt(Point: {
        x: number;
        y: number;
    }): void;
    continueShapeAt(Point: {
        x: number;
        y: number;
    }): void;
    endShape(): void;
    /**** drawPendingShapeOn - strokes with the per-stroke colour          ****/
    /**** (foreground or background, depending on the button), "filled"    ****/
    /**** variants fill with the respective other colour (like MS Paint) - ****/
    /**** "transparent" as a colour erases instead (previews on the view   ****/
    /**** canvas then punch a hole into the composite which reveals the    ****/
    /**** CSS background underneath, i.e. the expected outcome)            ****/
    drawPendingShapeOn(Context: any): void;
    /**** text tool - the text itself is provided from the outside (via ****/
    /**** the "onTextRequest" callback), the engine renders it into a   ****/
    /**** floating bitmap which may then be dragged into place          ****/
    FontFamily: string;
    FontSize: number;
    FontWeight: 'normal' | 'bold';
    FontStyle: 'normal' | 'italic';
    lastText: string;
    /**** CSSFont - the settings above as a CSS font specification ****/
    get CSSFont(): string;
    /**** enterTextAt - asks the environment for a text and renders it into ****/
    /**** a floating bitmap with its top-left corner at the given point     ****/
    enterTextAt(Point: {
        x: number;
        y: number;
    }, Color?: string): Promise<void>;
    /**** fillAt - a simple 4-connected flood fill ****/
    fillAt(Point: {
        x: number;
        y: number;
    }, Color?: string): void;
    /**** pickColorAt - picks from the composited document, optionally   ****/
    /**** for the background colour (i.e. after a right-click) - fully   ****/
    /**** transparent pixels are reported as "transparent", partially    ****/
    /**** transparent ones as "#RRGGBBAA" and opaque ones as "#RRGGBB"   ****/
    pickColorAt(Point: {
        x: number;
        y: number;
    }, forBackground?: boolean): void;
    /**** selection handling - rectangular selections only, for now ****/
    Selection: JCL_BitmapEditorSelection | undefined;
    beginSelectionAt(Point: {
        x: number;
        y: number;
    }): void;
    continueSelectionAt(Point: {
        x: number;
        y: number;
    }): void;
    endSelection(): void;
    clearSelection(): void;
    /**** applySelectionClippingTo - restricts painting to the selection ****/
    applySelectionClippingTo(Context: any): void;
    /**** renderOverlay - floating bitmap, selection marquee and pending ****/
    /**** shape previews                                                 ****/
    renderOverlay(Context: any): void;
    /**** reportSelectionChange ****/
    reportSelectionChange(): void;
    get canCopy(): boolean;
    get canPaste(): boolean;
    get FloatingBitmap(): {
        Canvas: OffscreenCanvas;
        x: number;
        y: number;
    } | undefined;
    /**** copySelection - copies from the active layer, not the composite ****/
    copySelection(): void;
    /**** cutSelection / deleteSelection - both fill with the background ****/
    /**** colour, just like MS Paint                                     ****/
    cutSelection(): void;
    deleteSelection(): void;
    /**** floatBitmap - makes a given bitmap "float" at a given position, ****/
    /**** from where it may be dragged around until it is finally         ****/
    /**** anchored (a click outside anchors it as well)                   ****/
    floatBitmap(Canvas: OffscreenCanvas, x: number, y: number): void;
    /**** pasteClipboard - creates a "floating" bitmap in the visible corner ****/
    pasteClipboard(): void;
    /**** liftSelection - turns the selected region into a floating bitmap, ****/
    /**** filling its origin with the background colour (like MS Paint)     ****/
    liftSelection(): void;
    /**** moveFloatingBitmapBy ****/
    moveFloatingBitmapBy(dx: number, dy: number): void;
    /**** anchorFloatingBitmap - draws the floating bitmap onto the layer ****/
    anchorFloatingBitmap(): void;
    /**** dropFloatingBitmap - discards the floating bitmap ****/
    dropFloatingBitmap(): void;
    get canUndo(): boolean;
    get canRedo(): boolean;
    /**** memoizeLayerForUndo - snapshots the active layer before a change ****/
    memoizeLayerForUndo(): void;
    /**** undo/redo ****/
    undo(): void;
    redo(): void;
    /**** reportUndoStateChange ****/
    reportUndoStateChange(): void;
    /**** compositedCanvas - all visible layers flattened into one canvas ****/
    compositedCanvas(): OffscreenCanvas;
    /**** exportedBlob ****/
    exportedBlob(Format?: string, Quality?: number): Promise<Blob>;
    /**** importImage - draws a given image onto the active layer ****/
    importImage(Source: string | Blob): Promise<void>;
}

export declare type JCL_BitmapEditorLayer = {
    Id: string;
    Name: string;
    isVisible: boolean;
    Opacity: number;
    BlendMode: GlobalCompositeOperation;
    Canvas: OffscreenCanvas;
    Context: OffscreenCanvasRenderingContext2D;
};

export declare type JCL_BitmapEditorSelection = {
    x: number;
    y: number;
    Width: number;
    Height: number;
};

export declare type JCL_BitmapEditorTextRequest = (currentText: string) => string | undefined | Promise<string | undefined>;

export declare type JCL_BitmapEditorTool = ('brush' | 'eraser' | 'line' | 'rectangle' | 'filledRectangle' | 'ellipse' | 'filledEllipse' | 'text' | 'fill' | 'eyeDropper' | 'pan' | 'select');

export declare const JCL_BitmapEditorTools: JCL_BitmapEditorTool[];

export declare type JCL_Cardinal = number;

export declare type JCL_ClickHandler = (x: number, y: number, Event: PointerEvent) => void;

export declare type JCL_CodeEditorError = {
    Line: number;
    Column?: number;
    EndLine?: number;
    EndColumn?: number;
    Message: string;
    Severity?: JCL_CodeEditorSeverity;
};

export declare type JCL_CodeEditorLanguageLoader = () => Promise<any>;

export declare type JCL_CodeEditorLinter = (Code: string) => JCL_CodeEditorError[] | Promise<JCL_CodeEditorError[]>;

export declare type JCL_CodeEditorSeverity = 'error' | 'warning' | 'info';

export declare type JCL_Color = string;

/**** full customization ****/
export declare interface JCL_Customization {
    Theme: JCL_Theme;
    SwatchSet: JCL_SwatchSet;
    PointerAccuracy: JCL_PointerAccuracy;
    HoverCapability: JCL_HoverCapability;
    preferredMotion: JCL_PreferredMotion | undefined;
    preferredContrast: JCL_PreferredContrast | undefined;
    Locale: JCL_Locale;
    Direction: JCL_Direction;
    TooltipDelay: number;
    [$L10nDictionary]: JCL_L10nDictionary;
}

/**** Customization Context - undefined outside any provider ****/
export declare interface JCL_CustomizationContext extends JCL_Customization {
    setTheme: (Value: JCL_Theme) => void;
    setSwatchSet: (Value: JCL_SwatchSet) => void;
    setPointerAccuracy: (Value: JCL_PointerAccuracy) => void;
    setHoverCapability: (Value: JCL_HoverCapability) => void;
    setPreferredMotion: (Value: JCL_PreferredMotion | undefined) => void;
    setPreferredContrast: (Value: JCL_PreferredContrast | undefined) => void;
    setLocale: (Value: JCL_Locale) => void;
    setDirection: (Value: JCL_Direction) => void;
    setTooltipDelay: (Value: number) => void;
    registerL10n: (Locale: JCL_Locale, Dictionary: JCL_Dictionary) => void;
}

/**** useDataDragSupport ****/
export declare type JCL_DataDragSupportCallbacks = {
    draggedGhost?: (Event: DragEvent) => HTMLElement | null;
    onDropped?: (Effect: string, Event: DragEvent) => void;
};

export declare type JCL_DataDropEffect = typeof JCL_DataDropEffects[number];

/**** JCL_DataDropEffect — allowed values for DataTransfer.effectAllowed ****/
export declare const JCL_DataDropEffects: readonly ["none", "copy", "copyLink", "copyMove", "link", "linkMove", "move", "all"];

export declare type JCL_DataDropSupportCallbacks = {
    onDragEnter?: (Event: DragEvent) => void;
    onDragOver?: (Event: DragEvent) => void;
    onDragLeave?: (Event: DragEvent) => void;
    onDrop?: (DataTransfer: DataTransfer, Event: DragEvent) => void;
};

export declare type JCL_DataFlowDirection = 'n' | 's' | 'w' | 'e';

export declare type JCL_DataFlowEdge = {
    Key: string;
    Source: JCL_DataFlowEdgeEndpoint;
    Target: JCL_DataFlowEdgeEndpoint;
    Color?: string;
    disabled?: boolean;
};

export declare type JCL_DataFlowEdgeEndpoint = {
    NodeKey: string;
    PortKey: string;
};

export declare type JCL_DataFlowGroup = {
    Key: string;
    NodeKeys: string[];
    StickyNoteKeys?: string[];
    GroupKeys?: string[];
    Label?: string;
    BorderColor?: string;
    BackgroundColor?: string;
};

export declare type JCL_DataFlowNode = {
    Key: string;
    Position: {
        x: number;
        y: number;
    };
    Size: {
        Width: number;
        Height: number;
    };
    minSize?: {
        Width: number;
        Height: number;
    };
    maxSize?: {
        Width: number;
        Height: number;
    };
    Title: string;
    Content: (Node: JCL_DataFlowNode, isSelected: boolean) => any;
    InputPorts?: JCL_DataFlowPort[];
    OutputPorts?: JCL_DataFlowPort[];
    disabled?: boolean;
    BackgroundColor?: string;
};

export declare type JCL_DataFlowPort = {
    Key: string;
    Direction: JCL_DataFlowDirection;
    Offset: number;
    disabled?: boolean;
    Label?: string;
};

export declare type JCL_DataFlowStickyNote = {
    Key: string;
    Position: {
        x: number;
        y: number;
    };
    Size: {
        Width: number;
        Height: number;
    };
    Content: string;
    FontFamily?: string;
    FontSize?: number;
    FontWeight?: number | string;
    LineHeight?: number;
    ForegroundColor?: string;
    BackgroundColor?: string;
};

export declare type JCL_DataFlowTargetValidator = (Source: JCL_DataFlowEdgeEndpoint, Candidate: JCL_DataFlowEdgeEndpoint) => boolean;

/**** nativeDateInput ****/
export declare const JCL_DatePattern = "\\d{4}-\\d{2}-\\d{2}";

export declare const JCL_DateRegExp: RegExp;

/**** nativeDateTimeInput ****/
export declare const JCL_DateTimePattern = "\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01])T([01]\\d|2[0-3]):[0-5]\\d(:[0-5]\\d)?";

export declare const JCL_DateTimeRegExp: RegExp;

export declare const JCL_DefaultSandboxPermissions: string;

export declare type JCL_Dialog = {
    Name: JCL_Name;
    Title?: JCL_Textline;
    isModal: boolean;
    hasCloseButton?: boolean;
    isResizable?: boolean;
    isDraggable?: boolean;
    dontShrink?: boolean;
    Renderer: JCL_Renderer;
    onOpen?: Function;
    onClose?: Function;
    OffsetX?: JCL_Location;
    OffsetY?: JCL_Location;
    Width?: JCL_Dimension;
    Height?: JCL_Dimension;
    minWidth?: JCL_Dimension;
    minHeight?: JCL_Dimension;
    maxWidth?: JCL_Dimension;
    maxHeight?: JCL_Dimension;
};

declare type JCL_DialogAction = (...Args: any[]) => any;

export declare const JCL_DialogContext: Context<JCL_DialogContextValue>;

export declare type JCL_DialogContextValue = {
    DialogName?: JCL_Name;
    openDialog: JCL_DialogAction;
    closeDialog: JCL_DialogAction;
    closeAllDialogs: JCL_DialogAction;
    openDialogs: JCL_Name[];
    DialogIsOpen: JCL_DialogAction;
    DialogIsFrontmost: JCL_DialogAction;
    bringDialogToFront: JCL_DialogAction;
};

/**** JCL_DialogView ****/
export declare function JCL_DialogView(PropSet: Indexable): any;

export declare type JCL_Dictionary = Record<string, JCL_DictionaryEntry>;

export declare type JCL_DictionaryEntry = string | Partial<Record<Intl.LDMLPluralRule, string>>;

export declare type JCL_Dimension = number;

export declare type JCL_Direction = typeof JCL_Directions[number];

export declare const JCL_Directions: readonly ["ltr", "rtl"];

export declare type JCL_DragHandler = (dx: number, dy: number, x: number, y: number, Event: PointerEvent | null) => void;

export declare class JCL_DrawingEditor {
    /**** editor state ****/
    View: any;
    Container: any;
    Callbacks: Indexable;
    GridLayer: any;
    ContentLayer: any;
    OverlayLayer: any;
    Size: {
        Width: number;
        Height: number;
    };
    ViewBox: JCL_DrawingEditorViewBox;
    Tool: JCL_DrawingEditorTool;
    readonly: boolean;
    GridSize: number;
    snapToGrid: boolean;
    showsGrid: boolean;
    HitTolerance: number;
    CurrentStyle: JCL_DrawingEditorStyleSet;
    Selection: any[];
    PointSelection: any;
    PendingPolyline: any;
    PendingPoints: any[];
    DragState: any;
    DownTarget: any;
    GuideTimer: any;
    Snapshots: string[];
    SnapshotIndex: number;
    ClipboardContent: string;
    IdCounter: number;
    GridPatternId: string;
    /**** constructor ****/
    constructor(Container: any, Callbacks: Indexable);
    /**** destroy ****/
    destroy(): void;
    /**** UnitsPerPixel - content units per screen pixel ****/
    UnitsPerPixel(): number;
    /**** IdFor - ensures that the given element carries a unique id ****/
    IdFor(Element: any): string;
    /**** getValue - serialises the drawing into a standalone SVG document ****/
    getValue(): string;
    /**** setValue - replaces the drawing without firing "onValueChange" ****/
    setValue(Value: string): void;
    /**** announceChange - captures a snapshot and reports the new value ****/
    announceChange(): void;
    /**** snapshot management ****/
    captureSnapshot(): void;
    restoreSnapshotAt(Index: number): void;
    /**** undo/redo ****/
    canUndo(): boolean;
    canRedo(): boolean;
    undo(): void;
    redo(): void;
    announceUndoState(): void;
    /**** ElementAt - the top-level element containing the given event target ****/
    ElementAt(EventTarget: any): any;
    /**** ElementNear - the topmost element whose stroke is close to a point ****/
    ElementNear(Point: {
        x: number;
        y: number;
    }): any;
    /**** hitsStrokeOf - tests a point against a temporarily widened stroke ****/
    hitsStrokeOf(Shape: any, Point: {
        x: number;
        y: number;
    }, Tolerance: number): boolean;
    /**** selection primitives ****/
    isSelected(Element: any): boolean;
    select(ElementList: any[], extending?: boolean): void;
    toggle(Element: any): void;
    selectAll(): void;
    clearSelection(): void;
    selectIds(IdList: string[]): void;
    SelectedIds(): string[];
    /**** deleteSelection ****/
    deleteSelection(): void;
    /**** reportSelection ****/
    reportSelection(): void;
    /**** CursorForHandle - resize cursor matching the *apparent* direction ****/
    /**** in which a handle acts (i.e., considering the element's rotation) ****/
    CursorForHandle(HandleName: string, Matrix: DOMMatrix): string;
    /**** refreshOverlay - redraws selection frames, handles and point handles ****/
    refreshOverlay(): void;
    /**** refreshGrid ****/
    refreshGrid(): void;
    /**** drawMoveGuides - alignment guides for moved (vs. unmoved) elements ****/
    /**** - coinciding edges are marked with a dashed line, edges coinciding ****/
    /**** with centres (or vice versa) with a dotted one                     ****/
    drawMoveGuides(): void;
    /**** showTransientGuides - draws guides and removes them again after a ****/
    /**** while (meant for keyboard-triggered movements)                    ****/
    showTransientGuides(DurationInMs?: number): void;
    /**** setTool ****/
    setTool(Tool: JCL_DrawingEditorTool): void;
    /**** updateCursor - signals movability underneath the mouse pointer ****/
    updateCursor(Event: any): void;
    /**** coordinate conversion and snapping ****/
    PointFor(Event: any): {
        x: number;
        y: number;
    };
    snapped(Point: {
        x: number;
        y: number;
    }): {
        x: number;
        y: number;
    };
    /**** onPointerDown ****/
    onPointerDown(Event: any): void;
    /**** beginSelection - handles "pointerdown" for the "select" tool ****/
    beginSelection(Point: any, Event: any): void;
    /**** rubber band selection ****/
    beginRubberBand(Point: any, extending: boolean): void;
    continueRubberBand(Point: any): void;
    endRubberBand(DragState: any): void;
    /**** onPointerMove ****/
    onPointerMove(Event: any): void;
    /**** onPointerUp ****/
    onPointerUp(Event: any): void;
    /**** onDoubleClick ****/
    onDoubleClick(Event: any): void;
    /**** beginCreation - for "rect", "ellipse", "line" and "freehand" shapes ****/
    beginCreation(Point: any, Event: any): void;
    /**** continueCreation ****/
    continueCreation(Point: any, Event: any): void;
    /**** endCreation ****/
    endCreation(DragState: any): void;
    /**** polyline/bezier construction (click-based rather than drag-based) ****/
    extendPolyline(Point: any): void;
    previewPolylineAt(Point: any): void;
    writePolylinePoints(): void;
    finishPolyline(): void;
    cancelPolyline(): void;
    /**** text creation and editing (texts come from the "onTextRequest" host) ****/
    requestTextAt(Point: any): void;
    requestTextFor(Element: any): void;
    insertText(Text: string, x: number, y: number): void;
    /**** moving - always moves the whole selection ****/
    beginMove(Point: any): void;
    continueMove(Point: any): void;
    moveSelectionBy(dx: number, dy: number): void;
    /**** HandlePositionsFor - handle positions for a given bounding box ****/
    HandlePositionsFor(Box: Indexable): Indexable;
    /**** resizing - the dragged handle belongs to a single element, but the ****/
    /**** scaling is applied to every selected element around its own anchor ****/
    /**** - and in its own local coordinate system, so that even rotated     ****/
    /**** elements resize along their own axes (without being skewed)        ****/
    beginResizing(Point: any, Handle: string, Index: number): void;
    continueResizing(Point: any, Event: any): void;
    /**** rotating - the dragged handle belongs to a single element, but the ****/
    /**** rotation is applied to every selected element around its own centre ****/
    beginRotation(Point: any, Index: number): void;
    continueRotation(Point: any, Event: any): void;
    /**** isPointEditable - lines, poly*s, simple "M...L...Z?" and bezier paths ****/
    isPointEditable(Element: any): boolean;
    /**** BezierModelOf - the bezier model of a path element (or undefined) ****/
    BezierModelOf(Element: any): JCL_BezierModel | undefined;
    /**** PointListOf / setPointListOf - in element-local coordinates ****/
    PointListOf(Element: any): {
        x: number;
        y: number;
    }[];
    setPointListOf(Element: any, PointList: {
        x: number;
        y: number;
    }[]): void;
    /**** drawPointHandles - shown instead of the usual selection handles ****/
    drawPointHandles(): void;
    /**** beginPointEditing - handles "pointerdown" for the "editPoints" tool ****/
    beginPointEditing(Point: any, Event: any): void;
    /**** point manipulation ****/
    continuePointDrag(Point: any): void;
    /**** dragBezierPointTo - anchors take their control points along ****/
    dragBezierPointTo(Element: any, Model: JCL_BezierModel, Target: any): void;
    removePointAt(Index: number): void;
    /**** removeBezierAnchorAt - merges the two segments meeting at an anchor ****/
    removeBezierAnchorAt(Element: any, Model: JCL_BezierModel, Index: number): void;
    insertPointAfter(Index: number, Point: any): void;
    /**** toggleClosed - closes open polylines/paths and re-opens closed ones ****/
    toggleClosed(): void;
    /**** view box management ****/
    applyViewBox(): void;
    setViewBox(ViewBox: JCL_DrawingEditorViewBox): void;
    /**** zooming ****/
    ZoomFactor(): number;
    setZoom(Factor: number): void;
    zoomBy(Factor: number, Focus?: {
        x: number;
        y: number;
    }): void;
    zoomToFit(): void;
    /**** panning ****/
    beginPan(Event: any): void;
    continuePan(Event: any): void;
    /**** onWheel - zooms with Ctrl/Cmd pressed, pans otherwise ****/
    onWheel(Event: any): void;
    /**** onKeyDown ****/
    onKeyDown(Event: any): void;
    /**** internal clipboard operations (deliberately not the system clipboard) ****/
    copySelection(): void;
    cutSelection(): void;
    pasteClipboard(): void;
    duplicateSelection(): void;
    /**** grouping ****/
    groupSelection(): void;
    ungroupSelection(): void;
    /**** z-order management ****/
    bringToFront(): void;
    sendToBack(): void;
    raiseSelection(): void;
    lowerSelection(): void;
    /**** getStyle/setStyle - defaults for new shapes, applied to any selection ****/
    getStyle(): JCL_DrawingEditorStyleSet;
    setStyle(StyleSet: JCL_DrawingEditorStyleSet): void;
    /**** StyleOfElement - reads the style-relevant attributes of an element ****/
    StyleOfElement(Element: any): JCL_DrawingEditorStyleSet;
    /**** SelectionStyle - common style of the selection (null = indifferent) ****/
    SelectionStyle(): JCL_DrawingEditorStyleInquiry;
    /**** applyStyleTo - only applies the explicitly given style settings ****/
    applyStyleTo(Element: any, StyleSet: Indexable): void;
    /**** installArrowMarker - a single marker serves all arrowheads ****/
    installArrowMarker(): void;
}

export declare type JCL_DrawingEditorStyleInquiry = {
    [Key in keyof JCL_DrawingEditorStyleSet]?: JCL_DrawingEditorStyleSet[Key] | null;
};

export declare type JCL_DrawingEditorStyleSet = {
    StrokeColor?: string;
    StrokeWidth?: number;
    StrokeDashes?: string;
    FillColor?: string;
    Opacity?: number;
    StartArrow?: boolean;
    EndArrow?: boolean;
    FontFamily?: string;
    FontSize?: number;
    FontWeight?: 'normal' | 'bold';
    FontStyle?: 'normal' | 'italic';
};

export declare type JCL_DrawingEditorTextRequest = (currentText: string) => string | undefined | Promise<string | undefined>;

export declare type JCL_DrawingEditorTool = ('select' | 'editPoints' | 'pan' | 'rect' | 'ellipse' | 'line' | 'polyline' | 'bezier' | 'freehand' | 'text');

export declare type JCL_DrawingEditorViewBox = {
    x: number;
    y: number;
    Width: number;
    Height: number;
};

/**** JCL_DropEffect — cursor effects during pointer drag-and-drop ****/
export declare type JCL_DropEffect = 'move' | 'copy' | 'alias';

/**** JCL_DropTargetEntry — callbacks registered per drop target ****/
export declare type JCL_DropTargetEntry = {
    accepts: (Data: unknown, allowedEffects: JCL_DropEffect[]) => JCL_DropEffect | false;
    onEnter?: (Data: unknown, Effect: JCL_DropEffect, x: number, y: number) => void;
    onOver?: (Data: unknown, Effect: JCL_DropEffect, x: number, y: number) => void;
    onLeave?: (Data: unknown) => void;
    onDrop?: (Data: unknown, Effect: JCL_DropEffect, x: number, y: number) => void;
};

export declare type JCL_EMailAddress = string;

/**** special Values ****/
export declare const JCL_empty: {
    Placeholder: string;
    disabled: boolean;
};

/**** JCL_ErrorIndicator ****/
export declare function JCL_ErrorIndicator(PropSet: Indexable): any;

export declare type JCL_FAIconName = typeof JCL_FAIconNames[number];

export declare const JCL_FAIconNames: string[];

/**** useFileDropSupport ****/
export declare type JCL_FileDropSupportCallbacks = {
    onDragEnter?: (Event: DragEvent) => void;
    onDragOver?: (Event: DragEvent) => void;
    onDragLeave?: (Event: DragEvent) => void;
    onDrop?: (acceptableFiles: File[], Event: DragEvent) => void;
};

export declare type JCL_FileDropSupportOptions = JCL_FileDropSupportCallbacks & {
    multiple?: boolean;
    disabled?: boolean;
};

export declare type JCL_FlatListItemKey = string;

export declare type JCL_FlatListItemRenderer = (Item: Indexable, List: Indexable[], Index: JCL_Ordinal, isSelected: boolean, InsertionDirection: '' | 'before' | 'after') => any;

export declare type JCL_Geometry = {
    x: JCL_Location;
    y: JCL_Location;
    Width: JCL_Dimension;
    Height: JCL_Dimension;
};

export declare const JCL_HoverCapabilities: readonly ["none", "hover"];

export declare type JCL_HoverCapability = typeof JCL_HoverCapabilities[number];

/**** useI18n — returns localised formatting and translation utilities ****/
declare type JCL_i18n = {
    Locale: JCL_Locale;
    Direction: JCL_Direction;
    Currency: string;
    localized: (Key: string, Vars?: Indexable, Count?: number) => string;
    formattedNumber: (Value: number, Options?: Intl.NumberFormatOptions) => string;
    formattedDate: (Value: Date, Options?: Intl.DateTimeFormatOptions) => string;
    formattedRelativeDate: (Value: number, Unit: Intl.RelativeTimeFormatUnit, Options?: Intl.RelativeTimeFormatOptions) => string;
    formattedCurrency: (Amount: number, Options?: Intl.NumberFormatOptions) => string;
};

export declare type JCL_Identifier = string;

export declare type JCL_ImageAlignment = typeof JCL_ImageAlignments[number];

/**** JCL_ImageAlignments, JCL_ImageAlignment ****/
export declare const JCL_ImageAlignments: string[];

export declare type JCL_ImageScaling = typeof JCL_ImageScalings[number];

/**** JCL_ImageScalings, JCL_ImageScaling ****/
export declare const JCL_ImageScalings: string[];

export declare type JCL_KanbanColumnHeaderRenderer = (Column: Indexable, TaskList: Indexable[]) => any;

export declare type JCL_KanbanTaskKey = string;

export declare type JCL_KanbanTaskMayBeDropped = (Task: Indexable, ToColumn: Indexable, ToIndex: JCL_Ordinal) => boolean;

export declare type JCL_KanbanTaskRenderer = (Task: Indexable, List: Indexable[], Index: JCL_Ordinal, isSelected: boolean, InsertionDirection: '' | 'before' | 'after') => any;

export declare type JCL_KeyOfFlatListItem = (Item: Indexable, List: Indexable[], Index: JCL_Ordinal) => JCL_FlatListItemKey;

export declare type JCL_KeyOfKanbanTask = (Task: Indexable, List: Indexable[], Index: JCL_Ordinal) => JCL_KanbanTaskKey;

export declare type JCL_KeyOfNestedListItem = (Item: Indexable) => JCL_NestedListItemKey;

export declare type JCL_KeyOfStickyNote = (Note: Indexable) => JCL_StickyNoteKey;

declare type JCL_L10nDictionary = {
    [Locale: JCL_Locale]: JCL_Dictionary;
};

export declare type JCL_Locale = string;

/**** geometry-related types ****/
export declare type JCL_Location = number;

export declare const JCL_mixedValues: {
    Placeholder: string;
    disabled: boolean;
};

/**** JCL_ModalLayer ****/
export declare function JCL_ModalLayer(_PropSet: Indexable): any;

/**** nativeMonthInput ****/
export declare const JCL_MonthPattern = "\\d{4}-\\d{2}";

export declare const JCL_MonthRegExp: RegExp;

export declare type JCL_Name = string;

export declare type JCL_NestedListItemKey = string;

export declare type JCL_NestedListItemMayAccept = (TargetItem: Indexable, ItemsToMove: Indexable[]) => boolean;

export declare type JCL_NestedListItemMayBeExpanded = (Item: Indexable) => boolean;

export declare type JCL_NestedListItemMayBeSelected = (Item: Indexable) => boolean;

export declare type JCL_NestedListItemRenderer = (Item: Indexable, isSelected: boolean, isPlain: boolean, isExpanded: boolean, InsertionDirection: '' | 'before' | 'after') => any;

export declare const JCL_noSelection: {
    Placeholder: string;
    disabled: boolean;
};

export declare type JCL_onBitmapEditorColorPicked = (// "Color" is "transparent",
Color: string, forBackground: boolean) => void;

export declare type JCL_onBitmapEditorSelectionChange = (Selection?: JCL_BitmapEditorSelection) => void;

export declare type JCL_onBitmapEditorUndoStateChange = (canUndo: boolean, canRedo: boolean) => void;

export declare type JCL_onBitmapEditorValueChange = () => void;

export declare type JCL_onBitmapEditorViewportChange = (OffsetX: number, OffsetY: number, ZoomFactor: number) => void;

export declare type JCL_onCodeEditorSelectionChange = (from: number, to: number) => void;

export declare type JCL_onCodeEditorValueChange = (Value: string) => void;

export declare type JCL_onDataFlowEdgeCreate = (newEdge: {
    Source: JCL_DataFlowEdgeEndpoint;
    Target: JCL_DataFlowEdgeEndpoint;
}) => void;

export declare type JCL_onDataFlowEdgesChange = (newEdges: JCL_DataFlowEdge[]) => void;

export declare type JCL_onDataFlowGroupsChange = (newGroups: JCL_DataFlowGroup[]) => void;

export declare type JCL_onDataFlowNodeDoubleClick = (NodeKey: string, Event: MouseEvent) => void;

export declare type JCL_onDataFlowNodesChange = (newNodes: JCL_DataFlowNode[]) => void;

export declare type JCL_onDataFlowSelectionChange = (newSelectedNodeKeys: string[], newSelectedEdgeKeys: string[], newSelectedStickyNoteKeys: string[], newSelectedGroupKeys: string[]) => void;

export declare type JCL_onDataFlowStickyNotesChange = (newStickyNotes: JCL_DataFlowStickyNote[]) => void;

export declare type JCL_onDrawingEditorSelectionChange = (SelectedIds: string[]) => void;

export declare type JCL_onDrawingEditorToolChange = (Tool: JCL_DrawingEditorTool) => void;

export declare type JCL_onDrawingEditorUndoStateChange = (canUndo: boolean, canRedo: boolean) => void;

export declare type JCL_onDrawingEditorValueChange = (Value: string) => void;

export declare type JCL_onFlatListItemClick = (Item: Indexable, List: Indexable[], Index: JCL_Ordinal, Event: PointerEvent) => void;

export declare type JCL_onFlatListItemMove = (sortedList: Indexable[], movedItemList: Indexable[], TargetItem: Indexable, Direction: 'before' | 'after') => void;

export declare type JCL_onFlatListItemsDropped = (Effect: JCL_DataDropEffect, draggedItems: Indexable[], List: Indexable[]) => void;

export declare type JCL_onFlatListSelectionChange = (selectedItems: Indexable[], List: Indexable[]) => void;

export declare type JCL_onKanbanColumnClick = (Column: Indexable, Event: PointerEvent) => void;

export declare type JCL_onKanbanTaskClick = (Task: Indexable, Column: Indexable, Event: PointerEvent) => void;

export declare type JCL_onKanbanTaskMove = (MovedTask: Indexable, FromColumn: Indexable, ToColumn: Indexable, ToIndex: JCL_Ordinal) => void;

export declare type JCL_onNestedListExpansionChange = (expandedItems: Indexable[]) => void;

export declare type JCL_onNestedListItemClick = (Item: Indexable, Event: PointerEvent) => void;

export declare type JCL_onNestedListItemMove = (ItemsToMove: Indexable[], TargetItem: Indexable, Direction: 'before' | 'after') => void;

export declare type JCL_onNestedListItemsDropped = (Effect: JCL_DataDropEffect, draggedItems: Indexable[], List: Indexable[]) => void;

export declare type JCL_onNestedListSelectionChange = (selectedItems: Indexable[]) => void;

export declare type JCL_onRealDrawEditorSelectionChange = (SelectedIds: string[]) => void;

export declare type JCL_onRealDrawEditorToolChange = (Tool: JCL_RealDrawEditorTool) => void;

export declare type JCL_onRealDrawEditorUndoStateChange = (canUndo: boolean, canRedo: boolean) => void;

export declare type JCL_onRealDrawEditorValueChange = (Value: string) => void;

export declare type JCL_onRichTextEditorImagePaste = (Data: DataTransfer) => void;

export declare type JCL_onRichTextEditorPaste = (Event: any) => void;

export declare type JCL_onRichTextEditorSelectionChange = (Selection: JCL_RichTextEditorSelection) => void;

export declare type JCL_onRichTextEditorUndoStateChange = (canUndo: boolean, canRedo: boolean) => void;

export declare type JCL_onRichTextEditorValueChange = (Value: string) => void;

export declare type JCL_onStickyNoteContentChange = (Key: JCL_StickyNoteKey, Content: string) => void;

export declare type JCL_onStickyNotesChange = (changedNotes: Indexable[]) => void;

export declare type JCL_onStickyNoteSelectionChange = (newSelectedKeys: JCL_StickyNoteKey[]) => void;

export declare type JCL_Ordinal = number;

/**** JCL_Overlay type ****/
export declare type JCL_Overlay = {
    Name: JCL_Name;
    isModal: boolean;
    Renderer: JCL_Renderer;
    onOpen?: Function;
    onClose?: Function;
    OffsetX?: JCL_Location;
    OffsetY?: JCL_Location;
    Width?: JCL_Dimension;
    Height?: JCL_Dimension;
    minWidth?: JCL_Dimension;
    minHeight?: JCL_Dimension;
    maxWidth?: JCL_Dimension;
    maxHeight?: JCL_Dimension;
    Role?: 'dialog' | 'alertdialog';
    Label?: string;
};

/**** Overlay Context ****/
declare type JCL_OverlayAction = (...Args: any[]) => any;

export declare const JCL_OverlayContext: Context<JCL_OverlayContextValue>;

export declare type JCL_OverlayContextValue = {
    OverlayName?: JCL_Name;
    openOverlay: JCL_OverlayAction;
    openOverlayAtPointer: JCL_OverlayAction;
    closeOverlay: JCL_OverlayAction;
    closeAllOverlays: JCL_OverlayAction;
    openOverlays: JCL_Name[];
    OverlayIsOpen: JCL_OverlayAction;
};

/**** JCL_OverlayView (used internally only) ****/
export declare function JCL_OverlayView(PropSet: Indexable): any;

export declare type JCL_Path = string;

export declare type JCL_PhoneNumber = string;

/**** accessibility ****/
export declare const JCL_PointerAccuracies: readonly ["coarse", "fine"];

export declare type JCL_PointerAccuracy = typeof JCL_PointerAccuracies[number];

/**** JCL_PointerDnDContext ****/
export declare const JCL_PointerDnDContext: Context<JCL_PointerDnDContextValue>;

/**** JCL_PointerDnDContextValue ****/
export declare type JCL_PointerDnDContextValue = {
    registerDropTarget: (TargetElement: HTMLElement, Entry: JCL_DropTargetEntry) => () => void;
    closestDropTarget: (clientX: number, clientY: number) => [HTMLElement, JCL_DropTargetEntry] | undefined;
};

/**** usePointerDragSupport ****/
export declare type JCL_PointerDragDropHandler = (dx: number, dy: number, x: number, y: number, Event: PointerEvent, DroppedOnto: HTMLElement, chosenEffect: JCL_DropEffect) => void;

export declare type JCL_PointerDropEffect = JCL_DropEffect;

/**** _validDropEffects — accepted values for JCL_DropEffect ****/
export declare const JCL_PointerDropEffects: string[];

/**** usePointerDropSupport ****/
export declare type JCL_PointerDropSupportCallbacks = {
    accepts: (Data: unknown, allowedEffects: JCL_PointerDropEffect[]) => JCL_DropEffect | false;
    onEnter?: (Data: unknown, Effect: JCL_PointerDropEffect, x: number, y: number) => void;
    onOver?: (Data: unknown, Effect: JCL_PointerDropEffect, x: number, y: number) => void;
    onLeave?: (Data: unknown) => void;
    onDrop?: (Data: unknown, Effect: JCL_PointerDropEffect, x: number, y: number) => void;
};

export declare type JCL_Position = {
    x: JCL_Location;
    y: JCL_Location;
};

export declare type JCL_PreferredContrast = typeof JCL_PreferredContrasts[number];

export declare const JCL_PreferredContrasts: readonly ["less", "more"];

export declare type JCL_PreferredMotion = typeof JCL_PreferredMotions[number];

export declare const JCL_PreferredMotions: readonly ["reduced"];

export declare type JCL_QRCodeECCLevel = typeof JCL_QRCodeECCLevels[number];

export declare const JCL_QRCodeECCLevels: readonly ["L", "M", "Q", "H"];

/**** styledQuarterView ****/
export declare const JCL_QuarterPattern = "\\d{4}-Q[1-4]";

export declare const JCL_QuarterRegExp: RegExp;

export declare type JCL_RealDrawBlendMode = ('normal' | 'darken' | 'multiply' | 'color-burn' | 'lighten' | 'screen' | 'color-dodge' | 'lighter' | 'overlay' | 'soft-light' | 'hard-light' | 'difference' | 'exclusion' | 'hue' | 'saturation' | 'color' | 'luminosity');

export declare class JCL_RealDrawEditor {
    #private;
    static registerEffect(Plugin: JCL_RealDrawEffectPlugin): void;
    static effectPluginFor(Type: string): JCL_RealDrawEffectPlugin | undefined;
    /**** object and scene model ****/
    Width: number;
    Height: number;
    ObjectList: JCL_RealDrawObject[];
    Callbacks: Indexable;
    /**** initialiseScene ****/
    initialiseScene(Width: number, Height: number): void;
    /**** objectWithId ****/
    objectWithId(Id: string): JCL_RealDrawObject | undefined;
    /**** addObject ****/
    addObject(Spec: Partial<JCL_RealDrawObject>): JCL_RealDrawObject;
    /**** removeObject ****/
    removeObject(Id: string): void;
    /**** configureObject ****/
    configureObject(Id: string, Spec: Partial<JCL_RealDrawObject>): void;
    /**** canvas, overlay and rendering ****/
    Canvas: HTMLCanvasElement;
    Context: CanvasRenderingContext2D;
    Overlay: SVGSVGElement;
    /**** attachTo ****/
    attachTo(Canvas: HTMLCanvasElement, Overlay: SVGSVGElement): void;
    /**** resizeViewCanvas ****/
    resizeViewCanvas(): void;
    /**** loadImageForObject ****/
    loadImageForObject(Obj: JCL_RealDrawObject): void;
    /**** requestRendering ****/
    requestRendering(): void;
    /**** render ****/
    render(): void;
    /**** refreshOverlay - creation preview + SVG handles for selection ****/
    refreshOverlay(): void;
    /**** viewport ****/
    Viewport: {
        ox: number;
        oy: number;
        scale: number;
    };
    GridSize: number;
    snapToGrid: boolean;
    showsGrid: boolean;
    /**** canvasToScene - converts a canvas-space point to scene space ****/
    canvasToScene(cx: number, cy: number): {
        x: number;
        y: number;
    };
    /**** sceneToCanvas ****/
    sceneToCanvas(sx: number, sy: number): {
        x: number;
        y: number;
    };
    /**** snapped ****/
    snapped(x: number, y: number): {
        x: number;
        y: number;
    };
    /**** setZoom ****/
    setZoom(Factor: number): void;
    /**** get ZoomFactor ****/
    get ZoomFactor(): number;
    /**** zoomToFit ****/
    zoomToFit(): void;
    /**** pan ****/
    pan(dx: number, dy: number): void;
    /**** pointer input ****/
    currentTool: JCL_RealDrawEditorTool;
    readonly: boolean;
    DragState: Indexable | undefined;
    /**** object creation tools ****/
    setTool(Tool: JCL_RealDrawEditorTool): void;
    /**** finishPolygon - called externally (e.g. double-click or Enter) ****/
    finishPolygon(): void;
    /**** rotateSelection ****/
    rotateSelection(angleDeg: number): void;
    /**** selection ****/
    SelectedIds: string[];
    /**** selectIds ****/
    selectIds(IdList: string[]): void;
    /**** selectAll ****/
    selectAll(): void;
    /**** clearSelection ****/
    clearSelection(): void;
    /**** deleteSelection ****/
    deleteSelection(): void;
    /**** text tool ****/
    insertText(Text: string, X: number, Y: number): JCL_RealDrawObject;
    /**** copySelection ****/
    copySelection(): void;
    /**** cutSelection ****/
    cutSelection(): void;
    /**** pasteClipboard ****/
    pasteClipboard(): void;
    /**** duplicateSelection ****/
    duplicateSelection(): void;
    /**** z-order ****/
    bringToFront(): void;
    sendToBack(): void;
    raiseSelection(): void;
    lowerSelection(): void;
    /**** grouping - groups are represented as a single 'rect' object with    ****/
    /**** a special 'GroupMembers' extra property (lightweight implementation) ****/
    groupSelection(): void;
    ungroupSelection(): void;
    /**** change history (undo / redo) ****/
    Snapshots: string[];
    SnapshotIndex: number;
    /**** captureSnapshot ****/
    captureSnapshot(): void;
    /**** undo ****/
    undo(): void;
    /**** redo ****/
    redo(): void;
    /**** canUndo / canRedo ****/
    canUndo(): boolean;
    canRedo(): boolean;
    /**** announceUndoState ****/
    announceUndoState(): void;
    /**** announceChange ****/
    announceChange(): void;
    /**** getValue - serialises the scene to a JSON string ****/
    getValue(): string;
    /**** setValue - replaces the scene without firing "onValueChange" ****/
    setValue(Value: string): void;
    /**** importImage - adds an image object from a data URL or Blob ****/
    importImage(Source: string | Blob): Promise<JCL_RealDrawObject>;
    /**** exportedBlob - flattens the scene to a Blob ****/
    exportedBlob(Format?: string): Promise<Blob>;
    destroy(): void;
}

export declare type JCL_RealDrawEditorTextRequest = (currentText: string) => string | undefined | Promise<string | undefined>;

export declare type JCL_RealDrawEditorTool = ('select' | 'rect' | 'ellipse' | 'polygon' | 'text' | 'image');

export declare const JCL_RealDrawEditorTools: JCL_RealDrawEditorTool[];

export declare type JCL_RealDrawEffect = {
    Type: JCL_RealDrawEffectType | string;
    enabled: boolean;
    Color?: string;
    Angle?: number;
    Distance?: number;
    Blur?: number;
    Spread?: number;
    Depth?: number;
    Direction?: 'up' | 'down';
    StartColor?: string;
    EndColor?: string;
    GradientAngle?: number;
    ImageData?: string;
    Width?: number;
    Position?: 'outside' | 'inside' | 'center';
    [Key: string]: any;
};

export declare type JCL_RealDrawEffectParamSpec = {
    Name: string;
    Type: 'color' | 'number' | 'angle' | 'select' | 'toggle';
    Label: string;
    Default: any;
    Min?: number;
    Max?: number;
    Options?: string[];
};

export declare type JCL_RealDrawEffectPlugin = {
    Type: string;
    Label: string;
    Phase: 'before' | 'overlay' | 'after';
    Parameters: JCL_RealDrawEffectParamSpec[];
    render(Context: CanvasRenderingContext2D, Object: JCL_RealDrawObject, Params: Indexable, Scratch: OffscreenCanvas): void;
};

export declare type JCL_RealDrawEffectType = ('DropShadow' | 'InnerShadow' | 'OuterGlow' | 'InnerGlow' | 'InnerBevel' | 'OuterBevel' | 'Emboss' | 'PillowEmboss' | 'ColorOverlay' | 'GradientOverlay' | 'TextureOverlay' | 'Stroke');

export declare type JCL_RealDrawObject = {
    Id: string;
    Type: 'rect' | 'ellipse' | 'polygon' | 'text' | 'image';
    X: number;
    Y: number;
    Width: number;
    Height: number;
    Rotation: number;
    Opacity: number;
    BlendMode: JCL_RealDrawBlendMode;
    FillColor: string;
    StrokeColor: string;
    StrokeWidth: number;
    Effects: JCL_RealDrawEffect[];
    Text?: string;
    FontFamily?: string;
    FontSize?: number;
    FontWeight?: 'normal' | 'bold';
    FontStyle?: 'normal' | 'italic';
    ImageData?: string;
    Points?: {
        X: number;
        Y: number;
    }[];
};

export declare const JCL_ReferrerPolicies: string[];

export declare type JCL_ReferrerPolicy = typeof JCL_ReferrerPolicies[number];

export declare type JCL_Renderer = (PropSet: Indexable) => any;

export declare type JCL_RichTextEditorSelection = {
    Text: string;
    isCollapsed: boolean;
    Path: string;
};

export declare type JCL_Selector = string;

export declare type JCL_Size = {
    Width: JCL_Dimension;
    Height: JCL_Dimension;
};

export declare type JCL_SpreadsheetColumn = {
    type?: JCL_SpreadsheetColumnType;
    title?: string;
    width?: number;
    readOnly?: boolean;
    source?: any[];
    format?: string;
    mask?: string;
    align?: 'left' | 'center' | 'right';
};

/**** type definitions ****/
export declare type JCL_SpreadsheetColumnType = ('text' | 'numeric' | 'dropdown' | 'checkbox' | 'calendar' | 'color' | 'image' | 'html' | 'autonumber');

export declare type JCL_SpreadsheetHandle = {
    instance: any;
    getData: () => any[][];
    setData: (Data: any[][]) => void;
    getCell: (Column: number, Row: number) => any;
    setCell: (Column: number, Row: number, Value: any) => void;
    focus: () => void;
};

export declare type JCL_StickyNote = {
    Key: JCL_StickyNoteKey;
    Position: JCL_StickyNotePosition;
    Size: JCL_StickyNoteSize;
    Type: 'text' | 'html' | 'markdown' | string;
    Content: string;
    FontFamily?: string;
    FontSize?: number;
    FontWeight?: number | string;
    LineHeight?: number;
    ForegroundColor?: string;
    BackgroundColor?: string;
};

export declare type JCL_StickyNoteKey = string;

export declare type JCL_StickyNotePosition = {
    x: number;
    y: number;
};

export declare type JCL_StickyNoteRenderer = (Note: Indexable, isSelected: boolean) => any;

export declare type JCL_StickyNoteSize = {
    Width: number;
    Height: number;
};

/**** ValueIsHTMLFormat ****/
export declare const JCL_supportedHTMLFormats: string[];

/**** ValueIsImageFormat ****/
export declare const JCL_supportedImageFormats: string[];

/**** ValueIsMarkdownFormat ****/
export declare const JCL_supportedMarkdownFormats: string[];

/**** ValueIsTextFormat ****/
export declare const JCL_supportedTextFormats: string[];

export declare type JCL_Swatch = z.infer<typeof JCL_SwatchSchema>;

export declare type JCL_SwatchKey = keyof typeof JCL_SwatchSchema.shape;

export declare const JCL_SwatchKeys: JCL_SwatchKey[];

export declare const JCL_SwatchSchema: z.ZodObject<{
    '--jcl-bg-color': z.ZodOptional<z.ZodString>;
    '--jcl-fg-color': z.ZodOptional<z.ZodString>;
    '--jcl-primary-bg-color': z.ZodOptional<z.ZodString>;
    '--jcl-primary-fg-color': z.ZodOptional<z.ZodString>;
    '--jcl-secondary-bg-color': z.ZodOptional<z.ZodString>;
    '--jcl-secondary-fg-color': z.ZodOptional<z.ZodString>;
    '--jcl-muted-bg-color': z.ZodOptional<z.ZodString>;
    '--jcl-muted-fg-color': z.ZodOptional<z.ZodString>;
    '--jcl-destructive-bg-color': z.ZodOptional<z.ZodString>;
    '--jcl-destructive-fg-color': z.ZodOptional<z.ZodString>;
    '--jcl-accent-bg-color': z.ZodOptional<z.ZodString>;
    '--jcl-accent-fg-color': z.ZodOptional<z.ZodString>;
    '--jcl-success-bg-color': z.ZodOptional<z.ZodString>;
    '--jcl-success-fg-color': z.ZodOptional<z.ZodString>;
    '--jcl-warning-bg-color': z.ZodOptional<z.ZodString>;
    '--jcl-warning-fg-color': z.ZodOptional<z.ZodString>;
    '--jcl-border-color': z.ZodOptional<z.ZodString>;
    '--jcl-input-border-color': z.ZodOptional<z.ZodString>;
    '--jcl-ring-color': z.ZodOptional<z.ZodString>;
    '--jcl-border-radius': z.ZodOptional<z.ZodString>;
    '--jcl-font': z.ZodOptional<z.ZodString>;
    '--jcl-serif-font': z.ZodOptional<z.ZodString>;
    '--jcl-sans-serif-font': z.ZodOptional<z.ZodString>;
    '--jcl-monospace-font': z.ZodOptional<z.ZodString>;
}, z.core.$strip>;

export declare type JCL_SwatchSet = z.infer<typeof JCL_SwatchSetSchema>;

export declare const JCL_SwatchSetSchema: z.ZodObject<{
    light: z.ZodObject<{
        '--jcl-bg-color': z.ZodOptional<z.ZodString>;
        '--jcl-fg-color': z.ZodOptional<z.ZodString>;
        '--jcl-primary-bg-color': z.ZodOptional<z.ZodString>;
        '--jcl-primary-fg-color': z.ZodOptional<z.ZodString>;
        '--jcl-secondary-bg-color': z.ZodOptional<z.ZodString>;
        '--jcl-secondary-fg-color': z.ZodOptional<z.ZodString>;
        '--jcl-muted-bg-color': z.ZodOptional<z.ZodString>;
        '--jcl-muted-fg-color': z.ZodOptional<z.ZodString>;
        '--jcl-destructive-bg-color': z.ZodOptional<z.ZodString>;
        '--jcl-destructive-fg-color': z.ZodOptional<z.ZodString>;
        '--jcl-accent-bg-color': z.ZodOptional<z.ZodString>;
        '--jcl-accent-fg-color': z.ZodOptional<z.ZodString>;
        '--jcl-success-bg-color': z.ZodOptional<z.ZodString>;
        '--jcl-success-fg-color': z.ZodOptional<z.ZodString>;
        '--jcl-warning-bg-color': z.ZodOptional<z.ZodString>;
        '--jcl-warning-fg-color': z.ZodOptional<z.ZodString>;
        '--jcl-border-color': z.ZodOptional<z.ZodString>;
        '--jcl-input-border-color': z.ZodOptional<z.ZodString>;
        '--jcl-ring-color': z.ZodOptional<z.ZodString>;
        '--jcl-border-radius': z.ZodOptional<z.ZodString>;
        '--jcl-font': z.ZodOptional<z.ZodString>;
        '--jcl-serif-font': z.ZodOptional<z.ZodString>;
        '--jcl-sans-serif-font': z.ZodOptional<z.ZodString>;
        '--jcl-monospace-font': z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
    dark: z.ZodObject<{
        '--jcl-bg-color': z.ZodOptional<z.ZodString>;
        '--jcl-fg-color': z.ZodOptional<z.ZodString>;
        '--jcl-primary-bg-color': z.ZodOptional<z.ZodString>;
        '--jcl-primary-fg-color': z.ZodOptional<z.ZodString>;
        '--jcl-secondary-bg-color': z.ZodOptional<z.ZodString>;
        '--jcl-secondary-fg-color': z.ZodOptional<z.ZodString>;
        '--jcl-muted-bg-color': z.ZodOptional<z.ZodString>;
        '--jcl-muted-fg-color': z.ZodOptional<z.ZodString>;
        '--jcl-destructive-bg-color': z.ZodOptional<z.ZodString>;
        '--jcl-destructive-fg-color': z.ZodOptional<z.ZodString>;
        '--jcl-accent-bg-color': z.ZodOptional<z.ZodString>;
        '--jcl-accent-fg-color': z.ZodOptional<z.ZodString>;
        '--jcl-success-bg-color': z.ZodOptional<z.ZodString>;
        '--jcl-success-fg-color': z.ZodOptional<z.ZodString>;
        '--jcl-warning-bg-color': z.ZodOptional<z.ZodString>;
        '--jcl-warning-fg-color': z.ZodOptional<z.ZodString>;
        '--jcl-border-color': z.ZodOptional<z.ZodString>;
        '--jcl-input-border-color': z.ZodOptional<z.ZodString>;
        '--jcl-ring-color': z.ZodOptional<z.ZodString>;
        '--jcl-border-radius': z.ZodOptional<z.ZodString>;
        '--jcl-font': z.ZodOptional<z.ZodString>;
        '--jcl-serif-font': z.ZodOptional<z.ZodString>;
        '--jcl-sans-serif-font': z.ZodOptional<z.ZodString>;
        '--jcl-monospace-font': z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
}, z.core.$strip>;

export declare type JCL_Text = string;

export declare type JCL_Textline = string;

export declare type JCL_Theme = typeof JCL_Themes[number];

/**** theming ****/
export declare const JCL_Themes: readonly ["auto", "light", "dark"];

/**** nativeTimeInput ****/
export declare const JCL_TimePattern = "([01]\\d|2[0-3]):[0-5]\\d(:[0-5]\\d)?";

export declare const JCL_TimeRegExp: RegExp;

export declare type JCL_Toast = {
    Name?: JCL_Name;
    Renderer: JCL_Renderer;
    Duration?: number;
    onOpen?: Function;
    onClose?: Function;
};

/**** Toast Context ****/
declare type JCL_ToastAction = (...Args: any[]) => any;

export declare const JCL_ToastContext: Context<JCL_ToastContextValue>;

export declare type JCL_ToastContextValue = {
    showToast: JCL_ToastAction;
    closeToast: JCL_ToastAction;
    closeAllToasts: JCL_ToastAction;
    openToasts: JCL_Name[];
    ToastIsOpen: JCL_ToastAction;
};

/**** JCL_Toast type ****/
export declare type JCL_ToastPlacement = ('top-left' | 'top-right' | 'bottom-left' | 'bottom-right');

/**** JCL_Underlay (used internally only) ****/
export declare function JCL_Underlay(PropSet: Indexable): any;

export declare type JCL_URL = string;

/**** nativeWeekInput ****/
export declare const JCL_WeekPattern = "\\d{4}-W\\d{2}";

export declare const JCL_WeekRegExp: RegExp;

/**** Label ****/
export declare function Label(PropSet: Indexable): any;

export declare function legacyAccordionFold(PropSet: Indexable): any;

export declare function legacyBitmapEditor(PropSet: Indexable): any;

export declare function legacyChatView(PropSet: Indexable): any;

/**** legacyChatViewAssistantExtra/UserExtra ****/
export declare function legacyChatViewAssistantExtra(PropSet: Indexable): any;

/**** legacyChatViewControls ****/
export declare function legacyChatViewControls(PropSet: Indexable): any;

export declare function legacyChatViewUserExtra(PropSet: Indexable): any;

export declare function legacyCodeEditor(PropSet: Indexable): any;

export declare function legacyDataFlowProcessView(PropSet: Indexable): any;

export declare function legacyDrawingEditor(PropSet: Indexable): any;

/**** legacyFileDropArea ****/
export declare function legacyFileDropArea(PropSet: Indexable): any;

export declare function legacyFlatListView(PropSet: Indexable): any;

export declare function legacyKanbanBoard(PropSet: Indexable): any;

export declare function legacyNestedListView(PropSet: Indexable): any;

export declare function legacyNoteBoard(PropSet: Indexable): any;

/**** legacyPseudoDropDown ****/
export declare function legacyPseudoDropDown(PropSet: Indexable): any;

/**** legacyPseudoFileInput ****/
export declare function legacyPseudoFileInput(PropSet: Indexable): any;

export declare function legacyQRCodeView(PropSet: Indexable): any;

export declare function legacyRealDrawEditor(PropSet: Indexable): any;

export declare function legacyRichTextEditor(PropSet: Indexable): any;

export declare function legacySpreadsheetEditor(PropSet: Indexable): any;

export declare function legacyTabStrip(PropSet: Indexable): any;

export declare function loadedLibrary(Specifier: string): Promise<any>;

export declare function loadedMarkdownRenderer(): Promise<any>;

export declare function loadMarkdownLibraries(): Promise<void>;

/**** MarkdownAsHTML ****/
export declare function MarkdownAsHTML(Markdown: string): Promise<string>;

/**** MarkdownAsText ****/
export declare function MarkdownAsText(Markdown: string): Promise<string>;

/**** MarkdownFileReadAsHTML ****/
export declare function MarkdownFileReadAsHTML(File: globalThis.File): Promise<string>;

/**** MarkdownFileReadAsText ****/
export declare function MarkdownFileReadAsText(File: globalThis.File): Promise<string>;

/**** MarkdownRenderer (remains undefined until its libraries were loaded) ****/
export declare let MarkdownRenderer: any;

/**** MarkdownView ****/
export declare function MarkdownView(PropSet: Indexable): any;

/**** MediaQueryMatches ****/
export declare function MediaQueryMatches(Query: string): boolean;

/**** bundled exports ****/
export declare const misc: {
    readFileAsText: typeof readFileAsText;
    readFileAsBinary: typeof readFileAsBinary;
    readFileAsDataURL: typeof readFileAsDataURL;
    HTMLasText: typeof HTMLasText;
    HTMLasMarkdown: typeof HTMLasMarkdown;
    HTMLFileReadAsText: typeof HTMLFileReadAsText;
    HTMLFileReadAsMarkdown: typeof HTMLFileReadAsMarkdown;
    MarkdownAsText: typeof MarkdownAsText;
    MarkdownAsHTML: typeof MarkdownAsHTML;
    MarkdownFileReadAsText: typeof MarkdownFileReadAsText;
    MarkdownFileReadAsHTML: typeof MarkdownFileReadAsHTML;
    DOCXasText: typeof DOCXasText;
    DOCXasHTML: typeof DOCXasHTML;
    DOCXasMarkdown: typeof DOCXasMarkdown;
    DOCXFileReadAsText: typeof DOCXFileReadAsText;
    DOCXFileReadAsHTML: typeof DOCXFileReadAsHTML;
    DOCXFileReadAsMarkdown: typeof DOCXFileReadAsMarkdown;
    PDFasText: typeof PDFasText;
    PDFFileReadAsText: typeof PDFFileReadAsText;
    HTMLtoText: typeof HTMLtoText;
    HTMLtoMarkdown: typeof HTMLtoMarkdown;
    parseHTML: typeof parseHTML;
    escapedHTMLAttribute: typeof escapedHTMLAttribute;
    unescapedHTMLAttribute: typeof unescapedHTMLAttribute;
};

/**** missingProperty ****/
export declare function missingProperty(Identifier: JCL_Identifier): never;

/**** nativeButton ****/
export declare function nativeButton(PropSet: Indexable): any;

/**** nativeCheckbox ****/
export declare function nativeCheckbox(PropSet: Indexable): any;

/**** nativeColorInput ****/
export declare function nativeColorInput(PropSet: Indexable): any;

export declare function nativeDateInput(PropSet: Indexable): any;

export declare function nativeDateTimeInput(PropSet: Indexable): any;

/**** nativeDropDown ****/
export declare function nativeDropDown(PropSet: Indexable): any;

/**** nativeEMailAddressInput ****/
export declare function nativeEMailAddressInput(PropSet: Indexable): any;

/**** nativeFileInput ****/
export declare function nativeFileInput(PropSet: Indexable): any;

/**** nativeGauge ****/
export declare function nativeGauge(PropSet: Indexable): any;

export declare function nativeMonthInput(PropSet: Indexable): any;

/**** nativeNameForLocale — returns the language name in its own language ****/
export declare function nativeNameForLocale(Locale: JCL_Locale): string;

/**** nativeNumberInput ****/
export declare function nativeNumberInput(PropSet: Indexable): any;

/**** nativePasswordInput ****/
export declare function nativePasswordInput(PropSet: Indexable): any;

/**** nativePhoneNumberInput ****/
export declare function nativePhoneNumberInput(PropSet: Indexable): any;

/**** nativeProgressbar ****/
export declare function nativeProgressbar(PropSet: Indexable): any;

/**** nativeRadiobutton ****/
export declare function nativeRadiobutton(PropSet: Indexable): any;

/**** nativeSearchInput ****/
export declare function nativeSearchInput(PropSet: Indexable): any;

/**** nativeSlider ****/
export declare function nativeSlider(PropSet: Indexable): any;

/**** nativeTextInput ****/
export declare function nativeTextInput(PropSet: Indexable): any;

/**** nativeTextlineInput ****/
export declare function nativeTextlineInput(PropSet: Indexable): any;

export declare function nativeTimeInput(PropSet: Indexable): any;

/**** nativeURLInput ****/
export declare function nativeURLInput(PropSet: Indexable): any;

export declare function nativeWeekInput(PropSet: Indexable): any;

/**** bundled exports ****/
export declare const net: {
    InternetIsAvailable: typeof InternetIsAvailable;
    ServerIsReachable: typeof ServerIsReachable;
    fetched: typeof fetched;
    fetchedText: typeof fetchedText;
    fetchedJSON: typeof fetchedJSON;
    fetchedBinary: typeof fetchedBinary;
    fetchedBlob: typeof fetchedBlob;
    fetchedDataURL: typeof fetchedDataURL;
    fetchedAsText: typeof fetchedAsText;
    fetchedAsHTML: typeof fetchedAsHTML;
    fetchedAsMarkdown: typeof fetchedAsMarkdown;
    DescriptionOfHTTPStatus: typeof DescriptionOfHTTPStatus;
    HTTPMessageForStatus: {
        [code: number]: string;
    };
    SearXNG: Indexable;
};

/**** normalizedName ****/
export declare function normalizedName(Name: JCL_Name): JCL_Name;

export declare function OperationWasConfirmed(Message?: string): boolean;

/**** OverlayBase ****/
export declare function OverlayBase(PropSet: Indexable): any;

export declare function parseablePropSet(PropSet: Indexable): Indexable;

/**** parseHTML ****/
export declare function parseHTML(HTML: string, Callbacks: HTMLParserCallbackSet): void;

/**** PDFasText ****/
export declare function PDFasText(Buffer: ArrayBuffer): Promise<string>;

/**** PDFFileReadAsText ****/
export declare function PDFFileReadAsText(File: globalThis.File): Promise<string>;

export { PointerType }

export { primaryInput }

/**** PseudoRef ****/
export declare function PseudoRef(Value?: any): Indexable;

/**** readFileAsBinary ****/
export declare function readFileAsBinary(File: globalThis.File): Promise<ArrayBuffer>;

/**** readFileAsDataURL ****/
export declare function readFileAsDataURL(File: globalThis.File): Promise<string>;

/**** readFileAsText ****/
export declare function readFileAsText(File: globalThis.File): Promise<string>;

export declare function registerCodeEditorLanguage(Name: string, Loader: JCL_CodeEditorLanguageLoader): void;

/**** registerSpreadsheetFormula - registers a single named formula ****/
export declare function registerSpreadsheetFormula(Name: string, Fn: Function): void;

/**** registerSpreadsheetFormulas - bulk-registers a whole formula module ****/
export declare function registerSpreadsheetFormulas(FormulaSet: Indexable): void;

/**** safelyRendered ****/
export declare function safelyRendered(Renderer: Function): any;

export declare const SearXNG: Indexable;

export declare function selective(PropSet: Indexable): any;

export declare type Serializable = serializableValue;

declare type serializableArray = serializableValue[];

declare type serializableObject = {
    [Key: string]: serializableValue;
};

/**** define serializable types ****/
declare type serializableValue = null | boolean | number | string | serializableObject | serializableArray;

/**** serializedTag ****/
export declare function serializedTag(TagName: string, Attributes: HTMLAttribute[], isUnary: boolean): string;

/**** ServerIsReachable ****/
export declare function ServerIsReachable(ServerURL: JCL_URL, Timeout?: number): Promise<boolean>;

export declare function Spacer(PropSet: Indexable): any;

export declare function stacked(PropSet: Indexable): any;

/**** styledAccordion ****/
export declare function styledAccordion(PropSet: Indexable): any;

/**** styledAccordionFold ****/
export declare function styledAccordionFold(PropSet: Indexable): any;

/**** styledAvatar ****/
export declare function styledAvatar(PropSet: Indexable): any;

/**** styledBadge ****/
export declare function styledBadge(PropSet: Indexable): any;

/**** styledBreadcrumb ****/
export declare function styledBreadcrumb(PropSet: Indexable): any;

/**** styledButton ****/
export declare function styledButton(PropSet: Indexable): any;

/**** styledCard ****/
export declare function styledCard(PropSet: Indexable): any;

export declare function styledCardAction(PropSet: Indexable): any;

/**** styledCardContent ****/
export declare function styledCardContent(PropSet: Indexable): any;

/**** styledCardDescription ****/
export declare function styledCardDescription(PropSet: Indexable): any;

/**** styledCardFooter ****/
export declare function styledCardFooter(PropSet: Indexable): any;

/**** styledCardHeader (incl. styledCardAction) ****/
export declare function styledCardHeader(PropSet: Indexable): any;

/**** styledCardTitle ****/
export declare function styledCardTitle(PropSet: Indexable): any;

/**** styledCheckbox ****/
export declare function styledCheckbox(PropSet: Indexable): any;

/**** styledColorInput ****/
export declare function styledColorInput(PropSet: Indexable): any;

/**** styledCombobox ****/
export declare function styledCombobox(PropSet: Indexable): any;

/**** styledCommandGroup ****/
export declare function styledCommandGroup(PropSet: Indexable): any;

/**** styledCommandItem ****/
export declare function styledCommandItem(PropSet: Indexable): any;

export declare function styledCommandPalette(PropSet: Indexable): any;

/**** styledDataTable ****/
export declare function styledDataTable(PropSet: Indexable): any;

/**** styledDateInput ****/
export declare function styledDateInput(PropSet: Indexable): any;

/**** styledDatePicker ****/
export declare function styledDatePicker(PropSet: Indexable): any;

/**** styledDateTimeInput ****/
export declare function styledDateTimeInput(PropSet: Indexable): any;

/**** styledDropDown ****/
export declare function styledDropDown(PropSet: Indexable): any;

/**** styledDropDownMenu ****/
export declare function styledDropDownMenu(PropSet: Indexable): any;

/**** styledDropDownMenuGroup ****/
export declare function styledDropDownMenuGroup(PropSet: Indexable): any;

/**** styledDropDownMenuItem ****/
export declare function styledDropDownMenuItem(PropSet: Indexable): any;

/**** styledDropDownMenuSeparator ****/
export declare function styledDropDownMenuSeparator(PropSet: Indexable): any;

/**** styledDropDownMenuSubMenu ****/
export declare function styledDropDownMenuSubMenu(PropSet: Indexable): any;

/**** styledEMailAddressInput ****/
export declare function styledEMailAddressInput(PropSet: Indexable): any;

/**** styledFAIcon ****/
export declare function styledFAIcon(PropSet: Indexable): any;

/**** styledField ****/
export declare function styledField(PropSet: Indexable): any;

/**** styledFileInput ****/
export declare function styledFileInput(PropSet: Indexable): any;

/**** styledGauge ****/
export declare function styledGauge(PropSet: Indexable): any;

/**** styledIcon ****/
export declare function styledIcon(PropSet: Indexable): any;

/**** styledInputGroup (incl. styledInputGroupAddon) ****/
export declare function styledInputGroup(PropSet: Indexable): any;

export declare function styledInputGroupAddon(PropSet: Indexable): any;

/**** styledKbd ****/
export declare function styledKbd(PropSet: Indexable): any;

/**** styledMonthInput ****/
export declare function styledMonthInput(PropSet: Indexable): any;

/**** styledMonthView ****/
export declare function styledMonthView(PropSet: Indexable): any;

/**** styledMultiSwitch ****/
export declare function styledMultiSwitch(PropSet: Indexable): any;

/**** styledNumberInput ****/
export declare function styledNumberInput(PropSet: Indexable): any;

/**** styledPagination ****/
export declare function styledPagination(PropSet: Indexable): any;

/**** styledPasswordInput ****/
export declare function styledPasswordInput(PropSet: Indexable): any;

/**** styledPhoneNumberInput ****/
export declare function styledPhoneNumberInput(PropSet: Indexable): any;

/**** styledPopover ****/
export declare function styledPopover(PropSet: Indexable): any;

/**** styledProgressbar ****/
export declare function styledProgressbar(PropSet: Indexable): any;

export declare function styledQuarterView(PropSet: Indexable): any;

/**** styledRadiobutton ****/
export declare function styledRadiobutton(PropSet: Indexable): any;

/**** styledRadioGroup ****/
export declare function styledRadioGroup(PropSet: Indexable): any;

/**** styledSearchInput ****/
export declare function styledSearchInput(PropSet: Indexable): any;

/**** styledSidebar ****/
export declare function styledSidebar(PropSet: Indexable): any;

/**** styledSidebarContent ****/
export declare function styledSidebarContent(PropSet: Indexable): any;

/**** styledSidebarFooter ****/
export declare function styledSidebarFooter(PropSet: Indexable): any;

/**** styledSidebarGroup ****/
export declare function styledSidebarGroup(PropSet: Indexable): any;

/**** styledSidebarHeader ****/
export declare function styledSidebarHeader(PropSet: Indexable): any;

/**** styledSidebarItem ****/
export declare function styledSidebarItem(PropSet: Indexable): any;

/**** styledSidebarSeparator ****/
export declare function styledSidebarSeparator(PropSet: Indexable): any;

/**** styledSkeleton ****/
export declare function styledSkeleton(PropSet: Indexable): any;

/**** styledSlider ****/
export declare function styledSlider(PropSet: Indexable): any;

/**** styledSpinner ****/
export declare function styledSpinner(PropSet: Indexable): any;

/**** styledSwitch ****/
export declare function styledSwitch(PropSet: Indexable): any;

/**** styledTable ****/
export declare function styledTable(PropSet: Indexable): any;

export declare function styledTableBody(PropSet: Indexable): any;

export declare function styledTableCell(PropSet: Indexable): any;

export declare function styledTableFooter(PropSet: Indexable): any;

/**** styledTableHead/Cell ****/
export declare function styledTableHead(PropSet: Indexable): any;

/**** styledTableHeader/Body/Footer ****/
export declare function styledTableHeader(PropSet: Indexable): any;

/**** styledTableRow ****/
export declare function styledTableRow(PropSet: Indexable): any;

/**** styledTabStrip ****/
export declare function styledTabStrip(PropSet: Indexable): any;

/**** styledTextInput ****/
export declare function styledTextInput(PropSet: Indexable): any;

/**** styledTextlineInput ****/
export declare function styledTextlineInput(PropSet: Indexable): any;

/**** styledThemeSwitch ****/
export declare function styledThemeSwitch(PropSet: Indexable): any;

/**** styledTimeInput ****/
export declare function styledTimeInput(PropSet: Indexable): any;

/**** styledToast ****/
export declare function styledToast(PropSet: Indexable): any;

/**** styledTooltip ****/
export declare function styledTooltip(PropSet: Indexable): any;

/**** styledURLInput ****/
export declare function styledURLInput(PropSet: Indexable): any;

/**** styledWeekInput ****/
export declare function styledWeekInput(PropSet: Indexable): any;

/**** styledYearView ****/
export declare function styledYearView(PropSet: Indexable): any;

/**** Subtitle ****/
export declare function Subtitle(PropSet: Indexable): any;

export declare function SVGView(PropSet: Indexable): any;

export declare function tabular(PropSet: Indexable): any;

/**** TextFilledFrom - fills {{variable}} with some text ****/
export declare function TextFilledFrom(Text: JCL_Text, VariableSet: Indexable): JCL_Text;

/**** TextFromString ****/
export declare function TextFromString(Value?: string): JCL_Text | undefined;

/**** TextlineFromString ****/
export declare function TextlineFromString(Value?: string): JCL_Textline | undefined;

/**** TextlineView ****/
export declare function TextlineView(PropSet: Indexable): any;

export declare function TextView(PropSet: Indexable): any;

/**** throwError - simplifies construction of named errors ****/
export declare function throwError(Message: string): never;

/**** throwReadOnlyError ****/
export declare function throwReadOnlyError(Name: string): never;

/**** Title ****/
export declare function Title(PropSet: Indexable): any;

export declare function ToastBase(PropSet: Indexable): any;

/**** bundled exports ****/
export declare const ui: {
    render: typeof render;
    html: (strings: TemplateStringsArray, ...values: any[]) => VNode;
    Component: typeof Component;
    createRef: typeof createRef;
    createContext: typeof createContext;
    toChildArray: typeof toChildArray;
    cloneElement: typeof cloneElement;
    isValidElement: typeof isValidElement;
    createPortal: typeof createPortal;
    useId: typeof useId;
    useRef: typeof useRef;
    useState: typeof useState;
    useEffect: typeof useEffect;
    useLayoutEffect: typeof useLayoutEffect;
    useCallback: typeof useCallback;
    useMemo: typeof useMemo;
    useContext: typeof useContext;
    useErrorBoundary: typeof useErrorBoundary;
    loadedLibrary: typeof loadedLibrary;
    useLibraries: typeof useLibraries;
    useOnlineStatus: typeof useOnlineStatus;
    useWindowSize: typeof useWindowSize;
    useRerenderer: typeof useRerenderer;
    useCustomization: typeof useCustomization;
    useI18n: typeof useI18n;
    useConfiguration: typeof useConfiguration;
    useDragging: typeof useDragging;
    useClickDragging: typeof useClickDragging;
    useDataDragSupport: typeof useDataDragSupport;
    useDataDropSupport: typeof useDataDropSupport;
    usePointerDragSupport: typeof usePointerDragSupport;
    usePointerDropSupport: typeof usePointerDropSupport;
    useFileDropSupport: typeof useFileDropSupport;
    useOverlayContext: typeof useOverlayContext;
    useDialogContext: typeof useDialogContext;
    useToastContext: typeof useToastContext;
    JCL_PointerDnDContext: Context<JCL_PointerDnDContextValue>;
    JCL_OverlayContext: Context<JCL_OverlayContextValue>;
    JCL_DialogContext: Context<JCL_DialogContextValue>;
    JCL_ToastContext: Context<JCL_ToastContextValue>;
    installStylesheetFor: typeof installStylesheetFor;
    uninstallStylesheetFor: typeof uninstallStylesheetFor;
    safelyRendered: typeof safelyRendered;
    consumeEvent: typeof consumeEvent;
    consumingEvent: typeof consumeEvent;
    MediaQueryMatches: typeof MediaQueryMatches;
    PseudoRef: typeof PseudoRef;
    JCL_ErrorIndicator: typeof JCL_ErrorIndicator;
    normalizedName: typeof normalizedName;
    parseablePropSet: typeof parseablePropSet;
    TextlineFromString: typeof TextlineFromString;
    TextFromString: typeof TextFromString;
    Customizable: typeof Customizable;
    OverlayBase: typeof OverlayBase;
    DialogBase: typeof DialogBase;
    ToastBase: typeof ToastBase;
    fullsized: typeof fullsized;
    centered: typeof centered;
    horizontal: typeof horizontal;
    vertical: typeof vertical;
    tabular: typeof tabular;
    selective: typeof selective;
    stacked: typeof stacked;
    Dummy: typeof Dummy;
    Spacer: typeof Spacer;
    expandingSpacer: typeof expandingSpacer;
    horizontalSeparator: typeof horizontalSeparator;
    verticalSeparator: typeof verticalSeparator;
    Title: typeof Title;
    Subtitle: typeof Subtitle;
    Label: typeof Label;
    Description: typeof Description;
    Fineprint: typeof Fineprint;
    TextlineView: typeof TextlineView;
    TextView: typeof TextView;
    HTMLView: typeof HTMLView;
    MarkdownView: typeof MarkdownView;
    readonly MarkdownRenderer: any;
    loadMarkdownLibraries: typeof loadMarkdownLibraries;
    loadedMarkdownRenderer: typeof loadedMarkdownRenderer;
    ImageView: typeof ImageView;
    SVGView: typeof SVGView;
    WebView: typeof WebView;
    Icon: typeof Icon;
    FAIcon: typeof FAIcon;
    native: {
        Button: typeof nativeButton;
        Checkbox: typeof nativeCheckbox;
        Radiobutton: typeof nativeRadiobutton;
        Gauge: typeof nativeGauge;
        Progressbar: typeof nativeProgressbar;
        Slider: typeof nativeSlider;
        TextlineInput: typeof nativeTextlineInput;
        PasswordInput: typeof nativePasswordInput;
        NumberInput: typeof nativeNumberInput;
        EMailAddressInput: typeof nativeEMailAddressInput;
        PhoneNumberInput: typeof nativePhoneNumberInput;
        URLInput: typeof nativeURLInput;
        TimeInput: typeof nativeTimeInput;
        DateTimeInput: typeof nativeDateTimeInput;
        DateInput: typeof nativeDateInput;
        WeekInput: typeof nativeWeekInput;
        MonthInput: typeof nativeMonthInput;
        SearchInput: typeof nativeSearchInput;
        FileInput: typeof nativeFileInput;
        ColorInput: typeof nativeColorInput;
        DropDown: typeof nativeDropDown;
        TextInput: typeof nativeTextInput;
    };
    styled: {
        Button: typeof styledButton;
        Icon: typeof styledIcon;
        FAIcon: typeof styledFAIcon;
        Checkbox: typeof styledCheckbox;
        Radiobutton: typeof styledRadiobutton;
        Gauge: typeof styledGauge;
        Progressbar: typeof styledProgressbar;
        Slider: typeof styledSlider;
        TextlineInput: typeof styledTextlineInput;
        PasswordInput: typeof styledPasswordInput;
        NumberInput: typeof styledNumberInput;
        EMailAddressInput: typeof styledEMailAddressInput;
        PhoneNumberInput: typeof styledPhoneNumberInput;
        URLInput: typeof styledURLInput;
        TimeInput: typeof styledTimeInput;
        DateTimeInput: typeof styledDateTimeInput;
        DateInput: typeof styledDateInput;
        WeekInput: typeof styledWeekInput;
        MonthInput: typeof styledMonthInput;
        SearchInput: typeof styledSearchInput;
        FileInput: typeof styledFileInput;
        ColorInput: typeof styledColorInput;
        DropDown: typeof styledDropDown;
        TextInput: typeof styledTextInput;
        Badge: typeof styledBadge;
        Spinner: typeof styledSpinner;
        Kbd: typeof styledKbd;
        Avatar: typeof styledAvatar;
        Skeleton: typeof styledSkeleton;
        Breadcrumb: typeof styledBreadcrumb;
        Pagination: typeof styledPagination;
        Tooltip: typeof styledTooltip;
        Popover: typeof styledPopover;
        DropDownMenu: typeof styledDropDownMenu;
        DropDownMenuItem: typeof styledDropDownMenuItem;
        DropDownMenuSeparator: typeof styledDropDownMenuSeparator;
        DropDownMenuGroup: typeof styledDropDownMenuGroup;
        DropDownMenuSubMenu: typeof styledDropDownMenuSubMenu;
        CommandPalette: typeof styledCommandPalette;
        CommandItem: typeof styledCommandItem;
        CommandGroup: typeof styledCommandGroup;
        Toast: typeof styledToast;
        Card: typeof styledCard;
        CardHeader: typeof styledCardHeader;
        CardTitle: typeof styledCardTitle;
        CardDescription: typeof styledCardDescription;
        CardAction: typeof styledCardAction;
        CardContent: typeof styledCardContent;
        CardFooter: typeof styledCardFooter;
        Sidebar: typeof styledSidebar;
        SidebarHeader: typeof styledSidebarHeader;
        SidebarContent: typeof styledSidebarContent;
        SidebarFooter: typeof styledSidebarFooter;
        SidebarItem: typeof styledSidebarItem;
        SidebarSeparator: typeof styledSidebarSeparator;
        SidebarGroup: typeof styledSidebarGroup;
        Table: typeof styledTable;
        TableHeader: typeof styledTableHeader;
        TableBody: typeof styledTableBody;
        TableFooter: typeof styledTableFooter;
        TableRow: typeof styledTableRow;
        TableHead: typeof styledTableHead;
        TableCell: typeof styledTableCell;
        DataTable: typeof styledDataTable;
        Field: typeof styledField;
        InputGroup: typeof styledInputGroup;
        InputGroupAddon: typeof styledInputGroupAddon;
        Switch: typeof styledSwitch;
        MultiSwitch: typeof styledMultiSwitch;
        ThemeSwitch: typeof styledThemeSwitch;
        RadioGroup: typeof styledRadioGroup;
        Combobox: typeof styledCombobox;
        MonthView: typeof styledMonthView;
        QuarterView: typeof styledQuarterView;
        YearView: typeof styledYearView;
        DatePicker: typeof styledDatePicker;
        TabStrip: typeof styledTabStrip;
        Accordion: typeof styledAccordion;
        AccordionFold: typeof styledAccordionFold;
    };
    legacy: {
        PseudoFileInput: typeof legacyPseudoFileInput;
        PseudoDropDown: typeof legacyPseudoDropDown;
        FileDropArea: typeof legacyFileDropArea;
        TabStrip: typeof legacyTabStrip;
        AccordionFold: typeof legacyAccordionFold;
        FlatListView: typeof legacyFlatListView;
        NestedListView: typeof legacyNestedListView;
        RichTextEditor: typeof legacyRichTextEditor;
        CodeEditor: typeof legacyCodeEditor;
        DrawingEditor: typeof legacyDrawingEditor;
        BitmapEditor: typeof legacyBitmapEditor;
        RealDrawEditor: typeof legacyRealDrawEditor;
        Spreadsheet: typeof legacySpreadsheetEditor;
        KanbanBoard: typeof legacyKanbanBoard;
        registerSpreadsheetFormula: typeof registerSpreadsheetFormula;
        registerSpreadsheetFormulas: typeof registerSpreadsheetFormulas;
        NoteBoard: typeof legacyNoteBoard;
        ChatView: typeof legacyChatView;
        DataFlowProcessView: typeof legacyDataFlowProcessView;
        WorldPositionOfPort: typeof WorldPositionOfPort;
        QRCodeView: typeof legacyQRCodeView;
    };
    AppletView: typeof AppletView;
    AppletFailingWith: typeof AppletFailingWith;
};

/**** unescapedHTMLAttribute ****/
export declare function unescapedHTMLAttribute(OriginalValue: string): string;

/**** unfencedText - unfences the first fenced region only ****/
export declare function unfencedText(Text: JCL_Text): JCL_Text;

/**** uninstallStylesheetFor ****/
export declare function uninstallStylesheetFor(Name: JCL_Name): void;

export declare function useClickDragging({ ViewRef, Container, onlyFrom, neverFrom, Threshold, onClick, onDragStart, onDragContinuation, onDragFinish, onDragCancellation }: {
    ViewRef: any;
    Container?: JCL_Selector | HTMLElement | Function;
    onlyFrom?: JCL_Selector | HTMLElement;
    neverFrom?: JCL_Selector | HTMLElement;
    Threshold?: number;
    onClick?: JCL_ClickHandler;
    onDragStart?: JCL_DragHandler;
    onDragContinuation?: JCL_DragHandler;
    onDragFinish?: JCL_DragHandler;
    onDragCancellation?: JCL_DragHandler;
}): Function | undefined;

/**** useConfiguration (Configuration is an object of objects) ****/
export declare function useConfiguration(initialConfiguration?: Indexable | Function): [Indexable, Function];

/**** useCustomization — subscribe to state changes inside components ****/
export declare function useCustomization(): JCL_CustomizationContext;

export declare function useDataDragSupport(Data: string, MIMEType: string, { Effect, draggedGhost, onDropped, }?: {
    Effect?: JCL_DataDropEffect;
    draggedGhost?: (Event: DragEvent) => HTMLElement | null;
    onDropped?: (Effect: string, Event: DragEvent) => void;
}): {
    draggable: true;
    onDragStart: Function;
    onDragEnd: Function;
};

export declare function useDataDropSupport(MIMETypes: string | string[], { onDragEnter, onDragOver, onDragLeave, onDrop, }?: JCL_DataDropSupportCallbacks): {
    isOver: boolean;
    onDragEnter: Function;
    onDragOver: Function;
    onDragLeave: Function;
    onDrop: Function;
};

export declare function useDialogContext(): JCL_DialogContextValue;

/**** useDragging ****/
export declare function useDragging({ ViewRef, Container, onlyFrom, neverFrom, onDragStart, onDragContinuation, onDragFinish, onDragCancellation }: {
    ViewRef: any;
    Container?: JCL_Selector | HTMLElement | Function;
    onlyFrom?: JCL_Selector | HTMLElement;
    neverFrom?: JCL_Selector | HTMLElement;
    onDragStart?: JCL_DragHandler;
    onDragContinuation?: JCL_DragHandler;
    onDragFinish?: JCL_DragHandler;
    onDragCancellation?: JCL_DragHandler;
}): Function | undefined;

export declare function useFileDropSupport(accept?: string | string[], { multiple, disabled, onDragEnter, onDragOver, onDragLeave, onDrop, }?: JCL_FileDropSupportOptions): {
    isOver: boolean;
    onDragEnter: Function;
    onDragOver: Function;
    onDragLeave: Function;
    onDrop: Function;
};

export declare function useI18n(): JCL_i18n;

export declare function useLibraries(Loader: () => Promise<any>): boolean;

/**** useOnlineStatus ****/
export declare function useOnlineStatus(): boolean;

export declare function useOverlayContext(): JCL_OverlayContextValue;

export declare function usePointerDragSupport({ ViewRef, Container, onlyFrom, neverFrom, Threshold, Data, allowedEffects, GrabCursor, GrabbedCursor, onClick, onDragStart, onDragContinuation, onDragFinish, onDragCancellation, onDrop, }: {
    ViewRef: any;
    Container?: JCL_Selector | HTMLElement | Function;
    onlyFrom?: JCL_Selector | HTMLElement;
    neverFrom?: JCL_Selector | HTMLElement;
    Threshold?: number;
    Data?: unknown;
    allowedEffects?: JCL_PointerDropEffect[];
    GrabCursor?: string;
    GrabbedCursor?: string;
    onClick?: JCL_ClickHandler;
    onDragStart?: JCL_DragHandler;
    onDragContinuation?: JCL_DragHandler;
    onDragFinish?: JCL_DragHandler;
    onDragCancellation?: JCL_DragHandler;
    onDrop?: JCL_PointerDragDropHandler;
}): Function | undefined;

export declare function usePointerDropSupport({ ViewRef, accepts, onEnter, onOver, onLeave, onDrop, }: {
    ViewRef: any;
    accepts: (Data: unknown, allowedEffects: JCL_PointerDropEffect[]) => JCL_DropEffect | false;
    onEnter?: (Data: unknown, Effect: JCL_PointerDropEffect, x: number, y: number) => void;
    onOver?: (Data: unknown, Effect: JCL_PointerDropEffect, x: number, y: number) => void;
    onLeave?: (Data: unknown) => void;
    onDrop?: (Data: unknown, Effect: JCL_PointerDropEffect, x: number, y: number) => void;
}): {
    isOver: boolean;
};

export declare function useRerenderer(): () => void;

export declare function useToastContext(): JCL_ToastContextValue;

/**** useWindowSize ****/
export declare function useWindowSize(): {
    Width: number;
    Height: number;
};

/**** ValueIsAbortSignal ****/
export declare function ValueIsAbortSignal(Value: any): boolean;

export declare function ValueIsDate(Value: any): boolean;

export declare function ValueIsDateTime(Value: any): boolean;

/**** ValueIsDimension ****/
export declare function ValueIsDimension(Value: any): boolean;

/**** ValueIsGeometry ****/
export declare function ValueIsGeometry(Value: any): boolean;

export declare function ValueIsHTMLFormat(Value: any): boolean;

export declare function ValueIsIdentifier(Value: any): boolean;

export declare function ValueIsImageFormat(Value: any): boolean;

export declare function ValueIsISOLanguageCode(Value: any): boolean;

/**** ValueIsListOfEMailAddresses ****/
export declare function ValueIsListOfEMailAddresses(Value: any): boolean;

/**** ValueIsLocale ****/
export declare function ValueIsLocale(Value: any): boolean;

/**** ValueIsLocation ****/
export declare function ValueIsLocation(Value: any): boolean;

export declare function ValueIsMarkdownFormat(Value: any): boolean;

export declare function ValueIsMIMEType(Value: any): boolean;

export declare function ValueIsMonth(Value: any): boolean;

/**** ValueIsName ****/
export declare function ValueIsName(Value: any): boolean;

/**** ValueIsPath ****/
export declare function ValueIsPath(Value: any): boolean;

/**** ValueIsPhoneNumber ****/
export declare function ValueIsPhoneNumber(Value: any): boolean;

/**** ValueIsPosition ****/
export declare function ValueIsPosition(Value: any): boolean;

/**** ValueIsPreactRef ****/
export declare function ValueIsPreactRef(Value: any): boolean;

export declare function ValueIsPromise(Value: any): boolean;

export declare function ValueIsQuarter(Value: any): boolean;

/**** ValueIsSize ****/
export declare function ValueIsSize(Value: any): boolean;

/**** ValueIsSpecial ****/
export declare function ValueIsSpecial(Value: any): boolean;

/**** ValueIsSwatch ****/
export declare const ValueIsSwatch: (Value: any) => Value is {
    '--jcl-bg-color'?: string | undefined;
    '--jcl-fg-color'?: string | undefined;
    '--jcl-primary-bg-color'?: string | undefined;
    '--jcl-primary-fg-color'?: string | undefined;
    '--jcl-secondary-bg-color'?: string | undefined;
    '--jcl-secondary-fg-color'?: string | undefined;
    '--jcl-muted-bg-color'?: string | undefined;
    '--jcl-muted-fg-color'?: string | undefined;
    '--jcl-destructive-bg-color'?: string | undefined;
    '--jcl-destructive-fg-color'?: string | undefined;
    '--jcl-accent-bg-color'?: string | undefined;
    '--jcl-accent-fg-color'?: string | undefined;
    '--jcl-success-bg-color'?: string | undefined;
    '--jcl-success-fg-color'?: string | undefined;
    '--jcl-warning-bg-color'?: string | undefined;
    '--jcl-warning-fg-color'?: string | undefined;
    '--jcl-border-color'?: string | undefined;
    '--jcl-input-border-color'?: string | undefined;
    '--jcl-ring-color'?: string | undefined;
    '--jcl-border-radius'?: string | undefined;
    '--jcl-font'?: string | undefined;
    '--jcl-serif-font'?: string | undefined;
    '--jcl-sans-serif-font'?: string | undefined;
    '--jcl-monospace-font'?: string | undefined;
};

/**** ValueIsSwatchSet ****/
export declare const ValueIsSwatchSet: (Value: any) => Value is {
    light: {
        '--jcl-bg-color'?: string | undefined;
        '--jcl-fg-color'?: string | undefined;
        '--jcl-primary-bg-color'?: string | undefined;
        '--jcl-primary-fg-color'?: string | undefined;
        '--jcl-secondary-bg-color'?: string | undefined;
        '--jcl-secondary-fg-color'?: string | undefined;
        '--jcl-muted-bg-color'?: string | undefined;
        '--jcl-muted-fg-color'?: string | undefined;
        '--jcl-destructive-bg-color'?: string | undefined;
        '--jcl-destructive-fg-color'?: string | undefined;
        '--jcl-accent-bg-color'?: string | undefined;
        '--jcl-accent-fg-color'?: string | undefined;
        '--jcl-success-bg-color'?: string | undefined;
        '--jcl-success-fg-color'?: string | undefined;
        '--jcl-warning-bg-color'?: string | undefined;
        '--jcl-warning-fg-color'?: string | undefined;
        '--jcl-border-color'?: string | undefined;
        '--jcl-input-border-color'?: string | undefined;
        '--jcl-ring-color'?: string | undefined;
        '--jcl-border-radius'?: string | undefined;
        '--jcl-font'?: string | undefined;
        '--jcl-serif-font'?: string | undefined;
        '--jcl-sans-serif-font'?: string | undefined;
        '--jcl-monospace-font'?: string | undefined;
    };
    dark: {
        '--jcl-bg-color'?: string | undefined;
        '--jcl-fg-color'?: string | undefined;
        '--jcl-primary-bg-color'?: string | undefined;
        '--jcl-primary-fg-color'?: string | undefined;
        '--jcl-secondary-bg-color'?: string | undefined;
        '--jcl-secondary-fg-color'?: string | undefined;
        '--jcl-muted-bg-color'?: string | undefined;
        '--jcl-muted-fg-color'?: string | undefined;
        '--jcl-destructive-bg-color'?: string | undefined;
        '--jcl-destructive-fg-color'?: string | undefined;
        '--jcl-accent-bg-color'?: string | undefined;
        '--jcl-accent-fg-color'?: string | undefined;
        '--jcl-success-bg-color'?: string | undefined;
        '--jcl-success-fg-color'?: string | undefined;
        '--jcl-warning-bg-color'?: string | undefined;
        '--jcl-warning-fg-color'?: string | undefined;
        '--jcl-border-color'?: string | undefined;
        '--jcl-input-border-color'?: string | undefined;
        '--jcl-ring-color'?: string | undefined;
        '--jcl-border-radius'?: string | undefined;
        '--jcl-font'?: string | undefined;
        '--jcl-serif-font'?: string | undefined;
        '--jcl-sans-serif-font'?: string | undefined;
        '--jcl-monospace-font'?: string | undefined;
    };
};

export declare function ValueIsTextFormat(Value: any): boolean;

export declare function ValueIsTextWithTabs(Value: any): boolean;

export declare function ValueIsTime(Value: any): boolean;

/**** ValueIsVNode (just an alias for my personal convenience) ****/
export declare const ValueIsVNode: typeof isValidElement;

export declare function ValueIsWeek(Value: any): boolean;

export declare function vertical(PropSet: Indexable): any;

export declare function verticalSeparator(PropSet: Indexable): any;

export declare function WebView(PropSet: Indexable): any;

/**** WorldPositionOfPort - port position in pane *content* coordinates ****/
export declare function WorldPositionOfPort(Node: JCL_DataFlowNode | Indexable, Port: JCL_DataFlowPort | Indexable): {
    x: number;
    y: number;
};


export * from "javascript-interface-library";

export { }
