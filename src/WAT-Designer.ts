/*******************************************************************************
*                                                                              *
*                        WebApp Tinkerer (WAT) Designer                        *
*                                                                              *
*******************************************************************************/

  const IconFolder = 'https://rozek.github.io/webapp-tinkerer/icons'

  declare const download:Function
  declare const localforage:any

  import {
//  throwError,
    quoted, HTMLsafe,
    ValuesAreEqual,
    ValueIsOrdinal,
    ValueIsText,
    ValueIsPlainObject,
    ValueIsListSatisfying,
    allowOrdinal,
    allowTextline,
    expectList, allowListSatisfying,
    allowFunction,
  } from 'javascript-interface-library'

  import Conversion from 'svelte-coordinate-conversion'
  const { fromViewportTo } = Conversion

  import {
    render, html, Component,
    useState, useRef, useEffect, useMemo, useCallback,
  } from 'htm/preact'

  import { customAlphabet }   from 'nanoid'
// @ts-ignore TS2307 typescript has problems importing "nanoid-dictionary"
  import { nolookalikesSafe } from 'nanoid-dictionary'

  import {
    throwError, throwReadOnlyError,
    fromDocumentTo,
    WAT_Text, WAT_Geometry, WAT_Position, WAT_Location,
    WAT_Visual, WAT_Applet, WAT_Page, WAT_Widget, WAT_ErrorReport,
    WAT_FontWeights, WAT_FontStyles,
    WAT_TextDecorationLines, WAT_TextDecorationStyles, WAT_TextAlignments,
    WAT_BackgroundModes, WAT_BorderStyles, WAT_Cursors,
    WAT_ImageScalings, WAT_ImageAlignments, WAT_ReferrerPolicies,
    WAT_Orientations,
    WAT_TimePattern, WAT_DateTimePattern, WAT_DatePattern, WAT_WeekPattern,
      WAT_MonthPattern,
    ValueIsApplet, ValueIsPage, ValueIsWidget,
    ValueIsWidgetType, ValueIsErrorReport,
    allowPage,
    GestureRecognizer,
    useDesigner, rerender as WAT_rerender, setScriptError,
  } from "./WAT-Runtime.esm.js"

  import mapTouchToMouseFor from 'svelte-touch-to-mouse'
    mapTouchToMouseFor('.WAD.DesignerButton')
    mapTouchToMouseFor('.WAD.Dialog > .Titlebar')
    mapTouchToMouseFor('.WAD.Dialog > .leftResizer')
    mapTouchToMouseFor('.WAD.Dialog > .middleResizer')
    mapTouchToMouseFor('.WAD.Dialog > .rightResizer')
    mapTouchToMouseFor('.WAD.LayouterLayer')
    mapTouchToMouseFor('.WAD.Cover')
    mapTouchToMouseFor('.WAD.ShapeHandle')

/**** make some existing types indexable ****/

  interface Indexable { [Key:string]:any }

/**** define serializable types ****/

  type serializableValue  = null | boolean | number | string |
                            serializableObject | serializableArray
  type serializableObject = { [Key:string]:serializableValue }
  type serializableArray  = serializableValue[]
  type Serializable       = serializableObject

/**** constants for special input situations ****/

  const noSelection    = {}
  const multipleValues = {}

//------------------------------------------------------------------------------
//--                           Stylesheet Handling                            --
//------------------------------------------------------------------------------

  let StyleElement = document.getElementById('WAD-Stylesheet')
  if (StyleElement == null) {
    StyleElement = document.createElement('style')
      StyleElement.id          = 'WAD-Stylesheet'
      StyleElement.textContent = ''
    document.head.appendChild(StyleElement)
  }

