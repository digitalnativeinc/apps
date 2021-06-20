import React, { useMemo, useCallback} from "react";
import styled from "styled-components";
import { BareProps } from "@polkadot/react-components/types";
import {useCurrentUserContext } from '../../hooks/useCurrentUser'

import AccountRow from '../AccountRow'

interface Props extends BareProps {
}

function AccountSelector({ className }: Props): React.ReactElement<Props> {
  const {
    showUserSelectionModal
    ,currentAddress,
     getAccount
    } = useCurrentUserContext()
    
  const currentAccount = useMemo(() => getAccount(currentAddress), [getAccount, currentAddress]);

  const _onClick = useCallback(() => showUserSelectionModal(), [])

  return <div className={`${className} AccountSelector --shake`} onClick={_onClick}>
        {currentAccount ? <AccountRow address={currentAccount.address} name={currentAccount.name}/> : "No Account Available"}
    </div>
}

export default React.memo(styled(AccountSelector)`
  padding: 0.75rem 0;

`);
