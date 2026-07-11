export declare const acceptNil = true;

export declare const allowAnonymousFunction: (Description: string, Argument: any) => Function | null | undefined;

/**** allow[ed]Array ****/
export declare function allowArray(Description: string, Argument: any): any[] | null | undefined;

export declare const allowArrayBuffer: (Description: string, Argument: any) => ArrayBuffer | null | undefined;

export declare const allowBase64: (Description: string, Argument: any) => string | null | undefined;

export declare const allowBigInt: (Description: string, Argument: any) => bigint | null | undefined;

export declare const allowBoolean: (Description: string, Argument: any) => boolean | null | undefined;

export declare const allowCardinal: (Description: string, Argument: any) => number | null | undefined;

export declare const allowColor: (Description: string, Argument: any) => string | null | undefined;

export declare const allowDate: (Description: string, Argument: any) => Date | null | undefined;

export declare const allowE164PhoneNumber: (Description: string, Argument: any) => string | null | undefined;

export declare const allowedAnonymousFunction: (Description: string, Argument: any) => Function | null | undefined;

export declare const allowedArray: typeof allowArray;

export declare const allowedArrayBuffer: (Description: string, Argument: any) => ArrayBuffer | null | undefined;

export declare const allowedBase64: (Description: string, Argument: any) => string | null | undefined;

export declare const allowedBigInt: (Description: string, Argument: any) => bigint | null | undefined;

export declare const allowedBoolean: (Description: string, Argument: any) => boolean | null | undefined;

export declare const allowedCardinal: (Description: string, Argument: any) => number | null | undefined;

export declare const allowedColor: (Description: string, Argument: any) => string | null | undefined;

export declare const allowedDate: (Description: string, Argument: any) => Date | null | undefined;

export declare const allowedE164PhoneNumber: (Description: string, Argument: any) => string | null | undefined;

export declare const allowedEMailAddress: (Description: string, Argument: any) => string | null | undefined;

export declare const allowedError: (Description: string, Argument: any) => Error | null | undefined;

export declare const allowedFiniteNumber: (Description: string, Argument: any) => number | null | undefined;

export declare const allowedFunction: (Description: string, Argument: any) => Function | null | undefined;

export declare const allowedHexString: (Description: string, Argument: any) => string | null | undefined;

export declare const allowedHostName: (Description: string, Argument: any) => string | null | undefined;

export declare const allowedIdentifier: (Description: string, Argument: any) => string | null | undefined;

export declare const allowedInstanceOf: typeof allowInstanceOf;

export declare const allowedInteger: (Description: string, Argument: any) => number | null | undefined;

export declare const allowedIntegerInRange: typeof allowIntegerInRange;

export declare const allowedIPv4Address: (Description: string, Argument: any) => string | null | undefined;

export declare const allowedIPv6Address: (Description: string, Argument: any) => string | null | undefined;

export declare const allowedISODate: (Description: string, Argument: any) => string | null | undefined;

export declare const allowedISOTimestamp: (Description: string, Argument: any) => string | null | undefined;

export declare const allowedJSONString: (Description: string, Argument: any) => string | null | undefined;

export declare const allowedList: typeof allowList;

export declare const allowedListOf: typeof allowListOf;

export declare const allowedListSatisfying: typeof allowListSatisfying;

export declare const allowedMap: (Description: string, Argument: any) => Map<any, any> | null | undefined;

export declare const allowedNamedFunction: (Description: string, Argument: any) => Function | null | undefined;

export declare const allowedNaN: (Description: string, Argument: any) => number | null | undefined;

export declare const allowedNativeFunction: (Description: string, Argument: any) => Function | null | undefined;

export declare const allowedNonEmptyString: (Description: string, Argument: any) => string | null | undefined;

export declare const allowedNumber: (Description: string, Argument: any) => number | null | undefined;

export declare const allowedNumberInRange: typeof allowNumberInRange;

export declare const allowedObject: (Description: string, Argument: any) => object | null | undefined;

export declare const allowedOneOf: typeof allowOneOf;

export declare const allowedOrdinal: (Description: string, Argument: any) => number | null | undefined;

export declare const allowedPhoneNumber: (Description: string, Argument: any) => string | null | undefined;

export declare const allowedPlainObject: (Description: string, Argument: any) => object | null | undefined;

export declare const allowedPortNumber: (Description: string, Argument: any) => number | null | undefined;

export declare const allowedPromise: (Description: string, Argument: any) => Promise<any> | null | undefined;

export declare const allowedRegExp: (Description: string, Argument: any) => RegExp | null | undefined;

export declare const allowedScriptedFunction: (Description: string, Argument: any) => Function | null | undefined;

export declare const allowedSerializableObject: (Description: string, Argument: any) => unknown;

export declare const allowedSerializableValue: (Description: string, Argument: any) => unknown;

export declare const allowedSet: (Description: string, Argument: any) => Set<any> | null | undefined;

