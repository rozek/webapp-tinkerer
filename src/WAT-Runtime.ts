/*******************************************************************************
*                                                                              *
*                        WebApp Tinkerer (WAT) Runtime                         *
*                                                                              *
*******************************************************************************/

  const IconFolder = 'https://rozek.github.io/webapp-tinkerer/icons'

  declare const download:Function
  declare const localforage:any

  import {
    ObjectMergedWith as Object_assign,
//  throwError,
    quoted, escaped,
    ValuesAreEqual, ValuesDiffer,
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
    allowBoolean, expectBoolean,
    allowNumber, expectNumber, allowFiniteNumber, allowNumberInRange,
      allowInteger, expectInteger, allowIntegerInRange,
      allowOrdinal, expectCardinal,
    allowString, expectString, allowStringMatching,
      allowText, expectText, allowTextline, expectTextline,
    expectPlainObject,
    expectList, allowListSatisfying, expectListSatisfying,
    allowFunction, expectFunction,
    allowOneOf, expectOneOf,
    allowColor, allowEMailAddress, /*allowPhoneNumber,*/ allowURL,
    HexColor,
  } from 'javascript-interface-library'
  import * as JIL from 'javascript-interface-library'

  const ValueIsPhoneNumber = ValueIsTextline // *C* should be implemented
  const allowPhoneNumber   = allowTextline   // *C* should be implemented

  import {
    render, html, Component, createRef,
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

/**** generic class type ****/

  type Class<T> = new (...ArgList:any[]) => T

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

  export type WAT_Identifier = string         // mainly for illustrative reasons
  export type WAT_Name       = string                                    // dto.
  export type WAT_Path       = string                                    // dto.
  export type WAT_Behavior   = string                                    // dto.
  export type WAT_Ordinal    = number                                    // dto.
  export type WAT_Cardinal   = number                                    // dto.
  export type WAT_Text       = string                                    // dto.
  export type WAT_Textline   = string                                    // dto.
  export type WAT_URL        = string                                    // dto.
  export type WAT_Color      = string                                    // dto.

/**** WAT Visual Categories ****/

  const WAT_Categories = [ 'applet','page','widget' ]
  type  WAT_Category   = typeof WAT_Categories[number]

/**** WAT Visual Behaviors ****/

  type WAT_BehaviorSpecification = {       // specification of a single behavior
    Category:    WAT_Category,
    Name:        WAT_Behavior,
    activeScript:WAT_Text,
  }
  type WAT_BehaviorSpecificationSet = { [Behavior:string]:WAT_BehaviorSpecification }

  type WAT_BehaviorFunction = (
    this:Indexable, me:Indexable, my:Indexable,
    html:Function, reactively:Function,
    on:Function, onRender:Function, onMount:Function, onUpdate:Function, onUnmount:Function,
    onValueChange:Function,
    installStylesheet:Function, BehaviorIsNew:boolean
  ) => Promise<void>

  type WAT_BehaviorRegistration = WAT_BehaviorSpecification & {
    isNew:boolean,
    pendingScript?:WAT_Text, pendingError?:any,
    Error:any,
    compiledScript:WAT_BehaviorFunction,
  }
  type WAT_BehaviorRegistry = { [Behavior:string]:WAT_BehaviorRegistration }
  type WAT_BehaviorPool = {
    applet:WAT_BehaviorRegistry,
    page:  WAT_BehaviorRegistry,
    widget:WAT_BehaviorRegistry,
  }

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

  export const WAT_Orientations = [ 'any','portrait','landscape' ]
  export type  WAT_Orientation  = typeof WAT_Orientations[number]

/**** configuration-related types ****/

  export const WAT_Overflows = ['visible','hidden','scroll','auto']
  export type  WAT_Overflow  = typeof WAT_Overflows[number]

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
    'missing Behaviour',
    'Behaviour Compilation Failure','Behaviour Execution Failure',
    'Script Compilation Failure',   'Script Execution Failure',
    '"Value" Setting Failure',      'Rendering Failure',
    'Callback Failure',             'Reactivity Failure',
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
    asAppletOverlay?:boolean, fromRight?:boolean, fromBottom?:boolean,
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

/**** allowValue ****/

  export function allowValue (
    Description:string, Value:any, Validator?:Function
  ):any {
    if (Value == null) {
      return undefined
    } else {
      return expectValue(Description,Value,Validator)
    }
  }

/**** expectValue ****/

  export function expectValue (
    Description:string, Value:any, Validator?:Function
  ):any {
    if (Value == null) {
      throwError(`MissingArgument: no ${Description} given`)
    }

    if ((Validator == null) || (Validator(Value) === true)) {
      return Value
    } else {
      throwError(`InvalidArgument: the given ${Description} is invalid`)
    }
  }

/**** ValueIsIdentifier ****/

  const WAT_IdentifierPattern = /^[a-z$_][a-z$_0-9]*$/i

  export function ValueIsIdentifier (Value:any):boolean {
    return ValueIsStringMatching(Value, WAT_IdentifierPattern)
  }

/**** allow/expect[ed]Identifier ****/

  export const allowIdentifier = ValidatorForClassifier(
    ValueIsIdentifier, acceptNil, 'WAT identifier'
  ), allowedIdentifier = allowIdentifier

  export const expectIdentifier = ValidatorForClassifier(
    ValueIsIdentifier, rejectNil, 'WAT identifier'
  ), expectedIdentifier = expectIdentifier

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

/**** ValueIsCategory ****/

  export function ValueIsCategory (Value:any):boolean {
    return ValueIsOneOf(Value, WAT_Categories)
  }

/**** allow/expect[ed]Category ****/

  export const allowCategory = ValidatorForClassifier(
    ValueIsCategory, acceptNil, 'WAT behavior category'
  ), allowedCategory = allowCategory

  export const expectCategory = ValidatorForClassifier(
    ValueIsCategory, rejectNil, 'WAT behavior category'
  ), expectedCategory = expectCategory

/**** ValueIsBehavior ****/

  const WAT_BehaviorPattern = /^[a-z][a-z0-9_]*(\.[a-z0-9_]+)+$/i

  export function ValueIsBehavior (Value:any):boolean {
    return (
      ValueIsStringMatching(Value,WAT_BehaviorPattern) &&
      (Value.trim() === Value)
    )
  }

/**** allow/expect[ed]Behavior ****/

  export const allowBehavior = ValidatorForClassifier(
    ValueIsBehavior, acceptNil, 'WAT behavior name'
  ), allowedBehavior = allowBehavior

  export const expectBehavior = ValidatorForClassifier(
    ValueIsBehavior, rejectNil, 'WAT behavior name'
  ), expectedBehavior = expectBehavior

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

/**** ValueIsListOf ****/

  export function ValueIsListOf (Value:any, ValueList:any[]):boolean {
    return ValueIsListSatisfying(Value,(Value:any) => ValueIsOneOf(Value,ValueList))
  }

/**** allow/expect[ed]ListOf ****/

  export function allowListOf (
    Description:string, Argument:any, ValueList:any[]
  ):number[]|null|undefined {
    return (Argument == null
      ? Argument
      : expectedListOf(Description, Argument, ValueList)
    )
  }
  export const allowedListOf = allowListOf

  export function expectListOf (
    Description:string, Argument:any, ValueList:any[]
  ):number[] {
    if (Argument == null) {
      throwError(`MissingArgument: no ${escaped(Description)} given`)
    } else {
      if (ValueIsListSatisfying(Argument,(Value:any) => ValueIsOneOf(Value,ValueList))) {
        return Argument
      } else {
        throwError(`InvalidArgument: the given value is no ${escaped(Description)}`)
      }
    }
  }
  export const expectedListOf = expectListOf

/**** ValueIsJSON ****/

  export function ValueIsJSON (Value:any):boolean {
    try {
      return ValueIsText(Value) && (JSON.parse(Value) !== undefined)  // tricky!
    } catch (Signal) { return false }
  }

/**** allow/expect[ed]JSON ****/

  export const allowJSON = ValidatorForClassifier(
    ValueIsJSON, acceptNil, 'JSON string'
  ), allowedJSON = allowJSON

  export const expectJSON = ValidatorForClassifier(
    ValueIsJSON, rejectNil, 'JSON string'
  ), expectedJSON = expectJSON

/**** ValueIsLineList ****/

  export function ValueIsLineList (Value:any, Pattern:RegExp|undefined):boolean {
    const Validator = (
      Pattern == null
      ? ValueIsTextline
      : (Value:any) => ValueIsStringMatching(Value,Pattern)
    )
    return ValueIsListSatisfying(Value,Validator)
  }

/**** allow/expect[ed]LineList ****/

  export function allowLineList (
    Description:string, Argument:any, Pattern:RegExp|undefined
  ):number|null|undefined {
    return (Argument == null
      ? Argument
      : expectedLineList(Description, Argument, Pattern)
    )
  }
  export const allowedLineList = allowLineList

  export function expectLineList (
    Description:string, Argument:any, Pattern:RegExp|undefined
  ):number[] {
    if (Argument == null) {
      throwError(`MissingArgument: no ${escaped(Description)} given`)
    } else {
      const Validator = (
        Pattern == null
        ? ValueIsTextline
        : (Value:any) => ValueIsStringMatching(Value,Pattern)
      )
      if (ValueIsListSatisfying(Argument,Validator)) {
        return Argument
      } else {
        throwError(`InvalidArgument: the given value is no ${escaped(Description)}`)
      }
    }
  }
  export const expectedLineList = expectLineList

/**** ValueIsNumberList ****/

  export function ValueIsNumberList (
    Value:any, minValue?:number, maxValue?:number, withMin?:boolean, withMax?:boolean
  ):boolean {
    const Validator = (
      (minValue == null) && (maxValue == null)
      ? ValueIsNumber
      : (Value:any) => ValueIsNumberInRange(Value, minValue,maxValue, withMin,withMax)
    )
    return ValueIsListSatisfying(Value,Validator)
  }

/**** allow/expect[ed]NumberList ****/

  export function allowNumberList (
    Description:string, Argument:any,
    minValue?:number, maxValue?:number, withMin?:boolean, withMax?:boolean
  ):number[]|null|undefined {
    return (Argument == null
      ? Argument
      : expectedNumberList(Description, Argument, minValue,maxValue, withMin,withMax)
    )
  }
  export const allowedNumberList = allowNumberList

  export function expectNumberList (
    Description:string, Argument:any,
    minValue?:number, maxValue?:number, withMin?:boolean, withMax?:boolean
  ):number[] {
    if (Argument == null) {
      throwError(`MissingArgument: no ${escaped(Description)} given`)
    } else {
      const Validator = (
        (minValue == null) && (maxValue == null)
        ? ValueIsNumber
        : (Value:any) => ValueIsNumberInRange(Value, minValue,maxValue, withMin,withMax)
      )
      if (ValueIsListSatisfying(Argument,Validator)) {
        return Argument
      } else {
        throwError(`InvalidArgument: the given value is no ${escaped(Description)}`)
      }
    }
  }
  export const expectedNumberList = expectNumberList

/**** ValueIsIntegerList ****/

  export function ValueIsIntegerList (
    Value:any, minValue?:number, maxValue?:number
  ):boolean {
    const Validator = (
      (minValue == null) && (maxValue == null)
      ? ValueIsInteger
      : (Value:any) => ValueIsIntegerInRange(Value, minValue,maxValue)
    )
    return ValueIsListSatisfying(Value,Validator)
  }

/**** allow/expect[ed]IntegerList ****/

  export function allowIntegerList (
    Description:string, Argument:any, minValue?:number, maxValue?:number
  ):number[]|null|undefined {
    return (Argument == null
      ? Argument
      : expectedIntegerList(Description, Argument, minValue,maxValue)
    )
  }
  export const allowedIntegerList = allowIntegerList

  export function expectIntegerList (
    Description:string, Argument:any,
    minValue?:number, maxValue?:number
  ):number[] {
    if (Argument == null) {
      throwError(`MissingArgument: no ${escaped(Description)} given`)
    } else {
      const Validator = (
        (minValue == null) && (maxValue == null)
        ? ValueIsInteger
        : (Value:any) => ValueIsIntegerInRange(Value, minValue,maxValue)
      )
      if (ValueIsListSatisfying(Argument,Validator)) {
        return Argument
      } else {
        throwError(`InvalidArgument: the given value is no ${escaped(Description)}`)
      }
    }
  }
  export const expectedIntegerList = expectIntegerList

/**** acceptableValue ****/

  export function acceptableValue (
    Value:any, Validator:Function, Default?:any
  ):any {
    return (Validator(Value) === true ? Value : Default)
  }

//------------------------------------------------------------------------------
//--                           Stylesheet Handling                            --
//------------------------------------------------------------------------------

  let WATStyleElement = document.getElementById('WAT-Stylesheet')
  if (WATStyleElement == null) {
    WATStyleElement = document.createElement('style')
      WATStyleElement.id          = 'WAT-Stylesheet'
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

/**** "Placeholders" are not yet ready for rendering ****/

  .WAT.Placeholder {
    background-image:repeating-linear-gradient(-45deg,
      rgba(222,222,222, 1) 0px, rgba(222,222,222, 1) 4px,
      rgba(0,0,0, 0) 4px, rgba(0,0,0, 0) 8px
    ); background-size:11.31px 11.31px;
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

/**** AppletOverlay ****/

  .WAT.AppletOverlay {
    display:block; position:absolute;
    z-index:1000000;
    pointer-events:auto;
  }
  .WAT.AppletOverlay > .ContentPane {
    display:block; position:absolute; overflow:visible;
    left:0px; top:0px; right:0px; bottom:0px;
    border:none;
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
  }/**** Mover, Resizer ****/

  .WAT.Mover, .WAT.Resizer, .WAT.Dragger {
    display:block; position:absolute;
    background:none;
    user-select:none; pointer-events:auto;

    -webkit-touch-callout:none;
    -ms-touch-action:none; touch-action:none;
  }

/**** Shaper ****/

  .WAT.Shaper {
    display:block; position:absolute; overflow:visible;
    left:0px; top:0px; right:0px; bottom:0px;
    outline:dotted 2px orangered;
    background:none;
    user-select:none; pointer-events:none;

    -webkit-touch-callout:none;
    -ms-touch-action:none; touch-action:none;
  }

  .WAT.ShaperHandle {
    display:block; position:absolute;
    width:8px; height:8px;
    background:orangered; border:solid 1px darkgray;
    z-index:100000;
    user-select:none; pointer-events:auto;

    -webkit-touch-callout:none;
    -ms-touch-action:none; touch-action:none;
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

`.trimLeft()
    document.head.appendChild(WATStyleElement)
  }

/**** installStylesheetForBehavior ****/

  function installStylesheetForBehavior (
    Applet:WAT_Applet, Category:WAT_Category, Behavior:WAT_Behavior,
    Stylesheet:WAT_Text|undefined
  ):void {
    allowText('stylesheet',Stylesheet)

// @ts-ignore TS7053 allow indexing
    let Registration = Applet._BehaviorPool[Category][Behavior.toLowerCase()]
    if (Registration == null) throwError(
      `InternalError: no registration for ${Category} behaviour ${quoted(Behavior)} found`
    )

    if (! Registration.isNew) { return }

    const StylesheetId = `WAT-Stylesheet_for_${Category}_Behavior_${Behavior}`
    if ((Stylesheet == null) || (Stylesheet.trim() === '')) {
      let StyleElement = document.getElementById(StylesheetId)
      if (StyleElement != null) { StyleElement.remove() }
    } else {
      let StyleElement = document.getElementById(StylesheetId)
      if (StyleElement == null) {
        StyleElement = document.createElement('style')
          StyleElement.id = StylesheetId
        document.head.appendChild(StyleElement)
      }
      StyleElement.textContent = Stylesheet
    }
  }

/**** uninstallStylesheetForBehavior ****/

  function uninstallStylesheetForBehavior (
    Applet:WAT_Applet, Category:WAT_Category, Behavior:WAT_Behavior
  ):void {
    const StylesheetId = `WAT-Stylesheet_for_${Category}_Behavior_${Behavior.toLowerCase()}`

    let StyleElement = document.getElementById(StylesheetId)
    if (StyleElement != null) { StyleElement.remove() }
  }

//------------------------------------------------------------------------------
//--                             Behavior Support                             --
//------------------------------------------------------------------------------

/**** BehaviorIsIntrinsic ****/

  export function BehaviorIsIntrinsic (Behavior:WAT_Behavior):boolean {
    expectBehavior('behavior',Behavior)
    return /^(basic|native|traditional|mobile|wearable)_controls\./.test(Behavior.toLowerCase())
  }

/**** registerIntrinsicBehavior ****/

  function registerIntrinsicBehavior (
    Applet:WAT_Applet, Category:WAT_Category, Name:WAT_Behavior,
    compiledScript:Function
  ):void {
    expectApplet             ('applet',Applet)
    expectCategory('behavior category',Category)
    expectBehavior         ('behavior',Name)
    expectFunction('behavior function',compiledScript)

    const normalizedName = Name.toLowerCase()
// @ts-ignore TS7053 allow indexing
    if (Applet._BehaviorPool[Category][normalizedName] != null) throwError(
      `InvalidArgument:a behaviour for ${Category}s with the name ${Name} has already been registered`
    )

    const activeScript = compiledScript.toString()
      .replace(/^[^\n]+\n/,'')       // removes first line (i.e., function head)
      .replace(/\n[^\n]+$/,'')          // removes last line (with trailing "}")

// @ts-ignore TS7053 allow indexing
    Applet._BehaviorPool[Category][normalizedName] = {
      Category, Name, activeScript, compiledScript, isNew:true
    }
  }

/**** brokenBehavior ****/

  async function brokenBehavior (Visual:WAT_Visual):Promise<void> {
    const Applet   = Visual.Applet as WAT_Applet
    const Category = Visual.Category
    const Behavior = Visual.Behavior as WAT_Behavior
// @ts-ignore TS7053 allow indexing
    const Signal   = Applet._BehaviorPool[Category][Behavior.toLowerCase()].Error

    setErrorReport(Visual,{
      Type:'Behaviour Compilation Failure',
      Sufferer:Visual, Message:'' + Signal, Cause:Error
    })
  }

/**** missingBehavior ****/

  function missingBehavior (Visual:WAT_Visual):void {
    setErrorReport(Visual,{
      Type:'missing Behaviour',
      Sufferer:Visual, Message:`missing Behaviour ${quoted(Visual.Behavior as WAT_Behavior)}`, Cause:undefined
    })
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
  ]
  export type WAT_PropertyEditorType = typeof WAT_PropertyEditorTypes[number]

  export const WAT_PropertyContainerTypes = ['none','observed','memoized']
  export type  WAT_PropertyContainerType  = typeof WAT_PropertyContainerTypes[number]

  export type WAT_PropertyDescriptor = {
    Name:WAT_Identifier, Label:WAT_Textline,
    EditorType:WAT_PropertyEditorType, readonly?:boolean, Validator?:Function,
    Default?:any, AccessorsFor?:WAT_PropertyContainerType, withCallback?:boolean
  } & {                              // plus additional editor-specific elements
    Placeholder?:WAT_Textline,
    FalseValue?:WAT_Textline, TrueValue?:WAT_Textline,
    minLength?:number, maxLength?:number,
    multiple?:boolean, Pattern?:WAT_Textline,
    minValue?:any, maxValue?:any, Stepping?:'any'|number,
    Resizability?:'none'|'horizontal'|'vertical'|'both',
    LineWrapping?:boolean, SpellChecking?:boolean,
    Hashmarks?:any[], Suggestions?:string[], ValueList?:any[]
  }

/**** forbiddenPropertyNames ****/

  const forbiddenPropertyNames:Indexable = Object.create(null)

  function collectInternalNames ():void {
    Object.assign(forbiddenPropertyNames,{
      mount:true, unmount:true, render:true,         // intrinsic callback names
      input:true, click:true, dblclick:true,
      drop:true
    })

// @ts-ignore TS2345 allow abstract class as argument
    collectInternalNamesFrom(WAT_Visual)
    collectInternalNamesFrom(WAT_Applet)
    collectInternalNamesFrom(WAT_Page)
    collectInternalNamesFrom(WAT_Widget)

    delete forbiddenPropertyNames['Value']          // "Value" may be customized
  }

  function collectInternalNamesFrom (WAT_Class:Class<any>):void {
    Object.getOwnPropertyNames(WAT_Class.prototype).forEach((Name:string) => {
      if (! Name.startsWith('_')) { forbiddenPropertyNames[Name] = true }
    })
  }

/**** validatePropertyName ****/

  function validatePropertyName (Name:WAT_Identifier):void {
    if (Name in forbiddenPropertyNames) throwError(
      'InvalidArgument: forbidden property name ' + quoted(Name)
    )
  }

/**** ValueIsPropertyDescriptor ****/

  function ValueIsPropertyDescriptor (Value:any):boolean {
    if (
      ! ValueIsPlainObject(Value) ||
      ! ValueIsIdentifier(Value.Name) ||
      (Value.Name in forbiddenPropertyNames) ||
      (Value.Label != null) && ! ValueIsTextline(Value.Label) ||
      (Value.EditorType == null) ||
      ! ValueIsOneOf(Value.EditorType,WAT_PropertyEditorTypes) ||
      (Value.AccessorsFor != null) && ! ValueIsOneOf(Value.AccessorsFor,WAT_PropertyContainerTypes) ||
      (Value.Validator    != null) && ! ValueIsFunction(Value.Validator) ||
      (Value.readonly     != null) && ! ValueIsBoolean(Value.readonly)   ||
      (Value.withCallback != null) && ! ValueIsBoolean(Value.withCallback)
    ) { return false }

  /**** validate editor-specific settings ****/

    const {
      EditorType,
      Placeholder, FalseValue,TrueValue, minLength,maxLength,multiple,Pattern,
      minValue,maxValue,Stepping, Resizability,LineWrapping,
      SpellChecking, ValueList, Hashmarks, Suggestions
    } = Value
    switch (EditorType) {
      case 'checkbox':
        break
      case 'choice':                       // drop-down for boolean properties
        if (! ValueIsTextline(FalseValue) || ! ValueIsTextline(TrueValue)) {
          return false
        }
        break
      case 'textline-input':
      case 'password-input':
      case 'email-address-input':
      case 'phone-number-input':
      case 'url-input':
      case 'search-input':
        if (
          (Placeholder   != null) && ! ValueIsTextline(Placeholder) ||
          (minLength     != null) && ! ValueIsOrdinal(minLength) ||
          (maxLength     != null) && ! ValueIsOrdinal(maxLength) ||
          (multiple      != null) && ! ValueIsBoolean(multiple) && (EditorType === 'email-address-input') ||
          (SpellChecking != null) && ! ValueIsBoolean(SpellChecking) && (EditorType === 'textline-input') ||
          (Pattern       != null) && ! ValueIsTextline(Pattern) ||
          (Suggestions   != null) && ! ValueIsListSatisfying(Suggestions,ValueIsTextline)
        ) { return false }
        break
      case 'number-input':
      case 'integer-input':
        if (
          (Placeholder != null) && ! ValueIsTextline(Placeholder)  ||
          (minValue    != null) && ! ValueIsFiniteNumber(minValue) ||
          (maxValue    != null) && ! ValueIsFiniteNumber(maxValue) ||
          (Stepping    != null) && ! ValueIsNumberInRange(Stepping, 0,Infinity, false) && (Stepping !== 'any') ||
          (Suggestions != null) && ! ValueIsListSatisfying(Suggestions,ValueIsFiniteNumber)
        ) { return false }
        break
      case 'time-input':
        if (
          (minValue    != null) && ! ValueIsStringMatching(minValue,WAT_TimeRegExp) ||
          (maxValue    != null) && ! ValueIsStringMatching(maxValue,WAT_TimeRegExp) ||
          (Suggestions != null) && ! ValueIsListSatisfying(Suggestions,WAT_TimeMatcher)
        ) { return false }
        break
      case 'date-time-input':
        if (
          (minValue    != null) && ! ValueIsStringMatching(minValue,WAT_DateTimeRegExp) ||
          (maxValue    != null) && ! ValueIsStringMatching(maxValue,WAT_DateTimeRegExp) ||
          (Suggestions != null) && ! ValueIsListSatisfying(Suggestions,WAT_DateTimeMatcher)
        ) { return false }
        break
      case 'date-input':
        if (
          (minValue    != null) && ! ValueIsStringMatching(minValue,WAT_DateRegExp) ||
          (maxValue    != null) && ! ValueIsStringMatching(maxValue,WAT_DateRegExp) ||
          (Suggestions != null) && ! ValueIsListSatisfying(Suggestions,WAT_DateMatcher)
        ) { return false }
        break
      case 'month-input':
        if (
          (minValue    != null) && ! ValueIsStringMatching(minValue,WAT_MonthRegExp) ||
          (maxValue    != null) && ! ValueIsStringMatching(maxValue,WAT_MonthRegExp) ||
          (Suggestions != null) && ! ValueIsListSatisfying(Suggestions,WAT_MonthMatcher)
        ) { return false }
        break
      case 'week-input':
        if (
          (minValue    != null) && ! ValueIsStringMatching(minValue,WAT_WeekRegExp) ||
          (maxValue    != null) && ! ValueIsStringMatching(maxValue,WAT_WeekRegExp) ||
          (Suggestions != null) && ! ValueIsListSatisfying(Suggestions,WAT_WeekMatcher)
        ) { return false }
        break
      case 'color-input':
        break
      case 'drop-down':
        if (! ValueIsListSatisfying(ValueList,ValueIsTextline)) {
          return false
        }
        break
      case 'slider':
        if (
          (minValue  != null) && ! ValueIsFiniteNumber(minValue) ||
          (maxValue  != null) && ! ValueIsFiniteNumber(maxValue) ||
          (Stepping  != null) && ! ValueIsNumberInRange(Stepping, 0,Infinity, false) && (Stepping !== 'any') ||
          (Hashmarks != null) && ! ValueIsListSatisfying(Hashmarks,HashmarkMatcher)
        ) { return false }
        break
      case 'text-input':
        if (
          (Placeholder   != null) && ! ValueIsTextline(Placeholder) ||
          (minLength     != null) && ! ValueIsOrdinal(minLength) ||
          (maxLength     != null) && ! ValueIsOrdinal(maxLength) ||
          (SpellChecking != null) && ! ValueIsBoolean(SpellChecking) ||
          (Resizability  != null) && ! ValueIsOneOf(Resizability,['none','horizontal','vertical','both']) ||
          (LineWrapping  != null) && ! ValueIsBoolean(LineWrapping)
        ) { return false }
        break
      case 'html-input':
      case 'css-input':
      case 'javascript-input':
      case 'json-input':
      case 'linelist-input':
      case 'numberlist-input':
      case 'integerlist-input':
        if (
          (Placeholder   != null) && ! ValueIsTextline(Placeholder) ||
          (minLength     != null) && ! ValueIsOrdinal(minLength) ||
          (maxLength     != null) && ! ValueIsOrdinal(maxLength) ||
          (Resizability  != null) && ! ValueIsOneOf(Resizability,['none','horizontal','vertical','both']) ||
          (LineWrapping  != null) && ! ValueIsBoolean(LineWrapping)
        ) { return false }
        break
    }

    return true
  }

/**** normalizedPropertyDescriptor ****/

  function normalizedPropertyDescriptor (Value:any):WAT_PropertyDescriptor {
    if (! ValueIsPropertyDescriptor(Value)) throwError(
      `InvalidArgument: invalid property ${Value.Name == null ? '' : quoted(''+Value.Name)}`
    )

    let {
      Name, Label, EditorType, readonly, Default, AccessorsFor, withCallback,
      Placeholder, FalseValue,TrueValue, minLength,maxLength,multiple,Pattern,
      minValue,maxValue, withMin,withMax, Stepping, Resizability,LineWrapping,
      SpellChecking, ValueList, Hashmarks, Suggestions
    } = Value

    if (Label == null) { Label = Name }

    let Descriptor:WAT_PropertyDescriptor = { Name, Label, EditorType }
      if (readonly     != null) { Descriptor.readonly     = readonly }
      if (withCallback != null) { Descriptor.withCallback = withCallback }
      if (Default      != null) { Descriptor.Default      = Default }

      if (AccessorsFor == null) {
        Descriptor.AccessorsFor = 'memoized'
      } else {
        if (AccessorsFor !== 'none') { Descriptor.AccessorsFor = AccessorsFor }
      }

      switch (Value.EditorType) {
        case 'checkbox':
          break
        case 'choice':                       // drop-down for boolean properties
          Descriptor.FalseValue = FalseValue
          Descriptor.TrueValue  = TrueValue
          break
        case 'textline-input':
        case 'password-input':
        case 'email-address-input':
        case 'phone-number-input':
        case 'url-input':
        case 'search-input':
          if (Placeholder   != null) { Descriptor.Placeholder   = Placeholder }
          if (minLength     != null) { Descriptor.minLength     = minLength }
          if (maxLength     != null) { Descriptor.maxLength     = maxLength }
          if (multiple      != null) { Descriptor.multiple      = multiple }
          if (SpellChecking != null) { Descriptor.SpellChecking = SpellChecking }
          if (Pattern       != null) { Descriptor.Pattern       = Pattern }
          if (Suggestions   != null) { Descriptor.Suggestions   = Suggestions.slice() }
          break
        case 'number-input':
        case 'integer-input':
          if (Placeholder != null) { Descriptor.Placeholder = Placeholder }
          if (minValue    != null) { Descriptor.minValue    = minValue }
          if (maxValue    != null) { Descriptor.maxValue    = maxValue }
          if (Stepping    != null) { Descriptor.Stepping    = Stepping }
          if (Suggestions != null) { Descriptor.Suggestions = Suggestions.slice() }
          break
        case 'time-input':
        case 'date-time-input':
        case 'date-input':
        case 'month-input':
        case 'week-input':
          if (minValue    != null) { Descriptor.minValue    = minValue }
          if (maxValue    != null) { Descriptor.maxValue    = maxValue }
          if (Suggestions != null) { Descriptor.Suggestions = Suggestions.slice() }
          break
        case 'color-input':
          break
        case 'drop-down':
          Descriptor.ValueList = ValueList
          break
        case 'slider':
          if (minValue  != null) { Descriptor.minValue  = minValue }
          if (maxValue  != null) { Descriptor.maxValue  = maxValue }
          if (Stepping  != null) { Descriptor.Stepping  = Stepping }
          if (Hashmarks != null) { Descriptor.Hashmarks = Hashmarks.slice() }
          break
        case 'text-input':
          if (Placeholder   != null) { Descriptor.Placeholder   = Placeholder }
          if (minLength     != null) { Descriptor.minLength     = minLength }
          if (maxLength     != null) { Descriptor.maxLength     = maxLength }
          if (SpellChecking != null) { Descriptor.SpellChecking = SpellChecking }
          if (Resizability  != null) { Descriptor.Resizability  = Resizability }
          if (LineWrapping  != null) { Descriptor.LineWrapping  = LineWrapping }
          break
        case 'html-input':
        case 'css-input':
        case 'javascript-input':
        case 'json-input':
        case 'linelist-input':
        case 'numberlist-input':
        case 'integerlist-input':
          if (Placeholder  != null) { Descriptor.Placeholder  = Placeholder }
          if (minLength    != null) { Descriptor.minLength    = minLength }
          if (maxLength    != null) { Descriptor.maxLength    = maxLength }
          if (Resizability != null) { Descriptor.Resizability = Resizability }
          if (LineWrapping != null) { Descriptor.LineWrapping = LineWrapping }
          break
      }
    return Descriptor
  }

/**** installAccessorFor ****/

  function installAccessorFor (
    Visual:Indexable, Descriptor:WAT_PropertyDescriptor
  ):void {
    const { minValue,maxValue, Pattern, ValueList } = Descriptor
    const RegEx = (Pattern == null ? undefined : new RegExp(Pattern))

    let Validator = Descriptor.Validator
    if (Validator == null) {
      switch (Descriptor.EditorType) {
        case 'checkbox':
        case 'choice':   Validator = ValueIsBoolean; break
        case 'textline-input':
        case 'password-input':
          Validator = (
            Pattern == null
            ? ValueIsTextline
            : (Value:any) => ValueIsStringMatching(Value,RegEx as RegExp)
          ); break
        case 'email-address-input': Validator = ValueIsEMailAddress; break
        case 'phone-number-input':  Validator = ValueIsPhoneNumber;  break
        case 'url-input':           Validator = ValueIsURL;          break
        case 'search-input':        Validator = ValueIsTextline;     break
        case 'number-input':
          if ((Descriptor.minValue == null) && (Descriptor.maxValue == null)) {
            Validator = ValueIsNumber
          } else {
            Validator = (Value:any) => ValueIsNumberInRange(Value, minValue,maxValue)
          }
          break
        case 'integer-input':
          if ((Descriptor.minValue == null) && (Descriptor.maxValue == null)) {
            Validator = ValueIsInteger
          } else {
            Validator = (Value:any) => ValueIsIntegerInRange(Value, minValue,maxValue)
          }
          break
        case 'time-input':      Validator = (Value:any) => ValueIsStringMatching(Value,WAT_TimeRegExp);     break
        case 'date-time-input': Validator = (Value:any) => ValueIsStringMatching(Value,WAT_DateTimeRegExp); break
        case 'date-input':      Validator = (Value:any) => ValueIsStringMatching(Value,WAT_DateRegExp);     break
        case 'month-input':     Validator = (Value:any) => ValueIsStringMatching(Value,WAT_MonthRegExp);    break
        case 'week-input':      Validator = (Value:any) => ValueIsStringMatching(Value,WAT_WeekRegExp);     break
        case 'color-input':     Validator = ValueIsColor; break
        case 'drop-down':       Validator = (Value:any) => ValueIsOneOf(Value,ValueList as any[]); break
        case 'slider':
          if ((Descriptor.minValue == null) && (Descriptor.maxValue == null)) {
            Validator = ValueIsNumber
          } else {
            Validator = (Value:any) => ValueIsNumberInRange(Value, minValue,maxValue)
          }
          break
        case 'text-input':
        case 'html-input':
        case 'css-input':
        case 'javascript-input':  Validator = ValueIsText; break
        case 'json-input':        Validator = ValueIsJSON; break
        case 'linelist-input':    Validator = (Value:any) => ValueIsLineList(Value,RegEx); break
        case 'numberlist-input':  Validator = (Value:any) => ValueIsNumberList(Value,minValue,maxValue);  break
        case 'integerlist-input': Validator = (Value:any) => ValueIsIntegerList(Value,minValue,maxValue); break
      }
    }

    const Container = Descriptor.AccessorsFor as string, Default = Descriptor.Default
    Object.defineProperty(Visual, Descriptor.Name, {
      configurable:true, enumerable:true,
      get: () => acceptableValue(Visual[Container][Descriptor.Name],Validator as Function,Default),
      set: (newValue) => {
        ;(Default == null ? allowValue : expectValue)(Descriptor.Name,newValue,Validator)
        if (ValuesAreEqual(newValue,Default)) { newValue = undefined }
        if (ValuesDiffer  (newValue,Visual[Container][Descriptor.Name])) {
          Visual[Container][Descriptor.Name] = (ValueIsList(newValue) ? newValue.slice() : newValue)
          if (Descriptor.withCallback) { Visual.on(Descriptor.Name)(newValue) }
          Visual.rerender()
        }
      },
    })
  }

//----------------------------------------------------------------------------//
//                              Callback Support                              //
//----------------------------------------------------------------------------//

  function noCallback ():void {}

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
console.log('setErrorReport',Visual,ErrorReport)
      ;(Visual as Indexable)._ErrorReport = ErrorReport
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
      onDragStart, onDragContinuation, onDragFinish, onDragCancellation,
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
    allowFunction   ('"onDragCancellation" callback',onDragCancellation)

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
      (onDragFinish != null) && (onDragCancellation != null)
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
        call(onDragCancellation,[curX-StartX,curY-StartY, StartX,StartY, Event])
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

/**** WAT_Mover ****/

  export function WAT_Mover (PropSet:Indexable):any {
    const {
      Widget,style,
      onDragStart,onDragContinuation,onDragFinish,onDragCancellation,
      onMove
    } = PropSet

    const GridWidth  = acceptableValue(PropSet.GridWidth, ValueIsCardinal,1)
    const GridHeight = acceptableValue(PropSet.GridHeight,ValueIsCardinal,1)

    const DragInfoRef = useRef(null)
    const DragInfo    = DragInfoRef.current || (DragInfoRef.current = {})

    function handleMove (dx:number,dy:number):void {
      if (typeof onMove !== 'function') { return }

      let x =  GridWidth*Math.round((DragInfo.StartX + dx)/GridWidth)
      let y = GridHeight*Math.round((DragInfo.StartY + dy)/GridHeight)

      onMove(x-DragInfo.StartX,y-DragInfo.StartY, x,y)
    }

    const RecognizerRef = useRef(null)
    const Recognizer    = RecognizerRef.current || (RecognizerRef.current = GestureRecognizer({
      onlyFrom:   '.WAT.Mover',
      ClickRadius:0,
      onDragStart:(dx:number,dy:number, x:number,y:number, Event:PointerEvent) => {
        DragInfo.StartX = (Widget == null ? 0 : Widget.x)
        DragInfo.StartY = (Widget == null ? 0 : Widget.y)

        if (typeof onDragStart === 'function') {
          onDragStart(dx,dy, x,y, Event)
        }
        handleMove(dx,dy)
      },
      onDragContinuation:(dx:number,dy:number, x:number,y:number, Event:PointerEvent) => {
        if (typeof onDragContinuation === 'function') {
          onDragContinuation(dx,dy, x,y, Event)
        }
        handleMove(dx,dy)
      },
      onDragFinish:(dx:number,dy:number, x:number,y:number, Event:PointerEvent) => {
        if (typeof onDragFinish === 'function') {
          onDragFinish(dx,dy, x,y, Event)
        }
        handleMove(dx,dy)
      },
      onDragCancellation:(dx:number,dy:number, x:number,y:number, Event:PointerEvent) => {
        if (typeof onDragCancellation === 'function') {
          onDragCancellation(dx,dy, x,y, Event)
        }
        handleMove(0,0)
      },
    }))

    return html`<div class="WAT Mover" style="${style || ''}"
      onPointerDown=${Recognizer} onPointerUp=${Recognizer}
      onPointerMove=${Recognizer} onPointerCancel=${Recognizer}
    />`
  }

/**** WAT_Resizer ****/

  export function WAT_Resizer (PropSet:Indexable):any {
    const {
      Widget,style,
      onDragStart,onDragContinuation,onDragFinish,onDragCancellation,
      onResize
    } = PropSet

    const GridWidth  = acceptableValue(PropSet.GridWidth, ValueIsCardinal,1)
    const GridHeight = acceptableValue(PropSet.GridHeight,ValueIsCardinal,1)

    const minWidth  = acceptableValue(PropSet.minWidth, ValueIsOrdinal,0)
    const minHeight = acceptableValue(PropSet.minHeight,ValueIsOrdinal,0)

    const DragInfoRef = useRef(null)
    const DragInfo    = DragInfoRef.current || (DragInfoRef.current = {})

    function handleResize (dx:number,dy:number):void {
      if (typeof onResize !== 'function') { return }

      let Width  = Math.max(minWidth, DragInfo.StartWidth  + dx)
      let Height = Math.max(minHeight,DragInfo.StartHeight + dy)

      Width  =  GridWidth*Math.round(Width/GridWidth)
      Height = GridHeight*Math.round(Height/GridHeight)

      onResize(Width-DragInfo.StartWidth,Height-DragInfo.StartHeight, Width,Height)
    }

    const RecognizerRef = useRef(null)
    const Recognizer    = RecognizerRef.current || (RecognizerRef.current = GestureRecognizer({
      onlyFrom:   '.WAT.Mover',
      ClickRadius:0,
      onDragStart:(dx:number,dy:number, x:number,y:number, Event:PointerEvent) => {
        DragInfo.StartWidth  = (Widget == null ? 0 : Widget.Width)
        DragInfo.StartHeight = (Widget == null ? 0 : Widget.Height)

        if (typeof onDragStart === 'function') {
          onDragStart(dx,dy, x,y, Event)
        }
        handleResize(dx,dy)
      },
      onDragContinuation:(dx:number,dy:number, x:number,y:number, Event:PointerEvent) => {
        if (typeof onDragContinuation === 'function') {
          onDragContinuation(dx,dy, x,y, Event)
        }
        handleResize(dx,dy)
      },
      onDragFinish:(dx:number,dy:number, x:number,y:number, Event:PointerEvent) => {
        if (typeof onDragFinish === 'function') {
          onDragFinish(dx,dy, x,y, Event)
        }
        handleResize(dx,dy)
      },
      onDragCancellation:(dx:number,dy:number, x:number,y:number, Event:PointerEvent) => {
        if (typeof onDragCancellation === 'function') {
          onDragCancellation(dx,dy, x,y, Event)
        }
        handleResize(0,0)
      },
    }))

    return html`<div class="WAT Resizer" style="${style || ''}"
      onPointerDown=${Recognizer} onPointerUp=${Recognizer}
      onPointerMove=${Recognizer} onPointerCancel=${Recognizer}
    />`
  }

/**** WAT_Shaper ****/

  export function WAT_Shaper (PropSet:Indexable):any {
    const {
      Widget,
      onDragStart,onDragContinuation,onDragFinish,onDragCancellation,
      onShape
    } = PropSet

    const GridWidth  = acceptableValue(PropSet.GridWidth, ValueIsCardinal,1)
    const GridHeight = acceptableValue(PropSet.GridHeight,ValueIsCardinal,1)

    const DragInfoRef = useRef(null)
    const DragInfo    = DragInfoRef.current || (DragInfoRef.current = {})

  /**** Recognizer ****/

    const RecognizerRef = useRef(null)
    const Recognizer    = RecognizerRef.current || (RecognizerRef.current = GestureRecognizer({
      onlyFrom:   '.WAT_ShaperHandle',
      ClickRadius:0,
      onDragStart:(dx:number,dy:number, x:number,y:number, Event:PointerEvent) => {
        DragInfo.initialGeometry = Widget.Geometry

        if (typeof onDragStart === 'function') {
          onDragStart(dx,dy, x,y, Event)
        }
        handleShapeChange(dx,dy)
      },
      onDragContinuation:(dx:number,dy:number, x:number,y:number, Event:PointerEvent) => {
        if (typeof onDragContinuation === 'function') {
          onDragContinuation(dx,dy, x,y, Event)
        }
        handleShapeChange(dx,dy)
      },
      onDragFinish:(dx:number,dy:number, x:number,y:number, Event:PointerEvent) => {
        if (typeof onDragFinish === 'function') {
          onDragFinish(dx,dy, x,y, Event)
        }
        handleShapeChange(dx,dy)
      },
      onDragCancellation:(dx:number,dy:number, x:number,y:number, Event:PointerEvent) => {
        if (typeof onDragCancellation === 'function') {
          onDragCancellation(dx,dy, x,y, Event)
        }
        handleShapeChange(0,0)
      },
    }))

  /**** handleShapeChange ****/

    function handleShapeChange (dx:number, dy:number):void {
      if (typeof onShape !== 'function') { return }

      let dX:number = 0, dY:number = 0, dW:number = 0, dH:number = 0
      switch (DragInfo.ShapeMode) {
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

      let Width:number  = Math.max(0,DragInfo.initialGeometry.Width+dW)
      let Height:number = Math.max(0,DragInfo.initialGeometry.Height+dH)

      let xl:number = DragInfo.initialGeometry.x+dX, xr = xl + Width
      let yt:number = DragInfo.initialGeometry.y+dY, yb = yt + Height

    /**** snap-to-grid ****/

      let xl_ = GridWidth*Math.round(xl/GridWidth)
      let xr_ = GridWidth*Math.round(xr/GridWidth)
      let yt_ = GridHeight*Math.round(yt/GridHeight)
      let yb_ = GridHeight*Math.round(yb/GridHeight)

      switch (DragInfo.ShapeMode) {
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

      onShape(xl,yt, xr-xl,yb-yt)
    }

  /**** handleShapeEvent (actually an event multiplexer) ****/

    function handleShapeEvent (Event:PointerEvent, Mode:string):void {
      DragInfo.ShapeMode = Mode
      Recognizer(Event)
    }

  /**** actual rendering ****/

    const WidgetId = IdOfWidget(Widget)
    const Geometry = Widget.Geometry

    return html`<div class="WAT Content Shaper">
      <${WAT_ShaperHandle} key=${WidgetId+'nw'} Mode="nw" Geometry=${Geometry}
        onPointerEvent=${(Event:PointerEvent) => handleShapeEvent(Event,'nw')}/>
      <${WAT_ShaperHandle} key=${WidgetId+'n'}  Mode="n"  Geometry=${Geometry}
        onPointerEvent=${(Event:PointerEvent) => handleShapeEvent(Event,'n')}/>
      <${WAT_ShaperHandle} key=${WidgetId+'ne'} Mode="ne" Geometry=${Geometry}
        onPointerEvent=${(Event:PointerEvent) => handleShapeEvent(Event,'ne')}/>
      <${WAT_ShaperHandle} key=${WidgetId+'e'}  Mode="e"  Geometry=${Geometry}
        onPointerEvent=${(Event:PointerEvent) => handleShapeEvent(Event,'e')}/>
      <${WAT_ShaperHandle} key=${WidgetId+'se'} Mode="se" Geometry=${Geometry}
        onPointerEvent=${(Event:PointerEvent) => handleShapeEvent(Event,'se')}/>
      <${WAT_ShaperHandle} key=${WidgetId+'s'}  Mode="s"  Geometry=${Geometry}
        onPointerEvent=${(Event:PointerEvent) => handleShapeEvent(Event,'s')}/>
      <${WAT_ShaperHandle} key=${WidgetId+'sw'} Mode="sw" Geometry=${Geometry}
        onPointerEvent=${(Event:PointerEvent) => handleShapeEvent(Event,'sw')}/>
      <${WAT_ShaperHandle} key=${WidgetId+'w'}  Mode="w"  Geometry=${Geometry}
        onPointerEvent=${(Event:PointerEvent) => handleShapeEvent(Event,'w')}/>
    </>`
  }

/**** WAT_ShaperHandle ****/

  function WAT_ShaperHandle (PropSet:Indexable):any {
    let { Mode, Geometry, onPointerEvent, ...otherProps } = PropSet

    let { Width,Height } = Geometry
    const xl = -8, xm = Math.round(Width/2)-4,  xr = Width
    const yt = -8, ym = Math.round(Height/2)-4, yb = Height

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
  }/**** WAT_Dragger ****/

  export function WAT_Dragger (PropSet:Indexable):any {
    const {
      Widget,style,
      onDragStart,onDragContinuation,onDragFinish,onDragCancellation,
      onDrag
    } = PropSet

    const DropMode = acceptableValue(
      PropSet.DropMode, (Value:any) => ValueIsOneOf(Value,['touch','enclose']),'enclose'
    )

    const GridWidth  = acceptableValue(PropSet.GridWidth, ValueIsCardinal,1)
    const GridHeight = acceptableValue(PropSet.GridHeight,ValueIsCardinal,1)

    const DragInfoRef = useRef(null)
    const DragInfo    = DragInfoRef.current || (DragInfoRef.current = {})

  /**** handleDrag ****/

    function handleDrag (dx:number,dy:number):void {
      if (typeof onDrag !== 'function') { return }

      let x =  GridWidth*Math.round((DragInfo.StartX + dx)/GridWidth)
      let y = GridHeight*Math.round((DragInfo.StartY + dy)/GridHeight)

      onDrag(x-DragInfo.StartX,y-DragInfo.StartY, x,y)

      const xl = Widget.x; const xr = xl + Widget.Width
      const yt = Widget.y; const yb = yt + Widget.Height

      let CatcherList = Widget.Page.WidgetList.filter((Candidate:WAT_Widget) => {
        if (Widget === Candidate) { return false }

        const { x,y, Width,Height } = Candidate.Geometry
        if (DropMode === 'touch') {
          return (xl <= x + Width)  && (xr >= x) && (yt <= y + Height) && (yb >= y)
        } else {                                       // DropMode === 'enclose'
          return (xl >= x) && (xr <= x + Width) && (yt >= y) && (yb <= y + Height)
        }
      })

      let Catcher = CatcherList.find((Candidate:WAT_Widget) => {
        try {
          return (Candidate.on('drop-request')(Widget) === true)
        } catch (Signal:any) { /* nop - error is already set */ }
      })

      if (Catcher === DragInfo.Catcher) { return }

      if (DragInfo.Catcher != null) {
        try { DragInfo.Catcher.on('droppable-left')(Widget) } catch (Signal:any) { /* nop - error is already set */ }
        try { Widget.on('catcher-left')(DragInfo.Catcher) } catch (Signal:any) { /* nop - error is already set */ }
      }

      DragInfo.Catcher = Catcher
      try { Catcher.on('droppable-entered')(Widget) } catch (Signal:any) { /* nop - error is already set */ }
      try { Widget.on('catcher-entered')(Catcher) } catch (Signal:any) { /* nop - error is already set */ }
    }

  /**** handleDrop ****/

    function handleDrop ():void {
      if (DragInfo.Catcher != null) {
        try { DragInfo.Catcher.on('drop')(Widget) } catch (Signal:any) { /* nop - error is already set */ }
        try { Widget.on('dropped-on')(DragInfo.Catcher) } catch (Signal:any) { /* nop - error is already set */ }
        delete DragInfo.Catcher
      }
    }

  /**** Recognizer ****/

    const RecognizerRef = useRef(null)
    const Recognizer    = RecognizerRef.current || (RecognizerRef.current = GestureRecognizer({
      onlyFrom:   '.WAT.Dragger',
      ClickRadius:0,
      onDragStart:(dx:number,dy:number, x:number,y:number, Event:PointerEvent) => {
        DragInfo.StartX = (Widget == null ? 0 : Widget.x)
        DragInfo.StartY = (Widget == null ? 0 : Widget.y)

        if (typeof onDragStart === 'function') {
          onDragStart(dx,dy, x,y, Event)
        }
        handleDrag(dx,dy)
      },
      onDragContinuation:(dx:number,dy:number, x:number,y:number, Event:PointerEvent) => {
        if (typeof onDragContinuation === 'function') {
          onDragContinuation(dx,dy, x,y, Event)
        }
        handleDrag(dx,dy)
      },
      onDragFinish:(dx:number,dy:number, x:number,y:number, Event:PointerEvent) => {
        if (typeof onDragFinish === 'function') {
          onDragFinish(dx,dy, x,y, Event)
        }
        handleDrag(dx,dy)
        handleDrop()
      },
      onDragCancellation:(dx:number,dy:number, x:number,y:number, Event:PointerEvent) => {
        if (typeof onDragCancellation === 'function') {
          onDragCancellation(dx,dy, x,y, Event)
        }
        handleDrag(0,0)
      },
    }))

    return html`<div class="WAT Dragger" style="${style || ''}"
      onPointerDown=${Recognizer} onPointerUp=${Recognizer}
      onPointerMove=${Recognizer} onPointerCancel=${Recognizer}
    />`
  }

//------------------------------------------------------------------------------
//--                                WAT_Visual                                --
//------------------------------------------------------------------------------

  export abstract class WAT_Visual {
    protected _Container:WAT_Visual|undefined

    protected constructor (
      Behavior:WAT_Behavior|undefined, Container?:WAT_Visual
    ) {
      allowBehavior('visual behavior',Behavior)

      this._Behavior           = Behavior
      this._normalizedBehavior = (Behavior == null ? undefined : Behavior.toLowerCase())

      this._Container = Container
    }

  /**** Category - to be overwritten ****/

// @ts-ignore TS2378 this getter throws
    public get Category ():WAT_Category  { throwError('InternalError: "Category" has to be overwritten') }
    public set Category (_:WAT_Category) { throwReadOnlyError('Category') }

  /**** Behavior ****/

    protected _Behavior:          WAT_Behavior|undefined
    protected _normalizedBehavior:WAT_Behavior|undefined

    public get Behavior ():WAT_Behavior|undefined  { return this._Behavior }
    public set Behavior (_:WAT_Behavior|undefined) { throwReadOnlyError('Behavior') }

  /**** normalizedBehavior ****/

    public get normalizedBehavior ():WAT_Behavior|undefined  { return this._normalizedBehavior }
    public set normalizedBehavior (_:WAT_Behavior|undefined) { throwReadOnlyError('normalizedBehavior') }

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

  /**** Applet ****/

// @ts-ignore TS2378 this getter throws
    public get Applet ():WAT_Applet|undefined  { throwError('InternalError: "Applet" has to be overwritten') }
    public set Applet (_:WAT_Applet|undefined) { throwReadOnlyError('Applet') }

  /**** Path - to be overwritten ****/

// @ts-ignore TS2378 this getter throws
    public get Path ():WAT_Path  { throwError('InternalError: "Path" has to be overwritten') }
    public set Path (_:WAT_Path) { throwReadOnlyError('Path') }

  /**** isAttached ****/

// @ts-ignore TS2378 this getter throws
    public get isAttached ():boolean  { throwError('InternalError: "isAttached" has to be overwritten') }
    public set isAttached (_:boolean) { throwReadOnlyError('isAttached') }

  /**** Synopsis ****/

    protected _Synopsis:WAT_Text|undefined

    public get Synopsis ():WAT_Text|undefined { return this._Synopsis }
    public set Synopsis (newSynopsis:WAT_Text|undefined) {
      allowText('visual synopsis',newSynopsis)
      if ((newSynopsis != null) && (newSynopsis.trim() === '')) {
        newSynopsis = undefined
      }

      if (this._Synopsis !== newSynopsis) {
        this._Synopsis = newSynopsis
        this.rerender()
      }
    }

  /**** configurableProperties ****/

    protected _configurableProperties:WAT_PropertyDescriptor[] = []

    public get configurableProperties ():WAT_PropertyDescriptor[] {
      return this._configurableProperties.map(
        (Descriptor:WAT_PropertyDescriptor) => ({ ...Descriptor })
      )
    }
    public set configurableProperties (newProperties:WAT_PropertyDescriptor[]|undefined) {
      allowListSatisfying('configurable properties',newProperties,ValueIsPropertyDescriptor)
      if (newProperties == null) { newProperties = [] }

      const PropertySet = Object.create(null)
        newProperties = newProperties.filter((Descriptor:WAT_PropertyDescriptor) => {
          if (Descriptor.Name in PropertySet) {
            return false
          } else {
            PropertySet[Descriptor.Name] = normalizedPropertyDescriptor(Descriptor)
            return true
          }
        }).map(
          (Descriptor:WAT_PropertyDescriptor) => PropertySet[Descriptor.Name]
        )
      if (ValuesDiffer(this._configurableProperties,newProperties)) {
        this._configurableProperties.forEach((Descriptor:WAT_PropertyDescriptor) => {
          if (Descriptor.AccessorsFor != null) { delete (this as Indexable)[Descriptor.Name] }
        })

        this._configurableProperties = newProperties

        this._configurableProperties.forEach((Descriptor:WAT_PropertyDescriptor) => {
          if (Descriptor.AccessorsFor != null) {
            installAccessorFor(this,Descriptor)
          }
        })

        this.rerender()
      }
    }

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

  /**** Overflows ****/

// @ts-ignore TS2378 this getter throws
    public get Overflows ():WAT_Overflow[]  { throwError('InternalError: "Overflows" has to be overwritten') }
// @ts-ignore TS2378 this getter throws
    public set Overflows (_:WAT_Overflow[]) { throwError('InternalError: "Overflows" has to be overwritten') }

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

      this._CallbackRegistry = undefined
      unregisterAllReactiveFunctionsFrom(this)

    /**** prepare for script execution ****/

      const reactively = (reactiveFunction:Function):void => {
        expectFunction('reactive function',reactiveFunction)
// @ts-ignore TS2345 do not care about the specific signature of "reactiveFunction"
        registerReactiveFunctionIn(this,computed(() => {
          try {
            reactiveFunction()
          } catch (Signal:any) {
            console.warn('execution error in reactive function',Signal)
            setErrorReport(this,{
              Type:'Reactivity Failure',
              Sufferer:this, Message:'' + Signal, Cause:Signal
            })
          }
        }))
      }

      const on            = this.on.bind(this)
      const onRender      = this.on.bind(this,'render')
      const onMount       = this.on.bind(this,'mount')
      const onUpdate      = this.on.bind(this,'update')
      const onUnmount     = this.on.bind(this,'unmount')
      const onValueChange = this.on.bind(this,'value-change')

      function installStylesheet (Stylesheet:WAT_Text|undefined) {
        throwError('NotForVisualScripts: visual scripts must not install behavior stylesheets')
      }

    /**** run behavior script first ****/

      this._ErrorReport = undefined

      const Applet = this.Applet
      if (Applet == null) throwError('NotAttached: this visual is not attached')

      const Category = this.Category
      const Behavior = this.Behavior
      if (Behavior != null) {
// @ts-ignore TS7053 allow indexing
        const Registration = Applet._BehaviorPool[Category][Behavior.toLowerCase()]
        if (Registration == null) {
          missingBehavior(this)
        } else {
          try {
            await Registration.compiledScript.call(this,
              this,this, html,reactively,
              on,onRender,onMount,onUpdate,onUnmount,onValueChange,
              installStylesheetForBehavior.bind(this, Applet,Category,Behavior),
              Registration?.isNew || false
            )
            Registration.isNew = false
          } catch (Signal) {
            Registration.isNew = false
console.warn('Behavior Execution Failure',Signal)
            setErrorReport(this,{
              Type:'Behaviour Execution Failure',
              Sufferer:this, Message:'' + Signal, Cause:Signal
            })

            if (Mode === 'rethrow-exception') {
              throw Signal
            }
            return
          }
        }

        if (this._ErrorReport != null) { return }
      }

    /**** compile and run the script ****/

      this._ScriptError = undefined    // only to be set by "applyPendingScript"
        let compiledScript:Function
        try {
// @ts-ignore TS2351 AsyncFunction *is* constructible
          compiledScript = new AsyncFunction(
            'me,my, html,reactively, ' +
            'on,onRender,onMount,onUpdate,onUnmount,onValueChange, ' +
            'installStylesheet,BehaviorIsNew',
            activeScript
          )
        } catch (Signal:any) {
          console.warn('Script Compilation Failure',Signal)
          setErrorReport(this,{
            Type:'Script Compilation Failure',
            Sufferer:this, Message:'' + Signal, Cause:Signal
          })

          if (Mode === 'rethrow-exception') {
            throw Signal
          }
          return
        }

        try {
          await compiledScript.call(this,
            this,this, html,reactively,
            on,onRender,onMount,onUpdate,onUnmount,onValueChange,
            installStylesheet, false // Behavior.isNew
          )
        } catch (Signal:any) {
          console.warn('Script Execution Failure',Signal)
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
            'me,my, html,reactively, ' +
            'on,onRender,onMount,onUpdate,onUnmount,onValueChange, ' +
            'installStylesheet,BehaviorIsNew',
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

  /**** on ****/

    protected _CallbackRegistry:Indexable|undefined

    public on (
      CallbackName:WAT_Textline, newCallback?:Function|undefined
    ):Function {
      expectTextline('callback name',CallbackName)
      const normalizedCallbackName = CallbackName.toLowerCase()

      if (arguments.length === 1) {
        return this._CallbackRegistry?.[normalizedCallbackName] || noCallback
      } else {
        allowFunction('callback',newCallback)
        if (newCallback == null) {
          if (this._CallbackRegistry != null) {
            delete this._CallbackRegistry[normalizedCallbackName]
          }
        } else {
          if (this._CallbackRegistry == null) {
            this._CallbackRegistry = Object.create(null)
          }
// @ts-ignore TS2532 no, "this._CallbackRegistry" is no longer undefined
          this._CallbackRegistry[normalizedCallbackName] = this._Callback.bind(
            this, CallbackName, newCallback
          )

          if ((normalizedCallbackName === 'mount') && this.isMounted) {
// @ts-ignore TS2532 no, "this._CallbackRegistry" is no longer undefined
            this._CallbackRegistry['mount']()               // very special case
          }
        }

        return this._CallbackRegistry?.[normalizedCallbackName] || noCallback
      }
    }

    private _Callback (
      CallbackName:WAT_Textline, Callback:Function, ...ArgList:any[]
    ):any {
      try {
        let Result = Callback.apply(this,ArgList)
        if (Result instanceof Promise) {
console.warn('started  tracking asynchronous callback ' + quoted(CallbackName))
          Result.catch((Signal:any) => {
            console.warn(`asynchronous callback ${quoted(CallbackName)} failed`,Signal)
            setErrorReport(this,{
              Type:'Callback Failure',
              Sufferer:this, Message:'' + Signal, Cause:Signal
            })
          }).then(() =>
console.warn('finished tracking asynchronous callback ' + quoted(CallbackName))
          )
        } else {
          return Result
        }
      } catch (Signal:any) {
        console.warn(`callback ${quoted(CallbackName)} failed`,Signal)
        setErrorReport(this,{
          Type:'Callback Failure',
          Sufferer:this, Message:'' + Signal, Cause:Signal
        })
      }
    }

  /**** Renderer ****/

    public get Renderer ():Function|undefined { return this.on('render') }
    public set Renderer (newRenderer:Function|undefined) {
      allowFunction('renderer',newRenderer)
      if (newRenderer == null) { newRenderer = () => ''}

      this.on('render',newRenderer)
      this.rerender()
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
          Opacity, Cursor, Overflows,
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

        CSSStyleList.push(`overflow:${Overflows.join(' ')}`)
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

  /**** _serializeConfigurationInto ****/

    protected _serializeConfigurationInto (Serialization:Serializable):void {
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
        'Behavior', 'Name', 'Synopsis',
        'FontFamily','FontSize','FontWeight','FontStyle',
        'TextDecoration', 'TextShadow','TextAlignment','LineHeight',
        'ForegroundColor', 'hasBackground', 'BackgroundColor','BackgroundTexture',
        'BorderWidths','BorderStyles','BorderColors','BorderRadii','BoxShadow',
        'Opacity','OverflowVisibility','Cursor',
        'activeScript','pendingScript',
        'memoized',
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
        /*'Behavior', */ 'Name', 'Synopsis',
        'FontFamily','FontSize','FontWeight','FontStyle',
        'TextDecoration', 'TextShadow','TextAlignment','LineHeight',
        'ForegroundColor', 'hasBackground', 'BackgroundColor','BackgroundTexture',
        'BorderWidths','BorderStyles','BorderColors','BorderRadii','BoxShadow',
        'Opacity','OverflowVisibility','Cursor',
        /*'activeScript',*/'pendingScript',
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
      }
      this.activateScript()                        // in "creation" order, i.e.,
                  // pages and widgets will already be attached, applets may not
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

    public constructor (Behavior:WAT_Behavior|undefined, ) {
      super(Behavior,undefined)
    }

  /**** Category ****/

    public get Category ():WAT_Category  { return 'applet' }
    public set Category (_:WAT_Category) { throwReadOnlyError('Category') }

  /**** Behavior ****/

    public get Behavior ():WAT_Behavior|undefined { return this._Behavior }
    public set Behavior (newBehavior:WAT_Behavior|undefined) {
      allowBehavior('applet behavior',newBehavior)

      const normalizedBehavior = (newBehavior == null ? undefined : newBehavior.toLowerCase())
      if (this._normalizedBehavior !== normalizedBehavior) {
        this._normalizedBehavior = normalizedBehavior
// @ts-ignore TS7053 allow indexing
        this._Behavior = this._BehaviorPool['applet'][normalizedBehavior]?.Name || newBehavior
        this.activateScript()
        this.rerender()
      }
    }

  /**** Name ****/

    public get Name ():WAT_Name|undefined { return this._Name }
    public set Name (newName:WAT_Name|undefined) { throwReadOnlyError('Name') }

  /**** Applet ****/

    public get Applet ():WAT_Applet  { return this }
    public set Applet (_:WAT_Applet) { throwReadOnlyError('Applet') }

  /**** Path - to be overwritten ****/

    public get Path ():WAT_Path  { return '/' }
    public set Path (_:WAT_Path) { throwReadOnlyError('Path') }

  /**** isAttached ****/

    public get isAttached ():boolean  { return (this._View != null) }
    public set isAttached (_:boolean) { throwReadOnlyError('isAttached') }

  /**** BehaviorSet ****/

    protected _BehaviorPool: WAT_BehaviorPool = {
      applet:Object.create(null),
      page:  Object.create(null),
      widget:Object.create(null),
    }

    public get BehaviorSet ():Indexable  {
      const Result = {
        applet:Object.create(null),
        page:  Object.create(null),
        widget:Object.create(null),
      }
        for (const [Behavior,Registration] of Object.entries(this._BehaviorPool.applet)) {
          const { Category,Name,activeScript } = Registration
          Result.applet[Behavior] = { Category,Name,activeScript }
        }

        for (const [Behavior,Registration] of Object.entries(this._BehaviorPool.page)) {
          const { Category,Name,activeScript } = Registration
          Result.page[Behavior] = { Category,Name,activeScript }
        }

        for (const [Behavior,Registration] of Object.entries(this._BehaviorPool.widget)) {
          const { Category,Name,activeScript } = Registration
          Result.widget[Behavior] = { Category,Name,activeScript }
        }
      return Result
    }
    public set BehaviorSet (_:Indexable) { throwReadOnlyError('BehaviorSet') }

  /**** BehaviorsOfCategory ****/

    public BehaviorsOfCategory (Category:WAT_Category):WAT_Behavior[] {
      expectCategory('behavior category',Category)
// @ts-ignore TS7053 allow indexing
      return Object.keys(this._BehaviorPool[Category])
    }

  /**** BehaviorOfCategory ****/

    public BehaviorOfCategory (
      Category:WAT_Category, Behavior:WAT_Behavior
    ):WAT_BehaviorSpecification|undefined {
      expectCategory('behavior category',Category)
      expectBehavior    ('behavior name',Behavior)

      const normalizedBehavior = Behavior.toLowerCase()

// @ts-ignore TS7053 allow indexing
      const Registration = this._BehaviorPool[Category][normalizedBehavior]
      if (Registration == null) { return undefined }

      const  {          Name,activeScript } = Registration
      return { Category,Name,activeScript }
    }

  /**** registerBehaviorOfCategory ****/

    public registerBehaviorOfCategory (
      Category:WAT_Category, Behavior:WAT_Behavior, Script:WAT_Text
    ):void {
      expectCategory('behavior category',Category)
      expectBehavior    ('behavior name',Behavior)
      expectText      ('behavior script',Script)

      const normalizedBehavior = Behavior.toLowerCase()
      if (BehaviorIsIntrinsic(normalizedBehavior)) throwError(
        'InvalidArgument: intrinsic behaviors must not be overwritten'
      )

      try {
// @ts-ignore TS2351 AsyncFunction *is* constructible
        const compiledScript = new AsyncFunction(
          'me,my, html,reactively, ' +
          'on,onRender,onMount,onUpdate,onUnmount,onValueChange, ' +
          'installStylesheet,BehaviorIsNew',
          Script
        )

// @ts-ignore TS7053 allow indexing
        this._BehaviorPool[Category][normalizedBehavior] = {
          Category, Name:Behavior, activeScript:Script, isNew:true,
          compiledScript, Error:undefined
        }
      } catch (Signal:any) {
console.warn(`Script Compilation Failure for ${Category} behavior ${Behavior}`,Signal)
// @ts-ignore TS7053 allow indexing
        this._BehaviorPool[Category][normalizedBehavior] = {
          Category, Name:Behavior, activeScript:Script, isNew:false,
          compiledScript:brokenBehavior, Error:Signal
        }
      }

      uninstallStylesheetForBehavior(this,Category,Behavior)

      switch (Category) {
        case 'applet':
          if (this._normalizedBehavior === normalizedBehavior) {
            this.activateScript()
          }
          break
        case 'page':
          this.PagesWithBehavior(Behavior).forEach(
            (Page:WAT_Page) => Page.activateScript()
          )
          break
        case 'widget':
          this.WidgetsWithBehavior(Behavior).forEach(
            (Widget:WAT_Widget) => Widget.activateScript()
          )
      }
    }

  /**** unregisterBehaviorOfCategory ****/

    public unregisterBehaviorOfCategory (
      Category:WAT_Category, Behavior:WAT_Behavior
    ):void {
      expectCategory('behavior category',Category)
      expectBehavior    ('behavior name',Behavior)

      const normalizedBehavior = Behavior.toLowerCase()
      if (BehaviorIsIntrinsic(normalizedBehavior)) throwError(
        'InvalidArgument: intrinsic behaviors must not be unregistered'
      )

// @ts-ignore TS7053 allow indexing
      const Registration = this._BehaviorPool[Category][normalizedBehavior]
      if (Registration == null) { return undefined }

      uninstallStylesheetForBehavior(this,Category,Behavior)
// @ts-ignore TS7053 allow indexing
      delete this._BehaviorPool[Category][normalizedBehavior]

      switch (Category) {
        case 'applet':
          if (this._normalizedBehavior === normalizedBehavior) {
            this.activateScript()
          }
          break
        case 'page':
          this.PagesWithBehavior(Behavior).forEach(
            (Page:WAT_Page) => Page.activateScript()
          )
          break
        case 'widget':
          this.WidgetsWithBehavior(Behavior).forEach(
            (Widget:WAT_Widget) => Widget.activateScript()
          )
      }
    }

  /**** renameBehaviorOfCategory ****/

    public renameBehaviorOfCategory (
      Category:WAT_Category, oldName:WAT_Behavior, newName:WAT_Behavior
    ):void {
      expectCategory('behavior category',Category)
      expectBehavior('old behavior name',oldName)
      expectBehavior('new behavior name',newName)

      const normalizedOldName = oldName.toLowerCase()
      const normalizedNewName = newName.toLowerCase()

// @ts-ignore TS7053 allow indexing
      if (! (normalizedOldName in this._BehaviorPool[Category])) throwError(
        `InvalidArgument: no ${Category} behaviour ${quoted(oldName)} found`
      )

      if (newName === oldName) { return }

      if (normalizedNewName === normalizedOldName) {
// @ts-ignore TS7053 allow indexing
        this._BehaviorPool[Category][normalizedOldName].Name = newName
        return
      }

// @ts-ignore TS7053 allow indexing
      let Registration = this._BehaviorPool[Category][normalizedOldName]
// @ts-ignore TS7053 allow indexing
      delete this._BehaviorPool[Category][normalizedOldName]

      Registration.Name  = newName
      Registration.isNew = true       // just to be safe (it could be important)
// @ts-ignore TS7053 allow indexing
      this._BehaviorPool[Category][normalizedNewName] = Registration

      uninstallStylesheetForBehavior(this,Category,oldName)

      switch (Category) {
        case 'applet':
          if (this._normalizedBehavior === normalizedOldName) {
            this._Behavior           = newName
            this._normalizedBehavior = normalizedNewName
          }
          break
        case 'page':
          this.PagesWithBehavior(oldName).forEach((Page:WAT_Page) => {
            Page['_Behavior']           = newName
            Page['_normalizedBehavior'] = normalizedNewName
          })
          break
        case 'widget':
          this.WidgetsWithBehavior(oldName).forEach((Widget:WAT_Widget) => {
            Widget['_Behavior']           = newName
            Widget['_normalizedBehavior'] = normalizedNewName
          })
      }
    }
  /**** prescriptBehaviorOfCategory ****/

    public prescriptBehaviorOfCategory (
      Category:WAT_Category, Behavior:WAT_Behavior, Script:WAT_Text
    ):void {
      expectCategory('behavior category',Category)
      expectBehavior    ('behavior name',Behavior)
      expectText      ('behavior script',Script)

      const normalizedBehavior = Behavior.toLowerCase()

// @ts-ignore TS7053 allow indexing
      const Registration = this._BehaviorPool[Category][normalizedBehavior]
      if (Registration == null) throwError(
        `InvalidArgument: no ${Category} behaviour ${quoted(Behavior)} found`
      )

      if (Registration.pendingScript !== Script) {
        Registration.pendingScript = Script
      }
      this.rerender()
    }

  /**** rescriptBehaviorOfCategory ****/

    public rescriptBehaviorOfCategory (
      Category:WAT_Category, Behavior:WAT_Behavior
    ):void {
      expectCategory('behavior category',Category)
      expectBehavior    ('behavior name',Behavior)

      const normalizedBehavior = Behavior.toLowerCase()

// @ts-ignore TS7053 allow indexing
      const Registration = this._BehaviorPool[Category][normalizedBehavior]
      if (Registration == null) throwError(
        `InvalidArgument: no ${Category} behaviour ${quoted(Behavior)} found`
      )

      const { activeScript,pendingScript } = Registration
      if (activeScript === pendingScript) { return }

      try {
// @ts-ignore TS7053 allow indexing
        this._BehaviorPool[Category][normalizedBehavior].pendingError = undefined

// @ts-ignore TS2351 AsyncFunction *is* constructible
        const compiledScript = new AsyncFunction(
          'me,my, html,reactively, ' +
          'on,onRender,onMount,onUpdate,onUnmount,onValueChange, ' +
          'installStylesheet,BehaviorIsNew',
          pendingScript
        )
      } catch (Signal:any) {
console.warn(`Script Compilation Failure for ${Category} behavior ${Behavior}`,Signal)
// @ts-ignore TS7053 allow indexing
        this._BehaviorPool[Category][normalizedBehavior].pendingError = Signal
      }

      this.registerBehaviorOfCategory(Category,Behavior,pendingScript)

      this.rerender()
    }

  /**** groupedBehaviorListOfCategory ****/

    public groupedBehaviorListOfCategory (Category:WAT_Category):Indexable {
      expectCategory('behavior category',Category)

      const groupedList:Indexable = Object.create(null)
// @ts-ignore TS7053 allow indexing
        Object.values(this._BehaviorPool[Category] as WAT_BehaviorRegistry).forEach(
          (Behavior:WAT_BehaviorRegistration) => {
            const Name   = Behavior.Name
            const Prefix = Name.replace(/[.][^.]+$/,'')
            const Suffix = Name.replace(/^.*[.]/,'')

            if (! (Prefix in groupedList)) {
              groupedList[Prefix] = []
            }
            groupedList[Prefix].push(Suffix)
          }
        )
      return groupedList
    }
  /**** PagesWithBehavior ****/

    public PagesWithBehavior (Behavior:WAT_Behavior):WAT_Page[] {
      expectBehavior('behavior name',Behavior)
      const normalizedBehavior = Behavior.toLowerCase()

      return this._PageList.filter(
        (Page:WAT_Page) => (Page.Behavior || '').toLowerCase() === normalizedBehavior
      )
    }

  /**** WidgetsWithBehavior ****/

    public WidgetsWithBehavior (Behavior:WAT_Behavior):WAT_Widget[] {
      expectBehavior('behavior name',Behavior)
      const normalizedBehavior = Behavior.toLowerCase()

      return this._PageList.map((Page:WAT_Page) => Page.WidgetList.filter(
        (Widget:WAT_Widget) => (Widget.Behavior || '').toLowerCase() === normalizedBehavior
      )).flat()
    }

  /**** intrinsicBehaviorsOfCategory ****/

    public intrinsicBehaviorsOfCategory (Category:WAT_Category):WAT_Behavior[] {
      expectCategory('behavior category',Category)
// @ts-ignore TS7053 allow indexing
      return Object.values(this._BehaviorPool[Category] as WAT_BehaviorRegistry)
        .map((Registration:WAT_BehaviorRegistration) => Registration.Name)
        .filter((Name:WAT_Behavior) => BehaviorIsIntrinsic(Name.toLowerCase()))
    }

  /**** extrinsicBehaviorsOfCategory ****/

    public extrinsicBehaviorsOfCategory (Category:WAT_Category):WAT_Behavior[] {
      expectCategory('behavior category',Category)
// @ts-ignore TS7053 allow indexing
      return Object.values(this._BehaviorPool[Category] as WAT_BehaviorRegistry)
        .map((Registration:WAT_BehaviorRegistration) => Registration.Name)
        .filter((Name:WAT_Behavior) => ! BehaviorIsIntrinsic(Name.toLowerCase()))
    }

  /**** missingBehaviorsOfCategory ****/

    public missingBehaviorsOfCategory (Category:WAT_Category):WAT_Behavior[] {
      expectCategory('behavior category',Category)

      const missingBehaviorSet = Object.create(null)
        switch (Category) {
          case 'applet':
            return (
              (this._Behavior == null) ||
              (this._Behavior.toLowerCase() in this._BehaviorPool['applet'])
              ? [] : [this._Behavior]
            )
          case 'page':
            this.PageList.forEach((Page:WAT_Page) => {
              if (
                (Page.Behavior != null) &&
                ! (Page.Behavior.toLowerCase() in this._BehaviorPool['page'])
              ) { missingBehaviorSet[Page.Behavior.toLowerCase()] = Page.Behavior }
            })
            break
          case 'widget':
            this.PageList.forEach((Page:WAT_Page) => {
              Page.WidgetList.forEach((Widget:WAT_Widget) => {
                if (
                  (Widget.Behavior != null) &&
                  ! (Widget.Behavior.toLowerCase() in this._BehaviorPool['widget'])
                ) { missingBehaviorSet[Widget.Behavior.toLowerCase()] = Widget.Behavior }
              })
            })
        }
      return Object.values(missingBehaviorSet)
    }

  /**** brokenBehaviorsOfCategory ****/

    public brokenBehaviorsOfCategory (Category:WAT_Category):WAT_Behavior[] {
      expectCategory('behavior category',Category)

      const brokenBehaviors:WAT_Behavior[] = []
// @ts-ignore TS7053 allow indexing
        Object.values(this._BehaviorPool[Category]).forEach((Registration:WAT_BehaviorRegistration) => {
          if (Registration.Error != null) {
            brokenBehaviors.push(Registration.Name)
          }
        })
      return brokenBehaviors
    }

  /**** usedBehaviorsOfCategory ****/

    public usedBehaviorsOfCategory (Category:WAT_Category):WAT_Behavior[] {
      expectCategory('behavior category',Category)

      const usedBehaviorSet = Object.create(null)
      switch (Category) {
        case 'applet':
          return (
            (this._Behavior != null) &&
            (this._Behavior.toLowerCase() in this._BehaviorPool['applet'])
            ? [this._BehaviorPool['applet'][this._Behavior.toLowerCase()].Name] : []
          )
        case 'page':
          this.PageList.forEach((Page:WAT_Page) => {
            if (
              (Page.Behavior != null) &&
              (Page.Behavior.toLowerCase() in this._BehaviorPool['page'])
            ) { usedBehaviorSet[Page.Behavior.toLowerCase()] = true }
          })
          return Object.keys(usedBehaviorSet).map(
            (normalizedName:WAT_Behavior) => this._BehaviorPool['page'][normalizedName].Name
          )
        case 'widget':
        default: // just to satisfy the compiler
          this.PageList.forEach((Page:WAT_Page) => {
            Page.WidgetList.forEach((Widget:WAT_Widget) => {
              if (
                (Widget.Behavior != null) &&
                (Widget.Behavior.toLowerCase() in this._BehaviorPool['widget'])
              ) { usedBehaviorSet[Widget.Behavior.toLowerCase()] = Widget.Behavior }
            })
          })
          return Object.keys(usedBehaviorSet).map(
            (normalizedName:WAT_Behavior) => this._BehaviorPool['widget'][normalizedName].Name
          )
      }
    }

  /**** unusedBehaviorsOfCategory ****/

    public unusedBehaviorsOfCategory (Category:WAT_Category):WAT_Behavior[] {
      expectCategory('behavior category',Category)

// @ts-ignore TS7053 allow indexing
      const usedBehaviorSet:WAT_BehaviorRegistry = {...this._BehaviorPool[Category]}
        switch (Category) {
          case 'applet':
            if (this._Behavior != null) {
              delete usedBehaviorSet[this._Behavior.toLowerCase()]
            }
            break
          case 'page':
            this.PageList.forEach((Page:WAT_Page) => {
              if (Page.Behavior != null) {
                delete usedBehaviorSet[Page.Behavior.toLowerCase()]
              }
            })
            break
          case 'widget':
            this.PageList.forEach((Page:WAT_Page) => {
              Page.WidgetList.forEach((Widget:WAT_Widget) => {
                if (Widget.Behavior != null) {
                  delete usedBehaviorSet[Widget.Behavior.toLowerCase()]
                }
              })
            })
        }
      return Object.values(usedBehaviorSet).map(
        (Registration:WAT_BehaviorRegistration) => Registration.Name
      )
    }

  /**** BehaviorOfCategoryIsBroken ****/

    public BehaviorOfCategoryIsBroken (
      Category:WAT_Category, Behavior:WAT_Behavior
    ):boolean {
      expectCategory('behavior category',Category)
      expectBehavior         ('behavior',Behavior)

      const normalizedBehavior = Behavior.toLowerCase()
// @ts-ignore TS7053 allow indexing
      const Registration = this._BehaviorPool[Category][normalizedBehavior]
      return (Registration != null) && (Registration.Error != null)
    }

  /**** BehaviorOfCategoryIsUnused ****/

    public BehaviorOfCategoryIsUnused (
      Category:WAT_Category, Behavior:WAT_Behavior
    ):boolean {
      expectCategory('behavior category',Category)
      expectBehavior         ('behavior',Behavior)

      const normalizedBehavior = Behavior.toLowerCase()
// @ts-ignore TS7053 allow indexing
      const Registration = this._BehaviorPool[Category][normalizedBehavior]
      if (Registration == null) throwError(
        `InvalidArgument:no ${Category} behaviour named ${Behavior} found`
      )

      switch (Category) {
        case 'applet':
          return (this._normalizedBehavior !== normalizedBehavior)
        case 'page':
          return this.PageList.every(
            (Page:WAT_Page) => Page.normalizedBehavior !== normalizedBehavior
          )
        case 'widget':
          return this.PageList.every((Page:WAT_Page) => Page.WidgetList.every(
            (Widget:WAT_Widget) => Widget.normalizedBehavior !== normalizedBehavior
          ))
      }
      return false                               // just to satisfy the compiler
    }

  /**** SerializationOfBehavior ****/

    public SerializationOfBehavior (
      Category:WAT_Category, Behavior:WAT_Behavior
    ):Indexable {
      expectCategory('behavior category',Category)
      expectBehavior         ('behavior',Behavior)

      const normalizedBehavior = Behavior.toLowerCase()
// @ts-ignore TS7053 allow indexing
      const Registration = this._BehaviorPool[Category][normalizedBehavior]
      if (Registration == null) throwError(
        `InvalidArgument: no ${Category} behaviour ${quoted(Behavior)} found`
      )

      const { Name,activeScript } = Registration
      return { BehaviorSet:{ [Category]: [{
        Name, Script:activeScript
      }] } }
    }

  /**** SerializationOfBehavior ****/

    public SerializationOfBehaviors (groupedBehaviorList:Indexable):Indexable|undefined {
      expectPlainObject('grouped behavior list',groupedBehaviorList)

      const Serialization:Indexable = {}; let SerializationIsEmpty:boolean = true
        if ('applet' in groupedBehaviorList) {
          let AppletBehaviors:WAT_Behavior[] = groupedBehaviorList['applet']
          expectListSatisfying('list of applet behaviors',AppletBehaviors,ValueIsBehavior)

          AppletBehaviors = AppletBehaviors.filter(
            (Behavior:WAT_Behavior) => Behavior.toLowerCase() in this._BehaviorPool['applet']
          )
          if (AppletBehaviors.length > 0) {
            SerializationIsEmpty = false
            Serialization['applet'] = AppletBehaviors.map((Behavior:WAT_Behavior) => {
              let Registration = this._BehaviorPool['applet'][Behavior.toLowerCase()]
              return { Name:Registration.Name, Script:Registration.activeScript }
            })
          }
        }

        if ('page' in groupedBehaviorList) {
          let PageBehaviors:WAT_Behavior[] = groupedBehaviorList['page']
          expectListSatisfying('list of page behaviors',PageBehaviors,ValueIsBehavior)

          PageBehaviors = PageBehaviors.filter(
            (Behavior:WAT_Behavior) => Behavior.toLowerCase() in this._BehaviorPool['page']
          )
          if (PageBehaviors.length > 0) {
            SerializationIsEmpty = false
            Serialization['page'] = PageBehaviors.map((Behavior:WAT_Behavior) => {
              let Registration = this._BehaviorPool['page'][Behavior.toLowerCase()]
              return { Name:Registration.Name, Script:Registration.activeScript }
            })
          }
        }

        if ('widget' in groupedBehaviorList) {
          let WidgetBehaviors:WAT_Behavior[] = groupedBehaviorList['widget']
          expectListSatisfying('list of widget behaviors',WidgetBehaviors,ValueIsBehavior)

          WidgetBehaviors = WidgetBehaviors.filter(
            (Behavior:WAT_Behavior) => Behavior.toLowerCase() in this._BehaviorPool['widget']
          )
          if (WidgetBehaviors.length > 0) {
            SerializationIsEmpty = false
            Serialization['widget'] = WidgetBehaviors.map((Behavior:WAT_Behavior) => {
              let Registration = this._BehaviorPool['widget'][Behavior.toLowerCase()]
              return { Name:Registration.Name, Script:Registration.activeScript }
            })
          }
        }
      return (SerializationIsEmpty ? undefined : Serialization)
    }

  /**** deserializeBehavior[s] ****/

    public deserializeBehaviorsFrom (Serialization:Indexable):void {
      this._deserializeBehaviorsFrom(Serialization)
    }

    public deserializeBehaviorFrom (Serialization:Indexable):void {
      this._deserializeBehaviorsFrom(Serialization)
    }

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
                SourceWidget.normalizedBehavior === 'plain_controls.outline'
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
            SourceWidget.normalizedBehavior === 'plain_controls.outline'
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

  /**** uniqueWidgets ****/

    public get uniqueWidgets ():Indexable {
      const WidgetSet:Indexable = {}
        this._PageList.forEach((Page:WAT_Page) => {
          const uniqueWidgets = Page.uniqueWidgets
          Object.assign(WidgetSet,uniqueWidgets)
        })
      return WidgetSet
    }
    public set uniqueWidgets (_:Indexable) { throwReadOnlyError('uniqueWidgets') }

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

  /**** minWidth ****/

    protected _minWidth:WAT_Dimension|undefined = undefined

    public get minWidth ():WAT_Dimension {
      return (this._minWidth == null ? 0 : this._minWidth)
    }
    public set minWidth (_:WAT_Dimension|undefined) {
      throwReadOnlyError('minWidth')
    }

  /**** maxWidth ****/

    protected _maxWidth:WAT_Dimension|undefined = undefined

    public get maxWidth ():WAT_Dimension|undefined {
      return this._maxWidth
    }
    public set maxWidth (_:WAT_Dimension|undefined) {
      throwReadOnlyError('maxWidth')
    }

  /**** minHeight ****/

    protected _minHeight:WAT_Dimension|undefined = undefined

    public get minHeight ():WAT_Dimension {
      return (this._minHeight == null ? 0 : this._minHeight)
    }
    public set minHeight (_:WAT_Dimension|undefined) {
      throwReadOnlyError('minHeight')
    }

  /**** maxHeight ****/

    protected _maxHeight:WAT_Dimension|undefined = undefined

    public get maxHeight ():WAT_Dimension|undefined {
      return this._maxHeight
    }
    public set maxHeight (_:WAT_Dimension|undefined) {
      throwReadOnlyError('maxHeight')
    }

  /**** toBeCentered ****/

    protected _toBeCentered:boolean = true

    public get toBeCentered ():boolean  { return this._toBeCentered }
    public set toBeCentered (_:boolean) { throwReadOnlyError('toBeCentered') }

  /**** withMobileFrame ****/

    protected _withMobileFrame:boolean = false

    public get withMobileFrame ():boolean  { return this._withMobileFrame }
    public set withMobileFrame (_:boolean) { throwReadOnlyError('withMobileFrame') }

  /**** expectedOrientation ****/

    protected _expectedOrientation:WAT_Orientation = 'any'

    public get expectedOrientation ():WAT_Orientation  { return this._expectedOrientation }
    public set expectedOrientation (_:WAT_Orientation) { throwReadOnlyError('expectedOrientation') }

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

  /**** Overflows ****/

    public get Overflows ():WAT_Overflow[]  { return ['hidden','hidden'] }
    public set Overflows (_:WAT_Overflow[]) { throwReadOnlyError('Overflows') }

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

  /**** HeadExtensions ****/

    protected _HeadExtensions:WAT_Text = ''

    public get HeadExtensions ():WAT_Text  { return this._HeadExtensions }
    public set HeadExtensions (newValue:WAT_Text) {
      allowText('head extension',newValue)
      if (newValue == null) { newValue = '' }

      newValue = newValue.trim()
      if (this._HeadExtensions !== newValue) {
        this._HeadExtensions = newValue
//      this.rerender()                                   // no need to rerender
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

    public newPageAt (Behavior:WAT_Behavior|undefined, Index?:number):WAT_Page {
      return this.PageDeserializedAt({ Behavior:Behavior || null },Index)
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

      const Behavior = acceptableValue(Serialization.Behavior,ValueIsBehavior)

      let newPage = new WAT_Page(Behavior,this)
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
        allowBoolean            ('dialog mode',Descriptor.asAppletOverlay)
        allowBoolean   ('right anchor setting',Descriptor.fromRight)
        allowBoolean  ('bottom anchor setting',Descriptor.fromBottom)
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
        Name, asAppletOverlay, fromRight, fromBottom,
        Title, isModal, isClosable, isDraggable, isResizable,
        x,y, Width,Height, minWidth,maxWidth, minHeight,maxHeight,
        onOpen,onClose
      } = Descriptor

      if (this.DialogIsOpen(Descriptor.Name)) throwError(
        `AlreadyOpen: a dialog named ${quoted(Descriptor.Name)} is already open`
      )

      if (asAppletOverlay == null) { asAppletOverlay = false }
      const asDialog = ! asAppletOverlay

      if (isModal     == null) { isModal     = false }
      if (isClosable  == null) { isClosable  = asDialog }
      if (isDraggable == null) { isDraggable = asDialog }
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
//    x = Math.max(0, Math.min(x, this.Width-Width))
//    y = Math.max(0, Math.min(y,this.Height-Height))

      const Dialog:WAT_Dialog = {
        Name, normalizedName:Name.toLowerCase(), SourceWidgetPath,
        asAppletOverlay, fromRight, fromBottom,
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
        this._serializeBehaviorsInto(Result)
        this._serializeConfigurationInto(Result)
        this._serializePagesInto(Result)
      return Result
    }
    public set Serialization (_:Serializable) { throwReadOnlyError('Serialization') }

  /**** _serializeBehaviorsInto ****/

    protected _serializeBehaviorsInto (Serialization:Serializable):void {
      const BehaviorSet = this.BehaviorSet

      Serialization.BehaviorSet = { applet:{}, page:{}, widget:{} }
        Object.keys(BehaviorSet.applet).forEach((normalizedBehavior:WAT_Behavior) => {
          if (! BehaviorIsIntrinsic(normalizedBehavior)) {
            const { Name,activeScript } = BehaviorSet.applet[normalizedBehavior]
// @ts-ignore TS18047 Serialization.BehaviorSet is not null
            Serialization.BehaviorSet.applet[Name] = activeScript
          }
        })

        Object.keys(BehaviorSet.page).forEach((normalizedBehavior:WAT_Behavior) => {
          if (! BehaviorIsIntrinsic(normalizedBehavior)) {
            const { Name,activeScript } = BehaviorSet.page[normalizedBehavior]
// @ts-ignore TS18047 Serialization.BehaviorSet is not null
            Serialization.BehaviorSet.page[Name] = activeScript
          }
        })

        Object.keys(BehaviorSet.widget).forEach((normalizedBehavior:WAT_Behavior) => {
          if (! BehaviorIsIntrinsic(normalizedBehavior)) {
            const { Name,activeScript } = BehaviorSet.widget[normalizedBehavior]
// @ts-ignore TS18047 Serialization.BehaviorSet is not null
            Serialization.BehaviorSet.widget[Name] = activeScript
          }
        })
      return
    }

  /**** _deserializeBehaviorsFrom ****/

    protected _deserializeBehaviorsFrom (Serialization:Serializable):void {
      const BehaviorSet = Serialization.BehaviorSet
      if (! ValueIsPlainObject(BehaviorSet)) { return }

// @ts-ignore TS18047 BehaviorSet is not null
      const AppletBehaviorSet = BehaviorSet['applet']
      if (ValueIsPlainObject(AppletBehaviorSet)) {
        Object.entries(AppletBehaviorSet).forEach(([Name,Script]) => {
          if (ValueIsBehavior(Name) && ValueIsText(Script)) {
            this.registerBehaviorOfCategory('applet',Name,Script as WAT_Text)
          }
        })
      }

// @ts-ignore TS18047 BehaviorSet is not null
      const PageBehaviorSet = BehaviorSet['page']
      if (ValueIsPlainObject(PageBehaviorSet)) {
        Object.entries(PageBehaviorSet).forEach(([Name,Script]) => {
          if (ValueIsBehavior(Name) && ValueIsText(Script)) {
            this.registerBehaviorOfCategory('page',Name,Script as WAT_Text)
          }
        })
      }

// @ts-ignore TS18047 BehaviorSet is not null
      const WidgetBehaviorSet = BehaviorSet['widget']
      if (ValueIsPlainObject(WidgetBehaviorSet)) {
        Object.entries(WidgetBehaviorSet).forEach(([Name,Script]) => {
          if (ValueIsBehavior(Name) && ValueIsText(Script)) {
            this.registerBehaviorOfCategory('widget',Name,Script as WAT_Text)
          }
        })
      }
    }

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
        'HeadExtensions',
      ].forEach((Name:string) => this._serializePropertyInto(Name,Serialization))

    /**** "activeScript" needs special treatment ****/

// @ts-ignore TS2339 if it exists "Serialization.activeScript" is a string
      if ((Serialization.activeScript || '').trim() === '') {
        delete Serialization.activeScript
      }

    /**** additional properties used by the "WAT Applet Manager" ****/

      ;[
        'Width','Height',
        'minWidth','minHeight','maxWidth','maxHeight',
        'toBeCentered', 'withMobileFrame', 'expectedOrientation',
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
        'HeadExtensions',
      ].forEach((Name:string) => deserializeProperty(Name))

    /**** additional properties used by the "WAT Applet Manager" ****/

      if (ValueIsBoolean(Serialization.toBeCentered))    { this._toBeCentered    = Serialization.toBeCentered as boolean }
      if (ValueIsOrdinal(Serialization.minWidth))        { this._minWidth        = Serialization.minWidth   as number }
      if (ValueIsOrdinal(Serialization.minHeight))       { this._minHeight       = Serialization.minHeight  as number }
      if (ValueIsOrdinal(Serialization.maxWidth))        { this._maxWidth        = Serialization.maxWidth   as number }
      if (ValueIsOrdinal(Serialization.maxHeight))       { this._maxHeight       = Serialization.maxHeight  as number }
      if (ValueIsBoolean(Serialization.withMobileFrame)) { this._withMobileFrame = Serialization.withMobileFrame as boolean }
      if (ValueIsOneOf(Serialization.expectedOrientation,WAT_Orientations)) {
        this._expectedOrientation = Serialization.expectedOrientation as WAT_Orientation
      }
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

      const Behavior = acceptableValue(Serialization.Behavior,ValueIsBehavior)

      const Applet = new WAT_Applet(Behavior)
        const AppletName = Serialization.Name
        delete Serialization.Name

        if (ValueIsName(AppletName)) {
          (Applet as Indexable)._Name = AppletName
        }

        registerIntrinsicBehaviorsIn(Applet)

        Applet._deserializeBehaviorsFrom(Serialization)
        Applet._deserializeConfigurationFrom(Serialization)
        Applet._deserializePagesFrom(Serialization)
      return Applet
    }

  /**** preserve ****/

    public async preserve ():Promise<void> {
      await AppletStore.setItem(this.Name,JSON.stringify(this.Serialization))
    }

  /**** replaceWith ****/

    public replaceWith (Serialization:Serializable):void {
      const AppletView = this._View; delete this._View
      const AppletName = this._Name; delete Serialization.Name
        this.clear()

        this._deserializeConfigurationFrom(Serialization)
        this._deserializePagesFrom(Serialization)
      this._Name = AppletName
      this._View = AppletView

      this.on('mount')()

      if (this.visitedPage == null) {
        this.visitPage(this.PageList[0])
      }

      this.rerender()
    }
  }

//------------------------------------------------------------------------------
//--                                 WAT_Page                                 --
//------------------------------------------------------------------------------

  export class WAT_Page extends WAT_Visual {
    public constructor (Behavior:WAT_Behavior|undefined, Applet:WAT_Applet) {
      super(Behavior,Applet)
    }

  /**** Category ****/

    public get Category ():WAT_Category  { return 'page' }
    public set Category (_:WAT_Category) { throwReadOnlyError('Category') }

  /**** Behavior ****/

    public get Behavior ():WAT_Behavior|undefined { return this._Behavior }
    public set Behavior (newBehavior:WAT_Behavior|undefined) {
      allowBehavior('applet behavior',newBehavior)

      const normalizedBehavior = (newBehavior == null ? undefined : newBehavior.toLowerCase())
      if (this._normalizedBehavior !== normalizedBehavior) {
        this._normalizedBehavior = normalizedBehavior
// @ts-ignore TS7053 allow indexing
        this._Behavior = this._BehaviorPool['applet'][normalizedBehavior]?.Name || newBehavior
        this.rerender()
      }
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

  /**** uniqueWidgets ****/

    public get uniqueWidgets ():Indexable {
      const WidgetSet:Indexable = {}
        this._WidgetList.forEach((Widget:WAT_Widget) => {
          if ((Widget.Name != null) && Widget.Name.startsWith('@')) {
            WidgetSet[Widget.Name] = Widget
          }
        })
      return WidgetSet
    }
    public set uniqueWidgets (_:Indexable) { throwReadOnlyError('uniqueWidgets') }

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

  /**** Overflows ****/

    protected _Overflows:WAT_Overflow[]|undefined

    public get Overflows ():WAT_Overflow[] {
      return acceptableValue(
        this._Overflows,
        (Value:any) => ValueIsListOf(Value,['hidden','scroll','auto']),
        ['hidden','hidden']
      )
    }

    public set Overflows (newValue:WAT_Overflow[]|undefined) {
      allowListOf('overflow settings',newValue, ['hidden','scroll','auto'])
      if (ValuesDiffer(this._Overflows,newValue)) {
        this._Overflows = (newValue == null ? undefined : newValue.slice())
        this.rerender()
      }
    }

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

    public newWidgetAt (Behavior:WAT_Behavior|undefined, Index?:number):WAT_Widget {
      return this.WidgetDeserializedAt({ Behavior:Behavior || null },Index)
    }

  /**** WidgetDeserializedAt ****/

    public WidgetDeserializedAt (
      Serialization:Serializable, Index?:number
    ):WAT_Widget {
      expectSerializableObject('widget serialization',Serialization)
      allowInteger          ('widget insertion index',Index)

      if (Index == null) {
        Index = this._WidgetList.length
      } else {
        if (Index < 0) { Index += this._WidgetList.length }
        Index = Math.max(0,Math.min(Index,this._WidgetList.length))
      }

      const Behavior = acceptableValue(Serialization.Behavior,ValueIsBehavior)

      let Widget = new WAT_Widget(Behavior,this)
        this._WidgetList.splice(Index,0,Widget)

// @ts-ignore TS2446 allow WAT_Page to access a protected member of WAT_Widget
        Widget._deserializeConfigurationFrom(Serialization)

        this.rerender()
      return Widget
    }

  /**** DuplicateOfWidgetAt ****/

    public DuplicateOfWidgetAt (Index:number):WAT_Widget {
      expectInteger('widget index',Index)

      const Widget = this.existingWidget(Index)                           // DRY
      return this.WidgetDeserializedAt(Widget.Serialization,Index)
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

          this.WidgetDeserializedAt(WidgetSerialization,Index)
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

  export class WAT_Widget extends WAT_Visual {
    public constructor (Behavior:WAT_Behavior|undefined, Page:WAT_Page) {
      super(Behavior,Page)
    }

    private _Pane:WAT_Page|WAT_Widget|WAT_Dialog|WAT_Overlay|undefined
                               // avoids multiple renderings at different places

  /**** Category ****/

    public get Category ():WAT_Category  { return 'widget' }
    public set Category (_:WAT_Category) { throwReadOnlyError('Category') }

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

    public get maxWidth ():WAT_Dimension|undefined {
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

    public get minHeight ():WAT_Dimension {
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

    public get maxHeight ():WAT_Dimension|undefined {
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

  /**** Overflows ****/

    protected _Overflows:WAT_Overflow[]|undefined

    public get Overflows ():WAT_Overflow[] {
      return acceptableValue(
        this._Overflows,(Value:any) => ValueIsListOf(Value,WAT_Overflows),
        ['visible','visible']
      )
    }

    public set Overflows (newValue:WAT_Overflow[]|undefined) {
      allowListOf('overflow settings',newValue,WAT_Overflows)
      if (ValuesDiffer(this._Overflows,newValue)) {
        this._Overflows = (newValue == null ? undefined : newValue.slice())
        this.rerender()
      }
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
        'Lock','Visibility','Enabling'
      ].forEach((Name:string) => deserializeProperty(Name))
    }
  }

//------------------------------------------------------------------------------
//--                           built-in Behaviours                            --
//------------------------------------------------------------------------------

/**** for ImageView ****/

  export const WAT_ImageScalings = ['none','stretch','cover','contain']
  export type  WAT_ImageScaling  = typeof WAT_ImageScalings[number]

  export const WAT_ImageAlignments = [
    'left top','center top','right top','left center','center center',
    'right center','left bottom','center bottom','right bottom'
  ]
  export type WAT_ImageAlignment = typeof WAT_ImageAlignments[number]

/**** for WebView ****/

  export const WAT_DefaultSandboxPermissions = (
    'allow-downloads allow-forms allow-modals allow-orientation-lock ' +
    'allow-pointer-lock allow-popups allow-same-origin allow-scripts'
  )

  export const WAT_ReferrerPolicies = [
    'no-referrer','no-referrer-when-downgrade','origin','origin-when-cross-origin',
    'same-origin', 'strict-origin', 'strict-origin','strict-origin-when-cross-origin',
    'unsafe-url'
  ]
  export type WAT_ReferrerPolicy = typeof WAT_ReferrerPolicies[number]

/**** for Slider ****/

  const HashmarkPattern = /^\s*([+-]?(\d+([.]\d+)?|[.]\d+)([eE][+-]?\d+)?|\d*[.](?:\d*))(?:\s*:\s*([^\x00-\x1F\x7F-\x9F\u2028\u2029\uFFF9-\uFFFB]+))?$/

  function HashmarkMatcher (Value:any):boolean {
    return ValueIsStringMatching(Value,HashmarkPattern) || ValueIsNumber(Value)
  }

/**** for TimeInput ****/

  export const WAT_TimePattern = '\\d{2}:\\d{2}'
  export const WAT_TimeRegExp  = /\d{2}:\d{2}/

  export function WAT_TimeMatcher (Value:any):boolean {
    return ValueIsStringMatching(Value,WAT_TimeRegExp)
  }

/**** for DateTimeInput ****/

  export const WAT_DateTimePattern = '\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}'
  export const WAT_DateTimeRegExp  = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/

  export function WAT_DateTimeMatcher (Value:any):boolean {
    return ValueIsStringMatching(Value,WAT_DateTimeRegExp)
  }

/**** for DateInput ****/

  export const WAT_DatePattern = '\\d{4}-\\d{2}-\\d{2}'
  export const WAT_DateRegExp  = /\d{4}-\d{2}-\d{2}/

  export function WAT_DateMatcher (Value:any):boolean {
    return ValueIsStringMatching(Value,WAT_DateRegExp)
  }

/**** for WeekInput ****/

  export const WAT_WeekPattern = '\\d{4}-W\\d{2}'
  export const WAT_WeekRegExp  = /\d{4}-W\d{2}/

  export function WAT_WeekMatcher (Value:any):boolean {
    return ValueIsStringMatching(Value,WAT_WeekRegExp)
  }

/**** for MonthInput ****/

  export const WAT_MonthPattern = '\\d{4}-\\d{2}'
  export const WAT_MonthRegExp  = /\d{4}-\d{2}/

  export function WAT_MonthMatcher (Value:any):boolean {
    return ValueIsStringMatching(Value,WAT_MonthRegExp)
  }

/**** for MarkdownView ****/

  import { Marked }          from 'marked'
//import   markedKatex       from 'marked-katex-extension'
  import { markedHighlight } from 'marked-highlight'
    import hljs from 'highlight.js/lib/core'

    import { default as _css }        from 'highlight.js/lib/languages/css'
      hljs.registerLanguage('html',_css)
    import { default as _javascript } from 'highlight.js/lib/languages/javascript'
      hljs.registerLanguage('javascript',_javascript)
    import { default as _java }       from 'highlight.js/lib/languages/java'
      hljs.registerLanguage('java',_java)
    import { default as _json }       from 'highlight.js/lib/languages/json'
      hljs.registerLanguage('json',_json)
    import { default as _typescript } from 'highlight.js/lib/languages/typescript'
      hljs.registerLanguage('typescript',_typescript)
    import { default as _xml }        from 'highlight.js/lib/languages/xml'
      hljs.registerLanguage('html',_xml)
      hljs.registerLanguage('xml', _xml)

/**** now actually register all intrinsic behaviours ****/

  function registerIntrinsicBehaviorsIn (Applet:WAT_Applet) {
/**** plain_Widget ****/

  const WAT_plainWidget:WAT_BehaviorFunction = async (
    me,my, html,reactively, on, onRender, onMount,onUpdate,onUnmount, onValueChange,
    installStylesheet,BehaviorIsNew
  ) => {
    my.configurableProperties = [
      { Name:'visiblePattern', Label:'visible Pattern', Default:true,
        EditorType:'checkbox', AccessorsFor:'memoized' },
    ]

    onRender(() => {
      return html`<div class="WAT Content ${my.visiblePattern === true ? 'Placeholder' : ''}"/>`
    })
  }

  registerIntrinsicBehavior(
    Applet, 'widget', 'basic_controls.plain_Widget', WAT_plainWidget
  )

/**** Outline ****/

  const WAT_Outline:WAT_BehaviorFunction = async (
    me,my, html,reactively, on, onRender, onMount,onUpdate,onUnmount, onValueChange,
    installStylesheet,BehaviorIsNew
  ) => {
    installStylesheet(`
      .WAT.Widget > .WAT.Outline {
        outline:dotted 1px blue;
        outline-offset:2px;
      }
    `)

  /**** custom Properties ****/

    Object_assign(me,{
    /**** bundledWidgets ****/

      bundledWidgets: function ():WAT_Widget[] {
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
      },
    } as Indexable)

  /**** Renderer ****/

    onRender(() => html`<div class="WAT Content Outline"/>`)
  }

  registerIntrinsicBehavior (
    Applet, 'widget', 'basic_controls.Outline', WAT_Outline
  )
/**** WidgetPane ****/

  const WAT_WidgetPane:WAT_BehaviorFunction = async (
    me,my, html,reactively, on, onRender, onMount,onUpdate,onUnmount, onValueChange,
    installStylesheet,BehaviorIsNew
  ) => {
    installStylesheet(`
      .WAT.Widget > .WAT.WidgetPane {
        overflow:hidden;
      }
    `)

  /**** custom Properties ****/

    my.configurableProperties = [
      { Name:'Value', EditorType:'textline-input', Placeholder:'(enter content path)' }
    ]

    Object_assign(me,{
    /**** Value ****/

      get Value ():WAT_Path|undefined {
        return acceptableValue(this.memoized.Value,ValueIsPath) as WAT_Path
      },

      set Value (newValue:WAT_Path|WAT_Widget|undefined) {
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
          if (this.memoized.Value != null) {
            this.memoized.Value = undefined
            this.on('Value')()
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
          this.memoized.Value = SourcePath
          this.on('Value')()
          this.rerender()
        }
      },

  /**** _releaseWidgets ****/

    _shownWidgets:[] as WAT_Widget[],

    _releaseWidgets: function ():void {
      this._shownWidgets.forEach((Widget:Indexable) => Widget._Pane = undefined)
    },

    componentWillUnmount: function () {
      this._releaseWidgets()
    },

    /**** _GeometryRelativeTo  ****/

      _GeometryOfWidgetRelativeTo: function (
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
      },
    } as Indexable)

  /**** Renderer ****/

    onRender(function (this:Indexable) {
      this._releaseWidgets()

      const Value = this.Value
      if (Value == null) { return '' }

      const SourceWidget = this.Applet?.WidgetAtPath(Value as WAT_Path)
      if ((SourceWidget == null) || (SourceWidget === this)) { return '' }

      const WidgetsToShow:WAT_Widget[] = (
        SourceWidget.normalizedBehavior === 'basic_controls.outline'
        ? (SourceWidget as Indexable).bundledWidgets()
        : [SourceWidget]
      ).filter((Widget:Indexable) => (
        Widget.isVisible && ((Widget._Pane == null) || (Widget._Pane === this))
      ))
        WidgetsToShow.forEach((Widget:Indexable) => Widget._Pane = this)
      this._shownWidgets = WidgetsToShow

      const PaneGeometry = this.Geometry
      const BaseGeometry = SourceWidget.Geometry

      return html`<div class="WAT Content WidgetPane">
        ${(WidgetsToShow as any).toReversed().map((Widget:WAT_Widget) => {
          let Geometry = this._GeometryOfWidgetRelativeTo(Widget,BaseGeometry,PaneGeometry)
          return html`<${WAT_WidgetView} Widget=${Widget} Geometry=${Geometry}/>`
        })}
      </div>`
    })
  }

  registerIntrinsicBehavior (
    Applet, 'widget', 'basic_controls.WidgetPane', WAT_WidgetPane
  )

/**** TextView ****/

  const WAT_TextView:WAT_BehaviorFunction = async (
    me,my, html,reactively, on, onRender, onMount,onUpdate,onUnmount, onValueChange,
    installStylesheet,BehaviorIsNew
  ) => {
    installStylesheet(`
      .WAT.Widget > .WAT.TextView {
        white-space:pre-wrap;
      }
    `)

  /**** custom Properties ****/

    my.configurableProperties = [
      { Name:'Value',            Placeholder:'(enter text)',
        EditorType:'text-input', AccessorsFor:'memoized', withCallback:true, },
      { Name:'readonly',
        EditorType:'checkbox',       AccessorsFor:'memoized' },
      { Name:'acceptableFileTypes',  Label:'File Types', Default:[],
        EditorType:'linelist-input', AccessorsFor:'memoized', Validator:ValueIsTextFormat },
    ]

  /**** Renderer ****/

    onRender(function (this:Indexable) {
      const { Enabling,readonly } = this

      let acceptableFileTypes = this.acceptableFileTypes
      if (acceptableFileTypes.length === 0) { acceptableFileTypes = WAT_supportedTextFormats.slice() }

    /**** prepare file dropping ****/

      const allowsDropping = (
        (Enabling == true) && ! readonly && (acceptableFileTypes.length > 0)
      )

      function _acceptableDataIn (Event:Indexable):boolean {
        if (Event.dataTransfer.types.includes('text/plain')) { return true }

        for (let Item of Event.dataTransfer.items) {
          if ((Item.kind === 'file') && acceptableFileTypes.includes(Item.type)) {
            return true
          }
        }
        return false
      }

      const _onDragOver = (Event:Indexable) => {
        if (_acceptableDataIn(Event)) {
          Event.preventDefault()
          Event.dataTransfer.dropEffect = 'copy'
        }
      }
      const _onDrop = async (Event:Indexable) => {
        if (_acceptableDataIn(Event)) {
          Event.preventDefault()

          if (Event.dataTransfer.types.includes('text/plain')) {
            const Value = Event.dataTransfer.getData('text')
            this.Value = Value
            this.on('input')(Event)
          } else {
            try {
              for (let Item of Event.dataTransfer.items) {
                if ((Item.kind === 'file') && acceptableFileTypes.includes(Item.type)) {
                  this.Value = await FileReadAsText(Item.getAsFile(),Item.type)
                  this.on('input')(Event)
                  break
                }
              }
            } catch (Signal:any) {
console.warn('file drop error',Signal)
              this.on('drop-error')(Signal)
            }
          }
        }
      }

    /**** actual rendering ****/

      return html`<div class="WAT Content TextView"
        onDragOver=${allowsDropping && _onDragOver} onDrop=${allowsDropping && _onDrop}
      >${this.Value}</>`
    })
  }

  registerIntrinsicBehavior (
    Applet, 'widget', 'basic_controls.TextView', WAT_TextView
  )

/**** HTMLView ****/

  const WAT_HTMLView:WAT_BehaviorFunction = async (
    me,my, html,reactively, on, onRender, onMount,onUpdate,onUnmount, onValueChange,
    installStylesheet,BehaviorIsNew
  ) => {
  /**** custom Properties ****/

    my.configurableProperties = [
      { Name:'Value',                Placeholder:'(enter HTML)',
        EditorType:'text-input',     AccessorsFor:'memoized', withCallback:true },
      { Name:'readonly',             Default:true,
        EditorType:'checkbox',       AccessorsFor:'memoized' },
      { Name:'acceptableFileTypes',  Label:'File Types', Default:[],
        EditorType:'linelist-input', AccessorsFor:'memoized', Validator:ValueIsHTMLFormat },
    ]

  /**** Renderer ****/

    onRender(function (this:Indexable) {
      const { Enabling,readonly } = this

      let acceptableFileTypes = this.acceptableFileTypes
      if (acceptableFileTypes.length === 0) { acceptableFileTypes = WAT_supportedHTMLFormats.slice() }

    /**** prepare file dropping ****/

      const allowsDropping = (
        (Enabling == true) && ! readonly && (acceptableFileTypes.length > 0)
      )

      function _acceptableDataIn (Event:Indexable):boolean {
        if (Event.dataTransfer.types.includes('text/plain')) { return true }

        for (let Item of Event.dataTransfer.items) {
          if ((Item.kind === 'file') && acceptableFileTypes.includes(Item.type)) {
            return true
          }
        }
        return false
      }

      const _onDragOver = (Event:Indexable) => {
        if (_acceptableDataIn(Event)) {
          Event.preventDefault()
          Event.dataTransfer.dropEffect = 'copy'
        }
      }
      const _onDrop = async (Event:Indexable) => {
        if (_acceptableDataIn(Event)) {
          Event.preventDefault()

          if (Event.dataTransfer.types.includes('text/plain')) {
            const Value = Event.dataTransfer.getData('text')
            this.Value = Value
            this.on('input')(Event)
          } else {
            try {
              for (let Item of Event.dataTransfer.items) {
                if ((Item.kind === 'file') && acceptableFileTypes.includes(Item.type)) {
                  this.Value = await FileReadAsHTML(Item.getAsFile(),Item.type)
                  this.on('input')(Event)
                  break
                }
              }
            } catch (Signal:any) {
console.warn('file drop error',Signal)
              this.on('drop-error')(Event)
            }
          }
        }
      }

    /**** actual rendering ****/

      return html`<div class="WAT Content HTMLView"
        onDragOver=${allowsDropping && _onDragOver} onDrop=${allowsDropping && _onDrop}
        dangerouslySetInnerHTML=${{__html:this.Value || ''}}
      />`
    })
  }

  registerIntrinsicBehavior (
    Applet, 'widget', 'basic_controls.HTMLView', WAT_HTMLView
  )

/**** ImageView ****/

  const WAT_ImageView:WAT_BehaviorFunction = async (
    me,my, html,reactively, on, onRender, onMount,onUpdate,onUnmount, onValueChange,
    installStylesheet,BehaviorIsNew
  ) => {
    installStylesheet(`
      .WAT.Widget > .WAT.ImageView {
        object-fit:contain; object-position:center;
      }
    `)

  /**** custom Properties ****/

    my.configurableProperties = [
      { Name:'Value',           Placeholder:'(enter image URL)',
        EditorType:'url-input', AccessorsFor:'memoized', withCallback:true },
      { Name:'readonly',
        EditorType:'checkbox',  AccessorsFor:'memoized' },
      { Name:'ImageScaling',     Label:'Image Scaling',   Default:'contain',
        EditorType:'drop-down',  AccessorsFor:'memoized', ValueList:WAT_ImageScalings },
      { Name:'ImageAlignment',   Label:'Image Alignment', Default:'center center',
        EditorType:'drop-down',  AccessorsFor:'memoized', ValueList:WAT_ImageAlignments },
      { Name:'acceptableFileTypes',  Label:'File Types', Default:[],
        EditorType:'linelist-input', AccessorsFor:'memoized', Validator:ValueIsImageFormat },
    ]

  /**** Renderer ****/

    onRender(function (this:Indexable) {
      const { ImageScaling,ImageAlignment, Enabling,readonly } = this

      let acceptableFileTypes = this.acceptableFileTypes
      if (acceptableFileTypes.length === 0) { acceptableFileTypes = WAT_supportedImageFormats.slice() }

    /**** prepare file dropping ****/

      const allowsDropping = (
        (Enabling == true) && ! readonly && (acceptableFileTypes.length > 0)
      )

      function _acceptableDataIn (Event:Indexable):boolean {
        if (Event.dataTransfer.types.some((Type:string) => (
          (Type === 'text/html') &&
          Event.dataTransfer.getData('text/html').includes('<img')
        ))) { return true }

        for (let Item of Event.dataTransfer.items) {
          if ((Item.kind === 'file') && acceptableFileTypes.includes(Item.type)) {
            return true
          }
        }
        return false
      }

      const _onDragOver = (Event:Indexable) => {
        if (_acceptableDataIn(Event)) {
          Event.preventDefault()
          Event.dataTransfer.dropEffect = 'copy'
        }
      }
      const _onDrop = async (Event:Indexable) => {
        if (_acceptableDataIn(Event)) {
          Event.preventDefault()

          if (Event.dataTransfer.types.some((Type:string) => (
            (Type === 'text/html') &&
            Event.dataTransfer.getData('text/html').includes('<img')
          ))) {
            const HTML = Event.dataTransfer.getData('text/html')
              const Parser = new DOMParser()
              const Doc    = Parser.parseFromString(HTML,'text/html')
              const ImageSource = Doc.querySelector('img')?.src
            this.Value = ImageSource
            this.on('input')(Event)
          } else {
            try {
              for (let Item of Event.dataTransfer.items) {
                if ((Item.kind === 'file') && acceptableFileTypes.includes(Item.type)) {
                  this.Value = await FileReadAsImage(Item.getAsFile(),Item.type)
                  this.on('input')(Event)
                  break
                }
              }
            } catch (Signal:any) {
console.warn('file drop error',Signal)
              this.on('drop-error')(Event)
            }
          }
        }
      }

    /**** actual rendering ****/

      return html`<img class="WAT Content ImageView"
        src=${this.Value || ''}
        style="object-fit:${ImageScaling}; object-position:${ImageAlignment}"
        onDragOver=${allowsDropping && _onDragOver} onDrop=${allowsDropping && _onDrop}
      />`
    })
  }

  registerIntrinsicBehavior (
    Applet, 'widget', 'basic_controls.ImageView', WAT_ImageView
  )

/**** SVGView ****/

  const WAT_SVGView:WAT_BehaviorFunction = async (
    me,my, html,reactively, on, onRender, onMount,onUpdate,onUnmount, onValueChange,
    installStylesheet,BehaviorIsNew
  ) => {
    installStylesheet(`
      .WAT.Widget > .WAT.SVGView {
        object-fit:contain; object-position:center;
      }
    `)

  /**** custom Properties ****/

    my.configurableProperties = [
      { Name:'Value',            Placeholder:'(enter SVG)',
        EditorType:'text-input', AccessorsFor:'memoized', withCallback:true },
      { Name:'ImageScaling',     Label:'Image Scaling',   Default:'contain',
        EditorType:'drop-down',  AccessorsFor:'memoized', ValueList:WAT_ImageScalings },
      { Name:'ImageAlignment',   Label:'Image Alignment', Default:'center center',
        EditorType:'drop-down',  AccessorsFor:'memoized', ValueList:WAT_ImageAlignments },
    ]

  /**** Renderer ****/

    onRender(function (this:Indexable) {
      const DataURL = 'data:image/svg+xml;base64,' + btoa(this.memoized.Value || '')

      const { ImageScaling,ImageAlignment } = this

      return html`<img class="WAT Content SVGView"
        src=${DataURL}
        style="object-fit:${ImageScaling}; object-position:${ImageAlignment}"
      />`
    })
  }

  registerIntrinsicBehavior (
    Applet, 'widget', 'basic_controls.SVGView', WAT_SVGView
  )

/**** WebView ****/

  const WAT_WebView:WAT_BehaviorFunction = async (
    me,my, html,reactively, on, onRender, onMount,onUpdate,onUnmount, onValueChange,
    installStylesheet,BehaviorIsNew
  ) => {
  /**** custom Properties ****/

    my.configurableProperties = [
      { Name:'Value', Placeholder:'(enter URL)',
        EditorType:'url-input',      AccessorsFor:'memoized', withCallback:true },
      { Name:'PermissionsPolicy',    Label:'Permissions Policy',
        EditorType:'textline-input', AccessorsFor:'memoized' },
      { Name:'allowsFullscreen',     Label:'allows Fullscreen',   Default:false,
        EditorType:'checkbox',       AccessorsFor:'memoized' },
      { Name:'SandboxPermissions',   Label:'Sandbox Permissions', Default:WAT_DefaultSandboxPermissions,
        EditorType:'textline-input', AccessorsFor:'memoized' },
      { Name:'ReferrerPolicy',       Label:'Referrer Policy',     Default:'strict-origin-when-cross-origin',
        EditorType:'drop-down',      AccessorsFor:'memoized', ValueList:WAT_ReferrerPolicies },
    ]

  /**** Renderer ****/

    onRender(function (this:Indexable) {
      const {
        PermissionsPolicy,allowsFullscreen,SandboxPermissions,ReferrerPolicy
      } = this.memoized

      return html`<iframe class="WAT Content WebView"
        src=${this.Value || ''}
        allow=${PermissionsPolicy} allowfullscreen=${allowsFullscreen}
        sandbox=${SandboxPermissions} referrerpolicy=${ReferrerPolicy}
      />`
    })
  }

  registerIntrinsicBehavior (
    Applet, 'widget', 'basic_controls.WebView', WAT_WebView
  )

/**** Icon ****/

  const WAT_Icon:WAT_BehaviorFunction = async (
    me,my, html,reactively, on, onRender, onMount,onUpdate,onUnmount, onValueChange,
    installStylesheet,BehaviorIsNew
  ) => {
    installStylesheet(`
      .WAT.Widget > .WAT.Icon > div {
        display:block; position:absolute;
        left:0px; top:0px; right:0px; bottom:0px;
        -webkit-mask-size:contain;           mask-size:contain;
        -webkit-mask-position:center center; mask-position:center center;
      }
    `)

  /**** custom Properties ****/

    my.configurableProperties = [
      { Name:'Icon',            Default:'icons/menu.png',
        EditorType:'url-input', AccessorsFor:'memoized' },
    ]

  /**** Renderer ****/

    onRender(function (this:Indexable) {
      const { Value,Enabling, Icon,Color } = this

      const disabled = (Enabling == false)

      const _onClick = (Event:any) => {
        if (Enabling === false) { return consumingEvent(Event) }
        this.on('click')(Event)
      }

    /**** actual rendering ****/

      return html`<div class="WAT Content Icon ${disabled ? 'disabled' : ''}" style="
        -webkit-mask-image:url(${Icon}); mask-image:url(${Icon});
        background-color:${Color};
      " onClick=${_onClick}/>`
    })
  }

  registerIntrinsicBehavior(
    Applet, 'widget', 'basic_controls.Icon', WAT_Icon
  )

/**** Button ****/

  const WAT_Button:WAT_BehaviorFunction = async (
    me,my, html,reactively, on, onRender, onMount,onUpdate,onUnmount, onValueChange,
    installStylesheet,BehaviorIsNew
  ) => {
    installStylesheet(`
      .WAT.Widget > .WAT.Button {
        border:solid 1px black; border-radius:4px;
        background:white;
        font-weight:bold; color:black;
        text-align:center;
      }
    `)

  /**** custom Properties ****/

    my.configurableProperties = [
      { Name:'Label',                Placeholder:'(enter label)',
        EditorType:'textline-input', AccessorsFor:'memoized' },
    ]

  /**** Renderer ****/

    onRender(function (this:Indexable) {
      const onClick = (Event:any) => {
        if (this.Enabling == false) { return consumingEvent(Event) }
        this.on('click')(Event)
      }

      const Label = this.memoized.Label

      return html`<button class="WAT Content Button" style="
        line-height:${this.LineHeight || this.Height}px;
      " disabled=${this.Enabling == false} onClick=${onClick}
      >${Label}</>`
    })
  }

  registerIntrinsicBehavior(
    Applet, 'widget', 'native_controls.Button', WAT_Button
  )

/**** Checkbox ****/

  const WAT_Checkbox:WAT_BehaviorFunction = async (
    me,my, html,reactively, on, onRender, onMount,onUpdate,onUnmount, onValueChange,
    installStylesheet,BehaviorIsNew
  ) => {
    installStylesheet(`
      .WAT.Widget > .WAT.Checkbox {
        left:50%; top:50%;
        transform:translate(-50%,-50%);
      }
    `)

  /**** custom Properties ****/

    my.configurableProperties = [
      { Name:'Value',
        EditorType:'checkbox', AccessorsFor:'memoized', withCallback:true },
    ]

  /**** Renderer ****/

    onRender(function (this:Indexable) {
      const onClick = (Event:any) => {
        if (this.Enabling == false) { return consumingEvent(Event) }
        this.Value = Event.target.checked
      }

      const Value = this.Value

      const checked       = (Value == true)
      const indeterminate = (Value == null)

      return html`<input type="checkbox" class="WAT Checkbox"
        checked=${checked} indeterminate=${indeterminate}
        disabled=${this.Enabling == false} onClick=${onClick}
      />`
    })
  }

  registerIntrinsicBehavior(
    Applet, 'widget', 'native_controls.Checkbox', WAT_Checkbox
  )

/**** Radiobutton ****/

  const WAT_Radiobutton:WAT_BehaviorFunction = async (
    me,my, html,reactively, on, onRender, onMount,onUpdate,onUnmount, onValueChange,
    installStylesheet,BehaviorIsNew
  ) => {
    installStylesheet(`
      .WAT.Widget > .WAT.Radiobutton {
        left:50%; top:50%;
        transform:translate(-50%,-50%);
      }
    `)

  /**** custom Properties ****/

    my.configurableProperties = [
      { Name:'Value',
        EditorType:'checkbox', AccessorsFor:'memoized', withCallback:true },
    ]

  /**** Renderer ****/

    onRender(function (this:Indexable) {
      const onClick = (Event:any) => {
        if (this.Enabling == false) { return consumingEvent(Event) }
        this.Value = Event.target.checked
      }

      return html`<input type="radio" class="WAT Radiobutton"
        checked=${this.Value == true}
        disabled=${this.Enabling == false} onClick=${onClick}
      />`
    })
  }

  registerIntrinsicBehavior(
    Applet, 'widget', 'native_controls.Radiobutton', WAT_Radiobutton
  )

/**** Gauge ****/

  const WAT_Gauge:WAT_BehaviorFunction = async (
    me,my, html,reactively, on, onRender, onMount,onUpdate,onUnmount, onValueChange,
    installStylesheet,BehaviorIsNew
  ) => {
  /**** custom Properties ****/

    my.configurableProperties = [
      { Name:'Value',
        EditorType:'number-input', AccessorsFor:'memoized', withCallback:true },
      { Name:'Minimum',
        EditorType:'number-input', AccessorsFor:'memoized' },
      { Name:'lowerBound',         Label:'lower Bound',
        EditorType:'number-input', AccessorsFor:'memoized' },
      { Name:'Optimum',
        EditorType:'number-input', AccessorsFor:'memoized' },
      { Name:'upperBound',         Label:'upper Bound',
        EditorType:'number-input', AccessorsFor:'memoized' },
      { Name:'Maximum',
        EditorType:'number-input', AccessorsFor:'memoized' },
    ]

  /**** Renderer ****/

    onRender(function (this:Indexable) {
      const {
        Value,
        Minimum, lowerBound, Optimum, upperBound, Maximum
      } = this

      return html`<meter class="WAT Content Gauge" value=${Value}
        min=${Minimum} low=${lowerBound} opt=${Optimum}
        high=${upperBound} max=${Maximum}
      />`
    })
  }

  registerIntrinsicBehavior(
    Applet, 'widget', 'native_controls.Gauge', WAT_Gauge
  )

/**** Progressbar ****/

  const WAT_Progressbar:WAT_BehaviorFunction = async (
    me,my, html,reactively, on, onRender, onMount,onUpdate,onUnmount, onValueChange,
    installStylesheet,BehaviorIsNew
  ) => {
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
    `)

  /**** custom Properties ****/

    my.configurableProperties = [
      { Name:'Value',
        EditorType:'number-input', AccessorsFor:'memoized', withCallback:true },
      { Name:'Maximum',
        EditorType:'number-input', AccessorsFor:'memoized', minValue:0 },
    ]

  /**** Renderer ****/

    onRender(function (this:Indexable) {
      const { Value, Maximum } = this

      return html`<progress class="WAT Content Progressbar" value=${Value} max=${Maximum}
      style="accent-color:${this.ForegroundColor || 'dodgerblue'}"/>`
    })
  }

  registerIntrinsicBehavior(
    Applet, 'widget', 'native_controls.Progressbar', WAT_Progressbar
  )

/**** Slider ****/

  const WAT_Slider:WAT_BehaviorFunction = async (
    me,my, html,reactively, on, onRender, onMount,onUpdate,onUnmount, onValueChange,
    installStylesheet,BehaviorIsNew
  ) => {
    my._InputElement = createRef()

  /**** custom Properties ****/

    my.configurableProperties = [
      { Name:'Value',
        EditorType:'number-input',   AccessorsFor:'memoized', withCallback:true },
      { Name:'Minimum',
        EditorType:'number-input',   AccessorsFor:'memoized' },
      { Name:'Stepping',
        EditorType:'number-input',   AccessorsFor:'memoized', minValue:0 },
      { Name:'Maximum',
        EditorType:'number-input',   AccessorsFor:'memoized' },
      { Name:'Hashmarks',            Pattern:HashmarkPattern, Default:[],
        EditorType:'linelist-input', AccessorsFor:'memoized' },
    ]

  /**** Renderer ****/

    onRender(function (this:Indexable) {
      const { Value, Enabling } = this

    /**** handle external changes ****/

      const shownValue   = useRef('')
      const InputElement = useRef(null)

      let ValueToShow:number|undefined = Value
      if (document.activeElement === InputElement.current) {
        ValueToShow = shownValue.current
      } else {
        shownValue.current = ValueToShow
      }

      const _onInput = (Event:any) => {
        if (Enabling === false) { return consumingEvent(Event) }

        shownValue.current = this.Value = parseFloat(Event.target.value)
        this.on('input')(Event)
      }

      const _onBlur = (Event:any) => {
        this.on('blur')(Event)
        this.rerender()
      }

    /**** process any other parameters ****/

      const { Minimum,Stepping,Maximum, Hashmarks } = this

      let HashmarkList:any = '', HashmarkId
      if ((Hashmarks != null) && (Hashmarks.length > 0)) {
        HashmarkId = IdOfWidget(this as WAT_Widget) + '-Hashmarks'

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

      return html`<input type="range" class="WAT Content Slider" ref=${this._InputElement}
        value=${ValueToShow} min=${Minimum} max=${Maximum} step=${Stepping}
        disabled=${Enabling === false} onInput=${_onInput} onBlur=${_onBlur}
        list=${HashmarkId}
      />${HashmarkList}`
    })
  }

  registerIntrinsicBehavior(
    Applet, 'widget', 'native_controls.Slider', WAT_Slider
  )

/**** TextlineInput ****/

  const WAT_TextlineInput:WAT_BehaviorFunction = async (
    me,my, html,reactively, on, onRender, onMount,onUpdate,onUnmount, onValueChange,
    installStylesheet,BehaviorIsNew
  ) => {
    my._InputElement = createRef()

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
    `)

  /**** custom Properties ****/

    my.configurableProperties = [
      { Name:'Value',
        EditorType:'textline-input', AccessorsFor:'memoized', withCallback:true },
      { Name:'Placeholder',
        EditorType:'textline-input', AccessorsFor:'memoized' },
      { Name:'readonly',
        EditorType:'checkbox',       AccessorsFor:'memoized' },
      { Name:'minLength',            minValue:0, Stepping:1,
        EditorType:'integer-input',  AccessorsFor:'memoized' },
      { Name:'maxLength',            minValue:0, Stepping:1,
        EditorType:'integer-input',  AccessorsFor:'memoized' },
      { Name:'Pattern',
        EditorType:'textline-input', AccessorsFor:'memoized' },
      { Name:'SpellChecking',
        EditorType:'checkbox',       AccessorsFor:'memoized' },
      { Name:'Suggestions',
        EditorType:'linelist-input', AccessorsFor:'memoized' },
    ]

  /**** Renderer ****/

    onRender(function (this:Indexable) {
      const { Value, Enabling } = this

    /**** handle external changes ****/

      let ValueToShow:string = Value || ''
      if (
        (this._InputElement.current != null) &&
        (document.activeElement === this._InputElement.current)
      ) {
        ValueToShow = this._shownValue
      } else {
        this._shownValue = ValueToShow
      }

      const _onInput = (Event:any) => {
        if (Enabling === false) { return consumingEvent(Event) }

        this._shownValue = this.Value = Event.target.value
        this.on('input')(Event)
      }

      const _onBlur = (Event:any) => {
        this.rerender()
        this.on('blur')(Event)
      }

    /**** process any other parameters ****/

      const {
        Placeholder, readonly, minLength,maxLength, Pattern, SpellChecking,
        Suggestions
      } = this

      let SuggestionList:any = '', SuggestionId
      if ((Suggestions != null) && (Suggestions.length > 0)) {
        SuggestionId = IdOfWidget(this as WAT_Widget) + '-Suggestions'

        SuggestionList = html`<datalist id=${SuggestionId}>
          ${Suggestions.map((Value:string) => html`<option value=${Value}></option>`)}
        </datalist>`
      }

    /**** actual rendering ****/

      return html`<input type="text" class="WAT Content TextlineInput" ref=${this._InputElement}
        value=${ValueToShow} minlength=${minLength} maxlength=${maxLength}
        readOnly=${readonly} placeholder=${Placeholder}
        pattern=${Pattern} spellcheck=${SpellChecking}
        disabled=${Enabling === false} onInput=${_onInput} onBlur=${_onBlur}
        list=${SuggestionId}
      />${SuggestionList}`
    })
  }

  registerIntrinsicBehavior(
    Applet, 'widget', 'native_controls.TextlineInput', WAT_TextlineInput
  )