/**** appendStyle ****/

  function appendStyle (Style:WAT_Text):void {
// @ts-ignore TS18047 no, "StyleElement" is not null
    StyleElement.textContent += Style
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
    font-size:14px; font-weight:normal; line-height:1.4; color:black;
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
/**** Name/Integerr/URLInput ****/

  .WAD.TextLineInput, .WAD.IntegerInput, .WAD.URLInput {
    display:block; position:relative;
    width:auto; height:30px;
  }
  .WAD.TextLineInput > input, .WAD.IntegerInput > input, .WAD.URLInput > input {
    display:block; position:relative;
    left:0px; top:0px; width:100%; height:100%;
    border:solid 1px #888888; border-radius:2px;
    background:#e8f0ff; padding:0px 2px 0px 4px;
    pointer-events:auto;
  }
  .WAD.TextLineInput.wrong > input, .WAD.IntegerInput.wrong > input,
  .WAD.URLInput.wrong > input {
    color:red;
  }
  .WAD.TextLineInput > input:read-only, .WAD.IntegerInput > input:read-only,
  .WAD.URLInput > input:read-only {
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


`.trimLeft())

//------------------------------------------------------------------------------
//--                              Designer State                              --
//------------------------------------------------------------------------------

  const DesignerState:Indexable = {
    DesignerDisabled:false,           // temporarily disables Designer rendering
    Applet:undefined,                               // the "applet under design"
    isOpen:     false,          // when closed, only the DesignerButton is shown
    isLayouting:false,                 // the layouter inhibits applet operation
    DesignerButton: {                    // always visible if Designer is closed
      isDragging:false,
      x:NaN, y:NaN
    },
    Toolbox: {                          // always visible while Designer is open
      Title:'Toolbox',        View:undefined,
      x:NaN, y:NaN, Width:132, Height:194,
    },
    Inspector: {                             // only visible if Designer is open
      Title:'Inspector',      View:undefined,
      x:NaN, y:NaN, Width:380, Height:550,
      minWidth:380, minHeight:550,
      ReportToShow:undefined, // workaround for strange closure problem
      ScrollPositions:{
        AppletConfiguration:0,
        PageBrowser:        0,
        PageConfiguration:  0,
        WidgetBrowser:      0,
        WidgetConfiguration:0,
      },
      Expansions:{
        AppletConfiguration:{ Scripting:true },
        PageConfiguration:  { Scripting:true },
        WidgetConfiguration:{},
      },
    },
    ValueEditor: {                           // only visible if Designer is open
      Title:'Value Editor',   View:undefined,
      x:NaN, y:NaN, Width:320, Height:240,
      minWidth:320, minHeight:240,
    },
    ScriptEditor: {                          // only visible if Designer is open
      Title:'Script Editor',  View:undefined,
      x:NaN, y:NaN, Width:320, Height:240,
      minWidth:320, minHeight:240,
      Scope:'Applet',
      ReportToShow:undefined, // workaround for strange closure problem
    },
    selectedPages:  [],
    selectedWidgets:[],
  }

/**** open/closeDesigner ****/

  function openDesigner () {
    DesignerState.isOpen = true

    const { DesignerButton,Toolbox } = DesignerState
    if (isNaN(Toolbox.x) || isNaN(Toolbox.y)) {
      Toolbox.x = DesignerButton.x
      Toolbox.y = DesignerButton.y
    }

    WAT_rerender()
  }

  function closeDesigner () {
    DesignerState.isOpen = false
    WAT_rerender()
  }

//------------------------------------------------------------------------------
//--                            Selection Support                             --
//------------------------------------------------------------------------------

/**** selectPages ****/

  function selectPages (PageList:WAT_Page[]):void {
    DesignerState.selectedPages = PageList.slice()
    WAT_rerender()
  }

/**** sortedPageSelection ****/

  function sortedPageSelection ():WAT_Page[] {
    const IndexSet:WAT_Page[] = []
      DesignerState.selectedPages.forEach((Page:WAT_Page) => IndexSet[Page.Index] = Page)
    const IndexList = Object.keys(IndexSet).map(Number).sort()
    return IndexList.map((Index:number) => IndexSet[Index])
  }

/**** selectWidgets ****/

  function selectWidgets (
    SelectionA:WAT_Widget[], SelectionB:WAT_Widget[] = []
  ):void {
    const newSelection:WAT_Widget[] = SelectionA.slice()
      SelectionB.forEach((Widget:WAT_Widget) => {
        if (newSelection.indexOf(Widget) < 0) { newSelection.push(Widget) }
      })
    DesignerState.selectedWidgets = newSelection
    WAT_rerender()
  }

/**** sortedWidgetSelection ****/

  function sortedWidgetSelection ():WAT_Widget[] {
    const IndexSet:WAT_Widget[] = []
      DesignerState.selectedWidgets.forEach((Widget:WAT_Widget) => IndexSet[Widget.Index] = Widget)
    const IndexList = Object.keys(IndexSet).map(Number).sort()
    return IndexList.map((Index:number) => IndexSet[Index])
  }

/**** WidgetIsSelected ****/

  function WidgetIsSelected (Widget:WAT_Widget):boolean {
    return (DesignerState.selectedWidgets.indexOf(Widget) >= 0)
  }/**** commonValueOf ****/

  function commonValueOf (ValueList:any[]):any {
    if (ValueList.length === 0) { return noSelection }

    const Candidate:any = ValueList[0]
    if (ValueList.slice(1).every((Value:any) => ValuesAreEqual(Value,Candidate))) {
      return Candidate
    } else {
      return multipleValues
    }
  }

/**** commonValueItemOf ****/

  function commonValueItemOf (ValueList:any[], Entry:string|number):any {
    const commonValue = commonValueOf(ValueList)
    switch (commonValue) {
      case null:
      case undefined:
      case noSelection:
      case multipleValues: return commonValue
      default: return (
        typeof commonValue === 'object'
        ? commonValue[Entry]
        : commonValue
      )
    }
  }

/**** commonListLiteralOf ****/

  function commonListLiteralOf (ValueList:any[]):any {
    const commonValue = commonValueOf(ValueList)
    switch (commonValue) {
      case null:
      case undefined:      return ''
      case noSelection:
      case multipleValues: return commonValue
      default:             return (commonValue as any[]).join('\n')
    }
  }

//----------------------------------------------------------------------------//
//                           Confirmation Handling                            //
//----------------------------------------------------------------------------//

  function OperationWasConfirmed (Message?:string):boolean {
    let ConfirmationCode = Math.round(Math.random()*10000).toString()
      ConfirmationCode += '0000'.slice(ConfirmationCode.length)

    Message = (Message || 'This operation can not be undone.') + '\n\n' +
      'Please, enter the following number if you want to proceed:\n\n' +
      '   ' + ConfirmationCode + '\n\n' +
      'Otherwise, the operation will be cancelled'

    let UserInput = window.prompt(Message,'')
    if (UserInput === ConfirmationCode) {
      return true
    } else {
      window.alert('Operation will be cancelled')
      return false
    }
  }

//------------------------------------------------------------------------------
//--                             Dialog Handling                              --
//------------------------------------------------------------------------------

  const DialogList:string[] = [] // dialogs are only visible if Designer is open

/**** openDialog ****/

  function openDialog (Name:string, firstX:number = 20, firstY:number = 20):void {
    if (DialogList.indexOf(Name) < 0) {
      let { x,y } = DesignerState[Name]
      if (isNaN(x) || isNaN(y)) {
        DesignerState[Name].x = firstX
        DesignerState[Name].y = firstY
      }

      DialogList.push(Name)
    } else {
      bringDialogToFront(Name)
    }
    WAT_rerender()
  }

/**** closeDialog ****/

  function closeDialog (Name:string):void {
    let Index = DialogList.indexOf(Name)
    if (Index >= 0) {
      DialogList.splice(Index,1)
      WAT_rerender()
    }
  }

/**** toggleDialog ****/

  function toggleDialog (Name:string, Event?:PointerEvent):void {
    if (DialogIsOpen(Name)) {
      closeDialog(Name)
    } else {
      openDialog(Name, Event?.clientX,Event?.clientY) // *C* better position!
    }
  }

/**** bringDialogToFront ****/

  function bringDialogToFront (Name:string):void {
    let Index = DialogList.indexOf(Name)
    if ((Index < 0) || (Index == DialogList.length-1)) { return }

    DialogList.splice(Index,1)
    DialogList.push(Name)

    WAT_rerender()
  }

/**** DialogIsOpen ****/

  function DialogIsOpen (Name:string):boolean {
    return (DialogList.indexOf(Name) >= 0)
  }

//------------------------------------------------------------------------------
//--                                WAD_Dialog                                --
//------------------------------------------------------------------------------

  function WAD_Dialog (PropSet:Indexable) {
    const { Name, resizable, onClose } = PropSet

    const Descriptor = DesignerState[Name]
    const {
      Title, x,y, Width,Height,
      minWidth,maxWidth, minHeight,maxHeight,
    } = Descriptor

    const DragInfo = useMemo(() => ({
      Mode:undefined,
      StartX:NaN, StartY:NaN, initialGeometry:undefined
    }))

  /**** dialog dragging and resizing ****/

    const handleDrag = useCallback((dx:number,dy:number) => {
      if (DragInfo.Mode === 'drag') {
        moveDialog(dx,dy)
      } else {
        resizeDialog(dx,dy)
      }
      bringDialogToFront(Name)
      WAT_rerender()
    })

    const moveDialog = useCallback((dx:number,dy:number) => {
      Descriptor.x = DragInfo.initialGeometry.x + dx
      Descriptor.y = DragInfo.initialGeometry.y + dy
    })

    const resizeDialog = useCallback((dx:number,dy:number) => {
      let newWidth:number = DragInfo.initialGeometry.Width
      switch (DragInfo.Mode) {
        case 'resize-sw':
          newWidth = Math.max(minWidth || 0,Math.min(newWidth-dx,maxWidth || Infinity))
          dx       = newWidth-DragInfo.initialGeometry.Width

          Descriptor.x     = DragInfo.initialGeometry.x - dx
          Descriptor.Width = DragInfo.initialGeometry.Width+dx
          break
        case 'resize-se':
          Descriptor.Width = Math.max(
            minWidth || 0,Math.min(DragInfo.initialGeometry.Width+dx,maxWidth || Infinity)
          )
      }
      Descriptor.Height = Math.max(
        minHeight || 0,Math.min(DragInfo.initialGeometry.Height+dy,maxHeight || Infinity)
      )
    })

  /**** generic GestureRecognizer ****/

    const Recognizer = useCallback(GestureRecognizer({
      onlyFrom:   '.Titlebar,.leftResizer,.middleResizer,.rightResizer',
      neverFrom:  '.CloseButton',
      onDragStart:(dx:number,dy:number, _x:number,_y:number, Event:PointerEvent) => {
        let ClassList = (Event.target as HTMLElement).classList
        switch (true) {
          case ClassList.contains('leftResizer'):   DragInfo.Mode = 'resize-sw'; break
          case ClassList.contains('middleResizer'): DragInfo.Mode = 'resize-s';  break
          case ClassList.contains('rightResizer'):  DragInfo.Mode = 'resize-se'; break
          default:                                  DragInfo.Mode = 'drag'
        }

        const { x,y, Width,Height } = Descriptor
        DragInfo.initialGeometry = { x,y, Width,Height }

        handleDrag(dx,dy)
      },
      onDragContinuation:handleDrag,
      onDragFinish:      handleDrag,
      onDragAbortion:    handleDrag,
    }), [])

  /**** repositioning on viewport ****/

    const { x:AppletX, y:AppletY } = DesignerState.Applet.Geometry
    let { left,top } = fromDocumentTo('viewport',{
      left:x + AppletX, top:y + AppletY
    })
    left = Math.max(0,Math.min(left,document.documentElement.clientWidth-30))
    top  = Math.max(0,Math.min(top,document.documentElement.clientHeight-30))

  /**** actual rendering ****/

    return html`<div class="WAD Dialog ${resizable ? 'resizable' : ''}" style="
      left:${left}px; top:${top}px; width:${Width}px; height:${Height}px;
    ">
      <div class="Titlebar"
        onPointerDown=${Recognizer} onPointerUp=${Recognizer}
        onPointerMove=${Recognizer} onPointerCancel=${Recognizer}
      >
        <div class="Title">${Title}</div>

        ${(onClose != null) && html`
          <img class="CloseButton" src="${IconFolder}/xmark.png" onClick=${onClose}/>
        `}
      </div>

      <div class="ContentPane">${PropSet.children}</div>

      ${(resizable == true) && html`
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
    </>`
  }

//------------------------------------------------------------------------------
//--                              Error Handling                              --
//------------------------------------------------------------------------------

/**** showErrorReport ****/

  function showErrorReport (Visual:WAT_Visual, ErrorReport:WAT_ErrorReport):void {
    if (window.confirm(
      ErrorReport.Type + '\n\n' + ErrorReport.Message + '\n\n' +
      'Do you want to proceed to the Designer?'
    )) {
      openDesigner()                                  // if not yet already done
        const { Sufferer } = ErrorReport
        switch (true) {
          case ValueIsApplet(Sufferer):
            DesignerState.ScriptEditor.Scope = 'Applet'
            break
          case ValueIsPage(Sufferer):
            visitPage(Sufferer as WAT_Page)
            DesignerState.ScriptEditor.Scope = 'visitedPage'
            break
          case ValueIsWidget(Sufferer):
            visitPage((Sufferer as WAT_Widget).Page)
            selectWidgets([Sufferer as WAT_Widget])
            DesignerState.ScriptEditor.Scope = 'selectedWidgets'
            break
        }
      openDialog('ScriptEditor')                      // ...or bring it to front
    }
  }

/**** WAD_ErrorView ****/

  function WAD_ErrorView (PropSet:Indexable) {
    const { ErrorReport } = PropSet

    switch (ErrorReport) {
      case null:
      case undefined:
        return html`<div class="WAD ErrorView" style=${PropSet.style}><i>(no error)</i></>`
      case noSelection:
        return html`<div class="WAD ErrorView" style=${PropSet.style}><i>(no selection)</i></>`
      case multipleValues:
        return html`<div class="WAD ErrorView withError" style=${PropSet.style}><i>(multiple errors)</i></>`
      default:
        return html`<div class="WAD ErrorView withError" style=${PropSet.style}
          >${ErrorReport.Type}: ${ErrorReport.Message}</>`
    }
  }

//------------------------------------------------------------------------------
//--                   WAD_horizontally/vertically/centered                   --
//------------------------------------------------------------------------------

  function WAD_horizontally (PropSet:Indexable) {
    const { children, ...otherProps } = PropSet
    return html`<div class="WAD horizontally" ...${otherProps}>${children}</>`
  }

  function WAD_vertically (PropSet:Indexable) {
    const { children, ...otherProps } = PropSet
    return html`<div class="WAD vertically" ...${otherProps}>${children}</>`
  }

  function WAD_centered (PropSet:Indexable) {
    const { children, ...otherProps } = PropSet
    return html`<div class="WAD centered" ...${otherProps}>${children}</>`
  }

//------------------------------------------------------------------------------
//--                                 WAD_Gap                                  --
//------------------------------------------------------------------------------

  function WAD_Gap (PropSet:Indexable) {
    return html`<div class="WAD Gap" ...${PropSet}/>`
  }

//------------------------------------------------------------------------------
//--                                 WAD_Icon                                 --
//------------------------------------------------------------------------------

  function WAD_Icon (PropSet:Indexable) {
    const { Icon, Color, enabled, active, onClick, ...otherProps } = PropSet

    const _onClick = useCallback((Event:PointerEvent) => {
      if (enabled === false) {                      // deliberately chosen "==="
        Event.stopPropagation()
        Event.preventDefault()
      } else {
        if (typeof onClick === 'function') { onClick(Event) }
      }
    },[ enabled ])

    let Classes = ['WAD Icon']
      if (enabled === false) { Classes.push('disabled') }
      if (active  === true)  { Classes.push('active') }
    return html`<div class=${Classes.join(' ')} onClick=${_onClick} ...${otherProps}>
      <div style="
        -webkit-mask-image:url(${Icon}); mask-image:url(${Icon});
        background-color:${Color || 'black'};
      "></>
    </>`
  }

//------------------------------------------------------------------------------
//--                                WAD_Label                                 --
//------------------------------------------------------------------------------

  function WAD_Label (PropSet:Indexable) {
    return html`<div class="WAD Label" style="${PropSet.style}">${PropSet.children}</>`
  }

//------------------------------------------------------------------------------
//--                                WAD_Button                                --
//------------------------------------------------------------------------------

  function WAD_Button (PropSet:Indexable) {
    const { enabled, ...otherProps } = PropSet

    return html`<button class="WAD Button" disabled=${enabled === false}
      ...${otherProps}
    >
      ${PropSet.children}
    </>`
  }

//------------------------------------------------------------------------------
//--                               WAD_Checkbox                               --
//------------------------------------------------------------------------------

  function WAD_Checkbox (PropSet:Indexable) {
    let { enabled, Value, style,...otherProps } = PropSet

    let checked:boolean = false, indeterminate:boolean = false
      switch (Value) {
        case null:
        case undefined:
        case multipleValues: indeterminate = true; break
        case noSelection:    indeterminate = true; enabled = false; break
        default:             checked = Value as boolean
      }
    const CheckboxRef = useRef(null)
    useEffect(
      () => CheckboxRef.current.indeterminate = indeterminate,
      [indeterminate]
    )

    return html`<div class="WAD Checkbox" style=${style}>
      <input type="checkbox" ref=${CheckboxRef}
        disabled=${enabled === false}
        checked=${checked}
        ...${otherProps}
      />
    </>`
  }

//------------------------------------------------------------------------------
//--                            WAD_TextlineInput                             --
//------------------------------------------------------------------------------

  function WAD_TextlineInput (PropSet:Indexable) {
    let {
      enabled, Value,Placeholder, Suggestions,
      onInput,onBlur, style,...otherProps
    } = PropSet

  /**** Value Handling ****/

    const shownValue   = useRef('')
    const InputElement = useRef(null)

    let ValueToShow:string = ''
      switch (Value) {
        case null:
        case undefined:      ValueToShow = ''; break
        case multipleValues: ValueToShow = ''; Placeholder = '(multiple values)'; break
        case noSelection:    ValueToShow = ''; Placeholder = '(no selection)'; enabled = false; break
        default:             ValueToShow = Value as string
      }
    if (document.activeElement === InputElement.current) {
      ValueToShow = shownValue.current
    } else {
      shownValue.current = ValueToShow
    }
    const wrong = (ValueToShow !== shownValue.current ? 'wrong' : '')

  /**** Suggestion Handling ****/

    const SuggestionId = useMemo(() => newId() + '-Suggestions')

    let SuggestionList = ''
    if ((Suggestions != null) && (Suggestions.length > 0)) {
      SuggestionList = html`<datalist id=${SuggestionId}>
        ${Suggestions.map((Value:string) => html`<option value=${Value}></option>`)}
      </datalist>`
    }

  /**** Event Handling ****/

    const _onInput = useCallback((Event:any) => {
      Event.stopPropagation()
//    Event.preventDefault() // NO!

      if (enabled !== false) {
        shownValue.current = Event.target.value
        if (typeof onInput === 'function') { onInput(Event) }
      }
    },[ enabled ])

    const _onBlur = useCallback((Event:any) => {
      WAT_rerender()
      if (typeof onBlur === 'function') { onBlur(Event) }
    })

  /**** actual Rendering ****/

    return html`<div class="WAD TextLineInput ${wrong}" style=${style}>
      <input type="text"
        disabled=${enabled === false}
        ref=${InputElement} value=${ValueToShow} placeholder=${Placeholder}
        list=${SuggestionId}
        ...${otherProps} onInput=${_onInput} onBlur=${_onBlur}
      />${SuggestionList}
    </>`
  }

//------------------------------------------------------------------------------
//--                             WAD_IntegerInput                             --
//------------------------------------------------------------------------------

  function WAD_IntegerInput (PropSet:Indexable) {
    let {
      enabled, Value,Placeholder, Minimum,Maximum,
      onInput,onBlur, style,...otherProps
    } = PropSet

    const shownValue   = useRef('')
    const InputElement = useRef(null)

    let ValueToShow:string = ''
      switch (Value) {
        case null:
        case undefined:      ValueToShow = ''; break
        case multipleValues: ValueToShow = ''; Placeholder = '(multiple values)'; break
        case noSelection:    ValueToShow = ''; Placeholder = '(no selection)'; enabled = false; break
        default:             ValueToShow = ''+Value
      }
    if (document.activeElement === InputElement.current) {
      ValueToShow = shownValue.current
    } else {
      shownValue.current = ValueToShow
    }
    const wrong = (ValueToShow !== shownValue.current ? 'wrong' : '')

    const _onInput = useCallback((Event:any) => {
      Event.stopPropagation()
//    Event.preventDefault() // NO!

      if (enabled !== false) {
        shownValue.current = Event.target.value
        if (typeof onInput === 'function') { onInput(Event) }
      }
    },[ enabled ])

    const _onBlur = useCallback((Event:any) => {
      WAT_rerender()
      if (typeof onBlur === 'function') { onBlur(Event) }
    })

    return html`<div class="WAD IntegerInput ${wrong}" style=${style}>
      <input type="number" min=${Minimum || 0} step="1" max=${Maximum}
        disabled=${enabled === false}
        ref=${InputElement} value=${ValueToShow} placeholder=${Placeholder}
        ...${otherProps} onInput=${_onInput} onBlur=${_onBlur}
      />
    </>`
  }

//------------------------------------------------------------------------------
//--                               WAD_URLInput                               --
//------------------------------------------------------------------------------

  function WAD_URLInput (PropSet:Indexable) {
    let {
      enabled, Value,Placeholder, Suggestions,
      onInput,onBlur, style,...otherProps
    } = PropSet

  /**** Value Handling ****/

    const shownValue   = useRef('')
    const InputElement = useRef(null)

    let ValueToShow:string = ''
      switch (Value) {
        case null:
        case undefined:      ValueToShow = ''; break
        case multipleValues: ValueToShow = ''; Placeholder = '(multiple values)'; break
        case noSelection:    ValueToShow = ''; Placeholder = '(no selection)'; enabled = false; break
        default:             ValueToShow = Value as string
      }
    if (document.activeElement === InputElement.current) {
      ValueToShow = shownValue.current
    } else {
      shownValue.current = ValueToShow
    }
    const wrong = (ValueToShow !== shownValue.current ? 'wrong' : '')

  /**** Suggestion Handling ****/

    const SuggestionId = useMemo(() => newId() + '-Suggestions')

    let SuggestionList = ''
    if ((Suggestions != null) && (Suggestions.length > 0)) {
      SuggestionList = html`<datalist id=${SuggestionId}>
        ${Suggestions.map((Value:string) => html`<option value=${Value}></option>`)}
      </datalist>`
    }

  /**** Event Handling ****/

    const _onInput = useCallback((Event:any) => {
      Event.stopPropagation()
//    Event.preventDefault() // NO!

      if (enabled !== false) {
        shownValue.current = Event.target.value
        if (typeof onInput === 'function') { onInput(Event) }
      }
    },[ enabled ])

    const _onBlur = useCallback((Event:any) => {
      WAT_rerender()
      if (typeof onBlur === 'function') { onBlur(Event) }
    })

  /**** actual Rendering ****/

    return html`<div class="WAD URLInput ${wrong}" style=${style}>
      <input type="url"
        disabled=${enabled === false}
        ref=${InputElement} value=${ValueToShow} placeholder=${Placeholder}
        list=${SuggestionId}
        ...${otherProps} onInput=${_onInput} onBlur=${_onBlur}
      />${SuggestionList}
    </>`
  }

//------------------------------------------------------------------------------
//--                               WAD_DropDown                               --
//------------------------------------------------------------------------------

  function WAD_DropDown (PropSet:Indexable) {
    let { enabled, Value,Placeholder, Options, style,...otherProps } = PropSet

    let ValueToShow:string = ''
      switch (Value) {
        case null:
        case undefined:      ValueToShow = ''; break
        case multipleValues: ValueToShow = ''; Placeholder = '(multiple values)'; break
        case noSelection:    ValueToShow = ''; Placeholder = '(no selection)'; enabled = false; break
        default:             ValueToShow = ''+Value
      }
    return html`<div class="WAD DropDown" style=${style}>
      <select disabled=${enabled === false} ...${otherProps}>
        ${Placeholder == null
          ? ''
          : html`<option value="" disabled>${Placeholder}</option>`
        }
        <option disabled selected=${(Value || '') === ''}>(please select)</>
        ${(Options || []).map(
          (Option:string) => html`<option selected=${Option === Value}>${Option}</>`
        )}
      </select>
    </>`
  }

//------------------------------------------------------------------------------
//--                            WAD_PseudoDropDown                            --
//------------------------------------------------------------------------------

  function WAD_PseudoDropDown (PropSet:Indexable) {
    let { Icon, Color, enabled, Value,Placeholder, OptionList, ...otherProps } = PropSet

    return html`<div class="WAD PseudoDropDown ${enabled === false ? 'disabled' : ''}">
      <div style="
        -webkit-mask-image:url(${Icon}); mask-image:url(${Icon});
        background-color:${Color || 'black'};
      "></>
      <select disabled=${enabled === false} ...${otherProps}>
        ${Placeholder == null
          ? ''
          : html`<option value="" disabled selected=${Value === ''}>${Placeholder}</option>`
        }
        ${(OptionList || []).map((Option:string) => {
          const OptionValue = Option.replace(/:.*$/,'').trim()
          let   OptionLabel = Option.replace(/^[^:]+:/,'').trim()
          const disabled    = (OptionLabel[0] === '-')
            if (/^-[^-]+$/.test(OptionLabel)) {
              OptionLabel = OptionLabel.slice(1)
            }
          return html`<option value=${OptionValue} disabled=${disabled}
            selected=${OptionValue === Value}
          >${OptionLabel}</option>`
        })}
      </select>
    </>`
  }

//------------------------------------------------------------------------------
//--                           WAD_PseudoFileInput                            --
//------------------------------------------------------------------------------

  function WAD_PseudoFileInput (PropSet:Indexable) {
    let { Icon, Color, enabled, ...otherProps } = PropSet

    return html`<label class="WAD PseudoFileInput ${enabled === false ? 'disabled' : ''}">
      <div style="
        -webkit-mask-image:url(${Icon}); mask-image:url(${Icon});
        background-color:${Color || 'black'};
      "></>
      <input type="file" style="display:none" ...${otherProps}/>
    </>`
  }

//------------------------------------------------------------------------------
//--                              WAD_ColorInput                              --
//------------------------------------------------------------------------------

  function WAD_ColorInput (PropSet:Indexable) {
    let {
      enabled, Value,Suggestions,
      onInput,onBlur, style,...otherProps
    } = PropSet

  /**** Value Handling ****/

    const shownValue   = useRef('')
    const InputElement = useRef(null)

    let ValueToShow:string = ''
      switch (Value) {
        case null:
        case undefined:      ValueToShow = ''; break
        case multipleValues: ValueToShow = ''; break
        case noSelection:    ValueToShow = ''; enabled = false; break
        default:             ValueToShow = Value as string
      }
    if (document.activeElement === InputElement.current) {
      ValueToShow = shownValue.current
    } else {
      shownValue.current = ValueToShow
    }
    const wrong = (ValueToShow !== shownValue.current ? 'wrong' : '')

  /**** Suggestion Handling ****/

    const SuggestionId = useMemo(() => newId() + '-Suggestions')

    let SuggestionList = ''
    if ((Suggestions != null) && (Suggestions.length > 0)) {
      SuggestionList = html`<datalist id=${SuggestionId}>
        ${Suggestions.map((Value:string) => html`<option value=${Value}></option>`)}
      </datalist>`
    }

  /**** Event Handling ****/

    const _onInput = useCallback((Event:any) => {
      Event.stopPropagation()
//    Event.preventDefault() // NO!

      if (enabled !== false) {
        shownValue.current = Event.target.value
        if (typeof onInput === 'function') { onInput(Event) }
      }
    },[ enabled ])

    const _onBlur = useCallback((Event:any) => {
      WAT_rerender()
      if (typeof onBlur === 'function') { onBlur(Event) }
    })

  /**** actual Rendering ****/

    return html`<div class="WAD ColorInput ${wrong}" style=${style}>
      <input type="color"
        disabled=${enabled === false}
        ref=${InputElement} value=${ValueToShow}
        list=${SuggestionId}
        ...${otherProps} onInput=${_onInput} onBlur=${_onBlur}
      />${SuggestionList}
    </>`
  }

//------------------------------------------------------------------------------
//--                              WAD_TextInput                               --
//------------------------------------------------------------------------------

  function WAD_TextInput (PropSet:Indexable) {
    let {
      enabled, Value,Placeholder, onInput,onBlur,
      LineWrapping, style,...otherProps
    } = PropSet

    const shownValue   = useRef('')
    const InputElement = useRef(null)

    let ValueToShow:string = ''
      switch (Value) {
        case null:
        case undefined:      ValueToShow = ''; break
        case multipleValues: ValueToShow = ''; Placeholder = '(multiple values)'; break
        case noSelection:    ValueToShow = ''; Placeholder = '(no selection)'; enabled = false; break
        default:             ValueToShow = Value as string
      }
    if (document.activeElement === InputElement.current) {
      ValueToShow = shownValue.current
    } else {
      shownValue.current = ValueToShow
    }
    const wrong = (ValueToShow !== shownValue.current ? 'wrong' : '')

    const _onInput = useCallback((Event:any) => {
      Event.stopPropagation()
//    Event.preventDefault() // NO!

      if (enabled !== false) {
        shownValue.current = Event.target.value
        if (typeof onInput === 'function') { onInput(Event) }
      }
    },[ enabled ])

    const _onBlur = useCallback((Event:any) => {
      WAT_rerender()
      if (typeof onBlur === 'function') { onBlur(Event) }
    })

    return html`<div class="WAD TextInput ${wrong}" style=${style}>
      <textarea
        disabled=${enabled === false} style="${
          LineWrapping == true
          ? 'white-space:pre; overflow-wrap:break-word; hyphens:auto'
          : undefined
        }"
        ref=${InputElement} value=${ValueToShow} placeholder=${Placeholder}
        ...${otherProps} onInput=${_onInput} onBlur=${_onBlur}
      ></textarea>
    </>`
  }

//------------------------------------------------------------------------------
//--                             WAD_FlatListView                             --
//------------------------------------------------------------------------------

  function WAD_FlatListView (PropSet:Indexable) {
    let {
      List, ItemRenderer, Placeholder, selectedIndices, SelectionLimit,
      onClick, onDblClick,
      onSelectionChange, onItemSelected, onItemDeselected,
      ...otherProps
    } = PropSet

    expectList                        ('item list',List)
    allowFunction            ('list item renderer',ItemRenderer)
    allowTextline              ('list placeholder',Placeholder)
    allowListSatisfying('list of selected indices',selectedIndices, ValueIsOrdinal)
    allowOrdinal                ('selection limit',SelectionLimit)
    allowFunction                ('click callback',onClick)
    allowFunction         ('double-click callback',onDblClick)
    allowFunction     ('selection change callback',onSelectionChange)
    allowFunction       ('item selection callback',onItemSelected)
    allowFunction     ('item deselection callback',onItemDeselected)

    if (ItemRenderer    == null) { ItemRenderer    = (Item:any) => html`${Item+''}` }
    if (Placeholder     == null) { Placeholder     = '(empty)' }
    if (selectedIndices == null) { selectedIndices = [] }
    if (SelectionLimit  == null) { SelectionLimit  = 1 }

    const selectedIndexSet:Indexable = Object.create(null)
      selectedIndices = selectedIndices.filter((selectedIndex:number) => {
        if (
          ValueIsOrdinal(selectedIndex) &&
          (selectedIndex >= 0) && (selectedIndex < List.length) &&
          ! (selectedIndex in selectedIndexSet)
        ) {
          selectedIndexSet[selectedIndex] = true
          return true
        } else {
          return false
        }
      })
    if (selectedIndices.length > SelectionLimit) {
      const deselectedIndices = selectedIndices.slice(SelectionLimit)

      selectedIndices.length = SelectionLimit
      if (onSelectionChange != null) {
        onSelectionChange(selectedIndices)
      }

      if (onItemDeselected != null) {
        deselectedIndices.forEach((deselectedIndex:number) => {
          onItemDeselected(List[deselectedIndex],deselectedIndex)
        })
      }
    }

    function _onClick (Event:PointerEvent, Index:number):void {
      Event.stopImmediatePropagation()
      Event.preventDefault()

      if (SelectionLimit === 0) { return }

      let SelectionChanged:boolean = false
      let IndicesToSelect:number[], IndicesToDeselect:number[]
      if (Event.shiftKey || Event.metaKey) {
        SelectionChanged = true
        if (ItemIsSelected(Index)) {
          IndicesToDeselect = [Index]
          selectedIndices   = selectedIndices.filter(
            (selectedIndex:number) => (selectedIndex !== Index)
          )
        } else {
          if (selectedIndices.length === SelectionLimit) {
            IndicesToDeselect = [selectedIndices.shift()]
          }
          IndicesToSelect = [Index]
          selectedIndices.push(Index)
        }
      } else {
        IndicesToDeselect = selectedIndices.filter(
          (selectedIndex:number) => (selectedIndex !== Index)
        )
        SelectionChanged = ! ItemIsSelected(Index)
        IndicesToSelect  = (SelectionChanged ? [Index] : [])
        selectedIndices  = [Index]
      }

      if (SelectionChanged && (onSelectionChange != null)) {
        onSelectionChange(selectedIndices)
      }

// @ts-ignore TS2454 let's check IF variables were assigned
      if ((IndicesToDeselect != null) && (onItemDeselected != null)) {
        IndicesToDeselect.forEach((deselectedIndex:number) => {
          onItemDeselected(List[deselectedIndex],deselectedIndex)
        })
      }

// @ts-ignore TS2454 let's check IF variables were assigned
      if ((IndicesToSelect != null) && (onItemSelected != null)) {
        IndicesToSelect.forEach((selectedIndex:number) => {
          onItemSelected(List[selectedIndex],selectedIndex)
        })
      }

      if (onClick != null) { onClick(Event,Index) }
    }

    function _onDblClick (Event:PointerEvent, Index:number):void {
      if (onDblClick != null) { onDblClick(Event,Index) }
    }

    function ItemIsSelected (Index:number):boolean {
      return (Index in selectedIndexSet)
    }

    return html`<div class="WAD FlatListView ${List.length === 0 ? 'empty' : ''}"
      ...${otherProps}
    >
      ${
        List.length === 0
        ? html`<div class="Placeholder"><div>${Placeholder}</></>`
        : List.map((Item:any, Index:number) => html`<div
            class="ListItem ${ItemIsSelected(Index) ? 'selected' : undefined}"
            dangerouslySetInnerHTML=${{
              __html:ItemRenderer(Item, Index, ItemIsSelected(Index))
            }}
            onClick=${(Event:PointerEvent) => _onClick(Event,Index)}
            onDblClick=${(Event:PointerEvent) => _onDblClick(Event,Index)}
          />`)
      }
    </>`
  }

//------------------------------------------------------------------------------
//--                                 WAD_Fold                                 --
//------------------------------------------------------------------------------

  function WAD_Fold (PropSet:Indexable) {
    let { Label, Expansion,toggleExpansion } = PropSet

    return html`<div class="WAD Fold">
      <div class="WAD Fold-Header" onClick=${toggleExpansion}>
        <img class="WAD Fold-Expander" src=${Expansion
          ? `${IconFolder}/caret-down.png`
          : `${IconFolder}/caret-right.png`
        }/>
        <div class="WAD Fold-Title">${Label}</>
      </div>

      ${Expansion
        ? html`<div class="WAD Fold-Content">${PropSet.children}</>`
        : ''
      }
    </>`
  }

//------------------------------------------------------------------------------
//--                     WAD_horizontal/verticalSeparator                     --
//------------------------------------------------------------------------------

  function WAD_horizontalSeparator (PropSet:Indexable) {
    return html`<div class="WAD horizontalSeparator" ...${PropSet}/>`
  }

  function WAD_verticalSeparator (PropSet:Indexable) {
    return html`<div class="WAD verticalSeparator" ...${PropSet}/>`
  }

//------------------------------------------------------------------------------
//--                              Import Support                              --
//------------------------------------------------------------------------------

/**** looksLikeApplet ****/

  function looksLikeApplet (Serialization:Serializable):boolean {
    return (
      ValueIsPlainObject(Serialization) &&
      ValueIsListSatisfying(Serialization.PageList,looksLikePage)
    )
  }

/**** looksLikePage ****/

  function looksLikePage (Serialization:Serializable):boolean {
    return (
      ValueIsPlainObject(Serialization) &&
      ! ('PageList' in Serialization) &&
      ! ('Type' in Serialization) && (
        (Serialization.WidgetList == null) ||
        ValueIsListSatisfying(Serialization.WidgetList,looksLikeWidget)
      )
    )
  }

/**** looksLikePageList ****/

  function looksLikePageList (Serialization:Serializable):boolean {
    return ValueIsListSatisfying(Serialization,looksLikePage)
  }

/**** looksLikeWidget ****/

  function looksLikeWidget (Serialization:Serializable):boolean {
    return (
      ValueIsPlainObject(Serialization) &&
      ValueIsWidgetType(Serialization.Type)
    )
  }

/**** looksLikeWidgetList ****/

  function looksLikeWidgetList (Serialization:Serializable):boolean {
    return ValueIsListSatisfying(Serialization,looksLikeWidget)
  }

//------------------------------------------------------------------------------
//--                                Generators                                --
//------------------------------------------------------------------------------

/**** generateEmbeddableApplet - with integrated script ****/

  function generateEmbeddableApplet ():void {
    const { Applet } = DesignerState

    const AppletName    = Applet.Name || 'WAT-Applet'
    const Serialization = JSON.stringify(Applet.Serialization)
    const AppletSource  = `${'<'}script type="wat/applet">${Serialization}${'<'}/script>`

    const encodedSource = (new TextEncoder()).encode(AppletSource)
    const decodedSource = (new TextDecoder()).decode(encodedSource)
    if (AppletSource === decodedSource) {
      download(encodedSource, AppletName + '.html', 'text/html;charset=utf-8')
    } else {
      window.alert('this applet generation is not stable')
    }
  }

/**** generateStandaloneWebApp - with separate script and without designer ****/

  function generateStandaloneWebApp (withDesigner:boolean = false):void {
    const { Applet } = DesignerState

    const AppletName    = Applet.Name || 'WAT-Applet'
    const Serialization = Applet.Serialization
    const AppletScript  = Serialization.Script
      delete Serialization.Script

    const {
      HeadExtensions,
      minWidth,maxWidth, minHeight,maxHeight, toBeCentered,
      withMobileFrame,expectedOrientation
    } = Applet

    const AppletSource  = `
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
    : `${'<'}script type="wat/applet-script">${AppletScript}\n${'<'}/script>`
  }
 </head>
 <body></body>
</html>
    `.trim()

    const encodedSource = (new TextEncoder()).encode(AppletSource)
    const decodedSource = (new TextDecoder()).decode(encodedSource)
    if (AppletSource === decodedSource) {
      download(encodedSource, AppletName + '.html', 'text/html;charset=utf-8')
    } else {
      window.alert('this WebApp generation is not stable')
    }
  }

//------------------------------------------------------------------------------
//--                                  Shelf                                   --
//------------------------------------------------------------------------------

  Object.assign(DesignerState, {
    shelvedWidgets:[],                                // list of shelved widgets
  })

//------------------------------------------------------------------------------
//--                              Visit History                               --
//------------------------------------------------------------------------------

  Object.assign(DesignerState, {
    VisitHistory:[],                            // list of already visited pages
    VisitIndex:  -1,                         // points to currently visited page
  })

/**** mayVisitPrev/NextPage ****/

  function mayVisitPrevPage ():boolean { return (DesignerState.VisitIndex > 0) }
  function mayVisitNextPage ():boolean { return (DesignerState.VisitIndex < DesignerState.VisitHistory.length-1) }

/**** visitPrev/NextPage ****/

  function visitPrevPage ():void {
    if (mayVisitPrevPage()) {
      DesignerState.VisitIndex -= 1
      DesignerState.Applet.visitPage(DesignerState.VisitHistory[DesignerState.VisitIndex])
    }
  }

  function visitNextPage ():void {
    if (mayVisitNextPage()) {
      DesignerState.VisitIndex += 1
      DesignerState.Applet.visitPage(DesignerState.VisitHistory[DesignerState.VisitIndex])
    }
  }

/**** visitPage ****/

  function visitPage (Page:WAT_Page|undefined):void {
    allowPage('page to visit',Page)

    let { Applet, VisitHistory,VisitIndex } = DesignerState

    const visitedPage = VisitHistory[VisitIndex]
    if (visitedPage === Page) { return }

    if (mayVisitNextPage()) {
      DesignerState.VisitIndex = VisitIndex = VisitIndex+1
      if (VisitHistory[VisitIndex] !== Page) {
        VisitHistory[VisitIndex] = Page
        VisitHistory.length = VisitIndex+1
      }
    } else {
      VisitHistory.push(Page)
      DesignerState.VisitIndex += 1
    }
    Applet.visitPage(Page)
  }

/**** validateVisitHistory ****/

  function validateVisitHistory ():void {
    const VisitHistory = DesignerState.VisitHistory      // reference, not copy!
    for (let i = VisitHistory.length-1; i >= 0; i--) {
      if (VisitHistory[i].Applet == null) {
        VisitHistory.splice(i,1)
        if (DesignerState.VisitIndex >= i) { DesignerState.VisitIndex -= 1 }
      }
    }
  }

//------------------------------------------------------------------------------
//--                            Operation History                             --
//------------------------------------------------------------------------------

  Object.assign(DesignerState, {
    OperationHistory:[],
    OperationIndex:  0,                       // points to next doable operation
  })

/**** mayUndo/Redo ****/

  function mayUndo ():boolean { return (DesignerState.OperationIndex > 0) }
  function mayRedo ():boolean {
    return (DesignerState.OperationIndex < DesignerState.OperationHistory.length)
  }

/**** doOperation ****/

  function doOperation (Operation:WAD_Operation):void {
    const { OperationHistory,OperationIndex } = DesignerState

    if (OperationIndex < OperationHistory.length) {
      OperationHistory.length = OperationIndex
    }

    try {
      const prevOperation = OperationHistory[OperationIndex-1]
      if ((prevOperation != null) && Operation.canExtend(prevOperation)) {
        Operation.extend(prevOperation)                              // may fail

        if (prevOperation.isIrrelevant) {
          DesignerState.OperationIndex -= 1                 // only upon success
        }

        DesignerState.Applet.preserve()
      } else {
        Operation.doNow()                                            // may fail
        OperationHistory.push(Operation)                    // only upon success
        DesignerState.OperationIndex += 1

        DesignerState.Applet.preserve()
      }
    } catch (Signal:any) { console.error('operation failed',Signal) }
  }

/**** undoOperation ****/

  function undoOperation ():void {
    const { OperationHistory,OperationIndex } = DesignerState

    let prevOperation = OperationHistory[OperationIndex-1]
    if (prevOperation != null) {
      prevOperation.undo()
      DesignerState.OperationIndex -= 1                     // only upon success

      DesignerState.Applet.preserve()
    }
  }

/**** redoOperation ****/

  function redoOperation ():void {
    const { OperationHistory,OperationIndex } = DesignerState

    let nextOperation = OperationHistory[OperationIndex]
    if (nextOperation != null) {
      nextOperation.redo()
      DesignerState.OperationIndex += 1                     // only upon success

      DesignerState.Applet.preserve()
    }
  }

//----------------------------------------------------------------------------//
//                               WAD_Operation                                //
//----------------------------------------------------------------------------//

  abstract class WAD_Operation {
    public abstract canExtend (otherOperation:WAD_Operation):boolean
    public abstract extend    (otherOperation:WAD_Operation):void

    public get isIrrelevant ():boolean  { return false }
    public set isIrrelevant (_:boolean) { throwReadOnlyError('isIrrelevant') }

    public abstract doNow ():void
    public abstract redo  ():void
    public abstract undo  ():void
  }

//----------------------------------------------------------------------------//
//                      WAD_AppletConfigurationOperation                      //
//----------------------------------------------------------------------------//

  class WAD_AppletConfigurationOperation extends WAD_Operation {
    private _PropertyName:string
    private _oldValue:any
    private _newValue:any

  /**** constructor ****/

    public constructor (PropertyName:string, PropertyValue:any) {
      super()

      this._PropertyName = PropertyName
      this._oldValue     = DesignerState.Applet[PropertyName]
      this._newValue     = PropertyValue
    }

  /**** canExtend ****/

    public canExtend (otherOperation:WAD_Operation):boolean {
      return (
        (otherOperation instanceof WAD_AppletConfigurationOperation) &&
        (otherOperation._PropertyName === this._PropertyName) &&
        ValuesAreEqual(otherOperation._newValue,this._oldValue)
      )
    }

  /**** isIrrelevant ****/

    public get isIrrelevant ():boolean {
      return (this._newValue === this._oldValue)
    }
    public set isIrrelevant (_:boolean) { throwReadOnlyError('isIrrelevant') }

  /**** doNow ****/

    public doNow ():void {
      DesignerState.Applet[this._PropertyName] = this._newValue
    }

  /**** extend ****/

    public extend (otherOperation:WAD_AppletConfigurationOperation):void {
      this.doNow()
      otherOperation._newValue = this._newValue
    }

  /**** redo ****/

    public redo ():void {
      this.doNow()
    }

  /**** undo ****/

    public undo ():void {
      DesignerState.Applet[this._PropertyName] = this._oldValue
    }
  }
//----------------------------------------------------------------------------//
//                    WAD_AppletScriptApplicationOperation                    //
//----------------------------------------------------------------------------//

  class WAD_AppletScriptApplicationOperation extends WAD_Operation {
    private _oldScript:any
    private _newScript:any

  /**** constructor ****/

    public constructor () {
      super()

      this._oldScript = DesignerState.Applet.activeScript
      this._newScript = DesignerState.Applet.pendingScript
    }

  /**** canExtend ****/

    public canExtend (otherOperation:WAD_Operation):boolean {
      return false
    }

  /**** isIrrelevant ****/

    public get isIrrelevant ():boolean {
      return (this._newScript === this._oldScript)
    }
    public set isIrrelevant (_:boolean) { throwReadOnlyError('isIrrelevant') }

  /**** doNow ****/

    public doNow ():void {
      DesignerState.Applet.applyPendingScript()
    }

  /**** extend ****/

    public extend (otherOperation:WAD_AppletConfigurationOperation):void {
      throwError('NotExtensible: this operation can not be extended')
    }

  /**** redo ****/

    public redo ():void {
      this.doNow()
    }

  /**** undo ****/

    public undo ():void {
      const Applet = DesignerState.Applet
      const pendingScript = Applet.pendingScript
        Applet.pendingScript = this._oldScript
        try {
          DesignerState.Applet.applyPendingScript()
        } catch (Signal:any) {
          Applet.pendingScript = pendingScript
          throw Signal
        }
      Applet.pendingScript = pendingScript
    }
  }

//----------------------------------------------------------------------------//
//                      WAD_PageDeserializationOperation                      //
//----------------------------------------------------------------------------//

  class WAD_PageDeserializationOperation extends WAD_Operation {
    private _Serializations:Indexable[]
    private _StartIndex:number
    private _newPages:WAT_Page[] = []

  /**** constructor ****/

    public constructor (Serializations:Indexable[], StartIndex:number) {
      super()

      this._Serializations = Serializations.slice()
      this._StartIndex     = StartIndex
    }

  /**** canExtend ****/

    public canExtend (otherOperation:WAD_Operation):boolean {
      return false
    }

  /**** isIrrelevant ****/

    public get isIrrelevant ():boolean  { return false }
    public set isIrrelevant (_:boolean) { throwReadOnlyError('isIrrelevant') }

  /**** doNow ****/

    public doNow ():void {
      const Applet = DesignerState.Applet

      const newPages:WAT_Page[] = this._newPages = []
        this._Serializations.forEach((Serialization:Indexable, i:number) => {
          const newPage = Applet.PageDeserializedAt(
            Serialization, this._StartIndex+i
          )
          newPages.push(newPage)
        })
      selectPages(newPages)
    }

  /**** extend ****/

    public extend (otherOperation:WAD_Operation):void {
      throwError('NotExtensible: this operation can not be extended')
    }

  /**** redo ****/

    public redo ():void {
      this.doNow()
    }

  /**** undo ****/

    public undo ():void {
      const Applet = DesignerState.Applet
      this._newPages.forEach((Page:WAT_Page) => {
        Applet.destroyPage(Page)
      })
      selectPages([])
    }
  }

//----------------------------------------------------------------------------//
//                       WAD_PageConfigurationOperation                       //
//----------------------------------------------------------------------------//

  class WAD_PageConfigurationOperation extends WAD_Operation {
    private _Pages:WAT_Page[]
    private _PropertyName:string
    private _oldValues:any[]
    private _newValue:any

  /**** constructor ****/

    public constructor (
      Pages:WAT_Page[],  PropertyName:string, PropertyValue:any
    ) {
      super()

      this._Pages        = Pages.slice()
      this._PropertyName = PropertyName
      this._oldValues    = Pages.map((Page:WAT_Page) => Page[PropertyName])
      this._newValue     = PropertyValue
    }

  /**** canExtend ****/

    public canExtend (otherOperation:WAD_Operation):boolean {
      return (
        (otherOperation instanceof WAD_PageConfigurationOperation) &&
        ValuesAreEqual(otherOperation._Pages,this._Pages) &&
        (otherOperation._PropertyName === this._PropertyName) &&
        this._oldValues.every((oldValue:any) => ValuesAreEqual(oldValue,otherOperation._newValue))
      )
    }

  /**** isIrrelevant ****/

    public get isIrrelevant ():boolean {
      return this._oldValues.every((oldValue:any) => ValuesAreEqual(oldValue,this._newValue))
    }
    public set isIrrelevant (_:boolean) { throwReadOnlyError('isIrrelevant') }

  /**** doNow ****/

    public doNow ():void {
      this._Pages.forEach((Page:WAT_Page) => {
        Page[this._PropertyName] = this._newValue
      })
      selectPages(this._Pages)
    }

  /**** extend ****/

    public extend (otherOperation:WAD_PageConfigurationOperation):void {
      this.doNow()
      otherOperation._newValue = this._newValue
    }

  /**** redo ****/

    public redo ():void {
      this.doNow()
    }

  /**** undo ****/

    public undo ():void {
      this._Pages.forEach((Page:WAT_Page, i:number) => {
        Page[this._PropertyName] = this._oldValues[i]
      })
      selectPages(this._Pages)
    }
  }

//----------------------------------------------------------------------------//
//                     WAD_PageScriptApplicationOperation                     //
//----------------------------------------------------------------------------//

  class WAD_PageScriptApplicationOperation extends WAD_Operation {
    private _Pages:WAT_Page[]
    private _oldScripts:any[]
    private _newScripts:any[]

  /**** constructor ****/

    public constructor (Pages:WAT_Page[]) {
      super()

      this._Pages      = Pages.slice()
      this._oldScripts = Pages.map((Page:WAT_Page) => Page.activeScript)
      this._newScripts = Pages.map((Page:WAT_Page) => Page.pendingScript)
    }

  /**** canExtend ****/

    public canExtend (otherOperation:WAD_Operation):boolean {
      return false
    }

  /**** isIrrelevant ****/

    public get isIrrelevant ():boolean {
      return ValuesAreEqual(this._newScripts,this._oldScripts)
    }
    public set isIrrelevant (_:boolean) { throwReadOnlyError('isIrrelevant') }

  /**** doNow ****/

    public doNow ():void {
      this._Pages.forEach((Page:WAT_Page) => Page.applyPendingScript())
    }

  /**** extend ****/

    public extend (otherOperation:WAD_AppletConfigurationOperation):void {
      throwError('NotExtensible: this operation can not be extended')
    }

  /**** redo ****/

    public redo ():void {
      this.doNow()
    }

  /**** undo ****/

    public undo ():void {
      this._Pages.forEach((Page:WAT_Page, i:number) => {
        const pendingScript = Page.pendingScript
        Page.pendingScript = this._oldScripts[i]
          try {
            Page.applyPendingScript()
          } catch (Signal:any) { /* nop - will se an error anyway */ }
        Page.pendingScript = pendingScript
      })
    }
  }

//----------------------------------------------------------------------------//
//                           WAD_PageShiftOperation                           //
//----------------------------------------------------------------------------//

  class WAD_PageShiftOperation extends WAD_Operation {
    private _Pages:WAT_Page[]
    private _oldIndices:number[]
    private _newIndices:number[]

  /**** constructor ****/

    public constructor (Pages:WAT_Page[], newIndices:number[]) {
      super()

      this._Pages      = Pages.slice()
      this._oldIndices = Pages.map((Page:WAT_Page) => Page.Index)
      this._newIndices = newIndices.slice()
    }

  /**** canExtend ****/

    public canExtend (otherOperation:WAD_Operation):boolean {
      return (
        (otherOperation instanceof WAD_PageShiftOperation) &&
        ValuesAreEqual(otherOperation._Pages,this._Pages) &&
        ValuesAreEqual(otherOperation._newIndices,this._oldIndices)
      )
    }

  /**** isIrrelevant ****/

    public get isIrrelevant ():boolean {
      return ValuesAreEqual(this._oldIndices,this._newIndices)
    }
    public set isIrrelevant (_:boolean) { throwReadOnlyError('isIrrelevant') }

  /**** doNow ****/

    public doNow ():void {
      DesignerState.Applet.shiftPagesTo(this._Pages,this._newIndices)
      selectPages(this._Pages)
    }

  /**** extend ****/

    public extend (otherOperation:WAD_PageShiftOperation):void {
      this.doNow()
      otherOperation._newIndices = this._newIndices
    }

  /**** redo ****/

    public redo ():void {
      this.doNow()
    }

  /**** undo ****/

    public undo ():void {
      DesignerState.Applet.shiftPagesTo(this._Pages,this._oldIndices)
      selectPages(this._Pages)
    }
  }

//----------------------------------------------------------------------------//
//                         WAD_PageDeletionOperation                          //
//----------------------------------------------------------------------------//

  class WAD_PageDeletionOperation extends WAD_Operation {
    private _Pages:WAT_Page[]
    private _Indices:number[]
    private _Serializations:Serializable[]

  /**** constructor ****/

    public constructor (Pages:WAT_Page[]) {
      super()

      const IndexSet:WAT_Page[] = []
        Pages.forEach((Page:WAT_Page) => IndexSet[Page.Index] = Page)
      this._Indices        = Object.keys(IndexSet).map(Number).sort()
      this._Pages          = this._Indices.map((Index:number) => IndexSet[Index])
      this._Serializations = this._Pages.map((Page:WAT_Page) => Page.Serialization)
    }

  /**** canExtend ****/

    public canExtend (otherOperation:WAD_Operation):boolean {
      return false
    }

  /**** isIrrelevant ****/

    public get isIrrelevant ():boolean  { return false }
    public set isIrrelevant (_:boolean) { throwReadOnlyError('isIrrelevant') }

  /**** doNow ****/

    public doNow ():void {
      const { Applet } = DesignerState

      this._Pages.forEach((Page:WAT_Page) => {
        Applet.destroyPage(Page)
      })
    }

  /**** extend ****/

    public extend (otherOperation:WAD_Operation):void {
      throwError('NotExtensible: this operation can not be extended')
    }

  /**** redo ****/

    public redo ():void {
      this.doNow()
    }

  /**** undo ****/

    public undo ():void {
      const { Applet } = DesignerState

      const newPages:WAT_Page[] = this._Pages = []
        this._Serializations.forEach((Serialization:Indexable, i:number) => {
          const newPage = Applet.PageDeserializedAt(
            Serialization, this._Indices[i]
          )
          newPages.push(newPage)
        })
      selectPages(newPages)
    }
  }

//----------------------------------------------------------------------------//
//                     WAD_WidgetDeserializationOperation                     //
//----------------------------------------------------------------------------//

  class WAD_WidgetDeserializationOperation extends WAD_Operation {
    private _Page:WAT_Page
    private _Serializations:Indexable[]
    private _StartIndex:number
    private _newWidgets:WAT_Widget[] = []

  /**** constructor ****/

    public constructor (
      Serializations:Indexable[], Page:WAT_Page, StartIndex:number
    ) {
      super()

      this._Page           = Page
      this._Serializations = Serializations.slice()
      this._StartIndex     = StartIndex
    }

  /**** canExtend ****/

    public canExtend (otherOperation:WAD_Operation):boolean {
      return false
    }

  /**** isIrrelevant ****/

    public get isIrrelevant ():boolean  { return false }
    public set isIrrelevant (_:boolean) { throwReadOnlyError('isIrrelevant') }

  /**** doNow ****/

    public doNow ():void {
      const newWidgets:WAT_Widget[] = this._newWidgets = []
        this._Serializations.forEach((Serialization:Indexable, i:number) => {
          const newWidget = this._Page.WidgetDeserializedAt(
            Serialization.Type, Serialization, this._StartIndex+i
          )
          newWidgets.push(newWidget)
        })
      selectWidgets(newWidgets)
    }

  /**** extend ****/

    public extend (otherOperation:WAD_Operation):void {
      throwError('NotExtensible: this operation can not be extended')
    }

  /**** redo ****/

    public redo ():void {
      this.doNow()
    }

  /**** undo ****/

    public undo ():void {
      this._newWidgets.forEach((Widget:WAT_Widget) => {
        this._Page.destroyWidget(Widget)
      })
      selectWidgets([])
    }
  }

//----------------------------------------------------------------------------//
//                      WAD_WidgetConfigurationOperation                      //
//----------------------------------------------------------------------------//

  class WAD_WidgetConfigurationOperation extends WAD_Operation {
    private _Widgets:WAT_Widget[]
    private _PropertyName:string
    private _oldValues:any[]
    private _newValues:any[]

  /**** constructor ****/

    public constructor (
      Widgets:WAT_Widget[],  PropertyName:string, PropertyValues:any[]
    ) {
      super()

      this._Widgets      = Widgets.slice()
      this._PropertyName = PropertyName
      this._oldValues    = Widgets.map((Widget:WAT_Widget) => Widget[PropertyName])
      this._newValues    = PropertyValues.slice()
    }

  /**** canExtend ****/

    public canExtend (otherOperation:WAD_Operation):boolean {
      return (
        (otherOperation instanceof WAD_WidgetConfigurationOperation) &&
        ValuesAreEqual(otherOperation._Widgets,this._Widgets) &&
        (otherOperation._PropertyName === this._PropertyName) &&
        ValuesAreEqual(this._oldValues,otherOperation._newValues)
      )
    }

  /**** isIrrelevant ****/

    public get isIrrelevant ():boolean {
      return ValuesAreEqual(this._oldValues,this._newValues)
    }
    public set isIrrelevant (_:boolean) { throwReadOnlyError('isIrrelevant') }

  /**** doNow ****/

    public doNow ():void {
      this._Widgets.forEach((Widget:WAT_Widget, i:number) => {
        Widget[this._PropertyName] = this._newValues[i]
      })
      selectWidgets(this._Widgets)
    }

  /**** extend ****/

    public extend (otherOperation:WAD_WidgetConfigurationOperation):void {
      this.doNow()
      otherOperation._newValues = this._newValues
    }

  /**** redo ****/

    public redo ():void {
      this.doNow()
    }

  /**** undo ****/

    public undo ():void {
      this._Widgets.forEach((Widget:WAT_Widget, i:number) => {
        Widget[this._PropertyName] = this._oldValues[i]
      })
      selectWidgets(this._Widgets)
    }
  }

//----------------------------------------------------------------------------//
//                    WAD_WidgetScriptApplicationOperation                    //
//----------------------------------------------------------------------------//

  class WAD_WidgetScriptApplicationOperation extends WAD_Operation {
    private _Widgets:WAT_Widget[]
    private _oldScripts:any[]
    private _newScripts:any[]

  /**** constructor ****/

    public constructor (Widgets:WAT_Widget[]) {
      super()

      this._Widgets    = Widgets.slice()
      this._oldScripts = Widgets.map((Widget:WAT_Widget) => Widget.activeScript)
      this._newScripts = Widgets.map((Widget:WAT_Widget) => Widget.pendingScript)
    }

  /**** canExtend ****/

    public canExtend (otherOperation:WAD_Operation):boolean {
      return false
    }

  /**** isIrrelevant ****/

    public get isIrrelevant ():boolean {
      return ValuesAreEqual(this._newScripts,this._oldScripts)
    }
    public set isIrrelevant (_:boolean) { throwReadOnlyError('isIrrelevant') }

  /**** doNow ****/

    public doNow ():void {
      this._Widgets.forEach((Widget:WAT_Widget) => Widget.applyPendingScript())
    }

  /**** extend ****/

    public extend (otherOperation:WAD_AppletConfigurationOperation):void {
      throwError('NotExtensible: this operation can not be extended')
    }

  /**** redo ****/

    public redo ():void {
      this.doNow()
    }

  /**** undo ****/

    public undo ():void {
      this._Widgets.forEach((Widget:WAT_Widget, i:number) => {
        const pendingScript = Widget.pendingScript
        Widget.pendingScript = this._oldScripts[i]
          try {
            Widget.applyPendingScript()
          } catch (Signal:any) { /* nop - will se an error anyway */ }
        Widget.pendingScript = pendingScript
      })
    }
  }

//----------------------------------------------------------------------------//
//                          WAD_WidgetShapeOperation                          //
//----------------------------------------------------------------------------//

  class WAD_WidgetShapeOperation extends WAD_Operation {
    private _Page:WAT_Page
    private _Widgets:WAT_Widget[]
    private _oldGeometries:WAT_Geometry[]
    private _newGeometries:WAT_Geometry[]

  /**** constructor ****/

    public constructor (
      Widgets:WAT_Widget[], Geometries:WAT_Geometry[]
    ) {
      super()

      this._Page = Widgets[0].Page
        if (Widgets.some((Widget:WAT_Widget) => Widget.Page !== this._Page)) throwError(
          'InvalidArgument: the given widgets do not all belong to the same page'
        )
      this._Widgets       = Widgets.slice()
      this._oldGeometries = Widgets.map((Widget:WAT_Widget) => Widget.Geometry)
      this._newGeometries = Geometries.slice()
    }

  /**** canExtend ****/

    public canExtend (otherOperation:WAD_Operation):boolean {
      return (
        (otherOperation instanceof WAD_WidgetShapeOperation) &&
        ValuesAreEqual(otherOperation._Widgets,this._Widgets) &&
        this._oldGeometries.every(
          (Geometry:WAT_Geometry, i:number) => ValuesAreEqual(otherOperation._newGeometries[i],Geometry)
        )
      )
    }

  /**** isIrrelevant ****/

    public get isIrrelevant ():boolean {
      return this._oldGeometries.every(
        (Geometry:WAT_Geometry, i:number) => ValuesAreEqual(this._newGeometries[i],Geometry)
      )
    }
    public set isIrrelevant (_:boolean) { throwReadOnlyError('isIrrelevant') }

  /**** doNow ****/

    public doNow ():void {
      this._Widgets.forEach((Widget:WAT_Widget, i:number) => {
        Widget.Geometry = this._newGeometries[i]
      })
      selectWidgets(this._Widgets)
    }

  /**** extend ****/

    public extend (otherOperation:WAD_WidgetShapeOperation):void {
      this.doNow()
      otherOperation._newGeometries = this._newGeometries
    }

  /**** redo ****/

    public redo ():void {
      this.doNow()
    }

  /**** undo ****/

    public undo ():void {
      this._Widgets.forEach((Widget:WAT_Widget, i:number) => {
        Widget.Geometry = this._oldGeometries[i]
      })
      selectWidgets(this._Widgets)
    }
  }

//----------------------------------------------------------------------------//
//                          WAD_WidgetShiftOperation                          //
//----------------------------------------------------------------------------//

  class WAD_WidgetShiftOperation extends WAD_Operation {
    private _Page:WAT_Page
    private _Widgets:WAT_Widget[]
    private _oldIndices:number[]
    private _newIndices:number[]

  /**** constructor ****/

    public constructor (Widgets:WAT_Widget[], newIndices:number[]) {
      super()

      this._Page = Widgets[0].Page
        if (Widgets.some((Widget:WAT_Widget) => Widget.Page !== this._Page)) throwError(
          'InvalidArgument: the given widgets do not all belong to the same page'
        )
      this._Widgets    = Widgets.slice()
      this._oldIndices = Widgets.map((Widget:WAT_Widget) => Widget.Index)
      this._newIndices = newIndices.slice()
    }

  /**** canExtend ****/

    public canExtend (otherOperation:WAD_Operation):boolean {
      return (
        (otherOperation instanceof WAD_WidgetShiftOperation) &&
        ValuesAreEqual(otherOperation._Widgets,this._Widgets) &&
        ValuesAreEqual(otherOperation._newIndices,this._oldIndices)
      )
    }

  /**** isIrrelevant ****/

    public get isIrrelevant ():boolean {
      return ValuesAreEqual(this._oldIndices,this._newIndices)
    }
    public set isIrrelevant (_:boolean) { throwReadOnlyError('isIrrelevant') }

  /**** doNow ****/

    public doNow ():void {
      this._Page.shiftWidgetsTo(this._Widgets,this._newIndices)
      selectWidgets(this._Widgets)
    }

  /**** extend ****/

    public extend (otherOperation:WAD_WidgetShiftOperation):void {
      this.doNow()
      otherOperation._newIndices = this._newIndices
    }

  /**** redo ****/

    public redo ():void {
      this.doNow()
    }

  /**** undo ****/

    public undo ():void {
      this._Page.shiftWidgetsTo(this._Widgets,this._oldIndices)
      selectWidgets(this._Widgets)
    }
  }

//----------------------------------------------------------------------------//
//                        WAD_WidgetDeletionOperation                         //
//----------------------------------------------------------------------------//

  class WAD_WidgetDeletionOperation extends WAD_Operation {
    private _Page:WAT_Page
    private _Widgets:WAT_Widget[]
    private _Indices:number[]
    private _Serializations:Serializable[]

  /**** constructor ****/

    public constructor (Widgets:WAT_Widget[]) {
      super()

      this._Page = Widgets[0].Page
        if (Widgets.some((Widget:WAT_Widget) => Widget.Page !== this._Page)) throwError(
          'InvalidArgument: the given widgets do not all belong to the same page'
        )
      const IndexSet:WAT_Widget[] = []
        Widgets.forEach((Widget:WAT_Widget) => IndexSet[Widget.Index] = Widget)
      this._Indices        = Object.keys(IndexSet).map(Number).sort()
      this._Widgets        = this._Indices.map((Index:number) => IndexSet[Index])
      this._Serializations = this._Widgets.map((Widget:WAT_Widget) => Widget.Serialization)
    }

  /**** canExtend ****/

    public canExtend (otherOperation:WAD_Operation):boolean {
      return false
    }

  /**** isIrrelevant ****/

    public get isIrrelevant ():boolean  { return false }
    public set isIrrelevant (_:boolean) { throwReadOnlyError('isIrrelevant') }

  /**** doNow ****/

    public doNow ():void {
      this._Widgets.forEach((Widget:WAT_Widget) => {
        this._Page.destroyWidget(Widget)
      })
    }

  /**** extend ****/

    public extend (otherOperation:WAD_Operation):void {
      throwError('NotExtensible: this operation can not be extended')
    }

  /**** redo ****/

    public redo ():void {
      this.doNow()
    }

  /**** undo ****/

    public undo ():void {
      const newWidgets:WAT_Widget[] = this._Widgets = []
        this._Serializations.forEach((Serialization:Indexable, i:number) => {
          const newWidget = this._Page.WidgetDeserializedAt(
            Serialization.Type, Serialization, this._Indices[i]
          )
          newWidgets.push(newWidget)
        })
      selectWidgets(newWidgets)
    }
  }//----------------------------------------------------------------------------//
//                                  Commands                                  //
//----------------------------------------------------------------------------//

/**** doConfigureApplet ****/

  function doConfigureApplet (Property:string, Value:any):void {
    doOperation(new WAD_AppletConfigurationOperation(Property,Value))
  }

/**** doApplyAppletScript ****/

  function doApplyAppletScript ():void {
    doOperation(new WAD_AppletScriptApplicationOperation())
  }

/**** doCreatePage ****/

  function doCreatePage ():void {
    const { Applet,selectedPages } = DesignerState

    const InsertionIndex = (
      selectedPages.length === 0
      ? Applet.PageCount
      : Math.max(selectedPages.map((Page:WAT_Page) => Page.Index))+1
    )

    doOperation(new WAD_PageDeserializationOperation(
      [{ WidgetList:[] }], InsertionIndex
    ))
  }

/**** doDuplicateSelectedPages ****/

  function doDuplicateSelectedPages ():void {
    const selectedPages  = sortedPageSelection()
    const InsertionIndex = selectedPages[selectedPages.length-1].Index+1

    doOperation(new WAD_PageDeserializationOperation(
      selectedPages.map((Page:WAT_Page) => Page.Serialization), InsertionIndex
    ))
  }

/**** doConfigureVisitedPage ****/

  function doConfigureVisitedPage (Property:string, Value:any):void {
    doOperation(new WAD_PageConfigurationOperation(
      [DesignerState.Applet.visitedPage], Property,Value
    ))
  }

/**** doConfigureSelectedPages ****/

  function doConfigureSelectedPages (Property:string, Value:any):void {
    doOperation(new WAD_PageConfigurationOperation(
      DesignerState.selectedPages, Property,Value
    ))
  }

/**** doApplyVisitedPageScript ****/

  function doApplyVisitedPageScript ():void {
    doOperation(
      new WAD_PageScriptApplicationOperation([DesignerState.Applet.visitedPage])
    )
  }

/**** doShiftSelectedPagesToTop ****/

  function doShiftSelectedPagesToTop ():void {
    const selectedPages = sortedPageSelection()
    const IndexList     = Array.from(
      {length:selectedPages.length}, (_:any,i:number) => i
    )
    doOperation(new WAD_PageShiftOperation(selectedPages,IndexList))
  }

/**** doShiftSelectedPagesUp ****/

  function doShiftSelectedPagesUp ():void {
    const selectedPages = sortedPageSelection()
    const StartIndex    = selectedPages[0].Index-1
    const IndexList     = Array.from(
      {length:selectedPages.length}, (_:any,i:number) => StartIndex+i
    )
    doOperation(new WAD_PageShiftOperation(selectedPages,IndexList))
  }

/**** doShiftSelectedPagesDown ****/

  function doShiftSelectedPagesDown ():void {
    const selectedPages  = sortedPageSelection()
    const SelectionCount = selectedPages.length
    const StartIndex     = selectedPages[SelectionCount-1].Index+2-SelectionCount
    const IndexList      = Array.from(
      {length:selectedPages.length}, (_:any,i:number) => StartIndex+i
    )
    doOperation(new WAD_PageShiftOperation(selectedPages,IndexList))
  }

/**** doShiftSelectedPagesToBottom ****/

  function doShiftSelectedPagesToBottom ():void {
    const selectedPages  = sortedPageSelection()
    const SelectionCount = selectedPages.length
    const StartIndex     = DesignerState.Applet.PageCount+2-SelectionCount
    const IndexList      = Array.from(
      {length:selectedPages.length}, (_:any,i:number) => StartIndex+i
    )
    doOperation(new WAD_PageShiftOperation(selectedPages,IndexList))
  }

/**** doVisitSelectedPage ****/

  function doVisitSelectedPage ():void {
    const { selectedPages } = DesignerState
    visitPage(selectedPages[selectedPages.length-1])
  }

/**** doDeleteSelectedPages ****/

  function doDeleteSelectedPages ():void {
    doOperation(new WAD_PageDeletionOperation(DesignerState.selectedPages))
  }

/**** doCreateWidget ****/

  function doCreateWidget (Type:string):void {
    doOperation(new WAD_WidgetDeserializationOperation(
      [{ Type }], DesignerState.Applet.visitedPage,0
    ))
  }

/**** doDuplicateSelectedWidgets ****/

  function doDuplicateSelectedWidgets ():void {
    const selectedWidgets = sortedWidgetSelection()
    if (selectedWidgets.length === 0) { return }

    doOperation(new WAD_WidgetDeserializationOperation(
      selectedWidgets.map((Widget:WAT_Widget) => Widget.Serialization),
      DesignerState.Applet.visitedPage,0
    ))
  }

/**** doConfigureSelectedWidgets ****/

  function doConfigureSelectedWidgets (Property:string, Value:any):void {
    const { selectedWidgets } = DesignerState

    let ValuesToSet:any|any[]
      switch (Property) {
        case 'Anchors_0':
          Property    = 'Anchors'
          ValuesToSet = selectedWidgets.map((Widget:WAT_Widget) => {
            return [Value,Widget.Anchors[1]]
          })
          break
        case 'Anchors_1':
          Property    = 'Anchors'
          ValuesToSet = selectedWidgets.map((Widget:WAT_Widget) => {
            return [Widget.Anchors[0],Value]
          })
          break
        case 'Offsets_0':
          Property    = 'Offsets'
          ValuesToSet = selectedWidgets.map((Widget:WAT_Widget) => {
            const [ Offset_0,Offset_1,Offset_2,Offset_3 ] = Widget.Offsets
            return [Value,Offset_1,Offset_2,Offset_3]
          })
          break
        case 'Offsets_1':
          Property    = 'Offsets'
          ValuesToSet = selectedWidgets.map((Widget:WAT_Widget) => {
            const [ Offset_0,Offset_1,Offset_2,Offset_3 ] = Widget.Offsets
            return [Offset_0,Value,Offset_2,Offset_3]
          })
          break
        case 'Offsets_2':
          Property    = 'Offsets'
          ValuesToSet = selectedWidgets.map((Widget:WAT_Widget) => {
            const [ Offset_0,Offset_1,Offset_2,Offset_3 ] = Widget.Offsets
            return [Offset_0,Offset_1,Value,Offset_3]
          })
          break
        case 'Offsets_3':
          Property    = 'Offsets'
          ValuesToSet = selectedWidgets.map((Widget:WAT_Widget) => {
            const [ Offset_0,Offset_1,Offset_2,Offset_3 ] = Widget.Offsets
            return [Offset_0,Offset_1,Offset_2,Value]
          })
          break
        default:
          ValuesToSet = selectedWidgets.map((_:any) => Value)
      }
    doOperation(new WAD_WidgetConfigurationOperation(
      selectedWidgets, Property,ValuesToSet
    ))
  }

/**** doApplySelectedWidgetsScript ****/

  function doApplySelectedWidgetsScript ():void {
    const { selectedWidgets } = DesignerState
    doOperation(
      new WAD_WidgetScriptApplicationOperation(selectedWidgets)
    )
  }

/**** doChangeGeometriesBy ****/

  function doChangeGeometriesBy (
    WidgetList:WAT_Widget[], Mode:string, dx:number,dy:number,
    initialGeometries:WAT_Geometry[], withSnapToGrid:boolean = true
  ):void {
    let dX:number = 0, dY:number = 0, dW:number = 0, dH:number = 0
    switch (Mode) {
      case 'nw': dX = dx; dW = -dx; dY = dy; dH = -dy; break
      case 'n':                     dY = dy; dH = -dy; break
      case 'ne':          dW = dx;  dY = dy; dH = -dy; break
      case 'e':           dW = dx;                     break
      case 'se':          dW = dx;           dH = dy;  break
      case 's':                              dH = dy;  break
      case 'sw': dX = dx; dW = -dx;          dH = dy;  break
      case 'w':  dX = dx; dW = -dx;                    break
      case 'c':  dX = dx;           dY = dy;
    }

    const { SnapToGrid, GridWidth,GridHeight } = DesignerState.Applet

    const GeometryList = initialGeometries.map(
      (Geometry:WAT_Geometry) => {
        let Width:number  = Math.max(0,Geometry.Width+dW)
        let Height:number = Math.max(0,Geometry.Height+dH)

        let xl:number = Geometry.x+dX, xr = xl + Width
        let yt:number = Geometry.y+dY, yb = yt + Height

        if (withSnapToGrid && SnapToGrid) {
          let xl_ = GridWidth*Math.round(xl/GridWidth)
          let xr_ = GridWidth*Math.round(xr/GridWidth)
          let yt_ = GridHeight*Math.round(yt/GridHeight)
          let yb_ = GridHeight*Math.round(yb/GridHeight)

          switch (Mode) {
            case 'nw': xl = Math.min(xl_,xr); yt = Math.min(yt_,yb); break
            case 'n':                         yt = Math.min(yt_,yb); break
            case 'ne': xr = Math.max(xl,xr_); yt = Math.min(yt_,yb); break
            case 'e':  xr = Math.max(xl,xr_);                        break
            case 'se': xr = Math.max(xl,xr_); yb = Math.max(yt,yb_); break
            case 's':                         yb = Math.max(yt,yb_); break
            case 'sw': xl = Math.min(xl_,xr); yb = Math.max(yt,yb_); break
            case 'w':  xl = Math.min(xl_,xr);                        break
            case 'c':  xl = xl_; xr = xl+Width; yt = yt_; yb = yt+Height
          }
        }
        return { x:xl,y:yt, Width:xr-xl,Height:yb-yt }
      }
    )

    doOperation(new WAD_WidgetShapeOperation(WidgetList,GeometryList))
  }

/**** doShiftSelectedWidgetsToTop ****/

  function doShiftSelectedWidgetsToTop ():void {
    const selectedWidgets = sortedWidgetSelection()
    const IndexList       = Array.from(
      {length:selectedWidgets.length}, (_:any,i:number) => i
    )
    doOperation(new WAD_WidgetShiftOperation(selectedWidgets, IndexList))
  }

/**** doShiftSelectedWidgetsUp ****/

  function doShiftSelectedWidgetsUp ():void {
    const selectedWidgets = sortedWidgetSelection()
    const StartIndex      = selectedWidgets[0].Index-1
    const IndexList       = Array.from(
      {length:selectedWidgets.length}, (_:any,i:number) => StartIndex+i
    )
    doOperation(new WAD_WidgetShiftOperation(selectedWidgets, IndexList))
  }

/**** doShiftSelectedWidgetsDown ****/

  function doShiftSelectedWidgetsDown ():void {
    const selectedWidgets = sortedWidgetSelection()
    const SelectionCount  = selectedWidgets.length
    const StartIndex      = selectedWidgets[SelectionCount-1].Index+2-SelectionCount
    const IndexList       = Array.from(
      {length:selectedWidgets.length}, (_:any,i:number) => StartIndex+i
    )
    doOperation(new WAD_WidgetShiftOperation(selectedWidgets, IndexList))
  }

/**** doShiftSelectedWidgetsToBottom ****/

  function doShiftSelectedWidgetsToBottom ():void {
    const selectedWidgets = sortedWidgetSelection()
    const SelectionCount  = selectedWidgets.length
    const StartIndex      = DesignerState.Applet.visitedPage.WidgetCount+2-SelectionCount
    const IndexList       = Array.from(
      {length:selectedWidgets.length}, (_:any,i:number) => StartIndex+i
    )
    doOperation(new WAD_WidgetShiftOperation(selectedWidgets, IndexList))
  }

/**** doDeleteSelectedWidgets ****/

  function doDeleteSelectedWidgets ():void {
    const selectedWidgets = DesignerState.selectedWidgets
    if (selectedWidgets.length === 0) { return }

    doOperation(new WAD_WidgetDeletionOperation(selectedWidgets))
  }

/**** doCutSelectedWidgets ****/

  function doCutSelectedWidgets ():void {
    const selectedWidgets = sortedWidgetSelection()
    if (selectedWidgets.length === 0) { return }

    DesignerState.shelvedWidgets = selectedWidgets.map(
      (Widget:WAT_Widget) => Widget.Serialization
    )
    doDeleteSelectedWidgets()
//  WAT_rerender()
  }

/**** doCopySelectedWidgets ****/

  function doCopySelectedWidgets ():void {
    const selectedWidgets = sortedWidgetSelection()
    if (selectedWidgets.length === 0) { return }

    DesignerState.shelvedWidgets = selectedWidgets.map(
      (Widget:WAT_Widget) => Widget.Serialization
    )
    WAT_rerender()
  }

/**** doPasteShelvedWidgets ****/

  function doPasteShelvedWidgets ():void {
    if (DesignerState.shelvedWidgets.length === 0) { return }

    const visitedPage = DesignerState.Applet.visitedPage

    doOperation(new WAD_WidgetDeserializationOperation(
      DesignerState.shelvedWidgets, visitedPage,0
    ))
  }

/**** doImportFromFile ****/

  function doImportFromFile (Event:Indexable):void {
    Event.stopPropagation()
    Event.preventDefault()

    let File = Event.target.files[0]
    if (File == null) { return }

    let Reader = new FileReader()
      Reader.addEventListener('load', (Event:any) => handleFileLoaded(File,Event), false)
    Reader.readAsArrayBuffer(File)
  }

  function handleFileLoaded (File:Indexable, Event:Indexable):void {
    Event.stopPropagation()
    Event.preventDefault()

    try {
      doImport((new TextDecoder()).decode(Event.target.result),File.type)
    } catch (Signal:any) {
      window.alert('File Read Error\n\n' + Signal)
    }
  }

/**** doImport ****/

  function doImport (FileContent:string, Type:string):void {
    switch (Type) {
      case 'application/javascript':
        if (
          (DesignerState.Applet.pendingScript != null) &&
          OperationWasConfirmed(
            'Applet Script Import\n\n' +
            'You are about to overwrite the script of this applet'
          )
        ) {
          doConfigureApplet('pendingScript',FileContent)
          DesignerState.ScriptEditor.Scope = 'Applet'
          openDialog('ScriptEditor')                  // ...or bring it to front
        }
        return
      case 'application/json':
        break
      default:
        window.alert('JSON or JavaScript file expected')
        return
    }

    let Serialization
    try {
      Serialization = JSON.parse(FileContent)
    } catch (Signal) {
console.error(Signal)
      window.alert('file does not contain valid JSON')
      return
    }

    let { Applet } = DesignerState
    let visitedPage = Applet.visitedPage

    if (looksLikePage(Serialization)) {
      doOperation(new WAD_PageDeserializationOperation(
        [Serialization], visitedPage == null ? 0 : visitedPage.Index+1
      ))                                    // also selects and visits this page
      return
    }

    if (looksLikePageList(Serialization)) {
      doOperation(new WAD_PageDeserializationOperation(
        Serialization, visitedPage == null ? 0 : visitedPage.Index+1
      ))                     // also selects these pages and visits the last one
      return
    }

    if (looksLikeWidget(Serialization)) {
      if (visitedPage == null) {      // create a page to insert the widget into
        doOperation(new WAD_PageDeserializationOperation(
          [{WidgetList:[]}], Applet.PageCount
        ))                                           // also visits the new page
        visitedPage = Applet.visitedPage
      }

      doOperation(new WAD_WidgetDeserializationOperation(
        [Serialization], visitedPage,0
      ))                                             // also selects this widget
      return
    }

    if (looksLikeWidgetList(Serialization)) {
      if (visitedPage == null) {      // create a page to insert the widget into
        doOperation(new WAD_PageDeserializationOperation(
          [{WidgetList:[]}], Applet.PageCount
        ))                                           // also visits the new page
        visitedPage = Applet.visitedPage
      }

      doOperation(new WAD_WidgetDeserializationOperation(
        Serialization, visitedPage,0
      ))                                           // also selects these widgets
      return
    }

    if (looksLikeApplet(Serialization)) {
      if (OperationWasConfirmed(
        'Applet Import\n\n' +
        'You are about to replace the complete applet (and only keep its name)'
      )) {
        DesignerState.selectedPages = []
        selectWidgets([])

        Object.assign(DesignerState, {
          selectedPages:  [],
          selectedWidgets:[],
          OperationHistory:[],
          OperationIndex:  0,
          VisitHistory:[],
          VisitIndex:  -1,
        })

        DesignerState.Applet.replaceWith(Serialization)

        setTimeout(() => {
          window.alert(
            'Applet was imported\n\n' +
            'The import will be persisted with the next change you make'
          )
        },100)
      }
      return
    }

    window.alert('file does not contain valid WAT serializations')
  }

/**** doExport ****/

  function doExport (Scope:string):void {
    const Applet = DesignerState.Applet

    let Serialization:Serializable, suggestedFileName:string
    switch (Scope) {
      case 'Applet':
        Serialization     = Applet.Serialization
        suggestedFileName = (Applet.Name || 'WAT-Applet') + '.json'
        break
      case 'active Page':
        Serialization     = Applet.visitedPage.Serialization
        suggestedFileName = (Applet.visitedPage.Name || 'WAT-Page') + '.json'
        break
      case 'selected Pages':
        const Pages = sortedPageSelection()
// @ts-ignore TS2322 allow assignment
        Serialization     = Pages.map((Page:WAT_Page) => Page.Serialization)
        suggestedFileName = (Pages[0]?.Name || 'WAT-Page') + '.json'
        break
      case 'selected Widgets':
        const Widgets = DesignerState.selectedWidgets
        Serialization     = Widgets.map((Widget:WAT_Widget) => Widget.Serialization)
        suggestedFileName = (Widgets[0]?.Name || 'WAT-Widgets') + '.json'
        break
      case 'Applet Design':
        Serialization = Applet.Serialization
          delete Serialization.activeScript
          delete Serialization.pendingScript
        suggestedFileName = (DesignerState.Applet.Name || 'WAT-Applet') + '.json'
        break
      case 'Applet Script':
        Serialization     = Applet.activeScript || ''
        suggestedFileName = (Applet.Name || 'WAT-Applet') + '.js'
        break
      default:
        console.error('InvalidArgument: invalid download scope ' + quoted(Scope))
        return
    }

    const SerializationString = (
      Scope === 'Applet Script'
      ? Serialization
      : JSON.stringify(Serialization)
    )

    const encodedJSON = (new TextEncoder()).encode(SerializationString as string)
    const decodedJSON = (new TextDecoder()).decode(encodedJSON)
    if (SerializationString === decodedJSON) {
      download(encodedJSON, suggestedFileName, 'text/html;charset=utf-8')
    } else {
      window.alert('this export is not stable')
    }
  }

/**** doVisitPrev/NextPage ****/

  function doVisitPrevPage ():void { visitPrevPage() }
  function doVisitNextPage ():void { visitNextPage() }

/**** doVisitHomePage ****/

  function doVisitHomePage ():void { visitPage(0) }

/**** doCreateScreenshot ****/

  function doCreateScreenshot ():void {
    const { Applet }       = DesignerState
    const { Width,Height } = Applet

    const Canvas  = document.createElement('canvas')
      Canvas.width  = Width
      Canvas.height = Height
    const Context = Canvas.getContext('2d')
    const AppletViewElement = Applet.View
      let { left:x,top:y } = AppletViewElement.getBoundingClientRect()
      x += window.scrollX
      y += window.scrollY

    DesignerState.DesignerDisabled = true; WAT_rerender()
    window.requestAnimationFrame(async () => {
      try {
        const Stream = await navigator.mediaDevices.getDisplayMedia({
// @ts-ignore TS2353 allow "preferCurrentTab"
          video:true, preferCurrentTab:true
        })
        const Video = document.createElement('video')
          Video.srcObject = Stream
        await Video.play()

// @ts-ignore TS18047 "Context" is not null
        Context.drawImage(Video, x,y, Width,Height, 0,0, Width,Height)

        Stream.getTracks().forEach((Track:any) => Track.stop())
        DesignerState.DesignerDisabled = false; WAT_rerender()

        const Name = Applet.visitedBoard?.Name || Applet.Name || 'WAT-Applet'

        Canvas.toBlob((Blob:any) => {
          download(Blob, Name + '.png', 'image/png')
        }, 'image/png')
      } catch (Signal:any) {
        console.error('Error while creating screenshot', Signal)
        DesignerState.DesignerDisabled = false; WAT_rerender()
        window.alert('Screenshot Error\n\n' + Signal)
      }
    })
  }

/**** doGenerateApplet ****/

  function doGenerateApplet (Variant:string):void {
    switch (Variant) {
      case 'without Designer': generateStandaloneWebApp(false); break
      case 'with Designer':    generateStandaloneWebApp(true); break
      default: console.error('InvalidArgument: invalid generation variant ' + quoted(Variant))
    }
   }

/**** doPrintApplet ****/

  function doPrintApplet ():void {
    const { Applet } = DesignerState

    DesignerState.DesignerDisabled = true; WAT_rerender()
    window.requestAnimationFrame(async () => {
      try {
        const PrinterFrame = document.createElement('iframe')
          PrinterFrame.style.position = 'absolute'
          PrinterFrame.style.top      = '-1000000px'
        document.body.appendChild(PrinterFrame)

        const PrinterDoc = (PrinterFrame.contentWindow as Window).document
          PrinterDoc.write('<html><head></head><body>')
          PrinterDoc.write(Applet.View.innerHTML)
          PrinterDoc.write('</body></html>')
        PrinterDoc.close()

        ;(PrinterFrame.contentWindow as Window).focus()
        ;(PrinterFrame.contentWindow as Window).print()

        window.addEventListener('afterprint', function ():void {
          document.body.removeChild(PrinterFrame)
          DesignerState.DesignerDisabled = false; WAT_rerender()
        }, { once:true })
      } catch (Signal:any) {
        console.error('Error while printing', Signal)
        DesignerState.DesignerDisabled = false; WAT_rerender()
        window.alert('Print Error\n\n' + Signal)
      }
    })
  }/**** selectedPagesMayBeShiftedUp ****/

  function selectedPagesMayBeShiftedUp ():boolean {
    const selectedPages = sortedPageSelection()
    return selectedPages.some((Page:WAT_Page,i:number) => Page.Index > i)
  }

/**** selectedPagesMayBeShiftedDown ****/

  function selectedPagesMayBeShiftedDown ():boolean {
    const selectedPages = sortedPageSelection()
    const StartIndex    = DesignerState.Applet.PageCount-selectedPages.length
    return selectedPages.some((Page:WAT_Page,i:number) => Page.Index < StartIndex+i)
  }

/**** selectedWidgetsMayBeShiftedUp ****/

  function selectedWidgetsMayBeShiftedUp ():boolean {
    const selectedWidgets = sortedWidgetSelection()
    return selectedWidgets.some((Widget:WAT_Widget,i:number) => Widget.Index > i)
  }

/**** selectedWidgetsMayBeShiftedDown ****/

  function selectedWidgetsMayBeShiftedDown ():boolean {
    const selectedWidgets = sortedWidgetSelection()
    const StartIndex      = DesignerState.Applet.visitedPage.WidgetCount-selectedWidgets.length
    return selectedWidgets.some((Widget:WAT_Widget,i:number) => Widget.Index < StartIndex+i)
  }

//----------------------------------------------------------------------------//
//                               Applet Resizer                               //
//----------------------------------------------------------------------------//

  Object.assign(DesignerState, {
    AppletResizer: {
      Width:undefined,    Height:undefined,
      minWidth:undefined, minHeight:undefined,
      maxWidth:undefined, maxHeight:undefined,
      keepGeometries:true,
      PaddingX:undefined, PaddingY:undefined,
    },
  })
console.log('DesignerState',DesignerState)

/**** resizeApplet ****/

  function resizeApplet ():void {
    const Applet = DesignerState.Applet

    let {
      Width,Height, minWidth,minHeight, maxWidth,maxHeight,
      keepGeometries
    } = DesignerState.AppletResizer

    if ((Width  || 0) === 0) { Width  = Applet.Width }
    if ((Height || 0) === 0) { Height = Applet.Height }

    if ((minWidth  || 0) === 0) { minWidth  = Applet.minWidth }
    if ((minHeight || 0) === 0) { minHeight = Applet.minHeight }

    if ((maxWidth  || 0) === 0) { maxWidth  = Applet.maxWidth }
    if ((maxHeight || 0) === 0) { maxHeight = Applet.maxHeight }

    Width  = Math.max(minWidth,  Math.min(Width,  maxWidth  == null ? Infinity : maxWidth))
    Height = Math.max(minHeight, Math.min(Height, maxHeight == null ? Infinity : maxHeight))

    resizeAppletTo (
      Applet,
      Width,Height, minWidth,minHeight, maxWidth,maxHeight,
      keepGeometries
    )
  }

/**** shrinkApplet ****/

  function shrinkApplet ():void {
    const Applet = DesignerState.Applet

    let minX:number = Infinity, maxX:number = 0
    let minY:number = Infinity, maxY:number = 0
      Applet.PageList.forEach((Page:WAT_Page) => {
        Page.WidgetList.forEach((Widget:WAT_Widget) => {
          const { x,y, Width,Height } = Widget.Geometry
          minX = Math.min(minX, x)
          minY = Math.min(minY, y)
          maxX = Math.max(maxX, x+Width)
          maxY = Math.max(maxY, y+Height)
        })
      })
    if (minX === Infinity) { return }                          // no widgets yet

    let { PaddingX,PaddingY } = DesignerState.AppletResizer
    if ((PaddingX == null) || (PaddingX < 0)) { PaddingX = minX }
    if ((PaddingY == null) || (PaddingY < 0)) { PaddingY = minY }

    maxX += PaddingX
    maxY += PaddingY

    resizeAppletTo (
      Applet,
      maxX,maxY, maxX,maxY, undefined,undefined,
      true
    )
  }

/**** resizeAppletTo ****/

  function resizeAppletTo (
    Applet:WAT_Applet, Width:number,Height:number,
    minWidth:number|undefined, minHeight:number|undefined,
    maxWidth:number|undefined, maxHeight:number|undefined,
    keepGeometries:boolean
  ):void {
    if (keepGeometries) {
      const WidgetGeometrySet:Indexable = {}
        Applet.PageList.forEach((Page:WAT_Page) => {
          Page.WidgetList.forEach((Widget:WAT_Widget) => {
            WidgetGeometrySet[IdOfWidget(Widget)] = Widget.Geometry
          })
        })

        _resizeApplet()

        Applet.PageList.forEach((Page:WAT_Page) => {
          Page.WidgetList.forEach((Widget:WAT_Widget) => {
            Widget.Geometry = WidgetGeometrySet[IdOfWidget(Widget)]
          })
        })
    } else {
      _resizeApplet()
    }

    Applet.preserve()

    function _resizeApplet ():void {
      Applet._Width  = Width
      Applet._Height = Height

      Applet._minWidth = minWidth;  Applet._minHeight = minHeight
      Applet._maxWidth = maxWidth;  Applet._maxHeight = maxHeight

      if (Applet.withMobileFrame) {
        Width += 10; Height += 10
        if (minWidth  != null) { minWidth  += 10 }
        if (minHeight != null) { minHeight += 10 }
        if (maxWidth  != null) { maxWidth  += 10 }
        if (maxHeight != null) { maxHeight += 10 }
      }

      const HostElement = Applet.View?.parentElement?.parentElement as HTMLElement
        HostElement.style.width  = Width  + 'px'
        HostElement.style.height = Height + 'px'

        HostElement.style.minWidth  = (minWidth  == null ? 'none' : minWidth  + 'px')
        HostElement.style.minHeight = (minHeight == null ? 'none' : minHeight + 'px')

        HostElement.style.maxWidth  = (maxWidth  == null ? 'none' : maxWidth  + 'px')
        HostElement.style.maxHeight = (maxHeight == null ? 'none' : maxHeight + 'px')

        if (Applet.withMobileFrame) {
          HostElement.classList.add('withMobileFrame')
        } else {
          HostElement.classList.remove('withMobileFrame')
        }
      WAT_rerender()
    }
  }//------------------------------------------------------------------------------
//--                            WAD_DesignerLayer                             --
//------------------------------------------------------------------------------

  function WAD_DesignerLayer (PropSet:Indexable):any {
    if (DesignerState.DesignerDisabled) { return }

  /**** if need be: initialize VisitHistory ****/

    const Applet = DesignerState.Applet = PropSet.Applet as WAT_Applet
    if (! Applet.isAttached) { return }

    if (DesignerState.VisitHistory.length === 0) {
      visitPage(Applet.visitedPage)
    }

  /**** if necessary: position DesignerButton ****/

    const { isOpen, DesignerButton } = DesignerState

    if (isNaN(DesignerButton.x) || isNaN(DesignerButton.y)) {
      DesignerButton.x = Applet.Width-40
      DesignerButton.y = 8
    }

  /**** validate selectedPages/Widgets and VisitHistory ****/

    const { selectedPages } = DesignerState
    DesignerState.selectedPages = selectedPages.filter(
      (Page:WAT_Page) => Page.Applet === Applet
    )

    const visitedPage = Applet.visitedPage
    DesignerState.selectedWidgets = sortedWidgetSelection().filter(
      (Widget:WAT_Widget) => (Widget.Page === visitedPage)
    )

    validateVisitHistory()

  /**** actual rendering ****/

    return html`<div class="WAD DesignerLayer">
      ${! isOpen && html`<${WAD_DesignerButton}/>`}
      ${  isOpen && DesignerState.isLayouting && html`<${WAD_LayouterLayer}/>`}
      ${  isOpen && DialogList.map(
        (DialogName:string) => html`<${DesignerState[DialogName].View}/>`
      )}
    </div>`
  }

//------------------------------------------------------------------------------
//--                            WAD_DesignerButton                            --
//------------------------------------------------------------------------------

  function WAD_DesignerButton () {
    const DragInfo = useMemo(() => ({
      StartX:NaN, StartY:NaN, initialX:NaN, initialY:NaN
    }))

    const Dragger = useCallback((
      dx:number,dy:number, StartX:number,StartY:number, Event:PointerEvent
    ) => {
      const DesignerButton = DesignerState.DesignerButton

      if ((DragInfo.StartX != StartX) || (DragInfo.StartY != StartY)) {
        DragInfo.StartX = StartX; DragInfo.initialX = DesignerButton.x-dx
        DragInfo.StartY = StartY; DragInfo.initialY = DesignerButton.y-dy
      }                                         // starts a new dragging process

      DesignerButton.isDragging = (           // for a proper pointer image only
        (Event.type === 'pointerdown') || (Event.type === 'pointermove')
      )

      DesignerButton.x = DragInfo.initialX+dx
      DesignerButton.y = DragInfo.initialY+dy
      WAT_rerender()
    },[])

    const Recognizer = useCallback(GestureRecognizer({
      ClickRadius:4, MultiClickLimit:1,
      onClick:openDesigner,
      onDragStart:Dragger,  onDragContinuation:Dragger,
      onDragFinish:Dragger, onDragAbortion:Dragger,
    }), [])

    const { x,y, isDragging } = DesignerState.DesignerButton

  /**** repositioning on viewport ****/

    const { x:AppletX, y:AppletY } = DesignerState.Applet.Geometry
    let { left,top } = fromDocumentTo('viewport',{
      left:x + AppletX, top:y + AppletY
    })
    left = Math.max(0,Math.min(left,document.documentElement.clientWidth-32))
    top  = Math.max(0,Math.min(top,document.documentElement.clientHeight-32))

  /**** actual rendering ****/

    return html`<div class="WAD DesignerButton" style="
      left:${left}px; top:${top}px;
      cursor:${isDragging ? 'grabbing' : 'grab'}
    " onPointerDown=${Recognizer} onPointerMove=${Recognizer}
      onPointerUp=${Recognizer} onPointerCancel=${Recognizer}
    ><img src="${IconFolder}/pen.png"/></>`
  }

//------------------------------------------------------------------------------
//--                               WAD_Toolbox                                --
//------------------------------------------------------------------------------

  function WAD_Toolbox () {
    const {
      Applet, isLayouting, selectedWidgets, shelvedWidgets
    } = DesignerState

    const toggleLayouting = useCallback(() => {
      DesignerState.isLayouting = ! DesignerState.isLayouting
      WAT_rerender()
    })

    return html`<${WAD_Dialog} Name="Toolbox" onClose=${closeDesigner}>
      <div style="
        display:flex; flex-flow:row wrap; padding:2px; gap:2px;
      ">
        <${WAD_Icon} Icon="${IconFolder}/draw-square.png"
          active=${isLayouting}
          onClick=${toggleLayouting}
        />
        <${WAD_PseudoDropDown} Icon="${IconFolder}/plus.png"
          enabled=${Applet.visitedPage != null} Value="" Placeholder="(please select)"
          OptionList=${[
            '----',
            'plainWidget:plain Widget', 'Outline:Widget Outline',
            '----',
            'Title', 'Subtitle', 'Label', 'Text', 'Fineprint',
            '----',
            'HTMLView:HTML View', 'MarkdownView:Markdown View',
            'ImageView:Image View', 'SVGView:SVG View',
            'WebView:Web View',
            'Badge', 'Icon',
            'horizontalSeparator:horizontal Separator',
            'verticalSeparator:vertical Separator',
            '----',
            'Button', 'Checkbox', 'Radiobutton',
            '----',
            'Gauge','Slider','Progressbar',
            '----',
            'TextlineInput:Textline Input', 'PasswordInput:Password Input',
            'NumberInput:Number Input', 'PhoneNumberInput:Phone Number Input',
            'EMailAddressInput:EMail Address Input', 'URLInput:URL Input',
            'SearchInput:Search Input', 'TextInput:Text Input',
            'ColorInput:Color Input',
            '----',
            'DropDown','PseudoDropDown:Pseudo DropDown',
            '----',
            'TimeInput:Time Input','DateTimeInput:Date and Time Input',
            'DateInput:Date Input','WeekInput:Week Input','MonthInput:Month Input',
            '----',
            'FileInput:File Input', 'PseudoFileInput:pseudo File Input',
            'FileDropArea:File Drop Area',
            '----',
            'TextTab:Text Tab', 'IconTab:Icon Tab', '-TabStrip',
            'WidgetPane:Widget Pane',
            '-Accordion','-AccordionFold:Accordion Fold',
            'FlatListView:flat List View','-NestedListView:nested List View',
            '-NoteSticker'
          ]}
          onInput=${(Event:Indexable) => {
            doCreateWidget(Event.target.value)
            Event.target.value = ''
          }}
        />
        <${WAD_Icon} Icon="${IconFolder}/pen-ruler.png"
          active=${DialogIsOpen('Inspector')}
          onClick=${(Event:PointerEvent) => toggleDialog('Inspector',Event)}
        />
        <${WAD_Icon} Icon="${IconFolder}/square-code.png"
          active=${DialogIsOpen('ScriptEditor')}
          onClick=${(Event:PointerEvent) => toggleDialog('ScriptEditor',Event)}
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
            'Applet','active Page','selected Pages','selected Widgets',
            '----','Applet Design','Applet Script'
          ]}
          onInput=${(Event:Indexable) => {
            doExport(Event.target.value)
            Event.target.value = ''
          }}
        />

        <${WAD_Icon} Icon="${IconFolder}/chevron-left.png"
          enabled=${mayVisitPrevPage()} onClick=${doVisitPrevPage}
        />
        <${WAD_Icon} Icon="${IconFolder}/chevron-right.png"
          enabled=${mayVisitNextPage()} onClick=${doVisitNextPage}
        />
        <${WAD_Icon} Icon="${IconFolder}/house-line.png"
          enabled=${(Applet.PageCount > 0) && (Applet.visitedPage !== Applet.Page(0))}
          onClick=${doVisitHomePage}
        />
        <${WAD_Icon} />

        <${WAD_Icon} Icon="${IconFolder}/terminal.png" enabled=${false}/>
        <${WAD_Icon} Icon="${IconFolder}/clapperboard.png"
          onClick=${doCreateScreenshot}
        />
        <${WAD_PseudoDropDown} Icon="${IconFolder}/clapperboard-play.png"
          Placeholder="(please choose)" Value=""
          OptionList=${['without Designer','with Designer']}
          onInput=${(Event:Indexable) => {
            doGenerateApplet(Event.target.value)
            Event.target.value = ''
          }}
        />
        <${WAD_Icon} Icon="${IconFolder}/printer.png" onClick=${doPrintApplet} />
      </>
    </>`
  }
  DesignerState.Toolbox.View = WAD_Toolbox

  DialogList.push('Toolbox')     // "Toolbox" is always part of the "DialogList"

//------------------------------------------------------------------------------
//--                              WAD_Inspector                               --
//------------------------------------------------------------------------------

  function WAD_Inspector () {
    const onClose = useCallback(() => closeDialog('Inspector'))

    const [ activeTab,activateTab ] = useState('AppletConfiguration')

    return html`<${WAD_Dialog} Name="Inspector" resizable=${true}
      onClose=${onClose}
    >
     <${WAD_vertically} style="width:100%; height:100%; padding:4px">
      <${WAD_horizontally}>
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
        ${(activeTab === 'AppletConfiguration') && html`<${WAD_Label}>Applet Configuration</>`}
        ${(activeTab === 'PageBrowser')         && html`<${WAD_Label}>Page Browser</>`}
        ${(activeTab === 'PageConfiguration')   && html`<${WAD_Label}>Page Configuration</>`}
        ${(activeTab === 'WidgetBrowser')       && html`<${WAD_Label}>Widget Browser</>`}
        ${(activeTab === 'WidgetConfiguration') && html`<${WAD_Label}>Widget Configuration</>`}
      </>

      ${(activeTab === 'AppletConfiguration') && html`<${WAD_AppletConfigurationPane}/>`}
      ${(activeTab === 'PageBrowser')         && html`<${WAD_PageBrowserPane}/>`}
      ${(activeTab === 'PageConfiguration')   && html`<${WAD_PageConfigurationPane}/>`}
      ${(activeTab === 'WidgetBrowser')       && html`<${WAD_WidgetBrowserPane}/>`}
      ${(activeTab === 'WidgetConfiguration') && html`<${WAD_WidgetConfigurationPane}/>`}
     </>
    </>`
  }
  DesignerState.Inspector.View = WAD_Inspector

/**** WAD_AppletConfigurationPane ****/

  function WAD_AppletConfigurationPane () {
    const { Applet,Inspector,AppletResizer } = DesignerState

  /**** remember fold expansions ****/

    const Expansions = Inspector.Expansions.AppletConfiguration
    function toggleExpansion (Name:string):void {
      Expansions[Name] = ! Expansions[Name]
      WAT_rerender()
    }

  /**** remember scroll position ****/

    const ScrollPosition = Inspector.ScrollPositions.AppletConfiguration
    function updateScrollPosition (Event:Indexable) {
      Inspector.ScrollPositions.AppletConfiguration = Event.target.scrollTop
    }

    const scrollablePane = useRef(null)
    useEffect(() => scrollablePane.current.base.scrollTop = ScrollPosition,[])

  /**** handle script input ****/

    const { activeScript,pendingScript, ErrorReport,ScriptError } = Applet

    const ScriptIsPending = ValueIsText(pendingScript) && (pendingScript !== activeScript)
    const ReportToShow    = ScriptError || ErrorReport
      DesignerState.Inspector.ReportToShow = ReportToShow // *C* workaround

    const setPendingScriptTo = useCallback((newScript:WAT_Text) => {
      doConfigureApplet('pendingScript',newScript)
    },[])

    const applyPendingScript = useCallback(() => doApplyAppletScript(),[])

  /**** actual rendering ****/

    return html`<div class="WAD InspectorPane">
     <${WAD_vertically} style="width:100%; height:100%; padding:4px">
      <${WAD_horizontally}>
        <${WAD_Label} style="width:56px">Applet</>
        <${WAD_TextlineInput} Placeholder="(applet name)" style="flex:1 0 auto"
          readonly Value=${Applet.Name}
        />
      </>

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
              onInput=${(Event:Indexable) => doConfigureApplet('Opacity',parseFloat(Event.target.value))}
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
              onInput=${(Event:Indexable) => doConfigureApplet('toBeCentered',Event.target.checked)}
            />
          </>

          <${WAD_horizontally}>
            <${WAD_Label}>draw Frame in large Viewports</>
            <${WAD_Gap}/>
            <${WAD_Checkbox}
              Value=${Applet.withMobileFrame}
              onInput=${(Event:Indexable) => doConfigureApplet('toBeCentered',Event.target.checked)}
            />
          </>

          <${WAD_horizontally}>
            <${WAD_Label}>expected mobile Orientation</>
            <${WAD_Gap}/>
            <${WAD_DropDown}
              Value=${Applet.expectedOrientation}
              onInput=${(Event:Indexable) => doConfigureApplet('expectedOrientation',Event.target.checked)}
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
              onInput=${(Event:Indexable) => AppletResizer.Width = parseFloat(Event.target.value)}
            />
              <div style="width:20px; padding-top:4px; text-align:center">x</div>
            <${WAD_IntegerInput} style="width:60px"
              Value=${AppletResizer.Height}
              Minimum=${0}
              onInput=${(Event:Indexable) => AppletResizer.Height = parseFloat(Event.target.value)}
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
              onInput=${(Event:Indexable) => AppletResizer.minWidth = parseFloat(Event.target.value)}
            />
              <div style="width:20px; padding-top:4px; text-align:center">x</div>
            <${WAD_IntegerInput} style="width:60px"
              Value=${AppletResizer.minHeight}
              Minimum=${0}
              onInput=${(Event:Indexable) => AppletResizer.minHeight = parseFloat(Event.target.value)}
            />
          </>
          <${WAD_horizontally}>
            <${WAD_Label} style="padding-left:10px">max. Size (w,h) [px]</>
            <${WAD_Gap}/>
            <${WAD_IntegerInput} style="width:60px"
              Value=${AppletResizer.maxWidth}
              Minimum=${0}
              onInput=${(Event:Indexable) => AppletResizer.maxWidth = parseFloat(Event.target.value)}
            />
              <div style="width:20px; padding-top:4px; text-align:center">x</div>
            <${WAD_IntegerInput} style="width:60px"
              Value=${AppletResizer.maxHeight}
              Minimum=${0}
              onInput=${(Event:Indexable) => AppletResizer.maxHeight = parseFloat(Event.target.value)}
            />
          </>

          <${WAD_horizontally}>
            <${WAD_Button} style="width:100px" onClick=${resizeApplet}>Update</>
              <div style="width:10px"/>
            <${WAD_Label}>keeping Widget Geometries</>
            <${WAD_Checkbox}
              Value=${AppletResizer.keepGeometries}
              onInput=${(Event:Indexable) => AppletResizer.keepGeometries = Event.target.checked}
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
              onInput=${(Event:Indexable) => AppletResizer.PaddingX = parseFloat(Event.target.value)}
            />
              <div style="width:20px; padding-top:4px; text-align:center">x</div>
            <${WAD_IntegerInput} style="width:60px"
              Value=${AppletResizer.PaddingY}
              Minimum=${0}
              onInput=${(Event:Indexable) => AppletResizer.PaddingY = parseFloat(Event.target.value)}
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
              onInput=${(Event:Indexable) => doConfigureApplet('FontFamily',Event.target.value)}
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
              onInput=${(Event:Indexable) => doConfigureApplet('FontSize',parseFloat(Event.target.value))}
            />
          </>
          <${WAD_horizontally}>
            <${WAD_Label} style="padding-left:10px">Weight</>
            <${WAD_Gap}/>
            <${WAD_DropDown}
              Value=${Applet.FontWeight} Options=${WAT_FontWeights}
              onInput=${(Event:Indexable) => doConfigureApplet('FontWeight',Event.target.value)}
            />
          </>
          <${WAD_horizontally}>
            <${WAD_Label} style="padding-left:10px">Style</>
            <${WAD_Gap}/>
            <${WAD_DropDown}
              Value=${Applet.FontStyle} Options=${WAT_FontStyles}
              onInput=${(Event:Indexable) => doConfigureApplet('FontStyle',Event.target.value)}
            />
          </>
          <${WAD_horizontally}>
            <${WAD_Label} style="padding-left:10px">Color</>
            <${WAD_Gap}/>
            <${WAD_ColorInput}
              Value=${Applet.Color}
              onInput=${(Event:Indexable) => doConfigureApplet('Color',Event.target.value)}
            />
          </>

          <${WAD_horizontally}>
            <${WAD_Label}>Text Shadow</>
            <${WAD_Gap}/>
            <${WAD_Checkbox}
              Value=${Applet.TextShadow?.isActive === true}
              onInput=${(Event:Indexable) => {
                const { isActive, xOffset,yOffset, BlurRadius, Color } = (
                  Applet.TextShadow || { isActive:false, xOffset:0,yOffset:0, BlurRadius:5, Color:'black' }
                )
                doConfigureApplet('TextShadow',{
                  isActive:Event.target.checked, xOffset,yOffset, BlurRadius, Color
                })
              }}
            />
          </>
          <${WAD_horizontally}>
            <${WAD_Label} style="padding-left:10px">Color</>
            <${WAD_Gap}/>
            <${WAD_ColorInput}
              Value=${Applet.TextShadow?.Color}
              onInput=${(Event:Indexable) => {
                const { isActive, xOffset,yOffset, BlurRadius, Color } = (
                  Applet.TextShadow || { isActive:false, xOffset:0,yOffset:0, BlurRadius:5, Color:'black' }
                )
                doConfigureApplet('TextShadow',{
                  isActive, xOffset,yOffset, BlurRadius, Color:Event.target.value
                })
              }}
            />
          </>
          <${WAD_horizontally}>
            <${WAD_Label} style="padding-left:10px">Offset (dx,dy) [px]</>
            <${WAD_Gap}/>
            <${WAD_IntegerInput} readonly style="width:60px"
              Value=${Applet.TextShadow?.xOffset}
              onInput=${(Event:Indexable) => {
                const { isActive, xOffset,yOffset, BlurRadius, Color } = (
                  Applet.TextShadow || { isActive:false, xOffset:0,yOffset:0, BlurRadius:5, Color:'black' }
                )
                doConfigureApplet('TextShadow',{
                  isActive, xOffset:parseFloat(Event.target.value),yOffset, BlurRadius, Color
                })
              }}
            />
              <div style="width:20px; padding-top:4px; text-align:center">,</div>
            <${WAD_IntegerInput} readonly style="width:60px"
              Value=${Applet.TextShadow?.yOffset}
              onInput=${(Event:Indexable) => {
                const { isActive, xOffset,yOffset, BlurRadius, Color } = (
                  Applet.TextShadow || { isActive:false, xOffset:0,yOffset:0, BlurRadius:5, Color:'black' }
                )
                doConfigureApplet('TextShadow',{
                  isActive, xOffset,yOffset:parseFloat(Event.target.value), BlurRadius, Color
                })
              }}
            />
          </>
          <${WAD_horizontally}>
            <${WAD_Label} style="padding-left:10px">Blur Radius [px]</>
            <${WAD_Gap}/>
            <${WAD_IntegerInput} readonly style="width:60px"
              Value=${Applet.TextShadow?.BlurRadius}
              onInput=${(Event:Indexable) => {
                const { isActive, xOffset,yOffset, BlurRadius, Color } = (
                  Applet.TextShadow || { isActive:false, xOffset:0,yOffset:0, BlurRadius:5, Color:'black' }
                )
                doConfigureApplet('TextShadow',{
                  isActive, xOffset,yOffset, BlurRadius:parseFloat(Event.target.value), Color
                })
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
              onInput=${(Event:Indexable) => doConfigureApplet('TextAlignment',Event.target.value)}
            />
          </>
          <${WAD_horizontally}>
            <${WAD_Label} style="padding-left:10px">Line Height [px]</>
            <${WAD_Gap}/>
            <${WAD_IntegerInput} style="width:60px"
              Value=${Applet.LineHeight} Minimum=${0} Maximum=${1000}
              onInput=${(Event:Indexable) => doConfigureApplet('LineHeight',parseFloat(Event.target.value))}
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
              onInput=${(Event:Indexable) => doConfigureApplet('hasBackground',Event.target.checked)}
            />
          </>

          <${WAD_horizontally}>
            <${WAD_Label}>Color</>
            <${WAD_Gap}/>
            <${WAD_ColorInput}
              Value=${Applet.BackgroundColor}
              onInput=${(Event:Indexable) => doConfigureApplet('BackgroundColor',Event.target.value)}
            />
          </>

          <${WAD_horizontally}>
            <${WAD_Label}>Texture</>
            <${WAD_Gap}/>
            <${WAD_Checkbox}
              Value=${Applet.BackgroundTexture?.isActive === true}
              onInput=${(Event:Indexable) => {
                const { isActive, ImageURL, Mode, xOffset,yOffset } = (
                  Applet.BackgroundTexture || { isActive:false, ImageURL:'', Mode:'tile', xOffset:0,yOffset:0 }
                )
                doConfigureApplet('BackgroundTexture',{
                  isActive:Event.target.checked, ImageURL, Mode, xOffset,yOffset
                })
              }}
            />
          </>
          <${WAD_horizontally}>
            <${WAD_Label} style="padding-left:10px">Mode</>
            <${WAD_Gap}/>
            <${WAD_DropDown}
              Value=${Applet.BackgroundTexture?.Mode} Options=${WAT_BackgroundModes}
              onInput=${(Event:Indexable) => {
                const { isActive, ImageURL, Mode, xOffset,yOffset } = (
                  Applet.BackgroundTexture || { isActive:false, ImageURL:'', Mode:'tile', xOffset:0,yOffset:0 }
                )
                doConfigureApplet('BackgroundTexture',{
                  isActive, ImageURL, Mode:Event.target.value, xOffset,yOffset
                })
              }}
            />
          </>
          <${WAD_horizontally}>
            <${WAD_Label} style="padding-left:10px">Image URL</>
            <${WAD_Gap}/>
            <${WAD_URLInput} style="flex:1 0 auto"
              Value=${Applet.BackgroundTexture?.ImageURL}
              onInput=${(Event:Indexable) => {
                const { isActive, ImageURL, Mode, xOffset,yOffset } = (
                  Applet.BackgroundTexture || { isActive:false, ImageURL:'', Mode:'tile', xOffset:0,yOffset:0 }
                )
                doConfigureApplet('BackgroundTexture',{
                  isActive, ImageURL:Event.target.value, Mode, xOffset,yOffset
                })
              }}
            />
          </>
          <${WAD_horizontally}>
            <${WAD_Label} style="padding-left:10px">Offset (dx,dy) [px]</>
            <${WAD_Gap}/>
            <${WAD_IntegerInput} readonly style="width:60px"
              Value=${Applet.BackgroundTexture?.xOffset}
              onInput=${(Event:Indexable) => {
                const { isActive, ImageURL, Mode, xOffset,yOffset } = (
                  Applet.BackgroundTexture || { isActive:false, ImageURL:'', Mode:'tile', xOffset:0,yOffset:0 }
                )
                doConfigureApplet('BackgroundTexture',{
                  isActive, ImageURL, Mode, xOffset:Event.target.value,yOffset
                })
              }}
            />
              <div style="width:20px; padding-top:4px; text-align:center">,</div>
            <${WAD_IntegerInput} readonly style="width:60px"
              Value=${Applet.BackgroundTexture?.yOffset}
              onInput=${(Event:Indexable) => {
                const { isActive, ImageURL, Mode, xOffset,yOffset } = (
                  Applet.BackgroundTexture || { isActive:false, ImageURL:'', Mode:'tile', xOffset:0,yOffset:0 }
                )
                doConfigureApplet('BackgroundTexture',{
                  isActive, ImageURL, Mode, xOffset,yOffset:parseFloat(Event.target.value)
                })
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
              onInput=${(Event:Indexable) => doConfigureApplet('SnapToGrid',Event.target.checked)}
            />
          </>

          <${WAD_horizontally}>
            <${WAD_Label}>Grid Size (w,h) [px]</>
            <${WAD_Gap}/>
            <${WAD_IntegerInput} style="width:60px"
              Value=${Applet.GridWidth}
              onInput=${(Event:Indexable) => doConfigureApplet('GridWidth',parseFloat(Event.target.value))}
            />
              <div style="width:20px; padding-top:4px; text-align:center">x</div>
            <${WAD_IntegerInput} style="width:60px"
              Value=${Applet.GridHeight}
              onInput=${(Event:Indexable) => doConfigureApplet('GridHeight',parseFloat(Event.target.value))}
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
            onInput=${(Event:Indexable) => doConfigureApplet('HeadExtensions',Event.target.value)}
          />
        </>        <${WAD_Fold} Label="Scripting"
          Expansion=${Expansions.Scripting}
          toggleExpansion=${() => toggleExpansion('Scripting')}
        >
          <${WAD_horizontally}>
            <${WAD_Label}>Script</>
              <div style="width:8px"/>
            <${WAD_Icon} Icon="${IconFolder}/square-code.png"
              active=${DialogIsOpen('ScriptEditor')}
              onClick=${(Event:PointerEvent) => {
                if (! DialogIsOpen('ScriptEditor')) {
                  DesignerState.ScriptEditor.Scope = 'Applet'
                }
                toggleDialog('ScriptEditor',Event)
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
            onInput=${(Event:Indexable) => setPendingScriptTo(Event.target.value)}
          />
        </>
      </>

      <${WAD_horizontally}>
        <${WAD_ErrorView} style="flex:1 1 auto" ErrorReport=${ReportToShow}/>
        <${WAD_Icon} Icon="${IconFolder}/triangle-exclamation.png" style="
          display:${ReportToShow == null ? 'none' : 'block'};
          padding-top:6px;
        " onClick=${() => {
            const { ReportToShow } = DesignerState.Inspector
            window.alert(ReportToShow.Type + '\n\n' + ReportToShow.Message)
          }}
        />
      </>
     </>
    </>`
  }

/**** WAD_PageBrowserPane ****/

  function WAD_PageBrowserPane () {
    const { Applet, selectedPages } = DesignerState

  /**** handle list item rendering and selection ****/

    const PageListItemRenderer = useCallback((Page:WAT_Page, Index:number, selected:boolean) => {
      let Result = '<span style="font-style:italic">(unnamed)</span>'
        const PageName = Page.Name
        if (PageName != null) { Result = HTMLsafe(PageName) }

        if (Applet.visitedPage === Page) {
          Result = `<u style="font-weight:bold">${Result}</u>`
        }
      return Result
    })
    const selectedPageIndices = selectedPages.map((Page:WAT_Page) => Page.Index)

    const updatePageSelection = useCallback((selectedIndices:number[]) => {
      const PageList = Applet.PageList
      DesignerState.selectedPages = selectedIndices.map(
        (Index:number) => PageList[Index]
      )
      WAT_rerender()
    })

  /**** actual rendering ****/

    return html`<div class="WAD InspectorPane">
     <${WAD_vertically} style="width:100%; height:100%; padding:4px">
      <${WAD_horizontally}>
        <${WAD_Label} style="width:56px">Applet</>
        <${WAD_TextlineInput} Placeholder="(applet name)" style="flex:1 0 auto"
          Value=${Applet.Name}
          onInput=${(Event:Indexable) => doConfigureApplet('Name',Event.target.value)}
        />
      </>

      <${WAD_horizontally} style="padding-top:4px; padding-bottom:4px">
        <${WAD_Icon} Icon="${IconFolder}/plus.png" onClick=${doCreatePage} />
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
        onDblClick=${(Event:any,Index:number) => visitPage(Applet.Page(Index))}
      />

      <${WAD_horizontally} style="padding-top:4px">
        <${WAD_Label} style="width:56px">Page</>
        <${WAD_TextlineInput} Placeholder="(page name)" style="flex:1 0 auto"
          enabled=${selectedPages.length > 0}
          Value=${commonValueOf(selectedPages.map((Page:WAT_Page) => Page.Name))}
          onInput=${(Event:Indexable) => doConfigureSelectedPages('Name',Event.target.value)}
        />
      </>
     </>
    </>`
  }

/**** WAD_PageConfigurationPane ****/

  function WAD_PageConfigurationPane () {
    const { Applet,Inspector } = DesignerState

  /**** remember fold expansions ****/

    const Expansions = Inspector.Expansions.PageConfiguration
    function toggleExpansion (Name:string):void {
      Expansions[Name] = ! Expansions[Name]
      WAT_rerender()
    }

  /**** remember scroll position ****/

    const ScrollPosition = Inspector.ScrollPositions.PageConfiguration
    function updateScrollPosition (Event:Indexable) {
      Inspector.ScrollPositions.PageConfiguration = Event.target.scrollTop
    }

    const scrollablePane = useRef(null)
    useEffect(() => scrollablePane.current.base.scrollTop = ScrollPosition,[])

  /**** handle script input ****/

    const { visitedPage }                                         = Applet
    const { activeScript,pendingScript, ErrorReport,ScriptError } = visitedPage

    const ScriptIsPending = ValueIsText(pendingScript) && (pendingScript !== activeScript)
    const ReportToShow    = ScriptError || ErrorReport
      DesignerState.Inspector.ReportToShow = ReportToShow // *C* workaround

    const setPendingScriptTo = useCallback((newScript:WAT_Text) => {
      doConfigureVisitedPage('pendingScript',newScript)
    },[])

    const applyPendingScript = useCallback(() => doApplyVisitedPageScript(),[])

  /**** actual rendering ****/

    return html`<div class="WAD InspectorPane">
     <${WAD_vertically} style="width:100%; height:100%; padding:4px">
      <${WAD_horizontally}>
        <${WAD_Label} style="width:56px">Page</>
        <${WAD_TextlineInput} Placeholder="(page name)" style="flex:1 0 auto"
          enabled=${visitedPage != null}
          Value=${visitedPage?.Name}
          onInput=${(Event:Indexable) => doConfigureVisitedPage('Name',Event.target.value)}
        />
      </>

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
              onInput=${(Event:Indexable) => doConfigureVisitedPage('Opacity',parseFloat(Event.target.value))}
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
              onInput=${(Event:Indexable) => doConfigureVisitedPage('FontFamily',Event.target.value)}
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
              onInput=${(Event:Indexable) => doConfigureVisitedPage('FontSize',parseFloat(Event.target.value))}
            />
          </>
          <${WAD_horizontally}>
            <${WAD_Label} style="padding-left:10px">Weight</>
            <${WAD_Gap}/>
            <${WAD_DropDown}
              Value=${visitedPage.FontWeight} Options=${WAT_FontWeights}
              onInput=${(Event:Indexable) => doConfigureVisitedPage('FontWeight',Event.target.value)}
            />
          </>
          <${WAD_horizontally}>
            <${WAD_Label} style="padding-left:10px">Style</>
            <${WAD_Gap}/>
            <${WAD_DropDown}
              Value=${visitedPage.FontStyle} Options=${WAT_FontStyles}
              onInput=${(Event:Indexable) => doConfigureVisitedPage('FontStyle',Event.target.value)}
            />
          </>
          <${WAD_horizontally}>
            <${WAD_Label} style="padding-left:10px">Color</>
            <${WAD_Gap}/>
            <${WAD_ColorInput}
              Value=${visitedPage.Color}
              onInput=${(Event:Indexable) => doConfigureVisitedPage('Color',Event.target.value)}
            />
          </>

          <${WAD_horizontally}>
            <${WAD_Label}>Text Shadow</>
            <${WAD_Gap}/>
            <${WAD_Checkbox}
              Value=${visitedPage.TextShadow?.isActive === true}
              onInput=${(Event:Indexable) => {
                const { isActive, xOffset,yOffset, BlurRadius, Color } = (
                  visitedPage.TextShadow || { isActive:false, xOffset:0,yOffset:0, BlurRadius:5, Color:'black' }
                )
                doConfigureVisitedPage('TextShadow',{
                  isActive:Event.target.checked, xOffset,yOffset, BlurRadius, Color
                })
              }}
            />
          </>
          <${WAD_horizontally}>
            <${WAD_Label} style="padding-left:10px">Color</>
            <${WAD_Gap}/>
            <${WAD_ColorInput}
              Value=${visitedPage.TextShadow?.Color}
              onInput=${(Event:Indexable) => {
                const { isActive, xOffset,yOffset, BlurRadius, Color } = (
                  visitedPage.TextShadow || { isActive:false, xOffset:0,yOffset:0, BlurRadius:5, Color:'black' }
                )
                doConfigureVisitedPage('TextShadow',{
                  isActive, xOffset,yOffset, BlurRadius, Color:Event.target.value
                })
              }}
            />
          </>
          <${WAD_horizontally}>
            <${WAD_Label} style="padding-left:10px">Offset (dx,dy) [px]</>
            <${WAD_Gap}/>
            <${WAD_IntegerInput} readonly style="width:60px"
              Value=${visitedPage.TextShadow?.xOffset}
              onInput=${(Event:Indexable) => {
                const { isActive, xOffset,yOffset, BlurRadius, Color } = (
                  visitedPage.TextShadow || { isActive:false, xOffset:0,yOffset:0, BlurRadius:5, Color:'black' }
                )
                doConfigureVisitedPage('TextShadow',{
                  isActive, xOffset:parseFloat(Event.target.value),yOffset, BlurRadius, Color
                })
              }}
            />
              <div style="width:20px; padding-top:4px; text-align:center">,</div>
            <${WAD_IntegerInput} readonly style="width:60px"
              Value=${visitedPage.TextShadow?.yOffset}
              onInput=${(Event:Indexable) => {
                const { isActive, xOffset,yOffset, BlurRadius, Color } = (
                  visitedPage.TextShadow || { isActive:false, xOffset:0,yOffset:0, BlurRadius:5, Color:'black' }
                )
                doConfigureVisitedPage('TextShadow',{
                  isActive, xOffset,yOffset:parseFloat(Event.target.value), BlurRadius, Color
                })
              }}
            />
          </>
          <${WAD_horizontally}>
            <${WAD_Label} style="padding-left:10px">Blur Radius [px]</>
            <${WAD_Gap}/>
            <${WAD_IntegerInput} readonly style="width:60px"
              Value=${visitedPage.TextShadow?.BlurRadius}
              onInput=${(Event:Indexable) => {
                const { isActive, xOffset,yOffset, BlurRadius, Color } = (
                  visitedPage.TextShadow || { isActive:false, xOffset:0,yOffset:0, BlurRadius:5, Color:'black' }
                )
                doConfigureVisitedPage('TextShadow',{
                  isActive, xOffset,yOffset, BlurRadius:parseFloat(Event.target.value), Color
                })
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
              onInput=${(Event:Indexable) => doConfigureVisitedPage('TextAlignment',Event.target.value)}
            />
          </>
          <${WAD_horizontally}>
            <${WAD_Label} style="padding-left:10px">Line Height [px]</>
            <${WAD_Gap}/>
            <${WAD_IntegerInput} style="width:60px"
              Value=${visitedPage.LineHeight} Minimum=${0} Maximum=${1000}
              onInput=${(Event:Indexable) => doConfigureVisitedPage('LineHeight',parseFloat(Event.target.value))}
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
              onInput=${(Event:Indexable) => doConfigureVisitedPage('hasBackground',Event.target.checked)}
            />
          </>

          <${WAD_horizontally}>
            <${WAD_Label}>Color</>
            <${WAD_Gap}/>
            <${WAD_ColorInput}
              Value=${visitedPage.BackgroundColor}
              onInput=${(Event:Indexable) => doConfigureVisitedPage('BackgroundColor',Event.target.value)}
            />
          </>

          <${WAD_horizontally}>
            <${WAD_Label}>Texture</>
            <${WAD_Gap}/>
            <${WAD_Checkbox}
              Value=${visitedPage.BackgroundTexture?.isActive === true}
              onInput=${(Event:Indexable) => {
                const { isActive, ImageURL, Mode, xOffset,yOffset } = (
                  visitedPage.BackgroundTexture || { isActive:false, ImageURL:'', Mode:'tile', xOffset:0,yOffset:0 }
                )
                doConfigureVisitedPage('BackgroundTexture',{
                  isActive:Event.target.checked, ImageURL, Mode, xOffset,yOffset
                })
              }}
            />
          </>
          <${WAD_horizontally}>
            <${WAD_Label} style="padding-left:10px">Mode</>
            <${WAD_Gap}/>
            <${WAD_DropDown}
              Value=${visitedPage.BackgroundTexture?.Mode} Options=${WAT_BackgroundModes}
              onInput=${(Event:Indexable) => {
                const { isActive, ImageURL, Mode, xOffset,yOffset } = (
                  visitedPage.BackgroundTexture || { isActive:false, ImageURL:'', Mode:'tile', xOffset:0,yOffset:0 }
                )
                doConfigureVisitedPage('BackgroundTexture',{
                  isActive, ImageURL, Mode:Event.target.value, xOffset,yOffset
                })
              }}
            />
          </>
          <${WAD_horizontally}>
            <${WAD_Label} style="padding-left:10px">Image URL</>
            <${WAD_Gap}/>
            <${WAD_URLInput} style="flex:1 0 auto"
              Value=${visitedPage.BackgroundTexture?.ImageURL}
              onInput=${(Event:Indexable) => {
                const { isActive, ImageURL, Mode, xOffset,yOffset } = (
                  visitedPage.BackgroundTexture || { isActive:false, ImageURL:'', Mode:'tile', xOffset:0,yOffset:0 }
                )
                doConfigureVisitedPage('BackgroundTexture',{
                  isActive, ImageURL:Event.target.value, Mode, xOffset,yOffset
                })
              }}
            />
          </>
          <${WAD_horizontally}>
            <${WAD_Label} style="padding-left:10px">Offset (dx,dy) [px]</>
            <${WAD_Gap}/>
            <${WAD_IntegerInput} readonly style="width:60px"
              Value=${visitedPage.BackgroundTexture?.xOffset}
              onInput=${(Event:Indexable) => {
                const { isActive, ImageURL, Mode, xOffset,yOffset } = (
                  visitedPage.BackgroundTexture || { isActive:false, ImageURL:'', Mode:'tile', xOffset:0,yOffset:0 }
                )
                doConfigureVisitedPage('BackgroundTexture',{
                  isActive, ImageURL, Mode, xOffset:Event.target.value,yOffset
                })
              }}
            />
              <div style="width:20px; padding-top:4px; text-align:center">,</div>
            <${WAD_IntegerInput} readonly style="width:60px"
              Value=${visitedPage.BackgroundTexture?.yOffset}
              onInput=${(Event:Indexable) => {
                const { isActive, ImageURL, Mode, xOffset,yOffset } = (
                  visitedPage.BackgroundTexture || { isActive:false, ImageURL:'', Mode:'tile', xOffset:0,yOffset:0 }
                )
                doConfigureVisitedPage('BackgroundTexture',{
                  isActive, ImageURL, Mode, xOffset,yOffset:parseFloat(Event.target.value)
                })
              }}
            />
          </>
        </>

        <${WAD_Fold} Label="Scripting"
          Expansion=${Expansions.Scripting}
          toggleExpansion=${() => toggleExpansion('Scripting')}
        >
          <${WAD_horizontally}>
            <${WAD_Label}>Script</>
              <div style="width:8px"/>
            <${WAD_Icon} Icon="${IconFolder}/square-code.png"
              active=${DialogIsOpen('ScriptEditor')}
              onClick=${(Event:PointerEvent) => {
                if (! DialogIsOpen('ScriptEditor')) {
                  DesignerState.ScriptEditor.Scope = 'visitedPage'
                }
                toggleDialog('ScriptEditor',Event)
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
            onInput=${(Event:Indexable) => setPendingScriptTo(Event.target.value)}
          />
        </>
      </>

      <${WAD_horizontally}>
        <${WAD_ErrorView} style="flex:1 1 auto" ErrorReport=${ReportToShow}/>
        <${WAD_Icon} Icon="${IconFolder}/triangle-exclamation.png" style="
          display:${ReportToShow == null ? 'none' : 'block'};
          padding-top:6px;
        " onClick=${() => {
            const { ReportToShow } = DesignerState.Inspector
            window.alert(ReportToShow.Type + '\n\n' + ReportToShow.Message)
          }}
        />
      </>
     </>
    </>`
  }

/**** WAD_WidgetBrowserPane ****/

  function WAD_WidgetBrowserPane () {
    const { Applet, selectedWidgets } = DesignerState
    const visitedPage = Applet.visitedPage

  /**** handle list item rendering and selection ****/

    const WidgetListItemRenderer = useCallback((Widget:WAT_Widget, Index:number, selected:boolean) => {
      const WidgetName = Widget.Name
      if (WidgetName == null) {
        return `<span style="font-style:italic">(${Widget.Type})</span>`
      } else {
        return HTMLsafe(WidgetName)
      }
    })
    const selectedWidgetIndices = selectedWidgets.map((Widget:WAT_Widget) => Widget.Index)
    const updateWidgetSelection = useCallback((selectedIndices:number[]) => {
      const WidgetList = visitedPage.WidgetList
      selectWidgets(selectedIndices.map((Index:number) => WidgetList[Index]))
    })

  /**** actual rendering ****/

    return html`<div class="WAD InspectorPane">
     <${WAD_vertically} style="width:100%; height:100%; padding:4px">
      <${WAD_horizontally}>
        <${WAD_Label} style="width:56px">Page</>
        <${WAD_TextlineInput} Placeholder="(page name)" style="flex:1 0 auto"
          enabled=${visitedPage != null}
          Value=${visitedPage?.Name}
          onInput=${(Event:Indexable) => doConfigureVisitedPage('Name',Event.target.value)}
        />
      </>

      <${WAD_horizontally} style="padding-top:4px; padding-bottom:4px">
        <${WAD_PseudoDropDown} Icon="${IconFolder}/plus.png"
          enabled=${visitedPage != null} Value="" Placeholder="(please select)"
          OptionList=${[
            '----',
            'plainWidget:plain Widget', 'Outline:Widget Outline',
            '----',
            'Title', 'Subtitle', 'Label', 'Text', 'Fineprint',
            '----',
            'HTMLView:HTML View', 'MarkdownView:Markdown View',
            'ImageView:Image View', 'SVGView:SVG View',
            'WebView:Web View',
            'Badge', 'Icon',
            'horizontalSeparator:horizontal Separator',
            'verticalSeparator:vertical Separator',
            '----',
            'Button', 'Checkbox', 'Radiobutton',
            '----',
            'Gauge','Slider','Progressbar',
            '----',
            'TextlineInput:Textline Input', 'PasswordInput:Password Input',
            'NumberInput:Number Input', 'PhoneNumberInput:Phone Number Input',
            'EMailAddressInput:EMail Address Input', 'URLInput:URL Input',
            'SearchInput:Search Input', 'TextInput:Text Input',
            'ColorInput:Color Input',
            '----',
            'DropDown','PseudoDropDown:Pseudo DropDown',
            '----',
            'TimeInput:Time Input','DateTimeInput:Date and Time Input',
            'DateInput:Date Input','WeekInput:Week Input','MonthInput:Month Input',
            '----',
            'FileInput:File Input', 'PseudoFileInput:pseudo File Input',
            'FileDropArea:File Drop Area',
            '----',
            'TextTab:Text Tab', 'IconTab:Icon Tab', '-TabStrip',
            'WidgetPane:Widget Pane',
            '-Accordion','-AccordionFold:Accordion Fold',
            'FlatListView:flat List View','-nestedListView:nested List View',
            '-NoteSticker'
          ]}
          onInput=${(Event:Indexable) => {
            doCreateWidget(Event.target.value)
            Event.target.value = ''
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
        List=${visitedPage?.WidgetList || []} Placeholder="(no widgets)"
        ItemRenderer=${WidgetListItemRenderer}
        selectedIndices=${selectedWidgetIndices}
        SelectionLimit=${Number.MAX_SAFE_INTEGER}
        onSelectionChange=${updateWidgetSelection}
      />

      <${WAD_horizontally} style="padding-top:4px">
        <${WAD_Label} style="width:56px">Widget</>
        <${WAD_TextlineInput} Placeholder="(widget name)" style="flex:1 0 auto"
          enabled=${selectedWidgets.length > 0}
          Value=${commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.Name))}
          onInput=${(Event:Indexable) => doConfigureSelectedWidgets('Name',Event.target.value)}
        />
      </>
     </>
    </>`
  }

/**** WAD_WidgetConfigurationPane ****/

  function WAD_WidgetConfigurationPane () {
    const { Applet, selectedWidgets, Inspector } = DesignerState
    const visitedPage = Applet.visitedPage

    const commonType = commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.Type))

  /**** remember fold expansions ****/

    const Expansions  = Inspector.Expansions.WidgetConfiguration
    function toggleExpansion (Name:string):void {
      Expansions[Name] = ! Expansions[Name]
      WAT_rerender()
    }

  /**** remember scroll position ****/

    const ScrollPosition = Inspector.ScrollPositions.WidgetConfiguration
    function updateScrollPosition (Event:Indexable) {
      Inspector.ScrollPositions.WidgetConfiguration = Event.target.scrollTop
    }

    const scrollablePane = useRef(null)
    useEffect(() => scrollablePane.current.base.scrollTop = ScrollPosition,[])

  /**** handle value input ****/

    let ValueType:string = 'string'
    let ValueToEdit = commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.Value))
      switch (true) {
        case (ValueToEdit ==  null):
        case (ValueToEdit === multipleValues):
        case (ValueToEdit === noSelection):
          break
        default:
          ValueType = typeof ValueToEdit
          if (ValueType === 'object') {
            ValueToEdit = JSON.stringify(ValueToEdit,null,2)
          } else {
            ValueToEdit = '' + ValueToEdit
          }
      }
    function _onValueInput (Event:Indexable) {
      const editedValue = Event.target.value; let Value:any = undefined
        switch (ValueType) {
          case 'boolean': Value = Boolean(editedValue); break
          case 'number':  Value = Number(editedValue);  break
          case 'string':  Value = editedValue;          break
          default:        Value = JSON.parse(editedValue)           // may fail!
        }
      doConfigureSelectedWidgets('Value',Value)
    }

  /**** handle script input ****/

    const activeScript  = commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.activeScript))
    const pendingScript = commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.pendingScript))
    const ErrorReport   = commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.ErrorReport))
    const ScriptError   = commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.ScriptError))

    const ScriptIsPending = ValueIsText(pendingScript) && (pendingScript !== activeScript)
    const ReportToShow    = ScriptError || ErrorReport
      DesignerState.Inspector.ReportToShow = ReportToShow // *C* workaround

    const setPendingScriptTo = useCallback((newScript:WAT_Text) => {
      doConfigureSelectedWidgets('pendingScript',newScript)
    },[])

    const applyPendingScript = useCallback(() => doApplySelectedWidgetsScript(),[])

  /**** actual rendering ****/

    return html`<div class="WAD InspectorPane">
     <${WAD_vertically} style="width:100%; height:100%; padding:4px">
      <${WAD_horizontally} style="padding-top:4px">
        <${WAD_Label} style="width:52px">Name</>
        <${WAD_TextlineInput} Placeholder="(widget name)" style="flex:1 0 auto"
          enabled=${selectedWidgets.length > 0}
          Value=${commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.Name))}
          onInput=${(Event:Indexable) => doConfigureSelectedWidgets('Name',Event.target.value)}
        />
      </>

      <${WAD_horizontally} style="padding-top:4px">
        <${WAD_Label} style="width:52px">Type</>
        <${WAD_TextlineInput} readonly style="flex:1 0 auto"
          Value=${commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.Type))}
        />
      </>

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
              Value=${commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.Visibility))}
              onInput=${(Event:Indexable) => doConfigureSelectedWidgets('Visibility',Event.target.checked)}
            />
          </>

          <${WAD_horizontally}>
            <${WAD_Label}>Selection Lock</>
            <${WAD_Gap}/>
            <${WAD_Checkbox}
              enabled=${selectedWidgets.length > 0}
              Value=${commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.Lock))}
              onInput=${(Event:Indexable) => doConfigureSelectedWidgets('Lock',Event.target.checked)}
            />
          </>

          <${WAD_horizontally}>
            <${WAD_Label}>Opacity [%]</>
            <${WAD_Gap}/>
            <${WAD_IntegerInput} style="width:60px"
              enabled=${selectedWidgets.length > 0}
              Value=${commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.Opacity))}
              Minimum=${0} Maximum=${100}
              onInput=${(Event:Indexable) => doConfigureSelectedWidgets('Opacity',parseFloat(Event.target.value))}
            />
          </>

          <${WAD_horizontally}>
            <${WAD_Label}>Overflow</>
            <${WAD_Gap}/>
            <${WAD_DropDown} Options=${['hidden','visible']}
              enabled=${selectedWidgets.length > 0}
              Value=${commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.OverflowVisibility))}
              onInput=${(Event:Indexable) => doConfigureSelectedWidgets('OverflowVisibility',Event.target.value === 'visible')}
            />
          </>

          <${WAD_horizontally} style="padding-top:4px">
            <${WAD_Label}>Enabling</>
            <${WAD_Gap}/>
            <${WAD_Checkbox}
              enabled=${selectedWidgets.length > 0}
              Value=${commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.Enabling))}
              onInput=${(Event:Indexable) => doConfigureSelectedWidgets('Enabling',Event.target.checked)}
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
              Value=${commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.x))}
              onInput=${(Event:Indexable) => doConfigureSelectedWidgets('x',parseFloat(Event.target.value))}
            />
              <div style="width:20px; padding-top:4px; text-align:center">,</div>
            <${WAD_IntegerInput} style="width:60px"
              enabled=${selectedWidgets.length > 0}
              Value=${commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.y))}
              onInput=${(Event:Indexable) => doConfigureSelectedWidgets('y',parseFloat(Event.target.value))}
            />
          </>

          <${WAD_horizontally}>
            <${WAD_Label}>Size (w,h) [px]</>
            <${WAD_Gap}/>
            <${WAD_IntegerInput} style="width:60px"
              enabled=${selectedWidgets.length > 0}
              Value=${commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.Width))}
              onInput=${(Event:Indexable) => doConfigureSelectedWidgets('Width',parseFloat(Event.target.value))}
            />
              <div style="width:20px; padding-top:4px; text-align:center">x</div>
            <${WAD_IntegerInput} style="width:60px"
              enabled=${selectedWidgets.length > 0}
              Value=${commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.Height))}
              onInput=${(Event:Indexable) => doConfigureSelectedWidgets('Height',parseFloat(Event.target.value))}
            />
          </>

          <${WAD_horizontally} style="padding-top:4px">
            <${WAD_Icon} Icon="${IconFolder}/arrows-left-right.png" style="width:24px"/>
            <${WAD_Gap}/>
            <${WAD_DropDown} style="width:104px"
              enabled=${selectedWidgets.length > 0}
              Value=${commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.Anchors[0]))}
              Options=${['left-width','left-right','width-right']}
              onInput=${(Event:Indexable) => doConfigureSelectedWidgets('Anchors_0',Event.target.value)}
            />
              <div style="width:8px"/>
            <${WAD_IntegerInput} style="width:60px"
              enabled=${selectedWidgets.length > 0}
              Value=${commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.Offsets[0]))}
              onInput=${(Event:Indexable) => doConfigureSelectedWidgets('Offsets_0',parseFloat(Event.target.value))}
            />
              <div style="width:20px; padding-top:4px; text-align:center">,</div>
            <${WAD_IntegerInput} style="width:60px"
              enabled=${selectedWidgets.length > 0}
              Value=${commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.Offsets[1]))}
              onInput=${(Event:Indexable) => doConfigureSelectedWidgets('Offsets_1',parseFloat(Event.target.value))}
            />
          </>

          <${WAD_horizontally}>
            <${WAD_Icon} Icon="${IconFolder}/arrows-up-down.png" style="width:24px"/>
            <${WAD_Gap}/>
            <${WAD_DropDown} style="width:104px"
              enabled=${selectedWidgets.length > 0}
              Value=${commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.Anchors[1]))}
              Options=${['top-height','top-bottom','height-bottom']}
              onInput=${(Event:Indexable) => doConfigureSelectedWidgets('Anchors_1',Event.target.value)}
            />
              <div style="width:8px"/>
            <${WAD_IntegerInput} style="width:60px"
              enabled=${selectedWidgets.length > 0}
              Value=${commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.Offsets[2]))}
              onInput=${(Event:Indexable) => doConfigureSelectedWidgets('Offsets_2',parseFloat(Event.target.value))}
            />
              <div style="width:20px; padding-top:4px; text-align:center">,</div>
            <${WAD_IntegerInput} style="width:60px"
              enabled=${selectedWidgets.length > 0}
              Value=${commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.Offsets[3]))}
              onInput=${(Event:Indexable) => doConfigureSelectedWidgets('Offsets_3',parseFloat(Event.target.value))}
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
              Value=${commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.minWidth))}
              onInput=${(Event:Indexable) => doConfigureSelectedWidgets('minWidth',parseFloat(Event.target.value))}
            />
              <div style="width:20px; padding-top:4px; text-align:center">x</div>
            <${WAD_IntegerInput} style="width:60px"
              enabled=${selectedWidgets.length > 0}
              Value=${commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.minHeight))}
              onInput=${(Event:Indexable) => doConfigureSelectedWidgets('minHeight',parseFloat(Event.target.value))}
            />
          </>
          <${WAD_horizontally}>
            <${WAD_Label} style="padding-left:10px">max. Size (w,h) [px]</>
            <${WAD_Gap}/>
            <${WAD_IntegerInput} style="width:60px"
              enabled=${selectedWidgets.length > 0}
              Value=${commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.maxWidth))}
              onInput=${(Event:Indexable) => doConfigureSelectedWidgets('maxWidth',parseFloat(Event.target.value))}
            />
              <div style="width:20px; padding-top:4px; text-align:center">x</div>
            <${WAD_IntegerInput} style="width:60px"
              enabled=${selectedWidgets.length > 0}
              Value=${commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.maxHeight))}
              onInput=${(Event:Indexable) => doConfigureSelectedWidgets('maxHeight',parseFloat(Event.target.value))}
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
              Value=${commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.FontFamily))}
              onInput=${(Event:Indexable) => doConfigureSelectedWidgets('FontFamily',Event.target.value)}
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
              Value=${commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.FontSize))}
              Minimum=${0} Maximum=${1000}
              onInput=${(Event:Indexable) => doConfigureSelectedWidgets('FontSize',parseFloat(Event.target.value))}
            />
          </>
          <${WAD_horizontally}>
            <${WAD_Label} style="padding-left:10px">Weight</>
            <${WAD_Gap}/>
            <${WAD_DropDown}
              enabled=${selectedWidgets.length > 0}
              Value=${commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.FontWeight))}
              Options=${WAT_FontWeights}
              onInput=${(Event:Indexable) => doConfigureSelectedWidgets('FontWeight',Event.target.value)}
            />
          </>
          <${WAD_horizontally}>
            <${WAD_Label} style="padding-left:10px">Style</>
            <${WAD_Gap}/>
            <${WAD_DropDown}
              enabled=${selectedWidgets.length > 0}
              Value=${commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.FontStyle))}
              Options=${WAT_FontStyles}
              onInput=${(Event:Indexable) => doConfigureSelectedWidgets('FontStyle',Event.target.value)}
            />
          </>
          <${WAD_horizontally}>
            <${WAD_Label} style="padding-left:10px">Color</>
            <${WAD_Gap}/>
            <${WAD_ColorInput}
              enabled=${selectedWidgets.length > 0}
              Value=${commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.Color))}
              onInput=${(Event:Indexable) => doConfigureSelectedWidgets('Color',Event.target.value)}
            />
          </>

          <${WAD_horizontally}>
            <${WAD_Label}>Text Decoration</>
            <${WAD_Gap}/>
            <${WAD_Checkbox}
              enabled=${selectedWidgets.length > 0}
              Value=${commonValueItemOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.TextDecoration),'isActive')}
              onInput=${(Event:Indexable) => {
                const { isActive, Line, Color, Style, Thickness } = (
                  commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.TextDecoration
                    || { isActive:false, Line:'none', Color:'black', Style:'solid', Thickness:1 }
                  ))
                )
                doConfigureSelectedWidgets('TextDecoration',{
                  isActive:Event.target.checked, Line, Color, Style, Thickness
                })
              }}
            />
          </>
          <${WAD_horizontally}>
            <${WAD_Label} style="padding-left:10px">Line</>
            <${WAD_Gap}/>
            <${WAD_DropDown}
              enabled=${selectedWidgets.length > 0}
              Value=${commonValueItemOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.TextDecoration),'Line')}
              Options=${WAT_TextDecorationLines}
              onInput=${(Event:Indexable) => {
                const { isActive, Line, Color, Style, Thickness } = (
                  commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.TextDecoration
                    || { isActive:false, Line:'none', Color:'black', Style:'solid', Thickness:1 }
                  ))
                )
                doConfigureSelectedWidgets('TextDecoration',{
                  isActive, Line:Event.target.value, Color, Style, Thickness
                })
              }}
            />
          </>
          <${WAD_horizontally}>
            <${WAD_Label} style="padding-left:10px">Color</>
            <${WAD_Gap}/>
            <${WAD_ColorInput}
              enabled=${selectedWidgets.length > 0}
              Value=${commonValueItemOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.TextDecoration),'Color')}
              onInput=${(Event:Indexable) => {
                const { isActive, Line, Color, Style, Thickness } = (
                  commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.TextDecoration
                    || { isActive:false, Line:'none', Color:'black', Style:'solid', Thickness:1 }
                  ))
                )
                doConfigureSelectedWidgets('TextDecoration',{
                  isActive, Line, Color:Event.target.value, Style, Thickness
                })
              }}
            />
          </>
          <${WAD_horizontally}>
            <${WAD_Label} style="padding-left:10px">Style</>
            <${WAD_Gap}/>
            <${WAD_DropDown}
              enabled=${selectedWidgets.length > 0}
              Value=${commonValueItemOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.TextDecoration),'Style')}
              Options=${WAT_TextDecorationStyles}
              onInput=${(Event:Indexable) => {
                const { isActive, Line, Color, Style, Thickness } = (
                  commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.TextDecoration
                    || { isActive:false, Line:'none', Color:'black', Style:'solid', Thickness:1 }
                  ))
                )
                doConfigureSelectedWidgets('TextDecoration',{
                  isActive, Line, Color, Style:Event.target.value, Thickness
                })
              }}
            />
          </>
          <${WAD_horizontally}>
            <${WAD_Label} style="padding-left:10px">Thickness [px]</>
            <${WAD_Gap}/>
            <${WAD_IntegerInput} readonly style="width:60px"
              enabled=${selectedWidgets.length > 0}
              Value=${commonValueItemOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.TextDecoration),'Thickness')}
              onInput=${(Event:Indexable) => {
                const { isActive, Line, Color, Style, Thickness } = (
                  commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.TextDecoration
                    || { isActive:false, Line:'none', Color:'black', Style:'solid', Thickness:1 }
                  ))
                )
                doConfigureSelectedWidgets('TextDecoration',{
                  isActive, Line, Color, Style, Thickness:parseFloat(Event.target.value)
                })
              }}
            />
          </>

          <${WAD_horizontally}>
            <${WAD_Label}>Text Shadow</>
            <${WAD_Gap}/>
            <${WAD_Checkbox}
              enabled=${selectedWidgets.length > 0}
              Value=${commonValueItemOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.TextShadow),'isActive')}
              onInput=${(Event:Indexable) => {
                const { isActive, xOffset,yOffset, BlurRadius, Color } = (
                  commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.TextShadow
                    || { isActive:false, xOffset:0,yOffset:0, BlurRadius:5, Color:'black' }
                  ))
                )
                doConfigureSelectedWidgets('TextShadow',{
                  isActive:Event.target.checked, xOffset,yOffset, BlurRadius, Color
                })
              }}
            />
          </>
          <${WAD_horizontally}>
            <${WAD_Label} style="padding-left:10px">Color</>
            <${WAD_Gap}/>
            <${WAD_ColorInput}
              enabled=${selectedWidgets.length > 0}
              Value=${commonValueItemOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.TextShadow),'Color')}
              onInput=${(Event:Indexable) => {
                const { isActive, xOffset,yOffset, BlurRadius, Color } = (
                  commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.TextShadow
                    || { isActive:false, xOffset:0,yOffset:0, BlurRadius:5, Color:'black' }
                  ))
                )
                doConfigureSelectedWidgets('TextShadow',{
                  isActive, xOffset,yOffset, BlurRadius, Color:Event.target.value
                })
              }}
            />
          </>
          <${WAD_horizontally}>
            <${WAD_Label} style="padding-left:10px">Offset (dx,dy) [px]</>
            <${WAD_Gap}/>
            <${WAD_IntegerInput} readonly style="width:60px"
              enabled=${selectedWidgets.length > 0}
              Value=${commonValueItemOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.TextShadow),'xOffset')}
              onInput=${(Event:Indexable) => {
                const { isActive, xOffset,yOffset, BlurRadius, Color } = (
                  commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.TextShadow
                    || { isActive:false, xOffset:0,yOffset:0, BlurRadius:5, Color:'black' }
                  ))
                )
                doConfigureSelectedWidgets('TextShadow',{
                  isActive, xOffset:parseFloat(Event.target.value),yOffset, BlurRadius, Color
                })
              }}
            />
              <div style="width:20px; padding-top:4px; text-align:center">,</div>
            <${WAD_IntegerInput} readonly style="width:60px"
              enabled=${selectedWidgets.length > 0}
              Value=${commonValueItemOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.TextShadow),'yOffset')}
              onInput=${(Event:Indexable) => {
                const { isActive, xOffset,yOffset, BlurRadius, Color } = (
                  commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.TextShadow
                   || { isActive:false, xOffset:0,yOffset:0, BlurRadius:5, Color:'black' }
                 ))
                )
                doConfigureSelectedWidgets('TextShadow',{
                  isActive, xOffset,yOffset:parseFloat(Event.target.value), BlurRadius, Color
                })
              }}
            />
          </>
          <${WAD_horizontally}>
            <${WAD_Label} style="padding-left:10px">Blur Radius [px]</>
            <${WAD_Gap}/>
            <${WAD_IntegerInput} readonly style="width:60px"
              enabled=${selectedWidgets.length > 0}
              Value=${commonValueItemOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.TextShadow),'BlurRadius')}
              onInput=${(Event:Indexable) => {
                const { isActive, xOffset,yOffset, BlurRadius, Color } = (
                  commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.TextShadow
                    || { isActive:false, xOffset:0,yOffset:0, BlurRadius:5, Color:'black' }
                  ))
                )
                doConfigureSelectedWidgets('TextShadow',{
                  isActive, xOffset,yOffset, BlurRadius:parseFloat(Event.target.value), Color
                })
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
              Value=${commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.TextAlignment))}
              Options=${WAT_TextAlignments}
              onInput=${(Event:Indexable) => doConfigureSelectedWidgets('TextAlignment',Event.target.value)}
            />
          </>
          <${WAD_horizontally}>
            <${WAD_Label} style="padding-left:10px">Line Height [px]</>
            <${WAD_Gap}/>
            <${WAD_IntegerInput} style="width:60px"
              enabled=${selectedWidgets.length > 0}
              Value=${commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.LineHeight))}
              Minimum=${0} Maximum=${1000}
              onInput=${(Event:Indexable) => doConfigureSelectedWidgets('LineHeight',parseFloat(Event.target.value))}
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
              Value=${commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.hasBackground))}
              onInput=${(Event:Indexable) => doConfigureSelectedWidgets('hasBackground',Event.target.checked)}
            />
          </>

          <${WAD_horizontally}>
            <${WAD_Label}>Color</>
            <${WAD_Gap}/>
            <${WAD_ColorInput}
              enabled=${selectedWidgets.length > 0}
              Value=${commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.BackgroundColor))}
              onInput=${(Event:Indexable) => doConfigureSelectedWidgets('BackgroundColor',Event.target.value)}
            />
          </>

          <${WAD_horizontally}>
            <${WAD_Label}>Texture</>
            <${WAD_Gap}/>
            <${WAD_Checkbox}
              enabled=${selectedWidgets.length > 0}
              Value=${commonValueItemOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.BackgroundTexture),'isActive')}
              onInput=${(Event:Indexable) => {
                const { isActive, ImageURL, Mode, xOffset,yOffset } = (
                  commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.BackgroundTexture))
                    || { isActive:false, ImageURL:'', Mode:'tile', xOffset:0,yOffset:0 }
                )
                doConfigureSelectedWidgets('BackgroundTexture',{
                  isActive:Event.target.checked, ImageURL, Mode, xOffset,yOffset
                })
              }}
            />
          </>
          <${WAD_horizontally}>
            <${WAD_Label} style="padding-left:10px">Mode</>
            <${WAD_Gap}/>
            <${WAD_DropDown}
              enabled=${selectedWidgets.length > 0}
              Value=${commonValueItemOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.BackgroundTexture),'Mode')}
              Options=${WAT_BackgroundModes}
              onInput=${(Event:Indexable) => {
                const { isActive, ImageURL, Mode, xOffset,yOffset } = (
                  commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.BackgroundTexture))
                    || { isActive:false, ImageURL:'', Mode:'tile', xOffset:0,yOffset:0 }
                )
                doConfigureSelectedWidgets('BackgroundTexture',{
                  isActive, ImageURL, Mode:Event.target.value, xOffset,yOffset
                })
              }}
            />
          </>
          <${WAD_horizontally}>
            <${WAD_Label} style="padding-left:10px">Image URL</>
            <${WAD_Gap}/>
            <${WAD_URLInput} style="flex:1 0 auto"
              enabled=${selectedWidgets.length > 0}
              Value=${commonValueItemOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.BackgroundTexture),'ImageURL')}
              onInput=${(Event:Indexable) => {
                const { isActive, ImageURL, Mode, xOffset,yOffset } = (
                  commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.BackgroundTexture))
                    || { isActive:false, ImageURL:'', Mode:'tile', xOffset:0,yOffset:0 }
                )
                doConfigureSelectedWidgets('BackgroundTexture',{
                  isActive, ImageURL:Event.target.value, Mode, xOffset,yOffset
                })
              }}
            />
          </>
          <${WAD_horizontally}>
            <${WAD_Label} style="padding-left:10px">Offset (dx,dy) [px]</>
            <${WAD_Gap}/>
            <${WAD_IntegerInput} readonly style="width:60px"
              enabled=${selectedWidgets.length > 0}
              Value=${commonValueItemOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.BackgroundTexture),'xOffset')}
              onInput=${(Event:Indexable) => {
                const { isActive, ImageURL, Mode, xOffset,yOffset } = (
                  commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.BackgroundTexture))
                    || { isActive:false, ImageURL:'', Mode:'tile', xOffset:0,yOffset:0 }
                )
                doConfigureSelectedWidgets('BackgroundTexture',{
                  isActive, ImageURL, Mode, xOffset:Event.target.value,yOffset
                })
              }}
            />
              <div style="width:20px; padding-top:4px; text-align:center">,</div>
            <${WAD_IntegerInput} readonly style="width:60px"
              enabled=${selectedWidgets.length > 0}
              Value=${commonValueItemOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.BackgroundTexture),'yOffset')}
              onInput=${(Event:Indexable) => {
                const { isActive, ImageURL, Mode, xOffset,yOffset } = (
                  commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.BackgroundTexture))
                    || { isActive:false, ImageURL:'', Mode:'tile', xOffset:0,yOffset:0 }
                )
                doConfigureSelectedWidgets('BackgroundTexture',{
                  isActive, ImageURL, Mode, xOffset,yOffset:parseFloat(Event.target.value)
                })
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
              Value=${commonValueItemOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.BorderStyles),0)}
              Options=${WAT_BorderStyles}
              onInput=${(Event:Indexable) => {
                const [ Style_0,Style_1,Style_2,Style_3 ] = (
                  commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.BorderStyles || ['none','none','none','none']))
                )
                doConfigureSelectedWidgets('BorderStyles',[
                  Event.target.value,Style_1,Style_2,Style_3
                ])
              }}
            />
              <div style="width:10px"/>
            <${WAD_IntegerInput} style="width:60px"
              enabled=${selectedWidgets.length > 0}
              Value=${commonValueItemOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.BorderWidths),0)}
              Minimum=${0}
              onInput=${(Event:Indexable) => {
                const [ Width_0,Width_1,Width_2,Width_3 ] = (
                  commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.BorderWidths || [0,0,0,0]))
                )
                doConfigureSelectedWidgets('BorderWidths',[
                  parseFloat(Event.target.value),Width_1,Width_2,Width_3
                ])
              }}
            />
              <div style="width:10px"/>
            <${WAD_ColorInput}
              enabled=${selectedWidgets.length > 0}
              Value=${commonValueItemOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.BorderColors),0)}
              onInput=${(Event:Indexable) => {
                const [ Color_0,Color_1,Color_2,Color_3 ] = (
                  commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.BorderColors || ['black','black','black','black']))
                )
                doConfigureSelectedWidgets('BorderColors',[
                  Event.target.value,Color_1,Color_2,Color_3
                ])
              }}
            />
          </>

          <${WAD_horizontally}>
            <${WAD_Label} style="padding-left:10px">right</>
            <${WAD_Gap}/>
            <${WAD_DropDown}
              enabled=${selectedWidgets.length > 0}
              Value=${commonValueItemOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.BorderStyles),1)}
              Options=${WAT_BorderStyles}
              onInput=${(Event:Indexable) => {
                const [ Style_0,Style_1,Style_2,Style_3 ] = (
                  commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.BorderStyles || ['none','none','none','none']))
                )
                doConfigureSelectedWidgets('BorderStyles',[
                  Style_0,Event.target.value,Style_2,Style_3
                ])
              }}
            />
              <div style="width:10px"/>
            <${WAD_IntegerInput} style="width:60px"
              enabled=${selectedWidgets.length > 0}
              Value=${commonValueItemOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.BorderWidths),1)}
              Minimum=${0}
              onInput=${(Event:Indexable) => {
                const [ Width_0,Width_1,Width_2,Width_3 ] = (
                  commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.BorderWidths || [0,0,0,0]))
                )
                doConfigureSelectedWidgets('BorderWidths',[
                  Width_0,parseFloat(Event.target.value),Width_2,Width_3
                ])
              }}
            />
              <div style="width:10px"/>
            <${WAD_ColorInput}
              enabled=${selectedWidgets.length > 0}
              Value=${commonValueItemOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.BorderColors),1)}
              onInput=${(Event:Indexable) => {
                const [ Color_0,Color_1,Color_2,Color_3 ] = (
                  commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.BorderColors || ['black','black','black','black']))
                )
                doConfigureSelectedWidgets('BorderColors',[
                  Color_0,Event.target.value,Color_2,Color_3
                ])
              }}
            />
          </>

          <${WAD_horizontally}>
            <${WAD_Label} style="padding-left:10px">bottom</>
            <${WAD_Gap}/>
            <${WAD_DropDown}
              enabled=${selectedWidgets.length > 0}
              Value=${commonValueItemOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.BorderStyles),2)}
              Options=${WAT_BorderStyles}
              onInput=${(Event:Indexable) => {
                const [ Style_0,Style_1,Style_2,Style_3 ] = (
                  commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.BorderStyles || ['none','none','none','none']))
                )
                doConfigureSelectedWidgets('BorderStyles',[
                  Style_0,Style_1,Event.target.value,Style_3
                ])
              }}
            />
              <div style="width:10px"/>
            <${WAD_IntegerInput} style="width:60px"
              enabled=${selectedWidgets.length > 0}
              Value=${commonValueItemOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.BorderWidths),2)}
              Minimum=${0}
              onInput=${(Event:Indexable) => {
                const [ Width_0,Width_1,Width_2,Width_3 ] = (
                  commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.BorderWidths || [0,0,0,0]))
                )
                doConfigureSelectedWidgets('BorderWidths',[
                  Width_0,Width_1,parseFloat(Event.target.value),Width_3
                ])
              }}
            />
              <div style="width:10px"/>
            <${WAD_ColorInput}
              enabled=${selectedWidgets.length > 0}
              Value=${commonValueItemOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.BorderColors),2)}
              onInput=${(Event:Indexable) => {
                const [ Color_0,Color_1,Color_2,Color_3 ] = (
                  commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.BorderColors || ['black','black','black','black']))
                )
                doConfigureSelectedWidgets('BorderColors',[
                  Color_0,Color_1,Event.target.value,Color_3
                ])
              }}
            />
          </>

          <${WAD_horizontally}>
            <${WAD_Label} style="padding-left:10px">left</>
            <${WAD_Gap}/>
            <${WAD_DropDown}
              enabled=${selectedWidgets.length > 0}
              Value=${commonValueItemOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.BorderStyles),3)}
              Options=${WAT_BorderStyles}
              onInput=${(Event:Indexable) => {
                const [ Style_0,Style_1,Style_2,Style_3 ] = (
                  commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.BorderStyles || ['none','none','none','none']))
                )
                doConfigureSelectedWidgets('BorderStyles',[
                  Style_0,Style_1,Style_2,Event.target.value
                ])
              }}
            />
              <div style="width:10px"/>
            <${WAD_IntegerInput} style="width:60px"
              enabled=${selectedWidgets.length > 0}
              Value=${commonValueItemOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.BorderWidths),3)}
              Minimum=${0}
              onInput=${(Event:Indexable) => {
                const [ Width_0,Width_1,Width_2,Width_3 ] = (
                  commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.BorderWidths || [0,0,0,0]))
                )
                doConfigureSelectedWidgets('BorderWidths',[
                  Width_0,Width_1,Width_2,parseFloat(Event.target.value)
                ])
              }}
            />
              <div style="width:10px"/>
            <${WAD_ColorInput}
              enabled=${selectedWidgets.length > 0}
              Value=${commonValueItemOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.BorderColors),3)}
              onInput=${(Event:Indexable) => {
                const [ Color_0,Color_1,Color_2,Color_3 ] = (
                  commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.BorderColors || ['black','black','black','black']))
                )
                doConfigureSelectedWidgets('BorderColors',[
                  Color_0,Color_1,Color_2,Event.target.value
                ])
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
              Value=${commonValueItemOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.BorderRadii),0)}
              Minimum=${0}
              onInput=${(Event:Indexable) => {
                const [ Radius_0,Radius_1,Radius_2,Radius_3 ] = (
                  commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.BorderRadii || [0,0,0,0]))
                )
                doConfigureSelectedWidgets('BorderRadii',[
                  parseFloat(Event.target.value),Radius_1,Radius_2,Radius_3
                ])
              }}
            />
              <div style="width:20px; padding-top:4px; text-align:center">,</div>
            <${WAD_IntegerInput} style="width:60px"
              enabled=${selectedWidgets.length > 0}
              Value=${commonValueItemOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.BorderRadii),1)}
              Minimum=${0}
              onInput=${(Event:Indexable) => {
                const [ Radius_0,Radius_1,Radius_2,Radius_3 ] = (
                  commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.BorderRadii || [0,0,0,0]))
                )
                doConfigureSelectedWidgets('BorderRadii',[
                  Radius_0,parseFloat(Event.target.value),Radius_2,Radius_3
                ])
              }}
            />
          </>
          <${WAD_horizontally}>
            <${WAD_Label} style="padding-left:10px">bottom-left/right</>
            <${WAD_Gap}/>
            <${WAD_IntegerInput} style="width:60px"
              enabled=${selectedWidgets.length > 0}
              Value=${commonValueItemOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.BorderRadii),3)}
              Minimum=${0}
              onInput=${(Event:Indexable) => {
                const [ Radius_0,Radius_1,Radius_2,Radius_3 ] = (
                  commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.BorderRadii || [0,0,0,0]))
                )
                doConfigureSelectedWidgets('BorderRadii',[
                  Radius_0,Radius_1,Radius_2,parseFloat(Event.target.value)
                ])
              }}
            />
              <div style="width:20px; padding-top:4px; text-align:center">,</div>
            <${WAD_IntegerInput} style="width:60px"
              enabled=${selectedWidgets.length > 0}
              Value=${commonValueItemOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.BorderRadii),2)}
              Minimum=${0}
              onInput=${(Event:Indexable) => {
                const [ Radius_0,Radius_1,Radius_2,Radius_3 ] = (
                  commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.BorderRadii || [0,0,0,0]))
                )
                doConfigureSelectedWidgets('BorderRadii',[
                  Radius_0,Radius_1,parseFloat(Event.target.value),Radius_3
                ])
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
              Value=${commonValueItemOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.BoxShadow),'isActive')}
              onInput=${(Event:Indexable) => {
                const { isActive, xOffset,yOffset, BlurRadius,SpreadRadius, Color } = (
                  commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.BoxShadow))
                    || { isActive:false, xOffset:0,yOffset:0, BlurRadius:5,SpreadRadius:0, Color:'black' }
                )
                doConfigureSelectedWidgets('BoxShadow',{
                  isActive:Event.target.checked, xOffset,yOffset, BlurRadius,SpreadRadius, Color
                })
              }}
            />
          </>
          <${WAD_horizontally}>
            <${WAD_Label} style="padding-left:10px">Color</>
            <${WAD_Gap}/>
            <${WAD_ColorInput}
              enabled=${selectedWidgets.length > 0}
              Value=${commonValueItemOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.BoxShadow),'Color')}
              onInput=${(Event:Indexable) => {
                const { isActive, xOffset,yOffset, BlurRadius,SpreadRadius, Color } = (
                  commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.BoxShadow))
                    || { isActive:false, xOffset:0,yOffset:0, BlurRadius:5,SpreadRadius:0, Color:'black' }
                )
                doConfigureSelectedWidgets('BoxShadow',{
                  isActive, xOffset,yOffset, BlurRadius,SpreadRadius, Color:Event.target.value
                })
              }}
            />
          </>
          <${WAD_horizontally}>
            <${WAD_Label} style="padding-left:10px">Offset (dx,dy) [px]</>
            <${WAD_Gap}/>
            <${WAD_IntegerInput} style="width:60px"
              enabled=${selectedWidgets.length > 0}
              Value=${commonValueItemOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.BoxShadow),'xOffset')}
              onInput=${(Event:Indexable) => {
                const { isActive, xOffset,yOffset, BlurRadius,SpreadRadius, Color } = (
                  commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.BoxShadow))
                    || { isActive:false, xOffset:0,yOffset:0, BlurRadius:5,SpreadRadius:0, Color:'black' }
                )
                doConfigureSelectedWidgets('BoxShadow',{
                  isActive, xOffset:parseFloat(Event.target.value),yOffset, BlurRadius,SpreadRadius, Color
                })
              }}
            />
              <div style="width:20px; padding-top:4px; text-align:center">,</div>
            <${WAD_IntegerInput} style="width:60px"
              enabled=${selectedWidgets.length > 0}
              Value=${commonValueItemOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.BoxShadow),'yOffset')}
              onInput=${(Event:Indexable) => {
                const { isActive, xOffset,yOffset, BlurRadius,SpreadRadius, Color } = (
                  commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.BoxShadow))
                   || { isActive:false, xOffset:0,yOffset:0, BlurRadius:5,SpreadRadius:0, Color:'black' }
                )
                doConfigureSelectedWidgets('BoxShadow',{
                  isActive, xOffset,yOffset:parseFloat(Event.target.value), BlurRadius,SpreadRadius, Color
                })
              }}
            />
          </>
          <${WAD_horizontally}>
            <${WAD_Label} style="padding-left:10px">Blur Radius [px]</>
            <${WAD_Gap}/>
            <${WAD_IntegerInput} style="width:60px"
              enabled=${selectedWidgets.length > 0}
              Value=${commonValueItemOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.BoxShadow),'BlurRadius')}
              onInput=${(Event:Indexable) => {
                const { isActive, xOffset,yOffset, BlurRadius,SpreadRadius, Color } = (
                  commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.BoxShadow))
                    || { isActive:false, xOffset:0,yOffset:0, BlurRadius:5,SpreadRadius:0, Color:'black' }
                )
                doConfigureSelectedWidgets('BoxShadow',{
                  isActive, xOffset,yOffset, BlurRadius:parseFloat(Event.target.value),SpreadRadius, Color
                })
              }}
            />
          </>
          <${WAD_horizontally}>
            <${WAD_Label} style="padding-left:10px">Spread Radius [px]</>
            <${WAD_Gap}/>
            <${WAD_IntegerInput} style="width:60px"
              enabled=${selectedWidgets.length > 0}
              Value=${commonValueItemOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.BoxShadow),'SpreadRadius')}
              onInput=${(Event:Indexable) => {
                const { isActive, xOffset,yOffset, BlurRadius,SpreadRadius, Color } = (
                  commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.BoxShadow))
                    || { isActive:false, xOffset:0,yOffset:0, BlurRadius:5,SpreadRadius:0, Color:'black' }
                )
                doConfigureSelectedWidgets('BoxShadow',{
                  isActive, xOffset,yOffset, BlurRadius,SpreadRadius:parseFloat(Event.target.value), Color
                })
              }}
            />
          </>
        </>

        <${WAD_Fold} Label="Cursor"
          Expansion=${Expansions.Cursor}
          toggleExpansion=${() => toggleExpansion('Cursor')}
        >
          <${WAD_horizontally}>
            <${WAD_Label}>Standard</>
            <${WAD_Gap}/>
            <${WAD_DropDown}
              enabled=${selectedWidgets.length > 0}
              Value=${commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.Cursor))}
              Options=${WAT_Cursors}
              onInput=${(Event:Indexable) => doConfigureSelectedWidgets('Cursor',Event.target.value)}
            />
          </>
        </>

        <${WAD_Fold} Label="Scripting"
          Expansion=${Expansions.Scripting}
          toggleExpansion=${() => toggleExpansion('Scripting')}
        >
          <${WAD_horizontally}>
            <${WAD_Label}>Script</>
              <div style="width:8px"/>
            <${WAD_Icon} Icon="${IconFolder}/square-code.png"
              active=${DialogIsOpen('ScriptEditor')}
              onClick=${(Event:PointerEvent) => {
                if (! DialogIsOpen('ScriptEditor')) {
                  DesignerState.ScriptEditor.Scope = 'selectedWidgets'
                }
                toggleDialog('ScriptEditor',Event)
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
            onInput=${(Event:Indexable) => setPendingScriptTo(Event.target.value)}
          />
        </>        <${WAD_Fold} Label="Type-specific Settings"
          Expansion=${Expansions.TypeSpecific}
          toggleExpansion=${() => toggleExpansion('TypeSpecific')}
        >
          ${(['ImageView','SVGView'].indexOf(commonType) >= 0) && html`
            <${WAD_horizontally}>
              <${WAD_Label}>Image Scaling</>
              <${WAD_Gap}/>
              <${WAD_DropDown}
                enabled=${selectedWidgets.length > 0}
                Value=${commonValueOf(selectedWidgets.map((Widget:Indexable) => Widget.ImageScaling))}
                Options=${WAT_ImageScalings}
                onInput=${(Event:Indexable) => doConfigureSelectedWidgets('ImageScaling',Event.target.value)}
              />
            </>

            <${WAD_horizontally}>
              <${WAD_Label}>Image Alignment</>
              <${WAD_Gap}/>
              <${WAD_DropDown}
                enabled=${selectedWidgets.length > 0}
                Value=${commonValueOf(selectedWidgets.map((Widget:Indexable) => Widget.ImageAlignment))}
                Options=${WAT_ImageAlignments}
                onInput=${(Event:Indexable) => doConfigureSelectedWidgets('ImageAlignment',Event.target.value)}
              />
            </>
          `}

          ${(commonType === 'WebView') && html`
            <${WAD_horizontally}>
              <${WAD_Label}>Permissions Policy</>
              <${WAD_Gap}/>
              <${WAD_TextlineInput} style="flex:1 0 auto"
                enabled=${selectedWidgets.length > 0}
                Value=${commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.PermissionsPolicy))}
                onInput=${(Event:Indexable) => doConfigureSelectedWidgets('PermissionsPolicy',Event.target.value)}
              />
            </>

            <${WAD_horizontally}>
              <${WAD_Label}>allows Fullscreen</>
              <${WAD_Gap}/>
              <${WAD_Checkbox}
                enabled=${selectedWidgets.length > 0}
                Value=${commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.allowsFullscreen))}
                onInput=${(Event:Indexable) => doConfigureSelectedWidgets('allowsFullscreen',Event.target.checked)}
              />
            </>

            <${WAD_horizontally}>
              <${WAD_Label}>Permissions Policy</>
              <${WAD_Gap}/>
              <${WAD_TextlineInput} style="flex:1 0 auto"
                enabled=${selectedWidgets.length > 0}
                Value=${commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.PermissionsPolicy))}
                onInput=${(Event:Indexable) => doConfigureSelectedWidgets('PermissionsPolicy',Event.target.value)}
              />
            </>

            <${WAD_horizontally}>
              <${WAD_Label}>Sandbox Permissionsy</>
              <${WAD_Gap}/>
              <${WAD_DropDown}
                enabled=${selectedWidgets.length > 0}
                Value=${commonValueOf(selectedWidgets.map((Widget:Indexable) => Widget.SandboxPermissions))}
                Options=${WAT_ReferrerPolicies}
                onInput=${(Event:Indexable) => doConfigureSelectedWidgets('SandboxPermissions',Event.target.value)}
              />
            </>
          `}

          ${(commonType === 'Gauge') && html`
            <${WAD_horizontally}>
              <${WAD_Label}>Minimum</>
              <${WAD_Gap}/>
              <${WAD_IntegerInput} style="width:60px"
                enabled=${selectedWidgets.length > 0}
                Value=${commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.Minimum))}
                onInput=${(Event:Indexable) => doConfigureSelectedWidgets('Minimum',parseFloat(Event.target.value))}
              />
            </>
            <${WAD_horizontally}>
              <${WAD_Label}>lower Bound</>
              <${WAD_Gap}/>
              <${WAD_IntegerInput} style="width:60px"
                enabled=${selectedWidgets.length > 0}
                Value=${commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.lowerBound))}
                onInput=${(Event:Indexable) => doConfigureSelectedWidgets('lowerBound',parseFloat(Event.target.value))}
              />
            </>
            <${WAD_horizontally}>
              <${WAD_Label}>Optimum</>
              <${WAD_Gap}/>
              <${WAD_IntegerInput} style="width:60px"
                enabled=${selectedWidgets.length > 0}
                Value=${commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.Optimum))}
                onInput=${(Event:Indexable) => doConfigureSelectedWidgets('Optimum',parseFloat(Event.target.value))}
              />
            </>
            <${WAD_horizontally}>
              <${WAD_Label}>upper Bound</>
              <${WAD_Gap}/>
              <${WAD_IntegerInput} style="width:60px"
                enabled=${selectedWidgets.length > 0}
                Value=${commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.upperBound))}
                onInput=${(Event:Indexable) => doConfigureSelectedWidgets('upperBound',parseFloat(Event.target.value))}
              />
            </>
            <${WAD_horizontally}>
              <${WAD_Label}>Maximum</>
              <${WAD_Gap}/>
              <${WAD_IntegerInput} style="width:60px"
                enabled=${selectedWidgets.length > 0}
                Value=${commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.Maximum))}
                onInput=${(Event:Indexable) => doConfigureSelectedWidgets('Maximum',parseFloat(Event.target.value))}
              />
            </>

          `}

          ${(commonType === 'Progressbar') && html`
            <${WAD_horizontally}>
              <${WAD_Label}>Maximum</>
              <${WAD_Gap}/>
              <${WAD_IntegerInput} style="width:60px"
                enabled=${selectedWidgets.length > 0}
                Value=${commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.Maximum))}
                Minimum=${0}
                onInput=${(Event:Indexable) => doConfigureSelectedWidgets('Maximum',parseFloat(Event.target.value))}
              />
            </>

          `}

          ${(commonType === 'Slider') && html`
            <${WAD_horizontally}>
              <${WAD_Label}>Minimum</>
              <${WAD_Gap}/>
              <${WAD_IntegerInput} style="width:60px"
                enabled=${selectedWidgets.length > 0}
                Value=${commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.Minimum))}
                onInput=${(Event:Indexable) => doConfigureSelectedWidgets('Minimum',parseFloat(Event.target.value))}
              />
            </>
            <${WAD_horizontally}>
              <${WAD_Label}>Stepping</>
              <${WAD_Gap}/>
              <${WAD_IntegerInput} style="width:60px"
                enabled=${selectedWidgets.length > 0}
                Value=${commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.Stepping))}
                Minimum=${0}
                onInput=${(Event:Indexable) => doConfigureSelectedWidgets('Stepping',parseFloat(Event.target.value))}
              />
            </>
            <${WAD_horizontally}>
              <${WAD_Label}>Maximum</>
              <${WAD_Gap}/>
              <${WAD_IntegerInput} style="width:60px"
                enabled=${selectedWidgets.length > 0}
                Value=${commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.Maximum))}
                onInput=${(Event:Indexable) => doConfigureSelectedWidgets('Maximum',parseFloat(Event.target.value))}
              />
            </>
            <${WAD_horizontally}>
              <${WAD_Label}>Hashmarks (one per line)</>
            </>

            <${WAD_TextInput} Placeholder="(enter hashmark list)" style="min-height:60px"
              enabled=${selectedWidgets.length > 0}
                Value=${commonListLiteralOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.Hashmarks))}
                onInput=${(Event:Indexable) => doConfigureSelectedWidgets('Hashmarks',Event.target.value.trim().split(/\s*\n\s*/))}
            />

          `}

          ${(['TextlineInput','SearchInput'].indexOf(commonType) >= 0) && html`
            <${WAD_horizontally}>
              <${WAD_Label}>Placeholder</>
              <${WAD_Gap}/>
              <${WAD_TextlineInput} style="flex:1 0 auto"
                enabled=${selectedWidgets.length > 0}
                Value=${commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.Placeholder))}
                onInput=${(Event:Indexable) => doConfigureSelectedWidgets('Placeholder',Event.target.value)}
              />
            </>

            <${WAD_horizontally}>
              <${WAD_Label}>read-only</>
              <${WAD_Gap}/>
              <${WAD_Checkbox}
                enabled=${selectedWidgets.length > 0}
                Value=${commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.readonly))}
                onInput=${(Event:Indexable) => doConfigureSelectedWidgets('readonly',Event.target.checked)}
              />
            </>

            <${WAD_horizontally}>
              <${WAD_Label}>min. Input Length</>
              <${WAD_Gap}/>
              <${WAD_IntegerInput} style="width:60px"
                enabled=${selectedWidgets.length > 0}
                Value=${commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.minLength))}
                Minimum=${0}
                onInput=${(Event:Indexable) => doConfigureSelectedWidgets('minLength',parseFloat(Event.target.value))}
              />
            </>

            <${WAD_horizontally}>
              <${WAD_Label}>max. Input Length</>
              <${WAD_Gap}/>
              <${WAD_IntegerInput} style="width:60px"
                enabled=${selectedWidgets.length > 0}
                Value=${commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.maxLength))}
                Minimum=${0}
                onInput=${(Event:Indexable) => doConfigureSelectedWidgets('maxLength',parseFloat(Event.target.value))}
              />
            </>

            <${WAD_horizontally}>
              <${WAD_Label}>Input Pattern</>
              <${WAD_Gap}/>
              <${WAD_TextlineInput} style="flex:1 0 auto"
                enabled=${selectedWidgets.length > 0}
                Value=${commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.Pattern))}
                onInput=${(Event:Indexable) => doConfigureSelectedWidgets('Pattern',Event.target.value)}
              />
            </>

            <${WAD_horizontally}>
              <${WAD_Label}>check Spelling</>
              <${WAD_Gap}/>
              <${WAD_Checkbox}
                enabled=${selectedWidgets.length > 0}
                Value=${commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.SpellChecking))}
                onInput=${(Event:Indexable) => doConfigureSelectedWidgets('SpellChecking',Event.target.checked)}
              />
            </>

            <${WAD_horizontally}>
              <${WAD_Label}>Suggestions (one per line)</>
            </>

            <${WAD_TextInput} Placeholder="(enter value list)" style="min-height:60px"
              enabled=${selectedWidgets.length > 0}
                Value=${commonListLiteralOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.Suggestions))}
                onInput=${(Event:Indexable) => doConfigureSelectedWidgets('Suggestions',Event.target.value.trim().split(/\s*\n\s*/))}
            />

          `}

          ${(commonType === 'PasswordInput') && html`
            <${WAD_horizontally}>
              <${WAD_Label}>Placeholder</>
              <${WAD_Gap}/>
              <${WAD_TextlineInput} style="flex:1 0 auto"
                enabled=${selectedWidgets.length > 0}
                Value=${commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.Placeholder))}
                onInput=${(Event:Indexable) => doConfigureSelectedWidgets('Placeholder',Event.target.value)}
              />
            </>

            <${WAD_horizontally}>
              <${WAD_Label}>read-only</>
              <${WAD_Gap}/>
              <${WAD_Checkbox}
                enabled=${selectedWidgets.length > 0}
                Value=${commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.readonly))}
                onInput=${(Event:Indexable) => doConfigureSelectedWidgets('readonly',Event.target.checked)}
              />
            </>

            <${WAD_horizontally}>
              <${WAD_Label}>min. Input Length</>
              <${WAD_Gap}/>
              <${WAD_IntegerInput} style="width:60px"
                enabled=${selectedWidgets.length > 0}
                Value=${commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.minLength))}
                Minimum=${0}
                onInput=${(Event:Indexable) => doConfigureSelectedWidgets('minLength',parseFloat(Event.target.value))}
              />
            </>

            <${WAD_horizontally}>
              <${WAD_Label}>max. Input Length</>
              <${WAD_Gap}/>
              <${WAD_IntegerInput} style="width:60px"
                enabled=${selectedWidgets.length > 0}
                Value=${commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.maxLength))}
                Minimum=${0}
                onInput=${(Event:Indexable) => doConfigureSelectedWidgets('maxLength',parseFloat(Event.target.value))}
              />
            </>

            <${WAD_horizontally}>
              <${WAD_Label}>Input Pattern</>
              <${WAD_Gap}/>
              <${WAD_TextlineInput} style="flex:1 0 auto"
                enabled=${selectedWidgets.length > 0}
                Value=${commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.Pattern))}
                onInput=${(Event:Indexable) => doConfigureSelectedWidgets('Pattern',Event.target.value)}
              />
            </>


          `}

          ${(commonType === 'NumberInput') && html`
            <${WAD_horizontally}>
              <${WAD_Label}>Placeholder</>
              <${WAD_Gap}/>
              <${WAD_TextlineInput} style="flex:1 0 auto"
                enabled=${selectedWidgets.length > 0}
                Value=${commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.Placeholder))}
                onInput=${(Event:Indexable) => doConfigureSelectedWidgets('Placeholder',Event.target.value)}
              />
            </>

            <${WAD_horizontally}>
              <${WAD_Label}>read-only</>
              <${WAD_Gap}/>
              <${WAD_Checkbox}
                enabled=${selectedWidgets.length > 0}
                Value=${commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.readonly))}
                onInput=${(Event:Indexable) => doConfigureSelectedWidgets('readonly',Event.target.checked)}
              />
            </>

            <${WAD_horizontally}>
              <${WAD_Label}>Minimum</>
              <${WAD_Gap}/>
              <${WAD_IntegerInput} style="width:60px"
                enabled=${selectedWidgets.length > 0}
                Value=${commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.Minimum))}
                onInput=${(Event:Indexable) => doConfigureSelectedWidgets('Minimum',parseFloat(Event.target.value))}
              />
            </>
            <${WAD_horizontally}>
              <${WAD_Label}>Stepping</>
              <${WAD_Gap}/>
              <${WAD_IntegerInput} style="width:60px"
                enabled=${selectedWidgets.length > 0}
                Value=${commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.Stepping))}
                Minimum=${0}
                onInput=${(Event:Indexable) => doConfigureSelectedWidgets('Stepping',parseFloat(Event.target.value))}
              />
            </>
            <${WAD_horizontally}>
              <${WAD_Label}>Maximum</>
              <${WAD_Gap}/>
              <${WAD_IntegerInput} style="width:60px"
                enabled=${selectedWidgets.length > 0}
                Value=${commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.Maximum))}
                onInput=${(Event:Indexable) => doConfigureSelectedWidgets('Maximum',parseFloat(Event.target.value))}
              />
            </>
            <${WAD_horizontally}>
              <${WAD_Label}>Suggestions (one per line)</>
            </>

            <${WAD_TextInput} Placeholder="(enter value list)" style="min-height:60px"
              enabled=${selectedWidgets.length > 0}
                Value=${commonListLiteralOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.Suggestions))}
                onInput=${(Event:Indexable) => doConfigureSelectedWidgets('Suggestions',Event.target.value.trim().split(/\s*\n\s*/).map(Number))}
            />

          `}

          ${(commonType === 'PhoneNumberInput') && html`
            <${WAD_horizontally}>
              <${WAD_Label}>Placeholder</>
              <${WAD_Gap}/>
              <${WAD_TextlineInput} style="flex:1 0 auto"
                enabled=${selectedWidgets.length > 0}
                Value=${commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.Placeholder))}
                onInput=${(Event:Indexable) => doConfigureSelectedWidgets('Placeholder',Event.target.value)}
              />
            </>

            <${WAD_horizontally}>
              <${WAD_Label}>read-only</>
              <${WAD_Gap}/>
              <${WAD_Checkbox}
                enabled=${selectedWidgets.length > 0}
                Value=${commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.readonly))}
                onInput=${(Event:Indexable) => doConfigureSelectedWidgets('readonly',Event.target.checked)}
              />
            </>

            <${WAD_horizontally}>
              <${WAD_Label}>min. Input Length</>
              <${WAD_Gap}/>
              <${WAD_IntegerInput} style="width:60px"
                enabled=${selectedWidgets.length > 0}
                Value=${commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.minLength))}
                Minimum=${0}
                onInput=${(Event:Indexable) => doConfigureSelectedWidgets('minLength',parseFloat(Event.target.value))}
              />
            </>

            <${WAD_horizontally}>
              <${WAD_Label}>max. Input Length</>
              <${WAD_Gap}/>
              <${WAD_IntegerInput} style="width:60px"
                enabled=${selectedWidgets.length > 0}
                Value=${commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.maxLength))}
                Minimum=${0}
                onInput=${(Event:Indexable) => doConfigureSelectedWidgets('maxLength',parseFloat(Event.target.value))}
              />
            </>

            <${WAD_horizontally}>
              <${WAD_Label}>Input Pattern</>
              <${WAD_Gap}/>
              <${WAD_TextlineInput} style="flex:1 0 auto"
                enabled=${selectedWidgets.length > 0}
                Value=${commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.Pattern))}
                onInput=${(Event:Indexable) => doConfigureSelectedWidgets('Pattern',Event.target.value)}
              />
            </>

            <${WAD_horizontally}>
              <${WAD_Label}>Suggestions (one per line)</>
            </>

            <${WAD_TextInput} Placeholder="(enter value list)" style="min-height:60px"
              enabled=${selectedWidgets.length > 0}
                Value=${commonListLiteralOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.Suggestions))}
                onInput=${(Event:Indexable) => doConfigureSelectedWidgets('Suggestions',Event.target.value.trim().split(/\s*\n\s*/))}
            />

          `}

          ${(commonType === 'EMailAddressInput') && html`
            <${WAD_horizontally}>
              <${WAD_Label}>Placeholder</>
              <${WAD_Gap}/>
              <${WAD_TextlineInput} style="flex:1 0 auto"
                enabled=${selectedWidgets.length > 0}
                Value=${commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.Placeholder))}
                onInput=${(Event:Indexable) => doConfigureSelectedWidgets('Placeholder',Event.target.value)}
              />
            </>

            <${WAD_horizontally}>
              <${WAD_Label}>read-only</>
              <${WAD_Gap}/>
              <${WAD_Checkbox}
                enabled=${selectedWidgets.length > 0}
                Value=${commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.readonly))}
                onInput=${(Event:Indexable) => doConfigureSelectedWidgets('readonly',Event.target.checked)}
              />
            </>

            <${WAD_horizontally}>
              <${WAD_Label}>min. Input Length</>
              <${WAD_Gap}/>
              <${WAD_IntegerInput} style="width:60px"
                enabled=${selectedWidgets.length > 0}
                Value=${commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.minLength))}
                Minimum=${0}
                onInput=${(Event:Indexable) => doConfigureSelectedWidgets('minLength',parseFloat(Event.target.value))}
              />
            </>

            <${WAD_horizontally}>
              <${WAD_Label}>max. Input Length</>
              <${WAD_Gap}/>
              <${WAD_IntegerInput} style="width:60px"
                enabled=${selectedWidgets.length > 0}
                Value=${commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.maxLength))}
                Minimum=${0}
                onInput=${(Event:Indexable) => doConfigureSelectedWidgets('maxLength',parseFloat(Event.target.value))}
              />
            </>

            <${WAD_horizontally}>
              <${WAD_Label}>Input Pattern</>
              <${WAD_Gap}/>
              <${WAD_TextlineInput} style="flex:1 0 auto"
                enabled=${selectedWidgets.length > 0}
                Value=${commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.Pattern))}
                onInput=${(Event:Indexable) => doConfigureSelectedWidgets('Pattern',Event.target.value)}
              />
            </>

            <${WAD_horizontally}>
              <${WAD_Label}>Suggestions (one per line)</>
            </>

            <${WAD_TextInput} Placeholder="(enter value list)" style="min-height:60px"
              enabled=${selectedWidgets.length > 0}
                Value=${commonListLiteralOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.Suggestions))}
                onInput=${(Event:Indexable) => doConfigureSelectedWidgets('Suggestions',Event.target.value.trim().split(/\s*\n\s*/))}
            />

          `}

          ${(commonType === 'URLInput') && html`
            <${WAD_horizontally}>
              <${WAD_Label}>Placeholder</>
              <${WAD_Gap}/>
              <${WAD_TextlineInput} style="flex:1 0 auto"
                enabled=${selectedWidgets.length > 0}
                Value=${commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.Placeholder))}
                onInput=${(Event:Indexable) => doConfigureSelectedWidgets('Placeholder',Event.target.value)}
              />
            </>

            <${WAD_horizontally}>
              <${WAD_Label}>read-only</>
              <${WAD_Gap}/>
              <${WAD_Checkbox}
                enabled=${selectedWidgets.length > 0}
                Value=${commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.readonly))}
                onInput=${(Event:Indexable) => doConfigureSelectedWidgets('readonly',Event.target.checked)}
              />
            </>

            <${WAD_horizontally}>
              <${WAD_Label}>min. Input Length</>
              <${WAD_Gap}/>
              <${WAD_IntegerInput} style="width:60px"
                enabled=${selectedWidgets.length > 0}
                Value=${commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.minLength))}
                Minimum=${0}
                onInput=${(Event:Indexable) => doConfigureSelectedWidgets('minLength',parseFloat(Event.target.value))}
              />
            </>

            <${WAD_horizontally}>
              <${WAD_Label}>max. Input Length</>
              <${WAD_Gap}/>
              <${WAD_IntegerInput} style="width:60px"
                enabled=${selectedWidgets.length > 0}
                Value=${commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.maxLength))}
                Minimum=${0}
                onInput=${(Event:Indexable) => doConfigureSelectedWidgets('maxLength',parseFloat(Event.target.value))}
              />
            </>

            <${WAD_horizontally}>
              <${WAD_Label}>Input Pattern</>
              <${WAD_Gap}/>
              <${WAD_TextlineInput} style="flex:1 0 auto"
                enabled=${selectedWidgets.length > 0}
                Value=${commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.Pattern))}
                onInput=${(Event:Indexable) => doConfigureSelectedWidgets('Pattern',Event.target.value)}
              />
            </>

            <${WAD_horizontally}>
              <${WAD_Label}>Suggestions (one per line)</>
            </>

            <${WAD_TextInput} Placeholder="(enter value list)" style="min-height:60px"
              enabled=${selectedWidgets.length > 0}
                Value=${commonListLiteralOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.Suggestions))}
                onInput=${(Event:Indexable) => doConfigureSelectedWidgets('Suggestions',Event.target.value.trim().split(/\s*\n\s*/))}
            />

          `}

          ${(commonType === 'TimeInput') && html`
            <${WAD_horizontally}>
              <${WAD_Label}>read-only</>
              <${WAD_Gap}/>
              <${WAD_Checkbox}
                enabled=${selectedWidgets.length > 0}
                Value=${commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.readonly))}
                onInput=${(Event:Indexable) => doConfigureSelectedWidgets('readonly',Event.target.checked)}
              />
            </>

            <${WAD_horizontally}>
              <${WAD_Label}>with Seconds</>
              <${WAD_Gap}/>
              <${WAD_Checkbox}
                enabled=${selectedWidgets.length > 0}
                Value=${commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.withSeconds))}
                onInput=${(Event:Indexable) => doConfigureSelectedWidgets('withSeconds',Event.target.checked)}
              />
            </>

            <${WAD_horizontally}>
              <${WAD_Label}>earliest Time</>
              <${WAD_Gap}/>
              <${WAD_TextlineInput} style="flex:1 0 auto"
                enabled=${selectedWidgets.length > 0}
                Value=${commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.Minimum))}
                Pattern=${WAT_TimePattern}
                onInput=${(Event:Indexable) => doConfigureSelectedWidgets('Minimum',Event.target.value)}
              />
            </>

            <${WAD_horizontally}>
              <${WAD_Label}>latest Time</>
              <${WAD_Gap}/>
              <${WAD_TextlineInput} style="flex:1 0 auto"
                enabled=${selectedWidgets.length > 0}
                Value=${commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.Maximum))}
                Pattern=${WAT_TimePattern}
                onInput=${(Event:Indexable) => doConfigureSelectedWidgets('Maximum',Event.target.value)}
              />
            </>

            <${WAD_horizontally}>
              <${WAD_Label}>Suggestions (one per line)</>
            </>

            <${WAD_TextInput} Placeholder="(enter value list)" style="min-height:60px"
              enabled=${selectedWidgets.length > 0}
                Value=${commonListLiteralOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.Suggestions))}
                onInput=${(Event:Indexable) => doConfigureSelectedWidgets('Suggestions',Event.target.value.trim().split(/\s*\n\s*/))}
            />

          `}

          ${(commonType === 'DateTimeInput') && html`
            <${WAD_horizontally}>
              <${WAD_Label}>read-only</>
              <${WAD_Gap}/>
              <${WAD_Checkbox}
                enabled=${selectedWidgets.length > 0}
                Value=${commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.readonly))}
                onInput=${(Event:Indexable) => doConfigureSelectedWidgets('readonly',Event.target.checked)}
              />
            </>

            <${WAD_horizontally}>
              <${WAD_Label}>with Seconds</>
              <${WAD_Gap}/>
              <${WAD_Checkbox}
                enabled=${selectedWidgets.length > 0}
                Value=${commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.withSeconds))}
                onInput=${(Event:Indexable) => doConfigureSelectedWidgets('withSeconds',Event.target.checked)}
              />
            </>

            <${WAD_horizontally}>
              <${WAD_Label}>earliest Point of Time</>
              <${WAD_Gap}/>
              <${WAD_TextlineInput} style="flex:1 0 auto"
                enabled=${selectedWidgets.length > 0}
                Value=${commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.Minimum))}
                Pattern=${WAT_DateTimePattern}
                onInput=${(Event:Indexable) => doConfigureSelectedWidgets('Minimum',Event.target.value)}
              />
            </>

            <${WAD_horizontally}>
              <${WAD_Label}>latest Point of Time</>
              <${WAD_Gap}/>
              <${WAD_TextlineInput} style="flex:1 0 auto"
                enabled=${selectedWidgets.length > 0}
                Value=${commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.Maximum))}
                Pattern=${WAT_DateTimePattern}
                onInput=${(Event:Indexable) => doConfigureSelectedWidgets('Maximum',Event.target.value)}
              />
            </>

            <${WAD_horizontally}>
              <${WAD_Label}>Suggestions (one per line)</>
            </>

            <${WAD_TextInput} Placeholder="(enter value list)" style="min-height:60px"
              enabled=${selectedWidgets.length > 0}
                Value=${commonListLiteralOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.Suggestions))}
                onInput=${(Event:Indexable) => doConfigureSelectedWidgets('Suggestions',Event.target.value.trim().split(/\s*\n\s*/))}
            />

          `}

          ${(commonType === 'DateInput') && html`
            <${WAD_horizontally}>
              <${WAD_Label}>read-only</>
              <${WAD_Gap}/>
              <${WAD_Checkbox}
                enabled=${selectedWidgets.length > 0}
                Value=${commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.readonly))}
                onInput=${(Event:Indexable) => doConfigureSelectedWidgets('readonly',Event.target.checked)}
              />
            </>

            <${WAD_horizontally}>
              <${WAD_Label}>earliest Date</>
              <${WAD_Gap}/>
              <${WAD_TextlineInput} style="flex:1 0 auto"
                enabled=${selectedWidgets.length > 0}
                Value=${commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.Minimum))}
                Pattern=${WAT_DatePattern}
                onInput=${(Event:Indexable) => doConfigureSelectedWidgets('Minimum',Event.target.value)}
              />
            </>

            <${WAD_horizontally}>
              <${WAD_Label}>latest Date</>
              <${WAD_Gap}/>
              <${WAD_TextlineInput} style="flex:1 0 auto"
                enabled=${selectedWidgets.length > 0}
                Value=${commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.Maximum))}
                Pattern=${WAT_DatePattern}
                onInput=${(Event:Indexable) => doConfigureSelectedWidgets('Maximum',Event.target.value)}
              />
            </>

            <${WAD_horizontally}>
              <${WAD_Label}>Suggestions (one per line)</>
            </>

            <${WAD_TextInput} Placeholder="(enter value list)" style="min-height:60px"
              enabled=${selectedWidgets.length > 0}
                Value=${commonListLiteralOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.Suggestions))}
                onInput=${(Event:Indexable) => doConfigureSelectedWidgets('Suggestions',Event.target.value.trim().split(/\s*\n\s*/))}
            />

          `}

          ${(commonType === 'WeekInput') && html`
            <${WAD_horizontally}>
              <${WAD_Label}>read-only</>
              <${WAD_Gap}/>
              <${WAD_Checkbox}
                enabled=${selectedWidgets.length > 0}
                Value=${commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.readonly))}
                onInput=${(Event:Indexable) => doConfigureSelectedWidgets('readonly',Event.target.checked)}
              />
            </>

            <${WAD_horizontally}>
              <${WAD_Label}>earliest Week</>
              <${WAD_Gap}/>
              <${WAD_TextlineInput} style="flex:1 0 auto"
                enabled=${selectedWidgets.length > 0}
                Value=${commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.Minimum))}
                Pattern=${WAT_WeekPattern}
                onInput=${(Event:Indexable) => doConfigureSelectedWidgets('Minimum',Event.target.value)}
              />
            </>

            <${WAD_horizontally}>
              <${WAD_Label}>latest Week</>
              <${WAD_Gap}/>
              <${WAD_TextlineInput} style="flex:1 0 auto"
                enabled=${selectedWidgets.length > 0}
                Value=${commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.Maximum))}
                Pattern=${WAT_WeekPattern}
                onInput=${(Event:Indexable) => doConfigureSelectedWidgets('Maximum',Event.target.value)}
              />
            </>

            <${WAD_horizontally}>
              <${WAD_Label}>Suggestions (one per line)</>
            </>

            <${WAD_TextInput} Placeholder="(enter value list)" style="min-height:60px"
              enabled=${selectedWidgets.length > 0}
                Value=${commonListLiteralOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.Suggestions))}
                onInput=${(Event:Indexable) => doConfigureSelectedWidgets('Suggestions',Event.target.value.trim().split(/\s*\n\s*/))}
            />

          `}

          ${(commonType === 'MonthInput') && html`
            <${WAD_horizontally}>
              <${WAD_Label}>read-only</>
              <${WAD_Gap}/>
              <${WAD_Checkbox}
                enabled=${selectedWidgets.length > 0}
                Value=${commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.readonly))}
                onInput=${(Event:Indexable) => doConfigureSelectedWidgets('readonly',Event.target.checked)}
              />
            </>

            <${WAD_horizontally}>
              <${WAD_Label}>earliest Month</>
              <${WAD_Gap}/>
              <${WAD_TextlineInput} style="flex:1 0 auto"
                enabled=${selectedWidgets.length > 0}
                Value=${commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.Minimum))}
                Pattern=${WAT_MonthPattern}
                onInput=${(Event:Indexable) => doConfigureSelectedWidgets('Minimum',Event.target.value)}
              />
            </>

            <${WAD_horizontally}>
              <${WAD_Label}>latest Month</>
              <${WAD_Gap}/>
              <${WAD_TextlineInput} style="flex:1 0 auto"
                enabled=${selectedWidgets.length > 0}
                Value=${commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.Maximum))}
                Pattern=${WAT_MonthPattern}
                onInput=${(Event:Indexable) => doConfigureSelectedWidgets('Maximum',Event.target.value)}
              />
            </>

            <${WAD_horizontally}>
              <${WAD_Label}>Suggestions (one per line)</>
            </>

            <${WAD_TextInput} Placeholder="(enter value list)" style="min-height:60px"
              enabled=${selectedWidgets.length > 0}
                Value=${commonListLiteralOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.Suggestions))}
                onInput=${(Event:Indexable) => doConfigureSelectedWidgets('Suggestions',Event.target.value.trim().split(/\s*\n\s*/))}
            />

          `}

          ${(commonType === 'FileInput') && html`
            <${WAD_horizontally}>
              <${WAD_Label}>Placeholder</>
              <${WAD_Gap}/>
              <${WAD_TextlineInput} style="flex:1 0 auto"
                enabled=${selectedWidgets.length > 0}
                Value=${commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.Placeholder))}
                onInput=${(Event:Indexable) => doConfigureSelectedWidgets('Placeholder',Event.target.value)}
              />
            </>

            <${WAD_horizontally}>
              <${WAD_Label}>acceptable Types</>
              <${WAD_Gap}/>
              <${WAD_TextlineInput} style="flex:1 0 auto"
                enabled=${selectedWidgets.length > 0}
                Value=${commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.acceptableTypes))}
                onInput=${(Event:Indexable) => doConfigureSelectedWidgets('acceptableTypes',Event.target.value)}
              />
            </>

         <${WAD_horizontally}>
              <${WAD_Label}>multiple Files</>
              <${WAD_Gap}/>
              <${WAD_Checkbox}
                enabled=${selectedWidgets.length > 0}
                Value=${commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.allowMultiple))}
                onInput=${(Event:Indexable) => doConfigureSelectedWidgets('allowMultiple',Event.target.checked)}
              />
            </>
          `}

          ${(commonType === 'PseudoFileInput') && html`
            <${WAD_horizontally}>
              <${WAD_Label}>Icon URL</>
              <${WAD_Gap}/>
              <${WAD_URLInput} style="flex:1 0 auto"
                enabled=${selectedWidgets.length > 0}
                Value=${commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.Icon))}
                onInput=${(Event:Indexable) => doConfigureSelectedWidgets('Icon',Event.target.value)}
              />
            </>

            <${WAD_horizontally}>
              <${WAD_Label}>acceptable Types</>
              <${WAD_Gap}/>
              <${WAD_TextlineInput} style="flex:1 0 auto"
                enabled=${selectedWidgets.length > 0}
                Value=${commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.acceptableTypes))}
                onInput=${(Event:Indexable) => doConfigureSelectedWidgets('acceptableTypes',Event.target.value)}
              />
            </>

         <${WAD_horizontally}>
              <${WAD_Label}>multiple Files</>
              <${WAD_Gap}/>
              <${WAD_Checkbox}
                enabled=${selectedWidgets.length > 0}
                Value=${commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.allowMultiple))}
                onInput=${(Event:Indexable) => doConfigureSelectedWidgets('allowMultiple',Event.target.checked)}
              />
            </>
          `}

          ${(commonType === 'FileDropArea') && html`
            <${WAD_horizontally}>
              <${WAD_Label}>Placeholder</>
              <${WAD_Gap}/>
              <${WAD_TextlineInput} style="flex:1 0 auto"
                enabled=${selectedWidgets.length > 0}
                Value=${commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.Placeholder))}
                onInput=${(Event:Indexable) => doConfigureSelectedWidgets('Placeholder',Event.target.value)}
              />
            </>

            <${WAD_horizontally}>
              <${WAD_Label}>acceptable Types</>
              <${WAD_Gap}/>
              <${WAD_TextlineInput} style="flex:1 0 auto"
                enabled=${selectedWidgets.length > 0}
                Value=${commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.acceptableTypes))}
                onInput=${(Event:Indexable) => doConfigureSelectedWidgets('acceptableTypes',Event.target.value)}
              />
            </>

         <${WAD_horizontally}>
              <${WAD_Label}>multiple Files</>
              <${WAD_Gap}/>
              <${WAD_Checkbox}
                enabled=${selectedWidgets.length > 0}
                Value=${commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.allowMultiple))}
                onInput=${(Event:Indexable) => doConfigureSelectedWidgets('allowMultiple',Event.target.checked)}
              />
            </>
          `}

          ${(commonType === 'ColorInput') && html`
            <${WAD_horizontally}>
              <${WAD_Label}>Suggestions (one per line)</>
            </>

            <${WAD_TextInput} Placeholder="(enter value list)" style="min-height:60px"
              enabled=${selectedWidgets.length > 0}
                Value=${commonListLiteralOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.Suggestions))}
                onInput=${(Event:Indexable) => doConfigureSelectedWidgets('Suggestions',Event.target.value.trim().split(/\s*\n\s*/))}
            />

          `}

          ${(commonType === 'DropDown') && html`
            <${WAD_horizontally}>
              <${WAD_Label}>Options (one per line)</>
            </>

            <${WAD_TextInput} Placeholder="(enter value list)" style="min-height:60px"
              enabled=${selectedWidgets.length > 0}
                Value=${commonListLiteralOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.Options))}
                onInput=${(Event:Indexable) => doConfigureSelectedWidgets('Options',Event.target.value.trim().split(/\s*\n\s*/))}
            />

          `}

          ${(commonType === 'PseudoDropDown') && html`
            <${WAD_horizontally}>
              <${WAD_Label}>Icon URL</>
              <${WAD_Gap}/>
              <${WAD_URLInput} style="flex:1 0 auto"
                enabled=${selectedWidgets.length > 0}
                Value=${commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.Icon))}
                onInput=${(Event:Indexable) => doConfigureSelectedWidgets('Icon',Event.target.value)}
              />
            </>

            <${WAD_horizontally}>
              <${WAD_Label}>Options (one per line)</>
            </>

            <${WAD_TextInput} Placeholder="(enter value list)" style="min-height:60px"
              enabled=${selectedWidgets.length > 0}
                Value=${commonListLiteralOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.Options))}
                onInput=${(Event:Indexable) => doConfigureSelectedWidgets('Options',Event.target.value.trim().split(/\s*\n\s*/))}
            />

          `}

          ${(commonType === 'TextInput') && html`
            <${WAD_horizontally}>
              <${WAD_Label}>Placeholder</>
              <${WAD_Gap}/>
              <${WAD_TextlineInput} style="flex:1 0 auto"
                enabled=${selectedWidgets.length > 0}
                Value=${commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.Placeholder))}
                onInput=${(Event:Indexable) => doConfigureSelectedWidgets('Placeholder',Event.target.value)}
              />
            </>

            <${WAD_horizontally}>
              <${WAD_Label}>read-only</>
              <${WAD_Gap}/>
              <${WAD_Checkbox}
                enabled=${selectedWidgets.length > 0}
                Value=${commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.readonly))}
                onInput=${(Event:Indexable) => doConfigureSelectedWidgets('readonly',Event.target.checked)}
              />
            </>

            <${WAD_horizontally}>
              <${WAD_Label}>min. Input Length</>
              <${WAD_Gap}/>
              <${WAD_IntegerInput} style="width:60px"
                enabled=${selectedWidgets.length > 0}
                Value=${commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.minLength))}
                Minimum=${0}
                onInput=${(Event:Indexable) => doConfigureSelectedWidgets('minLength',parseFloat(Event.target.value))}
              />
            </>

            <${WAD_horizontally}>
              <${WAD_Label}>max. Input Length</>
              <${WAD_Gap}/>
              <${WAD_IntegerInput} style="width:60px"
                enabled=${selectedWidgets.length > 0}
                Value=${commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.maxLength))}
                Minimum=${0}
                onInput=${(Event:Indexable) => doConfigureSelectedWidgets('maxLength',parseFloat(Event.target.value))}
              />
            </>

            <${WAD_horizontally}>
              <${WAD_Label}>wrap Lines</>
              <${WAD_Gap}/>
              <${WAD_Checkbox}
                enabled=${selectedWidgets.length > 0}
                Value=${commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.LineWrapping))}
                onInput=${(Event:Indexable) => doConfigureSelectedWidgets('LineWrapping',Event.target.checked)}
              />
            </>

            <${WAD_horizontally}>
              <${WAD_Label}>Suggestions (one per line)</>
            </>

            <${WAD_TextInput} Placeholder="(enter value list)" style="min-height:60px"
              enabled=${selectedWidgets.length > 0}
                Value=${commonListLiteralOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.Suggestions))}
                onInput=${(Event:Indexable) => doConfigureSelectedWidgets('Suggestions',Event.target.value.trim().split(/\s*\n\s*/))}
            />

          `}

          ${(['TextTab','IconTab'].indexOf(commonType) >= 0) && html`
            <${WAD_horizontally}>
              <${WAD_Label}>active</>
              <${WAD_Gap}/>
              <${WAD_Checkbox}
                enabled=${selectedWidgets.length > 0}
                Value=${commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.Activation))}
                onInput=${(Event:Indexable) => doConfigureSelectedWidgets('Activation',Event.target.checked)}
              />
            </>
          `}

          ${(commonType === 'TabStrip') && html`

          `}          ${(commonType === 'FlatListView') && html`
            <${WAD_horizontally}>
              <${WAD_Label}>Placeholder</>
              <${WAD_Gap}/>
              <${WAD_TextlineInput} style="flex:1 0 auto"
                enabled=${selectedWidgets.length > 0}
                Value=${commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.Placeholder))}
                onInput=${(Event:Indexable) => doConfigureSelectedWidgets('Placeholder',Event.target.value)}
              />
            </>

            <${WAD_horizontally}>
              <${WAD_Label}>Selection Limit</>
              <${WAD_Gap}/>
              <${WAD_IntegerInput} style="width:60px"
                enabled=${selectedWidgets.length > 0}
                Value=${commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.SelectionLimit))}
                Minimum=${0}
                onInput=${(Event:Indexable) => doConfigureSelectedWidgets('SelectionLimit',parseFloat(Event.target.value))}
              />
            </>


          `}
          <${WAD_horizontally}>
            <${WAD_Label}>Value</>
            <${WAD_Gap}/>
            <${WAD_Icon} Icon="${IconFolder}/clapperboard.png"
              active=${DialogIsOpen('ValueEditor')}
              onClick=${(Event:PointerEvent) => toggleDialog('ValueEditor',Event)}
            />
          </>

          <${WAD_TextInput} Placeholder="(enter value)" style="min-height:60px"
            enabled=${selectedWidgets.length > 0}
            Value=${ValueToEdit} onInput=${_onValueInput}
          />
        </>

      </>

      <${WAD_horizontally}>
        <${WAD_ErrorView} style="flex:1 1 auto" ErrorReport=${ReportToShow}/>
        <${WAD_Icon} Icon="${IconFolder}/triangle-exclamation.png" style="
          display:${ReportToShow == null ? 'none' : 'block'};
          padding-top:6px;
        " onClick=${() => {
            const { ReportToShow } = DesignerState.Inspector
            window.alert(ReportToShow.Type + '\n\n' + ReportToShow.Message)
          }}
        />
      </>
     </>
    </>`
  }