export declare const allowedString: (Description: string, Argument: any) => string | null | undefined;

export declare const allowedStringMatching: typeof allowStringMatching;

export declare const allowedSymbol: (Description: string, Argument: any) => symbol | null | undefined;

export declare const allowedText: (Description: string, Argument: any) => string | null | undefined;

export declare const allowedTextline: (Description: string, Argument: any) => string | null | undefined;

export declare const allowedTypedArray: (Description: string, Argument: any) => TypedArray | null | undefined;

export declare const allowedURL: (Description: string, Argument: any) => string | null | undefined;

export declare const allowedUUID: (Description: string, Argument: any) => string | null | undefined;

export declare const allowedValue: typeof allowValue;

export declare const allowedValueInheritingFrom: typeof allowValueInheritingFrom;

export declare const allowedVanillaObject: (Description: string, Argument: any) => object | null | undefined;

export declare const allowEMailAddress: (Description: string, Argument: any) => string | null | undefined;

export declare const allowError: (Description: string, Argument: any) => Error | null | undefined;

export declare const allowFiniteNumber: (Description: string, Argument: any) => number | null | undefined;

export declare const allowFunction: (Description: string, Argument: any) => Function | null | undefined;

export declare const allowHexString: (Description: string, Argument: any) => string | null | undefined;

export declare const allowHostName: (Description: string, Argument: any) => string | null | undefined;

export declare const allowIdentifier: (Description: string, Argument: any) => string | null | undefined;

/**** allow[ed]InstanceOf ****/
export declare function allowInstanceOf(Description: string, Argument: any, constructor: Function, Expectation: string): any | null | undefined;

export declare const allowInteger: (Description: string, Argument: any) => number | null | undefined;

/**** allow[ed]IntegerInRange ****/
export declare function allowIntegerInRange(Description: string, Argument: any, minValue?: number, maxValue?: number): number | null | undefined;

export declare const allowIPv4Address: (Description: string, Argument: any) => string | null | undefined;

export declare const allowIPv6Address: (Description: string, Argument: any) => string | null | undefined;

export declare const allowISODate: (Description: string, Argument: any) => string | null | undefined;

export declare const allowISOTimestamp: (Description: string, Argument: any) => string | null | undefined;

export declare const allowJSONString: (Description: string, Argument: any) => string | null | undefined;

/**** allow[ed]List ****/
export declare function allowList(Description: string, Argument: any, Expectation?: string, minLength?: number, maxLength?: number): any[] | null | undefined;

/**** allow/expect[ed]ListOf ****/
export declare function allowListOf(Description: string, Argument: any, ValueList: any[]): any[] | null | undefined;

/**** allow[ed]ListSatisfying ****/
export declare function allowListSatisfying(Description: string, Argument: any, Validator: (Value: any) => boolean, Expectation?: string, minLength?: number, maxLength?: number): any[] | null | undefined;

export declare const allowMap: (Description: string, Argument: any) => Map<any, any> | null | undefined;

export declare const allowNamedFunction: (Description: string, Argument: any) => Function | null | undefined;

export declare const allowNaN: (Description: string, Argument: any) => number | null | undefined;

export declare const allowNativeFunction: (Description: string, Argument: any) => Function | null | undefined;

export declare const allowNonEmptyString: (Description: string, Argument: any) => string | null | undefined;

export declare const allowNumber: (Description: string, Argument: any) => number | null | undefined;

/**** allow[ed]NumberInRange ****/
export declare function allowNumberInRange(Description: string, Argument: any, minValue?: number, maxValue?: number, withMin?: boolean, withMax?: boolean): number | null | undefined;

export declare const allowObject: (Description: string, Argument: any) => object | null | undefined;

/**** allow[ed]OneOf ****/
export declare function allowOneOf(Description: string, Argument: any, ValueList: any[]): any | null | undefined;

export declare const allowOrdinal: (Description: string, Argument: any) => number | null | undefined;

export declare const allowPhoneNumber: (Description: string, Argument: any) => string | null | undefined;

export declare const allowPlainObject: (Description: string, Argument: any) => object | null | undefined;

export declare const allowPortNumber: (Description: string, Argument: any) => number | null | undefined;

export declare const allowPromise: (Description: string, Argument: any) => Promise<any> | null | undefined;

export declare const allowRegExp: (Description: string, Argument: any) => RegExp | null | undefined;

export declare const allowScriptedFunction: (Description: string, Argument: any) => Function | null | undefined;

export declare const allowSerializableObject: (Description: string, Argument: any) => unknown;

export declare const allowSerializableValue: (Description: string, Argument: any) => unknown;

export declare const allowSet: (Description: string, Argument: any) => Set<any> | null | undefined;

export declare const allowString: (Description: string, Argument: any) => string | null | undefined;

/**** allow[ed]StringMatching ****/
export declare function allowStringMatching(Description: string, Argument: any, Pattern: RegExp): string | null | undefined;

