import React from 'react';
import { Route, Switch } from 'react-router';
import type { AppProps as Props } from '@polkadot/react-components/types';
import styled from 'styled-components';

import { HelpOverlay } from '@polkadot/react-components';

import { CryptoCards, StockCards, Swap, Farm, Scroller, News } from '@stnd/custom-hncs'
// import { useAccounts, useIpfs } from '@polkadot/react-hooks';

import basicMd from './md/basic.md';

function HomeApp ({ className='', basePath, onStatusChange }: Props): React.ReactElement<Props> {

  return <main className={`${className} home--App`}>
      <HelpOverlay md={basicMd as string} />
      <Switch>
        <Route>
          <CryptoCards abbrs={["DOT", "BTC", "ETH", "DAO", "USDT"]} />
          <StockCards symbols={["AAPL", "MSFT", "GOOGL"]} />
          <Scroller classNames="home-section">``
            <div className="home-subsection" style={{ flex: "1 1 0" }}>
              <h1 className="home-section-header">Top Liquidty Pairs</h1>
              <Farm />
            </div>
            <div className="home-subsection">
              <h1 className="home-section-header">Swap</h1>
              <Swap />
            </div>
          </Scroller>
            <h1 className="home-section-header">News</h1>
            <div>
              <News />
              <News />
              <News />
            </div>
        </Route>
      </Switch>
    </main>

}

export default React.memo(styled(HomeApp)`
.crypto-cards {
  margin-bottom: 24px;
}

.home-subsection {
  margin-right: 24px;
}
`
);
