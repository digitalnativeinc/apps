import React, { useEffect, useState, useContext } from "react";
import useInjectedAccounts, { UseAccounts } from "./useInjectedAccounts";
// import type { DeriveBalancesAll } from '@polkadot/api-derive/types';
import { useApi } from "@polkadot/react-hooks";
import { formatTokenDecimals } from "../utils/formats";
import useStore from './useStore'

export interface UseCurrentUser extends UseAccounts {
  currentAddress: string;
  setCurrentUser: Function;
  getUserBalance: Function;
  isApiReady: boolean;
}

// seperate file?
// showUserSelectionModal and hideUserSelectionModal are appended in UserContextHOC
interface UseCurrentUserContext extends UseCurrentUser {
  showUserSelectionModal: Function;
  hideUserSelectionModal: Function;
}

export const CurrentUserContext = React.createContext<UseCurrentUserContext>(({} as unknown) as UseCurrentUserContext);

export function useCurrentUserContext() {
  return useContext(CurrentUserContext);
}

export default function useCurrentUser(): UseCurrentUser {
  const { allAccounts, getAccount, hasAccounts, isReady } = useInjectedAccounts();
  const { api, isApiReady } = useApi()
  const { getLastValue, setLastValue } = useStore('options:userAddress', 'account')

  // set to address from localStorage (either an address | '')
  const [currentAddress, setCurrentAddress] = useState<string>(getLastValue());
  
  // --- leave for test
  // must go two way
  // const balancesAll = useCall<DeriveBalancesAll>(!!currentAddress && isApiReady && api.derive.balances.all, [currentAddress]);
  // if (balancesAll) {
  //   const res = balancesAll.freeBalance.add(balancesAll.reservedBalance)
  // }
  // -- 

  // when ready and current user has not been set,
  // take the first injected account and set it to the current account
  // else if account is already set from local storage, validate it.
  useEffect(() => {
    if (!isReady) return
    if (currentAddress === '' && hasAccounts) {
      setCurrentAddress(allAccounts[0].address)
    }
    if (currentAddress !== '' && !getAccount(currentAddress)) {
      if (hasAccounts) {
        setCurrentAddress(allAccounts[0].address)
      } else {
        setCurrentAddress('')
      }
    }
  }, [currentAddress, isReady, hasAccounts, allAccounts, getAccount])

  const getUserBalance = async () => {
    if (currentAddress !== "") {
      try {

        const res = await api.query.system.account(currentAddress);
       
        const amt = formatTokenDecimals(
          res.data.free.toString(),
          Number(
            api.registry
              .getChainProperties()
              ?.tokenDecimals.toJSON()
              ?.toString()
          )
        );
        return amt;
      } catch (err) {
        return err;
      }
    }
    return Promise.reject("No address");
  };

  // sets current user 
  const setCurrentUser = (address: string) => {
    if (getAccount(address) !== undefined) {
      setCurrentAddress(address);
    }
  };

  // update localstorage when current user changes
  useEffect(() => {
    if (currentAddress !== "") {
      setLastValue(currentAddress);
    }
  }, [currentAddress]);

  
  return { 
    currentAddress, 
    allAccounts, 
    getAccount, 
    hasAccounts, 
    isReady, 
    setCurrentUser, 
    getUserBalance, 
    isApiReady 
  };
}
