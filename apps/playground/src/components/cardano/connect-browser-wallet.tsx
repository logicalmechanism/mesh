import { CardanoWallet, useWalletList } from "@meshsdk/react";

import { getProvider } from "./mesh-wallet";

export default function ConnectBrowserWallet() {
  const wallets = useWalletList();
  const hasAvailableWallets = wallets.length > 0;
  return (
    <>
      {hasAvailableWallets ? (
        <CommonCardanoWallet />
      ) : (
        <>No wallets installed</>
      )}
    </>
  );
}

export function CommonCardanoWallet() {
  const provider = getProvider();

  return (
    <CardanoWallet
      label={"Connect a Wallet"}
      extensions={[95]}
      metamask={{ network: "preprod" }}
      cardanoPeerConnect={{
        dAppInfo: {
          name: "Mesh SDK",
          url: "https://meshjs.dev/",
        },
        announce: [
          "wss://dev.btt.cf-identity-wallet.metadata.dev.cf-deployments.org",
        ],
      }}
      burnerWallet={{
        networkId: 0,
        provider: provider,
      }}
    />
  );
}