//------------------------------------------------------------------------------
//--                             WAD_ValueEditor                              --
//------------------------------------------------------------------------------

  function WAD_ValueEditor () {
    const onClose = useCallback(() => closeDialog('ValueEditor'))

    const { selectedWidgets } = DesignerState

    let ValueType:string = 'string'
    let ValueToEdit = commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.Value))
      switch (true) {
        case (ValueToEdit == null):
        case (ValueToEdit === multipleValues):
        case (ValueToEdit === noSelection):
          break
        default:
          ValueType = typeof ValueToEdit
          if (ValueType === 'object') {
            ValueToEdit = JSON.stringify(ValueToEdit,null,2)
          } else {
            ValueToEdit = '' + ValueToEdit
          }
      }
    function _onValueInput (Event:Indexable) {
      const editedValue = Event.target.value; let Value:any = undefined
        switch (ValueType) {
          case 'boolean': Value = Boolean(editedValue); break
          case 'number':  Value = Number(editedValue);  break
          case 'string':  Value = editedValue;          break
          default:        Value = JSON.parse(editedValue)           // may fail!
        }
      doConfigureSelectedWidgets('Value',Value)
    }

    return html`<${WAD_Dialog} Name="ValueEditor" resizable=${true}
      onClose=${onClose}
    >
     <${WAD_vertically} style="width:100%; height:100%; padding:4px">
      <${WAD_horizontally}>
        <${WAD_Label} style="width:52px">Visual</>
        <${WAD_TextlineInput} Placeholder="(visual name)" style="flex:1 0 auto"
          enabled=${selectedWidgets.length > 0}
          Value=${commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.Name))}
          onInput=${(Event:Indexable) => doConfigureSelectedWidgets('Name',Event.target.value)}
        />
      </>
      <${WAD_TextInput} Placeholder="(enter value)" style="flex:1 0 auto; padding-top:4px"
        enabled=${selectedWidgets.length > 0}
        Value=${ValueToEdit} onInput=${_onValueInput}
      />
     </>
    </>`
  }
  DesignerState.ValueEditor.View = WAD_ValueEditor

