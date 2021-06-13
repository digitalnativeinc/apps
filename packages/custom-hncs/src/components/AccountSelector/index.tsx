import React from "react";
import styled from "styled-components";
import { BareProps } from "@polkadot/react-components/types";

interface Props extends BareProps {
}

function AccountSelector({ className }: Props): React.ReactElement<Props> {
  return (
    <div className={`${className} AccountSelector`}>
        ACCOUNTSELECTOR
    </div>
  );
}

export default React.memo(styled(AccountSelector)`
`);
