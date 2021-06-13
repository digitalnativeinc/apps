// Copyright 2017-2021 @polkadot/apps authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from "react";
import styled from "styled-components";

import { Icon } from "@polkadot/react-components";

// Item is kept barebones so that its styling can be done on Sidebar
// This will allow styling across sidebar items to be more uniform
function Item({
  className = "",
  isLink,
  isActive,
  route: { Modal, href, icon, name, text }
}: any): React.ReactElement<any> {
  return (
    <li className={`sidebar__menu__item ${className} ${isLink ? "is-link" : ""} ${isActive ? "active" : ""}`}>
      <a href={Modal ? undefined : href || `#/${name}`} rel="noopener noreferrer" target={href ? "_blank" : undefined}>
        <Icon icon={icon} />
        {text}
      </a>
    </li>
  );
}

export default React.memo(styled(Item)`
  position: relative;
  white-space: nowrap;
  cursor: pointer;

  .ui--Icon {
    margin-right: 0.5rem;
  }
`);
