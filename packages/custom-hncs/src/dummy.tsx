import React from "react";
import styled from "styled-components";
import { BareProps } from "@polkadot/react-components/types";

interface Props extends BareProps {
}

function Dummy({ className }: Props): React.ReactElement<Props> {
  return (
    <div className={`${className} dummy`}>
    </div>
  );
}

export default React.memo(styled(Dummy)`
`);
