import React from 'react'
import styled from 'styled-components'
import { BareProps } from "@polkadot/react-components/types";
import BaseIdentityIcon from "@polkadot/react-identicon";
import { truncate } from '../../utils'

interface Props extends BareProps {
  name: string
  address: string
}

function AccountRow({ className, name, address }: Props): React.ReactElement<Props> {
  return (
    <div className={`${className} AccountRow`}>
      <BaseIdentityIcon value={address} size={36} theme="substrate" />
      <div>
        <div className="ar__name">{name}</div>
        <div className="ar__address">{truncate(address,8)}</div>
      </div>
    </div>
  );
}

export default React.memo(styled(AccountRow)`
  display: flex;
  align-items: center;
  cursor: pointer;
 
  .ui--IdentityIcon {
    margin-right: 16px;
    cursor: pointer;
  }
`);