export declare const allowSymbol: (Description: string, Argument: any) => symbol | null | undefined;

export declare const allowText: (Description: string, Argument: any) => string | null | undefined;

export declare const allowTextline: (Description: string, Argument: any) => string | null | undefined;

export declare const allowTypedArray: (Description: string, Argument: any) => TypedArray | null | undefined;

export declare const allowURL: (Description: string, Argument: any) => string | null | undefined;

export declare const allowUUID: (Description: string, Argument: any) => string | null | undefined;

/**** allow[ed]Value ****/
export declare function allowValue(Description: string, Argument: any, Validator?: Function): any;

/**** allow[ed]ValueInheritingFrom ****/
export declare function allowValueInheritingFrom(Description: string, Argument: any, prototype: any, Expectation: string): any | null | undefined;

export declare const allowVanillaObject: (Description: string, Argument: any) => object | null | undefined;

export declare const ColorSet: Readonly<{
    transparent: "rgba(0,0,0,0.0)";
    aliceblue: "rgba(240,248,255,1.0)";
    lightpink: "rgba(255,182,193,1.0)";
    antiquewhite: "rgba(250,235,215,1.0)";
    lightsalmon: "rgba(255,160,122,1.0)";
    aqua: "rgba(0,255,255,1.0)";
    lightseagreen: "rgba(32,178,170,1.0)";
    aquamarine: "rgba(127,255,212,1.0)";
    lightskyblue: "rgba(135,206,250,1.0)";
    azure: "rgba(240,255,255,1.0)";
    lightslategray: "rgba(119,136,153,1.0)";
    beige: "rgba(245,245,220,1.0)";
    lightslategrey: "rgba(119,136,153,1.0)";
    bisque: "rgba(255,228,196,1.0)";
    lightsteelblue: "rgba(176,196,222,1.0)";
    black: "rgba(0,0,0,1.0)";
    lightyellow: "rgba(255,255,224,1.0)";
    blanchedalmond: "rgba(255,235,205,1.0)";
    lime: "rgba(0,255,0,1.0)";
    blue: "rgba(0,0,255,1.0)";
    limegreen: "rgba(50,205,50,1.0)";
    blueviolet: "rgba(138,43,226,1.0)";
    linen: "rgba(250,240,230,1.0)";
    brown: "rgba(165,42,42,1.0)";
    magenta: "rgba(255,0,255,1.0)";
    burlywood: "rgba(222,184,135,1.0)";
    maroon: "rgba(128,0,0,1.0)";
    cadetblue: "rgba(95,158,160,1.0)";
    mediumaquamarine: "rgba(102,205,170,1.0)";
    chartreuse: "rgba(127,255,0,1.0)";
    mediumblue: "rgba(0,0,205,1.0)";
    chocolate: "rgba(210,105,30,1.0)";
    mediumorchid: "rgba(186,85,211,1.0)";
    coral: "rgba(255,127,80,1.0)";
    mediumpurple: "rgba(147,112,219,1.0)";
    cornflowerblue: "rgba(100,149,237,1.0)";
    mediumseagreen: "rgba(60,179,113,1.0)";
    cornsilk: "rgba(255,248,220,1.0)";
    mediumslateblue: "rgba(123,104,238,1.0)";
    crimson: "rgba(220,20,60,1.0)";
    mediumspringgreen: "rgba(0,250,154,1.0)";
    cyan: "rgba(0,255,255,1.0)";
    mediumturquoise: "rgba(72,209,204,1.0)";
    darkblue: "rgba(0,0,139,1.0)";
    mediumvioletred: "rgba(199,21,133,1.0)";
    darkcyan: "rgba(0,139,139,1.0)";
    midnightblue: "rgba(25,25,112,1.0)";
    darkgoldenrod: "rgba(184,134,11,1.0)";
    mintcream: "rgba(245,255,250,1.0)";
    darkgray: "rgba(169,169,169,1.0)";
    mistyrose: "rgba(255,228,225,1.0)";
    darkgreen: "rgba(0,100,0,1.0)";
    moccasin: "rgba(255,228,181,1.0)";
    darkgrey: "rgba(169,169,169,1.0)";
    navajowhite: "rgba(255,222,173,1.0)";
    darkkhaki: "rgba(189,183,107,1.0)";
    navy: "rgba(0,0,128,1.0)";
    darkmagenta: "rgba(139,0,139,1.0)";
    oldlace: "rgba(253,245,230,1.0)";
    darkolivegreen: "rgba(85,107,47,1.0)";
    olive: "rgba(128,128,0,1.0)";
    darkorange: "rgba(255,140,0,1.0)";
    olivedrab: "rgba(107,142,35,1.0)";
    darkorchid: "rgba(153,50,204,1.0)";
    orange: "rgba(255,165,0,1.0)";
    darkred: "rgba(139,0,0,1.0)";
    orangered: "rgba(255,69,0,1.0)";
    darksalmon: "rgba(233,150,122,1.0)";
    orchid: "rgba(218,112,214,1.0)";
    darkseagreen: "rgba(143,188,143,1.0)";
    palegoldenrod: "rgba(238,232,170,1.0)";
    darkslateblue: "rgba(72,61,139,1.0)";
    palegreen: "rgba(152,251,152,1.0)";
    darkslategray: "rgba(47,79,79,1.0)";
    paleturquoise: "rgba(175,238,238,1.0)";
    darkslategrey: "rgba(47,79,79,1.0)";
    palevioletred: "rgba(219,112,147,1.0)";
    darkturquoise: "rgba(0,206,209,1.0)";
    papayawhip: "rgba(255,239,213,1.0)";
    darkviolet: "rgba(148,0,211,1.0)";
    peachpuff: "rgba(255,218,185,1.0)";
    deeppink: "rgba(255,20,147,1.0)";
    peru: "rgba(205,133,63,1.0)";
    deepskyblue: "rgba(0,191,255,1.0)";
    pink: "rgba(255,192,203,1.0)";
    dimgray: "rgba(105,105,105,1.0)";
    plum: "rgba(221,160,221,1.0)";
    dimgrey: "rgba(105,105,105,1.0)";
    powderblue: "rgba(176,224,230,1.0)";
    dodgerblue: "rgba(30,144,255,1.0)";
    purple: "rgba(128,0,128,1.0)";
    firebrick: "rgba(178,34,34,1.0)";
    red: "rgba(255,0,0,1.0)";
    floralwhite: "rgba(255,250,240,1.0)";
    rosybrown: "rgba(188,143,143,1.0)";
    forestgreen: "rgba(34,139,34,1.0)";
    royalblue: "rgba(65,105,225,1.0)";
    fuchsia: "rgba(255,0,255,1.0)";
    saddlebrown: "rgba(139,69,19,1.0)";
    gainsboro: "rgba(220,220,220,1.0)";
    salmon: "rgba(250,128,114,1.0)";
    ghostwhite: "rgba(248,248,255,1.0)";
    sandybrown: "rgba(244,164,96,1.0)";
    gold: "rgba(255,215,0,1.0)";
    seagreen: "rgba(46,139,87,1.0)";
    goldenrod: "rgba(218,165,32,1.0)";
    seashell: "rgba(255,245,238,1.0)";
    gray: "rgba(128,128,128,1.0)";
    sienna: "rgba(160,82,45,1.0)";
    green: "rgba(0,128,0,1.0)";
    silver: "rgba(192,192,192,1.0)";
    greenyellow: "rgba(173,255,47,1.0)";
    skyblue: "rgba(135,206,235,1.0)";
    grey: "rgba(128,128,128,1.0)";
    slateblue: "rgba(106,90,205,1.0)";
    honeydew: "rgba(240,255,240,1.0)";
    slategray: "rgba(112,128,144,1.0)";
    hotpink: "rgba(255,105,180,1.0)";
    slategrey: "rgba(112,128,144,1.0)";
    indianred: "rgba(205,92,92,1.0)";
    snow: "rgba(255,250,250,1.0)";
    indigo: "rgba(75,0,130,1.0)";
    springgreen: "rgba(0,255,127,1.0)";
    ivory: "rgba(255,255,240,1.0)";
    steelblue: "rgba(70,130,180,1.0)";
    khaki: "rgba(240,230,140,1.0)";
    tan: "rgba(210,180,140,1.0)";
    lavender: "rgba(230,230,250,1.0)";
    teal: "rgba(0,128,128,1.0)";
    lavenderblush: "rgba(255,240,245,1.0)";
    thistle: "rgba(216,191,216,1.0)";
    lawngreen: "rgba(124,252,0,1.0)";
    tomato: "rgba(255,99,71,1.0)";
    lemonchiffon: "rgba(255,250,205,1.0)";
    turquoise: "rgba(64,224,208,1.0)";
    lightblue: "rgba(173,216,230,1.0)";
    violet: "rgba(238,130,238,1.0)";
    lightcoral: "rgba(240,128,128,1.0)";
    wheat: "rgba(245,222,179,1.0)";
    lightcyan: "rgba(224,255,255,1.0)";
    white: "rgba(255,255,255,1.0)";
    lightgoldenrodyellow: "rgba(250,250,210,1.0)";
    whitesmoke: "rgba(245,245,245,1.0)";
    lightgray: "rgba(211,211,211,1.0)";
    yellow: "rgba(255,255,0,1.0)";
    lightgreen: "rgba(144,238,144,1.0)";
    yellowgreen: "rgba(154,205,50,1.0)";
    lightgrey: "rgba(211,211,211,1.0)";
}>;

