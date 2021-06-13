import { truncate } from "../../utils";
import React, { useEffect, useMemo } from "react";
import styled from "styled-components";
import { BareProps as Props } from "@polkadot/react-components/types";
import { Modal } from "@polkadot/react-components";
import useCurrentUser, { CurrentUserContext } from "../../hooks/useCurrentUser";
import { useModal } from "react-modal-hook";
import BaseIdentityIcon from "@polkadot/react-identicon";

// Top Level UserProvider that will automatically pop a modal if user has not selected an account
function UserContextHOC({ className, children }: Props): React.ReactElement<Props> {
  const currentUserInfo = useCurrentUser();
  const { currentAddress, allAccounts, hasAccounts, isApiReady, isReady, setCurrentUser, getAccount } = currentUserInfo;
  const currentAccount = useMemo(() => getAccount(currentAddress), [getAccount, currentAddress]);

  const [showModal, hideModal] = useModal(() => {
    return (
      <Modal className={`${className} ucm`} onClose={hideModal}>
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
                  <BaseIdentityIcon value={account.address} size={36} theme="substrate" />
                  <div className="ucm__account__info">
                    <div>{currentAccount !== undefined && currentAccount.name}</div>
                    <div className="ucm__acount__address">{truncate(account.address, 8)}</div>
                  </div>
                </div>
              );
            })}
          </div>
          <button onClick={hideModal}>close</button>
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

  h1 {
    color: ${props => props.theme.text};
    font-size: 20px;
  }

  .ucm__content {
    background: ${props => props.theme.background} !important;
    border: 1px solid ${props => props.theme.highlight} !important;
  }

  .ucm__account__wrapper {
    display: flex;
    align-items: center;
    cursor: pointer;
    margin-bottom: 8px;

    .ui--IdentityIcon {
      margin-right: 16px;
      cursor: pointer;
    }
  }

  .ucm__content__accounts {
    margin: 24px 0;
  }
`);
