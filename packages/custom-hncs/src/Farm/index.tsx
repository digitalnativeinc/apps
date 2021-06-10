import React from "react";
import styled from "styled-components";
import { BareProps } from "@polkadot/react-components/types";
import getTableData from "./getTableData";
import Table from "./Table";

interface Props extends BareProps {
  abbr: string;
}

function Farm({ className, abbr = "" }: Props): React.ReactElement<Props> {
  const [data, setData] = getTableData();

  return (
    <div className={`${className} farm card--glassmorphism`}>
      <Table pairs={data} />
    </div>
  );
}

export default React.memo(styled(Farm)`
  background: var(--backgroundcard);
  display: inline-block;
  padding: 8px;
  border-radius: 20px;
  width: 100%;
  min-width: 600px;

  table {
    background: transparent !important;
    border: 0 !important;
  }
`);
