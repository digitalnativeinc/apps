import React from "react";
import styled from "styled-components";
import { BareProps } from "@polkadot/react-components/types";

interface Props extends BareProps {
    onClick: Function;
    classNames: string;
    styleOverrides: Object;
    text: string;
    type: string; // enum later on
}

function Button({ className, classNames, styleOverrides, text, onClick, type = "primary"}: Props): React.ReactElement<Props> {

    const _onClick = () => {
        onClick && onClick()
    }

    return (
        <div 
            className={`${className} ${classNames} Button ${type === "primary" ? "--btn--primary" : ""}`}
            onClick={_onClick}
        >
            {text}
        </div>
    );
}

export default React.memo(styled(Button)`
    border-radius: 4px;
    display: inline-block;
    padding: 12px 14px;
    cursor: pointer;
`);
