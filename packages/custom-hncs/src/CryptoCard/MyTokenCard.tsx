import React from "react";
import styled from "styled-components";
import { BareProps } from "@polkadot/react-components/types";
import CryptoCardPlaceholder from "./CryptoCardPlaceholder";
import { useTransactionContext } from "../hooks/useTransaction";
import { formatPrice } from "../utils/formats";

interface Props extends BareProps {
  abbr: string;
  image: string;
  value: string;
  loading: boolean;
  name: string;
  amt: string;
}

function MyTokenCard({
  className,
  name = "",
  value = "0.0",
  image = "",
  abbr = "",
  loading = false,
  amt = ""
}: Props): React.ReactElement<Props> {
  const transactionContext = useTransactionContext();

  return (
    <div className={`${className} crypto-card card--glassmorphism`}>
      {loading ? (
        <CryptoCardPlaceholder />
      ) : (
        <>
          <div className="crypto-card__images">
            <div className="crypto-card__images__bg" />
            <div className="crypto-card__images__bg_2" />
            <div className="crypto-card__images__image" style={{ background: `url(${image})` }} />
          </div>
          <h1 className="crypto-card__name">
            {name} - {abbr}
          </h1>
          <div className="crypto-card__amt">{amt}</div>
          <div className="crypto-card__value">{`= ${formatPrice(value)}`}</div>
          <button
            className="btn--highlight"
            onClick={() => {
              transactionContext.toggleTransfer();
            }}
          >
            Transfer
          </button>
        </>
      )}
    </div>
  );
}

export default React.memo(styled(MyTokenCard)`
  min-height: 256px;
  padding: 24px;
  min-width: 248px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .crypto-card__prices {
    text-align: center;
  }

  .crypto-card__amt {
    color: var(--text);
    font-weight: 600;
    font-size: 28px;
    line-height: 35px;
    margin: 0;
    margin-top: 12px;
  }

  .crypto-card__name {
    font-size: 14px;
    line-height: 18px;
    letter-spacing: 0.01em;
    color: var(--textlight);
  }

  .crypto-card__value {
    font-size: 16px;
    line-height: 35px;
    letter-spacing: 0.01em;
    color: var(--textlight);
    margin-bottom: 12px;
  }

  .crypto-card__images {
    position: relative;
  }

  .crypto-card__images__bg {
    position: relative;
    z-index: 1;
    width: 70px;
    height: 70px;
    background: #ffffff;
    transform: matrix(0.99, -0.05, -0.16, 1, 0, 0);
    border-radius: 50%;
  }

  .crypto-card__images__bg_2 {
    position: absolute;
    width: 76.6px;
    height: 75.77px;
    top: 0.58px;
    left: 2.56px;
    background: linear-gradient(
      195.55deg,
      #8c8c8c 7.56%,
      #8c8c8c 26.23%,
      #ffffff 44.94%,
      #8c8c8c 61.77%,
      #929292 91.54%
    );
    transform: matrix(1, -0.1, 0, 0.99, 0, 0);
    border-radius: 50%;
    filter: drop-shadow(5px 12px 24px rgba(255, 255, 255, 0.25));
  }

  .crypto-card__images__image {
    position: absolute;
    z-index: 2;
    width: 70px;
    height: 70px;
    background-repeat: no-repeat !important;
    transform: matrix(0.99, -0.05, -0.16, 1, 0, 0);
    border-radius: 50%;
    background-size: contain !important;
    background-position: center !important;
    top: 0;
    left: 0;
  }
`);
