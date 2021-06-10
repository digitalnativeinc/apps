import React from "react";
import styled from "styled-components";
import { BareProps } from "@polkadot/react-components/types";
import DropdownInput from "../BalanceInput/DropdownInput";
import UnitInput from "../BalanceInput/UnitInput";

import SlippageOptions from "./SlippagOption";
import useSwap from "./useSwap";
import Button from "../Button";

interface Props extends BareProps {
  abbr: string;
}

function Swap({ className, abbr = "" }: Props): React.ReactElement<Props> {
  const [
    input1,
    onInput1Change,
    input2,
    onInput2Change,
    setInput1Tok,
    setInput2Tok,
    USER_OPTIONS,
    AVAILABLE_OPTIONS,
    decimals
  ] = useSwap();

  return (
    <div className={`${className} swap-Cont card--glassmorphism`}>
      <div className="swap-section">
        <div className="swap-section-headers ">
          <div className="swap-section-header">Pay with</div> <div className="swap-section-sub">Balance $00.00</div>
        </div>
        <UnitInput
          options={USER_OPTIONS}
          def={0}
          onValueChange={onInput1Change}
          unit="MTR"
          values={input1}
          decimals={decimals}
        />
      </div>
      <div className="swap-section">
        <div className="swap-section-header swap-section-header2">Receive</div>
        <DropdownInput
          options={AVAILABLE_OPTIONS}
          def={0}
          onValueChange={onInput2Change}
          onDrodpdownChange={setInput2Tok}
          values={input2}
          decimals={decimals}
        />

        {/* <UnitInput unit={"MTR"} onValueChange={onInput2Change} values={input2} max={600} /> */}
      </div>
      <SlippageOptions />
      <br />
      <button className="btn--highlight">Swap</button>
    </div>
  );
}

export default React.memo(styled(Swap)`
  max-width: 500px;
  background: #fff;
  display: inline-block;
  padding: 24px;
  background: var(--backgroundcard2);

  .balance-input-Cont {
    input {
    }
  }
  .swap-section {
    display: flex;
    flex-direction: column;
  }

  .swap-section-headers {
    display: flex;
    margin-bottom: 12px;
  }

  .swap-section-header {
    font-size: 16px;
    line-height: 16px;
    color: var(--text);
    flex: 1 1 0;
  }

  .swap-section-header2 {
    margin-top: 32px;
    margin-bottom: 12px;
  }

  .swap-section-sub {
    color: var(--text);
    font-size: 14px;
    line-height: 16px;
  }

  .custom-button--Wrapper {
    border-radius: 8px;
    border: 0;
    padding: 16px 16px;
    width: 100%;
    color: var(--textwhite);
  }
  .slippage--Wrapper {
    margin-top: 32px;
  }
`);