//------------------------------------------------------------------------------
//--                             WAD_ScriptEditor                             --
//------------------------------------------------------------------------------

  function WAD_ScriptEditor () {
    const onClose = useCallback(() => closeDialog('ScriptEditor'))

    const { Applet } = DesignerState

    let activeScript:WAT_Text|undefined, pendingScript:WAT_Text|undefined
    let ErrorReport:WAT_ErrorReport|undefined, ScriptError:WAT_ErrorReport|undefined
                 // "activeScript" always exists, "pendingScript" may be missing

    const { Scope } = DesignerState.ScriptEditor
    switch (DesignerState.ScriptEditor.Scope) {
      case 'Applet':
        ;({ activeScript,pendingScript, ErrorReport,ScriptError } = Applet)
        break
      case 'visitedPage':
        ;({ activeScript,pendingScript, ErrorReport,ScriptError } = Applet.visitedPage)
        break
      case 'selectedWidgets':
        const { selectedWidgets } = DesignerState
        activeScript  = commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.activeScript))
        pendingScript = commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.pendingScript))
        ErrorReport   = commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.ErrorReport))
        ScriptError   = commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.ScriptError))
        break
    }

    const ScriptIsPending = ValueIsText(pendingScript) && (pendingScript !== activeScript)
    const ReportToShow    = ScriptError || ErrorReport
      DesignerState.ScriptEditor.ReportToShow = ReportToShow // *C* workaround

    const setScopeTo = useCallback((newScope:string) => {
      DesignerState.ScriptEditor.Scope = newScope
      WAT_rerender()
    },[])

    const setPendingScriptTo = useCallback((newScript:WAT_Text) => {
      switch (DesignerState.ScriptEditor.Scope) {
        case 'Applet':          return doConfigureApplet         ('pendingScript',newScript)
        case 'visitedPage':     return doConfigureVisitedPage    ('pendingScript',newScript)
        case 'selectedWidgets': return doConfigureSelectedWidgets('pendingScript',newScript)
      }
    },[])

    const applyPendingScript = useCallback(() => {
      switch (DesignerState.ScriptEditor.Scope) {
        case 'Applet':          return doApplyAppletScript()
        case 'visitedPage':     return doApplyVisitedPageScript()
        case 'selectedWidgets': return doApplySelectedWidgetsScript()
      }
    },[])

    return html`<${WAD_Dialog} Name="ScriptEditor" resizable=${true}
      onClose=${onClose}
    >
     <${WAD_vertically} style="width:100%; height:100%; padding:4px">
      <${WAD_horizontally}>
        <${WAD_Label}>Scope</>
          <div style="width:8px"/>
        <${WAD_DropDown}
          Value=${Scope} Options=${[ 'Applet','visitedPage','selectedWidgets' ]}
          onInput=${(Event:Indexable) => setScopeTo(Event.target.value)}
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
        onInput=${(Event:Indexable) => setPendingScriptTo(Event.target.value)}
      />

      <${WAD_horizontally}>
        <${WAD_ErrorView} style="flex:1 1 auto" ErrorReport=${ReportToShow}/>
        <${WAD_Icon} Icon="${IconFolder}/triangle-exclamation.png" style="
          display:${ValueIsErrorReport(ReportToShow) ? 'block' : 'none'};
          padding-top:6px;
        " onClick=${() => {
          const { ReportToShow } = DesignerState.ScriptEditor
          window.alert(ReportToShow.Type + '\n\n' + ReportToShow.Message)
        }}/>
      </>
     </>
    </>`
  }
  DesignerState.ScriptEditor.View = WAD_ScriptEditor

