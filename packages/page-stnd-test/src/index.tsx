// Copyright 2017-2021 @polkadot/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { AppProps as Props } from '@polkadot/react-components/types';

import React, { useRef } from 'react';
import { Route, Switch } from 'react-router';

import { useTranslation } from './translate';

import { Button, FadeIn } from '@stnd/react-components';

const HIDDEN_ACC = ['vanity'];

function AccountsApp ({ basePath, onStatusChange }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();

  return (
    <main className='accounts--App'>
      <Switch>
        <Route>
          <FadeIn duration={200}>
          <Button label="hello"/>
          </FadeIn>
        </Route>
      </Switch>
    </main>
  );
}

export default React.memo(AccountsApp);
