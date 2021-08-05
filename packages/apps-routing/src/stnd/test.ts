import type { TFunction } from 'i18next';
import type { Route } from '../types';

import Component from '@stnd/app-stnd-test';

export default function create (t: TFunction): Route {
  return {
    Component,
    display: {
      needsApi: []
    },
    group: 'test',
    icon: 'users',
    name: 'test',
    text: t('nav.test', 'Test', { ns: 'apps-routing' }),
  };
}
