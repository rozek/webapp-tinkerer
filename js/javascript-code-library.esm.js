const $0 = /* @__PURE__ */ Function("return this")();
function jd(e, t) {
  return e == null || // let this method crash like its original
  "hasOwnProperty" in e && typeof e.hasOwnProperty == "function" ? e.hasOwnProperty(t) : Object.prototype.hasOwnProperty.call(e, t);
}
function Id(e, t) {
  return e == null || // let this method crash like its original
  "isPrototypeOf" in e && typeof e.isPrototypeOf == "function" ? e.isPrototypeOf(t) : Object.prototype.isPrototypeOf.call(e, t);
}
function j0(e, t) {
  return e == null || // let this method crash like its original
  "propertyIsEnumerable" in e && typeof e.propertyIsEnumerable == "function" ? e.propertyIsEnumerable(t) : Object.prototype.propertyIsEnumerable.call(e, t);
}
function _d(e) {
  return e == null || // let this method crash like its original
  "toString" in e && typeof e.toString == "function" ? e.toString() : Object.prototype.toString.call(e);
}
function I0(e) {
  return e == null || // let this method crash like its original
  "toLocaleString" in e && typeof e.toLocaleString == "function" ? e.toLocaleString() : _d(e);
}
function _0(e) {
  return e == null || // let this method crash like its original
  "valueOf" in e && typeof e.valueOf == "function" ? e.valueOf() : Object.prototype.valueOf.call(e);
}
function S0(e, ...t) {
  for (let n = 0, o = t.length; n < o; n++) {
    let r = t[n];
    if (r != null)
      if (typeof r == "object")
        for (let a in r) {
          let i = Object.getOwnPropertyDescriptor(r, a);
          i != null && Object.defineProperty(e, a, i);
        }
      else
        et("InvalidArgument: argument #" + (n + 1) + " is not an object");
  }
  return e;
}
function et(e) {
  let t = /^([$a-zA-Z][$a-zA-Z0-9]*):\s*(\S.+)\s*$/.exec(e);
  if (t == null)
    throw new Error(e);
  {
    let n = new Error(t[2]);
    throw n.name = t[1], n;
  }
}
function D0(e) {
  return e != null;
}
function L0(e) {
  return e == null;
}
function rn(e) {
  return typeof e == "boolean" || e instanceof Boolean;
}
function bt(e) {
  return typeof e == "number" || e instanceof Number;
}
function Kt(e) {
  return (typeof e == "number" || e instanceof Number) && isFinite(e.valueOf());
}
function Ls(e) {
  return (typeof e == "number" || e instanceof Number) && isNaN(e.valueOf());
}
function Io(e, t, n, o = !0, r = !0) {
  if (!bt(e) || isNaN(e))
    return !1;
  if (Kt(t)) {
    if (Kt(n)) {
      if (e < t || !o && e === t || e > n || !r && e === n)
        return !1;
    } else if (e < t || !o && e === t)
      return !1;
  } else if (Kt(n) && (e > n || !r && e === n))
    return !1;
  return !0;
}
function xr(e) {
  return typeof e != "number" && !(e instanceof Number) ? !1 : (e = e.valueOf(), isFinite(e) && Math.round(e) === e);
}
function ua(e, t, n) {
  if (!xr(e) || isNaN(e))
    return !1;
  if (Kt(t)) {
    if (Kt(n)) {
      if (e < t || e > n)
        return !1;
    } else if (e < t)
      return !1;
  } else if (Kt(n) && e > n)
    return !1;
  return !0;
}
function pn(e) {
  return typeof e != "number" && !(e instanceof Number) ? !1 : (e = e.valueOf(), isFinite(e) && Math.round(e) === e && e >= 0);
}
function pa(e) {
  return typeof e != "number" && !(e instanceof Number) ? !1 : (e = e.valueOf(), isFinite(e) && Math.round(e) === e && e >= 1);
}
function at(e) {
  return typeof e == "string" || e instanceof String;
}
const Ms = /^\s*$/;
function M0(e) {
  return (typeof e == "string" || e instanceof String) && Ms.test(e.valueOf());
}
function As(e) {
  return (typeof e == "string" || e instanceof String) && !Ms.test(e.valueOf());
}
function Ct(e, t) {
  return (typeof e == "string" || e instanceof String) && t.test(e.valueOf());
}
const Sd = /^[^\x00-\x09\x0B\x0C\x0E-\x1F\x7F-\x9F\u2028\u2029\uFFF9-\uFFFB]*$/;
function hn(e) {
  return Ct(e, Sd);
}
const Dd = /^[^\x00-\x1F\x7F-\x9F\u2028\u2029\uFFF9-\uFFFB]*$/;
function Ne(e) {
  return Ct(e, Dd);
}
function Nt(e) {
  return typeof e == "function";
}
function Ts(e) {
  return typeof e == "function" && (e.name == null || e.name === "");
}
function Rs(e) {
  return typeof e == "function" && e.name != null && e.name !== "";
}
function Fs(e) {
  return typeof e == "function" && /^function\s*[^(]*\(\)\s*\{\s*\[native code\]\s*\}\s*$/.test(e.toString());
}
function Os(e) {
  return typeof e == "function" && !/^function\s*[^(]*\(\)\s*\{\s*\[native code\]\s*\}\s*$/.test(e.toString());
}
function fa(e) {
  return e != null && typeof e == "object";
}
function ha(e) {
  return e != null && typeof e == "object" && Object.getPrototypeOf(e) === Object.prototype;
}
function zs(e) {
  return e != null && typeof e == "object" && !(e instanceof Object);
}
const _o = Array.isArray;
function Ld(e, t, n) {
  if (_o(e)) {
    for (let o = 0, r = e.length; o < r; o++)
      if (e[o] === void 0)
        return !1;
    return !(t != null && e.length < t || n != null && e.length > n);
  }
  return !1;
}
function Ie(e, t, n, o) {
  if (_o(e))
    try {
      for (let r = 0, a = e.length; r < a; r++)
        if (!t(e[r]))
          return !1;
      return !(n != null && e.length < n || o != null && e.length > o);
    } catch {
    }
  return !1;
}
function A0(e, t) {
  return e instanceof t;
}
function T0(e, t) {
  return Id(t, e);
}
function Ns(e) {
  return e instanceof Date;
}
function Es(e) {
  return e instanceof Error;
}
function Vs(e) {
  return e instanceof RegExp;
}
function he(e, t) {
  return t.indexOf(e) >= 0;
}
function Dn(e) {
  if (!at(e))
    return !1;
  let t = e.valueOf().toLowerCase();
  return yo.hasOwnProperty(t) || /^#[a-fA-F0-9]{6}$/.test(t) || /^#[a-fA-F0-9]{8}$/.test(t) || /^rgb\([0-9]+,\s*[0-9]+,\s*[0-9]+\)$/.test(t) || // not perfect
  /^rgba\([0-9]+,\s*[0-9]+,\s*[0-9]+,\s*([01]|[01]?[.][0-9]+)\)$/.test(t);
}
const Md = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
function Ln(e) {
  return Ct(e, Md);
}
const Ad = /^[^\s\x00-\x1F\x7F-\x9F\u2028\u2029\uFFF9-\uFFFB]*$/;
function st(e) {
  if (!Ct(e, Ad) || e === "")
    return !1;
  try {
    return new URL(e, "file://"), !0;
  } catch {
    return !1;
  }
}
const Td = /^\+[1-9][0-9]{6,14}$/;
function Bs(e) {
  return Ct(e, Td);
}
const Ze = !1, Qe = !0;
function Rd(e, t, n, o, r) {
  if (t == null) {
    if (o)
      return t;
    et(`MissingArgument: no ${Ke(e)} given`);
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
    et(
      `InvalidArgument: the given ${Ke(e)} is no valid ${Ke(r)}`
    );
}
function Ce(e, t, n) {
  let o = function(a, i) {
    return Rd(
      a,
      i,
      e,
      t,
      n
    );
  }, r = e.name;
  if (r != null && /^ValueIs/.test(r)) {
    let a = r.replace(
      // derive name from validator
      /^ValueIs/,
      t ? "allow" : "expect"
    );
    return Fd(o, a);
  } else
    return o;
}
function Fd(e, t) {
  if (e == null && et("MissingArgument: no function given"), typeof e != "function" && et("InvalidArgument: the given 1st Argument is not a JavaScript function"), t == null && et("MissingArgument: no desired name given"), typeof t != "string" && !(t instanceof String) && et("InvalidArgument: the given desired name is not a string"), e.name === t)
    return e;
  try {
    if (Object.defineProperty(e, "name", { value: t }), e.name === t)
      return e;
  } catch {
  }
  return new Function(
    "originalFunction",
    "return function " + t + " () {return originalFunction.apply(this,Array.prototype.slice.apply(arguments))}"
  )(e);
}
function Od(e, t) {
  if (t == null)
    et(`MissingArgument: no ${Ke(e)} given`);
  else
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
}
const R0 = Od, tn = /* @__PURE__ */ Ce(
  rn,
  Qe,
  "boolean value"
), F0 = tn, ga = /* @__PURE__ */ Ce(
  rn,
  Ze,
  "boolean value"
), O0 = ga, zd = /* @__PURE__ */ Ce(
  bt,
  Qe,
  "numeric value"
), z0 = zd, Ws = /* @__PURE__ */ Ce(
  bt,
  Ze,
  "numeric value"
), N0 = Ws, Nd = /* @__PURE__ */ Ce(
  Kt,
  Qe,
  "finite numeric value"
), E0 = Nd, Ed = /* @__PURE__ */ Ce(
  Kt,
  Ze,
  "finite numeric value"
), V0 = Ed, Vd = /* @__PURE__ */ Ce(
  Ls,
  Qe,
  "NaN value"
), B0 = Vd, Bd = /* @__PURE__ */ Ce(
  Ls,
  Ze,
  "NaN value"
), W0 = Bd;
function Wd(e, t, n, o, r, a) {
  return t == null ? t : Gd(e, t, n, o, r, a);
}
const H0 = Wd;
function Hd(e, t, n, o, r, a) {
  if (Ws(e, t), isNaN(t) && et(
    `InvalidArgument: the given ${Ke(e)} is not-a-number`
  ), r == null && (r = !0), a == null && (a = !0), n != null && isFinite(n)) {
    if (o != null && isFinite(o)) {
      if (t < n || !r && t === n || t > o || !a && t === o)
        throw new RangeError(
          `the given ${Ke(e)} (${t}) is outside the allowed range (${n}...${o})`
        );
    } else if (t < n || !r && t === n)
      throw new RangeError(
        `the given ${Ke(e)} is below the allowed minimum (${t} ${r ? "<" : "<="} ${n})`
      );
  } else if (o != null && isFinite(o) && (t > o || !a && t === o))
    throw new RangeError(
      `the given ${Ke(e)} exceeds the allowed maximum (${t} ${a ? ">" : ">="} ${o})`
    );
  return t.valueOf();
}
const Gd = Hd, Ud = /* @__PURE__ */ Ce(
  xr,
  Qe,
  "integral numeric value"
), G0 = Ud, Hs = /* @__PURE__ */ Ce(
  xr,
  Ze,
  "integral numeric value"
), U0 = Hs;
function Kd(e, t, n, o) {
  return t == null ? t : qd(e, t, n, o);
}
const K0 = Kd;
function Gs(e, t, n, o) {
  if (Hs(e, t), isNaN(t) && et(
    `InvalidArgument: the given ${Ke(e)} is not-a-number`
  ), n != null && isFinite(n)) {
    if (o != null && isFinite(o)) {
      if (t < n || t > o)
        throw new RangeError(
          `the given ${Ke(e)} (${t}) is outside the allowed range (${n}...${o})`
        );
    } else if (t < n)
      throw new RangeError(
        `the given ${Ke(e)} is below the allowed minimum (${t} < ${n})`
      );
  } else if (o != null && isFinite(o) && t > o)
    throw new RangeError(
      `the given ${Ke(e)} exceeds the allowed maximum (${t} > ${o})`
    );
  return t.valueOf();
}
const qd = Gs, Us = /* @__PURE__ */ Ce(
  pn,
  Qe,
  "ordinal number"
), q0 = Us, Un = /* @__PURE__ */ Ce(
  pn,
  Ze,
  "ordinal number"
), X0 = Un, vr = /* @__PURE__ */ Ce(
  pa,
  Qe,
  "cardinal number"
), zi = vr, Ks = /* @__PURE__ */ Ce(
  pa,
  Ze,
  "cardinal number"
), Y0 = Ks, wr = /* @__PURE__ */ Ce(
  at,
  Qe,
  "literal string"
), J0 = wr, ma = /* @__PURE__ */ Ce(
  at,
  Ze,
  "literal string"
), Z0 = ma, Xd = /* @__PURE__ */ Ce(
  As,
  Qe,
  "non-empty literal string"
), Q0 = Xd, Yd = /* @__PURE__ */ Ce(
  As,
  Ze,
  "non-empty literal string"
), P0 = Yd;
function Jd(e, t, n) {
  return t == null ? t : Zd(e, t, n);
}
const ex = Jd;
function qs(e, t, n) {
  if (ma(e, t), n.test(t))
    return t.valueOf();
  et(
    `InvalidArgument: the given ${Ke(e)} does not match the specified pattern`
  );
}
const Zd = qs, Qd = /* @__PURE__ */ Ce(
  hn,
  Qe,
  "literal text"
), tx = Qd, ot = /* @__PURE__ */ Ce(
  hn,
  Ze,
  "literal text"
), nx = ot, un = /* @__PURE__ */ Ce(
  Ne,
  Qe,
  "single line of text"
), ox = un, an = /* @__PURE__ */ Ce(
  Ne,
  Ze,
  "single line of text"
), rx = an, Re = /* @__PURE__ */ Ce(
  Nt,
  Qe,
  "JavaScript function"
), ax = Re, Yt = /* @__PURE__ */ Ce(
  Nt,
  Ze,
  "JavaScript function"
), ix = Yt, Pd = /* @__PURE__ */ Ce(
  Ts,
  Qe,
  "anonymous JavaScript function"
), sx = Pd, eu = /* @__PURE__ */ Ce(
  Ts,
  Ze,
  "anonymous JavaScript function"
), lx = eu, tu = /* @__PURE__ */ Ce(
  Rs,
  Qe,
  "named JavaScript function"
), cx = tu, nu = /* @__PURE__ */ Ce(
  Rs,
  Ze,
  "named JavaScript function"
), dx = nu, ou = /* @__PURE__ */ Ce(
  Fs,
  Qe,
  "native JavaScript function"
), ux = ou, ru = /* @__PURE__ */ Ce(
  Fs,
  Ze,
  "native JavaScript function"
), px = ru, au = /* @__PURE__ */ Ce(
  Os,
  Qe,
  "scripted JavaScript function"
), fx = au, iu = /* @__PURE__ */ Ce(
  Os,
  Ze,
  "scripted JavaScript function"
), hx = iu, su = /* @__PURE__ */ Ce(
  fa,
  Qe,
  "JavaScript object"
), gx = su, Xs = /* @__PURE__ */ Ce(
  fa,
  Ze,
  "JavaScript object"
), mx = Xs, ba = /* @__PURE__ */ Ce(
  ha,
  Qe,
  '"plain" JavaScript object'
), bx = ba, It = /* @__PURE__ */ Ce(
  ha,
  Ze,
  '"plain" JavaScript object'
), yx = It, lu = /* @__PURE__ */ Ce(
  zs,
  Qe,
  '"vanilla" JavaScript object'
), xx = lu, cu = /* @__PURE__ */ Ce(
  zs,
  Ze,
  '"vanilla" JavaScript object'
), vx = cu;
function du(e, t) {
  return t == null ? t : pu(e, t);
}
const wx = du;
function uu(e, t) {
  if (t == null && et(`MissingArgument: no ${Ke(e)} given`), _o(t))
    return t;
  et(
    `InvalidArgument: the given ${Ke(e)} is no JavaScript array`
  );
}
const pu = uu;
function fu(e, t, n, o, r) {
  return t == null ? t : gu(e, t, n, o, r);
}
const kx = fu;
function hu(e, t, n, o, r) {
  if (t == null && et(`MissingArgument: no ${Ke(e)} given`), Ld(t, o, r))
    return t;
  et(
    `InvalidArgument: the given ${Ke(e)} is ` + (n == null ? "either not a list or contains an invalid number of elements" : "no " + Ke(n))
  );
}
const gu = hu;
function Wt(e, t, n, o, r, a) {
  return t == null ? t : bu(
    e,
    t,
    n,
    o,
    r,
    a
  );
}
const Cx = Wt;
function mu(e, t, n, o, r, a) {
  if (t == null && et(`MissingArgument: no ${Ke(e)} given`), Ie(t, n, r, a))
    return t;
  et(
    `InvalidArgument: the given ${Ke(e)} is ` + (o == null ? "either not a list or contains invalid elements" : "no " + Ke(o))
  );
}
const bu = mu;
function yu(e, t, n, o) {
  return t == null ? t : xu(e, t, n, o);
}
const $x = yu;
function So(e, t, n, o) {
  return t == null && et(`MissingArgument: no ${Ke(e)} given`), t instanceof n || et(
    `InvalidArgument: the given ${Ke(e)} is no ${Ke(o)}`
  ), t;
}
const xu = So;
function vu(e, t, n, o) {
  return t == null ? t : ku(e, t, n, o);
}
const jx = vu;
function wu(e, t, n, o) {
  if (t == null && et(`MissingArgument: no ${Ke(e)} given`), n.isPrototypeOf(t))
    return t;
  et(
    `InvalidArgument: the given ${Ke(e)} is no ${Ke(o)}`
  );
}
const ku = wu, Cu = /* @__PURE__ */ Ce(
  Ns,
  Qe,
  "JavaScript Date object"
), Ix = Cu, $u = /* @__PURE__ */ Ce(
  Ns,
  Ze,
  "JavaScript Date object"
), _x = $u, ju = /* @__PURE__ */ Ce(
  Es,
  Qe,
  "JavaScript Error object"
), Sx = ju, Iu = /* @__PURE__ */ Ce(
  Es,
  Ze,
  "JavaScript Error object"
), Dx = Iu, _u = /* @__PURE__ */ Ce(
  Vs,
  Qe,
  "JavaScript RegExp object"
), Lx = _u, Su = /* @__PURE__ */ Ce(
  Vs,
  Ze,
  "JavaScript RegExp object"
), Mx = Su;
function Ft(e, t, n) {
  return t == null ? t : Du(e, t, n);
}
const Ax = Ft;
function Bn(e, t, n) {
  if (t == null && et(`MissingArgument: no ${Ke(e)} given`), he(t, n))
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
    et(
      `InvalidArgument: the given ${Ke(e)} is not among the supported values`
    );
}
const Du = Bn, Lu = /* @__PURE__ */ Ce(
  Dn,
  Qe,
  "CSS color specification"
), Tx = Lu, Mu = /* @__PURE__ */ Ce(
  Dn,
  Ze,
  "CSS color specification"
), Rx = Mu, Au = /* @__PURE__ */ Ce(
  Ln,
  Qe,
  "EMail address"
), Fx = Au, Tu = /* @__PURE__ */ Ce(
  Ln,
  Ze,
  "EMail address"
), Ox = Tu, Vn = /* @__PURE__ */ Ce(
  st,
  Qe,
  "URL"
), zx = Vn, ya = /* @__PURE__ */ Ce(
  st,
  Ze,
  "URL"
), Nx = ya, Ru = /* @__PURE__ */ Ce(
  Bs,
  Qe,
  "phone number in E.164 format"
), Ex = Ru, Fu = /* @__PURE__ */ Ce(
  Bs,
  Ze,
  "phone number in E.164 format"
), Vx = Fu;
function Ke(e) {
  const t = /\\x[0-9a-fA-F]{2}|\\u[0-9a-fA-F]{4}|\\[0bfnrtv'"\\\/]?/g, n = /[\x00-\x1f\x7f-\x9f]/g;
  return e.replace(t, function(o) {
    return o === "\\" ? "\\\\" : o;
  }).replace(n, function(o) {
    switch (o) {
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
        let r = o.charCodeAt(0).toString(16);
        return "\\x" + "00".slice(r.length) + r;
      }
    }
  });
}
function Bx(e) {
  const t = /\\[0bfnrtv'"\\\/]|\\x[0-9a-fA-F]{2}|\\u[0-9a-fA-F]{4}/g;
  return e.replace(t, function(n) {
    switch (n) {
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
        let o = parseInt(n.slice(2), 16);
        return String.fromCharCode(o);
      }
    }
  });
}
function Ou(e, t = '"') {
  const n = /\\x[0-9a-fA-F]{2}|\\u[0-9a-fA-F]{4}|\\[0bfnrtv'"\\\/]?|'/g, o = /\\x[0-9a-fA-F]{2}|\\u[0-9a-fA-F]{4}|\\[0bfnrtv'"\\\/]?|"/g, r = /[\x00-\x1f\x7f-\x9f]/g;
  return e.replace(
    t === "'" ? n : o,
    function(a) {
      switch (a) {
        case "'":
          return "\\'";
        case '"':
          return '\\"';
        case "\\":
          return "\\\\";
        default:
          return a;
      }
    }
  ).replace(r, function(a) {
    switch (a) {
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
        let i = a.charCodeAt(0).toString(16);
        return "\\x" + "00".slice(i.length) + i;
      }
    }
  });
}
function Lt(e, t = '"') {
  return t + Ou(e, t) + t;
}
function zu(e, t) {
  return t = (t || "").trim() || "<br/>", e.replace(
    /[&<>"'\x00-\x1F\x7F-\x9F\\]/g,
    function(n) {
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
          let o = n.charCodeAt(0).toString(16);
          return "&#x0000".substring(0, 7 - o.length) + o + ";";
      }
    }
  );
}
function Wx(e, t) {
  return zu(e, t).replace(/:/g, "&#58;");
}
function er(e, t, n, o) {
  if (e === t)
    return !1;
  let r = typeof e;
  if (r !== typeof t)
    return !0;
  function a(u, p, c, f) {
    if (!Array.isArray(p) || u.length !== p.length)
      return !0;
    for (let h = 0, g = u.length; h < g; h++)
      if (er(u[h], p[h], c, f))
        return !0;
    return !1;
  }
  function i(u, p, c, f) {
    if (!(p instanceof Map) || u.size !== p.size)
      return !0;
    let h = !1;
    return u.forEach(function(g, y) {
      h || (h = !p.has(y) || er(g, p.get(y), c, f));
    }), h;
  }
  function s(u, p) {
    if (!(p instanceof Set) || u.size !== p.size)
      return !0;
    let c = !1;
    return u.forEach(function(f) {
      !c && !p.has(f) && (c = !0);
    }), c;
  }
  function l(u, p) {
    if (Object.getPrototypeOf(u) !== Object.getPrototypeOf(p) || u.byteLength !== p.byteLength)
      return !0;
    let c = new Uint8Array(
      u.buffer,
      u.byteOffset,
      u.byteLength
    ), f = new Uint8Array(
      p.buffer,
      p.byteOffset,
      p.byteLength
    );
    for (let h = 0, g = c.length; h < g; h++)
      if (c[h] !== f[h])
        return !0;
    return !1;
  }
  function d(u, p, c, f) {
    if (Object.getPrototypeOf(u) !== Object.getPrototypeOf(p))
      return !0;
    for (let h in u)
      if (!(h in p))
        return !0;
    for (let h in p)
      if (!(h in u) || er(u[h], p[h], c, f))
        return !0;
    return !1;
  }
  switch (r) {
    case "undefined":
    case "boolean":
    case "string":
    case "function":
      return !0;
    // most primitives are compared using "==="
    case "number": {
      if (isNaN(e) !== isNaN(t))
        return !0;
      let p = Number.EPSILON * Math.max(
        // relative, not absolute!
        1,
        Math.abs(e),
        Math.abs(t)
      );
      return Math.abs(e - t) > p;
    }
    case "object":
      if (e == null || t == null)
        return !0;
      if (
        // boxed primitives are compared by their values
        e instanceof Boolean || e instanceof Number || e instanceof String
      )
        return n === "by-reference" ? !0 : Object.getPrototypeOf(e) !== Object.getPrototypeOf(t) || e.valueOf() !== t.valueOf();
      if (e instanceof Date) {
        if (n === "by-reference" || !(t instanceof Date))
          return !0;
        let p = e.getTime(), c = t.getTime();
        return p !== c && !(isNaN(p) && isNaN(c));
      }
      if (e instanceof RegExp)
        return n === "by-reference" ? !0 : !(t instanceof RegExp) || e.source !== t.source || e.flags !== t.flags;
      o == null && (o = /* @__PURE__ */ new WeakMap());
      let u = o.get(e);
      return u == null && o.set(e, u = /* @__PURE__ */ new WeakSet()), u.has(t) ? !1 : (u.add(t), Array.isArray(e) ? a(e, t, n, o) : e instanceof Map ? n === "by-reference" ? !0 : i(e, t, n, o) : e instanceof Set ? n === "by-reference" ? !0 : s(e, t) : ArrayBuffer.isView(e) ? n === "by-reference" ? !0 : l(e, t) : n === "by-reference" ? !0 : d(e, t, n, o));
    default:
      return !0;
  }
}
function Hx(e, t, n) {
  return !er(e, t, n);
}
function Nu(e) {
  Xs("candidate", e);
  for (let t in e)
    if (jd(e, t))
      return !1;
  return !0;
}
function Gx(e) {
  return !Nu(e);
}
function Eu(e) {
  return /^\s*$/.test(e);
}
function Ux(e) {
  return !Eu(e);
}
function Kx(e, t = -1 / 0, n = 1 / 0) {
  return Math.max(t, Math.min(e, n));
}
const yo = {
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
};
function Vu(e) {
  let t = e.toLowerCase();
  if (yo.hasOwnProperty(t) && (e = yo[t]), /^#[a-fA-F0-9]{6}$/.test(e))
    return e + "FF";
  if (/^#[a-fA-F0-9]{8}$/.test(e))
    return e;
  const n = "0123456789ABCDEF";
  function o(a) {
    return a = Math.max(0, Math.min(255, Math.round(a))), n[Math.trunc(a / 16)] + n[a % 16];
  }
  let r = /^rgb\(([0-9]+),\s*([0-9]+),\s*([0-9]+)\)$/i.exec(e);
  if (r != null)
    return "#" + o(parseInt(r[1], 10)) + o(parseInt(r[2], 10)) + o(parseInt(r[3], 10)) + "FF";
  if (r = /^rgba\(([0-9]+),\s*([0-9]+),\s*([0-9]+),\s*([01]?[.][0-9]+|[01])\)$/i.exec(e), r != null)
    return "#" + o(parseInt(r[1], 10)) + o(parseInt(r[2], 10)) + o(parseInt(r[3], 10)) + o(parseFloat(r[4]) * 255);
  et("InvalidArgument: the given Value is not a valid CSS Color specification");
}
function qx(e) {
  let t = e.toLowerCase();
  if (yo.hasOwnProperty(t))
    return yo[t];
  if (/^#[a-fA-F0-9]{6}$/.test(e))
    return "rgba(" + parseInt(e.slice(1, 3), 16) + "," + parseInt(e.slice(3, 5), 16) + "," + parseInt(e.slice(5, 7), 16) + ",1)";
  if (/^#[a-fA-F0-9]{8}$/.test(e))
    return "rgba(" + parseInt(e.slice(1, 3), 16) + "," + parseInt(e.slice(3, 5), 16) + "," + parseInt(e.slice(5, 7), 16) + "," + parseInt(e.slice(7), 16) / 255 + ")";
  let n = /^rgb\(([0-9]+),\s*([0-9]+),\s*([0-9]+)\)$/i.exec(e);
  if (n != null)
    return e.slice(0, e.length - 1) + ",1)";
  if (n = /^rgba\(([0-9]+),\s*([0-9]+),\s*([0-9]+),\s*([01]?[.][0-9]+|[01])\)$/i.exec(e), n != null)
    return e;
  et("InvalidArgument: the given Value is not a valid CSS Color specification");
}
function Xx(e) {
  return Vu(e).slice(0, 7);
}
var _t = typeof window < "u" ? window : { screen: {}, navigator: {} }, Kn = (_t.matchMedia || (function() {
  return { matches: !1 };
})).bind(_t), Ys = !1, Bu = {
  get passive() {
    return Ys = !0;
  }
}, Js = function() {
};
_t.addEventListener && _t.addEventListener("p", Js, Bu);
_t.removeEventListener && _t.removeEventListener("p", Js, !1);
var Yx = Ys, Jx = "PointerEvent" in _t, xa = "ontouchstart" in _t, Wu = "TouchEvent" in _t, Hu = xa || Wu && Kn("(any-pointer: coarse)").matches, Ni = (_t.navigator.maxTouchPoints || 0) > 0 || Hu, Zs = _t.navigator.userAgent || "", Gu = Kn("(pointer: coarse)").matches && // both iPad and iPhone can "request desktop site", which sets the userAgent to Macintosh
// so need to check both userAgents to determine if it is an iOS device
// and screen size to separate iPad from iPhone
/iPad|Macintosh/.test(Zs) && Math.min(_t.screen.width || 0, _t.screen.height || 0) >= 768, Qs = (Kn("(pointer: coarse)").matches || // if the pointer is not coarse and not fine then the browser doesn't support
// interaction media queries (see https://caniuse.com/css-media-interaction)
// so if it has onTouchStartInWindow assume it has a coarse primary pointer
!Kn("(pointer: fine)").matches && xa) && // bug in firefox (as of v81) on hybrid windows devices where the interaction media queries
// always indicate a touch only device (only has a coarse pointer that can't hover)
// so assume that the primary pointer is not coarse for firefox windows
!/Windows.*Firefox/.test(Zs), Uu = Kn("(any-pointer: fine)").matches || Kn("(any-hover: hover)").matches || // iPads might have an input device that can hover, so assume it has anyHover
Gu || // if no onTouchStartInWindow then the browser is indicating that it is not a touch only device
// see above note for supportsTouchEvents
!xa, Ei = Ni && (Uu || !Qs) ? "hybrid" : Ni ? "touchOnly" : "mouseOnly", Zx = Ei === "mouseOnly" ? "mouse" : Ei === "touchOnly" || // if the device is a hybrid, then if the primary pointer is coarse
// assume the primaryInput is touch, otherwise assume it's mouse
Qs ? "touch" : "mouse", Do, Se, Ps, va, dn, Vi, el, tl, Or, tr, go, nl, wa, qr, Xr, ol, sr = {}, lr = [], Ku = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i, Lo = Array.isArray;
function Ut(e, t) {
  for (var n in t) e[n] = t[n];
  return e;
}
function ka(e) {
  e && e.parentNode && e.parentNode.removeChild(e);
}
function qn(e, t, n) {
  var o, r, a, i = {};
  for (a in t) a == "key" ? o = t[a] : a == "ref" ? r = t[a] : i[a] = t[a];
  if (arguments.length > 2 && (i.children = arguments.length > 3 ? Do.call(arguments, 2) : n), typeof e == "function" && e.defaultProps != null) for (a in e.defaultProps) i[a] === void 0 && (i[a] = e.defaultProps[a]);
  return mo(e, i, o, r, null);
}
function mo(e, t, n, o, r) {
  var a = { type: e, props: t, key: n, ref: o, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: r ?? ++Ps, __i: -1, __u: 0 };
  return r == null && Se.vnode != null && Se.vnode(a), a;
}
function qu() {
  return { current: null };
}
function Xn(e) {
  return e.children;
}
function qt(e, t) {
  this.props = e, this.context = t;
}
function Yn(e, t) {
  if (t == null) return e.__ ? Yn(e.__, e.__i + 1) : null;
  for (var n; t < e.__k.length; t++) if ((n = e.__k[t]) != null && n.__e != null) return n.__e;
  return typeof e.type == "function" ? Yn(e) : null;
}
function Xu(e) {
  if (e.__P && e.__d) {
    var t = e.__v, n = t.__e, o = [], r = [], a = Ut({}, t);
    a.__v = t.__v + 1, Se.vnode && Se.vnode(a), Ca(e.__P, a, t, e.__n, e.__P.namespaceURI, 32 & t.__u ? [n] : null, o, n ?? Yn(t), !!(32 & t.__u), r), a.__v = t.__v, a.__.__k[a.__i] = a, ll(o, a, r), t.__e = t.__ = null, a.__e != n && rl(a);
  }
}
function rl(e) {
  if ((e = e.__) != null && e.__c != null) return e.__e = e.__c.base = null, e.__k.some(function(t) {
    if (t != null && t.__e != null) return e.__e = e.__c.base = t.__e;
  }), rl(e);
}
function Yr(e) {
  (!e.__d && (e.__d = !0) && dn.push(e) && !cr.__r++ || Vi != Se.debounceRendering) && ((Vi = Se.debounceRendering) || el)(cr);
}
function cr() {
  try {
    for (var e, t = 1; dn.length; ) dn.length > t && dn.sort(tl), e = dn.shift(), t = dn.length, Xu(e);
  } finally {
    dn.length = cr.__r = 0;
  }
}
function al(e, t, n, o, r, a, i, s, l, d, u) {
  var p, c, f, h, g, y, m, v = o && o.__k || lr, C = t.length;
  for (l = Yu(n, t, v, l, C), p = 0; p < C; p++) (f = n.__k[p]) != null && (c = f.__i != -1 && v[f.__i] || sr, f.__i = p, y = Ca(e, f, c, r, a, i, s, l, d, u), h = f.__e, f.ref && c.ref != f.ref && (c.ref && $a(c.ref, null, f), u.push(f.ref, f.__c || h, f)), g == null && h != null && (g = h), (m = !!(4 & f.__u)) || c.__k === f.__k ? (l = il(f, l, e, m), m && c.__e && (c.__e = null)) : typeof f.type == "function" && y !== void 0 ? l = y : h && (l = h.nextSibling), f.__u &= -7);
  return n.__e = g, l;
}
function Yu(e, t, n, o, r) {
  var a, i, s, l, d, u = n.length, p = u, c = 0;
  for (e.__k = new Array(r), a = 0; a < r; a++) (i = t[a]) != null && typeof i != "boolean" && typeof i != "function" ? (typeof i == "string" || typeof i == "number" || typeof i == "bigint" || i.constructor == String ? i = e.__k[a] = mo(null, i, null, null, null) : Lo(i) ? i = e.__k[a] = mo(Xn, { children: i }, null, null, null) : i.constructor === void 0 && i.__b > 0 ? i = e.__k[a] = mo(i.type, i.props, i.key, i.ref ? i.ref : null, i.__v) : e.__k[a] = i, l = a + c, i.__ = e, i.__b = e.__b + 1, s = null, (d = i.__i = Ju(i, n, l, p)) != -1 && (p--, (s = n[d]) && (s.__u |= 2)), s == null || s.__v == null ? (d == -1 && (r > u ? c-- : r < u && c++), typeof i.type != "function" && (i.__u |= 4)) : d != l && (d == l - 1 ? c-- : d == l + 1 ? c++ : (d > l ? c-- : c++, i.__u |= 4))) : e.__k[a] = null;
  if (p) for (a = 0; a < u; a++) (s = n[a]) != null && (2 & s.__u) == 0 && (s.__e == o && (o = Yn(s)), dl(s, s));
  return o;
}
function il(e, t, n, o) {
  var r, a;
  if (typeof e.type == "function") {
    for (r = e.__k, a = 0; r && a < r.length; a++) r[a] && (r[a].__ = e, t = il(r[a], t, n, o));
    return t;
  }
  e.__e != t && (o && (t && e.type && !t.parentNode && (t = Yn(e)), n.insertBefore(e.__e, t || null)), t = e.__e);
  do
    t = t && t.nextSibling;
  while (t != null && t.nodeType == 8);
  return t;
}
function Mt(e, t) {
  return t = t || [], e == null || typeof e == "boolean" || (Lo(e) ? e.some(function(n) {
    Mt(n, t);
  }) : t.push(e)), t;
}
function Ju(e, t, n, o) {
  var r, a, i, s = e.key, l = e.type, d = t[n], u = d != null && (2 & d.__u) == 0;
  if (d === null && s == null || u && s == d.key && l == d.type) return n;
  if (o > (u ? 1 : 0)) {
    for (r = n - 1, a = n + 1; r >= 0 || a < t.length; ) if ((d = t[i = r >= 0 ? r-- : a++]) != null && (2 & d.__u) == 0 && s == d.key && l == d.type) return i;
  }
  return -1;
}
function Bi(e, t, n) {
  t[0] == "-" ? e.setProperty(t, n ?? "") : e[t] = n == null ? "" : typeof n != "number" || Ku.test(t) ? n : n + "px";
}
function qo(e, t, n, o, r) {
  var a, i;
  e: if (t == "style") if (typeof n == "string") e.style.cssText = n;
  else {
    if (typeof o == "string" && (e.style.cssText = o = ""), o) for (t in o) n && t in n || Bi(e.style, t, "");
    if (n) for (t in n) o && n[t] == o[t] || Bi(e.style, t, n[t]);
  }
  else if (t[0] == "o" && t[1] == "n") a = t != (t = t.replace(nl, "$1")), i = t.toLowerCase(), t = i in e || t == "onFocusOut" || t == "onFocusIn" ? i.slice(2) : t.slice(2), e.l || (e.l = {}), e.l[t + a] = n, n ? o ? n[go] = o[go] : (n[go] = wa, e.addEventListener(t, a ? Xr : qr, a)) : e.removeEventListener(t, a ? Xr : qr, a);
  else {
    if (r == "http://www.w3.org/2000/svg") t = t.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
    else if (t != "width" && t != "height" && t != "href" && t != "list" && t != "form" && t != "tabIndex" && t != "download" && t != "rowSpan" && t != "colSpan" && t != "role" && t != "popover" && t in e) try {
      e[t] = n ?? "";
      break e;
    } catch {
    }
    typeof n == "function" || (n == null || n === !1 && t[4] != "-" ? e.removeAttribute(t) : e.setAttribute(t, t == "popover" && n == 1 ? "" : n));
  }
}
function Wi(e) {
  return function(t) {
    if (this.l) {
      var n = this.l[t.type + e];
      if (t[tr] == null) t[tr] = wa++;
      else if (t[tr] < n[go]) return;
      return n(Se.event ? Se.event(t) : t);
    }
  };
}
function Ca(e, t, n, o, r, a, i, s, l, d) {
  var u, p, c, f, h, g, y, m, v, C, _, j, x, w, T, L, $ = t.type;
  if (t.constructor !== void 0) return null;
  128 & n.__u && (l = !!(32 & n.__u), a = [s = t.__e = n.__e]), (u = Se.__b) && u(t);
  e: if (typeof $ == "function") {
    p = i.length;
    try {
      if (v = t.props, C = $.prototype && $.prototype.render, _ = (u = $.contextType) && o[u.__c], j = u ? _ ? _.props.value : u.__ : o, n.__c ? m = (c = t.__c = n.__c).__ = c.__E : (C ? t.__c = c = new $(v, j) : (t.__c = c = new qt(v, j), c.constructor = $, c.render = Qu), _ && _.sub(c), c.state || (c.state = {}), c.__n = o, f = c.__d = !0, c.__h = [], c._sb = []), C && c.__s == null && (c.__s = c.state), C && $.getDerivedStateFromProps != null && (c.__s == c.state && (c.__s = Ut({}, c.__s)), Ut(c.__s, $.getDerivedStateFromProps(v, c.__s))), h = c.props, g = c.state, c.__v = t, f) C && $.getDerivedStateFromProps == null && c.componentWillMount != null && c.componentWillMount(), C && c.componentDidMount != null && c.__h.push(c.componentDidMount);
      else {
        if (C && $.getDerivedStateFromProps == null && v !== h && c.componentWillReceiveProps != null && c.componentWillReceiveProps(v, j), t.__v == n.__v || !c.__e && c.shouldComponentUpdate != null && c.shouldComponentUpdate(v, c.__s, j) === !1) {
          t.__v != n.__v && (c.props = v, c.state = c.__s, c.__d = !1), t.__e = n.__e, t.__k = n.__k, t.__k.some(function(I) {
            I && (I.__ = t);
          }), lr.push.apply(c.__h, c._sb), c._sb = [], c.__h.length && i.push(c);
          break e;
        }
        c.componentWillUpdate != null && c.componentWillUpdate(v, c.__s, j), C && c.componentDidUpdate != null && c.__h.push(function() {
          c.componentDidUpdate(h, g, y);
        });
      }
      if (c.context = j, c.props = v, c.__P = e, c.__e = !1, x = Se.__r, w = 0, C) c.state = c.__s, c.__d = !1, x && x(t), u = c.render(c.props, c.state, c.context), lr.push.apply(c.__h, c._sb), c._sb = [];
      else do
        c.__d = !1, x && x(t), u = c.render(c.props, c.state, c.context), c.state = c.__s;
      while (c.__d && ++w < 25);
      c.state = c.__s, c.getChildContext != null && (o = Ut(Ut({}, o), c.getChildContext())), C && !f && c.getSnapshotBeforeUpdate != null && (y = c.getSnapshotBeforeUpdate(h, g)), T = u != null && u.type === Xn && u.key == null ? cl(u.props.children) : u, s = al(e, Lo(T) ? T : [T], t, n, o, r, a, i, s, l, d), c.base = t.__e, t.__u &= -161, c.__h.length && i.push(c), m && (c.__E = c.__ = null);
    } catch (I) {
      if (i.length = p, t.__v = null, l || a != null) {
        if (I.then) {
          for (t.__u |= l ? 160 : 128; s && s.nodeType == 8 && s.nextSibling; ) s = s.nextSibling;
          a != null && (a[a.indexOf(s)] = null), t.__e = s;
        } else if (a != null) for (L = a.length; L--; ) ka(a[L]);
      } else t.__e = n.__e;
      t.__k == null && (t.__k = n.__k || []), I.then || sl(t), Se.__e(I, t, n);
    }
  } else a == null && t.__v == n.__v ? (t.__k = n.__k, t.__e = n.__e) : s = t.__e = Zu(n.__e, t, n, o, r, a, i, l, d);
  return (u = Se.diffed) && u(t), 128 & t.__u ? void 0 : s;
}
function sl(e) {
  e && (e.__c && (e.__c.__e = !0), e.__k && e.__k.some(sl));
}
function ll(e, t, n) {
  for (var o = 0; o < n.length; o++) $a(n[o], n[++o], n[++o]);
  Se.__c && Se.__c(t, e), e.some(function(r) {
    try {
      e = r.__h, r.__h = [], e.some(function(a) {
        a.call(r);
      });
    } catch (a) {
      Se.__e(a, r.__v);
    }
  });
}
function cl(e) {
  return typeof e != "object" || e == null || e.__b > 0 ? e : Lo(e) ? e.map(cl) : e.constructor !== void 0 ? null : Ut({}, e);
}
function Zu(e, t, n, o, r, a, i, s, l) {
  var d, u, p, c, f, h, g, y = n.props || sr, m = t.props, v = t.type;
  if (v == "svg" ? r = "http://www.w3.org/2000/svg" : v == "math" ? r = "http://www.w3.org/1998/Math/MathML" : r || (r = "http://www.w3.org/1999/xhtml"), a != null) {
    for (d = 0; d < a.length; d++) if ((f = a[d]) && "setAttribute" in f == !!v && (v ? f.localName == v : f.nodeType == 3)) {
      e = f, a[d] = null;
      break;
    }
  }
  if (e == null) {
    if (v == null) return document.createTextNode(m);
    e = document.createElementNS(r, v, m.is && m), s && (Se.__m && Se.__m(t, a), s = !1), a = null;
  }
  if (v == null) y === m || s && e.data == m || (e.data = m);
  else {
    if (a = v == "textarea" && m.defaultValue != null ? null : a && Do.call(e.childNodes), !s && a != null) for (y = {}, d = 0; d < e.attributes.length; d++) y[(f = e.attributes[d]).name] = f.value;
    for (d in y) f = y[d], d == "dangerouslySetInnerHTML" ? p = f : d == "children" || d in m || d == "value" && "defaultValue" in m || d == "checked" && "defaultChecked" in m || qo(e, d, null, f, r);
    for (d in m) f = m[d], d == "children" ? c = f : d == "dangerouslySetInnerHTML" ? u = f : d == "value" ? h = f : d == "checked" ? g = f : s && typeof f != "function" || y[d] === f || qo(e, d, f, y[d], r);
    if (u) s || p && (u.__html == p.__html || u.__html == e.innerHTML) || (e.innerHTML = u.__html), t.__k = [];
    else if (p && (e.innerHTML = ""), al(t.type == "template" ? e.content : e, Lo(c) ? c : [c], t, n, o, v == "foreignObject" ? "http://www.w3.org/1999/xhtml" : r, a, i, a ? a[0] : n.__k && Yn(n, 0), s, l), a != null) for (d = a.length; d--; ) ka(a[d]);
    s && v != "textarea" || (d = "value", v == "progress" && h == null ? e.removeAttribute("value") : h != null && (h !== e[d] || v == "progress" && !h || v == "option" && h != y[d]) && qo(e, d, h, y[d], r), d = "checked", g != null && g != e[d] && qo(e, d, g, y[d], r));
  }
  return e;
}
function $a(e, t, n) {
  try {
    if (typeof e == "function") {
      var o = typeof e.__u == "function";
      o && e.__u(), o && t == null || (e.__u = e(t));
    } else e.current = t;
  } catch (r) {
    Se.__e(r, n);
  }
}
function dl(e, t, n) {
  var o, r;
  if (Se.unmount && Se.unmount(e), (o = e.ref) && (o.current && o.current != e.__e || $a(o, null, t)), (o = e.__c) != null) {
    if (o.componentWillUnmount) try {
      o.componentWillUnmount();
    } catch (a) {
      Se.__e(a, t);
    }
    o.base = o.__P = o.__n = null;
  }
  if (o = e.__k) for (r = 0; r < o.length; r++) o[r] && dl(o[r], t, n || typeof e.type != "function");
  n || ka(e.__e), e.__c = e.__ = e.__e = void 0;
}
function Qu(e, t, n) {
  return this.constructor(e, n);
}
function xo(e, t, n) {
  var o, r, a, i;
  t == document && (t = document.documentElement), Se.__ && Se.__(e, t), r = (o = typeof n == "function") ? null : n && n.__k || t.__k, a = [], i = [], Ca(t, e = (!o && n || t).__k = qn(Xn, null, [e]), r || sr, sr, t.namespaceURI, !o && n ? [n] : r ? null : t.firstChild ? Do.call(t.childNodes) : null, a, !o && n ? n : r ? r.__e : t.firstChild, o, i), ll(a, e, i), e.props.children = null;
}
function Pu(e, t, n) {
  var o, r, a, i, s = Ut({}, e.props);
  for (a in e.type && e.type.defaultProps && (i = e.type.defaultProps), t) a == "key" ? o = t[a] : a == "ref" ? r = t[a] : s[a] = t[a] === void 0 && i != null ? i[a] : t[a];
  return arguments.length > 2 && (s.children = arguments.length > 3 ? Do.call(arguments, 2) : n), mo(e.type, s, o || e.key, r || e.ref, null);
}
function mn(e) {
  function t(n) {
    var o, r;
    return this.getChildContext || (o = /* @__PURE__ */ new Set(), (r = {})[t.__c] = this, this.getChildContext = function() {
      return r;
    }, this.componentWillUnmount = function() {
      o = null;
    }, this.shouldComponentUpdate = function(a) {
      this.props.value != a.value && o.forEach(function(i) {
        i.__e = !0, Yr(i);
      });
    }, this.sub = function(a) {
      o.add(a);
      var i = a.componentWillUnmount;
      a.componentWillUnmount = function() {
        o && o.delete(a), i && i.call(a);
      };
    }), n.children;
  }
  return t.__c = "__cC" + ol++, t.__ = e, t.Provider = t.__l = (t.Consumer = function(n, o) {
    return n.children(o);
  }).contextType = t, t;
}
Do = lr.slice, Se = { __e: function(e, t, n, o) {
  for (var r, a, i; t = t.__; ) if ((r = t.__c) && !r.__) try {
    if ((a = r.constructor) && a.getDerivedStateFromError != null && (r.setState(a.getDerivedStateFromError(e)), i = r.__d), r.componentDidCatch != null && (r.componentDidCatch(e, o || {}), i = r.__d), i) return r.__E = r;
  } catch (s) {
    e = s;
  }
  throw e;
} }, Ps = 0, va = function(e) {
  return e != null && e.constructor === void 0;
}, qt.prototype.setState = function(e, t) {
  var n;
  n = this.__s != null && this.__s != this.state ? this.__s : this.__s = Ut({}, this.state), typeof e == "function" && (e = e(Ut({}, n), this.props)), e && Ut(n, e), e != null && this.__v && (t && this._sb.push(t), Yr(this));
}, qt.prototype.forceUpdate = function(e) {
  this.__v && (this.__e = !0, e && this.__h.push(e), Yr(this));
}, qt.prototype.render = Xn, dn = [], el = typeof Promise == "function" ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, tl = function(e, t) {
  return e.__v.__b - t.__v.__b;
}, cr.__r = 0, Or = Math.random().toString(8), tr = "__d" + Or, go = "__a" + Or, nl = /(PointerCapture)$|Capture$/i, wa = 0, qr = Wi(!1), Xr = Wi(!0), ol = 0;
var ul = function(e, t, n, o) {
  var r;
  t[0] = 0;
  for (var a = 1; a < t.length; a++) {
    var i = t[a++], s = t[a] ? (t[0] |= i ? 1 : 2, n[t[a++]]) : t[++a];
    i === 3 ? o[0] = s : i === 4 ? o[1] = Object.assign(o[1] || {}, s) : i === 5 ? (o[1] = o[1] || {})[t[++a]] = s : i === 6 ? o[1][t[++a]] += s + "" : i ? (r = e.apply(s, ul(e, s, n, ["", null])), o.push(r), s[0] ? t[0] |= 2 : (t[a - 2] = 0, t[a] = r)) : o.push(s);
  }
  return o;
}, Hi = /* @__PURE__ */ new Map();
function ep(e) {
  var t = Hi.get(this);
  return t || (t = /* @__PURE__ */ new Map(), Hi.set(this, t)), (t = ul(this, t.get(e) || (t.set(e, t = (function(n) {
    for (var o, r, a = 1, i = "", s = "", l = [0], d = function(c) {
      a === 1 && (c || (i = i.replace(/^\s*\n\s*|\s*\n\s*$/g, ""))) ? l.push(0, c, i) : a === 3 && (c || i) ? (l.push(3, c, i), a = 2) : a === 2 && i === "..." && c ? l.push(4, c, 0) : a === 2 && i && !c ? l.push(5, 0, !0, i) : a >= 5 && ((i || !c && a === 5) && (l.push(a, 0, i, r), a = 6), c && (l.push(a, c, 0, r), a = 6)), i = "";
    }, u = 0; u < n.length; u++) {
      u && (a === 1 && d(), d(u));
      for (var p = 0; p < n[u].length; p++) o = n[u][p], a === 1 ? o === "<" ? (d(), l = [l], a = 3) : i += o : a === 4 ? i === "--" && o === ">" ? (a = 1, i = "") : i = o + i[0] : s ? o === s ? s = "" : i += o : o === '"' || o === "'" ? s = o : o === ">" ? (d(), a = 1) : a && (o === "=" ? (a = 5, r = i, i = "") : o === "/" && (a < 5 || n[u][p + 1] === ">") ? (d(), a === 3 && (l = l[0]), a = l, (l = l[0]).push(2, 0, a), a = 0) : o === " " || o === "	" || o === `
` || o === "\r" ? (d(), a = 2) : i += o), a === 3 && i === "!--" && (a = 4, l = l[0]);
    }
    return d(), l;
  })(e)), t), arguments, [])).length > 1 ? t : t[0];
}
var b = ep.bind(qn), on, Ye, zr, Gi, vo = 0, pl = [], rt = Se, Ui = rt.__b, Ki = rt.__r, qi = rt.diffed, Xi = rt.__c, Yi = rt.unmount, Ji = rt.__;
function Rn(e, t) {
  rt.__h && rt.__h(Ye, e, vo || t), vo = 0;
  var n = Ye.__H || (Ye.__H = { __: [], __h: [] });
  return e >= n.__.length && n.__.push({}), n.__[e];
}
function He(e) {
  return vo = 1, tp(fl, e);
}
function tp(e, t, n) {
  var o = Rn(on++, 2);
  if (o.t = e, !o.__c && (o.__ = [n ? n(t) : fl(void 0, t), function(s) {
    var l = o.__N ? o.__N[0] : o.__[0], d = o.t(l, s);
    l !== d && (o.__N = [d, o.__[1]], o.__c.setState({}));
  }], o.__c = Ye, !Ye.__f)) {
    var r = function(s, l, d) {
      if (!o.__c.__H) return !0;
      var u = !1, p = o.__c.props !== s;
      if (o.__c.__H.__.some(function(f) {
        if (f.__N) {
          u = !0;
          var h = f.__[0];
          f.__ = f.__N, f.__N = void 0, h !== f.__[0] && (p = !0);
        }
      }), a) {
        var c = a.call(this, s, l, d);
        return u ? c || p : c;
      }
      return !u || p;
    };
    Ye.__f = !0;
    var a = Ye.shouldComponentUpdate, i = Ye.componentWillUpdate;
    Ye.componentWillUpdate = function(s, l, d) {
      if (this.__e) {
        var u = a;
        a = void 0, r(s, l, d), a = u;
      }
      i && i.call(this, s, l, d);
    }, Ye.shouldComponentUpdate = r;
  }
  return o.__N || o.__;
}
function je(e, t) {
  var n = Rn(on++, 3);
  !rt.__s && _a(n.__H, t) && (n.__ = e, n.u = t, Ye.__H.__h.push(n));
}
function ja(e, t) {
  var n = Rn(on++, 4);
  !rt.__s && _a(n.__H, t) && (n.__ = e, n.u = t, Ye.__h.push(n));
}
function U(e) {
  return vo = 5, Jt(function() {
    return { current: e };
  }, []);
}
function Jt(e, t) {
  var n = Rn(on++, 7);
  return _a(n.__H, t) && (n.__ = e(), n.__H = t, n.__h = e), n.__;
}
function ie(e, t) {
  return vo = 8, Jt(function() {
    return e;
  }, t);
}
function gt(e) {
  var t = Ye.context[e.__c], n = Rn(on++, 9);
  return n.c = e, t ? (n.__ == null && (n.__ = !0, t.sub(Ye)), t.props.value) : e.__;
}
function Ia(e) {
  var t = Rn(on++, 10), n = He();
  return t.__ = e, Ye.componentDidCatch || (Ye.componentDidCatch = function(o, r) {
    t.__ && t.__(o, r), n[1](o);
  }), [n[0], function() {
    n[1](void 0);
  }];
}
function Vt() {
  var e = Rn(on++, 11);
  if (!e.__) {
    for (var t = Ye.__v; t !== null && !t.__m && t.__ !== null; ) t = t.__;
    var n = t.__m || (t.__m = [0, 0]);
    e.__ = "P" + n[0] + "-" + n[1]++;
  }
  return e.__;
}
function np() {
  for (var e; e = pl.shift(); ) {
    var t = e.__H;
    if (e.__P && t) try {
      t.__h.some(nr), t.__h.some(Jr), t.__h = [];
    } catch (n) {
      t.__h = [], rt.__e(n, e.__v);
    }
  }
}
rt.__b = function(e) {
  Ye = null, Ui && Ui(e);
}, rt.__ = function(e, t) {
  e && t.__k && t.__k.__m && (e.__m = t.__k.__m), Ji && Ji(e, t);
}, rt.__r = function(e) {
  Ki && Ki(e), on = 0;
  var t = (Ye = e.__c).__H;
  t && (zr === Ye ? (t.__h = [], Ye.__h = [], t.__.some(function(n) {
    n.__N && (n.__ = n.__N), n.u = n.__N = void 0;
  })) : (t.__h.some(nr), t.__h.some(Jr), t.__h = [], on = 0)), zr = Ye;
}, rt.diffed = function(e) {
  qi && qi(e);
  var t = e.__c;
  t && t.__H && (t.__H.__h.length && (pl.push(t) !== 1 && Gi === rt.requestAnimationFrame || ((Gi = rt.requestAnimationFrame) || op)(np)), t.__H.__.some(function(n) {
    n.u && (n.__H = n.u, n.u = void 0);
  })), zr = Ye = null;
}, rt.__c = function(e, t) {
  t.some(function(n) {
    try {
      n.__h.some(nr), n.__h = n.__h.filter(function(o) {
        return !o.__ || Jr(o);
      });
    } catch (o) {
      t.some(function(r) {
        r.__h && (r.__h = []);
      }), t = [], rt.__e(o, n.__v);
    }
  }), Xi && Xi(e, t);
}, rt.unmount = function(e) {
  Yi && Yi(e);
  var t, n = e.__c;
  n && n.__H && (n.__H.__.some(function(o) {
    try {
      nr(o);
    } catch (r) {
      t = r;
    }
  }), n.__H = void 0, t && rt.__e(t, n.__v));
};
var Zi = typeof requestAnimationFrame == "function";
function op(e) {
  var t, n = function() {
    clearTimeout(o), Zi && cancelAnimationFrame(t), setTimeout(e);
  }, o = setTimeout(n, 35);
  Zi && (t = requestAnimationFrame(n));
}
function nr(e) {
  var t = Ye, n = e.__c;
  typeof n == "function" && (e.__c = void 0, n()), Ye = t;
}
function Jr(e) {
  var t = Ye;
  e.__c = e.__(), Ye = t;
}
function _a(e, t) {
  return !e || e.length !== t.length || t.some(function(n, o) {
    return n !== e[o];
  });
}
function fl(e, t) {
  return typeof t == "function" ? t(e) : t;
}
function rp(e, t) {
  for (var n in t) e[n] = t[n];
  return e;
}
function Qi(e, t) {
  for (var n in e) if (n !== "__source" && !(n in t)) return !0;
  for (var o in t) if (o !== "__source" && e[o] !== t[o]) return !0;
  return !1;
}
function Pi(e, t) {
  this.props = e, this.context = t;
}
(Pi.prototype = new qt()).isPureReactComponent = !0, Pi.prototype.shouldComponentUpdate = function(e, t) {
  return Qi(this.props, e) || Qi(this.state, t);
};
var es = Se.__b;
Se.__b = function(e) {
  e.type && e.type.__f && e.ref && (e.props.ref = e.ref, e.ref = null), es && es(e);
};
var ap = Se.__e;
Se.__e = function(e, t, n, o) {
  if (e.then) {
    for (var r, a = t; a = a.__; ) if ((r = a.__c) && r.__c) return t.__e == null && (t.__e = n.__e, t.__k = n.__k || []), r.__c(e, t);
  }
  ap(e, t, n, o);
};
var ts = Se.unmount;
function hl(e, t, n) {
  return e && (e.__c && e.__c.__H && (e.__c.__H.__.forEach(function(o) {
    typeof o.__c == "function" && o.__c();
  }), e.__c.__H = null), (e = rp({}, e)).__c != null && (e.__c.__P === n && (e.__c.__P = t), e.__c.__e = !0, e.__c = null), e.__k = e.__k && e.__k.map(function(o) {
    return hl(o, t, n);
  })), e;
}
function gl(e, t, n) {
  return e && n && (e.__v = null, e.__k = e.__k && e.__k.map(function(o) {
    return gl(o, t, n);
  }), e.__c && e.__c.__P === t && (e.__e && n.appendChild(e.__e), e.__c.__e = !0, e.__c.__P = n)), e;
}
function Nr() {
  this.__u = 0, this.o = null, this.__b = null;
}
function ml(e) {
  var t = e.__ && e.__.__c;
  return t && t.__a && t.__a(e);
}
function Xo() {
  this.i = null, this.l = null;
}
Se.unmount = function(e) {
  var t = e.__c;
  t && (t.__z = !0), t && t.__R && t.__R(), t && 32 & e.__u && (e.type = null), ts && ts(e);
}, (Nr.prototype = new qt()).__c = function(e, t) {
  var n = t.__c, o = this;
  o.o == null && (o.o = []), o.o.push(n);
  var r = ml(o.__v), a = !1, i = function() {
    a || o.__z || (a = !0, n.__R = null, r ? r(l) : l());
  };
  n.__R = i;
  var s = n.__P;
  n.__P = null;
  var l = function() {
    if (!--o.__u) {
      if (o.state.__a) {
        var d = o.state.__a;
        o.__v.__k[0] = gl(d, d.__c.__P, d.__c.__O);
      }
      var u;
      for (o.setState({ __a: o.__b = null }); u = o.o.pop(); ) u.__P = s, u.forceUpdate();
    }
  };
  o.__u++ || 32 & t.__u || o.setState({ __a: o.__b = o.__v.__k[0] }), e.then(i, i);
}, Nr.prototype.componentWillUnmount = function() {
  this.o = [];
}, Nr.prototype.render = function(e, t) {
  if (this.__b) {
    if (this.__v.__k) {
      var n = document.createElement("div"), o = this.__v.__k[0].__c;
      this.__v.__k[0] = hl(this.__b, n, o.__O = o.__P);
    }
    this.__b = null;
  }
  var r = t.__a && qn(Xn, null, e.fallback);
  return r && (r.__u &= -33), [qn(Xn, null, t.__a ? null : e.children), r];
};
var ns = function(e, t, n) {
  if (++n[1] === n[0] && e.l.delete(t), e.props.revealOrder && (e.props.revealOrder[0] !== "t" || !e.l.size)) for (n = e.i; n; ) {
    for (; n.length > 3; ) n.pop()();
    if (n[1] < n[0]) break;
    e.i = n = n[2];
  }
};
function ip(e) {
  return this.getChildContext = function() {
    return e.context;
  }, e.children;
}
function sp(e) {
  var t = this, n = e.h;
  if (t.componentWillUnmount = function() {
    xo(null, t.v), t.v = null, t.h = null;
  }, t.h && t.h !== n && t.componentWillUnmount(), !t.v) {
    for (var o = t.__v; o !== null && !o.__m && o.__ !== null; ) o = o.__;
    t.h = n, t.v = { nodeType: 1, parentNode: n, childNodes: [], __k: { __m: o.__m }, contains: function() {
      return !0;
    }, namespaceURI: n.namespaceURI, insertBefore: function(r, a) {
      this.childNodes.push(r), t.h.insertBefore(r, a);
    }, removeChild: function(r) {
      this.childNodes.splice(this.childNodes.indexOf(r) >>> 1, 1), t.h.removeChild(r);
    } };
  }
  xo(qn(ip, { context: t.context }, e.__v), t.v);
}
function Zn(e, t) {
  var n = qn(sp, { __v: e, h: t });
  return n.containerInfo = t, n;
}
(Xo.prototype = new qt()).__a = function(e) {
  var t = this, n = ml(t.__v), o = t.l.get(e);
  return o[0]++, function(r) {
    var a = function() {
      t.props.revealOrder ? (o.push(r), ns(t, e, o)) : r();
    };
    n ? n(a) : a();
  };
}, Xo.prototype.render = function(e) {
  this.i = null, this.l = /* @__PURE__ */ new Map();
  var t = Mt(e.children);
  e.revealOrder && e.revealOrder[0] === "b" && t.reverse();
  for (var n = t.length; n--; ) this.l.set(t[n], this.i = [1, 0, this.i]);
  return e.children;
}, Xo.prototype.componentDidUpdate = Xo.prototype.componentDidMount = function() {
  var e = this;
  this.l.forEach(function(t, n) {
    ns(e, n, t);
  });
};
var lp = typeof Symbol < "u" && Symbol.for && Symbol.for("react.element") || 60103, cp = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image(!S)|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/, dp = /^on(Ani|Tra|Tou|BeforeInp|Compo)/, up = /[A-Z0-9]/g, pp = typeof document < "u", fp = function(e) {
  return (typeof Symbol < "u" && typeof Symbol() == "symbol" ? /fil|che|rad/ : /fil|che|ra/).test(e);
};
qt.prototype.isReactComponent = !0, ["componentWillMount", "componentWillReceiveProps", "componentWillUpdate"].forEach(function(e) {
  Object.defineProperty(qt.prototype, e, { configurable: !0, get: function() {
    return this["UNSAFE_" + e];
  }, set: function(t) {
    Object.defineProperty(this, e, { configurable: !0, writable: !0, value: t });
  } });
});
var os = Se.event;
Se.event = function(e) {
  return os && (e = os(e)), e.persist = function() {
  }, e.isPropagationStopped = function() {
    return this.cancelBubble;
  }, e.isDefaultPrevented = function() {
    return this.defaultPrevented;
  }, e.nativeEvent = e;
};
var hp = { configurable: !0, get: function() {
  return this.class;
} }, rs = Se.vnode;
Se.vnode = function(e) {
  typeof e.type == "string" && (function(t) {
    var n = t.props, o = t.type, r = {}, a = o.indexOf("-") == -1;
    for (var i in n) {
      var s = n[i];
      if (!(i === "value" && "defaultValue" in n && s == null || pp && i === "children" && o === "noscript" || i === "class" || i === "className")) {
        var l = i.toLowerCase();
        i === "defaultValue" && "value" in n && n.value == null ? i = "value" : i === "download" && s === !0 ? s = "" : l === "translate" && s === "no" ? s = !1 : l[0] === "o" && l[1] === "n" ? l === "ondoubleclick" ? i = "ondblclick" : l !== "onchange" || o !== "input" && o !== "textarea" || fp(n.type) ? l === "onfocus" ? i = "onfocusin" : l === "onblur" ? i = "onfocusout" : dp.test(i) && (i = l) : l = i = "oninput" : a && cp.test(i) ? i = i.replace(up, "-$&").toLowerCase() : s === null && (s = void 0), l === "oninput" && r[i = l] && (i = "oninputCapture"), r[i] = s;
      }
    }
    o == "select" && (r.multiple && Array.isArray(r.value) && (r.value = Mt(n.children).forEach(function(d) {
      d.props.selected = r.value.indexOf(d.props.value) != -1;
    })), r.defaultValue != null && (r.value = Mt(n.children).forEach(function(d) {
      d.props.selected = r.multiple ? r.defaultValue.indexOf(d.props.value) != -1 : r.defaultValue == d.props.value;
    }))), n.class && !n.className ? (r.class = n.class, Object.defineProperty(r, "className", hp)) : n.className && (r.class = r.className = n.className), t.props = r;
  })(e), e.$$typeof = lp, rs && rs(e);
};
var as = Se.__r;
Se.__r = function(e) {
  as && as(e), e.__c;
};
var is = Se.diffed;
Se.diffed = function(e) {
  is && is(e);
  var t = e.props, n = e.__e;
  n != null && e.type === "textarea" && "value" in t && t.value !== n.value && (n.value = t.value == null ? "" : t.value);
};
function bo(e) {
  return fa(e);
}
function De(e) {
  return ha(e);
}
const gp = (async () => {
}).constructor;
function mp() {
  typeof window < "u" && window.addEventListener("unhandledrejection", (e) => {
    console.error(
      "caught unhandled error in Promise:",
      e.reason?.stack ?? e.reason?.message,
      e
    );
  });
}
function ce(e) {
  debugger;
  const t = /^([$a-zA-Z][$a-zA-Z0-9]*):\s*(\S.+)\s*$/.exec(e);
  if (t == null)
    throw new Error(e);
  {
    const n = new Error(t[2]);
    throw n.name = t[1], n;
  }
}
function bp(e) {
  return ce(
    "ReadOnlyProperty: property " + Lt(e) + " must not be set"
  );
}
function ct(e, t) {
  const n = Ce(e, Qe, t), o = Ce(e, Ze, t);
  return [n, n, o, o];
}
const yp = /^[a-z$_][a-z$_0-9]*$/i;
function xp(e) {
  return Ct(e, yp);
}
const [Qx, Px, vp, ev] = /* @__PURE__ */ ct(xp, "JCL identifier");
function Sa(e) {
  return at(e) && /^[a-zA-Z][a-zA-Z0-9_-]*$/.test(e);
}
const [wp, tv, _n, nv] = /* @__PURE__ */ ct(Sa, "name");
function bl(e) {
  return at(e) && /^[a-zA-Z][a-zA-Z0-9_-]*(\.[a-zA-Z][a-zA-Z0-9_-]*)*$/.test(e);
}
const [ov, rv, yl, av] = /* @__PURE__ */ ct(bl, "path");
function kr(e) {
  return at(e) && /^[+]?[\d\s()\-.]{7,}$/.test(e) && e.replace(/\D/g, "").length >= 3;
}
const [iv, sv, lv, cv] = /* @__PURE__ */ ct(kr, "phone number");
function dv(e) {
  return Ne(e) && (e.indexOf(",") < 0 ? Ln(e) : Ie(
    e.replace(/\s*,\s*/g, ",").split(","),
    Ln
  ));
}
const kp = /* @__PURE__ */ new Set([
  "aa",
  "ab",
  "ae",
  "af",
  "ak",
  "am",
  "an",
  "ar",
  "as",
  "av",
  "ay",
  "az",
  "ba",
  "be",
  "bg",
  "bh",
  "bi",
  "bm",
  "bn",
  "bo",
  "br",
  "bs",
  "ca",
  "ce",
  "ch",
  "co",
  "cr",
  "cs",
  "cu",
  "cv",
  "cy",
  "da",
  "de",
  "dv",
  "dz",
  "ee",
  "el",
  "en",
  "eo",
  "es",
  "et",
  "eu",
  "fa",
  "ff",
  "fi",
  "fj",
  "fo",
  "fr",
  "fy",
  "ga",
  "gd",
  "gl",
  "gn",
  "gu",
  "gv",
  "ha",
  "he",
  "hi",
  "ho",
  "hr",
  "ht",
  "hu",
  "hy",
  "hz",
  "ia",
  "id",
  "ie",
  "ig",
  "ii",
  "ik",
  "io",
  "is",
  "it",
  "iu",
  "ja",
  "jv",
  "ka",
  "kg",
  "ki",
  "kj",
  "kk",
  "kl",
  "km",
  "kn",
  "ko",
  "kr",
  "ks",
  "ku",
  "kv",
  "kw",
  "ky",
  "la",
  "lb",
  "lg",
  "li",
  "ln",
  "lo",
  "lt",
  "lu",
  "lv",
  "mg",
  "mh",
  "mi",
  "mk",
  "ml",
  "mn",
  "mr",
  "ms",
  "mt",
  "my",
  "na",
  "nb",
  "nd",
  "ne",
  "ng",
  "nl",
  "nn",
  "no",
  "nr",
  "nv",
  "ny",
  "oc",
  "oj",
  "om",
  "or",
  "os",
  "pa",
  "pi",
  "pl",
  "ps",
  "pt",
  "qu",
  "rm",
  "rn",
  "ro",
  "ru",
  "rw",
  "sa",
  "sc",
  "sd",
  "se",
  "sg",
  "si",
  "sk",
  "sl",
  "sm",
  "sn",
  "so",
  "sq",
  "sr",
  "ss",
  "st",
  "su",
  "sv",
  "sw",
  "ta",
  "te",
  "tg",
  "th",
  "ti",
  "tk",
  "tl",
  "tn",
  "to",
  "tr",
  "ts",
  "tt",
  "tw",
  "ty",
  "ug",
  "uk",
  "ur",
  "uz",
  "ve",
  "vi",
  "vo",
  "wa",
  "wo",
  "xh",
  "yi",
  "yo",
  "za",
  "zh",
  "zu"
]);
function Cp(e) {
  return at(e) && kp.has(e.toLowerCase());
}
const [$p, uv, pv, fv] = /* @__PURE__ */ ct(Cp, "ISO 639-1 Language Code"), jp = /^[a-z0-9]+([._+-][a-z0-9]+)*\/[a-z0-9]+([._+-][a-z0-9]+)*(\s*;\s*[a-z0-9-]+=[a-z0-9.+-]+)*$/i;
function wo(e) {
  return Ct(e, jp);
}
const [hv, gv, Ip, mv] = /* @__PURE__ */ ct(wo, "MIME type"), _p = [
  "application/javascript",
  "application/typescript",
  "application/json",
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "text/html",
  "text/markdown",
  "text/plain"
];
function bv(e) {
  return he(e, _p);
}
const Sp = [
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "text/html",
  "text/markdown",
  "text/plain"
];
function yv(e) {
  return he(e, Sp);
}
const Dp = [
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "text/markdown",
  "text/plain"
];
function xv(e) {
  return he(e, Dp);
}
const Lp = [
  "image/apng",
  "image/avif",
  "image/bmp",
  "image/gif",
  "image/jpeg",
  "image/png",
  "image/svg+xml",
  "image/webp"
];
function vv(e) {
  return he(e, Lp);
}
const Mp = new RegExp(
  "^[^\\x00-\\x08\\x0B\\x0C\\x0E-\\x1F\\x7F-\\x9F\\u2028\\u2029\\uFFF9-\\uFFFB]*$"
);
function Mo(e) {
  return at(e) && Mp.test(e);
}
function xl(e) {
  return (bo(e) || Nt(e)) && Nt(e.then);
}
const [wv, kv, Cv, $v] = /* @__PURE__ */ ct(xl, "JavaScript Promise or thenable");
function Ap(e) {
  return typeof e == "object" && e != null && typeof e.aborted == "boolean" && typeof e.addEventListener == "function";
}
const [Tp, jv, Iv, _v] = /* @__PURE__ */ ct(Ap, "JavaScript abort signal");
function Rp() {
  return typeof window < "u" && "__TAURI_INTERNALS__" in window;
}
function Sv() {
  return typeof window < "u" && !Rp();
}
async function Fp(e = "https://cloudflare.com/cdn-cgi/trace", t = 5e3) {
  return typeof navigator < "u" && !navigator.onLine ? !1 : await vl(e, t);
}
async function vl(e, t = 5e3) {
  ya("server URL", e), Ks("timeout", t);
  const n = new URL(e).origin;
  if (n === window.location.origin)
    return !0;
  const o = new AbortController(), r = setTimeout(
    () => o.abort(),
    t
  );
  try {
    const a = await fetch(n, {
      method: "HEAD",
      signal: o.signal,
      mode: "no-cors",
      cache: "no-cache"
    });
    return clearTimeout(r), a.type === "basic" || a.type === "opaque";
  } catch {
    return clearTimeout(r), !1;
  }
}
async function Et(e, t = {}) {
  ya("resource URL", e), It("option set", t), t = { ...t }, typeof navigator < "u" && !navigator.onLine && ce(
    "NotConnected: the browser is not connected"
  );
  const n = zi("request timeout", t.timeout) ?? 10 * 1e3, o = t.allowRetries === !0, r = zi("maximum retries", t.maxRetries) ?? 3;
  delete t.timeout, delete t.allowRetries, delete t.maxRetries;
  const a = t.signal;
  function i(l, d) {
    const u = l.headers.get("Retry-After");
    if (u != null) {
      const p = parseInt(u, 10);
      if (!isNaN(p))
        return Math.max(0, p * 1e3);
      const c = Date.parse(u);
      if (!isNaN(c))
        return Math.max(0, c - Date.now());
    }
    return Math.min(30 * 1e3, 500 * 2 ** d);
  }
  let s = 0;
  for (; ; ) {
    const l = new AbortController();
    t.signal = a != null ? AbortSignal.any([l.signal, a]) : l.signal;
    let d = !1;
    const u = setTimeout(() => {
      d = !0, l.abort();
    }, n);
    let p;
    try {
      p = await fetch(e, t), clearTimeout(u);
    } catch (c) {
      clearTimeout(u);
      const f = c?.message ?? "";
      // timeout by fetch or cancellation by internal timer
      (d || f.includes("timeout")) && ce("ServerUnreachable: the server is unreachable"), // explicit cancellation
      (c?.name === "AbortError" || f.includes("The user aborted a request")) && ce(
        "RequestAborted: request was aborted"
      ), (f.includes("Failed to fetch") || f.includes("CORS")) && ce("CORSblocked: cross-origin request blocked"), c?.name === "TypeError" && typeof navigator < "u" && !navigator.onLine && ce(
        "NotConnected: the browser is offline"
      ), ce("ServerUnreachable: the server is unreachable");
    }
    if (o && s < r && (p.status === 429 || p.status === 503)) {
      await new Promise(
        (c) => setTimeout(c, i(p, s))
      ), s++;
      continue;
    }
    switch (!0) {
      case p.status === 401:
        ce("AuthorizationFailure: authorization failed");
      case p.status === 403:
        ce("ForbiddenRequest: request is forbidden");
      case p.status === 404:
        ce("MissingResource: resource not found");
      case p.status === 408:
        ce("RequestTimeout: request timed out");
      case p.status === 429:
        ce("RateLimitExceeded: too many requests");
      case p.status === 500:
        ce("InternalServerError: internal server error");
      case p.status === 502:
        ce("BadGateway: bad gateway");
      case p.status === 503:
        ce("ServiceUnavailable: service is currently not available");
      case p.status === 504:
        ce("GatewayTimeout: gateway timed out");
      case p.status >= 400:
        ce(
          "HTTPError: request failed with status " + p.status
        );
    }
    return p;
  }
}
async function Op(e, t = {}) {
  return await (await Et(e, t)).text();
}
async function zp(e, t = {}) {
  return await (await Et(e, t)).json();
}
async function Np(e, t = {}) {
  return await (await Et(e, t)).arrayBuffer();
}
async function Ep(e, t = {}) {
  return await (await Et(e, t)).blob();
}
async function Vp(e, t = {}) {
  const o = await (await Et(e, t)).blob();
  let r, a;
  const i = new Promise((l, d) => {
    r = l, a = d;
  }), s = new FileReader();
  return s.onloadend = () => r(s.result), s.onerror = a, s.readAsDataURL(o), i;
}
async function Bp(e, t = {}) {
  const n = await Et(e, t), o = (n.headers.get("content-type") ?? "").split(";")[0].trim();
  switch (!0) {
    case o.startsWith("text/html"):
      return await fi(await n.text());
    case o === "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      return await yi(await n.arrayBuffer());
    case o === "application/pdf":
      return await wi(await n.arrayBuffer());
    case o.startsWith("text/markdown"):
      return await gi(await n.text());
    case o.startsWith("text/"):
    case o.includes("javascript"):
    case o.includes("typescript"):
    case o.includes("json"):
    case o.includes("css"):
    case o.includes("svg"):
    case o.includes("xml"):
      return await n.text();
    default:
      ce(`UnsupportedMIMEType: cannot convert content of type "${o}" into plain text`);
  }
}
async function Wp(e, t = {}) {
  const n = await Et(e, t), o = (n.headers.get("content-type") ?? "").split(";")[0].trim();
  switch (!0) {
    case o.startsWith("text/html"):
      return await n.text();
    case o === "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      return await xi(await n.arrayBuffer());
    case o.startsWith("text/markdown"):
      return await mi(await n.text());
    default:
      ce(`UnsupportedMIMEType: cannot convert content of type "${o}" into HTML`);
  }
}
async function Hp(e, t = {}) {
  const n = await Et(e, t), o = (n.headers.get("content-type") ?? "").split(";")[0].trim();
  switch (!0) {
    case o.startsWith("text/html"):
      return await hi(await n.text());
    case o === "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      return await vi(await n.arrayBuffer());
    case o.startsWith("text/markdown"):
      return await n.text();
    default:
      ce(`UnsupportedMIMEType: cannot convert content of type "${o}" into Markdown`);
  }
}
function wl(e) {
  return Gs("HTTP status code", e, 100, 599), kl[e] ?? "";
}
const kl = {
  /**** 1xx Informational ****/
  100: "Continue",
  101: "Switching Protocols",
  102: "Processing",
  103: "Early Hints",
  /**** 2xx Success ****/
  200: "OK",
  201: "Created",
  202: "Accepted",
  203: "Non-Authoritative Information",
  204: "No Content",
  205: "Reset Content",
  206: "Partial Content",
  207: "Multi-Status",
  208: "Already Reported",
  226: "IM Used",
  /**** 3xx Redirection ****/
  300: "Multiple Choices",
  301: "Moved Permanently",
  302: "Found",
  303: "See Other",
  304: "Not Modified",
  305: "Use Proxy",
  307: "Temporary Redirect",
  308: "Permanent Redirect",
  /**** 4xx Client Error ****/
  400: "Bad Request",
  401: "Unauthorized",
  402: "Payment Required",
  403: "Forbidden",
  404: "Not Found",
  405: "Method Not Allowed",
  406: "Not Acceptable",
  407: "Proxy Authentication Required",
  408: "Request Timeout",
  409: "Conflict",
  410: "Gone",
  411: "Length Required",
  412: "Precondition Failed",
  413: "Payload Too Large",
  414: "URI Too Long",
  415: "Unsupported Media Type",
  416: "Range Not Satisfiable",
  417: "Expectation Failed",
  418: "I'm a Teapot",
  421: "Misdirected Request",
  422: "Unprocessable Entity",
  423: "Locked",
  424: "Failed Dependency",
  425: "Too Early",
  426: "Upgrade Required",
  428: "Precondition Required",
  429: "Too Many Requests",
  431: "Request Header Fields Too Large",
  451: "Unavailable For Legal Reasons",
  /**** 5xx Server Error ****/
  500: "Internal Server Error",
  501: "Not Implemented",
  502: "Bad Gateway",
  503: "Service Unavailable",
  504: "Gateway Timeout",
  505: "HTTP Version Not Supported",
  506: "Variant Also Negotiates",
  507: "Insufficient Storage",
  508: "Loop Detected",
  510: "Not Extended",
  511: "Network Authentication Required"
}, be = {
  /**** Configuration ****/
  get Configuration() {
    return {
      ServerChoice: be._ServerChoice,
      customServer: be.customServer,
      ServerBlacklist: be.ServerBlacklist,
      ServerWhitelist: be.ServerWhitelist,
      ResultBlacklist: be.ResultBlacklist,
      ResultWhitelist: be.ResultWhitelist
    };
  },
  set Configuration(e) {
    It("SearXNG configuration", e);
    const {
      ServerChoice: t,
      customServer: n,
      ServerBlacklist: o,
      ServerWhitelist: r,
      ResultBlacklist: a,
      ResultWhitelist: i
    } = e;
    if (Ft("SearXNG server choice", t, ["custom", "public"]), ba("SearXNG custom Server", n), Wt('SearXNG configuration "ServerBlacklist"', o, st), Wt('SearXNG configuration "ServerWhitelist"', r, st), Wt('SearXNG configuration "ResultBlacklist"', a, st), Wt('SearXNG configuration "ResultWhitelist"', i, st), n != null) {
      const { ServerURL: s, Authentication: l, Credentials: d } = n;
      Vn("SearXNG custom server url", s), Ft("SearXNG custom server authentication", l, ["none", "basic", "bearer"]), un("SearXNG custom server credentials", d);
    }
    be.ServerChoice = t ?? "public", be.customServer = n ?? { Authentication: "none" }, be.ServerBlacklist = o ?? [], be.ServerWhitelist = r ?? [], be.ResultBlacklist = a ?? [], be.ResultWhitelist = i ?? [];
  },
  /**** preserveConfiguration ****/
  preserveConfiguration: function() {
    localStorage["SearXNG-Configuration"] = JSON.stringify(be.Configuration);
  },
  /**** restoreConfiguration ****/
  restoreConfiguration: function() {
    if (localStorage["SearXNG-Configuration"] != null)
      try {
        const e = JSON.parse(localStorage["SearXNG-Configuration"]);
        be.Configuration = e;
      } catch (e) {
        console.warn('"SearXNG.restoreConfiguration" failed with ' + e);
      }
  },
  /**** hasPreservedConfiguration ****/
  get hasPreservedConfiguration() {
    return localStorage["SearXNG-Configuration"] != null;
  },
  set hasPreservedConfiguration(e) {
    bp("SearXNG.hasPreservedConfiguration");
  },
  /**** customServer[URL/Authentication/Credentials] ****/
  _customServer: {
    ServerURL: void 0,
    Authentication: "none",
    Credentials: void 0
  },
  get customServer() {
    return { ...be._customServer };
  },
  set customServer(e) {
    It("SearXNG custom server setting", e), Vn("SearXNG custom server url", e.ServerURL), Ft("SearXNG custom server authentication", e.Authentication, ["none", "basic", "bearer"]), un("SearXNG custom server credentials", e.Credentials), be._customServer = {
      ServerURL: e.ServerURL,
      Authentication: e.Authentication ?? "none",
      Credentials: e.Credentials
    };
  },
  get customServerURL() {
    return be._customServer.ServerURL;
  },
  set customServerURL(e) {
    Vn("SearXNG custom server url", e), be._customServer.ServerURL = e;
  },
  get customServerAuthentication() {
    return be._customServer.Authentication;
  },
  set customServerAuthentication(e) {
    Ft("SearXNG custom server authentication", e, ["none", "basic", "bearer"]), be._customServer.Authentication = e;
  },
  get customServerCredentials() {
    return be._customServer.Credentials;
  },
  set customServerCredentials(e) {
    un("SearXNG custom server credentials", e), be._customServer.Credentials = e;
  },
  /**** publicServers - fetches the list of registered public SearXNG servers ****/
  publicServers: async function(e = {}) {
    It("option set", e);
    const { ServiceURL: t, Signal: n, ...o } = e;
    Vn("SearXNG service URL", t), Tp("fetch abort signal", n);
    let r;
    try {
      if (r = await Et(
        t ?? "https://searx.space/data/instances.json",
        {
          ...o,
          ...n != null ? { signal: n } : {}
        }
      ), r.ok) {
        const i = await r.json();
        return !De(i) || !De(i.instances) ? [] : Object.keys(i.instances).filter(be.ServerIsAcceptable);
      }
    } catch (i) {
      i.name === "AbortError" ? ce("Aborted: SearXNG server scan was aborted") : ce("InternalError: SearXNG server scan failed with " + i);
    }
    const a = ua(r.status, 100, 599) ? wl(r.status) : "(unknown)";
    ce(
      "InternalError: SearXNG server scan failed with HTTP status " + r.status + " " + a
    );
  },
  /**** ServerBlacklist (for SearXNG servers) ****/
  _ServerBlacklist: {},
  get ServerBlacklist() {
    return Object.keys(be._ServerBlacklist);
  },
  set ServerBlacklist(e) {
    Wt("SearXNG server blacklist", e, st), be._ServerBlacklist = {}, (e ?? []).forEach(
      (t) => be._ServerBlacklist[t] = !0
    );
  },
  // note: caller should probably rescan the list of public SearXNG servers
  /**** ServerWhitelist (for SearXNG servers) ****/
  _ServerWhitelist: {
    "http://127.0.0.1:8080": !0,
    "http://127.0.0.1:8888": !0,
    "http://localhost:8080": !0,
    "http://localhost:8888": !0,
    "http://[::1]:8080": !0,
    "http://[::1]:8888": !0
  },
  get ServerWhitelist() {
    return Array.from(Object.keys(be._ServerWhitelist));
  },
  set ServerWhitelist(e) {
    Wt("SearXNG server whitelist", e, st), be._ServerWhitelist = {}, (e ?? []).forEach(
      (t) => be._ServerWhitelist[t] = !0
    );
  },
  // note: caller should probably rescan the list of public SearXNG servers
  /**** ServerIsBlacklisted ****/
  ServerIsBlacklisted: function(e) {
    return st(e) && e in be._ServerBlacklist;
  },
  /**** ServerIsWhitelisted ****/
  ServerIsWhitelisted: function(e) {
    return st(e) && e in be._ServerWhitelist;
  },
  /**** ServerIsAcceptable ****/
  ServerIsAcceptable: function(e) {
    return st(e) && (e.startsWith("https://") || e in be._ServerWhitelist) && !(e in be._ServerBlacklist);
  },
  /**** ServerChoice ****/
  _ServerChoice: "public",
  get ServerChoice() {
    return be._ServerChoice;
  },
  set ServerChoice(e) {
    Bn("SearXNG server choice setting", e, ["public", "custom"]), be._ServerChoice = e;
  },
  /**** nextServer ****/
  _publicServers: [],
  nextServer: async function() {
    if (be._ServerChoice === "custom")
      return be._customServer.ServerURL == null && ce(
        "MissingCustomServer: custom SearXNG server is missing"
      ), be.customServer;
    {
      let e = be._publicServers;
      if (e.length === 0 && (e = be._publicServers = await be.publicServers()), e.length === 0)
        ce(
          "MissingPublicServer: could not find any public SearXNG server"
        );
      else {
        const t = Math.floor(Math.random() * e.length);
        return {
          ServerURL: e.splice(t, 1)[0],
          Authentication: "none",
          Credentials: void 0
        };
      }
    }
  },
  /**** query - uses SearXNG to perform a given query ****/
  query: async function(e, t = {}) {
    an("search phrase", e), It("search options", t);
    const {
      ServerURL: n,
      ServerAuthentication: o,
      ServerCredentials: r,
      language: a,
      categories: i,
      num_results: s
    } = t;
    Vn("SearXNG server URL", n), Ft("SearXNG server authentication", o, ["none", "basic", "bearer"]), un("SearXNG server credentials", r), $p("SearXNG query language", a), Ft("SearXNG query categories", i, ["general"]), vr("SearXNG query result limit", s);
    const l = n == null ? await be.nextServer() : {
      ServerURL: n,
      Authentication: o ?? "none",
      Credentials: r
    };
    l.ServerURL == null && ce(
      "MissingSearXNGServer: no SearXNG server given"
    ), l.Authentication !== "none" && l.Credentials == null && ce(
      "MissingCredentials: no SearXNG server credentials given"
    );
    const d = {};
    if (l.Authentication !== "none") {
      const p = new Headers();
      p.set("Authorization", `${C0(l.Authentication)} ${l.Credentials}`), d.headers = p;
    }
    e = e.trim(), e === "" && ce(
      "EmptyArgument: the given search phrase is empty"
    );
    const u = new URLSearchParams({
      q: e,
      language: a ?? "en",
      format: "html",
      categories: i ?? "general",
      num_results: "" + (s ?? 20)
    });
    try {
      const c = await (await Et(
        `${l.ServerURL}/search?${u}`,
        d
      )).text();
      return Array.from(c.matchAll(/<h3><a href="([^"]+)"/g)).map((g) => g[1]).filter((g) => g != null && g.trim() !== "").filter(be.ResultIsAcceptable);
    } catch (p) {
      [
        "ServerUnreachable",
        "AuthorizationFailure",
        "ForbiddenRequest",
        "InternalServerError"
      ].includes(p.name) ? (be.ServerBlacklist = [...be.ServerBlacklist, l.ServerURL], console.warn("SearXNG search failed with", p, `

>>>> server was blacklisted
`)) : console.warn("SearXNG search failed with", p);
    }
    return [];
  },
  /**** _withoutQueryString - strips any query string from a given URL ****/
  _withoutQueryString: function(e) {
    return e.replace(/\?.*$/, "");
  },
  /**** ResultBlacklist (for query results) ****/
  _ResultBlacklist: { "https://www.sjmed.com": !0 },
  get ResultBlacklist() {
    return Object.keys(be._ResultBlacklist);
  },
  set ResultBlacklist(e) {
    Wt("SearXNG result blacklist", e, st), be._ResultBlacklist = {}, (e ?? []).forEach(
      (t) => be._ResultBlacklist[be._withoutQueryString(t)] = !0
    );
  },
  /**** ResultWhitelist (for query results) ****/
  _ResultWhitelist: {},
  get ResultWhitelist() {
    return Object.keys(be._ResultWhitelist);
  },
  set ResultWhitelist(e) {
    Wt("SearXNG result whitelist", e, st), be._ResultWhitelist = {}, (e ?? []).forEach(
      (t) => be._ResultWhitelist[be._withoutQueryString(t)] = !0
    );
  },
  /**** ResultIsBlacklisted ****/
  ResultIsBlacklisted: function(e) {
    return st(e) && be._withoutQueryString(e) in be._ResultBlacklist;
  },
  /**** ResultIsWhitelisted ****/
  ResultIsWhitelisted: function(e) {
    return st(e) && be._withoutQueryString(e) in be._ResultWhitelist;
  },
  /**** ResultIsAcceptable ****/
  ResultIsAcceptable: function(e) {
    return !st(e) || be.ResultIsBlacklisted(e) ? !1 : Object.keys(be._ResultWhitelist).length === 0 || be.ResultIsWhitelisted(e);
  }
}, Dv = {
  InternetIsAvailable: Fp,
  ServerIsReachable: vl,
  fetched: Et,
  fetchedText: Op,
  fetchedJSON: zp,
  fetchedBinary: Np,
  fetchedBlob: Ep,
  fetchedDataURL: Vp,
  fetchedAsText: Bp,
  fetchedAsHTML: Wp,
  fetchedAsMarkdown: Hp,
  DescriptionOfHTTPStatus: wl,
  HTTPMessageForStatus: kl,
  SearXNG: be
}, Sn = /* @__PURE__ */ Symbol("normalizedName"), dr = /* @__PURE__ */ Symbol("L10nDictionary"), Cl = "/", ur = Cl + "icons/", yt = { Placeholder: "(empty)", disabled: !1 }, Gp = { Placeholder: "(no Selection)", disabled: !0 }, Up = { Placeholder: "(mixed Values)", disabled: !1 };
function Je(e) {
  return e === yt || e === Gp || e === Up;
}
function it(e, t, n) {
  return Je(e) ? {
    actualValue: void 0,
    actualPlaceholder: e === yt ? n ?? e.Placeholder : e.Placeholder,
    actualDisabling: t || e.disabled
  } : { actualValue: e, actualPlaceholder: n, actualDisabling: t };
}
const $t = "-webkit-mask-size:contain; mask-size:contain; -webkit-mask-position:center center; mask-position:center center; -webkit-mask-repeat:no-repeat; mask-repeat:no-repeat;";
function Ao(e, t = 2) {
  const n = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='${t}' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='${e}'/%3E%3C/svg%3E")`;
  return `-webkit-mask-image:${n}; mask-image:${n};`;
}
const Cr = Ao("m6 9 6 6 6-6"), Kp = Ao("m18 15-6-6-6 6"), Da = Ao("m15 18-6-6 6-6"), $r = Ao("m9 18 6-6-6-6"), qp = Ao("M20 6 9 17l-5-5");
function ko(e) {
  return Kt(e);
}
const [pr, Lv, Mv, Av] = /* @__PURE__ */ ct(ko, "JCL coordinate");
function Co(e) {
  return Kt(e) && e >= 0;
}
const [Dt, Tv, Rv, Fv] = /* @__PURE__ */ ct(Co, "JCL dimension");
function Xp(e) {
  return De(e) && ko(e.x) && ko(e.y);
}
const [Ov, zv, Nv, Ev] = /* @__PURE__ */ ct(Xp, "JCL position");
function Yp(e) {
  return De(e) && Co(e.Width) && Co(e.Height);
}
const [Vv, Bv, Wv, Hv] = /* @__PURE__ */ ct(Yp, "JCL size");
function Jp(e) {
  return De(e) && ko(e.x) && Co(e.Width) && ko(e.y) && Co(e.Height);
}
const [Gv, Uv, Kv, qv] = /* @__PURE__ */ ct(Jp, "JCL geometry"), Xv = va;
function bn(e) {
  return De(e) && "current" in e;
}
const [Yv, Jv, jr, Zv] = /* @__PURE__ */ ct(bn, "preact component reference");
function Qn(e) {
  return new RegExp("^(?:" + e + ")$");
}
function Zp(e) {
  return _n("name", e), Xt(e);
}
function Xt(e) {
  return e.replaceAll(".", "-");
}
function At(e) {
  let t = e.replace(/:.*$/, "").trim(), n = e.replace(/^[^:]*:/, "").trim();
  const o = /^[-]+$/.test(n), r = n[0] === "-";
  return t === e && (t = t.replace(/^-/, "")), r && (n = n.replace(/^-/, "")), { Value: t, Label: n, disabled: r, isRuler: o };
}
function G(e) {
  It("PropSet", e);
  const t = {};
  for (const o of Object.keys(e))
    t[Er(o)] = e[o];
  t.children = Mt(e.children);
  const n = {};
  for (const o of Object.keys(t))
    o !== "children" && o !== "RestProps" && (n[o] = t[o]);
  return t.RestProps = n, new Proxy(t, {
    get(o, r) {
      if (typeof r == "symbol")
        return o[r];
      switch (!0) {
        case r === "children":
          return [...o.children];
        // was normalised into an array
        case r === "RestProps":
          return n;
        // as a reference (to be modified externally)
        default: {
          const a = Er(r);
          return delete o.RestProps[a], o[a];
        }
      }
    },
    set() {
      ce('TypeError: "PropSet" is read-only');
    },
    deleteProperty() {
      ce('TypeError: "PropSet" is read-only');
    },
    defineProperty() {
      ce('TypeError: "PropSet" is read-only');
    },
    has(o, r) {
      if (typeof r == "symbol")
        return r in o;
      switch (!0) {
        case r === "children":
          return "children" in o;
        case r === "RestProps":
          return "RestProps" in o;
        default:
          return Er(r) in o;
      }
    },
    ownKeys(o) {
      return Reflect.ownKeys(o);
    },
    getOwnPropertyDescriptor(o, r) {
      const a = Object.getOwnPropertyDescriptor(o, r);
      return a != null && (a.writable = !1, a.configurable = !0), a;
    }
  });
}
function Er(e) {
  return e.replace(/[-_]/g, "").trim().toLowerCase();
}
function z(e, t) {
  if (Yt("Validator", t), t(e) === !0)
    return e;
}
function Y(e) {
  switch (!0) {
    case rn(e):
      return e;
    case e === "false":
      return !1;
    case e === "true":
      return !0;
  }
}
function qe(e) {
  if (bt(e) || at(e) && (e = parseFloat(e), !isNaN(e)))
    return e;
}
function nn(e, t, n, o, r) {
  return To(
    e,
    (a) => Io(a, t, n, o, r)
  );
}
function Qv(e) {
  return To(e, xr);
}
function fr(e, t, n) {
  return To(
    e,
    (o) => ua(o, t, n)
  );
}
function $e(e) {
  return To(e, pn);
}
function gn(e) {
  return To(e, pa);
}
function Mn(e) {
  return z(e, at);
}
function Pv(e, t) {
  return z(e, (n) => Ct(n, t));
}
function re(e) {
  return z(e, hn);
}
function D(e) {
  return z(e, Ne);
}
function R(e) {
  return z(e, Nt);
}
function St(e) {
  return z(e, Dn);
}
function ew(e) {
  return z(e, Ln);
}
function tw(e) {
  return z(e, kr);
}
function Fn(e) {
  return z(e, st);
}
function nw(e) {
  return z(e, Sa);
}
function ow(e) {
  return z(e, (t) => Sa(t) || pn(t));
}
function rw(e) {
  return z(e, bl);
}
function Me(e) {
  vp("Identifier", e), ce("MissingArgument: no " + Lt(e) + " given");
}
function To(e, t) {
  if (t(e) === !0 || at(e) && (e = parseFloat(e), t(e) === !0))
    return e;
}
const $l = [
  "--jcl-bg-color",
  "--jcl-fg-color",
  "--jcl-primary-bg-color",
  "--jcl-primary-fg-color",
  "--jcl-secondary-bg-color",
  "--jcl-secondary-fg-color",
  "--jcl-muted-bg-color",
  "--jcl-muted-fg-color",
  "--jcl-destructive-bg-color",
  "--jcl-destructive-fg-color",
  "--jcl-accent-bg-color",
  "--jcl-accent-fg-color",
  "--jcl-success-bg-color",
  "--jcl-success-fg-color",
  "--jcl-warning-bg-color",
  "--jcl-warning-fg-color",
  "--jcl-border-color",
  "--jcl-input-border-color",
  // border for outline-only controls (Check-
  // box, Radiobutton, Switch); falls back to
  // "--jcl-border-color"
  "--jcl-ring-color"
], jl = ["--jcl-border-radius"], Il = [
  "--jcl-font",
  "--jcl-serif-font",
  "--jcl-sans-serif-font",
  "--jcl-monospace-font"
], aw = [
  ...$l,
  ...jl,
  ...Il
];
function Qp(e) {
  return typeof e != "string" ? !1 : typeof CSS > "u" ? !0 : CSS.supports("color", e);
}
function Pp(e) {
  return typeof e != "string" ? !1 : typeof CSS > "u" ? !0 : CSS.supports("border-radius", e);
}
function Zr(e) {
  if (!De(e))
    return !1;
  const t = (n, o) => e[n] === void 0 || o(e[n]);
  return $l.every((n) => t(n, Qp)) && jl.every((n) => t(n, Pp)) && Il.every((n) => t(n, at));
}
const [iw, sw, lw, cw] = /* @__PURE__ */ ct(Zr, "JCL swatch");
function ef(e) {
  return De(e) && Zr(e.light) && Zr(e.dark);
}
const [tf, dw, nf, uw] = /* @__PURE__ */ ct(ef, "set of JCL swatches");
function Ro(e, t) {
  if (Ft("UI theme", e, [...Ll]), tf("set of UI swatches", t), e == null && (e = "light"), t == null)
    return "";
  e === "auto" && (e = Gt("(prefers-color-scheme: dark)") ? "dark" : "light");
  const n = t[e];
  return n == null ? "" : Object.entries(n).filter(([r]) => /^--[-a-zA-Z0-9_]+$/.test(r)).map(([r, a]) => `${r}:${String(a).replace(/[;}]/g, "")}`).join(";") + ";";
}
const of = ["ltr", "rtl"];
function _l(e) {
  return at(e) && e.toLowerCase() in Dl;
}
const [pw, fw, Pn, hw] = /* @__PURE__ */ ct(_l, "supported locale"), rf = /* @__PURE__ */ new Set([
  "ar",
  // Arabic
  "he",
  // Hebrew
  "fa"
  // Persian / Farsi
]);
function Sl(e) {
  Pn("Locale", e);
  const t = e.toLowerCase().replace(/-.*$/, "");
  return rf.has(t) ? "rtl" : "ltr";
}
const af = {
  en: "gb",
  "en-us": "us",
  "en-ca": "ca",
  "en-au": "au",
  "en-gb": "gb",
  "en-nz": "nz",
  de: "de",
  "de-ch": "ch",
  "de-li": "li",
  fr: "fr",
  "fr-ch": "ch",
  it: "it",
  "it-ch": "ch",
  es: "es",
  nl: "nl",
  pt: "pt",
  el: "gr",
  fi: "fi",
  sk: "sk",
  si: "si",
  mt: "mt",
  sv: "se",
  no: "no",
  da: "dk",
  is: "is",
  ja: "jp",
  zh: "cn",
  "zh-tw": "tw",
  "zh-hk": "hk",
  ko: "kr",
  ru: "ru",
  pl: "pl",
  cs: "cz",
  hu: "hu",
  ro: "ro",
  bg: "bg",
  hr: "hr",
  tr: "tr",
  ar: "ae",
  he: "il",
  fa: "ir",
  hi: "in",
  th: "th",
  id: "id",
  ms: "my",
  uk: "ua",
  vi: "vn"
}, sf = /^[a-z]{2}$/i;
function lf(e) {
  return qs("ISO Country Code", e, sf), [...e.toUpperCase()].map(
    (t) => String.fromCodePoint(t.charCodeAt(0) + 127397)
  ).join("");
}
function gw(e) {
  Pn("Locale", e), e = e.toLowerCase();
  const t = La(af, e);
  return t != null ? lf(t) : "🏳";
}
function La(e, t) {
  return e[t] ?? e[t.split("-")[0]];
}
const Dl = {
  en: "English",
  "en-us": "English (US)",
  "en-ca": "English (CA)",
  "en-au": "English (AU)",
  "en-gb": "English (UK)",
  "en-nz": "English (NZ)",
  de: "Deutsch",
  "de-ch": "Deutsch (CH)",
  "de-li": "Deutsch (LI)",
  fr: "Français",
  "fr-ch": "Français (CH)",
  it: "Italiano",
  "it-ch": "Italiano (CH)",
  es: "Español",
  nl: "Nederlands",
  pt: "Português",
  el: "Ελληνικά",
  fi: "Suomi",
  sk: "Slovenčina",
  si: "Slovenščina",
  mt: "Malti",
  sv: "Svenska",
  no: "Norsk",
  da: "Dansk",
  is: "Íslenska",
  ja: "日本語",
  zh: "中文",
  "zh-tw": "中文 (TW)",
  "zh-hk": "中文 (HK)",
  ko: "한국어",
  ru: "Русский",
  pl: "Polski",
  cs: "Čeština",
  hu: "Magyar",
  ro: "Română",
  bg: "Български",
  hr: "Hrvatski",
  tr: "Türkçe",
  ar: "العربية",
  he: "עברית",
  fa: "فارسی",
  hi: "हिन्दी",
  th: "ไทย",
  id: "Bahasa Indonesia",
  ms: "Bahasa Melayu",
  uk: "Українська",
  vi: "Tiếng Việt"
};
function mw(e) {
  return Pn("Locale", e), e = e.toLowerCase(), La(Dl, e) ?? e;
}
const cf = {
  "en-us": "USD",
  "en-ca": "CAD",
  "en-au": "AUD",
  "en-gb": "GBP",
  "en-nz": "NZD",
  de: "EUR",
  "de-ch": "CHF",
  "de-li": "CHF",
  fr: "EUR",
  "fr-ch": "CHF",
  it: "EUR",
  "it-ch": "CHF",
  es: "EUR",
  nl: "EUR",
  pt: "EUR",
  el: "EUR",
  fi: "EUR",
  sk: "EUR",
  si: "EUR",
  mt: "EUR",
  sv: "SEK",
  no: "NOK",
  da: "DKK",
  is: "ISK",
  ja: "JPY",
  zh: "CNY",
  "zh-tw": "TWD",
  "zh-hk": "HKD",
  ko: "KRW",
  ru: "RUB",
  pl: "PLN",
  cs: "CZK",
  hu: "HUF",
  ro: "RON",
  bg: "BGN",
  hr: "EUR",
  tr: "TRY",
  ar: "AED",
  he: "ILS",
  fa: "IRR",
  hi: "INR",
  th: "THB",
  id: "IDR",
  ms: "MYR",
  uk: "UAH",
  vi: "VND"
};
function df(e) {
  return e = e.toLowerCase(), La(cf, e) ?? "USD";
}
function Ir(e) {
  const t = /* @__PURE__ */ new Map();
  return (n, o) => {
    const r = n + "|" + JSON.stringify(o);
    let a = t.get(r);
    return a == null && t.set(r, a = new e(n, o)), a;
  };
}
const uf = Ir(Intl.PluralRules), ss = Ir(Intl.NumberFormat), pf = Ir(Intl.DateTimeFormat), ff = Ir(Intl.RelativeTimeFormat);
function hf(e, t) {
  return e.replace(
    /\{\{(\w+)\}\}/g,
    (n, o) => t[o] != null ? String(t[o]) : n
    // keep {{Key}} if variable is missing
  );
}
const Ma = {}, gf = /^[^\x00-\x1F\x7F\x80-\x9F]+$/;
function Yo(e) {
  return at(e) && gf.test(e);
}
function mf(e) {
  return De(e) ? Object.entries(e).every(([t, n]) => Yo(t) && (Yo(n) || De(n) && Object.entries(n).every(([o, r]) => Yo(o) && Yo(r)))) : !1;
}
const [bw, yw, bf, xw] = /* @__PURE__ */ ct(mf, "localization dictionary");
function yf(e) {
  const t = Object.create(e);
  for (const n in t)
    t[n] = Object.create(t[n]);
  return t;
}
function hr(e, t, n = Ma) {
  Pn("Locale", e), bf("Dictionary", t), e = e.toLowerCase(), n[e] == null ? n[e] = { ...t } : Object.assign(n[e], t);
}
function Qr(e, t, n = Ma) {
  an("localization key", e), Pn("locale", t), t = t.toLowerCase();
  let o = n[t]?.[e];
  if (o != null)
    return o;
  const r = t.split("-");
  for (; r.length > 1; )
    if (r.pop(), o = n[r.join("-")]?.[e], o != null)
      return o;
  if (t !== "en" && (o = n.en?.[e], o != null))
    return o;
}
const Ll = ["auto", "light", "dark"], xf = ["coarse", "fine"], vf = ["none", "hover"], wf = ["reduced"], kf = ["less", "more"];
function Cf(e) {
  if (typeof e != "string")
    return "en";
  let t = e.toLowerCase();
  for (; ; ) {
    if (_l(t))
      return t;
    const n = t.lastIndexOf("-");
    if (n < 0)
      break;
    t = t.slice(0, n);
  }
  return "en";
}
const $f = {
  light: {
    "--jcl-bg-color": "oklch(1 0 0)",
    "--jcl-fg-color": "oklch(0.145 0 0)",
    "--jcl-primary-bg-color": "#0075FF",
    // Chrome's accent blue
    "--jcl-primary-fg-color": "oklch(1 0 0)",
    // white
    "--jcl-secondary-bg-color": "oklch(0.97 0 0)",
    "--jcl-secondary-fg-color": "oklch(0.205 0 0)",
    "--jcl-muted-bg-color": "oklch(0.97 0 0)",
    "--jcl-muted-fg-color": "oklch(0.556 0 0)",
    "--jcl-destructive-bg-color": "oklch(0.577 0.245 27.325)",
    "--jcl-destructive-fg-color": "oklch(0.985 0 0)",
    "--jcl-accent-bg-color": "oklch(0.97 0 0)",
    "--jcl-accent-fg-color": "oklch(0.205 0 0)",
    "--jcl-success-bg-color": "oklch(0.627 0.194 149.214)",
    // green-600
    "--jcl-success-fg-color": "oklch(0.985 0 0)",
    "--jcl-warning-bg-color": "oklch(0.769 0.188 70.08)",
    // amber-500
    "--jcl-warning-fg-color": "oklch(0.145 0 0)",
    "--jcl-border-color": "oklch(0.922 0 0)",
    "--jcl-ring-color": "#0075FF",
    // Chrome's accent blue
    "--jcl-border-radius": "8px",
    // shadcn "rounded-md" equivalent
    "--jcl-font": "ui-sans-serif, system-ui, sans-serif",
    "--jcl-serif-font": 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
    "--jcl-sans-serif-font": "ui-sans-serif, system-ui, sans-serif",
    "--jcl-monospace-font": "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
  },
  dark: {
    "--jcl-bg-color": "oklch(0.145 0 0)",
    "--jcl-fg-color": "oklch(0.985 0 0)",
    "--jcl-primary-bg-color": "#4D9FFF",
    // lighter variant of #0075FF
    "--jcl-primary-fg-color": "oklch(1 0 0)",
    // white
    "--jcl-secondary-bg-color": "oklch(0.269 0 0)",
    "--jcl-secondary-fg-color": "oklch(0.985 0 0)",
    "--jcl-muted-bg-color": "oklch(0.269 0 0)",
    "--jcl-muted-fg-color": "oklch(0.708 0 0)",
    "--jcl-destructive-bg-color": "oklch(0.704 0.191 22.216)",
    "--jcl-destructive-fg-color": "oklch(0.985 0 0)",
    "--jcl-accent-bg-color": "oklch(0.269 0 0)",
    "--jcl-accent-fg-color": "oklch(0.985 0 0)",
    "--jcl-success-bg-color": "oklch(0.723 0.219 149.579)",
    // green-500
    "--jcl-success-fg-color": "oklch(0.145 0 0)",
    "--jcl-warning-bg-color": "oklch(0.828 0.189 84.429)",
    // amber-400
    "--jcl-warning-fg-color": "oklch(0.145 0 0)",
    "--jcl-border-color": "oklch(1 0 0 / 10%)",
    // "--jcl-border-color" alone is too faint for outline-only controls
    // (Checkbox, Radiobutton, Switch), whose border is their only visual
    // cue when unchecked - so those get a brighter, dedicated border:
    "--jcl-input-border-color": "oklch(1 0 0 / 20%)",
    "--jcl-ring-color": "#4D9FFF",
    // lighter variant of #0075FF
    "--jcl-border-radius": "8px",
    // shadcn "rounded-md" equivalent
    "--jcl-font": "ui-sans-serif, system-ui, sans-serif",
    "--jcl-serif-font": 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
    "--jcl-sans-serif-font": "ui-sans-serif, system-ui, sans-serif",
    "--jcl-monospace-font": "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
  }
};
function jf() {
  const e = Cf(
    typeof navigator < "u" ? navigator.language : "en"
  );
  return {
    Theme: "auto",
    // which means: "use OS setting"
    SwatchSet: structuredClone($f),
    PointerAccuracy: Gt("(pointer: coarse)") ? "coarse" : "fine",
    HoverCapability: Gt("(hover: none)") ? "none" : "hover",
    preferredMotion: Gt("(prefers-reduced-motion: reduce)") ? "reduced" : void 0,
    preferredContrast: Gt("(prefers-contrast: more)") ? "more" : Gt("(prefers-contrast: less)") ? "less" : void 0,
    Locale: e,
    Direction: Sl(e),
    TooltipDelay: 600,
    [dr]: Ma
  };
}
const _r = /* @__PURE__ */ jf(), kt = /* @__PURE__ */ mn(void 0);
function Fo(e) {
  const [t, n] = He(e.Theme), [o, r] = He(e.SwatchSet), [a, i] = He(e.PointerAccuracy), [s, l] = He(e.HoverCapability), [d, u] = He(e.preferredMotion), [p, c] = He(e.preferredContrast), [f, h] = He(e.Locale), [g, y] = He(e.Direction), [m, v] = He(e.TooltipDelay), [C, _] = He(
    yf(e[dr])
  );
  function j(N) {
    Bn("UI theme", N, [...Ll]), n(N);
  }
  function x(N) {
    nf("UI swatch set", N), r(N);
  }
  function w(N) {
    Bn("UI pointer accuracy", N, [...xf]), i(N);
  }
  function T(N) {
    Bn("UI hover capability", N, [...vf]), l(N);
  }
  function L(N) {
    Ft("preferred UI motion", N, [...wf]), u(N);
  }
  function $(N) {
    Ft("preferred UI contrast", N, [...kf]), c(N);
  }
  function I(N) {
    Pn("Locale", N), h(N);
  }
  function M(N) {
    Bn("text direction", N, [...of]), y(N);
  }
  function S(N) {
    Un("tooltip delay", N), v(N);
  }
  function F(N, X) {
    hr(N, X, C), _({ ...C });
  }
  return Jt(() => ({
    Theme: t,
    setTheme: j,
    SwatchSet: o,
    setSwatchSet: x,
    PointerAccuracy: a,
    setPointerAccuracy: w,
    HoverCapability: s,
    setHoverCapability: T,
    preferredMotion: d,
    setPreferredMotion: L,
    preferredContrast: p,
    setPreferredContrast: $,
    Locale: f,
    setLocale: I,
    Direction: g,
    setDirection: M,
    TooltipDelay: m,
    setTooltipDelay: S,
    [dr]: C,
    registerL10n: F
  }), [
    t,
    o,
    a,
    s,
    d,
    p,
    f,
    g,
    m,
    C
  ]);
}
const If = /* @__PURE__ */ Object.create(null);
function ht(e) {
  return an("module specifier", e), If[e] ??= import(e);
}
function Oo(e) {
  let t;
  return () => t ??= e();
}
const ls = /* @__PURE__ */ new WeakMap(), Jo = /* @__PURE__ */ new WeakMap();
function eo(e) {
  Yt("library loader", e);
  const [t, n] = He(Jo.get(e));
  switch (je(() => {
    if (Jo.get(e) === "loaded")
      return;
    let o = !1, r = ls.get(e);
    return r == null && (r = e(), ls.set(e, r)), r.then(() => {
      Jo.set(e, "loaded"), o || n("loaded");
    }, (a) => {
      Jo.set(e, a), o || n(a);
    }), () => {
      o = !0;
    };
  }, []), !0) {
    case t == null:
      return !1;
    case t === "loaded":
      return !0;
    default:
      ce(
        "LibraryNotLoadable: a required library could not be loaded, reason: " + (t?.message ?? t)
      );
  }
}
function _f() {
  const [e, t] = He(
    // SSR-ready
    () => typeof navigator < "u" ? navigator.onLine : !0
  );
  return je(() => {
    const n = new AbortController(), o = () => t(!0), r = () => t(!1);
    return window.addEventListener("online", o, { signal: n.signal }), window.addEventListener("offline", r, { signal: n.signal }), () => n.abort();
  }, []), e;
}
function Sf() {
  const [e, t] = He(() => ({
    // SSR-ready
    Width: typeof window < "u" ? window.innerWidth : 0,
    Height: typeof window < "u" ? window.innerHeight : 0
  })), n = U(0), o = ie(() => {
    cancelAnimationFrame(n.current), n.current = requestAnimationFrame(() => {
      t({ Width: window.innerWidth, Height: window.innerHeight });
    });
  }, []);
  return je(() => (window.addEventListener("resize", o), () => {
    window.removeEventListener("resize", o), cancelAnimationFrame(n.current);
  }), [o]), e;
}
function dt() {
  const [e, t] = He({});
  return ie(() => t({}), []);
}
function Sr() {
  const e = gt(kt);
  return e == null && ce(
    'InvalidContext: "useCustomization" must only be used inside a "JCL_Applet", "JCL_Overlay", "JCL_Dialog" or "JCL_Customizable"'
  ), e;
}
function Df() {
  return Aa(Sr());
}
function Aa(e) {
  const { Locale: t, Direction: n, [dr]: o } = e, r = df(t);
  function a(u, p, c) {
    const f = Qr(u, t, o);
    if (f == null)
      return u;
    let h;
    if (typeof f == "string")
      h = f;
    else {
      const g = uf(t).select(c ?? 0);
      h = f[g] ?? f.other ?? u;
    }
    return p == null ? h : hf(h, p);
  }
  function i(u, p) {
    return ss(t, p).format(u);
  }
  function s(u, p) {
    return pf(t, p).format(u);
  }
  function l(u, p, c) {
    return ff(t, c).format(u, p);
  }
  function d(u, p) {
    return ss(t, {
      style: "currency",
      currency: r,
      ...p
    }).format(u);
  }
  return {
    Locale: t,
    Direction: n,
    Currency: r,
    localized: a,
    formattedNumber: i,
    formattedDate: s,
    formattedRelativeDate: l,
    formattedCurrency: d
  };
}
function Lf(e = {}) {
  !Nt(e) && !De(e) && ce(
    "InvalidArgument:the given initial configuration is neither a plain object nor a function"
  );
  const t = U(void 0);
  t.current == null && (Nt(e) && (e = Xe(
    'component callback "initialConfiguration"',
    e
  ), De(e) || ce(
    "InvalidArgument:the result of the initial configuration callback is not a plain object"
  )), t.current = { ...e });
  const n = ie((o) => {
    if (ba("configuration change set", o), o != null)
      for (const [r, a] of Object.entries(o))
        a === void 0 ? delete t.current[r] : De(a) ? De(t.current[r]) ? Object.assign(t.current[r], a) : t.current[r] = { ...a } : ce(
          "InvalidArgument: configuration[" + Lt(r) + "] is no plain JavaScript object"
        );
  }, []);
  return [t.current, n];
}
let Wn;
function Ml(e) {
  typeof document > "u" || (Wn == null && (Wn = document.createElement("style"), document.head.appendChild(Wn)), Wn.textContent = "* { cursor:" + e + " !important }");
}
function Mf(e) {
  if (typeof document > "u")
    return;
  $o();
  const t = getComputedStyle(e).cursor;
  t === "" || t === "auto" || Ml(t);
}
function $o() {
  Wn?.remove(), Wn = void 0;
}
function Ta(e) {
  e != null && !Ne(e) && !(e instanceof HTMLElement) && !Nt(e) && ce(
    'InvalidArgument: "Container" is neither a CSS selector nor an HTML element or a function'
  );
}
function Jn(e, t) {
  t != null && !Ne(t) && !(t instanceof HTMLElement) && ce(
    `InvalidArgument: "${e}" is neither a CSS selector nor an HTML element`
  );
}
function Ra(e, t) {
  switch (!0) {
    case t == null:
      return e.parentElement ?? void 0;
    case t === "self":
      return e;
    case Ne(t):
      return e.parentElement?.closest(t);
    case Nt(t): {
      const n = t();
      return n instanceof HTMLElement ? n : void 0;
    }
    default:
      return t;
  }
}
function Fa(e) {
  switch (e.pointerType) {
    case "mouse":
      return e.buttons === 1;
    case "touch":
      return e.isPrimary;
    case "pen":
      return e.buttons === 1;
    default:
      return !0;
  }
}
function An({
  ViewRef: e,
  Container: t,
  onlyFrom: n,
  neverFrom: o,
  onDragStart: r,
  onDragContinuation: a,
  onDragFinish: i,
  onDragCancellation: s
}) {
  jr("ViewRef", e), Ta(t), Jn("onlyFrom", n), Jn("neverFrom", o), Re('"onDragStart" callback', r), Re('"onDragContinuation" callback', a), Re('"onDragFinish" callback', i), Re('"onDragCancellation" callback', s);
  const l = r != null && a != null && i != null && s != null, d = U();
  d.current = { onDragStart: r, onDragContinuation: a, onDragFinish: i, onDragCancellation: s };
  const u = U(!1);
  u.current = l;
  const p = U(), c = U(), f = U(!1);
  je(() => {
    e.current != null && (p.current = Ra(e.current, t));
  }, [
    e.current
    /* Container */
  ]), je(() => () => {
    window.removeEventListener("pointermove", g), window.removeEventListener("pointerup", y), window.removeEventListener("pointercancel", m), window.removeEventListener("blur", v), f.current && (f.current = !1, $o());
  }, []);
  const h = ie((x) => {
    if (!(x.target instanceof HTMLElement) || !Fa(x) || !l || p.current == null || n != null && !j(x.target, n) || o != null && j(x.target, o))
      return;
    window.addEventListener("pointermove", g), window.addEventListener("pointerup", y), window.addEventListener("pointercancel", m), window.addEventListener("blur", v), e.current.setPointerCapture?.(x.pointerId), Mf(x.target);
    const w = p.current, T = w.getBoundingClientRect(), L = x.clientX - T.left + w.scrollLeft, $ = x.clientY - T.top + w.scrollTop;
    c.current = { x: L, y: $ }, f.current = !0, E('useDragging callback "onDragStart"', d.current?.onDragStart, 0, 0, L, $, x);
  }, [e, l, n, o]), g = ie((x) => {
    if (f.current !== !1) {
      if (x.pointerType === "mouse" && x.buttons === 0) {
        C(x, !1);
        return;
      }
      p.current != null && E('useDragging callback "onDragContinuation"', d.current?.onDragContinuation, ..._(x));
    }
  }, []), y = ie((x) => {
    C(x, !1);
  }, []), m = ie((x) => {
    C(x, !0);
  }, []), v = ie(() => {
    C(null, !0);
  }, []), C = ie((x, w) => {
    if (f.current !== !1) {
      if (f.current = !1, $o(), x != null && e.current?.hasPointerCapture?.(x.pointerId) && e.current.releasePointerCapture(x.pointerId), window.removeEventListener("pointermove", g), window.removeEventListener("pointerup", y), window.removeEventListener("pointercancel", m), window.removeEventListener("blur", v), w) {
        E('useDragging callback "onDragCancellation"', d.current?.onDragCancellation, 0, 0, c.current.x, c.current.y, x);
        return;
      }
      p.current != null && u.current && E('useDragging callback "onDragFinish"', d.current?.onDragFinish, ..._(x));
    }
  }, []);
  function _(x) {
    const w = p.current;
    if (w == null)
      return [0, 0, 0, 0, x];
    const T = w.getBoundingClientRect(), L = x.clientX - T.left + w.scrollLeft, $ = x.clientY - T.top + w.scrollTop, I = L - c.current.x, M = $ - c.current.y;
    return [I, M, L, $, x];
  }
  function j(x, w) {
    switch (!0) {
      // matching element (e.g. the title
      case w == null:
        return !0;
      case typeof w == "string":
        return x.closest(w) != null;
      default:
        return w.contains(x);
    }
  }
  return l ? h : void 0;
}
function to({
  ViewRef: e,
  Container: t,
  onlyFrom: n,
  neverFrom: o,
  Threshold: r = 4,
  onClick: a,
  onDragStart: i,
  onDragContinuation: s,
  onDragFinish: l,
  onDragCancellation: d
}) {
  jr("ViewRef", e), Ta(t), Jn("onlyFrom", n), Jn("neverFrom", o), vr("drag threshold", r), Re('"onClick" callback', a), Re('"onDragStart" callback', i), Re('"onDragContinuation" callback', s), Re('"onDragFinish" callback', l), Re('"onDragCancellation" callback', d);
  const u = a != null, p = i != null && s != null && l != null && d != null, c = u || p, f = U();
  f.current = { onClick: a, onDragStart: i, onDragContinuation: s, onDragFinish: l, onDragCancellation: d };
  const h = U(!1);
  h.current = u;
  const g = U(!1);
  g.current = p;
  const y = U(r);
  y.current = r;
  const m = U(), v = U(), C = U(), _ = U(!1), j = U(!1);
  je(() => {
    e.current != null && (m.current = Ra(e.current, t));
  }, [
    e.current
    /* Container */
  ]), je(() => () => {
    window.removeEventListener("pointermove", w), window.removeEventListener("pointerup", T), window.removeEventListener("pointercancel", L);
  }, []);
  const x = ie((S) => {
    if (!(S.target instanceof HTMLElement) || !Fa(S) || !c || m.current == null || n != null && !M(S.target, n) || o != null && M(S.target, o))
      return;
    window.addEventListener("pointermove", w), window.addEventListener("pointerup", T), window.addEventListener("pointercancel", L), e.current.setPointerCapture?.(S.pointerId);
    const F = m.current, N = F.getBoundingClientRect(), X = S.clientX - N.left + F.scrollLeft, Q = S.clientY - N.top + F.scrollTop;
    v.current = { x: X, y: Q }, C.current = S, _.current = !0, j.current = !1;
  }, [e, c, n, o]), w = ie((S) => {
    if (_.current === !1 || m.current == null)
      return;
    const [F, N, X, Q] = I(S);
    if (!j.current) {
      if (Math.sqrt(F * F + N * N) < y.current)
        return;
      j.current = !0, g.current && E('useClickDragging callback "onDragStart"', f.current?.onDragStart, 0, 0, v.current.x, v.current.y, C.current);
    }
    g.current && E('useClickDragging callback "onDragContinuation"', f.current?.onDragContinuation, F, N, X, Q, S);
  }, []), T = ie((S) => {
    $(S, !1);
  }, []), L = ie((S) => {
    $(S, !0);
  }, []), $ = ie((S, F) => {
    if (_.current !== !1) {
      if (_.current = !1, e.current?.hasPointerCapture?.(S.pointerId) && e.current.releasePointerCapture(S.pointerId), window.removeEventListener("pointermove", w), window.removeEventListener("pointerup", T), window.removeEventListener("pointercancel", L), F) {
        j.current && g.current && E('useClickDragging callback "onDragCancellation"', f.current?.onDragCancellation, 0, 0, v.current.x, v.current.y, S), j.current = !1;
        return;
      }
      if (j.current)
        g.current && E('useClickDragging callback "onDragFinish"', f.current?.onDragFinish, ...I(S));
      else if (h.current && m.current != null) {
        const N = m.current, X = N.getBoundingClientRect(), Q = S.clientX - X.left + N.scrollLeft, pe = S.clientY - X.top + N.scrollTop;
        E('useClickDragging callback "onClick"', f.current?.onClick, Q, pe, S);
      }
      j.current = !1;
    }
  }, []);
  function I(S) {
    const F = m.current;
    if (F == null)
      return [0, 0, 0, 0, S];
    const N = F.getBoundingClientRect(), X = S.clientX - N.left + F.scrollLeft, Q = S.clientY - N.top + F.scrollTop, pe = X - v.current.x, q = Q - v.current.y;
    return [pe, q, X, Q, S];
  }
  function M(S, F) {
    switch (!0) {
      case F == null:
        return !0;
      case typeof F == "string":
        return S.matches(F);
      default:
        return S === F;
    }
  }
  return c ? x : void 0;
}
const Oa = [
  "none",
  "copy",
  "copyLink",
  "copyMove",
  "link",
  "linkMove",
  "move",
  "all"
];
function Af(e, t, { Effect: n, draggedGhost: o, onDropped: r } = {}) {
  ma("Data", e), Ip("MIMEType", t), Ft("Effect", n, [...Oa]), Re('"draggedGhost" callback', o), Re('"onDropped" callback', r);
  const a = U(e);
  a.current = e;
  const i = U(t);
  i.current = t;
  const s = U();
  s.current = n;
  const l = U({});
  l.current = { draggedGhost: o, onDropped: r };
  const d = ie((p) => {
    const c = p.dataTransfer;
    if (c == null)
      return;
    c.setData(i.current, a.current), s.current != null && (c.effectAllowed = s.current);
    const f = Xe('useDataDragSupport callback "draggedGhost"', l.current.draggedGhost, p) ?? null;
    f != null && (document.body.appendChild(f), c.setDragImage(f, f.offsetWidth / 2, f.offsetHeight / 2), requestAnimationFrame(() => f.remove()));
  }, []), u = ie((p) => {
    const c = p.dataTransfer?.dropEffect ?? "none";
    c !== "none" && E('useDataDragSupport callback "onDropped"', l.current.onDropped, c, p);
  }, []);
  return { draggable: !0, onDragStart: d, onDragEnd: u };
}
function Al(e) {
  const { Name: t, DragDepth: n, setIsOver: o, accepts: r, CallbacksOf: a, processedDrop: i } = e;
  function s(p) {
    r(p) && (p.preventDefault(), E(t + ' callback "onDragOver"', a().onDragOver, p));
  }
  function l(p) {
    r(p) && (p.preventDefault(), ++n.current === 1 && (o(!0), E(t + ' callback "onDragEnter"', a().onDragEnter, p)));
  }
  function d(p) {
    n.current > 0 && --n.current === 0 && (o(!1), E(t + ' callback "onDragLeave"', a().onDragLeave, p));
  }
  function u(p) {
    const c = i(p);
    c != null && (p.preventDefault(), n.current = 0, o(!1), E(t + ' callback "onDrop"', a().onDrop, ...c, p));
  }
  return { handleDragEnter: l, handleDragOver: s, handleDragLeave: d, handleDrop: u };
}
function Tf(e, {
  onDragEnter: t,
  onDragOver: n,
  onDragLeave: o,
  onDrop: r
} = {}) {
  switch (!0) {
    case wo(e):
      e = [e];
      break;
    case _o(e):
      for (const h of e)
        wo(h) || ce(
          'InvalidArgument: each entry in "MIMETypes" must be a non-empty string without line breaks'
        );
      break;
    default:
      ce(
        'InvalidArgument: "MIMETypes" must be a MIME type string or a non-empty array of MIME type strings'
      );
  }
  Re('"onDragEnter" callback', t), Re('"onDragOver" callback', n), Re('"onDragLeave" callback', o), Re('"onDrop" callback', r);
  const [a, i] = He(!1), s = U(0), l = U({});
  l.current = { onDragEnter: t, onDragOver: n, onDragLeave: o, onDrop: r };
  const d = e.join(","), { handleDragEnter: u, handleDragOver: p, handleDragLeave: c, handleDrop: f } = Jt(() => {
    function h(g) {
      return g == null ? !1 : [...g.types].some((y) => e.includes(y));
    }
    return Al({
      Name: "useDataDropSupport",
      DragDepth: s,
      setIsOver: i,
      accepts: (g) => h(g.dataTransfer),
      CallbacksOf: () => l.current,
      processedDrop: (g) => h(g.dataTransfer) ? [g.dataTransfer] : void 0
    });
  }, [d]);
  return {
    isOver: a,
    onDragEnter: u,
    onDragOver: p,
    onDragLeave: c,
    onDrop: f
  };
}
const Rf = ["move", "copy", "alias"];
function Ff({
  ViewRef: e,
  Container: t,
  onlyFrom: n,
  neverFrom: o,
  Threshold: r = 4,
  Data: a,
  allowedEffects: i,
  GrabCursor: s = "grab",
  GrabbedCursor: l = "grabbing",
  onClick: d,
  onDragStart: u,
  onDragContinuation: p,
  onDragFinish: c,
  onDragCancellation: f,
  onDrop: h
}) {
  jr("preact component reference", e), Ta(t), Jn("onlyFrom", n), Jn("neverFrom", o), vr("drag threshold", r), Wt("allowedEffects", i, (ee) => he(ee, Rf), "list of drop effects", 1), un('"GrabCursor" CSS cursor', s), un('"GrabbedCursor" CSS cursor', l), Re('"onClick" callback', d), Re('"onDragStart" callback', u), Re('"onDragContinuation" callback', p), Re('"onDragFinish" callback', c), Re('"onDragCancellation" callback', f), Re('"onDrop" callback', h);
  const g = d != null, y = u != null && p != null && c != null && f != null, m = g || y, v = U();
  v.current = { onClick: d, onDragStart: u, onDragContinuation: p, onDragFinish: c, onDragCancellation: f, onDrop: h };
  const C = U(!1);
  C.current = g;
  const _ = U(!1);
  _.current = y;
  const j = U(r);
  j.current = r;
  const x = U(a);
  x.current = a;
  const w = i ?? ["move"], T = U(w);
  T.current = w;
  const L = U(l);
  L.current = l;
  const { closestDropTarget: $ } = gt(za), I = U($);
  I.current = $;
  const M = U(), S = U(), F = U(), N = U(!1), X = U(!1), Q = U(), pe = U(), q = U();
  je(() => {
    e.current != null && (M.current = Ra(e.current, t));
  }, [
    e.current
    /* Container */
  ]), je(() => {
    if (!(!y || e.current == null))
      return e.current.style.cursor = s, () => {
        e.current != null && (e.current.style.cursor = "");
      };
  }, [e, y, s]), je(() => () => {
    window.removeEventListener("pointermove", P), window.removeEventListener("pointerup", ue), window.removeEventListener("pointercancel", ke), N.current && (N.current = !1, $o());
  }, []);
  const J = ie((ee) => {
    if (!(ee.target instanceof HTMLElement) || !Fa(ee) || !m || M.current == null || n != null && !te(ee.target, n) || o != null && te(ee.target, o))
      return;
    window.addEventListener("pointermove", P), window.addEventListener("pointerup", ue), window.addEventListener("pointercancel", ke), e.current.setPointerCapture?.(ee.pointerId);
    const ne = M.current, se = ne.getBoundingClientRect(), xe = ee.clientX - se.left + ne.scrollLeft, ve = ee.clientY - se.top + ne.scrollTop;
    S.current = { x: xe, y: ve }, F.current = ee, N.current = !0, X.current = !1, Q.current = void 0, pe.current = void 0, q.current = void 0;
  }, [e, m, n, o]), P = ie((ee) => {
    if (!N.current || M.current == null)
      return;
    const [ne, se, xe, ve] = Ue(ee);
    if (!X.current) {
      if (Math.sqrt(ne * ne + se * se) < j.current)
        return;
      X.current = !0, _.current && v.current.onDragStart?.(0, 0, S.current.x, S.current.y, F.current);
    }
    if (_.current) {
      const _e = ee.altKey && T.current.includes("copy") ? ["copy"] : T.current, Ae = I.current(ee.clientX, ee.clientY), Oe = Ae?.[0], mt = Ae?.[1];
      if (Oe !== Q.current) {
        Q.current != null && pe.current.onLeave?.(x.current);
        const ye = Oe != null ? mt.accepts(x.current, _e) : !1;
        ye !== !1 ? (mt.onEnter?.(x.current, ye, xe, ve), Q.current = Oe, pe.current = mt, q.current = ye) : (Q.current = void 0, pe.current = void 0, q.current = void 0);
      } else if (Q.current != null) {
        const ye = pe.current.accepts(x.current, _e);
        ye !== !1 ? (q.current = ye, pe.current.onOver?.(x.current, ye, xe, ve)) : (pe.current.onLeave?.(x.current), Q.current = void 0, pe.current = void 0, q.current = void 0);
      }
      Ml(
        // shares the singleton of "useDragging"
        Q.current != null ? pt(q.current) : ft(ee.clientX, ee.clientY) ? L.current : "no-drop"
      ), v.current.onDragContinuation?.(ne, se, xe, ve, ee);
    }
  }, []), ue = ie((ee) => {
    Ve(ee, !1);
  }, []), ke = ie((ee) => {
    Ve(ee, !0);
  }, []), Ve = ie((ee, ne) => {
    if (N.current) {
      if (N.current = !1, e.current?.hasPointerCapture?.(ee.pointerId) && e.current.releasePointerCapture(ee.pointerId), window.removeEventListener("pointermove", P), window.removeEventListener("pointerup", ue), window.removeEventListener("pointercancel", ke), X.current && $o(), ne) {
        X.current && _.current && (Q.current != null && (pe.current.onLeave?.(x.current), Q.current = void 0, pe.current = void 0, q.current = void 0), v.current.onDragCancellation?.(0, 0, S.current.x, S.current.y, ee)), X.current = !1;
        return;
      }
      if (X.current) {
        if (_.current)
          if (Q.current != null) {
            const se = Q.current, xe = pe.current, ve = q.current, _e = se.getBoundingClientRect(), Ae = ee.clientX - _e.left + se.scrollLeft, Oe = ee.clientY - _e.top + se.scrollTop;
            Q.current = void 0, pe.current = void 0, q.current = void 0, xe.onDrop?.(x.current, ve, Ae, Oe), v.current.onDrop?.(0, 0, S.current.x, S.current.y, ee, se, ve);
          } else
            v.current.onDragFinish?.apply(null, Ue(ee));
      } else if (C.current && M.current != null) {
        const se = M.current, xe = se.getBoundingClientRect(), ve = ee.clientX - xe.left + se.scrollLeft, _e = ee.clientY - xe.top + se.scrollTop;
        v.current.onClick?.(ve, _e, ee);
      }
      X.current = !1;
    }
  }, []);
  function Ue(ee) {
    const ne = M.current;
    if (ne == null)
      return [0, 0, 0, 0, ee];
    const se = ne.getBoundingClientRect(), xe = ee.clientX - se.left + ne.scrollLeft, ve = ee.clientY - se.top + ne.scrollTop, _e = xe - S.current.x, Ae = ve - S.current.y;
    return [_e, Ae, xe, ve, ee];
  }
  function pt(ee) {
    switch (ee) {
      case "copy":
        return "copy";
      case "alias":
        return "alias";
      case "move":
        return "move";
      default:
        return L.current;
    }
  }
  function ft(ee, ne) {
    if (e.current == null)
      return !1;
    const se = e.current.getBoundingClientRect();
    return ee >= se.left && ee <= se.right && ne >= se.top && ne <= se.bottom;
  }
  function te(ee, ne) {
    switch (!0) {
      case ne == null:
        return !0;
      case typeof ne == "string":
        return ee.matches(ne);
      default:
        return ee === ne;
    }
  }
  return m ? J : void 0;
}
function Of({
  ViewRef: e,
  accepts: t,
  onEnter: n,
  onOver: o,
  onLeave: r,
  onDrop: a
}) {
  jr("preact component reference", e), Yt("accepts", t), Re('"onEnter" callback', n), Re('"onOver" callback', o), Re('"onLeave" callback', r), Re('"onDrop" callback', a);
  const [i, s] = He(!1), l = U(
    { accepts: t, onEnter: n, onOver: o, onLeave: r, onDrop: a }
  );
  l.current = { accepts: t, onEnter: n, onOver: o, onLeave: r, onDrop: a };
  const { registerDropTarget: d } = gt(za);
  return je(() => {
    if (e.current != null)
      return d(e.current, {
        accepts: (u, p) => l.current.accepts(u, p),
        onEnter: (u, p, c, f) => {
          s(!0), E('usePointerDropSupport callback "onEnter"', l.current.onEnter, u, p, c, f);
        },
        onOver: (u, p, c, f) => E('usePointerDropSupport callback "onOver"', l.current.onOver, u, p, c, f),
        onLeave: (u) => {
          s(!1), E('usePointerDropSupport callback "onLeave"', l.current.onLeave, u);
        },
        onDrop: (u, p, c, f) => {
          s(!1), E('usePointerDropSupport callback "onDrop"', l.current.onDrop, u, p, c, f);
        }
      });
  }, [e.current]), { isOver: i };
}
const Pr = /* @__PURE__ */ new WeakMap();
function zf(e, t) {
  return Pr.set(e, t), () => Pr.delete(e);
}
function Nf(e, t) {
  let n = document.elementFromPoint(e, t);
  for (; n != null; ) {
    const o = Pr.get(n);
    if (o != null)
      return [n, o];
    n = n.parentElement;
  }
}
const za = /* @__PURE__ */ mn({
  registerDropTarget: zf,
  closestDropTarget: Nf
});
function Ef(e, {
  multiple: t,
  disabled: n,
  onDragEnter: o,
  onDragOver: r,
  onDragLeave: a,
  onDrop: i
} = {}) {
  switch (e == null && (e = "*/*"), !0) {
    case Ne(e):
      e = e.trim().replace(/[,\s]+/g, " ").split(" ");
      break;
    case Ie(e, Ne):
      break;
    default:
      ce(
        'InvalidArgument: "accept" must be a file type string or a non-empty array of file type strings'
      );
  }
  tn('"multiple" flag', t), tn('"disabled" flag', n), Re('"onDragEnter" callback', o), Re('"onDragOver" callback', r), Re('"onDragLeave" callback', a), Re('"onDrop" callback', i);
  const s = e.map(
    (v) => v.replace(/;.*$/, "").trim().toLowerCase()
  ).filter((v) => v !== "");
  s.length === 0 && s.push("*/*");
  const l = (
    // also allows for "*" wildcards
    /^(\*\/\*|[a-z0-9]+([._+-][a-z0-9]+)*\/(\*|[a-z0-9]+([._+-][a-z0-9]+)*))$/
  );
  s.every(
    (v) => l.test(v)
  ) || ce(
    "InvalidArgument: the given list of accepted file types is invalid"
  );
  const [d, u] = He(!1), p = U(0), c = U({});
  c.current = { multiple: t, disabled: n, onDragEnter: o, onDragOver: r, onDragLeave: a, onDrop: i };
  const f = s.join(","), { handleDragEnter: h, handleDragOver: g, handleDragLeave: y, handleDrop: m } = Jt(() => {
    function v(_) {
      return s.some((j) => j === "*/*" ? !0 : j.endsWith("/*") ? _.startsWith(j.slice(0, -1)) : _ === j);
    }
    function C(_) {
      if (_ == null)
        return !1;
      const j = _.items;
      return j == null ? [..._.types].includes("Files") : Array.from(j).some(
        (x) => x.kind === "file" && v(x.type.toLowerCase())
      );
    }
    return Al({
      Name: "useFileDropSupport",
      DragDepth: p,
      setIsOver: u,
      accepts: (_) => c.current.disabled != !0 && C(_.dataTransfer),
      CallbacksOf: () => c.current,
      processedDrop: (_) => {
        if (c.current.disabled == !0)
          return;
        const j = _.dataTransfer?.files;
        if (j == null)
          return;
        let x = Array.from(j).filter(
          (w) => v(w.type.toLowerCase())
        );
        return c.current.multiple != !0 && (x = x.slice(0, 1)), x.length === 0 ? void 0 : [x];
      }
    });
  }, [f]);
  return {
    isOver: d,
    onDragEnter: h,
    onDragOver: g,
    onDragLeave: y,
    onDrop: m
  };
}
function yn(e, t) {
  const n = U(), o = U(void 0);
  let r = e ?? yt;
  return n.current != null && document.activeElement === n.current ? r = o.current : (t != null && (r = t(r)), o.current = r), { ViewRef: n, shownValue: o, ValueToShow: r };
}
function Ot(e, t) {
  const n = U(e ?? t), o = U(e ?? t);
  return e != null && e !== n.current && (o.current = e, n.current = e), o;
}
function xn(e) {
  const {
    Name: t,
    actualDisabling: n,
    shownValue: o,
    onInput: r,
    onValueInput: a,
    onBlur: i,
    processedInput: s
  } = e, l = dt(), d = ie((p) => {
    if (Le(p), n == !0)
      return;
    E(t + ' callback "onInput"', r, p);
    let c;
    s == null ? (c = p.target.value, o.current = c === "" ? yt : c) : c = s(p), E(t + ' callback "onValueInput"', a, c, p);
  }, [n, r, a]), u = ie((p) => {
    l(), E(t + ' callback "onBlur"', i, p);
  }, [i]);
  return { _onInput: d, _onBlur: u, rerender: l };
}
function vn(e, t) {
  const n = Vt();
  let o = "", r;
  if (e != null && e.length > 0) {
    r = n + "-Suggestions";
    const a = t ?? ((i) => b`<option value=${i}></option>`);
    o = b`<datalist id=${r}>
        ${e.map((i) => a(i))}
      </datalist>`;
  }
  return { SuggestionId: r, SuggestionList: o };
}
function Tl(e) {
  const [t, n] = He({
    Width: 0,
    Height: 0
  });
  return ja(() => {
    const o = e.current;
    if (o == null)
      return;
    const r = new ResizeObserver(() => n(
      (a) => {
        const i = o.clientWidth, s = o.clientHeight;
        return a.Width === i && a.Height === s ? a : { Width: i, Height: s };
      }
    ));
    return r.observe(o), () => r.disconnect();
  }, []), t;
}
function vw(e) {
  let t = Math.round(Math.random() * 1e4).toString();
  return t += "0000".slice(t.length), e = (e || "This operation can not be undone.") + `

Please, enter the following number if you want to proceed:

   ` + t + `

Otherwise, the operation will be cancelled`, window.prompt(e, "") === t ? !0 : (window.alert("Operation will be cancelled"), !1);
}
const jo = /* @__PURE__ */ Object.create(null);
function Z(e, t) {
  let n = !1;
  return () => {
    n || (n = !0, Na(e, t));
  };
}
let cs = !1;
function Vf() {
  if (cs || typeof document > "u")
    return;
  cs = !0;
  let e = document.getElementById("JCL-Stylesheet");
  e == null && (e = document.createElement("style"), e.id = "JCL-Stylesheet", e.textContent = `
/*******************************************************************************
*                                                                              *
*                        JavaScript Code Library (JCL)                         *
*                                                                              *
*******************************************************************************/

  :not(:defined) { visibility:hidden }

/**** some basic settings ****/

  .jcl-component {
    display:block; position:relative;
    box-sizing:border-box;
  }

/**** OverlayView ****/

  .jcl-overlay-view {
    box-sizing:border-box;
    display:block; position:fixed;
    background:white; color:black;
    box-shadow:0px 0px 5px 0px black;
    z-index:1000000;
  }
  .jcl-overlay-view.in-dialog {
    z-index:3000000;
  }

/**** Underlay ****/

  .jcl-underlay {
    display:block; position:fixed;
    left:0px; top:0px; right:auto; bottom:auto; width:100%; height:100%;
    z-index:1000000;
    pointer-events:auto;
  }
  .jcl-underlay.modal {
    background-image:repeating-linear-gradient(-45deg,
      rgba(222,222,222, 1) 0px, rgba(222,222,222, 1) 4px,
      rgba(0,0,0, 0) 4px, rgba(0,0,0, 0) 8px
    ); background-size:11.31px 11.31px;
    opacity:0.4;
  }
  .jcl-underlay.in-dialog.modal {
    opacity:0.1;
  }
  .jcl-underlay.in-dialog {
    z-index:3000000;
  }

/**** DialogView ****/

  .jcl-dialog-view {
    box-sizing:border-box;
    display:flex; flex-flow:column nowrap; align-items:stretch;
    position:fixed; overflow:hidden;
    border:solid 1px #000000; border-radius:4px;
    background:white; color:black;
    box-shadow:0px 0px 10px 0px rgba(0,0,0,0.5);
    z-index:2000000;
    pointer-events:auto;
  }
  .jcl-dialog-view * {
    box-sizing:border-box;
  }

/**** DialogView Controls ****/

  .jcl-dialog-view > .titlebar {
    display:flex; flex-flow:row nowrap; align-items:center; flex:0 0 auto;
    position:relative; left:0px; top:0px; right:0px; height:30px; overflow:hidden;
    background:#EEEEEE; border:none; border-bottom:solid 1px gray;
    border-radius:3px 3px 0px 0px;
    user-select:none; pointer-events:auto;

    -webkit-touch-callout:none;
    -ms-touch-action:none; touch-action:none;
  }

  .jcl-dialog-view > .titlebar > .title {
    display:inline-block; position:relative; flex:1 0 auto;
    margin-left:6px; margin-top:3px; margin-right:10px; width:auto; height:24px;
    border:none;
    font-weight:bold; color:black; line-height:24px;
    user-select:none;
  }

  .jcl-dialog-view.draggable > .titlebar > .title {
    cursor:grab;
  }

  .jcl-dialog-view > .titlebar > .close-button {
    display:inline-block; position:relative;
    margin-top:3px; margin-right:4px; width:24px; height:24px;
    border:none;
    background:url(${Cl}icons/xmark.png);
    background-repeat:no-repeat;
    background-size:contain; background-position:center;
    cursor:pointer;
    user-select:none; pointer-events:auto;
  }

  .jcl-dialog-view > .titlebar > .close-button:focus-visible {
    outline:none; border-radius:4px;
    box-shadow:0px 0px 0px 3px color-mix(
      in srgb, var(--jcl-ring-color,#0075ff) 20%, transparent
    );
  }

  .jcl-dialog-view > .content-pane {
    display:inline-block; position:relative; flex:1 1 auto;
    left:0px; top:0px; width:auto; height:auto; overflow:auto;
    border:none; border-radius:0px 0px 3px 3px;
  }

  .jcl-dialog-view.resizable > .content-pane {
    border-radius:0px;
  }

  .jcl-dialog-view > .resizer {
    display:flex; flex-flow:row nowrap; align-items:center; flex:0 0 auto;
    position:relative; left:0px; top:0px; width:auto; height:10px;
    border:none; border-top:solid 1px gray; border-radius:0px 0px 3px 3px;
  }

  .jcl-dialog-view > .resizer > .left-resizer {
    display:inline-block; position:relative;
    left:0px; bottom:0px; width:20px; height:10px;
    border:none; border-right:solid 1px gray;
    border-radius:0px 0px 0px 3px;
    cursor:nesw-resize; pointer-events:auto;

    -webkit-touch-callout:none;
    -ms-touch-action:none; touch-action:none;
  }

  .jcl-dialog-view > .resizer > .middle-resizer {
    display:inline-block; flex:1 0 auto;
    position:relative; left:0px; top:0px; width:auto; height:10px;
    border:none; border-radius:0px;
    cursor:ns-resize; pointer-events:auto;

    -webkit-touch-callout:none;
    -ms-touch-action:none; touch-action:none;
  }

  .jcl-dialog-view > .resizer > .right-resizer {
    display:inline-block; position:relative;
    left:0px; top:0px; width:20px; height:10px;
    border:none; border-left:solid 1px gray; border-radius:0px 0px 3px 0px;
    cursor:nwse-resize; pointer-events:auto;

    -webkit-touch-callout:none;
    -ms-touch-action:none; touch-action:none;
  }

/**** ModalLayer ****/

  .jcl-modal-layer {
    display:block; position:fixed;
    left:0px; top:0px; right:auto; bottom:auto; width:100%; height:100%;
    background-image:repeating-linear-gradient(-45deg,
      rgba(222,222,222, 1) 0px, rgba(222,222,222, 1) 4px,
      rgba(0,0,0, 0) 4px, rgba(0,0,0, 0) 8px
    ); background-size:11.31px 11.31px;
    opacity:0.4;
    z-index:1999999;
    pointer-events:auto;
  }



/**** some common settings ****/

  :is(:disabled, .disabled, [disabled]):not(
    :is(:disabled, .disabled, [disabled]) *
  ) { opacity:0.4 }
  .readonly        { background:none }
  .pointer-unaware { pointer-events:none }

/**** some special settings ****/

  .jcl-component.with-outline {
    outline:dotted 1px blue;
    outline-offset:2px;
  }

      `.trim(), document.head.prepend(e)), Object.keys(jo).forEach((t) => {
    Na(t, jo[t], !0);
  });
}
function Na(e, t, n = !1) {
  if (yl("stylesheet name", e), ot("stylesheet", t), ga("mode flag", n), typeof document > "u")
    return;
  const o = "Stylesheet-for-" + Xt(e);
  let r = document.head.querySelector('style[id="' + o + '"]');
  if (r == null) {
    r = document.createElement("style"), r.id = o, r.textContent = t;
    const a = document.head.querySelectorAll(
      'style[id^="Stylesheet-for-"]'
    ), i = a.length > 0 ? a[a.length - 1] : document.getElementById("JCL-Stylesheet");
    i == null ? document.head.prepend(r) : i.after(r), jo[e] = t;
  } else
    n ? (r.textContent = t, jo[e] = t) : console.warn('multiple definitions for stylesheet "' + e + '"');
}
function Bf(e) {
  if (yl("stylesheet name", e), typeof document > "u")
    return;
  const t = "Stylesheet-for-" + Xt(e);
  let n = document.head.querySelector('style[id="' + t + '"]');
  n?.remove(), delete jo[e];
}
function fn(e) {
  return H(() => {
    Wf(), e = G(e);
    let t = z(
      e.Error,
      (r) => r instanceof Error || hn(r)
    ), n = R(e.ErrorResetter);
    switch (!0) {
      case t instanceof Error:
        break;
      case hn(t):
        if (/^[^\n]+\n\n[^\n]+/.test(t)) {
          const r = t.replace(/\n\n.*$/, ""), a = t.replace(/^[^\n]+\n\n/, "");
          t = new Error(a), t.name = r;
        } else
          t = new Error(t), t.name = "Unexpected Failure";
        break;
      default:
        t = new Error("" + t), t.name = "Unexpected Failure";
    }
    return b`<div class="jcl-error-indicator" onClick=${() => {
      console.warn(t), window.alert(Hf(t));
    }}/>`;
  });
}
const Wf = /* @__PURE__ */ Z("jcl-error-indicator", `
    .jcl-error-indicator {
      display:inline-block; position:relative;
      width:24px; height:24px;
    }

    .jcl-error-indicator::after {
      content:'';
      display:block; position:absolute; overflow:hidden;
      left:0px; top:0px; width:24px; height:24px;
      background:url("data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3Csvg width='24px' height='24px' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12 17.0001H12.01M12 10.0001V14.0001M6.41209 21.0001H17.588C19.3696 21.0001 20.2604 21.0001 20.783 20.6254C21.2389 20.2985 21.5365 19.7951 21.6033 19.238C21.6798 18.5996 21.2505 17.819 20.3918 16.2579L14.8039 6.09805C13.8897 4.4359 13.4326 3.60482 12.8286 3.32987C12.3022 3.09024 11.6978 3.09024 11.1714 3.32987C10.5674 3.60482 10.1103 4.4359 9.19614 6.09805L3.6082 16.2579C2.74959 17.819 2.32028 18.5996 2.39677 19.238C2.46351 19.7951 2.76116 20.2985 3.21709 20.6254C3.7396 21.0001 4.63043 21.0001 6.41209 21.0001Z' stroke='orange' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' fill='white'/%3E%3C/svg%3E");
      pointer-events:auto;
    }
  `);
function Hf(e) {
  let t = e.name, n = e.message || "(unidentified error)", o = e.stack ?? "";
  const r = t.replace(/([a-z])([A-Z])/g, "$1 $2"), a = n.charAt(0).toUpperCase() + n.slice(1);
  return o === "" ? `${r}

${a}` : `${r}

${a}

${o}`;
}
function Gf(e) {
  return { current: e };
}
let ds = !1;
function H(e) {
  ds || (ds = !0, Vf(), mp()), Yt("rendering function", e);
  const [t, n] = Ia();
  if (t != null) {
    const o = e.name ?? "";
    return o.trim() === "" ? console.warn("rendering error within preact component: " + t) : console.warn(
      "rendering error within " + Lt(o) + ": " + t
    ), b`<${fn} Error=${t} ErrorResetter=${n}/>`;
  }
  try {
    return e();
  } catch (o) {
    const r = e.name ?? "";
    return r.trim() === "" ? console.warn("error while rendering a preact component: " + o) : console.warn(
      "error while rendering component " + Lt(r) + ": " + o
    ), b`<${fn} Error=${o} ErrorResetter=${n}/>`;
  }
}
function Uf(e) {
  return H(() => {
    const t = Sr(), n = Fo(t), { Theme: o, SwatchSet: r, Locale: a, Direction: i } = n, s = Ro(o, r);
    return b`<div class="jcl-component customizable"
        dir=${i} lang=${a} style=${s}
      >
        <${kt.Provider} value=${n}>
          ${e.children}
        </>
      </>`;
  });
}
function Ea(e) {
  return e = { ...e }, Object.keys(e).forEach((t) => {
    e[t] === void 0 && delete e[t];
  }), e;
}
function Va(e, t, n) {
  Object.assign(e, n), t != null && (t.current == null && (t.current = {}), Object.assign(t.current, n));
}
function Ba(e) {
  return () => {
    ce("MissingArgument:function not in " + e);
  };
}
function Wa(e) {
  const t = U([]), n = dt();
  function o(s) {
    _n(e + " name", s);
    const l = Xt(s), d = t.current;
    if (d.length === 0)
      return;
    const u = d.findIndex(
      (p) => p[Sn] === l
    );
    u < 0 || (t.current = d.filter(
      (p, c) => c !== u
    ), n());
  }
  function r() {
    t.current.length !== 0 && (t.current = [], n());
  }
  function a(s) {
    _n(e + " name", s);
    const l = Xt(s);
    return t.current.findIndex(
      (d) => d[Sn] === l
    ) >= 0;
  }
  const i = t.current.map(
    (s) => s.Name
  );
  return { ListRef: t, rerender: n, closeEntity: o, closeAllEntities: r, EntityIsOpen: a, openEntities: i };
}
function Ha(e, t, n) {
  De(e) || ce(
    "InvalidArgument: the given " + t + " descriptor is no plain JavaScript object"
  );
  const o = e.Name == null ? t + " descriptor" : "descriptor for " + t + " " + Lt(e.Name);
  try {
    n(e);
  } catch (r) {
    throw (r.name === "MissingArgument" || r.name === "InvalidArgument") && (r.message += " in " + o), r;
  }
}
function Rl(e, t, n, o, r) {
  return ie((a) => {
    if (a.key === "Escape") {
      a.stopPropagation(), t.isModal || n(t.Name);
      return;
    }
    if (t.isModal && a.key === "Tab") {
      const i = e.current;
      if (i == null)
        return;
      const s = Array.from(
        i.querySelectorAll(Ga)
      ).filter((p) => p.tabIndex >= 0);
      if (s.length === 0) {
        a.preventDefault();
        return;
      }
      const l = s[0], d = s[s.length - 1], u = o && document.activeElement === i;
      switch (!0) {
        case (a.shiftKey && (document.activeElement === l || u)):
          a.preventDefault(), d.focus();
          break;
        case (!a.shiftKey && document.activeElement === d):
          a.preventDefault(), l.focus();
          break;
      }
    }
  }, r);
}
function Fl(e, t) {
  je(() => {
    const n = e.current;
    if (n != null)
      return t.forEach((o) => {
        n.addEventListener(o, Le);
      }), () => {
        t.forEach((o) => {
          n.removeEventListener(o, Le);
        });
      };
  }, []);
}
let us = !1;
function Ol() {
  if (us)
    return;
  us = !0;
  const e = {
    en: "Close",
    de: "Schließen",
    fr: "Fermer",
    es: "Cerrar",
    it: "Chiudi",
    pt: "Fechar"
  };
  Object.keys(e).forEach((t) => {
    hr(t, {
      "jcl.overlay.close": e[t],
      "jcl.dialog.close": e[t]
    });
  });
}
function Kf(e) {
  return H(() => {
    Ol(), e = G(e);
    const t = D(e.Class) ?? "", n = z(e.APIRef, bn), o = e.children, r = U(), {
      // s. "shared Base Helpers" for these commons
      ListRef: a,
      rerender: i,
      closeEntity: s,
      closeAllEntities: l,
      EntityIsOpen: d,
      openEntities: u
    } = Wa("overlay");
    function p(m) {
      It("overlay descriptor", m), m = Ea(m), f(m);
      let {
        Name: v,
        isModal: C,
        Renderer: _,
        onOpen: j,
        onClose: x,
        OffsetX: w,
        OffsetY: T,
        Width: L,
        Height: $,
        minWidth: I,
        minHeight: M,
        maxWidth: S,
        maxHeight: F,
        Role: N,
        Label: X
      } = m;
      const Q = Xt(v);
      d(v) && ce(
        "OverlayAlreadyOpen: there is already an overlay called " + Lt(v)
      ), a.current.push({
        Name: v,
        [Sn]: Q,
        isModal: C ?? !1,
        Renderer: _,
        onOpen: j,
        onClose: x,
        OffsetX: w ?? 0,
        OffsetY: T ?? 0,
        Width: L,
        Height: $,
        minWidth: I ?? 0,
        minHeight: M ?? 0,
        maxWidth: S,
        maxHeight: F,
        Role: N,
        Label: X
      }), i();
    }
    function c(m, v) {
      It("overlay descriptor", m), v instanceof PointerEvent || ce(
        'InvalidArgument: "Event" must be a PointerEvent'
      );
      const C = r.current;
      if (C != null) {
        const _ = C.getBoundingClientRect(), j = v.clientX - _.left + C.scrollLeft, x = v.clientY - _.top + C.scrollTop;
        m = { ...m, OffsetX: j, OffsetY: x };
      }
      p(m);
    }
    function f(m) {
      Ha(m, "overlay", () => {
        _n("Name", m.Name), tn("isModal", m.isModal), Yt("Renderer", m.Renderer), Re("onOpen", m.onOpen), Re("onClose", m.onClose), pr("OffsetX", m.OffsetX), pr("OffsetY", m.OffsetY), Dt("Width", m.Width), Dt("Height", m.Height), Dt("minWidth", m.minWidth), Dt("minHeight", m.minHeight), Dt("maxWidth", m.maxWidth), Dt("maxHeight", m.maxHeight), wr("Role", m.Role), un("Label", m.Label);
      });
    }
    const h = {
      openOverlay: p,
      openOverlayAtPointer: c,
      closeOverlay: s,
      closeAllOverlays: l,
      openOverlays: u,
      OverlayIsOpen: d
    }, g = no();
    Va(g, n, h);
    const y = ie((m) => {
      if (m.key !== "Escape")
        return;
      const v = a.current;
      for (let C = v.length - 1; C >= 0; C--)
        if (!v[C].isModal) {
          Le(m), s(v[C].Name);
          break;
        }
    }, []);
    return b`<${Dr.Provider} value=${g}>
        <div class="jcl-component overlay-base ${t}" ref=${r}
          onKeyDown=${y} ...${e.RestProps}
        >
          ${o}
          <${qf} OverlayList=${a.current} BaseRef=${r}/>
        </>
      </>`;
  });
}
function qf(e) {
  return H(() => {
    e = G(e);
    const t = z(e.OverlayList, (a) => Ie(a, De)), n = z(e.BaseRef, (a) => bn(a)) ?? Me("BaseRef");
    if (t == null || t.length === 0)
      return;
    const { closeOverlay: o } = no(), r = t.length - 1;
    return b`
        ${t.map((a, i) => i === r ? b`
              <${Xf} key=${"underlay:" + a.Name}
                Overlay=${a} closeOverlay=${o}
              />
              <${ps} key=${"view:" + a.Name}
                Overlay=${a} BaseRef=${n}
              />
            ` : b`
              <${ps} key=${"view:" + a.Name}
                Overlay=${a} BaseRef=${n}
              />
            `)}
      `;
  });
}
const zl = [
  "click",
  "dblclick",
  /*'mousedown',*/
  "mouseup",
  "mousemove",
  "mouseover",
  "mouseout",
  "mouseenter",
  "mouseleave",
  /*'touchstart',*/
  "touchend",
  "touchmove",
  "touchcancel",
  /*'pointerdown',*/
  "pointerup",
  "pointermove",
  "pointerover",
  "pointerout",
  "pointerenter",
  "pointerleave",
  "pointercancel",
  "keydown",
  "keyup",
  "keypress",
  "wheel",
  "contextmenu",
  "focus",
  "blur"
];
function Xf(e) {
  return H(() => {
    e = G(e);
    const t = z(e.Overlay, De) ?? Me("Overlay"), n = R(e.closeOverlay) ?? Me("closeOverlay"), o = U();
    Fl(o, zl);
    const r = ie((s) => {
      Le(s), t.isModal || n(t.Name);
    }, [t.isModal, t.Name, n]), i = oo().DialogName != null;
    return Zn(b`<div
        class="jcl-underlay ${t.isModal ? "modal" : ""} ${i ? "in-dialog" : ""}"
        aria-hidden="true"
        ref=${o}
        onPointerDown=${r}
      />`, document.body);
  });
}
const Ga = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "details",
  "summary",
  "audio[controls]",
  "video[controls]",
  '[tabindex]:not([tabindex="-1"])'
].join(", ");
function ps(e) {
  return H(() => {
    e = G(e);
    const t = z(e.Overlay, De) ?? Me("Overlay"), o = (z(e.BaseRef, bn) ?? Me("BaseRef")).current;
    if (o == null)
      return null;
    const r = dt(), a = U(), i = gt(kt), s = Fo(_r), l = i ?? s, { Theme: d, SwatchSet: u, Locale: p, Direction: c } = l, f = Ro(d, u);
    je(() => {
      E(
        `"onOpen" callback of overlay ${t.Name}`,
        t.onOpen,
        t.Name,
        { ...t }
      );
      const Q = setTimeout(r, 0);
      return () => {
        clearTimeout(Q), E(
          `"onClose" callback of overlay ${t.Name}`,
          t.onClose,
          t.Name,
          { ...t }
        );
      };
    }, []), je(() => {
      const Q = a.current;
      if (Q == null)
        return;
      const pe = document.activeElement, q = setTimeout(() => {
        (Q.querySelector(Ga) ?? Q).focus();
      }, 50);
      return () => {
        clearTimeout(q), pe?.focus();
      };
    }, []);
    let {
      OffsetX: h,
      OffsetY: g,
      Width: y,
      Height: m,
      minWidth: v,
      minHeight: C,
      maxWidth: _,
      maxHeight: j
    } = t;
    const { left: x, top: w } = o.getBoundingClientRect();
    let T = x, L = w;
    if (a.current == null)
      T += h ?? 0, L += g ?? 0;
    else {
      let { width: Q, height: pe } = a.current.getBoundingClientRect();
      y = Math.max(v ?? 0, Math.min(Q, window.innerWidth, _ ?? 1 / 0)), m = Math.max(C ?? 0, Math.min(pe, window.innerHeight, j ?? 1 / 0)), T = Math.max(0, Math.min(T + (h ?? 0), window.innerWidth - y)), L = Math.max(0, Math.min(L + (g ?? 0), window.innerHeight - m));
    }
    Object.assign(t, {
      // modifies Overlay in-situ (positional hack)
      OffsetX: T - x,
      OffsetY: L - w,
      Width: y,
      Height: m
    });
    const $ = no(), I = Rl(
      a,
      t,
      (Q) => $.closeOverlay?.(Q),
      !1,
      [t.isModal, t.Name, $]
    ), M = ie(() => E(
      `"Renderer" callback of overlay ${t.Name}`,
      t.Renderer,
      t.Name,
      { ...t }
    ), [t]), F = oo().DialogName != null, N = t.Role ?? "dialog", X = t.Label ?? t.Name;
    return Zn(b`
        <${Dr.Provider} value=${{
      ...$,
      OverlayName: t.Name
    }}>
        <${kt.Provider} value=${l}>
          <div
            class="jcl-overlay-view ${F ? "in-dialog" : ""}"
            role=${N} aria-modal=${t.isModal ? "true" : void 0}
            aria-label=${X}
            tabIndex=${-1} dir=${c} lang=${p}
            style="
              visibility:${a.current == null ? "hidden" : "visible"};
              left:${T}px; top:${L}px;
              width: ${y == null ? "auto" : `${y}px`};
              height:${m == null ? "auto" : `${m}px`};
              min-width:${v ?? 0}px; min-height:${C ?? 0}px;
              max-width: ${_ == null ? "none" : `${_}px`};
              max-height:${j == null ? "none" : `${j}px`};
              ${f}
            "
            key="overlay:${t.Name}" ref=${a}
            onKeyDown=${I}
          >
            <${M}/>
          </>
        </>
        </>
      `, document.body);
  });
}
const uo = Ba("OverlayContext"), Dr = /* @__PURE__ */ mn({
  openOverlay: uo,
  openOverlayAtPointer: uo,
  closeOverlay: uo,
  closeAllOverlays: uo,
  openOverlays: [],
  OverlayIsOpen: uo
});
function no() {
  return gt(Dr);
}
function Yf(e) {
  return H(() => {
    Ol(), e = G(e);
    const t = D(e.Class) ?? "", n = z(e.APIRef, bn), o = e.children, r = U(), {
      // s. "shared Base Helpers" for these commons
      ListRef: a,
      rerender: i,
      closeEntity: s,
      closeAllEntities: l,
      EntityIsOpen: d,
      openEntities: u
    } = Wa("dialog");
    function p(m) {
      It("dialog descriptor", m), m = Ea(m), h(m);
      const {
        Name: v,
        Title: C,
        isModal: _,
        hasCloseButton: j,
        isResizable: x,
        isDraggable: w,
        dontShrink: T,
        Renderer: L,
        onOpen: $,
        onClose: I,
        OffsetX: M,
        OffsetY: S,
        Width: F,
        Height: N,
        minWidth: X,
        minHeight: Q,
        maxWidth: pe,
        maxHeight: q
      } = m, J = Xt(v);
      d(v) && ce(
        "DialogAlreadyOpen: there is already a dialog called " + Lt(v)
      ), a.current.push({
        Name: v,
        [Sn]: J,
        Title: C,
        isModal: _ ?? !1,
        hasCloseButton: j,
        isResizable: x,
        isDraggable: w,
        dontShrink: T,
        Renderer: L,
        onOpen: $,
        onClose: I,
        OffsetX: M,
        OffsetY: S,
        Width: F,
        Height: N,
        minWidth: X ?? 0,
        minHeight: Q ?? 0,
        maxWidth: pe,
        maxHeight: q
      }), i();
    }
    function c(m) {
      _n("dialog name", m);
      const v = Xt(m), C = a.current;
      return C[C.length - 1]?.[Sn] === v;
    }
    function f(m) {
      _n("dialog name", m);
      const v = Xt(m), C = a.current, _ = C.findIndex(
        (x) => x[Sn] === v
      );
      if (_ < 0 || _ === C.length - 1)
        return;
      const j = C[_];
      a.current = [
        ...C.filter((x, w) => w !== _),
        j
      ], i();
    }
    function h(m) {
      Ha(m, "dialog", () => {
        _n("Name", m.Name), tn("isModal", m.isModal), tn("hasCloseButton", m.hasCloseButton), tn("isResizable", m.isResizable), tn("isDraggable", m.isDraggable), tn("dontShrink", m.dontShrink), Yt("Renderer", m.Renderer), Re("onOpen", m.onOpen), Re("onClose", m.onClose), pr("OffsetX", m.OffsetX), pr("OffsetY", m.OffsetY), Dt("Width", m.Width), Dt("Height", m.Height), Dt("minWidth", m.minWidth), Dt("minHeight", m.minHeight), Dt("maxWidth", m.maxWidth), Dt("maxHeight", m.maxHeight);
      });
    }
    const g = {
      openDialog: p,
      closeDialog: s,
      closeAllDialogs: l,
      openDialogs: u,
      DialogIsOpen: d,
      DialogIsFrontmost: c,
      bringDialogToFront: f
    }, y = oo();
    return Va(y, n, g), b`<${Lr.Provider} value=${y}>
        <div class="jcl-component dialog-base ${t ?? ""}"
          ref=${r} ...${e.RestProps}
        >
          ${o}
          <${Jf}
            DialogList=${a.current}
            BaseRef=${r} rerender=${i}
          />
        </div>
      </>`;
  });
}
function Jf(e) {
  return H(() => {
    e = G(e);
    const t = z(e.DialogList, (a) => Ie(a, De)), n = z(e.BaseRef, (a) => bn(a)) ?? Me("BaseRef"), o = R(e.rerender) ?? Me("rerender");
    if (t == null || t.length === 0)
      return;
    const r = t.length - 1;
    return b`
        ${t.map((a, i) => b`
          ${i === r && a.isModal && b`
            <${Qf} key=${"modal:" + a.Name}/>
          `}
          <${Pf} key=${"view:" + a.Name}
            Dialog=${a} BaseRef=${n} rerender=${o}
          />
        `)}
      `;
  });
}
const Zf = [
  ...zl,
  "mousedown",
  "touchstart",
  "pointerdown"
];
function Qf(e) {
  return H(() => {
    const t = U();
    return Fl(t, Zf), Zn(
      b`<div class="jcl-modal-layer" ref=${t} aria-hidden="true"/>`,
      document.body
    );
  });
}
function Pf(e) {
  return H(() => {
    e = G(e);
    const t = z(e.Dialog, De) ?? Me("Dialog"), n = z(e.BaseRef, (ye) => bn(ye)) ?? Me("BaseRef"), o = R(e.rerender), r = n.current;
    if (r == null)
      return null;
    const a = gt(kt), i = Fo(_r), s = a ?? i, { Theme: l, SwatchSet: d, Locale: u, Direction: p } = s, c = Ro(l, d), { localized: f } = Aa(s), h = dt(), g = f("jcl.dialog.close"), y = Vt() + "-dlg-title";
    let {
      Name: m,
      Title: v,
      hasCloseButton: C,
      isResizable: _,
      isDraggable: j,
      OffsetX: x,
      OffsetY: w,
      Width: T,
      Height: L,
      minWidth: $,
      minHeight: I,
      maxWidth: M,
      maxHeight: S,
      dontShrink: F
    } = t;
    const N = v != null || C === !0 || j === !0, X = _ ? "resizable" : "", Q = j ? "draggable" : "";
    $ == null && ($ = 0), I == null && (I = 0);
    const pe = 0, q = (N ? 30 : 0) + (_ ? 10 : 0);
    (N || _) && (I += q, L != null && (L += q)), C && ($ = Math.max(40, $)), _ && ($ = Math.max(60, $));
    const J = U(), { left: P, top: ue } = r.getBoundingClientRect();
    let ke = P, Ve = ue;
    if (J.current == null)
      ke += x ?? 0, Ve += w ?? 0;
    else {
      const { width: ye, height: ge } = J.current.getBoundingClientRect(), { width: nt, height: K } = r.getBoundingClientRect();
      T = Math.min(T ?? ye, window.innerWidth), L = Math.min(L ?? ge, window.innerHeight), x == null && (t.OffsetX = x = (nt - T) / 2), w == null && (t.OffsetY = w = (K - L) / 2), ke = Math.max(0, Math.min(ke + x, window.innerWidth - T)), Ve = Math.max(0, Math.min(Ve + w, window.innerHeight - L)), t.OffsetX = ke - P, t.OffsetY = Ve - ue, F === !0 && ($ = t.minWidth = Math.max($, T) - pe, I = t.minHeight = Math.max(I, L) - q, delete t.dontShrink), t.Width = T, t.Height = L - q;
    }
    const Ue = oo(), { closeDialog: pt, DialogIsFrontmost: ft, bringDialogToFront: te } = Ue, ee = Rl(
      J,
      t,
      pt,
      !0,
      [t, pt]
    );
    ja(() => {
      h();
    }, []);
    const ne = U(null);
    je(() => {
      ne.current = document.activeElement, E(
        `"onOpen" callback of dialog ${t.Name}`,
        t.onOpen,
        t.Name,
        { ...t }
      );
      const ye = setTimeout(() => {
        const ge = J.current;
        if (ge == null)
          return;
        (ge.querySelector(Ga) ?? ge).focus();
      }, 50);
      return () => {
        clearTimeout(ye), E(
          `"onClose" callback of dialog ${t.Name}`,
          t.onClose,
          t.Name,
          { ...t }
        ), ne.current?.focus();
      };
    }, []);
    const se = U({ Mode: void 0, x: 0, y: 0, Width: 0, Height: 0 }), xe = ie((ye, ge) => {
      t.OffsetX = se.current.x + ye, t.OffsetY = se.current.y + ge, ft(t.Name) || (te(t.Name), o?.()), h();
    }, [t, ft, te, h, o]), ve = An({
      ViewRef: J,
      ...j ? {
        onlyFrom: ".titlebar",
        neverFrom: ".close-button",
        onDragStart: () => {
          se.current = { x: t.OffsetX, y: t.OffsetY };
        },
        onDragContinuation: (ye, ge) => xe(ye, ge),
        onDragFinish: (ye, ge) => xe(ye, ge),
        onDragCancellation: (ye, ge) => xe(ye, ge)
      } : {}
    }), _e = ie((ye) => {
      if (ye == null)
        return;
      const ge = ye.target.classList;
      let nt;
      switch (!0) {
        case ge.contains("left-resizer"):
          nt = "resize-sw";
          break;
        case ge.contains("middle-resizer"):
          nt = "resize-s";
          break;
        case ge.contains("right-resizer"):
          nt = "resize-se";
          break;
      }
      se.current = {
        Mode: nt,
        x: t.OffsetX,
        Width: t.Width,
        y: t.OffsetY,
        Height: t.Height
      };
    }, [t]), Ae = ie((ye, ge) => {
      const { minWidth: nt, maxWidth: K, minHeight: ae, maxHeight: me } = t;
      let Ge = se.current.Width;
      switch (se.current.Mode) {
        case "resize-sw":
          Ge = Math.max(nt ?? 0, Math.min(Ge - ye, K ?? 1 / 0)), ye = Ge - se.current.Width, t.OffsetX = se.current.x - ye, t.Width = se.current.Width + ye;
          break;
        case "resize-se":
          t.Width = Math.max(nt ?? 0, Math.min(se.current.Width + ye, K ?? 1 / 0));
          break;
      }
      t.Height = Math.max(ae ?? 0, Math.min(se.current.Height + ge, me ?? 1 / 0)), ft(t.Name) || (te(t.Name), o?.()), h();
    }, [t, ft, te, h, o]), Oe = An({
      ViewRef: J,
      ..._ ? {
        onlyFrom: ".left-resizer,.middle-resizer,.right-resizer",
        onDragStart: (ye, ge, nt, K, ae) => _e(ae),
        onDragContinuation: (ye, ge) => Ae(ye, ge),
        onDragFinish: (ye, ge) => Ae(ye, ge),
        onDragCancellation: (ye, ge) => Ae(ye, ge)
      } : {}
    }), mt = ie(
      () => Xe(
        `"Renderer" callback of dialog ${t.Name}`,
        t.Renderer,
        t.Name,
        { ...t }
      ),
      [t]
    );
    return Zn(b`
        <${Lr.Provider} value=${{ ...Ue, DialogName: t.Name }}>
        <${kt.Provider} value=${s}>
          <div class="jcl-dialog-view ${X} ${Q}"
            role="dialog"
            aria-modal=${t.isModal ? "true" : void 0}
            aria-labelledby=${N ? y : void 0}
            aria-label=${N ? void 0 : v ?? m}

            tabIndex=${-1} key=${"dialog:" + m} ref=${J}
            dir=${p} lang=${u}
            style="
              visibility:${J.current == null ? "hidden" : "visible"};
              left:${ke}px; top:${Ve}px;
              width:${T == null ? "auto" : `${T}px`};
              height:${L == null ? "auto" : `${L}px`};
              min-width:${$}px; min-height:${I}px;
              max-width:${M == null ? "none" : `${M}px`};
              max-height:${S == null ? "none" : `${S}px`};
              ${c}
            "
            onPointerDown=${() => te(m)}
            onKeyDown=${ee}
          >
            ${N && b`
              <div class="titlebar" onPointerDown=${ve}>
                <span id=${y} class="title">${v ?? ""}</span>
                ${C && b`
                  <button type="button" class="close-button"
                    aria-label=${g}
                    onClick=${() => pt(t.Name)}
                  />
                `}
              </div>
            `}
            <div class="content-pane">
              <${mt}/>
            </div>
            ${_ && b`
              <div class="resizer" aria-hidden="true">
                <div class="left-resizer"   onPointerDown=${Oe}/>
                <div class="middle-resizer" onPointerDown=${Oe}/>
                <div class="right-resizer"  onPointerDown=${Oe}/>
              </div>
            `}
          </div>
        </>
        </>
      `, document.body);
  });
}
const Nn = Ba("DialogContext"), Lr = /* @__PURE__ */ mn({
  openDialog: Nn,
  closeDialog: Nn,
  closeAllDialogs: Nn,
  openDialogs: [],
  DialogIsOpen: Nn,
  DialogIsFrontmost: Nn,
  bringDialogToFront: Nn
});
function oo() {
  return gt(Lr);
}
let eh = 0;
function th(e) {
  return H(() => {
    nh(), e = G(e);
    const t = D(e.Class) ?? "", n = z(e.APIRef, bn), o = z(e.Placement, (g) => he(g, ["top-left", "top-right", "bottom-left", "bottom-right"])) ?? "bottom-right", r = e.children, {
      // s. "shared Base Helpers" for these commons
      ListRef: a,
      rerender: i,
      closeEntity: s,
      closeAllEntities: l,
      EntityIsOpen: d,
      openEntities: u
    } = Wa("toast");
    function p(g) {
      It("toast descriptor", g), g = Ea(g), c(g);
      let { Name: y, Renderer: m, Duration: v, onOpen: C, onClose: _ } = g;
      y == null && (y = "Toast-" + ++eh);
      const j = Xt(y);
      return d(y) && ce(
        "ToastAlreadyOpen: there is already a toast called " + Lt(y)
      ), a.current.push({
        Name: y,
        [Sn]: j,
        Renderer: m,
        Duration: v ?? 5e3,
        onOpen: C,
        onClose: _
      }), i(), y;
    }
    function c(g) {
      Ha(g, "toast", () => {
        wp("Name", g.Name), Yt("Renderer", g.Renderer), Us("Duration", g.Duration), Re("onOpen", g.onOpen), Re("onClose", g.onClose);
      });
    }
    const f = {
      showToast: p,
      closeToast: s,
      closeAllToasts: l,
      openToasts: u,
      ToastIsOpen: d
    }, h = Ka();
    return Va(h, n, f), b`<${Ua.Provider} value=${h}>
        <div class="jcl-component toast-base ${t}" ...${e.RestProps}>
          ${r}
          <div class="jcl-toast-viewport placement-${o}" aria-live="polite">
            <${oh} ToastList=${a.current}/>
          </>
        </>
      </>`;
  });
}
const nh = /* @__PURE__ */ Z("jcl-component.toast-base", `
    .jcl-component.toast-base {
      display:contents;
    }

    .jcl-toast-viewport {
      display:flex; flex-flow:column nowrap;
      gap:8px;
      position:fixed; z-index:5000000; /* above everything else */
      pointer-events:none;
    }

  /**** near the top, the newest toast appears first ****/

    .jcl-toast-viewport.placement-top-left,
    .jcl-toast-viewport.placement-top-right {
      flex-flow:column-reverse nowrap;
    }

    .jcl-toast-viewport.placement-top-left     { left:16px;  top:16px    }
    .jcl-toast-viewport.placement-top-right    { right:16px; top:16px    }
    .jcl-toast-viewport.placement-bottom-left  { left:16px;  bottom:16px }
    .jcl-toast-viewport.placement-bottom-right { right:16px; bottom:16px }
  `);
function oh(e) {
  return H(() => {
    e = G(e);
    const t = z(e.ToastList, (n) => Ie(n, De));
    if (!(t == null || t.length === 0))
      return b`${t.map(
        (n) => b`
          <${rh} key=${"view:" + n.Name} Toast=${n}/>
        `
      )}`;
  });
}
const Nl = /* @__PURE__ */ mn(void 0);
function rh(e) {
  return H(() => {
    ah(), e = G(e);
    const t = z(e.Toast, De) ?? Me("Toast"), { closeToast: n } = Ka(), [o, r] = He(!1), a = U(void 0), i = U(0);
    function s() {
      a.current != null && (clearTimeout(a.current), a.current = void 0);
    }
    function l() {
      s(), t.Duration > 0 && (a.current = setTimeout(() => n(t.Name), t.Duration));
    }
    function d() {
      s(), r(!0);
    }
    function u() {
      i.current++, l(), r(!1);
    }
    return je(() => (l(), E('toast callback "onOpen"', t.onOpen), () => {
      s(), E('toast callback "onClose"', t.onClose);
    }), []), b`<div class="jcl-toast-view" role="status"
        onMouseEnter=${d} onMouseLeave=${u}
      >
        <${Nl.Provider} value=${{ Name: t.Name, closeToast: n }}>
          ${t.Renderer({})}
        </>
        ${t.Duration > 0 && b`<div class="remaining-time"
          key=${i.current} aria-hidden="true"
          style="animation-duration:${t.Duration}ms; animation-play-state:${o ? "paused" : "running"}"
        />`}
      </>`;
  });
}
const ah = /* @__PURE__ */ Z("jcl-toast-view", `
    @keyframes jcl-toast-in {
      from { opacity:0; transform:translateY(8px) }
      to   { opacity:1; transform:none }
    }

    .jcl-toast-view {
      position:relative;         /* anchors the "remaining time" progress bar */
      width:360px; max-width:calc(100vw - 32px);
      pointer-events:auto;
      animation:jcl-toast-in 0.2s ease;
    }

  /**** a discreet progress bar shows the remaining time ****/

    @keyframes jcl-toast-countdown {
      from { transform:scaleX(1) }
      to   { transform:scaleX(0) }
    }

    .jcl-toast-view > .remaining-time {
      position:absolute; left:12px; right:12px; bottom:5px;
      height:2px; border-radius:1px;
      background:color-mix(
        in srgb, var(--jcl-muted-fg-color,#737373) 40%, transparent
      );
      transform-origin:left center;
      animation:jcl-toast-countdown linear forwards;
      pointer-events:none;
    }
  `), Zo = Ba("ToastContext"), Ua = /* @__PURE__ */ mn({
  showToast: Zo,
  closeToast: Zo,
  closeAllToasts: Zo,
  openToasts: [],
  ToastIsOpen: Zo
});
function Ka() {
  return gt(Ua);
}
function ih(e) {
  return sh(), El("fullsized", e);
}
const sh = /* @__PURE__ */ Z("jcl-component.fullsized", `
    .jcl-component.fullsized {
      flex:1 0 auto;
      left:0px; top:0px; right:auto; bottom:auto; width:100%; height:100%;
    }
    .jcl-component.fullsized > * {
      position:absolute;
      left:0px; top:0px; right:auto; bottom:auto; width:100%; height:100%;
    }
  `);
function qa(e) {
  return lh(), El("centered", e);
}
const lh = /* @__PURE__ */ Z("jcl-component.centered", `
    .jcl-component.centered {
      display:flex !important; flex-flow:column nowrap !important;
        align-items:center !important; justify-content:center !important;
      flex:1 0 auto;
      left:0px; top:0px; right:auto; bottom:auto; width:100%; height:100%;
    }
    .jcl-component.centered > * {
      position:relative; flex:0 0 auto;
    }
  `);
function ch(e) {
  return dh(), Vl("horizontal", e);
}
const dh = /* @__PURE__ */ Z("jcl-component.horizontal", `
    .jcl-component.horizontal {
      display:flex !important; flex-flow:row nowrap !important;
        align-items:center;
    }
    .jcl-component.horizontal > * {
      position:relative; flex:0 0 auto;
    }
  `);
function uh(e) {
  return ph(), Vl("vertical", e);
}
const ph = /* @__PURE__ */ Z("jcl-component.vertical", `
    .jcl-component.vertical {
      display:flex !important; flex-flow:column nowrap !important;
        align-items:start;
    }
    .jcl-component.vertical > * {
      position:relative; flex:0 0 auto;
    }
  `);
function fh(e) {
  return H(() => {
    hh(), e = G(e);
    const t = D(e.Class) ?? "", n = re(e.Style) ?? "", o = gn(e.Columns) ?? 2, r = $e(e.RowGap) ?? 0, a = $e(e.ColGap) ?? 0, i = D(e.ColumnClasses) ?? "", s = Mt(e.children);
    function l(g) {
      if (typeof g == "string")
        return 1;
      {
        const y = g.props.colspan;
        return pn(y) ? y : 1;
      }
    }
    const d = s.filter(
      (g) => typeof g != "string" ? g != null && g.type != null : g.trim() !== ""
    ), u = d.length, p = [[]];
    let c = 0, f = 0;
    d.forEach((g, y) => {
      p[c].push(g), f += l(g), f >= o && y < u - 1 && (p.push([]), c++, f = 0);
    });
    const h = i.trim() === "" ? "" : b`<colgroup>${i.split(" ").map(
      (g) => b`<col class="${g}"/>`
    )}</>`;
    return b`<table class="jcl-component tabular ${t}" style="
        ${n};
        border-spacing:${a}px ${r}px;
        margin:-${r}px -${a}px -${r}px -${a}px
      " ...${e.RestProps}
      >${h}<tbody>
        ${u > 0 && p.map((g) => b`<tr>
          ${g.map(
      (y) => b`<td colspan=${l(y)}>${y}</>`
    )}
        </tr>`)}
      </tbody></table>`;
  });
}
const hh = /* @__PURE__ */ Z("jcl-component.tabular", `
    .jcl-component.tabular {
      display:table !important;
      border:none; border-collapse:separate; border-spacing:0px;
    }
    .jcl-component.tabular > tbody {
      position:relative;
      vertical-align:top;
    }
    .jcl-component.tabular > tbody > tr > td {
      display:table-cell;
      margin:0px; padding:0px;
    }

    .jcl-component.tabular > colgroup > col.expanding { width:100% }
    .jcl-component.tabular > colgroup > col.shrinking { width:1px }
  `);
function gh(e) {
  return H(() => {
    mh(), e = G(e);
    const t = D(e.Class) ?? "";
    let n = $e(e.activeIndex) ?? 0, o = Mt(e.children).filter(
      (a) => typeof a != "string" || a.trim() !== ""
    );
    const r = o.length;
    return n = r === 0 ? 0 : Math.max(0, Math.min(n, r - 1)), b`<div class="jcl-component selective ${t}"
        ...${e.RestProps}>${o[n]}</>`;
  });
}
const mh = /* @__PURE__ */ Z("jcl-component.selective", `
    .jcl-component.selective {
      display:flex !important; flex-flow:column nowrap !important;
        align-items:stretch !important; justify-content:stretch !important;
      flex:1 0 auto;
    }
    .jcl-component.selective > * {
      display:block; position:relative;
      left:0px; top:0px; right:auto; bottom:auto; width:100%; height:100%;
    }
  `);
function bh(e) {
  return H(() => {
    yh(), e = G(e);
    const t = D(e.Class) ?? "", n = e.children;
    return b`<div class="jcl-component stacked ${t}" ...${e.RestProps}>
        ${n}
      </>`;
  });
}
const yh = /* @__PURE__ */ Z("jcl-component.stacked", `
    .jcl-component.stacked > *:first-child {
      position:relative;
      left:0px; top:0px; right:auto; bottom:auto; width:auto; height:auto;
    }
    .jcl-component.stacked > *:not(:first-child) {
      position:absolute; top:0px;
    }
  `);
function El(e, t) {
  return H(() => {
    t = G(t);
    const n = D(t.Class) ?? "", o = t.children;
    return b`<div class="jcl-component ${e} ${n}" ...${t.RestProps}>
        ${o}
      </>`;
  });
}
function Vl(e, t) {
  return H(() => {
    t = G(t);
    const n = D(t.Class) ?? "", o = re(t.Style) ?? "", r = $e(t.Gap) ?? 0, a = t.children;
    return b`<div class="jcl-component ${e} ${n}"
        style="gap:${r}px; ${o}" ...${t.RestProps}
      >${a}</>`;
  });
}
function xh(e) {
  return H(() => {
    vh(), e = G(e);
    const t = D(e.Class) ?? "", n = re(e.Value) ?? "", o = Y(e.visiblePattern) ?? !1;
    return b`<div
        class="jcl-component dummy ${o ? "visible-pattern" : ""} ${t}"
        aria-hidden="true"
        ...${e.RestProps} dangerouslySetInnerHTML=${{ __html: n }}
      />`;
  });
}
const vh = /* @__PURE__ */ Z("jcl-component.dummy", `
    .jcl-component.dummy.visible-pattern {
      background-image:repeating-linear-gradient(-45deg,
        rgba(222,222,222, 1) 0px, rgba(222,222,222, 1) 4px,
        rgba(0,0,0, 0) 4px, rgba(0,0,0, 0) 8px
      ); background-size:11.31px 11.31px;
    }
  `);
function wh(e) {
  return H(() => {
    Bl(), e = G(e);
    const t = D(e.Class) ?? "", n = re(e.Style) ?? "", o = $e(e.Width), r = $e(e.Height), a = (o == null ? "" : `width:${o}px;`) + (r == null ? "" : `height:${r}px;`) + n;
    return b`<div class="jcl-component spacer ${t}"
        style=${a} aria-hidden="true" ...${e.RestProps}/>`;
  });
}
function kh(e) {
  return H(() => {
    Bl(), e = G(e);
    const t = D(e.Class) ?? "", n = re(e.Style) ?? "", o = $e(e.Width), r = $e(e.Height), a = (o == null ? "" : `width:${o}px;`) + (r == null ? "" : `height:${r}px;`) + n;
    return b`<div class="jcl-component expanding-spacer ${t}"
        style=${a} aria-hidden="true" ...${e.RestProps}/>`;
  });
}
const Bl = /* @__PURE__ */ Z("jcl-component.expanding-spacer", `
    .jcl-component.expanding-spacer {
      flex:1 0 auto !important;
    }
  `);
function Ch(e) {
  return H(() => {
    Wl(), Hl(), e = G(e);
    const t = D(e.Class) ?? "";
    return b`<div class="jcl-component horizontal-separator ${t}"
        role="separator" aria-orientation="horizontal" ...${e.RestProps}/>`;
  });
}
const Wl = /* @__PURE__ */ Z("jcl-component.horizontal-separator", `
    .jcl-component.horizontal-separator {
      position:relative;
      flex:1 0 auto;
      width:100%; min-width:1px; min-height:1px;
    }
    .jcl-component.horizontal-separator::before {
      content: "";
      position:absolute; left:0px; right:0px; width:100%; height:1px;
      top:50%; transform:translateY(-50%);
      background:gray;
    }
    @media (prefers-contrast: more) {
      .jcl-component.horizontal-separator::before { background:currentColor; height:2px }
    }
  `);
function $h(e) {
  return H(() => {
    Wl(), Hl(), e = G(e);
    const t = D(e.Class) ?? "";
    return b`<div class="jcl-component vertical-separator ${t}"
        role="separator" aria-orientation="vertical" ...${e.RestProps}/>`;
  });
}
const Hl = /* @__PURE__ */ Z("jcl-component.vertical-separator", `
    .jcl-component.vertical-separator {
      position:relative;
      flex:1 0 auto;
      height:100%; min-width:1px; min-height:1px;
    }
    .jcl-component.vertical-separator::before {
      content: "";
      position:absolute; top:0px; bottom:0px; width:1px; height:100%;
      left:50%; transform:translateX(-50%);
      background:gray;
    }
    @media (prefers-contrast: more) {
      .jcl-component.vertical-separator::before { background:currentColor; width:2px }
    }
  `);
function Mr(e) {
  return H(() => {
    Ih(), Sh(), Lh(), Ah(), e = G(e);
    const t = D(e.Class) ?? "", n = D(e.Value), o = gn(e.ARIALevel);
    return b`<div class=${t} aria-level=${o} ...${e.RestProps}>
        ${n ?? e.children}
      </>`;
  });
}
function jh(e) {
  return e = {
    role: "heading",
    "aria-level": 1,
    ...e,
    class: `jcl-component title ${e.class ?? ""}`
  }, Mr(e);
}
const Ih = /* @__PURE__ */ Z("jcl-component.title", `
    .jcl-component.title {
      font-size:22px; font-weight:bold; line-height:32px;
      overflow:hidden; text-overflow:ellipsis;
    }
  `);
function _h(e) {
  return e = {
    role: "heading",
    "aria-level": 2,
    ...e,
    class: `jcl-component subtitle ${e.class ?? ""}`
  }, Mr(e);
}
const Sh = /* @__PURE__ */ Z("jcl-component.subtitle", `
    .jcl-component.subtitle {
      font-size:18px; font-weight:bold; line-height:27px;
      overflow:hidden; text-overflow:ellipsis;
    }
  `);
function Dh(e) {
  return e = { ...e, class: `jcl-component label ${e.class ?? ""}` }, Mr(e);
}
const Lh = /* @__PURE__ */ Z("jcl-component.label", `
    .jcl-component.label {
      height:30px;
      font-size:14px; font-weight:bold; line-height:30px;
      overflow:hidden; text-overflow:ellipsis;
    }
  `);
function Mh(e) {
  return e = { ...e, class: `jcl-component textlineview ${e.class ?? ""}` }, Mr(e);
}
const Ah = /* @__PURE__ */ Z("jcl-component.textlineview", `
    .jcl-component.textlineview {
      height:30px;
      font-size:14px; line-height:30px;
      overflow:hidden; text-overflow:ellipsis;
    }
  `);
function Gl(e) {
  return H(() => {
    Th(), Fh(), e = G(e);
    const t = D(e.Class) ?? "", n = re(e.Value);
    return b`<div class=${t} ...${e.RestProps}>
        ${n ?? e.children}
      </>`;
  });
}
function Xa(e) {
  return e = { ...e, class: `jcl-component description ${e.class ?? ""}` }, Gl(e);
}
const Th = /* @__PURE__ */ Z("jcl-component.description", `
    .jcl-component.description {
      font-size:14px; font-weight:normal; line-height:21px;
      overflow:hidden; text-overflow:ellipsis;
    }
  `);
function Rh(e) {
  return e = { ...e, class: `jcl-component fineprint ${e.class ?? ""}` }, Gl(e);
}
const Fh = /* @__PURE__ */ Z("jcl-component.fineprint", `
    .jcl-component.fineprint {
      font-size:12px; font-weight:normal; line-height:18px;
      overflow:hidden; text-overflow:ellipsis;
    }
  `);
function Oh(e) {
  return H(() => {
    zh(), e = G(e);
    const t = D(e.Class) ?? "", n = re(e.Value), o = Y(e.preformatted) ?? !1;
    return b`<div class="jcl-component textview ${t} ${o ? "preformatted" : ""}"
        ...${e.RestProps}
      >${n ?? ""}</>`;
  });
}
const zh = /* @__PURE__ */ Z("jcl-component.textview", `
    .jcl-component.textview {
      overflow:auto; overscroll-behavior:contain;
      font-size:14px; font-weight:normal; line-height:21px;
    }
    .jcl-component.textview.preformatted {
      white-space:pre;
      font-family:"Courier New",Courier,"Lucida Sans Typewriter","Lucida Console",Monaco,Consolas,monospace;
      font-size:14px; font-weight:normal; line-height:21px;
    }
  `);
function Nh(e) {
  return H(() => {
    Eh(), e = G(e);
    const t = D(e.Class) ?? "", n = re(e.Value) ?? "";
    return b`<div class="jcl-component htmlview ${t}" ...${e.RestProps}
        dangerouslySetInnerHTML=${{ __html: n }}
      />`;
  });
}
const Eh = /* @__PURE__ */ Z("jcl-component.htmlview", `
    .jcl-component.htmlview {
      overflow:auto; overscroll-behavior:contain;
      font-size:14px; font-weight:normal; line-height:21px;
    }
  `);
let gr, mr, ea, Hn;
const Vh = Oo(async () => {
  const [
    e,
    t,
    n,
    o
  ] = await Promise.all([
    ht("marked"),
    ht("marked-katex-extension"),
    ht("marked-highlight"),
    ht("highlight.js/lib/core")
  ]);
  gr = e.Marked, mr = t.default ?? t, ea = n.markedHighlight, Hn = o.default ?? o;
  const r = [
    // 'python' is not registered
    "css",
    "javascript",
    "java",
    "json",
    "typescript",
    "xml"
  ], a = await Promise.all(r.map(
    (i) => ht("highlight.js/lib/languages/" + i)
  ));
  r.forEach((i, s) => {
    Hn.registerLanguage(i, a[s].default);
  }), In = new gr(), In.setOptions({
    gfm: !0,
    breaks: !0,
    pedantic: !1
  }), In.use(mr({
    throwOnError: !1,
    nonStandard: !1
    // "$...$" needs a blank/punctuation around it
  })), In.use(ea({
    emptyLangClass: "hljs",
    langPrefix: "hljs language-",
    highlight(i, s) {
      const l = Hn.getLanguage(s) ? s : "plaintext";
      return Hn.highlight(i, { language: l }).value;
    }
  }));
});
function zo() {
  return Vh();
}
let In;
async function Bh() {
  return await zo(), In;
}
function Ul(e) {
  return H(() => {
    Wh();
    const t = eo(zo);
    e = G(e);
    const n = D(e.Class) ?? "", o = z(e.Value, Mo) ?? "", r = Jt(() => t ? In.parse(o) : "", [t, o]);
    return b`<div class="jcl-component markdownview ${n}"
        ...${e.RestProps}
        dangerouslySetInnerHTML=${{ __html: r }}
      />`;
  });
}
const Wh = /* @__PURE__ */ Z("jcl-component.markdownview", `
    .jcl-component.markdownview {
      overflow:auto; overscroll-behavior:contain;
      font-size:14px; font-weight:normal; line-height:21px;
    }

    .jcl-component.markdownview > h1 { font-size:22px; font-weight:bold; line-height:1.5; margin:0px }
    .jcl-component.markdownview > h2 { font-size:20px; font-weight:bold; line-height:1.5; margin:0px }
    .jcl-component.markdownview > h3 { font-size:18px; font-weight:bold; line-height:1.5; margin:0px }
    .jcl-component.markdownview > h4 { font-size:16px; font-weight:bold; line-height:1.5; margin:0px }
    .jcl-component.markdownview > h5 { font-size:15px; font-weight:bold; line-height:1.5; margin:0px }
    .jcl-component.markdownview > h6 { font-size:14px; font-weight:bold; line-height:1.5; margin:0px }

    .jcl-component.markdownview > h1:not(:first-child) { margin-top:11px }
    .jcl-component.markdownview > h2:not(:first-child) { margin-top:10px }
    .jcl-component.markdownview > h3:not(:first-child) { margin-top:9px }
    .jcl-component.markdownview > h4:not(:first-child) { margin-top:8px }
    .jcl-component.markdownview > h5:not(:first-child) { margin-top:8px }
    .jcl-component.markdownview > h6:not(:first-child) { margin-top:7px }

    .jcl-component.markdownview > p { font-size:14px; font-weight:normal; line-height:1.5; margin:0px }
    .jcl-component.markdownview > p:not(:first-child) { margin-top:7px }

    .jcl-component.markdownview > ul { font-size:14px; font-weight:normal; line-height:1.5; margin:0px }
    .jcl-component.markdownview > ul:not(:first-child) { margin-top:7px }

    .jcl-component.markdownview > ol { font-size:14px; font-weight:normal; line-height:1.5; margin:0px }
    .jcl-component.markdownview > ol:not(:first-child) { margin-top:7px }

    .jcl-component.markdownview > li { margin-left:20px }
    .jcl-component.markdownview > ul, .jcl-component.markdownview > ol { padding-left:0px }

    .jcl-component.markdownview > blockquote {
      margin:7px 0px 0px 10px;
      padding:0px 0px 0px 6px;
      border:none; border-left:solid 4px lightgray;
    }

    .jcl-component.markdownview > code {
      font-family:Menlo,Courier,monospace;
      font-size:13px; font-weight:normal; line-height:1.5; margin:0px;
      padding:2px; background-color:#EEEEEE;
    }

    .jcl-component.markdownview > pre { background-color:#EEEEEE; padding:2px 0px 2px 6px }
    .jcl-component.markdownview > pre:not(:first-child) { margin-top:7px }
    .jcl-component.markdownview > pre > code { padding:0px }

  /**** Syntax Highlighting ****/

    .hljs {
      display:block;
      overflow-x:auto;
      padding:0.5em;
      background:#f0f0f0;
      color:#444444;
    }

    .hljs-comment, .hljs-quote                     { font-style:italic;  color:#999988 }
    .hljs-keyword, .hljs-selector-tag, .hljs-subst { font-weight:bold;   color:#333333 }
    .hljs-string,  .hljs-doctag                    { color:#dd1144 }
    .hljs-number                                   { color:#009999 }
    .hljs-title, .hljs-section, .hljs-selector-id  { font-weight:bold;   color:#990000 }
    .hljs-class .hljs-title, .hljs-type            { font-weight:bold;   color:#445588 }
    .hljs-variable, .hljs-template-variable        { color:#336699 }
    .hljs-attr                                     { color:#007700 }
    .hljs-tag, .hljs-name                          { font-weight:normal; color:#000080}
    .hljs-regexp                                   { color:#009926 }
    .hljs-symbol, .hljs-bullet, .hljs-link, .hljs-meta, .hljs-selector-pseudo { color:#990073 }
    .hljs-built_in, .hljs-builtin-name             { color:#0086b3 }
    .hljs-deletion                                 { background:#ffdddd }
    .hljs-addition                                 { background:#ddffdd }
    .hljs-emphasis                                 { font-style:italic }
    .hljs-strong                                   { font-weight:bold }
    .hljs.language-html, .hljs.language-xml        { color:#333333 }
    .hljs.language-css .hljs-selector-class,
    .hljs.language-css .hljs-selector-tag,
    .hljs.language-css .hljs-attribute             { color:#1e347b }
    .hljs.language-javascript .hljs-keyword        { color:#0000aa }
    .hljs.language-typescript .hljs-keyword        { color:#0000aa }
    .hljs.language-java .hljs-keyword              { color:#bb9966 }
    .hljs.language-json .hljs-attribute            { color:#0000aa }
  `), Kl = ["none", "stretch", "cover", "contain"], ql = [
  "left top",
  "center top",
  "right top",
  "left center",
  "center center",
  "right center",
  "left bottom",
  "center bottom",
  "right bottom"
];
function Hh(e) {
  return H(() => {
    Gh(), e = G(e);
    const t = D(e.Class) ?? "", n = re(e.Style) ?? "", o = Fn(e.Value), r = Mn(e.alt) ?? "(image)", a = Mn(e.Placeholder) ?? "(empty)", i = z(e.Scaling, (u) => he(u, Kl)), s = z(e.Alignment, (u) => he(u, ql)), l = (i === "stretch" ? "fill" : i) ?? "contain", d = s ?? "center center";
    return o == null ? b`<${qa} class="jcl-component imageview ${t}" style=${n}
          role="img" aria-label=${a}
          ...${e.RestProps}
        >
          <${Xa} value=${a}/>
        </>` : b`<img class="jcl-component imageview ${t ?? ""}"
          src=${o} alt=${r}
          style="object-fit:${l}; object-position:${d}; ${n}"
          ...${e.RestProps}
        />`;
  });
}
const Gh = /* @__PURE__ */ Z("jcl-component.imageview", `
    div.jcl-component.imageview {
      display:flex; align-items:center; justify-content:center;
    }
    img.jcl-component.imageview {
      object-fit:contain; object-position:center;
    }
  `);
function Uh(e) {
  return H(() => {
    Kh(), e = G(e);
    const t = D(e.Class) ?? "", n = re(e.Style) ?? "", o = re(e.Value), r = Mn(e.alt) ?? "SVG image", a = Mn(e.Placeholder) ?? "(empty)", i = z(e.Scaling, (p) => he(p, Kl)), s = z(e.Alignment, (p) => he(p, ql)), l = Jt(
      () => "data:image/svg+xml," + encodeURIComponent(o ?? ""),
      [o]
    ), d = (i === "stretch" ? "fill" : i) ?? "contain", u = s ?? "center center";
    return o == null ? b`<${qa} class="jcl-component svgview ${t}" style=${n}
          role="img" aria-label=${a}
          ...${e.RestProps}
        >
          <${Xa} value=${a}/>
        </>` : b`<img class="jcl-component svgview ${t ?? ""}"
          src=${l} alt=${r}
          style="object-fit:${d}; object-position:${u}; ${n ?? ""}"
          ...${e.RestProps}
        />`;
  });
}
const Kh = /* @__PURE__ */ Z("jcl-component.svgview", `
    .jcl-component.svgview {
      object-fit:contain; object-position:center;
    }
  `), qh = "allow-downloads allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-scripts", Xh = [
  "no-referrer",
  "no-referrer-when-downgrade",
  "origin",
  "origin-when-cross-origin",
  "same-origin",
  "strict-origin",
  "strict-origin-when-cross-origin",
  "unsafe-url"
];
function Yh(e) {
  return H(() => {
    Jh(), e = G(e);
    const t = D(e.Class) ?? "", n = Fn(e.Value), o = D(e.Title), r = D(e.allow), a = Y(e.allowFullscreen), i = z(e.ReferrerPolicy, (d) => he(d, Xh)), s = D(e.Sandbox);
    return b`<iframe class="jcl-component webview ${t}" src=${n}
        title=${o} allow=${r} allowfullscreen=${a}
        sandbox=${s === "none" ? void 0 : s ?? qh} referrerpolicy=${i}
        ...${e.RestProps}
      />`;
  });
}
const Jh = /* @__PURE__ */ Z("jcl-component.webview", `
    .jcl-component.webview {
      overflow:auto;
    }
  `);
function Xl(e, t, n) {
  const o = n != null, r = ie((s) => {
    if (t)
      return wn(s);
    E(e + ' callback "onClick"', n, s);
  }, [t, n]), a = ie((s) => {
    (s.key === "Enter" || s.key === " ") && (s.preventDefault(), t || E(e + ' callback "onClick"', n, s));
  }, [t, n]);
  return { isInteractive: o, _onClick: r, _onKeyDown: a, Cursor: t ? "not-allowed" : o ? "pointer" : "auto" };
}
function Zh(e) {
  return H(() => {
    Qh(), e = G(e);
    const t = D(e.Class) ?? "", n = re(e.Style);
    let o = Fn(e.Value) ?? `${ur}/circle-information.png`, r = St(e.Color) ?? "black";
    const a = Mn(e.Label), i = Y(e.active) ?? !1, s = Y(e.disabled) ?? !1, l = R(e.onClick), { isInteractive: d, _onClick: u, _onKeyDown: p, Cursor: c } = Xl("Icon", s, l);
    return b`<div
        class="jcl-component icon ${s ? "disabled" : ""} ${i ? "active" : ""} ${t}"
        style=${n} tabIndex=${d ? s ? -1 : 0 : void 0}
        role=${d ? "button" : void 0}
        aria-label=${a}
        aria-disabled=${d && s ? "true" : void 0}
        onClick=${u}
        onKeyDown=${d ? p : void 0}
        ...${e.RestProps}
      >
        <div style="
          -webkit-mask-image:url(${o}); mask-image:url(${o});
          background-color:${r};
          cursor:${c};
        "/>
      </>`;
  });
}
const Qh = /* @__PURE__ */ Z("jcl-component.icon", `
    .jcl-component.icon {
      width:24px !important; height:24px !important;
    }

    .jcl-component.icon > div {
      width:24px; height:24px;
      overflow:hidden; pointer-events:auto;
      -webkit-mask-size:contain;           mask-size:contain;
      -webkit-mask-position:center center; mask-position:center center;
    }

    .jcl-component.icon.active,
    .jcl-component.fa-icon.active {
      background:#e8f0ff;
      outline:solid 2px lightgray; border-radius:4px;
    }
    .jcl-component.icon[role="button"]:focus-visible,
    .jcl-component.fa-icon[role="button"]:focus-visible {
      outline:solid 2px #6366f1; border-radius:4px;
    }
    @media (prefers-contrast: more) {
      .jcl-component.icon.active,
      .jcl-component.fa-icon.active { outline:solid 3px currentColor }
      .jcl-component.icon[role="button"]:focus-visible,
      .jcl-component.fa-icon[role="button"]:focus-visible { outline:solid 3px currentColor }
    }
  `), Ya = [
  // modified version from https://gist.github.com/zwinnie/3ed8e7970240962bc29227533c3ae047
  "fa-500px",
  "fa-address-book",
  "fa-address-book-o",
  "fa-address-card",
  "fa-address-card-o",
  "fa-adjust",
  "fa-adn",
  "fa-align-center",
  "fa-align-justify",
  "fa-align-left",
  "fa-align-right",
  "fa-amazon",
  "fa-ambulance",
  "fa-american-sign-language-interpreting",
  "fa-anchor",
  "fa-android",
  "fa-angellist",
  "fa-angle-double-down",
  "fa-angle-double-left",
  "fa-angle-double-right",
  "fa-angle-double-up",
  "fa-angle-down",
  "fa-angle-left",
  "fa-angle-right",
  "fa-angle-up",
  "fa-apple",
  "fa-archive",
  "fa-area-chart",
  "fa-arrow-circle-down",
  "fa-arrow-circle-left",
  "fa-arrow-circle-o-down",
  "fa-arrow-circle-o-left",
  "fa-arrow-circle-o-right",
  "fa-arrow-circle-o-up",
  "fa-arrow-circle-right",
  "fa-arrow-circle-up",
  "fa-arrow-down",
  "fa-arrow-left",
  "fa-arrow-right",
  "fa-arrow-up",
  "fa-arrows",
  "fa-arrows-alt",
  "fa-arrows-h",
  "fa-arrows-v",
  "fa-asl-interpreting",
  "fa-assistive-listening-systems",
  "fa-asterisk",
  "fa-at",
  "fa-audio-description",
  "fa-automobile",
  "fa-backward",
  "fa-balance-scale",
  "fa-ban",
  "fa-bandcamp",
  "fa-bank",
  "fa-bar-chart",
  "fa-bar-chart-o",
  "fa-barcode",
  "fa-bars",
  "fa-bath",
  "fa-bathtub",
  "fa-battery",
  "fa-battery-0",
  "fa-battery-1",
  "fa-battery-2",
  "fa-battery-3",
  "fa-battery-4",
  "fa-battery-empty",
  "fa-battery-full",
  "fa-battery-half",
  "fa-battery-quarter",
  "fa-battery-three-quarters",
  "fa-bed",
  "fa-beer",
  "fa-behance",
  "fa-behance-square",
  "fa-bell",
  "fa-bell-o",
  "fa-bell-slash",
  "fa-bell-slash-o",
  "fa-bicycle",
  "fa-binoculars",
  "fa-birthday-cake",
  "fa-bitbucket",
  "fa-bitbucket-square",
  "fa-bitcoin",
  "fa-black-tie",
  "fa-blind",
  "fa-bluetooth",
  "fa-bluetooth-b",
  "fa-bold",
  "fa-bolt",
  "fa-bomb",
  "fa-book",
  "fa-bookmark",
  "fa-bookmark-o",
  "fa-braille",
  "fa-briefcase",
  "fa-btc",
  "fa-bug",
  "fa-building",
  "fa-building-o",
  "fa-bullhorn",
  "fa-bullseye",
  "fa-bus",
  "fa-buysellads",
  "fa-cab",
  "fa-calculator",
  "fa-calendar",
  "fa-calendar-check-o",
  "fa-calendar-minus-o",
  "fa-calendar-o",
  "fa-calendar-plus-o",
  "fa-calendar-times-o",
  "fa-camera",
  "fa-camera-retro",
  "fa-car",
  "fa-caret-down",
  "fa-caret-left",
  "fa-caret-right",
  "fa-caret-square-o-down",
  "fa-caret-square-o-left",
  "fa-caret-square-o-right",
  "fa-caret-square-o-up",
  "fa-caret-up",
  "fa-cart-arrow-down",
  "fa-cart-plus",
  "fa-cc",
  "fa-cc-amex",
  "fa-cc-diners-club",
  "fa-cc-discover",
  "fa-cc-jcb",
  "fa-cc-mastercard",
  "fa-cc-paypal",
  "fa-cc-stripe",
  "fa-cc-visa",
  "fa-certificate",
  "fa-chain",
  "fa-chain-broken",
  "fa-check",
  "fa-check-circle",
  "fa-check-circle-o",
  "fa-check-square",
  "fa-check-square-o",
  "fa-chevron-circle-down",
  "fa-chevron-circle-left",
  "fa-chevron-circle-right",
  "fa-chevron-circle-up",
  "fa-chevron-down",
  "fa-chevron-left",
  "fa-chevron-right",
  "fa-chevron-up",
  "fa-child",
  "fa-chrome",
  "fa-circle",
  "fa-circle-o",
  "fa-circle-o-notch",
  "fa-circle-thin",
  "fa-clipboard",
  "fa-clock-o",
  "fa-clone",
  "fa-close",
  "fa-cloud",
  "fa-cloud-download",
  "fa-cloud-upload",
  "fa-cny",
  "fa-code",
  "fa-code-fork",
  "fa-codepen",
  "fa-codiepie",
  "fa-coffee",
  "fa-cog",
  "fa-cogs",
  "fa-columns",
  "fa-comment",
  "fa-comment-o",
  "fa-commenting",
  "fa-commenting-o",
  "fa-comments",
  "fa-comments-o",
  "fa-compass",
  "fa-compress",
  "fa-connectdevelop",
  "fa-contao",
  "fa-copy",
  "fa-copyright",
  "fa-creative-commons",
  "fa-credit-card",
  "fa-credit-card-alt",
  "fa-crop",
  "fa-crosshairs",
  "fa-css3",
  "fa-cube",
  "fa-cubes",
  "fa-cut",
  "fa-cutlery",
  "fa-dashboard",
  "fa-dashcube",
  "fa-database",
  "fa-deaf",
  "fa-deafness",
  "fa-dedent",
  "fa-delicious",
  "fa-desktop",
  "fa-deviantart",
  "fa-diamond",
  "fa-digg",
  "fa-dollar",
  "fa-dot-circle-o",
  "fa-download",
  "fa-dribbble",
  "fa-drivers-license",
  "fa-drivers-license-o",
  "fa-dropbox",
  "fa-drupal",
  "fa-edge",
  "fa-edit",
  "fa-eercast",
  "fa-eject",
  "fa-ellipsis-h",
  "fa-ellipsis-v",
  "fa-empire",
  "fa-envelope",
  "fa-envelope-o",
  "fa-envelope-open",
  "fa-envelope-open-o",
  "fa-envelope-square",
  "fa-envira",
  "fa-eraser",
  "fa-etsy",
  "fa-eur",
  "fa-euro",
  "fa-exchange",
  "fa-exclamation",
  "fa-exclamation-circle",
  "fa-exclamation-triangle",
  "fa-expand",
  "fa-expeditedssl",
  "fa-external-link",
  "fa-external-link-square",
  "fa-eye",
  "fa-eye-slash",
  "fa-eyedropper",
  "fa-fa",
  "fa-facebook",
  "fa-facebook-f",
  "fa-facebook-official",
  "fa-facebook-square",
  "fa-fast-backward",
  "fa-fast-forward",
  "fa-fax",
  "fa-feed",
  "fa-female",
  "fa-fighter-jet",
  "fa-file",
  "fa-file-archive-o",
  "fa-file-audio-o",
  "fa-file-code-o",
  "fa-file-excel-o",
  "fa-file-image-o",
  "fa-file-movie-o",
  "fa-file-o",
  "fa-file-pdf-o",
  "fa-file-photo-o",
  "fa-file-picture-o",
  "fa-file-powerpoint-o",
  "fa-file-sound-o",
  "fa-file-text",
  "fa-file-text-o",
  "fa-file-video-o",
  "fa-file-word-o",
  "fa-file-zip-o",
  "fa-files-o",
  "fa-film",
  "fa-filter",
  "fa-fire",
  "fa-fire-extinguisher",
  "fa-firefox",
  "fa-first-order",
  "fa-flag",
  "fa-flag-checkered",
  "fa-flag-o",
  "fa-flash",
  "fa-flask",
  "fa-flickr",
  "fa-floppy-o",
  "fa-folder",
  "fa-folder-o",
  "fa-folder-open",
  "fa-folder-open-o",
  "fa-font",
  "fa-font-awesome",
  "fa-fonticons",
  "fa-fort-awesome",
  "fa-forumbee",
  "fa-forward",
  "fa-foursquare",
  "fa-free-code-camp",
  "fa-frown-o",
  "fa-futbol-o",
  "fa-gamepad",
  "fa-gavel",
  "fa-gbp",
  "fa-ge",
  "fa-gear",
  "fa-gears",
  "fa-genderless",
  "fa-get-pocket",
  "fa-gg",
  "fa-gg-circle",
  "fa-gift",
  "fa-git",
  "fa-git-square",
  "fa-github",
  "fa-github-alt",
  "fa-github-square",
  "fa-gitlab",
  "fa-gittip",
  "fa-glass",
  "fa-glide",
  "fa-glide-g",
  "fa-globe",
  "fa-google",
  "fa-google-plus",
  "fa-google-plus-circle",
  "fa-google-plus-official",
  "fa-google-plus-square",
  "fa-google-wallet",
  "fa-graduation-cap",
  "fa-gratipay",
  "fa-grav",
  "fa-group",
  "fa-h-square",
  "fa-hacker-news",
  "fa-hand-grab-o",
  "fa-hand-lizard-o",
  "fa-hand-o-down",
  "fa-hand-o-left",
  "fa-hand-o-right",
  "fa-hand-o-up",
  "fa-hand-paper-o",
  "fa-hand-peace-o",
  "fa-hand-pointer-o",
  "fa-hand-rock-o",
  "fa-hand-scissors-o",
  "fa-hand-spock-o",
  "fa-hand-stop-o",
  "fa-handshake-o",
  "fa-hard-of-hearing",
  "fa-hashtag",
  "fa-hdd-o",
  "fa-header",
  "fa-headphones",
  "fa-heart",
  "fa-heart-o",
  "fa-heartbeat",
  "fa-history",
  "fa-home",
  "fa-hospital-o",
  "fa-hotel",
  "fa-hourglass",
  "fa-hourglass-1",
  "fa-hourglass-2",
  "fa-hourglass-3",
  "fa-hourglass-end",
  "fa-hourglass-half",
  "fa-hourglass-o",
  "fa-hourglass-start",
  "fa-houzz",
  "fa-html5",
  "fa-i-cursor",
  "fa-id-badge",
  "fa-id-card",
  "fa-id-card-o",
  "fa-ils",
  "fa-image",
  "fa-imdb",
  "fa-inbox",
  "fa-indent",
  "fa-industry",
  "fa-info",
  "fa-info-circle",
  "fa-inr",
  "fa-instagram",
  "fa-institution",
  "fa-internet-explorer",
  "fa-intersex",
  "fa-ioxhost",
  "fa-italic",
  "fa-joomla",
  "fa-jpy",
  "fa-jsfiddle",
  "fa-key",
  "fa-keyboard-o",
  "fa-krw",
  "fa-language",
  "fa-laptop",
  "fa-lastfm",
  "fa-lastfm-square",
  "fa-leaf",
  "fa-leanpub",
  "fa-legal",
  "fa-lemon-o",
  "fa-level-down",
  "fa-level-up",
  "fa-life-bouy",
  "fa-life-buoy",
  "fa-life-ring",
  "fa-life-saver",
  "fa-lightbulb-o",
  "fa-line-chart",
  "fa-link",
  "fa-linkedin",
  "fa-linkedin-square",
  "fa-linode",
  "fa-linux",
  "fa-list",
  "fa-list-alt",
  "fa-list-ol",
  "fa-list-ul",
  "fa-location-arrow",
  "fa-lock",
  "fa-long-arrow-down",
  "fa-long-arrow-left",
  "fa-long-arrow-right",
  "fa-long-arrow-up",
  "fa-low-vision",
  "fa-magic",
  "fa-magnet",
  "fa-mail-forward",
  "fa-mail-reply",
  "fa-mail-reply-all",
  "fa-male",
  "fa-map",
  "fa-map-marker",
  "fa-map-o",
  "fa-map-pin",
  "fa-map-signs",
  "fa-mars",
  "fa-mars-double",
  "fa-mars-stroke",
  "fa-mars-stroke-h",
  "fa-mars-stroke-v",
  "fa-maxcdn",
  "fa-meanpath",
  "fa-medium",
  "fa-medkit",
  "fa-meetup",
  "fa-meh-o",
  "fa-mercury",
  "fa-microchip",
  "fa-microphone",
  "fa-microphone-slash",
  "fa-minus",
  "fa-minus-circle",
  "fa-minus-square",
  "fa-minus-square-o",
  "fa-mixcloud",
  "fa-mobile",
  "fa-mobile-phone",
  "fa-modx",
  "fa-money",
  "fa-moon-o",
  "fa-mortar-board",
  "fa-motorcycle",
  "fa-mouse-pointer",
  "fa-music",
  "fa-navicon",
  "fa-neuter",
  "fa-newspaper-o",
  "fa-object-group",
  "fa-object-ungroup",
  "fa-odnoklassniki",
  "fa-odnoklassniki-square",
  "fa-opencart",
  "fa-openid",
  "fa-opera",
  "fa-optin-monster",
  "fa-outdent",
  "fa-pagelines",
  "fa-paint-brush",
  "fa-paper-plane",
  "fa-paper-plane-o",
  "fa-paperclip",
  "fa-paragraph",
  "fa-paste",
  "fa-pause",
  "fa-pause-circle",
  "fa-pause-circle-o",
  "fa-paw",
  "fa-paypal",
  "fa-pencil",
  "fa-pencil-square",
  "fa-pencil-square-o",
  "fa-percent",
  "fa-phone",
  "fa-phone-square",
  "fa-photo",
  "fa-picture-o",
  "fa-pie-chart",
  "fa-pied-piper",
  "fa-pied-piper-alt",
  "fa-pied-piper-pp",
  "fa-pinterest",
  "fa-pinterest-p",
  "fa-pinterest-square",
  "fa-plane",
  "fa-play",
  "fa-play-circle",
  "fa-play-circle-o",
  "fa-plug",
  "fa-plus",
  "fa-plus-circle",
  "fa-plus-square",
  "fa-plus-square-o",
  "fa-podcast",
  "fa-power-off",
  "fa-print",
  "fa-product-hunt",
  "fa-puzzle-piece",
  "fa-qq",
  "fa-qrcode",
  "fa-question",
  "fa-question-circle",
  "fa-question-circle-o",
  "fa-quora",
  "fa-quote-left",
  "fa-quote-right",
  "fa-ra",
  "fa-random",
  "fa-ravelry",
  "fa-rebel",
  "fa-recycle",
  "fa-reddit",
  "fa-reddit-alien",
  "fa-reddit-square",
  "fa-refresh",
  "fa-registered",
  "fa-remove",
  "fa-renren",
  "fa-reorder",
  "fa-repeat",
  "fa-reply",
  "fa-reply-all",
  "fa-resistance",
  "fa-retweet",
  "fa-rmb",
  "fa-road",
  "fa-rocket",
  "fa-rotate-left",
  "fa-rotate-right",
  "fa-rouble",
  "fa-rss",
  "fa-rss-square",
  "fa-rub",
  "fa-ruble",
  "fa-rupee",
  "fa-s15",
  "fa-safari",
  "fa-save",
  "fa-scissors",
  "fa-scribd",
  "fa-search",
  "fa-search-minus",
  "fa-search-plus",
  "fa-sellsy",
  "fa-send",
  "fa-send-o",
  "fa-server",
  "fa-share",
  "fa-share-alt",
  "fa-share-alt-square",
  "fa-share-square",
  "fa-share-square-o",
  "fa-shekel",
  "fa-sheqel",
  "fa-shield",
  "fa-ship",
  "fa-shirtsinbulk",
  "fa-shopping-bag",
  "fa-shopping-basket",
  "fa-shopping-cart",
  "fa-shower",
  "fa-sign-in",
  "fa-sign-language",
  "fa-sign-out",
  "fa-signal",
  "fa-signing",
  "fa-simplybuilt",
  "fa-sitemap",
  "fa-skyatlas",
  "fa-skype",
  "fa-slack",
  "fa-sliders",
  "fa-slideshare",
  "fa-smile-o",
  "fa-snapchat",
  "fa-snapchat-ghost",
  "fa-snapchat-square",
  "fa-snowflake-o",
  "fa-soccer-ball-o",
  "fa-sort",
  "fa-sort-alpha-asc",
  "fa-sort-alpha-desc",
  "fa-sort-amount-asc",
  "fa-sort-amount-desc",
  "fa-sort-asc",
  "fa-sort-desc",
  "fa-sort-down",
  "fa-sort-numeric-asc",
  "fa-sort-numeric-desc",
  "fa-sort-up",
  "fa-soundcloud",
  "fa-space-shuttle",
  "fa-spinner",
  "fa-spoon",
  "fa-spotify",
  "fa-square",
  "fa-square-o",
  "fa-stack-exchange",
  "fa-stack-overflow",
  "fa-star",
  "fa-star-half",
  "fa-star-half-empty",
  "fa-star-half-full",
  "fa-star-half-o",
  "fa-star-o",
  "fa-steam",
  "fa-steam-square",
  "fa-step-backward",
  "fa-step-forward",
  "fa-stethoscope",
  "fa-sticky-note",
  "fa-sticky-note-o",
  "fa-stop",
  "fa-stop-circle",
  "fa-stop-circle-o",
  "fa-street-view",
  "fa-strikethrough",
  "fa-stumbleupon",
  "fa-stumbleupon-circle",
  "fa-subscript",
  "fa-subway",
  "fa-suitcase",
  "fa-sun-o",
  "fa-superpowers",
  "fa-superscript",
  "fa-support",
  "fa-table",
  "fa-tablet",
  "fa-tachometer",
  "fa-tag",
  "fa-tags",
  "fa-tasks",
  "fa-taxi",
  "fa-telegram",
  "fa-television",
  "fa-tencent-weibo",
  "fa-terminal",
  "fa-text-height",
  "fa-text-width",
  "fa-th",
  "fa-th-large",
  "fa-th-list",
  "fa-themeisle",
  "fa-thermometer",
  "fa-thermometer-0",
  "fa-thermometer-1",
  "fa-thermometer-2",
  "fa-thermometer-3",
  "fa-thermometer-4",
  "fa-thermometer-empty",
  "fa-thermometer-full",
  "fa-thermometer-half",
  "fa-thermometer-quarter",
  "fa-thermometer-three-quarters",
  "fa-thumb-tack",
  "fa-thumbs-down",
  "fa-thumbs-o-down",
  "fa-thumbs-o-up",
  "fa-thumbs-up",
  "fa-ticket",
  "fa-times",
  "fa-times-circle",
  "fa-times-circle-o",
  "fa-times-rectangle",
  "fa-times-rectangle-o",
  "fa-tint",
  "fa-toggle-down",
  "fa-toggle-left",
  "fa-toggle-off",
  "fa-toggle-on",
  "fa-toggle-right",
  "fa-toggle-up",
  "fa-trademark",
  "fa-train",
  "fa-transgender",
  "fa-transgender-alt",
  "fa-trash",
  "fa-trash-o",
  "fa-tree",
  "fa-trello",
  "fa-tripadvisor",
  "fa-trophy",
  "fa-truck",
  "fa-try",
  "fa-tty",
  "fa-tumblr",
  "fa-tumblr-square",
  "fa-turkish-lira",
  "fa-tv",
  "fa-twitch",
  "fa-twitter",
  "fa-twitter-square",
  "fa-umbrella",
  "fa-underline",
  "fa-undo",
  "fa-universal-access",
  "fa-university",
  "fa-unlink",
  "fa-unlock",
  "fa-unlock-alt",
  "fa-unsorted",
  "fa-upload",
  "fa-usb",
  "fa-usd",
  "fa-user",
  "fa-user-circle",
  "fa-user-circle-o",
  "fa-user-md",
  "fa-user-o",
  "fa-user-plus",
  "fa-user-secret",
  "fa-user-times",
  "fa-users",
  "fa-vcard",
  "fa-vcard-o",
  "fa-venus",
  "fa-venus-double",
  "fa-venus-mars",
  "fa-viacoin",
  "fa-video",
  "fa-video-square",
  "fa-video-camera",
  "fa-vimeo",
  "fa-vimeo-square",
  "fa-vine",
  "fa-vk",
  "fa-volume-control-phone",
  "fa-volume-down",
  "fa-volume-off",
  "fa-volume-up",
  "fa-warning",
  "fa-wechat",
  "fa-weibo",
  "fa-weixin",
  "fa-whatsapp",
  "fa-wheelchair",
  "fa-wheelchair-alt",
  "fa-wifi",
  "fa-wikipedia-w",
  "fa-window-close",
  "fa-window-close-o",
  "fa-window-maximize",
  "fa-window-minimize",
  "fa-window-restore",
  "fa-windows",
  "fa-won",
  "fa-wordpress",
  "fa-wpbeginner",
  "fa-wpexplorer",
  "fa-wpforms",
  "fa-wrench",
  "fa-xing",
  "fa-xing-square",
  "fa-y-combinator",
  "fa-y-combinator-square",
  "fa-yahoo",
  "fa-yc",
  "fa-yc-square",
  "fa-yelp",
  "fa-yen",
  "fa-yoast",
  "fa-youtube",
  "fa-youtube-play",
  "fa-youtube-square"
];
function Ph(e) {
  return H(() => {
    eg(), e = G(e);
    const t = D(e.Class) ?? "", n = re(e.Style);
    let o = z(e.Value, (f) => he(f, Ya)) ?? "fa-question-circle-o", r = St(e.Color) ?? "black";
    const a = Mn(e.Label), i = Y(e.active) ?? !1, s = Y(e.disabled) ?? !1, l = R(e.onClick), { isInteractive: d, _onClick: u, _onKeyDown: p, Cursor: c } = Xl("FAIcon", s, l);
    return b`<div
        class="jcl-component fa-icon fa ${o} ${s ? "disabled" : ""} ${i ? "active" : ""} ${t}"
        role=${d ? "button" : void 0}
        tabIndex=${d ? s ? -1 : 0 : void 0}
        aria-label=${a}
        aria-disabled=${d && s ? "true" : void 0}
        style="${n}; color:${r}; cursor:${c};"
        onClick=${u}
        onKeyDown=${d ? p : void 0}
        ...${e.RestProps}
      />`;
  });
}
const eg = /* @__PURE__ */ Z("jcl-component.fa-icon", `
    .jcl-component.fa-icon {
      width:24px !important; height:24px !important;
      font-size:18px; line-height:24px; text-align:center;
      pointer-events:auto;
    }
  `);
function tg(e) {
  return H(() => {
    ng(), e = G(e);
    const t = D(e.Class) ?? "", n = re(e.Value), o = e.children;
    return n == null ? b`<button class="jcl-component native-button ${t}" ...${e.RestProps}>
          ${o}
        </>` : b`<button class="jcl-component native-button ${t}" ...${e.RestProps}
          dangerouslySetInnerHTML=${{ __html: n }}
        />`;
  });
}
const ng = /* @__PURE__ */ Z("jcl-component.native-button", `
    .jcl-component.native-button {
      height:30px;
      border:solid 1px black; border-radius:4px;
      background:white;
      font-weight:bold; color:black;
      cursor:pointer; pointer-events:auto;
    }
    .jcl-component.native-button:disabled {
      cursor:not-allowed;
    }
  `);
function og(e) {
  return H(() => {
    rg(), e = G(e);
    const t = D(e.Class) ?? "", n = re(e.Style);
    let o = z(e.Value, (c) => rn(c) || Je(c));
    const r = Y(e.disabled), a = R(e.onValueInput), i = R(e.onClick);
    o = o ?? yt;
    const { actualValue: s, actualDisabling: l } = it(o, r), d = s == !0, u = s == null || Je(o), p = ie((c) => {
      if (Le(c, l), l == !0)
        return;
      E('nativeCheckbox callback "onClick"', i, c);
      const f = c.target.checked;
      E(
        'nativeCheckbox callback "onValueInput"',
        a,
        f,
        c
      );
    }, [l, i, a]);
    return b`<div class="jcl-component native-checkbox ${l ? "disabled" : ""} ${t}"
        style=${n}
      >
        <input type="checkbox"
          checked=${d} indeterminate=${u}
          disabled=${l} onClick=${p} ...${e.RestProps}
        />
      </>`;
  });
}
const rg = /* @__PURE__ */ Z("jcl-component.native-checkbox", `
    .jcl-component.native-checkbox {
      height:30px;
      min-width:20px; min-height:20px;
    }
    .jcl-component.native-checkbox > input {
      position:absolute;
      left:50%; top:50%;
      transform:translate(-50%,-50%);
      margin:0px; padding:0px;
    }
    .jcl-component.native-checkbox > input:disabled {
      cursor:not-allowed;
    }
  `);
function ag(e) {
  return H(() => {
    ig(), e = G(e);
    const t = D(e.Class) ?? "", n = re(e.Style);
    let o = z(e.Value, (p) => rn(p) || Je(p));
    const r = Y(e.disabled), a = R(e.onValueInput), i = R(e.onClick);
    o = o ?? yt;
    const { actualValue: s, actualDisabling: l } = it(o, r), d = s == !0, u = ie((p) => {
      if (Le(p, l), l == !0)
        return;
      E('nativeRadiobutton callback "onClick"', i, p);
      const c = p.target.checked;
      E(
        'nativeRadiobutton callback "onValueInput"',
        a,
        c,
        p
      );
    }, [l, i, a]);
    return b`<div class="jcl-component native-radiobutton ${l ? "disabled" : ""} ${t}"
        style=${n}
      >
        <input type="radio" checked=${d} disabled=${l} onClick=${u} ...${e.RestProps}/>
      </>`;
  });
}
const ig = /* @__PURE__ */ Z("jcl-component.native-radiobutton", `
    .jcl-component.native-radiobutton {
      height:30px;
      min-width:20px; min-height:20px;
    }
    .jcl-component.native-radiobutton > input {
      position:absolute;
      left:50%; top:50%;
      transform:translate(-50%,-50%);
      margin:0px; padding:0px;
    }
    .jcl-component.native-radiobutton > input:disabled {
      cursor:not-allowed;
    }
  `);
function sg(e) {
  return H(() => {
    lg(), e = G(e);
    const t = D(e.Class) ?? "", n = re(e.Style), o = qe(e.Value), r = qe(e.Min ?? e.Minimum), a = qe(e.Low ?? e.lowerBound), i = qe(e.Opt ?? e.Optimum), s = qe(e.High ?? e.upperBound), l = qe(e.Max ?? e.Maximum);
    return b`<div class="jcl-component native-gauge ${t}" style=${n}>
        <meter
          value=${o} min=${r} low=${a} opt=${i}
          high=${s} max=${l} ...${e.RestProps}
        />
      </>`;
  });
}
const lg = /* @__PURE__ */ Z("jcl-component.native-gauge", `
    .jcl-component.native-gauge {
      height:30px;
      min-width:40px; min-height:20px;
    }
    .jcl-component.native-gauge > meter {
      position:absolute;
      left:50%; top:50%; width:100%; height:16px;
      transform:translate(-50%,-50%);
      margin:0px; padding:0px;
    }
  `);
function cg(e) {
  return H(() => {
    dg(), e = G(e);
    const t = D(e.Class) ?? "", n = re(e.Style), o = qe(e.Value), r = qe(e.Max ?? e.Maximum);
    return b`<div class="jcl-component native-progressbar ${t}" style=${n}>
        <progress value=${o} max=${r} ...${e.RestProps}/>
      </>`;
  });
}
const dg = /* @__PURE__ */ Z("jcl-component.native-progressbar", `
    .jcl-component.native-progressbar {
      height:30px;
      min-width:40px; min-height:20px;
    }
    .jcl-component.native-progressbar > progress {
      position:absolute;
      left:50%; top:50%; width:100%; height:16px;
      transform:translate(-50%,-50%);
      margin:0px; padding:0px;
    }
    .jcl-component.native-progressbar > progress::-webkit-progress-bar {
      background-color:#EEEEEE;
      border:solid 1px #E0E0E0; border-radius:2px;
    }
    .jcl-component.native-progressbar > progress::-webkit-progress-value,
    .jcl-component.native-progressbar > progress::-moz-progress-bar {
      background-color:dodgerblue;
      border:none; border-radius:2px;
    }
  `);
function ug(e) {
  return H(() => {
    pg(), e = G(e);
    const t = D(e.Class) ?? "", n = re(e.Style), o = z(e.Value, (j) => bt(j) || Je(j)), r = qe(e.Min ?? e.Minimum), a = z(e.Step, (j) => Io(j, 0, 1 / 0, !1, !1)), i = qe(e.Max ?? e.Maximum), s = z(e.Hashmarks, (j) => Ie(j, Ne)), l = Y(e.disabled) ?? !1, d = R(e.onValueInput), u = R(e.onInput), p = R(e.onBlur), { ViewRef: c, shownValue: f, ValueToShow: h } = yn(
      Je(o) || o != null && !isNaN(o) ? o : yt
    ), { actualValue: g, actualDisabling: y } = it(h, l), { _onInput: m, _onBlur: v } = xn({
      Name: "nativeSlider",
      actualDisabling: y,
      shownValue: f,
      onInput: u,
      onValueInput: d,
      onBlur: p,
      processedInput: (j) => f.current = parseFloat(j.target.value)
    }), { SuggestionId: C, SuggestionList: _ } = vn(
      s,
      (j) => {
        const { Value: x, Label: w } = At(j);
        return b`<option value=${x}>${w}</option>`;
      }
    );
    return b`<div class="jcl-component native-slider ${t}" style=${n}>
        <input type="range" ref=${c} disabled=${y}
          value=${g} min=${r} max=${i} step=${a}
          list=${C}
          onInput=${m} onBlur=${v} ...${e.RestProps}
        />${_}
      </>`;
  });
}
const pg = /* @__PURE__ */ Z("jcl-component.native-slider", `
    .jcl-component.native-slider {
      height:30px;
      min-width:40px; min-height:20px;
    }
    .jcl-component.native-slider > input {
      position:absolute;
      left:50%; top:50%; width:100%;
      transform:translate(-50%,-50%);
      margin:0px; padding:0px;
    }
    .jcl-component.native-slider > input:disabled {
      cursor:not-allowed;
    }
  `);
function Tt(e) {
  const {
    Name: t,
    InputType: n,
    ClassName: o,
    ValueIsValid: r,
    withSpellChecking: a = !1,
    withMultiple: i = !1,
    withSuggestions: s = !0,
    Styled: l = !1
  } = e;
  return function(u) {
    return H(() => {
      (l ? On : Ja)(), u = G(u);
      const p = D(u.Class) ?? "", c = z(u.Value, (ue) => r(ue) || Je(ue)), f = i ? Y(u.multiple) : void 0, h = Y(u.invalid), g = D(u.Placeholder), y = Y(u.readonly), m = $e(u.minLength), v = $e(u.maxLength), C = D(u.Pattern), _ = a ? Y(u.SpellCheck) : void 0, j = s ? z(u.Suggestions, (ue) => Ie(ue, r)) : void 0, x = l ? z(u.Size, (ue) => he(ue, ["small", "normal", "large"])) ?? "normal" : void 0, w = Y(u.disabled) ?? !1, T = R(u.onValueInput), L = R(u.onInput), $ = R(u.onBlur), { ViewRef: I, shownValue: M, ValueToShow: S } = yn(c), { actualValue: F, actualPlaceholder: N, actualDisabling: X } = it(S, w, g), { _onInput: Q, _onBlur: pe } = xn({
        Name: t,
        actualDisabling: X,
        shownValue: M,
        onInput: L,
        onValueInput: T,
        onBlur: $
      }), { SuggestionId: q, SuggestionList: J } = vn(j), P = l ? `jcl-component styled-input ${o} ${ut(x)}` : `jcl-component native-textual-input ${o}`;
      return b`<input type=${n} class="${P} ${p} ${h ? "invalid" : ""}" ref=${I}
          value=${F} minlength=${m} maxlength=${v}
          multiple=${f} readOnly=${y} placeholder=${N}
          pattern=${C} spellcheck=${_}
          disabled=${X} list=${q}
          aria-invalid=${l && h == !0 ? "true" : void 0}
          onInput=${Q} onBlur=${pe} ...${u.RestProps}
        />${J}`;
    });
  };
}
function Zt(e) {
  const { Name: t, InputType: n, ClassName: o, ValueIsValid: r, Pattern: a, Styled: i = !1 } = e, s = a == null;
  return function(d) {
    return H(() => {
      (i ? On : Ja)(), d = G(d);
      const u = D(d.Class) ?? "", p = z(d.Value, (X) => r(X) || Je(X)), c = Y(d.readonly), f = s ? Y(d.withSeconds) : void 0, h = z(d.Min ?? d.Minimum, r), g = z(d.Max ?? d.Maximum, r), y = z(d.Suggestions, (X) => Ie(X, r)), m = i ? z(d.Size, (X) => he(X, ["small", "normal", "large"])) ?? "normal" : void 0, v = Y(d.disabled) ?? !1, C = R(d.onValueInput), _ = R(d.onInput), j = R(d.onBlur), { ViewRef: x, shownValue: w, ValueToShow: T } = yn(p), { actualValue: L, actualDisabling: $ } = it(T, v), { _onInput: I, _onBlur: M } = xn({
        Name: t,
        actualDisabling: $,
        shownValue: w,
        onInput: _,
        onValueInput: C,
        onBlur: j
      }), { SuggestionId: S, SuggestionList: F } = vn(y), N = i ? `jcl-component styled-input ${o} ${ut(m)}` : `jcl-component native-temporal-input ${o}`;
      return b`<input type=${n} class="${N} ${u}" ref=${x}
          value=${L} min=${h} max=${g}
          step=${s ? f ? 1 : 60 : void 0} pattern=${a}
          readOnly=${c}
          disabled=${$} list=${S}
          onInput=${I} onBlur=${M} ...${d.RestProps}
        />${F}`;
    });
  };
}
const Ja = /* @__PURE__ */ Z("jcl-component.native-textual-input", `
    .jcl-component.native-textual-input,
    .jcl-component.native-temporal-input {
      height:30px;
      border:solid 1px #888888; border-radius:2px;
      background:#e8f0ff;
      padding:0px 2px 0px 2px;
      line-height:28px;
    }

    .jcl-component.native-textual-input:invalid,
    .jcl-component.native-textual-input.invalid {
      text-decoration:underline wavy red 1px;
    }

    .jcl-component.native-textual-input:read-only,
    .jcl-component.native-temporal-input:read-only {
      border:solid 1px #DDDDDD; border-radius:2px;
      background:#F0F0F0;
    }

    .jcl-component.native-textual-input:disabled,
    .jcl-component.native-temporal-input:disabled {
      cursor:not-allowed;
    }
  `), fg = /* @__PURE__ */ Tt({
  Name: "nativeTextlineInput",
  InputType: "text",
  ClassName: "native-textline-input",
  ValueIsValid: Ne,
  withSpellChecking: !0
}), hg = /* @__PURE__ */ Tt({
  Name: "nativePasswordInput",
  InputType: "password",
  ClassName: "native-password-input",
  ValueIsValid: Ne,
  withSuggestions: !1
});
function gg(e) {
  return H(() => {
    Ja(), e = G(e);
    const t = D(e.Class) ?? "", n = z(e.Value, (I) => bt(I) || Je(I)), o = Y(e.invalid), r = D(e.Placeholder), a = Y(e.readonly), i = qe(e.Min ?? e.Minimum), s = z(e.Step, (I) => Io(I, 0, 1 / 0, !1, !1)), l = qe(e.Max ?? e.Maximum), d = fr(e.Digits, 0, 15), u = Y(e.withoutTrailingZeros) ?? !1, p = z(e.Suggestions, (I) => Ie(I, bt)), c = Y(e.disabled) ?? !1, f = R(e.onValueInput), h = R(e.onInput), g = R(e.onBlur);
    let y = s;
    if (d != null) {
      const I = Math.pow(10, -d);
      y = Math.max(s ?? I, I);
    }
    const { ViewRef: m, shownValue: v, ValueToShow: C } = yn(
      Je(n) || n != null && !isNaN(n) ? n : yt,
      (I) => (d != null && bt(I) && (I = I.toFixed(d), u && (I = parseFloat(I))), I)
    ), { actualValue: _, actualPlaceholder: j, actualDisabling: x } = it(C, c, r), { _onInput: w, _onBlur: T } = xn({
      Name: "nativeNumberInput",
      actualDisabling: x,
      shownValue: v,
      onInput: h,
      onValueInput: f,
      onBlur: g,
      processedInput: (I) => {
        const M = parseFloat(I.target.value);
        return v.current = isNaN(M) ? void 0 : M, v.current;
      }
    }), { SuggestionId: L, SuggestionList: $ } = vn(p);
    return b`<input type="number" ref=${m}
        class="jcl-component native-textual-input native-number-input ${t} ${o ? "invalid" : ""}"
        value=${_} min=${i} max=${l} step=${y}
        readOnly=${a} placeholder=${j}
        disabled=${x} list=${L}
        onInput=${w} onBlur=${T} ...${e.RestProps}
      />${$}`;
  });
}
const mg = /* @__PURE__ */ Tt({
  Name: "nativeEMailAddressInput",
  InputType: "email",
  ClassName: "native-emailaddress-input",
  ValueIsValid: Ln,
  withMultiple: !0
}), bg = /* @__PURE__ */ Tt({
  Name: "nativePhoneNumberInput",
  InputType: "tel",
  ClassName: "native-phonenumber-input",
  ValueIsValid: kr
}), yg = /* @__PURE__ */ Tt({
  Name: "nativeURLInput",
  InputType: "url",
  ClassName: "native-url-input",
  ValueIsValid: st
}), xg = "([01]\\d|2[0-3]):[0-5]\\d(:[0-5]\\d)?", vg = /* @__PURE__ */ Qn(xg);
function Yl(e) {
  return Ct(e, vg);
}
const wg = /* @__PURE__ */ Zt({
  Name: "nativeTimeInput",
  InputType: "time",
  ClassName: "native-time-input",
  ValueIsValid: Yl
}), kg = "\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01])T([01]\\d|2[0-3]):[0-5]\\d(:[0-5]\\d)?", Cg = /* @__PURE__ */ Qn(kg);
function Jl(e) {
  return Ct(e, Cg);
}
const $g = /* @__PURE__ */ Zt({
  Name: "nativeDateTimeInput",
  InputType: "datetime-local",
  ClassName: "native-datetime-input",
  ValueIsValid: Jl
}), Za = "\\d{4}-\\d{2}-\\d{2}", jg = /* @__PURE__ */ Qn(Za);
function zt(e) {
  return Ct(e, jg);
}
const Ig = /* @__PURE__ */ Zt({
  Name: "nativeDateInput",
  InputType: "date",
  ClassName: "native-date-input",
  ValueIsValid: zt,
  Pattern: Za
}), Qa = "\\d{4}-W\\d{2}", _g = /* @__PURE__ */ Qn(Qa);
function Zl(e) {
  return Ct(e, _g);
}
const Sg = /* @__PURE__ */ Zt({
  Name: "nativeWeekInput",
  InputType: "week",
  ClassName: "native-week-input",
  ValueIsValid: Zl,
  Pattern: Qa
}), Pa = "\\d{4}-\\d{2}", Dg = /* @__PURE__ */ Qn(Pa);
function ei(e) {
  return Ct(e, Dg);
}
const Lg = /* @__PURE__ */ Zt({
  Name: "nativeMonthInput",
  InputType: "month",
  ClassName: "native-month-input",
  ValueIsValid: ei,
  Pattern: Pa
}), Mg = /* @__PURE__ */ Tt({
  Name: "nativeSearchInput",
  InputType: "search",
  ClassName: "native-search-input",
  ValueIsValid: Ne,
  withSpellChecking: !0
});
function Ag(e) {
  return H(() => {
    Tg(), e = G(e);
    const t = D(e.Class) ?? "", n = re(e.Style), o = z(e.Value, (g) => Ne(g) || Je(g)), r = D(e.Placeholder), a = Y(e.multiple), i = D(e.Accept), s = Y(e.disabled) ?? !1, l = R(e.onValueInput), d = R(e.onInput), u = o ?? yt, { actualValue: p, actualPlaceholder: c, actualDisabling: f } = it(u, s, r), h = ie((g) => {
      if (Le(g), f == !0)
        return;
      E('nativeFileInput callback "onInput"', d, g);
      let y = Array.from(g.target.files);
      E(
        'nativeFileInput callback "onValueInput"',
        l,
        y,
        g
      ), g.target.value = "";
    }, [f, d, l]);
    return b`<label class="jcl-component native-file-input ${t} ${f ? "disabled" : ""}"
        style=${n}
      >
        ${p == null ? b`<span>${c ?? ""}</span>` : b`<span>${p}</span>`}
        <input type="file" style="display:none"
          multiple=${a} accept=${i}
          disabled=${f} onInput=${h} ...${e.RestProps}
        />
      </label>`;
  });
}
const Tg = /* @__PURE__ */ Z("jcl-component.native-file-input", `
    .jcl-component.native-file-input {
      display:inline-block;
      height:30px;
        min-width:60px;
      border:solid 1px #888888; border-radius:2px;
      background:#e8f0ff;
      padding:0px 2px 0px 2px;
      line-height:28px;
      overflow:hidden;
    }
    .jcl-component.native-file-input > span {
      display:inline-block; width:100%;
      white-space:nowrap; overflow:hidden; text-overflow:ellipsis;
    }

    .jcl-component.native-file-input.disabled {
      border:solid 1px #DDDDDD;
      background:#F0F0F0;
      color:#808080;
      cursor:not-allowed;
    }
  `);
function Rg(e) {
  return H(() => {
    Fg(), e = G(e);
    const t = D(e.Class) ?? "", n = re(e.Style), o = z(e.Value, (g) => Dn(g) || Je(g)), r = Y(e.readonly), a = z(e.Suggestions, (g) => Ie(g, Dn));
    let i = $e(e.minWidth);
    const s = Y(e.disabled) ?? !1, l = R(e.onValueInput), d = R(e.onInput), { actualValue: u, actualDisabling: p } = it(o, s), c = ie((g) => {
      if (Le(g), p == !0)
        return;
      E('nativeColorInput callback "onInput"', d, g);
      const y = g.target.value;
      E(
        'nativeColorInput callback "onValueInput"',
        l,
        y,
        g
      );
    }, [p, d, l]), { SuggestionId: f, SuggestionList: h } = vn(a);
    return i == null && (i = 40 + (a != null && a.length > 0 ? 20 : 0)), b`<input type="color" class="jcl-component native-color-input ${t}"
        style="min-width:${i}px; ${n}"
        value=${u} list=${f}
        disabled=${p} onInput=${c} ...${e.RestProps}
      />${h}`;
  });
}
const Fg = /* @__PURE__ */ Z("jcl-component.native-color-input", `
    .jcl-component.native-color-input {
      height:30px;
        min-width:40px;
      border:solid 1px #888888; border-radius:2px;
      background:#e8f0ff;
      padding:0px 2px 0px 2px;
    }

    .jcl-component.native-color-input:read-only {
      border:solid 1px #DDDDDD; border-radius:2px;
      background:#F0F0F0;
    }

    .jcl-component.native-color-input:disabled {
      cursor:not-allowed;
    }
  `);
function Og(e) {
  return H(() => {
    zg(), e = G(e);
    const t = D(e.Class) ?? "", n = z(e.Value, (h) => Ne(h) || Je(h)), o = D(e.Placeholder), r = z(e.Options, (h) => Ie(h, Ne)) ?? Me("Options"), a = Y(e.disabled) ?? !1, i = R(e.onValueInput), s = R(e.onInput), { actualValue: l, actualPlaceholder: d, actualDisabling: u } = it(n, a, o), p = ie((h) => {
      if (Le(h), u == !0)
        return;
      E('nativeDropDown callback "onInput"', s, h);
      let g = h.target.value;
      E(
        'nativeDropDown callback "onValueInput"',
        i,
        g,
        h
      );
    }, [u, s, i]), f = !r.some((h) => {
      const { Value: g, isRuler: y } = At(h);
      return !y && g === l;
    }) && d != null;
    return b`<select class="jcl-component native-dropdown ${t}"
        disabled=${u} onInput=${p} ...${e.RestProps}
      >${f ? b`<option value="" selected disabled>${d}</option>` : ""}${r.map(
      (h) => {
        const {
          Value: g,
          Label: y,
          disabled: m,
          isRuler: v
        } = At(h);
        return v ? b`<hr/>` : b`<option value=${g}
                selected=${g === l} disabled=${m}
              >${y}</option>`;
      }
    )}</select>`;
  });
}
const zg = /* @__PURE__ */ Z("jcl-component.native-dropdown", `
    .jcl-component.native-dropdown {
      height:30px;
        min-width:30px;
      border:solid 1px #888888; border-radius:2px;
      background:#e8f0ff;
      padding:0px 2px 0px 2px;
      line-height:28px;
    }

    .jcl-component.native-dropdown:disabled {
      cursor:not-allowed;
    }
  `);
function ti(e) {
  return H(() => {
    Ng(), e = G(e);
    const t = D(e.Class) ?? "", n = re(e.Style), o = z(e.Value, (L) => Mo(L) || Je(L)), r = Y(e.invalid), a = D(e.Placeholder), i = Y(e.readonly), s = $e(e.minLength), l = $e(e.maxLength), d = Y(e.wrap), u = z(e.Resizability, (L) => he(L, ["none", "horizontal", "vertical", "both"])), p = Y(e.SpellCheck), c = Y(e.disabled) ?? !1, f = R(e.onValueInput), h = R(e.onInput), g = R(e.onBlur), { ViewRef: y, shownValue: m, ValueToShow: v } = yn(o), { actualValue: C, actualPlaceholder: _, actualDisabling: j } = it(v, c, a), { _onInput: x, _onBlur: w } = xn({
      Name: "nativeTextInput",
      actualDisabling: j,
      shownValue: m,
      onInput: h,
      onValueInput: f,
      onBlur: g
    }), T = Vt();
    return b`<textarea class="jcl-component native-text-input ${t} ${r ? "invalid" : ""}"
        key=${T} ref=${y}
        style="${d == !0 ? "overflow-wrap:break-word; hyphens:auto;" : "white-space:pre;"} resize:${u ?? "none"}; ${n}"
        value=${C} minlength=${s} maxlength=${l}
        readOnly=${i} placeholder=${_}
        spellcheck=${p} disabled=${j}
        onInput=${x} onBlur=${w} ...${e.RestProps}
      />`;
  });
}
const Ng = /* @__PURE__ */ Z("jcl-component.native-text-input", `
    .jcl-component.native-text-input {
      resize:none;
      border:solid 1px #888888; border-radius:2px;
      background:#e8f0ff;
      padding:4px 2px 0px 2px;
    }

    .jcl-component.native-text-input:invalid, .jcl-component.native-text-input.invalid {
      text-decoration:underline wavy red 1px;
    }

    .jcl-component.native-text-input:read-only {
      border:solid 1px #DDDDDD; border-radius:2px;
      background:#F0F0F0;
    }

    .jcl-component.native-text-input:disabled {
      cursor:not-allowed;
    }
  `);
function Eg(e) {
  return H(() => {
    Vg(), e = G(e);
    const t = D(e.Class) ?? "", n = re(e.Style), o = Fn(e.Icon) ?? Me("Icon"), r = St(e.Color), a = Y(e.multiple), i = D(e.Accept), s = Y(e.disabled) ?? !1, l = R(e.onValueInput), d = R(e.onInput), u = ie((p) => {
      if (Le(p), s == !0)
        return;
      E('nativePseudoFileInput callback "onInput"', d, p);
      let c = Array.from(p.target.files);
      E(
        'nativePseudoFileInput callback "onValueInput"',
        l,
        c,
        p
      ), p.target.value = "";
    }, [s, d, l]);
    return b`<label
        class="jcl-component legacy-pseudo-file-input ${s ? "disabled" : ""} ${t}"
        style=${n}
      >
        <div style="
          -webkit-mask-image:url(${o}); mask-image:url(${o});
          background-color:${r ?? "black"};
        "/>
        <input type="file" style="display:none"
          multiple=${a} accept=${i}
          disabled=${s} onInput=${u} ...${e.RestProps}
        />
      </label>`;
  });
}
const Vg = /* @__PURE__ */ Z("jcl-component.legacy-pseudo-file-input", `
    .jcl-component.legacy-pseudo-file-input {
      display:flex ! important; justify-content:center ! important;
        align-items:center ! important;
      overflow:hidden;
    }
    .jcl-component.legacy-pseudo-file-input > div {
      display:block; position:relative;
      width:24px; height:24px;
      -webkit-mask-size:contain;           mask-size:contain;
      -webkit-mask-position:center center; mask-position:center center;
    }

    .jcl-component.legacy-pseudo-file-input > div.disabled {
      cursor:not-allowed;
    }
  `);
function Bg(e) {
  return H(() => {
    Wg(), e = G(e);
    const t = D(e.Class) ?? "", n = re(e.Style), o = z(e.Value, (h) => Ne(h) || Je(h)), r = Fn(e.Icon) ?? Me("Icon"), a = St(e.Color), i = z(e.Options, (h) => Ie(h, Ne)) ?? Me("Options"), s = Y(e.disabled) ?? !1, l = R(e.onValueInput), d = R(e.onInput), { actualValue: u, actualDisabling: p } = it(o, s), c = ie((h) => {
      if (Le(h), p == !0)
        return;
      E('legacyPseudoDropDown callback "onInput"', d, h);
      let g = h.target.value;
      E(
        'legacyPseudoDropDown callback "onValueInput"',
        l,
        g,
        h
      );
    }, [p, d, l]), f = i.some((h) => {
      const { Value: g, isRuler: y } = At(h);
      return !y && g === u;
    });
    return b`<label
        class="jcl-component legacy-pseudo-dropdown ${s ? "disabled" : ""} ${t}"
        style=${n}
      >
        <div style="
          -webkit-mask-image:url(${r}); mask-image:url(${r});
          background-color:${a ?? "black"};
        "/>
        <select
          disabled=${p} onInput=${c} ...${e.RestProps}
        >${f ? "" : b`<option hidden selected value=""></option>`}${i.map(
      (h) => {
        const {
          Value: g,
          Label: y,
          disabled: m,
          isRuler: v
        } = At(h);
        return v ? b`<hr/>` : b`<option value=${g}
                  selected=${g === u} disabled=${m}
                >${y}</option>`;
      }
    )}</select>
      </label>`;
  });
}
const Wg = /* @__PURE__ */ Z("jcl-component.legacy-pseudo-dropdown", `
    .jcl-component.legacy-pseudo-dropdown {
      display:flex ! important; justify-content:center ! important;
        align-items:center ! important;
      overflow:hidden;
    }
    .jcl-component.legacy-pseudo-dropdown > div {
      display:block; position:relative;
      width:24px; height:24px;
      -webkit-mask-size:contain;           mask-size:contain;
      -webkit-mask-position:center center; mask-position:center center;
    }
    .jcl-component.legacy-pseudo-dropdown > select {
      display:block; position:absolute;
      left:0px; top:0px; right:0px; bottom:0px;
      opacity:0.01;
    }

    .jcl-component.legacy-pseudo-dropdown > select:disabled {
      cursor:not-allowed;
    }
  `);
function Hg(e) {
  return H(() => {
    Gg(), e = G(e);
    const t = D(e.Class) ?? "", n = re(e.Style), o = D(e.Placeholder), r = Y(e.multiple) ?? !1, a = z(e.Accept, (g) => Ie(g, Ne)) ?? [], i = Y(e.disabled) ?? !1, s = R(e.onValueInput), l = R(e.onInput), d = R(e.onDrop), u = (g) => {
      let y = Array.from(g);
      return a.length > 0 && (y = y.filter((m) => a.some((v) => (v = v.trim().toLowerCase(), v.startsWith(".") ? m.name.toLowerCase().endsWith(v) : v.endsWith("/*") ? m.type.toLowerCase().startsWith(v.slice(0, -1)) : m.type.toLowerCase() === v)))), !r && y.length > 1 && (y = y.slice(0, 1)), y;
    }, p = ie((g) => {
      if (Le(g), i == !0)
        return;
      const y = u(g.target.files);
      if (y.length === 0) {
        g.target.value = "";
        return;
      }
      E('legacyFileDropArea callback "onInput"', l, g), E(
        'legacyFileDropArea callback "onValueInput"',
        s,
        y,
        g
      ), g.target.value = "";
    }, [i, r, a, l, s]), c = ie((g) => Le(g), []), f = ie((g) => Le(g), []), h = ie((g) => {
      if (Le(g), i == !0)
        return;
      const y = u(g.dataTransfer.files);
      y.length !== 0 && (E('legacyFileDropArea callback "onDrop"', d, g), E(
        'legacyFileDropArea callback "onValueInput"',
        s,
        y,
        g
      ));
    }, [i, r, a, d, s]);
    return b`<label class="jcl-component legacy-file-drop-area ${t} ${i ? "disabled" : ""}"
        style=${n}
        onDragEnter=${c} onDragOver=${f} onDrop=${h}
      >
        <span>${o ?? ""}</span>
        <input type="file"
          multiple=${r} accept=${a.join(",")}
          disabled=${i} onInput=${p} ...${e.RestProps}
        />
      </label>`;
  });
}
const Gg = /* @__PURE__ */ Z("jcl-component.legacy-file-drop-area", `
    .jcl-component.legacy-file-drop-area {
      display:flex; flex-flow:column nowrap;
        justify-content:center; align-items:center;
      min-width:60px; min-height:40px;
      border:dashed 4px #DDDDDD; border-radius:4px;
      color:#DDDDDD; background:white;
    }

    .jcl-component.legacy-file-drop-area * { pointer-events:none }

    .jcl-component.legacy-file-drop-area > input[type="file"] {
      display:block; position:absolute; appearance:none;
      left:0px; top:0px; right:0px; bottom:0px;
      opacity:0.01;
    }

    .jcl-component.legacy-file-drop-area.disabled {
      cursor:not-allowed;
    }
  `);
function Ug(e) {
  return H(() => {
    Kg(), e = G(e);
    const t = D(e.Class) ?? "";
    let n = $e(e.activeIndex);
    const o = $e(e.GapIndex), r = Y(e.disabled) ?? !1, a = R(e.onActivationChange), i = dt(), s = Ot(n, 0);
    n = s.current;
    const l = ie((p, c) => {
      if (r)
        return wn(c);
      s.current = p, i(), E('TabStrip callback "onActivationChange"', a, p);
    }, [r, a, i]), d = ie((p, c) => {
      (c.key === "Enter" || c.key === " ") && (c.preventDefault(), l(p, c));
    }, [l]), u = Mt(e.children).filter((p) => p?.type != null || typeof p == "number" || typeof p == "string" && p.trim() !== "");
    return b`<div
        class="jcl-component tabstrip ${r ? "disabled" : ""} ${t}"
        role="tablist" aria-disabled=${r ? "true" : void 0}
        ...${e.RestProps}
      >
        ${u.map((p, c) => {
      const f = c === o ? b`<div class="gap"/>` : "", h = c === n;
      return b`${f}<div
            class="${h ? "active" : ""} ${r ? "disabled" : ""} tab"
            role="tab" aria-selected=${h ? "true" : "false"}
            tabIndex=${r || h ? -1 : 0}
            onClick=${h ? void 0 : (g) => l(c, g)}
            onKeyDown=${h ? void 0 : (g) => d(c, g)}
          >${p}</>`;
    })}
      </>`;
  });
}
const Kg = /* @__PURE__ */ Z("jcl-component.tabstrip", `
    .jcl-component.tabstrip {
      display:flex !important; flex-flow:row nowrap !important;
        align-items:center;
      font-size:14px; font-weight:bold;
    }

    .jcl-component.tabstrip > .gap {
      flex:1 0 auto;
    }

    .jcl-component.tabstrip > .tab {
      display:inline-block; position:relative;
      margin:4px 0px 4px 0px;
      border:none; border-bottom:solid 2px transparent;
      cursor:pointer; pointer-events:auto;
    }
    .jcl-component.tabstrip > .tab:not(:first-child) {
      margin-left:20px;
    }
    .jcl-component.tabstrip > .active.tab {
      border-bottom:solid 2px gray;
      cursor:auto;
    }
    .jcl-component.tabstrip > .disabled.tab {
      pointer-events:none;
    }
    .jcl-component.tabstrip > .tab:focus-visible {
      outline:solid 2px #6366f1; border-radius:4px;
    }
    @media (prefers-contrast: more) {
      .jcl-component.tabstrip > .tab:focus-visible { outline:solid 3px currentColor }
    }
  `);
function qg(e) {
  return H(() => {
    Xg(), e = G(e);
    const t = D(e.Class) ?? "", n = D(e.Header) ?? Me("Header");
    let o = Y(e.expanded);
    const r = Y(e.disabled) ?? !1, a = R(e.onExpansionChange), i = dt(), s = Vt(), l = s + "-fold-header", d = s + "-fold-content", u = Ot(o, !1);
    o = u.current;
    const p = ie((f) => {
      if (Le(f), r)
        return;
      const h = !u.current;
      u.current = h, i(), E('AccordionFold callback "onExpansionChange"', a, h);
    }, [r, a, i]), c = ie((f) => {
      (f.key === "Enter" || f.key === " ") && (f.preventDefault(), p(f));
    }, [p]);
    return b`<div
        class="jcl-component accordion-fold ${r ? "disabled" : ""} ${t}"
        ...${e.RestProps}
      >
        <div class="header">
          <div
            class="expander ${o ? "expanded" : "collapsed"}"
            role="button" aria-expanded=${o ? "true" : "false"}
            aria-controls=${d} aria-label=${n}
            aria-disabled=${r ? "true" : void 0}
            tabIndex=${r ? -1 : 0}
            onClick=${p} onKeyDown=${c}
          />
          <div id=${l} class="title">${n}</>
        </>
        ${o ? b`<div
          id=${d} class="content"
          role="region" aria-labelledby=${l}
        >${e.children}</>` : ""}
      </>`;
  });
}
const Xg = /* @__PURE__ */ Z("jcl-component.accordion-fold", `
    .jcl-component.accordion-fold {
      flex:1 0 auto;
      left:0px; top:0px; right:auto; bottom:auto; width:100%; height:auto;
    }

    .jcl-component.accordion-fold > .header {
      display:flex; flex-flow:row nowrap; align-items:center;
      position:relative; left:0px; top:0px; width:100%; height:30px;
      border:none; background:#EEEEEE;
      border-top:   solid 1px #FFFFFF;
      border-bottom:solid 1px #AAAAAA;
      pointer-events:none;
    }
    .jcl-component.accordion-fold > .header > .expander {
      display:inline-block;
      position:relative; width:24px; height:24px;
      margin:3px 4px 3px 2px;
      border:none;
      cursor:pointer;
      user-select:none; pointer-events:auto;
    }
    .jcl-component.accordion-fold > .header > .expander.expanded {
      background:url(${ur}/caret-down.png);
      background-repeat:no-repeat;
      background-size:contain; background-position:center;
    }
    .jcl-component.accordion-fold > .header > .expander.collapsed {
      background:url(${ur}/caret-right.png);
      background-repeat:no-repeat;
      background-size:contain; background-position:center;
    }
    .jcl-component.accordion-fold > .header > .expander:focus-visible {
      outline:solid 2px #6366f1; border-radius:4px;
    }
    .jcl-component.accordion-fold > .header > .title {
      display:inline-block;
      position:relative; width:auto; height:24px;
      margin:3px 4px 3px 4px;
      font-size:14px; font-weight:bold; color:black; line-height:24px;
    }

    .jcl-component.accordion-fold > .content {
      display:inline-block;
      position:relative; width:100%; height:auto;
    }

    @media (prefers-contrast: more) {
      .jcl-component.accordion-fold > .header > .expander:focus-visible {
        outline:solid 3px currentColor;
      }
    }
  `);
function Ql(e, t) {
  return e == null ? [] : e.filter((n) => t.has(n) ? !1 : (t.add(n), !0));
}
let Vr = 0;
const Br = /* @__PURE__ */ new WeakMap();
function ni(e, t, n) {
  return Br.has(e) ? "" + Br.get(e) : (Vr++, Br.set(e, Vr), "" + Vr);
}
function Pl(e, t, n, o = !1, r = "") {
  return typeof e.toHTML == "function" ? b`<div class="default" dangerouslySetInnerHTML=${{ __html: e.toHTML() }}/>` : b`<div class="default">${"" + e}</>`;
}
function ec(e) {
  return H(() => {
    Yg(), e = G(e);
    const t = D(e.Class) ?? "";
    let n = z(e.List, (q) => Ie(q, De)) ?? Me("List");
    const o = D(e.Placeholder), r = R(e.KeyOfListItem) ?? ni, a = R(e.ListItemRenderer) ?? Pl, i = R(e.onListItemClick);
    let s = z(e.selectedItems, (q) => Ie(q, De));
    const l = $e(e.SelectionLimit) ?? 1 / 0, d = R(e.onSelectionChange), u = R(e.onListItemMove), p = z(e.DragMIMEType, wo), c = R(e.SerializeListItems) ?? JSON.stringify, f = R(e.onListItemsDropped), h = z(e.DragEffect, (q) => Oa.includes(q)), g = d != null, y = g && u != null, m = g && p != null, v = y || m, C = /* @__PURE__ */ new Set();
    n.forEach((q) => {
      C.has(q) && ce(
        'InvalidArguments: the given "List" contains double entries'
      ), C.add(q);
    });
    const _ = /* @__PURE__ */ new Set();
    g && (s = Ql(s, _), s.length > l && (s.slice(l).forEach(
      (q) => _.delete(q)
    ), s.length = l));
    const [j, x] = He({
      dragging: !1,
      DropTargetItem: void 0,
      DropMode: void 0
    });
    function w(q) {
      x((J) => ({ ...J, ...q }));
    }
    const T = U([]), L = U(!1), $ = (q) => {
      q.stopImmediatePropagation();
      const J = q.target.Item, P = q.target.Index;
      if (E(
        'FlatListView callback "onListItemClick"',
        i,
        J,
        n,
        P,
        q
      ), g) {
        const ue = q.pointerType !== "mouse" || q.ctrlKey || q.metaKey;
        I(J, n, P, ue);
      }
    }, I = (q, J, P, ue) => {
      if (l === 0)
        return s;
      let ke = s;
      if (ue)
        if (_.has(q))
          ke = s.filter(
            (Ve) => Ve !== q
          );
        else {
          if (s.length === l)
            return s;
          ke = [...s, q];
        }
      else
        ke = [q];
      return E(
        'FlatListView callback "onSelectionChange"',
        d,
        ke,
        J
      ), ke;
    }, M = (q) => {
      const J = q.target.Item, P = q.target.Index;
      let ue = s;
      if (!_.has(J)) {
        const ke = q.ctrlKey || q.metaKey;
        ue = I(J, n, P, ke);
      }
      T.current = ue, L.current = !1, q.dataTransfer.effectAllowed = h ?? (m ? "copyMove" : "move"), m && q.dataTransfer.setData(
        p,
        c(ue)
      ), w({ dragging: !0 });
    }, S = (q) => {
      const J = q.target, P = J.Item;
      if (P != null) {
        if (_.has(P)) {
          j.DropTargetItem != null && w({ DropTargetItem: void 0, DropMode: void 0 });
          return;
        }
        const ke = J.getBoundingClientRect().top + J.offsetHeight / 2, Ve = q.clientY < ke ? "before" : "after";
        q.preventDefault(), (j.DropTargetItem !== P || j.DropMode !== Ve) && w({ DropTargetItem: P, DropMode: Ve });
        return;
      }
      let ue;
      for (let ke = n.length - 1; ke >= 0; ke--)
        if (!_.has(n[ke])) {
          ue = n[ke];
          break;
        }
      if (ue == null) {
        j.DropTargetItem != null && w({ DropTargetItem: void 0, DropMode: void 0 });
        return;
      }
      q.preventDefault(), (j.DropTargetItem !== ue || j.DropMode !== "after") && w({ DropTargetItem: ue, DropMode: "after" });
    }, F = (q) => {
      if (!L.current) {
        const J = q.dataTransfer?.dropEffect ?? "none";
        J !== "none" && m && E(
          'FlatListView callback "onListItemsDropped"',
          f,
          J,
          T.current,
          n
        );
      }
      w({ dragging: !1, DropTargetItem: void 0, DropMode: void 0 });
    }, N = (q) => {
      const { DropTargetItem: J, DropMode: P } = j;
      if (J != null) {
        L.current = !0;
        const ue = n.filter(
          // in original order!
          (Ue) => _.has(Ue)
        ), ke = n.filter(
          (Ue) => !_.has(Ue)
        ), Ve = ke.indexOf(J) + (P === "before" ? 0 : 1);
        ke.splice(Ve, 0, ...ue), n = ke, E(
          'FlatListView callback "onListItemMove"',
          u,
          n,
          ue,
          J,
          P
        ), w({ DropTargetItem: void 0, DropMode: void 0 });
      }
    };
    if (n.length === 0)
      return b`<div
          class="jcl-component flatlistview placeholder ${t}"
          ...${e.RestProps}
        >
          <div dangerouslySetInnerHTML=${{ __html: o ?? "(empty)" }}/>
        </>`;
    const { dragging: X, DropTargetItem: Q, DropMode: pe } = j;
    return b`<div
        class="jcl-component flatlistview ${X ? "dragging" : ""} ${t}"
        role=${g ? "listbox" : "list"}
        aria-multiselectable=${g && l !== 1 ? "true" : void 0}
            onClick=${$}
        onDragStart=${v ? M : void 0}
         onDragOver=${y ? S : void 0}
          onDragEnd=${v ? F : void 0}
             onDrop=${y ? N : void 0}
        ...${e.RestProps}
      >
        ${n.map((q, J) => {
      const P = Xe(
        'FlatListView callback "KeyOfListItem"',
        r,
        q,
        n,
        J
      ), ue = _.has(q), ke = q === Q ? pe : "";
      return b`<div
            class=${"itemview" + (ue ? " selected" : "") + (q === Q ? ` DropTarget ${pe}` : "")}
            role=${g ? "option" : "listitem"}
            aria-selected=${g ? ue ? "true" : "false" : void 0}
            key=${P} draggable=${v}
            ref=${(Ve) => {
        Ve != null && (Ve.Item = q, Ve.Index = J);
      }}
          >
            ${Xe(
        'FlatListView callback "ListItemRenderer"',
        a,
        q,
        n,
        J,
        ue,
        ke
      )}
          </>`;
    })}
      </>`;
  });
}
const Yg = /* @__PURE__ */ Z("jcl-component.flatlistview", `
    .jcl-component.flatlistview {
      display:flex !important; flex-flow:column nowrap !important;
        align-items:stretch !important;
      overflow-x:auto; overflow-y:scroll; overscroll-behavior-y:contain;
      border:solid 1px #888888; border-radius:2px;
      background:#DDDDDD; padding:0px;
    }

    .jcl-component.flatlistview > .itemview {
      display:block; position:relative; overflow:hidden; flex:0 0 auto;
      left:0px; top:0px; width:100%; height:auto; line-height:22px;
      background:white; color:black;
      border:none; border-bottom:solid 1px lightgray;
      padding:2px 4px 2px 4px;
      white-space:nowrap; text-overflow:ellipsis;
      user-select:none; pointer-events:auto;
    }
    .jcl-component.flatlistview > .itemview:last-child {
      border:none; border-bottom:solid 1px transparent;
    }

    .jcl-component.flatlistview > .itemview > .default {
      height:30px; line-height:29px; overflow:hidden; text-overflow:ellipsis;
      padding-left:4px; padding-right:4px;
    }

    .jcl-component.flatlistview > .itemview * {
      pointer-events:none;
    }

    .jcl-component.flatlistview > .itemview.selected {
      background:dodgerblue; color:white;
    }
    .jcl-component.flatlistview.dragging > .itemview.selected {
      opacity:0.3;
    }

    .jcl-component.flatlistview > .itemview.before {
      border-top:solid 20px #DDDDDD;
    }
    .jcl-component.flatlistview > .itemview.after {
      border-bottom:solid 21px #DDDDDD;
    }

    .jcl-component.flatlistview.placeholder {
      display:flex; flex-flow:column nowrap;
      align-items:center !important; justify-content:center;
      flex:1 0 auto; width:100%; height:100%; overflow:hidden;
      background-color:#EEEEEE;
    }
    .jcl-component.flatlistview.placeholder > * {
      display:inline-block; position:relative;
      left:0px; top:0px; right:auto; bottom:auto; width:auto; height:auto;
    }
  `);
function Jg(e) {
  return ni(e);
}
function Zg(e, t = !1, n = !1, o = !1, r = "") {
  return Pl(e);
}
function Qg(e) {
  return H(() => {
    Pg();
    const t = U([]), n = U(() => !0);
    e = G(e);
    const o = D(e.Class) ?? "", r = z(e.List, (K) => Ie(K, De)) ?? Me("List"), a = D(e.Placeholder), i = R(e.KeyOfListItem) ?? Jg, s = R(e.ListItemRenderer) ?? Zg, l = R(e.ContentOfListItem), d = R(e.ContainerOfListItem), u = R(e.onListItemClick), p = R(e.ItemMayBeSelected) ?? n.current;
    let c = z(e.selectedItems, (K) => Ie(K, De));
    const f = $e(e.SelectionLimit) ?? 1 / 0, h = R(e.onSelectionChange), g = R(e.ItemMayBeExpanded) ?? n.current;
    let y = z(e.expandedItems, (K) => Ie(K, De)) ?? t.current;
    const m = R(e.onExpansionChange), v = R(e.ListItemMayAccept) ?? n.current, C = R(e.onListItemMove), _ = z(e.DragMIMEType, wo), j = R(e.SerializeListItems) ?? JSON.stringify, x = R(e.onListItemsDropped), w = z(e.DragEffect, (K) => Oa.includes(K)), T = h != null, L = T && C != null, $ = T && _ != null, I = L || $, M = /* @__PURE__ */ new Set();
    function S(K) {
      K.forEach((ae) => {
        M.has(ae) && ce(
          'InvalidArguments: the given "List" contains double entries'
        ), M.add(ae);
        const me = Xe(
          'NestedListView callback "ContentOfListItem"',
          l,
          ae
        );
        me != null && S(me);
      });
    }
    S(r);
    function F(K, ae) {
      let me = Xe(
        'NestedListView callback "ContainerOfListItem"',
        d,
        ae
      );
      switch (me) {
        case null:
        case void 0:
          return !1;
        case K:
          return !0;
        default:
          return F(K, me);
      }
    }
    const N = /* @__PURE__ */ new Set();
    if (T) {
      c = Ql(c, N);
      for (let K = c.length - 1; K >= 0; K--) {
        const ae = c[K];
        c.some((me, Ge) => Ge !== K && F(me, ae)) && (c.splice(K, 1), N.delete(ae));
      }
      c.length > f && (c.slice(f).forEach(
        (K) => N.delete(K)
      ), c.length = f);
    }
    function X(K) {
      return c.some(
        (ae) => F(ae, K)
      );
    }
    function Q(K) {
      for (let ae = c.length - 1; ae >= 0; ae--) {
        const me = c[ae];
        F(K, me) && (c.splice(ae, 1), N.delete(me));
      }
    }
    function pe(K, ae) {
      if (f === 0)
        return c;
      let me = c;
      if (ae)
        if (N.has(K))
          me = c.filter(
            (Ge) => Ge !== K
          );
        else {
          if (c.length === f)
            return c;
          me = [...c.filter(
            (Ge) => !F(K, Ge)
          ), K];
        }
      else
        me = [K];
      return E(
        'NestedListView callback "onSelectionChange"',
        h,
        me
      ), me;
    }
    const q = Jt(() => {
      const K = /* @__PURE__ */ new Map();
      return y == null ? y = [] : y = y.filter((ae) => K.has(ae) ? !1 : (K.set(ae, "explicit"), !0)), K;
    }, [y]);
    function J(K) {
      q.has(K) ? ue(K) : P(K);
    }
    function P(K) {
      q.set(K, "explicit");
      let ae = [...y, K], me = Xe(
        'NestedListView callback "ContainerOfListItem"',
        d,
        K
      );
      for (; me != null; )
        q.has(me) || (q.set(me, "explicit"), ae.push(me)), me = Xe(
          'NestedListView callback "ContainerOfListItem"',
          d,
          me
        );
      E(
        'NestedListView callback "onExpansionChange"',
        m,
        ae
      );
    }
    function ue(K) {
      q.delete(K);
      const ae = y.filter(
        (me) => me !== K
      );
      E(
        'NestedListView callback "onExpansionChange"',
        m,
        ae
      );
    }
    function ke(K) {
      q.has(K) || q.set(K, "automatic");
      let ae = Xe(
        'NestedListView callback "ContainerOfListItem"',
        d,
        K
      );
      for (; ae != null; )
        q.has(ae) || q.set(ae, "automatic"), ae = Xe(
          'NestedListView callback "ContainerOfListItem"',
          d,
          ae
        );
    }
    function Ve(K) {
      q.get(K) === "automatic" && q.delete(K);
      let ae = Xe(
        'NestedListView callback "ContainerOfListItem"',
        d,
        K
      );
      for (; ae != null; )
        q.get(ae) === "automatic" && q.delete(ae), ae = Xe(
          'NestedListView callback "ContainerOfListItem"',
          d,
          ae
        );
    }
    const Ue = U(/* @__PURE__ */ Object.create(null)), pt = U({
      dragging: !1,
      DropTargetItem: void 0,
      DropMode: void 0,
      DropTargetTimer: void 0
    }), ft = U([]), te = U(!1);
    function ee(K) {
      const ae = K.target.getAttribute("data-key"), me = Ue.current[ae];
      if (me == null)
        return;
      let Ge = c;
      N.has(me) || (Ge = pe(me, K.shiftKey || K.metaKey)), ft.current = Ge, te.current = !1, K.dataTransfer.effectAllowed = w ?? ($ ? "copyMove" : "move"), $ && K.dataTransfer.setData(
        _,
        j(Ge)
      ), ge.State.dragging = !0, ge.State.DropTargetItem = void 0, ge.State.DropTargetTimer = void 0, ye();
    }
    function ne(K) {
      const ae = K.target.getAttribute("data-key"), me = Ue.current[ae], { DropTargetItem: Ge } = ge.State;
      if (Ge === me)
        K.preventDefault(), Ae(K, me);
      else {
        if (Ge != null && Oe(K), me == null)
          return;
        if (!N.has(me) && !X(me)) {
          if (Xe(
            'NestedListView callback "ListItemMayAccept"',
            ge.ListItemMayAccept,
            me,
            c
          ) != !0)
            return;
          K.preventDefault(), _e(K, me);
        }
      }
    }
    const se = ne;
    function xe(K) {
      const ae = K.target.getAttribute("data-key"), me = Ue.current[ae], { DropTargetItem: Ge } = ge.State;
      (Ge === me || me == null) && Oe(K);
    }
    function ve(K) {
      if (xe(K), !te.current) {
        const ae = K.dataTransfer?.dropEffect ?? "none";
        ae !== "none" && $ && E(
          'NestedListView callback "onListItemsDropped"',
          x,
          ae,
          ft.current,
          r
        );
      }
      ge.State.dragging = !1, ge.State.DropMode = void 0, ye();
    }
    function _e(K, ae) {
      const { DropTargetTimer: me } = ge.State;
      me != null && (clearTimeout(me), ge.State.DropTargetTimer = void 0), ge.State.DropTargetItem = ae, ge.State.DropTargetTimer = setTimeout(() => {
        ge.State.DropTargetTimer = void 0, ge.State.DropMode === "after" && (ke(ae), ye());
      }, 2e3);
      let Ge = Xe(
        'NestedListView callback "ContainerOfListItem"',
        d,
        ae
      );
      Ge != null && (ke(Ge), ye()), Ae(K, ae);
    }
    function Ae(K, ae) {
      const me = K.target.getBoundingClientRect().top + K.target.offsetHeight / 2, Ge = K.clientY < me ? "before" : "after";
      ge.State.DropMode !== Ge && (Ge === "after" && ge.State.DropTargetTimer == null && (ge.State.DropTargetTimer = setTimeout(() => {
        ge.State.DropTargetTimer = void 0, ge.State.DropMode === "after" && (ke(ae), ye());
      }, 2e3)), ge.State.DropMode = Ge, ye());
    }
    function Oe(K) {
      const { DropTargetItem: ae, DropTargetTimer: me } = ge.State;
      me != null && (clearTimeout(me), ge.State.DropTargetTimer = void 0), ae != null && (Ve(ae), ge.State.DropTargetItem = void 0), setTimeout(ye, 500);
    }
    function mt(K) {
      const { DropTargetItem: ae, DropMode: me } = ge.State;
      ae != null && (te.current = !0, E(
        'NestedListView callback "onListItemMove"',
        C,
        c,
        ae,
        me
      ), ge.State.dragging = !1, ge.State.DropTargetItem = void 0, ge.State.DropMode = void 0);
    }
    const ye = dt(), ge = {
      List: r,
      ListIsSortable: L,
      ListIsDraggable: I,
      KeyOfListItem: i,
      ListItemRenderer: s,
      ContentOfListItem: l,
      ListIsSelectable: T,
      ListItemMayBeSelected: p,
      onListItemClick: u,
      SelectionSet: N,
      anyOuterItemIsSelected: X,
      changeSelection: pe,
      ExpansionMap: q,
      ListItemMayBeExpanded: g,
      toggleExpansionOf: J,
      ListItemWithKey: Ue.current,
      ListItemMayAccept: v,
      State: pt.current,
      rerender: ye
    };
    if (r.length === 0)
      return b`<div
          class="jcl-component nestedlistview placeholder ${o}"
          ...${e.RestProps}
        >
          <div dangerouslySetInnerHTML=${{ __html: a ?? "(empty)" }}/>
        </>`;
    const { dragging: nt } = ge.State;
    return b`<div
        class="jcl-component nestedlistview ${nt ? "dragging" : ""} ${o}"
        role="tree"
        aria-multiselectable=${T && f !== 1 ? "true" : void 0}
        onDragStart=${I ? ee : void 0}
        onDragEnter=${L ? ne : void 0}
         onDragOver=${L ? se : void 0}
        onDragLeave=${L ? xe : void 0}
          onDragEnd=${I ? ve : void 0}
             onDrop=${L ? mt : void 0}
        ...${e.RestProps}
      >
        <${tc} List=${r} ListContext=${ge}/>
      </>`;
  });
}
const Pg = /* @__PURE__ */ Z("jcl-component.nestedlistview", `
    .jcl-component.nestedlistview {
      overflow-x:auto; overflow-y:scroll; overscroll-behavior-y:contain;
      border:solid 1px #888888; border-radius:2px;
      background:#DDDDDD; padding:0px;
    }

  /**** actual ListView ****/

    .jcl-component.nestedlistview .listview {
      display:flex; position:relative; flex-flow:column nowrap; align-items:stretch;
      overflow:visible;
      margin:0px; margin-left:10px;
    }
    .jcl-component.nestedlistview > .listview {
      margin-left:0px;
    }

  /**** full ListItemView ****/

    .jcl-component.nestedlistview .listitemview {
      display:block; position:relative; overflow:hidden; flex:0 0 auto;
      left:0px; top:0px; width:100%; height:auto; line-height:0px;
      background:white; color:black;
      border:none;
      white-space:nowrap; text-overflow:ellipsis;
      user-select:none; pointer-events:auto;
    }

  /**** LabelLine in ListItemView ****/

    .jcl-component.nestedlistview .listitemview > .labelline {
      display:block; position:relative;
      width:100%;
      border:none;
      pointer-events:none;
    }
    .jcl-component.nestedlistview .listitemview:not(:last-child) > .labelline {
      border-bottom:solid 1px lightgray;
    }

    .jcl-component.nestedlistview .listitemview.before > .labelline {
      border-top:solid 20px #DDDDDD;
    }
    .jcl-component.nestedlistview .listitemview.after > .labelline {
      border-bottom:solid 21px #DDDDDD;
    }

  /**** LabelLine ExpansionMarker ****/

    .jcl-component.nestedlistview .listitemview > .labelline > .expansion-marker {
      display:inline-block; position:absolute;
      left:0px; top:0px; width:20px; height:30px; text-align:center;
      background:none !important;
      font-family:FontAwesome; font-size:22px; line-height:29px;
      pointer-events:auto;
    }
    .jcl-component.nestedlistview .listitemview > .labelline > .expansion-marker.plain::after     { content:"\\f10c"; font-size:14px; position:relative; top:-3px }
    .jcl-component.nestedlistview .listitemview > .labelline > .expansion-marker.collapsed::after { content:"\\f0da" }
    .jcl-component.nestedlistview .listitemview > .labelline > .expansion-marker.expanded::after  { content:"\\f0d7" }

  /**** LabelLine LabelView ****/

    .jcl-component.nestedlistview .listitemview > .labelline > .labelview {
      display:inline-block; position:relative;
      left:20px; top:0px; right:0px; bottom:0px;
      padding:0px; padding-left:4px; padding-right:4px;
      overflow:hidden; text-overflow:ellipsis;
      white-space:nowrap; line-height:30px;
    }
    .jcl-component.nestedlistview .listitemview.selected > .labelline {
      background-color:dodgerblue; color:white;
    }
    .jcl-component.nestedlistview .listitemview.selected > .listview .labelline {
      background-color:rgba(30,144,255, 0.3); color:black;
    }

  /**** Default LabelView ****/

    .jcl-component.nestedlistview .listitemview > .labelline > .labelview > .default {
      height:30px; line-height:29px; overflow:hidden; text-overflow:ellipsis;
      padding-left:4px; padding-right:4px;
    }

  /**** Placeholder ****/

    .jcl-component.nestedlistview.placeholder {
      display:flex; flex-flow:column nowrap; align-items:center; justify-content:center;
      flex:1 0 auto; width:100%; height:100%; overflow:hidden;
      background-color:#EEEEEE;
    }
    .jcl-component.nestedlistview.placeholder > * {
      display:inline-block; position:relative;
      left:0px; top:0px; right:auto; bottom:auto; width:auto; height:auto;
    }
  `);
function tc(e) {
  return H(() => {
    const { List: t, ListContext: n } = e;
    return b`<div class="listview" role="group">${t.map((o) => b`<${em}
          ListItem=${o} ListContext=${n}
        />`)}</>`;
  });
}
function em(e) {
  return H(() => {
    const { ListItem: t, ListContext: n } = e, { KeyOfListItem: o, ContentOfListItem: r } = n, a = Xe(
      'NestedListView callback "ContentOfListItem"',
      r,
      t
    ), i = a == null, s = n.ExpansionMap.has(t), l = n.SelectionSet.has(t), d = Xe(
      'NestedListView callback "KeyOfListItem"',
      o,
      t
    );
    n.ListItemWithKey[d] = t;
    const u = (j) => {
      if (j.stopPropagation(), E(
        'NestedListView callback "onListItemClick"',
        n.onListItemClick,
        t,
        j
      ), !n.anyOuterItemIsSelected(t) && n.ListIsSelectable) {
        if (Xe(
          'NestedListView callback "ListItemMayBeSelected"',
          n.ListItemMayBeSelected,
          t
        ) != !0)
          return;
        const x = j.pointerType !== "mouse" || j.ctrlKey || j.metaKey;
        n.changeSelection(t, x);
      }
    }, p = (j) => {
      j.stopPropagation(), Xe(
        'NestedListView callback "ContentOfListItem"',
        r,
        t
      ) != null && (n.toggleExpansionOf(t), n.rerender());
    }, c = i ? "plain" : s ? "expanded" : "collapsed", f = Xe(
      'NestedListView callback "ListItemMayBeExpanded"',
      n.ListItemMayBeExpanded,
      t
    ), h = b`<div
        class="expansion-marker ${c} ${f ? "" : "disabled"}"
        onClick=${f ? p : void 0}
      />`, g = !i && s && !(n.State.dragging && l) ? b`<${tc} List=${a} ListContext=${n}/>` : "", { DropTargetItem: y, DropMode: m } = n.State, v = t === y, C = n.ListIsSortable, _ = n.ListIsDraggable;
    return b`<div
        class=${"listitemview" + (l ? " selected" : "") + (v ? ` DropTarget ${m}` : "")}
        role="treeitem"
        aria-expanded=${i ? void 0 : s ? "true" : "false"}
        aria-selected=${n.ListIsSelectable ? l ? "true" : "false" : void 0}
        key=${d} data-key=${d}
        draggable=${_} onClick=${u}
      > <div class="labelline">
          ${h}
          <div class="labelview">${Xe(
      'NestedListView callback "ListItemRenderer"',
      n.ListItemRenderer,
      t,
      l,
      i,
      s,
      v ? m : ""
    )}</>
        </>
        ${g}
      </>`;
  });
}
let nc, oc;
const tm = Oo(() => Promise.all([
  ht("squire-rte"),
  ht("dompurify")
]).then(([e, t]) => {
  nc = e.Squire ?? e.default, oc = t.default ?? t;
})), oi = "jcl-custom:", nm = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
function om(e) {
  const t = new DOMParser().parseFromString(
    "<body>" + e + "</body>",
    "text/html"
  ), n = t.body;
  return Array.from(n.querySelectorAll("*")).forEach((o) => {
    if (!/^CUSTOM-/.test(o.tagName))
      return;
    const r = {};
    Array.from(o.attributes).forEach((i) => {
      r[i.name] = i.value;
    });
    const a = t.createElement("img");
    a.setAttribute("src", nm), a.setAttribute("alt", oi + JSON.stringify({
      Tag: o.tagName.toLowerCase(),
      Attributes: r,
      innerHTML: o.innerHTML
    })), o.replaceWith(a);
  }), n.innerHTML;
}
function ta(e) {
  const t = oc.sanitize(om(e), {
    USE_PROFILES: { html: !0 },
    RETURN_DOM_FRAGMENT: !0,
    ADD_TAGS: ["iframe"],
    // iframes are deliberately permitted
    ADD_ATTR: [
      // with any (even insecure) settings
      "allow",
      "sandbox",
      "referrerpolicy",
      "allowfullscreen",
      "frameborder",
      "loading",
      "contenteditable"
    ]
  });
  return document.importNode(t, !0);
}
function rm(e) {
  let t;
  try {
    t = JSON.parse(
      (e.getAttribute("alt") ?? "").slice(oi.length)
    );
  } catch {
    return;
  }
  if (t == null || !/^custom-/.test(t.Tag ?? ""))
    return;
  const n = document.createElement(t.Tag);
  return Object.keys(t.Attributes ?? {}).forEach((o) => {
    /^on/i.test(o) || n.setAttribute(o, t.Attributes[o]);
  }), n.setAttribute("contenteditable", "false"), n.appendChild(ta(t.innerHTML ?? "")), ri(n), n;
}
function ri(e) {
  Array.from(e.querySelectorAll('img[alt^="' + oi + '"]')).forEach((t) => {
    const n = rm(t);
    n != null && t.replaceWith(n);
  });
}
function rc(e, t) {
  e.classList.toggle("empty", t.textContent === "");
}
function Wr(e, t, n, o) {
  return e.setHTML(o), ri(t), rc(n, t), e.getHTML();
}
function fs(e, t, n) {
  switch (!0) {
    case n === "":
      e[t] = "";
      break;
    case /^\d+$/.test(n):
      e[t] = n + "px";
      break;
    default:
      e[t] = n;
  }
}
function am(e) {
  const t = {
    // Tag, "set" and "remove" methods
    toggleBold: ["B", "bold", "removeBold"],
    toggleItalic: ["I", "italic", "removeItalic"],
    toggleUnderline: ["U", "underline", "removeUnderline"],
    toggleStrikethrough: ["S", "strikethrough", "removeStrikethrough"],
    toggleSubscript: ["SUB", "subscript", "removeSubscript"],
    toggleSuperscript: ["SUP", "superscript", "removeSuperscript"]
  }, n = {};
  return Object.keys(t).forEach((o) => {
    const [r, a, i] = t[o];
    n[o] = () => e.hasFormat(r) ? e[i]() : e[a]();
  }), n;
}
function ac(e) {
  return H(() => {
    im();
    const t = eo(tm);
    e = G(e);
    const n = D(e.Class) ?? "";
    let o = re(e.Value);
    const r = D(e.Placeholder) ?? "", a = Y(e.readonly) ?? !1, i = Y(e.disabled) ?? !1, s = R(e.onValueChange), l = R(e.onSelectionChange), d = R(e.onUndoStateChange), u = R(e.onPaste), p = R(e.onImagePaste), c = R(e.onMount), f = R(e.onUnmount), h = U(null), g = U(void 0), y = U(void 0), m = U({});
    m.current = {
      onValueChange: s,
      onSelectionChange: l,
      onUndoStateChange: d,
      onPaste: u,
      onImagePaste: p,
      onUnmount: f
    };
    const v = U(o ?? ""), C = U(o ?? ""), _ = U(!1);
    return o != null && o !== v.current && (v.current = o, C.current = o, _.current = !0), je(() => {
      if (!t)
        return;
      const j = h.current, x = document.createElement("div");
      x.className = "rte-root", j.appendChild(x), y.current = x;
      const w = new nc(x, {
        blockTag: "DIV",
        sanitizeToDOMFragment: ta
      });
      g.current = w, C.current = Wr(
        w,
        x,
        j,
        C.current
      );
      function T() {
        rc(j, x);
      }
      function L() {
        return {
          Text: w.getSelectedText(),
          isCollapsed: w.getSelection().collapsed,
          Path: w.getPath()
        };
      }
      function $() {
        const O = w.getHTML();
        C.current = O, T(), E(
          'RichTextEditor callback "onValueChange"',
          m.current.onValueChange,
          O
        );
      }
      let I = !1, M = !1;
      function S(O) {
        O.target instanceof Element && O.target.classList.contains("squire-resize-handle") && (I = !0);
      }
      function F() {
        I && (I = !1, M && (M = !1, $()));
      }
      x.addEventListener("pointerdown", S, !0), document.addEventListener("pointerup", F, !0), document.addEventListener("pointercancel", F, !0), w.addEventListener("input", () => {
        if (I) {
          M = !0;
          return;
        }
        $();
      });
      function N() {
        E(
          'RichTextEditor callback "onSelectionChange"',
          m.current.onSelectionChange,
          L()
        );
      }
      w.addEventListener("select", N), w.addEventListener("cursor", N), w.addEventListener("undoStateChange", (O) => {
        const { canUndo: oe, canRedo: fe } = O.detail ?? {};
        E(
          // payload in a
          'RichTextEditor callback "onUndoStateChange"',
          // CustomEvent
          m.current.onUndoStateChange,
          oe === !0,
          fe === !0
        );
      }), w.addEventListener("willPaste", (O) => {
        const oe = m.current.onPaste;
        oe != null && E(
          // ..."Event.detail" (fragment or text)
          'RichTextEditor callback "onPaste"',
          oe,
          O
        );
      }), w.addEventListener("pasteImage", (O) => {
        const { clipboardData: oe } = O.detail ?? {};
        if (oe == null)
          return;
        const fe = m.current.onImagePaste;
        if (fe != null) {
          E(
            'RichTextEditor callback "onImagePaste"',
            fe,
            oe
          );
          return;
        }
        Array.from(oe.files ?? []).filter((Be) => Be.type.startsWith("image/")).forEach((Be) => {
          const Fe = new FileReader();
          Fe.onload = () => w.insertImage(Fe.result, {}), Fe.readAsDataURL(Be);
        });
      });
      function X(O) {
        for (; O != null && O !== x; ) {
          if (O.nodeName === "TD" || O.nodeName === "TH")
            return O;
          O = O.parentNode;
        }
      }
      w.addEventListener("keydown", (O) => {
        if (O.key !== "Tab" || O.defaultPrevented)
          return;
        const oe = X(w.getSelection().startContainer);
        if (oe == null)
          return;
        const fe = Array.from(x.querySelectorAll("td,th")), Be = fe[fe.indexOf(oe) + (O.shiftKey ? -1 : 1)];
        Be != null && (O.preventDefault(), J(Be));
      });
      function Q(O) {
        for (; O != null && O !== x; ) {
          if (O.nodeName === "TABLE")
            return O;
          O = O.parentNode;
        }
      }
      function pe() {
        return X(w.getSelection().startContainer);
      }
      function q() {
        const O = document.createElement("td");
        return O.appendChild(document.createElement("br")), O;
      }
      function J(O) {
        const oe = document.createRange();
        oe.selectNodeContents(O), oe.collapse(!0), w.setSelection(oe);
      }
      function P() {
        const O = Q(w.getSelection().startContainer);
        return O == null ? void 0 : {
          Rows: O.rows.length,
          Columns: O.rows[0] == null ? 0 : O.rows[0].cells.length
        };
      }
      function ue() {
        const O = pe();
        if (O == null)
          return;
        w.saveUndoState();
        const oe = O.parentNode, fe = document.createElement("tr");
        for (let Be = 0; Be < oe.cells.length; Be++)
          fe.appendChild(q());
        oe.parentNode.insertBefore(fe, oe.nextSibling), J(fe.cells[O.cellIndex] ?? fe.cells[0]);
      }
      function ke() {
        const O = pe();
        if (O == null)
          return;
        const oe = O.parentNode, fe = Q(oe);
        if (fe == null || fe.rows.length <= 1)
          return;
        w.saveUndoState();
        const Be = oe.rowIndex, Fe = O.cellIndex;
        oe.remove();
        const Pe = fe.rows[Math.min(Be, fe.rows.length - 1)];
        J(
          Pe.cells[Math.min(Fe, Pe.cells.length - 1)]
        );
      }
      function Ve() {
        const O = pe();
        if (O == null)
          return;
        const oe = Q(O);
        if (oe == null)
          return;
        w.saveUndoState();
        const fe = O.cellIndex;
        Array.from(oe.rows).forEach((Be) => {
          Be.cells[Math.min(fe, Be.cells.length - 1)].after(q());
        }), J(O.parentNode.cells[fe + 1]);
      }
      function Ue() {
        const O = pe();
        if (O == null)
          return;
        const oe = O.parentNode, fe = Q(O);
        if (fe == null || oe.cells.length <= 1)
          return;
        w.saveUndoState();
        const Be = O.cellIndex;
        Array.from(fe.rows).forEach((Fe) => {
          Fe.cells.length > Be && Fe.deleteCell(Be);
        }), J(oe.cells[Math.min(Be, oe.cells.length - 1)]);
      }
      function pt(O, oe) {
        const fe = Q(w.getSelection().startContainer);
        if (fe == null)
          return;
        const Be = Math.max(1, Math.floor(O)), Fe = Math.max(1, Math.floor(oe));
        for (w.saveUndoState(); fe.rows.length > Be; )
          fe.deleteRow(-1);
        for (; fe.rows.length < Be; ) {
          const Pe = fe.insertRow(-1);
          for (let Rt = 0; Rt < Fe; Rt++)
            Pe.appendChild(q());
        }
        Array.from(fe.rows).forEach((Pe) => {
          for (; Pe.cells.length > Fe; )
            Pe.deleteCell(-1);
          for (; Pe.cells.length < Fe; )
            Pe.appendChild(q());
        }), J(fe.rows[0].cells[0]);
      }
      function ft(O) {
        const oe = Q(w.getSelection().startContainer);
        if (oe != null)
          switch (w.saveUndoState(), O) {
            // ..."setTextAlignment" only affects text
            case "center":
              oe.style.marginLeft = "auto", oe.style.marginRight = "auto";
              break;
            case "right":
              oe.style.marginLeft = "auto", oe.style.marginRight = "0";
              break;
            default:
              oe.style.marginLeft = "0", oe.style.marginRight = "auto";
          }
      }
      let te;
      x.addEventListener("pointerdown", (O) => {
        te = O.target.nodeName === "IMG" ? O.target : void 0;
      });
      function ee() {
        if (te != null && te.isConnected)
          return te;
        const O = w.getSelection(), oe = O.startContainer;
        if (oe instanceof Element) {
          const fe = oe.childNodes[O.startOffset];
          if (fe != null && fe.nodeName === "IMG")
            return fe;
        }
      }
      function ne() {
        const O = ee();
        return O == null ? void 0 : {
          URL: O.getAttribute("src") ?? "",
          Width: O.style.width || (O.getAttribute("width") ?? ""),
          AltText: O.getAttribute("alt") ?? ""
        };
      }
      function se(O) {
        const { URL: oe, Width: fe, AltText: Be } = O;
        let Fe = ee();
        if (Fe == null) {
          if (oe == null || oe === "")
            return;
          Fe = w.insertImage(oe, {});
        } else
          w.saveUndoState(), oe != null && oe !== "" && Fe.setAttribute("src", oe);
        if (Be != null && Fe.setAttribute("alt", Be), fe != null) {
          const Pe = String(fe).trim();
          fs(Fe.style, "width", Pe), Fe.style.height = Pe === "" ? "" : "auto";
        }
        te = Fe;
      }
      let xe;
      x.addEventListener("pointerdown", (O) => {
        xe = O.target.nodeName === "IFRAME" ? O.target : void 0;
      });
      function ve() {
        if (xe != null && xe.isConnected)
          return xe;
        const O = w.getSelection(), oe = O.startContainer;
        if (oe instanceof Element) {
          const fe = oe.childNodes[O.startOffset];
          if (fe != null && fe.nodeName === "IFRAME")
            return fe;
        }
      }
      function _e() {
        const O = ve();
        return O == null ? void 0 : {
          URL: O.getAttribute("src") ?? "",
          Width: O.style.width || (O.getAttribute("width") ?? ""),
          Height: O.style.height || (O.getAttribute("height") ?? ""),
          allow: O.getAttribute("allow") ?? "",
          Sandbox: O.getAttribute("sandbox") ?? "",
          ReferrerPolicy: O.getAttribute("referrerpolicy") ?? ""
        };
      }
      function Ae(O, oe, fe) {
        fe != null && (fe === "" ? O.removeAttribute(oe) : O.setAttribute(oe, fe));
      }
      function Oe(O, oe, fe) {
        fe != null && fs(O.style, oe, String(fe).trim());
      }
      function mt(O) {
        const { URL: oe, Width: fe, Height: Be, allow: Fe, Sandbox: Pe, ReferrerPolicy: Rt } = O;
        let xt = ve();
        if (xt == null) {
          if (oe == null || oe === "")
            return;
          xt = document.createElement("iframe"), xt.setAttribute("src", oe), w.insertElement(xt);
        } else
          w.saveUndoState(), oe != null && oe !== "" && xt.setAttribute("src", oe);
        Ae(xt, "allow", Fe), Ae(xt, "sandbox", Pe), Ae(xt, "referrerpolicy", Rt), Oe(xt, "width", fe), Oe(xt, "height", Be), xe = xt;
      }
      function ye(O) {
        return O != null && O.nodeType === 1 && /^custom-/i.test(O.nodeName);
      }
      function ge(O) {
        for (; O != null && O !== x; ) {
          if (ye(O))
            return O;
          O = O.parentNode;
        }
      }
      let nt;
      x.addEventListener("pointerdown", (O) => {
        nt = ge(O.target);
      });
      function K() {
        if (nt != null && nt.isConnected)
          return nt;
        const O = w.getSelection(), oe = O.startContainer;
        if (oe instanceof Element) {
          const fe = oe.childNodes[O.startOffset];
          if (ye(fe))
            return fe;
        }
      }
      function ae() {
        const O = K();
        if (O == null)
          return;
        const oe = {};
        for (const fe of Array.from(O.attributes))
          fe.name !== "contenteditable" && (oe[fe.name] = fe.value);
        return {
          Tag: O.tagName.toLowerCase(),
          Attributes: oe,
          innerHTML: O.innerHTML
        };
      }
      function me(O) {
        const { Tag: oe, Attributes: fe, innerHTML: Be } = O;
        let Fe = K();
        if (Fe == null) {
          const Pe = String(oe ?? "").trim().toLowerCase();
          if (!/^custom-/.test(Pe))
            return;
          Fe = document.createElement(Pe), w.insertElement(Fe);
        } else
          w.saveUndoState();
        if (fe != null)
          for (const Pe of Object.keys(fe)) {
            if (Pe === "contenteditable" || /^on/i.test(Pe))
              continue;
            const Rt = fe[Pe];
            Rt != null && (Rt === "" ? Fe.removeAttribute(Pe) : Fe.setAttribute(Pe, Rt));
          }
        Be != null && (Fe.innerHTML = "", Fe.appendChild(ta(Be)), ri(Fe)), Fe.setAttribute("contenteditable", "false"), nt = Fe;
      }
      const Ge = {
        Editor: w,
        // grants access to full Squire API
        focus: () => w.focus(),
        blur: () => w.blur(),
        moveCursorToStart: () => w.moveCursorToStart(),
        moveCursorToEnd: () => w.moveCursorToEnd(),
        getValue: () => w.getHTML(),
        setValue: (O) => {
          ot("editor value", O), C.current = Wr(
            w,
            x,
            j,
            O
          );
        },
        insertHTML: (O) => {
          ot("HTML to insert", O), w.insertHTML(O);
        },
        insertPlainText: (O) => {
          ot("text to insert", O), w.insertPlainText(O, !1);
        },
        insertImage: (O, oe) => {
          ot("image URL", O), w.insertImage(O, oe ?? {});
        },
        ImageAtCursor: () => ne(),
        updateImage: (O) => se(O ?? {}),
        IFrameAtCursor: () => _e(),
        updateIFrame: (O) => mt(O ?? {}),
        CustomComponentAtCursor: () => ae(),
        updateCustomComponent: (O) => me(O ?? {}),
        insertTable: (O = 2, oe = 2) => {
          const fe = Math.max(1, Math.floor(O)), Be = Math.max(1, Math.floor(oe));
          w.insertHTML("<table><tbody>" + ("<tr>" + "<td><br/></td>".repeat(Be) + "</tr>").repeat(fe) + "</tbody></table>");
        },
        TableDimensions: () => P(),
        resizeTable: (O, oe) => pt(O, oe),
        alignTable: (O) => ft(O),
        insertTableRow: ue,
        deleteTableRow: ke,
        insertTableColumn: Ve,
        deleteTableColumn: Ue,
        getSelection: () => L(),
        CursorPosition: () => w.getCursorPosition(),
        hasFormat: (O) => w.hasFormat(O.toUpperCase()),
        FontInfo: () => w.getFontInfo(),
        ...am(w),
        // toggleBold ... toggleSuperscript
        toggleCode: () => w.toggleCode(),
        setFontFace: (O) => w.setFontFace(O ?? null),
        setFontSize: (O) => w.setFontSize(O ?? null),
        setTextColor: (O) => (
          // American spellings, like...
          w.setTextColor(O ?? null)
        ),
        // ...Squire itself
        setHighlightColor: (O) => w.setHighlightColor(O ?? null),
        setLink: (O) => {
          ot("link URL", O), w.makeLink(O);
        },
        removeLink: () => w.removeLink(),
        makeUnorderedList: () => w.makeUnorderedList(),
        makeOrderedList: () => w.makeOrderedList(),
        removeList: () => w.removeList(),
        indentListItem: () => w.increaseListLevel(),
        outdentListItem: () => w.decreaseListLevel(),
        increaseListLevel: () => w.increaseListLevel(),
        decreaseListLevel: () => w.decreaseListLevel(),
        increaseQuoteLevel: () => w.increaseQuoteLevel(),
        decreaseQuoteLevel: () => w.decreaseQuoteLevel(),
        setTextAlignment: (O) => w.setTextAlignment(O),
        setTextDirection: (O) => w.setTextDirection(O),
        setKeyHandler: (O, oe) => w.setKeyHandler(O, oe),
        removeAllFormatting: () => w.removeAllFormatting(),
        undo: () => {
          w.undo(), C.current = w.getHTML(), T();
        },
        redo: () => {
          w.redo(), C.current = w.getHTML(), T();
        }
      };
      return E('RichTextEditor callback "onMount"', c, Ge), () => {
        E(
          'RichTextEditor callback "onUnmount"',
          m.current.onUnmount
        ), x.removeEventListener("pointerdown", S, !0), document.removeEventListener("pointerup", F, !0), document.removeEventListener("pointercancel", F, !0), g.current = void 0, y.current = void 0, w.destroy(), x.remove();
      };
    }, [t]), je(() => {
      if (!_.current)
        return;
      _.current = !1;
      const j = g.current;
      if (j == null)
        return;
      const x = j.getHTML();
      C.current !== x && (C.current = Wr(
        j,
        y.current,
        h.current,
        C.current
      ));
    }), je(() => {
      const j = g.current, x = y.current;
      if (j == null || x == null)
        return;
      const w = a || i ? "false" : "true";
      x.getAttribute("contenteditable") !== w && j.modifyDocument(
        // otherwise, Squire's MutationObserver
        () => x.setAttribute("contenteditable", w)
      );
    }, [t, a, i]), b`<div
        class="jcl-component richtexteditor ${i ? "disabled" : ""} ${n}"
        data-placeholder="${r}"
        ...${e.RestProps} ref=${h}
      />`;
  });
}
const im = /* @__PURE__ */ Z("jcl-component.richtexteditor", `
    .jcl-component.richtexteditor {
      display:flex !important; flex-flow:column nowrap !important;
        align-items:stretch !important;
      position:relative; overflow:hidden;
      border:solid 1px #888888; border-radius:2px;
      background:white; color:black;
      font-size:14px;
    }

    .jcl-component.richtexteditor > .rte-root {
      flex:1 1 auto; overflow:auto; overscroll-behavior:contain;
      position:relative;         /* anchors Squire's image-resize handles */
      width:100%; height:100%; padding:4px 6px;
      outline:none; cursor:text;
      white-space:pre-wrap; overflow-wrap:break-word;
    }
    .jcl-component.richtexteditor:focus-within {
      outline:solid 2px #6366f1; outline-offset:-2px;
    }

    .jcl-component.richtexteditor.empty::before {
      content:attr(data-placeholder);
      position:absolute; top:4px; left:6px;
      color:#999999; pointer-events:none;
    }

    .jcl-component.richtexteditor > .rte-root blockquote {
      margin:0 0 0 8px; padding:0 0 0 8px;
      border-left:solid 2px #cccccc;
    }
    .jcl-component.richtexteditor > .rte-root ul,
    .jcl-component.richtexteditor > .rte-root ol {
      margin:0; padding:0 0 0 24px;
    }

    .jcl-component.richtexteditor > .rte-root table {
      border-collapse:collapse; margin:4px 0px;
    }
    .jcl-component.richtexteditor > .rte-root td,
    .jcl-component.richtexteditor > .rte-root th {
      border:solid 1px #cccccc; padding:2px 6px; min-width:40px;
    }

    .jcl-component.richtexteditor > .rte-root img {
      max-width:100%;
    }

    .jcl-component.richtexteditor > .rte-root iframe {
      max-width:100%; border:solid 1px #cccccc;
    }
    .jcl-component.richtexteditor > .rte-root[contenteditable="true"] iframe {
      pointer-events:none;      /* makes iframes clickable while editing */
    }

    .jcl-component.richtexteditor > .rte-root [contenteditable="false"] {
      max-width:100%;   /* applies to "custom-*" components (see JS part) */
    }
    .jcl-component.richtexteditor > .rte-root[contenteditable="true"] [contenteditable="false"] {
      pointer-events:none;   /* same trick as used for iframes above, makes
                                 custom components clickable while editing */
    }

    .jcl-component.richtexteditor.disabled {
      opacity:0.6; pointer-events:none;
    }

    @media (prefers-contrast: more) {
      .jcl-component.richtexteditor:focus-within { outline:solid 3px currentColor }
    }
  `);
let or, Cn, fo, ic, sc, lc, cc, dc, uc, pc, fc, hc, gc, mc, bc, yc, xc, vc, wc, kc, na;
const sm = Oo(
  () => Promise.all([
    ht("@codemirror/state"),
    ht("@codemirror/view"),
    ht("@codemirror/language"),
    ht("@codemirror/commands"),
    ht("@codemirror/lint")
  ]).then(([
    e,
    t,
    n,
    o,
    r
  ]) => {
    or = e.EditorState, Cn = e.Compartment, fo = t.EditorView, ic = t.keymap, sc = t.lineNumbers, lc = t.drawSelection, cc = t.highlightSpecialChars, dc = n.syntaxHighlighting, uc = n.defaultHighlightStyle, pc = n.indentUnit, fc = n.syntaxTree, hc = n.ensureSyntaxTree, gc = o.defaultKeymap, mc = o.historyKeymap, bc = o.indentWithTab, yc = o.history, xc = o.undo, vc = o.redo, wc = r.setDiagnostics, kc = r.lintGutter, na = r.linter;
  })
), Cc = /* @__PURE__ */ Object.create(null);
function lm(e, t) {
  an("language name", e), Yt("language support loader", t), Cc[e.toLowerCase()] = t;
}
const hs = {
  javascript: ["@codemirror/lang-javascript", "javascript"],
  typescript: ["@codemirror/lang-javascript", "javascript", { typescript: !0 }],
  html: ["@codemirror/lang-html", "html"],
  css: ["@codemirror/lang-css", "css"],
  json: ["@codemirror/lang-json", "json"],
  markdown: ["@codemirror/lang-markdown", "markdown"],
  python: ["@codemirror/lang-python", "python"],
  xml: ["@codemirror/lang-xml", "xml"],
  java: ["@codemirror/lang-java", "java"],
  yaml: ["@codemirror/lang-yaml", "yaml"]
};
let gs = !1;
function cm() {
  gs || (gs = !0, Object.keys(hs).forEach((e) => {
    const [t, n, o] = hs[e];
    lm(e, async () => (await ht(t))[n](
      ...o == null ? [] : [o]
    ));
  }));
}
function ms(e, t, n) {
  const o = Math.max(1, Math.min(Math.round(t), e.lines)), r = e.line(o), a = Math.max(1, Math.min(Math.round(n), r.length + 1));
  return r.from + a - 1;
}
function bs(e, t) {
  return t.map((n) => {
    const { Line: o, Column: r, EndLine: a, EndColumn: i, Message: s, Severity: l } = n, d = ms(e, o ?? 1, r ?? 1), u = a == null && i == null ? e.line(Math.max(1, Math.min(Math.round(o ?? 1), e.lines))).to : ms(e, a ?? o ?? 1, i ?? (r ?? 1) + 1);
    return {
      from: d,
      to: Math.max(d, u),
      severity: ["error", "warning", "info"].includes(l) ? l : "error",
      message: String(s ?? "(no message)")
    };
  });
}
function dm(e) {
  return H(() => {
    um();
    const t = eo(sm);
    e = G(e);
    const n = D(e.Class) ?? "";
    let o = re(e.Value);
    const r = (D(e.Language) ?? "").toLowerCase(), a = Y(e.readonly) ?? !1, i = Y(e.disabled) ?? !1, s = gn(e.TabSize) ?? 2, l = Y(e.withLineNumbers) ?? !0, d = Y(e.withLineWrapping) ?? !1, u = Y(e.withSyntaxCheck) ?? !1, p = z(e.Errors, (L) => Ie(L, De)) ?? [], c = R(e.Linter), f = gn(e.LintDelay) ?? 750, h = R(e.onValueChange), g = R(e.onSelectionChange), y = R(e.onMount), m = R(e.onUnmount), v = U(null), C = U(void 0), _ = U({});
    _.current = { onValueChange: h, onSelectionChange: g, onUnmount: m, Linter: c };
    const j = U(o ?? ""), x = U(o ?? "");
    o != null && o !== j.current && (j.current = o, x.current = o);
    const w = U(void 0);
    je(() => {
      if (!t)
        return;
      w.current == null && (w.current = {
        Language: new Cn(),
        Readability: new Cn(),
        Indentation: new Cn(),
        LineNumbers: new Cn(),
        Wrapping: new Cn(),
        Linting: new Cn()
      });
      const L = w.current, $ = new fo({
        parent: v.current,
        state: or.create({
          doc: x.current,
          extensions: [
            cc(),
            lc(),
            yc(),
            dc(uc, { fallback: !0 }),
            kc(),
            ic.of([...gc, ...mc, bc]),
            L.LineNumbers.of([]),
            L.Language.of([]),
            L.Readability.of([]),
            L.Indentation.of([]),
            L.Wrapping.of([]),
            L.Linting.of([]),
            fo.updateListener.of((M) => {
              if (M.docChanged) {
                const S = M.state.doc.toString();
                x.current = S, E(
                  'CodeEditor callback "onValueChange"',
                  _.current.onValueChange,
                  S
                );
              }
              if (M.selectionSet) {
                const { from: S, to: F } = M.state.selection.main;
                E(
                  'CodeEditor callback "onSelectionChange"',
                  _.current.onSelectionChange,
                  S,
                  F
                );
              }
            })
          ]
        })
      });
      return C.current = $, E('CodeEditor callback "onMount"', y, {
        View: $,
        // grants access to full CM API
        focus: () => $.focus(),
        getValue: () => $.state.doc.toString(),
        setValue: (M) => {
          ot("editor value", M), $.dispatch({
            changes: { from: 0, to: $.state.doc.length, insert: M }
          });
        },
        getSelection: () => {
          const { from: M, to: S } = $.state.selection.main;
          return { from: M, to: S, Text: $.state.sliceDoc(M, S) };
        },
        setSelection: (M, S = M) => {
          const F = $.state.doc.length, N = Math.max(0, Math.min(M, F)), X = Math.max(N, Math.min(S, F));
          $.dispatch({
            selection: { anchor: N, head: X },
            scrollIntoView: !0
          });
        },
        replaceSelection: (M) => {
          ot("replacement", M), $.dispatch($.state.replaceSelection(M));
        },
        undo: () => xc($),
        redo: () => vc($)
      }), () => {
        E(
          'CodeEditor callback "onUnmount"',
          _.current.onUnmount
        ), C.current = void 0, $.destroy();
      };
    }, [t]), je(() => {
      const L = C.current;
      if (L == null)
        return;
      const $ = L.state.doc.toString();
      x.current !== $ && L.dispatch({
        changes: { from: 0, to: $.length, insert: x.current }
      });
    }), je(() => {
      const L = C.current;
      if (L == null)
        return;
      const { Language: $ } = w.current;
      if (r === "" || r === "text") {
        L.dispatch({ effects: $.reconfigure([]) });
        return;
      }
      cm();
      const I = Cc[r];
      if (I == null) {
        console.warn("CodeEditor: unsupported language " + Lt(r)), L.dispatch({ effects: $.reconfigure([]) });
        return;
      }
      let M = !1;
      return I().then((S) => {
        M || C.current !== L || L.dispatch({
          effects: $.reconfigure(S)
        });
      }).catch((S) => console.error(
        "CodeEditor: could not load support for language " + Lt(r),
        S
      )), () => {
        M = !0;
      };
    }, [t, r]), je(() => {
      const L = C.current;
      L?.dispatch({
        effects: w.current.Readability.reconfigure([
          or.readOnly.of(a || i),
          fo.editable.of(!i)
        ])
      });
    }, [t, a, i]), je(() => {
      const L = C.current;
      if (L == null)
        return;
      const $ = Math.max(1, s);
      L.dispatch({
        effects: w.current.Indentation.reconfigure([
          or.tabSize.of($),
          pc.of(" ".repeat($))
        ])
      });
    }, [t, s]), je(() => {
      const L = C.current;
      if (L == null)
        return;
      const $ = w.current;
      L.dispatch({ effects: [
        $.LineNumbers.reconfigure(
          l ? sc() : []
        ),
        $.Wrapping.reconfigure(
          d ? fo.lineWrapping : []
        )
      ] });
    }, [t, l, d]), je(() => {
      const L = C.current;
      L == null || c != null || u || L.dispatch(
        wc(L.state, bs(L.state.doc, p))
      );
    }, [t, JSON.stringify(p), c != null, u]);
    const T = c != null;
    return je(() => {
      const L = C.current;
      if (L == null)
        return;
      const { Linting: $ } = w.current, I = async (S) => {
        try {
          const F = await _.current.Linter(
            S.state.doc.toString()
          );
          return bs(S.state.doc, F ?? []);
        } catch (F) {
          return console.error("CodeEditor: linting failed with", F), [];
        }
      }, M = (S) => {
        const F = S.state.doc.length, N = hc(S.state, F, 500) ?? fc(S.state), X = [];
        return N.iterate({
          enter: (Q) => {
            if (Q.type.isError) {
              const pe = Math.min(Q.from, Math.max(0, F - 1)), q = Math.min(Math.max(Q.to, Q.from + 1), F);
              X.push({
                from: pe,
                to: Math.max(pe, q),
                severity: "error",
                message: "syntax error"
              });
            }
          }
        }), X;
      };
      switch (!0) {
        case T:
          L.dispatch({ effects: $.reconfigure(
            na(I, { delay: f })
          ) });
          break;
        case u:
          L.dispatch({ effects: $.reconfigure(
            na(M, { delay: f })
          ) });
          break;
        default:
          L.dispatch({ effects: $.reconfigure([]) });
      }
    }, [t, T, u, f]), b`<div
        class="jcl-component codeeditor ${i ? "disabled" : ""} ${n}"
        ...${e.RestProps} ref=${v}
      />`;
  });
}
const um = /* @__PURE__ */ Z("jcl-component.codeeditor", `
    .jcl-component.codeeditor {
      display:flex !important; flex-flow:column nowrap !important;
        align-items:stretch !important;
      position:relative; overflow:hidden;
      border:solid 1px #888888; border-radius:2px;
      background:white; color:black;
      font-size:14px;
    }

    .jcl-component.codeeditor > .cm-editor {
      flex:1 1 auto; overflow:hidden;
      width:100%; height:100%;
    }
    .jcl-component.codeeditor > .cm-editor.cm-focused {
      outline:solid 2px #6366f1; outline-offset:-2px;
    }

    .jcl-component.codeeditor.disabled {
      opacity:0.6; pointer-events:none;
    }

    @media (prefers-contrast: more) {
      .jcl-component.codeeditor > .cm-editor.cm-focused { outline:solid 3px currentColor }
    }
  `), oa = "http://www.w3.org/2000/svg";
function We(e, t) {
  const n = document.createElementNS(oa, e);
  for (const o in t ?? {})
    n.setAttribute(o, String(t[o]));
  return n;
}
function vt(e) {
  const t = e.transform?.baseVal?.consolidate?.();
  return t == null ? new DOMMatrix() : DOMMatrix.fromMatrix(t.matrix);
}
function kn(e, t) {
  const { a: n, b: o, c: r, d: a, e: i, f: s } = t;
  e.setAttribute("transform", `matrix(${n} ${o} ${r} ${a} ${i} ${s})`);
}
function ys(e) {
  const t = Math.hypot(e.a, e.b) || 1, n = Math.hypot(e.c, e.d) || 1;
  return { ScaleX: t, ScaleY: n };
}
function Qo(e) {
  const t = e.getBBox?.();
  return t == null ? void 0 : { x: t.x, y: t.y, Width: t.width, Height: t.height };
}
function po(e) {
  let t = 1 / 0, n = 1 / 0, o = -1 / 0, r = -1 / 0;
  if (e.forEach((a) => {
    const i = a.getBBox(), s = vt(a);
    [
      [i.x, i.y],
      [i.x + i.width, i.y],
      [i.x, i.y + i.height],
      [i.x + i.width, i.y + i.height]
    ].forEach(([l, d]) => {
      const u = new DOMPoint(l, d).matrixTransform(s);
      t = Math.min(t, u.x), o = Math.max(o, u.x), n = Math.min(n, u.y), r = Math.max(r, u.y);
    });
  }), !(t > o))
    return { x: t, y: n, Width: o - t, Height: r - n };
}
function ra(e, t) {
  return e.x <= t.x + t.Width && t.x <= e.x + e.Width && e.y <= t.y + t.Height && t.y <= e.y + e.Height;
}
function aa(e) {
  return {
    xEdges: [e.x, e.x + e.Width],
    xCenter: e.x + e.Width / 2,
    yEdges: [e.y, e.y + e.Height],
    yCenter: e.y + e.Height / 2
  };
}
function $c(e, t, n) {
  const o = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map(), a = (l, d) => Math.abs(l - d) <= n, i = (l, d, u) => {
    const p = Math.round(d / n) * n;
    (u === "dashed" || l.get(p) == null) && l.set(p, u);
  }, s = (l, d, u) => {
    e.forEach((p) => {
      t.forEach((c) => {
        p[d].forEach((f) => {
          c[d].forEach((h) => {
            a(f, h) && i(l, h, "dashed");
          }), a(f, c[u]) && i(l, c[u], "dotted");
        }), c[d].forEach((f) => {
          a(p[u], f) && i(l, f, "dotted");
        });
      });
    });
  };
  return s(o, "xEdges", "xCenter"), s(r, "yEdges", "yCenter"), { vertical: o, horizontal: r };
}
let pm = 1;
function Ht(e, t, n) {
  return { x: e.x + (t.x - e.x) * n, y: e.y + (t.y - e.y) * n };
}
function Hr(e) {
  if (!/^\s*M[0-9\s.,eE+-]+(?:C[0-9\s.,eE+-]+)+Z?\s*$/.test(e))
    return;
  const t = /Z\s*$/.test(e), n = e.replace(/[MCZ]/g, " ").trim().split(/[\s,]+/).map(parseFloat);
  if (n.length < 8 || (n.length - 2) % 6 !== 0 || n.some((a) => isNaN(a)))
    return;
  const o = [{ x: n[0], y: n[1] }], r = [];
  for (let a = 2; a < n.length; a += 6)
    r.push({
      c1: { x: n[a], y: n[a + 1] },
      c2: { x: n[a + 2], y: n[a + 3] }
    }), o.push({ x: n[a + 4], y: n[a + 5] });
  if (t) {
    const a = o[0], i = o.at(-1);
    if (Math.abs(i.x - a.x) > 1e-3 || Math.abs(i.y - a.y) > 1e-3)
      return;
    o.pop();
  }
  return { Anchors: o, Controls: r, closed: t };
}
function xs(e, t = !1) {
  const n = e.map((a) => ({ x: a.x, y: a.y })), o = [], r = t ? n.length : n.length - 1;
  for (let a = 0; a < r; a++) {
    const i = n[a], s = n[(a + 1) % n.length];
    o.push({
      c1: Ht(i, s, 1 / 3),
      c2: Ht(i, s, 2 / 3)
    });
  }
  return { Anchors: n, Controls: o, closed: t };
}
function $n(e) {
  const { Anchors: t, Controls: n, closed: o } = e;
  let r = `M ${t[0].x} ${t[0].y}`;
  return n.forEach((a, i) => {
    const s = t[(i + 1) % t.length];
    r += ` C ${a.c1.x} ${a.c1.y} ${a.c2.x} ${a.c2.y} ${s.x} ${s.y}`;
  }), r + (o ? " Z" : "");
}
function vs(e, t, n, o) {
  const r = Ht(e, t, 0.5), a = Ht(t, n, 0.5), i = Ht(n, o, 0.5), s = Ht(r, a, 0.5), l = Ht(a, i, 0.5);
  return {
    Midpoint: Ht(s, l, 0.5),
    leftControls: { c1: r, c2: s },
    rightControls: { c1: l, c2: i }
  };
}
const fm = /* @__PURE__ */ new Set([
  "script",
  "foreignObject",
  "iframe",
  "embed",
  "object",
  "audio",
  "video"
]);
function ws(e) {
  return Array.from(e.querySelectorAll("*")).forEach((t) => {
    if (fm.has(t.nodeName)) {
      t.remove();
      return;
    }
    Array.from(t.attributes).forEach((n) => {
      const o = n.name.toLowerCase();
      switch (!0) {
        case o.startsWith("on"):
          t.removeAttribute(n.name);
          break;
        case (o === "href" || o === "xlink:href"):
          n.value.trim().toLowerCase().startsWith("javascript:") && t.removeAttribute(n.name);
      }
    });
  }), e;
}
class hm {
  /**** editor state ****/
  View;
  Container;
  Callbacks;
  GridLayer;
  ContentLayer;
  OverlayLayer;
  Size = { Width: 800, Height: 600 };
  ViewBox = { x: 0, y: 0, Width: 800, Height: 600 };
  Tool = "select";
  readonly = !1;
  GridSize = 10;
  snapToGrid = !1;
  showsGrid = !1;
  HitTolerance = 6;
  // grab radius around thin strokes (screen px)
  CurrentStyle = {
    StrokeColor: "#000000",
    StrokeWidth: 2,
    StrokeDashes: "",
    FillColor: "none",
    Opacity: 1,
    StartArrow: !1,
    EndArrow: !1,
    FontFamily: "sans-serif",
    FontSize: 14,
    FontWeight: "normal",
    FontStyle: "normal"
  };
  Selection = [];
  PointSelection = void 0;
  PendingPolyline = void 0;
  PendingPoints = [];
  DragState = void 0;
  DownTarget = void 0;
  // last "pointerdown" target, see "dblclick"
  GuideTimer = void 0;
  // removes transient guides, see "guides"
  Snapshots = [""];
  SnapshotIndex = 0;
  ClipboardContent = "";
  IdCounter = 0;
  GridPatternId = "jcl-de-pattern-" + pm++;
  /**** constructor ****/
  constructor(t, n) {
    jc(), this.Container = t, this.Callbacks = n ?? {}, this.View = We("svg", {
      class: "jcl-de-view",
      tabindex: 0,
      viewBox: "0 0 800 600",
      preserveAspectRatio: "xMidYMid meet"
    }), this.GridLayer = We("g", { class: "jcl-de-grid" }), this.ContentLayer = We("g", { class: "jcl-de-content" }), this.OverlayLayer = We("g", { class: "jcl-de-overlay" }), this.View.append(this.GridLayer, this.ContentLayer, this.OverlayLayer), t.appendChild(this.View), this.installArrowMarker(), this.View.addEventListener("pointerdown", (o) => this.onPointerDown(o)), this.View.addEventListener("pointermove", (o) => this.onPointerMove(o)), this.View.addEventListener("pointerup", (o) => this.onPointerUp(o)), this.View.addEventListener("dblclick", (o) => this.onDoubleClick(o)), this.View.addEventListener("keydown", (o) => this.onKeyDown(o)), this.View.addEventListener(
      "wheel",
      (o) => this.onWheel(o),
      { passive: !1 }
    );
  }
  /**** destroy ****/
  destroy() {
    clearTimeout(this.GuideTimer), this.GuideTimer = void 0, this.DragState = void 0, this.View.remove();
  }
  /**** UnitsPerPixel - content units per screen pixel ****/
  UnitsPerPixel() {
    const t = this.Container.clientWidth || 1;
    return this.ViewBox.Width / t;
  }
  /**** IdFor - ensures that the given element carries a unique id ****/
  IdFor(t) {
    if (t.id === "") {
      do
        this.IdCounter += 1;
      while (this.View.querySelector("#jcl-de-" + this.IdCounter) != null);
      t.id = "jcl-de-" + this.IdCounter;
    }
    return t.id;
  }
  /**** getValue - serialises the drawing into a standalone SVG document ****/
  getValue() {
    const { Width: t, Height: n } = this.Size, o = this.ContentLayer.innerHTML, r = this.View.querySelector("#jcl-de-arrow"), a = (
      // keeps exported documents self-contained
      o.includes("url(#jcl-de-arrow)") && r != null ? "<defs>" + r.outerHTML + "</defs>" : ""
    );
    return `<svg xmlns="${oa}" width="${t}" height="${n}" viewBox="0 0 ${t} ${n}">` + a + o + "</svg>";
  }
  /**** setValue - replaces the drawing without firing "onValueChange" ****/
  setValue(t) {
    ot("drawing value", t);
    let n;
    if (t.trim() !== "") {
      n = new DOMParser().parseFromString(t, "image/svg+xml").documentElement, n.nodeName !== "svg" && ce(
        "InvalidArgument: the given value is no valid SVG document"
      ), ws(n);
      const r = parseFloat(n.getAttribute("width") ?? ""), a = parseFloat(n.getAttribute("height") ?? "");
      !isNaN(r) && !isNaN(a) && (this.Size = { Width: r, Height: a });
    }
    this.clearSelection(), this.PointSelection = void 0, this.cancelPolyline(), this.DragState = void 0, this.ContentLayer.innerHTML = "", n != null && (Array.from(n.children).forEach((o) => {
      this.ContentLayer.appendChild(document.importNode(o, !0));
    }), Array.from(
      // editor-owned markers come from the live...
      this.ContentLayer.querySelectorAll('marker[id^="jcl-de-"]')
    ).forEach((o) => {
      const r = o.parentNode;
      o.remove(), r?.nodeName === "defs" && r.children.length === 0 && r.remove();
    }), Array.from(this.ContentLayer.children).forEach(
      (o) => this.IdFor(o)
    )), this.ViewBox = { x: 0, y: 0, Width: this.Size.Width, Height: this.Size.Height }, this.applyViewBox(), this.Snapshots = [this.ContentLayer.innerHTML], this.SnapshotIndex = 0, this.announceUndoState(), this.refreshOverlay();
  }
  /**** announceChange - captures a snapshot and reports the new value ****/
  announceChange() {
    this.captureSnapshot(), E(
      'DrawingEditor callback "onValueChange"',
      this.Callbacks.onValueChange,
      this.getValue()
    );
  }
  /**** snapshot management ****/
  captureSnapshot() {
    this.Snapshots.length = this.SnapshotIndex + 1, this.Snapshots.push(this.ContentLayer.innerHTML), this.Snapshots.length > 100 && this.Snapshots.shift(), this.SnapshotIndex = this.Snapshots.length - 1, this.announceUndoState();
  }
  restoreSnapshotAt(t) {
    const n = this.SelectedIds();
    this.SnapshotIndex = t, this.ContentLayer.innerHTML = this.Snapshots[t], this.PointSelection = void 0, this.selectIds(n), this.announceUndoState(), E(
      'DrawingEditor callback "onValueChange"',
      this.Callbacks.onValueChange,
      this.getValue()
    );
  }
  /**** undo/redo ****/
  canUndo() {
    return this.SnapshotIndex > 0;
  }
  canRedo() {
    return this.SnapshotIndex < this.Snapshots.length - 1;
  }
  undo() {
    this.canUndo() && this.restoreSnapshotAt(this.SnapshotIndex - 1);
  }
  redo() {
    this.canRedo() && this.restoreSnapshotAt(this.SnapshotIndex + 1);
  }
  announceUndoState() {
    E(
      'DrawingEditor callback "onUndoStateChange"',
      this.Callbacks.onUndoStateChange,
      this.canUndo(),
      this.canRedo()
    );
  }
  /**** ElementAt - the top-level element containing the given event target ****/
  ElementAt(t) {
    let n = t;
    for (; n != null && n !== this.View; ) {
      if (n.parentNode === this.ContentLayer)
        return n;
      n = n.parentNode;
    }
  }
  /**** ElementNear - the topmost element whose stroke is close to a point ****/
  ElementNear(t) {
    const n = this.HitTolerance * this.UnitsPerPixel(), o = "rect,circle,ellipse,line,polyline,polygon,path";
    return Array.from(this.ContentLayer.children).reverse().find((r) => (r.matches?.(o) ? [r] : Array.from(r.querySelectorAll?.(o) ?? [])).some(
      (i) => this.hitsStrokeOf(i, t, n)
    ));
  }
  /**** hitsStrokeOf - tests a point against a temporarily widened stroke ****/
  hitsStrokeOf(t, n, o) {
    if (typeof t.isPointInStroke != "function")
      return !1;
    const r = this.View.getScreenCTM?.(), a = t.getScreenCTM?.();
    if (r == null || a == null)
      return !1;
    const i = r.inverse().multiply(a), s = new DOMPoint(n.x, n.y).matrixTransform(i.inverse()), l = this.View.createSVGPoint();
    l.x = s.x, l.y = s.y;
    const { ScaleX: d, ScaleY: u } = ys(i), c = (parseFloat(getComputedStyle(t).strokeWidth) || 0) + 2 * o / Math.max(d, u), f = t.getAttribute("stroke-width");
    t.setAttribute("stroke-width", String(c));
    try {
      return t.isPointInStroke(l);
    } finally {
      f == null ? t.removeAttribute("stroke-width") : t.setAttribute("stroke-width", f);
    }
  }
  /**** selection primitives ****/
  isSelected(t) {
    return this.Selection.includes(t);
  }
  select(t, n = !1) {
    const o = n ? this.Selection.slice() : [];
    t.forEach((r) => {
      r != null && !o.includes(r) && o.push(r);
    }), this.Selection = o, this.reportSelection();
  }
  toggle(t) {
    this.Selection = this.isSelected(t) ? this.Selection.filter((n) => n !== t) : [...this.Selection, t], this.reportSelection();
  }
  selectAll() {
    this.Selection = Array.from(this.ContentLayer.children), this.reportSelection();
  }
  clearSelection() {
    this.Selection.length > 0 && (this.Selection = [], this.reportSelection());
  }
  selectIds(t) {
    this.Selection = t.map((n) => this.ContentLayer.querySelector("#" + CSS.escape(n))).filter((n) => n != null && n.parentNode === this.ContentLayer), this.reportSelection();
  }
  SelectedIds() {
    return this.Selection.map((t) => t.id);
  }
  /**** deleteSelection ****/
  deleteSelection() {
    this.readonly || this.Selection.length === 0 || (this.Selection.forEach((t) => t.remove()), this.Selection = [], this.reportSelection(), this.announceChange());
  }
  /**** reportSelection ****/
  reportSelection() {
    this.refreshOverlay(), E(
      'DrawingEditor callback "onSelectionChange"',
      this.Callbacks.onSelectionChange,
      this.SelectedIds()
    );
  }
  /**** CursorForHandle - resize cursor matching the *apparent* direction ****/
  /**** in which a handle acts (i.e., considering the element's rotation) ****/
  CursorForHandle(t, n) {
    if (t === "rotate")
      return "move";
    const o = {
      nw: [-1, -1],
      n: [0, -1],
      ne: [1, -1],
      e: [1, 0],
      se: [1, 1],
      s: [0, 1],
      sw: [-1, 1],
      w: [-1, 0]
    }, [r, a] = o[t], i = n.a * r + n.c * a, s = n.b * r + n.d * a;
    let l = Math.atan2(s, i) * 180 / Math.PI;
    return l < 0 && (l += 180), ["ew-resize", "nwse-resize", "ns-resize", "nesw-resize"][Math.round(l / 45) % 4];
  }
  /**** refreshOverlay - redraws selection frames, handles and point handles ****/
  refreshOverlay() {
    if (this.OverlayLayer.removeAttribute("transform"), this.OverlayLayer.innerHTML = "", this.Tool === "editPoints") {
      this.drawPointHandles();
      return;
    }
    const t = this.UnitsPerPixel(), n = 8 * t;
    this.Selection.forEach((o, r) => {
      const a = Qo(o);
      if (a == null)
        return;
      const i = vt(o), s = We("g", {});
      kn(s, i), this.OverlayLayer.appendChild(s);
      const { ScaleX: l, ScaleY: d } = ys(i), u = n / l, p = n / d, c = t / Math.max(l, d);
      s.appendChild(We("rect", {
        class: "jcl-de-frame",
        "stroke-width": c,
        x: a.x,
        y: a.y,
        width: a.Width,
        height: a.Height
      }));
      const f = a.x + a.Width / 2, h = this.HandlePositionsFor(a);
      for (const y in h) {
        const [m, v] = h[y];
        s.appendChild(We("rect", {
          class: "jcl-de-handle",
          "data-handle": y,
          "data-index": r,
          "stroke-width": c,
          style: "cursor:" + this.CursorForHandle(y, i),
          x: m - u / 2,
          y: v - p / 2,
          width: u,
          height: p
        }));
      }
      const g = a.y - 24 * t / d;
      s.appendChild(We("line", {
        class: "jcl-de-frame",
        "stroke-width": c,
        x1: f,
        y1: a.y,
        x2: f,
        y2: g
      })), s.appendChild(We("circle", {
        class: "jcl-de-handle",
        "data-handle": "rotate",
        "data-index": r,
        "stroke-width": c,
        cx: f,
        cy: g,
        r: u / 2
      }));
    });
  }
  /**** refreshGrid ****/
  refreshGrid() {
    if (this.GridLayer.innerHTML = "", !this.showsGrid)
      return;
    const t = this.GridSize, n = We("pattern", {
      id: this.GridPatternId,
      width: t,
      height: t,
      patternUnits: "userSpaceOnUse"
    });
    n.appendChild(We("path", {
      d: `M ${t} 0 L 0 0 0 ${t}`,
      fill: "none",
      stroke: "#00000022",
      "stroke-width": this.UnitsPerPixel()
    }));
    const o = We("defs");
    o.appendChild(n);
    const { x: r, y: a, Width: i, Height: s } = this.ViewBox;
    this.GridLayer.append(o, We("rect", {
      x: r,
      y: a,
      width: i,
      height: s,
      fill: `url(#${this.GridPatternId})`
    }));
  }
  /**** drawMoveGuides - alignment guides for moved (vs. unmoved) elements ****/
  /**** - the actual collection logic is shared (s. "Geometry Utilities")  ****/
  drawMoveGuides() {
    const t = this.UnitsPerPixel(), n = (f) => {
      const h = po([f]);
      return h == null ? void 0 : aa(h);
    }, o = this.Selection.map(n).filter((f) => f != null), r = Array.from(this.ContentLayer.children).filter((f) => !this.Selection.includes(f)).map(n).filter((f) => f != null);
    if (o.length === 0 || r.length === 0)
      return;
    const { vertical: a, horizontal: i } = $c(o, r, t), s = t, l = {
      dashed: `${6 * s} ${4 * s}`,
      dotted: `${s} ${3 * s}`
    }, { x: d, y: u, Width: p, Height: c } = this.ViewBox;
    a.forEach((f, h) => {
      this.OverlayLayer.appendChild(We("line", {
        class: "jcl-de-guide",
        "stroke-width": s,
        "stroke-dasharray": l[f],
        x1: h,
        y1: u,
        x2: h,
        y2: u + c
      }));
    }), i.forEach((f, h) => {
      this.OverlayLayer.appendChild(We("line", {
        class: "jcl-de-guide",
        "stroke-width": s,
        "stroke-dasharray": l[f],
        x1: d,
        y1: h,
        x2: d + p,
        y2: h
      }));
    });
  }
  /**** showTransientGuides - draws guides and removes them again after a ****/
  /**** while (meant for keyboard-triggered movements)                    ****/
  showTransientGuides(t = 3e3) {
    this.drawMoveGuides(), clearTimeout(this.GuideTimer), this.GuideTimer = setTimeout(() => {
      this.GuideTimer = void 0, this.refreshOverlay();
    }, t);
  }
  /**** setTool ****/
  setTool(t) {
    if ([
      "select",
      "editPoints",
      "pan",
      "rect",
      "ellipse",
      "line",
      "polyline",
      "bezier",
      "freehand",
      "text"
    ].includes(t) || ce(
      'InvalidArgument: invalid drawing tool "' + t + '" given'
    ), t === this.Tool)
      return;
    this.cancelPolyline(), this.DragState = void 0, t === "editPoints" ? this.PointSelection = this.Selection.find(
      (r) => this.isPointEditable(r)
    ) : this.PointSelection = void 0, this.Tool = t;
    const o = {
      select: "default",
      editPoints: "default",
      pan: "grab",
      text: "text",
      rect: "crosshair",
      ellipse: "crosshair",
      line: "crosshair",
      polyline: "crosshair",
      bezier: "crosshair",
      freehand: "crosshair"
    };
    this.View.style.cursor = o[t], this.refreshOverlay(), E(
      'DrawingEditor callback "onToolChange"',
      this.Callbacks.onToolChange,
      t
    );
  }
  /**** updateCursor - signals movability underneath the mouse pointer ****/
  updateCursor(t) {
    if (this.Tool !== "select" || t.target.dataset?.handle != null)
      return;
    const n = this.ElementAt(t.target) ?? this.ElementNear(this.PointFor(t));
    this.View.style.cursor = n != null && !this.readonly ? "move" : "default";
  }
  /**** coordinate conversion and snapping ****/
  PointFor(t) {
    const n = new DOMPoint(t.clientX, t.clientY).matrixTransform(this.View.getScreenCTM().inverse());
    return { x: n.x, y: n.y };
  }
  snapped(t) {
    if (!this.snapToGrid)
      return t;
    const n = this.GridSize;
    return {
      x: Math.round(t.x / n) * n,
      y: Math.round(t.y / n) * n
    };
  }
  /**** onPointerDown ****/
  onPointerDown(t) {
    if (this.View.focus(), t.button !== 0)
      return;
    t.preventDefault(), this.DownTarget = t.target, this.View.setPointerCapture(t.pointerId);
    const n = this.PointFor(t), o = !this.readonly;
    switch (this.Tool) {
      case "pan":
        this.beginPan(t);
        break;
      case "select":
        this.beginSelection(n, t);
        break;
      case "editPoints":
        o && this.beginPointEditing(n, t);
        break;
      case "polyline":
      case "bezier":
        o && this.extendPolyline(n);
        break;
      case "text":
        o && this.requestTextAt(n);
        break;
      default:
        o && this.beginCreation(n, t);
    }
  }
  /**** beginSelection - handles "pointerdown" for the "select" tool ****/
  beginSelection(t, n) {
    const o = n.target.dataset?.handle;
    if (o != null && !this.readonly) {
      this.View.style.cursor = // keeps the handle's own cursor...
      n.target.style?.cursor || "move";
      const a = parseInt(n.target.dataset?.index ?? "", 10);
      o === "rotate" ? this.beginRotation(t, a) : this.beginResizing(t, o, a);
      return;
    }
    const r = this.ElementAt(n.target) ?? this.ElementNear(t);
    switch (!0) {
      case r == null:
        n.shiftKey || this.clearSelection(), this.beginRubberBand(t, n.shiftKey);
        break;
      case n.shiftKey:
        this.toggle(r);
        break;
      default:
        this.isSelected(r) || this.select([r]), this.readonly || this.beginMove(t);
    }
  }
  /**** rubber band selection ****/
  beginRubberBand(t, n) {
    const o = We("rect", {
      class: "jcl-de-rubberband",
      "stroke-width": this.UnitsPerPixel(),
      x: t.x,
      y: t.y,
      width: 0,
      height: 0
    });
    this.OverlayLayer.appendChild(o), this.DragState = { Type: "rubberband", StartPoint: t, Band: o, extending: n };
  }
  continueRubberBand(t) {
    const { StartPoint: n, Band: o } = this.DragState, r = {
      x: Math.min(n.x, t.x),
      y: Math.min(n.y, t.y),
      Width: Math.abs(t.x - n.x),
      Height: Math.abs(t.y - n.y)
    };
    o.setAttribute("x", r.x), o.setAttribute("y", r.y), o.setAttribute("width", r.Width), o.setAttribute("height", r.Height), this.DragState.Box = r;
  }
  endRubberBand(t) {
    t.Band.remove();
    const n = t.Box;
    if (n == null || n.Width < 1 && n.Height < 1)
      return;
    const o = Array.from(this.ContentLayer.children).filter((r) => {
      const a = po([r]);
      return a != null && ra(n, a);
    });
    this.select(o, t.extending);
  }
  /**** onPointerMove ****/
  onPointerMove(t) {
    if (this.DragState == null) {
      this.PendingPolyline != null && this.previewPolylineAt(this.PointFor(t)), this.updateCursor(t);
      return;
    }
    const n = this.PointFor(t);
    switch (this.DragState.Type) {
      case "pan":
        this.continuePan(t);
        break;
      case "rubberband":
        this.continueRubberBand(n);
        break;
      case "move":
        this.continueMove(n);
        break;
      case "resize":
        this.continueResizing(n, t);
        break;
      case "rotate":
        this.continueRotation(n, t);
        break;
      case "create":
        this.continueCreation(n, t);
        break;
      case "editPoint":
        this.continuePointDrag(n);
        break;
    }
  }
  /**** onPointerUp ****/
  onPointerUp(t) {
    const n = this.DragState;
    if (n != null)
      switch (this.DragState = void 0, n.Type) {
        case "rubberband":
          this.endRubberBand(n);
          break;
        case "create":
          this.endCreation(n);
          break;
        case "move":
        case "resize":
        case "rotate":
        case "editPoint":
          this.View.style.cursor = "default", this.refreshOverlay(), n.modified && this.announceChange();
          break;
        case "pan":
          this.View.style.cursor = "grab";
      }
  }
  /**** onDoubleClick ****/
  onDoubleClick(t) {
    if (this.PendingPolyline != null) {
      this.finishPolyline();
      return;
    }
    if (this.Tool !== "select" || this.readonly)
      return;
    const n = this.ElementAt(this.DownTarget ?? t.target) ?? this.ElementNear(this.PointFor(t));
    switch (!0) {
      case n == null:
        break;
      case n.nodeName === "text":
        this.requestTextFor(n);
        break;
      case this.isPointEditable(n):
        this.setTool("editPoints"), this.PointSelection = n, this.refreshOverlay();
    }
  }
  /**** beginCreation - for "rect", "ellipse", "line" and "freehand" shapes ****/
  beginCreation(t, n) {
    const o = this.snapped(t);
    let r;
    switch (this.Tool) {
      case "rect":
        r = We("rect", {
          x: o.x,
          y: o.y,
          width: 0,
          height: 0
        });
        break;
      case "ellipse":
        r = We("ellipse", {
          cx: o.x,
          cy: o.y,
          rx: 0,
          ry: 0
        });
        break;
      case "line":
        r = We("line", {
          x1: o.x,
          y1: o.y,
          x2: o.x,
          y2: o.y
        });
        break;
      case "freehand":
        r = We("path", { d: `M ${t.x} ${t.y}` });
        break;
      default:
        return;
    }
    this.applyStyleTo(r, this.CurrentStyle), (this.Tool === "line" || this.Tool === "freehand") && r.setAttribute("fill", "none"), this.ContentLayer.appendChild(r), this.DragState = {
      Type: "create",
      Tool: this.Tool,
      Element: r,
      StartPoint: o,
      PointList: [t]
    };
  }
  /**** continueCreation ****/
  continueCreation(t, n) {
    const { Tool: o, Element: r, StartPoint: a, PointList: i } = this.DragState, s = this.snapped(t);
    switch (o) {
      case "rect": {
        let l = Math.abs(s.x - a.x), d = Math.abs(s.y - a.y);
        n.shiftKey && (l = d = Math.max(l, d));
        const u = s.x < a.x ? a.x - l : a.x, p = s.y < a.y ? a.y - d : a.y;
        r.setAttribute("x", u), r.setAttribute("width", l), r.setAttribute("y", p), r.setAttribute("height", d);
        break;
      }
      case "ellipse": {
        let l = Math.abs(s.x - a.x) / 2, d = Math.abs(s.y - a.y) / 2;
        n.shiftKey && (l = d = Math.max(l, d));
        const u = a.x + (s.x < a.x ? -l : l), p = a.y + (s.y < a.y ? -d : d);
        r.setAttribute("cx", u), r.setAttribute("rx", l), r.setAttribute("cy", p), r.setAttribute("ry", d);
        break;
      }
      case "line": {
        if (n.shiftKey) {
          const l = s.x - a.x, d = s.y - a.y, u = Math.round(Math.atan2(d, l) / (Math.PI / 4)) * (Math.PI / 4), p = Math.hypot(l, d);
          s.x = a.x + p * Math.cos(u), s.y = a.y + p * Math.sin(u);
        }
        r.setAttribute("x2", s.x), r.setAttribute("y2", s.y);
        break;
      }
      case "freehand": {
        const l = i.at(-1);
        Math.hypot(t.x - l.x, t.y - l.y) >= 2 * this.UnitsPerPixel() && (i.push(t), r.setAttribute(
          "d",
          "M " + i.map((d) => `${d.x} ${d.y}`).join(" L ")
        ));
      }
    }
  }
  /**** endCreation ****/
  endCreation(t) {
    const { Element: n } = t, o = po([n]);
    if (o == null || o.Width < 1 && o.Height < 1) {
      n.remove();
      return;
    }
    this.IdFor(n), this.select([n]), this.announceChange();
  }
  /**** polyline/bezier construction (click-based rather than drag-based) ****/
  extendPolyline(t) {
    const n = this.snapped(t);
    this.PendingPolyline == null ? (this.PendingPoints = [n, n], this.PendingPolyline = We(
      this.Tool === "bezier" ? "path" : "polyline"
    ), this.applyStyleTo(this.PendingPolyline, this.CurrentStyle), this.PendingPolyline.setAttribute("fill", "none"), this.writePolylinePoints(), this.ContentLayer.appendChild(this.PendingPolyline)) : (this.PendingPoints.push(n), this.writePolylinePoints());
  }
  previewPolylineAt(t) {
    this.PendingPoints[this.PendingPoints.length - 1] = this.snapped(t), this.writePolylinePoints();
  }
  writePolylinePoints() {
    this.PendingPolyline.nodeName === "path" ? this.PendingPolyline.setAttribute(
      "d",
      $n(xs(this.PendingPoints))
    ) : this.PendingPolyline.setAttribute(
      "points",
      this.PendingPoints.map((t) => `${t.x},${t.y}`).join(" ")
    );
  }
  finishPolyline() {
    const t = this.PendingPolyline;
    if (t == null)
      return;
    this.PendingPoints.pop();
    const n = this.PendingPoints, o = this.HitTolerance * this.UnitsPerPixel();
    let r = !1;
    for (
      ;
      // ...polyline (or bezier) into a loop
      n.length > 2 && Math.hypot(
        n.at(-1).x - n[0].x,
        n.at(-1).y - n[0].y
      ) <= o;
    )
      n.pop(), r = !0;
    if (n.length < 3 && (r = !1), n.length < 2)
      t.remove();
    else {
      let a = t;
      switch (!0) {
        case t.nodeName === "path":
          t.setAttribute(
            "d",
            $n(xs(n, r))
          ), r && (t.removeAttribute("marker-start"), t.removeAttribute("marker-end"));
          break;
        case r: {
          a = We("polygon"), Array.from(t.attributes).forEach((i) => {
            i.name.startsWith("marker-") || a.setAttribute(i.name, i.value);
          }), a.setAttribute(
            "points",
            n.map((i) => `${i.x},${i.y}`).join(" ")
          ), t.replaceWith(a);
          break;
        }
        default:
          t.setAttribute(
            "points",
            n.map((i) => `${i.x},${i.y}`).join(" ")
          );
      }
      this.IdFor(a), this.select([a]), this.announceChange();
    }
    this.PendingPolyline = void 0, this.PendingPoints = [];
  }
  cancelPolyline() {
    this.PendingPolyline != null && (this.PendingPolyline.remove(), this.PendingPolyline = void 0, this.PendingPoints = []);
  }
  /**** text creation and editing (texts come from the "onTextRequest" host) ****/
  requestTextAt(t) {
    const n = this.Callbacks.onTextRequest;
    if (n == null)
      return;
    const o = this.snapped(t);
    Promise.resolve(n("")).then((r) => {
      r == null || String(r).trim() === "" || this.insertText(String(r), o.x, o.y);
    }).catch((r) => {
      console.warn("DrawingEditor: text request failed", r);
    });
  }
  requestTextFor(t) {
    const n = this.Callbacks.onTextRequest;
    n != null && Promise.resolve(n(t.textContent)).then((o) => {
      o != null && (String(o).trim() === "" ? (t.remove(), this.clearSelection()) : t.textContent = String(o), this.refreshOverlay(), this.announceChange());
    }).catch((o) => {
      console.warn("DrawingEditor: text request failed", o);
    });
  }
  insertText(t, n, o) {
    ot("text content", t);
    const r = We("text", { x: n, y: o });
    r.textContent = t, this.applyStyleTo(r, this.CurrentStyle), r.setAttribute("fill", this.CurrentStyle.StrokeColor ?? "#000000"), r.setAttribute("stroke", "none"), this.ContentLayer.appendChild(r), this.IdFor(r), this.select([r]), this.announceChange();
  }
  /**** moving - always moves the whole selection ****/
  beginMove(t) {
    this.DragState = {
      Type: "move",
      StartPoint: t,
      modified: !1,
      BaseMatrices: new Map(this.Selection.map(
        (n) => [n, vt(n)]
      ))
    };
  }
  continueMove(t) {
    const { StartPoint: n, BaseMatrices: o } = this.DragState;
    let r = t.x - n.x, a = t.y - n.y;
    if (this.snapToGrid) {
      const i = this.GridSize;
      r = Math.round(r / i) * i, a = Math.round(a / i) * i;
    }
    this.Selection.forEach((i) => {
      kn(
        i,
        new DOMMatrix().translate(r, a).multiply(o.get(i))
      );
    }), this.DragState.modified ||= r !== 0 || a !== 0, this.refreshOverlay(), this.drawMoveGuides();
  }
  moveSelectionBy(t, n) {
    this.readonly || this.Selection.length === 0 || (this.Selection.forEach((o) => {
      kn(
        o,
        new DOMMatrix().translate(t, n).multiply(vt(o))
      );
    }), this.refreshOverlay(), this.showTransientGuides(), this.announceChange());
  }
  /**** HandlePositionsFor - handle positions for a given bounding box ****/
  HandlePositionsFor(t) {
    const n = t.x + t.Width / 2, o = t.y + t.Height / 2;
    return {
      nw: [t.x, t.y],
      n: [n, t.y],
      ne: [t.x + t.Width, t.y],
      e: [t.x + t.Width, o],
      se: [t.x + t.Width, t.y + t.Height],
      s: [n, t.y + t.Height],
      sw: [t.x, t.y + t.Height],
      w: [t.x, o]
    };
  }
  /**** resizing - the dragged handle belongs to a single element, but the ****/
  /**** scaling is applied to every selected element around its own anchor ****/
  /**** - and in its own local coordinate system, so that even rotated     ****/
  /**** elements resize along their own axes (without being skewed)        ****/
  beginResizing(t, n, o) {
    const r = this.Selection[o] ?? this.Selection[0];
    if (r == null)
      return;
    const a = Qo(r);
    if (a == null)
      return;
    const i = {
      nw: "se",
      n: "s",
      ne: "sw",
      e: "w",
      se: "nw",
      s: "n",
      sw: "ne",
      w: "e"
    }, s = this.HandlePositionsFor(a), [l, d] = s[n], [u, p] = s[i[n]], c = new Map(this.Selection.map((f) => {
      const h = Qo(f);
      return [f, h == null ? [u, p] : this.HandlePositionsFor(h)[i[n]]];
    }));
    this.DragState = {
      Type: "resize",
      Handle: n,
      HandleX: l,
      HandleY: d,
      AnchorX: u,
      AnchorY: p,
      InverseReferenceMatrix: vt(r).inverse(),
      ElementAnchors: c,
      modified: !1,
      BaseMatrices: new Map(this.Selection.map(
        (f) => [f, vt(f)]
      ))
    };
  }
  continueResizing(t, n) {
    const {
      HandleX: o,
      HandleY: r,
      AnchorX: a,
      AnchorY: i,
      InverseReferenceMatrix: s,
      ElementAnchors: l,
      BaseMatrices: d
    } = this.DragState, u = this.snapped(t), p = new DOMPoint(u.x, u.y).matrixTransform(s);
    let c = o === a ? 1 : (p.x - a) / (o - a), f = r === i ? 1 : (p.y - i) / (r - i);
    if (n.shiftKey) {
      const h = o === a ? Math.abs(f) : r === i ? Math.abs(c) : Math.max(Math.abs(c), Math.abs(f));
      c = c < 0 ? -h : h, f = f < 0 ? -h : h;
    }
    Math.abs(c) < 0.01 && (c = c < 0 ? -0.01 : 0.01), Math.abs(f) < 0.01 && (f = f < 0 ? -0.01 : 0.01), this.Selection.forEach((h) => {
      const [g, y] = l.get(h), m = new DOMMatrix().translate(g, y).scale(c, f).translate(-g, -y);
      kn(h, d.get(h).multiply(m));
    }), this.DragState.modified = !0, this.refreshOverlay();
  }
  /**** rotating - the dragged handle belongs to a single element, but the ****/
  /**** rotation is applied to every selected element around its own centre ****/
  beginRotation(t, n) {
    const o = this.Selection[n] ?? this.Selection[0];
    if (o == null)
      return;
    const r = (d) => {
      const u = Qo(d);
      if (u == null)
        return;
      const p = new DOMPoint(u.x + u.Width / 2, u.y + u.Height / 2).matrixTransform(vt(d));
      return [p.x, p.y];
    }, a = r(o);
    if (a == null)
      return;
    const [i, s] = a, l = new Map(this.Selection.map((d) => [
      d,
      r(d) ?? [i, s]
    ]));
    this.DragState = {
      Type: "rotate",
      CenterX: i,
      CenterY: s,
      ElementCenters: l,
      modified: !1,
      StartAngle: Math.atan2(t.y - s, t.x - i),
      BaseMatrices: new Map(this.Selection.map(
        (d) => [d, vt(d)]
      ))
    };
  }
  continueRotation(t, n) {
    const {
      CenterX: o,
      CenterY: r,
      StartAngle: a,
      ElementCenters: i,
      BaseMatrices: s
    } = this.DragState;
    let d = (Math.atan2(t.y - r, t.x - o) - a) * 180 / Math.PI;
    (n.shiftKey || this.snapToGrid) && (d = Math.round(d / 15) * 15), this.Selection.forEach((u) => {
      const [p, c] = i.get(u), f = new DOMMatrix().translate(p, c).rotate(d).translate(-p, -c);
      kn(u, f.multiply(s.get(u)));
    }), this.DragState.modified = !0, this.refreshOverlay();
  }
  // ...and therefore rotate along automatically
  /**** isPointEditable - lines, poly*s, simple "M...L...Z?" and bezier paths ****/
  isPointEditable(t) {
    switch (t?.nodeName) {
      case "line":
      case "polyline":
      case "polygon":
        return !0;
      case "path": {
        const n = t.getAttribute("d") ?? "";
        return /^\s*M[0-9\s.,eE+-]+(?:L[0-9\s.,eE+-]+)*Z?\s*$/.test(n) || Hr(n) != null;
      }
      default:
        return !1;
    }
  }
  /**** BezierModelOf - the bezier model of a path element (or undefined) ****/
  BezierModelOf(t) {
    return t?.nodeName === "path" ? Hr(t.getAttribute("d") ?? "") : void 0;
  }
  /**** PointListOf / setPointListOf - in element-local coordinates ****/
  PointListOf(t) {
    const n = this.BezierModelOf(t);
    if (n != null)
      return n.Anchors;
    if (t.nodeName === "line")
      return [
        {
          x: parseFloat(t.getAttribute("x1") ?? "0"),
          y: parseFloat(t.getAttribute("y1") ?? "0")
        },
        {
          x: parseFloat(t.getAttribute("x2") ?? "0"),
          y: parseFloat(t.getAttribute("y2") ?? "0")
        }
      ];
    const r = (t.nodeName === "path" ? (t.getAttribute("d") ?? "").replace(/[MLZ]/g, " ") : t.getAttribute("points") ?? "").trim().split(/[\s,]+/).map(parseFloat), a = [];
    for (let i = 0; i + 1 < r.length; i += 2)
      a.push({ x: r[i], y: r[i + 1] });
    return a;
  }
  setPointListOf(t, n) {
    switch (t.nodeName) {
      case "line":
        t.setAttribute("x1", n[0].x), t.setAttribute("y1", n[0].y), t.setAttribute("x2", n[1].x), t.setAttribute("y2", n[1].y);
        break;
      case "polyline":
      case "polygon":
        t.setAttribute(
          "points",
          n.map((o) => `${o.x},${o.y}`).join(" ")
        );
        break;
      case "path": {
        const o = /Z\s*$/.test(t.getAttribute("d") ?? "");
        t.setAttribute(
          "d",
          "M " + n.map((r) => `${r.x} ${r.y}`).join(" L ") + (o ? " Z" : "")
        );
      }
    }
  }
  /**** drawPointHandles - shown instead of the usual selection handles ****/
  drawPointHandles() {
    const t = this.PointSelection;
    if (t == null || t.parentNode !== this.ContentLayer) {
      this.PointSelection = void 0;
      return;
    }
    const n = vt(t), o = this.UnitsPerPixel(), r = this.BezierModelOf(t), a = this.PointListOf(t), i = a.map(
      (u) => new DOMPoint(u.x, u.y).matrixTransform(n)
    ), s = t.nodeName === "polygon" || (r != null ? r.closed : /Z\s*$/.test(t.getAttribute("d") ?? "")), l = po([t]);
    l != null && this.OverlayLayer.appendChild(We("rect", {
      class: "jcl-de-frame",
      "stroke-width": o,
      x: l.x,
      y: l.y,
      width: l.Width,
      height: l.Height
    })), r?.Controls.forEach((u, p) => {
      const c = i[p], f = i[(p + 1) % i.length];
      [["c1", c], ["c2", f]].forEach(([h, g]) => {
        const y = new DOMPoint(u[h].x, u[h].y).matrixTransform(n);
        this.OverlayLayer.appendChild(We("line", {
          class: "jcl-de-frame",
          "stroke-width": o,
          x1: g.x,
          y1: g.y,
          x2: y.x,
          y2: y.y
        })), this.OverlayLayer.appendChild(We("circle", {
          class: "jcl-de-handle",
          "data-control-index": p,
          "data-control-part": h,
          "stroke-width": o,
          cx: y.x,
          cy: y.y,
          r: 3 * o,
          opacity: 0.8
        }));
      });
    });
    const d = t.nodeName === "line" ? 0 : r != null ? r.Controls.length : s ? i.length : i.length - 1;
    for (let u = 0; u < d; u++) {
      const p = i[u], c = i[(u + 1) % i.length];
      let f = { x: (p.x + c.x) / 2, y: (p.y + c.y) / 2 };
      if (r != null) {
        const { c1: h, c2: g } = r.Controls[u], y = vs(
          a[u],
          h,
          g,
          a[(u + 1) % a.length]
        ).Midpoint;
        f = new DOMPoint(y.x, y.y).matrixTransform(n);
      }
      this.OverlayLayer.appendChild(We("rect", {
        class: "jcl-de-handle",
        "data-midpoint-index": u,
        "stroke-width": o,
        x: f.x - 3 * o,
        y: f.y - 3 * o,
        width: 6 * o,
        height: 6 * o,
        opacity: 0.7
      }));
    }
    i.forEach((u, p) => {
      this.OverlayLayer.appendChild(We("circle", {
        class: "jcl-de-handle",
        "data-point-index": p,
        "stroke-width": o,
        cx: u.x,
        cy: u.y,
        r: 4 * o
      }));
    });
  }
  /**** beginPointEditing - handles "pointerdown" for the "editPoints" tool ****/
  beginPointEditing(t, n) {
    const o = n.target.dataset ?? {};
    switch (!0) {
      case o.pointIndex != null: {
        const r = parseInt(o.pointIndex, 10);
        n.altKey ? this.removePointAt(r) : this.DragState = {
          Type: "editPoint",
          Kind: "anchor",
          Index: r,
          modified: !1
        };
        break;
      }
      case o.controlIndex != null: {
        const r = parseInt(o.controlIndex, 10);
        this.DragState = {
          Type: "editPoint",
          Kind: "control",
          Index: r,
          Part: o.controlPart,
          modified: !1
        };
        break;
      }
      case o.midpointIndex != null: {
        const r = parseInt(o.midpointIndex, 10);
        this.insertPointAfter(r, t), this.DragState = {
          Type: "editPoint",
          Kind: "anchor",
          Index: r + 1,
          modified: !0
        };
        break;
      }
      default: {
        const r = this.ElementAt(n.target) ?? this.ElementNear(t);
        this.PointSelection = r != null && this.isPointEditable(r) ? r : void 0, this.select(
          // element and point selection stay in sync so...
          this.PointSelection == null ? [] : [this.PointSelection]
        );
      }
    }
  }
  /**** point manipulation ****/
  continuePointDrag(t) {
    const n = this.PointSelection;
    if (n == null)
      return;
    const o = new DOMPoint(t.x, t.y).matrixTransform(vt(n).inverse()), r = this.snapped({ x: o.x, y: o.y }), a = this.BezierModelOf(n);
    if (a == null) {
      const i = this.PointListOf(n);
      i[this.DragState.Index] = r, this.setPointListOf(n, i);
    } else
      this.dragBezierPointTo(n, a, r);
    this.DragState.modified = !0, this.refreshOverlay();
  }
  /**** dragBezierPointTo - anchors take their control points along ****/
  dragBezierPointTo(t, n, o) {
    const { Kind: r, Index: a, Part: i } = this.DragState;
    if (r === "control")
      n.Controls[a][i] = o;
    else {
      const s = n.Anchors[a], l = o.x - s.x, d = o.y - s.y;
      s.x = o.x, s.y = o.y;
      const u = n.Controls.length, p = a < u ? a : void 0, c = a > 0 ? a - 1 : n.closed ? u - 1 : void 0;
      p != null && (n.Controls[p].c1.x += l, n.Controls[p].c1.y += d), c != null && (n.Controls[c].c2.x += l, n.Controls[c].c2.y += d);
    }
    t.setAttribute("d", $n(n));
  }
  removePointAt(t) {
    const n = this.PointSelection, o = this.BezierModelOf(n);
    if (o != null) {
      this.removeBezierAnchorAt(n, o, t);
      return;
    }
    const r = this.PointListOf(n);
    r.length <= 2 || (r.splice(t, 1), this.setPointListOf(n, r), this.refreshOverlay(), this.announceChange());
  }
  /**** removeBezierAnchorAt - merges the two segments meeting at an anchor ****/
  removeBezierAnchorAt(t, n, o) {
    const { Anchors: r, Controls: a, closed: i } = n;
    if (!(r.length <= (i ? 3 : 2))) {
      switch (!0) {
        case i: {
          const s = (o + r.length - 1) % r.length;
          a[s] = { c1: a[s].c1, c2: a[o].c2 }, a.splice(o, 1), r.splice(o, 1);
          break;
        }
        case o === 0:
          r.shift(), a.shift();
          break;
        case o === r.length - 1:
          r.pop(), a.pop();
          break;
        default:
          a[o - 1] = { c1: a[o - 1].c1, c2: a[o].c2 }, a.splice(o, 1), r.splice(o, 1);
      }
      t.setAttribute("d", $n(n)), this.refreshOverlay(), this.announceChange();
    }
  }
  insertPointAfter(t, n) {
    const o = this.PointSelection, r = this.BezierModelOf(o);
    if (r != null) {
      const { Anchors: s, Controls: l } = r, d = vs(
        s[t],
        l[t].c1,
        l[t].c2,
        s[(t + 1) % s.length]
      );
      l.splice(t, 1, d.leftControls, d.rightControls), s.splice(t + 1, 0, d.Midpoint), o.setAttribute("d", $n(r)), this.refreshOverlay();
      return;
    }
    const a = new DOMPoint(n.x, n.y).matrixTransform(vt(o).inverse()), i = this.PointListOf(o);
    i.splice(t + 1, 0, { x: a.x, y: a.y }), this.setPointListOf(o, i), this.refreshOverlay();
  }
  /**** toggleClosed - closes open polylines/paths and re-opens closed ones ****/
  toggleClosed() {
    if (this.readonly || this.Selection.length === 0)
      return;
    let t = !1;
    this.Selection = this.Selection.map((n) => {
      switch (n.nodeName) {
        case "polyline":
        case "polygon": {
          const o = We(
            n.nodeName === "polyline" ? "polygon" : "polyline"
          );
          return Array.from(n.attributes).forEach((r) => {
            // closed shapes carry no arrowheads
            n.nodeName === "polyline" && r.name.startsWith("marker-") || o.setAttribute(r.name, r.value);
          }), n.replaceWith(o), this.PointSelection === n && (this.PointSelection = o), t = !0, o;
        }
        case "path": {
          const o = n.getAttribute("d") ?? "", r = Hr(o);
          switch (!0) {
            case r != null: {
              if (r.closed)
                r.Controls.pop(), r.closed = !1;
              else {
                const a = r.Anchors.at(-1);
                r.Controls.push({
                  c1: Ht(a, r.Anchors[0], 1 / 3),
                  c2: Ht(a, r.Anchors[0], 2 / 3)
                }), r.closed = !0, n.removeAttribute("marker-start"), n.removeAttribute("marker-end");
              }
              n.setAttribute("d", $n(r)), t = !0;
              break;
            }
            case /^\s*M[0-9\s.,eE+-]+(?:L[0-9\s.,eE+-]+)+Z?\s*$/.test(o):
              /Z\s*$/.test(o) ? n.setAttribute("d", o.replace(/\s*Z\s*$/, "")) : (n.setAttribute("d", o.trim() + " Z"), n.removeAttribute("marker-start"), n.removeAttribute("marker-end")), t = !0;
          }
          return n;
        }
        default:
          return n;
      }
    }), t && (this.reportSelection(), this.announceChange());
  }
  /**** view box management ****/
  applyViewBox() {
    const { x: t, y: n, Width: o, Height: r } = this.ViewBox;
    this.View.setAttribute("viewBox", `${t} ${n} ${o} ${r}`), this.refreshGrid(), this.refreshOverlay();
  }
  setViewBox(t) {
    const { x: n, y: o, Width: r, Height: a } = t ?? {};
    isFinite(n) && isFinite(o) && isFinite(r) && r > 0 && isFinite(a) && a > 0 || ce("InvalidArgument: invalid view box given"), this.ViewBox = { x: n, y: o, Width: r, Height: a }, this.applyViewBox();
  }
  /**** zooming ****/
  ZoomFactor() {
    return (this.Container.clientWidth || 1) / this.ViewBox.Width;
  }
  setZoom(t) {
    isFinite(t) && t > 0 || ce(
      "InvalidArgument: invalid zoom factor given"
    );
    const n = this.ViewBox.x + this.ViewBox.Width / 2, o = this.ViewBox.y + this.ViewBox.Height / 2, r = (this.Container.clientWidth || 1) / t, a = (this.Container.clientHeight || 1) / t;
    this.setViewBox({ x: n - r / 2, y: o - a / 2, Width: r, Height: a });
  }
  zoomBy(t, n) {
    const { x: o, y: r, Width: a, Height: i } = this.ViewBox, s = Math.max(
      this.Size.Width / 50,
      Math.min(a / t, this.Size.Width * 20)
    ), l = a / s, d = n ?? { x: o + a / 2, y: r + i / 2 };
    this.setViewBox({
      x: d.x - (d.x - o) / l,
      y: d.y - (d.y - r) / l,
      Width: s,
      Height: i / l
    });
  }
  zoomToFit() {
    const t = po(Array.from(this.ContentLayer.children)) ?? {
      x: 0,
      y: 0,
      Width: this.Size.Width,
      Height: this.Size.Height
    }, n = Math.max(t.Width, t.Height) * 0.05 || 10;
    let o = t.Width + 2 * n, r = t.Height + 2 * n;
    const a = (this.Container.clientWidth || 1) / (this.Container.clientHeight || 1);
    o / r > a ? r = o / a : o = r * a, this.setViewBox({
      x: t.x + t.Width / 2 - o / 2,
      y: t.y + t.Height / 2 - r / 2,
      Width: o,
      Height: r
    });
  }
  /**** panning ****/
  beginPan(t) {
    this.View.style.cursor = "grabbing", this.DragState = {
      Type: "pan",
      StartX: t.clientX,
      StartY: t.clientY,
      StartViewBox: { ...this.ViewBox }
    };
  }
  continuePan(t) {
    const { StartX: n, StartY: o, StartViewBox: r } = this.DragState, a = this.UnitsPerPixel();
    this.ViewBox = {
      ...this.ViewBox,
      x: r.x - (t.clientX - n) * a,
      y: r.y - (t.clientY - o) * a
    }, this.applyViewBox();
  }
  /**** onWheel - zooms with Ctrl/Cmd pressed, pans otherwise ****/
  onWheel(t) {
    if (t.preventDefault(), t.ctrlKey || t.metaKey)
      this.zoomBy(t.deltaY < 0 ? 1.1 : 1 / 1.1, this.PointFor(t));
    else {
      const n = this.UnitsPerPixel();
      this.setViewBox({
        ...this.ViewBox,
        x: this.ViewBox.x + t.deltaX * n,
        y: this.ViewBox.y + t.deltaY * n
      });
    }
  }
  /**** onKeyDown ****/
  onKeyDown(t) {
    const n = t.ctrlKey || t.metaKey, o = t.key.length === 1 ? t.key.toLowerCase() : t.key, r = (t.shiftKey ? 10 : 1) * (this.snapToGrid ? this.GridSize : 1);
    let a = !0;
    switch (!0) {
      case o === "Escape":
        switch (!0) {
          case this.PendingPolyline != null:
            this.cancelPolyline();
            break;
          case this.PointSelection != null:
            this.PointSelection = void 0, this.refreshOverlay();
            break;
          default:
            this.clearSelection();
        }
        break;
      case (o === "Enter" && this.PendingPolyline != null):
        this.finishPolyline();
        break;
      case (o === "Delete" || o === "Backspace"):
        this.deleteSelection();
        break;
      case (n && o === "z" && t.shiftKey):
        this.readonly || this.redo();
        break;
      case (n && o === "z"):
        this.readonly || this.undo();
        break;
      case (n && o === "y"):
        this.readonly || this.redo();
        break;
      case (n && o === "a"):
        this.selectAll();
        break;
      case (n && o === "c"):
        this.copySelection();
        break;
      case (n && o === "x"):
        this.cutSelection();
        break;
      case (n && o === "v"):
        this.pasteClipboard();
        break;
      case (n && o === "d"):
        this.duplicateSelection();
        break;
      case o === "ArrowLeft":
        this.moveSelectionBy(-r, 0);
        break;
      case o === "ArrowRight":
        this.moveSelectionBy(r, 0);
        break;
      case o === "ArrowUp":
        this.moveSelectionBy(0, -r);
        break;
      case o === "ArrowDown":
        this.moveSelectionBy(0, r);
        break;
      default:
        a = !1;
    }
    a && t.preventDefault();
  }
  /**** internal clipboard operations (deliberately not the system clipboard) ****/
  copySelection() {
    if (this.Selection.length === 0)
      return;
    const t = Array.from(this.ContentLayer.children).filter((n) => this.isSelected(n));
    this.ClipboardContent = t.map((n) => n.outerHTML).join("");
  }
  cutSelection() {
    this.readonly || (this.copySelection(), this.deleteSelection());
  }
  pasteClipboard() {
    if (this.readonly || this.ClipboardContent === "")
      return;
    const t = new DOMParser().parseFromString(
      `<svg xmlns="${oa}">` + this.ClipboardContent + "</svg>",
      "image/svg+xml"
    );
    ws(t.documentElement);
    const n = this.snapToGrid ? this.GridSize : 10, o = [];
    Array.from(t.documentElement.children).forEach((r) => {
      const a = document.importNode(r, !0);
      a.removeAttribute("id"), kn(
        a,
        new DOMMatrix().translate(n, n).multiply(vt(a))
      ), this.ContentLayer.appendChild(a), this.IdFor(a), o.push(a);
    }), o.length !== 0 && (this.ClipboardContent = o.map((r) => r.outerHTML).join(""), this.select(o), this.announceChange());
  }
  duplicateSelection() {
    if (this.readonly || this.Selection.length === 0)
      return;
    const t = this.ClipboardContent;
    this.copySelection(), this.pasteClipboard(), this.ClipboardContent = t;
  }
  /**** grouping ****/
  groupSelection() {
    if (this.readonly || this.Selection.length < 2)
      return;
    const t = Array.from(this.ContentLayer.children).filter((o) => this.isSelected(o)), n = We("g");
    this.ContentLayer.insertBefore(n, t.at(-1).nextSibling), t.forEach((o) => n.appendChild(o)), this.IdFor(n), this.select([n]), this.announceChange();
  }
  ungroupSelection() {
    if (this.readonly)
      return;
    const t = [];
    let n = !1;
    this.Selection.forEach((o) => {
      if (o.nodeName !== "g") {
        t.push(o);
        return;
      }
      const r = vt(o);
      Array.from(o.children).forEach((a) => {
        kn(a, r.multiply(vt(a))), this.ContentLayer.insertBefore(a, o), this.IdFor(a), t.push(a);
      }), o.remove(), n = !0;
    }), n && (this.select(t), this.announceChange());
  }
  /**** z-order management ****/
  bringToFront() {
    if (this.readonly || this.Selection.length === 0)
      return;
    Array.from(this.ContentLayer.children).filter((n) => this.isSelected(n)).forEach((n) => this.ContentLayer.appendChild(n)), this.announceChange();
  }
  sendToBack() {
    if (this.readonly || this.Selection.length === 0)
      return;
    Array.from(this.ContentLayer.children).filter((n) => this.isSelected(n)).reverse().forEach((n) => {
      this.ContentLayer.insertBefore(n, this.ContentLayer.firstChild);
    }), this.announceChange();
  }
  raiseSelection() {
    if (this.readonly || this.Selection.length === 0)
      return;
    const t = Array.from(this.ContentLayer.children);
    for (let n = t.length - 2; n >= 0; n--)
      this.isSelected(t[n]) && !this.isSelected(t[n + 1]) && (this.ContentLayer.insertBefore(t[n + 1], t[n]), [t[n], t[n + 1]] = [t[n + 1], t[n]]);
    this.announceChange();
  }
  lowerSelection() {
    if (this.readonly || this.Selection.length === 0)
      return;
    const t = Array.from(this.ContentLayer.children);
    for (let n = 1; n < t.length; n++)
      this.isSelected(t[n]) && !this.isSelected(t[n - 1]) && (this.ContentLayer.insertBefore(t[n], t[n - 1]), [t[n - 1], t[n]] = [t[n], t[n - 1]]);
    this.announceChange();
  }
  /**** getStyle/setStyle - defaults for new shapes, applied to any selection ****/
  getStyle() {
    return { ...this.CurrentStyle };
  }
  setStyle(t) {
    const n = {}, o = St(t?.StrokeColor), r = nn(t?.StrokeWidth, 0, 100), a = D(t?.StrokeDashes), i = t?.FillColor === "none" ? "none" : St(t?.FillColor), s = nn(t?.Opacity, 0, 1), l = Y(t?.StartArrow), d = Y(t?.EndArrow), u = D(t?.FontFamily), p = nn(t?.FontSize, 1, 1e3), c = he(t?.FontWeight, ["normal", "bold"]) ? t?.FontWeight : void 0, f = he(t?.FontStyle, ["normal", "italic"]) ? t?.FontStyle : void 0;
    o != null && (n.StrokeColor = o), r != null && (n.StrokeWidth = r), a != null && (n.StrokeDashes = a), i != null && (n.FillColor = i), s != null && (n.Opacity = s), l != null && (n.StartArrow = l), d != null && (n.EndArrow = d), u != null && (n.FontFamily = u), p != null && (n.FontSize = p), c != null && (n.FontWeight = c), f != null && (n.FontStyle = f), this.CurrentStyle = { ...this.CurrentStyle, ...n }, !this.readonly && this.Selection.length > 0 && (this.Selection.forEach(
      (h) => this.applyStyleTo(h, n)
    ), this.refreshOverlay(), this.announceChange());
  }
  /**** StyleOfElement - reads the style-relevant attributes of an element ****/
  StyleOfElement(t) {
    const n = {}, o = parseFloat(t.getAttribute("stroke-width") ?? "");
    isNaN(o) || (n.StrokeWidth = o);
    const r = t.getAttribute("stroke-dasharray");
    r != null && (n.StrokeDashes = r);
    const a = parseFloat(t.getAttribute("opacity") ?? "");
    if (isNaN(a) || (n.Opacity = a), t.nodeName === "text") {
      const u = t.getAttribute("fill");
      u != null && (n.StrokeColor = u);
    } else {
      const u = t.getAttribute("stroke");
      u != null && (n.StrokeColor = u);
      const p = t.getAttribute("fill");
      p != null && (n.FillColor = p);
    }
    ["line", "polyline", "path"].includes(t.nodeName) && (n.StartArrow = t.getAttribute("marker-start") != null, n.EndArrow = t.getAttribute("marker-end") != null);
    const i = t.getAttribute("font-family");
    i != null && (n.FontFamily = i);
    const s = parseFloat(t.getAttribute("font-size") ?? "");
    isNaN(s) || (n.FontSize = s);
    const l = t.getAttribute("font-weight");
    (l === "normal" || l === "bold") && (n.FontWeight = l);
    const d = t.getAttribute("font-style");
    return (d === "normal" || d === "italic") && (n.FontStyle = d), n;
  }
  /**** SelectionStyle - common style of the selection (null = indifferent) ****/
  SelectionStyle() {
    const t = {};
    return this.Selection.forEach((n) => {
      const o = this.StyleOfElement(n);
      for (const r in o)
        switch (!0) {
          case !(r in t):
            t[r] = o[r];
            break;
          case t[r] !== o[r]:
            t[r] = null;
        }
    }), t;
  }
  /**** applyStyleTo - only applies the explicitly given style settings ****/
  applyStyleTo(t, n) {
    const o = {
      StrokeColor: "stroke",
      StrokeWidth: "stroke-width",
      StrokeDashes: "stroke-dasharray",
      FillColor: "fill",
      Opacity: "opacity",
      FontFamily: "font-family",
      FontSize: "font-size",
      FontWeight: "font-weight",
      FontStyle: "font-style"
    };
    for (const r in n) {
      const a = n[r];
      a != null && o[r] != null && (a === "" ? t.removeAttribute(o[r]) : t.setAttribute(o[r], String(a)));
    }
    if (["line", "polyline", "path"].includes(t.nodeName)) {
      const r = {
        // arrowheads apply to open shapes only
        StartArrow: "marker-start",
        EndArrow: "marker-end"
      };
      for (const a in r)
        n[a] != null && (n[a] ? t.setAttribute(r[a], "url(#jcl-de-arrow)") : t.removeAttribute(r[a]));
    }
    t.nodeName === "text" && n.StrokeColor != null && (t.setAttribute("fill", String(n.StrokeColor)), t.setAttribute("stroke", "none"));
  }
  /**** installArrowMarker - a single marker serves all arrowheads ****/
  installArrowMarker() {
    if (this.View.querySelector("#jcl-de-arrow") != null)
      return;
    const t = We("marker", {
      id: "jcl-de-arrow",
      viewBox: "0 0 10 10",
      refX: 9,
      refY: 5,
      markerWidth: 7,
      markerHeight: 7,
      markerUnits: "strokeWidth",
      orient: "auto-start-reverse"
    });
    t.appendChild(We("path", {
      d: "M 0 0 L 10 5 L 0 10 Z",
      fill: "context-stroke",
      stroke: "none"
    }));
    const n = We("defs");
    n.appendChild(t), this.View.insertBefore(n, this.GridLayer);
  }
}
function gm(e) {
  return H(() => {
    jc(), e = G(e);
    const t = D(e.Class) ?? "";
    let n = re(e.Value);
    const o = Y(e.readonly) ?? !1, r = Y(e.disabled) ?? !1, a = gn(e.Width) ?? 800, i = gn(e.Height) ?? 600, s = nn(e.GridSize, 0.01, 1e3) ?? 10, l = Y(e.snapToGrid) ?? !1, d = Y(e.showGrid) ?? !1, u = R(e.onValueChange), p = R(e.onSelectionChange), c = R(e.onToolChange), f = R(e.onUndoStateChange), h = R(e.onTextRequest), g = R(e.onMount), y = R(e.onUnmount), m = U(null), v = U(void 0), C = U({});
    C.current = {
      onValueChange: u,
      onSelectionChange: p,
      onToolChange: c,
      onUndoStateChange: f,
      onTextRequest: h,
      onUnmount: y
    };
    const _ = U(n ?? ""), j = U(n ?? "");
    return n != null && n !== _.current && (_.current = n, j.current = n), je(() => {
      const x = new hm(m.current, {
        onValueChange: (T) => {
          j.current = T, C.current.onValueChange?.(T);
        },
        onSelectionChange: (T) => {
          C.current.onSelectionChange?.(T);
        },
        onToolChange: (T) => {
          C.current.onToolChange?.(T);
        },
        onUndoStateChange: (T, L) => {
          C.current.onUndoStateChange?.(T, L);
        },
        onTextRequest: (T) => C.current.onTextRequest?.(T)
      });
      return v.current = x, E('DrawingEditor callback "onMount"', g, {
        Editor: x,
        // grants access to the full internal API
        focus: () => x.View.focus(),
        getValue: () => x.getValue(),
        setValue: (T) => {
          x.setValue(T), j.current = T;
        },
        Tool: () => x.Tool,
        setTool: (T) => x.setTool(T),
        Style: () => x.getStyle(),
        setStyle: (T) => x.setStyle(T),
        SelectionStyle: () => x.SelectionStyle(),
        SelectedIds: () => x.SelectedIds(),
        select: (T) => x.selectIds(T),
        selectAll: () => x.selectAll(),
        deselectAll: () => x.clearSelection(),
        deleteSelection: () => x.deleteSelection(),
        toggleClosed: () => x.toggleClosed(),
        group: () => x.groupSelection(),
        ungroup: () => x.ungroupSelection(),
        bringToFront: () => x.bringToFront(),
        sendToBack: () => x.sendToBack(),
        raise: () => x.raiseSelection(),
        lower: () => x.lowerSelection(),
        copy: () => x.copySelection(),
        cut: () => x.cutSelection(),
        paste: () => x.pasteClipboard(),
        duplicate: () => x.duplicateSelection(),
        undo: () => x.undo(),
        canUndo: () => x.canUndo(),
        redo: () => x.redo(),
        canRedo: () => x.canRedo(),
        ViewBox: () => ({ ...x.ViewBox }),
        setViewBox: (T) => x.setViewBox(T),
        ZoomFactor: () => x.ZoomFactor(),
        setZoom: (T) => x.setZoom(T),
        zoomToFit: () => x.zoomToFit(),
        insertText: (T, L, $) => x.insertText(T, L, $)
      }), () => {
        E(
          'DrawingEditor callback "onUnmount"',
          C.current.onUnmount
        ), v.current = void 0, x.destroy();
      };
    }, []), je(() => {
      const x = v.current;
      x != null && (x.readonly = o, o && (x.cancelPolyline(), x.DragState = void 0));
    }, [o]), je(() => {
      const x = v.current;
      x != null && (x.Size = { Width: a, Height: i }, x.setViewBox({ x: 0, y: 0, Width: a, Height: i }));
    }, [a, i]), je(() => {
      const x = v.current;
      x != null && (x.GridSize = s, x.snapToGrid = l, x.showsGrid = d, x.refreshGrid());
    }, [s, l, d]), je(() => {
      const x = v.current;
      if (!(x == null || n == null) && x.getValue() !== j.current)
        try {
          x.setValue(j.current);
        } catch (w) {
          console.warn("DrawingEditor: invalid value given", w);
        }
    }, [n]), b`<div
        class="jcl-component drawingeditor ${r ? "disabled" : ""} ${t}"
        ...${e.RestProps} ref=${m}
      />`;
  });
}
const jc = /* @__PURE__ */ Z("jcl-component.drawingeditor", `
    .jcl-component.drawingeditor {
      display:flex !important; flex-flow:column nowrap !important;
        align-items:stretch !important;
      position:relative; overflow:hidden;
      border:solid 1px #888888; border-radius:2px;
      background:white; color:black;
    }

    .jcl-component.drawingeditor > .jcl-de-view {
      flex:1 1 auto; overflow:hidden;
      width:100%; height:100%;
      outline:none; touch-action:none;
    }
    .jcl-component.drawingeditor > .jcl-de-view:focus {
      outline:solid 2px #6366f1; outline-offset:-2px;
    }

    .jcl-component.drawingeditor .jcl-de-grid,
    .jcl-component.drawingeditor .jcl-de-overlay {
      pointer-events:none;
    }
    .jcl-component.drawingeditor .jcl-de-frame {
      fill:none; stroke:#6366f1; stroke-dasharray:4 3;
    }
    .jcl-component.drawingeditor .jcl-de-handle {
      fill:white; stroke:#6366f1; pointer-events:all;
    }
    .jcl-component.drawingeditor .jcl-de-handle[data-handle="rotate"],
    .jcl-component.drawingeditor .jcl-de-handle[data-point-index],
    .jcl-component.drawingeditor .jcl-de-handle[data-control-index],
    .jcl-component.drawingeditor .jcl-de-handle[data-midpoint-index] { cursor:move }
    .jcl-component.drawingeditor .jcl-de-rubberband {
      fill:rgba(99,102,241,0.1); stroke:#6366f1; stroke-dasharray:4 3;
    }
    .jcl-component.drawingeditor .jcl-de-guide {
      fill:none; stroke:#6366f1;
    }

    .jcl-component.drawingeditor.disabled {
      opacity:0.6; pointer-events:none;
    }

    @media (prefers-contrast: more) {
      .jcl-component.drawingeditor > .jcl-de-view:focus { outline:solid 3px currentColor }
    }
  `), mm = [
  "brush",
  "eraser",
  "line",
  "rectangle",
  "filledRectangle",
  "ellipse",
  "filledEllipse",
  "text",
  "fill",
  "eyeDropper",
  "pan",
  "select"
];
class bm {
  /**** document and layer model ****/
  Width = 0;
  Height = 0;
  LayerList = [];
  activeLayerIndex = -1;
  CallbackSet = {};
  // patched from the outside, if need be
  #w = 0;
  /**** activeLayer ****/
  get activeLayer() {
    return this.LayerList[this.activeLayerIndex];
  }
  /**** initialiseDocument ****/
  initialiseDocument(t, n) {
    Un("document width", t), Un("document height", n), this.Width = t, this.Height = n, this.LayerList = [], this.activeLayerIndex = -1, this.newLayerNamed("Background"), this.requestRendering();
  }
  /**** newLayerNamed ****/
  newLayerNamed(t, n = this.LayerList.length) {
    an("layer name", t);
    const o = new OffscreenCanvas(this.Width, this.Height), r = o.getContext("2d");
    r == null && ce(
      "CanvasFailure: could not create a 2d rendering context"
    );
    const a = {
      Id: `layer-${++this.#w}`,
      Name: t,
      isVisible: !0,
      Opacity: 1,
      BlendMode: "source-over",
      Canvas: o,
      Context: r
    };
    return this.LayerList.splice(n, 0, a), this.activeLayerIndex = this.LayerList.indexOf(a), this.requestRendering(), a;
  }
  /**** removeLayer ****/
  removeLayer(t) {
    const n = this.LayerList.indexOf(t);
    n < 0 || (this.LayerList.splice(n, 1), this.activeLayerIndex = Math.min(
      this.activeLayerIndex,
      this.LayerList.length - 1
    ), this.requestRendering());
  }
  /**** configureLayer - patches visibility, opacity and blend mode ****/
  configureLayer(t, n) {
    const { isVisible: o, Opacity: r, BlendMode: a } = n;
    o != null && (t.isVisible = o == !0), r != null && (t.Opacity = Math.max(0, Math.min(r, 1))), a != null && (t.BlendMode = a), this.requestRendering();
  }
  /**** rendering and compositing ****/
  ViewCanvas = void 0;
  #d = void 0;
  #r = !1;
  /**** requestRendering - renders at most once per animation frame ****/
  requestRendering() {
    this.#r || this.ViewCanvas == null || (this.#r = !0, requestAnimationFrame(() => {
      this.#r = !1, this.render();
    }));
  }
  /**** render ****/
  render() {
    const t = this.ViewCanvas, n = this.#d;
    if (t == null || n == null)
      return;
    const o = window.devicePixelRatio ?? 1;
    n.setTransform(1, 0, 0, 1, 0, 0), n.clearRect(0, 0, t.width, t.height);
    const r = this.ZoomFactor * o;
    n.setTransform(
      r,
      0,
      0,
      r,
      -this.OffsetX * r,
      -this.OffsetY * r
    ), n.imageSmoothingEnabled = this.ZoomFactor < 1, this.LayerList.forEach((a) => {
      a.isVisible && (n.globalAlpha = a.Opacity, n.globalCompositeOperation = a.BlendMode, n.drawImage(a.Canvas, 0, 0));
    }), n.globalAlpha = 1, n.globalCompositeOperation = "source-over", this.renderOverlay(n);
  }
  /**** viewport handling ****/
  OffsetX = 0;
  // in document coordinates
  OffsetY = 0;
  ZoomFactor = 1;
  /**** attachTo - binds this editor to its (visible) view canvas ****/
  attachTo(t) {
    Ic(), this.ViewCanvas = t, this.#d = t.getContext("2d") ?? void 0, this.#d == null && ce(
      "CanvasFailure: could not create a 2d rendering context"
    ), this.installInputHandlersOn(t), this.resizeViewCanvas();
  }
  /**** resizeViewCanvas - keeps the canvas backing store HiDPI-crisp ****/
  resizeViewCanvas() {
    const t = this.ViewCanvas;
    if (t == null)
      return;
    const n = window.devicePixelRatio ?? 1, { width: o, height: r } = t.getBoundingClientRect();
    t.width = Math.round(o * n), t.height = Math.round(r * n), this.requestRendering();
  }
  /**** DocumentPointFor - maps view coordinates to document coordinates ****/
  DocumentPointFor(t, n) {
    return {
      x: t / this.ZoomFactor + this.OffsetX,
      y: n / this.ZoomFactor + this.OffsetY
    };
  }
  /**** panBy - shifts the viewport by the given view distances ****/
  panBy(t, n) {
    this.OffsetX += t / this.ZoomFactor, this.OffsetY += n / this.ZoomFactor, this.reportViewportChange(), this.requestRendering();
  }
  /**** zoomTo - zooms the viewport, keeping a given view point stable ****/
  zoomTo(t, n, o) {
    const r = Math.max(0.05, Math.min(t, 32));
    if (n != null && o != null) {
      const a = this.DocumentPointFor(n, o);
      this.OffsetX = a.x - n / r, this.OffsetY = a.y - o / r;
    }
    this.ZoomFactor = r, this.reportViewportChange(), this.requestRendering();
  }
  /**** reportViewportChange ****/
  reportViewportChange() {
    E(
      'BitmapEditor callback "onViewportChange"',
      this.CallbackSet.onViewportChange,
      this.OffsetX,
      this.OffsetY,
      this.ZoomFactor
    );
  }
  /**** pointer and wheel input handling ****/
  currentTool = "brush";
  currentColor = "#000000";
  // a.k.a. the "foreground" colour
  backgroundColor = "#ffffff";
  // used by right-click, cut, delete etc.
  BrushSize = 10;
  BrushOpacity = 1;
  #u = void 0;
  #t = !1;
  #n = void 0;
  #a = void 0;
  // per-stroke colour (FG or BG)
  #h = void 0;
  // for filled shapes (BG or FG)
  #s = void 0;
  /**** installInputHandlersOn ****/
  installInputHandlersOn(t) {
    this.#u?.abort(), this.#u = new AbortController();
    const { signal: n } = this.#u;
    t.addEventListener(
      "pointerdown",
      (o) => this.#i(o),
      { signal: n }
    ), t.addEventListener(
      "pointermove",
      (o) => this.#$(o),
      { signal: n }
    ), t.addEventListener(
      "pointerup",
      (o) => this.#g(o),
      { signal: n }
    ), t.addEventListener(
      "pointercancel",
      (o) => this.#g(o),
      { signal: n }
    ), t.addEventListener(
      "wheel",
      (o) => this.#_(o),
      { passive: !1, signal: n }
    ), t.addEventListener(
      // the right button paints, thus, do not open
      "contextmenu",
      (o) => o.preventDefault(),
      { signal: n }
      // any menu
    );
  }
  /**** #onPointerDown ****/
  #i(t) {
    const n = this.ViewCanvas;
    if (n == null)
      return;
    n.setPointerCapture(t.pointerId), this.#t = !0;
    const o = t.button === 2;
    this.#a = // like MS Paint: the right button swaps the
    o ? this.backgroundColor : this.currentColor, this.#h = o ? this.currentColor : this.backgroundColor;
    const r = this.DocumentPointFor(t.offsetX, t.offsetY);
    switch (this.#n = r, this.currentTool) {
      case "brush":
      case "eraser":
        this.memoizeLayerForUndo(), this.beginStrokeAt(r, t.pressure);
        break;
      case "line":
      case "rectangle":
      case "ellipse":
      case "filledRectangle":
      case "filledEllipse":
        this.memoizeLayerForUndo(), this.beginShapeAt(r);
        break;
      case "text":
        this.enterTextAt(r, this.#a);
        break;
      // pointer handling need not wait
      case "fill":
        this.memoizeLayerForUndo(), this.fillAt(r, this.#a);
        break;
      case "eyeDropper":
        this.pickColorAt(r, o);
        break;
      case "select":
        this.#p(r);
        break;
    }
    t.preventDefault();
  }
  /**** #beginSelectionDragAt - moves a floating bitmap, lifts a selected ****/
  /**** region or starts a new selection frame (just like MS Paint)       ****/
  #p(t) {
    switch (!0) {
      case this.#C(t):
        this.#s = "floating";
        break;
      case this.FloatingBitmap != null:
        this.anchorFloatingBitmap(), this.beginSelectionAt(t), this.#s = "selection";
        break;
      case this.#k(t):
        this.liftSelection(), this.#s = "floating";
        break;
      default:
        this.beginSelectionAt(t), this.#s = "selection";
    }
  }
  #k(t) {
    const n = this.Selection;
    return n != null && t.x >= n.x && t.x < n.x + n.Width && t.y >= n.y && t.y < n.y + n.Height;
  }
  #C(t) {
    const n = this.FloatingBitmap;
    return n != null && t.x >= n.x && t.x < n.x + n.Canvas.width && t.y >= n.y && t.y < n.y + n.Canvas.height;
  }
  /**** #onPointerMove ****/
  #$(t) {
    if (this.#t) {
      switch (this.currentTool) {
        case "brush":
        case "eraser": {
          (t.getCoalescedEvents?.() ?? [t]).forEach((o) => this.continueStrokeAt(
            this.DocumentPointFor(o.offsetX, o.offsetY),
            o.pressure
          ));
          break;
        }
        case "line":
        case "rectangle":
        case "ellipse":
        case "filledRectangle":
        case "filledEllipse":
          this.continueShapeAt(this.DocumentPointFor(t.offsetX, t.offsetY));
          break;
        case "select": {
          const n = this.DocumentPointFor(t.offsetX, t.offsetY);
          if (this.#s === "floating") {
            const o = this.#n ?? n;
            this.moveFloatingBitmapBy(
              n.x - o.x,
              n.y - o.y
            ), this.#n = n;
          } else
            this.continueSelectionAt(n);
          break;
        }
        case "pan":
          this.panBy(-t.movementX, -t.movementY);
          break;
      }
      t.preventDefault();
    }
  }
  /**** #onPointerUp ****/
  #g(t) {
    if (this.#t) {
      switch (this.#t = !1, this.currentTool) {
        case "brush":
        case "eraser":
          this.endStroke();
          break;
        case "line":
        case "rectangle":
        case "ellipse":
        case "filledRectangle":
        case "filledEllipse":
          this.endShape();
          break;
        case "select":
          this.#s !== "floating" && this.endSelection();
          break;
      }
      this.#s = void 0, this.#a = void 0, this.#h = void 0, t.preventDefault();
    }
  }
  /**** #onWheel - zooms around the current pointer position ****/
  #_(t) {
    const n = this.ZoomFactor * (t.deltaY < 0 ? 1.1 : 0.9090909090909091);
    this.zoomTo(n, t.offsetX, t.offsetY), t.preventDefault();
  }
  /**** destroy ****/
  destroy() {
    this.#u?.abort(), this.ViewCanvas = void 0, this.#d = void 0;
  }
  /**** brush engine - stamp-based and pressure-aware ****/
  beginStrokeAt(t, n = 0.5) {
    const o = this.activeLayer;
    o != null && (this.#m(o.Context, t, n), this.#n = t, this.requestRendering());
  }
  /**** continueStrokeAt ****/
  continueStrokeAt(t, n = 0.5) {
    const o = this.activeLayer, r = this.#n;
    if (o == null || r == null)
      return;
    const a = Math.hypot(t.x - r.x, t.y - r.y), i = Math.max(this.BrushSize / 4, 1), s = Math.max(Math.ceil(a / i), 1);
    for (let l = 1; l <= s; l++)
      this.#m(o.Context, {
        x: r.x + (t.x - r.x) * l / s,
        y: r.y + (t.y - r.y) * l / s
      }, n);
    this.#n = t, this.requestRendering();
  }
  /**** endStroke ****/
  endStroke() {
    this.#n = void 0, this.reportValueChange();
  }
  /**** #stampOn - a single (round) brush stamp, using the per-stroke  ****/
  /**** colour (foreground or background, depending on the button) -   ****/
  /**** painting with "transparent" erases instead                     ****/
  // custom brush tips, textures and stroke smoothing are still missing <<<<
  #m(t, n, o) {
    const r = this.#a ?? this.currentColor, a = this.currentTool === "eraser" || r === "transparent";
    t.save(), this.applySelectionClippingTo(t), t.globalAlpha = this.BrushOpacity, t.globalCompositeOperation = a ? "destination-out" : "source-over", t.fillStyle = a ? "#000000" : r, t.beginPath(), t.arc(n.x, n.y, this.BrushSize / 2 * (0.5 + o), 0, 2 * Math.PI), t.fill(), t.restore();
  }
  /**** reportValueChange ****/
  reportValueChange() {
    E(
      'BitmapEditor callback "onValueChange"',
      this.CallbackSet.onValueChange
    );
  }
  /**** shape tools - preview while dragging, committed upon release ****/
  #c = void 0;
  #f = void 0;
  beginShapeAt(t) {
    this.#c = t, this.#f = t, this.requestRendering();
  }
  continueShapeAt(t) {
    this.#c != null && (this.#f = t, this.requestRendering());
  }
  endShape() {
    const t = this.activeLayer;
    t == null || this.#c == null || (t.Context.save(), this.applySelectionClippingTo(t.Context), this.drawPendingShapeOn(t.Context), t.Context.restore(), this.#c = this.#f = void 0, this.requestRendering(), this.reportValueChange());
  }
  /**** drawPendingShapeOn - strokes with the per-stroke colour          ****/
  /**** (foreground or background, depending on the button), "filled"    ****/
  /**** variants fill with the respective other colour (like MS Paint) - ****/
  /**** "transparent" as a colour erases instead (previews on the view   ****/
  /**** canvas then punch a hole into the composite which reveals the    ****/
  /**** CSS background underneath, i.e. the expected outcome)            ****/
  drawPendingShapeOn(t) {
    const n = this.#c, o = this.#f;
    if (n == null || o == null)
      return;
    const r = this.#a ?? this.currentColor, a = this.#h ?? this.backgroundColor, i = this.currentTool === "filledRectangle" || this.currentTool === "filledEllipse";
    switch (t.save(), t.lineWidth = this.BrushSize, t.globalAlpha = this.BrushOpacity, t.beginPath(), this.currentTool) {
      case "line":
        t.moveTo(n.x, n.y), t.lineTo(o.x, o.y);
        break;
      case "rectangle":
      case "filledRectangle":
        t.rect(
          Math.min(n.x, o.x),
          Math.min(n.y, o.y),
          Math.abs(o.x - n.x),
          Math.abs(o.y - n.y)
        );
        break;
      case "ellipse":
      case "filledEllipse":
        t.ellipse(
          (n.x + o.x) / 2,
          (n.y + o.y) / 2,
          Math.abs(o.x - n.x) / 2,
          Math.abs(o.y - n.y) / 2,
          0,
          0,
          2 * Math.PI
        );
        break;
    }
    i && (t.globalCompositeOperation = a === "transparent" ? "destination-out" : "source-over", t.fillStyle = a === "transparent" ? "#000000" : a, t.fill()), t.globalCompositeOperation = r === "transparent" ? "destination-out" : "source-over", t.strokeStyle = r === "transparent" ? "#000000" : r, t.stroke(), t.restore();
  }
  /**** text tool - the text itself is provided from the outside (via ****/
  /**** the "onTextRequest" callback), the engine renders it into a   ****/
  /**** floating bitmap which may then be dragged into place          ****/
  FontFamily = "sans-serif";
  FontSize = 24;
  // in document pixels
  FontWeight = "normal";
  FontStyle = "normal";
  lastText = "";
  // will be preset in the next text request
  /**** CSSFont - the settings above as a CSS font specification ****/
  get CSSFont() {
    return `${this.FontStyle} ${this.FontWeight} ${this.FontSize}px ${this.FontFamily}`;
  }
  /**** enterTextAt - asks the environment for a text and renders it into ****/
  /**** a floating bitmap with its top-left corner at the given point     ****/
  async enterTextAt(t, n = this.currentColor) {
    const o = this.activeLayer, r = this.CallbackSet.onTextRequest;
    if (!(o == null || r == null))
      try {
        const a = await r(this.lastText);
        if (a == null || a === "")
          return;
        if (this.lastText = a, n === "transparent") {
          this.#D(t, a);
          return;
        }
        this.floatBitmap(this.#S(a, n), t.x, t.y);
      } catch (a) {
        console.error("BitmapEditor: text entry failed", a);
      }
  }
  /**** #renderedText - renders a given text into a (floatable) bitmap ****/
  #S(t, n) {
    const o = t.split(`
`), r = this.FontSize * 1.2, i = new OffscreenCanvas(1, 1).getContext("2d");
    i.font = this.CSSFont;
    const s = Math.max(1, Math.ceil(Math.max(
      ...o.map((p) => i.measureText(p).width)
    )) + Math.ceil(this.FontSize * 0.2)), l = Math.max(1, Math.ceil(o.length * r)), d = new OffscreenCanvas(s, l), u = d.getContext("2d");
    return u.globalAlpha = this.BrushOpacity, u.fillStyle = n, u.font = this.CSSFont, u.textBaseline = "top", o.forEach((p, c) => {
      u.fillText(p, 0, c * r);
    }), d;
  }
  /**** #drawTextDirectlyAt - "erasing" text bypasses any floating and ****/
  /**** is drawn (i.e. erased) right away                              ****/
  #D(t, n) {
    const o = this.activeLayer;
    if (o == null)
      return;
    this.memoizeLayerForUndo();
    const r = o.Context;
    r.save(), this.applySelectionClippingTo(r), r.globalAlpha = this.BrushOpacity, r.globalCompositeOperation = "destination-out", r.fillStyle = "#000000", r.font = this.CSSFont, r.textBaseline = "top", n.split(`
`).forEach((a, i) => {
      r.fillText(a, t.x, t.y + i * this.FontSize * 1.2);
    }), r.restore(), this.requestRendering(), this.reportValueChange();
  }
  /**** fillAt - a simple 4-connected flood fill ****/
  // TODO: fill tolerance and anti-aliased edges are still missing <<<<
  fillAt(t, n = this.currentColor) {
    const o = this.activeLayer;
    if (o == null)
      return;
    const { Width: r, Height: a } = this, i = Math.floor(t.x), s = Math.floor(t.y);
    if (i < 0 || i >= r || s < 0 || s >= a)
      return;
    const l = o.Context.getImageData(0, 0, r, a), d = new Uint32Array(l.data.buffer), u = this.#L(n), p = d[s * r + i];
    if (p === u)
      return;
    const c = [s * r + i];
    for (; c.length > 0; ) {
      const f = c.pop();
      if (d[f] !== p)
        continue;
      d[f] = u;
      const h = f % r;
      h > 0 && c.push(f - 1), h < r - 1 && c.push(f + 1), f >= r && c.push(f - r), f < r * (a - 1) && c.push(f + r);
    }
    o.Context.putImageData(l, 0, 0), this.requestRendering(), this.reportValueChange();
  }
  /**** pickColorAt - picks from the composited document, optionally   ****/
  /**** for the background colour (i.e. after a right-click) - fully   ****/
  /**** transparent pixels are reported as "transparent", partially    ****/
  /**** transparent ones as "#RRGGBBAA" and opaque ones as "#RRGGBB"   ****/
  pickColorAt(t, n = !1) {
    const r = this.compositedCanvas().getContext("2d"), [a, i, s, l] = r.getImageData(
      Math.floor(t.x),
      Math.floor(t.y),
      1,
      1
    ).data, d = (p) => p.toString(16).padStart(2, "0");
    let u;
    switch (!0) {
      case l === 0:
        u = "transparent";
        break;
      case l === 255:
        u = `#${d(a)}${d(i)}${d(s)}`;
        break;
      default:
        u = `#${d(a)}${d(i)}${d(s)}${d(l)}`;
    }
    E(
      'BitmapEditor callback "onColorPicked"',
      this.CallbackSet.onColorPicked,
      u,
      n
    );
  }
  /**** #ABGRValueOf - converts a CSS colour into a little-endian pixel ****/
  #L(t) {
    const o = new OffscreenCanvas(1, 1).getContext("2d");
    o.fillStyle = t, o.fillRect(0, 0, 1, 1);
    const [r, a, i, s] = o.getImageData(0, 0, 1, 1).data;
    return (s << 24 | i << 16 | a << 8 | r) >>> 0;
  }
  /**** selection handling - rectangular selections only, for now ****/
  // TODO: lasso and "magic wand" selections (i.e. masks) are still missing <<<<
  Selection = void 0;
  #b = void 0;
  beginSelectionAt(t) {
    this.#b = t, this.continueSelectionAt(t);
  }
  continueSelectionAt(t) {
    const n = this.#b;
    n != null && (this.Selection = {
      x: Math.min(n.x, t.x),
      y: Math.min(n.y, t.y),
      Width: Math.abs(t.x - n.x),
      Height: Math.abs(t.y - n.y)
    }, this.requestRendering());
  }
  endSelection() {
    this.#b = void 0;
    const t = this.Selection;
    t != null && (t.Width < 1 || t.Height < 1) && (this.Selection = void 0), this.reportSelectionChange(), this.requestRendering();
  }
  clearSelection() {
    this.Selection = void 0, this.reportSelectionChange(), this.requestRendering();
  }
  /**** applySelectionClippingTo - restricts painting to the selection ****/
  applySelectionClippingTo(t) {
    const n = this.Selection;
    n != null && (t.beginPath(), t.rect(n.x, n.y, n.Width, n.Height), t.clip());
  }
  /**** renderOverlay - floating bitmap, selection marquee and pending ****/
  /**** shape previews                                                 ****/
  renderOverlay(t) {
    this.#c != null && this.drawPendingShapeOn(t);
    const n = this.FloatingBitmap;
    n != null && t.drawImage(n.Canvas, n.x, n.y);
    const o = this.Selection;
    o != null && (t.save(), t.lineWidth = 1 / this.ZoomFactor, t.setLineDash([4 / this.ZoomFactor, 4 / this.ZoomFactor]), t.strokeStyle = "#ffffff", t.strokeRect(
      o.x,
      o.y,
      o.Width,
      o.Height
    ), t.strokeStyle = "#000000", t.lineDashOffset = 4 / this.ZoomFactor, t.strokeRect(
      o.x,
      o.y,
      o.Width,
      o.Height
    ), t.restore());
  }
  /**** reportSelectionChange ****/
  reportSelectionChange() {
    E(
      'BitmapEditor callback "onSelectionChange"',
      this.CallbackSet.onSelectionChange,
      this.Selection
    );
  }
  /**** clipboard operations - editor-internal clipboard, for now ****/
  // system clipboard integration ("navigator.clipboard") is still missing <<<<
  #y = void 0;
  #o = void 0;
  get canCopy() {
    return this.Selection != null && this.activeLayer != null;
  }
  get canPaste() {
    return this.#y != null;
  }
  get FloatingBitmap() {
    return this.#o;
  }
  /**** #normalizedSelection - integer bounds, clamped to the document ****/
  #x() {
    const t = this.Selection;
    if (t == null)
      return;
    const n = Math.max(0, Math.round(t.x)), o = Math.max(0, Math.round(t.y)), r = Math.min(Math.round(t.Width), this.Width - n), a = Math.min(Math.round(t.Height), this.Height - o);
    return r > 0 && a > 0 ? { x: n, y: o, Width: r, Height: a } : void 0;
  }
  /**** #fillRegionOn - fills with the background colour (Paint-style), ****/
  /**** or clears the region if that colour is "transparent"            ****/
  #j(t, n) {
    this.backgroundColor === "transparent" ? t.clearRect(n.x, n.y, n.Width, n.Height) : (t.save(), t.fillStyle = this.backgroundColor, t.fillRect(n.x, n.y, n.Width, n.Height), t.restore());
  }
  /**** copySelection - copies from the active layer, not the composite ****/
  copySelection() {
    const t = this.activeLayer, n = this.#x();
    if (t == null || n == null)
      return;
    const { x: o, y: r, Width: a, Height: i } = n, s = new OffscreenCanvas(a, i);
    s.getContext("2d").drawImage(t.Canvas, o, r, a, i, 0, 0, a, i), this.#y = { Canvas: s, x: o, y: r };
  }
  /**** cutSelection / deleteSelection - both fill with the background ****/
  /**** colour, just like MS Paint                                     ****/
  cutSelection() {
    this.canCopy && (this.copySelection(), this.deleteSelection());
  }
  deleteSelection() {
    const t = this.activeLayer, n = this.#x();
    t == null || n == null || (this.memoizeLayerForUndo(), this.#j(t.Context, n), this.requestRendering(), this.reportValueChange());
  }
  /**** floatBitmap - makes a given bitmap "float" at a given position, ****/
  /**** from where it may be dragged around until it is finally         ****/
  /**** anchored (a click outside anchors it as well)                   ****/
  floatBitmap(t, n, o) {
    this.anchorFloatingBitmap(), this.#o = { Canvas: t, x: Math.round(n), y: Math.round(o) }, this.currentTool = "select", this.#v(), this.requestRendering();
  }
  /**** pasteClipboard - creates a "floating" bitmap in the visible corner ****/
  pasteClipboard() {
    const t = this.#y;
    t != null && this.floatBitmap(
      t.Canvas,
      Math.max(0, Math.round(this.OffsetX)),
      Math.max(0, Math.round(this.OffsetY))
    );
  }
  /**** liftSelection - turns the selected region into a floating bitmap, ****/
  /**** filling its origin with the background colour (like MS Paint)     ****/
  liftSelection() {
    const t = this.activeLayer, n = this.#x();
    if (t == null || n == null)
      return;
    const { x: o, y: r, Width: a, Height: i } = n, s = new OffscreenCanvas(a, i);
    s.getContext("2d").drawImage(t.Canvas, o, r, a, i, 0, 0, a, i), this.memoizeLayerForUndo(), this.#j(t.Context, n), this.#o = { Canvas: s, x: o, y: r }, this.#v(), this.requestRendering(), this.reportValueChange();
  }
  /**** moveFloatingBitmapBy ****/
  moveFloatingBitmapBy(t, n) {
    const o = this.#o;
    o != null && (o.x += t, o.y += n, this.#v(), this.requestRendering());
  }
  /**** anchorFloatingBitmap - draws the floating bitmap onto the layer ****/
  anchorFloatingBitmap() {
    const t = this.activeLayer, n = this.#o;
    t == null || n == null || (this.memoizeLayerForUndo(), t.Context.drawImage(n.Canvas, n.x, n.y), this.#o = void 0, this.requestRendering(), this.reportValueChange());
  }
  /**** dropFloatingBitmap - discards the floating bitmap ****/
  dropFloatingBitmap() {
    this.#o != null && (this.#o = void 0, this.clearSelection());
  }
  /**** #syncSelectionWithFloatingBitmap - the selection frame always ****/
  /**** surrounds a floating bitmap while one exists                  ****/
  #v() {
    const t = this.#o;
    t != null && (this.Selection = {
      x: t.x,
      y: t.y,
      Width: t.Canvas.width,
      Height: t.Canvas.height
    }, this.reportSelectionChange());
  }
  /**** change history - full-layer snapshots, for now ****/
  // tile- or region-based deltas would reduce the memory footprint <<<<
  #e = [];
  #l = [];
  #I = 50;
  get canUndo() {
    return this.#e.length > 0;
  }
  get canRedo() {
    return this.#l.length > 0;
  }
  /**** memoizeLayerForUndo - snapshots the active layer before a change ****/
  memoizeLayerForUndo() {
    const t = this.activeLayer;
    t != null && (this.#e.push({
      Layer: t,
      Snapshot: t.Context.getImageData(0, 0, this.Width, this.Height)
    }), this.#e.length > this.#I && this.#e.shift(), this.#l.length = 0, this.reportUndoStateChange());
  }
  /**** undo/redo ****/
  undo() {
    this.#M(this.#e, this.#l);
  }
  redo() {
    this.#M(this.#l, this.#e);
  }
  #M(t, n) {
    const o = t.pop();
    if (o == null)
      return;
    const { Layer: r, Snapshot: a } = o;
    n.push({
      Layer: r,
      Snapshot: r.Context.getImageData(0, 0, this.Width, this.Height)
    }), r.Context.putImageData(a, 0, 0), this.reportUndoStateChange(), this.requestRendering(), this.reportValueChange();
  }
  /**** reportUndoStateChange ****/
  reportUndoStateChange() {
    E(
      'BitmapEditor callback "onUndoStateChange"',
      this.CallbackSet.onUndoStateChange,
      this.canUndo,
      this.canRedo
    );
  }
  /**** compositedCanvas - all visible layers flattened into one canvas ****/
  compositedCanvas() {
    const t = new OffscreenCanvas(this.Width, this.Height), n = t.getContext("2d");
    return this.LayerList.forEach((o) => {
      o.isVisible && (n.globalAlpha = o.Opacity, n.globalCompositeOperation = o.BlendMode, n.drawImage(o.Canvas, 0, 0));
    }), t;
  }
  /**** exportedBlob ****/
  async exportedBlob(t = "image/png", n) {
    return await this.compositedCanvas().convertToBlob({
      type: t,
      quality: n
    });
  }
  /**** importImage - draws a given image onto the active layer ****/
  async importImage(t) {
    const n = this.activeLayer;
    if (n != null)
      try {
        const o = await createImageBitmap(
          t instanceof Blob ? t : await (await fetch(t)).blob()
        );
        this.memoizeLayerForUndo(), n.Context.drawImage(o, 0, 0), o.close(), this.requestRendering(), this.reportValueChange();
      } catch (o) {
        ce(`ImportFailure: could not import the given image (${o})`);
      }
  }
  /**** #DataURLFor - converts a given blob into a data URL ****/
  async #A(t) {
    return await new Promise((n, o) => {
      const r = new FileReader();
      r.onload = () => n(r.result), r.onerror = () => o(new Error("could not read the given blob")), r.readAsDataURL(t);
    });
  }
  /**** getDocument - serialises the complete layer structure ****/
  // the format is self-describing JSON with one (lossless) PNG data URL per
  // layer - suitable for interrupting and resuming a painting session
  async getDocument() {
    const t = await Promise.all(this.LayerList.map(
      async (n) => ({
        Name: n.Name,
        isVisible: n.isVisible,
        Opacity: n.Opacity,
        BlendMode: n.BlendMode,
        Bitmap: await this.#A(
          await n.Canvas.convertToBlob({ type: "image/png" })
        )
      })
    ));
    return JSON.stringify({
      Format: "jcl-bitmap-document@1",
      Width: this.Width,
      Height: this.Height,
      activeLayerIndex: this.activeLayerIndex,
      Layers: t
    });
  }
  /**** setDocument - restores a formerly serialised layer structure ****/
  // replaces the current document and clears the change history - without
  // firing "onValueChange" (like "setValue" in the DrawingEditor)
  async setDocument(t) {
    let n = t;
    if (at(n))
      try {
        n = JSON.parse(n);
      } catch {
        ce("InvalidArgument: the given document is no valid JSON");
      }
    (!De(n) || n.Format !== "jcl-bitmap-document@1" || !pn(n.Width) || !pn(n.Height) || !Ie(n.Layers, De) || n.Layers.length === 0) && ce(
      "InvalidArgument: the given document is no valid bitmap document"
    );
    const o = await Promise.all(n.Layers.map(
      async (r) => {
        if (r.Bitmap != null)
          try {
            return await createImageBitmap(
              await (await fetch(r.Bitmap)).blob()
            );
          } catch (a) {
            ce(`ImportFailure: could not decode a layer bitmap (${a})`);
          }
      }
    ));
    this.Width = n.Width, this.Height = n.Height, this.LayerList = [], this.activeLayerIndex = -1, n.Layers.forEach((r, a) => {
      const i = this.newLayerNamed(
        Ne(r.Name) ? r.Name : "Layer " + (a + 1)
      );
      this.configureLayer(i, r);
      const s = o[a];
      s != null && (i.Context.drawImage(s, 0, 0), s.close());
    }), this.activeLayerIndex = pn(n.activeLayerIndex) ? Math.min(n.activeLayerIndex, this.LayerList.length - 1) : this.LayerList.length - 1, this.#e.length = 0, this.#l.length = 0, this.reportUndoStateChange(), this.requestRendering();
  }
  /**** setValue - accepts a layer document or a plain image data URL ****/
  // a plain bitmap becomes a single-layer document of the bitmap's own size
  async setValue(t) {
    if (ot("bitmap editor value", t), t.trim().startsWith("{"))
      return await this.setDocument(t);
    try {
      const n = await createImageBitmap(await (await fetch(t)).blob());
      this.Width = n.width, this.Height = n.height, this.LayerList = [], this.activeLayerIndex = -1, this.newLayerNamed("Background").Context.drawImage(n, 0, 0), n.close();
    } catch (n) {
      ce(`ImportFailure: could not import the given image (${n})`);
    }
    this.#e.length = 0, this.#l.length = 0, this.reportUndoStateChange(), this.requestRendering();
  }
  /**** Snapshot - flattens all visible layers into a single bitmap ****/
  // "Type" may be "png", "jpeg" or "webp" (GIF is deliberately unsupported -
  // "convertToBlob" cannot encode it), "BackgroundColor" fills the ground
  // ("transparent" or "none" keep the alpha channel, JPEG snapshots default
  // to white), "Width"/"Height" scale the result (a single dimension keeps
  // the aspect ratio)
  async Snapshot(t) {
    const { Type: n, Quality: o, BackgroundColor: r, Width: a, Height: i } = t ?? {};
    n != null && !he(n, ["png", "jpeg", "webp"]) && ce(
      "InvalidArgument: unsupported image type " + Lt("" + n)
    );
    const s = n ?? "png", l = nn(o, 0, 1), d = (v) => {
      const C = $e(v);
      return C == null || C < 1 ? void 0 : C;
    }, u = d(a), p = d(i), c = u ?? (p == null ? this.Width : Math.max(1, Math.round(p * this.Width / this.Height))), f = p ?? (u == null ? this.Height : Math.max(1, Math.round(u * this.Height / this.Width)));
    let h = r;
    h == null && s === "jpeg" && (h = "#ffffff");
    const g = h != null && h !== "transparent" && h !== "none", y = new OffscreenCanvas(c, f), m = y.getContext("2d");
    return g && (m.fillStyle = St(h) ?? "#ffffff", m.fillRect(0, 0, c, f)), m.imageSmoothingEnabled = !0, m.imageSmoothingQuality = "high", m.drawImage(
      this.compositedCanvas(),
      0,
      0,
      this.Width,
      this.Height,
      0,
      0,
      c,
      f
    ), await y.convertToBlob({
      type: "image/" + s,
      quality: l
    });
  }
}
function ym(e) {
  return H(() => {
    Ic(), e = G(e);
    const t = D(e.Class) ?? "", n = $e(e.Width) ?? 800, o = $e(e.Height) ?? 600, r = re(e.Value), a = D(e.Tool) ?? "brush", i = St(e.Color) ?? "#000000", s = St(e.BackgroundColor) ?? "#ffffff", l = nn(e.BrushSize, 1, 1e3) ?? 10, d = nn(e.BrushOpacity, 0, 1) ?? 1, u = D(e.FontFamily) ?? "sans-serif", p = nn(e.FontSize, 4, 400) ?? 24, c = he(e.FontWeight, ["normal", "bold"]) ? e.FontWeight : "normal", f = he(e.FontStyle, ["normal", "italic"]) ? e.FontStyle : "normal", h = Y(e.disabled) ?? !1, g = R(e.onValueChange), y = R(e.onSelectionChange), m = R(e.onUndoStateChange), v = R(e.onColorPicked), C = R(e.onViewportChange), _ = R(e.onTextRequest), j = R(e.onMount), x = R(e.onUnmount), w = U(null), T = U(void 0), L = U({});
    return L.current = {
      onValueChange: g,
      onSelectionChange: y,
      onUndoStateChange: m,
      onColorPicked: v,
      onViewportChange: C,
      onTextRequest: _,
      onUnmount: x
    }, je(() => {
      const $ = w.current, I = document.createElement("canvas");
      $.appendChild(I);
      const M = new bm();
      M.CallbackSet = {
        onValueChange: (...N) => L.current.onValueChange?.(...N),
        onSelectionChange: (...N) => L.current.onSelectionChange?.(...N),
        onUndoStateChange: (...N) => L.current.onUndoStateChange?.(...N),
        onColorPicked: (...N) => L.current.onColorPicked?.(...N),
        onViewportChange: (...N) => L.current.onViewportChange?.(...N),
        onTextRequest: (...N) => (
          // returns the entered
          L.current.onTextRequest?.(...N)
        )
        // text!
      }, M.initialiseDocument(n, o), M.attachTo(I), r != null && M.setValue(r).catch((N) => console.warn(
        'BitmapEditor: could not apply the given "Value"',
        N
      )), T.current = M;
      const S = new ResizeObserver(() => M.resizeViewCanvas());
      return S.observe($), E('BitmapEditor callback "onMount"', j, {
        Editor: M,
        // grants access to the full engine
        undo: () => M.undo(),
        redo: () => M.redo(),
        newLayerNamed: (N) => M.newLayerNamed(N),
        importImage: (N) => M.importImage(N),
        exportedBlob: (N) => M.exportedBlob(N),
        getDocument: () => M.getDocument(),
        setDocument: (N) => M.setDocument(N),
        setValue: (N) => M.setValue(N),
        Snapshot: (N) => M.Snapshot(N),
        clearSelection: () => M.clearSelection(),
        cutSelection: () => M.cutSelection(),
        copySelection: () => M.copySelection(),
        pasteClipboard: () => M.pasteClipboard(),
        deleteSelection: () => M.deleteSelection(),
        anchorFloatingBitmap: () => M.anchorFloatingBitmap(),
        dropFloatingBitmap: () => M.dropFloatingBitmap(),
        zoomTo: (N) => M.zoomTo(N)
      }), () => {
        E(
          'BitmapEditor callback "onUnmount"',
          L.current.onUnmount
        ), S.disconnect(), T.current = void 0, M.destroy(), I.remove();
      };
    }, []), je(() => {
      const $ = T.current;
      $ != null && (mm.includes(a) && ($.currentTool = a), $.currentColor = i, $.backgroundColor = s, $.BrushSize = l, $.BrushOpacity = d, $.FontFamily = u, $.FontSize = p, $.FontWeight = c, $.FontStyle = f);
    }, [
      a,
      i,
      s,
      l,
      d,
      u,
      p,
      c,
      f
    ]), b`<div
        class="jcl-component bitmapeditor ${h ? "disabled" : ""} ${t}"
        ...${e.RestProps} ref=${w}
      />`;
  });
}
const Ic = /* @__PURE__ */ Z("jcl-component.bitmapeditor", `
    .jcl-component.bitmapeditor {
      display:block !important;
      position:relative; overflow:hidden;
      border:solid 1px #888888; border-radius:2px;
      background:#404040; touch-action:none;
    }

    .jcl-component.bitmapeditor > canvas {
      display:block; width:100%; height:100%;
    }

    .jcl-component.bitmapeditor.disabled {
      opacity:0.6; pointer-events:none;
    }
  `), xm = [
  "select",
  "rect",
  "ellipse",
  "polygon",
  "text",
  "image"
];
class wt {
  static #w = /* @__PURE__ */ new Map();
  static registerEffect(t) {
    wt.#w.set(t.Type, t);
  }
  static effectPluginFor(t) {
    return vm(), wt.#w.get(t);
  }
  /**** object and scene model ****/
  Width = 800;
  Height = 600;
  ObjectList = [];
  #d = 0;
  Callbacks = {};
  /**** initialiseScene ****/
  initialiseScene(t, n) {
    Un("scene width", t), Un("scene height", n), this.Width = t, this.Height = n, this.ObjectList = [], this.SelectedIds = [], this.Snapshots = ["[]"], this.SnapshotIndex = 0, this.requestRendering();
  }
  /**** objectWithId ****/
  objectWithId(t) {
    return this.ObjectList.find((n) => n.Id === t);
  }
  /**** addObject ****/
  addObject(t) {
    const n = {
      Id: `obj-${++this.#d}`,
      Type: t.Type ?? "rect",
      X: t.X ?? 0,
      Y: t.Y ?? 0,
      Width: t.Width ?? 100,
      Height: t.Height ?? 100,
      Rotation: t.Rotation ?? 0,
      Opacity: t.Opacity ?? 1,
      BlendMode: t.BlendMode ?? "normal",
      FillColor: t.FillColor ?? (t.Type === "text" ? "#000000" : "#ffffff"),
      StrokeColor: t.StrokeColor ?? "#000000",
      StrokeWidth: t.StrokeWidth ?? (t.Type === "text" ? 0 : 1),
      Effects: (t.Effects ?? []).map((o) => ({ ...o })),
      ...t.Type === "text" ? {
        Text: t.Text ?? "Text",
        FontFamily: t.FontFamily ?? "sans-serif",
        FontSize: t.FontSize ?? 24,
        FontWeight: t.FontWeight ?? "normal",
        FontStyle: t.FontStyle ?? "normal"
      } : {},
      ...t.Type === "image" ? { ImageData: t.ImageData ?? "" } : {},
      ...t.Type === "polygon" ? {
        Points: (t.Points ?? []).map((o) => ({ ...o }))
      } : {}
    };
    return this.ObjectList.push(n), n.Type === "image" && this.loadImageForObject(n), this.announceChange(), this.requestRendering(), n;
  }
  /**** removeObject ****/
  removeObject(t) {
    const n = this.ObjectList.findIndex((o) => o.Id === t);
    n < 0 || (this.ObjectList.splice(n, 1), this.#t.delete(t), this.SelectedIds = this.SelectedIds.filter((o) => o !== t), this.announceChange(), this.requestRendering());
  }
  /**** configureObject ****/
  configureObject(t, n) {
    const o = this.objectWithId(t);
    if (o == null)
      return;
    const r = o.Type === "image";
    Object.assign(o, n), o.Id = t, o.Type === "image" && (n.ImageData != null || !r) && (this.#t.delete(t), this.loadImageForObject(o)), this.announceChange(), this.requestRendering();
  }
  /**** canvas, overlay and rendering ****/
  Canvas;
  Context;
  #r;
  #u;
  Overlay;
  #t = /* @__PURE__ */ new Map();
  #n = !1;
  /**** attachTo ****/
  attachTo(t, n) {
    _c(), this.Canvas = t, this.Context = t.getContext("2d"), this.Overlay = n, this.#r = new OffscreenCanvas(1, 1), this.#u = this.#r.getContext("2d"), t.addEventListener("pointerdown", this.#p), n.addEventListener("pointerdown", this.#p), t.addEventListener("pointermove", this.#k), t.addEventListener("pointerup", this.#C), t.addEventListener("dblclick", this.#$), window.addEventListener("keydown", this.#g), this.resizeViewCanvas();
  }
  /**** resizeViewCanvas ****/
  resizeViewCanvas() {
    const t = this.Canvas.parentElement;
    this.Canvas.width = t.clientWidth, this.Canvas.height = t.clientHeight, this.#r.width = this.Canvas.width, this.#r.height = this.Canvas.height, this.requestRendering();
  }
  /**** loadImageForObject ****/
  loadImageForObject(t) {
    if (!t.ImageData || this.#t.has(t.Id))
      return;
    const n = new Image();
    n.onload = () => {
      this.#t.set(t.Id, n), this.requestRendering();
    }, n.src = t.ImageData;
  }
  /**** requestRendering ****/
  requestRendering() {
    this.#n || (this.#n = !0, requestAnimationFrame(() => {
      this.#n = !1, this.render();
    }));
  }
  /**** render ****/
  render() {
    const t = this.Context, { width: n, height: o } = this.Canvas;
    t.clearRect(0, 0, n, o), t.save();
    const { ox: r, oy: a, scale: i } = this.Viewport;
    t.translate(r, a), t.scale(i, i), t.fillStyle = "#ffffff", t.fillRect(0, 0, this.Width, this.Height), this.showsGrid && this.#s(t);
    for (const s of this.ObjectList)
      s.Opacity > 0 && this.#a(t, s);
    t.restore(), this.refreshOverlay();
  }
  /**** #renderObject ****/
  #a(t, n) {
    const o = n.GroupMembers;
    if (o != null) {
      for (const i of o)
        i.Opacity > 0 && this.#a(t, i);
      return;
    }
    t.save(), t.globalAlpha = n.Opacity, t.globalCompositeOperation = n.BlendMode;
    const r = n.X + n.Width / 2, a = n.Y + n.Height / 2;
    t.translate(r, a), t.rotate(n.Rotation * Math.PI / 180), t.translate(-r, -a);
    for (const i of n.Effects) {
      if (!i.enabled)
        continue;
      const s = wt.effectPluginFor(i.Type);
      s?.Phase === "before" && s.render(t, n, i, this.#r);
    }
    this.#h(t, n);
    for (const i of n.Effects) {
      if (!i.enabled)
        continue;
      const s = wt.effectPluginFor(i.Type);
      s != null && s.Phase !== "before" && s.render(t, n, i, this.#r);
    }
    t.restore();
  }
  /**** #renderObjectBase ****/
  #h(t, n) {
    switch (n.Type) {
      case "text":
        t.font = `${n.FontStyle ?? "normal"} ${n.FontWeight ?? "normal"} ${n.FontSize ?? 24}px ${n.FontFamily ?? "sans-serif"}`, t.fillStyle = n.FillColor, t.textBaseline = "top", t.fillText(n.Text ?? "", n.X, n.Y);
        return;
      case "image": {
        const o = this.#t.get(n.Id);
        o && t.drawImage(o, n.X, n.Y, n.Width, n.Height);
        return;
      }
    }
    Pt(t, n), n.FillColor !== "none" && (t.fillStyle = n.FillColor, t.fill()), n.StrokeWidth > 0 && (t.strokeStyle = n.StrokeColor, t.lineWidth = n.StrokeWidth, t.stroke());
  }
  /**** #renderGrid ****/
  #s(t) {
    t.save(), t.strokeStyle = "rgba(0,0,0,0.12)", t.lineWidth = 0.5 / this.Viewport.scale;
    for (let n = 0; n <= this.Width; n += this.GridSize)
      t.beginPath(), t.moveTo(n, 0), t.lineTo(n, this.Height), t.stroke();
    for (let n = 0; n <= this.Height; n += this.GridSize)
      t.beginPath(), t.moveTo(0, n), t.lineTo(this.Width, n), t.stroke();
    t.restore();
  }
  /**** refreshOverlay - creation preview + SVG handles for selection ****/
  refreshOverlay() {
    const t = this.Overlay, n = "http://www.w3.org/2000/svg";
    for (; t.firstChild; )
      t.removeChild(t.firstChild);
    const { ox: o, oy: r, scale: a } = this.Viewport, i = (u, p) => ({ x: o + u * a, y: r + p * a }), s = (u) => o + u * a, l = (u) => r + u * a;
    if (this.DragState?.mode === "create") {
      const u = this.DragState, p = s(Math.min(u.startX, u.currentX)), c = l(Math.min(u.startY, u.currentY)), f = s(Math.max(u.startX, u.currentX)), h = l(Math.max(u.startY, u.currentY)), g = f - p, y = h - c;
      switch (u.tool) {
        case "rect": {
          const m = document.createElementNS(n, "rect");
          m.setAttribute("x", String(p)), m.setAttribute("y", String(c)), m.setAttribute("width", String(g)), m.setAttribute("height", String(y)), m.setAttribute("fill", "rgba(255,255,255,0.25)"), m.setAttribute("stroke", "#6366f1"), m.setAttribute("stroke-dasharray", "4 3"), t.appendChild(m);
          break;
        }
        case "ellipse": {
          const m = document.createElementNS(n, "ellipse");
          m.setAttribute("cx", String(p + g / 2)), m.setAttribute("cy", String(c + y / 2)), m.setAttribute("rx", String(g / 2)), m.setAttribute("ry", String(y / 2)), m.setAttribute("fill", "rgba(255,255,255,0.25)"), m.setAttribute("stroke", "#6366f1"), m.setAttribute("stroke-dasharray", "4 3"), t.appendChild(m);
          break;
        }
        case "polygon": {
          const m = u.polygonPoints;
          if (m.length > 0) {
            const v = m.map((x) => `${s(x.X)},${l(x.Y)}`).join(" "), C = document.createElementNS(n, "polyline");
            C.setAttribute("points", v), C.setAttribute("fill", "none"), C.setAttribute("stroke", "#6366f1"), C.setAttribute("stroke-dasharray", "4 3"), t.appendChild(C);
            const _ = m[m.length - 1], j = document.createElementNS(n, "line");
            j.setAttribute("x1", String(s(_.X))), j.setAttribute("y1", String(l(_.Y))), j.setAttribute("x2", String(s(u.currentX))), j.setAttribute("y2", String(l(u.currentY))), j.setAttribute("stroke", "#6366f1"), j.setAttribute("stroke-dasharray", "4 3"), j.setAttribute("fill", "none"), t.appendChild(j);
          }
          break;
        }
      }
    }
    if (this.DragState?.mode === "rubberband" && this.DragState.endX != null) {
      const u = this.DragState, p = s(Math.min(u.startX, u.endX)), c = l(Math.min(u.startY, u.endY)), f = Math.abs(s(u.endX) - s(u.startX)), h = Math.abs(l(u.endY) - l(u.startY)), g = document.createElementNS(n, "rect");
      g.setAttribute("class", "jcl-rde-rubberband"), g.setAttribute("x", String(p)), g.setAttribute("y", String(c)), g.setAttribute("width", String(f)), g.setAttribute("height", String(h)), t.appendChild(g);
    }
    if (this.SelectedIds.length === 0)
      return;
    const d = (u, p, c, f, h) => {
      const g = h * Math.PI / 180, y = u - c, m = p - f;
      return {
        x: c + y * Math.cos(g) - m * Math.sin(g),
        y: f + y * Math.sin(g) + m * Math.cos(g)
      };
    };
    for (const u of this.SelectedIds) {
      const p = this.objectWithId(u);
      if (p == null)
        continue;
      const c = i(p.X, p.Y), f = p.Width * a, h = p.Height * a, g = c.x + f / 2, y = c.y + h / 2, m = p.Rotation, v = document.createElementNS(n, "rect");
      v.setAttribute("class", "jcl-rde-frame"), v.setAttribute("x", String(c.x)), v.setAttribute("y", String(c.y)), v.setAttribute("width", String(f)), v.setAttribute("height", String(h)), v.setAttribute("transform", `rotate(${m},${g},${y})`), t.appendChild(v);
      const C = [
        ["nw", c.x, c.y],
        ["n", g, c.y],
        ["ne", c.x + f, c.y],
        ["e", c.x + f, y],
        ["se", c.x + f, c.y + h],
        ["s", g, c.y + h],
        ["sw", c.x, c.y + h],
        ["w", c.x, y]
      ];
      for (const [T, L, $] of C) {
        const I = d(L, $, g, y, m), M = document.createElementNS(n, "rect");
        M.setAttribute("class", "jcl-rde-handle"), M.setAttribute("data-handle", T), M.setAttribute("data-id", u), M.setAttribute("x", String(I.x - 4)), M.setAttribute("y", String(I.y - 4)), M.setAttribute("width", "8"), M.setAttribute("height", "8"), M.setAttribute("transform", `rotate(${m},${I.x},${I.y})`), t.appendChild(M);
      }
      const _ = d(g, c.y, g, y, m), j = d(g, c.y - 24, g, y, m), x = document.createElementNS(n, "line");
      x.setAttribute("x1", String(_.x)), x.setAttribute("y1", String(_.y)), x.setAttribute("x2", String(j.x)), x.setAttribute("y2", String(j.y)), x.setAttribute("stroke", "#6366f1"), x.setAttribute("stroke-dasharray", "3 2"), t.appendChild(x);
      const w = document.createElementNS(n, "circle");
      w.setAttribute("class", "jcl-rde-handle"), w.setAttribute("data-handle", "rotate"), w.setAttribute("data-id", u), w.setAttribute("cx", String(j.x)), w.setAttribute("cy", String(j.y)), w.setAttribute("r", "5"), t.appendChild(w);
    }
  }
  /**** viewport ****/
  Viewport = { ox: 0, oy: 0, scale: 1 };
  GridSize = 10;
  snapToGrid = !1;
  showsGrid = !1;
  /**** canvasToScene - converts a canvas-space point to scene space ****/
  canvasToScene(t, n) {
    const { ox: o, oy: r, scale: a } = this.Viewport;
    return { x: (t - o) / a, y: (n - r) / a };
  }
  /**** sceneToCanvas ****/
  sceneToCanvas(t, n) {
    const { ox: o, oy: r, scale: a } = this.Viewport;
    return { x: o + t * a, y: r + n * a };
  }
  /**** snapped ****/
  snapped(t, n) {
    return !this.snapToGrid || this.GridSize <= 0 ? { x: t, y: n } : {
      x: Math.round(t / this.GridSize) * this.GridSize,
      y: Math.round(n / this.GridSize) * this.GridSize
    };
  }
  /**** setZoom ****/
  setZoom(t) {
    const { width: n, height: o } = this.Canvas, r = n / 2, a = o / 2, { ox: i, oy: s, scale: l } = this.Viewport, d = (r - i) / l, u = (a - s) / l;
    this.Viewport = {
      scale: Math.max(0.05, Math.min(t, 32)),
      ox: r - d * t,
      oy: a - u * t
    }, this.requestRendering();
  }
  /**** get ZoomFactor ****/
  get ZoomFactor() {
    return this.Viewport.scale;
  }
  /**** zoomToFit ****/
  zoomToFit() {
    const { width: t, height: n } = this.Canvas, o = Math.min(
      (t - 40) / this.Width,
      (n - 40) / this.Height
    );
    this.Viewport = {
      scale: o,
      ox: (t - this.Width * o) / 2,
      oy: (n - this.Height * o) / 2
    }, this.requestRendering();
  }
  /**** pan ****/
  pan(t, n) {
    this.Viewport = { ...this.Viewport, ox: this.Viewport.ox + t, oy: this.Viewport.oy + n }, this.requestRendering();
  }
  /**** pointer input ****/
  currentTool = "select";
  readonly = !1;
  DragState = void 0;
  #i = (t) => {
    const n = this.Canvas.getBoundingClientRect();
    return { x: t.clientX - n.left, y: t.clientY - n.top };
  };
  #p = (t) => {
    if (this.readonly)
      return;
    const n = this.canvasToScene(this.#i(t).x, this.#i(t).y);
    this.currentTool === "select" ? this.#_(n, t) : this.#D(n, t), this.DragState != null && this.Canvas.setPointerCapture(t.pointerId);
  };
  #k = (t) => {
    if (this.DragState == null)
      return;
    const n = this.canvasToScene(this.#i(t).x, this.#i(t).y);
    switch (this.DragState.mode) {
      case "move":
        this.#o(n);
        break;
      case "resize":
        this.#x(n);
        break;
      case "rotate":
        this.#j(n, t);
        break;
      case "create":
        this.#L(n);
        break;
      case "pan":
        this.#c(t);
        break;
      case "rubberband":
        this.#f(n);
        break;
    }
  };
  #C = (t) => {
    try {
      this.Canvas.releasePointerCapture(t.pointerId);
    } catch {
    }
    if (this.DragState == null)
      return;
    const n = this.canvasToScene(this.#i(t).x, this.#i(t).y);
    switch (this.DragState.mode) {
      case "create":
        this.#b(n);
        break;
      case "move":
      case "resize":
      case "rotate":
        this.announceChange();
        break;
      case "rubberband":
        this.#S(n);
        break;
    }
    this.DragState = void 0, this.refreshOverlay();
  };
  #$ = (t) => {
    if (this.readonly)
      return;
    const n = this.canvasToScene(this.#i(t).x, this.#i(t).y), o = this.#m(n);
    o != null && (o.Type === "text" ? this.#v(o) : this.DragState?.mode === "create" && this.DragState.tool === "polygon" && this.finishPolygon());
  };
  #g = (t) => {
    if (this.readonly)
      return;
    const n = t.shiftKey ? 10 : 1;
    if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(t.key)) {
      t.preventDefault();
      const o = t.key === "ArrowLeft" ? -n : t.key === "ArrowRight" ? n : 0, r = t.key === "ArrowUp" ? -n : t.key === "ArrowDown" ? n : 0;
      for (const a of this.SelectedIds) {
        const i = this.objectWithId(a);
        i && (i.X += o, i.Y += r);
      }
      this.announceChange(), this.requestRendering();
      return;
    }
    (t.key === "Delete" || t.key === "Backspace") && this.SelectedIds.length > 0 && (t.preventDefault(), this.deleteSelection()), (t.ctrlKey || t.metaKey) && (t.key === "z" && (t.preventDefault(), t.shiftKey ? this.redo() : this.undo()), t.key === "c" && (t.preventDefault(), this.copySelection()), t.key === "x" && (t.preventDefault(), this.cutSelection()), t.key === "v" && (t.preventDefault(), this.pasteClipboard()), t.key === "d" && (t.preventDefault(), this.duplicateSelection()), t.key === "a" && (t.preventDefault(), this.selectAll()));
  };
  /**** #handleSelectPointerDown ****/
  #_(t, n) {
    const o = n.target;
    if (o.dataset?.handle && o.dataset?.id) {
      const a = this.objectWithId(o.dataset.id);
      if (a) {
        if (this.SelectedIds.includes(a.Id) || this.selectIds(n.shiftKey ? [...this.SelectedIds, a.Id] : [a.Id]), o.dataset.handle === "rotate") {
          const i = a.X + a.Width / 2, s = a.Y + a.Height / 2;
          this.DragState = {
            mode: "rotate",
            centerX: i,
            centerY: s,
            startAngle: Math.atan2(t.y - s, t.x - i),
            origins: this.SelectedIds.map((l) => {
              const d = this.objectWithId(l);
              return { Id: l, Rotation: d.Rotation };
            })
          };
        } else
          this.DragState = {
            mode: "resize",
            handle: o.dataset.handle,
            startX: t.x,
            startY: t.y,
            refX: a.X,
            refY: a.Y,
            refW: a.Width,
            refH: a.Height,
            origins: this.SelectedIds.map((i) => {
              const s = this.objectWithId(i);
              return { Id: i, X: s.X, Y: s.Y, Width: s.Width, Height: s.Height };
            })
          };
        return;
      }
    }
    const r = this.#m(t);
    if (r != null) {
      if (n.shiftKey && this.SelectedIds.includes(r.Id)) {
        this.selectIds(this.SelectedIds.filter((a) => a !== r.Id));
        return;
      }
      this.SelectedIds.includes(r.Id) || this.selectIds(n.shiftKey ? [...this.SelectedIds, r.Id] : [r.Id]), this.DragState = {
        mode: "move",
        startX: t.x,
        startY: t.y,
        origins: this.SelectedIds.map((a) => {
          const i = this.objectWithId(a);
          return { Id: a, X: i.X, Y: i.Y };
        })
      };
    } else
      n.shiftKey || this.clearSelection(), this.DragState = { mode: "rubberband", startX: t.x, startY: t.y };
  }
  /**** #hitTest ****/
  #m(t) {
    for (let n = this.ObjectList.length - 1; n >= 0; n--) {
      const o = this.ObjectList[n], r = t.x - (o.X + o.Width / 2), a = t.y - (o.Y + o.Height / 2), i = -o.Rotation * Math.PI / 180, s = r * Math.cos(i) - a * Math.sin(i) + o.Width / 2, l = r * Math.sin(i) + a * Math.cos(i) + o.Height / 2;
      if (s >= 0 && s <= o.Width && l >= 0 && l <= o.Height)
        return o;
    }
  }
  /**** pan drag ****/
  #c(t) {
    this.pan(t.movementX, t.movementY);
  }
  /**** rubberband ****/
  #f(t) {
    this.DragState.endX = t.x, this.DragState.endY = t.y, this.refreshOverlay();
  }
  #S(t) {
    const { startX: n, startY: o } = this.DragState, r = Math.min(n, t.x), a = Math.min(o, t.y), i = Math.max(n, t.x), s = Math.max(o, t.y), l = this.ObjectList.filter((d) => d.X + d.Width > r && d.X < i && d.Y + d.Height > a && d.Y < s).map((d) => d.Id);
    this.selectIds(l);
  }
  /**** object creation tools ****/
  setTool(t) {
    this.currentTool = t, this.DragState = void 0, E(
      'RealDrawEditor callback "onToolChange"',
      this.Callbacks.onToolChange,
      t
    );
  }
  /**** #handleCreatePointerDown ****/
  #D(t, n) {
    if (this.currentTool === "image")
      return;
    const o = this.snapped(t.x, t.y);
    this.DragState = {
      mode: "create",
      tool: this.currentTool,
      startX: o.x,
      startY: o.y,
      currentX: o.x,
      currentY: o.y,
      polygonPoints: this.currentTool === "polygon" ? [{ X: o.x, Y: o.y }] : void 0,
      previewObj: null
    };
  }
  /**** #handleCreatePointerMove ****/
  #L(t) {
    const n = this.DragState, o = this.snapped(t.x, t.y);
    n.currentX = o.x, n.currentY = o.y, this.refreshOverlay();
  }
  /**** #handleCreatePointerUp ****/
  #b(t) {
    const n = this.DragState, o = this.snapped(t.x, t.y), r = Math.min(n.startX, o.x), a = Math.min(n.startY, o.y), i = Math.abs(o.x - n.startX), s = Math.abs(o.y - n.startY);
    if (n.tool === "polygon") {
      n.polygonPoints.push({ X: o.x, Y: o.y });
      return;
    }
    const l = 4;
    if (i < l && s < l && n.tool !== "text")
      return;
    let d;
    switch (n.tool) {
      case "rect":
        d = this.addObject({ Type: "rect", X: r, Y: a, Width: i || l, Height: s || l });
        break;
      case "ellipse":
        d = this.addObject({ Type: "ellipse", X: r, Y: a, Width: i || l, Height: s || l });
        break;
      case "text":
        this.#y(o.x, o.y);
        return;
    }
    d && this.selectIds([d.Id]);
  }
  /**** #requestTextAndCreate ****/
  async #y(t, n) {
    const r = await (this.Callbacks.onTextRequest ?? ((i) => window.prompt("Text:", i)))("");
    if (!r)
      return;
    const a = this.addObject({ Type: "text", X: t, Y: n, Text: r });
    this.selectIds([a.Id]), this.announceChange();
  }
  /**** finishPolygon - called externally (e.g. double-click or Enter) ****/
  finishPolygon() {
    if (this.DragState?.mode !== "create" || this.DragState.tool !== "polygon")
      return;
    const t = this.DragState.polygonPoints;
    if (t.length < 3) {
      this.DragState = void 0;
      return;
    }
    const n = t.map((d) => d.X), o = t.map((d) => d.Y), r = Math.min(...n), a = Math.min(...o), i = Math.max(...n) - r, s = Math.max(...o) - a, l = this.addObject({ Type: "polygon", X: r, Y: a, Width: i || 1, Height: s || 1, Points: t });
    this.DragState = void 0, this.selectIds([l.Id]);
  }
  /**** move ****/
  #o(t) {
    const n = this.DragState, o = t.x - n.startX, r = t.y - n.startY;
    for (const { Id: a, X: i, Y: s } of n.origins) {
      const l = this.objectWithId(a);
      if (l == null)
        continue;
      const d = this.snapped(i + o, s + r);
      l.X = d.x, l.Y = d.y;
    }
    this.requestRendering();
  }
  /**** resize ****/
  #x(t) {
    const n = this.DragState, o = t.x - n.startX, r = t.y - n.startY;
    let { refX: a, refY: i, refW: s, refH: l } = n;
    switch (n.handle) {
      case "nw":
        a += o, i += r, s -= o, l -= r;
        break;
      case "n":
        i += r, l -= r;
        break;
      case "ne":
        i += r, s += o, l -= r;
        break;
      case "e":
        s += o;
        break;
      case "se":
        s += o, l += r;
        break;
      case "s":
        l += r;
        break;
      case "sw":
        a += o, s -= o, l += r;
        break;
      case "w":
        a += o, s -= o;
        break;
    }
    if ((n.handle === "nw" || n.handle === "ne" || n.handle === "se" || n.handle === "sw") && n.refW > 0 && n.refH > 0) {
      const g = n.refW / n.refH;
      Math.abs(s - n.refW) >= Math.abs(l - n.refH) * g ? (l = s / g, n.handle.includes("n") && (i = n.refY + n.refH - l)) : (s = l * g, n.handle.includes("w") && (a = n.refX + n.refW - s));
    }
    const u = 4;
    s < u && (s = u, n.handle.includes("w") && (a = n.refX + n.refW - u)), l < u && (l = u, n.handle.includes("n") && (i = n.refY + n.refH - u));
    const p = a - n.refX, c = i - n.refY, f = s - n.refW, h = l - n.refH;
    for (const g of n.origins) {
      const y = this.objectWithId(g.Id);
      if (y == null)
        continue;
      const m = this.snapped(g.X + p, g.Y + c);
      y.X = m.x, y.Y = m.y, y.Width = Math.max(u, g.Width + f), y.Height = Math.max(u, g.Height + h);
    }
    this.requestRendering();
  }
  /**** rotate ****/
  #j(t, n) {
    const o = this.DragState;
    let a = (Math.atan2(t.y - o.centerY, t.x - o.centerX) - o.startAngle) * 180 / Math.PI;
    (n.shiftKey || this.snapToGrid) && (a = Math.round(a / 15) * 15);
    for (const { Id: i, Rotation: s } of o.origins) {
      const l = this.objectWithId(i);
      l && (l.Rotation = ((s + a) % 360 + 360) % 360);
    }
    this.requestRendering();
  }
  /**** rotateSelection ****/
  rotateSelection(t) {
    for (const n of this.SelectedIds) {
      const o = this.objectWithId(n);
      o && (o.Rotation = (o.Rotation + t) % 360);
    }
    this.announceChange(), this.requestRendering();
  }
  /**** selection ****/
  SelectedIds = [];
  /**** selectIds ****/
  selectIds(t) {
    this.SelectedIds = t.filter((n) => this.objectWithId(n) != null), E(
      'RealDrawEditor callback "onSelectionChange"',
      this.Callbacks.onSelectionChange,
      [...this.SelectedIds]
    ), this.refreshOverlay();
  }
  /**** selectAll ****/
  selectAll() {
    this.selectIds(this.ObjectList.map((t) => t.Id));
  }
  /**** clearSelection ****/
  clearSelection() {
    this.selectIds([]);
  }
  /**** deleteSelection ****/
  deleteSelection() {
    const t = [...this.SelectedIds];
    this.clearSelection();
    for (const n of t)
      this.removeObject(n);
    this.announceChange();
  }
  /**** text tool ****/
  insertText(t, n, o) {
    const r = this.addObject({ Type: "text", X: n, Y: o, Text: t });
    return this.selectIds([r.Id]), r;
  }
  /**** #requestTextEdit - opens dialog for an existing text object ****/
  async #v(t) {
    const o = await (this.Callbacks.onTextRequest ?? ((r) => window.prompt("Text:", r)))(t.Text ?? "");
    o != null && (this.configureObject(t.Id, { Text: o }), this.announceChange());
  }
  /**** clipboard ****/
  #e = [];
  /**** copySelection ****/
  copySelection() {
    this.#e = this.SelectedIds.map((t) => this.objectWithId(t)).filter((t) => t != null).map((t) => JSON.parse(JSON.stringify(t)));
  }
  /**** cutSelection ****/
  cutSelection() {
    this.copySelection(), this.deleteSelection();
  }
  /**** pasteClipboard ****/
  pasteClipboard() {
    if (this.#e.length === 0)
      return;
    const t = [];
    for (const n of this.#e) {
      const o = this.addObject({ ...n, X: n.X + 10, Y: n.Y + 10 });
      t.push(o.Id);
    }
    this.selectIds(t);
  }
  /**** duplicateSelection ****/
  duplicateSelection() {
    this.copySelection(), this.pasteClipboard();
  }
  /**** z-order ****/
  bringToFront() {
    for (const t of this.SelectedIds) {
      const n = this.ObjectList.findIndex((o) => o.Id === t);
      n >= 0 && this.ObjectList.push(...this.ObjectList.splice(n, 1));
    }
    this.announceChange(), this.requestRendering();
  }
  sendToBack() {
    for (const t of [...this.SelectedIds].reverse()) {
      const n = this.ObjectList.findIndex((o) => o.Id === t);
      n >= 0 && this.ObjectList.unshift(...this.ObjectList.splice(n, 1));
    }
    this.announceChange(), this.requestRendering();
  }
  raiseSelection() {
    for (const t of [...this.SelectedIds].reverse()) {
      const n = this.ObjectList.findIndex((o) => o.Id === t);
      if (n >= 0 && n < this.ObjectList.length - 1) {
        const o = this.ObjectList[n];
        this.ObjectList[n] = this.ObjectList[n + 1], this.ObjectList[n + 1] = o;
      }
    }
    this.announceChange(), this.requestRendering();
  }
  lowerSelection() {
    for (const t of this.SelectedIds) {
      const n = this.ObjectList.findIndex((o) => o.Id === t);
      if (n > 0) {
        const o = this.ObjectList[n];
        this.ObjectList[n] = this.ObjectList[n - 1], this.ObjectList[n - 1] = o;
      }
    }
    this.announceChange(), this.requestRendering();
  }
  /**** grouping - groups are represented as a single 'rect' object with    ****/
  /**** a special 'GroupMembers' extra property (lightweight implementation) ****/
  groupSelection() {
    if (this.SelectedIds.length < 2)
      return;
    const t = this.SelectedIds.map((c) => this.objectWithId(c)).filter((c) => c != null), n = t.map((c) => c.X), o = t.map((c) => c.Y), r = t.map((c) => c.X + c.Width), a = t.map((c) => c.Y + c.Height), i = Math.min(...n), s = Math.min(...o), l = Math.max(...r) - i, d = Math.max(...a) - s, u = t.map((c) => ({
      ...c,
      Effects: c.Effects.map((f) => ({ ...f })),
      ...c.Points ? { Points: c.Points.map((f) => ({ ...f })) } : {}
    })), p = this.addObject({
      Type: "rect",
      X: i,
      Y: s,
      Width: l,
      Height: d,
      FillColor: "none",
      StrokeColor: "none",
      StrokeWidth: 0
    });
    p.GroupMembers = u;
    for (const c of this.SelectedIds)
      this.removeObject(c);
    this.selectIds([p.Id]), this.announceChange();
  }
  ungroupSelection() {
    const t = [];
    for (const n of this.SelectedIds) {
      const o = this.objectWithId(n);
      if (!o?.GroupMembers) {
        t.push(n);
        continue;
      }
      for (const r of o.GroupMembers) {
        const a = this.addObject(r);
        t.push(a.Id);
      }
      this.removeObject(n);
    }
    this.selectIds(t), this.announceChange();
  }
  /**** change history (undo / redo) ****/
  Snapshots = ["[]"];
  SnapshotIndex = 0;
  /**** captureSnapshot ****/
  captureSnapshot() {
    const t = JSON.stringify(this.ObjectList);
    t !== this.Snapshots[this.SnapshotIndex] && (this.Snapshots.splice(this.SnapshotIndex + 1), this.Snapshots.push(t), this.Snapshots.length > 100 ? this.Snapshots.shift() : this.SnapshotIndex++, this.announceUndoState());
  }
  /**** undo ****/
  undo() {
    this.canUndo() && (this.SnapshotIndex--, this.#l(), this.announceUndoState());
  }
  /**** redo ****/
  redo() {
    this.canRedo() && (this.SnapshotIndex++, this.#l(), this.announceUndoState());
  }
  /**** canUndo / canRedo ****/
  canUndo() {
    return this.SnapshotIndex > 0;
  }
  canRedo() {
    return this.SnapshotIndex < this.Snapshots.length - 1;
  }
  /**** #restoreSnapshot ****/
  #l() {
    this.#I(JSON.parse(this.Snapshots[this.SnapshotIndex]));
  }
  // "#adoptObjectList" s. "Import and Export"
  /**** announceUndoState ****/
  announceUndoState() {
    E(
      'RealDrawEditor callback "onUndoStateChange"',
      this.Callbacks.onUndoStateChange,
      this.canUndo(),
      this.canRedo()
    );
  }
  /**** announceChange ****/
  announceChange() {
    this.captureSnapshot(), E(
      'RealDrawEditor callback "onValueChange"',
      this.Callbacks.onValueChange,
      this.getValue()
    );
  }
  /**** getValue - serialises the scene to a JSON string ****/
  getValue() {
    return JSON.stringify(this.ObjectList);
  }
  /**** #adoptObjectList - installs a new scene, rebuilds derived state ****/
  // shared by "setValue" and "#restoreSnapshot" (see "Change History")
  #I(t) {
    this.ObjectList = t, this.#d = t.reduce((n, o) => {
      const r = parseInt(o.Id.replace(/^obj-/, ""), 10);
      return isNaN(r) ? n : Math.max(n, r);
    }, 0), this.SelectedIds = this.SelectedIds.filter((n) => this.objectWithId(n) != null), this.#t.clear();
    for (const n of this.ObjectList)
      n.Type === "image" && this.loadImageForObject(n);
    this.requestRendering();
  }
  /**** setValue - replaces the scene without firing "onValueChange" ****/
  setValue(t) {
    ot("scene value", t);
    let n = [];
    if (t.trim() !== "") {
      try {
        n = JSON.parse(t);
      } catch {
        ce("InvalidArgument: the given value is not valid JSON");
      }
      Array.isArray(n) || ce("InvalidArgument: the given value is not a JSON array");
    }
    this.SelectedIds = [], this.#I(n), this.Snapshots = [t.trim() === "" ? "[]" : t], this.SnapshotIndex = 0, this.announceUndoState();
  }
  /**** importImage - adds an image object from a data URL or Blob ****/
  async importImage(t) {
    let n;
    t instanceof Blob ? n = await new Promise((r) => {
      const a = new FileReader();
      a.onload = () => r(a.result), a.readAsDataURL(t);
    }) : n = t;
    const o = this.addObject({
      Type: "image",
      X: 0,
      Y: 0,
      Width: this.Width,
      Height: this.Height,
      ImageData: n
    });
    return this.selectIds([o.Id]), o;
  }
  /**** exportedBlob - flattens the scene to a Blob ****/
  exportedBlob(t = "image/png") {
    const n = new OffscreenCanvas(this.Width, this.Height), o = n.getContext("2d");
    o.fillStyle = "#ffffff", o.fillRect(0, 0, this.Width, this.Height);
    const r = this.Viewport;
    this.Viewport = { ox: 0, oy: 0, scale: 1 };
    for (const a of this.ObjectList)
      a.Opacity > 0 && this.#a(o, a);
    return this.Viewport = r, n.convertToBlob({ type: t });
  }
  destroy() {
    this.Canvas?.removeEventListener("pointerdown", this.#p), this.Overlay?.removeEventListener("pointerdown", this.#p), this.Canvas?.removeEventListener("pointermove", this.#k), this.Canvas?.removeEventListener("pointerup", this.#C), this.Canvas?.removeEventListener("dblclick", this.#$), window.removeEventListener("keydown", this.#g);
  }
}
function Pt(e, t) {
  switch (e.beginPath(), t.Type) {
    case "rect":
      e.rect(t.X, t.Y, t.Width, t.Height);
      break;
    case "ellipse":
      e.ellipse(
        t.X + t.Width / 2,
        t.Y + t.Height / 2,
        t.Width / 2,
        t.Height / 2,
        0,
        0,
        Math.PI * 2
      );
      break;
    case "polygon":
      if ((t.Points?.length ?? 0) >= 2) {
        e.moveTo(t.Points[0].X, t.Points[0].Y);
        for (let n = 1; n < t.Points.length; n++)
          e.lineTo(t.Points[n].X, t.Points[n].Y);
        e.closePath();
      }
      break;
  }
}
let ks = !1;
function vm() {
  ks || (ks = !0, wt.registerEffect({
    Type: "DropShadow",
    Label: "Drop Shadow",
    Phase: "before",
    Parameters: [
      { Name: "Color", Type: "color", Label: "Farbe", Default: "rgba(0,0,0,0.5)" },
      { Name: "Angle", Type: "angle", Label: "Winkel", Default: 135, Min: 0, Max: 360 },
      { Name: "Distance", Type: "number", Label: "Abstand", Default: 5, Min: 0, Max: 200 },
      { Name: "Blur", Type: "number", Label: "Weichheit", Default: 5, Min: 0, Max: 100 }
    ],
    render(e, t, n) {
      const o = (n.Angle ?? 135) * Math.PI / 180, r = n.Distance ?? 5;
      e.save(), e.shadowColor = n.Color ?? "rgba(0,0,0,0.5)", e.shadowBlur = n.Blur ?? 5, e.shadowOffsetX = Math.cos(o) * r, e.shadowOffsetY = Math.sin(o) * r, Pt(e, t), e.fillStyle = "#000", e.fill(), e.restore();
    }
  }), wt.registerEffect({
    Type: "OuterGlow",
    Label: "Outer Glow",
    Phase: "before",
    Parameters: [
      { Name: "Color", Type: "color", Label: "Farbe", Default: "rgba(255,255,0,0.8)" },
      { Name: "Blur", Type: "number", Label: "Weichheit", Default: 10, Min: 0, Max: 100 },
      { Name: "Spread", Type: "number", Label: "Ausdehnung", Default: 0, Min: 0, Max: 50 }
    ],
    render(e, t, n) {
      e.save(), e.shadowColor = n.Color ?? "rgba(255,255,0,0.8)", e.shadowBlur = n.Blur ?? 10, e.shadowOffsetX = 0, e.shadowOffsetY = 0, Pt(e, t), e.fillStyle = n.Color ?? "rgba(255,255,0,0.8)", e.fill(), e.restore();
    }
  }), wt.registerEffect({
    Type: "ColorOverlay",
    Label: "Color Overlay",
    Phase: "overlay",
    Parameters: [
      { Name: "Color", Type: "color", Label: "Farbe", Default: "#ff0000" },
      { Name: "Opacity", Type: "number", Label: "Deckkraft", Default: 1, Min: 0, Max: 1 }
    ],
    render(e, t, n) {
      e.save(), e.globalCompositeOperation = "source-atop", e.globalAlpha = n.Opacity ?? 1, Pt(e, t), e.fillStyle = n.Color ?? "#ff0000", e.fill(), e.restore();
    }
  }), wt.registerEffect({
    Type: "GradientOverlay",
    Label: "Gradient Overlay",
    Phase: "overlay",
    Parameters: [
      { Name: "StartColor", Type: "color", Label: "Startfarbe", Default: "#ff0000" },
      { Name: "EndColor", Type: "color", Label: "Endfarbe", Default: "#0000ff" },
      { Name: "GradientAngle", Type: "angle", Label: "Winkel", Default: 0, Min: 0, Max: 360 },
      { Name: "Opacity", Type: "number", Label: "Deckkraft", Default: 1, Min: 0, Max: 1 }
    ],
    render(e, t, n) {
      const o = (n.GradientAngle ?? 0) * Math.PI / 180, r = t.X + t.Width / 2, a = t.Y + t.Height / 2, i = Math.sqrt(t.Width ** 2 + t.Height ** 2) / 2, s = e.createLinearGradient(
        r - Math.cos(o) * i,
        a - Math.sin(o) * i,
        r + Math.cos(o) * i,
        a + Math.sin(o) * i
      );
      s.addColorStop(0, n.StartColor ?? "#ff0000"), s.addColorStop(1, n.EndColor ?? "#0000ff"), e.save(), e.globalCompositeOperation = "source-atop", e.globalAlpha = n.Opacity ?? 1, Pt(e, t), e.fillStyle = s, e.fill(), e.restore();
    }
  }), wt.registerEffect({
    Type: "Stroke",
    Label: "Stroke",
    Phase: "after",
    Parameters: [
      { Name: "Color", Type: "color", Label: "Farbe", Default: "#000000" },
      { Name: "Width", Type: "number", Label: "Breite", Default: 2, Min: 0.5, Max: 50 },
      {
        Name: "Position",
        Type: "select",
        Label: "Position",
        Default: "outside",
        Options: ["outside", "inside", "center"]
      }
    ],
    render(e, t, n) {
      const o = n.Width ?? 2, r = n.Position ?? "outside";
      e.save(), r !== "center" && (e.globalCompositeOperation = r === "outside" ? "destination-over" : "source-atop"), Pt(e, t), e.strokeStyle = n.Color ?? "#000000", e.lineWidth = r === "center" ? o : o * 2, e.stroke(), e.restore();
    }
  }), wt.registerEffect({
    Type: "InnerGlow",
    Label: "Inner Glow",
    Phase: "after",
    Parameters: [
      { Name: "Color", Type: "color", Label: "Farbe", Default: "rgba(255,255,255,0.8)" },
      { Name: "Blur", Type: "number", Label: "Weichheit", Default: 8, Min: 0, Max: 100 },
      { Name: "Spread", Type: "number", Label: "Ausdehnung", Default: 0, Min: 0, Max: 50 }
    ],
    render(e, t, n, o) {
      const r = o.getContext("2d");
      r.clearRect(0, 0, o.width, o.height), r.save(), r.shadowColor = n.Color ?? "rgba(255,255,255,0.8)", r.shadowBlur = n.Blur ?? 8, r.shadowOffsetX = 0, r.shadowOffsetY = 0, Pt(r, t), r.fillStyle = n.Color ?? "rgba(255,255,255,0.8)", r.fill(), r.restore(), e.save(), e.globalCompositeOperation = "source-atop", e.drawImage(o, 0, 0), e.restore();
    }
  }), wt.registerEffect({
    Type: "InnerShadow",
    Label: "Inner Shadow",
    Phase: "after",
    Parameters: [
      { Name: "Color", Type: "color", Label: "Farbe", Default: "rgba(0,0,0,0.5)" },
      { Name: "Angle", Type: "angle", Label: "Winkel", Default: 135, Min: 0, Max: 360 },
      { Name: "Distance", Type: "number", Label: "Abstand", Default: 5, Min: 0, Max: 100 },
      { Name: "Blur", Type: "number", Label: "Weichheit", Default: 5, Min: 0, Max: 100 }
    ],
    render(e, t, n, o) {
      const r = (n.Angle ?? 135) * Math.PI / 180, a = n.Distance ?? 5, i = o.getContext("2d");
      i.clearRect(0, 0, o.width, o.height), Pt(i, t), i.fill(), i.save(), i.globalCompositeOperation = "source-out", i.shadowColor = n.Color ?? "rgba(0,0,0,0.5)", i.shadowBlur = n.Blur ?? 5, i.shadowOffsetX = Math.cos(r) * a, i.shadowOffsetY = Math.sin(r) * a, Pt(i, t), i.fill(), i.restore(), e.save(), e.globalCompositeOperation = "source-atop", e.drawImage(o, 0, 0), e.restore();
    }
  }));
}
function wm(e) {
  return H(() => {
    _c(), e = G(e);
    const t = D(e.Class) ?? "";
    let n = re(e.Value);
    const o = $e(e.Width) ?? 800, r = $e(e.Height) ?? 600, a = Y(e.readonly) ?? !1, i = Y(e.disabled) ?? !1, s = D(e.Tool) ?? "select", l = nn(e.GridSize, 0.01, 1e3) ?? 10, d = Y(e.snapToGrid) ?? !1, u = Y(e.showGrid) ?? !1, p = Array.isArray(e.extraEffects) ? e.extraEffects : [], c = R(e.onValueChange), f = R(e.onSelectionChange), h = R(e.onToolChange), g = R(e.onUndoStateChange), y = R(e.onTextRequest), m = R(e.onMount), v = R(e.onUnmount), C = U(null), _ = U(void 0), j = U({});
    j.current = {
      onValueChange: c,
      onSelectionChange: f,
      onToolChange: h,
      onUndoStateChange: g,
      onTextRequest: y,
      onUnmount: v
    };
    const x = U(n ?? ""), w = U(n ?? "");
    return n != null && n !== x.current && (x.current = n, w.current = n), je(() => {
      const T = C.current, L = document.createElement("canvas");
      T.appendChild(L);
      const $ = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      $.setAttribute("class", "jcl-rde-overlay"), T.appendChild($), p.forEach((F) => wt.registerEffect(F));
      const I = new wt();
      if (I.Callbacks = {
        ...l0(j, [
          // s. "auxiliary functions"
          "onSelectionChange",
          "onToolChange",
          "onUndoStateChange",
          "onTextRequest"
        ]),
        onValueChange: (F) => {
          w.current = F, j.current.onValueChange?.(F);
        }
      }, I.initialiseScene(o, r), I.attachTo(L, $), n != null)
        try {
          I.setValue(n);
        } catch {
        }
      _.current = I;
      const M = new ResizeObserver(() => I.resizeViewCanvas());
      return M.observe(T), E('RealDrawEditor callback "onMount"', m, {
        Editor: I,
        getValue: () => I.getValue(),
        setValue: (F) => I.setValue(F),
        Tool: () => I.currentTool,
        setTool: (F) => I.setTool(F),
        ObjectList: () => [...I.ObjectList],
        addObject: (F) => I.addObject(F),
        removeObject: (F) => I.removeObject(F),
        configureObject: (F, N) => I.configureObject(F, N),
        SelectedIds: () => I.SelectedIds,
        select: (F) => I.selectIds(F),
        selectAll: () => I.selectAll(),
        deselectAll: () => I.clearSelection(),
        deleteSelection: () => I.deleteSelection(),
        bringToFront: () => I.bringToFront(),
        sendToBack: () => I.sendToBack(),
        raise: () => I.raiseSelection(),
        lower: () => I.lowerSelection(),
        group: () => I.groupSelection(),
        ungroup: () => I.ungroupSelection(),
        copy: () => I.copySelection(),
        cut: () => I.cutSelection(),
        paste: () => I.pasteClipboard(),
        duplicate: () => I.duplicateSelection(),
        undo: () => I.undo(),
        canUndo: () => I.canUndo(),
        redo: () => I.redo(),
        canRedo: () => I.canRedo(),
        ZoomFactor: () => I.ZoomFactor,
        setZoom: (F) => I.setZoom(F),
        zoomToFit: () => I.zoomToFit(),
        importImage: (F) => I.importImage(F),
        exportedBlob: (F) => I.exportedBlob(F),
        insertText: (F, N, X) => I.insertText(F, N, X)
      }), () => {
        E(
          'RealDrawEditor callback "onUnmount"',
          j.current.onUnmount
        ), M.disconnect(), _.current = void 0, I.destroy(), L.remove(), $.remove();
      };
    }, []), je(() => {
      const T = _.current;
      T != null && xm.includes(s) && T.setTool(s);
    }, [s]), je(() => {
      const T = _.current;
      T != null && (T.readonly = a, a && (T.DragState = void 0));
    }, [a]), je(() => {
      const T = _.current;
      T != null && (T.GridSize = l, T.snapToGrid = d, T.showsGrid = u, T.requestRendering());
    }, [l, d, u]), je(() => {
      const T = _.current;
      if (!(T == null || n == null) && n !== w.current) {
        w.current = n;
        try {
          T.setValue(n);
        } catch (L) {
          console.warn("RealDrawEditor: invalid value given", L);
        }
      }
    }, [n]), b`<div
        class="jcl-component realdraweditor ${i ? "disabled" : ""} ${t}"
        ...${e.RestProps} ref=${C}
      />`;
  });
}
const _c = /* @__PURE__ */ Z("jcl-component.realdraweditor", `
    .jcl-component.realdraweditor {
      display:block !important;
      position:relative; overflow:hidden;
      border:solid 1px #888888; border-radius:2px;
      background:#404040; touch-action:none;
    }
    .jcl-component.realdraweditor > canvas {
      display:block; position:absolute; top:0; left:0; width:100%; height:100%;
    }
    .jcl-component.realdraweditor > .jcl-rde-overlay {
      position:absolute; top:0; left:0; width:100%; height:100%;
      pointer-events:none; overflow:hidden;
    }
    .jcl-component.realdraweditor .jcl-rde-frame {
      fill:none; stroke:#6366f1; stroke-dasharray:4 3;
    }
    .jcl-component.realdraweditor .jcl-rde-handle {
      fill:white; stroke:#6366f1; pointer-events:all;
    }
    .jcl-component.realdraweditor .jcl-rde-handle[data-handle="nw"],
    .jcl-component.realdraweditor .jcl-rde-handle[data-handle="se"] { cursor:nwse-resize }
    .jcl-component.realdraweditor .jcl-rde-handle[data-handle="ne"],
    .jcl-component.realdraweditor .jcl-rde-handle[data-handle="sw"] { cursor:nesw-resize }
    .jcl-component.realdraweditor .jcl-rde-handle[data-handle="n"],
    .jcl-component.realdraweditor .jcl-rde-handle[data-handle="s"]  { cursor:ns-resize }
    .jcl-component.realdraweditor .jcl-rde-handle[data-handle="e"],
    .jcl-component.realdraweditor .jcl-rde-handle[data-handle="w"]  { cursor:ew-resize }
    .jcl-component.realdraweditor .jcl-rde-handle[data-handle="rotate"] { cursor:grab }
    .jcl-component.realdraweditor.disabled { opacity:0.6; pointer-events:none; }
    @media (prefers-contrast: more) {
      .jcl-component.realdraweditor:focus { outline:solid 3px currentColor }
    }
  `), br = 80, yr = 50;
function km(e) {
  return "" + e.Key;
}
function No(e) {
  let t = "";
  return e.FontFamily != null && (t += `font-family:${e.FontFamily}; `), e.FontSize != null && (t += `font-size:${e.FontSize}px; `), e.FontWeight != null && (t += `font-weight:${e.FontWeight}; `), e.LineHeight != null && (t += `line-height:${e.LineHeight}; `), e.ForegroundColor != null && (t += `color:${e.ForegroundColor}; `), e.BackgroundColor != null && (t += `background-color:${e.BackgroundColor}; `), t;
}
function Sc(e) {
  if (e.key !== "Tab" || e.shiftKey || e.ctrlKey || e.metaKey || e.altKey)
    return;
  const t = e.target;
  if (!(t instanceof HTMLTextAreaElement) || t.readOnly || t.disabled)
    return;
  e.preventDefault();
  let n = !1;
  try {
    n = document.execCommand("insertText", !1, "	");
  } catch {
  }
  if (!n) {
    const { selectionStart: o, selectionEnd: r, value: a } = t;
    t.value = a.slice(0, o) + "	" + a.slice(r), t.selectionStart = t.selectionEnd = o + 1, t.dispatchEvent(new InputEvent("input", { bubbles: !0 }));
  }
}
function Cm(e, t, n) {
  return (o, r) => {
    const a = {
      Content: o.Content ?? "",
      onContentChange: n == null ? void 0 : ((i) => E(
        'NoteBoard callback "onNoteContentChange"',
        n,
        e(o),
        i
      )),
      FontFamily: o.FontFamily ?? t.FontFamily,
      FontSize: o.FontSize ?? t.FontSize,
      FontWeight: o.FontWeight ?? t.FontWeight,
      LineHeight: o.LineHeight ?? t.LineHeight,
      ForegroundColor: o.ForegroundColor ?? t.ForegroundColor,
      BackgroundColor: o.BackgroundColor ?? t.BackgroundColor
    };
    switch (o.Type) {
      case "html":
        return b`<${ai}     ...${a}/>`;
      case "markdown":
        return b`<${Lc} ...${a}/>`;
      default:
        return b`<${Dc}     ...${a}/>`;
    }
  };
}
function $m(e) {
  return H(() => {
    Im(), e = G(e);
    const t = D(e.Class) ?? "", n = z(e.Notes, (te) => Ie(te, De)) ?? Me("Notes"), o = R(e.KeyOfNote) ?? km, r = $e(e.PaneWidth), a = $e(e.PaneHeight), i = D(e.DefaultFontFamily), s = qe(e.DefaultFontSize), l = z(e.DefaultFontWeight, (te) => bt(te) || Ne(te)), d = qe(e.DefaultLineHeight), u = D(e.DefaultForegroundColor), p = D(e.DefaultBackgroundColor);
    let c = z(e.selectedKeys, (te) => Ie(te, at)) ?? [];
    const f = R(e.onSelectionChange), h = R(e.onNotesChange), g = R(e.onNoteContentChange), y = $e(e.SensorWidth) ?? 20, m = $e(e.maxPanningSpeed) ?? 400, v = f != null, C = h != null, _ = {
      FontFamily: i,
      FontSize: s,
      FontWeight: l,
      LineHeight: d,
      ForegroundColor: u,
      BackgroundColor: p
    }, j = R(e.NoteRenderer) ?? Cm(o, _, g), x = n.map((te) => String(
      Xe('NoteBoard callback "KeyOfNote"', o, te)
    )), w = Pc(x, '"Notes"'), T = /* @__PURE__ */ new Set();
    v && (c = ho(c, w), c.forEach((te) => T.add(te)));
    function L(te, ee) {
      let ne;
      return ee ? ne = T.has(te) ? c.filter(
        (se) => se !== te
      ) : [...c, te] : ne = [te], E(
        'NoteBoard callback "onSelectionChange"',
        f,
        ne
      ), ne;
    }
    const $ = U(null), I = U(void 0), M = dt();
    je(() => () => {
      const te = I.current;
      te != null && (te.ChangeRAF != null && cancelAnimationFrame(te.ChangeRAF), te.PanningRAF != null && cancelAnimationFrame(te.PanningRAF), I.current = void 0);
    }, []);
    function S(te) {
      const { Mode: ee, dx: ne, dy: se } = I.current, { x: xe, y: ve, Width: _e, Height: Ae } = te;
      return ee === "move" ? {
        x: lt(xe + ne, 0, Ue - _e),
        y: lt(ve + se, 0, pt - Ae),
        Width: _e,
        Height: Ae
      } : {
        // in "DialogView"s resizing logic
        x: xe,
        y: ve,
        Width: lt(_e + ne, br, Ue - xe),
        Height: lt(Ae + se, yr, pt - ve)
      };
    }
    function F(te, ee) {
      const ne = I.current?.StartGeometryByKey[ee];
      return ne == null ? {
        x: te.Position.x,
        y: te.Position.y,
        Width: te.Size.Width,
        Height: te.Size.Height
      } : S(ne);
    }
    function N() {
      const te = I.current;
      if (te == null)
        return [];
      const ee = [];
      return n.forEach((ne, se) => {
        const xe = te.StartGeometryByKey[x[se]];
        if (xe != null) {
          const { x: ve, y: _e, Width: Ae, Height: Oe } = S(xe);
          ee.push({ ...ne, Position: { x: ve, y: _e }, Size: { Width: Ae, Height: Oe } });
        }
      }), ee;
    }
    function X() {
      const te = I.current;
      te == null || te.ChangeRAF != null || (te.ChangeRAF = requestAnimationFrame(() => {
        const ee = I.current;
        if (ee == null)
          return;
        ee.ChangeRAF = void 0;
        const ne = N();
        ne.length > 0 && E(
          'NoteBoard callback "onNotesChange"',
          h,
          ne
        );
      }));
    }
    function Q(te, ee, ne) {
      let se = [ee];
      if (v) {
        let ve = c;
        if (!T.has(ee)) {
          const _e = jn(ne);
          ve = L(ee, _e);
        }
        ve.includes(ee) && (se = ve);
      }
      const xe = {};
      n.forEach((ve, _e) => {
        se.includes(x[_e]) && (xe[x[_e]] = {
          x: ve.Position.x,
          y: ve.Position.y,
          Width: ve.Size.Width,
          Height: ve.Size.Height
        });
      }), I.current = {
        Mode: te,
        StartGeometryByKey: xe,
        dx: 0,
        dy: 0,
        lastClientX: void 0,
        lastClientY: void 0,
        ChangeRAF: void 0,
        PanningRAF: void 0,
        PanningTimestamp: void 0
      }, M();
    }
    function pe(te, ee, ne) {
      const se = I.current;
      se != null && (se.dx = te, se.dy = ee, ne != null && (se.lastClientX = ne.clientX, se.lastClientY = ne.clientY), se.Mode === "move" && se.PanningRAF == null && (se.PanningTimestamp = void 0, se.PanningRAF = requestAnimationFrame(
        (xe) => ue.current?.(xe)
      )), M(), X());
    }
    function q(te, ee) {
      const ne = I.current;
      if (ne == null)
        return;
      ne.dx = te, ne.dy = ee, ne.ChangeRAF != null && cancelAnimationFrame(ne.ChangeRAF), ne.PanningRAF != null && cancelAnimationFrame(ne.PanningRAF);
      const se = N();
      I.current = void 0, se.length > 0 && E(
        // the final, non-throttled batch update
        'NoteBoard callback "onNotesChange"',
        h,
        se
      ), M();
    }
    function J() {
      const te = I.current;
      if (te == null)
        return;
      te.ChangeRAF != null && cancelAnimationFrame(te.ChangeRAF), te.PanningRAF != null && cancelAnimationFrame(te.PanningRAF);
      const ee = [];
      n.forEach((ne, se) => {
        const xe = te.StartGeometryByKey[x[se]];
        if (xe != null) {
          const { x: ve, y: _e, Width: Ae, Height: Oe } = xe;
          ee.push({ ...ne, Position: { x: ve, y: _e }, Size: { Width: Ae, Height: Oe } });
        }
      }), I.current = void 0, ee.length > 0 && E(
        'NoteBoard callback "onNotesChange"',
        h,
        ee
      ), M();
    }
    function P(te) {
      const ee = I.current, ne = $.current;
      if (ee == null || ee.Mode !== "move" || ne == null)
        return;
      const { lastClientX: se, lastClientY: xe } = ee;
      if (se == null || xe == null) {
        ee.PanningRAF = void 0, ee.PanningTimestamp = void 0;
        return;
      }
      const { vx: ve, vy: _e } = ed(
        ne.getBoundingClientRect(),
        se,
        xe,
        y,
        m
      );
      if (ve === 0 && _e === 0) {
        ee.PanningRAF = void 0, ee.PanningTimestamp = void 0;
        return;
      }
      const Ae = td(ee, te), Oe = ne.scrollLeft, mt = ne.scrollTop;
      ne.scrollLeft = Oe + ve * Ae, ne.scrollTop = mt + _e * Ae, ee.dx += ne.scrollLeft - Oe, ee.dy += ne.scrollTop - mt, M(), ke.current?.(), ee.PanningRAF = requestAnimationFrame(
        (ye) => ue.current?.(ye)
      );
    }
    const ue = U();
    ue.current = P;
    const ke = U();
    ke.current = X;
    const Ve = Tl($), Ue = r ?? Ve.Width, pt = a ?? Ve.Height;
    function ft(te) {
      return No({
        FontFamily: te.FontFamily ?? i,
        FontSize: te.FontSize ?? s,
        FontWeight: te.FontWeight ?? l,
        LineHeight: te.LineHeight ?? d,
        ForegroundColor: te.ForegroundColor ?? u,
        BackgroundColor: te.BackgroundColor ?? p
      });
    }
    return b`<div
        class="jcl-component noteboard ${t}"
        ref=${$} ...${e.RestProps}
      >
        <div class="notepane"
          style="width:${Ue}px; height:${pt}px"
        >
          ${n.map((te, ee) => {
      const ne = x[ee], se = T.has(ne);
      return b`<${jm} key=${ne}
              NoteKey=${ne} Geometry=${F(te, ne)}
              isSelected=${se} isSelectable=${v}
              isDraggable=${C} NoteStyle=${ft(te)}
              ScrollerOf=${() => $.current}
              renderedContent=${Xe(
        'NoteBoard callback "NoteRenderer"',
        j,
        te,
        se
      )}
              onNoteClick=${(xe, ve, _e) => L(
        ne,
        jn(_e)
      )}
              onMoveStart=${(xe, ve, _e, Ae, Oe) => Q("move", ne, Oe)}
              onMoveContinuation=${(xe, ve, _e, Ae, Oe) => pe(xe, ve, Oe)}
              onMoveFinish=${(xe, ve) => q(xe, ve)}
              onMoveCancellation=${() => J()}
              onResizeStart=${(xe, ve, _e, Ae, Oe) => Q("resize", ne, Oe)}
              onResizeContinuation=${(xe, ve, _e, Ae, Oe) => pe(xe, ve, Oe)}
              onResizeFinish=${(xe, ve) => q(xe, ve)}
              onResizeCancellation=${() => J()}
            />`;
    })}
        </>
      </>`;
  });
}
function jm(e) {
  const {
    NoteKey: t,
    Geometry: n,
    isSelected: o,
    isSelectable: r,
    isDraggable: a,
    NoteStyle: i,
    ScrollerOf: s,
    renderedContent: l,
    onNoteClick: d,
    onMoveStart: u,
    onMoveContinuation: p,
    onMoveFinish: c,
    onMoveCancellation: f,
    onResizeStart: h,
    onResizeContinuation: g,
    onResizeFinish: y,
    onResizeCancellation: m
  } = e, v = U(null), C = to({
    ViewRef: v,
    Container: s,
    onlyFrom: ".titlebar",
    onClick: r ? d : void 0,
    onDragStart: a ? u : void 0,
    onDragContinuation: a ? p : void 0,
    onDragFinish: a ? c : void 0,
    onDragCancellation: a ? f : void 0
  }), _ = An({
    ViewRef: v,
    Container: s,
    onlyFrom: ".resize-handle",
    onDragStart: a ? h : void 0,
    onDragContinuation: a ? g : void 0,
    onDragFinish: a ? y : void 0,
    onDragCancellation: a ? m : void 0
  });
  return b`<div
      class="stickynote${o ? " selected" : ""}"
      style="left:${n.x}px; top:${n.y}px; width:${n.Width}px; height:${n.Height}px; ${i}"
      ref=${v} data-note-key=${t}
      onPointerDown=${(j) => {
    _?.(j), C?.(j);
  }}
    >
      <div class="titlebar"/>
      <div class="content-area">${l}</>
      ${a && b`<div class="resize-handle" aria-hidden="true"/>`}
    </>`;
}
const Im = /* @__PURE__ */ Z("jcl-component.noteboard", `
    .jcl-component.noteboard {
      display:block !important; position:relative;
      overflow:auto; overscroll-behavior:contain;
      border:solid 1px #888888; border-radius:2px;
      background-color:#EEEEEE; /* fills spare areas beside/below the pane */
      padding:0px;
    }

    .jcl-component.noteboard > .notepane {
      display:block; position:relative; overflow:hidden;
      background:white;
    }

    .jcl-component.noteboard .stickynote {
      display:flex; flex-flow:column nowrap; align-items:stretch;
      position:absolute;             /* siblings stack in "Notes" order */
      background:#FFFFA8; color:black;
      border:solid 1px #888888; border-radius:4px;
      box-shadow:0px 2px 6px 0px rgba(0,0,0,0.25);
      font-size:14px;
    }
    .jcl-component.noteboard .stickynote.selected {
      outline:solid 2px dodgerblue;
    }

    .jcl-component.noteboard .stickynote > .titlebar {
      flex:0 0 16px; cursor:grab; user-select:none;
      background:rgba(0,0,0,0.06);
      border-bottom:solid 1px rgba(0,0,0,0.15);
      border-radius:3px 3px 0px 0px;

      -webkit-touch-callout:none;
      -ms-touch-action:none; touch-action:none;
    }

    .jcl-component.noteboard .stickynote > .content-area {
      display:flex; flex-flow:column nowrap; align-items:stretch;
      flex:1 1 auto; position:relative; overflow:hidden;
      border-radius:0px 0px 3px 3px;
    }
    .jcl-component.noteboard .stickynote > .content-area > .sticky-note-content {
      flex:1 1 auto; width:100%; min-height:0px;
    }

    .jcl-component.noteboard .stickynote .sticky-text-note {
      border:none; border-radius:0px; background:transparent;
      padding:4px;
    }
    .jcl-component.noteboard .stickynote .sticky-html-note {
      border:none; border-radius:0px; background:transparent;
    }
    .jcl-component.noteboard .stickynote .sticky-markdown-note {
      padding:4px; cursor:default;
    }

    .jcl-component.noteboard .stickynote > .resize-handle {
      position:absolute; right:0px; bottom:0px; width:24px; height:24px;
      background:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAbUlEQVRIS9WTwQ0AIAgDZV0GYl2NP2KMEWmjOkAvPawU8hNGvpnVnquq8ifAW6E0gAO88/GmkAZ0wOonQhrAASslHZbeAR0QWf8bN4goOdoBHRBxftQADsgo2doBHZBRcucGSCXTBnQA0vmY1QDfJWAZ8ODrpQAAAABJRU5ErkJggg==");
      background-repeat:no-repeat;
      background-size:contain; background-position:center;
      cursor:nwse-resize; pointer-events:auto;

      -webkit-touch-callout:none;
      -ms-touch-action:none; touch-action:none;
    }

    .sticky-markdown-editor {          /* lives in a dialog, not in the board */
      display:block; width:100%; height:100%;
      min-width:240px; min-height:180px;
      resize:none;
    }
  `);
function Dc(e) {
  return H(() => {
    e = G(e);
    const t = z(e.Content, Mo) ?? "", n = R(e.onContentChange), o = $e(e.TabWidth) ?? 10, r = !t.includes("	");
    return b`<${ti}
        Class="sticky-note-content sticky-text-note"
        Style=${No(e) + (r ? "" : `tab-size:${o}px;`)}
        Value=${t} wrap=${r}
        readonly=${n == null}
        onKeyDown=${Sc}
        onValueInput=${(a) => E(
      'stickyTextNote callback "onContentChange"',
      n,
      a
    )}
      />`;
  });
}
function ai(e) {
  return H(() => {
    e = G(e);
    const t = z(e.Content, Mo) ?? "", n = R(e.onContentChange);
    return b`<${ac}
        Class="sticky-note-content sticky-html-note"
        style=${No(e)}
        Value=${t} readonly=${n == null}
        onValueChange=${(o) => E(
      'stickyHTMLNote callback "onContentChange"',
      n,
      o
    )}
      />`;
  });
}
function Lc(e) {
  return H(() => {
    e = G(e);
    const t = z(e.Content, Mo) ?? "", n = R(e.onContentChange), { openDialog: o } = oo(), r = Vt(), a = U("");
    a.current = t;
    function i() {
      n != null && o({
        Name: "stickyMarkdownNote-" + r,
        Title: "Markdown",
        isModal: !1,
        isDraggable: !0,
        hasCloseButton: !0,
        isResizable: !0,
        Renderer: () => b`<${ti}
            Class="sticky-markdown-editor"
            Value=${a.current}
            onKeyDown=${Sc}
            onValueInput=${(s) => {
          a.current = s, E(
            'stickyMarkdownNote callback "onContentChange"',
            n,
            s
          );
        }}
          />`
      });
    }
    return b`<${Ul}
        Class="sticky-note-content sticky-markdown-note"
        style=${No(e)}
        Value=${t}
        onDblClick=${i}
      />`;
  });
}
const Tn = 6, Cs = 2, $s = 9, js = 9, _m = 80, Sm = br, Dm = yr, Po = 16, Is = 20;
function Gn(e, t) {
  const { x: n, y: o } = e.Position, { Width: r, Height: a } = e.Size;
  switch (t.Direction) {
    case "n":
      return { x: n + t.Offset, y: o };
    case "s":
      return { x: n + t.Offset, y: o + a };
    case "w":
      return { x: n, y: o + t.Offset };
    default:
      return { x: n + r, y: o + t.Offset };
  }
}
function ia(e) {
  switch (e) {
    case "n":
      return { x: 0, y: -1 };
    case "s":
      return { x: 0, y: 1 };
    case "w":
      return { x: -1, y: 0 };
    default:
      return { x: 1, y: 0 };
  }
}
function _s(e, t, n, o) {
  const r = Math.hypot(n.x - e.x, n.y - e.y), a = Math.min(r / 2, _m), i = ia(t), s = {
    x: e.x + a * i.x,
    y: e.y + a * i.y
  };
  let l = n;
  if (o != null) {
    const p = ia(o);
    l = { x: n.x + a * p.x, y: n.y + a * p.y };
  }
  const d = $n({
    Anchors: [e, n],
    Controls: [{ c1: s, c2: l }],
    closed: !1
  }), u = (Math.abs(n.x - l.x) + Math.abs(n.y - l.y) < 1e-3 ? Math.atan2(n.y - s.y, n.x - s.x) : Math.atan2(n.y - l.y, n.x - l.x)) * 180 / Math.PI;
  return { Path: d, ArrowAngle: u };
}
function en(e) {
  return {
    x: e.Position.x,
    y: e.Position.y,
    Width: e.Size.Width,
    Height: e.Size.Height
  };
}
function Lm(e, t) {
  return e.length === 0 || t.length === 0 ? { vertical: /* @__PURE__ */ new Map(), horizontal: /* @__PURE__ */ new Map() } : $c(
    e.map(aa),
    t.map(aa),
    1
    // [px] - no zooming here
  );
}
function Mm(e) {
  return H(() => {
    Em(), e = G(e);
    const t = D(e.Class) ?? "", n = z(e.Nodes, (k) => Ie(k, De)) ?? Me("Nodes"), o = z(e.Edges, (k) => Ie(k, De)) ?? Me("Edges"), r = z(e.StickyNotes, (k) => Ie(k, De)) ?? [], a = z(e.Groups, (k) => Ie(k, De)) ?? [], i = $e(e.PaneWidth), s = $e(e.PaneHeight);
    let l = z(e.selectedNodeKeys, (k) => Ie(k, at)) ?? [], d = z(e.selectedEdgeKeys, (k) => Ie(k, at)) ?? [], u = z(e.selectedStickyNoteKeys, (k) => Ie(k, at)) ?? [], p = z(e.selectedGroupKeys, (k) => Ie(k, at)) ?? [];
    const c = R(e.onSelectionChange), f = R(e.onNodesChange), h = R(e.onEdgesChange), g = R(e.onStickyNotesChange), y = R(e.onStickyNoteContentChange), m = R(e.onGroupsChange), v = R(e.onEdgeCreate), C = R(e.onNodeDoubleClick), _ = R(e.PortIsValidTarget), j = D(e.InputFillColor) ?? "#B3E5FC", x = D(e.OutputFillColor) ?? "#FFE0B2", w = D(e.DefaultEdgeColor) ?? "#666666", T = D(e.DefaultFontFamily), L = qe(e.DefaultFontSize), $ = z(e.DefaultFontWeight, (k) => bt(k) || Ne(k)), I = qe(e.DefaultLineHeight), M = D(e.DefaultForegroundColor), S = D(e.DefaultBackgroundColor), F = $e(e.SensorWidth) ?? 20, N = $e(e.maxPanningSpeed) ?? 400, X = Y(e.SnapToGrid) ?? !1, Q = $e(e.GridWidth) ?? 10, pe = $e(e.GridHeight) ?? 10, q = c != null, J = f != null, P = g != null, ue = v != null, ke = J || P, Ve = {
      // pure fallbacks for StickyNotes
      FontFamily: T,
      FontSize: L,
      FontWeight: $,
      LineHeight: I,
      ForegroundColor: M,
      BackgroundColor: S
    };
    function Ue(k, A) {
      return Pc(
        k.map((B) => String(B.Key)),
        A
      );
    }
    const pt = Ue(n, '"Nodes"'), ft = Ue(o, '"Edges"'), te = Ue(r, '"StickyNotes"'), ee = Ue(a, '"Groups"');
    n.forEach((k) => {
      Ue(k.InputPorts ?? [], `input ports of node "${k.Key}"`), Ue(k.OutputPorts ?? [], `output ports of node "${k.Key}"`);
    });
    function ne(k, A = /* @__PURE__ */ new Set()) {
      if (A.has(k))
        return { NodeKeys: [], StickyNoteKeys: [] };
      const B = a.find((de) => String(de.Key) === k);
      if (B == null)
        return { NodeKeys: [], StickyNoteKeys: [] };
      A.add(k);
      const V = [...B.NodeKeys ?? []], W = [...B.StickyNoteKeys ?? []];
      return (B.GroupKeys ?? []).forEach((de) => {
        const le = ne(String(de), A);
        V.push(...le.NodeKeys), W.push(...le.StickyNoteKeys);
      }), A.delete(k), { NodeKeys: V, StickyNoteKeys: W };
    }
    q ? (l = ho(l, pt), d = ho(d, ft), u = ho(u, te), p = ho(p, ee)) : (l = [], d = [], u = [], p = []);
    const se = new Set(l), xe = new Set(d), ve = new Set(u), _e = new Set(p);
    function Ae(k, A, B) {
      function V(de, le) {
        return le.has(A) ? de.filter((we) => we !== A) : [...de, A];
      }
      let W;
      return B ? W = {
        selectedNodeKeys: k === "node" ? V(l, se) : l,
        selectedEdgeKeys: k === "edge" ? V(d, xe) : d,
        selectedStickyNoteKeys: k === "stickyNote" ? V(u, ve) : u,
        selectedGroupKeys: k === "group" ? V(p, _e) : p
      } : W = {
        selectedNodeKeys: k === "node" ? [A] : [],
        selectedEdgeKeys: k === "edge" ? [A] : [],
        selectedStickyNoteKeys: k === "stickyNote" ? [A] : [],
        selectedGroupKeys: k === "group" ? [A] : []
      }, Oe(
        W.selectedNodeKeys,
        W.selectedEdgeKeys,
        W.selectedStickyNoteKeys,
        W.selectedGroupKeys
      ), W;
    }
    function Oe(k, A, B, V) {
      E(
        'DataFlowProcessView callback "onSelectionChange"',
        c,
        k,
        A,
        B,
        V
      );
    }
    function mt() {
      (l.length > 0 || d.length > 0 || u.length > 0 || p.length > 0) && Oe([], [], [], []);
    }
    const ye = U(null), ge = U(null), nt = U(null), K = U(void 0), ae = dt();
    je(() => () => {
      const k = K.current;
      k != null && (k.ChangeRAF != null && cancelAnimationFrame(k.ChangeRAF), k.PanningRAF != null && cancelAnimationFrame(k.PanningRAF), K.current = void 0), lo.current != null && clearTimeout(lo.current);
    }, []);
    function me(k, A) {
      return X && A > 0 ? Math.round(k / A) * A : k;
    }
    function Ge(k) {
      return {
        minWidth: k.minSize?.Width ?? Sm,
        minHeight: k.minSize?.Height ?? Dm,
        maxWidth: k.maxSize?.Width ?? 1 / 0,
        maxHeight: k.maxSize?.Height ?? 1 / 0
      };
    }
    const O = {
      // NoteBoard's minimal sizes
      minWidth: br,
      minHeight: yr,
      maxWidth: 1 / 0,
      maxHeight: 1 / 0
    };
    function oe(k, A) {
      const { Mode: B, Direction: V, dx: W, dy: de } = K.current;
      let { x: le, y: we, Width: Ee, Height: tt } = k;
      if (B === "move")
        return le = lt(me(le + W, Q), 0, ln - Ee), we = lt(me(we + de, pe), 0, cn - tt), { x: le, y: we, Width: Ee, Height: tt };
      const ze = le + Ee, Te = we + tt;
      if (V.includes("e") && (Ee = lt(
        me(ze + W, Q),
        le + A.minWidth,
        Math.min(le + A.maxWidth, ln)
      ) - le), V.includes("w")) {
        const jt = lt(
          me(le + W, Q),
          Math.max(0, ze - A.maxWidth),
          ze - A.minWidth
        );
        Ee = ze - jt, le = jt;
      }
      if (V.includes("s") && (tt = lt(
        me(Te + de, pe),
        we + A.minHeight,
        Math.min(we + A.maxHeight, cn)
      ) - we), V.includes("n")) {
        const jt = lt(
          me(we + de, pe),
          Math.max(0, Te - A.maxHeight),
          Te - A.minHeight
        );
        tt = Te - jt, we = jt;
      }
      return { x: le, y: we, Width: Ee, Height: tt };
    }
    function fe(k, A, B) {
      const V = K.current?.StartGeometryByKey?.[k];
      return V == null ? {
        x: A.Position.x,
        y: A.Position.y,
        Width: A.Size.Width,
        Height: A.Size.Height
      } : oe(V, B);
    }
    function Be() {
      return n.map((k) => {
        const A = K.current?.StartGeometryByKey?.["node:" + k.Key];
        if (A == null)
          return k;
        const { x: B, y: V, Width: W, Height: de } = oe(
          A,
          Ge(k)
        );
        return { ...k, Position: { x: B, y: V }, Size: { Width: W, Height: de } };
      });
    }
    function Fe() {
      return r.map((k) => {
        const A = K.current?.StartGeometryByKey?.["stickyNote:" + k.Key];
        if (A == null)
          return k;
        const { x: B, y: V, Width: W, Height: de } = oe(
          A,
          O
        );
        return { ...k, Position: { x: B, y: V }, Size: { Width: W, Height: de } };
      });
    }
    function Pe() {
      const k = K.current?.StartGeometryByKey ?? {};
      return Object.keys(k).some(
        (A) => A.startsWith("node:")
      );
    }
    function Rt() {
      const k = K.current?.StartGeometryByKey ?? {};
      return Object.keys(k).some(
        (A) => A.startsWith("stickyNote:")
      );
    }
    function xt() {
      const k = K.current;
      k == null || k.ChangeRAF != null || (k.ChangeRAF = requestAnimationFrame(() => {
        const A = K.current;
        A != null && (A.ChangeRAF = void 0, $i());
      }));
    }
    function $i() {
      Pe() && E(
        'DataFlowProcessView callback "onNodesChange"',
        f,
        Be()
      ), Rt() && E(
        'DataFlowProcessView callback "onStickyNotesChange"',
        g,
        Fe()
      );
    }
    function ro(k, A, B, V, W) {
      let de = A === "node" ? [B] : [], le = A === "stickyNote" ? [B] : [], we = A === "group" ? [B] : [];
      if (q) {
        let Te = {
          selectedNodeKeys: l,
          selectedEdgeKeys: d,
          selectedStickyNoteKeys: u,
          selectedGroupKeys: p
        };
        if (!(A === "node" ? se : A === "group" ? _e : ve).has(B)) {
          const $d = jn(W);
          Te = Ae(A, B, $d);
        }
        (A === "node" ? Te.selectedNodeKeys : A === "group" ? Te.selectedGroupKeys : Te.selectedStickyNoteKeys).includes(B) && (de = Te.selectedNodeKeys, le = Te.selectedStickyNoteKeys, we = Te.selectedGroupKeys);
      }
      const Ee = new Set(de), tt = new Set(le);
      we.forEach((Te) => {
        const jt = ne(Te);
        jt.NodeKeys.forEach(
          (Ko) => Ee.add(String(Ko))
        ), jt.StickyNoteKeys.forEach(
          (Ko) => tt.add(String(Ko))
        );
      });
      const ze = {};
      n.forEach((Te) => {
        Ee.has(String(Te.Key)) && (ze["node:" + Te.Key] = en(Te));
      }), r.forEach((Te) => {
        tt.has(String(Te.Key)) && (ze["stickyNote:" + Te.Key] = en(Te));
      }), K.current = {
        Mode: k,
        Direction: V,
        StartGeometryByKey: ze,
        dx: 0,
        dy: 0,
        lastClientX: void 0,
        lastClientY: void 0,
        ChangeRAF: void 0,
        PanningRAF: void 0,
        PanningTimestamp: void 0
      }, ae();
    }
    function ao(k, A, B) {
      const V = K.current;
      V != null && (V.dx = k, V.dy = A, B != null && (V.lastClientX = B.clientX, V.lastClientY = B.clientY), V.Mode === "move" && V.PanningRAF == null && (V.PanningTimestamp = void 0, V.PanningRAF = requestAnimationFrame(
        (W) => Wo.current?.(W)
      )), ae(), xt());
    }
    function io(k, A) {
      const B = K.current;
      B != null && (B.dx = k, B.dy = A, B.ChangeRAF != null && cancelAnimationFrame(B.ChangeRAF), B.PanningRAF != null && cancelAnimationFrame(B.PanningRAF), $i(), K.current = void 0, ae());
    }
    function so() {
      const k = K.current;
      if (k == null)
        return;
      k.ChangeRAF != null && cancelAnimationFrame(k.ChangeRAF), k.PanningRAF != null && cancelAnimationFrame(k.PanningRAF);
      const { StartGeometryByKey: A } = k;
      Pe() && E(
        'DataFlowProcessView callback "onNodesChange"',
        f,
        n.map((B) => {
          const V = A["node:" + B.Key];
          return V == null ? B : {
            ...B,
            Position: { x: V.x, y: V.y },
            Size: { Width: V.Width, Height: V.Height }
          };
        })
      ), Rt() && E(
        'DataFlowProcessView callback "onStickyNotesChange"',
        g,
        r.map((B) => {
          const V = A["stickyNote:" + B.Key];
          return V == null ? B : {
            ...B,
            Position: { x: V.x, y: V.y },
            Size: { Width: V.Width, Height: V.Height }
          };
        })
      ), K.current = void 0, ae();
    }
    function id(k, A, B, V) {
      K.current = {
        Mode: "rubberEdge",
        Source: { NodeKey: k, PortKey: A },
        hasMoved: !1,
        PointerPosition: { x: B, y: V },
        StartGeometryByKey: {},
        dx: 0,
        dy: 0,
        lastClientX: void 0,
        lastClientY: void 0,
        ChangeRAF: void 0,
        PanningRAF: void 0,
        PanningTimestamp: void 0
      }, ae();
    }
    function sd(k, A, B) {
      const V = K.current;
      V == null || V.Mode !== "rubberEdge" || (V.hasMoved = !0, V.PointerPosition = { x: k, y: A }, B != null && (V.lastClientX = B.clientX, V.lastClientY = B.clientY), V.PanningRAF == null && (V.PanningTimestamp = void 0, V.PanningRAF = requestAnimationFrame(
        (W) => Wo.current?.(W)
      )), ae());
    }
    function ld(k, A) {
      const B = K.current;
      if (B == null || B.Mode !== "rubberEdge")
        return;
      B.PanningRAF != null && cancelAnimationFrame(B.PanningRAF);
      const V = B.Source;
      K.current = void 0;
      const W = dd(k, A, V);
      W != null && E(
        'DataFlowProcessView callback "onEdgeCreate"',
        v,
        { Source: V, Target: W }
      ), ae();
    }
    function cd() {
      const k = K.current;
      k == null || k.Mode !== "rubberEdge" || (k.PanningRAF != null && cancelAnimationFrame(k.PanningRAF), K.current = void 0, ae());
    }
    function ji(k, A, B) {
      return B.disabled == !0 ? !1 : _ == null ? !0 : Xe(
        'DataFlowProcessView callback "PortIsValidTarget"',
        _,
        k,
        A
      ) == !0;
    }
    function dd(k, A, B) {
      const V = Tn + Cs;
      for (let W = Qt.length - 1; W >= 0; W--) {
        const de = Qt[W], le = (de.InputPorts ?? []).find((we) => {
          const Ee = Gn(de, we);
          return Math.hypot(Ee.x - k, Ee.y - A) <= V;
        });
        if (le != null) {
          const we = { NodeKey: String(de.Key), PortKey: String(le.Key) };
          return ji(B, we, le) ? we : void 0;
        }
      }
    }
    function ud(k, A) {
      K.current = {
        Mode: "lasso",
        LassoStart: { x: k, y: A },
        PointerPosition: { x: k, y: A },
        StartGeometryByKey: {},
        dx: 0,
        dy: 0,
        lastClientX: void 0,
        lastClientY: void 0,
        ChangeRAF: void 0,
        PanningRAF: void 0,
        PanningTimestamp: void 0
      }, ae();
    }
    function pd(k, A) {
      const B = K.current;
      B == null || B.Mode !== "lasso" || (B.PointerPosition = { x: k, y: A }, ae());
    }
    function Ii(k) {
      const { LassoStart: A, PointerPosition: B } = k;
      return {
        x: Math.min(A.x, B.x),
        y: Math.min(A.y, B.y),
        Width: Math.abs(B.x - A.x),
        Height: Math.abs(B.y - A.y)
      };
    }
    function fd(k, A) {
      const B = K.current;
      if (B == null || B.Mode !== "lasso")
        return;
      B.PointerPosition = { x: k, y: A };
      const V = Ii(B);
      K.current = void 0;
      const W = Qt.filter(
        (le) => ra(V, en(le))
      ).map((le) => String(le.Key)), de = Uo.filter(
        (le) => ra(V, en(le))
      ).map((le) => String(le.Key));
      Oe(W, [], de, []), ae();
    }
    function hd() {
      K.current?.Mode === "lasso" && (K.current = void 0, ae());
    }
    function gd(k, A, B) {
      const V = jn(B), W = md(k, A);
      switch (!0) {
        case W != null:
          Ae("edge", W, V);
          break;
        case !V:
          mt();
          break;
        default:
      }
    }
    function md(k, A) {
      const B = nt.current;
      if (B == null)
        return;
      const V = Array.from(B.querySelectorAll("path[data-edge-key]"));
      for (let W = V.length - 1; W >= 0; W--) {
        const de = V[W];
        if (typeof de.isPointInStroke != "function")
          return;
        const le = B.createSVGPoint();
        le.x = k, le.y = A;
        const we = parseFloat(getComputedStyle(de).strokeWidth) || 0, Ee = de.getAttribute("stroke-width");
        de.setAttribute("stroke-width", String(we + 2 * Cs));
        try {
          if (de.isPointInStroke(le))
            return de.getAttribute("data-edge-key") ?? void 0;
        } finally {
          Ee == null ? de.removeAttribute("stroke-width") : de.setAttribute("stroke-width", Ee);
        }
      }
    }
    const bd = to({
      ViewRef: ge,
      Container: () => ye.current,
      onlyFrom: ".dfp-pane",
      onClick: q ? gd : void 0,
      onDragStart: q ? (k, A, B, V) => ud(B, V) : void 0,
      onDragContinuation: q ? (k, A, B, V) => pd(B, V) : void 0,
      onDragFinish: q ? (k, A, B, V) => fd(B, V) : void 0,
      onDragCancellation: q ? () => hd() : void 0
    });
    function yd(k) {
      const A = K.current, B = ye.current;
      if (A == null || B == null || A.Mode !== "move" && A.Mode !== "rubberEdge")
        return;
      const { lastClientX: V, lastClientY: W } = A;
      if (V == null || W == null) {
        A.PanningRAF = void 0, A.PanningTimestamp = void 0;
        return;
      }
      const { vx: de, vy: le } = ed(
        B.getBoundingClientRect(),
        V,
        W,
        F,
        N
      );
      if (de === 0 && le === 0) {
        A.PanningRAF = void 0, A.PanningTimestamp = void 0;
        return;
      }
      const we = td(A, k), Ee = B.scrollLeft, tt = B.scrollTop;
      B.scrollLeft = Ee + de * we, B.scrollTop = tt + le * we;
      const ze = B.scrollLeft - Ee, Te = B.scrollTop - tt;
      A.Mode === "move" ? (A.dx += ze, A.dy += Te, _i.current?.()) : A.PointerPosition = {
        // ...is kept in content coordinates
        x: A.PointerPosition.x + ze,
        y: A.PointerPosition.y + Te
      }, ae(), A.PanningRAF = requestAnimationFrame(
        (jt) => Wo.current?.(jt)
      );
    }
    const Wo = U();
    Wo.current = yd;
    const _i = U();
    _i.current = xt;
    const Fr = U(!1), lo = U(void 0);
    function Si(k = 3e3) {
      Fr.current = !0, ae(), clearTimeout(lo.current), lo.current = setTimeout(() => {
        lo.current = void 0, Fr.current = !1, ae();
      }, k);
    }
    function Ho(k, A) {
      const B = new Set(l), V = new Set(u);
      p.forEach((W) => {
        const de = ne(W);
        de.NodeKeys.forEach(
          (le) => B.add(String(le))
        ), de.StickyNoteKeys.forEach(
          (le) => V.add(String(le))
        );
      }), J && B.size > 0 && E(
        'DataFlowProcessView callback "onNodesChange"',
        f,
        n.map((W) => {
          if (!B.has(String(W.Key)))
            return W;
          const { Width: de, Height: le } = W.Size;
          return { ...W, Position: {
            x: lt(W.Position.x + k, 0, ln - de),
            y: lt(W.Position.y + A, 0, cn - le)
          } };
        })
      ), P && V.size > 0 && E(
        'DataFlowProcessView callback "onStickyNotesChange"',
        g,
        r.map((W) => {
          if (!V.has(String(W.Key)))
            return W;
          const { Width: de, Height: le } = W.Size;
          return { ...W, Position: {
            x: lt(W.Position.x + k, 0, ln - de),
            y: lt(W.Position.y + A, 0, cn - le)
          } };
        })
      ), Si();
    }
    function Go(k, A) {
      J && l.length > 0 && E(
        'DataFlowProcessView callback "onNodesChange"',
        f,
        n.map((B) => {
          if (!se.has(String(B.Key)))
            return B;
          const V = Ge(B), { x: W, y: de } = B.Position;
          return { ...B, Size: {
            Width: lt(
              B.Size.Width + k,
              V.minWidth,
              Math.min(V.maxWidth, ln - W)
            ),
            Height: lt(
              B.Size.Height + A,
              V.minHeight,
              Math.min(V.maxHeight, cn - de)
            )
          } };
        })
      ), P && u.length > 0 && E(
        'DataFlowProcessView callback "onStickyNotesChange"',
        g,
        r.map((B) => {
          if (!ve.has(String(B.Key)))
            return B;
          const { x: V, y: W } = B.Position;
          return { ...B, Size: {
            Width: lt(
              B.Size.Width + k,
              br,
              ln - V
            ),
            Height: lt(
              B.Size.Height + A,
              yr,
              cn - W
            )
          } };
        })
      ), Si();
    }
    function xd(k, A, B, V) {
      let W = k.filter((le) => !A.has(String(le.Key))).map((le) => B.size === 0 && V.size === 0 ? le : {
        ...le,
        NodeKeys: B.size === 0 ? le.NodeKeys ?? [] : (le.NodeKeys ?? []).filter(
          (we) => !B.has(String(we))
        ),
        StickyNoteKeys: V.size === 0 ? le.StickyNoteKeys ?? [] : (le.StickyNoteKeys ?? []).filter(
          (we) => !V.has(String(we))
        )
      }), de = !0;
      for (; de; ) {
        de = !1;
        const le = new Set(
          W.map((Ee) => String(Ee.Key))
        );
        W = W.map((Ee) => {
          const tt = (Ee.GroupKeys ?? []).filter(
            (ze) => le.has(String(ze))
          );
          return tt.length === (Ee.GroupKeys ?? []).length ? Ee : (de = !0, { ...Ee, GroupKeys: tt });
        });
        const we = W.filter((Ee) => (Ee.NodeKeys ?? []).length > 0 || (Ee.StickyNoteKeys ?? []).length > 0 || (Ee.GroupKeys ?? []).length > 0);
        we.length !== W.length && (de = !0, W = we);
      }
      return W;
    }
    function vd() {
      const k = new Set(J ? l : []), A = new Set(P ? u : []), B = new Set(m != null ? p : []), V = /* @__PURE__ */ new Set();
      h != null && (d.forEach((W) => V.add(W)), o.forEach((W) => {
        (k.has(String(W.Source?.NodeKey)) || k.has(String(W.Target?.NodeKey))) && V.add(String(W.Key));
      })), k.size > 0 && E(
        'DataFlowProcessView callback "onNodesChange"',
        f,
        n.filter((W) => !k.has(String(W.Key)))
      ), V.size > 0 && E(
        'DataFlowProcessView callback "onEdgesChange"',
        h,
        o.filter((W) => !V.has(String(W.Key)))
      ), A.size > 0 && E(
        'DataFlowProcessView callback "onStickyNotesChange"',
        g,
        r.filter((W) => !A.has(String(W.Key)))
      ), m != null && (B.size > 0 || k.size > 0 || A.size > 0) && E(
        'DataFlowProcessView callback "onGroupsChange"',
        m,
        xd(a, B, k, A)
      ), q && (k.size > 0 || V.size > 0 || A.size > 0 || B.size > 0) && Oe(
        l.filter((W) => !k.has(W)),
        d.filter((W) => !V.has(W)),
        u.filter((W) => !A.has(W)),
        p.filter((W) => !B.has(W))
      );
    }
    function wd(k) {
      const A = k.target;
      if (
        // for embedded controls
        A != null && A.closest?.(".dfp-content-area, input, textarea, [contenteditable]") != null
      )
        return;
      const B = (k.shiftKey ? 10 : 1) * (X ? Q : 1), V = (k.shiftKey ? 10 : 1) * (X ? pe : 1);
      let W = !0;
      switch (!0) {
        case k.key === "Escape":
          mt();
          break;
        case (k.key === "Delete" || k.key === "Backspace"):
          vd();
          break;
        case k.key === "ArrowLeft":
          k.altKey ? Go(-B, 0) : Ho(-B, 0);
          break;
        case k.key === "ArrowRight":
          k.altKey ? Go(B, 0) : Ho(B, 0);
          break;
        case k.key === "ArrowUp":
          k.altKey ? Go(0, -V) : Ho(0, -V);
          break;
        case k.key === "ArrowDown":
          k.altKey ? Go(0, V) : Ho(0, V);
          break;
        default:
          W = !1;
      }
      W && k.preventDefault();
    }
    const Di = Tl(ye), ln = i ?? Di.Width, cn = s ?? Di.Height, Qt = n.map((k) => {
      const { x: A, y: B, Width: V, Height: W } = fe(
        "node:" + k.Key,
        k,
        Ge(k)
      );
      return { ...k, Position: { x: A, y: B }, Size: { Width: V, Height: W } };
    }), Uo = r.map((k) => {
      const { x: A, y: B, Width: V, Height: W } = fe(
        "stickyNote:" + k.Key,
        k,
        O
      );
      return { ...k, Position: { x: A, y: B }, Size: { Width: V, Height: W } };
    }), Li = {};
    Qt.forEach(
      (k) => {
        Li[String(k.Key)] = k;
      }
    );
    const Mi = {};
    Uo.forEach(
      (k) => {
        Mi[String(k.Key)] = k;
      }
    );
    const Ai = {};
    a.forEach(
      (k) => {
        Ai[String(k.Key)] = k;
      }
    );
    const co = {};
    function Ti(k, A) {
      if (k in co)
        return co[k];
      if (A.has(k))
        return;
      const B = Ai[k];
      if (B == null) {
        co[k] = void 0;
        return;
      }
      A.add(k);
      const V = [];
      let W = -1;
      if ((B.NodeKeys ?? []).forEach((ze) => {
        const Te = Li[String(ze)];
        Te != null && V.push(en(Te));
      }), (B.StickyNoteKeys ?? []).forEach((ze) => {
        const Te = Mi[String(ze)];
        Te != null && V.push(en(Te));
      }), (B.GroupKeys ?? []).forEach((ze) => {
        const Te = Ti(String(ze), A);
        Te != null && (V.push(Te), W = Math.max(W, Te.Depth));
      }), A.delete(k), V.length === 0) {
        co[k] = void 0;
        return;
      }
      const de = Math.min(...V.map((ze) => ze.x)), le = Math.min(...V.map((ze) => ze.y)), we = Math.max(...V.map((ze) => ze.x + ze.Width)), Ee = Math.max(...V.map((ze) => ze.y + ze.Height)), tt = {
        x: de - Po,
        y: le - Po - Is,
        Width: we - de + 2 * Po,
        Height: Ee - le + 2 * Po + Is,
        Depth: W + 1
      };
      return co[k] = tt, tt;
    }
    const kd = a.map((k) => {
      const A = Ti(String(k.Key), /* @__PURE__ */ new Set());
      if (A != null)
        return {
          ...k,
          Position: { x: A.x, y: A.y },
          Size: { Width: A.Width, Height: A.Height },
          Depth: A.Depth
        };
    }).filter(
      (k) => k != null
    ).sort((k, A) => A.Depth - k.Depth), Bt = K.current;
    let Ri;
    if (Bt?.Mode === "move" || Fr.current) {
      const k = [], A = [], B = (V, W, de) => {
        V.forEach((le) => {
          ((Bt?.Mode === "move" ? Bt.StartGeometryByKey[W + le.Key] != null : de.has(String(le.Key))) ? k : A).push(en(le));
        });
      };
      B(Qt, "node:", se), B(Uo, "stickyNote:", ve), Ri = Lm(k, A);
    }
    const Fi = Bt?.Mode === "rubberEdge";
    let Oi;
    if (Fi && Bt?.hasMoved === !0) {
      const k = Qt.find(
        (B) => String(B.Key) === Bt.Source.NodeKey
      ), A = (k?.OutputPorts ?? []).find(
        (B) => String(B.Key) === Bt.Source.PortKey
      );
      k != null && A != null && (Oi = {
        from: Gn(k, A),
        fromDirection: A.Direction,
        to: Bt.PointerPosition
      });
    }
    const Cd = Bt?.Mode === "lasso" ? Ii(Bt) : void 0;
    return b`<div
        class="jcl-component dataflow-process-view ${t}"
        ref=${ye} tabindex="0" onKeyDown=${wd}
        ...${e.RestProps}
      >
        <div class="dfp-pane" ref=${ge}
          style="width:${ln}px; height:${cn}px"
          onPointerDown=${bd}
        >
          <div class="dfp-group-layer">
            ${kd.map((k) => {
      const A = String(k.Key), B = _e.has(A);
      return b`<${Om} key=${A}
                Group=${k} GroupKey=${A}
                isSelected=${B} isSelectable=${q}
                isDraggable=${ke}
                ScrollerOf=${() => ye.current}
                onGroupClick=${(V, W, de) => Ae(
        "group",
        A,
        jn(de)
      )}
                onMoveStart=${(V, W, de, le, we) => ro("move", "group", A, void 0, we)}
                onMoveContinuation=${(V, W, de, le, we) => ao(V, W, we)}
                onMoveFinish=${(V, W) => io(V, W)}
                onMoveCancellation=${() => so()}
              />`;
    })}
          </>

          <${Nm}
            SVGRef=${nt}
            PaneWidth=${ln} PaneHeight=${cn}
            Nodes=${Qt} Edges=${o}
            EdgeSelectionSet=${xe}
            DefaultEdgeColor=${w}
            RubberEdge=${Oi} LassoBox=${Cd}
            GuideLines=${Ri}
          />

          <div class="dfp-stickynote-layer">
            ${Uo.map((k) => {
      const A = String(k.Key), B = ve.has(A);
      return b`<${Fm} key=${A}
                Note=${k} NoteKey=${A} Defaults=${Ve}
                isSelected=${B} isSelectable=${q}
                isDraggable=${P}
                onContentChange=${y == null ? void 0 : ((V) => E(
        'DataFlowProcessView callback "onStickyNoteContentChange"',
        y,
        A,
        V
      ))}
                ScrollerOf=${() => ye.current}
                onNoteClick=${(V, W, de) => Ae(
        "stickyNote",
        A,
        jn(de)
      )}
                onMoveStart=${(V, W, de, le, we) => ro("move", "stickyNote", A, void 0, we)}
                onMoveContinuation=${(V, W, de, le, we) => ao(V, W, we)}
                onMoveFinish=${(V, W) => io(V, W)}
                onMoveCancellation=${() => so()}
                onResizeStart=${(V, W, de, le, we) => ro("resize", "stickyNote", A, "se", we)}
                onResizeContinuation=${(V, W, de, le, we) => ao(V, W, we)}
                onResizeFinish=${(V, W) => io(V, W)}
                onResizeCancellation=${() => so()}
              />`;
    })}
          </>

          <div class="dfp-node-layer">
            ${Qt.map((k) => {
      const A = String(k.Key), B = se.has(A);
      return b`<${Tm} key=${A}
                NodeKey=${A} Title=${k.Title ?? ""}
                Geometry=${en(k)}
                BackgroundColor=${k.BackgroundColor}
                isDisabled=${k.disabled == !0}
                isSelected=${B} isSelectable=${q}
                isDraggable=${J}
                renderedContent=${Nt(k.Content) ? Xe(
        'DataFlowProcessView callback "Node.Content"',
        k.Content,
        k,
        B
      ) : void 0}
                ScrollerOf=${() => ye.current}
                onNodeClick=${(V, W, de) => Ae(
        "node",
        A,
        jn(de)
      )}
                onNodeDoubleClick=${C == null ? void 0 : ((V) => E(
        'DataFlowProcessView callback "onNodeDoubleClick"',
        C,
        A,
        V
      ))}
                onMoveStart=${(V, W, de, le, we) => ro("move", "node", A, void 0, we)}
                onMoveContinuation=${(V, W, de, le, we) => ao(V, W, we)}
                onMoveFinish=${(V, W) => io(V, W)}
                onMoveCancellation=${() => so()}
                onResizeStart=${(V, W) => ro("resize", "node", A, V, W)}
                onResizeContinuation=${(V, W, de, le, we) => ao(V, W, we)}
                onResizeFinish=${(V, W) => io(V, W)}
                onResizeCancellation=${() => so()}
              />`;
    })}
          </>

          <div class="dfp-port-layer">
            ${Qt.map((k) => {
      const A = String(k.Key), B = (V, W) => V.map((de) => {
        const le = String(de.Key), we = Gn(k, de);
        let Ee;
        return Fi && W === "input" && (Ee = ji(
          K.current.Source,
          { NodeKey: A, PortKey: le },
          de
        ) ? "valid-target" : "locked"), b`<${zm}
                    key=${A + ":" + W + ":" + le}
                    Port=${de} Kind=${W} Position=${we}
                    FillColor=${W === "input" ? j : x}
                    TargetState=${Ee}
                    mayStartEdges=${ue}
                    ScrollerOf=${() => ye.current}
                    onRubberEdgeStart=${(tt, ze) => id(A, le, tt, ze)}
                    onRubberEdgeContinuation=${(tt, ze, Te) => sd(tt, ze, Te)}
                    onRubberEdgeFinish=${(tt, ze) => ld(tt, ze)}
                    onRubberEdgeCancellation=${() => cd()}
                  />`;
      });
      return b`
                ${B(k.InputPorts ?? [], "input")}
                ${B(k.OutputPorts ?? [], "output")}
              `;
    })}
          </>
        </>
      </>`;
  });
}
const Am = ["nw", "n", "ne", "e", "se", "s", "sw", "w"];
function Tm(e) {
  const {
    NodeKey: t,
    Title: n,
    Geometry: o,
    BackgroundColor: r,
    isDisabled: a,
    isSelected: i,
    isSelectable: s,
    isDraggable: l,
    renderedContent: d,
    ScrollerOf: u,
    onNodeClick: p,
    onNodeDoubleClick: c,
    onMoveStart: f,
    onMoveContinuation: h,
    onMoveFinish: g,
    onMoveCancellation: y,
    onResizeStart: m,
    onResizeContinuation: v,
    onResizeFinish: C,
    onResizeCancellation: _
  } = e, j = U(null), x = to({
    ViewRef: j,
    Container: u,
    onlyFrom: ".dfp-titlebar",
    onClick: s ? p : void 0,
    onDragStart: l ? f : void 0,
    onDragContinuation: l ? h : void 0,
    onDragFinish: l ? g : void 0,
    onDragCancellation: l ? y : void 0
  });
  return b`<div
      class="dfp-node${i ? " selected" : ""}${a ? " disabled" : ""}"
      style="left:${o.x}px; top:${o.y}px; width:${o.Width}px; height:${o.Height}px; ${r == null ? "" : `background-color:${r};`}"
      ref=${j} data-node-key=${t}
      onPointerDown=${x}
      onDblClick=${c}
    >
      <div class="dfp-titlebar">${n}</>
      <div class="dfp-content-area">${d}</>
      ${i && l && Am.map(
    (w) => b`<${Rm} key=${w}
          Direction=${w} ScrollerOf=${u}
          onResizeStart=${m}
          onResizeContinuation=${v}
          onResizeFinish=${C}
          onResizeCancellation=${_}
        />`
  )}
    </>`;
}
function Rm(e) {
  const {
    Direction: t,
    ScrollerOf: n,
    onResizeStart: o,
    onResizeContinuation: r,
    onResizeFinish: a,
    onResizeCancellation: i
  } = e, s = U(null), l = An({
    ViewRef: s,
    Container: n,
    onlyFrom: `[data-handle="${t}"]`,
    onDragStart: ((d, u, p, c, f) => o(t, f)),
    onDragContinuation: r,
    onDragFinish: a,
    onDragCancellation: i
  });
  return b`<div
      class="dfp-handle handle-${t}" data-handle=${t}
      ref=${s} onPointerDown=${l} aria-hidden="true"
    />`;
}
function Fm(e) {
  const {
    Note: t,
    NoteKey: n,
    Defaults: o,
    isSelected: r,
    isSelectable: a,
    isDraggable: i,
    onContentChange: s,
    ScrollerOf: l,
    onNoteClick: d,
    onMoveStart: u,
    onMoveContinuation: p,
    onMoveFinish: c,
    onMoveCancellation: f,
    onResizeStart: h,
    onResizeContinuation: g,
    onResizeFinish: y,
    onResizeCancellation: m
  } = e, v = U(null), C = to({
    ViewRef: v,
    Container: l,
    onlyFrom: ".dfp-titlebar",
    onClick: a ? d : void 0,
    onDragStart: i ? u : void 0,
    onDragContinuation: i ? p : void 0,
    onDragFinish: i ? c : void 0,
    onDragCancellation: i ? f : void 0
  }), _ = An({
    ViewRef: v,
    Container: l,
    onlyFrom: ".dfp-resize-handle",
    onDragStart: i ? h : void 0,
    onDragContinuation: i ? g : void 0,
    onDragFinish: i ? y : void 0,
    onDragCancellation: i ? m : void 0
  }), j = {
    // note settings first, defaults second
    FontFamily: t.FontFamily ?? o.FontFamily,
    FontSize: t.FontSize ?? o.FontSize,
    FontWeight: t.FontWeight ?? o.FontWeight,
    LineHeight: t.LineHeight ?? o.LineHeight,
    ForegroundColor: t.ForegroundColor ?? o.ForegroundColor,
    BackgroundColor: t.BackgroundColor ?? o.BackgroundColor
  }, x = en(t);
  return b`<div
      class="dfp-stickynote${r ? " selected" : ""}"
      style="left:${x.x}px; top:${x.y}px; width:${x.Width}px; height:${x.Height}px; ${No(j)}"
      ref=${v} data-note-key=${n}
      onPointerDown=${(w) => {
    _?.(w), C?.(w);
  }}
    >
      <div class="dfp-titlebar"/>
      <div class="dfp-content-area">
        <${ai} ...${j}
          Content=${t.Content ?? ""} onContentChange=${s}
        />
      </>
      ${r && i && b`<div class="dfp-resize-handle" aria-hidden="true"/>`}
    </>`;
}
function Om(e) {
  const {
    Group: t,
    GroupKey: n,
    isSelected: o,
    isSelectable: r,
    isDraggable: a,
    ScrollerOf: i,
    onGroupClick: s,
    onMoveStart: l,
    onMoveContinuation: d,
    onMoveFinish: u,
    onMoveCancellation: p
  } = e, c = U(null), f = to({
    ViewRef: c,
    Container: i,
    onlyFrom: ".dfp-group",
    onClick: r ? s : void 0,
    onDragStart: a ? l : void 0,
    onDragContinuation: a ? d : void 0,
    onDragFinish: a ? u : void 0,
    onDragCancellation: a ? p : void 0
  }), h = (t.BorderColor == null ? "" : `border-color:${t.BorderColor};`) + (t.BackgroundColor == null ? "" : `background-color:${t.BackgroundColor};`);
  return b`<div
      class="dfp-group${o ? " selected" : ""}"
      style="left:${t.Position.x}px; top:${t.Position.y}px; width:${t.Size.Width}px; height:${t.Size.Height}px; ${h}"
      ref=${c} data-group-key=${n}
      onPointerDown=${f}
    >${t.Label ?? ""}</>`;
}
function zm(e) {
  const {
    Port: t,
    Kind: n,
    Position: o,
    FillColor: r,
    TargetState: a,
    mayStartEdges: i,
    ScrollerOf: s,
    onRubberEdgeStart: l,
    onRubberEdgeContinuation: d,
    onRubberEdgeFinish: u,
    onRubberEdgeCancellation: p
  } = e, c = t.disabled == !0, f = n === "output" && i && !c, h = U(null), g = An({
    // "capability follows callback...
    ViewRef: h,
    Container: s,
    onlyFrom: ".dfp-port.output",
    // ...presence"
    onDragStart: f ? (
      // - disabled ports are not wired up
      ((m, v, C, _) => l(C, _))
    ) : void 0,
    onDragContinuation: f ? ((m, v, C, _, j) => d(C, _, j)) : void 0,
    onDragFinish: f ? ((m, v, C, _) => u(C, _)) : void 0,
    onDragCancellation: f ? (() => p()) : void 0
  });
  let y = "";
  return c && (y += " disabled"), f && (y += " draggable"), a != null && (y += " " + a), b`<${Nc} Class="dfp-port-wrapper"
      Value=${t.Label ?? String(t.Key)}
      Style="left:${o.x - Tn}px; top:${o.y - Tn}px"
    >
      <div class="dfp-port ${n}${y}"
        style="background-color:${r}"
        ref=${h} tabindex=${c ? -1 : 0}
        data-port-key=${t.Key}
        onPointerDown=${g}
      />
    </>`;
}
function Nm(e) {
  const {
    SVGRef: t,
    PaneWidth: n,
    PaneHeight: o,
    Nodes: r,
    Edges: a,
    EdgeSelectionSet: i,
    DefaultEdgeColor: s,
    RubberEdge: l,
    LassoBox: d,
    GuideLines: u
  } = e, p = {};
  r.forEach((h) => {
    p[String(h.Key)] = h;
  });
  const c = (h, g) => {
    const y = ia(g);
    return {
      x: h.x + Tn * y.x,
      y: h.y + Tn * y.y
    };
  }, f = a.map((h) => {
    const g = p[String(h.Source?.NodeKey)], y = p[String(h.Target?.NodeKey)], m = (g?.OutputPorts ?? []).find(
      ($) => String($.Key) === String(h.Source?.PortKey)
    ), v = (y?.InputPorts ?? []).find(
      ($) => String($.Key) === String(h.Target?.PortKey)
    );
    if (m == null || v == null)
      return;
    const C = c(
      Gn(g, m),
      m.Direction
    ), _ = c(
      Gn(y, v),
      v.Direction
    ), { Path: j, ArrowAngle: x } = _s(
      C,
      m.Direction,
      _,
      v.Direction
    ), w = h.Color ?? s, T = i.has(String(h.Key)), L = h.disabled == !0;
    return b`
        ${T && b`<path class="dfp-edge-halo" d=${j}/>`}
        <path class="dfp-edge${T ? " selected" : ""}${L ? " disabled" : ""}"
          data-edge-key=${h.Key} d=${j}
          stroke=${w} stroke-width="2"
        />
        <polygon class="dfp-arrowhead${L ? " disabled" : ""}"
          points="0,0 -${$s},${js / 2} -${$s},-${js / 2}"
          fill=${w}
          transform="translate(${_.x},${_.y}) rotate(${x})"
        />
      `;
  });
  return b`<svg class="dfp-edge-layer" ref=${t}
      width=${n} height=${o}
      viewBox="0 0 ${n} ${o}"
      xmlns="http://www.w3.org/2000/svg"
    >
      ${f}

      ${u != null && b`
        ${Array.from(u.vertical.entries()).map(
    ([h, g]) => b`<line
            class="dfp-guide ${g}"
            x1=${h} y1="0" x2=${h} y2=${o}
          />`
  )}
        ${Array.from(u.horizontal.entries()).map(
    ([h, g]) => b`<line
            class="dfp-guide ${g}"
            x1="0" y1=${h} x2=${n} y2=${h}
          />`
  )}
      `}

      ${l != null && b`<path class="dfp-rubber-edge"
        d=${_s(
    c(l.from, l.fromDirection),
    l.fromDirection,
    l.to
  ).Path}
      />`}

      ${d != null && b`<rect class="dfp-lasso"
        x=${d.x} y=${d.y}
        width=${d.Width} height=${d.Height}
      />`}
    </>`;
}
const Em = /* @__PURE__ */ Z("jcl-component.dataflow-process-view", `
    .jcl-component.dataflow-process-view {
      display:block !important; position:relative;
      overflow:auto; overscroll-behavior:contain;
      border:solid 1px #888888; border-radius:2px;
      background-color:#EEEEEE; /* fills spare areas beside/below the pane */
      padding:0px; outline:none;
    }
    .jcl-component.dataflow-process-view:focus-visible {
      outline:solid 2px dodgerblue; outline-offset:-2px;
    }

    .jcl-component.dataflow-process-view > .dfp-pane {
      display:block; position:relative; overflow:hidden;
      background:white;
    }

    /* the five stacked layers share the pane's pixel coordinate base -     */
    /* they are "transparent" for pointer events, only their interactive    */
    /* children re-enable them ("dfp-group-layer" is bottommost, so a group */
    /* only ever intercepts clicks that land on none of the other four)     */

    .jcl-component.dataflow-process-view .dfp-group-layer,
    .jcl-component.dataflow-process-view .dfp-edge-layer,
    .jcl-component.dataflow-process-view .dfp-stickynote-layer,
    .jcl-component.dataflow-process-view .dfp-node-layer,
    .jcl-component.dataflow-process-view .dfp-port-layer {
      display:block; position:absolute; left:0px; top:0px;
      width:100%; height:100%; overflow:visible;
      pointer-events:none;
    }

    /* groups */

    .jcl-component.dataflow-process-view .dfp-group {
      display:block; position:absolute;     /* siblings stack in "Groups" order */
      box-sizing:border-box; pointer-events:auto; cursor:grab;
      border:solid 2px #AAAAAA; border-radius:6px;
      background-color:rgba(0,0,0,0.04);
      padding:2px 6px; font-size:12px; font-weight:bold; color:#666666;
      user-select:none;

      -webkit-touch-callout:none;
      -ms-touch-action:none; touch-action:none;
    }
    .jcl-component.dataflow-process-view .dfp-group.selected {
      outline:solid 2px dodgerblue; outline-offset:1px;
    }

    /* nodes */

    .jcl-component.dataflow-process-view .dfp-node {
      display:flex; flex-flow:column nowrap; align-items:stretch;
      position:absolute;               /* siblings stack in "Nodes" order */
      pointer-events:auto;
      background:white; color:black;
      border:solid 1px #888888; border-radius:4px;
      box-shadow:0px 2px 6px 0px rgba(0,0,0,0.25);
      font-size:14px;
    }
    .jcl-component.dataflow-process-view .dfp-node.selected {
      outline:solid 2px dodgerblue;
    }
    .jcl-component.dataflow-process-view .dfp-node.disabled {
      opacity:0.45;
    }

    .jcl-component.dataflow-process-view .dfp-node > .dfp-titlebar {
      flex:0 0 20px; cursor:grab; user-select:none;
      background:rgba(0,0,0,0.06);
      border-bottom:solid 1px rgba(0,0,0,0.15);
      border-radius:3px 3px 0px 0px;
      padding:0px 6px; font-size:12px; line-height:20px; text-align:left;
      overflow:hidden; white-space:nowrap; text-overflow:ellipsis;

      -webkit-touch-callout:none;
      -ms-touch-action:none; touch-action:none;
    }

    .jcl-component.dataflow-process-view .dfp-node > .dfp-content-area,
    .jcl-component.dataflow-process-view .dfp-stickynote > .dfp-content-area {
      display:flex; flex-flow:column nowrap; align-items:stretch;
      flex:1 1 auto; position:relative; overflow:hidden;
      border-radius:0px 0px 3px 3px;
    }

    /* the eight resize handles of a selected node */

    .jcl-component.dataflow-process-view .dfp-handle {
      position:absolute; width:8px; height:8px;
      background:white; border:solid 1px dodgerblue;
      pointer-events:auto;

      -webkit-touch-callout:none;
      -ms-touch-action:none; touch-action:none;
    }
    .jcl-component.dataflow-process-view .dfp-handle.handle-nw { left:-4px;             top:-4px;              cursor:nwse-resize }
    .jcl-component.dataflow-process-view .dfp-handle.handle-n  { left:calc(50% - 4px);  top:-4px;              cursor:ns-resize }
    .jcl-component.dataflow-process-view .dfp-handle.handle-ne { right:-4px;            top:-4px;              cursor:nesw-resize }
    .jcl-component.dataflow-process-view .dfp-handle.handle-e  { right:-4px;            top:calc(50% - 4px);   cursor:ew-resize }
    .jcl-component.dataflow-process-view .dfp-handle.handle-se { right:-4px;            bottom:-4px;           cursor:nwse-resize }
    .jcl-component.dataflow-process-view .dfp-handle.handle-s  { left:calc(50% - 4px);  bottom:-4px;           cursor:ns-resize }
    .jcl-component.dataflow-process-view .dfp-handle.handle-sw { left:-4px;             bottom:-4px;           cursor:nesw-resize }
    .jcl-component.dataflow-process-view .dfp-handle.handle-w  { left:-4px;             top:calc(50% - 4px);   cursor:ew-resize }

    /* sticky notes (visuals follow NoteBoard) */

    .jcl-component.dataflow-process-view .dfp-stickynote {
      display:flex; flex-flow:column nowrap; align-items:stretch;
      position:absolute;          /* siblings stack in "StickyNotes" order */
      pointer-events:auto;
      background:#FFFFA8; color:black;
      border:solid 1px #888888; border-radius:4px;
      box-shadow:0px 2px 6px 0px rgba(0,0,0,0.25);
      font-size:14px;
    }
    .jcl-component.dataflow-process-view .dfp-stickynote.selected {
      outline:solid 2px dodgerblue;
    }

    .jcl-component.dataflow-process-view .dfp-stickynote > .dfp-titlebar {
      flex:0 0 16px; cursor:grab; user-select:none;
      background:rgba(0,0,0,0.06);
      border-bottom:solid 1px rgba(0,0,0,0.15);
      border-radius:3px 3px 0px 0px;

      -webkit-touch-callout:none;
      -ms-touch-action:none; touch-action:none;
    }

    .jcl-component.dataflow-process-view .dfp-content-area > .sticky-note-content {
      flex:1 1 auto; width:100%; min-height:0px;
    }
    .jcl-component.dataflow-process-view .dfp-stickynote .sticky-html-note {
      border:none; border-radius:0px; background:transparent;
    }

    .jcl-component.dataflow-process-view .dfp-stickynote > .dfp-resize-handle {
      position:absolute; right:0px; bottom:0px; width:24px; height:24px;
      background:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAbUlEQVRIS9WTwQ0AIAgDZV0GYl2NP2KMEWmjOkAvPawU8hNGvpnVnquq8ifAW6E0gAO88/GmkAZ0wOonQhrAASslHZbeAR0QWf8bN4goOdoBHRBxftQADsgo2doBHZBRcucGSCXTBnQA0vmY1QDfJWAZ8ODrpQAAAABJRU5ErkJggg==");
      background-repeat:no-repeat;
      background-size:contain; background-position:center;
      cursor:nwse-resize; pointer-events:auto;

      -webkit-touch-callout:none;
      -ms-touch-action:none; touch-action:none;
    }

    /* ports (wrapped into "styledTooltip"s) */

    .jcl-component.styled-tooltip.dfp-port-wrapper {
      position:absolute; pointer-events:auto;
    }

    .jcl-component.dataflow-process-view .dfp-port {
      display:block; width:${2 * Tn}px; height:${2 * Tn}px;
      box-sizing:border-box;
      border:solid 1px #888888; border-radius:50%;
      cursor:default; outline:none;
      transition:transform 0.1s ease, box-shadow 0.1s ease;

      -webkit-touch-callout:none;
      -ms-touch-action:none; touch-action:none;
    }
    .jcl-component.dataflow-process-view .dfp-port.input:not(.disabled):not(.locked):hover,
    .jcl-component.dataflow-process-view .dfp-port.output.draggable:hover,
    .jcl-component.dataflow-process-view .dfp-port.valid-target {
      transform:scale(1.3);
      box-shadow:0px 0px 0px 3px rgba(30,144,255,0.35);
    }
    .jcl-component.dataflow-process-view .dfp-port.output.draggable { cursor:grab }
    .jcl-component.dataflow-process-view .dfp-port.valid-target     { cursor:copy }
    .jcl-component.dataflow-process-view .dfp-port.locked {
      opacity:0.4; cursor:not-allowed;
    }
    .jcl-component.dataflow-process-view .dfp-port.disabled { cursor:not-allowed }

    /* edges, rubber edge, guides and lasso (all within the EdgeLayer) */

    .jcl-component.dataflow-process-view .dfp-edge      { fill:none }
    .jcl-component.dataflow-process-view .dfp-edge.disabled,
    .jcl-component.dataflow-process-view .dfp-arrowhead.disabled {
      opacity:0.35;
    }
    .jcl-component.dataflow-process-view .dfp-edge.disabled {
      stroke-dasharray:5 4;
    }
    .jcl-component.dataflow-process-view .dfp-edge-halo {
      fill:none; stroke:dodgerblue; stroke-width:6px; stroke-opacity:0.4;
    }
    .jcl-component.dataflow-process-view .dfp-arrowhead { stroke:none }
    .jcl-component.dataflow-process-view .dfp-rubber-edge {
      fill:none; stroke:#4682B4; stroke-width:2px; stroke-dasharray:6 4;
    }
    .jcl-component.dataflow-process-view .dfp-guide {
      stroke:dodgerblue; stroke-width:1px;
    }
    .jcl-component.dataflow-process-view .dfp-guide.dashed { stroke-dasharray:6 4 }
    .jcl-component.dataflow-process-view .dfp-guide.dotted { stroke-dasharray:1 3 }
    .jcl-component.dataflow-process-view .dfp-lasso {
      fill:rgba(30,144,255,0.10); stroke:dodgerblue;
      stroke-width:1px; stroke-dasharray:4 3;
    }
  `);
function Vm(e) {
  return hn(e) || bo(e) && (he(e.Type, ["user", "assistant"]) && hn(e.Text) || e.Type === "annotation" && Nt(e.Renderer));
}
function Bm({ Renderer: e }) {
  return H(e);
}
function Wm(e) {
  return H(() => {
    Hm(), e = G(e);
    const t = D(e.Class) ?? "", n = re(e.Style), o = re(e.HelloMessage), r = z(e.Messages, (F) => Ie(F, Vm)) ?? [], a = D(e.Placeholder) ?? "type a message...", i = $e(e.Rows) ?? 3, s = re(e.Value), l = D(e.SubmitLabel), d = Y(e.disabled) ?? !1, u = R(e.onInput), p = R(e.onValueInput), c = R(e.onSubmit), [f, h] = He(""), g = s != null, y = g ? s : f, m = U(void 0);
    function v(F) {
      g || h(F.target.value), E('legacyChatView callback "onInput"', u, F), E(
        'legacyChatView callback "onValueInput"',
        p,
        F.target.value,
        F
      );
    }
    function C(F) {
      F.key === "Enter" && !F.shiftKey && !d && (F.preventDefault(), _(F));
    }
    function _(F) {
      d || y.trim() === "" || (E(
        'legacyChatView callback "onSubmit"',
        c,
        y,
        F
      ), g || h(""), m.current?.focus());
    }
    const j = Mt(e.children), x = (F) => j.find((N) => N?.type === F), w = x(Ac), T = x(Mc), L = w == null ? void 0 : G(w.props).Renderer, $ = T == null ? void 0 : G(T.props).Renderer, I = x(Tc), M = [];
    o != null && M.push({ Kind: "message", Text: o, isUser: !1, Index: -1 });
    let S = !1;
    return r.forEach((F, N) => {
      if (bo(F) && F.Type === "annotation")
        M.push({ Kind: "annotation", Renderer: F.Renderer, isUser: S, Index: N });
      else {
        const X = bo(F) ? F.Type === "user" : !S, Q = bo(F) ? F.Text : F;
        M.push({ Kind: "message", Text: Q, isUser: X, Index: N }), S = X;
      }
    }), b`<div class="jcl-component legacy-chatview ${t}"
        style=${n} ...${e.RestProps}
      >
        <div class="turns">
          ${M.map((F) => {
      if (F.Kind === "annotation")
        return b`<div class="turn ${F.isUser ? "from-user" : "from-assistant"}">
                <${Bm} Renderer=${F.Renderer}/>
              </>`;
      const N = F.isUser ? L : $, X = N?.(F.Index);
      return b`<div class="turn ${F.isUser ? "from-user" : "from-assistant"}">
              <div class="bubble">${F.Text}</div>
              ${X == null ? "" : b`<div class="extra">${X}</div>`}
            </>`;
    })}
        </>
        <div class="footer">
          <textarea ref=${m}
            placeholder=${a} disabled=${d}
            rows=${i} value=${y}
            onInput=${v} onKeyDown=${C}
          />
          <div class="bottom-row">
            ${I ?? b`<div class="controls"/>`}
            <button class="submit" aria-label=${l ?? "send"}
              disabled=${d || y.trim() === ""}
              onClick=${_}
            >
              <span class="send-icon"/>
              ${l == null ? "" : b`<span>${l}</span>`}
            </>
          </>
        </>
      </>`;
  });
}
const Hm = /* @__PURE__ */ Z("jcl-component.legacy-chatview", `
    .jcl-component.legacy-chatview {
      display:flex; flex-flow:column nowrap;
      background:var(--jcl-bg-color,#ffffff);
      color:var(--jcl-fg-color,#0a0a0a);
      font-size:14px;
    }

  /**** the scrollable area with the chat bubbles ****/

    .jcl-component.legacy-chatview > .turns {
      display:flex; flex-flow:column nowrap;
      flex:1 1 auto; min-height:0px; overflow-y:auto; overscroll-behavior-y:contain;
      gap:12px; padding:16px;
    }

    .jcl-component.legacy-chatview .turn {
      display:flex; flex-flow:column nowrap;
      gap:4px; max-width:calc(100% - 32px);
    }

    .jcl-component.legacy-chatview .turn.from-user {
      align-self:flex-end; align-items:flex-end;
    }
    .jcl-component.legacy-chatview .turn.from-assistant {
      align-self:flex-start; align-items:flex-start;
    }

    .jcl-component.legacy-chatview .bubble {
      padding:8px 14px; border-radius:16px;
      line-height:1.5;
      white-space:pre-wrap; overflow-wrap:break-word;
    }

    .jcl-component.legacy-chatview .turn.from-user > .bubble {
      background:var(--jcl-primary-bg-color,#0075ff);
      color:var(--jcl-primary-fg-color,#ffffff);
      border-bottom-right-radius:4px;
    }
    .jcl-component.legacy-chatview .turn.from-assistant > .bubble {
      background:var(--jcl-muted-bg-color,#f5f5f5);
      color:var(--jcl-fg-color,#0a0a0a);
      border-bottom-left-radius:4px;
    }

    .jcl-component.legacy-chatview .extra {
      font-size:12.8px;
      color:var(--jcl-muted-fg-color,#737373);
    }

    .jcl-component.legacy-chatview .annotation {
      max-width:100%;
    }

  /**** the footer with text area, controls and submit button ****/

    .jcl-component.legacy-chatview > .footer {
      display:flex; flex-flow:column nowrap; flex-shrink:0;
      gap:8px;
      border-top:solid 1px var(--jcl-border-color,#ebebeb);
      padding:10px 12px;
    }

    .jcl-component.legacy-chatview > .footer > textarea {
      width:100%;
      border:solid 1px var(--jcl-border-color,#ebebeb);
      border-radius:calc(var(--jcl-border-radius,8px) - 2px);
      background:var(--jcl-bg-color,#ffffff);
      color:var(--jcl-fg-color,#0a0a0a);
      padding:8px 12px;
      font:inherit; font-size:14px; line-height:1.5;
      resize:none; outline:none;
      transition:border-color 0.15s ease, box-shadow 0.15s ease;
    }
    .jcl-component.legacy-chatview > .footer > textarea::placeholder {
      color:var(--jcl-muted-fg-color,#737373);
    }
    .jcl-component.legacy-chatview > .footer > textarea:focus-visible {
      border-color:var(--jcl-ring-color,#0075ff);
      box-shadow:0px 0px 0px 3px color-mix(
        in srgb, var(--jcl-ring-color,#0075ff) 20%, transparent
      );
    }
    .jcl-component.legacy-chatview > .footer > textarea:disabled {
      pointer-events:none; cursor:not-allowed;
      opacity:0.5;
    }

    .jcl-component.legacy-chatview .bottom-row {
      display:flex; align-items:center;
      gap:8px;
    }

  /**** the submit button, showing a paper plane ****/

    .jcl-component.legacy-chatview .submit {
      display:inline-flex; align-items:center; justify-content:center;
      gap:6px; flex-shrink:0;
      height:36px; min-width:36px;
      border:none; border-radius:calc(var(--jcl-border-radius,8px) - 2px);
      background:var(--jcl-primary-bg-color,#0075ff);
      color:var(--jcl-primary-fg-color,#ffffff);
      padding:0px 10px;
      font:inherit; font-size:14px; font-weight:500; white-space:nowrap;
      cursor:pointer; outline:none;
      transition:background-color 0.15s ease, box-shadow 0.15s ease;
    }
    .jcl-component.legacy-chatview .submit:hover:not(:disabled) {
      background:color-mix(
        in srgb, var(--jcl-primary-bg-color,#0075ff) 85%, black
      );
    }
    .jcl-component.legacy-chatview .submit:focus-visible {
      box-shadow:0px 0px 0px 3px color-mix(
        in srgb, var(--jcl-ring-color,#0075ff) 20%, transparent
      );
    }
    .jcl-component.legacy-chatview .submit:disabled {
      pointer-events:none; cursor:not-allowed;
      opacity:0.5;
    }

    .jcl-component.legacy-chatview .submit > .send-icon {
      display:inline-block; flex-shrink:0;
      width:16px; height:16px;
      background:currentColor;
      pointer-events:none;
      -webkit-mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m22 2-7 20-4-9-9-4Z'/%3E%3Cpath d='M22 2 11 13'/%3E%3C/svg%3E");
              mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m22 2-7 20-4-9-9-4Z'/%3E%3Cpath d='M22 2 11 13'/%3E%3C/svg%3E");
      -webkit-mask-size:contain;           mask-size:contain;
      -webkit-mask-position:center center; mask-position:center center;
      -webkit-mask-repeat:no-repeat;       mask-repeat:no-repeat;
    }
  `);
function Mc(e) {
  return "";
}
function Ac(e) {
  return "";
}
function Tc(e) {
  return H(() => {
    Gm(), e = G(e);
    const t = D(e.Class) ?? "", n = re(e.Style);
    return b`<div class="controls ${t}"
        style=${n} ...${e.RestProps}
      >
        ${e.children}
      </>`;
  });
}
const Gm = /* @__PURE__ */ Z("jcl-component.legacy-chatview-controls", `
    .jcl-component.legacy-chatview .controls {
      display:flex; align-items:center; flex-wrap:wrap;
      flex:1 1 auto;
      gap:6px;
    }
  `);
let sa, rr;
const Um = Oo(() => Promise.all([
  ht("jspreadsheet-ce"),
  ht("@jspreadsheet/formula")
]).then(([e, t]) => {
  sa = e.default ?? e, rr = t.default ?? t, Km();
})), la = [];
function Km() {
  for (; la.length > 0; )
    ii(la.shift());
}
function ii(e) {
  return rr == null ? (la.push(e), !0) : typeof rr?.setFormula != "function" ? (console.warn(
    '@jspreadsheet/formula: "setFormula" is unavailable - custom formulas could not be registered'
  ), !1) : (rr.setFormula(e), !0);
}
function qm(e, t) {
  an("formula name", e), Yt("formula function", t), ii({ [e.toUpperCase()]: t });
}
function Xm(e) {
  It("formula set", e);
  const t = /* @__PURE__ */ Object.create(null);
  for (const [n, o] of Object.entries(e))
    typeof o == "function" && (t[n.toUpperCase()] = o);
  ii(t);
}
function Ym(e) {
  return H(() => {
    Jm();
    const t = eo(Um);
    e = G(e);
    const n = D(e.Class) ?? "", o = z(e.Data, (v) => Array.isArray(v)) ?? [[]], r = z(e.Columns, (v) => Array.isArray(v)), a = gn(e.minRows) ?? 5, i = gn(e.minColumns), s = Y(e.readonly) ?? !1, l = Y(e.disabled) ?? !1, d = R(e.onDataChange), u = R(e.onCellChange), p = R(e.onMount), c = R(e.onUnmount), f = U(null), h = U(void 0), g = U(o), y = U(e.Data), m = U({});
    return m.current = { onDataChange: d, onCellChange: u, onUnmount: c }, je(() => {
      if (!t)
        return;
      const v = f.current;
      if (v == null)
        return;
      const _ = sa(v, {
        worksheets: [{
          data: g.current,
          columns: r,
          minDimensions: [i ?? r?.length ?? 4, a],
          onchange: (T, L, $, I, M) => {
            const S = h.current;
            g.current = S.getData(), E(
              'Spreadsheet callback "onCellChange"',
              m.current.onCellChange,
              $,
              I,
              M
            ), E(
              'Spreadsheet callback "onDataChange"',
              m.current.onDataChange,
              g.current
            );
          }
        }]
      })[0];
      h.current = _;
      const j = (T) => {
        const L = T.querySelector(
          "input, textarea"
        );
        if (L == null || L.value !== "")
          return;
        const $ = Number(T.getAttribute("data-x")), I = Number(T.getAttribute("data-y")), M = _.getValueFromCoords($, I);
        typeof M == "string" && M !== "" && (L.value = M);
      }, x = new MutationObserver((T) => {
        for (const L of T)
          for (const $ of L.addedNodes) {
            if (!($ instanceof HTMLElement) || $.tagName !== "INPUT" && $.tagName !== "TEXTAREA")
              continue;
            const I = $.closest("td[data-x][data-y]");
            I instanceof HTMLElement && j(I);
          }
      });
      return x.observe(v, { childList: !0, subtree: !0 }), E(
        'Spreadsheet callback "onMount"',
        p,
        {
          instance: _,
          getData: () => _.getData(),
          setData: (T) => {
            g.current = T, y.current = T, _.setData(T);
          },
          getCell: (T, L) => _.getValueFromCoords(T, L),
          setCell: (T, L, $) => {
            _.setValueFromCoords(T, L, $), g.current = _.getData();
          },
          focus: () => f.current?.querySelector("td")?.focus()
        }
      ), () => {
        x.disconnect(), E(
          'Spreadsheet callback "onUnmount"',
          m.current.onUnmount
        ), sa.destroy(v), h.current = void 0;
      };
    }, [t]), je(() => {
      const v = h.current;
      v != null && e.Data !== y.current && (y.current = e.Data, g.current = e.Data ?? [[]], v.setData(g.current));
    }), je(() => {
      const v = f.current;
      v != null && (v.style.opacity = l ? "0.5" : "", v.style.pointerEvents = s || l ? "none" : "");
    }, [s, l]), b`<div
        class="jcl-component spreadsheeteditor ${l ? "disabled" : ""} ${n}"
        ...${e.RestProps} ref=${f}
      />`;
  });
}
const Jm = /* @__PURE__ */ Z("jcl-component.spreadsheeteditor", `
    .jcl-component.spreadsheeteditor {
      position:relative; overflow:auto;
      background:white; color:black;
      font-size:14px;
    }

    .jcl-component.spreadsheeteditor.disabled {
      opacity:0.6; pointer-events:none;
    }
  `), Gr = "application/x-jcl-kanban-task+json";
function Zm(e, t, n) {
  return e.Id != null ? "" + e.Id : ni(e);
}
function Qm(e, t, n, o = !1, r = "") {
  return typeof e.toHTML == "function" ? b`<div class="default" dangerouslySetInnerHTML=${{ __html: e.toHTML() }}/>` : b`<div class="default">
        <div class="title">${e.Title ?? "" + e}</>
        ${e.Description != null && b`<div class="description">${e.Description}</>`}
      </>`;
}
function Pm(e, t) {
  return b`<div class="default">
      <div class="title">${e.Title ?? "" + e}</>
      <div class="count">${t.length}${e.Limit != null ? `/${e.Limit}` : ""}</>
    </>`;
}
function eb(e) {
  return H(() => {
    tb(), e = G(e);
    const t = D(e.Class) ?? "", n = z(e.Columns, (S) => Ie(S, De)) ?? Me("Columns"), o = z(e.Tasks, (S) => Ie(S, De)) ?? Me("Tasks"), r = D(e.Placeholder), a = R(e.KeyOfTask) ?? Zm, i = R(e.TaskRenderer) ?? Qm, s = R(e.ColumnHeaderRenderer) ?? Pm, l = R(e.onTaskClick), d = R(e.onColumnClick), u = Y(e.allowsReorder) ?? !0, p = Y(e.allowsCrossColumnDrag) ?? !0, c = $e(e.SelectionLimit) ?? 1, f = R(e.TaskMayBeDropped), h = R(e.onTaskMove), g = u && h != null, y = p && h != null;
    Ds(n, '"Columns"'), Ds(o, '"Tasks"');
    const [m, v] = He({}), C = U([]);
    function _(S) {
      C.current = [...C.current, S];
    }
    function j(S) {
      const F = [];
      C.current.forEach((N) => {
        N.FromColumn.Id === S ? E(
          'KanbanBoard callback "onTaskMove"',
          h,
          N.Task,
          N.FromColumn,
          N.ToColumn,
          N.ToIndex
        ) : F.push(N);
      }), C.current = F;
    }
    const x = {};
    n.forEach((S) => {
      x[S.Id] = S;
    });
    const w = {};
    o.forEach((S, F) => {
      w[a(S, o, F)] = S;
    });
    function T(S) {
      return x[S.ColumnId];
    }
    function L(S) {
      return o.filter((F) => F.ColumnId === S);
    }
    function $(S, F) {
      const N = S.target.closest?.(".itemview");
      if (N?.Item == null)
        return F.length;
      const X = N.getBoundingClientRect().top + N.offsetHeight / 2, Q = S.clientY < X ? "before" : "after", pe = F.indexOf(N.Item);
      return pe < 0 ? F.length : pe + (Q === "before" ? 0 : 1);
    }
    function I(S) {
      y && S.dataTransfer?.types.includes(Gr) && S.preventDefault();
    }
    function M(S, F) {
      return (N) => {
        if (!y)
          return;
        const X = N.dataTransfer?.getData(Gr);
        if (X == null || X === "")
          return;
        let Q;
        try {
          Q = JSON.parse(X);
        } catch {
          return;
        }
        const pe = $(N, F);
        Q.forEach((q, J) => {
          const P = w[q];
          if (P == null)
            return;
          const ue = T(P);
          if (ue == null || ue === S)
            return;
          const ke = pe + J;
          f != null && !Xe(
            'KanbanBoard callback "TaskMayBeDropped"',
            f,
            P,
            S,
            ke
          ) || _({ Task: P, FromColumn: ue, ToColumn: S, ToIndex: ke });
        });
      };
    }
    return b`<div class="jcl-component kanbanboard ${t}" ...${e.RestProps}>
        ${n.map((S) => {
      const F = L(S.Id), N = m[S.Id] ?? [];
      return b`<div class="column" key=${S.Id}
            onDragOver=${I} onDrop=${M(S, F)}
            onDragEnd=${() => j(S.Id)}
          >
            <div class="column-header" onClick=${(X) => E(
        'KanbanBoard callback "onColumnClick"',
        d,
        S,
        X
      )}>
              ${Xe(
        'KanbanBoard callback "ColumnHeaderRenderer"',
        s,
        S,
        F
      )}
            </div>
            <${ec}
              Class="column-body"
              List=${F} Placeholder=${r}
              KeyOfListItem=${a} ListItemRenderer=${i}
              onListItemClick=${(X, Q, pe, q) => E('KanbanBoard callback "onTaskClick"', l, X, S, q)}
              selectedItems=${N} SelectionLimit=${c}
              onSelectionChange=${(X) => v(
        (Q) => ({ ...Q, [S.Id]: X })
      )}
              onListItemMove=${g ? (X, Q) => {
        Q.length !== 0 && Q.forEach((pe) => E(
          'KanbanBoard callback "onTaskMove"',
          h,
          pe,
          S,
          S,
          X.indexOf(pe)
        ));
      } : void 0}
              DragMIMEType=${y ? Gr : void 0}
              SerializeListItems=${(X) => JSON.stringify(
        X.map((Q, pe) => a(Q, X, pe))
      )}
            />
          </>`;
    })}
      </>`;
  });
}
const tb = /* @__PURE__ */ Z("jcl-component.kanbanboard", `
    .jcl-component.kanbanboard {
      display:flex !important; flex-flow:row nowrap !important; align-items:stretch !important;
      gap:10px; overflow-x:auto; overflow-y:hidden; overscroll-behavior-x:contain;
      padding:0px;
    }

    .jcl-component.kanbanboard > .column {
      display:flex; flex-flow:column nowrap; align-items:stretch;
      flex:0 0 260px; min-width:200px; max-height:100%;
      background:#EEEEEE; border:solid 1px #888888; border-radius:4px;
      overflow:hidden;
    }

    .jcl-component.kanbanboard > .column > .column-header {
      flex:0 0 auto; padding:6px 8px; cursor:pointer;
      border-bottom:solid 1px #888888; background:#E0E0E0;
      user-select:none;
    }
    .jcl-component.kanbanboard > .column > .column-header > .default {
      display:flex; flex-flow:row nowrap; align-items:center; justify-content:space-between;
    }
    .jcl-component.kanbanboard > .column > .column-header > .default > .title {
      font-weight:bold; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;
    }
    .jcl-component.kanbanboard > .column > .column-header > .default > .count {
      color:#666666; font-size:12px; margin-left:8px; flex:0 0 auto;
    }

    .jcl-component.kanbanboard > .column > .jcl-component.flatlistview.column-body {
      flex:1 1 auto; border:none; border-radius:0px; background:transparent;
    }

    .jcl-component.kanbanboard .itemview > .default {
      height:auto; line-height:normal; padding:6px 8px;
      white-space:normal;
    }
    .jcl-component.kanbanboard .itemview > .default > .title {
      font-weight:600;
    }
    .jcl-component.kanbanboard .itemview > .default > .description {
      color:#666666; font-size:12px; margin-top:2px;
    }
  `);
let Rc;
const nb = Oo(() => ht("uqr").then((e) => {
  Rc = e.renderSVG;
})), ob = ["L", "M", "Q", "H"];
function rb(e) {
  return H(() => {
    ab();
    const t = eo(nb);
    e = G(e);
    const n = D(e.Class) ?? "", o = re(e.Value) ?? Me("Value"), r = z(e.ECCLevel, (c) => he(c, [...ob])) ?? "M", a = $e(e.BorderWidth) ?? 1, i = fr(e.minVersion, 1, 40) ?? 1, s = fr(e.maxVersion, i, 40) ?? 40, l = St(e.ForegroundColor) ?? "currentColor", d = St(e.BackgroundColor) ?? "transparent", u = D(e.Label), p = Jt(() => t ? Rc(o, {
      ecc: r,
      border: a,
      minVersion: i,
      maxVersion: s,
      blackColor: l,
      whiteColor: d
    }) : "", [
      t,
      o,
      r,
      a,
      i,
      s,
      l,
      d
    ]);
    return b`<div
        class="jcl-component legacy-qrcode-view ${n}"
        role="img" aria-label=${u ?? o}
        dangerouslySetInnerHTML=${{ __html: p }}
        ...${e.RestProps}
      />`;
  });
}
const ab = /* @__PURE__ */ Z("jcl-component.qrcodeview", `
    .jcl-component.legacy-qrcode-view {
      display:inline-block; position:relative;
      width:160px; height:160px;
    }

    .jcl-component.legacy-qrcode-view > svg {
      display:block;
      width:100%; height:100%;
    }
  `), On = /* @__PURE__ */ Z("jcl-component.styled-input", `
    .jcl-component.styled-input {
      height:36px; min-width:0px;
      border:solid 1px var(--jcl-border-color,#ebebeb);
      border-radius:var(--jcl-border-radius,8px);
      background:color-mix(              /* slight tint for editable fields */
        in srgb, var(--jcl-primary-bg-color,#1e90ff) 12%, transparent
      );        /* with "dodgerblue" over white, this comes close to #e8f0ff */
      color:var(--jcl-fg-color,#0a0a0a);
      padding:4px 12px;
      font:inherit; font-size:14px; line-height:1.5;
      box-shadow:0px 1px 2px 0px rgba(0,0,0,0.05);
      outline:none;
      transition:color 0.15s ease, border-color 0.15s ease,
        box-shadow 0.15s ease;
    }

    .jcl-component.styled-input::placeholder {
      color:var(--jcl-muted-fg-color,#737373);
    }

    .jcl-component.styled-input::selection {
      background:var(--jcl-primary-bg-color,#1e90ff);
      color:var(--jcl-primary-fg-color,#ffffff);
    }

    .jcl-component.styled-input:focus-visible {
      border-color:var(--jcl-ring-color,#1e90ff);
      box-shadow:0px 1px 2px 0px rgba(0,0,0,0.05),
        0px 0px 0px 3px color-mix(
          in srgb, var(--jcl-ring-color,#1e90ff) 20%, transparent
        );
    }

    .jcl-component.styled-input:invalid,
    .jcl-component.styled-input.invalid {
      border-color:var(--jcl-destructive-bg-color,#e7000b);
      box-shadow:0px 1px 2px 0px rgba(0,0,0,0.05),
        0px 0px 0px 3px color-mix(
          in srgb, var(--jcl-destructive-bg-color,#e7000b) 20%, transparent
        );
    }

    .jcl-component.styled-input[readonly] {
      background:transparent;
    }

  /**** "disabled" also overrides JCL's general "[disabled]" opacity rule ****/

    .jcl-component.styled-input:disabled {
      pointer-events:none; cursor:not-allowed;
      background:var(--jcl-muted-bg-color,#f5f5f5);
      color:var(--jcl-muted-fg-color,#737373);
      opacity:1;
    }

  /**** size variants (following the shadcn size scale "sm"/"lg") ****/

    .jcl-component.styled-input.size-small {
      height:32px; padding:2px 10px; font-size:13px;
    }

    .jcl-component.styled-input.size-large {
      height:40px; padding:6px 16px; font-size:16px;
    }
  `);
function Fc(e) {
  return H(() => {
    Ar(), e = G(e);
    const t = D(e.Class) ?? "", n = re(e.Value), o = z(e.Variant, (s) => he(s, ["default", "destructive", "outline", "secondary", "ghost"])) ?? "default", r = z(e.Size, (s) => he(s, ["xs", "small", "normal", "large"])) ?? "normal", a = e.children, i = ut(r);
    return Eo("button", `jcl-component styled-button variant-${o} ${i} ${t}`, void 0, e.RestProps, n, a);
  });
}
const Ar = /* @__PURE__ */ Z("jcl-component.styled-button", `
    .jcl-component.styled-button {
      display:inline-flex; align-items:center; justify-content:center;
      gap:8px; flex-shrink:0;
      height:36px; padding:8px 16px;
      border:none; border-radius:var(--jcl-border-radius,8px);
      font:inherit; font-size:14px; font-weight:500; white-space:nowrap;
      cursor:pointer; pointer-events:auto;
      outline:none;
      transition:color 0.15s ease, background-color 0.15s ease,
        border-color 0.15s ease, box-shadow 0.15s ease;
    }

    .jcl-component.styled-button:focus-visible {
      box-shadow:0px 0px 0px 3px color-mix(
        in srgb, var(--jcl-ring-color,#0075ff) 20%, transparent
      );
    }

  /**** "disabled" also overrides JCL's general "[disabled]" opacity rule ****/

    .jcl-component.styled-button:disabled {
      pointer-events:none; cursor:not-allowed;
      opacity:0.5;
    }

  /**** button variants ****/

    .jcl-component.styled-button.variant-default {
      background:var(--jcl-primary-bg-color,#0075ff);
      color:var(--jcl-primary-fg-color,#ffffff);
    }
    .jcl-component.styled-button.variant-default:hover {
      background:color-mix(  /* darkens on hover, like Chrome's own controls */
        in srgb, var(--jcl-primary-bg-color,#0075ff) 85%, black
      );
    }

    .jcl-component.styled-button.variant-destructive {
      background:var(--jcl-destructive-bg-color,#e7000b);
      color:var(--jcl-destructive-fg-color,#ffffff);
    }
    .jcl-component.styled-button.variant-destructive:hover {
      background:color-mix(
        in srgb, var(--jcl-destructive-bg-color,#e7000b) 90%, transparent
      );
    }
    .jcl-component.styled-button.variant-destructive:focus-visible {
      box-shadow:0px 0px 0px 3px color-mix(
        in srgb, var(--jcl-destructive-bg-color,#e7000b) 20%, transparent
      );
    }

    .jcl-component.styled-button.variant-outline {
      border:solid 1px var(--jcl-border-color,#ebebeb);
      background:var(--jcl-bg-color,#ffffff);
      color:var(--jcl-fg-color,#0a0a0a);
      box-shadow:0px 1px 2px 0px rgba(0,0,0,0.05);
    }
    .jcl-component.styled-button.variant-outline:hover {
      background:var(--jcl-accent-bg-color,#f7f7f7);
      color:var(--jcl-accent-fg-color,#171717);
    }

    .jcl-component.styled-button.variant-secondary {
      background:var(--jcl-secondary-bg-color,#f7f7f7);
      color:var(--jcl-secondary-fg-color,#171717);
    }
    .jcl-component.styled-button.variant-secondary:hover {
      background:color-mix(
        in srgb, var(--jcl-secondary-bg-color,#f7f7f7) 80%, transparent
      );
    }

    .jcl-component.styled-button.variant-ghost {
      background:transparent;
      color:var(--jcl-fg-color,#0a0a0a);
    }
    .jcl-component.styled-button.variant-ghost:hover {
      background:var(--jcl-accent-bg-color,#f7f7f7);
      color:var(--jcl-accent-fg-color,#171717);
    }

  /**** size variants (following the shadcn size scale "xs"/"sm"/"lg") ****/

    .jcl-component.styled-button.size-xs {
      height:24px; padding:0px 8px; gap:4px; font-size:12px;
    }

    .jcl-component.styled-button.size-small {
      height:32px; padding:0px 12px; gap:6px;
    }

    .jcl-component.styled-button.size-large {
      height:40px; padding:0px 24px;
    }
  `);
function ca(e) {
  return H(() => {
    ib(), e = G(e);
    const t = D(e.Class) ?? "", n = re(e.Style);
    let o = z(e.Value, (h) => rn(h) || Je(h));
    const r = z(e.Size, (h) => he(h, ["small", "normal", "large"])) ?? "normal", a = Y(e.disabled), i = R(e.onValueInput), s = R(e.onClick);
    o = o ?? yt;
    const { actualValue: l, actualDisabling: d } = it(o, a), u = l == !0, p = l == null || Je(o), c = ie((h) => {
      if (Le(h, d), d == !0)
        return;
      E('styledCheckbox callback "onClick"', s, h);
      const g = h.target.checked;
      E(
        'styledCheckbox callback "onValueInput"',
        i,
        g,
        h
      );
    }, [d, s, i]), f = ut(r);
    return b`<div class="jcl-component styled-checkbox ${f} ${d ? "disabled" : ""} ${t}"
        style=${n}
      >
        <input type="checkbox"
          checked=${u} indeterminate=${p}
          disabled=${d} onClick=${c} ...${e.RestProps}
        />
      </>`;
  });
}
const ib = /* @__PURE__ */ Z("jcl-component.styled-checkbox", `
    .jcl-component.styled-checkbox {
      height:36px;
      min-width:20px; min-height:20px;
    }

  /**** "disabled" also overrides JCL's general ".disabled" opacity rule ****/

    .jcl-component.styled-checkbox.disabled {
      opacity:0.5;
    }

    .jcl-component.styled-checkbox > input {
      -webkit-appearance:none; appearance:none;
      position:absolute; left:50%; top:50%;
      transform:translate(-50%,-50%);
      margin:0px; padding:0px;
      width:16px; height:16px;
      border:solid 1px var(--jcl-input-border-color,var(--jcl-border-color,#ebebeb));
      border-radius:4px;
      background:transparent;
      box-shadow:0px 1px 2px 0px rgba(0,0,0,0.05);
      outline:none;
      cursor:pointer;
      transition:background-color 0.15s ease, border-color 0.15s ease,
        box-shadow 0.15s ease;
    }

    .jcl-component.styled-checkbox > input:focus-visible {
      border-color:var(--jcl-ring-color,#2563eb);
      box-shadow:0px 1px 2px 0px rgba(0,0,0,0.05),
        0px 0px 0px 3px color-mix(
          in srgb, var(--jcl-ring-color,#2563eb) 20%, transparent
        );
    }

    .jcl-component.styled-checkbox > input:disabled {
      pointer-events:none; cursor:not-allowed;
    }

  /**** checked and indeterminate states use the primary color ****/

    .jcl-component.styled-checkbox > input:checked,
    .jcl-component.styled-checkbox > input:indeterminate {
      border-color:var(--jcl-primary-bg-color,#171717);
      background:var(--jcl-primary-bg-color,#171717);
    }

    .jcl-component.styled-checkbox > input::after {
      content:''; display:block;
      width:100%; height:100%;
      background:transparent;
      -webkit-mask-size:80%;               mask-size:80%;
      -webkit-mask-position:center center; mask-position:center center;
      -webkit-mask-repeat:no-repeat;       mask-repeat:no-repeat;
    }

    .jcl-component.styled-checkbox > input:checked::after {
      background:var(--jcl-primary-fg-color,#fafafa);
      -webkit-mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M20 6 9 17l-5-5'/%3E%3C/svg%3E");
              mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M20 6 9 17l-5-5'/%3E%3C/svg%3E");
    }

    .jcl-component.styled-checkbox > input:indeterminate::after {
      background:var(--jcl-primary-fg-color,#fafafa);
      -webkit-mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M5 12h14'/%3E%3C/svg%3E");
              mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M5 12h14'/%3E%3C/svg%3E");
    }

  /**** size variants ****/

    .jcl-component.styled-checkbox.size-small > input {
      width:14px; height:14px; border-radius:3px;
    }

    .jcl-component.styled-checkbox.size-large > input {
      width:20px; height:20px; border-radius:5px;
    }
  `);
function Oc(e) {
  return H(() => {
    sb(), e = G(e);
    const t = D(e.Class) ?? "", n = re(e.Style);
    let o = z(e.Value, (f) => rn(f) || Je(f));
    const r = z(e.Size, (f) => he(f, ["small", "normal", "large"])) ?? "normal", a = Y(e.disabled), i = R(e.onValueInput), s = R(e.onClick);
    o = o ?? yt;
    const { actualValue: l, actualDisabling: d } = it(o, a), u = l == !0, p = ie((f) => {
      if (Le(f, d), d == !0)
        return;
      E('styledRadiobutton callback "onClick"', s, f);
      const h = f.target.checked;
      E(
        'styledRadiobutton callback "onValueInput"',
        i,
        h,
        f
      );
    }, [d, s, i]), c = ut(r);
    return b`<div class="jcl-component styled-radiobutton ${c} ${d ? "disabled" : ""} ${t}"
        style=${n}
      >
        <input type="radio" checked=${u} disabled=${d} onClick=${p} ...${e.RestProps}/>
      </>`;
  });
}
const sb = /* @__PURE__ */ Z("jcl-component.styled-radiobutton", `
    .jcl-component.styled-radiobutton {
      height:36px;
      min-width:20px; min-height:20px;
    }

  /**** "disabled" also overrides JCL's general ".disabled" opacity rule ****/

    .jcl-component.styled-radiobutton.disabled {
      opacity:0.5;
    }

    .jcl-component.styled-radiobutton > input {
      -webkit-appearance:none; appearance:none;
      position:absolute; left:50%; top:50%;
      transform:translate(-50%,-50%);
      margin:0px; padding:0px;
      width:16px; height:16px;
      border:solid 1px var(--jcl-input-border-color,var(--jcl-border-color,#ebebeb));
      border-radius:50%;
      background:transparent;
      box-shadow:0px 1px 2px 0px rgba(0,0,0,0.05);
      outline:none;
      cursor:pointer;
      transition:border-color 0.15s ease, box-shadow 0.15s ease;
    }

    .jcl-component.styled-radiobutton > input:focus-visible {
      border-color:var(--jcl-ring-color,#2563eb);
      box-shadow:0px 1px 2px 0px rgba(0,0,0,0.05),
        0px 0px 0px 3px color-mix(
          in srgb, var(--jcl-ring-color,#2563eb) 20%, transparent
        );
    }

    .jcl-component.styled-radiobutton > input:disabled {
      pointer-events:none; cursor:not-allowed;
    }

  /**** when checked, just a small primary-coloured dot appears ****/

    .jcl-component.styled-radiobutton > input::after {
      content:''; display:block;
      position:absolute; left:50%; top:50%;
      transform:translate(-50%,-50%);
      width:8px; height:8px;
      border-radius:50%;
      background:transparent;
      transition:background-color 0.15s ease;
    }

    .jcl-component.styled-radiobutton > input:checked::after {
      background:var(--jcl-primary-bg-color,#171717);
    }

  /**** size variants ****/

    .jcl-component.styled-radiobutton.size-small > input {
      width:14px; height:14px;
    }
    .jcl-component.styled-radiobutton.size-small > input::after {
      width:7px; height:7px;
    }

    .jcl-component.styled-radiobutton.size-large > input {
      width:20px; height:20px;
    }
    .jcl-component.styled-radiobutton.size-large > input::after {
      width:10px; height:10px;
    }
  `);
function lb(e) {
  return H(() => {
    cb(), e = G(e);
    const t = D(e.Class) ?? "", n = re(e.Style), o = qe(e.Value), r = qe(e.Min ?? e.Minimum), a = qe(e.Low ?? e.lowerBound), i = qe(e.Opt ?? e.Optimum), s = qe(e.High ?? e.upperBound), l = qe(e.Max ?? e.Maximum), d = z(e.Size, (p) => he(p, ["small", "normal", "large"])) ?? "normal", u = ut(d);
    return b`<div class="jcl-component styled-gauge ${u} ${t}" style=${n}>
        <meter
          value=${o} min=${r} low=${a} opt=${i}
          high=${s} max=${l} ...${e.RestProps}
        />
      </>`;
  });
}
const cb = /* @__PURE__ */ Z("jcl-component.styled-gauge", `
    .jcl-component.styled-gauge {
      height:36px;
      min-width:40px; min-height:20px;
    }

    .jcl-component.styled-gauge > meter {
      position:absolute;
      left:50%; top:50%; width:100%; height:8px;
      transform:translate(-50%,-50%);
      margin:0px; padding:0px;
      -webkit-appearance:none; appearance:none;
      border:none; border-radius:9999px;
      background:color-mix(
        in srgb, var(--jcl-primary-bg-color,#171717) 20%, transparent
      );
      overflow:hidden;
    }

  /**** WebKit/Blink: track and the three value states ****/

    .jcl-component.styled-gauge > meter::-webkit-meter-bar {
      border:none; border-radius:9999px;
      background:color-mix(
        in srgb, var(--jcl-primary-bg-color,#171717) 20%, transparent
      );
    }

    .jcl-component.styled-gauge > meter::-webkit-meter-optimum-value {
      background:var(--jcl-success-bg-color,#00a63e);
    }

    .jcl-component.styled-gauge > meter::-webkit-meter-suboptimum-value {
      background:var(--jcl-warning-bg-color,#fd9a00);
    }

    .jcl-component.styled-gauge > meter::-webkit-meter-even-less-good-value {
      background:var(--jcl-destructive-bg-color,#e7000b);
    }

  /**** Firefox: one bar pseudo element, states as classes on the meter ****/

    .jcl-component.styled-gauge > meter::-moz-meter-bar {
      border:none;
      background:var(--jcl-success-bg-color,#00a63e);
    }

    .jcl-component.styled-gauge > meter:-moz-meter-sub-optimum::-moz-meter-bar {
      background:var(--jcl-warning-bg-color,#fd9a00);
    }

    .jcl-component.styled-gauge > meter:-moz-meter-sub-sub-optimum::-moz-meter-bar {
      background:var(--jcl-destructive-bg-color,#e7000b);
    }

  /**** size variants ****/

    .jcl-component.styled-gauge.size-small > meter {
      height:6px;
    }

    .jcl-component.styled-gauge.size-large > meter {
      height:12px;
    }
  `);
function db(e) {
  return H(() => {
    ub(), e = G(e);
    const t = D(e.Class) ?? "", n = re(e.Style), o = qe(e.Value), r = qe(e.Max ?? e.Maximum), a = z(e.Size, (s) => he(s, ["small", "normal", "large"])) ?? "normal", i = ut(a);
    return b`<div class="jcl-component styled-progressbar ${i} ${t}" style=${n}>
        <progress value=${o} max=${r} ...${e.RestProps}/>
      </>`;
  });
}
const ub = /* @__PURE__ */ Z("jcl-component.styled-progressbar", `
    .jcl-component.styled-progressbar {
      height:36px;
      min-width:40px; min-height:20px;
    }

    .jcl-component.styled-progressbar > progress {
      position:absolute;
      left:50%; top:50%; width:100%; height:8px;
      transform:translate(-50%,-50%);
      margin:0px; padding:0px;
      -webkit-appearance:none; appearance:none;
      border:none; border-radius:9999px;
      background:color-mix(               /* also the track color in Firefox */
        in srgb, var(--jcl-primary-bg-color,#171717) 20%, transparent
      );
      overflow:hidden;
    }

  /**** WebKit/Blink: track and fill ****/

    .jcl-component.styled-progressbar > progress::-webkit-progress-bar {
      border:none; border-radius:9999px;
      background:color-mix(
        in srgb, var(--jcl-primary-bg-color,#171717) 20%, transparent
      );
    }

    .jcl-component.styled-progressbar > progress::-webkit-progress-value {
      border:none;
      background:var(--jcl-primary-bg-color,#171717);
      transition:width 0.15s ease;
    }

  /**** Firefox: fill only (the track is the progress background itself) ****/

    .jcl-component.styled-progressbar > progress::-moz-progress-bar {
      border:none;
      background:var(--jcl-primary-bg-color,#171717);
    }

  /**** size variants ****/

    .jcl-component.styled-progressbar.size-small > progress {
      height:6px;
    }

    .jcl-component.styled-progressbar.size-large > progress {
      height:12px;
    }
  `);
function pb(e) {
  return H(() => {
    fb(), e = G(e);
    const t = D(e.Class) ?? "", n = re(e.Style), o = z(e.Value, (I) => bt(I) || Je(I)), r = qe(e.Min ?? e.Minimum), a = z(e.Step, (I) => Io(I, 0, 1 / 0, !1, !1)), i = qe(e.Max ?? e.Maximum), s = z(e.Hashmarks, (I) => Ie(I, Ne)), l = z(e.Size, (I) => he(I, ["small", "normal", "large"])) ?? "normal", d = Y(e.disabled) ?? !1, u = R(e.onValueInput), p = R(e.onInput), c = R(e.onBlur), { ViewRef: f, shownValue: h, ValueToShow: g } = yn(
      Je(o) || o != null && !isNaN(o) ? o : yt
    ), { actualValue: y, actualDisabling: m } = it(g, d), v = dt(), { _onInput: C, _onBlur: _ } = xn({
      Name: "styledSlider",
      actualDisabling: m,
      shownValue: h,
      onInput: p,
      onValueInput: u,
      onBlur: c,
      processedInput: (I) => {
        const M = h.current = parseFloat(I.target.value);
        return v(), M;
      }
    }), j = r ?? 0, x = i ?? 100;
    let w = 0;
    bt(y) && x > j && (w = Math.max(0, Math.min(
      100,
      (y - j) * 100 / (x - j)
    )));
    const { SuggestionId: T, SuggestionList: L } = vn(
      s,
      (I) => {
        const { Value: M, Label: S } = At(I);
        return b`<option value=${M}>${S}</option>`;
      }
    ), $ = ut(l);
    return b`<div class="jcl-component styled-slider ${$} ${t}" style=${n}>
        <input type="range" ref=${f} disabled=${m}
          style="--jcl-slider-fill:${w}%"
          value=${y} min=${r} max=${i} step=${a}
          list=${T}
          onInput=${C} onBlur=${_} ...${e.RestProps}
        />${L}
      </>`;
  });
}
const fb = /* @__PURE__ */ Z("jcl-component.styled-slider", `
    .jcl-component.styled-slider {
      height:36px;
      min-width:40px; min-height:20px;
    }

    .jcl-component.styled-slider > input {
      position:absolute;
      left:50%; top:50%; width:100%; height:20px;
      transform:translate(-50%,-50%);
      margin:0px; padding:0px;
      -webkit-appearance:none; appearance:none;
      background:transparent;
      outline:none;
      cursor:pointer;
    }

  /**** "disabled" also overrides JCL's general "[disabled]" opacity rule ****/

    .jcl-component.styled-slider > input:disabled {
      pointer-events:none; cursor:not-allowed;
      opacity:0.5;
    }

  /**** WebKit/Blink: track (with fill gradient) and thumb ****/

    .jcl-component.styled-slider > input::-webkit-slider-runnable-track {
      height:6px; border-radius:9999px;
      background:linear-gradient(to right,
        var(--jcl-primary-bg-color,#171717) var(--jcl-slider-fill,0%),
        var(--jcl-muted-bg-color,#f5f5f5)   var(--jcl-slider-fill,0%)
      );
    }

    .jcl-component.styled-slider > input::-webkit-slider-thumb {
      -webkit-appearance:none; appearance:none;
      margin-top:-5px;                            /* (thumb - track) / 2 */
      width:16px; height:16px; border-radius:50%;
      border:solid 1px var(--jcl-primary-bg-color,#171717);
      background:#ffffff;
      box-shadow:0px 1px 3px 0px rgba(0,0,0,0.1),
        0px 1px 2px -1px rgba(0,0,0,0.1);
      transition:box-shadow 0.15s ease;
    }

    .jcl-component.styled-slider > input:hover::-webkit-slider-thumb,
    .jcl-component.styled-slider > input:focus-visible::-webkit-slider-thumb {
      box-shadow:0px 1px 3px 0px rgba(0,0,0,0.1),
        0px 1px 2px -1px rgba(0,0,0,0.1),
        0px 0px 0px 4px color-mix(
          in srgb, var(--jcl-ring-color,#2563eb) 50%, transparent
        );
    }

  /**** Firefox: track, filled range and thumb ****/

    .jcl-component.styled-slider > input::-moz-range-track {
      height:6px; border-radius:9999px;
      background:var(--jcl-muted-bg-color,#f5f5f5);
    }

    .jcl-component.styled-slider > input::-moz-range-progress {
      height:6px; border-radius:9999px;
      background:var(--jcl-primary-bg-color,#171717);
    }

    .jcl-component.styled-slider > input::-moz-range-thumb {
      width:16px; height:16px; border-radius:50%;
      border:solid 1px var(--jcl-primary-bg-color,#171717);
      background:#ffffff;
      box-shadow:0px 1px 3px 0px rgba(0,0,0,0.1),
        0px 1px 2px -1px rgba(0,0,0,0.1);
      transition:box-shadow 0.15s ease;
    }

    .jcl-component.styled-slider > input:hover::-moz-range-thumb,
    .jcl-component.styled-slider > input:focus-visible::-moz-range-thumb {
      box-shadow:0px 1px 3px 0px rgba(0,0,0,0.1),
        0px 1px 2px -1px rgba(0,0,0,0.1),
        0px 0px 0px 4px color-mix(
          in srgb, var(--jcl-ring-color,#2563eb) 50%, transparent
        );
    }

  /**** size variants ****/

    .jcl-component.styled-slider.size-small > input::-webkit-slider-runnable-track {
      height:4px;
    }
    .jcl-component.styled-slider.size-small > input::-webkit-slider-thumb {
      margin-top:-5px;
      width:14px; height:14px;
    }
    .jcl-component.styled-slider.size-small > input::-moz-range-track,
    .jcl-component.styled-slider.size-small > input::-moz-range-progress {
      height:4px;
    }
    .jcl-component.styled-slider.size-small > input::-moz-range-thumb {
      width:14px; height:14px;
    }

    .jcl-component.styled-slider.size-large > input::-webkit-slider-runnable-track {
      height:8px;
    }
    .jcl-component.styled-slider.size-large > input::-webkit-slider-thumb {
      margin-top:-6px;
      width:20px; height:20px;
    }
    .jcl-component.styled-slider.size-large > input::-moz-range-track,
    .jcl-component.styled-slider.size-large > input::-moz-range-progress {
      height:8px;
    }
    .jcl-component.styled-slider.size-large > input::-moz-range-thumb {
      width:20px; height:20px;
    }
  `), hb = /* @__PURE__ */ Tt({
  Name: "styledTextlineInput",
  InputType: "text",
  ClassName: "styled-textline-input",
  ValueIsValid: Ne,
  withSpellChecking: !0,
  Styled: !0
}), gb = /* @__PURE__ */ Tt({
  Name: "styledPasswordInput",
  InputType: "password",
  ClassName: "styled-password-input",
  ValueIsValid: Ne,
  withSuggestions: !1,
  Styled: !0
});
function mb(e) {
  return H(() => {
    On(), e = G(e);
    const t = D(e.Class) ?? "", n = z(e.Value, (S) => bt(S) || Je(S)), o = Y(e.invalid), r = D(e.Placeholder), a = Y(e.readonly), i = qe(e.Min ?? e.Minimum), s = z(e.Step, (S) => Io(S, 0, 1 / 0, !1, !1)), l = qe(e.Max ?? e.Maximum), d = fr(e.Digits, 0, 15), u = Y(e.withoutTrailingZeros) ?? !1, p = z(e.Suggestions, (S) => Ie(S, bt)), c = z(e.Size, (S) => he(S, ["small", "normal", "large"])) ?? "normal", f = Y(e.disabled) ?? !1, h = R(e.onValueInput), g = R(e.onInput), y = R(e.onBlur);
    let m = s;
    if (d != null) {
      const S = Math.pow(10, -d);
      m = Math.max(s ?? S, S);
    }
    const { ViewRef: v, shownValue: C, ValueToShow: _ } = yn(
      Je(n) || n != null && !isNaN(n) ? n : yt,
      (S) => (d != null && bt(S) && (S = S.toFixed(d), u && (S = parseFloat(S))), S)
    ), { actualValue: j, actualPlaceholder: x, actualDisabling: w } = it(_, f, r), { _onInput: T, _onBlur: L } = xn({
      Name: "styledNumberInput",
      actualDisabling: w,
      shownValue: C,
      onInput: g,
      onValueInput: h,
      onBlur: y,
      processedInput: (S) => {
        const F = parseFloat(S.target.value);
        return C.current = isNaN(F) ? void 0 : F, C.current;
      }
    }), { SuggestionId: $, SuggestionList: I } = vn(p), M = ut(c);
    return b`<input type="number" ref=${v}
        class="jcl-component styled-input styled-number-input ${M} ${t} ${o ? "invalid" : ""}"
        value=${j} min=${i} max=${l} step=${m}
        readOnly=${a} placeholder=${x}
        disabled=${w} list=${$}
        aria-invalid=${o ? "true" : void 0}
        onInput=${T} onBlur=${L} ...${e.RestProps}
      />${I}`;
  });
}
const bb = /* @__PURE__ */ Tt({
  Name: "styledEMailAddressInput",
  InputType: "email",
  ClassName: "styled-emailaddress-input",
  ValueIsValid: Ln,
  withMultiple: !0,
  Styled: !0
}), yb = /* @__PURE__ */ Tt({
  Name: "styledPhoneNumberInput",
  InputType: "tel",
  ClassName: "styled-phonenumber-input",
  ValueIsValid: kr,
  Styled: !0
}), xb = /* @__PURE__ */ Tt({
  Name: "styledURLInput",
  InputType: "url",
  ClassName: "styled-url-input",
  ValueIsValid: st,
  Styled: !0
}), vb = /* @__PURE__ */ Zt({
  Name: "styledTimeInput",
  InputType: "time",
  ClassName: "styled-time-input",
  ValueIsValid: Yl,
  Styled: !0
}), wb = /* @__PURE__ */ Zt({
  Name: "styledDateTimeInput",
  InputType: "datetime-local",
  ClassName: "styled-datetime-input",
  ValueIsValid: Jl,
  Styled: !0
}), kb = /* @__PURE__ */ Zt({
  Name: "styledDateInput",
  InputType: "date",
  ClassName: "styled-date-input",
  ValueIsValid: zt,
  Pattern: Za,
  Styled: !0
}), Cb = /* @__PURE__ */ Zt({
  Name: "styledWeekInput",
  InputType: "week",
  ClassName: "styled-week-input",
  ValueIsValid: Zl,
  Pattern: Qa,
  Styled: !0
}), $b = /* @__PURE__ */ Zt({
  Name: "styledMonthInput",
  InputType: "month",
  ClassName: "styled-month-input",
  ValueIsValid: ei,
  Pattern: Pa,
  Styled: !0
}), jb = /* @__PURE__ */ Tt({
  Name: "styledSearchInput",
  InputType: "search",
  ClassName: "styled-search-input",
  ValueIsValid: Ne,
  withSpellChecking: !0,
  Styled: !0
});
function Ib(e) {
  return H(() => {
    On(), _b(), e = G(e);
    const t = D(e.Class) ?? "", n = re(e.Style), o = z(e.Value, (m) => Dn(m) || Je(m)), r = Y(e.readonly), a = z(e.Suggestions, (m) => Ie(m, Dn));
    let i = $e(e.minWidth);
    const s = z(e.Size, (m) => he(m, ["small", "normal", "large"])) ?? "normal", l = Y(e.disabled) ?? !1, d = R(e.onValueInput), u = R(e.onInput), { actualValue: p, actualDisabling: c } = it(o, l), f = ie((m) => {
      if (Le(m), c == !0)
        return;
      E('styledColorInput callback "onInput"', u, m);
      const v = m.target.value;
      E(
        'styledColorInput callback "onValueInput"',
        d,
        v,
        m
      );
    }, [c, u, d]), { SuggestionId: h, SuggestionList: g } = vn(a);
    i == null && (i = 40 + (a != null && a.length > 0 ? 20 : 0));
    const y = ut(s);
    return b`<input type="color" class="jcl-component styled-input styled-color-input ${y} ${t}"
        style="min-width:${i}px; ${n}"
        value=${p} list=${h}
        disabled=${c} onInput=${f} ...${e.RestProps}
      />${g}`;
  });
}
const _b = /* @__PURE__ */ Z("jcl-component.styled-color-input", `
    .jcl-component.styled-color-input {
      min-width:40px;
      padding:4px;
      cursor:pointer;
    }

  /**** the swatch keeps its color even when disabled - dim it instead ****/

    .jcl-component.styled-color-input:disabled {
      opacity:0.5;
    }

  /**** WebKit/Blink: remove wrapper padding, round the swatch ****/

    .jcl-component.styled-color-input::-webkit-color-swatch-wrapper {
      padding:0px;
    }

    .jcl-component.styled-color-input::-webkit-color-swatch {
      border:none;
      border-radius:calc(var(--jcl-border-radius,8px) - 4px);
    }

  /**** Firefox: dto. ****/

    .jcl-component.styled-color-input::-moz-color-swatch {
      border:none;
      border-radius:calc(var(--jcl-border-radius,8px) - 4px);
    }

  /**** size variants just need adjusted paddings ****/

    .jcl-component.styled-color-input.size-small {
      padding:3px;
    }

    .jcl-component.styled-color-input.size-large {
      padding:5px;
    }
  `);
function Sb(e) {
  return H(() => {
    On(), Db(), e = G(e);
    const t = D(e.Class) ?? "", n = z(e.Value, (c) => Ne(c) || Je(c)), o = z(e.Options, (c) => Ie(c, Ne)) ?? Me("Options"), r = z(e.Size, (c) => he(c, ["small", "normal", "large"])) ?? "normal", a = Y(e.disabled) ?? !1, i = R(e.onValueInput), s = R(e.onInput), { actualValue: l, actualDisabling: d } = it(n, a), u = ie((c) => {
      if (Le(c), d == !0)
        return;
      E('styledDropDown callback "onInput"', s, c);
      let f = c.target.value;
      E(
        'styledDropDown callback "onValueInput"',
        i,
        f,
        c
      );
    }, [d, s, i]), p = ut(r);
    return b`<div class="jcl-component styled-dropdown ${t}">
        <select class="jcl-component styled-input ${p}"
          disabled=${d} onInput=${u} ...${e.RestProps}
        >${o.map(
      (c) => {
        const {
          Value: f,
          Label: h,
          disabled: g,
          isRuler: y
        } = At(c);
        return y ? b`<hr/>` : b`<option value=${f}
                  selected=${f === l} disabled=${g}
                >${h}</option>`;
      }
    )}</select>
      </>`;
  });
}
const Db = /* @__PURE__ */ Z("jcl-component.styled-dropdown", `
    .jcl-component.styled-dropdown {
      display:inline-block;
      width:fit-content; height:fit-content;
      min-width:30px;
    }

    .jcl-component.styled-dropdown > select {
      -webkit-appearance:none; appearance:none;
      width:100%;
      padding-right:36px;
      cursor:pointer;
    }

    .jcl-component.styled-dropdown > select.size-small,
    .jcl-component.styled-dropdown > select.size-large {
      padding-right:36px;
    }

  /**** a self-drawn chevron replaces the hidden native arrow ****/

    .jcl-component.styled-dropdown::after {
      content:''; display:block; position:absolute;
      right:12px; top:50%; transform:translateY(-50%);
      width:16px; height:16px;
      background:var(--jcl-muted-fg-color,#737373);
      opacity:0.5;
      pointer-events:none;
      ${Cr}
      ${$t}
    }

  /**** like shadcn, "disabled" dims the whole wrapper (incl. chevron) ****/

    .jcl-component.styled-dropdown:has(> select:disabled) {
      opacity:0.5;
    }

  /**** options use system colors to stay readable in dark mode ****/

    .jcl-component.styled-dropdown option,
    .jcl-component.styled-dropdown optgroup {
      background:Canvas; color:CanvasText;
    }
  `);
function Lb(e) {
  return H(() => {
    On(), Mb(), e = G(e);
    const t = D(e.Class) ?? "", n = re(e.Style), o = z(e.Value, (m) => Ne(m) || Je(m)), r = D(e.Placeholder), a = Y(e.multiple), i = D(e.Accept), s = z(e.Size, (m) => he(m, ["small", "normal", "large"])) ?? "normal", l = Y(e.disabled) ?? !1, d = R(e.onValueInput), u = R(e.onInput), p = o ?? yt, { actualValue: c, actualPlaceholder: f, actualDisabling: h } = it(p, l, r), g = ie((m) => {
      if (Le(m), h == !0)
        return;
      E('styledFileInput callback "onInput"', u, m);
      let v = Array.from(m.target.files);
      E(
        'styledFileInput callback "onValueInput"',
        d,
        v,
        m
      ), m.target.value = "";
    }, [h, u, d]), y = ut(s);
    return b`<label class="jcl-component styled-input styled-file-input ${y} ${t} ${h ? "disabled" : ""}"
        style=${n}
      >
        ${c == null ? b`<span class="placeholder">${f ?? ""}</span>` : b`<span>${c}</span>`}
        <input type="file" style="display:none"
          multiple=${a} accept=${i}
          disabled=${h} onInput=${g} ...${e.RestProps}
        />
      </label>`;
  });
}
const Mb = /* @__PURE__ */ Z("jcl-component.styled-file-input", `
    .jcl-component.styled-file-input {
      display:inline-block;
      min-width:60px;
      line-height:26px;              /* centres the text in all three sizes */
      overflow:hidden;
      cursor:pointer;
    }
    .jcl-component.styled-file-input > span {
      display:inline-block; width:100%;
      white-space:nowrap; overflow:hidden; text-overflow:ellipsis;
    }

    .jcl-component.styled-file-input > span.placeholder {
      color:var(--jcl-muted-fg-color,#737373);
    }

  /**** "disabled" also overrides JCL's general ".disabled" opacity rule ****/

    .jcl-component.styled-file-input.disabled {
      pointer-events:none; cursor:not-allowed;
      background:var(--jcl-muted-bg-color,#f5f5f5);
      color:var(--jcl-muted-fg-color,#737373);
      opacity:1;
    }
  `);
function Ab(e) {
  return H(() => {
    On(), Tb(), e = G(e);
    const t = D(e.Class) ?? "", n = re(e.Style), o = z(e.Value, (L) => hn(L) || Je(L)), r = Y(e.invalid), a = D(e.Placeholder), i = Y(e.readonly), s = $e(e.minLength), l = $e(e.maxLength), d = Y(e.wrap), u = z(e.Resizability, (L) => he(L, ["none", "horizontal", "vertical", "both"])), p = Y(e.SpellCheck), c = Y(e.disabled) ?? !1, f = R(e.onValueInput), h = R(e.onInput), g = R(e.onBlur), { ViewRef: y, shownValue: m, ValueToShow: v } = yn(o), { actualValue: C, actualPlaceholder: _, actualDisabling: j } = it(v, c, a), { _onInput: x, _onBlur: w } = xn({
      Name: "styledTextInput",
      actualDisabling: j,
      shownValue: m,
      onInput: h,
      onValueInput: f,
      onBlur: g
    }), T = Vt();
    return b`<textarea class="jcl-component styled-input styled-text-input ${t} ${r ? "invalid" : ""}"
        key=${T} ref=${y}
        style="${d == !0 ? "overflow-wrap:break-word; hyphens:auto;" : "white-space:pre;"} resize:${u ?? "none"}; ${n}"
        value=${C} minlength=${s} maxlength=${l}
        readOnly=${i} placeholder=${_}
        spellcheck=${p} disabled=${j}
        aria-invalid=${r ? "true" : void 0}
        onInput=${x} onBlur=${w} ...${e.RestProps}
      />`;
  });
}
const Tb = /* @__PURE__ */ Z("jcl-component.styled-text-input", `
    .jcl-component.styled-text-input {
      height:auto; min-height:64px;      /* shadcn "Textarea" uses "min-h-16" */
      padding:8px 12px;
    }
  `);
function zc(e, t, n, o) {
  const r = D(n.Class) ?? "", a = re(n.Style), i = St(n.Color), s = Mn(n.Label), l = Y(n.active) ?? !1, d = Y(n.disabled) ?? !1, u = z(n.Variant, (g) => he(g, ["default", "destructive", "outline", "secondary", "ghost"])) ?? "ghost", p = z(n.Size, (g) => he(g, ["xs", "small", "normal", "large"])) ?? "normal", c = R(n.onClick), f = ie((g) => {
    if (d)
      return wn(g);
    E(e + ' callback "onClick"', c, g);
  }, [d, c]), h = ut(p);
  return b`<button
      class="jcl-component styled-button ${t} variant-${u} ${h} ${l ? "active" : ""} ${r}"
      style=${a} disabled=${d}
      aria-label=${s} aria-pressed=${l ? "true" : void 0}
      onClick=${f} ...${n.RestProps}
    >${o(i)}</>`;
}
function Rb(e) {
  return H(() => {
    Ar(), Fb(), e = G(e);
    const t = Fn(e.Value) ?? `${ur}/circle-information.png`;
    return zc(
      "styledIcon",
      "styled-icon",
      e,
      (n) => b`<span style="
          -webkit-mask-image:url(${t}); mask-image:url(${t});
          background-color:${n ?? "currentColor"};
        "/>`
    );
  });
}
const Fb = /* @__PURE__ */ Z("jcl-component.styled-icon", `
    .jcl-component.styled-icon {
      width:36px; height:36px; padding:0px;
    }

    .jcl-component.styled-icon > span {
      display:inline-block; width:16px; height:16px;
      overflow:hidden; pointer-events:none;
      ${$t}
    }

    .jcl-component.styled-icon.active {
      background:var(--jcl-accent-bg-color,#2563eb);
      color:var(--jcl-accent-fg-color,#ffffff);
    }

  /**** size variants ****/

    .jcl-component.styled-icon.size-xs {
      width:24px; height:24px; padding:0px;
    }
    .jcl-component.styled-icon.size-xs > span {
      width:12px; height:12px;
    }

    .jcl-component.styled-icon.size-small {
      width:32px; height:32px; padding:0px;
    }

    .jcl-component.styled-icon.size-large {
      width:40px; height:40px; padding:0px;
    }
  `);
function Ob(e) {
  return H(() => {
    Ar(), zb(), e = G(e);
    const t = z(
      e.Value,
      (n) => he(n, Ya)
    ) ?? "fa-question-circle-o";
    return zc(
      "styledFAIcon",
      "styled-fa-icon",
      e,
      (n) => b`<span class="fa ${t}" style="color:${n ?? "currentColor"}"/>`
    );
  });
}
const zb = /* @__PURE__ */ Z("jcl-component.styled-fa-icon", `
    .jcl-component.styled-fa-icon {
      width:36px; height:36px; padding:0px;
    }

    .jcl-component.styled-fa-icon > .fa {
      font-size:16px; line-height:16px;
      pointer-events:none;
    }

    .jcl-component.styled-fa-icon.active {
      background:var(--jcl-accent-bg-color,#2563eb);
      color:var(--jcl-accent-fg-color,#ffffff);
    }

  /**** size variants ****/

    .jcl-component.styled-fa-icon.size-xs {
      width:24px; height:24px; padding:0px;
    }
    .jcl-component.styled-fa-icon.size-xs > .fa {
      font-size:12px; line-height:12px;
    }

    .jcl-component.styled-fa-icon.size-small {
      width:32px; height:32px; padding:0px;
    }

    .jcl-component.styled-fa-icon.size-large {
      width:40px; height:40px; padding:0px;
    }
  `);
function sn(e, t, n) {
  return H(() => {
    n = G(n);
    const o = D(n.Class) ?? "", r = re(n.Style);
    return b`<${e} class="jcl-component ${t} ${o}"
        style=${r} ...${n.RestProps}
      >
        ${n.children}
      </>`;
  });
}
function Eo(e, t, n, o, r, a) {
  return r == null ? b`<${e} class="${t}" style=${n} ...${o}>
        ${a}
      </>` : b`<${e} class="${t}" style=${n} ...${o}
        dangerouslySetInnerHTML=${{ __html: r }}
      />`;
}
function Nb(e) {
  return H(() => {
    Eb(), e = G(e);
    const t = D(e.Class) ?? "", n = re(e.Value), o = z(e.Variant, (a) => he(a, ["default", "destructive", "outline", "secondary"])) ?? "default", r = e.children;
    return Eo("span", `jcl-component styled-badge variant-${o} ${t}`, void 0, e.RestProps, n, r);
  });
}
const Eb = /* @__PURE__ */ Z("jcl-component.styled-badge", `
    .jcl-component.styled-badge {
      display:inline-flex; align-items:center; justify-content:center;
      gap:4px; flex-shrink:0;
      width:fit-content; overflow:hidden;
      border:solid 1px transparent; border-radius:9999px;
      padding:2px 8px;
      font:inherit; font-size:12px; font-weight:500; white-space:nowrap;
    }

  /**** badge variants ****/

    .jcl-component.styled-badge.variant-default {
      background:var(--jcl-primary-bg-color,#0075ff);
      color:var(--jcl-primary-fg-color,#ffffff);
    }

    .jcl-component.styled-badge.variant-destructive {
      background:var(--jcl-destructive-bg-color,#e7000b);
      color:var(--jcl-destructive-fg-color,#ffffff);
    }

    .jcl-component.styled-badge.variant-outline {
      border-color:var(--jcl-border-color,#ebebeb);
      background:transparent;
      color:var(--jcl-fg-color,#0a0a0a);
    }

    .jcl-component.styled-badge.variant-secondary {
      background:var(--jcl-secondary-bg-color,#f7f7f7);
      color:var(--jcl-secondary-fg-color,#171717);
    }
  `);
function Vb(e) {
  return H(() => {
    Bb(), e = G(e);
    const t = D(e.Class) ?? "", n = re(e.Style), o = St(e.Color), r = D(e.Label) ?? "Loading", a = z(e.Size, (s) => he(s, ["small", "normal", "large"])) ?? "normal", i = ut(a);
    return b`<svg class="jcl-component styled-spinner ${i} ${t}"
        style=${n} role="status" aria-label=${r}
        viewBox="0 0 24 24" fill="none" stroke=${o ?? "currentColor"}
        stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
        ...${e.RestProps}
      ><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>`;
  });
}
const Bb = /* @__PURE__ */ Z("jcl-component.styled-spinner", `
    @keyframes jcl-spin {
      to { transform:rotate(360deg) }
    }

    .jcl-component.styled-spinner {
      display:inline-block;
      width:16px; height:16px;
      animation:jcl-spin 1s linear infinite;
    }

  /**** size variants ****/

    .jcl-component.styled-spinner.size-small {
      width:12px; height:12px;
    }

    .jcl-component.styled-spinner.size-large {
      width:24px; height:24px;
    }
  `);
function Wb(e) {
  return H(() => {
    Hb(), e = G(e);
    const t = D(e.Class) ?? "", n = re(e.Value), o = e.children;
    return Eo("kbd", `jcl-component styled-kbd ${t}`, void 0, e.RestProps, n, o);
  });
}
const Hb = /* @__PURE__ */ Z("jcl-component.styled-kbd", `
    .jcl-component.styled-kbd {
      display:inline-flex; align-items:center; justify-content:center;
      gap:4px;
      width:fit-content;
      border:solid 1px var(--jcl-border-color,#ebebeb);
      border-bottom-width:2px;
      border-radius:calc(var(--jcl-border-radius,8px) - 4px);
      background:var(--jcl-muted-bg-color,#f5f5f5);
      color:var(--jcl-fg-color,#0a0a0a);
      padding:2px 6px;
      font-family:var(--jcl-sans-serif-font,ui-sans-serif,system-ui,sans-serif);
      font-size:12px; font-weight:500; line-height:1.4;
      white-space:nowrap;
      user-select:none; pointer-events:none;
    }
  `);
function Gb(e) {
  return H(() => {
    Ub(), e = G(e);
    const t = D(e.Class) ?? "", n = re(e.Style), o = Fn(e.Value), r = D(e.Alt), a = D(e.Fallback), i = z(e.Size, (f) => he(f, ["small", "normal", "large"])) ?? "normal", [s, l] = He(!1), d = U(void 0);
    d.current !== o && (d.current = o, s && l(!1));
    const u = ie(() => l(!0), []), p = o != null && !s, c = ut(i);
    return b`<div class="jcl-component styled-avatar ${c} ${t}"
        style=${n} ...${e.RestProps}
      >
        ${p ? b`<img src=${o} alt=${r} onError=${u}/>` : b`<span>${a ?? ""}</span>`}
      </>`;
  });
}
const Ub = /* @__PURE__ */ Z("jcl-component.styled-avatar", `
    .jcl-component.styled-avatar {
      display:flex; flex-shrink:0;
      width:40px; height:40px;
      border-radius:50%; overflow:hidden;
      user-select:none;
    }

    .jcl-component.styled-avatar > img {
      width:100%; height:100%;
      aspect-ratio:1/1; object-fit:cover;
    }

    .jcl-component.styled-avatar > span {
      display:flex; align-items:center; justify-content:center;
      width:100%; height:100%;
      border-radius:50%;
      background:var(--jcl-muted-bg-color,#f5f5f5);
      color:var(--jcl-muted-fg-color,#737373);
      font-size:14px; font-weight:500;
    }

  /**** size variants (following the shadcn size scale "sm"/"lg") ****/

    .jcl-component.styled-avatar.size-small {
      width:32px; height:32px;
    }
    .jcl-component.styled-avatar.size-small > span {
      font-size:12px;
    }

    .jcl-component.styled-avatar.size-large {
      width:48px; height:48px;
    }
    .jcl-component.styled-avatar.size-large > span {
      font-size:16px;
    }
  `);
function Kb(e) {
  return H(() => {
    qb(), e = G(e);
    const t = D(e.Class) ?? "", n = re(e.Style);
    return b`<div class="jcl-component styled-skeleton ${t}"
        style=${n} aria-hidden="true" ...${e.RestProps}
      />`;
  });
}
const qb = /* @__PURE__ */ Z("jcl-component.styled-skeleton", `
    @keyframes jcl-pulse {
      0%, 100% { opacity:1 }
      50%      { opacity:0.5 }
    }

    .jcl-component.styled-skeleton {
      display:inline-block;
      width:100%; height:16px;
      border-radius:var(--jcl-border-radius,8px);
      background:var(--jcl-accent-bg-color,#f7f7f7);
      animation:jcl-pulse 2s cubic-bezier(0.4,0,0.6,1) infinite;
    }
  `);
function Nc(e) {
  return H(() => {
    Xb(), e = G(e);
    const t = D(e.Class) ?? "", n = re(e.Style), o = re(e.Value) ?? Me("Value"), r = z(e.Placement, (y) => he(y, ["top", "bottom", "left", "right"])) ?? "top", a = $e(e.Delay), i = gt(kt), s = a ?? i?.TooltipDelay ?? 600, l = Vt(), [d, u] = He(!1), p = U(void 0);
    function c() {
      p.current != null && (clearTimeout(p.current), p.current = void 0);
    }
    function f() {
      c(), p.current = setTimeout(() => u(!0), s);
    }
    function h() {
      c(), u(!0);
    }
    function g() {
      c(), u(!1);
    }
    return je(() => c, []), b`<span class="jcl-component styled-tooltip ${t}"
        style=${n} aria-describedby=${d ? l : void 0}
        onMouseEnter=${f} onMouseLeave=${g}
        onFocusIn=${h} onFocusOut=${g}
        ...${e.RestProps}
      >
        ${e.children}
        ${d && b`<div class="tooltip placement-${r}"
          id=${l} role="tooltip"
        >${o}</div>`}
      </>`;
  });
}
const Xb = /* @__PURE__ */ Z("jcl-component.styled-tooltip", `
    .jcl-component.styled-tooltip {
      display:inline-block;
      width:fit-content;
    }

    @keyframes jcl-tooltip-in {
      from { opacity:0 }
      to   { opacity:1 }
    }

    .jcl-component.styled-tooltip > .tooltip {
      position:absolute; z-index:4000000;   /* even above JCL dialogs */
      width:max-content; max-width:280px;
      border-radius:var(--jcl-border-radius,8px);
      background:var(--jcl-fg-color,#0a0a0a);
      color:var(--jcl-bg-color,#ffffff);
      padding:6px 12px;
      font-size:12px; line-height:1.4; text-wrap:balance;
      pointer-events:none;
      animation:jcl-tooltip-in 0.15s ease;
    }

  /**** placements (incl. a small arrow, drawn as a rotated square) ****/

    .jcl-component.styled-tooltip > .tooltip::after {
      content:''; position:absolute;
      width:8px; height:8px;
      border-radius:2px;
      background:inherit;
    }

    .jcl-component.styled-tooltip > .tooltip.placement-top {
      bottom:calc(100% + 8px); left:50%;
      transform:translateX(-50%);
    }
    .jcl-component.styled-tooltip > .tooltip.placement-top::after {
      left:50%; top:100%;
      transform:translate(-50%,-50%) rotate(45deg);
    }

    .jcl-component.styled-tooltip > .tooltip.placement-bottom {
      top:calc(100% + 8px); left:50%;
      transform:translateX(-50%);
    }
    .jcl-component.styled-tooltip > .tooltip.placement-bottom::after {
      left:50%; bottom:100%;
      transform:translate(-50%,50%) rotate(45deg);
    }

    .jcl-component.styled-tooltip > .tooltip.placement-left {
      right:calc(100% + 8px); top:50%;
      transform:translateY(-50%);
    }
    .jcl-component.styled-tooltip > .tooltip.placement-left::after {
      left:100%; top:50%;
      transform:translate(-50%,-50%) rotate(45deg);
    }

    .jcl-component.styled-tooltip > .tooltip.placement-right {
      left:calc(100% + 8px); top:50%;
      transform:translateY(-50%);
    }
    .jcl-component.styled-tooltip > .tooltip.placement-right::after {
      right:100%; top:50%;
      transform:translate(50%,-50%) rotate(45deg);
    }
  `);
function si(e) {
  const { ComponentName: t, Name: n, NamePrefix: o, onOpenChange: r, OverlayFor: a } = e, i = Vt(), s = n ?? o + i, l = U(void 0), { openOverlay: d, closeOverlay: u, OverlayIsOpen: p } = no();
  function c() {
    if (p(s)) {
      u(s);
      return;
    }
    const f = l.current, h = f?.closest(".jcl-component.overlay-base");
    (f == null || h == null) && ce(
      `MissingOverlayBase: "${t}" must be used within an "OverlayBase"`
    ), d({
      Name: s,
      isModal: !1,
      ...a(f, h),
      onOpen: () => E(
        t + ' callback "onOpenChange"',
        r,
        !0
      ),
      onClose: () => E(
        t + ' callback "onOpenChange"',
        r,
        !1
      )
    });
  }
  return { OverlayName: s, ViewRef: l, closeOverlay: u, _onClick: c };
}
function Ec(e) {
  return H(() => {
    Yb(), e = G(e);
    const t = D(e.Class) ?? "", n = re(e.Style), o = D(e.Name), r = R(e.Renderer) ?? Me("Renderer"), a = z(e.Placement, (p) => he(p, ["top", "bottom", "left", "right"])) ?? "bottom", i = $e(e.Width) ?? 288, s = $e(e.Height), l = R(e.onOpenChange), { ViewRef: d, _onClick: u } = si({
      ComponentName: "styledPopover",
      Name: o,
      NamePrefix: "styled-popover-",
      onOpenChange: l,
      /**** compute the overlay position from the trigger geometry ****/
      OverlayFor: (p, c) => {
        const f = p.getBoundingClientRect(), h = c.getBoundingClientRect(), g = f.left - h.left + c.scrollLeft, y = f.top - h.top + c.scrollTop;
        let m, v;
        switch (!0) {
          case (a === "top" && s != null):
            m = g + f.width / 2 - i / 2, v = y - s - 4;
            break;
          case a === "left":
            m = g - i - 4, v = y + (s == null ? 0 : f.height / 2 - s / 2);
            break;
          case a === "right":
            m = g + f.width + 4, v = y + (s == null ? 0 : f.height / 2 - s / 2);
            break;
          default:
            m = g + f.width / 2 - i / 2, v = y + f.height + 4;
        }
        return {
          Renderer: () => b`<div class="jcl-component styled-popover-panel">
              ${r({})}
            </>`,
          OffsetX: m,
          OffsetY: v,
          Width: i,
          Height: s
        };
      }
    });
    return b`<span ref=${d}
        class="jcl-component styled-popover ${t}"
        style=${n} onClick=${u} ...${e.RestProps}
      >
        ${e.children}
      </>`;
  });
}
const Yb = /* @__PURE__ */ Z("jcl-component.styled-popover", `
    .jcl-component.styled-popover {
      display:inline-block;
      width:fit-content;
    }

    .jcl-component.styled-popover-panel {
      padding:16px;
      font-size:14px;
    }

  /**** restyle the hosting OverlayView in the shadcn/ui way ****/
  /**** (shared with "styledDropDownMenu")                    ****/

    .jcl-overlay-view:has(.styled-popover-panel),
    .jcl-overlay-view:has(.styled-dropdown-menu-panel) {
      border:solid 1px var(--jcl-border-color,#ebebeb);
      border-radius:var(--jcl-border-radius,8px);
      background:var(--jcl-bg-color,#ffffff);
      color:var(--jcl-fg-color,#0a0a0a);
      box-shadow:0px 4px 6px -1px rgba(0,0,0,0.1),
        0px 2px 4px -2px rgba(0,0,0,0.1);
    }
  `);
function Jb(e) {
  return H(() => {
    zn(), e = G(e);
    const t = D(e.Class) ?? "", n = re(e.Style), o = D(e.Name), r = R(e.Renderer) ?? Me("Renderer"), a = R(e.onOpenChange), { OverlayName: i, ViewRef: s, closeOverlay: l, _onClick: d } = si({
      ComponentName: "styledDropDownMenu",
      Name: o,
      NamePrefix: "styled-dropdown-menu-",
      onOpenChange: a,
      /**** the menu panel opens below the trigger, left-aligned ****/
      OverlayFor: (p, c) => {
        const f = p.getBoundingClientRect(), h = c.getBoundingClientRect(), g = f.left - h.left + c.scrollLeft, y = f.top - h.top + c.scrollTop + f.height + 4;
        return {
          Renderer: () => b`<div class="jcl-component styled-dropdown-menu-panel"
              role="menu" onClick=${u}
            >
              ${r({})}
            </>`,
          OffsetX: g,
          OffsetY: y,
          minWidth: 128
        };
      }
    });
    function u(p) {
      const c = p.target.closest(".styled-dropdown-menu-item");
      c != null && !c.disabled && l(i);
    }
    return b`<span ref=${s}
        class="jcl-component styled-dropdown-menu ${t}"
        style=${n} onClick=${d} ...${e.RestProps}
      >
        ${e.children}
      </>`;
  });
}
function Zb(e) {
  return H(() => {
    zn(), e = G(e);
    const t = D(e.Class) ?? "", n = D(e.Icon), o = D(e.Shortcut), r = z(e.Variant, (l) => he(l, ["default", "destructive"])) ?? "default", a = Y(e.disabled) ?? !1, i = R(e.onClick), s = ie((l) => {
      if (a)
        return wn(l);
      E('styledDropDownMenuItem callback "onClick"', i, l);
    }, [a, i]);
    return b`<button role="menuitem"
        class="styled-dropdown-menu-item variant-${r} ${t}"
        disabled=${a} onClick=${s} ...${e.RestProps}
      >
        ${n == null ? "" : b`<span class="icon" aria-hidden="true">${n}</>`}
        ${e.children}
        ${o == null ? "" : b`<span class="shortcut">${o}</span>`}
      </>`;
  });
}
function Qb(e) {
  return H(() => {
    zn(), e = G(e);
    const t = D(e.Class) ?? "";
    return b`<div class="styled-dropdown-menu-separator ${t}"
        role="separator" aria-hidden="true" ...${e.RestProps}
      />`;
  });
}
function Pb(e) {
  return H(() => {
    zn(), e = G(e);
    const t = D(e.Class) ?? "", n = D(e.Label);
    return b`<div class="styled-dropdown-menu-group ${t}"
        role="group" ...${e.RestProps}
      >
        ${n == null ? "" : b`<div class="label">${n}</div>`}
        ${e.children}
      </>`;
  });
}
function ey(e) {
  return H(() => {
    zn(), e = G(e);
    const t = D(e.Class) ?? "", n = D(e.Icon), o = D(e.Label) ?? Me("Label"), r = Y(e.disabled) ?? !1, [a, i] = He(!1), s = ie((l) => {
      Le(l), r || i((d) => !d);
    }, [r]);
    return b`<div class="styled-dropdown-menu-submenu ${t}"
        onMouseEnter=${r ? void 0 : () => i(!0)}
        onMouseLeave=${() => i(!1)}
        ...${e.RestProps}
      >
        <button class="submenu-trigger" aria-haspopup="menu"
          aria-expanded=${a ? "true" : "false"}
          disabled=${r} onClick=${s}
        >
          ${n == null ? "" : b`<span class="icon" aria-hidden="true">${n}</>`}
          <span>${o}</span>
          <span class="chevron"/>
        </>
        ${a && b`<div class="submenu-panel" role="menu">
          ${e.children}
        </>`}
      </>`;
  });
}
const zn = /* @__PURE__ */ Z("jcl-component.styled-dropdown-menu", `
    .jcl-component.styled-dropdown-menu {
      display:inline-block;
      width:fit-content;
    }

    .jcl-component.styled-dropdown-menu-panel {
      padding:4px;
      font-size:14px;
    }

  /**** menu items (and submenu triggers, which look just like them) ****/

    .styled-dropdown-menu-item,
    .styled-dropdown-menu-submenu > .submenu-trigger,
    .styled-command-item {
      display:flex; align-items:center;
      gap:8px; width:100%;
      border:none; border-radius:calc(var(--jcl-border-radius,8px) - 4px);
      background:transparent;
      color:var(--jcl-fg-color,#0a0a0a);
      padding:6px 8px;
      font:inherit; font-size:14px; text-align:left;
      white-space:nowrap;
      cursor:pointer; user-select:none;
      outline:none;
      transition:background-color 0.15s ease, color 0.15s ease;
    }

    .styled-dropdown-menu-item > .icon,
    .styled-dropdown-menu-submenu > .submenu-trigger > .icon,
    .styled-command-item > .icon {
      display:inline-flex; align-items:center; justify-content:center;
      flex-shrink:0; width:18px;
    }

    .styled-dropdown-menu-item:hover,
    .styled-dropdown-menu-item:focus-visible,
    .styled-dropdown-menu-submenu > .submenu-trigger:hover,
    .styled-dropdown-menu-submenu > .submenu-trigger:focus-visible,
    .styled-dropdown-menu-submenu.open > .submenu-trigger,
    .styled-command-item:hover,
    .styled-command-item:focus-visible,
    .styled-command-item.highlighted {
      background:var(--jcl-accent-bg-color,#f7f7f7);
      color:var(--jcl-accent-fg-color,#171717);
    }

    .styled-dropdown-menu-item.variant-destructive {
      color:var(--jcl-destructive-bg-color,#e7000b);
    }
    .styled-dropdown-menu-item.variant-destructive:hover,
    .styled-dropdown-menu-item.variant-destructive:focus-visible {
      background:color-mix(
        in srgb, var(--jcl-destructive-bg-color,#e7000b) 10%, transparent
      );
      color:var(--jcl-destructive-bg-color,#e7000b);
    }

    .styled-dropdown-menu-item:disabled,
    .styled-dropdown-menu-submenu > .submenu-trigger:disabled,
    .styled-command-item:disabled {
      pointer-events:none; cursor:not-allowed;
      opacity:0.5;
    }

    .styled-dropdown-menu-item > .shortcut,
    .styled-command-item > .shortcut {
      margin-left:auto;
      font-size:12px;
      color:var(--jcl-muted-fg-color,#737373);
    }

  /**** separators and groups ****/

    .styled-dropdown-menu-separator {
      height:1px; margin:4px -4px;
      background:var(--jcl-border-color,#ebebeb);
    }

    .styled-dropdown-menu-group > .label {
      padding:6px 8px;
      font-size:14px; font-weight:normal;
      user-select:none;
    }

  /**** submenus open as flyouts to the right ****/

    .styled-dropdown-menu-submenu {
      position:relative;
    }

    .styled-dropdown-menu-submenu > .submenu-trigger > .chevron {
      display:inline-block; flex-shrink:0;
      width:16px; height:16px; margin-left:auto;
      background:currentColor;
      pointer-events:none;
      ${$r}
      ${$t}
    }

    .styled-dropdown-menu-submenu > .submenu-panel {
      position:absolute; left:100%; top:-4px; z-index:1;
      min-width:128px;
      border:solid 1px var(--jcl-border-color,#ebebeb);
      border-radius:var(--jcl-border-radius,8px);
      background:var(--jcl-bg-color,#ffffff);
      color:var(--jcl-fg-color,#0a0a0a);
      box-shadow:0px 4px 6px -1px rgba(0,0,0,0.1),
        0px 2px 4px -2px rgba(0,0,0,0.1);
      padding:4px;
    }
  `), Vc = /* @__PURE__ */ mn("");
function ty(e) {
  return H(() => {
    Tr(), e = G(e);
    const t = R(e.Renderer) ?? Me("Renderer"), n = D(e.Placeholder) ?? "type a command or search...", o = D(e.EmptyText) ?? "no results found", [r, a] = He(""), i = U(void 0);
    function s(l) {
      const d = i.current;
      if (d == null)
        return;
      const u = Array.from(
        d.querySelectorAll(".styled-command-item:not([disabled])")
      );
      if (u.length === 0)
        return;
      const p = u.findIndex(
        (f) => f.classList.contains("highlighted")
      );
      function c(f) {
        p >= 0 && u[p].classList.remove("highlighted"), u[f].classList.add("highlighted"), u[f].scrollIntoView({ block: "nearest" });
      }
      switch (!0) {
        case l.key === "ArrowDown":
          l.preventDefault(), c(Math.min(p + 1, u.length - 1));
          break;
        case l.key === "ArrowUp":
          l.preventDefault(), c(Math.max(p - 1, 0));
          break;
        case l.key === "Enter":
          p >= 0 && (l.preventDefault(), u[p].click());
      }
    }
    return b`<div class="panel" ref=${i}>
        <div class="search">
          <span class="search-icon"/>
          <input type="text" autofocus
            value=${r} placeholder=${n}
            onInput=${(l) => a(l.target.value)}
            onKeyDown=${s}
          />
        </>
        <div class="list">
          <${Vc.Provider} value=${r}>
            ${t({ Filter: r })}
          </>
        </>
        <div class="empty">${o}</div>
      </>`;
  });
}
function ny(e) {
  return H(() => {
    Tr(), e = G(e);
    const t = D(e.Class) ?? "", n = re(e.Style), o = D(e.Name), r = R(e.Renderer) ?? Me("Renderer"), a = D(e.Placeholder), i = D(e.EmptyText), s = $e(e.Width) ?? 512, l = R(e.onOpenChange), { OverlayName: d, ViewRef: u, closeOverlay: p, _onClick: c } = si({
      ComponentName: "styledCommandPalette",
      Name: o,
      NamePrefix: "styled-command-palette-",
      onOpenChange: l,
      /**** the palette opens horizontally centered, at 15% from the top ****/
      OverlayFor: (h, g) => {
        const y = g.scrollLeft + Math.max(0, (g.clientWidth - s) / 2), m = g.scrollTop + g.clientHeight * 0.15;
        return {
          Renderer: () => b`<div class="jcl-component styled-command-palette"
              onClick=${f}
            >
              <${ty}
                Renderer=${r} Placeholder=${a} EmptyText=${i}
              />
            </>`,
          OffsetX: y,
          OffsetY: m,
          Width: s
        };
      }
    });
    function f(h) {
      const g = h.target.closest(".styled-command-item");
      g != null && !g.disabled && p(d);
    }
    return b`<span ref=${u}
        class="jcl-component styled-command-palette-trigger ${t}"
        style=${n} onClick=${c} ...${e.RestProps}
      >
        ${e.children}
      </>`;
  });
}
function oy(e) {
  return H(() => {
    Tr(), zn(), e = G(e);
    const t = D(e.Class) ?? "", n = D(e.Icon), o = D(e.Value) ?? Me("Value"), r = D(e.Keywords), a = D(e.Shortcut), i = Y(e.disabled) ?? !1, s = R(e.onClick), l = gt(Vc);
    if (l.trim() !== "" && !(o + " " + (r ?? "")).toLowerCase().includes(l.toLowerCase().trim()))
      return "";
    const d = ie((p) => {
      if (i)
        return wn(p);
      E('styledCommandItem callback "onClick"', s, p);
    }, [i, s]), u = Mt(e.children);
    return b`<button role="option"
        class="styled-command-item ${t}"
        disabled=${i} onClick=${d}
      >
        ${n == null ? "" : b`<span class="icon" aria-hidden="true">${n}</>`}
        ${u.length === 0 ? o : u}
        ${a == null ? "" : b`<span class="shortcut">${a}</span>`}
      </>`;
  });
}
function ry(e) {
  return H(() => {
    Tr(), zn(), e = G(e);
    const t = D(e.Class) ?? "", n = D(e.Label);
    return b`<div class="styled-command-group ${t}" role="group"
        ...${e.RestProps}
      >
        ${n == null ? "" : b`<div class="label">${n}</div>`}
        ${e.children}
      </>`;
  });
}
const Tr = /* @__PURE__ */ Z("jcl-component.styled-command-palette", `
    .jcl-component.styled-command-palette-trigger {
      display:inline-block;
      width:fit-content;
    }

  /**** restyle the hosting OverlayView in the shadcn/ui way ****/

    .jcl-overlay-view:has(.styled-command-palette) {
      border:solid 1px var(--jcl-border-color,#ebebeb);
      border-radius:calc(var(--jcl-border-radius,8px) + 4px);
      background:var(--jcl-bg-color,#ffffff);
      color:var(--jcl-fg-color,#0a0a0a);
      box-shadow:0px 10px 15px -3px rgba(0,0,0,0.1),
        0px 4px 6px -4px rgba(0,0,0,0.1);
      overflow:hidden;
    }

    .jcl-component.styled-command-palette .panel {
      display:flex; flex-flow:column nowrap;
      font-size:14px;
    }

  /**** the search input on top ****/

    .jcl-component.styled-command-palette .search {
      display:flex; align-items:center;
      gap:8px; height:44px;
      border-bottom:solid 1px var(--jcl-border-color,#ebebeb);
      padding:0px 12px;
    }

    .jcl-component.styled-command-palette .search > .search-icon {
      display:inline-block; flex-shrink:0;
      width:16px; height:16px;
      background:var(--jcl-muted-fg-color,#737373);
      opacity:0.5;
      pointer-events:none;
      -webkit-mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='11' cy='11' r='8'/%3E%3Cpath d='m21 21-4.3-4.3'/%3E%3C/svg%3E");
              mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='11' cy='11' r='8'/%3E%3Cpath d='m21 21-4.3-4.3'/%3E%3C/svg%3E");
      ${$t}
    }

    .jcl-component.styled-command-palette .search > input {
      flex:1 1 auto;
      border:none; background:transparent;
      color:inherit;
      font:inherit; font-size:14px;
      outline:none;
    }
    .jcl-component.styled-command-palette .search > input::placeholder {
      color:var(--jcl-muted-fg-color,#737373);
    }

  /**** the scrollable list of groups and items ****/

    .jcl-component.styled-command-palette .list {
      max-height:300px; overflow-y:auto; overscroll-behavior-y:contain;
      padding:4px;
    }

    .styled-command-group > .label {
      padding:6px 8px;
      font-size:12px; font-weight:500;
      color:var(--jcl-muted-fg-color,#737373);
      user-select:none;
    }

    .styled-command-group:not(:has(.styled-command-item)) {
      display:none;
    }

  /**** the "empty" message appears when nothing matches at all ****/

    .jcl-component.styled-command-palette .empty {
      display:none;
    }

    .jcl-component.styled-command-palette
      .list:not(:has(.styled-command-item)) + .empty {
      display:flex; align-items:center; justify-content:center;
      padding:24px 12px;
      font-size:14px;
      color:var(--jcl-muted-fg-color,#737373);
    }
  `);
function ay(e) {
  return H(() => {
    iy(), e = G(e);
    const t = D(e.Class) ?? "", n = re(e.Style), o = D(e.Title), r = re(e.Description), a = z(e.Variant, (d) => he(d, ["default", "info", "success", "warning", "destructive"])) ?? "default", i = Y(e.closable) ?? !0, s = gt(Nl), l = ie((d) => {
      Le(d), s?.closeToast(s.Name);
    }, [s]);
    return b`<div class="jcl-component styled-toast variant-${a} ${t}"
        style=${n} ...${e.RestProps}
      >
        ${a === "default" ? "" : b`<span class="icon"/>`}
        <div class="body">
          ${o == null ? "" : b`<div class="title">${o}</div>`}
          ${r == null ? "" : b`<div class="description">${r}</div>`}
          ${e.children}
        </>
        ${i && b`<button class="close" aria-label="close"
          onClick=${l}
        />`}
      </>`;
  });
}
const iy = /* @__PURE__ */ Z("jcl-component.styled-toast", `
    .jcl-component.styled-toast {
      display:flex; align-items:flex-start;
      gap:8px; width:100%;
      border:solid 1px var(--jcl-border-color,#ebebeb);
      border-radius:var(--jcl-border-radius,8px);
      background:var(--jcl-bg-color,#ffffff);
      color:var(--jcl-fg-color,#0a0a0a);
      padding:12px 14px;
      box-shadow:0px 10px 15px -3px rgba(0,0,0,0.1),
        0px 4px 6px -4px rgba(0,0,0,0.1);
      font-size:14px;
    }

    .jcl-component.styled-toast > .body {
      flex:1 1 auto; min-width:0px;
    }

    .jcl-component.styled-toast .title {
      font-weight:500;
    }

    .jcl-component.styled-toast .description {
      margin-top:2px;
      font-size:13px;
      color:var(--jcl-muted-fg-color,#737373);
    }

  /**** the variant icons, drawn as CSS masks in their state colors ****/

    .jcl-component.styled-toast > .icon {
      display:inline-block; flex-shrink:0;
      width:16px; height:16px; margin-top:1px;
      pointer-events:none;
      ${$t}
    }

    .jcl-component.styled-toast.variant-info > .icon {
      background:var(--jcl-primary-bg-color,#0075ff);
      -webkit-mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='12' cy='12' r='10'/%3E%3Cpath d='M12 16v-4'/%3E%3Cpath d='M12 8h.01'/%3E%3C/svg%3E");
              mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='12' cy='12' r='10'/%3E%3Cpath d='M12 16v-4'/%3E%3Cpath d='M12 8h.01'/%3E%3C/svg%3E");
    }

    .jcl-component.styled-toast.variant-success > .icon {
      background:var(--jcl-success-bg-color,#00a63e);
      -webkit-mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='12' cy='12' r='10'/%3E%3Cpath d='m9 12 2 2 4-4'/%3E%3C/svg%3E");
              mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='12' cy='12' r='10'/%3E%3Cpath d='m9 12 2 2 4-4'/%3E%3C/svg%3E");
    }

    .jcl-component.styled-toast.variant-warning > .icon {
      background:var(--jcl-warning-bg-color,#fd9a00);
      -webkit-mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 20h16a2 2 0 0 0 1.73-2Z'/%3E%3Cpath d='M12 9v4'/%3E%3Cpath d='M12 17h.01'/%3E%3C/svg%3E");
              mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 20h16a2 2 0 0 0 1.73-2Z'/%3E%3Cpath d='M12 9v4'/%3E%3Cpath d='M12 17h.01'/%3E%3C/svg%3E");
    }

    .jcl-component.styled-toast.variant-destructive > .icon {
      background:var(--jcl-destructive-bg-color,#e7000b);
      -webkit-mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='12' cy='12' r='10'/%3E%3Cpath d='m15 9-6 6'/%3E%3Cpath d='m9 9 6 6'/%3E%3C/svg%3E");
              mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='12' cy='12' r='10'/%3E%3Cpath d='m15 9-6 6'/%3E%3Cpath d='m9 9 6 6'/%3E%3C/svg%3E");
    }

  /**** the close button ****/

    .jcl-component.styled-toast > .close {
      display:inline-block; flex-shrink:0;
      width:20px; height:20px;
      border:none; background:var(--jcl-muted-fg-color,#737373);
      padding:0px;
      cursor:pointer; outline:none;
      transition:background-color 0.15s ease;
      -webkit-mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M18 6 6 18'/%3E%3Cpath d='m6 6 12 12'/%3E%3C/svg%3E");
              mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M18 6 6 18'/%3E%3Cpath d='m6 6 12 12'/%3E%3C/svg%3E");
      -webkit-mask-size:14px;              mask-size:14px;
      -webkit-mask-position:center center; mask-position:center center;
      -webkit-mask-repeat:no-repeat;       mask-repeat:no-repeat;
    }

    .jcl-component.styled-toast > .close:hover {
      background:var(--jcl-fg-color,#0a0a0a);
    }
  `);
function sy(e) {
  return ly(), sn("div", "styled-card", e);
}
const ly = /* @__PURE__ */ Z("jcl-component.styled-card", `
    .jcl-component.styled-card {
      display:flex; flex-flow:column nowrap;
      gap:24px;
      border:solid 1px var(--jcl-border-color,#ebebeb);
      border-radius:calc(var(--jcl-border-radius,8px) + 4px);
      background:var(--jcl-bg-color,#ffffff);
      color:var(--jcl-fg-color,#0a0a0a);
      padding:24px 0px;
      box-shadow:0px 1px 3px 0px rgba(0,0,0,0.1),
        0px 1px 2px -1px rgba(0,0,0,0.1);
    }
  `);
function cy(e) {
  return Rr(), sn("div", "styled-card-header", e);
}
function dy(e) {
  return Rr(), sn("div", "styled-card-action", e);
}
function uy(e) {
  return Rr(), sn("div", "styled-card-content", e);
}
function py(e) {
  return Rr(), sn("div", "styled-card-footer", e);
}
const Rr = /* @__PURE__ */ Z("jcl-component.styled-card-parts", `
    .jcl-component.styled-card-header {
      display:grid;
      grid-template-rows:auto auto; grid-auto-rows:min-content;
      align-items:start; gap:8px;
      padding:0px 24px;
    }

    .jcl-component.styled-card-header:has(> .styled-card-action) {
      grid-template-columns:1fr auto;
    }

    .jcl-component.styled-card-action {
      grid-column-start:2; grid-row:1 / span 2;
      align-self:start; justify-self:end;
    }

    .jcl-component.styled-card-content {
      padding:0px 24px;
    }

    .jcl-component.styled-card-footer {
      display:flex; align-items:center;
      padding:0px 24px;
    }
  `);
function fy(e) {
  return H(() => {
    Bc(), e = G(e);
    const t = D(e.Class) ?? "", n = re(e.Value), o = e.children;
    return Eo("div", `jcl-component styled-card-title ${t}`, void 0, e.RestProps, n, o);
  });
}
function hy(e) {
  return H(() => {
    Bc(), e = G(e);
    const t = D(e.Class) ?? "", n = re(e.Value), o = e.children;
    return Eo("div", `jcl-component styled-card-description ${t}`, void 0, e.RestProps, n, o);
  });
}
const Bc = /* @__PURE__ */ Z("jcl-component.styled-card-texts", `
    .jcl-component.styled-card-title {
      font-weight:600; line-height:1;
    }

    .jcl-component.styled-card-description {
      font-size:14px;
      color:var(--jcl-muted-fg-color,#737373);
    }
  `);
function gy(e) {
  return H(() => {
    my(), e = G(e);
    const t = D(e.Class) ?? "", n = re(e.Style), o = z(e.Side, (h) => he(h, ["left", "right"])) ?? "left", r = z(e.Variant, (h) => he(h, ["default", "floating", "inset"])) ?? "default";
    let a = z(e.collapsible, (h) => rn(h) || he(h, ["none", "icon", "offcanvas"])) ?? "icon";
    const i = Y(e.overlaid) ?? !1;
    let s = Y(e.collapsed);
    const l = R(e.onCollapseChange);
    switch (a) {
      // booleans remain supported, but are
      case !0:
        a = "icon";
        break;
      // mapped onto modes
      case !1:
        a = "none";
    }
    const d = a !== "none", u = dt(), p = Ot(s, !1);
    s = p.current;
    const c = ie((h) => {
      Le(h);
      const g = !p.current;
      p.current = g, u(), E(
        'styledSidebar callback "onCollapseChange"',
        l,
        g
      );
    }, [l, u]), f = `jcl-component styled-sidebar side-${o} variant-${r} ` + (d ? `collapsible collapse-${a} ` : "") + (i && d ? "overlaid " : "") + (s && d ? "collapsed " : "") + t;
    return b`<aside class="${f}" style=${n} ...${e.RestProps}>
        ${d && b`<button class="collapse-button"
          aria-label=${s ? "expand sidebar" : "collapse sidebar"}
          aria-expanded=${s ? "false" : "true"}
          onClick=${c}
        ><span class="chevron"/></>`}
        ${e.children}
      </>`;
  });
}
const my = /* @__PURE__ */ Z("jcl-component.styled-sidebar", `
    .jcl-component.styled-sidebar {
      display:flex; flex-flow:column nowrap; flex-shrink:0;
      position:relative;               /* anchors the collapse button */
      width:256px; height:100%; min-height:0px;
      background:color-mix(       /* shadcn's slightly muted "sidebar" color */
        in srgb, var(--jcl-muted-bg-color,#f5f5f5) 50%, var(--jcl-bg-color,#ffffff)
      );
      color:var(--jcl-fg-color,#0a0a0a);
      transition:width 0.2s ease, margin 0.2s ease;
    }

    .jcl-component.styled-sidebar.side-left {
      border-right:solid 1px var(--jcl-border-color,#ebebeb);
    }

    .jcl-component.styled-sidebar.side-right {
      border-left:solid 1px var(--jcl-border-color,#ebebeb);
    }

  /**** the collapse button (an arrow, pointing outwards when collapsed) ****/

    .jcl-component.styled-sidebar > .collapse-button {
      display:inline-flex; align-items:center; justify-content:center;
      position:absolute; top:10px; right:8px; z-index:1;
      width:28px; height:28px;
      border:none; border-radius:var(--jcl-border-radius,8px);
      background:transparent;
      color:var(--jcl-muted-fg-color,#737373);
      cursor:pointer; outline:none;
      transition:background-color 0.15s ease, color 0.15s ease;
    }
    .jcl-component.styled-sidebar > .collapse-button:hover {
      background:var(--jcl-accent-bg-color,#f7f7f7);
      color:var(--jcl-accent-fg-color,#171717);
    }
    .jcl-component.styled-sidebar > .collapse-button:focus-visible {
      box-shadow:0px 0px 0px 2px color-mix(
        in srgb, var(--jcl-ring-color,#0075ff) 50%, transparent
      );
    }

    .jcl-component.styled-sidebar > .collapse-button > .chevron {
      display:inline-block;
      width:16px; height:16px;
      background:currentColor;
      pointer-events:none;
      transition:transform 0.2s ease;
      ${Da}
      ${$t}
    }

    .jcl-component.styled-sidebar.collapsed > .collapse-button > .chevron {
      transform:rotate(180deg);
    }

  /**** on right-hand sidebars, button and arrow are mirrored ****/

    .jcl-component.styled-sidebar.side-right > .collapse-button {
      left:8px; right:auto;
    }

    .jcl-component.styled-sidebar.side-right > .collapse-button > .chevron {
      transform:rotate(180deg);
    }

    .jcl-component.styled-sidebar.side-right.collapsed > .collapse-button > .chevron {
      transform:rotate(0deg);
    }

  /**** the header content must leave some room for the button ****/

    .jcl-component.styled-sidebar.collapsible > .styled-sidebar-header {
      padding-right:40px;
    }

    .jcl-component.styled-sidebar.collapsible.side-right > .styled-sidebar-header {
      padding-right:8px; padding-left:40px;
    }

  /**** "icon" collapse: only item icons (and the button) remain ****/

    .jcl-component.styled-sidebar.collapse-icon.collapsed {
      width:56px;
    }

    .jcl-component.styled-sidebar.collapse-icon.collapsed > .collapse-button {
      right:14px;
    }

    .jcl-component.styled-sidebar.side-right.collapse-icon.collapsed > .collapse-button {
      left:14px; right:auto;
    }

    .jcl-component.styled-sidebar.collapse-icon.collapsed > .styled-sidebar-header,
    .jcl-component.styled-sidebar.collapse-icon.collapsed > .styled-sidebar-footer,
    .jcl-component.styled-sidebar.collapse-icon.collapsed .styled-sidebar-group > .label {
      display:none;
    }

    .jcl-component.styled-sidebar.collapse-icon.collapsed > .styled-sidebar-content {
      margin-top:44px;              /* keeps clear of the collapse button */
    }

  /**** "offcanvas" collapse: the whole sidebar disappears, only a small ****/
  /**** expand button remains, sticking into the adjacent pane           ****/

    .jcl-component.styled-sidebar.collapse-offcanvas.collapsed {
      width:0px;
      border:none; overflow:visible;
    }

    .jcl-component.styled-sidebar.collapse-offcanvas.collapsed > .styled-sidebar-header,
    .jcl-component.styled-sidebar.collapse-offcanvas.collapsed > .styled-sidebar-content,
    .jcl-component.styled-sidebar.collapse-offcanvas.collapsed > .styled-sidebar-footer {
      display:none;
    }

    .jcl-component.styled-sidebar.collapse-offcanvas.collapsed > .collapse-button {
      left:4px; right:auto;
      background:var(--jcl-bg-color,#ffffff);
      border:solid 1px var(--jcl-border-color,#ebebeb);
      box-shadow:0px 1px 2px rgba(0,0,0,0.08);
    }
    .jcl-component.styled-sidebar.collapse-offcanvas.collapsed > .collapse-button:hover {
      background:var(--jcl-accent-bg-color,#f7f7f7);
    }

    .jcl-component.styled-sidebar.side-right.collapse-offcanvas.collapsed > .collapse-button {
      left:auto; right:4px;
    }

  /**** "floating" variant: an inset, rounded and shadowed box ****/

    .jcl-component.styled-sidebar.variant-floating {
      margin:8px; height:calc(100% - 16px);
      border:solid 1px var(--jcl-border-color,#ebebeb);
      border-radius:var(--jcl-border-radius,8px);
      box-shadow:0px 2px 8px rgba(0,0,0,0.08);
    }

    .jcl-component.styled-sidebar.variant-floating.collapse-offcanvas.collapsed {
      margin-left:0px; margin-right:0px;
      border:none; box-shadow:none;
    }

  /**** "inset" variant: the sidebar blends into its surroundings while ****/
  /**** the adjacent main pane becomes an inset card                    ****/

    .jcl-component.styled-sidebar.variant-inset {
      background:transparent;
      border:none;
    }

    .jcl-component.styled-sidebar.variant-inset.side-left + *,
    *:has(+ .jcl-component.styled-sidebar.variant-inset.side-right) {
      margin:8px;
      background:var(--jcl-bg-color,#ffffff);
      border-radius:var(--jcl-border-radius,8px);
      box-shadow:0px 1px 4px rgba(0,0,0,0.08);
      overflow:auto;
    }

  /**** "overlaid" sidebars keep their collapsed footprint in the layout ****/
  /**** and let the expanded version overlay the adjacent pane - this is ****/
  /**** achieved with negative margins which compensate for the          ****/
  /**** difference between expanded and collapsed width, so the adjacent ****/
  /**** pane never moves and the width transition still works            ****/

    .jcl-component.styled-sidebar.overlaid {
      z-index:10;
    }

    .jcl-component.styled-sidebar.overlaid:not(.collapsed) {
      box-shadow:0px 4px 12px rgba(0,0,0,0.12);
    }

  /**** footprints: 'icon' keeps its 56px rail (256px - 56px = 200px), ****/
  /**** 'offcanvas' keeps nothing at all (256px)                       ****/

    .jcl-component.styled-sidebar.overlaid.collapse-icon.side-left:not(.collapsed) {
      margin-right:-200px;
    }
    .jcl-component.styled-sidebar.overlaid.collapse-icon.side-right:not(.collapsed) {
      margin-left:-200px;
    }

    .jcl-component.styled-sidebar.overlaid.collapse-offcanvas.side-left:not(.collapsed) {
      margin-right:-256px;
    }
    .jcl-component.styled-sidebar.overlaid.collapse-offcanvas.side-right:not(.collapsed) {
      margin-left:-256px;
    }

  /**** floating sidebars carry 8px margins: their icon rail footprint ****/
  /**** is 72px (8px + 256px - 72px = 192px), their offcanvas one is   ****/
  /**** 0px (8px + 256px = 264px)                                      ****/

    .jcl-component.styled-sidebar.overlaid.variant-floating.collapse-icon.side-left:not(.collapsed) {
      margin-right:-192px;
    }
    .jcl-component.styled-sidebar.overlaid.variant-floating.collapse-icon.side-right:not(.collapsed) {
      margin-left:-192px;
    }

    .jcl-component.styled-sidebar.overlaid.variant-floating.collapse-offcanvas.side-left:not(.collapsed) {
      margin-right:-264px;
    }
    .jcl-component.styled-sidebar.overlaid.variant-floating.collapse-offcanvas.side-right:not(.collapsed) {
      margin-left:-264px;
    }

  /**** an expanded, overlaid "inset" sidebar floats above the inset ****/
  /**** card and therefore needs a surface of its own                ****/

    .jcl-component.styled-sidebar.overlaid.variant-inset:not(.collapsed) {
      background:color-mix(
        in srgb, var(--jcl-muted-bg-color,#f5f5f5) 50%, var(--jcl-bg-color,#ffffff)
      );
    }
  `);
function by(e) {
  return li(), sn("div", "styled-sidebar-header", e);
}
function yy(e) {
  return li(), sn("div", "styled-sidebar-content", e);
}
function xy(e) {
  return li(), sn("div", "styled-sidebar-footer", e);
}
const li = /* @__PURE__ */ Z("jcl-component.styled-sidebar-sections", `
    .jcl-component.styled-sidebar-header {
      display:flex; flex-flow:column nowrap; flex-shrink:0;
      gap:8px; padding:8px;
    }

    .jcl-component.styled-sidebar-content {
      display:flex; flex-flow:column nowrap;
      flex:1 1 auto; min-height:0px;
      gap:8px; padding:8px;
      overflow-y:auto; overscroll-behavior-y:contain;
    }

    .jcl-component.styled-sidebar-footer {
      display:flex; flex-flow:column nowrap; flex-shrink:0;
      gap:8px; padding:8px;
    }
  `);
function vy(e) {
  return H(() => {
    ci(), e = G(e);
    const t = D(e.Class) ?? "", n = D(e.Icon), o = re(e.Value), r = Y(e.active) ?? !1, a = Y(e.disabled) ?? !1, i = R(e.onClick), s = e.children, l = ie((u) => {
      if (a)
        return wn(u);
      E('styledSidebarItem callback "onClick"', i, u);
    }, [a, i]), d = "jcl-component styled-sidebar-item " + (r ? "active " : "") + t;
    return b`<button class="${d}" disabled=${a}
        aria-current=${r ? "true" : void 0}
        onClick=${l} ...${e.RestProps}
      >
        ${n == null ? "" : b`<span class="icon" aria-hidden="true">${n}</>`}
        ${o == null ? b`<span class="label">${s}</>` : b`<span class="label" dangerouslySetInnerHTML=${{ __html: o }}/>`}
      </>`;
  });
}
function wy(e) {
  return H(() => {
    ci(), e = G(e);
    const t = D(e.Class) ?? "", n = re(e.Style);
    return b`<div class="jcl-component styled-sidebar-separator ${t}"
        style=${n} role="separator" aria-hidden="true" ...${e.RestProps}
      />`;
  });
}
function ky(e) {
  return H(() => {
    ci(), e = G(e);
    const t = D(e.Class) ?? "", n = re(e.Style), o = D(e.Label);
    return b`<div class="jcl-component styled-sidebar-group ${t}"
        style=${n} ...${e.RestProps}
      >
        ${o == null ? "" : b`<div class="label">${o}</div>`}
        ${e.children}
      </>`;
  });
}
const ci = /* @__PURE__ */ Z("jcl-component.styled-sidebar-parts", `
    .jcl-component.styled-sidebar-item {
      display:flex; align-items:center; flex-shrink:0;
      gap:8px; width:100%; height:32px;
      border:none; border-radius:var(--jcl-border-radius,8px);
      background:transparent;
      color:inherit;
      padding:0px 8px;
      font:inherit; font-size:14px; text-align:left;
      white-space:nowrap; overflow:hidden;
      cursor:pointer; user-select:none;
      outline:none;
      transition:background-color 0.15s ease, color 0.15s ease;
    }

    .jcl-component.styled-sidebar-item > .icon {
      display:inline-flex; align-items:center; justify-content:center;
      flex-shrink:0; width:18px;
    }

    .jcl-component.styled-sidebar-item > .label {
      flex:1 1 auto; min-width:0px;
      overflow:hidden; text-overflow:ellipsis;
    }

    .jcl-component.styled-sidebar-item:hover,
    .jcl-component.styled-sidebar-item.active {
      background:var(--jcl-accent-bg-color,#f7f7f7);
      color:var(--jcl-accent-fg-color,#171717);
    }

    .jcl-component.styled-sidebar-item.active {
      font-weight:500;
    }

    .jcl-component.styled-sidebar-item:focus-visible {
      box-shadow:0px 0px 0px 2px color-mix(
        in srgb, var(--jcl-ring-color,#0075ff) 50%, transparent
      );
    }

  /**** "disabled" also overrides JCL's general "[disabled]" opacity rule ****/

    .jcl-component.styled-sidebar-item:disabled {
      pointer-events:none; cursor:not-allowed;
      opacity:0.5;
    }

  /**** in a collapsed sidebar, items shrink to their (centered) icons ****/

    .jcl-component.styled-sidebar.collapsed .jcl-component.styled-sidebar-item {
      justify-content:center;
      padding:0px;
    }

    .jcl-component.styled-sidebar.collapsed .jcl-component.styled-sidebar-item > .label {
      display:none;
    }

    .jcl-component.styled-sidebar-separator {
      flex-shrink:0;
      height:1px; margin:0px 8px;
      background:var(--jcl-border-color,#ebebeb);
    }

    .jcl-component.styled-sidebar-group {
      display:flex; flex-flow:column nowrap; flex-shrink:0;
      min-width:0px; width:100%;
    }

    .jcl-component.styled-sidebar-group > .label {
      display:flex; align-items:center; flex-shrink:0;
      height:32px; padding:0px 8px;
      font-size:12px; font-weight:500;
      color:var(--jcl-muted-fg-color,#737373);
      user-select:none;
    }
  `);
function Cy(e) {
  return H(() => {
    $y(), e = G(e);
    const t = D(e.Class) ?? "", n = re(e.Style), o = D(e.Label), r = re(e.Description), a = re(e.Error), i = D(e.for), s = z(e.Orientation, (p) => he(p, ["vertical", "horizontal"])) ?? "vertical", l = Y(e.required) ?? !1, d = Y(e.disabled) ?? !1, u = a != null && a.trim() !== "";
    return b`<div role="group"
        class="jcl-component styled-field ${s === "horizontal" ? "horizontal" : ""} ${u ? "invalid" : ""} ${d ? "disabled" : ""} ${t}"
        style=${n} ...${e.RestProps}
      >
        ${o == null ? "" : b`<label for=${i}
          class=${l ? "required" : void 0}
        >${o}</label>`}
        ${e.children}
        ${r == null ? "" : b`<p class="description">${r}</p>`}
        ${u ? b`<div class="error" role="alert">${a}</div>` : ""}
      </>`;
  });
}
const $y = /* @__PURE__ */ Z("jcl-component.styled-field", `
    .jcl-component.styled-field {
      display:flex; flex-flow:column nowrap;
      gap:12px; width:100%;
    }

    .jcl-component.styled-field.horizontal {
      flex-flow:row nowrap; align-items:center;
    }
    .jcl-component.styled-field.horizontal > label {
      flex:1 1 auto;
    }

    .jcl-component.styled-field > label {
      width:fit-content;
      font-size:14px; font-weight:500; line-height:1.375;
      user-select:none;
    }

  /**** "required" labels are marked with an asterisk ****/

    .jcl-component.styled-field > label.required::after {
      content:' *';
      color:var(--jcl-destructive-bg-color,#e7000b);
    }

    .jcl-component.styled-field > .description {
      margin:0px;
      font-size:14px; font-weight:400; line-height:1.5;
      color:var(--jcl-muted-fg-color,#737373);
    }

    .jcl-component.styled-field > .error {
      font-size:14px; font-weight:400;
      color:var(--jcl-destructive-bg-color,#e7000b);
    }

  /**** like shadcn, "disabled" just dims the label - the general JCL   ****/
  /**** ".disabled" opacity rule must not dim the whole field, though   ****/

    .jcl-component.styled-field.disabled {
      opacity:1;
    }

    .jcl-component.styled-field.disabled > label {
      opacity:0.5;
    }
  `);
function jy(e) {
  return H(() => {
    Wc(), e = G(e);
    const t = D(e.Class) ?? "", n = re(e.Style);
    return b`<div role="group"
        class="jcl-component styled-input-group ${t}"
        style=${n} ...${e.RestProps}
      >
        ${e.children}
      </>`;
  });
}
function Iy(e) {
  return H(() => {
    Wc(), e = G(e);
    const t = D(e.Class) ?? "", n = re(e.Style), o = z(e.align ?? e.Alignment, (a) => he(a, ["start", "end", "top", "bottom"])) ?? "start", r = ie((a) => {
      if (a.target.closest("button") != null)
        return;
      a.currentTarget.parentElement?.querySelector("input, textarea, select")?.focus();
    }, []);
    return b`<div role="group"
        class="jcl-component styled-input-group-addon align-${o} ${t}"
        style=${n} onClick=${r} ...${e.RestProps}
      >
        ${e.children}
      </>`;
  });
}
const Wc = /* @__PURE__ */ Z("jcl-component.styled-input-group", `
    .jcl-component.styled-input-group {
      display:flex; flex-flow:row nowrap; align-items:center;
      width:100%; min-width:0px; height:36px;
      border:solid 1px var(--jcl-border-color,#ebebeb);
      border-radius:var(--jcl-border-radius,8px);
      background:color-mix(
        in srgb, var(--jcl-primary-bg-color,#0075ff) 12%, transparent
      );
      box-shadow:0px 1px 2px 0px rgba(0,0,0,0.05);
      overflow:hidden;            /* clips the addon backgrounds at corners */
      transition:border-color 0.15s ease, box-shadow 0.15s ease;
    }

  /**** block addons (and text areas) switch to a column layout ****/

    .jcl-component.styled-input-group:has(> .align-top),
    .jcl-component.styled-input-group:has(> .align-bottom),
    .jcl-component.styled-input-group:has(> .styled-text-input) {
      height:auto;
      flex-flow:column nowrap; align-items:stretch;
    }

  /**** the inner control loses its own frame, tint and focus ring ****/

    .jcl-component.styled-input-group .styled-input {
      flex:1 1 auto;
      border:none; border-radius:0px;
      background:transparent;
      box-shadow:none;
    }

    .jcl-component.styled-input-group .styled-input:focus-visible {
      border:none;
      box-shadow:none;
    }

  /**** ... instead, the group frame mirrors focus and invalidity ****/

    .jcl-component.styled-input-group:has(.styled-input:focus-visible) {
      border-color:var(--jcl-ring-color,#0075ff);
      box-shadow:0px 1px 2px 0px rgba(0,0,0,0.05),
        0px 0px 0px 3px color-mix(
          in srgb, var(--jcl-ring-color,#0075ff) 20%, transparent
        );
    }

    .jcl-component.styled-input-group:has(.styled-input:invalid),
    .jcl-component.styled-input-group:has(.styled-input.invalid) {
      border-color:var(--jcl-destructive-bg-color,#e7000b);
      box-shadow:0px 1px 2px 0px rgba(0,0,0,0.05),
        0px 0px 0px 3px color-mix(
          in srgb, var(--jcl-destructive-bg-color,#e7000b) 20%, transparent
        );
    }

    .jcl-component.styled-input-group:has(.styled-input:disabled) {
      background:var(--jcl-muted-bg-color,#f5f5f5);
    }
    .jcl-component.styled-input-group:has(.styled-input:disabled)
      > .styled-input-group-addon {
      opacity:0.5;
    }

  /**** the addons themselves sit on a muted background ****/

    .jcl-component.styled-input-group-addon {
      display:flex; align-items:center; justify-content:center;
      align-self:stretch;
      gap:8px;
      background:var(--jcl-muted-bg-color,#f5f5f5);
      padding:6px 12px;
      font-size:14px; font-weight:500;
      color:var(--jcl-muted-fg-color,#737373);
      cursor:text; user-select:none;
    }

    .jcl-component.styled-input-group-addon.align-start {
      order:-9999;
      border-right:solid 1px var(--jcl-border-color,#ebebeb);
    }
    .jcl-component.styled-input-group:has(> .align-start) .styled-input {
      padding-left:8px;
    }

    .jcl-component.styled-input-group-addon.align-end {
      order:9999;
      border-left:solid 1px var(--jcl-border-color,#ebebeb);
    }
    .jcl-component.styled-input-group:has(> .align-end) .styled-input {
      padding-right:8px;
    }

    .jcl-component.styled-input-group-addon.align-top {
      order:-9999;
      width:100%; justify-content:flex-start;
      border-bottom:solid 1px var(--jcl-border-color,#ebebeb);
      padding:8px 12px;
    }

    .jcl-component.styled-input-group-addon.align-bottom {
      order:9999;
      width:100%; justify-content:flex-start;
      border-top:solid 1px var(--jcl-border-color,#ebebeb);
      padding:8px 12px;
    }
  `);
function _y(e) {
  return H(() => {
    Sy(), e = G(e);
    const t = D(e.Class) ?? "", n = re(e.Style);
    let o = z(e.Value, (f) => rn(f) || Je(f));
    const r = z(e.Size, (f) => he(f, ["small", "normal", "large"])) ?? "normal", a = Y(e.disabled), i = R(e.onValueInput), s = R(e.onClick);
    o = o ?? yt;
    const { actualValue: l, actualDisabling: d } = it(o, a), u = l == !0, p = ie((f) => {
      if (Le(f, d), d == !0)
        return;
      E('styledSwitch callback "onClick"', s, f);
      const h = f.target.checked;
      E(
        'styledSwitch callback "onValueInput"',
        i,
        h,
        f
      );
    }, [d, s, i]), c = ut(r);
    return b`<div class="jcl-component styled-switch ${c} ${d ? "disabled" : ""} ${t}"
        style=${n}
      >
        <input type="checkbox" role="switch"
          checked=${u} disabled=${d}
          onClick=${p} ...${e.RestProps}
        />
      </>`;
  });
}
const Sy = /* @__PURE__ */ Z("jcl-component.styled-switch", `
    .jcl-component.styled-switch {
      height:36px;
      min-width:36px; min-height:20px;
    }

  /**** "disabled" also overrides JCL's general ".disabled" opacity rule ****/

    .jcl-component.styled-switch.disabled {
      opacity:0.5;
    }

    .jcl-component.styled-switch > input {
      -webkit-appearance:none; appearance:none;
      position:absolute; left:50%; top:50%;
      transform:translate(-50%,-50%);
      margin:0px; padding:0px;
      width:32px; height:18px;
      border:solid 1px transparent;
      border-radius:9999px;
      background:var(--jcl-input-border-color,var(--jcl-border-color,#ebebeb));
      box-shadow:0px 1px 2px 0px rgba(0,0,0,0.05);
      outline:none;
      cursor:pointer;
      transition:background-color 0.15s ease, box-shadow 0.15s ease;
    }

    .jcl-component.styled-switch > input:focus-visible {
      border-color:var(--jcl-ring-color,#0075ff);
      box-shadow:0px 1px 2px 0px rgba(0,0,0,0.05),
        0px 0px 0px 3px color-mix(
          in srgb, var(--jcl-ring-color,#0075ff) 20%, transparent
        );
    }

    .jcl-component.styled-switch > input:checked {
      background:var(--jcl-primary-bg-color,#0075ff);
    }

    .jcl-component.styled-switch > input:disabled {
      pointer-events:none; cursor:not-allowed;
    }

  /**** the sliding thumb ****/

    .jcl-component.styled-switch > input::after {
      content:''; display:block;
      position:absolute; left:2px; top:50%;
      transform:translateY(-50%);
      width:14px; height:14px;
      border-radius:50%;
      background:var(--jcl-bg-color,#ffffff);
      transition:left 0.15s ease;
    }

    .jcl-component.styled-switch > input:checked::after {
      left:calc(100% - 16px);
    }

  /**** size variants ****/

    .jcl-component.styled-switch.size-small > input {
      width:24px; height:14px;
    }
    .jcl-component.styled-switch.size-small > input::after {
      width:10px; height:10px;
    }
    .jcl-component.styled-switch.size-small > input:checked::after {
      left:calc(100% - 12px);
    }

    .jcl-component.styled-switch.size-large > input {
      width:40px; height:22px;
    }
    .jcl-component.styled-switch.size-large > input::after {
      width:18px; height:18px;
    }
    .jcl-component.styled-switch.size-large > input:checked::after {
      left:calc(100% - 20px);
    }
  `);
function Hc(e) {
  return H(() => {
    Gc(), e = G(e);
    const t = D(e.Class) ?? "", n = re(e.Style), o = D(e.Value), r = z(e.Options, (u) => Ie(u, Ne)) ?? Me("Options"), a = z(e.Size, (u) => he(u, ["small", "normal", "large"])) ?? "normal", i = Y(e.disabled) ?? !1, s = R(e.onValueInput), l = ie((u, p) => {
      Le(p), E(
        'styledMultiSwitch callback "onValueInput"',
        s,
        u,
        p
      );
    }, [s]), d = ut(a);
    return b`<div role="radiogroup"
        class="jcl-component styled-multi-switch ${d} ${t}"
        style=${n} ...${e.RestProps}
      >
        ${r.map((u) => {
      const {
        Value: p,
        Label: c,
        disabled: f
      } = At(u), h = he(c, Ya);
      return b`<button type="button" role="radio"
            class="option ${p === o ? "selected" : ""}"
            aria-checked=${p === o} aria-label=${p}
            disabled=${i || f}
            onClick=${(g) => l(p, g)}
          >${h ? b`<span class="fa ${c}"/>` : b`<span>${c}</span>`}</>`;
    })}
      </>`;
  });
}
function Dy(e) {
  return H(() => {
    Gc(), e = G(e);
    const t = D(e.Class) ?? "", n = re(e.Style), o = z(e.Size, (i) => he(i, ["small", "normal", "large"])) ?? "normal", { Theme: r, setTheme: a } = Sr();
    return b`<${Hc}
        Class=${t} Style=${n} Size=${o}
        Options=${["auto:fa-adjust", "light:fa-sun-o", "dark:fa-moon-o"]}
        Value=${r}
        onValueInput=${(i) => a(i)}
        ...${e.RestProps}
      />`;
  });
}
const Gc = /* @__PURE__ */ Z("jcl-component.styled-multi-switch", `
    .jcl-component.styled-multi-switch {
      display:inline-flex; align-items:center;
      gap:2px; width:fit-content;
      border:solid 1px var(--jcl-border-color,#ebebeb);
      border-radius:9999px;
      background:var(--jcl-muted-bg-color,#f5f5f5);
      padding:2px;
    }

    .jcl-component.styled-multi-switch > .option {
      display:inline-flex; align-items:center; justify-content:center;
      min-width:28px; height:28px;
      border:none; border-radius:9999px;
      background:transparent;
      color:var(--jcl-muted-fg-color,#737373);
      padding:0px 8px;
      font:inherit; font-size:14px;
      cursor:pointer; user-select:none;
      outline:none;
      transition:background-color 0.15s ease, color 0.15s ease,
        box-shadow 0.15s ease;
    }

    .jcl-component.styled-multi-switch > .option > .fa {
      font-size:14px; line-height:1;
      pointer-events:none;
    }

    .jcl-component.styled-multi-switch > .option:hover {
      color:var(--jcl-fg-color,#0a0a0a);
    }

  /**** the selected option becomes a "pill" on the background color ****/

    .jcl-component.styled-multi-switch > .option.selected {
      background:var(--jcl-bg-color,#ffffff);
      color:var(--jcl-fg-color,#0a0a0a);
      box-shadow:0px 1px 2px 0px rgba(0,0,0,0.05);
    }

    .jcl-component.styled-multi-switch > .option:focus-visible {
      box-shadow:0px 0px 0px 2px color-mix(
        in srgb, var(--jcl-ring-color,#0075ff) 50%, transparent
      );
    }

  /**** "disabled" also overrides JCL's general "[disabled]" opacity rule ****/

    .jcl-component.styled-multi-switch > .option:disabled {
      pointer-events:none; cursor:not-allowed;
      opacity:0.5;
    }

  /**** size variants ****/

    .jcl-component.styled-multi-switch.size-small > .option {
      min-width:24px; height:24px; padding:0px 6px; font-size:12px;
    }
    .jcl-component.styled-multi-switch.size-small > .option > .fa {
      font-size:12px;
    }

    .jcl-component.styled-multi-switch.size-large > .option {
      min-width:32px; height:32px; padding:0px 10px; font-size:16px;
    }
    .jcl-component.styled-multi-switch.size-large > .option > .fa {
      font-size:16px;
    }
  `);
function Ly(e) {
  return H(() => {
    My(), e = G(e);
    const t = D(e.Class) ?? "", n = re(e.Style), o = D(e.Value), r = z(e.Options, (u) => Ie(u, Ne)) ?? Me("Options"), a = z(e.Orientation, (u) => he(u, ["vertical", "horizontal"])) ?? "vertical", i = z(e.Size, (u) => he(u, ["small", "normal", "large"])) ?? "normal", s = Y(e.disabled) ?? !1, l = R(e.onValueInput), d = ie((u, p) => {
      E(
        'styledRadioGroup callback "onValueInput"',
        l,
        u,
        p
      );
    }, [l]);
    return b`<div role="radiogroup"
        class="jcl-component styled-radio-group ${a === "horizontal" ? "horizontal" : ""} ${t}"
        style=${n} ...${e.RestProps}
      >
        ${r.map((u) => {
      const {
        Value: p,
        Label: c,
        disabled: f
      } = At(u);
      return b`<label class="option">
            <${Oc} Size=${i}
              value=${p === o} disabled=${s || f}
              onClick=${(h) => d(p, h)}
            />
            <span>${c}</span>
          </label>`;
    })}
      </>`;
  });
}
const My = /* @__PURE__ */ Z("jcl-component.styled-radio-group", `
    .jcl-component.styled-radio-group {
      display:flex; flex-flow:column nowrap;
      gap:12px; width:fit-content;
    }

    .jcl-component.styled-radio-group.horizontal {
      flex-flow:row wrap; align-items:center;
      gap:16px;
    }

    .jcl-component.styled-radio-group > .option {
      display:inline-flex; align-items:center;
      gap:8px; width:fit-content;
      font-size:14px; line-height:1.375;
      cursor:pointer; user-select:none;
    }

    .jcl-component.styled-radio-group > .option:has(input:disabled) {
      color:var(--jcl-muted-fg-color,#737373);
      cursor:not-allowed;
    }

  /**** the radiobutton wrappers must not blow up the line height ****/

    .jcl-component.styled-radio-group .styled-radiobutton {
      height:20px; min-width:16px;
    }
  `);
function Ay(e) {
  return H(() => {
    Ty(), Ry(), e = G(e);
    const t = D(e.Class) ?? "", n = re(e.Style), o = D(e.Value), r = z(e.Options, (P) => Ie(P, Ne)) ?? Me("Options"), a = D(e.Placeholder), i = D(e.EmptyText) ?? "no items found", s = z(e.Size, (P) => he(P, ["small", "normal", "large"])) ?? "normal", l = Y(e.disabled) ?? !1, d = R(e.onValueInput), u = r.map((P) => {
      const { Value: ue, Label: ke } = At(P);
      return { Value: ue, Label: ke };
    }), p = (P) => u.find((ue) => ue.Value === P)?.Label, [c, f] = He(!1), [h, g] = He(void 0), [y, m] = He(-1), v = U(), C = dt(), _ = h ?? p(o) ?? "", j = h == null || h.trim() === "" ? u : u.filter(
      (P) => P.Label.toLowerCase().includes(h.toLowerCase().trim())
    ), x = gt(kt), w = Fo(_r), T = x ?? w, { Theme: L, SwatchSet: $, Locale: I, Direction: M } = T, S = Ro(L, $);
    je(() => {
      if (c)
        return window.addEventListener("scroll", C, !0), window.addEventListener("resize", C), () => {
          window.removeEventListener("scroll", C, !0), window.removeEventListener("resize", C);
        };
    }, [c]);
    function F() {
      !c && !l && (f(!0), m(-1));
    }
    function N() {
      f(!1), g(void 0), m(-1);
    }
    function X(P, ue) {
      Le(ue), N(), E(
        'styledCombobox callback "onValueInput"',
        d,
        P.Value,
        ue
      );
    }
    function Q(P) {
      l || (g(P.target.value), f(!0), m(0));
    }
    function pe(P) {
      switch (!0) {
        case P.key === "ArrowDown":
          P.preventDefault(), F(), m(Math.min(y + 1, j.length - 1));
          break;
        case P.key === "ArrowUp":
          P.preventDefault(), m(Math.max(y - 1, 0));
          break;
        case P.key === "Enter":
          c && y >= 0 && y < j.length && X(j[y], P);
          break;
        case P.key === "Escape":
          N();
      }
    }
    function q() {
      const P = v.current;
      if (P == null)
        return;
      const ue = P.getBoundingClientRect(), ke = window.innerHeight - ue.bottom - 8, Ve = ue.top - 8, Ue = ke < 160 && Ve > ke, pt = Math.max(
        40,
        Math.min(240, Ue ? Ve : ke)
      ), ft = Ue ? `left:${ue.left}px; bottom:${window.innerHeight - ue.top + 4}px;` : `left:${ue.left}px; top:${ue.bottom + 4}px;`;
      return Zn(b`
          <${kt.Provider} value=${T}>
            <div class="jcl-combobox-popup" role="listbox"
              dir=${M} lang=${I}
              style="
                ${ft} width:${ue.width}px;
                max-height:${pt}px;
                ${S}
              "
            >
              ${j.length === 0 ? b`<div class="empty">${i}</div>` : j.map((te, ee) => b`<div
                    class="option ${ee === y ? "highlighted" : ""} ${te.Value === o ? "selected" : ""}"
                    role="option" aria-selected=${te.Value === o}
                    onMouseDown=${(ne) => X(te, ne)}
                    onMouseEnter=${() => m(ee)}
                  >
                    <span>${te.Label}</span>
                  </div>`)}
            </>
          </>
        `, document.body);
    }
    const J = ut(s);
    return b`<div class="jcl-component styled-combobox ${t}" style=${n}>
        <input type="text" class="jcl-component styled-input ${J}"
          role="combobox" aria-expanded=${c} aria-autocomplete="list"
          value=${_} placeholder=${a} disabled=${l}
          ref=${v}
          onClick=${F} onInput=${Q} onKeyDown=${pe}
          onBlur=${N} ...${e.RestProps}
        />
        ${c && q()}
      </>`;
  });
}
const Ty = /* @__PURE__ */ Z("jcl-component.styled-combobox", `
    .jcl-component.styled-combobox {
      display:inline-block;
    }

    .jcl-component.styled-combobox > input {
      width:100%;
      padding-right:36px;
    }

  /**** a self-drawn chevron, like in "styledDropDown" ****/

    .jcl-component.styled-combobox::after {
      content:''; display:block; position:absolute;
      right:12px; top:18px; transform:translateY(-50%);
      width:16px; height:16px;
      background:var(--jcl-muted-fg-color,#737373);
      opacity:0.5;
      pointer-events:none;
      ${Cr}
      ${$t}
    }
  `), Ry = /* @__PURE__ */ Z("jcl-combobox-popup", `
    .jcl-combobox-popup {
      box-sizing:border-box;
      display:block; position:fixed; overflow-y:auto; overscroll-behavior-y:contain;
      z-index:4000000;   /* above overlays, even those living within dialogs */
      border:solid 1px var(--jcl-border-color,#ebebeb);
      border-radius:var(--jcl-border-radius,8px);
      background:var(--jcl-bg-color,#ffffff);
      color:var(--jcl-fg-color,#0a0a0a);
      box-shadow:0px 4px 6px -1px rgba(0,0,0,0.1),
        0px 2px 4px -2px rgba(0,0,0,0.1);
      padding:4px;
    }

    .jcl-combobox-popup > .option {
      display:flex; align-items:center; gap:8px;
      padding:6px 8px;
      border-radius:calc(var(--jcl-border-radius,8px) - 4px);
      font-size:14px;
      cursor:pointer; user-select:none;
    }

    .jcl-combobox-popup > .option.highlighted {
      background:var(--jcl-accent-bg-color,#f7f7f7);
      color:var(--jcl-accent-fg-color,#171717);
    }

    .jcl-combobox-popup > .option.selected::after {
      content:''; display:block;
      width:16px; height:16px; margin-left:auto;
      background:currentColor;
      ${qp}
      ${$t}
    }

    .jcl-combobox-popup > .empty {
      padding:6px 8px;
      font-size:14px; text-align:center;
      color:var(--jcl-muted-fg-color,#737373);
    }
  `);
function Fy(e) {
  return H(() => {
    Oy(), e = G(e);
    const t = D(e.Class) ?? "", n = re(e.Style), o = D(e.Name), r = z(e.Value, zt), a = z(e.Min ?? e.Minimum, zt), i = z(e.Max ?? e.Maximum, zt), s = D(e.Placeholder) ?? "pick a date", l = Y(e.disabled) ?? !1, d = R(e.onValueInput), u = R(e.onOpenChange), p = Vt(), c = o ?? "styled-date-picker-" + p, { closeOverlay: f } = no(), h = gt(kt)?.Locale ?? "en";
    let g = "";
    if (r != null) {
      const [v, C, _] = r.split("-").map(Number);
      g = new Intl.DateTimeFormat(h, { dateStyle: "medium" }).format(new Date(v, C - 1, _));
    }
    const y = () => b`<${pi}
        Value=${r} Min=${a} Max=${i}
        onValueInput=${(v, C) => {
      f(c), E(
        'styledDatePicker callback "onValueInput"',
        d,
        v,
        C
      );
    }}
      />`, m = b`<${Fc} Variant="outline"
        Class="styled-date-picker-trigger" disabled=${l}
      >
        <span class="calendar-icon"/>
        ${r == null ? b`<span class="placeholder">${s}</span>` : b`<span>${g}</span>`}
      </>`;
    return l ? b`<span class="jcl-component styled-date-picker ${t}" style=${n}>
          ${m}
        </>` : b`<${Ec}
        Class="styled-date-picker ${t}" Style=${n}
        Name=${c} Renderer=${y} Width=${262}
        onOpenChange=${u}
      >
        ${m}
      </>`;
  });
}
const Oy = /* @__PURE__ */ Z("jcl-component.styled-date-picker", `
    .jcl-component.styled-date-picker .styled-date-picker-trigger {
      width:240px; justify-content:flex-start;
      font-weight:400;
    }

    .jcl-component.styled-date-picker .styled-date-picker-trigger .placeholder {
      color:var(--jcl-muted-fg-color,#737373);
    }

    .jcl-component.styled-date-picker .calendar-icon {
      display:inline-block; flex-shrink:0;
      width:16px; height:16px;
      background:var(--jcl-muted-fg-color,#737373);
      pointer-events:none;
      -webkit-mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M8 2v4'/%3E%3Cpath d='M16 2v4'/%3E%3Crect width='18' height='18' x='3' y='4' rx='2'/%3E%3Cpath d='M3 10h18'/%3E%3C/svg%3E");
              mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M8 2v4'/%3E%3Cpath d='M16 2v4'/%3E%3Crect width='18' height='18' x='3' y='4' rx='2'/%3E%3Cpath d='M3 10h18'/%3E%3C/svg%3E");
      ${$t}
    }

  /**** the month view needs no extra panel padding ****/

    .jcl-component.styled-popover-panel:has(.styled-month-view) {
      padding:0px;
    }
  `);
function zy(e) {
  return H(() => {
    Ny(), e = G(e);
    const t = D(e.Class) ?? "";
    let n = $e(e.activeIndex);
    const o = $e(e.GapIndex), r = z(e.Variant, (f) => he(f, ["default", "line"])) ?? "default", a = Y(e.accented) ?? !1, i = Y(e.disabled) ?? !1, s = R(e.onActivationChange), l = dt(), d = Ot(n, 0);
    n = d.current;
    const u = ie((f, h) => {
      if (i)
        return wn(h);
      d.current = f, l(), E('styledTabStrip callback "onActivationChange"', s, f);
    }, [i, s, l]), p = ie((f, h) => {
      (h.key === "Enter" || h.key === " ") && (h.preventDefault(), u(f, h));
    }, [u]), c = Mt(e.children).filter((f) => f?.type != null || typeof f == "number" || typeof f == "string" && f.trim() !== "");
    return b`<div
        class="jcl-component styled-tabstrip variant-${r} ${a ? "accented" : ""} ${i ? "disabled" : ""} ${t}"
        role="tablist" aria-disabled=${i ? "true" : void 0}
        ...${e.RestProps}
      >
        ${c.map((f, h) => {
      const g = h === o ? b`<div class="gap"/>` : "", y = h === n;
      return b`${g}<div
            class="${y ? "active" : ""} ${i ? "disabled" : ""} tab"
            role="tab" aria-selected=${y ? "true" : "false"}
            tabIndex=${i || y ? -1 : 0}
            onClick=${y ? void 0 : (m) => u(h, m)}
            onKeyDown=${y ? void 0 : (m) => p(h, m)}
          >${f}</>`;
    })}
      </>`;
  });
}
const Ny = /* @__PURE__ */ Z("jcl-component.styled-tabstrip", `
    .jcl-component.styled-tabstrip {
      display:inline-flex; flex-flow:row nowrap; align-items:center;
      width:fit-content; height:36px;
      border-radius:calc(var(--jcl-border-radius,8px) + 2px);
      background:var(--jcl-muted-bg-color,#f5f5f5);
      color:var(--jcl-muted-fg-color,#737373);
      padding:3px;
      font-size:14px; font-weight:500;
    }

    .jcl-component.styled-tabstrip.variant-line {
      border-radius:0px;
      background:transparent;
      padding:0px; gap:4px;
    }

  /**** "disabled" also overrides JCL's general ".disabled" opacity rule ****/

    .jcl-component.styled-tabstrip.disabled {
      opacity:0.5;
    }

    .jcl-component.styled-tabstrip > .gap {
      flex:1 0 auto;
    }

  /**** the tabs themselves ****/

    .jcl-component.styled-tabstrip > .tab {
      display:inline-flex; align-items:center; justify-content:center;
      position:relative; gap:6px;
      height:100%;
      border:solid 1px transparent;
      border-radius:var(--jcl-border-radius,8px);
      padding:0px 8px;
      white-space:nowrap;
      cursor:pointer; user-select:none; pointer-events:auto;
      outline:none;
      transition:background-color 0.15s ease, color 0.15s ease,
        box-shadow 0.15s ease;
    }

    .jcl-component.styled-tabstrip > .tab:hover {
      color:var(--jcl-fg-color,#0a0a0a);
    }

    .jcl-component.styled-tabstrip > .tab:focus-visible {
      box-shadow:0px 0px 0px 2px color-mix(
        in srgb, var(--jcl-ring-color,#0075ff) 50%, transparent
      );
    }

    .jcl-component.styled-tabstrip > .disabled.tab {
      pointer-events:none;
    }

  /**** 'default': the active tab is raised on the background color ****/

    .jcl-component.styled-tabstrip.variant-default > .active.tab {
      background:var(--jcl-bg-color,#ffffff);
      color:var(--jcl-fg-color,#0a0a0a);
      box-shadow:0px 1px 3px 0px rgba(0,0,0,0.1),
        0px 1px 2px -1px rgba(0,0,0,0.1);
      cursor:auto;
    }

  /**** 'line': the active tab gets an underline instead ****/

    .jcl-component.styled-tabstrip.variant-line > .tab::after {
      content:''; position:absolute;
      left:0px; right:0px; bottom:0px; height:2px;
      background:var(--jcl-fg-color,#0a0a0a);
      opacity:0;
      transition:opacity 0.15s ease;
    }

    .jcl-component.styled-tabstrip.variant-line > .active.tab {
      color:var(--jcl-fg-color,#0a0a0a);
      cursor:auto;
    }

    .jcl-component.styled-tabstrip.variant-line > .active.tab::after {
      opacity:1;
    }

  /**** "accented" renders the active tab in the primary color ****/

    .jcl-component.styled-tabstrip.accented.variant-default > .active.tab {
      background:var(--jcl-primary-bg-color,#0075ff);
      color:var(--jcl-primary-fg-color,#ffffff);
    }

    .jcl-component.styled-tabstrip.accented.variant-line > .active.tab {
      color:var(--jcl-primary-bg-color,#0075ff);
    }

    .jcl-component.styled-tabstrip.accented.variant-line > .active.tab::after {
      background:var(--jcl-primary-bg-color,#0075ff);
    }
  `);
function Ey(e) {
  return H(() => {
    Vy(), e = G(e);
    const t = D(e.Class) ?? "", n = re(e.Style), o = z(e.Items, (s) => Ie(s, Ne)) ?? Me("Items"), r = R(e.onItemClick), a = ie((s, l) => {
      Le(l), E('styledBreadcrumb callback "onItemClick"', r, s, l);
    }, [r]), i = o.length - 1;
    return b`<nav class="jcl-component styled-breadcrumb ${t}"
        style=${n} aria-label="breadcrumb" ...${e.RestProps}
      ><ol>
        ${o.map((s, l) => {
      const { Value: d, Label: u } = At(s), p = u === "..." ? b`<li class="ellipsis" role="presentation" aria-hidden="true">…</li>` : l === i ? b`<li><span role="link" aria-disabled="true" aria-current="page">${u}</span></li>` : b`<li><a href="#" onClick=${(c) => a(d, c)}>${u}</a></li>`;
      return l === 0 ? p : b`<li class="separator" role="presentation" aria-hidden="true"></li>${p}`;
    })}
      </ol></nav>`;
  });
}
const Vy = /* @__PURE__ */ Z("jcl-component.styled-breadcrumb", `
    .jcl-component.styled-breadcrumb > ol {
      display:flex; flex-flow:row wrap; align-items:center;
      gap:6px;
      margin:0px; padding:0px; list-style:none;
      font-size:14px; overflow-wrap:break-word;
      color:var(--jcl-muted-fg-color,#737373);
    }

    .jcl-component.styled-breadcrumb li {
      display:inline-flex; align-items:center; gap:6px;
    }

    .jcl-component.styled-breadcrumb a {
      color:inherit; text-decoration:none;
      cursor:pointer; outline:none;
      transition:color 0.15s ease;
    }

    .jcl-component.styled-breadcrumb a:hover {
      color:var(--jcl-fg-color,#0a0a0a);
    }

    .jcl-component.styled-breadcrumb a:focus-visible {
      border-radius:4px;
      box-shadow:0px 0px 0px 2px color-mix(
        in srgb, var(--jcl-ring-color,#0075ff) 50%, transparent
      );
    }

    .jcl-component.styled-breadcrumb [aria-current="page"] {
      color:var(--jcl-fg-color,#0a0a0a);
      font-weight:500;
    }

  /**** a chevron separator, drawn as a CSS mask ****/

    .jcl-component.styled-breadcrumb li.separator::before {
      content:''; display:block;
      width:14px; height:14px;
      background:currentColor;
      ${$r}
      ${$t}
    }
  `);
function Uc(e) {
  return H(() => {
    Ar(), By(), e = G(e);
    const t = D(e.Class) ?? "", n = re(e.Style), o = $e(e.Value) ?? 1, r = $e(e.Count) ?? Me("Count"), a = Y(e.accented) ?? !1, i = Y(e.disabled) ?? !1, s = R(e.onValueInput), l = Math.min(Math.max(1, o), r), d = a ? "default" : "outline", u = ie((c, f) => {
      Le(f), E(
        'styledPagination callback "onValueInput"',
        s,
        c,
        f
      );
    }, [s]), p = [];
    if (r <= 7)
      for (let c = 1; c <= r; c++)
        p.push(c);
    else {
      p.push(1), l > 3 && p.push("...");
      const c = Math.max(2, l - 1), f = Math.min(r - 1, l + 1);
      for (let h = c; h <= f; h++)
        p.push(h);
      l < r - 2 && p.push("..."), p.push(r);
    }
    return b`<nav role="navigation" aria-label="pagination"
        class="jcl-component styled-pagination ${t}"
        style=${n} ...${e.RestProps}
      ><ul>
        <li><button
          class="jcl-component styled-button variant-ghost page"
          aria-label="go to previous page"
          disabled=${i || l <= 1}
          onClick=${(c) => u(l - 1, c)}
        ><span class="chevron-left"/></></li>

        ${p.map((c) => c === "..." ? b`<li><span class="ellipsis" aria-hidden="true">…</span></li>` : b`<li><button
              class="jcl-component styled-button variant-${c === l ? d : "ghost"} page"
              aria-current=${c === l ? "page" : void 0}
              disabled=${i}
              onClick=${c === l ? void 0 : (f) => u(c, f)}
            >${c}</></li>`)}

        <li><button
          class="jcl-component styled-button variant-ghost page"
          aria-label="go to next page"
          disabled=${i || l >= r}
          onClick=${(c) => u(l + 1, c)}
        ><span class="chevron-right"/></></li>
      </ul></nav>`;
  });
}
const By = /* @__PURE__ */ Z("jcl-component.styled-pagination", `
    .jcl-component.styled-pagination {
      display:flex; justify-content:center;
      width:fit-content;
    }

    .jcl-component.styled-pagination > ul {
      display:flex; flex-flow:row nowrap; align-items:center;
      gap:4px;
      margin:0px; padding:0px; list-style:none;
    }

    .jcl-component.styled-pagination .page {
      width:36px; padding:0px;
    }

    .jcl-component.styled-pagination .ellipsis {
      display:flex; align-items:center; justify-content:center;
      width:36px; height:36px;
      color:var(--jcl-muted-fg-color,#737373);
      user-select:none;
    }

  /**** the chevrons for "previous" and "next", drawn as CSS masks ****/

    .jcl-component.styled-pagination .chevron-left,
    .jcl-component.styled-pagination .chevron-right {
      display:inline-block;
      width:16px; height:16px;
      background:currentColor;
      pointer-events:none;
      ${$t}
    }

    .jcl-component.styled-pagination .chevron-left {
      ${Da}
    }

    .jcl-component.styled-pagination .chevron-right {
      ${$r}
    }
  `);
function Wy(e) {
  return sn("div", "styled-accordion", e);
}
function Hy(e) {
  return H(() => {
    Gy(), e = G(e);
    const t = D(e.Class) ?? "", n = D(e.Header) ?? Me("Header");
    let o = Y(e.expanded);
    const r = Y(e.disabled) ?? !1, a = R(e.onExpansionChange), i = dt(), s = Vt(), l = s + "-fold-header", d = s + "-fold-content", u = Ot(o, !1);
    o = u.current;
    const p = ie((c) => {
      if (Le(c), r)
        return;
      const f = !u.current;
      u.current = f, i(), E('styledAccordionFold callback "onExpansionChange"', a, f);
    }, [r, a, i]);
    return b`<div
        class="jcl-component styled-accordion-fold ${r ? "disabled" : ""} ${t}"
        ...${e.RestProps}
      >
        <button class="trigger" id=${l}
          aria-expanded=${o ? "true" : "false"} aria-controls=${d}
          disabled=${r}
          onClick=${p}
        >
          <span class="title">${n}</span>
          <span class="chevron"/>
        </>
        ${o ? b`<div
          id=${d} class="content"
          role="region" aria-labelledby=${l}
        >${e.children}</>` : ""}
      </>`;
  });
}
const Gy = /* @__PURE__ */ Z("jcl-component.styled-accordion", `
    .jcl-component.styled-accordion {
      display:flex; flex-flow:column nowrap;
      width:100%;
      border:solid 1px var(--jcl-border-color,#ebebeb);
      border-radius:var(--jcl-border-radius,8px);
      overflow:hidden;
    }

    .jcl-component.styled-accordion > .styled-accordion-fold {
      border-bottom:solid 1px var(--jcl-border-color,#ebebeb);
    }
    .jcl-component.styled-accordion > .styled-accordion-fold:last-child {
      border-bottom:none;
    }

    .jcl-component.styled-accordion > .styled-accordion-fold > .trigger {
      padding:16px;
    }
    .jcl-component.styled-accordion > .styled-accordion-fold > .content {
      padding:0px 16px 16px 16px;
    }

    .jcl-component.styled-accordion-fold {
      width:100%;
    }

  /**** the global ".disabled" rule must not dim the whole fold ****/

    .jcl-component.styled-accordion-fold.disabled {
      opacity:1;
    }

  /**** the whole header row acts as the trigger ****/

    .jcl-component.styled-accordion-fold > .trigger {
      display:flex; align-items:flex-start; justify-content:space-between;
      gap:16px; width:100%;
      border:none; border-radius:var(--jcl-border-radius,8px);
      background:transparent;
      color:inherit;
      padding:16px 0px;
      font:inherit; font-size:14px; font-weight:500; text-align:left;
      cursor:pointer;
      outline:none;
      transition:box-shadow 0.15s ease;
    }

    .jcl-component.styled-accordion-fold > .trigger:hover {
      text-decoration:underline;
    }

    .jcl-component.styled-accordion-fold > .trigger:focus-visible {
      box-shadow:0px 0px 0px 3px color-mix(
        in srgb, var(--jcl-ring-color,#0075ff) 20%, transparent
      );
    }

    .jcl-component.styled-accordion-fold > .trigger:disabled {
      pointer-events:none; cursor:not-allowed;
      opacity:0.5;
    }

  /**** a chevron on the right rotates when the fold is expanded ****/

    .jcl-component.styled-accordion-fold > .trigger > .chevron {
      display:inline-block; flex-shrink:0;
      width:16px; height:16px;
      margin-top:2px;
      background:var(--jcl-muted-fg-color,#737373);
      pointer-events:none;
      transition:transform 0.2s ease;
      ${Cr}
      ${$t}
    }

    .jcl-component.styled-accordion-fold > .trigger[aria-expanded="true"] > .chevron {
      transform:rotate(180deg);
    }

    .jcl-component.styled-accordion-fold > .content {
      padding:0px 0px 16px 0px;
      font-size:14px;
    }
  `);
function Kc(e) {
  return H(() => {
    Uy(), e = G(e);
    const t = D(e.Class) ?? "", n = re(e.Style), o = D(e.Caption), r = $e(e.maxHeight), a = Y(e.striped) ?? !1, i = (r == null ? "" : "max-height:" + r + "px; ") + (n ?? "");
    return b`<div class="jcl-component styled-table-container ${t}"
        style=${i} ...${e.RestProps}
      >
        <table class="styled-table ${a ? "striped" : ""}">
          ${o == null ? "" : b`<caption>${o}</caption>`}
          ${e.children}
        </table>
      </>`;
  });
}
const Uy = /* @__PURE__ */ Z("jcl-component.styled-table", `
    .jcl-component.styled-table-container {
      position:relative;
      width:100%; overflow:auto; overscroll-behavior:contain;
    }

    .jcl-component.styled-table-container > .styled-table {
      width:100%;
      border-collapse:separate; border-spacing:0px;
      caption-side:bottom;
      font-size:14px; text-align:left;
    }

    .jcl-component.styled-table-container > .styled-table > caption {
      margin-top:16px;
      font-size:14px;
      color:var(--jcl-muted-fg-color,#737373);
    }
  `);
function di(e, t) {
  return function(o) {
    return H(() => {
      o = G(o);
      const r = D(o.Class) ?? "", a = re(o.Style);
      return b`<${e} class="${t} ${r}"
          style=${a} ...${o.RestProps}
        >${o.children}</>`;
    });
  };
}
const qc = /* @__PURE__ */ di("thead", "styled-table-header"), Xc = /* @__PURE__ */ di("tbody", "styled-table-body"), Ky = /* @__PURE__ */ di("tfoot", "styled-table-footer");
function ar(e) {
  return H(() => {
    ui(), e = G(e);
    const t = D(e.Class) ?? "", n = re(e.Style), o = Y(e.selected) ?? !1, r = R(e.onClick);
    return b`<tr class="styled-table-row ${o ? "selected" : ""} ${r == null ? "" : "clickable"} ${t}"
        style=${n} aria-selected=${o ? "true" : void 0}
        onClick=${r} ...${e.RestProps}
      >${e.children}</>`;
  });
}
function da(e) {
  return H(() => {
    ui(), e = G(e);
    const t = D(e.Class) ?? "", n = re(e.Style), o = z(e.align ?? e.Alignment, (i) => he(i, ["left", "center", "right"])), r = $e(e.Width), a = (o == null ? "" : "text-align:" + o + "; ") + (r == null ? "" : "width:" + r + "px; ") + (n ?? "");
    return b`<th class="styled-table-head ${t}"
        style=${a} ...${e.RestProps}
      >${e.children}</>`;
  });
}
function ir(e) {
  return H(() => {
    ui(), e = G(e);
    const t = D(e.Class) ?? "", n = re(e.Style), o = z(e.align ?? e.Alignment, (a) => he(a, ["left", "center", "right"])), r = (o == null ? "" : "text-align:" + o + "; ") + (n ?? "");
    return b`<td class="styled-table-cell ${t}"
        style=${r} ...${e.RestProps}
      >${e.children}</>`;
  });
}
const ui = /* @__PURE__ */ Z("jcl-component.styled-table-parts", `
    .styled-table .styled-table-head {
      height:40px; padding:0px 8px;
      border-bottom:solid 1px var(--jcl-border-color,#ebebeb);
      font-weight:500; vertical-align:middle;
      color:var(--jcl-muted-fg-color,#737373);
      position:sticky; top:0px; z-index:1;      /* sticky header */
      background:var(--jcl-muted-bg-color,#f5f5f5);
    }

    .styled-table .styled-table-cell {
      padding:8px;
      border-bottom:solid 1px var(--jcl-border-color,#ebebeb);
      vertical-align:middle;
    }

    .styled-table .styled-table-row {
      transition:background-color 0.15s ease;
    }

  /**** "striped" tables tint every other body row ****/

    .styled-table.striped .styled-table-body > .styled-table-row:nth-child(even) {
      background:color-mix(
        in srgb, var(--jcl-muted-bg-color,#f5f5f5) 50%, transparent
      );
    }

    .styled-table .styled-table-body > .styled-table-row:hover {
      background:var(--jcl-accent-bg-color,#f7f7f7);
    }

    .styled-table .styled-table-row.selected {
      background:var(--jcl-muted-bg-color,#f5f5f5);
    }

    .styled-table .styled-table-row.clickable {
      cursor:pointer;
    }

    .styled-table .styled-table-footer {
      background:color-mix(
        in srgb, var(--jcl-muted-bg-color,#f5f5f5) 50%, transparent
      );
      font-weight:500;
    }
    .styled-table .styled-table-footer .styled-table-cell {
      border-bottom:none;
      border-top:solid 1px var(--jcl-border-color,#ebebeb);
    }
  `);
function qy(e) {
  return H(() => {
    Xy(), e = G(e);
    const t = D(e.Class) ?? "", n = re(e.Style), o = z(e.Columns, (J) => Ie(J, (P) => Ne(P) || De(P))) ?? Me("Columns"), r = z(e.Data, (J) => Ie(J, De)) ?? Me("Data");
    let a = D(e.SortKey), i = z(e.SortOrder, (J) => he(J, ["ascending", "descending"]));
    const s = Y(e.selectable) ?? !1, l = Y(e.striped) ?? !1;
    let d = z(e.Selection, _o);
    const u = $e(e.PageSize);
    let p = $e(e.Page);
    const c = $e(e.maxHeight), f = D(e.EmptyText) ?? "no entries", h = Y(e.disabled) ?? !1, g = R(e.onSortChange), y = R(e.onSelectionChange), m = R(e.onPageChange), v = R(e.onRowClick), C = dt(), _ = o.map((J) => {
      if (!Ne(J))
        return J;
      const { Value: P, Label: ue } = At(J);
      return { Key: P, Label: ue };
    }), j = Ot(a), x = Ot(i, "ascending");
    a = j.current, i = x.current;
    const w = ie((J, P) => {
      Le(P), j.current === J.Key ? x.current = x.current === "ascending" ? "descending" : "ascending" : (j.current = J.Key, x.current = "ascending"), C(), E(
        'styledDataTable callback "onSortChange"',
        g,
        j.current,
        x.current
      );
    }, [g, C]), T = Ot(d, []);
    d = T.current;
    function L(J, P) {
      T.current = J, C(), E(
        'styledDataTable callback "onSelectionChange"',
        y,
        J,
        P
      );
    }
    function $(J, P) {
      L(
        d.includes(J) ? d.filter((ue) => ue !== J) : [...d, J],
        P
      );
    }
    function I(J) {
      const P = r.filter((ue) => d.includes(ue)).length;
      L(P === r.length ? [] : [...r], J);
    }
    const M = gt(kt)?.Locale ?? "en", S = (J, P) => String(J ?? "").localeCompare(String(P ?? ""), M);
    let F = [...r];
    if (a != null) {
      const P = _.find((ke) => ke.Key === a)?.Comparator ?? S, ue = i === "descending" ? -1 : 1;
      F.sort((ke, Ve) => ue * P(ke[a], Ve[a]));
    }
    const N = u == null ? 1 : Math.max(1, Math.ceil(F.length / u)), X = Ot(p, 1);
    p = Math.min(Math.max(1, X.current), N);
    const Q = ie((J, P) => {
      X.current = J, C(), E(
        'styledDataTable callback "onPageChange"',
        m,
        J,
        P
      );
    }, [m, C]);
    u != null && (F = F.slice((p - 1) * u, p * u));
    const pe = r.filter((J) => d.includes(J)).length, q = _.length + (s ? 1 : 0);
    return b`<div class="jcl-component styled-data-table ${t}" style=${n}
        ...${e.RestProps}
      >
        <${Kc} maxHeight=${c} striped=${l}>
          <${qc}>
            <${ar}>
              ${s && b`<${da} Width=${36} onClick=${Le}>
                <${ca}
                  value=${pe === 0 ? !1 : pe === r.length ? !0 : null}
                  disabled=${h} onValueInput=${(J, P) => I(P)}
                />
              </>`}
              ${_.map((J) => b`<${da}
                Align=${J.Align} Width=${J.Width}
              >${J.sortable == !0 ? b`<button class="sorter" disabled=${h}
                      onClick=${(P) => w(J, P)}
                    >
                      <span>${J.Label ?? J.Key}</span>
                      <span class="indicator ${a === J.Key ? i : ""}"/>
                    </>` : J.Label ?? J.Key}</>`)}
            </>
          </>
          <${Xc}>
            ${F.length === 0 ? b`<${ar}>
                  <${ir} Class="empty" colspan=${q}>${f}</>
                </>` : F.map((J) => b`<${ar}
                  selected=${d.includes(J)}
                  onClick=${v == null ? void 0 : (P) => E(
      'styledDataTable callback "onRowClick"',
      v,
      J,
      P
    )}
                >
                  ${s && b`<${ir} onClick=${Le}>
                    <${ca}
                      value=${d.includes(J)} disabled=${h}
                      onValueInput=${(P, ue) => $(J, ue)}
                    />
                  </>`}
                  ${_.map((P) => b`<${ir} Align=${P.Align}>
                    ${P.Renderer != null ? P.Renderer(J) : J[P.Key]}
                  </>`)}
                </>`)}
          </>
        </>
        ${u != null && N > 1 && b`<${Uc}
          Value=${p} Count=${N} disabled=${h}
          onValueInput=${Q}
        />`}
      </>`;
  });
}
const Xy = /* @__PURE__ */ Z("jcl-component.styled-data-table", `
    .jcl-component.styled-data-table {
      display:flex; flex-flow:column nowrap;
      gap:8px; width:100%;
    }

    .jcl-component.styled-data-table > .jcl-component.styled-pagination {
      align-self:center;
    }

    .jcl-component.styled-data-table .styled-table-cell.empty {
      text-align:center;
      color:var(--jcl-muted-fg-color,#737373);
    }

  /**** the checkbox wrappers must not blow up the row height ****/

    .jcl-component.styled-data-table .styled-checkbox {
      height:20px; min-width:16px;
    }

  /**** sortable column headers (with sort direction indicators) ****/

    .jcl-component.styled-data-table .sorter {
      display:inline-flex; align-items:center;
      gap:4px;
      border:none; background:transparent;
      color:inherit; padding:0px;
      font:inherit; font-weight:500;
      cursor:pointer; user-select:none;
      outline:none;
    }
    .jcl-component.styled-data-table .sorter:hover {
      color:var(--jcl-fg-color,#0a0a0a);
    }
    .jcl-component.styled-data-table .sorter:focus-visible {
      border-radius:4px;
      box-shadow:0px 0px 0px 2px color-mix(
        in srgb, var(--jcl-ring-color,#0075ff) 50%, transparent
      );
    }
    .jcl-component.styled-data-table .sorter:disabled {
      pointer-events:none; cursor:not-allowed;
      opacity:0.5;
    }

    .jcl-component.styled-data-table .sorter > .indicator {
      display:inline-block;
      width:14px; height:14px;
      background:currentColor;
      opacity:0;
      pointer-events:none;
      ${$t}
      ${Cr}
    }

    .jcl-component.styled-data-table .sorter > .indicator.ascending {
      opacity:1;
      ${Kp}
    }

    .jcl-component.styled-data-table .sorter > .indicator.descending {
      opacity:1;
    }
  `);
function pi(e) {
  return H(() => {
    Yc(), Yy(), e = G(e);
    const t = D(e.Class) ?? "", n = re(e.Style), o = z(e.Value, zt);
    let r = z(e.Month, ei);
    const a = z(e.Min ?? e.Minimum, zt), i = z(e.Max ?? e.Maximum, zt), s = Y(e.disabled) ?? !1, l = R(e.onValueInput), d = R(e.onMonthChange), u = dt(), p = (M) => M.getFullYear() + "-" + String(M.getMonth() + 1).padStart(2, "0") + "-" + String(M.getDate()).padStart(2, "0"), c = p(/* @__PURE__ */ new Date()), f = o != null ? o.slice(0, 7) : c.slice(0, 7), h = Ot(r, f);
    r = h.current;
    const [g, y] = r.split("-").map(Number), m = ie((M, S) => {
      Le(S);
      const [F, N] = h.current.split("-").map(Number), X = new Date(F, N - 1 + M, 1), Q = X.getFullYear() + "-" + String(X.getMonth() + 1).padStart(2, "0");
      h.current = Q, u(), E(
        'styledMonthView callback "onMonthChange"',
        d,
        Q
      );
    }, [d, u]), v = ie((M, S) => {
      Le(S), E(
        'styledMonthView callback "onValueInput"',
        l,
        M,
        S
      );
    }, [l]), C = gt(kt)?.Locale ?? "en";
    let _ = 1;
    try {
      const M = new Intl.Locale(C);
      _ = (M.getWeekInfo?.() ?? M.weekInfo)?.firstDay ?? 1;
    } catch {
    }
    const j = new Intl.DateTimeFormat(C, { month: "long", year: "numeric" }), x = new Intl.DateTimeFormat(C, { weekday: "short" }), w = [];
    for (let M = 0; M < 7; M++) {
      const S = (_ - 1 + M) % 7;
      w.push(
        // 2024-01-01 was a Monday
        x.format(new Date(2024, 0, 1 + S))
      );
    }
    const T = new Date(g, y - 1, 1), $ = ((T.getDay() + 6) % 7 - (_ - 1) + 7) % 7, I = [];
    for (let M = 0; M < 42; M++) {
      const S = new Date(g, y - 1, 1 - $ + M), F = p(S);
      I.push({
        ISODate: F,
        Day: S.getDate(),
        inMonth: S.getMonth() === y - 1,
        isDisabled: s || a != null && F < a || i != null && F > i
      });
    }
    return b`<div class="jcl-component styled-calendar-view styled-month-view ${t}"
        style=${n} ...${e.RestProps}
      >
        <div class="header">
          <button class="nav" aria-label="go to previous month"
            disabled=${s} onClick=${(M) => m(-1, M)}
          ><span class="chevron-left"/></>
          <div class="caption">${j.format(T)}</div>
          <button class="nav" aria-label="go to next month"
            disabled=${s} onClick=${(M) => m(1, M)}
          ><span class="chevron-right"/></>
        </>
        <div class="grid" role="grid">
          ${w.map((M) => b`<div class="weekday">${M}</div>`)}
          ${I.map((M) => b`<button
            class="day ${M.inMonth ? "" : "outside"} ${M.ISODate === o ? "selected" : ""} ${M.ISODate === c ? "today" : ""}"
            aria-selected=${M.ISODate === o ? "true" : void 0}
            disabled=${M.isDisabled}
            onClick=${(S) => v(M.ISODate, S)}
          >${M.Day}</>`)}
        </>
      </>`;
  });
}
const Yc = /* @__PURE__ */ Z("jcl-component.styled-calendar-view", `
    .jcl-component.styled-calendar-view {
      display:inline-block;
      width:fit-content;
      padding:12px;
      font-size:14px;
    }

    .jcl-component.styled-calendar-view > .header {
      display:flex; align-items:center; justify-content:space-between;
      margin-bottom:8px;
    }

    .jcl-component.styled-calendar-view > .header > .caption {
      font-weight:500;
      user-select:none;
    }

    .jcl-component.styled-calendar-view > .header > .nav {
      display:inline-flex; align-items:center; justify-content:center;
      width:28px; height:28px;
      border:none; border-radius:var(--jcl-border-radius,8px);
      background:transparent;
      color:var(--jcl-muted-fg-color,#737373);
      cursor:pointer; outline:none;
      transition:background-color 0.15s ease, color 0.15s ease;
    }
    .jcl-component.styled-calendar-view > .header > .nav:hover {
      background:var(--jcl-accent-bg-color,#f7f7f7);
      color:var(--jcl-accent-fg-color,#171717);
    }
    .jcl-component.styled-calendar-view > .header > .nav:focus-visible {
      box-shadow:0px 0px 0px 2px color-mix(
        in srgb, var(--jcl-ring-color,#0075ff) 50%, transparent
      );
    }
    .jcl-component.styled-calendar-view > .header > .nav:disabled {
      pointer-events:none; cursor:not-allowed;
      opacity:0.5;
    }

    .jcl-component.styled-calendar-view .chevron-left,
    .jcl-component.styled-calendar-view .chevron-right {
      display:inline-block;
      width:16px; height:16px;
      background:currentColor;
      pointer-events:none;
      ${$t}
    }
    .jcl-component.styled-calendar-view .chevron-left {
      ${Da}
    }
    .jcl-component.styled-calendar-view .chevron-right {
      ${$r}
    }

  /**** multi-month views hide the navigation of their inner month views ****/

    .jcl-component.styled-calendar-view .styled-month-view > .header > .nav {
      display:none;
    }
    .jcl-component.styled-calendar-view .styled-month-view > .header {
      justify-content:center;
    }
  `), Yy = /* @__PURE__ */ Z("jcl-component.styled-month-view", `
    .jcl-component.styled-month-view > .grid {
      display:grid;
      grid-template-columns:repeat(7,32px);
      gap:2px;
    }

    .jcl-component.styled-month-view > .grid > .weekday {
      display:flex; align-items:center; justify-content:center;
      height:32px;
      font-size:12.8px;
      color:var(--jcl-muted-fg-color,#737373);
      user-select:none;
    }

    .jcl-component.styled-month-view > .grid > .day {
      display:flex; align-items:center; justify-content:center;
      width:32px; height:32px;
      border:none; border-radius:var(--jcl-border-radius,8px);
      background:transparent;
      color:inherit;
      font:inherit; font-size:14px;
      cursor:pointer; user-select:none;
      outline:none;
      transition:background-color 0.15s ease, color 0.15s ease;
    }

    .jcl-component.styled-month-view > .grid > .day:hover {
      background:var(--jcl-accent-bg-color,#f7f7f7);
      color:var(--jcl-accent-fg-color,#171717);
    }

    .jcl-component.styled-month-view > .grid > .day:focus-visible {
      box-shadow:0px 0px 0px 2px color-mix(
        in srgb, var(--jcl-ring-color,#0075ff) 50%, transparent
      );
    }

    .jcl-component.styled-month-view > .grid > .day.outside {
      color:var(--jcl-muted-fg-color,#737373);
      opacity:0.6;
    }

    .jcl-component.styled-month-view > .grid > .day.today {
      background:var(--jcl-accent-bg-color,#f7f7f7);
      color:var(--jcl-accent-fg-color,#171717);
    }

    .jcl-component.styled-month-view > .grid > .day.selected {
      background:var(--jcl-primary-bg-color,#0075ff);
      color:var(--jcl-primary-fg-color,#ffffff);
    }

  /**** "disabled" also overrides JCL's general "[disabled]" opacity rule ****/

    .jcl-component.styled-month-view > .grid > .day:disabled {
      pointer-events:none; cursor:not-allowed;
      opacity:0.5;
    }
  `);
function Jc(e) {
  const {
    Name: t,
    ClassName: n,
    PeriodKey: o,
    ValueIsPeriod: r,
    defaultPeriodFor: a,
    shiftedPeriod: i,
    CaptionFor: s,
    MonthsOf: l,
    withOrientation: d = !1,
    ensureStyles: u
  } = e, p = "on" + o + "Change";
  return function(f) {
    return H(() => {
      Yc(), u?.(), f = G(f);
      const h = D(f.Class) ?? "", g = re(f.Style), y = z(f.Value, zt);
      let m = z(f[o], r);
      const v = z(f.Min ?? f.Minimum, zt), C = z(f.Max ?? f.Maximum, zt), _ = d ? z(f.Orientation, (X) => he(X, ["horizontal", "vertical"])) ?? "horizontal" : void 0, j = Y(f.disabled) ?? !1, x = R(f.onValueInput), w = R(f[p]), T = dt(), L = (/* @__PURE__ */ new Date()).toLocaleDateString("sv"), $ = a(y ?? L), I = Ot(m, $);
      m = I.current;
      const M = ie((X, Q) => {
        Le(Q);
        const pe = i(I.current, X);
        I.current = pe, T(), E(
          t + ' callback "' + p + '"',
          w,
          pe
        );
      }, [w, T]), S = ie((X, Q) => {
        E(
          t + ' callback "onValueInput"',
          x,
          X,
          Q
        );
      }, [x]), F = l(m), N = n + (d ? ` orientation-${_}` : "");
      return b`<div class="jcl-component styled-calendar-view ${N} ${h}"
          style=${g} ...${f.RestProps}
        >
          <div class="header">
            <button class="nav" aria-label=${"go to previous " + o.toLowerCase()}
              disabled=${j} onClick=${(X) => M(-1, X)}
            ><span class="chevron-left"/></>
            <div class="caption">${s(m)}</div>
            <button class="nav" aria-label=${"go to next " + o.toLowerCase()}
              disabled=${j} onClick=${(X) => M(1, X)}
            ><span class="chevron-right"/></>
          </>
          <div class="months">
            ${F.map((X) => b`<${pi}
              Value=${y} Month=${X} Min=${v} Max=${C}
              disabled=${j} onValueInput=${S}
            />`)}
          </>
        </>`;
    });
  };
}
const Jy = "\\d{4}-Q[1-4]", Zy = /* @__PURE__ */ Qn(Jy);
function Qy(e) {
  return Ct(e, Zy);
}
const Py = (e) => e.slice(0, 4) + "-Q" + (Math.floor((Number(e.slice(5, 7)) - 1) / 3) + 1), e0 = /* @__PURE__ */ Z("jcl-component.styled-quarter-view", `
    .jcl-component.styled-quarter-view > .months {
      display:flex; flex-flow:row nowrap; align-items:flex-start;
      gap:8px;
    }

    .jcl-component.styled-quarter-view.orientation-vertical > .months {
      flex-flow:column nowrap; align-items:center;
    }
  `), t0 = /* @__PURE__ */ Jc({
  Name: "styledQuarterView",
  ClassName: "styled-quarter-view",
  PeriodKey: "Quarter",
  ValueIsPeriod: Qy,
  defaultPeriodFor: Py,
  shiftedPeriod: (e, t) => {
    const n = Number(e.slice(0, 4)), o = Number(e.slice(6)), r = n * 4 + (o - 1) + t;
    return Math.floor(r / 4) + "-Q" + (r % 4 + 1);
  },
  CaptionFor: (e) => "Q" + e.slice(6) + " " + e.slice(0, 4),
  MonthsOf: (e) => {
    const t = Number(e.slice(0, 4)), n = Number(e.slice(6)), o = [];
    for (let r = 0; r < 3; r++) {
      const a = (n - 1) * 3 + 1 + r;
      o.push(t + "-" + String(a).padStart(2, "0"));
    }
    return o;
  },
  withOrientation: !0,
  ensureStyles: e0
}), n0 = /* @__PURE__ */ Z("jcl-component.styled-year-view", `
    .jcl-component.styled-year-view > .months {
      display:grid;
      grid-template-columns:repeat(3,min-content);
      gap:8px;
    }
  `), o0 = /* @__PURE__ */ Jc({
  Name: "styledYearView",
  ClassName: "styled-year-view",
  PeriodKey: "Year",
  ValueIsPeriod: (e) => ua(e, 1, 9999),
  defaultPeriodFor: (e) => Number(e.slice(0, 4)),
  shiftedPeriod: (e, t) => e + t,
  CaptionFor: (e) => String(e),
  MonthsOf: (e) => {
    const t = [];
    for (let n = 1; n <= 12; n++)
      t.push(e + "-" + String(n).padStart(2, "0"));
    return t;
  },
  ensureStyles: n0
});
let Ss = !1;
function r0() {
  Ss || (Ss = !0, hr("en", {
    "jcl.applet.compilation-error.title": "Compilation Error",
    "jcl.applet.compilation-error.prefix": 'Compiling Applet "src" failed with ',
    "jcl.applet.runtime-error.title": "Applet Failure",
    "jcl.applet.runtime-error.prefix": "JCL Applet failed with "
  }), hr("de", {
    "jcl.applet.compilation-error.title": "Kompilierungsfehler",
    "jcl.applet.compilation-error.prefix": "Kompilieren des Applet-Skripts fehlgeschlagen: ",
    "jcl.applet.runtime-error.title": "Laufzeitfehler",
    "jcl.applet.runtime-error.prefix": "JCL-Applet fehlgeschlagen: "
  }));
}
class a0 extends HTMLElement {
  _Renderer;
  constructor() {
    super(), r0();
    const t = ad(this.getAttribute("src") ?? "");
    if (t.trim() === "") {
      this._Renderer = Zc("");
      return;
    }
    try {
      this._Renderer = new gp("PropSet", t);
    } catch (n) {
      this._Renderer = i0(
        "compilation-error",
        n.stack ?? n.message ?? String(n)
      );
    }
  }
  connectedCallback() {
    xo(b`<${Qc} renderer=${this._Renderer}/>`, this);
  }
  disconnectedCallback() {
    xo(null, this);
  }
}
function ww() {
  customElements.get("jcl-applet") == null && customElements.define("jcl-applet", a0);
}
function Zc(e) {
  return e.trim() === "" ? function(t) {
    return "";
  } : function(t) {
    return b`<${fn} Error=${e}/>`;
  };
}
function i0(e, t) {
  return function(n) {
    const o = typeof navigator < "u" ? navigator.language : "en", r = Qr(`jcl.applet.${e}.title`, o) ?? "Error", a = Qr(`jcl.applet.${e}.prefix`, o) ?? "", i = r + `

` + a + t;
    return b`<${fn} Error=${i}/>`;
  };
}
function Qc(e) {
  s0();
  const [t, n] = He(void 0), o = U(void 0), r = U(!1), a = Fo(_r), { Locale: i, Direction: s, Theme: l, SwatchSet: d } = a, u = Ro(l, d);
  je(() => {
    const {
      setLocale: h,
      setDirection: g,
      setTheme: y,
      setPointerAccuracy: m,
      setHoverCapability: v,
      setPreferredMotion: C,
      setPreferredContrast: _
    } = a, j = new AbortController();
    if (window.addEventListener("languagechange", () => {
      const x = navigator.language;
      h(x), g(Sl(x));
    }, { signal: j.signal }), typeof window.matchMedia == "function") {
      const x = (Q) => y(Q.matches ? "dark" : "light"), w = (Q) => m(Q.matches ? "coarse" : "fine"), T = (Q) => v(Q.matches ? "hover" : "none"), L = () => C(
        Gt("(prefers-reduced-motion: reduce)") ? "reduced" : void 0
      ), $ = () => _(
        Gt("(prefers-contrast: more)") ? "more" : Gt("(prefers-contrast: less)") ? "less" : void 0
      ), I = window.matchMedia("(prefers-color-scheme: dark)"), M = window.matchMedia("(pointer: coarse)"), S = window.matchMedia("(hover: hover)"), F = window.matchMedia("(prefers-reduced-motion: reduce)"), N = window.matchMedia("(prefers-contrast: more)"), X = window.matchMedia("(prefers-contrast: less)");
      I.addEventListener("change", x), M.addEventListener("change", w), S.addEventListener("change", T), F.addEventListener("change", L), N.addEventListener("change", $), X.addEventListener("change", $), j.signal.addEventListener("abort", () => {
        I.removeEventListener("change", x), M.removeEventListener("change", w), S.removeEventListener("change", T), F.removeEventListener("change", L), N.removeEventListener("change", $), X.removeEventListener("change", $);
      });
    }
    return () => j.abort();
  }, [a]);
  const [p] = Ia(), { localized: c } = Aa(a);
  let f;
  switch (!0) {
    case p != null: {
      const h = c("jcl.applet.runtime-error.title"), g = c("jcl.applet.runtime-error.prefix"), y = h + `

` + g + (p.stack ?? p.message ?? String(p));
      f = b`<${fn} Error=${y}/>`;
      break;
    }
    case o.current !== t:
      o.current = t, r.current = !0, f = t;
      break;
    case r.current:
      f = t;
      break;
    default: {
      let h;
      try {
        h = e.renderer({});
      } catch (g) {
        const y = c("jcl.applet.runtime-error.title"), m = c("jcl.applet.runtime-error.prefix"), v = y + `

` + m + (g.stack ?? g.message ?? String(g));
        return f = b`<${fn} Error=${v}/>`, b`<div
              class="jcl-component jcl-applet"
              dir=${s} lang=${i} style=${u}
              role="alert" aria-live="assertive"
            >
             <${kt.Provider} value=${a}>
              ${f}
             </>
            </div>`;
      }
      if (xl(h))
        return h.then((g) => n(g)).catch((g) => {
          const y = c("jcl.applet.runtime-error.title"), m = c("jcl.applet.runtime-error.prefix"), v = y + `

` + m + (g.stack ?? g.message ?? String(g));
          n(b`<${fn} Error=${v}/>`);
        }), b`<div
              class="jcl-component jcl-applet" dir=${s}
              aria-busy="true" aria-live="polite"
            />`;
      f = h;
    }
  }
  return b`<div
      class="jcl-component jcl-applet"
      dir=${s} lang=${i} style=${u}
      aria-live=${p == null ? "polite" : "assertive"}
    >
     <${kt.Provider} value=${a}>
      ${f}
     </>
    </div>`;
}
const s0 = /* @__PURE__ */ Z("jcl-component.jcl-applet", `
    .jcl-component.jcl-applet {
      display:contents;
    }
  `);
function Pc(e, t) {
  const n = /* @__PURE__ */ new Set();
  return e.forEach((o) => {
    n.has(o) && ce(
      `InvalidArguments: the given ${t} contain entries with identical keys`
    ), n.add(o);
  }), n;
}
function Ds(e, t) {
  const n = /* @__PURE__ */ new Set();
  e.forEach((o) => {
    n.has(o) && ce(
      `InvalidArguments: the given ${t} contain double entries`
    ), n.add(o);
  });
}
function ho(e, t) {
  const n = /* @__PURE__ */ new Set();
  return e.filter((o) => t.has(o) && !n.has(o) ? (n.add(o), !0) : !1);
}
function jn(e) {
  return e != null && (e.shiftKey || e.metaKey || e.ctrlKey);
}
function lt(e, t, n) {
  return Math.max(t, Math.min(e, Math.max(t, n)));
}
function ut(e) {
  return e === "normal" ? "" : "size-" + e;
}
function ed(e, t, n, o, r) {
  function a(l, d) {
    switch (!0) {
      case l > 0:
        return -r * Math.min(1, l / o);
      case d > 0:
        return r * Math.min(1, d / o);
      default:
        return 0;
    }
  }
  const i = o === 0 ? 0 : a(
    o - (t - e.left),
    o - (e.right - t)
  ), s = o === 0 ? 0 : a(
    o - (n - e.top),
    o - (e.bottom - n)
  );
  return { vx: i, vy: s };
}
function td(e, t) {
  const n = Math.min(0.1, e.PanningTimestamp == null ? 0 : (t - e.PanningTimestamp) / 1e3);
  return e.PanningTimestamp = t, n;
}
function l0(e, t) {
  const n = {};
  return t.forEach((o) => {
    n[o] = ((...r) => e.current[o]?.(...r));
  }), n;
}
function Le(e, t = !1) {
  e.stopPropagation(), t == !0 && e.preventDefault();
}
const wn = Le;
function Gt(e) {
  return typeof window < "u" && typeof window.matchMedia == "function" ? window.matchMedia(e).matches : !1;
}
function c0(e) {
  return wr("value", e), e?.replace(/\n[\s\S]*$/, "").replace(/[\x00-\x1F\x7F]/g, "");
}
function d0(e) {
  return wr("value", e), e?.replace(/[\x00-\x09\x0B\x0C\x0E-\x1F\x7F]/g, "").replace(/\r\n/g, `
`);
}
const kw = {
  render: xo,
  html: b,
  Component: qt,
  createRef: qu,
  createContext: mn,
  toChildArray: Mt,
  cloneElement: Pu,
  isValidElement: va,
  createPortal: Zn,
  useId: Vt,
  useRef: U,
  useState: He,
  useEffect: je,
  useLayoutEffect: ja,
  useCallback: ie,
  useMemo: Jt,
  useContext: gt,
  useErrorBoundary: Ia,
  loadedLibrary: ht,
  useLibraries: eo,
  useOnlineStatus: _f,
  useWindowSize: Sf,
  useRerenderer: dt,
  useCustomization: Sr,
  useI18n: Df,
  useConfiguration: Lf,
  useDragging: An,
  useClickDragging: to,
  useDataDragSupport: Af,
  useDataDropSupport: Tf,
  usePointerDragSupport: Ff,
  usePointerDropSupport: Of,
  useFileDropSupport: Ef,
  useOverlayContext: no,
  useDialogContext: oo,
  useToastContext: Ka,
  JCL_PointerDnDContext: za,
  JCL_OverlayContext: Dr,
  JCL_DialogContext: Lr,
  JCL_ToastContext: Ua,
  installStylesheetFor: Na,
  uninstallStylesheetFor: Bf,
  safelyRendered: H,
  consumeEvent: Le,
  consumingEvent: wn,
  MediaQueryMatches: Gt,
  PseudoRef: Gf,
  JCL_ErrorIndicator: fn,
  normalizedName: Zp,
  parseablePropSet: G,
  TextlineFromString: c0,
  TextFromString: d0,
  Customizable: Uf,
  OverlayBase: Kf,
  DialogBase: Yf,
  ToastBase: th,
  fullsized: ih,
  centered: qa,
  horizontal: ch,
  vertical: uh,
  tabular: fh,
  selective: gh,
  stacked: bh,
  Dummy: xh,
  Spacer: wh,
  expandingSpacer: kh,
  horizontalSeparator: Ch,
  verticalSeparator: $h,
  Title: jh,
  Subtitle: _h,
  Label: Dh,
  Description: Xa,
  Fineprint: Rh,
  TextlineView: Mh,
  TextView: Oh,
  HTMLView: Nh,
  MarkdownView: Ul,
  get MarkdownRenderer() {
    return In;
  },
  // lazily initialised
  loadMarkdownLibraries: zo,
  loadedMarkdownRenderer: Bh,
  ImageView: Hh,
  SVGView: Uh,
  WebView: Yh,
  Icon: Zh,
  FAIcon: Ph,
  native: {
    Button: tg,
    Checkbox: og,
    Radiobutton: ag,
    Gauge: sg,
    Progressbar: cg,
    Slider: ug,
    TextlineInput: fg,
    PasswordInput: hg,
    NumberInput: gg,
    EMailAddressInput: mg,
    PhoneNumberInput: bg,
    URLInput: yg,
    TimeInput: wg,
    DateTimeInput: $g,
    DateInput: Ig,
    WeekInput: Sg,
    MonthInput: Lg,
    SearchInput: Mg,
    FileInput: Ag,
    ColorInput: Rg,
    DropDown: Og,
    TextInput: ti
  },
  styled: {
    Button: Fc,
    Icon: Rb,
    FAIcon: Ob,
    Checkbox: ca,
    Radiobutton: Oc,
    Gauge: lb,
    Progressbar: db,
    Slider: pb,
    TextlineInput: hb,
    PasswordInput: gb,
    NumberInput: mb,
    EMailAddressInput: bb,
    PhoneNumberInput: yb,
    URLInput: xb,
    TimeInput: vb,
    DateTimeInput: wb,
    DateInput: kb,
    WeekInput: Cb,
    MonthInput: $b,
    SearchInput: jb,
    FileInput: Lb,
    ColorInput: Ib,
    DropDown: Sb,
    TextInput: Ab,
    Badge: Nb,
    Spinner: Vb,
    Kbd: Wb,
    Avatar: Gb,
    Skeleton: Kb,
    Breadcrumb: Ey,
    Pagination: Uc,
    Tooltip: Nc,
    Popover: Ec,
    DropDownMenu: Jb,
    DropDownMenuItem: Zb,
    DropDownMenuSeparator: Qb,
    DropDownMenuGroup: Pb,
    DropDownMenuSubMenu: ey,
    CommandPalette: ny,
    CommandItem: oy,
    CommandGroup: ry,
    Toast: ay,
    Card: sy,
    CardHeader: cy,
    CardTitle: fy,
    CardDescription: hy,
    CardAction: dy,
    CardContent: uy,
    CardFooter: py,
    Sidebar: gy,
    SidebarHeader: by,
    SidebarContent: yy,
    SidebarFooter: xy,
    SidebarItem: vy,
    SidebarSeparator: wy,
    SidebarGroup: ky,
    Table: Kc,
    TableHeader: qc,
    TableBody: Xc,
    TableFooter: Ky,
    TableRow: ar,
    TableHead: da,
    TableCell: ir,
    DataTable: qy,
    Field: Cy,
    InputGroup: jy,
    InputGroupAddon: Iy,
    Switch: _y,
    MultiSwitch: Hc,
    ThemeSwitch: Dy,
    RadioGroup: Ly,
    Combobox: Ay,
    MonthView: pi,
    QuarterView: t0,
    YearView: o0,
    DatePicker: Fy,
    TabStrip: zy,
    Accordion: Wy,
    AccordionFold: Hy
  },
  legacy: {
    PseudoFileInput: Eg,
    PseudoDropDown: Bg,
    FileDropArea: Hg,
    TabStrip: Ug,
    AccordionFold: qg,
    FlatListView: ec,
    NestedListView: Qg,
    RichTextEditor: ac,
    CodeEditor: dm,
    DrawingEditor: gm,
    BitmapEditor: ym,
    RealDrawEditor: wm,
    Spreadsheet: Ym,
    KanbanBoard: eb,
    registerSpreadsheetFormula: qm,
    registerSpreadsheetFormulas: Xm,
    NoteBoard: $m,
    ChatView: Wm,
    ChatViewAssistantExtra: Mc,
    ChatViewUserExtra: Ac,
    ChatViewControls: Tc,
    stickyTextNote: Dc,
    stickyHTMLNote: ai,
    stickyMarkdownNote: Lc,
    DataFlowProcessView: Mm,
    WorldPositionOfPort: Gn,
    QRCodeView: rb
  },
  AppletView: Qc,
  AppletFailingWith: Zc
};
function nd(e, t = !0) {
  return ot("text to be fenced", e), ga("fence insertion flag", t), e = e.replace(/\\/g, "\\\\").replace(/»/g, "\\xBB").replace(/«/g, "\\xAB"), t ? `»»»
${e}
«««` : e;
}
function u0(e) {
  return ot("text to be unfenced", e), e = e.replace(/^[\s\S]*?»»»/, "").replace(/«««[\s\S]*$/, ""), e.replace(/\\\\|\\xBB|\\xAB/g, (t) => t === "\\\\" ? "\\" : t === "\\xBB" ? "»" : "«").replace(/^\s*\n/, "").replace(/\n\s*$/, `
`);
}
function p0(e, t) {
  return ot("text to be filled", e), It("variable set", t), e.replace(/\{\{([^}]+)\}\}/g, (n, o) => o === "" ? "{{" : o.startsWith("~") ? (o = o.slice(1), t[o] == null ? n : nd(t[o])) : t[o] == null ? n : t[o]);
}
const Cw = {
  fencedText: nd,
  unfencedText: u0,
  TextFilledFrom: p0
};
async function Vo(e) {
  return new Promise((t, n) => {
    const o = new FileReader();
    o.onload = () => t(o.result), o.onerror = () => n(o.error ?? new Error("Loading failed")), o.onabort = () => n(new Error("Loading was aborted")), o.readAsText(e);
  });
}
async function Bo(e) {
  return new Promise((t, n) => {
    const o = new FileReader();
    o.onload = () => t(o.result), o.onerror = () => n(o.error ?? new Error("Loading failed")), o.onabort = () => n(new Error("Loading was aborted")), o.readAsArrayBuffer(e);
  });
}
async function f0(e) {
  return new Promise((t, n) => {
    const o = new FileReader();
    o.onload = () => t(o.result), o.onerror = () => n(o.error ?? new Error("Loading failed")), o.onabort = () => n(new Error("Loading was aborted")), o.readAsDataURL(e);
  });
}
async function h0(e) {
  const t = await Vo(e);
  return fi(t);
}
async function fi(e) {
  return ot("HTML document", e), od(e);
}
async function g0(e) {
  const t = await Vo(e);
  return hi(t);
}
async function hi(e) {
  return ot("HTML document", e), ki(e);
}
async function m0(e) {
  const t = await Vo(e);
  return gi(t);
}
async function gi(e) {
  ot("markdown document", e);
  try {
    await zo();
    let t = 0;
    const n = new gr();
    return n.use({
      gfm: !0,
      breaks: !0,
      renderer: {
        heading(o) {
          return `
${En(this.parser.parseInline(o.tokens))}

`;
        },
        paragraph(o) {
          return `${En(this.parser.parseInline(o.tokens))}

`;
        },
        list(o) {
          t++;
          let r = "";
          for (const a of o.items)
            r += this.listitem(a);
          return t--, r + `
`;
        },
        listitem(o) {
          const r = "  ".repeat(t - 1), i = o.tokens.some((s) => s.type === "list") ? En(this.parser.parse(o.tokens)).trim() : En(this.parser.parseInline(o.tokens));
          return `${r}- ${i}
`;
        },
        link(o) {
          return En(this.parser.parseInline(o.tokens));
        },
        image(o) {
          return `[${o.text}]`;
        },
        code(o) {
          return `${o.text}

`;
        },
        blockquote(o) {
          return `${En(this.parser.parse(o.tokens))}

`;
        },
        br() {
          return `
`;
        },
        html() {
          return "";
        },
        hr() {
          return `----

`;
        }
      }
    }), n.use(mr({ nonStandard: !1 })), (await n.parse(e)).replace(/^\s+|\s+$/g, "").replace(/\n{3,}/g, `

`);
  } catch (t) {
    ce("ConversionError: could not convert the given Markdown into plain text, reason: " + t);
  }
}
async function b0(e) {
  const t = await Vo(e);
  return mi(t);
}
async function mi(e) {
  ot("markdown document", e);
  try {
    await zo();
    const t = new gr();
    return t.use(ea({
      langPrefix: "hljs language-",
      highlight(n, o) {
        const r = Hn.getLanguage(o) ? o : "plaintext";
        return Hn.highlight(n, { language: r }).value;
      }
    })), t.setOptions({
      gfm: !0,
      breaks: !0
    }), t.use(mr({ nonStandard: !1 })), await t.parse(e);
  } catch (t) {
    ce("ConversionError: could not convert the given Markdown into HTML, reason: " + t);
  }
}
function En(e) {
  return e.replace(/<[^>]+>/g, "");
}
let Ur;
async function bi() {
  return Ur == null && (Ur = (await import("./mammoth-z-US_vPy.js").then((e) => e.i)).default), Ur;
}
async function y0(e) {
  const t = await Bo(e);
  return yi(t);
}
async function yi(e) {
  So("DOCX document", e, ArrayBuffer, "binary buffer");
  try {
    return (await (await bi()).extractRawText({ arrayBuffer: e })).value;
  } catch (t) {
    ce("ConversionError: could not convert the given DOCX file into plain text, reason: " + t);
  }
}
async function x0(e) {
  const t = await Bo(e);
  return xi(t);
}
async function xi(e) {
  So("DOCX document", e, ArrayBuffer, "binary buffer");
  try {
    return (await (await bi()).convertToHtml({ arrayBuffer: e })).value;
  } catch (t) {
    ce("ConversionError: could not convert the given DOCX file into HTML, reason: " + t);
  }
}
async function v0(e) {
  const t = await Bo(e);
  return vi(t);
}
async function vi(e) {
  So("DOCX document", e, ArrayBuffer, "binary buffer");
  try {
    const n = (await (await bi()).convertToHtml({ arrayBuffer: e })).value;
    return ki(n);
  } catch (t) {
    ce("ConversionError: could not convert the given DOCX file into Markdown, reason: " + t);
  }
}
let Kr;
async function w0() {
  if (Kr == null) {
    const { getDocument: e, GlobalWorkerOptions: t } = await import("./pdfjs-dist-DDf7imjd.js");
    t.workerSrc = new URL(
      /* @vite-ignore */
      "./pdf.worker.min.mjs",
      import.meta.url
    ).href, Kr = e;
  }
  return Kr;
}
async function k0(e) {
  const t = await Bo(e);
  return wi(t);
}
async function wi(e) {
  So("PDF document", e, ArrayBuffer, "binary buffer");
  try {
    const n = await (await w0())({
      data: e,
      wasmUrl: new URL(
        /* @vite-ignore */
        "./vendors/",
        import.meta.url
      ).href
    }).promise;
    let o = "";
    for (let r = 1; r <= n.numPages; r++) {
      const i = await (await n.getPage(r)).getTextContent();
      o += i.items.map((s) => s.str + (s.hasEOL ? `
` : " ")).join("").replace(/ +/g, " ") + `
`;
    }
    return o;
  } catch (t) {
    ce("ConversionError: could not convert the given PDF file into plain text, reason: " + t);
  }
}
function od(e) {
  ot("HTML document", e), /^\s*<!DOCTYPE/i.test(e) && (e = e.replace(/^\s*<!DOCTYPE[^>]*>/i, "").trim());
  const t = {
    head: !0,
    base: !0,
    link: !0,
    meta: !0,
    noscript: !0,
    script: !0,
    style: !0,
    title: !0
  };
  let n = "", o = [], r = [], a = !1, i = !1, s = !1, l = !0;
  const d = {
    processStartTag: function(h, g, y, m) {
      if (t[h]) {
        d.ignoredTag = h;
        return;
      }
      if (d.ignoredTag == null)
        switch (h) {
          case "h1":
          case "h2":
          case "h3":
          case "h4":
          case "h5":
          case "h6":
            l || p(h === "h1" ? 3 : 2), l = !1;
            break;
          case "section":
            p();
            break;
          case "ul":
            p(), o.push("-");
            break;
          case "ol":
            p(), o.push("1"), r.push(1);
            break;
          case "li":
            switch (p(), n += c(), o[o.length - 1]) {
              case "-":
                n += "- ";
                break;
              case "1":
                n += r[r.length - 1]++ + ". ";
                break;
            }
            break;
          case "table":
            p();
            break;
          case "tr":
            p(), n += "|", s = !0;
            break;
          case "td":
          case "th":
            s || (n += "|", s = !0), n += " ";
            break;
          case "blockquote":
            p();
            break;
          case "pre":
            a = !0, p();
            break;
          case "code":
            i = !0;
            break;
          case "br":
            p();
            break;
          case "hr":
            p(2), n += "----", p(2);
            break;
          case "a":
            d.href = (g.find(
              (_) => _.Name === "href"
            ) || {}).Value;
            break;
          case "img":
            let v = (g.find((_) => _.Name === "alt") || {}).Value || "", C = (g.find((_) => _.Name === "src") || {}).Value || "";
            n += ` (${v}) [${C}] `;
            break;
        }
    },
    processEndTag: function(h) {
      if (d.ignoredTag != null) {
        d.ignoredTag === h && delete d.ignoredTag;
        return;
      }
      switch (h) {
        case "h1":
        case "h2":
        case "h3":
        case "h4":
        case "h5":
        case "h6":
          p(2);
          break;
        case "ul":
          o.pop(), p();
          break;
        case "ol":
          o.pop(), r.pop(), p();
          break;
        case "tr":
          n += "|", s = !1;
          break;
        case "td":
        case "th":
          n += "|";
          break;
        case "table":
          p();
          break;
        case "pre":
          p(), a = !1;
          break;
        case "code":
          i = !1;
          break;
        case "a":
          d.href != null && (n += ` [${d.href}]`), delete d.href;
      }
    },
    processText: function(h, g) {
      d.ignoredTag == null && (h.trim() === "" && !a && !i || (u(f(h)), l = !1));
    },
    processComment: function(h) {
    }
  };
  return Ci(e, d), n.replace(/^\s+|\s+$/g, "").replace(/\n{3,}/g, `

`);
  function u(h) {
    a || i ? n += h : n += h.replace(/\s+/g, " ");
  }
  function p(h = 1) {
    n = n.replace(a ? /\n*$/ : /\s*$/, ""), n += `
`.repeat(h);
  }
  function c() {
    return "  ".repeat(o.length);
  }
  function f(h) {
    if (typeof document < "u") {
      const g = document.createElement("textarea");
      return g.innerHTML = h, g.value;
    } else
      return h.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&#(\d+);/g, (g, y) => String.fromCodePoint(Number(y))).replace(/&#x([0-9a-fA-F]+);/g, (g, y) => String.fromCodePoint(parseInt(y, 16)));
  }
}
function ki(e) {
  ot("HTML document", e), /^\s*<!DOCTYPE/i.test(e) && (e = e.replace(/^\s*<!DOCTYPE[^>]*>/i, "").trim());
  const t = {
    head: !0,
    base: !0,
    link: !0,
    meta: !0,
    noscript: !0,
    script: !0,
    style: !0,
    title: !0,
    svg: !0,
    semantics: !0
  };
  let n = "", o = "", r = [], a = [], i = !1, s = !1, l = !1, d = !1, u = !1, p = [], c = [], f = "";
  const h = {
    processStartTag: function(C, _, j, x) {
      if (h.ignoredTag == null) {
        if (t[C]) {
          h.ignoredTag = C;
          return;
        }
        switch (o = "", C) {
          case "h1":
          case "h2":
          case "h3":
          case "h4":
          case "h5":
          case "h6":
            g(2), o += "#".repeat(Number(C[1])) + " ";
            break;
          case "section":
            g(2);
            break;
          case "ul":
            g(), r.push("-");
            break;
          case "ol":
            g(), r.push("1"), a.push(1);
            break;
          case "li":
            switch (g(), o += y(), r[r.length - 1]) {
              case "-":
                o += "- ";
                break;
              case "1":
                o += a[a.length - 1]++ + ". ";
                break;
            }
            break;
          case "table":
            l = !0, p = [];
            break;
          case "tr":
            d = l, c = [];
            break;
          case "th":
            u = !0, f = "";
            break;
          case "td":
            l && d && p.length === 0 && p.push([]), u = !0, f = "";
            break;
          case "blockquote":
            g(), o += "> ";
            break;
          case "pre":
            g(2), o += "```", i = !0;
            break;
          case "code":
            i || (o += "`"), s = !0;
            break;
          case "br":
            o += "  ", g();
            break;
          case "hr":
            g(2), o += "---", g(2);
            break;
          case "a":
            h.href = (_.find(
              (w) => w.Name === "href"
            ) || {}).Value, o += "[";
            break;
          case "img": {
            let w = (_.find((L) => L.Name === "alt") || {}).Value || "", T = (_.find((L) => L.Name === "src") || {}).Value || "";
            o += `![${w}](${T})`;
            break;
          }
          case "strong":
          case "b":
            o += "**";
            break;
          case "em":
          case "i":
            o += "_";
            break;
        }
        u ? f += o : n += o;
      }
    },
    processEndTag: function(C) {
      if (h.ignoredTag != null) {
        h.ignoredTag === C && delete h.ignoredTag;
        return;
      }
      switch (o = "", C) {
        case "h1":
        case "h2":
        case "h3":
        case "h4":
        case "h5":
        case "h6":
          o += " " + "#".repeat(Number(C[1])), g(2);
          break;
        case "ul":
          r.pop(), g();
          break;
        case "ol":
          r.pop(), a.pop(), g();
          break;
        case "li":
          break;
        // nothing extra
        case "table":
          p.length > 0 && (g(), o += v(p), p = [], g()), l = d = u = !1;
          break;
        case "tr":
          l && p.push(c), d = u = !1, c = [];
          break;
        case "th":
        case "td":
          d && c.push(f), u = !1, f = "";
          break;
        case "p":
        case "blockquote":
          g();
          break;
        case "pre":
          i = !1, o += (n.endsWith(`
`) ? "" : `
`) + "```\n", g();
          break;
        case "code":
          i || (o += "`"), s = !1;
          break;
        case "a":
          h.href != null && (o += `](${h.href})`, delete h.href);
          break;
        case "strong":
        case "b":
          o += "**";
          break;
        case "em":
        case "i":
          o += "_";
          break;
      }
      u ? f += o : n += o;
    },
    processText: function(C, _) {
      if (h.ignoredTag == null && !(C.trim() === "" && !i && !s)) {
        switch (!0) {
          case i:
            o = C;
            break;
          case s:
            o = C.replace(/`/g, "\\`");
            break;
          default:
            o = m(C).replace(/\s+/g, " ");
        }
        u ? f += o : n += o;
      }
    },
    processComment: function(C) {
    }
  };
  return Ci(e, h), n.replace(/^\s+|\s+$/g, "").replace(/\n{3,}/g, `

`);
  function g(C = 1) {
    o = o.trimEnd() + `
`.repeat(C);
  }
  function y() {
    return "  ".repeat(r.length - 1);
  }
  function m(C) {
    if (typeof document < "u") {
      const _ = document.createElement("textarea");
      return _.innerHTML = C, _.value;
    } else
      return C.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&#(\d+);/g, (_, j) => String.fromCodePoint(Number(j))).replace(/&#x([0-9a-fA-F]+);/g, (_, j) => String.fromCodePoint(parseInt(j, 16)));
  }
  function v(C) {
    if (C.length === 0)
      return "";
    let _, j;
    if (C[0].length > 0)
      _ = C[0], j = 1;
    else {
      const T = Math.max(...C.map((L) => L.length));
      _ = new Array(T).fill(""), j = 1;
    }
    const x = _.map(() => "---");
    let w = [
      "| " + _.join(" | ") + " |",
      "| " + x.join(" | ") + " |"
    ];
    for (let T = j; T < C.length; T++)
      w.push("| " + C[T].join(" | ") + " |");
    return w.join(`
`) + `
`;
  }
}
function Ci(e, t) {
  const n = /^<([-a-z0-9]+)((?:[\s\xA0]+[-a-z0-9_$:]+(?:[\s\xA0]*=[\s\xA0]*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s\xA0]+))?)*)[\s\xA0]*(\/?)>/i, o = /^<\/([-a-z0-9_]+)[^>]*>/i, r = /([-a-z0-9_$:]+)(?:[\s\xA0]*=[\s\xA0]*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s\xA0]+)))?/gi;
  function a(L) {
    let $ = L.split(","), I = /* @__PURE__ */ Object.create(null);
    for (let M = 0, S = $.length; M < S; M++)
      I[$[M]] = !0;
    return I;
  }
  const i = a(
    "area,base,basefont,br,col,embed,frame,hr,img,input,isindex,keygen,link,meta,param,source,track,wbr"
  ), s = a(
    "address,article,aside,audio,blockquote,canvas,center,dd,dir,div,dl,dt,fieldset,figcaption,figure,footer,form,frameset,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,isindex,li,main,menu,nav,noframes,noscript,ol,output,p,pre,section,semantics,table,tbody,td,tfoot,th,thead,tr,ul,video,svg,g,defs,symbol,clippath,mask,pattern,lineargradient,radialgradient,filter,switch,text,tspan,textpath,foreignobject"
  ), l = a(
    "a,abbr,acronym,applet,b,basefont,bdo,big,br,button,cite,code,del,dfn,em,font,i,iframe,img,input,ins,kbd,label,map,object,q,s,samp,script,select,small,span,strike,strong,sub,sup,textarea,tt,u,var"
  ), d = a(
    "area,base,basefont,bgsound,br,col,colgroup,dd,dt,embed,frame,hr,img,input,isindex,keygen,li,link,menuitem,meta,options,p,param,source,td,tfoot,th,thead,tr,track,wbr,rect,circle,ellipse,line,polyline,polygon,path,stop,use,marker,animate,animatemotion,animatetransform,set,desc,title,feblend,fecolormatrix,fecomponenttransfer,fecomposite,feconvolvematrix,fediffuselighting,fedisplacementmap,fedropshadow,feflood,fegaussianblur,feimage,femerge,femorphology,feoffset,fespecularlighting,fetile,feturbulence,fedistantlight,fepointlight,fespotlight"
  ), u = a(
    "script,style"
  ), p = a(
    "checked,compact,declare,defer,disabled,ismap,multiple,nohref,noresize,noshade,nowrap,readonly,selected"
  );
  let c = function() {
  }, f = t.processStartTag || c, h = t.processEndTag || c, g = t.processText || c, y = t.processComment || c, m = [];
  m.last = function() {
    return this[this.length - 1];
  };
  let v = "", C = !1;
  function _() {
    v !== "" && (g(v, C), v = "");
  }
  function j(L, $) {
    v !== "" && $ !== C && _(), v += L, C = $;
  }
  function x(L, $, I, M) {
    if ($ = $.toLowerCase(), s[$])
      for (; m.last() != null && l[m.last()]; )
        w("", m.last());
    d[$] && m.last() === $ && w("", $);
    let S = i[$] || !!M;
    if (S || m.push($), f !== c) {
      let F = [];
      I.replace(r, function(N, X, ...Q) {
        let pe = Q[0] ? Q[0] : Q[1] ? Q[1] : Q[2] ? Q[2] : p[X] ? X : "";
        return F.push({
          Name: X,
          Value: pe,
          escapedValue: rd(pe)
        }), "";
      }), _(), f(
        $,
        F,
        S,
        m.length === (S ? 0 : 1)
      );
    }
    return "";
  }
  function w(L, $) {
    let I;
    if ($ == null)
      I = 0;
    else
      for ($ = $.toLowerCase(), I = m.length - 1; I >= 0 && m[I] !== $; I--)
        ;
    if (I >= 0) {
      _();
      for (let M = m.length - 1; M >= I; M--)
        h(m[M], M === 0);
      m.length = I;
    }
    return "";
  }
  let T = e;
  for (; e !== ""; ) {
    let L = !0;
    if (m.last() == null || !u[m.last()]) {
      if (e.startsWith("<!--")) {
        let $ = e.indexOf("-->", 4);
        $ > 0 && (_(), y(e.slice(4, $)), e = e.slice($ + 3), L = !1);
      } else if (e.startsWith("<?")) {
        let $ = e.indexOf("?>");
        $ >= 0 && (e = e.slice($ + 2), L = !1);
      } else if (e.startsWith("<!")) {
        let $ = e.indexOf(">");
        $ >= 0 && (e = e.slice($ + 1), L = !1);
      } else if (e.startsWith("</")) {
        let $ = e.match(o);
        $ != null && (e = e.slice($[0].length), $[0].replace(o, w), L = !1);
      } else if (e.startsWith("<")) {
        let $ = e.match(n);
        $ != null && (e = e.slice($[0].length), $[0].replace(n, x), L = !1);
      }
      if (L) {
        let $ = e.indexOf("<"), I = $ < 0 ? e : e.slice(0, $);
        e = $ < 0 ? "" : e.slice($), j(I, m.length === 0);
      }
    } else
      e = e.replace(
        new RegExp(`^((?:.|
)*?)<\\/` + m.last() + "[^>]*>", "i"),
        function($, I) {
          return I = I.replace(/<!--(.*?)-->/g, "$1").replace(/<!\[CDATA\[(.*?)]]>/g, "$1"), j(I, m.length === 0), "";
        }
      ), w("", m.last());
    if (e === T)
      switch (!0) {
        case e.startsWith("<"):
          e = e.slice(1), j("<", m.length === 0);
          break;
        default:
          throw new Error('HTMLParseError: could not parse "' + e + '"');
      }
    T = e;
  }
  _(), w();
}
function $w(e, t) {
  for (let n = 0, o = t.length; n < o; n++) {
    let r = t[n];
    if (r.Name === e)
      return r.Value;
  }
}
function jw(e, t, n) {
  let o = "<" + e;
  for (let r = 0, a = t.length; r < a; r++) {
    let i = t[r];
    o += " " + i.Name + '="' + i.escapedValue + '"';
  }
  return o + (n ? "/>" : ">");
}
function rd(e) {
  return e.replace(
    /[&<>"'\x00-\x1F\x7F-\x9F\\]/g,
    function(t) {
      switch (t) {
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
        case `
`:
          return `
`;
        // allows line feeds to be preserved
        case "\\":
          return "&#92;";
        default:
          let n = t.charCodeAt(0).toString(16);
          return "&#x0000".substring(0, 7 - n.length) + n + ";";
      }
    }
  );
}
function ad(e) {
  return e.replace(
    /&(amp|lt|gt|quot|apos|#92|#x[0-9a-fA-F]{1,6}|#[0-9]{1,7});/g,
    function(t) {
      switch (t) {
        case "&amp;":
          return "&";
        case "&lt;":
          return "<";
        case "&gt;":
          return ">";
        case "&quot;":
          return '"';
        case "&apos;":
          return "'";
        case "&#92;":
          return "\\";
        default:
          const o = t.charAt(2) === "x" || t.charAt(2) === "X" ? parseInt(t.slice(3, -1), 16) : parseInt(t.slice(2, -1), 10);
          return String.fromCodePoint(o);
      }
    }
  );
}
const Iw = {
  readFileAsText: Vo,
  readFileAsBinary: Bo,
  readFileAsDataURL: f0,
  HTMLasText: fi,
  HTMLasMarkdown: hi,
  HTMLFileReadAsText: h0,
  HTMLFileReadAsMarkdown: g0,
  MarkdownAsText: gi,
  MarkdownAsHTML: mi,
  MarkdownFileReadAsText: m0,
  MarkdownFileReadAsHTML: b0,
  DOCXasText: yi,
  DOCXasHTML: xi,
  DOCXasMarkdown: vi,
  DOCXFileReadAsText: y0,
  DOCXFileReadAsHTML: x0,
  DOCXFileReadAsMarkdown: v0,
  PDFasText: wi,
  PDFFileReadAsText: k0,
  HTMLtoText: od,
  HTMLtoMarkdown: ki,
  parseHTML: Ci,
  escapedHTMLAttribute: rd,
  unescapedHTMLAttribute: ad
};
function E(e, t, ...n) {
  if (an("callback description", e), Re("callback", t), t != null)
    try {
      return t(...n);
    } catch (o) {
      ce(`CallbackFailure: ${e} failed with ${"" + o}`);
    }
}
const Xe = E;
function C0(e) {
  return an("Textline", e), e.length === 0 ? e : e.charAt(0).toUpperCase() + e.slice(1);
}
export {
  Zc as AppletFailingWith,
  Qc as AppletView,
  gp as AsyncFunction,
  $w as AttributeFrom,
  yo as ColorSet,
  Uf as Customizable,
  x0 as DOCXFileReadAsHTML,
  v0 as DOCXFileReadAsMarkdown,
  y0 as DOCXFileReadAsText,
  xi as DOCXasHTML,
  vi as DOCXasMarkdown,
  yi as DOCXasText,
  $f as DefaultSwatchSet,
  Xa as Description,
  wl as DescriptionOfHTTPStatus,
  Yx as DeviceSupportsPassiveEvents,
  Jx as DeviceSupportsPointerEvents,
  Hu as DeviceSupportsTouchEvents,
  Yf as DialogBase,
  Sl as DirectionOfLocale,
  xh as Dummy,
  Sv as EnvironmentIsBrowser,
  Rp as EnvironmentIsTauri,
  Ph as FAIcon,
  Rh as Fineprint,
  lf as FlagEmojiForISOCode,
  gw as FlagEmojiForLocale,
  Fd as FunctionWithName,
  g0 as HTMLFileReadAsMarkdown,
  h0 as HTMLFileReadAsText,
  Nh as HTMLView,
  hi as HTMLasMarkdown,
  fi as HTMLasText,
  zu as HTMLsafe,
  ki as HTMLtoMarkdown,
  od as HTMLtoText,
  kl as HTTPMessageForStatus,
  Vu as HexColor,
  Zh as Icon,
  Hh as ImageView,
  Fp as InternetIsAvailable,
  a0 as JCL_AppletElement,
  bm as JCL_BitmapEditor,
  mm as JCL_BitmapEditorTools,
  Oa as JCL_DataDropEffects,
  Za as JCL_DatePattern,
  jg as JCL_DateRegExp,
  kg as JCL_DateTimePattern,
  Cg as JCL_DateTimeRegExp,
  qh as JCL_DefaultSandboxPermissions,
  Lr as JCL_DialogContext,
  Pf as JCL_DialogView,
  of as JCL_Directions,
  hm as JCL_DrawingEditor,
  fn as JCL_ErrorIndicator,
  Ya as JCL_FAIconNames,
  vf as JCL_HoverCapabilities,
  ql as JCL_ImageAlignments,
  Kl as JCL_ImageScalings,
  Qf as JCL_ModalLayer,
  Pa as JCL_MonthPattern,
  Dg as JCL_MonthRegExp,
  Dr as JCL_OverlayContext,
  ps as JCL_OverlayView,
  xf as JCL_PointerAccuracies,
  za as JCL_PointerDnDContext,
  Rf as JCL_PointerDropEffects,
  kf as JCL_PreferredContrasts,
  wf as JCL_PreferredMotions,
  ob as JCL_QRCodeECCLevels,
  Jy as JCL_QuarterPattern,
  Zy as JCL_QuarterRegExp,
  wt as JCL_RealDrawEditor,
  xm as JCL_RealDrawEditorTools,
  Xh as JCL_ReferrerPolicies,
  aw as JCL_SwatchKeys,
  Ll as JCL_Themes,
  xg as JCL_TimePattern,
  vg as JCL_TimeRegExp,
  Ua as JCL_ToastContext,
  Xf as JCL_Underlay,
  Qa as JCL_WeekPattern,
  _g as JCL_WeekRegExp,
  yt as JCL_empty,
  Up as JCL_mixedValues,
  Gp as JCL_noSelection,
  Sp as JCL_supportedHTMLFormats,
  Lp as JCL_supportedImageFormats,
  Dp as JCL_supportedMarkdownFormats,
  _p as JCL_supportedTextFormats,
  Dh as Label,
  Wx as MarkDownSafe,
  mi as MarkdownAsHTML,
  gi as MarkdownAsText,
  b0 as MarkdownFileReadAsHTML,
  m0 as MarkdownFileReadAsText,
  In as MarkdownRenderer,
  Ul as MarkdownView,
  Gt as MediaQueryMatches,
  Nu as ObjectIsEmpty,
  Gx as ObjectIsNotEmpty,
  S0 as ObjectMergedWith,
  jd as Object_hasOwnProperty,
  Id as Object_isPrototypeOf,
  j0 as Object_propertyIsEnumerable,
  I0 as Object_toLocaleString,
  _d as Object_toString,
  _0 as Object_valueOf,
  vw as OperationWasConfirmed,
  Kf as OverlayBase,
  k0 as PDFFileReadAsText,
  wi as PDFasText,
  Ei as PointerType,
  Gf as PseudoRef,
  qx as RGBAColor,
  Qn as RegExpForPattern,
  Uh as SVGView,
  be as SearXNG,
  vl as ServerIsReachable,
  wh as Spacer,
  Eu as StringIsEmpty,
  Ux as StringIsNotEmpty,
  Z as StylesheetInstallerFor,
  _h as Subtitle,
  p0 as TextFilledFrom,
  d0 as TextFromString,
  Oh as TextView,
  c0 as TextlineFromString,
  Mh as TextlineView,
  jh as Title,
  th as ToastBase,
  Ce as ValidatorForClassifier,
  D0 as ValueExists,
  T0 as ValueInheritsFrom,
  Ap as ValueIsAbortSignal,
  Ts as ValueIsAnonymousFunction,
  _o as ValueIsArray,
  rn as ValueIsBoolean,
  pa as ValueIsCardinal,
  Dn as ValueIsColor,
  zt as ValueIsDate,
  Jl as ValueIsDateTime,
  Co as ValueIsDimension,
  Bs as ValueIsE164PhoneNumber,
  Ln as ValueIsEMailAddress,
  M0 as ValueIsEmptyString,
  Es as ValueIsError,
  Kt as ValueIsFiniteNumber,
  Nt as ValueIsFunction,
  Jp as ValueIsGeometry,
  yv as ValueIsHTMLFormat,
  Cp as ValueIsISOLanguageCode,
  xp as ValueIsIdentifier,
  vv as ValueIsImageFormat,
  A0 as ValueIsInstanceOf,
  xr as ValueIsInteger,
  ua as ValueIsIntegerInRange,
  Ld as ValueIsList,
  dv as ValueIsListOfEMailAddresses,
  Ie as ValueIsListSatisfying,
  _l as ValueIsLocale,
  ko as ValueIsLocation,
  wo as ValueIsMIMEType,
  xv as ValueIsMarkdownFormat,
  L0 as ValueIsMissing,
  ei as ValueIsMonth,
  Ls as ValueIsNaN,
  Sa as ValueIsName,
  Rs as ValueIsNamedFunction,
  Fs as ValueIsNativeFunction,
  As as ValueIsNonEmptyString,
  bt as ValueIsNumber,
  Io as ValueIsNumberInRange,
  bo as ValueIsObject,
  he as ValueIsOneOf,
  pn as ValueIsOrdinal,
  bl as ValueIsPath,
  kr as ValueIsPhoneNumber,
  De as ValueIsPlainObject,
  Xp as ValueIsPosition,
  bn as ValueIsPreactRef,
  xl as ValueIsPromise,
  Qy as ValueIsQuarter,
  Vs as ValueIsRegExp,
  Os as ValueIsScriptedFunction,
  Yp as ValueIsSize,
  Je as ValueIsSpecial,
  at as ValueIsString,
  Ct as ValueIsStringMatching,
  Zr as ValueIsSwatch,
  ef as ValueIsSwatchSet,
  hn as ValueIsText,
  bv as ValueIsTextFormat,
  Mo as ValueIsTextWithTabs,
  Ne as ValueIsTextline,
  Yl as ValueIsTime,
  st as ValueIsURL,
  Xv as ValueIsVNode,
  zs as ValueIsVanillaObject,
  Zl as ValueIsWeek,
  Hx as ValuesAreEqual,
  er as ValuesDiffer,
  Yh as WebView,
  Gn as WorldPositionOfPort,
  Qe as acceptNil,
  Y as acceptableBoolean,
  gn as acceptableCardinal,
  St as acceptableColor,
  ew as acceptableEMailAddress,
  R as acceptableFunction,
  Qv as acceptableInteger,
  fr as acceptableIntegerInRange,
  nw as acceptableName,
  ow as acceptableNameOrIndex,
  qe as acceptableNumber,
  nn as acceptableNumberInRange,
  $e as acceptableOrdinal,
  rw as acceptablePath,
  tw as acceptablePhoneNumber,
  Mn as acceptableString,
  Pv as acceptableStringMatching,
  re as acceptableText,
  D as acceptableTextline,
  Fn as acceptableURL,
  z as acceptableValue,
  Cw as ai,
  Tp as allowAbortSignal,
  Pd as allowAnonymousFunction,
  du as allowArray,
  tn as allowBoolean,
  vr as allowCardinal,
  Lu as allowColor,
  Cu as allowDate,
  bw as allowDictionary,
  Dt as allowDimension,
  Ru as allowE164PhoneNumber,
  Au as allowEMailAddress,
  ju as allowError,
  Nd as allowFiniteNumber,
  Re as allowFunction,
  Gv as allowGeometry,
  $p as allowISOLanguageCode,
  Qx as allowIdentifier,
  yu as allowInstanceOf,
  Ud as allowInteger,
  Kd as allowIntegerInRange,
  fu as allowList,
  Wt as allowListSatisfying,
  pw as allowLocale,
  pr as allowLocation,
  hv as allowMIMEType,
  Vd as allowNaN,
  wp as allowName,
  tu as allowNamedFunction,
  ou as allowNativeFunction,
  Xd as allowNonEmptyString,
  zd as allowNumber,
  Wd as allowNumberInRange,
  su as allowObject,
  Ft as allowOneOf,
  Us as allowOrdinal,
  ov as allowPath,
  iv as allowPhoneNumber,
  ba as allowPlainObject,
  Ov as allowPosition,
  Yv as allowPreactRef,
  wv as allowPromise,
  _u as allowRegExp,
  au as allowScriptedFunction,
  Vv as allowSize,
  wr as allowString,
  Jd as allowStringMatching,
  iw as allowSwatch,
  tf as allowSwatchSet,
  Qd as allowText,
  un as allowTextline,
  Vn as allowURL,
  vu as allowValueInheritingFrom,
  lu as allowVanillaObject,
  jv as allowedAbortSignal,
  sx as allowedAnonymousFunction,
  wx as allowedArray,
  F0 as allowedBoolean,
  zi as allowedCardinal,
  Tx as allowedColor,
  Ix as allowedDate,
  yw as allowedDictionary,
  Tv as allowedDimension,
  Ex as allowedE164PhoneNumber,
  Fx as allowedEMailAddress,
  Sx as allowedError,
  E0 as allowedFiniteNumber,
  ax as allowedFunction,
  Uv as allowedGeometry,
  uv as allowedISOLanguageCode,
  Px as allowedIdentifier,
  $x as allowedInstanceOf,
  G0 as allowedInteger,
  K0 as allowedIntegerInRange,
  kx as allowedList,
  Cx as allowedListSatisfying,
  fw as allowedLocale,
  Lv as allowedLocation,
  gv as allowedMIMEType,
  B0 as allowedNaN,
  tv as allowedName,
  cx as allowedNamedFunction,
  ux as allowedNativeFunction,
  Q0 as allowedNonEmptyString,
  z0 as allowedNumber,
  H0 as allowedNumberInRange,
  gx as allowedObject,
  Ax as allowedOneOf,
  q0 as allowedOrdinal,
  rv as allowedPath,
  sv as allowedPhoneNumber,
  bx as allowedPlainObject,
  zv as allowedPosition,
  Jv as allowedPreactRef,
  kv as allowedPromise,
  Lx as allowedRegExp,
  fx as allowedScriptedFunction,
  Bv as allowedSize,
  J0 as allowedString,
  ex as allowedStringMatching,
  sw as allowedSwatch,
  dw as allowedSwatchSet,
  tx as allowedText,
  ox as allowedTextline,
  zx as allowedURL,
  jx as allowedValueInheritingFrom,
  xx as allowedVanillaObject,
  C0 as capitalized,
  qa as centered,
  To as coercedNumberSatisfying,
  Kx as constrained,
  Le as consumeEvent,
  wn as consumingEvent,
  ww as defineJCLApplet,
  Ke as escaped,
  rd as escapedHTMLAttribute,
  E as executeCallback,
  Xe as executedCallback,
  kh as expandingSpacer,
  Iv as expectAbortSignal,
  eu as expectAnonymousFunction,
  uu as expectArray,
  ga as expectBoolean,
  Ks as expectCardinal,
  Mu as expectColor,
  $u as expectDate,
  bf as expectDictionary,
  Rv as expectDimension,
  Fu as expectE164PhoneNumber,
  Tu as expectEMailAddress,
  Iu as expectError,
  Ed as expectFiniteNumber,
  Yt as expectFunction,
  Kv as expectGeometry,
  pv as expectISOLanguageCode,
  vp as expectIdentifier,
  So as expectInstanceOf,
  Hs as expectInteger,
  Gs as expectIntegerInRange,
  hu as expectList,
  mu as expectListSatisfying,
  Pn as expectLocale,
  Mv as expectLocation,
  Ip as expectMIMEType,
  Bd as expectNaN,
  _n as expectName,
  nu as expectNamedFunction,
  ru as expectNativeFunction,
  Yd as expectNonEmptyString,
  Ws as expectNumber,
  Hd as expectNumberInRange,
  Xs as expectObject,
  Bn as expectOneOf,
  Un as expectOrdinal,
  yl as expectPath,
  lv as expectPhoneNumber,
  It as expectPlainObject,
  Nv as expectPosition,
  jr as expectPreactRef,
  Cv as expectPromise,
  Su as expectRegExp,
  iu as expectScriptedFunction,
  Wv as expectSize,
  ma as expectString,
  qs as expectStringMatching,
  lw as expectSwatch,
  nf as expectSwatchSet,
  ot as expectText,
  an as expectTextline,
  ya as expectURL,
  Od as expectValue,
  wu as expectValueInheritingFrom,
  cu as expectVanillaObject,
  _v as expectedAbortSignal,
  lx as expectedAnonymousFunction,
  pu as expectedArray,
  O0 as expectedBoolean,
  Y0 as expectedCardinal,
  Rx as expectedColor,
  _x as expectedDate,
  xw as expectedDictionary,
  Fv as expectedDimension,
  Vx as expectedE164PhoneNumber,
  Ox as expectedEMailAddress,
  Dx as expectedError,
  V0 as expectedFiniteNumber,
  ix as expectedFunction,
  qv as expectedGeometry,
  fv as expectedISOLanguageCode,
  ev as expectedIdentifier,
  xu as expectedInstanceOf,
  U0 as expectedInteger,
  qd as expectedIntegerInRange,
  gu as expectedList,
  bu as expectedListSatisfying,
  hw as expectedLocale,
  Av as expectedLocation,
  mv as expectedMIMEType,
  W0 as expectedNaN,
  nv as expectedName,
  dx as expectedNamedFunction,
  px as expectedNativeFunction,
  P0 as expectedNonEmptyString,
  N0 as expectedNumber,
  Gd as expectedNumberInRange,
  mx as expectedObject,
  Du as expectedOneOf,
  X0 as expectedOrdinal,
  av as expectedPath,
  cv as expectedPhoneNumber,
  yx as expectedPlainObject,
  Ev as expectedPosition,
  Zv as expectedPreactRef,
  $v as expectedPromise,
  Mx as expectedRegExp,
  hx as expectedScriptedFunction,
  Hv as expectedSize,
  Z0 as expectedString,
  Zd as expectedStringMatching,
  cw as expectedSwatch,
  uw as expectedSwatchSet,
  nx as expectedText,
  rx as expectedTextline,
  Nx as expectedURL,
  R0 as expectedValue,
  ku as expectedValueInheritingFrom,
  vx as expectedVanillaObject,
  nd as fencedText,
  Et as fetched,
  Wp as fetchedAsHTML,
  Hp as fetchedAsMarkdown,
  Bp as fetchedAsText,
  Np as fetchedBinary,
  Ep as fetchedBlob,
  Vp as fetchedDataURL,
  zp as fetchedJSON,
  Op as fetchedText,
  ih as fullsized,
  $0 as global,
  ch as horizontal,
  Ch as horizontalSeparator,
  Na as installStylesheetFor,
  qg as legacyAccordionFold,
  ym as legacyBitmapEditor,
  Wm as legacyChatView,
  Mc as legacyChatViewAssistantExtra,
  Tc as legacyChatViewControls,
  Ac as legacyChatViewUserExtra,
  dm as legacyCodeEditor,
  Mm as legacyDataFlowProcessView,
  gm as legacyDrawingEditor,
  Hg as legacyFileDropArea,
  ec as legacyFlatListView,
  eb as legacyKanbanBoard,
  Qg as legacyNestedListView,
  $m as legacyNoteBoard,
  Bg as legacyPseudoDropDown,
  Eg as legacyPseudoFileInput,
  rb as legacyQRCodeView,
  wm as legacyRealDrawEditor,
  ac as legacyRichTextEditor,
  Ym as legacySpreadsheetEditor,
  Ug as legacyTabStrip,
  zo as loadMarkdownLibraries,
  ht as loadedLibrary,
  Bh as loadedMarkdownRenderer,
  Oo as memoizedLoader,
  Iw as misc,
  Me as missingProperty,
  tg as nativeButton,
  og as nativeCheckbox,
  Rg as nativeColorInput,
  Ig as nativeDateInput,
  $g as nativeDateTimeInput,
  Og as nativeDropDown,
  mg as nativeEMailAddressInput,
  Ag as nativeFileInput,
  sg as nativeGauge,
  Lg as nativeMonthInput,
  mw as nativeNameForLocale,
  gg as nativeNumberInput,
  hg as nativePasswordInput,
  bg as nativePhoneNumberInput,
  cg as nativeProgressbar,
  ag as nativeRadiobutton,
  Mg as nativeSearchInput,
  ug as nativeSlider,
  ti as nativeTextInput,
  fg as nativeTextlineInput,
  wg as nativeTimeInput,
  yg as nativeURLInput,
  Sg as nativeWeekInput,
  Dv as net,
  Zp as normalizedName,
  Ci as parseHTML,
  G as parseablePropSet,
  At as parsedOption,
  Zx as primaryInput,
  Ou as quotable,
  Lt as quoted,
  Bo as readFileAsBinary,
  f0 as readFileAsDataURL,
  Vo as readFileAsText,
  lm as registerCodeEditorLanguage,
  qm as registerSpreadsheetFormula,
  Xm as registerSpreadsheetFormulas,
  Ze as rejectNil,
  it as resolvedSpecialValue,
  H as safelyRendered,
  gh as selective,
  jw as serializedTag,
  Xx as shortHexColor,
  bh as stacked,
  ai as stickyHTMLNote,
  Lc as stickyMarkdownNote,
  Dc as stickyTextNote,
  Wy as styledAccordion,
  Hy as styledAccordionFold,
  Gb as styledAvatar,
  Nb as styledBadge,
  Ey as styledBreadcrumb,
  Fc as styledButton,
  sy as styledCard,
  dy as styledCardAction,
  uy as styledCardContent,
  hy as styledCardDescription,
  py as styledCardFooter,
  cy as styledCardHeader,
  fy as styledCardTitle,
  ca as styledCheckbox,
  Ib as styledColorInput,
  Ay as styledCombobox,
  ry as styledCommandGroup,
  oy as styledCommandItem,
  ny as styledCommandPalette,
  qy as styledDataTable,
  kb as styledDateInput,
  Fy as styledDatePicker,
  wb as styledDateTimeInput,
  Sb as styledDropDown,
  Jb as styledDropDownMenu,
  Pb as styledDropDownMenuGroup,
  Zb as styledDropDownMenuItem,
  Qb as styledDropDownMenuSeparator,
  ey as styledDropDownMenuSubMenu,
  bb as styledEMailAddressInput,
  Ob as styledFAIcon,
  Cy as styledField,
  Lb as styledFileInput,
  lb as styledGauge,
  Rb as styledIcon,
  jy as styledInputGroup,
  Iy as styledInputGroupAddon,
  Wb as styledKbd,
  $b as styledMonthInput,
  pi as styledMonthView,
  Hc as styledMultiSwitch,
  mb as styledNumberInput,
  Uc as styledPagination,
  gb as styledPasswordInput,
  yb as styledPhoneNumberInput,
  Ec as styledPopover,
  db as styledProgressbar,
  t0 as styledQuarterView,
  Ly as styledRadioGroup,
  Oc as styledRadiobutton,
  jb as styledSearchInput,
  gy as styledSidebar,
  yy as styledSidebarContent,
  xy as styledSidebarFooter,
  ky as styledSidebarGroup,
  by as styledSidebarHeader,
  vy as styledSidebarItem,
  wy as styledSidebarSeparator,
  Kb as styledSkeleton,
  pb as styledSlider,
  Vb as styledSpinner,
  _y as styledSwitch,
  zy as styledTabStrip,
  Kc as styledTable,
  Xc as styledTableBody,
  ir as styledTableCell,
  Ky as styledTableFooter,
  da as styledTableHead,
  qc as styledTableHeader,
  ar as styledTableRow,
  Ab as styledTextInput,
  hb as styledTextlineInput,
  Dy as styledThemeSwitch,
  vb as styledTimeInput,
  ay as styledToast,
  Nc as styledTooltip,
  xb as styledURLInput,
  Cb as styledWeekInput,
  o0 as styledYearView,
  fh as tabular,
  ce as throwError,
  bp as throwReadOnlyError,
  kw as ui,
  Bx as unescaped,
  ad as unescapedHTMLAttribute,
  u0 as unfencedText,
  Bf as uninstallStylesheetFor,
  to as useClickDragging,
  Lf as useConfiguration,
  Sr as useCustomization,
  Af as useDataDragSupport,
  Tf as useDataDropSupport,
  vn as useDatalist,
  oo as useDialogContext,
  An as useDragging,
  Ef as useFileDropSupport,
  Ot as useHybridValue,
  Df as useI18n,
  xn as useInputCallbacks,
  eo as useLibraries,
  Tl as useMeasuredPaneSize,
  _f as useOnlineStatus,
  no as useOverlayContext,
  Ff as usePointerDragSupport,
  Of as usePointerDropSupport,
  dt as useRerenderer,
  yn as useShownValue,
  Ka as useToastContext,
  Sf as useWindowSize,
  Rd as validatedArgument,
  uh as vertical,
  $h as verticalSeparator
};
//# sourceMappingURL=javascript-code-library.esm.js.map