//------------------------------------------------------------------------------
//--                              Layouter State                              --
//------------------------------------------------------------------------------

  const LayouterState:Indexable = {
    LayouterLayer:undefined,

    ShapeMode:        undefined,
    pointedWidget:    undefined,
    shapedWidgets:    [],   // actually shaped widgets (as selection may change)
    initialGeometries:[],               // initial geometries of "shapedWidgets"

    LassoMode:'enclose',
    SelectionBeforeLasso:[],
    LassoStart:{ x:0,y:0 },
    LassoEnd:  { x:0,y:0 },
  }

/**** focusLayouterLayer ****/

  LayouterState.LayouterLayer = undefined

  function focusLayouterLayer ():void {
    DesignerState.LayouterLayer?.focus()
  }

/**** Lasso Recognizer ****/

  LayouterState.LassoRecognizer = GestureRecognizer({
    onlyFrom:   '.WAD.LayouterLayer',
    ClickRadius:4,
    onDragStart:(dx:number,dy:number, x:number,y:number, Event:Indexable) => {
      LayouterState.SelectionBeforeLasso = DesignerState.selectedWidgets.slice()

      ;({ left:x,top:y } = fromViewportTo('local',{ left:x,top:y },Event.target))

      LayouterState.LassoStart = { x,y }
      dragLassoTo(x,y, Event.shiftKey || Event.metaKey)
      WAT_rerender()
    },
    onDragContinuation:(dx:number,dy:number, StartX:number,StartY:number, Event:Indexable) => {
      dragLassoTo(
        LayouterState.LassoStart.x+dx,LayouterState.LassoStart.y+dy,
        Event.shiftKey || Event.metaKey
      )
      WAT_rerender()
    },
    onDragFinish: (dx:number,dy:number, StartX:number,StartY:number, Event:Indexable) => {
      dragLassoTo(
        LayouterState.LassoStart.x+dx,LayouterState.LassoStart.y+dy,
        Event.shiftKey || Event.metaKey
      )
      applyLasso()
      WAT_rerender()
    },
    onDragAbortion:() => {
      abortLasso()
      WAT_rerender()
    },
    onClick:onPageClick
  })

