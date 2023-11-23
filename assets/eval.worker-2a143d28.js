var S=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function le(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}function de(e){if(e.__esModule)return e;var t=e.default;if(typeof t=="function"){var n=function r(){return this instanceof r?Reflect.construct(t,arguments,this.constructor):t.apply(this,arguments)};n.prototype=t.prototype}else n={};return Object.defineProperty(n,"__esModule",{value:!0}),Object.keys(e).forEach(function(r){var c=Object.getOwnPropertyDescriptor(e,r);Object.defineProperty(n,r,c.get?c:{enumerable:!0,get:function(){return e[r]}})}),n}var D={},O={},v={};Object.defineProperty(v,"__esModule",{value:!0});v.unwrapJavascript=v.unwrapTypescript=void 0;function U(e){return e}function Y(e){return e.default??e}v.unwrapTypescript=Y;v.unwrapJavascript=U;(function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.RELEASE_ASYNC=e.DEBUG_ASYNC=e.RELEASE_SYNC=e.DEBUG_SYNC=e.memoizePromiseFactory=e.newQuickJSAsyncWASMModule=e.newQuickJSWASMModule=void 0;const t=v;async function n(i=e.RELEASE_SYNC){const[s,m,{QuickJSWASMModule:h}]=await Promise.all([i.importModuleLoader(),i.importFFI(),import("./module-e3ee0cc4.js").then(function(M){return M.m}).then(t.unwrapTypescript)]),f=await s();f.type="sync";const k=new m(f);return new h(f,k)}e.newQuickJSWASMModule=n;async function r(i=e.RELEASE_ASYNC){const[s,m,{QuickJSAsyncWASMModule:h}]=await Promise.all([i.importModuleLoader(),i.importFFI(),import("./module-asyncify-f9a8abee.js").then(function(M){return M.m}).then(t.unwrapTypescript)]),f=await s();f.type="async";const k=new m(f);return new h(f,k)}e.newQuickJSAsyncWASMModule=r;function c(i){let s;return()=>s??(s=i())}e.memoizePromiseFactory=c,e.DEBUG_SYNC={type:"sync",async importFFI(){const i=await import("./ffi.WASM_DEBUG_SYNC-3fb3455c.js").then(function(s){return s.f});return(0,t.unwrapTypescript)(i).QuickJSFFI},async importModuleLoader(){const i=await import("./emscripten-module.WASM_DEBUG_SYNC-b397a3b8.js").then(function(s){return s.e});return(0,t.unwrapJavascript)(i).default}},e.RELEASE_SYNC={type:"sync",async importFFI(){const i=await import("./ffi.WASM_RELEASE_SYNC-5c3ef0a1.js").then(function(s){return s.f});return(0,t.unwrapTypescript)(i).QuickJSFFI},async importModuleLoader(){const i=await import("./emscripten-module.WASM_RELEASE_SYNC-68bc2538.js").then(function(s){return s.e});return(0,t.unwrapJavascript)(i).default}},e.DEBUG_ASYNC={type:"async",async importFFI(){const i=await import("./ffi.WASM_DEBUG_ASYNCIFY-b3cc0b3d.js").then(function(s){return s.f});return(0,t.unwrapTypescript)(i).QuickJSAsyncFFI},async importModuleLoader(){const i=await import("./emscripten-module.WASM_DEBUG_ASYNCIFY-e80b6df8.js").then(function(s){return s.e});return(0,t.unwrapJavascript)(i).default}},e.RELEASE_ASYNC={type:"async",async importFFI(){const i=await import("./ffi.WASM_RELEASE_ASYNCIFY-7fba12a0.js").then(function(s){return s.f});return(0,t.unwrapTypescript)(i).QuickJSAsyncFFI},async importModuleLoader(){const i=await import("./emscripten-module.WASM_RELEASE_ASYNCIFY-f01ca5df.js").then(function(s){return s.e});return(0,t.unwrapJavascript)(i).default}}})(O);var A={};Object.defineProperty(A,"__esModule",{value:!0});A.isFail=A.isSuccess=void 0;function I(e){return!("error"in e)}A.isSuccess=I;function T(e){return"error"in e}A.isFail=T;var d={},y={};Object.defineProperty(y,"__esModule",{value:!0});y.awaitEachYieldedPromise=y.maybeAsync=y.maybeAsyncFn=void 0;function*C(e){return yield e}function W(e){return C(Q(e))}const F=C;F.of=W;function B(e,t){return(...n)=>{const r=t.call(e,F,...n);return Q(r)}}y.maybeAsyncFn=B;function H(e,t){const n=t.call(e,F);return Q(n)}y.maybeAsync=H;function Q(e){function t(n){return n.done?n.value:n.value instanceof Promise?n.value.then(r=>t(e.next(r)),r=>t(e.throw(r))):t(e.next(n.value))}return t(e.next())}y.awaitEachYieldedPromise=Q;var N={};(function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.debugLog=e.QTS_DEBUG=void 0,e.QTS_DEBUG=!!(typeof process=="object"&&{}.QTS_DEBUG),e.debugLog=e.QTS_DEBUG?console.log.bind(console):()=>{}})(N);var a={};Object.defineProperty(a,"__esModule",{value:!0});a.QuickJSMemoryLeakDetected=a.QuickJSAsyncifySuspended=a.QuickJSAsyncifyError=a.QuickJSNotImplemented=a.QuickJSUseAfterFree=a.QuickJSWrongOwner=a.QuickJSUnwrapError=void 0;class G extends Error{constructor(t,n){super(String(t)),this.cause=t,this.context=n,this.name="QuickJSUnwrapError"}}a.QuickJSUnwrapError=G;class z extends Error{constructor(){super(...arguments),this.name="QuickJSWrongOwner"}}a.QuickJSWrongOwner=z;class $ extends Error{constructor(){super(...arguments),this.name="QuickJSUseAfterFree"}}a.QuickJSUseAfterFree=$;class K extends Error{constructor(){super(...arguments),this.name="QuickJSNotImplemented"}}a.QuickJSNotImplemented=K;class q extends Error{constructor(){super(...arguments),this.name="QuickJSAsyncifyError"}}a.QuickJSAsyncifyError=q;class V extends Error{constructor(){super(...arguments),this.name="QuickJSAsyncifySuspended"}}a.QuickJSAsyncifySuspended=V;class X extends Error{constructor(){super(...arguments),this.name="QuickJSMemoryLeakDetected"}}a.QuickJSMemoryLeakDetected=X;Object.defineProperty(d,"__esModule",{value:!0});d.Scope=d.WeakLifetime=d.StaticLifetime=d.Lifetime=void 0;const Z=y,x=N,j=a;class _{constructor(t,n,r,c){this._value=t,this.copier=n,this.disposer=r,this._owner=c,this._alive=!0,this._constructorStack=x.QTS_DEBUG?new Error("Lifetime constructed").stack:void 0}get alive(){return this._alive}get value(){return this.assertAlive(),this._value}get owner(){return this._owner}get dupable(){return!!this.copier}dup(){if(this.assertAlive(),!this.copier)throw new Error("Non-dupable lifetime");return new _(this.copier(this._value),this.copier,this.disposer,this._owner)}consume(t){this.assertAlive();const n=t(this);return this.dispose(),n}dispose(){this.assertAlive(),this.disposer&&this.disposer(this._value),this._alive=!1}assertAlive(){if(!this.alive)throw this._constructorStack?new j.QuickJSUseAfterFree(`Lifetime not alive
${this._constructorStack}
Lifetime used`):new j.QuickJSUseAfterFree("Lifetime not alive")}}d.Lifetime=_;class ee extends _{constructor(t,n){super(t,void 0,void 0,n)}get dupable(){return!0}dup(){return this}dispose(){}}d.StaticLifetime=ee;class te extends _{constructor(t,n,r,c){super(t,n,r,c)}dispose(){this._alive=!1}}d.WeakLifetime=te;function g(e,t){let n;try{e.dispose()}catch(r){n=r}if(t&&n)throw Object.assign(t,{message:`${t.message}
 Then, failed to dispose scope: ${n.message}`,disposeError:n}),t;if(t||n)throw t||n}class J{constructor(){this._disposables=new _(new Set)}static withScope(t){const n=new J;let r;try{return t(n)}catch(c){throw r=c,c}finally{g(n,r)}}static withScopeMaybeAsync(t,n){return(0,Z.maybeAsync)(void 0,function*(r){const c=new J;let i;try{return yield*r.of(n.call(t,r,c))}catch(s){throw i=s,s}finally{g(c,i)}})}static async withScopeAsync(t){const n=new J;let r;try{return await t(n)}catch(c){throw r=c,c}finally{g(n,r)}}manage(t){return this._disposables.value.add(t),t}get alive(){return this._disposables.alive}dispose(){const t=Array.from(this._disposables.value.values()).reverse();for(const n of t)n.alive&&n.dispose();this._disposables.dispose()}}d.Scope=J;var E={};Object.defineProperty(E,"__esModule",{value:!0});E.QuickJSDeferredPromise=void 0;class ne{constructor(t){this.resolve=n=>{this.resolveHandle.alive&&(this.context.unwrapResult(this.context.callFunction(this.resolveHandle,this.context.undefined,n||this.context.undefined)).dispose(),this.disposeResolvers(),this.onSettled())},this.reject=n=>{this.rejectHandle.alive&&(this.context.unwrapResult(this.context.callFunction(this.rejectHandle,this.context.undefined,n||this.context.undefined)).dispose(),this.disposeResolvers(),this.onSettled())},this.dispose=()=>{this.handle.alive&&this.handle.dispose(),this.disposeResolvers()},this.context=t.context,this.owner=t.context.runtime,this.handle=t.promiseHandle,this.settled=new Promise(n=>{this.onSettled=n}),this.resolveHandle=t.resolveHandle,this.rejectHandle=t.rejectHandle}get alive(){return this.handle.alive||this.resolveHandle.alive||this.rejectHandle.alive}disposeResolvers(){this.resolveHandle.alive&&this.resolveHandle.dispose(),this.rejectHandle.alive&&this.rejectHandle.dispose()}}E.QuickJSDeferredPromise=ne;var b={};Object.defineProperty(b,"__esModule",{value:!0});b.TestQuickJSWASMModule=void 0;const L=a,P=d;class re{constructor(t){this.parent=t,this.contexts=new Set,this.runtimes=new Set}newRuntime(t){const n=this.parent.newRuntime({...t,ownedLifetimes:[new P.Lifetime(void 0,void 0,()=>this.runtimes.delete(n)),...(t==null?void 0:t.ownedLifetimes)??[]]});return this.runtimes.add(n),n}newContext(t){const n=this.parent.newContext({...t,ownedLifetimes:[new P.Lifetime(void 0,void 0,()=>this.contexts.delete(n)),...(t==null?void 0:t.ownedLifetimes)??[]]});return this.contexts.add(n),n}evalCode(t,n){return this.parent.evalCode(t,n)}disposeAll(){const t=[...this.contexts,...this.runtimes];this.runtimes.clear(),this.contexts.clear(),t.forEach(n=>{n.alive&&n.dispose()})}assertNoMemoryAllocated(){if(this.getFFI().QTS_RecoverableLeakCheck())throw new L.QuickJSMemoryLeakDetected("Leak sanitizer detected un-freed memory");if(this.contexts.size>0)throw new L.QuickJSMemoryLeakDetected(`${this.contexts.size} contexts leaked`);if(this.runtimes.size>0)throw new L.QuickJSMemoryLeakDetected(`${this.runtimes.size} runtimes leaked`)}getFFI(){return this.parent.getFFI()}}b.TestQuickJSWASMModule=re;(function(e){var t=S&&S.__createBinding||(Object.create?function(u,o,l,p){p===void 0&&(p=l);var w=Object.getOwnPropertyDescriptor(o,l);(!w||("get"in w?!o.__esModule:w.writable||w.configurable))&&(w={enumerable:!0,get:function(){return o[l]}}),Object.defineProperty(u,p,w)}:function(u,o,l,p){p===void 0&&(p=l),u[p]=o[l]}),n=S&&S.__setModuleDefault||(Object.create?function(u,o){Object.defineProperty(u,"default",{enumerable:!0,value:o})}:function(u,o){u.default=o}),r=S&&S.__exportStar||function(u,o){for(var l in u)l!=="default"&&!Object.prototype.hasOwnProperty.call(o,l)&&t(o,u,l)},c=S&&S.__importStar||function(u){if(u&&u.__esModule)return u;var o={};if(u!=null)for(var l in u)l!=="default"&&Object.prototype.hasOwnProperty.call(u,l)&&t(o,u,l);return n(o,u),o};Object.defineProperty(e,"__esModule",{value:!0}),e.shouldInterruptAfterDeadline=e.newAsyncContext=e.newAsyncRuntime=e.getQuickJSSync=e.getQuickJS=e.errors=e.RELEASE_SYNC=e.RELEASE_ASYNC=e.DEBUG_SYNC=e.DEBUG_ASYNC=e.newQuickJSAsyncWASMModule=e.newQuickJSWASMModule=void 0;const i=O;Object.defineProperty(e,"newQuickJSWASMModule",{enumerable:!0,get:function(){return i.newQuickJSWASMModule}}),Object.defineProperty(e,"newQuickJSAsyncWASMModule",{enumerable:!0,get:function(){return i.newQuickJSAsyncWASMModule}}),Object.defineProperty(e,"DEBUG_ASYNC",{enumerable:!0,get:function(){return i.DEBUG_ASYNC}}),Object.defineProperty(e,"DEBUG_SYNC",{enumerable:!0,get:function(){return i.DEBUG_SYNC}}),Object.defineProperty(e,"RELEASE_ASYNC",{enumerable:!0,get:function(){return i.RELEASE_ASYNC}}),Object.defineProperty(e,"RELEASE_SYNC",{enumerable:!0,get:function(){return i.RELEASE_SYNC}}),r(A,e),r(d,e),e.errors=c(a),r(E,e),r(b,e);let s,m;async function h(){return m??(m=(0,i.newQuickJSWASMModule)().then(u=>(s=u,u))),await m}e.getQuickJS=h;function f(){if(!s)throw new Error("QuickJS not initialized. Await getQuickJS() at least once.");return s}e.getQuickJSSync=f;async function k(u){return(await(0,i.newQuickJSAsyncWASMModule)()).newRuntime(u)}e.newAsyncRuntime=k;async function M(u){return(await(0,i.newQuickJSAsyncWASMModule)()).newContext(u)}e.newAsyncContext=M;function R(u){const o=typeof u=="number"?u:u.getTime();return function(){return Date.now()>o}}e.shouldInterruptAfterDeadline=R})(D);const ie=1024*1024,se=1024*512;async function ue(e,t){const n=await D.getQuickJS(),r=ce(n),c=r.newContext();try{return oe(c,e,t)}finally{c.dispose(),r.dispose()}}const ce=e=>{const t=e.newRuntime();return t.setMemoryLimit(ie),t.setMaxStackSize(se),t},oe=(e,t,n)=>{const r=ae(t,n),c=performance.now(),i=e.unwrapResult(e.evalCode(r)),s=performance.now(),{error:m,value:h}=e.dump(i);return i.dispose(),{time:s-c,result:h,error:m}},ae=(e,t)=>`
    ${e}


    (()=>{
      try {
        const result = solution(${t});
        return {
          value: result,
          error: undefined
        }
      } catch(err) {
        return {
          error: { 
            name: err.name, 
            message: err.message,
            stack: err.stack
          }
        }
      }
    })()
  `;self.addEventListener("message",async function(e){const t=e.data;try{const{code:n,param:r}=t,c=await ue(n,r);self.postMessage(c)}catch(n){self.postMessage(n)}});export{D as a,E as b,y as c,N as d,a as e,de as f,le as g,d as l};
