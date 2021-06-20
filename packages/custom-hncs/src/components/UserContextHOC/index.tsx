import React, { useEffect, useMemo } from "react";
import styled from "styled-components";
import { useModal } from "react-modal-hook";

import { BareProps as Props } from "@polkadot/react-components/types";
import { Modal } from "@polkadot/react-components";
import BaseIdentityIcon from "@polkadot/react-identicon";
import { Button } from '@stnd/custom-hncs'

import { truncate } from "../../utils";
import useCurrentUser, { CurrentUserContext } from "../../hooks/useCurrentUser";

import AccountRow from '../AccountRow'

// Top Level UserProvider that will automatically pop a modal if user has not selected an account
function UserContextHOC({ className, children }: Props): React.ReactElement<Props> {
  const currentUserInfo = useCurrentUser();
  const { currentAddress, allAccounts, hasAccounts, isApiReady, isReady, setCurrentUser, getAccount } = currentUserInfo;

  const [showModal, hideModal] = useModal(() => {
    return (
      <Modal className={`${className} ucm --bg--glass`} onClose={hideModal}>
        <Modal.Content className="ucm__content">
          <h1>Select Your Account</h1>
          <div className="ucm__content__accounts">
            {allAccounts.map((account, index) => {
              return (
                <div
                  key={index}
                  onClick={() => {
                    setCurrentUser(account.address);
                    hideModal();
                  }}
                  className="ucm__account__wrapper"
                >
                  <AccountRow address={account.address} name={account.name}/>
                </div>
              );
            })}
          </div>
          <Button onClick={hideModal} text="Close"/>
        </Modal.Content>
      </Modal>
    );
  }, [allAccounts, currentAddress, className]);

  // ApiIsReady, userInfo is ready, user has injectedaccounts, but hasn't selected an account
  useEffect(() => {
    if (isApiReady && isReady && hasAccounts && currentAddress === "") {
      showModal();
    }
  }, [currentAddress, hasAccounts, isReady, isApiReady]);

  return <CurrentUserContext.Provider value={{...currentUserInfo, showUserSelectionModal: showModal, hideUserSelectionModal: hideModal}}>{children}</CurrentUserContext.Provider>;
}

export default React.memo(styled(UserContextHOC)`
  top: 20%;
  border-radius: 8px;

  h1 {
    color: var(--text);
    font-size: 20px;
  }

  .ucm__content {
    background: transparent !important;
  }

  .ucm__account__wrapper {
    display: flex;
    align-items: center;
    cursor: pointer;
    margin-bottom: 8px;
    padding: 8px;
    border-radius: 4px;
    transition: all 0.25s ease-in;
    box-sizing: border-box;

    .ui--IdentityIcon {
      margin-right: 16px;
      cursor: pointer;
    }

    &:hover {
      background: var(--hl--modal);
      transform: scale(0.99);
    }
  }

  .ucm__content__accounts {
    max-height: 50%;
    overflow-y: auto;
    margin: 24px 0;
  }
`);