/**** onCoverClick ****/

  function onCoverClick (
    x:number,y:number, StartX:number,StartY:number, Event:Indexable
  ):void {
    const Widget = LayouterState.pointedWidget as WAT_Widget

    let selectedWidgets = DesignerState.selectedWidgets.slice()

    let SelectionChanged:boolean = false
    if (Event.shiftKey || Event.metaKey) {     // additive/subtractive selection
      SelectionChanged = true
      if (WidgetIsSelected(Widget)) {
        selectedWidgets = selectedWidgets.filter(
          (selectedWidget:WAT_Widget) => (selectedWidget !== Widget)
        )
      } else {
        selectedWidgets.push(Widget)
      }
    } else {                                             // definitive selection
      SelectionChanged = ! WidgetIsSelected(Widget)
      selectedWidgets = [Widget]
    }

    if (SelectionChanged) {
      selectWidgets(selectedWidgets)                           // also rerenders
    }
  }

/**** Widget Drag/Select Recognizer ****/

  LayouterState.CoverRecognizer = GestureRecognizer({
    onlyFrom:   '.WAD.Cover',
    ClickRadius:4,
    onDragStart:(dx:number,dy:number, StartX:number,StartY:number, Event:Indexable) => {
      const { pointedWidget } = LayouterState
      if (! WidgetIsSelected(LayouterState.pointedWidget as WAT_Widget)) {
        if (Event.shiftKey || Event.metaKey) { // additive/subtractive selection
          selectWidgets([pointedWidget as WAT_Widget],DesignerState.selectedWidgets)
        } else {
          selectWidgets([pointedWidget as WAT_Widget])
        }
      }

      LayouterState.shapedWidgets     = sortedWidgetSelection()
      LayouterState.initialGeometries = LayouterState.shapedWidgets.map(
        (Widget:WAT_Widget) => Widget.Geometry
      )
      doChangeGeometriesBy(
        LayouterState.shapedWidgets,'c', dx,dy, LayouterState.initialGeometries
      )
    },
    onDragContinuation:(dx:number,dy:number) => {
      doChangeGeometriesBy(
        LayouterState.shapedWidgets,'c', dx,dy, LayouterState.initialGeometries
      )
    },
    onDragFinish: (dx:number,dy:number) => {
      doChangeGeometriesBy(
        LayouterState.shapedWidgets,'c', dx,dy, LayouterState.initialGeometries
      )
      finishDraggingAndShaping()
    },
    onDragAbortion:(dx:number,dy:number) => {
      doChangeGeometriesBy(
        LayouterState.shapedWidgets,'c', dx,dy, LayouterState.initialGeometries
      )
      abortDraggingAndShaping()
    },
    onClick:onCoverClick
  })