/**** PasswordInput ****/

  const WAT_PasswordInput:WAT_BehaviorFunction = async (
    me,my, html,reactively, on, onRender, onMount,onUpdate,onUnmount, onValueChange,
    installStylesheet,BehaviorIsNew
  ) => {
    my._InputElement = createRef()

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
    `)

  /**** custom Properties ****/

    my.configurableProperties = [
      { Name:'Value',
        EditorType:'password-input', AccessorsFor:'memoized', withCallback:true },
      { Name:'Placeholder',
        EditorType:'textline-input', AccessorsFor:'memoized' },
      { Name:'readonly',
        EditorType:'checkbox',       AccessorsFor:'memoized' },
      { Name:'minLength',            minValue:0, Stepping:1,
        EditorType:'integer-input',  AccessorsFor:'memoized' },
      { Name:'maxLength',            minValue:0, Stepping:1,
        EditorType:'integer-input',  AccessorsFor:'memoized' },
      { Name:'Pattern',
        EditorType:'textline-input', AccessorsFor:'memoized' },
    ]

  /**** Renderer ****/

    onRender(function (this:Indexable) {
      const { Value, Enabling } = this

    /**** handle external changes ****/

      let ValueToShow:string = Value || ''
      if (
        (this._InputElement.current != null) &&
        (document.activeElement === this._InputElement.current)
      ) {
        ValueToShow = this._shownValue
      } else {
        this._shownValue = ValueToShow
      }

      const _onInput = (Event:any) => {
        if (Enabling === false) { return consumingEvent(Event) }

        this._shownValue = this.Value = Event.target.value
        this.on('input')(Event)
      }

      const _onBlur = (Event:any) => {
        this.rerender()
        this.on('blur')(Event)
      }

    /**** process any other parameters ****/

      const {
        Placeholder, readonly, minLength,maxLength, Pattern
      } = this

    /**** actual rendering ****/

      return html`<input type="password" class="WAT Content PasswordInput" ref=${this._InputElement}
        value=${ValueToShow} minlength=${minLength} maxlength=${maxLength}
        readOnly=${readonly} placeholder=${Placeholder}
        pattern=${Pattern}
        disabled=${Enabling === false} onInput=${_onInput} onBlur=${_onBlur}
      />`
    })
  }

  registerIntrinsicBehavior(
    Applet, 'widget', 'native_controls.PasswordInput', WAT_PasswordInput
  )

/**** NumberInput ****/

  const WAT_NumberInput:WAT_BehaviorFunction = async (
    me,my, html,reactively, on, onRender, onMount,onUpdate,onUnmount, onValueChange,
    installStylesheet,BehaviorIsNew
  ) => {
    my._InputElement = createRef()

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
    `)

  /**** custom Properties ****/

    my.configurableProperties = [
      { Name:'Value',
        EditorType:'number-input',   AccessorsFor:'memoized', withCallback:true },
      { Name:'Placeholder',
        EditorType:'textline-input', AccessorsFor:'memoized' },
      { Name:'readonly',
        EditorType:'checkbox',       AccessorsFor:'memoized' },
      { Name:'Minimum',
        EditorType:'number-input',   AccessorsFor:'memoized' },
      { Name:'Stepping',
        EditorType:'number-input',   AccessorsFor:'memoized', minValue:0 },
      { Name:'Maximum',
        EditorType:'number-input',   AccessorsFor:'memoized' },
      { Name:'Suggestions',
        EditorType:'numberlist-input', AccessorsFor:'memoized' },
    ]

  /**** Renderer ****/

    onRender(function (this:Indexable) {
      const { Value, Enabling } = this

    /**** handle external changes ****/

      let ValueToShow:string = Value
      if (
        (this._InputElement.current != null) &&
        (document.activeElement === this._InputElement.current)
      ) {
        ValueToShow = this._shownValue
      } else {
        this._shownValue = ValueToShow
      }

      const _onInput = (Event:any) => {
        if (Enabling === false) { return consumingEvent(Event) }

        this._shownValue = this.Value = parseFloat(Event.target.value)
        this.on('input')(Event)
      }

      const _onBlur = (Event:any) => {
        this.rerender()
        this.on('blur')(Event)
      }

    /**** process any other parameters ****/

      const {
        Placeholder, readonly, Minimum,Stepping,Maximum, Suggestions
      } = this

      let SuggestionList:any = '', SuggestionId
      if ((Suggestions != null) && (Suggestions.length > 0)) {
        SuggestionId = IdOfWidget(this as WAT_Widget) + '-Suggestions'

        SuggestionList = html`<datalist id=${SuggestionId}>
          ${Suggestions.map((Value:string) => html`<option value=${Value}></option>`)}
        </datalist>`
      }

    /**** actual rendering ****/

      return html`<input type="number" class="WAT Content NumberInput" ref=${this._InputElement}
        value=${ValueToShow} min=${Minimum} max=${Maximum} step=${Stepping}
        readOnly=${readonly} placeholder=${Placeholder}
        disabled=${Enabling === false} onInput=${_onInput} onBlur=${_onBlur}
        list=${SuggestionId}
      />${SuggestionList}`
    })
  }

  registerIntrinsicBehavior(
    Applet, 'widget', 'native_controls.NumberInput', WAT_NumberInput
  )

