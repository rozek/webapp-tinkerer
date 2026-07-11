const Fr = globalThis;
function je(e, t) {
  return e == null || // let this method crash like its original
  "hasOwnProperty" in e && typeof e.hasOwnProperty == "function" ? e.hasOwnProperty(t) : Object.prototype.hasOwnProperty.call(e, t);
}
function Be(e, t) {
  return e == null || // let this method crash like its original
  "isPrototypeOf" in e && typeof e.isPrototypeOf == "function" ? e.isPrototypeOf(t) : Object.prototype.isPrototypeOf.call(e, t);
}
function Pr(e, t) {
  return e == null || // let this method crash like its original
  "propertyIsEnumerable" in e && typeof e.propertyIsEnumerable == "function" ? e.propertyIsEnumerable(t) : Object.prototype.propertyIsEnumerable.call(e, t);
}
function Re(e) {
  return e == null || // let this method crash like its original
  "toString" in e && typeof e.toString == "function" ? e.toString() : Object.prototype.toString.call(e);
}
function $r(e) {
  return e == null || // let this method crash like its original
  "toLocaleString" in e && typeof e.toLocaleString == "function" ? e.toLocaleString() : Re(e);
}
function Er(e) {
  return e == null || // let this method crash like its original
  "valueOf" in e && typeof e.valueOf == "function" ? e.valueOf() : Object.prototype.valueOf.call(e);
}
function jr(e, ...t) {
  for (let n = 0, r = t.length; n < r; n++) {
    let i = t[n];
    if (i != null)
      if (typeof i == "object") {
        const o = Object.getOwnPropertyDescriptors(i);
        for (const I of Reflect.ownKeys(o)) {
          const x = o[I];
          x.enumerable && Object.defineProperty(e, I, x);
        }
      } else
        f("InvalidArgument: argument #" + (n + 1) + " is not an object");
  }
  return e;
}
function f(e) {
  let t = /^([$a-zA-Z][$a-zA-Z0-9]*):\s*(\S.+)\s*$/.exec(e);
  if (t == null)
    throw new Error(e);
  {
    let n = new Error(t[2]);
    throw n.name = t[1], n;
  }
}
function Br(e) {
  return e != null;
}
function Rr(e) {
  return e == null;
}
function P(e) {
  return typeof e == "boolean" || e instanceof Boolean;
}
function $(e) {
  return typeof e == "number" || e instanceof Number;
}
function y(e) {
  return (typeof e == "number" || e instanceof Number) && isFinite(e.valueOf());
}
function z(e) {
  return (typeof e == "number" || e instanceof Number) && isNaN(e.valueOf());
}
function kr(e, t, n, r = !0, i = !0) {
  if (!$(e))
    return !1;
  const o = e.valueOf();
  if (isNaN(o))
    return !1;
  if (y(t)) {
    if (y(n)) {
      if (o < t || !r && o === t || o > n || !i && o === n)
        return !1;
    } else if (o < t || !r && o === t)
      return !1;
  } else if (y(n) && (o > n || !i && o === n))
    return !1;
  return !0;
}
function E(e) {
  if (typeof e != "number" && !(e instanceof Number))
    return !1;
  const t = e.valueOf();
  return isFinite(t) && Math.round(t) === t;
}
function ke(e, t, n) {
  if (!E(e) || isNaN(e))
    return !1;
  if (y(t)) {
    if (y(n)) {
      if (e < t || e > n)
        return !1;
    } else if (e < t)
      return !1;
  } else if (y(n) && e > n)
    return !1;
  return !0;
}
function J(e) {
  if (typeof e != "number" && !(e instanceof Number))
    return !1;
  const t = e.valueOf();
  return isFinite(t) && Math.round(t) === t && t >= 0;
}
function T(e) {
  if (typeof e != "number" && !(e instanceof Number))
    return !1;
  const t = e.valueOf();
  return isFinite(t) && Math.round(t) === t && t >= 1;
}
function v(e) {
  return typeof e == "string" || e instanceof String;
}
const A = /^\s*$/;
function zr(e) {
  return (typeof e == "string" || e instanceof String) && A.test(e.valueOf());
}
function M(e) {
  return (typeof e == "string" || e instanceof String) && !A.test(e.valueOf());
}
function p(e, t) {
  return (typeof e == "string" || e instanceof String) && t.test(e.valueOf());
}
const ze = /^[^\x00-\x09\x0B\x0C\x0E-\x1F\x7F-\x9F\u2028\u2029\uFFF9-\uFFFB]*$/;
function D(e) {
  return p(e, ze);
}
const Je = /^[^\x00-\x1F\x7F-\x9F\u2028\u2029\uFFF9-\uFFFB]*$/;
function L(e) {
  return p(e, Je);
}
function U(e) {
  return typeof e == "function";
}
function C(e) {
  return typeof e == "function" && (e.name == null || e.name === "");
}
function H(e) {
  return typeof e == "function" && e.name != null && e.name !== "";
}
const Te = /^function\s*[^(]*\(\)\s*\{\s*\[native code\]\s*\}\s*$/;
function j(e) {
  return typeof e == "function" && Te.test(e.toString()) && !e.name.startsWith("bound ");
}
function q(e) {
  return typeof e == "function" && !j(e);
}
function _(e) {
  return e != null && typeof e == "object";
}
function N(e) {
  return e != null && typeof e == "object" && Object.getPrototypeOf(e) === Object.prototype;
}
function G(e) {
  return e != null && typeof e == "object" && !(e instanceof Object);
}
const B = Array.isArray;
function W(e, t, n) {
  if (B(e)) {
    for (let r = 0, i = e.length; r < i; r++)
      if (e[r] === void 0)
        return !1;
    return !(t != null && e.length < t || n != null && e.length > n);
  }
  return !1;
}
function F(e, t, n, r) {
  if (B(e))
    try {
      for (let i = 0, o = e.length; i < o; i++)
        if (!t(e[i]))
          return !1;
      return !(n != null && e.length < n || r != null && e.length > r);
    } catch {
    }
  return !1;
}
function Jr(e, t) {
  return F(e, (n) => R(n, t));
}
function Tr(e, t) {
  return e instanceof t;
}
function Ar(e, t) {
  return Be(t, e);
}
function Z(e) {
  return e instanceof Date;
}
function K(e) {
  return e instanceof Error;
}
function Y(e) {
  return e != null && typeof e.then == "function";
}
function Q(e) {
  return e instanceof RegExp;
}
function R(e, t) {
  return t.indexOf(e) >= 0;
}
function X(e) {
  if (!v(e))
    return !1;
  let t = e.valueOf().toLowerCase();
  return O.hasOwnProperty(t) || /^#[a-fA-F0-9]{6}$/.test(t) || /^#[a-fA-F0-9]{8}$/.test(t) || /^rgb\([0-9]+,\s*[0-9]+,\s*[0-9]+\)$/.test(t) || // not perfect
  /^rgba\([0-9]+,\s*[0-9]+,\s*[0-9]+,\s*([01]|[01]?[.][0-9]+)\)$/.test(t);
}
const Ae = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/i;
function V(e) {
  return p(e, Ae);
}
const Me = /^[^\s\x00-\x1F\x7F-\x9F\u2028\u2029\uFFF9-\uFFFB]*$/;
function ee(e) {
  if (!p(e, Me) || e === "")
    return !1;
  try {
    return new URL(e, "file://"), !0;
  } catch {
    return !1;
  }
}
const De = /^\+?[0-9(][0-9 \-.\/()]*[0-9)]$/;
function te(e) {
  if (!v(e))
    return !1;
  let t = e.valueOf();
  if (!De.test(t))
    return !1;
  let n = t.replace(/[^0-9]/g, "");
  return t.charAt(0) === "+" ? /^[1-9][0-9]{6,14}$/.test(n) : n.length >= 3 && n.length <= 16;
}
const Le = /^\+[1-9][0-9]{6,14}$/;
function ne(e) {
  return p(e, Le);
}
function re(e) {
  return typeof e == "bigint";
}
function ae(e) {
  return typeof e == "symbol";
}
function ie(e) {
  return e instanceof Map;
}
function oe(e) {
  return e instanceof Set;
}
function ce(e) {
  return ArrayBuffer.isView(e) && !(e instanceof DataView);
}
function le(e) {
  return e instanceof ArrayBuffer;
}
const Ue = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
function se(e) {
  return p(e, Ue);
}
const Ce = /^([0-9]{4})-([0-9]{2})-([0-9]{2})$/;
function ue(e) {
  if (!v(e))
    return !1;
  const t = Ce.exec(e.valueOf());
  if (t == null)
    return !1;
  const [n, r, i] = [t[1], t[2], t[3]].map(Number), o = new Date(Date.UTC(n, r - 1, i));
  return (
    // detects overflows like 02-31
    o.getUTCFullYear() === n && o.getUTCMonth() === r - 1 && o.getUTCDate() === i
  );
}
const He = new RegExp(
  "^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}(:[0-9]{2}([.][0-9]+)?)?(Z|[+-][0-9]{2}:[0-9]{2})?$"
);
function fe(e) {
  return p(e, He) && !isNaN(Date.parse(e.valueOf()));
}
const qe = new RegExp(
  "^((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])[.]){3}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])$"
);
function ge(e) {
  return p(e, qe);
}
const _e = /^[0-9a-fA-F:.]+$/;
function be(e) {
  if (!v(e) || !_e.test(e.valueOf()))
    return !1;
  try {
    return new URL("http://[" + e.valueOf() + "]/"), !0;
  } catch {
    return !1;
  }
}
const Ge = new RegExp(
  "^(?=.{1,253}$)[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$",
  "i"
);
function de(e) {
  return p(e, Ge);
}
function pe(e) {
  return ke(e, 1, 65535);
}
function m(e, t = /* @__PURE__ */ new WeakSet()) {
  switch (!0) {
    case e == null:
    // deliberately also allows undefined
    case P(e):
    case y(e):
    // NaN/Infinity are not serializable
    case v(e):
      return !0;
    case W(e):
      if (t.has(e))
        return !1;
      t.add(e);
      try {
        return F(
          e,
          (n) => n === void 0 ? !1 : m(n, t)
        );
      } finally {
        t.delete(e);
      }
    case N(e):
      if (t.has(e))
        return !1;
      t.add(e);
      try {
        for (let n in e)
          if (e.hasOwnProperty(n) && !m(e[n], t))
            return !1;
        return !0;
      } finally {
        t.delete(e);
      }
  }
  return !1;
}
function xe(e) {
  if (N(e)) {
    for (let t in e)
      if (e.hasOwnProperty(t) && !m(e[t]))
        return !1;
    return !0;
  } else
    return !1;
}
function we(e) {
  if (!v(e))
    return !1;
  try {
    return JSON.parse(e.valueOf()), !0;
  } catch {
    return !1;
  }
}
const We = new RegExp(
  "^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$"
);
function ye(e) {
  return p(e, We);
}
const Ze = /^[0-9a-fA-F]+$/;
function Ie(e) {
  return p(e, Ze);
}
const Ke = /^[\p{ID_Start}_$][\p{ID_Continue}_$\u200C\u200D]*$/u;
function ve(e) {
  return p(e, Ke);
}
const c = !1, l = !0;
function Ye(e, t, n, r, i) {
  if (t == null) {
    if (r)
      return t;
    f(`MissingArgument: no ${s(e)} given`);
  } else if (n(t))
    switch (!0) {
      case t instanceof Boolean:
      case t instanceof Number:
      case t instanceof String:
        return t.valueOf();
      // unboxes any primitives
      default:
        return t;
    }
  else
    f(
      `InvalidArgument: the given ${s(e)} is no valid ${s(i)}`
    );
}
function a(e, t, n) {
  let r = function(o, I) {
    return Ye(
      o,
      I,
      e,
      t,
      n
    );
  }, i = e.name;
  if (i != null && /^ValueIs/.test(i)) {
    let o = i.replace(
      // derive name from validator
      /^ValueIs/,
      t ? "allow" : "expect"
    );
    return Qe(r, o);
  } else
    return r;
}
function Qe(e, t) {
  return e == null && f("MissingArgument: no function given"), typeof e != "function" && f("InvalidArgument: the given 1st Argument is not a JavaScript function"), t == null && f("MissingArgument: no desired name given"), typeof t != "string" && !(t instanceof String) && f("InvalidArgument: the given desired name is not a string"), e.name === t || Object.defineProperty(e, "name", {
    value: t.valueOf()
  }), e;
}
function Xe(e, t, n) {
  return t == null ? void 0 : et(e, t, n);
}
const Mr = Xe;
function Ve(e, t, n) {
  t == null && f(`MissingArgument: no ${s(e)} given`);
  let r;
  switch (!0) {
    // unboxes primitives - but nothing else, as
    case t instanceof Boolean:
    // "valueOf" may return other values
    case t instanceof Number:
    // for other objects (e.g. Dates)
    case t instanceof String:
      r = t.valueOf();
      break;
    default:
      r = t;
  }
  if (n == null || n(r) === !0)
    return r;
  f(`InvalidArgument: the given ${s(e)} is invalid`);
}
const et = Ve, tt = /* @__PURE__ */ a(
  P,
  l,
  "boolean value"
), Dr = tt, nt = /* @__PURE__ */ a(
  P,
  c,
  "boolean value"
), Lr = nt, rt = /* @__PURE__ */ a(
  $,
  l,
  "numeric value"
), Ur = rt, Se = /* @__PURE__ */ a(
  $,
  c,
  "numeric value"
), Cr = Se, at = /* @__PURE__ */ a(
  y,
  l,
  "finite numeric value"
), Hr = at, it = /* @__PURE__ */ a(
  y,
  c,
  "finite numeric value"
), qr = it, ot = /* @__PURE__ */ a(
  z,
  l,
  "NaN value"
), _r = ot, ct = /* @__PURE__ */ a(
  z,
  c,
  "NaN value"
), Gr = ct;
function lt(e, t, n, r, i, o) {
  return t == null ? t : ut(e, t, n, r, i, o);
}
const Wr = lt;
function st(e, t, n, r, i, o) {
  if (Se(e, t), isNaN(t) && f(
    `InvalidArgument: the given ${s(e)} is not-a-number`
  ), i == null && (i = !0), o == null && (o = !0), n != null && isFinite(n)) {
    if (r != null && isFinite(r)) {
      if (t < n || !i && t === n || t > r || !o && t === r)
        throw new RangeError(
          `the given ${s(e)} (${t}) is outside the allowed range (${n}...${r})`
        );
    } else if (t < n || !i && t === n)
      throw new RangeError(
        `the given ${s(e)} is below the allowed minimum (${t} ${i ? "<" : "<="} ${n})`
      );
  } else if (r != null && isFinite(r) && (t > r || !o && t === r))
    throw new RangeError(
      `the given ${s(e)} exceeds the allowed maximum (${t} ${o ? ">" : ">="} ${r})`
    );
  return t.valueOf();
}
const ut = st, ft = /* @__PURE__ */ a(
  E,
  l,
  "integral numeric value"
), Zr = ft, me = /* @__PURE__ */ a(
  E,
  c,
  "integral numeric value"
), Kr = me;
function gt(e, t, n, r) {
  return t == null ? t : dt(e, t, n, r);
}
const Yr = gt;
function bt(e, t, n, r) {
  if (me(e, t), isNaN(t) && f(
    `InvalidArgument: the given ${s(e)} is not-a-number`
  ), n != null && isFinite(n)) {
    if (r != null && isFinite(r)) {
      if (t < n || t > r)
        throw new RangeError(
          `the given ${s(e)} (${t}) is outside the allowed range (${n}...${r})`
        );
    } else if (t < n)
      throw new RangeError(
        `the given ${s(e)} is below the allowed minimum (${t} < ${n})`
      );
  } else if (r != null && isFinite(r) && t > r)
    throw new RangeError(
      `the given ${s(e)} exceeds the allowed maximum (${t} > ${r})`
    );
  return t.valueOf();
}
const dt = bt, pt = /* @__PURE__ */ a(
  J,
  l,
  "ordinal number"
), Qr = pt, xt = /* @__PURE__ */ a(
  J,
  c,
  "ordinal number"
), Xr = xt, wt = /* @__PURE__ */ a(
  T,
  l,
  "cardinal number"
), Vr = wt, yt = /* @__PURE__ */ a(
  T,
  c,
  "cardinal number"
), ea = yt, It = /* @__PURE__ */ a(
  v,
  l,
  "literal string"
), ta = It, Oe = /* @__PURE__ */ a(
  v,
  c,
  "literal string"
), na = Oe, vt = /* @__PURE__ */ a(
  M,
  l,
  "non-empty literal string"
), ra = vt, St = /* @__PURE__ */ a(
  M,
  c,
  "non-empty literal string"
), aa = St;
function mt(e, t, n) {
  return t == null ? t : ht(e, t, n);
}
const ia = mt;
function Ot(e, t, n) {
  if (Oe(e, t), n.test(t))
    return t.valueOf();
  f(
    `InvalidArgument: the given ${s(e)} does not match the specified pattern`
  );
}
const ht = Ot, Nt = /* @__PURE__ */ a(
  D,
  l,
  "literal text"
), oa = Nt, Ft = /* @__PURE__ */ a(
  D,
  c,
  "literal text"
), ca = Ft, Pt = /* @__PURE__ */ a(
  L,
  l,
  "single line of text"
), la = Pt, $t = /* @__PURE__ */ a(
  L,
  c,
  "single line of text"
), sa = $t, Et = /* @__PURE__ */ a(
  U,
  l,
  "JavaScript function"
), ua = Et, jt = /* @__PURE__ */ a(
  U,
  c,
  "JavaScript function"
), fa = jt, Bt = /* @__PURE__ */ a(
  C,
  l,
  "anonymous JavaScript function"
), ga = Bt, Rt = /* @__PURE__ */ a(
  C,
  c,
  "anonymous JavaScript function"
), ba = Rt, kt = /* @__PURE__ */ a(
  H,
  l,
  "named JavaScript function"
), da = kt, zt = /* @__PURE__ */ a(
  H,
  c,
  "named JavaScript function"
), pa = zt, Jt = /* @__PURE__ */ a(
  j,
  l,
  "native JavaScript function"
), xa = Jt, Tt = /* @__PURE__ */ a(
  j,
  c,
  "native JavaScript function"
), wa = Tt, At = /* @__PURE__ */ a(
  q,
  l,
  "scripted JavaScript function"
), ya = At, Mt = /* @__PURE__ */ a(
  q,
  c,
  "scripted JavaScript function"
), Ia = Mt, Dt = /* @__PURE__ */ a(
  _,
  l,
  "JavaScript object"
), va = Dt, he = /* @__PURE__ */ a(
  _,
  c,
  "JavaScript object"
), Sa = he, Lt = /* @__PURE__ */ a(
  N,
  l,
  '"plain" JavaScript object'
), ma = Lt, Ut = /* @__PURE__ */ a(
  N,
  c,
  '"plain" JavaScript object'
), Oa = Ut, Ct = /* @__PURE__ */ a(
  G,
  l,
  '"vanilla" JavaScript object'
), ha = Ct, Ht = /* @__PURE__ */ a(
  G,
  c,
  '"vanilla" JavaScript object'
), Na = Ht;
function qt(e, t) {
  return t == null ? t : Gt(e, t);
}
const Fa = qt;
function _t(e, t) {
  if (t == null && f(`MissingArgument: no ${s(e)} given`), B(t))
    return t;
  f(
    `InvalidArgument: the given ${s(e)} is no JavaScript array`
  );
}
const Gt = _t;
function Wt(e, t, n, r, i) {
  return t == null ? t : Kt(e, t, n, r, i);
}
const Pa = Wt;
function Zt(e, t, n, r, i) {
  if (t == null && f(`MissingArgument: no ${s(e)} given`), W(t, r, i))
    return t;
  f(
    `InvalidArgument: the given ${s(e)} is ` + (n == null ? "either not a list or contains an invalid number of elements" : "no " + s(n))
  );
}
const Kt = Zt;
function Yt(e, t, n, r, i, o) {
  return t == null ? t : Xt(
    e,
    t,
    n,
    r,
    i,
    o
  );
}
const $a = Yt;
function Qt(e, t, n, r, i, o) {
  if (t == null && f(`MissingArgument: no ${s(e)} given`), F(t, n, i, o))
    return t;
  f(
    `InvalidArgument: the given ${s(e)} is ` + (r == null ? "either not a list or contains invalid elements" : "no " + s(r))
  );
}
const Xt = Qt;
function Vt(e, t, n) {
  return t == null ? t : tn(e, t, n);
}
const Ea = Vt;
function en(e, t, n) {
  if (t == null)
    f(`MissingArgument: no ${s(e)} given`);
  else {
    if (F(t, (r) => R(r, n)))
      return t;
    f(`InvalidArgument: the given value is no ${s(e)}`);
  }
}
const tn = en;
function nn(e, t, n, r) {
  return t == null ? t : an(e, t, n, r);
}
const ja = nn;
function rn(e, t, n, r) {
  return t == null && f(`MissingArgument: no ${s(e)} given`), t instanceof n || f(
    `InvalidArgument: the given ${s(e)} is no ${s(r)}`
  ), t;
}
const an = rn;
function on(e, t, n, r) {
  return t == null ? t : ln(e, t, n, r);
}
const Ba = on;
function cn(e, t, n, r) {
  if (t == null && f(`MissingArgument: no ${s(e)} given`), n.isPrototypeOf(t))
    return t;
  f(
    `InvalidArgument: the given ${s(e)} is no ${s(r)}`
  );
}
const ln = cn, sn = /* @__PURE__ */ a(
  Z,
  l,
  "JavaScript Date object"
), Ra = sn, un = /* @__PURE__ */ a(
  Z,
  c,
  "JavaScript Date object"
), ka = un, fn = /* @__PURE__ */ a(
  K,
  l,
  "JavaScript Error object"
), za = fn, gn = /* @__PURE__ */ a(
  K,
  c,
  "JavaScript Error object"
), Ja = gn, bn = /* @__PURE__ */ a(
  Y,
  l,
  'JavaScript Promise (or "Thenable") object'
), Ta = bn, dn = /* @__PURE__ */ a(
  Y,
  c,
  'JavaScript Promise (or "Thenable") object'
), Aa = dn, pn = /* @__PURE__ */ a(
  Q,
  l,
  "JavaScript RegExp object"
), Ma = pn, xn = /* @__PURE__ */ a(
  Q,
  c,
  "JavaScript RegExp object"
), Da = xn;
function wn(e, t, n) {
  return t == null ? t : In(e, t, n);
}
const La = wn;
function yn(e, t, n) {
  if (t == null && f(`MissingArgument: no ${s(e)} given`), R(t, n))
    switch (!0) {
      // unboxes primitives - but nothing else, as
      case t instanceof Boolean:
      // "valueOf" may return other values
      case t instanceof Number:
      // for other objects (e.g. Dates)
      case t instanceof String:
        return t.valueOf();
      default:
        return t;
    }
  else
    f(
      `InvalidArgument: the given ${s(e)} is not among the supported values`
    );
}
const In = yn, vn = /* @__PURE__ */ a(
  X,
  l,
  "CSS color specification"
), Ua = vn, Sn = /* @__PURE__ */ a(
  X,
  c,
  "CSS color specification"
), Ca = Sn, mn = /* @__PURE__ */ a(
  V,
  l,
  "EMail address"
), Ha = mn, On = /* @__PURE__ */ a(
  V,
  c,
  "EMail address"
), qa = On, hn = /* @__PURE__ */ a(
  ee,
  l,
  "URL"
), _a = hn, Nn = /* @__PURE__ */ a(
  ee,
  c,
  "URL"
), Ga = Nn, Fn = /* @__PURE__ */ a(
  te,
  l,
  "phone number"
), Wa = Fn, Pn = /* @__PURE__ */ a(
  te,
  c,
  "phone number"
), Za = Pn, $n = /* @__PURE__ */ a(
  ne,
  l,
  "phone number in E.164 format"
), Ka = $n, En = /* @__PURE__ */ a(
  ne,
  c,
  "phone number in E.164 format"
), Ya = En, jn = /* @__PURE__ */ a(
  re,
  l,
  "BigInt value"
), Qa = jn, Bn = /* @__PURE__ */ a(
  re,
  c,
  "BigInt value"
), Xa = Bn, Rn = /* @__PURE__ */ a(
  ae,
  l,
  "symbol"
), Va = Rn, kn = /* @__PURE__ */ a(
  ae,
  c,
  "symbol"
), ei = kn, zn = /* @__PURE__ */ a(
  ie,
  l,
  "JavaScript Map"
), ti = zn, Jn = /* @__PURE__ */ a(
  ie,
  c,
  "JavaScript Map"
), ni = Jn, Tn = /* @__PURE__ */ a(
  oe,
  l,
  "JavaScript Set"
), ri = Tn, An = /* @__PURE__ */ a(
  oe,
  c,
  "JavaScript Set"
), ai = An, Mn = /* @__PURE__ */ a(
  ce,
  l,
  "typed array"
), ii = Mn, Dn = /* @__PURE__ */ a(
  ce,
  c,
  "typed array"
), oi = Dn, Ln = /* @__PURE__ */ a(
  le,
  l,
  "ArrayBuffer"
), ci = Ln, Un = /* @__PURE__ */ a(
  le,
  c,
  "ArrayBuffer"
), li = Un, Cn = /* @__PURE__ */ a(
  se,
  l,
  "UUID"
), si = Cn, Hn = /* @__PURE__ */ a(
  se,
  c,
  "UUID"
), ui = Hn, qn = /* @__PURE__ */ a(
  ue,
  l,
  "ISO 8601 date"
), fi = qn, _n = /* @__PURE__ */ a(
  ue,
  c,
  "ISO 8601 date"
), gi = _n, Gn = /* @__PURE__ */ a(
  fe,
  l,
  "ISO 8601 timestamp"
), bi = Gn, Wn = /* @__PURE__ */ a(
  fe,
  c,
  "ISO 8601 timestamp"
), di = Wn, Zn = /* @__PURE__ */ a(
  ge,
  l,
  "IPv4 address"
), pi = Zn, Kn = /* @__PURE__ */ a(
  ge,
  c,
  "IPv4 address"
), xi = Kn, Yn = /* @__PURE__ */ a(
  be,
  l,
  "IPv6 address"
), wi = Yn, Qn = /* @__PURE__ */ a(
  be,
  c,
  "IPv6 address"
), yi = Qn, Xn = /* @__PURE__ */ a(
  de,
  l,
  "host name"
), Ii = Xn, Vn = /* @__PURE__ */ a(
  de,
  c,
  "host name"
), vi = Vn, er = /* @__PURE__ */ a(
  pe,
  l,
  "port number"
), Si = er, tr = /* @__PURE__ */ a(
  pe,
  c,
  "port number"
), mi = tr, nr = /* @__PURE__ */ a(
  m,
  l,
  "serializable value"
), Oi = nr, rr = /* @__PURE__ */ a(
  m,
  c,
  "serializable value"
), hi = rr, ar = /* @__PURE__ */ a(
  xe,
  l,
  "serializable object"
), Ni = ar, ir = /* @__PURE__ */ a(
  xe,
  c,
  "serializable object"
), Fi = ir, or = /* @__PURE__ */ a(
  we,
  l,
  "JSON string"
), Pi = or, cr = /* @__PURE__ */ a(
  we,
  c,
  "JSON string"
), $i = cr, lr = /* @__PURE__ */ a(
  ye,
  l,
  "Base64-encoded string"
), Ei = lr, sr = /* @__PURE__ */ a(
  ye,
  c,
  "Base64-encoded string"
), ji = sr, ur = /* @__PURE__ */ a(
  Ie,
  l,
  "hexadecimal string"
), Bi = ur, fr = /* @__PURE__ */ a(
  Ie,
  c,
  "hexadecimal string"
), Ri = fr, gr = /* @__PURE__ */ a(
  ve,
  l,
  "JavaScript identifier"
), ki = gr, br = /* @__PURE__ */ a(
  ve,
  c,
  "JavaScript identifier"
), zi = br, dr = /\\x[0-9a-fA-F]{2}|\\u[0-9a-fA-F]{4}|\\u\{[0-9a-fA-F]+\}|\\[0bfnrtv'"\\\/]?/g, Ne = /[\x00-\x1f\x7f-\x9f]/g;
function s(e) {
  return e.replace(dr, (t) => t === "\\" ? "\\\\" : t).replace(Ne, (t) => {
    switch (t) {
      case "\0":
        return "\\0";
      case "\b":
        return "\\b";
      case "\f":
        return "\\f";
      case `
`:
        return "\\n";
      case "\r":
        return "\\r";
      case "	":
        return "\\t";
      case "\v":
        return "\\v";
      default: {
        const n = t.charCodeAt(0).toString(16);
        return "\\x" + "00".slice(n.length) + n;
      }
    }
  });
}
const pr = /\\[0bfnrtv'"\\\/]|\\x[0-9a-fA-F]{2}|\\u[0-9a-fA-F]{4}|\\u\{[0-9a-fA-F]+\}/g;
function Ji(e) {
  return e.replace(pr, (t) => {
    switch (t) {
      case "\\0":
        return "\0";
      case "\\b":
        return "\b";
      case "\\f":
        return "\f";
      case "\\n":
        return `
`;
      case "\\r":
        return "\r";
      case "\\t":
        return "	";
      case "\\v":
        return "\v";
      case "\\'":
        return "'";
      case '\\"':
        return '"';
      case "\\\\":
        return "\\";
      default: {
        const n = t.charAt(2) === "{" ? parseInt(t.slice(3, -1), 16) : parseInt(t.slice(2), 16);
        return n <= 1114111 ? String.fromCodePoint(n) : t;
      }
    }
  });
}
const xr = /\\x[0-9a-fA-F]{2}|\\u[0-9a-fA-F]{4}|\\u\{[0-9a-fA-F]+\}|\\[0bfnrtv'"\\\/]?|'/g, wr = /\\x[0-9a-fA-F]{2}|\\u[0-9a-fA-F]{4}|\\u\{[0-9a-fA-F]+\}|\\[0bfnrtv'"\\\/]?|"/g, yr = /\\x[0-9a-fA-F]{2}|\\u[0-9a-fA-F]{4}|\\u\{[0-9a-fA-F]+\}|\\[0bfnrtv'"\\\/]?|`|\$\{/g;
function Ir(e, t = '"') {
  const n = t === "'" ? xr : t === "`" ? yr : wr;
  return e.replace(n, (r) => {
    switch (r) {
      case "'":
        return "\\'";
      case '"':
        return '\\"';
      case "`":
        return "\\`";
      case "${":
        return "\\${";
      case "\\":
        return "\\\\";
      default:
        return r;
    }
  }).replace(Ne, (r) => {
    switch (r) {
      case "\0":
        return "\\0";
      case "\b":
        return "\\b";
      case "\f":
        return "\\f";
      case `
`:
        return "\\n";
      case "\r":
        return "\\r";
      case "	":
        return "\\t";
      case "\v":
        return "\\v";
      default: {
        const i = r.charCodeAt(0).toString(16);
        return "\\x" + "00".slice(i.length) + i;
      }
    }
  });
}
function Ti(e, t = '"') {
  return t + Ir(e, t) + t;
}
const vr = /[&<>"'\x00-\x1F\x7F-\x9F\\]/g;
function Sr(e, t) {
  return t = (t || "").trim() || "<br/>", e.replace(vr, (n) => {
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
      default: {
        const r = n.charCodeAt(0).toString(16);
        return "&#x0000".substring(0, 7 - r.length) + r + ";";
      }
    }
  });
}
const mr = /[:`*_\[\]#|~]/g;
function Ai(e, t) {
  return Sr(e, t).replace(
    mr,
    (n) => "&#" + n.charCodeAt(0) + ";"
  );
}
function h(e, t, n, r) {
  if (e === t)
    return !1;
  let i, o;
  n != null && typeof n == "object" ? (i = n.Mode, o = n.Tolerance) : i = n;
  let I = typeof e;
  if (I !== typeof t)
    return !0;
  function x(g, u, d, w) {
    if (!Array.isArray(u) || g.length !== u.length)
      return !0;
    for (let b = 0, S = g.length; b < S; b++)
      if (h(g[b], u[b], d, w))
        return !0;
    return !1;
  }
  function Fe(g, u, d, w) {
    if (!(u instanceof Map) || g.size !== u.size)
      return !0;
    let b = !1;
    return g.forEach(function(S, k) {
      b || (b = !u.has(k) || h(S, u.get(k), d, w));
    }), b;
  }
  function Pe(g, u) {
    if (!(u instanceof Set) || g.size !== u.size)
      return !0;
    let d = !1;
    return g.forEach(function(w) {
      !d && !u.has(w) && (d = !0);
    }), d;
  }
  function $e(g, u) {
    if (Object.getPrototypeOf(g) !== Object.getPrototypeOf(u) || g.byteLength !== u.byteLength)
      return !0;
    let d = new Uint8Array(
      g.buffer,
      g.byteOffset,
      g.byteLength
    ), w = new Uint8Array(
      u.buffer,
      u.byteOffset,
      u.byteLength
    );
    for (let b = 0, S = d.length; b < S; b++)
      if (d[b] !== w[b])
        return !0;
    return !1;
  }
  function Ee(g, u, d, w) {
    if (Object.getPrototypeOf(g) !== Object.getPrototypeOf(u))
      return !0;
    for (let b in g)
      if (!(b in u))
        return !0;
    for (let b in u)
      if (!(b in g) || h(g[b], u[b], d, w))
        return !0;
    return !1;
  }
  switch (I) {
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
      if (o != null)
        return Math.abs(e - t) > o;
      const u = Number.EPSILON * Math.max(
        // default is relative!
        1,
        Math.abs(e),
        Math.abs(t)
      );
      return Math.abs(e - t) > u;
    }
    case "object":
      if (e == null || t == null)
        return !0;
      if (
        // boxed primitives are compared by their values
        e instanceof Boolean || e instanceof Number || e instanceof String
      )
        return i === "by-reference" ? !0 : Object.getPrototypeOf(e) !== Object.getPrototypeOf(t) || e.valueOf() !== t.valueOf();
      if (e instanceof Date) {
        if (i === "by-reference" || !(t instanceof Date))
          return !0;
        let u = e.getTime(), d = t.getTime();
        return u !== d && !(isNaN(u) && isNaN(d));
      }
      if (e instanceof RegExp)
        return i === "by-reference" ? !0 : !(t instanceof RegExp) || e.source !== t.source || e.flags !== t.flags;
      r == null && (r = /* @__PURE__ */ new WeakMap());
      let g = r.get(e);
      return g == null && r.set(e, g = /* @__PURE__ */ new WeakSet()), g.has(t) ? !1 : (g.add(t), Array.isArray(e) ? x(e, t, n, r) : e instanceof Map ? i === "by-reference" ? !0 : Fe(e, t, n, r) : e instanceof Set ? i === "by-reference" ? !0 : Pe(e, t) : ArrayBuffer.isView(e) ? i === "by-reference" ? !0 : $e(e, t) : i === "by-reference" ? !0 : Ee(e, t, n, r));
    default:
      return !0;
  }
}
function Mi(e, t, n) {
  return !h(e, t, n);
}
function Or(e) {
  he("candidate", e);
  for (let t in e)
    if (je(e, t))
      return !1;
  return !0;
}
function Di(e) {
  return !Or(e);
}
function hr(e) {
  return /^\s*$/.test(e);
}
function Li(e) {
  return !hr(e);
}
function Ui(e, t = -1 / 0, n = 1 / 0) {
  return Math.max(t, Math.min(e, n));
}
const O = /* @__PURE__ */ Object.freeze({
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
});
function Nr(e) {
  let t = e.toLowerCase();
  if (O.hasOwnProperty(t) && (e = O[t]), /^#[a-fA-F0-9]{6}$/.test(e))
    return e + "FF";
  if (/^#[a-fA-F0-9]{8}$/.test(e))
    return e;
  const n = "0123456789ABCDEF";
  function r(x) {
    return x = Math.max(0, Math.min(255, Math.round(x))), n[Math.trunc(x / 16)] + n[x % 16];
  }
  let o = /^rgb\(([0-9]+),\s*([0-9]+),\s*([0-9]+)\)$/i.exec(e);
  if (o != null)
    return "#" + r(parseInt(o[1], 10)) + r(parseInt(o[2], 10)) + r(parseInt(o[3], 10)) + "FF";
  if (o = /^rgba\(([0-9]+),\s*([0-9]+),\s*([0-9]+),\s*([01]?[.][0-9]+|[01])\)$/i.exec(e), o != null)
    return "#" + r(parseInt(o[1], 10)) + r(parseInt(o[2], 10)) + r(parseInt(o[3], 10)) + r(parseFloat(o[4]) * 255);
  f("InvalidArgument: the given Value is not a valid CSS Color specification");
}
function Ci(e) {
  let t = e.toLowerCase();
  if (O.hasOwnProperty(t))
    return O[t];
  if (/^#[a-fA-F0-9]{6}$/.test(e))
    return "rgba(" + parseInt(e.slice(1, 3), 16) + "," + parseInt(e.slice(3, 5), 16) + "," + parseInt(e.slice(5, 7), 16) + ",1)";
  if (/^#[a-fA-F0-9]{8}$/.test(e))
    return "rgba(" + parseInt(e.slice(1, 3), 16) + "," + parseInt(e.slice(3, 5), 16) + "," + parseInt(e.slice(5, 7), 16) + "," + parseInt(e.slice(7), 16) / 255 + ")";
  let r = /^rgb\(([0-9]+),\s*([0-9]+),\s*([0-9]+)\)$/i.exec(e);
  if (r != null)
    return e.slice(0, e.length - 1) + ",1)";
  if (r = /^rgba\(([0-9]+),\s*([0-9]+),\s*([0-9]+),\s*([01]?[.][0-9]+|[01])\)$/i.exec(e), r != null)
    return e;
  f("InvalidArgument: the given Value is not a valid CSS Color specification");
}
function Hi(e) {
  return Nr(e).slice(0, 7);
}
export {
  O as ColorSet,
  Qe as FunctionWithName,
  Sr as HTMLsafe,
  Nr as HexColor,
  Ai as MarkDownSafe,
  Or as ObjectIsEmpty,
  Di as ObjectIsNotEmpty,
  jr as ObjectMergedWith,
  je as Object_hasOwnProperty,
  Be as Object_isPrototypeOf,
  Pr as Object_propertyIsEnumerable,
  $r as Object_toLocaleString,
  Re as Object_toString,
  Er as Object_valueOf,
  Ci as RGBAColor,
  hr as StringIsEmpty,
  Li as StringIsNotEmpty,
  a as ValidatorForClassifier,
  Br as ValueExists,
  Ar as ValueInheritsFrom,
  C as ValueIsAnonymousFunction,
  B as ValueIsArray,
  le as ValueIsArrayBuffer,
  ye as ValueIsBase64,
  re as ValueIsBigInt,
  P as ValueIsBoolean,
  T as ValueIsCardinal,
  X as ValueIsColor,
  Z as ValueIsDate,
  ne as ValueIsE164PhoneNumber,
  V as ValueIsEMailAddress,
  zr as ValueIsEmptyString,
  K as ValueIsError,
  y as ValueIsFiniteNumber,
  U as ValueIsFunction,
  Ie as ValueIsHexString,
  de as ValueIsHostName,
  ge as ValueIsIPv4Address,
  be as ValueIsIPv6Address,
  ue as ValueIsISODate,
  fe as ValueIsISOTimestamp,
  ve as ValueIsIdentifier,
  Tr as ValueIsInstanceOf,
  E as ValueIsInteger,
  ke as ValueIsIntegerInRange,
  we as ValueIsJSONString,
  W as ValueIsList,
  Jr as ValueIsListOf,
  F as ValueIsListSatisfying,
  ie as ValueIsMap,
  Rr as ValueIsMissing,
  z as ValueIsNaN,
  H as ValueIsNamedFunction,
  j as ValueIsNativeFunction,
  M as ValueIsNonEmptyString,
  $ as ValueIsNumber,
  kr as ValueIsNumberInRange,
  _ as ValueIsObject,
  R as ValueIsOneOf,
  J as ValueIsOrdinal,
  te as ValueIsPhoneNumber,
  N as ValueIsPlainObject,
  pe as ValueIsPortNumber,
  Y as ValueIsPromise,
  Q as ValueIsRegExp,
  q as ValueIsScriptedFunction,
  xe as ValueIsSerializableObject,
  m as ValueIsSerializableValue,
  oe as ValueIsSet,
  v as ValueIsString,
  p as ValueIsStringMatching,
  ae as ValueIsSymbol,
  D as ValueIsText,
  L as ValueIsTextline,
  ce as ValueIsTypedArray,
  ee as ValueIsURL,
  se as ValueIsUUID,
  G as ValueIsVanillaObject,
  Mi as ValuesAreEqual,
  h as ValuesDiffer,
  l as acceptNil,
  Bt as allowAnonymousFunction,
  qt as allowArray,
  Ln as allowArrayBuffer,
  lr as allowBase64,
  jn as allowBigInt,
  tt as allowBoolean,
  wt as allowCardinal,
  vn as allowColor,
  sn as allowDate,
  $n as allowE164PhoneNumber,
  mn as allowEMailAddress,
  fn as allowError,
  at as allowFiniteNumber,
  Et as allowFunction,
  ur as allowHexString,
  Xn as allowHostName,
  Zn as allowIPv4Address,
  Yn as allowIPv6Address,
  qn as allowISODate,
  Gn as allowISOTimestamp,
  gr as allowIdentifier,
  nn as allowInstanceOf,
  ft as allowInteger,
  gt as allowIntegerInRange,
  or as allowJSONString,
  Wt as allowList,
  Vt as allowListOf,
  Yt as allowListSatisfying,
  zn as allowMap,
  ot as allowNaN,
  kt as allowNamedFunction,
  Jt as allowNativeFunction,
  vt as allowNonEmptyString,
  rt as allowNumber,
  lt as allowNumberInRange,
  Dt as allowObject,
  wn as allowOneOf,
  pt as allowOrdinal,
  Fn as allowPhoneNumber,
  Lt as allowPlainObject,
  er as allowPortNumber,
  bn as allowPromise,
  pn as allowRegExp,
  At as allowScriptedFunction,
  ar as allowSerializableObject,
  nr as allowSerializableValue,
  Tn as allowSet,
  It as allowString,
  mt as allowStringMatching,
  Rn as allowSymbol,
  Nt as allowText,
  Pt as allowTextline,
  Mn as allowTypedArray,
  hn as allowURL,
  Cn as allowUUID,
  Xe as allowValue,
  on as allowValueInheritingFrom,
  Ct as allowVanillaObject,
  ga as allowedAnonymousFunction,
  Fa as allowedArray,
  ci as allowedArrayBuffer,
  Ei as allowedBase64,
  Qa as allowedBigInt,
  Dr as allowedBoolean,
  Vr as allowedCardinal,
  Ua as allowedColor,
  Ra as allowedDate,
  Ka as allowedE164PhoneNumber,
  Ha as allowedEMailAddress,
  za as allowedError,
  Hr as allowedFiniteNumber,
  ua as allowedFunction,
  Bi as allowedHexString,
  Ii as allowedHostName,
  pi as allowedIPv4Address,
  wi as allowedIPv6Address,
  fi as allowedISODate,
  bi as allowedISOTimestamp,
  ki as allowedIdentifier,
  ja as allowedInstanceOf,
  Zr as allowedInteger,
  Yr as allowedIntegerInRange,
  Pi as allowedJSONString,
  Pa as allowedList,
  Ea as allowedListOf,
  $a as allowedListSatisfying,
  ti as allowedMap,
  _r as allowedNaN,
  da as allowedNamedFunction,
  xa as allowedNativeFunction,
  ra as allowedNonEmptyString,
  Ur as allowedNumber,
  Wr as allowedNumberInRange,
  va as allowedObject,
  La as allowedOneOf,
  Qr as allowedOrdinal,
  Wa as allowedPhoneNumber,
  ma as allowedPlainObject,
  Si as allowedPortNumber,
  Ta as allowedPromise,
  Ma as allowedRegExp,
  ya as allowedScriptedFunction,
  Ni as allowedSerializableObject,
  Oi as allowedSerializableValue,
  ri as allowedSet,
  ta as allowedString,
  ia as allowedStringMatching,
  Va as allowedSymbol,
  oa as allowedText,
  la as allowedTextline,
  ii as allowedTypedArray,
  _a as allowedURL,
  si as allowedUUID,
  Mr as allowedValue,
  Ba as allowedValueInheritingFrom,
  ha as allowedVanillaObject,
  Ui as constrained,
  s as escaped,
  Rt as expectAnonymousFunction,
  _t as expectArray,
  Un as expectArrayBuffer,
  sr as expectBase64,
  Bn as expectBigInt,
  nt as expectBoolean,
  yt as expectCardinal,
  Sn as expectColor,
  un as expectDate,
  En as expectE164PhoneNumber,
  On as expectEMailAddress,
  gn as expectError,
  it as expectFiniteNumber,
  jt as expectFunction,
  fr as expectHexString,
  Vn as expectHostName,
  Kn as expectIPv4Address,
  Qn as expectIPv6Address,
  _n as expectISODate,
  Wn as expectISOTimestamp,
  br as expectIdentifier,
  rn as expectInstanceOf,
  me as expectInteger,
  bt as expectIntegerInRange,
  cr as expectJSONString,
  Zt as expectList,
  en as expectListOf,
  Qt as expectListSatisfying,
  Jn as expectMap,
  ct as expectNaN,
  zt as expectNamedFunction,
  Tt as expectNativeFunction,
  St as expectNonEmptyString,
  Se as expectNumber,
  st as expectNumberInRange,
  he as expectObject,
  yn as expectOneOf,
  xt as expectOrdinal,
  Pn as expectPhoneNumber,
  Ut as expectPlainObject,
  tr as expectPortNumber,
  dn as expectPromise,
  xn as expectRegExp,
  Mt as expectScriptedFunction,
  ir as expectSerializableObject,
  rr as expectSerializableValue,
  An as expectSet,
  Oe as expectString,
  Ot as expectStringMatching,
  kn as expectSymbol,
  Ft as expectText,
  $t as expectTextline,
  Dn as expectTypedArray,
  Nn as expectURL,
  Hn as expectUUID,
  Ve as expectValue,
  cn as expectValueInheritingFrom,
  Ht as expectVanillaObject,
  ba as expectedAnonymousFunction,
  Gt as expectedArray,
  li as expectedArrayBuffer,
  ji as expectedBase64,
  Xa as expectedBigInt,
  Lr as expectedBoolean,
  ea as expectedCardinal,
  Ca as expectedColor,
  ka as expectedDate,
  Ya as expectedE164PhoneNumber,
  qa as expectedEMailAddress,
  Ja as expectedError,
  qr as expectedFiniteNumber,
  fa as expectedFunction,
  Ri as expectedHexString,
  vi as expectedHostName,
  xi as expectedIPv4Address,
  yi as expectedIPv6Address,
  gi as expectedISODate,
  di as expectedISOTimestamp,
  zi as expectedIdentifier,
  an as expectedInstanceOf,
  Kr as expectedInteger,
  dt as expectedIntegerInRange,
  $i as expectedJSONString,
  Kt as expectedList,
  tn as expectedListOf,
  Xt as expectedListSatisfying,
  ni as expectedMap,
  Gr as expectedNaN,
  pa as expectedNamedFunction,
  wa as expectedNativeFunction,
  aa as expectedNonEmptyString,
  Cr as expectedNumber,
  ut as expectedNumberInRange,
  Sa as expectedObject,
  In as expectedOneOf,
  Xr as expectedOrdinal,
  Za as expectedPhoneNumber,
  Oa as expectedPlainObject,
  mi as expectedPortNumber,
  Aa as expectedPromise,
  Da as expectedRegExp,
  Ia as expectedScriptedFunction,
  Fi as expectedSerializableObject,
  hi as expectedSerializableValue,
  ai as expectedSet,
  na as expectedString,
  ht as expectedStringMatching,
  ei as expectedSymbol,
  ca as expectedText,
  sa as expectedTextline,
  oi as expectedTypedArray,
  Ga as expectedURL,
  ui as expectedUUID,
  et as expectedValue,
  ln as expectedValueInheritingFrom,
  Na as expectedVanillaObject,
  Fr as global,
  Ir as quotable,
  Ti as quoted,
  c as rejectNil,
  Hi as shortHexColor,
  f as throwError,
  Ji as unescaped,
  Ye as validatedArgument
};
//# sourceMappingURL=javascript-interface-library.esm.js.map
