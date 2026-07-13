import { ValueIsObject as wl, ValueIsPlainObject as vl, quoted as wt, ValueIsStringMatching as Bt, ValueIsString as it, ValueIsTextline as Be, ValueIsEMailAddress as qn, ValueIsListSatisfying as $e, ValueIsOneOf as be, ValueIsFunction as Nt, expectURL as ii, expectCardinal as Cl, expectPlainObject as yt, allowedCardinal as zr, expectIntegerInRange as kl, ValueIsURL as at, allowListSatisfying as zt, expectTextline as Xt, allowURL as Bn, allowOneOf as St, allowTextline as ln, allowCardinal as va, expectOneOf as _n, ValueIsIntegerInRange as Ca, allowPlainObject as si, ValueIsFiniteNumber as li, expectFunction as Wt, ValueIsBoolean as gn, ValueIsNumber as xt, ValueIsText as $n, ValueIsColor as Xn, ValueIsOrdinal as kn, expectStringMatching as jl, allowFunction as Ae, expectString as $l, ValueIsArray as ci, allowBoolean as Kt, expectText as Je, expectBoolean as di, allowString as ka, allowOrdinal as Il, ValueIsNumberInRange as to, expectOrdinal as Yn, expectInstanceOf as Vo, ValueIsCardinal as Dl, ValueIsInteger as Ll, ValidatorForClassifier as Or, acceptNil as Sl, rejectNil as Ml } from "javascript-interface-library";
export * from "javascript-interface-library";
import { supportsPassiveEvents as Ib, supportsPointerEvents as Db, supportsTouchEvents as Lb, deviceType as Sb, primaryInput as Mb } from "detect-it";
import { html as b, render as ia } from "htm/preact";
import { isValidElement as ui, cloneElement as Tl, toChildArray as Yt, createContext as Jt, createRef as Rl, Component as Al } from "preact";
import { createPortal as Dn } from "preact/compat";
import { useErrorBoundary as ja, useContext as st, useMemo as Zt, useCallback as ie, useLayoutEffect as $a, useEffect as je, useState as He, useRef as K, useId as Dt } from "preact/hooks";
function Un(e) {
  return wl(e);
}
function De(e) {
  return vl(e);
}
const Fl = (async () => {
}).constructor;
function zl() {
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
function Ol(e) {
  return ce(
    "ReadOnlyProperty: property " + wt(e) + " must not be set"
  );
}
function Pe(e, t) {
  const n = Or(e, Sl, t), o = Or(e, Ml, t);
  return [n, n, o, o];
}
const Vl = /^[a-z$_][a-z$_0-9]*$/i;
function El(e) {
  return Bt(e, Vl);
}
const [Xg, Yg, Nl, Jg] = /* @__PURE__ */ Pe(El, "JCL identifier");
function Ia(e) {
  return it(e) && /^[a-zA-Z][a-zA-Z0-9_-]*$/.test(e);
}
const [Bl, Zg, dn, Qg] = /* @__PURE__ */ Pe(Ia, "name");
function pi(e) {
  return it(e) && /^[a-zA-Z][a-zA-Z0-9_-]*(\.[a-zA-Z][a-zA-Z0-9_-]*)*$/.test(e);
}
const [Pg, em, hi, tm] = /* @__PURE__ */ Pe(pi, "path");
function Eo(e) {
  return it(e) && /^[+]?[\d\s()\-.]{7,}$/.test(e) && e.replace(/\D/g, "").length >= 3;
}
const [nm, om, am, rm] = /* @__PURE__ */ Pe(Eo, "phone number");
function im(e) {
  return Be(e) && (e.indexOf(",") < 0 ? qn(e) : $e(
    e.replace(/\s*,\s*/g, ",").split(","),
    qn
  ));
}
const Wl = /* @__PURE__ */ new Set([
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
function Hl(e) {
  return it(e) && Wl.has(e.toLowerCase());
}
const [_l, sm, lm, cm] = /* @__PURE__ */ Pe(Hl, "ISO 639-1 Language Code"), Gl = /^[a-z0-9]+([._+-][a-z0-9]+)*\/[a-z0-9]+([._+-][a-z0-9]+)*(\s*;\s*[a-z0-9-]+=[a-z0-9.+-]+)*$/i;
function Jn(e) {
  return Bt(e, Gl);
}
const [dm, um, Kl, pm] = /* @__PURE__ */ Pe(Jn, "MIME type"), Ul = [
  "application/javascript",
  "application/typescript",
  "application/json",
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "text/html",
  "text/markdown",
  "text/plain"
];
function hm(e) {
  return be(e, Ul);
}
const ql = [
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "text/html",
  "text/markdown",
  "text/plain"
];
function fm(e) {
  return be(e, ql);
}
const Xl = [
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "text/markdown",
  "text/plain"
];
function gm(e) {
  return be(e, Xl);
}
const Yl = [
  "image/apng",
  "image/avif",
  "image/bmp",
  "image/gif",
  "image/jpeg",
  "image/png",
  "image/svg+xml",
  "image/webp"
];
function mm(e) {
  return be(e, Yl);
}
const Jl = new RegExp(
  "^[^\\x00-\\x08\\x0B\\x0C\\x0E-\\x1F\\x7F-\\x9F\\u2028\\u2029\\uFFF9-\\uFFFB]*$"
);
function no(e) {
  return it(e) && Jl.test(e);
}
function fi(e) {
  return (Un(e) || Nt(e)) && Nt(e.then);
}
const [bm, ym, xm, wm] = /* @__PURE__ */ Pe(fi, "JavaScript Promise or thenable");
function Zl(e) {
  return typeof e == "object" && e != null && typeof e.aborted == "boolean" && typeof e.addEventListener == "function";
}
const [Ql, vm, Cm, km] = /* @__PURE__ */ Pe(Zl, "JavaScript abort signal");
function Pl() {
  return typeof window < "u" && "__TAURI_INTERNALS__" in window;
}
function jm() {
  return typeof window < "u" && !Pl();
}
async function ec(e = "https://cloudflare.com/cdn-cgi/trace", t = 5e3) {
  return typeof navigator < "u" && !navigator.onLine ? !1 : await gi(e, t);
}
async function gi(e, t = 5e3) {
  ii("server URL", e), Cl("timeout", t);
  const n = new URL(e).origin;
  if (n === window.location.origin)
    return !0;
  const o = new AbortController(), a = setTimeout(
    () => o.abort(),
    t
  );
  try {
    const r = await fetch(n, {
      method: "HEAD",
      signal: o.signal,
      mode: "no-cors",
      cache: "no-cache"
    });
    return clearTimeout(a), r.type === "basic" || r.type === "opaque";
  } catch {
    return clearTimeout(a), !1;
  }
}
async function It(e, t = {}) {
  ii("resource URL", e), yt("option set", t), t = { ...t }, typeof navigator < "u" && !navigator.onLine && ce(
    "NotConnected: the browser is not connected"
  );
  const n = zr("request timeout", t.timeout) ?? 10 * 1e3, o = t.allowRetries === !0, a = zr("maximum retries", t.maxRetries) ?? 3;
  delete t.timeout, delete t.allowRetries, delete t.maxRetries;
  const r = t.signal;
  function i(l, c) {
    const d = l.headers.get("Retry-After");
    if (d != null) {
      const u = parseInt(d, 10);
      if (!isNaN(u))
        return Math.max(0, u * 1e3);
      const p = Date.parse(d);
      if (!isNaN(p))
        return Math.max(0, p - Date.now());
    }
    return Math.min(30 * 1e3, 500 * 2 ** c);
  }
  let s = 0;
  for (; ; ) {
    const l = new AbortController();
    t.signal = r != null ? AbortSignal.any([l.signal, r]) : l.signal;
    let c = !1;
    const d = setTimeout(() => {
      c = !0, l.abort();
    }, n);
    let u;
    try {
      u = await fetch(e, t), clearTimeout(d);
    } catch (p) {
      clearTimeout(d);
      const h = p?.message ?? "";
      // timeout by fetch or cancellation by internal timer
      (c || h.includes("timeout")) && ce("ServerUnreachable: the server is unreachable"), // explicit cancellation
      (p?.name === "AbortError" || h.includes("The user aborted a request")) && ce(
        "RequestAborted: request was aborted"
      ), (h.includes("Failed to fetch") || h.includes("CORS")) && ce("CORSblocked: cross-origin request blocked"), p?.name === "TypeError" && typeof navigator < "u" && !navigator.onLine && ce(
        "NotConnected: the browser is offline"
      ), ce("ServerUnreachable: the server is unreachable");
    }
    if (o && s < a && (u.status === 429 || u.status === 503)) {
      await new Promise(
        (p) => setTimeout(p, i(u, s))
      ), s++;
      continue;
    }
    switch (!0) {
      case u.status === 401:
        ce("AuthorizationFailure: authorization failed");
      case u.status === 403:
        ce("ForbiddenRequest: request is forbidden");
      case u.status === 404:
        ce("MissingResource: resource not found");
      case u.status === 408:
        ce("RequestTimeout: request timed out");
      case u.status === 429:
        ce("RateLimitExceeded: too many requests");
      case u.status === 500:
        ce("InternalServerError: internal server error");
      case u.status === 502:
        ce("BadGateway: bad gateway");
      case u.status === 503:
        ce("ServiceUnavailable: service is currently not available");
      case u.status === 504:
        ce("GatewayTimeout: gateway timed out");
      case u.status >= 400:
        ce(
          "HTTPError: request failed with status " + u.status
        );
    }
    return u;
  }
}
async function tc(e, t = {}) {
  return await (await It(e, t)).text();
}
async function nc(e, t = {}) {
  return await (await It(e, t)).json();
}
async function oc(e, t = {}) {
  return await (await It(e, t)).arrayBuffer();
}
async function ac(e, t = {}) {
  return await (await It(e, t)).blob();
}
async function rc(e, t = {}) {
  const o = await (await It(e, t)).blob();
  let a, r;
  const i = new Promise((l, c) => {
    a = l, r = c;
  }), s = new FileReader();
  return s.onloadend = () => a(s.result), s.onerror = r, s.readAsDataURL(o), i;
}
async function ic(e, t = {}) {
  const n = await It(e, t), o = (n.headers.get("content-type") ?? "").split(";")[0].trim();
  switch (!0) {
    case o.startsWith("text/html"):
      return await ur(await n.text());
    case o === "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      return await mr(await n.arrayBuffer());
    case o === "application/pdf":
      return await xr(await n.arrayBuffer());
    case o.startsWith("text/markdown"):
      return await hr(await n.text());
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
async function sc(e, t = {}) {
  const n = await It(e, t), o = (n.headers.get("content-type") ?? "").split(";")[0].trim();
  switch (!0) {
    case o.startsWith("text/html"):
      return await n.text();
    case o === "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      return await br(await n.arrayBuffer());
    case o.startsWith("text/markdown"):
      return await fr(await n.text());
    default:
      ce(`UnsupportedMIMEType: cannot convert content of type "${o}" into HTML`);
  }
}
async function lc(e, t = {}) {
  const n = await It(e, t), o = (n.headers.get("content-type") ?? "").split(";")[0].trim();
  switch (!0) {
    case o.startsWith("text/html"):
      return await pr(await n.text());
    case o === "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      return await yr(await n.arrayBuffer());
    case o.startsWith("text/markdown"):
      return await n.text();
    default:
      ce(`UnsupportedMIMEType: cannot convert content of type "${o}" into Markdown`);
  }
}
function mi(e) {
  return kl("HTTP status code", e, 100, 599), bi[e] ?? "";
}
const bi = {
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
}, me = {
  /**** Configuration ****/
  get Configuration() {
    return {
      ServerChoice: me._ServerChoice,
      customServer: me.customServer,
      ServerBlacklist: me.ServerBlacklist,
      ServerWhitelist: me.ServerWhitelist,
      ResultBlacklist: me.ResultBlacklist,
      ResultWhitelist: me.ResultWhitelist
    };
  },
  set Configuration(e) {
    yt("SearXNG configuration", e);
    const {
      ServerChoice: t,
      customServer: n,
      ServerBlacklist: o,
      ServerWhitelist: a,
      ResultBlacklist: r,
      ResultWhitelist: i
    } = e;
    if (St("SearXNG server choice", t, ["custom", "public"]), si("SearXNG custom Server", n), zt('SearXNG configuration "ServerBlacklist"', o, at), zt('SearXNG configuration "ServerWhitelist"', a, at), zt('SearXNG configuration "ResultBlacklist"', r, at), zt('SearXNG configuration "ResultWhitelist"', i, at), n != null) {
      const { ServerURL: s, Authentication: l, Credentials: c } = n;
      Bn("SearXNG custom server url", s), St("SearXNG custom server authentication", l, ["none", "basic", "bearer"]), ln("SearXNG custom server credentials", c);
    }
    me.ServerChoice = t ?? "public", me.customServer = n ?? { Authentication: "none" }, me.ServerBlacklist = o ?? [], me.ServerWhitelist = a ?? [], me.ResultBlacklist = r ?? [], me.ResultWhitelist = i ?? [];
  },
  /**** preserveConfiguration ****/
  preserveConfiguration: function() {
    localStorage["SearXNG-Configuration"] = JSON.stringify(me.Configuration);
  },
  /**** restoreConfiguration ****/
  restoreConfiguration: function() {
    if (localStorage["SearXNG-Configuration"] != null)
      try {
        const e = JSON.parse(localStorage["SearXNG-Configuration"]);
        me.Configuration = e;
      } catch (e) {
        console.warn('"SearXNG.restoreConfiguration" failed with ' + e);
      }
  },
  /**** hasPreservedConfiguration ****/
  get hasPreservedConfiguration() {
    return localStorage["SearXNG-Configuration"] != null;
  },
  set hasPreservedConfiguration(e) {
    Ol("SearXNG.hasPreservedConfiguration");
  },
  /**** customServer[URL/Authentication/Credentials] ****/
  _customServer: {
    ServerURL: void 0,
    Authentication: "none",
    Credentials: void 0
  },
  get customServer() {
    return { ...me._customServer };
  },
  set customServer(e) {
    yt("SearXNG custom server setting", e), Bn("SearXNG custom server url", e.ServerURL), St("SearXNG custom server authentication", e.Authentication, ["none", "basic", "bearer"]), ln("SearXNG custom server credentials", e.Credentials), me._customServer = {
      ServerURL: e.ServerURL,
      Authentication: e.Authentication ?? "none",
      Credentials: e.Credentials
    };
  },
  get customServerURL() {
    return me._customServer.ServerURL;
  },
  set customServerURL(e) {
    Bn("SearXNG custom server url", e), me._customServer.ServerURL = e;
  },
  get customServerAuthentication() {
    return me._customServer.Authentication;
  },
  set customServerAuthentication(e) {
    St("SearXNG custom server authentication", e, ["none", "basic", "bearer"]), me._customServer.Authentication = e;
  },
  get customServerCredentials() {
    return me._customServer.Credentials;
  },
  set customServerCredentials(e) {
    ln("SearXNG custom server credentials", e), me._customServer.Credentials = e;
  },
  /**** publicServers - fetches the list of registered public SearXNG servers ****/
  publicServers: async function(e = {}) {
    yt("option set", e);
    const { ServiceURL: t, Signal: n, ...o } = e;
    Bn("SearXNG service URL", t), Ql("fetch abort signal", n);
    let a;
    try {
      if (a = await It(
        t ?? "https://searx.space/data/instances.json",
        {
          ...o,
          ...n != null ? { signal: n } : {}
        }
      ), a.ok) {
        const i = await a.json();
        return !De(i) || !De(i.instances) ? [] : Object.keys(i.instances).filter(me.ServerIsAcceptable);
      }
    } catch (i) {
      i.name === "AbortError" ? ce("Aborted: SearXNG server scan was aborted") : ce("InternalError: SearXNG server scan failed with " + i);
    }
    const r = Ca(a.status, 100, 599) ? mi(a.status) : "(unknown)";
    ce(
      "InternalError: SearXNG server scan failed with HTTP status " + a.status + " " + r
    );
  },
  /**** ServerBlacklist (for SearXNG servers) ****/
  _ServerBlacklist: {},
  get ServerBlacklist() {
    return Object.keys(me._ServerBlacklist);
  },
  set ServerBlacklist(e) {
    zt("SearXNG server blacklist", e, at), me._ServerBlacklist = {}, (e ?? []).forEach(
      (t) => me._ServerBlacklist[t] = !0
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
    return Array.from(Object.keys(me._ServerWhitelist));
  },
  set ServerWhitelist(e) {
    zt("SearXNG server whitelist", e, at), me._ServerWhitelist = {}, (e ?? []).forEach(
      (t) => me._ServerWhitelist[t] = !0
    );
  },
  // note: caller should probably rescan the list of public SearXNG servers
  /**** ServerIsBlacklisted ****/
  ServerIsBlacklisted: function(e) {
    return at(e) && e in me._ServerBlacklist;
  },
  /**** ServerIsWhitelisted ****/
  ServerIsWhitelisted: function(e) {
    return at(e) && e in me._ServerWhitelist;
  },
  /**** ServerIsAcceptable ****/
  ServerIsAcceptable: function(e) {
    return at(e) && (e.startsWith("https://") || e in me._ServerWhitelist) && !(e in me._ServerBlacklist);
  },
  /**** ServerChoice ****/
  _ServerChoice: "public",
  get ServerChoice() {
    return me._ServerChoice;
  },
  set ServerChoice(e) {
    _n("SearXNG server choice setting", e, ["public", "custom"]), me._ServerChoice = e;
  },
  /**** nextServer ****/
  _publicServers: [],
  nextServer: async function() {
    if (me._ServerChoice === "custom")
      return me._customServer.ServerURL == null && ce(
        "MissingCustomServer: custom SearXNG server is missing"
      ), me.customServer;
    {
      let e = me._publicServers;
      if (e.length === 0 && (e = me._publicServers = await me.publicServers()), e.length === 0)
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
    Xt("search phrase", e), yt("search options", t);
    const {
      ServerURL: n,
      ServerAuthentication: o,
      ServerCredentials: a,
      language: r,
      categories: i,
      num_results: s
    } = t;
    Bn("SearXNG server URL", n), St("SearXNG server authentication", o, ["none", "basic", "bearer"]), ln("SearXNG server credentials", a), _l("SearXNG query language", r), St("SearXNG query categories", i, ["general"]), va("SearXNG query result limit", s);
    const l = n == null ? await me.nextServer() : {
      ServerURL: n,
      Authentication: o ?? "none",
      Credentials: a
    };
    l.ServerURL == null && ce(
      "MissingSearXNGServer: no SearXNG server given"
    ), l.Authentication !== "none" && l.Credentials == null && ce(
      "MissingCredentials: no SearXNG server credentials given"
    );
    const c = {};
    if (l.Authentication !== "none") {
      const u = new Headers();
      u.set("Authorization", `${Hg(l.Authentication)} ${l.Credentials}`), c.headers = u;
    }
    e = e.trim(), e === "" && ce(
      "EmptyArgument: the given search phrase is empty"
    );
    const d = new URLSearchParams({
      q: e,
      language: r ?? "en",
      format: "html",
      categories: i ?? "general",
      num_results: "" + (s ?? 20)
    });
    try {
      const p = await (await It(
        `${l.ServerURL}/search?${d}`,
        c
      )).text();
      return Array.from(p.matchAll(/<h3><a href="([^"]+)"/g)).map((g) => g[1]).filter((g) => g != null && g.trim() !== "").filter(me.ResultIsAcceptable);
    } catch (u) {
      [
        "ServerUnreachable",
        "AuthorizationFailure",
        "ForbiddenRequest",
        "InternalServerError"
      ].includes(u.name) ? (me.ServerBlacklist = [...me.ServerBlacklist, l.ServerURL], console.warn("SearXNG search failed with", u, `

>>>> server was blacklisted
`)) : console.warn("SearXNG search failed with", u);
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
    return Object.keys(me._ResultBlacklist);
  },
  set ResultBlacklist(e) {
    zt("SearXNG result blacklist", e, at), me._ResultBlacklist = {}, (e ?? []).forEach(
      (t) => me._ResultBlacklist[me._withoutQueryString(t)] = !0
    );
  },
  /**** ResultWhitelist (for query results) ****/
  _ResultWhitelist: {},
  get ResultWhitelist() {
    return Object.keys(me._ResultWhitelist);
  },
  set ResultWhitelist(e) {
    zt("SearXNG result whitelist", e, at), me._ResultWhitelist = {}, (e ?? []).forEach(
      (t) => me._ResultWhitelist[me._withoutQueryString(t)] = !0
    );
  },
  /**** ResultIsBlacklisted ****/
  ResultIsBlacklisted: function(e) {
    return at(e) && me._withoutQueryString(e) in me._ResultBlacklist;
  },
  /**** ResultIsWhitelisted ****/
  ResultIsWhitelisted: function(e) {
    return at(e) && me._withoutQueryString(e) in me._ResultWhitelist;
  },
  /**** ResultIsAcceptable ****/
  ResultIsAcceptable: function(e) {
    return !at(e) || me.ResultIsBlacklisted(e) ? !1 : Object.keys(me._ResultWhitelist).length === 0 || me.ResultIsWhitelisted(e);
  }
}, $m = {
  InternetIsAvailable: ec,
  ServerIsReachable: gi,
  fetched: It,
  fetchedText: tc,
  fetchedJSON: nc,
  fetchedBinary: oc,
  fetchedBlob: ac,
  fetchedDataURL: rc,
  fetchedAsText: ic,
  fetchedAsHTML: sc,
  fetchedAsMarkdown: lc,
  DescriptionOfHTTPStatus: mi,
  HTTPMessageForStatus: bi,
  SearXNG: me
}, un = /* @__PURE__ */ Symbol("normalizedName"), Lo = /* @__PURE__ */ Symbol("L10nDictionary"), yi = "/", So = yi + "icons/", ct = { Placeholder: "(empty)", disabled: !1 }, cc = { Placeholder: "(no Selection)", disabled: !0 }, dc = { Placeholder: "(mixed Values)", disabled: !1 };
function Ue(e) {
  return e === ct || e === cc || e === dc;
}
function Ze(e, t, n) {
  return Ue(e) ? {
    actualValue: void 0,
    actualPlaceholder: e === ct ? n ?? e.Placeholder : e.Placeholder,
    actualDisabling: t || e.disabled
  } : { actualValue: e, actualPlaceholder: n, actualDisabling: t };
}
const ft = "-webkit-mask-size:contain; mask-size:contain; -webkit-mask-position:center center; mask-position:center center; -webkit-mask-repeat:no-repeat; mask-repeat:no-repeat;";
function oo(e, t = 2) {
  const n = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='${t}' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='${e}'/%3E%3C/svg%3E")`;
  return `-webkit-mask-image:${n}; mask-image:${n};`;
}
const No = oo("m6 9 6 6 6-6"), uc = oo("m18 15-6-6-6 6"), Da = oo("m15 18-6-6 6-6"), Bo = oo("m9 18 6-6-6-6"), pc = oo("M20 6 9 17l-5-5");
function Zn(e) {
  return li(e);
}
const [Mo, Im, Dm, Lm] = /* @__PURE__ */ Pe(Zn, "JCL coordinate");
function Qn(e) {
  return li(e) && e >= 0;
}
const [bt, Sm, Mm, Tm] = /* @__PURE__ */ Pe(Qn, "JCL dimension");
function hc(e) {
  return De(e) && Zn(e.x) && Zn(e.y);
}
const [Rm, Am, Fm, zm] = /* @__PURE__ */ Pe(hc, "JCL position");
function fc(e) {
  return De(e) && Qn(e.Width) && Qn(e.Height);
}
const [Om, Vm, Em, Nm] = /* @__PURE__ */ Pe(fc, "JCL size");
function gc(e) {
  return De(e) && Zn(e.x) && Qn(e.Width) && Zn(e.y) && Qn(e.Height);
}
const [Bm, Wm, Hm, _m] = /* @__PURE__ */ Pe(gc, "JCL geometry"), Gm = ui;
function Qt(e) {
  return De(e) && "current" in e;
}
const [Km, Um, Wo, qm] = /* @__PURE__ */ Pe(Qt, "preact component reference");
function Ln(e) {
  return new RegExp("^(?:" + e + ")$");
}
function mc(e) {
  return dn("name", e), Rt(e);
}
function Rt(e) {
  return e.replaceAll(".", "-");
}
function vt(e) {
  let t = e.replace(/:.*$/, "").trim(), n = e.replace(/^[^:]*:/, "").trim();
  const o = /^[-]+$/.test(n), a = n[0] === "-";
  return t === e && (t = t.replace(/^-/, "")), a && (n = n.replace(/^-/, "")), { Value: t, Label: n, disabled: a, isRuler: o };
}
function G(e) {
  yt("PropSet", e);
  const t = {};
  for (const o of Object.keys(e))
    t[Qo(o)] = e[o];
  t.children = Yt(e.children);
  const n = {};
  for (const o of Object.keys(t))
    o !== "children" && o !== "RestProps" && (n[o] = t[o]);
  return t.RestProps = n, new Proxy(t, {
    get(o, a) {
      if (typeof a == "symbol")
        return o[a];
      switch (!0) {
        case a === "children":
          return [...o.children];
        // was normalised into an array
        case a === "RestProps":
          return n;
        // as a reference (to be modified externally)
        default: {
          const r = Qo(a);
          return delete o.RestProps[r], o[r];
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
    has(o, a) {
      if (typeof a == "symbol")
        return a in o;
      switch (!0) {
        case a === "children":
          return "children" in o;
        case a === "RestProps":
          return "RestProps" in o;
        default:
          return Qo(a) in o;
      }
    },
    ownKeys(o) {
      return Reflect.ownKeys(o);
    },
    getOwnPropertyDescriptor(o, a) {
      const r = Object.getOwnPropertyDescriptor(o, a);
      return r != null && (r.writable = !1, r.configurable = !0), r;
    }
  });
}
function Qo(e) {
  return e.replace(/[-_]/g, "").trim().toLowerCase();
}
function V(e, t) {
  if (Wt("Validator", t), t(e) === !0)
    return e;
}
function Y(e) {
  switch (!0) {
    case gn(e):
      return e;
    case e === "false":
      return !1;
    case e === "true":
      return !0;
  }
}
function Ge(e) {
  if (xt(e) || it(e) && (e = parseFloat(e), !isNaN(e)))
    return e;
}
function Et(e, t, n, o, a) {
  return ao(
    e,
    (r) => to(r, t, n, o, a)
  );
}
function Xm(e) {
  return ao(e, Ll);
}
function To(e, t, n) {
  return ao(
    e,
    (o) => Ca(o, t, n)
  );
}
function ke(e) {
  return ao(e, kn);
}
function qt(e) {
  return ao(e, Dl);
}
function pn(e) {
  return V(e, it);
}
function Ym(e, t) {
  return V(e, (n) => Bt(n, t));
}
function ae(e) {
  return V(e, $n);
}
function S(e) {
  return V(e, Be);
}
function A(e) {
  return V(e, Nt);
}
function mt(e) {
  return V(e, Xn);
}
function Jm(e) {
  return V(e, qn);
}
function Zm(e) {
  return V(e, Eo);
}
function mn(e) {
  return V(e, at);
}
function Qm(e) {
  return V(e, Ia);
}
function Pm(e) {
  return V(e, (t) => Ia(t) || kn(t));
}
function eb(e) {
  return V(e, pi);
}
function Se(e) {
  Nl("Identifier", e), ce("MissingArgument: no " + wt(e) + " given");
}
function ao(e, t) {
  if (t(e) === !0 || it(e) && (e = parseFloat(e), t(e) === !0))
    return e;
}
const xi = [
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
], wi = ["--jcl-border-radius"], vi = [
  "--jcl-font",
  "--jcl-serif-font",
  "--jcl-sans-serif-font",
  "--jcl-monospace-font"
], tb = [
  ...xi,
  ...wi,
  ...vi
];
function bc(e) {
  return typeof e != "string" ? !1 : typeof CSS > "u" ? !0 : CSS.supports("color", e);
}
function yc(e) {
  return typeof e != "string" ? !1 : typeof CSS > "u" ? !0 : CSS.supports("border-radius", e);
}
function sa(e) {
  if (!De(e))
    return !1;
  const t = (n, o) => e[n] === void 0 || o(e[n]);
  return xi.every((n) => t(n, bc)) && wi.every((n) => t(n, yc)) && vi.every((n) => t(n, it));
}
const [nb, ob, ab, rb] = /* @__PURE__ */ Pe(sa, "JCL swatch");
function xc(e) {
  return De(e) && sa(e.light) && sa(e.dark);
}
const [wc, ib, vc, sb] = /* @__PURE__ */ Pe(xc, "set of JCL swatches");
function ro(e, t) {
  if (St("UI theme", e, [...$i]), wc("set of UI swatches", t), e == null && (e = "light"), t == null)
    return "";
  e === "auto" && (e = Tt("(prefers-color-scheme: dark)") ? "dark" : "light");
  const n = t[e];
  return n == null ? "" : Object.entries(n).filter(([a]) => /^--[-a-zA-Z0-9_]+$/.test(a)).map(([a, r]) => `${a}:${String(r).replace(/[;}]/g, "")}`).join(";") + ";";
}
const Cc = ["ltr", "rtl"];
function Ci(e) {
  return it(e) && e.toLowerCase() in ji;
}
const [lb, cb, Sn, db] = /* @__PURE__ */ Pe(Ci, "supported locale"), kc = /* @__PURE__ */ new Set([
  "ar",
  // Arabic
  "he",
  // Hebrew
  "fa"
  // Persian / Farsi
]);
function ki(e) {
  Sn("Locale", e);
  const t = e.toLowerCase().replace(/-.*$/, "");
  return kc.has(t) ? "rtl" : "ltr";
}
const jc = {
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
}, $c = /^[a-z]{2}$/i;
function Ic(e) {
  return jl("ISO Country Code", e, $c), [...e.toUpperCase()].map(
    (t) => String.fromCodePoint(t.charCodeAt(0) + 127397)
  ).join("");
}
function ub(e) {
  Sn("Locale", e), e = e.toLowerCase();
  const t = La(jc, e);
  return t != null ? Ic(t) : "🏳";
}
function La(e, t) {
  return e[t] ?? e[t.split("-")[0]];
}
const ji = {
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
function pb(e) {
  return Sn("Locale", e), e = e.toLowerCase(), La(ji, e) ?? e;
}
const Dc = {
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
function Lc(e) {
  return e = e.toLowerCase(), La(Dc, e) ?? "USD";
}
function Ho(e) {
  const t = /* @__PURE__ */ new Map();
  return (n, o) => {
    const a = n + "|" + JSON.stringify(o);
    let r = t.get(a);
    return r == null && t.set(a, r = new e(n, o)), r;
  };
}
const Sc = Ho(Intl.PluralRules), Vr = Ho(Intl.NumberFormat), Mc = Ho(Intl.DateTimeFormat), Tc = Ho(Intl.RelativeTimeFormat);
function Rc(e, t) {
  return e.replace(
    /\{\{(\w+)\}\}/g,
    (n, o) => t[o] != null ? String(t[o]) : n
    // keep {{Key}} if variable is missing
  );
}
const Sa = {}, Ac = /^[^\x00-\x1F\x7F\x80-\x9F]+$/;
function xo(e) {
  return it(e) && Ac.test(e);
}
function Fc(e) {
  return De(e) ? Object.entries(e).every(([t, n]) => xo(t) && (xo(n) || De(n) && Object.entries(n).every(([o, a]) => xo(o) && xo(a)))) : !1;
}
const [hb, fb, zc, gb] = /* @__PURE__ */ Pe(Fc, "localization dictionary");
function Oc(e) {
  const t = Object.create(e);
  for (const n in t)
    t[n] = Object.create(t[n]);
  return t;
}
function Ro(e, t, n = Sa) {
  Sn("Locale", e), zc("Dictionary", t), e = e.toLowerCase(), n[e] == null ? n[e] = { ...t } : Object.assign(n[e], t);
}
function la(e, t, n = Sa) {
  Xt("localization key", e), Sn("locale", t), t = t.toLowerCase();
  let o = n[t]?.[e];
  if (o != null)
    return o;
  const a = t.split("-");
  for (; a.length > 1; )
    if (a.pop(), o = n[a.join("-")]?.[e], o != null)
      return o;
  if (t !== "en" && (o = n.en?.[e], o != null))
    return o;
}
const $i = ["auto", "light", "dark"], Vc = ["coarse", "fine"], Ec = ["none", "hover"], Nc = ["reduced"], Bc = ["less", "more"];
function Wc(e) {
  if (typeof e != "string")
    return "en";
  let t = e.toLowerCase();
  for (; ; ) {
    if (Ci(t))
      return t;
    const n = t.lastIndexOf("-");
    if (n < 0)
      break;
    t = t.slice(0, n);
  }
  return "en";
}
const Hc = {
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
function _c() {
  const e = Wc(
    typeof navigator < "u" ? navigator.language : "en"
  );
  return {
    Theme: "auto",
    // which means: "use OS setting"
    SwatchSet: structuredClone(Hc),
    PointerAccuracy: Tt("(pointer: coarse)") ? "coarse" : "fine",
    HoverCapability: Tt("(hover: none)") ? "none" : "hover",
    preferredMotion: Tt("(prefers-reduced-motion: reduce)") ? "reduced" : void 0,
    preferredContrast: Tt("(prefers-contrast: more)") ? "more" : Tt("(prefers-contrast: less)") ? "less" : void 0,
    Locale: e,
    Direction: ki(e),
    TooltipDelay: 600,
    [Lo]: Sa
  };
}
const _o = /* @__PURE__ */ _c(), ht = /* @__PURE__ */ Jt(void 0);
function io(e) {
  const [t, n] = He(e.Theme), [o, a] = He(e.SwatchSet), [r, i] = He(e.PointerAccuracy), [s, l] = He(e.HoverCapability), [c, d] = He(e.preferredMotion), [u, p] = He(e.preferredContrast), [h, f] = He(e.Locale), [g, x] = He(e.Direction), [m, C] = He(e.TooltipDelay), [k, L] = He(
    Oc(e[Lo])
  );
  function j(E) {
    _n("UI theme", E, [...$i]), n(E);
  }
  function y(E) {
    vc("UI swatch set", E), a(E);
  }
  function w(E) {
    _n("UI pointer accuracy", E, [...Vc]), i(E);
  }
  function F(E) {
    _n("UI hover capability", E, [...Ec]), l(E);
  }
  function M(E) {
    St("preferred UI motion", E, [...Nc]), d(E);
  }
  function $(E) {
    St("preferred UI contrast", E, [...Bc]), p(E);
  }
  function I(E) {
    Sn("Locale", E), f(E);
  }
  function T(E) {
    _n("text direction", E, [...Cc]), x(E);
  }
  function D(E) {
    Yn("tooltip delay", E), C(E);
  }
  function z(E, X) {
    Ro(E, X, k), L({ ...k });
  }
  return Zt(() => ({
    Theme: t,
    setTheme: j,
    SwatchSet: o,
    setSwatchSet: y,
    PointerAccuracy: r,
    setPointerAccuracy: w,
    HoverCapability: s,
    setHoverCapability: F,
    preferredMotion: c,
    setPreferredMotion: M,
    preferredContrast: u,
    setPreferredContrast: $,
    Locale: h,
    setLocale: I,
    Direction: g,
    setDirection: T,
    TooltipDelay: m,
    setTooltipDelay: D,
    [Lo]: k,
    registerL10n: z
  }), [
    t,
    o,
    r,
    s,
    c,
    u,
    h,
    g,
    m,
    k
  ]);
}
const Gc = /* @__PURE__ */ Object.create(null);
function rt(e) {
  return Xt("module specifier", e), Gc[e] ??= import(e);
}
function so(e) {
  let t;
  return () => t ??= e();
}
const Er = /* @__PURE__ */ new WeakMap(), wo = /* @__PURE__ */ new WeakMap();
function Mn(e) {
  Wt("library loader", e);
  const [t, n] = He(wo.get(e));
  switch (je(() => {
    if (wo.get(e) === "loaded")
      return;
    let o = !1, a = Er.get(e);
    return a == null && (a = e(), Er.set(e, a)), a.then(() => {
      wo.set(e, "loaded"), o || n("loaded");
    }, (r) => {
      wo.set(e, r), o || n(r);
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
function Kc() {
  const [e, t] = He(
    // SSR-ready
    () => typeof navigator < "u" ? navigator.onLine : !0
  );
  return je(() => {
    const n = new AbortController(), o = () => t(!0), a = () => t(!1);
    return window.addEventListener("online", o, { signal: n.signal }), window.addEventListener("offline", a, { signal: n.signal }), () => n.abort();
  }, []), e;
}
function Uc() {
  const [e, t] = He(() => ({
    // SSR-ready
    Width: typeof window < "u" ? window.innerWidth : 0,
    Height: typeof window < "u" ? window.innerHeight : 0
  })), n = K(0), o = ie(() => {
    cancelAnimationFrame(n.current), n.current = requestAnimationFrame(() => {
      t({ Width: window.innerWidth, Height: window.innerHeight });
    });
  }, []);
  return je(() => (window.addEventListener("resize", o), () => {
    window.removeEventListener("resize", o), cancelAnimationFrame(n.current);
  }), [o]), e;
}
function et() {
  const [e, t] = He({});
  return ie(() => t({}), []);
}
function Go() {
  const e = st(ht);
  return e == null && ce(
    'InvalidContext: "useCustomization" must only be used inside a "JCL_Applet", "JCL_Overlay", "JCL_Dialog" or "JCL_Customizable"'
  ), e;
}
function qc() {
  return Ma(Go());
}
function Ma(e) {
  const { Locale: t, Direction: n, [Lo]: o } = e, a = Lc(t);
  function r(d, u, p) {
    const h = la(d, t, o);
    if (h == null)
      return d;
    let f;
    if (typeof h == "string")
      f = h;
    else {
      const g = Sc(t).select(p ?? 0);
      f = h[g] ?? h.other ?? d;
    }
    return u == null ? f : Rc(f, u);
  }
  function i(d, u) {
    return Vr(t, u).format(d);
  }
  function s(d, u) {
    return Mc(t, u).format(d);
  }
  function l(d, u, p) {
    return Tc(t, p).format(d, u);
  }
  function c(d, u) {
    return Vr(t, {
      style: "currency",
      currency: a,
      ...u
    }).format(d);
  }
  return {
    Locale: t,
    Direction: n,
    Currency: a,
    localized: r,
    formattedNumber: i,
    formattedDate: s,
    formattedRelativeDate: l,
    formattedCurrency: c
  };
}
function Xc(e = {}) {
  !Nt(e) && !De(e) && ce(
    "InvalidArgument:the given initial configuration is neither a plain object nor a function"
  );
  const t = K(void 0);
  t.current == null && (Nt(e) && (e = Ke(
    'component callback "initialConfiguration"',
    e
  ), De(e) || ce(
    "InvalidArgument:the result of the initial configuration callback is not a plain object"
  )), t.current = { ...e });
  const n = ie((o) => {
    if (si("configuration change set", o), o != null)
      for (const [a, r] of Object.entries(o))
        r === void 0 ? delete t.current[a] : De(r) ? De(t.current[a]) ? Object.assign(t.current[a], r) : t.current[a] = { ...r } : ce(
          "InvalidArgument: configuration[" + wt(a) + "] is no plain JavaScript object"
        );
  }, []);
  return [t.current, n];
}
let vn;
function Ii(e) {
  typeof document > "u" || (vn == null && (vn = document.createElement("style"), document.head.appendChild(vn)), vn.textContent = "* { cursor:" + e + " !important }");
}
function Yc(e) {
  if (typeof document > "u")
    return;
  Pn();
  const t = getComputedStyle(e).cursor;
  t === "" || t === "auto" || Ii(t);
}
function Pn() {
  vn?.remove(), vn = void 0;
}
function Ta(e) {
  e != null && !Be(e) && !(e instanceof HTMLElement) && !Nt(e) && ce(
    'InvalidArgument: "Container" is neither a CSS selector nor an HTML element or a function'
  );
}
function In(e, t) {
  t != null && !Be(t) && !(t instanceof HTMLElement) && ce(
    `InvalidArgument: "${e}" is neither a CSS selector nor an HTML element`
  );
}
function Ra(e, t) {
  switch (!0) {
    case t == null:
      return e.parentElement ?? void 0;
    case t === "self":
      return e;
    case Be(t):
      return e.parentElement?.closest(t);
    case Nt(t): {
      const n = t();
      return n instanceof HTMLElement ? n : void 0;
    }
    default:
      return t;
  }
}
function Aa(e) {
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
function hn({
  ViewRef: e,
  Container: t,
  onlyFrom: n,
  neverFrom: o,
  onDragStart: a,
  onDragContinuation: r,
  onDragFinish: i,
  onDragCancellation: s
}) {
  Wo("ViewRef", e), Ta(t), In("onlyFrom", n), In("neverFrom", o), Ae('"onDragStart" callback', a), Ae('"onDragContinuation" callback', r), Ae('"onDragFinish" callback', i), Ae('"onDragCancellation" callback', s);
  const l = a != null && r != null && i != null && s != null, c = K();
  c.current = { onDragStart: a, onDragContinuation: r, onDragFinish: i, onDragCancellation: s };
  const d = K(!1);
  d.current = l;
  const u = K(), p = K(), h = K(!1);
  je(() => {
    e.current != null && (u.current = Ra(e.current, t));
  }, [
    e.current
    /* Container */
  ]), je(() => () => {
    window.removeEventListener("pointermove", g), window.removeEventListener("pointerup", x), window.removeEventListener("pointercancel", m), window.removeEventListener("blur", C), h.current && (h.current = !1, Pn());
  }, []);
  const f = ie((y) => {
    if (!(y.target instanceof HTMLElement) || !Aa(y) || !l || u.current == null || n != null && !j(y.target, n) || o != null && j(y.target, o))
      return;
    window.addEventListener("pointermove", g), window.addEventListener("pointerup", x), window.addEventListener("pointercancel", m), window.addEventListener("blur", C), e.current.setPointerCapture?.(y.pointerId), Yc(y.target);
    const w = u.current, F = w.getBoundingClientRect(), M = y.clientX - F.left + w.scrollLeft, $ = y.clientY - F.top + w.scrollTop;
    p.current = { x: M, y: $ }, h.current = !0, N('useDragging callback "onDragStart"', c.current?.onDragStart, 0, 0, M, $, y);
  }, [e, l, n, o]), g = ie((y) => {
    if (h.current !== !1) {
      if (y.pointerType === "mouse" && y.buttons === 0) {
        k(y, !1);
        return;
      }
      u.current != null && N('useDragging callback "onDragContinuation"', c.current?.onDragContinuation, ...L(y));
    }
  }, []), x = ie((y) => {
    k(y, !1);
  }, []), m = ie((y) => {
    k(y, !0);
  }, []), C = ie(() => {
    k(null, !0);
  }, []), k = ie((y, w) => {
    if (h.current !== !1) {
      if (h.current = !1, Pn(), y != null && e.current?.hasPointerCapture?.(y.pointerId) && e.current.releasePointerCapture(y.pointerId), window.removeEventListener("pointermove", g), window.removeEventListener("pointerup", x), window.removeEventListener("pointercancel", m), window.removeEventListener("blur", C), w) {
        N('useDragging callback "onDragCancellation"', c.current?.onDragCancellation, 0, 0, p.current.x, p.current.y, y);
        return;
      }
      u.current != null && d.current && N('useDragging callback "onDragFinish"', c.current?.onDragFinish, ...L(y));
    }
  }, []);
  function L(y) {
    const w = u.current;
    if (w == null)
      return [0, 0, 0, 0, y];
    const F = w.getBoundingClientRect(), M = y.clientX - F.left + w.scrollLeft, $ = y.clientY - F.top + w.scrollTop, I = M - p.current.x, T = $ - p.current.y;
    return [I, T, M, $, y];
  }
  function j(y, w) {
    switch (!0) {
      // matching element (e.g. the title
      case w == null:
        return !0;
      case typeof w == "string":
        return y.closest(w) != null;
      default:
        return w.contains(y);
    }
  }
  return l ? f : void 0;
}
function Tn({
  ViewRef: e,
  Container: t,
  onlyFrom: n,
  neverFrom: o,
  Threshold: a = 4,
  onClick: r,
  onDragStart: i,
  onDragContinuation: s,
  onDragFinish: l,
  onDragCancellation: c
}) {
  Wo("ViewRef", e), Ta(t), In("onlyFrom", n), In("neverFrom", o), va("drag threshold", a), Ae('"onClick" callback', r), Ae('"onDragStart" callback', i), Ae('"onDragContinuation" callback', s), Ae('"onDragFinish" callback', l), Ae('"onDragCancellation" callback', c);
  const d = r != null, u = i != null && s != null && l != null && c != null, p = d || u, h = K();
  h.current = { onClick: r, onDragStart: i, onDragContinuation: s, onDragFinish: l, onDragCancellation: c };
  const f = K(!1);
  f.current = d;
  const g = K(!1);
  g.current = u;
  const x = K(a);
  x.current = a;
  const m = K(), C = K(), k = K(), L = K(!1), j = K(!1);
  je(() => {
    e.current != null && (m.current = Ra(e.current, t));
  }, [
    e.current
    /* Container */
  ]), je(() => () => {
    window.removeEventListener("pointermove", w), window.removeEventListener("pointerup", F), window.removeEventListener("pointercancel", M);
  }, []);
  const y = ie((D) => {
    if (!(D.target instanceof HTMLElement) || !Aa(D) || !p || m.current == null || n != null && !T(D.target, n) || o != null && T(D.target, o))
      return;
    window.addEventListener("pointermove", w), window.addEventListener("pointerup", F), window.addEventListener("pointercancel", M), e.current.setPointerCapture?.(D.pointerId);
    const z = m.current, E = z.getBoundingClientRect(), X = D.clientX - E.left + z.scrollLeft, Q = D.clientY - E.top + z.scrollTop;
    C.current = { x: X, y: Q }, k.current = D, L.current = !0, j.current = !1;
  }, [e, p, n, o]), w = ie((D) => {
    if (L.current === !1 || m.current == null)
      return;
    const [z, E, X, Q] = I(D);
    if (!j.current) {
      if (Math.sqrt(z * z + E * E) < x.current)
        return;
      j.current = !0, g.current && N('useClickDragging callback "onDragStart"', h.current?.onDragStart, 0, 0, C.current.x, C.current.y, k.current);
    }
    g.current && N('useClickDragging callback "onDragContinuation"', h.current?.onDragContinuation, z, E, X, Q, D);
  }, []), F = ie((D) => {
    $(D, !1);
  }, []), M = ie((D) => {
    $(D, !0);
  }, []), $ = ie((D, z) => {
    if (L.current !== !1) {
      if (L.current = !1, e.current?.hasPointerCapture?.(D.pointerId) && e.current.releasePointerCapture(D.pointerId), window.removeEventListener("pointermove", w), window.removeEventListener("pointerup", F), window.removeEventListener("pointercancel", M), z) {
        j.current && g.current && N('useClickDragging callback "onDragCancellation"', h.current?.onDragCancellation, 0, 0, C.current.x, C.current.y, D), j.current = !1;
        return;
      }
      if (j.current)
        g.current && N('useClickDragging callback "onDragFinish"', h.current?.onDragFinish, ...I(D));
      else if (f.current && m.current != null) {
        const E = m.current, X = E.getBoundingClientRect(), Q = D.clientX - X.left + E.scrollLeft, pe = D.clientY - X.top + E.scrollTop;
        N('useClickDragging callback "onClick"', h.current?.onClick, Q, pe, D);
      }
      j.current = !1;
    }
  }, []);
  function I(D) {
    const z = m.current;
    if (z == null)
      return [0, 0, 0, 0, D];
    const E = z.getBoundingClientRect(), X = D.clientX - E.left + z.scrollLeft, Q = D.clientY - E.top + z.scrollTop, pe = X - C.current.x, q = Q - C.current.y;
    return [pe, q, X, Q, D];
  }
  function T(D, z) {
    switch (!0) {
      case z == null:
        return !0;
      case typeof z == "string":
        return D.matches(z);
      default:
        return D === z;
    }
  }
  return p ? y : void 0;
}
const Fa = [
  "none",
  "copy",
  "copyLink",
  "copyMove",
  "link",
  "linkMove",
  "move",
  "all"
];
function Jc(e, t, { Effect: n, draggedGhost: o, onDropped: a } = {}) {
  $l("Data", e), Kl("MIMEType", t), St("Effect", n, [...Fa]), Ae('"draggedGhost" callback', o), Ae('"onDropped" callback', a);
  const r = K(e);
  r.current = e;
  const i = K(t);
  i.current = t;
  const s = K();
  s.current = n;
  const l = K({});
  l.current = { draggedGhost: o, onDropped: a };
  const c = ie((u) => {
    const p = u.dataTransfer;
    if (p == null)
      return;
    p.setData(i.current, r.current), s.current != null && (p.effectAllowed = s.current);
    const h = Ke('useDataDragSupport callback "draggedGhost"', l.current.draggedGhost, u) ?? null;
    h != null && (document.body.appendChild(h), p.setDragImage(h, h.offsetWidth / 2, h.offsetHeight / 2), requestAnimationFrame(() => h.remove()));
  }, []), d = ie((u) => {
    const p = u.dataTransfer?.dropEffect ?? "none";
    p !== "none" && N('useDataDragSupport callback "onDropped"', l.current.onDropped, p, u);
  }, []);
  return { draggable: !0, onDragStart: c, onDragEnd: d };
}
function Di(e) {
  const { Name: t, DragDepth: n, setIsOver: o, accepts: a, CallbacksOf: r, processedDrop: i } = e;
  function s(u) {
    a(u) && (u.preventDefault(), N(t + ' callback "onDragOver"', r().onDragOver, u));
  }
  function l(u) {
    a(u) && (u.preventDefault(), ++n.current === 1 && (o(!0), N(t + ' callback "onDragEnter"', r().onDragEnter, u)));
  }
  function c(u) {
    n.current > 0 && --n.current === 0 && (o(!1), N(t + ' callback "onDragLeave"', r().onDragLeave, u));
  }
  function d(u) {
    const p = i(u);
    p != null && (u.preventDefault(), n.current = 0, o(!1), N(t + ' callback "onDrop"', r().onDrop, ...p, u));
  }
  return { handleDragEnter: l, handleDragOver: s, handleDragLeave: c, handleDrop: d };
}
function Zc(e, {
  onDragEnter: t,
  onDragOver: n,
  onDragLeave: o,
  onDrop: a
} = {}) {
  switch (!0) {
    case Jn(e):
      e = [e];
      break;
    case ci(e):
      for (const f of e)
        Jn(f) || ce(
          'InvalidArgument: each entry in "MIMETypes" must be a non-empty string without line breaks'
        );
      break;
    default:
      ce(
        'InvalidArgument: "MIMETypes" must be a MIME type string or a non-empty array of MIME type strings'
      );
  }
  Ae('"onDragEnter" callback', t), Ae('"onDragOver" callback', n), Ae('"onDragLeave" callback', o), Ae('"onDrop" callback', a);
  const [r, i] = He(!1), s = K(0), l = K({});
  l.current = { onDragEnter: t, onDragOver: n, onDragLeave: o, onDrop: a };
  const c = e.join(","), { handleDragEnter: d, handleDragOver: u, handleDragLeave: p, handleDrop: h } = Zt(() => {
    function f(g) {
      return g == null ? !1 : [...g.types].some((x) => e.includes(x));
    }
    return Di({
      Name: "useDataDropSupport",
      DragDepth: s,
      setIsOver: i,
      accepts: (g) => f(g.dataTransfer),
      CallbacksOf: () => l.current,
      processedDrop: (g) => f(g.dataTransfer) ? [g.dataTransfer] : void 0
    });
  }, [c]);
  return {
    isOver: r,
    onDragEnter: d,
    onDragOver: u,
    onDragLeave: p,
    onDrop: h
  };
}
const Qc = ["move", "copy", "alias"];
function Pc({
  ViewRef: e,
  Container: t,
  onlyFrom: n,
  neverFrom: o,
  Threshold: a = 4,
  Data: r,
  allowedEffects: i,
  GrabCursor: s = "grab",
  GrabbedCursor: l = "grabbing",
  onClick: c,
  onDragStart: d,
  onDragContinuation: u,
  onDragFinish: p,
  onDragCancellation: h,
  onDrop: f
}) {
  Wo("preact component reference", e), Ta(t), In("onlyFrom", n), In("neverFrom", o), va("drag threshold", a), zt("allowedEffects", i, (ee) => be(ee, Qc), "list of drop effects", 1), ln('"GrabCursor" CSS cursor', s), ln('"GrabbedCursor" CSS cursor', l), Ae('"onClick" callback', c), Ae('"onDragStart" callback', d), Ae('"onDragContinuation" callback', u), Ae('"onDragFinish" callback', p), Ae('"onDragCancellation" callback', h), Ae('"onDrop" callback', f);
  const g = c != null, x = d != null && u != null && p != null && h != null, m = g || x, C = K();
  C.current = { onClick: c, onDragStart: d, onDragContinuation: u, onDragFinish: p, onDragCancellation: h, onDrop: f };
  const k = K(!1);
  k.current = g;
  const L = K(!1);
  L.current = x;
  const j = K(a);
  j.current = a;
  const y = K(r);
  y.current = r;
  const w = i ?? ["move"], F = K(w);
  F.current = w;
  const M = K(l);
  M.current = l;
  const { closestDropTarget: $ } = st(za), I = K($);
  I.current = $;
  const T = K(), D = K(), z = K(), E = K(!1), X = K(!1), Q = K(), pe = K(), q = K();
  je(() => {
    e.current != null && (T.current = Ra(e.current, t));
  }, [
    e.current
    /* Container */
  ]), je(() => {
    if (!(!x || e.current == null))
      return e.current.style.cursor = s, () => {
        e.current != null && (e.current.style.cursor = "");
      };
  }, [e, x, s]), je(() => () => {
    window.removeEventListener("pointermove", P), window.removeEventListener("pointerup", ue), window.removeEventListener("pointercancel", Ce), E.current && (E.current = !1, Pn());
  }, []);
  const J = ie((ee) => {
    if (!(ee.target instanceof HTMLElement) || !Aa(ee) || !m || T.current == null || n != null && !te(ee.target, n) || o != null && te(ee.target, o))
      return;
    window.addEventListener("pointermove", P), window.addEventListener("pointerup", ue), window.addEventListener("pointercancel", Ce), e.current.setPointerCapture?.(ee.pointerId);
    const ne = T.current, se = ne.getBoundingClientRect(), xe = ee.clientX - se.left + ne.scrollLeft, we = ee.clientY - se.top + ne.scrollTop;
    D.current = { x: xe, y: we }, z.current = ee, E.current = !0, X.current = !1, Q.current = void 0, pe.current = void 0, q.current = void 0;
  }, [e, m, n, o]), P = ie((ee) => {
    if (!E.current || T.current == null)
      return;
    const [ne, se, xe, we] = _e(ee);
    if (!X.current) {
      if (Math.sqrt(ne * ne + se * se) < j.current)
        return;
      X.current = !0, L.current && C.current.onDragStart?.(0, 0, D.current.x, D.current.y, z.current);
    }
    if (L.current) {
      const Ie = ee.altKey && F.current.includes("copy") ? ["copy"] : F.current, Me = I.current(ee.clientX, ee.clientY), Fe = Me?.[0], lt = Me?.[1];
      if (Fe !== Q.current) {
        Q.current != null && pe.current.onLeave?.(y.current);
        const ye = Fe != null ? lt.accepts(y.current, Ie) : !1;
        ye !== !1 ? (lt.onEnter?.(y.current, ye, xe, we), Q.current = Fe, pe.current = lt, q.current = ye) : (Q.current = void 0, pe.current = void 0, q.current = void 0);
      } else if (Q.current != null) {
        const ye = pe.current.accepts(y.current, Ie);
        ye !== !1 ? (q.current = ye, pe.current.onOver?.(y.current, ye, xe, we)) : (pe.current.onLeave?.(y.current), Q.current = void 0, pe.current = void 0, q.current = void 0);
      }
      Ii(
        // shares the singleton of "useDragging"
        Q.current != null ? nt(q.current) : ot(ee.clientX, ee.clientY) ? M.current : "no-drop"
      ), C.current.onDragContinuation?.(ne, se, xe, we, ee);
    }
  }, []), ue = ie((ee) => {
    Ve(ee, !1);
  }, []), Ce = ie((ee) => {
    Ve(ee, !0);
  }, []), Ve = ie((ee, ne) => {
    if (E.current) {
      if (E.current = !1, e.current?.hasPointerCapture?.(ee.pointerId) && e.current.releasePointerCapture(ee.pointerId), window.removeEventListener("pointermove", P), window.removeEventListener("pointerup", ue), window.removeEventListener("pointercancel", Ce), X.current && Pn(), ne) {
        X.current && L.current && (Q.current != null && (pe.current.onLeave?.(y.current), Q.current = void 0, pe.current = void 0, q.current = void 0), C.current.onDragCancellation?.(0, 0, D.current.x, D.current.y, ee)), X.current = !1;
        return;
      }
      if (X.current) {
        if (L.current)
          if (Q.current != null) {
            const se = Q.current, xe = pe.current, we = q.current, Ie = se.getBoundingClientRect(), Me = ee.clientX - Ie.left + se.scrollLeft, Fe = ee.clientY - Ie.top + se.scrollTop;
            Q.current = void 0, pe.current = void 0, q.current = void 0, xe.onDrop?.(y.current, we, Me, Fe), C.current.onDrop?.(0, 0, D.current.x, D.current.y, ee, se, we);
          } else
            C.current.onDragFinish?.apply(null, _e(ee));
      } else if (k.current && T.current != null) {
        const se = T.current, xe = se.getBoundingClientRect(), we = ee.clientX - xe.left + se.scrollLeft, Ie = ee.clientY - xe.top + se.scrollTop;
        C.current.onClick?.(we, Ie, ee);
      }
      X.current = !1;
    }
  }, []);
  function _e(ee) {
    const ne = T.current;
    if (ne == null)
      return [0, 0, 0, 0, ee];
    const se = ne.getBoundingClientRect(), xe = ee.clientX - se.left + ne.scrollLeft, we = ee.clientY - se.top + ne.scrollTop, Ie = xe - D.current.x, Me = we - D.current.y;
    return [Ie, Me, xe, we, ee];
  }
  function nt(ee) {
    switch (ee) {
      case "copy":
        return "copy";
      case "alias":
        return "alias";
      case "move":
        return "move";
      default:
        return M.current;
    }
  }
  function ot(ee, ne) {
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
function ed({
  ViewRef: e,
  accepts: t,
  onEnter: n,
  onOver: o,
  onLeave: a,
  onDrop: r
}) {
  Wo("preact component reference", e), Wt("accepts", t), Ae('"onEnter" callback', n), Ae('"onOver" callback', o), Ae('"onLeave" callback', a), Ae('"onDrop" callback', r);
  const [i, s] = He(!1), l = K(
    { accepts: t, onEnter: n, onOver: o, onLeave: a, onDrop: r }
  );
  l.current = { accepts: t, onEnter: n, onOver: o, onLeave: a, onDrop: r };
  const { registerDropTarget: c } = st(za);
  return je(() => {
    if (e.current != null)
      return c(e.current, {
        accepts: (d, u) => l.current.accepts(d, u),
        onEnter: (d, u, p, h) => {
          s(!0), N('usePointerDropSupport callback "onEnter"', l.current.onEnter, d, u, p, h);
        },
        onOver: (d, u, p, h) => N('usePointerDropSupport callback "onOver"', l.current.onOver, d, u, p, h),
        onLeave: (d) => {
          s(!1), N('usePointerDropSupport callback "onLeave"', l.current.onLeave, d);
        },
        onDrop: (d, u, p, h) => {
          s(!1), N('usePointerDropSupport callback "onDrop"', l.current.onDrop, d, u, p, h);
        }
      });
  }, [e.current]), { isOver: i };
}
const ca = /* @__PURE__ */ new WeakMap();
function td(e, t) {
  return ca.set(e, t), () => ca.delete(e);
}
function nd(e, t) {
  let n = document.elementFromPoint(e, t);
  for (; n != null; ) {
    const o = ca.get(n);
    if (o != null)
      return [n, o];
    n = n.parentElement;
  }
}
const za = /* @__PURE__ */ Jt({
  registerDropTarget: td,
  closestDropTarget: nd
});
function od(e, {
  multiple: t,
  disabled: n,
  onDragEnter: o,
  onDragOver: a,
  onDragLeave: r,
  onDrop: i
} = {}) {
  switch (e == null && (e = "*/*"), !0) {
    case Be(e):
      e = e.trim().replace(/[,\s]+/g, " ").split(" ");
      break;
    case $e(e, Be):
      break;
    default:
      ce(
        'InvalidArgument: "accept" must be a file type string or a non-empty array of file type strings'
      );
  }
  Kt('"multiple" flag', t), Kt('"disabled" flag', n), Ae('"onDragEnter" callback', o), Ae('"onDragOver" callback', a), Ae('"onDragLeave" callback', r), Ae('"onDrop" callback', i);
  const s = e.map(
    (C) => C.replace(/;.*$/, "").trim().toLowerCase()
  ).filter((C) => C !== "");
  s.length === 0 && s.push("*/*");
  const l = (
    // also allows for "*" wildcards
    /^(\*\/\*|[a-z0-9]+([._+-][a-z0-9]+)*\/(\*|[a-z0-9]+([._+-][a-z0-9]+)*))$/
  );
  s.every(
    (C) => l.test(C)
  ) || ce(
    "InvalidArgument: the given list of accepted file types is invalid"
  );
  const [c, d] = He(!1), u = K(0), p = K({});
  p.current = { multiple: t, disabled: n, onDragEnter: o, onDragOver: a, onDragLeave: r, onDrop: i };
  const h = s.join(","), { handleDragEnter: f, handleDragOver: g, handleDragLeave: x, handleDrop: m } = Zt(() => {
    function C(L) {
      return s.some((j) => j === "*/*" ? !0 : j.endsWith("/*") ? L.startsWith(j.slice(0, -1)) : L === j);
    }
    function k(L) {
      if (L == null)
        return !1;
      const j = L.items;
      return j == null ? [...L.types].includes("Files") : Array.from(j).some(
        (y) => y.kind === "file" && C(y.type.toLowerCase())
      );
    }
    return Di({
      Name: "useFileDropSupport",
      DragDepth: u,
      setIsOver: d,
      accepts: (L) => p.current.disabled != !0 && k(L.dataTransfer),
      CallbacksOf: () => p.current,
      processedDrop: (L) => {
        if (p.current.disabled == !0)
          return;
        const j = L.dataTransfer?.files;
        if (j == null)
          return;
        let y = Array.from(j).filter(
          (w) => C(w.type.toLowerCase())
        );
        return p.current.multiple != !0 && (y = y.slice(0, 1)), y.length === 0 ? void 0 : [y];
      }
    });
  }, [h]);
  return {
    isOver: c,
    onDragEnter: f,
    onDragOver: g,
    onDragLeave: x,
    onDrop: m
  };
}
function Pt(e, t) {
  const n = K(), o = K(void 0);
  let a = e ?? ct;
  return n.current != null && document.activeElement === n.current ? a = o.current : (t != null && (a = t(a)), o.current = a), { ViewRef: n, shownValue: o, ValueToShow: a };
}
function jt(e, t) {
  const n = K(e ?? t), o = K(e ?? t);
  return e != null && e !== n.current && (o.current = e, n.current = e), o;
}
function en(e) {
  const {
    Name: t,
    actualDisabling: n,
    shownValue: o,
    onInput: a,
    onValueInput: r,
    onBlur: i,
    processedInput: s
  } = e, l = et(), c = ie((u) => {
    if (Le(u), n == !0)
      return;
    N(t + ' callback "onInput"', a, u);
    let p;
    s == null ? (p = u.target.value, o.current = p === "" ? ct : p) : p = s(u), N(t + ' callback "onValueInput"', r, p, u);
  }, [n, a, r]), d = ie((u) => {
    l(), N(t + ' callback "onBlur"', i, u);
  }, [i]);
  return { _onInput: c, _onBlur: d, rerender: l };
}
function tn(e, t) {
  const n = Dt();
  let o = "", a;
  if (e != null && e.length > 0) {
    a = n + "-Suggestions";
    const r = t ?? ((i) => b`<option value=${i}></option>`);
    o = b`<datalist id=${a}>
        ${e.map((i) => r(i))}
      </datalist>`;
  }
  return { SuggestionId: a, SuggestionList: o };
}
function Li(e) {
  const [t, n] = He({
    Width: 0,
    Height: 0
  });
  return $a(() => {
    const o = e.current;
    if (o == null)
      return;
    const a = new ResizeObserver(() => n(
      (r) => {
        const i = o.clientWidth, s = o.clientHeight;
        return r.Width === i && r.Height === s ? r : { Width: i, Height: s };
      }
    ));
    return a.observe(o), () => a.disconnect();
  }, []), t;
}
function mb(e) {
  let t = Math.round(Math.random() * 1e4).toString();
  return t += "0000".slice(t.length), e = (e || "This operation can not be undone.") + `

Please, enter the following number if you want to proceed:

   ` + t + `

Otherwise, the operation will be cancelled`, window.prompt(e, "") === t ? !0 : (window.alert("Operation will be cancelled"), !1);
}
const eo = /* @__PURE__ */ Object.create(null);
function Z(e, t) {
  let n = !1;
  return () => {
    n || (n = !0, Oa(e, t));
  };
}
let Nr = !1;
function ad() {
  if (Nr || typeof document > "u")
    return;
  Nr = !0;
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
    background:url(${yi}icons/xmark.png);
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

  .disabled, [disabled] { opacity:0.4 }
  .readonly             { background:none }
  .pointer-unaware      { pointer-events:none }

/**** some special settings ****/

  .jcl-component.with-outline {
    outline:dotted 1px blue;
    outline-offset:2px;
  }

      `.trim(), document.head.prepend(e)), Object.keys(eo).forEach((t) => {
    Oa(t, eo[t], !0);
  });
}
function Oa(e, t, n = !1) {
  if (hi("stylesheet name", e), Je("stylesheet", t), di("mode flag", n), typeof document > "u")
    return;
  const o = "Stylesheet-for-" + Rt(e);
  let a = document.head.querySelector('style[id="' + o + '"]');
  if (a == null) {
    a = document.createElement("style"), a.id = o, a.textContent = t;
    const r = document.head.querySelectorAll(
      'style[id^="Stylesheet-for-"]'
    ), i = r.length > 0 ? r[r.length - 1] : document.getElementById("JCL-Stylesheet");
    i == null ? document.head.prepend(a) : i.after(a), eo[e] = t;
  } else
    n ? (a.textContent = t, eo[e] = t) : console.warn('multiple definitions for stylesheet "' + e + '"');
}
function rd(e) {
  if (hi("stylesheet name", e), typeof document > "u")
    return;
  const t = "Stylesheet-for-" + Rt(e);
  let n = document.head.querySelector('style[id="' + t + '"]');
  n?.remove(), delete eo[e];
}
function Ut(e) {
  return _(() => {
    id(), e = G(e);
    let t = V(
      e.Error,
      (a) => a instanceof Error || $n(a)
    ), n = A(e.ErrorResetter);
    switch (!0) {
      case t instanceof Error:
        break;
      case $n(t):
        if (/^[^\n]+\n\n[^\n]+/.test(t)) {
          const a = t.replace(/\n\n.*$/, ""), r = t.replace(/^[^\n]+\n\n/, "");
          t = new Error(r), t.name = a;
        } else
          t = new Error(t), t.name = "Unexpected Failure";
        break;
      default:
        t = new Error("" + t), t.name = "Unexpected Failure";
    }
    return b`<div class="jcl-error-indicator" onClick=${() => {
      console.warn(t), window.alert(sd(t));
    }}/>`;
  });
}
const id = /* @__PURE__ */ Z("jcl-error-indicator", `
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
function sd(e) {
  let t = e.name, n = e.message || "(unidentified error)", o = e.stack ?? "";
  const a = t.replace(/([a-z])([A-Z])/g, "$1 $2"), r = n.charAt(0).toUpperCase() + n.slice(1);
  return o === "" ? `${a}

${r}` : `${a}

${r}

${o}`;
}
function ld(e) {
  return { current: e };
}
let Br = !1;
function _(e) {
  Br || (Br = !0, ad(), zl()), Wt("rendering function", e);
  const [t, n] = ja();
  if (t != null) {
    const o = e.name ?? "";
    return o.trim() === "" ? console.warn("rendering error within preact component: " + t) : console.warn(
      "rendering error within " + wt(o) + ": " + t
    ), b`<${Ut} Error=${t} ErrorResetter=${n}/>`;
  }
  try {
    return e();
  } catch (o) {
    const a = e.name ?? "";
    return a.trim() === "" ? console.warn("error while rendering a preact component: " + o) : console.warn(
      "error while rendering component " + wt(a) + ": " + o
    ), b`<${Ut} Error=${o} ErrorResetter=${n}/>`;
  }
}
function cd(e) {
  return _(() => {
    const t = Go(), n = io(t), { Theme: o, SwatchSet: a, Locale: r, Direction: i } = n, s = ro(o, a);
    return b`<div class="jcl-component customizable"
        dir=${i} lang=${r} style=${s}
      >
        <${ht.Provider} value=${n}>
          ${e.children}
        </>
      </>`;
  });
}
function Va(e) {
  return e = { ...e }, Object.keys(e).forEach((t) => {
    e[t] === void 0 && delete e[t];
  }), e;
}
function Ea(e, t, n) {
  Object.assign(e, n), t != null && (t.current == null && (t.current = {}), Object.assign(t.current, n));
}
function Na(e) {
  return () => {
    ce("MissingArgument:function not in " + e);
  };
}
function Ba(e) {
  const t = K([]), n = et();
  function o(s) {
    dn(e + " name", s);
    const l = Rt(s), c = t.current;
    if (c.length === 0)
      return;
    const d = c.findIndex(
      (u) => u[un] === l
    );
    d < 0 || (t.current = c.filter(
      (u, p) => p !== d
    ), n());
  }
  function a() {
    t.current.length !== 0 && (t.current = [], n());
  }
  function r(s) {
    dn(e + " name", s);
    const l = Rt(s);
    return t.current.findIndex(
      (c) => c[un] === l
    ) >= 0;
  }
  const i = t.current.map(
    (s) => s.Name
  );
  return { ListRef: t, rerender: n, closeEntity: o, closeAllEntities: a, EntityIsOpen: r, openEntities: i };
}
function Wa(e, t, n) {
  De(e) || ce(
    "InvalidArgument: the given " + t + " descriptor is no plain JavaScript object"
  );
  const o = e.Name == null ? t + " descriptor" : "descriptor for " + t + " " + wt(e.Name);
  try {
    n(e);
  } catch (a) {
    throw (a.name === "MissingArgument" || a.name === "InvalidArgument") && (a.message += " in " + o), a;
  }
}
function Si(e, t, n, o, a) {
  return ie((r) => {
    if (r.key === "Escape") {
      r.stopPropagation(), t.isModal || n(t.Name);
      return;
    }
    if (t.isModal && r.key === "Tab") {
      const i = e.current;
      if (i == null)
        return;
      const s = Array.from(
        i.querySelectorAll(Ha)
      ).filter((u) => u.tabIndex >= 0);
      if (s.length === 0) {
        r.preventDefault();
        return;
      }
      const l = s[0], c = s[s.length - 1], d = o && document.activeElement === i;
      switch (!0) {
        case (r.shiftKey && (document.activeElement === l || d)):
          r.preventDefault(), c.focus();
          break;
        case (!r.shiftKey && document.activeElement === c):
          r.preventDefault(), l.focus();
          break;
      }
    }
  }, a);
}
function Mi(e, t) {
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
let Wr = !1;
function Ti() {
  if (Wr)
    return;
  Wr = !0;
  const e = {
    en: "Close",
    de: "Schließen",
    fr: "Fermer",
    es: "Cerrar",
    it: "Chiudi",
    pt: "Fechar"
  };
  Object.keys(e).forEach((t) => {
    Ro(t, {
      "jcl.overlay.close": e[t],
      "jcl.dialog.close": e[t]
    });
  });
}
function dd(e) {
  return _(() => {
    Ti(), e = G(e);
    const t = S(e.Class) ?? "", n = V(e.APIRef, Qt), o = e.children, a = K(), {
      // s. "shared Base Helpers" for these commons
      ListRef: r,
      rerender: i,
      closeEntity: s,
      closeAllEntities: l,
      EntityIsOpen: c,
      openEntities: d
    } = Ba("overlay");
    function u(m) {
      yt("overlay descriptor", m), m = Va(m), h(m);
      let {
        Name: C,
        isModal: k,
        Renderer: L,
        onOpen: j,
        onClose: y,
        OffsetX: w,
        OffsetY: F,
        Width: M,
        Height: $,
        minWidth: I,
        minHeight: T,
        maxWidth: D,
        maxHeight: z,
        Role: E,
        Label: X
      } = m;
      const Q = Rt(C);
      c(C) && ce(
        "OverlayAlreadyOpen: there is already an overlay called " + wt(C)
      ), r.current.push({
        Name: C,
        [un]: Q,
        isModal: k ?? !1,
        Renderer: L,
        onOpen: j,
        onClose: y,
        OffsetX: w ?? 0,
        OffsetY: F ?? 0,
        Width: M,
        Height: $,
        minWidth: I ?? 0,
        minHeight: T ?? 0,
        maxWidth: D,
        maxHeight: z,
        Role: E,
        Label: X
      }), i();
    }
    function p(m, C) {
      yt("overlay descriptor", m), C instanceof PointerEvent || ce(
        'InvalidArgument: "Event" must be a PointerEvent'
      );
      const k = a.current;
      if (k != null) {
        const L = k.getBoundingClientRect(), j = C.clientX - L.left + k.scrollLeft, y = C.clientY - L.top + k.scrollTop;
        m = { ...m, OffsetX: j, OffsetY: y };
      }
      u(m);
    }
    function h(m) {
      Wa(m, "overlay", () => {
        dn("Name", m.Name), Kt("isModal", m.isModal), Wt("Renderer", m.Renderer), Ae("onOpen", m.onOpen), Ae("onClose", m.onClose), Mo("OffsetX", m.OffsetX), Mo("OffsetY", m.OffsetY), bt("Width", m.Width), bt("Height", m.Height), bt("minWidth", m.minWidth), bt("minHeight", m.minHeight), bt("maxWidth", m.maxWidth), bt("maxHeight", m.maxHeight), ka("Role", m.Role), ln("Label", m.Label);
      });
    }
    const f = {
      openOverlay: u,
      openOverlayAtPointer: p,
      closeOverlay: s,
      closeAllOverlays: l,
      openOverlays: d,
      OverlayIsOpen: c
    }, g = Rn();
    Ea(g, n, f);
    const x = ie((m) => {
      if (m.key !== "Escape")
        return;
      const C = r.current;
      for (let k = C.length - 1; k >= 0; k--)
        if (!C[k].isModal) {
          Le(m), s(C[k].Name);
          break;
        }
    }, []);
    return b`<${Ko.Provider} value=${g}>
        <div class="jcl-component overlay-base ${t}" ref=${a}
          onKeyDown=${x} ...${e.RestProps}
        >
          ${o}
          <${ud} OverlayList=${r.current} BaseRef=${a}/>
        </>
      </>`;
  });
}
function ud(e) {
  return _(() => {
    e = G(e);
    const t = V(e.OverlayList, (r) => $e(r, De)), n = V(e.BaseRef, (r) => Qt(r)) ?? Se("BaseRef");
    if (t == null || t.length === 0)
      return;
    const { closeOverlay: o } = Rn(), a = t.length - 1;
    return b`
        ${t.map((r, i) => i === a ? b`
              <${pd} key=${"underlay:" + r.Name}
                Overlay=${r} closeOverlay=${o}
              />
              <${Hr} key=${"view:" + r.Name}
                Overlay=${r} BaseRef=${n}
              />
            ` : b`
              <${Hr} key=${"view:" + r.Name}
                Overlay=${r} BaseRef=${n}
              />
            `)}
      `;
  });
}
const Ri = [
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
function pd(e) {
  return _(() => {
    e = G(e);
    const t = V(e.Overlay, De) ?? Se("Overlay"), n = A(e.closeOverlay) ?? Se("closeOverlay"), o = K();
    Mi(o, Ri);
    const a = ie((s) => {
      Le(s), t.isModal || n(t.Name);
    }, [t.isModal, t.Name, n]), i = An().DialogName != null;
    return Dn(b`<div
        class="jcl-underlay ${t.isModal ? "modal" : ""} ${i ? "in-dialog" : ""}"
        aria-hidden="true"
        ref=${o}
        onPointerDown=${a}
      />`, document.body);
  });
}
const Ha = [
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
function Hr(e) {
  return _(() => {
    e = G(e);
    const t = V(e.Overlay, De) ?? Se("Overlay"), o = (V(e.BaseRef, Qt) ?? Se("BaseRef")).current;
    if (o == null)
      return null;
    const a = et(), r = K(), i = st(ht), s = io(_o), l = i ?? s, { Theme: c, SwatchSet: d, Locale: u, Direction: p } = l, h = ro(c, d);
    je(() => {
      N(
        `"onOpen" callback of overlay ${t.Name}`,
        t.onOpen,
        t.Name,
        { ...t }
      );
      const Q = setTimeout(a, 0);
      return () => {
        clearTimeout(Q), N(
          `"onClose" callback of overlay ${t.Name}`,
          t.onClose,
          t.Name,
          { ...t }
        );
      };
    }, []), je(() => {
      const Q = r.current;
      if (Q == null)
        return;
      const pe = document.activeElement, q = setTimeout(() => {
        (Q.querySelector(Ha) ?? Q).focus();
      }, 50);
      return () => {
        clearTimeout(q), pe?.focus();
      };
    }, []);
    let {
      OffsetX: f,
      OffsetY: g,
      Width: x,
      Height: m,
      minWidth: C,
      minHeight: k,
      maxWidth: L,
      maxHeight: j
    } = t;
    const { left: y, top: w } = o.getBoundingClientRect();
    let F = y, M = w;
    if (r.current == null)
      F += f ?? 0, M += g ?? 0;
    else {
      let { width: Q, height: pe } = r.current.getBoundingClientRect();
      x = Math.max(C ?? 0, Math.min(Q, window.innerWidth, L ?? 1 / 0)), m = Math.max(k ?? 0, Math.min(pe, window.innerHeight, j ?? 1 / 0)), F = Math.max(0, Math.min(F + (f ?? 0), window.innerWidth - x)), M = Math.max(0, Math.min(M + (g ?? 0), window.innerHeight - m));
    }
    Object.assign(t, {
      // modifies Overlay in-situ (positional hack)
      OffsetX: F - y,
      OffsetY: M - w,
      Width: x,
      Height: m
    });
    const $ = Rn(), I = Si(
      r,
      t,
      (Q) => $.closeOverlay?.(Q),
      !1,
      [t.isModal, t.Name, $]
    ), T = ie(() => N(
      `"Renderer" callback of overlay ${t.Name}`,
      t.Renderer,
      t.Name,
      { ...t }
    ), [t]), z = An().DialogName != null, E = t.Role ?? "dialog", X = t.Label ?? t.Name;
    return Dn(b`
        <${Ko.Provider} value=${{
      ...$,
      OverlayName: t.Name
    }}>
        <${ht.Provider} value=${l}>
          <div
            class="jcl-overlay-view ${z ? "in-dialog" : ""}"
            role=${E} aria-modal=${t.isModal ? "true" : void 0}
            aria-label=${X}
            tabIndex=${-1} dir=${p} lang=${u}
            style="
              visibility:${r.current == null ? "hidden" : "visible"};
              left:${F}px; top:${M}px;
              width: ${x == null ? "auto" : `${x}px`};
              height:${m == null ? "auto" : `${m}px`};
              min-width:${C ?? 0}px; min-height:${k ?? 0}px;
              max-width: ${L == null ? "none" : `${L}px`};
              max-height:${j == null ? "none" : `${j}px`};
              ${h}
            "
            key="overlay:${t.Name}" ref=${r}
            onKeyDown=${I}
          >
            <${T}/>
          </>
        </>
        </>
      `, document.body);
  });
}
const Wn = Na("OverlayContext"), Ko = /* @__PURE__ */ Jt({
  openOverlay: Wn,
  openOverlayAtPointer: Wn,
  closeOverlay: Wn,
  closeAllOverlays: Wn,
  openOverlays: [],
  OverlayIsOpen: Wn
});
function Rn() {
  return st(Ko);
}
function hd(e) {
  return _(() => {
    Ti(), e = G(e);
    const t = S(e.Class) ?? "", n = V(e.APIRef, Qt), o = e.children, a = K(), {
      // s. "shared Base Helpers" for these commons
      ListRef: r,
      rerender: i,
      closeEntity: s,
      closeAllEntities: l,
      EntityIsOpen: c,
      openEntities: d
    } = Ba("dialog");
    function u(m) {
      yt("dialog descriptor", m), m = Va(m), f(m);
      const {
        Name: C,
        Title: k,
        isModal: L,
        hasCloseButton: j,
        isResizable: y,
        isDraggable: w,
        dontShrink: F,
        Renderer: M,
        onOpen: $,
        onClose: I,
        OffsetX: T,
        OffsetY: D,
        Width: z,
        Height: E,
        minWidth: X,
        minHeight: Q,
        maxWidth: pe,
        maxHeight: q
      } = m, J = Rt(C);
      c(C) && ce(
        "DialogAlreadyOpen: there is already a dialog called " + wt(C)
      ), r.current.push({
        Name: C,
        [un]: J,
        Title: k,
        isModal: L ?? !1,
        hasCloseButton: j,
        isResizable: y,
        isDraggable: w,
        dontShrink: F,
        Renderer: M,
        onOpen: $,
        onClose: I,
        OffsetX: T,
        OffsetY: D,
        Width: z,
        Height: E,
        minWidth: X ?? 0,
        minHeight: Q ?? 0,
        maxWidth: pe,
        maxHeight: q
      }), i();
    }
    function p(m) {
      dn("dialog name", m);
      const C = Rt(m), k = r.current;
      return k[k.length - 1]?.[un] === C;
    }
    function h(m) {
      dn("dialog name", m);
      const C = Rt(m), k = r.current, L = k.findIndex(
        (y) => y[un] === C
      );
      if (L < 0 || L === k.length - 1)
        return;
      const j = k[L];
      r.current = [
        ...k.filter((y, w) => w !== L),
        j
      ], i();
    }
    function f(m) {
      Wa(m, "dialog", () => {
        dn("Name", m.Name), Kt("isModal", m.isModal), Kt("hasCloseButton", m.hasCloseButton), Kt("isResizable", m.isResizable), Kt("isDraggable", m.isDraggable), Kt("dontShrink", m.dontShrink), Wt("Renderer", m.Renderer), Ae("onOpen", m.onOpen), Ae("onClose", m.onClose), Mo("OffsetX", m.OffsetX), Mo("OffsetY", m.OffsetY), bt("Width", m.Width), bt("Height", m.Height), bt("minWidth", m.minWidth), bt("minHeight", m.minHeight), bt("maxWidth", m.maxWidth), bt("maxHeight", m.maxHeight);
      });
    }
    const g = {
      openDialog: u,
      closeDialog: s,
      closeAllDialogs: l,
      openDialogs: d,
      DialogIsOpen: c,
      DialogIsFrontmost: p,
      bringDialogToFront: h
    }, x = An();
    return Ea(x, n, g), b`<${Uo.Provider} value=${x}>
        <div class="jcl-component dialog-base ${t ?? ""}"
          ref=${a} ...${e.RestProps}
        >
          ${o}
          <${fd}
            DialogList=${r.current}
            BaseRef=${a} rerender=${i}
          />
        </div>
      </>`;
  });
}
function fd(e) {
  return _(() => {
    e = G(e);
    const t = V(e.DialogList, (r) => $e(r, De)), n = V(e.BaseRef, (r) => Qt(r)) ?? Se("BaseRef"), o = A(e.rerender) ?? Se("rerender");
    if (t == null || t.length === 0)
      return;
    const a = t.length - 1;
    return b`
        ${t.map((r, i) => b`
          ${i === a && r.isModal && b`
            <${md} key=${"modal:" + r.Name}/>
          `}
          <${bd} key=${"view:" + r.Name}
            Dialog=${r} BaseRef=${n} rerender=${o}
          />
        `)}
      `;
  });
}
const gd = [
  ...Ri,
  "mousedown",
  "touchstart",
  "pointerdown"
];
function md(e) {
  return _(() => {
    const t = K();
    return Mi(t, gd), Dn(
      b`<div class="jcl-modal-layer" ref=${t} aria-hidden="true"/>`,
      document.body
    );
  });
}
function bd(e) {
  return _(() => {
    e = G(e);
    const t = V(e.Dialog, De) ?? Se("Dialog"), n = V(e.BaseRef, (ye) => Qt(ye)) ?? Se("BaseRef"), o = A(e.rerender), a = n.current;
    if (a == null)
      return null;
    const r = st(ht), i = io(_o), s = r ?? i, { Theme: l, SwatchSet: c, Locale: d, Direction: u } = s, p = ro(l, c), { localized: h } = Ma(s), f = et(), g = h("jcl.dialog.close"), x = Dt() + "-dlg-title";
    let {
      Name: m,
      Title: C,
      hasCloseButton: k,
      isResizable: L,
      isDraggable: j,
      OffsetX: y,
      OffsetY: w,
      Width: F,
      Height: M,
      minWidth: $,
      minHeight: I,
      maxWidth: T,
      maxHeight: D,
      dontShrink: z
    } = t;
    const E = C != null || k === !0 || j === !0, X = L ? "resizable" : "", Q = j ? "draggable" : "";
    $ == null && ($ = 0), I == null && (I = 0);
    const pe = 0, q = (E ? 30 : 0) + (L ? 10 : 0);
    (E || L) && (I += q, M != null && (M += q)), k && ($ = Math.max(40, $)), L && ($ = Math.max(60, $));
    const J = K(), { left: P, top: ue } = a.getBoundingClientRect();
    let Ce = P, Ve = ue;
    if (J.current == null)
      Ce += y ?? 0, Ve += w ?? 0;
    else {
      const { width: ye, height: fe } = J.current.getBoundingClientRect(), { width: Ye, height: U } = a.getBoundingClientRect();
      F = Math.min(F ?? ye, window.innerWidth), M = Math.min(M ?? fe, window.innerHeight), y == null && (t.OffsetX = y = (Ye - F) / 2), w == null && (t.OffsetY = w = (U - M) / 2), Ce = Math.max(0, Math.min(Ce + y, window.innerWidth - F)), Ve = Math.max(0, Math.min(Ve + w, window.innerHeight - M)), t.OffsetX = Ce - P, t.OffsetY = Ve - ue, z === !0 && ($ = t.minWidth = Math.max($, F) - pe, I = t.minHeight = Math.max(I, M) - q, delete t.dontShrink), t.Width = F, t.Height = M - q;
    }
    const _e = An(), { closeDialog: nt, DialogIsFrontmost: ot, bringDialogToFront: te } = _e, ee = Si(
      J,
      t,
      nt,
      !0,
      [t, nt]
    );
    $a(() => {
      f();
    }, []);
    const ne = K(null);
    je(() => {
      ne.current = document.activeElement, N(
        `"onOpen" callback of dialog ${t.Name}`,
        t.onOpen,
        t.Name,
        { ...t }
      );
      const ye = setTimeout(() => {
        const fe = J.current;
        if (fe == null)
          return;
        (fe.querySelector(Ha) ?? fe).focus();
      }, 50);
      return () => {
        clearTimeout(ye), N(
          `"onClose" callback of dialog ${t.Name}`,
          t.onClose,
          t.Name,
          { ...t }
        ), ne.current?.focus();
      };
    }, []);
    const se = K({ Mode: void 0, x: 0, y: 0, Width: 0, Height: 0 }), xe = ie((ye, fe) => {
      t.OffsetX = se.current.x + ye, t.OffsetY = se.current.y + fe, ot(t.Name) || (te(t.Name), o?.()), f();
    }, [t, ot, te, f, o]), we = hn({
      ViewRef: J,
      ...j ? {
        onlyFrom: ".titlebar",
        neverFrom: ".close-button",
        onDragStart: () => {
          se.current = { x: t.OffsetX, y: t.OffsetY };
        },
        onDragContinuation: (ye, fe) => xe(ye, fe),
        onDragFinish: (ye, fe) => xe(ye, fe),
        onDragCancellation: (ye, fe) => xe(ye, fe)
      } : {}
    }), Ie = ie((ye) => {
      if (ye == null)
        return;
      const fe = ye.target.classList;
      let Ye;
      switch (!0) {
        case fe.contains("left-resizer"):
          Ye = "resize-sw";
          break;
        case fe.contains("middle-resizer"):
          Ye = "resize-s";
          break;
        case fe.contains("right-resizer"):
          Ye = "resize-se";
          break;
      }
      se.current = {
        Mode: Ye,
        x: t.OffsetX,
        Width: t.Width,
        y: t.OffsetY,
        Height: t.Height
      };
    }, [t]), Me = ie((ye, fe) => {
      const { minWidth: Ye, maxWidth: U, minHeight: re, maxHeight: ge } = t;
      let We = se.current.Width;
      switch (se.current.Mode) {
        case "resize-sw":
          We = Math.max(Ye ?? 0, Math.min(We - ye, U ?? 1 / 0)), ye = We - se.current.Width, t.OffsetX = se.current.x - ye, t.Width = se.current.Width + ye;
          break;
        case "resize-se":
          t.Width = Math.max(Ye ?? 0, Math.min(se.current.Width + ye, U ?? 1 / 0));
          break;
      }
      t.Height = Math.max(re ?? 0, Math.min(se.current.Height + fe, ge ?? 1 / 0)), ot(t.Name) || (te(t.Name), o?.()), f();
    }, [t, ot, te, f, o]), Fe = hn({
      ViewRef: J,
      ...L ? {
        onlyFrom: ".left-resizer,.middle-resizer,.right-resizer",
        onDragStart: (ye, fe, Ye, U, re) => Ie(re),
        onDragContinuation: (ye, fe) => Me(ye, fe),
        onDragFinish: (ye, fe) => Me(ye, fe),
        onDragCancellation: (ye, fe) => Me(ye, fe)
      } : {}
    }), lt = ie(
      () => Ke(
        `"Renderer" callback of dialog ${t.Name}`,
        t.Renderer,
        t.Name,
        { ...t }
      ),
      [t]
    );
    return Dn(b`
        <${Uo.Provider} value=${{ ..._e, DialogName: t.Name }}>
        <${ht.Provider} value=${s}>
          <div class="jcl-dialog-view ${X} ${Q}"
            role="dialog"
            aria-modal=${t.isModal ? "true" : void 0}
            aria-labelledby=${E ? x : void 0}
            aria-label=${E ? void 0 : C ?? m}

            tabIndex=${-1} key=${"dialog:" + m} ref=${J}
            dir=${u} lang=${d}
            style="
              visibility:${J.current == null ? "hidden" : "visible"};
              left:${Ce}px; top:${Ve}px;
              width:${F == null ? "auto" : `${F}px`};
              height:${M == null ? "auto" : `${M}px`};
              min-width:${$}px; min-height:${I}px;
              max-width:${T == null ? "none" : `${T}px`};
              max-height:${D == null ? "none" : `${D}px`};
              ${p}
            "
            onPointerDown=${() => te(m)}
            onKeyDown=${ee}
          >
            ${E && b`
              <div class="titlebar" onPointerDown=${we}>
                <span id=${x} class="title">${C ?? ""}</span>
                ${k && b`
                  <button type="button" class="close-button"
                    aria-label=${g}
                    onClick=${() => nt(t.Name)}
                  />
                `}
              </div>
            `}
            <div class="content-pane">
              <${lt}/>
            </div>
            ${L && b`
              <div class="resizer" aria-hidden="true">
                <div class="left-resizer"   onPointerDown=${Fe}/>
                <div class="middle-resizer" onPointerDown=${Fe}/>
                <div class="right-resizer"  onPointerDown=${Fe}/>
              </div>
            `}
          </div>
        </>
        </>
      `, document.body);
  });
}
const xn = Na("DialogContext"), Uo = /* @__PURE__ */ Jt({
  openDialog: xn,
  closeDialog: xn,
  closeAllDialogs: xn,
  openDialogs: [],
  DialogIsOpen: xn,
  DialogIsFrontmost: xn,
  bringDialogToFront: xn
});
function An() {
  return st(Uo);
}
let yd = 0;
function xd(e) {
  return _(() => {
    wd(), e = G(e);
    const t = S(e.Class) ?? "", n = V(e.APIRef, Qt), o = V(e.Placement, (g) => be(g, ["top-left", "top-right", "bottom-left", "bottom-right"])) ?? "bottom-right", a = e.children, {
      // s. "shared Base Helpers" for these commons
      ListRef: r,
      rerender: i,
      closeEntity: s,
      closeAllEntities: l,
      EntityIsOpen: c,
      openEntities: d
    } = Ba("toast");
    function u(g) {
      yt("toast descriptor", g), g = Va(g), p(g);
      let { Name: x, Renderer: m, Duration: C, onOpen: k, onClose: L } = g;
      x == null && (x = "Toast-" + ++yd);
      const j = Rt(x);
      return c(x) && ce(
        "ToastAlreadyOpen: there is already a toast called " + wt(x)
      ), r.current.push({
        Name: x,
        [un]: j,
        Renderer: m,
        Duration: C ?? 5e3,
        onOpen: k,
        onClose: L
      }), i(), x;
    }
    function p(g) {
      Wa(g, "toast", () => {
        Bl("Name", g.Name), Wt("Renderer", g.Renderer), Il("Duration", g.Duration), Ae("onOpen", g.onOpen), Ae("onClose", g.onClose);
      });
    }
    const h = {
      showToast: u,
      closeToast: s,
      closeAllToasts: l,
      openToasts: d,
      ToastIsOpen: c
    }, f = Ga();
    return Ea(f, n, h), b`<${_a.Provider} value=${f}>
        <div class="jcl-component toast-base ${t}" ...${e.RestProps}>
          ${a}
          <div class="jcl-toast-viewport placement-${o}" aria-live="polite">
            <${vd} ToastList=${r.current}/>
          </>
        </>
      </>`;
  });
}
const wd = /* @__PURE__ */ Z("jcl-component.toast-base", `
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
function vd(e) {
  return _(() => {
    e = G(e);
    const t = V(e.ToastList, (n) => $e(n, De));
    if (!(t == null || t.length === 0))
      return b`${t.map(
        (n) => b`
          <${Cd} key=${"view:" + n.Name} Toast=${n}/>
        `
      )}`;
  });
}
const Ai = /* @__PURE__ */ Jt(void 0);
function Cd(e) {
  return _(() => {
    kd(), e = G(e);
    const t = V(e.Toast, De) ?? Se("Toast"), { closeToast: n } = Ga(), [o, a] = He(!1), r = K(void 0), i = K(0);
    function s() {
      r.current != null && (clearTimeout(r.current), r.current = void 0);
    }
    function l() {
      s(), t.Duration > 0 && (r.current = setTimeout(() => n(t.Name), t.Duration));
    }
    function c() {
      s(), a(!0);
    }
    function d() {
      i.current++, l(), a(!1);
    }
    return je(() => (l(), N('toast callback "onOpen"', t.onOpen), () => {
      s(), N('toast callback "onClose"', t.onClose);
    }), []), b`<div class="jcl-toast-view" role="status"
        onMouseEnter=${c} onMouseLeave=${d}
      >
        <${Ai.Provider} value=${{ Name: t.Name, closeToast: n }}>
          ${t.Renderer({})}
        </>
        ${t.Duration > 0 && b`<div class="remaining-time"
          key=${i.current} aria-hidden="true"
          style="animation-duration:${t.Duration}ms; animation-play-state:${o ? "paused" : "running"}"
        />`}
      </>`;
  });
}
const kd = /* @__PURE__ */ Z("jcl-toast-view", `
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
  `), vo = Na("ToastContext"), _a = /* @__PURE__ */ Jt({
  showToast: vo,
  closeToast: vo,
  closeAllToasts: vo,
  openToasts: [],
  ToastIsOpen: vo
});
function Ga() {
  return st(_a);
}
function jd(e) {
  return $d(), Fi("fullsized", e);
}
const $d = /* @__PURE__ */ Z("jcl-component.fullsized", `
    .jcl-component.fullsized {
      flex:1 0 auto;
      left:0px; top:0px; right:auto; bottom:auto; width:100%; height:100%;
    }
    .jcl-component.fullsized > * {
      position:absolute;
      left:0px; top:0px; right:auto; bottom:auto; width:100%; height:100%;
    }
  `);
function Ka(e) {
  return Id(), Fi("centered", e);
}
const Id = /* @__PURE__ */ Z("jcl-component.centered", `
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
function Dd(e) {
  return Ld(), zi("horizontal", e);
}
const Ld = /* @__PURE__ */ Z("jcl-component.horizontal", `
    .jcl-component.horizontal {
      display:flex !important; flex-flow:row nowrap !important;
        align-items:center;
    }
    .jcl-component.horizontal > * {
      position:relative; flex:0 0 auto;
    }
  `);
function Sd(e) {
  return Md(), zi("vertical", e);
}
const Md = /* @__PURE__ */ Z("jcl-component.vertical", `
    .jcl-component.vertical {
      display:flex !important; flex-flow:column nowrap !important;
        align-items:start;
    }
    .jcl-component.vertical > * {
      position:relative; flex:0 0 auto;
    }
  `);
function Td(e) {
  return _(() => {
    Rd(), e = G(e);
    const t = S(e.Class) ?? "", n = ae(e.Style) ?? "", o = qt(e.Columns) ?? 2, a = ke(e.RowGap) ?? 0, r = ke(e.ColGap) ?? 0, i = S(e.ColumnClasses) ?? "", s = Yt(e.children);
    function l(g) {
      if (typeof g == "string")
        return 1;
      {
        const x = g.props.colspan;
        return kn(x) ? x : 1;
      }
    }
    const c = s.filter(
      (g) => typeof g != "string" ? g != null && g.type != null : g.trim() !== ""
    ), d = c.length, u = [[]];
    let p = 0, h = 0;
    c.forEach((g, x) => {
      u[p].push(g), h += l(g), h >= o && x < d - 1 && (u.push([]), p++, h = 0);
    });
    const f = i.trim() === "" ? "" : b`<colgroup>${i.split(" ").map(
      (g) => b`<col class="${g}"/>`
    )}</>`;
    return b`<table class="jcl-component tabular ${t}" style="
        ${n};
        border-spacing:${r}px ${a}px;
        margin:-${a}px -${r}px -${a}px -${r}px
      " ...${e.RestProps}
      >${f}<tbody>
        ${d > 0 && u.map((g) => b`<tr>
          ${g.map(
      (x) => b`<td colspan=${l(x)}>${x}</>`
    )}
        </tr>`)}
      </tbody></table>`;
  });
}
const Rd = /* @__PURE__ */ Z("jcl-component.tabular", `
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
function Ad(e) {
  return _(() => {
    Fd(), e = G(e);
    const t = S(e.Class) ?? "";
    let n = ke(e.activeIndex) ?? 0, o = Yt(e.children).filter(
      (r) => typeof r != "string" || r.trim() !== ""
    );
    const a = o.length;
    return n = a === 0 ? 0 : Math.max(0, Math.min(n, a - 1)), b`<div class="jcl-component selective ${t}"
        ...${e.RestProps}>${o[n]}</>`;
  });
}
const Fd = /* @__PURE__ */ Z("jcl-component.selective", `
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
function zd(e) {
  return _(() => {
    Od(), e = G(e);
    const t = S(e.Class) ?? "", n = e.children;
    return b`<div class="jcl-component stacked ${t}" ...${e.RestProps}>
        ${n}
      </>`;
  });
}
const Od = /* @__PURE__ */ Z("jcl-component.stacked", `
    .jcl-component.stacked > *:first-child {
      position:relative;
      left:0px; top:0px; right:auto; bottom:auto; width:auto; height:auto;
    }
    .jcl-component.stacked > *:not(:first-child) {
      position:absolute; top:0px;
    }
  `);
function Fi(e, t) {
  return _(() => {
    t = G(t);
    const n = S(t.Class) ?? "", o = t.children;
    return b`<div class="jcl-component ${e} ${n}" ...${t.RestProps}>
        ${o}
      </>`;
  });
}
function zi(e, t) {
  return _(() => {
    t = G(t);
    const n = S(t.Class) ?? "", o = ae(t.Style) ?? "", a = ke(t.Gap) ?? 0, r = t.children;
    return b`<div class="jcl-component ${e} ${n}"
        style="gap:${a}px; ${o}" ...${t.RestProps}
      >${r}</>`;
  });
}
function Vd(e) {
  return _(() => {
    Ed(), e = G(e);
    const t = S(e.Class) ?? "", n = ae(e.Value) ?? "", o = Y(e.visiblePattern) ?? !1;
    return b`<div
        class="jcl-component dummy ${o ? "visible-pattern" : ""} ${t}"
        aria-hidden="true"
        ...${e.RestProps} dangerouslySetInnerHTML=${{ __html: n }}
      />`;
  });
}
const Ed = /* @__PURE__ */ Z("jcl-component.dummy", `
    .jcl-component.dummy.visible-pattern {
      background-image:repeating-linear-gradient(-45deg,
        rgba(222,222,222, 1) 0px, rgba(222,222,222, 1) 4px,
        rgba(0,0,0, 0) 4px, rgba(0,0,0, 0) 8px
      ); background-size:11.31px 11.31px;
    }
  `);
function Nd(e) {
  return _(() => {
    Oi(), e = G(e);
    const t = S(e.Class) ?? "", n = ae(e.Style) ?? "", o = ke(e.Width), a = ke(e.Height), r = (o == null ? "" : `width:${o}px;`) + (a == null ? "" : `height:${a}px;`) + n;
    return b`<div class="jcl-component spacer ${t}"
        style=${r} aria-hidden="true" ...${e.RestProps}/>`;
  });
}
function Bd(e) {
  return _(() => {
    Oi(), e = G(e);
    const t = S(e.Class) ?? "", n = ae(e.Style) ?? "", o = ke(e.Width), a = ke(e.Height), r = (o == null ? "" : `width:${o}px;`) + (a == null ? "" : `height:${a}px;`) + n;
    return b`<div class="jcl-component expanding-spacer ${t}"
        style=${r} aria-hidden="true" ...${e.RestProps}/>`;
  });
}
const Oi = /* @__PURE__ */ Z("jcl-component.expanding-spacer", `
    .jcl-component.expanding-spacer {
      flex:1 0 auto !important;
    }
  `);
function Wd(e) {
  return _(() => {
    Vi(), Ei(), e = G(e);
    const t = S(e.Class) ?? "";
    return b`<div class="jcl-component horizontal-separator ${t}"
        role="separator" aria-orientation="horizontal" ...${e.RestProps}/>`;
  });
}
const Vi = /* @__PURE__ */ Z("jcl-component.horizontal-separator", `
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
function Hd(e) {
  return _(() => {
    Vi(), Ei(), e = G(e);
    const t = S(e.Class) ?? "";
    return b`<div class="jcl-component vertical-separator ${t}"
        role="separator" aria-orientation="vertical" ...${e.RestProps}/>`;
  });
}
const Ei = /* @__PURE__ */ Z("jcl-component.vertical-separator", `
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
function qo(e) {
  return _(() => {
    Gd(), Ud(), Xd(), Jd(), e = G(e);
    const t = S(e.Class) ?? "", n = S(e.Value), o = qt(e.ARIALevel);
    return b`<div class=${t} aria-level=${o} ...${e.RestProps}>
        ${n ?? e.children}
      </>`;
  });
}
function _d(e) {
  return e = {
    role: "heading",
    "aria-level": 1,
    ...e,
    class: `jcl-component title ${e.class ?? ""}`
  }, qo(e);
}
const Gd = /* @__PURE__ */ Z("jcl-component.title", `
    .jcl-component.title {
      font-size:22px; font-weight:bold; line-height:32px;
      overflow:hidden; text-overflow:ellipsis;
    }
  `);
function Kd(e) {
  return e = {
    role: "heading",
    "aria-level": 2,
    ...e,
    class: `jcl-component subtitle ${e.class ?? ""}`
  }, qo(e);
}
const Ud = /* @__PURE__ */ Z("jcl-component.subtitle", `
    .jcl-component.subtitle {
      font-size:18px; font-weight:bold; line-height:27px;
      overflow:hidden; text-overflow:ellipsis;
    }
  `);
function qd(e) {
  return e = { ...e, class: `jcl-component label ${e.class ?? ""}` }, qo(e);
}
const Xd = /* @__PURE__ */ Z("jcl-component.label", `
    .jcl-component.label {
      height:30px;
      font-size:14px; font-weight:bold; line-height:30px;
      overflow:hidden; text-overflow:ellipsis;
    }
  `);
function Yd(e) {
  return e = { ...e, class: `jcl-component textlineview ${e.class ?? ""}` }, qo(e);
}
const Jd = /* @__PURE__ */ Z("jcl-component.textlineview", `
    .jcl-component.textlineview {
      height:30px;
      font-size:14px; line-height:30px;
      overflow:hidden; text-overflow:ellipsis;
    }
  `);
function Ni(e) {
  return _(() => {
    Zd(), Pd(), e = G(e);
    const t = S(e.Class) ?? "", n = ae(e.Value);
    return b`<div class=${t} ...${e.RestProps}>
        ${n ?? e.children}
      </>`;
  });
}
function Ua(e) {
  return e = { ...e, class: `jcl-component description ${e.class ?? ""}` }, Ni(e);
}
const Zd = /* @__PURE__ */ Z("jcl-component.description", `
    .jcl-component.description {
      font-size:14px; font-weight:normal; line-height:21px;
      overflow:hidden; text-overflow:ellipsis;
    }
  `);
function Qd(e) {
  return e = { ...e, class: `jcl-component fineprint ${e.class ?? ""}` }, Ni(e);
}
const Pd = /* @__PURE__ */ Z("jcl-component.fineprint", `
    .jcl-component.fineprint {
      font-size:12px; font-weight:normal; line-height:18px;
      overflow:hidden; text-overflow:ellipsis;
    }
  `);
function eu(e) {
  return _(() => {
    tu(), e = G(e);
    const t = S(e.Class) ?? "", n = ae(e.Value), o = Y(e.preformatted) ?? !1;
    return b`<div class="jcl-component textview ${t} ${o ? "preformatted" : ""}"
        ...${e.RestProps}
      >${n ?? ""}</>`;
  });
}
const tu = /* @__PURE__ */ Z("jcl-component.textview", `
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
function nu(e) {
  return _(() => {
    ou(), e = G(e);
    const t = S(e.Class) ?? "", n = ae(e.Value) ?? "";
    return b`<div class="jcl-component htmlview ${t}" ...${e.RestProps}
        dangerouslySetInnerHTML=${{ __html: n }}
      />`;
  });
}
const ou = /* @__PURE__ */ Z("jcl-component.htmlview", `
    .jcl-component.htmlview {
      overflow:auto; overscroll-behavior:contain;
      font-size:14px; font-weight:normal; line-height:21px;
    }
  `);
let Ao, Fo, da, Cn;
const au = so(async () => {
  const [
    e,
    t,
    n,
    o
  ] = await Promise.all([
    rt("marked"),
    rt("marked-katex-extension"),
    rt("marked-highlight"),
    rt("highlight.js/lib/core")
  ]);
  Ao = e.Marked, Fo = t.default ?? t, da = n.markedHighlight, Cn = o.default ?? o;
  const a = [
    // 'python' is not registered
    "css",
    "javascript",
    "java",
    "json",
    "typescript",
    "xml"
  ], r = await Promise.all(a.map(
    (i) => rt("highlight.js/lib/languages/" + i)
  ));
  a.forEach((i, s) => {
    Cn.registerLanguage(i, r[s].default);
  }), cn = new Ao(), cn.setOptions({
    gfm: !0,
    breaks: !0,
    pedantic: !1
  }), cn.use(Fo({
    throwOnError: !1
  })), cn.use(da({
    emptyLangClass: "hljs",
    langPrefix: "hljs language-",
    highlight(i, s) {
      const l = Cn.getLanguage(s) ? s : "plaintext";
      return Cn.highlight(i, { language: l }).value;
    }
  }));
});
function lo() {
  return au();
}
let cn;
async function ru() {
  return await lo(), cn;
}
function Bi(e) {
  return _(() => {
    iu();
    const t = Mn(lo);
    e = G(e);
    const n = S(e.Class) ?? "", o = V(e.Value, no) ?? "", a = Zt(() => t ? cn.parse(o) : "", [t, o]);
    return b`<div class="jcl-component markdownview ${n}"
        ...${e.RestProps}
        dangerouslySetInnerHTML=${{ __html: a }}
      />`;
  });
}
const iu = /* @__PURE__ */ Z("jcl-component.markdownview", `
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
  `), Wi = ["none", "stretch", "cover", "contain"], Hi = [
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
function su(e) {
  return _(() => {
    lu(), e = G(e);
    const t = S(e.Class) ?? "", n = ae(e.Style) ?? "", o = mn(e.Value), a = pn(e.alt) ?? "(image)", r = pn(e.Placeholder) ?? "(empty)", i = V(e.Scaling, (d) => be(d, Wi)), s = V(e.Alignment, (d) => be(d, Hi)), l = (i === "stretch" ? "fill" : i) ?? "contain", c = s ?? "center center";
    return o == null ? b`<${Ka} class="jcl-component imageview ${t}" style=${n}
          role="img" aria-label=${r}
          ...${e.RestProps}
        >
          <${Ua} value=${r}/>
        </>` : b`<img class="jcl-component imageview ${t ?? ""}"
          src=${o} alt=${a}
          style="object-fit:${l}; object-position:${c}; ${n}"
          ...${e.RestProps}
        />`;
  });
}
const lu = /* @__PURE__ */ Z("jcl-component.imageview", `
    div.jcl-component.imageview {
      display:flex; align-items:center; justify-content:center;
    }
    img.jcl-component.imageview {
      object-fit:contain; object-position:center;
    }
  `);
function cu(e) {
  return _(() => {
    du(), e = G(e);
    const t = S(e.Class) ?? "", n = ae(e.Style) ?? "", o = ae(e.Value), a = pn(e.alt) ?? "SVG image", r = pn(e.Placeholder) ?? "(empty)", i = V(e.Scaling, (u) => be(u, Wi)), s = V(e.Alignment, (u) => be(u, Hi)), l = Zt(
      () => "data:image/svg+xml," + encodeURIComponent(o ?? ""),
      [o]
    ), c = (i === "stretch" ? "fill" : i) ?? "contain", d = s ?? "center center";
    return o == null ? b`<${Ka} class="jcl-component svgview ${t}" style=${n}
          role="img" aria-label=${r}
          ...${e.RestProps}
        >
          <${Ua} value=${r}/>
        </>` : b`<img class="jcl-component svgview ${t ?? ""}"
          src=${l} alt=${a}
          style="object-fit:${c}; object-position:${d}; ${n ?? ""}"
          ...${e.RestProps}
        />`;
  });
}
const du = /* @__PURE__ */ Z("jcl-component.svgview", `
    .jcl-component.svgview {
      object-fit:contain; object-position:center;
    }
  `), uu = "allow-downloads allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-scripts", pu = [
  "no-referrer",
  "no-referrer-when-downgrade",
  "origin",
  "origin-when-cross-origin",
  "same-origin",
  "strict-origin",
  "strict-origin-when-cross-origin",
  "unsafe-url"
];
function hu(e) {
  return _(() => {
    fu(), e = G(e);
    const t = S(e.Class) ?? "", n = mn(e.Value), o = S(e.Title), a = S(e.allow), r = Y(e.allowFullscreen), i = V(e.ReferrerPolicy, (c) => be(c, pu)), s = S(e.Sandbox);
    return b`<iframe class="jcl-component webview ${t}" src=${n}
        title=${o} allow=${a} allowfullscreen=${r}
        sandbox=${s === "none" ? void 0 : s ?? uu} referrerpolicy=${i}
        ...${e.RestProps}
      />`;
  });
}
const fu = /* @__PURE__ */ Z("jcl-component.webview", `
    .jcl-component.webview {
      overflow:auto;
    }
  `);
function _i(e, t, n) {
  const o = n != null, a = ie((s) => {
    if (t)
      return nn(s);
    N(e + ' callback "onClick"', n, s);
  }, [t, n]), r = ie((s) => {
    (s.key === "Enter" || s.key === " ") && (s.preventDefault(), t || N(e + ' callback "onClick"', n, s));
  }, [t, n]);
  return { isInteractive: o, _onClick: a, _onKeyDown: r, Cursor: t ? "not-allowed" : o ? "pointer" : "auto" };
}
function gu(e) {
  return _(() => {
    mu(), e = G(e);
    const t = S(e.Class) ?? "", n = ae(e.Style);
    let o = mn(e.Value) ?? `${So}/circle-information.png`, a = mt(e.Color) ?? "black";
    const r = pn(e.Label), i = Y(e.active) ?? !1, s = Y(e.disabled) ?? !1, l = A(e.onClick), { isInteractive: c, _onClick: d, _onKeyDown: u, Cursor: p } = _i("Icon", s, l);
    return b`<div
        class="jcl-component icon ${s ? "disabled" : ""} ${i ? "active" : ""} ${t}"
        style=${n} tabIndex=${c ? s ? -1 : 0 : void 0}
        role=${c ? "button" : void 0}
        aria-label=${r}
        aria-disabled=${c && s ? "true" : void 0}
        onClick=${d}
        onKeyDown=${c ? u : void 0}
        ...${e.RestProps}
      >
        <div style="
          -webkit-mask-image:url(${o}); mask-image:url(${o});
          background-color:${a};
          cursor:${p};
        "/>
      </>`;
  });
}
const mu = /* @__PURE__ */ Z("jcl-component.icon", `
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
  `), qa = [
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
function bu(e) {
  return _(() => {
    yu(), e = G(e);
    const t = S(e.Class) ?? "", n = ae(e.Style);
    let o = V(e.Value, (h) => be(h, qa)) ?? "fa-question-circle-o", a = mt(e.Color) ?? "black";
    const r = pn(e.Label), i = Y(e.active) ?? !1, s = Y(e.disabled) ?? !1, l = A(e.onClick), { isInteractive: c, _onClick: d, _onKeyDown: u, Cursor: p } = _i("FAIcon", s, l);
    return b`<div
        class="jcl-component fa-icon fa ${o} ${s ? "disabled" : ""} ${i ? "active" : ""} ${t}"
        role=${c ? "button" : void 0}
        tabIndex=${c ? s ? -1 : 0 : void 0}
        aria-label=${r}
        aria-disabled=${c && s ? "true" : void 0}
        style="${n}; color:${a}; cursor:${p};"
        onClick=${d}
        onKeyDown=${c ? u : void 0}
        ...${e.RestProps}
      />`;
  });
}
const yu = /* @__PURE__ */ Z("jcl-component.fa-icon", `
    .jcl-component.fa-icon {
      width:24px !important; height:24px !important;
      font-size:18px; line-height:24px; text-align:center;
      pointer-events:auto;
    }
  `);
function xu(e) {
  return _(() => {
    wu(), e = G(e);
    const t = S(e.Class) ?? "", n = ae(e.Value), o = e.children;
    return n == null ? b`<button class="jcl-component native-button ${t}" ...${e.RestProps}>
          ${o}
        </>` : b`<button class="jcl-component native-button ${t}" ...${e.RestProps}
          dangerouslySetInnerHTML=${{ __html: n }}
        />`;
  });
}
const wu = /* @__PURE__ */ Z("jcl-component.native-button", `
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
function vu(e) {
  return _(() => {
    Cu(), e = G(e);
    const t = S(e.Class) ?? "", n = ae(e.Style);
    let o = V(e.Value, (p) => gn(p) || Ue(p));
    const a = Y(e.disabled), r = A(e.onValueInput), i = A(e.onClick);
    o = o ?? ct;
    const { actualValue: s, actualDisabling: l } = Ze(o, a), c = s == !0, d = s == null || Ue(o), u = ie((p) => {
      if (Le(p, l), l == !0)
        return;
      N('nativeCheckbox callback "onClick"', i, p);
      const h = p.target.checked;
      N(
        'nativeCheckbox callback "onValueInput"',
        r,
        h,
        p
      );
    }, [l, i, r]);
    return b`<div class="jcl-component native-checkbox ${l ? "disabled" : ""} ${t}"
        style=${n}
      >
        <input type="checkbox"
          checked=${c} indeterminate=${d}
          disabled=${l} onClick=${u} ...${e.RestProps}
        />
      </>`;
  });
}
const Cu = /* @__PURE__ */ Z("jcl-component.native-checkbox", `
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
function ku(e) {
  return _(() => {
    ju(), e = G(e);
    const t = S(e.Class) ?? "", n = ae(e.Style);
    let o = V(e.Value, (u) => gn(u) || Ue(u));
    const a = Y(e.disabled), r = A(e.onValueInput), i = A(e.onClick);
    o = o ?? ct;
    const { actualValue: s, actualDisabling: l } = Ze(o, a), c = s == !0, d = ie((u) => {
      if (Le(u, l), l == !0)
        return;
      N('nativeRadiobutton callback "onClick"', i, u);
      const p = u.target.checked;
      N(
        'nativeRadiobutton callback "onValueInput"',
        r,
        p,
        u
      );
    }, [l, i, r]);
    return b`<div class="jcl-component native-radiobutton ${l ? "disabled" : ""} ${t}"
        style=${n}
      >
        <input type="radio" checked=${c} disabled=${l} onClick=${d} ...${e.RestProps}/>
      </>`;
  });
}
const ju = /* @__PURE__ */ Z("jcl-component.native-radiobutton", `
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
function $u(e) {
  return _(() => {
    Iu(), e = G(e);
    const t = S(e.Class) ?? "", n = ae(e.Style), o = Ge(e.Value), a = Ge(e.Min ?? e.Minimum), r = Ge(e.Low ?? e.lowerBound), i = Ge(e.Opt ?? e.Optimum), s = Ge(e.High ?? e.upperBound), l = Ge(e.Max ?? e.Maximum);
    return b`<div class="jcl-component native-gauge ${t}" style=${n}>
        <meter
          value=${o} min=${a} low=${r} opt=${i}
          high=${s} max=${l} ...${e.RestProps}
        />
      </>`;
  });
}
const Iu = /* @__PURE__ */ Z("jcl-component.native-gauge", `
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
function Du(e) {
  return _(() => {
    Lu(), e = G(e);
    const t = S(e.Class) ?? "", n = ae(e.Style), o = Ge(e.Value), a = Ge(e.Max ?? e.Maximum);
    return b`<div class="jcl-component native-progressbar ${t}" style=${n}>
        <progress value=${o} max=${a} ...${e.RestProps}/>
      </>`;
  });
}
const Lu = /* @__PURE__ */ Z("jcl-component.native-progressbar", `
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
function Su(e) {
  return _(() => {
    Mu(), e = G(e);
    const t = S(e.Class) ?? "", n = ae(e.Style), o = V(e.Value, (j) => xt(j) || Ue(j)), a = Ge(e.Min ?? e.Minimum), r = V(e.Step, (j) => to(j, 0, 1 / 0, !1, !1)), i = Ge(e.Max ?? e.Maximum), s = V(e.Hashmarks, (j) => $e(j, Be)), l = Y(e.disabled) ?? !1, c = A(e.onValueInput), d = A(e.onInput), u = A(e.onBlur), { ViewRef: p, shownValue: h, ValueToShow: f } = Pt(
      Ue(o) || o != null && !isNaN(o) ? o : ct
    ), { actualValue: g, actualDisabling: x } = Ze(f, l), { _onInput: m, _onBlur: C } = en({
      Name: "nativeSlider",
      actualDisabling: x,
      shownValue: h,
      onInput: d,
      onValueInput: c,
      onBlur: u,
      processedInput: (j) => h.current = parseFloat(j.target.value)
    }), { SuggestionId: k, SuggestionList: L } = tn(
      s,
      (j) => {
        const { Value: y, Label: w } = vt(j);
        return b`<option value=${y}>${w}</option>`;
      }
    );
    return b`<div class="jcl-component native-slider ${t}" style=${n}>
        <input type="range" ref=${p} disabled=${x}
          value=${g} min=${a} max=${i} step=${r}
          list=${k}
          onInput=${m} onBlur=${C} ...${e.RestProps}
        />${L}
      </>`;
  });
}
const Mu = /* @__PURE__ */ Z("jcl-component.native-slider", `
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
function Ct(e) {
  const {
    Name: t,
    InputType: n,
    ClassName: o,
    ValueIsValid: a,
    withSpellChecking: r = !1,
    withMultiple: i = !1,
    withSuggestions: s = !0,
    Styled: l = !1
  } = e;
  return function(d) {
    return _(() => {
      (l ? bn : Xa)(), d = G(d);
      const u = S(d.Class) ?? "", p = V(d.Value, (ue) => a(ue) || Ue(ue)), h = i ? Y(d.multiple) : void 0, f = Y(d.invalid), g = S(d.Placeholder), x = Y(d.readonly), m = ke(d.minLength), C = ke(d.maxLength), k = S(d.Pattern), L = r ? Y(d.SpellCheck) : void 0, j = s ? V(d.Suggestions, (ue) => $e(ue, a)) : void 0, y = l ? V(d.Size, (ue) => be(ue, ["small", "normal", "large"])) ?? "normal" : void 0, w = Y(d.disabled) ?? !1, F = A(d.onValueInput), M = A(d.onInput), $ = A(d.onBlur), { ViewRef: I, shownValue: T, ValueToShow: D } = Pt(p), { actualValue: z, actualPlaceholder: E, actualDisabling: X } = Ze(D, w, g), { _onInput: Q, _onBlur: pe } = en({
        Name: t,
        actualDisabling: X,
        shownValue: T,
        onInput: M,
        onValueInput: F,
        onBlur: $
      }), { SuggestionId: q, SuggestionList: J } = tn(j), P = l ? `jcl-component styled-input ${o} ${tt(y)}` : `jcl-component native-textual-input ${o}`;
      return b`<input type=${n} class="${P} ${u} ${f ? "invalid" : ""}" ref=${I}
          value=${z} minlength=${m} maxlength=${C}
          multiple=${h} readOnly=${x} placeholder=${E}
          pattern=${k} spellcheck=${L}
          disabled=${X} list=${q}
          aria-invalid=${l && f == !0 ? "true" : void 0}
          onInput=${Q} onBlur=${pe} ...${d.RestProps}
        />${J}`;
    });
  };
}
function At(e) {
  const { Name: t, InputType: n, ClassName: o, ValueIsValid: a, Pattern: r, Styled: i = !1 } = e, s = r == null;
  return function(c) {
    return _(() => {
      (i ? bn : Xa)(), c = G(c);
      const d = S(c.Class) ?? "", u = V(c.Value, (X) => a(X) || Ue(X)), p = Y(c.readonly), h = s ? Y(c.withSeconds) : void 0, f = V(c.Min ?? c.Minimum, a), g = V(c.Max ?? c.Maximum, a), x = V(c.Suggestions, (X) => $e(X, a)), m = i ? V(c.Size, (X) => be(X, ["small", "normal", "large"])) ?? "normal" : void 0, C = Y(c.disabled) ?? !1, k = A(c.onValueInput), L = A(c.onInput), j = A(c.onBlur), { ViewRef: y, shownValue: w, ValueToShow: F } = Pt(u), { actualValue: M, actualDisabling: $ } = Ze(F, C), { _onInput: I, _onBlur: T } = en({
        Name: t,
        actualDisabling: $,
        shownValue: w,
        onInput: L,
        onValueInput: k,
        onBlur: j
      }), { SuggestionId: D, SuggestionList: z } = tn(x), E = i ? `jcl-component styled-input ${o} ${tt(m)}` : `jcl-component native-temporal-input ${o}`;
      return b`<input type=${n} class="${E} ${d}" ref=${y}
          value=${M} min=${f} max=${g}
          step=${s ? h ? 1 : 60 : void 0} pattern=${r}
          readOnly=${p}
          disabled=${$} list=${D}
          onInput=${I} onBlur=${T} ...${c.RestProps}
        />${z}`;
    });
  };
}
const Xa = /* @__PURE__ */ Z("jcl-component.native-textual-input", `
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
  `), Tu = /* @__PURE__ */ Ct({
  Name: "nativeTextlineInput",
  InputType: "text",
  ClassName: "native-textline-input",
  ValueIsValid: Be,
  withSpellChecking: !0
}), Ru = /* @__PURE__ */ Ct({
  Name: "nativePasswordInput",
  InputType: "password",
  ClassName: "native-password-input",
  ValueIsValid: Be,
  withSuggestions: !1
});
function Au(e) {
  return _(() => {
    Xa(), e = G(e);
    const t = S(e.Class) ?? "", n = V(e.Value, (I) => xt(I) || Ue(I)), o = Y(e.invalid), a = S(e.Placeholder), r = Y(e.readonly), i = Ge(e.Min ?? e.Minimum), s = V(e.Step, (I) => to(I, 0, 1 / 0, !1, !1)), l = Ge(e.Max ?? e.Maximum), c = To(e.Digits, 0, 15), d = Y(e.withoutTrailingZeros) ?? !1, u = V(e.Suggestions, (I) => $e(I, xt)), p = Y(e.disabled) ?? !1, h = A(e.onValueInput), f = A(e.onInput), g = A(e.onBlur);
    let x = s;
    if (c != null) {
      const I = Math.pow(10, -c);
      x = Math.max(s ?? I, I);
    }
    const { ViewRef: m, shownValue: C, ValueToShow: k } = Pt(
      Ue(n) || n != null && !isNaN(n) ? n : ct,
      (I) => (c != null && xt(I) && (I = I.toFixed(c), d && (I = parseFloat(I))), I)
    ), { actualValue: L, actualPlaceholder: j, actualDisabling: y } = Ze(k, p, a), { _onInput: w, _onBlur: F } = en({
      Name: "nativeNumberInput",
      actualDisabling: y,
      shownValue: C,
      onInput: f,
      onValueInput: h,
      onBlur: g,
      processedInput: (I) => {
        const T = parseFloat(I.target.value);
        return C.current = isNaN(T) ? void 0 : T, C.current;
      }
    }), { SuggestionId: M, SuggestionList: $ } = tn(u);
    return b`<input type="number" ref=${m}
        class="jcl-component native-textual-input native-number-input ${t} ${o ? "invalid" : ""}"
        value=${L} min=${i} max=${l} step=${x}
        readOnly=${r} placeholder=${j}
        disabled=${y} list=${M}
        onInput=${w} onBlur=${F} ...${e.RestProps}
      />${$}`;
  });
}
const Fu = /* @__PURE__ */ Ct({
  Name: "nativeEMailAddressInput",
  InputType: "email",
  ClassName: "native-emailaddress-input",
  ValueIsValid: qn,
  withMultiple: !0
}), zu = /* @__PURE__ */ Ct({
  Name: "nativePhoneNumberInput",
  InputType: "tel",
  ClassName: "native-phonenumber-input",
  ValueIsValid: Eo
}), Ou = /* @__PURE__ */ Ct({
  Name: "nativeURLInput",
  InputType: "url",
  ClassName: "native-url-input",
  ValueIsValid: at
}), Vu = "([01]\\d|2[0-3]):[0-5]\\d(:[0-5]\\d)?", Eu = /* @__PURE__ */ Ln(Vu);
function Gi(e) {
  return Bt(e, Eu);
}
const Nu = /* @__PURE__ */ At({
  Name: "nativeTimeInput",
  InputType: "time",
  ClassName: "native-time-input",
  ValueIsValid: Gi
}), Bu = "\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01])T([01]\\d|2[0-3]):[0-5]\\d(:[0-5]\\d)?", Wu = /* @__PURE__ */ Ln(Bu);
function Ki(e) {
  return Bt(e, Wu);
}
const Hu = /* @__PURE__ */ At({
  Name: "nativeDateTimeInput",
  InputType: "datetime-local",
  ClassName: "native-datetime-input",
  ValueIsValid: Ki
}), Ya = "\\d{4}-\\d{2}-\\d{2}", _u = /* @__PURE__ */ Ln(Ya);
function $t(e) {
  return Bt(e, _u);
}
const Gu = /* @__PURE__ */ At({
  Name: "nativeDateInput",
  InputType: "date",
  ClassName: "native-date-input",
  ValueIsValid: $t,
  Pattern: Ya
}), Ja = "\\d{4}-W\\d{2}", Ku = /* @__PURE__ */ Ln(Ja);
function Ui(e) {
  return Bt(e, Ku);
}
const Uu = /* @__PURE__ */ At({
  Name: "nativeWeekInput",
  InputType: "week",
  ClassName: "native-week-input",
  ValueIsValid: Ui,
  Pattern: Ja
}), Za = "\\d{4}-\\d{2}", qu = /* @__PURE__ */ Ln(Za);
function Qa(e) {
  return Bt(e, qu);
}
const Xu = /* @__PURE__ */ At({
  Name: "nativeMonthInput",
  InputType: "month",
  ClassName: "native-month-input",
  ValueIsValid: Qa,
  Pattern: Za
}), Yu = /* @__PURE__ */ Ct({
  Name: "nativeSearchInput",
  InputType: "search",
  ClassName: "native-search-input",
  ValueIsValid: Be,
  withSpellChecking: !0
});
function Ju(e) {
  return _(() => {
    Zu(), e = G(e);
    const t = S(e.Class) ?? "", n = ae(e.Style), o = V(e.Value, (g) => Be(g) || Ue(g)), a = S(e.Placeholder), r = Y(e.multiple), i = S(e.Accept), s = Y(e.disabled) ?? !1, l = A(e.onValueInput), c = A(e.onInput), d = o ?? ct, { actualValue: u, actualPlaceholder: p, actualDisabling: h } = Ze(d, s, a), f = ie((g) => {
      if (Le(g), h == !0)
        return;
      N('nativeFileInput callback "onInput"', c, g);
      let x = Array.from(g.target.files);
      N(
        'nativeFileInput callback "onValueInput"',
        l,
        x,
        g
      ), g.target.value = "";
    }, [h, c, l]);
    return b`<label class="jcl-component native-file-input ${t} ${h ? "disabled" : ""}"
        style=${n}
      >
        ${u == null ? b`<span>${p ?? ""}</span>` : b`<span>${u}</span>`}
        <input type="file" style="display:none"
          multiple=${r} accept=${i}
          disabled=${h} onInput=${f} ...${e.RestProps}
        />
      </label>`;
  });
}
const Zu = /* @__PURE__ */ Z("jcl-component.native-file-input", `
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
function Qu(e) {
  return _(() => {
    Pu(), e = G(e);
    const t = S(e.Class) ?? "", n = ae(e.Style), o = V(e.Value, (g) => Xn(g) || Ue(g)), a = Y(e.readonly), r = V(e.Suggestions, (g) => $e(g, Xn));
    let i = ke(e.minWidth);
    const s = Y(e.disabled) ?? !1, l = A(e.onValueInput), c = A(e.onInput), { actualValue: d, actualDisabling: u } = Ze(o, s), p = ie((g) => {
      if (Le(g), u == !0)
        return;
      N('nativeColorInput callback "onInput"', c, g);
      const x = g.target.value;
      N(
        'nativeColorInput callback "onValueInput"',
        l,
        x,
        g
      );
    }, [u, c, l]), { SuggestionId: h, SuggestionList: f } = tn(r);
    return i == null && (i = 40 + (r != null && r.length > 0 ? 20 : 0)), b`<input type="color" class="jcl-component native-color-input ${t}"
        style="min-width:${i}px; ${n}"
        value=${d} list=${h}
        disabled=${u} onInput=${p} ...${e.RestProps}
      />${f}`;
  });
}
const Pu = /* @__PURE__ */ Z("jcl-component.native-color-input", `
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
function ep(e) {
  return _(() => {
    tp(), e = G(e);
    const t = S(e.Class) ?? "", n = V(e.Value, (f) => Be(f) || Ue(f)), o = S(e.Placeholder), a = V(e.Options, (f) => $e(f, Be)) ?? Se("Options"), r = Y(e.disabled) ?? !1, i = A(e.onValueInput), s = A(e.onInput), { actualValue: l, actualPlaceholder: c, actualDisabling: d } = Ze(n, r, o), u = ie((f) => {
      if (Le(f), d == !0)
        return;
      N('nativeDropDown callback "onInput"', s, f);
      let g = f.target.value;
      N(
        'nativeDropDown callback "onValueInput"',
        i,
        g,
        f
      );
    }, [d, s, i]), h = !a.some((f) => {
      const { Value: g, isRuler: x } = vt(f);
      return !x && g === l;
    }) && c != null;
    return b`<select class="jcl-component native-dropdown ${t}"
        disabled=${d} onInput=${u} ...${e.RestProps}
      >${h ? b`<option value="" selected disabled>${c}</option>` : ""}${a.map(
      (f) => {
        const {
          Value: g,
          Label: x,
          disabled: m,
          isRuler: C
        } = vt(f);
        return C ? b`<hr/>` : b`<option value=${g}
                selected=${g === l} disabled=${m}
              >${x}</option>`;
      }
    )}</select>`;
  });
}
const tp = /* @__PURE__ */ Z("jcl-component.native-dropdown", `
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
function Pa(e) {
  return _(() => {
    np(), e = G(e);
    const t = S(e.Class) ?? "", n = ae(e.Style), o = V(e.Value, (M) => no(M) || Ue(M)), a = Y(e.invalid), r = S(e.Placeholder), i = Y(e.readonly), s = ke(e.minLength), l = ke(e.maxLength), c = Y(e.wrap), d = V(e.Resizability, (M) => be(M, ["none", "horizontal", "vertical", "both"])), u = Y(e.SpellCheck), p = Y(e.disabled) ?? !1, h = A(e.onValueInput), f = A(e.onInput), g = A(e.onBlur), { ViewRef: x, shownValue: m, ValueToShow: C } = Pt(o), { actualValue: k, actualPlaceholder: L, actualDisabling: j } = Ze(C, p, r), { _onInput: y, _onBlur: w } = en({
      Name: "nativeTextInput",
      actualDisabling: j,
      shownValue: m,
      onInput: f,
      onValueInput: h,
      onBlur: g
    }), F = Dt();
    return b`<textarea class="jcl-component native-text-input ${t} ${a ? "invalid" : ""}"
        key=${F} ref=${x}
        style="${c == !0 ? "overflow-wrap:break-word; hyphens:auto;" : "white-space:pre;"} resize:${d ?? "none"}; ${n}"
        value=${k} minlength=${s} maxlength=${l}
        readOnly=${i} placeholder=${L}
        spellcheck=${u} disabled=${j}
        onInput=${y} onBlur=${w} ...${e.RestProps}
      />`;
  });
}
const np = /* @__PURE__ */ Z("jcl-component.native-text-input", `
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
function op(e) {
  return _(() => {
    ap(), e = G(e);
    const t = S(e.Class) ?? "", n = ae(e.Style), o = mn(e.Icon) ?? Se("Icon"), a = mt(e.Color), r = Y(e.multiple), i = S(e.Accept), s = Y(e.disabled) ?? !1, l = A(e.onValueInput), c = A(e.onInput), d = ie((u) => {
      if (Le(u), s == !0)
        return;
      N('nativePseudoFileInput callback "onInput"', c, u);
      let p = Array.from(u.target.files);
      N(
        'nativePseudoFileInput callback "onValueInput"',
        l,
        p,
        u
      ), u.target.value = "";
    }, [s, c, l]);
    return b`<label
        class="jcl-component legacy-pseudo-file-input ${s ? "disabled" : ""} ${t}"
        style=${n}
      >
        <div style="
          -webkit-mask-image:url(${o}); mask-image:url(${o});
          background-color:${a ?? "black"};
        "/>
        <input type="file" style="display:none"
          multiple=${r} accept=${i}
          disabled=${s} onInput=${d} ...${e.RestProps}
        />
      </label>`;
  });
}
const ap = /* @__PURE__ */ Z("jcl-component.legacy-pseudo-file-input", `
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
function rp(e) {
  return _(() => {
    ip(), e = G(e);
    const t = S(e.Class) ?? "", n = ae(e.Style), o = V(e.Value, (f) => Be(f) || Ue(f)), a = mn(e.Icon) ?? Se("Icon"), r = mt(e.Color), i = V(e.Options, (f) => $e(f, Be)) ?? Se("Options"), s = Y(e.disabled) ?? !1, l = A(e.onValueInput), c = A(e.onInput), { actualValue: d, actualDisabling: u } = Ze(o, s), p = ie((f) => {
      if (Le(f), u == !0)
        return;
      N('legacyPseudoDropDown callback "onInput"', c, f);
      let g = f.target.value;
      N(
        'legacyPseudoDropDown callback "onValueInput"',
        l,
        g,
        f
      );
    }, [u, c, l]), h = i.some((f) => {
      const { Value: g, isRuler: x } = vt(f);
      return !x && g === d;
    });
    return b`<label
        class="jcl-component legacy-pseudo-dropdown ${s ? "disabled" : ""} ${t}"
        style=${n}
      >
        <div style="
          -webkit-mask-image:url(${a}); mask-image:url(${a});
          background-color:${r ?? "black"};
        "/>
        <select
          disabled=${u} onInput=${p} ...${e.RestProps}
        >${h ? "" : b`<option hidden selected value=""></option>`}${i.map(
      (f) => {
        const {
          Value: g,
          Label: x,
          disabled: m,
          isRuler: C
        } = vt(f);
        return C ? b`<hr/>` : b`<option value=${g}
                  selected=${g === d} disabled=${m}
                >${x}</option>`;
      }
    )}</select>
      </label>`;
  });
}
const ip = /* @__PURE__ */ Z("jcl-component.legacy-pseudo-dropdown", `
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
function sp(e) {
  return _(() => {
    lp(), e = G(e);
    const t = S(e.Class) ?? "", n = ae(e.Style), o = S(e.Placeholder), a = Y(e.multiple) ?? !1, r = V(e.Accept, (g) => $e(g, Be)) ?? [], i = Y(e.disabled) ?? !1, s = A(e.onValueInput), l = A(e.onInput), c = A(e.onDrop), d = (g) => {
      let x = Array.from(g);
      return r.length > 0 && (x = x.filter((m) => r.some((C) => (C = C.trim().toLowerCase(), C.startsWith(".") ? m.name.toLowerCase().endsWith(C) : C.endsWith("/*") ? m.type.toLowerCase().startsWith(C.slice(0, -1)) : m.type.toLowerCase() === C)))), !a && x.length > 1 && (x = x.slice(0, 1)), x;
    }, u = ie((g) => {
      if (Le(g), i == !0)
        return;
      const x = d(g.target.files);
      if (x.length === 0) {
        g.target.value = "";
        return;
      }
      N('legacyFileDropArea callback "onInput"', l, g), N(
        'legacyFileDropArea callback "onValueInput"',
        s,
        x,
        g
      ), g.target.value = "";
    }, [i, a, r, l, s]), p = ie((g) => Le(g), []), h = ie((g) => Le(g), []), f = ie((g) => {
      if (Le(g), i == !0)
        return;
      const x = d(g.dataTransfer.files);
      x.length !== 0 && (N('legacyFileDropArea callback "onDrop"', c, g), N(
        'legacyFileDropArea callback "onValueInput"',
        s,
        x,
        g
      ));
    }, [i, a, r, c, s]);
    return b`<label class="jcl-component legacy-file-drop-area ${t} ${i ? "disabled" : ""}"
        style=${n}
        onDragEnter=${p} onDragOver=${h} onDrop=${f}
      >
        <span>${o ?? ""}</span>
        <input type="file"
          multiple=${a} accept=${r.join(",")}
          disabled=${i} onInput=${u} ...${e.RestProps}
        />
      </label>`;
  });
}
const lp = /* @__PURE__ */ Z("jcl-component.legacy-file-drop-area", `
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
function cp(e) {
  return _(() => {
    dp(), e = G(e);
    const t = S(e.Class) ?? "";
    let n = ke(e.activeIndex);
    const o = ke(e.GapIndex), a = Y(e.disabled) ?? !1, r = A(e.onActivationChange), i = et(), s = jt(n, 0);
    n = s.current;
    const l = ie((u, p) => {
      if (a)
        return nn(p);
      s.current = u, i(), N('TabStrip callback "onActivationChange"', r, u);
    }, [a, r, i]), c = ie((u, p) => {
      (p.key === "Enter" || p.key === " ") && (p.preventDefault(), l(u, p));
    }, [l]), d = Yt(e.children).filter((u) => u?.type != null || typeof u == "number" || typeof u == "string" && u.trim() !== "");
    return b`<div
        class="jcl-component tabstrip ${a ? "disabled" : ""} ${t}"
        role="tablist" aria-disabled=${a ? "true" : void 0}
        ...${e.RestProps}
      >
        ${d.map((u, p) => {
      const h = p === o ? b`<div class="gap"/>` : "", f = p === n;
      return b`${h}<div
            class="${f ? "active" : ""} ${a ? "disabled" : ""} tab"
            role="tab" aria-selected=${f ? "true" : "false"}
            tabIndex=${a || f ? -1 : 0}
            onClick=${f ? void 0 : (g) => l(p, g)}
            onKeyDown=${f ? void 0 : (g) => c(p, g)}
          >${u}</>`;
    })}
      </>`;
  });
}
const dp = /* @__PURE__ */ Z("jcl-component.tabstrip", `
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
function up(e) {
  return _(() => {
    pp(), e = G(e);
    const t = S(e.Class) ?? "", n = S(e.Header) ?? Se("Header");
    let o = Y(e.expanded);
    const a = Y(e.disabled) ?? !1, r = A(e.onExpansionChange), i = et(), s = Dt(), l = s + "-fold-header", c = s + "-fold-content", d = jt(o, !1);
    o = d.current;
    const u = ie((h) => {
      if (Le(h), a)
        return;
      const f = !d.current;
      d.current = f, i(), N('AccordionFold callback "onExpansionChange"', r, f);
    }, [a, r, i]), p = ie((h) => {
      (h.key === "Enter" || h.key === " ") && (h.preventDefault(), u(h));
    }, [u]);
    return b`<div
        class="jcl-component accordion-fold ${a ? "disabled" : ""} ${t}"
        ...${e.RestProps}
      >
        <div class="header">
          <div
            class="expander ${o ? "expanded" : "collapsed"}"
            role="button" aria-expanded=${o ? "true" : "false"}
            aria-controls=${c} aria-label=${n}
            aria-disabled=${a ? "true" : void 0}
            tabIndex=${a ? -1 : 0}
            onClick=${u} onKeyDown=${p}
          />
          <div id=${l} class="title">${n}</>
        </>
        ${o ? b`<div
          id=${c} class="content"
          role="region" aria-labelledby=${l}
        >${e.children}</>` : ""}
      </>`;
  });
}
const pp = /* @__PURE__ */ Z("jcl-component.accordion-fold", `
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
      background:url(${So}/caret-down.png);
      background-repeat:no-repeat;
      background-size:contain; background-position:center;
    }
    .jcl-component.accordion-fold > .header > .expander.collapsed {
      background:url(${So}/caret-right.png);
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
function qi(e, t) {
  return e == null ? [] : e.filter((n) => t.has(n) ? !1 : (t.add(n), !0));
}
let Po = 0;
const ea = /* @__PURE__ */ new WeakMap();
function er(e, t, n) {
  return ea.has(e) ? "" + ea.get(e) : (Po++, ea.set(e, Po), "" + Po);
}
function Xi(e, t, n, o = !1, a = "") {
  return typeof e.toHTML == "function" ? b`<div class="default" dangerouslySetInnerHTML=${{ __html: e.toHTML() }}/>` : b`<div class="default">${"" + e}</>`;
}
function Yi(e) {
  return _(() => {
    hp(), e = G(e);
    const t = S(e.Class) ?? "";
    let n = V(e.List, (q) => $e(q, De)) ?? Se("List");
    const o = S(e.Placeholder), a = A(e.KeyOfListItem) ?? er, r = A(e.ListItemRenderer) ?? Xi, i = A(e.onListItemClick);
    let s = V(e.selectedItems, (q) => $e(q, De));
    const l = ke(e.SelectionLimit) ?? 1 / 0, c = A(e.onSelectionChange), d = A(e.onListItemMove), u = V(e.DragMIMEType, Jn), p = A(e.SerializeListItems) ?? JSON.stringify, h = A(e.onListItemsDropped), f = V(e.DragEffect, (q) => Fa.includes(q)), g = c != null, x = g && d != null, m = g && u != null, C = x || m, k = /* @__PURE__ */ new Set();
    n.forEach((q) => {
      k.has(q) && ce(
        'InvalidArguments: the given "List" contains double entries'
      ), k.add(q);
    });
    const L = /* @__PURE__ */ new Set();
    g && (s = qi(s, L), s.length > l && (s.slice(l).forEach(
      (q) => L.delete(q)
    ), s.length = l));
    const [j, y] = He({
      dragging: !1,
      DropTargetItem: void 0,
      DropMode: void 0
    });
    function w(q) {
      y((J) => ({ ...J, ...q }));
    }
    const F = K([]), M = K(!1), $ = (q) => {
      q.stopImmediatePropagation();
      const J = q.target.Item, P = q.target.Index;
      if (N(
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
      let Ce = s;
      if (ue)
        if (L.has(q))
          Ce = s.filter(
            (Ve) => Ve !== q
          );
        else {
          if (s.length === l)
            return s;
          Ce = [...s, q];
        }
      else
        Ce = [q];
      return N(
        'FlatListView callback "onSelectionChange"',
        c,
        Ce,
        J
      ), Ce;
    }, T = (q) => {
      const J = q.target.Item, P = q.target.Index;
      let ue = s;
      if (!L.has(J)) {
        const Ce = q.ctrlKey || q.metaKey;
        ue = I(J, n, P, Ce);
      }
      F.current = ue, M.current = !1, q.dataTransfer.effectAllowed = f ?? (m ? "copyMove" : "move"), m && q.dataTransfer.setData(
        u,
        p(ue)
      ), w({ dragging: !0 });
    }, D = (q) => {
      const J = q.target, P = J.Item;
      if (P != null) {
        if (L.has(P)) {
          j.DropTargetItem != null && w({ DropTargetItem: void 0, DropMode: void 0 });
          return;
        }
        const Ce = J.getBoundingClientRect().top + J.offsetHeight / 2, Ve = q.clientY < Ce ? "before" : "after";
        q.preventDefault(), (j.DropTargetItem !== P || j.DropMode !== Ve) && w({ DropTargetItem: P, DropMode: Ve });
        return;
      }
      let ue;
      for (let Ce = n.length - 1; Ce >= 0; Ce--)
        if (!L.has(n[Ce])) {
          ue = n[Ce];
          break;
        }
      if (ue == null) {
        j.DropTargetItem != null && w({ DropTargetItem: void 0, DropMode: void 0 });
        return;
      }
      q.preventDefault(), (j.DropTargetItem !== ue || j.DropMode !== "after") && w({ DropTargetItem: ue, DropMode: "after" });
    }, z = (q) => {
      if (!M.current) {
        const J = q.dataTransfer?.dropEffect ?? "none";
        J !== "none" && m && N(
          'FlatListView callback "onListItemsDropped"',
          h,
          J,
          F.current,
          n
        );
      }
      w({ dragging: !1, DropTargetItem: void 0, DropMode: void 0 });
    }, E = (q) => {
      const { DropTargetItem: J, DropMode: P } = j;
      if (J != null) {
        M.current = !0;
        const ue = n.filter(
          // in original order!
          (_e) => L.has(_e)
        ), Ce = n.filter(
          (_e) => !L.has(_e)
        ), Ve = Ce.indexOf(J) + (P === "before" ? 0 : 1);
        Ce.splice(Ve, 0, ...ue), n = Ce, N(
          'FlatListView callback "onListItemMove"',
          d,
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
        onDragStart=${C ? T : void 0}
         onDragOver=${x ? D : void 0}
          onDragEnd=${C ? z : void 0}
             onDrop=${x ? E : void 0}
        ...${e.RestProps}
      >
        ${n.map((q, J) => {
      const P = Ke(
        'FlatListView callback "KeyOfListItem"',
        a,
        q,
        n,
        J
      ), ue = L.has(q), Ce = q === Q ? pe : "";
      return b`<div
            class=${"itemview" + (ue ? " selected" : "") + (q === Q ? ` DropTarget ${pe}` : "")}
            role=${g ? "option" : "listitem"}
            aria-selected=${g ? ue ? "true" : "false" : void 0}
            key=${P} draggable=${C}
            ref=${(Ve) => {
        Ve != null && (Ve.Item = q, Ve.Index = J);
      }}
          >
            ${Ke(
        'FlatListView callback "ListItemRenderer"',
        r,
        q,
        n,
        J,
        ue,
        Ce
      )}
          </>`;
    })}
      </>`;
  });
}
const hp = /* @__PURE__ */ Z("jcl-component.flatlistview", `
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
      display:flex; flex-flow:column nowrap; align-items:center; justify-content:center;
      flex:1 0 auto; overflow:hidden;
      background-color:#EEEEEE;
    }
    .jcl-component.flatlistview.placeholder > * {
      display:inline-block; position:relative;
      left:0px; top:0px; right:auto; bottom:auto; width:auto; height:auto;
    }
  `);
function fp(e) {
  return er(e);
}
function gp(e, t = !1, n = !1, o = !1, a = "") {
  return Xi(e);
}
function mp(e) {
  return _(() => {
    bp();
    const t = K([]), n = K(() => !0);
    e = G(e);
    const o = S(e.Class) ?? "", a = V(e.List, (U) => $e(U, De)) ?? Se("List"), r = S(e.Placeholder), i = A(e.KeyOfListItem) ?? fp, s = A(e.ListItemRenderer) ?? gp, l = A(e.ContentOfListItem), c = A(e.ContainerOfListItem), d = A(e.onListItemClick), u = A(e.ItemMayBeSelected) ?? n.current;
    let p = V(e.selectedItems, (U) => $e(U, De));
    const h = ke(e.SelectionLimit) ?? 1 / 0, f = A(e.onSelectionChange), g = A(e.ItemMayBeExpanded) ?? n.current;
    let x = V(e.expandedItems, (U) => $e(U, De)) ?? t.current;
    const m = A(e.onExpansionChange), C = A(e.ListItemMayAccept) ?? n.current, k = A(e.onListItemMove), L = V(e.DragMIMEType, Jn), j = A(e.SerializeListItems) ?? JSON.stringify, y = A(e.onListItemsDropped), w = V(e.DragEffect, (U) => Fa.includes(U)), F = f != null, M = F && k != null, $ = F && L != null, I = M || $, T = /* @__PURE__ */ new Set();
    function D(U) {
      U.forEach((re) => {
        T.has(re) && ce(
          'InvalidArguments: the given "List" contains double entries'
        ), T.add(re);
        const ge = Ke(
          'NestedListView callback "ContentOfListItem"',
          l,
          re
        );
        ge != null && D(ge);
      });
    }
    D(a);
    function z(U, re) {
      let ge = Ke(
        'NestedListView callback "ContainerOfListItem"',
        c,
        re
      );
      switch (ge) {
        case null:
        case void 0:
          return !1;
        case U:
          return !0;
        default:
          return z(U, ge);
      }
    }
    const E = /* @__PURE__ */ new Set();
    if (F) {
      p = qi(p, E);
      for (let U = p.length - 1; U >= 0; U--) {
        const re = p[U];
        p.some((ge, We) => We !== U && z(ge, re)) && (p.splice(U, 1), E.delete(re));
      }
      p.length > h && (p.slice(h).forEach(
        (U) => E.delete(U)
      ), p.length = h);
    }
    function X(U) {
      return p.some(
        (re) => z(re, U)
      );
    }
    function Q(U) {
      for (let re = p.length - 1; re >= 0; re--) {
        const ge = p[re];
        z(U, ge) && (p.splice(re, 1), E.delete(ge));
      }
    }
    function pe(U, re) {
      if (h === 0)
        return p;
      let ge = p;
      if (re)
        if (E.has(U))
          ge = p.filter(
            (We) => We !== U
          );
        else {
          if (p.length === h)
            return p;
          ge = [...p.filter(
            (We) => !z(U, We)
          ), U];
        }
      else
        ge = [U];
      return N(
        'NestedListView callback "onSelectionChange"',
        f,
        ge
      ), ge;
    }
    const q = Zt(() => {
      const U = /* @__PURE__ */ new Map();
      return x == null ? x = [] : x = x.filter((re) => U.has(re) ? !1 : (U.set(re, "explicit"), !0)), U;
    }, [x]);
    function J(U) {
      q.has(U) ? ue(U) : P(U);
    }
    function P(U) {
      q.set(U, "explicit");
      let re = [...x, U], ge = Ke(
        'NestedListView callback "ContainerOfListItem"',
        c,
        U
      );
      for (; ge != null; )
        q.has(ge) || (q.set(ge, "explicit"), re.push(ge)), ge = Ke(
          'NestedListView callback "ContainerOfListItem"',
          c,
          ge
        );
      N(
        'NestedListView callback "onExpansionChange"',
        m,
        re
      );
    }
    function ue(U) {
      q.delete(U);
      const re = x.filter(
        (ge) => ge !== U
      );
      N(
        'NestedListView callback "onExpansionChange"',
        m,
        re
      );
    }
    function Ce(U) {
      q.has(U) || q.set(U, "automatic");
      let re = Ke(
        'NestedListView callback "ContainerOfListItem"',
        c,
        U
      );
      for (; re != null; )
        q.has(re) || q.set(re, "automatic"), re = Ke(
          'NestedListView callback "ContainerOfListItem"',
          c,
          re
        );
    }
    function Ve(U) {
      q.get(U) === "automatic" && q.delete(U);
      let re = Ke(
        'NestedListView callback "ContainerOfListItem"',
        c,
        U
      );
      for (; re != null; )
        q.get(re) === "automatic" && q.delete(re), re = Ke(
          'NestedListView callback "ContainerOfListItem"',
          c,
          re
        );
    }
    const _e = K(/* @__PURE__ */ Object.create(null)), nt = K({
      dragging: !1,
      DropTargetItem: void 0,
      DropMode: void 0,
      DropTargetTimer: void 0
    }), ot = K([]), te = K(!1);
    function ee(U) {
      const re = U.target.getAttribute("data-key"), ge = _e.current[re];
      if (ge == null)
        return;
      let We = p;
      E.has(ge) || (We = pe(ge, U.shiftKey || U.metaKey)), ot.current = We, te.current = !1, U.dataTransfer.effectAllowed = w ?? ($ ? "copyMove" : "move"), $ && U.dataTransfer.setData(
        L,
        j(We)
      ), fe.State.dragging = !0, fe.State.DropTargetItem = void 0, fe.State.DropTargetTimer = void 0, ye();
    }
    function ne(U) {
      const re = U.target.getAttribute("data-key"), ge = _e.current[re], { DropTargetItem: We } = fe.State;
      if (We === ge)
        U.preventDefault(), Me(U, ge);
      else {
        if (We != null && Fe(U), ge == null)
          return;
        if (!E.has(ge) && !X(ge)) {
          if (Ke(
            'NestedListView callback "ListItemMayAccept"',
            fe.ListItemMayAccept,
            ge,
            p
          ) != !0)
            return;
          U.preventDefault(), Ie(U, ge);
        }
      }
    }
    const se = ne;
    function xe(U) {
      const re = U.target.getAttribute("data-key"), ge = _e.current[re], { DropTargetItem: We } = fe.State;
      (We === ge || ge == null) && Fe(U);
    }
    function we(U) {
      if (xe(U), !te.current) {
        const re = U.dataTransfer?.dropEffect ?? "none";
        re !== "none" && $ && N(
          'NestedListView callback "onListItemsDropped"',
          y,
          re,
          ot.current,
          a
        );
      }
      fe.State.dragging = !1, fe.State.DropMode = void 0, ye();
    }
    function Ie(U, re) {
      const { DropTargetTimer: ge } = fe.State;
      ge != null && (clearTimeout(ge), fe.State.DropTargetTimer = void 0), fe.State.DropTargetItem = re, fe.State.DropTargetTimer = setTimeout(() => {
        fe.State.DropTargetTimer = void 0, fe.State.DropMode === "after" && (Ce(re), ye());
      }, 2e3);
      let We = Ke(
        'NestedListView callback "ContainerOfListItem"',
        c,
        re
      );
      We != null && (Ce(We), ye()), Me(U, re);
    }
    function Me(U, re) {
      const ge = U.target.getBoundingClientRect().top + U.target.offsetHeight / 2, We = U.clientY < ge ? "before" : "after";
      fe.State.DropMode !== We && (We === "after" && fe.State.DropTargetTimer == null && (fe.State.DropTargetTimer = setTimeout(() => {
        fe.State.DropTargetTimer = void 0, fe.State.DropMode === "after" && (Ce(re), ye());
      }, 2e3)), fe.State.DropMode = We, ye());
    }
    function Fe(U) {
      const { DropTargetItem: re, DropTargetTimer: ge } = fe.State;
      ge != null && (clearTimeout(ge), fe.State.DropTargetTimer = void 0), re != null && (Ve(re), fe.State.DropTargetItem = void 0), setTimeout(ye, 500);
    }
    function lt(U) {
      const { DropTargetItem: re, DropMode: ge } = fe.State;
      re != null && (te.current = !0, N(
        'NestedListView callback "onListItemMove"',
        k,
        p,
        re,
        ge
      ), fe.State.dragging = !1, fe.State.DropTargetItem = void 0, fe.State.DropMode = void 0);
    }
    const ye = et(), fe = {
      List: a,
      ListIsSortable: M,
      ListIsDraggable: I,
      KeyOfListItem: i,
      ListItemRenderer: s,
      ContentOfListItem: l,
      ListIsSelectable: F,
      ListItemMayBeSelected: u,
      onListItemClick: d,
      SelectionSet: E,
      anyOuterItemIsSelected: X,
      changeSelection: pe,
      ExpansionMap: q,
      ListItemMayBeExpanded: g,
      toggleExpansionOf: J,
      ListItemWithKey: _e.current,
      ListItemMayAccept: C,
      State: nt.current,
      rerender: ye
    };
    if (a.length === 0)
      return b`<div
          class="jcl-component nestedlistview placeholder ${o}"
          ...${e.RestProps}
        >
          <div dangerouslySetInnerHTML=${{ __html: r ?? "(empty)" }}/>
        </>`;
    const { dragging: Ye } = fe.State;
    return b`<div
        class="jcl-component nestedlistview ${Ye ? "dragging" : ""} ${o}"
        role="tree"
        aria-multiselectable=${F && h !== 1 ? "true" : void 0}
        onDragStart=${I ? ee : void 0}
        onDragEnter=${M ? ne : void 0}
         onDragOver=${M ? se : void 0}
        onDragLeave=${M ? xe : void 0}
          onDragEnd=${I ? we : void 0}
             onDrop=${M ? lt : void 0}
        ...${e.RestProps}
      >
        <${Ji} List=${a} ListContext=${fe}/>
      </>`;
  });
}
const bp = /* @__PURE__ */ Z("jcl-component.nestedlistview", `
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
      flex:1 0 auto; overflow:hidden;
      background-color:#EEEEEE;
    }
    .jcl-component.nestedlistview.placeholder > * {
      display:inline-block; position:relative;
      left:0px; top:0px; right:auto; bottom:auto; width:auto; height:auto;
    }
  `);
function Ji(e) {
  return _(() => {
    const { List: t, ListContext: n } = e;
    return b`<div class="listview" role="group">${t.map((o) => b`<${yp}
          ListItem=${o} ListContext=${n}
        />`)}</>`;
  });
}
function yp(e) {
  return _(() => {
    const { ListItem: t, ListContext: n } = e, { KeyOfListItem: o, ContentOfListItem: a } = n, r = Ke(
      'NestedListView callback "ContentOfListItem"',
      a,
      t
    ), i = r == null, s = n.ExpansionMap.has(t), l = n.SelectionSet.has(t), c = Ke(
      'NestedListView callback "KeyOfListItem"',
      o,
      t
    );
    n.ListItemWithKey[c] = t;
    const d = (j) => {
      if (j.stopPropagation(), N(
        'NestedListView callback "onListItemClick"',
        n.onListItemClick,
        t,
        j
      ), !n.anyOuterItemIsSelected(t) && n.ListIsSelectable) {
        if (Ke(
          'NestedListView callback "ListItemMayBeSelected"',
          n.ListItemMayBeSelected,
          t
        ) != !0)
          return;
        const y = j.pointerType !== "mouse" || j.ctrlKey || j.metaKey;
        n.changeSelection(t, y);
      }
    }, u = (j) => {
      j.stopPropagation(), Ke(
        'NestedListView callback "ContentOfListItem"',
        a,
        t
      ) != null && (n.toggleExpansionOf(t), n.rerender());
    }, p = i ? "plain" : s ? "expanded" : "collapsed", h = Ke(
      'NestedListView callback "ListItemMayBeExpanded"',
      n.ListItemMayBeExpanded,
      t
    ), f = b`<div
        class="expansion-marker ${p} ${h ? "" : "disabled"}"
        onClick=${h ? u : void 0}
      />`, g = !i && s && !(n.State.dragging && l) ? b`<${Ji} List=${r} ListContext=${n}/>` : "", { DropTargetItem: x, DropMode: m } = n.State, C = t === x, k = n.ListIsSortable, L = n.ListIsDraggable;
    return b`<div
        class=${"listitemview" + (l ? " selected" : "") + (C ? ` DropTarget ${m}` : "")}
        role="treeitem"
        aria-expanded=${i ? void 0 : s ? "true" : "false"}
        aria-selected=${n.ListIsSelectable ? l ? "true" : "false" : void 0}
        key=${c} data-key=${c}
        draggable=${L} onClick=${d}
      > <div class="labelline">
          ${f}
          <div class="labelview">${Ke(
      'NestedListView callback "ListItemRenderer"',
      n.ListItemRenderer,
      t,
      l,
      i,
      s,
      C ? m : ""
    )}</>
        </>
        ${g}
      </>`;
  });
}
let Zi, Qi;
const xp = so(() => Promise.all([
  rt("squire-rte"),
  rt("dompurify")
]).then(([e, t]) => {
  Zi = e.Squire ?? e.default, Qi = t.default ?? t;
})), tr = "jcl-custom:", wp = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
function vp(e) {
  const t = new DOMParser().parseFromString(
    "<body>" + e + "</body>",
    "text/html"
  ), n = t.body;
  return Array.from(n.querySelectorAll("*")).forEach((o) => {
    if (!/^CUSTOM-/.test(o.tagName))
      return;
    const a = {};
    Array.from(o.attributes).forEach((i) => {
      a[i.name] = i.value;
    });
    const r = t.createElement("img");
    r.setAttribute("src", wp), r.setAttribute("alt", tr + JSON.stringify({
      Tag: o.tagName.toLowerCase(),
      Attributes: a,
      innerHTML: o.innerHTML
    })), o.replaceWith(r);
  }), n.innerHTML;
}
function ua(e) {
  const t = Qi.sanitize(vp(e), {
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
function Cp(e) {
  let t;
  try {
    t = JSON.parse(
      (e.getAttribute("alt") ?? "").slice(tr.length)
    );
  } catch {
    return;
  }
  if (t == null || !/^custom-/.test(t.Tag ?? ""))
    return;
  const n = document.createElement(t.Tag);
  return Object.keys(t.Attributes ?? {}).forEach((o) => {
    /^on/i.test(o) || n.setAttribute(o, t.Attributes[o]);
  }), n.setAttribute("contenteditable", "false"), n.appendChild(ua(t.innerHTML ?? "")), nr(n), n;
}
function nr(e) {
  Array.from(e.querySelectorAll('img[alt^="' + tr + '"]')).forEach((t) => {
    const n = Cp(t);
    n != null && t.replaceWith(n);
  });
}
function Pi(e, t) {
  e.classList.toggle("empty", t.textContent === "");
}
function ta(e, t, n, o) {
  return e.setHTML(o), nr(t), Pi(n, t), e.getHTML();
}
function _r(e, t, n) {
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
function kp(e) {
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
    const [a, r, i] = t[o];
    n[o] = () => e.hasFormat(a) ? e[i]() : e[r]();
  }), n;
}
function es(e) {
  return _(() => {
    jp();
    const t = Mn(xp);
    e = G(e);
    const n = S(e.Class) ?? "";
    let o = ae(e.Value);
    const a = S(e.Placeholder) ?? "", r = Y(e.readonly) ?? !1, i = Y(e.disabled) ?? !1, s = A(e.onValueChange), l = A(e.onSelectionChange), c = A(e.onUndoStateChange), d = A(e.onPaste), u = A(e.onImagePaste), p = A(e.onMount), h = A(e.onUnmount), f = K(null), g = K(void 0), x = K(void 0), m = K({});
    m.current = {
      onValueChange: s,
      onSelectionChange: l,
      onUndoStateChange: c,
      onPaste: d,
      onImagePaste: u,
      onUnmount: h
    };
    const C = K(o ?? ""), k = K(o ?? ""), L = K(!1);
    return o != null && o !== C.current && (C.current = o, k.current = o, L.current = !0), je(() => {
      if (!t)
        return;
      const j = f.current, y = document.createElement("div");
      y.className = "rte-root", j.appendChild(y), x.current = y;
      const w = new Zi(y, {
        blockTag: "DIV",
        sanitizeToDOMFragment: ua
      });
      g.current = w, k.current = ta(
        w,
        y,
        j,
        k.current
      );
      function F() {
        Pi(j, y);
      }
      function M() {
        return {
          Text: w.getSelectedText(),
          isCollapsed: w.getSelection().collapsed,
          Path: w.getPath()
        };
      }
      function $() {
        const O = w.getHTML();
        k.current = O, F(), N(
          'RichTextEditor callback "onValueChange"',
          m.current.onValueChange,
          O
        );
      }
      let I = !1, T = !1;
      function D(O) {
        O.target instanceof Element && O.target.classList.contains("squire-resize-handle") && (I = !0);
      }
      function z() {
        I && (I = !1, T && (T = !1, $()));
      }
      y.addEventListener("pointerdown", D, !0), document.addEventListener("pointerup", z, !0), document.addEventListener("pointercancel", z, !0), w.addEventListener("input", () => {
        if (I) {
          T = !0;
          return;
        }
        $();
      });
      function E() {
        N(
          'RichTextEditor callback "onSelectionChange"',
          m.current.onSelectionChange,
          M()
        );
      }
      w.addEventListener("select", E), w.addEventListener("cursor", E), w.addEventListener("undoStateChange", (O) => {
        const { canUndo: oe, canRedo: he } = O.detail ?? {};
        N(
          // payload in a
          'RichTextEditor callback "onUndoStateChange"',
          // CustomEvent
          m.current.onUndoStateChange,
          oe === !0,
          he === !0
        );
      }), w.addEventListener("willPaste", (O) => {
        const oe = m.current.onPaste;
        oe != null && N(
          // ..."Event.detail" (fragment or text)
          'RichTextEditor callback "onPaste"',
          oe,
          O
        );
      }), w.addEventListener("pasteImage", (O) => {
        const { clipboardData: oe } = O.detail ?? {};
        if (oe == null)
          return;
        const he = m.current.onImagePaste;
        if (he != null) {
          N(
            'RichTextEditor callback "onImagePaste"',
            he,
            oe
          );
          return;
        }
        Array.from(oe.files ?? []).filter((Ee) => Ee.type.startsWith("image/")).forEach((Ee) => {
          const Re = new FileReader();
          Re.onload = () => w.insertImage(Re.result, {}), Re.readAsDataURL(Ee);
        });
      });
      function X(O) {
        for (; O != null && O !== y; ) {
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
        const he = Array.from(y.querySelectorAll("td,th")), Ee = he[he.indexOf(oe) + (O.shiftKey ? -1 : 1)];
        Ee != null && (O.preventDefault(), J(Ee));
      });
      function Q(O) {
        for (; O != null && O !== y; ) {
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
        const oe = O.parentNode, he = document.createElement("tr");
        for (let Ee = 0; Ee < oe.cells.length; Ee++)
          he.appendChild(q());
        oe.parentNode.insertBefore(he, oe.nextSibling), J(he.cells[O.cellIndex] ?? he.cells[0]);
      }
      function Ce() {
        const O = pe();
        if (O == null)
          return;
        const oe = O.parentNode, he = Q(oe);
        if (he == null || he.rows.length <= 1)
          return;
        w.saveUndoState();
        const Ee = oe.rowIndex, Re = O.cellIndex;
        oe.remove();
        const qe = he.rows[Math.min(Ee, he.rows.length - 1)];
        J(
          qe.cells[Math.min(Re, qe.cells.length - 1)]
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
        const he = O.cellIndex;
        Array.from(oe.rows).forEach((Ee) => {
          Ee.cells[Math.min(he, Ee.cells.length - 1)].after(q());
        }), J(O.parentNode.cells[he + 1]);
      }
      function _e() {
        const O = pe();
        if (O == null)
          return;
        const oe = O.parentNode, he = Q(O);
        if (he == null || oe.cells.length <= 1)
          return;
        w.saveUndoState();
        const Ee = O.cellIndex;
        Array.from(he.rows).forEach((Re) => {
          Re.cells.length > Ee && Re.deleteCell(Ee);
        }), J(oe.cells[Math.min(Ee, oe.cells.length - 1)]);
      }
      function nt(O, oe) {
        const he = Q(w.getSelection().startContainer);
        if (he == null)
          return;
        const Ee = Math.max(1, Math.floor(O)), Re = Math.max(1, Math.floor(oe));
        for (w.saveUndoState(); he.rows.length > Ee; )
          he.deleteRow(-1);
        for (; he.rows.length < Ee; ) {
          const qe = he.insertRow(-1);
          for (let kt = 0; kt < Re; kt++)
            qe.appendChild(q());
        }
        Array.from(he.rows).forEach((qe) => {
          for (; qe.cells.length > Re; )
            qe.deleteCell(-1);
          for (; qe.cells.length < Re; )
            qe.appendChild(q());
        }), J(he.rows[0].cells[0]);
      }
      function ot(O) {
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
      y.addEventListener("pointerdown", (O) => {
        te = O.target.nodeName === "IMG" ? O.target : void 0;
      });
      function ee() {
        if (te != null && te.isConnected)
          return te;
        const O = w.getSelection(), oe = O.startContainer;
        if (oe instanceof Element) {
          const he = oe.childNodes[O.startOffset];
          if (he != null && he.nodeName === "IMG")
            return he;
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
        const { URL: oe, Width: he, AltText: Ee } = O;
        let Re = ee();
        if (Re == null) {
          if (oe == null || oe === "")
            return;
          Re = w.insertImage(oe, {});
        } else
          w.saveUndoState(), oe != null && oe !== "" && Re.setAttribute("src", oe);
        if (Ee != null && Re.setAttribute("alt", Ee), he != null) {
          const qe = String(he).trim();
          _r(Re.style, "width", qe), Re.style.height = qe === "" ? "" : "auto";
        }
        te = Re;
      }
      let xe;
      y.addEventListener("pointerdown", (O) => {
        xe = O.target.nodeName === "IFRAME" ? O.target : void 0;
      });
      function we() {
        if (xe != null && xe.isConnected)
          return xe;
        const O = w.getSelection(), oe = O.startContainer;
        if (oe instanceof Element) {
          const he = oe.childNodes[O.startOffset];
          if (he != null && he.nodeName === "IFRAME")
            return he;
        }
      }
      function Ie() {
        const O = we();
        return O == null ? void 0 : {
          URL: O.getAttribute("src") ?? "",
          Width: O.style.width || (O.getAttribute("width") ?? ""),
          Height: O.style.height || (O.getAttribute("height") ?? ""),
          allow: O.getAttribute("allow") ?? "",
          Sandbox: O.getAttribute("sandbox") ?? "",
          ReferrerPolicy: O.getAttribute("referrerpolicy") ?? ""
        };
      }
      function Me(O, oe, he) {
        he != null && (he === "" ? O.removeAttribute(oe) : O.setAttribute(oe, he));
      }
      function Fe(O, oe, he) {
        he != null && _r(O.style, oe, String(he).trim());
      }
      function lt(O) {
        const { URL: oe, Width: he, Height: Ee, allow: Re, Sandbox: qe, ReferrerPolicy: kt } = O;
        let dt = we();
        if (dt == null) {
          if (oe == null || oe === "")
            return;
          dt = document.createElement("iframe"), dt.setAttribute("src", oe), w.insertElement(dt);
        } else
          w.saveUndoState(), oe != null && oe !== "" && dt.setAttribute("src", oe);
        Me(dt, "allow", Re), Me(dt, "sandbox", qe), Me(dt, "referrerpolicy", kt), Fe(dt, "width", he), Fe(dt, "height", Ee), xe = dt;
      }
      function ye(O) {
        return O != null && O.nodeType === 1 && /^custom-/i.test(O.nodeName);
      }
      function fe(O) {
        for (; O != null && O !== y; ) {
          if (ye(O))
            return O;
          O = O.parentNode;
        }
      }
      let Ye;
      y.addEventListener("pointerdown", (O) => {
        Ye = fe(O.target);
      });
      function U() {
        if (Ye != null && Ye.isConnected)
          return Ye;
        const O = w.getSelection(), oe = O.startContainer;
        if (oe instanceof Element) {
          const he = oe.childNodes[O.startOffset];
          if (ye(he))
            return he;
        }
      }
      function re() {
        const O = U();
        if (O == null)
          return;
        const oe = {};
        for (const he of Array.from(O.attributes))
          he.name !== "contenteditable" && (oe[he.name] = he.value);
        return {
          Tag: O.tagName.toLowerCase(),
          Attributes: oe,
          innerHTML: O.innerHTML
        };
      }
      function ge(O) {
        const { Tag: oe, Attributes: he, innerHTML: Ee } = O;
        let Re = U();
        if (Re == null) {
          const qe = String(oe ?? "").trim().toLowerCase();
          if (!/^custom-/.test(qe))
            return;
          Re = document.createElement(qe), w.insertElement(Re);
        } else
          w.saveUndoState();
        if (he != null)
          for (const qe of Object.keys(he)) {
            if (qe === "contenteditable" || /^on/i.test(qe))
              continue;
            const kt = he[qe];
            kt != null && (kt === "" ? Re.removeAttribute(qe) : Re.setAttribute(qe, kt));
          }
        Ee != null && (Re.innerHTML = "", Re.appendChild(ua(Ee)), nr(Re)), Re.setAttribute("contenteditable", "false"), Ye = Re;
      }
      const We = {
        Editor: w,
        // grants access to full Squire API
        focus: () => w.focus(),
        blur: () => w.blur(),
        moveCursorToStart: () => w.moveCursorToStart(),
        moveCursorToEnd: () => w.moveCursorToEnd(),
        getValue: () => w.getHTML(),
        setValue: (O) => {
          Je("editor value", O), k.current = ta(
            w,
            y,
            j,
            O
          );
        },
        insertHTML: (O) => {
          Je("HTML to insert", O), w.insertHTML(O);
        },
        insertPlainText: (O) => {
          Je("text to insert", O), w.insertPlainText(O, !1);
        },
        insertImage: (O, oe) => {
          Je("image URL", O), w.insertImage(O, oe ?? {});
        },
        ImageAtCursor: () => ne(),
        updateImage: (O) => se(O ?? {}),
        IFrameAtCursor: () => Ie(),
        updateIFrame: (O) => lt(O ?? {}),
        CustomComponentAtCursor: () => re(),
        updateCustomComponent: (O) => ge(O ?? {}),
        insertTable: (O = 2, oe = 2) => {
          const he = Math.max(1, Math.floor(O)), Ee = Math.max(1, Math.floor(oe));
          w.insertHTML("<table><tbody>" + ("<tr>" + "<td><br/></td>".repeat(Ee) + "</tr>").repeat(he) + "</tbody></table>");
        },
        TableDimensions: () => P(),
        resizeTable: (O, oe) => nt(O, oe),
        alignTable: (O) => ot(O),
        insertTableRow: ue,
        deleteTableRow: Ce,
        insertTableColumn: Ve,
        deleteTableColumn: _e,
        getSelection: () => M(),
        CursorPosition: () => w.getCursorPosition(),
        hasFormat: (O) => w.hasFormat(O.toUpperCase()),
        FontInfo: () => w.getFontInfo(),
        ...kp(w),
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
          Je("link URL", O), w.makeLink(O);
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
          w.undo(), k.current = w.getHTML(), F();
        },
        redo: () => {
          w.redo(), k.current = w.getHTML(), F();
        }
      };
      return N('RichTextEditor callback "onMount"', p, We), () => {
        N(
          'RichTextEditor callback "onUnmount"',
          m.current.onUnmount
        ), y.removeEventListener("pointerdown", D, !0), document.removeEventListener("pointerup", z, !0), document.removeEventListener("pointercancel", z, !0), g.current = void 0, x.current = void 0, w.destroy(), y.remove();
      };
    }, [t]), je(() => {
      if (!L.current)
        return;
      L.current = !1;
      const j = g.current;
      if (j == null)
        return;
      const y = j.getHTML();
      k.current !== y && (k.current = ta(
        j,
        x.current,
        f.current,
        k.current
      ));
    }), je(() => {
      const j = g.current, y = x.current;
      if (j == null || y == null)
        return;
      const w = r || i ? "false" : "true";
      y.getAttribute("contenteditable") !== w && j.modifyDocument(
        // otherwise, Squire's MutationObserver
        () => y.setAttribute("contenteditable", w)
      );
    }, [t, r, i]), b`<div
        class="jcl-component richtexteditor ${i ? "disabled" : ""} ${n}"
        data-placeholder="${a}"
        ...${e.RestProps} ref=${f}
      />`;
  });
}
const jp = /* @__PURE__ */ Z("jcl-component.richtexteditor", `
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
let jo, an, Gn, ts, ns, os, as, rs, is, ss, ls, cs, ds, us, ps, hs, fs, gs, ms, bs, pa;
const $p = so(
  () => Promise.all([
    rt("@codemirror/state"),
    rt("@codemirror/view"),
    rt("@codemirror/language"),
    rt("@codemirror/commands"),
    rt("@codemirror/lint")
  ]).then(([
    e,
    t,
    n,
    o,
    a
  ]) => {
    jo = e.EditorState, an = e.Compartment, Gn = t.EditorView, ts = t.keymap, ns = t.lineNumbers, os = t.drawSelection, as = t.highlightSpecialChars, rs = n.syntaxHighlighting, is = n.defaultHighlightStyle, ss = n.indentUnit, ls = n.syntaxTree, cs = n.ensureSyntaxTree, ds = o.defaultKeymap, us = o.historyKeymap, ps = o.indentWithTab, hs = o.history, fs = o.undo, gs = o.redo, ms = a.setDiagnostics, bs = a.lintGutter, pa = a.linter;
  })
), ys = /* @__PURE__ */ Object.create(null);
function Ip(e, t) {
  Xt("language name", e), Wt("language support loader", t), ys[e.toLowerCase()] = t;
}
const Gr = {
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
let Kr = !1;
function Dp() {
  Kr || (Kr = !0, Object.keys(Gr).forEach((e) => {
    const [t, n, o] = Gr[e];
    Ip(e, async () => (await rt(t))[n](
      ...o == null ? [] : [o]
    ));
  }));
}
function Ur(e, t, n) {
  const o = Math.max(1, Math.min(Math.round(t), e.lines)), a = e.line(o), r = Math.max(1, Math.min(Math.round(n), a.length + 1));
  return a.from + r - 1;
}
function qr(e, t) {
  return t.map((n) => {
    const { Line: o, Column: a, EndLine: r, EndColumn: i, Message: s, Severity: l } = n, c = Ur(e, o ?? 1, a ?? 1), d = r == null && i == null ? e.line(Math.max(1, Math.min(Math.round(o ?? 1), e.lines))).to : Ur(e, r ?? o ?? 1, i ?? (a ?? 1) + 1);
    return {
      from: c,
      to: Math.max(c, d),
      severity: ["error", "warning", "info"].includes(l) ? l : "error",
      message: String(s ?? "(no message)")
    };
  });
}
function Lp(e) {
  return _(() => {
    Sp();
    const t = Mn($p);
    e = G(e);
    const n = S(e.Class) ?? "";
    let o = ae(e.Value);
    const a = (S(e.Language) ?? "").toLowerCase(), r = Y(e.readonly) ?? !1, i = Y(e.disabled) ?? !1, s = qt(e.TabSize) ?? 2, l = Y(e.withLineNumbers) ?? !0, c = Y(e.withLineWrapping) ?? !1, d = Y(e.withSyntaxCheck) ?? !1, u = V(e.Errors, (M) => $e(M, De)) ?? [], p = A(e.Linter), h = qt(e.LintDelay) ?? 750, f = A(e.onValueChange), g = A(e.onSelectionChange), x = A(e.onMount), m = A(e.onUnmount), C = K(null), k = K(void 0), L = K({});
    L.current = { onValueChange: f, onSelectionChange: g, onUnmount: m, Linter: p };
    const j = K(o ?? ""), y = K(o ?? "");
    o != null && o !== j.current && (j.current = o, y.current = o);
    const w = K(void 0);
    je(() => {
      if (!t)
        return;
      w.current == null && (w.current = {
        Language: new an(),
        Readability: new an(),
        Indentation: new an(),
        LineNumbers: new an(),
        Wrapping: new an(),
        Linting: new an()
      });
      const M = w.current, $ = new Gn({
        parent: C.current,
        state: jo.create({
          doc: y.current,
          extensions: [
            as(),
            os(),
            hs(),
            rs(is, { fallback: !0 }),
            bs(),
            ts.of([...ds, ...us, ps]),
            M.LineNumbers.of([]),
            M.Language.of([]),
            M.Readability.of([]),
            M.Indentation.of([]),
            M.Wrapping.of([]),
            M.Linting.of([]),
            Gn.updateListener.of((T) => {
              if (T.docChanged) {
                const D = T.state.doc.toString();
                y.current = D, N(
                  'CodeEditor callback "onValueChange"',
                  L.current.onValueChange,
                  D
                );
              }
              if (T.selectionSet) {
                const { from: D, to: z } = T.state.selection.main;
                N(
                  'CodeEditor callback "onSelectionChange"',
                  L.current.onSelectionChange,
                  D,
                  z
                );
              }
            })
          ]
        })
      });
      return k.current = $, N('CodeEditor callback "onMount"', x, {
        View: $,
        // grants access to full CM API
        focus: () => $.focus(),
        getValue: () => $.state.doc.toString(),
        setValue: (T) => {
          Je("editor value", T), $.dispatch({
            changes: { from: 0, to: $.state.doc.length, insert: T }
          });
        },
        getSelection: () => {
          const { from: T, to: D } = $.state.selection.main;
          return { from: T, to: D, Text: $.state.sliceDoc(T, D) };
        },
        setSelection: (T, D = T) => {
          const z = $.state.doc.length, E = Math.max(0, Math.min(T, z)), X = Math.max(E, Math.min(D, z));
          $.dispatch({
            selection: { anchor: E, head: X },
            scrollIntoView: !0
          });
        },
        replaceSelection: (T) => {
          Je("replacement", T), $.dispatch($.state.replaceSelection(T));
        },
        undo: () => fs($),
        redo: () => gs($)
      }), () => {
        N(
          'CodeEditor callback "onUnmount"',
          L.current.onUnmount
        ), k.current = void 0, $.destroy();
      };
    }, [t]), je(() => {
      const M = k.current;
      if (M == null)
        return;
      const $ = M.state.doc.toString();
      y.current !== $ && M.dispatch({
        changes: { from: 0, to: $.length, insert: y.current }
      });
    }), je(() => {
      const M = k.current;
      if (M == null)
        return;
      const { Language: $ } = w.current;
      if (a === "" || a === "text") {
        M.dispatch({ effects: $.reconfigure([]) });
        return;
      }
      Dp();
      const I = ys[a];
      if (I == null) {
        console.warn("CodeEditor: unsupported language " + wt(a)), M.dispatch({ effects: $.reconfigure([]) });
        return;
      }
      let T = !1;
      return I().then((D) => {
        T || k.current !== M || M.dispatch({
          effects: $.reconfigure(D)
        });
      }).catch((D) => console.error(
        "CodeEditor: could not load support for language " + wt(a),
        D
      )), () => {
        T = !0;
      };
    }, [t, a]), je(() => {
      const M = k.current;
      M?.dispatch({
        effects: w.current.Readability.reconfigure([
          jo.readOnly.of(r || i),
          Gn.editable.of(!i)
        ])
      });
    }, [t, r, i]), je(() => {
      const M = k.current;
      if (M == null)
        return;
      const $ = Math.max(1, s);
      M.dispatch({
        effects: w.current.Indentation.reconfigure([
          jo.tabSize.of($),
          ss.of(" ".repeat($))
        ])
      });
    }, [t, s]), je(() => {
      const M = k.current;
      if (M == null)
        return;
      const $ = w.current;
      M.dispatch({ effects: [
        $.LineNumbers.reconfigure(
          l ? ns() : []
        ),
        $.Wrapping.reconfigure(
          c ? Gn.lineWrapping : []
        )
      ] });
    }, [t, l, c]), je(() => {
      const M = k.current;
      M == null || p != null || d || M.dispatch(
        ms(M.state, qr(M.state.doc, u))
      );
    }, [t, JSON.stringify(u), p != null, d]);
    const F = p != null;
    return je(() => {
      const M = k.current;
      if (M == null)
        return;
      const { Linting: $ } = w.current, I = async (D) => {
        try {
          const z = await L.current.Linter(
            D.state.doc.toString()
          );
          return qr(D.state.doc, z ?? []);
        } catch (z) {
          return console.error("CodeEditor: linting failed with", z), [];
        }
      }, T = (D) => {
        const z = D.state.doc.length, E = cs(D.state, z, 500) ?? ls(D.state), X = [];
        return E.iterate({
          enter: (Q) => {
            if (Q.type.isError) {
              const pe = Math.min(Q.from, Math.max(0, z - 1)), q = Math.min(Math.max(Q.to, Q.from + 1), z);
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
        case F:
          M.dispatch({ effects: $.reconfigure(
            pa(I, { delay: h })
          ) });
          break;
        case d:
          M.dispatch({ effects: $.reconfigure(
            pa(T, { delay: h })
          ) });
          break;
        default:
          M.dispatch({ effects: $.reconfigure([]) });
      }
    }, [t, F, d, h]), b`<div
        class="jcl-component codeeditor ${i ? "disabled" : ""} ${n}"
        ...${e.RestProps} ref=${C}
      />`;
  });
}
const Sp = /* @__PURE__ */ Z("jcl-component.codeeditor", `
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
  `), ha = "http://www.w3.org/2000/svg";
function Ne(e, t) {
  const n = document.createElementNS(ha, e);
  for (const o in t ?? {})
    n.setAttribute(o, String(t[o]));
  return n;
}
function ut(e) {
  const t = e.transform?.baseVal?.consolidate?.();
  return t == null ? new DOMMatrix() : DOMMatrix.fromMatrix(t.matrix);
}
function on(e, t) {
  const { a: n, b: o, c: a, d: r, e: i, f: s } = t;
  e.setAttribute("transform", `matrix(${n} ${o} ${a} ${r} ${i} ${s})`);
}
function Xr(e) {
  const t = Math.hypot(e.a, e.b) || 1, n = Math.hypot(e.c, e.d) || 1;
  return { ScaleX: t, ScaleY: n };
}
function Co(e) {
  const t = e.getBBox?.();
  return t == null ? void 0 : { x: t.x, y: t.y, Width: t.width, Height: t.height };
}
function Hn(e) {
  let t = 1 / 0, n = 1 / 0, o = -1 / 0, a = -1 / 0;
  if (e.forEach((r) => {
    const i = r.getBBox(), s = ut(r);
    [
      [i.x, i.y],
      [i.x + i.width, i.y],
      [i.x, i.y + i.height],
      [i.x + i.width, i.y + i.height]
    ].forEach(([l, c]) => {
      const d = new DOMPoint(l, c).matrixTransform(s);
      t = Math.min(t, d.x), o = Math.max(o, d.x), n = Math.min(n, d.y), a = Math.max(a, d.y);
    });
  }), !(t > o))
    return { x: t, y: n, Width: o - t, Height: a - n };
}
function fa(e, t) {
  return e.x <= t.x + t.Width && t.x <= e.x + e.Width && e.y <= t.y + t.Height && t.y <= e.y + e.Height;
}
function ga(e) {
  return {
    xEdges: [e.x, e.x + e.Width],
    xCenter: e.x + e.Width / 2,
    yEdges: [e.y, e.y + e.Height],
    yCenter: e.y + e.Height / 2
  };
}
function xs(e, t, n) {
  const o = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map(), r = (l, c) => Math.abs(l - c) <= n, i = (l, c, d) => {
    const u = Math.round(c / n) * n;
    (d === "dashed" || l.get(u) == null) && l.set(u, d);
  }, s = (l, c, d) => {
    e.forEach((u) => {
      t.forEach((p) => {
        u[c].forEach((h) => {
          p[c].forEach((f) => {
            r(h, f) && i(l, f, "dashed");
          }), r(h, p[d]) && i(l, p[d], "dotted");
        }), p[c].forEach((h) => {
          r(u[d], h) && i(l, h, "dotted");
        });
      });
    });
  };
  return s(o, "xEdges", "xCenter"), s(a, "yEdges", "yCenter"), { vertical: o, horizontal: a };
}
let Mp = 1;
function Mt(e, t, n) {
  return { x: e.x + (t.x - e.x) * n, y: e.y + (t.y - e.y) * n };
}
function na(e) {
  if (!/^\s*M[0-9\s.,eE+-]+(?:C[0-9\s.,eE+-]+)+Z?\s*$/.test(e))
    return;
  const t = /Z\s*$/.test(e), n = e.replace(/[MCZ]/g, " ").trim().split(/[\s,]+/).map(parseFloat);
  if (n.length < 8 || (n.length - 2) % 6 !== 0 || n.some((r) => isNaN(r)))
    return;
  const o = [{ x: n[0], y: n[1] }], a = [];
  for (let r = 2; r < n.length; r += 6)
    a.push({
      c1: { x: n[r], y: n[r + 1] },
      c2: { x: n[r + 2], y: n[r + 3] }
    }), o.push({ x: n[r + 4], y: n[r + 5] });
  if (t) {
    const r = o[0], i = o.at(-1);
    if (Math.abs(i.x - r.x) > 1e-3 || Math.abs(i.y - r.y) > 1e-3)
      return;
    o.pop();
  }
  return { Anchors: o, Controls: a, closed: t };
}
function Yr(e, t = !1) {
  const n = e.map((r) => ({ x: r.x, y: r.y })), o = [], a = t ? n.length : n.length - 1;
  for (let r = 0; r < a; r++) {
    const i = n[r], s = n[(r + 1) % n.length];
    o.push({
      c1: Mt(i, s, 1 / 3),
      c2: Mt(i, s, 2 / 3)
    });
  }
  return { Anchors: n, Controls: o, closed: t };
}
function rn(e) {
  const { Anchors: t, Controls: n, closed: o } = e;
  let a = `M ${t[0].x} ${t[0].y}`;
  return n.forEach((r, i) => {
    const s = t[(i + 1) % t.length];
    a += ` C ${r.c1.x} ${r.c1.y} ${r.c2.x} ${r.c2.y} ${s.x} ${s.y}`;
  }), a + (o ? " Z" : "");
}
function Jr(e, t, n, o) {
  const a = Mt(e, t, 0.5), r = Mt(t, n, 0.5), i = Mt(n, o, 0.5), s = Mt(a, r, 0.5), l = Mt(r, i, 0.5);
  return {
    Midpoint: Mt(s, l, 0.5),
    leftControls: { c1: a, c2: s },
    rightControls: { c1: l, c2: i }
  };
}
const Tp = /* @__PURE__ */ new Set([
  "script",
  "foreignObject",
  "iframe",
  "embed",
  "object",
  "audio",
  "video"
]);
function Zr(e) {
  return Array.from(e.querySelectorAll("*")).forEach((t) => {
    if (Tp.has(t.nodeName)) {
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
class Rp {
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
  GridPatternId = "jcl-de-pattern-" + Mp++;
  /**** constructor ****/
  constructor(t, n) {
    ws(), this.Container = t, this.Callbacks = n ?? {}, this.View = Ne("svg", {
      class: "jcl-de-view",
      tabindex: 0,
      viewBox: "0 0 800 600",
      preserveAspectRatio: "xMidYMid meet"
    }), this.GridLayer = Ne("g", { class: "jcl-de-grid" }), this.ContentLayer = Ne("g", { class: "jcl-de-content" }), this.OverlayLayer = Ne("g", { class: "jcl-de-overlay" }), this.View.append(this.GridLayer, this.ContentLayer, this.OverlayLayer), t.appendChild(this.View), this.installArrowMarker(), this.View.addEventListener("pointerdown", (o) => this.onPointerDown(o)), this.View.addEventListener("pointermove", (o) => this.onPointerMove(o)), this.View.addEventListener("pointerup", (o) => this.onPointerUp(o)), this.View.addEventListener("dblclick", (o) => this.onDoubleClick(o)), this.View.addEventListener("keydown", (o) => this.onKeyDown(o)), this.View.addEventListener(
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
    const { Width: t, Height: n } = this.Size, o = this.ContentLayer.innerHTML, a = this.View.querySelector("#jcl-de-arrow"), r = (
      // keeps exported documents self-contained
      o.includes("url(#jcl-de-arrow)") && a != null ? "<defs>" + a.outerHTML + "</defs>" : ""
    );
    return `<svg xmlns="${ha}" width="${t}" height="${n}" viewBox="0 0 ${t} ${n}">` + r + o + "</svg>";
  }
  /**** setValue - replaces the drawing without firing "onValueChange" ****/
  setValue(t) {
    Je("drawing value", t);
    let n;
    if (t.trim() !== "") {
      n = new DOMParser().parseFromString(t, "image/svg+xml").documentElement, n.nodeName !== "svg" && ce(
        "InvalidArgument: the given value is no valid SVG document"
      ), Zr(n);
      const a = parseFloat(n.getAttribute("width") ?? ""), r = parseFloat(n.getAttribute("height") ?? "");
      !isNaN(a) && !isNaN(r) && (this.Size = { Width: a, Height: r });
    }
    this.clearSelection(), this.PointSelection = void 0, this.cancelPolyline(), this.DragState = void 0, this.ContentLayer.innerHTML = "", n != null && (Array.from(n.children).forEach((o) => {
      this.ContentLayer.appendChild(document.importNode(o, !0));
    }), Array.from(
      // editor-owned markers come from the live...
      this.ContentLayer.querySelectorAll('marker[id^="jcl-de-"]')
    ).forEach((o) => {
      const a = o.parentNode;
      o.remove(), a?.nodeName === "defs" && a.children.length === 0 && a.remove();
    }), Array.from(this.ContentLayer.children).forEach(
      (o) => this.IdFor(o)
    )), this.ViewBox = { x: 0, y: 0, Width: this.Size.Width, Height: this.Size.Height }, this.applyViewBox(), this.Snapshots = [this.ContentLayer.innerHTML], this.SnapshotIndex = 0, this.announceUndoState(), this.refreshOverlay();
  }
  /**** announceChange - captures a snapshot and reports the new value ****/
  announceChange() {
    this.captureSnapshot(), N(
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
    this.SnapshotIndex = t, this.ContentLayer.innerHTML = this.Snapshots[t], this.PointSelection = void 0, this.selectIds(n), this.announceUndoState(), N(
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
    N(
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
    return Array.from(this.ContentLayer.children).reverse().find((a) => (a.matches?.(o) ? [a] : Array.from(a.querySelectorAll?.(o) ?? [])).some(
      (i) => this.hitsStrokeOf(i, t, n)
    ));
  }
  /**** hitsStrokeOf - tests a point against a temporarily widened stroke ****/
  hitsStrokeOf(t, n, o) {
    if (typeof t.isPointInStroke != "function")
      return !1;
    const a = this.View.getScreenCTM?.(), r = t.getScreenCTM?.();
    if (a == null || r == null)
      return !1;
    const i = a.inverse().multiply(r), s = new DOMPoint(n.x, n.y).matrixTransform(i.inverse()), l = this.View.createSVGPoint();
    l.x = s.x, l.y = s.y;
    const { ScaleX: c, ScaleY: d } = Xr(i), p = (parseFloat(getComputedStyle(t).strokeWidth) || 0) + 2 * o / Math.max(c, d), h = t.getAttribute("stroke-width");
    t.setAttribute("stroke-width", String(p));
    try {
      return t.isPointInStroke(l);
    } finally {
      h == null ? t.removeAttribute("stroke-width") : t.setAttribute("stroke-width", h);
    }
  }
  /**** selection primitives ****/
  isSelected(t) {
    return this.Selection.includes(t);
  }
  select(t, n = !1) {
    const o = n ? this.Selection.slice() : [];
    t.forEach((a) => {
      a != null && !o.includes(a) && o.push(a);
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
    this.refreshOverlay(), N(
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
    }, [a, r] = o[t], i = n.a * a + n.c * r, s = n.b * a + n.d * r;
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
    this.Selection.forEach((o, a) => {
      const r = Co(o);
      if (r == null)
        return;
      const i = ut(o), s = Ne("g", {});
      on(s, i), this.OverlayLayer.appendChild(s);
      const { ScaleX: l, ScaleY: c } = Xr(i), d = n / l, u = n / c, p = t / Math.max(l, c);
      s.appendChild(Ne("rect", {
        class: "jcl-de-frame",
        "stroke-width": p,
        x: r.x,
        y: r.y,
        width: r.Width,
        height: r.Height
      }));
      const h = r.x + r.Width / 2, f = this.HandlePositionsFor(r);
      for (const x in f) {
        const [m, C] = f[x];
        s.appendChild(Ne("rect", {
          class: "jcl-de-handle",
          "data-handle": x,
          "data-index": a,
          "stroke-width": p,
          style: "cursor:" + this.CursorForHandle(x, i),
          x: m - d / 2,
          y: C - u / 2,
          width: d,
          height: u
        }));
      }
      const g = r.y - 24 * t / c;
      s.appendChild(Ne("line", {
        class: "jcl-de-frame",
        "stroke-width": p,
        x1: h,
        y1: r.y,
        x2: h,
        y2: g
      })), s.appendChild(Ne("circle", {
        class: "jcl-de-handle",
        "data-handle": "rotate",
        "data-index": a,
        "stroke-width": p,
        cx: h,
        cy: g,
        r: d / 2
      }));
    });
  }
  /**** refreshGrid ****/
  refreshGrid() {
    if (this.GridLayer.innerHTML = "", !this.showsGrid)
      return;
    const t = this.GridSize, n = Ne("pattern", {
      id: this.GridPatternId,
      width: t,
      height: t,
      patternUnits: "userSpaceOnUse"
    });
    n.appendChild(Ne("path", {
      d: `M ${t} 0 L 0 0 0 ${t}`,
      fill: "none",
      stroke: "#00000022",
      "stroke-width": this.UnitsPerPixel()
    }));
    const o = Ne("defs");
    o.appendChild(n);
    const { x: a, y: r, Width: i, Height: s } = this.ViewBox;
    this.GridLayer.append(o, Ne("rect", {
      x: a,
      y: r,
      width: i,
      height: s,
      fill: `url(#${this.GridPatternId})`
    }));
  }
  /**** drawMoveGuides - alignment guides for moved (vs. unmoved) elements ****/
  /**** - the actual collection logic is shared (s. "Geometry Utilities")  ****/
  drawMoveGuides() {
    const t = this.UnitsPerPixel(), n = (h) => {
      const f = Hn([h]);
      return f == null ? void 0 : ga(f);
    }, o = this.Selection.map(n).filter((h) => h != null), a = Array.from(this.ContentLayer.children).filter((h) => !this.Selection.includes(h)).map(n).filter((h) => h != null);
    if (o.length === 0 || a.length === 0)
      return;
    const { vertical: r, horizontal: i } = xs(o, a, t), s = t, l = {
      dashed: `${6 * s} ${4 * s}`,
      dotted: `${s} ${3 * s}`
    }, { x: c, y: d, Width: u, Height: p } = this.ViewBox;
    r.forEach((h, f) => {
      this.OverlayLayer.appendChild(Ne("line", {
        class: "jcl-de-guide",
        "stroke-width": s,
        "stroke-dasharray": l[h],
        x1: f,
        y1: d,
        x2: f,
        y2: d + p
      }));
    }), i.forEach((h, f) => {
      this.OverlayLayer.appendChild(Ne("line", {
        class: "jcl-de-guide",
        "stroke-width": s,
        "stroke-dasharray": l[h],
        x1: c,
        y1: f,
        x2: c + u,
        y2: f
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
      (a) => this.isPointEditable(a)
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
    this.View.style.cursor = o[t], this.refreshOverlay(), N(
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
      const r = parseInt(n.target.dataset?.index ?? "", 10);
      o === "rotate" ? this.beginRotation(t, r) : this.beginResizing(t, o, r);
      return;
    }
    const a = this.ElementAt(n.target) ?? this.ElementNear(t);
    switch (!0) {
      case a == null:
        n.shiftKey || this.clearSelection(), this.beginRubberBand(t, n.shiftKey);
        break;
      case n.shiftKey:
        this.toggle(a);
        break;
      default:
        this.isSelected(a) || this.select([a]), this.readonly || this.beginMove(t);
    }
  }
  /**** rubber band selection ****/
  beginRubberBand(t, n) {
    const o = Ne("rect", {
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
    const { StartPoint: n, Band: o } = this.DragState, a = {
      x: Math.min(n.x, t.x),
      y: Math.min(n.y, t.y),
      Width: Math.abs(t.x - n.x),
      Height: Math.abs(t.y - n.y)
    };
    o.setAttribute("x", a.x), o.setAttribute("y", a.y), o.setAttribute("width", a.Width), o.setAttribute("height", a.Height), this.DragState.Box = a;
  }
  endRubberBand(t) {
    t.Band.remove();
    const n = t.Box;
    if (n == null || n.Width < 1 && n.Height < 1)
      return;
    const o = Array.from(this.ContentLayer.children).filter((a) => {
      const r = Hn([a]);
      return r != null && fa(n, r);
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
    let a;
    switch (this.Tool) {
      case "rect":
        a = Ne("rect", {
          x: o.x,
          y: o.y,
          width: 0,
          height: 0
        });
        break;
      case "ellipse":
        a = Ne("ellipse", {
          cx: o.x,
          cy: o.y,
          rx: 0,
          ry: 0
        });
        break;
      case "line":
        a = Ne("line", {
          x1: o.x,
          y1: o.y,
          x2: o.x,
          y2: o.y
        });
        break;
      case "freehand":
        a = Ne("path", { d: `M ${t.x} ${t.y}` });
        break;
      default:
        return;
    }
    this.applyStyleTo(a, this.CurrentStyle), (this.Tool === "line" || this.Tool === "freehand") && a.setAttribute("fill", "none"), this.ContentLayer.appendChild(a), this.DragState = {
      Type: "create",
      Tool: this.Tool,
      Element: a,
      StartPoint: o,
      PointList: [t]
    };
  }
  /**** continueCreation ****/
  continueCreation(t, n) {
    const { Tool: o, Element: a, StartPoint: r, PointList: i } = this.DragState, s = this.snapped(t);
    switch (o) {
      case "rect": {
        let l = Math.abs(s.x - r.x), c = Math.abs(s.y - r.y);
        n.shiftKey && (l = c = Math.max(l, c));
        const d = s.x < r.x ? r.x - l : r.x, u = s.y < r.y ? r.y - c : r.y;
        a.setAttribute("x", d), a.setAttribute("width", l), a.setAttribute("y", u), a.setAttribute("height", c);
        break;
      }
      case "ellipse": {
        let l = Math.abs(s.x - r.x) / 2, c = Math.abs(s.y - r.y) / 2;
        n.shiftKey && (l = c = Math.max(l, c));
        const d = r.x + (s.x < r.x ? -l : l), u = r.y + (s.y < r.y ? -c : c);
        a.setAttribute("cx", d), a.setAttribute("rx", l), a.setAttribute("cy", u), a.setAttribute("ry", c);
        break;
      }
      case "line": {
        if (n.shiftKey) {
          const l = s.x - r.x, c = s.y - r.y, d = Math.round(Math.atan2(c, l) / (Math.PI / 4)) * (Math.PI / 4), u = Math.hypot(l, c);
          s.x = r.x + u * Math.cos(d), s.y = r.y + u * Math.sin(d);
        }
        a.setAttribute("x2", s.x), a.setAttribute("y2", s.y);
        break;
      }
      case "freehand": {
        const l = i.at(-1);
        Math.hypot(t.x - l.x, t.y - l.y) >= 2 * this.UnitsPerPixel() && (i.push(t), a.setAttribute(
          "d",
          "M " + i.map((c) => `${c.x} ${c.y}`).join(" L ")
        ));
      }
    }
  }
  /**** endCreation ****/
  endCreation(t) {
    const { Element: n } = t, o = Hn([n]);
    if (o == null || o.Width < 1 && o.Height < 1) {
      n.remove();
      return;
    }
    this.IdFor(n), this.select([n]), this.announceChange();
  }
  /**** polyline/bezier construction (click-based rather than drag-based) ****/
  extendPolyline(t) {
    const n = this.snapped(t);
    this.PendingPolyline == null ? (this.PendingPoints = [n, n], this.PendingPolyline = Ne(
      this.Tool === "bezier" ? "path" : "polyline"
    ), this.applyStyleTo(this.PendingPolyline, this.CurrentStyle), this.PendingPolyline.setAttribute("fill", "none"), this.writePolylinePoints(), this.ContentLayer.appendChild(this.PendingPolyline)) : (this.PendingPoints.push(n), this.writePolylinePoints());
  }
  previewPolylineAt(t) {
    this.PendingPoints[this.PendingPoints.length - 1] = this.snapped(t), this.writePolylinePoints();
  }
  writePolylinePoints() {
    this.PendingPolyline.nodeName === "path" ? this.PendingPolyline.setAttribute(
      "d",
      rn(Yr(this.PendingPoints))
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
    let a = !1;
    for (
      ;
      // ...polyline (or bezier) into a loop
      n.length > 2 && Math.hypot(
        n.at(-1).x - n[0].x,
        n.at(-1).y - n[0].y
      ) <= o;
    )
      n.pop(), a = !0;
    if (n.length < 3 && (a = !1), n.length < 2)
      t.remove();
    else {
      let r = t;
      switch (!0) {
        case t.nodeName === "path":
          t.setAttribute(
            "d",
            rn(Yr(n, a))
          ), a && (t.removeAttribute("marker-start"), t.removeAttribute("marker-end"));
          break;
        case a: {
          r = Ne("polygon"), Array.from(t.attributes).forEach((i) => {
            i.name.startsWith("marker-") || r.setAttribute(i.name, i.value);
          }), r.setAttribute(
            "points",
            n.map((i) => `${i.x},${i.y}`).join(" ")
          ), t.replaceWith(r);
          break;
        }
        default:
          t.setAttribute(
            "points",
            n.map((i) => `${i.x},${i.y}`).join(" ")
          );
      }
      this.IdFor(r), this.select([r]), this.announceChange();
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
    Promise.resolve(n("")).then((a) => {
      a == null || String(a).trim() === "" || this.insertText(String(a), o.x, o.y);
    }).catch((a) => {
      console.warn("DrawingEditor: text request failed", a);
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
    Je("text content", t);
    const a = Ne("text", { x: n, y: o });
    a.textContent = t, this.applyStyleTo(a, this.CurrentStyle), a.setAttribute("fill", this.CurrentStyle.StrokeColor ?? "#000000"), a.setAttribute("stroke", "none"), this.ContentLayer.appendChild(a), this.IdFor(a), this.select([a]), this.announceChange();
  }
  /**** moving - always moves the whole selection ****/
  beginMove(t) {
    this.DragState = {
      Type: "move",
      StartPoint: t,
      modified: !1,
      BaseMatrices: new Map(this.Selection.map(
        (n) => [n, ut(n)]
      ))
    };
  }
  continueMove(t) {
    const { StartPoint: n, BaseMatrices: o } = this.DragState;
    let a = t.x - n.x, r = t.y - n.y;
    if (this.snapToGrid) {
      const i = this.GridSize;
      a = Math.round(a / i) * i, r = Math.round(r / i) * i;
    }
    this.Selection.forEach((i) => {
      on(
        i,
        new DOMMatrix().translate(a, r).multiply(o.get(i))
      );
    }), this.DragState.modified ||= a !== 0 || r !== 0, this.refreshOverlay(), this.drawMoveGuides();
  }
  moveSelectionBy(t, n) {
    this.readonly || this.Selection.length === 0 || (this.Selection.forEach((o) => {
      on(
        o,
        new DOMMatrix().translate(t, n).multiply(ut(o))
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
    const a = this.Selection[o] ?? this.Selection[0];
    if (a == null)
      return;
    const r = Co(a);
    if (r == null)
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
    }, s = this.HandlePositionsFor(r), [l, c] = s[n], [d, u] = s[i[n]], p = new Map(this.Selection.map((h) => {
      const f = Co(h);
      return [h, f == null ? [d, u] : this.HandlePositionsFor(f)[i[n]]];
    }));
    this.DragState = {
      Type: "resize",
      Handle: n,
      HandleX: l,
      HandleY: c,
      AnchorX: d,
      AnchorY: u,
      InverseReferenceMatrix: ut(a).inverse(),
      ElementAnchors: p,
      modified: !1,
      BaseMatrices: new Map(this.Selection.map(
        (h) => [h, ut(h)]
      ))
    };
  }
  continueResizing(t, n) {
    const {
      HandleX: o,
      HandleY: a,
      AnchorX: r,
      AnchorY: i,
      InverseReferenceMatrix: s,
      ElementAnchors: l,
      BaseMatrices: c
    } = this.DragState, d = this.snapped(t), u = new DOMPoint(d.x, d.y).matrixTransform(s);
    let p = o === r ? 1 : (u.x - r) / (o - r), h = a === i ? 1 : (u.y - i) / (a - i);
    if (n.shiftKey) {
      const f = o === r ? Math.abs(h) : a === i ? Math.abs(p) : Math.max(Math.abs(p), Math.abs(h));
      p = p < 0 ? -f : f, h = h < 0 ? -f : f;
    }
    Math.abs(p) < 0.01 && (p = p < 0 ? -0.01 : 0.01), Math.abs(h) < 0.01 && (h = h < 0 ? -0.01 : 0.01), this.Selection.forEach((f) => {
      const [g, x] = l.get(f), m = new DOMMatrix().translate(g, x).scale(p, h).translate(-g, -x);
      on(f, c.get(f).multiply(m));
    }), this.DragState.modified = !0, this.refreshOverlay();
  }
  /**** rotating - the dragged handle belongs to a single element, but the ****/
  /**** rotation is applied to every selected element around its own centre ****/
  beginRotation(t, n) {
    const o = this.Selection[n] ?? this.Selection[0];
    if (o == null)
      return;
    const a = (c) => {
      const d = Co(c);
      if (d == null)
        return;
      const u = new DOMPoint(d.x + d.Width / 2, d.y + d.Height / 2).matrixTransform(ut(c));
      return [u.x, u.y];
    }, r = a(o);
    if (r == null)
      return;
    const [i, s] = r, l = new Map(this.Selection.map((c) => [
      c,
      a(c) ?? [i, s]
    ]));
    this.DragState = {
      Type: "rotate",
      CenterX: i,
      CenterY: s,
      ElementCenters: l,
      modified: !1,
      StartAngle: Math.atan2(t.y - s, t.x - i),
      BaseMatrices: new Map(this.Selection.map(
        (c) => [c, ut(c)]
      ))
    };
  }
  continueRotation(t, n) {
    const {
      CenterX: o,
      CenterY: a,
      StartAngle: r,
      ElementCenters: i,
      BaseMatrices: s
    } = this.DragState;
    let c = (Math.atan2(t.y - a, t.x - o) - r) * 180 / Math.PI;
    (n.shiftKey || this.snapToGrid) && (c = Math.round(c / 15) * 15), this.Selection.forEach((d) => {
      const [u, p] = i.get(d), h = new DOMMatrix().translate(u, p).rotate(c).translate(-u, -p);
      on(d, h.multiply(s.get(d)));
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
        return /^\s*M[0-9\s.,eE+-]+(?:L[0-9\s.,eE+-]+)*Z?\s*$/.test(n) || na(n) != null;
      }
      default:
        return !1;
    }
  }
  /**** BezierModelOf - the bezier model of a path element (or undefined) ****/
  BezierModelOf(t) {
    return t?.nodeName === "path" ? na(t.getAttribute("d") ?? "") : void 0;
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
    const a = (t.nodeName === "path" ? (t.getAttribute("d") ?? "").replace(/[MLZ]/g, " ") : t.getAttribute("points") ?? "").trim().split(/[\s,]+/).map(parseFloat), r = [];
    for (let i = 0; i + 1 < a.length; i += 2)
      r.push({ x: a[i], y: a[i + 1] });
    return r;
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
          "M " + n.map((a) => `${a.x} ${a.y}`).join(" L ") + (o ? " Z" : "")
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
    const n = ut(t), o = this.UnitsPerPixel(), a = this.BezierModelOf(t), r = this.PointListOf(t), i = r.map(
      (d) => new DOMPoint(d.x, d.y).matrixTransform(n)
    ), s = t.nodeName === "polygon" || (a != null ? a.closed : /Z\s*$/.test(t.getAttribute("d") ?? "")), l = Hn([t]);
    l != null && this.OverlayLayer.appendChild(Ne("rect", {
      class: "jcl-de-frame",
      "stroke-width": o,
      x: l.x,
      y: l.y,
      width: l.Width,
      height: l.Height
    })), a?.Controls.forEach((d, u) => {
      const p = i[u], h = i[(u + 1) % i.length];
      [["c1", p], ["c2", h]].forEach(([f, g]) => {
        const x = new DOMPoint(d[f].x, d[f].y).matrixTransform(n);
        this.OverlayLayer.appendChild(Ne("line", {
          class: "jcl-de-frame",
          "stroke-width": o,
          x1: g.x,
          y1: g.y,
          x2: x.x,
          y2: x.y
        })), this.OverlayLayer.appendChild(Ne("circle", {
          class: "jcl-de-handle",
          "data-control-index": u,
          "data-control-part": f,
          "stroke-width": o,
          cx: x.x,
          cy: x.y,
          r: 3 * o,
          opacity: 0.8
        }));
      });
    });
    const c = t.nodeName === "line" ? 0 : a != null ? a.Controls.length : s ? i.length : i.length - 1;
    for (let d = 0; d < c; d++) {
      const u = i[d], p = i[(d + 1) % i.length];
      let h = { x: (u.x + p.x) / 2, y: (u.y + p.y) / 2 };
      if (a != null) {
        const { c1: f, c2: g } = a.Controls[d], x = Jr(
          r[d],
          f,
          g,
          r[(d + 1) % r.length]
        ).Midpoint;
        h = new DOMPoint(x.x, x.y).matrixTransform(n);
      }
      this.OverlayLayer.appendChild(Ne("rect", {
        class: "jcl-de-handle",
        "data-midpoint-index": d,
        "stroke-width": o,
        x: h.x - 3 * o,
        y: h.y - 3 * o,
        width: 6 * o,
        height: 6 * o,
        opacity: 0.7
      }));
    }
    i.forEach((d, u) => {
      this.OverlayLayer.appendChild(Ne("circle", {
        class: "jcl-de-handle",
        "data-point-index": u,
        "stroke-width": o,
        cx: d.x,
        cy: d.y,
        r: 4 * o
      }));
    });
  }
  /**** beginPointEditing - handles "pointerdown" for the "editPoints" tool ****/
  beginPointEditing(t, n) {
    const o = n.target.dataset ?? {};
    switch (!0) {
      case o.pointIndex != null: {
        const a = parseInt(o.pointIndex, 10);
        n.altKey ? this.removePointAt(a) : this.DragState = {
          Type: "editPoint",
          Kind: "anchor",
          Index: a,
          modified: !1
        };
        break;
      }
      case o.controlIndex != null: {
        const a = parseInt(o.controlIndex, 10);
        this.DragState = {
          Type: "editPoint",
          Kind: "control",
          Index: a,
          Part: o.controlPart,
          modified: !1
        };
        break;
      }
      case o.midpointIndex != null: {
        const a = parseInt(o.midpointIndex, 10);
        this.insertPointAfter(a, t), this.DragState = {
          Type: "editPoint",
          Kind: "anchor",
          Index: a + 1,
          modified: !0
        };
        break;
      }
      default: {
        const a = this.ElementAt(n.target) ?? this.ElementNear(t);
        this.PointSelection = a != null && this.isPointEditable(a) ? a : void 0, this.select(
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
    const o = new DOMPoint(t.x, t.y).matrixTransform(ut(n).inverse()), a = this.snapped({ x: o.x, y: o.y }), r = this.BezierModelOf(n);
    if (r == null) {
      const i = this.PointListOf(n);
      i[this.DragState.Index] = a, this.setPointListOf(n, i);
    } else
      this.dragBezierPointTo(n, r, a);
    this.DragState.modified = !0, this.refreshOverlay();
  }
  /**** dragBezierPointTo - anchors take their control points along ****/
  dragBezierPointTo(t, n, o) {
    const { Kind: a, Index: r, Part: i } = this.DragState;
    if (a === "control")
      n.Controls[r][i] = o;
    else {
      const s = n.Anchors[r], l = o.x - s.x, c = o.y - s.y;
      s.x = o.x, s.y = o.y;
      const d = n.Controls.length, u = r < d ? r : void 0, p = r > 0 ? r - 1 : n.closed ? d - 1 : void 0;
      u != null && (n.Controls[u].c1.x += l, n.Controls[u].c1.y += c), p != null && (n.Controls[p].c2.x += l, n.Controls[p].c2.y += c);
    }
    t.setAttribute("d", rn(n));
  }
  removePointAt(t) {
    const n = this.PointSelection, o = this.BezierModelOf(n);
    if (o != null) {
      this.removeBezierAnchorAt(n, o, t);
      return;
    }
    const a = this.PointListOf(n);
    a.length <= 2 || (a.splice(t, 1), this.setPointListOf(n, a), this.refreshOverlay(), this.announceChange());
  }
  /**** removeBezierAnchorAt - merges the two segments meeting at an anchor ****/
  removeBezierAnchorAt(t, n, o) {
    const { Anchors: a, Controls: r, closed: i } = n;
    if (!(a.length <= (i ? 3 : 2))) {
      switch (!0) {
        case i: {
          const s = (o + a.length - 1) % a.length;
          r[s] = { c1: r[s].c1, c2: r[o].c2 }, r.splice(o, 1), a.splice(o, 1);
          break;
        }
        case o === 0:
          a.shift(), r.shift();
          break;
        case o === a.length - 1:
          a.pop(), r.pop();
          break;
        default:
          r[o - 1] = { c1: r[o - 1].c1, c2: r[o].c2 }, r.splice(o, 1), a.splice(o, 1);
      }
      t.setAttribute("d", rn(n)), this.refreshOverlay(), this.announceChange();
    }
  }
  insertPointAfter(t, n) {
    const o = this.PointSelection, a = this.BezierModelOf(o);
    if (a != null) {
      const { Anchors: s, Controls: l } = a, c = Jr(
        s[t],
        l[t].c1,
        l[t].c2,
        s[(t + 1) % s.length]
      );
      l.splice(t, 1, c.leftControls, c.rightControls), s.splice(t + 1, 0, c.Midpoint), o.setAttribute("d", rn(a)), this.refreshOverlay();
      return;
    }
    const r = new DOMPoint(n.x, n.y).matrixTransform(ut(o).inverse()), i = this.PointListOf(o);
    i.splice(t + 1, 0, { x: r.x, y: r.y }), this.setPointListOf(o, i), this.refreshOverlay();
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
          const o = Ne(
            n.nodeName === "polyline" ? "polygon" : "polyline"
          );
          return Array.from(n.attributes).forEach((a) => {
            // closed shapes carry no arrowheads
            n.nodeName === "polyline" && a.name.startsWith("marker-") || o.setAttribute(a.name, a.value);
          }), n.replaceWith(o), this.PointSelection === n && (this.PointSelection = o), t = !0, o;
        }
        case "path": {
          const o = n.getAttribute("d") ?? "", a = na(o);
          switch (!0) {
            case a != null: {
              if (a.closed)
                a.Controls.pop(), a.closed = !1;
              else {
                const r = a.Anchors.at(-1);
                a.Controls.push({
                  c1: Mt(r, a.Anchors[0], 1 / 3),
                  c2: Mt(r, a.Anchors[0], 2 / 3)
                }), a.closed = !0, n.removeAttribute("marker-start"), n.removeAttribute("marker-end");
              }
              n.setAttribute("d", rn(a)), t = !0;
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
    const { x: t, y: n, Width: o, Height: a } = this.ViewBox;
    this.View.setAttribute("viewBox", `${t} ${n} ${o} ${a}`), this.refreshGrid(), this.refreshOverlay();
  }
  setViewBox(t) {
    const { x: n, y: o, Width: a, Height: r } = t ?? {};
    isFinite(n) && isFinite(o) && isFinite(a) && a > 0 && isFinite(r) && r > 0 || ce("InvalidArgument: invalid view box given"), this.ViewBox = { x: n, y: o, Width: a, Height: r }, this.applyViewBox();
  }
  /**** zooming ****/
  ZoomFactor() {
    return (this.Container.clientWidth || 1) / this.ViewBox.Width;
  }
  setZoom(t) {
    isFinite(t) && t > 0 || ce(
      "InvalidArgument: invalid zoom factor given"
    );
    const n = this.ViewBox.x + this.ViewBox.Width / 2, o = this.ViewBox.y + this.ViewBox.Height / 2, a = (this.Container.clientWidth || 1) / t, r = (this.Container.clientHeight || 1) / t;
    this.setViewBox({ x: n - a / 2, y: o - r / 2, Width: a, Height: r });
  }
  zoomBy(t, n) {
    const { x: o, y: a, Width: r, Height: i } = this.ViewBox, s = Math.max(
      this.Size.Width / 50,
      Math.min(r / t, this.Size.Width * 20)
    ), l = r / s, c = n ?? { x: o + r / 2, y: a + i / 2 };
    this.setViewBox({
      x: c.x - (c.x - o) / l,
      y: c.y - (c.y - a) / l,
      Width: s,
      Height: i / l
    });
  }
  zoomToFit() {
    const t = Hn(Array.from(this.ContentLayer.children)) ?? {
      x: 0,
      y: 0,
      Width: this.Size.Width,
      Height: this.Size.Height
    }, n = Math.max(t.Width, t.Height) * 0.05 || 10;
    let o = t.Width + 2 * n, a = t.Height + 2 * n;
    const r = (this.Container.clientWidth || 1) / (this.Container.clientHeight || 1);
    o / a > r ? a = o / r : o = a * r, this.setViewBox({
      x: t.x + t.Width / 2 - o / 2,
      y: t.y + t.Height / 2 - a / 2,
      Width: o,
      Height: a
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
    const { StartX: n, StartY: o, StartViewBox: a } = this.DragState, r = this.UnitsPerPixel();
    this.ViewBox = {
      ...this.ViewBox,
      x: a.x - (t.clientX - n) * r,
      y: a.y - (t.clientY - o) * r
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
    const n = t.ctrlKey || t.metaKey, o = t.key.length === 1 ? t.key.toLowerCase() : t.key, a = (t.shiftKey ? 10 : 1) * (this.snapToGrid ? this.GridSize : 1);
    let r = !0;
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
        this.moveSelectionBy(-a, 0);
        break;
      case o === "ArrowRight":
        this.moveSelectionBy(a, 0);
        break;
      case o === "ArrowUp":
        this.moveSelectionBy(0, -a);
        break;
      case o === "ArrowDown":
        this.moveSelectionBy(0, a);
        break;
      default:
        r = !1;
    }
    r && t.preventDefault();
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
      `<svg xmlns="${ha}">` + this.ClipboardContent + "</svg>",
      "image/svg+xml"
    );
    Zr(t.documentElement);
    const n = this.snapToGrid ? this.GridSize : 10, o = [];
    Array.from(t.documentElement.children).forEach((a) => {
      const r = document.importNode(a, !0);
      r.removeAttribute("id"), on(
        r,
        new DOMMatrix().translate(n, n).multiply(ut(r))
      ), this.ContentLayer.appendChild(r), this.IdFor(r), o.push(r);
    }), o.length !== 0 && (this.ClipboardContent = o.map((a) => a.outerHTML).join(""), this.select(o), this.announceChange());
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
    const t = Array.from(this.ContentLayer.children).filter((o) => this.isSelected(o)), n = Ne("g");
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
      const a = ut(o);
      Array.from(o.children).forEach((r) => {
        on(r, a.multiply(ut(r))), this.ContentLayer.insertBefore(r, o), this.IdFor(r), t.push(r);
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
    const n = {}, o = mt(t?.StrokeColor), a = Et(t?.StrokeWidth, 0, 100), r = S(t?.StrokeDashes), i = t?.FillColor === "none" ? "none" : mt(t?.FillColor), s = Et(t?.Opacity, 0, 1), l = Y(t?.StartArrow), c = Y(t?.EndArrow), d = S(t?.FontFamily), u = Et(t?.FontSize, 1, 1e3), p = be(t?.FontWeight, ["normal", "bold"]) ? t?.FontWeight : void 0, h = be(t?.FontStyle, ["normal", "italic"]) ? t?.FontStyle : void 0;
    o != null && (n.StrokeColor = o), a != null && (n.StrokeWidth = a), r != null && (n.StrokeDashes = r), i != null && (n.FillColor = i), s != null && (n.Opacity = s), l != null && (n.StartArrow = l), c != null && (n.EndArrow = c), d != null && (n.FontFamily = d), u != null && (n.FontSize = u), p != null && (n.FontWeight = p), h != null && (n.FontStyle = h), this.CurrentStyle = { ...this.CurrentStyle, ...n }, !this.readonly && this.Selection.length > 0 && (this.Selection.forEach(
      (f) => this.applyStyleTo(f, n)
    ), this.refreshOverlay(), this.announceChange());
  }
  /**** StyleOfElement - reads the style-relevant attributes of an element ****/
  StyleOfElement(t) {
    const n = {}, o = parseFloat(t.getAttribute("stroke-width") ?? "");
    isNaN(o) || (n.StrokeWidth = o);
    const a = t.getAttribute("stroke-dasharray");
    a != null && (n.StrokeDashes = a);
    const r = parseFloat(t.getAttribute("opacity") ?? "");
    if (isNaN(r) || (n.Opacity = r), t.nodeName === "text") {
      const d = t.getAttribute("fill");
      d != null && (n.StrokeColor = d);
    } else {
      const d = t.getAttribute("stroke");
      d != null && (n.StrokeColor = d);
      const u = t.getAttribute("fill");
      u != null && (n.FillColor = u);
    }
    ["line", "polyline", "path"].includes(t.nodeName) && (n.StartArrow = t.getAttribute("marker-start") != null, n.EndArrow = t.getAttribute("marker-end") != null);
    const i = t.getAttribute("font-family");
    i != null && (n.FontFamily = i);
    const s = parseFloat(t.getAttribute("font-size") ?? "");
    isNaN(s) || (n.FontSize = s);
    const l = t.getAttribute("font-weight");
    (l === "normal" || l === "bold") && (n.FontWeight = l);
    const c = t.getAttribute("font-style");
    return (c === "normal" || c === "italic") && (n.FontStyle = c), n;
  }
  /**** SelectionStyle - common style of the selection (null = indifferent) ****/
  SelectionStyle() {
    const t = {};
    return this.Selection.forEach((n) => {
      const o = this.StyleOfElement(n);
      for (const a in o)
        switch (!0) {
          case !(a in t):
            t[a] = o[a];
            break;
          case t[a] !== o[a]:
            t[a] = null;
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
    for (const a in n) {
      const r = n[a];
      r != null && o[a] != null && (r === "" ? t.removeAttribute(o[a]) : t.setAttribute(o[a], String(r)));
    }
    if (["line", "polyline", "path"].includes(t.nodeName)) {
      const a = {
        // arrowheads apply to open shapes only
        StartArrow: "marker-start",
        EndArrow: "marker-end"
      };
      for (const r in a)
        n[r] != null && (n[r] ? t.setAttribute(a[r], "url(#jcl-de-arrow)") : t.removeAttribute(a[r]));
    }
    t.nodeName === "text" && n.StrokeColor != null && (t.setAttribute("fill", String(n.StrokeColor)), t.setAttribute("stroke", "none"));
  }
  /**** installArrowMarker - a single marker serves all arrowheads ****/
  installArrowMarker() {
    if (this.View.querySelector("#jcl-de-arrow") != null)
      return;
    const t = Ne("marker", {
      id: "jcl-de-arrow",
      viewBox: "0 0 10 10",
      refX: 9,
      refY: 5,
      markerWidth: 7,
      markerHeight: 7,
      markerUnits: "strokeWidth",
      orient: "auto-start-reverse"
    });
    t.appendChild(Ne("path", {
      d: "M 0 0 L 10 5 L 0 10 Z",
      fill: "context-stroke",
      stroke: "none"
    }));
    const n = Ne("defs");
    n.appendChild(t), this.View.insertBefore(n, this.GridLayer);
  }
}
function Ap(e) {
  return _(() => {
    ws(), e = G(e);
    const t = S(e.Class) ?? "";
    let n = ae(e.Value);
    const o = Y(e.readonly) ?? !1, a = Y(e.disabled) ?? !1, r = qt(e.Width) ?? 800, i = qt(e.Height) ?? 600, s = Et(e.GridSize, 0.01, 1e3) ?? 10, l = Y(e.snapToGrid) ?? !1, c = Y(e.showGrid) ?? !1, d = A(e.onValueChange), u = A(e.onSelectionChange), p = A(e.onToolChange), h = A(e.onUndoStateChange), f = A(e.onTextRequest), g = A(e.onMount), x = A(e.onUnmount), m = K(null), C = K(void 0), k = K({});
    k.current = {
      onValueChange: d,
      onSelectionChange: u,
      onToolChange: p,
      onUndoStateChange: h,
      onTextRequest: f,
      onUnmount: x
    };
    const L = K(n ?? ""), j = K(n ?? "");
    return n != null && n !== L.current && (L.current = n, j.current = n), je(() => {
      const y = new Rp(m.current, {
        onValueChange: (F) => {
          j.current = F, k.current.onValueChange?.(F);
        },
        onSelectionChange: (F) => {
          k.current.onSelectionChange?.(F);
        },
        onToolChange: (F) => {
          k.current.onToolChange?.(F);
        },
        onUndoStateChange: (F, M) => {
          k.current.onUndoStateChange?.(F, M);
        },
        onTextRequest: (F) => k.current.onTextRequest?.(F)
      });
      return C.current = y, N('DrawingEditor callback "onMount"', g, {
        Editor: y,
        // grants access to the full internal API
        focus: () => y.View.focus(),
        getValue: () => y.getValue(),
        setValue: (F) => {
          y.setValue(F), j.current = F;
        },
        Tool: () => y.Tool,
        setTool: (F) => y.setTool(F),
        Style: () => y.getStyle(),
        setStyle: (F) => y.setStyle(F),
        SelectionStyle: () => y.SelectionStyle(),
        SelectedIds: () => y.SelectedIds(),
        select: (F) => y.selectIds(F),
        selectAll: () => y.selectAll(),
        deselectAll: () => y.clearSelection(),
        deleteSelection: () => y.deleteSelection(),
        toggleClosed: () => y.toggleClosed(),
        group: () => y.groupSelection(),
        ungroup: () => y.ungroupSelection(),
        bringToFront: () => y.bringToFront(),
        sendToBack: () => y.sendToBack(),
        raise: () => y.raiseSelection(),
        lower: () => y.lowerSelection(),
        copy: () => y.copySelection(),
        cut: () => y.cutSelection(),
        paste: () => y.pasteClipboard(),
        duplicate: () => y.duplicateSelection(),
        undo: () => y.undo(),
        canUndo: () => y.canUndo(),
        redo: () => y.redo(),
        canRedo: () => y.canRedo(),
        ViewBox: () => ({ ...y.ViewBox }),
        setViewBox: (F) => y.setViewBox(F),
        ZoomFactor: () => y.ZoomFactor(),
        setZoom: (F) => y.setZoom(F),
        zoomToFit: () => y.zoomToFit(),
        insertText: (F, M, $) => y.insertText(F, M, $)
      }), () => {
        N(
          'DrawingEditor callback "onUnmount"',
          k.current.onUnmount
        ), C.current = void 0, y.destroy();
      };
    }, []), je(() => {
      const y = C.current;
      y != null && (y.readonly = o, o && (y.cancelPolyline(), y.DragState = void 0));
    }, [o]), je(() => {
      const y = C.current;
      y != null && (y.Size = { Width: r, Height: i }, y.setViewBox({ x: 0, y: 0, Width: r, Height: i }));
    }, [r, i]), je(() => {
      const y = C.current;
      y != null && (y.GridSize = s, y.snapToGrid = l, y.showsGrid = c, y.refreshGrid());
    }, [s, l, c]), je(() => {
      const y = C.current;
      if (!(y == null || n == null) && y.getValue() !== j.current)
        try {
          y.setValue(j.current);
        } catch (w) {
          console.warn("DrawingEditor: invalid value given", w);
        }
    }, [n]), b`<div
        class="jcl-component drawingeditor ${a ? "disabled" : ""} ${t}"
        ...${e.RestProps} ref=${m}
      />`;
  });
}
const ws = /* @__PURE__ */ Z("jcl-component.drawingeditor", `
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
  `), Fp = [
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
class zp {
  /**** document and layer model ****/
  Width = 0;
  Height = 0;
  LayerList = [];
  activeLayerIndex = -1;
  CallbackSet = {};
  // patched from the outside, if need be
  #v = 0;
  /**** activeLayer ****/
  get activeLayer() {
    return this.LayerList[this.activeLayerIndex];
  }
  /**** initialiseDocument ****/
  initialiseDocument(t, n) {
    Yn("document width", t), Yn("document height", n), this.Width = t, this.Height = n, this.LayerList = [], this.activeLayerIndex = -1, this.newLayerNamed("Background"), this.requestRendering();
  }
  /**** newLayerNamed ****/
  newLayerNamed(t, n = this.LayerList.length) {
    Xt("layer name", t);
    const o = new OffscreenCanvas(this.Width, this.Height), a = o.getContext("2d");
    a == null && ce(
      "CanvasFailure: could not create a 2d rendering context"
    );
    const r = {
      Id: `layer-${++this.#v}`,
      Name: t,
      isVisible: !0,
      Opacity: 1,
      BlendMode: "source-over",
      Canvas: o,
      Context: a
    };
    return this.LayerList.splice(n, 0, r), this.activeLayerIndex = this.LayerList.indexOf(r), this.requestRendering(), r;
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
    const { isVisible: o, Opacity: a, BlendMode: r } = n;
    o != null && (t.isVisible = o == !0), a != null && (t.Opacity = Math.max(0, Math.min(a, 1))), r != null && (t.BlendMode = r), this.requestRendering();
  }
  /**** rendering and compositing ****/
  ViewCanvas = void 0;
  #d = void 0;
  #a = !1;
  /**** requestRendering - renders at most once per animation frame ****/
  requestRendering() {
    this.#a || this.ViewCanvas == null || (this.#a = !0, requestAnimationFrame(() => {
      this.#a = !1, this.render();
    }));
  }
  /**** render ****/
  render() {
    const t = this.ViewCanvas, n = this.#d;
    if (t == null || n == null)
      return;
    const o = window.devicePixelRatio ?? 1;
    n.setTransform(1, 0, 0, 1, 0, 0), n.clearRect(0, 0, t.width, t.height);
    const a = this.ZoomFactor * o;
    n.setTransform(
      a,
      0,
      0,
      a,
      -this.OffsetX * a,
      -this.OffsetY * a
    ), n.imageSmoothingEnabled = this.ZoomFactor < 1, this.LayerList.forEach((r) => {
      r.isVisible && (n.globalAlpha = r.Opacity, n.globalCompositeOperation = r.BlendMode, n.drawImage(r.Canvas, 0, 0));
    }), n.globalAlpha = 1, n.globalCompositeOperation = "source-over", this.renderOverlay(n);
  }
  /**** viewport handling ****/
  OffsetX = 0;
  // in document coordinates
  OffsetY = 0;
  ZoomFactor = 1;
  /**** attachTo - binds this editor to its (visible) view canvas ****/
  attachTo(t) {
    vs(), this.ViewCanvas = t, this.#d = t.getContext("2d") ?? void 0, this.#d == null && ce(
      "CanvasFailure: could not create a 2d rendering context"
    ), this.installInputHandlersOn(t), this.resizeViewCanvas();
  }
  /**** resizeViewCanvas - keeps the canvas backing store HiDPI-crisp ****/
  resizeViewCanvas() {
    const t = this.ViewCanvas;
    if (t == null)
      return;
    const n = window.devicePixelRatio ?? 1, { width: o, height: a } = t.getBoundingClientRect();
    t.width = Math.round(o * n), t.height = Math.round(a * n), this.requestRendering();
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
    const a = Math.max(0.05, Math.min(t, 32));
    if (n != null && o != null) {
      const r = this.DocumentPointFor(n, o);
      this.OffsetX = r.x - n / a, this.OffsetY = r.y - o / a;
    }
    this.ZoomFactor = a, this.reportViewportChange(), this.requestRendering();
  }
  /**** reportViewportChange ****/
  reportViewportChange() {
    N(
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
  #r = void 0;
  // per-stroke colour (FG or BG)
  #f = void 0;
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
      (o) => this.#j(o),
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
      (o) => this.#D(o),
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
    this.#r = // like MS Paint: the right button swaps the
    o ? this.backgroundColor : this.currentColor, this.#f = o ? this.currentColor : this.backgroundColor;
    const a = this.DocumentPointFor(t.offsetX, t.offsetY);
    switch (this.#n = a, this.currentTool) {
      case "brush":
      case "eraser":
        this.memoizeLayerForUndo(), this.beginStrokeAt(a, t.pressure);
        break;
      case "line":
      case "rectangle":
      case "ellipse":
      case "filledRectangle":
      case "filledEllipse":
        this.memoizeLayerForUndo(), this.beginShapeAt(a);
        break;
      case "text":
        this.enterTextAt(a, this.#r);
        break;
      // pointer handling need not wait
      case "fill":
        this.memoizeLayerForUndo(), this.fillAt(a, this.#r);
        break;
      case "eyeDropper":
        this.pickColorAt(a, o);
        break;
      case "select":
        this.#p(a);
        break;
    }
    t.preventDefault();
  }
  /**** #beginSelectionDragAt - moves a floating bitmap, lifts a selected ****/
  /**** region or starts a new selection frame (just like MS Paint)       ****/
  #p(t) {
    switch (!0) {
      case this.#k(t):
        this.#s = "floating";
        break;
      case this.FloatingBitmap != null:
        this.anchorFloatingBitmap(), this.beginSelectionAt(t), this.#s = "selection";
        break;
      case this.#C(t):
        this.liftSelection(), this.#s = "floating";
        break;
      default:
        this.beginSelectionAt(t), this.#s = "selection";
    }
  }
  #C(t) {
    const n = this.Selection;
    return n != null && t.x >= n.x && t.x < n.x + n.Width && t.y >= n.y && t.y < n.y + n.Height;
  }
  #k(t) {
    const n = this.FloatingBitmap;
    return n != null && t.x >= n.x && t.x < n.x + n.Canvas.width && t.y >= n.y && t.y < n.y + n.Canvas.height;
  }
  /**** #onPointerMove ****/
  #j(t) {
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
      this.#s = void 0, this.#r = void 0, this.#f = void 0, t.preventDefault();
    }
  }
  /**** #onWheel - zooms around the current pointer position ****/
  #D(t) {
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
    const o = this.activeLayer, a = this.#n;
    if (o == null || a == null)
      return;
    const r = Math.hypot(t.x - a.x, t.y - a.y), i = Math.max(this.BrushSize / 4, 1), s = Math.max(Math.ceil(r / i), 1);
    for (let l = 1; l <= s; l++)
      this.#m(o.Context, {
        x: a.x + (t.x - a.x) * l / s,
        y: a.y + (t.y - a.y) * l / s
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
    const a = this.#r ?? this.currentColor, r = this.currentTool === "eraser" || a === "transparent";
    t.save(), this.applySelectionClippingTo(t), t.globalAlpha = this.BrushOpacity, t.globalCompositeOperation = r ? "destination-out" : "source-over", t.fillStyle = r ? "#000000" : a, t.beginPath(), t.arc(n.x, n.y, this.BrushSize / 2 * (0.5 + o), 0, 2 * Math.PI), t.fill(), t.restore();
  }
  /**** reportValueChange ****/
  reportValueChange() {
    N(
      'BitmapEditor callback "onValueChange"',
      this.CallbackSet.onValueChange
    );
  }
  /**** shape tools - preview while dragging, committed upon release ****/
  #c = void 0;
  #h = void 0;
  beginShapeAt(t) {
    this.#c = t, this.#h = t, this.requestRendering();
  }
  continueShapeAt(t) {
    this.#c != null && (this.#h = t, this.requestRendering());
  }
  endShape() {
    const t = this.activeLayer;
    t == null || this.#c == null || (t.Context.save(), this.applySelectionClippingTo(t.Context), this.drawPendingShapeOn(t.Context), t.Context.restore(), this.#c = this.#h = void 0, this.requestRendering(), this.reportValueChange());
  }
  /**** drawPendingShapeOn - strokes with the per-stroke colour          ****/
  /**** (foreground or background, depending on the button), "filled"    ****/
  /**** variants fill with the respective other colour (like MS Paint) - ****/
  /**** "transparent" as a colour erases instead (previews on the view   ****/
  /**** canvas then punch a hole into the composite which reveals the    ****/
  /**** CSS background underneath, i.e. the expected outcome)            ****/
  drawPendingShapeOn(t) {
    const n = this.#c, o = this.#h;
    if (n == null || o == null)
      return;
    const a = this.#r ?? this.currentColor, r = this.#f ?? this.backgroundColor, i = this.currentTool === "filledRectangle" || this.currentTool === "filledEllipse";
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
    i && (t.globalCompositeOperation = r === "transparent" ? "destination-out" : "source-over", t.fillStyle = r === "transparent" ? "#000000" : r, t.fill()), t.globalCompositeOperation = a === "transparent" ? "destination-out" : "source-over", t.strokeStyle = a === "transparent" ? "#000000" : a, t.stroke(), t.restore();
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
    const o = this.activeLayer, a = this.CallbackSet.onTextRequest;
    if (!(o == null || a == null))
      try {
        const r = await a(this.lastText);
        if (r == null || r === "")
          return;
        if (this.lastText = r, n === "transparent") {
          this.#S(t, r);
          return;
        }
        this.floatBitmap(this.#L(r, n), t.x, t.y);
      } catch (r) {
        console.error("BitmapEditor: text entry failed", r);
      }
  }
  /**** #renderedText - renders a given text into a (floatable) bitmap ****/
  #L(t, n) {
    const o = t.split(`
`), a = this.FontSize * 1.2, i = new OffscreenCanvas(1, 1).getContext("2d");
    i.font = this.CSSFont;
    const s = Math.max(1, Math.ceil(Math.max(
      ...o.map((u) => i.measureText(u).width)
    )) + Math.ceil(this.FontSize * 0.2)), l = Math.max(1, Math.ceil(o.length * a)), c = new OffscreenCanvas(s, l), d = c.getContext("2d");
    return d.globalAlpha = this.BrushOpacity, d.fillStyle = n, d.font = this.CSSFont, d.textBaseline = "top", o.forEach((u, p) => {
      d.fillText(u, 0, p * a);
    }), c;
  }
  /**** #drawTextDirectlyAt - "erasing" text bypasses any floating and ****/
  /**** is drawn (i.e. erased) right away                              ****/
  #S(t, n) {
    const o = this.activeLayer;
    if (o == null)
      return;
    this.memoizeLayerForUndo();
    const a = o.Context;
    a.save(), this.applySelectionClippingTo(a), a.globalAlpha = this.BrushOpacity, a.globalCompositeOperation = "destination-out", a.fillStyle = "#000000", a.font = this.CSSFont, a.textBaseline = "top", n.split(`
`).forEach((r, i) => {
      a.fillText(r, t.x, t.y + i * this.FontSize * 1.2);
    }), a.restore(), this.requestRendering(), this.reportValueChange();
  }
  /**** fillAt - a simple 4-connected flood fill ****/
  // TODO: fill tolerance and anti-aliased edges are still missing <<<<
  fillAt(t, n = this.currentColor) {
    const o = this.activeLayer;
    if (o == null)
      return;
    const { Width: a, Height: r } = this, i = Math.floor(t.x), s = Math.floor(t.y);
    if (i < 0 || i >= a || s < 0 || s >= r)
      return;
    const l = o.Context.getImageData(0, 0, a, r), c = new Uint32Array(l.data.buffer), d = this.#M(n), u = c[s * a + i];
    if (u === d)
      return;
    const p = [s * a + i];
    for (; p.length > 0; ) {
      const h = p.pop();
      if (c[h] !== u)
        continue;
      c[h] = d;
      const f = h % a;
      f > 0 && p.push(h - 1), f < a - 1 && p.push(h + 1), h >= a && p.push(h - a), h < a * (r - 1) && p.push(h + a);
    }
    o.Context.putImageData(l, 0, 0), this.requestRendering(), this.reportValueChange();
  }
  /**** pickColorAt - picks from the composited document, optionally   ****/
  /**** for the background colour (i.e. after a right-click) - fully   ****/
  /**** transparent pixels are reported as "transparent", partially    ****/
  /**** transparent ones as "#RRGGBBAA" and opaque ones as "#RRGGBB"   ****/
  pickColorAt(t, n = !1) {
    const a = this.compositedCanvas().getContext("2d"), [r, i, s, l] = a.getImageData(
      Math.floor(t.x),
      Math.floor(t.y),
      1,
      1
    ).data, c = (u) => u.toString(16).padStart(2, "0");
    let d;
    switch (!0) {
      case l === 0:
        d = "transparent";
        break;
      case l === 255:
        d = `#${c(r)}${c(i)}${c(s)}`;
        break;
      default:
        d = `#${c(r)}${c(i)}${c(s)}${c(l)}`;
    }
    N(
      'BitmapEditor callback "onColorPicked"',
      this.CallbackSet.onColorPicked,
      d,
      n
    );
  }
  /**** #ABGRValueOf - converts a CSS colour into a little-endian pixel ****/
  #M(t) {
    const o = new OffscreenCanvas(1, 1).getContext("2d");
    o.fillStyle = t, o.fillRect(0, 0, 1, 1);
    const [a, r, i, s] = o.getImageData(0, 0, 1, 1).data;
    return (s << 24 | i << 16 | r << 8 | a) >>> 0;
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
    N(
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
    const n = Math.max(0, Math.round(t.x)), o = Math.max(0, Math.round(t.y)), a = Math.min(Math.round(t.Width), this.Width - n), r = Math.min(Math.round(t.Height), this.Height - o);
    return a > 0 && r > 0 ? { x: n, y: o, Width: a, Height: r } : void 0;
  }
  /**** #fillRegionOn - fills with the background colour (Paint-style), ****/
  /**** or clears the region if that colour is "transparent"            ****/
  #$(t, n) {
    this.backgroundColor === "transparent" ? t.clearRect(n.x, n.y, n.Width, n.Height) : (t.save(), t.fillStyle = this.backgroundColor, t.fillRect(n.x, n.y, n.Width, n.Height), t.restore());
  }
  /**** copySelection - copies from the active layer, not the composite ****/
  copySelection() {
    const t = this.activeLayer, n = this.#x();
    if (t == null || n == null)
      return;
    const { x: o, y: a, Width: r, Height: i } = n, s = new OffscreenCanvas(r, i);
    s.getContext("2d").drawImage(t.Canvas, o, a, r, i, 0, 0, r, i), this.#y = { Canvas: s, x: o, y: a };
  }
  /**** cutSelection / deleteSelection - both fill with the background ****/
  /**** colour, just like MS Paint                                     ****/
  cutSelection() {
    this.canCopy && (this.copySelection(), this.deleteSelection());
  }
  deleteSelection() {
    const t = this.activeLayer, n = this.#x();
    t == null || n == null || (this.memoizeLayerForUndo(), this.#$(t.Context, n), this.requestRendering(), this.reportValueChange());
  }
  /**** floatBitmap - makes a given bitmap "float" at a given position, ****/
  /**** from where it may be dragged around until it is finally         ****/
  /**** anchored (a click outside anchors it as well)                   ****/
  floatBitmap(t, n, o) {
    this.anchorFloatingBitmap(), this.#o = { Canvas: t, x: Math.round(n), y: Math.round(o) }, this.currentTool = "select", this.#w(), this.requestRendering();
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
    const { x: o, y: a, Width: r, Height: i } = n, s = new OffscreenCanvas(r, i);
    s.getContext("2d").drawImage(t.Canvas, o, a, r, i, 0, 0, r, i), this.memoizeLayerForUndo(), this.#$(t.Context, n), this.#o = { Canvas: s, x: o, y: a }, this.#w(), this.requestRendering(), this.reportValueChange();
  }
  /**** moveFloatingBitmapBy ****/
  moveFloatingBitmapBy(t, n) {
    const o = this.#o;
    o != null && (o.x += t, o.y += n, this.#w(), this.requestRendering());
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
  #w() {
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
    this.#T(this.#e, this.#l);
  }
  redo() {
    this.#T(this.#l, this.#e);
  }
  #T(t, n) {
    const o = t.pop();
    if (o == null)
      return;
    const { Layer: a, Snapshot: r } = o;
    n.push({
      Layer: a,
      Snapshot: a.Context.getImageData(0, 0, this.Width, this.Height)
    }), a.Context.putImageData(r, 0, 0), this.reportUndoStateChange(), this.requestRendering(), this.reportValueChange();
  }
  /**** reportUndoStateChange ****/
  reportUndoStateChange() {
    N(
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
  async #R(t) {
    return await new Promise((n, o) => {
      const a = new FileReader();
      a.onload = () => n(a.result), a.onerror = () => o(new Error("could not read the given blob")), a.readAsDataURL(t);
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
        Bitmap: await this.#R(
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
    if (it(n))
      try {
        n = JSON.parse(n);
      } catch {
        ce("InvalidArgument: the given document is no valid JSON");
      }
    (!De(n) || n.Format !== "jcl-bitmap-document@1" || !kn(n.Width) || !kn(n.Height) || !$e(n.Layers, De) || n.Layers.length === 0) && ce(
      "InvalidArgument: the given document is no valid bitmap document"
    );
    const o = await Promise.all(n.Layers.map(
      async (a) => {
        if (a.Bitmap != null)
          try {
            return await createImageBitmap(
              await (await fetch(a.Bitmap)).blob()
            );
          } catch (r) {
            ce(`ImportFailure: could not decode a layer bitmap (${r})`);
          }
      }
    ));
    this.Width = n.Width, this.Height = n.Height, this.LayerList = [], this.activeLayerIndex = -1, n.Layers.forEach((a, r) => {
      const i = this.newLayerNamed(
        Be(a.Name) ? a.Name : "Layer " + (r + 1)
      );
      this.configureLayer(i, a);
      const s = o[r];
      s != null && (i.Context.drawImage(s, 0, 0), s.close());
    }), this.activeLayerIndex = kn(n.activeLayerIndex) ? Math.min(n.activeLayerIndex, this.LayerList.length - 1) : this.LayerList.length - 1, this.#e.length = 0, this.#l.length = 0, this.reportUndoStateChange(), this.requestRendering();
  }
  /**** setValue - accepts a layer document or a plain image data URL ****/
  // a plain bitmap becomes a single-layer document of the bitmap's own size
  async setValue(t) {
    if (Je("bitmap editor value", t), t.trim().startsWith("{"))
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
    const { Type: n, Quality: o, BackgroundColor: a, Width: r, Height: i } = t ?? {};
    n != null && !be(n, ["png", "jpeg", "webp"]) && ce(
      "InvalidArgument: unsupported image type " + wt("" + n)
    );
    const s = n ?? "png", l = Et(o, 0, 1), c = (C) => {
      const k = ke(C);
      return k == null || k < 1 ? void 0 : k;
    }, d = c(r), u = c(i), p = d ?? (u == null ? this.Width : Math.max(1, Math.round(u * this.Width / this.Height))), h = u ?? (d == null ? this.Height : Math.max(1, Math.round(d * this.Height / this.Width)));
    let f = a;
    f == null && s === "jpeg" && (f = "#ffffff");
    const g = f != null && f !== "transparent" && f !== "none", x = new OffscreenCanvas(p, h), m = x.getContext("2d");
    return g && (m.fillStyle = mt(f) ?? "#ffffff", m.fillRect(0, 0, p, h)), m.imageSmoothingEnabled = !0, m.imageSmoothingQuality = "high", m.drawImage(
      this.compositedCanvas(),
      0,
      0,
      this.Width,
      this.Height,
      0,
      0,
      p,
      h
    ), await x.convertToBlob({
      type: "image/" + s,
      quality: l
    });
  }
}
function Op(e) {
  return _(() => {
    vs(), e = G(e);
    const t = S(e.Class) ?? "", n = ke(e.Width) ?? 800, o = ke(e.Height) ?? 600, a = ae(e.Value), r = S(e.Tool) ?? "brush", i = mt(e.Color) ?? "#000000", s = mt(e.BackgroundColor) ?? "#ffffff", l = Et(e.BrushSize, 1, 1e3) ?? 10, c = Et(e.BrushOpacity, 0, 1) ?? 1, d = S(e.FontFamily) ?? "sans-serif", u = Et(e.FontSize, 4, 400) ?? 24, p = be(e.FontWeight, ["normal", "bold"]) ? e.FontWeight : "normal", h = be(e.FontStyle, ["normal", "italic"]) ? e.FontStyle : "normal", f = Y(e.disabled) ?? !1, g = A(e.onValueChange), x = A(e.onSelectionChange), m = A(e.onUndoStateChange), C = A(e.onColorPicked), k = A(e.onViewportChange), L = A(e.onTextRequest), j = A(e.onMount), y = A(e.onUnmount), w = K(null), F = K(void 0), M = K({});
    return M.current = {
      onValueChange: g,
      onSelectionChange: x,
      onUndoStateChange: m,
      onColorPicked: C,
      onViewportChange: k,
      onTextRequest: L,
      onUnmount: y
    }, je(() => {
      const $ = w.current, I = document.createElement("canvas");
      $.appendChild(I);
      const T = new zp();
      T.CallbackSet = {
        onValueChange: (...E) => M.current.onValueChange?.(...E),
        onSelectionChange: (...E) => M.current.onSelectionChange?.(...E),
        onUndoStateChange: (...E) => M.current.onUndoStateChange?.(...E),
        onColorPicked: (...E) => M.current.onColorPicked?.(...E),
        onViewportChange: (...E) => M.current.onViewportChange?.(...E),
        onTextRequest: (...E) => (
          // returns the entered
          M.current.onTextRequest?.(...E)
        )
        // text!
      }, T.initialiseDocument(n, o), T.attachTo(I), a != null && T.setValue(a).catch((E) => console.warn(
        'BitmapEditor: could not apply the given "Value"',
        E
      )), F.current = T;
      const D = new ResizeObserver(() => T.resizeViewCanvas());
      return D.observe($), N('BitmapEditor callback "onMount"', j, {
        Editor: T,
        // grants access to the full engine
        undo: () => T.undo(),
        redo: () => T.redo(),
        newLayerNamed: (E) => T.newLayerNamed(E),
        importImage: (E) => T.importImage(E),
        exportedBlob: (E) => T.exportedBlob(E),
        getDocument: () => T.getDocument(),
        setDocument: (E) => T.setDocument(E),
        setValue: (E) => T.setValue(E),
        Snapshot: (E) => T.Snapshot(E),
        clearSelection: () => T.clearSelection(),
        cutSelection: () => T.cutSelection(),
        copySelection: () => T.copySelection(),
        pasteClipboard: () => T.pasteClipboard(),
        deleteSelection: () => T.deleteSelection(),
        anchorFloatingBitmap: () => T.anchorFloatingBitmap(),
        dropFloatingBitmap: () => T.dropFloatingBitmap(),
        zoomTo: (E) => T.zoomTo(E)
      }), () => {
        N(
          'BitmapEditor callback "onUnmount"',
          M.current.onUnmount
        ), D.disconnect(), F.current = void 0, T.destroy(), I.remove();
      };
    }, []), je(() => {
      const $ = F.current;
      $ != null && (Fp.includes(r) && ($.currentTool = r), $.currentColor = i, $.backgroundColor = s, $.BrushSize = l, $.BrushOpacity = c, $.FontFamily = d, $.FontSize = u, $.FontWeight = p, $.FontStyle = h);
    }, [
      r,
      i,
      s,
      l,
      c,
      d,
      u,
      p,
      h
    ]), b`<div
        class="jcl-component bitmapeditor ${f ? "disabled" : ""} ${t}"
        ...${e.RestProps} ref=${w}
      />`;
  });
}
const vs = /* @__PURE__ */ Z("jcl-component.bitmapeditor", `
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
  `), Vp = [
  "select",
  "rect",
  "ellipse",
  "polygon",
  "text",
  "image"
];
class pt {
  static #v = /* @__PURE__ */ new Map();
  static registerEffect(t) {
    pt.#v.set(t.Type, t);
  }
  static effectPluginFor(t) {
    return Ep(), pt.#v.get(t);
  }
  /**** object and scene model ****/
  Width = 800;
  Height = 600;
  ObjectList = [];
  #d = 0;
  Callbacks = {};
  /**** initialiseScene ****/
  initialiseScene(t, n) {
    Yn("scene width", t), Yn("scene height", n), this.Width = t, this.Height = n, this.ObjectList = [], this.SelectedIds = [], this.Snapshots = ["[]"], this.SnapshotIndex = 0, this.requestRendering();
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
    const a = o.Type === "image";
    Object.assign(o, n), o.Id = t, o.Type === "image" && (n.ImageData != null || !a) && (this.#t.delete(t), this.loadImageForObject(o)), this.announceChange(), this.requestRendering();
  }
  /**** canvas, overlay and rendering ****/
  Canvas;
  Context;
  #a;
  #u;
  Overlay;
  #t = /* @__PURE__ */ new Map();
  #n = !1;
  /**** attachTo ****/
  attachTo(t, n) {
    Cs(), this.Canvas = t, this.Context = t.getContext("2d"), this.Overlay = n, this.#a = new OffscreenCanvas(1, 1), this.#u = this.#a.getContext("2d"), t.addEventListener("pointerdown", this.#p), n.addEventListener("pointerdown", this.#p), t.addEventListener("pointermove", this.#C), t.addEventListener("pointerup", this.#k), t.addEventListener("dblclick", this.#j), window.addEventListener("keydown", this.#g), this.resizeViewCanvas();
  }
  /**** resizeViewCanvas ****/
  resizeViewCanvas() {
    const t = this.Canvas.parentElement;
    this.Canvas.width = t.clientWidth, this.Canvas.height = t.clientHeight, this.#a.width = this.Canvas.width, this.#a.height = this.Canvas.height, this.requestRendering();
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
    const { ox: a, oy: r, scale: i } = this.Viewport;
    t.translate(a, r), t.scale(i, i), t.fillStyle = "#ffffff", t.fillRect(0, 0, this.Width, this.Height), this.showsGrid && this.#s(t);
    for (const s of this.ObjectList)
      s.Opacity > 0 && this.#r(t, s);
    t.restore(), this.refreshOverlay();
  }
  /**** #renderObject ****/
  #r(t, n) {
    const o = n.GroupMembers;
    if (o != null) {
      for (const i of o)
        i.Opacity > 0 && this.#r(t, i);
      return;
    }
    t.save(), t.globalAlpha = n.Opacity, t.globalCompositeOperation = n.BlendMode;
    const a = n.X + n.Width / 2, r = n.Y + n.Height / 2;
    t.translate(a, r), t.rotate(n.Rotation * Math.PI / 180), t.translate(-a, -r);
    for (const i of n.Effects) {
      if (!i.enabled)
        continue;
      const s = pt.effectPluginFor(i.Type);
      s?.Phase === "before" && s.render(t, n, i, this.#a);
    }
    this.#f(t, n);
    for (const i of n.Effects) {
      if (!i.enabled)
        continue;
      const s = pt.effectPluginFor(i.Type);
      s != null && s.Phase !== "before" && s.render(t, n, i, this.#a);
    }
    t.restore();
  }
  /**** #renderObjectBase ****/
  #f(t, n) {
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
    Ot(t, n), n.FillColor !== "none" && (t.fillStyle = n.FillColor, t.fill()), n.StrokeWidth > 0 && (t.strokeStyle = n.StrokeColor, t.lineWidth = n.StrokeWidth, t.stroke());
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
    const { ox: o, oy: a, scale: r } = this.Viewport, i = (d, u) => ({ x: o + d * r, y: a + u * r }), s = (d) => o + d * r, l = (d) => a + d * r;
    if (this.DragState?.mode === "create") {
      const d = this.DragState, u = s(Math.min(d.startX, d.currentX)), p = l(Math.min(d.startY, d.currentY)), h = s(Math.max(d.startX, d.currentX)), f = l(Math.max(d.startY, d.currentY)), g = h - u, x = f - p;
      switch (d.tool) {
        case "rect": {
          const m = document.createElementNS(n, "rect");
          m.setAttribute("x", String(u)), m.setAttribute("y", String(p)), m.setAttribute("width", String(g)), m.setAttribute("height", String(x)), m.setAttribute("fill", "rgba(255,255,255,0.25)"), m.setAttribute("stroke", "#6366f1"), m.setAttribute("stroke-dasharray", "4 3"), t.appendChild(m);
          break;
        }
        case "ellipse": {
          const m = document.createElementNS(n, "ellipse");
          m.setAttribute("cx", String(u + g / 2)), m.setAttribute("cy", String(p + x / 2)), m.setAttribute("rx", String(g / 2)), m.setAttribute("ry", String(x / 2)), m.setAttribute("fill", "rgba(255,255,255,0.25)"), m.setAttribute("stroke", "#6366f1"), m.setAttribute("stroke-dasharray", "4 3"), t.appendChild(m);
          break;
        }
        case "polygon": {
          const m = d.polygonPoints;
          if (m.length > 0) {
            const C = m.map((y) => `${s(y.X)},${l(y.Y)}`).join(" "), k = document.createElementNS(n, "polyline");
            k.setAttribute("points", C), k.setAttribute("fill", "none"), k.setAttribute("stroke", "#6366f1"), k.setAttribute("stroke-dasharray", "4 3"), t.appendChild(k);
            const L = m[m.length - 1], j = document.createElementNS(n, "line");
            j.setAttribute("x1", String(s(L.X))), j.setAttribute("y1", String(l(L.Y))), j.setAttribute("x2", String(s(d.currentX))), j.setAttribute("y2", String(l(d.currentY))), j.setAttribute("stroke", "#6366f1"), j.setAttribute("stroke-dasharray", "4 3"), j.setAttribute("fill", "none"), t.appendChild(j);
          }
          break;
        }
      }
    }
    if (this.DragState?.mode === "rubberband" && this.DragState.endX != null) {
      const d = this.DragState, u = s(Math.min(d.startX, d.endX)), p = l(Math.min(d.startY, d.endY)), h = Math.abs(s(d.endX) - s(d.startX)), f = Math.abs(l(d.endY) - l(d.startY)), g = document.createElementNS(n, "rect");
      g.setAttribute("class", "jcl-rde-rubberband"), g.setAttribute("x", String(u)), g.setAttribute("y", String(p)), g.setAttribute("width", String(h)), g.setAttribute("height", String(f)), t.appendChild(g);
    }
    if (this.SelectedIds.length === 0)
      return;
    const c = (d, u, p, h, f) => {
      const g = f * Math.PI / 180, x = d - p, m = u - h;
      return {
        x: p + x * Math.cos(g) - m * Math.sin(g),
        y: h + x * Math.sin(g) + m * Math.cos(g)
      };
    };
    for (const d of this.SelectedIds) {
      const u = this.objectWithId(d);
      if (u == null)
        continue;
      const p = i(u.X, u.Y), h = u.Width * r, f = u.Height * r, g = p.x + h / 2, x = p.y + f / 2, m = u.Rotation, C = document.createElementNS(n, "rect");
      C.setAttribute("class", "jcl-rde-frame"), C.setAttribute("x", String(p.x)), C.setAttribute("y", String(p.y)), C.setAttribute("width", String(h)), C.setAttribute("height", String(f)), C.setAttribute("transform", `rotate(${m},${g},${x})`), t.appendChild(C);
      const k = [
        ["nw", p.x, p.y],
        ["n", g, p.y],
        ["ne", p.x + h, p.y],
        ["e", p.x + h, x],
        ["se", p.x + h, p.y + f],
        ["s", g, p.y + f],
        ["sw", p.x, p.y + f],
        ["w", p.x, x]
      ];
      for (const [F, M, $] of k) {
        const I = c(M, $, g, x, m), T = document.createElementNS(n, "rect");
        T.setAttribute("class", "jcl-rde-handle"), T.setAttribute("data-handle", F), T.setAttribute("data-id", d), T.setAttribute("x", String(I.x - 4)), T.setAttribute("y", String(I.y - 4)), T.setAttribute("width", "8"), T.setAttribute("height", "8"), T.setAttribute("transform", `rotate(${m},${I.x},${I.y})`), t.appendChild(T);
      }
      const L = c(g, p.y, g, x, m), j = c(g, p.y - 24, g, x, m), y = document.createElementNS(n, "line");
      y.setAttribute("x1", String(L.x)), y.setAttribute("y1", String(L.y)), y.setAttribute("x2", String(j.x)), y.setAttribute("y2", String(j.y)), y.setAttribute("stroke", "#6366f1"), y.setAttribute("stroke-dasharray", "3 2"), t.appendChild(y);
      const w = document.createElementNS(n, "circle");
      w.setAttribute("class", "jcl-rde-handle"), w.setAttribute("data-handle", "rotate"), w.setAttribute("data-id", d), w.setAttribute("cx", String(j.x)), w.setAttribute("cy", String(j.y)), w.setAttribute("r", "5"), t.appendChild(w);
    }
  }
  /**** viewport ****/
  Viewport = { ox: 0, oy: 0, scale: 1 };
  GridSize = 10;
  snapToGrid = !1;
  showsGrid = !1;
  /**** canvasToScene - converts a canvas-space point to scene space ****/
  canvasToScene(t, n) {
    const { ox: o, oy: a, scale: r } = this.Viewport;
    return { x: (t - o) / r, y: (n - a) / r };
  }
  /**** sceneToCanvas ****/
  sceneToCanvas(t, n) {
    const { ox: o, oy: a, scale: r } = this.Viewport;
    return { x: o + t * r, y: a + n * r };
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
    const { width: n, height: o } = this.Canvas, a = n / 2, r = o / 2, { ox: i, oy: s, scale: l } = this.Viewport, c = (a - i) / l, d = (r - s) / l;
    this.Viewport = {
      scale: Math.max(0.05, Math.min(t, 32)),
      ox: a - c * t,
      oy: r - d * t
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
    this.currentTool === "select" ? this.#D(n, t) : this.#S(n, t), this.DragState != null && this.Canvas.setPointerCapture(t.pointerId);
  };
  #C = (t) => {
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
        this.#$(n, t);
        break;
      case "create":
        this.#M(n);
        break;
      case "pan":
        this.#c(t);
        break;
      case "rubberband":
        this.#h(n);
        break;
    }
  };
  #k = (t) => {
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
        this.#L(n);
        break;
    }
    this.DragState = void 0, this.refreshOverlay();
  };
  #j = (t) => {
    if (this.readonly)
      return;
    const n = this.canvasToScene(this.#i(t).x, this.#i(t).y), o = this.#m(n);
    o != null && (o.Type === "text" ? this.#w(o) : this.DragState?.mode === "create" && this.DragState.tool === "polygon" && this.finishPolygon());
  };
  #g = (t) => {
    if (this.readonly)
      return;
    const n = t.shiftKey ? 10 : 1;
    if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(t.key)) {
      t.preventDefault();
      const o = t.key === "ArrowLeft" ? -n : t.key === "ArrowRight" ? n : 0, a = t.key === "ArrowUp" ? -n : t.key === "ArrowDown" ? n : 0;
      for (const r of this.SelectedIds) {
        const i = this.objectWithId(r);
        i && (i.X += o, i.Y += a);
      }
      this.announceChange(), this.requestRendering();
      return;
    }
    (t.key === "Delete" || t.key === "Backspace") && this.SelectedIds.length > 0 && (t.preventDefault(), this.deleteSelection()), (t.ctrlKey || t.metaKey) && (t.key === "z" && (t.preventDefault(), t.shiftKey ? this.redo() : this.undo()), t.key === "c" && (t.preventDefault(), this.copySelection()), t.key === "x" && (t.preventDefault(), this.cutSelection()), t.key === "v" && (t.preventDefault(), this.pasteClipboard()), t.key === "d" && (t.preventDefault(), this.duplicateSelection()), t.key === "a" && (t.preventDefault(), this.selectAll()));
  };
  /**** #handleSelectPointerDown ****/
  #D(t, n) {
    const o = n.target;
    if (o.dataset?.handle && o.dataset?.id) {
      const r = this.objectWithId(o.dataset.id);
      if (r) {
        if (this.SelectedIds.includes(r.Id) || this.selectIds(n.shiftKey ? [...this.SelectedIds, r.Id] : [r.Id]), o.dataset.handle === "rotate") {
          const i = r.X + r.Width / 2, s = r.Y + r.Height / 2;
          this.DragState = {
            mode: "rotate",
            centerX: i,
            centerY: s,
            startAngle: Math.atan2(t.y - s, t.x - i),
            origins: this.SelectedIds.map((l) => {
              const c = this.objectWithId(l);
              return { Id: l, Rotation: c.Rotation };
            })
          };
        } else
          this.DragState = {
            mode: "resize",
            handle: o.dataset.handle,
            startX: t.x,
            startY: t.y,
            refX: r.X,
            refY: r.Y,
            refW: r.Width,
            refH: r.Height,
            origins: this.SelectedIds.map((i) => {
              const s = this.objectWithId(i);
              return { Id: i, X: s.X, Y: s.Y, Width: s.Width, Height: s.Height };
            })
          };
        return;
      }
    }
    const a = this.#m(t);
    if (a != null) {
      if (n.shiftKey && this.SelectedIds.includes(a.Id)) {
        this.selectIds(this.SelectedIds.filter((r) => r !== a.Id));
        return;
      }
      this.SelectedIds.includes(a.Id) || this.selectIds(n.shiftKey ? [...this.SelectedIds, a.Id] : [a.Id]), this.DragState = {
        mode: "move",
        startX: t.x,
        startY: t.y,
        origins: this.SelectedIds.map((r) => {
          const i = this.objectWithId(r);
          return { Id: r, X: i.X, Y: i.Y };
        })
      };
    } else
      n.shiftKey || this.clearSelection(), this.DragState = { mode: "rubberband", startX: t.x, startY: t.y };
  }
  /**** #hitTest ****/
  #m(t) {
    for (let n = this.ObjectList.length - 1; n >= 0; n--) {
      const o = this.ObjectList[n], a = t.x - (o.X + o.Width / 2), r = t.y - (o.Y + o.Height / 2), i = -o.Rotation * Math.PI / 180, s = a * Math.cos(i) - r * Math.sin(i) + o.Width / 2, l = a * Math.sin(i) + r * Math.cos(i) + o.Height / 2;
      if (s >= 0 && s <= o.Width && l >= 0 && l <= o.Height)
        return o;
    }
  }
  /**** pan drag ****/
  #c(t) {
    this.pan(t.movementX, t.movementY);
  }
  /**** rubberband ****/
  #h(t) {
    this.DragState.endX = t.x, this.DragState.endY = t.y, this.refreshOverlay();
  }
  #L(t) {
    const { startX: n, startY: o } = this.DragState, a = Math.min(n, t.x), r = Math.min(o, t.y), i = Math.max(n, t.x), s = Math.max(o, t.y), l = this.ObjectList.filter((c) => c.X + c.Width > a && c.X < i && c.Y + c.Height > r && c.Y < s).map((c) => c.Id);
    this.selectIds(l);
  }
  /**** object creation tools ****/
  setTool(t) {
    this.currentTool = t, this.DragState = void 0, N(
      'RealDrawEditor callback "onToolChange"',
      this.Callbacks.onToolChange,
      t
    );
  }
  /**** #handleCreatePointerDown ****/
  #S(t, n) {
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
  #M(t) {
    const n = this.DragState, o = this.snapped(t.x, t.y);
    n.currentX = o.x, n.currentY = o.y, this.refreshOverlay();
  }
  /**** #handleCreatePointerUp ****/
  #b(t) {
    const n = this.DragState, o = this.snapped(t.x, t.y), a = Math.min(n.startX, o.x), r = Math.min(n.startY, o.y), i = Math.abs(o.x - n.startX), s = Math.abs(o.y - n.startY);
    if (n.tool === "polygon") {
      n.polygonPoints.push({ X: o.x, Y: o.y });
      return;
    }
    const l = 4;
    if (i < l && s < l && n.tool !== "text")
      return;
    let c;
    switch (n.tool) {
      case "rect":
        c = this.addObject({ Type: "rect", X: a, Y: r, Width: i || l, Height: s || l });
        break;
      case "ellipse":
        c = this.addObject({ Type: "ellipse", X: a, Y: r, Width: i || l, Height: s || l });
        break;
      case "text":
        this.#y(o.x, o.y);
        return;
    }
    c && this.selectIds([c.Id]);
  }
  /**** #requestTextAndCreate ****/
  async #y(t, n) {
    const a = await (this.Callbacks.onTextRequest ?? ((i) => window.prompt("Text:", i)))("");
    if (!a)
      return;
    const r = this.addObject({ Type: "text", X: t, Y: n, Text: a });
    this.selectIds([r.Id]), this.announceChange();
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
    const n = t.map((c) => c.X), o = t.map((c) => c.Y), a = Math.min(...n), r = Math.min(...o), i = Math.max(...n) - a, s = Math.max(...o) - r, l = this.addObject({ Type: "polygon", X: a, Y: r, Width: i || 1, Height: s || 1, Points: t });
    this.DragState = void 0, this.selectIds([l.Id]);
  }
  /**** move ****/
  #o(t) {
    const n = this.DragState, o = t.x - n.startX, a = t.y - n.startY;
    for (const { Id: r, X: i, Y: s } of n.origins) {
      const l = this.objectWithId(r);
      if (l == null)
        continue;
      const c = this.snapped(i + o, s + a);
      l.X = c.x, l.Y = c.y;
    }
    this.requestRendering();
  }
  /**** resize ****/
  #x(t) {
    const n = this.DragState, o = t.x - n.startX, a = t.y - n.startY;
    let { refX: r, refY: i, refW: s, refH: l } = n;
    switch (n.handle) {
      case "nw":
        r += o, i += a, s -= o, l -= a;
        break;
      case "n":
        i += a, l -= a;
        break;
      case "ne":
        i += a, s += o, l -= a;
        break;
      case "e":
        s += o;
        break;
      case "se":
        s += o, l += a;
        break;
      case "s":
        l += a;
        break;
      case "sw":
        r += o, s -= o, l += a;
        break;
      case "w":
        r += o, s -= o;
        break;
    }
    if ((n.handle === "nw" || n.handle === "ne" || n.handle === "se" || n.handle === "sw") && n.refW > 0 && n.refH > 0) {
      const g = n.refW / n.refH;
      Math.abs(s - n.refW) >= Math.abs(l - n.refH) * g ? (l = s / g, n.handle.includes("n") && (i = n.refY + n.refH - l)) : (s = l * g, n.handle.includes("w") && (r = n.refX + n.refW - s));
    }
    const d = 4;
    s < d && (s = d, n.handle.includes("w") && (r = n.refX + n.refW - d)), l < d && (l = d, n.handle.includes("n") && (i = n.refY + n.refH - d));
    const u = r - n.refX, p = i - n.refY, h = s - n.refW, f = l - n.refH;
    for (const g of n.origins) {
      const x = this.objectWithId(g.Id);
      if (x == null)
        continue;
      const m = this.snapped(g.X + u, g.Y + p);
      x.X = m.x, x.Y = m.y, x.Width = Math.max(d, g.Width + h), x.Height = Math.max(d, g.Height + f);
    }
    this.requestRendering();
  }
  /**** rotate ****/
  #$(t, n) {
    const o = this.DragState;
    let r = (Math.atan2(t.y - o.centerY, t.x - o.centerX) - o.startAngle) * 180 / Math.PI;
    (n.shiftKey || this.snapToGrid) && (r = Math.round(r / 15) * 15);
    for (const { Id: i, Rotation: s } of o.origins) {
      const l = this.objectWithId(i);
      l && (l.Rotation = ((s + r) % 360 + 360) % 360);
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
    this.SelectedIds = t.filter((n) => this.objectWithId(n) != null), N(
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
    const a = this.addObject({ Type: "text", X: n, Y: o, Text: t });
    return this.selectIds([a.Id]), a;
  }
  /**** #requestTextEdit - opens dialog for an existing text object ****/
  async #w(t) {
    const o = await (this.Callbacks.onTextRequest ?? ((a) => window.prompt("Text:", a)))(t.Text ?? "");
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
    const t = this.SelectedIds.map((p) => this.objectWithId(p)).filter((p) => p != null), n = t.map((p) => p.X), o = t.map((p) => p.Y), a = t.map((p) => p.X + p.Width), r = t.map((p) => p.Y + p.Height), i = Math.min(...n), s = Math.min(...o), l = Math.max(...a) - i, c = Math.max(...r) - s, d = t.map((p) => ({
      ...p,
      Effects: p.Effects.map((h) => ({ ...h })),
      ...p.Points ? { Points: p.Points.map((h) => ({ ...h })) } : {}
    })), u = this.addObject({
      Type: "rect",
      X: i,
      Y: s,
      Width: l,
      Height: c,
      FillColor: "none",
      StrokeColor: "none",
      StrokeWidth: 0
    });
    u.GroupMembers = d;
    for (const p of this.SelectedIds)
      this.removeObject(p);
    this.selectIds([u.Id]), this.announceChange();
  }
  ungroupSelection() {
    const t = [];
    for (const n of this.SelectedIds) {
      const o = this.objectWithId(n);
      if (!o?.GroupMembers) {
        t.push(n);
        continue;
      }
      for (const a of o.GroupMembers) {
        const r = this.addObject(a);
        t.push(r.Id);
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
    N(
      'RealDrawEditor callback "onUndoStateChange"',
      this.Callbacks.onUndoStateChange,
      this.canUndo(),
      this.canRedo()
    );
  }
  /**** announceChange ****/
  announceChange() {
    this.captureSnapshot(), N(
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
      const a = parseInt(o.Id.replace(/^obj-/, ""), 10);
      return isNaN(a) ? n : Math.max(n, a);
    }, 0), this.SelectedIds = this.SelectedIds.filter((n) => this.objectWithId(n) != null), this.#t.clear();
    for (const n of this.ObjectList)
      n.Type === "image" && this.loadImageForObject(n);
    this.requestRendering();
  }
  /**** setValue - replaces the scene without firing "onValueChange" ****/
  setValue(t) {
    Je("scene value", t);
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
    t instanceof Blob ? n = await new Promise((a) => {
      const r = new FileReader();
      r.onload = () => a(r.result), r.readAsDataURL(t);
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
    const a = this.Viewport;
    this.Viewport = { ox: 0, oy: 0, scale: 1 };
    for (const r of this.ObjectList)
      r.Opacity > 0 && this.#r(o, r);
    return this.Viewport = a, n.convertToBlob({ type: t });
  }
  destroy() {
    this.Canvas?.removeEventListener("pointerdown", this.#p), this.Overlay?.removeEventListener("pointerdown", this.#p), this.Canvas?.removeEventListener("pointermove", this.#C), this.Canvas?.removeEventListener("pointerup", this.#k), this.Canvas?.removeEventListener("dblclick", this.#j), window.removeEventListener("keydown", this.#g);
  }
}
function Ot(e, t) {
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
let Qr = !1;
function Ep() {
  Qr || (Qr = !0, pt.registerEffect({
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
      const o = (n.Angle ?? 135) * Math.PI / 180, a = n.Distance ?? 5;
      e.save(), e.shadowColor = n.Color ?? "rgba(0,0,0,0.5)", e.shadowBlur = n.Blur ?? 5, e.shadowOffsetX = Math.cos(o) * a, e.shadowOffsetY = Math.sin(o) * a, Ot(e, t), e.fillStyle = "#000", e.fill(), e.restore();
    }
  }), pt.registerEffect({
    Type: "OuterGlow",
    Label: "Outer Glow",
    Phase: "before",
    Parameters: [
      { Name: "Color", Type: "color", Label: "Farbe", Default: "rgba(255,255,0,0.8)" },
      { Name: "Blur", Type: "number", Label: "Weichheit", Default: 10, Min: 0, Max: 100 },
      { Name: "Spread", Type: "number", Label: "Ausdehnung", Default: 0, Min: 0, Max: 50 }
    ],
    render(e, t, n) {
      e.save(), e.shadowColor = n.Color ?? "rgba(255,255,0,0.8)", e.shadowBlur = n.Blur ?? 10, e.shadowOffsetX = 0, e.shadowOffsetY = 0, Ot(e, t), e.fillStyle = n.Color ?? "rgba(255,255,0,0.8)", e.fill(), e.restore();
    }
  }), pt.registerEffect({
    Type: "ColorOverlay",
    Label: "Color Overlay",
    Phase: "overlay",
    Parameters: [
      { Name: "Color", Type: "color", Label: "Farbe", Default: "#ff0000" },
      { Name: "Opacity", Type: "number", Label: "Deckkraft", Default: 1, Min: 0, Max: 1 }
    ],
    render(e, t, n) {
      e.save(), e.globalCompositeOperation = "source-atop", e.globalAlpha = n.Opacity ?? 1, Ot(e, t), e.fillStyle = n.Color ?? "#ff0000", e.fill(), e.restore();
    }
  }), pt.registerEffect({
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
      const o = (n.GradientAngle ?? 0) * Math.PI / 180, a = t.X + t.Width / 2, r = t.Y + t.Height / 2, i = Math.sqrt(t.Width ** 2 + t.Height ** 2) / 2, s = e.createLinearGradient(
        a - Math.cos(o) * i,
        r - Math.sin(o) * i,
        a + Math.cos(o) * i,
        r + Math.sin(o) * i
      );
      s.addColorStop(0, n.StartColor ?? "#ff0000"), s.addColorStop(1, n.EndColor ?? "#0000ff"), e.save(), e.globalCompositeOperation = "source-atop", e.globalAlpha = n.Opacity ?? 1, Ot(e, t), e.fillStyle = s, e.fill(), e.restore();
    }
  }), pt.registerEffect({
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
      const o = n.Width ?? 2, a = n.Position ?? "outside";
      e.save(), a !== "center" && (e.globalCompositeOperation = a === "outside" ? "destination-over" : "source-atop"), Ot(e, t), e.strokeStyle = n.Color ?? "#000000", e.lineWidth = a === "center" ? o : o * 2, e.stroke(), e.restore();
    }
  }), pt.registerEffect({
    Type: "InnerGlow",
    Label: "Inner Glow",
    Phase: "after",
    Parameters: [
      { Name: "Color", Type: "color", Label: "Farbe", Default: "rgba(255,255,255,0.8)" },
      { Name: "Blur", Type: "number", Label: "Weichheit", Default: 8, Min: 0, Max: 100 },
      { Name: "Spread", Type: "number", Label: "Ausdehnung", Default: 0, Min: 0, Max: 50 }
    ],
    render(e, t, n, o) {
      const a = o.getContext("2d");
      a.clearRect(0, 0, o.width, o.height), a.save(), a.shadowColor = n.Color ?? "rgba(255,255,255,0.8)", a.shadowBlur = n.Blur ?? 8, a.shadowOffsetX = 0, a.shadowOffsetY = 0, Ot(a, t), a.fillStyle = n.Color ?? "rgba(255,255,255,0.8)", a.fill(), a.restore(), e.save(), e.globalCompositeOperation = "source-atop", e.drawImage(o, 0, 0), e.restore();
    }
  }), pt.registerEffect({
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
      const a = (n.Angle ?? 135) * Math.PI / 180, r = n.Distance ?? 5, i = o.getContext("2d");
      i.clearRect(0, 0, o.width, o.height), Ot(i, t), i.fill(), i.save(), i.globalCompositeOperation = "source-out", i.shadowColor = n.Color ?? "rgba(0,0,0,0.5)", i.shadowBlur = n.Blur ?? 5, i.shadowOffsetX = Math.cos(a) * r, i.shadowOffsetY = Math.sin(a) * r, Ot(i, t), i.fill(), i.restore(), e.save(), e.globalCompositeOperation = "source-atop", e.drawImage(o, 0, 0), e.restore();
    }
  }));
}
function Np(e) {
  return _(() => {
    Cs(), e = G(e);
    const t = S(e.Class) ?? "";
    let n = ae(e.Value);
    const o = ke(e.Width) ?? 800, a = ke(e.Height) ?? 600, r = Y(e.readonly) ?? !1, i = Y(e.disabled) ?? !1, s = S(e.Tool) ?? "select", l = Et(e.GridSize, 0.01, 1e3) ?? 10, c = Y(e.snapToGrid) ?? !1, d = Y(e.showGrid) ?? !1, u = Array.isArray(e.extraEffects) ? e.extraEffects : [], p = A(e.onValueChange), h = A(e.onSelectionChange), f = A(e.onToolChange), g = A(e.onUndoStateChange), x = A(e.onTextRequest), m = A(e.onMount), C = A(e.onUnmount), k = K(null), L = K(void 0), j = K({});
    j.current = {
      onValueChange: p,
      onSelectionChange: h,
      onToolChange: f,
      onUndoStateChange: g,
      onTextRequest: x,
      onUnmount: C
    };
    const y = K(n ?? ""), w = K(n ?? "");
    return n != null && n !== y.current && (y.current = n, w.current = n), je(() => {
      const F = k.current, M = document.createElement("canvas");
      F.appendChild(M);
      const $ = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      $.setAttribute("class", "jcl-rde-overlay"), F.appendChild($), u.forEach((z) => pt.registerEffect(z));
      const I = new pt();
      if (I.Callbacks = {
        ...Dg(j, [
          // s. "auxiliary functions"
          "onSelectionChange",
          "onToolChange",
          "onUndoStateChange",
          "onTextRequest"
        ]),
        onValueChange: (z) => {
          w.current = z, j.current.onValueChange?.(z);
        }
      }, I.initialiseScene(o, a), I.attachTo(M, $), n != null)
        try {
          I.setValue(n);
        } catch {
        }
      L.current = I;
      const T = new ResizeObserver(() => I.resizeViewCanvas());
      return T.observe(F), N('RealDrawEditor callback "onMount"', m, {
        Editor: I,
        getValue: () => I.getValue(),
        setValue: (z) => I.setValue(z),
        Tool: () => I.currentTool,
        setTool: (z) => I.setTool(z),
        ObjectList: () => [...I.ObjectList],
        addObject: (z) => I.addObject(z),
        removeObject: (z) => I.removeObject(z),
        configureObject: (z, E) => I.configureObject(z, E),
        SelectedIds: () => I.SelectedIds,
        select: (z) => I.selectIds(z),
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
        setZoom: (z) => I.setZoom(z),
        zoomToFit: () => I.zoomToFit(),
        importImage: (z) => I.importImage(z),
        exportedBlob: (z) => I.exportedBlob(z),
        insertText: (z, E, X) => I.insertText(z, E, X)
      }), () => {
        N(
          'RealDrawEditor callback "onUnmount"',
          j.current.onUnmount
        ), T.disconnect(), L.current = void 0, I.destroy(), M.remove(), $.remove();
      };
    }, []), je(() => {
      const F = L.current;
      F != null && Vp.includes(s) && F.setTool(s);
    }, [s]), je(() => {
      const F = L.current;
      F != null && (F.readonly = r, r && (F.DragState = void 0));
    }, [r]), je(() => {
      const F = L.current;
      F != null && (F.GridSize = l, F.snapToGrid = c, F.showsGrid = d, F.requestRendering());
    }, [l, c, d]), je(() => {
      const F = L.current;
      if (!(F == null || n == null) && n !== w.current) {
        w.current = n;
        try {
          F.setValue(n);
        } catch (M) {
          console.warn("RealDrawEditor: invalid value given", M);
        }
      }
    }, [n]), b`<div
        class="jcl-component realdraweditor ${i ? "disabled" : ""} ${t}"
        ...${e.RestProps} ref=${k}
      />`;
  });
}
const Cs = /* @__PURE__ */ Z("jcl-component.realdraweditor", `
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
  `), zo = 80, Oo = 50;
function Bp(e) {
  return "" + e.Key;
}
function co(e) {
  let t = "";
  return e.FontFamily != null && (t += `font-family:${e.FontFamily}; `), e.FontSize != null && (t += `font-size:${e.FontSize}px; `), e.FontWeight != null && (t += `font-weight:${e.FontWeight}; `), e.LineHeight != null && (t += `line-height:${e.LineHeight}; `), e.ForegroundColor != null && (t += `color:${e.ForegroundColor}; `), e.BackgroundColor != null && (t += `background-color:${e.BackgroundColor}; `), t;
}
function ks(e) {
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
    const { selectionStart: o, selectionEnd: a, value: r } = t;
    t.value = r.slice(0, o) + "	" + r.slice(a), t.selectionStart = t.selectionEnd = o + 1, t.dispatchEvent(new InputEvent("input", { bubbles: !0 }));
  }
}
function Wp(e, t, n) {
  return (o, a) => {
    const r = {
      Content: o.Content ?? "",
      onContentChange: n == null ? void 0 : ((i) => N(
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
        return b`<${or}     ...${r}/>`;
      case "markdown":
        return b`<${$s} ...${r}/>`;
      default:
        return b`<${js}     ...${r}/>`;
    }
  };
}
function Hp(e) {
  return _(() => {
    Gp(), e = G(e);
    const t = S(e.Class) ?? "", n = V(e.Notes, (te) => $e(te, De)) ?? Se("Notes"), o = A(e.KeyOfNote) ?? Bp, a = ke(e.PaneWidth), r = ke(e.PaneHeight), i = S(e.DefaultFontFamily), s = Ge(e.DefaultFontSize), l = V(e.DefaultFontWeight, (te) => xt(te) || Be(te)), c = Ge(e.DefaultLineHeight), d = S(e.DefaultForegroundColor), u = S(e.DefaultBackgroundColor);
    let p = V(e.selectedKeys, (te) => $e(te, it)) ?? [];
    const h = A(e.onSelectionChange), f = A(e.onNotesChange), g = A(e.onNoteContentChange), x = ke(e.SensorWidth) ?? 20, m = ke(e.maxPanningSpeed) ?? 400, C = h != null, k = f != null, L = {
      FontFamily: i,
      FontSize: s,
      FontWeight: l,
      LineHeight: c,
      ForegroundColor: d,
      BackgroundColor: u
    }, j = A(e.NoteRenderer) ?? Wp(o, L, g), y = n.map((te) => String(
      Ke('NoteBoard callback "KeyOfNote"', o, te)
    )), w = Xs(y, '"Notes"'), F = /* @__PURE__ */ new Set();
    C && (p = Kn(p, w), p.forEach((te) => F.add(te)));
    function M(te, ee) {
      let ne;
      return ee ? ne = F.has(te) ? p.filter(
        (se) => se !== te
      ) : [...p, te] : ne = [te], N(
        'NoteBoard callback "onSelectionChange"',
        h,
        ne
      ), ne;
    }
    const $ = K(null), I = K(void 0), T = et();
    je(() => () => {
      const te = I.current;
      te != null && (te.ChangeRAF != null && cancelAnimationFrame(te.ChangeRAF), te.PanningRAF != null && cancelAnimationFrame(te.PanningRAF), I.current = void 0);
    }, []);
    function D(te) {
      const { Mode: ee, dx: ne, dy: se } = I.current, { x: xe, y: we, Width: Ie, Height: Me } = te;
      return ee === "move" ? {
        x: Qe(xe + ne, 0, _e - Ie),
        y: Qe(we + se, 0, nt - Me),
        Width: Ie,
        Height: Me
      } : {
        // in "DialogView"s resizing logic
        x: xe,
        y: we,
        Width: Qe(Ie + ne, zo, _e - xe),
        Height: Qe(Me + se, Oo, nt - we)
      };
    }
    function z(te, ee) {
      const ne = I.current?.StartGeometryByKey[ee];
      return ne == null ? {
        x: te.Position.x,
        y: te.Position.y,
        Width: te.Size.Width,
        Height: te.Size.Height
      } : D(ne);
    }
    function E() {
      const te = I.current;
      if (te == null)
        return [];
      const ee = [];
      return n.forEach((ne, se) => {
        const xe = te.StartGeometryByKey[y[se]];
        if (xe != null) {
          const { x: we, y: Ie, Width: Me, Height: Fe } = D(xe);
          ee.push({ ...ne, Position: { x: we, y: Ie }, Size: { Width: Me, Height: Fe } });
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
        const ne = E();
        ne.length > 0 && N(
          'NoteBoard callback "onNotesChange"',
          f,
          ne
        );
      }));
    }
    function Q(te, ee, ne) {
      let se = [ee];
      if (C) {
        let we = p;
        if (!F.has(ee)) {
          const Ie = sn(ne);
          we = M(ee, Ie);
        }
        we.includes(ee) && (se = we);
      }
      const xe = {};
      n.forEach((we, Ie) => {
        se.includes(y[Ie]) && (xe[y[Ie]] = {
          x: we.Position.x,
          y: we.Position.y,
          Width: we.Size.Width,
          Height: we.Size.Height
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
      }, T();
    }
    function pe(te, ee, ne) {
      const se = I.current;
      se != null && (se.dx = te, se.dy = ee, ne != null && (se.lastClientX = ne.clientX, se.lastClientY = ne.clientY), se.Mode === "move" && se.PanningRAF == null && (se.PanningTimestamp = void 0, se.PanningRAF = requestAnimationFrame(
        (xe) => ue.current?.(xe)
      )), T(), X());
    }
    function q(te, ee) {
      const ne = I.current;
      if (ne == null)
        return;
      ne.dx = te, ne.dy = ee, ne.ChangeRAF != null && cancelAnimationFrame(ne.ChangeRAF), ne.PanningRAF != null && cancelAnimationFrame(ne.PanningRAF);
      const se = E();
      I.current = void 0, se.length > 0 && N(
        // the final, non-throttled batch update
        'NoteBoard callback "onNotesChange"',
        f,
        se
      ), T();
    }
    function J() {
      const te = I.current;
      if (te == null)
        return;
      te.ChangeRAF != null && cancelAnimationFrame(te.ChangeRAF), te.PanningRAF != null && cancelAnimationFrame(te.PanningRAF);
      const ee = [];
      n.forEach((ne, se) => {
        const xe = te.StartGeometryByKey[y[se]];
        if (xe != null) {
          const { x: we, y: Ie, Width: Me, Height: Fe } = xe;
          ee.push({ ...ne, Position: { x: we, y: Ie }, Size: { Width: Me, Height: Fe } });
        }
      }), I.current = void 0, ee.length > 0 && N(
        'NoteBoard callback "onNotesChange"',
        f,
        ee
      ), T();
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
      const { vx: we, vy: Ie } = Ys(
        ne.getBoundingClientRect(),
        se,
        xe,
        x,
        m
      );
      if (we === 0 && Ie === 0) {
        ee.PanningRAF = void 0, ee.PanningTimestamp = void 0;
        return;
      }
      const Me = Js(ee, te), Fe = ne.scrollLeft, lt = ne.scrollTop;
      ne.scrollLeft = Fe + we * Me, ne.scrollTop = lt + Ie * Me, ee.dx += ne.scrollLeft - Fe, ee.dy += ne.scrollTop - lt, T(), Ce.current?.(), ee.PanningRAF = requestAnimationFrame(
        (ye) => ue.current?.(ye)
      );
    }
    const ue = K();
    ue.current = P;
    const Ce = K();
    Ce.current = X;
    const Ve = Li($), _e = a ?? Ve.Width, nt = r ?? Ve.Height;
    function ot(te) {
      return co({
        FontFamily: te.FontFamily ?? i,
        FontSize: te.FontSize ?? s,
        FontWeight: te.FontWeight ?? l,
        LineHeight: te.LineHeight ?? c,
        ForegroundColor: te.ForegroundColor ?? d,
        BackgroundColor: te.BackgroundColor ?? u
      });
    }
    return b`<div
        class="jcl-component noteboard ${t}"
        ref=${$} ...${e.RestProps}
      >
        <div class="notepane"
          style="width:${_e}px; height:${nt}px"
        >
          ${n.map((te, ee) => {
      const ne = y[ee], se = F.has(ne);
      return b`<${_p} key=${ne}
              NoteKey=${ne} Geometry=${z(te, ne)}
              isSelected=${se} isSelectable=${C}
              isDraggable=${k} NoteStyle=${ot(te)}
              ScrollerOf=${() => $.current}
              renderedContent=${Ke(
        'NoteBoard callback "NoteRenderer"',
        j,
        te,
        se
      )}
              onNoteClick=${(xe, we, Ie) => M(
        ne,
        sn(Ie)
      )}
              onMoveStart=${(xe, we, Ie, Me, Fe) => Q("move", ne, Fe)}
              onMoveContinuation=${(xe, we, Ie, Me, Fe) => pe(xe, we, Fe)}
              onMoveFinish=${(xe, we) => q(xe, we)}
              onMoveCancellation=${() => J()}
              onResizeStart=${(xe, we, Ie, Me, Fe) => Q("resize", ne, Fe)}
              onResizeContinuation=${(xe, we, Ie, Me, Fe) => pe(xe, we, Fe)}
              onResizeFinish=${(xe, we) => q(xe, we)}
              onResizeCancellation=${() => J()}
            />`;
    })}
        </>
      </>`;
  });
}
function _p(e) {
  const {
    NoteKey: t,
    Geometry: n,
    isSelected: o,
    isSelectable: a,
    isDraggable: r,
    NoteStyle: i,
    ScrollerOf: s,
    renderedContent: l,
    onNoteClick: c,
    onMoveStart: d,
    onMoveContinuation: u,
    onMoveFinish: p,
    onMoveCancellation: h,
    onResizeStart: f,
    onResizeContinuation: g,
    onResizeFinish: x,
    onResizeCancellation: m
  } = e, C = K(null), k = Tn({
    ViewRef: C,
    Container: s,
    onlyFrom: ".titlebar",
    onClick: a ? c : void 0,
    onDragStart: r ? d : void 0,
    onDragContinuation: r ? u : void 0,
    onDragFinish: r ? p : void 0,
    onDragCancellation: r ? h : void 0
  }), L = hn({
    ViewRef: C,
    Container: s,
    onlyFrom: ".resize-handle",
    onDragStart: r ? f : void 0,
    onDragContinuation: r ? g : void 0,
    onDragFinish: r ? x : void 0,
    onDragCancellation: r ? m : void 0
  });
  return b`<div
      class="stickynote${o ? " selected" : ""}"
      style="left:${n.x}px; top:${n.y}px; width:${n.Width}px; height:${n.Height}px; ${i}"
      ref=${C} data-note-key=${t}
      onPointerDown=${(j) => {
    L?.(j), k?.(j);
  }}
    >
      <div class="titlebar"/>
      <div class="content-area">${l}</>
      ${r && b`<div class="resize-handle" aria-hidden="true"/>`}
    </>`;
}
const Gp = /* @__PURE__ */ Z("jcl-component.noteboard", `
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
function js(e) {
  return _(() => {
    e = G(e);
    const t = V(e.Content, no) ?? "", n = A(e.onContentChange), o = ke(e.TabWidth) ?? 10, a = !t.includes("	");
    return b`<${Pa}
        Class="sticky-note-content sticky-text-note"
        Style=${co(e) + (a ? "" : `tab-size:${o}px;`)}
        Value=${t} wrap=${a}
        readonly=${n == null}
        onKeyDown=${ks}
        onValueInput=${(r) => N(
      'stickyTextNote callback "onContentChange"',
      n,
      r
    )}
      />`;
  });
}
function or(e) {
  return _(() => {
    e = G(e);
    const t = V(e.Content, no) ?? "", n = A(e.onContentChange);
    return b`<${es}
        Class="sticky-note-content sticky-html-note"
        style=${co(e)}
        Value=${t} readonly=${n == null}
        onValueChange=${(o) => N(
      'stickyHTMLNote callback "onContentChange"',
      n,
      o
    )}
      />`;
  });
}
function $s(e) {
  return _(() => {
    e = G(e);
    const t = V(e.Content, no) ?? "", n = A(e.onContentChange), { openDialog: o } = An(), a = Dt(), r = K("");
    r.current = t;
    function i() {
      n != null && o({
        Name: "stickyMarkdownNote-" + a,
        Title: "Markdown",
        isModal: !1,
        isDraggable: !0,
        hasCloseButton: !0,
        isResizable: !0,
        Renderer: () => b`<${Pa}
            Class="sticky-markdown-editor"
            Value=${r.current}
            onKeyDown=${ks}
            onValueInput=${(s) => {
          r.current = s, N(
            'stickyMarkdownNote callback "onContentChange"',
            n,
            s
          );
        }}
          />`
      });
    }
    return b`<${Bi}
        Class="sticky-note-content sticky-markdown-note"
        style=${co(e)}
        Value=${t}
        onDblClick=${i}
      />`;
  });
}
const fn = 6, Pr = 2, ei = 9, ti = 9, Kp = 80, Up = zo, qp = Oo, ko = 16, ni = 20;
function jn(e, t) {
  const { x: n, y: o } = e.Position, { Width: a, Height: r } = e.Size;
  switch (t.Direction) {
    case "n":
      return { x: n + t.Offset, y: o };
    case "s":
      return { x: n + t.Offset, y: o + r };
    case "w":
      return { x: n, y: o + t.Offset };
    default:
      return { x: n + a, y: o + t.Offset };
  }
}
function ma(e) {
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
function oi(e, t, n, o) {
  const a = Math.hypot(n.x - e.x, n.y - e.y), r = Math.min(a / 2, Kp), i = ma(t), s = {
    x: e.x + r * i.x,
    y: e.y + r * i.y
  };
  let l = n;
  if (o != null) {
    const u = ma(o);
    l = { x: n.x + r * u.x, y: n.y + r * u.y };
  }
  const c = rn({
    Anchors: [e, n],
    Controls: [{ c1: s, c2: l }],
    closed: !1
  }), d = (Math.abs(n.x - l.x) + Math.abs(n.y - l.y) < 1e-3 ? Math.atan2(n.y - s.y, n.x - s.x) : Math.atan2(n.y - l.y, n.x - l.x)) * 180 / Math.PI;
  return { Path: c, ArrowAngle: d };
}
function Vt(e) {
  return {
    x: e.Position.x,
    y: e.Position.y,
    Width: e.Size.Width,
    Height: e.Size.Height
  };
}
function Xp(e, t) {
  return e.length === 0 || t.length === 0 ? { vertical: /* @__PURE__ */ new Map(), horizontal: /* @__PURE__ */ new Map() } : xs(
    e.map(ga),
    t.map(ga),
    1
    // [px] - no zooming here
  );
}
function Yp(e) {
  return _(() => {
    oh(), e = G(e);
    const t = S(e.Class) ?? "", n = V(e.Nodes, (v) => $e(v, De)) ?? Se("Nodes"), o = V(e.Edges, (v) => $e(v, De)) ?? Se("Edges"), a = V(e.StickyNotes, (v) => $e(v, De)) ?? [], r = V(e.Groups, (v) => $e(v, De)) ?? [], i = ke(e.PaneWidth), s = ke(e.PaneHeight);
    let l = V(e.selectedNodeKeys, (v) => $e(v, it)) ?? [], c = V(e.selectedEdgeKeys, (v) => $e(v, it)) ?? [], d = V(e.selectedStickyNoteKeys, (v) => $e(v, it)) ?? [], u = V(e.selectedGroupKeys, (v) => $e(v, it)) ?? [];
    const p = A(e.onSelectionChange), h = A(e.onNodesChange), f = A(e.onEdgesChange), g = A(e.onStickyNotesChange), x = A(e.onStickyNoteContentChange), m = A(e.onGroupsChange), C = A(e.onEdgeCreate), k = A(e.onNodeDoubleClick), L = A(e.PortIsValidTarget), j = S(e.InputFillColor) ?? "#B3E5FC", y = S(e.OutputFillColor) ?? "#FFE0B2", w = S(e.DefaultEdgeColor) ?? "#666666", F = S(e.DefaultFontFamily), M = Ge(e.DefaultFontSize), $ = V(e.DefaultFontWeight, (v) => xt(v) || Be(v)), I = Ge(e.DefaultLineHeight), T = S(e.DefaultForegroundColor), D = S(e.DefaultBackgroundColor), z = ke(e.SensorWidth) ?? 20, E = ke(e.maxPanningSpeed) ?? 400, X = Y(e.SnapToGrid) ?? !1, Q = ke(e.GridWidth) ?? 10, pe = ke(e.GridHeight) ?? 10, q = p != null, J = h != null, P = g != null, ue = C != null, Ce = J || P, Ve = {
      // pure fallbacks for StickyNotes
      FontFamily: F,
      FontSize: M,
      FontWeight: $,
      LineHeight: I,
      ForegroundColor: T,
      BackgroundColor: D
    };
    function _e(v, R) {
      return Xs(
        v.map((W) => String(W.Key)),
        R
      );
    }
    const nt = _e(n, '"Nodes"'), ot = _e(o, '"Edges"'), te = _e(a, '"StickyNotes"'), ee = _e(r, '"Groups"');
    n.forEach((v) => {
      _e(v.InputPorts ?? [], `input ports of node "${v.Key}"`), _e(v.OutputPorts ?? [], `output ports of node "${v.Key}"`);
    });
    function ne(v, R = /* @__PURE__ */ new Set()) {
      if (R.has(v))
        return { NodeKeys: [], StickyNoteKeys: [] };
      const W = r.find((de) => String(de.Key) === v);
      if (W == null)
        return { NodeKeys: [], StickyNoteKeys: [] };
      R.add(v);
      const B = [...W.NodeKeys ?? []], H = [...W.StickyNoteKeys ?? []];
      return (W.GroupKeys ?? []).forEach((de) => {
        const le = ne(String(de), R);
        B.push(...le.NodeKeys), H.push(...le.StickyNoteKeys);
      }), R.delete(v), { NodeKeys: B, StickyNoteKeys: H };
    }
    q ? (l = Kn(l, nt), c = Kn(c, ot), d = Kn(d, te), u = Kn(u, ee)) : (l = [], c = [], d = [], u = []);
    const se = new Set(l), xe = new Set(c), we = new Set(d), Ie = new Set(u);
    function Me(v, R, W) {
      function B(de, le) {
        return le.has(R) ? de.filter((ve) => ve !== R) : [...de, R];
      }
      let H;
      return W ? H = {
        selectedNodeKeys: v === "node" ? B(l, se) : l,
        selectedEdgeKeys: v === "edge" ? B(c, xe) : c,
        selectedStickyNoteKeys: v === "stickyNote" ? B(d, we) : d,
        selectedGroupKeys: v === "group" ? B(u, Ie) : u
      } : H = {
        selectedNodeKeys: v === "node" ? [R] : [],
        selectedEdgeKeys: v === "edge" ? [R] : [],
        selectedStickyNoteKeys: v === "stickyNote" ? [R] : [],
        selectedGroupKeys: v === "group" ? [R] : []
      }, Fe(
        H.selectedNodeKeys,
        H.selectedEdgeKeys,
        H.selectedStickyNoteKeys,
        H.selectedGroupKeys
      ), H;
    }
    function Fe(v, R, W, B) {
      N(
        'DataFlowProcessView callback "onSelectionChange"',
        p,
        v,
        R,
        W,
        B
      );
    }
    function lt() {
      (l.length > 0 || c.length > 0 || d.length > 0 || u.length > 0) && Fe([], [], [], []);
    }
    const ye = K(null), fe = K(null), Ye = K(null), U = K(void 0), re = et();
    je(() => () => {
      const v = U.current;
      v != null && (v.ChangeRAF != null && cancelAnimationFrame(v.ChangeRAF), v.PanningRAF != null && cancelAnimationFrame(v.PanningRAF), U.current = void 0), En.current != null && clearTimeout(En.current);
    }, []);
    function ge(v, R) {
      return X && R > 0 ? Math.round(v / R) * R : v;
    }
    function We(v) {
      return {
        minWidth: v.minSize?.Width ?? Up,
        minHeight: v.minSize?.Height ?? qp,
        maxWidth: v.maxSize?.Width ?? 1 / 0,
        maxHeight: v.maxSize?.Height ?? 1 / 0
      };
    }
    const O = {
      // NoteBoard's minimal sizes
      minWidth: zo,
      minHeight: Oo,
      maxWidth: 1 / 0,
      maxHeight: 1 / 0
    };
    function oe(v, R) {
      const { Mode: W, Direction: B, dx: H, dy: de } = U.current;
      let { x: le, y: ve, Width: Oe, Height: Xe } = v;
      if (W === "move")
        return le = Qe(ge(le + H, Q), 0, _t - Oe), ve = Qe(ge(ve + de, pe), 0, Gt - Xe), { x: le, y: ve, Width: Oe, Height: Xe };
      const ze = le + Oe, Te = ve + Xe;
      if (B.includes("e") && (Oe = Qe(
        ge(ze + H, Q),
        le + R.minWidth,
        Math.min(le + R.maxWidth, _t)
      ) - le), B.includes("w")) {
        const gt = Qe(
          ge(le + H, Q),
          Math.max(0, ze - R.maxWidth),
          ze - R.minWidth
        );
        Oe = ze - gt, le = gt;
      }
      if (B.includes("s") && (Xe = Qe(
        ge(Te + de, pe),
        ve + R.minHeight,
        Math.min(ve + R.maxHeight, Gt)
      ) - ve), B.includes("n")) {
        const gt = Qe(
          ge(ve + de, pe),
          Math.max(0, Te - R.maxHeight),
          Te - R.minHeight
        );
        Xe = Te - gt, ve = gt;
      }
      return { x: le, y: ve, Width: Oe, Height: Xe };
    }
    function he(v, R, W) {
      const B = U.current?.StartGeometryByKey?.[v];
      return B == null ? {
        x: R.Position.x,
        y: R.Position.y,
        Width: R.Size.Width,
        Height: R.Size.Height
      } : oe(B, W);
    }
    function Ee() {
      return n.map((v) => {
        const R = U.current?.StartGeometryByKey?.["node:" + v.Key];
        if (R == null)
          return v;
        const { x: W, y: B, Width: H, Height: de } = oe(
          R,
          We(v)
        );
        return { ...v, Position: { x: W, y: B }, Size: { Width: H, Height: de } };
      });
    }
    function Re() {
      return a.map((v) => {
        const R = U.current?.StartGeometryByKey?.["stickyNote:" + v.Key];
        if (R == null)
          return v;
        const { x: W, y: B, Width: H, Height: de } = oe(
          R,
          O
        );
        return { ...v, Position: { x: W, y: B }, Size: { Width: H, Height: de } };
      });
    }
    function qe() {
      const v = U.current?.StartGeometryByKey ?? {};
      return Object.keys(v).some(
        (R) => R.startsWith("node:")
      );
    }
    function kt() {
      const v = U.current?.StartGeometryByKey ?? {};
      return Object.keys(v).some(
        (R) => R.startsWith("stickyNote:")
      );
    }
    function dt() {
      const v = U.current;
      v == null || v.ChangeRAF != null || (v.ChangeRAF = requestAnimationFrame(() => {
        const R = U.current;
        R != null && (R.ChangeRAF = void 0, Cr());
      }));
    }
    function Cr() {
      qe() && N(
        'DataFlowProcessView callback "onNodesChange"',
        h,
        Ee()
      ), kt() && N(
        'DataFlowProcessView callback "onStickyNotesChange"',
        g,
        Re()
      );
    }
    function Fn(v, R, W, B, H) {
      let de = R === "node" ? [W] : [], le = R === "stickyNote" ? [W] : [], ve = R === "group" ? [W] : [];
      if (q) {
        let Te = {
          selectedNodeKeys: l,
          selectedEdgeKeys: c,
          selectedStickyNoteKeys: d,
          selectedGroupKeys: u
        };
        if (!(R === "node" ? se : R === "group" ? Ie : we).has(W)) {
          const xl = sn(H);
          Te = Me(R, W, xl);
        }
        (R === "node" ? Te.selectedNodeKeys : R === "group" ? Te.selectedGroupKeys : Te.selectedStickyNoteKeys).includes(W) && (de = Te.selectedNodeKeys, le = Te.selectedStickyNoteKeys, ve = Te.selectedGroupKeys);
      }
      const Oe = new Set(de), Xe = new Set(le);
      ve.forEach((Te) => {
        const gt = ne(Te);
        gt.NodeKeys.forEach(
          (yo) => Oe.add(String(yo))
        ), gt.StickyNoteKeys.forEach(
          (yo) => Xe.add(String(yo))
        );
      });
      const ze = {};
      n.forEach((Te) => {
        Oe.has(String(Te.Key)) && (ze["node:" + Te.Key] = Vt(Te));
      }), a.forEach((Te) => {
        Xe.has(String(Te.Key)) && (ze["stickyNote:" + Te.Key] = Vt(Te));
      }), U.current = {
        Mode: v,
        Direction: B,
        StartGeometryByKey: ze,
        dx: 0,
        dy: 0,
        lastClientX: void 0,
        lastClientY: void 0,
        ChangeRAF: void 0,
        PanningRAF: void 0,
        PanningTimestamp: void 0
      }, re();
    }
    function zn(v, R, W) {
      const B = U.current;
      B != null && (B.dx = v, B.dy = R, W != null && (B.lastClientX = W.clientX, B.lastClientY = W.clientY), B.Mode === "move" && B.PanningRAF == null && (B.PanningTimestamp = void 0, B.PanningRAF = requestAnimationFrame(
        (H) => fo.current?.(H)
      )), re(), dt());
    }
    function On(v, R) {
      const W = U.current;
      W != null && (W.dx = v, W.dy = R, W.ChangeRAF != null && cancelAnimationFrame(W.ChangeRAF), W.PanningRAF != null && cancelAnimationFrame(W.PanningRAF), Cr(), U.current = void 0, re());
    }
    function Vn() {
      const v = U.current;
      if (v == null)
        return;
      v.ChangeRAF != null && cancelAnimationFrame(v.ChangeRAF), v.PanningRAF != null && cancelAnimationFrame(v.PanningRAF);
      const { StartGeometryByKey: R } = v;
      qe() && N(
        'DataFlowProcessView callback "onNodesChange"',
        h,
        n.map((W) => {
          const B = R["node:" + W.Key];
          return B == null ? W : {
            ...W,
            Position: { x: B.x, y: B.y },
            Size: { Width: B.Width, Height: B.Height }
          };
        })
      ), kt() && N(
        'DataFlowProcessView callback "onStickyNotesChange"',
        g,
        a.map((W) => {
          const B = R["stickyNote:" + W.Key];
          return B == null ? W : {
            ...W,
            Position: { x: B.x, y: B.y },
            Size: { Width: B.Width, Height: B.Height }
          };
        })
      ), U.current = void 0, re();
    }
    function tl(v, R, W, B) {
      U.current = {
        Mode: "rubberEdge",
        Source: { NodeKey: v, PortKey: R },
        hasMoved: !1,
        PointerPosition: { x: W, y: B },
        StartGeometryByKey: {},
        dx: 0,
        dy: 0,
        lastClientX: void 0,
        lastClientY: void 0,
        ChangeRAF: void 0,
        PanningRAF: void 0,
        PanningTimestamp: void 0
      }, re();
    }
    function nl(v, R, W) {
      const B = U.current;
      B == null || B.Mode !== "rubberEdge" || (B.hasMoved = !0, B.PointerPosition = { x: v, y: R }, W != null && (B.lastClientX = W.clientX, B.lastClientY = W.clientY), B.PanningRAF == null && (B.PanningTimestamp = void 0, B.PanningRAF = requestAnimationFrame(
        (H) => fo.current?.(H)
      )), re());
    }
    function ol(v, R) {
      const W = U.current;
      if (W == null || W.Mode !== "rubberEdge")
        return;
      W.PanningRAF != null && cancelAnimationFrame(W.PanningRAF);
      const B = W.Source;
      U.current = void 0;
      const H = rl(v, R, B);
      H != null && N(
        'DataFlowProcessView callback "onEdgeCreate"',
        C,
        { Source: B, Target: H }
      ), re();
    }
    function al() {
      const v = U.current;
      v == null || v.Mode !== "rubberEdge" || (v.PanningRAF != null && cancelAnimationFrame(v.PanningRAF), U.current = void 0, re());
    }
    function kr(v, R, W) {
      return W.disabled == !0 ? !1 : L == null ? !0 : Ke(
        'DataFlowProcessView callback "PortIsValidTarget"',
        L,
        v,
        R
      ) == !0;
    }
    function rl(v, R, W) {
      const B = fn + Pr;
      for (let H = Ft.length - 1; H >= 0; H--) {
        const de = Ft[H], le = (de.InputPorts ?? []).find((ve) => {
          const Oe = jn(de, ve);
          return Math.hypot(Oe.x - v, Oe.y - R) <= B;
        });
        if (le != null) {
          const ve = { NodeKey: String(de.Key), PortKey: String(le.Key) };
          return kr(W, ve, le) ? ve : void 0;
        }
      }
    }
    function il(v, R) {
      U.current = {
        Mode: "lasso",
        LassoStart: { x: v, y: R },
        PointerPosition: { x: v, y: R },
        StartGeometryByKey: {},
        dx: 0,
        dy: 0,
        lastClientX: void 0,
        lastClientY: void 0,
        ChangeRAF: void 0,
        PanningRAF: void 0,
        PanningTimestamp: void 0
      }, re();
    }
    function sl(v, R) {
      const W = U.current;
      W == null || W.Mode !== "lasso" || (W.PointerPosition = { x: v, y: R }, re());
    }
    function jr(v) {
      const { LassoStart: R, PointerPosition: W } = v;
      return {
        x: Math.min(R.x, W.x),
        y: Math.min(R.y, W.y),
        Width: Math.abs(W.x - R.x),
        Height: Math.abs(W.y - R.y)
      };
    }
    function ll(v, R) {
      const W = U.current;
      if (W == null || W.Mode !== "lasso")
        return;
      W.PointerPosition = { x: v, y: R };
      const B = jr(W);
      U.current = void 0;
      const H = Ft.filter(
        (le) => fa(B, Vt(le))
      ).map((le) => String(le.Key)), de = bo.filter(
        (le) => fa(B, Vt(le))
      ).map((le) => String(le.Key));
      Fe(H, [], de, []), re();
    }
    function cl() {
      U.current?.Mode === "lasso" && (U.current = void 0, re());
    }
    function dl(v, R, W) {
      const B = sn(W), H = ul(v, R);
      switch (!0) {
        case H != null:
          Me("edge", H, B);
          break;
        case !B:
          lt();
          break;
        default:
      }
    }
    function ul(v, R) {
      const W = Ye.current;
      if (W == null)
        return;
      const B = Array.from(W.querySelectorAll("path[data-edge-key]"));
      for (let H = B.length - 1; H >= 0; H--) {
        const de = B[H];
        if (typeof de.isPointInStroke != "function")
          return;
        const le = W.createSVGPoint();
        le.x = v, le.y = R;
        const ve = parseFloat(getComputedStyle(de).strokeWidth) || 0, Oe = de.getAttribute("stroke-width");
        de.setAttribute("stroke-width", String(ve + 2 * Pr));
        try {
          if (de.isPointInStroke(le))
            return de.getAttribute("data-edge-key") ?? void 0;
        } finally {
          Oe == null ? de.removeAttribute("stroke-width") : de.setAttribute("stroke-width", Oe);
        }
      }
    }
    const pl = Tn({
      ViewRef: fe,
      Container: () => ye.current,
      onlyFrom: ".dfp-pane",
      onClick: q ? dl : void 0,
      onDragStart: q ? (v, R, W, B) => il(W, B) : void 0,
      onDragContinuation: q ? (v, R, W, B) => sl(W, B) : void 0,
      onDragFinish: q ? (v, R, W, B) => ll(W, B) : void 0,
      onDragCancellation: q ? () => cl() : void 0
    });
    function hl(v) {
      const R = U.current, W = ye.current;
      if (R == null || W == null || R.Mode !== "move" && R.Mode !== "rubberEdge")
        return;
      const { lastClientX: B, lastClientY: H } = R;
      if (B == null || H == null) {
        R.PanningRAF = void 0, R.PanningTimestamp = void 0;
        return;
      }
      const { vx: de, vy: le } = Ys(
        W.getBoundingClientRect(),
        B,
        H,
        z,
        E
      );
      if (de === 0 && le === 0) {
        R.PanningRAF = void 0, R.PanningTimestamp = void 0;
        return;
      }
      const ve = Js(R, v), Oe = W.scrollLeft, Xe = W.scrollTop;
      W.scrollLeft = Oe + de * ve, W.scrollTop = Xe + le * ve;
      const ze = W.scrollLeft - Oe, Te = W.scrollTop - Xe;
      R.Mode === "move" ? (R.dx += ze, R.dy += Te, $r.current?.()) : R.PointerPosition = {
        // ...is kept in content coordinates
        x: R.PointerPosition.x + ze,
        y: R.PointerPosition.y + Te
      }, re(), R.PanningRAF = requestAnimationFrame(
        (gt) => fo.current?.(gt)
      );
    }
    const fo = K();
    fo.current = hl;
    const $r = K();
    $r.current = dt;
    const Zo = K(!1), En = K(void 0);
    function Ir(v = 3e3) {
      Zo.current = !0, re(), clearTimeout(En.current), En.current = setTimeout(() => {
        En.current = void 0, Zo.current = !1, re();
      }, v);
    }
    function go(v, R) {
      const W = new Set(l), B = new Set(d);
      u.forEach((H) => {
        const de = ne(H);
        de.NodeKeys.forEach(
          (le) => W.add(String(le))
        ), de.StickyNoteKeys.forEach(
          (le) => B.add(String(le))
        );
      }), J && W.size > 0 && N(
        'DataFlowProcessView callback "onNodesChange"',
        h,
        n.map((H) => {
          if (!W.has(String(H.Key)))
            return H;
          const { Width: de, Height: le } = H.Size;
          return { ...H, Position: {
            x: Qe(H.Position.x + v, 0, _t - de),
            y: Qe(H.Position.y + R, 0, Gt - le)
          } };
        })
      ), P && B.size > 0 && N(
        'DataFlowProcessView callback "onStickyNotesChange"',
        g,
        a.map((H) => {
          if (!B.has(String(H.Key)))
            return H;
          const { Width: de, Height: le } = H.Size;
          return { ...H, Position: {
            x: Qe(H.Position.x + v, 0, _t - de),
            y: Qe(H.Position.y + R, 0, Gt - le)
          } };
        })
      ), Ir();
    }
    function mo(v, R) {
      J && l.length > 0 && N(
        'DataFlowProcessView callback "onNodesChange"',
        h,
        n.map((W) => {
          if (!se.has(String(W.Key)))
            return W;
          const B = We(W), { x: H, y: de } = W.Position;
          return { ...W, Size: {
            Width: Qe(
              W.Size.Width + v,
              B.minWidth,
              Math.min(B.maxWidth, _t - H)
            ),
            Height: Qe(
              W.Size.Height + R,
              B.minHeight,
              Math.min(B.maxHeight, Gt - de)
            )
          } };
        })
      ), P && d.length > 0 && N(
        'DataFlowProcessView callback "onStickyNotesChange"',
        g,
        a.map((W) => {
          if (!we.has(String(W.Key)))
            return W;
          const { x: B, y: H } = W.Position;
          return { ...W, Size: {
            Width: Qe(
              W.Size.Width + v,
              zo,
              _t - B
            ),
            Height: Qe(
              W.Size.Height + R,
              Oo,
              Gt - H
            )
          } };
        })
      ), Ir();
    }
    function fl(v, R, W, B) {
      let H = v.filter((le) => !R.has(String(le.Key))).map((le) => W.size === 0 && B.size === 0 ? le : {
        ...le,
        NodeKeys: W.size === 0 ? le.NodeKeys ?? [] : (le.NodeKeys ?? []).filter(
          (ve) => !W.has(String(ve))
        ),
        StickyNoteKeys: B.size === 0 ? le.StickyNoteKeys ?? [] : (le.StickyNoteKeys ?? []).filter(
          (ve) => !B.has(String(ve))
        )
      }), de = !0;
      for (; de; ) {
        de = !1;
        const le = new Set(
          H.map((Oe) => String(Oe.Key))
        );
        H = H.map((Oe) => {
          const Xe = (Oe.GroupKeys ?? []).filter(
            (ze) => le.has(String(ze))
          );
          return Xe.length === (Oe.GroupKeys ?? []).length ? Oe : (de = !0, { ...Oe, GroupKeys: Xe });
        });
        const ve = H.filter((Oe) => (Oe.NodeKeys ?? []).length > 0 || (Oe.StickyNoteKeys ?? []).length > 0 || (Oe.GroupKeys ?? []).length > 0);
        ve.length !== H.length && (de = !0, H = ve);
      }
      return H;
    }
    function gl() {
      const v = new Set(J ? l : []), R = new Set(P ? d : []), W = new Set(m != null ? u : []), B = /* @__PURE__ */ new Set();
      f != null && (c.forEach((H) => B.add(H)), o.forEach((H) => {
        (v.has(String(H.Source?.NodeKey)) || v.has(String(H.Target?.NodeKey))) && B.add(String(H.Key));
      })), v.size > 0 && N(
        'DataFlowProcessView callback "onNodesChange"',
        h,
        n.filter((H) => !v.has(String(H.Key)))
      ), B.size > 0 && N(
        'DataFlowProcessView callback "onEdgesChange"',
        f,
        o.filter((H) => !B.has(String(H.Key)))
      ), R.size > 0 && N(
        'DataFlowProcessView callback "onStickyNotesChange"',
        g,
        a.filter((H) => !R.has(String(H.Key)))
      ), m != null && (W.size > 0 || v.size > 0 || R.size > 0) && N(
        'DataFlowProcessView callback "onGroupsChange"',
        m,
        fl(r, W, v, R)
      ), q && (v.size > 0 || B.size > 0 || R.size > 0 || W.size > 0) && Fe(
        l.filter((H) => !v.has(H)),
        c.filter((H) => !B.has(H)),
        d.filter((H) => !R.has(H)),
        u.filter((H) => !W.has(H))
      );
    }
    function ml(v) {
      const R = v.target;
      if (
        // for embedded controls
        R != null && R.closest?.(".dfp-content-area, input, textarea, [contenteditable]") != null
      )
        return;
      const W = (v.shiftKey ? 10 : 1) * (X ? Q : 1), B = (v.shiftKey ? 10 : 1) * (X ? pe : 1);
      let H = !0;
      switch (!0) {
        case v.key === "Escape":
          lt();
          break;
        case (v.key === "Delete" || v.key === "Backspace"):
          gl();
          break;
        case v.key === "ArrowLeft":
          v.altKey ? mo(-W, 0) : go(-W, 0);
          break;
        case v.key === "ArrowRight":
          v.altKey ? mo(W, 0) : go(W, 0);
          break;
        case v.key === "ArrowUp":
          v.altKey ? mo(0, -B) : go(0, -B);
          break;
        case v.key === "ArrowDown":
          v.altKey ? mo(0, B) : go(0, B);
          break;
        default:
          H = !1;
      }
      H && v.preventDefault();
    }
    const Dr = Li(ye), _t = i ?? Dr.Width, Gt = s ?? Dr.Height, Ft = n.map((v) => {
      const { x: R, y: W, Width: B, Height: H } = he(
        "node:" + v.Key,
        v,
        We(v)
      );
      return { ...v, Position: { x: R, y: W }, Size: { Width: B, Height: H } };
    }), bo = a.map((v) => {
      const { x: R, y: W, Width: B, Height: H } = he(
        "stickyNote:" + v.Key,
        v,
        O
      );
      return { ...v, Position: { x: R, y: W }, Size: { Width: B, Height: H } };
    }), Lr = {};
    Ft.forEach(
      (v) => {
        Lr[String(v.Key)] = v;
      }
    );
    const Sr = {};
    bo.forEach(
      (v) => {
        Sr[String(v.Key)] = v;
      }
    );
    const Mr = {};
    r.forEach(
      (v) => {
        Mr[String(v.Key)] = v;
      }
    );
    const Nn = {};
    function Tr(v, R) {
      if (v in Nn)
        return Nn[v];
      if (R.has(v))
        return;
      const W = Mr[v];
      if (W == null) {
        Nn[v] = void 0;
        return;
      }
      R.add(v);
      const B = [];
      let H = -1;
      if ((W.NodeKeys ?? []).forEach((ze) => {
        const Te = Lr[String(ze)];
        Te != null && B.push(Vt(Te));
      }), (W.StickyNoteKeys ?? []).forEach((ze) => {
        const Te = Sr[String(ze)];
        Te != null && B.push(Vt(Te));
      }), (W.GroupKeys ?? []).forEach((ze) => {
        const Te = Tr(String(ze), R);
        Te != null && (B.push(Te), H = Math.max(H, Te.Depth));
      }), R.delete(v), B.length === 0) {
        Nn[v] = void 0;
        return;
      }
      const de = Math.min(...B.map((ze) => ze.x)), le = Math.min(...B.map((ze) => ze.y)), ve = Math.max(...B.map((ze) => ze.x + ze.Width)), Oe = Math.max(...B.map((ze) => ze.y + ze.Height)), Xe = {
        x: de - ko,
        y: le - ko - ni,
        Width: ve - de + 2 * ko,
        Height: Oe - le + 2 * ko + ni,
        Depth: H + 1
      };
      return Nn[v] = Xe, Xe;
    }
    const bl = r.map((v) => {
      const R = Tr(String(v.Key), /* @__PURE__ */ new Set());
      if (R != null)
        return {
          ...v,
          Position: { x: R.x, y: R.y },
          Size: { Width: R.Width, Height: R.Height },
          Depth: R.Depth
        };
    }).filter(
      (v) => v != null
    ).sort((v, R) => R.Depth - v.Depth), Lt = U.current;
    let Rr;
    if (Lt?.Mode === "move" || Zo.current) {
      const v = [], R = [], W = (B, H, de) => {
        B.forEach((le) => {
          ((Lt?.Mode === "move" ? Lt.StartGeometryByKey[H + le.Key] != null : de.has(String(le.Key))) ? v : R).push(Vt(le));
        });
      };
      W(Ft, "node:", se), W(bo, "stickyNote:", we), Rr = Xp(v, R);
    }
    const Ar = Lt?.Mode === "rubberEdge";
    let Fr;
    if (Ar && Lt?.hasMoved === !0) {
      const v = Ft.find(
        (W) => String(W.Key) === Lt.Source.NodeKey
      ), R = (v?.OutputPorts ?? []).find(
        (W) => String(W.Key) === Lt.Source.PortKey
      );
      v != null && R != null && (Fr = {
        from: jn(v, R),
        fromDirection: R.Direction,
        to: Lt.PointerPosition
      });
    }
    const yl = Lt?.Mode === "lasso" ? jr(Lt) : void 0;
    return b`<div
        class="jcl-component dataflow-process-view ${t}"
        ref=${ye} tabindex="0" onKeyDown=${ml}
        ...${e.RestProps}
      >
        <div class="dfp-pane" ref=${fe}
          style="width:${_t}px; height:${Gt}px"
          onPointerDown=${pl}
        >
          <div class="dfp-group-layer">
            ${bl.map((v) => {
      const R = String(v.Key), W = Ie.has(R);
      return b`<${eh} key=${R}
                Group=${v} GroupKey=${R}
                isSelected=${W} isSelectable=${q}
                isDraggable=${Ce}
                ScrollerOf=${() => ye.current}
                onGroupClick=${(B, H, de) => Me(
        "group",
        R,
        sn(de)
      )}
                onMoveStart=${(B, H, de, le, ve) => Fn("move", "group", R, void 0, ve)}
                onMoveContinuation=${(B, H, de, le, ve) => zn(B, H, ve)}
                onMoveFinish=${(B, H) => On(B, H)}
                onMoveCancellation=${() => Vn()}
              />`;
    })}
          </>

          <${nh}
            SVGRef=${Ye}
            PaneWidth=${_t} PaneHeight=${Gt}
            Nodes=${Ft} Edges=${o}
            EdgeSelectionSet=${xe}
            DefaultEdgeColor=${w}
            RubberEdge=${Fr} LassoBox=${yl}
            GuideLines=${Rr}
          />

          <div class="dfp-stickynote-layer">
            ${bo.map((v) => {
      const R = String(v.Key), W = we.has(R);
      return b`<${Pp} key=${R}
                Note=${v} NoteKey=${R} Defaults=${Ve}
                isSelected=${W} isSelectable=${q}
                isDraggable=${P}
                onContentChange=${x == null ? void 0 : ((B) => N(
        'DataFlowProcessView callback "onStickyNoteContentChange"',
        x,
        R,
        B
      ))}
                ScrollerOf=${() => ye.current}
                onNoteClick=${(B, H, de) => Me(
        "stickyNote",
        R,
        sn(de)
      )}
                onMoveStart=${(B, H, de, le, ve) => Fn("move", "stickyNote", R, void 0, ve)}
                onMoveContinuation=${(B, H, de, le, ve) => zn(B, H, ve)}
                onMoveFinish=${(B, H) => On(B, H)}
                onMoveCancellation=${() => Vn()}
                onResizeStart=${(B, H, de, le, ve) => Fn("resize", "stickyNote", R, "se", ve)}
                onResizeContinuation=${(B, H, de, le, ve) => zn(B, H, ve)}
                onResizeFinish=${(B, H) => On(B, H)}
                onResizeCancellation=${() => Vn()}
              />`;
    })}
          </>

          <div class="dfp-node-layer">
            ${Ft.map((v) => {
      const R = String(v.Key), W = se.has(R);
      return b`<${Zp} key=${R}
                NodeKey=${R} Title=${v.Title ?? ""}
                Geometry=${Vt(v)}
                BackgroundColor=${v.BackgroundColor}
                isDisabled=${v.disabled == !0}
                isSelected=${W} isSelectable=${q}
                isDraggable=${J}
                renderedContent=${Nt(v.Content) ? Ke(
        'DataFlowProcessView callback "Node.Content"',
        v.Content,
        v,
        W
      ) : void 0}
                ScrollerOf=${() => ye.current}
                onNodeClick=${(B, H, de) => Me(
        "node",
        R,
        sn(de)
      )}
                onNodeDoubleClick=${k == null ? void 0 : ((B) => N(
        'DataFlowProcessView callback "onNodeDoubleClick"',
        k,
        R,
        B
      ))}
                onMoveStart=${(B, H, de, le, ve) => Fn("move", "node", R, void 0, ve)}
                onMoveContinuation=${(B, H, de, le, ve) => zn(B, H, ve)}
                onMoveFinish=${(B, H) => On(B, H)}
                onMoveCancellation=${() => Vn()}
                onResizeStart=${(B, H) => Fn("resize", "node", R, B, H)}
                onResizeContinuation=${(B, H, de, le, ve) => zn(B, H, ve)}
                onResizeFinish=${(B, H) => On(B, H)}
                onResizeCancellation=${() => Vn()}
              />`;
    })}
          </>

          <div class="dfp-port-layer">
            ${Ft.map((v) => {
      const R = String(v.Key), W = (B, H) => B.map((de) => {
        const le = String(de.Key), ve = jn(v, de);
        let Oe;
        return Ar && H === "input" && (Oe = kr(
          U.current.Source,
          { NodeKey: R, PortKey: le },
          de
        ) ? "valid-target" : "locked"), b`<${th}
                    key=${R + ":" + H + ":" + le}
                    Port=${de} Kind=${H} Position=${ve}
                    FillColor=${H === "input" ? j : y}
                    TargetState=${Oe}
                    mayStartEdges=${ue}
                    ScrollerOf=${() => ye.current}
                    onRubberEdgeStart=${(Xe, ze) => tl(R, le, Xe, ze)}
                    onRubberEdgeContinuation=${(Xe, ze, Te) => nl(Xe, ze, Te)}
                    onRubberEdgeFinish=${(Xe, ze) => ol(Xe, ze)}
                    onRubberEdgeCancellation=${() => al()}
                  />`;
      });
      return b`
                ${W(v.InputPorts ?? [], "input")}
                ${W(v.OutputPorts ?? [], "output")}
              `;
    })}
          </>
        </>
      </>`;
  });
}
const Jp = ["nw", "n", "ne", "e", "se", "s", "sw", "w"];
function Zp(e) {
  const {
    NodeKey: t,
    Title: n,
    Geometry: o,
    BackgroundColor: a,
    isDisabled: r,
    isSelected: i,
    isSelectable: s,
    isDraggable: l,
    renderedContent: c,
    ScrollerOf: d,
    onNodeClick: u,
    onNodeDoubleClick: p,
    onMoveStart: h,
    onMoveContinuation: f,
    onMoveFinish: g,
    onMoveCancellation: x,
    onResizeStart: m,
    onResizeContinuation: C,
    onResizeFinish: k,
    onResizeCancellation: L
  } = e, j = K(null), y = Tn({
    ViewRef: j,
    Container: d,
    onlyFrom: ".dfp-titlebar",
    onClick: s ? u : void 0,
    onDragStart: l ? h : void 0,
    onDragContinuation: l ? f : void 0,
    onDragFinish: l ? g : void 0,
    onDragCancellation: l ? x : void 0
  });
  return b`<div
      class="dfp-node${i ? " selected" : ""}${r ? " disabled" : ""}"
      style="left:${o.x}px; top:${o.y}px; width:${o.Width}px; height:${o.Height}px; ${a == null ? "" : `background-color:${a};`}"
      ref=${j} data-node-key=${t}
      onPointerDown=${y}
      onDblClick=${p}
    >
      <div class="dfp-titlebar">${n}</>
      <div class="dfp-content-area">${c}</>
      ${i && l && Jp.map(
    (w) => b`<${Qp} key=${w}
          Direction=${w} ScrollerOf=${d}
          onResizeStart=${m}
          onResizeContinuation=${C}
          onResizeFinish=${k}
          onResizeCancellation=${L}
        />`
  )}
    </>`;
}
function Qp(e) {
  const {
    Direction: t,
    ScrollerOf: n,
    onResizeStart: o,
    onResizeContinuation: a,
    onResizeFinish: r,
    onResizeCancellation: i
  } = e, s = K(null), l = hn({
    ViewRef: s,
    Container: n,
    onlyFrom: `[data-handle="${t}"]`,
    onDragStart: ((c, d, u, p, h) => o(t, h)),
    onDragContinuation: a,
    onDragFinish: r,
    onDragCancellation: i
  });
  return b`<div
      class="dfp-handle handle-${t}" data-handle=${t}
      ref=${s} onPointerDown=${l} aria-hidden="true"
    />`;
}
function Pp(e) {
  const {
    Note: t,
    NoteKey: n,
    Defaults: o,
    isSelected: a,
    isSelectable: r,
    isDraggable: i,
    onContentChange: s,
    ScrollerOf: l,
    onNoteClick: c,
    onMoveStart: d,
    onMoveContinuation: u,
    onMoveFinish: p,
    onMoveCancellation: h,
    onResizeStart: f,
    onResizeContinuation: g,
    onResizeFinish: x,
    onResizeCancellation: m
  } = e, C = K(null), k = Tn({
    ViewRef: C,
    Container: l,
    onlyFrom: ".dfp-titlebar",
    onClick: r ? c : void 0,
    onDragStart: i ? d : void 0,
    onDragContinuation: i ? u : void 0,
    onDragFinish: i ? p : void 0,
    onDragCancellation: i ? h : void 0
  }), L = hn({
    ViewRef: C,
    Container: l,
    onlyFrom: ".dfp-resize-handle",
    onDragStart: i ? f : void 0,
    onDragContinuation: i ? g : void 0,
    onDragFinish: i ? x : void 0,
    onDragCancellation: i ? m : void 0
  }), j = {
    // note settings first, defaults second
    FontFamily: t.FontFamily ?? o.FontFamily,
    FontSize: t.FontSize ?? o.FontSize,
    FontWeight: t.FontWeight ?? o.FontWeight,
    LineHeight: t.LineHeight ?? o.LineHeight,
    ForegroundColor: t.ForegroundColor ?? o.ForegroundColor,
    BackgroundColor: t.BackgroundColor ?? o.BackgroundColor
  }, y = Vt(t);
  return b`<div
      class="dfp-stickynote${a ? " selected" : ""}"
      style="left:${y.x}px; top:${y.y}px; width:${y.Width}px; height:${y.Height}px; ${co(j)}"
      ref=${C} data-note-key=${n}
      onPointerDown=${(w) => {
    L?.(w), k?.(w);
  }}
    >
      <div class="dfp-titlebar"/>
      <div class="dfp-content-area">
        <${or} ...${j}
          Content=${t.Content ?? ""} onContentChange=${s}
        />
      </>
      ${a && i && b`<div class="dfp-resize-handle" aria-hidden="true"/>`}
    </>`;
}
function eh(e) {
  const {
    Group: t,
    GroupKey: n,
    isSelected: o,
    isSelectable: a,
    isDraggable: r,
    ScrollerOf: i,
    onGroupClick: s,
    onMoveStart: l,
    onMoveContinuation: c,
    onMoveFinish: d,
    onMoveCancellation: u
  } = e, p = K(null), h = Tn({
    ViewRef: p,
    Container: i,
    onlyFrom: ".dfp-group",
    onClick: a ? s : void 0,
    onDragStart: r ? l : void 0,
    onDragContinuation: r ? c : void 0,
    onDragFinish: r ? d : void 0,
    onDragCancellation: r ? u : void 0
  }), f = (t.BorderColor == null ? "" : `border-color:${t.BorderColor};`) + (t.BackgroundColor == null ? "" : `background-color:${t.BackgroundColor};`);
  return b`<div
      class="dfp-group${o ? " selected" : ""}"
      style="left:${t.Position.x}px; top:${t.Position.y}px; width:${t.Size.Width}px; height:${t.Size.Height}px; ${f}"
      ref=${p} data-group-key=${n}
      onPointerDown=${h}
    >${t.Label ?? ""}</>`;
}
function th(e) {
  const {
    Port: t,
    Kind: n,
    Position: o,
    FillColor: a,
    TargetState: r,
    mayStartEdges: i,
    ScrollerOf: s,
    onRubberEdgeStart: l,
    onRubberEdgeContinuation: c,
    onRubberEdgeFinish: d,
    onRubberEdgeCancellation: u
  } = e, p = t.disabled == !0, h = n === "output" && i && !p, f = K(null), g = hn({
    // "capability follows callback...
    ViewRef: f,
    Container: s,
    onlyFrom: ".dfp-port.output",
    // ...presence"
    onDragStart: h ? (
      // - disabled ports are not wired up
      ((m, C, k, L) => l(k, L))
    ) : void 0,
    onDragContinuation: h ? ((m, C, k, L, j) => c(k, L, j)) : void 0,
    onDragFinish: h ? ((m, C, k, L) => d(k, L)) : void 0,
    onDragCancellation: h ? (() => u()) : void 0
  });
  let x = "";
  return p && (x += " disabled"), h && (x += " draggable"), r != null && (x += " " + r), b`<${As} Class="dfp-port-wrapper"
      Value=${t.Label ?? String(t.Key)}
      Style="left:${o.x - fn}px; top:${o.y - fn}px"
    >
      <div class="dfp-port ${n}${x}"
        style="background-color:${a}"
        ref=${f} tabindex=${p ? -1 : 0}
        data-port-key=${t.Key}
        onPointerDown=${g}
      />
    </>`;
}
function nh(e) {
  const {
    SVGRef: t,
    PaneWidth: n,
    PaneHeight: o,
    Nodes: a,
    Edges: r,
    EdgeSelectionSet: i,
    DefaultEdgeColor: s,
    RubberEdge: l,
    LassoBox: c,
    GuideLines: d
  } = e, u = {};
  a.forEach((f) => {
    u[String(f.Key)] = f;
  });
  const p = (f, g) => {
    const x = ma(g);
    return {
      x: f.x + fn * x.x,
      y: f.y + fn * x.y
    };
  }, h = r.map((f) => {
    const g = u[String(f.Source?.NodeKey)], x = u[String(f.Target?.NodeKey)], m = (g?.OutputPorts ?? []).find(
      ($) => String($.Key) === String(f.Source?.PortKey)
    ), C = (x?.InputPorts ?? []).find(
      ($) => String($.Key) === String(f.Target?.PortKey)
    );
    if (m == null || C == null)
      return;
    const k = p(
      jn(g, m),
      m.Direction
    ), L = p(
      jn(x, C),
      C.Direction
    ), { Path: j, ArrowAngle: y } = oi(
      k,
      m.Direction,
      L,
      C.Direction
    ), w = f.Color ?? s, F = i.has(String(f.Key)), M = f.disabled == !0;
    return b`
        ${F && b`<path class="dfp-edge-halo" d=${j}/>`}
        <path class="dfp-edge${F ? " selected" : ""}${M ? " disabled" : ""}"
          data-edge-key=${f.Key} d=${j}
          stroke=${w} stroke-width="2"
        />
        <polygon class="dfp-arrowhead${M ? " disabled" : ""}"
          points="0,0 -${ei},${ti / 2} -${ei},-${ti / 2}"
          fill=${w}
          transform="translate(${L.x},${L.y}) rotate(${y})"
        />
      `;
  });
  return b`<svg class="dfp-edge-layer" ref=${t}
      width=${n} height=${o}
      viewBox="0 0 ${n} ${o}"
      xmlns="http://www.w3.org/2000/svg"
    >
      ${h}

      ${d != null && b`
        ${Array.from(d.vertical.entries()).map(
    ([f, g]) => b`<line
            class="dfp-guide ${g}"
            x1=${f} y1="0" x2=${f} y2=${o}
          />`
  )}
        ${Array.from(d.horizontal.entries()).map(
    ([f, g]) => b`<line
            class="dfp-guide ${g}"
            x1="0" y1=${f} x2=${n} y2=${f}
          />`
  )}
      `}

      ${l != null && b`<path class="dfp-rubber-edge"
        d=${oi(
    p(l.from, l.fromDirection),
    l.fromDirection,
    l.to
  ).Path}
      />`}

      ${c != null && b`<rect class="dfp-lasso"
        x=${c.x} y=${c.y}
        width=${c.Width} height=${c.Height}
      />`}
    </>`;
}
const oh = /* @__PURE__ */ Z("jcl-component.dataflow-process-view", `
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
      display:block; width:${2 * fn}px; height:${2 * fn}px;
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
function ah(e) {
  return $n(e) || Un(e) && (be(e.Type, ["user", "assistant"]) && $n(e.Text) || e.Type === "annotation" && Nt(e.Renderer));
}
function rh({ Renderer: e }) {
  return _(e);
}
function ih(e) {
  return _(() => {
    sh(), e = G(e);
    const t = S(e.Class) ?? "", n = ae(e.Style), o = ae(e.HelloMessage), a = V(e.Messages, (z) => $e(z, ah)) ?? [], r = S(e.Placeholder) ?? "type a message...", i = ke(e.Rows) ?? 3, s = ae(e.Value), l = S(e.SubmitLabel), c = Y(e.disabled) ?? !1, d = A(e.onInput), u = A(e.onValueInput), p = A(e.onSubmit), [h, f] = He(""), g = s != null, x = g ? s : h, m = K(void 0);
    function C(z) {
      g || f(z.target.value), N('legacyChatView callback "onInput"', d, z), N(
        'legacyChatView callback "onValueInput"',
        u,
        z.target.value,
        z
      );
    }
    function k(z) {
      z.key === "Enter" && !z.shiftKey && !c && (z.preventDefault(), L(z));
    }
    function L(z) {
      c || x.trim() === "" || (N(
        'legacyChatView callback "onSubmit"',
        p,
        x,
        z
      ), g || f(""), m.current?.focus());
    }
    const j = Yt(e.children), y = (z) => j.find((E) => E?.type === z), w = y(Ds), F = y(Is), M = w == null ? void 0 : G(w.props).Renderer, $ = F == null ? void 0 : G(F.props).Renderer, I = y(Ls), T = [];
    o != null && T.push({ Kind: "message", Text: o, isUser: !1, Index: -1 });
    let D = !1;
    return a.forEach((z, E) => {
      if (Un(z) && z.Type === "annotation")
        T.push({ Kind: "annotation", Renderer: z.Renderer, isUser: D, Index: E });
      else {
        const X = Un(z) ? z.Type === "user" : !D, Q = Un(z) ? z.Text : z;
        T.push({ Kind: "message", Text: Q, isUser: X, Index: E }), D = X;
      }
    }), b`<div class="jcl-component legacy-chatview ${t}"
        style=${n} ...${e.RestProps}
      >
        <div class="turns">
          ${T.map((z) => {
      if (z.Kind === "annotation")
        return b`<div class="turn ${z.isUser ? "from-user" : "from-assistant"}">
                <${rh} Renderer=${z.Renderer}/>
              </>`;
      const E = z.isUser ? M : $, X = E?.(z.Index);
      return b`<div class="turn ${z.isUser ? "from-user" : "from-assistant"}">
              <div class="bubble">${z.Text}</div>
              ${X == null ? "" : b`<div class="extra">${X}</div>`}
            </>`;
    })}
        </>
        <div class="footer">
          <textarea ref=${m}
            placeholder=${r} disabled=${c}
            rows=${i} value=${x}
            onInput=${C} onKeyDown=${k}
          />
          <div class="bottom-row">
            ${I ?? b`<div class="controls"/>`}
            <button class="submit" aria-label=${l ?? "send"}
              disabled=${c || x.trim() === ""}
              onClick=${L}
            >
              <span class="send-icon"/>
              ${l == null ? "" : b`<span>${l}</span>`}
            </>
          </>
        </>
      </>`;
  });
}
const sh = /* @__PURE__ */ Z("jcl-component.legacy-chatview", `
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
function Is(e) {
  return "";
}
function Ds(e) {
  return "";
}
function Ls(e) {
  return _(() => {
    lh(), e = G(e);
    const t = S(e.Class) ?? "", n = ae(e.Style);
    return b`<div class="controls ${t}"
        style=${n} ...${e.RestProps}
      >
        ${e.children}
      </>`;
  });
}
const lh = /* @__PURE__ */ Z("jcl-component.legacy-chatview-controls", `
    .jcl-component.legacy-chatview .controls {
      display:flex; align-items:center; flex-wrap:wrap;
      flex:1 1 auto;
      gap:6px;
    }
  `);
let ba, $o;
const ch = so(() => Promise.all([
  rt("jspreadsheet-ce"),
  rt("@jspreadsheet/formula")
]).then(([e, t]) => {
  ba = e.default ?? e, $o = t.default ?? t, dh();
})), ya = [];
function dh() {
  for (; ya.length > 0; )
    ar(ya.shift());
}
function ar(e) {
  return $o == null ? (ya.push(e), !0) : typeof $o?.setFormula != "function" ? (console.warn(
    '@jspreadsheet/formula: "setFormula" is unavailable - custom formulas could not be registered'
  ), !1) : ($o.setFormula(e), !0);
}
function uh(e, t) {
  Xt("formula name", e), Wt("formula function", t), ar({ [e.toUpperCase()]: t });
}
function ph(e) {
  yt("formula set", e);
  const t = /* @__PURE__ */ Object.create(null);
  for (const [n, o] of Object.entries(e))
    typeof o == "function" && (t[n.toUpperCase()] = o);
  ar(t);
}
function hh(e) {
  return _(() => {
    fh();
    const t = Mn(ch);
    e = G(e);
    const n = S(e.Class) ?? "", o = V(e.Data, (C) => Array.isArray(C)) ?? [[]], a = V(e.Columns, (C) => Array.isArray(C)), r = qt(e.minRows) ?? 5, i = qt(e.minColumns), s = Y(e.readonly) ?? !1, l = Y(e.disabled) ?? !1, c = A(e.onDataChange), d = A(e.onCellChange), u = A(e.onMount), p = A(e.onUnmount), h = K(null), f = K(void 0), g = K(o), x = K(e.Data), m = K({});
    return m.current = { onDataChange: c, onCellChange: d, onUnmount: p }, je(() => {
      if (!t)
        return;
      const C = h.current;
      if (C == null)
        return;
      const L = ba(C, {
        worksheets: [{
          data: g.current,
          columns: a,
          minDimensions: [i ?? a?.length ?? 4, r],
          onchange: (F, M, $, I, T) => {
            const D = f.current;
            g.current = D.getData(), N(
              'Spreadsheet callback "onCellChange"',
              m.current.onCellChange,
              $,
              I,
              T
            ), N(
              'Spreadsheet callback "onDataChange"',
              m.current.onDataChange,
              g.current
            );
          }
        }]
      })[0];
      f.current = L;
      const j = (F) => {
        const M = F.querySelector(
          "input, textarea"
        );
        if (M == null || M.value !== "")
          return;
        const $ = Number(F.getAttribute("data-x")), I = Number(F.getAttribute("data-y")), T = L.getValueFromCoords($, I);
        typeof T == "string" && T !== "" && (M.value = T);
      }, y = new MutationObserver((F) => {
        for (const M of F)
          for (const $ of M.addedNodes) {
            if (!($ instanceof HTMLElement) || $.tagName !== "INPUT" && $.tagName !== "TEXTAREA")
              continue;
            const I = $.closest("td[data-x][data-y]");
            I instanceof HTMLElement && j(I);
          }
      });
      return y.observe(C, { childList: !0, subtree: !0 }), N(
        'Spreadsheet callback "onMount"',
        u,
        {
          instance: L,
          getData: () => L.getData(),
          setData: (F) => {
            g.current = F, x.current = F, L.setData(F);
          },
          getCell: (F, M) => L.getValueFromCoords(F, M),
          setCell: (F, M, $) => {
            L.setValueFromCoords(F, M, $), g.current = L.getData();
          },
          focus: () => h.current?.querySelector("td")?.focus()
        }
      ), () => {
        y.disconnect(), N(
          'Spreadsheet callback "onUnmount"',
          m.current.onUnmount
        ), ba.destroy(C), f.current = void 0;
      };
    }, [t]), je(() => {
      const C = f.current;
      C != null && e.Data !== x.current && (x.current = e.Data, g.current = e.Data ?? [[]], C.setData(g.current));
    }), je(() => {
      const C = h.current;
      C != null && (C.style.opacity = l ? "0.5" : "", C.style.pointerEvents = s || l ? "none" : "");
    }, [s, l]), b`<div
        class="jcl-component spreadsheeteditor ${l ? "disabled" : ""} ${n}"
        ...${e.RestProps} ref=${h}
      />`;
  });
}
const fh = /* @__PURE__ */ Z("jcl-component.spreadsheeteditor", `
    .jcl-component.spreadsheeteditor {
      position:relative; overflow:auto;
      background:white; color:black;
      font-size:14px;
    }

    .jcl-component.spreadsheeteditor.disabled {
      opacity:0.6; pointer-events:none;
    }
  `), oa = "application/x-jcl-kanban-task+json";
function gh(e, t, n) {
  return e.Id != null ? "" + e.Id : er(e);
}
function mh(e, t, n, o = !1, a = "") {
  return typeof e.toHTML == "function" ? b`<div class="default" dangerouslySetInnerHTML=${{ __html: e.toHTML() }}/>` : b`<div class="default">
        <div class="title">${e.Title ?? "" + e}</>
        ${e.Description != null && b`<div class="description">${e.Description}</>`}
      </>`;
}
function bh(e, t) {
  return b`<div class="default">
      <div class="title">${e.Title ?? "" + e}</>
      <div class="count">${t.length}${e.Limit != null ? `/${e.Limit}` : ""}</>
    </>`;
}
function yh(e) {
  return _(() => {
    xh(), e = G(e);
    const t = S(e.Class) ?? "", n = V(e.Columns, (D) => $e(D, De)) ?? Se("Columns"), o = V(e.Tasks, (D) => $e(D, De)) ?? Se("Tasks"), a = S(e.Placeholder), r = A(e.KeyOfTask) ?? gh, i = A(e.TaskRenderer) ?? mh, s = A(e.ColumnHeaderRenderer) ?? bh, l = A(e.onTaskClick), c = A(e.onColumnClick), d = Y(e.allowsReorder) ?? !0, u = Y(e.allowsCrossColumnDrag) ?? !0, p = ke(e.SelectionLimit) ?? 1, h = A(e.TaskMayBeDropped), f = A(e.onTaskMove), g = d && f != null, x = u && f != null;
    ri(n, '"Columns"'), ri(o, '"Tasks"');
    const [m, C] = He({}), k = K([]);
    function L(D) {
      k.current = [...k.current, D];
    }
    function j(D) {
      const z = [];
      k.current.forEach((E) => {
        E.FromColumn.Id === D ? N(
          'KanbanBoard callback "onTaskMove"',
          f,
          E.Task,
          E.FromColumn,
          E.ToColumn,
          E.ToIndex
        ) : z.push(E);
      }), k.current = z;
    }
    const y = {};
    n.forEach((D) => {
      y[D.Id] = D;
    });
    const w = {};
    o.forEach((D, z) => {
      w[r(D, o, z)] = D;
    });
    function F(D) {
      return y[D.ColumnId];
    }
    function M(D) {
      return o.filter((z) => z.ColumnId === D);
    }
    function $(D, z) {
      const E = D.target.closest?.(".itemview");
      if (E?.Item == null)
        return z.length;
      const X = E.getBoundingClientRect().top + E.offsetHeight / 2, Q = D.clientY < X ? "before" : "after", pe = z.indexOf(E.Item);
      return pe < 0 ? z.length : pe + (Q === "before" ? 0 : 1);
    }
    function I(D) {
      x && D.dataTransfer?.types.includes(oa) && D.preventDefault();
    }
    function T(D, z) {
      return (E) => {
        if (!x)
          return;
        const X = E.dataTransfer?.getData(oa);
        if (X == null || X === "")
          return;
        let Q;
        try {
          Q = JSON.parse(X);
        } catch {
          return;
        }
        const pe = $(E, z);
        Q.forEach((q, J) => {
          const P = w[q];
          if (P == null)
            return;
          const ue = F(P);
          if (ue == null || ue === D)
            return;
          const Ce = pe + J;
          h != null && !Ke(
            'KanbanBoard callback "TaskMayBeDropped"',
            h,
            P,
            D,
            Ce
          ) || L({ Task: P, FromColumn: ue, ToColumn: D, ToIndex: Ce });
        });
      };
    }
    return b`<div class="jcl-component kanbanboard ${t}" ...${e.RestProps}>
        ${n.map((D) => {
      const z = M(D.Id), E = m[D.Id] ?? [];
      return b`<div class="column" key=${D.Id}
            onDragOver=${I} onDrop=${T(D, z)}
            onDragEnd=${() => j(D.Id)}
          >
            <div class="column-header" onClick=${(X) => N(
        'KanbanBoard callback "onColumnClick"',
        c,
        D,
        X
      )}>
              ${Ke(
        'KanbanBoard callback "ColumnHeaderRenderer"',
        s,
        D,
        z
      )}
            </div>
            <${Yi}
              Class="column-body"
              List=${z} Placeholder=${a}
              KeyOfListItem=${r} ListItemRenderer=${i}
              onListItemClick=${(X, Q, pe, q) => N('KanbanBoard callback "onTaskClick"', l, X, D, q)}
              selectedItems=${E} SelectionLimit=${p}
              onSelectionChange=${(X) => C(
        (Q) => ({ ...Q, [D.Id]: X })
      )}
              onListItemMove=${g ? (X, Q) => {
        Q.length !== 0 && Q.forEach((pe) => N(
          'KanbanBoard callback "onTaskMove"',
          f,
          pe,
          D,
          D,
          X.indexOf(pe)
        ));
      } : void 0}
              DragMIMEType=${x ? oa : void 0}
              SerializeListItems=${(X) => JSON.stringify(
        X.map((Q, pe) => r(Q, X, pe))
      )}
            />
          </>`;
    })}
      </>`;
  });
}
const xh = /* @__PURE__ */ Z("jcl-component.kanbanboard", `
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
let Ss;
const wh = so(() => rt("uqr").then((e) => {
  Ss = e.renderSVG;
})), vh = ["L", "M", "Q", "H"];
function Ch(e) {
  return _(() => {
    kh();
    const t = Mn(wh);
    e = G(e);
    const n = S(e.Class) ?? "", o = ae(e.Value) ?? Se("Value"), a = V(e.ECCLevel, (p) => be(p, [...vh])) ?? "M", r = ke(e.BorderWidth) ?? 1, i = To(e.minVersion, 1, 40) ?? 1, s = To(e.maxVersion, i, 40) ?? 40, l = mt(e.ForegroundColor) ?? "currentColor", c = mt(e.BackgroundColor) ?? "transparent", d = S(e.Label), u = Zt(() => t ? Ss(o, {
      ecc: a,
      border: r,
      minVersion: i,
      maxVersion: s,
      blackColor: l,
      whiteColor: c
    }) : "", [
      t,
      o,
      a,
      r,
      i,
      s,
      l,
      c
    ]);
    return b`<div
        class="jcl-component legacy-qrcode-view ${n}"
        role="img" aria-label=${d ?? o}
        dangerouslySetInnerHTML=${{ __html: u }}
        ...${e.RestProps}
      />`;
  });
}
const kh = /* @__PURE__ */ Z("jcl-component.qrcodeview", `
    .jcl-component.legacy-qrcode-view {
      display:inline-block; position:relative;
      width:160px; height:160px;
    }

    .jcl-component.legacy-qrcode-view > svg {
      display:block;
      width:100%; height:100%;
    }
  `), bn = /* @__PURE__ */ Z("jcl-component.styled-input", `
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
function Ms(e) {
  return _(() => {
    Xo(), e = G(e);
    const t = S(e.Class) ?? "", n = ae(e.Value), o = V(e.Variant, (s) => be(s, ["default", "destructive", "outline", "secondary", "ghost"])) ?? "default", a = V(e.Size, (s) => be(s, ["xs", "small", "normal", "large"])) ?? "normal", r = e.children, i = tt(a);
    return uo("button", `jcl-component styled-button variant-${o} ${i} ${t}`, void 0, e.RestProps, n, r);
  });
}
const Xo = /* @__PURE__ */ Z("jcl-component.styled-button", `
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
function xa(e) {
  return _(() => {
    jh(), e = G(e);
    const t = S(e.Class) ?? "", n = ae(e.Style);
    let o = V(e.Value, (f) => gn(f) || Ue(f));
    const a = V(e.Size, (f) => be(f, ["small", "normal", "large"])) ?? "normal", r = Y(e.disabled), i = A(e.onValueInput), s = A(e.onClick);
    o = o ?? ct;
    const { actualValue: l, actualDisabling: c } = Ze(o, r), d = l == !0, u = l == null || Ue(o), p = ie((f) => {
      if (Le(f, c), c == !0)
        return;
      N('styledCheckbox callback "onClick"', s, f);
      const g = f.target.checked;
      N(
        'styledCheckbox callback "onValueInput"',
        i,
        g,
        f
      );
    }, [c, s, i]), h = tt(a);
    return b`<div class="jcl-component styled-checkbox ${h} ${c ? "disabled" : ""} ${t}"
        style=${n}
      >
        <input type="checkbox"
          checked=${d} indeterminate=${u}
          disabled=${c} onClick=${p} ...${e.RestProps}
        />
      </>`;
  });
}
const jh = /* @__PURE__ */ Z("jcl-component.styled-checkbox", `
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
function Ts(e) {
  return _(() => {
    $h(), e = G(e);
    const t = S(e.Class) ?? "", n = ae(e.Style);
    let o = V(e.Value, (h) => gn(h) || Ue(h));
    const a = V(e.Size, (h) => be(h, ["small", "normal", "large"])) ?? "normal", r = Y(e.disabled), i = A(e.onValueInput), s = A(e.onClick);
    o = o ?? ct;
    const { actualValue: l, actualDisabling: c } = Ze(o, r), d = l == !0, u = ie((h) => {
      if (Le(h, c), c == !0)
        return;
      N('styledRadiobutton callback "onClick"', s, h);
      const f = h.target.checked;
      N(
        'styledRadiobutton callback "onValueInput"',
        i,
        f,
        h
      );
    }, [c, s, i]), p = tt(a);
    return b`<div class="jcl-component styled-radiobutton ${p} ${c ? "disabled" : ""} ${t}"
        style=${n}
      >
        <input type="radio" checked=${d} disabled=${c} onClick=${u} ...${e.RestProps}/>
      </>`;
  });
}
const $h = /* @__PURE__ */ Z("jcl-component.styled-radiobutton", `
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
function Ih(e) {
  return _(() => {
    Dh(), e = G(e);
    const t = S(e.Class) ?? "", n = ae(e.Style), o = Ge(e.Value), a = Ge(e.Min ?? e.Minimum), r = Ge(e.Low ?? e.lowerBound), i = Ge(e.Opt ?? e.Optimum), s = Ge(e.High ?? e.upperBound), l = Ge(e.Max ?? e.Maximum), c = V(e.Size, (u) => be(u, ["small", "normal", "large"])) ?? "normal", d = tt(c);
    return b`<div class="jcl-component styled-gauge ${d} ${t}" style=${n}>
        <meter
          value=${o} min=${a} low=${r} opt=${i}
          high=${s} max=${l} ...${e.RestProps}
        />
      </>`;
  });
}
const Dh = /* @__PURE__ */ Z("jcl-component.styled-gauge", `
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
function Lh(e) {
  return _(() => {
    Sh(), e = G(e);
    const t = S(e.Class) ?? "", n = ae(e.Style), o = Ge(e.Value), a = Ge(e.Max ?? e.Maximum), r = V(e.Size, (s) => be(s, ["small", "normal", "large"])) ?? "normal", i = tt(r);
    return b`<div class="jcl-component styled-progressbar ${i} ${t}" style=${n}>
        <progress value=${o} max=${a} ...${e.RestProps}/>
      </>`;
  });
}
const Sh = /* @__PURE__ */ Z("jcl-component.styled-progressbar", `
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
function Mh(e) {
  return _(() => {
    Th(), e = G(e);
    const t = S(e.Class) ?? "", n = ae(e.Style), o = V(e.Value, (I) => xt(I) || Ue(I)), a = Ge(e.Min ?? e.Minimum), r = V(e.Step, (I) => to(I, 0, 1 / 0, !1, !1)), i = Ge(e.Max ?? e.Maximum), s = V(e.Hashmarks, (I) => $e(I, Be)), l = V(e.Size, (I) => be(I, ["small", "normal", "large"])) ?? "normal", c = Y(e.disabled) ?? !1, d = A(e.onValueInput), u = A(e.onInput), p = A(e.onBlur), { ViewRef: h, shownValue: f, ValueToShow: g } = Pt(
      Ue(o) || o != null && !isNaN(o) ? o : ct
    ), { actualValue: x, actualDisabling: m } = Ze(g, c), C = et(), { _onInput: k, _onBlur: L } = en({
      Name: "styledSlider",
      actualDisabling: m,
      shownValue: f,
      onInput: u,
      onValueInput: d,
      onBlur: p,
      processedInput: (I) => {
        const T = f.current = parseFloat(I.target.value);
        return C(), T;
      }
    }), j = a ?? 0, y = i ?? 100;
    let w = 0;
    xt(x) && y > j && (w = Math.max(0, Math.min(
      100,
      (x - j) * 100 / (y - j)
    )));
    const { SuggestionId: F, SuggestionList: M } = tn(
      s,
      (I) => {
        const { Value: T, Label: D } = vt(I);
        return b`<option value=${T}>${D}</option>`;
      }
    ), $ = tt(l);
    return b`<div class="jcl-component styled-slider ${$} ${t}" style=${n}>
        <input type="range" ref=${h} disabled=${m}
          style="--jcl-slider-fill:${w}%"
          value=${x} min=${a} max=${i} step=${r}
          list=${F}
          onInput=${k} onBlur=${L} ...${e.RestProps}
        />${M}
      </>`;
  });
}
const Th = /* @__PURE__ */ Z("jcl-component.styled-slider", `
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
  `), Rh = /* @__PURE__ */ Ct({
  Name: "styledTextlineInput",
  InputType: "text",
  ClassName: "styled-textline-input",
  ValueIsValid: Be,
  withSpellChecking: !0,
  Styled: !0
}), Ah = /* @__PURE__ */ Ct({
  Name: "styledPasswordInput",
  InputType: "password",
  ClassName: "styled-password-input",
  ValueIsValid: Be,
  withSuggestions: !1,
  Styled: !0
});
function Fh(e) {
  return _(() => {
    bn(), e = G(e);
    const t = S(e.Class) ?? "", n = V(e.Value, (D) => xt(D) || Ue(D)), o = Y(e.invalid), a = S(e.Placeholder), r = Y(e.readonly), i = Ge(e.Min ?? e.Minimum), s = V(e.Step, (D) => to(D, 0, 1 / 0, !1, !1)), l = Ge(e.Max ?? e.Maximum), c = To(e.Digits, 0, 15), d = Y(e.withoutTrailingZeros) ?? !1, u = V(e.Suggestions, (D) => $e(D, xt)), p = V(e.Size, (D) => be(D, ["small", "normal", "large"])) ?? "normal", h = Y(e.disabled) ?? !1, f = A(e.onValueInput), g = A(e.onInput), x = A(e.onBlur);
    let m = s;
    if (c != null) {
      const D = Math.pow(10, -c);
      m = Math.max(s ?? D, D);
    }
    const { ViewRef: C, shownValue: k, ValueToShow: L } = Pt(
      Ue(n) || n != null && !isNaN(n) ? n : ct,
      (D) => (c != null && xt(D) && (D = D.toFixed(c), d && (D = parseFloat(D))), D)
    ), { actualValue: j, actualPlaceholder: y, actualDisabling: w } = Ze(L, h, a), { _onInput: F, _onBlur: M } = en({
      Name: "styledNumberInput",
      actualDisabling: w,
      shownValue: k,
      onInput: g,
      onValueInput: f,
      onBlur: x,
      processedInput: (D) => {
        const z = parseFloat(D.target.value);
        return k.current = isNaN(z) ? void 0 : z, k.current;
      }
    }), { SuggestionId: $, SuggestionList: I } = tn(u), T = tt(p);
    return b`<input type="number" ref=${C}
        class="jcl-component styled-input styled-number-input ${T} ${t} ${o ? "invalid" : ""}"
        value=${j} min=${i} max=${l} step=${m}
        readOnly=${r} placeholder=${y}
        disabled=${w} list=${$}
        aria-invalid=${o ? "true" : void 0}
        onInput=${F} onBlur=${M} ...${e.RestProps}
      />${I}`;
  });
}
const zh = /* @__PURE__ */ Ct({
  Name: "styledEMailAddressInput",
  InputType: "email",
  ClassName: "styled-emailaddress-input",
  ValueIsValid: qn,
  withMultiple: !0,
  Styled: !0
}), Oh = /* @__PURE__ */ Ct({
  Name: "styledPhoneNumberInput",
  InputType: "tel",
  ClassName: "styled-phonenumber-input",
  ValueIsValid: Eo,
  Styled: !0
}), Vh = /* @__PURE__ */ Ct({
  Name: "styledURLInput",
  InputType: "url",
  ClassName: "styled-url-input",
  ValueIsValid: at,
  Styled: !0
}), Eh = /* @__PURE__ */ At({
  Name: "styledTimeInput",
  InputType: "time",
  ClassName: "styled-time-input",
  ValueIsValid: Gi,
  Styled: !0
}), Nh = /* @__PURE__ */ At({
  Name: "styledDateTimeInput",
  InputType: "datetime-local",
  ClassName: "styled-datetime-input",
  ValueIsValid: Ki,
  Styled: !0
}), Bh = /* @__PURE__ */ At({
  Name: "styledDateInput",
  InputType: "date",
  ClassName: "styled-date-input",
  ValueIsValid: $t,
  Pattern: Ya,
  Styled: !0
}), Wh = /* @__PURE__ */ At({
  Name: "styledWeekInput",
  InputType: "week",
  ClassName: "styled-week-input",
  ValueIsValid: Ui,
  Pattern: Ja,
  Styled: !0
}), Hh = /* @__PURE__ */ At({
  Name: "styledMonthInput",
  InputType: "month",
  ClassName: "styled-month-input",
  ValueIsValid: Qa,
  Pattern: Za,
  Styled: !0
}), _h = /* @__PURE__ */ Ct({
  Name: "styledSearchInput",
  InputType: "search",
  ClassName: "styled-search-input",
  ValueIsValid: Be,
  withSpellChecking: !0,
  Styled: !0
});
function Gh(e) {
  return _(() => {
    bn(), Kh(), e = G(e);
    const t = S(e.Class) ?? "", n = ae(e.Style), o = V(e.Value, (m) => Xn(m) || Ue(m)), a = Y(e.readonly), r = V(e.Suggestions, (m) => $e(m, Xn));
    let i = ke(e.minWidth);
    const s = V(e.Size, (m) => be(m, ["small", "normal", "large"])) ?? "normal", l = Y(e.disabled) ?? !1, c = A(e.onValueInput), d = A(e.onInput), { actualValue: u, actualDisabling: p } = Ze(o, l), h = ie((m) => {
      if (Le(m), p == !0)
        return;
      N('styledColorInput callback "onInput"', d, m);
      const C = m.target.value;
      N(
        'styledColorInput callback "onValueInput"',
        c,
        C,
        m
      );
    }, [p, d, c]), { SuggestionId: f, SuggestionList: g } = tn(r);
    i == null && (i = 40 + (r != null && r.length > 0 ? 20 : 0));
    const x = tt(s);
    return b`<input type="color" class="jcl-component styled-input styled-color-input ${x} ${t}"
        style="min-width:${i}px; ${n}"
        value=${u} list=${f}
        disabled=${p} onInput=${h} ...${e.RestProps}
      />${g}`;
  });
}
const Kh = /* @__PURE__ */ Z("jcl-component.styled-color-input", `
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
function Uh(e) {
  return _(() => {
    bn(), qh(), e = G(e);
    const t = S(e.Class) ?? "", n = V(e.Value, (p) => Be(p) || Ue(p)), o = V(e.Options, (p) => $e(p, Be)) ?? Se("Options"), a = V(e.Size, (p) => be(p, ["small", "normal", "large"])) ?? "normal", r = Y(e.disabled) ?? !1, i = A(e.onValueInput), s = A(e.onInput), { actualValue: l, actualDisabling: c } = Ze(n, r), d = ie((p) => {
      if (Le(p), c == !0)
        return;
      N('styledDropDown callback "onInput"', s, p);
      let h = p.target.value;
      N(
        'styledDropDown callback "onValueInput"',
        i,
        h,
        p
      );
    }, [c, s, i]), u = tt(a);
    return b`<div class="jcl-component styled-dropdown ${t}">
        <select class="jcl-component styled-input ${u}"
          disabled=${c} onInput=${d} ...${e.RestProps}
        >${o.map(
      (p) => {
        const {
          Value: h,
          Label: f,
          disabled: g,
          isRuler: x
        } = vt(p);
        return x ? b`<hr/>` : b`<option value=${h}
                  selected=${h === l} disabled=${g}
                >${f}</option>`;
      }
    )}</select>
      </>`;
  });
}
const qh = /* @__PURE__ */ Z("jcl-component.styled-dropdown", `
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
      ${No}
      ${ft}
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
function Xh(e) {
  return _(() => {
    bn(), Yh(), e = G(e);
    const t = S(e.Class) ?? "", n = ae(e.Style), o = V(e.Value, (m) => Be(m) || Ue(m)), a = S(e.Placeholder), r = Y(e.multiple), i = S(e.Accept), s = V(e.Size, (m) => be(m, ["small", "normal", "large"])) ?? "normal", l = Y(e.disabled) ?? !1, c = A(e.onValueInput), d = A(e.onInput), u = o ?? ct, { actualValue: p, actualPlaceholder: h, actualDisabling: f } = Ze(u, l, a), g = ie((m) => {
      if (Le(m), f == !0)
        return;
      N('styledFileInput callback "onInput"', d, m);
      let C = Array.from(m.target.files);
      N(
        'styledFileInput callback "onValueInput"',
        c,
        C,
        m
      ), m.target.value = "";
    }, [f, d, c]), x = tt(s);
    return b`<label class="jcl-component styled-input styled-file-input ${x} ${t} ${f ? "disabled" : ""}"
        style=${n}
      >
        ${p == null ? b`<span class="placeholder">${h ?? ""}</span>` : b`<span>${p}</span>`}
        <input type="file" style="display:none"
          multiple=${r} accept=${i}
          disabled=${f} onInput=${g} ...${e.RestProps}
        />
      </label>`;
  });
}
const Yh = /* @__PURE__ */ Z("jcl-component.styled-file-input", `
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
function Jh(e) {
  return _(() => {
    bn(), Zh(), e = G(e);
    const t = S(e.Class) ?? "", n = ae(e.Style), o = V(e.Value, (M) => $n(M) || Ue(M)), a = Y(e.invalid), r = S(e.Placeholder), i = Y(e.readonly), s = ke(e.minLength), l = ke(e.maxLength), c = Y(e.wrap), d = V(e.Resizability, (M) => be(M, ["none", "horizontal", "vertical", "both"])), u = Y(e.SpellCheck), p = Y(e.disabled) ?? !1, h = A(e.onValueInput), f = A(e.onInput), g = A(e.onBlur), { ViewRef: x, shownValue: m, ValueToShow: C } = Pt(o), { actualValue: k, actualPlaceholder: L, actualDisabling: j } = Ze(C, p, r), { _onInput: y, _onBlur: w } = en({
      Name: "styledTextInput",
      actualDisabling: j,
      shownValue: m,
      onInput: f,
      onValueInput: h,
      onBlur: g
    }), F = Dt();
    return b`<textarea class="jcl-component styled-input styled-text-input ${t} ${a ? "invalid" : ""}"
        key=${F} ref=${x}
        style="${c == !0 ? "overflow-wrap:break-word; hyphens:auto;" : "white-space:pre;"} resize:${d ?? "none"}; ${n}"
        value=${k} minlength=${s} maxlength=${l}
        readOnly=${i} placeholder=${L}
        spellcheck=${u} disabled=${j}
        aria-invalid=${a ? "true" : void 0}
        onInput=${y} onBlur=${w} ...${e.RestProps}
      />`;
  });
}
const Zh = /* @__PURE__ */ Z("jcl-component.styled-text-input", `
    .jcl-component.styled-text-input {
      height:auto; min-height:64px;      /* shadcn "Textarea" uses "min-h-16" */
      padding:8px 12px;
    }
  `);
function Rs(e, t, n, o) {
  const a = S(n.Class) ?? "", r = ae(n.Style), i = mt(n.Color), s = pn(n.Label), l = Y(n.active) ?? !1, c = Y(n.disabled) ?? !1, d = V(n.Variant, (g) => be(g, ["default", "destructive", "outline", "secondary", "ghost"])) ?? "ghost", u = V(n.Size, (g) => be(g, ["xs", "small", "normal", "large"])) ?? "normal", p = A(n.onClick), h = ie((g) => {
    if (c)
      return nn(g);
    N(e + ' callback "onClick"', p, g);
  }, [c, p]), f = tt(u);
  return b`<button
      class="jcl-component styled-button ${t} variant-${d} ${f} ${l ? "active" : ""} ${a}"
      style=${r} disabled=${c}
      aria-label=${s} aria-pressed=${l ? "true" : void 0}
      onClick=${h} ...${n.RestProps}
    >${o(i)}</>`;
}
function Qh(e) {
  return _(() => {
    Xo(), Ph(), e = G(e);
    const t = mn(e.Value) ?? `${So}/circle-information.png`;
    return Rs(
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
const Ph = /* @__PURE__ */ Z("jcl-component.styled-icon", `
    .jcl-component.styled-icon {
      width:36px; height:36px; padding:0px;
    }

    .jcl-component.styled-icon > span {
      display:inline-block; width:16px; height:16px;
      overflow:hidden; pointer-events:none;
      ${ft}
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
function ef(e) {
  return _(() => {
    Xo(), tf(), e = G(e);
    const t = V(
      e.Value,
      (n) => be(n, qa)
    ) ?? "fa-question-circle-o";
    return Rs(
      "styledFAIcon",
      "styled-fa-icon",
      e,
      (n) => b`<span class="fa ${t}" style="color:${n ?? "currentColor"}"/>`
    );
  });
}
const tf = /* @__PURE__ */ Z("jcl-component.styled-fa-icon", `
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
function Ht(e, t, n) {
  return _(() => {
    n = G(n);
    const o = S(n.Class) ?? "", a = ae(n.Style);
    return b`<${e} class="jcl-component ${t} ${o}"
        style=${a} ...${n.RestProps}
      >
        ${n.children}
      </>`;
  });
}
function uo(e, t, n, o, a, r) {
  return a == null ? b`<${e} class="${t}" style=${n} ...${o}>
        ${r}
      </>` : b`<${e} class="${t}" style=${n} ...${o}
        dangerouslySetInnerHTML=${{ __html: a }}
      />`;
}
function nf(e) {
  return _(() => {
    of(), e = G(e);
    const t = S(e.Class) ?? "", n = ae(e.Value), o = V(e.Variant, (r) => be(r, ["default", "destructive", "outline", "secondary"])) ?? "default", a = e.children;
    return uo("span", `jcl-component styled-badge variant-${o} ${t}`, void 0, e.RestProps, n, a);
  });
}
const of = /* @__PURE__ */ Z("jcl-component.styled-badge", `
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
function af(e) {
  return _(() => {
    rf(), e = G(e);
    const t = S(e.Class) ?? "", n = ae(e.Style), o = mt(e.Color), a = S(e.Label) ?? "Loading", r = V(e.Size, (s) => be(s, ["small", "normal", "large"])) ?? "normal", i = tt(r);
    return b`<svg class="jcl-component styled-spinner ${i} ${t}"
        style=${n} role="status" aria-label=${a}
        viewBox="0 0 24 24" fill="none" stroke=${o ?? "currentColor"}
        stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
        ...${e.RestProps}
      ><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>`;
  });
}
const rf = /* @__PURE__ */ Z("jcl-component.styled-spinner", `
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
function sf(e) {
  return _(() => {
    lf(), e = G(e);
    const t = S(e.Class) ?? "", n = ae(e.Value), o = e.children;
    return uo("kbd", `jcl-component styled-kbd ${t}`, void 0, e.RestProps, n, o);
  });
}
const lf = /* @__PURE__ */ Z("jcl-component.styled-kbd", `
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
function cf(e) {
  return _(() => {
    df(), e = G(e);
    const t = S(e.Class) ?? "", n = ae(e.Style), o = mn(e.Value), a = S(e.Alt), r = S(e.Fallback), i = V(e.Size, (h) => be(h, ["small", "normal", "large"])) ?? "normal", [s, l] = He(!1), c = K(void 0);
    c.current !== o && (c.current = o, s && l(!1));
    const d = ie(() => l(!0), []), u = o != null && !s, p = tt(i);
    return b`<div class="jcl-component styled-avatar ${p} ${t}"
        style=${n} ...${e.RestProps}
      >
        ${u ? b`<img src=${o} alt=${a} onError=${d}/>` : b`<span>${r ?? ""}</span>`}
      </>`;
  });
}
const df = /* @__PURE__ */ Z("jcl-component.styled-avatar", `
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
function uf(e) {
  return _(() => {
    pf(), e = G(e);
    const t = S(e.Class) ?? "", n = ae(e.Style);
    return b`<div class="jcl-component styled-skeleton ${t}"
        style=${n} aria-hidden="true" ...${e.RestProps}
      />`;
  });
}
const pf = /* @__PURE__ */ Z("jcl-component.styled-skeleton", `
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
function As(e) {
  return _(() => {
    hf(), e = G(e);
    const t = S(e.Class) ?? "", n = ae(e.Style), o = ae(e.Value) ?? Se("Value"), a = V(e.Placement, (x) => be(x, ["top", "bottom", "left", "right"])) ?? "top", r = ke(e.Delay), i = st(ht), s = r ?? i?.TooltipDelay ?? 600, l = Dt(), [c, d] = He(!1), u = K(void 0);
    function p() {
      u.current != null && (clearTimeout(u.current), u.current = void 0);
    }
    function h() {
      p(), u.current = setTimeout(() => d(!0), s);
    }
    function f() {
      p(), d(!0);
    }
    function g() {
      p(), d(!1);
    }
    return je(() => p, []), b`<span class="jcl-component styled-tooltip ${t}"
        style=${n} aria-describedby=${c ? l : void 0}
        onMouseEnter=${h} onMouseLeave=${g}
        onFocusIn=${f} onFocusOut=${g}
        ...${e.RestProps}
      >
        ${e.children}
        ${c && b`<div class="tooltip placement-${a}"
          id=${l} role="tooltip"
        >${o}</div>`}
      </>`;
  });
}
const hf = /* @__PURE__ */ Z("jcl-component.styled-tooltip", `
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
function rr(e) {
  const { ComponentName: t, Name: n, NamePrefix: o, onOpenChange: a, OverlayFor: r } = e, i = Dt(), s = n ?? o + i, l = K(void 0), { openOverlay: c, closeOverlay: d, OverlayIsOpen: u } = Rn();
  function p() {
    if (u(s)) {
      d(s);
      return;
    }
    const h = l.current, f = h?.closest(".jcl-component.overlay-base");
    (h == null || f == null) && ce(
      `MissingOverlayBase: "${t}" must be used within an "OverlayBase"`
    ), c({
      Name: s,
      isModal: !1,
      ...r(h, f),
      onOpen: () => N(
        t + ' callback "onOpenChange"',
        a,
        !0
      ),
      onClose: () => N(
        t + ' callback "onOpenChange"',
        a,
        !1
      )
    });
  }
  return { OverlayName: s, ViewRef: l, closeOverlay: d, _onClick: p };
}
function Fs(e) {
  return _(() => {
    ff(), e = G(e);
    const t = S(e.Class) ?? "", n = ae(e.Style), o = S(e.Name), a = A(e.Renderer) ?? Se("Renderer"), r = V(e.Placement, (u) => be(u, ["top", "bottom", "left", "right"])) ?? "bottom", i = ke(e.Width) ?? 288, s = ke(e.Height), l = A(e.onOpenChange), { ViewRef: c, _onClick: d } = rr({
      ComponentName: "styledPopover",
      Name: o,
      NamePrefix: "styled-popover-",
      onOpenChange: l,
      /**** compute the overlay position from the trigger geometry ****/
      OverlayFor: (u, p) => {
        const h = u.getBoundingClientRect(), f = p.getBoundingClientRect(), g = h.left - f.left + p.scrollLeft, x = h.top - f.top + p.scrollTop;
        let m, C;
        switch (!0) {
          case (r === "top" && s != null):
            m = g + h.width / 2 - i / 2, C = x - s - 4;
            break;
          case r === "left":
            m = g - i - 4, C = x + (s == null ? 0 : h.height / 2 - s / 2);
            break;
          case r === "right":
            m = g + h.width + 4, C = x + (s == null ? 0 : h.height / 2 - s / 2);
            break;
          default:
            m = g + h.width / 2 - i / 2, C = x + h.height + 4;
        }
        return {
          Renderer: () => b`<div class="jcl-component styled-popover-panel">
              ${a({})}
            </>`,
          OffsetX: m,
          OffsetY: C,
          Width: i,
          Height: s
        };
      }
    });
    return b`<span ref=${c}
        class="jcl-component styled-popover ${t}"
        style=${n} onClick=${d} ...${e.RestProps}
      >
        ${e.children}
      </>`;
  });
}
const ff = /* @__PURE__ */ Z("jcl-component.styled-popover", `
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
function gf(e) {
  return _(() => {
    yn(), e = G(e);
    const t = S(e.Class) ?? "", n = ae(e.Style), o = S(e.Name), a = A(e.Renderer) ?? Se("Renderer"), r = A(e.onOpenChange), { OverlayName: i, ViewRef: s, closeOverlay: l, _onClick: c } = rr({
      ComponentName: "styledDropDownMenu",
      Name: o,
      NamePrefix: "styled-dropdown-menu-",
      onOpenChange: r,
      /**** the menu panel opens below the trigger, left-aligned ****/
      OverlayFor: (u, p) => {
        const h = u.getBoundingClientRect(), f = p.getBoundingClientRect(), g = h.left - f.left + p.scrollLeft, x = h.top - f.top + p.scrollTop + h.height + 4;
        return {
          Renderer: () => b`<div class="jcl-component styled-dropdown-menu-panel"
              role="menu" onClick=${d}
            >
              ${a({})}
            </>`,
          OffsetX: g,
          OffsetY: x,
          minWidth: 128
        };
      }
    });
    function d(u) {
      const p = u.target.closest(".styled-dropdown-menu-item");
      p != null && !p.disabled && l(i);
    }
    return b`<span ref=${s}
        class="jcl-component styled-dropdown-menu ${t}"
        style=${n} onClick=${c} ...${e.RestProps}
      >
        ${e.children}
      </>`;
  });
}
function mf(e) {
  return _(() => {
    yn(), e = G(e);
    const t = S(e.Class) ?? "", n = S(e.Icon), o = S(e.Shortcut), a = V(e.Variant, (l) => be(l, ["default", "destructive"])) ?? "default", r = Y(e.disabled) ?? !1, i = A(e.onClick), s = ie((l) => {
      if (r)
        return nn(l);
      N('styledDropDownMenuItem callback "onClick"', i, l);
    }, [r, i]);
    return b`<button role="menuitem"
        class="styled-dropdown-menu-item variant-${a} ${t}"
        disabled=${r} onClick=${s} ...${e.RestProps}
      >
        ${n == null ? "" : b`<span class="icon" aria-hidden="true">${n}</>`}
        ${e.children}
        ${o == null ? "" : b`<span class="shortcut">${o}</span>`}
      </>`;
  });
}
function bf(e) {
  return _(() => {
    yn(), e = G(e);
    const t = S(e.Class) ?? "";
    return b`<div class="styled-dropdown-menu-separator ${t}"
        role="separator" aria-hidden="true" ...${e.RestProps}
      />`;
  });
}
function yf(e) {
  return _(() => {
    yn(), e = G(e);
    const t = S(e.Class) ?? "", n = S(e.Label);
    return b`<div class="styled-dropdown-menu-group ${t}"
        role="group" ...${e.RestProps}
      >
        ${n == null ? "" : b`<div class="label">${n}</div>`}
        ${e.children}
      </>`;
  });
}
function xf(e) {
  return _(() => {
    yn(), e = G(e);
    const t = S(e.Class) ?? "", n = S(e.Icon), o = S(e.Label) ?? Se("Label"), a = Y(e.disabled) ?? !1, [r, i] = He(!1), s = ie((l) => {
      Le(l), a || i((c) => !c);
    }, [a]);
    return b`<div class="styled-dropdown-menu-submenu ${t}"
        onMouseEnter=${a ? void 0 : () => i(!0)}
        onMouseLeave=${() => i(!1)}
        ...${e.RestProps}
      >
        <button class="submenu-trigger" aria-haspopup="menu"
          aria-expanded=${r ? "true" : "false"}
          disabled=${a} onClick=${s}
        >
          ${n == null ? "" : b`<span class="icon" aria-hidden="true">${n}</>`}
          <span>${o}</span>
          <span class="chevron"/>
        </>
        ${r && b`<div class="submenu-panel" role="menu">
          ${e.children}
        </>`}
      </>`;
  });
}
const yn = /* @__PURE__ */ Z("jcl-component.styled-dropdown-menu", `
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
      ${Bo}
      ${ft}
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
  `), zs = /* @__PURE__ */ Jt("");
function wf(e) {
  return _(() => {
    Yo(), e = G(e);
    const t = A(e.Renderer) ?? Se("Renderer"), n = S(e.Placeholder) ?? "type a command or search...", o = S(e.EmptyText) ?? "no results found", [a, r] = He(""), i = K(void 0);
    function s(l) {
      const c = i.current;
      if (c == null)
        return;
      const d = Array.from(
        c.querySelectorAll(".styled-command-item:not([disabled])")
      );
      if (d.length === 0)
        return;
      const u = d.findIndex(
        (h) => h.classList.contains("highlighted")
      );
      function p(h) {
        u >= 0 && d[u].classList.remove("highlighted"), d[h].classList.add("highlighted"), d[h].scrollIntoView({ block: "nearest" });
      }
      switch (!0) {
        case l.key === "ArrowDown":
          l.preventDefault(), p(Math.min(u + 1, d.length - 1));
          break;
        case l.key === "ArrowUp":
          l.preventDefault(), p(Math.max(u - 1, 0));
          break;
        case l.key === "Enter":
          u >= 0 && (l.preventDefault(), d[u].click());
      }
    }
    return b`<div class="panel" ref=${i}>
        <div class="search">
          <span class="search-icon"/>
          <input type="text" autofocus
            value=${a} placeholder=${n}
            onInput=${(l) => r(l.target.value)}
            onKeyDown=${s}
          />
        </>
        <div class="list">
          <${zs.Provider} value=${a}>
            ${t({ Filter: a })}
          </>
        </>
        <div class="empty">${o}</div>
      </>`;
  });
}
function vf(e) {
  return _(() => {
    Yo(), e = G(e);
    const t = S(e.Class) ?? "", n = ae(e.Style), o = S(e.Name), a = A(e.Renderer) ?? Se("Renderer"), r = S(e.Placeholder), i = S(e.EmptyText), s = ke(e.Width) ?? 512, l = A(e.onOpenChange), { OverlayName: c, ViewRef: d, closeOverlay: u, _onClick: p } = rr({
      ComponentName: "styledCommandPalette",
      Name: o,
      NamePrefix: "styled-command-palette-",
      onOpenChange: l,
      /**** the palette opens horizontally centered, at 15% from the top ****/
      OverlayFor: (f, g) => {
        const x = g.scrollLeft + Math.max(0, (g.clientWidth - s) / 2), m = g.scrollTop + g.clientHeight * 0.15;
        return {
          Renderer: () => b`<div class="jcl-component styled-command-palette"
              onClick=${h}
            >
              <${wf}
                Renderer=${a} Placeholder=${r} EmptyText=${i}
              />
            </>`,
          OffsetX: x,
          OffsetY: m,
          Width: s
        };
      }
    });
    function h(f) {
      const g = f.target.closest(".styled-command-item");
      g != null && !g.disabled && u(c);
    }
    return b`<span ref=${d}
        class="jcl-component styled-command-palette-trigger ${t}"
        style=${n} onClick=${p} ...${e.RestProps}
      >
        ${e.children}
      </>`;
  });
}
function Cf(e) {
  return _(() => {
    Yo(), yn(), e = G(e);
    const t = S(e.Class) ?? "", n = S(e.Icon), o = S(e.Value) ?? Se("Value"), a = S(e.Keywords), r = S(e.Shortcut), i = Y(e.disabled) ?? !1, s = A(e.onClick), l = st(zs);
    if (l.trim() !== "" && !(o + " " + (a ?? "")).toLowerCase().includes(l.toLowerCase().trim()))
      return "";
    const c = ie((u) => {
      if (i)
        return nn(u);
      N('styledCommandItem callback "onClick"', s, u);
    }, [i, s]), d = Yt(e.children);
    return b`<button role="option"
        class="styled-command-item ${t}"
        disabled=${i} onClick=${c}
      >
        ${n == null ? "" : b`<span class="icon" aria-hidden="true">${n}</>`}
        ${d.length === 0 ? o : d}
        ${r == null ? "" : b`<span class="shortcut">${r}</span>`}
      </>`;
  });
}
function kf(e) {
  return _(() => {
    Yo(), yn(), e = G(e);
    const t = S(e.Class) ?? "", n = S(e.Label);
    return b`<div class="styled-command-group ${t}" role="group"
        ...${e.RestProps}
      >
        ${n == null ? "" : b`<div class="label">${n}</div>`}
        ${e.children}
      </>`;
  });
}
const Yo = /* @__PURE__ */ Z("jcl-component.styled-command-palette", `
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
      ${ft}
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
function jf(e) {
  return _(() => {
    $f(), e = G(e);
    const t = S(e.Class) ?? "", n = ae(e.Style), o = S(e.Title), a = ae(e.Description), r = V(e.Variant, (c) => be(c, ["default", "info", "success", "warning", "destructive"])) ?? "default", i = Y(e.closable) ?? !0, s = st(Ai), l = ie((c) => {
      Le(c), s?.closeToast(s.Name);
    }, [s]);
    return b`<div class="jcl-component styled-toast variant-${r} ${t}"
        style=${n} ...${e.RestProps}
      >
        ${r === "default" ? "" : b`<span class="icon"/>`}
        <div class="body">
          ${o == null ? "" : b`<div class="title">${o}</div>`}
          ${a == null ? "" : b`<div class="description">${a}</div>`}
          ${e.children}
        </>
        ${i && b`<button class="close" aria-label="close"
          onClick=${l}
        />`}
      </>`;
  });
}
const $f = /* @__PURE__ */ Z("jcl-component.styled-toast", `
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
      ${ft}
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
function If(e) {
  return Df(), Ht("div", "styled-card", e);
}
const Df = /* @__PURE__ */ Z("jcl-component.styled-card", `
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
function Lf(e) {
  return Jo(), Ht("div", "styled-card-header", e);
}
function Sf(e) {
  return Jo(), Ht("div", "styled-card-action", e);
}
function Mf(e) {
  return Jo(), Ht("div", "styled-card-content", e);
}
function Tf(e) {
  return Jo(), Ht("div", "styled-card-footer", e);
}
const Jo = /* @__PURE__ */ Z("jcl-component.styled-card-parts", `
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
function Rf(e) {
  return _(() => {
    Os(), e = G(e);
    const t = S(e.Class) ?? "", n = ae(e.Value), o = e.children;
    return uo("div", `jcl-component styled-card-title ${t}`, void 0, e.RestProps, n, o);
  });
}
function Af(e) {
  return _(() => {
    Os(), e = G(e);
    const t = S(e.Class) ?? "", n = ae(e.Value), o = e.children;
    return uo("div", `jcl-component styled-card-description ${t}`, void 0, e.RestProps, n, o);
  });
}
const Os = /* @__PURE__ */ Z("jcl-component.styled-card-texts", `
    .jcl-component.styled-card-title {
      font-weight:600; line-height:1;
    }

    .jcl-component.styled-card-description {
      font-size:14px;
      color:var(--jcl-muted-fg-color,#737373);
    }
  `);
function Ff(e) {
  return _(() => {
    zf(), e = G(e);
    const t = S(e.Class) ?? "", n = ae(e.Style), o = V(e.Side, (f) => be(f, ["left", "right"])) ?? "left", a = V(e.Variant, (f) => be(f, ["default", "floating", "inset"])) ?? "default";
    let r = V(e.collapsible, (f) => gn(f) || be(f, ["none", "icon", "offcanvas"])) ?? "icon";
    const i = Y(e.overlaid) ?? !1;
    let s = Y(e.collapsed);
    const l = A(e.onCollapseChange);
    switch (r) {
      // booleans remain supported, but are
      case !0:
        r = "icon";
        break;
      // mapped onto modes
      case !1:
        r = "none";
    }
    const c = r !== "none", d = et(), u = jt(s, !1);
    s = u.current;
    const p = ie((f) => {
      Le(f);
      const g = !u.current;
      u.current = g, d(), N(
        'styledSidebar callback "onCollapseChange"',
        l,
        g
      );
    }, [l, d]), h = `jcl-component styled-sidebar side-${o} variant-${a} ` + (c ? `collapsible collapse-${r} ` : "") + (i && c ? "overlaid " : "") + (s && c ? "collapsed " : "") + t;
    return b`<aside class="${h}" style=${n} ...${e.RestProps}>
        ${c && b`<button class="collapse-button"
          aria-label=${s ? "expand sidebar" : "collapse sidebar"}
          aria-expanded=${s ? "false" : "true"}
          onClick=${p}
        ><span class="chevron"/></>`}
        ${e.children}
      </>`;
  });
}
const zf = /* @__PURE__ */ Z("jcl-component.styled-sidebar", `
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
      ${ft}
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
function Of(e) {
  return ir(), Ht("div", "styled-sidebar-header", e);
}
function Vf(e) {
  return ir(), Ht("div", "styled-sidebar-content", e);
}
function Ef(e) {
  return ir(), Ht("div", "styled-sidebar-footer", e);
}
const ir = /* @__PURE__ */ Z("jcl-component.styled-sidebar-sections", `
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
function Nf(e) {
  return _(() => {
    sr(), e = G(e);
    const t = S(e.Class) ?? "", n = S(e.Icon), o = ae(e.Value), a = Y(e.active) ?? !1, r = Y(e.disabled) ?? !1, i = A(e.onClick), s = e.children, l = ie((d) => {
      if (r)
        return nn(d);
      N('styledSidebarItem callback "onClick"', i, d);
    }, [r, i]), c = "jcl-component styled-sidebar-item " + (a ? "active " : "") + t;
    return b`<button class="${c}" disabled=${r}
        aria-current=${a ? "true" : void 0}
        onClick=${l} ...${e.RestProps}
      >
        ${n == null ? "" : b`<span class="icon" aria-hidden="true">${n}</>`}
        ${o == null ? b`<span class="label">${s}</>` : b`<span class="label" dangerouslySetInnerHTML=${{ __html: o }}/>`}
      </>`;
  });
}
function Bf(e) {
  return _(() => {
    sr(), e = G(e);
    const t = S(e.Class) ?? "", n = ae(e.Style);
    return b`<div class="jcl-component styled-sidebar-separator ${t}"
        style=${n} role="separator" aria-hidden="true" ...${e.RestProps}
      />`;
  });
}
function Wf(e) {
  return _(() => {
    sr(), e = G(e);
    const t = S(e.Class) ?? "", n = ae(e.Style), o = S(e.Label);
    return b`<div class="jcl-component styled-sidebar-group ${t}"
        style=${n} ...${e.RestProps}
      >
        ${o == null ? "" : b`<div class="label">${o}</div>`}
        ${e.children}
      </>`;
  });
}
const sr = /* @__PURE__ */ Z("jcl-component.styled-sidebar-parts", `
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
function Hf(e) {
  return _(() => {
    _f(), e = G(e);
    const t = S(e.Class) ?? "", n = ae(e.Style), o = S(e.Label), a = ae(e.Description), r = ae(e.Error), i = S(e.for), s = V(e.Orientation, (u) => be(u, ["vertical", "horizontal"])) ?? "vertical", l = Y(e.required) ?? !1, c = Y(e.disabled) ?? !1, d = r != null && r.trim() !== "";
    return b`<div role="group"
        class="jcl-component styled-field ${s === "horizontal" ? "horizontal" : ""} ${d ? "invalid" : ""} ${c ? "disabled" : ""} ${t}"
        style=${n} ...${e.RestProps}
      >
        ${o == null ? "" : b`<label for=${i}
          class=${l ? "required" : void 0}
        >${o}</label>`}
        ${e.children}
        ${a == null ? "" : b`<p class="description">${a}</p>`}
        ${d ? b`<div class="error" role="alert">${r}</div>` : ""}
      </>`;
  });
}
const _f = /* @__PURE__ */ Z("jcl-component.styled-field", `
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
function Gf(e) {
  return _(() => {
    Vs(), e = G(e);
    const t = S(e.Class) ?? "", n = ae(e.Style);
    return b`<div role="group"
        class="jcl-component styled-input-group ${t}"
        style=${n} ...${e.RestProps}
      >
        ${e.children}
      </>`;
  });
}
function Kf(e) {
  return _(() => {
    Vs(), e = G(e);
    const t = S(e.Class) ?? "", n = ae(e.Style), o = V(e.align ?? e.Alignment, (r) => be(r, ["start", "end", "top", "bottom"])) ?? "start", a = ie((r) => {
      if (r.target.closest("button") != null)
        return;
      r.currentTarget.parentElement?.querySelector("input, textarea, select")?.focus();
    }, []);
    return b`<div role="group"
        class="jcl-component styled-input-group-addon align-${o} ${t}"
        style=${n} onClick=${a} ...${e.RestProps}
      >
        ${e.children}
      </>`;
  });
}
const Vs = /* @__PURE__ */ Z("jcl-component.styled-input-group", `
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
function Uf(e) {
  return _(() => {
    qf(), e = G(e);
    const t = S(e.Class) ?? "", n = ae(e.Style);
    let o = V(e.Value, (h) => gn(h) || Ue(h));
    const a = V(e.Size, (h) => be(h, ["small", "normal", "large"])) ?? "normal", r = Y(e.disabled), i = A(e.onValueInput), s = A(e.onClick);
    o = o ?? ct;
    const { actualValue: l, actualDisabling: c } = Ze(o, r), d = l == !0, u = ie((h) => {
      if (Le(h, c), c == !0)
        return;
      N('styledSwitch callback "onClick"', s, h);
      const f = h.target.checked;
      N(
        'styledSwitch callback "onValueInput"',
        i,
        f,
        h
      );
    }, [c, s, i]), p = tt(a);
    return b`<div class="jcl-component styled-switch ${p} ${c ? "disabled" : ""} ${t}"
        style=${n}
      >
        <input type="checkbox" role="switch"
          checked=${d} disabled=${c}
          onClick=${u} ...${e.RestProps}
        />
      </>`;
  });
}
const qf = /* @__PURE__ */ Z("jcl-component.styled-switch", `
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
function Es(e) {
  return _(() => {
    Ns(), e = G(e);
    const t = S(e.Class) ?? "", n = ae(e.Style), o = S(e.Value), a = V(e.Options, (d) => $e(d, Be)) ?? Se("Options"), r = V(e.Size, (d) => be(d, ["small", "normal", "large"])) ?? "normal", i = Y(e.disabled) ?? !1, s = A(e.onValueInput), l = ie((d, u) => {
      Le(u), N(
        'styledMultiSwitch callback "onValueInput"',
        s,
        d,
        u
      );
    }, [s]), c = tt(r);
    return b`<div role="radiogroup"
        class="jcl-component styled-multi-switch ${c} ${t}"
        style=${n} ...${e.RestProps}
      >
        ${a.map((d) => {
      const {
        Value: u,
        Label: p,
        disabled: h
      } = vt(d), f = be(p, qa);
      return b`<button type="button" role="radio"
            class="option ${u === o ? "selected" : ""}"
            aria-checked=${u === o} aria-label=${u}
            disabled=${i || h}
            onClick=${(g) => l(u, g)}
          >${f ? b`<span class="fa ${p}"/>` : b`<span>${p}</span>`}</>`;
    })}
      </>`;
  });
}
function Xf(e) {
  return _(() => {
    Ns(), e = G(e);
    const t = S(e.Class) ?? "", n = ae(e.Style), o = V(e.Size, (i) => be(i, ["small", "normal", "large"])) ?? "normal", { Theme: a, setTheme: r } = Go();
    return b`<${Es}
        Class=${t} Style=${n} Size=${o}
        Options=${["auto:fa-adjust", "light:fa-sun-o", "dark:fa-moon-o"]}
        Value=${a}
        onValueInput=${(i) => r(i)}
        ...${e.RestProps}
      />`;
  });
}
const Ns = /* @__PURE__ */ Z("jcl-component.styled-multi-switch", `
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
function Yf(e) {
  return _(() => {
    Jf(), e = G(e);
    const t = S(e.Class) ?? "", n = ae(e.Style), o = S(e.Value), a = V(e.Options, (d) => $e(d, Be)) ?? Se("Options"), r = V(e.Orientation, (d) => be(d, ["vertical", "horizontal"])) ?? "vertical", i = V(e.Size, (d) => be(d, ["small", "normal", "large"])) ?? "normal", s = Y(e.disabled) ?? !1, l = A(e.onValueInput), c = ie((d, u) => {
      N(
        'styledRadioGroup callback "onValueInput"',
        l,
        d,
        u
      );
    }, [l]);
    return b`<div role="radiogroup"
        class="jcl-component styled-radio-group ${r === "horizontal" ? "horizontal" : ""} ${t}"
        style=${n} ...${e.RestProps}
      >
        ${a.map((d) => {
      const {
        Value: u,
        Label: p,
        disabled: h
      } = vt(d);
      return b`<label class="option">
            <${Ts} Size=${i}
              value=${u === o} disabled=${s || h}
              onClick=${(f) => c(u, f)}
            />
            <span>${p}</span>
          </label>`;
    })}
      </>`;
  });
}
const Jf = /* @__PURE__ */ Z("jcl-component.styled-radio-group", `
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
function Zf(e) {
  return _(() => {
    Qf(), Pf(), e = G(e);
    const t = S(e.Class) ?? "", n = ae(e.Style), o = S(e.Value), a = V(e.Options, (P) => $e(P, Be)) ?? Se("Options"), r = S(e.Placeholder), i = S(e.EmptyText) ?? "no items found", s = V(e.Size, (P) => be(P, ["small", "normal", "large"])) ?? "normal", l = Y(e.disabled) ?? !1, c = A(e.onValueInput), d = a.map((P) => {
      const { Value: ue, Label: Ce } = vt(P);
      return { Value: ue, Label: Ce };
    }), u = (P) => d.find((ue) => ue.Value === P)?.Label, [p, h] = He(!1), [f, g] = He(void 0), [x, m] = He(-1), C = K(), k = et(), L = f ?? u(o) ?? "", j = f == null || f.trim() === "" ? d : d.filter(
      (P) => P.Label.toLowerCase().includes(f.toLowerCase().trim())
    ), y = st(ht), w = io(_o), F = y ?? w, { Theme: M, SwatchSet: $, Locale: I, Direction: T } = F, D = ro(M, $);
    je(() => {
      if (p)
        return window.addEventListener("scroll", k, !0), window.addEventListener("resize", k), () => {
          window.removeEventListener("scroll", k, !0), window.removeEventListener("resize", k);
        };
    }, [p]);
    function z() {
      !p && !l && (h(!0), m(-1));
    }
    function E() {
      h(!1), g(void 0), m(-1);
    }
    function X(P, ue) {
      Le(ue), E(), N(
        'styledCombobox callback "onValueInput"',
        c,
        P.Value,
        ue
      );
    }
    function Q(P) {
      l || (g(P.target.value), h(!0), m(0));
    }
    function pe(P) {
      switch (!0) {
        case P.key === "ArrowDown":
          P.preventDefault(), z(), m(Math.min(x + 1, j.length - 1));
          break;
        case P.key === "ArrowUp":
          P.preventDefault(), m(Math.max(x - 1, 0));
          break;
        case P.key === "Enter":
          p && x >= 0 && x < j.length && X(j[x], P);
          break;
        case P.key === "Escape":
          E();
      }
    }
    function q() {
      const P = C.current;
      if (P == null)
        return;
      const ue = P.getBoundingClientRect(), Ce = window.innerHeight - ue.bottom - 8, Ve = ue.top - 8, _e = Ce < 160 && Ve > Ce, nt = Math.max(
        40,
        Math.min(240, _e ? Ve : Ce)
      ), ot = _e ? `left:${ue.left}px; bottom:${window.innerHeight - ue.top + 4}px;` : `left:${ue.left}px; top:${ue.bottom + 4}px;`;
      return Dn(b`
          <${ht.Provider} value=${F}>
            <div class="jcl-combobox-popup" role="listbox"
              dir=${T} lang=${I}
              style="
                ${ot} width:${ue.width}px;
                max-height:${nt}px;
                ${D}
              "
            >
              ${j.length === 0 ? b`<div class="empty">${i}</div>` : j.map((te, ee) => b`<div
                    class="option ${ee === x ? "highlighted" : ""} ${te.Value === o ? "selected" : ""}"
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
    const J = tt(s);
    return b`<div class="jcl-component styled-combobox ${t}" style=${n}>
        <input type="text" class="jcl-component styled-input ${J}"
          role="combobox" aria-expanded=${p} aria-autocomplete="list"
          value=${L} placeholder=${r} disabled=${l}
          ref=${C}
          onClick=${z} onInput=${Q} onKeyDown=${pe}
          onBlur=${E} ...${e.RestProps}
        />
        ${p && q()}
      </>`;
  });
}
const Qf = /* @__PURE__ */ Z("jcl-component.styled-combobox", `
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
      ${No}
      ${ft}
    }
  `), Pf = /* @__PURE__ */ Z("jcl-combobox-popup", `
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
      ${pc}
      ${ft}
    }

    .jcl-combobox-popup > .empty {
      padding:6px 8px;
      font-size:14px; text-align:center;
      color:var(--jcl-muted-fg-color,#737373);
    }
  `);
function eg(e) {
  return _(() => {
    tg(), e = G(e);
    const t = S(e.Class) ?? "", n = ae(e.Style), o = S(e.Name), a = V(e.Value, $t), r = V(e.Min ?? e.Minimum, $t), i = V(e.Max ?? e.Maximum, $t), s = S(e.Placeholder) ?? "pick a date", l = Y(e.disabled) ?? !1, c = A(e.onValueInput), d = A(e.onOpenChange), u = Dt(), p = o ?? "styled-date-picker-" + u, { closeOverlay: h } = Rn(), f = st(ht)?.Locale ?? "en";
    let g = "";
    if (a != null) {
      const [C, k, L] = a.split("-").map(Number);
      g = new Intl.DateTimeFormat(f, { dateStyle: "medium" }).format(new Date(C, k - 1, L));
    }
    const x = () => b`<${dr}
        Value=${a} Min=${r} Max=${i}
        onValueInput=${(C, k) => {
      h(p), N(
        'styledDatePicker callback "onValueInput"',
        c,
        C,
        k
      );
    }}
      />`, m = b`<${Ms} Variant="outline"
        Class="styled-date-picker-trigger" disabled=${l}
      >
        <span class="calendar-icon"/>
        ${a == null ? b`<span class="placeholder">${s}</span>` : b`<span>${g}</span>`}
      </>`;
    return l ? b`<span class="jcl-component styled-date-picker ${t}" style=${n}>
          ${m}
        </>` : b`<${Fs}
        Class="styled-date-picker ${t}" Style=${n}
        Name=${p} Renderer=${x} Width=${262}
        onOpenChange=${d}
      >
        ${m}
      </>`;
  });
}
const tg = /* @__PURE__ */ Z("jcl-component.styled-date-picker", `
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
      ${ft}
    }

  /**** the month view needs no extra panel padding ****/

    .jcl-component.styled-popover-panel:has(.styled-month-view) {
      padding:0px;
    }
  `);
function ng(e) {
  return _(() => {
    og(), e = G(e);
    const t = S(e.Class) ?? "";
    let n = ke(e.activeIndex);
    const o = ke(e.GapIndex), a = V(e.Variant, (h) => be(h, ["default", "line"])) ?? "default", r = Y(e.accented) ?? !1, i = Y(e.disabled) ?? !1, s = A(e.onActivationChange), l = et(), c = jt(n, 0);
    n = c.current;
    const d = ie((h, f) => {
      if (i)
        return nn(f);
      c.current = h, l(), N('styledTabStrip callback "onActivationChange"', s, h);
    }, [i, s, l]), u = ie((h, f) => {
      (f.key === "Enter" || f.key === " ") && (f.preventDefault(), d(h, f));
    }, [d]), p = Yt(e.children).filter((h) => h?.type != null || typeof h == "number" || typeof h == "string" && h.trim() !== "");
    return b`<div
        class="jcl-component styled-tabstrip variant-${a} ${r ? "accented" : ""} ${i ? "disabled" : ""} ${t}"
        role="tablist" aria-disabled=${i ? "true" : void 0}
        ...${e.RestProps}
      >
        ${p.map((h, f) => {
      const g = f === o ? b`<div class="gap"/>` : "", x = f === n;
      return b`${g}<div
            class="${x ? "active" : ""} ${i ? "disabled" : ""} tab"
            role="tab" aria-selected=${x ? "true" : "false"}
            tabIndex=${i || x ? -1 : 0}
            onClick=${x ? void 0 : (m) => d(f, m)}
            onKeyDown=${x ? void 0 : (m) => u(f, m)}
          >${h}</>`;
    })}
      </>`;
  });
}
const og = /* @__PURE__ */ Z("jcl-component.styled-tabstrip", `
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
function ag(e) {
  return _(() => {
    rg(), e = G(e);
    const t = S(e.Class) ?? "", n = ae(e.Style), o = V(e.Items, (s) => $e(s, Be)) ?? Se("Items"), a = A(e.onItemClick), r = ie((s, l) => {
      Le(l), N('styledBreadcrumb callback "onItemClick"', a, s, l);
    }, [a]), i = o.length - 1;
    return b`<nav class="jcl-component styled-breadcrumb ${t}"
        style=${n} aria-label="breadcrumb" ...${e.RestProps}
      ><ol>
        ${o.map((s, l) => {
      const { Value: c, Label: d } = vt(s), u = d === "..." ? b`<li class="ellipsis" role="presentation" aria-hidden="true">…</li>` : l === i ? b`<li><span role="link" aria-disabled="true" aria-current="page">${d}</span></li>` : b`<li><a href="#" onClick=${(p) => r(c, p)}>${d}</a></li>`;
      return l === 0 ? u : b`<li class="separator" role="presentation" aria-hidden="true"></li>${u}`;
    })}
      </ol></nav>`;
  });
}
const rg = /* @__PURE__ */ Z("jcl-component.styled-breadcrumb", `
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
      ${Bo}
      ${ft}
    }
  `);
function Bs(e) {
  return _(() => {
    Xo(), ig(), e = G(e);
    const t = S(e.Class) ?? "", n = ae(e.Style), o = ke(e.Value) ?? 1, a = ke(e.Count) ?? Se("Count"), r = Y(e.accented) ?? !1, i = Y(e.disabled) ?? !1, s = A(e.onValueInput), l = Math.min(Math.max(1, o), a), c = r ? "default" : "outline", d = ie((p, h) => {
      Le(h), N(
        'styledPagination callback "onValueInput"',
        s,
        p,
        h
      );
    }, [s]), u = [];
    if (a <= 7)
      for (let p = 1; p <= a; p++)
        u.push(p);
    else {
      u.push(1), l > 3 && u.push("...");
      const p = Math.max(2, l - 1), h = Math.min(a - 1, l + 1);
      for (let f = p; f <= h; f++)
        u.push(f);
      l < a - 2 && u.push("..."), u.push(a);
    }
    return b`<nav role="navigation" aria-label="pagination"
        class="jcl-component styled-pagination ${t}"
        style=${n} ...${e.RestProps}
      ><ul>
        <li><button
          class="jcl-component styled-button variant-ghost page"
          aria-label="go to previous page"
          disabled=${i || l <= 1}
          onClick=${(p) => d(l - 1, p)}
        ><span class="chevron-left"/></></li>

        ${u.map((p) => p === "..." ? b`<li><span class="ellipsis" aria-hidden="true">…</span></li>` : b`<li><button
              class="jcl-component styled-button variant-${p === l ? c : "ghost"} page"
              aria-current=${p === l ? "page" : void 0}
              disabled=${i}
              onClick=${p === l ? void 0 : (h) => d(p, h)}
            >${p}</></li>`)}

        <li><button
          class="jcl-component styled-button variant-ghost page"
          aria-label="go to next page"
          disabled=${i || l >= a}
          onClick=${(p) => d(l + 1, p)}
        ><span class="chevron-right"/></></li>
      </ul></nav>`;
  });
}
const ig = /* @__PURE__ */ Z("jcl-component.styled-pagination", `
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
      ${ft}
    }

    .jcl-component.styled-pagination .chevron-left {
      ${Da}
    }

    .jcl-component.styled-pagination .chevron-right {
      ${Bo}
    }
  `);
function sg(e) {
  return Ht("div", "styled-accordion", e);
}
function lg(e) {
  return _(() => {
    cg(), e = G(e);
    const t = S(e.Class) ?? "", n = S(e.Header) ?? Se("Header");
    let o = Y(e.expanded);
    const a = Y(e.disabled) ?? !1, r = A(e.onExpansionChange), i = et(), s = Dt(), l = s + "-fold-header", c = s + "-fold-content", d = jt(o, !1);
    o = d.current;
    const u = ie((p) => {
      if (Le(p), a)
        return;
      const h = !d.current;
      d.current = h, i(), N('styledAccordionFold callback "onExpansionChange"', r, h);
    }, [a, r, i]);
    return b`<div
        class="jcl-component styled-accordion-fold ${a ? "disabled" : ""} ${t}"
        ...${e.RestProps}
      >
        <button class="trigger" id=${l}
          aria-expanded=${o ? "true" : "false"} aria-controls=${c}
          disabled=${a}
          onClick=${u}
        >
          <span class="title">${n}</span>
          <span class="chevron"/>
        </>
        ${o ? b`<div
          id=${c} class="content"
          role="region" aria-labelledby=${l}
        >${e.children}</>` : ""}
      </>`;
  });
}
const cg = /* @__PURE__ */ Z("jcl-component.styled-accordion", `
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
      ${No}
      ${ft}
    }

    .jcl-component.styled-accordion-fold > .trigger[aria-expanded="true"] > .chevron {
      transform:rotate(180deg);
    }

    .jcl-component.styled-accordion-fold > .content {
      padding:0px 0px 16px 0px;
      font-size:14px;
    }
  `);
function Ws(e) {
  return _(() => {
    dg(), e = G(e);
    const t = S(e.Class) ?? "", n = ae(e.Style), o = S(e.Caption), a = ke(e.maxHeight), r = Y(e.striped) ?? !1, i = (a == null ? "" : "max-height:" + a + "px; ") + (n ?? "");
    return b`<div class="jcl-component styled-table-container ${t}"
        style=${i} ...${e.RestProps}
      >
        <table class="styled-table ${r ? "striped" : ""}">
          ${o == null ? "" : b`<caption>${o}</caption>`}
          ${e.children}
        </table>
      </>`;
  });
}
const dg = /* @__PURE__ */ Z("jcl-component.styled-table", `
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
function lr(e, t) {
  return function(o) {
    return _(() => {
      o = G(o);
      const a = S(o.Class) ?? "", r = ae(o.Style);
      return b`<${e} class="${t} ${a}"
          style=${r} ...${o.RestProps}
        >${o.children}</>`;
    });
  };
}
const Hs = /* @__PURE__ */ lr("thead", "styled-table-header"), _s = /* @__PURE__ */ lr("tbody", "styled-table-body"), ug = /* @__PURE__ */ lr("tfoot", "styled-table-footer");
function Io(e) {
  return _(() => {
    cr(), e = G(e);
    const t = S(e.Class) ?? "", n = ae(e.Style), o = Y(e.selected) ?? !1, a = A(e.onClick);
    return b`<tr class="styled-table-row ${o ? "selected" : ""} ${a == null ? "" : "clickable"} ${t}"
        style=${n} aria-selected=${o ? "true" : void 0}
        onClick=${a} ...${e.RestProps}
      >${e.children}</>`;
  });
}
function wa(e) {
  return _(() => {
    cr(), e = G(e);
    const t = S(e.Class) ?? "", n = ae(e.Style), o = V(e.align ?? e.Alignment, (i) => be(i, ["left", "center", "right"])), a = ke(e.Width), r = (o == null ? "" : "text-align:" + o + "; ") + (a == null ? "" : "width:" + a + "px; ") + (n ?? "");
    return b`<th class="styled-table-head ${t}"
        style=${r} ...${e.RestProps}
      >${e.children}</>`;
  });
}
function Do(e) {
  return _(() => {
    cr(), e = G(e);
    const t = S(e.Class) ?? "", n = ae(e.Style), o = V(e.align ?? e.Alignment, (r) => be(r, ["left", "center", "right"])), a = (o == null ? "" : "text-align:" + o + "; ") + (n ?? "");
    return b`<td class="styled-table-cell ${t}"
        style=${a} ...${e.RestProps}
      >${e.children}</>`;
  });
}
const cr = /* @__PURE__ */ Z("jcl-component.styled-table-parts", `
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
function pg(e) {
  return _(() => {
    hg(), e = G(e);
    const t = S(e.Class) ?? "", n = ae(e.Style), o = V(e.Columns, (J) => $e(J, (P) => Be(P) || De(P))) ?? Se("Columns"), a = V(e.Data, (J) => $e(J, De)) ?? Se("Data");
    let r = S(e.SortKey), i = V(e.SortOrder, (J) => be(J, ["ascending", "descending"]));
    const s = Y(e.selectable) ?? !1, l = Y(e.striped) ?? !1;
    let c = V(e.Selection, ci);
    const d = ke(e.PageSize);
    let u = ke(e.Page);
    const p = ke(e.maxHeight), h = S(e.EmptyText) ?? "no entries", f = Y(e.disabled) ?? !1, g = A(e.onSortChange), x = A(e.onSelectionChange), m = A(e.onPageChange), C = A(e.onRowClick), k = et(), L = o.map((J) => {
      if (!Be(J))
        return J;
      const { Value: P, Label: ue } = vt(J);
      return { Key: P, Label: ue };
    }), j = jt(r), y = jt(i, "ascending");
    r = j.current, i = y.current;
    const w = ie((J, P) => {
      Le(P), j.current === J.Key ? y.current = y.current === "ascending" ? "descending" : "ascending" : (j.current = J.Key, y.current = "ascending"), k(), N(
        'styledDataTable callback "onSortChange"',
        g,
        j.current,
        y.current
      );
    }, [g, k]), F = jt(c, []);
    c = F.current;
    function M(J, P) {
      F.current = J, k(), N(
        'styledDataTable callback "onSelectionChange"',
        x,
        J,
        P
      );
    }
    function $(J, P) {
      M(
        c.includes(J) ? c.filter((ue) => ue !== J) : [...c, J],
        P
      );
    }
    function I(J) {
      const P = a.filter((ue) => c.includes(ue)).length;
      M(P === a.length ? [] : [...a], J);
    }
    const T = st(ht)?.Locale ?? "en", D = (J, P) => String(J ?? "").localeCompare(String(P ?? ""), T);
    let z = [...a];
    if (r != null) {
      const P = L.find((Ce) => Ce.Key === r)?.Comparator ?? D, ue = i === "descending" ? -1 : 1;
      z.sort((Ce, Ve) => ue * P(Ce[r], Ve[r]));
    }
    const E = d == null ? 1 : Math.max(1, Math.ceil(z.length / d)), X = jt(u, 1);
    u = Math.min(Math.max(1, X.current), E);
    const Q = ie((J, P) => {
      X.current = J, k(), N(
        'styledDataTable callback "onPageChange"',
        m,
        J,
        P
      );
    }, [m, k]);
    d != null && (z = z.slice((u - 1) * d, u * d));
    const pe = a.filter((J) => c.includes(J)).length, q = L.length + (s ? 1 : 0);
    return b`<div class="jcl-component styled-data-table ${t}" style=${n}
        ...${e.RestProps}
      >
        <${Ws} maxHeight=${p} striped=${l}>
          <${Hs}>
            <${Io}>
              ${s && b`<${wa} Width=${36} onClick=${Le}>
                <${xa}
                  value=${pe === 0 ? !1 : pe === a.length ? !0 : null}
                  disabled=${f} onValueInput=${(J, P) => I(P)}
                />
              </>`}
              ${L.map((J) => b`<${wa}
                Align=${J.Align} Width=${J.Width}
              >${J.sortable == !0 ? b`<button class="sorter" disabled=${f}
                      onClick=${(P) => w(J, P)}
                    >
                      <span>${J.Label ?? J.Key}</span>
                      <span class="indicator ${r === J.Key ? i : ""}"/>
                    </>` : J.Label ?? J.Key}</>`)}
            </>
          </>
          <${_s}>
            ${z.length === 0 ? b`<${Io}>
                  <${Do} Class="empty" colspan=${q}>${h}</>
                </>` : z.map((J) => b`<${Io}
                  selected=${c.includes(J)}
                  onClick=${C == null ? void 0 : (P) => N(
      'styledDataTable callback "onRowClick"',
      C,
      J,
      P
    )}
                >
                  ${s && b`<${Do} onClick=${Le}>
                    <${xa}
                      value=${c.includes(J)} disabled=${f}
                      onValueInput=${(P, ue) => $(J, ue)}
                    />
                  </>`}
                  ${L.map((P) => b`<${Do} Align=${P.Align}>
                    ${P.Renderer != null ? P.Renderer(J) : J[P.Key]}
                  </>`)}
                </>`)}
          </>
        </>
        ${d != null && E > 1 && b`<${Bs}
          Value=${u} Count=${E} disabled=${f}
          onValueInput=${Q}
        />`}
      </>`;
  });
}
const hg = /* @__PURE__ */ Z("jcl-component.styled-data-table", `
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
      ${ft}
      ${No}
    }

    .jcl-component.styled-data-table .sorter > .indicator.ascending {
      opacity:1;
      ${uc}
    }

    .jcl-component.styled-data-table .sorter > .indicator.descending {
      opacity:1;
    }
  `);
function dr(e) {
  return _(() => {
    Gs(), fg(), e = G(e);
    const t = S(e.Class) ?? "", n = ae(e.Style), o = V(e.Value, $t);
    let a = V(e.Month, Qa);
    const r = V(e.Min ?? e.Minimum, $t), i = V(e.Max ?? e.Maximum, $t), s = Y(e.disabled) ?? !1, l = A(e.onValueInput), c = A(e.onMonthChange), d = et(), u = (T) => T.getFullYear() + "-" + String(T.getMonth() + 1).padStart(2, "0") + "-" + String(T.getDate()).padStart(2, "0"), p = u(/* @__PURE__ */ new Date()), h = o != null ? o.slice(0, 7) : p.slice(0, 7), f = jt(a, h);
    a = f.current;
    const [g, x] = a.split("-").map(Number), m = ie((T, D) => {
      Le(D);
      const [z, E] = f.current.split("-").map(Number), X = new Date(z, E - 1 + T, 1), Q = X.getFullYear() + "-" + String(X.getMonth() + 1).padStart(2, "0");
      f.current = Q, d(), N(
        'styledMonthView callback "onMonthChange"',
        c,
        Q
      );
    }, [c, d]), C = ie((T, D) => {
      Le(D), N(
        'styledMonthView callback "onValueInput"',
        l,
        T,
        D
      );
    }, [l]), k = st(ht)?.Locale ?? "en";
    let L = 1;
    try {
      const T = new Intl.Locale(k);
      L = (T.getWeekInfo?.() ?? T.weekInfo)?.firstDay ?? 1;
    } catch {
    }
    const j = new Intl.DateTimeFormat(k, { month: "long", year: "numeric" }), y = new Intl.DateTimeFormat(k, { weekday: "short" }), w = [];
    for (let T = 0; T < 7; T++) {
      const D = (L - 1 + T) % 7;
      w.push(
        // 2024-01-01 was a Monday
        y.format(new Date(2024, 0, 1 + D))
      );
    }
    const F = new Date(g, x - 1, 1), $ = ((F.getDay() + 6) % 7 - (L - 1) + 7) % 7, I = [];
    for (let T = 0; T < 42; T++) {
      const D = new Date(g, x - 1, 1 - $ + T), z = u(D);
      I.push({
        ISODate: z,
        Day: D.getDate(),
        inMonth: D.getMonth() === x - 1,
        isDisabled: s || r != null && z < r || i != null && z > i
      });
    }
    return b`<div class="jcl-component styled-calendar-view styled-month-view ${t}"
        style=${n} ...${e.RestProps}
      >
        <div class="header">
          <button class="nav" aria-label="go to previous month"
            disabled=${s} onClick=${(T) => m(-1, T)}
          ><span class="chevron-left"/></>
          <div class="caption">${j.format(F)}</div>
          <button class="nav" aria-label="go to next month"
            disabled=${s} onClick=${(T) => m(1, T)}
          ><span class="chevron-right"/></>
        </>
        <div class="grid" role="grid">
          ${w.map((T) => b`<div class="weekday">${T}</div>`)}
          ${I.map((T) => b`<button
            class="day ${T.inMonth ? "" : "outside"} ${T.ISODate === o ? "selected" : ""} ${T.ISODate === p ? "today" : ""}"
            aria-selected=${T.ISODate === o ? "true" : void 0}
            disabled=${T.isDisabled}
            onClick=${(D) => C(T.ISODate, D)}
          >${T.Day}</>`)}
        </>
      </>`;
  });
}
const Gs = /* @__PURE__ */ Z("jcl-component.styled-calendar-view", `
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
      ${ft}
    }
    .jcl-component.styled-calendar-view .chevron-left {
      ${Da}
    }
    .jcl-component.styled-calendar-view .chevron-right {
      ${Bo}
    }

  /**** multi-month views hide the navigation of their inner month views ****/

    .jcl-component.styled-calendar-view .styled-month-view > .header > .nav {
      display:none;
    }
    .jcl-component.styled-calendar-view .styled-month-view > .header {
      justify-content:center;
    }
  `), fg = /* @__PURE__ */ Z("jcl-component.styled-month-view", `
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
function Ks(e) {
  const {
    Name: t,
    ClassName: n,
    PeriodKey: o,
    ValueIsPeriod: a,
    defaultPeriodFor: r,
    shiftedPeriod: i,
    CaptionFor: s,
    MonthsOf: l,
    withOrientation: c = !1,
    ensureStyles: d
  } = e, u = "on" + o + "Change";
  return function(h) {
    return _(() => {
      Gs(), d?.(), h = G(h);
      const f = S(h.Class) ?? "", g = ae(h.Style), x = V(h.Value, $t);
      let m = V(h[o], a);
      const C = V(h.Min ?? h.Minimum, $t), k = V(h.Max ?? h.Maximum, $t), L = c ? V(h.Orientation, (X) => be(X, ["horizontal", "vertical"])) ?? "horizontal" : void 0, j = Y(h.disabled) ?? !1, y = A(h.onValueInput), w = A(h[u]), F = et(), M = (/* @__PURE__ */ new Date()).toLocaleDateString("sv"), $ = r(x ?? M), I = jt(m, $);
      m = I.current;
      const T = ie((X, Q) => {
        Le(Q);
        const pe = i(I.current, X);
        I.current = pe, F(), N(
          t + ' callback "' + u + '"',
          w,
          pe
        );
      }, [w, F]), D = ie((X, Q) => {
        N(
          t + ' callback "onValueInput"',
          y,
          X,
          Q
        );
      }, [y]), z = l(m), E = n + (c ? ` orientation-${L}` : "");
      return b`<div class="jcl-component styled-calendar-view ${E} ${f}"
          style=${g} ...${h.RestProps}
        >
          <div class="header">
            <button class="nav" aria-label=${"go to previous " + o.toLowerCase()}
              disabled=${j} onClick=${(X) => T(-1, X)}
            ><span class="chevron-left"/></>
            <div class="caption">${s(m)}</div>
            <button class="nav" aria-label=${"go to next " + o.toLowerCase()}
              disabled=${j} onClick=${(X) => T(1, X)}
            ><span class="chevron-right"/></>
          </>
          <div class="months">
            ${z.map((X) => b`<${dr}
              Value=${x} Month=${X} Min=${C} Max=${k}
              disabled=${j} onValueInput=${D}
            />`)}
          </>
        </>`;
    });
  };
}
const gg = "\\d{4}-Q[1-4]", mg = /* @__PURE__ */ Ln(gg);
function bg(e) {
  return Bt(e, mg);
}
const yg = (e) => e.slice(0, 4) + "-Q" + (Math.floor((Number(e.slice(5, 7)) - 1) / 3) + 1), xg = /* @__PURE__ */ Z("jcl-component.styled-quarter-view", `
    .jcl-component.styled-quarter-view > .months {
      display:flex; flex-flow:row nowrap; align-items:flex-start;
      gap:8px;
    }

    .jcl-component.styled-quarter-view.orientation-vertical > .months {
      flex-flow:column nowrap; align-items:center;
    }
  `), wg = /* @__PURE__ */ Ks({
  Name: "styledQuarterView",
  ClassName: "styled-quarter-view",
  PeriodKey: "Quarter",
  ValueIsPeriod: bg,
  defaultPeriodFor: yg,
  shiftedPeriod: (e, t) => {
    const n = Number(e.slice(0, 4)), o = Number(e.slice(6)), a = n * 4 + (o - 1) + t;
    return Math.floor(a / 4) + "-Q" + (a % 4 + 1);
  },
  CaptionFor: (e) => "Q" + e.slice(6) + " " + e.slice(0, 4),
  MonthsOf: (e) => {
    const t = Number(e.slice(0, 4)), n = Number(e.slice(6)), o = [];
    for (let a = 0; a < 3; a++) {
      const r = (n - 1) * 3 + 1 + a;
      o.push(t + "-" + String(r).padStart(2, "0"));
    }
    return o;
  },
  withOrientation: !0,
  ensureStyles: xg
}), vg = /* @__PURE__ */ Z("jcl-component.styled-year-view", `
    .jcl-component.styled-year-view > .months {
      display:grid;
      grid-template-columns:repeat(3,min-content);
      gap:8px;
    }
  `), Cg = /* @__PURE__ */ Ks({
  Name: "styledYearView",
  ClassName: "styled-year-view",
  PeriodKey: "Year",
  ValueIsPeriod: (e) => Ca(e, 1, 9999),
  defaultPeriodFor: (e) => Number(e.slice(0, 4)),
  shiftedPeriod: (e, t) => e + t,
  CaptionFor: (e) => String(e),
  MonthsOf: (e) => {
    const t = [];
    for (let n = 1; n <= 12; n++)
      t.push(e + "-" + String(n).padStart(2, "0"));
    return t;
  },
  ensureStyles: vg
});
let ai = !1;
function kg() {
  ai || (ai = !0, Ro("en", {
    "jcl.applet.compilation-error.title": "Compilation Error",
    "jcl.applet.compilation-error.prefix": 'Compiling Applet "src" failed with ',
    "jcl.applet.runtime-error.title": "Applet Failure",
    "jcl.applet.runtime-error.prefix": "JCL Applet failed with "
  }), Ro("de", {
    "jcl.applet.compilation-error.title": "Kompilierungsfehler",
    "jcl.applet.compilation-error.prefix": "Kompilieren des Applet-Skripts fehlgeschlagen: ",
    "jcl.applet.runtime-error.title": "Laufzeitfehler",
    "jcl.applet.runtime-error.prefix": "JCL-Applet fehlgeschlagen: "
  }));
}
class jg extends HTMLElement {
  _Renderer;
  constructor() {
    super(), kg();
    const t = el(this.getAttribute("src") ?? "");
    if (t.trim() === "") {
      this._Renderer = Us("");
      return;
    }
    try {
      this._Renderer = new Fl("PropSet", t);
    } catch (n) {
      this._Renderer = $g(
        "compilation-error",
        n.stack ?? n.message ?? String(n)
      );
    }
  }
  connectedCallback() {
    ia(b`<${qs} renderer=${this._Renderer}/>`, this);
  }
  disconnectedCallback() {
    ia(null, this);
  }
}
function bb() {
  customElements.get("jcl-applet") == null && customElements.define("jcl-applet", jg);
}
function Us(e) {
  return e.trim() === "" ? function(t) {
    return "";
  } : function(t) {
    return b`<${Ut} Error=${e}/>`;
  };
}
function $g(e, t) {
  return function(n) {
    const o = typeof navigator < "u" ? navigator.language : "en", a = la(`jcl.applet.${e}.title`, o) ?? "Error", r = la(`jcl.applet.${e}.prefix`, o) ?? "", i = a + `

` + r + t;
    return b`<${Ut} Error=${i}/>`;
  };
}
function qs(e) {
  Ig();
  const [t, n] = He(void 0), o = K(void 0), a = K(!1), r = io(_o), { Locale: i, Direction: s, Theme: l, SwatchSet: c } = r, d = ro(l, c);
  je(() => {
    const {
      setLocale: f,
      setDirection: g,
      setTheme: x,
      setPointerAccuracy: m,
      setHoverCapability: C,
      setPreferredMotion: k,
      setPreferredContrast: L
    } = r, j = new AbortController();
    if (window.addEventListener("languagechange", () => {
      const y = navigator.language;
      f(y), g(ki(y));
    }, { signal: j.signal }), typeof window.matchMedia == "function") {
      const y = (Q) => x(Q.matches ? "dark" : "light"), w = (Q) => m(Q.matches ? "coarse" : "fine"), F = (Q) => C(Q.matches ? "hover" : "none"), M = () => k(
        Tt("(prefers-reduced-motion: reduce)") ? "reduced" : void 0
      ), $ = () => L(
        Tt("(prefers-contrast: more)") ? "more" : Tt("(prefers-contrast: less)") ? "less" : void 0
      ), I = window.matchMedia("(prefers-color-scheme: dark)"), T = window.matchMedia("(pointer: coarse)"), D = window.matchMedia("(hover: hover)"), z = window.matchMedia("(prefers-reduced-motion: reduce)"), E = window.matchMedia("(prefers-contrast: more)"), X = window.matchMedia("(prefers-contrast: less)");
      I.addEventListener("change", y), T.addEventListener("change", w), D.addEventListener("change", F), z.addEventListener("change", M), E.addEventListener("change", $), X.addEventListener("change", $), j.signal.addEventListener("abort", () => {
        I.removeEventListener("change", y), T.removeEventListener("change", w), D.removeEventListener("change", F), z.removeEventListener("change", M), E.removeEventListener("change", $), X.removeEventListener("change", $);
      });
    }
    return () => j.abort();
  }, [r]);
  const [u] = ja(), { localized: p } = Ma(r);
  let h;
  switch (!0) {
    case u != null: {
      const f = p("jcl.applet.runtime-error.title"), g = p("jcl.applet.runtime-error.prefix"), x = f + `

` + g + (u.stack ?? u.message ?? String(u));
      h = b`<${Ut} Error=${x}/>`;
      break;
    }
    case o.current !== t:
      o.current = t, a.current = !0, h = t;
      break;
    case a.current:
      h = t;
      break;
    default: {
      let f;
      try {
        f = e.renderer({});
      } catch (g) {
        const x = p("jcl.applet.runtime-error.title"), m = p("jcl.applet.runtime-error.prefix"), C = x + `

` + m + (g.stack ?? g.message ?? String(g));
        return h = b`<${Ut} Error=${C}/>`, b`<div
              class="jcl-component jcl-applet"
              dir=${s} lang=${i} style=${d}
              role="alert" aria-live="assertive"
            >
             <${ht.Provider} value=${r}>
              ${h}
             </>
            </div>`;
      }
      if (fi(f))
        return f.then((g) => n(g)).catch((g) => {
          const x = p("jcl.applet.runtime-error.title"), m = p("jcl.applet.runtime-error.prefix"), C = x + `

` + m + (g.stack ?? g.message ?? String(g));
          n(b`<${Ut} Error=${C}/>`);
        }), b`<div
              class="jcl-component jcl-applet" dir=${s}
              aria-busy="true" aria-live="polite"
            />`;
      h = f;
    }
  }
  return b`<div
      class="jcl-component jcl-applet"
      dir=${s} lang=${i} style=${d}
      aria-live=${u == null ? "polite" : "assertive"}
    >
     <${ht.Provider} value=${r}>
      ${h}
     </>
    </div>`;
}
const Ig = /* @__PURE__ */ Z("jcl-component.jcl-applet", `
    .jcl-component.jcl-applet {
      display:contents;
    }
  `);
function Xs(e, t) {
  const n = /* @__PURE__ */ new Set();
  return e.forEach((o) => {
    n.has(o) && ce(
      `InvalidArguments: the given ${t} contain entries with identical keys`
    ), n.add(o);
  }), n;
}
function ri(e, t) {
  const n = /* @__PURE__ */ new Set();
  e.forEach((o) => {
    n.has(o) && ce(
      `InvalidArguments: the given ${t} contain double entries`
    ), n.add(o);
  });
}
function Kn(e, t) {
  const n = /* @__PURE__ */ new Set();
  return e.filter((o) => t.has(o) && !n.has(o) ? (n.add(o), !0) : !1);
}
function sn(e) {
  return e != null && (e.shiftKey || e.metaKey || e.ctrlKey);
}
function Qe(e, t, n) {
  return Math.max(t, Math.min(e, Math.max(t, n)));
}
function tt(e) {
  return e === "normal" ? "" : "size-" + e;
}
function Ys(e, t, n, o, a) {
  function r(l, c) {
    switch (!0) {
      case l > 0:
        return -a * Math.min(1, l / o);
      case c > 0:
        return a * Math.min(1, c / o);
      default:
        return 0;
    }
  }
  const i = o === 0 ? 0 : r(
    o - (t - e.left),
    o - (e.right - t)
  ), s = o === 0 ? 0 : r(
    o - (n - e.top),
    o - (e.bottom - n)
  );
  return { vx: i, vy: s };
}
function Js(e, t) {
  const n = Math.min(0.1, e.PanningTimestamp == null ? 0 : (t - e.PanningTimestamp) / 1e3);
  return e.PanningTimestamp = t, n;
}
function Dg(e, t) {
  const n = {};
  return t.forEach((o) => {
    n[o] = ((...a) => e.current[o]?.(...a));
  }), n;
}
function Le(e, t = !1) {
  e.stopPropagation(), t == !0 && e.preventDefault();
}
const nn = Le;
function Tt(e) {
  return typeof window < "u" && typeof window.matchMedia == "function" ? window.matchMedia(e).matches : !1;
}
function Lg(e) {
  return ka("value", e), e?.replace(/\n[\s\S]*$/, "").replace(/[\x00-\x1F\x7F]/g, "");
}
function Sg(e) {
  return ka("value", e), e?.replace(/[\x00-\x09\x0B\x0C\x0E-\x1F\x7F]/g, "").replace(/\r\n/g, `
`);
}
const yb = {
  render: ia,
  html: b,
  Component: Al,
  createRef: Rl,
  createContext: Jt,
  toChildArray: Yt,
  cloneElement: Tl,
  isValidElement: ui,
  createPortal: Dn,
  useId: Dt,
  useRef: K,
  useState: He,
  useEffect: je,
  useLayoutEffect: $a,
  useCallback: ie,
  useMemo: Zt,
  useContext: st,
  useErrorBoundary: ja,
  loadedLibrary: rt,
  useLibraries: Mn,
  useOnlineStatus: Kc,
  useWindowSize: Uc,
  useRerenderer: et,
  useCustomization: Go,
  useI18n: qc,
  useConfiguration: Xc,
  useDragging: hn,
  useClickDragging: Tn,
  useDataDragSupport: Jc,
  useDataDropSupport: Zc,
  usePointerDragSupport: Pc,
  usePointerDropSupport: ed,
  useFileDropSupport: od,
  useOverlayContext: Rn,
  useDialogContext: An,
  useToastContext: Ga,
  JCL_PointerDnDContext: za,
  JCL_OverlayContext: Ko,
  JCL_DialogContext: Uo,
  JCL_ToastContext: _a,
  installStylesheetFor: Oa,
  uninstallStylesheetFor: rd,
  safelyRendered: _,
  consumeEvent: Le,
  consumingEvent: nn,
  MediaQueryMatches: Tt,
  PseudoRef: ld,
  JCL_ErrorIndicator: Ut,
  normalizedName: mc,
  parseablePropSet: G,
  TextlineFromString: Lg,
  TextFromString: Sg,
  Customizable: cd,
  OverlayBase: dd,
  DialogBase: hd,
  ToastBase: xd,
  fullsized: jd,
  centered: Ka,
  horizontal: Dd,
  vertical: Sd,
  tabular: Td,
  selective: Ad,
  stacked: zd,
  Dummy: Vd,
  Spacer: Nd,
  expandingSpacer: Bd,
  horizontalSeparator: Wd,
  verticalSeparator: Hd,
  Title: _d,
  Subtitle: Kd,
  Label: qd,
  Description: Ua,
  Fineprint: Qd,
  TextlineView: Yd,
  TextView: eu,
  HTMLView: nu,
  MarkdownView: Bi,
  get MarkdownRenderer() {
    return cn;
  },
  // lazily initialised
  loadMarkdownLibraries: lo,
  loadedMarkdownRenderer: ru,
  ImageView: su,
  SVGView: cu,
  WebView: hu,
  Icon: gu,
  FAIcon: bu,
  native: {
    Button: xu,
    Checkbox: vu,
    Radiobutton: ku,
    Gauge: $u,
    Progressbar: Du,
    Slider: Su,
    TextlineInput: Tu,
    PasswordInput: Ru,
    NumberInput: Au,
    EMailAddressInput: Fu,
    PhoneNumberInput: zu,
    URLInput: Ou,
    TimeInput: Nu,
    DateTimeInput: Hu,
    DateInput: Gu,
    WeekInput: Uu,
    MonthInput: Xu,
    SearchInput: Yu,
    FileInput: Ju,
    ColorInput: Qu,
    DropDown: ep,
    TextInput: Pa
  },
  styled: {
    Button: Ms,
    Icon: Qh,
    FAIcon: ef,
    Checkbox: xa,
    Radiobutton: Ts,
    Gauge: Ih,
    Progressbar: Lh,
    Slider: Mh,
    TextlineInput: Rh,
    PasswordInput: Ah,
    NumberInput: Fh,
    EMailAddressInput: zh,
    PhoneNumberInput: Oh,
    URLInput: Vh,
    TimeInput: Eh,
    DateTimeInput: Nh,
    DateInput: Bh,
    WeekInput: Wh,
    MonthInput: Hh,
    SearchInput: _h,
    FileInput: Xh,
    ColorInput: Gh,
    DropDown: Uh,
    TextInput: Jh,
    Badge: nf,
    Spinner: af,
    Kbd: sf,
    Avatar: cf,
    Skeleton: uf,
    Breadcrumb: ag,
    Pagination: Bs,
    Tooltip: As,
    Popover: Fs,
    DropDownMenu: gf,
    DropDownMenuItem: mf,
    DropDownMenuSeparator: bf,
    DropDownMenuGroup: yf,
    DropDownMenuSubMenu: xf,
    CommandPalette: vf,
    CommandItem: Cf,
    CommandGroup: kf,
    Toast: jf,
    Card: If,
    CardHeader: Lf,
    CardTitle: Rf,
    CardDescription: Af,
    CardAction: Sf,
    CardContent: Mf,
    CardFooter: Tf,
    Sidebar: Ff,
    SidebarHeader: Of,
    SidebarContent: Vf,
    SidebarFooter: Ef,
    SidebarItem: Nf,
    SidebarSeparator: Bf,
    SidebarGroup: Wf,
    Table: Ws,
    TableHeader: Hs,
    TableBody: _s,
    TableFooter: ug,
    TableRow: Io,
    TableHead: wa,
    TableCell: Do,
    DataTable: pg,
    Field: Hf,
    InputGroup: Gf,
    InputGroupAddon: Kf,
    Switch: Uf,
    MultiSwitch: Es,
    ThemeSwitch: Xf,
    RadioGroup: Yf,
    Combobox: Zf,
    MonthView: dr,
    QuarterView: wg,
    YearView: Cg,
    DatePicker: eg,
    TabStrip: ng,
    Accordion: sg,
    AccordionFold: lg
  },
  legacy: {
    PseudoFileInput: op,
    PseudoDropDown: rp,
    FileDropArea: sp,
    TabStrip: cp,
    AccordionFold: up,
    FlatListView: Yi,
    NestedListView: mp,
    RichTextEditor: es,
    CodeEditor: Lp,
    DrawingEditor: Ap,
    BitmapEditor: Op,
    RealDrawEditor: Np,
    Spreadsheet: hh,
    KanbanBoard: yh,
    registerSpreadsheetFormula: uh,
    registerSpreadsheetFormulas: ph,
    NoteBoard: Hp,
    ChatView: ih,
    ChatViewAssistantExtra: Is,
    ChatViewUserExtra: Ds,
    ChatViewControls: Ls,
    stickyTextNote: js,
    stickyHTMLNote: or,
    stickyMarkdownNote: $s,
    DataFlowProcessView: Yp,
    WorldPositionOfPort: jn,
    QRCodeView: Ch
  },
  AppletView: qs,
  AppletFailingWith: Us
};
function Zs(e, t = !0) {
  return Je("text to be fenced", e), di("fence insertion flag", t), e = e.replace(/\\/g, "\\\\").replace(/»/g, "\\xBB").replace(/«/g, "\\xAB"), t ? `»»»
${e}
«««` : e;
}
function Mg(e) {
  return Je("text to be unfenced", e), e = e.replace(/^[\s\S]*?»»»/, "").replace(/«««[\s\S]*$/, ""), e.replace(/\\\\|\\xBB|\\xAB/g, (t) => t === "\\\\" ? "\\" : t === "\\xBB" ? "»" : "«").replace(/^\s*\n/, "").replace(/\n\s*$/, `
`);
}
function Tg(e, t) {
  return Je("text to be filled", e), yt("variable set", t), e.replace(/\{\{([^}]+)\}\}/g, (n, o) => o === "" ? "{{" : o.startsWith("~") ? (o = o.slice(1), t[o] == null ? n : Zs(t[o])) : t[o] == null ? n : t[o]);
}
const xb = {
  fencedText: Zs,
  unfencedText: Mg,
  TextFilledFrom: Tg
};
async function po(e) {
  return new Promise((t, n) => {
    const o = new FileReader();
    o.onload = () => t(o.result), o.onerror = () => n(o.error ?? new Error("Loading failed")), o.onabort = () => n(new Error("Loading was aborted")), o.readAsText(e);
  });
}
async function ho(e) {
  return new Promise((t, n) => {
    const o = new FileReader();
    o.onload = () => t(o.result), o.onerror = () => n(o.error ?? new Error("Loading failed")), o.onabort = () => n(new Error("Loading was aborted")), o.readAsArrayBuffer(e);
  });
}
async function Rg(e) {
  return new Promise((t, n) => {
    const o = new FileReader();
    o.onload = () => t(o.result), o.onerror = () => n(o.error ?? new Error("Loading failed")), o.onabort = () => n(new Error("Loading was aborted")), o.readAsDataURL(e);
  });
}
async function Ag(e) {
  const t = await po(e);
  return ur(t);
}
async function ur(e) {
  return Je("HTML document", e), Qs(e);
}
async function Fg(e) {
  const t = await po(e);
  return pr(t);
}
async function pr(e) {
  return Je("HTML document", e), wr(e);
}
async function zg(e) {
  const t = await po(e);
  return hr(t);
}
async function hr(e) {
  Je("markdown document", e);
  try {
    await lo();
    let t = 0;
    const n = new Ao();
    return n.use({
      gfm: !0,
      breaks: !0,
      renderer: {
        heading(o) {
          return `
${wn(this.parser.parseInline(o.tokens))}

`;
        },
        paragraph(o) {
          return `${wn(this.parser.parseInline(o.tokens))}

`;
        },
        list(o) {
          t++;
          let a = "";
          for (const r of o.items)
            a += this.listitem(r);
          return t--, a + `
`;
        },
        listitem(o) {
          const a = "  ".repeat(t - 1), i = o.tokens.some((s) => s.type === "list") ? wn(this.parser.parse(o.tokens)).trim() : wn(this.parser.parseInline(o.tokens));
          return `${a}- ${i}
`;
        },
        link(o) {
          return wn(this.parser.parseInline(o.tokens));
        },
        image(o) {
          return `[${o.text}]`;
        },
        code(o) {
          return `${o.text}

`;
        },
        blockquote(o) {
          return `${wn(this.parser.parse(o.tokens))}

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
    }), n.use(Fo({ nonStandard: !0 })), (await n.parse(e)).replace(/^\s+|\s+$/g, "").replace(/\n{3,}/g, `

`);
  } catch (t) {
    ce("ConversionError: could not convert the given Markdown into plain text, reason: " + t);
  }
}
async function Og(e) {
  const t = await po(e);
  return fr(t);
}
async function fr(e) {
  Je("markdown document", e);
  try {
    await lo();
    const t = new Ao();
    return t.use(da({
      langPrefix: "hljs language-",
      highlight(n, o) {
        const a = Cn.getLanguage(o) ? o : "plaintext";
        return Cn.highlight(n, { language: a }).value;
      }
    })), t.setOptions({
      gfm: !0,
      breaks: !0
    }), t.use(Fo({ nonStandard: !0 })), await t.parse(e);
  } catch (t) {
    ce("ConversionError: could not convert the given Markdown into HTML, reason: " + t);
  }
}
function wn(e) {
  return e.replace(/<[^>]+>/g, "");
}
let aa;
async function gr() {
  return aa == null && (aa = (await import("mammoth")).default), aa;
}
async function Vg(e) {
  const t = await ho(e);
  return mr(t);
}
async function mr(e) {
  Vo("DOCX document", e, ArrayBuffer, "binary buffer");
  try {
    return (await (await gr()).extractRawText({ arrayBuffer: e })).value;
  } catch (t) {
    ce("ConversionError: could not convert the given DOCX file into plain text, reason: " + t);
  }
}
async function Eg(e) {
  const t = await ho(e);
  return br(t);
}
async function br(e) {
  Vo("DOCX document", e, ArrayBuffer, "binary buffer");
  try {
    return (await (await gr()).convertToHtml({ arrayBuffer: e })).value;
  } catch (t) {
    ce("ConversionError: could not convert the given DOCX file into HTML, reason: " + t);
  }
}
async function Ng(e) {
  const t = await ho(e);
  return yr(t);
}
async function yr(e) {
  Vo("DOCX document", e, ArrayBuffer, "binary buffer");
  try {
    const n = (await (await gr()).convertToHtml({ arrayBuffer: e })).value;
    return wr(n);
  } catch (t) {
    ce("ConversionError: could not convert the given DOCX file into Markdown, reason: " + t);
  }
}
let ra;
async function Bg() {
  if (ra == null) {
    const { getDocument: e, GlobalWorkerOptions: t } = await import("pdfjs-dist");
    t.workerSrc = new URL(
      /* @vite-ignore */
      "./pdf.worker.min.mjs",
      import.meta.url
    ).href, ra = e;
  }
  return ra;
}
async function Wg(e) {
  const t = await ho(e);
  return xr(t);
}
async function xr(e) {
  Vo("PDF document", e, ArrayBuffer, "binary buffer");
  try {
    const n = await (await Bg())({
      data: e,
      wasmUrl: new URL(
        /* @vite-ignore */
        "./vendors/",
        import.meta.url
      ).href
    }).promise;
    let o = "";
    for (let a = 1; a <= n.numPages; a++) {
      const i = await (await n.getPage(a)).getTextContent();
      o += i.items.map((s) => s.str + (s.hasEOL ? `
` : " ")).join("").replace(/ +/g, " ") + `
`;
    }
    return o;
  } catch (t) {
    ce("ConversionError: could not convert the given PDF file into plain text, reason: " + t);
  }
}
function Qs(e) {
  Je("HTML document", e), /^\s*<!DOCTYPE/i.test(e) && (e = e.replace(/^\s*<!DOCTYPE[^>]*>/i, "").trim());
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
  let n = "", o = [], a = [], r = !1, i = !1, s = !1, l = !0;
  const c = {
    processStartTag: function(f, g, x, m) {
      if (t[f]) {
        c.ignoredTag = f;
        return;
      }
      if (c.ignoredTag == null)
        switch (f) {
          case "h1":
          case "h2":
          case "h3":
          case "h4":
          case "h5":
          case "h6":
            l || u(f === "h1" ? 3 : 2), l = !1;
            break;
          case "section":
            u();
            break;
          case "ul":
            u(), o.push("-");
            break;
          case "ol":
            u(), o.push("1"), a.push(1);
            break;
          case "li":
            switch (u(), n += p(), o[o.length - 1]) {
              case "-":
                n += "- ";
                break;
              case "1":
                n += a[a.length - 1]++ + ". ";
                break;
            }
            break;
          case "table":
            u();
            break;
          case "tr":
            u(), n += "|", s = !0;
            break;
          case "td":
          case "th":
            s || (n += "|", s = !0), n += " ";
            break;
          case "blockquote":
            u();
            break;
          case "pre":
            r = !0, u();
            break;
          case "code":
            i = !0;
            break;
          case "br":
            u();
            break;
          case "hr":
            u(2), n += "----", u(2);
            break;
          case "a":
            c.href = (g.find(
              (L) => L.Name === "href"
            ) || {}).Value;
            break;
          case "img":
            let C = (g.find((L) => L.Name === "alt") || {}).Value || "", k = (g.find((L) => L.Name === "src") || {}).Value || "";
            n += ` (${C}) [${k}] `;
            break;
        }
    },
    processEndTag: function(f) {
      if (c.ignoredTag != null) {
        c.ignoredTag === f && delete c.ignoredTag;
        return;
      }
      switch (f) {
        case "h1":
        case "h2":
        case "h3":
        case "h4":
        case "h5":
        case "h6":
          u(2);
          break;
        case "ul":
          o.pop(), u();
          break;
        case "ol":
          o.pop(), a.pop(), u();
          break;
        case "tr":
          n += "|", s = !1;
          break;
        case "td":
        case "th":
          n += "|";
          break;
        case "table":
          u();
          break;
        case "pre":
          u(), r = !1;
          break;
        case "code":
          i = !1;
          break;
        case "a":
          c.href != null && (n += ` [${c.href}]`), delete c.href;
      }
    },
    processText: function(f, g) {
      c.ignoredTag == null && (f.trim() === "" && !r && !i || (d(h(f)), l = !1));
    },
    processComment: function(f) {
    }
  };
  return vr(e, c), n.replace(/^\s+|\s+$/g, "").replace(/\n{3,}/g, `

`);
  function d(f) {
    r || i ? n += f : n += f.replace(/\s+/g, " ");
  }
  function u(f = 1) {
    n = n.replace(r ? /\n*$/ : /\s*$/, ""), n += `
`.repeat(f);
  }
  function p() {
    return "  ".repeat(o.length);
  }
  function h(f) {
    if (typeof document < "u") {
      const g = document.createElement("textarea");
      return g.innerHTML = f, g.value;
    } else
      return f.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&#(\d+);/g, (g, x) => String.fromCodePoint(Number(x))).replace(/&#x([0-9a-fA-F]+);/g, (g, x) => String.fromCodePoint(parseInt(x, 16)));
  }
}
function wr(e) {
  Je("HTML document", e), /^\s*<!DOCTYPE/i.test(e) && (e = e.replace(/^\s*<!DOCTYPE[^>]*>/i, "").trim());
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
  let n = "", o = "", a = [], r = [], i = !1, s = !1, l = !1, c = !1, d = !1, u = [], p = [], h = "";
  const f = {
    processStartTag: function(k, L, j, y) {
      if (f.ignoredTag == null) {
        if (t[k]) {
          f.ignoredTag = k;
          return;
        }
        switch (o = "", k) {
          case "h1":
          case "h2":
          case "h3":
          case "h4":
          case "h5":
          case "h6":
            g(2), o += "#".repeat(Number(k[1])) + " ";
            break;
          case "section":
            g(2);
            break;
          case "ul":
            g(), a.push("-");
            break;
          case "ol":
            g(), a.push("1"), r.push(1);
            break;
          case "li":
            switch (g(), o += x(), a[a.length - 1]) {
              case "-":
                o += "- ";
                break;
              case "1":
                o += r[r.length - 1]++ + ". ";
                break;
            }
            break;
          case "table":
            l = !0, u = [];
            break;
          case "tr":
            c = l, p = [];
            break;
          case "th":
            d = !0, h = "";
            break;
          case "td":
            l && c && u.length === 0 && u.push([]), d = !0, h = "";
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
            f.href = (L.find(
              (w) => w.Name === "href"
            ) || {}).Value, o += "[";
            break;
          case "img": {
            let w = (L.find((M) => M.Name === "alt") || {}).Value || "", F = (L.find((M) => M.Name === "src") || {}).Value || "";
            o += `![${w}](${F})`;
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
        d ? h += o : n += o;
      }
    },
    processEndTag: function(k) {
      if (f.ignoredTag != null) {
        f.ignoredTag === k && delete f.ignoredTag;
        return;
      }
      switch (o = "", k) {
        case "h1":
        case "h2":
        case "h3":
        case "h4":
        case "h5":
        case "h6":
          o += " " + "#".repeat(Number(k[1])), g(2);
          break;
        case "ul":
          a.pop(), g();
          break;
        case "ol":
          a.pop(), r.pop(), g();
          break;
        case "li":
          break;
        // nothing extra
        case "table":
          u.length > 0 && (g(), o += C(u), u = [], g()), l = c = d = !1;
          break;
        case "tr":
          l && u.push(p), c = d = !1, p = [];
          break;
        case "th":
        case "td":
          c && p.push(h), d = !1, h = "";
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
          f.href != null && (o += `](${f.href})`, delete f.href);
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
      d ? h += o : n += o;
    },
    processText: function(k, L) {
      if (f.ignoredTag == null && !(k.trim() === "" && !i && !s)) {
        switch (!0) {
          case i:
            o = k;
            break;
          case s:
            o = k.replace(/`/g, "\\`");
            break;
          default:
            o = m(k).replace(/\s+/g, " ");
        }
        d ? h += o : n += o;
      }
    },
    processComment: function(k) {
    }
  };
  return vr(e, f), n.replace(/^\s+|\s+$/g, "").replace(/\n{3,}/g, `

`);
  function g(k = 1) {
    o = o.trimEnd() + `
`.repeat(k);
  }
  function x() {
    return "  ".repeat(a.length - 1);
  }
  function m(k) {
    if (typeof document < "u") {
      const L = document.createElement("textarea");
      return L.innerHTML = k, L.value;
    } else
      return k.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&#(\d+);/g, (L, j) => String.fromCodePoint(Number(j))).replace(/&#x([0-9a-fA-F]+);/g, (L, j) => String.fromCodePoint(parseInt(j, 16)));
  }
  function C(k) {
    if (k.length === 0)
      return "";
    let L, j;
    if (k[0].length > 0)
      L = k[0], j = 1;
    else {
      const F = Math.max(...k.map((M) => M.length));
      L = new Array(F).fill(""), j = 1;
    }
    const y = L.map(() => "---");
    let w = [
      "| " + L.join(" | ") + " |",
      "| " + y.join(" | ") + " |"
    ];
    for (let F = j; F < k.length; F++)
      w.push("| " + k[F].join(" | ") + " |");
    return w.join(`
`) + `
`;
  }
}
function vr(e, t) {
  const n = /^<([-a-z0-9]+)((?:[\s\xA0]+[-a-z0-9_$:]+(?:[\s\xA0]*=[\s\xA0]*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s\xA0]+))?)*)[\s\xA0]*(\/?)>/i, o = /^<\/([-a-z0-9_]+)[^>]*>/i, a = /([-a-z0-9_$:]+)(?:[\s\xA0]*=[\s\xA0]*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s\xA0]+)))?/gi;
  function r(M) {
    let $ = M.split(","), I = /* @__PURE__ */ Object.create(null);
    for (let T = 0, D = $.length; T < D; T++)
      I[$[T]] = !0;
    return I;
  }
  const i = r(
    "area,base,basefont,br,col,embed,frame,hr,img,input,isindex,keygen,link,meta,param,source,track,wbr"
  ), s = r(
    "address,article,aside,audio,blockquote,canvas,center,dd,dir,div,dl,dt,fieldset,figcaption,figure,footer,form,frameset,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,isindex,li,main,menu,nav,noframes,noscript,ol,output,p,pre,section,semantics,table,tbody,td,tfoot,th,thead,tr,ul,video,svg,g,defs,symbol,clippath,mask,pattern,lineargradient,radialgradient,filter,switch,text,tspan,textpath,foreignobject"
  ), l = r(
    "a,abbr,acronym,applet,b,basefont,bdo,big,br,button,cite,code,del,dfn,em,font,i,iframe,img,input,ins,kbd,label,map,object,q,s,samp,script,select,small,span,strike,strong,sub,sup,textarea,tt,u,var"
  ), c = r(
    "area,base,basefont,bgsound,br,col,colgroup,dd,dt,embed,frame,hr,img,input,isindex,keygen,li,link,menuitem,meta,options,p,param,source,td,tfoot,th,thead,tr,track,wbr,rect,circle,ellipse,line,polyline,polygon,path,stop,use,marker,animate,animatemotion,animatetransform,set,desc,title,feblend,fecolormatrix,fecomponenttransfer,fecomposite,feconvolvematrix,fediffuselighting,fedisplacementmap,fedropshadow,feflood,fegaussianblur,feimage,femerge,femorphology,feoffset,fespecularlighting,fetile,feturbulence,fedistantlight,fepointlight,fespotlight"
  ), d = r(
    "script,style"
  ), u = r(
    "checked,compact,declare,defer,disabled,ismap,multiple,nohref,noresize,noshade,nowrap,readonly,selected"
  );
  let p = function() {
  }, h = t.processStartTag || p, f = t.processEndTag || p, g = t.processText || p, x = t.processComment || p, m = [];
  m.last = function() {
    return this[this.length - 1];
  };
  let C = "", k = !1;
  function L() {
    C !== "" && (g(C, k), C = "");
  }
  function j(M, $) {
    C !== "" && $ !== k && L(), C += M, k = $;
  }
  function y(M, $, I, T) {
    if ($ = $.toLowerCase(), s[$])
      for (; m.last() != null && l[m.last()]; )
        w("", m.last());
    c[$] && m.last() === $ && w("", $);
    let D = i[$] || !!T;
    if (D || m.push($), h !== p) {
      let z = [];
      I.replace(a, function(E, X, ...Q) {
        let pe = Q[0] ? Q[0] : Q[1] ? Q[1] : Q[2] ? Q[2] : u[X] ? X : "";
        return z.push({
          Name: X,
          Value: pe,
          escapedValue: Ps(pe)
        }), "";
      }), L(), h(
        $,
        z,
        D,
        m.length === (D ? 0 : 1)
      );
    }
    return "";
  }
  function w(M, $) {
    let I;
    if ($ == null)
      I = 0;
    else
      for ($ = $.toLowerCase(), I = m.length - 1; I >= 0 && m[I] !== $; I--)
        ;
    if (I >= 0) {
      L();
      for (let T = m.length - 1; T >= I; T--)
        f(m[T], T === 0);
      m.length = I;
    }
    return "";
  }
  let F = e;
  for (; e !== ""; ) {
    let M = !0;
    if (m.last() == null || !d[m.last()]) {
      if (e.startsWith("<!--")) {
        let $ = e.indexOf("-->", 4);
        $ > 0 && (L(), x(e.slice(4, $)), e = e.slice($ + 3), M = !1);
      } else if (e.startsWith("<?")) {
        let $ = e.indexOf("?>");
        $ >= 0 && (e = e.slice($ + 2), M = !1);
      } else if (e.startsWith("<!")) {
        let $ = e.indexOf(">");
        $ >= 0 && (e = e.slice($ + 1), M = !1);
      } else if (e.startsWith("</")) {
        let $ = e.match(o);
        $ != null && (e = e.slice($[0].length), $[0].replace(o, w), M = !1);
      } else if (e.startsWith("<")) {
        let $ = e.match(n);
        $ != null && (e = e.slice($[0].length), $[0].replace(n, y), M = !1);
      }
      if (M) {
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
    if (e === F)
      switch (!0) {
        case e.startsWith("<"):
          e = e.slice(1), j("<", m.length === 0);
          break;
        default:
          throw new Error('HTMLParseError: could not parse "' + e + '"');
      }
    F = e;
  }
  L(), w();
}
function wb(e, t) {
  for (let n = 0, o = t.length; n < o; n++) {
    let a = t[n];
    if (a.Name === e)
      return a.Value;
  }
}
function vb(e, t, n) {
  let o = "<" + e;
  for (let a = 0, r = t.length; a < r; a++) {
    let i = t[a];
    o += " " + i.Name + '="' + i.escapedValue + '"';
  }
  return o + (n ? "/>" : ">");
}
function Ps(e) {
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
function el(e) {
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
const Cb = {
  readFileAsText: po,
  readFileAsBinary: ho,
  readFileAsDataURL: Rg,
  HTMLasText: ur,
  HTMLasMarkdown: pr,
  HTMLFileReadAsText: Ag,
  HTMLFileReadAsMarkdown: Fg,
  MarkdownAsText: hr,
  MarkdownAsHTML: fr,
  MarkdownFileReadAsText: zg,
  MarkdownFileReadAsHTML: Og,
  DOCXasText: mr,
  DOCXasHTML: br,
  DOCXasMarkdown: yr,
  DOCXFileReadAsText: Vg,
  DOCXFileReadAsHTML: Eg,
  DOCXFileReadAsMarkdown: Ng,
  PDFasText: xr,
  PDFFileReadAsText: Wg,
  HTMLtoText: Qs,
  HTMLtoMarkdown: wr,
  parseHTML: vr,
  escapedHTMLAttribute: Ps,
  unescapedHTMLAttribute: el
};
function N(e, t, ...n) {
  if (Xt("callback description", e), Ae("callback", t), t != null)
    try {
      return t(...n);
    } catch (o) {
      ce(`CallbackFailure: ${e} failed with ${"" + o}`);
    }
}
const Ke = N;
function Hg(e) {
  return Xt("Textline", e), e.length === 0 ? e : e.charAt(0).toUpperCase() + e.slice(1);
}
export {
  Us as AppletFailingWith,
  qs as AppletView,
  Fl as AsyncFunction,
  wb as AttributeFrom,
  cd as Customizable,
  Eg as DOCXFileReadAsHTML,
  Ng as DOCXFileReadAsMarkdown,
  Vg as DOCXFileReadAsText,
  br as DOCXasHTML,
  yr as DOCXasMarkdown,
  mr as DOCXasText,
  Hc as DefaultSwatchSet,
  Ua as Description,
  mi as DescriptionOfHTTPStatus,
  Ib as DeviceSupportsPassiveEvents,
  Db as DeviceSupportsPointerEvents,
  Lb as DeviceSupportsTouchEvents,
  hd as DialogBase,
  ki as DirectionOfLocale,
  Vd as Dummy,
  jm as EnvironmentIsBrowser,
  Pl as EnvironmentIsTauri,
  bu as FAIcon,
  Qd as Fineprint,
  Ic as FlagEmojiForISOCode,
  ub as FlagEmojiForLocale,
  Fg as HTMLFileReadAsMarkdown,
  Ag as HTMLFileReadAsText,
  nu as HTMLView,
  pr as HTMLasMarkdown,
  ur as HTMLasText,
  wr as HTMLtoMarkdown,
  Qs as HTMLtoText,
  bi as HTTPMessageForStatus,
  gu as Icon,
  su as ImageView,
  ec as InternetIsAvailable,
  jg as JCL_AppletElement,
  zp as JCL_BitmapEditor,
  Fp as JCL_BitmapEditorTools,
  Fa as JCL_DataDropEffects,
  Ya as JCL_DatePattern,
  _u as JCL_DateRegExp,
  Bu as JCL_DateTimePattern,
  Wu as JCL_DateTimeRegExp,
  uu as JCL_DefaultSandboxPermissions,
  Uo as JCL_DialogContext,
  bd as JCL_DialogView,
  Cc as JCL_Directions,
  Rp as JCL_DrawingEditor,
  Ut as JCL_ErrorIndicator,
  qa as JCL_FAIconNames,
  Ec as JCL_HoverCapabilities,
  Hi as JCL_ImageAlignments,
  Wi as JCL_ImageScalings,
  md as JCL_ModalLayer,
  Za as JCL_MonthPattern,
  qu as JCL_MonthRegExp,
  Ko as JCL_OverlayContext,
  Hr as JCL_OverlayView,
  Vc as JCL_PointerAccuracies,
  za as JCL_PointerDnDContext,
  Qc as JCL_PointerDropEffects,
  Bc as JCL_PreferredContrasts,
  Nc as JCL_PreferredMotions,
  vh as JCL_QRCodeECCLevels,
  gg as JCL_QuarterPattern,
  mg as JCL_QuarterRegExp,
  pt as JCL_RealDrawEditor,
  Vp as JCL_RealDrawEditorTools,
  pu as JCL_ReferrerPolicies,
  tb as JCL_SwatchKeys,
  $i as JCL_Themes,
  Vu as JCL_TimePattern,
  Eu as JCL_TimeRegExp,
  _a as JCL_ToastContext,
  pd as JCL_Underlay,
  Ja as JCL_WeekPattern,
  Ku as JCL_WeekRegExp,
  ct as JCL_empty,
  dc as JCL_mixedValues,
  cc as JCL_noSelection,
  ql as JCL_supportedHTMLFormats,
  Yl as JCL_supportedImageFormats,
  Xl as JCL_supportedMarkdownFormats,
  Ul as JCL_supportedTextFormats,
  qd as Label,
  fr as MarkdownAsHTML,
  hr as MarkdownAsText,
  Og as MarkdownFileReadAsHTML,
  zg as MarkdownFileReadAsText,
  cn as MarkdownRenderer,
  Bi as MarkdownView,
  Tt as MediaQueryMatches,
  mb as OperationWasConfirmed,
  dd as OverlayBase,
  Wg as PDFFileReadAsText,
  xr as PDFasText,
  Sb as PointerType,
  ld as PseudoRef,
  Ln as RegExpForPattern,
  cu as SVGView,
  me as SearXNG,
  gi as ServerIsReachable,
  Nd as Spacer,
  Z as StylesheetInstallerFor,
  Kd as Subtitle,
  Tg as TextFilledFrom,
  Sg as TextFromString,
  eu as TextView,
  Lg as TextlineFromString,
  Yd as TextlineView,
  _d as Title,
  xd as ToastBase,
  Zl as ValueIsAbortSignal,
  $t as ValueIsDate,
  Ki as ValueIsDateTime,
  Qn as ValueIsDimension,
  gc as ValueIsGeometry,
  fm as ValueIsHTMLFormat,
  Hl as ValueIsISOLanguageCode,
  El as ValueIsIdentifier,
  mm as ValueIsImageFormat,
  im as ValueIsListOfEMailAddresses,
  Ci as ValueIsLocale,
  Zn as ValueIsLocation,
  Jn as ValueIsMIMEType,
  gm as ValueIsMarkdownFormat,
  Qa as ValueIsMonth,
  Ia as ValueIsName,
  Un as ValueIsObject,
  pi as ValueIsPath,
  Eo as ValueIsPhoneNumber,
  De as ValueIsPlainObject,
  hc as ValueIsPosition,
  Qt as ValueIsPreactRef,
  fi as ValueIsPromise,
  bg as ValueIsQuarter,
  fc as ValueIsSize,
  Ue as ValueIsSpecial,
  sa as ValueIsSwatch,
  xc as ValueIsSwatchSet,
  hm as ValueIsTextFormat,
  no as ValueIsTextWithTabs,
  Gi as ValueIsTime,
  Gm as ValueIsVNode,
  Ui as ValueIsWeek,
  hu as WebView,
  jn as WorldPositionOfPort,
  Y as acceptableBoolean,
  qt as acceptableCardinal,
  mt as acceptableColor,
  Jm as acceptableEMailAddress,
  A as acceptableFunction,
  Xm as acceptableInteger,
  To as acceptableIntegerInRange,
  Qm as acceptableName,
  Pm as acceptableNameOrIndex,
  Ge as acceptableNumber,
  Et as acceptableNumberInRange,
  ke as acceptableOrdinal,
  eb as acceptablePath,
  Zm as acceptablePhoneNumber,
  pn as acceptableString,
  Ym as acceptableStringMatching,
  ae as acceptableText,
  S as acceptableTextline,
  mn as acceptableURL,
  V as acceptableValue,
  xb as ai,
  Ql as allowAbortSignal,
  hb as allowDictionary,
  bt as allowDimension,
  Bm as allowGeometry,
  _l as allowISOLanguageCode,
  Xg as allowIdentifier,
  lb as allowLocale,
  Mo as allowLocation,
  dm as allowMIMEType,
  Bl as allowName,
  Pg as allowPath,
  nm as allowPhoneNumber,
  Rm as allowPosition,
  Km as allowPreactRef,
  bm as allowPromise,
  Om as allowSize,
  nb as allowSwatch,
  wc as allowSwatchSet,
  vm as allowedAbortSignal,
  fb as allowedDictionary,
  Sm as allowedDimension,
  Wm as allowedGeometry,
  sm as allowedISOLanguageCode,
  Yg as allowedIdentifier,
  cb as allowedLocale,
  Im as allowedLocation,
  um as allowedMIMEType,
  Zg as allowedName,
  em as allowedPath,
  om as allowedPhoneNumber,
  Am as allowedPosition,
  Um as allowedPreactRef,
  ym as allowedPromise,
  Vm as allowedSize,
  ob as allowedSwatch,
  ib as allowedSwatchSet,
  Hg as capitalized,
  Ka as centered,
  ao as coercedNumberSatisfying,
  Le as consumeEvent,
  nn as consumingEvent,
  bb as defineJCLApplet,
  Ps as escapedHTMLAttribute,
  N as executeCallback,
  Ke as executedCallback,
  Bd as expandingSpacer,
  Cm as expectAbortSignal,
  zc as expectDictionary,
  Mm as expectDimension,
  Hm as expectGeometry,
  lm as expectISOLanguageCode,
  Nl as expectIdentifier,
  Sn as expectLocale,
  Dm as expectLocation,
  Kl as expectMIMEType,
  dn as expectName,
  hi as expectPath,
  am as expectPhoneNumber,
  Fm as expectPosition,
  Wo as expectPreactRef,
  xm as expectPromise,
  Em as expectSize,
  ab as expectSwatch,
  vc as expectSwatchSet,
  km as expectedAbortSignal,
  gb as expectedDictionary,
  Tm as expectedDimension,
  _m as expectedGeometry,
  cm as expectedISOLanguageCode,
  Jg as expectedIdentifier,
  db as expectedLocale,
  Lm as expectedLocation,
  pm as expectedMIMEType,
  Qg as expectedName,
  tm as expectedPath,
  rm as expectedPhoneNumber,
  zm as expectedPosition,
  qm as expectedPreactRef,
  wm as expectedPromise,
  Nm as expectedSize,
  rb as expectedSwatch,
  sb as expectedSwatchSet,
  Zs as fencedText,
  It as fetched,
  sc as fetchedAsHTML,
  lc as fetchedAsMarkdown,
  ic as fetchedAsText,
  oc as fetchedBinary,
  ac as fetchedBlob,
  rc as fetchedDataURL,
  nc as fetchedJSON,
  tc as fetchedText,
  jd as fullsized,
  Dd as horizontal,
  Wd as horizontalSeparator,
  Oa as installStylesheetFor,
  up as legacyAccordionFold,
  Op as legacyBitmapEditor,
  ih as legacyChatView,
  Is as legacyChatViewAssistantExtra,
  Ls as legacyChatViewControls,
  Ds as legacyChatViewUserExtra,
  Lp as legacyCodeEditor,
  Yp as legacyDataFlowProcessView,
  Ap as legacyDrawingEditor,
  sp as legacyFileDropArea,
  Yi as legacyFlatListView,
  yh as legacyKanbanBoard,
  mp as legacyNestedListView,
  Hp as legacyNoteBoard,
  rp as legacyPseudoDropDown,
  op as legacyPseudoFileInput,
  Ch as legacyQRCodeView,
  Np as legacyRealDrawEditor,
  es as legacyRichTextEditor,
  hh as legacySpreadsheetEditor,
  cp as legacyTabStrip,
  lo as loadMarkdownLibraries,
  rt as loadedLibrary,
  ru as loadedMarkdownRenderer,
  so as memoizedLoader,
  Cb as misc,
  Se as missingProperty,
  xu as nativeButton,
  vu as nativeCheckbox,
  Qu as nativeColorInput,
  Gu as nativeDateInput,
  Hu as nativeDateTimeInput,
  ep as nativeDropDown,
  Fu as nativeEMailAddressInput,
  Ju as nativeFileInput,
  $u as nativeGauge,
  Xu as nativeMonthInput,
  pb as nativeNameForLocale,
  Au as nativeNumberInput,
  Ru as nativePasswordInput,
  zu as nativePhoneNumberInput,
  Du as nativeProgressbar,
  ku as nativeRadiobutton,
  Yu as nativeSearchInput,
  Su as nativeSlider,
  Pa as nativeTextInput,
  Tu as nativeTextlineInput,
  Nu as nativeTimeInput,
  Ou as nativeURLInput,
  Uu as nativeWeekInput,
  $m as net,
  mc as normalizedName,
  vr as parseHTML,
  G as parseablePropSet,
  vt as parsedOption,
  Mb as primaryInput,
  ho as readFileAsBinary,
  Rg as readFileAsDataURL,
  po as readFileAsText,
  Ip as registerCodeEditorLanguage,
  uh as registerSpreadsheetFormula,
  ph as registerSpreadsheetFormulas,
  Ze as resolvedSpecialValue,
  _ as safelyRendered,
  Ad as selective,
  vb as serializedTag,
  zd as stacked,
  or as stickyHTMLNote,
  $s as stickyMarkdownNote,
  js as stickyTextNote,
  sg as styledAccordion,
  lg as styledAccordionFold,
  cf as styledAvatar,
  nf as styledBadge,
  ag as styledBreadcrumb,
  Ms as styledButton,
  If as styledCard,
  Sf as styledCardAction,
  Mf as styledCardContent,
  Af as styledCardDescription,
  Tf as styledCardFooter,
  Lf as styledCardHeader,
  Rf as styledCardTitle,
  xa as styledCheckbox,
  Gh as styledColorInput,
  Zf as styledCombobox,
  kf as styledCommandGroup,
  Cf as styledCommandItem,
  vf as styledCommandPalette,
  pg as styledDataTable,
  Bh as styledDateInput,
  eg as styledDatePicker,
  Nh as styledDateTimeInput,
  Uh as styledDropDown,
  gf as styledDropDownMenu,
  yf as styledDropDownMenuGroup,
  mf as styledDropDownMenuItem,
  bf as styledDropDownMenuSeparator,
  xf as styledDropDownMenuSubMenu,
  zh as styledEMailAddressInput,
  ef as styledFAIcon,
  Hf as styledField,
  Xh as styledFileInput,
  Ih as styledGauge,
  Qh as styledIcon,
  Gf as styledInputGroup,
  Kf as styledInputGroupAddon,
  sf as styledKbd,
  Hh as styledMonthInput,
  dr as styledMonthView,
  Es as styledMultiSwitch,
  Fh as styledNumberInput,
  Bs as styledPagination,
  Ah as styledPasswordInput,
  Oh as styledPhoneNumberInput,
  Fs as styledPopover,
  Lh as styledProgressbar,
  wg as styledQuarterView,
  Yf as styledRadioGroup,
  Ts as styledRadiobutton,
  _h as styledSearchInput,
  Ff as styledSidebar,
  Vf as styledSidebarContent,
  Ef as styledSidebarFooter,
  Wf as styledSidebarGroup,
  Of as styledSidebarHeader,
  Nf as styledSidebarItem,
  Bf as styledSidebarSeparator,
  uf as styledSkeleton,
  Mh as styledSlider,
  af as styledSpinner,
  Uf as styledSwitch,
  ng as styledTabStrip,
  Ws as styledTable,
  _s as styledTableBody,
  Do as styledTableCell,
  ug as styledTableFooter,
  wa as styledTableHead,
  Hs as styledTableHeader,
  Io as styledTableRow,
  Jh as styledTextInput,
  Rh as styledTextlineInput,
  Xf as styledThemeSwitch,
  Eh as styledTimeInput,
  jf as styledToast,
  As as styledTooltip,
  Vh as styledURLInput,
  Wh as styledWeekInput,
  Cg as styledYearView,
  Td as tabular,
  ce as throwError,
  Ol as throwReadOnlyError,
  yb as ui,
  el as unescapedHTMLAttribute,
  Mg as unfencedText,
  rd as uninstallStylesheetFor,
  Tn as useClickDragging,
  Xc as useConfiguration,
  Go as useCustomization,
  Jc as useDataDragSupport,
  Zc as useDataDropSupport,
  tn as useDatalist,
  An as useDialogContext,
  hn as useDragging,
  od as useFileDropSupport,
  jt as useHybridValue,
  qc as useI18n,
  en as useInputCallbacks,
  Mn as useLibraries,
  Li as useMeasuredPaneSize,
  Kc as useOnlineStatus,
  Rn as useOverlayContext,
  Pc as usePointerDragSupport,
  ed as usePointerDropSupport,
  et as useRerenderer,
  Pt as useShownValue,
  Ga as useToastContext,
  Uc as useWindowSize,
  Sd as vertical,
  Hd as verticalSeparator
};
//# sourceMappingURL=javascript-code-library.slim.esm.js.map
