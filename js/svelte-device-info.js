!function(e,n){"object"==typeof exports&&"undefined"!=typeof module?module.exports=n():"function"==typeof define&&define.amd?define(n):(e="undefined"!=typeof globalThis?globalThis:e||self,function(){var i=e.Device,t=e.Device=n();t.noConflict=function(){return e.Device=i,t}}())}(this,(function(){"use strict";var e={};function n(){var e,n=!1;return e=navigator.userAgent||navigator.vendor||window.opera,(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(e)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(e.substr(0,4)))&&(n=!0),n}function i(){if(n()){var e=window.innerWidth,i=window.innerHeight,t=Math.min(e,i),o=Math.max(e,i);return t<=480&&o<=896}return!1}function t(e){var n=window.matchMedia||window.webkitMatchmedia||window.mozMatchmedia||window.oMatchmedia;return null!=n&&n(e).matches}function o(){return"interactive"===document.readyState||"complete"===document.readyState}function a(){return null==e.AppRunsOnLegacyTouchDevice&&(e.AppRunsOnLegacyTouchDevice=!t("(pointer:fine)")&&!t("(pointer:coarse)")&&!t("-moz-touch-enabled")&&("ontouchstart"in Window||(navigator.maxTouchPoints||0)>0||/touch|android|iphone|ipod|ipad/i.test(navigator.userAgent))),e.AppRunsOnLegacyTouchDevice}function r(e,n){return"function"==typeof e.item?e.item(n):e[n]}function c(e,n){for(var i=0,t=e.length;i<t;i++)if(n.test(r(e,i)))return!0;return!1}function d(){return null==e.DevicePointingAccuracy&&(s(),o()||e.waitingForLoaded||(e.waitingForLoaded=!0,window.addEventListener("DOMContentLoaded",s))),e.DevicePointingAccuracy}function s(){e.DeviceCanHover=t("(hover:hover)");var n="fine";switch(!0){case t("(pointer:none)"):n="none";break;case t("(pointer:coarse)"):case t("-moz-touch-enabled"):case a():n="coarse"}if(e.DevicePointingAccuracy=n,o()){var i=document.body.classList;if("none"===n!==i.contains("noPointer")||"fine"===n!==i.contains("finePointer")||"coarse"===n!==i.contains("coarsePointer"))switch(document.body.classList.remove("noPointer","finePointer","coarsePointer"),n){case"none":document.body.classList.add("noPointer");break;case"fine":document.body.classList.add("finePointer");break;case"coarse":document.body.classList.add("coarsePointer")}}}function l(n,i){if("function"!=typeof n)throw new Error("handler function expected");null==e.EventHandlerRegistry&&(e.EventHandlerRegistry=[]);for(var t=e.EventHandlerRegistry,o=0,a=t.length;o<a;o++)if(t[o].Handler===n)return void(t[o].onceOnly=i);t.push({Handler:n,onceOnly:i}),1===t.length&&(e.AccuracyPoller=setInterval((function(){var n=d();s(),d()!==n&&function(){null==e.EventHandlerRegistry&&(e.EventHandlerRegistry=[]);for(var n=e.EventHandlerRegistry,i=0,t=n.length;i<t;i++){var o=n[i],a=o.Handler,r=o.onceOnly;try{a(d())}catch(e){console.warn("PointingAccuracy observation function failed with",e)}r&&u(a)}}()}),500))}function u(n){null==e.EventHandlerRegistry&&(e.EventHandlerRegistry=[]);for(var i=e.EventHandlerRegistry,t=0,o=i.length;t<o;t++)if(i[t].Handler===n){i.splice(t,1);break}0===i.length&&(clearInterval(e.AccuracyPoller),e.AccuracyPoller=void 0)}return{get isMobile(){return n()},get isPhone(){return i()},get isTablet(){return n()&&!i()},get isLegacyTouchDevice(){return a()},rewriteMediaQueriesOnLegacyTouchDevices:function n(){if(!e.MediaQueriesHaveBeenRewritten&&a())if(o()){for(var i=document.styleSheets,t=0,r=i.length;t<r;t++)for(var d=i[t].cssRules||i[t].rules,s=0,l=d.length;s<l;s++){var u=d[s];if(u.type===CSSRule.MEDIA_RULE&&c(u.media,/handheld/i)){var m=u.media;m.mediaText=m.mediaText.replace("handheld","screen")}}var g=document.getElementsByTagName("link");for(t=0,r=g.length;t<r;t++){var v=g[t];/handheld/i.test(v.media)&&(v.media=v.media.replace("handheld","screen"))}e.MediaQueriesHaveBeenRewritten=!0}else window.addEventListener("DOMContentLoaded",n)},get PointingAccuracy(){return d()},get canHover(){return null==e.DevicePointingAccuracy&&(s(),o()||e.waitingForLoaded||(e.waitingForLoaded=!0,window.addEventListener("DOMContentLoaded",s))),e.DeviceCanHover},onPointingAccuracyChanged:function(e){l(e,!1)},oncePointingAccuracyChanged:function(e){l(e,!0)},offPointingAccuracyChanged:function(e){u(e)},get observesPointingAccuracy(){return null!=e.AccuracyPoller}}}));
//# sourceMappingURL=svelte-device-info.js.map