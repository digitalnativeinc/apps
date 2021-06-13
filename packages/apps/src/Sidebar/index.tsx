// Copyright 2017-2021 @polkadot/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0
// Original Component: ../Menu
// Refactored by Standard Protocol to create a sidebar

import React,  { useMemo, useRef }  from 'react';
import styled from 'styled-components';
import type { BareProps as Props } from '@polkadot/react-components/types';
import type { ApiProps } from '@polkadot/react-api/types';
import type { Route, Routes } from '@polkadot/apps-routing/types';

import { useLocation } from 'react-router-dom';
import createRoutes from '@polkadot/apps-routing';

import { useApi } from '@polkadot/react-hooks';
import { useCurrentUserContext } from '@stnd/custom-hncs';

import Item from './Item'
import Logo from './Logo'
import NodeInfo from './NodeInfo'
import type { Group, Groups } from './types';

import { useTranslation } from '../translate';
import { findMissingApis } from '../endpoint';

//@stnd
import { AccountSelector } from '@stnd/custom-hncs'

// check if route is good to be used
function checkVisible ({ api, isApiConnected, isApiReady }: ApiProps, hasAccounts: boolean, { isHidden, needsAccounts, needsApi, needsSudo, needsTeleport }: Route['display']): boolean {
  if (isHidden) {
    return false;
  } else if (needsAccounts && !hasAccounts) {
    return false;
  } else if (!needsApi) {
    return true;
  } else if (!isApiReady || !isApiConnected) {
    return false;
  }

  return findMissingApis(api, needsApi).length === 0;
}

// returns groups with routes that are good to go
function extractGroups (routing: Routes, groupNames: Record<string, string>, apiProps: ApiProps, hasAccounts: boolean): Group[] {
  return Object
    .values(
      routing.reduce((all: Groups, route): Groups => {
        if (!all[route.group]) {
          all[route.group] = {
            name: groupNames[route.group],
            routes: [route]
          };
        } else {
          all[route.group].routes.push(route);
        }

        return all;
      }, {})
    )
    .map(({ name, routes }): Group => ({
      name,
      routes: routes.filter((_route) => {
        const {display} = _route
        return checkVisible(apiProps, hasAccounts, display)
      }
      )
    }))
    .filter(({ routes }) => routes.length);
}
//--------

function Sidebar ({ children, className = '' }: Props): React.ReactElement<Props> {
    const { t } = useTranslation();

    const apiProps = useApi();
    const { hasAccounts } = useCurrentUserContext()

    // routing
    const location = useLocation();

    // createRoutes gives metadata and component of each route
    const routeRef = useRef(createRoutes(t));

    // each route definition has a group
    // this allows menu to show an overlay with each group's subroutes
    const groupRef = useRef({
        home: 'home',
        vault: 'vault',
        collateralize: 'collateralize',
        swap: 'swap',
        farm: 'farm',
        accounts: t('Accounts'),
        settings: t('Settings')
      });

    // get activeRoute using location pathname
    const activeRoute = useMemo(
      () => routeRef.current.find(({ name }) =>
        location.pathname.startsWith(`/${name}`)
      ) || null,
      [location]
    );
      
    // the reasons of maintaining group structure is to later on accomodate for
    // hover dropdown menu or submenu + to keep same structure with polkadot apps
    const visibleGroups = useMemo(
      () => extractGroups(routeRef.current, groupRef.current, apiProps, hasAccounts),
    [apiProps, hasAccounts]
    );
  

    // should we make sidebar collapsible ?
    // yes
  return (
    <div className={`sidebar ${className}`}>
        <Logo/>
        <AccountSelector/>
        <ul className="sidebar__menu">
          {visibleGroups.map(({name, routes}) => (
          <Item 
            route={routes[0]}
            isLink={false}
            key={name}
            name={name}
            isActive={ activeRoute && activeRoute.group === name.toLowerCase()}
          />)
          )}
        </ul>
        <NodeInfo/>
    </div>
  );
}

export default React.memo(styled(Sidebar)`
  background: var(--backgroundsb);
  bottom: 0;
  text-align: start;
  display: flex;
  flex-direction:column; 
  align-items: flex-start;
//   box-shadow: 6px 0px 20px 0px rgba(0, 0, 0, 0.3);
  margin-left: -0.125rem;
  max-width: 24rem;
  min-width: 24rem;
  width: 100%;
  padding-top: 24px;
  padding-left: 24px;
  padding-right: 24px;
  overflow-y: auto;
  top: 0;
  transition: 1s all;

  .sidebar__menu {
    list-style-type: none;
    padding: 0;
    width: 100%;
  }

  .sidebar__menu__item.active {
    background: var(--highlight);

  }

  .sidebar__menu__item:not(.active) {
    &:hover {
      &::before {
        width: 100%;
      }
    }
  }

  .sidebar__menu__item {
    overflow: hidden;

    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;

    margin-bottom: 10px;

    font-size: 16px;
    color: var(--text);
    min-height: 52px;
    border-radius: 12px;

    a {
      width: 100%;
      height: 100%;
      padding: 12px 24px; 
      color: var(--text);
      z-index: 1;
    }

    &::before {
      transition: all 0.35s cubic-bezier(0.68, -0.55, 0.265, 1.55);
      content: '';
      width: 0%;
      height: 100%;
      background: var(--grey);
      position: absolute;
      top: 0;
      left: 0;
    }

    .ui--Icon {
      color: var(--text);
    }
  }
`);
