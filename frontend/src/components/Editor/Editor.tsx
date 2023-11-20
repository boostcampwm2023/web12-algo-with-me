import { javascript } from '@codemirror/lang-javascript';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import CodeMirror from '@uiw/react-codemirror';

const style = {
  height: '200px',
  width: '400px',
  theme: vscodeDark,
};

interface Props {
  code: string;
  onChangeCode: (newCode: string) => void;
}

const Editor = (props: Props) => {
  return (
    <CodeMirror
      value={props.code}
      height={style.height}
      width={style.width}
      theme={style.theme}
      extensions={[javascript()]}
      initialState={undefined}
      onChange={(value) => {
        props.onChangeCode(value);
      }}
    />
  );
};

export default Editor;