/**** constrained ****/
export declare function constrained(Value: number, Minimum?: number, Maximum?: number): number;

export declare function escaped(Text: string): string;

export declare const expectAnonymousFunction: (Description: string, Argument: any) => Function;

/**** expect[ed]Array ****/
export declare function expectArray(Description: string, Argument: any): any[];

export declare const expectArrayBuffer: (Description: string, Argument: any) => ArrayBuffer;

export declare const expectBase64: (Description: string, Argument: any) => string;

export declare const expectBigInt: (Description: string, Argument: any) => bigint;

export declare const expectBoolean: (Description: string, Argument: any) => boolean;

export declare const expectCardinal: (Description: string, Argument: any) => number;

export declare const expectColor: (Description: string, Argument: any) => string;

export declare const expectDate: (Description: string, Argument: any) => Date;

export declare const expectE164PhoneNumber: (Description: string, Argument: any) => string;

export declare const expectedAnonymousFunction: (Description: string, Argument: any) => Function;

export declare const expectedArray: typeof expectArray;

export declare const expectedArrayBuffer: (Description: string, Argument: any) => ArrayBuffer;

export declare const expectedBase64: (Description: string, Argument: any) => string;

export declare const expectedBigInt: (Description: string, Argument: any) => bigint;

export declare const expectedBoolean: (Description: string, Argument: any) => boolean;

