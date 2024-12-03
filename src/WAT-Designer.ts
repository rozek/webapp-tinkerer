/*******************************************************************************
*                                                                              *
*                        WebApp Tinkerer (WAT) Designer                        *
*                                                                              *
*******************************************************************************/

  declare const download:Function
  declare const localforage:any

  import {
//  throwError,
    quoted, HTMLsafe,
    ValuesAreEqual,
    ValueIsOrdinal,
    ValueIsPlainObject,
    ValueIsList, ValueIsListSatisfying,
    ValueIsFunction,
    allowOrdinal,
    allowTextline,
    expectPlainObject,
    expectList, allowListSatisfying,
    allowFunction,
  } from 'javascript-interface-library'
  import * as JIL from 'javascript-interface-library'

  import Conversion from 'svelte-coordinate-conversion'
  const { fromViewportTo } = Conversion

  import {
    render, html, Component,
    useRef, useMemo, useCallback,
  } from 'htm/preact'

  import hyperactiv from 'hyperactiv'
  const { observe, computed, dispose } = hyperactiv

  import { customAlphabet }   from 'nanoid'
// @ts-ignore TS2307 typescript has problems importing "nanoid-dictionary"
  import { nolookalikesSafe } from 'nanoid-dictionary'

  import {
    throwError, throwReadOnlyError,
    WAT_Text, WAT_Geometry, WAT_Position, WAT_Location,
    WAT_Visual, WAT_Applet, WAT_Page, WAT_Widget,
    ValueIsWidgetType,
    allowPage,
    useDesigner, rerender as WAT_rerender,
  } from "/js/WAT-Runtime.esm.js"

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
    display:block; position:absolute; overflow:visible;
    left:0px; top:0px; right:0px; bottom:0px;
    z-index:1000000;
    pointer-events:none;
  }

  .WAD.Content {
    display:block; position:absolute;
    left:0px; top:0px; width:100%; height:100%;
  }

/**** DesignerButton ****/

  .WAD.DesignerButton {
    display:block; position:absolute;
    width:32px; height:32px;
    background:white;
    border:solid 2px black; border-radius:50%;
    outline:solid 1px white;
    pointer-events:auto; cursor:grab;
  }
  .WAD.DesignerButton > img {
    display:block; position:absolute;
    left:2px; top:2px; width:24px; height:24px;
    pointer-events:none;
  }

