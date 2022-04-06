import { TezosToolkit } from "@taquito/taquito";
import React, { Dispatch, SetStateAction, useState } from "react";

const SendNFT = async ({
  Tezos,
  setUserBalance,
  userAddress,
}: {
  Tezos: TezosToolkit;
  setUserBalance: Dispatch<SetStateAction<number>>;
  userAddress: string;
}): Promise<JSX.Element> => {
  const [recipient, setRecipient] = useState<string>(
    "tz1XQZVcQbSA56cf5ZKGGeM9jH4qzfwYL8rk"
  );
  const [amount, setAmount] = useState<string>("1");
  const [loading, setLoading] = useState<boolean>(false);
  //const wallet = new BeaconWallet({ name: "Beacon Docs" });

  const transfer_params = [
    {
        from_: "tz1XQZVcQbSA56cf5ZKGGeM9jH4qzfwYL8rk",
        txs: [
                {
                    to_: "tz1Pk7dgfsqsFnHyGzfkdyuADaYU4atYEd7C",
                    token_id: 293424,
                    amount: 1
                },
        ]
    }
]



  const sendTransfer = async (): Promise<void> => {
    if (recipient && amount) {
      setLoading(true);

      try {
        const op = await Tezos.wallet;
        //  Tezos.setWalletProvider(wallet);
        const address = userAddress;
        const contract = await Tezos.wallet.at(
          "KT1GBgCd5dk7v4TSzWvtk1X64TxMyG4r7eRX"
        );
        const TOKEN_ID = 0;
        const result = await contract.methods
          .transfer([
            {
              from_: address,
              txs: [
                {
                  to_: recipient,
                  token_id: TOKEN_ID,
                  amount: 1,
                },
              ],
            },
          ])
          .send();
        //   await result;
        //  } catch (error) {
        //    console.log(error);
      } finally {
        setLoading(false);
      }

      // As soon as the operation is broadcast, you will receive the operation hash
      // return result.opHash;

      setLoading(true);
      try {
      const contract = await Tezos.wallet.at('KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton');
        const op = await contract.methods.transfer(transfer_params).send();
        await op.confirmation();
      } finally {
        setLoading(false);
      }
      //    try {
      //      const op = await Tezos.wallet
      //        .transfer({ to: recipient, amount: parseInt(amount) })
      //       .send();
      //     await op.confirmation();

      //     const balance = await Tezos.tz.getBalance(userAddress);
      //    setUserBalance(balance.toNumber());
      //  } catch (error) {
      //    console.log(error);
      //  } finally {
      //   setLoading(false);
      // }
    }
  };

  return (
    <div id="transfer-inputs">
      <button
        className="button"
        disabled={!recipient && !amount}
        onClick={sendTransfer}
      >
        {loading ? (
          <span>
            <i className="fas fa-spinner fa-spin"></i>&nbsp; Processing
          </span>
        ) : (
          <span>
            <i className="far fa fa-fire"></i>&nbsp; BURN!
          </span>
        )}
      </button>
    </div>
  );
};

export default SendNFT;
