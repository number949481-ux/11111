var e=(e,t,n)=>(r,i)=>{let a=-1;return o(0);async function o(s){if(s<=a)throw Error(`next() called multiple times`);a=s;let c,l=!1,u;if(e[s]?(u=e[s][0][0],r.req.routeIndex=s):u=s===e.length&&i||void 0,u)try{c=await u(r,()=>o(s+1))}catch(e){if(e instanceof Error&&t)r.error=e,c=await t(e,r),l=!0;else throw e}else r.finalized===!1&&n&&(c=await n(r));return c&&(r.finalized===!1||l)&&(r.res=c),r}},t=Symbol(),n=(e,t)=>new Response(e,{headers:{"Content-Type":t.replace(/^[^;]+/,e=>e.toLowerCase())}}).formData(),r=e=>`headers`in e,i=async(e,t=Object.create(null))=>{let{all:n=!1,dot:i=!1}=t,o=(r(e)?e.headers:e.raw.headers).get(`Content-Type`)?.split(`;`)[0].trim().toLowerCase();return o===`multipart/form-data`||o===`application/x-www-form-urlencoded`?a(e,{all:n,dot:i}):{}};async function a(e,t){if(!r(e)&&e.bodyCache.formData)return o(await e.bodyCache.formData,t);let i=r(e)?e.headers:e.raw.headers,a=n(await e.arrayBuffer(),i.get(`Content-Type`)||``);r(e)||(e.bodyCache.formData=a);let s=await a;return s?o(s,t):{}}function o(e,t){let n=Object.create(null);return e.forEach((e,r)=>{t.all||r.endsWith(`[]`)?s(n,r,e):n[r]=e}),t.dot&&Object.entries(n).forEach(([e,t])=>{e.includes(`.`)&&(c(n,e,t),delete n[e])}),n}var s=(e,t,n)=>{e[t]===void 0?e[t]=t.endsWith(`[]`)?[n]:n:Array.isArray(e[t])?e[t].push(n):e[t]=[e[t],n]},c=(e,t,n)=>{if(/(?:^|\.)__proto__\./.test(t))return;let r=e,i=t.split(`.`);i.forEach((e,t)=>{t===i.length-1?r[e]=n:((!r[e]||typeof r[e]!=`object`||Array.isArray(r[e])||r[e]instanceof File)&&(r[e]=Object.create(null)),r=r[e])})},l=e=>{let t=e.split(`/`);return t[0]===``&&t.shift(),t},u=e=>{let{groups:t,path:n}=d(e);return f(l(n),t)},d=e=>{let t=[];return e=e.replace(/\{[^}]+\}/g,(e,n)=>{let r=`@${n}`;return t.push([r,e]),r}),{groups:t,path:e}},f=(e,t)=>{for(let n=t.length-1;n>=0;n--){let[r]=t[n];for(let i=e.length-1;i>=0;i--)if(e[i].includes(r)){e[i]=e[i].replace(r,t[n][1]);break}}return e},p={},m=(e,t)=>{if(e===`*`)return`*`;let n=e.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);if(n){let r=`${e}#${t}`;return p[r]||(p[r]=n[2]?t&&t[0]!==`:`&&t[0]!==`*`?[r,n[1],RegExp(`^${n[2]}(?=/${t})`)]:[e,n[1],RegExp(`^${n[2]}$`)]:[e,n[1],!0]),p[r]}return null},h=(e,t)=>{try{return t(e)}catch{return e.replace(/(?:%[0-9A-Fa-f]{2})+/g,e=>{try{return t(e)}catch{return e}})}},g=e=>h(e,decodeURI),_=e=>{let t=e.url,n=t.indexOf(`/`,t.indexOf(`:`)+4),r=n;for(;r<t.length;r++){let e=t.charCodeAt(r);if(e===37){let e=t.indexOf(`?`,r),i=t.indexOf(`#`,r),a=e===-1?i===-1?void 0:i:i===-1?e:Math.min(e,i),o=t.slice(n,a);return g(o.includes(`%25`)?o.replace(/%25/g,`%2525`):o)}if(e===63||e===35)break}return t.slice(n,r)},v=e=>{let t=_(e);return t.length>1&&t.at(-1)===`/`?t.slice(0,-1):t},y=(e,t,...n)=>(n.length&&(t=y(t,...n)),`${e?.[0]===`/`?``:`/`}${e}${t===`/`?``:`${e?.at(-1)===`/`?``:`/`}${t?.[0]===`/`?t.slice(1):t}`}`),b=e=>{if(e.charCodeAt(e.length-1)!==63||!e.includes(`:`))return null;let t=e.split(`/`),n=[],r=``;return t.forEach(e=>{if(e!==``&&!/\:/.test(e))r+=`/`+e;else if(/\:/.test(e)){if(e.charCodeAt(e.length-1)===63){n.length===0&&r===``?n.push(`/`):n.push(r);let t=e.slice(0,-1);r+=`/`+t,n.push(r)}else r+=`/`+e}}),n.filter((e,t,n)=>n.indexOf(e)===t)},x=e=>e.indexOf(`%`)===-1?e:h(e,te),S=e=>(e.indexOf(`+`)!==-1&&(e=e.replace(/\+/g,` `)),x(e)),C=(e,t,n)=>{let r;if(!n&&t&&t.indexOf(`%`)===-1&&t.indexOf(`+`)===-1){let n=e.indexOf(`?`,8);if(n===-1)return;for(e.startsWith(t,n+1)||(n=e.indexOf(`&${t}`,n+1));n!==-1;){let r=e.charCodeAt(n+t.length+1);if(r===61){let r=n+t.length+2,i=e.indexOf(`&`,r);return S(e.slice(r,i===-1?void 0:i))}if(r==38||isNaN(r))return``;n=e.indexOf(`&${t}`,n+1)}if(r=/[%+]/.test(e),!r)return}let i=Object.create(null);r??=/[%+]/.test(e);let a=e.indexOf(`?`,8);for(;a!==-1;){let t=e.indexOf(`&`,a+1),o=e.indexOf(`=`,a);o>t&&t!==-1&&(o=-1);let s=e.slice(a+1,o===-1?t===-1?void 0:t:o);if(r&&(s=S(s)),a=t,s===``)continue;let c;o===-1?c=``:(c=e.slice(o+1,t===-1?void 0:t),r&&(c=S(c))),n?(i[s]&&Array.isArray(i[s])||(i[s]=[]),i[s].push(c)):i[s]??=c}return t?i[t]:i},w=C,ee=(e,t)=>C(e,t,!0),te=decodeURIComponent,ne=class{raw;#e;#t;routeIndex=0;path;bodyCache={};constructor(e,t=`/`,n=[[]]){this.raw=e,this.path=t,this.#t=n}param(e){return e?this.#n(e):this.#r()}#n(e){let t=this.#t[0][this.routeIndex][1][e],n=this.#i(t);return n&&x(n)}#r(){let e={},t=Object.keys(this.#t[0][this.routeIndex][1]);for(let n of t){let t=this.#i(this.#t[0][this.routeIndex][1][n]);t!==void 0&&(e[n]=x(t))}return e}#i(e){return this.#t[1]?this.#t[1][e]:e}query(e){return w(this.url,e)}queries(e){return ee(this.url,e)}header(e){if(e)return this.raw.headers.get(e)??void 0;let t=Object.create(null);return this.raw.headers.forEach((e,n)=>{t[n]=e}),t}async parseBody(e){return i(this,e)}#a=e=>{let{bodyCache:t,raw:n}=this,r=t[e];if(r)return r;for(let n in t)return t[n].then(t=>(n===`json`&&(t=JSON.stringify(t)),new Response(t)[e]()));return t[e]=n[e]()};json(){return this.#a(`text`).then(e=>JSON.parse(e))}text(){return this.#a(`text`)}arrayBuffer(){return this.#a(`arrayBuffer`)}bytes(){return this.#a(`arrayBuffer`).then(e=>new Uint8Array(e))}blob(){return this.#a(`blob`)}formData(){return this.#a(`formData`)}addValidatedData(e,t){(this.#e??={})[e]=t}valid(e){return this.#e?.[e]}get url(){return this.raw.url}get method(){return this.raw.method}get[t](){return this.#t}get matchedRoutes(){return this.#t[0].map(([[,e]])=>e)}get routePath(){return this.#t[0].map(([[,e]])=>e)[this.routeIndex].path}},re={Stringify:1,BeforeStream:2,Stream:3},ie=(e,t)=>{let n=new String(e);return n.isEscaped=!0,n.callbacks=t,n},T=async(e,t,n,r,i)=>{typeof e==`object`&&!(e instanceof String)&&(e instanceof Promise||(e=e.toString()),e instanceof Promise&&(e=await e));let a=e.callbacks;if(!a?.length)return Promise.resolve(e);i?i[0]+=e:i=[e];let o=Promise.all(a.map(e=>e({phase:t,buffer:i,context:r}))).then(e=>Promise.all(e.filter(Boolean).map(e=>T(e,t,!1,r,i))).then(()=>i[0]));return n?ie(await o,a):o},ae=`text/plain; charset=UTF-8`,E=(e,t)=>({"Content-Type":e,...t}),D=(e,t)=>new Response(e,t),O=class{#e;#t;env={};#n;finalized=!1;error;#r;#i;#a;#o;#s;#c;#l;#u;#d;constructor(e,t){this.#e=e,t&&(this.#i=t.executionCtx,this.env=t.env,this.#c=t.notFoundHandler,this.#d=t.path,this.#u=t.matchResult)}get req(){return this.#t??=new ne(this.#e,this.#d,this.#u),this.#t}get event(){if(this.#i&&`respondWith`in this.#i)return this.#i;throw Error(`This context has no FetchEvent`)}get executionCtx(){if(this.#i)return this.#i;throw Error(`This context has no ExecutionContext`)}get res(){return this.#a||=D(null,{headers:this.#l??=new Headers})}set res(e){if(this.#a&&e){e=D(e.body,e);for(let[t,n]of this.#a.headers.entries())if(t!==`content-type`){if(t===`set-cookie`){let t=this.#a.headers.getSetCookie();e.headers.delete(`set-cookie`);for(let n of t)e.headers.append(`set-cookie`,n)}else e.headers.set(t,n)}}this.#a=e,this.finalized=!0}render=(...e)=>(this.#s??=e=>this.html(e),this.#s(...e));setLayout=e=>this.#o=e;getLayout=()=>this.#o;setRenderer=e=>{this.#s=e};header=(e,t,n)=>{this.finalized&&(this.#a=D(this.#a.body,this.#a));let r=this.#a?this.#a.headers:this.#l??=new Headers;t===void 0?r.delete(e):n?.append?r.append(e,t):r.set(e,t)};status=e=>{this.#r=e};set=(e,t)=>{this.#n??=new Map,this.#n.set(e,t)};get=e=>this.#n?this.#n.get(e):void 0;get var(){return this.#n?Object.fromEntries(this.#n):{}}#f(e,t,n){let r=this.#a?new Headers(this.#a.headers):this.#l;if(typeof t==`object`&&t.headers){r??=new Headers;for(let[e,n]of new Headers(t.headers))e===`set-cookie`?r.append(e,n):r.set(e,n)}if(n){if(!r){let e=0;for(let t in n)if(++e>1||typeof n[t]!=`string`){r=new Headers;break}}if(r)for(let e in n){let t=n[e];if(typeof t==`string`)r.set(e,t);else{r.delete(e);for(let n of t)r.append(e,n)}}}return D(e,{status:typeof t==`number`?t:t?.status??this.#r,headers:r??n})}newResponse=(...e)=>this.#f(...e);body=(e,t,n)=>this.#f(e,t,n);text=(e,t,n)=>!this.#l&&!this.#r&&!t&&!n&&!this.finalized?new Response(e):this.#f(e,t,E(ae,n));json=(e,t,n)=>this.#f(JSON.stringify(e),t,E(`application/json`,n));html=(e,t,n)=>{let r=e=>this.#f(e,t,E(`text/html; charset=UTF-8`,n));return typeof e==`object`?T(e,re.Stringify,!1,{}).then(r):r(e)};redirect=(e,t)=>{let n=String(e);return this.header(`Location`,/[^\x00-\xFF]/.test(n)?encodeURI(n):n),this.newResponse(null,t??302)};notFound=()=>(this.#c??=()=>D(),this.#c(this))},oe=[`get`,`post`,`put`,`delete`,`options`,`patch`,`query`],k=`Can not add a route since the matcher is already built.`,A=class extends Error{},j=`__COMPOSED_HANDLER`,M=e=>e.text(`404 Not Found`,404),N=(e,t)=>{if(`getResponse`in e){let n=e.getResponse();return t.newResponse(n.body,n)}return console.error(e),t.text(`Internal Server Error`,500)},P=class t{get;post;put;delete;options;patch;query;all;on;use;router;getPath;_basePath=`/`;#e=`/`;routes=[];constructor(e={}){[...oe,`all`].forEach(e=>{this[e]=(t,...n)=>(typeof t==`string`?this.#e=t:this.#r(e,this.#e,t),n.forEach(t=>{this.#r(e,this.#e,t)}),this)}),this.on=(e,t,...n)=>{for(let r of[t].flat()){this.#e=r;for(let t of[e].flat())n.map(e=>{this.#r(t.toUpperCase(),this.#e,e)})}return this},this.use=(e,...t)=>(typeof e==`string`?this.#e=e:(this.#e=`*`,t.unshift(e)),t.forEach(e=>{this.#r(`ALL`,this.#e,e)}),this);let{strict:t,...n}=e;Object.assign(this,n),this.getPath=t??!0?e.getPath??_:v}#t(){let e=new t({router:this.router,getPath:this.getPath});return e.errorHandler=this.errorHandler,e.#n=this.#n,e.routes=this.routes,e}#n=M;errorHandler=N;route(t,n){let r=this.basePath(t);return n.routes.map(t=>{let i;n.errorHandler===N?i=t.handler:(i=async(r,i)=>(await e([],n.errorHandler)(r,()=>t.handler(r,i))).res,i[j]=t.handler),r.#r(t.method,t.path,i,t.basePath)}),this}basePath(e){let t=this.#t();return t._basePath=y(this._basePath,e),t}onError=e=>(this.errorHandler=e,this);notFound=e=>(this.#n=e,this);mount(e,t,n){let r,i;n&&(typeof n==`function`?i=n:(i=n.optionHandler,r=n.replaceRequest===!1?e=>e:n.replaceRequest));let a=i?e=>{let t=i(e);return Array.isArray(t)?t:[t]}:e=>{let t;try{t=e.executionCtx}catch{}return[e.env,t]};return r||=(()=>{let t=y(this._basePath,e),n=t===`/`?0:t.length;return e=>{let t=new URL(e.url);return t.pathname=this.getPath(e).slice(n)||`/`,new Request(t,e)}})(),this.#r(`ALL`,y(e,`*`),async(e,n)=>{let i=await t(r(e.req.raw),...a(e));if(i)return i;await n()}),this}#r(e,t,n,r){e=e.toUpperCase(),t=y(this._basePath,t);let i={basePath:r===void 0?this._basePath:y(this._basePath,r),path:t,method:e,handler:n};this.router.add(e,t,[n,i]),this.routes.push(i)}#i(e,t){if(e instanceof Error)return this.errorHandler(e,t);throw e}#a(t,n,r,i){if(i===`HEAD`)return(async()=>new Response(null,await this.#a(t,n,r,`GET`)))();let a=this.getPath(t,{env:r}),o=this.router.match(i,a),s=new O(t,{path:a,matchResult:o,env:r,executionCtx:n,notFoundHandler:this.#n});if(o[0].length===1){let e;try{e=o[0][0][0][0](s,async()=>{s.res=await this.#n(s)})}catch(e){return this.#i(e,s)}return e instanceof Promise?e.then(e=>e||(s.finalized?s.res:this.#n(s))).catch(e=>this.#i(e,s)):e??this.#n(s)}let c=e(o[0],this.errorHandler,this.#n);return(async()=>{try{let e=await c(s);if(!e.finalized)throw Error("Context is not finalized. Did you forget to return a Response object or `await next()`?");return e.res}catch(e){return this.#i(e,s)}})()}fetch=(e,...t)=>this.#a(e,t[1],t[0],e.method);request=(e,t,n,r)=>e instanceof Request?this.fetch(t?new Request(e,t):e,n,r):(e=e.toString(),this.fetch(new Request(/^https?:\/\//.test(e)?e:`http://localhost${y(`/`,e)}`,t),n,r));fire=()=>{addEventListener(`fetch`,e=>{e.respondWith(this.#a(e.request,e,void 0,e.request.method))})}},F=[];function se(e,t){let n=this.buildAllMatchers(),r=((e,t)=>{let r=n[e]||n.ALL,i=r[2][t];if(i)return i;let a=t.match(r[0]);if(!a)return[[],F];let o=a.indexOf(``,1);return[r[1][o],a]});return this.match=r,r(e,t)}var I=`[^/]+`,L=`.*`,R=`(?:|/.*)`,z=Symbol(),B=new Set(`.\\+*[^]$()`);function V(e,t){return e.length===1?t.length===1?e<t?-1:1:-1:t.length===1?1:e===L||e===R?t===R?-1:1:t===L||t===R?-1:e===I?1:t===I?-1:e.length===t.length?e<t?-1:1:t.length-e.length}var H=class e{#e;#t;#n=Object.create(null);insert(t,n,r,i,a){let o=this;for(let n=0,a=t.length;n<a;n++){let s=t[n],c=s.length===1?s===`*`?n===a-1?[``,``,L]:[``,``,I]:null:s===`/*`?[``,``,R]:s.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/),l;if(c){let t=c[1],n=c[2]||I;if(t&&c[2]&&(n===`.*`||(n=n.replace(/^\((?!\?:)(?=[^)]+\)$)/,`(?:`),/\((?!\?:)/.test(n))||n.length===1&&B.has(n)))throw z;if(l=o.#n[n],!l){if(n!==L&&n!==R){for(let e in o.#n)if((n.length>1||e.length>1)&&e!==L&&e!==R)throw z}l=o.#n[n]=new e}t!==``&&(l.#t??=i.varIndex++,r.push([t,l.#t]))}else if(l=o.#n[s],!l){for(let e in o.#n)if(e.length>1&&e!==L&&e!==R)throw z;l=o.#n[s]=new e}o=l}if(o.#e!==void 0)throw z;o.#e=a?-1:n}buildRegExpStr(){let e=Object.keys(this.#n).sort(V).map(e=>{let t=this.#n[e],n=t.buildRegExpStr();return n===``?``:(typeof t.#t==`number`?`(${e})@${t.#t}`:B.has(e)?`\\${e}`:e)+n}).filter(Boolean);return typeof this.#e==`number`&&this.#e!==-1&&e.unshift(`#${this.#e}`),e.length===0?``:e.length===1?e[0]:`(?:`+e.join(`|`)+`)`}},U=class{#e={varIndex:0};#t=new H;#n=0;paths=Object.create(null);insert(e,t){if(t){this.#t.insert(e.split(``),0,[],this.#e,!0);return}let n=[],r=[],i=e;for(let e=0;;){let t=!1;if(i=i.replace(/\{[^}]+\}/g,n=>{let i=`@\\${e}`;return r[e]=[i,n],e++,t=!0,i}),!t)break}let a=i.match(/(?::[^\/]+)|(?:\/\*$)|./g)||[];for(let e=r.length-1;e>=0;e--){let[t]=r[e];for(let n=a.length-1;n>=0;n--)if(a[n].indexOf(t)!==-1){a[n]=a[n].replace(t,r[e][1]);break}}this.#t.insert(a,this.#n,n,this.#e,!1),this.paths[e]=[this.#n++,n]}buildRegExp(){let e=this.#t.buildRegExpStr();if(e===``)return[/^$/,[],[]];let t=0,n=[],r=[];return e=e.replace(/#(\d+)|@(\d+)|\.\*\$/g,(e,i,a)=>i===void 0?(a===void 0||(r[Number(a)]=++t),``):(n[++t]=Number(i),`$()`)),[RegExp(`^${e}`),n,r]}},W=Object.create(null);function G(e){return W[e]??=RegExp(e===`*`?``:`^${e.replace(/\/\*$|([.\\+*[^\]$()])/g,(e,t)=>t?`\\${t}`:`(?:|/.*)`)}$`)}function ce(){W=Object.create(null)}function K(e,t){if(e){for(let n of Object.keys(e).sort((e,t)=>t.length-e.length))if(G(n).test(t))return[...e[n]]}}var le=class{name=`RegExpRouter`;#e;#t;#n;constructor(){this.#e={ALL:Object.create(null)},this.#t={ALL:Object.create(null)},this.#n={ALL:new U}}#r(e,t){try{this.#n[e].insert(t,!/\*|\/:/.test(t))}catch(e){throw e===z?new A(t):e}}add(e,t,n){let r=this.#e,i=this.#t;if(!r||!i)throw Error(k);r[e]||(this.#n[e]=new U,[r,i].forEach(t=>{t[e]=Object.create(null),Object.keys(t.ALL).forEach(n=>{t[e][n]=[...t.ALL[n]],this.#r(e,n)})})),t===`/*`&&(t=`*`);let a=(t.match(/\/:/g)||[]).length;if(/\*$/.test(t)){let o=G(t);Object.keys(r).forEach(n=>{(e===`ALL`||e===n)&&!r[n][t]&&(this.#r(n,t),r[n][t]=K(r[n],t)||K(r.ALL,t)||[])}),Object.keys(r).forEach(t=>{(e===`ALL`||e===t)&&Object.keys(r[t]).forEach(e=>{o.test(e)&&r[t][e].push([n,a])})}),Object.keys(i).forEach(t=>{(e===`ALL`||e===t)&&Object.keys(i[t]).forEach(e=>o.test(e)&&i[t][e].push([n,a]))});return}let o=b(t)||[t];for(let t=0,s=o.length;t<s;t++){let c=o[t];Object.keys(i).forEach(o=>{(e===`ALL`||e===o)&&(i[o][c]||(this.#r(o,c),i[o][c]=[...K(r[o],c)||K(r.ALL,c)||[]]),i[o][c].push([n,a-s+t+1]))})}}match=se;buildAllMatchers(){let e=Object.create(null);return Object.keys(this.#t).concat(Object.keys(this.#e)).forEach(t=>{e[t]||=this.#i(t)}),this.#e=this.#t=this.#n=void 0,ce(),e}#i(e){let t=this.#e[e],n=this.#t[e],r=this.#n[e],i=Object.create(null),a=[];[t,n].forEach(e=>{for(let t in e){let n=e[t],o=r.paths[t];if(!o){i[t]=[n.map(([e])=>[e,Object.create(null)]),F];continue}let s=o[1];a[o[0]]=n.map(([e,t])=>{let n=Object.create(null);for(--t;t>=0;t--){let[e,r]=s[t];n[e]=r}return[e,n]})}});let[o,s,c]=r.buildRegExp();for(let e=0,t=a.length;e<t;e++)for(let t=0,n=a[e].length;t<n;t++){let n=a[e][t]?.[1];if(!n)continue;let r=Object.keys(n);for(let e=0,t=r.length;e<t;e++)n[r[e]]=c[n[r[e]]]}let l=[];for(let e in s)l[e]=a[s[e]];return[o,l,i]}},ue=class{name=`SmartRouter`;#e=[];#t=[];constructor(e){this.#e=e.routers}add(e,t,n){if(!this.#t)throw Error(k);this.#t.push([e,t,n])}match(e,t){if(!this.#t)throw Error(`Fatal error`);let n=this.#e,r=this.#t,i=n.length,a=0,o;for(;a<i;a++){let i=n[a];try{for(let e=0,t=r.length;e<t;e++)i.add(...r[e]);o=i.match(e,t)}catch(e){if(e instanceof A)continue;throw e}this.match=i.match.bind(i),this.#e=[i],this.#t=void 0;break}if(a===i)throw Error(`Fatal error`);return this.name=`SmartRouter + ${this.activeRouter.name}`,o}get activeRouter(){if(this.#t||this.#e.length!==1)throw Error(`No active router has been determined yet.`);return this.#e[0]}},q=Object.create(null),de=e=>{for(let t in e)return!0;return!1},fe=class e{#e;#t;#n;#r=0;#i=q;constructor(e,t,n){if(this.#t=n||Object.create(null),this.#e=[],e&&t){let n=Object.create(null);n[e]={handler:t,possibleKeys:[],score:0},this.#e=[n]}this.#n=[]}insert(t,n,r){this.#r=++this.#r;let i=this,a=u(n),o=[];for(let t=0,n=a.length;t<n;t++){let n=a[t],r=a[t+1],s=m(n,r),c=Array.isArray(s)?s[0]:n;if(c in i.#t){i=i.#t[c],s&&o.push(s[1]);continue}i.#t[c]=new e,s&&(i.#n.push(s),o.push(s[1])),i=i.#t[c]}return i.#e.push({[t]:{handler:r,possibleKeys:o.filter((e,t,n)=>n.indexOf(e)===t),score:this.#r}}),i}#a(e,t,n,r,i){for(let a=0,o=t.#e.length;a<o;a++){let o=t.#e[a],s=o[n]||o.ALL,c={};if(s!==void 0&&(s.params=Object.create(null),e.push(s),r!==q||i&&i!==q))for(let e=0,t=s.possibleKeys.length;e<t;e++){let t=s.possibleKeys[e],n=c[s.score];s.params[t]=i?.[t]&&!n?i[t]:r[t]??i?.[t],c[s.score]=!0}}}search(e,t){let n=[];this.#i=q;let r=[this],i=l(t),a=[],o=i.length,s=null;for(let c=0;c<o;c++){let l=i[c],u=c===o-1,d=[];for(let f=0,p=r.length;f<p;f++){let p=r[f],m=p.#t[l];m&&(m.#i=p.#i,u?(m.#t[`*`]&&this.#a(n,m.#t[`*`],e,p.#i),this.#a(n,m,e,p.#i)):d.push(m));for(let r=0,f=p.#n.length;r<f;r++){let f=p.#n[r],m=p.#i===q?{}:{...p.#i};if(f===`*`){let t=p.#t[`*`];t&&(this.#a(n,t,e,p.#i),t.#i=m,d.push(t));continue}let[h,g,_]=f;if(!l&&!(_ instanceof RegExp))continue;let v=p.#t[h];if(_ instanceof RegExp){if(s===null){s=Array(o);let e=+(t[0]===`/`);for(let t=0;t<o;t++)s[t]=e,e+=i[t].length+1}let r=t.substring(s[c]),l=_.exec(r);if(l){if(m[g]=l[0],this.#a(n,v,e,p.#i,m),l[0].length===r.length&&v.#t[`*`]&&this.#a(n,v.#t[`*`],e,p.#i,m),de(v.#t)){v.#i=m;let e=l[0].match(/\//g)?.length??0;(a[e]||=[]).push(v)}continue}}(_===!0||_.test(l))&&(m[g]=l,u?(this.#a(n,v,e,m,p.#i),v.#t[`*`]&&this.#a(n,v.#t[`*`],e,m,p.#i)):(v.#i=m,d.push(v)))}}let f=a.shift();r=f?d.concat(f):d}return n.length>1&&n.sort((e,t)=>e.score-t.score),[n.map(({handler:e,params:t})=>[e,t])]}},pe=class{name=`TrieRouter`;#e;constructor(){this.#e=new fe}add(e,t,n){let r=b(t);if(r){for(let t=0,i=r.length;t<i;t++)this.#e.insert(e,r[t],n);return}this.#e.insert(e,t,n)}match(e,t){return this.#e.search(e,t)}},J=class extends P{constructor(e={}){super(e),this.router=e.router??new ue({routers:[new le,new pe]})}},me=/^\s*(?:text\/(?!event-stream(?:[;\s]|$))[^;\s]+|application\/(?:javascript|json|xml|xml-dtd|ecmascript|dart|msgpack|postscript|rtf|tar|toml|vnd\.dart|vnd\.ms-fontobject|vnd\.ms-opentype|vnd\.msgpack|wasm|x-httpd-php|x-javascript|x-msgpack|x-ns-proxy-autoconfig|x-sh|x-tar|x-virtualbox-hdd|x-virtualbox-ova|x-virtualbox-ovf|x-virtualbox-vbox|x-virtualbox-vdi|x-virtualbox-vhd|x-virtualbox-vmdk|x-www-form-urlencoded)|font\/(?:otf|ttf)|image\/(?:bmp|vnd\.adobe\.photoshop|vnd\.microsoft\.icon|vnd\.ms-dds|x-icon|x-ms-bmp)|message\/rfc822|model\/gltf-binary|x-shader\/x-fragment|x-shader\/x-vertex|[^;\s]+?\+(?:json|text|xml|yaml|msgpack))(?:[;\s]|$)/i,Y=(e,t=he)=>{let n=e.match(/\.([a-zA-Z0-9]+?)$/);if(n)return t[n[1].toLowerCase()]},he={aac:`audio/aac`,avi:`video/x-msvideo`,avif:`image/avif`,av1:`video/av1`,bin:`application/octet-stream`,bmp:`image/bmp`,css:`text/css; charset=utf-8`,csv:`text/csv; charset=utf-8`,eot:`application/vnd.ms-fontobject`,epub:`application/epub+zip`,gif:`image/gif`,gz:`application/gzip`,htm:`text/html; charset=utf-8`,html:`text/html; charset=utf-8`,ico:`image/x-icon`,ics:`text/calendar; charset=utf-8`,jpeg:`image/jpeg`,jpg:`image/jpeg`,js:`text/javascript; charset=utf-8`,json:`application/json`,jsonld:`application/ld+json`,map:`application/json`,mid:`audio/x-midi`,midi:`audio/x-midi`,mjs:`text/javascript; charset=utf-8`,mp3:`audio/mpeg`,mp4:`video/mp4`,mpeg:`video/mpeg`,oga:`audio/ogg`,ogv:`video/ogg`,ogx:`application/ogg`,opus:`audio/opus`,otf:`font/otf`,pdf:`application/pdf`,png:`image/png`,rtf:`application/rtf`,svg:`image/svg+xml; charset=utf-8`,tif:`image/tiff`,tiff:`image/tiff`,ts:`video/mp2t`,ttf:`font/ttf`,txt:`text/plain; charset=utf-8`,wasm:`application/wasm`,webm:`video/webm`,weba:`audio/webm`,webmanifest:`application/manifest+json`,webp:`image/webp`,woff:`font/woff`,woff2:`font/woff2`,xhtml:`application/xhtml+xml; charset=utf-8`,xml:`application/xml; charset=utf-8`,zip:`application/zip`,"3gp":`video/3gpp`,"3g2":`video/3gpp2`,gltf:`model/gltf+json`,glb:`model/gltf-binary`},ge=(...e)=>{let t=e.filter(e=>e!==``).join(`/`);t=t.replace(/(?<=\/)\/+/g,``);let n=t.split(`/`),r=[];for(let e of n)e===`..`&&r.length>0&&r.at(-1)!==`..`?r.pop():e!==`.`&&r.push(e);return r.join(`/`)||`.`},X={br:`.br`,zstd:`.zst`,gzip:`.gz`},_e=Object.keys(X),ve=`index.html`,ye=e=>{let t=e.root??`./`,n=e.path,r=e.join??ge;return async(i,a)=>{if(i.finalized)return a();let o;if(e.path)o=e.path;else try{if(o=g(i.req.path),/(?:^|[\/\\])\.{1,2}(?:$|[\/\\])|[\/\\]{2,}|\\/.test(o))throw Error()}catch{return await e.onNotFound?.(i.req.path,i),a()}let s=r(t,!n&&e.rewriteRequestPath?e.rewriteRequestPath(o):o);e.isDir&&await e.isDir(s)&&(s=r(s,ve));let c=e.getContent,l=await c(s,i);if(l instanceof Response)return i.newResponse(l.body,l);if(l!=null){let t=e.mimes&&Y(s,e.mimes)||Y(s);if(i.header(`Content-Type`,t||`application/octet-stream`),e.precompressed&&(!t||me.test(t))){let e=new Set(i.req.header(`Accept-Encoding`)?.split(`,`).map(e=>e.trim()));for(let t of _e){if(!e.has(t))continue;let n=await c(s+X[t],i);if(n){l=n,i.header(`Content-Encoding`,t),i.header(`Vary`,`Accept-Encoding`,{append:!0});break}}}return await e.onFound?.(s,i),i.body(l)}await e.onNotFound?.(s,i),await a()}},be=async(e,t)=>{let n;n=t&&t.manifest?typeof t.manifest==`string`?JSON.parse(t.manifest):t.manifest:typeof __STATIC_CONTENT_MANIFEST==`string`?JSON.parse(__STATIC_CONTENT_MANIFEST):__STATIC_CONTENT_MANIFEST;let r;r=t&&t.namespace?t.namespace:__STATIC_CONTENT;let i=n[e];return i&&await r.get(i,{type:`stream`})||null},xe=(e={})=>async function(t,n){let r=async n=>be(n,{manifest:e.manifest,namespace:e.namespace?e.namespace:t.env?t.env.__STATIC_CONTENT:void 0});return ye({...e,getContent:r})(t,n)},Se=e=>xe(e),Z=new J;Z.use(`/static/*`,Se({root:`./public`})),Z.get(`/`,e=>e.html(`<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>بطاقات التهنئة</title>
  <script src="https://cdn.tailwindcss.com"><\/script>
  <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;700;900&display=swap" rel="stylesheet">
  <style>body { font-family: 'Cairo', sans-serif; }</style>
</head>
<body class="bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 min-h-screen">
  <main class="max-w-4xl mx-auto px-6 py-16 text-center">
    <h1 class="text-4xl md:text-5xl font-black text-white mb-4">💌 بطاقات التهنئة</h1>
    <p class="text-purple-200 text-lg mb-12">اختار البطاقة اللي عايز تبعتها لصحابك وأحبابك</p>

    <section class="grid md:grid-cols-3 gap-8">
      <a href="/congrats" id="card-congrats" class="group bg-white/10 backdrop-blur rounded-3xl p-8 border border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-300">
        <div class="text-6xl mb-4 group-hover:animate-bounce">🎉</div>
        <h2 class="text-2xl font-bold text-white mb-2">تهنئة</h2>
        <p class="text-purple-200 text-sm">مبروك على النجاح والإنجازات</p>
      </a>

      <a href="/birthday" id="card-birthday" class="group bg-white/10 backdrop-blur rounded-3xl p-8 border border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-300">
        <div class="text-6xl mb-4 group-hover:animate-bounce">🎂</div>
        <h2 class="text-2xl font-bold text-white mb-2">عيد ميلاد</h2>
        <p class="text-purple-200 text-sm">كل سنة وأنت طيب يا غالي</p>
      </a>

      <a href="/thanks" id="card-thanks" class="group bg-white/10 backdrop-blur rounded-3xl p-8 border border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-300">
        <div class="text-6xl mb-4 group-hover:animate-bounce">🙏</div>
        <h2 class="text-2xl font-bold text-white mb-2">شكر</h2>
        <p class="text-purple-200 text-sm">شكراً من القلب على كل حاجة</p>
      </a>
    </section>

    <p class="text-purple-300 mt-12 text-sm">💡 تقدر تكتب اسم الشخص في أي بطاقة وتشاركها معاه</p>
  </main>
</body>
</html>`)),Z.get(`/congrats`,e=>e.html(`<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>🎉 مبروك!</title>
  <script src="https://cdn.tailwindcss.com"><\/script>
  <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;700;900&display=swap" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.2/dist/confetti.browser.min.js"><\/script>
  <style>body { font-family: 'Cairo', sans-serif; }</style>
</head>
<body class="bg-gradient-to-br from-emerald-800 via-teal-800 to-cyan-900 min-h-screen flex items-center justify-center p-6">
  <main class="max-w-2xl w-full text-center">
    <section class="bg-white/10 backdrop-blur-lg rounded-3xl p-10 border border-white/20 shadow-2xl">
      <div class="text-8xl mb-6 animate-bounce">🎉</div>
      <h1 class="text-5xl font-black text-white mb-4">ألف مبروك!</h1>
      <p id="name-display" class="text-3xl font-bold text-yellow-300 mb-6 min-h-[1em]"></p>
      <p class="text-xl text-emerald-100 leading-relaxed mb-8">
        مبروك عليك النجاح والتوفيق 🌟<br>
        تستاهل كل خير، وده مجرد بداية لإنجازات أكبر وأحلى.<br>
        ربنا يزيدك من فضله ويوفقك دايماً ❤️
      </p>
      <div class="flex flex-col sm:flex-row gap-3 justify-center items-center">
        <input id="name-input" type="text" placeholder="اكتب اسم الشخص هنا"
          class="px-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/50 border border-white/30 focus:outline-none focus:ring-2 focus:ring-yellow-300 text-center">
        <button id="celebrate-btn" onclick="celebrate()"
          class="px-6 py-3 bg-yellow-400 hover:bg-yellow-300 text-emerald-900 font-bold rounded-xl transition-all hover:scale-105">
          🎊 احتفل!
        </button>
      </div>
    </section>
    <a href="/" class="inline-block mt-6 text-emerald-200 hover:text-white transition-colors">→ رجوع للرئيسية</a>
  </main>
  <script>
    function celebrate() {
      const name = document.getElementById('name-input').value.trim();
      if (name) document.getElementById('name-display').textContent = 'يا ' + name + ' 💚';
      confetti({ particleCount: 150, spread: 90, origin: { y: 0.6 } });
      setTimeout(() => confetti({ particleCount: 100, angle: 60, spread: 60, origin: { x: 0 } }), 300);
      setTimeout(() => confetti({ particleCount: 100, angle: 120, spread: 60, origin: { x: 1 } }), 600);
    }
    // احتفال تلقائي عند فتح الصفحة
    window.onload = () => setTimeout(celebrate, 500);
  <\/script>
</body>
</html>`)),Z.get(`/birthday`,e=>e.html(`<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>🎂 عيد ميلاد سعيد!</title>
  <script src="https://cdn.tailwindcss.com"><\/script>
  <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;700;900&display=swap" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.2/dist/confetti.browser.min.js"><\/script>
  <style>
    body { font-family: 'Cairo', sans-serif; }
    @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-15px); } }
    .float { animation: float 3s ease-in-out infinite; }
    .balloon { position: fixed; font-size: 3rem; animation: rise 8s linear infinite; bottom: -80px; }
    @keyframes rise { to { transform: translateY(-110vh); } }
  </style>
