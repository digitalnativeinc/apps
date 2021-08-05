import React from 'react';
import { css, jsx } from '@emotion/react'
import { Clickable } from '../common/interface';

export interface ButtonProps extends Clickable {
  backgroundColor?: string;
  label: string;
  classNames?: string;
}

/**
 * Primary UI component for user interaction
 */
export function Button({
  backgroundColor,
  label,
  classNames,
  ...props
}: ButtonProps) {

    return (
    <button
      type="button"
      css={css`
        outline: 0;
        border: 0;
        cursor: pointer;
      `}
      className={`
        p-3 r-2 
        ${classNames}
        `}
      {...props}
    >
      {label}
    </button>
  );
};