export declare const expectedCardinal: (Description: string, Argument: any) => number;

export declare const expectedColor: (Description: string, Argument: any) => string;

export declare const expectedDate: (Description: string, Argument: any) => Date;

export declare const expectedE164PhoneNumber: (Description: string, Argument: any) => string;

export declare const expectedEMailAddress: (Description: string, Argument: any) => string;

export declare const expectedError: (Description: string, Argument: any) => Error;

export declare const expectedFiniteNumber: (Description: string, Argument: any) => number;

export declare const expectedFunction: (Description: string, Argument: any) => Function;

export declare const expectedHexString: (Description: string, Argument: any) => string;

export declare const expectedHostName: (Description: string, Argument: any) => string;

export declare const expectedIdentifier: (Description: string, Argument: any) => string;

export declare const expectedInstanceOf: typeof expectInstanceOf;

export declare const expectedInteger: (Description: string, Argument: any) => number;

export declare const expectedIntegerInRange: typeof expectIntegerInRange;

export declare const expectedIPv4Address: (Description: string, Argument: any) => string;

export declare const expectedIPv6Address: (Description: string, Argument: any) => string;

export declare const expectedISODate: (Description: string, Argument: any) => string;

export declare const expectedISOTimestamp: (Description: string, Argument: any) => string;

export declare const expectedJSONString: (Description: string, Argument: any) => string;

export declare const expectedList: typeof expectList;

export declare const expectedListOf: typeof expectListOf;

export declare const expectedListSatisfying: typeof expectListSatisfying;

export declare const expectedMap: (Description: string, Argument: any) => Map<any, any>;

export declare const expectedNamedFunction: (Description: string, Argument: any) => Function;

export declare const expectedNaN: (Description: string, Argument: any) => number;

export declare const expectedNativeFunction: (Description: string, Argument: any) => Function;

export declare const expectedNonEmptyString: (Description: string, Argument: any) => string;

export declare const expectedNumber: (Description: string, Argument: any) => number;

export declare const expectedNumberInRange: typeof expectNumberInRange;

export declare const expectedObject: (Description: string, Argument: any) => object;

export declare const expectedOneOf: typeof expectOneOf;

export declare const expectedOrdinal: (Description: string, Argument: any) => number;

export declare const expectedPhoneNumber: (Description: string, Argument: any) => string;

export declare const expectedPlainObject: (Description: string, Argument: any) => object;

export declare const expectedPortNumber: (Description: string, Argument: any) => number;

export declare const expectedPromise: (Description: string, Argument: any) => Promise<any>;

export declare const expectedRegExp: (Description: string, Argument: any) => RegExp;

export declare const expectedScriptedFunction: (Description: string, Argument: any) => Function;

export declare const expectedSerializableObject: (Description: string, Argument: any) => unknown;

export declare const expectedSerializableValue: (Description: string, Argument: any) => unknown;

export declare const expectedSet: (Description: string, Argument: any) => Set<any>;

export declare const expectedString: (Description: string, Argument: any) => string;

export declare const expectedStringMatching: typeof expectStringMatching;

export declare const expectedSymbol: (Description: string, Argument: any) => symbol;

export declare const expectedText: (Description: string, Argument: any) => string;

export declare const expectedTextline: (Description: string, Argument: any) => string;

export declare const expectedTypedArray: (Description: string, Argument: any) => TypedArray;

export declare const expectedURL: (Description: string, Argument: any) => string;

export declare const expectedUUID: (Description: string, Argument: any) => string;

export declare const expectedValue: typeof expectValue;

export declare const expectedValueInheritingFrom: typeof expectValueInheritingFrom;

export declare const expectedVanillaObject: (Description: string, Argument: any) => object;

export declare const expectEMailAddress: (Description: string, Argument: any) => string;