/**** ShapeHandle Drag Recognizer ****/

  LayouterState.ShapeHandleRecognizer = GestureRecognizer({
    onlyFrom:   '.WAD.ShapeHandle',
    ClickRadius:0,
    onDragStart:(dx:number,dy:number) => {
      LayouterState.shapedWidgets     = sortedWidgetSelection()
      LayouterState.initialGeometries = LayouterState.shapedWidgets.map(
        (Widget:WAT_Widget) => Widget.Geometry
      )
      doChangeGeometriesBy(
        LayouterState.shapedWidgets, LayouterState.ShapeMode, dx,dy,
        LayouterState.initialGeometries
      )
    },
    onDragContinuation:(dx:number,dy:number) => {
      doChangeGeometriesBy(
        LayouterState.shapedWidgets, LayouterState.ShapeMode, dx,dy,
        LayouterState.initialGeometries
      )
    },
    onDragFinish: (dx:number,dy:number) => {
      doChangeGeometriesBy(
        LayouterState.shapedWidgets, LayouterState.ShapeMode, dx,dy,
        LayouterState.initialGeometries
      )
      finishDraggingAndShaping()
    },
    onDragAbortion:(dx:number,dy:number) => {
      doChangeGeometriesBy(
        LayouterState.shapedWidgets, LayouterState.ShapeMode, dx,dy,
        LayouterState.initialGeometries
      )
      abortDraggingAndShaping()
    }
  })/**** GeometryOfLasso ****/

  function GeometryOfLasso ():WAT_Geometry {
    const { x:x0,y:y0 } = LayouterState.LassoStart as WAT_Position
    const { x:x1,y:y1 } = LayouterState.LassoEnd || LayouterState.LassoStart as WAT_Position

    let LassoX = (x0 <= x1 ? x0 : x1); let LassoWidth  = (x0 <= x1 ? x1-x0 : x0-x1)
    let LassoY = (y0 <= y1 ? y0 : y1); let LassoHeight = (y0 <= y1 ? y1-y0 : y0-y1)

    return { x:LassoX,y:LassoY, Width:LassoWidth,Height:LassoHeight }
  }

