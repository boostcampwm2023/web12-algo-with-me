import type { QuickJSContext, QuickJSWASMModule } from 'quickjs-emscripten';
import { getQuickJS } from 'quickjs-emscripten';

const MEM_LIMIT = 1024 * 1024; // 1GB
const STACK_LIMIT = 1024 * 512; // 500MB

export async function evaluate(code: string, params: string) {
  const QuickJS = await getQuickJS();
  const runtime = createRuntime(QuickJS);
  const vm = runtime.newContext();

  const logs: string[] = [];
  addConsole(vm, logs);

  try {
    return evalCode(vm, code, params, logs);
  } finally {
    vm.dispose();
    runtime.dispose();
  }
}

const addConsole = (vm: QuickJSContext, logs: string[]) => {
  const logHandle = vm.newFunction('log', (...args) => {
    const nativeArgs = args.map(vm.dump);
    logs.push(nativeArgs.toString());
  });
  const consoleHandle = vm.newObject();
  vm.setProp(consoleHandle, 'log', logHandle);
  vm.setProp(vm.global, 'console', consoleHandle);
  consoleHandle.dispose();
  logHandle.dispose();
};

const createRuntime = (quickjs: QuickJSWASMModule) => {
  const runtime = quickjs.newRuntime();
  runtime.setMemoryLimit(MEM_LIMIT);
  runtime.setMaxStackSize(STACK_LIMIT);

  return runtime;
};

const evalCode = (vm: QuickJSContext, code: string, params: string, logs: string[] = []) => {
  const script = toRunableScript(code, params);

  const startTime = performance.now();
  const result = vm.unwrapResult(vm.evalCode(script));
  const endTime = performance.now();
  const { error, value } = vm.dump(result);
  result.dispose();

  return {
    time: endTime - startTime,
    result: value,
    error,
    logs: logs,
  };
};

const toRunableScript = (code: string, params: string) => {
  return `
    ${code}\n

    (()=>{
      try {
        const result = solution(${params});
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
  `;
};