</head>
<body class="bg-gradient-to-br from-pink-600 via-rose-600 to-purple-800 min-h-screen flex items-center justify-center p-6 overflow-hidden">
  <main class="max-w-2xl w-full text-center relative z-10">
    <section class="bg-white/10 backdrop-blur-lg rounded-3xl p-10 border border-white/20 shadow-2xl">
      <div class="text-8xl mb-6 float">🎂</div>
      <h1 class="text-5xl font-black text-white mb-4">عيد ميلاد سعيد!</h1>
      <p id="name-display" class="text-3xl font-bold text-yellow-300 mb-6 min-h-[1em]"></p>
      <p class="text-xl text-pink-100 leading-relaxed mb-8">
        كل سنة وأنت طيب يا أغلى الناس 🎈<br>
        عقبال 100 سنة كلها فرح وصحة وسعادة.<br>
        يارب تتحقق كل أمنياتك السنة دي ❤️🎁
      </p>
      <div class="flex flex-col sm:flex-row gap-3 justify-center items-center">
        <input id="name-input" type="text" placeholder="اكتب اسم صاحب العيد"
          class="px-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/50 border border-white/30 focus:outline-none focus:ring-2 focus:ring-yellow-300 text-center">
        <button id="party-btn" onclick="party()"
          class="px-6 py-3 bg-yellow-400 hover:bg-yellow-300 text-pink-900 font-bold rounded-xl transition-all hover:scale-105">
          🎈 يلا نحتفل!
        </button>
      </div>
    </section>
    <a href="/" class="inline-block mt-6 text-pink-200 hover:text-white transition-colors">→ رجوع للرئيسية</a>
  </main>
  <script>
    const emojis = ['🎈','🎁','🎉','🎊','🧁'];
    function spawnBalloon() {
      const b = document.createElement('div');
      b.className = 'balloon';
      b.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      b.style.left = Math.random() * 95 + 'vw';
      b.style.animationDuration = (5 + Math.random() * 5) + 's';
      document.body.appendChild(b);
      setTimeout(() => b.remove(), 10000);
    }
    function party() {
      const name = document.getElementById('name-input').value.trim();
      if (name) document.getElementById('name-display').textContent = 'يا ' + name + ' 🎂';
      confetti({ particleCount: 200, spread: 100, origin: { y: 0.6 } });
      for (let i = 0; i < 10; i++) setTimeout(spawnBalloon, i * 300);
    }
    window.onload = () => { setTimeout(party, 500); setInterval(spawnBalloon, 2000); };
  <\/script>
