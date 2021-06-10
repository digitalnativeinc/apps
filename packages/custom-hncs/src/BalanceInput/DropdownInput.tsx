import React, { useState } from "react";
import styled from "styled-components";
import { BareProps as Props } from "@polkadot/react-components/types";
import BalanceInput, { Values } from "./index";
import DropDown from "../DropDown";

interface DropdownInputProps extends Props {
  onValueChange?: Function;
  onDrodpdownChange?: Function;
  options: Array<any>;
  def: number;
  values: Values;
  decimals: number;
}

function DropdownInput({
  className = "",
  onValueChange,
  onDrodpdownChange,
  options,
  values,
  decimals,
  def = 0
}: DropdownInputProps): React.ReactElement<DropdownInputProps> {
  const [sel, setSel] = useState(def);

  const _onDropDownChange = (_sel: number) => {
    setSel(_sel);
    onDrodpdownChange && onDrodpdownChange(_sel);
  };

  const onMaxClick = () => {
    onValueChange &&
      onValueChange({
        value: options[sel].max.toString(),
        floatValue: options[sel].max,
        validity: true
      });
  };

  return (
    <div className={`${className} dropwdown-input--Wrapper ${!values.validity ? "error-border" : ""}`}>
      <BalanceInput onValueChange={onValueChange} values={values} decimals={decimals} max={options[sel].max} />
      <button className="dropdown-input-max" onClick={onMaxClick}>
        MAX
      </button>
      <DropDown menu={options} def={def} onChange={_onDropDownChange} />
    </div>
  );
}

export default React.memo(styled(DropdownInput)`
  width: 100%;
  min-height: 66px;
  display: flex;
  align-self: flex-start;
  align-items: center;
  justify-content: flex-end;
  border-radius: 12px;
  background: var(--backgroundlight) !important;
  color: var(--text);
  border: 1px solid transparent;
  padding: 0 16px;

  .dropdown-input-max {
    color: var(--textlight);
    border: 0;
    background: transparent;
    outline: none;
    cursor: pointer;
    margin-right: 8px;
  }

  .balance-input-Cont {
    flex: 1 1 0;
    input {
      border: 0;
      font-size: 16px;
      background: transparent;
      padding-left: 16px;
      color: var(--text);
    }
  }

  .ui.button.dropdown {
    background: var(--backgroundlight) !important;
    border-radius: 12px !important;
    border: 1px solid var(--highlight) !important;
    color: var(--text);

    &:hover {
      color: var(--text);
    }
  }

  .ui.primary.buttons .active.button {
    background: var(--backgroundlight) !important;
    border-radius: 12px !important;
    border: 1px solid var(--highlight) !important;
    color: var(--text) !important;
  }

  .ui.dropdown .menu > .item {
    color: var(--text);
    background: var(--backgroundlight) !important;

    &:hover {
      color: var(--text);
      background: var(--highlight) !important;
    }
  }

  .ui.selection.active.dropdown .menu {
    border-color: var(--textlight) !important;
  }

  .ui.primary.button:focus,
  .ui.primary.buttons .button:focus {
    color: var(--text);
  }
`);
