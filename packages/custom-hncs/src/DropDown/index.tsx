import React, { useState } from "react";
import styled from "styled-components";
import { BareProps } from "@polkadot/react-components/types";
import OutsideAlerter from "./OutsideAlerter";
import { Icon } from "@polkadot/react-components";

interface dropDownValues {
  key: string;
  value: string;
  text: string;
  image: any;
}

interface Props extends BareProps {
  menu: Array<dropDownValues>;
  def: number;
  onChange?: Function;
}

function Dropdown({ className, menu, def = 0, onChange }: Props): React.ReactElement<Props> {
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState(menu[def]);

  const renderItems = () => {
    return menu.map((item, index) => {
      if (item.value === selected.value) return;
      return (
        <div
          key={item.key}
          onClick={() => {
            setSelected(item);
            setShow(false);
            onChange && onChange(index);
          }}
          className={`dd__item dd__item--highlight`}
        >
          <img className="dd__image" src={item.image.src} />
          <p className="dd__text">{item.text}</p>
        </div>
      );
    });
  };

  return (
    <div className={`${className} dd-container`}>
      <OutsideAlerter
        callback={() => {
          show && setShow(false);
        }}
      >
        <div
          className="dd--selected dd__item"
          onClick={() => {
            setShow(!show);
          }}
        >
          <img className="dd__image" src={selected.image.src} />
          <p className="dd__text">{selected.text}</p>
          <Icon className="dd__icon" icon={show ? "chevron-up" : "chevron-down"} />
        </div>
        <div className={`dd__list ${show && "dd__list--active"}`}>{renderItems()}</div>
      </OutsideAlerter>
    </div>
  );
}

export default React.memo(styled(Dropdown)`
  position: relative;

  .dd__image {
    width: 20px;
    height: 20px;
    margin-right: 6px;
  }

  .dd__text {
    color: var(--text);
    margin: 0;
    margin-right: 6px;
  }

  .dd--selected {
    z-index: -1;
    border: 1px solid var(--highlight);
    border-radius: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .dd__icon {
    color: var(--text);
  }

  .dd__list--active {
    display: block !important;
  }

  .dd__list {
    overflow: hidden;
    margin-top: 16px;
    border-radius: 12px;
    position: absolute;
    display: none;
    z-index: 1;
    border: 1px solid var(--highlight);
    background: var(--backgroundlight);
  }

  .dd__item {
    display: flex;
    justifycontent: center;
    alignitems: center;
    padding: 12px 12px;
    cursor: pointer;
    &:hover {
    }
  }

  .dd__item--highlight {
    &:hover {
      background: var(--highlight);
    }
  }
  ul {
    display: none;
    border-radius: 8px;
    position: absolute;
    top: 0;
    left: 0;
    list-style-type: none;
  }
  li {
    padding: 8px;
    cursor: pointer;
  }
`);
