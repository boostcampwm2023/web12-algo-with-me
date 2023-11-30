import { javascript } from '@codemirror/lang-javascript';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import CodeMirror from '@uiw/react-codemirror';

interface Props {
  code: string;
  onChangeCode: (newCode: string) => void;
  height?: string;
  width?: string;
}

const Editor = (props: Props) => {
  return (
    <CodeMirror
      value={props.code}
      height={props.height ?? '100%'}
      width={props.width ?? '100%'}
      theme={vscodeDark}
      extensions={[javascript()]}
      initialState={undefined}
      onChange={(value) => {
        props.onChangeCode(value);
      }}
    />
  );
};

export default Editor;
