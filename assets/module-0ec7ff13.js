import{l as b,d as P,b as V,e as C,c as B}from"./eval.worker-7a46aa40.js";import{t as N}from"./types-ffi-352b01f9.js";function j(l,e){return e.forEach(function(r){r&&typeof r!="string"&&!Array.isArray(r)&&Object.keys(r).forEach(function(t){if(t!=="default"&&!(t in l)){var n=Object.getOwnPropertyDescriptor(r,t);Object.defineProperty(l,t,n.get?n:{enumerable:!0,get:function(){return r[t]}})}})}),Object.freeze(l)}var f={},_={},x={},g={};Object.defineProperty(g,"__esModule",{value:!0});g.ModuleMemory=void 0;const M=b;class ${constructor(e){this.module=e}toPointerArray(e){const r=new Int32Array(e.map(s=>s.value)),t=r.length*r.BYTES_PER_ELEMENT,n=this.module._malloc(t);var i=new Uint8Array(this.module.HEAPU8.buffer,n,t);return i.set(new Uint8Array(r.buffer)),new M.Lifetime(n,void 0,s=>this.module._free(s))}newMutablePointerArray(e){const r=new Int32Array(new Array(e).fill(0)),t=r.length*r.BYTES_PER_ELEMENT,n=this.module._malloc(t),i=new Int32Array(this.module.HEAPU8.buffer,n,e);return i.set(r),new M.Lifetime({typedArray:i,ptr:n},void 0,s=>this.module._free(s.ptr))}newHeapCharPointer(e){const r=this.module.lengthBytesUTF8(e)+1,t=this.module._malloc(r);return this.module.stringToUTF8(e,t,r),new M.Lifetime(t,void 0,n=>this.module._free(n))}consumeHeapCharPointer(e){const r=this.module.UTF8ToString(e);return this.module._free(e),r}}g.ModuleMemory=$;var d={};Object.defineProperty(d,"__esModule",{value:!0});d.concat=d.evalOptionsToFlags=d.DefaultIntrinsics=void 0;const y=N;d.DefaultIntrinsics=Symbol("DefaultIntrinsics");function z(l){if(typeof l=="number")return l;if(l===void 0)return 0;const{type:e,strict:r,strip:t,compileOnly:n,backtraceBarrier:i}=l;let s=0;return e==="global"&&(s|=y.EvalFlags.JS_EVAL_TYPE_GLOBAL),e==="module"&&(s|=y.EvalFlags.JS_EVAL_TYPE_MODULE),r&&(s|=y.EvalFlags.JS_EVAL_FLAG_STRICT),t&&(s|=y.EvalFlags.JS_EVAL_FLAG_STRIP),n&&(s|=y.EvalFlags.JS_EVAL_FLAG_COMPILE_ONLY),i&&(s|=y.EvalFlags.JS_EVAL_FLAG_BACKTRACE_BARRIER),s}d.evalOptionsToFlags=z;function G(...l){let e=[];for(const r of l)r!==void 0&&(e=e.concat(r));return e}d.concat=G;Object.defineProperty(x,"__esModule",{value:!0});x.QuickJSContext=void 0;const U=P,D=V,T=C,c=b,W=g,K=d;class Y extends W.ModuleMemory{constructor(e){var r;super(e.module),this.scope=new c.Scope,this.copyJSValue=t=>this.ffi.QTS_DupValuePointer(this.ctx.value,t),this.freeJSValue=t=>{this.ffi.QTS_FreeValuePointer(this.ctx.value,t)},(r=e.ownedLifetimes)==null||r.forEach(t=>this.scope.manage(t)),this.owner=e.owner,this.module=e.module,this.ffi=e.ffi,this.rt=e.rt,this.ctx=this.scope.manage(e.ctx)}get alive(){return this.scope.alive}dispose(){return this.scope.dispose()}manage(e){return this.scope.manage(e)}consumeJSCharPointer(e){const r=this.module.UTF8ToString(e);return this.ffi.QTS_FreeCString(this.ctx.value,e),r}heapValueHandle(e){return new c.Lifetime(e,this.copyJSValue,this.freeJSValue,this.owner)}}class q{constructor(e){this._undefined=void 0,this._null=void 0,this._false=void 0,this._true=void 0,this._global=void 0,this._BigInt=void 0,this.fnNextId=-32768,this.fnMaps=new Map,this.cToHostCallbacks={callFunction:(r,t,n,i,s)=>{if(r!==this.ctx.value)throw new Error("QuickJSContext instance received C -> JS call with mismatched ctx");const o=this.getFunction(s);if(!o)throw new Error(`QuickJSContext had no callback with id ${s}`);return c.Scope.withScopeMaybeAsync(this,function*(a,u){const h=u.manage(new c.WeakLifetime(t,this.memory.copyJSValue,this.memory.freeJSValue,this.runtime)),p=new Array(n);for(let m=0;m<n;m++){const S=this.ffi.QTS_ArgvGetJSValueConstPointer(i,m);p[m]=u.manage(new c.WeakLifetime(S,this.memory.copyJSValue,this.memory.freeJSValue,this.runtime))}try{const m=yield*a(o.apply(h,p));if(m){if("error"in m&&m.error)throw(0,U.debugLog)("throw error",m.error),m.error;const S=u.manage(m instanceof c.Lifetime?m:m.value);return this.ffi.QTS_DupValuePointer(this.ctx.value,S.value)}return 0}catch(m){return this.errorToHandle(m).consume(S=>this.ffi.QTS_Throw(this.ctx.value,S.value))}})}},this.runtime=e.runtime,this.module=e.module,this.ffi=e.ffi,this.rt=e.rt,this.ctx=e.ctx,this.memory=new Y({...e,owner:this.runtime}),e.callbacks.setContextCallbacks(this.ctx.value,this.cToHostCallbacks),this.dump=this.dump.bind(this),this.getString=this.getString.bind(this),this.getNumber=this.getNumber.bind(this),this.resolvePromise=this.resolvePromise.bind(this)}get alive(){return this.memory.alive}dispose(){this.memory.dispose()}get undefined(){if(this._undefined)return this._undefined;const e=this.ffi.QTS_GetUndefined();return this._undefined=new c.StaticLifetime(e)}get null(){if(this._null)return this._null;const e=this.ffi.QTS_GetNull();return this._null=new c.StaticLifetime(e)}get true(){if(this._true)return this._true;const e=this.ffi.QTS_GetTrue();return this._true=new c.StaticLifetime(e)}get false(){if(this._false)return this._false;const e=this.ffi.QTS_GetFalse();return this._false=new c.StaticLifetime(e)}get global(){if(this._global)return this._global;const e=this.ffi.QTS_GetGlobalObject(this.ctx.value);return this.memory.manage(this.memory.heapValueHandle(e)),this._global=new c.StaticLifetime(e,this.runtime),this._global}newNumber(e){return this.memory.heapValueHandle(this.ffi.QTS_NewFloat64(this.ctx.value,e))}newString(e){const r=this.memory.newHeapCharPointer(e).consume(t=>this.ffi.QTS_NewString(this.ctx.value,t.value));return this.memory.heapValueHandle(r)}newUniqueSymbol(e){const r=(typeof e=="symbol"?e.description:e)??"",t=this.memory.newHeapCharPointer(r).consume(n=>this.ffi.QTS_NewSymbol(this.ctx.value,n.value,0));return this.memory.heapValueHandle(t)}newSymbolFor(e){const r=(typeof e=="symbol"?e.description:e)??"",t=this.memory.newHeapCharPointer(r).consume(n=>this.ffi.QTS_NewSymbol(this.ctx.value,n.value,1));return this.memory.heapValueHandle(t)}newBigInt(e){if(!this._BigInt){const n=this.getProp(this.global,"BigInt");this.memory.manage(n),this._BigInt=new c.StaticLifetime(n.value,this.runtime)}const r=this._BigInt,t=String(e);return this.newString(t).consume(n=>this.unwrapResult(this.callFunction(r,this.undefined,n)))}newObject(e){e&&this.runtime.assertOwned(e);const r=e?this.ffi.QTS_NewObjectProto(this.ctx.value,e.value):this.ffi.QTS_NewObject(this.ctx.value);return this.memory.heapValueHandle(r)}newArray(){const e=this.ffi.QTS_NewArray(this.ctx.value);return this.memory.heapValueHandle(e)}newPromise(e){const r=c.Scope.withScope(t=>{const n=t.manage(this.memory.newMutablePointerArray(2)),i=this.ffi.QTS_NewPromiseCapability(this.ctx.value,n.value.ptr),s=this.memory.heapValueHandle(i),[o,a]=Array.from(n.value.typedArray).map(u=>this.memory.heapValueHandle(u));return new D.QuickJSDeferredPromise({context:this,promiseHandle:s,resolveHandle:o,rejectHandle:a})});return e&&typeof e=="function"&&(e=new Promise(e)),e&&Promise.resolve(e).then(r.resolve,t=>t instanceof c.Lifetime?r.reject(t):this.newError(t).consume(r.reject)),r}newFunction(e,r){const t=++this.fnNextId;return this.setFunction(t,r),this.memory.heapValueHandle(this.ffi.QTS_NewFunction(this.ctx.value,t,e))}newError(e){const r=this.memory.heapValueHandle(this.ffi.QTS_NewError(this.ctx.value));return e&&typeof e=="object"?(e.name!==void 0&&this.newString(e.name).consume(t=>this.setProp(r,"name",t)),e.message!==void 0&&this.newString(e.message).consume(t=>this.setProp(r,"message",t))):typeof e=="string"?this.newString(e).consume(t=>this.setProp(r,"message",t)):e!==void 0&&this.newString(String(e)).consume(t=>this.setProp(r,"message",t)),r}typeof(e){return this.runtime.assertOwned(e),this.memory.consumeHeapCharPointer(this.ffi.QTS_Typeof(this.ctx.value,e.value))}getNumber(e){return this.runtime.assertOwned(e),this.ffi.QTS_GetFloat64(this.ctx.value,e.value)}getString(e){return this.runtime.assertOwned(e),this.memory.consumeJSCharPointer(this.ffi.QTS_GetString(this.ctx.value,e.value))}getSymbol(e){this.runtime.assertOwned(e);const r=this.memory.consumeJSCharPointer(this.ffi.QTS_GetSymbolDescriptionOrKey(this.ctx.value,e.value));return this.ffi.QTS_IsGlobalSymbol(this.ctx.value,e.value)?Symbol.for(r):Symbol(r)}getBigInt(e){this.runtime.assertOwned(e);const r=this.getString(e);return BigInt(r)}resolvePromise(e){this.runtime.assertOwned(e);const r=c.Scope.withScope(t=>{const n=t.manage(this.getProp(this.global,"Promise")),i=t.manage(this.getProp(n,"resolve"));return this.callFunction(i,n,e)});return r.error?Promise.resolve(r):new Promise(t=>{c.Scope.withScope(n=>{const i=n.manage(this.newFunction("resolve",u=>{t({value:u&&u.dup()})})),s=n.manage(this.newFunction("reject",u=>{t({error:u&&u.dup()})})),o=n.manage(r.value),a=n.manage(this.getProp(o,"then"));this.unwrapResult(this.callFunction(a,o,i,s)).dispose()})})}getProp(e,r){this.runtime.assertOwned(e);const t=this.borrowPropertyKey(r).consume(i=>this.ffi.QTS_GetProp(this.ctx.value,e.value,i.value));return this.memory.heapValueHandle(t)}setProp(e,r,t){this.runtime.assertOwned(e),this.borrowPropertyKey(r).consume(n=>this.ffi.QTS_SetProp(this.ctx.value,e.value,n.value,t.value))}defineProp(e,r,t){this.runtime.assertOwned(e),c.Scope.withScope(n=>{const i=n.manage(this.borrowPropertyKey(r)),s=t.value||this.undefined,o=!!t.configurable,a=!!t.enumerable,u=!!t.value,h=t.get?n.manage(this.newFunction(t.get.name,t.get)):this.undefined,p=t.set?n.manage(this.newFunction(t.set.name,t.set)):this.undefined;this.ffi.QTS_DefineProp(this.ctx.value,e.value,i.value,s.value,h.value,p.value,o,a,u)})}callFunction(e,r,...t){this.runtime.assertOwned(e);const n=this.memory.toPointerArray(t).consume(s=>this.ffi.QTS_Call(this.ctx.value,e.value,r.value,t.length,s.value)),i=this.ffi.QTS_ResolveException(this.ctx.value,n);return i?(this.ffi.QTS_FreeValuePointer(this.ctx.value,n),{error:this.memory.heapValueHandle(i)}):{value:this.memory.heapValueHandle(n)}}evalCode(e,r="eval.js",t){const n=t===void 0?1:0,i=(0,K.evalOptionsToFlags)(t),s=this.memory.newHeapCharPointer(e).consume(a=>this.ffi.QTS_Eval(this.ctx.value,a.value,r,n,i)),o=this.ffi.QTS_ResolveException(this.ctx.value,s);return o?(this.ffi.QTS_FreeValuePointer(this.ctx.value,s),{error:this.memory.heapValueHandle(o)}):{value:this.memory.heapValueHandle(s)}}throw(e){return this.errorToHandle(e).consume(r=>this.ffi.QTS_Throw(this.ctx.value,r.value))}borrowPropertyKey(e){return typeof e=="number"?this.newNumber(e):typeof e=="string"?this.newString(e):new c.StaticLifetime(e.value,this.runtime)}getMemory(e){if(e===this.rt.value)return this.memory;throw new Error("Private API. Cannot get memory from a different runtime")}dump(e){this.runtime.assertOwned(e);const r=this.typeof(e);if(r==="string")return this.getString(e);if(r==="number")return this.getNumber(e);if(r==="bigint")return this.getBigInt(e);if(r==="undefined")return;if(r==="symbol")return this.getSymbol(e);const t=this.memory.consumeJSCharPointer(this.ffi.QTS_Dump(this.ctx.value,e.value));try{return JSON.parse(t)}catch{return t}}unwrapResult(e){if(e.error){const r="context"in e.error?e.error.context:this,t=e.error.consume(n=>this.dump(n));if(t&&typeof t=="object"&&typeof t.message=="string"){const{message:n,name:i,stack:s}=t,o=new T.QuickJSUnwrapError(""),a=o.stack;throw typeof i=="string"&&(o.name=t.name),typeof s=="string"&&(o.stack=`${i}: ${n}
${t.stack}Host: ${a}`),Object.assign(o,{cause:t,context:r,message:n}),o}throw new T.QuickJSUnwrapError(t,r)}return e.value}getFunction(e){const r=e>>8,t=this.fnMaps.get(r);if(t)return t.get(e)}setFunction(e,r){const t=e>>8;let n=this.fnMaps.get(t);return n||(n=new Map,this.fnMaps.set(t,n)),n.set(e,r)}errorToHandle(e){return e instanceof c.Lifetime?e:this.newError(e)}}x.QuickJSContext=q;Object.defineProperty(_,"__esModule",{value:!0});_.QuickJSRuntime=void 0;const Q=B,X=x,v=P,Z=C,k=b,ee=g,te=d;class re{constructor(e){var r;this.scope=new k.Scope,this.contextMap=new Map,this.cToHostCallbacks={shouldInterrupt:t=>{if(t!==this.rt.value)throw new Error("QuickJSContext instance received C -> JS interrupt with mismatched rt");const n=this.interruptHandler;if(!n)throw new Error("QuickJSContext had no interrupt handler");return n(this)?1:0},loadModuleSource:(0,Q.maybeAsyncFn)(this,function*(t,n,i,s){const o=this.moduleLoader;if(!o)throw new Error("Runtime has no module loader");if(n!==this.rt.value)throw new Error("Runtime pointer mismatch");const a=this.contextMap.get(i)??this.newContext({contextPointer:i});try{const u=yield*t(o(s,a));if(typeof u=="object"&&"error"in u&&u.error)throw(0,v.debugLog)("cToHostLoadModule: loader returned error",u.error),u.error;const h=typeof u=="string"?u:"value"in u?u.value:u;return this.memory.newHeapCharPointer(h).value}catch(u){return(0,v.debugLog)("cToHostLoadModule: caught error",u),a.throw(u),0}}),normalizeModule:(0,Q.maybeAsyncFn)(this,function*(t,n,i,s,o){const a=this.moduleNormalizer;if(!a)throw new Error("Runtime has no module normalizer");if(n!==this.rt.value)throw new Error("Runtime pointer mismatch");const u=this.contextMap.get(i)??this.newContext({contextPointer:i});try{const h=yield*t(a(s,o,u));if(typeof h=="object"&&"error"in h&&h.error)throw(0,v.debugLog)("cToHostNormalizeModule: normalizer returned error",h.error),h.error;const p=typeof h=="string"?h:h.value;return u.getMemory(this.rt.value).newHeapCharPointer(p).value}catch(h){return(0,v.debugLog)("normalizeModule: caught error",h),u.throw(h),0}})},(r=e.ownedLifetimes)==null||r.forEach(t=>this.scope.manage(t)),this.module=e.module,this.memory=new ee.ModuleMemory(this.module),this.ffi=e.ffi,this.rt=e.rt,this.callbacks=e.callbacks,this.scope.manage(this.rt),this.callbacks.setRuntimeCallbacks(this.rt.value,this.cToHostCallbacks),this.executePendingJobs=this.executePendingJobs.bind(this)}get alive(){return this.scope.alive}dispose(){return this.scope.dispose()}newContext(e={}){if(e.intrinsics&&e.intrinsics!==te.DefaultIntrinsics)throw new Error("TODO: Custom intrinsics are not supported yet");const r=new k.Lifetime(e.contextPointer||this.ffi.QTS_NewContext(this.rt.value),void 0,n=>{this.contextMap.delete(n),this.callbacks.deleteContext(n),this.ffi.QTS_FreeContext(n)}),t=new X.QuickJSContext({module:this.module,ctx:r,ffi:this.ffi,rt:this.rt,ownedLifetimes:e.ownedLifetimes,runtime:this,callbacks:this.callbacks});return this.contextMap.set(r.value,t),t}setModuleLoader(e,r){this.moduleLoader=e,this.moduleNormalizer=r,this.ffi.QTS_RuntimeEnableModuleLoader(this.rt.value,this.moduleNormalizer?1:0)}removeModuleLoader(){this.moduleLoader=void 0,this.ffi.QTS_RuntimeDisableModuleLoader(this.rt.value)}hasPendingJob(){return!!this.ffi.QTS_IsJobPending(this.rt.value)}setInterruptHandler(e){const r=this.interruptHandler;this.interruptHandler=e,r||this.ffi.QTS_RuntimeEnableInterruptHandler(this.rt.value)}removeInterruptHandler(){this.interruptHandler&&(this.ffi.QTS_RuntimeDisableInterruptHandler(this.rt.value),this.interruptHandler=void 0)}executePendingJobs(e=-1){const r=this.memory.newMutablePointerArray(1),t=this.ffi.QTS_ExecutePendingJob(this.rt.value,e??-1,r.value.ptr),n=r.value.typedArray[0];if(r.dispose(),n===0)return this.ffi.QTS_FreeValuePointerRuntime(this.rt.value,t),{value:0};const i=this.contextMap.get(n)??this.newContext({contextPointer:n}),s=i.getMemory(this.rt.value).heapValueHandle(t);if(i.typeof(s)==="number"){const a=i.getNumber(s);return s.dispose(),{value:a}}else return{error:Object.assign(s,{context:i})}}setMemoryLimit(e){if(e<0&&e!==-1)throw new Error("Cannot set memory limit to negative number. To unset, pass -1");this.ffi.QTS_RuntimeSetMemoryLimit(this.rt.value,e)}computeMemoryUsage(){const e=this.getSystemContext().getMemory(this.rt.value);return e.heapValueHandle(this.ffi.QTS_RuntimeComputeMemoryUsage(this.rt.value,e.ctx.value))}dumpMemoryUsage(){return this.memory.consumeHeapCharPointer(this.ffi.QTS_RuntimeDumpMemoryUsage(this.rt.value))}setMaxStackSize(e){if(e<0)throw new Error("Cannot set memory limit to negative number. To unset, pass 0.");this.ffi.QTS_RuntimeSetMaxStackSize(this.rt.value,e)}assertOwned(e){if(e.owner&&e.owner.rt!==this.rt)throw new Z.QuickJSWrongOwner(`Handle is not owned by this runtime: ${e.owner.rt.value} != ${this.rt.value}`)}getSystemContext(){return this.context||(this.context=this.scope.manage(this.newContext())),this.context}}_.QuickJSRuntime=re;Object.defineProperty(f,"__esModule",{value:!0});var H=f.QuickJSWASMModule=I=f.applyModuleEvalRuntimeOptions=F=f.applyBaseRuntimeOptions=A=f.QuickJSModuleCallbacks=void 0;const w=P,L=C,E=b,ne=_,ie=d;class se{constructor(e){this.callFunction=e.callFunction,this.shouldInterrupt=e.shouldInterrupt,this.loadModuleSource=e.loadModuleSource,this.normalizeModule=e.normalizeModule}}class J{constructor(e){this.contextCallbacks=new Map,this.runtimeCallbacks=new Map,this.suspendedCount=0,this.cToHostCallbacks=new se({callFunction:(r,t,n,i,s,o)=>this.handleAsyncify(r,()=>{try{const a=this.contextCallbacks.get(t);if(!a)throw new Error(`QuickJSContext(ctx = ${t}) not found for C function call "${o}"`);return a.callFunction(t,n,i,s,o)}catch(a){return console.error("[C to host error: returning null]",a),0}}),shouldInterrupt:(r,t)=>this.handleAsyncify(r,()=>{try{const n=this.runtimeCallbacks.get(t);if(!n)throw new Error(`QuickJSRuntime(rt = ${t}) not found for C interrupt`);return n.shouldInterrupt(t)}catch(n){return console.error("[C to host interrupt: returning error]",n),1}}),loadModuleSource:(r,t,n,i)=>this.handleAsyncify(r,()=>{try{const s=this.runtimeCallbacks.get(t);if(!s)throw new Error(`QuickJSRuntime(rt = ${t}) not found for C module loader`);const o=s.loadModuleSource;if(!o)throw new Error(`QuickJSRuntime(rt = ${t}) does not support module loading`);return o(t,n,i)}catch(s){return console.error("[C to host module loader error: returning null]",s),0}}),normalizeModule:(r,t,n,i,s)=>this.handleAsyncify(r,()=>{try{const o=this.runtimeCallbacks.get(t);if(!o)throw new Error(`QuickJSRuntime(rt = ${t}) not found for C module loader`);const a=o.normalizeModule;if(!a)throw new Error(`QuickJSRuntime(rt = ${t}) does not support module loading`);return a(t,n,i,s)}catch(o){return console.error("[C to host module loader error: returning null]",o),0}})}),this.module=e,this.module.callbacks=this.cToHostCallbacks}setRuntimeCallbacks(e,r){this.runtimeCallbacks.set(e,r)}deleteRuntime(e){this.runtimeCallbacks.delete(e)}setContextCallbacks(e,r){this.contextCallbacks.set(e,r)}deleteContext(e){this.contextCallbacks.delete(e)}handleAsyncify(e,r){if(e)return e.handleSleep(n=>{try{const i=r();if(!(i instanceof Promise)){(0,w.debugLog)("asyncify.handleSleep: not suspending:",i),n(i);return}if(this.suspended)throw new L.QuickJSAsyncifyError(`Already suspended at: ${this.suspended.stack}
Attempted to suspend at:`);this.suspended=new L.QuickJSAsyncifySuspended(`(${this.suspendedCount++})`),(0,w.debugLog)("asyncify.handleSleep: suspending:",this.suspended),i.then(s=>{this.suspended=void 0,(0,w.debugLog)("asyncify.handleSleep: resolved:",s),n(s)},s=>{(0,w.debugLog)("asyncify.handleSleep: rejected:",s),console.error("QuickJS: cannot handle error in suspended function",s),this.suspended=void 0})}catch(i){throw(0,w.debugLog)("asyncify.handleSleep: error:",i),this.suspended=void 0,i}});const t=r();if(t instanceof Promise)throw new Error("Promise return value not supported in non-asyncify context.");return t}}var A=f.QuickJSModuleCallbacks=J;function R(l,e){e.interruptHandler&&l.setInterruptHandler(e.interruptHandler),e.maxStackSizeBytes!==void 0&&l.setMaxStackSize(e.maxStackSizeBytes),e.memoryLimitBytes!==void 0&&l.setMemoryLimit(e.memoryLimitBytes)}var F=f.applyBaseRuntimeOptions=R;function O(l,e){e.moduleLoader&&l.setModuleLoader(e.moduleLoader),e.shouldInterrupt&&l.setInterruptHandler(e.shouldInterrupt),e.memoryLimitBytes!==void 0&&l.setMemoryLimit(e.memoryLimitBytes),e.maxStackSizeBytes!==void 0&&l.setMaxStackSize(e.maxStackSizeBytes)}var I=f.applyModuleEvalRuntimeOptions=O;class oe{constructor(e,r){this.module=e,this.ffi=r,this.callbacks=new J(e)}newRuntime(e={}){const r=new E.Lifetime(this.ffi.QTS_NewRuntime(),void 0,n=>{this.callbacks.deleteRuntime(n),this.ffi.QTS_FreeRuntime(n)}),t=new ne.QuickJSRuntime({module:this.module,callbacks:this.callbacks,ffi:this.ffi,rt:r});return R(t,e),e.moduleLoader&&t.setModuleLoader(e.moduleLoader),t}newContext(e={}){const r=this.newRuntime(),t=r.newContext({...e,ownedLifetimes:(0,ie.concat)(r,e.ownedLifetimes)});return r.context=t,t}evalCode(e,r={}){return E.Scope.withScope(t=>{const n=t.manage(this.newContext());O(n.runtime,r);const i=n.evalCode(e,"eval.js");if(r.memoryLimitBytes!==void 0&&n.runtime.setMemoryLimit(-1),i.error)throw n.dump(t.manage(i.error));return n.dump(t.manage(i.value))})}getFFI(){return this.ffi}}H=f.QuickJSWASMModule=oe;var le=j({__proto__:null,get QuickJSModuleCallbacks(){return A},get QuickJSWASMModule(){return H},get applyBaseRuntimeOptions(){return F},get applyModuleEvalRuntimeOptions(){return I},default:f},[f]);export{f as a,x as c,le as m,_ as r,d as t};
