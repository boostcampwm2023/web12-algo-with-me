import { css, cx } from '@style/css';

import { HTMLAttributes } from 'react';
import { Link } from 'react-router-dom';

import { Icon, Text, VStack } from '.';

interface Props extends HTMLAttributes<HTMLElement> {
  crumbs: string[];
}

export function BreadCrumb({ crumbs, className, ...props }: Props) {
  const lastIndex = crumbs.length - 1;

  return (
    <nav>
      <VStack className={cx(className, style)} {...props}>
        {crumbs.map((crumb, index) => (
          <div className={crumbStyle} key={index}>
            {index === 0 ? (
              <>
                <Link to="/">
                  <Text.Body bold>{crumb}</Text.Body>
                </Link>
                <Icon.ChevronRight size={24} />
              </>
            ) : (
              <>
                <Text.Body bold>{crumb}</Text.Body>
                {index !== lastIndex ? <Icon.ChevronRight size={24} /> : null}
              </>
            )}
          </div>
        ))}
      </VStack>
    </nav>
  );
}

const style = css({
  gap: '0.25rem',
});

const crumbStyle = css({
  display: 'flex',
  placeItems: 'center',
  marginY: 'auto',
  marginX: '0',
});
