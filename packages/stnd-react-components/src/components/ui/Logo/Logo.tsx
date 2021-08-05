import React from 'react';
import { css, jsx } from '@emotion/react'
import { Clickable } from '../../common/interface';

export interface LogoProps extends Clickable {
  src: string;
  classNames: string;
  width: string;
}

/**
 * Primary UI component for user interaction
 */
export function Logo({
    src,
    width = '100%',
    classNames,
    ...props
}: LogoProps) {

    return (
    <div
      css={css`
        img {
         width: ${width};
        }
      `}
      className={`
        ${classNames}
        `}
      {...props}
    >
      <img src={src} />
    </div>
  );
};