import ReactMarkdown from 'react-markdown';

import remarkGfm from 'remark-gfm';

const MarkdownComponent = (props) => {
  const { markdownContent } = props;

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    border: '1px solid #ddd',
  };

  const thStyle = {
    border: '1px solid #ddd',
    padding: '8px',
    textAlign: 'left',
    backgroundColor: '#f2f2f2',
    borderBottom: '2px solid #fff',
    color: 'black',
  };

  const tdStyle = {
    border: '1px solid #ddd',
    padding: '8px',
    borderBottom: '1px solid #fff',
  };

  const codeBlockStyle = {
    backgroundColor: '#f4f4f4',
    padding: '10px',
    borderRadius: '5px',
    fontFamily: 'monospace',
    color: 'black',
  };

  const listItemStyle = {
    marginBottom: '8px',
  };

  const components = {
    table: ({ node, children }) => {
      return <table style={tableStyle}>{children}</table>;
    },
    th: ({ node, children }) => {
      return <th style={thStyle}>{children}</th>;
    },
    td: ({ node, children }) => {
      return <td style={tdStyle}>{children}</td>;
    },
    code: ({ node, inline, className, children, ...props }) => {
      const match = /language-(\w+)/.exec(className || '');

      return !inline && match ? (
        <pre
          className={`language-${match[1]}`}
          style={{ ...codeBlockStyle, whiteSpace: 'pre-wrap' }}
          {...props}
        >
          <code className={`language-${match[1]}`} style={codeBlockStyle}>
            {children}
          </code>
        </pre>
      ) : (
        <code className={className} style={codeBlockStyle} {...props}>
          {children}
        </code>
      );
    },
    ul: ({ node, children }) => {
      return <ul style={{ listStyleType: 'square', marginLeft: '20px' }}>{children}</ul>;
    },
    ol: ({ node, children }) => {
      return <ol style={{ listStyleType: 'decimal', marginLeft: '20px' }}>{children}</ol>;
    },
    li: ({ node, children }) => {
      return <li style={listItemStyle}>{children}</li>;
    },
  };

  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
      {markdownContent}
    </ReactMarkdown>
  );
};

export default MarkdownComponent;
