const Ur = globalThis;
function E(e) {
  return C(function(t, ...n) {
    return t == null || // let these methods crash like their originals
    e in t && typeof t[e] == "function" ? t[e](...n) : Object.prototype[e].apply(t, n);
  }, "Object_" + e);
}
const Xe = /* @__PURE__ */ E(
  "hasOwnProperty"
), Ve = /* @__PURE__ */ E(
  "isPrototypeOf"
), Br = /* @__PURE__ */ E(
  "propertyIsEnumerable"
), et = /* @__PURE__ */ E(
  "toString"
);
function Jr(e) {
  return e == null || // let this method crash like its original
  "toLocaleString" in e && typeof e.toLocaleString == "function" ? e.toLocaleString() : et(e);
}
const Tr = /* @__PURE__ */ E(
  "valueOf"
);
function Cr(e, ...t) {
  for (let n = 0, a = t.length; n < a; n++) {
    let l = t[n];
    if (l != null)
      if (typeof l == "object") {
        const c = Object.getOwnPropertyDescriptors(l);
        for (const p of Reflect.ownKeys(c)) {
          const I = c[p];
          I.enumerable && Object.defineProperty(e, p, I);
        }
      } else
        g("InvalidArgument: argument #" + (n + 1) + " is not an object");
  }
  return e;
}
function g(e) {
  let t = /^([$a-zA-Z][$a-zA-Z0-9]*):\s*(\S.+)\s*$/.exec(e);
  if (t == null)
    throw new Error(e);
  {
    let n = new Error(t[2]);
    throw n.name = t[1], n;
  }
}
function S(e) {
  g(`MissingArgument: no ${f(e)} given`);
}
function Mr(e) {
  return e != null;
}
function Dr(e) {
  return e == null;
}
function z(e) {
  return typeof e == "boolean" || e instanceof Boolean;
}
function O(e) {
  return typeof e == "number" || e instanceof Number;
}
function v(e) {
  return O(e) && isFinite(e.valueOf());
}
function Z(e) {
  return O(e) && isNaN(e.valueOf());
}
function qr(e, t, n, a = !0, l = !0) {
  if (!O(e))
    return !1;
  const c = e.valueOf();
  return isNaN(c) ? !1 : !// "ValueIsFiniteNumber" is more robust than "isFinite"
  (v(t) && (c < t || !a && c === t) || v(n) && (c > n || !l && c === n));
}
function F(e) {
  if (!O(e))
    return !1;
  const t = e.valueOf();
  return isFinite(t) && Math.round(t) === t;
}
function tt(e, t, n) {
  if (!F(e))
    return !1;
  const a = e.valueOf();
  return !// "ValueIsFiniteNumber" is more robust than "isFinite"
  (v(t) && a < t || v(n) && a > n);
}
function W(e) {
  return F(e) && e.valueOf() >= 0;
}
function G(e) {
  return F(e) && e.valueOf() >= 1;
}
function y(e) {
  return typeof e == "string" || e instanceof String;
}
const K = /^\s*$/;
function Hr(e) {
  return w(e, K);
}
function Q(e) {
  return y(e) && !K.test(e.valueOf());
}
function w(e, t) {
  return (typeof e == "string" || e instanceof String) && t.test(e.valueOf());
}
const nt = /^[^\x00-\x09\x0B\x0C\x0E-\x1F\x7F-\x9F\u2028\u2029\uFFF9-\uFFFB]*$/;
function Y(e) {
  return w(e, nt);
}
const rt = /^[^\x00-\x1F\x7F-\x9F\u2028\u2029\uFFF9-\uFFFB]*$/;
function X(e) {
  return w(e, rt);
}
function V(e) {
  return typeof e == "function";
}
function U(e) {
  return typeof e == "function" && (e.name ?? "") === "";
}
function ee(e) {
  return typeof e == "function" && !U(e);
}
const at = /^function\s*[^(]*\(\)\s*\{\s*\[native code\]\s*\}\s*$/;
function B(e) {
  return typeof e == "function" && at.test(e.toString()) && !e.name.startsWith("bound ");
}
function te(e) {
  return typeof e == "function" && !B(e);
}
function ne(e) {
  return e != null && typeof e == "object";
}
function L(e) {
  return e != null && typeof e == "object" && Object.getPrototypeOf(e) === Object.prototype;
}
function re(e) {
  return e != null && typeof e == "object" && !(e instanceof Object);
}
const ae = Array.isArray;
function oe(e, t, n) {
  return k(
    e,
    (a) => a !== void 0,
    t,
    n
  );
}
function k(e, t, n, a) {
  if (!ae(e))
    return !1;
  try {
    for (let l = 0, c = e.length; l < c; l++)
      if (!t(e[l]))
        return !1;
    return !(n != null && e.length < n || a != null && e.length > a);
  } catch {
    return !1;
  }
}
function ot(e, t) {
  return k(e, (n) => ue(n, t));
}
function _r(e, t) {
  return e instanceof t;
}
function Zr(e, t) {
  return Ve(t, e);
}
function ie(e) {
  return e instanceof Date;
}
function le(e) {
  return e instanceof Error;
}
function ce(e) {
  return e != null && typeof e.then == "function";
}
function se(e) {
  return e instanceof RegExp;
}
function ue(e, t) {
  return t.indexOf(e) >= 0;
}
function fe(e) {
  if (!y(e))
    return !1;
  let t = e.valueOf().toLowerCase();
  return P.hasOwnProperty(t) || M.test(t) || D.test(t) || q.test(t) || H.test(t);
}
const it = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/i;
function ge(e) {
  return w(e, it);
}
const lt = (
  // URL characters after RFC 3986
  /^[A-Za-z0-9\-._~:\/?#\[\]@!$&'()*+,;=%]+$/
), ct = /%(?![0-9A-Fa-f]{2})/;
function J(e) {
  if (!y(e))
    return !1;
  const t = e.valueOf();
  if (!lt.test(t) || // also rejects '' + whitespace
  ct.test(t))
    return !1;
  try {
    return new URL(t, "file://"), !0;
  } catch {
    return !1;
  }
}
function st(e) {
  return e.toLowerCase().replace(/:?$/, ":");
}
function ut(e, t) {
  if (!J(e))
    return !1;
  let n;
  try {
    n = new URL(e.valueOf());
  } catch {
    return !1;
  }
  return t == null ? !0 : t.some(
    // "parsedURL.protocol" already
    (a) => st(a) === n.protocol
  );
}
const ft = /^\+?[0-9(][0-9 \-.\/()]*[0-9)]$/;
function be(e) {
  if (!y(e))
    return !1;
  let t = e.valueOf();
  if (!ft.test(t))
    return !1;
  let n = t.replace(/[^0-9]/g, "");
  return t.charAt(0) === "+" ? /^[1-9][0-9]{6,14}$/.test(n) : n.length >= 3 && n.length <= 16;
}
const gt = /^\+[1-9][0-9]{6,14}$/;
function de(e) {
  return w(e, gt);
}
function pe(e) {
  return typeof e == "bigint";
}
function we(e) {
  return typeof e == "symbol";
}
function xe(e) {
  return e instanceof Map;
}
function Ie(e) {
  return e instanceof Set;
}
function Se(e) {
  return ArrayBuffer.isView(e) && !(e instanceof DataView);
}
function ye(e) {
  return e instanceof ArrayBuffer;
}
const bt = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
function me(e) {
  return w(e, bt);
}
const dt = /^([0-9]{4})-([0-9]{2})-([0-9]{2})$/;
function ve(e) {
  if (!y(e))
    return !1;
  const t = dt.exec(e.valueOf());
  if (t == null)
    return !1;
  const [n, a, l] = [t[1], t[2], t[3]].map(Number), c = new Date(Date.UTC(n, a - 1, l));
  return (
    // detects overflows like 02-31
    c.getUTCFullYear() === n && c.getUTCMonth() === a - 1 && c.getUTCDate() === l
  );
}
const pt = new RegExp(
  "^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}(:[0-9]{2}([.][0-9]+)?)?(Z|[+-][0-9]{2}:[0-9]{2})?$"
);
function Oe(e) {
  return w(e, pt) && !isNaN(Date.parse(e.valueOf()));
}
const wt = new RegExp(
  "^((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])[.]){3}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])$"
);
function he(e) {
  return w(e, wt);
}
const xt = /^[0-9a-fA-F:.]+$/;
function Ne(e) {
  if (!y(e) || !xt.test(e.valueOf()))
    return !1;
  try {
    return new URL("http://[" + e.valueOf() + "]/"), !0;
  } catch {
    return !1;
  }
}
const It = new RegExp(
  "^(?=.{1,253}$)[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$",
  "i"
);
function Pe(e) {
  return w(e, It);
}
function Ee(e) {
  return tt(e, 1, 65535);
}
function N(e, t = /* @__PURE__ */ new WeakSet()) {
  switch (!0) {
    case e == null:
    // deliberately also allows undefined
    case z(e):
    case v(e):
    // NaN/Infinity are not serializable
    case y(e):
      return !0;
    case oe(e):
      if (t.has(e))
        return !1;
      t.add(e);
      try {
        return k(
          e,
          (n) => n === void 0 ? !1 : N(n, t)
        );
      } finally {
        t.delete(e);
      }
    case L(e):
      if (t.has(e))
        return !1;
      t.add(e);
      try {
        for (let n in e)
          if (e.hasOwnProperty(n) && !N(e[n], t))
            return !1;
        return !0;
      } finally {
        t.delete(e);
      }
  }
  return !1;
}
function Fe(e) {
  return L(e) && N(e);
}
function $e(e) {
  if (!y(e))
    return !1;
  try {
    return JSON.parse(e.valueOf()), !0;
  } catch {
    return !1;
  }
}
const St = new RegExp(
  "^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$"
);
function Re(e) {
  return w(e, St);
}
const yt = /^[0-9a-fA-F]+$/;
function je(e) {
  return w(e, yt);
}
const mt = /^[\p{ID_Start}_$][\p{ID_Continue}_$\u200C\u200D]*$/u;
function Ae(e) {
  return w(e, mt);
}
const o = !1, i = !0;
function T(e) {
  return (
    // "valueOf" may return other values for
    e instanceof Boolean || // other objects (e.g. Dates)
    e instanceof Number || e instanceof String ? e.valueOf() : e
  );
}
function vt(e, t, n, a, l) {
  if (t == null) {
    if (a)
      return t;
    S(e);
  }
  if (n(t))
    return T(t);
  g(
    `InvalidArgument: the given ${f(e)} is no valid ${f(l)}`
  );
}
function r(e, t, n) {
  let a = function(c, p) {
    return vt(
      c,
      p,
      e,
      t,
      n
    );
  }, l = e.name;
  if (l != null && /^ValueIs/.test(l)) {
    let c = l.replace(
      // derive name from validator
      /^ValueIs/,
      t ? "allow" : "expect"
    );
    return C(a, c);
  } else
    return a;
}
function C(e, t) {
  return e == null && g("MissingArgument: no function given"), typeof e != "function" && g("InvalidArgument: the given 1st Argument is not a JavaScript function"), t == null && g("MissingArgument: no desired name given"), typeof t != "string" && !(t instanceof String) && g("InvalidArgument: the given desired name is not a string"), e.name === t || Object.defineProperty(e, "name", {
    value: t.valueOf()
  }), e;
}
function x(e, t) {
  return C(
    (n, a, ...l) => a == null ? a : e(n, a, ...l),
    t
  );
}
function Ot(e, t, n) {
  return t == null ? void 0 : Nt(e, t, n);
}
const Wr = Ot;
function ht(e, t, n) {
  t == null && S(e);
  const a = T(t);
  if (n == null || n(a) === !0)
    return a;
  g(`InvalidArgument: the given ${f(e)} is invalid`);
}
const Nt = ht, Pt = /* @__PURE__ */ r(
  z,
  i,
  "boolean value"
), Gr = Pt, Et = /* @__PURE__ */ r(
  z,
  o,
  "boolean value"
), Kr = Et, Ft = /* @__PURE__ */ r(
  O,
  i,
  "numeric value"
), Qr = Ft, Le = /* @__PURE__ */ r(
  O,
  o,
  "numeric value"
), Yr = Le, $t = /* @__PURE__ */ r(
  v,
  i,
  "finite numeric value"
), Xr = $t, Rt = /* @__PURE__ */ r(
  v,
  o,
  "finite numeric value"
), Vr = Rt, jt = /* @__PURE__ */ r(
  Z,
  i,
  "NaN value"
), ea = jt, At = /* @__PURE__ */ r(
  Z,
  o,
  "NaN value"
), ta = At, Lt = /* @__PURE__ */ x(
  ke,
  "allowNumberInRange"
), na = Lt;
function ke(e, t, n, a, l, c) {
  Le(e, t), isNaN(t) && g(
    `InvalidArgument: the given ${f(e)} is not-a-number`
  ), l ?? (l = !0), c ?? (c = !0);
  const p = n != null && isFinite(n), I = a != null && isFinite(a), R = p && (t < n || !l && t === n), j = I && (t > a || !c && t === a);
  switch (!0) {
    case (R && I || j && p):
      throw new RangeError(
        `the given ${f(e)} (${t}) is outside the allowed range (${n}...${a})`
      );
    case R:
      throw new RangeError(
        `the given ${f(e)} is below the allowed minimum (${t} ${l ? "<" : "<="} ${n})`
      );
    case j:
      throw new RangeError(
        `the given ${f(e)} exceeds the allowed maximum (${t} ${c ? ">" : ">="} ${a})`
      );
  }
  return t.valueOf();
}
const ra = ke, kt = /* @__PURE__ */ r(
  F,
  i,
  "integral numeric value"
), aa = kt, ze = /* @__PURE__ */ r(
  F,
  o,
  "integral numeric value"
), oa = ze, zt = /* @__PURE__ */ x(
  Ue,
  "allowIntegerInRange"
), ia = zt;
function Ue(e, t, n, a) {
  ze(e, t);
  const l = n != null && isFinite(n), c = a != null && isFinite(a), p = l && t < n, I = c && t > a;
  switch (!0) {
    case (p && c || I && l):
      throw new RangeError(
        `the given ${f(e)} (${t}) is outside the allowed range (${n}...${a})`
      );
    case p:
      throw new RangeError(
        `the given ${f(e)} is below the allowed minimum (${t} < ${n})`
      );
    case I:
      throw new RangeError(
        `the given ${f(e)} exceeds the allowed maximum (${t} > ${a})`
      );
  }
  return t.valueOf();
}
const la = Ue, Ut = /* @__PURE__ */ r(
  W,
  i,
  "ordinal number"
), ca = Ut, Bt = /* @__PURE__ */ r(
  W,
  o,
  "ordinal number"
), sa = Bt, Jt = /* @__PURE__ */ r(
  G,
  i,
  "cardinal number"
), ua = Jt, Tt = /* @__PURE__ */ r(
  G,
  o,
  "cardinal number"
), fa = Tt, Ct = /* @__PURE__ */ r(
  y,
  i,
  "literal string"
), ga = Ct, Be = /* @__PURE__ */ r(
  y,
  o,
  "literal string"
), ba = Be, Mt = /* @__PURE__ */ r(
  Q,
  i,
  "non-empty literal string"
), da = Mt, Dt = /* @__PURE__ */ r(
  Q,
  o,
  "non-empty literal string"
), pa = Dt, qt = /* @__PURE__ */ x(
  Je,
  "allowStringMatching"
), wa = qt;
function Je(e, t, n) {
  if (Be(e, t), n.test(t))
    return t.valueOf();
  g(
    `InvalidArgument: the given ${f(e)} does not match the specified pattern`
  );
}
const xa = Je, Ht = /* @__PURE__ */ r(
  Y,
  i,
  "literal text"
), Ia = Ht, _t = /* @__PURE__ */ r(
  Y,
  o,
  "literal text"
), Sa = _t, Zt = /* @__PURE__ */ r(
  X,
  i,
  "single line of text"
), ya = Zt, Wt = /* @__PURE__ */ r(
  X,
  o,
  "single line of text"
), ma = Wt, Gt = /* @__PURE__ */ r(
  V,
  i,
  "JavaScript function"
), va = Gt, Kt = /* @__PURE__ */ r(
  V,
  o,
  "JavaScript function"
), Oa = Kt, Qt = /* @__PURE__ */ r(
  U,
  i,
  "anonymous JavaScript function"
), ha = Qt, Yt = /* @__PURE__ */ r(
  U,
  o,
  "anonymous JavaScript function"
), Na = Yt, Xt = /* @__PURE__ */ r(
  ee,
  i,
  "named JavaScript function"
), Pa = Xt, Vt = /* @__PURE__ */ r(
  ee,
  o,
  "named JavaScript function"
), Ea = Vt, en = /* @__PURE__ */ r(
  B,
  i,
  "native JavaScript function"
), Fa = en, tn = /* @__PURE__ */ r(
  B,
  o,
  "native JavaScript function"
), $a = tn, nn = /* @__PURE__ */ r(
  te,
  i,
  "scripted JavaScript function"
), Ra = nn, rn = /* @__PURE__ */ r(
  te,
  o,
  "scripted JavaScript function"
), ja = rn, an = /* @__PURE__ */ r(
  ne,
  i,
  "JavaScript object"
), Aa = an, Te = /* @__PURE__ */ r(
  ne,
  o,
  "JavaScript object"
), La = Te, on = /* @__PURE__ */ r(
  L,
  i,
  '"plain" JavaScript object'
), ka = on, ln = /* @__PURE__ */ r(
  L,
  o,
  '"plain" JavaScript object'
), za = ln, cn = /* @__PURE__ */ r(
  re,
  i,
  '"vanilla" JavaScript object'
), Ua = cn, sn = /* @__PURE__ */ r(
  re,
  o,
  '"vanilla" JavaScript object'
), Ba = sn, un = /* @__PURE__ */ x(
  Ce,
  "allowArray"
), Ja = un;
function Ce(e, t) {
  if (t == null && S(e), ae(t))
    return t;
  g(
    `InvalidArgument: the given ${f(e)} is no JavaScript array`
  );
}
const Ta = Ce, fn = /* @__PURE__ */ x(
  Me,
  "allowList"
), Ca = fn;
function Me(e, t, n, a, l) {
  if (t == null && S(e), oe(t, a, l))
    return t;
  g(
    `InvalidArgument: the given ${f(e)} is ` + (n == null ? "either not a list or contains an invalid number of elements" : "no " + f(n))
  );
}
const Ma = Me, gn = /* @__PURE__ */ x(
  De,
  "allowListSatisfying"
), Da = gn;
function De(e, t, n, a, l, c) {
  if (t == null && S(e), k(t, n, l, c))
    return t;
  g(
    `InvalidArgument: the given ${f(e)} is ` + (a == null ? "either not a list or contains invalid elements" : "no " + f(a))
  );
}
const qa = De, bn = /* @__PURE__ */ x(
  qe,
  "allowListOf"
), Ha = bn;
function qe(e, t, n) {
  if (t == null && S(e), ot(t, n))
    return t;
  g(`InvalidArgument: the given value is no ${f(e)}`);
}
const _a = qe, dn = /* @__PURE__ */ x(
  He,
  "allowInstanceOf"
), Za = dn;
function He(e, t, n, a) {
  if (t == null && S(e), t instanceof n)
    return t;
  g(
    `InvalidArgument: the given ${f(e)} is no ${f(a)}`
  );
}
const Wa = He, pn = /* @__PURE__ */ x(
  _e,
  "allowValueInheritingFrom"
), Ga = pn;
function _e(e, t, n, a) {
  if (t == null && S(e), n.isPrototypeOf(t))
    return t;
  g(
    `InvalidArgument: the given ${f(e)} is no ${f(a)}`
  );
}
const Ka = _e, wn = /* @__PURE__ */ r(
  ie,
  i,
  "JavaScript Date object"
), Qa = wn, xn = /* @__PURE__ */ r(
  ie,
  o,
  "JavaScript Date object"
), Ya = xn, In = /* @__PURE__ */ r(
  le,
  i,
  "JavaScript Error object"
), Xa = In, Sn = /* @__PURE__ */ r(
  le,
  o,
  "JavaScript Error object"
), Va = Sn, yn = /* @__PURE__ */ r(
  ce,
  i,
  'JavaScript Promise (or "Thenable") object'
), eo = yn, mn = /* @__PURE__ */ r(
  ce,
  o,
  'JavaScript Promise (or "Thenable") object'
), to = mn, vn = /* @__PURE__ */ r(
  se,
  i,
  "JavaScript RegExp object"
), no = vn, On = /* @__PURE__ */ r(
  se,
  o,
  "JavaScript RegExp object"
), ro = On, hn = /* @__PURE__ */ x(
  Ze,
  "allowOneOf"
), ao = hn;
function Ze(e, t, n) {
  if (t == null && S(e), ue(t, n))
    return T(t);
  g(
    `InvalidArgument: the given ${f(e)} is not among the supported values`
  );
}
const oo = Ze, Nn = /* @__PURE__ */ r(
  fe,
  i,
  "CSS color specification"
), io = Nn, Pn = /* @__PURE__ */ r(
  fe,
  o,
  "CSS color specification"
), lo = Pn, En = /* @__PURE__ */ r(
  ge,
  i,
  "EMail address"
), co = En, Fn = /* @__PURE__ */ r(
  ge,
  o,
  "EMail address"
), so = Fn, $n = /* @__PURE__ */ r(
  J,
  i,
  "URL"
), uo = $n, Rn = /* @__PURE__ */ r(
  J,
  o,
  "URL"
), fo = Rn, jn = /* @__PURE__ */ x(
  We,
  "allowAbsoluteURL"
), go = jn;
function We(e, t, n) {
  if (t == null && S(e), ut(t, n))
    return t.valueOf();
  g(
    `InvalidArgument: the given ${f(e)} is no valid absolute URL`
  );
}
const bo = We, An = /* @__PURE__ */ r(
  be,
  i,
  "phone number"
), po = An, Ln = /* @__PURE__ */ r(
  be,
  o,
  "phone number"
), wo = Ln, kn = /* @__PURE__ */ r(
  de,
  i,
  "phone number in E.164 format"
), xo = kn, zn = /* @__PURE__ */ r(
  de,
  o,
  "phone number in E.164 format"
), Io = zn, Un = /* @__PURE__ */ r(
  pe,
  i,
  "BigInt value"
), So = Un, Bn = /* @__PURE__ */ r(
  pe,
  o,
  "BigInt value"
), yo = Bn, Jn = /* @__PURE__ */ r(
  we,
  i,
  "symbol"
), mo = Jn, Tn = /* @__PURE__ */ r(
  we,
  o,
  "symbol"
), vo = Tn, Cn = /* @__PURE__ */ r(
  xe,
  i,
  "JavaScript Map"
), Oo = Cn, Mn = /* @__PURE__ */ r(
  xe,
  o,
  "JavaScript Map"
), ho = Mn, Dn = /* @__PURE__ */ r(
  Ie,
  i,
  "JavaScript Set"
), No = Dn, qn = /* @__PURE__ */ r(
  Ie,
  o,
  "JavaScript Set"
), Po = qn, Hn = /* @__PURE__ */ r(
  Se,
  i,
  "typed array"
), Eo = Hn, _n = /* @__PURE__ */ r(
  Se,
  o,
  "typed array"
), Fo = _n, Zn = /* @__PURE__ */ r(
  ye,
  i,
  "ArrayBuffer"
), $o = Zn, Wn = /* @__PURE__ */ r(
  ye,
  o,
  "ArrayBuffer"
), Ro = Wn, Gn = /* @__PURE__ */ r(
  me,
  i,
  "UUID"
), jo = Gn, Kn = /* @__PURE__ */ r(
  me,
  o,
  "UUID"
), Ao = Kn, Qn = /* @__PURE__ */ r(
  ve,
  i,
  "ISO 8601 date"
), Lo = Qn, Yn = /* @__PURE__ */ r(
  ve,
  o,
  "ISO 8601 date"
), ko = Yn, Xn = /* @__PURE__ */ r(
  Oe,
  i,
  "ISO 8601 timestamp"
), zo = Xn, Vn = /* @__PURE__ */ r(
  Oe,
  o,
  "ISO 8601 timestamp"
), Uo = Vn, er = /* @__PURE__ */ r(
  he,
  i,
  "IPv4 address"
), Bo = er, tr = /* @__PURE__ */ r(
  he,
  o,
  "IPv4 address"
), Jo = tr, nr = /* @__PURE__ */ r(
  Ne,
  i,
  "IPv6 address"
), To = nr, rr = /* @__PURE__ */ r(
  Ne,
  o,
  "IPv6 address"
), Co = rr, ar = /* @__PURE__ */ r(
  Pe,
  i,
  "host name"
), Mo = ar, or = /* @__PURE__ */ r(
  Pe,
  o,
  "host name"
), Do = or, ir = /* @__PURE__ */ r(
  Ee,
  i,
  "port number"
), qo = ir, lr = /* @__PURE__ */ r(
  Ee,
  o,
  "port number"
), Ho = lr, cr = /* @__PURE__ */ r(
  N,
  i,
  "serializable value"
), _o = cr, sr = /* @__PURE__ */ r(
  N,
  o,
  "serializable value"
), Zo = sr, ur = /* @__PURE__ */ r(
  Fe,
  i,
  "serializable object"
), Wo = ur, fr = /* @__PURE__ */ r(
  Fe,
  o,
  "serializable object"
), Go = fr, gr = /* @__PURE__ */ r(
  $e,
  i,
  "JSON string"
), Ko = gr, br = /* @__PURE__ */ r(
  $e,
  o,
  "JSON string"
), Qo = br, dr = /* @__PURE__ */ r(
  Re,
  i,
  "Base64-encoded string"
), Yo = dr, pr = /* @__PURE__ */ r(
  Re,
  o,
  "Base64-encoded string"
), Xo = pr, wr = /* @__PURE__ */ r(
  je,
  i,
  "hexadecimal string"
), Vo = wr, xr = /* @__PURE__ */ r(
  je,
  o,
  "hexadecimal string"
), ei = xr, Ir = /* @__PURE__ */ r(
  Ae,
  i,
  "JavaScript identifier"
), ti = Ir, Sr = /* @__PURE__ */ r(
  Ae,
  o,
  "JavaScript identifier"
), ni = Sr, $ = (
  // core of several escaping patterns below
  String.raw`\\x[0-9a-fA-F]{2}|\\u[0-9a-fA-F]{4}|` + String.raw`\\u\{[0-9a-fA-F]+\}|\\[0bfnrtv'"\\\/]`
), yr = new RegExp($ + "?", "g"), Ge = /[\x00-\x1f\x7f-\x9f]/g, mr = {
  "\0": "\\0",
  "\b": "\\b",
  "\f": "\\f",
  "\n": "\\n",
  "\r": "\\r",
  "	": "\\t",
  "\v": "\\v"
};
function Ke(e) {
  return mr[e] ?? "\\x" + e.charCodeAt(0).toString(16).padStart(2, "0");
}
function f(e) {
  return e.replace(yr, (t) => t === "\\" ? "\\\\" : t).replace(Ge, Ke);
}
const vr = new RegExp($, "g"), Or = {
  "\\0": "\0",
  "\\b": "\b",
  "\\f": "\f",
  "\\n": `
`,
  "\\r": "\r",
  "\\t": "	",
  "\\v": "\v",
  "\\'": "'",
  '\\"': '"',
  "\\\\": "\\"
};
function hr(e) {
  const t = e.charAt(2) === "{" ? parseInt(e.slice(3, -1), 16) : parseInt(e.slice(2), 16);
  return t <= 1114111 ? String.fromCodePoint(t) : e;
}
function ri(e) {
  return e.replace(vr, (t) => Or[t] ?? hr(t));
}
const Nr = new RegExp($ + "?|'", "g"), Pr = new RegExp($ + '?|"', "g"), Er = new RegExp($ + "?|`|\\$\\{", "g"), Fr = {
  "'": "\\'",
  '"': '\\"',
  "`": "\\`",
  "${": "\\${",
  "\\": "\\\\"
};
function $r(e, t = '"') {
  const n = t === "'" ? Nr : t === "`" ? Er : Pr;
  return e.replace(n, (a) => Fr[a] ?? a).replace(Ge, Ke);
}
function ai(e, t = '"') {
  return t + $r(e, t) + t;
}
const Rr = /[&<>"'\x00-\x1F\x7F-\x9F\\]/g;
function jr(e, t) {
  return t = (t || "").trim() || "<br/>", e.replace(Rr, (n) => {
    switch (n) {
      case "&":
        return "&amp;";
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case '"':
        return "&quot;";
      case "'":
        return "&apos;";
      case "\b":
        return "&#92;b";
      case "\f":
        return "&#92;f";
      case `
`:
        return t;
      case "\r":
        return "&#92;r";
      case "	":
        return "&#92;t";
      case "\v":
        return "&#92;v";
      case "\\":
        return "&#92;";
      default:
        return "&#x" + n.charCodeAt(0).toString(16).padStart(4, "0") + ";";
    }
  });
}
const Ar = /[:`*_\[\]#|~]/g;
function oi(e, t) {
  return jr(e, t).replace(
    Ar,
    (n) => "&#" + n.charCodeAt(0) + ";"
  );
}
function A(e, t, n, a) {
  if (e === t)
    return !1;
  let l, c;
  typeof n == "string" ? l = n : n != null && (l = n.Mode, c = n.Tolerance);
  let p = typeof e;
  if (p !== typeof t)
    return !0;
  function I(u, s, d, m) {
    if (!Array.isArray(s) || u.length !== s.length)
      return !0;
    for (let b = 0, h = u.length; b < h; b++)
      if (A(u[b], s[b], d, m))
        return !0;
    return !1;
  }
  function R(u, s, d, m) {
    if (!(s instanceof Map) || u.size !== s.size)
      return !0;
    let b = !1;
    return u.forEach(function(h, _) {
      b || (b = !s.has(_) || A(h, s.get(_), d, m));
    }), b;
  }
  function j(u, s) {
    if (!(s instanceof Set) || u.size !== s.size)
      return !0;
    let d = !1;
    return u.forEach(function(m) {
      !d && !s.has(m) && (d = !0);
    }), d;
  }
  function Qe(u, s) {
    if (Object.getPrototypeOf(u) !== Object.getPrototypeOf(s) || u.byteLength !== s.byteLength)
      return !0;
    let d = new Uint8Array(
      u.buffer,
      u.byteOffset,
      u.byteLength
    ), m = new Uint8Array(
      s.buffer,
      s.byteOffset,
      s.byteLength
    );
    for (let b = 0, h = d.length; b < h; b++)
      if (d[b] !== m[b])
        return !0;
    return !1;
  }
  function Ye(u, s, d, m) {
    if (Object.getPrototypeOf(u) !== Object.getPrototypeOf(s))
      return !0;
    for (let b in u)
      if (!(b in s))
        return !0;
    for (let b in s)
      if (!(b in u) || A(u[b], s[b], d, m))
        return !0;
    return !1;
  }
  switch (p) {
    case "undefined":
    case "boolean":
    case "string":
    case "bigint":
    case "symbol":
    case "function":
      return !0;
    // most primitives are compared using "==="
    case "number": {
      if (isNaN(e) !== isNaN(t))
        return !0;
      if (c != null)
        return Math.abs(e - t) > c;
      const s = Number.EPSILON * Math.max(
        // default is relative!
        1,
        Math.abs(e),
        Math.abs(t)
      );
      return Math.abs(e - t) > s;
    }
    case "object":
      if (e == null || t == null)
        return !0;
      if (
        // boxed primitives are compared by their values
        e instanceof Boolean || e instanceof Number || e instanceof String
      )
        return l === "by-reference" ? !0 : Object.getPrototypeOf(e) !== Object.getPrototypeOf(t) || e.valueOf() !== t.valueOf();
      if (e instanceof Date) {
        if (l === "by-reference" || !(t instanceof Date))
          return !0;
        let s = e.getTime(), d = t.getTime();
        return s !== d && !(isNaN(s) && isNaN(d));
      }
      if (e instanceof RegExp)
        return l === "by-reference" ? !0 : !(t instanceof RegExp) || e.source !== t.source || e.flags !== t.flags;
      a == null && (a = /* @__PURE__ */ new WeakMap());
      let u = a.get(e);
      return u == null && a.set(e, u = /* @__PURE__ */ new WeakSet()), u.has(t) ? !1 : (u.add(t), Array.isArray(e) ? I(e, t, n, a) : e instanceof Map ? l === "by-reference" ? !0 : R(e, t, n, a) : e instanceof Set ? l === "by-reference" ? !0 : j(e, t) : ArrayBuffer.isView(e) ? l === "by-reference" ? !0 : Qe(e, t) : l === "by-reference" ? !0 : Ye(e, t, n, a));
    default:
      return !0;
  }
}
function ii(e, t, n) {
  return !A(e, t, n);
}
function Lr(e) {
  Te("candidate", e);
  for (let t in e)
    if (Xe(e, t))
      return !1;
  return !0;
}
function li(e) {
  return !Lr(e);
}
function kr(e) {
  return /^\s*$/.test(e);
}
function ci(e) {
  return !kr(e);
}
function si(e, t = -1 / 0, n = 1 / 0) {
  return Math.max(t, Math.min(e, n));
}
const P = /* @__PURE__ */ Object.freeze({
  transparent: "rgba(0,0,0,0.0)",
  aliceblue: "rgba(240,248,255,1.0)",
  lightpink: "rgba(255,182,193,1.0)",
  antiquewhite: "rgba(250,235,215,1.0)",
  lightsalmon: "rgba(255,160,122,1.0)",
  aqua: "rgba(0,255,255,1.0)",
  lightseagreen: "rgba(32,178,170,1.0)",
  aquamarine: "rgba(127,255,212,1.0)",
  lightskyblue: "rgba(135,206,250,1.0)",
  azure: "rgba(240,255,255,1.0)",
  lightslategray: "rgba(119,136,153,1.0)",
  beige: "rgba(245,245,220,1.0)",
  lightslategrey: "rgba(119,136,153,1.0)",
  bisque: "rgba(255,228,196,1.0)",
  lightsteelblue: "rgba(176,196,222,1.0)",
  black: "rgba(0,0,0,1.0)",
  lightyellow: "rgba(255,255,224,1.0)",
  blanchedalmond: "rgba(255,235,205,1.0)",
  lime: "rgba(0,255,0,1.0)",
  blue: "rgba(0,0,255,1.0)",
  limegreen: "rgba(50,205,50,1.0)",
  blueviolet: "rgba(138,43,226,1.0)",
  linen: "rgba(250,240,230,1.0)",
  brown: "rgba(165,42,42,1.0)",
  magenta: "rgba(255,0,255,1.0)",
  burlywood: "rgba(222,184,135,1.0)",
  maroon: "rgba(128,0,0,1.0)",
  cadetblue: "rgba(95,158,160,1.0)",
  mediumaquamarine: "rgba(102,205,170,1.0)",
  chartreuse: "rgba(127,255,0,1.0)",
  mediumblue: "rgba(0,0,205,1.0)",
  chocolate: "rgba(210,105,30,1.0)",
  mediumorchid: "rgba(186,85,211,1.0)",
  coral: "rgba(255,127,80,1.0)",
  mediumpurple: "rgba(147,112,219,1.0)",
  cornflowerblue: "rgba(100,149,237,1.0)",
  mediumseagreen: "rgba(60,179,113,1.0)",
  cornsilk: "rgba(255,248,220,1.0)",
  mediumslateblue: "rgba(123,104,238,1.0)",
  crimson: "rgba(220,20,60,1.0)",
  mediumspringgreen: "rgba(0,250,154,1.0)",
  cyan: "rgba(0,255,255,1.0)",
  mediumturquoise: "rgba(72,209,204,1.0)",
  darkblue: "rgba(0,0,139,1.0)",
  mediumvioletred: "rgba(199,21,133,1.0)",
  darkcyan: "rgba(0,139,139,1.0)",
  midnightblue: "rgba(25,25,112,1.0)",
  darkgoldenrod: "rgba(184,134,11,1.0)",
  mintcream: "rgba(245,255,250,1.0)",
  darkgray: "rgba(169,169,169,1.0)",
  mistyrose: "rgba(255,228,225,1.0)",
  darkgreen: "rgba(0,100,0,1.0)",
  moccasin: "rgba(255,228,181,1.0)",
  darkgrey: "rgba(169,169,169,1.0)",
  navajowhite: "rgba(255,222,173,1.0)",
  darkkhaki: "rgba(189,183,107,1.0)",
  navy: "rgba(0,0,128,1.0)",
  darkmagenta: "rgba(139,0,139,1.0)",
  oldlace: "rgba(253,245,230,1.0)",
  darkolivegreen: "rgba(85,107,47,1.0)",
  olive: "rgba(128,128,0,1.0)",
  darkorange: "rgba(255,140,0,1.0)",
  olivedrab: "rgba(107,142,35,1.0)",
  darkorchid: "rgba(153,50,204,1.0)",
  orange: "rgba(255,165,0,1.0)",
  darkred: "rgba(139,0,0,1.0)",
  orangered: "rgba(255,69,0,1.0)",
  darksalmon: "rgba(233,150,122,1.0)",
  orchid: "rgba(218,112,214,1.0)",
  darkseagreen: "rgba(143,188,143,1.0)",
  palegoldenrod: "rgba(238,232,170,1.0)",
  darkslateblue: "rgba(72,61,139,1.0)",
  palegreen: "rgba(152,251,152,1.0)",
  darkslategray: "rgba(47,79,79,1.0)",
  paleturquoise: "rgba(175,238,238,1.0)",
  darkslategrey: "rgba(47,79,79,1.0)",
  palevioletred: "rgba(219,112,147,1.0)",
  darkturquoise: "rgba(0,206,209,1.0)",
  papayawhip: "rgba(255,239,213,1.0)",
  darkviolet: "rgba(148,0,211,1.0)",
  peachpuff: "rgba(255,218,185,1.0)",
  deeppink: "rgba(255,20,147,1.0)",
  peru: "rgba(205,133,63,1.0)",
  deepskyblue: "rgba(0,191,255,1.0)",
  pink: "rgba(255,192,203,1.0)",
  dimgray: "rgba(105,105,105,1.0)",
  plum: "rgba(221,160,221,1.0)",
  dimgrey: "rgba(105,105,105,1.0)",
  powderblue: "rgba(176,224,230,1.0)",
  dodgerblue: "rgba(30,144,255,1.0)",
  purple: "rgba(128,0,128,1.0)",
  firebrick: "rgba(178,34,34,1.0)",
  red: "rgba(255,0,0,1.0)",
  floralwhite: "rgba(255,250,240,1.0)",
  rosybrown: "rgba(188,143,143,1.0)",
  forestgreen: "rgba(34,139,34,1.0)",
  royalblue: "rgba(65,105,225,1.0)",
  fuchsia: "rgba(255,0,255,1.0)",
  saddlebrown: "rgba(139,69,19,1.0)",
  gainsboro: "rgba(220,220,220,1.0)",
  salmon: "rgba(250,128,114,1.0)",
  ghostwhite: "rgba(248,248,255,1.0)",
  sandybrown: "rgba(244,164,96,1.0)",
  gold: "rgba(255,215,0,1.0)",
  seagreen: "rgba(46,139,87,1.0)",
  goldenrod: "rgba(218,165,32,1.0)",
  seashell: "rgba(255,245,238,1.0)",
  gray: "rgba(128,128,128,1.0)",
  sienna: "rgba(160,82,45,1.0)",
  green: "rgba(0,128,0,1.0)",
  silver: "rgba(192,192,192,1.0)",
  greenyellow: "rgba(173,255,47,1.0)",
  skyblue: "rgba(135,206,235,1.0)",
  grey: "rgba(128,128,128,1.0)",
  slateblue: "rgba(106,90,205,1.0)",
  honeydew: "rgba(240,255,240,1.0)",
  slategray: "rgba(112,128,144,1.0)",
  hotpink: "rgba(255,105,180,1.0)",
  slategrey: "rgba(112,128,144,1.0)",
  indianred: "rgba(205,92,92,1.0)",
  snow: "rgba(255,250,250,1.0)",
  indigo: "rgba(75,0,130,1.0)",
  springgreen: "rgba(0,255,127,1.0)",
  ivory: "rgba(255,255,240,1.0)",
  steelblue: "rgba(70,130,180,1.0)",
  khaki: "rgba(240,230,140,1.0)",
  tan: "rgba(210,180,140,1.0)",
  lavender: "rgba(230,230,250,1.0)",
  teal: "rgba(0,128,128,1.0)",
  lavenderblush: "rgba(255,240,245,1.0)",
  thistle: "rgba(216,191,216,1.0)",
  lawngreen: "rgba(124,252,0,1.0)",
  tomato: "rgba(255,99,71,1.0)",
  lemonchiffon: "rgba(255,250,205,1.0)",
  turquoise: "rgba(64,224,208,1.0)",
  lightblue: "rgba(173,216,230,1.0)",
  violet: "rgba(238,130,238,1.0)",
  lightcoral: "rgba(240,128,128,1.0)",
  wheat: "rgba(245,222,179,1.0)",
  lightcyan: "rgba(224,255,255,1.0)",
  white: "rgba(255,255,255,1.0)",
  lightgoldenrodyellow: "rgba(250,250,210,1.0)",
  whitesmoke: "rgba(245,245,245,1.0)",
  lightgray: "rgba(211,211,211,1.0)",
  yellow: "rgba(255,255,0,1.0)",
  lightgreen: "rgba(144,238,144,1.0)",
  yellowgreen: "rgba(154,205,50,1.0)",
  lightgrey: "rgba(211,211,211,1.0)"
}), M = /^#[a-fA-F0-9]{6}$/, D = /^#[a-fA-F0-9]{8}$/, q = (
  // not perfect
  /^rgb\(([0-9]+),\s*([0-9]+),\s*([0-9]+)\)$/i
), H = (
  // not perfect
  /^rgba\(([0-9]+),\s*([0-9]+),\s*([0-9]+),\s*([01]?[.][0-9]+|[01])\)$/i
);
function zr(e) {
  let t = e.toLowerCase();
  if (P.hasOwnProperty(t) && (e = P[t]), M.test(e))
    return e + "FF";
  if (D.test(e))
    return e;
  function n(l) {
    return l = Math.max(0, Math.min(255, Math.round(l))), l.toString(16).toUpperCase().padStart(2, "0");
  }
  let a = q.exec(e);
  if (a != null)
    return "#" + n(parseInt(a[1], 10)) + n(parseInt(a[2], 10)) + n(parseInt(a[3], 10)) + "FF";
  if (a = H.exec(e), a != null)
    return "#" + n(parseInt(a[1], 10)) + n(parseInt(a[2], 10)) + n(parseInt(a[3], 10)) + n(parseFloat(a[4]) * 255);
  g("InvalidArgument: the given Value is not a valid CSS Color specification");
}
function ui(e) {
  let t = e.toLowerCase();
  if (P.hasOwnProperty(t))
    return P[t];
  if (M.test(e))
    return "rgba(" + parseInt(e.slice(1, 3), 16) + "," + parseInt(e.slice(3, 5), 16) + "," + parseInt(e.slice(5, 7), 16) + ",1)";
  if (D.test(e))
    return "rgba(" + parseInt(e.slice(1, 3), 16) + "," + parseInt(e.slice(3, 5), 16) + "," + parseInt(e.slice(5, 7), 16) + "," + parseInt(e.slice(7), 16) / 255 + ")";
  if (q.test(e))
    return e.slice(0, e.length - 1) + ",1)";
  if (H.test(e))
    return e;
  g("InvalidArgument: the given Value is not a valid CSS Color specification");
}
function fi(e) {
  return zr(e).slice(0, 7);
}
export {
  P as ColorSet,
  C as FunctionWithName,
  jr as HTMLsafe,
  zr as HexColor,
  oi as MarkDownSafe,
  Lr as ObjectIsEmpty,
  li as ObjectIsNotEmpty,
  Cr as ObjectMergedWith,
  Xe as Object_hasOwnProperty,
  Ve as Object_isPrototypeOf,
  Br as Object_propertyIsEnumerable,
  Jr as Object_toLocaleString,
  et as Object_toString,
  Tr as Object_valueOf,
  ui as RGBAColor,
  kr as StringIsEmpty,
  ci as StringIsNotEmpty,
  r as ValidatorForClassifier,
  Mr as ValueExists,
  Zr as ValueInheritsFrom,
  ut as ValueIsAbsoluteURL,
  U as ValueIsAnonymousFunction,
  ae as ValueIsArray,
  ye as ValueIsArrayBuffer,
  Re as ValueIsBase64,
  pe as ValueIsBigInt,
  z as ValueIsBoolean,
  G as ValueIsCardinal,
  fe as ValueIsColor,
  ie as ValueIsDate,
  de as ValueIsE164PhoneNumber,
  ge as ValueIsEMailAddress,
  Hr as ValueIsEmptyString,
  le as ValueIsError,
  v as ValueIsFiniteNumber,
  V as ValueIsFunction,
  je as ValueIsHexString,
  Pe as ValueIsHostName,
  he as ValueIsIPv4Address,
  Ne as ValueIsIPv6Address,
  ve as ValueIsISODate,
  Oe as ValueIsISOTimestamp,
  Ae as ValueIsIdentifier,
  _r as ValueIsInstanceOf,
  F as ValueIsInteger,
  tt as ValueIsIntegerInRange,
  $e as ValueIsJSONString,
  oe as ValueIsList,
  ot as ValueIsListOf,
  k as ValueIsListSatisfying,
  xe as ValueIsMap,
  Dr as ValueIsMissing,
  Z as ValueIsNaN,
  ee as ValueIsNamedFunction,
  B as ValueIsNativeFunction,
  Q as ValueIsNonEmptyString,
  O as ValueIsNumber,
  qr as ValueIsNumberInRange,
  ne as ValueIsObject,
  ue as ValueIsOneOf,
  W as ValueIsOrdinal,
  be as ValueIsPhoneNumber,
  L as ValueIsPlainObject,
  Ee as ValueIsPortNumber,
  ce as ValueIsPromise,
  se as ValueIsRegExp,
  te as ValueIsScriptedFunction,
  Fe as ValueIsSerializableObject,
  N as ValueIsSerializableValue,
  Ie as ValueIsSet,
  y as ValueIsString,
  w as ValueIsStringMatching,
  we as ValueIsSymbol,
  Y as ValueIsText,
  X as ValueIsTextline,
  Se as ValueIsTypedArray,
  J as ValueIsURL,
  me as ValueIsUUID,
  re as ValueIsVanillaObject,
  ii as ValuesAreEqual,
  A as ValuesDiffer,
  i as acceptNil,
  jn as allowAbsoluteURL,
  Qt as allowAnonymousFunction,
  un as allowArray,
  Zn as allowArrayBuffer,
  dr as allowBase64,
  Un as allowBigInt,
  Pt as allowBoolean,
  Jt as allowCardinal,
  Nn as allowColor,
  wn as allowDate,
  kn as allowE164PhoneNumber,
  En as allowEMailAddress,
  In as allowError,
  $t as allowFiniteNumber,
  Gt as allowFunction,
  wr as allowHexString,
  ar as allowHostName,
  er as allowIPv4Address,
  nr as allowIPv6Address,
  Qn as allowISODate,
  Xn as allowISOTimestamp,
  Ir as allowIdentifier,
  dn as allowInstanceOf,
  kt as allowInteger,
  zt as allowIntegerInRange,
  gr as allowJSONString,
  fn as allowList,
  bn as allowListOf,
  gn as allowListSatisfying,
  Cn as allowMap,
  jt as allowNaN,
  Xt as allowNamedFunction,
  en as allowNativeFunction,
  Mt as allowNonEmptyString,
  Ft as allowNumber,
  Lt as allowNumberInRange,
  an as allowObject,
  hn as allowOneOf,
  Ut as allowOrdinal,
  An as allowPhoneNumber,
  on as allowPlainObject,
  ir as allowPortNumber,
  yn as allowPromise,
  vn as allowRegExp,
  nn as allowScriptedFunction,
  ur as allowSerializableObject,
  cr as allowSerializableValue,
  Dn as allowSet,
  Ct as allowString,
  qt as allowStringMatching,
  Jn as allowSymbol,
  Ht as allowText,
  Zt as allowTextline,
  Hn as allowTypedArray,
  $n as allowURL,
  Gn as allowUUID,
  Ot as allowValue,
  pn as allowValueInheritingFrom,
  cn as allowVanillaObject,
  go as allowedAbsoluteURL,
  ha as allowedAnonymousFunction,
  Ja as allowedArray,
  $o as allowedArrayBuffer,
  Yo as allowedBase64,
  So as allowedBigInt,
  Gr as allowedBoolean,
  ua as allowedCardinal,
  io as allowedColor,
  Qa as allowedDate,
  xo as allowedE164PhoneNumber,
  co as allowedEMailAddress,
  Xa as allowedError,
  Xr as allowedFiniteNumber,
  va as allowedFunction,
  Vo as allowedHexString,
  Mo as allowedHostName,
  Bo as allowedIPv4Address,
  To as allowedIPv6Address,
  Lo as allowedISODate,
  zo as allowedISOTimestamp,
  ti as allowedIdentifier,
  Za as allowedInstanceOf,
  aa as allowedInteger,
  ia as allowedIntegerInRange,
  Ko as allowedJSONString,
  Ca as allowedList,
  Ha as allowedListOf,
  Da as allowedListSatisfying,
  Oo as allowedMap,
  ea as allowedNaN,
  Pa as allowedNamedFunction,
  Fa as allowedNativeFunction,
  da as allowedNonEmptyString,
  Qr as allowedNumber,
  na as allowedNumberInRange,
  Aa as allowedObject,
  ao as allowedOneOf,
  ca as allowedOrdinal,
  po as allowedPhoneNumber,
  ka as allowedPlainObject,
  qo as allowedPortNumber,
  eo as allowedPromise,
  no as allowedRegExp,
  Ra as allowedScriptedFunction,
  Wo as allowedSerializableObject,
  _o as allowedSerializableValue,
  No as allowedSet,
  ga as allowedString,
  wa as allowedStringMatching,
  mo as allowedSymbol,
  Ia as allowedText,
  ya as allowedTextline,
  Eo as allowedTypedArray,
  uo as allowedURL,
  jo as allowedUUID,
  Wr as allowedValue,
  Ga as allowedValueInheritingFrom,
  Ua as allowedVanillaObject,
  si as constrained,
  f as escaped,
  We as expectAbsoluteURL,
  Yt as expectAnonymousFunction,
  Ce as expectArray,
  Wn as expectArrayBuffer,
  pr as expectBase64,
  Bn as expectBigInt,
  Et as expectBoolean,
  Tt as expectCardinal,
  Pn as expectColor,
  xn as expectDate,
  zn as expectE164PhoneNumber,
  Fn as expectEMailAddress,
  Sn as expectError,
  Rt as expectFiniteNumber,
  Kt as expectFunction,
  xr as expectHexString,
  or as expectHostName,
  tr as expectIPv4Address,
  rr as expectIPv6Address,
  Yn as expectISODate,
  Vn as expectISOTimestamp,
  Sr as expectIdentifier,
  He as expectInstanceOf,
  ze as expectInteger,
  Ue as expectIntegerInRange,
  br as expectJSONString,
  Me as expectList,
  qe as expectListOf,
  De as expectListSatisfying,
  Mn as expectMap,
  At as expectNaN,
  Vt as expectNamedFunction,
  tn as expectNativeFunction,
  Dt as expectNonEmptyString,
  Le as expectNumber,
  ke as expectNumberInRange,
  Te as expectObject,
  Ze as expectOneOf,
  Bt as expectOrdinal,
  Ln as expectPhoneNumber,
  ln as expectPlainObject,
  lr as expectPortNumber,
  mn as expectPromise,
  On as expectRegExp,
  rn as expectScriptedFunction,
  fr as expectSerializableObject,
  sr as expectSerializableValue,
  qn as expectSet,
  Be as expectString,
  Je as expectStringMatching,
  Tn as expectSymbol,
  _t as expectText,
  Wt as expectTextline,
  _n as expectTypedArray,
  Rn as expectURL,
  Kn as expectUUID,
  ht as expectValue,
  _e as expectValueInheritingFrom,
  sn as expectVanillaObject,
  bo as expectedAbsoluteURL,
  Na as expectedAnonymousFunction,
  Ta as expectedArray,
  Ro as expectedArrayBuffer,
  Xo as expectedBase64,
  yo as expectedBigInt,
  Kr as expectedBoolean,
  fa as expectedCardinal,
  lo as expectedColor,
  Ya as expectedDate,
  Io as expectedE164PhoneNumber,
  so as expectedEMailAddress,
  Va as expectedError,
  Vr as expectedFiniteNumber,
  Oa as expectedFunction,
  ei as expectedHexString,
  Do as expectedHostName,
  Jo as expectedIPv4Address,
  Co as expectedIPv6Address,
  ko as expectedISODate,
  Uo as expectedISOTimestamp,
  ni as expectedIdentifier,
  Wa as expectedInstanceOf,
  oa as expectedInteger,
  la as expectedIntegerInRange,
  Qo as expectedJSONString,
  Ma as expectedList,
  _a as expectedListOf,
  qa as expectedListSatisfying,
  ho as expectedMap,
  ta as expectedNaN,
  Ea as expectedNamedFunction,
  $a as expectedNativeFunction,
  pa as expectedNonEmptyString,
  Yr as expectedNumber,
  ra as expectedNumberInRange,
  La as expectedObject,
  oo as expectedOneOf,
  sa as expectedOrdinal,
  wo as expectedPhoneNumber,
  za as expectedPlainObject,
  Ho as expectedPortNumber,
  to as expectedPromise,
  ro as expectedRegExp,
  ja as expectedScriptedFunction,
  Go as expectedSerializableObject,
  Zo as expectedSerializableValue,
  Po as expectedSet,
  ba as expectedString,
  xa as expectedStringMatching,
  vo as expectedSymbol,
  Sa as expectedText,
  ma as expectedTextline,
  Fo as expectedTypedArray,
  fo as expectedURL,
  Ao as expectedUUID,
  Nt as expectedValue,
  Ka as expectedValueInheritingFrom,
  Ba as expectedVanillaObject,
  Ur as global,
  $r as quotable,
  ai as quoted,
  o as rejectNil,
  fi as shortHexColor,
  g as throwError,
  ri as unescaped,
  vt as validatedArgument
};
//# sourceMappingURL=javascript-interface-library.esm.js.map
