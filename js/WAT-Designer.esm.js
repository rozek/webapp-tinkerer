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
const IconFolder = 'https://rozek.github.io/webapp-tinkerer/icons';
import { 
//  throwError,
quoted, HTMLsafe, ValuesAreEqual, ValueIsOrdinal, ValueIsText, ValueIsPlainObject, ValueIsArray, ValueIsList, ValueIsListSatisfying, allowOrdinal, allowTextline, expectList, allowListSatisfying, allowFunction, allowOneOf, } from 'javascript-interface-library';
import Conversion from 'svelte-coordinate-conversion';
const { fromViewportTo } = Conversion;
import { html, useState, useRef, useEffect, useMemo, useCallback, } from 'htm/preact';
import { customAlphabet } from 'nanoid';
// @ts-ignore TS2307 typescript has problems importing "nanoid-dictionary"
import { nolookalikesSafe } from 'nanoid-dictionary';
import { throwError, throwReadOnlyError, fromDocumentTo, WAT_FontWeights, WAT_FontStyles, WAT_TextDecorationLines, WAT_TextDecorationStyles, WAT_TextAlignments, WAT_BackgroundModes, WAT_BorderStyles, WAT_Cursors, WAT_Overflows, ValueIsBehavior, ValueIsApplet, ValueIsPage, ValueIsWidget, ValueIsErrorReport, allowPage, BehaviorIsIntrinsic, GestureRecognizer, useDesigner, rerender as WAT_rerender, } from "./WAT-Runtime.esm.js";
import mapTouchToMouseFor from 'svelte-touch-to-mouse';
mapTouchToMouseFor('.WAD.DesignerButton');
mapTouchToMouseFor('.WAD.Dialog > .Titlebar');
mapTouchToMouseFor('.WAD.Dialog > .leftResizer');
mapTouchToMouseFor('.WAD.Dialog > .middleResizer');
mapTouchToMouseFor('.WAD.Dialog > .rightResizer');
mapTouchToMouseFor('.WAD.LayouterLayer');
mapTouchToMouseFor('.WAD.Cover');
mapTouchToMouseFor('.WAD.ShapeHandle');
/**** constants for special input situations ****/
const noSelection = {};
const multipleValues = {};
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
    background:none; color:black;
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
    width:30px; height:30px;
    pointer-events:auto;
  }
  .WAD.Icon.active {
    background:#e8f0ff;
    border:solid 2px lightgray; border-radius:4px;
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
  .WAD.Checkbox > input {
    display:block; position:relative;
    background:transparent; color:inherit;
    pointer-events:auto;
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
  }
  .WAD.TextLineInput.wrong > input, .WAD.NumberInput.wrong > input,
  .WAD.TimeInput.wrong > input {
    color:red;
  }
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
  .WAD.DropDown > select:read-only {
    background:transparent;
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
  .WAD.PseudoDropDown > select {
    display:block; position:absolute;
    left:0px; top:0px; right:0px; bottom:0px;
    opacity:0.01;
  }

/**** PseudoFileInput ****/

  .WAD.PseudoFileInput {
    display:flex; position:relative; align-items:center; justify-content:center;
    width:30px; height:30px;
    pointer-events:auto;
  }
  .WAD.PseudoFileInput div {
    display:block; position:relative;
    width:24px; height:24px;
    -webkit-mask-size:contain;           mask-size:contain;
    -webkit-mask-position:center center; mask-position:center center;
    pointer-events:none;
  }
  .WAD.PseudoFileInput > input {
    display:block; position:absolute;
    left:0px; top:0px; right:0px; bottom:0px;
    opacity:0.01;
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
  .WAD.ColorInput.wrong > input {
    color:red;
  }
  .WAD.ColorInput > input:read-only {
    background:transparent;
  }

/**** FlatListView ****/

  .WAD.FlatListView {
    display:flex; position:relative; flex-flow:column nowrap; align-items:stretch;
    overflow:scroll; overflow-x:auto; overflow-y:scroll;
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
    overflow:scroll; overflow-x:auto; overflow-y:scroll;
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
    flex:1 1 auto; overflow-x:hidden; overflow-y:scroll;
    margin-top:4px;
  }

/**** Accordion Fold ****/

  .WAD.Fold {
    display:block; position:relative;
    left:0px; top:0px; width:100%; bottom:auto;
    margin:none; margin-bottom:2px;
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

  .WAD.Cover[selected] {
    outline:dotted 2px orangered;
    cursor:grab;
  }

  .WAD.Cover.dragging[selected] {
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
        x: NaN, y: NaN, Width: 132, Height: 194,
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
        x: NaN, y: NaN, Width: 320, Height: 240,
        minWidth: 320, minHeight: 240,
    },
    BehaviorEditor: {
        Title: 'Behavior Editor', View: undefined,
        x: NaN, y: NaN, Width: 320, Height: 240,
        minWidth: 320, minHeight: 240,
        ReportToShow: undefined, // workaround for strange closure problem
    },
    SynopsisEditor: {
        Title: 'Synopsis Editor', View: undefined,
        x: NaN, y: NaN, Width: 320, Height: 240,
        minWidth: 320, minHeight: 240,
    },
    ValueEditor: {
        Title: 'Value Editor', View: undefined,
        x: NaN, y: NaN, Width: 320, Height: 240,
        minWidth: 320, minHeight: 240,
    },
    ScriptEditor: {
        Title: 'Script Editor', View: undefined,
        x: NaN, y: NaN, Width: 320, Height: 240,
        minWidth: 320, minHeight: 240,
        Scope: 'Applet',
        ReportToShow: undefined, // workaround for strange closure problem
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
        x: NaN, y: NaN, Width: 320, Height: 240,
        minWidth: 320, minHeight: 240,
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
/**** sortedPageSelection ****/
function sortedPageSelection() {
    const IndexSet = [];
    DesignerState.selectedPages.forEach((Page) => IndexSet[Page.Index] = Page);
    const IndexList = Object.keys(IndexSet).map(Number).sort();
    return IndexList.map((Index) => IndexSet[Index]);
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
    const IndexSet = [];
    DesignerState.selectedWidgets.forEach((Widget) => IndexSet[Widget.Index] = Widget);
    const IndexList = Object.keys(IndexSet).map(Number).sort();
    return IndexList.map((Index) => IndexSet[Index]);
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
        default: return (typeof commonValue === 'object'
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
//----------------------------------------------------------------------------//
//                           Confirmation Handling                            //
//----------------------------------------------------------------------------//
function OperationWasConfirmed(Message) {
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
//------------------------------------------------------------------------------
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
    }));
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
    ">
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
                Object.assign(DesignerState[DialogName], { x, y, Width, Height });
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
function showErrorReport(Visual, ErrorReport) {
    if (window.confirm(ErrorReport.Type + '\n\n' + ErrorReport.Message + '\n\n' +
        'Do you want to proceed to the Designer?')) {
        openDesigner(); // if not yet already done
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
function WAD_Icon(PropSet) {
    const { Icon, Color, enabled, active, onClick } = PropSet, otherProps = __rest(PropSet, ["Icon", "Color", "enabled", "active", "onClick"]);
    const _onClick = useCallback((Event) => {
        if (enabled === false) { // deliberately chosen "==="
            Event.stopPropagation();
            Event.preventDefault();
        }
        else {
            if (typeof onClick === 'function') {
                onClick(Event);
            }
        }
    }, [enabled]);
    let Classes = ['WAD Icon'];
    if (enabled === false) {
        Classes.push('disabled');
    }
    if (active === true) {
        Classes.push('active');
    }
    return html `<div class=${Classes.join(' ')} onClick=${_onClick} ...${otherProps}>
      <div style="
        -webkit-mask-image:url(${Icon}); mask-image:url(${Icon});
        background-color:${Color || 'black'};
      "></>
    </>`;
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
function WAD_Button(PropSet) {
    const { enabled } = PropSet, otherProps = __rest(PropSet, ["enabled"]);
    return html `<button class="WAD Button" disabled=${enabled === false}
      ...${otherProps}
    >
      ${PropSet.children}
    </>`;
}
//------------------------------------------------------------------------------
//--                               WAD_Checkbox                               --
//------------------------------------------------------------------------------
function WAD_Checkbox(PropSet) {
    let { enabled, readonly, Value, style } = PropSet, otherProps = __rest(PropSet, ["enabled", "readonly", "Value", "style"]);
    let checked = false, indeterminate = false;
    switch (Value) {
        case null:
        case undefined:
        case multipleValues:
            indeterminate = true;
            break;
        case noSelection:
            indeterminate = true;
            enabled = false;
            break;
        default: checked = Value;
    }
    const CheckboxRef = useRef(null);
    useEffect(() => CheckboxRef.current.indeterminate = indeterminate, [indeterminate]);
    return html `<div class="WAD Checkbox" style=${style}>
      <input type="checkbox" ref=${CheckboxRef}
        disabled=${(enabled === false) && (readonly === false)}
        checked=${checked}
        ...${otherProps}
      />
    </>`;
}
//------------------------------------------------------------------------------
//--                            WAD_TextlineInput                             --
//------------------------------------------------------------------------------
function WAD_TextlineInput(PropSet) {
    let { Type, // for similar input elements
    enabled, readonly, Value, Placeholder, minLength, maxLength, multiple, Pattern, SpellChecking, Suggestions, onInput, onBlur, style } = PropSet, otherProps = __rest(PropSet
    /**** Value Handling ****/
    , ["Type", "enabled", "readonly", "Value", "Placeholder", "minLength", "maxLength", "multiple", "Pattern", "SpellChecking", "Suggestions", "onInput", "onBlur", "style"]);
    /**** Value Handling ****/
    const shownValue = useRef('');
    const InputElement = useRef(null);
    let ValueToShow = '';
    switch (Value) {
        case null:
        case undefined:
            ValueToShow = '';
            break;
        case multipleValues:
            ValueToShow = '';
            Placeholder = '(multiple values)';
            break;
        case noSelection:
            ValueToShow = '';
            Placeholder = '(no selection)';
            enabled = false;
            break;
        default: ValueToShow = Value;
    }
    if (document.activeElement === InputElement.current) {
        ValueToShow = shownValue.current;
    }
    else {
        shownValue.current = ValueToShow;
    }
    const wrong = (ValueToShow !== shownValue.current ? 'wrong' : '');
    /**** Suggestion Handling ****/
    const SuggestionId = useMemo(() => newId() + '-Suggestions');
    let SuggestionList = '';
    if ((Suggestions != null) && (Suggestions.length > 0)) {
        SuggestionList = html `<datalist id=${SuggestionId}>
        ${Suggestions.map((Value) => html `<option value=${Value}></option>`)}
      </datalist>`;
    }
    /**** Event Handling ****/
    const _onInput = useCallback((Event) => {
        Event.stopPropagation();
        //    Event.preventDefault() // NO!
        if (enabled !== false) {
            shownValue.current = Event.target.value;
            if (typeof onInput === 'function') {
                onInput(Event);
            }
        }
    }, [enabled]);
    const _onBlur = useCallback((Event) => {
        WAT_rerender();
        if (typeof onBlur === 'function') {
            onBlur(Event);
        }
    });
    /**** actual Rendering ****/
    return html `<div class="WAD TextLineInput ${wrong}" style=${style}>
      <input type=${Type || 'text'}
        disabled=${enabled === false} readonly=${readonly}
        ref=${InputElement} value=${ValueToShow} placeholder=${Placeholder}
        minlength=${minLength} maxlength=${maxLength}
        pattern=${Pattern} spellcheck=${SpellChecking == true}
        list=${SuggestionId} multiple=${multiple}
        ...${otherProps} onInput=${_onInput} onBlur=${_onBlur}
      />${SuggestionList}
    </>`;
}
//------------------------------------------------------------------------------
//--                             WAD_NumberInput                              --
//------------------------------------------------------------------------------
function WAD_NumberInput(PropSet) {
    let { enabled, readonly, Value, Placeholder, Suggestions, Minimum, Maximum, StepValue, onInput, onBlur, style } = PropSet, otherProps = __rest(PropSet
    /**** Value Handling ****/
    , ["enabled", "readonly", "Value", "Placeholder", "Suggestions", "Minimum", "Maximum", "StepValue", "onInput", "onBlur", "style"]);
    /**** Value Handling ****/
    const shownValue = useRef('');
    const InputElement = useRef(null);
    let ValueToShow = undefined;
    switch (Value) {
        case null:
        case undefined:
            ValueToShow = undefined;
            break;
        case multipleValues:
            ValueToShow = undefined;
            Placeholder = '(multiple values)';
            break;
        case noSelection:
            ValueToShow = undefined;
            Placeholder = '(no selection)';
            enabled = false;
            break;
        default: ValueToShow = Value;
    }
    if (document.activeElement === InputElement.current) {
        ValueToShow = shownValue.current;
    }
    else {
        shownValue.current = ValueToShow;
    }
    const wrong = (ValueToShow !== shownValue.current ? 'wrong' : '');
    /**** Suggestion Handling ****/
    const SuggestionId = useMemo(() => newId() + '-Suggestions');
    let SuggestionList = '';
    if ((Suggestions != null) && (Suggestions.length > 0)) {
        SuggestionList = html `<datalist id=${SuggestionId}>
        ${Suggestions.map((Value) => html `<option value=${Value}></option>`)}
      </datalist>`;
    }
    /**** Event Handling ****/
    const _onInput = useCallback((Event) => {
        Event.stopPropagation();
        //    Event.preventDefault() // NO!
        if (enabled !== false) {
            shownValue.current = Event.target.value;
            if (typeof onInput === 'function') {
                onInput(Event);
            }
        }
    }, [enabled]);
    const _onBlur = useCallback((Event) => {
        WAT_rerender();
        if (typeof onBlur === 'function') {
            onBlur(Event);
        }
    });
    /**** actual Rendering ****/
    return html `<div class="WAD NumberInput ${wrong}" style=${style}>
      <input type="number"
        disabled=${enabled === false} readonly=${readonly}
        min=${Minimum} step=${StepValue} max=${Maximum}
        ref=${InputElement} value=${ValueToShow} placeholder=${Placeholder}
        list=${SuggestionId}
        ...${otherProps} onInput=${_onInput} onBlur=${_onBlur}
      />
    </>`;
}
//------------------------------------------------------------------------------
//--                             WAD_IntegerInput                             --
//------------------------------------------------------------------------------
function WAD_IntegerInput(PropSet) {
    PropSet = Object.assign({}, PropSet);
    if (PropSet.Value != null) {
        PropSet.Value = Math.round(PropSet.Value);
    }
    if (PropSet.Minimum != null) {
        PropSet.Minimum = Math.round(PropSet.Minimum);
    }
    if (PropSet.Maximum != null) {
        PropSet.Maximum = Math.round(PropSet.Maximum);
    }
    if (PropSet.Suggestions != null) {
        PropSet.Suggestions = PropSet.Suggestions.map((Value) => Math.round);
    }
    PropSet.StepValue = 1;
    return WAD_NumberInput(PropSet);
}
//------------------------------------------------------------------------------
//--                                WAD_Slider                                --
//------------------------------------------------------------------------------
function WAD_Slider(PropSet) {
    let { enabled, readonly, Value, Minimum, Maximum, StepValue, Hashmarks, onInput, onBlur, style } = PropSet, otherProps = __rest(PropSet
    /**** Value Handling ****/
    , ["enabled", "readonly", "Value", "Minimum", "Maximum", "StepValue", "Hashmarks", "onInput", "onBlur", "style"]);
    /**** Value Handling ****/
    const shownValue = useRef('');
    const InputElement = useRef(null);
    let ValueToShow = undefined;
    switch (Value) {
        case null:
        case undefined:
        case multipleValues:
            ValueToShow = undefined;
            break;
        case noSelection:
            ValueToShow = undefined;
            enabled = false;
            break;
        default: ValueToShow = Value;
    }
    if (document.activeElement === InputElement.current) {
        ValueToShow = shownValue.current;
    }
    else {
        shownValue.current = ValueToShow;
    }
    const wrong = (ValueToShow !== shownValue.current ? 'wrong' : '');
    /**** Hashmark Handling ****/
    const HashmarkId = useMemo(() => newId() + '-Hashmarks');
    let HashmarkList = '';
    if ((Hashmarks != null) && (Hashmarks.length > 0)) {
        HashmarkList = html `\n<datalist id=${HashmarkId}>
        ${Hashmarks.map((Item) => {
            Item = '' + Item;
            const Value = Item.replace(/:.*$/, '').trim();
            const Label = Item.replace(/^[^:]+:/, '').trim();
            return html `<option value=${Value}>${Label}</option>`;
        })}
      </datalist>`;
    }
    /**** Event Handling ****/
    const _onInput = useCallback((Event) => {
        Event.stopPropagation();
        //    Event.preventDefault() // NO!
        if (enabled !== false) {
            shownValue.current = Event.target.value;
            if (typeof onInput === 'function') {
                onInput(Event);
            }
        }
    }, [enabled]);
    const _onBlur = useCallback((Event) => {
        WAT_rerender();
        if (typeof onBlur === 'function') {
            onBlur(Event);
        }
    });
    return html `<div class="WAD Slider ${wrong}" style=${style}>
      <input type="range"
        disabled=${enabled === false} readonly=${readonly}
        min=${Minimum} step=${StepValue} max=${Maximum}
        ref=${InputElement} value=${ValueToShow} list=${HashmarkId}
        ...${otherProps} onInput=${_onInput} onBlur=${_onBlur}
      />
    </>`;
}
//------------------------------------------------------------------------------
//--                              WAD_TimeInput                               --
//------------------------------------------------------------------------------
function WAD_TimeInput(PropSet) {
    let { Type, // for similar input elements
    enabled, readonly, Value, Placeholder, Minimum, Maximum, Suggestions, onInput, onBlur, style } = PropSet, otherProps = __rest(PropSet
    /**** Value Handling ****/
    , ["Type", "enabled", "readonly", "Value", "Placeholder", "Minimum", "Maximum", "Suggestions", "onInput", "onBlur", "style"]);
    /**** Value Handling ****/
    const shownValue = useRef('');
    const InputElement = useRef(null);
    let ValueToShow = '';
    switch (Value) {
        case null:
        case undefined:
            ValueToShow = '';
            break;
        case multipleValues:
            ValueToShow = '';
            Placeholder = '(multiple values)';
            break;
        case noSelection:
            ValueToShow = '';
            Placeholder = '(no selection)';
            enabled = false;
            break;
        default: ValueToShow = Value;
    }
    if (document.activeElement === InputElement.current) {
        ValueToShow = shownValue.current;
    }
    else {
        shownValue.current = ValueToShow;
    }
    const wrong = (ValueToShow !== shownValue.current ? 'wrong' : '');
    /**** Suggestion Handling ****/
    const SuggestionId = useMemo(() => newId() + '-Suggestions');
    let SuggestionList = '';
    if ((Suggestions != null) && (Suggestions.length > 0)) {
        SuggestionList = html `<datalist id=${SuggestionId}>
        ${Suggestions.map((Value) => html `<option value=${Value}></option>`)}
      </datalist>`;
    }
    /**** Event Handling ****/
    const _onInput = useCallback((Event) => {
        Event.stopPropagation();
        //    Event.preventDefault() // NO!
        if (enabled !== false) {
            shownValue.current = Event.target.value;
            if (typeof onInput === 'function') {
                onInput(Event);
            }
        }
    }, [enabled]);
    const _onBlur = useCallback((Event) => {
        WAT_rerender();
        if (typeof onBlur === 'function') {
            onBlur(Event);
        }
    });
    /**** actual Rendering ****/
    return html `<div class="WAD TextLineInput ${wrong}" style=${style}>
      <input type=${Type || 'time'}
        disabled=${enabled === false} readonly=${readonly}
        ref=${InputElement} value=${ValueToShow} placeholder=${Placeholder}
        min=${Minimum} max=${Maximum}
        list=${SuggestionId}
        ...${otherProps} onInput=${_onInput} onBlur=${_onBlur}
      />${SuggestionList}
    </>`;
}
//------------------------------------------------------------------------------
//--                               WAD_DropDown                               --
//------------------------------------------------------------------------------
function WAD_DropDown(PropSet) {
    let { enabled, Value, Placeholder, Options, style } = PropSet, otherProps = __rest(PropSet, ["enabled", "Value", "Placeholder", "Options", "style"]);
    let ValueToShow = '';
    switch (Value) {
        case null:
        case undefined:
            ValueToShow = '';
            break;
        case multipleValues:
            ValueToShow = '';
            Placeholder = '(multiple values)';
            break;
        case noSelection:
            ValueToShow = '';
            Placeholder = '(no selection)';
            enabled = false;
            break;
        default: ValueToShow = '' + Value;
    }
    return html `<div class="WAD DropDown" style=${style}>
      <select disabled=${enabled === false} ...${otherProps}>
        ${Placeholder == null
        ? ''
        : html `<option value="" disabled>${Placeholder}</option>`}
        <option disabled selected=${(Value || '') === ''}>(please select)</>
        ${(Options || []).map((Option) => html `<option selected=${Option === Value}>${Option}</>`)}
      </select>
    </>`;
}
//------------------------------------------------------------------------------
//--                            WAD_PseudoDropDown                            --
//------------------------------------------------------------------------------
function WAD_PseudoDropDown(PropSet) {
    let { Icon, Color, enabled, Value, Placeholder, OptionList } = PropSet, otherProps = __rest(PropSet, ["Icon", "Color", "enabled", "Value", "Placeholder", "OptionList"]);
    return html `<div class="WAD PseudoDropDown ${enabled === false ? 'disabled' : ''}">
      <div style="
        -webkit-mask-image:url(${Icon}); mask-image:url(${Icon});
        background-color:${Color || 'black'};
      "></>
      <select disabled=${enabled === false} ...${otherProps}>
        ${Placeholder == null
        ? ''
        : html `<option value="" disabled selected=${Value === ''}>${Placeholder}</option>`}
        ${(OptionList || []).map((Option) => {
        const OptionValue = Option.replace(/:.*$/, '').trim();
        let OptionLabel = Option.replace(/^[^:]+:/, '').trim();
        const disabled = (OptionLabel[0] === '-');
        if (/^-[^-]+$/.test(OptionLabel)) {
            OptionLabel = OptionLabel.slice(1);
        }
        return html `<option value=${OptionValue} disabled=${disabled}
            selected=${OptionValue === Value}
          >${OptionLabel}</option>`;
    })}
      </select>
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
            >${Suffix}</option`)}
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
            >${Suffix}</option`)}
          </optgroup>`;
    })}
      </select>
    </>`;
}
//------------------------------------------------------------------------------
//--                           WAD_PseudoFileInput                            --
//------------------------------------------------------------------------------
function WAD_PseudoFileInput(PropSet) {
    let { Icon, Color, enabled } = PropSet, otherProps = __rest(PropSet, ["Icon", "Color", "enabled"]);
    return html `<label class="WAD PseudoFileInput ${enabled === false ? 'disabled' : ''}">
      <div style="
        -webkit-mask-image:url(${Icon}); mask-image:url(${Icon});
        background-color:${Color || 'black'};
      "></>
      <input type="file" style="display:none" ...${otherProps}/>
    </>`;
}
//------------------------------------------------------------------------------
//--                              WAD_ColorInput                              --
//------------------------------------------------------------------------------
function WAD_ColorInput(PropSet) {
    let { enabled, readonly, Value, Suggestions, onInput, onBlur, style } = PropSet, otherProps = __rest(PropSet
    /**** Value Handling ****/
    , ["enabled", "readonly", "Value", "Suggestions", "onInput", "onBlur", "style"]);
    /**** Value Handling ****/
    const shownValue = useRef('');
    const InputElement = useRef(null);
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
        default: ValueToShow = Value;
    }
    if (document.activeElement === InputElement.current) {
        ValueToShow = shownValue.current;
    }
    else {
        shownValue.current = ValueToShow;
    }
    const wrong = (ValueToShow !== shownValue.current ? 'wrong' : '');
    /**** Suggestion Handling ****/
    const SuggestionId = useMemo(() => newId() + '-Suggestions');
    let SuggestionList = '';
    if ((Suggestions != null) && (Suggestions.length > 0)) {
        SuggestionList = html `<datalist id=${SuggestionId}>
        ${Suggestions.map((Value) => html `<option value=${Value}></option>`)}
      </datalist>`;
    }
    /**** Event Handling ****/
    const _onInput = useCallback((Event) => {
        Event.stopPropagation();
        //    Event.preventDefault() // NO!
        if (enabled !== false) {
            shownValue.current = Event.target.value;
            if (typeof onInput === 'function') {
                onInput(Event);
            }
        }
    }, [enabled]);
    const _onBlur = useCallback((Event) => {
        WAT_rerender();
        if (typeof onBlur === 'function') {
            onBlur(Event);
        }
    });
    /**** actual Rendering ****/
    return html `<div class="WAD ColorInput ${wrong}" style=${style}>
      <input type="color"
        disabled=${enabled === false} readonly=${readonly}
        ref=${InputElement} value=${ValueToShow}
        list=${SuggestionId}
        ...${otherProps} onInput=${_onInput} onBlur=${_onBlur}
      />${SuggestionList}
    </>`;
}
//------------------------------------------------------------------------------
//--                              WAD_TextInput                               --
//------------------------------------------------------------------------------
function WAD_TextInput(PropSet) {
    let { enabled, readonly, Value, Placeholder, minLength, maxLength, Resizability, LineWrapping, onInput, onBlur, style } = PropSet, otherProps = __rest(PropSet, ["enabled", "readonly", "Value", "Placeholder", "minLength", "maxLength", "Resizability", "LineWrapping", "onInput", "onBlur", "style"]);
    const shownValue = useRef('');
    const InputElement = useRef(null);
    let ValueToShow = '';
    switch (Value) {
        case null:
        case undefined:
            ValueToShow = '';
            break;
        case multipleValues:
            ValueToShow = '';
            Placeholder = '(multiple values)';
            break;
        case noSelection:
            ValueToShow = '';
            Placeholder = '(no selection)';
            enabled = false;
            break;
        default: ValueToShow = Value;
    }
    if (document.activeElement === InputElement.current) {
        ValueToShow = shownValue.current;
    }
    else {
        shownValue.current = ValueToShow;
    }
    const wrong = (ValueToShow !== shownValue.current ? 'wrong' : '');
    const _onInput = useCallback((Event) => {
        Event.stopPropagation();
        //    Event.preventDefault() // NO!
        if (enabled !== false) {
            shownValue.current = Event.target.value;
            if (typeof onInput === 'function') {
                onInput(Event);
            }
        }
    }, [enabled]);
    const _onBlur = useCallback((Event) => {
        WAT_rerender();
        if (typeof onBlur === 'function') {
            onBlur(Event);
        }
    });
    return html `<div class="WAD TextInput ${wrong}" style=${style}>
      <textarea
        disabled=${enabled === false} readonly=${readonly} style="${LineWrapping == true
        ? 'white-space:pre; overflow-wrap:break-word; hyphens:auto'
        : undefined}"
        minlength=${minLength} maxlength=${maxLength}
        ref=${InputElement} value=${ValueToShow} placeholder=${Placeholder}
        ...${otherProps} onInput=${_onInput} onBlur=${_onBlur}
      ></textarea>
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
        ItemRenderer = (Item) => html `${Item + ''}`;
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
        selectedIndices.length = SelectionLimit;
        if (onSelectionChange != null) {
            onSelectionChange(selectedIndices);
        }
        if (onItemDeselected != null) {
            deselectedIndices.forEach((deselectedIndex) => {
                onItemDeselected(List[deselectedIndex], deselectedIndex);
            });
        }
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
            class="ListItem ${ItemIsSelected(Index) ? 'selected' : undefined}"
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
        return ((ItemPath.length !== ContainerPath.length + 1) ||
            !PathsAreEqual(ItemPath.slice(0, ContainerPath.length), ContainerPath));
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
                const ContainerPath = ItemPath.slice(0, ItemPath.length - 1);
                PathsToDeselect = selectedPaths.filter((Path) => (!ItemInContainer(Path, ContainerPath)));
                selectedPaths = selectedPaths.filter((Path) => (ItemInContainer(Path, ContainerPath)));
                if (selectedPaths.length === SelectionLimit) {
                    PathsToDeselect.push([selectedPaths.shift()]);
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
        const Offset = (Path.length - 1) * Indentation;
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
function WAD_PropertyConfigurator(PropSet) {
    const { Descriptor, Enabling, Value, onInput } = PropSet;
    const { Name, Label, EditorType, readonly, Placeholder, FalseValue, TrueValue, minLength, maxLength, multiple, Pattern, minValue, maxValue, StepValue, Resizability, LineWrapping, SpellChecking, ValueList, Hashmarks, Suggestions } = Descriptor;
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
              Value=${Value == true ? TrueValue : FalseValue}
              Options=${[FalseValue, TrueValue]}
              onInput=${(Event) => onInput(Event.target.value === TrueValue)}
            />
          </>
        `;
        case 'textline-input':
            return html `
          <${WAD_horizontally}>
            <${WAD_Label}>${Label}</>
            <${WAD_Gap}/>
            <${WAD_TextlineInput} style="flex:1 0 auto"
              enabled=${Enabling} readonly=${readonly}
              Value=${Value} Placeholder=${Placeholder}
              minLength=${minLength} maxLength=${maxLength} Pattern=${Pattern}
              SpellChecking=${SpellChecking} Suggestions=${Suggestions}
              onInput=${(Event) => onInput(Event.target.value)}
            />
          </>
        `;
        case 'password-input':
            return html `
          <${WAD_horizontally}>
            <${WAD_Label}>${Label}</>
            <${WAD_Gap}/>
            <${WAD_TextlineInput} Type="password" style="flex:1 0 auto"
              enabled=${Enabling} readonly=${readonly}
              Value=${Value} Placeholder=${Placeholder}
              minLength=${minLength} maxLength=${maxLength} Pattern=${Pattern}
              onInput=${(Event) => onInput(Event.target.value)}
            />
          </>
        `;
        case 'email-address-input':
            return html `
          <${WAD_horizontally}>
            <${WAD_Label}>${Label}</>
            <${WAD_Gap}/>
            <${WAD_TextlineInput} Type="email" style="flex:1 0 auto"
              enabled=${Enabling} readonly=${readonly}
              Value=${Value} Placeholder=${Placeholder}
              minLength=${minLength} maxLength=${maxLength} Pattern=${Pattern}
              multiple=${multiple} Suggestions=${Suggestions}
              onInput=${(Event) => onInput(Event.target.value)}
            />
          </>
        `;
        case 'phone-number-input':
            return html `
          <${WAD_horizontally}>
            <${WAD_Label}>${Label}</>
            <${WAD_Gap}/>
            <${WAD_TextlineInput} Type="tel" style="flex:1 0 auto"
              enabled=${Enabling} readonly=${readonly}
              Value=${Value} Placeholder=${Placeholder}
              minLength=${minLength} maxLength=${maxLength} Pattern=${Pattern}
              Suggestions=${Suggestions}
              onInput=${(Event) => onInput(Event.target.value)}
            />
          </>
        `;
        case 'url-input':
            return html `
          <${WAD_horizontally}>
            <${WAD_Label}>${Label}</>
            <${WAD_Gap}/>
            <${WAD_TextlineInput} Type="url" style="flex:1 0 auto"
              enabled=${Enabling} readonly=${readonly}
              Value=${Value} Placeholder=${Placeholder}
              minLength=${minLength} maxLength=${maxLength} Pattern=${Pattern}
              Suggestions=${Suggestions}
              onInput=${(Event) => onInput(Event.target.value)}
            />
          </>
        `;
        case 'search-input':
            return html `
          <${WAD_horizontally}>
            <${WAD_Label}>${Label}</>
            <${WAD_Gap}/>
            <${WAD_TextlineInput} Type="search" style="flex:1 0 auto"
              enabled=${Enabling} readonly=${readonly}
              Value=${Value} Placeholder=${Placeholder}
              minLength=${minLength} maxLength=${maxLength} Pattern=${Pattern}
              SpellChecking=${SpellChecking} Suggestions=${Suggestions}
              onInput=${(Event) => onInput(Event.target.value)}
            />
          </>
        `;
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
            return html `
          <${WAD_horizontally}>
            <${WAD_Label}>${Label}</>
            <${WAD_Gap}/>
            <${WAD_TimeInput} Type="time"
              enabled=${Enabling} readonly=${readonly}
              Value=${Value} Placeholder=${Placeholder} Suggestions=${Suggestions}
              Minimum=${minValue} Maximum=${maxValue}
              onInput=${(Event) => onInput(Event.target.value)}
            />
          </>
        `;
        case 'date-time-input':
            return html `
          <${WAD_horizontally}>
            <${WAD_Label}>${Label}</>
            <${WAD_Gap}/>
            <${WAD_TimeInput} Type="date-time-local"
              enabled=${Enabling} readonly=${readonly}
              Value=${Value} Placeholder=${Placeholder} Suggestions=${Suggestions}
              Minimum=${minValue} Maximum=${maxValue}
              onInput=${(Event) => onInput(Event.target.value)}
            />
          </>
        `;
        case 'date-input':
            return html `
          <${WAD_horizontally}>
            <${WAD_Label}>${Label}</>
            <${WAD_Gap}/>
            <${WAD_TimeInput} Type="date"
              enabled=${Enabling} readonly=${readonly}
              Value=${Value} Placeholder=${Placeholder} Suggestions=${Suggestions}
              Minimum=${minValue} Maximum=${maxValue}
              onInput=${(Event) => onInput(Event.target.value)}
            />
          </>
        `;
        case 'month-input':
            return html `
          <${WAD_horizontally}>
            <${WAD_Label}>${Label}</>
            <${WAD_Gap}/>
            <${WAD_TimeInput} Type="month"
              enabled=${Enabling} readonly=${readonly}
              Value=${Value} Placeholder=${Placeholder} Suggestions=${Suggestions}
              Minimum=${minValue} Maximum=${maxValue}
              onInput=${(Event) => onInput(Event.target.value)}
            />
          </>
        `;
        case 'week-input':
            return html `
          <${WAD_horizontally}>
            <${WAD_Label}>${Label}</>
            <${WAD_Gap}/>
            <${WAD_TimeInput} Type="week"
              enabled=${Enabling} readonly=${readonly}
              Value=${Value} Placeholder=${Placeholder} Suggestions=${Suggestions}
              Minimum=${minValue} Maximum=${maxValue}
              onInput=${(Event) => onInput(Event.target.value)}
            />
          </>
        `;
        case 'color-input':
            return html `
          <${WAD_horizontally}>
            <${WAD_Label}>${Label}</>
            <${WAD_Gap}/>
            <${WAD_ColorInput} Type="week"
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
            return html `
          <${WAD_horizontally}>
            <${WAD_Label}>${Label}</>
          </>

          <${WAD_TextInput} style="padding-top:4px; min-height:60px"
            enabled=${Enabling} readonly=${readonly}
            Value=${Value} Placeholder=${Placeholder}
            minLength=${minLength} maxLength=${maxLength}
            Resizability=${Resizability} LineWrapping=${LineWrapping}
            onInput=${(Event) => onInput(Event.target.value)}
          />
        `;
        case 'json-input':
            return html `
          <${WAD_horizontally}>
            <${WAD_Label}>${Label}</>
          </>

          <${WAD_TextInput} style="padding-top:4px; min-height:60px"
            enabled=${Enabling} readonly=${readonly}
            Value=${JSON.stringify(Value)} Placeholder=${Placeholder}
            minLength=${minLength} maxLength=${maxLength}
            Resizability=${Resizability} LineWrapping=${LineWrapping}
            onInput=${(Event) => {
                try {
                    onInput(JSON.parse(Event.target.value));
                }
                catch (Signal) { /* nop */ }
            }}
          />
        `;
        case 'linelist-input':
            return html `
          <${WAD_horizontally}>
            <${WAD_Label}>${Label}</>
          </>

          <${WAD_TextInput} style="padding-top:4px; min-height:60px"
            enabled=${Enabling} readonly=${readonly}
            Value=${(Value || []).join('\n')} Placeholder=${Placeholder}
            minLength=${minLength} maxLength=${maxLength}
            Resizability=${Resizability} LineWrapping=${LineWrapping}
            onInput=${(Event) => onInput(Event.target.value.trim().replace(/\n\s*\n/, '\n').split('\n'))}
          />
        `;
        case 'numberlist-input':
            return html `
          <${WAD_horizontally}>
            <${WAD_Label}>${Label}</>
          </>

          <${WAD_TextInput} style="padding-top:4px; min-height:60px"
            enabled=${Enabling} readonly=${readonly}
            Value=${(Value || []).join('\n')} Placeholder=${Placeholder}
            minLength=${minLength} maxLength=${maxLength}
            Resizability=${Resizability} LineWrapping=${LineWrapping}
            onInput=${(Event) => onInput(Event.target.value.trim().replace(/\n\s*\n/, '\n').split('\n').map((Line) => parseFloat(Line)))}
          />
        `;
        case 'integerlist-input':
            return html `
          <${WAD_horizontally}>
            <${WAD_Label}>${Label}</>
          </>

          <${WAD_TextInput} style="padding-top:4px; min-height:60px"
            enabled=${Enabling} readonly=${readonly}
            Value=${(Value || []).join('\n')} Placeholder=${Placeholder}
            minLength=${minLength} maxLength=${maxLength}
            Resizability=${Resizability} LineWrapping=${LineWrapping}
            onInput=${(Event) => onInput(Event.target.value.trim().replace(/\n\s*\n/, '\n').split('\n').map((Line) => parseFloat(Line)))}
          />
        `;
    }
    console.warn(`unsupported EditorType ${quoted(EditorType)}`);
    return html ``;
}
//------------------------------------------------------------------------------
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
    return (ValueIsPlainObject(Serialization) && ((Serialization.PageList == null) ||
        ValueIsListSatisfying(Serialization.PageList, looksLikePage)));
}
/**** looksLikePage ****/
function looksLikePage(Serialization) {
    return (ValueIsPlainObject(Serialization) &&
        !('PageList' in Serialization) && ((Serialization.WidgetList == null) ||
        ValueIsListSatisfying(Serialization.WidgetList, looksLikeWidget)));
}
/**** looksLikePageList ****/
function looksLikePageList(Serialization) {
    return ValueIsListSatisfying(Serialization, looksLikePage);
}
/**** looksLikeWidget ****/
function looksLikeWidget(Serialization) {
    return (ValueIsPlainObject(Serialization) &&
        (Serialization.PageList == null) &&
        (Serialization.WidgetList == null));
}
/**** looksLikeWidgetList ****/
function looksLikeWidgetList(Serialization) {
    return ValueIsListSatisfying(Serialization, looksLikeWidget);
}
//------------------------------------------------------------------------------
//--                                Generators                                --
//------------------------------------------------------------------------------
/**** generateEmbeddableApplet - with integrated script ****/
function generateEmbeddableApplet() {
    const { Applet } = DesignerState;
    const AppletName = Applet.Name || 'WAT-Applet';
    const Serialization = JSON.stringify(Applet.Serialization);
    const AppletSource = `${'<'}script type="wat/applet">${Serialization}${'<'}/script>`;
    const encodedSource = (new TextEncoder()).encode(AppletSource);
    const decodedSource = (new TextDecoder()).decode(encodedSource);
    if (AppletSource === decodedSource) {
        download(encodedSource, AppletName + '.html', 'text/html;charset=utf-8');
    }
    else {
        window.alert('this applet generation is not stable');
    }
}
/**** generateStandaloneWebApp - with separate script and without designer ****/
function generateStandaloneWebApp(withDesigner = false) {
    const { Applet } = DesignerState;
    const AppletName = Applet.Name || 'WAT-Applet';
    const Serialization = Applet.Serialization;
    const AppletScript = Serialization.Script;
    delete Serialization.Script;
    const { HeadExtensions, minWidth, maxWidth, minHeight, maxHeight, toBeCentered, withMobileFrame, expectedOrientation } = Applet;
    const AppletSource = `
<!DOCTYPE html>
<html lang="en" charset="utf-8" style="width:100%">
 <head>
  <meta charset="utf-8"/>

  <meta name="viewport"         content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"/>
  <meta name="format-detection" content="telephone=no">

  <style>
    html { text-size-adjust:100% }

    html, body { width:100%; height:100%; width:100vw; height:100vh; margin:0px; padding:0px }
    html       { overflow:hidden scroll }
  </style>

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
      "wat-runtime":                 "https://rozek.github.io/webapp-tinkerer/js/wat-runtime.esm.js",
      "wat-designer":                "https://rozek.github.io/webapp-tinkerer/js/wat-designer.esm.js",

      "marked":                "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js",
      "marked-katex-extension":"https://cdn.jsdelivr.net/npm/marked-katex-extension/+esm",
      "marked-highlight":      "https://cdn.jsdelivr.net/npm/marked-highlight/+esm",
      "highlight.js/lib/core":                "https://cdn.jsdelivr.net/gh/highlightjs/cdn-release/build/es/highlight.min.js",
      "highlight.js/lib/languages/css":       "https://cdn.jsdelivr.net/gh/highlightjs/cdn-release/build/es/languages/css.min.js",
      "highlight.js/lib/languages/javascript":"https://cdn.jsdelivr.net/gh/highlightjs/cdn-release/build/es/languages/javascript.min.js",
      "highlight.js/lib/languages/java":      "https://cdn.jsdelivr.net/gh/highlightjs/cdn-release/build/es/languages/java.min.js",
      "highlight.js/lib/languages/json":      "https://cdn.jsdelivr.net/gh/highlightjs/cdn-release/build/es/languages/json.min.js",
      "highlight.js/lib/languages/typescript":"https://cdn.jsdelivr.net/gh/highlightjs/cdn-release/build/es/languages/typescript.min.js",
      "highlight.js/lib/languages/xml":       "https://cdn.jsdelivr.net/gh/highlightjs/cdn-release/build/es/languages/xml.min.js",

      "katex": "https://cdn.jsdelivr.net/npm/katex/+esm"
    }
  }
  ${'<'}/script>
  ${'<'}script src="https://rozek.github.io/webapp-tinkerer/js/localforage.min.js">${'<'}/script>
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

  let Width  = Math.max(minWidth,  Math.min(ViewportWidth,  maxWidth  == null ? Infinity : maxWidth))
  let Height = Math.max(minHeight, Math.min(ViewportHeight, maxHeight == null ? Infinity : maxHeight))
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
  <div type="wat/applet" name="${AppletName}" class="${withMobileFrame ? 'withMobileFrame' : ''}" style="
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

  ${'<'}script type="wat/applet">${JSON.stringify(Serialization)}${'<'}/script>
  ${(AppletScript || '').trim() === ''
        ? ''
        : `${'<'}script type="wat/applet-script">${AppletScript}\n${'<'}/script>`}
 </head>
 <body></body>
</html>
    `.trim();
    const encodedSource = (new TextEncoder()).encode(AppletSource);
    const decodedSource = (new TextDecoder()).decode(encodedSource);
    if (AppletSource === decodedSource) {
        download(encodedSource, AppletName + '.html', 'text/html;charset=utf-8');
    }
    else {
        window.alert('this WebApp generation is not stable');
    }
}
//------------------------------------------------------------------------------
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
    const VisitHistory = DesignerState.VisitHistory; // reference, not copy!
    for (let i = VisitHistory.length - 1; i >= 0; i--) {
        if (VisitHistory[i].Applet == null) {
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
/**** doOperation ****/
function doOperation(Operation) {
    const { OperationHistory, OperationIndex } = DesignerState;
    if (OperationIndex < OperationHistory.length) {
        OperationHistory.length = OperationIndex;
    }
    try {
        const prevOperation = OperationHistory[OperationIndex - 1];
        if ((prevOperation != null) && Operation.canExtend(prevOperation)) {
            Operation.extend(prevOperation); // may fail
            if (prevOperation.isIrrelevant) {
                DesignerState.OperationIndex -= 1; // only upon success
            }
            DesignerState.Applet.preserve();
        }
        else {
            Operation.doNow(); // may fail
            OperationHistory.push(Operation); // only upon success
            DesignerState.OperationIndex += 1;
            DesignerState.Applet.preserve();
        }
    }
    catch (Signal) {
        console.error('operation failed', Signal);
    }
}
/**** undoOperation ****/
function undoOperation() {
    const { OperationHistory, OperationIndex } = DesignerState;
    let prevOperation = OperationHistory[OperationIndex - 1];
    if (prevOperation != null) {
        prevOperation.undo();
        DesignerState.OperationIndex -= 1; // only upon success
        DesignerState.Applet.preserve();
    }
}
/**** redoOperation ****/
function redoOperation() {
    const { OperationHistory, OperationIndex } = DesignerState;
    let nextOperation = OperationHistory[OperationIndex];
    if (nextOperation != null) {
        nextOperation.redo();
        DesignerState.OperationIndex += 1; // only upon success
        DesignerState.Applet.preserve();
    }
}
//----------------------------------------------------------------------------//
//                               WAD_Operation                                //
//----------------------------------------------------------------------------//
class WAD_Operation {
    get isIrrelevant() { return false; }
    set isIrrelevant(_) { throwReadOnlyError('isIrrelevant'); }
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
    /**** canExtend ****/
    canExtend(otherOperation) {
        return false;
    }
    /**** isIrrelevant ****/
    get isIrrelevant() { return false; }
    set isIrrelevant(_) { throwReadOnlyError('isIrrelevant'); }
    /**** doNow ****/
    doNow() {
        const Applet = DesignerState.Applet;
        Applet.registerBehaviorOfCategory(this._Category, this._Behavior, this._Script);
        DesignerState.selectedCategory = this._Category;
        DesignerState.selectedBehavior = this._Behavior;
    }
    /**** extend ****/
    extend(otherOperation) {
        throwError('NotExtensible: this operation can not be extended');
    }
    /**** redo ****/
    redo() {
        this.doNow();
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
    /**** redo ****/
    redo() {
        this.doNow();
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
    /**** canExtend ****/
    canExtend(otherOperation) {
        return false;
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
    /**** extend ****/
    extend(otherOperation) {
        throwError('NotExtensible: this operation can not be extended');
    }
    /**** redo ****/
    redo() {
        this.doNow();
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
    /**** canExtend ****/
    canExtend(otherOperation) {
        return false;
    }
    /**** isIrrelevant ****/
    get isIrrelevant() { return false; }
    set isIrrelevant(_) { throwReadOnlyError('isIrrelevant'); }
    /**** doNow ****/
    doNow() {
        const { Applet } = DesignerState;
        Applet.unregisterBehaviorOfCategory(this._Category, this._Behavior);
        DesignerState.selectedCategory = this._Category;
        DesignerState.selectedBehavior = undefined;
    }
    /**** extend ****/
    extend(otherOperation) {
        throwError('NotExtensible: this operation can not be extended');
    }
    /**** redo ****/
    redo() {
        this.doNow();
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
        return (this._newValue === this._oldValue);
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
    /**** redo ****/
    redo() {
        this.doNow();
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
    /**** canExtend ****/
    canExtend(otherOperation) {
        return false;
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
    /**** extend ****/
    extend(otherOperation) {
        throwError('NotExtensible: this operation can not be extended');
    }
    /**** redo ****/
    redo() {
        this.doNow();
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
    /**** canExtend ****/
    canExtend(otherOperation) {
        return false;
    }
    /**** isIrrelevant ****/
    get isIrrelevant() { return false; }
    set isIrrelevant(_) { throwReadOnlyError('isIrrelevant'); }
    /**** doNow ****/
    doNow() {
        const Applet = DesignerState.Applet;
        const newPages = this._newPages = [];
        this._Serializations.forEach((Serialization, i) => {
            const newPage = Applet.PageDeserializedAt(Serialization, this._StartIndex + i);
            newPages.push(newPage);
        });
        selectPages(newPages);
    }
    /**** extend ****/
    extend(otherOperation) {
        throwError('NotExtensible: this operation can not be extended');
    }
    /**** redo ****/
    redo() {
        this.doNow();
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
            ValuesAreEqual(otherOperation._Pages, this._Pages) &&
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
    /**** redo ****/
    redo() {
        this.doNow();
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
    /**** canExtend ****/
    canExtend(otherOperation) {
        return false;
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
    /**** extend ****/
    extend(otherOperation) {
        throwError('NotExtensible: this operation can not be extended');
    }
    /**** redo ****/
    redo() {
        this.doNow();
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
            ValuesAreEqual(otherOperation._Pages, this._Pages) &&
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
    /**** redo ****/
    redo() {
        this.doNow();
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
        const IndexSet = [];
        Pages.forEach((Page) => IndexSet[Page.Index] = Page);
        this._Indices = Object.keys(IndexSet).map(Number).sort();
        this._Pages = this._Indices.map((Index) => IndexSet[Index]);
        this._Serializations = this._Pages.map((Page) => Page.Serialization);
    }
    /**** canExtend ****/
    canExtend(otherOperation) {
        return false;
    }
    /**** isIrrelevant ****/
    get isIrrelevant() { return false; }
    set isIrrelevant(_) { throwReadOnlyError('isIrrelevant'); }
    /**** doNow ****/
    doNow() {
        const { Applet } = DesignerState;
        this._Pages.forEach((Page) => {
            Applet.destroyPage(Page);
        });
    }
    /**** extend ****/
    extend(otherOperation) {
        throwError('NotExtensible: this operation can not be extended');
    }
    /**** redo ****/
    redo() {
        this.doNow();
    }
    /**** undo ****/
    undo() {
        const { Applet } = DesignerState;
        const newPages = this._Pages = [];
        this._Serializations.forEach((Serialization, i) => {
            const newPage = Applet.PageDeserializedAt(Serialization, this._Indices[i]);
            newPages.push(newPage);
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
    /**** canExtend ****/
    canExtend(otherOperation) {
        return false;
    }
    /**** isIrrelevant ****/
    get isIrrelevant() { return false; }
    set isIrrelevant(_) { throwReadOnlyError('isIrrelevant'); }
    /**** doNow ****/
    doNow() {
        const newWidgets = this._newWidgets = [];
        this._Serializations.forEach((Serialization, i) => {
            const newWidget = this._Page.WidgetDeserializedAt(Serialization, this._StartIndex + i);
            newWidgets.push(newWidget);
        });
        selectWidgets(newWidgets);
    }
    /**** extend ****/
    extend(otherOperation) {
        throwError('NotExtensible: this operation can not be extended');
    }
    /**** redo ****/
    redo() {
        this.doNow();
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
            ValuesAreEqual(otherOperation._Widgets, this._Widgets) &&
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
    /**** redo ****/
    redo() {
        this.doNow();
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
    /**** canExtend ****/
    canExtend(otherOperation) {
        return false;
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
    /**** extend ****/
    extend(otherOperation) {
        throwError('NotExtensible: this operation can not be extended');
    }
    /**** redo ****/
    redo() {
        this.doNow();
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
            ValuesAreEqual(otherOperation._Widgets, this._Widgets) &&
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
    /**** redo ****/
    redo() {
        this.doNow();
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
            ValuesAreEqual(otherOperation._Widgets, this._Widgets) &&
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
    /**** redo ****/
    redo() {
        this.doNow();
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
        const IndexSet = [];
        Widgets.forEach((Widget) => IndexSet[Widget.Index] = Widget);
        this._Indices = Object.keys(IndexSet).map(Number).sort();
        this._Widgets = this._Indices.map((Index) => IndexSet[Index]);
        this._Serializations = this._Widgets.map((Widget) => Widget.Serialization);
    }
    /**** canExtend ****/
    canExtend(otherOperation) {
        return false;
    }
    /**** isIrrelevant ****/
    get isIrrelevant() { return false; }
    set isIrrelevant(_) { throwReadOnlyError('isIrrelevant'); }
    /**** doNow ****/
    doNow() {
        this._Widgets.forEach((Widget) => {
            this._Page.destroyWidget(Widget);
        });
    }
    /**** extend ****/
    extend(otherOperation) {
        throwError('NotExtensible: this operation can not be extended');
    }
    /**** redo ****/
    redo() {
        this.doNow();
    }
    /**** undo ****/
    undo() {
        const newWidgets = this._Widgets = [];
        this._Serializations.forEach((Serialization, i) => {
            const newWidget = this._Page.WidgetDeserializedAt(Serialization, this._Indices[i]);
            newWidgets.push(newWidget);
        });
        selectWidgets(newWidgets);
    }
} //----------------------------------------------------------------------------//
//                                  Commands                                  //
//----------------------------------------------------------------------------//
/**** doCreateNewBehavior ****/
function doCreateNewBehavior(Category, Behavior) {
    doOperation(new WAD_BehaviorDeserializationOperation({
        BehaviorSet: { [Category]: [{ Name: Behavior, Script: '' }] }
    }));
}
/**** doConfigureSelectedBehavior ****/
function doConfigureSelectedBehavior(Property, Value) {
    doOperation(new WAD_BehaviorConfigurationOperation(DesignerState.selectedCategory, DesignerState.selectedBehavior, Property, Value));
}
/**** doApplyBehaviorScript ****/
function doApplyBehaviorScript() {
    doOperation(new WAD_BehaviorScriptApplicationOperation(DesignerState.selectedCategory, DesignerState.selectedBehavior));
}
/**** doDeleteSelectedBehavior ****/
function doDeleteSelectedBehavior() {
    doOperation(new WAD_BehaviorDeletionOperation(DesignerState.selectedCategory, DesignerState.selectedBehavior));
}
/**** doConfigureApplet ****/
function doConfigureApplet(Property, Value) {
    doOperation(new WAD_AppletConfigurationOperation(Property, Value));
}
/**** doApplyAppletScript ****/
function doApplyAppletScript() {
    doOperation(new WAD_AppletScriptApplicationOperation());
}
/**** doCreatePage ****/
function doCreatePage(Behavior) {
    const { Applet, selectedPages } = DesignerState;
    const InsertionIndex = (selectedPages.length === 0
        ? Applet.PageCount
        : Math.max(selectedPages.map((Page) => Page.Index)) + 1);
    doOperation(new WAD_PageDeserializationOperation([{ Behavior: (Behavior === '' ? null : Behavior), WidgetList: [] }], InsertionIndex));
}
/**** doDuplicateSelectedPages ****/
function doDuplicateSelectedPages() {
    const selectedPages = sortedPageSelection();
    const InsertionIndex = selectedPages[selectedPages.length - 1].Index + 1;
    doOperation(new WAD_PageDeserializationOperation(selectedPages.map((Page) => Page.Serialization), InsertionIndex));
}
/**** doConfigureVisitedPage ****/
function doConfigureVisitedPage(Property, Value) {
    doOperation(new WAD_PageConfigurationOperation([DesignerState.Applet.visitedPage], Property, Value));
}
/**** doConfigureSelectedPages ****/
function doConfigureSelectedPages(Property, Value) {
    doOperation(new WAD_PageConfigurationOperation(DesignerState.selectedPages, Property, Value));
}
/**** doApplyVisitedPageScript ****/
function doApplyVisitedPageScript() {
    doOperation(new WAD_PageScriptApplicationOperation([DesignerState.Applet.visitedPage]));
}
/**** doShiftSelectedPagesToTop ****/
function doShiftSelectedPagesToTop() {
    const selectedPages = sortedPageSelection();
    const IndexList = Array.from({ length: selectedPages.length }, (_, i) => i);
    doOperation(new WAD_PageShiftOperation(selectedPages, IndexList));
}
/**** doShiftSelectedPagesUp ****/
function doShiftSelectedPagesUp() {
    const selectedPages = sortedPageSelection();
    const StartIndex = selectedPages[0].Index - 1;
    const IndexList = Array.from({ length: selectedPages.length }, (_, i) => StartIndex + i);
    doOperation(new WAD_PageShiftOperation(selectedPages, IndexList));
}
/**** doShiftSelectedPagesDown ****/
function doShiftSelectedPagesDown() {
    const selectedPages = sortedPageSelection();
    const SelectionCount = selectedPages.length;
    const StartIndex = selectedPages[SelectionCount - 1].Index + 2 - SelectionCount;
    const IndexList = Array.from({ length: selectedPages.length }, (_, i) => StartIndex + i);
    doOperation(new WAD_PageShiftOperation(selectedPages, IndexList));
}
/**** doShiftSelectedPagesToBottom ****/
function doShiftSelectedPagesToBottom() {
    const selectedPages = sortedPageSelection();
    const SelectionCount = selectedPages.length;
    const StartIndex = DesignerState.Applet.PageCount + 2 - SelectionCount;
    const IndexList = Array.from({ length: selectedPages.length }, (_, i) => StartIndex + i);
    doOperation(new WAD_PageShiftOperation(selectedPages, IndexList));
}
/**** doVisitSelectedPage ****/
function doVisitSelectedPage() {
    const { selectedPages } = DesignerState;
    visitPage(selectedPages[selectedPages.length - 1]);
}
/**** doDeleteSelectedPages ****/
function doDeleteSelectedPages() {
    doOperation(new WAD_PageDeletionOperation(DesignerState.selectedPages));
}
/**** doCreateWidget ****/
function doCreateWidget(Behavior) {
    doOperation(new WAD_WidgetDeserializationOperation([{ Behavior: (Behavior === '' ? null : Behavior) }], DesignerState.Applet.visitedPage, 0));
}
/**** doDuplicateSelectedWidgets ****/
function doDuplicateSelectedWidgets() {
    const selectedWidgets = sortedWidgetSelection();
    if (selectedWidgets.length === 0) {
        return;
    }
    doOperation(new WAD_WidgetDeserializationOperation(selectedWidgets.map((Widget) => Widget.Serialization), DesignerState.Applet.visitedPage, 0));
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
    doOperation(new WAD_WidgetConfigurationOperation(selectedWidgets, Property, ValuesToSet));
}
/**** doApplySelectedWidgetsScript ****/
function doApplySelectedWidgetsScript() {
    const { selectedWidgets } = DesignerState;
    doOperation(new WAD_WidgetScriptApplicationOperation(selectedWidgets));
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
    doOperation(new WAD_WidgetShapeOperation(WidgetList, GeometryList));
}
/**** doShiftSelectedWidgetsToTop ****/
function doShiftSelectedWidgetsToTop() {
    const selectedWidgets = sortedWidgetSelection();
    const IndexList = Array.from({ length: selectedWidgets.length }, (_, i) => i);
    doOperation(new WAD_WidgetShiftOperation(selectedWidgets, IndexList));
}
/**** doShiftSelectedWidgetsUp ****/
function doShiftSelectedWidgetsUp() {
    const selectedWidgets = sortedWidgetSelection();
    const StartIndex = selectedWidgets[0].Index - 1;
    const IndexList = Array.from({ length: selectedWidgets.length }, (_, i) => StartIndex + i);
    doOperation(new WAD_WidgetShiftOperation(selectedWidgets, IndexList));
}
/**** doShiftSelectedWidgetsDown ****/
function doShiftSelectedWidgetsDown() {
    const selectedWidgets = sortedWidgetSelection();
    const SelectionCount = selectedWidgets.length;
    const StartIndex = selectedWidgets[SelectionCount - 1].Index + 2 - SelectionCount;
    const IndexList = Array.from({ length: selectedWidgets.length }, (_, i) => StartIndex + i);
    doOperation(new WAD_WidgetShiftOperation(selectedWidgets, IndexList));
}
/**** doShiftSelectedWidgetsToBottom ****/
function doShiftSelectedWidgetsToBottom() {
    const selectedWidgets = sortedWidgetSelection();
    const SelectionCount = selectedWidgets.length;
    const StartIndex = DesignerState.Applet.visitedPage.WidgetCount + 2 - SelectionCount;
    const IndexList = Array.from({ length: selectedWidgets.length }, (_, i) => StartIndex + i);
    doOperation(new WAD_WidgetShiftOperation(selectedWidgets, IndexList));
}
/**** doDeleteSelectedWidgets ****/
function doDeleteSelectedWidgets() {
    const selectedWidgets = DesignerState.selectedWidgets;
    if (selectedWidgets.length === 0) {
        return;
    }
    doOperation(new WAD_WidgetDeletionOperation(selectedWidgets));
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
    doOperation(new WAD_WidgetDeserializationOperation(DesignerState.shelvedWidgets, visitedPage, 0));
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
        case 'application/javascript':
            if ((DesignerState.Applet.pendingScript != null) &&
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
        Applet.deserializeBehaviorsFrom(Serialization);
        return;
    }
    if (looksLikePage(Serialization)) {
        doOperation(new WAD_PageDeserializationOperation([Serialization], visitedPage == null ? 0 : visitedPage.Index + 1)); // also selects and visits this page
        return;
    }
    if (looksLikePageList(Serialization)) {
        doOperation(new WAD_PageDeserializationOperation(Serialization, visitedPage == null ? 0 : visitedPage.Index + 1)); // also selects these pages and visits the last one
        return;
    }
    if (looksLikeWidget(Serialization)) {
        if (visitedPage == null) { // create a page to insert the widget into
            doOperation(new WAD_PageDeserializationOperation([{ WidgetList: [] }], Applet.PageCount)); // also visits the new page
            visitedPage = Applet.visitedPage;
        }
        doOperation(new WAD_WidgetDeserializationOperation([Serialization], visitedPage, 0)); // also selects this widget
        return;
    }
    if (looksLikeWidgetList(Serialization)) {
        if (visitedPage == null) { // create a page to insert the widget into
            doOperation(new WAD_PageDeserializationOperation([{ WidgetList: [] }], Applet.PageCount)); // also visits the new page
            visitedPage = Applet.visitedPage;
        }
        doOperation(new WAD_WidgetDeserializationOperation(Serialization, visitedPage, 0)); // also selects these widgets
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
            const Widgets = DesignerState.selectedWidgets;
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
    const encodedJSON = (new TextEncoder()).encode(SerializationString);
    const decodedJSON = (new TextDecoder()).decode(encodedJSON);
    if (SerializationString === decodedJSON) {
        download(encodedJSON, suggestedFileName, 'text/html;charset=utf-8');
    }
    else {
        window.alert('this export is not stable');
    }
}
/**** doVisitPrev/NextPage ****/
function doVisitPrevPage() { visitPrevPage(); }
function doVisitNextPage() { visitNextPage(); }
/**** doVisitHomePage ****/
function doVisitHomePage() { visitPage(0); }
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
    let { left: x, top: y } = ViewElement.getBoundingClientRect();
    x += window.scrollX;
    y += window.scrollY;
    DesignerState.DesignerDisabled = true;
    WAT_rerender();
    window.requestAnimationFrame(async () => {
        var _a;
        try {
            const Stream = await navigator.mediaDevices.getDisplayMedia({
                // @ts-ignore TS2353 allow "preferCurrentTab"
                video: true, preferCurrentTab: true
            });
            const Video = document.createElement('video');
            Video.srcObject = Stream;
            await Video.play();
            // @ts-ignore TS18047 "Context" is not null
            Context.drawImage(Video, x, y, Width, Height, 0, 0, Width, Height);
            Stream.getTracks().forEach((Track) => Track.stop());
            DesignerState.DesignerDisabled = false;
            WAT_rerender();
            const Name = (VisualToRender === Applet
                ? ((_a = Applet.visitedBoard) === null || _a === void 0 ? void 0 : _a.Name) || Applet.Name || 'WAT-Applet'
                : VisualToRender.Name || 'WAT-Screenshot.png');
            Canvas.toBlob((Blob) => {
                download(Blob, Name + '.png', 'image/png');
            }, 'image/png');
        }
        catch (Signal) {
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
        default: console.error('InvalidArgument: invalid generation variant ' + quoted(Variant));
    }
}
/**** doPrintApplet ****/
function doPrintApplet() {
    const { Applet } = DesignerState;
    DesignerState.DesignerDisabled = true;
    WAT_rerender();
    window.requestAnimationFrame(async () => {
        try {
            const PrinterFrame = document.createElement('iframe');
            PrinterFrame.style.position = 'absolute';
            PrinterFrame.style.top = '-1000000px';
            document.body.appendChild(PrinterFrame);
            const PrinterDoc = PrinterFrame.contentWindow.document;
            PrinterDoc.write('<html><head></head><body>');
            PrinterDoc.write(Applet.View.innerHTML);
            PrinterDoc.write('</body></html>');
            PrinterDoc.close();
            PrinterFrame.contentWindow.focus();
            PrinterFrame.contentWindow.print();
            window.addEventListener('afterprint', function () {
                document.body.removeChild(PrinterFrame);
                DesignerState.DesignerDisabled = false;
                WAT_rerender();
            }, { once: true });
        }
        catch (Signal) {
            console.error('Error while printing', Signal);
            DesignerState.DesignerDisabled = false;
            WAT_rerender();
            window.alert('Print Error\n\n' + Signal);
        }
    });
} /**** selectedPagesMayBeShiftedUp ****/
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
    const selectedWidgets = sortedWidgetSelection();
    const StartIndex = DesignerState.Applet.visitedPage.WidgetCount - selectedWidgets.length;
    return selectedWidgets.some((Widget, i) => Widget.Index < StartIndex + i);
}
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
console.log('DesignerState', DesignerState);
/**** resizeApplet ****/
function resizeApplet() {
    const Applet = DesignerState.Applet;
    let { Width, Height, minWidth, minHeight, maxWidth, maxHeight, keepGeometries } = DesignerState.AppletResizer;
    if ((Width || 0) === 0) {
        Width = Applet.Width;
    }
    if ((Height || 0) === 0) {
        Height = Applet.Height;
    }
    if ((minWidth || 0) === 0) {
        minWidth = Applet.minWidth;
    }
    if ((minHeight || 0) === 0) {
        minHeight = Applet.minHeight;
    }
    if ((maxWidth || 0) === 0) {
        maxWidth = Applet.maxWidth;
    }
    if ((maxHeight || 0) === 0) {
        maxHeight = Applet.maxHeight;
    }
    Width = Math.max(minWidth, Math.min(Width, maxWidth == null ? Infinity : maxWidth));
    Height = Math.max(minHeight, Math.min(Height, maxHeight == null ? Infinity : maxHeight));
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
        HostElement.style.width = Width + 'px';
        HostElement.style.height = Height + 'px';
        HostElement.style.minWidth = (minWidth == null ? 'none' : minWidth + 'px');
        HostElement.style.minHeight = (minHeight == null ? 'none' : minHeight + 'px');
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
    /**** if need be: initialize VisitHistory ****/
    const Applet = DesignerState.Applet = PropSet.Applet;
    if (!Applet.isAttached) {
        return;
    }
    if (DesignerState.VisitHistory[DesignerState.VisitIndex] !== Applet.visitedPage) {
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
    }));
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
    const { Applet, isLayouting, selectedBehavior, selectedWidgets, shelvedWidgets } = DesignerState;
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
        Event.target.value = '';
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
          onChange=${doImportFromFile}
        />
        <${WAD_PseudoDropDown} Icon="${IconFolder}/arrow-down-to-bracket.png"
          Placeholder="(please choose)" Value=""
          OptionList=${[
        (selectedBehavior == null ? '-' : '') + 'selected Behavior',
        'Applet', 'active Page', 'selected Pages', 'selected Widgets',
        '----', 'Applet Design', 'Applet Script'
    ]}
          onInput=${(Event) => {
        doExport(Event.target.value);
        Event.target.value = '';
    }}
        />

        <${WAD_Icon} Icon="${IconFolder}/chevron-left.png"
          enabled=${mayVisitPrevPage()} onClick=${doVisitPrevPage}
        />
        <${WAD_Icon} Icon="${IconFolder}/chevron-right.png"
          enabled=${mayVisitNextPage()} onClick=${doVisitNextPage}
        />
        <${WAD_Icon} Icon="${IconFolder}/search-alt-2.png"
          enabled=${false}
          active=${DialogIsOpen('SearchDialog')}
          onClick=${(Event) => toggleDialog('SearchDialog', Event)}
        />
        <${WAD_Icon} Icon="${IconFolder}/gear.png"
          active=${DialogIsOpen('SettingsDialog')}
          enabled=${false}
          onClick=${(Event) => toggleDialog('SettingsDialog', Event)}
        />

        <${WAD_Icon} Icon="${IconFolder}/terminal.png" enabled=${false}/>
        <${WAD_Icon} Icon="${IconFolder}/clapperboard.png"
          onClick=${doCreateScreenshot}
        />
        <${WAD_PseudoDropDown} Icon="${IconFolder}/clapperboard-play.png"
          Placeholder="(please choose)" Value=""
          OptionList=${['without Designer', 'with Designer']}
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
    /**** remember fold expansions ****/
    const Expansions = Inspector.BehaviorExpansions;
    function toggleExpansion(Name) {
        Expansions[Name] = !Expansions[Name];
        WAT_rerender();
    }
    /**** remember scroll position ****/
    const ScrollPosition = Inspector.ScrollPositions.BehaviorBrowser;
    function updateScrollPosition(Event) {
        Inspector.ScrollPositions.BehaviorBrowser = Event.target.scrollTop;
    }
    const scrollablePane = useRef(null);
    useEffect(() => scrollablePane.current.base.scrollTop = ScrollPosition, []);
    /**** handle list item rendering and selection ****/
    const groupedBehaviorList = Applet.groupedBehaviorListOfCategory(selectedCategory);
    const GroupList = [], customGroupList = Object.keys(groupedBehaviorList);
    ['basic', 'native', 'traditional', 'mobile', 'wearable'].forEach((Prefix) => {
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
          class=${Classes.length === 0 ? undefined : Classes.join(' ')}
        >${Behavior.replace(/^.*[.]/, '')}</span>`;
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
          onClick=${(Event) => {
        if (DesignerState.BehaviorEditor.Category === selectedCategory) {
            toggleDialog('BehaviorEditor', Event);
        }
        else {
            DesignerState.BehaviorEditor.Category = selectedCategory;
            openDialog('BehaviorEditor', Event === null || Event === void 0 ? void 0 : Event.clientX, Event === null || Event === void 0 ? void 0 : Event.clientY); // *C* better position!
        }
    }}
        />
          <${WAD_Gap}/>
        <${WAD_Icon} Icon="${IconFolder}/minus.png"
          enabled=${(DesignerState.selectedBehavior != null) && !BehaviorIsIntrinsic(DesignerState.selectedBehavior)}
          onClick=${doDeleteSelectedBehavior}
        />
      </>

      <${WAD_vertically} style="
        flex:1 1 auto; overflow-x:hidden; overflow-y:scroll;
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
        if (DesignerState.BehaviorEditor.Category === selectedCategory) {
            toggleDialog('BehaviorEditor', Event);
        }
        else {
            DesignerState.BehaviorEditor.Category = selectedCategory;
            openDialog('BehaviorEditor', Event === null || Event === void 0 ? void 0 : Event.clientX, Event === null || Event === void 0 ? void 0 : Event.clientY); // *C* better position!
        }
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
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    const { Applet, Inspector, AppletResizer } = DesignerState;
    /**** remember fold expansions ****/
    const Expansions = Inspector.Expansions.AppletConfiguration;
    function toggleExpansion(Name) {
        Expansions[Name] = !Expansions[Name];
        WAT_rerender();
    }
    /**** remember scroll position ****/
    const ScrollPosition = Inspector.ScrollPositions.AppletConfiguration;
    function updateScrollPosition(Event) {
        Inspector.ScrollPositions.AppletConfiguration = Event.target.scrollTop;
    }
    const scrollablePane = useRef(null);
    useEffect(() => scrollablePane.current.base.scrollTop = ScrollPosition, []);
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
          readonly Value=${Applet.Name}
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
          onClick=${(Event) => {
        if (DesignerState.SynopsisEditor.Scope === 'Applet') {
            toggleDialog('SynopsisEditor', Event);
        }
        else {
            DesignerState.SynopsisEditor.Scope = 'Applet';
            openDialog('SynopsisEditor', Event === null || Event === void 0 ? void 0 : Event.clientX, Event === null || Event === void 0 ? void 0 : Event.clientY); // *C* better position!
        }
    }}
        />
      </>

      <${WAD_TextInput} Placeholder="(enter synopsis)" style="
        padding-top:4px; min-height:60px;
      " Value=${Applet.Synopsis}
        onInput=${(Event) => doConfigureApplet('Synopsis', Event.target.value)}
      />

      <${WAD_vertically} style="
        flex:1 1 auto; overflow-x:hidden; overflow-y:scroll;
        margin-top:6px;
      " ref=${scrollablePane} scrollTop=${ScrollPosition} onScroll=${updateScrollPosition}>
        <${WAD_Fold} Label="Visibility"
          Expansion=${Expansions.Visibility}
          toggleExpansion=${() => toggleExpansion('Visibility')}
        >
          <${WAD_horizontally}>
            <${WAD_Label}>Opacity [%]</>
            <${WAD_Gap}/>
            <${WAD_IntegerInput} style="width:60px"
              Value=${Applet.Opacity} Minimum=${0} Maximum=${100}
              onInput=${(Event) => doConfigureApplet('Opacity', parseFloat(Event.target.value))}
            />
          </>

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

        <${WAD_Fold} Label="Geometry"
          Expansion=${Expansions.Geometry}
          toggleExpansion=${() => toggleExpansion('Geometry')}
        >
          <${WAD_horizontally}>
            <${WAD_Label}>Position (x,y) [px]</>
            <${WAD_Gap}/>
            <${WAD_IntegerInput} readonly style="width:60px"
              Value=${Applet.x}
            />
              <div style="width:20px; padding-top:4px; text-align:center">,</div>
            <${WAD_IntegerInput} readonly style="width:60px"
              Value=${Applet.y}
            />
          </>

          <${WAD_horizontally}>
            <${WAD_Label}>Size (w,h) [px]</>
            <${WAD_Gap}/>
            <${WAD_IntegerInput} readonly style="width:60px"
              Value=${Applet.Width}
            />
              <div style="width:20px; padding-top:4px; text-align:center">x</div>
            <${WAD_IntegerInput} readonly style="width:60px"
              Value=${Applet.Height}
            />
          </>

          <${WAD_horizontally}>
            <${WAD_Label}>Limits</>
          </>
          <${WAD_horizontally}>
            <${WAD_Label} style="padding-left:10px">min. Size (w,h) [px]</>
            <${WAD_Gap}/>
            <${WAD_IntegerInput} readonly style="width:60px"
              Value=${Applet.minWidth}
            />
              <div style="width:20px; padding-top:4px; text-align:center">x</div>
            <${WAD_IntegerInput} readonly style="width:60px"
              Value=${Applet.minHeight}
            />
          </>
          <${WAD_horizontally}>
            <${WAD_Label} style="padding-left:10px">max. Size (w,h) [px]</>
            <${WAD_Gap}/>
            <${WAD_IntegerInput} readonly style="width:60px"
              Value=${Applet.maxWidth}
            />
              <div style="width:20px; padding-top:4px; text-align:center">x</div>
            <${WAD_IntegerInput} readonly style="width:60px"
              Value=${Applet.maxHeight}
            />
          </>

          <${WAD_horizontally}>
            <${WAD_Label}>center in Viewport</>
            <${WAD_Gap}/>
            <${WAD_Checkbox}
              Value=${Applet.toBeCentered}
              onInput=${(Event) => doConfigureApplet('toBeCentered', Event.target.checked)}
            />
          </>

          <${WAD_horizontally}>
            <${WAD_Label}>draw Frame in large Viewports</>
            <${WAD_Gap}/>
            <${WAD_Checkbox}
              Value=${Applet.withMobileFrame}
              onInput=${(Event) => doConfigureApplet('toBeCentered', Event.target.checked)}
            />
          </>

          <${WAD_horizontally}>
            <${WAD_Label}>expected mobile Orientation</>
            <${WAD_Gap}/>
            <${WAD_DropDown}
              Value=${Applet.expectedOrientation}
              onInput=${(Event) => doConfigureApplet('expectedOrientation', Event.target.checked)}
            />
          </>
        </>

        <${WAD_Fold} Label="Applet Resizing"
          Expansion=${Expansions.AppletResizing}
          toggleExpansion=${() => toggleExpansion('AppletResizing')}
        >
          <${WAD_horizontally}>
            <${WAD_Label} style="color:red">Warning: no undo possible!</>
          </>

          <${WAD_horizontally}>
            <${WAD_Label}>new Size (w,h) [px]</>
            <${WAD_Gap}/>
            <${WAD_IntegerInput} style="width:60px"
              Value=${AppletResizer.Width}
              Minimum=${0}
              onInput=${(Event) => AppletResizer.Width = parseFloat(Event.target.value)}
            />
              <div style="width:20px; padding-top:4px; text-align:center">x</div>
            <${WAD_IntegerInput} style="width:60px"
              Value=${AppletResizer.Height}
              Minimum=${0}
              onInput=${(Event) => AppletResizer.Height = parseFloat(Event.target.value)}
            />
          </>

          <${WAD_horizontally}>
            <${WAD_Label}>new Limits</>
          </>
          <${WAD_horizontally}>
            <${WAD_Label} style="padding-left:10px">min. Size (w,h) [px]</>
            <${WAD_Gap}/>
            <${WAD_IntegerInput} style="width:60px"
              Value=${AppletResizer.minWidth}
              Minimum=${0}
              onInput=${(Event) => AppletResizer.minWidth = parseFloat(Event.target.value)}
            />
              <div style="width:20px; padding-top:4px; text-align:center">x</div>
            <${WAD_IntegerInput} style="width:60px"
              Value=${AppletResizer.minHeight}
              Minimum=${0}
              onInput=${(Event) => AppletResizer.minHeight = parseFloat(Event.target.value)}
            />
          </>
          <${WAD_horizontally}>
            <${WAD_Label} style="padding-left:10px">max. Size (w,h) [px]</>
            <${WAD_Gap}/>
            <${WAD_IntegerInput} style="width:60px"
              Value=${AppletResizer.maxWidth}
              Minimum=${0}
              onInput=${(Event) => AppletResizer.maxWidth = parseFloat(Event.target.value)}
            />
              <div style="width:20px; padding-top:4px; text-align:center">x</div>
            <${WAD_IntegerInput} style="width:60px"
              Value=${AppletResizer.maxHeight}
              Minimum=${0}
              onInput=${(Event) => AppletResizer.maxHeight = parseFloat(Event.target.value)}
            />
          </>

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

        <${WAD_Fold} Label="Typography"
          Expansion=${Expansions.Typography}
          toggleExpansion=${() => toggleExpansion('Typography')}
        >
          <${WAD_horizontally}>
            <${WAD_Label}>Font Family</>
            <${WAD_Gap}/>
            <${WAD_TextlineInput} style="flex:1 0 auto"
              Suggestions=${[
        "Arial,Verdana,'Source Sans Pro','Open Sans',Helvetica,sans-serif",
        "'Times New Roman',Georgia,Cambria,serif",
        "'Courier New','Consolas','Lucida Console',Monaco,Menlo,monospace"
    ]}
              Value=${Applet.FontFamily}
              onInput=${(Event) => doConfigureApplet('FontFamily', Event.target.value)}
            />
          </>

          <${WAD_horizontally}>
            <${WAD_Label}>Typesetting</>
          </>
          <${WAD_horizontally}>
            <${WAD_Label} style="padding-left:10px">Size [px]</>
            <${WAD_Gap}/>
            <${WAD_IntegerInput} style="width:60px"
              Value=${Applet.FontSize} Minimum=${0} Maximum=${1000}
              onInput=${(Event) => doConfigureApplet('FontSize', parseFloat(Event.target.value))}
            />
          </>
          <${WAD_horizontally}>
            <${WAD_Label} style="padding-left:10px">Weight</>
            <${WAD_Gap}/>
            <${WAD_DropDown}
              Value=${Applet.FontWeight} Options=${WAT_FontWeights}
              onInput=${(Event) => doConfigureApplet('FontWeight', Event.target.value)}
            />
          </>
          <${WAD_horizontally}>
            <${WAD_Label} style="padding-left:10px">Style</>
            <${WAD_Gap}/>
            <${WAD_DropDown}
              Value=${Applet.FontStyle} Options=${WAT_FontStyles}
              onInput=${(Event) => doConfigureApplet('FontStyle', Event.target.value)}
            />
          </>
          <${WAD_horizontally}>
            <${WAD_Label} style="padding-left:10px">Color</>
            <${WAD_Gap}/>
            <${WAD_ColorInput}
              Value=${Applet.Color}
              onInput=${(Event) => doConfigureApplet('Color', Event.target.value)}
            />
          </>

          <${WAD_horizontally}>
            <${WAD_Label}>Text Shadow</>
            <${WAD_Gap}/>
            <${WAD_Checkbox}
              Value=${((_a = Applet.TextShadow) === null || _a === void 0 ? void 0 : _a.isActive) === true}
              onInput=${(Event) => {
        const { isActive, xOffset, yOffset, BlurRadius, Color } = (Applet.TextShadow || { isActive: false, xOffset: 0, yOffset: 0, BlurRadius: 5, Color: 'black' });
        doConfigureApplet('TextShadow', {
            isActive: Event.target.checked, xOffset, yOffset, BlurRadius, Color
        });
    }}
            />
          </>
          <${WAD_horizontally}>
            <${WAD_Label} style="padding-left:10px">Color</>
            <${WAD_Gap}/>
            <${WAD_ColorInput}
              Value=${(_b = Applet.TextShadow) === null || _b === void 0 ? void 0 : _b.Color}
              onInput=${(Event) => {
        const { isActive, xOffset, yOffset, BlurRadius, Color } = (Applet.TextShadow || { isActive: false, xOffset: 0, yOffset: 0, BlurRadius: 5, Color: 'black' });
        doConfigureApplet('TextShadow', {
            isActive, xOffset, yOffset, BlurRadius, Color: Event.target.value
        });
    }}
            />
          </>
          <${WAD_horizontally}>
            <${WAD_Label} style="padding-left:10px">Offset (dx,dy) [px]</>
            <${WAD_Gap}/>
            <${WAD_IntegerInput} readonly style="width:60px"
              Value=${(_c = Applet.TextShadow) === null || _c === void 0 ? void 0 : _c.xOffset}
              onInput=${(Event) => {
        const { isActive, xOffset, yOffset, BlurRadius, Color } = (Applet.TextShadow || { isActive: false, xOffset: 0, yOffset: 0, BlurRadius: 5, Color: 'black' });
        doConfigureApplet('TextShadow', {
            isActive, xOffset: parseFloat(Event.target.value), yOffset, BlurRadius, Color
        });
    }}
            />
              <div style="width:20px; padding-top:4px; text-align:center">,</div>
            <${WAD_IntegerInput} readonly style="width:60px"
              Value=${(_d = Applet.TextShadow) === null || _d === void 0 ? void 0 : _d.yOffset}
              onInput=${(Event) => {
        const { isActive, xOffset, yOffset, BlurRadius, Color } = (Applet.TextShadow || { isActive: false, xOffset: 0, yOffset: 0, BlurRadius: 5, Color: 'black' });
        doConfigureApplet('TextShadow', {
            isActive, xOffset, yOffset: parseFloat(Event.target.value), BlurRadius, Color
        });
    }}
            />
          </>
          <${WAD_horizontally}>
            <${WAD_Label} style="padding-left:10px">Blur Radius [px]</>
            <${WAD_Gap}/>
            <${WAD_IntegerInput} readonly style="width:60px"
              Value=${(_e = Applet.TextShadow) === null || _e === void 0 ? void 0 : _e.BlurRadius}
              onInput=${(Event) => {
        const { isActive, xOffset, yOffset, BlurRadius, Color } = (Applet.TextShadow || { isActive: false, xOffset: 0, yOffset: 0, BlurRadius: 5, Color: 'black' });
        doConfigureApplet('TextShadow', {
            isActive, xOffset, yOffset, BlurRadius: parseFloat(Event.target.value), Color
        });
    }}
            />
          </>

          <${WAD_horizontally}>
            <${WAD_Label}>Text Layout</>
          </>
          <${WAD_horizontally}>
            <${WAD_Label} style="padding-left:10px">Text Alignment</>
            <${WAD_Gap}/>
            <${WAD_DropDown}
              Value=${Applet.TextAlignment} Options=${WAT_TextAlignments}
              onInput=${(Event) => doConfigureApplet('TextAlignment', Event.target.value)}
            />
          </>
          <${WAD_horizontally}>
            <${WAD_Label} style="padding-left:10px">Line Height [px]</>
            <${WAD_Gap}/>
            <${WAD_IntegerInput} style="width:60px"
              Value=${Applet.LineHeight} Minimum=${0} Maximum=${1000}
              onInput=${(Event) => doConfigureApplet('LineHeight', parseFloat(Event.target.value))}
            />
          </>
        </>

        <${WAD_Fold} Label="Background"
          Expansion=${Expansions.Background}
          toggleExpansion=${() => toggleExpansion('Background')}
        >
          <${WAD_horizontally}>
            <${WAD_Label}>Background</>
            <${WAD_Gap}/>
            <${WAD_Checkbox}
              Value=${Applet.hasBackground === true}
              onInput=${(Event) => doConfigureApplet('hasBackground', Event.target.checked)}
            />
          </>

          <${WAD_horizontally}>
            <${WAD_Label}>Color</>
            <${WAD_Gap}/>
            <${WAD_ColorInput}
              Value=${Applet.BackgroundColor}
              onInput=${(Event) => doConfigureApplet('BackgroundColor', Event.target.value)}
            />
          </>

          <${WAD_horizontally}>
            <${WAD_Label}>Texture</>
            <${WAD_Gap}/>
            <${WAD_Checkbox}
              Value=${((_f = Applet.BackgroundTexture) === null || _f === void 0 ? void 0 : _f.isActive) === true}
              onInput=${(Event) => {
        const { isActive, ImageURL, Mode, xOffset, yOffset } = (Applet.BackgroundTexture || { isActive: false, ImageURL: '', Mode: 'tile', xOffset: 0, yOffset: 0 });
        doConfigureApplet('BackgroundTexture', {
            isActive: Event.target.checked, ImageURL, Mode, xOffset, yOffset
        });
    }}
            />
          </>
          <${WAD_horizontally}>
            <${WAD_Label} style="padding-left:10px">Mode</>
            <${WAD_Gap}/>
            <${WAD_DropDown}
              Value=${(_g = Applet.BackgroundTexture) === null || _g === void 0 ? void 0 : _g.Mode} Options=${WAT_BackgroundModes}
              onInput=${(Event) => {
        const { isActive, ImageURL, Mode, xOffset, yOffset } = (Applet.BackgroundTexture || { isActive: false, ImageURL: '', Mode: 'tile', xOffset: 0, yOffset: 0 });
        doConfigureApplet('BackgroundTexture', {
            isActive, ImageURL, Mode: Event.target.value, xOffset, yOffset
        });
    }}
            />
          </>
          <${WAD_horizontally}>
            <${WAD_Label} style="padding-left:10px">Image URL</>
            <${WAD_Gap}/>
            <${WAD_TextlineInput} Type="url" style="flex:1 0 auto"
              Value=${(_h = Applet.BackgroundTexture) === null || _h === void 0 ? void 0 : _h.ImageURL}
              onInput=${(Event) => {
        const { isActive, ImageURL, Mode, xOffset, yOffset } = (Applet.BackgroundTexture || { isActive: false, ImageURL: '', Mode: 'tile', xOffset: 0, yOffset: 0 });
        doConfigureApplet('BackgroundTexture', {
            isActive, ImageURL: Event.target.value, Mode, xOffset, yOffset
        });
    }}
            />
          </>
          <${WAD_horizontally}>
            <${WAD_Label} style="padding-left:10px">Offset (dx,dy) [px]</>
            <${WAD_Gap}/>
            <${WAD_IntegerInput} readonly style="width:60px"
              Value=${(_j = Applet.BackgroundTexture) === null || _j === void 0 ? void 0 : _j.xOffset}
              onInput=${(Event) => {
        const { isActive, ImageURL, Mode, xOffset, yOffset } = (Applet.BackgroundTexture || { isActive: false, ImageURL: '', Mode: 'tile', xOffset: 0, yOffset: 0 });
        doConfigureApplet('BackgroundTexture', {
            isActive, ImageURL, Mode, xOffset: Event.target.value, yOffset
        });
    }}
            />
              <div style="width:20px; padding-top:4px; text-align:center">,</div>
            <${WAD_IntegerInput} readonly style="width:60px"
              Value=${(_k = Applet.BackgroundTexture) === null || _k === void 0 ? void 0 : _k.yOffset}
              onInput=${(Event) => {
        const { isActive, ImageURL, Mode, xOffset, yOffset } = (Applet.BackgroundTexture || { isActive: false, ImageURL: '', Mode: 'tile', xOffset: 0, yOffset: 0 });
        doConfigureApplet('BackgroundTexture', {
            isActive, ImageURL, Mode, xOffset, yOffset: parseFloat(Event.target.value)
        });
    }}
            />
          </>
        </>

        <${WAD_Fold} Label="Layout Settings"
          Expansion=${Expansions.Layout}
          toggleExpansion=${() => toggleExpansion('Layout')}
        >
          <${WAD_horizontally}>
            <${WAD_Label}>Snap-to-Grid</>
            <${WAD_Gap}/>
            <${WAD_Checkbox}
              Value=${Applet.SnapToGrid}
              onInput=${(Event) => doConfigureApplet('SnapToGrid', Event.target.checked)}
            />
          </>

          <${WAD_horizontally}>
            <${WAD_Label}>Grid Size (w,h) [px]</>
            <${WAD_Gap}/>
            <${WAD_IntegerInput} style="width:60px"
              Value=${Applet.GridWidth}
              onInput=${(Event) => doConfigureApplet('GridWidth', parseFloat(Event.target.value))}
            />
              <div style="width:20px; padding-top:4px; text-align:center">x</div>
            <${WAD_IntegerInput} style="width:60px"
              Value=${Applet.GridHeight}
              onInput=${(Event) => doConfigureApplet('GridHeight', parseFloat(Event.target.value))}
            />
          </>
        </>        <${WAD_Fold} Label="Head Extensions"
          Expansion=${Expansions.HeadExtensions}
          toggleExpansion=${() => toggleExpansion('HeadExtensions')}
        >
          <${WAD_horizontally}>
            <${WAD_Label}>${'<'}head${'>'} Exensions</>
          </>

          <${WAD_TextInput} Placeholder="(enter <head> extensions)" style="
            flex:1 0 auto; padding-top:4px; min-height:60px;
            white-space:pre;
          " Value=${Applet.HeadExtensions}
            onInput=${(Event) => doConfigureApplet('HeadExtensions', Event.target.value)}
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
              onClick=${(Event) => {
        if (DesignerState.ScriptEditor.Scope === 'Applet') {
            toggleDialog('ScriptEditor', Event);
        }
        else {
            DesignerState.ScriptEditor.Scope = 'Applet';
            openDialog('ScriptEditor', Event === null || Event === void 0 ? void 0 : Event.clientX, Event === null || Event === void 0 ? void 0 : Event.clientY); // *C* better position!
        }
    }}
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

      <${WAD_horizontally}>
        <${WAD_ErrorView} style="flex:1 1 auto" ErrorReport=${ReportToShow}/>
        <${WAD_Icon} Icon="${IconFolder}/triangle-exclamation.png" style="
          display:${ReportToShow == null ? 'none' : 'block'};
          padding-top:6px;
        " onClick=${() => {
        const { ReportToShow } = DesignerState.Inspector;
        window.alert(ReportToShow.Type + '\n\n' + ReportToShow.Message);
    }}
        />
      </>
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
        return `<span style="${Style}">${HTMLsafe_(Page.Name) || `(unnamed ${Page.Behavior || 'page'})`}</span>`;
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
          Value=${Applet.Name}
          onInput=${(Event) => doConfigureApplet('Name', Event.target.value)}
        />
      </>

      <${WAD_horizontally} style="padding-top:4px; padding-bottom:4px">
        <${WAD_BehaviorPseudoDropDown} Icon="${IconFolder}/plus.png"
          groupedOptionList=${Applet.groupedBehaviorListOfCategory('page')}
          onInput=${(Event) => {
        doCreatePage(Event.target.value);
        Event.target.value = '';
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
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    const { Applet, Inspector } = DesignerState;
    /**** remember fold expansions ****/
    const Expansions = Inspector.Expansions.PageConfiguration;
    function toggleExpansion(Name) {
        Expansions[Name] = !Expansions[Name];
        WAT_rerender();
    }
    /**** remember scroll position ****/
    const ScrollPosition = Inspector.ScrollPositions.PageConfiguration;
    function updateScrollPosition(Event) {
        Inspector.ScrollPositions.PageConfiguration = Event.target.scrollTop;
    }
    const scrollablePane = useRef(null);
    useEffect(() => scrollablePane.current.base.scrollTop = ScrollPosition, []);
    /**** prepare behavior-specific properties ****/
    const { visitedPage } = Applet;
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
          onClick=${(Event) => {
        if (DesignerState.SynopsisEditor.Scope === 'visitedPage') {
            toggleDialog('SynopsisEditor', Event);
        }
        else {
            DesignerState.SynopsisEditor.Scope = 'visitedPage';
            openDialog('SynopsisEditor', Event === null || Event === void 0 ? void 0 : Event.clientX, Event === null || Event === void 0 ? void 0 : Event.clientY); // *C* better position!
        }
    }}
        />
      </>

      <${WAD_TextInput} Placeholder="(enter synopsis)" style="
        padding-top:4px; min-height:60px;
      " Value=${visitedPage.Synopsis}
        onInput=${(Event) => doConfigureVisitedPage('Synopsis', Event.target.value)}
      />

      <${WAD_vertically} style="
        flex:1 1 auto; overflow-x:hidden; overflow-y:scroll;
        margin-top:6px;
      " ref=${scrollablePane} scrollTop=${ScrollPosition} onScroll=${updateScrollPosition}>
        <${WAD_Fold} Label="Visibility"
          Expansion=${Expansions.Visibility}
          toggleExpansion=${() => toggleExpansion('Visibility')}
        >
          <${WAD_horizontally}>
            <${WAD_Label}>Opacity [%]</>
            <${WAD_Gap}/>
            <${WAD_IntegerInput} style="width:60px"
              Value=${visitedPage.Opacity} Minimum=${0} Maximum=${100}
              onInput=${(Event) => doConfigureVisitedPage('Opacity', parseFloat(Event.target.value))}
            />
          </>

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
          <${WAD_horizontally}>
            <${WAD_Label}>Position (x,y) [px]</>
            <${WAD_Gap}/>
            <${WAD_IntegerInput} readonly style="width:60px"
              Value=${visitedPage.x}
            />
              <div style="width:20px; padding-top:4px; text-align:center">,</div>
            <${WAD_IntegerInput} readonly style="width:60px"
              Value=${visitedPage.y}
            />
          </>

          <${WAD_horizontally}>
            <${WAD_Label}>Size (w,h) [px]</>
            <${WAD_Gap}/>
            <${WAD_IntegerInput} readonly style="width:60px"
              Value=${visitedPage.Width}
            />
              <div style="width:20px; padding-top:4px; text-align:center">x</div>
            <${WAD_IntegerInput} readonly style="width:60px"
              Value=${visitedPage.Height}
            />
          </>
        </>

        <${WAD_Fold} Label="Typography"
          Expansion=${Expansions.Typography}
          toggleExpansion=${() => toggleExpansion('Typography')}
        >
          <${WAD_horizontally}>
            <${WAD_Label}>Font Family</>
            <${WAD_Gap}/>
            <${WAD_TextlineInput} style="flex:1 0 auto"
              Suggestions=${[
        "Arial,Verdana,'Source Sans Pro','Open Sans',Helvetica,sans-serif",
        "'Times New Roman',Georgia,Cambria,serif",
        "'Courier New','Consolas','Lucida Console',Monaco,Menlo,monospace"
    ]}
              Value=${visitedPage.FontFamily}
              onInput=${(Event) => doConfigureVisitedPage('FontFamily', Event.target.value)}
            />
          </>

          <${WAD_horizontally}>
            <${WAD_Label}>Typesetting</>
          </>
          <${WAD_horizontally}>
            <${WAD_Label} style="padding-left:10px">Size [px]</>
            <${WAD_Gap}/>
            <${WAD_IntegerInput} style="width:60px"
              Value=${visitedPage.FontSize} Minimum=${0} Maximum=${1000}
              onInput=${(Event) => doConfigureVisitedPage('FontSize', parseFloat(Event.target.value))}
            />
          </>
          <${WAD_horizontally}>
            <${WAD_Label} style="padding-left:10px">Weight</>
            <${WAD_Gap}/>
            <${WAD_DropDown}
              Value=${visitedPage.FontWeight} Options=${WAT_FontWeights}
              onInput=${(Event) => doConfigureVisitedPage('FontWeight', Event.target.value)}
            />
          </>
          <${WAD_horizontally}>
            <${WAD_Label} style="padding-left:10px">Style</>
            <${WAD_Gap}/>
            <${WAD_DropDown}
              Value=${visitedPage.FontStyle} Options=${WAT_FontStyles}
              onInput=${(Event) => doConfigureVisitedPage('FontStyle', Event.target.value)}
            />
          </>
          <${WAD_horizontally}>
            <${WAD_Label} style="padding-left:10px">Color</>
            <${WAD_Gap}/>
            <${WAD_ColorInput}
              Value=${visitedPage.Color}
              onInput=${(Event) => doConfigureVisitedPage('Color', Event.target.value)}
            />
          </>

          <${WAD_horizontally}>
            <${WAD_Label}>Text Shadow</>
            <${WAD_Gap}/>
            <${WAD_Checkbox}
              Value=${((_a = visitedPage.TextShadow) === null || _a === void 0 ? void 0 : _a.isActive) === true}
              onInput=${(Event) => {
        const { isActive, xOffset, yOffset, BlurRadius, Color } = (visitedPage.TextShadow || { isActive: false, xOffset: 0, yOffset: 0, BlurRadius: 5, Color: 'black' });
        doConfigureVisitedPage('TextShadow', {
            isActive: Event.target.checked, xOffset, yOffset, BlurRadius, Color
        });
    }}
            />
          </>
          <${WAD_horizontally}>
            <${WAD_Label} style="padding-left:10px">Color</>
            <${WAD_Gap}/>
            <${WAD_ColorInput}
              Value=${(_b = visitedPage.TextShadow) === null || _b === void 0 ? void 0 : _b.Color}
              onInput=${(Event) => {
        const { isActive, xOffset, yOffset, BlurRadius, Color } = (visitedPage.TextShadow || { isActive: false, xOffset: 0, yOffset: 0, BlurRadius: 5, Color: 'black' });
        doConfigureVisitedPage('TextShadow', {
            isActive, xOffset, yOffset, BlurRadius, Color: Event.target.value
        });
    }}
            />
          </>
          <${WAD_horizontally}>
            <${WAD_Label} style="padding-left:10px">Offset (dx,dy) [px]</>
            <${WAD_Gap}/>
            <${WAD_IntegerInput} readonly style="width:60px"
              Value=${(_c = visitedPage.TextShadow) === null || _c === void 0 ? void 0 : _c.xOffset}
              onInput=${(Event) => {
        const { isActive, xOffset, yOffset, BlurRadius, Color } = (visitedPage.TextShadow || { isActive: false, xOffset: 0, yOffset: 0, BlurRadius: 5, Color: 'black' });
        doConfigureVisitedPage('TextShadow', {
            isActive, xOffset: parseFloat(Event.target.value), yOffset, BlurRadius, Color
        });
    }}
            />
              <div style="width:20px; padding-top:4px; text-align:center">,</div>
            <${WAD_IntegerInput} readonly style="width:60px"
              Value=${(_d = visitedPage.TextShadow) === null || _d === void 0 ? void 0 : _d.yOffset}
              onInput=${(Event) => {
        const { isActive, xOffset, yOffset, BlurRadius, Color } = (visitedPage.TextShadow || { isActive: false, xOffset: 0, yOffset: 0, BlurRadius: 5, Color: 'black' });
        doConfigureVisitedPage('TextShadow', {
            isActive, xOffset, yOffset: parseFloat(Event.target.value), BlurRadius, Color
        });
    }}
            />
          </>
          <${WAD_horizontally}>
            <${WAD_Label} style="padding-left:10px">Blur Radius [px]</>
            <${WAD_Gap}/>
            <${WAD_IntegerInput} readonly style="width:60px"
              Value=${(_e = visitedPage.TextShadow) === null || _e === void 0 ? void 0 : _e.BlurRadius}
              onInput=${(Event) => {
        const { isActive, xOffset, yOffset, BlurRadius, Color } = (visitedPage.TextShadow || { isActive: false, xOffset: 0, yOffset: 0, BlurRadius: 5, Color: 'black' });
        doConfigureVisitedPage('TextShadow', {
            isActive, xOffset, yOffset, BlurRadius: parseFloat(Event.target.value), Color
        });
    }}
            />
          </>

          <${WAD_horizontally}>
            <${WAD_Label}>Text Layout</>
          </>
          <${WAD_horizontally}>
            <${WAD_Label} style="padding-left:10px">Text Alignment</>
            <${WAD_Gap}/>
            <${WAD_DropDown}
              Value=${visitedPage.TextAlignment} Options=${WAT_TextAlignments}
              onInput=${(Event) => doConfigureVisitedPage('TextAlignment', Event.target.value)}
            />
          </>
          <${WAD_horizontally}>
            <${WAD_Label} style="padding-left:10px">Line Height [px]</>
            <${WAD_Gap}/>
            <${WAD_IntegerInput} style="width:60px"
              Value=${visitedPage.LineHeight} Minimum=${0} Maximum=${1000}
              onInput=${(Event) => doConfigureVisitedPage('LineHeight', parseFloat(Event.target.value))}
            />
          </>
        </>

        <${WAD_Fold} Label="Background"
          Expansion=${Expansions.Background}
          toggleExpansion=${() => toggleExpansion('Background')}
        >
          <${WAD_horizontally}>
            <${WAD_Label}>Background</>
            <${WAD_Gap}/>
            <${WAD_Checkbox}
              Value=${visitedPage.hasBackground === true}
              onInput=${(Event) => doConfigureVisitedPage('hasBackground', Event.target.checked)}
            />
          </>

          <${WAD_horizontally}>
            <${WAD_Label}>Color</>
            <${WAD_Gap}/>
            <${WAD_ColorInput}
              Value=${visitedPage.BackgroundColor}
              onInput=${(Event) => doConfigureVisitedPage('BackgroundColor', Event.target.value)}
            />
          </>

          <${WAD_horizontally}>
            <${WAD_Label}>Texture</>
            <${WAD_Gap}/>
            <${WAD_Checkbox}
              Value=${((_f = visitedPage.BackgroundTexture) === null || _f === void 0 ? void 0 : _f.isActive) === true}
              onInput=${(Event) => {
        const { isActive, ImageURL, Mode, xOffset, yOffset } = (visitedPage.BackgroundTexture || { isActive: false, ImageURL: '', Mode: 'tile', xOffset: 0, yOffset: 0 });
        doConfigureVisitedPage('BackgroundTexture', {
            isActive: Event.target.checked, ImageURL, Mode, xOffset, yOffset
        });
    }}
            />
          </>
          <${WAD_horizontally}>
            <${WAD_Label} style="padding-left:10px">Mode</>
            <${WAD_Gap}/>
            <${WAD_DropDown}
              Value=${(_g = visitedPage.BackgroundTexture) === null || _g === void 0 ? void 0 : _g.Mode} Options=${WAT_BackgroundModes}
              onInput=${(Event) => {
        const { isActive, ImageURL, Mode, xOffset, yOffset } = (visitedPage.BackgroundTexture || { isActive: false, ImageURL: '', Mode: 'tile', xOffset: 0, yOffset: 0 });
        doConfigureVisitedPage('BackgroundTexture', {
            isActive, ImageURL, Mode: Event.target.value, xOffset, yOffset
        });
    }}
            />
          </>
          <${WAD_horizontally}>
            <${WAD_Label} style="padding-left:10px">Image URL</>
            <${WAD_Gap}/>
            <${WAD_TextlineInput} Type="url" style="flex:1 0 auto"
              Value=${(_h = visitedPage.BackgroundTexture) === null || _h === void 0 ? void 0 : _h.ImageURL}
              onInput=${(Event) => {
        const { isActive, ImageURL, Mode, xOffset, yOffset } = (visitedPage.BackgroundTexture || { isActive: false, ImageURL: '', Mode: 'tile', xOffset: 0, yOffset: 0 });
        doConfigureVisitedPage('BackgroundTexture', {
            isActive, ImageURL: Event.target.value, Mode, xOffset, yOffset
        });
    }}
            />
          </>
          <${WAD_horizontally}>
            <${WAD_Label} style="padding-left:10px">Offset (dx,dy) [px]</>
            <${WAD_Gap}/>
            <${WAD_IntegerInput} readonly style="width:60px"
              Value=${(_j = visitedPage.BackgroundTexture) === null || _j === void 0 ? void 0 : _j.xOffset}
              onInput=${(Event) => {
        const { isActive, ImageURL, Mode, xOffset, yOffset } = (visitedPage.BackgroundTexture || { isActive: false, ImageURL: '', Mode: 'tile', xOffset: 0, yOffset: 0 });
        doConfigureVisitedPage('BackgroundTexture', {
            isActive, ImageURL, Mode, xOffset: Event.target.value, yOffset
        });
    }}
            />
              <div style="width:20px; padding-top:4px; text-align:center">,</div>
            <${WAD_IntegerInput} readonly style="width:60px"
              Value=${(_k = visitedPage.BackgroundTexture) === null || _k === void 0 ? void 0 : _k.yOffset}
              onInput=${(Event) => {
        const { isActive, ImageURL, Mode, xOffset, yOffset } = (visitedPage.BackgroundTexture || { isActive: false, ImageURL: '', Mode: 'tile', xOffset: 0, yOffset: 0 });
        doConfigureVisitedPage('BackgroundTexture', {
            isActive, ImageURL, Mode, xOffset, yOffset: parseFloat(Event.target.value)
        });
    }}
            />
          </>
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
              active=${DialogIsOpen('ScriptEditor') && (DesignerState.ScriptEditor.Scope === 'visitedPage')}
              onClick=${(Event) => {
        if (DesignerState.ScriptEditor.Scope === 'visitedPage') {
            toggleDialog('ScriptEditor', Event);
        }
        else {
            DesignerState.ScriptEditor.Scope = 'visitedPage';
            openDialog('ScriptEditor', Event === null || Event === void 0 ? void 0 : Event.clientX, Event === null || Event === void 0 ? void 0 : Event.clientY); // *C* better position!
        }
    }}
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

      <${WAD_horizontally}>
        <${WAD_ErrorView} style="flex:1 1 auto" ErrorReport=${ReportToShow}/>
        <${WAD_Icon} Icon="${IconFolder}/triangle-exclamation.png" style="
          display:${ReportToShow == null ? 'none' : 'block'};
          padding-top:6px;
        " onClick=${() => {
        const { ReportToShow } = DesignerState.Inspector;
        window.alert(ReportToShow.Type + '\n\n' + ReportToShow.Message);
    }}
        />
      </>
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
            return `<span style="font-style:italic">(unnamed ${Widget.Behavior || 'widget'})</span>`;
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
        Event.target.value = '';
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
    /**** remember fold expansions ****/
    const Expansions = Inspector.Expansions.WidgetConfiguration;
    function toggleExpansion(Name) {
        Expansions[Name] = !Expansions[Name];
        WAT_rerender();
    }
    /**** remember scroll position ****/
    const ScrollPosition = Inspector.ScrollPositions.WidgetConfiguration;
    function updateScrollPosition(Event) {
        Inspector.ScrollPositions.WidgetConfiguration = Event.target.scrollTop;
    }
    const scrollablePane = useRef(null);
    useEffect(() => scrollablePane.current.base.scrollTop = ScrollPosition, []);
    /**** handle value input ****/
    let ValueType = 'string';
    let ValueToEdit = commonValueOf(selectedWidgets.map((Widget) => Widget.Value));
    switch (true) {
        case (ValueToEdit == null):
        case (ValueToEdit === multipleValues):
        case (ValueToEdit === noSelection):
            break;
        default:
            ValueType = typeof ValueToEdit;
            if (ValueType === 'object') {
                ValueToEdit = JSON.stringify(ValueToEdit, null, 2);
            }
            else {
                ValueToEdit = '' + ValueToEdit;
            }
    }
    function _onValueInput(Event) {
        const editedValue = Event.target.value;
        let Value = undefined;
        switch (ValueType) {
            case 'boolean':
                Value = Boolean(editedValue);
                break;
            case 'number':
                Value = Number(editedValue);
                break;
            case 'string':
                Value = editedValue;
                break;
            default: Value = JSON.parse(editedValue); // may fail!
        }
        doConfigureSelectedWidgets('Value', Value);
    }
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
    const ReportToShow = ScriptError || ErrorReport;
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
          onClick=${(Event) => {
        if (DesignerState.SynopsisEditor.Scope === 'selectedWidgets') {
            toggleDialog('SynopsisEditor', Event);
        }
        else {
            DesignerState.SynopsisEditor.Scope = 'selectedWidgets';
            openDialog('SynopsisEditor', Event === null || Event === void 0 ? void 0 : Event.clientX, Event === null || Event === void 0 ? void 0 : Event.clientY); // *C* better position!
        }
    }}
        />
      </>

      <${WAD_TextInput} Placeholder="(enter synopsis)" style="
        padding-top:4px; min-height:60px;
      " enabled=${selectedWidgets.length > 0}
        Value=${commonValueOf(selectedWidgets.map((Widget) => Widget.Synopsis))}
        onInput=${(Event) => doConfigureSelectedWidgets('Synopsis', Event.target.value)}
      />

      <${WAD_vertically} style="
        flex:1 1 auto; overflow-x:hidden; overflow-y:scroll;
        margin-top:6px;
      " ref=${scrollablePane} scrollTop=${ScrollPosition} onScroll=${updateScrollPosition}>
        <${WAD_Fold} Label="Visibility and Enabling"
          Expansion=${Expansions.Visibility}
          toggleExpansion=${() => toggleExpansion('Visibility')}
        >
          <${WAD_horizontally}>
            <${WAD_Label}>Visibility</>
            <${WAD_Gap}/>
            <${WAD_Checkbox}
              enabled=${selectedWidgets.length > 0}
              Value=${commonValueOf(selectedWidgets.map((Widget) => Widget.Visibility))}
              onInput=${(Event) => doConfigureSelectedWidgets('Visibility', Event.target.checked)}
            />
          </>

          <${WAD_horizontally}>
            <${WAD_Label}>Selection Lock</>
            <${WAD_Gap}/>
            <${WAD_Checkbox}
              enabled=${selectedWidgets.length > 0}
              Value=${commonValueOf(selectedWidgets.map((Widget) => Widget.Lock))}
              onInput=${(Event) => doConfigureSelectedWidgets('Lock', Event.target.checked)}
            />
          </>

          <${WAD_horizontally}>
            <${WAD_Label}>Opacity [%]</>
            <${WAD_Gap}/>
            <${WAD_IntegerInput} style="width:60px"
              enabled=${selectedWidgets.length > 0}
              Value=${commonValueOf(selectedWidgets.map((Widget) => Widget.Opacity))}
              Minimum=${0} Maximum=${100}
              onInput=${(Event) => doConfigureSelectedWidgets('Opacity', parseFloat(Event.target.value))}
            />
          </>

          <${WAD_horizontally}>
            <${WAD_Label}>Overflows</>
            <${WAD_Gap}/>
            <${WAD_DropDown} Options=${WAT_Overflows}
              enabled=${selectedWidgets.length > 0}
              Value=${commonValueItemOf(selectedWidgets.map((Widget) => Widget.Overflows), 0)}
              onInput=${(Event) => {
        const [Overflow_0, Overflow_1] = (commonValueOf(selectedWidgets.map((Widget) => Widget.Overflows || ['visible', 'visible'])));
        doConfigureSelectedWidgets('Overflows', [
            Event.target.value, Overflow_1
        ]);
    }}
            />
              <div style="width:10px"/>
            <${WAD_DropDown} Options=${WAT_Overflows}
              enabled=${selectedWidgets.length > 0}
              Value=${commonValueItemOf(selectedWidgets.map((Widget) => Widget.Overflows), 1)}
              onInput=${(Event) => {
        const [Overflow_0, Overflow_1] = (commonValueOf(selectedWidgets.map((Widget) => Widget.Overflows || ['visible', 'visible'])));
        doConfigureSelectedWidgets('Overflows', [
            Overflow_0, Event.target.value
        ]);
    }}
            />
          </>

          <${WAD_horizontally} style="padding-top:4px">
            <${WAD_Label}>Enabling</>
            <${WAD_Gap}/>
            <${WAD_Checkbox}
              enabled=${selectedWidgets.length > 0}
              Value=${commonValueOf(selectedWidgets.map((Widget) => Widget.Enabling))}
              onInput=${(Event) => doConfigureSelectedWidgets('Enabling', Event.target.checked)}
            />
          </>
        </>

        <${WAD_Fold} Label="Geometry"
          Expansion=${Expansions.Geometry}
          toggleExpansion=${() => toggleExpansion('Geometry')}
        >
          <${WAD_horizontally}>
            <${WAD_Label}>Position (x,y) [px]</>
            <${WAD_Gap}/>
            <${WAD_IntegerInput} style="width:60px"
              enabled=${selectedWidgets.length > 0}
              Value=${commonValueOf(selectedWidgets.map((Widget) => Widget.x))}
              onInput=${(Event) => doConfigureSelectedWidgets('x', parseFloat(Event.target.value))}
            />
              <div style="width:20px; padding-top:4px; text-align:center">,</div>
            <${WAD_IntegerInput} style="width:60px"
              enabled=${selectedWidgets.length > 0}
              Value=${commonValueOf(selectedWidgets.map((Widget) => Widget.y))}
              onInput=${(Event) => doConfigureSelectedWidgets('y', parseFloat(Event.target.value))}
            />
          </>

          <${WAD_horizontally}>
            <${WAD_Label}>Size (w,h) [px]</>
            <${WAD_Gap}/>
            <${WAD_IntegerInput} style="width:60px"
              enabled=${selectedWidgets.length > 0}
              Value=${commonValueOf(selectedWidgets.map((Widget) => Widget.Width))}
              onInput=${(Event) => doConfigureSelectedWidgets('Width', parseFloat(Event.target.value))}
            />
              <div style="width:20px; padding-top:4px; text-align:center">x</div>
            <${WAD_IntegerInput} style="width:60px"
              enabled=${selectedWidgets.length > 0}
              Value=${commonValueOf(selectedWidgets.map((Widget) => Widget.Height))}
              onInput=${(Event) => doConfigureSelectedWidgets('Height', parseFloat(Event.target.value))}
            />
          </>

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

          <${WAD_horizontally}>
            <${WAD_Label}>Limits</>
          </>
          <${WAD_horizontally}>
            <${WAD_Label} style="padding-left:10px">min. Size (w,h) [px]</>
            <${WAD_Gap}/>
            <${WAD_IntegerInput} style="width:60px"
              enabled=${selectedWidgets.length > 0}
              Value=${commonValueOf(selectedWidgets.map((Widget) => Widget.minWidth))}
              onInput=${(Event) => doConfigureSelectedWidgets('minWidth', parseFloat(Event.target.value))}
            />
              <div style="width:20px; padding-top:4px; text-align:center">x</div>
            <${WAD_IntegerInput} style="width:60px"
              enabled=${selectedWidgets.length > 0}
              Value=${commonValueOf(selectedWidgets.map((Widget) => Widget.minHeight))}
              onInput=${(Event) => doConfigureSelectedWidgets('minHeight', parseFloat(Event.target.value))}
            />
          </>
          <${WAD_horizontally}>
            <${WAD_Label} style="padding-left:10px">max. Size (w,h) [px]</>
            <${WAD_Gap}/>
            <${WAD_IntegerInput} style="width:60px"
              enabled=${selectedWidgets.length > 0}
              Value=${commonValueOf(selectedWidgets.map((Widget) => Widget.maxWidth))}
              onInput=${(Event) => doConfigureSelectedWidgets('maxWidth', parseFloat(Event.target.value))}
            />
              <div style="width:20px; padding-top:4px; text-align:center">x</div>
            <${WAD_IntegerInput} style="width:60px"
              enabled=${selectedWidgets.length > 0}
              Value=${commonValueOf(selectedWidgets.map((Widget) => Widget.maxHeight))}
              onInput=${(Event) => doConfigureSelectedWidgets('maxHeight', parseFloat(Event.target.value))}
            />
          </>
        </>

        <${WAD_Fold} Label="Typography"
          Expansion=${Expansions.Typography}
          toggleExpansion=${() => toggleExpansion('Typography')}
        >
          <${WAD_horizontally}>
            <${WAD_Label}>Font Family</>
            <${WAD_Gap}/>
            <${WAD_TextlineInput} style="flex:1 0 auto"
              enabled=${selectedWidgets.length > 0}
              Suggestions=${[
        "Arial,Verdana,'Source Sans Pro','Open Sans',Helvetica,sans-serif",
        "'Times New Roman',Georgia,Cambria,serif",
        "'Courier New','Consolas','Lucida Console',Monaco,Menlo,monospace"
    ]}
              Value=${commonValueOf(selectedWidgets.map((Widget) => Widget.FontFamily))}
              onInput=${(Event) => doConfigureSelectedWidgets('FontFamily', Event.target.value)}
            />
          </>

          <${WAD_horizontally}>
            <${WAD_Label}>Typesetting</>
          </>
          <${WAD_horizontally}>
            <${WAD_Label} style="padding-left:10px">Size [px]</>
            <${WAD_Gap}/>
            <${WAD_IntegerInput} style="width:60px"
              enabled=${selectedWidgets.length > 0}
              Value=${commonValueOf(selectedWidgets.map((Widget) => Widget.FontSize))}
              Minimum=${0} Maximum=${1000}
              onInput=${(Event) => doConfigureSelectedWidgets('FontSize', parseFloat(Event.target.value))}
            />
          </>
          <${WAD_horizontally}>
            <${WAD_Label} style="padding-left:10px">Weight</>
            <${WAD_Gap}/>
            <${WAD_DropDown}
              enabled=${selectedWidgets.length > 0}
              Value=${commonValueOf(selectedWidgets.map((Widget) => Widget.FontWeight))}
              Options=${WAT_FontWeights}
              onInput=${(Event) => doConfigureSelectedWidgets('FontWeight', Event.target.value)}
            />
          </>
          <${WAD_horizontally}>
            <${WAD_Label} style="padding-left:10px">Style</>
            <${WAD_Gap}/>
            <${WAD_DropDown}
              enabled=${selectedWidgets.length > 0}
              Value=${commonValueOf(selectedWidgets.map((Widget) => Widget.FontStyle))}
              Options=${WAT_FontStyles}
              onInput=${(Event) => doConfigureSelectedWidgets('FontStyle', Event.target.value)}
            />
          </>
          <${WAD_horizontally}>
            <${WAD_Label} style="padding-left:10px">Color</>
            <${WAD_Gap}/>
            <${WAD_ColorInput}
              enabled=${selectedWidgets.length > 0}
              Value=${commonValueOf(selectedWidgets.map((Widget) => Widget.Color))}
              onInput=${(Event) => doConfigureSelectedWidgets('Color', Event.target.value)}
            />
          </>

          <${WAD_horizontally}>
            <${WAD_Label}>Text Decoration</>
            <${WAD_Gap}/>
            <${WAD_Checkbox}
              enabled=${selectedWidgets.length > 0}
              Value=${commonValueItemOf(selectedWidgets.map((Widget) => Widget.TextDecoration), 'isActive')}
              onInput=${(Event) => {
        const { isActive, Line, Color, Style, Thickness } = (commonValueOf(selectedWidgets.map((Widget) => Widget.TextDecoration
            || { isActive: false, Line: 'none', Color: 'black', Style: 'solid', Thickness: 1 })));
        doConfigureSelectedWidgets('TextDecoration', {
            isActive: Event.target.checked, Line, Color, Style, Thickness
        });
    }}
            />
          </>
          <${WAD_horizontally}>
            <${WAD_Label} style="padding-left:10px">Line</>
            <${WAD_Gap}/>
            <${WAD_DropDown}
              enabled=${selectedWidgets.length > 0}
              Value=${commonValueItemOf(selectedWidgets.map((Widget) => Widget.TextDecoration), 'Line')}
              Options=${WAT_TextDecorationLines}
              onInput=${(Event) => {
        const { isActive, Line, Color, Style, Thickness } = (commonValueOf(selectedWidgets.map((Widget) => Widget.TextDecoration
            || { isActive: false, Line: 'none', Color: 'black', Style: 'solid', Thickness: 1 })));
        doConfigureSelectedWidgets('TextDecoration', {
            isActive, Line: Event.target.value, Color, Style, Thickness
        });
    }}
            />
          </>
          <${WAD_horizontally}>
            <${WAD_Label} style="padding-left:10px">Color</>
            <${WAD_Gap}/>
            <${WAD_ColorInput}
              enabled=${selectedWidgets.length > 0}
              Value=${commonValueItemOf(selectedWidgets.map((Widget) => Widget.TextDecoration), 'Color')}
              onInput=${(Event) => {
        const { isActive, Line, Color, Style, Thickness } = (commonValueOf(selectedWidgets.map((Widget) => Widget.TextDecoration
            || { isActive: false, Line: 'none', Color: 'black', Style: 'solid', Thickness: 1 })));
        doConfigureSelectedWidgets('TextDecoration', {
            isActive, Line, Color: Event.target.value, Style, Thickness
        });
    }}
            />
          </>
          <${WAD_horizontally}>
            <${WAD_Label} style="padding-left:10px">Style</>
            <${WAD_Gap}/>
            <${WAD_DropDown}
              enabled=${selectedWidgets.length > 0}
              Value=${commonValueItemOf(selectedWidgets.map((Widget) => Widget.TextDecoration), 'Style')}
              Options=${WAT_TextDecorationStyles}
              onInput=${(Event) => {
        const { isActive, Line, Color, Style, Thickness } = (commonValueOf(selectedWidgets.map((Widget) => Widget.TextDecoration
            || { isActive: false, Line: 'none', Color: 'black', Style: 'solid', Thickness: 1 })));
        doConfigureSelectedWidgets('TextDecoration', {
            isActive, Line, Color, Style: Event.target.value, Thickness
        });
    }}
            />
          </>
          <${WAD_horizontally}>
            <${WAD_Label} style="padding-left:10px">Thickness [px]</>
            <${WAD_Gap}/>
            <${WAD_IntegerInput} readonly style="width:60px"
              enabled=${selectedWidgets.length > 0}
              Value=${commonValueItemOf(selectedWidgets.map((Widget) => Widget.TextDecoration), 'Thickness')}
              onInput=${(Event) => {
        const { isActive, Line, Color, Style, Thickness } = (commonValueOf(selectedWidgets.map((Widget) => Widget.TextDecoration
            || { isActive: false, Line: 'none', Color: 'black', Style: 'solid', Thickness: 1 })));
        doConfigureSelectedWidgets('TextDecoration', {
            isActive, Line, Color, Style, Thickness: parseFloat(Event.target.value)
        });
    }}
            />
          </>

          <${WAD_horizontally}>
            <${WAD_Label}>Text Shadow</>
            <${WAD_Gap}/>
            <${WAD_Checkbox}
              enabled=${selectedWidgets.length > 0}
              Value=${commonValueItemOf(selectedWidgets.map((Widget) => Widget.TextShadow), 'isActive')}
              onInput=${(Event) => {
        const { isActive, xOffset, yOffset, BlurRadius, Color } = (commonValueOf(selectedWidgets.map((Widget) => Widget.TextShadow
            || { isActive: false, xOffset: 0, yOffset: 0, BlurRadius: 5, Color: 'black' })));
        doConfigureSelectedWidgets('TextShadow', {
            isActive: Event.target.checked, xOffset, yOffset, BlurRadius, Color
        });
    }}
            />
          </>
          <${WAD_horizontally}>
            <${WAD_Label} style="padding-left:10px">Color</>
            <${WAD_Gap}/>
            <${WAD_ColorInput}
              enabled=${selectedWidgets.length > 0}
              Value=${commonValueItemOf(selectedWidgets.map((Widget) => Widget.TextShadow), 'Color')}
              onInput=${(Event) => {
        const { isActive, xOffset, yOffset, BlurRadius, Color } = (commonValueOf(selectedWidgets.map((Widget) => Widget.TextShadow
            || { isActive: false, xOffset: 0, yOffset: 0, BlurRadius: 5, Color: 'black' })));
        doConfigureSelectedWidgets('TextShadow', {
            isActive, xOffset, yOffset, BlurRadius, Color: Event.target.value
        });
    }}
            />
          </>
          <${WAD_horizontally}>
            <${WAD_Label} style="padding-left:10px">Offset (dx,dy) [px]</>
            <${WAD_Gap}/>
            <${WAD_IntegerInput} readonly style="width:60px"
              enabled=${selectedWidgets.length > 0}
              Value=${commonValueItemOf(selectedWidgets.map((Widget) => Widget.TextShadow), 'xOffset')}
              onInput=${(Event) => {
        const { isActive, xOffset, yOffset, BlurRadius, Color } = (commonValueOf(selectedWidgets.map((Widget) => Widget.TextShadow
            || { isActive: false, xOffset: 0, yOffset: 0, BlurRadius: 5, Color: 'black' })));
        doConfigureSelectedWidgets('TextShadow', {
            isActive, xOffset: parseFloat(Event.target.value), yOffset, BlurRadius, Color
        });
    }}
            />
              <div style="width:20px; padding-top:4px; text-align:center">,</div>
            <${WAD_IntegerInput} readonly style="width:60px"
              enabled=${selectedWidgets.length > 0}
              Value=${commonValueItemOf(selectedWidgets.map((Widget) => Widget.TextShadow), 'yOffset')}
              onInput=${(Event) => {
        const { isActive, xOffset, yOffset, BlurRadius, Color } = (commonValueOf(selectedWidgets.map((Widget) => Widget.TextShadow
            || { isActive: false, xOffset: 0, yOffset: 0, BlurRadius: 5, Color: 'black' })));
        doConfigureSelectedWidgets('TextShadow', {
            isActive, xOffset, yOffset: parseFloat(Event.target.value), BlurRadius, Color
        });
    }}
            />
          </>
          <${WAD_horizontally}>
            <${WAD_Label} style="padding-left:10px">Blur Radius [px]</>
            <${WAD_Gap}/>
            <${WAD_IntegerInput} readonly style="width:60px"
              enabled=${selectedWidgets.length > 0}
              Value=${commonValueItemOf(selectedWidgets.map((Widget) => Widget.TextShadow), 'BlurRadius')}
              onInput=${(Event) => {
        const { isActive, xOffset, yOffset, BlurRadius, Color } = (commonValueOf(selectedWidgets.map((Widget) => Widget.TextShadow
            || { isActive: false, xOffset: 0, yOffset: 0, BlurRadius: 5, Color: 'black' })));
        doConfigureSelectedWidgets('TextShadow', {
            isActive, xOffset, yOffset, BlurRadius: parseFloat(Event.target.value), Color
        });
    }}
            />
          </>

          <${WAD_horizontally}>
            <${WAD_Label}>Text Layout</>
          </>
          <${WAD_horizontally}>
            <${WAD_Label} style="padding-left:10px">Text Alignment</>
            <${WAD_Gap}/>
            <${WAD_DropDown}
              enabled=${selectedWidgets.length > 0}
              Value=${commonValueOf(selectedWidgets.map((Widget) => Widget.TextAlignment))}
              Options=${WAT_TextAlignments}
              onInput=${(Event) => doConfigureSelectedWidgets('TextAlignment', Event.target.value)}
            />
          </>
          <${WAD_horizontally}>
            <${WAD_Label} style="padding-left:10px">Line Height [px]</>
            <${WAD_Gap}/>
            <${WAD_IntegerInput} style="width:60px"
              enabled=${selectedWidgets.length > 0}
              Value=${commonValueOf(selectedWidgets.map((Widget) => Widget.LineHeight))}
              Minimum=${0} Maximum=${1000}
              onInput=${(Event) => doConfigureSelectedWidgets('LineHeight', parseFloat(Event.target.value))}
            />
          </>
        </>

        <${WAD_Fold} Label="Background"
          Expansion=${Expansions.Background}
          toggleExpansion=${() => toggleExpansion('Background')}
        >
          <${WAD_horizontally}>
            <${WAD_Label}>Background</>
            <${WAD_Gap}/>
            <${WAD_Checkbox}
              enabled=${selectedWidgets.length > 0}
              Value=${commonValueOf(selectedWidgets.map((Widget) => Widget.hasBackground))}
              onInput=${(Event) => doConfigureSelectedWidgets('hasBackground', Event.target.checked)}
            />
          </>

          <${WAD_horizontally}>
            <${WAD_Label}>Color</>
            <${WAD_Gap}/>
            <${WAD_ColorInput}
              enabled=${selectedWidgets.length > 0}
              Value=${commonValueOf(selectedWidgets.map((Widget) => Widget.BackgroundColor))}
              onInput=${(Event) => doConfigureSelectedWidgets('BackgroundColor', Event.target.value)}
            />
          </>

          <${WAD_horizontally}>
            <${WAD_Label}>Texture</>
            <${WAD_Gap}/>
            <${WAD_Checkbox}
              enabled=${selectedWidgets.length > 0}
              Value=${commonValueItemOf(selectedWidgets.map((Widget) => Widget.BackgroundTexture), 'isActive')}
              onInput=${(Event) => {
        const { isActive, ImageURL, Mode, xOffset, yOffset } = (commonValueOf(selectedWidgets.map((Widget) => Widget.BackgroundTexture))
            || { isActive: false, ImageURL: '', Mode: 'tile', xOffset: 0, yOffset: 0 });
        doConfigureSelectedWidgets('BackgroundTexture', {
            isActive: Event.target.checked, ImageURL, Mode, xOffset, yOffset
        });
    }}
            />
          </>
          <${WAD_horizontally}>
            <${WAD_Label} style="padding-left:10px">Mode</>
            <${WAD_Gap}/>
            <${WAD_DropDown}
              enabled=${selectedWidgets.length > 0}
              Value=${commonValueItemOf(selectedWidgets.map((Widget) => Widget.BackgroundTexture), 'Mode')}
              Options=${WAT_BackgroundModes}
              onInput=${(Event) => {
        const { isActive, ImageURL, Mode, xOffset, yOffset } = (commonValueOf(selectedWidgets.map((Widget) => Widget.BackgroundTexture))
            || { isActive: false, ImageURL: '', Mode: 'tile', xOffset: 0, yOffset: 0 });
        doConfigureSelectedWidgets('BackgroundTexture', {
            isActive, ImageURL, Mode: Event.target.value, xOffset, yOffset
        });
    }}
            />
          </>
          <${WAD_horizontally}>
            <${WAD_Label} style="padding-left:10px">Image URL</>
            <${WAD_Gap}/>
            <${WAD_TextlineInput} Type="url" style="flex:1 0 auto"
              enabled=${selectedWidgets.length > 0}
              Value=${commonValueItemOf(selectedWidgets.map((Widget) => Widget.BackgroundTexture), 'ImageURL')}
              onInput=${(Event) => {
        const { isActive, ImageURL, Mode, xOffset, yOffset } = (commonValueOf(selectedWidgets.map((Widget) => Widget.BackgroundTexture))
            || { isActive: false, ImageURL: '', Mode: 'tile', xOffset: 0, yOffset: 0 });
        doConfigureSelectedWidgets('BackgroundTexture', {
            isActive, ImageURL: Event.target.value, Mode, xOffset, yOffset
        });
    }}
            />
          </>
          <${WAD_horizontally}>
            <${WAD_Label} style="padding-left:10px">Offset (dx,dy) [px]</>
            <${WAD_Gap}/>
            <${WAD_IntegerInput} readonly style="width:60px"
              enabled=${selectedWidgets.length > 0}
              Value=${commonValueItemOf(selectedWidgets.map((Widget) => Widget.BackgroundTexture), 'xOffset')}
              onInput=${(Event) => {
        const { isActive, ImageURL, Mode, xOffset, yOffset } = (commonValueOf(selectedWidgets.map((Widget) => Widget.BackgroundTexture))
            || { isActive: false, ImageURL: '', Mode: 'tile', xOffset: 0, yOffset: 0 });
        doConfigureSelectedWidgets('BackgroundTexture', {
            isActive, ImageURL, Mode, xOffset: Event.target.value, yOffset
        });
    }}
            />
              <div style="width:20px; padding-top:4px; text-align:center">,</div>
            <${WAD_IntegerInput} readonly style="width:60px"
              enabled=${selectedWidgets.length > 0}
              Value=${commonValueItemOf(selectedWidgets.map((Widget) => Widget.BackgroundTexture), 'yOffset')}
              onInput=${(Event) => {
        const { isActive, ImageURL, Mode, xOffset, yOffset } = (commonValueOf(selectedWidgets.map((Widget) => Widget.BackgroundTexture))
            || { isActive: false, ImageURL: '', Mode: 'tile', xOffset: 0, yOffset: 0 });
        doConfigureSelectedWidgets('BackgroundTexture', {
            isActive, ImageURL, Mode, xOffset, yOffset: parseFloat(Event.target.value)
        });
    }}
            />
          </>
        </>

        <${WAD_Fold} Label="Border"
          Expansion=${Expansions.Border}
          toggleExpansion=${() => toggleExpansion('Border')}
        >
          <${WAD_horizontally}>
            <${WAD_Label}>Border Lines</>
          </>
          <${WAD_horizontally}>
            <${WAD_Label} style="padding-left:10px">top</>
            <${WAD_Gap}/>
            <${WAD_DropDown}
              enabled=${selectedWidgets.length > 0}
              Value=${commonValueItemOf(selectedWidgets.map((Widget) => Widget.BorderStyles), 0)}
              Options=${WAT_BorderStyles}
              onInput=${(Event) => {
        const [Style_0, Style_1, Style_2, Style_3] = (commonValueOf(selectedWidgets.map((Widget) => Widget.BorderStyles || ['none', 'none', 'none', 'none'])));
        doConfigureSelectedWidgets('BorderStyles', [
            Event.target.value, Style_1, Style_2, Style_3
        ]);
    }}
            />
              <div style="width:10px"/>
            <${WAD_IntegerInput} style="width:60px"
              enabled=${selectedWidgets.length > 0}
              Value=${commonValueItemOf(selectedWidgets.map((Widget) => Widget.BorderWidths), 0)}
              Minimum=${0}
              onInput=${(Event) => {
        const [Width_0, Width_1, Width_2, Width_3] = (commonValueOf(selectedWidgets.map((Widget) => Widget.BorderWidths || [0, 0, 0, 0])));
        doConfigureSelectedWidgets('BorderWidths', [
            parseFloat(Event.target.value), Width_1, Width_2, Width_3
        ]);
    }}
            />
              <div style="width:10px"/>
            <${WAD_ColorInput}
              enabled=${selectedWidgets.length > 0}
              Value=${commonValueItemOf(selectedWidgets.map((Widget) => Widget.BorderColors), 0)}
              onInput=${(Event) => {
        const [Color_0, Color_1, Color_2, Color_3] = (commonValueOf(selectedWidgets.map((Widget) => Widget.BorderColors || ['black', 'black', 'black', 'black'])));
        doConfigureSelectedWidgets('BorderColors', [
            Event.target.value, Color_1, Color_2, Color_3
        ]);
    }}
            />
          </>

          <${WAD_horizontally}>
            <${WAD_Label} style="padding-left:10px">right</>
            <${WAD_Gap}/>
            <${WAD_DropDown}
              enabled=${selectedWidgets.length > 0}
              Value=${commonValueItemOf(selectedWidgets.map((Widget) => Widget.BorderStyles), 1)}
              Options=${WAT_BorderStyles}
              onInput=${(Event) => {
        const [Style_0, Style_1, Style_2, Style_3] = (commonValueOf(selectedWidgets.map((Widget) => Widget.BorderStyles || ['none', 'none', 'none', 'none'])));
        doConfigureSelectedWidgets('BorderStyles', [
            Style_0, Event.target.value, Style_2, Style_3
        ]);
    }}
            />
              <div style="width:10px"/>
            <${WAD_IntegerInput} style="width:60px"
              enabled=${selectedWidgets.length > 0}
              Value=${commonValueItemOf(selectedWidgets.map((Widget) => Widget.BorderWidths), 1)}
              Minimum=${0}
              onInput=${(Event) => {
        const [Width_0, Width_1, Width_2, Width_3] = (commonValueOf(selectedWidgets.map((Widget) => Widget.BorderWidths || [0, 0, 0, 0])));
        doConfigureSelectedWidgets('BorderWidths', [
            Width_0, parseFloat(Event.target.value), Width_2, Width_3
        ]);
    }}
            />
              <div style="width:10px"/>
            <${WAD_ColorInput}
              enabled=${selectedWidgets.length > 0}
              Value=${commonValueItemOf(selectedWidgets.map((Widget) => Widget.BorderColors), 1)}
              onInput=${(Event) => {
        const [Color_0, Color_1, Color_2, Color_3] = (commonValueOf(selectedWidgets.map((Widget) => Widget.BorderColors || ['black', 'black', 'black', 'black'])));
        doConfigureSelectedWidgets('BorderColors', [
            Color_0, Event.target.value, Color_2, Color_3
        ]);
    }}
            />
          </>

          <${WAD_horizontally}>
            <${WAD_Label} style="padding-left:10px">bottom</>
            <${WAD_Gap}/>
            <${WAD_DropDown}
              enabled=${selectedWidgets.length > 0}
              Value=${commonValueItemOf(selectedWidgets.map((Widget) => Widget.BorderStyles), 2)}
              Options=${WAT_BorderStyles}
              onInput=${(Event) => {
        const [Style_0, Style_1, Style_2, Style_3] = (commonValueOf(selectedWidgets.map((Widget) => Widget.BorderStyles || ['none', 'none', 'none', 'none'])));
        doConfigureSelectedWidgets('BorderStyles', [
            Style_0, Style_1, Event.target.value, Style_3
        ]);
    }}
            />
              <div style="width:10px"/>
            <${WAD_IntegerInput} style="width:60px"
              enabled=${selectedWidgets.length > 0}
              Value=${commonValueItemOf(selectedWidgets.map((Widget) => Widget.BorderWidths), 2)}
              Minimum=${0}
              onInput=${(Event) => {
        const [Width_0, Width_1, Width_2, Width_3] = (commonValueOf(selectedWidgets.map((Widget) => Widget.BorderWidths || [0, 0, 0, 0])));
        doConfigureSelectedWidgets('BorderWidths', [
            Width_0, Width_1, parseFloat(Event.target.value), Width_3
        ]);
    }}
            />
              <div style="width:10px"/>
            <${WAD_ColorInput}
              enabled=${selectedWidgets.length > 0}
              Value=${commonValueItemOf(selectedWidgets.map((Widget) => Widget.BorderColors), 2)}
              onInput=${(Event) => {
        const [Color_0, Color_1, Color_2, Color_3] = (commonValueOf(selectedWidgets.map((Widget) => Widget.BorderColors || ['black', 'black', 'black', 'black'])));
        doConfigureSelectedWidgets('BorderColors', [
            Color_0, Color_1, Event.target.value, Color_3
        ]);
    }}
            />
          </>

          <${WAD_horizontally}>
            <${WAD_Label} style="padding-left:10px">left</>
            <${WAD_Gap}/>
            <${WAD_DropDown}
              enabled=${selectedWidgets.length > 0}
              Value=${commonValueItemOf(selectedWidgets.map((Widget) => Widget.BorderStyles), 3)}
              Options=${WAT_BorderStyles}
              onInput=${(Event) => {
        const [Style_0, Style_1, Style_2, Style_3] = (commonValueOf(selectedWidgets.map((Widget) => Widget.BorderStyles || ['none', 'none', 'none', 'none'])));
        doConfigureSelectedWidgets('BorderStyles', [
            Style_0, Style_1, Style_2, Event.target.value
        ]);
    }}
            />
              <div style="width:10px"/>
            <${WAD_IntegerInput} style="width:60px"
              enabled=${selectedWidgets.length > 0}
              Value=${commonValueItemOf(selectedWidgets.map((Widget) => Widget.BorderWidths), 3)}
              Minimum=${0}
              onInput=${(Event) => {
        const [Width_0, Width_1, Width_2, Width_3] = (commonValueOf(selectedWidgets.map((Widget) => Widget.BorderWidths || [0, 0, 0, 0])));
        doConfigureSelectedWidgets('BorderWidths', [
            Width_0, Width_1, Width_2, parseFloat(Event.target.value)
        ]);
    }}
            />
              <div style="width:10px"/>
            <${WAD_ColorInput}
              enabled=${selectedWidgets.length > 0}
              Value=${commonValueItemOf(selectedWidgets.map((Widget) => Widget.BorderColors), 3)}
              onInput=${(Event) => {
        const [Color_0, Color_1, Color_2, Color_3] = (commonValueOf(selectedWidgets.map((Widget) => Widget.BorderColors || ['black', 'black', 'black', 'black'])));
        doConfigureSelectedWidgets('BorderColors', [
            Color_0, Color_1, Color_2, Event.target.value
        ]);
    }}
            />
          </>

          <${WAD_horizontally}>
            <${WAD_Label}>Border Radii [px]</>
          </>
          <${WAD_horizontally}>
            <${WAD_Label} style="padding-left:10px">top-left/right</>
            <${WAD_Gap}/>
            <${WAD_IntegerInput} style="width:60px"
              enabled=${selectedWidgets.length > 0}
              Value=${commonValueItemOf(selectedWidgets.map((Widget) => Widget.BorderRadii), 0)}
              Minimum=${0}
              onInput=${(Event) => {
        const [Radius_0, Radius_1, Radius_2, Radius_3] = (commonValueOf(selectedWidgets.map((Widget) => Widget.BorderRadii || [0, 0, 0, 0])));
        doConfigureSelectedWidgets('BorderRadii', [
            parseFloat(Event.target.value), Radius_1, Radius_2, Radius_3
        ]);
    }}
            />
              <div style="width:20px; padding-top:4px; text-align:center">,</div>
            <${WAD_IntegerInput} style="width:60px"
              enabled=${selectedWidgets.length > 0}
              Value=${commonValueItemOf(selectedWidgets.map((Widget) => Widget.BorderRadii), 1)}
              Minimum=${0}
              onInput=${(Event) => {
        const [Radius_0, Radius_1, Radius_2, Radius_3] = (commonValueOf(selectedWidgets.map((Widget) => Widget.BorderRadii || [0, 0, 0, 0])));
        doConfigureSelectedWidgets('BorderRadii', [
            Radius_0, parseFloat(Event.target.value), Radius_2, Radius_3
        ]);
    }}
            />
          </>
          <${WAD_horizontally}>
            <${WAD_Label} style="padding-left:10px">bottom-left/right</>
            <${WAD_Gap}/>
            <${WAD_IntegerInput} style="width:60px"
              enabled=${selectedWidgets.length > 0}
              Value=${commonValueItemOf(selectedWidgets.map((Widget) => Widget.BorderRadii), 3)}
              Minimum=${0}
              onInput=${(Event) => {
        const [Radius_0, Radius_1, Radius_2, Radius_3] = (commonValueOf(selectedWidgets.map((Widget) => Widget.BorderRadii || [0, 0, 0, 0])));
        doConfigureSelectedWidgets('BorderRadii', [
            Radius_0, Radius_1, Radius_2, parseFloat(Event.target.value)
        ]);
    }}
            />
              <div style="width:20px; padding-top:4px; text-align:center">,</div>
            <${WAD_IntegerInput} style="width:60px"
              enabled=${selectedWidgets.length > 0}
              Value=${commonValueItemOf(selectedWidgets.map((Widget) => Widget.BorderRadii), 2)}
              Minimum=${0}
              onInput=${(Event) => {
        const [Radius_0, Radius_1, Radius_2, Radius_3] = (commonValueOf(selectedWidgets.map((Widget) => Widget.BorderRadii || [0, 0, 0, 0])));
        doConfigureSelectedWidgets('BorderRadii', [
            Radius_0, Radius_1, parseFloat(Event.target.value), Radius_3
        ]);
    }}
            />
          </>
        </>
        <${WAD_Fold} Label="Shadow"
          Expansion=${Expansions.Shadow}
          toggleExpansion=${() => toggleExpansion('Shadow')}
        >
          <${WAD_horizontally}>
            <${WAD_Label}>Box Shadow</>
            <${WAD_Gap}/>
            <${WAD_Checkbox}
              enabled=${selectedWidgets.length > 0}
              Value=${commonValueItemOf(selectedWidgets.map((Widget) => Widget.BoxShadow), 'isActive')}
              onInput=${(Event) => {
        const { isActive, xOffset, yOffset, BlurRadius, SpreadRadius, Color } = (commonValueOf(selectedWidgets.map((Widget) => Widget.BoxShadow))
            || { isActive: false, xOffset: 0, yOffset: 0, BlurRadius: 5, SpreadRadius: 0, Color: 'black' });
        doConfigureSelectedWidgets('BoxShadow', {
            isActive: Event.target.checked, xOffset, yOffset, BlurRadius, SpreadRadius, Color
        });
    }}
            />
          </>
          <${WAD_horizontally}>
            <${WAD_Label} style="padding-left:10px">Color</>
            <${WAD_Gap}/>
            <${WAD_ColorInput}
              enabled=${selectedWidgets.length > 0}
              Value=${commonValueItemOf(selectedWidgets.map((Widget) => Widget.BoxShadow), 'Color')}
              onInput=${(Event) => {
        const { isActive, xOffset, yOffset, BlurRadius, SpreadRadius, Color } = (commonValueOf(selectedWidgets.map((Widget) => Widget.BoxShadow))
            || { isActive: false, xOffset: 0, yOffset: 0, BlurRadius: 5, SpreadRadius: 0, Color: 'black' });
        doConfigureSelectedWidgets('BoxShadow', {
            isActive, xOffset, yOffset, BlurRadius, SpreadRadius, Color: Event.target.value
        });
    }}
            />
          </>
          <${WAD_horizontally}>
            <${WAD_Label} style="padding-left:10px">Offset (dx,dy) [px]</>
            <${WAD_Gap}/>
            <${WAD_IntegerInput} style="width:60px"
              enabled=${selectedWidgets.length > 0}
              Value=${commonValueItemOf(selectedWidgets.map((Widget) => Widget.BoxShadow), 'xOffset')}
              onInput=${(Event) => {
        const { isActive, xOffset, yOffset, BlurRadius, SpreadRadius, Color } = (commonValueOf(selectedWidgets.map((Widget) => Widget.BoxShadow))
            || { isActive: false, xOffset: 0, yOffset: 0, BlurRadius: 5, SpreadRadius: 0, Color: 'black' });
        doConfigureSelectedWidgets('BoxShadow', {
            isActive, xOffset: parseFloat(Event.target.value), yOffset, BlurRadius, SpreadRadius, Color
        });
    }}
            />
              <div style="width:20px; padding-top:4px; text-align:center">,</div>
            <${WAD_IntegerInput} style="width:60px"
              enabled=${selectedWidgets.length > 0}
              Value=${commonValueItemOf(selectedWidgets.map((Widget) => Widget.BoxShadow), 'yOffset')}
              onInput=${(Event) => {
        const { isActive, xOffset, yOffset, BlurRadius, SpreadRadius, Color } = (commonValueOf(selectedWidgets.map((Widget) => Widget.BoxShadow))
            || { isActive: false, xOffset: 0, yOffset: 0, BlurRadius: 5, SpreadRadius: 0, Color: 'black' });
        doConfigureSelectedWidgets('BoxShadow', {
            isActive, xOffset, yOffset: parseFloat(Event.target.value), BlurRadius, SpreadRadius, Color
        });
    }}
            />
          </>
          <${WAD_horizontally}>
            <${WAD_Label} style="padding-left:10px">Blur Radius [px]</>
            <${WAD_Gap}/>
            <${WAD_IntegerInput} style="width:60px"
              enabled=${selectedWidgets.length > 0}
              Value=${commonValueItemOf(selectedWidgets.map((Widget) => Widget.BoxShadow), 'BlurRadius')}
              onInput=${(Event) => {
        const { isActive, xOffset, yOffset, BlurRadius, SpreadRadius, Color } = (commonValueOf(selectedWidgets.map((Widget) => Widget.BoxShadow))
            || { isActive: false, xOffset: 0, yOffset: 0, BlurRadius: 5, SpreadRadius: 0, Color: 'black' });
        doConfigureSelectedWidgets('BoxShadow', {
            isActive, xOffset, yOffset, BlurRadius: parseFloat(Event.target.value), SpreadRadius, Color
        });
    }}
            />
          </>
          <${WAD_horizontally}>
            <${WAD_Label} style="padding-left:10px">Spread Radius [px]</>
            <${WAD_Gap}/>
            <${WAD_IntegerInput} style="width:60px"
              enabled=${selectedWidgets.length > 0}
              Value=${commonValueItemOf(selectedWidgets.map((Widget) => Widget.BoxShadow), 'SpreadRadius')}
              onInput=${(Event) => {
        const { isActive, xOffset, yOffset, BlurRadius, SpreadRadius, Color } = (commonValueOf(selectedWidgets.map((Widget) => Widget.BoxShadow))
            || { isActive: false, xOffset: 0, yOffset: 0, BlurRadius: 5, SpreadRadius: 0, Color: 'black' });
        doConfigureSelectedWidgets('BoxShadow', {
            isActive, xOffset, yOffset, BlurRadius, SpreadRadius: parseFloat(Event.target.value), Color
        });
    }}
            />
          </>
        </>

        <${WAD_Fold} Label="Cursor"
          Expansion=${Expansions.Cursor}
          toggleExpansion=${() => toggleExpansion('Cursor')}
        >
          <${WAD_horizontally}>
            <${WAD_Label}>Cursor Type</>
            <${WAD_Gap}/>
            <${WAD_DropDown}
              enabled=${selectedWidgets.length > 0}
              Value=${commonValueOf(selectedWidgets.map((Widget) => Widget.Cursor))}
              Options=${WAT_Cursors}
              onInput=${(Event) => doConfigureSelectedWidgets('Cursor', Event.target.value)}
            />
          </>
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
              onClick=${(Event) => {
        if (DesignerState.ScriptEditor.Scope === 'selectedWidgets') {
            toggleDialog('ScriptEditor', Event);
        }
        else {
            DesignerState.ScriptEditor.Scope = 'selectedWidgets';
            openDialog('ScriptEditor', Event === null || Event === void 0 ? void 0 : Event.clientX, Event === null || Event === void 0 ? void 0 : Event.clientY); // *C* better position!
        }
    }}
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

      <${WAD_horizontally}>
        <${WAD_ErrorView} style="flex:1 1 auto" ErrorReport=${ReportToShow}/>
        <${WAD_Icon} Icon="${IconFolder}/triangle-exclamation.png" style="
          display:${ReportToShow == null ? 'none' : 'block'};
          padding-top:6px;
        " onClick=${() => {
        const { ReportToShow } = DesignerState.Inspector;
        window.alert(ReportToShow.Type + '\n\n' + ReportToShow.Message);
    }}
        />
      </>
     </>
    </>`;
}
//------------------------------------------------------------------------------
//--                            WAD_SettingsDialog                            --
//------------------------------------------------------------------------------
function WAD_SettingsDialog() {
    const onClose = useCallback(() => closeDialog('SettingsDialog'));
    const { Applet } = DesignerState;
    return html `<${WAD_Dialog} Name="SettingsDialog" resizable=${true}
      onClose=${onClose}
    >
     <${WAD_vertically} style="width:100%; height:100%; padding:4px">

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
        activeScript, pendingScript, ErrorReport
    } = (Applet._BehaviorPool[selectedCategory][(selectedBehavior || '').toLowerCase()] || {}));
    const ScriptIsPending = ValueIsText(pendingScript) && (pendingScript !== activeScript);
    const ReportToShow = ScriptError || ErrorReport;
    DesignerState.BehaviorEditor.ReportToShow = ReportToShow; // *C* workaround
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

      <${WAD_TextInput} Placeholder="(enter script)" LineWrapping=${true} style="
        flex:1 0 auto; padding-top:4px;
      " Value=${pendingScript == null ? activeScript : pendingScript}
        onInput=${(Event) => setPendingScriptTo(Event.target.value)}
      />

      <${WAD_horizontally}>
        <${WAD_ErrorView} style="flex:1 1 auto" ErrorReport=${ReportToShow}/>
        <${WAD_Icon} Icon="${IconFolder}/triangle-exclamation.png" style="
          display:${ValueIsErrorReport(ReportToShow) ? 'block' : 'none'};
          padding-top:6px;
        " onClick=${() => {
        const { ReportToShow } = DesignerState.BehaviorEditor;
        window.alert(ReportToShow.Type + '\n\n' + ReportToShow.Message);
    }}/>
      </>
     </>
    </>`;
}
DesignerState.BehaviorEditor.View = WAD_BehaviorEditor;
//------------------------------------------------------------------------------
//--                            WAD_SynopsisEditor                            --
//------------------------------------------------------------------------------
function WAD_SynopsisEditor() {
    const onClose = useCallback(() => closeDialog('SynopsisEditor'));
    const { Applet } = DesignerState;
    let Synopsis;
    const { Scope } = DesignerState.SynopsisEditor;
    switch (Scope) {
        case 'Applet':
            Synopsis = Applet.Synopsis;
            break;
        case 'visitedPage':
            Synopsis = Applet.visitedPage.Synopsis;
            break;
        case 'selectedWidgets':
            const { selectedWidgets } = DesignerState;
            Synopsis = commonValueOf(selectedWidgets.map((Widget) => Widget.Synopsis));
            break;
    }
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

      <${WAD_TextInput} Placeholder="(enter synopsis)" LineWrapping=${true} style="
        flex:1 0 auto; padding-top:4px;
      " Value=${Synopsis}
        onInput=${(Event) => setSynopsisTo(Event.target.value)}
      />
     </>
    </>`;
}
DesignerState.SynopsisEditor.View = WAD_SynopsisEditor;
//------------------------------------------------------------------------------
//--                             WAD_ValueEditor                              --
//------------------------------------------------------------------------------
function WAD_ValueEditor() {
    const onClose = useCallback(() => closeDialog('ValueEditor'));
    const { selectedWidgets } = DesignerState;
    let ValueType = 'string';
    let ValueToEdit = commonValueOf(selectedWidgets.map((Widget) => Widget.Value));
    switch (true) {
        case (ValueToEdit == null):
        case (ValueToEdit === multipleValues):
        case (ValueToEdit === noSelection):
            break;
        default:
            ValueType = typeof ValueToEdit;
            if (ValueType === 'object') {
                ValueToEdit = JSON.stringify(ValueToEdit, null, 2);
            }
            else {
                ValueToEdit = '' + ValueToEdit;
            }
    }
    function _onValueInput(Event) {
        const editedValue = Event.target.value;
        let Value = undefined;
        switch (ValueType) {
            case 'boolean':
                Value = Boolean(editedValue);
                break;
            case 'number':
                Value = Number(editedValue);
                break;
            case 'string':
                Value = editedValue;
                break;
            default: Value = JSON.parse(editedValue); // may fail!
        }
        doConfigureSelectedWidgets('Value', Value);
    }
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
      <${WAD_TextInput} Placeholder="(enter value)" style="flex:1 0 auto; padding-top:4px"
        enabled=${selectedWidgets.length > 0}
        Value=${ValueToEdit} onInput=${_onValueInput}
      />
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

      <${WAD_TextInput} Placeholder="(enter script)" LineWrapping=${true} style="
        flex:1 0 auto; padding-top:4px;
      " Value=${pendingScript == null ? activeScript : pendingScript}
        onInput=${(Event) => setPendingScriptTo(Event.target.value)}
      />

      <${WAD_horizontally}>
        <${WAD_ErrorView} style="flex:1 1 auto" ErrorReport=${ReportToShow}/>
        <${WAD_Icon} Icon="${IconFolder}/triangle-exclamation.png" style="
          display:${ValueIsErrorReport(ReportToShow) ? 'block' : 'none'};
          padding-top:6px;
        " onClick=${() => {
        const { ReportToShow } = DesignerState.ScriptEditor;
        window.alert(ReportToShow.Type + '\n\n' + ReportToShow.Message);
    }}/>
      </>
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
    const { Applet } = DesignerState;
    return html `<${WAD_Dialog} Name="SearchDialog" resizable=${true}
      onClose=${onClose}
    >
     <${WAD_vertically} style="width:100%; height:100%; padding:4px">

     </>
    </>`;
}
DesignerState.SearchDialog.View = WAD_SearchDialog;
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
    LassoStart: { x: 0, y: 0 },
    LassoEnd: { x: 0, y: 0 },
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
        doOperation(new WAD_WidgetShapeOperation(LayouterState.shapedWidgets, LayouterState.initialGeometries));
    }
    finishDraggingAndShaping();
}
//------------------------------------------------------------------------------
//--                            WAD_LayouterLayer                             --
//------------------------------------------------------------------------------
function WAD_LayouterLayer() {
    const { Applet, selectedWidgets } = DesignerState;
    const visitedPage = Applet.visitedPage;
    const WidgetList = visitedPage.WidgetList;
    /**** handleCoverEvent ****/
    function handleCoverEvent(Event, Widget) {
        LayouterState.ShapeMode = 'c';
        LayouterState.pointedWidget = Widget;
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
        if (Event.ctrlKey || Event.metaKey) {
            switch (Event.key) {
                case 'a':
                    consumeEvent(Event);
                    return selectWidgets(Event.shiftKey ? [] : DesignerState.Applet.visitedPage.WidgetList);
                case 'o':
                    consumeEvent(Event);
                    if ('showOpenFilePicker' in window) {
                        // @ts-ignore TS18046 allow "window.showOpenFilePicker"
                        const FileList = await window.showOpenFilePicker();
                        if (FileList.length === 0) {
                            return;
                        }
                        try {
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
        switch (Event.key) {
            case 'ArrowLeft':
                consumeEvent(Event);
                if (Event.altKey) { // size
                    doChangeGeometriesBy(DesignerState.selectedWidgets, 'e', (Event.shiftKey ? -10 : -1), 0, DesignerState.selectedWidgets.map((Widget) => Widget.Geometry), false);
                }
                else { // move
                    doChangeGeometriesBy(DesignerState.selectedWidgets, 'c', (Event.shiftKey ? -10 : -1), 0, DesignerState.selectedWidgets.map((Widget) => Widget.Geometry), false);
                }
                return;
            case 'ArrowUp':
                consumeEvent(Event);
                if (Event.altKey) { // size
                    doChangeGeometriesBy(DesignerState.selectedWidgets, 's', 0, (Event.shiftKey ? -10 : -1), DesignerState.selectedWidgets.map((Widget) => Widget.Geometry), false);
                }
                else { // move
                    doChangeGeometriesBy(DesignerState.selectedWidgets, 'c', 0, (Event.shiftKey ? -10 : -1), DesignerState.selectedWidgets.map((Widget) => Widget.Geometry), false);
                }
                return;
            case 'ArrowRight':
                consumeEvent(Event);
                if (Event.altKey) { // size
                    doChangeGeometriesBy(DesignerState.selectedWidgets, 'e', (Event.shiftKey ? 10 : 1), 0, DesignerState.selectedWidgets.map((Widget) => Widget.Geometry), false);
                }
                else { // move
                    doChangeGeometriesBy(DesignerState.selectedWidgets, 'c', (Event.shiftKey ? 10 : 1), 0, DesignerState.selectedWidgets.map((Widget) => Widget.Geometry), false);
                }
                return;
            case 'ArrowDown':
                consumeEvent(Event);
                if (Event.altKey) { // size
                    doChangeGeometriesBy(DesignerState.selectedWidgets, 's', 0, (Event.shiftKey ? 10 : 1), DesignerState.selectedWidgets.map((Widget) => Widget.Geometry), false);
                }
                else { // move
                    doChangeGeometriesBy(DesignerState.selectedWidgets, 'c', 0, (Event.shiftKey ? 10 : 1), DesignerState.selectedWidgets.map((Widget) => Widget.Geometry), false);
                }
                return;
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
            return html `
              <${WAD_ShapeHandle} key=${WidgetId + 'nw'} Mode="nw" Geometry=${Geometry}
                onPointerEvent=${(Event) => handleShapeEvent(Event, 'nw')}/>
              <${WAD_ShapeHandle} key=${WidgetId + 'n'}  Mode="n"  Geometry=${Geometry}
                onPointerEvent=${(Event) => handleShapeEvent(Event, 'n')}/>
              <${WAD_ShapeHandle} key=${WidgetId + 'ne'} Mode="ne" Geometry=${Geometry}
                onPointerEvent=${(Event) => handleShapeEvent(Event, 'ne')}/>
              <${WAD_ShapeHandle} key=${WidgetId + 'e'}  Mode="e"  Geometry=${Geometry}
                onPointerEvent=${(Event) => handleShapeEvent(Event, 'e')}/>
              <${WAD_ShapeHandle} key=${WidgetId + 'se'} Mode="se" Geometry=${Geometry}
                onPointerEvent=${(Event) => handleShapeEvent(Event, 'se')}/>
              <${WAD_ShapeHandle} key=${WidgetId + 's'}  Mode="s"  Geometry=${Geometry}
                onPointerEvent=${(Event) => handleShapeEvent(Event, 's')}/>
              <${WAD_ShapeHandle} key=${WidgetId + 'sw'} Mode="sw" Geometry=${Geometry}
                onPointerEvent=${(Event) => handleShapeEvent(Event, 'sw')}/>
              <${WAD_ShapeHandle} key=${WidgetId + 'w'}  Mode="w"  Geometry=${Geometry}
                onPointerEvent=${(Event) => handleShapeEvent(Event, 'w')}/>
            `;
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
    let { Widget, onPointerEvent } = PropSet, otherProps = __rest(PropSet, ["Widget", "onPointerEvent"]);
    let { x, y, Width, Height } = Widget.Geometry;
    const FocusAndCoverRecognizer = useCallback((Event) => {
        focusLayouterLayer();
        onPointerEvent(Event);
    }, []);
    const dragging = ((LayouterState.ShapeMode === 'c') && (LayouterState.shapedWidgets.length > 0)
        ? 'dragging' : '');
    return html `<div class="WAD Cover ${dragging}" style="
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
} /**** horizontal Guides ****/
function horizontalGuides() {
    const WidgetList = DesignerState.Applet.visitedPage.WidgetList;
    const selectedWidgets = DesignerState.selectedWidgets;
    const EdgeSet = {};
    const CenterSet = {};
    WidgetList.filter((Widget) => !WidgetIsSelected(Widget)).forEach((Widget) => {
        const { y, Height } = Widget.Geometry;
        const yt = Math.round(y);
        const ym = Math.round(y + Height / 2);
        const yb = Math.round(y + Height);
        EdgeSet[yt] = EdgeSet[yb] = true;
        CenterSet[ym] = true;
    });
    const horizontalSet = {};
    selectedWidgets.forEach((Widget) => {
        const { y, Height } = Widget.Geometry;
        const yt = Math.round(y);
        const ym = Math.round(y + Height / 2);
        const yb = Math.round(y + Height);
        if (EdgeSet[yt]) {
            horizontalSet[yt] = 'Edge';
        }
        if (EdgeSet[ym] && (horizontalSet[ym] !== 'Edge')) {
            horizontalSet[ym] = 'Center';
        }
        if (EdgeSet[yb]) {
            horizontalSet[yb] = 'Edge';
        }
        if (CenterSet[yt] && (horizontalSet[yt] !== 'Edge')) {
            horizontalSet[yt] = 'Center';
        }
        if (CenterSet[ym] && (horizontalSet[ym] !== 'Edge')) {
            horizontalSet[ym] = 'Center';
        }
        if (CenterSet[yb] && (horizontalSet[yb] !== 'Edge')) {
            horizontalSet[yb] = 'Center';
        }
    });
    const horizontalList = [];
    for (let y in horizontalSet) {
        if (horizontalSet[y] != null) {
            horizontalList.push(y);
        }
    }
    return html `${horizontalList.map((y) => html `
      <div class="WAD horizontalGuide ${horizontalSet[y]}" style="top:${y}px"/>
    `)}`;
}
/**** vertical Guides ****/
function verticalGuides() {
    const WidgetList = DesignerState.Applet.visitedPage.WidgetList;
    const selectedWidgets = DesignerState.selectedWidgets;
    const EdgeSet = {};
    const CenterSet = {};
    WidgetList.filter((Widget) => !WidgetIsSelected(Widget)).forEach((Widget) => {
        const { x, Width } = Widget.Geometry;
        const xl = Math.round(x);
        const xm = Math.round(x + Width / 2);
        const xr = Math.round(x + Width);
        EdgeSet[xl] = EdgeSet[xr] = true;
        CenterSet[xm] = true;
    });
    const verticalSet = {};
    selectedWidgets.forEach((Widget) => {
        const { x, Width } = Widget.Geometry;
        const xl = Math.round(x);
        const xm = Math.round(x + Width / 2);
        const xr = Math.round(x + Width);
        if (EdgeSet[xl]) {
            verticalSet[xl] = 'Edge';
        }
        if (EdgeSet[xm] && (verticalSet[xm] !== 'Edge')) {
            verticalSet[xm] = 'Center';
        }
        if (EdgeSet[xr]) {
            verticalSet[xr] = 'Edge';
        }
        if (CenterSet[xl] && (verticalSet[xl] !== 'Edge')) {
            verticalSet[xl] = 'Center';
        }
        if (CenterSet[xm] && (verticalSet[xm] !== 'Edge')) {
            verticalSet[xm] = 'Center';
        }
        if (CenterSet[xr] && (verticalSet[xr] !== 'Edge')) {
            verticalSet[xr] = 'Center';
        }
    });
    const verticalList = [];
    for (let x in verticalSet) {
        if (verticalSet[x] != null) {
            verticalList.push(x);
        }
    }
    return html `${verticalList.map((x) => html `
      <div class="WAD verticalGuide ${verticalSet[x]}" style="left:${x}px"/>
    `)}`;
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
/**** consume/consumingEvent ****/
function consumeEvent(Event) {
    Event.stopPropagation();
    Event.preventDefault();
}
const consumingEvent = consumeEvent;
/**** inform WAT about this designer ****/
let DesignerStore;
localforage.ready(async function () {
    DesignerStore = localforage.createInstance({
        name: 'WAT Designer'
    });
    console.log('starting WebApp Tinkerer Designer...');
    //      WAD_DesignerLayer.showErrorReport = showErrorReport
    useDesigner(WAD_DesignerLayer);
    await restoreDialogs();
    console.log('WebApp Tinkerer Designer is operational');
});
