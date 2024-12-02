/*******************************************************************************
*                                                                              *
*                        WebApp Tinkerer (WAT) Runtime                         *
*                                                                              *
*******************************************************************************/

  declare const download:Function
  declare const localforage:any

  import {
//  throwError,
    quoted,
    ValuesDiffer,
    ValueIsBoolean,
    ValueIsNumber, ValueIsFiniteNumber, ValueIsNumberInRange,
      ValueIsInteger, ValueIsIntegerInRange, ValueIsOrdinal,
    ValueIsString, ValueIsStringMatching, ValueIsText, ValueIsTextline,
    ValueIsObject, ValueIsPlainObject,
    ValueIsList, ValueIsListSatisfying,
    ValueIsFunction,
    ValueIsOneOf,
    ValueIsColor, ValueIsEMailAddress, /*ValueIsPhoneNumber,*/ ValueIsURL,
    ValidatorForClassifier, acceptNil,rejectNil,
    expectValue,
    allowBoolean, expectBoolean,
    allowFiniteNumber, allowInteger, expectInteger,
      allowIntegerInRange, allowOrdinal, expectCardinal,
    allowString, expectString, allowText, allowTextline,
    allowFunction, expectFunction,
    expectPlainObject,
    expectList, expectListSatisfying,
    allowOneOf, expectOneOf,
    allowColor, allowURL,
  } from 'javascript-interface-library'
  import * as JIL from 'javascript-interface-library'

  import { render, html, Component } from 'htm/preact'

  import hyperactiv from 'hyperactiv'
  const { observe, computed, dispose } = hyperactiv

  import { customAlphabet }   from 'nanoid'
