/*! For license information please see bundle.js.LICENSE.txt */
(()=>{function e(t){return e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},e(t)}function t(){"use strict";t=function(){return r};var r={},n=Object.prototype,o=n.hasOwnProperty,i=Object.defineProperty||function(e,t,r){e[t]=r.value},a="function"==typeof Symbol?Symbol:{},c=a.iterator||"@@iterator",s=a.asyncIterator||"@@asyncIterator",u=a.toStringTag||"@@toStringTag";function l(e,t,r){return Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}),e[t]}try{l({},"")}catch(e){l=function(e,t,r){return e[t]=r}}function f(e,t,r,n){var o=t&&t.prototype instanceof h?t:h,a=Object.create(o.prototype),c=new O(n||[]);return i(a,"_invoke",{value:E(e,r,c)}),a}function p(e,t,r){try{return{type:"normal",arg:e.call(t,r)}}catch(e){return{type:"throw",arg:e}}}r.wrap=f;var d={};function h(){}function m(){}function g(){}var v={};l(v,c,(function(){return this}));var y=Object.getPrototypeOf,b=y&&y(y(j([])));b&&b!==n&&o.call(b,c)&&(v=b);var x=g.prototype=h.prototype=Object.create(v);function w(e){["next","throw","return"].forEach((function(t){l(e,t,(function(e){return this._invoke(t,e)}))}))}function _(t,r){function n(i,a,c,s){var u=p(t[i],t,a);if("throw"!==u.type){var l=u.arg,f=l.value;return f&&"object"==e(f)&&o.call(f,"__await")?r.resolve(f.__await).then((function(e){n("next",e,c,s)}),(function(e){n("throw",e,c,s)})):r.resolve(f).then((function(e){l.value=e,c(l)}),(function(e){return n("throw",e,c,s)}))}s(u.arg)}var a;i(this,"_invoke",{value:function(e,t){function o(){return new r((function(r,o){n(e,t,r,o)}))}return a=a?a.then(o,o):o()}})}function E(e,t,r){var n="suspendedStart";return function(o,i){if("executing"===n)throw new Error("Generator is already running");if("completed"===n){if("throw"===o)throw i;return{value:void 0,done:!0}}for(r.method=o,r.arg=i;;){var a=r.delegate;if(a){var c=R(a,r);if(c){if(c===d)continue;return c}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if("suspendedStart"===n)throw n="completed",r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n="executing";var s=p(e,t,r);if("normal"===s.type){if(n=r.done?"completed":"suspendedYield",s.arg===d)continue;return{value:s.arg,done:r.done}}"throw"===s.type&&(n="completed",r.method="throw",r.arg=s.arg)}}}function R(e,t){var r=t.method,n=e.iterator[r];if(void 0===n)return t.delegate=null,"throw"===r&&e.iterator.return&&(t.method="return",t.arg=void 0,R(e,t),"throw"===t.method)||"return"!==r&&(t.method="throw",t.arg=new TypeError("The iterator does not provide a '"+r+"' method")),d;var o=p(n,e.iterator,t.arg);if("throw"===o.type)return t.method="throw",t.arg=o.arg,t.delegate=null,d;var i=o.arg;return i?i.done?(t[e.resultName]=i.value,t.next=e.nextLoc,"return"!==t.method&&(t.method="next",t.arg=void 0),t.delegate=null,d):i:(t.method="throw",t.arg=new TypeError("iterator result is not an object"),t.delegate=null,d)}function S(e){var t={tryLoc:e[0]};1 in e&&(t.catchLoc=e[1]),2 in e&&(t.finallyLoc=e[2],t.afterLoc=e[3]),this.tryEntries.push(t)}function k(e){var t=e.completion||{};t.type="normal",delete t.arg,e.completion=t}function O(e){this.tryEntries=[{tryLoc:"root"}],e.forEach(S,this),this.reset(!0)}function j(e){if(e){var t=e[c];if(t)return t.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length)){var r=-1,n=function t(){for(;++r<e.length;)if(o.call(e,r))return t.value=e[r],t.done=!1,t;return t.value=void 0,t.done=!0,t};return n.next=n}}return{next:L}}function L(){return{value:void 0,done:!0}}return m.prototype=g,i(x,"constructor",{value:g,configurable:!0}),i(g,"constructor",{value:m,configurable:!0}),m.displayName=l(g,u,"GeneratorFunction"),r.isGeneratorFunction=function(e){var t="function"==typeof e&&e.constructor;return!!t&&(t===m||"GeneratorFunction"===(t.displayName||t.name))},r.mark=function(e){return Object.setPrototypeOf?Object.setPrototypeOf(e,g):(e.__proto__=g,l(e,u,"GeneratorFunction")),e.prototype=Object.create(x),e},r.awrap=function(e){return{__await:e}},w(_.prototype),l(_.prototype,s,(function(){return this})),r.AsyncIterator=_,r.async=function(e,t,n,o,i){void 0===i&&(i=Promise);var a=new _(f(e,t,n,o),i);return r.isGeneratorFunction(t)?a:a.next().then((function(e){return e.done?e.value:a.next()}))},w(x),l(x,u,"Generator"),l(x,c,(function(){return this})),l(x,"toString",(function(){return"[object Generator]"})),r.keys=function(e){var t=Object(e),r=[];for(var n in t)r.push(n);return r.reverse(),function e(){for(;r.length;){var n=r.pop();if(n in t)return e.value=n,e.done=!1,e}return e.done=!0,e}},r.values=j,O.prototype={constructor:O,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(k),!e)for(var t in this)"t"===t.charAt(0)&&o.call(this,t)&&!isNaN(+t.slice(1))&&(this[t]=void 0)},stop:function(){this.done=!0;var e=this.tryEntries[0].completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(e){if(this.done)throw e;var t=this;function r(r,n){return a.type="throw",a.arg=e,t.next=r,n&&(t.method="next",t.arg=void 0),!!n}for(var n=this.tryEntries.length-1;n>=0;--n){var i=this.tryEntries[n],a=i.completion;if("root"===i.tryLoc)return r("end");if(i.tryLoc<=this.prev){var c=o.call(i,"catchLoc"),s=o.call(i,"finallyLoc");if(c&&s){if(this.prev<i.catchLoc)return r(i.catchLoc,!0);if(this.prev<i.finallyLoc)return r(i.finallyLoc)}else if(c){if(this.prev<i.catchLoc)return r(i.catchLoc,!0)}else{if(!s)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return r(i.finallyLoc)}}}},abrupt:function(e,t){for(var r=this.tryEntries.length-1;r>=0;--r){var n=this.tryEntries[r];if(n.tryLoc<=this.prev&&o.call(n,"finallyLoc")&&this.prev<n.finallyLoc){var i=n;break}}i&&("break"===e||"continue"===e)&&i.tryLoc<=t&&t<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=e,a.arg=t,i?(this.method="next",this.next=i.finallyLoc,d):this.complete(a)},complete:function(e,t){if("throw"===e.type)throw e.arg;return"break"===e.type||"continue"===e.type?this.next=e.arg:"return"===e.type?(this.rval=this.arg=e.arg,this.method="return",this.next="end"):"normal"===e.type&&t&&(this.next=t),d},finish:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var r=this.tryEntries[t];if(r.finallyLoc===e)return this.complete(r.completion,r.afterLoc),k(r),d}},catch:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var r=this.tryEntries[t];if(r.tryLoc===e){var n=r.completion;if("throw"===n.type){var o=n.arg;k(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(e,t,r){return this.delegate={iterator:j(e),resultName:t,nextLoc:r},"next"===this.method&&(this.arg=void 0),d}},r}function r(e){return function(e){if(Array.isArray(e))return l(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||u(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function n(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?n(Object(r),!0).forEach((function(t){i(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):n(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function i(t,r,n){return(r=function(t){var r=function(t,r){if("object"!==e(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var o=n.call(t,"string");if("object"!==e(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(t);return"symbol"===e(r)?r:String(r)}(r))in t?Object.defineProperty(t,r,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[r]=n,t}function a(e,t,r,n,o,i,a){try{var c=e[i](a),s=c.value}catch(e){return void r(e)}c.done?t(s):Promise.resolve(s).then(n,o)}function c(e){return function(){var t=this,r=arguments;return new Promise((function(n,o){var i=e.apply(t,r);function c(e){a(i,n,o,c,s,"next",e)}function s(e){a(i,n,o,c,s,"throw",e)}c(void 0)}))}}function s(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var n,o,i,a,c=[],s=!0,u=!1;try{if(i=(r=r.call(e)).next,0===t){if(Object(r)!==r)return;s=!1}else for(;!(s=(n=i.call(r)).done)&&(c.push(n.value),c.length!==t);s=!0);}catch(e){u=!0,o=e}finally{try{if(!s&&null!=r.return&&(a=r.return(),Object(a)!==a))return}finally{if(u)throw o}}return c}}(e,t)||u(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function u(e,t){if(e){if("string"==typeof e)return l(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?l(e,t):void 0}}function l(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}var f=window.api_path,p={settings:{name:"Fractional Tax",icon_color:"#000000",icon_url:"https://static.wixstatic.com/media/d5aed9_8f60f745a59a48b7bfffc0c8de3e28f1~mv2.png/v1/fill/w_128,h_128,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Favicom%20Brighter%20Special%20size.png",message_color:"#8888FF",first_messages:[{is_bot:!0,text:"Hello!"}]},is_fullscreen:!1,set_fullscreen:function(e){},is_simulating:!1,simulate:function(){},is_responding:!1,count_unread:0,set_count_unread:function(){}},d=React.createContext(p),h=function(e){var t=e.is_self,r=e.children,n=React.useContext(d).settings;return""==r?React.createElement("div",null):React.createElement("div",{style:{margin:"0.5rem auto",width:"100%",textAlign:t?"right":"left"}},React.createElement("div",{style:{paddingTop:"0.25rem",paddingBottom:"0.25rem",paddingLeft:"0.75rem",paddingRight:"0.75rem",borderRadius:"0.375rem",display:"inline-block",marginLeft:t?"30px":"0",marginRight:t?"0":"30px",backgroundColor:t?n.message_color:"rgba(0,0,0,0.05)",color:t?"white":"black"}},r))},m=alert,g=function(e){var t=e.is_positive,r=e.rate,n=e.is_selected;return React.createElement("div",{style:{backgroundColor:n?t?"#00BB44":"#BB0000":t?"#88DDBB":"#DD8888",borderRadius:"100%",width:"20px",height:"20px",marginRight:"5px",cursor:"pointer",display:"inline-block"}},React.createElement("div",{style:{color:"white",textAlign:"center",paddingTop:"2px",fontSize:"12px"},onClick:function(){return r(n?void 0:t)}},t?"+":"-"))},v=function(e){var t=e.message_index,r=e.chat_id,n=s(React.useState(void 0),2),o=n[0],i=n[1],a=s(React.useState(void 0),2),c=a[0],u=a[1];return React.useEffect((function(){o!=c&&(null==c&&null==o||function(e,t){return O.apply(this,arguments)}("message_rating",{message_index:t,chat:r}).catch(m),null!=o&&R("message_rating",[{message_index:t,chat:r,is_positive:o}]).catch(m),u(o))}),[o]),React.createElement("div",{className:"flex text-[12px] px-1 pb-1"},React.createElement("div",{className:"mr-2 text-[#666] italic"},"Was this message helpful?"),React.createElement("div",{className:"flex inline-block w-[100px] text-right translate-y-[-5px]"},React.createElement(g,{is_selected:1==o,is_positive:!0,rate:i}),React.createElement(g,{is_selected:0==o,is_positive:!1,rate:i})))},y=function(){var e=React.useContext(d),t=(e.is_fullscreen,e.set_fullscreen,e.settings);return React.createElement("div",{style:{height:"50px"}},React.createElement("img",{src:t.icon_url,width:"38px",height:"38px",style:{borderRadius:"50%",width:"38px",height:"38px",display:"inline-block",marginRight:"0.75rem",backgroundColor:t.icon_color}}),React.createElement("div",{style:{verticalAlign:"top",paddingTop:"7px",fontSize:"18px",display:"inline-block",color:"rgba(0,0,0,0.6)"}},t.name))};function b(e){var t=e.code;return React.createElement("div",{className:"relative max-w-[100%] pb-0 mb-3"},React.createElement("div",{className:"absolute top-[5px] right-[3px] font-bold cursor-pointer text-white"},React.createElement(IoIosCopy,{onClick:function(){navigator.clipboard.writeText(t),display_success("Copied to clipboard")}})),React.createElement("pre",{className:"bg-black mb-0 text-white text-[12px] overflow-scroll rounded-md"},t))}var x=function(e){var t=e.add_message,r=React.useContext(d);function n(){var e=document.getElementById("chat_input"),r=e.value.trim();e.value="",r.length>0&&t(r)}return r.simulate,r.is_simulating,React.createElement("div",null,React.createElement("input",{id:"chat_input",onKeyDown:function(e){"Enter"===e.key&&n()},type:"text",style:{border:"1px solid #CCC",borderRadius:"5px",padding:"15px 55px 15px 15px",width:"100%",backgroundColor:"#FFF",color:"#000"}}),React.createElement("img",{src:"https://legalbot.qame.org/paperplane.svg",width:"40px",height:"40px",onClick:n,style:{position:"absolute",right:"1rem",bottom:"0.8rem",fontSize:"20px",cursor:"pointer"}}))},w=function(e){var t=e.set_is_open,r=e.is_open,n=React.useContext(d),o=n.settings,i=n.count_unread;return React.createElement("div",{style:{position:"fixed",bottom:"2rem",right:"2rem"},onClick:function(){return t(!r)}},React.createElement("div",{style:{backgroundColor:o.icon_color,borderRadius:"50%",width:"50px",height:"50px",color:"white",textAlign:"center",fontSize:"22px",paddingTop:"5px",cursor:"pointer",position:"absolute",right:"0",bottom:"0",overflow:"hidden",zIndex:99998}},React.createElement("img",{src:o.icon_url,style:{width:"40px",height:"40px",margin:"auto"}})),i>0?React.createElement("div",{style:{backgroundColor:"#FF0000",borderRadius:"50%",width:"26px",height:"26px",color:"white",textAlign:"center",fontSize:"12px",fontWeight:"bold",cursor:"pointer",position:"absolute",right:"-10px",border:"3px solid #FFFFFF",bottom:"30px",overflow:"hidden",zIndex:99999}},i):null)};function _(e,t,r){return E.apply(this,arguments)}function E(){return E=c(t().mark((function e(r,n,o){var i,a,s,u,l=arguments;return t().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return i=!(l.length>3&&void 0!==l[3])||l[3],a=["POST","PUT"],s=o.method||"POST",u=a.includes(s),e.abrupt("return",fetch(f+(r.startsWith("/")?r.substring(1):r)+(!u&&n?(r.includes("?")?"&":"?")+"body="+encodeURIComponent(JSON.stringify(n)):""),{method:s,mode:"cors",cache:"no-cache",credentials:"same-origin",headers:{"Content-Type":"application/json"},redirect:"follow",referrerPolicy:"no-referrer",body:u?JSON.stringify(n):void 0}).then(function(){var e=c(t().mark((function e(a){var s;return t().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!i){e.next=11;break}return e.next=3,a.json().catch(function(){var e=c(t().mark((function e(i){var a;return t().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("The following error occured in "+r+": "+i.message),e.next=3,_(r,n,o,!1);case 3:throw a=e.sent,console.log("Text result:\n\n"+a),new Error("An error occurred: "+i.message);case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());case 3:if(s=e.sent,a.ok){e.next=8;break}throw new Error(s.error);case 8:return e.abrupt("return",s.data);case 9:e.next=14;break;case 11:return e.next=13,a.text();case 13:return e.abrupt("return",e.sent);case 14:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()));case 5:case"end":return e.stop()}}),e)}))),E.apply(this,arguments)}function R(e,t){return S.apply(this,arguments)}function S(){return(S=c(t().mark((function e(r,n){return t().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,_(r,{documents:n},{method:"POST"});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function k(){return k=c(t().mark((function e(r,n){var o,i=arguments;return t().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return o=!(i.length>2&&void 0!==i[2])||i[2],e.next=3,_(r,{query:n,multiple:o},{method:"GET"});case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}}),e)}))),k.apply(this,arguments)}function O(){return(O=c(t().mark((function e(r,n){return t().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,_(r,{query:n},{method:"DELETE"});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function j(e,t,r,n){var o=s(React.useState(void 0),2),i=o[0],a=o[1],c=s(React.useState(0),2),u=c[0],l=c[1],f=s(React.useState(!1),2),p=f[0],d=f[1];return React.useEffect((function(){n||(d(!0),function(e,t){return k.apply(this,arguments)}(e,t,r).then(a).finally((function(){return d(!1)})))}),[n,u]),{data:i,reload:function(){return l(u+1)},is_loading:p}}var L=function(e){var n,i,a,u,l,h,g=e.salesbot_id,v=e.is_always_open,b=void 0!==v&&v,_=e.is_never_fullscreen,E=void 0!==_&&_,S=e.on_new_message,k=e.rect,O=s(React.useState(!1),2),L=O[0],C=O[1],T=s(React.useState(!1),2),P=T[0],I=T[1],A=s(React.useState(b),2),N=A[0],B=A[1],z=s(React.useState([]),2),D=z[0],G=z[1],M=s(React.useState([]),2),q=M[0],H=M[1],J=p,U=s(React.useState(!1),2),W=U[0],Y=U[1],$=s(React.useState(""),2),K=$[0],Q=$[1],V=s(React.useState(1),2),X=V[0],Z=V[1],ee=s(React.useState(function(e){for(var t="",r=0;r<20;r+=1)t+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".charAt(Math.floor(62*Math.random()));return t}()),2),te=ee[0],re=(ee[1],(i={salesbot:g,memory:{},identifier:te},a=j("chat",{salesbot:g,identifier:te},!1,n=!N),u=a.data,l=a.reload,h=a.is_loading,React.useEffect((function(){n||h||null!==u||R("chat",[i]).then(l).catch(m)}),[h]),a).data),ne=j("salesbot",{_id:g},!1,!1).data,oe=re?re._id:void 0;function ie(e){return window.salesbot&&window.salesbot[e]||p.settings[e]}var ae=ne&&J&&{settings:o(o({},J.settings),{},{name:ie("name"),icon_color:ie("icon_color"),icon_url:ie("icon_url"),message_color:ie("message_color"),first_messages:ie("first_messages")}),is_fullscreen:!E&&W,set_fullscreen:E?function(e){return Y(!1)}:Y,is_simulating:P,is_responding:L,simulate:function(){return le.apply(this,arguments)},count_unread:X,set_count_unread:Z};function ce(e){return se.apply(this,arguments)}function se(){return se=c(t().mark((function e(n){var o,i,a,s,u;return t().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return u=function(){return u=c(t().mark((function e(o){var i,c,u;return t().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,a.read();case 2:if(i=e.sent,c=i.value,!i.done){e.next=10;break}return Z(X+1),fe(o,n,!1),Q(""),e.abrupt("return");case 10:if(u=(new TextDecoder).decode(c),!(o.length<40&&q.length<D.length&&(o+u).includes("<<<"))){e.next=18;break}return t=(o+u).split("<<<")[0].trim().toLowerCase(),l=void 0,f=void 0,l=D.length-q.length,(f=[].concat(r(q),r(Array(l).fill(void 0))))[f.length-1]=t,H(f),e.next=16,s("");case 16:e.next=21;break;case 18:return Q(o+u),e.next=21,s(o+u);case 21:case"end":return e.stop()}var t,l,f}),e)}))),u.apply(this,arguments)},s=function(e){return u.apply(this,arguments)},e.next=4,fetch(f+"chat/"+(n?"simulate":"respond"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({messages:n?D.map((function(e){return{text:e.text,is_self:!e.is_self}})):D,chat_id:oe})});case 4:if((o=e.sent).ok){e.next=7;break}throw new Error("An error occurred: ".concat(o.statusText));case 7:return i=o.body,a=i.getReader(),e.next=11,s("");case 11:case"end":return e.stop()}}),e)}))),se.apply(this,arguments)}function ue(){return(ue=c(t().mark((function e(){return t().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return C(!0),e.next=3,ce(!1).catch(m);case 3:C(!1);case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function le(){return(le=c(t().mark((function e(){return t().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return I(!0),e.next=3,ce(!0).catch(m);case 3:I(!1);case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function fe(e,t,r){pe([{text:e,is_self:t,is_generated:r}])}function pe(e){var t;G([].concat(r(D),r(e))),(t=document.getElementById("chat_history"))&&(t.scrollTop=t.scrollHeight)}return React.useEffect((function(){D.length>0&&D[D.length-1].is_self&&!D[D.length-1].is_generated&&function(){ue.apply(this,arguments)}(),S&&S()}),[D]),React.useEffect((function(){ae&&0===D.length&&pe(ae.settings.first_messages.map((function(e){var t=e.is_bot;return{text:e.text,is_self:!t,is_generated:!0}})))}),[ae]),ae?React.createElement(d.Provider,{value:ae},W&&(N||b)?React.createElement("div",{style:{position:"fixed",top:"0",left:"0",width:"100vw",height:"100vh",backgroundColor:"rgba(0, 0, 0, 0.5)",zIndex:"5000"},onClick:function(){return Y(!W&&!E)}}):null,React.createElement("div",{style:{right:"2.5rem"}},b?null:React.createElement(w,{is_open:N,set_is_open:B})),(N||b)&&oe?React.createElement("div",{class:"chatbot",style:{color:"black",border:"1px solid rgba(0, 0, 0, 0.15)",padding:"0.5rem",backgroundColor:"#FFFFFF",zIndex:99999,boxShadow:"0 25px 50px -12px rgba(0, 0, 0, 0.25)",borderRadius:"15px",transition:"all 0.5s ease-in-out",width:W?"auto":"400px",position:"absolute",top:k.top,left:k.left}},React.createElement(y,null),React.createElement(F,{post_process_code:ne.post_process,chat_id:oe,messages:D,current_message:K,labels:q}),React.createElement(x,{add_message:function(e){return fe(e,!0,!1)}}),oe?null:React.createElement("div",{style:{backgroundColor:"rgba(0,0,0,0.7)",borderRadius:"15px",top:0,left:0,right:0,bottom:0,position:"absolute",color:"#FFFFFF",textAlign:"center",paddingTop:"300px"}},"Initiating chat, one moment ...")):null):React.createElement("div",null)},F=function(e){var t=e.post_process_code,r=e.chat_id,n=e.messages,o=e.current_message,i=e.labels,a=React.useContext(d),c=a.is_fullscreen,u=a.is_simulating,l=a.is_responding,f=a.set_count_unread;return React.useEffect((function(){f(0)}),[n]),React.createElement("div",{id:"chat_history",style:{marginBottom:"0.5rem",overflowY:"auto",paddingRight:"0.5rem",paddingBottom:"70px",transition:"all 0.5s ease-in-out",paddingTop:"1.25rem",height:c?"calc(90vh - 100px)":"500px"}},n.map((function(e,r){var n=e.text,o=e.is_self;return React.createElement(h,{key:r,is_self:o,label:i[r]},function(e){var t=e.split(/(```[^`]+```)/),r=[],n=/\[([^\]]+)\]\(([^)]+)\)/g;return t.forEach((function(e,t){if(t%2==0)e=e.replace(n,'<a class="font-bold" href="$2">$1</a>'),r.push(React.createElement("p",{className:"",dangerouslySetInnerHTML:{__html:e}}));else{var o=s(e.match(/```([^`]+)```/),2),i=(o[0],o[1]);r.push(React.createElement(b,{code:i}))}})),React.createElement("div",null,r.map((function(e,t){return React.createElement("div",{key:t,className:""},e)})))}(function(e,t){try{return new Function("text",e)(t)}catch(e){return console.log(e),e.toString()}}(t,n)))})),n.length>1&&!n[n.length-1].is_self?React.createElement(v,{chat_id:r,message_index:n.length-1}):null,o.length>0?React.createElement(h,{is_self:u},o):l?React.createElement("p",{style:{color:"#666",fontSize:"14px",margin:"0.5rem"}},"writing ..."):null)},C=function(){var e=s(React.useState(!1),2),t=e[0],r=e[1],n=React.useRef(),o=s(React.useState({top:0,left:0}),2),i=o[0],a=o[1];function c(){a(n.current.getBoundingClientRect())}return React.useEffect((function(){if(t&&n.current)return c(),window.addEventListener("resize",c),function(){return window.removeEventListener("resize",c)}}),[n.current,t]),React.useEffect((function(){var e=setInterval((function(){n.current&&(r(!0),clearInterval(e))}),100);return function(){return clearInterval(e)}}),[]),window.salesbot?React.createElement("div",null,React.createElement("div",{ref:n,style:window.salesbot.position,class:"chatbot_box"}),t?React.createElement(L,{salesbot_id:window.salesbot.id,rect:i,is_always_open:!0,is_never_fullscreen:!1,on_new_message:function(e){}}):null):React.createElement("div",null)};ReactDOM.createRoot(document.getElementById("chatbot_box")).render(React.createElement(C,null)),document.getElementById("chatbot_box").style.zIndex=99999})();