</body>
</html>`)),Z.get(`/thanks`,e=>e.html(`<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>🙏 شكراً من القلب</title>
  <script src="https://cdn.tailwindcss.com"><\/script>
  <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;700;900&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Cairo', sans-serif; }
    @keyframes pulse-heart { 0%,100% { transform: scale(1); } 50% { transform: scale(1.15); } }
    .heart { animation: pulse-heart 1.5s ease-in-out infinite; }
    .fall { position: fixed; top: -50px; font-size: 1.8rem; animation: falling linear infinite; }
    @keyframes falling { to { transform: translateY(110vh) rotate(360deg); } }
  </style>
</head>
<body class="bg-gradient-to-br from-amber-700 via-orange-800 to-red-900 min-h-screen flex items-center justify-center p-6 overflow-hidden">
  <main class="max-w-2xl w-full text-center relative z-10">
    <section class="bg-white/10 backdrop-blur-lg rounded-3xl p-10 border border-white/20 shadow-2xl">
      <div class="text-8xl mb-6 heart">🙏</div>
      <h1 class="text-5xl font-black text-white mb-4">شكراً من القلب</h1>
      <p id="name-display" class="text-3xl font-bold text-yellow-300 mb-6 min-h-[1em]"></p>
      <p class="text-xl text-amber-100 leading-relaxed mb-8">
        كلمة شكر مش هتوفيك حقك 💛<br>
        وقفتك جنبي ودعمك ليا حاجة مش هنساها أبداً.<br>
        ربنا يخليك ليا ويبارك في عمرك ❤️
      </p>
      <div class="flex flex-col sm:flex-row gap-3 justify-center items-center">
        <input id="name-input" type="text" placeholder="اكتب اسم الشخص هنا"
          class="px-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/50 border border-white/30 focus:outline-none focus:ring-2 focus:ring-yellow-300 text-center">
        <button id="thanks-btn" onclick="sendThanks()"
          class="px-6 py-3 bg-yellow-400 hover:bg-yellow-300 text-orange-900 font-bold rounded-xl transition-all hover:scale-105">
          💛 ابعت الشكر
        </button>
      </div>
    </section>
    <a href="/" class="inline-block mt-6 text-amber-200 hover:text-white transition-colors">→ رجوع للرئيسية</a>
  </main>
  <script>
    const hearts = ['💛','❤️','🧡','💐','🌹','✨'];
    function spawnHeart() {
      const h = document.createElement('div');
      h.className = 'fall';
      h.textContent = hearts[Math.floor(Math.random() * hearts.length)];
      h.style.left = Math.random() * 95 + 'vw';
      h.style.animationDuration = (4 + Math.random() * 4) + 's';
      document.body.appendChild(h);
      setTimeout(() => h.remove(), 9000);
    }
    function sendThanks() {
      const name = document.getElementById('name-input').value.trim();
      if (name) document.getElementById('name-display').textContent = 'يا ' + name + ' 🌹';
      for (let i = 0; i < 15; i++) setTimeout(spawnHeart, i * 200);
    }
    window.onload = () => { setTimeout(sendThanks, 500); setInterval(spawnHeart, 1500); };
  <\/script>
</body>
</html>`));var Q=new J,Ce=Object.assign({"/src/index.tsx":Z}),$=!1;for(let[,e]of Object.entries(Ce))e&&(Q.all(`*`,t=>{let n;try{n=t.executionCtx}catch{}return e.fetch(t.req.raw,t.env,n)}),Q.notFound(t=>{let n;try{n=t.executionCtx}catch{}return e.fetch(t.req.raw,t.env,n)}),$=!0);if(!$)throw Error(`Can't import modules from ['/src/index.ts','/src/index.tsx','/app/server.ts']`);export{Q as default};