import { useEffect, useState } from "react";

import { keyring } from "@polkadot/ui-keyring";

import { useIsMountedRef } from "@polkadot/react-hooks/useIsMountedRef";

export interface UseAccounts {
  allAccounts: InjectedAccount[];
  hasAccounts: boolean;
  getAccount: (address: string) => InjectedAccount | undefined;
  isReady: boolean;
}

interface InjectedAccount {
  address: string;
  name: string;
}

export default function useAccounts(): UseAccounts {
  const mountedRef = useIsMountedRef();
  const [state, setState] = useState<UseAccounts>({
    allAccounts: [],
    hasAccounts: false,
    getAccount: () => undefined,
    isReady: false,
  });

  // subscribes to account changes on keyring
  // keyring is a package provided by @polkadot 
  // that manages the accounts tate
  useEffect((): (() => void) => {
    const subscription = keyring.accounts.subject.subscribe(
      (accounts): void => {
        if (mountedRef.current) {
          // returns all accounts that have been injected
          const allAccounts = accounts
            ? Object.entries(accounts).reduce((filtered: any, item) => {
                if (item[1].json.meta.isInjected !== undefined) {
                  filtered.push({
                    address: item[0],
                    name: item[1].json.meta.name,
                  });
                }
                return filtered;
              }, [])
            : [];
          const hasAccounts = allAccounts.length !== 0;
          const getAccount = (address: string): InjectedAccount | undefined =>
            allAccounts.find(
              (item: InjectedAccount) => item.address === address
            );

          setState({ allAccounts, hasAccounts, getAccount, isReady: true });
        }
      }
    );

    // unsubscribe on unomount
    return (): void => {
      setTimeout(() => subscription.unsubscribe(), 0);
    };
  }, [mountedRef]);

  return state;
}
