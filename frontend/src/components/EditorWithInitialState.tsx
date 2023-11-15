import React, { forwardRef, useCallback, useImperativeHandle, useState } from 'react';

import { historyField } from '@codemirror/commands';
import { javascript } from '@codemirror/lang-javascript';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import CodeMirror from '@uiw/react-codemirror';

const stateFields = { history: historyField };

const EditorWithInitialState = forwardRef(({ value: externalValue }, ref) => {
  const serializedState = localStorage.getItem('myEditorState');
  const [value, setValue] = useState(localStorage.getItem('myValue') || externalValue);

  const returnCode = useCallback(() => {
    return value;
  }, [value]);

  const clearLocalStorage = useCallback(() => {
    setValue(externalValue); // externalValue로 코드 갱신
    localStorage.removeItem('myValue');
    localStorage.removeItem('myEditorState');
  }, [externalValue]);

  useImperativeHandle(
    ref,
    () => ({
      returnCode,
      clearLocalStorage,
    }),
    [returnCode, clearLocalStorage],
  );

  return (
    <CodeMirror
      value={value}
      height="200px"
      theme={vscodeDark} // 테마(필요시 테마 설치) https://github.com/uiwjs/react-codemirror
      extensions={[javascript({ jsx: true })]}
      initialState={
        serializedState
          ? {
              json: JSON.parse(serializedState || ''),
              fields: stateFields,
            }
          : undefined
      }
      onChange={(value, viewUpdate) => {
        setValue(value);
        localStorage.setItem('myValue', value);

        const state = viewUpdate.state.toJSON(stateFields);
        localStorage.setItem('myEditorState', JSON.stringify(state));
      }}
    />
  );
});

export default EditorWithInitialState;
