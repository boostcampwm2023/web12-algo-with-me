import type { QuickJSContext, QuickJSRuntime, QuickJSWASMModule } from 'quickjs-emscripten';
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
    return evalCode(vm, runtime, code, params, logs);
  } catch (err) {
    const error = err as Error;
    console.log(err);
    return {
      time: 0,
      result: undefined,
      error: {
        name: error.name,
        message: error.message,
        stack: error.stack,
      },
      logs: logs,
    };
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

const evalCode = (
  vm: QuickJSContext,
  runtime: QuickJSRuntime,
  code: string,
  params: string,
  logs: string[] = [],
) => {
  const script = toRunableScript(code, params);

  const startTime = performance.now();

  const startMemory = runtime.dumpMemoryUsage();
  const result = vm.unwrapResult(vm.evalCode(script));
  const endMemory = runtime.dumpMemoryUsage();
  const endTime = performance.now();

  const { error, value } = vm.dump(result);
  result.dispose();

  return {
    time: endTime - startTime,
    result: value,
    error,
    logs: logs,
    startMemory,
    endMemory,
  };
};

const toRunableScript = (code: string, params: string) => {
  return `${code}\n

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
