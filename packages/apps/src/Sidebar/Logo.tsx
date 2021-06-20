// Copyright 2017-2021 @polkadot/apps authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, {useContext} from "react";
import styled, {ThemeContext} from "styled-components";
import type { BareProps as Props } from '@polkadot/react-components/types';

import LogoLight from "../assets/images/standard-logo-navy.png";
import LogoDark from "../assets/images/standard-logo.png";

function Logo({
  className = ""
}: Props): React.ReactElement<Props> {
    const { theme } = useContext(ThemeContext);
    console.log('theme', theme)

    return (
        <a className={`${className} sidebar__logo`}>
          <img src={theme === 'dark' ? LogoDark as string : LogoLight as string} className="sidebar__logo_image" alt="logo" />
        </a>  
    );
}

export default React.memo(styled(Logo)`
  cursor: pointer;
  position: relative;

  .sidebar__logo_image {
    max-width: 200px;
    width: 100%;
    height: auto;
  }
`);
