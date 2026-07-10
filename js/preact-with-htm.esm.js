var n$1, l$2, u$2, t$3, i$2, r$1, f$2, e$2, o$2, c$2, s$2, h$2, a$2 = {}, p$2 = [], y$2 = /(mi|mn|mo|ms$|mte|msp)/, v$2 = Array.isArray, w$2 = p$2.slice, d$1 = Object.assign;
function g$2(n2) {
  n2 && n2.parentNode && n2.remove();
}
function _$1(n2, l2, u2) {
  var t2, i2, r2, f2 = {};
  for (r2 in l2) "key" == r2 ? t2 = l2[r2] : "ref" == r2 && "function" != typeof n2 ? i2 = l2[r2] : f2[r2] = l2[r2];
  return arguments.length > 2 && (f2.children = arguments.length > 3 ? w$2.call(arguments, 2) : u2), m$3(n2, f2, t2, i2, null);
}
function m$3(u2, t2, i2, r2, f2) {
  var e2 = { type: u2, props: t2, key: i2, ref: r2, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: null == f2 ? ++l$2 : f2, __i: -1, __u: 0 };
  return null == f2 && null != n$1.vnode && n$1.vnode(e2), e2;
}
function b$2() {
  return { current: null };
}
function k$3(n2) {
  return n2.children;
}
function M(n2, l2) {
  this.props = n2, this.context = l2, this.__g = 0;
}
function $(n2, l2) {
  if (null == l2) return n2.__ ? $(n2.__, n2.__i + 1) : null;
  for (var u2; l2 < n2.__k.length; l2++) if (null != (u2 = n2.__k[l2]) && null != u2.__e) return u2.__e;
  return "function" == typeof n2.type ? $(n2) : null;
}
function S(n2) {
  var l2, u2;
  if (null != (n2 = n2.__) && null != n2.__c) {
    for (n2.__e = null, l2 = 0; l2 < n2.__k.length; l2++) if (null != (u2 = n2.__k[l2]) && null != u2.__e) {
      n2.__e = u2.__e;
      break;
    }
    return S(n2);
  }
}
function x$1(l2) {
  (8 & l2.__g || !(l2.__g |= 8) || !t$3.push(l2) || r$1++) && i$2 == n$1.debounceRendering || ((i$2 = n$1.debounceRendering) || queueMicrotask)(C$1);
}
function C$1() {
  for (var l2, u2, i2, e2, o2, c2, s2, h2, a2 = 1; t$3.length; ) t$3.length > a2 && t$3.sort(f$2), l2 = t$3.shift(), a2 = t$3.length, 8 & l2.__g && (i2 = void 0, e2 = void 0, o2 = (e2 = (u2 = l2).__v).__e, c2 = [], s2 = [], (h2 = u2.__P) && ((i2 = d$1({}, e2)).__v = e2.__v + 1, n$1.vnode && n$1.vnode(i2), N$1(h2, i2, e2, u2.__n, h2.namespaceURI, 32 & e2.__u ? [o2] : null, c2, null == o2 ? $(e2) : o2, !!(32 & e2.__u), s2, h2.ownerDocument), i2.__v = e2.__v, i2.__.__k[i2.__i] = i2, V$1(c2, i2, s2), e2.__ = e2.__e = null, i2.__e != o2 && S(i2)));
  r$1 = 0;
}
function L(n2, l2, u2, t2, i2, r2, f2, e2, o2, c2, s2, h2) {
  var y2, v2, w2, d2, g2, _2, m2, b2 = t2 && t2.__k || p$2, k2 = l2.length;
  for (o2 = j$2(u2, l2, b2, o2, k2), y2 = 0; y2 < k2; y2++) null != (w2 = u2.__k[y2]) && (v2 = -1 == w2.__i ? a$2 : b2[w2.__i] || a$2, w2.__i = y2, _2 = N$1(n2, w2, v2, i2, r2, f2, e2, o2, c2, s2, h2), d2 = w2.__e, w2.ref && v2.ref != w2.ref && (v2.ref && D$1(v2.ref, null, w2), s2.push(w2.ref, w2.__c || d2, w2)), null == g2 && null != d2 && (g2 = d2), (m2 = 4 & w2.__u) || v2.__k === w2.__k ? o2 = A$1(w2, o2, n2, m2) : "function" == typeof w2.type && void 0 !== _2 ? o2 = _2 : d2 && (o2 = d2.nextSibling), w2.__u &= -7);
  return u2.__e = g2, o2;
}
function j$2(n2, l2, u2, t2, i2) {
  var r2, f2, e2, o2, c2, s2 = u2.length, h2 = s2, a2 = 0;
  for (n2.__k = new Array(i2), r2 = 0; r2 < i2; r2++) null != (f2 = l2[r2]) && "boolean" != typeof f2 && "function" != typeof f2 ? ("string" == typeof f2 || "number" == typeof f2 || "bigint" == typeof f2 || f2.constructor == String ? f2 = n2.__k[r2] = m$3(null, f2, null, null, null) : v$2(f2) ? f2 = n2.__k[r2] = m$3(k$3, { children: f2 }, null, null, null) : null == f2.constructor && f2.__b > 0 ? f2 = n2.__k[r2] = m$3(f2.type, f2.props, f2.key, f2.ref ? f2.ref : null, f2.__v) : n2.__k[r2] = f2, o2 = r2 + a2, f2.__ = n2, f2.__b = n2.__b + 1, e2 = null, -1 != (c2 = f2.__i = I$1(f2, u2, o2, h2)) && (h2--, (e2 = u2[c2]) && (e2.__u |= 2)), null == e2 || null == e2.__v ? (-1 == c2 && (i2 > s2 ? a2-- : i2 < s2 && a2++), "function" != typeof f2.type && (f2.__u |= 4)) : c2 != o2 && (c2 == o2 - 1 ? a2-- : c2 == o2 + 1 ? a2++ : (c2 > o2 ? a2-- : a2++, f2.__u |= 4))) : n2.__k[r2] = null;
  if (h2) for (r2 = 0; r2 < s2; r2++) null != (e2 = u2[r2]) && 0 == (2 & e2.__u) && (e2.__e == t2 && (t2 = $(e2)), E$1(e2, e2));
  return t2;
}
function A$1(n2, l2, u2, t2) {
  var i2, r2;
  if ("function" == typeof n2.type) {
    for (i2 = n2.__k, r2 = 0; i2 && r2 < i2.length; r2++) i2[r2] && (i2[r2].__ = n2, l2 = A$1(i2[r2], l2, u2, t2));
    return l2;
  }
  n2.__e != l2 && (t2 && (l2 && n2.type && !l2.parentNode && (l2 = $(n2)), u2.insertBefore(n2.__e, l2 || null)), l2 = n2.__e);
  do {
    l2 = l2 && l2.nextSibling;
  } while (null != l2 && 8 == l2.nodeType);
  return l2;
}
function H$1(n2, l2) {
  return l2 = l2 || [], null == n2 || "boolean" == typeof n2 || (v$2(n2) ? n2.some(function(n3) {
    H$1(n3, l2);
  }) : l2.push(n2)), l2;
}
function I$1(n2, l2, u2, t2) {
  var i2, r2, f2, e2 = n2.key, o2 = n2.type, c2 = l2[u2], s2 = null != c2 && 0 == (2 & c2.__u);
  if (null === c2 && null == e2 || s2 && e2 == c2.key && o2 == c2.type) return u2;
  if (t2 > (s2 ? 1 : 0)) {
    for (i2 = u2 - 1, r2 = u2 + 1; i2 >= 0 || r2 < l2.length; ) if (null != (c2 = l2[f2 = i2 >= 0 ? i2-- : r2++]) && 0 == (2 & c2.__u) && e2 == c2.key && o2 == c2.type) return f2;
  }
  return -1;
}
function O$2(n2, l2, u2) {
  "-" == l2[0] ? n2.setProperty(l2, null == u2 ? "" : u2) : n2[l2] = null == u2 ? "" : u2;
}
function T$2(n2, l2, u2, t2, i2) {
  var r2;
  n: if ("style" == l2) if ("string" == typeof u2) n2.style.cssText = u2;
  else {
    if ("string" == typeof t2 && (n2.style.cssText = t2 = ""), t2) for (l2 in t2) u2 && l2 in u2 || O$2(n2.style, l2, "");
    if (u2) for (l2 in u2) t2 && u2[l2] == t2[l2] || O$2(n2.style, l2, u2[l2]);
  }
  else if ("o" == l2[0] && "n" == l2[1]) r2 = l2 != (l2 = l2.replace(e$2, "$1")), (l2 = l2.slice(2))[0].toLowerCase() != l2[0] && (l2 = l2.toLowerCase()), n2.__l || (n2.__l = {}), n2.__l[l2 + r2] = u2, u2 ? t2 ? u2.l = t2.l : (u2.l = o$2, n2.addEventListener(l2, r2 ? s$2 : c$2, r2)) : n2.removeEventListener(l2, r2 ? s$2 : c$2, r2);
  else {
    if ("http://www.w3.org/2000/svg" == i2) l2 = l2.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
    else if ("width" != l2 && "height" != l2 && "href" != l2 && "list" != l2 && "form" != l2 && "tabIndex" != l2 && "download" != l2 && "rowSpan" != l2 && "colSpan" != l2 && "role" != l2 && "popover" != l2 && l2 in n2) try {
      n2[l2] = null == u2 ? "" : u2;
      break n;
    } catch (n3) {
    }
    "function" == typeof u2 || (null == u2 || false === u2 && "-" != l2[4] ? n2.removeAttribute(l2) : n2.setAttribute(l2, "popover" == l2 && 1 == u2 ? "" : u2));
  }
}
function q$2(l2) {
  return function(u2) {
    if (this.__l) {
      var t2 = this.__l[u2.type + l2];
      if (null == u2.u) u2.u = o$2++;
      else if (u2.u < t2.l) return;
      return t2(n$1.event ? n$1.event(u2) : u2);
    }
  };
}
function N$1(l2, u2, t2, i2, r2, f2, e2, o2, c2, s2, h2) {
  var a2, p2, y2, w2, _2, m2, b2, $2, S2, x2, C2, j2, A2, H2, I2, O2, T2, q2, N2 = u2.type;
  if (null != u2.constructor) return null;
  128 & t2.__u && (c2 = 32 & t2.__u) && t2.__c.__z && (o2 = (f2 = t2.__c.__z)[0], t2.__c.__z = null), (a2 = n$1.__b) && a2(u2);
  n: if ("function" == typeof N2) try {
    if (m2 = u2.props, b2 = "prototype" in N2 && N2.prototype.render, $2 = (a2 = N2.contextType) && i2[a2.__c], S2 = a2 ? $2 ? $2.props.value : a2.__ : i2, t2.__c ? 2 & (p2 = u2.__c = t2.__c).__g && (p2.__g |= 1) : (b2 ? u2.__c = p2 = new N2(m2, S2) : (u2.__c = p2 = new M(m2, S2), p2.constructor = N2, p2.render = F$1), $2 && $2.sub(p2), p2.props = m2, p2.state || (p2.state = {}), p2.context = S2, p2.__n = i2, p2.__g |= 8, p2.__h = [], p2._sb = []), b2 && null == p2.__s && (p2.__s = p2.state), b2 && null != N2.getDerivedStateFromProps && (p2.__s == p2.state && (p2.__s = d$1({}, p2.__s)), d$1(p2.__s, N2.getDerivedStateFromProps(m2, p2.__s))), y2 = p2.props, w2 = p2.state, p2.__v = u2, t2.__c) {
      if (b2 && null == N2.getDerivedStateFromProps && m2 !== y2 && null != p2.componentWillReceiveProps && p2.componentWillReceiveProps(m2, S2), !(4 & p2.__g) && null != p2.shouldComponentUpdate && false === p2.shouldComponentUpdate(m2, p2.__s, S2) || u2.__v == t2.__v) {
        for (u2.__v != t2.__v && (p2.props = m2, p2.state = p2.__s, p2.__g &= -9), u2.__e = t2.__e, u2.__k = t2.__k, u2.__k.some(function(n2) {
          n2 && (n2.__ = u2);
        }), x2 = 0; x2 < p2._sb.length; x2++) p2.__h.push(p2._sb[x2]);
        p2._sb = [], p2.__h.length && e2.push(p2);
        break n;
      }
      null != p2.componentWillUpdate && p2.componentWillUpdate(m2, p2.__s, S2), b2 && null != p2.componentDidUpdate && p2.__h.push(function() {
        p2.componentDidUpdate(y2, w2, _2);
      });
    } else b2 && null == N2.getDerivedStateFromProps && null != p2.componentWillMount && p2.componentWillMount(), b2 && null != p2.componentDidMount && p2.__h.push(p2.componentDidMount);
    if (p2.context = S2, p2.props = m2, p2.__P = l2, p2.__g &= -5, C2 = n$1.__r, j2 = 0, b2) {
      for (p2.state = p2.__s, p2.__g &= -9, C2 && C2(u2), a2 = p2.render(p2.props, p2.state, p2.context), A2 = 0; A2 < p2._sb.length; A2++) p2.__h.push(p2._sb[A2]);
      p2._sb = [];
    } else do {
      p2.__g &= -9, C2 && C2(u2), a2 = p2.render(p2.props, p2.state, p2.context), p2.state = p2.__s;
    } while (8 & p2.__g && ++j2 < 25);
    p2.state = p2.__s, null != p2.getChildContext && (i2 = d$1({}, i2, p2.getChildContext())), b2 && t2.__c && null != p2.getSnapshotBeforeUpdate && (_2 = p2.getSnapshotBeforeUpdate(y2, w2)), null != a2 && a2.type === k$3 && null == a2.key && (a2 = z$2(a2.props.children)), o2 = L(l2, v$2(a2) ? a2 : [a2], u2, t2, i2, r2, f2, e2, o2, c2, s2, h2), u2.__u &= -161, p2.__h.length && e2.push(p2), 2 & p2.__g && (p2.__g &= -4);
  } catch (l3) {
    if (u2.__v = null, c2 || null != f2) if (l3.then) {
      for (H2 = 0, u2.__u |= c2 ? 160 : 128, u2.__c.__z = [], O2 = 0; O2 < f2.length; O2++) null == (T2 = f2[O2]) || I2 || (8 == T2.nodeType ? ("$s" == T2.data ? (H2 && u2.__c.__z.push(T2), H2++) : "/$s" == T2.data && (--H2 && u2.__c.__z.push(T2), I2 = 0 == H2, o2 = f2[O2]), f2[O2] = null) : H2 && (u2.__c.__z.push(T2), f2[O2] = null));
      if (!I2) {
        for (; o2 && 8 == o2.nodeType && o2.nextSibling; ) o2 = o2.nextSibling;
        f2[f2.indexOf(o2)] = null, u2.__c.__z = [o2];
      }
      u2.__e = o2;
    } else {
      for (q2 = f2.length; q2--; ) g$2(f2[q2]);
      P$2(u2);
    }
    else u2.__e = t2.__e, u2.__k = t2.__k, l3.then || P$2(u2);
    n$1.__e(l3, u2, t2);
  }
  else o2 = u2.__e = B$2(t2.__e, u2, t2, i2, r2, f2, e2, c2, s2, h2);
  return (a2 = n$1.diffed) && a2(u2), 128 & u2.__u ? void 0 : o2;
}
function P$2(n2) {
  n2 && n2.__c && (n2.__c.__g |= 4), n2 && n2.__k && n2.__k.forEach(P$2);
}
function V$1(l2, u2, t2) {
  for (var i2 = 0; i2 < t2.length; i2++) D$1(t2[i2], t2[++i2], t2[++i2]);
  n$1.__c && n$1.__c(u2, l2), l2.some(function(u3) {
    try {
      l2 = u3.__h, u3.__h = [], l2.some(function(n2) {
        n2.call(u3);
      });
    } catch (l3) {
      n$1.__e(l3, u3.__v);
    }
  });
}
function z$2(n2) {
  return "object" != typeof n2 || null == n2 || n2.__b && n2.__b > 0 ? n2 : v$2(n2) ? n2.map(z$2) : d$1({}, n2);
}
function B$2(l2, u2, t2, i2, r2, f2, e2, o2, c2, s2) {
  var h2, p2, d2, _2, m2, b2, k2, M2, S2 = t2.props, x2 = u2.props, C2 = u2.type;
  if ("svg" == C2 ? r2 = "http://www.w3.org/2000/svg" : "math" == C2 ? r2 = "http://www.w3.org/1998/Math/MathML" : r2 || (r2 = "http://www.w3.org/1999/xhtml"), null != f2) {
    for (h2 = 0; h2 < f2.length; h2++) if ((m2 = f2[h2]) && "setAttribute" in m2 == !!C2 && (C2 ? m2.localName == C2 : 3 == m2.nodeType)) {
      l2 = m2, f2[h2] = null;
      break;
    }
  }
  if (null == l2) {
    if (null == C2) return s2.createTextNode(x2);
    l2 = s2.createElementNS(r2, C2, x2.is && x2), o2 && (n$1.__m && n$1.__m(u2, f2), o2 = false), f2 = null;
  }
  if (null == C2) S2 === x2 || o2 && l2.data == x2 || (l2.data = x2);
  else {
    if (f2 = f2 && w$2.call(l2.childNodes), S2 = t2.props || a$2, !o2 && null != f2) for (S2 = {}, h2 = 0; h2 < l2.attributes.length; h2++) S2[(m2 = l2.attributes[h2]).name] = m2.value;
    for (h2 in S2) if (m2 = S2[h2], "children" == h2) ;
    else if ("dangerouslySetInnerHTML" == h2) d2 = m2;
    else if (!(h2 in x2)) {
      if ("value" == h2 && "defaultValue" in x2 || "checked" == h2 && "defaultChecked" in x2) continue;
      T$2(l2, h2, null, m2, r2);
    }
    for (h2 in M2 = 1 & t2.__u, x2) m2 = x2[h2], "children" == h2 ? _2 = m2 : "dangerouslySetInnerHTML" == h2 ? p2 = m2 : "value" == h2 ? b2 = m2 : "checked" == h2 ? k2 = m2 : o2 && "function" != typeof m2 || S2[h2] === m2 && !M2 || T$2(l2, h2, m2, S2[h2], r2);
    if (p2) o2 || d2 && (p2.__html == d2.__html || p2.__html == l2.innerHTML) || (l2.innerHTML = p2.__html), u2.__k = [];
    else if (d2 && (l2.innerHTML = ""), ("foreignObject" == C2 || "http://www.w3.org/1998/Math/MathML" == r2 && y$2.test(C2)) && (r2 = "http://www.w3.org/1999/xhtml"), L("template" == C2 ? l2.content : l2, v$2(_2) ? _2 : [_2], u2, t2, i2, r2, f2, e2, f2 ? f2[0] : t2.__k && $(t2, 0), o2, c2, s2), null != f2) for (h2 = f2.length; h2--; ) g$2(f2[h2]);
    o2 || (h2 = "value", "progress" == C2 && null == b2 ? l2.removeAttribute("value") : null == b2 || b2 === l2[h2] && ("progress" !== C2 || b2) || T$2(l2, h2, b2, S2[h2], r2), h2 = "checked", null != k2 && k2 != l2[h2] && T$2(l2, h2, k2, S2[h2], r2));
  }
  return l2;
}
function D$1(l2, u2, t2) {
  try {
    "function" == typeof l2 ? ("function" == typeof l2.__u && l2.__u(), "function" == typeof l2.__u && null == u2 || (l2.__u = l2(u2))) : l2.current = u2;
  } catch (l3) {
    n$1.__e(l3, t2);
  }
}
function E$1(l2, u2, t2) {
  var i2, r2;
  if (n$1.unmount && n$1.unmount(l2), !(i2 = l2.ref) || i2.current && i2.current != l2.__e || D$1(i2, null, u2), null != (i2 = l2.__c)) {
    if (i2.componentWillUnmount) try {
      i2.componentWillUnmount();
    } catch (l3) {
      n$1.__e(l3, u2);
    }
    i2.__P = null;
  }
  if (i2 = l2.__k) for (r2 = 0; r2 < i2.length; r2++) i2[r2] && E$1(i2[r2], u2, t2 || "function" != typeof l2.type);
  t2 || g$2(l2.__e), l2.__e && l2.__e.__l && (l2.__e.__l = null), l2.__e = l2.__c = l2.__ = null;
}
function F$1(n2, l2, u2) {
  return this.constructor(n2, u2);
}
function G$1(l2, u2) {
  var t2, i2, r2, f2;
  u2 == document && (u2 = document.documentElement), n$1.__ && n$1.__(l2, u2), i2 = (t2 = l2 && 32 & l2.__u) ? null : u2.__k, u2.__k = _$1(k$3, null, [l2]), r2 = [], f2 = [], N$1(u2, u2.__k, i2 || a$2, a$2, u2.namespaceURI, i2 ? null : u2.firstChild ? w$2.call(u2.childNodes) : null, r2, i2 ? i2.__e : u2.firstChild, t2, f2, u2.ownerDocument), V$1(r2, u2.__k, f2);
}
function J(n2, l2) {
  n2.__u |= 32, G$1(n2, l2);
}
function K(n2, l2, u2) {
  var t2, i2, r2, f2 = d$1({}, n2.props);
  for (r2 in l2) "key" == r2 ? t2 = l2[r2] : "ref" == r2 && "function" != typeof n2.type ? i2 = l2[r2] : f2[r2] = l2[r2];
  return arguments.length > 2 && (f2.children = arguments.length > 3 ? w$2.call(arguments, 2) : u2), m$3(n2.type, f2, t2 || n2.key, i2 || n2.ref, null);
}
function Q$1(n2) {
  function l2(n3) {
    var u2, t2;
    return this.getChildContext || (u2 = /* @__PURE__ */ new Set(), (t2 = {})[l2.__c] = this, this.getChildContext = function() {
      return t2;
    }, this.componentWillUnmount = function() {
      u2 = null;
    }, this.shouldComponentUpdate = function(n4) {
      this.props.value != n4.value && u2.forEach(function(n5) {
        n5.__g |= 4, x$1(n5);
      });
    }, this.sub = function(n4) {
      u2.add(n4);
      var l3 = n4.componentWillUnmount;
      n4.componentWillUnmount = function() {
        u2 && u2.delete(n4), l3 && l3.call(n4);
      };
    }), n3.children;
  }
  return l2.__c = "__cC" + h$2++, l2.__ = n2, l2.Provider = l2.__l = (l2.Consumer = function(n3, l3) {
    return n3.children(l3);
  }).contextType = l2, l2;
}
n$1 = { __e: function(n2, l2, u2, t2) {
  for (var i2, f2, e2; l2 = l2.__; ) if ((i2 = l2.__c) && !(1 & i2.__g)) {
    i2.__g |= 4;
    try {
      if ((f2 = i2.constructor) && null != f2.getDerivedStateFromError && (i2.setState(f2.getDerivedStateFromError(n2)), e2 = 8 & i2.__g), null != i2.componentDidCatch && (i2.componentDidCatch(n2, t2 || {}), e2 = 8 & i2.__g), e2) return void (i2.__g |= 2);
    } catch (l3) {
      n2 = l3;
    }
  }
  throw r$1 = 0, n2;
} }, l$2 = 0, u$2 = function(n2) {
  return null != n2 && null == n2.constructor;
}, M.prototype.setState = function(n2, l2) {
  var u2;
  u2 = null != this.__s && this.__s != this.state ? this.__s : this.__s = d$1({}, this.state), "function" == typeof n2 && (n2 = n2(d$1({}, u2), this.props)), n2 && (d$1(u2, n2), this.__v && (l2 && this._sb.push(l2), x$1(this)));
}, M.prototype.forceUpdate = function(n2) {
  this.__v && (this.__g |= 4, n2 && this.__h.push(n2), x$1(this));
}, M.prototype.render = k$3, t$3 = [], r$1 = 0, f$2 = function(n2, l2) {
  return n2.__v.__b - l2.__v.__b;
}, e$2 = /(PointerCapture)$|Capture$/i, o$2 = 0, c$2 = q$2(false), s$2 = q$2(true), h$2 = 0;
var t$2;
null != (t$2 = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : void 0) && t$2.__PREACT_DEVTOOLS__ && t$2.__PREACT_DEVTOOLS__.attachPreact("11.0.0-beta.0", n$1, { Fragment: k$3, Component: M });
var o$1 = {};
function a$1(e2) {
  return e2.type === k$3 ? "Fragment" : "function" == typeof e2.type ? e2.type.displayName || e2.type.name : "string" == typeof e2.type ? e2.type : "#text";
}
var i$1 = [], s$1 = [], c$1 = /* @__PURE__ */ new WeakMap();
function l$1() {
  return i$1.length > 0 ? i$1[i$1.length - 1] : null;
}
var u$1 = true;
function f$1(e2) {
  return "function" == typeof e2.type && e2.type != k$3;
}
function p$1(n2) {
  for (var e2 = [n2], t2 = n2; null != (t2 = c$1.get(t2)); ) e2.push(t2);
  return e2.reduce(function(n3, e3) {
    n3 += "  in " + a$1(e3);
    var t3 = e3.__source;
    return t3 ? n3 += " (at " + t3.fileName + ":" + t3.lineNumber + ")" : u$1 && console.warn("Add @babel/plugin-transform-react-jsx-source to get a more detailed component stack. Note that you should not add it to production builds of your App for bundle size reasons."), u$1 = false, n3 + "\n";
  }, "");
}
var h$1 = ["ref"], v$1 = "function" == typeof WeakMap;
function y$1(n2) {
  var e2 = [];
  return n2.__k ? (n2.__k.forEach(function(n3) {
    n3 && "function" == typeof n3.type ? e2.push.apply(e2, y$1(n3)) : n3 && "string" == typeof n3.type && e2.push(n3.type);
  }), e2) : e2;
}
function m$2(n2) {
  return n2 ? "function" == typeof n2.type ? null == n2.__ ? null != n2.__e && null != n2.__e.parentNode ? n2.__e.parentNode.localName : "" : m$2(n2.__) : n2.type : "";
}
var b$1 = M.prototype.setState;
function w$1(n2) {
  return "table" === n2 || "tfoot" === n2 || "tbody" === n2 || "thead" === n2 || "td" === n2 || "tr" === n2 || "th" === n2;
}
M.prototype.setState = function(n2, e2) {
  return null == this.__v && null == this.state && console.warn('Calling "this.setState" inside the constructor of a component is a no-op and might be a bug in your application. Instead, set "this.state = {}" directly.\n\n' + p$1(l$1())), b$1.call(this, n2, e2);
};
var g$1 = /^(address|article|aside|blockquote|details|div|dl|fieldset|figcaption|figure|footer|form|h1|h2|h3|h4|h5|h6|header|hgroup|hr|main|menu|nav|ol|p|pre|search|section|table|ul)$/, E = M.prototype.forceUpdate;
function k$2(n2) {
  var e2 = n2.props, t2 = a$1(n2), o2 = "";
  for (var r2 in e2) if (e2.hasOwnProperty(r2) && "children" !== r2) {
    var i2 = e2[r2];
    "function" == typeof i2 && (i2 = "function " + (i2.displayName || i2.name) + "() {}"), i2 = Object(i2) !== i2 || i2.toString ? i2 + "" : Object.prototype.toString.call(i2), o2 += " " + r2 + "=" + JSON.stringify(i2);
  }
  var s2 = e2.children;
  return "<" + t2 + o2 + (s2 && s2.length ? ">..</" + t2 + ">" : " />");
}
M.prototype.forceUpdate = function(n2) {
  return null == this.__v ? console.warn('Calling "this.forceUpdate" inside the constructor of a component is a no-op and might be a bug in your application.\n\n' + p$1(l$1())) : null == this.__P && console.warn(`Can't call "this.forceUpdate" on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in the componentWillUnmount method.

` + p$1(this.__v)), E.call(this, n2);
}, n$1.__m = function(n2, e2) {
  var t2 = n2.type, o2 = e2.map(function(n3) {
    return n3 && n3.localName;
  }).filter(Boolean);
  console.error('Expected a DOM node of type "' + t2 + '" but found "' + o2.join(", ") + `" as available DOM-node(s), this is caused by the SSR'd HTML containing different DOM-nodes compared to the hydrated one.

` + p$1(n2));
}, function() {
  !function() {
    var n3 = n$1.__b, t3 = n$1.diffed, o2 = n$1.__, r3 = n$1.vnode, a2 = n$1.__r;
    n$1.diffed = function(n4) {
      f$1(n4) && s$1.pop(), i$1.pop(), t3 && t3(n4);
    }, n$1.__b = function(e2) {
      f$1(e2) && i$1.push(e2), n3 && n3(e2);
    }, n$1.__ = function(n4, e2) {
      s$1 = [], o2 && o2(n4, e2);
    }, n$1.vnode = function(n4) {
      c$1.set(n4, s$1.length > 0 ? s$1[s$1.length - 1] : null), r3 && r3(n4);
    }, n$1.__r = function(n4) {
      f$1(n4) && s$1.push(n4), a2 && a2(n4);
    };
  }();
  var n2 = false, t2 = n$1.__b, r2 = n$1.diffed, l2 = n$1.vnode, u2 = n$1.__r, d2 = n$1.__e, b2 = n$1.__, E2 = n$1.__h, T2 = v$1 ? { useEffect: /* @__PURE__ */ new WeakMap(), useLayoutEffect: /* @__PURE__ */ new WeakMap(), lazyPropTypes: /* @__PURE__ */ new WeakMap() } : null, _2 = [];
  n$1.__e = function(n3, e2, t3, o2) {
    if (e2 && e2.__c && "function" == typeof n3.then) {
      var r3 = n3;
      n3 = new Error("Missing Suspense. The throwing component was: " + a$1(e2));
      for (var i2 = e2; i2; i2 = i2.__) if (i2.__c && i2.__c.__c) {
        n3 = r3;
        break;
      }
      if (n3 instanceof Error) throw n3;
    }
    try {
      (o2 = o2 || {}).componentStack = p$1(e2), d2(n3, e2, t3, o2), "function" != typeof n3.then && setTimeout(function() {
        throw n3;
      });
    } catch (n4) {
      throw n4;
    }
  }, n$1.__ = function(n3, e2) {
    if (!e2) throw new Error("Undefined parent passed to render(), this is the second argument.\nCheck if the element is available in the DOM/has the correct id.");
    var t3;
    switch (e2.nodeType) {
      case 1:
      case 11:
      case 9:
        t3 = true;
        break;
      default:
        t3 = false;
    }
    if (!t3) {
      var o2 = a$1(n3);
      throw new Error("Expected a valid HTML node as a second argument to render.	Received " + e2 + " instead: render(<" + o2 + " />, " + e2 + ");");
    }
    b2 && b2(n3, e2);
  }, n$1.__b = function(e2) {
    var r3, i2, s2, c2, l3 = e2.type;
    if (n2 = true, void 0 === l3) throw new Error("Undefined component passed to createElement()\n\nYou likely forgot to export your component or might have mixed up default and named imports" + k$2(e2) + "\n\n" + p$1(e2));
    if (null != l3 && "object" == typeof l3) {
      if (void 0 !== l3.__k && void 0 !== l3.__e) throw new Error("Invalid type passed to createElement(): " + l3 + "\n\nDid you accidentally pass a JSX literal as JSX twice?\n\n  let My" + a$1(e2) + " = " + k$2(l3) + ";\n  let vnode = <My" + a$1(e2) + " />;\n\nThis usually happens when you export a JSX literal and not the component.\n\n" + p$1(e2));
      throw new Error("Invalid type passed to createElement(): " + (Array.isArray(l3) ? "array" : l3));
    }
    if (void 0 !== e2.ref && "function" != typeof e2.ref && "object" != typeof e2.ref && !("$$typeof" in e2)) throw new Error(`Component's "ref" property should be a function, or an object created by createRef(), but got [` + typeof e2.ref + "] instead\n" + k$2(e2) + "\n\n" + p$1(e2));
    if ("string" == typeof e2.type) {
      for (var u3 in e2.props) if ("o" === u3[0] && "n" === u3[1] && "function" != typeof e2.props[u3] && null != e2.props[u3]) throw new Error(`Component's "` + u3 + '" property should be a function, but got [' + typeof e2.props[u3] + "] instead\n" + k$2(e2) + "\n\n" + p$1(e2));
    }
    if ("function" == typeof e2.type && e2.type.propTypes) {
      if ("Lazy" === e2.type.displayName && T2 && !T2.lazyPropTypes.has(e2.type)) {
        var f2 = "PropTypes are not supported on lazy(). Use propTypes on the wrapped component itself. ";
        try {
          var d3 = e2.type();
          T2.lazyPropTypes.set(e2.type, true), console.warn(f2 + "Component wrapped in lazy() is " + a$1(d3));
        } catch (n3) {
          console.warn(f2 + "We will log the wrapped component's name once it is loaded.");
        }
      }
      var v2 = function(n3, e3) {
        if (null == n3) return {};
        var t3 = {};
        for (var o2 in n3) if ({}.hasOwnProperty.call(n3, o2)) {
          if (-1 !== e3.indexOf(o2)) continue;
          t3[o2] = n3[o2];
        }
        return t3;
      }(e2.props, h$1);
      r3 = e2.type.propTypes, i2 = v2, s2 = a$1(e2), c2 = function() {
        return p$1(e2);
      }, Object.keys(r3).forEach(function(n3) {
        var e3;
        try {
          e3 = r3[n3](i2, n3, s2, "prop", null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
        } catch (n4) {
          e3 = n4;
        }
        e3 && !(e3.message in o$1) && (o$1[e3.message] = true, console.error("Failed prop type: " + e3.message + (c2 && "\n" + c2() || "")));
      });
    }
    t2 && t2(e2);
  };
  var O2, I2 = 0;
  n$1.__r = function(e2) {
    u2 && u2(e2), n2 = true;
    var t3 = e2.__c;
    if (t3 === O2 ? I2++ : I2 = 1, I2 >= 25) throw new Error("Too many re-renders. This is limited to prevent an infinite loop which may lock up your browser. The component causing this is: " + a$1(e2));
    O2 = t3;
  }, n$1.__h = function(e2, t3, o2) {
    if (!e2 || !n2) throw new Error("Hook can only be invoked from render methods.");
    E2 && E2(e2, t3, o2);
  };
  var M2 = function(n3, e2) {
    return { get: function() {
      var t3 = "get" + n3 + e2;
      _2 && _2.indexOf(t3) < 0 && (_2.push(t3), console.warn("getting vnode." + n3 + " is deprecated, " + e2));
    }, set: function() {
      var t3 = "set" + n3 + e2;
      _2 && _2.indexOf(t3) < 0 && (_2.push(t3), console.warn("setting vnode." + n3 + " is not allowed, " + e2));
    } };
  }, j2 = { nodeName: M2("nodeName", "use vnode.type"), attributes: M2("attributes", "use vnode.props"), children: M2("children", "use vnode.props.children") }, S2 = Object.create({}, j2);
  n$1.vnode = function(n3) {
    var e2 = n3.props;
    if (null !== n3.type && null != e2 && ("__source" in e2 || "__self" in e2)) {
      var t3 = n3.props = {};
      for (var o2 in e2) {
        var r3 = e2[o2];
        "__source" === o2 ? n3.__source = r3 : "__self" === o2 ? n3.__self = r3 : t3[o2] = r3;
      }
    }
    n3.__proto__ = S2, l2 && l2(n3);
  }, n$1.diffed = function(e2) {
    var t3, o2 = e2.type, i2 = e2.__;
    if (e2.__k && e2.__k.forEach(function(n3) {
      if ("object" == typeof n3 && n3 && void 0 === n3.type) {
        var t4 = Object.keys(n3).join(",");
        throw new Error("Objects are not valid as a child. Encountered an object with the keys {" + t4 + "}.\n\n" + p$1(e2));
      }
    }), e2.__c === O2 && (I2 = 0), "string" == typeof o2 && (w$1(o2) || "p" === o2 || "a" === o2 || "button" === o2)) {
      var s2 = m$2(i2);
      if ("" !== s2 && w$1(o2)) "table" === o2 && "td" !== s2 && w$1(s2) ? console.error("Improper nesting of table. Your <table> should not have a table-node parent." + k$2(e2) + "\n\n" + p$1(e2)) : "thead" !== o2 && "tfoot" !== o2 && "tbody" !== o2 || "table" === s2 ? "tr" === o2 && "thead" !== s2 && "tfoot" !== s2 && "tbody" !== s2 ? console.error("Improper nesting of table. Your <tr> should have a <thead/tbody/tfoot> parent." + k$2(e2) + "\n\n" + p$1(e2)) : "td" === o2 && "tr" !== s2 ? console.error("Improper nesting of table. Your <td> should have a <tr> parent." + k$2(e2) + "\n\n" + p$1(e2)) : "th" === o2 && "tr" !== s2 && console.error("Improper nesting of table. Your <th> should have a <tr>." + k$2(e2) + "\n\n" + p$1(e2)) : console.error("Improper nesting of table. Your <thead/tbody/tfoot> should have a <table> parent." + k$2(e2) + "\n\n" + p$1(e2));
      else if ("p" === o2) {
        var c2 = y$1(e2).filter(function(n3) {
          return g$1.test(n3);
        });
        c2.length && console.error("Improper nesting of paragraph. Your <p> should not have " + c2.join(", ") + " as child-elements." + k$2(e2) + "\n\n" + p$1(e2));
      } else "a" !== o2 && "button" !== o2 || -1 !== y$1(e2).indexOf(o2) && console.error("Improper nesting of interactive content. Your <" + o2 + "> should not have other " + ("a" === o2 ? "anchor" : "button") + " tags as child-elements." + k$2(e2) + "\n\n" + p$1(e2));
    }
    if (n2 = false, r2 && r2(e2), null != e2.__k) for (var l3 = [], u3 = 0; u3 < e2.__k.length; u3++) {
      var f2 = e2.__k[u3];
      if (f2 && null != f2.key) {
        var d3 = f2.key;
        if (-1 !== l3.indexOf(d3)) {
          console.error('Following component has two or more children with the same key attribute: "' + d3 + '". This may cause glitches and misbehavior in rendering process. Component: \n\n' + k$2(e2) + "\n\n" + p$1(e2));
          break;
        }
        l3.push(d3);
      }
    }
    if (null != e2.__c && null != e2.__c.__H) {
      var h2 = e2.__c.__H.__;
      if (h2) for (var v2 = 0; v2 < h2.length; v2 += 1) {
        var b3 = h2[v2];
        if (b3.__H) {
          for (var E3 = 0; E3 < b3.__H.length; E3++) if ((t3 = b3.__H[E3]) != t3) {
            var T3 = a$1(e2);
            console.warn("Invalid argument passed to hook. Hooks should not be called with NaN in the dependency array. Hook index " + v2 + " in component " + T3 + " was called with NaN.");
          }
        }
      }
    }
  };
}();
var n = function(t2, s2, r2, e2) {
  var u2;
  s2[0] = 0;
  for (var h2 = 1; h2 < s2.length; h2++) {
    var p2 = s2[h2++], a2 = s2[h2] ? (s2[0] |= p2 ? 1 : 2, r2[s2[h2++]]) : s2[++h2];
    3 === p2 ? e2[0] = a2 : 4 === p2 ? e2[1] = Object.assign(e2[1] || {}, a2) : 5 === p2 ? (e2[1] = e2[1] || {})[s2[++h2]] = a2 : 6 === p2 ? e2[1][s2[++h2]] += a2 + "" : p2 ? (u2 = t2.apply(a2, n(t2, a2, r2, ["", null])), e2.push(u2), a2[0] ? s2[0] |= 2 : (s2[h2 - 2] = 0, s2[h2] = u2)) : e2.push(a2);
  }
  return e2;
}, t$1 = /* @__PURE__ */ new Map();
function e$1(s2) {
  var r2 = t$1.get(this);
  return r2 || (r2 = /* @__PURE__ */ new Map(), t$1.set(this, r2)), (r2 = n(this, r2.get(s2) || (r2.set(s2, r2 = function(n2) {
    for (var t2, s3, r3 = 1, e2 = "", u2 = "", h2 = [0], p2 = function(n3) {
      1 === r3 && (n3 || (e2 = e2.replace(/^\s*\n\s*|\s*\n\s*$/g, ""))) ? h2.push(0, n3, e2) : 3 === r3 && (n3 || e2) ? (h2.push(3, n3, e2), r3 = 2) : 2 === r3 && "..." === e2 && n3 ? h2.push(4, n3, 0) : 2 === r3 && e2 && !n3 ? h2.push(5, 0, true, e2) : r3 >= 5 && ((e2 || !n3 && 5 === r3) && (h2.push(r3, 0, e2, s3), r3 = 6), n3 && (h2.push(r3, n3, 0, s3), r3 = 6)), e2 = "";
    }, a2 = 0; a2 < n2.length; a2++) {
      a2 && (1 === r3 && p2(), p2(a2));
      for (var l2 = 0; l2 < n2[a2].length; l2++) t2 = n2[a2][l2], 1 === r3 ? "<" === t2 ? (p2(), h2 = [h2], r3 = 3) : e2 += t2 : 4 === r3 ? "--" === e2 && ">" === t2 ? (r3 = 1, e2 = "") : e2 = t2 + e2[0] : u2 ? t2 === u2 ? u2 = "" : e2 += t2 : '"' === t2 || "'" === t2 ? u2 = t2 : ">" === t2 ? (p2(), r3 = 1) : r3 && ("=" === t2 ? (r3 = 5, s3 = e2, e2 = "") : "/" === t2 && (r3 < 5 || ">" === n2[a2][l2 + 1]) ? (p2(), 3 === r3 && (h2 = h2[0]), r3 = h2, (h2 = h2[0]).push(2, 0, r3), r3 = 0) : " " === t2 || "	" === t2 || "\n" === t2 || "\r" === t2 ? (p2(), r3 = 2) : e2 += t2), 3 === r3 && "!--" === e2 && (r3 = 4, h2 = h2[0]);
    }
    return p2(), h2;
  }(s2)), r2), arguments, [])).length > 1 ? r2 : r2[0];
}
var m$1 = e$1.bind(_$1);
var t, r, u, i, o = Object.is, f = 0, c = [], e = n$1, a = e.__b, v = e.__r, l = e.diffed, m = e.__c, p = e.unmount, s = e.__;
function d(n2, t2) {
  e.__h && e.__h(r, n2, f || t2), f = 0;
  var u2 = r.__H || (r.__H = { __: [], __h: [] });
  return n2 >= u2.__.length && u2.__.push({}), u2.__[n2];
}
function y(n2) {
  return f = 1, h(D, n2);
}
function h(n2, u2, i2) {
  var f2 = d(t++, 2);
  if (f2.t = n2, !f2.__c && (f2.__ = [i2 ? i2(u2) : D(void 0, u2), function(n3) {
    var t2 = f2.__N ? f2.__N[0] : f2.__[0], r2 = f2.t(t2, n3);
    o(t2, r2) || (f2.__N = [r2, f2.__[1]], f2.__c.setState({}));
  }], f2.__c = r, !r.__f)) {
    var c2 = function(n3, t2, r2) {
      if (!f2.__c.__H) return true;
      var u3 = f2.__c.__H.__, i3 = f2.__c.props !== n3 || u3.every(function(n4) {
        return !n4.__N;
      });
      return u3.forEach(function(n4) {
        if (n4.__N) {
          var t3 = n4.__[0];
          n4.__ = n4.__N, n4.__N = void 0, o(t3, n4.__[0]) || (i3 = true);
        }
      }), e2 && e2.call(this, n3, t2, r2) || i3;
    };
    r.__f = true;
    var e2 = r.shouldComponentUpdate, a2 = r.componentWillUpdate;
    r.componentWillUpdate = function(n3, t2, r2) {
      if (4 & this.__g) {
        var u3 = e2;
        e2 = void 0, c2(n3, t2, r2), e2 = u3;
      }
      a2 && a2.call(this, n3, t2, r2);
    }, r.shouldComponentUpdate = c2;
  }
  return f2.__;
}
function _(n2, u2) {
  var i2 = d(t++, 3);
  !e.__s && C(i2.__H, u2) && (i2.__ = n2, i2.u = u2, r.__H.__h.push(i2));
}
function A(n2, u2) {
  var i2 = d(t++, 4);
  !e.__s && C(i2.__H, u2) && (i2.__ = n2, i2.u = u2, r.__h.push(i2));
}
function F(n2) {
  return f = 5, q$1(function() {
    return { current: n2 };
  }, []);
}
function T$1(n2, t2, r2) {
  f = 6, A(function() {
    if ("function" == typeof n2) {
      var r3 = n2(t2());
      return function() {
        n2(null), r3 && "function" == typeof r3 && r3();
      };
    }
    if (n2) return n2.current = t2(), function() {
      return n2.current = null;
    };
  }, null == r2 ? r2 : r2.concat(n2));
}
function q$1(n2, r2) {
  var u2 = d(t++, 7);
  return C(u2.__H, r2) && (u2.__ = n2(), u2.__H = r2, u2.__h = n2), u2.__;
}
function b(n2, t2) {
  return f = 8, q$1(function() {
    return n2;
  }, t2);
}
function j$1(n2) {
  var u2 = r.context[n2.__c], i2 = d(t++, 9);
  return i2.c = n2, u2 ? (null == i2.__ && (i2.__ = true, u2.sub(r)), u2.props.value) : n2.__;
}
function x(n2, t2) {
  e.useDebugValue && e.useDebugValue(t2 ? t2(n2) : n2);
}
function O$1(n2) {
  var u2 = d(t++, 10), i2 = y();
  return u2.__ = n2, r.componentDidCatch || (r.componentDidCatch = function(n3, t2) {
    u2.__ && u2.__(n3, t2), i2[1](n3);
  }), [i2[0], function() {
    i2[1](void 0);
  }];
}
function P$1() {
  var n2 = d(t++, 11);
  if (!n2.__) {
    for (var u2 = r.__v; null !== u2 && !u2.__m && null !== u2.__; ) u2 = u2.__;
    var i2 = u2.__m || (u2.__m = [0, 0]);
    n2.__ = "P" + i2[0] + "-" + i2[1]++;
  }
  return n2.__;
}
function g() {
  for (var n2; n2 = c.shift(); ) if (n2.__P && n2.__H) try {
    n2.__H.__h.forEach(z$1), n2.__H.__h.forEach(B$1), n2.__H.__h = [];
  } catch (t2) {
    n2.__H.__h = [], e.__e(t2, n2.__v);
  }
}
e.__b = function(n2) {
  r = null, a && a(n2);
}, e.__ = function(n2, t2) {
  n2 && t2.__k && t2.__k.__m && (n2.__m = t2.__k.__m), s && s(n2, t2);
}, e.__r = function(n2) {
  v && v(n2), t = 0;
  var i2 = (r = n2.__c).__H;
  i2 && (u === r ? (i2.__h = [], r.__h = [], i2.__.forEach(function(n3) {
    n3.__N && (n3.__ = n3.__N), n3.u = n3.__N = void 0;
  })) : (i2.__h.forEach(z$1), i2.__h.forEach(B$1), i2.__h = [], t = 0)), u = r;
}, e.diffed = function(n2) {
  l && l(n2);
  var t2 = n2.__c;
  t2 && t2.__H && (t2.__H.__h.length && (1 !== c.push(t2) && i === e.requestAnimationFrame || ((i = e.requestAnimationFrame) || w)(g)), t2.__H.__.forEach(function(n3) {
    n3.u && (n3.__H = n3.u), n3.u = void 0;
  })), u = r = null;
}, e.__c = function(n2, t2) {
  t2.some(function(n3) {
    try {
      n3.__h.forEach(z$1), n3.__h = n3.__h.filter(function(n4) {
        return !n4.__ || B$1(n4);
      });
    } catch (r2) {
      t2.some(function(n4) {
        n4.__h && (n4.__h = []);
      }), t2 = [], e.__e(r2, n3.__v);
    }
  }), m && m(n2, t2);
}, e.unmount = function(n2) {
  p && p(n2);
  var t2, r2 = n2.__c;
  r2 && r2.__H && (r2.__H.__.forEach(function(n3) {
    try {
      z$1(n3);
    } catch (n4) {
      t2 = n4;
    }
  }), r2.__H = void 0, t2 && e.__e(t2, r2.__v));
};
var k$1 = "function" == typeof requestAnimationFrame;
function w(n2) {
  var t2, r2 = function() {
    clearTimeout(u2), k$1 && cancelAnimationFrame(t2), setTimeout(n2);
  }, u2 = setTimeout(r2, 35);
  k$1 && (t2 = requestAnimationFrame(r2));
}
function z$1(n2) {
  var t2 = r, u2 = n2.__c;
  "function" == typeof u2 && (n2.__c = void 0, u2()), r = t2;
}
function B$1(n2) {
  var t2 = r;
  n2.__c = n2.__(), r = t2;
}
function C(n2, t2) {
  return !n2 || n2.length !== t2.length || t2.some(function(t3, r2) {
    return !o(t3, n2[r2]);
  });
}
function D(n2, t2) {
  return "function" == typeof t2 ? t2(n2) : t2;
}
var k = Object.assign;
function I(n2, e2) {
  for (var t2 in n2) if ("__source" !== t2 && !(t2 in e2)) return true;
  for (var r2 in e2) if ("__source" !== r2 && n2[r2] !== e2[r2]) return true;
  return false;
}
var N = /^(-|f[lo].*[^se]$|g.{5,}[^ps]$|z|o[pr]|(W.{5})?[lL]i.*(t|mp)$|an|(bo|s).{4}Im|sca|m.{6}[ds]|ta|c.*[st]$|wido|ini)/;
function O(n2, e2) {
  this.props = n2, this.context = e2;
}
(O.prototype = new M()).isPureReactComponent = true, O.prototype.shouldComponentUpdate = function(n2, e2) {
  return I(this.props, n2) || I(this.state, e2);
};
var T = n$1.__e;
n$1.__e = function(n2, e2, t2, r2) {
  if (n2.then) {
    for (var u2, o2 = e2; o2 = o2.__; ) if ((u2 = o2.__c) && u2.__c) return null == e2.__e && (e2.__e = t2.__e, e2.__k = t2.__k), u2.__c(n2, e2);
  }
  T(n2, e2, t2, r2);
};
var U = n$1.unmount;
function V(n2, e2, t2) {
  return n2 && (n2.__c && n2.__c.__H && (n2.__c.__H.__.forEach(function(n3) {
    "function" == typeof n3.__c && n3.__c();
  }), n2.__c.__H = null), null != (n2 = k({}, n2)).__c && (n2.__c.__P === t2 && (n2.__c.__P = e2), n2.__c.__g |= 4, n2.__c = null), n2.__k = n2.__k && n2.__k.map(function(n3) {
    return V(n3, e2, t2);
  })), n2;
}
function j(n2, e2, t2) {
  return n2 && t2 && ("string" == typeof n2.type && (n2.__u |= 1), n2.__v = null, n2.__k = n2.__k && n2.__k.map(function(n3) {
    return j(n3, e2, t2);
  }), n2.__c && n2.__c.__P === e2 && (n2.__e && t2.appendChild(n2.__e), n2.__c.__g |= 4, n2.__c.__P = t2)), n2;
}
function W() {
  this.__u = 0, this.o = null, this.__b = null;
}
function z(n2) {
  return this.getChildContext = function() {
    return n2.context;
  }, n2.children;
}
function P(n2) {
  var t2 = this, r2 = n2.i;
  if (t2.componentWillUnmount = function() {
    G$1(null, t2.l), t2.l = null, t2.i = null;
  }, t2.i && t2.i !== r2 && t2.componentWillUnmount(), !t2.l) {
    for (var u2 = t2.__v; null !== u2 && !u2.__m && null !== u2.__; ) u2 = u2.__;
    t2.i = r2, t2.l = { nodeType: 1, parentNode: r2, childNodes: [], __k: { __m: u2.__m }, ownerDocument: r2.ownerDocument, insertBefore: function(n3, e2) {
      this.childNodes.push(n3), t2.i.insertBefore(n3, e2);
    } };
  }
  G$1(_$1(z, { context: t2.context }, n2.__v), t2.l);
}
function H(n2, t2) {
  var r2 = _$1(P, { __v: n2, i: t2 });
  return r2.containerInfo = t2, r2;
}
n$1.unmount = function(n2) {
  var e2 = n2.__c;
  e2 && e2.__R && e2.__R(), U && U(n2);
}, (W.prototype = new M()).__c = function(n2, e2) {
  var t2 = e2.__c, r2 = this;
  null == r2.o && (r2.o = []), r2.o.push(t2);
  var u2 = false, o2 = function() {
    u2 || (u2 = true, t2.__R = null, i2());
  };
  t2.__R = o2;
  var i2 = function() {
    if (!--r2.__u) {
      if (r2.state.__a) {
        var n3 = r2.state.__a;
        r2.__v.__k[0] = j(n3, n3.__c.__P, n3.__c.__O);
      }
      var e3;
      for (r2.setState({ __a: r2.__b = null }); e3 = r2.o.pop(); ) e3.forceUpdate();
    }
  };
  r2.__u++ || 32 & e2.__u || r2.setState({ __a: r2.__b = r2.__v.__k[0] }), n2.then(o2, o2);
}, W.prototype.componentWillUnmount = function() {
  this.o = [];
}, W.prototype.render = function(n2, t2) {
  if (this.__b) {
    if (this.__v.__k) {
      var r2 = document.createElement("div"), o2 = this.__v.__k[0].__c;
      this.__v.__k[0] = V(this.__b, r2, o2.__O = o2.__P);
    }
    this.__b = null;
  }
  return [_$1(k$3, null, t2.__a ? null : n2.children), t2.__a && _$1(k$3, null, n2.fallback)];
};
var B = Symbol.for("react.element"), Z = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image(!S)|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/, Y = /[A-Z0-9]/g, q = "undefined" != typeof document, G = function(n2) {
  return /fil|che|rad/.test(n2);
};
M.prototype.isReactComponent = {}, ["componentWillMount", "componentWillReceiveProps", "componentWillUpdate"].forEach(function(e2) {
  Object.defineProperty(M.prototype, e2, { configurable: true, get: function() {
    return this["UNSAFE_" + e2];
  }, set: function(n2) {
    Object.defineProperty(this, e2, { configurable: true, writable: true, value: n2 });
  } });
});
var Q = n$1.event;
function X() {
}
function nn() {
  return this.cancelBubble;
}
function en() {
  return this.defaultPrevented;
}
n$1.event = function(n2) {
  return Q && (n2 = Q(n2)), n2.persist = X, n2.isPropagationStopped = nn, n2.isDefaultPrevented = en, n2.nativeEvent = n2;
};
var rn = { enumerable: false, configurable: true, get: function() {
  return this.class;
} }, un = n$1.vnode;
n$1.vnode = function(n2) {
  if ("string" == typeof n2.type) !function(n3) {
    var e3 = n3.props, r3 = n3.type, u2 = {}, o2 = -1 === r3.indexOf("-");
    for (var i2 in e3) {
      var l2 = e3[i2];
      if (!("value" === i2 && "defaultValue" in e3 && null == l2 || q && "children" === i2 && "noscript" === r3 || "class" === i2 || "className" === i2)) {
        if ("style" === i2 && "object" == typeof l2) for (var c2 in l2) "number" != typeof l2[c2] || N.test(c2) || (l2[c2] += "px");
        else if ("defaultValue" === i2 && "value" in e3 && null == e3.value) i2 = "value";
        else if ("download" === i2 && true === l2) l2 = "";
        else if ("translate" === i2 && "no" === l2) l2 = false;
        else if ("o" === i2[0] && "n" === i2[1]) {
          var a2 = i2.toLowerCase();
          "ondoubleclick" === a2 ? i2 = "ondblclick" : "onchange" !== a2 || "input" !== r3 && "textarea" !== r3 || G(e3.type) ? "onfocus" === a2 ? i2 = "onfocusin" : "onblur" === a2 && (i2 = "onfocusout") : a2 = i2 = "oninput", "oninput" === a2 && u2[i2 = a2] && (i2 = "oninputCapture");
        } else o2 && Z.test(i2) ? i2 = i2.replace(Y, "-$&").toLowerCase() : null === l2 && (l2 = void 0);
        u2[i2] = l2;
      }
    }
    "select" == r3 && u2.multiple && Array.isArray(u2.value) && (u2.value = H$1(e3.children).forEach(function(n4) {
      n4.props.selected = -1 != u2.value.indexOf(n4.props.value);
    })), "select" == r3 && null != u2.defaultValue && (u2.value = H$1(e3.children).forEach(function(n4) {
      n4.props.selected = u2.multiple ? -1 != u2.defaultValue.indexOf(n4.props.value) : u2.defaultValue == n4.props.value;
    })), e3.class && !e3.className ? (u2.class = e3.class, Object.defineProperty(u2, "className", rn)) : (e3.className && !e3.class || e3.class && e3.className) && (u2.class = u2.className = e3.className), n3.props = u2;
  }(n2);
  else if ("function" == typeof n2.type && ("ref" in n2.props && "prototype" in n2.type && n2.type.prototype.render && (n2.ref = n2.props.ref, delete n2.props.ref), n2.type.defaultProps)) {
    var e2 = k({}, n2.props);
    for (var r2 in n2.type.defaultProps) void 0 === e2[r2] && (e2[r2] = n2.type.defaultProps[r2]);
    n2.props = e2;
  }
  n2.$$typeof = B, un && un(n2);
};
var on = n$1.__r;
n$1.__r = function(n2) {
  on && on(n2), n2.__c;
};
var ln = n$1.diffed;
n$1.diffed = function(n2) {
  ln && ln(n2);
  var e2 = n2.props, t2 = n2.__e;
  null != t2 && "textarea" === n2.type && "value" in e2 && e2.value !== t2.value && (t2.value = null == e2.value ? "" : e2.value);
};
export {
  M as Component,
  K as cloneElement,
  Q$1 as createContext,
  _$1 as createElement,
  H as createPortal,
  b$2 as createRef,
  m$1 as html,
  J as hydrate,
  u$2 as isValidElement,
  G$1 as render,
  H$1 as toChildArray,
  b as useCallback,
  j$1 as useContext,
  x as useDebugValue,
  _ as useEffect,
  O$1 as useErrorBoundary,
  P$1 as useId,
  T$1 as useImperativeHandle,
  A as useLayoutEffect,
  q$1 as useMemo,
  h as useReducer,
  F as useRef,
  y as useState
};