/**** CSSGeometryOfLasso ****/

  function CSSGeometryOfLasso ():string {
    const { x,y, Width,Height } = GeometryOfLasso()
    return `left:${x}px; top:${y}px; width:${Width}px; height:${Height}px`
  }

/**** WidgetsCaughtByLasso ****/

  function WidgetsCaughtByLasso ():WAT_Widget[] {
    let { x:LassoX0,y:LassoY0, Width:LassoWidth,Height:LassoHeight } = GeometryOfLasso()
    let LassoX1 = LassoX0+LassoWidth
    let LassoY1 = LassoY0+LassoHeight

    if (LayouterState.LassoMode === 'touch') {
      return DesignerState.Applet.visitedPage.WidgetList.filter((Widget:WAT_Widget) => {
        if (! Widget.isVisible || Widget.isLocked) { return false }

        const { x,y, Width,Height } = Widget.Geometry
        return (
          (LassoX0 <= x+Width)  && (x <= LassoX1) &&
          (LassoY0 <= y+Height) && (y <= LassoY1)
        )
      })
    } else { // 'enclose'
      return DesignerState.Applet.visitedPage.WidgetList.filter((Widget:WAT_Widget) => {
        if (! Widget.isVisible || Widget.isLocked) { return false }

        const { x,y, Width,Height } = Widget.Geometry
        return (
          (LassoX0 <= x) && (x+Width  <= LassoX1) &&
          (LassoY0 <= y) && (y+Height <= LassoY1)
        )
      })
    }
  }

/**** dragLassoTo ****/

  function dragLassoTo (
    x:WAT_Location,y:WAT_Location, additiveSelection:boolean
  ):void {
    LayouterState.LassoEnd = { x,y }
    selectWidgets(
      additiveSelection ? LayouterState.SelectionBeforeLasso : [], WidgetsCaughtByLasso()
    )
  }

/**** applyLasso ****/

  function applyLasso ():void {
    LayouterState.LassoStart = LayouterState.LassoEnd = undefined
    LayouterState.SelectionBeforeLasso = []
  }

/**** abortLasso ****/

  function abortLasso ():void {
    LayouterState.LassoStart = LayouterState.LassoEnd = undefined
    selectWidgets(LayouterState.SelectionBeforeLasso)
    LayouterState.SelectionBeforeLasso = []
  }

/**** onPageClick ****/

  function onPageClick ():void {
    selectWidgets([])
  }

/**** finishDraggingAndShaping ****/

  function finishDraggingAndShaping ():void {
    LayouterState.ShapeMode         = undefined
    LayouterState.pointedWidget     = undefined
    LayouterState.shapedWidgets     = []
    LayouterState.initialGeometries = undefined
  }

/**** abortDraggingAndShaping ****/

  function abortDraggingAndShaping ():void {
    if (LayouterState.shapedWidgets.length > 0) {
      doOperation(new WAD_WidgetShapeOperation(
        LayouterState.shapedWidgets,LayouterState.initialGeometries as WAT_Geometry[]
      ))
    }
    finishDraggingAndShaping()
  }

//------------------------------------------------------------------------------
//--                            WAD_LayouterLayer                             --
//------------------------------------------------------------------------------

  function WAD_LayouterLayer ():any {
    const { Applet, selectedWidgets } = DesignerState

    const visitedPage = Applet.visitedPage
    const WidgetList  = visitedPage.WidgetList

  /**** handleCoverEvent ****/

    function handleCoverEvent (Event:PointerEvent, Widget:WAT_Widget):void {
      LayouterState.ShapeMode     = 'c'
      LayouterState.pointedWidget = Widget
      LayouterState.CoverRecognizer(Event)
    }

  /**** handleShapeEvent ****/

    function handleShapeEvent (Event:PointerEvent, Mode:string):void {
      LayouterState.ShapeMode = Mode
      LayouterState.ShapeHandleRecognizer(Event)
    }

  /**** Event Handling ****/

    const LassoRecognizer = LayouterState.LassoRecognizer

    const DOMElement = useRef(null)
    useEffect(() => {
      DesignerState.LayouterLayer = DOMElement.current
    },[])

    const FocusAndLassoRecognizer = useCallback((Event:PointerEvent) => {
      focusLayouterLayer()
      LassoRecognizer(Event)
    },[])

    const onKeyDown = useCallback(async (Event:KeyboardEvent) => {
      if (Event.ctrlKey || Event.metaKey) {
        switch (Event.key) {
          case 'a': consumeEvent(Event); return selectWidgets(Event.shiftKey ? [] : DesignerState.Applet.visitedPage.WidgetList)
          case 'o':
            consumeEvent(Event)
            if ('showOpenFilePicker' in window) {
// @ts-ignore TS18046 allow "window.showOpenFilePicker"
              const FileList = await window.showOpenFilePicker()
              if (FileList.length === 0) { return }

              try {
                const File = await FileList[0].getFile()
                let FileType:string = ''
                  switch (FileList[0].name.replace(/^.*[.]/,'')) {
                    case 'js':   FileType = 'application/javascript'; break
                    case 'json': FileType = 'application/json';       break
                  }                  // "doImport" will fail on other file types
                doImport(await File.text(),FileType)
              } catch (Signal:any) {
                window.alert('Could not import file\n\nReason: ' + Signal)
              }
            } else {
              window.alert(
                'Your browser does not support opening files.\n\n' +
                'Try the "import" function from the Toolbox'
              )
            }
            return
          case 'p': consumeEvent(Event); return doPrintApplet()
          case 'v': consumeEvent(Event); return doPasteShelvedWidgets()
          case 'y': consumeEvent(Event); return redoOperation()
          case 'z': consumeEvent(Event); return (Event.shiftKey ? redoOperation() : undoOperation())
        }
      }

      if (selectedWidgets.length === 0) { return }

      switch (Event.key) {
        case 'ArrowLeft':
          consumeEvent(Event)
          if (Event.altKey) {                                            // size
            doChangeGeometriesBy(DesignerState.selectedWidgets,'e',
              (Event.shiftKey ? -10 : -1),0,
              DesignerState.selectedWidgets.map((Widget:WAT_Widget) => Widget.Geometry),
              false
            )
          } else {                                                       // move
            doChangeGeometriesBy(DesignerState.selectedWidgets,'c',
              (Event.shiftKey ? -10 : -1),0,
              DesignerState.selectedWidgets.map((Widget:WAT_Widget) => Widget.Geometry),
              false
            )
          }
          return
        case 'ArrowUp':
          consumeEvent(Event)
          if (Event.altKey) {                                            // size
            doChangeGeometriesBy(DesignerState.selectedWidgets,'s',
              0,(Event.shiftKey ? -10 : -1),
              DesignerState.selectedWidgets.map((Widget:WAT_Widget) => Widget.Geometry),
              false
            )
          } else {                                                       // move
            doChangeGeometriesBy(DesignerState.selectedWidgets,'c',
              0,(Event.shiftKey ? -10 : -1),
              DesignerState.selectedWidgets.map((Widget:WAT_Widget) => Widget.Geometry),
              false
            )
          }
          return
        case 'ArrowRight':
          consumeEvent(Event)
          if (Event.altKey) {                                            // size
            doChangeGeometriesBy(DesignerState.selectedWidgets,'e',
              (Event.shiftKey ? 10 : 1),0,
              DesignerState.selectedWidgets.map((Widget:WAT_Widget) => Widget.Geometry),
              false
            )
          } else {                                                       // move
            doChangeGeometriesBy(DesignerState.selectedWidgets,'c',
              (Event.shiftKey ? 10 : 1),0,
              DesignerState.selectedWidgets.map((Widget:WAT_Widget) => Widget.Geometry),
              false
            )
          }
          return
        case 'ArrowDown':
          consumeEvent(Event)
          if (Event.altKey) {                                            // size
            doChangeGeometriesBy(DesignerState.selectedWidgets,'s',
              0,(Event.shiftKey ? 10 : 1),
              DesignerState.selectedWidgets.map((Widget:WAT_Widget) => Widget.Geometry),
              false
            )
          } else {                                                       // move
            doChangeGeometriesBy(DesignerState.selectedWidgets,'c',
              0,(Event.shiftKey ? 10 : 1),
              DesignerState.selectedWidgets.map((Widget:WAT_Widget) => Widget.Geometry),
              false
            )
          }
          return
        case 'Backspace':
        case 'Delete':
          consumeEvent(Event)
          return doDeleteSelectedWidgets()
        case 'c': consumeEvent(Event); return doCopySelectedWidgets()
        case 'd': consumeEvent(Event); return doDuplicateSelectedWidgets()
        case 'x': consumeEvent(Event); return doCutSelectedWidgets()
      }
    })

  /**** actual rendering ****/

    return html`<div class="WAD LayouterLayer" ref=${DOMElement} tabindex="0"
      onPointerDown=${FocusAndLassoRecognizer} onPointerMove=${LassoRecognizer}
      onPointerUp=${LassoRecognizer} onPointerCancel=${LassoRecognizer}
      onKeyDown=${onKeyDown}
    >
      ${WidgetList.toReversed().map((Widget:WAT_Widget) => {
        if (! Widget.isVisible) { return '' }

        const WidgetId = IdOfWidget(Widget)
        const selected = WidgetIsSelected(Widget)

        return html`
          <${WAD_Cover} Widget=${Widget} key=${WidgetId+'c'}
            selected=${selected}
            onPointerEvent=${(Event:PointerEvent) => handleCoverEvent(Event,Widget)}
          />
        `
      })}

      ${(selectedWidgets.length > 0)
        ? selectedWidgets.filter(
            (Widget:WAT_Widget) => Widget.isVisible
          ).toReversed().map((Widget:WAT_Widget) => {
            const WidgetId = IdOfWidget(Widget)
            const Geometry = Widget.Geometry
            return html`
              <${WAD_ShapeHandle} key=${WidgetId+'nw'} Mode="nw" Geometry=${Geometry}
                onPointerEvent=${(Event:PointerEvent) => handleShapeEvent(Event,'nw')}/>
              <${WAD_ShapeHandle} key=${WidgetId+'n'}  Mode="n"  Geometry=${Geometry}
                onPointerEvent=${(Event:PointerEvent) => handleShapeEvent(Event,'n')}/>
              <${WAD_ShapeHandle} key=${WidgetId+'ne'} Mode="ne" Geometry=${Geometry}
                onPointerEvent=${(Event:PointerEvent) => handleShapeEvent(Event,'ne')}/>
              <${WAD_ShapeHandle} key=${WidgetId+'e'}  Mode="e"  Geometry=${Geometry}
                onPointerEvent=${(Event:PointerEvent) => handleShapeEvent(Event,'e')}/>
              <${WAD_ShapeHandle} key=${WidgetId+'se'} Mode="se" Geometry=${Geometry}
                onPointerEvent=${(Event:PointerEvent) => handleShapeEvent(Event,'se')}/>
              <${WAD_ShapeHandle} key=${WidgetId+'s'}  Mode="s"  Geometry=${Geometry}
                onPointerEvent=${(Event:PointerEvent) => handleShapeEvent(Event,'s')}/>
              <${WAD_ShapeHandle} key=${WidgetId+'sw'} Mode="sw" Geometry=${Geometry}
                onPointerEvent=${(Event:PointerEvent) => handleShapeEvent(Event,'sw')}/>
              <${WAD_ShapeHandle} key=${WidgetId+'w'}  Mode="w"  Geometry=${Geometry}
                onPointerEvent=${(Event:PointerEvent) => handleShapeEvent(Event,'w')}/>
            `
          })
        : ''
      }
      ${LayouterState.LassoStart == null
        ? ''
        : html`<div class="WAD Lasso" style=${CSSGeometryOfLasso()}></>`
      }
      ${horizontalGuides()}
      ${verticalGuides()}
    </div>`
  }

/**** WAD_Cover ****/

  function WAD_Cover (PropSet:Indexable):any {
    let { Widget, onPointerEvent, ...otherProps } = PropSet

    let { x,y, Width,Height } = Widget.Geometry

    const FocusAndCoverRecognizer = useCallback((Event:PointerEvent) => {
      focusLayouterLayer()
      onPointerEvent(Event)
    },[])

    const dragging = (
      (LayouterState.ShapeMode === 'c') && (LayouterState.shapedWidgets.length > 0)
      ? 'dragging' : ''
    )

    return html`<div class="WAD Cover ${dragging}" style="
      left:${x}px; top:${y}px; width:${Width}px; height:${Height}px;
      ${Widget.isLocked ? 'pointer-events:none' : ''}
    " ...${otherProps}
      onPointerDown=${FocusAndCoverRecognizer} onPointerMove=${onPointerEvent}
      onPointerUp=${onPointerEvent} onPointerCancel=${onPointerEvent}
    />`
  }

//------------------------------------------------------------------------------
//--                             WAD_ShapeHandle                              --
//------------------------------------------------------------------------------

  function WAD_ShapeHandle (PropSet:Indexable):any {
    let { Mode, Geometry, onPointerEvent, ...otherProps } = PropSet

    let { x,y, Width,Height } = Geometry
    const xl = x-8, xm = Math.round(x+Width/2)-4,  xr = x+Width
    const yt = y-8, ym = Math.round(y+Height/2)-4, yb = y+Height

    let CSSGeometry, Cursor
    switch (Mode) {
      case 'nw': CSSGeometry = `left:${xl}px; top:${yt}px;`; Cursor = 'nwse'; break
      case 'n':  CSSGeometry = `left:${xm}px; top:${yt}px;`; Cursor = 'ns';   break
      case 'ne': CSSGeometry = `left:${xr}px; top:${yt}px;`; Cursor = 'nesw'; break
      case 'e':  CSSGeometry = `left:${xr}px; top:${ym}px;`; Cursor = 'ew';   break
      case 'se': CSSGeometry = `left:${xr}px; top:${yb}px;`; Cursor = 'nwse'; break
      case 's':  CSSGeometry = `left:${xm}px; top:${yb}px;`; Cursor = 'ns';   break
      case 'sw': CSSGeometry = `left:${xl}px; top:${yb}px;`; Cursor = 'nesw'; break
      case 'w':  CSSGeometry = `left:${xl}px; top:${ym}px;`; Cursor = 'ew';   break
    }
    Cursor = 'cursor:' + Cursor + '-resize'

    const FocusAndHandleRecognizer = useCallback((Event:PointerEvent) => {
      focusLayouterLayer()
      onPointerEvent(Event)
    },[])

    return html`<div class="WAD ShapeHandle" style="${CSSGeometry} ${Cursor}" ...${otherProps}
      onPointerDown=${FocusAndHandleRecognizer} onPointerMove=${onPointerEvent}
      onPointerUp=${onPointerEvent} onPointerCancel=${onPointerEvent}
    />`
  }/**** horizontal Guides ****/

  function horizontalGuides ():any {
    const WidgetList      = DesignerState.Applet.visitedPage.WidgetList
    const selectedWidgets = DesignerState.selectedWidgets

    const EdgeSet:Indexable   = {}
    const CenterSet:Indexable = {}
    WidgetList.filter(
      (Widget:WAT_Widget) => ! WidgetIsSelected(Widget)
    ).forEach((Widget:WAT_Widget) => {
      const { y,Height } = Widget.Geometry
        const yt = Math.round(y)
        const ym = Math.round(y+Height/2)
        const yb = Math.round(y+Height)
      EdgeSet[yt] = EdgeSet[yb] = true
      CenterSet[ym] = true
    })

    const horizontalSet:Indexable = {}
    selectedWidgets.forEach((Widget:WAT_Widget) => {
      const { y,Height } = Widget.Geometry
        const yt = Math.round(y)
        const ym = Math.round(y+Height/2)
        const yb = Math.round(y+Height)
      if (EdgeSet[yt])                                     { horizontalSet[yt] = 'Edge' }
      if (EdgeSet[ym]   && (horizontalSet[ym] !== 'Edge')) { horizontalSet[ym] = 'Center' }
      if (EdgeSet[yb])                                     { horizontalSet[yb] = 'Edge' }
      if (CenterSet[yt] && (horizontalSet[yt] !== 'Edge')) { horizontalSet[yt] = 'Center' }
      if (CenterSet[ym] && (horizontalSet[ym] !== 'Edge')) { horizontalSet[ym] = 'Center' }
      if (CenterSet[yb] && (horizontalSet[yb] !== 'Edge')) { horizontalSet[yb] = 'Center' }
    })

    const horizontalList:string[] = []
      for (let y in horizontalSet) {
        if (horizontalSet[y] != null) { horizontalList.push(y) }
      }

    return html`${horizontalList.map((y:string) => html`
      <div class="WAD horizontalGuide ${horizontalSet[y]}" style="top:${y}px"/>
    `)}`
  }

/**** vertical Guides ****/

  function verticalGuides ():any {
    const WidgetList      = DesignerState.Applet.visitedPage.WidgetList
    const selectedWidgets = DesignerState.selectedWidgets

    const EdgeSet:Indexable   = {}
    const CenterSet:Indexable = {}
    WidgetList.filter(
      (Widget:WAT_Widget) => ! WidgetIsSelected(Widget)
    ).forEach((Widget:WAT_Widget) => {
      const { x,Width } = Widget.Geometry
        const xl = Math.round(x)
        const xm = Math.round(x+Width/2)
        const xr = Math.round(x+Width)
      EdgeSet[xl] = EdgeSet[xr] = true
      CenterSet[xm] = true
    })

    const verticalSet:Indexable = {}
    selectedWidgets.forEach((Widget:WAT_Widget) => {
      const { x,Width } = Widget.Geometry
        const xl = Math.round(x)
        const xm = Math.round(x+Width/2)
        const xr = Math.round(x+Width)
      if (EdgeSet[xl])                                   { verticalSet[xl] = 'Edge' }
      if (EdgeSet[xm]   && (verticalSet[xm] !== 'Edge')) { verticalSet[xm] = 'Center' }
      if (EdgeSet[xr])                                   { verticalSet[xr] = 'Edge' }
      if (CenterSet[xl] && (verticalSet[xl] !== 'Edge')) { verticalSet[xl] = 'Center' }
      if (CenterSet[xm] && (verticalSet[xm] !== 'Edge')) { verticalSet[xm] = 'Center' }
      if (CenterSet[xr] && (verticalSet[xr] !== 'Edge')) { verticalSet[xr] = 'Center' }
    })

    const verticalList:string[] = []
      for (let x in verticalSet) {
        if (verticalSet[x] != null) { verticalList.push(x) }
      }
    return html`${verticalList.map((x:string) => html`
      <div class="WAD verticalGuide ${verticalSet[x]}" style="left:${x}px"/>
    `)}`
  }/**** IdOfWidget ****/

  const IdForWidget:WeakMap<WAT_Widget,string> = new WeakMap()

  function IdOfWidget (Widget:WAT_Widget):string {
    if (IdForWidget.has(Widget)) {
      return IdForWidget.get(Widget) as string
    } else {
      let Id = newId()
        IdForWidget.set(Widget,Id)
      return Id
    }
  }

/**** newId - uses nanoid with custom dictionary ****/

  export const newId = customAlphabet(nolookalikesSafe,21)

/**** consume/consumingEvent ****/

  function consumeEvent (Event:Event):void {
    Event.stopPropagation()
    Event.preventDefault()
  }
  const consumingEvent = consumeEvent

/**** inform WAT about this designer ****/

  console.log('starting WebApp Tinkerer Designer...')
    WAD_DesignerLayer.showErrorReport = showErrorReport
    useDesigner(WAD_DesignerLayer)
  console.log('WebApp Tinkerer Designer is operational')
