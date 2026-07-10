/*******************************************************************************
*                                                                              *
*                      JavaScript Interface Library (JIL)                      *
*                                                                              *
*******************************************************************************/
/**** get a reference to the "global" object ****/
export const global = globalThis;
//------------------------------------------------------------------------------
//--                             Object Functions                             --
//------------------------------------------------------------------------------
// allow methods from Object.prototype to be applied to "vanilla" objects
/**** Object_hasOwnProperty ****/
export function Object_hasOwnProperty(Value, PropertyName) {
    return ((Value == null) || // let this method crash like its original
        ('hasOwnProperty' in Value) && (typeof Value.hasOwnProperty === 'function')
        ? Value.hasOwnProperty(PropertyName)
        : Object.prototype.hasOwnProperty.call(Value, PropertyName));
}
/**** Object_isPrototypeOf ****/
export function Object_isPrototypeOf(Value, Candidate) {
    return ((Value == null) || // let this method crash like its original
        ('isPrototypeOf' in Value) && (typeof Value.isPrototypeOf === 'function')
        ? Value.isPrototypeOf(Candidate)
        : Object.prototype.isPrototypeOf.call(Value, Candidate));
}
/**** Object_propertyIsEnumerable ****/
export function Object_propertyIsEnumerable(Value, PropertyName) {
    return ((Value == null) || // let this method crash like its original
        ('propertyIsEnumerable' in Value) && (typeof Value.propertyIsEnumerable === 'function')
        ? Value.propertyIsEnumerable(PropertyName)
        : Object.prototype.propertyIsEnumerable.call(Value, PropertyName));
}
/**** Object_toString ****/
export function Object_toString(Value) {
    return ((Value == null) || // let this method crash like its original
        ('toString' in Value) && (typeof Value.toString === 'function')
        ? Value.toString()
        : Object.prototype.toString.call(Value));
}
/**** Object_toLocaleString ****/
export function Object_toLocaleString(Value) {
    return ((Value == null) || // let this method crash like its original
        ('toLocaleString' in Value) && (typeof Value.toLocaleString === 'function')
        ? Value.toLocaleString()
        : Object_toString(Value) // "toLocaleString" delegates to "toString", too
    );
}
/**** Object_valueOf ****/
export function Object_valueOf(Value) {
    return ((Value == null) || // let this method crash like its original
        ('valueOf' in Value) && (typeof Value.valueOf === 'function')
        ? Value.valueOf()
        : Object.prototype.valueOf.call(Value));
}
/**** ObjectMergedWith ****/
export function ObjectMergedWith(TargetObject, ...otherObjectList) {
    for (let i = 0, l = otherObjectList.length; i < l; i++) {
        let otherObject = otherObjectList[i];
        if (otherObject == null) {
            continue;
        }
        if (typeof otherObject === 'object') {
            const DescriptorSet = Object.getOwnPropertyDescriptors(otherObject);
            for (const Key of Reflect.ownKeys(DescriptorSet)) {
                const Descriptor = DescriptorSet[Key]; // incl. symbol keys
                if (Descriptor.enumerable) {
                    Object.defineProperty(TargetObject, Key, Descriptor);
                }
            }
        }
        else {
            throwError('InvalidArgument: argument #' + (i + 1) + ' is not an object');
        }
    }
    return TargetObject;
}
/**** throwError - simplifies construction of named errors ****/
export function throwError(Message) {
    let Match = /^([$a-zA-Z][$a-zA-Z0-9]*):\s*(\S.+)\s*$/.exec(Message);
    if (Match == null) {
        throw new Error(Message);
    }
    else {
        let namedError = new Error(Match[2]);
        namedError.name = Match[1];
        throw namedError;
    }
}
//------------------------------------------------------------------------------
//--                      Value Classification Functions                      --
//------------------------------------------------------------------------------
/**** ValueExists ****/
export function ValueExists(Value) {
    return (Value != null);
}
/**** ValueIsMissing ****/
export function ValueIsMissing(Value) {
    return (Value == null);
}
/**** ValueIsBoolean ****/
export function ValueIsBoolean(Value) {
    return (typeof Value === 'boolean') || (Value instanceof Boolean);
}
/**** ValueIsNumber ****/
export function ValueIsNumber(Value) {
    return (typeof Value === 'number') || (Value instanceof Number);
}
/**** ValueIsFiniteNumber (pure "isFinite" breaks on objects) ****/
export function ValueIsFiniteNumber(Value) {
    return ((typeof Value === 'number') || (Value instanceof Number)) && isFinite(Value.valueOf());
}
/**** ValueIsNaN (numeric, but NaN - this differs from pure "isNaN") ****/
export function ValueIsNaN(Value) {
    return ((typeof Value === 'number') || (Value instanceof Number)) && isNaN(Value.valueOf());
}
/**** ValueIsNumberInRange ****/
export function ValueIsNumberInRange(Value, minValue, maxValue, withMin = true, withMax = true) {
    if (!ValueIsNumber(Value)) {
        return false;
    }
    const numValue = Value.valueOf(); // unboxes boxed numbers
    if (isNaN(numValue)) {
        return false;
    }
    if (ValueIsFiniteNumber(minValue)) { // more robust than "isFinite" alone
        if (ValueIsFiniteNumber(maxValue)) { // more robust than "isFinite" alone
            if ((numValue < minValue) || (!withMin && (numValue === minValue)) ||
                (numValue > maxValue) || (!withMax && (numValue === maxValue))) {
                return false;
            }
        }
        else {
            if ((numValue < minValue) || (!withMin && (numValue === minValue))) {
                return false;
            }
        }
    }
    else {
        if (ValueIsFiniteNumber(maxValue)) { // more robust than "isFinite" alone
            if ((numValue > maxValue) || (!withMax && (numValue === maxValue))) {
                return false;
            }
        }
    }
    return true;
}
/**** ValueIsInteger ****/
export function ValueIsInteger(Value) {
    if ((typeof Value !== 'number') && !(Value instanceof Number)) {
        return false;
    }
    const numValue = Value.valueOf();
    return isFinite(numValue) && (Math.round(numValue) === numValue);
}
/**** ValueIsIntegerInRange ****/
export function ValueIsIntegerInRange(Value, minValue, maxValue) {
    if (!ValueIsInteger(Value) || isNaN(Value)) {
        return false;
    }
    if (ValueIsFiniteNumber(minValue)) { // more robust than "isFinite" alone
        if (ValueIsFiniteNumber(maxValue)) { // more robust than "isFinite" alone
            if ((Value < minValue) || (Value > maxValue)) {
                return false;
            }
        }
        else {
            if (Value < minValue) {
                return false;
            }
        }
    }
    else {
        if (ValueIsFiniteNumber(maxValue)) { // more robust than "isFinite" alone
            if (Value > maxValue) {
                return false;
            }
        }
    }
    return true;
}
/**** ValueIsOrdinal ****/
export function ValueIsOrdinal(Value) {
    if ((typeof Value !== 'number') && !(Value instanceof Number)) {
        return false;
    }
    const numValue = Value.valueOf();
    return isFinite(numValue) && (Math.round(numValue) === numValue) && (numValue >= 0);
}
/**** ValueIsCardinal ****/
export function ValueIsCardinal(Value) {
    if ((typeof Value !== 'number') && !(Value instanceof Number)) {
        return false;
    }
    const numValue = Value.valueOf();
    return isFinite(numValue) && (Math.round(numValue) === numValue) && (numValue >= 1);
}
/**** ValueIsString ****/
export function ValueIsString(Value) {
    return (typeof Value === 'string') || (Value instanceof String);
}
/**** ValueIs[Non]EmptyString ****/
const emptyStringPattern = /^\s*$/;
export function ValueIsEmptyString(Value) {
    return ((typeof Value === 'string') || (Value instanceof String)) && emptyStringPattern.test(Value.valueOf());
}
export function ValueIsNonEmptyString(Value) {
    return ((typeof Value === 'string') || (Value instanceof String)) && !emptyStringPattern.test(Value.valueOf());
}
/**** ValueIsStringMatching ****/
export function ValueIsStringMatching(Value, Pattern) {
    return ((typeof Value === 'string') || (Value instanceof String)) && Pattern.test(Value.valueOf());
}
/**** ValueIsText ****/
const noCtrlCharsButCRLFPattern = /^[^\x00-\x09\x0B\x0C\x0E-\x1F\x7F-\x9F\u2028\u2029\uFFF9-\uFFFB]*$/;
export function ValueIsText(Value) {
    return ValueIsStringMatching(Value, noCtrlCharsButCRLFPattern);
}
/**** ValueIsTextline ****/
const noCtrlCharsPattern = /^[^\x00-\x1F\x7F-\x9F\u2028\u2029\uFFF9-\uFFFB]*$/;
export function ValueIsTextline(Value) {
    return ValueIsStringMatching(Value, noCtrlCharsPattern);
}
/**** ValueIsFunction ****/
export function ValueIsFunction(Value) {
    return (typeof Value === 'function');
}
/**** ValueIsAnonymousFunction ****/
export function ValueIsAnonymousFunction(Value) {
    return ((typeof Value === 'function') &&
        ((Value.name == null) || (Value.name === '')));
}
/**** ValueIsNamedFunction ****/
export function ValueIsNamedFunction(Value) {
    return ((typeof Value === 'function') &&
        (Value.name != null) && (Value.name !== ''));
}
/**** ValueIsNativeFunction ****/
const NativeFunctionPattern = /^function\s*[^(]*\(\)\s*\{\s*\[native code\]\s*\}\s*$/;
export function ValueIsNativeFunction(Value) {
    return ((typeof Value === 'function') &&
        NativeFunctionPattern.test(Value.toString()) &&
        !Value.name.startsWith('bound ') // "bound" functions aren't truly native
    );
}
/**** ValueIsScriptedFunction ****/
export function ValueIsScriptedFunction(Value) {
    return (typeof Value === 'function') && !ValueIsNativeFunction(Value);
}
/**** ValueIsObject ****/
export function ValueIsObject(Value) {
    return (Value != null) && (typeof Value === 'object');
}
/**** ValueIsPlainObject ****/
export function ValueIsPlainObject(Value) {
    return ((Value != null) && (typeof Value === 'object') &&
        (Object.getPrototypeOf(Value) === Object.prototype));
}
/**** ValueIsVanillaObject ****/
export function ValueIsVanillaObject(Value) {
    return ((Value != null) && (typeof Value === 'object') &&
        !(Value instanceof Object));
}
/**** ValueIsArray ****/
export const ValueIsArray = Array.isArray;
/**** ValueIsList ("dense" array) ****/
export function ValueIsList(Value, minLength, maxLength) {
    if (ValueIsArray(Value)) {
        for (let i = 0, l = Value.length; i < l; i++) {
            if (Value[i] === undefined) {
                return false;
            }
        }
        if (minLength != null) {
            if (Value.length < minLength) {
                return false;
            }
        }
        if (maxLength != null) {
            if (Value.length > maxLength) {
                return false;
            }
        }
        return true;
    }
    return false;
}
/**** ValueIsListSatisfying ****/
export function ValueIsListSatisfying(Value, Validator, minLength, maxLength) {
    if (ValueIsArray(Value)) {
        try {
            for (let i = 0, l = Value.length; i < l; i++) {
                if (!Validator(Value[i])) {
                    return false;
                }
            }
            if (minLength != null) {
                if (Value.length < minLength) {
                    return false;
                }
            }
            if (maxLength != null) {
                if (Value.length > maxLength) {
                    return false;
                }
            }
            return true;
        }
        catch (Signal) { /* a throwing validator marks the list invalid */ }
    }
    return false;
}
/**** ValueIsInstanceOf ****/
export function ValueIsInstanceOf(Value, Constructor) {
    return (Value instanceof Constructor);
}
/**** ValueInheritsFrom ****/
export function ValueInheritsFrom(Value, Prototype) {
    return Object_isPrototypeOf(Prototype, Value);
}
/**** ValueIsDate ****/
export function ValueIsDate(Value) {
    return (Value instanceof Date);
}
/**** ValueIsError ****/
export function ValueIsError(Value) {
    return (Value instanceof Error);
}
/**** ValueIsPromise ****/
export function ValueIsPromise(Value) {
    return (Value != null) && (typeof Value.then === 'function');
}
// see https://stackoverflow.com/questions/27746304/how-do-i-tell-if-an-object-is-a-promise
/**** ValueIsRegExp ****/
export function ValueIsRegExp(Value) {
    return (Value instanceof RegExp);
}
/**** ValueIsOneOf ****/
export function ValueIsOneOf(Value, ValueList) {
    return (ValueList.indexOf(Value) >= 0);
} // no automatic unboxing of boxed values and vice-versa!
/**** ValueIsColor ****/
export function ValueIsColor(Value) {
    if (!ValueIsString(Value)) {
        return false;
    }
    let lowerValue = Value.valueOf().toLowerCase(); // ColorSet keys are l.c.
    return (ColorSet.hasOwnProperty(lowerValue) ||
        /^#[a-fA-F0-9]{6}$/.test(lowerValue) ||
        /^#[a-fA-F0-9]{8}$/.test(lowerValue) ||
        /^rgb\([0-9]+,\s*[0-9]+,\s*[0-9]+\)$/.test(lowerValue) || // not perfect
        /^rgba\([0-9]+,\s*[0-9]+,\s*[0-9]+,\s*([01]|[01]?[.][0-9]+)\)$/.test(lowerValue) // dto.
    );
}
/**** ValueIsEMailAddress ****/
const EMailAddressPattern = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/i;
// see https://stackoverflow.com/questions/201323/how-to-validate-an-email-address-using-a-regular-expression
export function ValueIsEMailAddress(Value) {
    return ValueIsStringMatching(Value, EMailAddressPattern);
}
/**** ValueIsURL ****/
const noCtrlCharsOrWhitespacePattern = /^[^\s\x00-\x1F\x7F-\x9F\u2028\u2029\uFFF9-\uFFFB]*$/;
export function ValueIsURL(Value) {
    if (!ValueIsStringMatching(Value, noCtrlCharsOrWhitespacePattern) ||
        (Value === '')) {
        return false;
    }
    try {
        new URL(Value, 'file://');
        return true;
    }
    catch (Signal) {
        return false;
    }
}
/**** ValueIsPhoneNumber ****/
// plausibility check only - neither prefixes nor lengths are actually verified!
const PhoneNumberPattern = /^\+?[0-9(][0-9 \-.\/()]*[0-9)]$/; // not perfect
export function ValueIsPhoneNumber(Value) {
    if (!ValueIsString(Value)) {
        return false;
    }
    let Candidate = Value.valueOf();
    if (!PhoneNumberPattern.test(Candidate)) {
        return false;
    }
    let Digits = Candidate.replace(/[^0-9]/g, '');
    return (Candidate.charAt(0) === '+'
        ? /^[1-9][0-9]{6,14}$/.test(Digits) // E.164: 7-15 digits, no leading zero
        : (Digits.length >= 3) && (Digits.length <= 16));
}
/**** ValueIsE164PhoneNumber (canonical machine-readable format) ****/
const E164PhoneNumberPattern = /^\+[1-9][0-9]{6,14}$/;
export function ValueIsE164PhoneNumber(Value) {
    return ValueIsStringMatching(Value, E164PhoneNumberPattern);
}
/**** ValueIsBigInt ****/
export function ValueIsBigInt(Value) {
    return (typeof Value === 'bigint');
}
/**** ValueIsSymbol ****/
export function ValueIsSymbol(Value) {
    return (typeof Value === 'symbol');
}
/**** ValueIsMap ****/
export function ValueIsMap(Value) {
    return (Value instanceof Map);
}
/**** ValueIsSet ****/
export function ValueIsSet(Value) {
    return (Value instanceof Set);
}
export function ValueIsTypedArray(Value) {
    return ArrayBuffer.isView(Value) && !(Value instanceof DataView);
}
/**** ValueIsArrayBuffer ****/
export function ValueIsArrayBuffer(Value) {
    return (Value instanceof ArrayBuffer);
}
/**** ValueIsUUID ****/
const UUIDPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
export function ValueIsUUID(Value) {
    return ValueIsStringMatching(Value, UUIDPattern);
}
/**** ValueIsISODate (a calendar date like "2026-07-03") ****/
const ISODatePattern = /^([0-9]{4})-([0-9]{2})-([0-9]{2})$/;
export function ValueIsISODate(Value) {
    if (!ValueIsString(Value)) {
        return false;
    }
    const Match = ISODatePattern.exec(Value.valueOf());
    if (Match == null) {
        return false;
    }
    const [Year, Month, Day] = [Match[1], Match[2], Match[3]].map(Number);
    const Timestamp = new Date(Date.UTC(Year, Month - 1, Day));
    return ( // detects overflows like 02-31
    (Timestamp.getUTCFullYear() === Year) &&
        (Timestamp.getUTCMonth() === Month - 1) && (Timestamp.getUTCDate() === Day));
}
/**** ValueIsISOTimestamp (like "2026-07-03T10:56:00Z") ****/
const ISOTimestampPattern = new RegExp('^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}' +
    '(:[0-9]{2}([.][0-9]+)?)?(Z|[+-][0-9]{2}:[0-9]{2})?$');
export function ValueIsISOTimestamp(Value) {
    return (ValueIsStringMatching(Value, ISOTimestampPattern) &&
        !isNaN(Date.parse(Value.valueOf())));
}
/**** ValueIsIPv4Address ****/
const IPv4AddressPattern = new RegExp('^((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])[.]){3}' +
    '(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])$');
export function ValueIsIPv4Address(Value) {
    return ValueIsStringMatching(Value, IPv4AddressPattern);
}
/**** ValueIsIPv6Address ****/
const IPv6CharSetPattern = /^[0-9a-fA-F:.]+$/;
export function ValueIsIPv6Address(Value) {
    if (!ValueIsString(Value) || !IPv6CharSetPattern.test(Value.valueOf())) {
        return false;
    }
    try { // URL parsing implements the full IPv6 grammar
        new URL('http://[' + Value.valueOf() + ']/');
        return true;
    }
    catch (Signal) {
        return false;
    }
}
/**** ValueIsHostName (according to RFC 1123) ****/
const HostNamePattern = new RegExp('^(?=.{1,253}$)' +
    '[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?' +
    '([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$', 'i');
export function ValueIsHostName(Value) {
    return ValueIsStringMatching(Value, HostNamePattern);
}
/**** ValueIsPortNumber ****/
export function ValueIsPortNumber(Value) {
    return ValueIsIntegerInRange(Value, 1, 65535);
}
/**** ValueIsJSONString ****/
export function ValueIsJSONString(Value) {
    if (!ValueIsString(Value)) {
        return false;
    }
    try {
        JSON.parse(Value.valueOf());
        return true;
    }
    catch (Signal) {
        return false;
    }
}
/**** ValueIsBase64 (standard alphabet, correctly padded) ****/
const Base64Pattern = new RegExp('^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$');
export function ValueIsBase64(Value) {
    return ValueIsStringMatching(Value, Base64Pattern);
}
/**** ValueIsHexString ****/
const HexStringPattern = /^[0-9a-fA-F]+$/;
export function ValueIsHexString(Value) {
    return ValueIsStringMatching(Value, HexStringPattern);
}
/**** ValueIsIdentifier ****/
const IdentifierPattern = /^[\p{ID_Start}_$][\p{ID_Continue}_$\u200C\u200D]*$/u;
export function ValueIsIdentifier(Value) {
    return ValueIsStringMatching(Value, IdentifierPattern);
}
//------------------------------------------------------------------------------
//--                      Argument Validation Functions                       --
//------------------------------------------------------------------------------
export const rejectNil = false;
export const acceptNil = true;
/**** validatedArgument ****/
export function validatedArgument(Description, Argument, ValueIsValid, NilIsAcceptable, Expectation) {
    if (Argument == null) {
        if (NilIsAcceptable) {
            return Argument;
        }
        else {
            throwError(`MissingArgument: no ${escaped(Description)} given`);
        }
    }
    else {
        if (ValueIsValid(Argument)) {
            switch (true) {
                case Argument instanceof Boolean:
                case Argument instanceof Number:
                case Argument instanceof String:
                    return Argument.valueOf(); // unboxes any primitives
                default:
                    return Argument;
            }
        }
        else {
            throwError(`InvalidArgument: the given ${escaped(Description)} is no valid ${escaped(Expectation)}`);
        }
    }
}
export function ValidatorForClassifier(Classifier, NilIsAcceptable, Expectation) {
    let Validator = function (Description, Argument) {
        return validatedArgument(Description, Argument, Classifier, NilIsAcceptable, Expectation);
    };
    let ClassifierName = Classifier.name;
    if ((ClassifierName != null) && /^ValueIs/.test(ClassifierName)) {
        let ValidatorName = ClassifierName.replace(// derive name from validator
        /^ValueIs/, NilIsAcceptable ? 'allow' : 'expect');
        return FunctionWithName(Validator, ValidatorName);
    }
    else {
        return Validator; // without any specific name
    }
}
/**** FunctionWithName ****/
export function FunctionWithName(originalFunction, desiredName) {
    if (originalFunction == null) {
        throwError('MissingArgument: no function given');
    }
    if (typeof originalFunction !== 'function') {
        throwError('InvalidArgument: the given 1st Argument is not a JavaScript function');
    }
    if (desiredName == null) {
        throwError('MissingArgument: no desired name given');
    }
    if ((typeof desiredName !== 'string') && !(desiredName instanceof String)) {
        throwError('InvalidArgument: the given desired name is not a string');
    }
    if (originalFunction.name === desiredName) {
        return originalFunction;
    }
    Object.defineProperty(originalFunction, 'name', {
        value: desiredName.valueOf()
    });
    return originalFunction;
}
/**** expect[ed]Value ****/
export function expectValue(Description, Argument) {
    if (Argument == null) {
        throwError(`MissingArgument: no ${escaped(Description)} given`);
    }
    else {
        switch (true) { // unboxes primitives - but nothing else, as
            case Argument instanceof Boolean: // "valueOf" may return other values
            case Argument instanceof Number: // for other objects (e.g. Dates)
            case Argument instanceof String:
                return Argument.valueOf();
            default:
                return Argument;
        }
    }
}
export const expectedValue = expectValue;
/**** allow/expect[ed]Boolean ****/
export const allowBoolean = /*#__PURE__*/ ValidatorForClassifier(ValueIsBoolean, acceptNil, 'boolean value'), allowedBoolean = allowBoolean;
export const expectBoolean = /*#__PURE__*/ ValidatorForClassifier(ValueIsBoolean, rejectNil, 'boolean value'), expectedBoolean = expectBoolean;
/**** allow/expect[ed]Number ****/
export const allowNumber = /*#__PURE__*/ ValidatorForClassifier(ValueIsNumber, acceptNil, 'numeric value'), allowedNumber = allowNumber;
export const expectNumber = /*#__PURE__*/ ValidatorForClassifier(ValueIsNumber, rejectNil, 'numeric value'), expectedNumber = expectNumber;
/**** allow/expect[ed]FiniteNumber ****/
export const allowFiniteNumber = /*#__PURE__*/ ValidatorForClassifier(ValueIsFiniteNumber, acceptNil, 'finite numeric value'), allowedFiniteNumber = allowFiniteNumber;
export const expectFiniteNumber = /*#__PURE__*/ ValidatorForClassifier(ValueIsFiniteNumber, rejectNil, 'finite numeric value'), expectedFiniteNumber = expectFiniteNumber;
/**** allow/expect[ed]NaN ****/
export const allowNaN = /*#__PURE__*/ ValidatorForClassifier(ValueIsNaN, acceptNil, 'NaN value'), allowedNaN = allowNaN;
export const expectNaN = /*#__PURE__*/ ValidatorForClassifier(ValueIsNaN, rejectNil, 'NaN value'), expectedNaN = expectNaN;
/**** allow[ed]NumberInRange ****/
export function allowNumberInRange(Description, Argument, minValue, maxValue, withMin, withMax) {
    return (Argument == null
        ? Argument
        : expectedNumberInRange(Description, Argument, minValue, maxValue, withMin, withMax));
}
export const allowedNumberInRange = allowNumberInRange;
/**** expect[ed]NumberInRange ****/
export function expectNumberInRange(Description, Argument, minValue, maxValue, withMin, withMax) {
    expectNumber(Description, Argument);
    if (isNaN(Argument)) {
        throwError(`InvalidArgument: the given ${escaped(Description)} is not-a-number`);
    }
    if (withMin == null) {
        withMin = true;
    }
    if (withMax == null) {
        withMax = true;
    }
    if ((minValue != null) && isFinite(minValue)) {
        if ((maxValue != null) && isFinite(maxValue)) {
            if ((Argument < minValue) || (!withMin && (Argument === minValue)) ||
                (Argument > maxValue) || (!withMax && (Argument === maxValue))) {
                throw new RangeError(`the given ${escaped(Description)} (${Argument}) is outside ` +
                    `the allowed range (${minValue}...${maxValue})`);
            }
        }
        else {
            if ((Argument < minValue) || (!withMin && (Argument === minValue))) {
                throw new RangeError(`the given ${escaped(Description)} is below the allowed ` +
                    `minimum (${Argument} ${withMin ? '<' : '<='} ${minValue})`);
            }
        }
    }
    else {
        if ((maxValue != null) && isFinite(maxValue)) {
            if ((Argument > maxValue) || (!withMax && (Argument === maxValue))) {
                throw new RangeError(`the given ${escaped(Description)} exceeds the allowed ` +
                    `maximum (${Argument} ${withMax ? '>' : '>='} ${maxValue})`);
            }
        }
    }
    return Argument.valueOf();
}
export const expectedNumberInRange = expectNumberInRange;
/**** allow/expect[ed]Integer ****/
export const allowInteger = /*#__PURE__*/ ValidatorForClassifier(ValueIsInteger, acceptNil, 'integral numeric value'), allowedInteger = allowInteger;
export const expectInteger = /*#__PURE__*/ ValidatorForClassifier(ValueIsInteger, rejectNil, 'integral numeric value'), expectedInteger = expectInteger;
/**** allow[ed]IntegerInRange ****/
export function allowIntegerInRange(Description, Argument, minValue, maxValue) {
    return (Argument == null
        ? Argument
        : expectedIntegerInRange(Description, Argument, minValue, maxValue));
}
export const allowedIntegerInRange = allowIntegerInRange;
/**** expect[ed]IntegerInRange ****/
export function expectIntegerInRange(Description, Argument, minValue, maxValue) {
    expectInteger(Description, Argument);
    if (isNaN(Argument)) {
        throwError(`InvalidArgument: the given ${escaped(Description)} is not-a-number`);
    }
    if ((minValue != null) && isFinite(minValue)) {
        if ((maxValue != null) && isFinite(maxValue)) {
            if ((Argument < minValue) || (Argument > maxValue)) {
                throw new RangeError(`the given ${escaped(Description)} (${Argument}) is outside ` +
                    `the allowed range (${minValue}...${maxValue})`);
            }
        }
        else {
            if (Argument < minValue) {
                throw new RangeError(`the given ${escaped(Description)} is below the allowed ` +
                    `minimum (${Argument} < ${minValue})`);
            }
        }
    }
    else {
        if ((maxValue != null) && isFinite(maxValue)) {
            if (Argument > maxValue) {
                throw new RangeError(`the given ${escaped(Description)} exceeds the allowed ` +
                    `maximum (${Argument} > ${maxValue})`);
            }
        }
    }
    return Argument.valueOf();
}
export const expectedIntegerInRange = expectIntegerInRange;
/**** allow/expect[ed]Ordinal ****/
export const allowOrdinal = /*#__PURE__*/ ValidatorForClassifier(ValueIsOrdinal, acceptNil, 'ordinal number'), allowedOrdinal = allowOrdinal;
export const expectOrdinal = /*#__PURE__*/ ValidatorForClassifier(ValueIsOrdinal, rejectNil, 'ordinal number'), expectedOrdinal = expectOrdinal;
/**** allow/expect[ed]Cardinal ****/
export const allowCardinal = /*#__PURE__*/ ValidatorForClassifier(ValueIsCardinal, acceptNil, 'cardinal number'), allowedCardinal = allowCardinal;
export const expectCardinal = /*#__PURE__*/ ValidatorForClassifier(ValueIsCardinal, rejectNil, 'cardinal number'), expectedCardinal = expectCardinal;
/**** allow/expect[ed]String ****/
export const allowString = /*#__PURE__*/ ValidatorForClassifier(ValueIsString, acceptNil, 'literal string'), allowedString = allowString;
export const expectString = /*#__PURE__*/ ValidatorForClassifier(ValueIsString, rejectNil, 'literal string'), expectedString = expectString;
/**** allow/expect[ed]NonEmptyString ****/
export const allowNonEmptyString = /*#__PURE__*/ ValidatorForClassifier(ValueIsNonEmptyString, acceptNil, 'non-empty literal string'), allowedNonEmptyString = allowNonEmptyString;
export const expectNonEmptyString = /*#__PURE__*/ ValidatorForClassifier(ValueIsNonEmptyString, rejectNil, 'non-empty literal string'), expectedNonEmptyString = expectNonEmptyString;
/**** allow[ed]StringMatching ****/
export function allowStringMatching(Description, Argument, Pattern) {
    return (Argument == null
        ? Argument
        : expectedStringMatching(Description, Argument, Pattern));
}
export const allowedStringMatching = allowStringMatching;
/**** expect[ed]StringMatching ****/
export function expectStringMatching(Description, Argument, Pattern) {
    expectString(Description, Argument);
    if (Pattern.test(Argument)) {
        return Argument.valueOf();
    }
    else {
        throwError(`InvalidArgument: the given ${escaped(Description)} does not match the specified pattern`);
    }
}
export const expectedStringMatching = expectStringMatching;
/**** allow/expect[ed]Text ****/
export const allowText = /*#__PURE__*/ ValidatorForClassifier(ValueIsText, acceptNil, 'literal text'), allowedText = allowText;
export const expectText = /*#__PURE__*/ ValidatorForClassifier(ValueIsText, rejectNil, 'literal text'), expectedText = expectText;
/**** allow/expect[ed]Textline ****/
export const allowTextline = /*#__PURE__*/ ValidatorForClassifier(ValueIsTextline, acceptNil, 'single line of text'), allowedTextline = allowTextline;
export const expectTextline = /*#__PURE__*/ ValidatorForClassifier(ValueIsTextline, rejectNil, 'single line of text'), expectedTextline = expectTextline;
/**** allow/expect[ed]Function ****/
export const allowFunction = /*#__PURE__*/ ValidatorForClassifier(ValueIsFunction, acceptNil, 'JavaScript function'), allowedFunction = allowFunction;
export const expectFunction = /*#__PURE__*/ ValidatorForClassifier(ValueIsFunction, rejectNil, 'JavaScript function'), expectedFunction = expectFunction;
/**** allow/expect[ed]AnonymousFunction ****/
export const allowAnonymousFunction = /*#__PURE__*/ ValidatorForClassifier(ValueIsAnonymousFunction, acceptNil, 'anonymous JavaScript function'), allowedAnonymousFunction = allowAnonymousFunction;
export const expectAnonymousFunction = /*#__PURE__*/ ValidatorForClassifier(ValueIsAnonymousFunction, rejectNil, 'anonymous JavaScript function'), expectedAnonymousFunction = expectAnonymousFunction;
/**** allow/expect[ed]NamedFunction ****/
export const allowNamedFunction = /*#__PURE__*/ ValidatorForClassifier(ValueIsNamedFunction, acceptNil, 'named JavaScript function'), allowedNamedFunction = allowNamedFunction;
export const expectNamedFunction = /*#__PURE__*/ ValidatorForClassifier(ValueIsNamedFunction, rejectNil, 'named JavaScript function'), expectedNamedFunction = expectNamedFunction;
/**** allow/expect[ed]NativeFunction ****/
export const allowNativeFunction = /*#__PURE__*/ ValidatorForClassifier(ValueIsNativeFunction, acceptNil, 'native JavaScript function'), allowedNativeFunction = allowNativeFunction;
export const expectNativeFunction = /*#__PURE__*/ ValidatorForClassifier(ValueIsNativeFunction, rejectNil, 'native JavaScript function'), expectedNativeFunction = expectNativeFunction;
/**** allow/expect[ed]ScriptedFunction ****/
export const allowScriptedFunction = /*#__PURE__*/ ValidatorForClassifier(ValueIsScriptedFunction, acceptNil, 'scripted JavaScript function'), allowedScriptedFunction = allowScriptedFunction;
export const expectScriptedFunction = /*#__PURE__*/ ValidatorForClassifier(ValueIsScriptedFunction, rejectNil, 'scripted JavaScript function'), expectedScriptedFunction = expectScriptedFunction;
/**** allow/expect[ed]Object ****/
export const allowObject = /*#__PURE__*/ ValidatorForClassifier(ValueIsObject, acceptNil, 'JavaScript object'), allowedObject = allowObject;
export const expectObject = /*#__PURE__*/ ValidatorForClassifier(ValueIsObject, rejectNil, 'JavaScript object'), expectedObject = expectObject;
/**** allow/expect[ed]PlainObject ****/
export const allowPlainObject = /*#__PURE__*/ ValidatorForClassifier(ValueIsPlainObject, acceptNil, '"plain" JavaScript object'), allowedPlainObject = allowPlainObject;
export const expectPlainObject = /*#__PURE__*/ ValidatorForClassifier(ValueIsPlainObject, rejectNil, '"plain" JavaScript object'), expectedPlainObject = expectPlainObject;
/**** allow/expect[ed]VanillaObject ****/
export const allowVanillaObject = /*#__PURE__*/ ValidatorForClassifier(ValueIsVanillaObject, acceptNil, '"vanilla" JavaScript object'), allowedVanillaObject = allowVanillaObject;
export const expectVanillaObject = /*#__PURE__*/ ValidatorForClassifier(ValueIsVanillaObject, rejectNil, '"vanilla" JavaScript object'), expectedVanillaObject = expectVanillaObject;
/**** allow[ed]Array ****/
export function allowArray(Description, Argument) {
    return (Argument == null
        ? Argument
        : expectedArray(Description, Argument));
}
export const allowedArray = allowArray;
/**** expect[ed]Array ****/
export function expectArray(Description, Argument) {
    if (Argument == null) {
        throwError(`MissingArgument: no ${escaped(Description)} given`);
    }
    if (ValueIsArray(Argument)) {
        return Argument;
    }
    else {
        throwError(`InvalidArgument: the given ${escaped(Description)} is no JavaScript array`);
    }
}
export const expectedArray = expectArray;
/**** allow[ed]List ****/
export function allowList(Description, Argument, Expectation, minLength, maxLength) {
    return (Argument == null
        ? Argument
        : expectedList(Description, Argument, Expectation, minLength, maxLength));
}
export const allowedList = allowList;
/**** expect[ed]List ****/
export function expectList(Description, Argument, Expectation, minLength, maxLength) {
    if (Argument == null) {
        throwError(`MissingArgument: no ${escaped(Description)} given`);
    }
    if (ValueIsList(Argument, minLength, maxLength)) {
        return Argument;
    }
    else {
        throwError(`InvalidArgument: the given ${escaped(Description)} is ` + (Expectation == null
            ? 'either not a list or contains an invalid number of elements'
            : 'no ' + escaped(Expectation)));
    }
}
export const expectedList = expectList;
/**** allow[ed]ListSatisfying ****/
export function allowListSatisfying(Description, Argument, Validator, Expectation, minLength, maxLength) {
    return (Argument == null
        ? Argument
        : expectedListSatisfying(Description, Argument, Validator, Expectation, minLength, maxLength));
}
export const allowedListSatisfying = allowListSatisfying;
/**** expect[ed]ListSatisfying ****/
export function expectListSatisfying(Description, Argument, Validator, Expectation, minLength, maxLength) {
    if (Argument == null) {
        throwError(`MissingArgument: no ${escaped(Description)} given`);
    }
    if (ValueIsListSatisfying(Argument, Validator, minLength, maxLength)) {
        return Argument;
    }
    else {
        throwError(`InvalidArgument: the given ${escaped(Description)} is ` + (Expectation == null
            ? 'either not a list or contains invalid elements'
            : 'no ' + escaped(Expectation)));
    }
}
export const expectedListSatisfying = expectListSatisfying;
/**** allow[ed]InstanceOf ****/
export function allowInstanceOf(Description, Argument, constructor, Expectation) {
    return (Argument == null
        ? Argument
        : expectedInstanceOf(Description, Argument, constructor, Expectation));
}
export const allowedInstanceOf = allowInstanceOf;
/**** expect[ed]InstanceOf ****/
export function expectInstanceOf(Description, Argument, constructor, Expectation) {
    if (Argument == null) {
        throwError(`MissingArgument: no ${escaped(Description)} given`);
    }
    if (!(Argument instanceof constructor)) {
        throwError(`InvalidArgument: the given ${escaped(Description)} is no ${escaped(Expectation)}`);
    }
    return Argument;
}
export const expectedInstanceOf = expectInstanceOf;
/**** allow[ed]ValueInheritingFrom ****/
export function allowValueInheritingFrom(Description, Argument, prototype, Expectation) {
    return (Argument == null
        ? Argument
        : expectedValueInheritingFrom(Description, Argument, prototype, Expectation));
}
export const allowedValueInheritingFrom = allowValueInheritingFrom;
/**** expect[ed]ValueInheritingFrom ****/
export function expectValueInheritingFrom(Description, Argument, prototype, Expectation) {
    if (Argument == null) {
        throwError(`MissingArgument: no ${escaped(Description)} given`);
    }
    if (prototype.isPrototypeOf(Argument)) {
        return Argument;
    }
    else {
        throwError(`InvalidArgument: the given ${escaped(Description)} is no ${escaped(Expectation)}`);
    }
}
export const expectedValueInheritingFrom = expectValueInheritingFrom;
/**** allow/expect[ed]Date ****/
export const allowDate = /*#__PURE__*/ ValidatorForClassifier(ValueIsDate, acceptNil, 'JavaScript Date object'), allowedDate = allowDate;
export const expectDate = /*#__PURE__*/ ValidatorForClassifier(ValueIsDate, rejectNil, 'JavaScript Date object'), expectedDate = expectDate;
/**** allow/expect[ed]Error ****/
export const allowError = /*#__PURE__*/ ValidatorForClassifier(ValueIsError, acceptNil, 'JavaScript Error object'), allowedError = allowError;
export const expectError = /*#__PURE__*/ ValidatorForClassifier(ValueIsError, rejectNil, 'JavaScript Error object'), expectedError = expectError;
/**** allow/expect[ed]Promise ****/
export const allowPromise = /*#__PURE__*/ ValidatorForClassifier(ValueIsPromise, acceptNil, 'JavaScript Promise (or "Thenable") object'), allowedPromise = allowPromise;
export const expectPromise = /*#__PURE__*/ ValidatorForClassifier(ValueIsPromise, rejectNil, 'JavaScript Promise (or "Thenable") object'), expectedPromise = expectPromise;
/**** allow/expect[ed]RegExp ****/
export const allowRegExp = /*#__PURE__*/ ValidatorForClassifier(ValueIsRegExp, acceptNil, 'JavaScript RegExp object'), allowedRegExp = allowRegExp;
export const expectRegExp = /*#__PURE__*/ ValidatorForClassifier(ValueIsRegExp, rejectNil, 'JavaScript RegExp object'), expectedRegExp = expectRegExp;
/**** allow[ed]OneOf ****/
export function allowOneOf(Description, Argument, ValueList) {
    return (Argument == null
        ? Argument
        : expectedOneOf(Description, Argument, ValueList));
}
export const allowedOneOf = allowOneOf;
/**** expect[ed]OneOf ****/
export function expectOneOf(Description, Argument, ValueList) {
    if (Argument == null) {
        throwError(`MissingArgument: no ${escaped(Description)} given`);
    }
    if (ValueIsOneOf(Argument, ValueList)) {
        switch (true) { // unboxes primitives - but nothing else, as
            case Argument instanceof Boolean: // "valueOf" may return other values
            case Argument instanceof Number: // for other objects (e.g. Dates)
            case Argument instanceof String:
                return Argument.valueOf();
            default:
                return Argument;
        }
    }
    else {
        throwError(`InvalidArgument: the given ${escaped(Description)} is not among the supported values`);
    }
}
export const expectedOneOf = expectOneOf;
/**** allow/expect[ed]Color ****/
export const allowColor = /*#__PURE__*/ ValidatorForClassifier(ValueIsColor, acceptNil, 'CSS color specification'), allowedColor = allowColor;
export const expectColor = /*#__PURE__*/ ValidatorForClassifier(ValueIsColor, rejectNil, 'CSS color specification'), expectedColor = expectColor;
/**** allow/expect[ed]EMailAddress ****/
export const allowEMailAddress = /*#__PURE__*/ ValidatorForClassifier(ValueIsEMailAddress, acceptNil, 'EMail address'), allowedEMailAddress = allowEMailAddress;
export const expectEMailAddress = /*#__PURE__*/ ValidatorForClassifier(ValueIsEMailAddress, rejectNil, 'EMail address'), expectedEMailAddress = expectEMailAddress;
/**** allow/expect[ed]URL ****/
export const allowURL = /*#__PURE__*/ ValidatorForClassifier(ValueIsURL, acceptNil, 'URL'), allowedURL = allowURL;
export const expectURL = /*#__PURE__*/ ValidatorForClassifier(ValueIsURL, rejectNil, 'URL'), expectedURL = expectURL;
/**** allow/expect[ed]PhoneNumber ****/
export const allowPhoneNumber = /*#__PURE__*/ ValidatorForClassifier(ValueIsPhoneNumber, acceptNil, 'phone number'), allowedPhoneNumber = allowPhoneNumber;
export const expectPhoneNumber = /*#__PURE__*/ ValidatorForClassifier(ValueIsPhoneNumber, rejectNil, 'phone number'), expectedPhoneNumber = expectPhoneNumber;
/**** allow/expect[ed]E164PhoneNumber ****/
export const allowE164PhoneNumber = /*#__PURE__*/ ValidatorForClassifier(ValueIsE164PhoneNumber, acceptNil, 'phone number in E.164 format'), allowedE164PhoneNumber = allowE164PhoneNumber;
export const expectE164PhoneNumber = /*#__PURE__*/ ValidatorForClassifier(ValueIsE164PhoneNumber, rejectNil, 'phone number in E.164 format'), expectedE164PhoneNumber = expectE164PhoneNumber;
/**** allow/expect[ed]BigInt ****/
export const allowBigInt = /*#__PURE__*/ ValidatorForClassifier(ValueIsBigInt, acceptNil, 'BigInt value'), allowedBigInt = allowBigInt;
export const expectBigInt = /*#__PURE__*/ ValidatorForClassifier(ValueIsBigInt, rejectNil, 'BigInt value'), expectedBigInt = expectBigInt;
/**** allow/expect[ed]Symbol ****/
export const allowSymbol = /*#__PURE__*/ ValidatorForClassifier(ValueIsSymbol, acceptNil, 'symbol'), allowedSymbol = allowSymbol;
export const expectSymbol = /*#__PURE__*/ ValidatorForClassifier(ValueIsSymbol, rejectNil, 'symbol'), expectedSymbol = expectSymbol;
/**** allow/expect[ed]Map ****/
export const allowMap = /*#__PURE__*/ ValidatorForClassifier(ValueIsMap, acceptNil, 'JavaScript Map'), allowedMap = allowMap;
export const expectMap = /*#__PURE__*/ ValidatorForClassifier(ValueIsMap, rejectNil, 'JavaScript Map'), expectedMap = expectMap;
/**** allow/expect[ed]Set ****/
export const allowSet = /*#__PURE__*/ ValidatorForClassifier(ValueIsSet, acceptNil, 'JavaScript Set'), allowedSet = allowSet;
export const expectSet = /*#__PURE__*/ ValidatorForClassifier(ValueIsSet, rejectNil, 'JavaScript Set'), expectedSet = expectSet;
/**** allow/expect[ed]TypedArray ****/
export const allowTypedArray = /*#__PURE__*/ ValidatorForClassifier(ValueIsTypedArray, acceptNil, 'typed array'), allowedTypedArray = allowTypedArray;
export const expectTypedArray = /*#__PURE__*/ ValidatorForClassifier(ValueIsTypedArray, rejectNil, 'typed array'), expectedTypedArray = expectTypedArray;
/**** allow/expect[ed]ArrayBuffer ****/
export const allowArrayBuffer = /*#__PURE__*/ ValidatorForClassifier(ValueIsArrayBuffer, acceptNil, 'ArrayBuffer'), allowedArrayBuffer = allowArrayBuffer;
export const expectArrayBuffer = /*#__PURE__*/ ValidatorForClassifier(ValueIsArrayBuffer, rejectNil, 'ArrayBuffer'), expectedArrayBuffer = expectArrayBuffer;
/**** allow/expect[ed]UUID ****/
export const allowUUID = /*#__PURE__*/ ValidatorForClassifier(ValueIsUUID, acceptNil, 'UUID'), allowedUUID = allowUUID;
export const expectUUID = /*#__PURE__*/ ValidatorForClassifier(ValueIsUUID, rejectNil, 'UUID'), expectedUUID = expectUUID;
/**** allow/expect[ed]ISODate ****/
export const allowISODate = /*#__PURE__*/ ValidatorForClassifier(ValueIsISODate, acceptNil, 'ISO 8601 date'), allowedISODate = allowISODate;
export const expectISODate = /*#__PURE__*/ ValidatorForClassifier(ValueIsISODate, rejectNil, 'ISO 8601 date'), expectedISODate = expectISODate;
/**** allow/expect[ed]ISOTimestamp ****/
export const allowISOTimestamp = /*#__PURE__*/ ValidatorForClassifier(ValueIsISOTimestamp, acceptNil, 'ISO 8601 timestamp'), allowedISOTimestamp = allowISOTimestamp;
export const expectISOTimestamp = /*#__PURE__*/ ValidatorForClassifier(ValueIsISOTimestamp, rejectNil, 'ISO 8601 timestamp'), expectedISOTimestamp = expectISOTimestamp;
/**** allow/expect[ed]IPv4Address ****/
export const allowIPv4Address = /*#__PURE__*/ ValidatorForClassifier(ValueIsIPv4Address, acceptNil, 'IPv4 address'), allowedIPv4Address = allowIPv4Address;
export const expectIPv4Address = /*#__PURE__*/ ValidatorForClassifier(ValueIsIPv4Address, rejectNil, 'IPv4 address'), expectedIPv4Address = expectIPv4Address;
/**** allow/expect[ed]IPv6Address ****/
export const allowIPv6Address = /*#__PURE__*/ ValidatorForClassifier(ValueIsIPv6Address, acceptNil, 'IPv6 address'), allowedIPv6Address = allowIPv6Address;
export const expectIPv6Address = /*#__PURE__*/ ValidatorForClassifier(ValueIsIPv6Address, rejectNil, 'IPv6 address'), expectedIPv6Address = expectIPv6Address;
/**** allow/expect[ed]HostName ****/
export const allowHostName = /*#__PURE__*/ ValidatorForClassifier(ValueIsHostName, acceptNil, 'host name'), allowedHostName = allowHostName;
export const expectHostName = /*#__PURE__*/ ValidatorForClassifier(ValueIsHostName, rejectNil, 'host name'), expectedHostName = expectHostName;
/**** allow/expect[ed]PortNumber ****/
export const allowPortNumber = /*#__PURE__*/ ValidatorForClassifier(ValueIsPortNumber, acceptNil, 'port number'), allowedPortNumber = allowPortNumber;
export const expectPortNumber = /*#__PURE__*/ ValidatorForClassifier(ValueIsPortNumber, rejectNil, 'port number'), expectedPortNumber = expectPortNumber;
/**** allow/expect[ed]JSONString ****/
export const allowJSONString = /*#__PURE__*/ ValidatorForClassifier(ValueIsJSONString, acceptNil, 'JSON string'), allowedJSONString = allowJSONString;
export const expectJSONString = /*#__PURE__*/ ValidatorForClassifier(ValueIsJSONString, rejectNil, 'JSON string'), expectedJSONString = expectJSONString;
/**** allow/expect[ed]Base64 ****/
export const allowBase64 = /*#__PURE__*/ ValidatorForClassifier(ValueIsBase64, acceptNil, 'Base64-encoded string'), allowedBase64 = allowBase64;
export const expectBase64 = /*#__PURE__*/ ValidatorForClassifier(ValueIsBase64, rejectNil, 'Base64-encoded string'), expectedBase64 = expectBase64;
/**** allow/expect[ed]HexString ****/
export const allowHexString = /*#__PURE__*/ ValidatorForClassifier(ValueIsHexString, acceptNil, 'hexadecimal string'), allowedHexString = allowHexString;
export const expectHexString = /*#__PURE__*/ ValidatorForClassifier(ValueIsHexString, rejectNil, 'hexadecimal string'), expectedHexString = expectHexString;
/**** allow/expect[ed]Identifier ****/
export const allowIdentifier = /*#__PURE__*/ ValidatorForClassifier(ValueIsIdentifier, acceptNil, 'JavaScript identifier'), allowedIdentifier = allowIdentifier;
export const expectIdentifier = /*#__PURE__*/ ValidatorForClassifier(ValueIsIdentifier, rejectNil, 'JavaScript identifier'), expectedIdentifier = expectIdentifier;
/**** escaped - escapes all control characters in a given string ****/
const EscSequenceScanPattern = /\\x[0-9a-fA-F]{2}|\\u[0-9a-fA-F]{4}|\\u\{[0-9a-fA-F]+\}|\\[0bfnrtv'"\\\/]?/g;
const CtrlCharCodePattern = /[\x00-\x1f\x7f-\x9f]/g;
export function escaped(Text) {
    return Text
        .replace(EscSequenceScanPattern, (Match) => (Match === '\\' ? '\\\\' : Match))
        .replace(CtrlCharCodePattern, (Match) => {
        switch (Match) {
            case '\0': return '\\0';
            case '\b': return '\\b';
            case '\f': return '\\f';
            case '\n': return '\\n';
            case '\r': return '\\r';
            case '\t': return '\\t';
            case '\v': return '\\v';
            default: {
                const HexCode = Match.charCodeAt(0).toString(16);
                return '\\x' + '00'.slice(HexCode.length) + HexCode;
            }
        }
    });
}
/**** unescaped - evaluates all escape sequences in a given string ****/
const EscSequenceEvalPattern = /\\[0bfnrtv'"\\\/]|\\x[0-9a-fA-F]{2}|\\u[0-9a-fA-F]{4}|\\u\{[0-9a-fA-F]+\}/g;
export function unescaped(Text) {
    return Text
        .replace(EscSequenceEvalPattern, (Match) => {
        switch (Match) {
            case '\\0': return '\0';
            case '\\b': return '\b';
            case '\\f': return '\f';
            case '\\n': return '\n';
            case '\\r': return '\r';
            case '\\t': return '\t';
            case '\\v': return '\v';
            case "\\'": return "'";
            case '\\"': return '"';
            case '\\\\': return '\\';
            default: {
                const CodePoint = (Match.charAt(2) === '{'
                    ? parseInt(Match.slice(3, -1), 16) // handles "\u{...}" escapes
                    : parseInt(Match.slice(2), 16) // handles "\xNN" and "\uNNNN"
                );
                return (CodePoint <= 0x10FFFF ? String.fromCodePoint(CodePoint) : Match); // leaves invalid code point escapes untouched
            }
        }
    });
}
/**** quotable - makes a given string ready to be put in quotes ****/
const EscSeqOrSglQuotePattern = /\\x[0-9a-fA-F]{2}|\\u[0-9a-fA-F]{4}|\\u\{[0-9a-fA-F]+\}|\\[0bfnrtv'"\\\/]?|'/g;
const EscSeqOrDblQuotePattern = /\\x[0-9a-fA-F]{2}|\\u[0-9a-fA-F]{4}|\\u\{[0-9a-fA-F]+\}|\\[0bfnrtv'"\\\/]?|"/g;
const EscSeqOrBackQuotePattern = /\\x[0-9a-fA-F]{2}|\\u[0-9a-fA-F]{4}|\\u\{[0-9a-fA-F]+\}|\\[0bfnrtv'"\\\/]?|`|\$\{/g;
export function quotable(Text, Quote = '"') {
    const QuotePattern = (Quote === "'"
        ? EscSeqOrSglQuotePattern
        : (Quote === '`' ? EscSeqOrBackQuotePattern : EscSeqOrDblQuotePattern));
    return Text
        .replace(QuotePattern, (Match) => {
        switch (Match) {
            case "'": return "\\'";
            case '"': return '\\"';
            case '`': return '\\`';
            case '${': return '\\${';
            case '\\': return '\\\\';
            default: return Match;
        }
    })
        .replace(CtrlCharCodePattern, (Match) => {
        switch (Match) {
            case '\0': return '\\0';
            case '\b': return '\\b';
            case '\f': return '\\f';
            case '\n': return '\\n';
            case '\r': return '\\r';
            case '\t': return '\\t';
            case '\v': return '\\v';
            default: {
                const HexCode = Match.charCodeAt(0).toString(16);
                return '\\x' + '00'.slice(HexCode.length) + HexCode;
            }
        }
    });
}
/**** quoted ****/
export function quoted(Text, Quote = '"') {
    return Quote + quotable(Text, Quote) + Quote;
}
/**** HTMLsafe ****/
// warning: any "EOLReplacement" is inserted as given - it must be trusted HTML!
const HTMLSpecialsPattern = /[&<>"'\x00-\x1F\x7F-\x9F\\]/g;
export function HTMLsafe(Argument, EOLReplacement) {
    EOLReplacement = (EOLReplacement || '').trim() || '<br/>';
    return Argument.replace(HTMLSpecialsPattern, (Match) => {
        switch (Match) {
            case '&': return '&amp;';
            case '<': return '&lt;';
            case '>': return '&gt;';
            case '"': return '&quot;';
            case "'": return '&apos;';
            case '\b': return '&#92;b';
            case '\f': return '&#92;f';
            case '\n': return EOLReplacement;
            case '\r': return '&#92;r';
            case '\t': return '&#92;t';
            case '\v': return '&#92;v';
            case '\\': return '&#92;';
            default: {
                const Result = Match.charCodeAt(0).toString(16);
                return '&#x0000'.substring(0, 7 - Result.length) + Result + ';';
            }
        }
    });
}
/**** MarkDownSafe ****/
// warning: any "EOLReplacement" is inserted as given - it must be trusted HTML
// and must not contain any MarkDown-relevant characters!
const MarkDownSpecialsPattern = /[:`*_\[\]#|~]/g;
export function MarkDownSafe(Argument, EOLReplacement) {
    return HTMLsafe(Argument, EOLReplacement).replace(MarkDownSpecialsPattern, (Match) => '&#' + Match.charCodeAt(0) + ';');
}
export function ValuesDiffer(thisValue, otherValue, ModeOrOptions, visitedPairs // for internal use only
) {
    if (thisValue === otherValue) {
        return false;
    }
    let Mode = undefined;
    let Tolerance = undefined;
    if ((ModeOrOptions != null) && (typeof ModeOrOptions === 'object')) {
        Mode = ModeOrOptions.Mode;
        Tolerance = ModeOrOptions.Tolerance;
    }
    else {
        Mode = ModeOrOptions;
    }
    let thisType = typeof thisValue;
    if (thisType !== typeof otherValue) {
        return true;
    }
    /**** ArraysDiffer ****/
    function ArraysDiffer(thisArray, otherArray, ModeOrOptions, visitedPairs) {
        if (!Array.isArray(otherArray)) {
            return true;
        }
        if (thisArray.length !== otherArray.length) {
            return true;
        }
        for (let i = 0, l = thisArray.length; i < l; i++) {
            if (ValuesDiffer(thisArray[i], otherArray[i], ModeOrOptions, visitedPairs)) {
                return true;
            }
        }
        return false;
    }
    /**** MapsDiffer - keys are matched by identity, values recursively ****/
    function MapsDiffer(thisMap, otherMap, ModeOrOptions, visitedPairs) {
        if (!(otherMap instanceof Map)) {
            return true;
        }
        if (thisMap.size !== otherMap.size) {
            return true;
        }
        let Difference = false;
        thisMap.forEach(function (Value, Key) {
            if (!Difference) {
                Difference = (!otherMap.has(Key) ||
                    ValuesDiffer(Value, otherMap.get(Key), ModeOrOptions, visitedPairs));
            }
        });
        return Difference;
    }
    /**** SetsDiffer - elements are matched by identity ****/
    function SetsDiffer(thisSet, otherSet) {
        if (!(otherSet instanceof Set)) {
            return true;
        }
        if (thisSet.size !== otherSet.size) {
            return true;
        }
        let Difference = false;
        thisSet.forEach(function (Value) {
            if (!Difference && !otherSet.has(Value)) {
                Difference = true;
            }
        });
        return Difference;
    }
    /**** TypedArraysDiffer - typed arrays are compared byte-wise ****/
    function TypedArraysDiffer(thisArray, otherArray) {
        if (Object.getPrototypeOf(thisArray) !== Object.getPrototypeOf(otherArray)) {
            return true;
        }
        if (thisArray.byteLength !== otherArray.byteLength) {
            return true;
        }
        let thisView = new Uint8Array(thisArray.buffer, thisArray.byteOffset, thisArray.byteLength);
        let otherView = new Uint8Array(otherArray.buffer, otherArray.byteOffset, otherArray.byteLength);
        for (let i = 0, l = thisView.length; i < l; i++) {
            if (thisView[i] !== otherView[i]) {
                return true;
            }
        }
        return false;
    }
    /**** ObjectsDiffer ****/
    function ObjectsDiffer(thisObject, otherObject, ModeOrOptions, visitedPairs) {
        if (Object.getPrototypeOf(thisObject) !== Object.getPrototypeOf(otherObject)) {
            return true;
        }
        for (let key in thisObject) {
            if (!(key in otherObject)) {
                return true;
            }
        }
        for (let key in otherObject) {
            if (!(key in thisObject)) {
                return true;
            }
            if (ValuesDiffer(thisObject[key], otherObject[key], ModeOrOptions, visitedPairs)) {
                return true;
            }
        }
        return false;
    }
    switch (thisType) {
        case 'undefined':
        case 'boolean':
        case 'string':
        case 'bigint':
        case 'symbol':
        case 'function': return true; // most primitives are compared using "==="
        case 'number': {
            if (isNaN(thisValue) !== isNaN(otherValue)) {
                return true;
            }
            if (Tolerance != null) { // explicit absolute tolerance
                return (Math.abs(thisValue - otherValue) > Tolerance);
            }
            const relTolerance = Number.EPSILON * Math.max(// default is relative!
            1, Math.abs(thisValue), Math.abs(otherValue));
            return (Math.abs(thisValue - otherValue) > relTolerance);
        }
        case 'object':
            if (thisValue == null) {
                return true;
            } // since "other_value" != null!
            if (otherValue == null) {
                return true;
            } // since "this_value" != null!
            if ( // boxed primitives are compared by their values
            (thisValue instanceof Boolean) ||
                (thisValue instanceof Number) ||
                (thisValue instanceof String)) {
                if (Mode === 'by-reference') {
                    return true;
                } // s.a. thisValue !== otherValue
                return ((Object.getPrototypeOf(thisValue) !== Object.getPrototypeOf(otherValue)) ||
                    (thisValue.valueOf() !== otherValue.valueOf()));
            }
            if (thisValue instanceof Date) { // Dates are compared by their times
                if (Mode === 'by-reference') {
                    return true;
                }
                if (!(otherValue instanceof Date)) {
                    return true;
                }
                let thisTime = thisValue.getTime(), otherTime = otherValue.getTime();
                return ((thisTime !== otherTime) && !(isNaN(thisTime) && isNaN(otherTime))); // two "invalid" Dates are considered equal
            }
            if (thisValue instanceof RegExp) { // RegExps: compare source + flags
                if (Mode === 'by-reference') {
                    return true;
                }
                return (!(otherValue instanceof RegExp) ||
                    (thisValue.source !== otherValue.source) ||
                    (thisValue.flags !== otherValue.flags));
            }
            /**** cycle detection - matching cycles are considered "equal" ****/
            if (visitedPairs == null) {
                visitedPairs = new WeakMap();
            }
            let visitedPartners = visitedPairs.get(thisValue);
            if (visitedPartners == null) {
                visitedPairs.set(thisValue, visitedPartners = new WeakSet());
            }
            if (visitedPartners.has(otherValue)) {
                return false;
            }
            visitedPartners.add(otherValue);
            if (Array.isArray(thisValue)) {
                return ArraysDiffer(thisValue, otherValue, ModeOrOptions, visitedPairs);
            }
            if (thisValue instanceof Map) {
                if (Mode === 'by-reference') {
                    return true;
                }
                return MapsDiffer(thisValue, otherValue, ModeOrOptions, visitedPairs);
            }
            if (thisValue instanceof Set) {
                if (Mode === 'by-reference') {
                    return true;
                }
                return SetsDiffer(thisValue, otherValue);
            }
            if (ArrayBuffer.isView(thisValue)) { // typed arrays incl. DataViews
                if (Mode === 'by-reference') {
                    return true;
                }
                return TypedArraysDiffer(thisValue, otherValue);
            }
            return (Mode === 'by-reference'
                ? true // because (thisValue !== otherValue)
                : ObjectsDiffer(thisValue, otherValue, ModeOrOptions, visitedPairs));
        default: return true; // unsupported property type
    }
}
/**** ValuesAreEqual ****/
export function ValuesAreEqual(thisValue, otherValue, ModeOrOptions) {
    return !ValuesDiffer(thisValue, otherValue, ModeOrOptions);
}
/**** ObjectIsEmpty ****/
export function ObjectIsEmpty(Candidate) {
    expectObject('candidate', Candidate);
    for (let Key in Candidate) {
        if (Object_hasOwnProperty(Candidate, Key)) {
            return false;
        }
    }
    return true;
}
/**** ObjectIsNotEmpty ****/
export function ObjectIsNotEmpty(Candidate) {
    return !ObjectIsEmpty(Candidate);
}
/**** StringIsEmpty ****/
export function StringIsEmpty(Candidate) {
    return /^\s*$/.test(Candidate);
}
/**** StringIsNotEmpty ****/
export function StringIsNotEmpty(Candidate) {
    return !StringIsEmpty(Candidate);
}
/**** constrained ****/
export function constrained(Value, Minimum = -Infinity, Maximum = Infinity) {
    return Math.max(Minimum, Math.min(Value, Maximum));
}
//------------------------------------------------------------------------------
//--                             Color Utilities                              --
//------------------------------------------------------------------------------
// built-in color names (see http://www.w3.org/TR/SVG/types.html#ColorKeywords) ----
export const ColorSet = /*#__PURE__*/ Object.freeze({
    transparent: 'rgba(0,0,0,0.0)',
    aliceblue: 'rgba(240,248,255,1.0)', lightpink: 'rgba(255,182,193,1.0)',
    antiquewhite: 'rgba(250,235,215,1.0)', lightsalmon: 'rgba(255,160,122,1.0)',
    aqua: 'rgba(0,255,255,1.0)', lightseagreen: 'rgba(32,178,170,1.0)',
    aquamarine: 'rgba(127,255,212,1.0)', lightskyblue: 'rgba(135,206,250,1.0)',
    azure: 'rgba(240,255,255,1.0)', lightslategray: 'rgba(119,136,153,1.0)',
    beige: 'rgba(245,245,220,1.0)', lightslategrey: 'rgba(119,136,153,1.0)',
    bisque: 'rgba(255,228,196,1.0)', lightsteelblue: 'rgba(176,196,222,1.0)',
    black: 'rgba(0,0,0,1.0)', lightyellow: 'rgba(255,255,224,1.0)',
    blanchedalmond: 'rgba(255,235,205,1.0)', lime: 'rgba(0,255,0,1.0)',
    blue: 'rgba(0,0,255,1.0)', limegreen: 'rgba(50,205,50,1.0)',
    blueviolet: 'rgba(138,43,226,1.0)', linen: 'rgba(250,240,230,1.0)',
    brown: 'rgba(165,42,42,1.0)', magenta: 'rgba(255,0,255,1.0)',
    burlywood: 'rgba(222,184,135,1.0)', maroon: 'rgba(128,0,0,1.0)',
    cadetblue: 'rgba(95,158,160,1.0)', mediumaquamarine: 'rgba(102,205,170,1.0)',
    chartreuse: 'rgba(127,255,0,1.0)', mediumblue: 'rgba(0,0,205,1.0)',
    chocolate: 'rgba(210,105,30,1.0)', mediumorchid: 'rgba(186,85,211,1.0)',
    coral: 'rgba(255,127,80,1.0)', mediumpurple: 'rgba(147,112,219,1.0)',
    cornflowerblue: 'rgba(100,149,237,1.0)', mediumseagreen: 'rgba(60,179,113,1.0)',
    cornsilk: 'rgba(255,248,220,1.0)', mediumslateblue: 'rgba(123,104,238,1.0)',
    crimson: 'rgba(220,20,60,1.0)', mediumspringgreen: 'rgba(0,250,154,1.0)',
    cyan: 'rgba(0,255,255,1.0)', mediumturquoise: 'rgba(72,209,204,1.0)',
    darkblue: 'rgba(0,0,139,1.0)', mediumvioletred: 'rgba(199,21,133,1.0)',
    darkcyan: 'rgba(0,139,139,1.0)', midnightblue: 'rgba(25,25,112,1.0)',
    darkgoldenrod: 'rgba(184,134,11,1.0)', mintcream: 'rgba(245,255,250,1.0)',
    darkgray: 'rgba(169,169,169,1.0)', mistyrose: 'rgba(255,228,225,1.0)',
    darkgreen: 'rgba(0,100,0,1.0)', moccasin: 'rgba(255,228,181,1.0)',
    darkgrey: 'rgba(169,169,169,1.0)', navajowhite: 'rgba(255,222,173,1.0)',
    darkkhaki: 'rgba(189,183,107,1.0)', navy: 'rgba(0,0,128,1.0)',
    darkmagenta: 'rgba(139,0,139,1.0)', oldlace: 'rgba(253,245,230,1.0)',
    darkolivegreen: 'rgba(85,107,47,1.0)', olive: 'rgba(128,128,0,1.0)',
    darkorange: 'rgba(255,140,0,1.0)', olivedrab: 'rgba(107,142,35,1.0)',
    darkorchid: 'rgba(153,50,204,1.0)', orange: 'rgba(255,165,0,1.0)',
    darkred: 'rgba(139,0,0,1.0)', orangered: 'rgba(255,69,0,1.0)',
    darksalmon: 'rgba(233,150,122,1.0)', orchid: 'rgba(218,112,214,1.0)',
    darkseagreen: 'rgba(143,188,143,1.0)', palegoldenrod: 'rgba(238,232,170,1.0)',
    darkslateblue: 'rgba(72,61,139,1.0)', palegreen: 'rgba(152,251,152,1.0)',
    darkslategray: 'rgba(47,79,79,1.0)', paleturquoise: 'rgba(175,238,238,1.0)',
    darkslategrey: 'rgba(47,79,79,1.0)', palevioletred: 'rgba(219,112,147,1.0)',
    darkturquoise: 'rgba(0,206,209,1.0)', papayawhip: 'rgba(255,239,213,1.0)',
    darkviolet: 'rgba(148,0,211,1.0)', peachpuff: 'rgba(255,218,185,1.0)',
    deeppink: 'rgba(255,20,147,1.0)', peru: 'rgba(205,133,63,1.0)',
    deepskyblue: 'rgba(0,191,255,1.0)', pink: 'rgba(255,192,203,1.0)',
    dimgray: 'rgba(105,105,105,1.0)', plum: 'rgba(221,160,221,1.0)',
    dimgrey: 'rgba(105,105,105,1.0)', powderblue: 'rgba(176,224,230,1.0)',
    dodgerblue: 'rgba(30,144,255,1.0)', purple: 'rgba(128,0,128,1.0)',
    firebrick: 'rgba(178,34,34,1.0)', red: 'rgba(255,0,0,1.0)',
    floralwhite: 'rgba(255,250,240,1.0)', rosybrown: 'rgba(188,143,143,1.0)',
    forestgreen: 'rgba(34,139,34,1.0)', royalblue: 'rgba(65,105,225,1.0)',
    fuchsia: 'rgba(255,0,255,1.0)', saddlebrown: 'rgba(139,69,19,1.0)',
    gainsboro: 'rgba(220,220,220,1.0)', salmon: 'rgba(250,128,114,1.0)',
    ghostwhite: 'rgba(248,248,255,1.0)', sandybrown: 'rgba(244,164,96,1.0)',
    gold: 'rgba(255,215,0,1.0)', seagreen: 'rgba(46,139,87,1.0)',
    goldenrod: 'rgba(218,165,32,1.0)', seashell: 'rgba(255,245,238,1.0)',
    gray: 'rgba(128,128,128,1.0)', sienna: 'rgba(160,82,45,1.0)',
    green: 'rgba(0,128,0,1.0)', silver: 'rgba(192,192,192,1.0)',
    greenyellow: 'rgba(173,255,47,1.0)', skyblue: 'rgba(135,206,235,1.0)',
    grey: 'rgba(128,128,128,1.0)', slateblue: 'rgba(106,90,205,1.0)',
    honeydew: 'rgba(240,255,240,1.0)', slategray: 'rgba(112,128,144,1.0)',
    hotpink: 'rgba(255,105,180,1.0)', slategrey: 'rgba(112,128,144,1.0)',
    indianred: 'rgba(205,92,92,1.0)', snow: 'rgba(255,250,250,1.0)',
    indigo: 'rgba(75,0,130,1.0)', springgreen: 'rgba(0,255,127,1.0)',
    ivory: 'rgba(255,255,240,1.0)', steelblue: 'rgba(70,130,180,1.0)',
    khaki: 'rgba(240,230,140,1.0)', tan: 'rgba(210,180,140,1.0)',
    lavender: 'rgba(230,230,250,1.0)', teal: 'rgba(0,128,128,1.0)',
    lavenderblush: 'rgba(255,240,245,1.0)', thistle: 'rgba(216,191,216,1.0)',
    lawngreen: 'rgba(124,252,0,1.0)', tomato: 'rgba(255,99,71,1.0)',
    lemonchiffon: 'rgba(255,250,205,1.0)', turquoise: 'rgba(64,224,208,1.0)',
    lightblue: 'rgba(173,216,230,1.0)', violet: 'rgba(238,130,238,1.0)',
    lightcoral: 'rgba(240,128,128,1.0)', wheat: 'rgba(245,222,179,1.0)',
    lightcyan: 'rgba(224,255,255,1.0)', white: 'rgba(255,255,255,1.0)',
    lightgoldenrodyellow: 'rgba(250,250,210,1.0)', whitesmoke: 'rgba(245,245,245,1.0)',
    lightgray: 'rgba(211,211,211,1.0)', yellow: 'rgba(255,255,0,1.0)',
    lightgreen: 'rgba(144,238,144,1.0)', yellowgreen: 'rgba(154,205,50,1.0)',
    lightgrey: 'rgba(211,211,211,1.0)',
});
/**** HexColor - converts a given color to #rrggbbaa ****/
export function HexColor(Color) {
    let lowerColor = Color.toLowerCase();
    if (ColorSet.hasOwnProperty(lowerColor)) {
        // @ts-ignore TS dislikes indexing with literal keys
        Color = ColorSet[lowerColor];
    } // do not return here as color is now in RGBA format
    if (/^#[a-fA-F0-9]{6}$/.test(Color)) {
        return Color + 'FF';
    }
    if (/^#[a-fA-F0-9]{8}$/.test(Color)) {
        return Color;
    }
    const HexDigit = '0123456789ABCDEF';
    function dec2hex(Value) {
        Value = Math.max(0, Math.min(255, Math.round(Value)));
        return HexDigit[Math.trunc(Value / 16)] + HexDigit[Value % 16];
    }
    const RGBPattern = /^rgb\(([0-9]+),\s*([0-9]+),\s*([0-9]+)\)$/i; // not perfect
    let Match = RGBPattern.exec(Color);
    if (Match != null) {
        return ('#' +
            dec2hex(parseInt(Match[1], 10)) +
            dec2hex(parseInt(Match[2], 10)) +
            dec2hex(parseInt(Match[3], 10)) + 'FF');
    }
    const RGBAPattern = /^rgba\(([0-9]+),\s*([0-9]+),\s*([0-9]+),\s*([01]?[.][0-9]+|[01])\)$/i; // not perfect
    Match = RGBAPattern.exec(Color);
    if (Match != null) {
        return ('#' +
            dec2hex(parseInt(Match[1], 10)) +
            dec2hex(parseInt(Match[2], 10)) +
            dec2hex(parseInt(Match[3], 10)) +
            dec2hex(parseFloat(Match[4]) * 255));
    }
    throwError('InvalidArgument: the given Value is not a valid CSS Color specification');
}
/**** RGBAColor - converts a given color to RGBA(r,g,b,a) ****/
export function RGBAColor(Color) {
    let lowerColor = Color.toLowerCase();
    if (ColorSet.hasOwnProperty(lowerColor)) {
        // @ts-ignore TS dislikes indexing with literal keys
        return ColorSet[lowerColor]; // color is already in RGBA format
    }
    if (/^#[a-fA-F0-9]{6}$/.test(Color)) {
        return ('rgba(' +
            parseInt(Color.slice(1, 3), 16) + ',' +
            parseInt(Color.slice(3, 5), 16) + ',' +
            parseInt(Color.slice(5, 7), 16) + ',1' +
            ')');
    }
    if (/^#[a-fA-F0-9]{8}$/.test(Color)) {
        return ('rgba(' +
            parseInt(Color.slice(1, 3), 16) + ',' +
            parseInt(Color.slice(3, 5), 16) + ',' +
            parseInt(Color.slice(5, 7), 16) + ',' +
            (parseInt(Color.slice(7), 16) / 255) +
            ')');
    }
    const RGBPattern = /^rgb\(([0-9]+),\s*([0-9]+),\s*([0-9]+)\)$/i; //not perfect
    let Match = RGBPattern.exec(Color);
    if (Match != null) {
        return Color.slice(0, Color.length - 1) + ',1)';
    }
    const RGBAPattern = /^rgba\(([0-9]+),\s*([0-9]+),\s*([0-9]+),\s*([01]?[.][0-9]+|[01])\)$/i; // not perfect
    Match = RGBAPattern.exec(Color);
    if (Match != null) {
        return Color;
    }
    throwError('InvalidArgument: the given Value is not a valid CSS Color specification');
}
/**** shortHexColor - converts a given color into #RRGGBB ****/
export function shortHexColor(Color) {
    return HexColor(Color).slice(0, 7);
}
