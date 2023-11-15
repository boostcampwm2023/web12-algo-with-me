import { javascript } from '@codemirror/lang-javascript';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import CodeMirror from '@uiw/react-codemirror';

const Editor = (props: { code: string | undefined; setCode: (arg0: string) => void }) => {
  return (
    <CodeMirror
      value={props.code}
      height="200px"
      width="400px"
      theme={vscodeDark}
      extensions={[javascript()]}
      initialState={undefined}
      onChange={(value) => {
        props.setCode(value);
      }}
    />
  );
};

export default Editor;
