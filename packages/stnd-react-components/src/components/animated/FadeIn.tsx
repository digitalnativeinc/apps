import React from 'react';
import { css, jsx } from '@emotion/react'
import { CSSTransition } from 'react-transition-group';

import { AnimatableProps } from './common';

export function FadeIn({children, duration}: AnimatableProps) {   
    return (
        <CSSTransition
            css={css`
                animation-duration: ${duration}s;
            `}
            timeout={duration}
            in={true}
        >
            {children}
        </CSSTransition>
    )  

}