import { css, cx } from '@style/css';

import type {
  ForwardedRef,
  HTMLAttributes,
  InputHTMLAttributes,
  ReactElement,
  ReactNode,
  TextareaHTMLAttributes,
} from 'react';
import { Children, cloneElement, forwardRef } from 'react';

import { Text } from '@/components/Common';

interface Props extends HTMLAttributes<HTMLDivElement> {
  label?: ReactNode;
  comment?: string;
  children: ReactElement;
}

export function Input({ id, label, comment, children, ...props }: Props) {
  const child = Children.only(children);

  return (
    <div {...props}>
      <label htmlFor={id} className={labelStyle}>
        {label}
      </label>
      {cloneElement(child, {
        id,
        ...child.props,
      })}
      <Text.Label size="md" className={commentStyle}>
        {comment}
      </Text.Label>
    </div>
  );
}

const labelStyle = css({
  display: 'block',
  marginLeft: '0.25rem',
  marginBottom: '0.5rem',
});

const commentStyle = css({
  display: 'block',
  marginTop: '0.25rem',
  marginLeft: '0.25rem',
  color: 'text.light',
});

interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  error?: boolean;
}

Input.TextField = forwardRef(
  ({ className, ...props }: TextFieldProps, ref: ForwardedRef<HTMLInputElement>) => {
    return <input className={cx(inputStyle, className)} type="text" ref={ref} {...props}></input>;
  },
);

const inputStyle = css({
  border: '1px solid',
  borderColor: 'border',
  width: '20rem',
  borderRadius: '0.5rem',
  padding: '0.5rem 0.75rem',
  background: 'surface.alt',
  _disabled: {
    opacity: 0.5,
    pointerEvents: 'none',
  },
  _focus: {
    outline: '2px solid',
    outlineColor: 'brand',
  },
});

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

Input.TextArea = forwardRef(
  ({ className, ...props }: TextAreaProps, ref: ForwardedRef<HTMLTextAreaElement>) => {
    return <textarea className={cx(inputStyle, className)} ref={ref} {...props}></textarea>;
  },
);

interface NumberFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {}

Input.NumberField = forwardRef(
  ({ className, ...props }: NumberFieldProps, ref: ForwardedRef<HTMLInputElement>) => {
    return <input className={cx(inputStyle, className)} type="number" ref={ref} {...props}></input>;
  },
);

interface DateTimeFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {}

Input.DateTimeField = forwardRef(
  ({ className, ...props }: DateTimeFieldProps, ref: ForwardedRef<HTMLInputElement>) => {
    return (
      <input
        className={cx(inputStyle, className)}
        type="datetime-local"
        ref={ref}
        {...props}
      ></input>
    );
  },
);