/**** horizontally/vertically/centered ****/

  .WAD.horizontally {
    display:flex; position:relative; flex-flow:row nowrap; align-items:stretch;
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
/**** Name/IntegerInput ****/

  .WAD.NameInput, .WAD.IntegerInput {
    display:block; position:relative;
    width:auto; height:30px;
  }
  .WAD.NameInput > input, .WAD.IntegerInput > input {
    display:block; position:relative;
    left:0px; top:0px; width:100%; height:100%;
    border:solid 1px #888888; border-radius:2px;
    background:#e8f0ff; padding:0px 2px 0px 4px;
    pointer-events:auto;
  }
  .WAD.NameInput.wrong > input, .WAD.IntegerInput.wrong > input {
    color:red;
  }
  .WAD.NameInput > input:read-only, .WAD.IntegerInput > input:read-only {
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
    display:block; position:relative;
    left:0px; top:0px; width:100%; height:100%;
    border:solid 1px #888888; border-radius:2px;
    background:#e8f0ff; padding:4px 2px 4px 4px;
    pointer-events:auto; resize:none;
  }
  .WAD.TextInput > textarea:read-only {
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
    display:block; position:absolute;
    border:solid 1px #000000; border-radius:4px;
    background:white; color:black;
    box-shadow:0px 0px 10px 0px rgba(0,0,0,0.5);
    z-index:2000000;
  }

  .WAD.Dialog > .Titlebar {
    display:block; position:absolute; overflow:hidden;
    left:0px; top:0px; right:0px; height:30px;
    background:#EEEEEE; border:none; border-radius:3px 3px 0px 0px;
    user-select:none; pointer-events:auto;
  }

  .WAD.Dialog > .Titlebar > .Title {
    display:block; position:absolute;
    left:6px; top:3px; right:30px; height:18px;
    border:none;
    font-weight:bold; color:black;
    user-select:none; pointer-events:none;
  }

  .WAD.Dialog > .Titlebar > .CloseButton {
    display:block; position:absolute;
    top:0px; right:0px; width:30px; height:30px;
    border:none; padding:3px;
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
  }

  .WAD.resizable.Dialog > .middleResizer {
    display:block; position:absolute;
    left:30px; bottom:0px; right:30px; height:9px;
    border:none; border-top:solid 1px black;
    border-radius:0px;
    cursor:ns-resize; pointer-events:auto;
  }

  .WAD.resizable.Dialog > .rightResizer {
    display:block; position:absolute;
    bottom:0px; right:0px; width:30px; height:9px;
    border:none; border-left:solid 1px black; border-top:solid 1px black;
    border-radius:0px 0px 3px 0px;
    cursor:nwse-resize; pointer-events:auto;
  }

/**** MessageView ****/

  .WAD.MessageView {
    display:block; position:relative;
    width:auto; height:30px; overflow:hidden; text-overflow:ellipsis;
    padding:4px 0px 0px 0px;
    font-size:14px; font-weight:normal; text-align:left; line-height:28px;
  }

  .WAD.MessageView.withError {
    color:red;
  }

/**** Layouter Layer ****/

  .WAD.LayouterLayer {
    display:block; position:absolute; overflow:visible;
    left:0px; top:0px; right:0px; bottom:0px;
    pointer-events:auto;
  }

  .WAD.Cover {
    display:block; position:absolute;
    z-index:1000000;
    user-select:none; pointer-events:auto;
  }

/**** Selection Markers ****/

  .WAD.Cover[selected] {
    outline:dotted 2px orangered;
  }

  .WAD.ShapeHandle {
    display:block; position:absolute;
    width:8px; height:8px;
    background:orangered; border:solid 1px darkgray;
    z-index:1000001; /* above .WAD.Cover */
    user-select:none; pointer-events:auto;
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
    PageBrowser: {                           // only visible if Designer is open
      Title:'Page Browser',   View:undefined,
      x:NaN, y:NaN, Width:280, Height:320,
      minWidth:280, minHeight:320,
    },
    WidgetBrowser: {                         // only visible if Designer is open
      Title:'Widget Browser', View:undefined,
      x:NaN, y:NaN, Width:300, Height:550,
      minWidth:300, minHeight:550,
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

//-------------------------------------------------------------------------------
//--                            Gesture Recognizer                             --
//-------------------------------------------------------------------------------
// warning: coordinates are relative to the viewport!

  function GestureRecognizer (OptionSet:Indexable):Function {
    expectPlainObject('recognizer option set',OptionSet)

  /**** validate options ****/

    let {
      onlyFrom, neverFrom,
      ClickRadius, MultiClickLimit, MultiClickTimeSpan,
      primaryLongPressDelay, secondaryLongPressDelay,
      onClick, onDblClick, onMultiClick,
      onLongPressIndication, onLongPress,
      onDragStart, onDragContinuation, onDragFinish, onDragAbortion,
    } = OptionSet

    if (! (onlyFrom instanceof Element)) {
      allowTextline('"onlyFrom" selector', onlyFrom)
    }

    if (! (neverFrom instanceof Element)) {
      allowTextline('"neverFrom" selector', neverFrom)
    }

    allowOrdinal                     ('click radius',ClickRadius)
    allowOrdinal                ('multi-click limit',MultiClickLimit)
    allowOrdinal            ('multi-click time span',MultiClickTimeSpan)
    allowOrdinal         ('primary long-press delay',primaryLongPressDelay)
    allowOrdinal       ('secondary long-press delay',secondaryLongPressDelay)
    allowFunction              ('"onClick" callback',onClick)
    allowFunction           ('"onDblClick" callback',onDblClick)
    allowFunction         ('"onMultiClick" callback',onMultiClick)
    allowFunction('"onLongPressIndication" callback',onLongPressIndication)
    allowFunction          ('"onLongPress" callback',onLongPress)
    allowFunction          ('"onDragStart" callback',onDragStart)
    allowFunction   ('"onDragContinuation" callback',onDragContinuation)
    allowFunction         ('"onDragFinish" callback',onDragFinish)
    allowFunction       ('"onDragAbortion" callback',onDragAbortion)

  /**** detect configured features and apply defaults ****/

    if (ClickRadius        == null) { ClickRadius        = 4 }
    if (MultiClickTimeSpan == null) { MultiClickTimeSpan = 300 }

    if (MultiClickLimit == null) {
      MultiClickLimit = 0
      if (onClick      != null) { MultiClickLimit = 1 }
      if (onDblClick   != null) { MultiClickLimit = 2 }
      if (onMultiClick != null) { MultiClickLimit = 3 }
    }

    const RecognizerMayClick = (MultiClickLimit > 0)

    const RecognizerMayLongPress = (onLongPress != null)
    if (RecognizerMayLongPress) {
      if (primaryLongPressDelay   == null) { primaryLongPressDelay   = 500 }
      if (secondaryLongPressDelay == null) { secondaryLongPressDelay = 1000 }
    }

    const RecognizerMayDrag = (
      (onDragStart  != null) && (onDragContinuation != null) &&
      (onDragFinish != null) && (onDragAbortion     != null)
    )

  /**** Working Variables ****/

    let Status:string = '', StartX:number = 0, StartY:number = 0
    let curEvent:PointerEvent, curX:number, curY:number
    let lastClickCount:number = 0, lastClickTime:number = 0
    let LongPressTimer:any, LongPressState:string = ''

  /**** actual recognizer ****/

    return (Event:Event) => {   // this fct. actually handles the pointer events
      switch (Event.type) {
        case 'pointerdown':   return onPointerDown  (Event as PointerEvent)
        case 'pointermove':   return onPointerMove  (Event as PointerEvent)
        case 'pointerup':     return onPointerUp    (Event as PointerEvent)
        case 'pointercancel': return onPointerCancel(Event as PointerEvent)
        default:              return                  // ignore any other events
      }
    }

  /**** onPointerDown ****/

    function onPointerDown (Event:PointerEvent) {
      if (Event.buttons !== 1) {        // only handle events for primary button
        if (Status !== '') { onPointerCancel(Event) }
        return
      }

// @ts-ignore TS18047,TS2339 allow "Event.target.setPointerCapture"
      Event.target.setPointerCapture(Event.pointerId)

      Event.stopPropagation()                                   // consume event
      Event.preventDefault()

      Status = 'observing'     // i.e., before choice between "click" and "drag"
      StartX = curX = Event.clientX; curEvent = Event
      StartY = curY = Event.clientY

      if (RecognizerMayLongPress) {                  // prepare for a long press
        LongPressState = 'preparing'
        LongPressTimer = setTimeout(handleLongPressTimeout,primaryLongPressDelay)
      }
    }

  /**** onPointerMove ****/

    function onPointerMove (Event:PointerEvent) {
      if (Status === '') { return }              // recognizer is not active yet

      if (Event.buttons !== 1) {        // only handle events for primary button
        if (Status !== '') { onPointerCancel(Event) }
        return
      }

      Event.stopPropagation()                                   // consume event
      Event.preventDefault()

      ;({ clientX:curX, clientY:curY } = curEvent = Event)
      if (Status === 'observing') {
        if (
          RecognizerMayDrag &&
          ((curX-StartX)**2 + (curY-StartY)**2 >= ClickRadius**2)
        ) {                              // ok, no "click" any longer, but "drag"
          Status = 'moving'
          call(onDragStart,[curX-StartX,curY-StartY, StartX,StartY, Event])

        /**** cancel any long-press preparations ****/

          if (LongPressTimer !=   null)       { clearTimeout(LongPressTimer) }
          if (LongPressState !== 'preparing') { call(onLongPressIndication,[false, Event, curX,curY, StartX,StartY]) }

          LongPressState = ''
          LongPressTimer = undefined
        }
      } else {                                            // Status === 'moving'
        call(onDragContinuation,[curX-StartX,curY-StartY, StartX,StartY, Event])
      }
    }

  /**** onPointerUp ****/

    function onPointerUp (Event:PointerEvent) {
      if (Status === '') { return }              // recognizer is not active yet

      if (Event.buttons !== 0) {        // only handle events for primary button
        if (Status !== '') { onPointerCancel(Event) }
        return
      }

      Event.stopPropagation()                                   // consume event
      Event.preventDefault()

      ;({ clientX:curX, clientY:curY } = curEvent = Event)
      if (Status === 'observing') {
        if (LongPressState === 'ready') {
          lastClickCount = lastClickTime = 0

          call(onLongPressIndication,[false, curX,curY, StartX,StartY, Event])
          call(onLongPress,                 [curX,curY, StartX,StartY, Event])

          LongPressState = ''
        } else {
          const now = Date.now()
            if (
              (lastClickCount === MultiClickLimit) ||
              (now-lastClickTime > MultiClickTimeSpan)
            ) { lastClickCount = 1 } else { lastClickCount++ }
          lastClickTime = now

          if (RecognizerMayClick) {
            switch (lastClickCount) {
              case 1: call(onClick,   [curX,curY, StartX,StartY, Event]); break
              case 2: call(onDblClick,[curX,curY, StartX,StartY, Event]); break
            }
            call(onMultiClick,[lastClickCount, curX,curY, StartX,StartY, Event])
          }

        /**** cancel any long-press preparations ****/

          if (LongPressTimer !=   null)     { clearTimeout(LongPressTimer) }
          if (LongPressState === 'waiting') { call(onLongPressIndication,[false, curX,curY, StartX,StartY, Event]) }

          LongPressState = ''
          LongPressTimer = undefined
        }
      } else {                                            // Status === 'moving'
        lastClickCount = lastClickTime = 0
        call(onDragFinish,[curX-StartX,curY-StartY, StartX,StartY, Event])
      }

      Status = ''
    }

  /**** onPointerCancel ****/

    function onPointerCancel (Event:PointerEvent) {
      if (Status === '') { return }              // recognizer is not active yet

      Event.stopPropagation()                                   // consume event
      Event.preventDefault()

      ;({ clientX:curX, clientY:curY } = curEvent = Event)
      if (Status === 'moving') {
        call(onDragAbortion,[curX-StartX,curY-StartY, StartX,StartY, Event])
      }

      Status = ''
      lastClickCount = lastClickTime = 0

    /**** cancel any long-press preparations ****/

      if (LongPressTimer !=   null)       { clearTimeout(LongPressTimer) }
      if (LongPressState !== 'preparing') { call(onLongPressIndication,[false, curX,curY, StartX,StartY, Event]) }

      LongPressState = ''
      LongPressTimer = undefined
    }

  /**** long-press timeout handling ****/

    function handleLongPressTimeout () {
      switch (LongPressState) {
        case 'preparing':
          LongPressState = 'waiting';
          LongPressTimer = setTimeout(handleLongPressTimeout,secondaryLongPressDelay)
          call(onLongPressIndication,[true, curX,curY, StartX,StartY, curEvent])
          break
        case 'waiting':
          LongPressState = 'ready';
          LongPressTimer = undefined
      }
    }

  /**** callback invocation ****/

    function call (Callback:Function, ArgumentList:any[]) {
      if (! ValueIsFunction(Callback)) { return }

      try {
        Callback.apply(null,ArgumentList)
      } catch (Signal) {
        console.warn('Callback failure',Signal)
      }
    }
  }

//------------------------------------------------------------------------------
//--                             Dialog Handling                              --
//------------------------------------------------------------------------------

  const DialogList:string[] = [] // dialogs are only visible if Designer is open

/**** openDialog ****/

  function openDialog (Name:string, firstX?:number, firstY?:number):void {
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

  /**** actual rendering ****/

    return html`<div class="WAD Dialog ${resizable ? 'resizable' : ''}" style="
      left:${x}px; top:${y}px; width:${Width}px; height:${Height}px;
    ">
      <div class="Titlebar"
        onPointerDown=${Recognizer} onPointerUp=${Recognizer}
        onPointerMove=${Recognizer} onPointerCancel=${Recognizer}
      >
        <div class="Title">${Title}</div>

        ${(onClose != null) && html`
          <img class="CloseButton" src="/icons/xmark.png" onClick=${onClose}/>
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
//--                             Message Handling                             --
//------------------------------------------------------------------------------

/**** WAD_MessageView ****/

  function WAD_MessageView (PropSet:Indexable) {
    const { ScriptError } = DesignerState

    const SourceIsOk    = (ScriptError === '')
    const MessageToShow = (SourceIsOk ? '(no error found)' : ScriptError)

    return html`<div class="WAD MessageView ${SourceIsOk ? '' : 'withError'}"
      style=${PropSet.style}
    >${MessageToShow}</>`
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
    return html`<div class="WAD Checkbox" style=${style}>
      <input type="checkbox"
        disabled=${enabled === false}
        checked=${checked} indeterminate=${indeterminate}
        ...${otherProps}
      />
    </>`
  }

//------------------------------------------------------------------------------
//--                              WAD_NameInput                               --
//------------------------------------------------------------------------------

  function WAD_NameInput (PropSet:Indexable) {
    let { enabled, Value,Placeholder, onInput,onBlur, style,...otherProps } = PropSet

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

    return html`<div class="WAD NameInput ${wrong}" style=${style}>
      <input type="text"
        disabled=${enabled === false}
        ref=${InputElement} value=${ValueToShow} placeholder=${Placeholder}
        ...${otherProps} onInput=${_onInput} onBlur=${_onBlur}
      />
    </>`
  }

//------------------------------------------------------------------------------
//--                             WAD_IntegerInput                             --
//------------------------------------------------------------------------------

  function WAD_IntegerInput (PropSet:Indexable) {
    let { enabled, Value,Placeholder, onInput,onBlur, style,...otherProps } = PropSet

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
      <input type="number" step="1"
        disabled=${enabled === false}
        ref=${InputElement} value=${ValueToShow} placeholder=${Placeholder}
        ...${otherProps} onInput=${_onInput} onBlur=${_onBlur}
      />
    </>`
  }

//------------------------------------------------------------------------------
//--                               WAD_DropDown                               --
//------------------------------------------------------------------------------

  function WAD_DropDown (PropSet:Indexable) {
    let { enabled, Value,Placeholder, OptionList, style,...otherProps } = PropSet

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
        ${(OptionList || []).map(
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

    let ValueToShow:string = ''
      switch (Value) {
        case null:
        case undefined:      ValueToShow = ''; break
        case multipleValues: ValueToShow = ''; Placeholder = '(multiple values)'; break
        case noSelection:    ValueToShow = ''; Placeholder = '(no selection)'; enabled = false; break
        default:             ValueToShow = ''+Value
      }
    return html`<div class="WAD PseudoDropDown ${enabled === false ? 'disabled' : ''}">
      <div style="
        -webkit-mask-image:url(${Icon}); mask-image:url(${Icon});
        background-color:${Color || 'black'};
      "></>
      <select disabled=${enabled === false} ...${otherProps}>
        ${Placeholder == null
          ? ''
          : html`<option value="" disabled selected=${Value == null}>${Placeholder}</option>`
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
//--                              WAD_TextInput                               --
//------------------------------------------------------------------------------

  function WAD_TextInput (PropSet:Indexable) {
    let { enabled, Value,Placeholder, onInput,onBlur, style,...otherProps } = PropSet

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
        disabled=${enabled === false}
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
      onSelectionChange, onItemSelected, onItemDeselected,
      ...otherProps
    } = PropSet

    expectList                        ('item list',List)
    allowFunction            ('list item renderer',ItemRenderer)
    allowTextline              ('list placeholder',Placeholder)
    allowListSatisfying('list of selected indices',selectedIndices, ValueIsOrdinal)
    allowOrdinal                ('selection limit',SelectionLimit)
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

    function onClick (Event:MouseEvent, Index:number):void {
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
            onClick=${(Event:MouseEvent) => onClick(Event,Index)}
          />`)
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

  function generateStandaloneWebApp ():void {
    const { Applet } = DesignerState

    const AppletName    = Applet.Name || 'WAT-Applet'
    const Serialization = Applet.Serialization
    const AppletScript  = Serialization.Script
      delete Serialization.Script
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
      "wat-runtime":                 "https://rozek.github.io/webapp-tinkerer/js/wat-runtime.esm.js"
      "wat-designer":                "https://rozek.github.io/webapp-tinkerer/js/wat-designer.esm.js"
    }
  }
  ${'<'}/script>
  ${'<'}script src="https://rozek.github.io/webapp-tinkerer/js/download.min.js">${'<'}/script>""
  ${'<'}script src="https://rozek.github.io/webapp-tinkerer/js/localforage.min.js">${'<'}/script>""

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
//                    WAD_AppletScriptActivationOperation                     //
//----------------------------------------------------------------------------//

  class WAD_AppletScriptActivationOperation extends WAD_Operation {
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
      Widgets:WAT_Widget[],  PropertyName:string, PropertyValues:any|any[]
    ) {
      super()

      this._Widgets      = Widgets.slice()
      this._PropertyName = PropertyName
      this._oldValues    = Widgets.map((Widget:WAT_Widget) => Widget[PropertyName])
      this._newValues    = (
        ValueIsList(PropertyValues)
        ? (PropertyValues as any[]).slice()
        : Array.from({length:Widgets.length},() => PropertyValues)
      )
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

/**** doActivateAppletScript ****/

  function doActivateAppletScript ():void {
    doOperation(new WAD_AppletScriptActivationOperation())
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
    const { Applet,selectedPages } = DesignerState
    Applet.visitPage(selectedPages[selectedPages.length-1])
  }

/**** doDeleteSelectedPages ****/

  function doDeleteSelectedPages ():void {
    doOperation(new WAD_PageDeletionOperation(DesignerState.selectedPages))
  }

/**** doCreateWidget ****/

  function doCreateWidget (Type:string):void {
    const { Applet,selectedWidgets } = DesignerState
    const visitedPage = Applet.visitedPage

    doOperation(new WAD_WidgetDeserializationOperation(
      [{ Type }], visitedPage,0
    ))
  }

/**** doDuplicateSelectedWidgets ****/

  function doDuplicateSelectedWidgets ():void {
    const visitedPage     = DesignerState.Applet.visitedPage
    const selectedWidgets = sortedWidgetSelection()

    doOperation(new WAD_WidgetDeserializationOperation(
      selectedWidgets.map((Widget:WAT_Widget) => Widget.Serialization),
      visitedPage,0
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
          ValuesToSet = Value
      }
    doOperation(new WAD_WidgetConfigurationOperation(
      selectedWidgets, Property,ValuesToSet
    ))
  }

/**** doChangeGeometriesBy ****/

  function doChangeGeometriesBy (
    WidgetList:WAT_Widget[], Mode:string, dx:number,dy:number,
    initialGeometries:WAT_Geometry[]
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

        if (SnapToGrid) {
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
    doOperation(new WAD_WidgetDeletionOperation(DesignerState.selectedWidgets))
  }

/**** doCutSelectedWidgets ****/

  function doCutSelectedWidgets ():void {
    const selectedWidgets = sortedWidgetSelection()
    DesignerState.shelvedWidgets = selectedWidgets.map(
      (Widget:WAT_Widget) => Widget.Serialization
    )
    doDeleteSelectedWidgets()
  }

/**** doCopySelectedWidgets ****/

  function doCopySelectedWidgets ():void {
    const selectedWidgets = sortedWidgetSelection()
    DesignerState.shelvedWidgets = selectedWidgets.map(
      (Widget:WAT_Widget) => Widget.Serialization
    )
    WAT_rerender()
  }

/**** doPasteShelvedWidgets ****/

  function doPasteShelvedWidgets ():void {
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
      Reader.addEventListener('load', handleFileLoaded, false)
    Reader.readAsArrayBuffer(File)
  }

  function handleFileLoaded (Event:Indexable):void {
    Event.stopPropagation()
    Event.preventDefault()

    let Serialization
    try {
      Serialization = JSON.parse(
        (new TextDecoder()).decode( Event.target.result )
      )
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

    window.alert('file does not contain valid WAT serializations')
  }

/**** doExport ****/

  function doExport (Scope:string):void {
    let Serialization:Serializable
    switch (Scope) {
      case 'Applet':
        Serialization = DesignerState.Applet.Serialization
        break
      case 'active Page':
        Serialization = DesignerState.Applet.visitedPage.Serialization
        break
      case 'selected Pages':
// @ts-ignore TS2352 allow assignment
        Serialization = sortedPageSelection().map(
          (Page:WAT_Page) => Page.Serialization
        )
        break
      case 'selected Widgets':
        Serialization = DesignerState.selectedWidgets.map(
          (Widget:WAT_Widget) => Widget.Serialization
        )
        break
      default:
        console.error('InvalidArgument: invalid download scope ' + quoted(Scope))
        return
    }

    const SerializationString = JSON.stringify(Serialization)

    const encodedJSON = (new TextEncoder()).encode(SerializationString)
    const decodedJSON = (new TextDecoder()).decode(encodedJSON)
    if (SerializationString === decodedJSON) {
      download(encodedJSON, 'WAT-Export.json', 'text/html;charset=utf-8')
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
      case 'embeddable Applet': generateEmbeddableApplet(); break
      case 'standalone WebApp': generateStandaloneWebApp(); break
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

//------------------------------------------------------------------------------
//--                            WAD_DesignerLayer                             --
//------------------------------------------------------------------------------

  function WAD_DesignerLayer (PropSet:Indexable):any {
    if (DesignerState.DesignerDisabled) { return }

    const Applet = DesignerState.Applet = PropSet.Applet as WAT_Applet
    if (! Applet.isAttached) { return }

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

    return html`<div class="WAD DesignerButton" style="
      left:${x}px; top:${y}px;
      cursor:${isDragging ? 'grabbing' : 'grab'}
    " onPointerDown=${Recognizer} onPointerMove=${Recognizer}
      onPointerUp=${Recognizer} onPointerCancel=${Recognizer}
    ><img src="/icons/pen.png"/></>`
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
        <${WAD_Icon} Icon="/icons/draw-square.png"
          active=${isLayouting}
          onClick=${toggleLayouting}
        />
        <${WAD_Icon} Icon="/icons/book-open.png"
          active=${DialogIsOpen('PageBrowser')}
          onClick=${(Event:PointerEvent) => toggleDialog('PageBrowser',Event)}
        />
        <${WAD_Icon} Icon="/icons/rectangles-mixed.png"
          active=${DialogIsOpen('WidgetBrowser')}
          onClick=${(Event:PointerEvent) => toggleDialog('WidgetBrowser',Event)}
        />
        <${WAD_Icon} Icon="/icons/square-code.png"
          active=${DialogIsOpen('ScriptEditor')}
          onClick=${(Event:PointerEvent) => toggleDialog('ScriptEditor',Event)}
        />

        <${WAD_Icon} Icon="/icons/scissors.png"
          enabled=${selectedWidgets.length > 0}
          onClick=${doCutSelectedWidgets}
        />
        <${WAD_Icon} Icon="/icons/clone.png"
          enabled=${selectedWidgets.length > 0}
          onClick=${doCopySelectedWidgets}
        />
        <${WAD_Icon} Icon="/icons/clipboard-arrow-down.png"
          enabled=${shelvedWidgets.length > 0}
          onClick=${doPasteShelvedWidgets}
        />
        <${WAD_Icon} Icon="/icons/minus.png"
          enabled=${selectedWidgets.length > 0}
          onClick=${doDeleteSelectedWidgets}
        />

        <${WAD_Icon} Icon="/icons/rotate-ccw.png"
          enabled=${mayUndo()} onClick=${undoOperation}
        />
        <${WAD_Icon} Icon="/icons/rotate-cw.png"
          enabled=${mayRedo()} onClick=${redoOperation}
        />
        <${WAD_PseudoFileInput} Icon="/icons/arrow-up-from-bracket.png"
          onChange=${doImportFromFile}
        />
        <${WAD_PseudoDropDown} Icon="/icons/arrow-down-to-bracket.png"
          Placeholder="(please choose)" Value=${null}
          OptionList=${['Applet','active Page','selected Pages','selected Widgets']}
          onInput=${(Event:Indexable) => doExport(Event.target.value)}
        />

        <${WAD_Icon} Icon="/icons/chevron-left.png"
          enabled=${mayVisitPrevPage()}   onClick=${doVisitPrevPage}
        />
        <${WAD_Icon} Icon="/icons/chevron-right.png"
          enabled=${mayVisitNextPage()}   onClick=${doVisitNextPage}
        />
        <${WAD_Icon} Icon="/icons/house-line.png"
          enabled=${(Applet.PageCount > 0) && (Applet.visitedPage !== Applet.Page(0))}
          onClick=${doVisitHomePage}
        />
        <${WAD_Icon} Icon="" enabled=${false}/>

        <${WAD_Icon} Icon="/icons/terminal.png" enabled=${false}/>
        <${WAD_Icon} Icon="/icons/clapperboard.png"
          onClick=${doCreateScreenshot}
        />
        <${WAD_PseudoDropDown} Icon="/icons/clapperboard-play.png"
          Placeholder="(please choose)" Value=${null}
          OptionList=${['embeddable Applet','standalone WebApp']}
          onInput=${(Event:Indexable) => doGenerateApplet(Event.target.value)}
        />
        <${WAD_Icon} Icon="/icons/printer.png" onClick=${doPrintApplet} />
      </>
    </>`
  }
  DesignerState.Toolbox.View = WAD_Toolbox

  DialogList.push('Toolbox')     // "Toolbox" is always part of the "DialogList"

//------------------------------------------------------------------------------
//--                             WAD_PageBrowser                              --
//------------------------------------------------------------------------------

  function WAD_PageBrowser () {
    const onClose = useCallback(() => closeDialog('PageBrowser'))

    const { Applet, selectedPages } = DesignerState

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

    return html`<${WAD_Dialog} Name="PageBrowser" resizable=${true}
      onClose=${onClose}
    >
     <${WAD_vertically} style="width:100%; height:100%; padding:4px">
      <${WAD_horizontally}>
        <${WAD_Label} style="width:52px">Applet</>
        <${WAD_NameInput} Placeholder="(applet name)" style="flex:1 0 auto"
          Value=${Applet.Name}
          onInput=${(Event:Indexable) => doConfigureApplet('Name',Event.target.value)}
        />
      </>

      <${WAD_horizontally} style="padding-top:4px; padding-bottom:4px">
        <${WAD_Icon} Icon="/icons/plus.png" onClick=${doCreatePage}/>
        <${WAD_Icon} Icon="/icons/clone.png"
          enabled=${selectedPages.length > 0}
          onClick=${doDuplicateSelectedPages}
        />
          <${WAD_Gap}/>
        <${WAD_Icon} Icon="/icons/arrow-sm-to-top.png"
          enabled=${selectedPagesMayBeShiftedUp()}
          onClick=${doShiftSelectedPagesToTop}
        />
        <${WAD_Icon} Icon="/icons/arrow-sm-up.png"
          enabled=${selectedPagesMayBeShiftedUp()}
          onClick=${doShiftSelectedPagesUp}
        />
        <${WAD_Icon} Icon="/icons/arrow-sm-down.png"
          enabled=${selectedPagesMayBeShiftedDown()}
          onClick=${doShiftSelectedPagesDown}
        />
        <${WAD_Icon} Icon="/icons/arrow-sm-to-bottom.png"
          enabled=${selectedPagesMayBeShiftedDown()}
          onClick=${doShiftSelectedPagesToBottom}
        />
          <${WAD_Gap}/>
        <${WAD_Icon} Icon="/icons/arrow-up-right-from-square.png"
          enabled=${selectedPages.length === 1}
          onClick=${doVisitSelectedPage}
        />
          <${WAD_Gap}/>
        <${WAD_Icon} Icon="/icons/minus.png"
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
      />

      <${WAD_horizontally} style="padding-top:4px">
        <${WAD_Label} style="width:52px">Page</>
        <${WAD_NameInput} Placeholder="(page name)" style="flex:1 0 auto"
          enabled=${selectedPages.length > 0}
          Value=${commonValueOf(selectedPages.map((Page:WAT_Page) => Page.Name))}
          onInput=${(Event:Indexable) => doConfigureSelectedPages('Name',Event.target.value)}
        />
      </>

      <${WAD_horizontally}>
        <${WAD_Label}>Snap-to-Grid</>
        <${WAD_Gap}/>
        <${WAD_Checkbox}
          Value=${Applet.SnapToGrid}
          onInput=${(Event:Indexable) => doConfigureApplet('SnapToGrid',Event.target.checked)}
        />
      </>

      <${WAD_horizontally}>
        <${WAD_Label}>Grid Size [px]</>
        <${WAD_Gap}/>
        <${WAD_IntegerInput} style="width:60px" Placeholder="W"
          Value=${Applet.GridWidth}
          onInput=${(Event:Indexable) => doConfigureApplet('GridWidth',parseFloat(Event.target.value))}
        />
          <div style="width:20px; padding-top:4px; text-align:center">x</div>
        <${WAD_IntegerInput} style="width:60px" Placeholder="H"
          Value=${Applet.GridHeight}
          onInput=${(Event:Indexable) => doConfigureApplet('GridHeight',parseFloat(Event.target.value))}
        />
      </>
     </>
    </>`
  }
  DesignerState.PageBrowser.View = WAD_PageBrowser

//------------------------------------------------------------------------------
//--                            WAD_WidgetBrowser                             --
//------------------------------------------------------------------------------

  function WAD_WidgetBrowser () {
    const onClose = useCallback(() => closeDialog('WidgetBrowser'))

    const { Applet, selectedWidgets } = DesignerState
    const visitedPage = Applet.visitedPage

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

    return html`<${WAD_Dialog} Name="WidgetBrowser" resizable=${true}
      onClose=${onClose}
    >
     <${WAD_vertically} style="width:100%; height:100%; padding:4px">
      <${WAD_horizontally}>
        <${WAD_Label} style="width:52px">Page</>
        <${WAD_NameInput} Placeholder="(page name)" style="flex:1 0 auto"
          enabled=${visitedPage != null}
          Value=${visitedPage?.Name}
          onInput=${(Event:Indexable) => doConfigureVisitedPage('Name',Event.target.value)}
        />
      </>

      <${WAD_horizontally} style="padding-top:4px; padding-bottom:4px">
        <${WAD_PseudoDropDown} Icon="/icons/plus.png"
          enabled=${visitedPage != null}
          OptionList=${[
            'plainWidget:plain Widget', 'Outline:Widget Outline',
            '----',
            'Title', 'Subtitle', 'Label', 'Text', 'Fineprint',
            '----',
            'HTMLView:HTML View', 'ImageView:Image View',
            'SVGView:SVG View', 'WebView:Web View',
            'Badge', 'Icon',
            'horizontalSeparator:horizontal Separator',
            'verticalSeparator:vertical Separator',
            '----',
            'Button', 'Checkbox', 'Radiobutton:Radio Button',
            '----',
            'Gauge','Slider','Progressbar',
            '----',
            'TextlineInput:Textline Input', 'PasswordInput:Password Input',
            'NumberInput:Number Input',
          ]}
          onInput=${(Event:Indexable) => doCreateWidget(Event.target.value)}
        />
        <${WAD_Icon} Icon="/icons/clone.png"
          enabled=${selectedWidgets.length > 0}
          onClick=${doDuplicateSelectedWidgets}
        />
          <${WAD_Gap}/>
        <${WAD_Icon} Icon="/icons/arrow-sm-to-top.png"
          enabled=${selectedWidgetsMayBeShiftedUp()}
          onClick=${doShiftSelectedWidgetsToTop}
        />
        <${WAD_Icon} Icon="/icons/arrow-sm-up.png"
          enabled=${selectedWidgetsMayBeShiftedUp()}
          onClick=${doShiftSelectedWidgetsUp}
        />
        <${WAD_Icon} Icon="/icons/arrow-sm-down.png"
          enabled=${selectedWidgetsMayBeShiftedDown()}
          onClick=${doShiftSelectedWidgetsDown}
        />
        <${WAD_Icon} Icon="/icons/arrow-sm-to-bottom.png"
          enabled=${selectedWidgetsMayBeShiftedDown()}
          onClick=${doShiftSelectedWidgetsToBottom}
        />
          <${WAD_Gap}/>
        <${WAD_Icon} Icon="/icons/minus.png"
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
        <${WAD_Label} style="width:52px">Name</>
        <${WAD_NameInput} Placeholder="(widget name)" style="flex:1 0 auto"
          enabled=${selectedWidgets.length > 0}
          Value=${commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.Name))}
          onInput=${(Event:Indexable) => doConfigureSelectedWidgets('Name',Event.target.value)}
        />
      </>

      <${WAD_horizontally} style="padding-top:4px">
        <${WAD_Label} style="width:52px">Type</>
        <${WAD_NameInput} readonly style="flex:1 0 auto"
          Value=${commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.Type))}
        />
      </>

      <${WAD_horizontally}>
        <${WAD_Label}>Lock</>
        <${WAD_Gap}/>
        <${WAD_Checkbox}
          enabled=${selectedWidgets.length > 0}
          Value=${commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.Lock))}
          onInput=${(Event:Indexable) => doConfigureSelectedWidgets('Lock',Event.target.checked)}
        />
      </>

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
        <${WAD_Label}>Position</>
        <${WAD_Gap}/>
        <${WAD_IntegerInput} style="width:60px" Placeholder="x"
          enabled=${selectedWidgets.length > 0}
          Value=${commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.x))}
          onInput=${(Event:Indexable) => doConfigureSelectedWidgets('x',parseFloat(Event.target.value))}
        />
          <div style="width:20px; padding-top:4px; text-align:center">x</div>
        <${WAD_IntegerInput} style="width:60px" Placeholder="y"
          enabled=${selectedWidgets.length > 0}
          Value=${commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.y))}
          onInput=${(Event:Indexable) => doConfigureSelectedWidgets('y',parseFloat(Event.target.value))}
        />
      </>

      <${WAD_horizontally}>
        <${WAD_Label}>Size</>
        <${WAD_Gap}/>
        <${WAD_IntegerInput} style="width:60px" Placeholder="W"
          enabled=${selectedWidgets.length > 0}
          Value=${commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.Width))}
          onInput=${(Event:Indexable) => doConfigureSelectedWidgets('Width',parseFloat(Event.target.value))}
        />
          <div style="width:20px; padding-top:4px; text-align:center">x</div>
        <${WAD_IntegerInput} style="width:60px" Placeholder="H"
          enabled=${selectedWidgets.length > 0}
          Value=${commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.Height))}
          onInput=${(Event:Indexable) => doConfigureSelectedWidgets('Height',parseFloat(Event.target.value))}
        />
      </>

      <${WAD_horizontally} style="padding-top:4px">
        <${WAD_Icon} Icon="/icons/arrows-left-right.png" style="width:24px"/>
        <${WAD_Gap}/>
        <${WAD_DropDown} style="width:104px"
          OptionList=${['left-width','left-right','width-right']}
          enabled=${selectedWidgets.length > 0}
          Value=${commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.Anchors[0]))}
          onInput=${(Event:Indexable) => doConfigureSelectedWidgets('Anchors_0',Event.target.value)}
        />
          <div style="width:8px"/>
        <${WAD_IntegerInput} style="width:60px"
          enabled=${selectedWidgets.length > 0}
          Value=${commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.Offsets[0]))}
          onInput=${(Event:Indexable) => doConfigureSelectedWidgets('Offsets_0',parseFloat(Event.target.value))}
        />
          <div style="width:20px; padding-top:4px; text-align:center">x</div>
        <${WAD_IntegerInput} style="width:60px"
          enabled=${selectedWidgets.length > 0}
          Value=${commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.Offsets[1]))}
          onInput=${(Event:Indexable) => doConfigureSelectedWidgets('Offsets_1',parseFloat(Event.target.value))}
        />
      </>

      <${WAD_horizontally}>
        <${WAD_Icon} Icon="/icons/arrows-up-down.png" style="width:24px"/>
        <${WAD_Gap}/>
        <${WAD_DropDown} style="width:104px"
          OptionList=${['top-height','top-bottom','height-bottom']}
          enabled=${selectedWidgets.length > 0}
          Value=${commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.Anchors[1]))}
          onInput=${(Event:Indexable) => doConfigureSelectedWidgets('Anchors_1',Event.target.value)}
        />
          <div style="width:8px"/>
        <${WAD_IntegerInput} style="width:60px"
          enabled=${selectedWidgets.length > 0}
          Value=${commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.Offsets[2]))}
          onInput=${(Event:Indexable) => doConfigureSelectedWidgets('Offsets_2',parseFloat(Event.target.value))}
        />
          <div style="width:20px; padding-top:4px; text-align:center">x</div>
        <${WAD_IntegerInput} style="width:60px"
          enabled=${selectedWidgets.length > 0}
          Value=${commonValueOf(selectedWidgets.map((Widget:WAT_Widget) => Widget.Offsets[3]))}
          onInput=${(Event:Indexable) => doConfigureSelectedWidgets('Offsets_3',parseFloat(Event.target.value))}
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

      <${WAD_horizontally}>
        <${WAD_Label}>Value</>
        <${WAD_Gap}/>
        <${WAD_Icon} Icon="/icons/clapperboard.png"
          active=${DialogIsOpen('ValueEditor')}
          onClick=${(Event:PointerEvent) => toggleDialog('ValueEditor',Event)}
        />
      </>

      <${WAD_TextInput} Placeholder="(enter value)" style="min-height:60px"
        enabled=${selectedWidgets.length > 0}
        Value=${ValueToEdit} onInput=${_onValueInput}
      />
     </>
    </>`
  }
  DesignerState.WidgetBrowser.View = WAD_WidgetBrowser

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
        <${WAD_NameInput} Placeholder="(visual name)" style="flex:1 0 auto"
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
    const { activeScript,pendingScript, ScriptError } = Applet
                 // "activeScript" always exists, "pendingScript" may be missing

    return html`<${WAD_Dialog} Name="ScriptEditor" resizable=${true}
      onClose=${onClose}
    >
     <${WAD_vertically} style="width:100%; height:100%; padding:4px">
      <${WAD_horizontally}>
        <${WAD_Label} style="width:52px">Applet</>
        <${WAD_NameInput} Placeholder="(applet name)" style="flex:1 0 auto"
          Value=${Applet.Name}
          onInput=${(Event:Indexable) => doConfigureApplet('Name',Event.target.value)}
        />
          <div style="width:8px"/>
        <${WAD_Icon} Icon="/icons/check.png"
          enabled=${(pendingScript != null) && (pendingScript !== activeScript)}
          onClick=${doActivateAppletScript}
        />
          <div style="width:8px"/>
        <${WAD_Icon} Icon="/icons/xmark.png" style="width:24px"
          enabled=${(pendingScript != null) && (pendingScript !== activeScript)}
          onClick=${() => doConfigureApplet('pendingScript','')}
        />
      </>

      <${WAD_TextInput} Placeholder="(enter script)" style="
        flex:1 0 auto; padding-top:4px;
        white-space:pre;
      " Value=${pendingScript == null ? activeScript : pendingScript}
        onInput=${(Event:Indexable) => doConfigureApplet('pendingScript',Event.target.value)}
      />

      <${WAD_horizontally}>
        <${WAD_MessageView} style="flex:1 0 auto"
          Value=${ScriptError || ''}
        />
        <${WAD_Icon} Icon="/icons/triangle-exclamation.png" style="
          display:${(ScriptError || '').trim() === '' ? 'none' : 'block'};
          padding-top:6px;
        " onClick=${() => window.alert(`Script Compilation Error\n\n${ScriptError || ''}`)}/>
      </>
     </>
    </>`
  }
  DesignerState.ScriptEditor.View = WAD_ScriptEditor

//------------------------------------------------------------------------------
//--                              Layouter State                              --
//------------------------------------------------------------------------------

  const LayouterState:Indexable = {
    ShapeMode:'',
    pointedWidget:    undefined,
    shapedWidgets:    [],   // actually shaped widgets (as selection may change)
    initialGeometries:[],               // initial geometries of "shapedWidgets"

    LassoMode:'enclose',
    SelectionBeforeLasso:[],
    LassoStart:{ x:0,y:0 },
    LassoEnd:  { x:0,y:0 },
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
      const { pointedWidget,shapedWidgets } = LayouterState
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
    LayouterState.pointedWidget     = undefined
    LayouterState.shapedWidgets     = undefined
    LayouterState.initialGeometries = undefined
  }

/**** abortDraggingAndShaping ****/

  function abortDraggingAndShaping ():void {
    if (LayouterState.shapedWidgets != null) {
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

  /**** actual rendering ****/

    const LassoRecognizer = LayouterState.LassoRecognizer

    return html`<div class="WAD LayouterLayer"
      onPointerDown=${LassoRecognizer} onPointerMove=${LassoRecognizer}
      onPointerUp=${LassoRecognizer} onPointerCancel=${LassoRecognizer}
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

    return html`<div class="WAD Cover" style="
      left:${x}px; top:${y}px; width:${Width}px; height:${Height}px;
      ${Widget.isLocked ? 'pointer-events:none' : ''}
    " ...${otherProps}
      onPointerDown=${onPointerEvent} onPointerMove=${onPointerEvent}
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

    return html`<div class="WAD ShapeHandle" style="${CSSGeometry} ${Cursor}" ...${otherProps}
      onPointerDown=${onPointerEvent} onPointerMove=${onPointerEvent}
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

/**** inform WAT about this designer ****/

  console.log('starting WebApp Tinkerer Designer...')
    useDesigner(WAD_DesignerLayer)
  console.log('WebApp Tinkerer Designer is operational')