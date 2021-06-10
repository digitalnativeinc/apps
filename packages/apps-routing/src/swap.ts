// Copyright 2017-2021 @polkadot/apps-routing authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { TFunction } from 'i18next';
import type { Route } from './types';

import Component from '@stnd/app-collateralize';

export default function create (t: TFunction): Route {
  return {
    Component,
    display: {
      needsApi: []
    },
    group: 'swap',
    icon: 'home',
    name: 'swap',
    text: t('nav.swap', 'Swap', { ns: 'apps-routing' }),
  };
}