export declare const expectError: (Description: string, Argument: any) => Error;

export declare const expectFiniteNumber: (Description: string, Argument: any) => number;

export declare const expectFunction: (Description: string, Argument: any) => Function;

export declare const expectHexString: (Description: string, Argument: any) => string;

export declare const expectHostName: (Description: string, Argument: any) => string;

export declare const expectIdentifier: (Description: string, Argument: any) => string;

/**** expect[ed]InstanceOf ****/
export declare function expectInstanceOf(Description: string, Argument: any, constructor: Function, Expectation: string): any;

export declare const expectInteger: (Description: string, Argument: any) => number;

/**** expect[ed]IntegerInRange ****/
export declare function expectIntegerInRange(Description: string, Argument: any, minValue?: number, maxValue?: number): number;

export declare const expectIPv4Address: (Description: string, Argument: any) => string;

export declare const expectIPv6Address: (Description: string, Argument: any) => string;

export declare const expectISODate: (Description: string, Argument: any) => string;

export declare const expectISOTimestamp: (Description: string, Argument: any) => string;

export declare const expectJSONString: (Description: string, Argument: any) => string;

/**** expect[ed]List ****/
export declare function expectList(Description: string, Argument: any, Expectation?: string, minLength?: number, maxLength?: number): any[];

export declare function expectListOf(Description: string, Argument: any, ValueList: any[]): any[];

/**** expect[ed]ListSatisfying ****/
export declare function expectListSatisfying(Description: string, Argument: any, Validator: (Value: any) => boolean, Expectation?: string, minLength?: number, maxLength?: number): any[];

export declare const expectMap: (Description: string, Argument: any) => Map<any, any>;

export declare const expectNamedFunction: (Description: string, Argument: any) => Function;

export declare const expectNaN: (Description: string, Argument: any) => number;

export declare const expectNativeFunction: (Description: string, Argument: any) => Function;

export declare const expectNonEmptyString: (Description: string, Argument: any) => string;

export declare const expectNumber: (Description: string, Argument: any) => number;

/**** expect[ed]NumberInRange ****/
export declare function expectNumberInRange(Description: string, Argument: any, minValue?: number, maxValue?: number, withMin?: boolean, withMax?: boolean): number;

export declare const expectObject: (Description: string, Argument: any) => object;

/**** expect[ed]OneOf ****/
export declare function expectOneOf(Description: string, Argument: any, ValueList: any[]): any;

export declare const expectOrdinal: (Description: string, Argument: any) => number;

export declare const expectPhoneNumber: (Description: string, Argument: any) => string;

export declare const expectPlainObject: (Description: string, Argument: any) => object;

export declare const expectPortNumber: (Description: string, Argument: any) => number;

export declare const expectPromise: (Description: string, Argument: any) => Promise<any>;

export declare const expectRegExp: (Description: string, Argument: any) => RegExp;

export declare const expectScriptedFunction: (Description: string, Argument: any) => Function;

export declare const expectSerializableObject: (Description: string, Argument: any) => unknown;

export declare const expectSerializableValue: (Description: string, Argument: any) => unknown;

export declare const expectSet: (Description: string, Argument: any) => Set<any>;

export declare const expectString: (Description: string, Argument: any) => string;

/**** expect[ed]StringMatching ****/
export declare function expectStringMatching(Description: string, Argument: any, Pattern: RegExp): string;

export declare const expectSymbol: (Description: string, Argument: any) => symbol;

export declare const expectText: (Description: string, Argument: any) => string;

export declare const expectTextline: (Description: string, Argument: any) => string;

export declare const expectTypedArray: (Description: string, Argument: any) => TypedArray;

export declare const expectURL: (Description: string, Argument: any) => string;

export declare const expectUUID: (Description: string, Argument: any) => string;

/**** expect[ed]Value ****/
export declare function expectValue(Description: string, Argument: any, Validator?: Function): any;

/**** expect[ed]ValueInheritingFrom ****/
export declare function expectValueInheritingFrom(Description: string, Argument: any, prototype: any, Expectation: string): any;

export declare const expectVanillaObject: (Description: string, Argument: any) => object;

/**** FunctionWithName ****/
export declare function FunctionWithName(originalFunction: Function, desiredName: string | String): Function;

/**** get a reference to the "global" object ****/
export declare const global: typeof globalThis;

/**** HexColor - converts a given color to #rrggbbaa ****/
export declare function HexColor(Color: string): string;

export declare function HTMLsafe(Argument: string, EOLReplacement?: string): string;

export declare function MarkDownSafe(Argument: string, EOLReplacement?: string): string;

/**** Object_hasOwnProperty ****/
export declare function Object_hasOwnProperty(Value: Object, PropertyName: string): boolean;

/**** Object_isPrototypeOf ****/
export declare function Object_isPrototypeOf(Value: Object, Candidate: any): boolean;

