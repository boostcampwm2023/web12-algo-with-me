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
      style={{ height: props.height, width: props.width }}
      value={props.code}
      height={'100%'}
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
