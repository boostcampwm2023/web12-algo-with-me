import { css } from '@style/css';

import { ReactNode } from 'react';
import ReactMarkdown from 'react-markdown';

import remarkGfm from 'remark-gfm';

interface Components {
  table: (props: TableProps) => JSX.Element;
  th: (props: ThProps) => JSX.Element;
  td: (props: TdProps) => JSX.Element;
  code: (props: CodeProps) => JSX.Element;
  ul: (props: UlProps) => JSX.Element;
  ol: (props: OlProps) => JSX.Element;
  li: (props: LiProps) => JSX.Element;
}

interface Props {
  markdownContent: string;
}

interface TableProps {
  children?: ReactNode;
}

interface ThProps {
  children?: ReactNode;
}

interface TdProps {
  children?: ReactNode;
}

interface CodeProps {
  inline?: boolean;
  className?: string;
  children?: ReactNode;
}

interface UlProps {
  children?: ReactNode;
}

interface OlProps {
  children?: ReactNode;
}

interface LiProps {
  children?: ReactNode;
}

export default function Markdown(props: Props) {
  const { markdownContent } = props;

  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
      {markdownContent}
    </ReactMarkdown>
  );
}

const tableStyle = css({
  width: '100%',
  borderCollapse: 'collapse',
  border: '1px solid #ddd',
});

const thStyle = css({
  border: '1px solid #ddd',
  padding: '8px',
  textAlign: 'left',
  backgroundColor: '#f2f2f2',
  borderBottom: '2px solid #fff',
  color: 'black',
});

const tdStyle = css({
  border: '1px solid #ddd',
  padding: '8px',
  borderBottom: '1px solid #fff',
});

const codeBlockStyle = css({
  backgroundColor: '#f4f4f4',
  padding: '5px',
  borderRadius: '5px',
  fontFamily: 'monospace',
  color: 'black',
});

const codeBlockStyleWithWrap = css({
  backgroundColor: '#f4f4f4',
  padding: '10px',
  borderRadius: '5px',
  fontFamily: 'monospace',
  color: 'black',
  whiteSpace: 'pre-wrap',
});

const listItemStyle = css({
  marginBottom: '8px',
});

const ulStyle = css({
  listStyleType: 'square',
  marginLeft: '20px',
});

const olStyle = css({
  listStyleType: 'decimal',
  marginLeft: '20px',
});

const components: Components = {
  table: ({ children }: TableProps) => {
    return <table className={tableStyle}>{children}</table>;
  },
  th: ({ children }: ThProps) => {
    return <th className={thStyle}>{children}</th>;
  },
  td: ({ children }: TdProps) => {
    return <td className={tdStyle}>{children}</td>;
  },
  code: ({ inline, className, children, ...props }: CodeProps) => {
    const languageMatchForStyle = /language-(\w+)/.exec(className || '');

    return !inline && languageMatchForStyle ? (
      <pre className={codeBlockStyleWithWrap} {...props}>
        <code className={codeBlockStyle}>{children}</code>
      </pre>
    ) : (
      <code className={codeBlockStyle} {...props}>
        {children}
      </code>
    );
  },
  ul: ({ children }: UlProps) => {
    return <ul className={ulStyle}>{children}</ul>;
  },
  ol: ({ children }: OlProps) => {
    return <ol className={olStyle}>{children}</ol>;
  },
  li: ({ children }: LiProps) => {
    return <li className={listItemStyle}>{children}</li>;
  },
};
