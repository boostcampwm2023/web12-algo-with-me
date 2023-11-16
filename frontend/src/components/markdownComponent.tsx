import { css } from '@style/css';

import ReactMarkdown from 'react-markdown';

import remarkGfm from 'remark-gfm';
export default function MarkdownComponent(props) {
  const { markdownContent } = props;

  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
      {markdownContent}
    </ReactMarkdown>
  );
}
// Todo 아래의 스타일, 컴포넌트를 파일로 분리
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
  padding: '10px',
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

const components = {
  table: ({ node, children }) => {
    return <table className={tableStyle}>{children}</table>;
  },
  th: ({ node, children }) => {
    return <th className={thStyle}>{children}</th>;
  },
  td: ({ node, children }) => {
    return <td className={tdStyle}>{children}</td>;
  },
  code: ({ node, inline, className, children, ...props }) => {
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
  ul: ({ node, children }) => {
    return <ul className={ulStyle}>{children}</ul>;
  },
  ol: ({ node, children }) => {
    return <ol className={olStyle}>{children}</ol>;
  },
  li: ({ node, children }) => {
    return <li className={listItemStyle}>{children}</li>;
  },
};