/**** PhoneNumberInput ****/

  const WAT_PhoneNumberInput:WAT_BehaviorFunction = async (
    me,my, html,reactively, on, onRender, onMount,onUpdate,onUnmount, onValueChange,
    installStylesheet,BehaviorIsNew
  ) => {
    my._InputElement = createRef()

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
    `)

  /**** custom Properties ****/

    my.configurableProperties = [
      { Name:'Value',
        EditorType:'phone-number-input', AccessorsFor:'memoized', withCallback:true },
      { Name:'Placeholder',
        EditorType:'textline-input', AccessorsFor:'memoized' },
      { Name:'readonly',
        EditorType:'checkbox',       AccessorsFor:'memoized' },
      { Name:'minLength',            minValue:0, Stepping:1,
        EditorType:'integer-input',  AccessorsFor:'memoized' },
      { Name:'maxLength',            minValue:0, Stepping:1,
        EditorType:'integer-input',  AccessorsFor:'memoized' },
      { Name:'Pattern',
        EditorType:'textline-input', AccessorsFor:'memoized' },
      { Name:'Suggestions',
        EditorType:'linelist-input', AccessorsFor:'memoized' },
    ]

  /**** Renderer ****/

    onRender(function (this:Indexable) {
      const { Value, Enabling } = this

    /**** handle external changes ****/

      let ValueToShow:string = Value || ''
      if (
        (this._InputElement.current != null) &&
        (document.activeElement === this._InputElement.current)
      ) {
        ValueToShow = this._shownValue
      } else {
        this._shownValue = ValueToShow
      }

      const _onInput = (Event:any) => {
        if (Enabling === false) { return consumingEvent(Event) }

        this._shownValue = this.Value = Event.target.value
        this.on('input')(Event)
      }

      const _onBlur = (Event:any) => {
        this.rerender()
        this.on('blur')(Event)
      }

    /**** process any other parameters ****/

      const {
        Placeholder, readonly, minLength,maxLength, Pattern, SpellChecking,
        Suggestions
      } = this

      let SuggestionList:any = '', SuggestionId
      if ((Suggestions != null) && (Suggestions.length > 0)) {
        SuggestionId = IdOfWidget(this as WAT_Widget) + '-Suggestions'

        SuggestionList = html`<datalist id=${SuggestionId}>
          ${Suggestions.map((Value:string) => html`<option value=${Value}></option>`)}
        </datalist>`
      }

    /**** actual rendering ****/

      return html`<input type="tel" class="WAT Content PhoneNumberInput" ref=${this._InputElement}
        value=${ValueToShow} minlength=${minLength} maxlength=${maxLength}
        readOnly=${readonly} placeholder=${Placeholder}
        pattern=${Pattern} spellcheck=${SpellChecking}
        disabled=${Enabling === false} onInput=${_onInput} onBlur=${_onBlur}
        list=${SuggestionId}
      />${SuggestionList}`
    })
  }

  registerIntrinsicBehavior(
    Applet, 'widget', 'native_controls.PhoneNumberInput', WAT_PhoneNumberInput
  )

/**** EMailAddressInput ****/

  const WAT_EMailAddressInput:WAT_BehaviorFunction = async (
    me,my, html,reactively, on, onRender, onMount,onUpdate,onUnmount, onValueChange,
    installStylesheet,BehaviorIsNew
  ) => {
    my._InputElement = createRef()

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
    `)

  /**** custom Properties ****/

    my.configurableProperties = [
      { Name:'Value',
        EditorType:'email-address-input', AccessorsFor:'memoized', withCallback:true },
      { Name:'Placeholder',
        EditorType:'textline-input', AccessorsFor:'memoized' },
      { Name:'readonly',
        EditorType:'checkbox',       AccessorsFor:'memoized' },
      { Name:'minLength',            minValue:0, Stepping:1,
        EditorType:'integer-input',  AccessorsFor:'memoized' },
      { Name:'maxLength',            minValue:0, Stepping:1,
        EditorType:'integer-input',  AccessorsFor:'memoized' },
      { Name:'Suggestions',
        EditorType:'linelist-input', AccessorsFor:'memoized' },
    ]

  /**** Renderer ****/

    onRender(function (this:Indexable) {
      const { Value, Enabling } = this

    /**** handle external changes ****/

      let ValueToShow:string = Value || ''
      if (
        (this._InputElement.current != null) &&
        (document.activeElement === this._InputElement.current)
      ) {
        ValueToShow = this._shownValue
      } else {
        this._shownValue = ValueToShow
      }

      const _onInput = (Event:any) => {
        if (Enabling === false) { return consumingEvent(Event) }

        this._shownValue = this.Value = Event.target.value
        this.on('input')(Event)
      }

      const _onBlur = (Event:any) => {
        this.rerender()
        this.on('blur')(Event)
      }

    /**** process any other parameters ****/

      const {
        Placeholder, readonly, minLength,maxLength, Pattern, SpellChecking,
        Suggestions
      } = this

      let SuggestionList:any = '', SuggestionId
      if ((Suggestions != null) && (Suggestions.length > 0)) {
        SuggestionId = IdOfWidget(this as WAT_Widget) + '-Suggestions'

        SuggestionList = html`<datalist id=${SuggestionId}>
          ${Suggestions.map((Value:string) => html`<option value=${Value}></option>`)}
        </datalist>`
      }

    /**** actual rendering ****/

      return html`<input type="email" class="WAT Content EMailAddressInput" ref=${this._InputElement}
        value=${ValueToShow} minlength=${minLength} maxlength=${maxLength}
        readOnly=${readonly} placeholder=${Placeholder}
        pattern=${Pattern} spellcheck=${SpellChecking}
        disabled=${Enabling === false} onInput=${_onInput} onBlur=${_onBlur}
        list=${SuggestionId}
      />${SuggestionList}`
    })
  }

  registerIntrinsicBehavior(
    Applet, 'widget', 'native_controls.EMailAddressInput', WAT_EMailAddressInput
  )

