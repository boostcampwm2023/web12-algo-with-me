import { css, cx } from '@style/css';

import { HTMLAttributes } from 'react';

import { Icon, Text, VStack } from '.';

interface Props extends HTMLAttributes<HTMLElement> {
  crumbs: string[];
}

export default function BreadCrumb({ crumbs, className, ...props }: Props) {
  const lastIndex = crumbs.length - 1;

  return (
    <VStack as="nav" className={cx(className, style)} {...props}>
      {crumbs.map((crumb, index) => (
        <>
          <Text.Body key={index} bold>
            {crumb}
          </Text.Body>
          {index !== lastIndex ? <Icon.ChevronRight size={24}></Icon.ChevronRight> : null}
        </>
      ))}
    </VStack>
  );
}

const style = css({
  gap: '0.25rem',
});
