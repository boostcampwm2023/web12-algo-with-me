import{d as S,a as v,e as A,l as _}from"./eval.worker-2a143d28.js";import{c as w,t as y,r as x,a as M}from"./module-e3ee0cc4.js";function p(i,t){return t.forEach(function(e){e&&typeof e!="string"&&!Array.isArray(e)&&Object.keys(e).forEach(function(n){if(n!=="default"&&!(n in i)){var s=Object.getOwnPropertyDescriptor(e,n);Object.defineProperty(i,n,s.get?s:{enumerable:!0,get:function(){return e[n]}})}})}),Object.freeze(i)}var c={},a={},l={};Object.defineProperty(l,"__esModule",{value:!0});l.QuickJSAsyncContext=void 0;const Q=w,k=S,C=y;class b extends Q.QuickJSContext{async evalCodeAsync(t,e="eval.js",n){const s=n===void 0?1:0,r=(0,C.evalOptionsToFlags)(n);let o=0;try{o=await this.memory.newHeapCharPointer(t).consume(u=>this.ffi.QTS_Eval_MaybeAsync(this.ctx.value,u.value,e,s,r))}catch(u){throw(0,k.debugLog)("QTS_Eval_MaybeAsync threw",u),u}const d=this.ffi.QTS_ResolveException(this.ctx.value,o);return d?(this.ffi.QTS_FreeValuePointer(this.ctx.value,o),{error:this.memory.heapValueHandle(d)}):{value:this.memory.heapValueHandle(o)}}newAsyncifiedFunction(t,e){return this.newFunction(t,e)}}l.QuickJSAsyncContext=b;Object.defineProperty(a,"__esModule",{value:!0});a.QuickJSAsyncRuntime=void 0;const J=v,g=l,L=x,O=y;class R extends L.QuickJSRuntime{constructor(t){super(t)}newContext(t={}){if(t.intrinsics&&t.intrinsics!==O.DefaultIntrinsics)throw new Error("TODO: Custom intrinsics are not supported yet");const e=new J.Lifetime(this.ffi.QTS_NewContext(this.rt.value),void 0,s=>{this.contextMap.delete(s),this.callbacks.deleteContext(s),this.ffi.QTS_FreeContext(s)}),n=new g.QuickJSAsyncContext({module:this.module,ctx:e,ffi:this.ffi,rt:this.rt,ownedLifetimes:[],runtime:this,callbacks:this.callbacks});return this.contextMap.set(e.value,n),n}setModuleLoader(t,e){super.setModuleLoader(t,e)}setMaxStackSize(t){return super.setMaxStackSize(t)}}a.QuickJSAsyncRuntime=R;Object.defineProperty(c,"__esModule",{value:!0});var h=c.QuickJSAsyncWASMModule=void 0;const T=A,f=_,m=M,j=a;class P extends m.QuickJSWASMModule{constructor(t,e){super(t,e),this.ffi=e,this.module=t}newRuntime(t={}){const e=new f.Lifetime(this.ffi.QTS_NewRuntime(),void 0,s=>{this.callbacks.deleteRuntime(s),this.ffi.QTS_FreeRuntime(s)}),n=new j.QuickJSAsyncRuntime({module:this.module,ffi:this.ffi,rt:e,callbacks:this.callbacks});return(0,m.applyBaseRuntimeOptions)(n,t),t.moduleLoader&&n.setModuleLoader(t.moduleLoader),n}newContext(t={}){const e=this.newRuntime(),n=t.ownedLifetimes?t.ownedLifetimes.concat([e]):[e],s=e.newContext({...t,ownedLifetimes:n});return e.context=s,s}evalCode(){throw new T.QuickJSNotImplemented("QuickJSWASMModuleAsyncify.evalCode: use evalCodeAsync instead")}evalCodeAsync(t,e){return f.Scope.withScopeAsync(async n=>{const s=n.manage(this.newContext());(0,m.applyModuleEvalRuntimeOptions)(s.runtime,e);const r=await s.evalCodeAsync(t,"eval.js");if(e.memoryLimitBytes!==void 0&&s.runtime.setMemoryLimit(-1),r.error)throw s.dump(n.manage(r.error));return s.dump(n.manage(r.value))})}}h=c.QuickJSAsyncWASMModule=P;var F=p({__proto__:null,get QuickJSAsyncWASMModule(){return h},default:c},[c]);export{F as m};