/**** Object_propertyIsEnumerable ****/
export declare function Object_propertyIsEnumerable(Value: Object, PropertyName: string): boolean;

/**** Object_toLocaleString ****/
export declare function Object_toLocaleString(Value: Object): string;

/**** Object_toString ****/
export declare function Object_toString(Value: Object): string;

/**** Object_valueOf ****/
export declare function Object_valueOf(Value: Object): any;

/**** ObjectIsEmpty ****/
export declare function ObjectIsEmpty(Candidate: any): boolean;

/**** ObjectIsNotEmpty ****/
export declare function ObjectIsNotEmpty(Candidate: any): boolean;

/**** ObjectMergedWith ****/
export declare function ObjectMergedWith(TargetObject: object, ...otherObjectList: object[]): object;

export declare function quotable(Text: string, Quote?: QuoteCharacter): string;

export declare type QuoteCharacter = '"' | "'" | '`';

/**** quoted ****/
export declare function quoted(Text: string, Quote?: QuoteCharacter): string;

export declare const rejectNil = false;

/**** RGBAColor - converts a given color to RGBA(r,g,b,a) ****/
export declare function RGBAColor(Color: string): string;

export declare type serializableArray = serializableValue[];

export declare type serializableObject = {
    [Key: string]: serializableValue;
};

/**** serializable types ****/
export declare type serializableValue = null | boolean | number | string | serializableObject | serializableArray;

/**** shortHexColor - converts a given color into #RRGGBB ****/
export declare function shortHexColor(Color: string): string;

/**** StringIsEmpty ****/
export declare function StringIsEmpty(Candidate: string): boolean;

/**** StringIsNotEmpty ****/
export declare function StringIsNotEmpty(Candidate: string): boolean;

/**** throwError - simplifies construction of named errors ****/
export declare function throwError(Message: string): never;

/**** ValueIsTypedArray ****/
export declare type TypedArray = Int8Array | Uint8Array | Uint8ClampedArray | Int16Array | Uint16Array | Int32Array | Uint32Array | Float32Array | Float64Array | BigInt64Array | BigUint64Array;

export declare function unescaped(Text: string): string;

/**** validatedArgument ****/
export declare function validatedArgument(Description: string, Argument: any, ValueIsValid: (Value: any) => boolean, NilIsAcceptable: boolean, Expectation: string): any | null | undefined;

/**** ValidatorForClassifier ****/
export declare function ValidatorForClassifier<T>(Classifier: (Value: any) => boolean, NilIsAcceptable: true, Expectation: string): (Description: string, Argument: any) => T | null | undefined;

export declare function ValidatorForClassifier<T>(Classifier: (Value: any) => boolean, NilIsAcceptable: false, Expectation: string): (Description: string, Argument: any) => T;

/**** ValueExists ****/
export declare function ValueExists(Value: unknown): boolean;

/**** ValueInheritsFrom ****/
export declare function ValueInheritsFrom(Value: unknown, Prototype: object): boolean;

/**** ValueIsAnonymousFunction ****/
export declare function ValueIsAnonymousFunction(Value: unknown): Value is Function;

/**** ValueIsArray ****/
export declare const ValueIsArray: (arg: any) => arg is any[];

/**** ValueIsArrayBuffer ****/
export declare function ValueIsArrayBuffer(Value: unknown): Value is ArrayBuffer;

export declare function ValueIsBase64(Value: unknown): Value is string;

/**** ValueIsBigInt ****/
export declare function ValueIsBigInt(Value: unknown): Value is bigint;

/**** ValueIsBoolean ****/
export declare function ValueIsBoolean(Value: unknown): Value is boolean;

/**** ValueIsCardinal ****/
export declare function ValueIsCardinal(Value: unknown): Value is number;

/**** ValueIsColor ****/
export declare function ValueIsColor(Value: unknown): Value is string;

/**** ValueIsDate ****/
export declare function ValueIsDate(Value: unknown): Value is Date;

export declare function ValueIsE164PhoneNumber(Value: unknown): Value is string;

export declare function ValueIsEMailAddress(Value: unknown): Value is string;

export declare function ValueIsEmptyString(Value: unknown): Value is string;

/**** ValueIsError ****/
export declare function ValueIsError(Value: unknown): Value is Error;

/**** ValueIsFiniteNumber (pure "isFinite" breaks on objects) ****/
export declare function ValueIsFiniteNumber(Value: unknown): Value is number;

/**** ValueIsFunction ****/
export declare function ValueIsFunction(Value: unknown): Value is Function;

export declare function ValueIsHexString(Value: unknown): Value is string;

export declare function ValueIsHostName(Value: unknown): Value is string;

export declare function ValueIsIdentifier(Value: unknown): Value is string;

/**** ValueIsInstanceOf ****/
export declare function ValueIsInstanceOf<T>(Value: unknown, Constructor: abstract new (...ArgumentList: any[]) => T): Value is T;