/**** URLInput ****/

  const WAT_URLInput:WAT_BehaviorFunction = async (
    me,my, html,reactively, on, onRender, onMount,onUpdate,onUnmount, onValueChange,
    installStylesheet,BehaviorIsNew
  ) => {
    my._InputElement = createRef()

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
    `)

  /**** custom Properties ****/

    my.configurableProperties = [
      { Name:'Value',
        EditorType:'url-input',      AccessorsFor:'memoized', withCallback:true },
      { Name:'Placeholder',
        EditorType:'textline-input', AccessorsFor:'memoized' },
      { Name:'readonly',
        EditorType:'checkbox',       AccessorsFor:'memoized' },
      { Name:'minLength',            minValue:0, Stepping:1,
        EditorType:'integer-input',  AccessorsFor:'memoized' },
      { Name:'maxLength',            minValue:0, Stepping:1,
        EditorType:'integer-input',  AccessorsFor:'memoized' },
      { Name:'Pattern',
        EditorType:'textline-input', AccessorsFor:'memoized' },
      { Name:'SpellChecking',
        EditorType:'checkbox',       AccessorsFor:'memoized' },
      { Name:'Suggestions',
        EditorType:'linelist-input', AccessorsFor:'memoized' },
    ]

  /**** Renderer ****/

    onRender(function (this:Indexable) {
      const { Value, Enabling } = this

    /**** handle external changes ****/

      let ValueToShow:string = Value || ''
      if (
        (this._InputElement.current != null) &&
        (document.activeElement === this._InputElement.current)
      ) {
        ValueToShow = this._shownValue
      } else {
        this._shownValue = ValueToShow
      }

      const _onInput = (Event:any) => {
        if (Enabling === false) { return consumingEvent(Event) }

        this._shownValue = this.Value = Event.target.value
        this.on('input')(Event)
      }

      const _onBlur = (Event:any) => {
        this.rerender()
        this.on('blur')(Event)
      }

    /**** process any other parameters ****/

      const {
        Placeholder, readonly, minLength,maxLength, Pattern, SpellChecking,
        Suggestions
      } = this

      let SuggestionList:any = '', SuggestionId
      if ((Suggestions != null) && (Suggestions.length > 0)) {
        SuggestionId = IdOfWidget(this as WAT_Widget) + '-Suggestions'

        SuggestionList = html`<datalist id=${SuggestionId}>
          ${Suggestions.map((Value:string) => html`<option value=${Value}></option>`)}
        </datalist>`
      }

    /**** actual rendering ****/

      return html`<input type="url" class="WAT Content URLInput" ref=${this._InputElement}
        value=${ValueToShow} minlength=${minLength} maxlength=${maxLength}
        readOnly=${readonly} placeholder=${Placeholder}
        pattern=${Pattern} spellcheck=${SpellChecking}
        disabled=${Enabling === false} onInput=${_onInput} onBlur=${_onBlur}
        list=${SuggestionId}
      />${SuggestionList}`
    })
  }

  registerIntrinsicBehavior(
    Applet, 'widget', 'native_controls.URLInput', WAT_URLInput
  )

/**** TimeInput ****/

  const WAT_TimeInput:WAT_BehaviorFunction = async (
    me,my, html,reactively, on, onRender, onMount,onUpdate,onUnmount, onValueChange,
    installStylesheet,BehaviorIsNew
  ) => {
    my._InputElement = createRef()

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
    `)

  /**** custom Properties ****/

    my.configurableProperties = [
      { Name:'Value',
        EditorType:'time-input',       AccessorsFor:'memoized', withCallback:true },
      { Name:'Placeholder',
        EditorType:'textline-input',   AccessorsFor:'memoized' },
      { Name:'readonly',
        EditorType:'checkbox',         AccessorsFor:'memoized' },
      { Name:'withSeconds',            Label:'with Seconds',
        EditorType:'checkbox',         AccessorsFor:'memoized' },
      { Name:'Minimum',                Stepping:1,
        EditorType:'time-input',       AccessorsFor:'memoized' },
      { Name:'Maximum',                Stepping:1,
        EditorType:'time-input',       AccessorsFor:'memoized' },
      { Name:'Suggestions',            Pattern:WAT_TimeRegExp,
        EditorType:'linelist-input',   AccessorsFor:'memoized' },
    ]

  /**** Renderer ****/

    onRender(function (this:Indexable) {
      const { Value, Enabling } = this

    /**** handle external changes ****/

      let ValueToShow:string = Value || ''
      if (
        (this._InputElement.current != null) &&
        (document.activeElement === this._InputElement.current)
      ) {
        ValueToShow = this._shownValue
      } else {
        this._shownValue = ValueToShow
      }

      const _onInput = (Event:any) => {
        if (Enabling === false) { return consumingEvent(Event) }

        this._shownValue = this.Value = Event.target.value
        this.on('input')(Event)
      }

      const _onBlur = (Event:any) => {
        this.rerender()
        this.on('blur')(Event)
      }

    /**** process any other parameters ****/

      const {
        readonly, withSeconds, Minimum,Maximum, Suggestions
      } = this

      let SuggestionList:any = '', SuggestionId
      if ((Suggestions != null) && (Suggestions.length > 0)) {
        SuggestionId = IdOfWidget(this as WAT_Widget) + '-Suggestions'

        SuggestionList = html`<datalist id=${SuggestionId}>
          ${Suggestions.map((Value:string) => html`<option value=${Value}></option>`)}
        </datalist>`
      }

    /**** actual rendering ****/

      return html`<input type="time" class="WAT Content TimeInput" ref=${this._InputElement}
        value=${ValueToShow} min=${Minimum} max=${Maximum}
        step=${withSeconds ? 1 : 60}
        readOnly=${readonly} pattern=${WAT_TimePattern}
        disabled=${Enabling === false} onInput=${_onInput} onBlur=${_onBlur}
        list=${SuggestionId}
      />${SuggestionList}`
    })
  }

  registerIntrinsicBehavior(
    Applet, 'widget', 'native_controls.TimeInput', WAT_TimeInput
  )

