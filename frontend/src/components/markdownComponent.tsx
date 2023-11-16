import React from 'react';

import remarkParse from 'remark-parse';
import remarkReact from 'remark-react';
import { unified } from 'unified';

const MarkdownComponent = (props) => {
  const { markdownContent } = props;

  const processor = unified()
    .use(remarkParse)
    .use(remarkReact, { createElement: React.createElement });

  return <div>{processor.processSync(markdownContent).result}</div>;
};

export default MarkdownComponent;