/**** ValueIsInteger ****/
export declare function ValueIsInteger(Value: unknown): Value is number;

/**** ValueIsIntegerInRange ****/
export declare function ValueIsIntegerInRange(Value: unknown, minValue?: number, maxValue?: number): Value is number;

export declare function ValueIsIPv4Address(Value: unknown): Value is string;

export declare function ValueIsIPv6Address(Value: unknown): Value is string;

export declare function ValueIsISODate(Value: unknown): Value is string;

export declare function ValueIsISOTimestamp(Value: unknown): Value is string;

/**** ValueIsJSONString ****/
export declare function ValueIsJSONString(Value: unknown): Value is string;

/**** ValueIsList ("dense" array) ****/
export declare function ValueIsList(Value: unknown, minLength?: number, maxLength?: number): Value is any[];

/**** ValueIsListOf ****/
export declare function ValueIsListOf(Value: any, ValueList: any[]): boolean;

/**** ValueIsListSatisfying ****/
export declare function ValueIsListSatisfying(Value: unknown, Validator: (Value: any) => boolean, minLength?: number, maxLength?: number): Value is any[];

/**** ValueIsMap ****/
export declare function ValueIsMap(Value: unknown): Value is Map<any, any>;

/**** ValueIsMissing ****/
export declare function ValueIsMissing(Value: unknown): Value is null | undefined;

/**** ValueIsNamedFunction ****/
export declare function ValueIsNamedFunction(Value: unknown): Value is Function;

/**** ValueIsNaN (numeric, but NaN - this differs from pure "isNaN") ****/
export declare function ValueIsNaN(Value: unknown): Value is number;

export declare function ValueIsNativeFunction(Value: unknown): Value is Function;

export declare function ValueIsNonEmptyString(Value: unknown): Value is string;

/**** ValueIsNumber ****/
export declare function ValueIsNumber(Value: unknown): Value is number;

/**** ValueIsNumberInRange ****/
export declare function ValueIsNumberInRange(Value: unknown, minValue?: number, maxValue?: number, withMin?: boolean, withMax?: boolean): Value is number;

/**** ValueIsObject ****/
export declare function ValueIsObject(Value: unknown): Value is object;

/**** ValueIsOneOf ****/
export declare function ValueIsOneOf<T>(Value: unknown, ValueList: T[]): Value is T;

/**** ValueIsOrdinal ****/
export declare function ValueIsOrdinal(Value: unknown): Value is number;

export declare function ValueIsPhoneNumber(Value: unknown): Value is string;

/**** ValueIsPlainObject ****/
export declare function ValueIsPlainObject(Value: unknown): Value is object;

/**** ValueIsPortNumber ****/
export declare function ValueIsPortNumber(Value: unknown): Value is number;

/**** ValueIsPromise ****/
export declare function ValueIsPromise(Value: unknown): Value is Promise<any>;

/**** ValueIsRegExp ****/
export declare function ValueIsRegExp(Value: unknown): Value is RegExp;

/**** ValueIsScriptedFunction ****/
export declare function ValueIsScriptedFunction(Value: unknown): Value is Function;

/**** ValueIsSerializableObject ****/
export declare function ValueIsSerializableObject(Value: any): boolean;

/**** ValueIsSerializableValue ****/
export declare function ValueIsSerializableValue(Value: any, visitedObjects?: WeakSet<object>): boolean;

/**** ValueIsSet ****/
export declare function ValueIsSet(Value: unknown): Value is Set<any>;

/**** ValueIsString ****/
export declare function ValueIsString(Value: unknown): Value is string;

/**** ValueIsStringMatching ****/
export declare function ValueIsStringMatching(Value: unknown, Pattern: RegExp): Value is string;

/**** ValueIsSymbol ****/
export declare function ValueIsSymbol(Value: unknown): Value is symbol;

export declare function ValueIsText(Value: unknown): Value is string;

export declare function ValueIsTextline(Value: unknown): Value is string;

export declare function ValueIsTypedArray(Value: unknown): Value is TypedArray;

export declare function ValueIsURL(Value: unknown): Value is string;

export declare function ValueIsUUID(Value: unknown): Value is string;

/**** ValueIsVanillaObject ****/
export declare function ValueIsVanillaObject(Value: unknown): Value is object;

/**** ValuesAreEqual ****/
export declare function ValuesAreEqual(thisValue: any, otherValue: any, ModeOrOptions?: ValuesDifferMode | ValuesDifferOptions): boolean;

export declare function ValuesDiffer(thisValue: any, otherValue: any, ModeOrOptions?: ValuesDifferMode | ValuesDifferOptions, visitedPairs?: WeakMap<object, WeakSet<object>>): boolean;

/**** ValuesDiffer ****/
export declare type ValuesDifferMode = 'by-value' | 'by-reference';

export declare interface ValuesDifferOptions {
    Mode?: ValuesDifferMode;
    Tolerance?: number;
}

export { }
