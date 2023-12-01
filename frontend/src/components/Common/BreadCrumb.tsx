import { css, cx } from '@style/css';

import { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLElement> {
  crumbs: string[];
}

export default function BreadCrumb({ crumbs, className, ...props }: Props) {
  return (
    <nav className={cx(className, crumbStyle)} {...props}>
      {crumbs.map((crumb, index) => (
        <span key={index} className={crumbStyle}>
          {crumb}
        </span>
      ))}
    </nav>
  );
}

const crumbStyle = css({
  fontWeight: 'bold',
  color: 'text.week',
  marginRight: '1rem',
  _after: {
    content: '">"',
    marginLeft: '1rem',
  },
  _last: {
    _after: {
      content: '""',
    },
  },
});
