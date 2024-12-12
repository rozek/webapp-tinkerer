/*******************************************************************************
*                                                                              *
*                        WebApp Tinkerer (WAT) Runtime                         *
*                                                                              *
*******************************************************************************/

  const IconFolder = 'https://rozek.github.io/webapp-tinkerer/icons'

  declare const download:Function
  declare const localforage:any

  import {
//  throwError,
    quoted,
    ValuesDiffer,
    ValueIsBoolean,
    ValueIsNumber, ValueIsFiniteNumber, ValueIsNumberInRange,
      ValueIsInteger, ValueIsIntegerInRange, ValueIsOrdinal, ValueIsCardinal,
    ValueIsString, ValueIsStringMatching, ValueIsText, ValueIsTextline,
    ValueIsObject, ValueIsPlainObject,
    ValueIsList, ValueIsListSatisfying,
    ValueIsFunction,
    ValueIsOneOf,
    ValueIsColor, ValueIsEMailAddress, /*ValueIsPhoneNumber,*/ ValueIsURL,
    ValidatorForClassifier, acceptNil,rejectNil,
    expectValue,
    allowBoolean, expectBoolean,
    allowNumber, expectNumber, allowFiniteNumber, allowNumberInRange,
      allowInteger, expectInteger, allowIntegerInRange,
      allowOrdinal, expectCardinal,
    allowString, expectString, allowStringMatching, allowText, allowTextline,
    expectPlainObject,
    expectList, allowListSatisfying, expectListSatisfying,
    allowFunction, expectFunction,
    allowOneOf, expectOneOf,
    allowColor, allowURL,
  } from 'javascript-interface-library'
  import * as JIL from 'javascript-interface-library'

  const ValueIsPhoneNumber = ValueIsTextline // *C* should be implemented

  import {
    render, html, Component,
    useRef, useEffect, useCallback
  } from 'htm/preact'

  import hyperactiv from 'hyperactiv'
  const { observe, computed, dispose } = hyperactiv

  import { customAlphabet }   from 'nanoid'
// @ts-ignore TS2307 typescript has problems importing "nanoid-dictionary"
  import { nolookalikesSafe } from 'nanoid-dictionary'

  import mapTouchToMouseFor from 'svelte-touch-to-mouse'
    mapTouchToMouseFor('.WAT.Dialog > .Titlebar')
    mapTouchToMouseFor('.WAT.Dialog > .leftResizer')
    mapTouchToMouseFor('.WAT.Dialog > .middleResizer')
    mapTouchToMouseFor('.WAT.Dialog > .rightResizer')

  import Conversion from 'svelte-coordinate-conversion'
  const  { fromLocalTo, fromViewportTo, fromDocumentTo } = Conversion
  export { fromLocalTo, fromViewportTo, fromDocumentTo }

/**** generic constructor for asynchronous functions ****/

  export const AsyncFunction = (async () => {}).constructor

/**** make some existing types indexable ****/

  interface Indexable { [Key:string]:any }

/**** define serializable types ****/

  type serializableValue  = null | boolean | number | string |
                            serializableObject | serializableArray
  type serializableObject = { [Key:string]:serializableValue }
  type serializableArray  = serializableValue[]
  type Serializable       = serializableObject

/**** provide "toReversed" polyfill ****/

// @ts-ignore TS2550 allow polyfilling
  if (! Array.prototype.toReversed) {
// @ts-ignore TS2550 allow polyfilling
    Array.prototype.toReversed = function () {
      return Array.from(this).reverse()
    }
  }

//------------------------------------------------------------------------------
//--                             Type Definitions                             --
//------------------------------------------------------------------------------

  export type WAT_Name     = string           // mainly for illustrative reasons
  export type WAT_Path     = string                                      // dto.
  export type WAT_Behavior = string                                      // dto.
  export type WAT_Ordinal  = number                                      // dto.
  export type WAT_Cardinal = number                                      // dto.
  export type WAT_Text     = string                                      // dto.
  export type WAT_Textline = string                                      // dto.
  export type WAT_URL      = string                                      // dto.
  export type WAT_Color    = string                                      // dto.

/**** geometry-related types ****/

  export type WAT_Location  = number         // mainly for illustrative purposes
  export type WAT_Dimension = number                                     // dto.
  export type WAT_Position  = { x:WAT_Location, y:WAT_Location }
  export type WAT_Size      = { Width:WAT_Dimension, Height:WAT_Dimension }
  export type WAT_Geometry  = { x:WAT_Location, y:WAT_Location, Width:WAT_Dimension, Height:WAT_Dimension }

  export type WAT_incompleteGeometry = {
    x?:WAT_Location, y?:WAT_Location, Width?:WAT_Dimension, Height?:WAT_Dimension
  }

  export const WAT_horizontalAnchorses = ['left-width','left-right','width-right']
  export type  WAT_horizontalAnchors   = typeof WAT_horizontalAnchorses[number]

  export const WAT_verticalAnchorses = ['top-height','top-bottom','height-bottom']
  export type  WAT_verticalAnchors   = typeof WAT_verticalAnchorses[number]

  export type WAT_Anchors = [WAT_horizontalAnchors,WAT_verticalAnchors]

  export type WAT_horizontalOffsets = [ WAT_Location|WAT_Dimension, WAT_Location|WAT_Dimension ]
  export type WAT_verticalOffsets   = [ WAT_Location|WAT_Dimension, WAT_Location|WAT_Dimension ]

  export type WAT_Offsets = [
    WAT_Location|WAT_Dimension, WAT_Location|WAT_Dimension,
    WAT_Location|WAT_Dimension, WAT_Location|WAT_Dimension
  ]

/**** configuration-related types ****/

  export const WAT_FontWeights = [
    'thin','extra-light','light','normal','medium','semi-bold',
    'bold','extra-bold','heavy'
  ]
  export type WAT_FontWeight = typeof WAT_FontWeights[number]

  export const WAT_FontWeightValues = {
    'thin':100, 'extra-light':200, 'light':300, 'normal':400, 'medium':500,
    'semi-bold':600, 'bold':700, 'extra-bold':800, 'heavy':900
  }

  export const WAT_FontStyles = ['normal','italic']
  export type  WAT_FontStyle  = typeof WAT_FontStyles[number]

  export const WAT_TextDecorationLines = [ 'none','underline','overline','line-through' ]
  export type  WAT_TextDecorationLine  = typeof WAT_TextDecorationLines[number]

  export const WAT_TextDecorationStyles = [ 'solid','double','dotted','dashed','wavy' ]
  export type  WAT_TextDecorationStyle  = typeof WAT_TextDecorationStyles[number]

  export type WAT_TextDecoration = {
    isActive:  boolean,
    Line:      WAT_TextDecorationLine,
    Color?:    WAT_Color,           // "null" or "undefined" mean "currentColor"
    Style?:    WAT_TextDecorationStyle,
    Thickness?:WAT_Dimension           // "null" or "undefined" mean "from-font"
  }

  export type WAT_TextShadow = {
    isActive:  boolean,
    xOffset:   WAT_Location,
    yOffset:   WAT_Location,
    BlurRadius:WAT_Dimension,
    Color:     WAT_Color                   // Color = "transparent" means "none"
  }

  export const WAT_TextAlignments = [ 'left','center','right','justify' ]
  export type  WAT_TextAlignment  = typeof WAT_TextAlignments[number]

  export type WAT_BackgroundTexture = {
    isActive:boolean,
    ImageURL:WAT_URL,
    Mode:    WAT_BackgroundMode,
    xOffset: WAT_Location,
    yOffset: WAT_Location
  }

  export const WAT_BackgroundModes = [ 'normal','contain','cover','fill','tile' ]
  export type  WAT_BackgroundMode  = typeof WAT_BackgroundModes[number]

  export const WAT_BorderStyles = [
    'none','hidden','dotted','dashed','solid','double','groove','ridge',
    'inset','outset'
  ]
  export type WAT_BorderStyle = typeof WAT_BorderStyles[number]

  export type WAT_BoxShadow = {
    isActive:    boolean,
    xOffset:     WAT_Location,
    yOffset:     WAT_Location,
    BlurRadius:  WAT_Dimension,
    SpreadRadius:WAT_Dimension,
    Color:       WAT_Color
  }

  export const WAT_Cursors = [
    'auto','none','default','alias','all-scroll','cell','context-menu',
    'col-resize','copy','crosshair','e-resize','ew-resize','grab','grabbing',
    'help','move','n-resize','ne-resize','nesw-resize','ns-resize','nw-resize',
    'nwse-resize','no-drop','not-allowed','pointer','progress','row-resize',
    's-resize','se-resize','sw-resize','text','vertical-text','w-resize','wait',
    'zoom-in','zoom-out'
  ]
  export type WAT_Cursor = typeof WAT_Cursors[number]

/**** Error Report ****/

  export const WAT_ErrorTypes = [
//  'missing Behaviour',         'Behaviour Execution Failure',
    'Script Compilation Failure','Script Execution Failure',
    'Rendering Failure',         'Event Handling Failure',
    '"onMount" Callback Failure','"onUnmount" Callback Failure',
    '"onFocus" Callback Failure','"onBlur" Callback Failure',
    '"onClick" Callback Failure','"onInput" Callback Failure',
    '"onDrop" Callback Failure', '"onValueChange" Callback Failure'
  ]
  export type WAT_ErrorType = typeof WAT_ErrorTypes[number]

  export type WAT_ErrorReport = {
    Type:WAT_ErrorType,          // also serves as a title for the error display
    Sufferer:WAT_Visual,
    Message:WAT_Text,
    Cause:any
  }

/**** Dialogs and Overlays ****/

  type WAT_Dialog = {
    Name:WAT_Name, normalizedName:WAT_Name, SourceWidgetPath:WAT_Path,
    Title?:WAT_Textline,
    isModal:boolean, isClosable:boolean, isDraggable:boolean, isResizable:boolean,
    x:WAT_Location, y:WAT_Location, Width:WAT_Dimension, Height:WAT_Dimension,
    minWidth?:WAT_Dimension, minHeight?:WAT_Dimension,
    maxWidth?:WAT_Dimension, maxHeight?:WAT_Dimension,
    onOpen?:Function, onClose?:Function
  }

  type WAT_Overlay = {
    Name:WAT_Name, normalizedName:WAT_Name, SourceWidgetPath:WAT_Path,
    isModal:boolean,
    x:WAT_Location, y:WAT_Location, Width:WAT_Dimension, Height:WAT_Dimension,
    minWidth?:WAT_Dimension, minHeight?:WAT_Dimension,
    maxWidth?:WAT_Dimension, maxHeight?:WAT_Dimension,
    onOpen?:Function, onClose?:Function
  }/**** throwError - simplifies construction of named errors ****/

  export function throwError (Message:string):never {
    let Match = /^([$a-zA-Z][$a-zA-Z0-9]*):\s*(\S.+)\s*$/.exec(Message)
    if (Match == null) {
      throw new Error(Message)
    } else {
      let namedError = new Error(Match[2])
        namedError.name = Match[1]
      throw namedError
    }
  }

/**** throwReadOnlyError ****/

// @ts-ignore TS2534 why is TS complaining here?
  export function throwReadOnlyError (Name:string):never {
    throwError(
      'ReadOnlyProperty: property ' + quoted(Name) + ' must not be set'
    )
  }

//------------------------------------------------------------------------------
//--                 Classification and Validation Functions                  --
//------------------------------------------------------------------------------

/**** ValueIsName ****/

  const WAT_NamePattern = /^[^\x00-\x1F\x7F /#][^\x00-\x1F\x7F/]*$/
                                // no ctrl.char.s, no "/", no leading " " or "#"

  export function ValueIsName (Value:any):boolean {
    return (
      ValueIsStringMatching(Value,WAT_NamePattern) &&
      (Value.trim() === Value) &&
      (Value.trim() !== '.') && (Value.trim() !== '..')
    )
  }

/**** allow/expect[ed]Name ****/

  export const allowName = ValidatorForClassifier(
    ValueIsName, acceptNil, 'WAT name'
  ), allowedName = allowName

  export const expectName = ValidatorForClassifier(
    ValueIsName, rejectNil, 'WAT name'
  ), expectedName = expectName

/**** ValueIsPath ****/

  export function ValueIsPath (Value:any):boolean {
    return (
      ValueIsString(Value) &&
      Value.trim().split('/').every(StringIsPathItem)
    )
  }

  export function StringIsPathItem (Value:string):boolean {
    return (
      (Value.trim() === Value) && (
        (Value === '') || (Value === '.') || (Value === '..') ||
        /^#\d+$/.test(Value) || ValueIsName(Value)
      )
    )
  }

/**** allow/expect[ed]Path ****/

  export const allowPath = ValidatorForClassifier(
    ValueIsPath, acceptNil, 'WAT path'
  ), allowedPath = allowPath

  export const expectPath = ValidatorForClassifier(
    ValueIsPath, rejectNil, 'WAT path'
  ), expectedPath = expectPath

/**** ValueIsVisual ****/

  export function ValueIsVisual (Value:any):boolean {
    return (Value instanceof WAT_Visual)
  }

/**** allow/expect[ed]Visual ****/

  export const allowVisual = ValidatorForClassifier(
    ValueIsVisual, acceptNil, 'WAT visual'
  ), allowedVisual = allowVisual

  export const expectVisual = ValidatorForClassifier(
    ValueIsVisual, rejectNil, 'WAT visual'
  ), expectedVisual = expectVisual

/**** ValueIsApplet ****/

  export function ValueIsApplet (Value:any):boolean {
    return (Value instanceof WAT_Applet)
  }

/**** allow/expect[ed]Applet ****/

  export const allowApplet = ValidatorForClassifier(
    ValueIsApplet, acceptNil, 'WAT applet'
  ), allowedApplet = allowApplet

  export const expectApplet = ValidatorForClassifier(
    ValueIsApplet, rejectNil, 'WAT applet'
  ), expectedApplet = expectApplet

/**** ValueIsPage ****/

  export function ValueIsPage (Value:any):boolean {
    return (Value instanceof WAT_Page)
  }

/**** allow/expect[ed]Page ****/

  export const allowPage = ValidatorForClassifier(
    ValueIsPage, acceptNil, 'WAT page'
  ), allowedPage = allowPage

  export const expectPage = ValidatorForClassifier(
    ValueIsPage, rejectNil, 'WAT page'
  ), expectedPage = expectPage

/**** ValueIsWidget ****/

  export function ValueIsWidget (Value:any):boolean {
    return (Value instanceof WAT_Widget)
  }

/**** allow/expect[ed]Widget ****/

  export const allowWidget = ValidatorForClassifier(
    ValueIsWidget, acceptNil, 'WAT widget'
  ), allowedWidget = allowWidget

  export const expectWidget = ValidatorForClassifier(
    ValueIsWidget, rejectNil, 'WAT widget'
  ), expectedWidget = expectWidget

/**** ValueIsWidgetType ****/

  export function ValueIsWidgetType (Value:any):boolean {
    return ValueIsString(Value) && (Value in builtInWidgetTypes)
  }

/**** allow/expect[ed]WidgetType ****/

  export const allowWidgetType = ValidatorForClassifier(
    ValueIsWidgetType, acceptNil, 'WAT widget type'
  ), allowedWidgetType = allowWidgetType

  export const expectWidgetType = ValidatorForClassifier(
    ValueIsWidgetType, rejectNil, 'WAT widget type'
  ), expectedWidgetType = expectWidgetType

/**** ValueIsLocation ****/

  export function ValueIsLocation (Value:any):boolean {
    return ValueIsFiniteNumber(Value)
  }

/**** allow/expect[ed]Location ****/

  export const allowLocation = ValidatorForClassifier(
    ValueIsLocation, acceptNil, 'WAT coordinate'
  ), allowedLocation = allowLocation

  export const expectLocation = ValidatorForClassifier(
    ValueIsLocation, rejectNil, 'WAT coordinate'
  ), expectedLocation = expectLocation

/**** ValueIsDimension ****/

  export function ValueIsDimension (Value:any):boolean {
    return ValueIsFiniteNumber(Value) && (Value >= 0)
  }

/**** allow/expect[ed]Dimension ****/

  export const allowDimension = ValidatorForClassifier(
    ValueIsDimension, acceptNil, 'WAT dimension'
  ), allowedDimension = allowDimension

  export const expectDimension = ValidatorForClassifier(
    ValueIsDimension, rejectNil, 'WAT dimension'
  ), expectedDimension = expectDimension

/**** ValueIsPosition ****/

  export function ValueIsPosition (Value:any):boolean {
    return (
      ValueIsObject(Value) &&
      ValueIsLocation(Value.x) &&
      ValueIsLocation(Value.y)
    )
  }

/**** allow/expect[ed]Position ****/

  export const allowPosition = ValidatorForClassifier(
    ValueIsPosition, acceptNil, 'WAT position'
  ), allowedPosition = allowPosition

  export const expectPosition = ValidatorForClassifier(
    ValueIsPosition, rejectNil, 'WAT position'
  ), expectedPosition = expectPosition

/**** ValueIsSize ****/

  export function ValueIsSize (Value:any):boolean {
    return (
      ValueIsObject(Value) &&
      ValueIsDimension(Value.Width) &&
      ValueIsDimension(Value.Height)
    )
  }

/**** allow/expect[ed]Size ****/

  export const allowSize = ValidatorForClassifier(
    ValueIsSize, acceptNil, 'WAT size'
  ), allowedSize = allowSize

  export const expectSize = ValidatorForClassifier(
    ValueIsSize, rejectNil, 'WAT size'
  ), expectedSize = expectSize

/**** ValueIsGeometry ****/

  export function ValueIsGeometry (Value:any):boolean {
    return (
      ValueIsObject(Value) &&
      ValueIsLocation(Value.x) && ValueIsDimension(Value.Width) &&
      ValueIsLocation(Value.y) && ValueIsDimension(Value.Height)
    )
  }

/**** allow/expect[ed]Geometry ****/

  export const allowGeometry = ValidatorForClassifier(
    ValueIsGeometry, acceptNil, 'WAT geometry'
  ), allowedGeometry = allowGeometry

  export const expectGeometry = ValidatorForClassifier(
    ValueIsGeometry, rejectNil, 'WAT geometry'
  ), expectedGeometry = expectGeometry

/**** ValueIsIncompleteGeometry ****/

  function ValueIsIncompleteGeometry (Value:any):boolean {
    if (! ValueIsPlainObject(Value)) { return false }

    for (let Key in Value) {
      if (Value.hasOwnProperty(Key)) {
        switch (Key) {
          case 'x': case 'y':
            if ((Value[Key] != null) && ! ValueIsLocation(Value[Key])) {
              return false
            }
            break
          case 'Width': case 'Height':
            if ((Value[Key] != null) && ! ValueIsDimension(Value[Key])) {
              return false
            }
            break
          default:
            return false
        }
      }
    }

    return true
  }

/**** allow/expect[ed]IncompleteGeometry ****/

  const allowIncompleteGeometry = ValidatorForClassifier(
    ValueIsIncompleteGeometry, acceptNil, 'WAT geometry'
  ), allowedIncompleteGeometry = allowIncompleteGeometry

  const expectIncompleteGeometry = ValidatorForClassifier(
    ValueIsIncompleteGeometry, rejectNil, 'WAT geometry'
  ), expectedIncompleteGeometry = expectIncompleteGeometry

/**** ValueIsTextDecoration ****/

  export function ValueIsTextDecoration (Value:any):boolean {
    return (Value === 'none') || (
      ValueIsObject(Value) &&
      ValueIsBoolean(Value.isActive) &&
      ValueIsOneOf(Value.Line, WAT_TextDecorationLines) &&
      ((Value.Color == null) || ValueIsColor(Value.Color)) &&
      ((Value.Style == null) || ValueIsOneOf(Value.Style,WAT_TextDecorationStyles)) &&
      ((Value.Thickness == null) || ValueIsDimension(Value.Thickness))
    )
  }

/**** allow/expect[ed]TextDecoration ****/

  export const allowTextDecoration = ValidatorForClassifier(
    ValueIsTextDecoration, acceptNil, 'a text decoration'
  ), allowedTextDecoration = allowTextDecoration

  export const expectTextDecoration = ValidatorForClassifier(
    ValueIsTextDecoration, rejectNil, 'a text decoration'
  ), expectedTextDecoration = expectTextDecoration

/**** ValueIsTextShadow ****/

  export function ValueIsTextShadow (Value:any):boolean {
    return (Value === 'none') || (
      ValueIsObject(Value) &&
      ValueIsBoolean(Value.isActive) &&
      ValueIsLocation(Value.xOffset) && ValueIsLocation(Value.yOffset) &&
      ValueIsDimension(Value.BlurRadius) && ValueIsColor(Value.Color)
    )
  }

/**** allow/expect[ed]TextShadow ****/

  export const allowTextShadow = ValidatorForClassifier(
    ValueIsTextShadow, acceptNil, 'widget text shadow specification'
  ), allowedTextShadow = allowTextShadow

  export const expectTextShadow = ValidatorForClassifier(
    ValueIsTextShadow, rejectNil, 'a text shadow specification'
  ), expectedTextShadow = expectTextShadow

/**** ValueIsBackgroundTexture ****/

  export function ValueIsBackgroundTexture (Value:any):boolean {
    return (Value === 'none') || (
      ValueIsObject(Value) &&
      ValueIsBoolean(Value.isActive) &&
      ValueIsURL(Value.ImageURL) &&
      ValueIsOneOf(Value.Mode, WAT_BackgroundModes) &&
      ValueIsLocation(Value.xOffset) && ValueIsLocation(Value.yOffset)
    )
  }

/**** allow/expect[ed]BackgroundTexture ****/

  export const allowBackgroundTexture = ValidatorForClassifier(
    ValueIsBackgroundTexture, acceptNil, 'widget background texture'
  ), allowedBackgroundTexture = allowBackgroundTexture

  export const expectBackgroundTexture = ValidatorForClassifier(
    ValueIsBackgroundTexture, rejectNil, 'widget background texture'
  ), expectedBackgroundTexture = expectBackgroundTexture

/**** ValueIsBoxShadow ****/

  export function ValueIsBoxShadow (Value:any):boolean {
    return (Value === 'none') || (
      ValueIsObject(Value) &&
      ValueIsBoolean(Value.isActive) &&
      ValueIsLocation(Value.xOffset) && ValueIsLocation(Value.yOffset) &&
      ValueIsDimension(Value.BlurRadius) && ValueIsDimension(Value.SpreadRadius) &&
      ValueIsColor(Value.Color)
    )
  }

/**** allow/expect[ed]BoxShadow ****/

  export const allowBoxShadow = ValidatorForClassifier(
    ValueIsBoxShadow, acceptNil, 'widget box shadow specification'
  ), allowedBoxShadow = allowBoxShadow

  export const expectBoxShadow = ValidatorForClassifier(
    ValueIsBoxShadow, rejectNil, 'widget box shadow specification'
  ), expectedBoxShadow = expectBoxShadow

/**** ValueIsErrorReport ****/

  export function ValueIsErrorReport (Value:any):boolean {
    return (
      ValueIsPlainObject(Value) &&
      ValueIsOneOf(Value.Type,WAT_ErrorTypes) &&
      ValueIsText(Value.Message)
    )
  }

/**** allow/expect[ed]ErrorReport ****/

  export const allowErrorReport = ValidatorForClassifier(
    ValueIsErrorReport, acceptNil, 'WAT error report'
  ), allowedErrorReport = allowErrorReport

  export const expectErrorReport = ValidatorForClassifier(
    ValueIsErrorReport, rejectNil, 'WAT error report'
  ), expectedErrorReport = expectErrorReport

/**** ValueIsSerializableValue ****/

  export function ValueIsSerializableValue (Value:any):boolean {
    switch (true) {
      case (Value === null):
      case ValueIsBoolean(Value):
      case ValueIsNumber(Value):
      case ValueIsString(Value):
      case ValueIsListSatisfying(Value,ValueIsSerializableValue):
        return true
      case ValueIsPlainObject(Value): // *C* check for recursion
        for (let Property in Value) {
          if (
            Value.hasOwnProperty(Property) &&
            ! ValueIsSerializableValue(Value[Property])
          ) { return false }
        }
        return true
    }
    return false
  }

/**** allow/expect[ed]SerializableValue ****/

  export const allowSerializableValue = ValidatorForClassifier(
    ValueIsSerializableValue, acceptNil, 'serializable value'
  ), allowedSerializableValue = allowSerializableValue

  export const expectSerializableValue = ValidatorForClassifier(
    ValueIsSerializableValue, rejectNil, 'serializable value'
  ), expectedSerializableValue = expectSerializableValue

/**** ValueIsSerializableObject ****/

  export function ValueIsSerializableObject (Value:any):boolean {
    if (ValueIsPlainObject(Value)) {
      for (let Property in Value) {
        if (
          Value.hasOwnProperty(Property) &&
          ! ValueIsSerializableValue(Value[Property])
        ) { return false }
      }
      return true
    } else {
      return false
    }
  }

/**** allow/expect[ed]SerializableObject ****/

  export const allowSerializableObject = ValidatorForClassifier(
    ValueIsSerializableObject, acceptNil, 'serializable object'
  ), allowedSerializableObject = allowSerializableObject

  export const expectSerializableObject = ValidatorForClassifier(
    ValueIsSerializableObject, rejectNil, 'serializable object'
  ), expectedSerializableObject = expectSerializableObject

//------------------------------------------------------------------------------
//--                           Stylesheet Handling                            --
//------------------------------------------------------------------------------

  let StyleElement = document.getElementById('WAT-Stylesheet')
  if (StyleElement == null) {
    StyleElement = document.createElement('style')
      StyleElement.id          = 'WAT-Stylesheet'
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
*                        WebApp Tinkerer (WAT) Runtime                         *
*                                                                              *
*******************************************************************************/

  div[type="wat/applet"] { overflow:visible }       /* important for designer */

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
    background:white; color:black;
    font-family:'Source Sans Pro','Helvetica Neue',Helvetica,Arial,sans-serif;
    font-size:14px; font-weight:normal; line-height:1.4; color:black;
    text-align:left; text-shadow:none;
  }

  .WAT.Applet.fullscreen{
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

`.trimLeft())

//------------------------------------------------------------------------------
//--                               Acceptables                                --
//------------------------------------------------------------------------------

/**** acceptableBoolean ****/

  export function acceptableBoolean (Value:any, Default:boolean):boolean {
    return (ValueIsBoolean(Value) ? Value : Default)
  }

/**** acceptableOptionalBoolean ****/

  export function acceptableOptionalBoolean (
    Value:any, Default?:boolean|undefined
  ):boolean|undefined {
    return (
      Value == null
      ? undefined
      : ValueIsBoolean(Value) ? Value : Default
    )
  }

/**** acceptableNumber ****/

  export function acceptableNumber (Value:any, Default:number):number {
    return (ValueIsNumber(Value) ? Value : Default)
  }

/**** acceptableOptionalNumber ****/

  export function acceptableOptionalNumber (
    Value:any, Default?:number|undefined
  ):number|undefined {
    return (ValueIsNumber(Value) ? Value : Default)
  }

/**** acceptableNumberInRange ****/

  export function acceptableNumberInRange (
    Value:any, Default:number,
    minValue:number = -Infinity, maxValue:number = Infinity,
    withMin:boolean = false, withMax:boolean = false
  ):number {
    return (ValueIsNumberInRange(Value,minValue,maxValue,withMin,withMax) ? Value : Default)
  }

/**** acceptableOptionalNumberInRange ****/

  export function acceptableOptionalNumberInRange (
    Value:any, Default:number|undefined,
    minValue:number = -Infinity, maxValue:number = Infinity,
    withMin:boolean = false, withMax:boolean = false
  ):number|undefined {
    return (
      ValueIsNumberInRange(Value,minValue,maxValue,withMin,withMax)
      ? Value
      : Default
    )
  }

/**** acceptableInteger ****/

  export function acceptableInteger (Value:any, Default:number):number {
    return (ValueIsInteger(Value) ? Value : Default)
  }

/**** acceptableOptionalInteger ****/

  export function acceptableOptionalInteger (
    Value:any, Default:number|undefined
  ):number|undefined {
    return (ValueIsInteger(Value) ? Value : Default)
  }

/**** acceptableIntegerInRange ****/

  export function acceptableIntegerInRange (
    Value:any, Default:number, minValue:number = -Infinity, maxValue:number = Infinity
  ):number {
    return (ValueIsIntegerInRange(Value,minValue,maxValue) ? Value : Default)
  }

/**** acceptableOptionalIntegerInRange ****/

  export function acceptableOptionalIntegerInRange (
    Value:any, Default:number|undefined,
    minValue:number = -Infinity, maxValue:number = Infinity
  ):number|undefined {
    return (ValueIsIntegerInRange(Value,minValue,maxValue) ? Value : Default)
  }

/**** acceptableOrdinal ****/

  export function acceptableOrdinal (Value:any, Default:number):number {
    return (ValueIsOrdinal(Value) ? Value : Default)
  }

/**** acceptableOptionalOrdinal ****/

  export function acceptableOptionalOrdinal (
    Value:any, Default?:number|undefined
  ):number|undefined {
    return (ValueIsOrdinal(Value) ? Value : Default)
  }

/**** acceptableString ****/

  export function acceptableString (Value:any, Default:string):string {
    return (ValueIsString(Value) ? Value : Default)
  }

/**** acceptableOptionalString ****/

  export function acceptableOptionalString (
    Value:any, Default?:string|undefined
  ):string|undefined {
    return (ValueIsString(Value) ? Value : Default)
  }

/**** acceptableNonEmptyString ****/

  export function acceptableNonEmptyString (Value:any, Default:string):string {
    return (ValueIsString(Value) && (Value.trim() !== '') ? Value : Default)
  }

/**** acceptableOptionalNonEmptyString ****/

  export function acceptableOptionalNonEmptyString (
    Value:any, Default?:string|undefined
  ):string|undefined {
    return (ValueIsString(Value) && (Value.trim() !== '') ? Value : Default)
  }

/**** acceptableStringMatching ****/

  export function acceptableStringMatching (
    Value:any, Default:string, Pattern:RegExp
  ):string {
    return (ValueIsStringMatching(Value,Pattern) ? Value : Default)
  }

/**** acceptableOptionalStringMatching ****/

  export function acceptableOptionalStringMatching (
    Value:any, Default:string|undefined, Pattern:RegExp
  ):string|undefined {
    return (ValueIsStringMatching(Value,Pattern) ? Value : Default)
  }

/**** acceptableText ****/

  const noCtrlCharsButCRLFTABPattern = /^[^\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x9F\u2028\u2029\uFFF9-\uFFFB]*$/

  export function acceptableText (Value:any, Default:string):string {
    return (ValueIsStringMatching(Value,noCtrlCharsButCRLFTABPattern) ? Value : Default)
  }

/**** acceptableOptionalText ****/

  export function acceptableOptionalText (
    Value:any, Default?:string|undefined
  ):string|undefined {
    return (ValueIsText(Value) ? Value : Default)
  }

/**** acceptableTextline ****/

  export function acceptableTextline (Value:any, Default:string):string {
    return (ValueIsTextline(Value) ? Value : Default).replace(
      /[\f\r\n\v\u0085\u2028\u2029].*$/,'...'
    )
  }

/**** acceptableOptionalTextline ****/

  export function acceptableOptionalTextline (
    Value:any, Default?:string|undefined
  ):string|undefined {
    const Result = ValueIsTextline(Value) ? Value : Default
    return (
      Result == null
      ? undefined
      : Result.replace(/[\f\r\n\v\u0085\u2028\u2029].*$/,'...')
    )
  }

/**** acceptableFunction ****/

  export function acceptableFunction (Value:any, Default:Function):Function {
    return (ValueIsFunction(Value) ? Value : Default)
  }

/**** acceptableOptionalFunction ****/

  export function acceptableOptionalFunction (
    Value:any, Default?:Function|undefined
  ):Function|undefined {
    return (ValueIsFunction(Value) ? Value : Default)
  }

/**** acceptableList ****/

  export function acceptableList (Value:any, Default:any[]):any[] {
    return (ValueIsList(Value) ? Value : Default)
  }

/**** acceptableOptionalList ****/

  export function acceptableOptionalList (
    Value:any, Default?:any[]|undefined
  ):any[]|undefined {
    return (ValueIsList(Value) ? Value : Default)
  }

/**** acceptableListSatisfying ****/

  export function acceptableListSatisfying (
    Value:any, Default:any[], Matcher:Function
  ):any[] {
    return (ValueIsListSatisfying(Value,Matcher) ? Value : Default)
  }

/**** acceptableOptionalListSatisfying ****/

  export function acceptableOptionalListSatisfying (
    Value:any, Default:any[]|undefined, Matcher:Function
  ):any[]|undefined {
    return (ValueIsListSatisfying(Value,Matcher) ? Value : Default)
  }

/**** acceptableOneOf ****/

  export function acceptableOneOf (
    Value:any, Default:any, ValueList:any[]
  ):any {
    return (ValueIsOneOf(Value,ValueList) ? Value : Default)
  }

/**** acceptableOptionalOneOf ****/

  export function acceptableOptionalOneOf (
    Value:any, ValueList:any[]
  ):any|undefined {
    return (ValueIsOneOf(Value,ValueList) ? Value : undefined)
  }

/**** acceptableColor ****/

  export function acceptableColor (Value:any, Default:string):string {
    return (ValueIsColor(Value) ? Value : Default)
  }

/**** acceptableOptionalColor ****/

  export function acceptableOptionalColor (
    Value:any, Default?:string|undefined
  ):string|undefined {
    return (ValueIsColor(Value) ? Value : Default)
  }

/**** acceptableEMailAddress ****/

  export function acceptableEMailAddress (Value:any, Default:string):string {
    return (ValueIsEMailAddress(Value) ? Value : Default)
  }

/**** acceptablePhoneNumber ****/

  export function acceptablePhoneNumber (Value:any, Default:string):string {
    return (/*ValueIsPhoneNumber*/ValueIsTextline(Value) ? Value : Default)
  }

/**** acceptableURL ****/

  export function acceptableURL (Value:any, Default:string):string {
    return (ValueIsURL(Value) ? Value : Default)
  }

/**** acceptableName ****/

  export function acceptableName (Value:any, Default:WAT_Name):WAT_Name {
    return (ValueIsName(Value) ? Value : Default)
  }

//------------------------------------------------------------------------------
//--                           Reactivity Handling                            --
//------------------------------------------------------------------------------

  const reactiveFunctionsForVisual:WeakMap<WAT_Visual,Function[]>  = new WeakMap()

/**** registerReactiveFunctionIn ****/

  function registerReactiveFunctionIn (
    Visual:WAT_Visual, reactiveFunction:Function
  ):void {
    let reactiveFunctions = reactiveFunctionsForVisual.get(Visual)
    if (reactiveFunctions == null) {
      reactiveFunctionsForVisual.set(Visual,reactiveFunctions = [])
    }
    reactiveFunctions.push(reactiveFunction)
  }

/**** unregisterAllReactiveFunctionsFrom ****/

  function unregisterAllReactiveFunctionsFrom (Visual:WAT_Visual):void {
    let reactiveFunctions = reactiveFunctionsForVisual.get(Visual)
    if (reactiveFunctions == null) { return }

    reactiveFunctions.forEach((reactiveFunction:Function) => {
      dispose(reactiveFunction)
    })
  }

//------------------------------------------------------------------------------
//--                              Error Handling                              --
//------------------------------------------------------------------------------

/**** setErrorReport ****/

  function setErrorReport (
    Visual:WAT_Visual, ErrorReport:WAT_ErrorReport|undefined
  ):void {
    expectVisual          ('visual',Visual)
    allowErrorReport('error report',ErrorReport)

    if (ValuesDiffer(Visual.ErrorReport,ErrorReport)) {
      (Visual as Indexable)._ErrorReport = ErrorReport
      Visual.rerender()
    }
  }

/**** setScriptError (used by Designer) ****/

  export function setScriptError (
    Visual:WAT_Visual, ScriptError:WAT_ErrorReport|undefined
  ):void {
    expectVisual          ('visual',Visual)
    allowErrorReport('script error',ScriptError)

    if (ValuesDiffer(Visual.ScriptError,ScriptError)) {
      (Visual as Indexable)._ScriptError = ScriptError
      Visual.rerender()
    }
  }

/**** ErrorRenderingFor ****/

  function ErrorRenderingFor (Visual:WAT_Visual):any {
    const onClick = () => showErrorReport(Visual,Visual.ErrorReport as WAT_ErrorReport)
    return html`<div class="WAT ErrorIndicator" onClick=${onClick}/>`
  }

/**** showErrorReport ****/

  function showErrorReport (Visual:WAT_Visual, ErrorReport:WAT_ErrorReport):void {
    if (typeof (DesignerLayer as Indexable)?.showErrorReport === 'function') {
      (DesignerLayer as Indexable).showErrorReport(Visual,ErrorReport)
    } else {
      window.alert(
        ErrorReport.Type + '\n\n' + ErrorReport.Message
      )
    }
  }

//-------------------------------------------------------------------------------
//--                            Gesture Recognizer                             --
//-------------------------------------------------------------------------------
// warning: coordinates are relative to the viewport!

  export function GestureRecognizer (OptionSet:Indexable):Function {
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
//--                                WAT_Visual                                --
//------------------------------------------------------------------------------

  export abstract class WAT_Visual {
    protected _Container:WAT_Visual|undefined

    protected constructor (Container?:WAT_Visual) {
      this._Container = Container
    }

  /**** Name ****/

    protected _Name:WAT_Name|undefined

    public get Name ():WAT_Name|undefined { return this._Name }
    public set Name (newName:WAT_Name|undefined) {
      if (ValueIsString(newName)) {
        newName = (newName as string).trim()
        if (newName === '') { newName = undefined }
      }

      allowName('WAT name',newName)

      if (this._Name !== newName) {
        this._Name = newName
        this.rerender()
      }
    }

  /**** normalizedName ****/

    public get normalizedName ():WAT_Name|undefined {
      return (this._Name == null ? undefined : this._Name.toLowerCase())
    }
    public set normalizedName (_:boolean) { throwReadOnlyError('normalizedName') }

  /**** Path - to be overwritten ****/

// @ts-ignore TS2378 this getter throws
    public get Path ():WAT_Path  { throwError('InternalError: "Path" has to be overwritten') }
    public set Path (_:WAT_Path) { throwReadOnlyError('Path') }

  /**** isAttached ****/

// @ts-ignore TS2378 this getter throws
    public get isAttached ():boolean  { throwError('InternalError: "isAttached" has to be overwritten') }
    public set isAttached (_:boolean) { throwReadOnlyError('isAttached') }

  /**** configure ****/

    public configure (OptionSet:Indexable):void {
      expectPlainObject('options set',OptionSet)

      for (const Key in OptionSet) {
        if (OptionSet.hasOwnProperty(Key)) {
          (this as Indexable)[Key] = OptionSet[Key]
        }
      }
    }

  /**** FontFamily - inheritable ****/

    protected _FontFamily:WAT_Textline|undefined

    public get FontFamily ():WAT_Textline|undefined {
      return (
        this._FontFamily == null
        ? this._Container == null ? undefined : this._Container.FontFamily
        : this._FontFamily
      )
    }

    public set FontFamily (newFontFamily:WAT_Textline|undefined) {
      allowTextline('font family',newFontFamily)
      if ((newFontFamily || '').trim() === '') { newFontFamily = undefined }

      if (this._FontFamily !== newFontFamily) {
        this._FontFamily = newFontFamily
        this.rerender()
      }
    }

  /**** FontSize - inheritable ****/

    protected _FontSize:WAT_Ordinal|undefined

    public get FontSize ():WAT_Ordinal|undefined {
      return (
        this._FontSize == null
        ? this._Container == null ? undefined : this._Container.FontSize
        : this._FontSize
      )
    }

    public set FontSize (newFontSize:WAT_Ordinal|undefined) {
      allowOrdinal('font size',newFontSize)
      if (this._FontSize !== newFontSize) {
        this._FontSize = newFontSize
        this.rerender()
      }
    }

  /**** FontWeight - inheritable ****/

    protected _FontWeight:WAT_FontWeight|undefined

    public get FontWeight ():WAT_FontWeight|undefined {
      return (
        this._FontWeight == null
        ? this._Container == null ? undefined : this._Container.FontWeight
        : this._FontWeight
      )
    }

    public set FontWeight (newFontWeight:WAT_FontWeight|undefined) {
      allowOneOf('font weight',newFontWeight, WAT_FontWeights)
      if (this._FontWeight !== newFontWeight) {
        this._FontWeight = newFontWeight
        this.rerender()
      }
    }

  /**** FontStyle - inheritable ****/

    protected _FontStyle:WAT_FontStyle|undefined

    public get FontStyle ():WAT_FontStyle|undefined {
      return (
        this._FontStyle == null
        ? this._Container == null ? undefined : this._Container.FontStyle
        : this._FontStyle
      )
    }

    public set FontStyle (newFontStyle:WAT_FontStyle|undefined) {
      allowOneOf('font style',newFontStyle, WAT_FontStyles)
      if (this._FontStyle !== newFontStyle) {
        this._FontStyle = newFontStyle
        this.rerender()
      }
    }

  /**** TextDecoration - not inheritable ****/

    protected _TextDecoration:WAT_TextDecoration|undefined

    public get TextDecoration ():WAT_TextDecoration|undefined {
      return (this._TextDecoration == null ? undefined : { ...this._TextDecoration })
    }

    public set TextDecoration (newTextDecoration:WAT_TextDecoration|undefined) {
      allowTextDecoration('text decoration',newTextDecoration)
      if (ValuesDiffer(this._TextDecoration,newTextDecoration)) {
        if (newTextDecoration == null) {
          this._TextDecoration = undefined
        } else {
          const { isActive, Line, Color, Style, Thickness } = newTextDecoration
          this._TextDecoration = { isActive, Line, Color, Style, Thickness }
        }
        this.rerender()
      }
    }

  /**** TextShadow - inheritable ****/

    protected _TextShadow:WAT_TextShadow|undefined

    public get TextShadow ():WAT_TextShadow|undefined {
      return (
        this._TextShadow == null
        ? this._Container == null ? undefined : this._Container.TextShadow
        : this._TextShadow
      )
    }

    public set TextShadow (newTextShadow:WAT_TextShadow|undefined) {
      allowTextShadow('text shadow',newTextShadow)
      if (ValuesDiffer(this._TextShadow,newTextShadow)) {
        if (newTextShadow == null) {
          this._TextShadow = undefined
        } else {
          const { isActive, xOffset,yOffset, BlurRadius, Color } = newTextShadow
          this._TextShadow = { isActive, xOffset,yOffset, BlurRadius, Color }
        }
        this.rerender()
      }
    }

  /**** TextAlignment - inheritable ****/

    protected _TextAlignment:WAT_TextAlignment|undefined

    public get TextAlignment ():WAT_TextAlignment|undefined {
      return (
        this._TextAlignment == null
        ? this._Container == null ? undefined : this._Container.TextAlignment
        : this._TextAlignment
      )
    }

    public set TextAlignment (newTextAlignment:WAT_TextAlignment|undefined) {
      allowOneOf('text alignment',newTextAlignment, WAT_TextAlignments)
      if (this._TextAlignment !== newTextAlignment) {
        this._TextAlignment = newTextAlignment
        this.rerender()
      }
    }

  /**** LineHeight - inheritable ****/

    protected _LineHeight:WAT_Ordinal|undefined

    public get LineHeight ():WAT_Ordinal|undefined {
      return (
        this._LineHeight == null
        ? this._Container == null ? undefined : this._Container.LineHeight
        : this._LineHeight
      )
    }

    public set LineHeight (newLineHeight:WAT_Ordinal|undefined) {
      allowOrdinal('line height',newLineHeight)
      if (this._LineHeight !== newLineHeight) {
        this._LineHeight = newLineHeight
        this.rerender()
      }
    }

  /**** ForegroundColor - inheritable ****/

    protected _ForegroundColor:WAT_Color|undefined

    public get ForegroundColor ():WAT_Color|undefined {
      return (
        this._ForegroundColor == null
        ? this._Container == null ? undefined : this._Container.ForegroundColor
        : this._ForegroundColor
      )
    }

    public set ForegroundColor (newForegroundColor:WAT_Color|undefined) {
      allowColor('foreground color',newForegroundColor)
      if (this._ForegroundColor !== newForegroundColor) {
        this._ForegroundColor = newForegroundColor
        this.rerender()
      }
    }

  /**** Color - synonym for "ForegroundColor" ****/

    public get Color ():WAT_Color|undefined { return this.ForegroundColor }
    public set Color (newColor:WAT_Color|undefined) { this.ForegroundColor = newColor }

  /**** BackgroundColor - inheritable ****/

    protected _BackgroundColor:WAT_Color|undefined

    public get BackgroundColor ():WAT_Color|undefined {
      return (
        this._BackgroundColor == null
        ? this._Container == null ? undefined : this._Container.BackgroundColor
        : this._BackgroundColor
      )
    }

    public set BackgroundColor (newColor:WAT_Color|undefined) {
      allowColor('background color',newColor)
      if (this._BackgroundColor !== newColor) {
        this._BackgroundColor = newColor
        this.rerender()
      }
    }

  /**** BackgroundTexture - not inheritable ****/

    protected _BackgroundTexture:WAT_BackgroundTexture|undefined

    public get BackgroundTexture ():WAT_BackgroundTexture|undefined {
      return (
        this._BackgroundTexture == null
        ? undefined
        : { ...this._BackgroundTexture }
      )
    }

    public set BackgroundTexture (newTexture:WAT_BackgroundTexture|undefined) {
      allowBackgroundTexture('background texture',newTexture)
      if (ValuesDiffer(this._BackgroundTexture,newTexture)) {
        if (newTexture == null) {
          this._BackgroundTexture = undefined
        } else {
          const { isActive, ImageURL, Mode, xOffset,yOffset } = newTexture
          this._BackgroundTexture = { isActive, ImageURL, Mode, xOffset,yOffset }
        }
        this.rerender()
      }
    }

  /**** hasBackground - not inheritable ****/

    protected _hasBackground:boolean = false

    public get hasBackground ():boolean { return this._hasBackground }
    public set hasBackground (newSetting:boolean) {
      expectBoolean('background setting',newSetting)
      if (this._hasBackground !== newSetting) {
        this._hasBackground = newSetting
        this.rerender()
      }
    }

  /**** Opacity - 0...100%, not inheritable ****/

    protected _Opacity:WAT_Ordinal|undefined

    public get Opacity ():WAT_Ordinal|undefined {
      return this._Opacity
    }

    public set Opacity (newOpacity:WAT_Ordinal|undefined) {
      allowIntegerInRange('opacity',newOpacity, 0,100)
      if (this._Opacity !== newOpacity) {
        this._Opacity = newOpacity
        this.rerender()
      }
    }

  /**** Cursor - inheritable ****/

    protected _Cursor:WAT_Cursor|undefined

    public get Cursor ():WAT_Cursor|undefined {
      return (
        this._Cursor == null
        ? this._Container == null ? undefined : this._Container.Cursor
        : this._Cursor
      )
    }

    public set Cursor (newCursor:WAT_Cursor|undefined) {
      allowOneOf('cursor name',newCursor, WAT_Cursors)
      if ((newCursor || '').trim() === '') { newCursor = undefined }

      if (this._Cursor !== newCursor) {
        this._Cursor = newCursor
        this.rerender()
      }
    }

  /**** Value ****/

    protected _Value:serializableValue|undefined

    public get Value ():serializableValue|undefined { return this._Value }
    public set Value (newValue:serializableValue|undefined) {
      allowSerializableValue('value',newValue)

      if (ValuesDiffer(this._Value,newValue)) {
        this._Value = newValue // *C* a deep copy may be better

        if (this._onValueChange != null) { this._onValueChange_() }  // no typo!

        this.rerender()
      }
    }

  /**** onValueChange ****/

    protected _onValueChange:Function|undefined

    public get onValueChange ():Function|undefined { return this._onValueChange_ }
    public set onValueChange (newCallback:Function|undefined) {
      allowFunction('"onValueChange" callback',newCallback)
      this._onValueChange = newCallback
    }

    protected _onValueChange_ (...ArgList:any[]):void {
      if ((ArgList.length === 1) && (typeof ArgList[0] === 'function')) {
        this._onValueChange = ArgList[0]
      } else {                                            // callback invocation
        try {
          if (this._onValueChange != null) { this._onValueChange.apply(this,ArgList) }
        } catch (Signal:any) {
          setErrorReport(this,{
            Type:'"onValueChange" Callback Failure',
            Sufferer:this, Message:'' + Signal, Cause:Signal
          })
        }
      }
    }

  /**** unobserved ****/

// @ts-ignore TS2564 allow "_unobserved" to be assigned upon first use
    protected _unobserved:Indexable

    public get unobserved ():Indexable {
      if (this._unobserved == null) {
        this._unobserved = {}
      }
      return this._unobserved
    }
    public set unobserved (_:Indexable) { throwReadOnlyError('unobserved') }

  /**** observed ****/

// @ts-ignore TS2564 allow "_observed" to be assigned upon first use
    protected _observed:Indexable

    public get observed ():Indexable {
      if (this._observed == null) {
        this._observed = observe({},{ deep:false })
      }
      return this._observed
    }
    public set observed (_:Indexable) { throwReadOnlyError('observed') }

  /**** memoized ****/

// @ts-ignore TS2564 allow "_memoized" to be assigned upon first use
    protected _memoized:Indexable

    public get memoized ():Indexable {
      if (this._memoized == null) {
        this._memoized = {}
      }
      return this._memoized
    }
    public set memoized (_:Indexable) { throwReadOnlyError('memoized') }

  /**** Script ****/

    public get Script ():WAT_Text {
      return (
        this._pendingScript == null
        ? (this._activeScript || '')
        : this._pendingScript
      )
    }
    public set Script (_:WAT_Text|undefined) { throwReadOnlyError('Script') }

  /**** activeScript - is always treated as existing ****/

    protected _activeScript:WAT_Text|undefined

    public get activeScript ():WAT_Text  { return this._activeScript || '' }
    public set activeScript (_:WAT_Text) { throwReadOnlyError('activeScript') }

  /**** pendingScript - may be missing or may consist of white-space only ****/

    protected _pendingScript:WAT_Text|undefined

    public get pendingScript ():WAT_Text|undefined { return this._pendingScript }
    public set pendingScript (newScript:WAT_Text|undefined) {
      allowText('script',newScript)

      if (this._pendingScript !== newScript) {
        this._pendingScript = newScript
        this.rerender()
      }
    }

  /**** activateScript - even if underlying applet is not (yet) attached ****/

    public async activateScript (Mode:string = 'catch-exception'):Promise<void> {
      let activeScript:string = (this._activeScript || '').trim()

//    this._Renderer = () => '' // not without behaviors!
      unregisterAllReactiveFunctionsFrom(this)

    /**** prepare for script execution ****/

      const reactively = (reactiveFunction:Function):void => {
        expectFunction('reactive function',reactiveFunction)
// @ts-ignore TS2345 do not care about the specific signature of "reactiveFunction"
        registerReactiveFunctionIn(this,computed(() => {
          try {
            reactiveFunction()
          } catch (Signal:any) {
            console.error('WAT: execution error in reactive function',Signal)
          }
        }))
      }

      const onRender      = this._onRender_.bind(this)
      const onMount       = this._onMount_.bind(this)
      const onUnmount     = this._onUnmount_.bind(this)
      const onValueChange = this._onValueChange_.bind(this)

    /**** compile and run the script ****/

      this._ErrorReport = undefined
      this._ScriptError = undefined    // only to be set by "applyPendingScript"
        let compiledScript:Function
        try {
// @ts-ignore TS2351 AsyncFunction *is* constructible
          compiledScript = new AsyncFunction(
            'me,my, html,reactively, onRender,onMount,onUnmount,onValueChange',
            activeScript
          )
        } catch (Signal:any) {
          setErrorReport(this,{
            Type:'Script Compilation Failure',
            Sufferer:this, Message:'' + Signal, Cause:Signal
          })
          return
        }

        try {
          await compiledScript.call(this,
            this,this, html,reactively, onRender,onMount,onUnmount,onValueChange
          )
        } catch (Signal:any) {
          setErrorReport(this,{
            Type:'Script Execution Failure',
            Sufferer:this, Message:'' + Signal, Cause:Signal
          })

          if (Mode === 'rethrow-exception') {
            throw Signal
          }
        }
      this.rerender()
    }

  /**** applyPendingScript - but only if it can be compiled ****/

    public async applyPendingScript ():Promise<void> {
      if (! this.isAttached) { return }        // consider attached applets only

      let activeScript:string  = this._activeScript  || ''
      let pendingScript:string = this._pendingScript || ''
      if (activeScript === pendingScript) { return }

      if (pendingScript.trim() !== '') {
        let compiledScript:Function        // try compiling pending script first
        try {
// @ts-ignore TS2351 AsyncFunction *is* constructible
          compiledScript = new AsyncFunction(
            'me,my, html,reactively, onRender,onMount,onUnmount,onValueChange',
            pendingScript
          )
        } catch (Signal:any) {
          setScriptError(this,{
            Type:'Script Compilation Failure',
            Sufferer:this, Message:'' + Signal, Cause:Signal
          })
          this.rerender()
          return
        }
      }

      this._activeScript  = pendingScript.trim()
      this._pendingScript = undefined
      this._ScriptError   = undefined

      try {
        await this.activateScript('rethrow-exception')
      } catch (Signal:any) {
        setScriptError(this,{
          Type:'Script Execution Failure',
          Sufferer:this, Message:'' + Signal, Cause:Signal
        })
        this.rerender()
        return
      }
      this.rerender()
    }

  /**** ScriptError (used by Designer) ****/

    protected _ScriptError:WAT_ErrorReport|undefined

    public get ScriptError ():WAT_ErrorReport|undefined {
      return (this._ScriptError == null ? undefined : { ...this._ScriptError })
    }
    public set ScriptError (_:WAT_ErrorReport|undefined) {
      throwReadOnlyError('ScriptError')
    }

  /**** Error - for internal use only ****/

    protected _ErrorReport:WAT_ErrorReport|undefined

    public get ErrorReport ():WAT_ErrorReport|undefined {
      return (this._ErrorReport == null ? undefined : { ...this._ErrorReport })
    }
    public set ErrorReport (_:WAT_ErrorReport|undefined) {
      throwReadOnlyError('ErrorReport')
    }

  /**** isBroken ****/

    public get isBroken ():boolean  { return (this._ErrorReport != null) }
    public set isBroken (_:boolean) { throwReadOnlyError('isBroken') }

  /**** Renderer ****/

    protected _Renderer:Function|undefined

    public get Renderer ():Function|undefined { return this._Renderer }
    public set Renderer (newRenderer:Function|undefined) {
      allowFunction('renderer',newRenderer)
      if (newRenderer == null) { newRenderer = () => ''}

      this._Renderer = () => {
        try {
          newRenderer.call(this)
        } catch (Signal:any) {
          setErrorReport(this,{
            Type:'Rendering Failure',
            Sufferer:this, Message:'' + Signal, Cause:Signal
          })
        }
      }
      this.rerender()
    }

  /**** onRender ****/

    public get onRender ():Function|undefined { return this._onRender_ }
    public set onRender (newCallback:Function|undefined) {
      allowFunction('rendering callback',newCallback)
      this._Renderer = newCallback
    }

    protected _onRender_ (newCallback:Function|undefined):void {
      if (newCallback == null) {                          // callback invocation
        try {
          if (this._Renderer != null) { this._Renderer.call(this) }
        } catch (Signal:any) {
          setErrorReport(this,{
            Type:'Rendering Callback Failure',
            Sufferer:this, Message:'' + Signal, Cause:Signal
          })
        }
      } else {                                          // definition invocation
        this._Renderer = newCallback
      }
    }

  /**** Rendering - generates the rendering for this widget ****/

    public Rendering ():any {
      let Renderer = this._Renderer
      if (Renderer == null) { return '' }

      try {
        return Renderer.call(this)
      } catch (Signal:any) {
        console.error('Rendering Failure',Signal)
      }
    }

  /**** rerender (to be overwritten) ****/

    public abstract rerender (Visual?:WAT_Visual):void

  /**** CSSStyle ****/

    public get CSSStyle ():string {
      let CSSStyleList:string[] = []
        const {
          FontFamily, FontSize, FontWeight, FontStyle,
          TextDecoration, TextShadow, TextAlignment, LineHeight,
          ForegroundColor, hasBackground, BackgroundColor, BackgroundTexture,
          Opacity, Cursor
        } = this

        if (FontFamily != null) { CSSStyleList.push(`font-family:${FontFamily}`) }
        if (FontSize   != null) { CSSStyleList.push(`font-size:${FontSize}px`) }
        if (FontWeight != null) { CSSStyleList.push(`font-weight:${FontWeight}`) }
        if (FontStyle  != null) { CSSStyleList.push(`font-style:${FontStyle}`) }

        if (TextDecoration != null) {
          if (TextDecoration.isActive) {
            CSSStyleList.push('text-decoration:' + TextDecoration.Line +
              (TextDecoration.Color     == null ? '' : ' ' + TextDecoration.Color) +
              (TextDecoration.Style     == null ? '' : ' ' + TextDecoration.Style) +
              (TextDecoration.Thickness == null ? '' : ' ' + TextDecoration.Thickness + 'px')
            )
          } else {
            CSSStyleList.push('text-decoration:none')
          }
        }
        if (TextShadow != null) {
          if (TextShadow.isActive) {
            CSSStyleList.push('text-shadow:' +
              TextShadow.xOffset + 'px ' + TextShadow.yOffset + 'px ' +
              TextShadow.BlurRadius + 'px ' + TextShadow.Color
            )
          } else {
            CSSStyleList.push('text-shadow:none')
          }
        }
        if (TextAlignment != null) { CSSStyleList.push(`text-align:${TextAlignment}`) }
        if (LineHeight    != null) { CSSStyleList.push(`line-height:${LineHeight}px`) }

        if (ForegroundColor != null) { CSSStyleList.push(`color:${ForegroundColor}`) }
        if (hasBackground) {
          if (BackgroundColor != null) { CSSStyleList.push(`background-color:${BackgroundColor}`) }
          if (BackgroundTexture != null) {
            const { isActive, ImageURL, Mode, xOffset,yOffset } = BackgroundTexture
            let BackgroundSize = 'auto auto'
              switch (Mode) {
                case 'normal':  break
                case 'contain':
                case 'cover':   BackgroundSize = BackgroundTexture.Mode; break
                case 'fill':    BackgroundSize = '100% 100%';  break
                case 'tile':    BackgroundSize = 'auto auto';  break
              }
            let BackgroundRepeat = (Mode === 'tile' ? 'repeat' : 'no-repeat')

            if (isActive) {
              CSSStyleList.push(
                `background-image:url(${ImageURL})`,
                `background-position:${Math.round(xOffset)}px ${Math.round(yOffset)}px;` +
                `background-size:${BackgroundSize}; background-repeat:${BackgroundRepeat}`
              )
            } else {
              CSSStyleList.push('background-image:none')
            }
          }
        }

        if (Opacity != null) { CSSStyleList.push(`opacity:${Opacity/100}`) }
        if (Cursor  != null) { CSSStyleList.push(`cursor:${Cursor}`) }
      return (CSSStyleList.length === 0 ? '' : CSSStyleList.join(';') + ';')
    }
    public set CSSStyle (_:string) { throwReadOnlyError('CSSStyle')}

  /**** View ****/

    protected _View:HTMLElement|undefined

    public get View ():HTMLElement|undefined { return this._View }
    public set View (_:HTMLElement)          { throwReadOnlyError('View') }

  /**** isMounted ****/

    public get isMounted ():boolean  { return (this._View != null) }
    public set isMounted (_:boolean) { throwReadOnlyError('isMounted') }

  /**** onMount ****/

    protected _onMount:Function|undefined

    public get onMount ():Function|undefined { return this._onMount_ }
    public set onMount (newCallback:Function|undefined) {
      allowFunction('"onMount" callback',newCallback)
      this._onMount = newCallback
    }

    protected _onMount_ (...ArgList:any[]):void {
      if ((ArgList.length === 1) && (typeof ArgList[0] === 'function')) {
        this._onMount = ArgList[0]
        if (this.isMounted) { this._onMount_() }
      } else {                                            // callback invocation
        try {
          if (this._onMount != null) { this._onMount.apply(this,ArgList) }
        } catch (Signal:any) {
          setErrorReport(this,{
            Type:'"onMount" Callback Failure',
            Sufferer:this, Message:'' + Signal, Cause:Signal
          })
        }
      }
    }

  /**** onUnmount ****/

    protected _onUnmount:Function|undefined

    public get onUnmount ():Function|undefined { return this._onUnmount_ }
    public set onUnmount (newCallback:Function|undefined) {
      allowFunction('"onUnmount" callback',newCallback)
      this._onUnmount = newCallback
    }

    protected _onUnmount_ (...ArgList:any[]):void {
      if ((ArgList.length === 1) && (typeof ArgList[0] === 'function')) {
        this._onUnmount = ArgList[0]
//      if (! this.isMounted) { this._onUnmount_() } // no! this would be wrong!
      } else {                                            // callback invocation
        try {
          if (this._onUnmount != null) { this._onUnmount.apply(this,ArgList) }
        } catch (Signal:any) {
          setErrorReport(this,{
            Type:'"onUnmount" Callback Failure',
            Sufferer:this, Message:'' + Signal, Cause:Signal
          })
        }
      }
    }

  /**** _serializeConfigurationInto ****/

    protected _serializeConfigurationInto (Serialization:Serializable):void {
      if (this._Value != null) {        // test serializability of "Value" first
        try { JSON.stringify(this._Value) } catch (Signal:any) {
          throwError(
            'NotSerializable: cannot serialize "Value" of visual ' +
            quoted(this.Path)
          )
        }
      }

      if (this._memoized != null) {// test serializability of "memoized" as well
        try { JSON.stringify(this._memoized) } catch (Signal:any) {
          throwError(
            'NotSerializable: cannot serialize "memoized" of visual ' +
            quoted(this.Path)
          )
        }
      }

    /**** then perform the actual serialization ****/

      ;[
        'Name',
        'FontFamily','FontSize','FontWeight','FontStyle',
        'TextDecoration', 'TextShadow','TextAlignment','LineHeight',
        'ForegroundColor', 'hasBackground', 'BackgroundColor','BackgroundTexture',
        'BorderWidths','BorderStyles','BorderColors','BorderRadii','BoxShadow',
        'Opacity','OverflowVisibility','Cursor',
        'activeScript','pendingScript',
        'memoized','Value',
      ].forEach((Name:string) => this._serializePropertyInto(Name,Serialization))
    }

  /**** _deserializeConfigurationFrom ****/

    protected _deserializeConfigurationFrom (Serialization:Serializable):void {
      const deserializeProperty = (Name:string) => {
        if (Serialization[Name] != null) {
          try {
// @ts-ignore TS7053 allow "Visual" to be indexed
            this[Name] = Serialization[Name]   // also validates the given value
          } catch (Signal:any) {
            console.warn(
              'DeserializationError: invalid value for property ' +
              quoted(Name) + ' in visual ' + quoted(this.Path)
            )
          }
        }
      }

      ;[
        'Name',
        'FontFamily','FontSize','FontWeight','FontStyle',
        'TextDecoration', 'TextShadow','TextAlignment','LineHeight',
        'ForegroundColor', 'hasBackground', 'BackgroundColor','BackgroundTexture',
        'BorderWidths','BorderStyles','BorderColors','BorderRadii','BoxShadow',
        'Opacity','OverflowVisibility','Cursor',
        /*'activeScript',*/'pendingScript',
        'Value',
      ].forEach((Name:string) => deserializeProperty(Name))

      if (ValueIsPlainObject(Serialization.memoized)) {
        try {
          Object.assign(
            this.memoized, structuredClone(Serialization.memoized) as Serializable
          )
        } catch (Signal:any) {
          console.warn(
            'DeserializationError: invalid value for property "memoized" ' +
            'in visual ' + quoted(this.Path), Signal
          )
        }
      }

    /**** "activeScript" needs special treatment ****/

      if (ValueIsText(Serialization.activeScript)) {
        this._activeScript = Serialization.activeScript as string
        this.activateScript()                      // in "creation" order, i.e.,
      }           // pages and widgets will already be attached, applets may not
    }                          // and inner visuals may not yet (all) be present

  /**** _serializePropertyInto ****/

    protected _serializePropertyInto (
      Name:string, Serialization:Serializable
    ):void {
// @ts-ignore TS7053 allow "Visual" to be indexed
      if (this['_'+Name] != null) { Serialization[Name] = this[Name] }
    }
  }

//------------------------------------------------------------------------------
//--                                WAT_Applet                                --
//------------------------------------------------------------------------------

  export class WAT_Applet extends WAT_Visual {
    protected _fullScreen:boolean = false    // used by the "WAT Applet Manager"
    protected _Width:number       = -1                                   // dto.
    protected _Height:number      = -1                                   // dto.

    public constructor () {
      super(undefined)
    }

  /**** Name ****/

    public get Name ():WAT_Name|undefined { return this._Name }
    public set Name (newName:WAT_Name|undefined) { throwReadOnlyError('Name') }

  /**** Path - to be overwritten ****/

    public get Path ():WAT_Path  { return '/' }
    public set Path (_:WAT_Path) { throwReadOnlyError('Path') }

  /**** isAttached ****/

    public get isAttached ():boolean  { return (this._View != null) }
    public set isAttached (_:boolean) { throwReadOnlyError('isAttached') }

  /**** VisualWithElement ****/

    public VisualWithElement (DOMElement:HTMLElement):WAT_Visual|undefined {
      let Candidate:WAT_Visual|undefined = undefined
        if (this._View == null) { return undefined }
        if (this._View.contains(DOMElement)) { Candidate = this }

        const visitedPage = this._visitedPage as Indexable
        if (visitedPage != null) {
          if (visitedPage._View == null) { return undefined }
          if (visitedPage._View.contains(DOMElement)) { Candidate = visitedPage as WAT_Page }

        /**** scan all visible widgets on this page ****/

          visitedPage._WidgetList.filter((Widget:Indexable) =>
            Widget.isVisible && ((Widget._Pane == null) || (Widget._Pane === visitedPage))
          ).forEach((Widget:Indexable) => {
            if (Widget._View == null) { return }
            if (Widget._View.contains(DOMElement)) { Candidate = Widget as WAT_Widget }

            Widget._OverlayList.forEach((Overlay:WAT_Overlay) => {
              const SourceWidget = this.WidgetAtPath(Overlay.SourceWidgetPath as WAT_Path)
              if (SourceWidget == null) { return }

            /**** scan all widgets shown on this one's overlays ****/

              const WidgetsToShow:WAT_Widget[] = (
                SourceWidget.Type === 'Outline'
                ? (SourceWidget as Indexable).bundledWidgets()
                : [SourceWidget]
              ).filter((Widget:Indexable) => (
                Widget.isVisible && ((Widget._Pane == null) || (Widget._Pane === Overlay))
              ))

              WidgetsToShow.forEach((Widget:Indexable) => {
                if (Widget._View == null) { return }
                if (Widget._View.contains(DOMElement)) { Candidate = Widget as WAT_Widget }
              })
            })
          })
        }

      /**** scan all shown widgets on all currently open dialogs ****/

        this._DialogList.forEach((Dialog:Indexable) => {
          if (Dialog._View == null) { return undefined }

          const SourceWidget = this.WidgetAtPath(Dialog.SourceWidgetPath as WAT_Path)
          if (SourceWidget == null) { return }

          const WidgetsToShow:WAT_Widget[] = (
            SourceWidget.Type === 'Outline'
            ? (SourceWidget as Indexable).bundledWidgets()
            : [SourceWidget]
          ).filter((Widget:Indexable) => (
            Widget.isVisible && ((Widget._Pane == null) || (Widget._Pane === Dialog))
          ))

          WidgetsToShow.forEach((Widget:Indexable) => {
            if (Widget._View == null) { return }
            if (Widget._View.contains(DOMElement)) { Candidate = Widget as WAT_Widget }
          })
        })
      return Candidate
    }

  /**** WidgetsNamed ****/

    public WidgetsNamed (NameSet:Indexable):Indexable {
      expectPlainObject('widget name set',NameSet)

      const WidgetSet:Indexable = {}
        for (const [ PageName,NameList ] of Object.entries(NameSet)) {
          const Page:WAT_Page = this.existingPage(PageName)          // may fail
          NameList.forEach((WidgetName:WAT_Name) => {
            const Widget = Page.existingWidget(WidgetName)           // may fail
            if (WidgetName in WidgetSet) throwError(
              `NameCollision: a widget named ${quoted(WidgetName)} has already been picked`
            )
            WidgetSet[WidgetName] = Widget
          })
        }
      return WidgetSet
    }

  /**** namedWidgets ****/

    public get namedWidgets ():Indexable {
      const WidgetSet:Indexable = {}
        this._PageList.forEach((Page:WAT_Page) => {
          const namedWidgets = Page.namedWidgets
          Object.assign(WidgetSet,namedWidgets)
        })
      return WidgetSet
    }
    public set namedWidgets (_:Indexable) { throwReadOnlyError('namedWidgets') }

  /**** configureWidgets ****/

    public configureWidgets (OptionSet:Indexable):void {
      expectPlainObject('options set',OptionSet)

      for (const PageName in OptionSet) {
        if (OptionSet.hasOwnProperty(PageName)) {
          if (ValueIsName(PageName)) {
            let Page = this.existingPage(PageName)
            Page.configureWidgets(OptionSet[PageName])
          } else {
            throwError(`InvalidArgument: invalid page name ${quoted(PageName)}`)
          }
        }
      }
    }

  /**** x/y ****/

    public get x ():WAT_Location  { return this.Geometry.x }
    public set x (_:WAT_Location) { throwReadOnlyError('x') }

    public get y ():WAT_Location  { return this.Geometry.y }
    public set y (_:WAT_Location) { throwReadOnlyError('y') }

  /**** Width/Height - independent of configured width/height limits ****/

    public get Width ():WAT_Dimension  { return this.Geometry.Width }
    public set Width (_:WAT_Dimension) { throwReadOnlyError('Width') }

    public get Height ():WAT_Dimension  { return this.Geometry.Height }
    public set Height (_:WAT_Dimension) { throwReadOnlyError('Height') }

  /**** Position ****/

    public get Position ():WAT_Position {
      let { x,y } = this.Geometry
      return { x,y }
    }

    public set Position (_:WAT_Position) {
      throwReadOnlyError('Position')
    }

  /**** Size ****/

    public get Size ():WAT_Size {
      let { Width,Height } = this.Geometry
      return { Width,Height }
    }

    public set Size (_:WAT_Size) {
      throwReadOnlyError('Size')
    }

  /**** Geometry ****/

    public get Geometry ():WAT_Geometry {
      let View = this._View
      if (View == null) throwError(
        'NotAttached: this applet is not attached'
      )

      const Bounds = View.getBoundingClientRect()

      return {
        x:Bounds.left + window.scrollX,  Width:View.offsetWidth,
        y:Bounds.top  + window.scrollY, Height:View.offsetHeight
      }
    }

    public set Geometry (_:WAT_Geometry) { throwReadOnlyError('Geometry') }

  /**** SnapToGrid ****/

    protected _SnapToGrid:boolean = false

    public get SnapToGrid ():boolean { return this._SnapToGrid }
    public set SnapToGrid (newSetting:boolean) {
      expectBoolean('snap-to-grid setting',newSetting)
      if (this._SnapToGrid !== newSetting) {
        this._SnapToGrid = newSetting
//      this.rerender()
      }
    }

  /**** GridWidth ****/

    protected _GridWidth:WAT_Cardinal = 10

    public get GridWidth ():WAT_Cardinal { return this._GridWidth }
    public set GridWidth (newWidth:WAT_Cardinal) {
      expectCardinal('snap-to-grid width',newWidth)
      if (this._GridWidth !== newWidth) {
        this._GridWidth = newWidth
//      this.rerender()
      }
    }

  /**** GridHeight ****/

    protected _GridHeight:WAT_Cardinal = 10

    public get GridHeight ():WAT_Cardinal { return this._GridHeight }
    public set GridHeight (newHeight:WAT_Cardinal) {
      expectCardinal('snap-to-grid height',newHeight)
      if (this._GridHeight !== newHeight) {
        this._GridHeight = newHeight
//      this.rerender()
      }
    }

  /**** rerender ****/

    public rerender (Visual?:WAT_Visual):void {
      if (this._View != null) { rerender() }
    }

  /**** PageList ****/

    protected _PageList:WAT_Page[] = []

    public get PageList ():WAT_Page[]  { return this._PageList.slice() }
    public set PageList (_:WAT_Page[]) { throwReadOnlyError('PageList') }

  /**** PageCount ****/

    public get PageCount ():number  { return this._PageList.length }
    public set PageCount (_:number) { throwReadOnlyError('PageCount') }

  /**** IndexOfPage ****/

    public IndexOfPage (PageOrNameOrIndex:WAT_Page|WAT_Name|number):number {
      const Page = this.Page(PageOrNameOrIndex)
      if (Page == null) { return -1 }

      return this._PageList.indexOf(Page)
    }

  /**** Page ****/

    public Page (PageOrNameOrIndex:WAT_Page|WAT_Name|number):WAT_Page|undefined {
      expectValue('page, name or index',PageOrNameOrIndex)

      switch (true) {
        case ValueIsPage(PageOrNameOrIndex):
          const Page = PageOrNameOrIndex as WAT_Page
// @ts-ignore TS2446 allow WAT_Applet to access a protected member of WAT_Page
          return (Page._Container === this ? Page : undefined)
        case ValueIsInteger(PageOrNameOrIndex):
          let Index = PageOrNameOrIndex as number
          if (Index < 0) { Index += this._PageList.length }
          return this._PageList[Index]
        case ValueIsName(PageOrNameOrIndex):
          return this.PageNamed(PageOrNameOrIndex as WAT_Name)
      }

      throwError(
        'InvalidArgument: no valid page, page name or page index given'
      )
    }

  /**** existingPage ****/

    public existingPage (PageOrNameOrIndex:WAT_Page|WAT_Name|number):WAT_Page {
      let Page = this.Page(PageOrNameOrIndex)
        if (Page == null) throwError(
          'PageNotFound: the desired page could not be found'
        )
      return Page
    }

  /**** PageNamed ****/

    public PageNamed (Name:WAT_Name):WAT_Page|undefined {
      expectName('WAT page name',Name)
      const normalizedName = Name.trim().toLowerCase()

      let Result:WAT_Page|undefined = undefined
        this._PageList.some((Page:WAT_Page) => (
          (Page.normalizedName === normalizedName) && (Result = Page) // tricky
        ))
      return Result
    }

  /**** PageAt ****/

    public PageAt (Index:number):WAT_Page|undefined {
      expectInteger('WAT page index',Index)
      if (Index < 0) { Index += this._PageList.length }
      return this._PageList[Index]
    }

  /**** hasPage ****/

    public hasPage (PageOrNameOrIndex:WAT_Page|WAT_Name|number):boolean {
      return (this.Page(PageOrNameOrIndex) != null)
    }

  /**** newPageAt ****/

    public newPageAt (Index?:number):WAT_Page {
      return this.PageDeserializedAt({},Index)
    }

  /**** PageDeserializedAt ****/

    public PageDeserializedAt (Serialization:Serializable, Index?:number):WAT_Page {
      expectSerializableObject('page serialization',Serialization)
      allowInteger          ('page insertion index',Index)

      if (Index == null) {
        Index = this._PageList.length
      } else {
        if (Index < 0) { Index += this._PageList.length }
        Index = Math.max(0,Math.min(Index,this._PageList.length))
      }

      let newPage = new WAT_Page(this)
        this._PageList.splice(Index,0,newPage)

// @ts-ignore TS2446 allow WAT_Applet to access a protected member of WAT_Page
        newPage._deserializeConfigurationFrom(Serialization)
// @ts-ignore TS2446 allow WAT_Applet to access a protected member of WAT_Page
        newPage._deserializeWidgetsFrom(Serialization)

        this.rerender()
      return newPage
    }

  /**** DuplicateOfPageAt ****/

    public DuplicateOfPageAt (Index:number):WAT_Page {
      expectInteger('page index',Index)

      const Page = this.existingPage(Index)                               // DRY
      return this.PageDeserializedAt(Page.Serialization,Index+1)
    }

  /**** mayShiftPageUp/Down ****/

    public mayShiftPageUp (PageOrNameOrIndex:WAT_Page|WAT_Name|number):boolean {
      const Page = this.existingPage(PageOrNameOrIndex)
      return (Page.Index > 0)
    }

    public mayShiftPageDown (PageOrNameOrIndex:WAT_Page|WAT_Name|number):boolean {
      const Page = this.existingPage(PageOrNameOrIndex)
      return (Page.Index < this._PageList.length-1)
    }

  /**** shiftPageToTop/Up/Down/ToBottom ****/

    public shiftPageToTop (PageOrNameOrIndex:WAT_Page|WAT_Name|number):void {
      const Page = this.existingPage(PageOrNameOrIndex)
      this.shiftPageTo(Page,0)
    }

    public shiftPageUp (PageOrNameOrIndex:WAT_Page|WAT_Name|number):void {
      const Page = this.existingPage(PageOrNameOrIndex)
      this.shiftPageTo(Page,Page.Index-1)
    }

    public shiftPageDown (PageOrNameOrIndex:WAT_Page|WAT_Name|number):void {
      const Page = this.existingPage(PageOrNameOrIndex)
      this.shiftPageTo(Page,Page.Index+1)
    }

    public shiftPageToBottom (PageOrNameOrIndex:WAT_Page|WAT_Name|number):void {
      const Page = this.existingPage(PageOrNameOrIndex)
      this.shiftPageTo(Page,this._PageList.length)
    }

  /**** shiftPageTo ****/

    public shiftPageTo (
      PageOrNameOrIndex:WAT_Page|WAT_Name|number, newIndex:number
    ):void {
      const Page = this.existingPage(PageOrNameOrIndex)
      expectInteger('page insertion index',newIndex)

      if (newIndex < 0) { newIndex += this._PageList.length }
      newIndex = Math.max(0,Math.min(newIndex,this._PageList.length))

      const oldIndex = this._PageList.indexOf(Page)
      if (oldIndex === newIndex) { return }

      if (newIndex > oldIndex) {
        newIndex -= 1
      }

      this._PageList.splice(oldIndex,1)
      this._PageList.splice(newIndex,0,Page)

      this.rerender()
    }

  /**** shiftPagesTo (for Designer only, less strict argument validations) ****/

    public shiftPagesTo (
      PageList:WAT_Page[], newIndexList:number[]
    ):void {
      const IndexSet:WAT_Page[] = []
        newIndexList.forEach((Index:number,i:number) => IndexSet[Index] = PageList[i])
      newIndexList = newIndexList.slice().sort()

      PageList.forEach((Page:WAT_Page) => {
        const Index = this._PageList.indexOf(Page)
        this._PageList.splice(Index,1)
      })

      newIndexList.forEach((newIndex:number) => {
        this._PageList.splice(newIndex,0,IndexSet[newIndex])
      })

      this.rerender()
    }

  /**** destroyPage ****/

    public destroyPage (PageOrNameOrIndex:WAT_Page|WAT_Name|number):void {
      const Page = this.Page(PageOrNameOrIndex)
      if (Page == null) {
        if (ValueIsPage(PageOrNameOrIndex)) throwError(
          'NoSuchPage: the given page could not be found'
        )
        return
      }

      const oldIndex = this._PageList.indexOf(Page as WAT_Page)
      this._PageList.splice(oldIndex,1)
// @ts-ignore TS2446 allow accessing protected member
      Page._Container = undefined

      if (this._visitedPage === Page) {
        this._visitedPage = this._PageList[0]
      }
      this.rerender()
    }

  /**** clear ****/

    public clear ():void {
      this._PageList.length = 0
      this._visitedPage = undefined
      this.rerender()
    }

  /**** visitedPage ****/

    protected _visitedPage:WAT_Page|undefined

    public get visitedPage ():WAT_Page|undefined { return this._visitedPage }
    public set visitedPage (_:WAT_Page|undefined) { throwReadOnlyError('visitedPage') }

  /**** visitPage ****/

    public visitPage (PageOrNameOrIndex:WAT_Page|WAT_Name|number|undefined) {
      let Page:WAT_Page|undefined
        if (PageOrNameOrIndex != null) {
          Page = this.existingPage(PageOrNameOrIndex)
        }
      if (Page == null) {
        Page = this._PageList[0]
      }

      if (Page != this._visitedPage) {
        this._visitedPage = Page
        this.rerender()
        return
      }
    }

  /**** WidgetAtPath ****/

    public WidgetAtPath (Path:WAT_Path):WAT_Widget|undefined {
      expectPath('widget path',Path)

      const PathItemList:any[] = Path.replace(/\/\/+/g,'/').replace(/^\//,'')
        .split('/').map((PathItem:string) => {
          if (/^#\d+$/.test(PathItem.trim())) {
            return parseInt(PathItem.slice(1),10)
          } else {
            return PathItem
          }
        })
      switch (PathItemList.length) {
        case 0:  throwError('InvalidArgument: empty widget path given')
        case 1:  throwError('InvalidArgument: incomplete widget path given')
        case 2:  break
        default: throwError('InvalidArgument: invalid widget path given')
      }

      const Page = this.Page(PathItemList[0])
      if (Page == null) { return undefined }

      return Page.Widget(PathItemList[1])
    }

  /**** DialogNamed ****/

    private _DialogList:WAT_Dialog[] = []

    public DialogNamed (DialogName:WAT_Name):WAT_Dialog|undefined {
      const DialogIndex = this.IndexOfDialog(DialogName)
      return this._DialogList[DialogIndex]           // even if DialogIndex = -1
    }

  /**** existingDialogNamed ****/

    public existingDialogNamed (DialogName:WAT_Name):WAT_Dialog {
      const DialogIndex = this.IndexOfDialog(DialogName)
      if (DialogIndex < 0) throwError(
        `NotFound: no dialog named ${quoted(DialogName)} found`
      )

      return this._DialogList[DialogIndex] as WAT_Dialog
    }

  /**** IndexOfDialog ****/

    public IndexOfDialog (DialogName:WAT_Name):number {
      expectName('dialog name',DialogName)
      const normalizedName = DialogName.toLowerCase()

      return this._DialogList.findIndex(
        (Dialog:WAT_Dialog) => Dialog.normalizedName === normalizedName
      )
    }

  /**** openDialog ****/

    public openDialog (Descriptor:Indexable):void {
      expectPlainObject('dialog descriptor',Descriptor)
        expectName              ('dialog name',Descriptor.Name)
        allowTextline          ('dialog title',Descriptor.Title)
        allowBoolean        ('dialog modality',Descriptor.isModal)
        allowBoolean     ('dialog closability',Descriptor.isClosable)
        allowBoolean    ('dialog draggability',Descriptor.isDraggable)
        allowBoolean    ('dialog resizability',Descriptor.isResizable)
        allowLocation   ('dialog x coordinate',Descriptor.x)
        allowLocation   ('dialog y coordinate',Descriptor.y)
        allowDimension         ('dialog width',Descriptor.Width)
        allowDimension        ('dialog height',Descriptor.Height)
        allowDimension ('minimal dialog width',Descriptor.minWidth)
        allowDimension ('maximal dialog width',Descriptor.maxWidth)
        allowDimension('minimal dialog height',Descriptor.minHeight)
        allowDimension('maximal dialog height',Descriptor.maxHeight)
        allowFunction     ('"onOpen" callback',Descriptor.onOpen)
        allowFunction    ('"onClose" callback',Descriptor.onClose)
      let {
        Name, Title, isModal, isClosable, isDraggable, isResizable,
        x,y, Width,Height, minWidth,maxWidth, minHeight,maxHeight,
        onOpen,onClose
      } = Descriptor

      if (this.DialogIsOpen(Descriptor.Name)) throwError(
        `AlreadyOpen: a dialog named ${quoted(Descriptor.Name)} is already open`
      )

      if (isModal     == null) { isModal     = false }
      if (isClosable  == null) { isClosable  = true }
      if (isDraggable == null) { isDraggable = true }
      if (isResizable == null) { isResizable = false }
      if (Title == null) {
        if (isClosable || isDraggable) { Title = Name }
      }

      if (minWidth  == null) { minWidth  = 0 }
      if (minHeight == null) { minHeight = 0 }

      let SourceWidget:WAT_Widget, SourceWidgetPath:WAT_Path
        switch (true) {
          case null:
          case undefined:
            throwError('MissingArgument: no source widget path given')
          case ValueIsPath(Descriptor.SourceWidget):
            SourceWidgetPath = Descriptor.SourceWidget as WAT_Path

            SourceWidget = this.WidgetAtPath(SourceWidgetPath) as WAT_Widget
            if (SourceWidget == null) throwError(
              `NoSuchWidget: no widget at path ${quoted(Descriptor.SourceWidget)} found`
            )
            break
          case ValueIsWidget(Descriptor.SourceWidget):
            SourceWidget     = Descriptor.SourceWidget as WAT_Widget
            SourceWidgetPath = SourceWidget.Path
          default:
            throwError(
              'InvalidArgument: the given source widget is neither a widget ' +
              'nor a widget path'
            )
        }
      if ((Width == null) || (Height == null)) {
        let SourceGeometry = SourceWidget.Geometry

        if (Width  == null) { Width  = SourceGeometry.Width }
        if (Height == null) { Height = SourceGeometry.Height }
      }
        if (isClosable) { minWidth = Math.max(30+10,minWidth) }

        if ((Title != null) || isClosable || isDraggable) { Height += 30; minHeight += 30 }
        if (isResizable)                                  { Height += 10; minHeight += 10 }
      Width  = Math.max(minWidth  || 0, Math.min(Width, maxWidth  || Infinity))
      Height = Math.max(minHeight || 0, Math.min(Height,maxHeight || Infinity))
        if (x == null) { x =  (this.Width-Width) /2 }
        if (y == null) { y = (this.Height-Height)/2 }
      x = Math.max(0, Math.min(x, this.Width-Width))
      y = Math.max(0, Math.min(y,this.Height-Height))

      const Dialog:WAT_Dialog = {
        Name, normalizedName:Name.toLowerCase(), SourceWidgetPath,
        Title, isModal, isClosable, isDraggable, isResizable,
        x,y, Width,Height, minWidth,maxWidth, minHeight,maxHeight,
        onOpen,onClose
      }

      this._DialogList.push(Dialog)
      this.rerender()

      if (Dialog.onOpen != null) { Dialog.onOpen(Dialog) }
    }

  /**** closeDialog ****/

    public closeDialog (DialogName:WAT_Name):void {
      const DialogIndex = this.IndexOfDialog(DialogName)
      if (DialogIndex < 0) { return }

      const [ Dialog ] = this._DialogList.splice(DialogIndex,1)
      this.rerender()

      if (Dialog.onClose != null) { Dialog.onClose(Dialog) }
    }

  /**** closeAllDialogs ****/

    public closeAllDialogs ():void {
      if (this._DialogList.length > 0) {
        this._DialogList.forEach(
          (Dialog:WAT_Dialog) => this.closeDialog(Dialog.Name)
        )
      }
    }

  /**** DialogIsOpen ****/

    public DialogIsOpen (DialogName:WAT_Name):boolean {
      return (this.DialogNamed(DialogName) != null)
    }

  /**** openDialogs ****/

    public openDialogs ():WAT_Name[] {
      return this._DialogList.map((Dialog:WAT_Dialog) => Dialog.Name)
    }

  /**** GeometryOfDialog ****/

    public GeometryOfDialog (DialogName:WAT_Name):WAT_Geometry {
      const Dialog = this.existingDialogNamed(DialogName)
      const { x,y, Width,Height } = Dialog
      return { x,y, Width,Height }
    }

  /**** moveDialogBy ****/

    public moveDialogBy (DialogName:WAT_Name, dx:number,dy:number):void {
      const Dialog = this.existingDialogNamed(DialogName)

      expectNumber('dx',dx)
      expectNumber('dy',dy)

      this.moveDialogTo(DialogName, Dialog.x+dx,Dialog.y+dy)              // DRY
    }

  /**** moveDialogTo ****/

    public moveDialogTo (DialogName:WAT_Name, x:WAT_Location,y:WAT_Location):void {
      const Dialog = this.existingDialogNamed(DialogName)

      expectLocation('x coordinate',x)
      expectLocation('y coordinate',y)

      Dialog.x = x
      Dialog.y = y

      this.rerender()
    }

  /**** sizeDialogBy ****/

    public sizeDialogBy (DialogName:WAT_Name, dW:number,dH:number):void {
      const Dialog = this.existingDialogNamed(DialogName)

      expectNumber('dW',dW)
      expectNumber('dH',dH)

      this.sizeDialogTo(DialogName, Dialog.Width+dW,Dialog.Height+dH)     // DRY
    }

  /**** sizeDialogTo ****/

    public sizeDialogTo (
      DialogName:WAT_Name, Width:WAT_Dimension,Height:WAT_Dimension
    ):void {
      const Dialog = this.existingDialogNamed(DialogName)

      expectDimension ('Width',Width)
      expectDimension('Height',Height)

      Dialog.Width  = Math.max(Dialog.minWidth  || 0, Math.min(Width,  Dialog.maxWidth  || Infinity))
      Dialog.Height = Math.max(Dialog.minHeight || 0, Math.min(Height, Dialog.maxHeight || Infinity))

      this.rerender()
    }

  /**** bringDialogToFront ****/

    public bringDialogToFront (DialogName:WAT_Name):void {
      const Index = this.IndexOfDialog(DialogName)
      if (Index < 0) throwError(
        `NotFound: no dialog named ${quoted(DialogName)} found`
      )

      const [ Dialog ] = this._DialogList.splice(Index,1)
      this._DialogList.push(Dialog)

      this.rerender()
    }

  /**** Serialization ****/

    public get Serialization ():Serializable {
      const Result:Serializable = {}
        this._serializeConfigurationInto(Result)
        this._serializePagesInto(Result)
      return Result
    }
    public set Serialization (_:Serializable) { throwReadOnlyError('Serialization') }

  /**** _serializePagesInto ****/

    protected _serializePagesInto (Serialization:Serializable):void {
      const PageList = this._PageList
      if (PageList.length > 0) {
        Serialization.PageList = PageList.map(
          (Page:WAT_Page) => Page.Serialization
        )
      }
    }

  /**** _deserializePagesFrom ****/

    protected _deserializePagesFrom (Serialization:Serializable):void {
      if (Serialization.PageList == null) { return }

      const PageList = this._PageList
      if (PageList.length > 0) { this.clear() }

      if (! ValueIsList(Serialization.PageList)) {
        console.warn('DeserializationError: invalid "PageList"')
        return
      }

      ;(Serialization.PageList as Serializable[]).forEach(
        (PageSerialization:Serializable, Index:number) => {
          if (! ValueIsPlainObject(PageSerialization)) {
            console.warn('DeserializationError: invalid "PageList" entry #' + Index)
            return
          }

          this.PageDeserializedAt(PageSerialization,Index)
        }           // also activates the scripts of all pages and their widgets
      )
    }

  /**** _serializeConfigurationInto ****/

    protected _serializeConfigurationInto (Serialization:Serializable):void {
      super._serializeConfigurationInto(Serialization)
//    delete Serialization.Name                  // do not serialize applet name

      ;[
        'Name',
        'SnapToGrid','GridWidth','GridHeight',
      ].forEach((Name:string) => this._serializePropertyInto(Name,Serialization))

    /**** "activeScript" needs special treatment ****/

// @ts-ignore TS2339 if it exists "Serialization.activeScript" is a string
      if ((Serialization.activeScript || '').trim() === '') {
        delete Serialization.activeScript
      }

    /**** additional properties used by the "WAT Applet Manager" ****/

      ;[
        'fullScreen','Width','Height',
      ].forEach((Name:string) => this._serializePropertyInto(Name,Serialization))
    }

  /**** _deserializeConfigurationFrom ****/

    protected _deserializeConfigurationFrom (Serialization:Serializable):void {
//    delete Serialization.Name                // do not deserialize applet name
      super._deserializeConfigurationFrom(Serialization)

      const deserializeProperty = (Name:string) => {
        if (Serialization[Name] != null) {
          try {
// @ts-ignore TS7053 allow "Applet" to be indexed
            this[Name] = Serialization[Name]   // also validates the given value
          } catch (Signal:any) {
            console.warn(
              'DeserializationError: invalid value for applet property ' + quoted(Name)
            )
          }
        }
      }

      ;[
        'Name',
        'SnapToGrid','GridWidth','GridHeight',
      ].forEach((Name:string) => deserializeProperty(Name))

    /**** additional properties used by the "WAT Applet Manager" ****/

      if (ValueIsBoolean (Serialization.fullScreen)) { this._fullScreen = Serialization.fullScreen as boolean }
      if (ValueIsCardinal(Serialization.Width))      { this._Width      = Serialization.Width      as number }
      if (ValueIsCardinal(Serialization.Height))     { this._Height     = Serialization.Height     as number }
    }

  /**** deserializedFrom ****/

    public static deserializedFrom (JSONString:string):WAT_Applet {
      expectString('JSON string',JSONString)

      let Serialization:Serializable
      try {
        Serialization = JSON.parse(JSONString)
      } catch (Signal:any) {
        throwError('InvalidArgument: the given "Serialization" is no valid JSON')
      }

      if (! ValueIsPlainObject(Serialization)) throwError(
        'InvalidArgument: the given "Serialization" is no valid WAT applet serialization'
      )

      const Applet = new WAT_Applet()
        Applet._deserializeConfigurationFrom(Serialization)
        Applet._deserializePagesFrom(Serialization)
      return Applet
    }

  /**** preserve ****/

    public async preserve ():Promise<void> {
      await AppletStore.setItem(this.Name,JSON.stringify(this.Serialization))
    }
  }

//------------------------------------------------------------------------------
//--                                 WAT_Page                                 --
//------------------------------------------------------------------------------

  export class WAT_Page extends WAT_Visual {
    public constructor (Applet:WAT_Applet) {
      super(Applet)
    }

  /**** Applet ****/

    public get Applet ():WAT_Applet|undefined  { return this._Container as WAT_Applet }
    public set Applet (_:WAT_Applet|undefined) { throwReadOnlyError('Applet') }

  /**** Path - to be overwritten ****/

    public get Path ():WAT_Path {
      if (! this.isAttached) { return '' }

      return (
        this.Name == null
        ? '/#' + this.Index
        : '/' + this.Name
      )
    }
    public set Path (_:WAT_Path) { throwReadOnlyError('Path') }

  /**** isAttached ****/

    public get isAttached ():boolean  { return (this._Container?.isAttached == true) }
    public set isAttached (_:boolean) { throwReadOnlyError('isAttached') }

  /**** WidgetsNamed ****/

    public WidgetsNamed (NameList:WAT_Name[]):WAT_Widget[] {
      expectListSatisfying('widget name list',NameList, ValueIsName)

      const WidgetSet:Indexable = {}
        NameList.forEach((WidgetName:WAT_Name) => {
          const Widget = this.existingWidget(WidgetName)             // may fail
          WidgetSet[WidgetName] = Widget           // even if multiply requested
        })
      return Array.from(Object.values(WidgetSet))
    }

  /**** namedWidgets ****/

    public get namedWidgets ():Indexable {
      const WidgetSet:Indexable = {}
        this._WidgetList.forEach((Widget:WAT_Widget) => {
          if (Widget.Name != null) {
            WidgetSet[Widget.Name] = Widget
          }
        })
      return WidgetSet
    }
    public set namedWidgets (_:Indexable) { throwReadOnlyError('namedWidgets') }

  /**** configureWidgets ****/

    public configureWidgets (OptionSet:Indexable):void {
      expectPlainObject('options set',OptionSet)

      for (const WidgetName in OptionSet) {
        if (OptionSet.hasOwnProperty(WidgetName)) {
          if (ValueIsName(WidgetName)) {
            let Widget = this.existingWidget(WidgetName)
            Widget.configure(OptionSet[WidgetName])
          } else {
            throwError(`InvalidArgument: invalid widget name ${quoted(WidgetName)}`)
          }
        }
      }
    }

  /**** x/y ****/

    public get x ():WAT_Location  { return this.Geometry.x }
    public set x (_:WAT_Location) { throwReadOnlyError('x') }

    public get y ():WAT_Location  { return this.Geometry.y }
    public set y (_:WAT_Location) { throwReadOnlyError('y') }

  /**** Width/Height - independent of configured width/height limits ****/

    public get Width ():WAT_Dimension  { return this.Geometry.Width }
    public set Width (_:WAT_Dimension) { throwReadOnlyError('Width') }

    public get Height ():WAT_Dimension  { return this.Geometry.Height }
    public set Height (_:WAT_Dimension) { throwReadOnlyError('Height') }

  /**** Position ****/

    public get Position ():WAT_Position {
      let { x,y } = this.Geometry
      return { x,y }
    }

    public set Position (_:WAT_Position) {
      throwReadOnlyError('Position')
    }

  /**** Size ****/

    public get Size ():WAT_Size {
      let { Width,Height } = this.Geometry
      return { Width,Height }
    }

    public set Size (_:WAT_Size) {
      throwReadOnlyError('Size')
    }

  /**** Geometry ****/

    public get Geometry ():WAT_Geometry {
      let Applet = this.Applet
      if (Applet == null) throwError(
        'NotAttached: this page is not attached'
      )

      return Applet.Geometry
    }

    public set Geometry (_:WAT_Geometry) { throwReadOnlyError('Geometry') }

  /**** rerender ****/

    public rerender ():void {
      const Applet = this.Applet
      if (Applet != null) { Applet.rerender(this) }
    }

  /**** Index ****/

    public get Index ():number {
      const Applet = this._Container as WAT_Applet
      return (Applet == null ? -1 : Applet.IndexOfPage(this))
    }
    public set Index (_:number) { throwReadOnlyError('Index') }

  /**** mayBeShiftedUp/Down ****/

    public get mayBeShiftedUp ():boolean {
      const Applet = this._Container as WAT_Applet
      return (Applet == null ? false : Applet.mayShiftPageUp(this))
    }
    public set mayBeShiftedUp (_:boolean) { throwReadOnlyError('mayBeShiftedUp') }

    public get mayBeShiftedDown ():boolean {
      const Applet = this._Container as WAT_Applet
      return (Applet == null ? false : Applet.mayShiftPageDown(this))
    }
    public set mayBeShiftedDown (_:boolean) { throwReadOnlyError('mayBeShiftedDown') }

  /**** shiftToTop/Up/Down/ToBottom ****/

    public shiftToTop ():void {
      const Applet = this._Container as WAT_Applet
      if (Applet == null) throwError('InvalidArgument: this page is not attached')

      Applet.shiftPageToTop(this)
    }

    public shiftUp ():void {
      const Applet = this._Container as WAT_Applet
      if (Applet == null) throwError('InvalidArgument: this page is not attached')

      Applet.shiftPageUp(this)
    }

    public shiftDown ():void {
      const Applet = this._Container as WAT_Applet
      if (Applet == null) throwError('InvalidArgument: this page is not attached')

      Applet.shiftPageDown(this)
    }

    public shiftToBottom ():void {
      const Applet = this._Container as WAT_Applet
      if (Applet == null) throwError('InvalidArgument: this page is not attached')

      Applet.shiftPageToBottom(this)
    }

  /**** WidgetList ****/

    protected _WidgetList:WAT_Widget[] = []

    public get WidgetList ():WAT_Widget[]  { return this._WidgetList.slice() }
    public set WidgetList (_:WAT_Widget[]) { throwReadOnlyError('WidgetList') }

  /**** WidgetCount ****/

    public get WidgetCount ():number  { return this._WidgetList.length }
    public set WidgetCount (_:number) { throwReadOnlyError('WidgetCount') }

  /**** IndexOfWidget ****/

    public IndexOfWidget (Widget:WAT_Widget):number {
      expectWidget('WAT widget to search for',Widget)
      return this._WidgetList.indexOf(Widget)
    }

  /**** Widget ****/

    public Widget (WidgetOrNameOrIndex:WAT_Widget|WAT_Name|number):WAT_Widget|undefined {
      expectValue('widget, name or index',WidgetOrNameOrIndex)

      switch (true) {
        case ValueIsWidget(WidgetOrNameOrIndex):
          const Widget = WidgetOrNameOrIndex as WAT_Widget
          return (Widget.Page === this ? Widget : undefined)
        case ValueIsInteger(WidgetOrNameOrIndex):
          const Index = WidgetOrNameOrIndex as number
          return this._WidgetList[Index]
        case ValueIsName(WidgetOrNameOrIndex):
          return this.WidgetNamed(WidgetOrNameOrIndex as WAT_Name)
      }

      throwError(
        'InvalidArgument: no valid widget, widget name or widget index given'
      )
    }

  /**** existingWidget ****/

    public existingWidget (WidgetOrNameOrIndex:WAT_Widget|WAT_Name|number):WAT_Widget {
      let Widget = this.Widget(WidgetOrNameOrIndex)
        if (Widget == null) throwError(
          'WidgetNotFound: the desired widget could not be found'
        )
      return Widget
    }

  /**** WidgetNamed ****/

    public WidgetNamed (Name:WAT_Name):WAT_Widget|undefined {
      expectName('WAT widget name',Name)
      Name = Name.trim().toLowerCase()

      let Result:WAT_Widget|undefined = undefined
        this._WidgetList.forEach((Widget:WAT_Widget) => {
          if (
            (Result == null) &&
            (Widget.Name != null) && (Widget.Name.toLowerCase() === Name)
          ) {
            Result = Widget
          }
        })
      return Result
    }

  /**** WidgetAt ****/

    public WidgetAt (Index:number):WAT_Widget|undefined {
      expectInteger('WAT widget index',Index)
      if (Index < 0) { Index += this._WidgetList.length }
      return this._WidgetList[Index]
    }

  /**** hasWidget ****/

    public hasWidget (WidgetOrNameOrIndex:WAT_Widget|WAT_Name|number):boolean {
      return (this.Widget(WidgetOrNameOrIndex) != null)
    }

  /**** newWidgetAt ****/

    public newWidgetAt (Type:string='plainWidget', Index?:number):WAT_Widget {
      return this.WidgetDeserializedAt(Type,{},Index)
    }

  /**** WidgetDeserializedAt ****/

    public WidgetDeserializedAt (
      Type:string='plainWidget', Serialization:Serializable, Index?:number
    ):WAT_Widget {
      expectWidgetType                 ('widget type',Type)
      expectSerializableObject('widget serialization',Serialization)
      allowInteger          ('widget insertion index',Index)

      if (Index == null) {
        Index = this._WidgetList.length
      } else {
        if (Index < 0) { Index += this._WidgetList.length }
        Index = Math.max(0,Math.min(Index,this._WidgetList.length))
      }

      let newWidget = newWidgetOfType(Type,this)
        this._WidgetList.splice(Index,0,newWidget)

// @ts-ignore TS2446 allow WAT_Page to access a protected member of WAT_Widget
        newWidget._deserializeConfigurationFrom(Serialization)

        this.rerender()
      return newWidget
    }

  /**** DuplicateOfWidgetAt ****/

    public DuplicateOfWidgetAt (Index:number):WAT_Widget {
      expectInteger('widget index',Index)

      const Widget = this.existingWidget(Index)                           // DRY
      return this.WidgetDeserializedAt(Widget.Type,Widget.Serialization,Index)
    }

  /**** mayShiftWidgetUp/Down ****/

    public mayShiftWidgetUp (WidgetOrNameOrIndex:WAT_Widget|WAT_Name|number):boolean {
      const Widget = this.existingWidget(WidgetOrNameOrIndex)
      return (Widget.Index > 0)
    }

    public mayShiftWidgetDown (WidgetOrNameOrIndex:WAT_Widget|WAT_Name|number):boolean {
      const Widget = this.existingWidget(WidgetOrNameOrIndex)
      return (Widget.Index < this._WidgetList.length-1)
    }

  /**** shiftWidgetToTop/Up/Down/ToBottom ****/

    public shiftWidgetToTop (WidgetOrNameOrIndex:WAT_Widget|WAT_Name|number):void {
      const Widget = this.existingWidget(WidgetOrNameOrIndex)
      this.shiftWidgetTo(Widget,0)
    }

    public shiftWidgetUp (WidgetOrNameOrIndex:WAT_Widget|WAT_Name|number):void {
      const Widget = this.existingWidget(WidgetOrNameOrIndex)
      this.shiftWidgetTo(Widget,Widget.Index-1)
    }

    public shiftWidgetDown (WidgetOrNameOrIndex:WAT_Widget|WAT_Name|number):void {
      const Widget = this.existingWidget(WidgetOrNameOrIndex)
      this.shiftWidgetTo(Widget,Widget.Index+1)
    }

    public shiftWidgetToBottom (WidgetOrNameOrIndex:WAT_Widget|WAT_Name|number):void {
      const Widget = this.existingWidget(WidgetOrNameOrIndex)
      this.shiftWidgetTo(Widget,this._WidgetList.length)
    }

  /**** shiftWidgetTo ****/

    public shiftWidgetTo (
      WidgetOrNameOrIndex:WAT_Widget|WAT_Name|number, newIndex:number
    ):void {
      const Widget = this.existingWidget(WidgetOrNameOrIndex)
      expectInteger('widget insertion index',newIndex)

      if (newIndex < 0) { newIndex += this._WidgetList.length }
      newIndex = Math.max(0,Math.min(newIndex,this._WidgetList.length))

      const oldIndex = this._WidgetList.indexOf(Widget)
      if (oldIndex === newIndex) { return }

      if (newIndex > oldIndex) {
        newIndex -= 1
      }

      this._WidgetList.splice(oldIndex,1)
      this._WidgetList.splice(newIndex,0,Widget)

      this.rerender()
    }

  /**** shiftWidgetsTo (for Designer only, less strict argument validations) ****/

    public shiftWidgetsTo (
      WidgetList:WAT_Widget[], newIndexList:number[]
    ):void {
      const IndexSet:WAT_Widget[] = []
        newIndexList.forEach((Index:number,i:number) => IndexSet[Index] = WidgetList[i])
      newIndexList = newIndexList.slice().sort()

      WidgetList.forEach((Widget:WAT_Widget) => {
        const Index = this._WidgetList.indexOf(Widget)
        this._WidgetList.splice(Index,1)
      })

      newIndexList.forEach((newIndex:number) => {
        this._WidgetList.splice(newIndex,0,IndexSet[newIndex])
      })

      this.rerender()
    }

  /**** destroyWidget ****/

    public destroyWidget (WidgetOrNameOrIndex:WAT_Widget|WAT_Name|number):void {
      const Widget = this.Widget(WidgetOrNameOrIndex)
      if (Widget == null) {
        if (ValueIsWidget(WidgetOrNameOrIndex)) throwError(
          'NoSuchWidget: the given widget could not be found'
        )
        return
      }

      const oldIndex = this._WidgetList.indexOf(Widget as WAT_Widget)
      this._WidgetList.splice(oldIndex,1)
// @ts-ignore TS2446 allow accessing protected member
      Widget._Container = undefined

      this.rerender()
    }

  /**** clear ****/

    public clear ():void {
      this._WidgetList.length = 0
      this.rerender()
    }

  /**** Serialization ****/

    public get Serialization ():Serializable {
      const Result:Serializable = {}
        this._serializeConfigurationInto(Result)
        this._serializeWidgetsInto(Result)
      return Result
    }
    public set Serialization (_:Serializable) { throwReadOnlyError('Serialization') }

  /**** _serializeWidgetsInto ****/

    protected _serializeWidgetsInto (Serialization:Serializable):void {
      const WidgetList = this._WidgetList
      if (WidgetList.length > 0) {
        Serialization.WidgetList = WidgetList.map(
          (Widget:WAT_Widget) => Widget.Serialization
        )
      }
    }

  /**** _deserializeWidgetsFrom ****/

    protected _deserializeWidgetsFrom (Serialization:Serializable):void {
      if (Serialization.WidgetList == null) { return }

      const WidgetList = this._WidgetList
      if (WidgetList.length > 0) { this.clear() }

      if (! ValueIsList(Serialization.WidgetList)) {
        console.warn('DeserializationError: invalid "WidgetList"')
        return
      }

      ;(Serialization.WidgetList as Serializable[]).forEach(
        (WidgetSerialization:Serializable, Index:number) => {
          if (! ValueIsPlainObject(WidgetSerialization)) {
            console.warn('DeserializationError: invalid "WidgetList" entry #' + Index)
            return
          }

          if (! ValueIsWidgetType(WidgetSerialization.Type)) {
            console.warn(
              'DeserializationError: invalid widget type ' +
              quoted(''+WidgetSerialization.Type) + ' in "WidgetList" entry #' +
              Index
            )
            return
          }

          this.WidgetDeserializedAt(
            WidgetSerialization.Type as string, WidgetSerialization, Index
          )
        }
      )
    }

  /**** recursivelyActivateAllScripts ****/

    public recursivelyActivateAllScripts ():void {
      this.activateScript()

      this._WidgetList.forEach(
        (Widget:WAT_Widget) => Widget.activateScript()
      )
    }
  }

//------------------------------------------------------------------------------
//--                                WAT_Widget                                --
//------------------------------------------------------------------------------

  export abstract class WAT_Widget extends WAT_Visual {
    public constructor (Page:WAT_Page) {
      super(Page)
    }

    private _Pane:WAT_Page|WAT_WidgetPane|WAT_Dialog|WAT_Overlay|undefined
                                // avoids multiple renderings atdifferent places

  /**** Type ****/

// @ts-ignore TS2378 this getter throws
    public get Type ():string  { throwError('InternalError: "Type" has to be overwritten') }
    public set Type (_:string) { throwReadOnlyError('Type') }

  /**** Applet ****/

// @ts-ignore TS2446 allow WAT_Widget to access a protected member of WAT_Page
    public get Applet ():WAT_Applet|undefined  { return this._Container?._Container as WAT_Applet }
    public set Applet (_:WAT_Applet|undefined) { throwReadOnlyError('Applet') }

  /**** Page ****/

    public get Page ():WAT_Page|undefined  { return this._Container as WAT_Page }
    public set Page (_:WAT_Page|undefined) { throwReadOnlyError('Page') }

  /**** Path - to be overwritten ****/

    public get Path ():WAT_Path {
      if (! this.isAttached) { return '' }

      return this._Container?.Path + (
        this.Name == null
        ? '/#' + this.Index
        : '/' + this.Name
      )
    }
    public set Path (_:WAT_Path) { throwReadOnlyError('Path') }

  /**** isAttached ****/

// @ts-ignore TS2446 allow WAT_Widget to access a protected member of WAT_Page
    public get isAttached ():boolean  { return (this._Container?._Container?.isAttached == true) }
    public set isAttached (_:boolean) { throwReadOnlyError('isAttached') }

  /**** Lock ****/

    protected _Lock:boolean = false

    public get Lock ():boolean { return this._Lock }
    public set Lock (newLock:boolean) {
      expectBoolean('widget layout lock',newLock)
      if (this._Lock !== newLock) {
        this._Lock = newLock
        this.rerender()
      }
    }

  /**** lock/unlock ****/

    public lock ():void   { this.Lock = true }
    public unlock ():void { this.Lock = false }

  /**** isLocked ****/

    public get isLocked ():boolean        { return this._Lock }
    public set isLocked (newLock:boolean) { this.Lock = newLock }

  /**** Visibility ****/

    protected _Visibility:boolean = true

    public get Visibility ():boolean {
      return this._Visibility
    }

    public set Visibility (newVisibility:boolean) {
      expectBoolean('widget visibility',newVisibility)
      if (this._Visibility !== newVisibility) {
        this._Visibility = newVisibility
        this.rerender()
      }
    }

  /**** show/hide ****/

    public show ():void { this.Visibility = true }
    public hide ():void { this.Visibility = false }

  /**** isVisible ****/

    public get isVisible ():boolean              { return this.Visibility }
    public set isVisible (newVisibility:boolean) { this.Visibility = newVisibility }

  /**** Enabling ****/

    protected _Enabling:boolean = true

    public get Enabling ():boolean {
      return this._Enabling
    }

    public set Enabling (newEnabling:boolean) {
      expectBoolean('widget enabling',newEnabling)
      if (this._Enabling !== newEnabling) {
        this._Enabling = newEnabling
        this.rerender()
      }
    }

  /**** enable/disable ****/

    public enable ():void  { this.Enabling = true }
    public disable ():void { this.Enabling = false }

  /**** isEnabled ****/

    public get isEnabled ():boolean            { return this.Enabling }
    public set isEnabled (newEnabling:boolean) { this.Enabling = newEnabling }

  /**** isDisabled ****/

    public get isDisabled ():boolean             { return ! this.Enabling }
    public set isDisabled (newDisabling:boolean) { this.Enabling = ! newDisabling }

  /**** BorderStyles - in "t,r,b,l" order, not inheritable ****/

    protected _BorderStyles:WAT_BorderStyle[]|undefined

    public get BorderStyles ():WAT_BorderStyle[]|undefined {
      return ( this._BorderStyles == null ? undefined : this._BorderStyles.slice())
    }

    public set BorderStyles (newBorderStyles:WAT_BorderStyle|WAT_BorderStyle[]|undefined) {
      let newSettings:WAT_BorderStyle[]|undefined = undefined
      switch (true) {
        case (newBorderStyles == null):
          break
        case ValueIsOneOf(newBorderStyles,WAT_BorderStyles):
          newSettings = new Array(4).fill(newBorderStyles as any)// satisfies TS
          break
        case ValueIsListSatisfying(
          newBorderStyles,(Value:any) => (Value == null) || ValueIsOneOf(Value,WAT_BorderStyles)
        ):
          switch ((newBorderStyles as any).length) {    // "as any" satisfies TS
            case 0: break
            case 1:
              newSettings = new Array(4).fill((newBorderStyles as any)[0])
              break
            case 2:                                                   // t/b,l/r
              newSettings = [
                (newBorderStyles as any)[0],(newBorderStyles as any)[1],
                (newBorderStyles as any)[0],(newBorderStyles as any)[1],
              ]; break
            case 3:                                                   // t,l/r,b
              newSettings = [
                (newBorderStyles as any)[0],(newBorderStyles as any)[1],
                (newBorderStyles as any)[2],(newBorderStyles as any)[1],
              ]; break
            case 4:                                                   // t,r,b,l
              newSettings = (newBorderStyles as any).slice()
              break
            default:
              throwError('InvalidArgument: given "BorderStyles" list has an invalid length')
          }
          break
        default: throwError('InvalidArgument: invalid "BorderStyles" given')
      }

      if (ValuesDiffer(this._BorderStyles,newSettings)) {
        this._BorderStyles = newSettings
        this.rerender()
      }
    }

  /**** BorderWidths - in "t,r,b,l" order, not inheritable ****/

    protected _BorderWidths:WAT_Dimension[]|undefined

    public get BorderWidths ():WAT_Dimension[]|undefined {
      return ( this._BorderWidths == null ? undefined : this._BorderWidths.slice())
    }

    public set BorderWidths (newBorderWidths:WAT_Dimension|WAT_Dimension[]|undefined) {
      let newSettings:WAT_Dimension[]|undefined = undefined
      switch (true) {
        case (newBorderWidths == null):
          break
        case ValueIsDimension(newBorderWidths):
          newSettings = new Array(4).fill(newBorderWidths as any)// satisfies TS
          break
        case ValueIsListSatisfying(newBorderWidths,ValueIsDimension):
          switch ((newBorderWidths as any).length) {    // "as any" satisfies TS
            case 0: break
            case 1:
              newSettings = new Array(4).fill((newBorderWidths as any)[0])
              break
            case 2:                                                   // t/b,l/r
              newSettings = [
                (newBorderWidths as any)[0],(newBorderWidths as any)[1],
                (newBorderWidths as any)[0],(newBorderWidths as any)[1],
              ]; break
            case 3:                                                   // t,l/r,b
              newSettings = [
                (newBorderWidths as any)[0],(newBorderWidths as any)[1],
                (newBorderWidths as any)[2],(newBorderWidths as any)[1],
              ]; break
            case 4:                                                   // t,r,b,l
              newSettings = (newBorderWidths as any).slice()
              break
            default:
              throwError('InvalidArgument: given "BorderWidths" list has an invalid length')
          }
          break
        default: throwError('InvalidArgument: invalid "BorderWidths" given')
      }

      if (ValuesDiffer(this._BorderWidths,newSettings)) {
        this._BorderWidths = newSettings
        this.rerender()
      }
    }

  /**** BorderColors - in "t,r,b,l" order, not inheritable ****/

    protected _BorderColors:WAT_Color[]|undefined

    public get BorderColors ():WAT_Color[]|undefined {
      return ( this._BorderColors == null ? undefined : this._BorderColors.slice())
    }

    public set BorderColors (newBorderColors:WAT_Color|WAT_Color[]|undefined) {
      let newSettings:WAT_Color[]|undefined = undefined
      switch (true) {
        case (newBorderColors == null):
          break
        case ValueIsColor(newBorderColors):
          newSettings = new Array(4).fill(newBorderColors as any)// satisfies TS
          break
        case ValueIsListSatisfying(
          newBorderColors,(Value:any) => (Value == null) || ValueIsColor(Value)
        ):
          switch ((newBorderColors as any).length) {    // "as any" satisfies TS
            case 0: break
            case 1:
              newSettings = new Array(4).fill((newBorderColors as any)[0])
              break
            case 2:                                                   // t/b,l/r
              newSettings = [
                (newBorderColors as any)[0],(newBorderColors as any)[1],
                (newBorderColors as any)[0],(newBorderColors as any)[1],
              ]; break
            case 3:                                                   // t,l/r,b
              newSettings = [
                (newBorderColors as any)[0],(newBorderColors as any)[1],
                (newBorderColors as any)[2],(newBorderColors as any)[1],
              ]; break
            case 4:                                                   // t,r,b,l
              newSettings = (newBorderColors as any).slice()
              break
            default:
              throwError('InvalidArgument: given "BorderColors" list has an invalid length')
          }
          break
        default: throwError('InvalidArgument: invalid "BorderColors" given')
      }

      if (ValuesDiffer(this._BorderColors,newSettings)) {
        this._BorderColors = newSettings
        this.rerender()
      }
    }

  /**** BorderRadii - in "tl,tr,br,bl" order, not inheritable ****/

    protected _BorderRadii:WAT_Dimension[]|undefined

    public get BorderRadii ():WAT_Dimension[]|undefined {
      return ( this._BorderRadii == null ? undefined : this._BorderRadii.slice())
    }

    public set BorderRadii (newBorderRadii:WAT_Dimension|WAT_Dimension[]|undefined) {
      let newSettings:WAT_Dimension[]|undefined = undefined
      switch (true) {
        case (newBorderRadii == null):
          break
        case ValueIsDimension(newBorderRadii):
          newSettings = new Array(4).fill(newBorderRadii as any) // satisfies TS
          break
        case ValueIsListSatisfying(newBorderRadii,ValueIsDimension):
          switch ((newBorderRadii as any).length) {     // "as any" satisfies TS
            case 0: break
            case 1:
              newSettings = new Array(4).fill((newBorderRadii as any)[0])
              break
            case 2:                                               // tl/br,tr/bl
              newSettings = [
                (newBorderRadii as any)[0],(newBorderRadii as any)[1],
                (newBorderRadii as any)[0],(newBorderRadii as any)[1],
              ]; break
            case 3:                                               // tl,tr/bl,br
              newSettings = [
                (newBorderRadii as any)[0],(newBorderRadii as any)[1],
                (newBorderRadii as any)[2],(newBorderRadii as any)[1],
              ]; break
            case 4:                                               // tl,tr,br,bl
              newSettings = (newBorderRadii as any).slice()
              break
            default:
              throwError('InvalidArgument: given "BorderRadii" list has an invalid length')
          }
          break
        default: throwError('InvalidArgument: invalid "BorderRadii" given')
      }

      if (ValuesDiffer(this._BorderRadii,newSettings)) {
        this._BorderRadii = newSettings
        this.rerender()
      }
    }

  /**** BoxShadow - not inheritable ****/

    protected _BoxShadow:WAT_BoxShadow|undefined

    public get BoxShadow ():WAT_BoxShadow|undefined {
      return (this._BoxShadow == null ? undefined : { ...this._BoxShadow })
    }

    public set BoxShadow (newBoxShadow:WAT_BoxShadow|undefined) {
      allowBoxShadow('widget box shadow',newBoxShadow)
      if (ValuesDiffer(this._BoxShadow,newBoxShadow)) {
        if (newBoxShadow == null) {
          this._BoxShadow = undefined
        } else {
          const { isActive, xOffset,yOffset, BlurRadius,SpreadRadius, Color } = newBoxShadow
          this._BoxShadow = { isActive, xOffset,yOffset, BlurRadius,SpreadRadius, Color }
        }
        this.rerender()
      }
    }

  /**** OverflowVisibility - not inheritable ****/

    protected _OverflowVisibility:boolean|undefined

    public get OverflowVisibility ():boolean|undefined {
      return this._OverflowVisibility
    }

    public set OverflowVisibility (newOverflowVisibility:boolean|undefined) {
      allowBoolean('widget overflow visibility',newOverflowVisibility)
      if (this._OverflowVisibility !== newOverflowVisibility) {
        this._OverflowVisibility = newOverflowVisibility
        this.rerender()
      }
    }

  /**** onFocus ****/

    protected _onFocus:Function|undefined

    public get onFocus ():Function|undefined { return this._onFocus_ }
    public set onFocus (newCallback:Function|undefined) {
      allowFunction('"onFocus" callback',newCallback)
      this._onFocus = newCallback
    }

    protected _onFocus_ (...ArgList:any[]):void {
      if ((ArgList.length === 1) && (typeof ArgList[0] === 'function')) {
        this._onFocus = ArgList[0]
      } else {                                            // callback invocation
        try {
          if (this._onFocus != null) { this._onFocus.apply(this,ArgList) }
        } catch (Signal:any) {
          setErrorReport(this,{
            Type:'"onFocus" Callback Failure',
            Sufferer:this, Message:'' + Signal, Cause:Signal
          })
        }
      }
    }

  /**** onBlur ****/

    protected _onBlur:Function|undefined

    public get onBlur ():Function|undefined { return this._onBlur_ }
    public set onBlur (newCallback:Function|undefined) {
      allowFunction('"onBlur" callback',newCallback)
      this._onBlur = newCallback
    }

    protected _onBlur_ (...ArgList:any[]):void {
      if ((ArgList.length === 1) && (typeof ArgList[0] === 'function')) {
        this._onBlur = ArgList[0]
      } else {                                            // callback invocation
        try {
          if (this._onBlur != null) { this._onBlur.apply(this,ArgList) }
        } catch (Signal:any) {
          setErrorReport(this,{
            Type:'"onBlur" Callback Failure',
            Sufferer:this, Message:'' + Signal, Cause:Signal
          })
        }
      }
    }

  /**** onClick ****/

    protected _onClick:Function|undefined

    public get onClick ():Function|undefined { return this._onClick_ }
    public set onClick (newCallback:Function|undefined) {
      allowFunction('"onClick" callback',newCallback)
      this._onClick = newCallback
    }

    protected _onClick_ (...ArgList:any[]):void {
      if ((ArgList.length === 1) && (typeof ArgList[0] === 'function')) {
        this._onClick = ArgList[0]
      } else {                                            // callback invocation
        try {
          if (this._onClick != null) { this._onClick.apply(this,ArgList) }
        } catch (Signal:any) {
          setErrorReport(this,{
            Type:'"onClick" Callback Failure',
            Sufferer:this, Message:'' + Signal, Cause:Signal
          })
        }
      }
    }

  /**** onDblClick ****/

    protected _onDblClick:Function|undefined

    public get onDblClick ():Function|undefined { return this._onDblClick_ }
    public set onDblClick (newCallback:Function|undefined) {
      allowFunction('"onDblClick" callback',newCallback)
      this._onDblClick = newCallback
    }

    protected _onDblClick_ (...ArgList:any[]):void {
      if ((ArgList.length === 1) && (typeof ArgList[0] === 'function')) {
        this._onDblClick = ArgList[0]
      } else {                                            // callback invocation
        try {
          if (this._onDblClick != null) { this._onDblClick.apply(this,ArgList) }
        } catch (Signal:any) {
          setErrorReport(this,{
            Type:'"onDblClick" Callback Failure',
            Sufferer:this, Message:'' + Signal, Cause:Signal
          })
        }
      }
    }


  /**** onInput ****/

    protected _onInput:Function|undefined

    public get onInput ():Function|undefined { return this._onInput_ }
    public set onInput (newCallback:Function|undefined) {
      allowFunction('"onInput" callback',newCallback)
      this._onInput = newCallback
    }

    protected _onInput_ (...ArgList:any[]):void {
      if ((ArgList.length === 1) && (typeof ArgList[0] === 'function')) {
        this._onInput = ArgList[0]
      } else {                                            // callback invocation
        try {
          if (this._onInput != null) { this._onInput.apply(this,ArgList) }
        } catch (Signal:any) {
          setErrorReport(this,{
            Type:'"onInput" Callback Failure',
            Sufferer:this, Message:'' + Signal, Cause:Signal
          })
        }
      }
    }

  /**** onDrop ****/

    protected _onDrop:Function|undefined

    public get onDrop ():Function|undefined { return this._onDrop_ }
    public set onDrop (newCallback:Function|undefined) {
      allowFunction('"onDrop" callback',newCallback)
      this._onDrop = newCallback
    }

    protected _onDrop_ (...ArgList:any[]):void {
      if ((ArgList.length === 1) && (typeof ArgList[0] === 'function')) {
        this._onDrop = ArgList[0]
      } else {                                            // callback invocation
        try {
          if (this._onDrop != null) { this._onDrop.apply(this,ArgList) }
        } catch (Signal:any) {
          setErrorReport(this,{
            Type:'"onDrop" Callback Failure',
            Sufferer:this, Message:'' + Signal, Cause:Signal
          })
        }
      }
    }

  /**** rerender ****/

    public rerender ():void {
      const Applet = this.Applet
      if (Applet != null) { Applet.rerender(this) }
    }

  /**** CSSStyle ****/

    public get CSSStyle ():string {
      let CSSStyleList:string[] = []
        const {
          BorderWidths, BorderStyles, BorderColors, BorderRadii, BoxShadow,
          OverflowVisibility,
        } = this

        if (BorderWidths != null) {
          CSSStyleList.push('border-width:' +
            BorderWidths[0] + 'px ' + BorderWidths[1] + 'px ' +
            BorderWidths[2] + 'px ' + BorderWidths[3] + 'px'
          )
        }
        if (BorderStyles != null) {
          CSSStyleList.push('border-style:' +
            BorderStyles[0] + ' ' + BorderStyles[1] + ' ' +
            BorderStyles[2] + ' ' + BorderStyles[3]
          )
        }
        if (BorderColors != null) {
          CSSStyleList.push('border-color:' +
            BorderColors[0] + ' ' + BorderColors[1] + ' ' +
            BorderColors[2] + ' ' + BorderColors[3]
          )
        }
        if (BorderRadii != null) {
          CSSStyleList.push('border-radius:' +
            BorderRadii[0] + 'px ' + BorderRadii[1] + 'px ' +
            BorderRadii[2] + 'px ' + BorderRadii[3] + 'px'
          )
        }
        if ((BoxShadow != null) && BoxShadow.isActive) {
          CSSStyleList.push('box-shadow:' +
            BoxShadow.xOffset + 'px ' + BoxShadow.yOffset + 'px ' +
            BoxShadow.BlurRadius + 'px ' + BoxShadow.SpreadRadius + 'px ' +
            BoxShadow.Color
          )
        }

        if (OverflowVisibility != null) {
          CSSStyleList.push(OverflowVisibility == true ? 'visible' : 'hidden')
        }
      return (
        super.CSSStyle +
        (CSSStyleList.length === 0 ? '' : CSSStyleList.join(';') + ';')
      )
    }
    public set CSSStyle (_:string) { throwReadOnlyError('CSSStyle')}

  /**** Index ****/

    public get Index ():number {
      const Page = this._Container as WAT_Page
      return (Page == null ? -1 : Page.IndexOfWidget(this))
    }
    public set Index (_:number) { throwReadOnlyError('Index') }

  /**** mayBeShiftedUp/Down ****/

    public get mayBeShiftedUp ():boolean {
      const Page = this._Container as WAT_Page
      return (Page == null ? false : Page.mayShiftWidgetUp(this))
    }
    public set mayBeShiftedUp (_:boolean) { throwReadOnlyError('mayBeShiftedUp') }

    public get mayBeShiftedDown ():boolean {
      const Page = this._Container as WAT_Page
      return (Page == null ? false : Page.mayShiftWidgetDown(this))
    }
    public set mayBeShiftedDown (_:boolean) { throwReadOnlyError('mayBeShiftedDown') }

  /**** shiftToTop/Up/Down/ToBottom ****/

    public shiftToTop ():void {
      const Page = this._Container as WAT_Page
      if (Page == null) throwError('InvalidArgument: this widget is not attached')

      Page.shiftWidgetToTop(this)
    }

    public shiftUp ():void {
      const Page = this._Container as WAT_Page
      if (Page == null) throwError('InvalidArgument: this widget is not attached')

      Page.shiftWidgetUp(this)
    }

    public shiftDown ():void {
      const Page = this._Container as WAT_Page
      if (Page == null) throwError('InvalidArgument: this widget is not attached')

      Page.shiftWidgetDown(this)
    }

    public shiftToBottom ():void {
      const Page = this._Container as WAT_Page
      if (Page == null) throwError('InvalidArgument: this widget is not attached')

      Page.shiftWidgetToBottom(this)
    }

  /**** minWidth ****/

    protected _minWidth:WAT_Dimension|undefined = undefined

    public get minWidth ():WAT_Dimension {
      return (this._minWidth == null ? 0 : this._minWidth)
    }
    public set minWidth (newMinWidth:WAT_Dimension|undefined) {
      allowDimension('minimal widget width',newMinWidth)
      if (newMinWidth != null) { newMinWidth = Math.round(newMinWidth) }

      if (this._minWidth !== newMinWidth) {
        this._minWidth = newMinWidth
        if (
          (this._minWidth != null) && (this._maxWidth != null) &&
          (this._maxWidth < this._minWidth)
        ) {
          this._maxWidth = newMinWidth
        }
        this.rerender()
      }
    }

  /**** maxWidth ****/

    protected _maxWidth:WAT_Dimension|undefined = undefined

    public get maxWidth ():WAT_Dimension|undefined  {
      return this._maxWidth
    }
    public set maxWidth (newMaxWidth:WAT_Dimension|undefined) {
      allowDimension('maximal widget width',newMaxWidth)
      if (newMaxWidth != null) { newMaxWidth = Math.round(newMaxWidth) }

      if ((newMaxWidth != null) && (this._minWidth != null)) {
        newMaxWidth = Math.max(this._minWidth,newMaxWidth)
      }

      if (this._maxWidth !== newMaxWidth) {
        this._maxWidth = newMaxWidth
        this.rerender()
      }
    }

  /**** minHeight ****/

    protected _minHeight:WAT_Dimension|undefined = undefined

    public get minHeight ():WAT_Dimension  {
      return (this._minHeight == null ? 0 : this._minHeight)
    }
    public set minHeight (newMinHeight:WAT_Dimension|undefined) {
      allowDimension('minimal widget height',newMinHeight)
      if (newMinHeight != null) { newMinHeight = Math.round(newMinHeight) }

      if (this._minHeight !== newMinHeight) {
        this._minHeight = newMinHeight
        if (
          (this._minHeight != null) && (this._maxHeight != null) &&
          (this._maxHeight < this._minHeight)
        ) {
          this._maxHeight = newMinHeight
        }
        this.rerender()
      }
    }

  /**** maxHeight ****/

    protected _maxHeight:WAT_Dimension|undefined = undefined

    public get maxHeight ():WAT_Dimension|undefined  {
      return this._maxHeight
    }
    public set maxHeight (newMaxHeight:WAT_Dimension|undefined) {
      allowDimension('maximal widget height',newMaxHeight)
      if (newMaxHeight != null) { newMaxHeight = Math.round(newMaxHeight) }

      if ((newMaxHeight != null) && (this._minHeight != null)) {
        newMaxHeight = Math.max(this._minHeight,newMaxHeight)
      }

      if (this._maxHeight !== newMaxHeight) {
        this._maxHeight = newMaxHeight
        this.rerender()
      }
    }

  /**** x/y ****/

    public get x ():WAT_Location { return this.Geometry.x }
    public get y ():WAT_Location { return this.Geometry.y }

    public set x (newX:WAT_Location) {
      expectLocation('x coordinate',newX)
      this.changeGeometryTo(newX)
    }

    public set y (newY:WAT_Location) {
      expectLocation('y coordinate',newY)
      this.changeGeometryTo(undefined,newY)
    }

  /**** Width/Height - independent of configured width/height limits ****/

    public get Width  ():WAT_Dimension { return this.Geometry.Width }
    public get Height ():WAT_Dimension { return this.Geometry.Height }

    public set Width (newWidth:WAT_Dimension) {
      expectDimension('widget width',newWidth)
      this.changeGeometryTo(undefined,undefined, newWidth)
    }

    public set Height (newHeight:WAT_Dimension) {
      expectDimension('widget height',newHeight)
      this.changeGeometryTo(undefined,undefined, undefined,newHeight)
    }

  /**** Position ****/

    public get Position ():WAT_Position {
      let { x,y } = this.Geometry
      return { x,y }
    }

    public set Position (newPosition:WAT_Position) {
      expectPlainObject('widget position',newPosition)
        expectLocation('x coordinate',newPosition.x)
        expectLocation('y coordinate',newPosition.y)
      this.changeGeometryTo(newPosition.x,newPosition.y)
    }

  /**** Size ****/

    public get Size ():WAT_Size {
      let { Width,Height } = this.Geometry
      return { Width,Height }
    }

    public set Size (newSize:WAT_Size) {
      expectPlainObject('widget size',newSize)
        expectDimension ('width',newSize.Width)
        expectDimension('height',newSize.Height)
      this.changeGeometryTo(undefined,undefined, newSize.Width,newSize.Height)
    }

  /**** Geometry - Position & Size derived from Anchors & Offsets ****/

    public get Geometry ():WAT_Geometry {
      let x:WAT_Location, Width:WAT_Dimension
      let y:WAT_Location, Height:WAT_Dimension
        const Anchors = this.Anchors
        const Offsets = this.Offsets

      /**** if need be, calculate container dimensions ****/

        let outerWidth:number = 0, outerHeight:number = 0
        if ((Anchors[0] !== 'left-width') || (Anchors[1] !== 'top-height')) {
          const Container = this._Container as WAT_Page
          if (Container == null) throwError(
            'NotAttached: relative geometries can only be calculated for attached widgets'
          )

          ;({ Width:outerWidth, Height:outerHeight } = Container.Geometry)
        }

      /**** derive geometry from offsets and take care of any size constraints ****/

        switch (Anchors[0]) {
          case 'left-width':  Width = Offsets[1]; break
          case 'width-right': Width = Offsets[0]; break
          case 'left-right':  Width = outerWidth-Offsets[0]-Offsets[1]
        }
// @ts-ignore TS2454 "Width" will definitely have a value
        Width = Math.max(0, this._minWidth || 0, Math.min(Width, this._maxWidth == null ? Infinity : this._maxWidth))
        switch (Anchors[0]) {
          case 'left-width':  x = Offsets[0]; break
          case 'width-right': x = outerWidth-Offsets[1]-Width; break
          case 'left-right':  x = Offsets[0]
        }

        switch (Anchors[1]) {
          case 'top-height':    Height = Offsets[3]; break
          case 'height-bottom': Height = Offsets[2]; break
          case 'top-bottom':    Height = outerHeight-Offsets[2]-Offsets[3]
        }
// @ts-ignore TS2454 "Height" will definitely have a value
        Height = Math.max(0, this._minHeight || 0, Math.min(Height, this._maxHeight == null ? Infinity : this._maxHeight))
        switch (Anchors[1]) {
          case 'top-height':    y = Offsets[2]; break
          case 'height-bottom': y = outerHeight-Offsets[3]-Height; break
          case 'top-bottom':    y = Offsets[2]
        }
// @ts-ignore TS2454 "x" and "y" will definitely have values
      return { x,y, Width,Height }
    }

    public set Geometry (newGeometry:WAT_incompleteGeometry) {
      expectIncompleteGeometry('widget geometry',newGeometry)
      this.changeGeometryTo(
        newGeometry.x,newGeometry.y, newGeometry.Width,newGeometry.Height
      )
    }

  /**** changeGeometryBy  ****/

    public changeGeometryBy (
      dx?:number, dy?:number, dWidth?:number, dHeight?:number
    ):void {
      allowFiniteNumber     ('dx',dx)
      allowFiniteNumber     ('dy',dy)
      allowFiniteNumber ('dWidth',dWidth)
      allowFiniteNumber('dHeight',dHeight)

      const { x,y, Width,Height } = this.Geometry
      this.changeGeometryTo(
        x+(dx||0),y+(dy||0), Width+(dWidth||0),Height+(dHeight||0)
      )
    }

  /**** changeGeometryTo  ****/

    public changeGeometryTo (
      newX?:WAT_Location, newY?:WAT_Location,
      newWidth?:WAT_Dimension, newHeight?:WAT_Dimension
    ):void {
      allowLocation ('x coordinate',newX)
      allowLocation ('y coordinate',newY)
      allowDimension ('widget width',newWidth)
      allowDimension('widget height',newHeight)

      if (newX != null) { newX = Math.round(newX) }
      if (newY != null) { newY = Math.round(newY) }

      if (newWidth  != null) { newWidth  = Math.round(newWidth) }
      if (newHeight != null) { newHeight = Math.round(newHeight) }

      const curAnchors  = this.Anchors
      const curGeometry = this.Geometry

    /**** keep any new Width and Height settings within confiured limits ****/

      if (newWidth != null) {
        newWidth = Math.max(0, this._minWidth || 0, Math.min(newWidth, this._maxWidth == null ? Infinity : this._maxWidth))
      }

      if (newHeight != null) {
        newHeight = Math.max(0, this._minHeight || 0, Math.min(newHeight, this._maxHeight == null ? Infinity : this._maxHeight))
      }

    /**** consider real changes only ****/

      if (newX      === curGeometry.x)      { newX = undefined }
      if (newY      === curGeometry.y)      { newY = undefined }
      if (newWidth  === curGeometry.Width)  { newWidth  = undefined }
      if (newHeight === curGeometry.Height) { newHeight = undefined }

      if (
        (newX == null) && (newWidth  == null) &&
        (newY == null) && (newHeight == null)
      ) { return }

    /**** if need be, calculate container dimensions ****/

      let outerWidth:number = 0, outerHeight:number = 0
      if ((curAnchors[0] !== 'left-width') || (curAnchors[1] !== 'top-height')) {
        const Container = this._Container as WAT_Page
        if (Container == null) throwError(
          'NotAttached: relative geometries can only be changed for attached widgets'
        )

        ;({ Width:outerWidth, Height:outerHeight } = Container.Geometry)
      }

    /**** now update any affected Offsets ****/

      if ((newX!= null) ||(newWidth != null)) {
        if (newX     == null) { newX     = curGeometry.x }
        if (newWidth == null) { newWidth = curGeometry.Width }

        switch (curAnchors[0]) {
          case 'left-width':
            this._Offsets[0] = newX
            this._Offsets[1] = newWidth
            break
          case 'width-right':
            this._Offsets[0] = newWidth
            this._Offsets[1] = outerWidth-newX-newWidth
            break
          case 'left-right':
            this._Offsets[0] = newX
            this._Offsets[1] = outerWidth-newX-newWidth
        }
      }

      if ((newY != null) || (newHeight != null)) {
        if (newY      == null) { newY      = curGeometry.y }
        if (newHeight == null) { newHeight = curGeometry.Height }

        switch (curAnchors[1]) {
          case 'top-height':
            this._Offsets[2] = newY
            this._Offsets[3] = newHeight
            break
          case 'height-bottom':
            this._Offsets[2] = newHeight
            this._Offsets[3] = outerHeight-newY-newHeight
            break
          case 'top-bottom':
            this._Offsets[2] = newY
            this._Offsets[3] = outerHeight-newY-newHeight
        }
      }

      this.rerender()
    }

  /**** Anchors ****/

    protected _Anchors:WAT_Anchors = ['left-width','top-height']

    public get Anchors ():WAT_Anchors {
      return this._Anchors.slice() as WAT_Anchors
    }

    public set Anchors (newAnchors:WAT_Anchors) {
      expectList('widget anchors',newAnchors)
        expectOneOf('horizontal widget anchors',newAnchors[0], WAT_horizontalAnchorses)
        expectOneOf(  'vertical widget anchors',newAnchors[1], WAT_verticalAnchorses)

      const curAnchors  = this.Anchors
      const curGeometry = this.Geometry            // already within constraints

    /**** consider real changes only ****/

      if ((newAnchors[0] === curAnchors[0]) && (newAnchors[1] === curAnchors[1])) {
        return
      }

    /**** if need be, calculate container dimensions ****/

      let outerWidth:number = 0, outerHeight:number = 0
      if (
        (newAnchors[0] !== curAnchors[0]) && (newAnchors[0] !== 'left-width') ||
        (newAnchors[1] !== curAnchors[1]) && (newAnchors[1] !== 'top-height')
      ) {
        const Container = this._Container as WAT_Page
        if (Container == null) throwError(
          'NotAttached: relative geometries can only be calculated for attached widgets'
        )

        ;({ Width:outerWidth, Height:outerHeight } = Container.Geometry)
      }

      this._Anchors = newAnchors.slice() as WAT_Anchors

      if (newAnchors[0] !== curAnchors[0]) {
        switch (newAnchors[0]) {
          case 'left-width':
            this._Offsets[0] = curGeometry.x
            this._Offsets[1] = curGeometry.Width
            break
          case 'width-right':
            this._Offsets[0] = curGeometry.Width
            this._Offsets[1] = outerWidth-curGeometry.x-curGeometry.Width
            break
          case 'left-right':
            this._Offsets[0] = curGeometry.x
            this._Offsets[1] = outerWidth-curGeometry.x-curGeometry.Width
        }
      }

      if (newAnchors[1] !== curAnchors[1]) {
        switch (newAnchors[1]) {
          case 'top-height':
            this._Offsets[2] = curGeometry.y
            this._Offsets[3] = curGeometry.Height
            break
          case 'height-bottom':
            this._Offsets[2] = curGeometry.Height
            this._Offsets[3] = outerHeight-curGeometry.y-curGeometry.Height
            break
          case 'top-bottom':
            this._Offsets[2] = curGeometry.y
            this._Offsets[3] = outerHeight-curGeometry.y-curGeometry.Height
        }
      }

      this.rerender()
    }

  /**** Offsets ****/

    protected _Offsets:WAT_Offsets = [0,20, 0,20]

    public get Offsets ():WAT_Offsets {
      return this._Offsets.slice() as WAT_Offsets
    }

    public set Offsets (newOffsets:WAT_Offsets) {
      expectListSatisfying('patch offsets',newOffsets, ValueIsFiniteNumber)
                                  // more specific validations will follow below
      const curAnchors = this.Anchors
      const curOffsets = this.Offsets

    /**** consider real changes only ****/

      if (
        ((newOffsets[0] == null) || (newOffsets[0] === curOffsets[0])) &&
        ((newOffsets[1] == null) || (newOffsets[1] === curOffsets[1])) &&
        ((newOffsets[2] == null) || (newOffsets[2] === curOffsets[2])) &&
        ((newOffsets[3] == null) || (newOffsets[3] === curOffsets[3]))
      ) { return }

    /**** now update offsets ****/

      if ((newOffsets[0] != null) || (newOffsets[1] != null)) {
        switch (curAnchors[0]) {
          case 'left-width':
            allowLocation('x coordinate',newOffsets[0])
            allowDimension('patch width',newOffsets[1])
            break
          case 'width-right':
            allowDimension('patch width',newOffsets[0])
            allowLocation('right offset',newOffsets[1])
            break
          case 'left-right':
            allowLocation('x coordinate',newOffsets[0])
            allowLocation('right offset',newOffsets[1])
        }

        if (newOffsets[0] != null) { this._Offsets[0] = newOffsets[0] }
        if (newOffsets[1] != null) { this._Offsets[1] = newOffsets[1] }
      }

      if ((newOffsets[2] != null) || (newOffsets[3] != null)) {
        switch (curAnchors[1]) {
          case 'top-height':
            allowLocation ('y coordinate',newOffsets[2])
            allowDimension('patch height',newOffsets[3])
            break
          case 'height-bottom':
            allowDimension('patch height',newOffsets[2])
            allowLocation('bottom offset',newOffsets[3])
            break
          case 'top-bottom':
            allowLocation ('y coordinate',newOffsets[2])
            allowLocation('bottom offset',newOffsets[3])
        }

        if (newOffsets[2] != null) { this._Offsets[2] = newOffsets[2] }
        if (newOffsets[3] != null) { this._Offsets[3] = newOffsets[3] }
      }

      this.rerender()
    }

  /**** OverlayNamed ****/

    private _OverlayList:WAT_Overlay[] = []

    public OverlayNamed (OverlayName:WAT_Name):WAT_Overlay|undefined {
      const OverlayIndex = this.IndexOfOverlay(OverlayName)
      return this._OverlayList[OverlayIndex]        // even if OverlayIndex = -1
    }

  /**** existingOverlayNamed ****/

    public existingOverlayNamed (OverlayName:WAT_Name):WAT_Overlay {
      const OverlayIndex = this.IndexOfOverlay(OverlayName)
      if (OverlayIndex < 0) throwError(
        `NotFound: no overlay named ${quoted(OverlayName)} found`
      )

      return this._OverlayList[OverlayIndex] as WAT_Overlay
    }

  /**** IndexOfOverlay ****/

    public IndexOfOverlay (OverlayName:WAT_Name):number {
      expectName('overlay name',OverlayName)
      const normalizedName = OverlayName.toLowerCase()

      return this._OverlayList.findIndex(
        (Overlay:WAT_Overlay) => Overlay.normalizedName === normalizedName
      )
    }

  /**** openOverlay ****/

    public openOverlay (Descriptor:Indexable):void {
      expectPlainObject('overlay descriptor',Descriptor)
        expectName              ('overlay name',Descriptor.Name)
        allowBoolean        ('overlay modality',Descriptor.isModal)
        allowLocation   ('overlay x coordinate',Descriptor.x)
        allowLocation   ('overlay y coordinate',Descriptor.y)
        allowDimension         ('overlay width',Descriptor.Width)
        allowDimension        ('overlay height',Descriptor.Height)
        allowDimension ('minimal overlay width',Descriptor.minWidth)
        allowDimension ('maximal overlay width',Descriptor.maxWidth)
        allowDimension('minimal overlay height',Descriptor.minHeight)
        allowDimension('maximal overlay height',Descriptor.maxHeight)
        allowFunction     ('"onOpen" callback',Descriptor.onOpen)
        allowFunction    ('"onClose" callback',Descriptor.onClose)
      let {
        Name, Title, isModal,
        x,y, Width,Height, minWidth,maxWidth, minHeight,maxHeight,
        onOpen,onClose
      } = Descriptor

      if (this.OverlayIsOpen(Descriptor.Name)) throwError(
        `AlreadyOpen: an overlay named ${quoted(Descriptor.Name)} is already open`
      )

      if (isModal == null) { isModal = false }

      if (x == null) { x = 0 }
      if (y == null) { y = 0 }

      if (minWidth  == null) { minWidth  = 0 }
      if (minHeight == null) { minHeight = 0 }

      let SourceWidget:WAT_Widget, SourceWidgetPath:WAT_Path
        switch (true) {
          case null:
          case undefined:
            throwError('MissingArgument: no source widget path given')
          case ValueIsPath(Descriptor.SourceWidget):
            SourceWidgetPath = Descriptor.SourceWidget as WAT_Path

            SourceWidget = this.Applet?.WidgetAtPath(SourceWidgetPath) as WAT_Widget
            if (SourceWidget == null) throwError(
              `NoSuchWidget: no widget at path ${quoted(Descriptor.SourceWidget)} found`
            )
            break
          case ValueIsWidget(Descriptor.SourceWidget):
            SourceWidget     = Descriptor.SourceWidget as WAT_Widget
            SourceWidgetPath = SourceWidget.Path
          default:
            throwError(
              'InvalidArgument: the given source widget is neither a widget ' +
              'nor a widget path'
            )
        }
      if ((Width == null) || (Height == null)) {
        let SourceGeometry = SourceWidget.Geometry

        if (Width  == null) { Width  = SourceGeometry.Width }
        if (Height == null) { Height = SourceGeometry.Height }
      }
      Width  = Math.max(minWidth  || 0, Math.min(Width, maxWidth  || Infinity))
      Height = Math.max(minHeight || 0, Math.min(Height,maxHeight || Infinity))

      const Overlay:WAT_Overlay = {
        Name, normalizedName:Name.toLowerCase(), SourceWidgetPath,
        isModal,
        x,y, Width,Height, minWidth,maxWidth, minHeight,maxHeight,
        onOpen,onClose
      }

      this._OverlayList.push(Overlay)
      this.rerender()

      if (Overlay.onOpen != null) { Overlay.onOpen(Overlay) }
    }

  /**** closeOverlay ****/

    public closeOverlay (OverlayName:WAT_Name):void {
      const OverlayIndex = this.IndexOfOverlay(OverlayName)
      if (OverlayIndex < 0) { return }

      const [ Overlay ] = this._OverlayList.splice(OverlayIndex,1)
      this.rerender()

      if (Overlay.onClose != null) { Overlay.onClose(Overlay) }
    }

  /**** closeAllOverlays ****/

    public closeAllOverlays ():void {
      if (this._OverlayList.length > 0) {
        this._OverlayList.forEach(
          (Overlay:WAT_Overlay) => this.closeOverlay(Overlay.Name)
        )
      }
    }

  /**** OverlayIsOpen ****/

    public OverlayIsOpen (OverlayName:WAT_Name):boolean {
      return (this.OverlayNamed(OverlayName) != null)
    }

  /**** openOverlays ****/

    public openOverlays ():WAT_Name[] {
      return this._OverlayList.map((Overlay:WAT_Overlay) => Overlay.Name)
    }

  /**** GeometryOfOverlay ****/

    public GeometryOfOverlay (OverlayName:WAT_Name):WAT_Geometry {
      const Overlay = this.existingOverlayNamed(OverlayName)
      const { x,y, Width,Height } = Overlay
      return { x,y, Width,Height }
    }

  /**** moveOverlayBy ****/

    public moveOverlayBy (OverlayName:WAT_Name, dx:number,dy:number):void {
      const Overlay = this.existingOverlayNamed(OverlayName)

      expectNumber('dx',dx)
      expectNumber('dy',dy)

      this.moveOverlayTo(OverlayName, Overlay.x+dx,Overlay.y+dy)              // DRY
    }

  /**** moveOverlayTo ****/

    public moveOverlayTo (OverlayName:WAT_Name, x:WAT_Location,y:WAT_Location):void {
      const Overlay = this.existingOverlayNamed(OverlayName)

      expectLocation('x coordinate',x)
      expectLocation('y coordinate',y)

      Overlay.x = x
      Overlay.y = y

      this.rerender()
    }

  /**** sizeOverlayBy ****/

    public sizeOverlayBy (OverlayName:WAT_Name, dW:number,dH:number):void {
      const Overlay = this.existingOverlayNamed(OverlayName)

      expectNumber('dW',dW)
      expectNumber('dH',dH)

      this.sizeOverlayTo(OverlayName, Overlay.Width+dW,Overlay.Height+dH)     // DRY
    }

  /**** sizeOverlayTo ****/

    public sizeOverlayTo (
      OverlayName:WAT_Name, Width:WAT_Dimension,Height:WAT_Dimension
    ):void {
      const Overlay = this.existingOverlayNamed(OverlayName)

      expectDimension ('Width',Width)
      expectDimension('Height',Height)

      Overlay.Width  = Math.max(Overlay.minWidth  || 0, Math.min(Width,  Overlay.maxWidth  || Infinity))
      Overlay.Height = Math.max(Overlay.minHeight || 0, Math.min(Height, Overlay.maxHeight || Infinity))

      this.rerender()
    }

  /**** Serialization ****/

    public get Serialization ():Serializable {
      const Result:Serializable = {}
        this._serializeConfigurationInto(Result)
      return Result
    }
    public set Serialization (_:Serializable) { throwReadOnlyError('Serialization') }

  /**** _serializeConfigurationInto ****/

    protected _serializeConfigurationInto (Serialization:Serializable):void {
      super._serializeConfigurationInto(Serialization)

      Serialization.Type = this.Type

      if (this.Lock       == true)  { Serialization.Lock       = true }
      if (this.Visibility == false) { Serialization.Visibility = false }
      if (this.Enabling   == false) { Serialization.Enabling   = false }

      if (ValuesDiffer(this._Anchors,['left-width','top-height'])) {
        Serialization.Anchors = this.Anchors
      }
      Serialization.Offsets = this.Offsets
    }

  /**** _deserializeConfigurationFrom ****/

    protected _deserializeConfigurationFrom (Serialization:Serializable):void {
      super._deserializeConfigurationFrom(Serialization)

      const deserializeProperty = (Name:string) => {
        if (Serialization[Name] != null) {
          try {
// @ts-ignore TS7053 allow indexing of "this" and "Serialization"
            this[Name] = Serialization[Name]   // also validates the given value
          } catch (Signal:any) {
            console.warn(
              'DeserializationError: invalid value for property ' +
              quoted(Name) + ' in visual ' + quoted(this.Path)
            )
          }
        }
      }

    /**** Anchors and Offsets require some special attention ****/

      let newAnchors = Serialization.Anchors as WAT_Anchors
      if (
        ValueIsList(newAnchors) &&
        ValueIsOneOf(newAnchors[0], WAT_horizontalAnchorses) &&
        ValueIsOneOf(newAnchors[1], WAT_verticalAnchorses)
      ) { this._Anchors = newAnchors.slice() as WAT_Anchors }

      let Anchors    = this.Anchors
      let newOffsets = Serialization.Offsets as WAT_Offsets
      if (ValueIsListSatisfying(newOffsets,ValueIsInteger,4,4)) {
        if (
          (
            (Anchors[0] === 'left-width')  && ValueIsDimension(newOffsets[1]) ||
            (Anchors[0] === 'left-right')  ||
            (Anchors[0] === 'width-right') && ValueIsDimension(newOffsets[0])
          ) && (
            (Anchors[1] === 'top-height')    && ValueIsDimension(newOffsets[3]) ||
            (Anchors[1] === 'top-bottom')    ||
            (Anchors[1] === 'height-bottom') && ValueIsDimension(newOffsets[2])
          )
        ) { this._Offsets = newOffsets.slice() as WAT_Offsets }
      }

    /**** the remaining properties are simpler ****/

      ;[
//      'Type',
        'Lock','Visibility','Enabling'
      ].forEach((Name:string) => deserializeProperty(Name))
    }
  }

/**** WidgetTypes ****/

  const builtInWidgetTypes:Indexable = {}

  function WidgetTypes ():string[] {
    return Object.keys(builtInWidgetTypes)
  }

/**** newWidgetOfType ****/

  function newWidgetOfType (Type:string, Page:WAT_Page):WAT_Widget {
    if (Type in builtInWidgetTypes) {
      return new builtInWidgetTypes[Type](Page)
    } else {
      throwError(`InvalidArgument: widget type ${quoted(Type)} is unknown`)
    }
  }

//------------------------------------------------------------------------------
//--                          built-in Widget Types                           --
//------------------------------------------------------------------------------

/**** plainWidget ****/

  export class WAT_plainWidget extends WAT_Widget {
    public constructor (Page:WAT_Page) { super(Page) }

    public get Type ():string  { return 'plainWidget' }
    public set Type (_:string) { throwReadOnlyError('Type') }

    protected _Renderer = () => {
      return html`<div class="WAT plainWidget"/>`
    }
  }
  builtInWidgetTypes['plainWidget'] = WAT_plainWidget

/**** Outline ****/

  export class WAT_Outline extends WAT_Widget {
    public constructor (Page:WAT_Page) { super(Page) }

    public get Type ():string  { return 'Outline' }
    public set Type (_:string) { throwReadOnlyError('Type') }

  /**** Renderer ****/

    protected _Renderer = () => {
      return html`<div class="WAT Content Outline"/>`
    }

  /**** bundledWidgets ****/

    public bundledWidgets ():WAT_Widget[] {
      const Page = this.Page
      if (Page == null) { return [] }

      const { x,y, Width,Height } = this.Geometry
      const [ minX,maxX, minY,maxY ] = [ x,x+Width, y,y+Height ]

      return Page.WidgetList.filter((Widget:WAT_Widget) => {
        if (Widget === this) { return false }

        const { x,y, Width,Height } = Widget.Geometry
        return (
          (x >= minX) && (x+Width  <= maxX) &&
          (y >= minY) && (y+Height <= maxY)
        )
      })
    }
  }
  builtInWidgetTypes['Outline'] = WAT_Outline

  appendStyle(`
/**** Outline ****/

  .WAT.Widget > .WAT.Outline {
    outline:dotted 1px blue;
    outline-offset:2px;
  }
  `)

  appendStyle(`
/**** Title/Subtitle/Label/Text/FinePrint ****/
  `)

/**** Title ****/

  export class WAT_Title extends WAT_Widget {
    public constructor (Page:WAT_Page) { super(Page) }

    public get Type ():string  { return 'Title' }
    public set Type (_:string) { throwReadOnlyError('Type') }

    protected _Renderer = () => {
      return html`<div class="WAT Content Title">${this.Value}</div>`
    }
  }
  builtInWidgetTypes['Title'] = WAT_Title

  appendStyle(`
  .WAT.Widget > .WAT.Title {
    font-size:22px; font-weight:bold; line-height:32px;
    text-overflow:ellipsis;
  }
  `)

/**** Subtitle ****/

  export class WAT_Subtitle extends WAT_Widget {
    public constructor (Page:WAT_Page) { super(Page) }

    public get Type ():string  { return 'Subtitle' }
    public set Type (_:string) { throwReadOnlyError('Type') }

    protected _Renderer = () => {
      return html`<div class="WAT Content Subtitle">${this.Value}</div>`
    }
  }
  builtInWidgetTypes['Subtitle'] = WAT_Subtitle

  appendStyle(`
  .WAT.Widget > .WAT.Subtitle {
    font-size:18px; font-weight:bold; line-height:27px;
    text-overflow:ellipsis;
  }
  `)

/**** Label ****/

  export class WAT_Label extends WAT_Widget {
    public constructor (Page:WAT_Page) { super(Page) }

    public get Type ():string  { return 'Label' }
    public set Type (_:string) { throwReadOnlyError('Type') }

    protected _Renderer = () => {
      return html`<div class="WAT Content Label">${this.Value}</div>`
    }
  }
  builtInWidgetTypes['Label'] = WAT_Label

  appendStyle(`
  .WAT.Widget > .WAT.Label {
    font-size:14px; font-weight:bold; line-height:21px;
    top:4px;
    text-overflow:ellipsis;
  }
  `)

/**** Text ****/

  export class WAT_Text_ extends WAT_Widget {
    public constructor (Page:WAT_Page) { super(Page) }

    public get Type ():string  { return 'Text' }
    public set Type (_:string) { throwReadOnlyError('Type') }

    protected _Renderer = () => {
      return html`<div class="WAT Content Text">${this.Value}</div>`
    }
  }
  builtInWidgetTypes['Text'] = WAT_Text_

  appendStyle(`
  .WAT.Widget > .WAT.Text {
    font-size:14px; font-weight:normal; line-height:21px;
    top:4px;
    text-overflow:ellipsis;
  }
  `)

/**** Fineprint ****/

  export class WAT_Fineprint extends WAT_Widget {
    public constructor (Page:WAT_Page) { super(Page) }

    public get Type ():string  { return 'Fineprint' }
    public set Type (_:string) { throwReadOnlyError('Type') }

    protected _Renderer = () => {
      return html`<div class="WAT Content Fineprint">${this.Value}</div>`
    }
  }
  builtInWidgetTypes['Fineprint'] = WAT_Fineprint

  appendStyle(`
  .WAT.Widget > .WAT.FinePrint {
    font-size:12px; font-weight:normal; line-height:18px;
    text-overflow:ellipsis;
  }
  `)

/**** HTMLView ****/

  export class WAT_HTMLView extends WAT_Widget {
    public constructor (Page:WAT_Page) { super(Page) }

    public get Type ():string  { return 'HTMLView' }
    public set Type (_:string) { throwReadOnlyError('Type') }

    protected _Renderer = () => {
      return html`<div class="WAT Content HTMLView"
        dangerouslySetInnerHTML=${{__html:acceptableText(this.Value,'')}}
      />`
    }
  }
  builtInWidgetTypes['HTMLView'] = WAT_HTMLView

  appendStyle(`
  .WAT.Widget > .WAT.HTMLView {
  }
  `)

/**** ImageView ****/

  export const WAT_ImageScalings = ['none','stretch','cover','contain']
  export type  WAT_ImageScaling  = typeof WAT_ImageScalings[number]

  export const WAT_ImageAlignments = [
    'left top','center top','right top','left center','center center',
    'right center','left bottom','center bottom','right bottom'
  ]
  export type  WAT_ImageAlignment  = typeof WAT_ImageAlignments[number]

  export class WAT_ImageView extends WAT_Widget {
    public constructor (Page:WAT_Page) { super(Page) }

    public get Type ():string  { return 'ImageView' }
    public set Type (_:string) { throwReadOnlyError('Type') }

  /**** ImageScaling ****/

    protected _ImageScaling:WAT_ImageScaling|undefined

    public get ImageScaling ():WAT_ImageScaling|undefined {
      return this._ImageScaling
    }

    public set ImageScaling (newSetting:WAT_ImageScaling|undefined) {
      allowOneOf('image scaling',newSetting, WAT_ImageScalings)
      if (this._ImageScaling !== newSetting) {
        this._ImageScaling = newSetting
        this.rerender()
      }
    }

  /**** ImageAlignment ****/

    protected _ImageAlignment:WAT_ImageAlignment|undefined

    public get ImageAlignment ():WAT_ImageAlignment|undefined {
      return this._ImageAlignment
    }

    public set ImageAlignment (newSetting:WAT_ImageAlignment|undefined) {
      allowOneOf('image alignment',newSetting, WAT_ImageAlignments)
      if (this._ImageAlignment !== newSetting) {
        this._ImageAlignment = newSetting
        this.rerender()
      }
    }

  /**** _serializeConfigurationInto ****/

    protected _serializeConfigurationInto (Serialization:Serializable):void {
      super._serializeConfigurationInto(Serialization)

      this._serializePropertyInto('ImageScaling',  Serialization)
      this._serializePropertyInto('ImageAlignment',Serialization)
    }

  /**** _deserializeConfigurationFrom ****/

    protected _deserializeConfigurationFrom (Serialization:Serializable):void {
      super._deserializeConfigurationFrom(Serialization)

      this._ImageScaling   = acceptableOneOf(Serialization.ImageScaling,  'contain', WAT_ImageScalings)
      this._ImageAlignment = acceptableOneOf(Serialization.ImageAlignment,'center',  WAT_ImageAlignments)
    }

  /**** Renderer ****/

    protected _Renderer = () => {
      const ImageScaling   = acceptableOneOf(this._ImageScaling,  'contain', WAT_ImageScalings)
      const ImageAlignment = acceptableOneOf(this._ImageAlignment,'center',  WAT_ImageAlignments)

      return html`<img class="WAT Content ImageView"
        src=${acceptableURL(this.Value,'')}
        style="object-fit:${ImageScaling}; object-position:${ImageAlignment}"
      />`
    }
  }
  builtInWidgetTypes['ImageView'] = WAT_ImageView

  appendStyle(`
  .WAT.Widget > .WAT.ImageView {
    object-fit:contain; object-position:center;
  }
  `)

/**** SVGView ****/

  export class WAT_SVGView extends WAT_Widget {
    public constructor (Page:WAT_Page) { super(Page) }

    public get Type ():string  { return 'SVGView' }
    public set Type (_:string) { throwReadOnlyError('Type') }

  /**** ImageScaling ****/

    protected _ImageScaling:WAT_ImageScaling|undefined

    public get ImageScaling ():WAT_ImageScaling|undefined {
      return this._ImageScaling
    }

    public set ImageScaling (newSetting:WAT_ImageScaling|undefined) {
      allowOneOf('image scaling',newSetting, WAT_ImageScalings)
      if (this._ImageScaling !== newSetting) {
        this._ImageScaling = newSetting
        this.rerender()
      }
    }

  /**** ImageAlignment ****/

    protected _ImageAlignment:WAT_ImageAlignment|undefined

    public get ImageAlignment ():WAT_ImageAlignment|undefined {
      return this._ImageAlignment
    }

    public set ImageAlignment (newSetting:WAT_ImageAlignment|undefined) {
      allowOneOf('image alignment',newSetting, WAT_ImageAlignments)
      if (this._ImageAlignment !== newSetting) {
        this._ImageAlignment = newSetting
        this.rerender()
      }
    }

  /**** _serializeConfigurationInto ****/

    protected _serializeConfigurationInto (Serialization:Serializable):void {
      super._serializeConfigurationInto(Serialization)

      this._serializePropertyInto('ImageScaling',  Serialization)
      this._serializePropertyInto('ImageAlignment',Serialization)
    }

  /**** _deserializeConfigurationFrom ****/

    protected _deserializeConfigurationFrom (Serialization:Serializable):void {
      super._deserializeConfigurationFrom(Serialization)

      this._ImageScaling   = acceptableOneOf(Serialization.ImageScaling,  'contain', WAT_ImageScalings)
      this._ImageAlignment = acceptableOneOf(Serialization.ImageAlignment,'center',  WAT_ImageAlignments)
    }

  /**** Renderer ****/

    protected _Renderer = () => {
      const DataURL = 'data:image/svg+xml;base64,' + btoa(acceptableText(this.Value,''))

      const ImageScaling   = acceptableOneOf(this._ImageScaling,  'contain', WAT_ImageScalings)
      const ImageAlignment = acceptableOneOf(this._ImageAlignment,'center',  WAT_ImageAlignments)

      return html`<img class="WAT Content SVGView"
        src=${DataURL}
        style="object-fit:${ImageScaling}; object-position:${ImageAlignment}"
      />`
    }
  }
  builtInWidgetTypes['SVGView'] = WAT_SVGView

  appendStyle(`
  .WAT.Widget > .WAT.SVGView {
    object-fit:contain; object-position:center;
  }
  `)

/**** WebView ****/

  export const WAT_DefaultSandboxPermissions = (
    'allow-downloads allow-forms allow-modals allow-orientation-lock ' +
    'allow-pointer-lock allow-popups allow-same-origin allow-scripts'
  )

  export const WAT_ReferrerPolicies = [
    'no-referrer','no-referrer-when-downgrade','origin','origin-when-cross-origin',
    'same-origin', 'strict-origin', 'strict-origin','strict-origin-when-cross-origin',
    'unsafe-url'
  ]
  export type  WAT_ReferrerPolicy   = typeof WAT_ReferrerPolicies[number]

  export class WAT_WebView extends WAT_Widget {
    public constructor (Page:WAT_Page) { super(Page) }

    public get Type ():string  { return 'WebView' }
    public set Type (_:string) { throwReadOnlyError('Type') }

  /**** PermissionsPolicy ****/

    protected _PermissionsPolicy:WAT_Textline|undefined

    public get PermissionsPolicy ():WAT_Textline|undefined { return this._PermissionsPolicy }
    public set PermissionsPolicy (newSetting:WAT_Textline|undefined) {
      allowTextline('permissions policy',newSetting)
      if (this._PermissionsPolicy !== newSetting) {
        this._PermissionsPolicy = newSetting
        this.rerender()
      }
    }

  /**** allowsFullscreen ****/

    protected _allowsFullscreen:boolean = false

    public get allowsFullscreen ():boolean { return this._allowsFullscreen }
    public set allowsFullscreen (newSetting:boolean) {
      allowBoolean('fullscreen permission',newSetting)
      if (this._allowsFullscreen !== newSetting) {
        this._allowsFullscreen = newSetting
        this.rerender()
      }
    }

  /**** SandboxPermissions ****/

    protected _SandboxPermissions:WAT_Textline|undefined

    public get SandboxPermissions ():WAT_Textline|undefined { return this._SandboxPermissions }
    public set SandboxPermissions (newSetting:WAT_Textline|undefined) {
      allowTextline('sandbox permissions',newSetting)
      if (this._SandboxPermissions !== newSetting) {
        this._SandboxPermissions = newSetting
        this.rerender()
      }
    }

  /**** ReferrerPolicy ****/

    protected _ReferrerPolicy:WAT_ReferrerPolicy|undefined

    public get ReferrerPolicy ():WAT_ReferrerPolicy|undefined {
      return this._ReferrerPolicy
    }

    public set ReferrerPolicy (newSetting:WAT_ReferrerPolicy|undefined) {
      allowOneOf('referrer policy',newSetting, WAT_ReferrerPolicies)
      if (this._ReferrerPolicy !== newSetting) {
        this._ReferrerPolicy = newSetting
        this.rerender()
      }
    }

  /**** _serializeConfigurationInto ****/

    protected _serializeConfigurationInto (Serialization:Serializable):void {
      super._serializeConfigurationInto(Serialization)

      ;[
        'PermissionsPolicy', 'allowsFullscreen', 'SandboxPermissions',
        'ReferrerPolicy'
      ].forEach((Name:string) => this._serializePropertyInto(Name,Serialization))
    }

  /**** _deserializeConfigurationFrom ****/

    protected _deserializeConfigurationFrom (Serialization:Serializable):void {
      super._deserializeConfigurationFrom(Serialization)

      this._PermissionsPolicy  = acceptableOptionalTextline(Serialization.PermissionsPolicy)
      this._allowsFullscreen   = acceptableBoolean         (Serialization.allowsFullscreen,   false)
      this._SandboxPermissions = acceptableTextline        (Serialization.SandboxPermissions, WAT_DefaultSandboxPermissions)
      this._ReferrerPolicy     = acceptableOptionalOneOf   (Serialization.ReferrerPolicy,     WAT_ReferrerPolicies)
    }

  /**** Renderer ****/

    protected _Renderer = () => {
      const PermissionsPolicy  = acceptableOptionalTextline(this._PermissionsPolicy)
      const allowsFullscreen   = acceptableBoolean         (this._allowsFullscreen,   false)
      const SandboxPermissions = acceptableTextline        (this._SandboxPermissions, WAT_DefaultSandboxPermissions)
      const ReferrerPolicy     = acceptableOptionalOneOf   (this._ReferrerPolicy,     WAT_ReferrerPolicies)

      return html`<iframe class="WAT Content WebView"
        src=${acceptableURL(this.Value,'')}
        allow=${PermissionsPolicy} allowfullscreen=${allowsFullscreen}
        sandbox=${SandboxPermissions} referrerpolicy=${ReferrerPolicy}
      />`
    }
  }
  builtInWidgetTypes['WebView'] = WAT_WebView

  appendStyle(`
  .WAT.Widget > .WAT.WebView {
  }
  `)

/**** Badge ****/

  export class WAT_Badge extends WAT_Widget {
    public constructor (Page:WAT_Page) { super(Page) }

    public get Type ():string  { return 'Badge' }
    public set Type (_:string) { throwReadOnlyError('Type') }

    protected _Renderer = () => {
      const Value = (
        ValueIsNumber(this.Value)
        ? ''+this.Value
        : acceptableTextline(this.Value,'')
      )
      const BorderRadius = Math.round(Math.min(this.Width,this.Height)/2)

      return html`<div class="WAT Content Badge" style="
        border-color:${this.ForegroundColor || 'black'}; border-radius:${BorderRadius}px;
        line-height:${this.Height-4}px;
      ">${acceptableTextline(Value,'')}</>`
    }
  }
  builtInWidgetTypes['Badge'] = WAT_Badge

  appendStyle(`
  .WAT.Widget > .WAT.Badge {
    font-size:18px; font-weight:bold; text-align:center;
    border:solid 2px black;
  }
  `)

/**** Icon ****/

  export class WAT_Icon extends WAT_Widget {
    public constructor (Page:WAT_Page) { super(Page) }

    public get Type ():string  { return 'Icon' }
    public set Type (_:string) { throwReadOnlyError('Type') }

    protected _Renderer = () => {
      const _onClick = (Event:any) => {
        if (this.Enabling == false) { return consumingEvent(Event) }
        if (this._onClick != null) { this._onClick_(Event) }         // no typo!
      }

      const Value = acceptableURL(this.Value,`${IconFolder}/pencil.png`)
      const Color = acceptableColor(this.Color,'black')

      return html`<div class="WAT Content Icon" style="
        -webkit-mask-image:url(${Value}); mask-image:url(${Value});
        background-color:${Color};
      " disabled=${this.Enabling == false} onClick=${_onClick}
      />`
    }
  }
  builtInWidgetTypes['Icon'] = WAT_Icon

  appendStyle(`
  .WAT.Widget > .WAT.Icon {
    -webkit-mask-size:contain;           mask-size:contain;
    -webkit-mask-position:center center; mask-position:center center;
  }
  `)

/**** horizontalSeparator ****/

  export class WAT_horizontalSeparator extends WAT_Widget {
    public constructor (Page:WAT_Page) { super(Page) }

    public get Type ():string  { return 'horizontalSeparator' }
    public set Type (_:string) { throwReadOnlyError('Type') }

  /**** rendering ****/

    protected _Renderer = () => {
      return html`<div class="WAT Content horizontalSeparator"></div>`
    }
  }
  builtInWidgetTypes['horizontalSeparator'] = WAT_horizontalSeparator

  appendStyle(`
  .WAT.Widget > .WAT.horizontalSeparator {
    border:none; border-top:solid 1px black;
  }
  `)

/**** verticalSeparator ****/

  export class WAT_verticalSeparator extends WAT_Widget {
    public constructor (Page:WAT_Page) { super(Page) }

    public get Type ():string  { return 'verticalSeparator' }
    public set Type (_:string) { throwReadOnlyError('Type') }

  /**** rendering ****/

    protected _Renderer = () => {
      return html`<div class="WAT Content verticalSeparator"></div>`
    }
  }
  builtInWidgetTypes['verticalSeparator'] = WAT_verticalSeparator

  appendStyle(`
  .WAT.Widget > .WAT.verticalSeparator {
    border:none; border-left:solid 1px black;
  }
  `)

/**** Button ****/

  export class WAT_Button extends WAT_Widget {
    public constructor (Page:WAT_Page) { super(Page) }

    public get Type ():string  { return 'Button' }
    public set Type (_:string) { throwReadOnlyError('Type') }

    public get Label ():WAT_Textline|undefined  { return this.memoized.Label }
    public set Label (newLabel:WAT_Textline|undefined) {
      allowTextline('button label',newLabel)
      if (this.memoized.Label != newLabel) {
        this.memoized.Label = newLabel
        this.rerender()
      }
    }

    protected _Renderer = () => {
      const onClick = (Event:any) => {
        if (this.Enabling == false) { return consumingEvent(Event) }
        if (this._onClick != null) { this._onClick_(Event) }         // no typo!
      }

      const Label = acceptableTextline(this.Label || this.Value,'')

      return html`<button class="WAT Content Button" style="
        line-height:${this.LineHeight || this.Height}px;
      " disabled=${this.Enabling == false} onClick=${onClick}
      >${Label}</>`
    }
  }
  builtInWidgetTypes['Button'] = WAT_Button

  appendStyle(`
  .WAT.Widget > .WAT.Button {
    border:solid 1px black; border-radius:4px;
    background:white;
    font-weight:bold; color:black;
    text-align:center;
  }
  `)

/**** Checkbox ****/

  export class WAT_Checkbox extends WAT_Widget {
    public constructor (Page:WAT_Page) { super(Page) }

    public get Type ():string  { return 'Checkbox' }
    public set Type (_:string) { throwReadOnlyError('Type') }

    protected _Renderer = () => {
      const onClick = (Event:any) => {
        if (this.Enabling == false) { return consumingEvent(Event) }

        this.Value = Event.target.checked
        if (this._onClick != null) { this._onClick_(Event) }         // no typo!
      }

      const Value = acceptableOptionalBoolean(this.Value)

      const checked       = (Value == true)
      const indeterminate = (Value == null)

      return html`<input type="checkbox" class="WAT Checkbox"
        checked=${checked} indeterminate=${indeterminate}
        disabled=${this.Enabling == false} onClick=${onClick}
      />`
    }
  }
  builtInWidgetTypes['Checkbox'] = WAT_Checkbox

  appendStyle(`
  .WAT.Widget > .WAT.Checkbox {
    left:50%; top:50%;
    transform:translate(-50%,-50%);
  }
  `)

/**** Radiobutton ****/

  export class WAT_Radiobutton extends WAT_Widget {
    public constructor (Page:WAT_Page) { super(Page) }

    public get Type ():string  { return 'Radiobutton' }
    public set Type (_:string) { throwReadOnlyError('Type') }

    protected _Renderer = () => {
      const onClick = (Event:any) => {
        if (this.Enabling == false) { return consumingEvent(Event) }

        this.Value = Event.target.checked
        if (this._onClick != null) { this._onClick_(Event) }         // no typo!
      }

      const Value = acceptableBoolean(this.Value,false)

      return html`<input type="radio" class="WAT Radiobutton"
        checked=${Value == true}
        disabled=${this.Enabling == false} onClick=${onClick}
      />`
    }
  }
  builtInWidgetTypes['Radiobutton'] = WAT_Radiobutton

  appendStyle(`
  .WAT.Widget > .WAT.Radiobutton {
    left:50%; top:50%;
    transform:translate(-50%,-50%);
  }
  `)

/**** Gauge ****/

  export class WAT_Gauge extends WAT_Widget {
    public constructor (Page:WAT_Page) { super(Page) }

    public get Type ():string  { return 'Gauge' }
    public set Type (_:string) { throwReadOnlyError('Type') }

  /**** Minimum ****/

    protected _Minimum:number|undefined

    public get Minimum ():number|undefined { return this._Minimum }
    public set Minimum (newSetting:number|undefined) {
      allowNumber('minimal value',newSetting)
      if (this._Minimum !== newSetting) {
        this._Minimum = newSetting
        this.rerender()
      }
    }

  /**** lowerBound ****/

    protected _lowerBound:number|undefined

    public get lowerBound ():number|undefined { return this._lowerBound }
    public set lowerBound (newSetting:number|undefined) {
      allowNumber('lower bound',newSetting)
      if (this._lowerBound !== newSetting) {
        this._lowerBound = newSetting
        this.rerender()
      }
    }

  /**** Optimum ****/

    protected _Optimum:number|undefined

    public get Optimum ():number|undefined { return this._Optimum }
    public set Optimum (newSetting:number|undefined) {
      allowNumber('optimal value',newSetting)
      if (this._Optimum !== newSetting) {
        this._Optimum = newSetting
        this.rerender()
      }
    }

  /**** upperBound ****/

    protected _upperBound:number|undefined

    public get upperBound ():number|undefined { return this._upperBound }
    public set upperBound (newSetting:number|undefined) {
      allowNumber('upper bound',newSetting)
      if (this._upperBound !== newSetting) {
        this._upperBound = newSetting
        this.rerender()
      }
    }

  /**** Maximum ****/

    protected _Maximum:number|undefined

    public get Maximum ():number|undefined { return this._Maximum }
    public set Maximum (newSetting:number|undefined) {
      allowNumber('maximal value',newSetting)
      if (this._Maximum !== newSetting) {
        this._Maximum = newSetting
        this.rerender()
      }
    }
  /**** _serializeConfigurationInto ****/

    protected _serializeConfigurationInto (Serialization:Serializable):void {
      super._serializeConfigurationInto(Serialization)

      ;[
        ''
      ].forEach((Name:string) => this._serializePropertyInto(Name,Serialization))
    }

  /**** _deserializeConfigurationFrom ****/

    protected _deserializeConfigurationFrom (Serialization:Serializable):void {
      super._deserializeConfigurationFrom(Serialization)

//this._PermissionsPolicy  = acceptableOptionalTextline(Serialization.PermissionsPolicy)
    }

  /**** Renderer ****/

    protected _Renderer = () => {
      const Value = acceptableNumber(
        ValueIsString(this.Value) ? parseFloat(this.Value as string) : this.Value, 0
      )
      const Minimum    = acceptableOptionalNumber(this._Minimum)
      const lowerBound = acceptableOptionalNumber(this._lowerBound)
      const Optimum    = acceptableOptionalNumber(this._Optimum)
      const upperBound = acceptableOptionalNumber(this._upperBound)
      const Maximum    = acceptableOptionalNumber(this._Maximum)

      return html`<meter class="WAT Content Gauge" value=${Value}
        min=${Minimum} low=${lowerBound} opt=${Optimum}
        high=${upperBound} max=${Maximum}
       />`
     }
  }
  builtInWidgetTypes['Gauge'] = WAT_Gauge

  appendStyle(`
  .WAT.Widget > .WAT.Gauge {
  }
  `)

/**** Progressbar ****/

  export class WAT_Progressbar extends WAT_Widget {
    public constructor (Page:WAT_Page) { super(Page) }

    public get Type ():string  { return 'Progressbar' }
    public set Type (_:string) { throwReadOnlyError('Type') }

  /**** Maximum ****/

    protected _Maximum:number|undefined

    public get Maximum ():number|undefined { return this._Maximum }
    public set Maximum (newSetting:number|undefined) {
      allowNumberInRange('maximal value',newSetting, 0,Infinity, true,false)
      if (this._Maximum !== newSetting) {
        this._Maximum = newSetting
        this.rerender()
      }
    }

  /**** _serializeConfigurationInto ****/

    protected _serializeConfigurationInto (Serialization:Serializable):void {
      super._serializeConfigurationInto(Serialization)
      this._serializePropertyInto('Maximum',Serialization)
    }

  /**** _deserializeConfigurationFrom ****/

    protected _deserializeConfigurationFrom (Serialization:Serializable):void {
      super._deserializeConfigurationFrom(Serialization)
      this._Maximum = acceptableOptionalNumberInRange(Serialization.Maximum,undefined, 0)
    }

  /**** Renderer ****/

    protected _Renderer = () => {
      const Value = acceptableNumber(
        ValueIsString(this.Value) ? parseFloat(this.Value as string) : this.Value, 0
      )
      const Maximum = acceptableOptionalNumber(this._Maximum)

      return html`<progress class="WAT Content Progressbar" value=${Value} max=${Maximum}
      style="accent-color:${this.ForegroundColor || 'dodgerblue'}"/>`
    }
  }
  builtInWidgetTypes['Progressbar'] = WAT_Progressbar

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
  `)

/**** Slider ****/

  const HashmarkPattern = /^\s*([+-]?(\d+([.]\d+)?|[.]\d+)([eE][+-]?\d+)?|\d*[.](?:\d*))(?:\s*:\s*([^\x00-\x1F\x7F-\x9F\u2028\u2029\uFFF9-\uFFFB]+))?$/

  function HashmarkMatcher (Value:any):boolean {
    return ValueIsStringMatching(Value,HashmarkPattern) || ValueIsNumber(Value)
  }

  export class WAT_Slider extends WAT_Widget {
    public constructor (Page:WAT_Page) { super(Page) }

    public get Type ():string  { return 'Slider' }
    public set Type (_:string) { throwReadOnlyError('Type') }

  /**** Minimum ****/

    protected _Minimum:number|undefined

    public get Minimum ():number|undefined { return this._Minimum }
    public set Minimum (newSetting:number|undefined) {
      allowNumber('minimal value',newSetting)
      if (this._Minimum !== newSetting) {
        this._Minimum = newSetting
        this.rerender()
      }
    }

  /**** Stepping ****/

    protected _Stepping:number|undefined

    public get Stepping ():number|undefined { return this._Stepping }
    public set Stepping (newSetting:number|undefined) {
      allowNumberInRange('stepping',newSetting, 0,Infinity, true,false)
      if (this._Stepping !== newSetting) {
        this._Stepping = newSetting
        this.rerender()
      }
    }

  /**** Maximum ****/

    protected _Maximum:number|undefined

    public get Maximum ():number|undefined { return this._Maximum }
    public set Maximum (newSetting:number|undefined) {
      allowNumber('maximal value',newSetting)
      if (this._Maximum !== newSetting) {
        this._Maximum = newSetting
        this.rerender()
      }
    }  /**** Hashmarks ****/

    protected _Hashmarks:(number|string)[]|undefined

    public get Hashmarks ():(number|string)[]|undefined {
      return (this._Hashmarks == null ? this._Hashmarks : this._Hashmarks.slice())
    }
    public set Hashmarks (newSetting:(number|string)[]|undefined) {
      allowListSatisfying('hashmark list',newSetting,HashmarkMatcher)
      if (ValuesDiffer(this._Hashmarks,newSetting)) {
        this._Hashmarks = (newSetting == null ? newSetting : newSetting.slice())
        this.rerender()
      }
    }

  /**** _serializeConfigurationInto ****/

    protected _serializeConfigurationInto (Serialization:Serializable):void {
      super._serializeConfigurationInto(Serialization)

      ;[
        'Minimum','Stepping','Maximum','Hashmarks',
      ].forEach((Name:string) => this._serializePropertyInto(Name,Serialization))
    }

  /**** _deserializeConfigurationFrom ****/

    protected _deserializeConfigurationFrom (Serialization:Serializable):void {
      super._deserializeConfigurationFrom(Serialization)

      this._Minimum  = acceptableOptionalNumber       (Serialization.Minimum)
      this._Stepping = acceptableOptionalNumberInRange(Serialization.Stepping,undefined, 0)
      this._Maximum  = acceptableOptionalNumber       (Serialization.Maximum)

      this._Hashmarks = acceptableOptionalListSatisfying(
        Serialization.Hashmarks, undefined, HashmarkMatcher
      )
    }

  /**** Renderer ****/

    protected _Renderer = () => {
      const { Value, Enabling } = this

    /**** handle external changes ****/

      const shownValue   = useRef('')
      const InputElement = useRef(null)

      let ValueToShow:number = acceptableNumber(
        ValueIsString(Value) ? parseFloat(Value as string) : Value, 0
      )
      if (document.activeElement === InputElement.current) {
        ValueToShow = shownValue.current
      } else {
        shownValue.current = ValueToShow
      }

      const _onInput = useCallback((Event:any) => {
        if (Enabling === false) { return consumingEvent(Event) }

        shownValue.current = this.Value = parseFloat(Event.target.value)
        if (this._onInput != null) { this._onInput_(Event) }         // no typo!
      },[ Enabling ])

      const _onBlur = useCallback((Event:any) => {
        this.rerender()
      })

    /**** process any other parameters ****/

      const Minimum  = acceptableOptionalNumber(this._Minimum)
      const Stepping = acceptableOptionalNumberInRange(this._Stepping,undefined, 0)
      const Maximum  = acceptableOptionalNumber(this._Maximum)

      const Hashmarks = acceptableOptionalListSatisfying(
        this._Hashmarks, undefined, HashmarkMatcher
      )

      let HashmarkList:any = '', HashmarkId
      if ((Hashmarks != null) && (Hashmarks.length > 0)) {
        HashmarkId = IdOfWidget(this) + '-Hashmarks'

        HashmarkList = html`\n<datalist id=${HashmarkId}>
          ${Hashmarks.map((Item:string|number) => {
            Item = ''+Item
            const Value = Item.replace(/:.*$/,'').trim()
            const Label = Item.replace(/^[^:]+:/,'').trim()

            return html`<option value=${Value}>${Label}</option>`
          })}
        </datalist>`
      }

    /**** actual rendering ****/

      return html`<input type="range" class="WAT Content Slider"
        value=${ValueToShow} min=${Minimum} max=${Maximum} step=${Stepping}
        disabled=${Enabling === false} onInput=${_onInput} onBlur=${_onBlur}
        list=${HashmarkId}
      />${HashmarkList}`
    }
  }
  builtInWidgetTypes['Slider'] = WAT_Slider

  appendStyle(`
  .WAT.Widget > .WAT.Slider {
  }
  `)

/**** TextlineInput ****/

  export class WAT_TextlineInput extends WAT_Widget {
    public constructor (Page:WAT_Page) { super(Page) }

    public get Type ():string  { return 'TextlineInput' }
    public set Type (_:string) { throwReadOnlyError('Type') }

  /**** Placeholder ****/

    protected _Placeholder:WAT_Textline|undefined

    public get Placeholder ():WAT_Textline|undefined { return this._Placeholder }
    public set Placeholder (newSetting:WAT_Textline|undefined) {
      allowTextline('placeholder',newSetting)
      if (this._Placeholder !== newSetting) {
        this._Placeholder = newSetting
        this.rerender()
      }
    }

  /**** readonly ****/

    protected _readonly:boolean = false

    public get readonly ():boolean { return this._readonly }
    public set readonly (newSetting:boolean) {
      allowBoolean('readonly setting',newSetting)
      if (this._readonly !== newSetting) {
        this._readonly = newSetting
        this.rerender()
      }
    }

  /**** minLength ****/

    protected _minLength:number|undefined

    public get minLength ():number|undefined { return this._minLength }
    public set minLength (newSetting:number|undefined) {
      allowOrdinal('minimal length',newSetting)
      if (this._minLength !== newSetting) {
        this._minLength = newSetting
        this.rerender()
      }
    }

  /**** maxLength ****/

    protected _maxLength:number|undefined

    public get maxLength ():number|undefined { return this._maxLength }
    public set maxLength (newSetting:number|undefined) {
      allowOrdinal('maximal length',newSetting)
      if (this._maxLength !== newSetting) {
        this._maxLength = newSetting
        this.rerender()
      }
    }

  /**** Pattern ****/

    protected _Pattern:WAT_Textline|undefined

    public get Pattern ():WAT_Textline|undefined { return this._Pattern }
    public set Pattern (newSetting:WAT_Textline|undefined) {
      allowTextline('input pattern',newSetting)
      if (this._Pattern !== newSetting) {
        this._Pattern = newSetting
        this.rerender()
      }
    }

  /**** SpellChecking ****/

    protected _SpellChecking:boolean = false

    public get SpellChecking ():boolean { return this._SpellChecking }
    public set SpellChecking (newSetting:boolean) {
      allowBoolean('spell check setting',newSetting)
      if (this._SpellChecking !== newSetting) {
        this._SpellChecking = newSetting
        this.rerender()
      }
    }

  /**** Suggestions ****/

    protected _Suggestions:string[]|undefined

    public get Suggestions ():string[]|undefined {
      return (this._Suggestions == null ? this._Suggestions : this._Suggestions.slice())
    }
    public set Suggestions (newSetting:string[]|undefined) {
      allowListSatisfying('suggestion list',newSetting,ValueIsTextline)
      if (ValuesDiffer(this._Suggestions,newSetting)) {
        this._Suggestions = (newSetting == null ? newSetting : newSetting.slice())
        this.rerender()
      }
    }

  /**** _serializeConfigurationInto ****/

    protected _serializeConfigurationInto (Serialization:Serializable):void {
      super._serializeConfigurationInto(Serialization)

      ;[
        'Placeholder','readonly','minLength','maxLength','Pattern',
        'SpellChecking','Suggestions',
      ].forEach((Name:string) => this._serializePropertyInto(Name,Serialization))
    }

  /**** _deserializeConfigurationFrom ****/

    protected _deserializeConfigurationFrom (Serialization:Serializable):void {
      super._deserializeConfigurationFrom(Serialization)

      this._Placeholder   = acceptableOptionalTextline(Serialization.Placeholder)
      this._readonly      = acceptableBoolean         (Serialization.readonly, false)
      this._minLength     = acceptableOptionalOrdinal (Serialization.minLength)
      this._maxLength     = acceptableOptionalOrdinal (Serialization.maxLength)
      this._Pattern       = acceptableOptionalTextline(Serialization.Pattern)
      this._SpellChecking = acceptableBoolean         (Serialization.SpellChecking, false)

      this._Suggestions = acceptableOptionalListSatisfying(
        Serialization.Suggestions, undefined, ValueIsTextline
      )
    }

  /**** Renderer ****/

    protected _Renderer = () => {
      const { Value, Enabling } = this

    /**** handle external changes ****/

      const shownValue   = useRef('')
      const InputElement = useRef(null)

      let ValueToShow:string = acceptableTextline(Value,'')
      if (document.activeElement === InputElement.current) {
        ValueToShow = shownValue.current
      } else {
        shownValue.current = ValueToShow
      }

      const _onInput = useCallback((Event:any) => {
        if (Enabling === false) { return consumingEvent(Event) }

        shownValue.current = this.Value = Event.target.value
        if (this._onInput != null) { this._onInput_(Event) }         // no typo!
      },[ Enabling ])

      const _onBlur = useCallback((Event:any) => {
        this.rerender()
        if (this._onBlur != null) { this._onBlur_(Event) }           // no typo!
      })

    /**** process any other parameters ****/

      const Placeholder   = acceptableOptionalTextline(this._Placeholder)
      const readonly      = acceptableOptionalBoolean (this._readonly)
      const minLength     = acceptableOptionalOrdinal (this._minLength)
      const maxLength     = acceptableOptionalOrdinal (this._maxLength)
      const Pattern       = acceptableOptionalTextline(this._Pattern)
      const SpellChecking = acceptableOptionalBoolean (this._SpellChecking)

      const Suggestions = acceptableOptionalListSatisfying(
        this._Suggestions, undefined, ValueIsTextline
      )

      let SuggestionList:any = '', SuggestionId
      if ((Suggestions != null) && (Suggestions.length > 0)) {
        SuggestionId = IdOfWidget(this) + '-Suggestions'

        SuggestionList = html`<datalist id=${SuggestionId}>
          ${Suggestions.map((Value:string) => html`<option value=${Value}></option>`)}
        </datalist>`
      }

    /**** actual rendering ****/

      return html`<input type="text" class="WAT Content TextlineInput"
        value=${ValueToShow} minlength=${minLength} maxlength=${maxLength}
        readOnly=${readonly} placeholder=${Placeholder}
        pattern=${Pattern} spellcheck=${SpellChecking}
        disabled=${Enabling === false} onInput=${_onInput} onBlur=${_onBlur}
        list=${SuggestionId}
      />${SuggestionList}`
    }
  }
  builtInWidgetTypes['TextlineInput'] = WAT_TextlineInput

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
  `)

/**** PasswordInput ****/

  export class WAT_PasswordInput extends WAT_Widget {
    public constructor (Page:WAT_Page) { super(Page) }

    public get Type ():string  { return 'PasswordInput' }
    public set Type (_:string) { throwReadOnlyError('Type') }

  /**** Placeholder ****/

    protected _Placeholder:WAT_Textline|undefined

    public get Placeholder ():WAT_Textline|undefined { return this._Placeholder }
    public set Placeholder (newSetting:WAT_Textline|undefined) {
      allowTextline('placeholder',newSetting)
      if (this._Placeholder !== newSetting) {
        this._Placeholder = newSetting
        this.rerender()
      }
    }

  /**** readonly ****/

    protected _readonly:boolean = false

    public get readonly ():boolean { return this._readonly }
    public set readonly (newSetting:boolean) {
      allowBoolean('readonly setting',newSetting)
      if (this._readonly !== newSetting) {
        this._readonly = newSetting
        this.rerender()
      }
    }

  /**** minLength ****/

    protected _minLength:number|undefined

    public get minLength ():number|undefined { return this._minLength }
    public set minLength (newSetting:number|undefined) {
      allowOrdinal('minimal length',newSetting)
      if (this._minLength !== newSetting) {
        this._minLength = newSetting
        this.rerender()
      }
    }

  /**** maxLength ****/

    protected _maxLength:number|undefined

    public get maxLength ():number|undefined { return this._maxLength }
    public set maxLength (newSetting:number|undefined) {
      allowOrdinal('maximal length',newSetting)
      if (this._maxLength !== newSetting) {
        this._maxLength = newSetting
        this.rerender()
      }
    }

  /**** Pattern ****/

    protected _Pattern:WAT_Textline|undefined

    public get Pattern ():WAT_Textline|undefined { return this._Pattern }
    public set Pattern (newSetting:WAT_Textline|undefined) {
      allowTextline('input pattern',newSetting)
      if (this._Pattern !== newSetting) {
        this._Pattern = newSetting
        this.rerender()
      }
    }


  /**** _serializeConfigurationInto ****/

    protected _serializeConfigurationInto (Serialization:Serializable):void {
      super._serializeConfigurationInto(Serialization)

      ;[
        'Placeholder','readonly','minLength','maxLength','Pattern',
      ].forEach((Name:string) => this._serializePropertyInto(Name,Serialization))
    }

  /**** _deserializeConfigurationFrom ****/

    protected _deserializeConfigurationFrom (Serialization:Serializable):void {
      super._deserializeConfigurationFrom(Serialization)

      this._Placeholder = acceptableOptionalTextline(Serialization.Placeholder)
      this._readonly    = acceptableBoolean         (Serialization.readonly, false)
      this._minLength   = acceptableOptionalOrdinal (Serialization.minLength)
      this._maxLength   = acceptableOptionalOrdinal (Serialization.maxLength)
      this._Pattern     = acceptableOptionalTextline(Serialization.Pattern)
    }

  /**** Renderer ****/

    protected _Renderer = () => {
      const { Value, Enabling } = this

    /**** handle external changes ****/

      const shownValue   = useRef('')
      const InputElement = useRef(null)

      let ValueToShow:string = acceptableTextline(Value,'')
      if (document.activeElement === InputElement.current) {
        ValueToShow = shownValue.current
      } else {
        shownValue.current = ValueToShow
      }

      const _onInput = useCallback((Event:any) => {
        if (Enabling === false) { return consumingEvent(Event) }

        shownValue.current = this.Value = Event.target.value
        if (this._onInput != null) { this._onInput_(Event) }         // no typo!
      },[ Enabling ])

      const _onBlur = useCallback((Event:any) => {
        this.rerender()
        if (this._onBlur != null) { this._onBlur_(Event) }           // no typo!
      })

    /**** process any other parameters ****/

      const Placeholder = acceptableOptionalTextline(this._Placeholder)
      const readonly    = acceptableOptionalBoolean (this._readonly)
      const minLength   = acceptableOptionalOrdinal (this._minLength)
      const maxLength   = acceptableOptionalOrdinal (this._maxLength)
      const Pattern     = acceptableOptionalTextline(this._Pattern)

    /**** actual rendering ****/

      return html`<input type="password" class="WAT Content PasswordInput"
        value=${ValueToShow} minlength=${minLength} maxlength=${maxLength}
        readOnly=${readonly} placeholder=${Placeholder}
        pattern=${Pattern}
        disabled=${Enabling === false} onInput=${_onInput} onBlur=${_onBlur}
      />`
    }
  }
  builtInWidgetTypes['PasswordInput'] = WAT_PasswordInput

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
  `)

/**** NumberInput ****/

  export class WAT_NumberInput extends WAT_Widget {
    public constructor (Page:WAT_Page) { super(Page) }

    public get Type ():string  { return 'NumberInput' }
    public set Type (_:string) { throwReadOnlyError('Type') }

  /**** Placeholder ****/

    protected _Placeholder:WAT_Textline|undefined

    public get Placeholder ():WAT_Textline|undefined { return this._Placeholder }
    public set Placeholder (newSetting:WAT_Textline|undefined) {
      allowTextline('placeholder',newSetting)
      if (this._Placeholder !== newSetting) {
        this._Placeholder = newSetting
        this.rerender()
      }
    }

  /**** readonly ****/

    protected _readonly:boolean = false

    public get readonly ():boolean { return this._readonly }
    public set readonly (newSetting:boolean) {
      allowBoolean('readonly setting',newSetting)
      if (this._readonly !== newSetting) {
        this._readonly = newSetting
        this.rerender()
      }
    }

  /**** Minimum ****/

    protected _Minimum:number|undefined

    public get Minimum ():number|undefined { return this._Minimum }
    public set Minimum (newSetting:number|undefined) {
      allowNumber('minimal value',newSetting)
      if (this._Minimum !== newSetting) {
        this._Minimum = newSetting
        this.rerender()
      }
    }

  /**** Stepping ****/

    protected _Stepping:number|undefined

    public get Stepping ():number|undefined { return this._Stepping }
    public set Stepping (newSetting:number|undefined) {
      allowNumberInRange('stepping',newSetting, 0,Infinity, true,false)
      if (this._Stepping !== newSetting) {
        this._Stepping = newSetting
        this.rerender()
      }
    }

  /**** Maximum ****/

    protected _Maximum:number|undefined

    public get Maximum ():number|undefined { return this._Maximum }
    public set Maximum (newSetting:number|undefined) {
      allowNumber('maximal value',newSetting)
      if (this._Maximum !== newSetting) {
        this._Maximum = newSetting
        this.rerender()
      }
    }

  /**** Suggestions ****/

    protected _Suggestions:number[]|undefined

    public get Suggestions ():number[]|undefined {
      return (this._Suggestions == null ? this._Suggestions : this._Suggestions.slice())
    }
    public set Suggestions (newSetting:number[]|undefined) {
      allowListSatisfying('suggestion list',newSetting,ValueIsNumber)
      if (ValuesDiffer(this._Suggestions,newSetting)) {
        this._Suggestions = (newSetting == null ? newSetting : newSetting.slice())
        this.rerender()
      }
    }

  /**** _serializeConfigurationInto ****/

    protected _serializeConfigurationInto (Serialization:Serializable):void {
      super._serializeConfigurationInto(Serialization)

      ;[
        'Placeholder','readonly','Minimum','Stepping','Maximum','Suggestions'
      ].forEach((Name:string) => this._serializePropertyInto(Name,Serialization))
    }

  /**** _deserializeConfigurationFrom ****/

    protected _deserializeConfigurationFrom (Serialization:Serializable):void {
      super._deserializeConfigurationFrom(Serialization)

      this._Placeholder = acceptableOptionalTextline(Serialization.Placeholder)
      this._readonly    = acceptableBoolean         (Serialization.readonly, false)
      this._Minimum     = acceptableOptionalNumber  (Serialization.Minimum)
      this._Stepping    = acceptableOptionalNumberInRange(Serialization.Stepping,undefined, 0)
      this._Maximum     = acceptableOptionalNumber  (Serialization.Maximum)

      this._Suggestions = acceptableOptionalListSatisfying(
        Serialization.Suggestions, undefined, ValueIsNumber
      )
    }

  /**** Renderer ****/

    protected _Renderer = () => {
      const { Value, Enabling } = this

    /**** handle external changes ****/

      const shownValue   = useRef('')
      const InputElement = useRef(null)

      let ValueToShow:number = acceptableNumber(
        ValueIsString(Value) ? parseFloat(Value as string) : Value, 0
      )
      if (document.activeElement === InputElement.current) {
        ValueToShow = shownValue.current
      } else {
        shownValue.current = ValueToShow
      }

      const _onInput = useCallback((Event:any) => {
        if (Enabling === false) { return consumingEvent(Event) }

        shownValue.current = this.Value = parseFloat(Event.target.value)
        if (this._onInput != null) { this._onInput_(Event) }         // no typo!
      },[ Enabling ])

      const _onBlur = useCallback((Event:any) => {
        this.rerender()
        if (this._onBlur != null) { this._onBlur_(Event) }           // no typo!
      })

    /**** process any other parameters ****/

      const Placeholder = acceptableOptionalTextline(this._Placeholder)
      const readonly    = acceptableOptionalBoolean (this._readonly)
      const Minimum     = acceptableOptionalNumber  (this._Minimum)
      const Stepping    = acceptableOptionalNumberInRange(this._Stepping,undefined, 0)
      const Maximum     = acceptableOptionalNumber  (this._Maximum)

      const Suggestions = acceptableOptionalListSatisfying(
        this._Suggestions, undefined, ValueIsNumber
      )

      let SuggestionList:any = '', SuggestionId
      if ((Suggestions != null) && (Suggestions.length > 0)) {
        SuggestionId = IdOfWidget(this) + '-Suggestions'

        SuggestionList = html`<datalist id=${SuggestionId}>
          ${Suggestions.map((Value:number) => html`<option value=${Value}></option>`)}
        </datalist>`
      }

    /**** actual rendering ****/

      return html`<input type="number" class="WAT Content NumberInput"
        value=${ValueToShow} min=${Minimum} max=${Maximum} step=${Stepping}
        readOnly=${readonly} placeholder=${Placeholder}
        disabled=${Enabling === false} onInput=${_onInput} onBlur=${_onBlur}
        list=${SuggestionId}
      />${SuggestionList}`
    }
  }
  builtInWidgetTypes['NumberInput'] = WAT_NumberInput

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
  `)

/**** PhoneNumberInput ****/

  export class WAT_PhoneNumberInput extends WAT_Widget {
    public constructor (Page:WAT_Page) { super(Page) }

    public get Type ():string  { return 'PhoneNumberInput' }
    public set Type (_:string) { throwReadOnlyError('Type') }

  /**** Placeholder ****/

    protected _Placeholder:WAT_Textline|undefined

    public get Placeholder ():WAT_Textline|undefined { return this._Placeholder }
    public set Placeholder (newSetting:WAT_Textline|undefined) {
      allowTextline('placeholder',newSetting)
      if (this._Placeholder !== newSetting) {
        this._Placeholder = newSetting
        this.rerender()
      }
    }

  /**** readonly ****/

    protected _readonly:boolean = false

    public get readonly ():boolean { return this._readonly }
    public set readonly (newSetting:boolean) {
      allowBoolean('readonly setting',newSetting)
      if (this._readonly !== newSetting) {
        this._readonly = newSetting
        this.rerender()
      }
    }

  /**** minLength ****/

    protected _minLength:number|undefined

    public get minLength ():number|undefined { return this._minLength }
    public set minLength (newSetting:number|undefined) {
      allowOrdinal('minimal length',newSetting)
      if (this._minLength !== newSetting) {
        this._minLength = newSetting
        this.rerender()
      }
    }

  /**** maxLength ****/

    protected _maxLength:number|undefined

    public get maxLength ():number|undefined { return this._maxLength }
    public set maxLength (newSetting:number|undefined) {
      allowOrdinal('maximal length',newSetting)
      if (this._maxLength !== newSetting) {
        this._maxLength = newSetting
        this.rerender()
      }
    }

  /**** Pattern ****/

    protected _Pattern:WAT_Textline|undefined

    public get Pattern ():WAT_Textline|undefined { return this._Pattern }
    public set Pattern (newSetting:WAT_Textline|undefined) {
      allowTextline('input pattern',newSetting)
      if (this._Pattern !== newSetting) {
        this._Pattern = newSetting
        this.rerender()
      }
    }

  /**** Suggestions ****/

    protected _Suggestions:string[]|undefined

    public get Suggestions ():string[]|undefined {
      return (this._Suggestions == null ? this._Suggestions : this._Suggestions.slice())
    }
    public set Suggestions (newSetting:string[]|undefined) {
      allowListSatisfying('suggestion list',newSetting,ValueIsPhoneNumber)
      if (ValuesDiffer(this._Suggestions,newSetting)) {
        this._Suggestions = (newSetting == null ? newSetting : newSetting.slice())
        this.rerender()
      }
    }

  /**** _serializeConfigurationInto ****/

    protected _serializeConfigurationInto (Serialization:Serializable):void {
      super._serializeConfigurationInto(Serialization)

      ;[
        'Placeholder','readonly','minLength','maxLength','Pattern','Suggestions'
      ].forEach((Name:string) => this._serializePropertyInto(Name,Serialization))
    }

  /**** _deserializeConfigurationFrom ****/

    protected _deserializeConfigurationFrom (Serialization:Serializable):void {
      super._deserializeConfigurationFrom(Serialization)

      this._Placeholder = acceptableOptionalTextline(Serialization.Placeholder)
      this._readonly    = acceptableBoolean         (Serialization.readonly, false)
      this._minLength   = acceptableOptionalOrdinal (Serialization.minLength)
      this._maxLength   = acceptableOptionalOrdinal (Serialization.maxLength)
      this._Pattern     = acceptableOptionalTextline(Serialization.Pattern)

      this._Suggestions = acceptableOptionalListSatisfying(
        Serialization.Suggestions, undefined, ValueIsPhoneNumber
      )
    }

  /**** Renderer ****/

    protected _Renderer = () => {
      const { Value, Enabling } = this

    /**** handle external changes ****/

      const shownValue   = useRef('')
      const InputElement = useRef(null)

      let ValueToShow:string = acceptablePhoneNumber(Value,'')
      if (document.activeElement === InputElement.current) {
        ValueToShow = shownValue.current
      } else {
        shownValue.current = ValueToShow
      }

      const _onInput = useCallback((Event:any) => {
        if (Enabling === false) { return consumingEvent(Event) }

        shownValue.current = this.Value = Event.target.value
        if (this._onInput != null) { this._onInput_(Event) }         // no typo!
      },[ Enabling ])

      const _onBlur = useCallback((Event:any) => {
        this.rerender()
        if (this._onBlur != null) { this._onBlur_(Event) }           // no typo!
      })

    /**** process any other parameters ****/

      const Placeholder = acceptableOptionalTextline(this._Placeholder)
      const readonly    = acceptableOptionalBoolean (this._readonly)
      const minLength   = acceptableOptionalOrdinal (this._minLength)
      const maxLength   = acceptableOptionalOrdinal (this._maxLength)
      const Pattern     = acceptableOptionalTextline(this._Pattern)

      const Suggestions = acceptableOptionalListSatisfying(
        this._Suggestions, undefined, ValueIsPhoneNumber
      )

      let SuggestionList:any = '', SuggestionId
      if ((Suggestions != null) && (Suggestions.length > 0)) {
        SuggestionId = IdOfWidget(this) + '-Suggestions'

        SuggestionList = html`<datalist id=${SuggestionId}>
          ${Suggestions.map((Value:string) => html`<option value=${Value}></option>`)}
        </datalist>`
      }

    /**** actual rendering ****/

      return html`<input type="tel" class="WAT Content PhoneNumberInput"
        value=${ValueToShow} minlength=${minLength} maxlength=${maxLength}
        readOnly=${readonly} placeholder=${Placeholder}
        pattern=${Pattern}
        disabled=${Enabling == false} onInput=${_onInput} onBlur=${_onBlur}
        list=${SuggestionId}
      />${SuggestionList}`
    }
  }
  builtInWidgetTypes['PhoneNumberInput'] = WAT_PhoneNumberInput

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
  `)

/**** EMailAddressInput ****/

  export class WAT_EMailAddressInput extends WAT_Widget {
    public constructor (Page:WAT_Page) { super(Page) }

    public get Type ():string  { return 'EMailAddressInput' }
    public set Type (_:string) { throwReadOnlyError('Type') }

  /**** Placeholder ****/

    protected _Placeholder:WAT_Textline|undefined

    public get Placeholder ():WAT_Textline|undefined { return this._Placeholder }
    public set Placeholder (newSetting:WAT_Textline|undefined) {
      allowTextline('placeholder',newSetting)
      if (this._Placeholder !== newSetting) {
        this._Placeholder = newSetting
        this.rerender()
      }
    }

  /**** readonly ****/

    protected _readonly:boolean = false

    public get readonly ():boolean { return this._readonly }
    public set readonly (newSetting:boolean) {
      allowBoolean('readonly setting',newSetting)
      if (this._readonly !== newSetting) {
        this._readonly = newSetting
        this.rerender()
      }
    }

  /**** minLength ****/

    protected _minLength:number|undefined

    public get minLength ():number|undefined { return this._minLength }
    public set minLength (newSetting:number|undefined) {
      allowOrdinal('minimal length',newSetting)
      if (this._minLength !== newSetting) {
        this._minLength = newSetting
        this.rerender()
      }
    }

  /**** maxLength ****/

    protected _maxLength:number|undefined

    public get maxLength ():number|undefined { return this._maxLength }
    public set maxLength (newSetting:number|undefined) {
      allowOrdinal('maximal length',newSetting)
      if (this._maxLength !== newSetting) {
        this._maxLength = newSetting
        this.rerender()
      }
    }

  /**** Pattern ****/

    protected _Pattern:WAT_Textline|undefined

    public get Pattern ():WAT_Textline|undefined { return this._Pattern }
    public set Pattern (newSetting:WAT_Textline|undefined) {
      allowTextline('input pattern',newSetting)
      if (this._Pattern !== newSetting) {
        this._Pattern = newSetting
        this.rerender()
      }
    }

  /**** Suggestions ****/

    protected _Suggestions:string[]|undefined

    public get Suggestions ():string[]|undefined {
      return (this._Suggestions == null ? this._Suggestions : this._Suggestions.slice())
    }
    public set Suggestions (newSetting:string[]|undefined) {
      allowListSatisfying('suggestion list',newSetting,ValueIsEMailAddress)
      if (ValuesDiffer(this._Suggestions,newSetting)) {
        this._Suggestions = (newSetting == null ? newSetting : newSetting.slice())
        this.rerender()
      }
    }

  /**** _serializeConfigurationInto ****/

    protected _serializeConfigurationInto (Serialization:Serializable):void {
      super._serializeConfigurationInto(Serialization)

      ;[
        'Placeholder','readonly','minLength','maxLength','Pattern','Suggestions'
      ].forEach((Name:string) => this._serializePropertyInto(Name,Serialization))
    }

  /**** _deserializeConfigurationFrom ****/

    protected _deserializeConfigurationFrom (Serialization:Serializable):void {
      super._deserializeConfigurationFrom(Serialization)

      this._Placeholder = acceptableOptionalTextline(Serialization.Placeholder)
      this._readonly    = acceptableBoolean         (Serialization.readonly, false)
      this._minLength   = acceptableOptionalOrdinal (Serialization.minLength)
      this._maxLength   = acceptableOptionalOrdinal (Serialization.maxLength)
      this._Pattern     = acceptableOptionalTextline(Serialization.Pattern)

      this._Suggestions = acceptableOptionalListSatisfying(
        Serialization.Suggestions, undefined, ValueIsEMailAddress
      )
    }

  /**** Renderer ****/

    protected _Renderer = () => {
      const { Value, Enabling } = this

    /**** handle external changes ****/

      const shownValue   = useRef('')
      const InputElement = useRef(null)

      let ValueToShow:string = acceptableEMailAddress(Value,'')
      if (document.activeElement === InputElement.current) {
        ValueToShow = shownValue.current
      } else {
        shownValue.current = ValueToShow
      }

      const _onInput = useCallback((Event:any) => {
        if (Enabling === false) { return consumingEvent(Event) }

        shownValue.current = this.Value = Event.target.value
        if (this._onInput != null) { this._onInput_(Event) }         // no typo!
      },[ Enabling ])

      const _onBlur = useCallback((Event:any) => {
        this.rerender()
        if (this._onBlur != null) { this._onBlur_(Event) }           // no typo!
      })

    /**** process any other parameters ****/

      const Placeholder = acceptableOptionalTextline(this._Placeholder)
      const readonly    = acceptableOptionalBoolean (this._readonly)
      const minLength   = acceptableOptionalOrdinal (this._minLength)
      const maxLength   = acceptableOptionalOrdinal (this._maxLength)
      const Pattern     = acceptableOptionalTextline(this._Pattern)

      const Suggestions = acceptableOptionalListSatisfying(
        this._Suggestions, undefined, ValueIsEMailAddress
      )

      let SuggestionList:any = '', SuggestionId
      if ((Suggestions != null) && (Suggestions.length > 0)) {
        SuggestionId = IdOfWidget(this) + '-Suggestions'

        SuggestionList = html`<datalist id=${SuggestionId}>
          ${Suggestions.map((Value:string) => html`<option value=${Value}></option>`)}
        </datalist>`
      }

    /**** actual rendering ****/

      return html`<input type="email" class="WAT Content EMailAddressInput"
        value=${ValueToShow} minlength=${minLength} maxlength=${maxLength}
        readOnly=${readonly} placeholder=${Placeholder}
        pattern=${Pattern}
        disabled=${Enabling === false} onInput=${_onInput} onBlur=${_onBlur}
        list=${SuggestionId}
      />${SuggestionList}`
    }
  }
  builtInWidgetTypes['EMailAddressInput'] = WAT_EMailAddressInput

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
  `)

/**** URLInput ****/

  export class WAT_URLInput extends WAT_Widget {
    public constructor (Page:WAT_Page) { super(Page) }

    public get Type ():string  { return 'URLInput' }
    public set Type (_:string) { throwReadOnlyError('Type') }

  /**** Placeholder ****/

    protected _Placeholder:WAT_Textline|undefined

    public get Placeholder ():WAT_Textline|undefined { return this._Placeholder }
    public set Placeholder (newSetting:WAT_Textline|undefined) {
      allowTextline('placeholder',newSetting)
      if (this._Placeholder !== newSetting) {
        this._Placeholder = newSetting
        this.rerender()
      }
    }

  /**** readonly ****/

    protected _readonly:boolean = false

    public get readonly ():boolean { return this._readonly }
    public set readonly (newSetting:boolean) {
      allowBoolean('readonly setting',newSetting)
      if (this._readonly !== newSetting) {
        this._readonly = newSetting
        this.rerender()
      }
    }

  /**** minLength ****/

    protected _minLength:number|undefined

    public get minLength ():number|undefined { return this._minLength }
    public set minLength (newSetting:number|undefined) {
      allowOrdinal('minimal length',newSetting)
      if (this._minLength !== newSetting) {
        this._minLength = newSetting
        this.rerender()
      }
    }

  /**** maxLength ****/

    protected _maxLength:number|undefined

    public get maxLength ():number|undefined { return this._maxLength }
    public set maxLength (newSetting:number|undefined) {
      allowOrdinal('maximal length',newSetting)
      if (this._maxLength !== newSetting) {
        this._maxLength = newSetting
        this.rerender()
      }
    }

  /**** Pattern ****/

    protected _Pattern:WAT_Textline|undefined

    public get Pattern ():WAT_Textline|undefined { return this._Pattern }
    public set Pattern (newSetting:WAT_Textline|undefined) {
      allowTextline('input pattern',newSetting)
      if (this._Pattern !== newSetting) {
        this._Pattern = newSetting
        this.rerender()
      }
    }

  /**** Suggestions ****/

    protected _Suggestions:string[]|undefined

    public get Suggestions ():string[]|undefined {
      return (this._Suggestions == null ? this._Suggestions : this._Suggestions.slice())
    }
    public set Suggestions (newSetting:string[]|undefined) {
      allowListSatisfying('suggestion list',newSetting,ValueIsURL)
      if (ValuesDiffer(this._Suggestions,newSetting)) {
        this._Suggestions = (newSetting == null ? newSetting : newSetting.slice())
        this.rerender()
      }
    }

  /**** _serializeConfigurationInto ****/

    protected _serializeConfigurationInto (Serialization:Serializable):void {
      super._serializeConfigurationInto(Serialization)

      ;[
        'Placeholder','readonly','minLength','maxLength','Pattern','Suggestions'
      ].forEach((Name:string) => this._serializePropertyInto(Name,Serialization))
    }

  /**** _deserializeConfigurationFrom ****/

    protected _deserializeConfigurationFrom (Serialization:Serializable):void {
      super._deserializeConfigurationFrom(Serialization)

      this._Placeholder = acceptableOptionalTextline(Serialization.Placeholder)
      this._readonly    = acceptableBoolean         (Serialization.readonly, false)
      this._minLength   = acceptableOptionalOrdinal (Serialization.minLength)
      this._maxLength   = acceptableOptionalOrdinal (Serialization.maxLength)
      this._Pattern     = acceptableOptionalTextline(Serialization.Pattern)

      this._Suggestions = acceptableOptionalListSatisfying(
        Serialization.Suggestions, undefined, ValueIsURL
      )
    }

  /**** Renderer ****/

    protected _Renderer = () => {
      const { Value, Enabling } = this

    /**** handle external changes ****/

      const shownValue   = useRef('')
      const InputElement = useRef(null)

      let ValueToShow:string = acceptableURL(Value,'')
      if (document.activeElement === InputElement.current) {
        ValueToShow = shownValue.current
      } else {
        shownValue.current = ValueToShow
      }

      const _onInput = useCallback((Event:any) => {
        if (Enabling === false) { return consumingEvent(Event) }

        shownValue.current = this.Value = Event.target.value
        if (this._onInput != null) { this._onInput_(Event) }         // no typo!
      },[ Enabling ])

      const _onBlur = useCallback((Event:any) => {
        this.rerender()
        if (this._onBlur != null) { this._onBlur_(Event) }           // no typo!
      })

    /**** process any other parameters ****/

      const Placeholder = acceptableOptionalTextline(this._Placeholder)
      const readonly    = acceptableOptionalBoolean (this._readonly)
      const minLength   = acceptableOptionalOrdinal (this._minLength)
      const maxLength   = acceptableOptionalOrdinal (this._maxLength)
      const Pattern     = acceptableOptionalTextline(this._Pattern)

      const Suggestions = acceptableOptionalListSatisfying(
        this._Suggestions, undefined, ValueIsURL
      )

      let SuggestionList:any = '', SuggestionId
      if ((Suggestions != null) && (Suggestions.length > 0)) {
        SuggestionId = IdOfWidget(this) + '-Suggestions'

        SuggestionList = html`<datalist id=${SuggestionId}>
          ${Suggestions.map((Value:string) => html`<option value=${Value}></option>`)}
        </datalist>`
      }

    /**** actual rendering ****/

      return html`<input type="url" class="WAT Content URLInput"
        value=${ValueToShow} minlength=${minLength} maxlength=${maxLength}
        readOnly=${readonly} placeholder=${Placeholder}
        pattern=${Pattern}
        disabled=${Enabling === false} onInput=${_onInput} onBlur=${_onBlur}
        list=${SuggestionId}
      />${SuggestionList}`
    }
  }
  builtInWidgetTypes['URLInput'] = WAT_URLInput

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
  `)

/**** TimeInput ****/

  export const WAT_TimePattern = '\\d{2}:\\d{2}'
  export const WAT_TimeRegExp  = /\d{2}:\d{2}/

  export function WAT_TimeMatcher (Value:any):boolean {
    return ValueIsStringMatching(Value,WAT_TimeRegExp)
  }

  export class WAT_TimeInput extends WAT_Widget {
    public constructor (Page:WAT_Page) { super(Page) }

    public get Type ():string  { return 'TimeInput' }
    public set Type (_:string) { throwReadOnlyError('Type') }

  /**** readonly ****/

    protected _readonly:boolean = false

    public get readonly ():boolean { return this._readonly }
    public set readonly (newSetting:boolean) {
      allowBoolean('readonly setting',newSetting)
      if (this._readonly !== newSetting) {
        this._readonly = newSetting
        this.rerender()
      }
    }

  /**** withSeconds ****/

    protected _withSeconds:boolean = false

    public get withSeconds ():boolean { return this._withSeconds }
    public set withSeconds (newSetting:boolean) {
      allowBoolean('seconds display setting',newSetting)
      if (this._withSeconds !== newSetting) {
        this._withSeconds = newSetting
        this.rerender()
      }
    }

  /**** Minimum ****/

    protected _Minimum:WAT_Textline|undefined

    public get Minimum ():WAT_Textline|undefined { return this._Minimum }
    public set Minimum (newSetting:WAT_Textline|undefined) {
      allowStringMatching('earliest time',newSetting,WAT_TimeRegExp)
      if (this._Minimum !== newSetting) {
        this._Minimum = newSetting
        this.rerender()
      }
    }

  /**** Maximum ****/

    protected _Maximum:WAT_Textline|undefined

    public get Maximum ():WAT_Textline|undefined { return this._Maximum }
    public set Maximum (newSetting:WAT_Textline|undefined) {
      allowStringMatching('latest time',newSetting,WAT_TimeRegExp)
      if (this._Maximum !== newSetting) {
        this._Maximum = newSetting
        this.rerender()
      }
    }

  /**** Suggestions ****/

    protected _Suggestions:string[]|undefined

    public get Suggestions ():string[]|undefined {
      return (this._Suggestions == null ? this._Suggestions : this._Suggestions.slice())
    }
    public set Suggestions (newSetting:string[]|undefined) {
      allowListSatisfying('suggestion list',newSetting,WAT_TimeMatcher)
      if (ValuesDiffer(this._Suggestions,newSetting)) {
        this._Suggestions = (newSetting == null ? newSetting : newSetting.slice())
        this.rerender()
      }
    }

  /**** _serializeConfigurationInto ****/

    protected _serializeConfigurationInto (Serialization:Serializable):void {
      super._serializeConfigurationInto(Serialization)

      ;[
        'readonly','withSeconds','Minimum','Maximum','Suggestions'
      ].forEach((Name:string) => this._serializePropertyInto(Name,Serialization))
    }

  /**** _deserializeConfigurationFrom ****/

    protected _deserializeConfigurationFrom (Serialization:Serializable):void {
      super._deserializeConfigurationFrom(Serialization)

      this._readonly    = acceptableBoolean               (Serialization.readonly,    false)
      this._withSeconds = acceptableBoolean               (Serialization.withSeconds, false)
      this._Minimum     = acceptableOptionalStringMatching(Serialization.Minimum, undefined, WAT_TimeRegExp)
      this._Maximum     = acceptableOptionalStringMatching(Serialization.Maximum, undefined, WAT_TimeRegExp)

      this._Suggestions = acceptableOptionalListSatisfying(
        Serialization.Suggestions, undefined, WAT_TimeMatcher
      )
    }

  /**** Renderer ****/

    protected _Renderer = () => {
      const { Value, Enabling } = this

    /**** handle external changes ****/

      const shownValue   = useRef('')
      const InputElement = useRef(null)

      let ValueToShow:string = acceptableStringMatching(Value,'',WAT_TimeRegExp)
      if (document.activeElement === InputElement.current) {
        ValueToShow = shownValue.current
      } else {
        shownValue.current = ValueToShow
      }

      const _onInput = useCallback((Event:any) => {
        if (Enabling === false) { return consumingEvent(Event) }

        shownValue.current = this.Value = Event.target.value
        if (this._onInput != null) { this._onInput_(Event) }         // no typo!
      },[ Enabling ])

      const _onBlur = useCallback((Event:any) => {
        this.rerender()
        if (this._onBlur != null) { this._onBlur_(Event) }           // no typo!
      })

    /**** process any other parameters ****/

      const readonly    = acceptableOptionalBoolean       (this._readonly)
      const withSeconds = acceptableOptionalBoolean       (this._withSeconds)
      const Minimum     = acceptableOptionalStringMatching(this._Minimum, undefined, WAT_TimeRegExp)
      const Maximum     = acceptableOptionalStringMatching(this._Maximum, undefined, WAT_TimeRegExp)

      const Suggestions = acceptableOptionalListSatisfying(
        this._Suggestions, undefined, WAT_TimeMatcher
      )

      let SuggestionList:any = '', SuggestionId
      if ((Suggestions != null) && (Suggestions.length > 0)) {
        SuggestionId = IdOfWidget(this) + '-Suggestions'

        SuggestionList = html`<datalist id=${SuggestionId}>
          ${Suggestions.map((Value:string) => html`<option value=${Value}></option>`)}
        </datalist>`
      }

    /**** actual rendering ****/

      return html`<input type="time" class="WAT Content TimeInput"
        value=${ValueToShow} min=${Minimum} max=${Maximum}
        step=${withSeconds ? 1 : 60}
        readOnly=${readonly} pattern=${WAT_TimePattern}
        disabled=${Enabling === false} onInput=${_onInput} onBlur=${_onBlur}
        list=${SuggestionId}
      />${SuggestionList}`
    }
  }
  builtInWidgetTypes['TimeInput'] = WAT_TimeInput

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
  `)

/**** DateTimeInput ****/

  export const WAT_DateTimePattern = '\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}'
  export const WAT_DateTimeRegExp  = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/

  export function WAT_DateTimeMatcher (Value:any):boolean {
    return ValueIsStringMatching(Value,WAT_DateTimeRegExp)
  }

  export class WAT_DateTimeInput extends WAT_Widget {
    public constructor (Page:WAT_Page) { super(Page) }

    public get Type ():string  { return 'DateTimeInput' }
    public set Type (_:string) { throwReadOnlyError('Type') }

  /**** readonly ****/

    protected _readonly:boolean = false

    public get readonly ():boolean { return this._readonly }
    public set readonly (newSetting:boolean) {
      allowBoolean('readonly setting',newSetting)
      if (this._readonly !== newSetting) {
        this._readonly = newSetting
        this.rerender()
      }
    }

  /**** withSeconds ****/

    protected _withSeconds:boolean = false

    public get withSeconds ():boolean { return this._withSeconds }
    public set withSeconds (newSetting:boolean) {
      allowBoolean('seconds display setting',newSetting)
      if (this._withSeconds !== newSetting) {
        this._withSeconds = newSetting
        this.rerender()
      }
    }

  /**** Minimum ****/

    protected _Minimum:WAT_Textline|undefined

    public get Minimum ():WAT_Textline|undefined { return this._Minimum }
    public set Minimum (newSetting:WAT_Textline|undefined) {
      allowStringMatching('earliest point in time',newSetting,WAT_DateTimeRegExp)
      if (this._Minimum !== newSetting) {
        this._Minimum = newSetting
        this.rerender()
      }
    }

  /**** Maximum ****/

    protected _Maximum:WAT_Textline|undefined

    public get Maximum ():WAT_Textline|undefined { return this._Maximum }
    public set Maximum (newSetting:WAT_Textline|undefined) {
      allowStringMatching('latest point in time',newSetting,WAT_DateTimeRegExp)
      if (this._Maximum !== newSetting) {
        this._Maximum = newSetting
        this.rerender()
      }
    }

  /**** Suggestions ****/

    protected _Suggestions:string[]|undefined

    public get Suggestions ():string[]|undefined {
      return (this._Suggestions == null ? this._Suggestions : this._Suggestions.slice())
    }
    public set Suggestions (newSetting:string[]|undefined) {
      allowListSatisfying('suggestion list',newSetting,WAT_DateTimeMatcher)
      if (ValuesDiffer(this._Suggestions,newSetting)) {
        this._Suggestions = (newSetting == null ? newSetting : newSetting.slice())
        this.rerender()
      }
    }

  /**** _serializeConfigurationInto ****/

    protected _serializeConfigurationInto (Serialization:Serializable):void {
      super._serializeConfigurationInto(Serialization)

      ;[
        'readonly','withSeconds','Minimum','Maximum','Suggestions'
      ].forEach((Name:string) => this._serializePropertyInto(Name,Serialization))
    }

  /**** _deserializeConfigurationFrom ****/

    protected _deserializeConfigurationFrom (Serialization:Serializable):void {
      super._deserializeConfigurationFrom(Serialization)

      this._readonly    = acceptableBoolean               (Serialization.readonly,    false)
      this._withSeconds = acceptableBoolean               (Serialization.withSeconds, false)
      this._Minimum     = acceptableOptionalStringMatching(Serialization.Minimum, undefined, WAT_DateTimeRegExp)
      this._Maximum     = acceptableOptionalStringMatching(Serialization.Maximum, undefined, WAT_DateTimeRegExp)

      this._Suggestions = acceptableOptionalListSatisfying(
        Serialization.Suggestions, undefined, WAT_DateTimeMatcher
      )
    }

  /**** Renderer ****/

    protected _Renderer = () => {
      const { Value, Enabling } = this

    /**** handle external changes ****/

      const shownValue   = useRef('')
      const InputElement = useRef(null)

      let ValueToShow:string = acceptableStringMatching(Value,'',WAT_DateTimeRegExp)
      if (document.activeElement === InputElement.current) {
        ValueToShow = shownValue.current
      } else {
        shownValue.current = ValueToShow
      }

      const _onInput = useCallback((Event:any) => {
        if (Enabling === false) { return consumingEvent(Event) }

        shownValue.current = this.Value = Event.target.value
        if (this._onInput != null) { this._onInput_(Event) }         // no typo!
      },[ Enabling ])

      const _onBlur = useCallback((Event:any) => {
        this.rerender()
        if (this._onBlur != null) { this._onBlur_(Event) }           // no typo!
      })

    /**** process any other parameters ****/

      const readonly    = acceptableOptionalBoolean       (this._readonly)
      const withSeconds = acceptableOptionalBoolean       (this._withSeconds)
      const Minimum     = acceptableOptionalStringMatching(this._Minimum, undefined, WAT_DateTimeRegExp)
      const Maximum     = acceptableOptionalStringMatching(this._Maximum, undefined, WAT_DateTimeRegExp)

      const Suggestions = acceptableOptionalListSatisfying(
        this._Suggestions, undefined, WAT_DateTimeMatcher
      )

      let SuggestionList:any = '', SuggestionId
      if ((Suggestions != null) && (Suggestions.length > 0)) {
        SuggestionId = IdOfWidget(this) + '-Suggestions'

        SuggestionList = html`<datalist id=${SuggestionId}>
          ${Suggestions.map((Value:string) => html`<option value=${Value}></option>`)}
        </datalist>`
      }

    /**** actual rendering ****/

      return html`<input type="datetime-local" class="WAT Content DateTimeInput"
        value=${ValueToShow} min=${Minimum} max=${Maximum}
        step=${withSeconds ? 1 : 60}
        readOnly=${readonly} pattern=${WAT_DateTimePattern}
        disabled=${Enabling === false} onInput=${_onInput} onBlur=${_onBlur}
        list=${SuggestionId}
      />${SuggestionList}`
    }
  }
  builtInWidgetTypes['DateTimeInput'] = WAT_DateTimeInput

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
  `)

/**** DateInput ****/

  export const WAT_DatePattern = '\\d{4}-\\d{2}-\\d{2}'
  export const WAT_DateRegExp  = /\d{4}-\d{2}-\d{2}/

  export function WAT_DateMatcher (Value:any):boolean {
    return ValueIsStringMatching(Value,WAT_DateRegExp)
  }

  export class WAT_DateInput extends WAT_Widget {
    public constructor (Page:WAT_Page) { super(Page) }

    public get Type ():string  { return 'DateInput' }
    public set Type (_:string) { throwReadOnlyError('Type') }

  /**** readonly ****/

    protected _readonly:boolean = false

    public get readonly ():boolean { return this._readonly }
    public set readonly (newSetting:boolean) {
      allowBoolean('readonly setting',newSetting)
      if (this._readonly !== newSetting) {
        this._readonly = newSetting
        this.rerender()
      }
    }

  /**** Minimum ****/

    protected _Minimum:WAT_Textline|undefined

    public get Minimum ():WAT_Textline|undefined { return this._Minimum }
    public set Minimum (newSetting:WAT_Textline|undefined) {
      allowStringMatching('earliest date',newSetting,WAT_DateRegExp)
      if (this._Minimum !== newSetting) {
        this._Minimum = newSetting
        this.rerender()
      }
    }

  /**** Maximum ****/

    protected _Maximum:WAT_Textline|undefined

    public get Maximum ():WAT_Textline|undefined { return this._Maximum }
    public set Maximum (newSetting:WAT_Textline|undefined) {
      allowStringMatching('latest date',newSetting,WAT_DateRegExp)
      if (this._Maximum !== newSetting) {
        this._Maximum = newSetting
        this.rerender()
      }
    }

  /**** Suggestions ****/

    protected _Suggestions:string[]|undefined

    public get Suggestions ():string[]|undefined {
      return (this._Suggestions == null ? this._Suggestions : this._Suggestions.slice())
    }
    public set Suggestions (newSetting:string[]|undefined) {
      allowListSatisfying('suggestion list',newSetting,WAT_DateMatcher)
      if (ValuesDiffer(this._Suggestions,newSetting)) {
        this._Suggestions = (newSetting == null ? newSetting : newSetting.slice())
        this.rerender()
      }
    }

  /**** _serializeConfigurationInto ****/

    protected _serializeConfigurationInto (Serialization:Serializable):void {
      super._serializeConfigurationInto(Serialization)

      ;[
        'readonly','withSeconds','Minimum','Maximum','Suggestions'
      ].forEach((Name:string) => this._serializePropertyInto(Name,Serialization))
    }

  /**** _deserializeConfigurationFrom ****/

    protected _deserializeConfigurationFrom (Serialization:Serializable):void {
      super._deserializeConfigurationFrom(Serialization)

      this._readonly    = acceptableBoolean               (Serialization.readonly,    false)
      this._Minimum     = acceptableOptionalStringMatching(Serialization.Minimum, undefined, WAT_DateRegExp)
      this._Maximum     = acceptableOptionalStringMatching(Serialization.Maximum, undefined, WAT_DateRegExp)

      this._Suggestions = acceptableOptionalListSatisfying(
        Serialization.Suggestions, undefined, WAT_DateMatcher
      )
    }

  /**** Renderer ****/

    protected _Renderer = () => {
      const { Value, Enabling } = this

    /**** handle external changes ****/

      const shownValue   = useRef('')
      const InputElement = useRef(null)

      let ValueToShow:string = acceptableStringMatching(Value,'',WAT_DateRegExp)
      if (document.activeElement === InputElement.current) {
        ValueToShow = shownValue.current
      } else {
        shownValue.current = ValueToShow
      }

      const _onInput = useCallback((Event:any) => {
        if (Enabling === false) { return consumingEvent(Event) }

        shownValue.current = this.Value = Event.target.value
        if (this._onInput != null) { this._onInput_(Event) }         // no typo!
      },[ Enabling ])

      const _onBlur = useCallback((Event:any) => {
        this.rerender()
        if (this._onBlur != null) { this._onBlur_(Event) }           // no typo!
      })

    /**** process any other parameters ****/

      const readonly = acceptableOptionalBoolean       (this._readonly)
      const Minimum  = acceptableOptionalStringMatching(this._Minimum, undefined, WAT_DateRegExp)
      const Maximum  = acceptableOptionalStringMatching(this._Maximum, undefined, WAT_DateRegExp)

      const Suggestions = acceptableOptionalListSatisfying(
        this._Suggestions, undefined, WAT_DateMatcher
      )

      let SuggestionList:any = '', SuggestionId
      if ((Suggestions != null) && (Suggestions.length > 0)) {
        SuggestionId = IdOfWidget(this) + '-Suggestions'

        SuggestionList = html`<datalist id=${SuggestionId}>
          ${Suggestions.map((Value:string) => html`<option value=${Value}></option>`)}
        </datalist>`
      }

    /**** actual rendering ****/

      return html`<input type="date" class="WAT Content DateInput"
        value=${ValueToShow} min=${Minimum} max=${Maximum}
        readOnly=${readonly} pattern=${WAT_DatePattern}
        disabled=${Enabling === false} onInput=${_onInput} onBlur=${_onBlur}
        list=${SuggestionId}
      />${SuggestionList}`
    }
  }
  builtInWidgetTypes['DateInput'] = WAT_DateInput

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
  `)

/**** WeekInput ****/

  export const WAT_WeekPattern = '\\d{4}-W\\d{2}'
  export const WAT_WeekRegExp  = /\d{4}-W\d{2}/

  export function WAT_WeekMatcher (Value:any):boolean {
    return ValueIsStringMatching(Value,WAT_WeekRegExp)
  }

  export class WAT_WeekInput extends WAT_Widget {
    public constructor (Page:WAT_Page) { super(Page) }

    public get Type ():string  { return 'WeekInput' }
    public set Type (_:string) { throwReadOnlyError('Type') }

  /**** readonly ****/

    protected _readonly:boolean = false

    public get readonly ():boolean { return this._readonly }
    public set readonly (newSetting:boolean) {
      allowBoolean('readonly setting',newSetting)
      if (this._readonly !== newSetting) {
        this._readonly = newSetting
        this.rerender()
      }
    }

  /**** Minimum ****/

    protected _Minimum:WAT_Textline|undefined

    public get Minimum ():WAT_Textline|undefined { return this._Minimum }
    public set Minimum (newSetting:WAT_Textline|undefined) {
      allowStringMatching('earliest week',newSetting,WAT_WeekRegExp)
      if (this._Minimum !== newSetting) {
        this._Minimum = newSetting
        this.rerender()
      }
    }

  /**** Maximum ****/

    protected _Maximum:WAT_Textline|undefined

    public get Maximum ():WAT_Textline|undefined { return this._Maximum }
    public set Maximum (newSetting:WAT_Textline|undefined) {
      allowStringMatching('latest week',newSetting,WAT_WeekRegExp)
      if (this._Maximum !== newSetting) {
        this._Maximum = newSetting
        this.rerender()
      }
    }

  /**** Suggestions ****/

    protected _Suggestions:string[]|undefined

    public get Suggestions ():string[]|undefined {
      return (this._Suggestions == null ? this._Suggestions : this._Suggestions.slice())
    }
    public set Suggestions (newSetting:string[]|undefined) {
      allowListSatisfying('suggestion list',newSetting,WAT_WeekMatcher)
      if (ValuesDiffer(this._Suggestions,newSetting)) {
        this._Suggestions = (newSetting == null ? newSetting : newSetting.slice())
        this.rerender()
      }
    }

  /**** _serializeConfigurationInto ****/

    protected _serializeConfigurationInto (Serialization:Serializable):void {
      super._serializeConfigurationInto(Serialization)

      ;[
        'readonly','withSeconds','Minimum','Maximum','Suggestions'
      ].forEach((Name:string) => this._serializePropertyInto(Name,Serialization))
    }

  /**** _deserializeConfigurationFrom ****/

    protected _deserializeConfigurationFrom (Serialization:Serializable):void {
      super._deserializeConfigurationFrom(Serialization)

      this._readonly    = acceptableBoolean               (Serialization.readonly,    false)
      this._Minimum     = acceptableOptionalStringMatching(Serialization.Minimum, undefined, WAT_WeekRegExp)
      this._Maximum     = acceptableOptionalStringMatching(Serialization.Maximum, undefined, WAT_WeekRegExp)

      this._Suggestions = acceptableOptionalListSatisfying(
        Serialization.Suggestions, undefined, WAT_WeekMatcher
      )
    }

  /**** Renderer ****/

    protected _Renderer = () => {
      const { Value, Enabling } = this

    /**** handle external changes ****/

      const shownValue   = useRef('')
      const InputElement = useRef(null)

      let ValueToShow:string = acceptableStringMatching(Value,'',WAT_WeekRegExp)
      if (document.activeElement === InputElement.current) {
        ValueToShow = shownValue.current
      } else {
        shownValue.current = ValueToShow
      }

      const _onInput = useCallback((Event:any) => {
        if (Enabling === false) { return consumingEvent(Event) }

        shownValue.current = this.Value = Event.target.value
        if (this._onInput != null) { this._onInput_(Event) }         // no typo!
      },[ Enabling ])

      const _onBlur = useCallback((Event:any) => {
        this.rerender()
        if (this._onBlur != null) { this._onBlur_(Event) }           // no typo!
      })

    /**** process any other parameters ****/

      const readonly = acceptableOptionalBoolean       (this._readonly)
      const Minimum  = acceptableOptionalStringMatching(this._Minimum, undefined, WAT_WeekRegExp)
      const Maximum  = acceptableOptionalStringMatching(this._Maximum, undefined, WAT_WeekRegExp)

      const Suggestions = acceptableOptionalListSatisfying(
        this._Suggestions, undefined, WAT_WeekMatcher
      )

      let SuggestionList:any = '', SuggestionId
      if ((Suggestions != null) && (Suggestions.length > 0)) {
        SuggestionId = IdOfWidget(this) + '-Suggestions'

        SuggestionList = html`<datalist id=${SuggestionId}>
          ${Suggestions.map((Value:string) => html`<option value=${Value}></option>`)}
        </datalist>`
      }

    /**** actual rendering ****/

      return html`<input type="week" class="WAT Content WeekInput"
        value=${Value} min=${Minimum} max=${Maximum}
        readOnly=${readonly} pattern=${WAT_WeekPattern}
        disabled=${Enabling === false} onInput=${_onInput} onBlur=${_onBlur}
        list=${SuggestionId}
      />${SuggestionList}`
    }
  }
  builtInWidgetTypes['WeekInput'] = WAT_WeekInput

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
  `)

/**** MonthInput ****/

  export const WAT_MonthPattern = '\\d{4}-\\d{2}'
  export const WAT_MonthRegExp  = /\d{4}-\d{2}/

  export function WAT_MonthMatcher (Value:any):boolean {
    return ValueIsStringMatching(Value,WAT_MonthRegExp)
  }

  export class WAT_MonthInput extends WAT_Widget {
    public constructor (Page:WAT_Page) { super(Page) }

    public get Type ():string  { return 'MonthInput' }
    public set Type (_:string) { throwReadOnlyError('Type') }

  /**** readonly ****/

    protected _readonly:boolean = false

    public get readonly ():boolean { return this._readonly }
    public set readonly (newSetting:boolean) {
      allowBoolean('readonly setting',newSetting)
      if (this._readonly !== newSetting) {
        this._readonly = newSetting
        this.rerender()
      }
    }

  /**** Minimum ****/

    protected _Minimum:WAT_Textline|undefined

    public get Minimum ():WAT_Textline|undefined { return this._Minimum }
    public set Minimum (newSetting:WAT_Textline|undefined) {
      allowStringMatching('earliest month',newSetting,WAT_MonthRegExp)
      if (this._Minimum !== newSetting) {
        this._Minimum = newSetting
        this.rerender()
      }
    }

  /**** Maximum ****/

    protected _Maximum:WAT_Textline|undefined

    public get Maximum ():WAT_Textline|undefined { return this._Maximum }
    public set Maximum (newSetting:WAT_Textline|undefined) {
      allowStringMatching('latest month',newSetting,WAT_MonthRegExp)
      if (this._Maximum !== newSetting) {
        this._Maximum = newSetting
        this.rerender()
      }
    }

  /**** Suggestions ****/

    protected _Suggestions:string[]|undefined

    public get Suggestions ():string[]|undefined {
      return (this._Suggestions == null ? this._Suggestions : this._Suggestions.slice())
    }
    public set Suggestions (newSetting:string[]|undefined) {
      allowListSatisfying('suggestion list',newSetting,WAT_MonthMatcher)
      if (ValuesDiffer(this._Suggestions,newSetting)) {
        this._Suggestions = (newSetting == null ? newSetting : newSetting.slice())
        this.rerender()
      }
    }

  /**** _serializeConfigurationInto ****/

    protected _serializeConfigurationInto (Serialization:Serializable):void {
      super._serializeConfigurationInto(Serialization)

      ;[
        'readonly','withSeconds','Minimum','Maximum','Suggestions'
      ].forEach((Name:string) => this._serializePropertyInto(Name,Serialization))
    }

  /**** _deserializeConfigurationFrom ****/

    protected _deserializeConfigurationFrom (Serialization:Serializable):void {
      super._deserializeConfigurationFrom(Serialization)

      this._readonly    = acceptableBoolean               (Serialization.readonly,    false)
      this._Minimum     = acceptableOptionalStringMatching(Serialization.Minimum, undefined, WAT_MonthRegExp)
      this._Maximum     = acceptableOptionalStringMatching(Serialization.Maximum, undefined, WAT_MonthRegExp)

      this._Suggestions = acceptableOptionalListSatisfying(
        Serialization.Suggestions, undefined, WAT_MonthMatcher
      )
    }

  /**** Renderer ****/

    protected _Renderer = () => {
      const { Value, Enabling } = this

    /**** handle external changes ****/

      const shownValue   = useRef('')
      const InputElement = useRef(null)

      let ValueToShow:string = acceptableStringMatching(Value,'',WAT_MonthRegExp)
      if (document.activeElement === InputElement.current) {
        ValueToShow = shownValue.current
      } else {
        shownValue.current = ValueToShow
      }

      const _onInput = useCallback((Event:any) => {
        if (Enabling === false) { return consumingEvent(Event) }

        shownValue.current = this.Value = Event.target.value
        if (this._onInput != null) { this._onInput_(Event) }         // no typo!
      },[ Enabling ])

      const _onBlur = useCallback((Event:any) => {
        this.rerender()
        if (this._onBlur != null) { this._onBlur_(Event) }           // no typo!
      })

    /**** process any other parameters ****/

      const readonly = acceptableOptionalBoolean       (this._readonly)
      const Minimum  = acceptableOptionalStringMatching(this._Minimum, undefined, WAT_MonthRegExp)
      const Maximum  = acceptableOptionalStringMatching(this._Maximum, undefined, WAT_MonthRegExp)

      const Suggestions = acceptableOptionalListSatisfying(
        this._Suggestions, undefined, WAT_MonthMatcher
      )

      let SuggestionList:any = '', SuggestionId
      if ((Suggestions != null) && (Suggestions.length > 0)) {
        SuggestionId = IdOfWidget(this) + '-Suggestions'

        SuggestionList = html`<datalist id=${SuggestionId}>
          ${Suggestions.map((Value:string) => html`<option value=${Value}></option>`)}
        </datalist>`
      }

    /**** actual rendering ****/

      return html`<input type="month" class="WAT Content MonthInput"
        value=${ValueToShow} min=${Minimum} max=${Maximum}
        readOnly=${readonly} pattern=${WAT_MonthPattern}
        disabled=${Enabling === false} onInput=${_onInput} onBlur=${_onBlur}
        list=${SuggestionId}
      />${SuggestionList}`
    }
  }
  builtInWidgetTypes['MonthInput'] = WAT_MonthInput

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
  `)

/**** FileInput ****/

  export class WAT_FileInput extends WAT_Widget {
    public constructor (Page:WAT_Page) { super(Page) }

    public get Type ():string  { return 'FileInput' }
    public set Type (_:string) { throwReadOnlyError('Type') }

  /**** Placeholder ****/

    protected _Placeholder:WAT_Textline|undefined

    public get Placeholder ():WAT_Textline|undefined { return this._Placeholder }
    public set Placeholder (newSetting:WAT_Textline|undefined) {
      allowTextline('placeholder',newSetting)
      if (this._Placeholder !== newSetting) {
        this._Placeholder = newSetting
        this.rerender()
      }
    }

  /**** allowMultiple ****/

    protected _allowMultiple:boolean = false

    public get allowMultiple ():boolean { return this._allowMultiple }
    public set allowMultiple (newSetting:boolean) {
      allowBoolean('"allowMultiple" setting',newSetting)
      if (this._allowMultiple !== newSetting) {
        this._allowMultiple = newSetting
        this.rerender()
      }
    }

  /**** acceptableTypes ****/

    protected _acceptableTypes:WAT_Textline|undefined

    public get acceptableTypes ():WAT_Textline|undefined { return this._acceptableTypes }
    public set acceptableTypes (newSetting:WAT_Textline|undefined) {
      allowTextline('acceptable file types',newSetting)
      if (this._acceptableTypes !== newSetting) {
        this._acceptableTypes = newSetting
        this.rerender()
      }
    }

  /**** _serializeConfigurationInto ****/

    protected _serializeConfigurationInto (Serialization:Serializable):void {
      super._serializeConfigurationInto(Serialization)

      ;[
        'Placeholder','acceptableTypes','allowMultiple'
      ].forEach((Name:string) => this._serializePropertyInto(Name,Serialization))
    }

  /**** _deserializeConfigurationFrom ****/

    protected _deserializeConfigurationFrom (Serialization:Serializable):void {
      super._deserializeConfigurationFrom(Serialization)

      this._Placeholder     = acceptableTextline(Serialization.Placeholder,'').trim()
      this._acceptableTypes = acceptableTextline(Serialization.acceptableTypes,'*')
      this._allowMultiple   = acceptableBoolean (Serialization.allowMultiple,  false)
    }

  /**** Renderer ****/

    protected _Renderer = () => {
      const Value           = acceptableText            (this._Value,'').trim().replace(/[\n\r]+/g,',')
      const Placeholder     = acceptableTextline        (this._Placeholder,'').trim()
      const acceptableTypes = acceptableOptionalTextline(this._acceptableTypes,'*')
      const allowMultiple   = acceptableOptionalBoolean (this._allowMultiple)

      const _onInput = useCallback((Event:any):void => {
        if (this.Enabling === false) { return consumingEvent(Event) }

        this.Value = Array.from(Event.target.files).map((File:any) => File.name).join('\n')
// @ts-ignore TS2445 well, this object *is* a subinstance of WAT_Widget
        if (this._onInput != null) { this._onInput_(Event) }         // no typo!
      })

      const _onDragEnter = useCallback((Event:Event):void => { return consumingEvent(Event) })
      const _onDragOver  = useCallback((Event:Event):void => { return consumingEvent(Event) })

      const _onDrop = useCallback((Event:any):void => {
        consumeEvent(Event)
        if (this.Enabling === false) { return }

        this.Value = Array.from(Event.dataTransfer.files).map((File:any) => File.name).join('\n')
// @ts-ignore TS2445 well, this object *is* a subinstance of WAT_Widget
        this._onDrop_(Event,Event.dataTransfer.files)
      })              // nota bene: "files" is now in "Event.dataTransfer.files"

    /**** actual rendering ****/

      return html`<label class="WAT Content FileInput"
        onDragEnter=${_onDragEnter} onDragOver=${_onDragOver} onDrop=${_onDrop}
      >
        ${Value === ''
          ? this._Placeholder === '' ? '' : html`<span style="
              font-size:${Math.round((this.FontSize || 14)*0.95)}px; line-height:${this.Height}px
            ">${Placeholder}</span>`
          : html`<span style="line-height:${this.Height}px">${Value}</span>`
        }
        <input type="file" style="display:none"
          multiple=${allowMultiple} accept=${acceptableTypes}
          disabled=${this.Enabling === false} onInput=${_onInput}
        />
      </label>`
    }
  }
  builtInWidgetTypes['FileInput'] = WAT_FileInput

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
  `)

/**** PseudoFileInput ****/

  export class WAT_PseudoFileInput extends WAT_Widget {
    public constructor (Page:WAT_Page) { super(Page) }

    public get Type ():string  { return 'PseudoFileInput' }
    public set Type (_:string) { throwReadOnlyError('Type') }

  /**** Icon ****/

    protected _Icon:WAT_URL|undefined

    public get Icon ():WAT_URL|undefined { return this._Icon }
    public set Icon (newSetting:WAT_URL|undefined) {
      allowURL('icon image ULR',newSetting)
      if (this._Icon !== newSetting) {
        this._Icon = newSetting
        this.rerender()
      }
    }

  /**** allowMultiple ****/

    protected _allowMultiple:boolean = false

    public get allowMultiple ():boolean { return this._allowMultiple }
    public set allowMultiple (newSetting:boolean) {
      allowBoolean('"allowMultiple" setting',newSetting)
      if (this._allowMultiple !== newSetting) {
        this._allowMultiple = newSetting
        this.rerender()
      }
    }

  /**** acceptableTypes ****/

    protected _acceptableTypes:WAT_Textline|undefined

    public get acceptableTypes ():WAT_Textline|undefined { return this._acceptableTypes }
    public set acceptableTypes (newSetting:WAT_Textline|undefined) {
      allowTextline('acceptable file types',newSetting)
      if (this._acceptableTypes !== newSetting) {
        this._acceptableTypes = newSetting
        this.rerender()
      }
    }

  /**** _serializeConfigurationInto ****/

    protected _serializeConfigurationInto (Serialization:Serializable):void {
      super._serializeConfigurationInto(Serialization)

      ;[
        'Icon','acceptableTypes','allowMultiple'
      ].forEach((Name:string) => this._serializePropertyInto(Name,Serialization))
    }

  /**** _deserializeConfigurationFrom ****/

    protected _deserializeConfigurationFrom (Serialization:Serializable):void {
      super._deserializeConfigurationFrom(Serialization)

      this._Icon            = acceptableURL     (Serialization.Icon,`${IconFolder}/arrow-up-from-bracket.png`)
      this._acceptableTypes = acceptableTextline(Serialization.acceptableTypes,'*')
      this._allowMultiple   = acceptableBoolean (Serialization.allowMultiple,  false)
    }

  /**** Renderer ****/

    protected _Renderer = () => {
      const Icon            = acceptableURL             (this._Icon,`${IconFolder}/arrow-up-from-bracket.png`)
      const Color           = acceptableColor           ((this as Indexable)._Color,'black')
      const acceptableTypes = acceptableOptionalTextline(this._acceptableTypes,'*')
      const allowMultiple   = acceptableOptionalBoolean (this._allowMultiple)

      const _onInput = useCallback((Event:any) => {
        if (this.Enabling == false) { return consumingEvent(Event) }

        this.Value = Array.from(Event.target.files).map((File:any) => File.name).join('\n')
// @ts-ignore TS2445 well, this object *is* a subinstance of WAT_Widget
        if (this._onInput != null) { this._onInput_(Event) }         // no typo!
      })

      return html`<label class="WAT Content PseudoFileInput">
        <div style="
          -webkit-mask-image:url(${Icon}); mask-image:url(${Icon});
          background-color:${Color};
        "></div>
        <input type="file" style="display:none"
          multiple=${allowMultiple} accept=${acceptableTypes}
          disabled=${this.Enabling === false} onInput=${_onInput}
        />
      </label>`
    }
  }
  builtInWidgetTypes['PseudoFileInput'] = WAT_PseudoFileInput

  appendStyle(`
  .WAT.Widget > .WAT.PseudoFileInput > div {
    display:block; position:absolute;
    left:0px; top:0px; right:0px; bottom:0px;
    -webkit-mask-size:contain;           mask-size:contain;
    -webkit-mask-position:center center; mask-position:center center;
  }
  `)

/**** FileDropArea ****/

  export class WAT_FileDropArea extends WAT_Widget {
    public constructor (Page:WAT_Page) { super(Page) }

    public get Type ():string  { return 'FileDropArea' }
    public set Type (_:string) { throwReadOnlyError('Type') }

  /**** Placeholder ****/

    protected _Placeholder:WAT_Textline|undefined

    public get Placeholder ():WAT_Textline|undefined { return this._Placeholder }
    public set Placeholder (newSetting:WAT_Textline|undefined) {
      allowTextline('placeholder',newSetting)
      if (this._Placeholder !== newSetting) {
        this._Placeholder = newSetting
        this.rerender()
      }
    }

  /**** allowMultiple ****/

    protected _allowMultiple:boolean = false

    public get allowMultiple ():boolean { return this._allowMultiple }
    public set allowMultiple (newSetting:boolean) {
      allowBoolean('"allowMultiple" setting',newSetting)
      if (this._allowMultiple !== newSetting) {
        this._allowMultiple = newSetting
        this.rerender()
      }
    }

  /**** acceptableTypes ****/

    protected _acceptableTypes:WAT_Textline|undefined

    public get acceptableTypes ():WAT_Textline|undefined { return this._acceptableTypes }
    public set acceptableTypes (newSetting:WAT_Textline|undefined) {
      allowTextline('acceptable file types',newSetting)
      if (this._acceptableTypes !== newSetting) {
        this._acceptableTypes = newSetting
        this.rerender()
      }
    }

  /**** _serializeConfigurationInto ****/

    protected _serializeConfigurationInto (Serialization:Serializable):void {
      super._serializeConfigurationInto(Serialization)

      ;[
        'Placeholder','acceptableTypes','allowMultiple'
      ].forEach((Name:string) => this._serializePropertyInto(Name,Serialization))
    }

  /**** _deserializeConfigurationFrom ****/

    protected _deserializeConfigurationFrom (Serialization:Serializable):void {
      super._deserializeConfigurationFrom(Serialization)

      this._Placeholder     = acceptableTextline(Serialization.Placeholder,'').trim()
      this._acceptableTypes = acceptableTextline(Serialization.acceptableTypes,'*')
      this._allowMultiple   = acceptableBoolean (Serialization.allowMultiple,  false)
    }

  /**** Renderer ****/

    protected _Renderer = () => {
      const Placeholder     = acceptableTextline        (this._Placeholder,'').trim()
      const acceptableTypes = acceptableOptionalTextline(this._acceptableTypes,'*')
      const allowMultiple   = acceptableOptionalBoolean (this._allowMultiple)

      const _onInput = useCallback((Event:any) => {
        if (this.Enabling == false) { return consumingEvent(Event) }

        this.Value = Array.from(Event.target.files).map((File:any) => File.name).join('\n')
// @ts-ignore TS2445 well, this object *is* a subinstance of SNS_Sticker
        if (this._onInput != null) { this._onInput_(Event) }         // no typo!
      })

      const _onDragEnter = useCallback((Event:Event) => { return consumingEvent(Event) })
      const _onDragOver  = useCallback((Event:Event) => { return consumingEvent(Event) })

      const _onDrop = useCallback((Event:any) => {
        consumeEvent(Event)
        if (this.Enabling == false) { return }

        this.Value = Array.from(Event.dataTransfer.files).map((File:any) => File.name).join('\n')
// @ts-ignore TS2445 well, this object *is* a subinstance of WAT_Widget
        this._onDrop_(Event,Event.dataTransfer.files)
      })              // nota bene: "files" is now in "Event.dataTransfer.files"

      return html`<label class="WAT Content FileDropArea"
        onDragEnter=${_onDragEnter} onDragOver=${_onDragOver} onDrop=${_onDrop}>
        <span>${Placeholder}</span>
        <input type="file"
          multiple=${allowMultiple} accept=${acceptableTypes}
          disabled=${this.Enabling === false} onInput=${_onInput}
        />
      </label>`
    }
  }
  builtInWidgetTypes['FileDropArea'] = WAT_FileDropArea

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
  `)

/**** SearchInput ****/

  export class WAT_SearchInput extends WAT_Widget {
    public constructor (Page:WAT_Page) { super(Page) }

    public get Type ():string  { return 'SearchInput' }
    public set Type (_:string) { throwReadOnlyError('Type') }

  /**** Placeholder ****/

    protected _Placeholder:WAT_Textline|undefined

    public get Placeholder ():WAT_Textline|undefined { return this._Placeholder }
    public set Placeholder (newSetting:WAT_Textline|undefined) {
      allowTextline('placeholder',newSetting)
      if (this._Placeholder !== newSetting) {
        this._Placeholder = newSetting
        this.rerender()
      }
    }

  /**** readonly ****/

    protected _readonly:boolean = false

    public get readonly ():boolean { return this._readonly }
    public set readonly (newSetting:boolean) {
      allowBoolean('readonly setting',newSetting)
      if (this._readonly !== newSetting) {
        this._readonly = newSetting
        this.rerender()
      }
    }

  /**** minLength ****/

    protected _minLength:number|undefined

    public get minLength ():number|undefined { return this._minLength }
    public set minLength (newSetting:number|undefined) {
      allowOrdinal('minimal length',newSetting)
      if (this._minLength !== newSetting) {
        this._minLength = newSetting
        this.rerender()
      }
    }

  /**** maxLength ****/

    protected _maxLength:number|undefined

    public get maxLength ():number|undefined { return this._maxLength }
    public set maxLength (newSetting:number|undefined) {
      allowOrdinal('maximal length',newSetting)
      if (this._maxLength !== newSetting) {
        this._maxLength = newSetting
        this.rerender()
      }
    }

  /**** Pattern ****/

    protected _Pattern:WAT_Textline|undefined

    public get Pattern ():WAT_Textline|undefined { return this._Pattern }
    public set Pattern (newSetting:WAT_Textline|undefined) {
      allowTextline('input pattern',newSetting)
      if (this._Pattern !== newSetting) {
        this._Pattern = newSetting
        this.rerender()
      }
    }

  /**** SpellChecking ****/

    protected _SpellChecking:boolean = false

    public get SpellChecking ():boolean { return this._SpellChecking }
    public set SpellChecking (newSetting:boolean) {
      allowBoolean('spell check setting',newSetting)
      if (this._SpellChecking !== newSetting) {
        this._SpellChecking = newSetting
        this.rerender()
      }
    }

  /**** Suggestions ****/

    protected _Suggestions:string[]|undefined

    public get Suggestions ():string[]|undefined {
      return (this._Suggestions == null ? this._Suggestions : this._Suggestions.slice())
    }
    public set Suggestions (newSetting:string[]|undefined) {
      allowListSatisfying('suggestion list',newSetting,ValueIsTextline)
      if (ValuesDiffer(this._Suggestions,newSetting)) {
        this._Suggestions = (newSetting == null ? newSetting : newSetting.slice())
        this.rerender()
      }
    }

  /**** _serializeConfigurationInto ****/

    protected _serializeConfigurationInto (Serialization:Serializable):void {
      super._serializeConfigurationInto(Serialization)

      ;[
        'Placeholder','readonly','minLength','maxLength','Pattern',
        'SpellChecking','Suggestions',
      ].forEach((Name:string) => this._serializePropertyInto(Name,Serialization))
    }

  /**** _deserializeConfigurationFrom ****/

    protected _deserializeConfigurationFrom (Serialization:Serializable):void {
      super._deserializeConfigurationFrom(Serialization)

      this._Placeholder   = acceptableOptionalTextline(Serialization.Placeholder)
      this._readonly      = acceptableBoolean         (Serialization.readonly, false)
      this._minLength     = acceptableOptionalOrdinal (Serialization.minLength)
      this._maxLength     = acceptableOptionalOrdinal (Serialization.maxLength)
      this._Pattern       = acceptableOptionalTextline(Serialization.Pattern)
      this._SpellChecking = acceptableBoolean         (Serialization.SpellChecking, false)

      this._Suggestions = acceptableOptionalListSatisfying(
        Serialization.Suggestions, undefined, ValueIsTextline
      )
    }

  /**** Renderer ****/

    protected _Renderer = () => {
      const { Value, Enabling } = this

    /**** handle external changes ****/

      const shownValue   = useRef('')
      const InputElement = useRef(null)

      let ValueToShow:string = acceptableTextline(Value,'')
      if (document.activeElement === InputElement.current) {
        ValueToShow = shownValue.current
      } else {
        shownValue.current = ValueToShow
      }

      const _onInput = useCallback((Event:any) => {
        if (Enabling === false) { return consumingEvent(Event) }

        shownValue.current = this.Value = Event.target.value
        if (this._onInput != null) { this._onInput_(Event) }         // no typo!
      },[ Enabling ])

      const _onBlur = useCallback((Event:any) => {
        this.rerender()
        if (this._onBlur != null) { this._onBlur_(Event) }           // no typo!
      })

    /**** process any other parameters ****/

      const Placeholder   = acceptableOptionalTextline(this._Placeholder)
      const readonly      = acceptableOptionalBoolean (this._readonly)
      const minLength     = acceptableOptionalOrdinal (this._minLength)
      const maxLength     = acceptableOptionalOrdinal (this._maxLength)
      const Pattern       = acceptableOptionalTextline(this._Pattern)
      const SpellChecking = acceptableOptionalBoolean (this._SpellChecking)

      const Suggestions = acceptableOptionalListSatisfying(
        this._Suggestions, undefined, ValueIsTextline
      )

      let SuggestionList:any = '', SuggestionId
      if ((Suggestions != null) && (Suggestions.length > 0)) {
        SuggestionId = IdOfWidget(this) + '-Suggestions'

        SuggestionList = html`<datalist id=${SuggestionId}>
          ${Suggestions.map((Value:string) => html`<option value=${Value}></option>`)}
        </datalist>`
      }

    /**** actual rendering ****/

      return html`<input type="search" class="WAT Content SearchInput"
        value=${ValueToShow} minlength=${minLength} maxlength=${maxLength}
        readOnly=${readonly} placeholder=${Placeholder}
        pattern=${Pattern} spellcheck=${SpellChecking}
        disabled=${Enabling == false} onInput=${_onInput} onBlur=${_onBlur}
        list=${SuggestionId}
      />${SuggestionList}`
    }
  }
  builtInWidgetTypes['SearchInput'] = WAT_SearchInput

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
  `)

/**** ColorInput ****/

  export class WAT_ColorInput extends WAT_Widget {
    public constructor (Page:WAT_Page) { super(Page) }

    public get Type ():string  { return 'ColorInput' }
    public set Type (_:string) { throwReadOnlyError('Type') }

  /**** Suggestions ****/

    protected _Suggestions:string[]|undefined

    public get Suggestions ():string[]|undefined {
      return (this._Suggestions == null ? this._Suggestions : this._Suggestions.slice())
    }
    public set Suggestions (newSetting:string[]|undefined) {
      allowListSatisfying('suggestion list',newSetting,ValueIsColor)
      if (ValuesDiffer(this._Suggestions,newSetting)) {
        this._Suggestions = (newSetting == null ? newSetting : newSetting.slice())
        this.rerender()
      }
    }

  /**** _serializeConfigurationInto ****/

    protected _serializeConfigurationInto (Serialization:Serializable):void {
      super._serializeConfigurationInto(Serialization)
      this._serializePropertyInto('Suggestions',Serialization)
    }

  /**** _deserializeConfigurationFrom ****/

    protected _deserializeConfigurationFrom (Serialization:Serializable):void {
      super._deserializeConfigurationFrom(Serialization)

      this._Suggestions = acceptableOptionalListSatisfying(
        Serialization.Suggestions, undefined, ValueIsColor
      )
    }

  /**** Renderer ****/

    protected _Renderer = () => {
      let Value = acceptableOptionalColor(this._Value)

      const Suggestions = acceptableOptionalListSatisfying(
        this._Suggestions, undefined, ValueIsColor
      )

      let SuggestionList:any = '', SuggestionId
      if ((Suggestions != null) && (Suggestions.length > 0)) {
        SuggestionId = IdOfWidget(this) + '-Suggestions'

        SuggestionList = html`<datalist id=${SuggestionId}>
          ${Suggestions.map((Value:string) => html`<option value=${Value}></option>`)}
        </datalist>`
      }

    /**** actual rendering ****/

      const _onInput = useCallback((Event:any) => {
        this.Value = Event.target.value
        if (this._onInput != null) { this._onInput_(Event) }         // no typo!
      },[])

      return html`<input type="color" class="WAT Content ColorInput"
        value=${Value === '' ? null : Value}
        disabled=${this.Enabling == false} onInput=${_onInput}
        list=${SuggestionId}
      />${SuggestionList}`
    }
  }
  builtInWidgetTypes['ColorInput'] = WAT_ColorInput

  appendStyle(`
  .WAT.Widget > .WAT.ColorInput {
    left:1px; top:1px; right:1px; bottom:1px; width:auto; height:auto;
    border:solid 1px #888888; border-radius:2px;
    background:#e8f0ff;
    padding:0px 2px 0px 2px;
  }
  `)

/**** DropDown ****/

  export class WAT_DropDown extends WAT_Widget {
    public constructor (Page:WAT_Page) { super(Page) }

    public get Type ():string  { return 'DropDown' }
    public set Type (_:string) { throwReadOnlyError('Type') }

  /**** Options ****/

    protected _Options:string[]|undefined

    public get Options ():string[]|undefined {
      return (this._Options == null ? this._Options : this._Options.slice())
    }
    public set Options (newSetting:string[]|undefined) {
      allowListSatisfying('option list',newSetting,ValueIsTextline)
      if (ValuesDiffer(this._Options,newSetting)) {
        this._Options = (newSetting == null ? newSetting : newSetting.slice())
        this.rerender()
      }
    }

  /**** _serializeConfigurationInto ****/

    protected _serializeConfigurationInto (Serialization:Serializable):void {
      super._serializeConfigurationInto(Serialization)
      this._serializePropertyInto('Options',Serialization)
    }

  /**** _deserializeConfigurationFrom ****/

    protected _deserializeConfigurationFrom (Serialization:Serializable):void {
      super._deserializeConfigurationFrom(Serialization)

      this._Options = acceptableListSatisfying(
        Serialization.Options, [], ValueIsTextline
      )
    }

  /**** Renderer ****/

    protected _Renderer = () => {
      let Value = acceptableTextline(this._Value,'')

      const Options = acceptableListSatisfying(
        this._Options, [], ValueIsTextline
      )

      const _onInput = useCallback((Event:any) => {
        this.Value = Event.target.value
        if (this._onInput != null) { this._onInput_(Event) }         // no typo!
      },[])

      return html`<select class="WAT Content DropDown"
        disabled=${this.Enabling == false} onInput=${_onInput}
      >${Options.map((Option:string) => {
          const OptionValue = Option.replace(/:.*$/,'').trim()
          let   OptionLabel = Option.replace(/^[^:]+:/,'').trim()
          const disabled    = (OptionLabel[0] === '-')
            if (/^-[^-]+$/.test(OptionLabel)) {
              OptionLabel = OptionLabel.slice(1)
            }
          return html`<option value=${OptionValue} selected=${OptionValue === Value}
            disabled=${disabled}
          >
            ${OptionLabel}
          </option>`
        }
      )}</select>`
    }
  }
  builtInWidgetTypes['DropDown'] = WAT_DropDown

  appendStyle(`
  .WAT.Widget > .WAT.DropDown {
    left:1px; top:1px; right:1px; bottom:1px; width:auto; height:auto;
    border:solid 1px #888888; border-radius:2px;
    background:#e8f0ff;
    padding:0px 2px 0px 2px;
  }
  `)

/**** PseudoDropDown ****/

  export class WAT_PseudoDropDown extends WAT_Widget {
    public constructor (Page:WAT_Page) { super(Page) }

    public get Type ():string  { return 'PseudoDropDown' }
    public set Type (_:string) { throwReadOnlyError('Type') }

  /**** Icon ****/

    protected _Icon:WAT_URL|undefined

    public get Icon ():WAT_URL|undefined { return this._Icon }
    public set Icon (newSetting:WAT_URL|undefined) {
      allowURL('icon image ULR',newSetting)
      if (this._Icon !== newSetting) {
        this._Icon = newSetting
        this.rerender()
      }
    }

  /**** Options ****/

    protected _Options:string[]|undefined

    public get Options ():string[]|undefined {
      return (this._Options == null ? this._Options : this._Options.slice())
    }
    public set Options (newSetting:string[]|undefined) {
      allowListSatisfying('option list',newSetting,ValueIsTextline)
      if (ValuesDiffer(this._Options,newSetting)) {
        this._Options = (newSetting == null ? newSetting : newSetting.slice())
        this.rerender()
      }
    }

  /**** _serializeConfigurationInto ****/

    protected _serializeConfigurationInto (Serialization:Serializable):void {
      super._serializeConfigurationInto(Serialization)
      this._serializePropertyInto('Icon',   Serialization)
      this._serializePropertyInto('Options',Serialization)
    }

  /**** _deserializeConfigurationFrom ****/

    protected _deserializeConfigurationFrom (Serialization:Serializable):void {
      super._deserializeConfigurationFrom(Serialization)

      this._Icon = acceptableURL(Serialization.Icon,`${IconFolder}/menu.png`)

      this._Options = acceptableListSatisfying(
        Serialization.Options, [], ValueIsTextline
      )
    }

  /**** Renderer ****/

    protected _Renderer = () => {
      let   Value = acceptableTextline(this._Value,'')
      const Icon  = acceptableURL     (this._Icon,`${IconFolder}/menu.png`)
      const Color = acceptableColor   ((this as Indexable)._Color,'black')

      const Options = acceptableListSatisfying(
        this._Options, [], ValueIsTextline
      )

      const _onInput = useCallback((Event:any) => {
        this.Value = Event.target.value
        if (this._onInput != null) { this._onInput_(Event) }         // no typo!
      },[])

      return html`<div class="WAT Content PseudoDropDown">
        <div style="
          -webkit-mask-image:url(${Icon}); mask-image:url(${Icon});
          background-color:${Color};
        "></div>
        <select disabled=${this.Enabling == false} onInput=${_onInput}>
          ${Options.map((Option:string) => {
            const OptionValue = Option.replace(/:.*\$/,'').trim()
            let   OptionLabel = Option.replace(/^[^:]+:/,'').trim()
            const disabled    = (OptionLabel[0] === '-')
              if (/^-[^-]+$/.test(OptionLabel)) {
                OptionLabel = OptionLabel.slice(1)
              }
            return html`<option value=${OptionValue} selected=${OptionValue === Value}
              disabled=${disabled}
            >
              ${OptionLabel}
            </option>`
          })}
        </select>
      </div>`
    }
  }
  builtInWidgetTypes['PseudoDropDown'] = WAT_PseudoDropDown

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
  `)

/**** TextInput ****/

  export class WAT_TextInput extends WAT_Widget {
    public constructor (Page:WAT_Page) { super(Page) }

    public get Type ():string  { return 'TextInput' }
    public set Type (_:string) { throwReadOnlyError('Type') }

  /**** Placeholder ****/

    protected _Placeholder:WAT_Textline|undefined

    public get Placeholder ():WAT_Textline|undefined { return this._Placeholder }
    public set Placeholder (newSetting:WAT_Textline|undefined) {
      allowTextline('placeholder',newSetting)
      if (this._Placeholder !== newSetting) {
        this._Placeholder = newSetting
        this.rerender()
      }
    }

  /**** readonly ****/

    protected _readonly:boolean = false

    public get readonly ():boolean { return this._readonly }
    public set readonly (newSetting:boolean) {
      allowBoolean('readonly setting',newSetting)
      if (this._readonly !== newSetting) {
        this._readonly = newSetting
        this.rerender()
      }
    }

  /**** minLength ****/

    protected _minLength:number|undefined

    public get minLength ():number|undefined { return this._minLength }
    public set minLength (newSetting:number|undefined) {
      allowOrdinal('minimal length',newSetting)
      if (this._minLength !== newSetting) {
        this._minLength = newSetting
        this.rerender()
      }
    }

  /**** maxLength ****/

    protected _maxLength:number|undefined

    public get maxLength ():number|undefined { return this._maxLength }
    public set maxLength (newSetting:number|undefined) {
      allowOrdinal('maximal length',newSetting)
      if (this._maxLength !== newSetting) {
        this._maxLength = newSetting
        this.rerender()
      }
    }

  /**** LineWrapping ****/

    protected _LineWrapping:boolean = false

    public get LineWrapping ():boolean { return this._LineWrapping }
    public set LineWrapping (newSetting:boolean) {
      allowBoolean('line wrapping setting',newSetting)
      if (this._LineWrapping !== newSetting) {
        this._LineWrapping = newSetting
        this.rerender()
      }
    }

  /**** SpellChecking ****/

    protected _SpellChecking:boolean = false

    public get SpellChecking ():boolean { return this._SpellChecking }
    public set SpellChecking (newSetting:boolean) {
      allowBoolean('spell check setting',newSetting)
      if (this._SpellChecking !== newSetting) {
        this._SpellChecking = newSetting
        this.rerender()
      }
    }


  /**** _serializeConfigurationInto ****/

    protected _serializeConfigurationInto (Serialization:Serializable):void {
      super._serializeConfigurationInto(Serialization)

      ;[
        'Placeholder','readonly','minLength','maxLength','LineWrapping',
        'SpellChecking',
      ].forEach((Name:string) => this._serializePropertyInto(Name,Serialization))
    }

  /**** _deserializeConfigurationFrom ****/

    protected _deserializeConfigurationFrom (Serialization:Serializable):void {
      super._deserializeConfigurationFrom(Serialization)

      this._Placeholder   = acceptableOptionalTextline(Serialization.Placeholder)
      this._readonly      = acceptableBoolean         (Serialization.readonly, false)
      this._minLength     = acceptableOptionalOrdinal (Serialization.minLength)
      this._maxLength     = acceptableOptionalOrdinal (Serialization.maxLength)
      this._LineWrapping  = acceptableBoolean         (Serialization.LineWrapping,  true)
      this._SpellChecking = acceptableBoolean         (Serialization.SpellChecking, false)
    }

  /**** Renderer ****/

    protected _Renderer = () => {
      const { Value, Enabling } = this

    /**** handle external changes ****/

      const shownValue   = useRef('')
      const InputElement = useRef(null)

      let ValueToShow:string = acceptableText(Value,'')
      if (document.activeElement === InputElement.current) {
        ValueToShow = shownValue.current
      } else {
        shownValue.current = ValueToShow
      }

      const _onInput = useCallback((Event:any) => {
        if (Enabling === false) { return consumingEvent(Event) }

        shownValue.current = this.Value = Event.target.value
        if (this._onInput != null) { this._onInput_(Event) }         // no typo!
      },[ Enabling ])

      const _onBlur = useCallback((Event:any) => {
        this.rerender()
        if (this._onBlur != null) { this._onBlur_(Event) }           // no typo!
      })

    /**** process any other parameters ****/

      const Placeholder   = acceptableOptionalTextline(this._Placeholder)
      const readonly      = acceptableOptionalBoolean (this._readonly)
      const minLength     = acceptableOptionalOrdinal (this._minLength)
      const maxLength     = acceptableOptionalOrdinal (this._maxLength)
      const LineWrapping  = acceptableOptionalBoolean (this._LineWrapping)
      const SpellChecking = acceptableOptionalBoolean (this._SpellChecking)

    /**** actual rendering ****/

      return html`<textarea class="WAT Content TextInput"
        value=${ValueToShow} minlength=${minLength} maxlength=${maxLength}
        readOnly=${readonly} placeholder=${Placeholder}
        spellcheck=${SpellChecking} style="resize:none; ${
          LineWrapping == true
          ? 'white-space:pre; overflow-wrap:break-word; hyphens:auto'
          : undefined
        }"
        disabled=${Enabling === false} onInput=${_onInput} onBlur=${_onBlur}
      />`
    }
  }
  builtInWidgetTypes['TextInput'] = WAT_TextInput

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
  `)

/**** TextTab ****/

  export class WAT_TextTab extends WAT_Widget {
    public constructor (Page:WAT_Page) { super(Page) }

    public get Type ():string  { return 'TextTab' }
    public set Type (_:string) { throwReadOnlyError('Type') }

  /**** Activation ****/

    protected _Activation:boolean = false

    public get Activation ():boolean {
      return this._Activation
    }

    public set Activation (newActivation:boolean) {
      expectBoolean('tab activation',newActivation)
      if (this._Activation !== newActivation) {
        this._Activation = newActivation
        this.rerender()
      }
    }

  /**** activate/deactivate ****/

    public activate ():void   { this.Activation = true }
    public deactivate ():void { this.Activation = false }

  /**** isActive ****/

    public get isActive ():boolean              { return this.Activation }
    public set isActive (newActivation:boolean) { this.Activation = newActivation }

  /**** Renderer ****/

    protected _Renderer = () => {
      const active = (this.isActive ? 'active' : '')

      const _onClick = (Event:any) => {
        if (this.Enabling == false) { return consumingEvent(Event) }
        if (this._onClick != null) { this._onClick_(Event) }         // no typo!
      }

      const Value = acceptableTextline(this.Value,'')

      return html`<div class="WAT ${active} TextTab"
        onClick=${_onClick}>${Value}</div>`
    }
  }
  builtInWidgetTypes['TextTab'] = WAT_TextTab

  appendStyle(`
  .WAT.Widget > .WAT.TextTab {
    display:block; position:absolute;
    left:0px; top:0px: right:auto; bottom:0px; width:auto; height:auto;
    border:none; border-bottom:solid 2px transparent;
    font-weight:bold;
  }
  .WAT.Widget > .WAT.TextTab.active {
    border:none; border-bottom:solid 2px black;
  }
  `)

/**** IconTab ****/

  export class WAT_IconTab extends WAT_Widget {
    public constructor (Page:WAT_Page) { super(Page) }

    public get Type ():string  { return 'IconTab' }
    public set Type (_:string) { throwReadOnlyError('Type') }

  /**** Activation ****/

    protected _Activation:boolean = false

    public get Activation ():boolean {
      return this._Activation
    }

    public set Activation (newActivation:boolean) {
      expectBoolean('tab activation',newActivation)
      if (this._Activation !== newActivation) {
        this._Activation = newActivation
        this.rerender()
      }
    }

  /**** activate/deactivate ****/

    public activate ():void   { this.Activation = true }
    public deactivate ():void { this.Activation = false }

  /**** isActive ****/

    public get isActive ():boolean              { return this.Activation }
    public set isActive (newActivation:boolean) { this.Activation = newActivation }

  /**** Renderer ****/

    protected _Renderer = () => {
      const active = (this.isActive ? 'active' : '')

      const _onClick = (Event:any) => {
        if (this.Enabling == false) { return consumingEvent(Event) }
        if (this._onClick != null) { this._onClick_(Event) }         // no typo!
      }

      const Value = acceptableURL(this._Value,`${IconFolder}/pencil.png`)
      const Color = acceptableColor(this.Color,'black')

      return html`<div class="WAT ${active} IconTab" style="
        -webkit-mask-image:url(${Value}); mask-image:url(${Value});
        background-color:${Color};
      " disabled=${this.Enabling == false} onClick=${_onClick}
      />`
    }
  }
  builtInWidgetTypes['IconTab'] = WAT_IconTab

  appendStyle(`
  .WAT.Widget > .WAT.IconTab {
    left:0px; top:0px: right:auto; bottom:0px; width:auto; height:auto;
    border:none; border-bottom:solid 2px transparent;

    -webkit-mask-size:contain;           mask-size:contain;
    -webkit-mask-position:center center; mask-position:center center;
  }
  .WAT.Widget > .WAT.IconTab.active {
    border:none; border-bottom:solid 2px black;
  }
  `)

/**** WidgetPane ****/

  export class WAT_WidgetPane extends WAT_Widget {
    public constructor (Page:WAT_Page) { super(Page) }

    public get Type ():string  { return 'WidgetPane' }
    public set Type (_:string) { throwReadOnlyError('Type') }

  /**** Value ****/

    public get Value ():WAT_Path|undefined { return this._Value as WAT_Path }
    public set Value (newValue:WAT_Path|WAT_Widget|undefined) {
      let SourceWidget:WAT_Widget|undefined, SourcePath:WAT_Path|undefined
      if (ValueIsWidget(newValue)) {
        SourceWidget = newValue as WAT_Widget
        SourcePath   = SourceWidget.Path
      } else {
        allowPath('widget pane source path',newValue)
        if ((newValue == null) || ((newValue as string).trim() === '')) {
          SourceWidget = undefined
          SourcePath   = undefined
        } else {
          SourceWidget = this.Applet?.WidgetAtPath(newValue as WAT_Path)
          SourcePath   = newValue as WAT_Path
        }
      }

      if (SourceWidget == null) {
        if (this._Value != null) {
          this._Value = undefined
          this.rerender()
        }
        return
      }

      if (SourceWidget === this) throwError(
        'InvalidArgument: a WidgetPane can not show itself'
      )

      if (SourceWidget.Page === this.Page) throwError(
        'InvalidArgument: a WidgetPane can not show other widgets from the same page'
      )

      if (this._Value !== SourcePath) {
        this._Value = SourcePath

        if (this._onValueChange != null) { this._onValueChange_() }  // no typo!

        this.rerender()
      }
    }

  /**** _GeometryRelativeTo  ****/

    private _GeometryOfWidgetRelativeTo (
      Widget:WAT_Widget, BaseGeometry:WAT_Geometry, PaneGeometry:WAT_Geometry
    ):WAT_Geometry {
      const WidgetAnchors = Widget.Anchors

      const {
        x:WidgetX, y:WidgetY, Width:WidgetWidth, Height:WidgetHeight
      } = Widget.Geometry

      const {
        minWidth,minHeight, maxWidth,maxHeight
      } = Widget

      const { x:BaseX, y:BaseY, Width:BaseWidth, Height:BaseHeight } = BaseGeometry
      const { x:PaneX, y:PaneY, Width:PaneWidth, Height:PaneHeight } = PaneGeometry

      let x:number,y:number, Width:number,Height:number
        switch (WidgetAnchors[0]) {
          case 'left-width':
            x     = WidgetX-BaseX
            Width = WidgetWidth
            break
          case 'width-right':
            x     = PaneWidth - (BaseX+BaseWidth - (WidgetX+WidgetWidth)) - WidgetWidth
            Width = WidgetWidth
            break
          case 'left-right':
            x     = WidgetX-BaseX
            Width = Math.max(minWidth || 0, Math.min(PaneWidth-BaseWidth+WidgetWidth, maxWidth || Infinity))
        }

        switch (WidgetAnchors[1]) {
          case 'top-height':
            y      = WidgetY-BaseY
            Height = WidgetHeight
            break
          case 'height-bottom':
            y      = PaneHeight - (BaseY+BaseHeight - (WidgetY+WidgetHeight)) - WidgetHeight
            Height = WidgetHeight
            break
          case 'top-bottom':
            y      = WidgetY-BaseY
            Height = Math.max(minHeight || 0, Math.min(PaneHeight-BaseHeight+WidgetHeight, maxHeight || Infinity))
        }
// @ts-ignore TS5905 all variables will be assigned by now
      return { x,y, Width,Height }
    }

  /**** _releaseWidgets ****/

    protected _shownWidgets:WAT_Widget[] = []

    protected _releaseWidgets ():void {
      this._shownWidgets.forEach((Widget:Indexable) => Widget._Pane = undefined)
    }

  /**** Renderer ****/

    protected _Renderer = () => {
      this._releaseWidgets()

      if (this._Value == null) { return '' }

      const SourceWidget = this.Applet?.WidgetAtPath(this._Value as WAT_Path)
      if ((SourceWidget == null) || (SourceWidget === this)) { return '' }

      const WidgetsToShow:WAT_Widget[] = (
        SourceWidget.Type === 'Outline'
        ? (SourceWidget as Indexable).bundledWidgets()
        : [SourceWidget]
      ).filter((Widget:Indexable) => (
        Widget.isVisible && ((Widget._Pane == null) || (Widget._Pane === this))
      ))
        WidgetsToShow.forEach((Widget:Indexable) => Widget._Pane = this)
      this._shownWidgets = WidgetsToShow

      useEffect(() => { return () => {
        this._releaseWidgets()
      } },[])

      const PaneGeometry = this.Geometry
      const BaseGeometry = SourceWidget.Geometry

      return html`<div class="WAT Content WidgetPane">
        ${(WidgetsToShow as any).toReversed().map((Widget:WAT_Widget) => {
          let Geometry = this._GeometryOfWidgetRelativeTo(Widget,BaseGeometry,PaneGeometry)
          return html`<${WAT_WidgetView} Widget=${Widget} Geometry=${Geometry}/>`
        })}
      </div>`
    }
  }
  builtInWidgetTypes['WidgetPane'] = WAT_WidgetPane

  appendStyle(`
  .WAT.Widget > .WAT.WidgetPane {
    overflow:hidden;
  }
  `)

/**** Accordion ****/

  export class WAT_Accordion extends WAT_Widget {
    public constructor (Page:WAT_Page) { super(Page) }

    public get Type ():string  { return 'Accordion' }
    public set Type (_:string) { throwReadOnlyError('Type') }



  /**** Renderer ****/

    protected _Renderer = () => {
      return html`<div class="WAT Content Accordion">${this.Value}</div>`
    }
  }
  builtInWidgetTypes['Accordion'] = WAT_Accordion

  appendStyle(`
  .WAT.Widget > .WAT.Accordion {
  }
  `)

/**** AccordionFold ****/

  export class WAT_AccordionFold extends WAT_Widget {
    public get Type ():string  { return 'AccordionFold' }
    public set Type (_:string) { throwReadOnlyError('Type') }



  /**** Renderer ****/

    protected _Renderer = () => {
      return html`<div class="WAT Content AccordionFold">${this.Value}</div>`
    }
  }
  builtInWidgetTypes['AccordionFold'] = WAT_AccordionFold

  appendStyle(`
  .WAT.Widget > .WAT.AccordionFold {
  }
  `)

/**** FlatListView ****/

  export class WAT_FlatListView extends WAT_Widget {
    public constructor (Page:WAT_Page) { super(Page) }

    public get Type ():string  { return 'FlatListView' }
    public set Type (_:string) { throwReadOnlyError('Type') }

  /**** Placeholder ****/

    protected _Placeholder:WAT_Textline|undefined

    public get Placeholder ():WAT_Textline|undefined { return this._Placeholder }
    public set Placeholder (newSetting:WAT_Textline|undefined) {
      allowTextline('placeholder',newSetting)
      if (this._Placeholder !== newSetting) {
        this._Placeholder = newSetting
        this.rerender()
      }
    }

  /**** List ****/

    protected _List:any[] = []

    public get List ():any[] { return this._List.slice() }
    public set List (newList:any[]) {
      expectList('list',newList)
      if (ValuesDiffer(this._List,newList)) {
        this._List = newList.slice()
        this.rerender()
      }
    }

  /**** ItemRenderer ****/

    protected _ItemRenderer:Function|undefined

    public get ItemRenderer ():Function|undefined  { return this._ItemRenderer }
    public set ItemRenderer (newCallback:Function|undefined) {
      expectFunction('list item rendering callback',newCallback)
      this._ItemRenderer = newCallback
    }

  /**** SelectionLimit ****/

    protected _SelectionLimit:number|undefined

    public get SelectionLimit ():number|undefined { return this._SelectionLimit }
    public set SelectionLimit (newSetting:number|undefined) {
      allowOrdinal('selection limit',newSetting)
      if (this._SelectionLimit !== newSetting) {
        this._SelectionLimit = newSetting
        this.rerender()
      }
    }

  /**** selectedIndices ****/

    protected _selectedIndices:number[] = []

    public get selectedIndices ():number[] {
      return this._selectedIndices.slice()
    }
    public set selectedIndices (newList:number[]) {
      expectListSatisfying('indicies of selected list elements',newList,ValueIsOrdinal)
      if (ValuesDiffer(this._selectedIndices,newList)) {
        const selectedIndexSet:Indexable = Object.create(null)
        this._selectedIndices = newList.filter((selectedIndex:number) => {
          if (
            (selectedIndex < this._List.length) &&
            ! (selectedIndex in selectedIndexSet)
          ) {
            selectedIndexSet[selectedIndex] = true
            return true
          } else {
            return false
          }
        })
        this.rerender()
      }
    }

  /**** onSelectionChange ****/

    protected _onSelectionChange:Function|undefined

    public get onSelectionChange ():Function|undefined { return this._onSelectionChange_ }
    public set onSelectionChange (newCallback:Function|undefined) {
      allowFunction('"onSelectionChange" callback',newCallback)
      this._onSelectionChange = newCallback
    }

    protected _onSelectionChange_ (...ArgList:any[]):void {
      if ((ArgList.length === 1) && (typeof ArgList[0] === 'function')) {
        this._onSelectionChange = ArgList[0]
      } else {                                            // callback invocation
        try {
          if (this._onSelectionChange != null) { this._onSelectionChange.apply(this,ArgList) }
        } catch (Signal:any) {
          setErrorReport(this,{
            Type:'"onSelectionChange" Callback Failure',
            Sufferer:this, Message:'' + Signal, Cause:Signal
          })
        }
      }
    }

  /**** onItemSelected ****/

    protected _onItemSelected:Function|undefined

    public get onItemSelected ():Function|undefined { return this._onItemSelected_ }
    public set onItemSelected (newCallback:Function|undefined) {
      allowFunction('"onItemSelected" callback',newCallback)
      this._onItemSelected = newCallback
    }

    protected _onItemSelected_ (...ArgList:any[]):void {
      if ((ArgList.length === 1) && (typeof ArgList[0] === 'function')) {
        this._onItemSelected = ArgList[0]
      } else {                                            // callback invocation
        try {
          if (this._onItemSelected != null) { this._onItemSelected.apply(this,ArgList) }
        } catch (Signal:any) {
          setErrorReport(this,{
            Type:'"onItemSelected" Callback Failure',
            Sufferer:this, Message:'' + Signal, Cause:Signal
          })
        }
      }
    }

  /**** onItemDeselected ****/

    protected _onItemDeselected:Function|undefined

    public get onItemDeselected ():Function|undefined { return this._onItemDeselected_ }
    public set onItemDeselected (newCallback:Function|undefined) {
      allowFunction('"onItemDeselected" callback',newCallback)
      this._onItemDeselected = newCallback
    }

    protected _onItemDeselected_ (...ArgList:any[]):void {
      if ((ArgList.length === 1) && (typeof ArgList[0] === 'function')) {
        this._onItemDeselected = ArgList[0]
      } else {                                            // callback invocation
        try {
          if (this._onItemDeselected != null) { this._onItemDeselected.apply(this,ArgList) }
        } catch (Signal:any) {
          setErrorReport(this,{
            Type:'"onItemDeselected" Callback Failure',
            Sufferer:this, Message:'' + Signal, Cause:Signal
          })
        }
      }
    }

  /**** _serializeConfigurationInto ****/

    protected _serializeConfigurationInto (Serialization:Serializable):void {
      super._serializeConfigurationInto(Serialization)

      ;[
        'Placeholder','SelectionLimit',
      ].forEach((Name:string) => this._serializePropertyInto(Name,Serialization))
    }

  /**** _deserializeConfigurationFrom ****/

    protected _deserializeConfigurationFrom (Serialization:Serializable):void {
      super._deserializeConfigurationFrom(Serialization)

      this._Placeholder    = acceptableOptionalTextline(Serialization.Placeholder)
      this._SelectionLimit = acceptableOptionalOrdinal (Serialization.SelectionLimit)
    }

  /**** Renderer ****/

    protected _Renderer = (PropSet:Indexable) => {
      let List              = acceptableList            (this._List, [])
      let ItemRenderer      = acceptableOptionalFunction(this._ItemRenderer)
      let Placeholder       = acceptableTextline        (this._Placeholder,     '(empty)')
      let selectedIndices   = acceptableListSatisfying  (this._selectedIndices, [], ValueIsOrdinal)
      let SelectionLimit    = acceptableOrdinal         (this._SelectionLimit,  1)
      let onClick           = acceptableOptionalFunction(this._onClick)
      let onDblClick        = acceptableOptionalFunction(this._onDblClick)
      let onSelectionChange = acceptableOptionalFunction(this._onSelectionChange)
      let onItemSelected    = acceptableOptionalFunction(this._onItemSelected)
      let onItemDeselected  = acceptableOptionalFunction(this._onItemDeselected)

      if (ItemRenderer == null) {
        ItemRenderer = (Item:any) => html`${Item+''}`
      }

      const selectedIndexSet:Indexable = Object.create(null)
        selectedIndices = selectedIndices.filter((selectedIndex:number) => {
          if (
            (selectedIndex < List.length) &&
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
        this._onSelectionChange_(selectedIndices)

        if (this._onItemDeselected != null) {
          deselectedIndices.forEach((deselectedIndex:number) => {
            this._onItemDeselected_(List[deselectedIndex],deselectedIndex)
          })
        }
      }

      const _onClick = (Event:PointerEvent, Index:number):void => {
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

        if (SelectionChanged && (this._onSelectionChange != null)) {
          this._onSelectionChange_(selectedIndices)
        }

// @ts-ignore TS2454 let's check IF variables were assigned
        if ((IndicesToDeselect != null) && (this._onItemDeselected != null)) {
          IndicesToDeselect.forEach((deselectedIndex:number) => {
            this._onItemDeselected_(List[deselectedIndex],deselectedIndex)
          })
        }

// @ts-ignore TS2454 let's check IF variables were assigned
        if ((IndicesToSelect != null) && (this._onItemSelected != null)) {
          IndicesToSelect.forEach((selectedIndex:number) => {
            this._onItemSelected_(List[selectedIndex],selectedIndex)
          })
        }

        this._onClick_(Event,Index)
      }

      const _onDblClick = (Event:PointerEvent, Index:number):void => {
        this._onDblClick_(Event,Index)
      }

      function ItemIsSelected (Index:number):boolean {
        return (Index in selectedIndexSet)
      }

      return html`<div class="WAT Content ${List.length === 0 ? 'empty' : ''} FlatListView"
        ...${PropSet}
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
  }
  builtInWidgetTypes['FlatListView'] = WAT_FlatListView

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
  `)

/**** nestedListView ****/

  export class WAT_nestedListView extends WAT_Widget {
    public constructor (Page:WAT_Page) { super(Page) }

    public get Type ():string  { return 'nestedListView' }
    public set Type (_:string) { throwReadOnlyError('Type') }



  /**** Renderer ****/

    protected _Renderer = () => {
      return html`<div class="WAT Content nestedListView">${this.Value}</div>`
    }
  }
  builtInWidgetTypes['nestedListView'] = WAT_nestedListView

  appendStyle(`
  .WAT.Widget > .WAT.nestedListView {
  }
  `)

//------------------------------------------------------------------------------
//--                WAT_combinedView (for Applet and Designer)                --
//------------------------------------------------------------------------------

  class WAT_combinedView extends Component {
    public state:Indexable = { Value:0 }

  /**** componentDidMount/WillUnmount ****/

    public componentDidMount ():void    { combinedView = this; rerender() }
    public componentWillUnmount ():void { combinedView = undefined }

  /**** rerender ****/

    public rerender (Visual?:WAT_Visual):void {
// @ts-ignore TS2339 "Value" is a valid property
      (this as Component).setState({ Value:(this as Component).state.Value + 1 })
    }

  /**** render ****/

    public render (PropSet:Indexable):any {
      const Applet = PropSet.Applet as WAT_Applet

      return html`<div style="
        left:0px; top:0px; right:0px; bottom:0px
      ">
        <${WAT_AppletView} Applet=${Applet}/>
        ${Applet.isAttached && DesignerLayer && html`<${DesignerLayer} Applet=${Applet}/>`}
      </div>`
    }
  }

//------------------------------------------------------------------------------
//--                              WAT_AppletView                              --
//------------------------------------------------------------------------------

  class WAT_AppletView extends Component {
    private _Applet:WAT_Applet|undefined

  /**** componentDidMount ****/

    public componentDidMount ():void {
      const Applet = this._Applet as WAT_Applet

      Applet['_View'] = (this as Component).base
      if (Applet['_onMount'] != null) {
        try { Applet['_onMount']() } catch (Signal) { /* nop */ }
      }

      rerender()
    }

  /**** componentWillUnmount ****/

    public componentWillUnmount ():void {
      const Applet = this._Applet as WAT_Applet

      Applet['_View'] = undefined
      if (Applet['_onUnmount'] != null) {
        try { Applet['_onUnmount']() } catch (Signal) { /* nop */ }
      }
    }

  /**** render ****/

    public render (PropSet:Indexable):any {
      const Applet          = this._Applet = PropSet.Applet as WAT_Applet
      const visitedPage     = Applet.visitedPage
      const openDialogs     = (Applet as Indexable)._DialogList
      const lastDialogIndex = openDialogs.length-1
      const needsModalLayer = (openDialogs.length > 0) &&
                              openDialogs[lastDialogIndex].isModal

      const broken = (Applet.isBroken ? 'broken' : '')

      return html`<div class="WAT ${broken} Applet" style="
        ${Applet.CSSStyle}
        left:0px; top:0px; right:0px; bottom:0px;
      ">
        ${Applet.isAttached ? html`
          ${broken === '' ? Applet.Rendering() : ErrorRenderingFor(Applet)}
          ${visitedPage == null
            ? html`<div class="WAT centered" style="width:100%; height:100%"><div>(no page to show)</div></div>`
            : html`<${WAT_PageView} Page=${visitedPage}/>`
          }
        ` : '' }
      </div>
      ${Applet.isAttached && (openDialogs.length > 0) ? html`<div class="WAT DialogLayer">
        ${openDialogs.map((Dialog:WAT_Dialog, Index:number) => html`
          ${(Index === lastDialogIndex) && needsModalLayer ? html`<${WAT_ModalLayer}/>` : ''}
          <${WAT_DialogView} Applet=${Applet} Dialog=${Dialog}/>
        `)}
      </div>`: ''}`
    }
  }

//------------------------------------------------------------------------------
//--                               WAT_PageView                               --
//------------------------------------------------------------------------------

  class WAT_PageView extends Component {
    private _Page:WAT_Page|undefined
    private _shownWidgets:WAT_Widget[] = []

  /**** componentDidMount ****/

    public componentDidMount ():void {
      const Page = this._Page as WAT_Page

      Page['_View'] = (this as Component).base
      if (Page['_onMount'] != null) {
        Page['_onMount']()
      }
    }

  /**** _releaseWidgets ****/

    protected _releaseWidgets (WidgetList:WAT_Widget[]):void {
      WidgetList.forEach((Widget:Indexable) => {
        Widget._Pane = undefined
        if (Widget instanceof WAT_WidgetPane) {
          (Widget as Indexable)._releaseWidgets()
        }
      })
    }

  /**** componentWillUnmount ****/

    public componentWillUnmount ():void {
      this._releaseWidgets(this._shownWidgets)

      const Page = this._Page as WAT_Page

      Page['_View'] = undefined
      if (Page['_onUnmount'] != null) {
        Page['_onUnmount']()
      }
    }

  /**** render ****/

    public render (PropSet:Indexable):any {
      const Page = this._Page = PropSet.Page as WAT_Page

      const broken = (Page.isBroken ? 'broken' : '')

      this._releaseWidgets(this._shownWidgets)

      const WidgetsToShow = (Page.WidgetList as any).filter((Widget:Indexable) => (
        Widget.isVisible && ((Widget._Pane == null) || (Widget._Pane === Page))
      ))
        WidgetsToShow.forEach((Widget:Indexable) => Widget._Pane = Page)
      this._shownWidgets = WidgetsToShow

      return html`<div class="WAT ${broken} Page" style="
        ${Page.CSSStyle}
        left:0px; top:0px; right:0px; bottom:0px
      ">
        ${broken === '' ? Page.Rendering() : ErrorRenderingFor(Page)}
        ${WidgetsToShow.toReversed().map((Widget:WAT_Widget) => {
          return html`<${WAT_WidgetView} Widget=${Widget} Geometry=${Widget.Geometry}/>`
        })}
      </div>`
    }
  }

//------------------------------------------------------------------------------
//--                              WAT_WidgetView                              --
//------------------------------------------------------------------------------

  class WAT_WidgetView extends Component {
    private _Widget:WAT_Widget|undefined

  /**** componentDidMount ****/

    public componentDidMount ():void {
      const Widget = this._Widget as WAT_Widget

      Widget['_View'] = (this as Component).base
      if (Widget['_onMount'] != null) {
        Widget['_onMount']()
      }
    }

  /**** componentWillUnmount ****/

    public componentWillUnmount ():void {
      const Widget = this._Widget as WAT_Widget

      Widget['_View'] = undefined
      if (Widget['_onUnmount'] != null) {
        Widget['_onUnmount']()
      }
    }

  /**** render ****/

    public render (PropSet:Indexable):any {
      const Widget = this._Widget = PropSet.Widget as WAT_Widget

      let { x,y, Width,Height } = PropSet.Geometry
      const CSSGeometry = (
        (x != null) && (Width != null) && (y != null) && (Height != null)
        ? `left:${x}px; top:${y}px; width:${Width}px; height:${Height}px; right:auto; bottom:auto;`
        : ''
      )

      const broken = (Widget.isBroken ? 'broken' : '')

      const openOverlays     = (Widget as Indexable)._OverlayList
      const lastOverlayIndex = openOverlays.length-1

      return html`<div class="WAT ${broken} Widget" style="
        ${Widget.CSSStyle} ${CSSGeometry}
      ">
        ${broken === '' ? Widget.Rendering() : ErrorRenderingFor(Widget)}
      </div>
      ${(broken === '') && (openOverlays.length > 0) ? html`<div class="WAT OverlayLayer"
        style="${CSSGeometry}"
      >
        ${openOverlays.map((Overlay:WAT_Overlay, Index:number) => html`
          ${(Index === lastOverlayIndex)
            ? html`<${WAT_Underlay} Widget=${Widget} Overlay=${Overlay}/>`
            : ''
          }
          <${WAT_OverlayView} Widget=${Widget} Overlay=${Overlay}/>
        `)}
      </div>`: ''}`
    }
  }

//------------------------------------------------------------------------------
//--                              WAT_ModalLayer                              --
//------------------------------------------------------------------------------

  class WAT_ModalLayer extends Component {
    public render (PropSet:Indexable):any {
      const EventTypes = [
        'click', 'dblclick',
        'mousedown', 'mouseup', 'mousemove', 'mouseover', 'mouseout',
        'mouseenter', 'mouseleave',
        'touchstart', 'touchend', 'touchmove', 'touchcancel',
        'pointerdown', 'pointerup', 'pointermove', 'pointerover', 'pointerout',
        'pointerenter', 'pointerleave', 'pointercancel',
        'keydown', 'keyup', 'keypress',
        'wheel', 'contextmenu', 'focus', 'blur'
      ]

      const DOMElement = useRef(null)

      useEffect(() => {
        EventTypes.forEach((EventType:string) => {
          DOMElement.current.addEventListener(EventType,consumeEvent)
        })
        return () => {
          EventTypes.forEach((EventType:string) => {
            DOMElement.current.removeEventListener(EventType,consumeEvent)
          })
        }
      })

      return html`<div class="WAT ModalLayer" ref=${DOMElement}/>`
    }
  }

//------------------------------------------------------------------------------
//--                              WAT_DialogView                              --
//------------------------------------------------------------------------------

  class WAT_DialogView extends Component {
// @ts-ignore TS2564 will be initialized in renderer
    protected _Applet:WAT_Applet
// @ts-ignore TS2564 will be initialized in renderer
    protected _Dialog:WAT_Dialog

    protected _DragInfo:Indexable = {
      Mode:undefined,
      StartX:NaN, StartY:NaN, initialGeometry:undefined
    }
    protected _shownWidgets:WAT_Widget[] = []

  /**** _releaseWidgets ****/

    protected _releaseWidgets ():void {
      this._shownWidgets.forEach((Widget:Indexable) => Widget._Pane = undefined)
    }

  /**** componentWillUnmount ****/

    public componentWillUnmount ():void {
      this._releaseWidgets()
    }

  /**** _GeometryRelativeTo  ****/

    private _GeometryOfWidgetRelativeTo (
      Widget:WAT_Widget, BaseGeometry:WAT_Geometry, PaneGeometry:WAT_Geometry
    ):WAT_Geometry {
      const WidgetAnchors = Widget.Anchors

      const {
        x:WidgetX, y:WidgetY, Width:WidgetWidth, Height:WidgetHeight
      } = Widget.Geometry

      const {
        minWidth,minHeight, maxWidth,maxHeight
      } = Widget

      const { x:BaseX, y:BaseY, Width:BaseWidth, Height:BaseHeight } = BaseGeometry
      const { x:PaneX, y:PaneY, Width:PaneWidth, Height:PaneHeight } = PaneGeometry

      let x:number,y:number, Width:number,Height:number
        switch (WidgetAnchors[0]) {
          case 'left-width':
            x     = WidgetX-BaseX
            Width = WidgetWidth
            break
          case 'width-right':
            x     = PaneWidth - (BaseX+BaseWidth - (WidgetX+WidgetWidth)) - WidgetWidth
            Width = WidgetWidth
            break
          case 'left-right':
            x     = WidgetX-BaseX
            Width = Math.max(minWidth || 0, Math.min(PaneWidth-BaseWidth+WidgetWidth, maxWidth || Infinity))
        }

        switch (WidgetAnchors[1]) {
          case 'top-height':
            y      = WidgetY-BaseY
            Height = WidgetHeight
            break
          case 'height-bottom':
            y      = PaneHeight - (BaseY+BaseHeight - (WidgetY+WidgetHeight)) - WidgetHeight
            Height = WidgetHeight
            break
          case 'top-bottom':
            y      = WidgetY-BaseY
            Height = Math.max(minHeight || 0, Math.min(PaneHeight-BaseHeight+WidgetHeight, maxHeight || Infinity))
        }
// @ts-ignore TS5905 all variables will be assigned by now
      return { x,y, Width,Height }
    }  /**** dialog dragging and resizing ****/

    protected _handleDrag (dx:number,dy:number):void {
      if (this._DragInfo.Mode === 'drag') {
        this._moveDialog(dx,dy)
      } else {
        this._resizeDialog(dx,dy)
      }

      this._Applet.bringDialogToFront(this._Dialog.Name)
      rerender()
    }

    protected _moveDialog (dx:number,dy:number):void {
      this._Dialog.x = this._DragInfo.initialGeometry.x + dx
      this._Dialog.y = this._DragInfo.initialGeometry.y + dy
    }

    protected _resizeDialog (dx:number,dy:number):void {
      const Dialog   = this._Dialog
      const DragInfo = this._DragInfo

      const { minWidth,maxWidth, minHeight,maxHeight } = Dialog

      let newWidth:number = DragInfo.initialGeometry.Width
      switch (DragInfo.Mode) {
        case 'resize-sw':
          newWidth = Math.max(minWidth || 0,Math.min(newWidth-dx,maxWidth || Infinity))
          dx       = newWidth-DragInfo.initialGeometry.Width

          Dialog.x     = DragInfo.initialGeometry.x - dx
          Dialog.Width = DragInfo.initialGeometry.Width+dx
          break
        case 'resize-se':
          Dialog.Width = Math.max(
            minWidth || 0,Math.min(DragInfo.initialGeometry.Width+dx,maxWidth || Infinity)
          )
      }
      Dialog.Height = Math.max(
        minHeight || 0,Math.min(DragInfo.initialGeometry.Height+dy,maxHeight || Infinity)
      )
    }

  /**** generic GestureRecognizer ****/

    protected _Recognizer:any

    protected _installGestureRecognizer ():void {
      if (this._Recognizer != null) { return }

      this._Recognizer = GestureRecognizer({
        onlyFrom:   '.Titlebar,.leftResizer,.middleResizer,.rightResizer',
        neverFrom:  '.CloseButton',
        onDragStart:(dx:number,dy:number, _x:number,_y:number, Event:PointerEvent) => {
          let ClassList = (Event.target as HTMLElement).classList
          switch (true) {
            case ClassList.contains('leftResizer'):   this._DragInfo.Mode = 'resize-sw'; break
            case ClassList.contains('middleResizer'): this._DragInfo.Mode = 'resize-s';  break
            case ClassList.contains('rightResizer'):  this._DragInfo.Mode = 'resize-se'; break
            default:                                  this._DragInfo.Mode = 'drag'
          }

          const { x,y, Width,Height } = this._Dialog
          this._DragInfo.initialGeometry = { x,y, Width,Height }

          this._handleDrag(dx,dy)
        },
        onDragContinuation:(dx:number,dy:number) => this._handleDrag(dx,dy),
        onDragFinish:      (dx:number,dy:number) => this._handleDrag(dx,dy),
        onDragAbortion:    (dx:number,dy:number) => this._handleDrag(dx,dy),
      })
    }

  /**** render ****/

    public render (PropSet:Indexable):any {
      this._releaseWidgets()

      const { Applet, Dialog } = PropSet
        this._Applet = Applet
        this._Dialog = Dialog
      const {
        SourceWidgetPath,
        Title, isClosable, isDraggable, isResizable,
        x,y, Width,Height,
      } = Dialog

      const hasTitlebar = (Title != null) || isDraggable || isClosable

      const resizable    = (isResizable ? 'resizable'    : '')
      const withTitlebar = (hasTitlebar ? 'withTitlebar' : '')

    /**** repositioning on viewport ****/

      const { x:AppletX, y:AppletY } = Applet.Geometry
      let { left,top } = fromDocumentTo('viewport',{
        left:x + AppletX, top:y + AppletY
      })
      left = Math.max(0,Math.min(left,document.documentElement.clientWidth-30))
      top  = Math.max(0,Math.min(top,document.documentElement.clientHeight-30))

    /**** Event Handlers ****/

      this._installGestureRecognizer()
      let Recognizer = this._Recognizer

      const onClose = () => {
        Applet.closeDialog(Dialog.Name)
      }

    /**** ContentPane Rendering ****/

      const SourceWidget = Applet.WidgetAtPath(SourceWidgetPath as WAT_Path)
        if (SourceWidget == null) {
          this._shownWidgets = []
        } else {
          const WidgetsToShow:WAT_Widget[] = (
            SourceWidget.Type === 'Outline'
            ? (SourceWidget as Indexable).bundledWidgets()
            : [SourceWidget]
          ).filter((Widget:Indexable) => (
            Widget.isVisible && ((Widget._Pane == null) || (Widget._Pane === Dialog))
          ))
            WidgetsToShow.forEach((Widget:Indexable) => Widget._Pane = Dialog)
          this._shownWidgets = WidgetsToShow
        }
      const PaneGeometry = { x,y, Width,Height }
        if (hasTitlebar) { PaneGeometry.Height -= 30 }
        if (isResizable) { PaneGeometry.Height -= 10 }
        PaneGeometry.Height = Math.max(0,PaneGeometry.Height)
      const BaseGeometry = SourceWidget.Geometry

      let ContentPane:any[] = (this._shownWidgets as any).toReversed().map(
        (Widget:WAT_Widget) => {
          let Geometry = this._GeometryOfWidgetRelativeTo(Widget,BaseGeometry,PaneGeometry)
          return html`<${WAT_WidgetView} Widget=${Widget} Geometry=${Geometry}/>`
        }
      )

    /**** actual dialog rendering ****/

      return html`<div class="WAT ${resizable} Dialog ${withTitlebar}" style="
        left:${left}px; top:${top}px; width:${Width}px; height:${Height}px;
      ">
        ${hasTitlebar && html`<div class="Titlebar"
          onPointerDown=${Recognizer} onPointerUp=${Recognizer}
          onPointerMove=${Recognizer} onPointerCancel=${Recognizer}
        >
          <div class="Title">${Title}</div>

          ${(isClosable) && html`
            <img class="CloseButton" src="${IconFolder}/xmark.png" onClick=${onClose}/>
          `}
        </div>`}

        <div class="ContentPane">${ContentPane}</div>

        ${isResizable && html`
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
      </div>`
    }
  }

//------------------------------------------------------------------------------
//--                               WAT_Underlay                               --
//------------------------------------------------------------------------------

  class WAT_Underlay extends Component {
    public render (PropSet:Indexable):any {
      const { Widget, Overlay } = PropSet

      const EventTypes = [
        'click', 'dblclick',
        /*'mousedown',*/ 'mouseup', 'mousemove', 'mouseover', 'mouseout',
        'mouseenter', 'mouseleave',
        /*'touchstart',*/ 'touchend', 'touchmove', 'touchcancel',
        /*'pointerdown',*/ 'pointerup', 'pointermove', 'pointerover', 'pointerout',
        'pointerenter', 'pointerleave', 'pointercancel',
        'keydown', 'keyup', 'keypress',
        'wheel', 'contextmenu', 'focus', 'blur'
      ]

      const DOMElement = useRef(null)

      useEffect(() => {
        EventTypes.forEach((EventType:string) => {
          DOMElement.current.addEventListener(EventType,consumeEvent)
        })
        return () => {
          EventTypes.forEach((EventType:string) => {
            DOMElement.current.removeEventListener(EventType,consumeEvent)
          })
        }
      })

      const handleEvent = useCallback((Event:Event) => {
        consumeEvent(Event)
        if (! Overlay.isModal) { Widget.closeOverlay(Overlay.Name) }
      })

      const modal = (Overlay.isModal ? 'modal' : '')

      return html`<div class="WAT ${modal} Underlay" ref=${DOMElement}
        onMouseDown=${handleEvent} onPointerDown=${handleEvent}
        onTouchStart=${handleEvent}
      />`
    }
  }

//------------------------------------------------------------------------------
//--                             WAT_OverlayView                              --
//------------------------------------------------------------------------------

  class WAT_OverlayView extends Component {
    protected _shownWidgets:WAT_Widget[] = []

  /**** _releaseWidgets ****/

    protected _releaseWidgets ():void {
      this._shownWidgets.forEach((Widget:Indexable) => Widget._Pane = undefined)
    }

  /**** componentWillUnmount ****/

    public componentWillUnmount ():void {
      this._releaseWidgets()
    }

  /**** _GeometryRelativeTo  ****/

    private _GeometryOfWidgetRelativeTo (
      Widget:WAT_Widget, BaseGeometry:WAT_Geometry, PaneGeometry:WAT_Geometry
    ):WAT_Geometry {
      const WidgetAnchors = Widget.Anchors

      const {
        x:WidgetX, y:WidgetY, Width:WidgetWidth, Height:WidgetHeight
      } = Widget.Geometry

      const {
        minWidth,minHeight, maxWidth,maxHeight
      } = Widget

      const { x:BaseX, y:BaseY, Width:BaseWidth, Height:BaseHeight } = BaseGeometry
      const { x:PaneX, y:PaneY, Width:PaneWidth, Height:PaneHeight } = PaneGeometry

      let x:number,y:number, Width:number,Height:number
        switch (WidgetAnchors[0]) {
          case 'left-width':
            x     = WidgetX-BaseX
            Width = WidgetWidth
            break
          case 'width-right':
            x     = PaneWidth - (BaseX+BaseWidth - (WidgetX+WidgetWidth)) - WidgetWidth
            Width = WidgetWidth
            break
          case 'left-right':
            x     = WidgetX-BaseX
            Width = Math.max(minWidth || 0, Math.min(PaneWidth-BaseWidth+WidgetWidth, maxWidth || Infinity))
        }

        switch (WidgetAnchors[1]) {
          case 'top-height':
            y      = WidgetY-BaseY
            Height = WidgetHeight
            break
          case 'height-bottom':
            y      = PaneHeight - (BaseY+BaseHeight - (WidgetY+WidgetHeight)) - WidgetHeight
            Height = WidgetHeight
            break
          case 'top-bottom':
            y      = WidgetY-BaseY
            Height = Math.max(minHeight || 0, Math.min(PaneHeight-BaseHeight+WidgetHeight, maxHeight || Infinity))
        }
// @ts-ignore TS5905 all variables will be assigned by now
      return { x,y, Width,Height }
    }

  /**** render ****/

    public render (PropSet:Indexable):any {
      this._releaseWidgets()

      const { Widget, Overlay } = PropSet
      const { SourceWidgetPath, x,y, Width,Height } = Overlay

    /**** repositioning on viewport ****/

      const { x:AppletX, y:AppletY } = Widget.Applet.Geometry
      const { x:WidgetX, y:WidgetY } = Widget.Geometry
      let { left,top } = fromDocumentTo('viewport',{
        left:x + WidgetX+AppletX, top:y + WidgetY+AppletY
      })
      left = Math.max(0,Math.min(left,document.documentElement.clientWidth-30))
      top  = Math.max(0,Math.min(top,document.documentElement.clientHeight-30))

    /**** onClose ****/

      const onClose = () => {
        Widget.closeOverlay(Overlay.Name)
      }

    /**** ContentPane Rendering ****/

      const SourceWidget = Widget.Applet.WidgetAtPath(SourceWidgetPath as WAT_Path)
        if (SourceWidget == null) {
          this._shownWidgets = []
        } else {
          const WidgetsToShow:WAT_Widget[] = (
            SourceWidget.Type === 'Outline'
            ? (SourceWidget as Indexable).bundledWidgets()
            : [SourceWidget]
          ).filter((Widget:Indexable) => (
            Widget.isVisible && ((Widget._Pane == null) || (Widget._Pane === Overlay))
          ))
            WidgetsToShow.forEach((Widget:Indexable) => Widget._Pane = Overlay)
          this._shownWidgets = WidgetsToShow
        }
      const PaneGeometry = { x,y, Width,Height }
      const BaseGeometry = SourceWidget.Geometry

      let ContentPane:any[] = (this._shownWidgets as any).toReversed().map(
        (Widget:WAT_Widget) => {
          let Geometry = this._GeometryOfWidgetRelativeTo(Widget,BaseGeometry,PaneGeometry)
          return html`<${WAT_WidgetView} Widget=${Widget} Geometry=${Geometry}/>`
        }
      )

    /**** actual overlay rendering ****/

      return html`<div class="WAT Overlay" style="
        left:${left}px; top:${top}px; width:${Width}px; height:${Height}px;
      ">
        ${ContentPane}
      </div>`
    }
  }

/**** consume/consumingEvent ****/

  function consumeEvent (Event:Event):void {
    Event.stopPropagation()
    Event.preventDefault()
  }
  const consumingEvent = consumeEvent

/**** rerender ****/

  let combinedView:WAT_combinedView|undefined = undefined

  export function rerender ():void {
    if (combinedView != null) { combinedView.rerender() }
  }/**** useDesigner ****/

  let DesignerLayer:Function|undefined = undefined

  export function useDesigner (newDesigner:Component):void {
    allowFunction('WAT designer',newDesigner)// it's a preact function component

    console.log('installing WebApp Tinkerer Designer')

    DesignerLayer = newDesigner
    rerender()
  }

//------------------------------------------------------------------------------
//--                               WAT Startup                                --
//------------------------------------------------------------------------------

  let AppletStore:any

/**** startup ****/

  function startup ():void {
    localforage.ready(function () {
      AppletStore = localforage.createInstance({
        name:'WebApp Tinkerer'
      })

      startWAT()
    })
  }

/**** startWAT ****/

  async function startWAT ():Promise<void> {
    console.log('starting WebApp Tinkerer Runtime...')

  /**** find rendering target (with applet name) ****/

    let AppletElement = document.body.querySelector('div[type="wat/applet"]')
    if (AppletElement == null) {
      AppletElement = document.createElement('div')
        AppletElement.setAttribute('type','wat/applet')
        AppletElement.classList.add('fullscreen')
      document.body.appendChild(AppletElement)
    }

    let AppletName = acceptableName(AppletElement.getAttribute('name'),'WAT-Applet')

  /**** read applet script - if stored separately ****/

    let ScriptElement = document.querySelector('script[type="wat/applet-script"]')

  /**** deserialize applet ****/

    let SerializationElement = document.querySelector('script[type="wat/applet"]')

    let Applet:WAT_Applet|undefined = undefined
      let Serialization = await AppletStore.getItem(AppletName)
      if (Serialization != null) {
        try {
          Applet = WAT_Applet.deserializedFrom(Serialization)
        } catch (Signal:any) {
          console.error(`could not deserialize applet ${quoted(AppletName)} from backup`, Signal)
        }
      }

      if ((Applet == null) && (SerializationElement != null)) {
        Serialization = SerializationElement.textContent || ''
        if (ScriptElement != null) {
          Serialization.activeScript = ScriptElement.textContent || ''
        }

        try {
          Applet = WAT_Applet.deserializedFrom(Serialization)
        } catch (Signal:any) {
          console.error(`could not deserialize applet ${quoted(AppletName)}`, Signal)
        }
      }
    if (Applet == null) {
      Applet = WAT_Applet.deserializedFrom('{"PageList":[{ "WidgetList":[] }]}')
    }

    (Applet as Indexable)._Name = AppletName
    if (Applet.visitedPage == null) {
      Applet.visitPage(Applet.PageList[0])
    }

  /**** finally render the applet ****/

    AppletElement.innerHTML = ''
    render(html`<${WAT_combinedView} Applet=${Applet}/>`,AppletElement)

  /**** rerender whenever window is changed ****/

    window.addEventListener('resize', rerender)

;(window as Indexable).Applet = Applet // for testing and debugging purposes only

    console.log('WebApp Tinkerer Runtime is operational')
  }

/**** IdOfWidget ****/

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

/**** start WAT up ****/

  localforage.config({
    driver: [localforage.INDEXEDDB, localforage.WEBSQL]
  })

  if (document.readyState === 'loading') {
    window.addEventListener('DOMContentLoaded', startup)
  } else {
    startup()
  }