/**** DateTimeInput ****/

  const WAT_DateTimeInput:WAT_BehaviorFunction = async (
    me,my, html,reactively, on, onRender, onMount,onUpdate,onUnmount, onValueChange,
    installStylesheet,BehaviorIsNew
  ) => {
    my._InputElement = createRef()

    installStylesheet(`
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

  /**** custom Properties ****/

    my.configurableProperties = [
      { Name:'Value',
        EditorType:'date-time-input',  AccessorsFor:'memoized', withCallback:true },
      { Name:'Placeholder',
        EditorType:'textline-input',   AccessorsFor:'memoized' },
      { Name:'readonly',
        EditorType:'checkbox',         AccessorsFor:'memoized' },
      { Name:'withSeconds',            Label:'with Seconds',
        EditorType:'checkbox',         AccessorsFor:'memoized' },
      { Name:'Minimum',                Stepping:1,
        EditorType:'date-time-input',  AccessorsFor:'memoized' },
      { Name:'Maximum',                Stepping:1,
        EditorType:'date-time-input',  AccessorsFor:'memoized' },
      { Name:'Suggestions',            Pattern:WAT_DateTimeRegExp,
        EditorType:'linelist-input',   AccessorsFor:'memoized' },
    ]

  /**** Renderer ****/

    onRender(function (this:Indexable) {
      const { Value, Enabling } = this

    /**** handle external changes ****/

      let ValueToShow:string = Value || ''
      if (
        (this._InputElement.current != null) &&
        (document.activeElement === this._InputElement.current)
      ) {
        ValueToShow = this._shownValue
      } else {
        this._shownValue = ValueToShow
      }

      const _onInput = (Event:any) => {
        if (Enabling === false) { return consumingEvent(Event) }

        this._shownValue = this.Value = Event.target.value
        this.on('input')(Event)
      }

      const _onBlur = (Event:any) => {
        this.rerender()
        this.on('blur')(Event)
      }

    /**** process any other parameters ****/

      const {
        readonly, withSeconds, Minimum,Maximum, Suggestions
      } = this

      let SuggestionList:any = '', SuggestionId
      if ((Suggestions != null) && (Suggestions.length > 0)) {
        SuggestionId = IdOfWidget(this as WAT_Widget) + '-Suggestions'

        SuggestionList = html`<datalist id=${SuggestionId}>
          ${Suggestions.map((Value:string) => html`<option value=${Value}></option>`)}
        </datalist>`
      }

    /**** actual rendering ****/

      return html`<input type="datetime-local" class="WAT Content DateTimeInput" ref=${this._InputElement}
        value=${ValueToShow} min=${Minimum} max=${Maximum}
        step=${withSeconds ? 1 : 60}
        readOnly=${readonly} pattern=${WAT_DateTimePattern}
        disabled=${Enabling === false} onInput=${_onInput} onBlur=${_onBlur}
        list=${SuggestionId}
      />${SuggestionList}`
    })
  }

  registerIntrinsicBehavior(
    Applet, 'widget', 'native_controls.DateTimeInput', WAT_DateTimeInput
  )

/**** DateInput ****/

  const WAT_DateInput:WAT_BehaviorFunction = async (
    me,my, html,reactively, on, onRender, onMount,onUpdate,onUnmount, onValueChange,
    installStylesheet,BehaviorIsNew
  ) => {
    my._InputElement = createRef()

    installStylesheet(`
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

  /**** custom Properties ****/

    my.configurableProperties = [
      { Name:'Value',
        EditorType:'date-input',     AccessorsFor:'memoized', withCallback:true },
      { Name:'Placeholder',
        EditorType:'textline-input', AccessorsFor:'memoized' },
      { Name:'readonly',
        EditorType:'checkbox',       AccessorsFor:'memoized' },
      { Name:'Minimum',              Stepping:1,
        EditorType:'date-input',     AccessorsFor:'memoized' },
      { Name:'Maximum',              Stepping:1,
        EditorType:'date-input',     AccessorsFor:'memoized' },
      { Name:'Suggestions',          Pattern:WAT_DateRegExp,
        EditorType:'linelist-input', AccessorsFor:'memoized' },
    ]

  /**** Renderer ****/

    onRender(function (this:Indexable) {
      const { Value, Enabling } = this

    /**** handle external changes ****/

      let ValueToShow:string = Value || ''
      if (
        (this._InputElement.current != null) &&
        (document.activeElement === this._InputElement.current)
      ) {
        ValueToShow = this._shownValue
      } else {
        this._shownValue = ValueToShow
      }

      const _onInput = (Event:any) => {
        if (Enabling === false) { return consumingEvent(Event) }

        this._shownValue = this.Value = Event.target.value
        this.on('input')(Event)
      }

      const _onBlur = (Event:any) => {
        this.rerender()
        this.on('blur')(Event)
      }

    /**** process any other parameters ****/

      const {
        readonly, withSeconds, Minimum,Maximum, Suggestions
      } = this

      let SuggestionList:any = '', SuggestionId
      if ((Suggestions != null) && (Suggestions.length > 0)) {
        SuggestionId = IdOfWidget(this as WAT_Widget) + '-Suggestions'

        SuggestionList = html`<datalist id=${SuggestionId}>
          ${Suggestions.map((Value:string) => html`<option value=${Value}></option>`)}
        </datalist>`
      }

    /**** actual rendering ****/

      return html`<input type="datetime-local" class="WAT Content DateInput" ref=${this._InputElement}
        value=${ValueToShow} min=${Minimum} max=${Maximum}
        readOnly=${readonly} pattern=${WAT_DatePattern}
        disabled=${Enabling === false} onInput=${_onInput} onBlur=${_onBlur}
        list=${SuggestionId}
      />${SuggestionList}`
    })
  }

  registerIntrinsicBehavior(
    Applet, 'widget', 'native_controls.DateInput', WAT_DateInput
  )

/**** WeekInput ****/

  const WAT_WeekInput:WAT_BehaviorFunction = async (
    me,my, html,reactively, on, onRender, onMount,onUpdate,onUnmount, onValueChange,
    installStylesheet,BehaviorIsNew
  ) => {
    my._InputElement = createRef()

    installStylesheet(`
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

  /**** custom Properties ****/

    my.configurableProperties = [
      { Name:'Value',
        EditorType:'week-input',     AccessorsFor:'memoized', withCallback:true },
      { Name:'Placeholder',
        EditorType:'textline-input', AccessorsFor:'memoized' },
      { Name:'readonly',
        EditorType:'checkbox',       AccessorsFor:'memoized' },
      { Name:'Minimum',              Stepping:1,
        EditorType:'week-input',     AccessorsFor:'memoized' },
      { Name:'Maximum',              Stepping:1,
        EditorType:'week-input',     AccessorsFor:'memoized' },
      { Name:'Suggestions',          Pattern:WAT_WeekRegExp,
        EditorType:'linelist-input', AccessorsFor:'memoized' },
    ]

  /**** Renderer ****/

    onRender(function (this:Indexable) {
      const { Value, Enabling } = this

    /**** handle external changes ****/

      let ValueToShow:string = Value || ''
      if (
        (this._InputElement.current != null) &&
        (document.activeElement === this._InputElement.current)
      ) {
        ValueToShow = this._shownValue
      } else {
        this._shownValue = ValueToShow
      }

      const _onInput = (Event:any) => {
        if (Enabling === false) { return consumingEvent(Event) }

        this._shownValue = this.Value = Event.target.value
        this.on('input')(Event)
      }

      const _onBlur = (Event:any) => {
        this.rerender()
        this.on('blur')(Event)
      }

    /**** process any other parameters ****/

      const {
        readonly, withSeconds, Minimum,Maximum, Suggestions
      } = this

      let SuggestionList:any = '', SuggestionId
      if ((Suggestions != null) && (Suggestions.length > 0)) {
        SuggestionId = IdOfWidget(this as WAT_Widget) + '-Suggestions'

        SuggestionList = html`<datalist id=${SuggestionId}>
          ${Suggestions.map((Value:string) => html`<option value=${Value}></option>`)}
        </datalist>`
      }

    /**** actual rendering ****/

      return html`<input type="datetime-local" class="WAT Content WeekInput" ref=${this._InputElement}
        value=${ValueToShow} min=${Minimum} max=${Maximum}
        readOnly=${readonly} pattern=${WAT_WeekPattern}
        disabled=${Enabling === false} onInput=${_onInput} onBlur=${_onBlur}
        list=${SuggestionId}
      />${SuggestionList}`
    })
  }

  registerIntrinsicBehavior(
    Applet, 'widget', 'native_controls.WeekInput', WAT_WeekInput
  )

/**** MonthInput ****/

  const WAT_MonthInput:WAT_BehaviorFunction = async (
    me,my, html,reactively, on, onRender, onMount,onUpdate,onUnmount, onValueChange,
    installStylesheet,BehaviorIsNew
  ) => {
    my._InputElement = createRef()

    installStylesheet(`
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

  /**** custom Properties ****/

    my.configurableProperties = [
      { Name:'Value',
        EditorType:'month-input',    AccessorsFor:'memoized', withCallback:true },
      { Name:'Placeholder',
        EditorType:'textline-input', AccessorsFor:'memoized' },
      { Name:'readonly',
        EditorType:'checkbox',       AccessorsFor:'memoized' },
      { Name:'Minimum',              Stepping:1,
        EditorType:'month-input',    AccessorsFor:'memoized' },
      { Name:'Maximum',              Stepping:1,
        EditorType:'month-input',    AccessorsFor:'memoized' },
      { Name:'Suggestions',          Pattern:WAT_MonthRegExp,
        EditorType:'linelist-input', AccessorsFor:'memoized' },
    ]

  /**** Renderer ****/

    onRender(function (this:Indexable) {
      const { Value, Enabling } = this

    /**** handle external changes ****/

      let ValueToShow:string = Value || ''
      if (
        (this._InputElement.current != null) &&
        (document.activeElement === this._InputElement.current)
      ) {
        ValueToShow = this._shownValue
      } else {
        this._shownValue = ValueToShow
      }

      const _onInput = (Event:any) => {
        if (Enabling === false) { return consumingEvent(Event) }

        this._shownValue = this.Value = Event.target.value
        this.on('input')(Event)
      }

      const _onBlur = (Event:any) => {
        this.rerender()
        this.on('blur')(Event)
      }

    /**** process any other parameters ****/

      const {
        readonly, withSeconds, Minimum,Maximum, Suggestions
      } = this

      let SuggestionList:any = '', SuggestionId
      if ((Suggestions != null) && (Suggestions.length > 0)) {
        SuggestionId = IdOfWidget(this as WAT_Widget) + '-Suggestions'

        SuggestionList = html`<datalist id=${SuggestionId}>
          ${Suggestions.map((Value:string) => html`<option value=${Value}></option>`)}
        </datalist>`
      }

    /**** actual rendering ****/

      return html`<input type="datetime-local" class="WAT Content MonthInput" ref=${this._InputElement}
        value=${ValueToShow} min=${Minimum} max=${Maximum}
        readOnly=${readonly} pattern=${WAT_MonthPattern}
        disabled=${Enabling === false} onInput=${_onInput} onBlur=${_onBlur}
        list=${SuggestionId}
      />${SuggestionList}`
    })
  }

  registerIntrinsicBehavior(
    Applet, 'widget', 'native_controls.MonthInput', WAT_MonthInput
  )

/**** FileInput ****/

  const WAT_FileInput:WAT_BehaviorFunction = async (
    me,my, html,reactively, on, onRender, onMount,onUpdate,onUnmount, onValueChange,
    installStylesheet,BehaviorIsNew
  ) => {
    installStylesheet(`
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
    `)

  /**** custom Properties ****/

    my.configurableProperties = [
      { Name:'Value',
        EditorType:'text-input',     AccessorsFor:'memoized', withCallback:true },
      { Name:'Placeholder',
        EditorType:'textline-input', AccessorsFor:'memoized' },
      { Name:'allowMultiple',        Label:'multiple',
        EditorType:'checkbox',       AccessorsFor:'memoized' },
      { Name:'acceptableFileTypes',  Label:'File Types', Default:[],
        EditorType:'linelist-input', AccessorsFor:'memoized' },
    ]

  /**** Renderer ****/

    onRender(function (this:Indexable) {
      const { Value, Enabling, Placeholder, allowMultiple, acceptableFileTypes } = this

      const _onInput = (Event:any):void => {
        if (this.Enabling === false) { return consumingEvent(Event) }

        this.Value = Array.from(Event.target.files).map((File:any) => File.name).join('\n')
        this.on('input')(Event)
      }

      const _onDragEnter = (Event:Event):void => { return consumingEvent(Event) }
      const _onDragOver  = (Event:Event):void => { return consumingEvent(Event) }

      const _onDrop = (Event:any):void => {
        consumeEvent(Event)
        if (this.Enabling === false) { return }

        this.Value = Array.from(Event.dataTransfer.files).map((File:any) => File.name).join('\n')
        this.on('drop')(Event,Event.dataTransfer.files)
      }               // nota bene: "files" is now in "Event.dataTransfer.files"

    /**** actual rendering ****/

      return html`<label class="WAT Content FileInput"
        onDragEnter=${_onDragEnter} onDragOver=${_onDragOver} onDrop=${_onDrop}
      >
        ${Value === ''
          ? Placeholder === '' ? '' : html`<span style="
              font-size:${Math.round((this.FontSize || 14)*0.95)}px; line-height:${this.Height}px
            ">${Placeholder}</span>`
          : html`<span style="line-height:${this.Height}px">${Value}</span>`
        }
        <input type="file" style="display:none"
          multiple=${allowMultiple} accept=${acceptableFileTypes}
          disabled=${Enabling === false} onInput=${_onInput}
        />
      </label>`
    })
  }

  registerIntrinsicBehavior(
    Applet, 'widget', 'native_controls.FileInput', WAT_FileInput
  )

/**** PseudoFileInput ****/

  const WAT_PseudoFileInput:WAT_BehaviorFunction = async (
    me,my, html,reactively, on, onRender, onMount,onUpdate,onUnmount, onValueChange,
    installStylesheet,BehaviorIsNew
  ) => {
    installStylesheet(`
      .WAT.Widget > .WAT.PseudoFileInput > div {
        display:block; position:absolute;
        left:0px; top:0px; right:0px; bottom:0px;
        -webkit-mask-size:contain;           mask-size:contain;
        -webkit-mask-position:center center; mask-position:center center;
      }
    `)

  /**** custom Properties ****/

    my.configurableProperties = [
      { Name:'Value',
        EditorType:'text-input',     AccessorsFor:'memoized', withCallback:true },
      { Name:'Icon',
        EditorType:'url-input',      AccessorsFor:'memoized' },
      { Name:'allowMultiple',        Label:'multiple',
        EditorType:'checkbox',       AccessorsFor:'memoized' },
      { Name:'acceptableFileTypes',  Label:'File Types', Default:[],
        EditorType:'linelist-input', AccessorsFor:'memoized' },
    ]

  /**** Renderer ****/

    onRender(function (this:Indexable) {
      const { Enabling, Icon,Color, allowMultiple, acceptableFileTypes } = this

      const _onInput = (Event:any) => {
        if (this.Enabling == false) { return consumingEvent(Event) }

        this.Value = Array.from(Event.target.files).map((File:any) => File.name).join('\n')
        this.on('input')(Event)
      }

    /**** actual rendering ****/

      return html`<label class="WAT Content PseudoFileInput">
        <div style="
          -webkit-mask-image:url(${Icon}); mask-image:url(${Icon});
          background-color:${Color};
        "></div>
        <input type="file" style="display:none"
          multiple=${allowMultiple} accept=${acceptableFileTypes}
          disabled=${Enabling === false} onInput=${_onInput}
        />
      </label>`
    })
  }

  registerIntrinsicBehavior(
    Applet, 'widget', 'native_controls.PseudoFileInput', WAT_PseudoFileInput
  )

/**** FileDropArea ****/

  const WAT_FileDropArea:WAT_BehaviorFunction = async (
    me,my, html,reactively, on, onRender, onMount,onUpdate,onUnmount, onValueChange,
    installStylesheet,BehaviorIsNew
  ) => {
    installStylesheet(`
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

  /**** custom Properties ****/

    my.configurableProperties = [
      { Name:'Value',
        EditorType:'text-input',     AccessorsFor:'memoized', withCallback:true },
      { Name:'Placeholder',
        EditorType:'textline-input', AccessorsFor:'memoized' },
      { Name:'allowMultiple',        Label:'multiple',
        EditorType:'checkbox',       AccessorsFor:'memoized' },
      { Name:'acceptableFileTypes',  Label:'File Types', Default:[],
        EditorType:'linelist-input', AccessorsFor:'memoized' },
    ]

  /**** Renderer ****/

    onRender(function (this:Indexable) {
      const { Value, Enabling, Placeholder, allowMultiple, acceptableFileTypes } = this

      const _onInput = (Event:any):void => {
        if (this.Enabling === false) { return consumingEvent(Event) }

        this.Value = Array.from(Event.target.files).map((File:any) => File.name).join('\n')
        this.on('input')(Event)
      }

      const _onDragEnter = (Event:Event):void => { return consumingEvent(Event) }
      const _onDragOver  = (Event:Event):void => { return consumingEvent(Event) }

      const _onDrop = (Event:any):void => {
        consumeEvent(Event)
        if (this.Enabling === false) { return }

        this.Value = Array.from(Event.dataTransfer.files).map((File:any) => File.name).join('\n')
        this.on('drop')(Event,Event.dataTransfer.files)
      }               // nota bene: "files" is now in "Event.dataTransfer.files"

    /**** actual rendering ****/

      return html`<label class="WAT Content FileDropArea"
        onDragEnter=${_onDragEnter} onDragOver=${_onDragOver} onDrop=${_onDrop}>
        <span>${Placeholder}</span>
        <input type="file"
          multiple=${allowMultiple} accept=${acceptableFileTypes}
          disabled=${Enabling === false} onInput=${_onInput}
        />
      </label>`
    })
  }

  registerIntrinsicBehavior(
    Applet, 'widget', 'native_controls.FileDropArea', WAT_FileDropArea
  )

/**** SearchInput ****/

  const WAT_SearchInput:WAT_BehaviorFunction = async (
    me,my, html,reactively, on, onRender, onMount,onUpdate,onUnmount, onValueChange,
    installStylesheet,BehaviorIsNew
  ) => {
    my._InputElement = createRef()

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
    `)

  /**** custom Properties ****/

    my.configurableProperties = [
      { Name:'Value',
        EditorType:'textline-input', AccessorsFor:'memoized', withCallback:true },
      { Name:'Placeholder',
        EditorType:'textline-input', AccessorsFor:'memoized' },
      { Name:'readonly',
        EditorType:'checkbox',       AccessorsFor:'memoized' },
      { Name:'minLength',            minValue:0, Stepping:1,
        EditorType:'integer-input',  AccessorsFor:'memoized' },
      { Name:'maxLength',            minValue:0, Stepping:1,
        EditorType:'integer-input',  AccessorsFor:'memoized' },
      { Name:'Pattern',
        EditorType:'textline-input', AccessorsFor:'memoized' },
      { Name:'SpellChecking',
        EditorType:'checkbox',       AccessorsFor:'memoized' },
      { Name:'Suggestions',
        EditorType:'linelist-input', AccessorsFor:'memoized' },
    ]

  /**** Renderer ****/

    onRender(function (this:Indexable) {
      const { Value, Enabling } = this

    /**** handle external changes ****/

      let ValueToShow:string = Value || ''
      if (
        (this._InputElement.current != null) &&
        (document.activeElement === this._InputElement.current)
      ) {
        ValueToShow = this._shownValue
      } else {
        this._shownValue = ValueToShow
      }

      const _onInput = (Event:any) => {
        if (Enabling === false) { return consumingEvent(Event) }

        this._shownValue = this.Value = Event.target.value
        this.on('input')(Event)
      }

      const _onBlur = (Event:any) => {
        this.rerender()
        this.on('blur')(Event)
      }

    /**** process any other parameters ****/

      const {
        Placeholder, readonly, minLength,maxLength, Pattern, SpellChecking,
        Suggestions
      } = this

      let SuggestionList:any = '', SuggestionId
      if ((Suggestions != null) && (Suggestions.length > 0)) {
        SuggestionId = IdOfWidget(this as WAT_Widget) + '-Suggestions'

        SuggestionList = html`<datalist id=${SuggestionId}>
          ${Suggestions.map((Value:string) => html`<option value=${Value}></option>`)}
        </datalist>`
      }

    /**** actual rendering ****/

      return html`<input type="search" class="WAT Content SearchInput" ref=${this._InputElement}
        value=${ValueToShow} minlength=${minLength} maxlength=${maxLength}
        readOnly=${readonly} placeholder=${Placeholder}
        pattern=${Pattern} spellcheck=${SpellChecking}
        disabled=${Enabling === false} onInput=${_onInput} onBlur=${_onBlur}
        list=${SuggestionId}
      />${SuggestionList}`
    })
  }

  registerIntrinsicBehavior(
    Applet, 'widget', 'native_controls.SearchInput', WAT_SearchInput
  )

/**** ColorInput ****/

  const WAT_ColorInput:WAT_BehaviorFunction = async (
    me,my, html,reactively, on, onRender, onMount,onUpdate,onUnmount, onValueChange,
    installStylesheet,BehaviorIsNew
  ) => {
    installStylesheet(`
      .WAT.Widget > .WAT.ColorInput {
        left:1px; top:1px; right:1px; bottom:1px; width:auto; height:auto;
        border:solid 1px #888888; border-radius:2px;
        background:#e8f0ff;
        padding:0px 2px 0px 2px;
      }
    `)

  /**** custom Properties ****/

    my.configurableProperties = [
      { Name:'Value',
        EditorType:'color-input' },
      { Name:'Suggestions',
        EditorType:'linelist-input' },
    ]

  /**** Renderer ****/

    onRender(function (this:Indexable) {
      const { Value, Enabling, Suggestions } = this

      const _onInput = (Event:any) => {
        if (Enabling === false) { return consumingEvent(Event) }

        this.Value = Event.target.value
        this.on('input')(Event)
      }

    /**** process any other parameters ****/

      let SuggestionList:any = '', SuggestionId
      if ((Suggestions != null) && (Suggestions.length > 0)) {
        SuggestionId = IdOfWidget(this as WAT_Widget) + '-Suggestions'

        SuggestionList = html`<datalist id=${SuggestionId}>
          ${Suggestions.map((Value:string) => html`<option value=${Value}></option>`)}
        </datalist>`
      }

    /**** actual rendering ****/

      return html`<input type="color" class="WAT Content ColorInput"
        value=${Value === '' ? null : Value}
        disabled=${Enabling == false} onInput=${_onInput}
        list=${SuggestionId}
      />${SuggestionList}`
    })
  }

  registerIntrinsicBehavior(
    Applet, 'widget', 'native_controls.ColorInput', WAT_ColorInput
  )

/**** DropDown ****/

  const WAT_DropDown:WAT_BehaviorFunction = async (
    me,my, html,reactively, on, onRender, onMount,onUpdate,onUnmount, onValueChange,
    installStylesheet,BehaviorIsNew
  ) => {
    installStylesheet(`
      .WAT.Widget > .WAT.DropDown {
        left:1px; top:1px; right:1px; bottom:1px; width:auto; height:auto;
        border:solid 1px #888888; border-radius:2px;
        background:#e8f0ff;
        padding:0px 2px 0px 2px;
      }
    `)

  /**** custom Properties ****/

    my.configurableProperties = [
      { Name:'Value',
        EditorType:'textline-input', AccessorsFor:'memoized', withCallback:true },
      { Name:'Options',              Default:[],
        EditorType:'linelist-input', AccessorsFor:'memoized' },
    ]

  /**** Renderer ****/

    onRender(function (this:Indexable) {
      const { Value, Enabling, Options } = this

      const _onInput = (Event:any) => {
        if (Enabling === false) { return consumingEvent(Event) }

        this.Value = Event.target.value
        this.on('input')(Event)
      }

    /**** actual rendering ****/

      return html`<select class="WAT Content DropDown"
        disabled=${Enabling == false} onInput=${_onInput}
      >${Options.map((Option:string) => {
          const OptionValue = Option.replace(/:.*$/,'').trim()
          let   OptionLabel = Option.replace(/^[^:]+:/,'').trim()
          const disabled    = (OptionLabel[0] === '-')
          if (/^-[^-]+$/.test(OptionLabel)) {
            return '<hr/>'
          } else {
            return html`<option value=${OptionValue}
              selected=${OptionValue === Value} disabled=${disabled}
            >${OptionLabel}</option>`
          }
        }
      )}</select>`
    })
  }

  registerIntrinsicBehavior(
    Applet, 'widget', 'native_controls.DropDown', WAT_DropDown
  )

/**** PseudoDropDown ****/

  const WAT_PseudoDropDown:WAT_BehaviorFunction = async (
    me,my, html,reactively, on, onRender, onMount,onUpdate,onUnmount, onValueChange,
    installStylesheet,BehaviorIsNew
  ) => {
    installStylesheet(`
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

  /**** custom Properties ****/

    my.configurableProperties = [
      { Name:'Value',
        EditorType:'textline-input', AccessorsFor:'memoized', withCallback:true },
      { Name:'Icon',
        EditorType:'url-input',      AccessorsFor:'memoized' },
      { Name:'Options',              Default:[],
        EditorType:'linelist-input', AccessorsFor:'memoized' },
    ]

  /**** Renderer ****/

    onRender(function (this:Indexable) {
      const { Value,Enabling, Icon,Color, Options } = this

      const _onInput = (Event:any) => {
        if (Enabling === false) { return consumingEvent(Event) }

        this.Value = Event.target.value
        this.on('input')(Event)
      }

    /**** actual rendering ****/

      return html`<div class="WAT Content PseudoDropDown">
        <div style="
          -webkit-mask-image:url(${Icon}); mask-image:url(${Icon});
          background-color:${Color};
        "></div>
        <select disabled=${Enabling == false} onInput=${_onInput}>
          ${Options.map((Option:string) => {
            const OptionValue = Option.replace(/:.*\$/,'').trim()
            let   OptionLabel = Option.replace(/^[^:]+:/,'').trim()
            const disabled    = (OptionLabel[0] === '-')
            if (/^-[^-]+$/.test(OptionLabel)) {
              return '<hr/>'
            } else {
              return html`<option value=${OptionValue}
                selected=${OptionValue === Value} disabled=${disabled}
              >${OptionLabel}</option>`
            }
          })}
        </select>
      </div>`
    })
  }

  registerIntrinsicBehavior(
    Applet, 'widget', 'native_controls.PseudoDropDown', WAT_PseudoDropDown
  )

/**** TextInput ****/

  const WAT_TextInput:WAT_BehaviorFunction = async (
    me,my, html,reactively, on, onRender, onMount,onUpdate,onUnmount, onValueChange,
    installStylesheet,BehaviorIsNew
  ) => {
    my._InputElement = createRef()

    installStylesheet(`
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

  /**** custom Properties ****/

    my.configurableProperties = [
      { Name:'Value',
        EditorType:'text-input',     AccessorsFor:'memoized', withCallback:true },
      { Name:'Placeholder',
        EditorType:'textline-input', AccessorsFor:'memoized' },
      { Name:'readonly',
        EditorType:'checkbox',       AccessorsFor:'memoized' },
      { Name:'minLength',            minValue:0, Stepping:1,
        EditorType:'integer-input',  AccessorsFor:'memoized' },
      { Name:'maxLength',            minValue:0, Stepping:1,
        EditorType:'integer-input',  AccessorsFor:'memoized' },
      { Name:'LineWrapping',
        EditorType:'checkbox',       AccessorsFor:'memoized' },
      { Name:'SpellChecking',
        EditorType:'checkbox',       AccessorsFor:'memoized' },
      { Name:'acceptableFileTypes',  Label:'File Types', Default:[],
        EditorType:'linelist-input', AccessorsFor:'memoized', Validator:ValueIsTextFormat },
    ]

  /**** Renderer ****/

    onRender(function (this:Indexable) {
      const { Value, Enabling } = this

    /**** handle external changes ****/

      let ValueToShow:string = Value || ''
      if (
        (this._InputElement.current != null) &&
        (document.activeElement === this._InputElement.current)
      ) {
        ValueToShow = this._shownValue
      } else {
        this._shownValue = ValueToShow
      }

      const _onInput = (Event:any) => {
        if (Enabling === false) { return consumingEvent(Event) }

        this._shownValue = this.Value = Event.target.value
        this.on('input')(Event)
      }

      const _onBlur = (Event:any) => {
        this.rerender()
        this.on('blur')(Event)
      }

    /**** process any other parameters ****/

      const {
        Placeholder, readonly, minLength,maxLength, LineWrapping, SpellChecking,
        acceptableFileTypes
      } = this

    /**** prepare file dropping ****/

      const allowsDropping = (
        (Enabling == true) && ! readonly && (acceptableFileTypes.length > 0)
      )

      function _acceptableDataIn (Event:Indexable):boolean {
        if (Event.dataTransfer.types.includes('text/plain')) { return true }

        for (let Item of Event.dataTransfer.items) {
          if ((Item.kind === 'file') && acceptableFileTypes.includes(Item.type)) {
            return true
          }
        }
        return false
      }

      const _onDragOver = (Event:Indexable) => {
        if (_acceptableDataIn(Event)) {
          Event.preventDefault()
          Event.dataTransfer.dropEffect = 'copy'
        }
      }
      const _onDrop = async (Event:Indexable) => {
        if (_acceptableDataIn(Event)) {
          Event.preventDefault()

          if (Event.dataTransfer.types.includes('text/plain')) {
            const Value = Event.dataTransfer.getData('text')
            this.Value = Value
            this.on('input')(Event)
          } else {
            try {
              for (let Item of Event.dataTransfer.items) {
                if ((Item.kind === 'file') && acceptableFileTypes.includes(Item.type)) {
                  this.Value = await FileReadAsText(Item.getAsFile(),Item.type)
                  this.on('input')(Event)
                  break
                }
              }
            } catch (Signal:any) {
console.warn('file drop error',Signal)
              this.on('drop-error')(Signal)
            }
          }
        }
      }

    /**** actual rendering ****/

      return html`<textarea class="WAT Content TextInput"
        value=${ValueToShow} minlength=${minLength} maxlength=${maxLength}
        readOnly=${readonly} placeholder=${Placeholder}
        spellcheck=${SpellChecking} style="resize:none; ${
          LineWrapping == true
          ? 'overflow-wrap:break-word; hyphens:auto'
          : 'white-space:pre'
        }"
        disabled=${Enabling === false} onInput=${_onInput} onBlur=${_onBlur}
        onDragOver=${allowsDropping && _onDragOver} onDrop=${allowsDropping && _onDrop}
      />`
    })
  }

  registerIntrinsicBehavior(
    Applet, 'widget', 'native_controls.TextInput', WAT_TextInput
  )


  }

/**** ValueIsTextFormat ****/

  export const WAT_supportedTextFormats = [
    'application/javascript', 'application/typescript', 'application/json',
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/html', 'text/markdown', 'text/plain'
  ]

  export function ValueIsTextFormat (Value:any):boolean {
    return ValueIsOneOf(Value,WAT_supportedTextFormats)
  }

/**** ValueIsHTMLFormat ****/

  export const WAT_supportedHTMLFormats = [
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/html', 'text/markdown', 'text/plain'
  ]

  export function ValueIsHTMLFormat (Value:any):boolean {
    return ValueIsOneOf(Value,WAT_supportedHTMLFormats)
  }

/**** ValueIsMarkdownFormat ****/

  export const WAT_supportedMarkdownFormats = [
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/markdown', 'text/plain'
  ]

  export function ValueIsMarkdownFormat (Value:any):boolean {
    return ValueIsOneOf(Value,WAT_supportedMarkdownFormats)
  }

/**** ValueIsImageFormat ****/

  export const WAT_supportedImageFormats = [
    'image/apng', 'image/avif', 'image/bmp', 'image/gif', 'image/jpeg',
    'image/png', 'image/svg+xml', 'image/webp'
  ]

  export function ValueIsImageFormat (Value:any):boolean {
    return ValueIsOneOf(Value,WAT_supportedImageFormats)
  }

/**** readTextFile ****/

  async function readTextFile (File:any):Promise<WAT_Text> {
    return new Promise((resolve,reject) => {
      const Reader = new FileReader()
        Reader.onload  = (Event:Indexable) => resolve(Event.target.result)
        Reader.onerror = (Event:Indexable) => reject(Event.target.error)
        Reader.onabort = (Event:Indexable) => reject(new Error('Loading was aborted'))
      Reader.readAsText(File)
    })
  }

/**** readBinaryFile ****/

  async function readBinaryFile (File:any):Promise<ArrayBuffer> {
    return new Promise((resolve,reject) => {
      const Reader = new FileReader()
        Reader.onload  = (Event:Indexable) => resolve(Event.target.result)
        Reader.onerror = (Event:Indexable) => reject(Event.target.error)
        Reader.onabort = (Event:Indexable) => reject(new Error('Loading was aborted'))
      Reader.readAsArrayBuffer(File)
    })
  }

/**** readDataURLFile ****/

  async function readDataURLFile (File:any):Promise<string> {
    return new Promise((resolve,reject) => {
      const Reader = new FileReader()
        Reader.onload  = (Event:Indexable) => resolve(Event.target.result)
        Reader.onerror = (Event:Indexable) => reject(Event.target.error)
        Reader.onabort = (Event:Indexable) => reject(new Error('Loading was aborted'))
      Reader.readAsDataURL(File)
    })
  }

/**** FileReadAsText ****/

  async function FileReadAsText (File:any, FileType:string):Promise<WAT_Text> {
    switch (FileType) {
      case 'text/plain':
      case 'application/javascript':
      case 'application/typescript':
      case 'application/json':       return await readTextFile(File)
      case 'text/markdown':          return await MarkdownFileReadAsText(File)
      case 'text/html':              return await HTMLFileReadAsText(File)
      case 'application/pdf':        return await PDFFileReadAsText(File)
      case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
                              return await DOCXFileReadAsText(File)
      default: throwError('UnsupportedFileFormat: cannot read the given file as text')
    }
  }

/**** FileReadAsMarkdown ****/

  async function FileReadAsMarkdown (File:any, FileType:string):Promise<WAT_Text> {
    switch (FileType) {
      case 'text/plain':
      case 'text/markdown': return await readTextFile(File)
      case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
                            return await DOCXFileReadAsMarkdown(File)
      default: throwError('UnsupportedFileFormat: cannot read the given file as Markdown')
    }
  }

/**** FileReadAsHTML ****/

  async function FileReadAsHTML (File:any, FileType:string):Promise<WAT_Text> {
    switch (FileType) {
      case 'text/plain':
      case 'text/html':     return await readTextFile(File)
      case 'text/markdown': return await MarkdownFileReadAsHTML(File)
      case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
                            return await DOCXFileReadAsHTML(File)
      default: throwError('UnsupportedFileFormat: cannot read the given file as HTML')
    }
  }

/**** FileReadAsImage ****/

  async function FileReadAsImage (File:any, FileType:string):Promise<WAT_Text> {
    if (WAT_supportedImageFormats.indexOf(FileType) >= 0) {
      return await readDataURLFile(File)
    } else {
      throwError('UnsupportedFileFormat: cannot read the given file as an image')
    }
  }

/**** HTMLFileReadAsText ****/

  async function HTMLFileReadAsText (File:any):Promise<WAT_Text> {
    const HTMLContent = await readTextFile(File)
    try {
      const { default:HTMLtoText } = await import('https://cdn.jsdelivr.net/npm/@blac-sheep/html-to-text/+esm')
      return HTMLtoText(HTMLContent)
    } catch (Signal) {
      throwError('ConversionError: could not convert the given HTML file into plain text, reason: ' + Signal)
    }
  }

/**** MarkdownFileReadAsText (see https://marked.js.org/using_pro#renderer) ****/

  async function MarkdownFileReadAsText (File:any):Promise<WAT_Text> {
    const Markdown = await readTextFile(File)
    return await MarkdownAsText(Markdown)
  }

  export async function MarkdownAsText (Markdown:WAT_Text):Promise<WAT_Text> {
    expectText('markdown document',Markdown)
    try {
      const { default:PlainTextRenderer } = await import('https://cdn.jsdelivr.net/npm/marked-plaintext/+esm')
      const marked = new Marked()

      const Renderer = new PlainTextRenderer()
        Renderer.heading    = (Text:string) => `\n${Text}\n\n`
        Renderer.paragraph  = (Text:string) => `${Text}\n\n`
        Renderer.list       = (Text:string) => `${Text}\n`
        Renderer.listitem   = (Text:string) => `- ${Text}\n`
        Renderer.link       = (HRef:string, Title:string, Text:string) => `${Text}`
        Renderer.image      = (HRef:string, Title:string, Text:string) => `[${Text}]`
        Renderer.code       = (Code:string)  => `${Code}\n\n`
        Renderer.blockquote = (Quote:string) => `${Quote}\n\n`
        Renderer.br         = () => `\n`
      marked.setOptions({
        renderer:Renderer,
        gfm:true, breaks:true,
      })
//    marked.use(markedKatex({ nonStandard:true }))

      return marked.parse(Markdown)
    } catch (Signal:any) {
      throwError('ConversionError: could not convert the given Markdown file into plain text, reason: ' + Signal)
    }
  }

/**** MarkdownFileReadAsHTML ****/

  async function MarkdownFileReadAsHTML (File:any):Promise<WAT_Text> {
    const Markdown = await readTextFile(File)
    return await MarkdownAsHTML(Markdown)
  }

  export async function MarkdownAsHTML (Markdown:WAT_Text):Promise<WAT_Text> {
    expectText('markdown document',Markdown)
    try {
      const marked = new Marked()
        marked.setOptions({
          gfm:true, breaks:true,
        })
//    marked.use(markedKatex({ nonStandard:true }))

      return marked.parse(Markdown)
    } catch (Signal:any) {
      throwError('ConversionError: could not convert the given Markdown file into HTML, reason: ' + Signal)
    }
  }

/**** DOCXFileReadAsText ****/

  async function DOCXFileReadAsText (File:any):Promise<WAT_Text> {
    const Buffer = await readBinaryFile(File)
    try {
      const mammoth = (await import('https://rozek.github.io/mammoth.js/mammoth.browser.esm.js')).default
      return (await mammoth.extractRawText({ arrayBuffer:Buffer })).value
    } catch (Signal:any) {
      throwError('ConversionError: could not convert the given DOCX file into plain text, reason: ' + Signal)
    }
  }

/**** DOCXFileReadAsHTML ****/

  async function DOCXFileReadAsHTML (File:any):Promise<WAT_Text> {
    const Buffer = await readBinaryFile(File)
    try {
      const mammoth = (await import('https://rozek.github.io/mammoth.js/mammoth.browser.esm.js')).default
      return (await mammoth.convertToHtml({ arrayBuffer:Buffer })).value
    } catch (Signal:any) {
      throwError('ConversionError: could not convert the given DOCX file into HTML, reason: ' + Signal)
    }
  }

/**** DOCXFileReadAsMarkdown ****/

  async function DOCXFileReadAsMarkdown (File:any):Promise<WAT_Text> {
    const Buffer = await readBinaryFile(File)
    try {
      const mammoth = (await import('https://rozek.github.io/mammoth.js/mammoth.browser.esm.js')).default
      return (await mammoth.convertToMarkdown({ arrayBuffer:Buffer })).value
    } catch (Signal:any) {
      throwError('ConversionError: could not convert the given DOCX file into Markdown, reason: ' + Signal)
    }
  }

/**** PDFFileReadAsText ****/

  async function PDFFileReadAsText (File:any):Promise<WAT_Text> {
    const Buffer = await readBinaryFile(File)
    try {
      const { getDocument,GlobalWorkerOptions } = await import('https://cdn.jsdelivr.net/npm/pdfjs-dist/build/pdf.min.mjs')
      GlobalWorkerOptions.workerSrc = 'https://cdn.jsdelivr.net/npm/pdfjs-dist/build/pdf.worker.min.mjs'

      const PDF = await getDocument(Buffer).promise
      let Text = ''
        for (let i = 1; i <= PDF.numPages; i++) {
          const Page    = await PDF.getPage(i)
          const Content = await Page.getTextContent()
          Text += Content.items.map((Item:any) => Item.str).join('') + '\n'
        }
      return Text
    } catch (Signal) {
      throwError('ConversionError: could not convert the given PDF file into plain text, reason: ' + Signal)
    }
  }

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
      Applet.on('mount')()
    }

  /**** componentDidUpdate ****/

    public componentDidUpdate ():void {
      const Applet = this._Applet as WAT_Applet
      Applet.on('update')()
    }

  /**** componentWillUnmount ****/

    public componentWillUnmount ():void {
      const Applet = this._Applet as WAT_Applet

      Applet['_View'] = undefined
      Applet.on('unmount')()
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
          ${broken === '' ? Applet.on('render')() : ErrorRenderingFor(Applet)}
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
      Page.on('mount')()
    }

  /**** componentDidUpdate ****/

    public componentDidUpdate ():void {
      const Page = this._Page as WAT_Page
      Page.on('update')()
    }

  /**** componentWillUnmount ****/

    public componentWillUnmount ():void {
      this._releaseWidgets(this._shownWidgets)

      const Page = this._Page as WAT_Page

      Page['_View'] = undefined
      Page.on('unmount')()
    }

  /**** _releaseWidgets ****/

    protected _releaseWidgets (WidgetList:WAT_Widget[]):void {
      WidgetList.forEach((Widget:Indexable) => {
        Widget._Pane = undefined
        if (Widget.Behavior === 'basic_controls.WidgetPane') {
          (Widget as Indexable)._releaseWidgets()
        }
      })
    }

  /**** render ****/

    public render (PropSet:Indexable):any {
      const Page = PropSet.Page as WAT_Page
      if ((this._Page != null) && (this._Page !== Page)) {
        this.componentWillUnmount()          // because preact reuses components
        this._Page = Page
        this.componentDidMount()
      } else {
        this._Page = Page
      }

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
        ${broken === '' ? Page.on('render')() : ErrorRenderingFor(Page)}
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
      Widget.on('mount')()
    }

  /**** componentDidUpdate ****/

    public componentDidUpdate ():void {
      const Widget = this._Widget as WAT_Widget
      Widget.on('update')()
    }

  /**** componentWillUnmount ****/

    public componentWillUnmount ():void {
      const Widget = this._Widget as WAT_Widget

      Widget['_View'] = undefined
      Widget.on('unmount')()
    }

  /**** render ****/

    public render (PropSet:Indexable):any {
      const Widget = PropSet.Widget as WAT_Widget
      if ((this._Widget != null) && (this._Widget !== Widget)) {
        this.componentWillUnmount()          // because preact reuses components
        this._Widget = Widget
        this.componentDidMount()
      } else {
        this._Widget = Widget
      }

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
        ${broken === '' ? Widget.on('render')() : ErrorRenderingFor(Widget)}
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

  const WAT_ModalLayer_EventTypes = [
    'click', 'dblclick',
    'mousedown', 'mouseup', 'mousemove', 'mouseover', 'mouseout',
    'mouseenter', 'mouseleave',
    'touchstart', 'touchend', 'touchmove', 'touchcancel',
    'pointerdown', 'pointerup', 'pointermove', 'pointerover', 'pointerout',
    'pointerenter', 'pointerleave', 'pointercancel',
    'keydown', 'keyup', 'keypress',
    'wheel', 'contextmenu', 'focus', 'blur'
  ]

  class WAT_ModalLayer extends Component {
    public componentDidMount () {
      WAT_ModalLayer_EventTypes.forEach((EventType:string) => {
        (this as Component).base.addEventListener(EventType,consumeEvent)
      })
    }

    public componentWillUnmount () {
      WAT_ModalLayer_EventTypes.forEach((EventType:string) => {
        (this as Component).base.removeEventListener(EventType,consumeEvent)
      })
    }

    public render (PropSet:Indexable):any {
      return html`<div class="WAT ModalLayer"/>`
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
      this._shownWidgets = []
    }

  /**** componentWillUnmount ****/

    public componentWillUnmount ():void {
      this._releaseWidgets()
    }

  /**** _GeometryRelativeTo  ****/

    protected _GeometryOfWidgetRelativeTo (
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

  /**** dialog dragging and resizing ****/

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
        onDragCancellation:(dx:number,dy:number) => this._handleDrag(dx,dy),
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
        asAppletOverlay, fromRight, fromBottom,
        Title, isClosable, isDraggable, isResizable,
        x,y, Width,Height,
      } = Dialog

    /**** leave here if dialog should not be shown... ****/

      const SourceWidget = Applet.WidgetAtPath(SourceWidgetPath as WAT_Path)

      const Visibility = (
        SourceWidget == null
        ? true
        : SourceWidget.on('visibility-request')()
      )
      if (Visibility === false) {
console.log('Dialog._shownWidgets',this._shownWidgets)
        if (this._shownWidgets.length > 0) {
console.log('Dialog._releaseWidgets')
//          this._releaseWidgets()
//          Applet.rerender() // makes released widgets visible outside the dialog
        }
        return ''
      }

    /**** ...otherwise continue as usual ****/

      const asDialog = ! asAppletOverlay

      const hasTitlebar = asDialog && (
        (Title != null) || isDraggable || isClosable
      )

      const resizable    = (asDialog && isResizable ? 'resizable'    : '')
      const withTitlebar = (asDialog && hasTitlebar ? 'withTitlebar' : '')

    /**** repositioning on viewport ****/

      const { x:AppletX,y:AppletY, Width:AppletWidth,Height:AppletHeight } = Applet.Geometry
      let { left,top } = fromDocumentTo('viewport',{
        left:x + (fromRight  ? AppletWidth  : AppletX),
        top: y + (fromBottom ? AppletHeight : AppletY)
      })

      if (asDialog) {
        left = Math.max(0,Math.min(left,document.documentElement.clientWidth-30))
        top  = Math.max(0,Math.min(top,document.documentElement.clientHeight-30))
      } else {
        left = Math.max(0,Math.min(left,AppletWidth))
        top  = Math.max(0,Math.min(top,AppletHeight))
      }

    /**** Event Handlers ****/

      this._installGestureRecognizer()
      let Recognizer = this._Recognizer

      const onClose = () => {
        Applet.closeDialog(Dialog.Name)
      }

    /**** ContentPane Rendering ****/

//    const SourceWidget = Applet.WidgetAtPath(SourceWidgetPath as WAT_Path)
        if (SourceWidget == null) {
          this._shownWidgets = []
        } else {
          const WidgetsToShow:WAT_Widget[] = (
            SourceWidget.normalizedBehavior === 'basic_controls.outline'
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

      if (asDialog) {
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
      } else {
        return html`<div class="WAT AppletOverlay" style="
          left:${left}px; top:${top}px; width:${Width}px; height:${Height}px;
        ">
          <div class="ContentPane">${ContentPane}</div>
        </div>`
      }
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
  ]

  class WAT_Underlay extends Component {
    public componentDidMount () {
      WAT_Underlay_EventTypes.forEach((EventType:string) => {
        (this as Component).base.addEventListener(EventType,consumeEvent)
      })
    }

    public componentWillUnmount () {
      WAT_Underlay_EventTypes.forEach((EventType:string) => {
        (this as Component).base.removeEventListener(EventType,consumeEvent)
      })
    }

    public render (PropSet:Indexable):any {
      const { Widget, Overlay } = PropSet

      const handleEvent = (Event:Event) => {
        consumeEvent(Event)
        if (! Overlay.isModal) { Widget.closeOverlay(Overlay.Name) }
      }

      const modal = (Overlay.isModal ? 'modal' : '')

      return html`<div class="WAT ${modal} Underlay"
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

    protected _GeometryOfWidgetRelativeTo (
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
            SourceWidget.normalizedBehavior === 'basic_controls.outline'
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

/**** rerender - sometimes optimizes rerendering ****/

  let combinedView:WAT_combinedView|undefined = undefined
  let RenderRequest:any

  export function rerender ():void {
    if (RenderRequest != null) { return }
    if (combinedView  != null) {
      RenderRequest = setTimeout(() => {
        RenderRequest = undefined
        if (combinedView != null) { combinedView.rerender() }
      },0)
    }
  }

/**** useDesigner ****/

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

      collectInternalNames()

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

    let AppletName = acceptableValue(
      AppletElement.getAttribute('name'),ValueIsName,'WAT-Applet'
    )

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

  const global = (new Function('return this'))() as Indexable
    global.JIL = JIL
    global.WAT = {}
  const WAT:Indexable = global.WAT                       // just for convenience
    for (const [Key,Value] of Object.entries(JIL)) {           // map JIL to WAT
      if (Key !== 'default') { WAT[Key] = Value }
    }
  Object.assign(WAT,{
    Object_assign, AsyncFunction,
    newId,
    throwError, throwReadOnlyError,
    acceptableValue, allowValue, expectValue,
    ValueIsIdentifier, allowIdentifier, allowedIdentifier, expectIdentifier, expectedIdentifier,
    ValueIsName, allowName, allowedName, expectName, expectedName,
    ValueIsPath, allowPath, allowedPath, expectPath, expectedPath,
    ValueIsCategory, allowCategory, allowedCategory, expectCategory, expectedCategory,
    ValueIsBehavior, allowBehavior, allowedBehavior, expectBehavior, expectedBehavior,
    ValueIsVisual, allowVisual, allowedVisual, expectVisual, expectedVisual,
    ValueIsApplet, allowApplet, allowedApplet, expectApplet, expectedApplet,
    ValueIsPage, allowPage, allowedPage, expectPage, expectedPage,
    ValueIsWidget, allowWidget, allowedWidget, expectWidget, expectedWidget,
    ValueIsLocation, allowLocation, allowedLocation, expectLocation, expectedLocation,
    ValueIsDimension, allowDimension, allowedDimension, expectDimension, expectedDimension,
    ValueIsPosition, allowPosition, allowedPosition, expectPosition, expectedPosition,
    ValueIsSize, allowSize, allowedSize, expectSize, expectedSize,
    ValueIsGeometry, allowGeometry, allowedGeometry, expectGeometry, expectedGeometry,
    ValueIsSerializableValue, allowSerializableValue, allowedSerializableValue, expectSerializableValue, expectedSerializableValue,
    ValueIsSerializableObject, allowSerializableObject, allowedSerializableObject, expectSerializableObject, expectedSerializableObject,
    BehaviorIsIntrinsic,
    GestureRecognizer,
    Mover:WAT_Mover, Resizer:WAT_Resizer, Shaper:WAT_Shaper, Dragger:WAT_Dragger,
    Component, createRef, useRef, useEffect, useCallback,
    fromLocalTo, fromViewportTo, fromDocumentTo,
  })

/**** start WAT up ****/

  localforage.config({
    driver: [localforage.INDEXEDDB, localforage.WEBSQL]
  })

  if (document.readyState === 'loading') {
    window.addEventListener('DOMContentLoaded', startup)
  } else {
    startup()
  }
