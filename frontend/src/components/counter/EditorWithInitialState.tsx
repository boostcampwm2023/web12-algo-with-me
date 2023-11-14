import React, { forwardRef, useImperativeHandle, useCallback } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { historyField } from '@codemirror/commands';
import { javascript } from '@codemirror/lang-javascript';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';

const stateFields = { history: historyField };

const EditorWithInitialState = forwardRef(({ value: externalValue }, ref) => {
  const serializedState = localStorage.getItem('myEditorState');
  const value = localStorage.getItem('myValue') || externalValue;

  const returnCode = useCallback(() => {
    return value;
  }, [value]);

  useImperativeHandle(
    ref,
    () => ({
      returnCode,
    }),
    [returnCode],
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
        localStorage.setItem('myValue', value);

        const state = viewUpdate.state.toJSON(stateFields);
        localStorage.setItem('myEditorState', JSON.stringify(state));
      }}
    />
  );
});

export default EditorWithInitialState;
