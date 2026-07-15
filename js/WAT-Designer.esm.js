/*******************************************************************************
*                                                                              *
*                        WebApp Tinkerer (WAT) Designer                        *
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
import { 
//  throwError,
quoted, HTMLsafe, ValuesAreEqual as _ValuesAreEqual, ValueIsNumber, ValueIsOrdinal, ValueIsText, ValueIsTextline, ValueIsPlainObject, ValueIsArray, ValueIsList, ValueIsListSatisfying, allowOrdinal, allowTextline, expectList, allowListSatisfying, allowFunction, allowOneOf, } from 'javascript-interface-library';
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
import Conversion from 'svelte-coordinate-conversion';
const { fromViewportTo } = Conversion;
/**** most WAD-specific controls are now thin wrappers around JCL components ****/
// n.b.: render/html/Component/useState/useRef/useEffect/useMemo/useCallback
// are taken from JCL_ui, NOT from a separately import-mapped "preact"/
// "htm/preact": JCL bundles its own copy of preact+htm at build time, so any
// independently loaded preact instance would be a *different* instance -
// mixing the two in the same render tree causes "Cannot read properties of
// undefined (reading '__H')" crashes once a JCL component's hooks run under
// the "wrong" instance's render loop.
// @ts-ignore TS2307 allow importing from "javascript-code-library"
import { ui as JCL_ui, JCL_noSelection, JCL_mixedValues } from 'javascript-code-library';
const JCL_native = JCL_ui.native;
const JCL_legacy = JCL_ui.legacy;
const { render, html, Component, useState, useRef, useEffect, useMemo, useCallback, } = JCL_ui;
import { customAlphabet } from 'nanoid';
// @ts-ignore TS2307 typescript has problems importing "nanoid-dictionary"
import { nolookalikesSafe } from 'nanoid-dictionary';
import { throwError, throwReadOnlyError, fromDocumentTo, WAT_FontWeights, WAT_FontStyles, WAT_TextDecorationLines, WAT_TextDecorationStyles, WAT_TextAlignments, WAT_BackgroundModes, WAT_BorderStyles, WAT_Cursors, WAT_Overflows, WAT_Orientations, ValueIsBehavior, ValueIsApplet, ValueIsPage, ValueIsWidget, ValueIsErrorReport, allowPage, acceptableValue, ValueIsLineList, ValueIsNumberList, BehaviorIsIntrinsic, GestureRecognizer, useDesigner, rerender as WAT_rerender, OperationWasConfirmed, } from "./WAT-Runtime.esm.js";
/**** constants for special input situations (now shared with JCL) ****/
// aliased to JCL's special values so that identity comparisons keep working
// on both sides of any WAD/JCL boundary
const noSelection = JCL_noSelection;
const multipleValues = JCL_mixedValues;
/**** HTMLsafe_ ****/
function HTMLsafe_(Argument, EOLReplacement) {
    return (Argument == null ? undefined : HTMLsafe(Argument, EOLReplacement));
}
//------------------------------------------------------------------------------
//--                           Stylesheet Handling                            --
//------------------------------------------------------------------------------
let StyleElement = document.getElementById('WAD-Stylesheet');
if (StyleElement == null) {
    StyleElement = document.createElement('style');
    StyleElement.id = 'WAD-Stylesheet';
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
*                        WebApp Tinkerer (WAT) Designer                        *
*                                                                              *
*******************************************************************************/

  .WAD.DesignerLayer {
    box-sizing:border-box;
    display:block; position:absolute; overflow:visible;
    left:0px; top:0px; right:0px; bottom:0px;
    padding:0px;
    background:none;

    color:black;
    font-family:'Source Sans Pro','Helvetica Neue',Helvetica,Arial,sans-serif;
    font-size:14px; font-weight:400; line-height:1.4; color:black;
    text-align:left; text-shadow:none;

    z-index:2000000;
    pointer-events:none;
  }

  .WAD.DesignerLayer * { box-sizing:border-box }

  .WAD.Content {
    display:block; position:absolute;
    left:0px; top:0px; width:100%; height:100%;
  }

/**** DesignerButton ****/

  .WAD.DesignerButton {
    display:block; position:fixed;
    width:32px; height:32px;
    background:white;
    border:solid 2px black; border-radius:50%;
    outline:solid 1px white;
    pointer-events:auto; cursor:grab;

    -webkit-touch-callout:none;
    -ms-touch-action:none; touch-action:none;
  }
  .WAD.DesignerButton > img {
    display:block; position:absolute;
    left:2px; top:2px; width:24px; height:24px;
    pointer-events:none;
  }

/**** horizontally/vertically/centered ****/

  .WAD.horizontally {
    display:flex; position:relative; flex-flow:row nowrap; align-items:stretch;
    margin:2px 0px 2px 0px;
  }

  .WAD.vertically {
    display:flex; position:relative; flex-flow:column nowrap; align-items:stretch;
  }

  .WAD.centered {
    display:flex; position:relative; flex-flow:row nowrap;
      align-items:center; justify-content:center;
  }

/**** Gap ****/

  .WAD.Gap {
    min-width:10px; flex:1 0 auto;
  }

/**** Icon ****/

  .WAD.Icon {
    display:flex; position:relative; align-items:center; justify-content:center;
    width:30px !important; height:30px !important;
    pointer-events:auto;
  }        /* "!important" beats JCL's fixed 24x24px rule for its icon boxes */
  .WAD.Icon.active {
    background:#e8f0ff;
    border:solid 2px lightgray; border-radius:4px;
    outline:none;              /* the border above replaces JCL's active outline */
  }
  .WAD.Icon div {
    display:block; position:relative;
    width:24px; height:24px;
    -webkit-mask-size:contain;           mask-size:contain;
    -webkit-mask-position:center center; mask-position:center center;
    pointer-events:none;
  }

/**** Label ****/

  .WAD.Label {
    display:block; position:relative;
    width:auto; height:30px;
    padding:4px 0px 0px 0px;
    font-size:14px; font-weight:bold; text-align:left;
  }

/**** Button ****/

  .WAD.Button {
    display:block; position:relative;
    width:auto; height:30px;
    border:solid 1px black; border-radius:4px;
    background:white; color:black;
    font-weight:bold;
  }

/**** Checkbox ****/

  .WAD.Checkbox {
    display:flex; position:relative; align-items:center; justify-content:center;
    width:30px; height:30px;
    pointer-events:none;
  }
  .WAD.Checkbox > .jcl-component.native-checkbox {
    position:relative;              /* JCL wraps the actual <input> in a div */
    width:100%; height:100%;
    pointer-events:none;
  }
  .WAD.Checkbox input {
    background:transparent; color:inherit;
    pointer-events:auto;
  }
/**** Radiobutton ****/

  .WAD.Radiobutton {
    display:flex; position:relative; align-items:center; justify-content:center;
    width:30px; height:30px;
    pointer-events:none;
  }
  .WAD.Radiobutton > .jcl-component.native-radiobutton {
    position:relative;              /* JCL wraps the actual <input> in a div */
    width:100%; height:100%;
    pointer-events:none;
  }
  .WAD.Radiobutton input {
    background:transparent; color:inherit;
    pointer-events:auto;
  }
/**** TextlineTab ****/

  .WAD.TextlineTab {
    display:inline-block; position:relative;
    width:auto; height:30px; padding:6px 10px 0px 10px;
    font-size:14px; text-align:center; cursor:pointer;
    user-select:none;
  }
  .WAD.TextlineTab.active {
    font-weight:bold; text-decoration:underline;
  }
/**** Name/Integer/URLInput ****/

  .WAD.TextLineInput, .WAD.NumberInput, .WAD.TimeInput {
    display:block; position:relative;
    width:auto; height:30px;
  }
  .WAD.TextLineInput > input, .WAD.NumberInput > input, .WAD.TimeInput > input {
    display:block; position:relative;
    left:0px; top:0px; width:100%; height:100%;
    border:solid 1px #888888; border-radius:2px;
    background:#e8f0ff; padding:0px 2px 0px 4px;
    pointer-events:auto;
  }                    /* still matches (and beats) JCL's bare input elements */
  .WAD.TextLineInput > input:read-only, .WAD.NumberInput > input:read-only,
  .WAD.TimeInput > input:read-only {
    background:transparent;
  }

/**** DropDown ****/

  .WAD.DropDown {
    display:block; position:relative;
    width:auto; height:30px;
  }
  .WAD.DropDown > select {
    display:block; position:relative;
    left:0px; top:0px; width:100%; height:100%;
    border:solid 1px #888888; border-radius:2px;
    background:#e8f0ff; padding:0px 2px 0px 2px;
    pointer-events:auto;
  }
/**** PseudoDropDown ****/

  .WAD.PseudoDropDown {
    display:flex; position:relative; align-items:center; justify-content:center;
    width:30px; height:30px;
    pointer-events:auto;
  }
  .WAD.PseudoDropDown div {
    display:block; position:relative;
    width:24px; height:24px;
    -webkit-mask-size:contain;           mask-size:contain;
    -webkit-mask-position:center center; mask-position:center center;
    pointer-events:none;
  }
  .WAD.PseudoDropDown > select {  /* for controls not (yet) based on JCL, */
    display:block; position:absolute;   /* e.g. WAD_BehaviorPseudoDropDown */
    left:0px; top:0px; right:0px; bottom:0px;
    opacity:0.01;
  }
  .WAD.PseudoDropDown > label {
    display:flex; position:relative;   /* JCL wraps icon + hidden <select> */
    width:100%; height:100%;           /* in a <label> and styles both     */
  }

/**** PseudoFileInput ****/

  .WAD.PseudoFileInput {
    display:flex; position:relative; align-items:center; justify-content:center;
    width:30px; height:30px;
    pointer-events:auto;
  }
  .WAD.PseudoFileInput > label {
    display:flex; position:relative;  /* JCL wraps icon + hidden <input> in */
    width:100%; height:100%;          /* a <label> and styles both itself  */
  }

/**** TextInput ****/

  .WAD.TextInput {
    display:block; position:relative;
    width:auto; height:auto; min-height:30px;
  }
  .WAD.TextInput > textarea {
    display:block; position:absolute;
    left:0px; top:0px; width:100%; height:100%;
    border:solid 1px #888888; border-radius:2px;
    background:#e8f0ff; padding:4px 2px 4px 4px;
    pointer-events:auto; resize:none;
  }
  .WAD.TextInput > textarea:read-only {
    background:transparent;
  }

/**** ColorInput ****/

  .WAD.ColorInput {
    display:block; position:relative;
    width:60px; height:30px;
  }
  .WAD.ColorInput > input {
    display:block; position:relative;
    left:0px; top:0px; width:100%; height:100%;
    border:solid 1px #888888; border-radius:2px;
    background:#e8f0ff; padding:0px;
    pointer-events:auto;
  }
  .WAD.ColorInput > input:read-only {
    background:transparent;
  }

/**** FlatListView ****/

  .WAD.FlatListView {
    display:flex; position:relative; flex-flow:column nowrap; align-items:stretch;
    overflow:scroll; overflow-x:auto; overflow-y:scroll; overscroll-behavior:contain;
    border:solid 1px #888888; border-radius:2px;
    background:#e8f0ff; padding:0px 2px 0px 4px;
  }

  .WAD.FlatListView.empty {
    overflow:hidden;
    background-color:#EEEEEE;
  }

  .WAD.FlatListView > div.Placeholder {
    display:flex; position:relative;
      flex-flow:column nowrap; align-items:center; justify-content:center;
    width:100%; height:100%;
  }

  .WAD.FlatListView > div.Placeholder > * {
    position:relative;
  }

  .WAD.FlatListView > div.ListItem {
    display:block; position:relative; overflow:hidden; flex:0 0 auto;
    left:0px; top:0px; width:auto; height:22px; line-height:22px;
    background:none;
    border:none; border-bottom:solid 1px lightgray;
    white-space:nowrap; text-overflow:ellipsis;
    user-select:none; pointer-events:auto;
  }

  .WAD.FlatListView > div.ListItem:last-child {
    border:none; border-bottom:solid 1px transparent;
  }

  .WAD.FlatListView > div.ListItem.selected {
    background:dodgerblue; color:white;
  }

/**** NestedListView ****/

  .WAD.NestedListView {
    display:flex; flex-flow:column nowrap; align-items:stretch;
    overflow:scroll; overflow-x:auto; overflow-y:scroll; overscroll-behavior:contain;
  }

  .WAD.NestedListView .ItemView {
    display:flex; flex-flow:column nowrap; align-items:stretch;
      position:relative; overflow:hidden; flex:0 0 auto;
    left:0px; top:0px; width:auto; height:auto;
    background:none; border:none;
    user-select:none;
  }

  .WAD.NestedListView .ItemLine {
    display:flex; flex-flow:row nowrap; align-items:stretch;
      position:relative; flex:0 0 auto;
    height:22px; line-height:22px;
    white-space:nowrap; text-overflow:ellipsis;
  }

  .WAD.NestedListView .ItemIcon {
    display:inline-block; position:relative;
    margin:6px 2px 0px 2px; width:10px; height:10px;
    pointer-events:none;
  }

  .WAD.NestedListView .ItemExpander {
    display:inline-block; position:relative;
    margin-top:4px; width:14px; height:14px;
    pointer-events:auto;
  }

  .WAD.NestedListView .ItemLabel {
    display:inline-block; position:relative; flex:1 0 auto;
    pointer-events:none;
  }

  .WAD.NestedListView .ItemLine.selected > .ItemLabel {
    background:dodgerblue; color:white;
  }

/**** Accordion ****/

  .WAD.Accordion {
    display:flex; position:relative; flex-flow:column nowrap; align-items:stretch;
    flex:1 1 auto; overflow-x:hidden; overflow-y:scroll; overscroll-behavior-y:contain;
    margin-top:4px;
  }

/**** Accordion Fold ****/

  .WAD.Fold {
    display:block; position:relative;
    left:0px; top:0px; width:100%; bottom:auto;
    margin:0px; margin-bottom:2px;
  }

  .WAD.Fold-Header {
    display:block; position:relative;
    width:100%; height:30px; background:#EEEEEE; border:none;
  }

  .WAD.Fold-Expander {
    display:block; position:absolute;
    left:2px; top:2px; width:24px; height:24px;
  }

  .WAD.Fold-Title {
    display:block; position:absolute;
    left:30px; top:-1px; bottom:0px; right:0px;
    font-size:14px; font-weight:bold; color:black; line-height:30px;
  }

  .WAD.Fold-Content {
    display:block; position:relative;
    left:0px; top:0px; width:100%; height:auto;
    padding:8px 0px 8px 4px;
  }
/**** horizontal/verticalSeparator ****/

  .WAD.horizontalSeparator {
    height:1px; margin:0px; margin-top:7px;
    border:none; border-top:solid 1px black
  }
  .WAD.verticalSeparator {
    width:1px; margin:0px; margin-left:7px;
    border:none; border-left:solid 1px black
  }

/**** Dialog ****/

  .WAD.Dialog {
    display:block; position:fixed;
    border:solid 1px #000000; border-radius:4px;
    background:white; color:black;
    box-shadow:0px 0px 10px 0px rgba(0,0,0,0.5);
    z-index:3000000;
    pointer-events:auto;
  }

  .WAD.Dialog > .Titlebar {
    display:block; position:absolute; overflow:hidden;
    left:0px; top:0px; right:0px; height:30px;
    background:#EEEEEE; border:none; border-radius:3px 3px 0px 0px;
    user-select:none; pointer-events:auto;

    -webkit-touch-callout:none;
    -ms-touch-action:none; touch-action:none;
  }

  .WAD.Dialog > .Titlebar > .Title {
    display:block; position:absolute;
    left:6px; top:3px; right:30px; height:24px;
    border:none;
    font-weight:bold; color:black; line-height:24px;
    user-select:none; pointer-events:none;
  }

  .WAD.Dialog > .Titlebar > .CloseButton {
    display:block; position:absolute;
    top:3px; right:4px; width:24px; height:24px;
    border:none;
    user-select:none; pointer-events:auto;
  }

  .WAD.Dialog > .ContentPane {
    display:block; position:absolute;
    left:0px; top:30px; right:0px; bottom:0px;
    border:none;
  }

  .WAD.resizable.Dialog > .ContentPane {
    display:block; position:absolute;
    left:0px; top:30px; right:0px; bottom:10px;
    border:none;
  }

  .WAD.resizable.Dialog > .leftResizer {
    display:block; position:absolute;
    left:0px; bottom:0px; width:30px; height:9px;
    border:none; border-top:solid 1px black; border-right:solid 1px black;
    border-radius:0px 0px 0px 3px;
    cursor:nesw-resize; pointer-events:auto;

    -webkit-touch-callout:none;
    -ms-touch-action:none; touch-action:none;
  }

  .WAD.resizable.Dialog > .middleResizer {
    display:block; position:absolute;
    left:30px; bottom:0px; right:30px; height:9px;
    border:none; border-top:solid 1px black;
    border-radius:0px;
    cursor:ns-resize; pointer-events:auto;

    -webkit-touch-callout:none;
    -ms-touch-action:none; touch-action:none;
  }

  .WAD.resizable.Dialog > .rightResizer {
    display:block; position:absolute;
    bottom:0px; right:0px; width:30px; height:9px;
    border:none; border-left:solid 1px black; border-top:solid 1px black;
    border-radius:0px 0px 3px 0px;
    cursor:nwse-resize; pointer-events:auto;

    -webkit-touch-callout:none;
    -ms-touch-action:none; touch-action:none;
  }

/**** ErrorView ****/

  .WAD.ErrorView {
    display:block; position:relative;
    width:auto; height:30px; overflow:hidden;
    white-space:nowrap; text-overflow:ellipsis;
    padding:4px 0px 0px 0px;
    font-size:14px; font-weight:normal; text-align:left; line-height:28px;
    border:none; border-top:solid 1px #888888;
  }

  .WAD.ErrorView.withError {
    color:red;
  }

/**** InspectorPane ****/

  .WAD.InspectorPane {
    display:flex; position:relative; flex-flow:column nowrap; align-items:stretch;
    flex: 1 1 auto;
    left:0px; top:0px; right:0px; bottom:0px; width:auto; height:auto;
    overflow:hidden;
  }/**** Layouter Layer ****/

  .WAD.LayouterLayer {
    display:block; position:absolute; overflow:visible;
    left:0px; top:0px; right:0px; bottom:0px;
    pointer-events:auto;

    -webkit-touch-callout:none;
    -ms-touch-action:none; touch-action:none;
  }

  .WAD.Cover {
    display:block; position:absolute;
    z-index:1000000;
    user-select:none; pointer-events:auto;

    -webkit-touch-callout:none;
    -ms-touch-action:none; touch-action:none;
  }

/**** Selection Markers ****/

  .WAD.Cover.selected {
    outline:dotted 2px orangered;
    cursor:grab;
  }

  .WAD.Cover.dragging.selected {
    cursor:grabbing;
  }

  .WAD.ShapeHandle {
    display:block; position:absolute;
    width:8px; height:8px;
    background:orangered; border:solid 1px darkgray;
    z-index:1000001; /* above .WAD.Cover */
    user-select:none; pointer-events:auto;

    -webkit-touch-callout:none;
    -ms-touch-action:none; touch-action:none;
  }

/**** Selection Lasso ****/

  .WAD.Lasso {
    display:block; position:absolute;
    background:rgba(255,69,0, 0.1); /* border:dashed 2px orangered; */
    pointer-events:none;
  }

/**** Dragging Guides ****/

  .WAD.horizontalGuide.Edge {
    display:block; position:absolute;
    left:0px; right:0px; height:1px;
    border-top:dashed 1px orangered;
    pointer-events:none;
  }
  .WAD.verticalGuide.Edge {
    display:block; position:absolute;
    top:0px; bottom:0px; width:1px;
    border-left:dashed 1px orangered;
    pointer-events:none;
  }

  .WAD.horizontalGuide.Center {
    display:block; position:absolute;
    left:0px; right:0px; height:1px;
    border-top:dotted 1px orangered;
    pointer-events:none;
  }
  .WAD.verticalGuide.Center {
    display:block; position:absolute;
    top:0px; bottom:0px; width:1px;
    border-left:dotted 1px orangered;
    pointer-events:none;
  }

  .WAD.Behavior {}
  .WAD.Behavior.selected { background:dodgerblue; color:white }
  .WAD.Behavior.broken   { text-decoration:red wavy underline }
  .WAD.Behavior.unused   { font-style:italic }


`.trimLeft());
/**** AssetsBase, IconFolder ****/
let AssetsBase = 'https://rozek.github.io/webapp-tinkerer/';
let IconFolder = AssetsBase + 'icons/';
//------------------------------------------------------------------------------
//--                              Designer State                              --
//------------------------------------------------------------------------------
const DesignerState = {
    DesignerDisabled: false, // temporarily disables Designer rendering
    Applet: undefined, // the "applet under design"
    isOpen: false, // when closed, only the DesignerButton is shown
    isLayouting: false, // the layouter inhibits applet operation
    DesignerButton: {
        isDragging: false,
        x: NaN, y: NaN
    },
    Toolbox: {
        Title: 'Toolbox', View: undefined,
        x: NaN, y: NaN, Width: 134, Height: 194,
    },
    Inspector: {
        Title: 'Inspector', View: undefined,
        x: NaN, y: NaN, Width: 380, Height: 550,
        minWidth: 380, minHeight: 550,
        ReportToShow: undefined, // workaround for strange closure problem
        ScrollPositions: {
            BehaviorBrowser: 0,
            AppletConfiguration: 0,
            PageBrowser: 0,
            PageConfiguration: 0,
            WidgetBrowser: 0,
            WidgetConfiguration: 0,
        },
        Expansions: {
            AppletConfiguration: { Scripting: true },
            PageConfiguration: { Scripting: true },
            WidgetConfiguration: { BehaviorSpecific: true, Scripting: true },
        },
        newBehaviorName: '',
        BehaviorExpansions: {},
    },
    SettingsDialog: {
        Title: 'WAT Settings', View: undefined,
        x: NaN, y: NaN, Width: 360, Height: 300,
        minWidth: 360, minHeight: 300,
    },
    BehaviorEditor: {
        Title: 'Behavior Editor', View: undefined,
        x: NaN, y: NaN, Width: 320, Height: 240,
        minWidth: 320, minHeight: 240,
        ReportToShow: undefined, // workaround for strange closure problem
        PendingSelection: undefined, // set by search navigation, applied once
    },
    SynopsisEditor: {
        Title: 'Synopsis Editor', View: undefined,
        x: NaN, y: NaN, Width: 320, Height: 240,
        minWidth: 320, minHeight: 240,
        Scope: 'Applet',
        PendingSelection: undefined, // set by search navigation, applied once
    },
    ValueEditor: {
        Title: 'Value Editor', View: undefined,
        x: NaN, y: NaN, Width: 320, Height: 240,
        minWidth: 320, minHeight: 240,
        PendingSelection: undefined, // set by search navigation, applied once
    },
    ScriptEditor: {
        Title: 'Script Editor', View: undefined,
        x: NaN, y: NaN, Width: 320, Height: 240,
        minWidth: 320, minHeight: 240,
        Scope: 'Applet',
        ReportToShow: undefined, // workaround for strange closure problem
        PendingSelection: undefined, // set by search navigation, applied once
    },
    CodeAssistant: {
        Title: 'WAT Code Assistant', View: undefined,
        x: NaN, y: NaN, Width: 320, Height: 240,
        minWidth: 320, minHeight: 240,
        Scope: 'Applet',
        ReportToShow: undefined, // workaround for strange closure problem
    },
    SearchDialog: {
        Title: 'Search within WAT', View: undefined,
        x: NaN, y: NaN, Width: 320, Height: 480,
        minWidth: 320, minHeight: 320,
        SearchPhrase: '', MatchMode: 'whole phrase', CaseMode: 'insensitively',
        NameIsChecked: true, BehaviorNameIsChecked: false,
        SynopsisIsChecked: false, ScriptIsChecked: false,
        PropertyIsChecked: false, PropertyScope: 'all', PropertyNames: '',
        Scope: 'applet',
        BehaviorIsChecked: false, BehaviorScope: 'all',
        PageIsChecked: false, PageScope: 'all',
        WidgetIsChecked: false, WidgetScope: 'all',
        expandedPaths: [], selectedPaths: [],
    },
    selectedCategory: 'widget', // never undefined!
    selectedBehavior: undefined,
    selectedPages: [],
    selectedWidgets: [],
};
/**** open/closeDesigner ****/
async function openDesigner() {
    DesignerState.isOpen = true;
    await restoreDialogs();
    const { DesignerButton, Toolbox } = DesignerState;
    if (isNaN(Toolbox.x) || isNaN(Toolbox.y)) {
        Toolbox.x = DesignerButton.x;
        Toolbox.y = DesignerButton.y;
    }
    WAT_rerender();
}
function closeDesigner() {
    DesignerState.isOpen = false;
    WAT_rerender();
}
//------------------------------------------------------------------------------
//--                            Selection Support                             --
//------------------------------------------------------------------------------
/**** selectPages ****/
function selectPages(PageList) {
    DesignerState.selectedPages = PageList.slice();
    WAT_rerender();
}
/**** sortedByIndex - sorts visuals by their index, in ascending order ****/
function sortedByIndex(VisualList) {
    const IndexSet = [];
    VisualList.forEach((Visual) => IndexSet[Visual.Index] = Visual);
    const IndexList = Object.keys(IndexSet).map(Number).sort((a, b) => a - b);
    return { IndexList, sortedVisuals: IndexList.map((Index) => IndexSet[Index]) };
}
/**** sortedPageSelection ****/
function sortedPageSelection() {
    return sortedByIndex(DesignerState.selectedPages).sortedVisuals;
}
/**** selectWidgets ****/
function selectWidgets(SelectionA, SelectionB = []) {
    const newSelection = SelectionA.slice();
    SelectionB.forEach((Widget) => {
        if (newSelection.indexOf(Widget) < 0) {
            newSelection.push(Widget);
        }
    });
    DesignerState.selectedWidgets = newSelection;
    WAT_rerender();
}
/**** sortedWidgetSelection ****/
function sortedWidgetSelection() {
    return sortedByIndex(DesignerState.selectedWidgets).sortedVisuals;
}
/**** WidgetIsSelected ****/
function WidgetIsSelected(Widget) {
    return (DesignerState.selectedWidgets.indexOf(Widget) >= 0);
} /**** commonValueOf ****/
function commonValueOf(ValueList) {
    if (ValueList.length === 0) {
        return noSelection;
    }
    const Candidate = ValueList[0];
    if (ValueList.slice(1).every((Value) => ValuesAreEqual(Value, Candidate))) {
        return Candidate;
    }
    else {
        return multipleValues;
    }
}
/**** commonValueItemOf ****/
function commonValueItemOf(ValueList, Entry) {
    const commonValue = commonValueOf(ValueList);
    switch (commonValue) {
        case null:
        case undefined:
        case noSelection:
        case multipleValues: return commonValue;
        default: return (typeof commonValue === 'object' // also works for arrays
            ? commonValue[Entry]
            : commonValue);
    }
}
/**** commonListLiteralOf ****/
function commonListLiteralOf(ValueList) {
    const commonValue = commonValueOf(ValueList);
    switch (commonValue) {
        case null:
        case undefined: return '';
        case noSelection:
        case multipleValues: return commonValue;
        default: return commonValue.join('\n');
    }
}
/**** commonListValueOf - like commonValueOf, but sentinel-safe for lists ****/
function commonListValueOf(ValueList) {
    const commonValue = commonValueOf(ValueList);
    return ((commonValue === noSelection) || (commonValue === multipleValues)
        ? ValueList.filter((Value) => ValueIsList(Value))[0] || []
        : commonValue // n.b.: a bare "ValueIsList" would receive
    ); // filter's index/array as min/maxLength!
}
/**** commonObjectValueOf - like commonValueOf, but sentinel-safe f. objects ****/
function commonObjectValueOf(ValueList) {
    const commonValue = commonValueOf(ValueList);
    return ((commonValue === noSelection) || (commonValue === multipleValues)
        ? ValueList.filter(ValueIsPlainObject)[0] || {}
        : commonValue);
} //------------------------------------------------------------------------------
//--                             Dialog Handling                              --
//------------------------------------------------------------------------------
const DialogList = []; // dialogs are only visible if Designer is open
/**** openDialog ****/
function openDialog(Name, firstX = 20, firstY = 20) {
    if (DialogList.indexOf(Name) < 0) {
        let { x, y } = DesignerState[Name];
        if (isNaN(x) || isNaN(y)) {
            DesignerState[Name].x = firstX;
            DesignerState[Name].y = firstY;
        }
        DialogList.push(Name);
    }
    else {
        bringDialogToFront(Name);
    }
    preserveDialogs();
    WAT_rerender();
}
/**** closeDialog ****/
function closeDialog(Name) {
    let Index = DialogList.indexOf(Name);
    if (Index >= 0) {
        DialogList.splice(Index, 1);
        preserveDialogs();
        WAT_rerender();
    }
}
/**** toggleDialog ****/
function toggleDialog(Name, Event) {
    if (DialogIsOpen(Name)) {
        closeDialog(Name);
    }
    else {
        openDialog(Name, Event === null || Event === void 0 ? void 0 : Event.clientX, Event === null || Event === void 0 ? void 0 : Event.clientY); // *C* better position!
    }
}
/**** toggleScopedDialog - toggles a dialog which is bound to a "scope" ****/
// toggles the given dialog if it is already bound to the given scope -
// otherwise rebinds it and (re)opens the dialog
function toggleScopedDialog(DialogName, ScopeKey, ScopeValue, Event) {
    const DialogState = DesignerState[DialogName];
    if (DialogState[ScopeKey] === ScopeValue) {
        toggleDialog(DialogName, Event);
    }
    else {
        DialogState[ScopeKey] = ScopeValue;
        openDialog(DialogName, Event === null || Event === void 0 ? void 0 : Event.clientX, Event === null || Event === void 0 ? void 0 : Event.clientY); // *C* better position!
    }
}
/**** bringDialogToFront ****/
function bringDialogToFront(Name) {
    let Index = DialogList.indexOf(Name);
    if ((Index < 0) || (Index == DialogList.length - 1)) {
        return;
    }
    DialogList.splice(Index, 1);
    DialogList.push(Name);
    WAT_rerender();
}
/**** DialogIsOpen ****/
function DialogIsOpen(Name) {
    return (DialogList.indexOf(Name) >= 0);
}
//------------------------------------------------------------------------------
//--                                WAD_Dialog                                --
//------------------------------------------------------------------------------
function WAD_Dialog(PropSet) {
    const { Name, resizable, onClose } = PropSet;
    const Descriptor = DesignerState[Name];
    const { Title, x, y, Width, Height, minWidth, maxWidth, minHeight, maxHeight, } = Descriptor;
    const DragInfo = useMemo(() => ({
        Mode: undefined,
        StartX: NaN, StartY: NaN, initialGeometry: undefined
    }), []);
    /**** dialog dragging and resizing ****/
    const handleDrag = useCallback((dx, dy) => {
        if (DragInfo.Mode === 'drag') {
            moveDialog(dx, dy);
        }
        else {
            resizeDialog(dx, dy);
        }
        bringDialogToFront(Name);
        preserveDialogs();
        WAT_rerender();
    });
    const moveDialog = useCallback((dx, dy) => {
        Descriptor.x = DragInfo.initialGeometry.x + dx;
        Descriptor.y = DragInfo.initialGeometry.y + dy;
    });
    const resizeDialog = useCallback((dx, dy) => {
        let newWidth = DragInfo.initialGeometry.Width;
        switch (DragInfo.Mode) {
            case 'resize-sw':
                newWidth = Math.max(minWidth || 0, Math.min(newWidth - dx, maxWidth || Infinity));
                dx = newWidth - DragInfo.initialGeometry.Width;
                Descriptor.x = DragInfo.initialGeometry.x - dx;
                Descriptor.Width = DragInfo.initialGeometry.Width + dx;
                break;
            case 'resize-se':
                Descriptor.Width = Math.max(minWidth || 0, Math.min(DragInfo.initialGeometry.Width + dx, maxWidth || Infinity));
        }
        Descriptor.Height = Math.max(minHeight || 0, Math.min(DragInfo.initialGeometry.Height + dy, maxHeight || Infinity));
    });
    /**** generic GestureRecognizer ****/
    const Recognizer = useCallback(GestureRecognizer({
        onlyFrom: '.Titlebar,.leftResizer,.middleResizer,.rightResizer',
        neverFrom: '.CloseButton',
        onDragStart: (dx, dy, _x, _y, Event) => {
            let ClassList = Event.target.classList;
            switch (true) {
                case ClassList.contains('leftResizer'):
                    DragInfo.Mode = 'resize-sw';
                    break;
                case ClassList.contains('middleResizer'):
                    DragInfo.Mode = 'resize-s';
                    break;
                case ClassList.contains('rightResizer'):
                    DragInfo.Mode = 'resize-se';
                    break;
                default: DragInfo.Mode = 'drag';
            }
            const { x, y, Width, Height } = Descriptor;
            DragInfo.initialGeometry = { x, y, Width, Height };
            handleDrag(dx, dy);
        },
        onDragContinuation: handleDrag,
        onDragFinish: handleDrag,
        onDragCancellation: handleDrag,
    }), []);
    /**** repositioning on viewport ****/
    const { x: AppletX, y: AppletY } = DesignerState.Applet.Geometry;
    let { left, top } = fromDocumentTo('viewport', {
        left: x + AppletX, top: y + AppletY
    });
    left = Math.max(0, Math.min(left, document.documentElement.clientWidth - 30));
    top = Math.max(0, Math.min(top, document.documentElement.clientHeight - 30));
    /**** actual rendering ****/
    return html `<div class="WAD Dialog ${resizable ? 'resizable' : ''}" style="
      left:${left}px; top:${top}px; width:${Width}px; height:${Height}px;
    " onPointerDown=${() => 0 /* bringDialogToFront(Name) */}>
      <div class="Titlebar"
        onPointerDown=${Recognizer} onPointerUp=${Recognizer}
        onPointerMove=${Recognizer} onPointerCancel=${Recognizer}
      >
        <div class="Title">${Title}</div>

        ${(onClose != null) && html `
          <img class="CloseButton" src="${IconFolder}/xmark.png" onClick=${onClose}/>
        `}
      </div>

      <div class="ContentPane">${PropSet.children}</div>

      ${(resizable == true) && html `
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
    </>`;
}
//------------------------------------------------------------------------------
//--                      useAppliedPendingSelection                          --
//------------------------------------------------------------------------------
// applies a "PendingSelection" set on the given dialog state (by search
// navigation) to the text field found within the returned ref, then clears it
function useAppliedPendingSelection(DialogState) {
    const FieldContainer = useRef(null);
    useEffect(() => {
        var _a;
        const Selection = DialogState.PendingSelection;
        if (Selection == null) {
            return;
        }
        const TextField = (_a = FieldContainer.current) === null || _a === void 0 ? void 0 : _a.querySelector('textarea,input');
        if (TextField != null) {
            TextField.focus();
            TextField.setSelectionRange(Selection.startIndex, Selection.endIndex);
        }
        DialogState.PendingSelection = undefined;
    });
    return FieldContainer;
}
/**** preserveDialogs ****/
let restoringDialogs = false;
function preserveDialogs() {
    if (restoringDialogs) {
        return;
    }
    const DialogNames = [
        'Toolbox', 'Inspector',
        'SettingsDialog', 'BehaviorEditor', 'SynopsisEditor', 'ValueEditor',
        'ScriptEditor', 'CodeAssistant', 'SearchDialog',
    ];
    const DialogGeometries = {};
    DialogNames.forEach((DialogName) => {
        if (DialogIsOpen(DialogName)) {
            const { x, y, Width, Height } = DesignerState[DialogName];
            DialogGeometries[DialogName] = { x, y, Width, Height };
        }
    });
    DesignerStore.setItem('DialogGeometries', DialogGeometries);
}
/**** restoreDialogs ****/
async function restoreDialogs() {
    restoringDialogs = true;
    try {
        let DialogGeometries = await DesignerStore.getItem('DialogGeometries');
        if (DialogGeometries != null) {
            for (let DialogName in DialogGeometries) {
                const { x, y, Width, Height } = DialogGeometries[DialogName];
                const { minWidth, minHeight } = DesignerState[DialogName];
                Object.assign(DesignerState[DialogName], {
                    x, y, // stored geometries must never undershoot
                    Width: Math.max(Width !== null && Width !== void 0 ? Width : 0, minWidth !== null && minWidth !== void 0 ? minWidth : 0), // the (possibly...
                    Height: Math.max(Height !== null && Height !== void 0 ? Height : 0, minHeight !== null && minHeight !== void 0 ? minHeight : 0), // ...raised) minima
                });
                openDialog(DialogName);
            }
            bringDialogToFront('Toolbox');
        }
    }
    catch (Signal) { /* nop */ }
    restoringDialogs = false;
}
//------------------------------------------------------------------------------
//--                              Error Handling                              --
//------------------------------------------------------------------------------
/**** showErrorReport ****/
async function showErrorReport(Visual, ErrorReport) {
    if (window.confirm(ErrorReport.Type + '\n\n' + ErrorReport.Message + '\n\n' +
        'Do you want to proceed to the Designer?')) {
        await openDesigner(); // if not yet already done
        const { Sufferer } = ErrorReport;
        switch (true) {
            case ValueIsApplet(Sufferer):
                DesignerState.ScriptEditor.Scope = 'Applet';
                break;
            case ValueIsPage(Sufferer):
                visitPage(Sufferer);
                DesignerState.ScriptEditor.Scope = 'visitedPage';
                break;
            case ValueIsWidget(Sufferer):
                visitPage(Sufferer.Page);
                selectWidgets([Sufferer]);
                DesignerState.ScriptEditor.Scope = 'selectedWidgets';
                break;
        }
        openDialog('ScriptEditor'); // ...or bring it to front
    }
}
/**** WAD_ErrorView ****/
function WAD_ErrorView(PropSet) {
    const { ErrorReport } = PropSet;
    switch (ErrorReport) {
        case null:
        case undefined:
            return html `<div class="WAD ErrorView" style=${PropSet.style}><i>(no error)</i></>`;
        case noSelection:
            return html `<div class="WAD ErrorView" style=${PropSet.style}><i>(no selection)</i></>`;
        case multipleValues:
            return html `<div class="WAD ErrorView withError" style=${PropSet.style}><i>(multiple errors)</i></>`;
        default:
            return html `<div class="WAD ErrorView withError" style=${PropSet.style}
          >${ErrorReport.Type}: ${ErrorReport.Message}</>`;
    }
}
//------------------------------------------------------------------------------
//--                   WAD_horizontally/vertically/centered                   --
//------------------------------------------------------------------------------
function WAD_horizontally(PropSet) {
    const { children } = PropSet, otherProps = __rest(PropSet, ["children"]);
    return html `<div class="WAD horizontally" ...${otherProps}>${children}</>`;
}
function WAD_vertically(PropSet) {
    const { children } = PropSet, otherProps = __rest(PropSet, ["children"]);
    return html `<div class="WAD vertically" ...${otherProps}>${children}</>`;
}
function WAD_centered(PropSet) {
    const { children } = PropSet, otherProps = __rest(PropSet, ["children"]);
    return html `<div class="WAD centered" ...${otherProps}>${children}</>`;
}
//------------------------------------------------------------------------------
//--                                 WAD_Gap                                  --
//------------------------------------------------------------------------------
function WAD_Gap(PropSet) {
    return html `<div class="WAD Gap" ...${PropSet}/>`;
}
//------------------------------------------------------------------------------
//--                                 WAD_Icon                                 --
//------------------------------------------------------------------------------
// (thin wrapper around JCL_ui.Icon)
function WAD_Icon(PropSet) {
    const { Icon, Color, enabled, active, onClick } = PropSet, otherProps = __rest(PropSet, ["Icon", "Color", "enabled", "active", "onClick"]);
    return html `<${JCL_ui.Icon} Class="WAD Icon"
      Value=${Icon} Color=${Color || 'black'}
      disabled=${enabled === false} active=${active === true}
      onClick=${onClick} ...${otherProps}
    />`; // "enabled === false" deliberately kept as-is
}
//------------------------------------------------------------------------------
//--                                WAD_Label                                 --
//------------------------------------------------------------------------------
function WAD_Label(PropSet) {
    return html `<div class="WAD Label" style="${PropSet.style}">${PropSet.children}</>`;
}
//------------------------------------------------------------------------------
//--                                WAD_Button                                --
//------------------------------------------------------------------------------
// (thin wrapper around JCL_native.Button)
function WAD_Button(PropSet) {
    const { enabled, children } = PropSet, otherProps = __rest(PropSet, ["enabled", "children"]);
    return html `<${JCL_native.Button} Class="WAD Button"
      disabled=${enabled === false} ...${otherProps}
    >
      ${children}
    </>`;
}
//------------------------------------------------------------------------------
//--                               WAD_Checkbox                               --
//------------------------------------------------------------------------------
// (thin wrapper around JCL_native.Checkbox - "noSelection"/"multipleValues" are
// aliases for JCL's special values and thus understood natively: they render an
// indeterminate checkbox, "noSelection" additionally disables it, and missing
// values - i.e. null/undefined - become indeterminate but remain enabled, just
// like before)
function WAD_Checkbox(PropSet) {
    const { enabled, readonly, Value, style } = PropSet, otherProps = __rest(PropSet, ["enabled", "readonly", "Value", "style"]);
    return html `<${JCL_native.Checkbox} Class="WAD Checkbox" style=${style}
      Value=${Value}
      disabled=${(enabled === false) || (readonly === true)}
      ...${otherProps}
    />`;
}
//------------------------------------------------------------------------------
//--                              WAD_Radiobutton                             --
//------------------------------------------------------------------------------
// (thin wrapper around JCL_native.Radiobutton)
function WAD_Radiobutton(PropSet) {
    const { enabled, readonly, Value, style } = PropSet, otherProps = __rest(PropSet, ["enabled", "readonly", "Value", "style"]);
    return html `<${JCL_native.Radiobutton} Class="WAD Radiobutton" style=${style}
      Value=${Value}
      disabled=${(enabled === false) || (readonly === true)}
      ...${otherProps}
    />`;
}
//------------------------------------------------------------------------------
//--                              WAD_TextlineTab                             --
//------------------------------------------------------------------------------
function WAD_TextlineTab(PropSet) {
    const { Label, active, onClick, style } = PropSet, otherProps = __rest(PropSet, ["Label", "active", "onClick", "style"]);
    return html `<div class="WAD TextlineTab ${active === true ? 'active' : ''}"
      style=${style} onClick=${onClick} ...${otherProps}
    >${Label}</>`;
}
//------------------------------------------------------------------------------
//--                            WAD_TextlineInput                             --
//------------------------------------------------------------------------------
const WAD_TextlineInputTypes = {
    text: JCL_native.TextlineInput,
    password: JCL_native.PasswordInput,
    email: JCL_native.EMailAddressInput,
    url: JCL_native.URLInput,
    tel: JCL_native.PhoneNumberInput,
    search: JCL_native.SearchInput,
};
function WAD_TextlineInput(PropSet) {
    let { Type, // for similar input elements
    enabled, readonly, Value, Placeholder, minLength, maxLength, multiple, Pattern, SpellChecking, Suggestions, onInput, onBlur, style } = PropSet, otherProps = __rest(PropSet, ["Type", "enabled", "readonly", "Value", "Placeholder", "minLength", "maxLength", "multiple", "Pattern", "SpellChecking", "Suggestions", "onInput", "onBlur", "style"]);
    const KnownInput = WAD_TextlineInputTypes[Type || 'text'];
    const ExtraProps = ( // unknown "Type"s reach a plain <input> as before
    KnownInput == null ? Object.assign({ type: Type }, otherProps) : otherProps); // n.b.: extra props must be SPREAD into the JCL component - JCL's
    // PropSet proxy computes "RestProps" from unconsumed props itself
    const JCL_Input = KnownInput !== null && KnownInput !== void 0 ? KnownInput : JCL_native.TextlineInput;
    return html `<div class="WAD TextLineInput" style=${style}>
      <${JCL_Input}
        disabled=${enabled === false} readonly=${readonly}
        Value=${Value !== null && Value !== void 0 ? Value : ''} Placeholder=${Placeholder !== null && Placeholder !== void 0 ? Placeholder : ''}
        minLength=${minLength} maxLength=${maxLength} multiple=${multiple}
        Pattern=${Pattern} SpellCheck=${SpellChecking == true}
        Suggestions=${Suggestions}
        onInput=${onInput} onBlur=${onBlur} ...${ExtraProps}
      />
    </>`;
}
//------------------------------------------------------------------------------
//--                             WAD_NumberInput                              --
//------------------------------------------------------------------------------
function WAD_NumberInput(PropSet) {
    let { enabled, readonly, Value, Placeholder, Suggestions, Minimum, Maximum, StepValue, onInput, onBlur, style } = PropSet, otherProps = __rest(PropSet, ["enabled", "readonly", "Value", "Placeholder", "Suggestions", "Minimum", "Maximum", "StepValue", "onInput", "onBlur", "style"]);
    return html `<div class="WAD NumberInput" style=${style}>
      <${JCL_native.NumberInput}
        disabled=${enabled === false} readonly=${readonly}
        Value=${Value} Placeholder=${Placeholder !== null && Placeholder !== void 0 ? Placeholder : ''}
        Suggestions=${Suggestions}
        Minimum=${Minimum} Maximum=${Maximum} Step=${StepValue}
        onInput=${onInput} onBlur=${onBlur} ...${otherProps}
      />
    </>`;
}
//------------------------------------------------------------------------------
//--                             WAD_IntegerInput                             --
//------------------------------------------------------------------------------
function WAD_IntegerInput(PropSet) {
    PropSet = Object.assign({}, PropSet);
    if (ValueIsNumber(PropSet.Value)) {
        PropSet.Value = Math.round(PropSet.Value);
    }
    if (PropSet.Minimum != null) {
        PropSet.Minimum = Math.round(PropSet.Minimum);
    }
    if (PropSet.Maximum != null) {
        PropSet.Maximum = Math.round(PropSet.Maximum);
    }
    if (PropSet.Suggestions != null) {
        PropSet.Suggestions = PropSet.Suggestions.map((Value) => Math.round(Value));
    }
    PropSet.StepValue = 1;
    return WAD_NumberInput(PropSet);
}
//------------------------------------------------------------------------------
//--                                WAD_Slider                                --
//------------------------------------------------------------------------------
function WAD_Slider(PropSet) {
    let { enabled, readonly, Value, Minimum, Maximum, StepValue, Hashmarks, onInput, onBlur, style } = PropSet, otherProps = __rest(PropSet, ["enabled", "readonly", "Value", "Minimum", "Maximum", "StepValue", "Hashmarks", "onInput", "onBlur", "style"]);
    if (Hashmarks != null) { // JCL sliders expect hashmark textlines
        Hashmarks = Hashmarks.map((Item) => '' + Item);
    }
    return html `<div class="WAD Slider" style=${style}>
      <${JCL_native.Slider}
        disabled=${(enabled === false) || (readonly === true)} Value=${Value}
        Minimum=${Minimum} Maximum=${Maximum} Step=${StepValue}
        Hashmarks=${Hashmarks}
        onInput=${onInput} onBlur=${onBlur}
        ...${otherProps}
      />
    </>`;
}
//------------------------------------------------------------------------------
//--                              WAD_TimeInput                               --
//------------------------------------------------------------------------------
const WAD_TimeInputTypes = {
    'time': JCL_native.TimeInput,
    'datetime-local': JCL_native.DateTimeInput,
    'date': JCL_native.DateInput,
    'week': JCL_native.WeekInput,
    'month': JCL_native.MonthInput,
};
function WAD_TimeInput(PropSet) {
    let { Type, // for similar input elements
    enabled, readonly, Value, Placeholder, Minimum, Maximum, Suggestions, onInput, onBlur, style } = PropSet, otherProps = __rest(PropSet, ["Type", "enabled", "readonly", "Value", "Placeholder", "Minimum", "Maximum", "Suggestions", "onInput", "onBlur", "style"]);
    const KnownInput = WAD_TimeInputTypes[Type || 'time'];
    const ExtraProps = ( // unknown "Type"s reach a plain <input> as before
    KnownInput == null
        ? Object.assign({ type: Type, placeholder: Placeholder }, otherProps) : Object.assign({ placeholder: Placeholder }, otherProps)); // JCL temporal inputs have no "Placeholder" prop of their own
    const JCL_Input = KnownInput !== null && KnownInput !== void 0 ? KnownInput : JCL_native.TimeInput;
    return html `<div class="WAD TimeInput" style=${style}>
      <${JCL_Input}
        disabled=${enabled === false} readonly=${readonly}
        Value=${Value} Minimum=${Minimum} Maximum=${Maximum}
        Suggestions=${Suggestions}
        onInput=${onInput} onBlur=${onBlur} ...${ExtraProps}
      />
    </>`;
}
//------------------------------------------------------------------------------
//--                               WAD_DropDown                               --
//------------------------------------------------------------------------------
function WAD_DropDown(PropSet) {
    let { enabled, Value, Placeholder, Options, onInput, style } = PropSet, otherProps = __rest(PropSet, ["enabled", "Value", "Placeholder", "Options", "onInput", "style"]);
    const OptionList = [
        ':-' + (Placeholder !== null && Placeholder !== void 0 ? Placeholder : '(please select)'),
        ...(Options || [])
    ];
    return html `<div class="WAD DropDown" style=${style}>
      <${JCL_native.DropDown}
        disabled=${enabled === false} Value=${Value !== null && Value !== void 0 ? Value : ''} Options=${OptionList}
        onInput=${onInput} ...${otherProps}
      />
    </>`;
}
//------------------------------------------------------------------------------
//--                            WAD_PseudoDropDown                            --
//------------------------------------------------------------------------------
function WAD_PseudoDropDown(PropSet) {
    let { Icon, Color, enabled, Value, Placeholder, OptionList, onInput } = PropSet, otherProps = __rest(PropSet, ["Icon", "Color", "enabled", "Value", "Placeholder", "OptionList", "onInput"]);
    const Options = [
        ...(Placeholder == null ? [] : [':-' + Placeholder]),
        ...(OptionList || [])
    ];
    return html `<div class="WAD PseudoDropDown ${enabled === false ? 'disabled' : ''}">
      <${JCL_legacy.PseudoDropDown}
        Icon=${Icon} Color=${Color} disabled=${enabled === false}
        Value=${Value !== null && Value !== void 0 ? Value : ''} Options=${Options}
        onInput=${onInput} ...${otherProps}
      />
    </>`;
}
//------------------------------------------------------------------------------
//--                       WAD_Behavior[Pseudo]DropDown                       --
//------------------------------------------------------------------------------
function WAD_BehaviorDropDown(PropSet) {
    let { enabled, Value, groupedOptionList, style } = PropSet, otherProps = __rest(PropSet, ["enabled", "Value", "groupedOptionList", "style"]);
    let ValueToShow = '';
    switch (Value) {
        case null:
        case undefined:
            ValueToShow = '';
            break;
        case multipleValues:
            ValueToShow = '';
            break;
        case noSelection:
            ValueToShow = '';
            enabled = false;
            break;
        default: ValueToShow = '' + Value;
    }
    return html `<div class="WAD DropDown" style=${style}>
      <select disabled=${enabled === false} ...${otherProps}>
        <option value="">(no behavior)</option>
        <option value="-" disabled>----</option>
        ${Object.entries(groupedOptionList || {}).map(([Prefix, SuffixList]) => {
        return html `<optgroup label="${Prefix}">
            ${SuffixList.map((Suffix) => html `<option
              value=${Prefix + '.' + Suffix} selected=${ValueToShow === Prefix + '.' + Suffix}
            >${Suffix}</option>`)}
          </optgroup>`;
    })}
      </select>
    </>`;
}
function WAD_BehaviorPseudoDropDown(PropSet) {
    let { Icon, Color, enabled, Value, Placeholder, groupedOptionList } = PropSet, otherProps = __rest(PropSet, ["Icon", "Color", "enabled", "Value", "Placeholder", "groupedOptionList"]);
    return html `<div class="WAD PseudoDropDown ${enabled === false ? 'disabled' : ''}">
      <div style="
        -webkit-mask-image:url(${Icon}); mask-image:url(${Icon});
        background-color:${Color || 'black'};
      "></>
      <select disabled=${enabled === false} ...${otherProps}>
        <option value="-" disabled selected>${Placeholder || '(please select)'}</option>
        <option value="-" disabled>----</option>
        <option value="">(no behavior)</option>
        <option value="-" disabled>----</option>
        ${Object.entries(groupedOptionList || {}).map(([Prefix, SuffixList]) => {
        return html `<optgroup label="${Prefix}">
            ${SuffixList.map((Suffix) => html `<option
              value=${Prefix + '.' + Suffix}
            >${Suffix}</option>`)}
          </optgroup>`;
    })}
      </select>
    </>`;
}
//------------------------------------------------------------------------------
//--                           WAD_PseudoFileInput                            --
//------------------------------------------------------------------------------
function WAD_PseudoFileInput(PropSet) {
    let { Icon, Color, enabled, onInput, onChange } = PropSet, otherProps = __rest(PropSet
    /**** JCL resets the file input right after its "onInput" callback ran   ****/
    /**** which breaks native "onChange" listeners (they would only see an   ****/
    /**** empty file list) - "onChange" is therefore invoked early, on input ****/
    , ["Icon", "Color", "enabled", "onInput", "onChange"]);
    /**** JCL resets the file input right after its "onInput" callback ran   ****/
    /**** which breaks native "onChange" listeners (they would only see an   ****/
    /**** empty file list) - "onChange" is therefore invoked early, on input ****/
    const _onInput = (Event) => {
        if (typeof onInput === 'function') {
            onInput(Event);
        }
        if (typeof onChange === 'function') {
            onChange(Event);
        }
    };
    return html `<label class="WAD PseudoFileInput ${enabled === false ? 'disabled' : ''}">
      <${JCL_legacy.PseudoFileInput}
        Icon=${Icon} Color=${Color} disabled=${enabled === false}
        onInput=${_onInput} ...${otherProps}
      />
    </>`;
}
//------------------------------------------------------------------------------
//--                              WAD_ColorInput                              --
//------------------------------------------------------------------------------
function WAD_ColorInput(PropSet) {
    let { enabled, readonly, Value, Suggestions, onInput, onBlur, style } = PropSet, otherProps = __rest(PropSet
    // JCL colour inputs have no "onBlur" prop - as an unknown
    // prop, the given callback ends up directly on the <input>
    , ["enabled", "readonly", "Value", "Suggestions", "onInput", "onBlur", "style"]);
    // JCL colour inputs have no "onBlur" prop - as an unknown
    // prop, the given callback ends up directly on the <input>
    return html `<div class="WAD ColorInput" style=${style}>
      <${JCL_native.ColorInput}
        disabled=${(enabled === false) || (readonly === true)}
        Value=${Value} Suggestions=${Suggestions} onInput=${onInput}
        ...${Object.assign(Object.assign({}, otherProps), { onBlur })}
      />
    </>`;
}
//------------------------------------------------------------------------------
//--                              WAD_TextInput                               --
//------------------------------------------------------------------------------
function WAD_TextInput(PropSet) {
    let { enabled, readonly, Value, Placeholder, minLength, maxLength, Resizability, LineWrapping, onInput, onBlur, style } = PropSet, otherProps = __rest(PropSet, ["enabled", "readonly", "Value", "Placeholder", "minLength", "maxLength", "Resizability", "LineWrapping", "onInput", "onBlur", "style"]);
    return html `<div class="WAD TextInput" style=${style}>
      <${JCL_native.TextInput}
        disabled=${enabled === false} readonly=${readonly}
        Value=${Value !== null && Value !== void 0 ? Value : ''} Placeholder=${Placeholder !== null && Placeholder !== void 0 ? Placeholder : ''}
        minLength=${minLength} maxLength=${maxLength}
        LineWrapping=${LineWrapping} Resizability=${Resizability}
        onInput=${onInput} onBlur=${onBlur} ...${otherProps}
      />
    </>`;
}
//------------------------------------------------------------------------------
//--                             WAD_FlatListView                             --
//------------------------------------------------------------------------------
function WAD_FlatListView(PropSet) {
    let { List, ItemRenderer, Placeholder, selectedIndices, SelectionLimit, onClick, onDblClick, onSelectionChange, onItemSelected, onItemDeselected } = PropSet, otherProps = __rest(PropSet, ["List", "ItemRenderer", "Placeholder", "selectedIndices", "SelectionLimit", "onClick", "onDblClick", "onSelectionChange", "onItemSelected", "onItemDeselected"]);
    expectList('item list', List);
    allowFunction('list item renderer', ItemRenderer);
    allowTextline('list placeholder', Placeholder);
    allowListSatisfying('list of selected indices', selectedIndices, ValueIsOrdinal);
    allowOrdinal('selection limit', SelectionLimit);
    allowFunction('click callback', onClick);
    allowFunction('double-click callback', onDblClick);
    allowFunction('selection change callback', onSelectionChange);
    allowFunction('item selection callback', onItemSelected);
    allowFunction('item deselection callback', onItemDeselected);
    if (ItemRenderer == null) {
        ItemRenderer = (Item) => HTMLsafe(Item + '');
    }
    if (Placeholder == null) {
        Placeholder = '(empty)';
    }
    if (selectedIndices == null) {
        selectedIndices = [];
    }
    if (SelectionLimit == null) {
        SelectionLimit = 1;
    }
    const selectedIndexSet = Object.create(null);
    selectedIndices = selectedIndices.filter((selectedIndex) => {
        if (ValueIsOrdinal(selectedIndex) &&
            (selectedIndex >= 0) && (selectedIndex < List.length) &&
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
        const truncatedIndices = selectedIndices.slice(0, SelectionLimit);
        deselectedIndices.forEach((Index) => { delete selectedIndexSet[Index]; });
        selectedIndices.length = SelectionLimit;
        setTimeout(() => {
            if (onSelectionChange != null) {
                onSelectionChange(truncatedIndices);
            }
            if (onItemDeselected != null) {
                deselectedIndices.forEach((deselectedIndex) => {
                    onItemDeselected(List[deselectedIndex], deselectedIndex);
                });
            }
        }, 0);
    }
    function _onClick(Event, Index) {
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
        if (SelectionChanged && (onSelectionChange != null)) {
            onSelectionChange(selectedIndices);
        }
        // @ts-ignore TS2454 let's check IF variables were assigned
        if ((IndicesToDeselect != null) && (onItemDeselected != null)) {
            IndicesToDeselect.forEach((deselectedIndex) => {
                onItemDeselected(List[deselectedIndex], deselectedIndex);
            });
        }
        // @ts-ignore TS2454 let's check IF variables were assigned
        if ((IndicesToSelect != null) && (onItemSelected != null)) {
            IndicesToSelect.forEach((selectedIndex) => {
                onItemSelected(List[selectedIndex], selectedIndex);
            });
        }
        if (onClick != null) {
            onClick(Event, Index);
        }
    }
    function _onDblClick(Event, Index) {
        if (onDblClick != null) {
            onDblClick(Event, Index);
        }
    }
    function ItemIsSelected(Index) {
        return (Index in selectedIndexSet);
    }
    return html `<div class="WAD FlatListView ${List.length === 0 ? 'empty' : ''}"
      ...${otherProps}
    >
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
}
//------------------------------------------------------------------------------
//--                            WAD_NestedListView                            --
//------------------------------------------------------------------------------
function WAD_NestedListView(PropSet) {
    let { List, ItemRenderer, Placeholder, LabelOfItem, ContentListOfItem, selectedPaths, SelectionLimit, SelectionMode, onClick, onDblClick, onSelectionChange, onItemSelected, onItemDeselected, expandedPaths, Indentation, onExpansionChange, onItemExpanded, onItemCollapsed } = PropSet, otherProps = __rest(PropSet, ["List", "ItemRenderer", "Placeholder", "LabelOfItem", "ContentListOfItem", "selectedPaths", "SelectionLimit", "SelectionMode", "onClick", "onDblClick", "onSelectionChange", "onItemSelected", "onItemDeselected", "expandedPaths", "Indentation", "onExpansionChange", "onItemExpanded", "onItemCollapsed"]);
    function ValueIsOrdinalList(Value) {
        return ValueIsListSatisfying(Value, ValueIsOrdinal);
    }
    expectList('item list', List);
    allowFunction('list item renderer', ItemRenderer);
    allowTextline('list placeholder', Placeholder);
    allowFunction('list item label generator', LabelOfItem);
    allowFunction('list item content generator', ContentListOfItem);
    allowListSatisfying('list of selected paths', selectedPaths, ValueIsOrdinalList);
    allowOrdinal('selection limit', SelectionLimit);
    allowOneOf('selection mode', SelectionMode, ['same-container', 'any-container']);
    allowFunction('click callback', onClick);
    allowFunction('double-click callback', onDblClick);
    allowFunction('selection change callback', onSelectionChange);
    allowFunction('item selection callback', onItemSelected);
    allowFunction('item deselection callback', onItemDeselected);
    allowListSatisfying('list of expanded paths', expandedPaths, ValueIsOrdinalList);
    allowOrdinal('indentation', Indentation);
    allowFunction('expansion change callback', onExpansionChange);
    allowFunction('item expansion callback', onItemExpanded);
    allowFunction('item collapse callback', onItemCollapsed);
    function DefaultRenderer(Item, Path) {
        return html `<div class="ItemLabel" dangerouslySetInnerHTML=${{
            __html: LabelOfItem(Item)
        }}/>`;
    }
    if (ItemRenderer == null) {
        ItemRenderer = DefaultRenderer;
    }
    if (Placeholder == null) {
        Placeholder = '(empty)';
    }
    if (selectedPaths == null) {
        selectedPaths = [];
    }
    if (SelectionLimit == null) {
        SelectionLimit = 1;
    }
    if (SelectionMode == null) {
        SelectionMode = 'same-container';
    }
    if (expandedPaths == null) {
        expandedPaths = [];
    }
    if (Indentation == null) {
        Indentation = 10;
    }
    function ItemAtPath(Path) {
        let Item = List[Path[0]];
        for (let i = 1, l = Path.length; i < l; i++) {
            if (Item == null) {
                return undefined;
            }
            const ContentList = ContentListOfItem(Item);
            if (!ValueIsArray(ContentList)) {
                return undefined;
            }
            Item = ContentList[Path[i]];
        }
        return Item;
    }
    function ItemAtPathExists(Path) {
        return (ItemAtPath(Path) != null);
    }
    function PathsAreEqual(PathA, PathB) {
        return ((PathA.length === PathB.length) &&
            PathA.every((Item, Index) => Item === PathB[Index]));
    }
    function IndexOfPathIn(Path, PathList) {
        for (let i = 0, l = PathList.length; i < l; i++) {
            if (PathsAreEqual(Path, PathList[i])) {
                return i;
            }
        }
        return -1;
    }
    function ItemInContainer(ItemPath, ContainerPath) {
        return ((ItemPath.length === ContainerPath.length + 1) &&
            PathsAreEqual(ItemPath.slice(0, ContainerPath.length), ContainerPath));
    }
    function ItemNotInContainer(ItemPath, ContainerPath) {
        return !ItemInContainer(ItemPath, ContainerPath);
    }
    function ItemIsSelected(Path) { return (IndexOfPathIn(Path, selectedPaths) >= 0); }
    function ItemIsExpanded(Path) { return (IndexOfPathIn(Path, expandedPaths) >= 0); }
    selectedPaths = selectedPaths.filter((Path) => ItemAtPathExists(Path));
    selectedPaths = selectedPaths.filter((Path, Index) => (IndexOfPathIn(Path, selectedPaths) === Index));
    if ((selectedPaths.length > 1) && (SelectionMode === 'same-container')) {
        const ContainerPath = selectedPaths[0].slice(0, selectedPaths[0].length - 1);
        selectedPaths = selectedPaths.filter((Path) => (ItemInContainer(Path, ContainerPath)));
    }
    expandedPaths = expandedPaths.filter((Path) => ItemAtPathExists(Path));
    expandedPaths = expandedPaths.filter((Path, Index) => (IndexOfPathIn(Path, expandedPaths) === Index));
    function processSelectionClick(Event, Item, ItemPath) {
        Event.stopImmediatePropagation();
        Event.preventDefault();
        if (SelectionLimit === 0) {
            return;
        }
        let SelectionChanged = false;
        let PathsToSelect, PathsToDeselect;
        if (Event.shiftKey || Event.metaKey) {
            SelectionChanged = true;
            if (ItemIsSelected(ItemPath)) {
                PathsToDeselect = [ItemPath];
                selectedPaths = selectedPaths.filter((Path) => !PathsAreEqual(ItemPath, Path));
            }
            else {
                if (SelectionMode === 'same-container') {
                    const ContainerPath = ItemPath.slice(0, ItemPath.length - 1);
                    PathsToDeselect = selectedPaths.filter((Path) => (!ItemInContainer(Path, ContainerPath)));
                    selectedPaths = selectedPaths.filter((Path) => (ItemInContainer(Path, ContainerPath)));
                }
                else {
                    PathsToDeselect = [];
                }
                if (selectedPaths.length === SelectionLimit) {
                    PathsToDeselect.push(selectedPaths.shift());
                }
                PathsToSelect = [ItemPath];
                selectedPaths.push(ItemPath);
            }
        }
        else {
            PathsToDeselect = selectedPaths.filter((Path) => !PathsAreEqual(ItemPath, Path));
            SelectionChanged = !ItemIsSelected(ItemPath);
            PathsToSelect = (SelectionChanged ? [ItemPath] : []);
            selectedPaths = [ItemPath];
        }
        if (SelectionChanged && (onSelectionChange != null)) {
            onSelectionChange(selectedPaths);
        }
        // @ts-ignore TS2454 let's check IF variables were assigned
        if ((PathsToDeselect != null) && (onItemDeselected != null)) {
            PathsToDeselect.forEach((Path) => {
                onItemDeselected(ItemAtPath(Path), Path);
            });
        }
        // @ts-ignore TS2454 let's check IF variables were assigned
        if ((PathsToSelect != null) && (onItemSelected != null)) {
            PathsToSelect.forEach((Path) => {
                onItemSelected(ItemAtPath(Path), Path);
            });
        }
    }
    function processDoubleClick(Event, Item, ItemPath) {
        if (onDblClick != null) {
            Event.stopImmediatePropagation();
            Event.preventDefault();
            onDblClick(Item, ItemPath, Event);
        }
    }
    function processExpansionClick(Event, Item, Path) {
        Event.stopImmediatePropagation();
        Event.preventDefault();
        let ExpansionIndex = IndexOfPathIn(Path, expandedPaths);
        if (ExpansionIndex < 0) {
            expandedPaths.push(Path);
        }
        else {
            expandedPaths.splice(ExpansionIndex, 1);
        }
        if (onExpansionChange != null) {
            onExpansionChange(expandedPaths);
        }
        if (ExpansionIndex < 0) {
            if (onItemExpanded != null) {
                onItemExpanded(Item, Path);
            }
        }
        else {
            if (onItemCollapsed != null) {
                onItemCollapsed(Item, Path);
            }
        }
    }
    function renderedItem(Item, Path) {
        const Offset = (Path.length > 1 ? Indentation : 0);
        const isSelected = ItemIsSelected(Path);
        const isExpanded = ItemIsExpanded(Path);
        let ContentList = ContentListOfItem(Item);
        if (!ValueIsArray(ContentList)) {
            ContentList = [];
        }
        const hasContent = (ContentList.length > 0);
        function onSelectionClick(Event) {
            processSelectionClick(Event, Item, Path);
        }
        function onDoubleClick(Event) {
            processDoubleClick(Event, Item, Path);
        }
        function onExpansionClick(Event) {
            processExpansionClick(Event, Item, Path);
        }
        return html `<div class="ItemView" style="padding-left:${Offset}px">
          <div class="ItemLine ${isSelected ? 'selected' : ''}"
            onClick=${onSelectionClick} onDblClick=${onDoubleClick}
          >
            ${hasContent
            ? (isExpanded
                ? html `<img class="ItemExpander" src="${IconFolder}/caret-down.png"  onClick=${onExpansionClick}/>`
                : html `<img class="ItemExpander" src="${IconFolder}/caret-right.png" onClick=${onExpansionClick}/>`)
            : html `<img class="ItemIcon" src="${IconFolder}/circle.png"/>`} ${ItemRenderer(Item, Path)}
          </div>
          ${hasContent && isExpanded
            ? ContentList.map((Item, Index) => renderedItem(Item, Path.concat(Index)))
            : ''}
        </div>`;
    }
    return html `<div class="WAD NestedListView ${List.length === 0 ? 'empty' : ''}"
      ...${otherProps}
    >
      ${List.length === 0
        ? html `<div class="Placeholder"><div>${Placeholder}</></>`
        : List.map((Item, Index) => renderedItem(Item, [Index]))}
    </>`;
}
//------------------------------------------------------------------------------
//--                                 WAD_Fold                                 --
//------------------------------------------------------------------------------
function WAD_Fold(PropSet) {
    let { Label, Expansion, toggleExpansion } = PropSet;
    return html `<div class="WAD Fold">
      <div class="WAD Fold-Header" onClick=${toggleExpansion}>
        <img class="WAD Fold-Expander" src=${Expansion
        ? `${IconFolder}/caret-down.png`
        : `${IconFolder}/caret-right.png`}/>
        <div class="WAD Fold-Title">${Label}</>
      </div>

      ${Expansion
        ? html `<div class="WAD Fold-Content">${PropSet.children}</>`
        : ''}
    </>`;
}
//------------------------------------------------------------------------------
//--                     WAD_horizontal/verticalSeparator                     --
//------------------------------------------------------------------------------
function WAD_horizontalSeparator(PropSet) {
    return html `<div class="WAD horizontalSeparator" ...${PropSet}/>`;
}
function WAD_verticalSeparator(PropSet) {
    return html `<div class="WAD verticalSeparator" ...${PropSet}/>`;
}
//------------------------------------------------------------------------------
//--                         WAD_PropertyConfigurator                         --
//------------------------------------------------------------------------------
/**** TextlinePropsForEditorType ****/
// lists exactly those props which the former per-case templates passed -
// absent entries must remain absent for pixel- and event-exact behaviour
const TextlinePropsForEditorType = {
    'textline-input': ({ SpellChecking, Suggestions }) => ({ SpellChecking, Suggestions }),
    'password-input': (_) => ({ Type: 'password' }),
    'email-address-input': ({ multiple, Suggestions }) => ({ Type: 'email', multiple, Suggestions }),
    'phone-number-input': ({ Suggestions }) => ({ Type: 'tel', Suggestions }),
    'url-input': ({ Suggestions }) => ({ Type: 'url', Suggestions }),
    'search-input': ({ SpellChecking, Suggestions }) => ({ Type: 'search', SpellChecking, Suggestions }),
};
/**** TimeTypeForEditorType ****/
const TimeTypeForEditorType = {
    'time-input': 'time', 'date-time-input': 'datetime-local',
    'date-input': 'date', 'month-input': 'month', 'week-input': 'week',
};
/**** TextEditorSpecs - value encoding and input handling per editor type ****/
const TextEditorSpecs = {
    'text-input': {
        encodedValue: (Value) => Value,
        InputHandlerFor: (onInput) => (Event) => onInput(Event.target.value)
    },
    'json-input': {
        encodedValue: (Value) => ((Value === noSelection) || (Value === multipleValues) ? '' : JSON.stringify(Value)),
        InputHandlerFor: (onInput) => (Event) => {
            try {
                onInput(JSON.parse(Event.target.value));
            }
            catch (Signal) { /* nop */ }
        }
    },
    'linelist-input': {
        encodedValue: (Value) => (ValueIsList(Value) ? Value.join('\n') : ''),
        InputHandlerFor: (onInput) => (Event) => onInput(Event.target.value.trim() === ''
            ? []
            : Event.target.value.trim().replace(/\n\s*\n/g, '\n').split('\n'))
    },
    'numberlist-input': {
        encodedValue: (Value) => (ValueIsList(Value) ? Value.join('\n') : ''),
        InputHandlerFor: (onInput) => (Event) => onInput(Event.target.value.trim().replace(/\n\s*\n/g, '\n').split('\n').map((Line) => parseFloat(Line)).filter((Value) => !isNaN(Value)))
    },
    'integerlist-input': {
        encodedValue: (Value) => (ValueIsList(Value) ? Value.join('\n') : ''),
        InputHandlerFor: (onInput) => (Event) => onInput(Event.target.value.trim().replace(/\n\s*\n/g, '\n').split('\n').map((Line) => parseInt(Line, 10)).filter((Value) => !isNaN(Value)))
    },
};
TextEditorSpecs['html-input'] = TextEditorSpecs['text-input'];
TextEditorSpecs['css-input'] = TextEditorSpecs['text-input'];
TextEditorSpecs['javascript-input'] = TextEditorSpecs['text-input'];
/**** WAD_PropertyConfigurator ****/
function WAD_PropertyConfigurator(PropSet) {
    const { Descriptor, Enabling, Value, onInput } = PropSet;
    const { Name, Label, EditorType, readonly, Placeholder, FalseValue, TrueValue, minLength, maxLength, multiple, Pattern, minValue, maxValue, StepValue, Resizability, LineWrapping, SpellChecking, ValueList, Hashmarks, Suggestions } = Descriptor;
    /**** renderedTextlineEditor - shared among all WAD_TextlineInput variants ****/
    function renderedTextlineEditor() {
        const additionalProps = TextlinePropsForEditorType[EditorType](Descriptor);
        return html `
        <${WAD_horizontally}>
          <${WAD_Label}>${Label}</>
          <${WAD_Gap}/>
          <${WAD_TextlineInput} style="flex:1 0 auto"
            enabled=${Enabling} readonly=${readonly}
            Value=${Value} Placeholder=${Placeholder}
            minLength=${minLength} maxLength=${maxLength} Pattern=${Pattern}
            ...${additionalProps}
            onInput=${(Event) => onInput(Event.target.value)}
          />
        </>
      `;
    }
    /**** renderedTimeEditor - shared among all WAD_TimeInput variants ****/
    function renderedTimeEditor() {
        return html `
        <${WAD_horizontally}>
          <${WAD_Label}>${Label}</>
          <${WAD_Gap}/>
          <${WAD_TimeInput} Type=${TimeTypeForEditorType[EditorType]}
            enabled=${Enabling} readonly=${readonly}
            Value=${Value} Placeholder=${Placeholder} Suggestions=${Suggestions}
            Minimum=${minValue} Maximum=${maxValue}
            onInput=${(Event) => onInput(Event.target.value)}
          />
        </>
      `;
    }
    /**** renderedTextEditor - shared among all WAD_TextInput variants ****/
    function renderedTextEditor() {
        const { encodedValue, InputHandlerFor } = TextEditorSpecs[EditorType];
        return html `
        <${WAD_horizontally}>
          <${WAD_Label}>${Label}</>

          ${(Name === 'Value') && html `
            <${WAD_Gap}/>
            <${WAD_Icon} Icon="${IconFolder}/clapperboard.png"
              active=${DialogIsOpen('ValueEditor')}
              onClick=${(Event) => toggleDialog('ValueEditor', Event)}
            />
          `}
        </>

        <${WAD_TextInput} style="padding-top:4px; min-height:60px"
          enabled=${Enabling} readonly=${readonly}
          Value=${encodedValue(Value)} Placeholder=${Placeholder}
          minLength=${minLength} maxLength=${maxLength}
          Resizability=${Resizability} LineWrapping=${LineWrapping}
          onInput=${InputHandlerFor(onInput)}
        />
      `;
    }
    switch (EditorType) {
        case 'checkbox':
            return html `
          <${WAD_horizontally}>
            <${WAD_Label}>${Label}</>
            <${WAD_Gap}/>
            <${WAD_Checkbox}
              enabled=${Enabling} readonly=${readonly} Value=${Value}
              onInput=${(Event) => onInput(Event.target.checked)}
            />
          </>
        `;
        case 'choice': // drop-down for boolean properties
            return html `
          <${WAD_horizontally}>
            <${WAD_Label}>${Label}</>
            <${WAD_Gap}/>
            <${WAD_DropDown}
              enabled=${Enabling} readonly=${readonly}
              Value=${(Value === noSelection) || (Value === multipleValues) ? Value : (Value == true ? TrueValue : FalseValue)}
              Options=${[FalseValue, TrueValue]}
              onInput=${(Event) => onInput(Event.target.value === TrueValue)}
            />
          </>
        `;
        case 'textline-input':
        case 'password-input':
        case 'email-address-input':
        case 'phone-number-input':
        case 'url-input':
        case 'search-input':
            return renderedTextlineEditor();
        case 'number-input':
            return html `
          <${WAD_horizontally}>
            <${WAD_Label}>${Label}</>
            <${WAD_Gap}/>
            <${WAD_NumberInput} style="width:60px"
              enabled=${Enabling} readonly=${readonly}
              Value=${Value} Placeholder=${Placeholder} Suggestions=${Suggestions}
              Minimum=${minValue} Maximum=${maxValue} StepValue=${StepValue}
              onInput=${(Event) => onInput(parseFloat(Event.target.value))}
            />
          </>
        `;
        case 'integer-input':
            return html `
          <${WAD_horizontally}>
            <${WAD_Label}>${Label}</>
            <${WAD_Gap}/>
            <${WAD_IntegerInput} style="width:60px"
              enabled=${Enabling} readonly=${readonly}
              Value=${Value} Placeholder=${Placeholder} Suggestions=${Suggestions}
              Minimum=${minValue} Maximum=${maxValue}
              onInput=${(Event) => onInput(parseInt(Event.target.value, 10))}
            />
          </>
        `;
        case 'time-input':
        case 'date-time-input':
        case 'date-input':
        case 'month-input':
        case 'week-input':
            return renderedTimeEditor();
        case 'color-input':
            return html `
          <${WAD_horizontally}>
            <${WAD_Label}>${Label}</>
            <${WAD_Gap}/>
            <${WAD_ColorInput}
              enabled=${Enabling} readonly=${readonly}
              Value=${Value} Suggestions=${Suggestions}
              onInput=${(Event) => onInput(Event.target.value)}
            />
          </>
        `;
        case 'drop-down':
            return html `
          <${WAD_horizontally}>
            <${WAD_Label}>${Label}</>
            <${WAD_Gap}/>
            <${WAD_DropDown}
              enabled=${Enabling} Value=${Value} Options=${ValueList}
              onInput=${(Event) => onInput(Event.target.value)}
            />
          </>
        `;
        case 'slider':
            return html `
          <${WAD_horizontally}>
            <${WAD_Label}>${Label}</>
            <${WAD_Gap}/>
            <${WAD_Slider} style="width:60px"
              enabled=${Enabling} readonly=${readonly}
              Value=${Value} Placeholder=${Placeholder} Hashmarks=${Hashmarks}
              Minimum=${minValue} Maximum=${maxValue} StepValue=${StepValue}
              onInput=${(Event) => onInput(parseFloat(Event.target.value))}
            />
          </>
        `;
        case 'text-input':
        case 'html-input':
        case 'css-input':
        case 'javascript-input':
        case 'json-input':
        case 'linelist-input':
        case 'numberlist-input':
        case 'integerlist-input':
            return renderedTextEditor();
    }
    console.warn(`unsupported EditorType ${quoted(EditorType)}`);
    return html ``;
}
/**** WAD_ErrorFooter - error report display with alerting warning icon ****/
function WAD_ErrorFooter(PropSet) {
    var _a;
    const { ReportToShow, Visual } = PropSet;
    // "Visual" provides "ReportToShow" upon clicking
    const showIcon = ( // inspector panes pass their own, laxer condition
    (_a = PropSet.showIcon) !== null && _a !== void 0 ? _a : ValueIsErrorReport(ReportToShow));
    return html `<${WAD_horizontally}>
      <${WAD_ErrorView} style="flex:1 1 auto" ErrorReport=${ReportToShow}/>
      <${WAD_Icon} Icon="${IconFolder}/triangle-exclamation.png" style="
        display:${showIcon ? 'block' : 'none'};
        padding-top:6px;
      " onClick=${() => {
        const { ReportToShow } = Visual;
        window.alert(ReportToShow.Type + '\n\n' + ReportToShow.Message);
    }}/>
    </>`;
} //------------------------------------------------------------------------------
//--                              Import Support                              --
//------------------------------------------------------------------------------
/**** looksLikeBehaviorSet ****/
function looksLikeBehaviorSet(Serialization) {
    return (ValueIsPlainObject(Serialization) &&
        (Serialization.PageList == null) &&
        (Serialization.WidgetList == null) &&
        ValueIsPlainObject(Serialization.BehaviorSet) &&
        // @ts-ignore TS18047 "Serialization.BehaviorSet" is not null
        ((Serialization.BehaviorSet['applet'] == null) || ValueIsList(Serialization.BehaviorSet['applet'])) &&
        // @ts-ignore TS18047 "Serialization.BehaviorSet" is not null
        ((Serialization.BehaviorSet['page'] == null) || ValueIsList(Serialization.BehaviorSet['page'])) &&
        // @ts-ignore TS18047 "Serialization.BehaviorSet" is not null
        ((Serialization.BehaviorSet['widget'] == null) || ValueIsList(Serialization.BehaviorSet['widget'])));
}
/**** looksLikeApplet ****/
function looksLikeApplet(Serialization) {
    return (ValueIsPlainObject(Serialization) &&
        ValueIsListSatisfying(Serialization.PageList, looksLikePage)); // a proper "PageList" identifies an applet
}
/**** looksLikePage ****/
function looksLikePage(Serialization) {
    return (ValueIsPlainObject(Serialization) &&
        (Serialization.PageList == null) &&
        ValueIsListSatisfying(Serialization.WidgetList, looksLikeWidget)); // a proper "WidgetList" identifies a page
}
/**** looksLikePageList ****/
function looksLikePageList(Serialization) {
    return ValueIsListSatisfying(Serialization, looksLikePage);
}
/**** looksLikeWidget ****/
function looksLikeWidget(Serialization) {
    return (ValueIsPlainObject(Serialization) &&
        (Serialization.PageList == null) &&
        (Serialization.WidgetList == null)); // neither "PageList" nor "WidgetList"? that should be a widget
}
/**** looksLikeWidgetList ****/
function looksLikeWidgetList(Serialization) {
    return ValueIsListSatisfying(Serialization, looksLikeWidget);
}
//------------------------------------------------------------------------------
//--                                Generators                                --
//------------------------------------------------------------------------------
/**** WebAppHeadPrologue - head skeleton shared by all web app generators ****/
function WebAppHeadPrologue(PageOverflow) {
    return `<!DOCTYPE html>
<html lang="en" style="width:100%">
 <head>
  <meta charset="utf-8"/>

  <meta name="viewport"         content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"/>
  <meta name="format-detection" content="telephone=no">

  <style>
    html { text-size-adjust:100% }

    html, body { width:100%; height:100%; width:100vw; height:100vh; margin:0px; padding:0px }
    html       { overflow:${PageOverflow} }
  </style>
  <link rel="stylesheet" href="https://rozek.github.io/marked-katex-extension/dist/katex.min.css">

  ${'<'}script type="importmap">
  {
    "imports": {
      "javascript-interface-library":"https://rozek.github.io/javascript-interface-library/dist/javascript-interface-library.esm.js",
      "htm/preact":                  "https://rozek.github.io/htm/preact/standalone.module.js",
      "hyperactiv":                  "https://rozek.github.io/hyperactiv/dist/index.mjs",
      "nanoid":                      "https://rozek.github.io/nanoid/dist/nanoid.esm.js",
      "nanoid-dictionary":           "https://rozek.github.io/nanoid-dictionary/dist/nanoid-dictionary.esm.js",
      "svelte-coordinate-conversion":"https://rozek.github.io/svelte-coordinate-conversion/dist/svelte-coordinate-conversion.esm.js",
      "svelte-touch-to-mouse":       "https://rozek.github.io/svelte-touch-to-mouse/dist/svelte-touch-to-mouse.esm.js",

      "wat-runtime": "https://rozek.github.io/webapp-tinkerer/js/wat-runtime.esm.js",
      "wat-designer":"https://rozek.github.io/webapp-tinkerer/js/wat-designer.esm.js",

      "marked":                "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js",
      "marked-katex-extension":"https://rozek.github.io/marked-katex-extension/dist/marked-katex-extension.esm.js",
      "marked-highlight":      "https://cdn.jsdelivr.net/npm/marked-highlight/+esm",
      "highlight.js/lib/core":                "https://cdn.jsdelivr.net/gh/highlightjs/cdn-release/build/es/highlight.min.js",
      "highlight.js/lib/languages/css":       "https://cdn.jsdelivr.net/gh/highlightjs/cdn-release/build/es/languages/css.min.js",
      "highlight.js/lib/languages/javascript":"https://cdn.jsdelivr.net/gh/highlightjs/cdn-release/build/es/languages/javascript.min.js",
      "highlight.js/lib/languages/java":      "https://cdn.jsdelivr.net/gh/highlightjs/cdn-release/build/es/languages/java.min.js",
      "highlight.js/lib/languages/json":      "https://cdn.jsdelivr.net/gh/highlightjs/cdn-release/build/es/languages/json.min.js",
      "highlight.js/lib/languages/typescript":"https://cdn.jsdelivr.net/gh/highlightjs/cdn-release/build/es/languages/typescript.min.js",
      "highlight.js/lib/languages/xml":       "https://cdn.jsdelivr.net/gh/highlightjs/cdn-release/build/es/languages/xml.min.js"
    }
  }
  ${'<'}/script>
  ${'<'}script src="https://rozek.github.io/webapp-tinkerer/js/localforage.min.js">${'<'}/script>`;
}
/**** downloadIfStable - downloads a text only if its encoding is stable ****/
function downloadIfStable(Source, FileName, MIMEType, ErrorLabel) {
    const encodedSource = (new TextEncoder()).encode(Source);
    const decodedSource = (new TextDecoder()).decode(encodedSource);
    if (Source === decodedSource) {
        download(encodedSource, FileName, MIMEType);
    }
    else {
        window.alert(`this ${ErrorLabel} is not stable`);
    }
}
/**** generateEmbeddableApplet - with integrated script ****/
function generateEmbeddableApplet() {
    const { Applet } = DesignerState;
    const AppletName = Applet.Name || 'WAT-Applet';
    const Serialization = JSON.stringify(Applet.Serialization);
    const AppletSource = `${'<'}script type="wat/applet">${Serialization.replace(/<\//g, '<\\/')}${'<'}/script>`;
    downloadIfStable(AppletSource, AppletName + '.html', 'text/html;charset=utf-8', 'applet generation');
}
/**** generateStandaloneWebApp - with separate script and without designer ****/
function generateStandaloneWebApp(withDesigner = false) {
    const { Applet } = DesignerState;
    const AppletName = (Applet.Name || 'WAT-Applet').replace(/["'`\\$<>&]/g, '_');
    const Serialization = Applet.Serialization;
    const AppletScript = Serialization.Script;
    delete Serialization.Script;
    const { HeadExtensions, minWidth, maxWidth, minHeight, maxHeight, toBeCentered, withMobileFrame, expectedOrientation } = Applet;
    const AppletSource = `
${WebAppHeadPrologue('hidden scroll')}
  ${'<'}script src="https://rozek.github.io/webapp-tinkerer/js/WAT-Runtime.esm.js"  type="module">${'<'}/script>
  ${withDesigner ? `${'<'}script src="https://rozek.github.io/webapp-tinkerer/js/WAT-Designer.esm.js" type="module">${'<'}/script>` : ''}
  ${withDesigner ? `${'<'}script src="https://rozek.github.io/download/download.min.js">${'<'}/script>` : ''}

  ${HeadExtensions}

  ${'<'}script>
  let [
    minWidth,maxWidth, minHeight,maxHeight, toBeCentered,
    withMobileFrame,expectedOrientation
  ] = [
    ${minWidth},${maxWidth}, ${minHeight},${maxHeight}, ${toBeCentered},
    ${withMobileFrame},'${expectedOrientation}'
  ]

  const ViewportWidth  = window.innerWidth
  const ViewportHeight = window.innerHeight

  let Width  = Math.max(minWidth  == null ? 0 : minWidth,  Math.min(ViewportWidth,  maxWidth  == null ? Infinity : maxWidth))
  let Height = Math.max(minHeight == null ? 0 : minHeight, Math.min(ViewportHeight, maxHeight == null ? Infinity : maxHeight))
                        // uses any available space - does not use designer size

  if ((Width >= ViewportWidth) && (Height >= ViewportHeight)) {
    withMobileFrame = false
  }

  let OffsetX = (
    (Width < ViewportWidth) && toBeCentered
    ? Math.floor((ViewportWidth-Width)/2)
    : 0
  )
  let OffsetY = (
    (Height < ViewportHeight) && toBeCentered
    ? Math.floor((ViewportHeight-Height)/2)
    : 0
  )

  if (withMobileFrame) {
    Width  += 10;  OffsetX -= 5
    Height += 10;  OffsetY -= 5

    if (minWidth  != null) { minWidth  += 10 }
    if (minHeight != null) { minHeight += 10 }

    if (maxWidth  != null) { maxWidth  += 10 }
    if (maxHeight != null) { maxHeight += 10 }
  }

  document.write(\`
  <div type="wat/applet" name="${HTMLsafe(AppletName)}" class="\${withMobileFrame ? 'withMobileFrame' : ''}" style="
    display:block; position:absolute;
    left:\${OffsetX}px; top:\${OffsetY}px; width:\${Width}px; height:\${Height}px;
    \${minWidth  == null ? '' : \`min-width:\${minWidth}px; \`}
    \${maxWidth  == null ? '' : \`max-width:\${maxWidth}px; \`}
    \${minHeight == null ? '' : \`min-height:\${minHeight}px; \`}
    \${maxHeight == null ? '' : \`max-height:\${maxHeight}px; \`}
    box-shadow:0px 0px 10px 0px black;
  "></div>
  \`)
  ${'<'}/script>

  ${'<'}script type="wat/applet">${JSON.stringify(Serialization).replace(/<\//g, '<\\/')}${'<'}/script>
  ${(AppletScript || '').trim() === ''
        ? ''
        : `${'<'}script type="wat/applet-script">${AppletScript.replace(/<\/script/gi, '<\\/script')}\n${'<'}/script>`}
 </head>
 <body></body>
</html>
    `.trim();
    downloadIfStable(AppletSource, AppletName + '.html', 'text/html;charset=utf-8', 'WebApp generation');
}
/**** generatedWebAppFromWidget ****/
function generatedWebAppFromWidget(BaseWidget) {
    if (BaseWidget == null) {
        window.alert('No Widget selected');
        return;
    }
    const { Applet } = DesignerState;
    const AppletName = (BaseWidget.Name || 'WAT-Applet').replace(/["'`\\$<>&]/g, '_');
    const AppletWidgets = (BaseWidget.normalizedBehavior === 'basic_controls.outline'
        ? BaseWidget.bundledWidgets()
        : [BaseWidget]);
    const { Width, Height } = BaseWidget.Size;
    let { maxWidth, maxHeight, initialMaxWidth, initialMaxHeight } = BaseWidget;
    if (maxWidth == null) {
        maxWidth = Width;
    }
    if (maxHeight == null) {
        maxHeight = Height;
    }
    if (initialMaxWidth == null) {
        initialMaxWidth = maxWidth;
    }
    if (initialMaxHeight == null) {
        initialMaxHeight = maxHeight;
    }
    const serializedWidgets = AppletWidgets.map((Widget) => Widget.Serialization);
    const BaseGeometry = BaseWidget.Geometry;
    const PaneGeometry = { x: 0, y: 0, Width, Height };
    serializedWidgets.forEach((Serialization, i) => {
        const Widget = AppletWidgets[i];
        let Geometry = GeometryOfWidgetRelativeTo(Widget, BaseGeometry, PaneGeometry);
        updateGeometryOf(Serialization, Geometry, PaneGeometry);
    });
    /**** updateGeometryOf ****/
    function updateGeometryOf(Serialization, WidgetGeometry, PaneGeometry) {
        let { x: newX, y: newY, Width: newWidth, Height: newHeight } = WidgetGeometry;
        const curAnchors = Serialization.Anchors || ['left-width', 'top-height'];
        /**** keep any new Width and Height settings within confiured limits ****/
        newWidth = Math.max(0, Serialization.minWidth || 0, Math.min(newWidth, Serialization.maxWidth == null ? Infinity : Serialization.maxWidth));
        newHeight = Math.max(0, Serialization.minHeight || 0, Math.min(newHeight, Serialization.maxHeight == null ? Infinity : Serialization.maxHeight));
        /**** now update any affected Offsets ****/
        const { Width: outerWidth, Height: outerHeight } = PaneGeometry;
        switch (curAnchors[0] || 'left-width') {
            case 'left-width':
                Serialization.Offsets[0] = newX;
                Serialization.Offsets[1] = newWidth;
                break;
            case 'width-right':
                Serialization.Offsets[0] = newWidth;
                Serialization.Offsets[1] = outerWidth - newX - newWidth;
                break;
            case 'left-right':
                Serialization.Offsets[0] = newX;
                Serialization.Offsets[1] = outerWidth - newX - newWidth;
        }
        switch (curAnchors[1] || 'top-height') {
            case 'top-height':
                Serialization.Offsets[2] = newY;
                Serialization.Offsets[3] = newHeight;
                break;
            case 'height-bottom':
                Serialization.Offsets[2] = newHeight;
                Serialization.Offsets[3] = outerHeight - newY - newHeight;
                break;
            case 'top-bottom':
                Serialization.Offsets[2] = newY;
                Serialization.Offsets[3] = outerHeight - newY - newHeight;
        }
    }
    const customBehaviorSet = { widget: {} };
    AppletWidgets.forEach((Widget) => {
        const Behavior = Widget.Behavior;
        if (Behavior == null) {
            return;
        }
        if (!BehaviorIsIntrinsic(Behavior)) {
            const normalizedName = Behavior.toLowerCase();
            const Registration = Applet._BehaviorPool.widget[normalizedName];
            if (Registration != null) {
                customBehaviorSet.widget[Registration.Name] = Registration.activeScript;
            }
        }
    });
    const Serialization = {
        Name: AppletName, BehaviorSet: customBehaviorSet,
        Width, Height, toBeCentered: true, withMobileFrame: false,
        minWidth: Width, maxWidth, minHeight: Height, maxHeight,
        PageList: [{ WidgetList: serializedWidgets }]
    };
    const AppletSource = `
${WebAppHeadPrologue('hidden')}
  ${'<'}script src="https://rozek.github.io/webapp-tinkerer/js/WAT-Runtime.esm.js" type="module">${'<'}/script>

  ${'<'}script>
  AppletFromWidget = true      // global variable indicating this type of applet

  let [
    minWidth,maxWidth, minHeight,maxHeight, initialMaxWidth,initialMaxHeight,
    toBeCentered,withMobileFrame
  ] = [
    ${Width},${maxWidth}, ${Height},${maxHeight}, ${initialMaxWidth},${initialMaxHeight},
    true,false
  ]

  const ViewportWidth  = window.innerWidth
  const ViewportHeight = window.innerHeight

  let Width  = Math.max(minWidth,  Math.min(ViewportWidth,  initialMaxWidth  || maxWidth  || Infinity))
  let Height = Math.max(minHeight, Math.min(ViewportHeight, initialMaxHeight || maxHeight || Infinity))

  let OffsetX = (
    (Width < ViewportWidth) && toBeCentered
    ? Math.floor((ViewportWidth-Width)/2)
    : 0
  )
  let OffsetY = (
    (Height < ViewportHeight) && toBeCentered
    ? Math.floor((ViewportHeight-Height)/2)
    : 0
  )

  document.write(\`
 <div style="
   display:flex; justify-content:center; align-items:center;
   position:absolute; left:0px; top:0px; right:0px; bottom:0px;
 ">
  <div type="wat/applet" name="${HTMLsafe(AppletName)}" style="
    display:block; position:relative;
    width:\${Width}px; height:\${Height}px;
    \${minWidth  == null ? '' : \`min-width:\${minWidth}px; \`}
    \${maxWidth  == null ? '' : \`max-width:\${maxWidth}px; \`}
    \${minHeight == null ? '' : \`min-height:\${minHeight}px; \`}
    \${maxHeight == null ? '' : \`max-height:\${maxHeight}px; \`}
  "></div>
 </div>
  \`)
  ${'<'}/script>

  ${'<'}script type="wat/applet">${JSON.stringify(Serialization).replace(/<\//g, '<\\/')}${'<'}/script>
 </head>
 <body></body>
</html>
    `.trim();
    downloadIfStable(AppletSource, AppletName + '.html', 'text/html;charset=utf-8', 'WebApp generation');
} //------------------------------------------------------------------------------
//--                                  Shelf                                   --
//------------------------------------------------------------------------------
Object.assign(DesignerState, {
    shelvedWidgets: [], // list of shelved widgets
});
//------------------------------------------------------------------------------
//--                              Visit History                               --
//------------------------------------------------------------------------------
Object.assign(DesignerState, {
    VisitHistory: [], // list of already visited pages
    VisitIndex: -1, // points to currently visited page
});
/**** mayVisitPrev/NextPage ****/
function mayVisitPrevPage() { return (DesignerState.VisitIndex > 0); }
function mayVisitNextPage() { return (DesignerState.VisitIndex < DesignerState.VisitHistory.length - 1); }
/**** visitPrev/NextPage ****/
function visitPrevPage() {
    if (mayVisitPrevPage()) {
        DesignerState.VisitIndex -= 1;
        DesignerState.Applet.visitPage(DesignerState.VisitHistory[DesignerState.VisitIndex]);
    }
}
function visitNextPage() {
    if (mayVisitNextPage()) {
        DesignerState.VisitIndex += 1;
        DesignerState.Applet.visitPage(DesignerState.VisitHistory[DesignerState.VisitIndex]);
    }
}
/**** visitPage ****/
function visitPage(Page) {
    allowPage('page to visit', Page);
    let { Applet, VisitHistory, VisitIndex } = DesignerState;
    const visitedPage = VisitHistory[VisitIndex];
    if (visitedPage === Page) {
        return;
    }
    if (mayVisitNextPage()) {
        DesignerState.VisitIndex = VisitIndex = VisitIndex + 1;
        if (VisitHistory[VisitIndex] !== Page) {
            VisitHistory[VisitIndex] = Page;
            VisitHistory.length = VisitIndex + 1;
        }
    }
    else {
        VisitHistory.push(Page);
        DesignerState.VisitIndex += 1;
    }
    Applet.visitPage(Page);
}
/**** validateVisitHistory ****/
function validateVisitHistory() {
    var _a;
    const VisitHistory = DesignerState.VisitHistory; // reference, not copy!
    for (let i = VisitHistory.length - 1; i >= 0; i--) {
        if (((_a = VisitHistory[i]) === null || _a === void 0 ? void 0 : _a.Applet) == null) {
            VisitHistory.splice(i, 1);
            if (DesignerState.VisitIndex >= i) {
                DesignerState.VisitIndex -= 1;
            }
        }
    }
}
//------------------------------------------------------------------------------
//--                            Operation History                             --
//------------------------------------------------------------------------------
Object.assign(DesignerState, {
    OperationHistory: [],
    OperationIndex: 0, // points to next doable operation
});
/**** mayUndo/Redo ****/
function mayUndo() { return (DesignerState.OperationIndex > 0); }
function mayRedo() {
    return (DesignerState.OperationIndex < DesignerState.OperationHistory.length);
}
/**** updateObjectInOperationHistory ****/
function updateObjectInOperationHistory(oldObject, newObject) {
    if ((oldObject == null) || (oldObject === newObject)) {
        return;
    }
    DesignerState.OperationHistory.forEach((Operation) => {
        Object.getOwnPropertyNames(Operation).forEach((Key) => {
            const Value = Operation[Key];
            if (Value === oldObject) {
                Operation[Key] = newObject;
            }
            else {
                if (ValueIsArray(Value)) {
                    Value.forEach((Item, i) => {
                        if (Item === oldObject) {
                            Value[i] = newObject;
                        }
                    });
                }
            }
        });
    });
}
/**** performOperation - shared core of "doOperation" and MCP "_perform" ****/
function performOperation(OperationFactory) {
    const { OperationHistory, OperationIndex } = DesignerState;
    const Operation = OperationFactory(); // may fail
    const prevOperation = OperationHistory[OperationIndex - 1];
    if ((prevOperation != null) && Operation.canExtend(prevOperation)) {
        Operation.extend(prevOperation); // may fail
        OperationHistory.length = OperationIndex; // only upon success
        if (prevOperation.isIrrelevant) {
            DesignerState.OperationIndex -= 1;
            OperationHistory.length = DesignerState.OperationIndex;
        }
    }
    else {
        Operation.doNow(); // may fail
        if (!Operation.isIrrelevant) { // do not historize no-op operations
            OperationHistory.length = OperationIndex; // only upon success
            OperationHistory.push(Operation);
            DesignerState.OperationIndex += 1;
        }
    }
    DesignerState.Applet.preserve();
}
/**** doOperation ****/
function doOperation(OperationFactory) {
    try {
        performOperation(OperationFactory);
    }
    catch (Signal) {
        console.error('operation failed', Signal);
    }
}
/**** undoOperation ****/
function undoOperation() {
    const { OperationHistory, OperationIndex } = DesignerState;
    const prevOperation = OperationHistory[OperationIndex - 1];
    if (prevOperation != null) {
        try {
            prevOperation.undo();
            DesignerState.OperationIndex -= 1; // only upon success
            DesignerState.Applet.preserve();
        }
        catch (Signal) {
            console.error('undo failed', Signal);
        }
    }
}
/**** redoOperation ****/
function redoOperation() {
    const { OperationHistory, OperationIndex } = DesignerState;
    const nextOperation = OperationHistory[OperationIndex];
    if (nextOperation != null) {
        try {
            nextOperation.redo();
            DesignerState.OperationIndex += 1; // only upon success
            DesignerState.Applet.preserve();
        }
        catch (Signal) {
            console.error('redo failed', Signal);
        }
    }
}
//----------------------------------------------------------------------------//
//                               WAD_Operation                                //
//----------------------------------------------------------------------------//
class WAD_Operation {
    canExtend(otherOperation) { return false; }
    extend(otherOperation) {
        throwError('NotExtensible: this operation can not be extended');
    }
    get isIrrelevant() { return false; }
    set isIrrelevant(_) { throwReadOnlyError('isIrrelevant'); }
    redo() { this.doNow(); }
}
//----------------------------------------------------------------------------//
//                    WAD_BehaviorDeserializationOperation                    //
//----------------------------------------------------------------------------//
class WAD_BehaviorDeserializationOperation extends WAD_Operation {
    /**** constructor ****/
    constructor(Serialization) {
        super();
        Object.defineProperty(this, "_Category", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_Behavior", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_Script", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this._Category = Object.keys(Serialization.BehaviorSet)[0];
        this._Behavior = Serialization.BehaviorSet[this._Category][0].Name;
        this._Script = Serialization.BehaviorSet[this._Category][0].Script;
    }
    /**** doNow ****/
    doNow() {
        const Applet = DesignerState.Applet;
        Applet.registerBehaviorOfCategory(this._Category, this._Behavior, this._Script);
        DesignerState.selectedCategory = this._Category;
        DesignerState.selectedBehavior = this._Behavior;
    }
    /**** undo ****/
    undo() {
        const Applet = DesignerState.Applet;
        Applet.unregisterBehaviorOfCategory(this._Category, this._Behavior);
        DesignerState.selectedCategory = this._Category;
        DesignerState.selectedBehavior = undefined;
    }
}
//----------------------------------------------------------------------------//
//                     WAD_BehaviorConfigurationOperation                     //
//----------------------------------------------------------------------------//
class WAD_BehaviorConfigurationOperation extends WAD_Operation {
    /**** constructor ****/
    constructor(Category, Behavior, PropertyName, PropertyValue) {
        super();
        Object.defineProperty(this, "_Category", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_Behavior", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_PropertyName", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_oldValue", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_newValue", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        const Applet = DesignerState.Applet;
        this._Category = Category;
        this._Behavior = Behavior;
        this._PropertyName = PropertyName;
        this._oldValue = Applet._BehaviorPool[Category][Behavior.toLowerCase()][PropertyName];
        this._newValue = PropertyValue;
    }
    /**** canExtend ****/
    canExtend(otherOperation) {
        return ((otherOperation instanceof WAD_BehaviorConfigurationOperation) &&
            (otherOperation._Category === this._Category) &&
            (otherOperation._PropertyName === this._PropertyName) &&
            (((this._PropertyName === 'Name') &&
                (otherOperation._newValue === this._Behavior) // renaming is tricky!
            ) || ((this._PropertyName !== 'Name') &&
                (otherOperation._Behavior === this._Behavior) &&
                (otherOperation._newValue === this._oldValue))));
    }
    /**** isIrrelevant ****/
    get isIrrelevant() {
        return (this._oldValue === this._newValue);
    }
    set isIrrelevant(_) { throwReadOnlyError('isIrrelevant'); }
    /**** doNow ****/
    doNow() {
        const Applet = DesignerState.Applet;
        switch (this._PropertyName) {
            case 'Name': // renaming is tricky!
                Applet.renameBehaviorOfCategory(this._Category, this._Behavior, this._newValue);
                DesignerState.selectedBehavior = this._newValue;
                break;
            case 'pendingScript':
                Applet.prescriptBehaviorOfCategory(this._Category, this._Behavior, this._newValue);
                DesignerState.selectedBehavior = this._Behavior;
                break;
        }
        DesignerState.selectedCategory = this._Category;
    }
    /**** extend ****/
    extend(otherOperation) {
        this.doNow();
        // @ts-ignore TS2341 allow access
        otherOperation._newValue = this._newValue;
    }
    /**** undo ****/
    undo() {
        const Applet = DesignerState.Applet;
        switch (this._PropertyName) {
            case 'Name': // renaming is tricky!
                Applet.renameBehaviorOfCategory(this._Category, this._newValue, this._Behavior);
                break;
            case 'pendingScript':
                Applet.prescriptBehaviorOfCategory(this._Category, this._Behavior, this._oldValue);
                break;
        }
        DesignerState.selectedCategory = this._Category;
        DesignerState.selectedBehavior = this._Behavior;
    }
}
//----------------------------------------------------------------------------//
//                   WAD_BehaviorScriptApplicationOperation                   //
//----------------------------------------------------------------------------//
class WAD_BehaviorScriptApplicationOperation extends WAD_Operation {
    /**** constructor ****/
    constructor(Category, Behavior) {
        super();
        Object.defineProperty(this, "_Category", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_Behavior", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_oldScript", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_newScript", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        const Applet = DesignerState.Applet;
        this._Category = Category;
        this._Behavior = Behavior;
        this._oldScript = Applet._BehaviorPool[Category][Behavior.toLowerCase()].activeScript;
        this._newScript = Applet._BehaviorPool[Category][Behavior.toLowerCase()].pendingScript;
    }
    /**** isIrrelevant ****/
    get isIrrelevant() {
        return (this._newScript === this._oldScript);
    }
    set isIrrelevant(_) { throwReadOnlyError('isIrrelevant'); }
    /**** doNow ****/
    doNow() {
        const Applet = DesignerState.Applet;
        Applet.rescriptBehaviorOfCategory(this._Category, this._Behavior);
    }
    /**** undo ****/
    undo() {
        const Applet = DesignerState.Applet;
        Applet.prescriptBehaviorOfCategory(this._Category, this._Behavior, this._oldScript);
        Applet.rescriptBehaviorOfCategory(this._Category, this._Behavior);
        Applet.prescriptBehaviorOfCategory(this._Category, this._Behavior, this._newScript);
    }
}
//----------------------------------------------------------------------------//
//                       WAD_BehaviorDeletionOperation                        //
//----------------------------------------------------------------------------//
class WAD_BehaviorDeletionOperation extends WAD_Operation {
    /**** constructor ****/
    constructor(Category, Behavior) {
        super();
        Object.defineProperty(this, "_Category", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_Behavior", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_Script", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        const Applet = DesignerState.Applet;
        this._Category = Category;
        this._Behavior = Behavior;
        this._Script = Applet._BehaviorPool[Category][Behavior.toLowerCase()].activeScript;
    }
    /**** doNow ****/
    doNow() {
        const { Applet } = DesignerState;
        Applet.unregisterBehaviorOfCategory(this._Category, this._Behavior);
        DesignerState.selectedCategory = this._Category;
        DesignerState.selectedBehavior = undefined;
    }
    /**** undo ****/
    undo() {
        const { Applet } = DesignerState;
        Applet.registerBehaviorOfCategory(this._Category, this._Behavior, this._Script);
        DesignerState.selectedCategory = this._Category;
        DesignerState.selectedBehavior = this._Behavior;
    }
}
//----------------------------------------------------------------------------//
//                      WAD_AppletConfigurationOperation                      //
//----------------------------------------------------------------------------//
class WAD_AppletConfigurationOperation extends WAD_Operation {
    /**** constructor ****/
    constructor(PropertyName, PropertyValue) {
        super();
        Object.defineProperty(this, "_PropertyName", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_oldValue", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_newValue", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this._PropertyName = PropertyName;
        this._oldValue = DesignerState.Applet[PropertyName];
        this._newValue = PropertyValue;
    }
    /**** canExtend ****/
    canExtend(otherOperation) {
        return ((otherOperation instanceof WAD_AppletConfigurationOperation) &&
            (otherOperation._PropertyName === this._PropertyName) &&
            ValuesAreEqual(otherOperation._newValue, this._oldValue));
    }
    /**** isIrrelevant ****/
    get isIrrelevant() {
        return ValuesAreEqual(this._newValue, this._oldValue);
    }
    set isIrrelevant(_) { throwReadOnlyError('isIrrelevant'); }
    /**** doNow ****/
    doNow() {
        DesignerState.Applet[this._PropertyName] = this._newValue;
    }
    /**** extend ****/
    extend(otherOperation) {
        this.doNow();
        otherOperation._newValue = this._newValue;
    }
    /**** undo ****/
    undo() {
        DesignerState.Applet[this._PropertyName] = this._oldValue;
    }
}
//----------------------------------------------------------------------------//
//                    WAD_AppletScriptApplicationOperation                    //
//----------------------------------------------------------------------------//
class WAD_AppletScriptApplicationOperation extends WAD_Operation {
    /**** constructor ****/
    constructor() {
        super();
        Object.defineProperty(this, "_oldScript", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_newScript", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this._oldScript = DesignerState.Applet.activeScript;
        this._newScript = DesignerState.Applet.pendingScript;
    }
    /**** isIrrelevant ****/
    get isIrrelevant() {
        return (this._newScript === this._oldScript);
    }
    set isIrrelevant(_) { throwReadOnlyError('isIrrelevant'); }
    /**** doNow ****/
    doNow() {
        DesignerState.Applet.applyPendingScript();
    }
    /**** undo ****/
    undo() {
        const Applet = DesignerState.Applet;
        const pendingScript = Applet.pendingScript;
        Applet.pendingScript = this._oldScript;
        try {
            DesignerState.Applet.applyPendingScript();
        }
        catch (Signal) {
            Applet.pendingScript = pendingScript;
            throw Signal;
        }
        Applet.pendingScript = pendingScript;
    }
}
//----------------------------------------------------------------------------//
//                      WAD_PageDeserializationOperation                      //
//----------------------------------------------------------------------------//
class WAD_PageDeserializationOperation extends WAD_Operation {
    /**** constructor ****/
    constructor(Serializations, StartIndex) {
        super();
        Object.defineProperty(this, "_Serializations", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_StartIndex", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_newPages", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        this._Serializations = Serializations.slice();
        this._StartIndex = StartIndex;
    }
    /**** doNow ****/
    doNow() {
        const Applet = DesignerState.Applet;
        const oldPages = this._newPages;
        const newPages = this._newPages = [];
        this._Serializations.forEach((Serialization, i) => {
            const newPage = Applet.PageDeserializedAt(Serialization, this._StartIndex + i);
            newPages.push(newPage);
            updateObjectInOperationHistory(oldPages[i], newPage);
        });
        selectPages(newPages);
    }
    /**** undo ****/
    undo() {
        const Applet = DesignerState.Applet;
        this._newPages.forEach((Page) => {
            Applet.destroyPage(Page);
        });
        selectPages([]);
    }
}
//----------------------------------------------------------------------------//
//                       WAD_PageConfigurationOperation                       //
//----------------------------------------------------------------------------//
class WAD_PageConfigurationOperation extends WAD_Operation {
    /**** constructor ****/
    constructor(Pages, PropertyName, PropertyValue) {
        super();
        Object.defineProperty(this, "_Pages", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_PropertyName", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_oldValues", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_newValue", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this._Pages = Pages.slice();
        this._PropertyName = PropertyName;
        this._oldValues = Pages.map((Page) => Page[PropertyName]);
        this._newValue = PropertyValue;
    }
    /**** canExtend ****/
    canExtend(otherOperation) {
        return ((otherOperation instanceof WAD_PageConfigurationOperation) &&
            ValuesAreEqual(otherOperation._Pages, this._Pages, 'by-reference') &&
            (otherOperation._PropertyName === this._PropertyName) &&
            this._oldValues.every((oldValue) => ValuesAreEqual(oldValue, otherOperation._newValue)));
    }
    /**** isIrrelevant ****/
    get isIrrelevant() {
        return this._oldValues.every((oldValue) => ValuesAreEqual(oldValue, this._newValue));
    }
    set isIrrelevant(_) { throwReadOnlyError('isIrrelevant'); }
    /**** doNow ****/
    doNow() {
        this._Pages.forEach((Page) => {
            Page[this._PropertyName] = this._newValue;
        });
        selectPages(this._Pages);
    }
    /**** extend ****/
    extend(otherOperation) {
        this.doNow();
        otherOperation._newValue = this._newValue;
    }
    /**** undo ****/
    undo() {
        this._Pages.forEach((Page, i) => {
            Page[this._PropertyName] = this._oldValues[i];
        });
        selectPages(this._Pages);
    }
}
//----------------------------------------------------------------------------//
//                     WAD_PageScriptApplicationOperation                     //
//----------------------------------------------------------------------------//
class WAD_PageScriptApplicationOperation extends WAD_Operation {
    /**** constructor ****/
    constructor(Pages) {
        super();
        Object.defineProperty(this, "_Pages", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_oldScripts", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_newScripts", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this._Pages = Pages.slice();
        this._oldScripts = Pages.map((Page) => Page.activeScript);
        this._newScripts = Pages.map((Page) => Page.pendingScript);
    }
    /**** isIrrelevant ****/
    get isIrrelevant() {
        return ValuesAreEqual(this._newScripts, this._oldScripts);
    }
    set isIrrelevant(_) { throwReadOnlyError('isIrrelevant'); }
    /**** doNow ****/
    doNow() {
        this._Pages.forEach((Page) => Page.applyPendingScript());
    }
    /**** undo ****/
    undo() {
        this._Pages.forEach((Page, i) => {
            const pendingScript = Page.pendingScript;
            Page.pendingScript = this._oldScripts[i];
            try {
                Page.applyPendingScript();
            }
            catch (Signal) { /* nop - will se an error anyway */ }
            Page.pendingScript = pendingScript;
        });
    }
}
//----------------------------------------------------------------------------//
//                           WAD_PageShiftOperation                           //
//----------------------------------------------------------------------------//
class WAD_PageShiftOperation extends WAD_Operation {
    /**** constructor ****/
    constructor(Pages, newIndices) {
        super();
        Object.defineProperty(this, "_Pages", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_oldIndices", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_newIndices", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this._Pages = Pages.slice();
        this._oldIndices = Pages.map((Page) => Page.Index);
        this._newIndices = newIndices.slice();
    }
    /**** canExtend ****/
    canExtend(otherOperation) {
        return ((otherOperation instanceof WAD_PageShiftOperation) &&
            ValuesAreEqual(otherOperation._Pages, this._Pages, 'by-reference') &&
            ValuesAreEqual(otherOperation._newIndices, this._oldIndices));
    }
    /**** isIrrelevant ****/
    get isIrrelevant() {
        return ValuesAreEqual(this._oldIndices, this._newIndices);
    }
    set isIrrelevant(_) { throwReadOnlyError('isIrrelevant'); }
    /**** doNow ****/
    doNow() {
        DesignerState.Applet.shiftPagesTo(this._Pages, this._newIndices);
        selectPages(this._Pages);
    }
    /**** extend ****/
    extend(otherOperation) {
        this.doNow();
        otherOperation._newIndices = this._newIndices;
    }
    /**** undo ****/
    undo() {
        DesignerState.Applet.shiftPagesTo(this._Pages, this._oldIndices);
        selectPages(this._Pages);
    }
}
//----------------------------------------------------------------------------//
//                         WAD_PageDeletionOperation                          //
//----------------------------------------------------------------------------//
class WAD_PageDeletionOperation extends WAD_Operation {
    /**** constructor ****/
    constructor(Pages) {
        super();
        Object.defineProperty(this, "_Pages", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_Indices", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_Serializations", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        const { IndexList, sortedVisuals } = sortedByIndex(Pages);
        this._Indices = IndexList;
        this._Pages = sortedVisuals;
        this._Serializations = this._Pages.map((Page) => Page.Serialization);
    }
    /**** doNow ****/
    doNow() {
        const { Applet } = DesignerState;
        this._Pages.forEach((Page) => {
            Applet.destroyPage(Page);
        });
    }
    /**** undo ****/
    undo() {
        const { Applet } = DesignerState;
        const oldPages = this._Pages;
        const newPages = this._Pages = [];
        this._Serializations.forEach((Serialization, i) => {
            const newPage = Applet.PageDeserializedAt(Serialization, this._Indices[i]);
            newPages.push(newPage);
            updateObjectInOperationHistory(oldPages[i], newPage);
        });
        selectPages(newPages);
    }
}
//----------------------------------------------------------------------------//
//                     WAD_WidgetDeserializationOperation                     //
//----------------------------------------------------------------------------//
class WAD_WidgetDeserializationOperation extends WAD_Operation {
    /**** constructor ****/
    constructor(Serializations, Page, StartIndex) {
        super();
        Object.defineProperty(this, "_Page", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_Serializations", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_StartIndex", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_newWidgets", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        this._Page = Page;
        this._Serializations = Serializations.slice();
        this._StartIndex = StartIndex;
    }
    /**** doNow ****/
    doNow() {
        const oldWidgets = this._newWidgets;
        const newWidgets = this._newWidgets = [];
        this._Serializations.forEach((Serialization, i) => {
            const newWidget = this._Page.WidgetDeserializedAt(Serialization, this._StartIndex + i);
            newWidgets.push(newWidget);
            updateObjectInOperationHistory(oldWidgets[i], newWidget);
        });
        selectWidgets(newWidgets);
    }
    /**** undo ****/
    undo() {
        this._newWidgets.forEach((Widget) => {
            this._Page.destroyWidget(Widget);
        });
        selectWidgets([]);
    }
}
//----------------------------------------------------------------------------//
//                      WAD_WidgetConfigurationOperation                      //
//----------------------------------------------------------------------------//
class WAD_WidgetConfigurationOperation extends WAD_Operation {
    /**** constructor ****/
    constructor(Widgets, PropertyName, PropertyValues) {
        super();
        Object.defineProperty(this, "_Widgets", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_PropertyName", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_oldValues", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_newValues", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this._Widgets = Widgets.slice();
        this._PropertyName = PropertyName;
        this._oldValues = Widgets.map((Widget) => Widget[PropertyName]);
        this._newValues = PropertyValues.slice();
    }
    /**** canExtend ****/
    canExtend(otherOperation) {
        return ((otherOperation instanceof WAD_WidgetConfigurationOperation) &&
            ValuesAreEqual(otherOperation._Widgets, this._Widgets, 'by-reference') &&
            (otherOperation._PropertyName === this._PropertyName) &&
            ValuesAreEqual(this._oldValues, otherOperation._newValues));
    }
    /**** isIrrelevant ****/
    get isIrrelevant() {
        return ValuesAreEqual(this._oldValues, this._newValues);
    }
    set isIrrelevant(_) { throwReadOnlyError('isIrrelevant'); }
    /**** doNow ****/
    doNow() {
        this._Widgets.forEach((Widget, i) => {
            Widget[this._PropertyName] = this._newValues[i];
        });
        selectWidgets(this._Widgets);
    }
    /**** extend ****/
    extend(otherOperation) {
        this.doNow();
        otherOperation._newValues = this._newValues;
    }
    /**** undo ****/
    undo() {
        this._Widgets.forEach((Widget, i) => {
            Widget[this._PropertyName] = this._oldValues[i];
        });
        selectWidgets(this._Widgets);
    }
}
//----------------------------------------------------------------------------//
//                    WAD_WidgetScriptApplicationOperation                    //
//----------------------------------------------------------------------------//
class WAD_WidgetScriptApplicationOperation extends WAD_Operation {
    /**** constructor ****/
    constructor(Widgets) {
        super();
        Object.defineProperty(this, "_Widgets", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_oldScripts", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_newScripts", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this._Widgets = Widgets.slice();
        this._oldScripts = Widgets.map((Widget) => Widget.activeScript);
        this._newScripts = Widgets.map((Widget) => Widget.pendingScript);
    }
    /**** isIrrelevant ****/
    get isIrrelevant() {
        return ValuesAreEqual(this._newScripts, this._oldScripts);
    }
    set isIrrelevant(_) { throwReadOnlyError('isIrrelevant'); }
    /**** doNow ****/
    doNow() {
        this._Widgets.forEach((Widget) => Widget.applyPendingScript());
    }
    /**** undo ****/
    undo() {
        this._Widgets.forEach((Widget, i) => {
            const pendingScript = Widget.pendingScript;
            Widget.pendingScript = this._oldScripts[i];
            try {
                Widget.applyPendingScript();
            }
            catch (Signal) { /* nop - will se an error anyway */ }
            Widget.pendingScript = pendingScript;
        });
    }
}
//----------------------------------------------------------------------------//
//                          WAD_WidgetShapeOperation                          //
//----------------------------------------------------------------------------//
class WAD_WidgetShapeOperation extends WAD_Operation {
    /**** constructor ****/
    constructor(Widgets, Geometries) {
        super();
        Object.defineProperty(this, "_Page", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_Widgets", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_oldGeometries", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_newGeometries", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this._Page = Widgets[0].Page;
        if (Widgets.some((Widget) => Widget.Page !== this._Page))
            throwError('InvalidArgument: the given widgets do not all belong to the same page');
        this._Widgets = Widgets.slice();
        this._oldGeometries = Widgets.map((Widget) => Widget.Geometry);
        this._newGeometries = Geometries.slice();
    }
    /**** canExtend ****/
    canExtend(otherOperation) {
        return ((otherOperation instanceof WAD_WidgetShapeOperation) &&
            ValuesAreEqual(otherOperation._Widgets, this._Widgets, 'by-reference') &&
            this._oldGeometries.every((Geometry, i) => ValuesAreEqual(otherOperation._newGeometries[i], Geometry)));
    }
    /**** isIrrelevant ****/
    get isIrrelevant() {
        return this._oldGeometries.every((Geometry, i) => ValuesAreEqual(this._newGeometries[i], Geometry));
    }
    set isIrrelevant(_) { throwReadOnlyError('isIrrelevant'); }
    /**** doNow ****/
    doNow() {
        this._Widgets.forEach((Widget, i) => {
            Widget.Geometry = this._newGeometries[i];
        });
        selectWidgets(this._Widgets);
    }
    /**** extend ****/
    extend(otherOperation) {
        this.doNow();
        otherOperation._newGeometries = this._newGeometries;
    }
    /**** undo ****/
    undo() {
        this._Widgets.forEach((Widget, i) => {
            Widget.Geometry = this._oldGeometries[i];
        });
        selectWidgets(this._Widgets);
    }
}
//----------------------------------------------------------------------------//
//                          WAD_WidgetShiftOperation                          //
//----------------------------------------------------------------------------//
class WAD_WidgetShiftOperation extends WAD_Operation {
    /**** constructor ****/
    constructor(Widgets, newIndices) {
        super();
        Object.defineProperty(this, "_Page", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_Widgets", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_oldIndices", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_newIndices", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this._Page = Widgets[0].Page;
        if (Widgets.some((Widget) => Widget.Page !== this._Page))
            throwError('InvalidArgument: the given widgets do not all belong to the same page');
        this._Widgets = Widgets.slice();
        this._oldIndices = Widgets.map((Widget) => Widget.Index);
        this._newIndices = newIndices.slice();
    }
    /**** canExtend ****/
    canExtend(otherOperation) {
        return ((otherOperation instanceof WAD_WidgetShiftOperation) &&
            ValuesAreEqual(otherOperation._Widgets, this._Widgets, 'by-reference') &&
            ValuesAreEqual(otherOperation._newIndices, this._oldIndices));
    }
    /**** isIrrelevant ****/
    get isIrrelevant() {
        return ValuesAreEqual(this._oldIndices, this._newIndices);
    }
    set isIrrelevant(_) { throwReadOnlyError('isIrrelevant'); }
    /**** doNow ****/
    doNow() {
        this._Page.shiftWidgetsTo(this._Widgets, this._newIndices);
        selectWidgets(this._Widgets);
    }
    /**** extend ****/
    extend(otherOperation) {
        this.doNow();
        otherOperation._newIndices = this._newIndices;
    }
    /**** undo ****/
    undo() {
        this._Page.shiftWidgetsTo(this._Widgets, this._oldIndices);
        selectWidgets(this._Widgets);
    }
}
//----------------------------------------------------------------------------//
//                        WAD_WidgetDeletionOperation                         //
//----------------------------------------------------------------------------//
class WAD_WidgetDeletionOperation extends WAD_Operation {
    /**** constructor ****/
    constructor(Widgets) {
        super();
        Object.defineProperty(this, "_Page", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_Widgets", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_Indices", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_Serializations", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this._Page = Widgets[0].Page;
        if (Widgets.some((Widget) => Widget.Page !== this._Page))
            throwError('InvalidArgument: the given widgets do not all belong to the same page');
        const { IndexList, sortedVisuals } = sortedByIndex(Widgets);
        this._Indices = IndexList;
        this._Widgets = sortedVisuals;
        this._Serializations = this._Widgets.map((Widget) => Widget.Serialization);
    }
    /**** doNow ****/
    doNow() {
        this._Widgets.forEach((Widget) => {
            this._Page.destroyWidget(Widget);
        });
    }
    /**** undo ****/
    undo() {
        const oldWidgets = this._Widgets;
        const newWidgets = this._Widgets = [];
        this._Serializations.forEach((Serialization, i) => {
            const newWidget = this._Page.WidgetDeserializedAt(Serialization, this._Indices[i]);
            newWidgets.push(newWidget);
            updateObjectInOperationHistory(oldWidgets[i], newWidget);
        });
        selectWidgets(newWidgets);
    }
} //----------------------------------------------------------------------------//
//                                  Commands                                  //
//----------------------------------------------------------------------------//
/**** doCreateNewBehavior ****/
function doCreateNewBehavior(Category, Behavior) {
    doOperation(() => new WAD_BehaviorDeserializationOperation({
        BehaviorSet: { [Category]: [{ Name: Behavior, Script: '' }] }
    }));
}
/**** doConfigureSelectedBehavior ****/
function doConfigureSelectedBehavior(Property, Value) {
    doOperation(() => new WAD_BehaviorConfigurationOperation(DesignerState.selectedCategory, DesignerState.selectedBehavior, Property, Value));
}
/**** doApplyBehaviorScript ****/
function doApplyBehaviorScript() {
    doOperation(() => new WAD_BehaviorScriptApplicationOperation(DesignerState.selectedCategory, DesignerState.selectedBehavior));
}
/**** doDeleteSelectedBehavior ****/
function doDeleteSelectedBehavior() {
    doOperation(() => new WAD_BehaviorDeletionOperation(DesignerState.selectedCategory, DesignerState.selectedBehavior));
}
/**** doConfigureApplet ****/
function doConfigureApplet(Property, Value) {
    doOperation(() => new WAD_AppletConfigurationOperation(Property, Value));
}
/**** doApplyAppletScript ****/
function doApplyAppletScript() {
    doOperation(() => new WAD_AppletScriptApplicationOperation());
}
/**** doCreatePage ****/
function doCreatePage(Behavior) {
    const { Applet, selectedPages } = DesignerState;
    const InsertionIndex = (selectedPages.length === 0
        ? Applet.PageCount
        : Math.max(...selectedPages.map((Page) => Page.Index)) + 1);
    doOperation(() => new WAD_PageDeserializationOperation([{ Behavior: (Behavior === '' ? null : Behavior), WidgetList: [] }], InsertionIndex));
}
/**** doDuplicateSelectedPages ****/
function doDuplicateSelectedPages() {
    const selectedPages = sortedPageSelection();
    if (selectedPages.length === 0) {
        return;
    }
    const InsertionIndex = selectedPages[selectedPages.length - 1].Index + 1;
    doOperation(() => new WAD_PageDeserializationOperation(selectedPages.map((Page) => Page.Serialization), InsertionIndex));
}
/**** doConfigureVisitedPage ****/
function doConfigureVisitedPage(Property, Value) {
    const visitedPage = DesignerState.Applet.visitedPage;
    if (visitedPage == null) {
        return;
    }
    doOperation(() => new WAD_PageConfigurationOperation([visitedPage], Property, Value));
}
/**** doConfigureSelectedPages ****/
function doConfigureSelectedPages(Property, Value) {
    doOperation(() => new WAD_PageConfigurationOperation(DesignerState.selectedPages, Property, Value));
}
/**** doApplyVisitedPageScript ****/
function doApplyVisitedPageScript() {
    const visitedPage = DesignerState.Applet.visitedPage;
    if (visitedPage == null) {
        return;
    }
    doOperation(() => new WAD_PageScriptApplicationOperation([visitedPage]));
}
/**** shiftSelection - shared core of all "doShiftSelected..." commands ****/
function shiftSelection(sortedSelection, StartIndexFn, OperationClass) {
    if (sortedSelection.length === 0) {
        return;
    }
    const StartIndex = StartIndexFn(sortedSelection);
    const IndexList = Array.from({ length: sortedSelection.length }, (_, i) => StartIndex + i);
    doOperation(() => new OperationClass(sortedSelection, IndexList));
}
/**** doShiftSelectedPagesToTop ****/
function doShiftSelectedPagesToTop() {
    shiftSelection(sortedPageSelection(), () => 0, WAD_PageShiftOperation);
}
/**** doShiftSelectedPagesUp ****/
function doShiftSelectedPagesUp() {
    shiftSelection(sortedPageSelection(), (Selection) => Math.max(0, Selection[0].Index - 1), WAD_PageShiftOperation);
}
/**** doShiftSelectedPagesDown ****/
function doShiftSelectedPagesDown() {
    shiftSelection(sortedPageSelection(), (Selection) => Selection[Selection.length - 1].Index + 2 - Selection.length, WAD_PageShiftOperation);
}
/**** doShiftSelectedPagesToBottom ****/
function doShiftSelectedPagesToBottom() {
    shiftSelection(sortedPageSelection(), (Selection) => DesignerState.Applet.PageCount - Selection.length, WAD_PageShiftOperation);
}
/**** doVisitSelectedPage ****/
function doVisitSelectedPage() {
    const { selectedPages } = DesignerState;
    visitPage(selectedPages[selectedPages.length - 1]);
}
/**** doDeleteSelectedPages ****/
function doDeleteSelectedPages() {
    doOperation(() => new WAD_PageDeletionOperation(DesignerState.selectedPages));
}
/**** doCreateWidget ****/
function doCreateWidget(Behavior) {
    const visitedPage = DesignerState.Applet.visitedPage;
    if (visitedPage == null) {
        return;
    }
    const Serialization = {
        Behavior: (Behavior === '' ? null : Behavior)
    };
    const DefaultSize = (Behavior === ''
        ? undefined
        : DesignerState.Applet.DefaultSizeOfBehavior('widget', Behavior));
    if (DefaultSize != null) { // "left-width" and "top-height" are
        Serialization.Offsets = [
            10, DefaultSize.Width, 10, DefaultSize.Height
        ];
    }
    const DefaultValue = (Behavior === ''
        ? undefined
        : DesignerState.Applet.DefaultValueOfBehavior('widget', Behavior));
    if (DefaultValue != null) { // gives otherwise invisible widgets
        Serialization.memoized = Object.assign(Object.assign({}, Serialization.memoized), { Value: DefaultValue // "Value" is backed by
         }); // "memoized", not a plain property
    }
    doOperation(() => new WAD_WidgetDeserializationOperation([Serialization], visitedPage, 0));
}
/**** doDuplicateSelectedWidgets ****/
function doDuplicateSelectedWidgets() {
    const selectedWidgets = sortedWidgetSelection();
    if (selectedWidgets.length === 0) {
        return;
    }
    const visitedPage = DesignerState.Applet.visitedPage;
    if (visitedPage == null) {
        return;
    }
    doOperation(() => new WAD_WidgetDeserializationOperation(selectedWidgets.map((Widget) => Widget.Serialization), visitedPage, 0));
}
/**** doConfigureSelectedWidgets ****/
function doConfigureSelectedWidgets(Property, Value) {
    const { selectedWidgets } = DesignerState;
    let ValuesToSet;
    switch (Property) {
        case 'Anchors_0':
            Property = 'Anchors';
            ValuesToSet = selectedWidgets.map((Widget) => {
                return [Value, Widget.Anchors[1]];
            });
            break;
        case 'Anchors_1':
            Property = 'Anchors';
            ValuesToSet = selectedWidgets.map((Widget) => {
                return [Widget.Anchors[0], Value];
            });
            break;
        case 'Offsets_0':
            Property = 'Offsets';
            ValuesToSet = selectedWidgets.map((Widget) => {
                const [Offset_0, Offset_1, Offset_2, Offset_3] = Widget.Offsets;
                return [Value, Offset_1, Offset_2, Offset_3];
            });
            break;
        case 'Offsets_1':
            Property = 'Offsets';
            ValuesToSet = selectedWidgets.map((Widget) => {
                const [Offset_0, Offset_1, Offset_2, Offset_3] = Widget.Offsets;
                return [Offset_0, Value, Offset_2, Offset_3];
            });
            break;
        case 'Offsets_2':
            Property = 'Offsets';
            ValuesToSet = selectedWidgets.map((Widget) => {
                const [Offset_0, Offset_1, Offset_2, Offset_3] = Widget.Offsets;
                return [Offset_0, Offset_1, Value, Offset_3];
            });
            break;
        case 'Offsets_3':
            Property = 'Offsets';
            ValuesToSet = selectedWidgets.map((Widget) => {
                const [Offset_0, Offset_1, Offset_2, Offset_3] = Widget.Offsets;
                return [Offset_0, Offset_1, Offset_2, Value];
            });
            break;
        default:
            ValuesToSet = selectedWidgets.map((_) => Value);
    }
    doOperation(() => new WAD_WidgetConfigurationOperation(selectedWidgets, Property, ValuesToSet));
}
/**** doApplySelectedWidgetsScript ****/
function doApplySelectedWidgetsScript() {
    const { selectedWidgets } = DesignerState;
    doOperation(() => new WAD_WidgetScriptApplicationOperation(selectedWidgets));
}
/**** doChangeGeometriesBy ****/
function doChangeGeometriesBy(WidgetList, Mode, dx, dy, initialGeometries, withSnapToGrid = true) {
    let dX = 0, dY = 0, dW = 0, dH = 0;
    switch (Mode) {
        case 'nw':
            dX = dx;
            dW = -dx;
            dY = dy;
            dH = -dy;
            break;
        case 'n':
            dY = dy;
            dH = -dy;
            break;
        case 'ne':
            dW = dx;
            dY = dy;
            dH = -dy;
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
            dX = dx;
            dW = -dx;
            dH = dy;
            break;
        case 'w':
            dX = dx;
            dW = -dx;
            break;
        case 'c':
            dX = dx;
            dY = dy;
    }
    const { SnapToGrid, GridWidth, GridHeight } = DesignerState.Applet;
    const GeometryList = initialGeometries.map((Geometry) => {
        let Width = Math.max(0, Geometry.Width + dW);
        let Height = Math.max(0, Geometry.Height + dH);
        let xl = Geometry.x + dX, xr = xl + Width;
        let yt = Geometry.y + dY, yb = yt + Height;
        if (withSnapToGrid && SnapToGrid) {
            let xl_ = GridWidth * Math.round(xl / GridWidth);
            let xr_ = GridWidth * Math.round(xr / GridWidth);
            let yt_ = GridHeight * Math.round(yt / GridHeight);
            let yb_ = GridHeight * Math.round(yb / GridHeight);
            switch (Mode) {
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
                case 'c':
                    xl = xl_;
                    xr = xl + Width;
                    yt = yt_;
                    yb = yt + Height;
            }
        }
        return { x: xl, y: yt, Width: xr - xl, Height: yb - yt };
    });
    doOperation(() => new WAD_WidgetShapeOperation(WidgetList, GeometryList));
}
/**** doShiftSelectedWidgetsToTop ****/
function doShiftSelectedWidgetsToTop() {
    shiftSelection(sortedWidgetSelection(), () => 0, WAD_WidgetShiftOperation);
}
/**** doShiftSelectedWidgetsUp ****/
function doShiftSelectedWidgetsUp() {
    shiftSelection(sortedWidgetSelection(), (Selection) => Math.max(0, Selection[0].Index - 1), WAD_WidgetShiftOperation);
}
/**** doShiftSelectedWidgetsDown ****/
function doShiftSelectedWidgetsDown() {
    shiftSelection(sortedWidgetSelection(), (Selection) => Selection[Selection.length - 1].Index + 2 - Selection.length, WAD_WidgetShiftOperation);
}
/**** doShiftSelectedWidgetsToBottom ****/
function doShiftSelectedWidgetsToBottom() {
    shiftSelection(sortedWidgetSelection(), (Selection) => DesignerState.Applet.visitedPage.WidgetCount - Selection.length, WAD_WidgetShiftOperation);
}
/**** doDeleteSelectedWidgets ****/
function doDeleteSelectedWidgets() {
    const selectedWidgets = DesignerState.selectedWidgets;
    if (selectedWidgets.length === 0) {
        return;
    }
    doOperation(() => new WAD_WidgetDeletionOperation(selectedWidgets));
}
/**** doCutSelectedWidgets ****/
function doCutSelectedWidgets() {
    const selectedWidgets = sortedWidgetSelection();
    if (selectedWidgets.length === 0) {
        return;
    }
    DesignerState.shelvedWidgets = selectedWidgets.map((Widget) => Widget.Serialization);
    doDeleteSelectedWidgets();
    //  WAT_rerender()
}
/**** doCopySelectedWidgets ****/
function doCopySelectedWidgets() {
    const selectedWidgets = sortedWidgetSelection();
    if (selectedWidgets.length === 0) {
        return;
    }
    DesignerState.shelvedWidgets = selectedWidgets.map((Widget) => Widget.Serialization);
    WAT_rerender();
}
/**** doPasteShelvedWidgets ****/
function doPasteShelvedWidgets() {
    if (DesignerState.shelvedWidgets.length === 0) {
        return;
    }
    const visitedPage = DesignerState.Applet.visitedPage;
    if (visitedPage == null) {
        return;
    }
    doOperation(() => new WAD_WidgetDeserializationOperation(DesignerState.shelvedWidgets, visitedPage, 0));
}
/**** doImportFromFile ****/
function doImportFromFile(Event) {
    Event.stopPropagation();
    Event.preventDefault();
    let File = Event.target.files[0];
    if (File == null) {
        return;
    }
    let Reader = new FileReader();
    Reader.addEventListener('load', (Event) => handleFileLoaded(File, Event), false);
    Reader.readAsArrayBuffer(File);
}
function handleFileLoaded(File, Event) {
    Event.stopPropagation();
    Event.preventDefault();
    try {
        doImport((new TextDecoder()).decode(Event.target.result), File.type);
    }
    catch (Signal) {
        window.alert('File Read Error\n\n' + Signal);
    }
}
/**** doImport ****/
function doImport(FileContent, Type) {
    switch (Type) {
        case 'text/javascript':
        case 'application/javascript':
            if ((DesignerState.Applet.pendingScript == null) ||
                OperationWasConfirmed('Applet Script Import\n\n' +
                    'You are about to overwrite the script of this applet')) {
                doConfigureApplet('pendingScript', FileContent);
                DesignerState.ScriptEditor.Scope = 'Applet';
                openDialog('ScriptEditor'); // ...or bring it to front
            }
            return;
        case 'application/json':
            break;
        default:
            window.alert('JSON or JavaScript file expected');
            return;
    }
    let Serialization;
    try {
        Serialization = JSON.parse(FileContent);
    }
    catch (Signal) {
        console.error(Signal);
        window.alert('file does not contain valid JSON');
        return;
    }
    let { Applet } = DesignerState;
    let visitedPage = Applet.visitedPage;
    if (looksLikeBehaviorSet(Serialization)) {
        const BehaviorSet = Serialization.BehaviorSet;
        for (const Category in BehaviorSet) {
            (BehaviorSet[Category] || []).forEach((Registration) => {
                doOperation(() => new WAD_BehaviorDeserializationOperation({
                    BehaviorSet: { [Category]: [Registration] }
                }));
            });
        }
        return;
    }
    if (looksLikePage(Serialization)) {
        doOperation(() => new WAD_PageDeserializationOperation([Serialization], visitedPage == null ? 0 : visitedPage.Index + 1)); // also selects and visits this page
        return;
    }
    if (looksLikePageList(Serialization)) {
        doOperation(() => new WAD_PageDeserializationOperation(Serialization, visitedPage == null ? 0 : visitedPage.Index + 1)); // also selects these pages and visits the last one
        return;
    }
    if (looksLikeWidget(Serialization)) {
        if (visitedPage == null) { // create a page to insert the widget into
            doOperation(() => new WAD_PageDeserializationOperation([{ WidgetList: [] }], Applet.PageCount)); // also visits the new page
            visitedPage = Applet.visitedPage;
        }
        doOperation(() => new WAD_WidgetDeserializationOperation([Serialization], visitedPage, 0)); // also selects this widget
        return;
    }
    if (looksLikeWidgetList(Serialization)) {
        if (visitedPage == null) { // create a page to insert the widget into
            doOperation(() => new WAD_PageDeserializationOperation([{ WidgetList: [] }], Applet.PageCount)); // also visits the new page
            visitedPage = Applet.visitedPage;
        }
        doOperation(() => new WAD_WidgetDeserializationOperation(Serialization, visitedPage, 0)); // also selects these widgets
        return;
    }
    if (looksLikeApplet(Serialization)) {
        if (OperationWasConfirmed('Applet Import\n\n' +
            'You are about to replace the complete applet (and only keep its name)')) {
            DesignerState.selectedPages = [];
            selectWidgets([]);
            Object.assign(DesignerState, {
                selectedPages: [],
                selectedWidgets: [],
                OperationHistory: [],
                OperationIndex: 0,
                VisitHistory: [],
                VisitIndex: -1,
            });
            DesignerState.Applet.replaceWith(Serialization);
            setTimeout(() => {
                window.alert('Applet was imported\n\n' +
                    'The import will be persisted with the next change you make');
            }, 100);
        }
        return;
    }
    window.alert('file does not contain valid WAT serializations');
}
/**** doExport ****/
function doExport(Scope) {
    var _a, _b;
    const { Applet, selectedCategory, selectedBehavior } = DesignerState;
    let Serialization, suggestedFileName;
    switch (Scope) {
        case 'selected Behavior':
            Serialization = Applet.SerializationOfBehavior(selectedCategory, selectedBehavior);
            suggestedFileName = selectedBehavior + '.json';
            break;
        case 'Applet':
            Serialization = Applet.Serialization;
            suggestedFileName = (Applet.Name || 'WAT-Applet') + '.json';
            break;
        case 'active Page':
            if (Applet.visitedPage == null) {
                window.alert('no page is currently visited');
                return;
            }
            Serialization = Applet.visitedPage.Serialization;
            suggestedFileName = (Applet.visitedPage.Name || 'WAT-Page') + '.json';
            break;
        case 'selected Pages':
            const Pages = sortedPageSelection();
            // @ts-ignore TS2322 allow assignment
            Serialization = Pages.map((Page) => Page.Serialization);
            suggestedFileName = (((_a = Pages[0]) === null || _a === void 0 ? void 0 : _a.Name) || 'WAT-Page') + '.json';
            break;
        case 'selected Widgets':
            const Widgets = sortedWidgetSelection();
            // @ts-ignore TS2322 allow assignment
            Serialization = Widgets.map((Widget) => Widget.Serialization);
            suggestedFileName = (((_b = Widgets[0]) === null || _b === void 0 ? void 0 : _b.Name) || 'WAT-Widgets') + '.json';
            break;
        case 'Applet Design':
            Serialization = Applet.Serialization;
            delete Serialization.activeScript;
            delete Serialization.pendingScript;
            suggestedFileName = (DesignerState.Applet.Name || 'WAT-Applet') + '.json';
            break;
        case 'Applet Script':
            Serialization = Applet.activeScript || '';
            suggestedFileName = (Applet.Name || 'WAT-Applet') + '.js';
            break;
        default:
            console.error('InvalidArgument: invalid download scope ' + quoted(Scope));
            return;
    }
    const SerializationString = (Scope === 'Applet Script'
        ? Serialization
        : JSON.stringify(Serialization));
    downloadIfStable(SerializationString, suggestedFileName, (Scope === 'Applet Script'
        ? 'text/javascript;charset=utf-8'
        : 'application/json;charset=utf-8'), 'export');
}
/**** doVisitHomePage ****/
function doVisitHomePage() { visitPage(DesignerState.Applet.Page(0)); }
/**** doCreateScreenshot ****/
function doCreateScreenshot() {
    const { Applet, selectedWidgets } = DesignerState;
    const VisualToRender = ((selectedWidgets.length === 1) &&
        (selectedWidgets[0].normalizedBehavior === 'basic_controls.outline')
        ? selectedWidgets[0] : Applet);
    const { Width, Height } = VisualToRender;
    const Canvas = document.createElement('canvas');
    Canvas.width = Width;
    Canvas.height = Height;
    const Context = Canvas.getContext('2d');
    const ViewElement = VisualToRender.View;
    const { left: x, top: y } = ViewElement.getBoundingClientRect();
    DesignerState.DesignerDisabled = true;
    WAT_rerender();
    window.requestAnimationFrame(async () => {
        var _a;
        let Stream;
        try {
            Stream = await navigator.mediaDevices.getDisplayMedia({
                // @ts-ignore TS2353 allow "preferCurrentTab"
                video: true, preferCurrentTab: true
            });
            const Video = document.createElement('video');
            Video.srcObject = Stream;
            await Video.play();
            const ScaleX = Video.videoWidth / window.innerWidth;
            const ScaleY = Video.videoHeight / window.innerHeight;
            if (Context == null) {
                throwError('InternalError: could not obtain a 2d canvas context');
            }
            // @ts-ignore TS18047 "Context" is not null
            Context.drawImage(Video, x * ScaleX, y * ScaleY, Width * ScaleX, Height * ScaleY, 0, 0, Width, Height);
            Stream.getTracks().forEach((Track) => Track.stop());
            DesignerState.DesignerDisabled = false;
            WAT_rerender();
            const Name = (VisualToRender === Applet
                ? ((_a = Applet.visitedPage) === null || _a === void 0 ? void 0 : _a.Name) || Applet.Name || 'WAT-Applet'
                : VisualToRender.Name || 'WAT-Screenshot');
            Canvas.toBlob((Blob) => {
                if (Blob == null) {
                    window.alert('Screenshot Error\n\ncould not encode the image');
                    return;
                }
                download(Blob, Name + '.png', 'image/png');
            }, 'image/png');
        }
        catch (Signal) {
            Stream === null || Stream === void 0 ? void 0 : Stream.getTracks().forEach((Track) => Track.stop());
            console.error('Error while creating screenshot', Signal);
            DesignerState.DesignerDisabled = false;
            WAT_rerender();
            window.alert('Screenshot Error\n\n' + Signal);
        }
    });
}
/**** doGenerateApplet ****/
function doGenerateApplet(Variant) {
    switch (Variant) {
        case 'without Designer':
            generateStandaloneWebApp(false);
            break;
        case 'with Designer':
            generateStandaloneWebApp(true);
            break;
        case 'from selected Widget':
            generatedWebAppFromWidget(DesignerState.selectedWidgets[0]);
            break;
        default: console.error('InvalidArgument: invalid generation variant ' + quoted(Variant));
    }
}
/**** doPrintApplet ****/
function doPrintApplet() {
    const { Applet } = DesignerState;
    DesignerState.DesignerDisabled = true;
    WAT_rerender();
    window.requestAnimationFrame(async () => {
        const PrinterFrame = document.createElement('iframe');
        let cleanedUp = false;
        function cleanUpPrinter() {
            if (cleanedUp) {
                return;
            }
            ;
            cleanedUp = true;
            if (PrinterFrame.parentNode != null) {
                document.body.removeChild(PrinterFrame);
            }
            DesignerState.DesignerDisabled = false;
            WAT_rerender();
        }
        try {
            PrinterFrame.style.position = 'absolute';
            PrinterFrame.style.top = '-1000000px';
            document.body.appendChild(PrinterFrame);
            const PrinterWindow = PrinterFrame.contentWindow;
            if (PrinterWindow == null) {
                throwError('InternalError: printer frame has no content window');
            }
            const PrinterDoc = PrinterWindow.document;
            PrinterDoc.write('<html><head></head><body>');
            PrinterDoc.write(Applet.View.innerHTML);
            PrinterDoc.write('</body></html>');
            PrinterDoc.close();
            PrinterWindow.addEventListener('afterprint', cleanUpPrinter, { once: true });
            setTimeout(cleanUpPrinter, 60000); // fallback if "afterprint" never fires
            PrinterWindow.focus();
            PrinterWindow.print();
        }
        catch (Signal) {
            cleanUpPrinter();
            console.error('Error while printing', Signal);
            window.alert('Print Error\n\n' + Signal);
        }
    });
} /**** doRemoveLocalBackup ****/
async function doRemoveLocalBackup() {
    const { Applet } = DesignerState;
    if (OperationWasConfirmed('Applet Backup Removal\n\n' +
        'You are about to remove the local backup of this applet')) {
        await Applet.removeLocalBackup();
        setTimeout(() => {
            window.alert('Applet Backup was removed\n\n' +
                'Reload this page to make the removal permanent or apply any ' +
                'change to create a new backup');
        }, 100);
    }
}
/**** selectedPagesMayBeShiftedUp ****/
function selectedPagesMayBeShiftedUp() {
    const selectedPages = sortedPageSelection();
    return selectedPages.some((Page, i) => Page.Index > i);
}
/**** selectedPagesMayBeShiftedDown ****/
function selectedPagesMayBeShiftedDown() {
    const selectedPages = sortedPageSelection();
    const StartIndex = DesignerState.Applet.PageCount - selectedPages.length;
    return selectedPages.some((Page, i) => Page.Index < StartIndex + i);
}
/**** selectedWidgetsMayBeShiftedUp ****/
function selectedWidgetsMayBeShiftedUp() {
    const selectedWidgets = sortedWidgetSelection();
    return selectedWidgets.some((Widget, i) => Widget.Index > i);
}
/**** selectedWidgetsMayBeShiftedDown ****/
function selectedWidgetsMayBeShiftedDown() {
    const visitedPage = DesignerState.Applet.visitedPage;
    if (visitedPage == null) {
        return false;
    }
    const selectedWidgets = sortedWidgetSelection();
    const StartIndex = visitedPage.WidgetCount - selectedWidgets.length;
    return selectedWidgets.some((Widget, i) => Widget.Index < StartIndex + i);
}
//------------------------------------------------------------------------------
//--                              MCP Connector                               --
//------------------------------------------------------------------------------
// WebSocket client for the "WAT-AI-Broker" - it lets an (MCP-capable) AI
// assistant inspect and modify the applet under design. All modifications are
// performed as WAD operations and may therefore be undone just like manual
// ones (n.b.: a "widget_transfer" consists of TWO operations)
const WAD_AsyncFunction = Object.getPrototypeOf(async function () { }).constructor;
class WAD_MCPConnector {
    /**** constructor ****/
    constructor() {
        var _a, _b;
        Object.defineProperty(this, "_URL", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_Token", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_keepToken", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_Socket", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: undefined
        });
        Object.defineProperty(this, "_ReconnectionTimer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: undefined
        });
        Object.defineProperty(this, "_VisitWatcher", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: undefined
        });
        Object.defineProperty(this, "_visitedPageName", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: undefined
        });
        Object.defineProperty(this, "_lastError", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: undefined
        });
        Object.defineProperty(this, "_isConfirmed", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        }); // 'welcome' received
        /**** _handle - routes an incoming request to its handler ****/
        Object.defineProperty(this, "_HandlerForMethod", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {
                applet_info: this._AppletInfo,
                applet_get: this._AppletGet,
                applet_patch: this._AppletPatch,
                applet_save: this._AppletSave,
                applet_export: this._AppletExport,
                applet_import: this._AppletImport,
                list_pages: this._listPages,
                list_widgets: this._listWidgets,
                find: this._find,
                page_visit: this._PageVisit,
                page_get: this._PageGet,
                page_patch: this._PagePatch,
                page_add: this._PageAdd,
                page_duplicate: this._PageDuplicate,
                page_delete: this._PageDelete,
                page_reorder: this._PageReorder,
                widget_get: this._WidgetGet,
                widget_patch: this._WidgetPatch,
                widget_add: this._WidgetAdd,
                widget_duplicate: this._WidgetDuplicate,
                widget_delete: this._WidgetDelete,
                widget_reorder: this._WidgetReorder,
                widget_transfer: this._WidgetTransfer,
                widget_get_rect: this._WidgetGetRect,
                widget_set_rect: this._WidgetSetRect,
                list_behaviors: this._listBehaviors,
                behavior_get: this._BehaviorGet,
                behavior_set: this._BehaviorSet,
                behavior_rename: this._BehaviorRename,
                behavior_delete: this._BehaviorDelete,
                behavior_usage: this._BehaviorUsage,
                script_get: this._ScriptGet,
                script_set: this._ScriptSet,
                error_report: this._ErrorReport,
                configure: this._configure,
                value_get: this._ValueGet,
                value_set: this._ValueSet,
                live_eval: this._LiveEval,
                overlay_open: this._OverlayOpen,
                overlay_close: this._OverlayClose,
                dialog_open: this._DialogOpen,
                dialog_close: this._DialogClose,
                live_screenshot: this._LiveScreenshot,
            }
        });
        let URL = '', Token = '', keepToken = false;
        try {
            URL = (_a = localStorage.getItem('wat-mcp-url')) !== null && _a !== void 0 ? _a : '';
            Token = (_b = localStorage.getItem('wat-mcp-token')) !== null && _b !== void 0 ? _b : '';
            keepToken = (localStorage.getItem('wat-mcp-token') != null);
        }
        catch (Signal) { /* nop - no persistence available */ }
        this._URL = URL;
        this._Token = Token;
        this._keepToken = keepToken;
    }
    /**** URL, Token, TokenIsKept, isConnected, isConnecting, lastError ****/
    get URL() { return this._URL; }
    get Token() { return this._Token; }
    get TokenIsKept() { return this._keepToken; }
    get isConnected() {
        return this._isConfirmed; // true only once the broker sent 'welcome' -
    } // being merely OPEN doesn't mean the broker accepted us
    get isConnecting() {
        return (((this._Socket != null) && !this._isConfirmed) || // socket opening or
            (this._ReconnectionTimer != null) // waiting for a retry
        );
    }
    get lastError() { return this._lastError; }
    /**** configure - applies and persists new settings, then reconnects ****/
    configure(URL, Token, TokenShallBeKept) {
        this._URL = URL;
        this._Token = Token;
        this._keepToken = TokenShallBeKept;
        try {
            localStorage.setItem('wat-mcp-url', URL);
            if (TokenShallBeKept) {
                localStorage.setItem('wat-mcp-token', Token);
            }
            else {
                localStorage.removeItem('wat-mcp-token');
            }
        }
        catch (Signal) { /* nop - no persistence available */ }
        this.disconnect();
        if (URL !== '') {
            this.connect();
        }
    }
    /**** connect - opens the WebSocket connection if a URL is configured ****/
    connect() {
        if (this._URL === '') {
            return;
        }
        if (this._Socket != null) {
            return;
        }
        this._openSocket();
    }
    /**** disconnect - closes the connection and stops auto-reconnection ****/
    disconnect() {
        if (this._ReconnectionTimer != null) {
            clearTimeout(this._ReconnectionTimer);
            this._ReconnectionTimer = undefined;
        }
        this._stopVisitWatcher();
        if (this._Socket != null) {
            this._Socket.onclose = null;
            this._Socket.close();
            this._Socket = undefined;
        }
        this._lastError = undefined;
        this._isConfirmed = false;
        WAT_rerender();
    }
    /**** _openSocket - establishes the WebSocket and wires all handlers ****/
    _openSocket() {
        const Socket = new WebSocket(this._URL);
        Socket.onopen = () => {
            var _a, _b, _c, _d, _e;
            const Applet = DesignerState.Applet;
            Socket.send(JSON.stringify({
                type: 'hello',
                accessToken: this._Token,
                appletName: (_a = Applet === null || Applet === void 0 ? void 0 : Applet.Name) !== null && _a !== void 0 ? _a : '',
                currentPage: (_c = (_b = Applet === null || Applet === void 0 ? void 0 : Applet.visitedPage) === null || _b === void 0 ? void 0 : _b.Name) !== null && _c !== void 0 ? _c : null,
            }));
            this._visitedPageName = (_e = (_d = Applet === null || Applet === void 0 ? void 0 : Applet.visitedPage) === null || _d === void 0 ? void 0 : _d.Name) !== null && _e !== void 0 ? _e : undefined;
            this._startVisitWatcher();
            WAT_rerender(); // updates an open "SettingsDialog"
        };
        Socket.onmessage = async ({ data }) => {
            var _a, _b, _c;
            let Request;
            try {
                Request = JSON.parse(data);
            }
            catch (Signal) {
                return;
            }
            if (Request.type === 'welcome') { // handshake accepted:
                this._isConfirmed = true; // only now are we really
                this._lastError = undefined; // connected - clear any
                WAT_rerender(); // earlier error
                return;
            }
            if (Request.type === 'error') { // handshake rejected by
                this._lastError = (_a = Request.reason) !== null && _a !== void 0 ? _a : 'unknown error'; // the broker -
                WAT_rerender(); // report why
                return;
            }
            let result = null;
            let error = null;
            try {
                result = await this._handle(Request.method, (_b = Request.params) !== null && _b !== void 0 ? _b : {});
            }
            catch (Signal) {
                error = String((_c = Signal === null || Signal === void 0 ? void 0 : Signal.message) !== null && _c !== void 0 ? _c : Signal);
            }
            Socket.send(JSON.stringify({ id: Request.id, result, error }));
        };
        Socket.onclose = () => {
            this._Socket = undefined;
            this._isConfirmed = false;
            this._stopVisitWatcher();
            this._ReconnectionTimer = setTimeout(() => {
                this._ReconnectionTimer = undefined;
                this._openSocket();
            }, 3000);
            WAT_rerender();
        };
        Socket.onerror = () => { Socket.close(); };
        this._Socket = Socket;
    }
    /**** _start/_stopVisitWatcher - reports page visits to the broker ****/
    _startVisitWatcher() {
        if (this._VisitWatcher != null) {
            return;
        }
        this._VisitWatcher = setInterval(() => {
            var _a, _b, _c;
            if (!this.isConnected) {
                return;
            }
            const PageName = (_c = (_b = (_a = DesignerState.Applet) === null || _a === void 0 ? void 0 : _a.visitedPage) === null || _b === void 0 ? void 0 : _b.Name) !== null && _c !== void 0 ? _c : undefined;
            if (PageName !== this._visitedPageName) {
                this._visitedPageName = PageName;
                this._Socket.send(JSON.stringify({
                    type: 'notify', event: 'page_visited', page: PageName !== null && PageName !== void 0 ? PageName : null
                }));
            }
        }, 500);
    }
    _stopVisitWatcher() {
        if (this._VisitWatcher != null) {
            clearInterval(this._VisitWatcher);
            this._VisitWatcher = undefined;
        }
    }
    /**** _Applet - the applet under design (or an error when there is none) ****/
    get _Applet() {
        const Applet = DesignerState.Applet;
        if (Applet == null) {
            throwError('NoApplet: no applet under design');
        }
        return Applet;
    }
    /**** _PageFor - resolves a page given by name or 0-based index ****/
    _PageFor(PageSpec) {
        const Applet = this._Applet;
        let Page = undefined;
        switch (true) {
            case ValueIsOrdinal(PageSpec):
                Page = Applet.PageAt(PageSpec);
                break;
            case ValueIsTextline(PageSpec):
                Page = Applet.PageNamed(PageSpec);
                break;
            default: throwError('InvalidArgument: invalid page specification');
        }
        if (Page == null)
            throwError(`NotFound: no such page: ${quoted(String(PageSpec))}`);
        return Page;
    }
    /**** _WidgetFor - resolves a widget given by name or 0-based index ****/
    _WidgetFor(Page, WidgetSpec) {
        let Widget = undefined;
        switch (true) {
            case ValueIsOrdinal(WidgetSpec):
                Widget = Page.WidgetAt(WidgetSpec);
                break;
            case ValueIsTextline(WidgetSpec):
                Widget = Page.WidgetNamed(WidgetSpec);
                break;
            default: throwError('InvalidArgument: invalid widget specification');
        }
        if (Widget == null)
            throwError(`NotFound: no such widget: ${quoted(String(WidgetSpec))}`);
        return Widget;
    }
    /**** _VisualFor - resolves "applet" | "<page>" | "<page>/<widget>" ****/
    _VisualFor(Target) {
        if (!ValueIsTextline(Target))
            throwError('InvalidArgument: invalid target specification');
        if (Target === 'applet') {
            return this._Applet;
        }
        if (Target.includes('/')) {
            const Widget = this._Applet.WidgetAtPath(Target);
            if (Widget == null)
                throwError(`NotFound: no such widget: ${quoted(Target)}`);
            return Widget;
        }
        return this._PageFor(Target);
    }
    /**** _BehaviorRegistration - fails for unknown behaviours ****/
    _BehaviorRegistration(Category, Behavior) {
        var _a;
        allowOneOf('behavior category', Category, ['applet', 'page', 'widget']);
        const Registration = (_a = this._Applet
            ._BehaviorPool[Category]) === null || _a === void 0 ? void 0 : _a[String(Behavior).toLowerCase()];
        if (Registration == null)
            throwError(`NotFound: no such ${Category} behavior: ${quoted(String(Behavior))}`);
        return Registration;
    }
    /**** _perform - like "doOperation", but reports failures to the caller ****/
    _perform(OperationFactory) {
        performOperation(OperationFactory); // shared core, but no try/catch:
    } // any failure is reported to the calling broker
    /**** _configureVisual - configuration op matching the kind of visual ****/
    _configureVisual(Visual, Key, Value) {
        switch (true) {
            case ValueIsApplet(Visual):
                this._perform(() => new WAD_AppletConfigurationOperation(Key, Value));
                break;
            case ValueIsPage(Visual):
                this._perform(() => new WAD_PageConfigurationOperation([Visual], Key, Value));
                break;
            default:
                this._perform(() => new WAD_WidgetConfigurationOperation([Visual], Key, [Value]));
        }
    }
    /**** _serializable - protects the JSON-based broker protocol ****/
    _serializable(Value) {
        if (Value === undefined) {
            return null;
        }
        try {
            return JSON.parse(JSON.stringify(Value));
        }
        catch (Signal) {
            return String(Value);
        }
    }
    async _handle(Method, Params) {
        const Handlers = this._HandlerForMethod;
        if (!Object.prototype.hasOwnProperty.call(Handlers, Method))
            throwError(`InvalidArgument: unknown method ${quoted(Method)}`);
        return Handlers[Method].call(this, Params);
    }
    /**** applet handlers ****/
    _AppletInfo() {
        var _a, _b, _c;
        const Applet = this._Applet;
        return {
            name: (_a = Applet.Name) !== null && _a !== void 0 ? _a : null,
            geometry: Applet.Geometry,
            page_count: Applet.PageCount,
            pages: Applet.PageList.map((Page, i) => {
                var _a;
                return ({
                    index: i, name: (_a = Page.Name) !== null && _a !== void 0 ? _a : null
                });
            }),
            visited_page: (_c = (_b = Applet.visitedPage) === null || _b === void 0 ? void 0 : _b.Name) !== null && _c !== void 0 ? _c : null,
        };
    }
    _AppletGet() {
        var _a, _b, _c, _d, _e;
        const Applet = this._Applet;
        return {
            Name: (_a = Applet.Name) !== null && _a !== void 0 ? _a : null,
            minWidth: Applet.minWidth,
            maxWidth: (_b = Applet.maxWidth) !== null && _b !== void 0 ? _b : null,
            minHeight: Applet.minHeight,
            maxHeight: (_c = Applet.maxHeight) !== null && _c !== void 0 ? _c : null,
            toBeCentered: Applet.toBeCentered,
            withMobileFrame: Applet.withMobileFrame,
            expectedOrientation: (_d = Applet.expectedOrientation) !== null && _d !== void 0 ? _d : null,
            SnapToGrid: Applet.SnapToGrid,
            GridWidth: Applet.GridWidth,
            GridHeight: Applet.GridHeight,
            HeadExtensions: (_e = Applet.HeadExtensions) !== null && _e !== void 0 ? _e : '',
        };
    }
    _AppletPatch(Params) {
        var _a;
        const Props = (_a = Params.props) !== null && _a !== void 0 ? _a : {};
        for (const Key of [
            'Name', 'minWidth', 'maxWidth', 'minHeight', 'maxHeight',
            'toBeCentered', 'withMobileFrame', 'expectedOrientation',
            'SnapToGrid', 'GridWidth', 'GridHeight', 'HeadExtensions',
        ]) {
            if (Key in Props) {
                this._perform(() => new WAD_AppletConfigurationOperation(Key, Props[Key]));
            }
        }
        return null;
    }
    async _AppletSave() {
        await this._Applet.preserve();
        return null;
    }
    _AppletExport() {
        return JSON.stringify(this._Applet.Serialization, null, 2);
    }
    _AppletImport(Params) {
        const Serialization = JSON.parse(Params.serialization); // may fail
        this._Applet.replaceWith(Serialization);
        DesignerState.OperationHistory.length = 0; // the old applet is gone, the
        DesignerState.OperationIndex = 0; // histories and selections
        DesignerState.VisitHistory.length = 0; // no longer any apply
        DesignerState.VisitIndex = -1;
        DesignerState.selectedPages = [];
        DesignerState.selectedWidgets = [];
        this._Applet.preserve();
        WAT_rerender();
        return null;
    }
    /**** navigation and search handlers ****/
    _listPages() {
        return this._Applet.PageList.map((Page, i) => {
            var _a, _b, _c;
            return ({
                index: i,
                name: (_a = Page.Name) !== null && _a !== void 0 ? _a : null,
                behavior: (_b = Page.Behavior) !== null && _b !== void 0 ? _b : null,
                widget_count: Page.WidgetCount,
                has_script: (((_c = Page.Script) !== null && _c !== void 0 ? _c : '').trim() !== ''),
            });
        });
    }
    _listWidgets(Params) {
        const Page = this._PageFor(Params.page);
        return Page.WidgetList.map((Widget, i) => {
            var _a, _b;
            return ({
                index: i,
                name: (_a = Widget.Name) !== null && _a !== void 0 ? _a : null,
                behavior: (_b = Widget.Behavior) !== null && _b !== void 0 ? _b : null,
                visible: (Widget.Visibility == true),
                geometry: Widget.Geometry,
            });
        });
    }
    _find(Params) {
        var _a, _b;
        const Query = (_a = Params.query) !== null && _a !== void 0 ? _a : {};
        const Scope = (_b = Query.scope) !== null && _b !== void 0 ? _b : 'all';
        const NameMatcher = (Query.namePattern ? new RegExp(Query.namePattern, 'i') : undefined);
        const BehaviorMatcher = (Query.behaviorPattern ? new RegExp(Query.behaviorPattern, 'i') : undefined);
        const ValueContent = Query.valueContains;
        const ScriptContent = Query.scriptContains;
        const matchesVisual = (Visual) => {
            var _a, _b, _c, _d;
            if ((NameMatcher != null) && !NameMatcher.test((_a = Visual.Name) !== null && _a !== void 0 ? _a : '')) {
                return false;
            }
            if ((BehaviorMatcher != null) && !BehaviorMatcher.test((_b = Visual.Behavior) !== null && _b !== void 0 ? _b : '')) {
                return false;
            }
            if ((ScriptContent != null) && !((_c = Visual.Script) !== null && _c !== void 0 ? _c : '').includes(ScriptContent)) {
                return false;
            }
            if (ValueContent != null) {
                const Value = Visual.Value;
                const ValueAsString = (typeof Value === 'string' ? Value : (_d = JSON.stringify(Value)) !== null && _d !== void 0 ? _d : '');
                if (!ValueAsString.includes(ValueContent)) {
                    return false;
                }
            }
            return true;
        };
        const Result = [];
        const PageList = this._Applet.PageList;
        if (Scope !== 'widgets') {
            PageList.forEach((Page, i) => {
                var _a, _b;
                if (matchesVisual(Page)) {
                    Result.push({
                        type: 'page', page: (_a = Page.Name) !== null && _a !== void 0 ? _a : null, index: i,
                        behavior: (_b = Page.Behavior) !== null && _b !== void 0 ? _b : null,
                    });
                }
            });
        }
        if (Scope !== 'pages') {
            PageList.forEach((Page) => {
                Page.WidgetList.forEach((Widget, i) => {
                    var _a, _b, _c;
                    if (matchesVisual(Widget)) {
                        Result.push({
                            type: 'widget', page: (_a = Page.Name) !== null && _a !== void 0 ? _a : null,
                            widget: (_b = Widget.Name) !== null && _b !== void 0 ? _b : null, index: i,
                            behavior: (_c = Widget.Behavior) !== null && _c !== void 0 ? _c : null,
                        });
                    }
                });
            });
        }
        return Result;
    }
    _PageVisit(Params) {
        visitPage(this._PageFor(Params.page)); // uses the Designer visit history
        return null;
    }
    /**** page handlers ****/
    _PageGet(Params) {
        var _a, _b, _c;
        const Page = this._PageFor(Params.page);
        const Result = {
            index: Page.Index,
            Name: (_a = Page.Name) !== null && _a !== void 0 ? _a : null,
            Behavior: (_b = Page.Behavior) !== null && _b !== void 0 ? _b : null,
        };
        ((_c = Page.configurableProperties) !== null && _c !== void 0 ? _c : []).forEach((Descriptor) => {
            Result[Descriptor.Name] = this._serializable(Page[Descriptor.Name]);
        });
        return Result;
    }
    _PagePatch(Params) {
        var _a;
        const Page = this._PageFor(Params.page);
        const Props = (_a = Params.props) !== null && _a !== void 0 ? _a : {};
        for (const Key of Object.keys(Props)) {
            this._perform(() => new WAD_PageConfigurationOperation([Page], Key, Props[Key]));
        }
        return null;
    }
    _PageAdd(Params) {
        var _a, _b, _c;
        const InsertionIndex = (_a = Params.index) !== null && _a !== void 0 ? _a : this._Applet.PageCount;
        const Serialization = (Params.serialization != null
            ? JSON.parse(Params.serialization) // may fail
            : Object.assign(Object.assign({ Behavior: null }, ((_b = Params.props) !== null && _b !== void 0 ? _b : {})), { WidgetList: [] }));
        this._perform(() => new WAD_PageDeserializationOperation([Serialization], InsertionIndex));
        const newPage = DesignerState.selectedPages[0]; // the op selects new pages
        return { index: newPage.Index, name: (_c = newPage.Name) !== null && _c !== void 0 ? _c : null };
    }
    _PageDuplicate(Params) {
        var _a, _b;
        const Page = this._PageFor(Params.page);
        const InsertionIndex = (_a = Params.index) !== null && _a !== void 0 ? _a : Page.Index + 1;
        this._perform(() => new WAD_PageDeserializationOperation([Page.Serialization], InsertionIndex));
        const newPage = DesignerState.selectedPages[0];
        return { index: newPage.Index, name: (_b = newPage.Name) !== null && _b !== void 0 ? _b : null };
    }
    _PageDelete(Params) {
        const Page = this._PageFor(Params.page);
        this._perform(() => new WAD_PageDeletionOperation([Page]));
        return null;
    }
    _PageReorder(Params) {
        const Page = this._PageFor(Params.page);
        this._perform(() => new WAD_PageShiftOperation([Page], [Params.new_index]));
        return null;
    }
    /**** widget handlers ****/
    _WidgetGet(Params) {
        var _a, _b, _c;
        const Widget = this._WidgetFor(this._PageFor(Params.page), Params.widget);
        const Result = {
            index: Widget.Index,
            Name: (_a = Widget.Name) !== null && _a !== void 0 ? _a : null,
            Behavior: (_b = Widget.Behavior) !== null && _b !== void 0 ? _b : null,
            geometry: Widget.Geometry,
            Value: this._serializable(Widget.Value),
        };
        ((_c = Widget.configurableProperties) !== null && _c !== void 0 ? _c : []).forEach((Descriptor) => {
            Result[Descriptor.Name] = this._serializable(Widget[Descriptor.Name]);
        });
        return Result;
    }
    _WidgetPatch(Params) {
        var _a;
        const Widget = this._WidgetFor(this._PageFor(Params.page), Params.widget);
        const Props = (_a = Params.props) !== null && _a !== void 0 ? _a : {};
        for (const Key of Object.keys(Props)) {
            this._perform(() => new WAD_WidgetConfigurationOperation([Widget], Key, [Props[Key]]));
        }
        return null;
    }
    _WidgetAdd(Params) {
        var _a, _b, _c, _d;
        const Page = this._PageFor(Params.page);
        const InsertionIndex = (_a = Params.index) !== null && _a !== void 0 ? _a : Page.WidgetCount;
        const Serialization = Object.assign(Object.assign({}, ((_b = Params.props) !== null && _b !== void 0 ? _b : {})), { Behavior: Params.behavior });
        if ((Params.geometry == null) && (Serialization.Offsets == null) &&
            (Params.behavior != null)) {
            const DefaultSize = DesignerState.Applet.DefaultSizeOfBehavior('widget', Params.behavior);
            if (DefaultSize != null) { // "left-width" and "top-height" are
                Serialization.Offsets = [
                    10, DefaultSize.Width, 10, DefaultSize.Height
                ];
            }
        }
        if ((((_c = Serialization.memoized) === null || _c === void 0 ? void 0 : _c.Value) == null) && (Params.behavior != null)) {
            const DefaultValue = DesignerState.Applet.DefaultValueOfBehavior('widget', Params.behavior);
            if (DefaultValue != null) { // gives otherwise invisible widgets
                Serialization.memoized = Object.assign(Object.assign({}, Serialization.memoized), { Value: DefaultValue // "Value" is backed
                 }); // by "memoized", not a flat prop
            }
        }
        this._perform(() => new WAD_WidgetDeserializationOperation([Serialization], Page, InsertionIndex));
        const newWidget = DesignerState.selectedWidgets[0]; // the op selects new widgets
        if (Params.geometry != null) {
            const { x, y, width, height } = Params.geometry;
            this._perform(() => new WAD_WidgetShapeOperation([newWidget], [{ x, y, Width: width, Height: height }]));
        }
        return { index: newWidget.Index, name: (_d = newWidget.Name) !== null && _d !== void 0 ? _d : null };
    }
    _WidgetDuplicate(Params) {
        var _a, _b;
        const Page = this._PageFor(Params.page);
        const Widget = this._WidgetFor(Page, Params.widget);
        const InsertionIndex = (_a = Params.index) !== null && _a !== void 0 ? _a : Widget.Index + 1;
        this._perform(() => new WAD_WidgetDeserializationOperation([Widget.Serialization], Page, InsertionIndex));
        const newWidget = DesignerState.selectedWidgets[0];
        return { index: newWidget.Index, name: (_b = newWidget.Name) !== null && _b !== void 0 ? _b : null };
    }
    _WidgetDelete(Params) {
        const Widget = this._WidgetFor(this._PageFor(Params.page), Params.widget);
        this._perform(() => new WAD_WidgetDeletionOperation([Widget]));
        return null;
    }
    _WidgetReorder(Params) {
        const Widget = this._WidgetFor(this._PageFor(Params.page), Params.widget);
        this._perform(() => new WAD_WidgetShiftOperation([Widget], [Params.new_index]));
        return null;
    }
    _WidgetTransfer(Params) {
        var _a;
        const srcPage = this._PageFor(Params.src_page);
        const Widget = this._WidgetFor(srcPage, Params.widget);
        const dstPage = this._PageFor(Params.dst_page);
        const Serialization = Widget.Serialization;
        this._perform(() => new WAD_WidgetDeletionOperation([Widget]));
        this._perform(() => new WAD_WidgetDeserializationOperation([Serialization], dstPage, dstPage.WidgetCount)); // n.b.: undoing a transfer takes TWO undo steps
        const newWidget = DesignerState.selectedWidgets[0];
        return { index: newWidget.Index, name: (_a = newWidget.Name) !== null && _a !== void 0 ? _a : null };
    }
    /**** geometry handlers ****/
    _WidgetGetRect(Params) {
        const Widget = this._WidgetFor(this._PageFor(Params.page), Params.widget);
        const { x, y, Width, Height } = Widget.Geometry;
        return { x, y, width: Width, height: Height, anchors: Widget.Anchors };
    }
    _WidgetSetRect(Params) {
        const Widget = this._WidgetFor(this._PageFor(Params.page), Params.widget);
        if (Params.anchors != null) { // anchors first - the geometry is then
            this._perform(() => new WAD_WidgetConfigurationOperation([Widget], 'Anchors', [Params.anchors.slice()] // set relative to them
            ));
        }
        const { x, y, width, height } = Params.rect;
        this._perform(() => new WAD_WidgetShapeOperation([Widget], [{ x, y, Width: width, Height: height }]));
        return null;
    }
    /**** behaviour handlers ****/
    _listBehaviors(Params) {
        const Applet = this._Applet;
        const Categories = (Params.category == null
            ? ['applet', 'page', 'widget']
            : [Params.category]);
        const Result = [];
        Categories.forEach((Category) => {
            const brokenBehaviors = Applet.brokenBehaviorsOfCategory(Category)
                .map((Behavior) => Behavior.toLowerCase());
            const unusedBehaviors = Applet.unusedBehaviorsOfCategory(Category)
                .map((Behavior) => Behavior.toLowerCase());
            Applet.BehaviorsOfCategory(Category).forEach((normalizedName) => {
                const Registration = Applet._BehaviorPool[Category][normalizedName];
                Result.push({
                    category: Category,
                    name: Registration.Name,
                    origin: (BehaviorIsIntrinsic(normalizedName) ? 'intrinsic' : 'extrinsic'),
                    missing: false,
                    broken: brokenBehaviors.includes(normalizedName),
                    unused: unusedBehaviors.includes(normalizedName),
                });
            });
            Applet.missingBehaviorsOfCategory(Category).forEach((Behavior) => {
                Result.push({
                    category: Category,
                    name: Behavior,
                    origin: 'extrinsic',
                    missing: true, broken: false, unused: false,
                });
            });
        });
        return Result;
    }
    _BehaviorGet(Params) {
        var _a;
        const Registration = this._BehaviorRegistration(Params.category, Params.name);
        return (_a = Registration.activeScript) !== null && _a !== void 0 ? _a : '';
    }
    _BehaviorSet(Params) {
        var _a, _b, _c;
        const { category, name, script } = Params;
        allowOneOf('behavior category', category, ['applet', 'page', 'widget']);
        const Applet = this._Applet;
        const normalizedName = String(name).toLowerCase();
        const Registration = (_a = Applet._BehaviorPool[category]) === null || _a === void 0 ? void 0 : _a[normalizedName];
        if (Registration == null) { // register a new behaviour
            this._perform(() => new WAD_BehaviorDeserializationOperation({ BehaviorSet: { [category]: [{ Name: name, Script: script }] } }));
        }
        else { // rescript a known behaviour
            Applet.prescriptBehaviorOfCategory(category, name, script);
            this._perform(() => new WAD_BehaviorScriptApplicationOperation(category, name));
        }
        const ScriptError = (_c = (_b = Applet
            ._BehaviorPool[category]) === null || _b === void 0 ? void 0 : _b[normalizedName]) === null || _c === void 0 ? void 0 : _c.Error;
        return (ScriptError == null ? null : String(ScriptError));
    }
    _BehaviorRename(Params) {
        const { category, name, new_name } = Params;
        this._BehaviorRegistration(category, name); // fails if the name is unknown
        this._perform(() => new WAD_BehaviorConfigurationOperation(category, name, 'Name', new_name));
        return null;
    }
    _BehaviorDelete(Params) {
        const { category, name } = Params;
        this._BehaviorRegistration(category, name); // fails if the name is unknown
        this._perform(() => new WAD_BehaviorDeletionOperation(category, name));
        return null;
    }
    _BehaviorUsage(Params) {
        const { category, name } = Params;
        allowOneOf('behavior category', category, ['applet', 'page', 'widget']);
        const Applet = this._Applet;
        const normalizedName = String(name).toLowerCase();
        const Result = [];
        switch (category) {
            case 'applet':
                if (Applet.normalizedBehavior === normalizedName) {
                    Result.push({ target: 'applet' });
                }
                break;
            case 'page':
                Applet.PageList.forEach((Page, i) => {
                    var _a, _b;
                    if (Page.normalizedBehavior === normalizedName) {
                        Result.push({ target: (_a = Page.Name) !== null && _a !== void 0 ? _a : String(i), page: (_b = Page.Name) !== null && _b !== void 0 ? _b : null, index: i });
                    }
                });
                break;
            case 'widget':
                Applet.PageList.forEach((Page) => {
                    Page.WidgetList.forEach((Widget, i) => {
                        var _a, _b;
                        if (Widget.normalizedBehavior === normalizedName) {
                            Result.push({
                                target: `${Page.Name}/${Widget.Name}`,
                                page: (_a = Page.Name) !== null && _a !== void 0 ? _a : null, widget: (_b = Widget.Name) !== null && _b !== void 0 ? _b : null, index: i,
                            });
                        }
                    });
                });
        }
        return Result;
    }
    /**** script and configuration handlers ****/
    _ScriptGet(Params) {
        var _a, _b;
        const Visual = this._VisualFor(Params.target);
        return {
            active: (_a = Visual.activeScript) !== null && _a !== void 0 ? _a : '',
            pending: (_b = Visual.pendingScript) !== null && _b !== void 0 ? _b : null,
        };
    }
    _ScriptSet(Params) {
        const Visual = this._VisualFor(Params.target);
        Visual.pendingScript = Params.script;
        switch (true) {
            case ValueIsApplet(Visual):
                this._perform(() => new WAD_AppletScriptApplicationOperation());
                break;
            case ValueIsPage(Visual):
                this._perform(() => new WAD_PageScriptApplicationOperation([Visual]));
                break;
            default:
                this._perform(() => new WAD_WidgetScriptApplicationOperation([Visual]));
        }
        const ScriptError = Visual.ScriptError;
        return (ScriptError == null ? null : this._serializable(ScriptError));
    }
    _ErrorReport(Params) {
        var _a;
        const Visual = this._VisualFor(Params.target);
        return {
            is_broken: (Visual.isBroken == true),
            error_report: this._serializable((_a = Visual.ErrorReport) !== null && _a !== void 0 ? _a : null),
        };
    }
    _configure(Params) {
        var _a;
        const Visual = this._VisualFor(Params.target);
        const Properties = (_a = Params.properties) !== null && _a !== void 0 ? _a : {};
        for (const Key of Object.keys(Properties)) {
            this._configureVisual(Visual, Key, Properties[Key]);
        }
        return null;
    }
    _ValueGet(Params) {
        return this._serializable(this._VisualFor(Params.target).Value);
    }
    _ValueSet(Params) {
        this._configureVisual(this._VisualFor(Params.target), 'Value', Params.value);
        return null;
    }
    /**** live interaction handlers ****/
    async _LiveEval(Params) {
        var _a;
        const Expression = String((_a = Params.expression) !== null && _a !== void 0 ? _a : '');
        const Applet = this._Applet;
        let Evaluator;
        try { // single expressions come first,
            Evaluator = new WAD_AsyncFunction('Applet', 'me', 'my', `"use strict"; return (${Expression})`);
        }
        catch (Signal) { // then multi-statement scripts
            Evaluator = new WAD_AsyncFunction('Applet', 'me', 'my', Expression);
        }
        return this._serializable(await Evaluator(Applet, Applet, Applet));
    }
    _OverlayOpen(Params) {
        const Visual = this._VisualFor(Params.target);
        if (ValueIsPage(Visual))
            throwError('InvalidArgument: overlays may only be opened on the applet or on widgets');
        const Descriptor = { Name: Params.name };
        if (Params.geometry != null) {
            const { x, y, width, height } = Params.geometry;
            Object.assign(Descriptor, { x, y, Width: width, Height: height });
        }
        ;
        Visual.openOverlay(Descriptor);
        return null;
    }
    _OverlayClose(Params) {
        const Visual = this._VisualFor(Params.target);
        if (Params.name == null) {
            ;
            Visual.closeAllOverlays();
        }
        else {
            ;
            Visual.closeOverlay(Params.name);
        }
        return null;
    }
    _DialogOpen(Params) {
        this._Applet.openDialog({ Name: Params.name });
        return null;
    }
    _DialogClose(Params) {
        this._Applet.closeDialog(Params.name);
        return null;
    }
    async _LiveScreenshot() {
        const html2canvas = globalThis.html2canvas;
        if (html2canvas == null)
            throwError(`NotSupported: "html2canvas" not found - please add ` +
                `${'<'}script src="https://html2canvas.hertzen.com/dist/html2canvas.min.js">` +
                `${'<'}/script> to this page`);
        const AppletView = this._Applet.View;
        if (AppletView == null)
            throwError('InternalError: the applet is currently not rendered');
        const Snapshot = await html2canvas(AppletView, { useCORS: true });
        return Snapshot.toDataURL('image/png');
    }
}
/**** the one and only MCP connector instance of this designer ****/
const MCPConnector = new WAD_MCPConnector();
//----------------------------------------------------------------------------//
//                               Applet Resizer                               //
//----------------------------------------------------------------------------//
Object.assign(DesignerState, {
    AppletResizer: {
        Width: undefined, Height: undefined,
        minWidth: undefined, minHeight: undefined,
        maxWidth: undefined, maxHeight: undefined,
        keepGeometries: true,
        PaddingX: undefined, PaddingY: undefined,
    },
});
/**** resizeApplet ****/
function resizeApplet() {
    const Applet = DesignerState.Applet;
    let { Width, Height, minWidth, minHeight, maxWidth, maxHeight, keepGeometries } = DesignerState.AppletResizer; // null = "use current setting", 0 = default
    if ((Width == null) || isNaN(Width) || (Width === 0)) {
        Width = Applet.Width;
    }
    if ((Height == null) || isNaN(Height) || (Height === 0)) {
        Height = Applet.Height;
    }
    if ((minWidth == null) || isNaN(minWidth)) {
        minWidth = Applet.minWidth;
    }
    if ((minHeight == null) || isNaN(minHeight)) {
        minHeight = Applet.minHeight;
    }
    if ((maxWidth == null) || isNaN(maxWidth)) {
        maxWidth = Applet.maxWidth;
    }
    if ((maxHeight == null) || isNaN(maxHeight)) {
        maxHeight = Applet.maxHeight;
    }
    if (maxWidth === 0) {
        maxWidth = undefined;
    }
    if (maxHeight === 0) {
        maxHeight = undefined;
    }
    Width = Math.max(minWidth !== null && minWidth !== void 0 ? minWidth : 0, Math.min(Width, maxWidth == null ? Infinity : maxWidth));
    Height = Math.max(minHeight !== null && minHeight !== void 0 ? minHeight : 0, Math.min(Height, maxHeight == null ? Infinity : maxHeight));
    resizeAppletTo(Applet, Width, Height, minWidth, minHeight, maxWidth, maxHeight, keepGeometries);
}
/**** shrinkApplet ****/
function shrinkApplet() {
    const Applet = DesignerState.Applet;
    let minX = Infinity, maxX = 0;
    let minY = Infinity, maxY = 0;
    Applet.PageList.forEach((Page) => {
        Page.WidgetList.forEach((Widget) => {
            const { x, y, Width, Height } = Widget.Geometry;
            minX = Math.min(minX, x);
            minY = Math.min(minY, y);
            maxX = Math.max(maxX, x + Width);
            maxY = Math.max(maxY, y + Height);
        });
    });
    if (minX === Infinity) {
        return;
    } // no widgets yet
    let { PaddingX, PaddingY } = DesignerState.AppletResizer;
    if ((PaddingX == null) || (PaddingX < 0)) {
        PaddingX = minX;
    }
    if ((PaddingY == null) || (PaddingY < 0)) {
        PaddingY = minY;
    }
    maxX += PaddingX;
    maxY += PaddingY;
    resizeAppletTo(Applet, maxX, maxY, maxX, maxY, undefined, undefined, true);
}
/**** resizeAppletTo ****/
function resizeAppletTo(Applet, Width, Height, minWidth, minHeight, maxWidth, maxHeight, keepGeometries) {
    if (keepGeometries) {
        const WidgetGeometrySet = {};
        Applet.PageList.forEach((Page) => {
            Page.WidgetList.forEach((Widget) => {
                WidgetGeometrySet[IdOfWidget(Widget)] = Widget.Geometry;
            });
        });
        _resizeApplet();
        Applet.PageList.forEach((Page) => {
            Page.WidgetList.forEach((Widget) => {
                Widget.Geometry = WidgetGeometrySet[IdOfWidget(Widget)];
            });
        });
    }
    else {
        _resizeApplet();
    }
    Applet.preserve();
    function _resizeApplet() {
        var _a, _b;
        Applet._Width = Width;
        Applet._Height = Height;
        Applet._minWidth = minWidth;
        Applet._minHeight = minHeight;
        Applet._maxWidth = maxWidth;
        Applet._maxHeight = maxHeight;
        if (Applet.withMobileFrame) {
            Width += 10;
            Height += 10;
            if (minWidth != null) {
                minWidth += 10;
            }
            if (minHeight != null) {
                minHeight += 10;
            }
            if (maxWidth != null) {
                maxWidth += 10;
            }
            if (maxHeight != null) {
                maxHeight += 10;
            }
        }
        const HostElement = (_b = (_a = Applet.View) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.parentElement;
        if (HostElement == null) {
            return;
        }
        HostElement.style.width = Width + 'px';
        HostElement.style.height = Height + 'px';
        HostElement.style.minWidth = (minWidth == null ? 'auto' : minWidth + 'px');
        HostElement.style.minHeight = (minHeight == null ? 'auto' : minHeight + 'px');
        HostElement.style.maxWidth = (maxWidth == null ? 'none' : maxWidth + 'px');
        HostElement.style.maxHeight = (maxHeight == null ? 'none' : maxHeight + 'px');
        if (Applet.withMobileFrame) {
            HostElement.classList.add('withMobileFrame');
        }
        else {
            HostElement.classList.remove('withMobileFrame');
        }
        WAT_rerender();
    }
} //------------------------------------------------------------------------------
//--                            WAD_DesignerLayer                             --
//------------------------------------------------------------------------------
function WAD_DesignerLayer(PropSet) {
    if (DesignerState.DesignerDisabled) {
        return;
    }
    AssetsBase = PropSet.AssetsBase;
    IconFolder = AssetsBase + 'icons/';
    /**** if need be: initialize VisitHistory ****/
    const Applet = DesignerState.Applet = PropSet.Applet;
    if (!Applet.isAttached) {
        return;
    }
    if ((Applet.visitedPage != null) &&
        (DesignerState.VisitHistory[DesignerState.VisitIndex] !== Applet.visitedPage)) {
        visitPage(Applet.visitedPage);
    }
    /**** if necessary: position DesignerButton ****/
    const { isOpen, DesignerButton } = DesignerState;
    if (isNaN(DesignerButton.x) || isNaN(DesignerButton.y)) {
        DesignerButton.x = Applet.Width - 40;
        DesignerButton.y = 8;
    }
    /**** validate selectedPages/Widgets and VisitHistory ****/
    const { selectedPages } = DesignerState;
    DesignerState.selectedPages = selectedPages.filter((Page) => Page.Applet === Applet);
    const visitedPage = Applet.visitedPage;
    DesignerState.selectedWidgets = sortedWidgetSelection().filter((Widget) => (Widget.Page === visitedPage));
    validateVisitHistory();
    /**** actual rendering ****/
    return html `<div class="WAD DesignerLayer">
      ${!isOpen && html `<${WAD_DesignerButton}/>`}
      ${isOpen && DesignerState.isLayouting && html `<${WAD_LayouterLayer}/>`}
      ${isOpen && DialogList.map((DialogName) => html `<${DesignerState[DialogName].View}/>`)}
    </div>`;
}
//------------------------------------------------------------------------------
//--                            WAD_DesignerButton                            --
//------------------------------------------------------------------------------
function WAD_DesignerButton() {
    const DragInfo = useMemo(() => ({
        StartX: NaN, StartY: NaN, initialX: NaN, initialY: NaN
    }), []);
    const Dragger = useCallback((dx, dy, StartX, StartY, Event) => {
        const DesignerButton = DesignerState.DesignerButton;
        if ((DragInfo.StartX != StartX) || (DragInfo.StartY != StartY)) {
            DragInfo.StartX = StartX;
            DragInfo.initialX = DesignerButton.x - dx;
            DragInfo.StartY = StartY;
            DragInfo.initialY = DesignerButton.y - dy;
        } // starts a new dragging process
        DesignerButton.isDragging = ( // for a proper pointer image only
        (Event.type === 'pointerdown') || (Event.type === 'pointermove'));
        DesignerButton.x = DragInfo.initialX + dx;
        DesignerButton.y = DragInfo.initialY + dy;
        WAT_rerender();
    }, []);
    const Recognizer = useCallback(GestureRecognizer({
        ClickRadius: 4, MultiClickLimit: 1,
        onClick: openDesigner,
        onDragStart: Dragger, onDragContinuation: Dragger,
        onDragFinish: Dragger, onDragCancellation: Dragger,
    }), []);
    const { x, y, isDragging } = DesignerState.DesignerButton;
    /**** repositioning on viewport ****/
    const { x: AppletX, y: AppletY } = DesignerState.Applet.Geometry;
    let { left, top } = fromDocumentTo('viewport', {
        left: x + AppletX, top: y + AppletY
    });
    left = Math.max(0, Math.min(left, document.documentElement.clientWidth - 32));
    top = Math.max(0, Math.min(top, document.documentElement.clientHeight - 32));
    /**** actual rendering ****/
    return html `<div class="WAD DesignerButton" style="
      left:${left}px; top:${top}px;
      cursor:${isDragging ? 'grabbing' : 'grab'}
    " onPointerDown=${Recognizer} onPointerMove=${Recognizer}
      onPointerUp=${Recognizer} onPointerCancel=${Recognizer}
    ><img src="${IconFolder}/pen.png"/></>`;
}
//------------------------------------------------------------------------------
//--                               WAD_Toolbox                                --
//------------------------------------------------------------------------------
function WAD_Toolbox() {
    const { Applet, isLayouting, selectedBehavior, selectedPages, selectedWidgets, shelvedWidgets } = DesignerState;
    const toggleLayouting = useCallback(() => {
        DesignerState.isLayouting = !DesignerState.isLayouting;
        WAT_rerender();
    });
    return html `<${WAD_Dialog} Name="Toolbox" onClose=${closeDesigner}>
      <div style="
        display:flex; flex-flow:row wrap; padding:2px; gap:2px;
      ">
        <${WAD_Icon} Icon="${IconFolder}/draw-square.png"
          active=${isLayouting}
          onClick=${toggleLayouting}
        />
        <${WAD_BehaviorPseudoDropDown} Icon="${IconFolder}/plus.png"
          enabled=${Applet.visitedPage != null}
          groupedOptionList=${Applet.groupedBehaviorListOfCategory('widget')}
          onInput=${(Event) => {
        doCreateWidget(Event.target.value);
        Event.target.value = '-';
    }}
        />
        <${WAD_Icon} Icon="${IconFolder}/pen-ruler.png"
          active=${DialogIsOpen('Inspector')}
          onClick=${(Event) => toggleDialog('Inspector', Event)}
        />
        <${WAD_Icon} Icon="${IconFolder}/message-circle-pencil.png"
          enabled=${false}
          active=${DialogIsOpen('CodeAssistant')}
          onClick=${(Event) => toggleDialog('CodeAssistant', Event)}
        />

        <${WAD_Icon} Icon="${IconFolder}/scissors.png"
          enabled=${selectedWidgets.length > 0}
          onClick=${doCutSelectedWidgets}
        />
        <${WAD_Icon} Icon="${IconFolder}/clipboard-arrow-up.png"
          enabled=${selectedWidgets.length > 0}
          onClick=${doCopySelectedWidgets}
        />
        <${WAD_Icon} Icon="${IconFolder}/clipboard-arrow-down.png"
          enabled=${shelvedWidgets.length > 0}
          onClick=${doPasteShelvedWidgets}
        />
        <${WAD_Icon} Icon="${IconFolder}/minus.png"
          enabled=${selectedWidgets.length > 0}
          onClick=${doDeleteSelectedWidgets}
        />

        <${WAD_Icon} Icon="${IconFolder}/rotate-ccw.png"
          enabled=${mayUndo()} onClick=${undoOperation}
        />
        <${WAD_Icon} Icon="${IconFolder}/rotate-cw.png"
          enabled=${mayRedo()} onClick=${redoOperation}
        />
        <${WAD_PseudoFileInput} Icon="${IconFolder}/arrow-up-from-bracket.png"
          onChange=${(Event) => {
        doImportFromFile(Event);
        Event.target.value = null;
    }}
        />
        <${WAD_PseudoDropDown} Icon="${IconFolder}/arrow-down-to-bracket.png"
          Placeholder="(please choose)" Value=""
          OptionList=${[
        (selectedBehavior == null ? '-' : '') + 'selected Behavior',
        'Applet', 'active Page',
        (selectedPages.length === 0 ? '-' : '') + 'selected Pages',
        (selectedWidgets.length === 0 ? '-' : '') + 'selected Widgets',
        '----', 'Applet Design', 'Applet Script'
    ]}
          onInput=${(Event) => {
        doExport(Event.target.value);
        Event.target.value = '';
    }}
        />

        <${WAD_Icon} Icon="${IconFolder}/chevron-left.png"
          enabled=${mayVisitPrevPage()} onClick=${visitPrevPage}
        />
        <${WAD_Icon} Icon="${IconFolder}/chevron-right.png"
          enabled=${mayVisitNextPage()} onClick=${visitNextPage}
        />
        <${WAD_Icon} Icon="${IconFolder}/search-alt-2.png"
          active=${DialogIsOpen('SearchDialog')}
          onClick=${(Event) => toggleDialog('SearchDialog', Event)}
        />
        <${WAD_Icon} Icon="${IconFolder}/gear.png"
          active=${DialogIsOpen('SettingsDialog')}
          onClick=${(Event) => toggleDialog('SettingsDialog', Event)}
        />

        <${WAD_Icon} Icon="${IconFolder}/terminal.png" enabled=${false}/>
        <${WAD_Icon} Icon="${IconFolder}/clapperboard.png"
          onClick=${doCreateScreenshot}
        />
        <${WAD_PseudoDropDown} Icon="${IconFolder}/clapperboard-play.png"
          Placeholder="(please choose)" Value=""
          OptionList=${[
        'without Designer', 'with Designer',
        '----',
        'from selected Widget',
    ]}
          onInput=${(Event) => {
        doGenerateApplet(Event.target.value);
        Event.target.value = '';
    }}
        />
        <${WAD_Icon} Icon="${IconFolder}/printer.png" onClick=${doPrintApplet} />
      </>
    </>`;
}
DesignerState.Toolbox.View = WAD_Toolbox;
DialogList.push('Toolbox'); // "Toolbox" is always part of the "DialogList"
//------------------------------------------------------------------------------
//--                              WAD_Inspector                               --
//------------------------------------------------------------------------------
function WAD_Inspector() {
    const onClose = useCallback(() => closeDialog('Inspector'));
    const [activeTab, activateTab] = useState('AppletConfiguration');
    return html `<${WAD_Dialog} Name="Inspector" resizable=${true}
      onClose=${onClose}
    >
     <${WAD_vertically} style="width:100%; height:100%; padding:4px">
      <${WAD_horizontally}>
        <${WAD_Icon} Icon="${IconFolder}/shapes.png"
          active=${activeTab === 'BehaviorBrowser'}
          onClick=${() => activateTab('BehaviorBrowser')}
        />
        <div style="width:10px"/>
        <${WAD_Icon} Icon="${IconFolder}/book-open.png"
          active=${activeTab === 'AppletConfiguration'}
          onClick=${() => activateTab('AppletConfiguration')}
        />
        <div style="width:10px"/>
        <${WAD_Icon} Icon="${IconFolder}/files.png"
          active=${activeTab === 'PageBrowser'}
          onClick=${() => activateTab('PageBrowser')}
        />
        <div style="width:10px"/>
        <${WAD_Icon} Icon="${IconFolder}/file-pencil-alt-1.png"
          active=${activeTab === 'PageConfiguration'}
          onClick=${() => activateTab('PageConfiguration')}
        />
        <div style="width:10px"/>
        <${WAD_Icon} Icon="${IconFolder}/rectangles-mixed.png"
          active=${activeTab === 'WidgetBrowser'}
          onClick=${() => activateTab('WidgetBrowser')}
        />
        <div style="width:10px"/>
        <${WAD_Icon} Icon="${IconFolder}/money-check-pen.png"
          active=${activeTab === 'WidgetConfiguration'}
          onClick=${() => activateTab('WidgetConfiguration')}
        />
      </>

      <${WAD_horizontally} style="
        margin-top:4px; margin-bottom:4px; padding-left:4px;
        background:#EEEEEE;
        border-top:solid 1px #888888; border-bottom:solid 1px #888888;
      ">
        ${(activeTab === 'BehaviorBrowser') && html `<${WAD_Label}>Behavior Browser</>`}
        ${(activeTab === 'AppletConfiguration') && html `<${WAD_Label}>Applet Configuration</>`}
        ${(activeTab === 'PageBrowser') && html `<${WAD_Label}>Page Browser</>`}
        ${(activeTab === 'PageConfiguration') && html `<${WAD_Label}>Page Configuration</>`}
        ${(activeTab === 'WidgetBrowser') && html `<${WAD_Label}>Widget Browser</>`}
        ${(activeTab === 'WidgetConfiguration') && html `<${WAD_Label}>Widget Configuration</>`}
      </>

      ${(activeTab === 'BehaviorBrowser') && html `<${WAD_BehaviorBrowserPane}/>`}
      ${(activeTab === 'AppletConfiguration') && html `<${WAD_AppletConfigurationPane}/>`}
      ${(activeTab === 'PageBrowser') && html `<${WAD_PageBrowserPane}/>`}
      ${(activeTab === 'PageConfiguration') && html `<${WAD_PageConfigurationPane}/>`}
      ${(activeTab === 'WidgetBrowser') && html `<${WAD_WidgetBrowserPane}/>`}
      ${(activeTab === 'WidgetConfiguration') && html `<${WAD_WidgetConfigurationPane}/>`}
     </>
    </>`;
}
DesignerState.Inspector.View = WAD_Inspector;
/**** usePaneMemory - remembers fold expansions and scroll position ****/
function usePaneMemory(PaneName) {
    const { Inspector } = DesignerState;
    const Expansions = (PaneName === 'BehaviorBrowser'
        ? Inspector.BehaviorExpansions
        : Inspector.Expansions[PaneName]);
    function toggleExpansion(Name) {
        Expansions[Name] = !Expansions[Name];
        WAT_rerender();
    }
    const ScrollPosition = Inspector.ScrollPositions[PaneName];
    function updateScrollPosition(Event) {
        Inspector.ScrollPositions[PaneName] = Event.target.scrollTop;
    }
    const scrollablePane = useRef(null);
    useEffect(() => scrollablePane.current.scrollTop = ScrollPosition, []);
    return { Expansions, toggleExpansion, ScrollPosition, updateScrollPosition, scrollablePane };
}
/**** PropertyScopeOfApplet ****/
function PropertyScopeOfApplet(Applet) {
    return {
        Enabling: true,
        ValueOf: (Property) => Applet[Property],
        setValue: (Property, newValue) => doConfigureApplet(Property, newValue),
        ItemOf: (Property, Entry) => { var _a; return (_a = Applet[Property]) === null || _a === void 0 ? void 0 : _a[Entry]; },
        ObjectBaseOf: (Property, Defaults) => Applet[Property] || Defaults,
        unifiedObjectBaseOf: (Property, Defaults) => Applet[Property] || Defaults,
        ListBaseOf: (Property, Defaults) => Applet[Property] || Defaults,
    };
}
/**** PropertyScopeOfVisitedPage ****/
function PropertyScopeOfVisitedPage(visitedPage) {
    return {
        Enabling: true,
        ValueOf: (Property) => visitedPage[Property],
        setValue: (Property, newValue) => doConfigureVisitedPage(Property, newValue),
        ItemOf: (Property, Entry) => { var _a; return (_a = visitedPage[Property]) === null || _a === void 0 ? void 0 : _a[Entry]; },
        ObjectBaseOf: (Property, Defaults) => visitedPage[Property] || Defaults,
        unifiedObjectBaseOf: (Property, Defaults) => visitedPage[Property] || Defaults,
        ListBaseOf: (Property, Defaults) => visitedPage[Property] || Defaults,
    };
}
/**** PropertyScopeOfSelectedWidgets ****/
// n.b.: "ObjectBaseOf" applies defaults to the common value (as the former
// inline code did for background textures and box shadows) whereas
// "unifiedObjectBaseOf" already applies them per widget (as the former code
// did for text decorations and text shadows)
function PropertyScopeOfSelectedWidgets(selectedWidgets) {
    const ValuesOf = (Property) => selectedWidgets.map((Widget) => Widget[Property]);
    return {
        Enabling: (selectedWidgets.length > 0),
        ValueOf: (Property) => commonValueOf(ValuesOf(Property)),
        setValue: (Property, newValue) => doConfigureSelectedWidgets(Property, newValue),
        ItemOf: (Property, Entry) => commonValueItemOf(ValuesOf(Property), Entry),
        ObjectBaseOf: (Property, Defaults) => commonObjectValueOf(ValuesOf(Property)) || Defaults,
        unifiedObjectBaseOf: (Property, Defaults) => commonObjectValueOf(selectedWidgets.map((Widget) => Widget[Property] || Defaults)),
        ListBaseOf: (Property, Defaults) => commonListValueOf(selectedWidgets.map((Widget) => Widget[Property] || Defaults)),
    };
}
/**** default values for structured properties ****/
// n.b.: entry order matters - written objects keep exactly this order
const DefaultTextShadow = {
    isActive: false, xOffset: 0, yOffset: 0, BlurRadius: 5, Color: 'black'
};
const DefaultBoxShadow = {
    isActive: false, xOffset: 0, yOffset: 0, BlurRadius: 5, SpreadRadius: 0, Color: 'black'
};
const DefaultTextDecoration = {
    isActive: false, Line: 'none', Color: 'black', Style: 'solid', Thickness: 1
};
const DefaultBackgroundTexture = {
    isActive: false, ImageURL: '', Mode: 'tile', xOffset: 0, yOffset: 0
};
const DefaultOverflows = ['visible', 'visible'];
const DefaultBorderStyles = ['none', 'none', 'none', 'none'];
const DefaultBorderWidths = [0, 0, 0, 0];
const DefaultBorderColors = ['black', 'black', 'black', 'black'];
const DefaultBorderRadii = [0, 0, 0, 0];
/**** FontFamilySuggestions ****/
const FontFamilySuggestions = [
    "Arial,Verdana,'Source Sans Pro','Open Sans',Helvetica,sans-serif",
    "'Times New Roman',Georgia,Cambria,serif",
    "'Courier New','Consolas','Lucida Console',Monaco,Menlo,monospace"
];
/**** patchedObject - copy with a single entry replaced, in "Defaults" order ****/
function patchedObject(Base, Defaults, Key, newValue) {
    const Result = {};
    for (const Property in Defaults) {
        Result[Property] = (Property === Key ? newValue : Base[Property]);
    }
    return Result;
}
/**** patchObjectProperty - input handler for one field of an object property ****/
function patchObjectProperty(Scope, Property, Defaults, Key, unified = false) {
    return (newValue) => {
        const Base = (unified
            ? Scope.unifiedObjectBaseOf(Property, Defaults)
            : Scope.ObjectBaseOf(Property, Defaults));
        Scope.setValue(Property, patchedObject(Base, Defaults, Key, newValue));
    };
}
/**** patchListItem - input handler for a single item of a list property ****/
function patchListItem(Scope, Property, Defaults, Index) {
    return (newValue) => {
        const Base = Scope.ListBaseOf(Property, Defaults);
        Scope.setValue(Property, Defaults.map((_, Slot) => (Slot === Index ? newValue : Base[Slot])));
    };
}
/**** shownValueFor - the value shown in a property row ****/
function shownValueFor(PropSet) {
    const { Scope, Property, Key, Index } = PropSet;
    const Entry = Key !== null && Key !== void 0 ? Key : Index;
    return (Entry == null ? Scope.ValueOf(Property) : Scope.ItemOf(Property, Entry));
}
/**** applyValueFor - the input handler of a property row ****/
function applyValueFor(PropSet) {
    const { Scope, Property, Key, Index, Defaults, unified } = PropSet;
    switch (true) {
        case (Key != null):
            return patchObjectProperty(Scope, Property, Defaults, Key, unified === true);
        case (Index != null):
            return patchListItem(Scope, Property, Defaults, Index);
        default:
            return (newValue) => Scope.setValue(Property, newValue);
    }
}
/**** WAD_LabelRow - a row consisting of a mere group label ****/
function WAD_LabelRow(PropSet) {
    return html `<${WAD_horizontally}>
      <${WAD_Label}>${PropSet.Label}</>
    </>`;
}
/**** WAD_PropertyRow - label, gap and the given input control(s) ****/
function WAD_PropertyRow(PropSet) {
    const { Label, indented, extraStyle, children } = PropSet;
    return html `<${WAD_horizontally} style=${extraStyle}>
      <${WAD_Label} style=${indented ? 'padding-left:10px' : undefined}>${Label}</>
      <${WAD_Gap}/>
      ${children}
    </>`;
}
/**** WAD_CheckboxRow ****/
function WAD_CheckboxRow(PropSet) {
    const { Scope, Label, indented, extraStyle, strict } = PropSet;
    let Value = shownValueFor(PropSet);
    if (strict) {
        Value = (Value === true);
    }
    const applyValue = applyValueFor(PropSet);
    return html `<${WAD_PropertyRow} Label=${Label} indented=${indented}
      extraStyle=${extraStyle}
    >
      <${WAD_Checkbox}
        enabled=${Scope.Enabling}
        Value=${Value}
        onInput=${(Event) => applyValue(Event.target.checked)}
      />
    </>`;
}
/**** WAD_IntegerRow ****/
function WAD_IntegerRow(PropSet) {
    const { Scope, Label, indented, extraStyle, Minimum, Maximum, readonly } = PropSet;
    const Value = shownValueFor(PropSet);
    const applyValue = applyValueFor(PropSet);
    return html `<${WAD_PropertyRow} Label=${Label} indented=${indented}
      extraStyle=${extraStyle}
    >
      <${WAD_IntegerInput} style="width:60px"
        enabled=${Scope.Enabling} readonly=${readonly}
        Value=${Value} Minimum=${Minimum} Maximum=${Maximum}
        onInput=${readonly ? undefined : (Event) => applyValue(parseFloat(Event.target.value))}
      />
    </>`;
}
/**** WAD_ColorRow ****/
function WAD_ColorRow(PropSet) {
    const { Scope, Label, indented, extraStyle } = PropSet;
    const Value = shownValueFor(PropSet);
    const applyValue = applyValueFor(PropSet);
    return html `<${WAD_PropertyRow} Label=${Label} indented=${indented}
      extraStyle=${extraStyle}
    >
      <${WAD_ColorInput}
        enabled=${Scope.Enabling}
        Value=${Value}
        onInput=${(Event) => applyValue(Event.target.value)}
      />
    </>`;
}
/**** WAD_DropDownRow ****/
function WAD_DropDownRow(PropSet) {
    const { Scope, Label, indented, extraStyle, Options } = PropSet;
    const Value = shownValueFor(PropSet);
    const applyValue = applyValueFor(PropSet);
    return html `<${WAD_PropertyRow} Label=${Label} indented=${indented}
      extraStyle=${extraStyle}
    >
      <${WAD_DropDown}
        enabled=${Scope.Enabling}
        Value=${Value} Options=${Options}
        onInput=${(Event) => applyValue(Event.target.value)}
      />
    </>`;
}
/**** WAD_TextlineRow ****/
function WAD_TextlineRow(PropSet) {
    const { Scope, Label, indented, extraStyle, Type, Suggestions } = PropSet;
    const Value = shownValueFor(PropSet);
    const applyValue = applyValueFor(PropSet);
    return html `<${WAD_PropertyRow} Label=${Label} indented=${indented}
      extraStyle=${extraStyle}
    >
      <${WAD_TextlineInput} Type=${Type} style="flex:1 0 auto"
        enabled=${Scope.Enabling}
        Value=${Value} Suggestions=${Suggestions}
        onInput=${(Event) => applyValue(Event.target.value)}
      />
    </>`;
}
/**** WAD_IntegerPairRow - two integer inputs, separated by "," or "x" ****/
// the pair is given either as "Properties" (two property names), as "Keys"
// (two entries of object property "Property") or as "Indices" (two items of
// list property "Property")
function WAD_IntegerPairRow(PropSet) {
    const { Scope, Label, indented, extraStyle, Properties, Keys, Indices, Separator, Minimum, Maximum, readonly } = PropSet;
    const renderedInput = (Slot) => {
        const SlotPropSet = Object.assign(Object.assign({}, PropSet), { Property: (Properties == null ? PropSet.Property : Properties[Slot]), Key: Keys === null || Keys === void 0 ? void 0 : Keys[Slot], Index: Indices === null || Indices === void 0 ? void 0 : Indices[Slot] });
        const Value = shownValueFor(SlotPropSet);
        const applyValue = applyValueFor(SlotPropSet);
        return html `<${WAD_IntegerInput} style="width:60px"
        enabled=${Scope.Enabling} readonly=${readonly}
        Value=${Value} Minimum=${Minimum} Maximum=${Maximum}
        onInput=${readonly ? undefined : (Event) => applyValue(parseFloat(Event.target.value))}
      />`;
    };
    return html `<${WAD_PropertyRow} Label=${Label} indented=${indented}
      extraStyle=${extraStyle}
    >
      ${renderedInput(0)}
        <div style="width:20px; padding-top:4px; text-align:center">${Separator}</div>
      ${renderedInput(1)}
    </>`;
}
/**** WAD_BorderLineRow - style, width and colour of a single border line ****/
function WAD_BorderLineRow(PropSet) {
    const { Scope, Label, Index } = PropSet;
    const patchStyle = patchListItem(Scope, 'BorderStyles', DefaultBorderStyles, Index);
    const patchWidth = patchListItem(Scope, 'BorderWidths', DefaultBorderWidths, Index);
    const patchColor = patchListItem(Scope, 'BorderColors', DefaultBorderColors, Index);
    return html `<${WAD_horizontally}>
      <${WAD_Label} style="padding-left:10px">${Label}</>
      <${WAD_Gap}/>
      <${WAD_DropDown}
        enabled=${Scope.Enabling}
        Value=${Scope.ItemOf('BorderStyles', Index)}
        Options=${WAT_BorderStyles}
        onInput=${(Event) => patchStyle(Event.target.value)}
      />
        <div style="width:10px"/>
      <${WAD_IntegerInput} style="width:60px"
        enabled=${Scope.Enabling}
        Value=${Scope.ItemOf('BorderWidths', Index)}
        Minimum=${0}
        onInput=${(Event) => patchWidth(parseFloat(Event.target.value))}
      />
        <div style="width:10px"/>
      <${WAD_ColorInput}
        enabled=${Scope.Enabling}
        Value=${Scope.ItemOf('BorderColors', Index)}
        onInput=${(Event) => patchColor(Event.target.value)}
      />
    </>`;
}
/**** WAD_TextShadowSettings - the "Text Shadow" rows within "Typography" ****/
function WAD_TextShadowSettings(PropSet) {
    const { Scope, strict, unified } = PropSet;
    const SubObject = {
        Scope, Property: 'TextShadow', Defaults: DefaultTextShadow, unified
    };
    return html `
      <${WAD_CheckboxRow} ...${SubObject} Label="Text Shadow" Key="isActive"
        strict=${strict}/>
      <${WAD_ColorRow} ...${SubObject} Label="Color" indented Key="Color"/>
      <${WAD_IntegerPairRow} ...${SubObject} Label="Offset (dx,dy) [px]" indented
        Keys=${['xOffset', 'yOffset']} Separator=","
      />
      <${WAD_IntegerRow} ...${SubObject} Label="Blur Radius [px]" indented
        Key="BlurRadius"/>
    `;
}
/**** WAD_TextDecorationSettings - additional rows for the widget pane ****/
function WAD_TextDecorationSettings(PropSet) {
    const { Scope } = PropSet;
    const SubObject = {
        Scope, Property: 'TextDecoration', Defaults: DefaultTextDecoration, unified: true
    };
    return html `
      <${WAD_CheckboxRow} ...${SubObject} Label="Text Decoration" Key="isActive"/>
      <${WAD_DropDownRow} ...${SubObject} Label="Line" indented Key="Line"
        Options=${WAT_TextDecorationLines}/>
      <${WAD_ColorRow} ...${SubObject} Label="Color" indented Key="Color"/>
      <${WAD_DropDownRow} ...${SubObject} Label="Style" indented Key="Style"
        Options=${WAT_TextDecorationStyles}/>
      <${WAD_IntegerRow} ...${SubObject} Label="Thickness [px]" indented
        Key="Thickness"/>
    `;
}
/**** WAD_TypographySettings - the "Typography" fold of all three panes ****/
function WAD_TypographySettings(PropSet) {
    const { Scope, Expansion, toggleExpansion, strict, unified, withTextDecoration } = PropSet;
    return html `<${WAD_Fold} Label="Typography"
      Expansion=${Expansion}
      toggleExpansion=${toggleExpansion}
    >
      <${WAD_TextlineRow} Scope=${Scope} Label="Font Family"
        Property="FontFamily" Suggestions=${FontFamilySuggestions}
      />

      <${WAD_LabelRow} Label="Typesetting"/>
      <${WAD_IntegerRow} Scope=${Scope} Label="Size [px]" indented
        Property="FontSize" Minimum=${0} Maximum=${1000}
      />
      <${WAD_DropDownRow} Scope=${Scope} Label="Weight" indented
        Property="FontWeight" Options=${WAT_FontWeights}
      />
      <${WAD_DropDownRow} Scope=${Scope} Label="Style" indented
        Property="FontStyle" Options=${WAT_FontStyles}
      />
      <${WAD_ColorRow} Scope=${Scope} Label="Color" indented Property="Color"/>

      ${withTextDecoration && html `<${WAD_TextDecorationSettings} Scope=${Scope}/>`}

      <${WAD_TextShadowSettings} Scope=${Scope} strict=${strict} unified=${unified}/>

      <${WAD_LabelRow} Label="Text Layout"/>
      <${WAD_DropDownRow} Scope=${Scope} Label="Text Alignment" indented
        Property="TextAlignment" Options=${WAT_TextAlignments}
      />
      <${WAD_IntegerRow} Scope=${Scope} Label="Line Height [px]" indented
        Property="LineHeight" Minimum=${0} Maximum=${1000}
      />
    </>`;
}
/**** WAD_BackgroundSettings - the "Background" fold of all three panes ****/
function WAD_BackgroundSettings(PropSet) {
    const { Scope, Expansion, toggleExpansion, strict } = PropSet;
    const SubObject = {
        Scope, Property: 'BackgroundTexture', Defaults: DefaultBackgroundTexture
    };
    return html `<${WAD_Fold} Label="Background"
      Expansion=${Expansion}
      toggleExpansion=${toggleExpansion}
    >
      <${WAD_CheckboxRow} Scope=${Scope} Label="Background"
        Property="hasBackground" strict=${strict}
      />
      <${WAD_ColorRow} Scope=${Scope} Label="Color" Property="BackgroundColor"/>

      <${WAD_CheckboxRow} ...${SubObject} Label="Texture" Key="isActive"
        strict=${strict}/>
      <${WAD_DropDownRow} ...${SubObject} Label="Mode" indented Key="Mode"
        Options=${WAT_BackgroundModes}/>
      <${WAD_TextlineRow} ...${SubObject} Label="Image URL" indented Key="ImageURL"
        Type="url"/>
      <${WAD_IntegerPairRow} ...${SubObject} Label="Offset (dx,dy) [px]" indented
        Keys=${['xOffset', 'yOffset']} Separator=","
      />
    </>`;
}
/**** WAD_BoxShadowSettings - the "Shadow" fold of the widget pane ****/
function WAD_BoxShadowSettings(PropSet) {
    const { Scope, Expansion, toggleExpansion } = PropSet;
    const SubObject = { Scope, Property: 'BoxShadow', Defaults: DefaultBoxShadow };
    return html `<${WAD_Fold} Label="Shadow"
      Expansion=${Expansion}
      toggleExpansion=${toggleExpansion}
    >
      <${WAD_CheckboxRow} ...${SubObject} Label="Box Shadow" Key="isActive"/>
      <${WAD_ColorRow} ...${SubObject} Label="Color" indented Key="Color"/>
      <${WAD_IntegerPairRow} ...${SubObject} Label="Offset (dx,dy) [px]" indented
        Keys=${['xOffset', 'yOffset']} Separator=","
      />
      <${WAD_IntegerRow} ...${SubObject} Label="Blur Radius [px]" indented
        Key="BlurRadius"/>
      <${WAD_IntegerRow} ...${SubObject} Label="Spread Radius [px]" indented
        Key="SpreadRadius"/>
    </>`;
}
/**** WAD_BehaviorBrowserPane ****/
function WAD_BehaviorBrowserPane() {
    const { Applet, Inspector, selectedCategory, selectedBehavior } = DesignerState;
    const setCategoryTo = useCallback((newCategory) => {
        DesignerState.selectedCategory = newCategory;
        DesignerState.selectedBehavior = undefined;
        WAT_rerender();
    }, []);
    const BehaviorSet = Applet.BehaviorSet[selectedCategory];
    function ValueIsUniqueBehaviorName(Value) {
        return (ValueIsBehavior(Value) && !(Value.toLowerCase() in BehaviorSet));
    }
    /**** remember fold expansions and scroll position ****/
    const { Expansions, toggleExpansion, ScrollPosition, updateScrollPosition, scrollablePane } = usePaneMemory('BehaviorBrowser');
    /**** handle list item rendering and selection ****/
    const groupedBehaviorList = Applet.groupedBehaviorListOfCategory(selectedCategory);
    const GroupList = [], customGroupList = Object.keys(groupedBehaviorList);
    ['basic', 'native', 'other', 'mobile', 'wearable'].forEach((Prefix) => {
        const GroupName = Prefix + '_controls';
        if (GroupName in groupedBehaviorList) {
            GroupList.push(GroupName);
            customGroupList.splice(customGroupList.indexOf(GroupName), 1);
        }
    });
    GroupList.push(...customGroupList.sort());
    const ListIsEmpty = (Object.keys(groupedBehaviorList).length === 0);
    const BehaviorListItemRenderer = useCallback((GroupName, Behavior, Index, selected) => {
        let Classes = ['WAD', 'Behavior'];
        if (selected) {
            Classes.push('selected');
        }
        if (Applet.BehaviorOfCategoryIsBroken(selectedCategory, GroupName + '.' + Behavior)) {
            Classes.push('broken');
        }
        if (Applet.BehaviorOfCategoryIsUnused(selectedCategory, GroupName + '.' + Behavior)) {
            Classes.push('unused');
        }
        return `<span
          class="${Classes.join(' ')}"
        >${HTMLsafe(Behavior.replace(/^.*[.]/, ''))}</span>`;
    });
    const selectedBehaviorIndices = Object.create(null);
    GroupList.forEach((GroupName) => {
        const Suffix = (selectedBehavior || '').replace(/^.*[.]/, '');
        const SelectionIndex = groupedBehaviorList[GroupName].indexOf(Suffix);
        selectedBehaviorIndices[GroupName] = (SelectionIndex < 0 ? [] : [SelectionIndex]);
    });
    const updateBehaviorSelection = useCallback((GroupName, selectedIndices) => {
        const SelectionIndex = selectedIndices[0];
        if (SelectionIndex == null) {
            DesignerState.selectedBehavior = undefined;
        }
        else {
            DesignerState.selectedBehavior = GroupName + '.' + groupedBehaviorList[GroupName][SelectionIndex];
        }
        WAT_rerender();
    });
    /**** actual rendering ****/
    return html `<div class="WAD InspectorPane">
     <${WAD_vertically} style="width:100%; height:100%; padding:4px">
      <${WAD_horizontally}>
        <${WAD_Label}>Category</>
          <div style="width:8px"/>
        <${WAD_DropDown}
          Value=${selectedCategory} Options=${['applet', 'page', 'widget']}
          onInput=${(Event) => setCategoryTo(Event.target.value)}
        />
      </>

      <${WAD_horizontally} style="padding-top:4px; padding-bottom:4px">
        <${WAD_Icon} Icon="${IconFolder}/plus.png"
          enabled=${ValueIsUniqueBehaviorName(Inspector.newBehaviorName)}
          onClick=${(Event) => {
        doCreateNewBehavior(selectedCategory, Inspector.newBehaviorName);
        DesignerState.selectedBehavior = Inspector.newBehaviorName;
        if (!DialogIsOpen('BehaviorEditor')) {
            openDialog('BehaviorEditor', Event === null || Event === void 0 ? void 0 : Event.clientX, Event === null || Event === void 0 ? void 0 : Event.clientY); // *C* better position!
        }
        WAT_rerender();
    }}
        />
          <div style="width:8px"/>
        <${WAD_TextlineInput} Placeholder="(behavior name)" style="flex:1 0 auto"
          Value=${Inspector.newBehaviorName}
          onInput=${(Event) => { Inspector.newBehaviorName = Event.target.value; WAT_rerender(); }}
        />
          <div style="width:8px"/>
        <${WAD_Icon} Icon="${IconFolder}/square-code.png"
          active=${DialogIsOpen('BehaviorEditor')}
          enabled=${DesignerState.selectedBehavior != null}
          onClick=${(Event) => toggleScopedDialog('BehaviorEditor', 'Category', selectedCategory, Event)}
        />
          <${WAD_Gap}/>
        <${WAD_Icon} Icon="${IconFolder}/minus.png"
          enabled=${(DesignerState.selectedBehavior != null) && !BehaviorIsIntrinsic(DesignerState.selectedBehavior)}
          onClick=${doDeleteSelectedBehavior}
        />
      </>

      <${WAD_vertically} style="
        flex:1 1 auto; overflow-x:hidden; overflow-y:scroll; overscroll-behavior-y:contain;
        margin-top:6px;
      " ref=${scrollablePane} scrollTop=${ScrollPosition} onScroll=${updateScrollPosition}>
        ${ListIsEmpty && html `
          <${WAD_horizontally}>
            <div style="
              flex:1 0 auto;
              height:40px; line-height:40px;
              font-style:italic; text-align:center
            ">(no behaviours)</>
          </>
        `}
        ${!ListIsEmpty && GroupList.map((GroupName) => html `
          <${WAD_Fold} Label=${GroupName}
            Expansion=${Expansions[GroupName]}
            toggleExpansion=${() => toggleExpansion(GroupName)}
          >
            <${WAD_FlatListView} style="flex:0 0 auto"
              List=${groupedBehaviorList[GroupName]} Placeholder="(no behaviours)"
              ItemRenderer=${BehaviorListItemRenderer.bind(null, GroupName)}
              selectedIndices=${selectedBehaviorIndices[GroupName]}
              SelectionLimit=${1}
              onSelectionChange=${(selectedIndices) => updateBehaviorSelection(GroupName, selectedIndices)}
              onDblClick=${(Event, Index) => {
        DesignerState.selectedBehavior = GroupName + '.' + groupedBehaviorList[GroupName][Index];
        toggleScopedDialog('BehaviorEditor', 'Category', selectedCategory, Event);
    }}
            />
          </>
        `)}
      </>
     </>
    </>`;
}
/**** WAD_AppletConfigurationPane ****/
function WAD_AppletConfigurationPane() {
    const { Applet, Inspector, AppletResizer } = DesignerState;
    /**** remember fold expansions and scroll position ****/
    const { Expansions, toggleExpansion, ScrollPosition, updateScrollPosition, scrollablePane } = usePaneMemory('AppletConfiguration');
    /**** provide the scopes used for table-driven property rows ****/
    const Scope = PropertyScopeOfApplet(Applet);
    const ResizerScope = {
        Enabling: true,
        ValueOf: (Property) => AppletResizer[Property],
        setValue: (Property, newValue) => {
            AppletResizer[Property] = newValue;
        },
    };
    /**** prepare behavior-specific properties ****/
    const configurableProperties = Applet.configurableProperties;
    let PropertyEditors = [];
    if (configurableProperties.length === 0) {
        PropertyEditors.push(html `
        <${WAD_horizontally}>
          <div style="
            flex:1 0 auto;
            height:40px; line-height:40px;
            font-style:italic; text-align:center
          ">(none)</>
        </>
      `);
    }
    else {
        PropertyEditors = configurableProperties.map((Descriptor) => html `
        <${WAD_PropertyConfigurator} Descriptor=${Descriptor}
          Enabling=${true}
          Value=${Applet[Descriptor.Name]}
          onInput=${(newValue) => doConfigureApplet(Descriptor.Name, newValue)}
        />
      `);
    }
    /**** handle script input ****/
    const { activeScript, pendingScript, ErrorReport, ScriptError } = Applet;
    const ScriptIsPending = ValueIsText(pendingScript) && (pendingScript !== activeScript);
    const ReportToShow = ScriptError || ErrorReport;
    DesignerState.Inspector.ReportToShow = ReportToShow; // *C* workaround
    const setPendingScriptTo = useCallback((newScript) => {
        doConfigureApplet('pendingScript', newScript);
    }, []);
    const applyPendingScript = useCallback(() => doApplyAppletScript(), []);
    /**** actual rendering ****/
    return html `<div class="WAD InspectorPane">
     <${WAD_vertically} style="width:100%; height:100%; padding:4px">
      <${WAD_horizontally}>
        <${WAD_Label} style="width:56px">Applet</>
        <${WAD_TextlineInput} Placeholder="(applet name)" style="flex:1 0 auto"
          Value=${Applet.Name}
          onInput=${(Event) => doConfigureApplet('Name', Event.target.value)}
        />
      </>

      <${WAD_horizontally} style="padding-top:4px">
        <${WAD_Label} style="width:52px">Behavior</>
        <${WAD_Gap}/>
        <${WAD_BehaviorDropDown}
          Value=${Applet.Behavior} groupedOptionList=${Applet.groupedBehaviorListOfCategory('applet')}
          onInput=${(Event) => doConfigureApplet('Behavior', Event.target.value)}
        />
      </>

      <${WAD_horizontally}>
        <${WAD_Label}>Synopsis</>
        <${WAD_Gap}/>
        <${WAD_Icon} Icon="${IconFolder}/circle-information.png"
          active=${DialogIsOpen('SynopsisEditor') && (DesignerState.SynopsisEditor.Scope === 'Applet')}
          onClick=${(Event) => toggleScopedDialog('SynopsisEditor', 'Scope', 'Applet', Event)}
        />
      </>

      <${WAD_TextInput} Placeholder="(enter synopsis)" style="
        padding-top:4px; min-height:60px;
      " Value=${Applet.Synopsis}
        onInput=${(Event) => doConfigureApplet('Synopsis', Event.target.value)}
      />

      <${WAD_vertically} style="
        flex:1 1 auto; overflow-x:hidden; overflow-y:scroll; overscroll-behavior-y:contain;
        margin-top:6px;
      " ref=${scrollablePane} scrollTop=${ScrollPosition} onScroll=${updateScrollPosition}>
        <${WAD_Fold} Label="Visibility"
          Expansion=${Expansions.Visibility}
          toggleExpansion=${() => toggleExpansion('Visibility')}
        >
          <${WAD_IntegerRow} Scope=${Scope} Label="Opacity [%]"
            Property="Opacity" Minimum=${0} Maximum=${100}
          />

          <${WAD_horizontally}>
            <${WAD_Label}>Overflows</>
            <${WAD_Gap}/>
            <${WAD_DropDown} Options=${['hidden']}
              enabled=${false}
              Value=${Applet.Overflows[0]}
              onInput=${(Event) => doConfigureApplet('Overflows', [
        Event.target.value, Applet.Overflows[1]
    ])}
            />
              <div style="width:10px"/>
            <${WAD_DropDown} Options=${['hidden']}
              enabled=${false}
              Value=${Applet.Overflows[1]}
              onInput=${(Event) => doConfigureApplet('Overflows', [
        Applet.Overflows[0], Event.target.value
    ])}
            />
          </>
        </>

        <${WAD_Fold} Label="Geometry (static)"
          Expansion=${Expansions.Geometry}
          toggleExpansion=${() => toggleExpansion('Geometry')}
        >
          <${WAD_IntegerPairRow} Scope=${Scope} Label="Position (x,y) [px]"
            Properties=${['x', 'y']} Separator="," readonly
          />
          <${WAD_IntegerPairRow} Scope=${Scope} Label="Size (w,h) [px]"
            Properties=${['Width', 'Height']} Separator="x" readonly
          />

          <${WAD_LabelRow} Label="Limits"/>
          <${WAD_IntegerPairRow} Scope=${Scope} Label="min. Size (w,h) [px]" indented
            Properties=${['minWidth', 'minHeight']} Separator="x" readonly
          />
          <${WAD_IntegerPairRow} Scope=${Scope} Label="max. Size (w,h) [px]" indented
            Properties=${['maxWidth', 'maxHeight']} Separator="x" readonly
          />

          <${WAD_CheckboxRow} Scope=${Scope} Label="center in Viewport"
            Property="toBeCentered"
          />
          <${WAD_CheckboxRow} Scope=${Scope} Label="draw Frame in large Viewports"
            Property="withMobileFrame"
          />
          <${WAD_DropDownRow} Scope=${Scope} Label="expected mobile Orientation"
            Property="expectedOrientation" Options=${WAT_Orientations}
          />
        </>

        <${WAD_Fold} Label="Applet Resizing (changes Geometry)"
          Expansion=${Expansions.AppletResizing}
          toggleExpansion=${() => toggleExpansion('AppletResizing')}
        >
          <${WAD_horizontally}>
            <${WAD_Label} style="color:red">Warning: no undo possible!</>
          </>

          <${WAD_IntegerPairRow} Scope=${ResizerScope} Label="new Size (w,h) [px]"
            Properties=${['Width', 'Height']} Separator="x" Minimum=${0}
          />

          <${WAD_LabelRow} Label="new Limits"/>
          <${WAD_IntegerPairRow} Scope=${ResizerScope} Label="min. Size (w,h) [px]" indented
            Properties=${['minWidth', 'minHeight']} Separator="x" Minimum=${0}
          />
          <${WAD_IntegerPairRow} Scope=${ResizerScope} Label="max. Size (w,h) [px]" indented
            Properties=${['maxWidth', 'maxHeight']} Separator="x" Minimum=${0}
          />

          <${WAD_horizontally}>
            <${WAD_Button} style="width:100px" onClick=${resizeApplet}>Update</>
              <div style="width:10px"/>
            <${WAD_Label}>keeping Widget Geometries</>
            <${WAD_Checkbox}
              Value=${AppletResizer.keepGeometries}
              onInput=${(Event) => AppletResizer.keepGeometries = Event.target.checked}
            />
          </>

          <${WAD_horizontally}>
            <${WAD_Button} style="width:100px" onClick=${shrinkApplet}>Shrink to fit</>
              <div style="width:10px"/>
            <${WAD_Label}>w/ padding</>
            <${WAD_Gap}/>
            <${WAD_IntegerInput} style="width:60px"
              Value=${AppletResizer.PaddingX}
              Minimum=${0}
              onInput=${(Event) => AppletResizer.PaddingX = parseFloat(Event.target.value)}
            />
              <div style="width:20px; padding-top:4px; text-align:center">x</div>
            <${WAD_IntegerInput} style="width:60px"
              Value=${AppletResizer.PaddingY}
              Minimum=${0}
              onInput=${(Event) => AppletResizer.PaddingY = parseFloat(Event.target.value)}
            />
          </>
        </>

        <${WAD_TypographySettings} Scope=${Scope}
          Expansion=${Expansions.Typography}
          toggleExpansion=${() => toggleExpansion('Typography')}
          strict
        />

        <${WAD_BackgroundSettings} Scope=${Scope}
          Expansion=${Expansions.Background}
          toggleExpansion=${() => toggleExpansion('Background')}
          strict
        />

        <${WAD_Fold} Label="Layout Settings"
          Expansion=${Expansions.Layout}
          toggleExpansion=${() => toggleExpansion('Layout')}
        >
          <${WAD_CheckboxRow} Scope=${Scope} Label="Snap-to-Grid"
            Property="SnapToGrid"
          />
          <${WAD_IntegerPairRow} Scope=${Scope} Label="Grid Size (w,h) [px]"
            Properties=${['GridWidth', 'GridHeight']} Separator="x"
          />
        </>        <${WAD_Fold} Label="Behavior-specific Settings"
          Expansion=${Expansions.BehaviorSpecific}
          toggleExpansion=${() => toggleExpansion('BehaviorSpecific')}
        >
          ${PropertyEditors}
        </>
        <${WAD_Fold} Label="Scripting"
          Expansion=${Expansions.Scripting}
          toggleExpansion=${() => toggleExpansion('Scripting')}
        >
          <${WAD_horizontally}>
            <${WAD_Label}>Script</>
              <div style="width:8px"/>
            <${WAD_Icon} Icon="${IconFolder}/square-code.png"
              active=${DialogIsOpen('ScriptEditor') && (DesignerState.ScriptEditor.Scope === 'Applet')}
              onClick=${(Event) => toggleScopedDialog('ScriptEditor', 'Scope', 'Applet', Event)}
            />
            <${WAD_Gap}/>
            <${WAD_Icon} Icon="${IconFolder}/check.png"
              enabled=${ScriptIsPending}
              onClick=${applyPendingScript}
            />
              <div style="width:8px"/>
            <${WAD_Icon} Icon="${IconFolder}/xmark.png" style="width:24px"
              enabled=${ScriptIsPending}
              onClick=${() => setPendingScriptTo('')}
            />
          </>

          <${WAD_TextInput} Placeholder="(enter script)" style="
            flex:1 0 auto; padding-top:4px; min-height:60px;
            white-space:pre;
          " Value=${pendingScript == null ? activeScript : pendingScript}
            onInput=${(Event) => setPendingScriptTo(Event.target.value)}
          />
        </>        <${WAD_Fold} Label="Developer Functions"
          Expansion=${Expansions.Developer}
          toggleExpansion=${() => toggleExpansion('Developer')}
        >
          <${WAD_horizontally}>
            <${WAD_Label}>${'<'}head${'>'} Extensions</>
          </>

          <${WAD_TextInput} Placeholder="(enter <head> extensions)" style="
            flex:1 0 auto; padding-top:4px; min-height:60px;
            white-space:pre;
          " Value=${Applet.HeadExtensions}
            onInput=${(Event) => doConfigureApplet('HeadExtensions', Event.target.value)}
          />

          <${WAD_horizontally}>
            <${WAD_Button} onClick=${doRemoveLocalBackup}>Remove Local Backup</>
          </>
        </>
      </>

      <${WAD_ErrorFooter} ReportToShow=${ReportToShow}
        showIcon=${ReportToShow != null} Visual=${DesignerState.Inspector}/>
     </>
    </>`;
}
/**** WAD_PageBrowserPane ****/
function WAD_PageBrowserPane() {
    const { Applet, selectedPages } = DesignerState;
    /**** handle list item rendering and selection ****/
    const PageListItemRenderer = useCallback((Page, Index, selected) => {
        let Style = '';
        if (Page.Name == null) {
            Style += 'font-style:italic;';
        }
        if (Applet.visitedPage === Page) {
            Style += 'font-weight:bold; text-decoration:underline';
        }
        return `<span style="${Style}">${HTMLsafe_(Page.Name) || `(unnamed ${HTMLsafe(Page.Behavior || 'page')})`}</span>`;
    });
    const selectedPageIndices = selectedPages.map((Page) => Page.Index);
    const updatePageSelection = useCallback((selectedIndices) => {
        const PageList = Applet.PageList;
        DesignerState.selectedPages = selectedIndices.map((Index) => PageList[Index]);
        WAT_rerender();
    });
    /**** actual rendering ****/
    return html `<div class="WAD InspectorPane">
     <${WAD_vertically} style="width:100%; height:100%; padding:4px">
      <${WAD_horizontally}>
        <${WAD_Label} style="width:56px">Applet</>
        <${WAD_TextlineInput} Placeholder="(applet name)" style="flex:1 0 auto"
          readonly Value=${Applet.Name}
        />
      </>

      <${WAD_horizontally} style="padding-top:4px; padding-bottom:4px">
        <${WAD_BehaviorPseudoDropDown} Icon="${IconFolder}/plus.png"
          groupedOptionList=${Applet.groupedBehaviorListOfCategory('page')}
          onInput=${(Event) => {
        doCreatePage(Event.target.value);
        Event.target.value = '-';
    }}
        />
        <${WAD_Icon} Icon="${IconFolder}/clone.png"
          enabled=${selectedPages.length > 0}
          onClick=${doDuplicateSelectedPages}
        />
          <${WAD_Gap}/>
        <${WAD_Icon} Icon="${IconFolder}/arrow-sm-to-top.png"
          enabled=${selectedPagesMayBeShiftedUp()}
          onClick=${doShiftSelectedPagesToTop}
        />
        <${WAD_Icon} Icon="${IconFolder}/arrow-sm-up.png"
          enabled=${selectedPagesMayBeShiftedUp()}
          onClick=${doShiftSelectedPagesUp}
        />
        <${WAD_Icon} Icon="${IconFolder}/arrow-sm-down.png"
          enabled=${selectedPagesMayBeShiftedDown()}
          onClick=${doShiftSelectedPagesDown}
        />
        <${WAD_Icon} Icon="${IconFolder}/arrow-sm-to-bottom.png"
          enabled=${selectedPagesMayBeShiftedDown()}
          onClick=${doShiftSelectedPagesToBottom}
        />
          <${WAD_Gap}/>
        <${WAD_Icon} Icon="${IconFolder}/file-arrow-left.png"
          enabled=${selectedPages.length === 1}
          onClick=${doVisitSelectedPage}
        />
          <${WAD_Gap}/>
        <${WAD_Icon} Icon="${IconFolder}/minus.png"
          enabled=${selectedPages.length > 0}
          onClick=${doDeleteSelectedPages}
        />
      </>

      <${WAD_FlatListView} style="flex:1 1 auto"
        List=${Applet.PageList} Placeholder="(no pages)"
        ItemRenderer=${PageListItemRenderer}
        selectedIndices=${selectedPageIndices}
        SelectionLimit=${Number.MAX_SAFE_INTEGER}
        onSelectionChange=${updatePageSelection}
        onDblClick=${(Event, Index) => visitPage(Applet.Page(Index))}
      />

      <${WAD_horizontally} style="padding-top:4px">
        <${WAD_Label} style="width:56px">Page</>
        <${WAD_TextlineInput} Placeholder="(page name)" style="flex:1 0 auto"
          enabled=${selectedPages.length > 0}
          Value=${commonValueOf(selectedPages.map((Page) => Page.Name))}
          onInput=${(Event) => doConfigureSelectedPages('Name', Event.target.value)}
        />
      </>
     </>
    </>`;
}
/**** WAD_PageConfigurationPane ****/
function WAD_PageConfigurationPane() {
    const { Applet, Inspector } = DesignerState;
    if (Applet.visitedPage == null) {
        return html `<div class="WAD InspectorPane"><div style="
        flex:1 0 auto; height:40px; line-height:40px;
        font-style:italic; text-align:center
      ">(no page is currently visited)</div></div>`;
    }
    /**** remember fold expansions and scroll position ****/
    const { Expansions, toggleExpansion, ScrollPosition, updateScrollPosition, scrollablePane } = usePaneMemory('PageConfiguration');
    /**** prepare behavior-specific properties ****/
    const { visitedPage } = Applet;
    const Scope = PropertyScopeOfVisitedPage(visitedPage);
    // the scope used for table-driven property rows
    const configurableProperties = visitedPage.configurableProperties;
    let PropertyEditors = [];
    if (configurableProperties.length === 0) {
        PropertyEditors.push(html `
        <${WAD_horizontally}>
          <div style="
            flex:1 0 auto;
            height:40px; line-height:40px;
            font-style:italic; text-align:center
          ">(none)</>
        </>
      `);
    }
    else {
        PropertyEditors = configurableProperties.map((Descriptor) => html `
        <${WAD_PropertyConfigurator} Descriptor=${Descriptor}
          Enabling=${(visitedPage != null)}
          Value=${visitedPage[Descriptor.Name]}
          onInput=${(newValue) => doConfigureVisitedPage(Descriptor.Name, newValue)}
        />
      `);
    }
    /**** handle script input ****/
    const { activeScript, pendingScript, ErrorReport, ScriptError } = visitedPage;
    const ScriptIsPending = ValueIsText(pendingScript) && (pendingScript !== activeScript);
    const ReportToShow = ScriptError || ErrorReport;
    DesignerState.Inspector.ReportToShow = ReportToShow; // *C* workaround
    const setPendingScriptTo = useCallback((newScript) => {
        doConfigureVisitedPage('pendingScript', newScript);
    }, []);
    const applyPendingScript = useCallback(() => doApplyVisitedPageScript(), []);
    /**** actual rendering ****/
    return html `<div class="WAD InspectorPane">
     <${WAD_vertically} style="width:100%; height:100%; padding:4px">
      <${WAD_horizontally}>
        <${WAD_Label} style="width:56px">Page</>
        <${WAD_TextlineInput} Placeholder="(page name)" style="flex:1 0 auto"
          enabled=${visitedPage != null}
          Value=${visitedPage === null || visitedPage === void 0 ? void 0 : visitedPage.Name}
          onInput=${(Event) => doConfigureVisitedPage('Name', Event.target.value)}
        />
      </>

      <${WAD_horizontally} style="padding-top:4px">
        <${WAD_Label} style="width:52px">Behavior</>
        <${WAD_Gap}/>
        <${WAD_BehaviorDropDown}
          Value=${visitedPage.Behavior} groupedOptionList=${Applet.groupedBehaviorListOfCategory('page')}
          onInput=${(Event) => doConfigureVisitedPage('Behavior', Event.target.value)}
        />
      </>

      <${WAD_horizontally}>
        <${WAD_Label}>Synopsis</>
        <${WAD_Gap}/>
        <${WAD_Icon} Icon="${IconFolder}/circle-information.png"
          active=${DialogIsOpen('SynopsisEditor') && (DesignerState.SynopsisEditor.Scope === 'visitedPage')}
          onClick=${(Event) => toggleScopedDialog('SynopsisEditor', 'Scope', 'visitedPage', Event)}
        />
      </>

      <${WAD_TextInput} Placeholder="(enter synopsis)" style="
        padding-top:4px; min-height:60px;
      " Value=${visitedPage.Synopsis}
        onInput=${(Event) => doConfigureVisitedPage('Synopsis', Event.target.value)}
      />

      <${WAD_vertically} style="
        flex:1 1 auto; overflow-x:hidden; overflow-y:scroll; overscroll-behavior-y:contain;
        margin-top:6px;
      " ref=${scrollablePane} scrollTop=${ScrollPosition} onScroll=${updateScrollPosition}>
        <${WAD_Fold} Label="Visibility"
          Expansion=${Expansions.Visibility}
          toggleExpansion=${() => toggleExpansion('Visibility')}
        >
          <${WAD_IntegerRow} Scope=${Scope} Label="Opacity [%]"
            Property="Opacity" Minimum=${0} Maximum=${100}
          />

          <${WAD_horizontally}>
            <${WAD_Label}>Overflows</>
            <${WAD_Gap}/>
            <${WAD_DropDown} Options=${['hidden', 'scroll', 'auto']}
              Value=${visitedPage.Overflows[0]}
              onInput=${(Event) => doConfigureVisitedPage('Overflows', [
        Event.target.value, visitedPage.Overflows[1] || 'hidden'
    ])}
            />
              <div style="width:10px"/>
            <${WAD_DropDown} Options=${['hidden', 'scroll', 'auto']}
              Value=${visitedPage.Overflows[1]}
              onInput=${(Event) => doConfigureVisitedPage('Overflows', [
        visitedPage.Overflows[0] || 'hidden', Event.target.value
    ])}
            />
          </>
        </>

        <${WAD_Fold} Label="Geometry"
          Expansion=${Expansions.Geometry}
          toggleExpansion=${() => toggleExpansion('Geometry')}
        >
          <${WAD_IntegerPairRow} Scope=${Scope} Label="Position (x,y) [px]"
            Properties=${['x', 'y']} Separator="," readonly
          />
          <${WAD_IntegerPairRow} Scope=${Scope} Label="Size (w,h) [px]"
            Properties=${['Width', 'Height']} Separator="x" readonly
          />
        </>

        <${WAD_TypographySettings} Scope=${Scope}
          Expansion=${Expansions.Typography}
          toggleExpansion=${() => toggleExpansion('Typography')}
          strict
        />

        <${WAD_BackgroundSettings} Scope=${Scope}
          Expansion=${Expansions.Background}
          toggleExpansion=${() => toggleExpansion('Background')}
          strict
        />

        <${WAD_Fold} Label="Behavior-specific Settings"
          Expansion=${Expansions.BehaviorSpecific}
          toggleExpansion=${() => toggleExpansion('BehaviorSpecific')}
        >
          ${PropertyEditors}
        </>
        <${WAD_Fold} Label="Scripting"
          Expansion=${Expansions.Scripting}
          toggleExpansion=${() => toggleExpansion('Scripting')}
        >
          <${WAD_horizontally}>
            <${WAD_Label}>Script</>
              <div style="width:8px"/>
            <${WAD_Icon} Icon="${IconFolder}/square-code.png"
              active=${DialogIsOpen('ScriptEditor') && (DesignerState.ScriptEditor.Scope === 'visitedPage')}
              onClick=${(Event) => toggleScopedDialog('ScriptEditor', 'Scope', 'visitedPage', Event)}
            />
            <${WAD_Gap}/>
            <${WAD_Icon} Icon="${IconFolder}/check.png"
              enabled=${ScriptIsPending}
              onClick=${applyPendingScript}
            />
              <div style="width:8px"/>
            <${WAD_Icon} Icon="${IconFolder}/xmark.png" style="width:24px"
              enabled=${ScriptIsPending}
              onClick=${() => setPendingScriptTo('')}
            />
          </>

          <${WAD_TextInput} Placeholder="(enter script)" style="
            flex:1 0 auto; padding-top:4px; min-height:60px;
            white-space:pre;
          " Value=${pendingScript == null ? activeScript : pendingScript}
            onInput=${(Event) => setPendingScriptTo(Event.target.value)}
          />
        </>
      </>

      <${WAD_ErrorFooter} ReportToShow=${ReportToShow}
        showIcon=${ReportToShow != null} Visual=${DesignerState.Inspector}/>
     </>
    </>`;
}
/**** WAD_WidgetBrowserPane ****/
function WAD_WidgetBrowserPane() {
    const { Applet, selectedWidgets } = DesignerState;
    const visitedPage = Applet.visitedPage;
    /**** handle list item rendering and selection ****/
    const WidgetListItemRenderer = useCallback((Widget, Index, selected) => {
        const WidgetName = Widget.Name;
        if (WidgetName == null) {
            return `<span style="font-style:italic">(unnamed ${HTMLsafe(Widget.Behavior || 'widget')})</span>`;
        }
        else {
            return HTMLsafe(WidgetName);
        }
    });
    const selectedWidgetIndices = selectedWidgets.map((Widget) => Widget.Index);
    const updateWidgetSelection = useCallback((selectedIndices) => {
        const WidgetList = visitedPage.WidgetList;
        selectWidgets(selectedIndices.map((Index) => WidgetList[Index]));
    });
    /**** actual rendering ****/
    return html `<div class="WAD InspectorPane">
     <${WAD_vertically} style="width:100%; height:100%; padding:4px">
      <${WAD_horizontally}>
        <${WAD_Label} style="width:56px">Page</>
        <${WAD_TextlineInput} Placeholder="(page name)" style="flex:1 0 auto"
          enabled=${visitedPage != null}
          Value=${visitedPage === null || visitedPage === void 0 ? void 0 : visitedPage.Name}
          onInput=${(Event) => doConfigureVisitedPage('Name', Event.target.value)}
        />
      </>

      <${WAD_horizontally} style="padding-top:4px; padding-bottom:4px">
        <${WAD_BehaviorPseudoDropDown} Icon="${IconFolder}/plus.png"
          enabled=${visitedPage != null}
          groupedOptionList=${Applet.groupedBehaviorListOfCategory('widget')}
          onInput=${(Event) => {
        doCreateWidget(Event.target.value);
        Event.target.value = '-';
    }}
        />
        <${WAD_Icon} Icon="${IconFolder}/clone.png"
          enabled=${selectedWidgets.length > 0}
          onClick=${doDuplicateSelectedWidgets}
        />
          <${WAD_Gap}/>
        <${WAD_Icon} Icon="${IconFolder}/arrow-sm-to-top.png"
          enabled=${selectedWidgetsMayBeShiftedUp()}
          onClick=${doShiftSelectedWidgetsToTop}
        />
        <${WAD_Icon} Icon="${IconFolder}/arrow-sm-up.png"
          enabled=${selectedWidgetsMayBeShiftedUp()}
          onClick=${doShiftSelectedWidgetsUp}
        />
        <${WAD_Icon} Icon="${IconFolder}/arrow-sm-down.png"
          enabled=${selectedWidgetsMayBeShiftedDown()}
          onClick=${doShiftSelectedWidgetsDown}
        />
        <${WAD_Icon} Icon="${IconFolder}/arrow-sm-to-bottom.png"
          enabled=${selectedWidgetsMayBeShiftedDown()}
          onClick=${doShiftSelectedWidgetsToBottom}
        />
          <${WAD_Gap}/>
        <${WAD_Icon} Icon="${IconFolder}/minus.png"
          enabled=${selectedWidgets.length > 0}
          onClick=${doDeleteSelectedWidgets}
        />
      </>

      <${WAD_FlatListView} style="flex:1 1 auto"
        List=${(visitedPage === null || visitedPage === void 0 ? void 0 : visitedPage.WidgetList) || []} Placeholder="(no widgets)"
        ItemRenderer=${WidgetListItemRenderer}
        selectedIndices=${selectedWidgetIndices}
        SelectionLimit=${Number.MAX_SAFE_INTEGER}
        onSelectionChange=${updateWidgetSelection}
      />

      <${WAD_horizontally} style="padding-top:4px">
        <${WAD_Label} style="width:56px">Widget</>
        <${WAD_TextlineInput} Placeholder="(widget name)" style="flex:1 0 auto"
          enabled=${selectedWidgets.length > 0}
          Value=${commonValueOf(selectedWidgets.map((Widget) => Widget.Name))}
          onInput=${(Event) => doConfigureSelectedWidgets('Name', Event.target.value)}
        />
      </>
     </>
    </>`;
}
/**** WAD_WidgetConfigurationPane ****/
function WAD_WidgetConfigurationPane() {
    const { Applet, selectedWidgets, Inspector } = DesignerState;
    const visitedPage = Applet.visitedPage;
    /**** remember fold expansions and scroll position ****/
    const { Expansions, toggleExpansion, ScrollPosition, updateScrollPosition, scrollablePane } = usePaneMemory('WidgetConfiguration');
    const Scope = PropertyScopeOfSelectedWidgets(selectedWidgets);
    // the scope used for table-driven property rows
    /**** prepare behavior-specific properties ****/
    let configurableProperties = commonValueOf(selectedWidgets.map((Widget) => Widget.configurableProperties));
    if (!ValueIsList(configurableProperties)) {
        configurableProperties = [];
    }
    let PropertyEditors = [];
    if (configurableProperties.length === 0) {
        PropertyEditors.push(html `
        <${WAD_horizontally}>
          <div style="
            flex:1 0 auto;
            height:40px; line-height:40px;
            font-style:italic; text-align:center
          ">(none)</>
        </>
      `);
    }
    else {
        PropertyEditors = configurableProperties.map((Descriptor) => html `
        <${WAD_PropertyConfigurator} Descriptor=${Descriptor}
          Enabling=${selectedWidgets.length > 0}
          Value=${commonValueOf(selectedWidgets.map((Widget) => Widget[Descriptor.Name]))}
          onInput=${(newValue) => doConfigureSelectedWidgets(Descriptor.Name, newValue)}
        />
      `);
    }
    /**** handle script input ****/
    const activeScript = commonValueOf(selectedWidgets.map((Widget) => Widget.activeScript));
    const pendingScript = commonValueOf(selectedWidgets.map((Widget) => Widget.pendingScript));
    const ErrorReport = commonValueOf(selectedWidgets.map((Widget) => Widget.ErrorReport));
    const ScriptError = commonValueOf(selectedWidgets.map((Widget) => Widget.ScriptError));
    const ScriptIsPending = ValueIsText(pendingScript) && (pendingScript !== activeScript);
    let ReportToShow = ScriptError || ErrorReport;
    if (!ValueIsErrorReport(ReportToShow)) {
        ReportToShow = undefined;
    }
    DesignerState.Inspector.ReportToShow = ReportToShow; // *C* workaround
    const setPendingScriptTo = useCallback((newScript) => {
        doConfigureSelectedWidgets('pendingScript', newScript);
    }, []);
    const applyPendingScript = useCallback(() => doApplySelectedWidgetsScript(), []);
    /**** actual rendering ****/
    return html `<div class="WAD InspectorPane">
     <${WAD_vertically} style="width:100%; height:100%; padding:4px">
      <${WAD_horizontally} style="padding-top:4px">
        <${WAD_Label} style="width:52px">Name</>
        <${WAD_TextlineInput} Placeholder="(widget name)" style="flex:1 0 auto"
          enabled=${selectedWidgets.length > 0}
          Value=${commonValueOf(selectedWidgets.map((Widget) => Widget.Name))}
          onInput=${(Event) => doConfigureSelectedWidgets('Name', Event.target.value)}
        />
      </>

      <${WAD_horizontally} style="padding-top:4px">
        <${WAD_Label} style="width:52px">Behavior</>
        <${WAD_Gap}/>
        <${WAD_BehaviorDropDown}
          enabled=${false}
          Value=${commonValueOf(selectedWidgets.map((Widget) => Widget.Behavior))}
          groupedOptionList=${Applet.groupedBehaviorListOfCategory('widget')}
        />
      </>

      <${WAD_horizontally}>
        <${WAD_Label}>Synopsis</>
        <${WAD_Gap}/>
        <${WAD_Icon} Icon="${IconFolder}/circle-information.png"
          active=${DialogIsOpen('SynopsisEditor') && (DesignerState.SynopsisEditor.Scope === 'selectedWidgets')}
          onClick=${(Event) => toggleScopedDialog('SynopsisEditor', 'Scope', 'selectedWidgets', Event)}
        />
      </>

      <${WAD_TextInput} Placeholder="(enter synopsis)" style="
        padding-top:4px; min-height:60px;
      " enabled=${selectedWidgets.length > 0}
        Value=${commonValueOf(selectedWidgets.map((Widget) => Widget.Synopsis))}
        onInput=${(Event) => doConfigureSelectedWidgets('Synopsis', Event.target.value)}
      />

      <${WAD_vertically} style="
        flex:1 1 auto; overflow-x:hidden; overflow-y:scroll; overscroll-behavior-y:contain;
        margin-top:6px;
      " ref=${scrollablePane} scrollTop=${ScrollPosition} onScroll=${updateScrollPosition}>
        <${WAD_Fold} Label="Visibility and Enabling"
          Expansion=${Expansions.Visibility}
          toggleExpansion=${() => toggleExpansion('Visibility')}
        >
          <${WAD_CheckboxRow} Scope=${Scope} Label="Visibility"
            Property="Visibility"
          />
          <${WAD_CheckboxRow} Scope=${Scope} Label="Selection Lock"
            Property="Lock"
          />
          <${WAD_IntegerRow} Scope=${Scope} Label="Opacity [%]"
            Property="Opacity" Minimum=${0} Maximum=${100}
          />

          <${WAD_horizontally}>
            <${WAD_Label}>Overflows</>
            <${WAD_Gap}/>
            <${WAD_DropDown} Options=${WAT_Overflows}
              enabled=${Scope.Enabling}
              Value=${Scope.ItemOf('Overflows', 0)}
              onInput=${(Event) => patchListItem(Scope, 'Overflows', DefaultOverflows, 0)(Event.target.value)}
            />
              <div style="width:10px"/>
            <${WAD_DropDown} Options=${WAT_Overflows}
              enabled=${Scope.Enabling}
              Value=${Scope.ItemOf('Overflows', 1)}
              onInput=${(Event) => patchListItem(Scope, 'Overflows', DefaultOverflows, 1)(Event.target.value)}
            />
          </>

          <${WAD_CheckboxRow} Scope=${Scope} Label="Enabling"
            Property="Enabling" extraStyle="padding-top:4px"
          />
        </>

        <${WAD_Fold} Label="Geometry"
          Expansion=${Expansions.Geometry}
          toggleExpansion=${() => toggleExpansion('Geometry')}
        >
          <${WAD_IntegerPairRow} Scope=${Scope} Label="Position (x,y) [px]"
            Properties=${['x', 'y']} Separator=","
          />
          <${WAD_IntegerPairRow} Scope=${Scope} Label="Size (w,h) [px]"
            Properties=${['Width', 'Height']} Separator="x"
          />

          <${WAD_horizontally} style="padding-top:4px">
            <${WAD_Icon} Icon="${IconFolder}/arrows-left-right.png" style="width:24px"/>
            <${WAD_Gap}/>
            <${WAD_DropDown} style="width:104px"
              enabled=${selectedWidgets.length > 0}
              Value=${commonValueOf(selectedWidgets.map((Widget) => Widget.Anchors[0]))}
              Options=${['left-width', 'left-right', 'width-right']}
              onInput=${(Event) => doConfigureSelectedWidgets('Anchors_0', Event.target.value)}
            />
              <div style="width:8px"/>
            <${WAD_IntegerInput} style="width:60px"
              enabled=${selectedWidgets.length > 0}
              Value=${commonValueOf(selectedWidgets.map((Widget) => Widget.Offsets[0]))}
              onInput=${(Event) => doConfigureSelectedWidgets('Offsets_0', parseFloat(Event.target.value))}
            />
              <div style="width:20px; padding-top:4px; text-align:center">,</div>
            <${WAD_IntegerInput} style="width:60px"
              enabled=${selectedWidgets.length > 0}
              Value=${commonValueOf(selectedWidgets.map((Widget) => Widget.Offsets[1]))}
              onInput=${(Event) => doConfigureSelectedWidgets('Offsets_1', parseFloat(Event.target.value))}
            />
          </>

          <${WAD_horizontally}>
            <${WAD_Icon} Icon="${IconFolder}/arrows-up-down.png" style="width:24px"/>
            <${WAD_Gap}/>
            <${WAD_DropDown} style="width:104px"
              enabled=${selectedWidgets.length > 0}
              Value=${commonValueOf(selectedWidgets.map((Widget) => Widget.Anchors[1]))}
              Options=${['top-height', 'top-bottom', 'height-bottom']}
              onInput=${(Event) => doConfigureSelectedWidgets('Anchors_1', Event.target.value)}
            />
              <div style="width:8px"/>
            <${WAD_IntegerInput} style="width:60px"
              enabled=${selectedWidgets.length > 0}
              Value=${commonValueOf(selectedWidgets.map((Widget) => Widget.Offsets[2]))}
              onInput=${(Event) => doConfigureSelectedWidgets('Offsets_2', parseFloat(Event.target.value))}
            />
              <div style="width:20px; padding-top:4px; text-align:center">,</div>
            <${WAD_IntegerInput} style="width:60px"
              enabled=${selectedWidgets.length > 0}
              Value=${commonValueOf(selectedWidgets.map((Widget) => Widget.Offsets[3]))}
              onInput=${(Event) => doConfigureSelectedWidgets('Offsets_3', parseFloat(Event.target.value))}
            />
          </>

          <${WAD_LabelRow} Label="Limits"/>
          <${WAD_IntegerPairRow} Scope=${Scope} Label="min. Size (w,h) [px]" indented
            Properties=${['minWidth', 'minHeight']} Separator="x"
          />
          <${WAD_IntegerPairRow} Scope=${Scope} Label="max. Size (w,h) [px]" indented
            Properties=${['maxWidth', 'maxHeight']} Separator="x"
          />
        </>

        <${WAD_TypographySettings} Scope=${Scope}
          Expansion=${Expansions.Typography}
          toggleExpansion=${() => toggleExpansion('Typography')}
          unified withTextDecoration
        />

        <${WAD_BackgroundSettings} Scope=${Scope}
          Expansion=${Expansions.Background}
          toggleExpansion=${() => toggleExpansion('Background')}
        />

        <${WAD_Fold} Label="Border"
          Expansion=${Expansions.Border}
          toggleExpansion=${() => toggleExpansion('Border')}
        >
          <${WAD_LabelRow} Label="Border Lines"/>
          <${WAD_BorderLineRow} Scope=${Scope} Label="top"    Index=${0}/>
          <${WAD_BorderLineRow} Scope=${Scope} Label="right"  Index=${1}/>
          <${WAD_BorderLineRow} Scope=${Scope} Label="bottom" Index=${2}/>
          <${WAD_BorderLineRow} Scope=${Scope} Label="left"   Index=${3}/>

          <${WAD_LabelRow} Label="Border Radii [px]"/>
          <${WAD_IntegerPairRow} Scope=${Scope} Label="top-left/right" indented
            Property="BorderRadii" Indices=${[0, 1]} Defaults=${DefaultBorderRadii}
            Separator="," Minimum=${0}
          />
          <${WAD_IntegerPairRow} Scope=${Scope} Label="bottom-left/right" indented
            Property="BorderRadii" Indices=${[3, 2]} Defaults=${DefaultBorderRadii}
            Separator="," Minimum=${0}
          />
        </>
        <${WAD_BoxShadowSettings} Scope=${Scope}
          Expansion=${Expansions.Shadow}
          toggleExpansion=${() => toggleExpansion('Shadow')}
        />

        <${WAD_Fold} Label="Cursor"
          Expansion=${Expansions.Cursor}
          toggleExpansion=${() => toggleExpansion('Cursor')}
        >
          <${WAD_DropDownRow} Scope=${Scope} Label="Cursor Type"
            Property="Cursor" Options=${WAT_Cursors}
          />
        </>

        <${WAD_Fold} Label="Behavior-specific Settings"
          Expansion=${Expansions.BehaviorSpecific}
          toggleExpansion=${() => toggleExpansion('BehaviorSpecific')}
        >
          ${PropertyEditors}
        </>
        <${WAD_Fold} Label="Scripting"
          Expansion=${Expansions.Scripting}
          toggleExpansion=${() => toggleExpansion('Scripting')}
        >
          <${WAD_horizontally}>
            <${WAD_Label}>Script</>
              <div style="width:8px"/>
            <${WAD_Icon} Icon="${IconFolder}/square-code.png"
              active=${DialogIsOpen('ScriptEditor') && (DesignerState.ScriptEditor.Scope === 'selectedWidgets')}
              onClick=${(Event) => toggleScopedDialog('ScriptEditor', 'Scope', 'selectedWidgets', Event)}
            />
            <${WAD_Gap}/>
            <${WAD_Icon} Icon="${IconFolder}/check.png"
              enabled=${ScriptIsPending}
              onClick=${applyPendingScript}
            />
              <div style="width:8px"/>
            <${WAD_Icon} Icon="${IconFolder}/xmark.png" style="width:24px"
              enabled=${ScriptIsPending}
              onClick=${() => setPendingScriptTo('')}
            />
          </>

          <${WAD_TextInput} Placeholder="(enter script)" style="
            flex:1 0 auto; padding-top:4px; min-height:60px;
            white-space:pre;
          " Value=${pendingScript == null ? activeScript : pendingScript}
            onInput=${(Event) => setPendingScriptTo(Event.target.value)}
          />
        </>
      </>

      <${WAD_ErrorFooter} ReportToShow=${ReportToShow}
        showIcon=${ReportToShow != null} Visual=${DesignerState.Inspector}/>
     </>
    </>`;
}
//------------------------------------------------------------------------------
//--                            WAD_SettingsDialog                            --
//------------------------------------------------------------------------------
function WAD_SettingsDialog() {
    const onClose = useCallback(() => closeDialog('SettingsDialog'));
    const [BrokerURL, setBrokerURL] = useState(MCPConnector.URL);
    const [AccessToken, setAccessToken] = useState(MCPConnector.Token);
    const [TokenShallBeKept, setTokenShallBeKept] = useState(MCPConnector.TokenIsKept);
    const doConnect = useCallback(() => {
        MCPConnector.configure(BrokerURL.trim(), AccessToken.trim(), TokenShallBeKept);
    });
    const doDisconnect = useCallback(() => {
        MCPConnector.disconnect(); // also stops any auto-reconnection loop
    });
    const isConnected = MCPConnector.isConnected;
    const isConnecting = MCPConnector.isConnecting; // opening or awaiting a retry
    const ButtonIsEnabled = (isConnected ? true : (!isConnecting) && (BrokerURL.trim() !== ''));
    const ConnectionState = (isConnected ? 'connected' :
        MCPConnector.lastError != null ? `error: ${MCPConnector.lastError}` :
            isConnecting ? 'connecting…' :
                MCPConnector.URL === '' ? 'not configured' : 'disconnected');
    return html `<${WAD_Dialog} Name="SettingsDialog" resizable=${true}
      onClose=${onClose}
    >
     <${WAD_vertically} style="width:100%; height:100%; padding:4px; gap:4px">
       <${WAD_Label}><b>MCP Broker</b> (for AI assistants)</>

       <${WAD_Label}>Broker WebSocket URL</>
       <${WAD_TextlineInput} style="flex:0 0 auto"
         Value=${BrokerURL} Placeholder="ws://localhost:3461/wat"
         onInput=${(Event) => setBrokerURL(Event.target.value)}
       />

       <${WAD_Label}>Access Token</>
       <${WAD_TextlineInput} Type="password" style="flex:0 0 auto"
         Value=${AccessToken} Placeholder="secret token"
         onInput=${(Event) => setAccessToken(Event.target.value)}
       />

       <${WAD_horizontally}>
         <${WAD_Label}>remember Token permanently</>
         <${WAD_Gap}/>
         <${WAD_Checkbox}
           Value=${TokenShallBeKept}
           onInput=${(Event) => setTokenShallBeKept(Event.target.checked)}
         />
       </>

       <${WAD_Gap}/>

       <${WAD_horizontally} style="gap:4px">
         <${WAD_Gap}/>
         <${WAD_Button} style="width:100px"
           enabled=${ButtonIsEnabled}
           onClick=${isConnected ? doDisconnect : doConnect}
         >${isConnected ? 'Disconnect' : 'Connect'}</>
       </>

       <${WAD_horizontalSeparator}/>

       <${WAD_Label} style="
         display:block; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;
       ">${ConnectionState}</>
     </>
    </>`;
}
DesignerState.SettingsDialog.View = WAD_SettingsDialog;
//------------------------------------------------------------------------------
//--                            WAD_BehaviorEditor                            --
//------------------------------------------------------------------------------
function WAD_BehaviorEditor() {
    const onClose = useCallback(() => closeDialog('BehaviorEditor'));
    const { Applet, selectedCategory, selectedBehavior } = DesignerState;
    let activeScript, pendingScript;
    let ErrorReport, ScriptError;
    ({
        activeScript, pendingScript, ErrorReport, ScriptError
    } = (Applet._BehaviorPool[selectedCategory][(selectedBehavior || '').toLowerCase()] || {}));
    const ScriptIsPending = ValueIsText(pendingScript) && (pendingScript !== activeScript);
    const ReportToShow = ScriptError || ErrorReport;
    DesignerState.BehaviorEditor.ReportToShow = ReportToShow; // *C* workaround
    const FieldContainer = useAppliedPendingSelection(DesignerState.BehaviorEditor);
    const setPendingScriptTo = useCallback((newScript) => {
        doConfigureSelectedBehavior('pendingScript', newScript);
    }, []);
    const applyPendingScript = useCallback(() => {
        doApplyBehaviorScript();
    }, []);
    return html `<${WAD_Dialog} Name="BehaviorEditor" resizable=${true}
      onClose=${onClose}
    >
     <${WAD_vertically} style="width:100%; height:100%; padding:4px">
      <${WAD_horizontally}>
        <${WAD_Label} style="width:60px">Category</>
          <div style="width:8px"/>
        <${WAD_DropDown}
          enabled=${false}
          Value=${selectedCategory} Options=${['applet', 'page', 'widget']}
        />
      </>

      <${WAD_horizontally}>
        <${WAD_Label} style="width:60px">Behavior</>
          <div style="width:8px"/>
        <${WAD_TextlineInput} Placeholder="(behavior name)" style="flex:1 0 auto"
          Value=${(Applet._BehaviorPool[selectedCategory][(selectedBehavior || '').toLowerCase()] || {}).Name}
          onInput=${(Event) => {
        doConfigureSelectedBehavior('Name', Event.target.value);
        WAT_rerender();
    }}
        />
          <div style="width:20px"/>
        <${WAD_Icon} Icon="${IconFolder}/check.png"
          enabled=${ScriptIsPending && !BehaviorIsIntrinsic(DesignerState.selectedBehavior)}
          onClick=${applyPendingScript}
        />
          <div style="width:8px"/>
        <${WAD_Icon} Icon="${IconFolder}/xmark.png" style="width:24px"
          enabled=${ScriptIsPending && !BehaviorIsIntrinsic(DesignerState.selectedBehavior)}
          onClick=${() => setPendingScriptTo('')}
        />
      </>

      <div ref=${FieldContainer} style="display:contents">
        <${WAD_TextInput} Placeholder="(enter script)" LineWrapping=${true} style="
          flex:1 0 auto; padding-top:4px;
        " Value=${pendingScript == null ? activeScript : pendingScript}
          onInput=${(Event) => setPendingScriptTo(Event.target.value)}
        />
      </>

      <${WAD_ErrorFooter} ReportToShow=${ReportToShow} Visual=${DesignerState.BehaviorEditor}/>
     </>
    </>`;
}
DesignerState.BehaviorEditor.View = WAD_BehaviorEditor;
//------------------------------------------------------------------------------
//--                            WAD_SynopsisEditor                            --
//------------------------------------------------------------------------------
function WAD_SynopsisEditor() {
    var _a;
    const onClose = useCallback(() => closeDialog('SynopsisEditor'));
    const { Applet } = DesignerState;
    let Synopsis;
    const { Scope } = DesignerState.SynopsisEditor;
    switch (Scope) {
        case 'Applet':
            Synopsis = Applet.Synopsis;
            break;
        case 'visitedPage':
            Synopsis = (_a = Applet.visitedPage) === null || _a === void 0 ? void 0 : _a.Synopsis;
            break;
        case 'selectedWidgets':
            const { selectedWidgets } = DesignerState;
            Synopsis = commonValueOf(selectedWidgets.map((Widget) => Widget.Synopsis));
            break;
    }
    const FieldContainer = useAppliedPendingSelection(DesignerState.SynopsisEditor);
    const setScopeTo = useCallback((newScope) => {
        DesignerState.SynopsisEditor.Scope = newScope;
        WAT_rerender();
    }, []);
    const setSynopsisTo = useCallback((newSynopsis) => {
        switch (DesignerState.SynopsisEditor.Scope) {
            case 'Applet': return doConfigureApplet('Synopsis', newSynopsis);
            case 'visitedPage': return doConfigureVisitedPage('Synopsis', newSynopsis);
            case 'selectedWidgets': return doConfigureSelectedWidgets('Synopsis', newSynopsis);
        }
    }, []);
    return html `<${WAD_Dialog} Name="SynopsisEditor" resizable=${true}
      onClose=${onClose}
    >
     <${WAD_vertically} style="width:100%; height:100%; padding:4px">
      <${WAD_horizontally}>
        <${WAD_Label}>Scope</>
          <div style="width:8px"/>
        <${WAD_DropDown}
          Value=${Scope} Options=${['Applet', 'visitedPage', 'selectedWidgets']}
          onInput=${(Event) => setScopeTo(Event.target.value)}
        />
      </>

      <div ref=${FieldContainer} style="display:contents">
        <${WAD_TextInput} Placeholder="(enter synopsis)" LineWrapping=${true} style="
          flex:1 0 auto; padding-top:4px;
        " Value=${Synopsis}
          onInput=${(Event) => setSynopsisTo(Event.target.value)}
        />
      </>
     </>
    </>`;
}
DesignerState.SynopsisEditor.View = WAD_SynopsisEditor;
//------------------------------------------------------------------------------
//--                             WAD_ValueEditor                              --
//------------------------------------------------------------------------------
/**** ValueTypeForEditorType ****/
const ValueTypeForEditorType = {
    'textline-input': 'textline', 'password-input': 'textline',
    'search-input': 'textline', 'phone-number-input': 'textline',
    'email-address-input': 'textline', 'url-input': 'textline',
    'color-input': 'textline', 'drop-down': 'textline',
    'number-input': 'number', 'integer-input': 'number',
    'slider': 'number',
    'text-input': 'text', 'html-input': 'text',
    'css-input': 'text', 'javascript-input': 'text',
    'json-input': 'text',
    'linelist-input': 'linelist', 'numberlist-input': 'numberlist',
};
/**** ValueCodecForValueType ****/
const ValueCodecForValueType = {
    textline: {
        encoded: (Value) => acceptableValue(Value, ValueIsTextline, ''),
        decoded: (Value) => Value.split('\n')[0]
    },
    number: {
        encoded: (Value) => acceptableValue(Value, ValueIsNumber, 0) + '',
        decoded: (Value) => Number(Value)
    },
    text: {
        encoded: (Value) => acceptableValue(Value, ValueIsText, ''),
        decoded: (Value) => Value
    },
    linelist: {
        encoded: (Value) => acceptableValue(Value, ValueIsLineList, []).join('\n'),
        decoded: (Value) => Value.split('\n')
    },
    numberlist: {
        encoded: (Value) => acceptableValue(Value, ValueIsNumberList, []).join('\n'),
        decoded: (Value) => Value.split('\n').map(Number).filter((Value) => !isNaN(Value))
    },
};
/**** WAD_ValueEditor ****/
function WAD_ValueEditor() {
    const onClose = useCallback(() => closeDialog('ValueEditor'));
    const { selectedWidgets } = DesignerState;
    let enabled = (selectedWidgets.length > 0);
    let EditorType = commonValueOf(selectedWidgets.map((Widget) => {
        var _a;
        return (_a = Widget.configurableProperty('Value')) === null || _a === void 0 ? void 0 : _a.EditorType;
    }));
    let ValueType = ValueTypeForEditorType[EditorType];
    enabled = enabled && (ValueType != null);
    const ValueCodec = ValueCodecForValueType[ValueType];
    let ValueToEdit = commonValueOf(selectedWidgets.map((Widget) => Widget.Value));
    switch (true) {
        case (ValueToEdit == null):
        case (ValueToEdit === multipleValues):
        case (ValueToEdit === noSelection):
            break; // editor will be disabled anyway
        default:
            ValueToEdit = (ValueCodec == null ? '' : ValueCodec.encoded(ValueToEdit));
    }
    function _onValueInput(Event) {
        const editedValue = Event.target.value;
        const Value = (ValueCodec == null ? editedValue : ValueCodec.decoded(editedValue));
        doConfigureSelectedWidgets('Value', Value);
    }
    const FieldContainer = useAppliedPendingSelection(DesignerState.ValueEditor);
    return html `<${WAD_Dialog} Name="ValueEditor" resizable=${true}
      onClose=${onClose}
    >
     <${WAD_vertically} style="width:100%; height:100%; padding:4px">
      <${WAD_horizontally}>
        <${WAD_Label} style="width:52px">Visual</>
        <${WAD_TextlineInput} Placeholder="(visual name)" style="flex:1 0 auto"
          enabled=${selectedWidgets.length > 0}
          Value=${commonValueOf(selectedWidgets.map((Widget) => Widget.Name))}
          onInput=${(Event) => doConfigureSelectedWidgets('Name', Event.target.value)}
        />
      </>
      <div ref=${FieldContainer} style="display:contents">
        <${WAD_TextInput} Placeholder="(enter value)" style="flex:1 0 auto; padding-top:4px"
          enabled=${enabled}
          Value=${ValueToEdit} onInput=${_onValueInput}
        />
      </>
     </>
    </>`;
}
DesignerState.ValueEditor.View = WAD_ValueEditor;
//------------------------------------------------------------------------------
//--                             WAD_ScriptEditor                             --
//------------------------------------------------------------------------------
function WAD_ScriptEditor() {
    const onClose = useCallback(() => closeDialog('ScriptEditor'));
    const { Applet } = DesignerState;
    let activeScript, pendingScript;
    let ErrorReport, ScriptError;
    // "activeScript" always exists, "pendingScript" may be missing
    const { Scope } = DesignerState.ScriptEditor;
    switch (Scope) {
        case 'Applet':
            ;
            ({ activeScript, pendingScript, ErrorReport, ScriptError } = Applet);
            break;
        case 'visitedPage':
            ;
            ({ activeScript, pendingScript, ErrorReport, ScriptError } = Applet.visitedPage);
            break;
        case 'selectedWidgets':
            const { selectedWidgets } = DesignerState;
            activeScript = commonValueOf(selectedWidgets.map((Widget) => Widget.activeScript));
            pendingScript = commonValueOf(selectedWidgets.map((Widget) => Widget.pendingScript));
            ErrorReport = commonValueOf(selectedWidgets.map((Widget) => Widget.ErrorReport));
            ScriptError = commonValueOf(selectedWidgets.map((Widget) => Widget.ScriptError));
            break;
    }
    const ScriptIsPending = ValueIsText(pendingScript) && (pendingScript !== activeScript);
    const ReportToShow = ScriptError || ErrorReport;
    DesignerState.ScriptEditor.ReportToShow = ReportToShow; // *C* workaround
    const FieldContainer = useAppliedPendingSelection(DesignerState.ScriptEditor);
    const setScopeTo = useCallback((newScope) => {
        DesignerState.ScriptEditor.Scope = newScope;
        WAT_rerender();
    }, []);
    const setPendingScriptTo = useCallback((newScript) => {
        switch (DesignerState.ScriptEditor.Scope) {
            case 'Applet': return doConfigureApplet('pendingScript', newScript);
            case 'visitedPage': return doConfigureVisitedPage('pendingScript', newScript);
            case 'selectedWidgets': return doConfigureSelectedWidgets('pendingScript', newScript);
        }
    }, []);
    const applyPendingScript = useCallback(() => {
        switch (DesignerState.ScriptEditor.Scope) {
            case 'Applet': return doApplyAppletScript();
            case 'visitedPage': return doApplyVisitedPageScript();
            case 'selectedWidgets': return doApplySelectedWidgetsScript();
        }
    }, []);
    return html `<${WAD_Dialog} Name="ScriptEditor" resizable=${true}
      onClose=${onClose}
    >
     <${WAD_vertically} style="width:100%; height:100%; padding:4px">
      <${WAD_horizontally}>
        <${WAD_Label}>Scope</>
          <div style="width:8px"/>
        <${WAD_DropDown}
          Value=${Scope} Options=${['Applet', 'visitedPage', 'selectedWidgets']}
          onInput=${(Event) => setScopeTo(Event.target.value)}
        />
          <${WAD_Gap}/>
        <${WAD_Icon} Icon="${IconFolder}/check.png"
          enabled=${ScriptIsPending}
          onClick=${applyPendingScript}
        />
          <div style="width:8px"/>
        <${WAD_Icon} Icon="${IconFolder}/xmark.png" style="width:24px"
          enabled=${ScriptIsPending}
          onClick=${() => setPendingScriptTo('')}
        />
      </>

      <div ref=${FieldContainer} style="display:contents">
        <${WAD_TextInput} Placeholder="(enter script)" LineWrapping=${true} style="
          flex:1 0 auto; padding-top:4px;
        " Value=${pendingScript == null ? activeScript : pendingScript}
          onInput=${(Event) => setPendingScriptTo(Event.target.value)}
        />
      </>

      <${WAD_ErrorFooter} ReportToShow=${ReportToShow} Visual=${DesignerState.ScriptEditor}/>
     </>
    </>`;
}
DesignerState.ScriptEditor.View = WAD_ScriptEditor;
//------------------------------------------------------------------------------
//--                            WAD_CodeAssistant                             --
//------------------------------------------------------------------------------
function WAD_CodeAssistant() {
    const onClose = useCallback(() => closeDialog('CodeAssistant'));
    const { Applet } = DesignerState;
    return html `<${WAD_Dialog} Name="CodeAssistant" resizable=${true}
      onClose=${onClose}
    >
     <${WAD_vertically} style="width:100%; height:100%; padding:4px">

     </>
    </>`;
}
DesignerState.CodeAssistant.View = WAD_CodeAssistant;
//------------------------------------------------------------------------------
//--                             WAD_SearchDialog                             --
//------------------------------------------------------------------------------
function WAD_SearchDialog() {
    const onClose = useCallback(() => closeDialog('SearchDialog'));
    const [activeTab, activateTab] = useState('Input');
    return html `<${WAD_Dialog} Name="SearchDialog" resizable=${true}
      onClose=${onClose}
    >
     <${WAD_vertically} style="width:100%; height:100%; padding:4px">
      <${WAD_horizontally} style="border-bottom:solid 1px rgb(126,136,136)">
        <${WAD_TextlineTab} Label="Input" active=${activeTab === 'Input'}
          onClick=${() => activateTab('Input')}
        />
        <${WAD_TextlineTab} Label="Output" active=${activeTab === 'Output'}
          onClick=${() => activateTab('Output')}
        />
      </>

      ${(activeTab === 'Input') && html `<${WAD_SearchInputPane}/>`}
      ${(activeTab === 'Output') && html `<${WAD_SearchOutputPane}/>`}
     </>
    </>`;
}
DesignerState.SearchDialog.View = WAD_SearchDialog;
//------------------------------------------------------------------------------
//--                           WAD_SearchInputPane                            --
//------------------------------------------------------------------------------
// laid out as a two-column JCL "tabular": labels on the left, controls on the
// right - the label column shrinks to its widest entry, the control column
// takes the remaining width. continuation rows get an empty left cell
function WAD_SearchInputPane() {
    const Criteria = DesignerState.SearchDialog;
    function set(FieldName, Value) {
        Criteria[FieldName] = Value;
        WAT_rerender();
    }
    return html `<${WAD_vertically} style="width:100%; height:100%; padding:4px; overflow-y:auto">
      <${JCL_ui.tabular} Columns=${2} ColGap=${6} RowGap=${0}
        ColumnClasses="shrinking expanding" Style="width:100%"
      >
        <${WAD_Label} style="margin:2px 0px">for:</>
        <${WAD_horizontally} style="margin:0px">
          <${WAD_TextlineInput} Type="search" style="flex:1 0 auto"
            Placeholder="search phrase" Value=${Criteria.SearchPhrase}
            onInput=${(Event) => set('SearchPhrase', Event.target.value)}
          />
        </>

        <${WAD_Label} style="margin:2px 0px">matching:</>
        <${WAD_horizontally} style="margin:0px">
          <${WAD_DropDown} style="flex:1 0 auto"
            Value=${Criteria.MatchMode}
            Options=${['whole phrase', 'all words', 'any word', 'regular expression']}
            onInput=${(Event) => set('MatchMode', Event.target.value)}
          />
        </>

        <${WAD_Label} style="margin:2px 0px">case:</>
        <${WAD_horizontally} style="margin:0px">
          <${WAD_DropDown} style="flex:1 0 auto"
            Value=${Criteria.CaseMode} Options=${['sensitively', 'insensitively']}
            onInput=${(Event) => set('CaseMode', Event.target.value)}
          />
        </>

        <${WAD_Label} style="margin:2px 0px; padding-top:6px">in:</>
        <${WAD_horizontally} style="margin:0px">
          <${WAD_Checkbox} Value=${Criteria.NameIsChecked}
            onInput=${(Event) => set('NameIsChecked', Event.target.checked)}
          />
          <${WAD_Label}>Name</>
          <${WAD_Checkbox} Value=${Criteria.BehaviorNameIsChecked}
            onInput=${(Event) => set('BehaviorNameIsChecked', Event.target.checked)}
          />
          <${WAD_Label}>Behavior</>
        </>

        <div/>
        <${WAD_horizontally} style="margin:0px">
          <${WAD_Checkbox} Value=${Criteria.SynopsisIsChecked}
            onInput=${(Event) => set('SynopsisIsChecked', Event.target.checked)}
          />
          <${WAD_Label}>Synopsis</>
          <${WAD_Checkbox} Value=${Criteria.ScriptIsChecked}
            onInput=${(Event) => set('ScriptIsChecked', Event.target.checked)}
          />
          <${WAD_Label}>Script</>
        </>

        <div/>
        <${WAD_horizontally} style="margin:0px">
          <${WAD_Checkbox} Value=${Criteria.PropertyIsChecked}
            onInput=${(Event) => set('PropertyIsChecked', Event.target.checked)}
          />
          <${WAD_Label}>custom Properties</>
        </>

        <div/>
        <${WAD_horizontally} style="margin:0px">
          <div style="width:30px"/>
          <${WAD_Radiobutton} enabled=${Criteria.PropertyIsChecked}
            Value=${Criteria.PropertyScope === 'all'} onInput=${() => set('PropertyScope', 'all')}
          />
          <${WAD_Label}>all</>
        </>

        <div/>
        <${WAD_horizontally} style="margin:0px">
          <div style="width:30px"/>
          <${WAD_Radiobutton} enabled=${Criteria.PropertyIsChecked}
            Value=${Criteria.PropertyScope === 'given'} onInput=${() => set('PropertyScope', 'given')}
          />
          <${WAD_TextlineInput} style="flex:1 0 auto"
            enabled=${Criteria.PropertyIsChecked && (Criteria.PropertyScope === 'given')}
            Placeholder="(enter property names)" Value=${Criteria.PropertyNames}
            onInput=${(Event) => set('PropertyNames', Event.target.value)}
          />
        </>

        <${WAD_Label} style="margin:2px 0px; padding-top:6px">within:</>
        <${WAD_horizontally} style="margin:0px">
          <${WAD_Radiobutton} Value=${Criteria.Scope === 'applet'} onInput=${() => set('Scope', 'applet')}/>
          <${WAD_Label}>whole applet</>
        </>

        <div/>
        <${WAD_horizontally} style="margin:0px">
          <${WAD_Radiobutton} Value=${Criteria.Scope === 'parts'} onInput=${() => set('Scope', 'parts')}/>
          <${WAD_Label}>these parts of an applet</>
        </>

        <div/>
        <${WAD_horizontally} style="margin:0px">
          <${WAD_Checkbox}
            enabled=${Criteria.Scope === 'parts'} Value=${Criteria.BehaviorIsChecked}
            onInput=${(Event) => set('BehaviorIsChecked', Event.target.checked)}
          />
          <${WAD_Label}>behaviors</>
            <${WAD_Gap}/>
          <${WAD_DropDown} style="width:100px"
            enabled=${(Criteria.Scope === 'parts') && Criteria.BehaviorIsChecked}
            Value=${Criteria.BehaviorScope} Options=${['all', 'selected']}
            onInput=${(Event) => set('BehaviorScope', Event.target.value)}
          />
        </>

        <div/>
        <${WAD_horizontally} style="margin:0px">
          <${WAD_Checkbox}
            enabled=${Criteria.Scope === 'parts'} Value=${Criteria.PageIsChecked}
            onInput=${(Event) => set('PageIsChecked', Event.target.checked)}
          />
          <${WAD_Label}>pages</>
            <${WAD_Gap}/>
          <${WAD_DropDown} style="width:100px"
            enabled=${(Criteria.Scope === 'parts') && Criteria.PageIsChecked}
            Value=${Criteria.PageScope} Options=${['all', 'selected', 'active']}
            onInput=${(Event) => set('PageScope', Event.target.value)}
          />
        </>

        <div/>
        <${WAD_horizontally} style="margin:0px">
          <${WAD_Checkbox}
            enabled=${Criteria.Scope === 'parts'} Value=${Criteria.WidgetIsChecked}
            onInput=${(Event) => set('WidgetIsChecked', Event.target.checked)}
          />
          <${WAD_Label}>widgets</>
            <${WAD_Gap}/>
          <${WAD_DropDown} style="width:100px"
            enabled=${(Criteria.Scope === 'parts') && Criteria.WidgetIsChecked}
            Value=${Criteria.WidgetScope} Options=${['all', 'selected']}
            onInput=${(Event) => set('WidgetScope', Event.target.value)}
          />
        </>
      </>
     </>`;
}
//------------------------------------------------------------------------------
//--                           WAD_SearchOutputPane                           --
//------------------------------------------------------------------------------
function WAD_SearchOutputPane() {
    const { Applet } = DesignerState;
    const SearchState = DesignerState.SearchDialog;
    const Criteria = Object.assign(Object.assign({}, SearchState), { SelectedBehaviorCategory: DesignerState.selectedCategory, SelectedBehaviorName: DesignerState.selectedBehavior, SelectedPages: DesignerState.selectedPages, SelectedWidgets: DesignerState.selectedWidgets });
    const Matches = Applet.search(Criteria);
    const Tree = displayTreeFor(Matches);
    const onExpansionChange = useCallback((newExpandedPaths) => {
        SearchState.expandedPaths = newExpandedPaths;
        WAT_rerender();
    }, []);
    const onSelectionChange = useCallback((newSelectedPaths) => {
        SearchState.selectedPaths = newSelectedPaths;
        WAT_rerender();
    }, []);
    const onItemSelected = useCallback((Item, Path) => {
        const Match = matchAtPath(Tree, Path);
        if (Match != null) {
            selectMatch(Applet, Match);
        }
    });
    const onItemDblClick = useCallback((Item, Path, Event) => {
        const Match = matchAtPath(Tree, Path);
        if (Match != null) {
            openEditorForMatch(Applet, Match, Event);
        }
    });
    return html `<${WAD_vertically} style="width:100%; height:100%; padding:4px">
      <${WAD_NestedListView} style="flex:1 1 auto"
        List=${Tree} Placeholder="(no matches)"
        LabelOfItem=${(Item) => HTMLsafe(Item.Label)}
        ContentListOfItem=${(Item) => Item.Content}
        expandedPaths=${SearchState.expandedPaths} onExpansionChange=${onExpansionChange}
        selectedPaths=${SearchState.selectedPaths} SelectionLimit=${1}
        onSelectionChange=${onSelectionChange} onItemSelected=${onItemSelected}
        onDblClick=${onItemDblClick}
      />
    </>`;
}
//------------------------------------------------------------------------------
//--                        search result navigation                         --
//------------------------------------------------------------------------------
function displayTreeFor(Matches) {
    const GroupLabelOf = {
        behavior: 'Behaviors', page: 'Pages', widget: 'Widgets (on active Page)'
    };
    const Tree = [];
    const GroupNodeOf = Object.create(null);
    const ItemNodeOf = Object.create(null);
    Matches.forEach((Match) => {
        const GroupLabel = GroupLabelOf[Match.Type];
        if (GroupNodeOf[GroupLabel] == null) {
            GroupNodeOf[GroupLabel] = { Label: GroupLabel, Content: [] };
            Tree.push(GroupNodeOf[GroupLabel]);
        }
        const ItemKey = Match.Type + '|' + Match.Path;
        if (ItemNodeOf[ItemKey] == null) {
            ItemNodeOf[ItemKey] = { Label: Match.Path, Content: [] };
            GroupNodeOf[GroupLabel].Content.push(ItemNodeOf[ItemKey]);
        }
        ItemNodeOf[ItemKey].Content.push({ Label: Match.Property, Match });
    });
    return Tree;
}
function matchAtPath(Tree, Path) {
    if (Path.length < 3) {
        return undefined;
    }
    return Tree[Path[0]].Content[Path[1]].Content[Path[2]].Match;
}
function pageAtSearchPath(Applet, Path) {
    return (/^#\d+$/.test(Path) ? Applet.PageAt(parseInt(Path.slice(1), 10)) : Applet.PageNamed(Path));
}
function behaviorAtSearchPath(Applet, Path) {
    const Key = Path.toLowerCase();
    for (const Category of ['applet', 'page', 'widget']) {
        // @ts-ignore TS7053 allow indexing
        const Registration = Applet.BehaviorSet[Category][Key];
        if (Registration != null) {
            return { Category, Registration };
        }
    }
    return undefined;
}
function selectMatch(Applet, Match) {
    switch (Match.Type) {
        case 'behavior':
            const Found = behaviorAtSearchPath(Applet, Match.Path);
            if (Found != null) {
                DesignerState.selectedCategory = Found.Category;
                DesignerState.selectedBehavior = Found.Registration.Name;
                WAT_rerender();
            }
            break;
        case 'page':
            const Page = pageAtSearchPath(Applet, Match.Path);
            if (Page != null) {
                Applet.visitPage(Page);
                selectPages([Page]);
            }
            break;
        case 'widget':
            const Widget = Applet.WidgetAtPath(Match.Path);
            if (Widget != null) {
                if (Applet.visitedPage !== Widget.Page) {
                    Applet.visitPage(Widget.Page);
                }
                selectWidgets([Widget]);
            }
            break;
    }
}
function openEditorForMatch(Applet, Match, Event) {
    selectMatch(Applet, Match);
    switch (Match.Type) {
        case 'behavior':
            DesignerState.BehaviorEditor.PendingSelection = Match.Selection;
            toggleScopedDialog('BehaviorEditor', 'Category', DesignerState.selectedCategory, Event);
            break;
        case 'page':
            switch (Match.Property) {
                case 'Script':
                case 'pendingScript':
                    DesignerState.ScriptEditor.PendingSelection = Match.Selection;
                    toggleScopedDialog('ScriptEditor', 'Scope', 'visitedPage', Event);
                    break;
                case 'Synopsis':
                    DesignerState.SynopsisEditor.PendingSelection = Match.Selection;
                    toggleScopedDialog('SynopsisEditor', 'Scope', 'visitedPage', Event);
                    break;
            }
            break;
        case 'widget':
            switch (Match.Property) {
                case 'Script':
                case 'pendingScript':
                    DesignerState.ScriptEditor.PendingSelection = Match.Selection;
                    toggleScopedDialog('ScriptEditor', 'Scope', 'selectedWidgets', Event);
                    break;
                case 'Synopsis':
                    DesignerState.SynopsisEditor.PendingSelection = Match.Selection;
                    toggleScopedDialog('SynopsisEditor', 'Scope', 'selectedWidgets', Event);
                    break;
                case 'Value':
                    DesignerState.ValueEditor.PendingSelection = Match.Selection;
                    openDialog('ValueEditor', Event === null || Event === void 0 ? void 0 : Event.clientX, Event === null || Event === void 0 ? void 0 : Event.clientY);
                    break;
            }
            break;
    }
}
//------------------------------------------------------------------------------
//--                              Layouter State                              --
//------------------------------------------------------------------------------
const LayouterState = {
    LayouterLayer: undefined,
    ShapeMode: undefined,
    pointedWidget: undefined,
    shapedWidgets: [], // actually shaped widgets (as selection may change)
    initialGeometries: [], // initial geometries of "shapedWidgets"
    LassoMode: 'enclose',
    SelectionBeforeLasso: [],
    LassoStart: undefined,
    LassoEnd: undefined,
};
/**** focusLayouterLayer ****/
LayouterState.LayouterLayer = undefined;
function focusLayouterLayer() {
    var _a;
    (_a = DesignerState.LayouterLayer) === null || _a === void 0 ? void 0 : _a.focus();
}
/**** Lasso Recognizer ****/
LayouterState.LassoRecognizer = GestureRecognizer({
    onlyFrom: '.WAD.LayouterLayer',
    ClickRadius: 4,
    onDragStart: (dx, dy, x, y, Event) => {
        LayouterState.SelectionBeforeLasso = DesignerState.selectedWidgets.slice();
        ({ left: x, top: y } = fromViewportTo('local', { left: x, top: y }, Event.target));
        LayouterState.LassoStart = { x, y };
        dragLassoTo(x, y, Event.shiftKey || Event.metaKey);
        WAT_rerender();
    },
    onDragContinuation: (dx, dy, StartX, StartY, Event) => {
        dragLassoTo(LayouterState.LassoStart.x + dx, LayouterState.LassoStart.y + dy, Event.shiftKey || Event.metaKey);
        WAT_rerender();
    },
    onDragFinish: (dx, dy, StartX, StartY, Event) => {
        dragLassoTo(LayouterState.LassoStart.x + dx, LayouterState.LassoStart.y + dy, Event.shiftKey || Event.metaKey);
        applyLasso();
        WAT_rerender();
    },
    onDragCancellation: () => {
        abortLasso();
        WAT_rerender();
    },
    onClick: onPageClick
});
/**** onCoverClick ****/
function onCoverClick(x, y, StartX, StartY, Event) {
    const Widget = LayouterState.pointedWidget;
    let selectedWidgets = DesignerState.selectedWidgets.slice();
    let SelectionChanged = false;
    if (Event.shiftKey || Event.metaKey) { // additive/subtractive selection
        SelectionChanged = true;
        if (WidgetIsSelected(Widget)) {
            selectedWidgets = selectedWidgets.filter((selectedWidget) => (selectedWidget !== Widget));
        }
        else {
            selectedWidgets.push(Widget);
        }
    }
    else { // definitive selection
        SelectionChanged = !WidgetIsSelected(Widget);
        selectedWidgets = [Widget];
    }
    if (SelectionChanged) {
        selectWidgets(selectedWidgets); // also rerenders
    }
}
/**** Widget Drag/Select Recognizer ****/
LayouterState.CoverRecognizer = GestureRecognizer({
    onlyFrom: '.WAD.Cover',
    ClickRadius: 4,
    onDragStart: (dx, dy, StartX, StartY, Event) => {
        const { pointedWidget } = LayouterState;
        if (!WidgetIsSelected(LayouterState.pointedWidget)) {
            if (Event.shiftKey || Event.metaKey) { // additive/subtractive selection
                selectWidgets([pointedWidget], DesignerState.selectedWidgets);
            }
            else {
                selectWidgets([pointedWidget]);
            }
        }
        LayouterState.shapedWidgets = sortedWidgetSelection();
        LayouterState.initialGeometries = LayouterState.shapedWidgets.map((Widget) => Widget.Geometry);
        doChangeGeometriesBy(LayouterState.shapedWidgets, 'c', dx, dy, LayouterState.initialGeometries);
    },
    onDragContinuation: (dx, dy) => {
        doChangeGeometriesBy(LayouterState.shapedWidgets, 'c', dx, dy, LayouterState.initialGeometries);
    },
    onDragFinish: (dx, dy) => {
        doChangeGeometriesBy(LayouterState.shapedWidgets, 'c', dx, dy, LayouterState.initialGeometries);
        finishDraggingAndShaping();
    },
    onDragCancellation: (dx, dy) => {
        doChangeGeometriesBy(LayouterState.shapedWidgets, 'c', dx, dy, LayouterState.initialGeometries);
        abortDraggingAndShaping();
    },
    onClick: onCoverClick
});
/**** ShapeHandle Drag Recognizer ****/
LayouterState.ShapeHandleRecognizer = GestureRecognizer({
    onlyFrom: '.WAD.ShapeHandle',
    ClickRadius: 0,
    onDragStart: (dx, dy) => {
        LayouterState.shapedWidgets = sortedWidgetSelection();
        LayouterState.initialGeometries = LayouterState.shapedWidgets.map((Widget) => Widget.Geometry);
        doChangeGeometriesBy(LayouterState.shapedWidgets, LayouterState.ShapeMode, dx, dy, LayouterState.initialGeometries);
    },
    onDragContinuation: (dx, dy) => {
        doChangeGeometriesBy(LayouterState.shapedWidgets, LayouterState.ShapeMode, dx, dy, LayouterState.initialGeometries);
    },
    onDragFinish: (dx, dy) => {
        doChangeGeometriesBy(LayouterState.shapedWidgets, LayouterState.ShapeMode, dx, dy, LayouterState.initialGeometries);
        finishDraggingAndShaping();
    },
    onDragCancellation: (dx, dy) => {
        doChangeGeometriesBy(LayouterState.shapedWidgets, LayouterState.ShapeMode, dx, dy, LayouterState.initialGeometries);
        abortDraggingAndShaping();
    }
}); /**** GeometryOfLasso ****/
function GeometryOfLasso() {
    const { x: x0, y: y0 } = LayouterState.LassoStart;
    const { x: x1, y: y1 } = LayouterState.LassoEnd || LayouterState.LassoStart;
    let LassoX = (x0 <= x1 ? x0 : x1);
    let LassoWidth = (x0 <= x1 ? x1 - x0 : x0 - x1);
    let LassoY = (y0 <= y1 ? y0 : y1);
    let LassoHeight = (y0 <= y1 ? y1 - y0 : y0 - y1);
    return { x: LassoX, y: LassoY, Width: LassoWidth, Height: LassoHeight };
}
/**** CSSGeometryOfLasso ****/
function CSSGeometryOfLasso() {
    const { x, y, Width, Height } = GeometryOfLasso();
    return `left:${x}px; top:${y}px; width:${Width}px; height:${Height}px`;
}
/**** WidgetsCaughtByLasso ****/
function WidgetsCaughtByLasso() {
    let { x: LassoX0, y: LassoY0, Width: LassoWidth, Height: LassoHeight } = GeometryOfLasso();
    let LassoX1 = LassoX0 + LassoWidth;
    let LassoY1 = LassoY0 + LassoHeight;
    if (LayouterState.LassoMode === 'touch') {
        return DesignerState.Applet.visitedPage.WidgetList.filter((Widget) => {
            if (!Widget.isVisible || Widget.isLocked) {
                return false;
            }
            const { x, y, Width, Height } = Widget.Geometry;
            return ((LassoX0 <= x + Width) && (x <= LassoX1) &&
                (LassoY0 <= y + Height) && (y <= LassoY1));
        });
    }
    else { // 'enclose'
        return DesignerState.Applet.visitedPage.WidgetList.filter((Widget) => {
            if (!Widget.isVisible || Widget.isLocked) {
                return false;
            }
            const { x, y, Width, Height } = Widget.Geometry;
            return ((LassoX0 <= x) && (x + Width <= LassoX1) &&
                (LassoY0 <= y) && (y + Height <= LassoY1));
        });
    }
}
/**** dragLassoTo ****/
function dragLassoTo(x, y, additiveSelection) {
    LayouterState.LassoEnd = { x, y };
    selectWidgets(additiveSelection ? LayouterState.SelectionBeforeLasso : [], WidgetsCaughtByLasso());
}
/**** applyLasso ****/
function applyLasso() {
    LayouterState.LassoStart = LayouterState.LassoEnd = undefined;
    LayouterState.SelectionBeforeLasso = [];
}
/**** abortLasso ****/
function abortLasso() {
    LayouterState.LassoStart = LayouterState.LassoEnd = undefined;
    selectWidgets(LayouterState.SelectionBeforeLasso);
    LayouterState.SelectionBeforeLasso = [];
}
/**** onPageClick ****/
function onPageClick() {
    selectWidgets([]);
}
/**** finishDraggingAndShaping ****/
function finishDraggingAndShaping() {
    LayouterState.ShapeMode = undefined;
    LayouterState.pointedWidget = undefined;
    LayouterState.shapedWidgets = [];
    LayouterState.initialGeometries = undefined;
}
/**** abortDraggingAndShaping ****/
function abortDraggingAndShaping() {
    if (LayouterState.shapedWidgets.length > 0) {
        doOperation(() => new WAD_WidgetShapeOperation(LayouterState.shapedWidgets, LayouterState.initialGeometries));
    }
    finishDraggingAndShaping();
}
//------------------------------------------------------------------------------
//--                            WAD_LayouterLayer                             --
//------------------------------------------------------------------------------
/**** ArrowKeyDeltas - offsets for keyboard-based moving and sizing ****/
const ArrowKeyDeltas = {
    ArrowLeft: { dx: -1, dy: 0 }, ArrowRight: { dx: 1, dy: 0 },
    ArrowUp: { dx: 0, dy: -1 }, ArrowDown: { dx: 0, dy: 1 }
};
function WAD_LayouterLayer() {
    const { Applet, selectedWidgets } = DesignerState;
    const visitedPage = Applet.visitedPage;
    const WidgetList = (visitedPage === null || visitedPage === void 0 ? void 0 : visitedPage.WidgetList) || [];
    /**** handleCoverEvent ****/
    function handleCoverEvent(Event, Widget) {
        LayouterState.ShapeMode = 'c';
        LayouterState.pointedWidget = Widget;
        if ( // select an unselected widget already on
        (Event.type === 'pointerdown') && // "pointerdown" - i.e. BEFORE the
            !Event.shiftKey && !Event.metaKey && // recognizer grabs the pointer
            !WidgetIsSelected(Widget) // capture; selecting only later
        ) { // in "onDragStart" would re-render during
            selectWidgets([Widget]); // the drag, abort it and revert the widget
        }
        LayouterState.CoverRecognizer(Event);
    }
    /**** handleShapeEvent ****/
    function handleShapeEvent(Event, Mode) {
        LayouterState.ShapeMode = Mode;
        LayouterState.ShapeHandleRecognizer(Event);
    }
    /**** Event Handling ****/
    const LassoRecognizer = LayouterState.LassoRecognizer;
    const DOMElement = useRef(null);
    useEffect(() => {
        DesignerState.LayouterLayer = DOMElement.current;
    }, []);
    const FocusAndLassoRecognizer = useCallback((Event) => {
        focusLayouterLayer();
        LassoRecognizer(Event);
    }, []);
    const onKeyDown = useCallback(async (Event) => {
        var _a;
        if (Event.ctrlKey || Event.metaKey) {
            switch (Event.key.toLowerCase()) {
                case 'a':
                    consumeEvent(Event);
                    return selectWidgets(Event.shiftKey ? [] : ((_a = DesignerState.Applet.visitedPage) === null || _a === void 0 ? void 0 : _a.WidgetList) || []);
                case 'o':
                    consumeEvent(Event);
                    if ('showOpenFilePicker' in window) {
                        try {
                            // @ts-ignore TS18046 allow "window.showOpenFilePicker"
                            const FileList = await window.showOpenFilePicker();
                            if (FileList.length === 0) {
                                return;
                            }
                            const File = await FileList[0].getFile();
                            let FileType = '';
                            switch (FileList[0].name.replace(/^.*[.]/, '')) {
                                case 'js':
                                    FileType = 'application/javascript';
                                    break;
                                case 'json':
                                    FileType = 'application/json';
                                    break;
                            } // "doImport" will fail on other file types
                            doImport(await File.text(), FileType);
                        }
                        catch (Signal) {
                            if ((Signal === null || Signal === void 0 ? void 0 : Signal.name) === 'AbortError') {
                                return;
                            }
                            window.alert('Could not import file\n\nReason: ' + Signal);
                        }
                    }
                    else {
                        window.alert('Your browser does not support opening files.\n\n' +
                            'Try the "import" function from the Toolbox');
                    }
                    return;
                case 'p':
                    consumeEvent(Event);
                    return doPrintApplet();
                case 'v':
                    consumeEvent(Event);
                    return doPasteShelvedWidgets();
                case 'y':
                    consumeEvent(Event);
                    return redoOperation();
                case 'z':
                    consumeEvent(Event);
                    return (Event.shiftKey ? redoOperation() : undoOperation());
            }
        }
        if (selectedWidgets.length === 0) {
            return;
        }
        const ArrowKeyDelta = ArrowKeyDeltas[Event.key];
        if (ArrowKeyDelta != null) { // arrow keys move or size widgets
            consumeEvent(Event);
            const { dx, dy } = ArrowKeyDelta;
            const Factor = (Event.shiftKey ? 10 : 1);
            const ShapeMode = ( // "alt" changes size, else offset
            Event.altKey
                ? (dx === 0 ? 's' : 'e')
                : 'c');
            doChangeGeometriesBy(DesignerState.selectedWidgets, ShapeMode, dx * Factor, dy * Factor, DesignerState.selectedWidgets.map((Widget) => Widget.Geometry), false);
            return;
        }
        switch (Event.key) {
            case 'Backspace':
            case 'Delete':
                consumeEvent(Event);
                return doDeleteSelectedWidgets();
            case 'c':
                consumeEvent(Event);
                return doCopySelectedWidgets();
            case 'd':
                consumeEvent(Event);
                return doDuplicateSelectedWidgets();
            case 'x':
                consumeEvent(Event);
                return doCutSelectedWidgets();
        }
    });
    /**** actual rendering ****/
    return html `<div class="WAD LayouterLayer" ref=${DOMElement} tabindex="0"
      onPointerDown=${FocusAndLassoRecognizer} onPointerMove=${LassoRecognizer}
      onPointerUp=${LassoRecognizer} onPointerCancel=${LassoRecognizer}
      onKeyDown=${onKeyDown}
    >
      ${WidgetList.toReversed().map((Widget) => {
        if (!Widget.isVisible) {
            return '';
        }
        const WidgetId = IdOfWidget(Widget);
        const selected = WidgetIsSelected(Widget);
        return html `
          <${WAD_Cover} Widget=${Widget} key=${WidgetId + 'c'}
            selected=${selected}
            onPointerEvent=${(Event) => handleCoverEvent(Event, Widget)}
          />
        `;
    })}

      ${(selectedWidgets.length > 0)
        ? selectedWidgets.filter((Widget) => Widget.isVisible).toReversed().map((Widget) => {
            const WidgetId = IdOfWidget(Widget);
            const Geometry = Widget.Geometry;
            return html `${['nw', 'n', 'ne', 'e', 'se', 's', 'sw', 'w'].map((Mode) => html `
              <${WAD_ShapeHandle} key=${WidgetId + Mode} Mode=${Mode} Geometry=${Geometry}
                onPointerEvent=${(Event) => handleShapeEvent(Event, Mode)}/>
            `)}`;
        })
        : ''}
      ${LayouterState.LassoStart == null
        ? ''
        : html `<div class="WAD Lasso" style=${CSSGeometryOfLasso()}></>`}
      ${horizontalGuides()}
      ${verticalGuides()}
    </div>`;
}
/**** WAD_Cover ****/
function WAD_Cover(PropSet) {
    let { Widget, selected, onPointerEvent } = PropSet, otherProps = __rest(PropSet, ["Widget", "selected", "onPointerEvent"]);
    let { x, y, Width, Height } = Widget.Geometry;
    const FocusAndCoverRecognizer = useCallback((Event) => {
        focusLayouterLayer();
        onPointerEvent(Event);
    }, []);
    const dragging = ((LayouterState.ShapeMode === 'c') && (LayouterState.shapedWidgets.length > 0)
        ? 'dragging' : '');
    return html `<div class="WAD Cover ${selected ? 'selected' : ''} ${dragging}" style="
      left:${x}px; top:${y}px; width:${Width}px; height:${Height}px;
      ${Widget.isLocked ? 'pointer-events:none' : ''}
    " ...${otherProps}
      onPointerDown=${FocusAndCoverRecognizer} onPointerMove=${onPointerEvent}
      onPointerUp=${onPointerEvent} onPointerCancel=${onPointerEvent}
    />`;
}
//------------------------------------------------------------------------------
//--                             WAD_ShapeHandle                              --
//------------------------------------------------------------------------------
function WAD_ShapeHandle(PropSet) {
    let { Mode, Geometry, onPointerEvent } = PropSet, otherProps = __rest(PropSet, ["Mode", "Geometry", "onPointerEvent"]);
    let { x, y, Width, Height } = Geometry;
    const xl = x - 8, xm = Math.round(x + Width / 2) - 4, xr = x + Width;
    const yt = y - 8, ym = Math.round(y + Height / 2) - 4, yb = y + Height;
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
    const FocusAndHandleRecognizer = useCallback((Event) => {
        focusLayouterLayer();
        onPointerEvent(Event);
    }, []);
    return html `<div class="WAD ShapeHandle" style="${CSSGeometry} ${Cursor}" ...${otherProps}
      onPointerDown=${FocusAndHandleRecognizer} onPointerMove=${onPointerEvent}
      onPointerUp=${onPointerEvent} onPointerCancel=${onPointerEvent}
    />`;
} /**** horizontal/vertical Guides - jointly implemented ****/
function GuidesAlongAxis(Coordinate, Extent, GuideClass, CSSProperty) {
    var _a;
    const WidgetList = ((_a = DesignerState.Applet.visitedPage) === null || _a === void 0 ? void 0 : _a.WidgetList) || [];
    const selectedWidgets = DesignerState.selectedWidgets;
    const EdgeSet = {};
    const CenterSet = {};
    WidgetList.filter((Widget) => !WidgetIsSelected(Widget)).forEach((Widget) => {
        const Geometry = Widget.Geometry;
        const Start = Math.round(Geometry[Coordinate]);
        const Middle = Math.round(Geometry[Coordinate] + Geometry[Extent] / 2);
        const End = Math.round(Geometry[Coordinate] + Geometry[Extent]);
        EdgeSet[Start] = EdgeSet[End] = true;
        CenterSet[Middle] = true;
    });
    const GuideSet = {};
    selectedWidgets.forEach((Widget) => {
        const Geometry = Widget.Geometry;
        const Start = Math.round(Geometry[Coordinate]);
        const Middle = Math.round(Geometry[Coordinate] + Geometry[Extent] / 2);
        const End = Math.round(Geometry[Coordinate] + Geometry[Extent]);
        if (EdgeSet[Start]) {
            GuideSet[Start] = 'Edge';
        }
        if (EdgeSet[Middle] && (GuideSet[Middle] !== 'Edge')) {
            GuideSet[Middle] = 'Center';
        }
        if (EdgeSet[End]) {
            GuideSet[End] = 'Edge';
        }
        if (CenterSet[Start] && (GuideSet[Start] !== 'Edge')) {
            GuideSet[Start] = 'Center';
        }
        if (CenterSet[Middle] && (GuideSet[Middle] !== 'Edge')) {
            GuideSet[Middle] = 'Center';
        }
        if (CenterSet[End] && (GuideSet[End] !== 'Edge')) {
            GuideSet[End] = 'Center';
        }
    });
    const OffsetList = [];
    for (let Offset in GuideSet) {
        if (GuideSet[Offset] != null) {
            OffsetList.push(Offset);
        }
    }
    return html `${OffsetList.map((Offset) => html `
      <div class="WAD ${GuideClass} ${GuideSet[Offset]}" style="${CSSProperty}:${Offset}px"/>
    `)}`;
}
/**** horizontal Guides ****/
function horizontalGuides() {
    return GuidesAlongAxis('y', 'Height', 'horizontalGuide', 'top');
}
/**** vertical Guides ****/
function verticalGuides() {
    return GuidesAlongAxis('x', 'Width', 'verticalGuide', 'left');
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
/**** GeometryOfWidgetRelativeTo ****/
function GeometryOfWidgetRelativeTo(Widget, BaseGeometry, PaneGeometry) {
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
/**** consumeEvent ****/
function consumeEvent(Event) {
    Event.stopPropagation();
    Event.preventDefault();
}
/**** inform WAT about this designer ****/
let DesignerStore;
localforage.ready(async function () {
    DesignerStore = localforage.createInstance({
        name: 'WAT Designer'
    });
    //      WAD_DesignerLayer.showErrorReport = showErrorReport
    useDesigner(WAD_DesignerLayer);
    MCPConnector.connect(); // connects to a "WAT-AI-Broker" (if configured)
});