// @ts-ignore TS2307 typescript has problems importing "nanoid-dictionary"
  import { nolookalikesSafe } from 'nanoid-dictionary'

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

  export type WAT_TextShadow = {
    xOffset:   WAT_Location,
    yOffset:   WAT_Location,
    BlurRadius:WAT_Dimension,
    Color:     WAT_Color                   // Color = "transparent" means "none"
  }

  export const WAT_TextAlignments = [ 'left','center','right','justify' ]
  export type  WAT_TextAlignment  = typeof WAT_TextAlignments[number]

  export type WAT_BackgroundTexture = {
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
    xOffset:     WAT_Location,
    yOffset:     WAT_Location,
    BlurRadius:  WAT_Dimension,
    SpreadRadius:WAT_Dimension,
    Color:       WAT_Color                 // Color = "transparent" means "none"
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

/**** throwError - simplifies construction of named errors ****/

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

/**** ValueIsTextShadow ****/

  export function ValueIsTextShadow (Value:any):boolean {
    return (Value === 'none') || (
      ValueIsObject(Value) &&
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

/**** ValueIsSerializableValue ****/

  export function ValueIsSerializableValue (Value:any):boolean {
    switch (true) {
      case (Value === null):
      case ValueIsBoolean(Value):
      case ValueIsNumber(Value):
      case ValueIsString(Value):
      case ValueIsListSatisfying(Value,ValueIsSerializableValue):
        return true
      case ValueIsPlainObject(Value):
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
//--                                WAT_Visual                                --
//------------------------------------------------------------------------------

  export abstract class WAT_Visual {
    protected _Container:WAT_Visual|undefined

    protected constructor (Container?:WAT_Visual) {
      this._Container = Container
    }

  /**** Name ****/

    private _Name:WAT_Name|undefined

    public get Name ():WAT_Name|undefined { return this._Name }
    public set Name (newName:WAT_Name|undefined) {
      allowName('WAT name',newName)
      if (newName != null) {
        newName = newName.trim()
        if (newName === '') { newName = undefined }
      }

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
          switch (Key) {
            case 'onMount':       this.onMount      (OptionSet[Key]); break
            case 'onUnmount':     this.onUnmount    (OptionSet[Key]); break
            case 'onRender':      this.onRender     (OptionSet[Key]); break
            case 'onValueChange': this.onValueChange(OptionSet[Key]); break
// @ts-ignore TS7053 allow "Visual" to be indexed
            default:              this[Key] = OptionSet[Key]
          }
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
      allowTextline('widget font family',newFontFamily)
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
      allowOrdinal('widget font size',newFontSize)
      if (this._FontSize !== newFontSize) {
        this._FontSize = newFontSize
        this.rerender()
      }
    }

  /**** FontWeight - inheritable ****/

    protected _FontWeight:WAT_Ordinal|undefined

    public get FontWeight ():WAT_Ordinal|undefined {
      return (
        this._FontWeight == null
        ? this._Container == null ? undefined : this._Container.FontWeight
        : this._FontWeight
      )
    }

    public set FontWeight (newFontWeight:WAT_Ordinal|undefined) {
      allowIntegerInRange('widget font weight',newFontWeight, 1,1000)
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
      allowOneOf('widget font style',newFontStyle, WAT_FontStyles)
      if (this._FontStyle !== newFontStyle) {
        this._FontStyle = newFontStyle
        this.rerender()
      }
    }

  /**** TextShadow - not inheritable ****/

    protected _TextShadow:WAT_TextShadow|undefined

    public get TextShadow ():WAT_TextShadow|undefined {
      return (this._TextShadow == null ? undefined : { ...this._TextShadow })
    }

    public set TextShadow (newTextShadow:WAT_TextShadow|undefined) {
      allowTextShadow('widget text shadow',newTextShadow)
      if (ValuesDiffer(this._TextShadow,newTextShadow)) {
        if (newTextShadow == null) {
          this._TextShadow = undefined
        } else {
          const { xOffset,yOffset, BlurRadius, Color } = newTextShadow
          this._TextShadow = { xOffset,yOffset, BlurRadius, Color }
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
      allowOneOf('widget text alignment',newTextAlignment, WAT_TextAlignments)
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
      allowOrdinal('widget line height',newLineHeight)
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
      allowColor('widget foreground color',newForegroundColor)
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
      allowColor('widget background color',newColor)
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
      allowBackgroundTexture('widget background texture',newTexture)
      if (ValuesDiffer(this._BackgroundTexture,newTexture)) {
        if (newTexture == null) {
          this._BackgroundTexture = undefined
        } else {
          const { ImageURL, Mode, xOffset,yOffset } = newTexture
          this._BackgroundTexture = { ImageURL, Mode, xOffset,yOffset }
        }
        this.rerender()
      }
    }

  /**** BorderWidths - in "t,r,b,l" order, not inheritable ****/

    protected _BorderWidths:(WAT_Dimension|undefined)[]|undefined

    public get BorderWidths ():WAT_Dimension|(WAT_Dimension|undefined)[]|undefined {
      return ( this._BorderWidths == null ? undefined : this._BorderWidths.slice())
    }

    public set BorderWidths (newBorderWidths:(WAT_Dimension|undefined)[]|undefined) {
      let newSettings:WAT_Dimension[]|undefined = undefined
      switch (true) {
        case (newBorderWidths == null):
          break
        case ValueIsDimension(newBorderWidths):
          newSettings = new Array(4).fill(newBorderWidths as any)// satisfies TS
          break
        case ValueIsListSatisfying(
          newBorderWidths,(Value:any) => (Value == null) || ValueIsDimension(Value)
        ):
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

  /**** BorderStyles - in "t,r,b,l" order, not inheritable ****/

    protected _BorderStyles:(WAT_BorderStyle|undefined)[]|undefined

    public get BorderStyles ():WAT_BorderStyle|(WAT_BorderStyle|undefined)[]|undefined {
      return ( this._BorderStyles == null ? undefined : this._BorderStyles.slice())
    }

    public set BorderStyles (newBorderStyles:(WAT_BorderStyle|undefined)[]|undefined) {
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

  /**** BorderColors - in "t,r,b,l" order, not inheritable ****/

    protected _BorderColors:(WAT_Color|undefined)[]|undefined

    public get BorderColors ():WAT_Color|(WAT_Color|undefined)[]|undefined {
      return ( this._BorderColors == null ? undefined : this._BorderColors.slice())
    }

    public set BorderColors (newBorderColors:(WAT_Color|undefined)[]|undefined) {
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

    protected _BorderRadii:(WAT_Dimension|undefined)[]|undefined

    public get BorderRadii ():WAT_Dimension|(WAT_Dimension|undefined)[]|undefined {
      return ( this._BorderRadii == null ? undefined : this._BorderRadii.slice())
    }

    public set BorderRadii (newBorderRadii:(WAT_Dimension|undefined)[]|undefined) {
      let newSettings:WAT_Dimension[]|undefined = undefined
      switch (true) {
        case (newBorderRadii == null):
          break
        case ValueIsDimension(newBorderRadii):
          newSettings = new Array(4).fill(newBorderRadii as any) // satisfies TS
          break
        case ValueIsListSatisfying(
          newBorderRadii,(Value:any) => (Value == null) || ValueIsDimension(Value)
        ):
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
          const { xOffset,yOffset, BlurRadius,SpreadRadius, Color } = newBoxShadow
          this._BoxShadow = { xOffset,yOffset, BlurRadius,SpreadRadius, Color }
        }
        this.rerender()
      }
    }

  /**** Opacity - 0...100%, not inheritable ****/

    protected _Opacity:WAT_Ordinal|undefined

    public get Opacity ():WAT_Ordinal|undefined {
      return this._Opacity
    }

    public set Opacity (newOpacity:WAT_Ordinal|undefined) {
      allowIntegerInRange('widget opacity',newOpacity, 0,100)
      if (this._Opacity !== newOpacity) {
        this._Opacity = newOpacity
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
      allowOneOf('widget cursor name',newCursor, WAT_Cursors)
      if (this._Cursor !== newCursor) {
        this._Cursor = newCursor
        this.rerender()
      }
    }

  /**** Value ****/

    protected _Value:serializableValue = null                // not "undefined"!

    public get Value ():serializableValue { return this._Value }
    public set Value (newValue:serializableValue) {
      allowSerializableValue('Value',newValue)
      if (newValue === undefined) { newValue = null }

      if (ValuesDiffer(this._Value,newValue)) {
        this._Value = newValue // *C* a deep copy may be better

        if (this._onValueChange != null) {
          try {
            this._onValueChange.call(this)
          } catch (Signal:any) {
            console.error('"onValueChange" Callback Failure',Signal)
          }
        }

        this.rerender()
      }
    }

  /**** onValueChange - will not be called upon deserialization ****/

    protected _onValueChange:Function|undefined

    public onValueChange (newCallback:Function|undefined):void {
      allowFunction('"onValueChange" callback',newCallback)
      if (newCallback == null) {
        this._onValueChange = undefined
      } else {
        this._onValueChange = () => {
          try {
            newCallback.call(this)
          } catch (Signal:any) {
            console.error('"onValueChange" Callback Failure',Signal)
          }
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

  /**** Renderer ****/

    protected _Renderer:Function|undefined

    public get Renderer ():Function|undefined { return this._Renderer }
    public set Renderer (newRenderer:Function|undefined) {
      allowFunction('WAT renderer',newRenderer)
      if (this._Renderer !== newRenderer) {
        this._Renderer = newRenderer
        this.rerender()
      }
    }

  /**** onRender ****/

    public onRender (newRenderer:Function):void {
      expectFunction('renderer callback',newRenderer)
      this.Renderer = newRenderer
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

  /**** View ****/

    protected _View:HTMLElement|undefined

    public get View ():HTMLElement|undefined { return this._View }
    public set View (_:HTMLElement)          { throwReadOnlyError('View') }

  /**** isMounted ****/

    public get isMounted ():boolean  { return (this._View != null) }
    public set isMounted (_:boolean) { throwReadOnlyError('isMounted') }

  /**** onMount ****/

    protected _onMount:Function|undefined

    public onMount (newCallback:Function|undefined):void {
      allowFunction('"onMount" callback',newCallback)
      if (newCallback == null) {
        this._onMount = undefined
      } else {
        this._onMount = () => {
          try {
            newCallback.call(this)
          } catch (Signal:any) {
            console.error('"onMount" Callback Failure',Signal)
          }
        }
      }
    }

  /**** onUnmount ****/

    protected _onUnmount:Function|undefined

    public onUnmount (newCallback:Function|undefined):void {
      allowFunction('"onUnmount" callback',newCallback)
      if (newCallback == null) {
        this._onUnmount = undefined
      } else {
        this._onUnmount = () => {
          try {
            newCallback.call(this)
          } catch (Signal:any) {
            console.error('"onUnmount" Callback Failure',Signal)
          }
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

      const serializeProperty = (Name:string) => {
// @ts-ignore TS7053 allow "Visual" to be indexed
        if (this['_'+Name] != null) { Serialization[Name] = this[Name] }
      }

      ;[
        'Name',
        'FontFamily','FontSize','FontWeight','FontStyle',
        'TextShadow','TextAlignment','LineHeight',
        'ForegroundColor', 'BackgroundColor','BackgroundTexture',
        'BorderWidths','BorderStyles','BorderColors','BorderRadii','BoxShadow',
        'Opacity','OverflowVisibility','Cursor',
        'memoized','Value',
      ].forEach((Name:string) => serializeProperty(Name))
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
        'TextShadow','TextAlignment','LineHeight',
        'ForegroundColor', 'BackgroundColor','BackgroundTexture',
        'BorderWidths','BorderStyles','BorderColors','BorderRadii','BoxShadow',
        'Opacity','OverflowVisibility','Cursor',
        'Value',
      ].forEach((Name:string) => deserializeProperty(Name))

      if (ValueIsPlainObject(Serialization.memoized)) {
        try {
          this.memoized = structuredClone(Serialization.memoized) as Serializable
        } catch (Signal:any) {
          console.warn(
            'DeserializationError: invalid value for property "memoized" ' +
            'in visual ' + quoted(this.Path)
          )
        }
      }
    }
  }

//------------------------------------------------------------------------------
//--                                WAT_Applet                                --
//------------------------------------------------------------------------------

  export class WAT_Applet extends WAT_Visual {
    public constructor () {
      super(undefined)
    }

  /**** Path - to be overwritten ****/

    public get Path ():WAT_Path  { return '/' }
    public set Path (_:WAT_Path) { throwReadOnlyError('Path') }

  /**** isAttached ****/

    public get isAttached ():boolean  { return (this._View != null) }
    public set isAttached (_:boolean) { throwReadOnlyError('isAttached') }

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

  /**** pendingScript - may be missing or consist of white-space only ****/

    protected _pendingScript:WAT_Text|undefined

    public get pendingScript ():WAT_Text|undefined { return this._pendingScript }
    public set pendingScript (newScript:WAT_Text|undefined) {
      allowText('applet script',newScript)

      if (this._pendingScript !== newScript) {
        this._pendingScript = newScript
        this.rerender()
      }
    }

  /**** activateScript - even if Applet is not (yet) attached ****/

    public activateScript ():void {
      let activeScript:string = (this._activeScript || '').trim()

      this._Renderer = undefined
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

    /**** compile and run the applet script ****/

      this.ScriptError = undefined     // only to be set by "applyPendingScript"
        let compiledScript:Function
        try {
          compiledScript = new Function('me,my, html,reactively', activeScript)
        } catch (Signal:any) {
          console.error('WAT: script compilation failure',Signal)
          return
        }

        try {
          compiledScript.call(this, this,this, html,reactively)
        } catch (Signal) {
          console.error('WAT: script execution failure',Signal)
          return
        }
      this.rerender()
    }

  /**** applyPendingScript - but only if it can be compiled ****/

    public applyPendingScript ():void {
      if (! this.isAttached) { return }        // consider attached applets only

      let activeScript:string  = this._activeScript  || ''
      let pendingScript:string = this._pendingScript || ''
      if (activeScript === pendingScript) { return }

      if (pendingScript.trim() !== '') {
        let compiledScript:Function        // try compiling pending script first
        try {
          compiledScript = new Function(
            'me,my, html,reactively', pendingScript
          )
        } catch (Signal:any) {
          console.error('WAT: script compilation failure',Signal)
          this.ScriptError = '' + Signal
          return
        }
      }

      this._activeScript  = pendingScript.trim()
      this._pendingScript = undefined
      this._ScriptError   = undefined

      this.activateScript()                                    // may still fail
      this.rerender()
    }

  /**** ScriptError - script compilation errors, for internal use only ****/

    protected _ScriptError:string|undefined

    public get ScriptError ():string|undefined {
      return this._ScriptError
    }
    public set ScriptError (newScriptError:string|undefined) {
      allowString('script error',newScriptError)
      this._ScriptError = newScriptError
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

      return {
        x:View.offsetLeft, Width:View.offsetWidth,
        y:View.offsetTop, Height:View.offsetHeight
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
        }
      )
    }

  /**** _serializeConfigurationInto ****/

    protected _serializeConfigurationInto (Serialization:Serializable):void {
      super._serializeConfigurationInto(Serialization)
//    delete Serialization.Name                  // do not serialize applet name

      const serializeProperty = (Name:string) => {
// @ts-ignore TS7053 allow "Applet" to be indexed
        if (this['_'+Name] != null) { Serialization[Name] = this[Name] }
      }

      ;[
        'Name',
        'activeScript','pendingScript',
        'SnapToGrid','GridWidth','GridHeight',
      ].forEach((Name:string) => serializeProperty(Name))

    /**** "activeScript" needs special treatment ****/

// @ts-ignore TS2339 if it exists "Serialization.activeScript" is a string
      if ((Serialization.activeScript || '').trim() === '') {
        delete Serialization.activeScript
      }
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
        /*'activeScript',*/'pendingScript',
        'SnapToGrid','GridWidth','GridHeight',
      ].forEach((Name:string) => deserializeProperty(Name))

    /**** "activeScript" needs special treatment ****/

      if (ValueIsText(Serialization.activeScript)) {
        this._activeScript = Serialization.activeScript as string
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

      const Applet = new WAT_Applet()
        Applet._deserializePagesFrom(Serialization)
        Applet._deserializeConfigurationFrom(Serialization)
      return Applet
    }

  /**** preserve ****/

    public async preserve ():Promise<void> {
      await AppletStore.setItem('WAT-Applet',JSON.stringify(this.Serialization))
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
  }

//------------------------------------------------------------------------------
//--                                WAT_Widget                                --
//------------------------------------------------------------------------------

  export abstract class WAT_Widget extends WAT_Visual {
    public constructor (Page:WAT_Page) {
      super(Page)
    }

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

  /**** onClick ****/

    protected _onClick:Function|undefined

    public onClick (newHandler:Function):void {
      expectFunction('"click" event handler',newHandler)
      this._onClick = newHandler
    }

  /**** onInput ****/

    protected _onInput:Function|undefined

    public onInput (newHandler:Function):void {
      expectFunction('"input" event handler',newHandler)
      this._onInput = newHandler
    }

  /**** onDrop ****/

    protected _onDrop:Function|undefined

    public onDrop (newHandler:Function):void {
      expectFunction('"drop" event handler',newHandler)
      this._onDrop = newHandler
    }

  /**** rerender ****/

    public rerender ():void {
      const Applet = this.Applet
      if (Applet != null) { Applet.rerender(this) }
    }

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
      if (
        (curAnchors[0] !== 'left-width') && (newWidth  != null) ||
        (curAnchors[1] !== 'top-height') && (newHeight != null)
      ) {
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

    protected _Renderer = () => {
      return html`<div class="WAT Content Outline"/>`
    }

    public WidgetsWithinOutline ():WAT_Widget[] {
      const Page = this.Page
      if (Page == null) { return [] }

      const { x,y, Width,Height } = this.Geometry
      const [ minX,maxX, minY,maxY ] = [ x,x+Width, y,y+Height ]

      return Page.WidgetList.filter((Widget:WAT_Widget) => {
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
    pointer-events:none;
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

  export class WAT_ImageView extends WAT_Widget {
    public constructor (Page:WAT_Page) { super(Page) }

    public get Type ():string  { return 'ImageView' }
    public set Type (_:string) { throwReadOnlyError('Type') }

    protected _Renderer = () => {
      return html`<img class="WAT Content ImageView" src=${acceptableURL(this.Value,'')}/>`
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

    protected _Renderer = () => {
      const DataURL = 'data:image/svg+xml;base64,' + btoa(acceptableText(this.Value,''))
      return html`<img class="WAT Content SVGView" src=${DataURL}/>`
    }
  }
  builtInWidgetTypes['SVGView'] = WAT_SVGView

  appendStyle(`
  .WAT.Widget > .WAT.SVGView {
    object-fit:contain; object-position:center;
  }
  `)

/**** WebView ****/

  export class WAT_WebView extends WAT_Widget {
    public constructor (Page:WAT_Page) { super(Page) }

    public get Type ():string  { return 'WebView' }
    public set Type (_:string) { throwReadOnlyError('Type') }

    protected _Renderer = () => {
      return html`<iframe class="WAT Content WebView"
        src=${acceptableURL(this.Value,'')}
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
      const onClick = (Event:any) => {
        if (this.Enabling == false) { return consumingEvent(Event) }
        if (typeof this._onClick === 'function') { this._onClick(Event) }
      }

      const Value = acceptableURL(this.Value,'./icons/pencil.png')
      const Color = acceptableColor(this.Color,'black')

      return html`<div class="WAT Content Icon" style="
        -webkit-mask-image:url(${Value}); mask-image:url(${Value});
        background-color:${Color};
      " disabled=${this.Enabling == false} onClick=${onClick}
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
        if (typeof this._onClick === 'function') { this._onClick(Event) }
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
        if (typeof this._onClick === 'function') { this._onClick(Event) }
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
        if (typeof this._onClick === 'function') { this._onClick(Event) }
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
  }
  `)

/**** CSSStyleOfVisual ****/

  export function CSSStyleOfVisual (Visual:WAT_Visual):string {
    expectVisual('widget',Visual)

    let CSSStyleList:string[] = []
      const {
        BackgroundColor, BackgroundTexture, ForegroundColor,
        FontFamily, FontSize, FontWeight, FontStyle, LineHeight
      } = Visual

      if (BackgroundColor != null) { CSSStyleList.push(`background-color:${BackgroundColor}`) }
      if (BackgroundTexture != null) {
        CSSStyleList.push(
          `background-image:${BackgroundTexture}; background-repeat:repeat`
        )
      }
      if (ForegroundColor != null) { CSSStyleList.push(`color:${ForegroundColor}`) }

      if (FontFamily != null) { CSSStyleList.push(`font-family:${FontFamily}`) }
      if (FontSize   != null) { CSSStyleList.push(`font-size:${FontSize}px`) }
      if (FontWeight != null) { CSSStyleList.push(`font-weight:${FontWeight}`) }
      if (FontStyle  != null) { CSSStyleList.push(`font-style:${FontStyle}`) }
      if (LineHeight != null) { CSSStyleList.push(`line-height:${LineHeight}px`) }
    return CSSStyleList.join(';')
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
  }//------------------------------------------------------------------------------
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
      const Applet      = this._Applet = PropSet.Applet as WAT_Applet
      const visitedPage = Applet.visitedPage

      return html`<div class="WAT Applet" style="
        ${CSSStyleOfVisual(Applet) || ''}
        left:0px; top:0px; right:0px; bottom:0px
      ">
        ${Applet.isAttached ? html`
          ${Applet.Rendering()}
          ${visitedPage == null
            ? html`<div class="WAT centered"><div>(no page to show)</div></div>`
            : html`<${WAT_PageView} Page=${visitedPage}/>`
          }
        ` : '' }
      </div>`
    }
  }

//------------------------------------------------------------------------------
//--                               WAT_PageView                               --
//------------------------------------------------------------------------------

  class WAT_PageView extends Component {
    private _Page:WAT_Page|undefined

  /**** componentDidMount ****/

    public componentDidMount ():void {
      const Page = this._Page as WAT_Page

      Page['_View'] = (this as Component).base
      if (Page['_onMount'] != null) {
        Page['_onMount']()
      }
    }

  /**** componentWillUnmount ****/

    public componentWillUnmount ():void {
      const Page = this._Page as WAT_Page

      Page['_View'] = undefined
      if (Page['_onUnmount'] != null) {
        Page['_onUnmount']()
      }
    }

  /**** render ****/

    public render (PropSet:Indexable):any {
      const Page = this._Page = PropSet.Page as WAT_Page

      return html`<div class="WAT Page" style="
        ${CSSStyleOfVisual(Page) || ''}
        left:0px; top:0px; right:0px; bottom:0px
      ">
        ${Page.Rendering()}
        ${(Page.WidgetList as any).toReversed().map((Widget:WAT_Widget) => {
          if (Widget.isVisible) {
            return html`<${WAT_WidgetView} Widget=${Widget}/>`
          } else { return '' }
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

      let { x,y, Width,Height } = Widget.Geometry
      const CSSGeometry = (
        (x != null) && (Width != null) && (y != null) && (Height != null)
        ? `left:${x}px; top:${y}px; width:${Width}px; height:${Height}px; right:auto; bottom:auto;`
        : ''
      )

      return html`<div class="WAT Widget" style="
        ${CSSStyleOfVisual(Widget) || ''}
        ${CSSGeometry};
      ">
        ${Widget.Rendering()}
      </div>`
    }
  }

/**** useDesigner ****/

  let DesignerLayer:Function|undefined = undefined

  export function useDesigner (newDesigner:Component):void {
    allowFunction('WAT designer',newDesigner)

    console.log('installing WebApp Tinkerer Designer')

    DesignerLayer = newDesigner
    rerender()
  }

//------------------------------------------------------------------------------
//--                               WAT Startup                                --
//------------------------------------------------------------------------------

  let AppletStore:any

  let Applet:WAT_Applet

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

    let SerializationElement = document.querySelector('script[type="wat/applet"]')

  /**** deserialize applet ****/

    let Applet:WAT_Applet|undefined = undefined
      let Serialization = await AppletStore.getItem('WAT-Applet')
      if (Serialization != null) {
        try {
          Applet = WAT_Applet.deserializedFrom(Serialization)
        } catch (Signal:any) {
          console.error('could not deserialize applet from backup', Signal)
        }
      }

      if ((Applet == null) && (SerializationElement != null)) {
        try {
          Applet = WAT_Applet.deserializedFrom(SerializationElement.textContent || '')
        } catch (Signal:any) {
          console.error('could not deserialize applet', Signal)
        }
      }
    if (Applet == null) {
      Applet = WAT_Applet.deserializedFrom('{"PageList":[]}')
    }

    if (Applet.visitedPage == null) {
      Applet.visitPage(Applet.PageList[0])
    }

  /**** read and activate applet script - if stored separately ****/

    let ScriptElement = document.querySelector('script[type="wat/applet-script"]')
    if (ScriptElement != null) {
      Applet.activeScript = ScriptElement.textContent || ''
    }

    Applet.activateScript()

  /**** finally render the applet ****/

    let AppletElement = document.body.querySelector('div[type="wat/applet"]')
    if (AppletElement == null) {
      AppletElement = document.createElement('div')
        AppletElement.setAttribute('type','wat/applet')
        AppletElement.classList.add('fullscreen')
      document.body.appendChild(AppletElement)
    }
    AppletElement.innerHTML = ''

    render(html`<${WAT_combinedView} Applet=${Applet}/>`,AppletElement)

    console.log('WebApp Tinkerer Runtime is operational')
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

/**** start WAT up ****/

  localforage.config({
    driver: [localforage.INDEXEDDB, localforage.WEBSQL]
  })

  if (document.readyState === 'loading') {
    window.addEventListener('DOMContentLoaded', startup)
  } else {
    startup()
  }
